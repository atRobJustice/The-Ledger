/**
 * Build a creator-only static Progeny SPA into ./progeny for GitHub Pages.
 *
 * Uses a temp copy of vendor/progeny/frontend so the submodule stays clean.
 * Requires Node >= 22 and pnpm (installs pnpm via npm if missing).
 */
import { spawnSync } from "node:child_process"
import {
    cpSync,
    existsSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    writeFileSync
} from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, "..")
const sourceFrontend = path.join(repoRoot, "vendor", "progeny", "frontend")
const overlayDir = path.join(__dirname, "progeny-overlay")
const outDir = path.join(repoRoot, "progeny")

function run(command, args, cwd, env = {}) {
    const result = spawnSync(command, args, {
        cwd,
        env: { ...process.env, ...env },
        stdio: "inherit",
        shell: process.platform === "win32"
    })
    if (result.status !== 0) {
        throw new Error(`${command} ${args.join(" ")} failed with exit ${result.status}`)
    }
}

function ensurePnpm() {
    const check = spawnSync("pnpm", ["-v"], {
        encoding: "utf8",
        shell: process.platform === "win32"
    })
    if (check.status === 0) return
    console.log("pnpm not found; installing pnpm@10.33.0 globally via npm…")
    run("npm", ["install", "-g", "pnpm@10.33.0"], repoRoot)
}

function replaceOnce(filePath, search, replacement, label) {
    const before = readFileSync(filePath, "utf8")
    if (!before.includes(search)) {
        throw new Error(`Overlay patch failed (${label}): search string not found in ${filePath}`)
    }
    const after = before.replace(search, replacement)
    if (after === before) {
        throw new Error(`Overlay patch failed (${label}): no change applied in ${filePath}`)
    }
    writeFileSync(filePath, after)
}

function applyOverlays(frontendDir) {
    cpSync(path.join(overlayDir, "index.tsx"), path.join(frontendDir, "src", "routes", "index.tsx"))
    cpSync(
        path.join(overlayDir, "LedgerReturnLink.tsx"),
        path.join(frontendDir, "src", "components", "LedgerReturnLink.tsx")
    )

    replaceOnce(
        path.join(frontendDir, "vite.config.ts"),
        '    base: "/",',
        '    base: "/progeny/",',
        "vite base"
    )

    replaceOnce(
        path.join(frontendDir, "vite.config.ts"),
        "        sourcemap: true,",
        "        sourcemap: false,",
        "vite sourcemap"
    )

    replaceOnce(
        path.join(frontendDir, "src", "main.tsx"),
        "const router = createRouter({ routeTree })",
        'const router = createRouter({ routeTree, basepath: "/progeny" })',
        "router basepath"
    )

    replaceOnce(
        path.join(frontendDir, "src", "utils", "api.ts"),
        `const API_URL =
    import.meta.env.DEV && (!configuredApiUrl || isLocalDevApiUrl(configuredApiUrl))
        ? "/api"
        : configuredApiUrl || (import.meta.env.DEV ? "/api" : "http://localhost:3001")`,
        `const isLedgerCreator = import.meta.env.VITE_LEDGER_CREATOR === "true"

const API_URL = isLedgerCreator
    ? ""
    : import.meta.env.DEV && (!configuredApiUrl || isLocalDevApiUrl(configuredApiUrl))
      ? "/api"
      : configuredApiUrl || (import.meta.env.DEV ? "/api" : "http://localhost:3001")`,
        "API_URL ledger"
    )

    replaceOnce(
        path.join(frontendDir, "src", "utils", "api.ts"),
        `const apiRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const { method = "GET", body, headers = {} } = options`,
        `const apiRequest = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    if (isLedgerCreator) {
        const err = new Error("Cloud API disabled in Ledger-hosted creator") as ApiError
        err.status = 503
        throw err
    }
    const { method = "GET", body, headers = {} } = options`,
        "apiRequest ledger guard"
    )

    replaceOnce(
        path.join(frontendDir, "src", "utils", "api.ts"),
        `    getCurrentUser: async (): Promise<CurrentUser | null> => {
        const response = await fetch(\`\${API_URL}/auth/me\`, {`,
        `    getCurrentUser: async (): Promise<CurrentUser | null> => {
        if (isLedgerCreator) {
            return null
        }
        const response = await fetch(\`\${API_URL}/auth/me\`, {`,
        "getCurrentUser ledger"
    )

    replaceOnce(
        path.join(frontendDir, "src", "routes", "__root.tsx"),
        `// Restore persisted consent before children such as CookiesBanner read the PostHog client.
monitorSupportConversationResources()
posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, posthogOptions)
removeUtmParametersFromCurrentUrl()
warmSupportConversation()`,
        `const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY?.trim()
const ledgerCreatorMode = import.meta.env.VITE_LEDGER_CREATOR === "true"

if (posthogKey && !ledgerCreatorMode) {
    monitorSupportConversationResources()
    posthog.init(posthogKey, posthogOptions)
    removeUtmParametersFromCurrentUrl()
    warmSupportConversation()
}`,
        "posthog init gate"
    )

    replaceOnce(
        path.join(frontendDir, "src", "routes", "__root.tsx"),
        `                    <AuthUnauthorizedHandler />
                    <AuthSignInConfirmation />
                    <CharacterAutosave />
                    <BrokenSaveModal />
                    <CookiesBanner />
                    <RecentChangesGate />`,
        `                    <AuthUnauthorizedHandler />
                    {!ledgerCreatorMode && <AuthSignInConfirmation />}
                    <CharacterAutosave />
                    <BrokenSaveModal />
                    {!ledgerCreatorMode && <CookiesBanner />}
                    {!ledgerCreatorMode && <RecentChangesGate />}`,
        "root chrome ledger"
    )

    // PostHogProvider still needs a client — keep posthog import; init skipped is ok for provider

    replaceOnce(
        path.join(frontendDir, "src", "components", "AppTopbar.tsx"),
        'import { refreshIdentityBoundQueries } from "~/utils/impersonation"',
        `import { refreshIdentityBoundQueries } from "~/utils/impersonation"
import LedgerReturnLink from "~/components/LedgerReturnLink"

const ledgerCreatorMode = import.meta.env.VITE_LEDGER_CREATOR === "true"`,
        "AppTopbar import"
    )

    replaceOnce(
        path.join(frontendDir, "src", "components", "AppTopbar.tsx"),
        `                    <Anchor component={Link} to="/" underline="never">
                        <Text
                            size="sm"
                            style={{
                                fontFamily: "Cinzel, Georgia, serif",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: navTextColor
                            }}
                        >
                            Progeny
                        </Text>
                    </Anchor>

                    <Group gap="md" align="center" wrap="nowrap">
                        <Anchor
                            component={Link}
                            to={creatorNavLink.to}
                            underline="never"
                            style={navLinkStyle}
                        >
                            {creatorNavLink.label}
                        </Anchor>
                        <Anchor
                            href="#"
                            underline="never"
                            onClick={handleAccountClick}
                            aria-disabled={isSigningIn}
                            style={
                                isSigningIn
                                    ? { ...navLinkStyle, opacity: 0.6, pointerEvents: "none" }
                                    : navLinkStyle
                            }
                        >
                            {isAuthenticated
                                ? "Account"
                                : isSigningIn
                                  ? "Signing in…"
                                  : "Sign in"}
                        </Anchor>`,
        `                    <Group gap="md" wrap="nowrap" align="center">
                        {ledgerCreatorMode && <LedgerReturnLink compact />}
                        <Anchor component={Link} to="/create" underline="never">
                            <Text
                                size="sm"
                                style={{
                                    fontFamily: "Cinzel, Georgia, serif",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: navTextColor
                                }}
                            >
                                Progeny
                            </Text>
                        </Anchor>
                    </Group>

                    <Group gap="md" align="center" wrap="nowrap">
                        {!ledgerCreatorMode && (
                            <Anchor
                                component={Link}
                                to={creatorNavLink.to}
                                underline="never"
                                style={navLinkStyle}
                            >
                                {creatorNavLink.label}
                            </Anchor>
                        )}
                        {!ledgerCreatorMode && (
                            <Anchor
                                href="#"
                                underline="never"
                                onClick={handleAccountClick}
                                aria-disabled={isSigningIn}
                                style={
                                    isSigningIn
                                        ? { ...navLinkStyle, opacity: 0.6, pointerEvents: "none" }
                                        : navLinkStyle
                                }
                            >
                                {isAuthenticated
                                    ? "Account"
                                    : isSigningIn
                                      ? "Signing in…"
                                      : "Sign in"}
                            </Anchor>
                        )}`,
        "AppTopbar ledger chrome"
    )

    replaceOnce(
        path.join(frontendDir, "src", "generator", "components", "Final.tsx"),
        'import { motion, useReducedMotion } from "framer-motion"',
        `import { motion, useReducedMotion } from "framer-motion"
import LedgerReturnLink from "~/components/LedgerReturnLink"

const ledgerCreatorMode = import.meta.env.VITE_LEDGER_CREATOR === "true"
const LEDGER_PENDING_PROGENY_KEY = "ledger:pendingProgenyImport"`,
        "Final import"
    )

    replaceOnce(
        path.join(frontendDir, "src", "generator", "components", "Final.tsx"),
        `    const handleDownloadJSON = () => {
        updateHealthAndWillpowerAndBloodPotencyAndHumanity(character)
        downloadJson(character).catch((e) => {
            console.error(e)
            setDownloadError(e as Error)
        })
        trackEvent({
            action: "JSON downloaded (progeny)",
            category: "downloads",
            label: JSON.stringify(character)
        })
    }`,
        `    const handleDownloadJSON = () => {
        updateHealthAndWillpowerAndBloodPotencyAndHumanity(character)
        downloadJson(character).catch((e) => {
            console.error(e)
            setDownloadError(e as Error)
        })
        trackEvent({
            action: "JSON downloaded (progeny)",
            category: "downloads",
            label: JSON.stringify(character)
        })
    }

    const handleOpenInLedger = () => {
        try {
            updateHealthAndWillpowerAndBloodPotencyAndHumanity(character)
            sessionStorage.setItem(LEDGER_PENDING_PROGENY_KEY, JSON.stringify(character))
            window.location.assign("/?progenyImport=1")
        } catch (e) {
            console.error(e)
            setDownloadError(e as Error)
        }
    }`,
        "Final open-in-ledger handler"
    )

    replaceOnce(
        path.join(frontendDir, "src", "generator", "components", "Final.tsx"),
        `                        Character creation complete. Your character is saved in the browser. Export
                        for your favourite tools, or jump straight into play.
                    </p>
                </motion.div>

                {/* Action cards grid */}`,
        `                        Character creation complete. Your character is saved in the browser. Export
                        for your favourite tools, or jump straight into play.
                    </p>
                    {ledgerCreatorMode && (
                        <p
                            style={{
                                fontFamily: FONT_BODY,
                                fontSize: "1.05rem",
                                color: "rgba(190, 160, 255, 0.95)",
                                maxWidth: 560,
                                margin: "12px auto 0",
                                lineHeight: 1.45,
                                fontWeight: 600
                            }}
                        >
                            Ready for The Ledger? Use <strong>Open in The Ledger</strong> below to
                            import automatically, or <LedgerReturnLink /> anytime.
                        </p>
                    )}
                </motion.div>

                {/* Action cards grid */}`,
        "Final ledger handoff copy"
    )

    replaceOnce(
        path.join(frontendDir, "src", "generator", "components", "Final.tsx"),
        `                    <ActionCard
                        icon={<IconDownload size={20} />}
                        label="Save File"
                        description="JSON save file to load later"
                        onClick={handleDownloadJSON}
                    />
                    <ActionCard
                        icon={<IconShare size={20} />}
                        label="Export"
                        description="Foundry VTT, Inconnu & more"
                        onClick={openExportModal}
                    />`,
        `                    <ActionCard
                        icon={<IconDownload size={20} />}
                        label="Save File"
                        description="JSON save file to load later"
                        onClick={handleDownloadJSON}
                    />
                    {ledgerCreatorMode && (
                        <ActionCard
                            icon={<IconHeart size={20} />}
                            label="Open in The Ledger"
                            description="Import this character into your sheet"
                            onClick={handleOpenInLedger}
                        />
                    )}
                    <ActionCard
                        icon={<IconShare size={20} />}
                        label="Export"
                        description="Foundry VTT, Inconnu & more"
                        onClick={openExportModal}
                    />`,
        "Final open-in-ledger card"
    )

    writeFileSync(
        path.join(frontendDir, ".env"),
        [
            "VITE_LEDGER_CREATOR=true",
            "VITE_PUBLIC_POSTHOG_KEY=",
            "VITE_API_URL=",
            "VITE_WORKOS_CLIENT_ID=",
            ""
        ].join("\n")
    )
}

function publishBuild(buildDir) {
    if (existsSync(outDir)) {
        rmSync(outDir, { recursive: true, force: true })
    }
    mkdirSync(outDir, { recursive: true })
    cpSync(buildDir, outDir, { recursive: true })

    const createDir = path.join(outDir, "create")
    mkdirSync(createDir, { recursive: true })
    cpSync(path.join(outDir, "index.html"), path.join(createDir, "index.html"))

    writeFileSync(
        path.join(outDir, "LEDGER_HOST.txt"),
        [
            "This directory is a creator-only static build of Progeny",
            "(https://github.com/Odin94/Progeny-vtm-v5-character-creator),",
            "hosted by The Ledger with permission. Rebuild via:",
            "  npm run progeny:build",
            ""
        ].join("\n")
    )
}

function main() {
    if (!existsSync(sourceFrontend)) {
        throw new Error(
            `Missing ${sourceFrontend}. Init the submodule:\n  git submodule update --init --recursive`
        )
    }

    ensurePnpm()

    const workRoot = mkdtempSync(path.join(tmpdir(), "ledger-progeny-"))
    const workFrontend = path.join(workRoot, "frontend")
    console.log(`Staging Progeny frontend → ${workFrontend}`)
    cpSync(sourceFrontend, workFrontend, { recursive: true })

    for (const junk of ["node_modules", "build", "dist"]) {
        const p = path.join(workFrontend, junk)
        if (existsSync(p)) rmSync(p, { recursive: true, force: true })
    }

    try {
        applyOverlays(workFrontend)
        console.log("Installing frontend dependencies…")
        // Prefer frozen lockfile; fall back if lock is out of sync with package.json
        const frozen = spawnSync("pnpm", ["install", "--frozen-lockfile"], {
            cwd: workFrontend,
            env: process.env,
            stdio: "inherit",
            shell: process.platform === "win32"
        })
        if (frozen.status !== 0) {
            console.warn("frozen-lockfile install failed; retrying without freeze…")
            run("pnpm", ["install"], workFrontend)
        }
        console.log("Building creator-only SPA (base=/progeny/)…")
        run("pnpm", ["exec", "vite", "build"], workFrontend, {
            VITE_LEDGER_CREATOR: "true"
        })
        const buildDir = path.join(workFrontend, "build")
        if (!existsSync(buildDir)) {
            throw new Error("Vite build did not produce frontend/build")
        }
        publishBuild(buildDir)
        console.log(`Published static creator → ${outDir}`)
    } finally {
        rmSync(workRoot, { recursive: true, force: true })
    }
}

main()

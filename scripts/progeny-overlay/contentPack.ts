/**
 * Opt-in content pack for the Ledger-hosted Progeny creator.
 * Activated by ?pack=sanguine (or books=core,pg). Persists in sessionStorage.
 */

export const PACK_SANGUINE = "sanguine"
export const STORAGE_KEY = "ledger:contentPack"

/** Predator display names allowed under Core + Player's Guide. */
export const SANGUINE_PREDATOR_NAMES = [
    "Alleycat",
    "Bagger",
    "Blood Leech",
    "Cleaver",
    "Consensualist",
    "Farmer",
    "Osiris",
    "Sandman",
    "Scene Queen",
    "Siren",
    "Extortionist",
    "Graverobber",
    "Grim Reaper",
    "Montero",
    "Pursuer",
    "Trapdoor"
] as const

const PACK_LABELS: Record<string, string> = {
    [PACK_SANGUINE]: "Core Rulebook + Player's Guide only (Sanguine Frontier)"
}

function readUrlPack(): string | null {
    try {
        const params = new URLSearchParams(window.location.search)
        const pack = (params.get("pack") || "").trim().toLowerCase()
        if (pack === PACK_SANGUINE) return PACK_SANGUINE
        const books = (params.get("books") || "").trim().toLowerCase()
        if (books === "core,pg" || books === "core+pg") return PACK_SANGUINE
    } catch {
        /* ignore */
    }
    return null
}

function readStoredPack(): string | null {
    try {
        const stored = sessionStorage.getItem(STORAGE_KEY)
        if (stored === PACK_SANGUINE) return PACK_SANGUINE
    } catch {
        /* ignore */
    }
    return null
}

function writeStoredPack(pack: string | null) {
    try {
        if (pack) sessionStorage.setItem(STORAGE_KEY, pack)
        else sessionStorage.removeItem(STORAGE_KEY)
    } catch {
        /* ignore */
    }
}

let resolvedPack: string | null = null
let initialized = false

export function initContentPack(): string | null {
    if (initialized) return resolvedPack
    initialized = true
    const fromUrl = readUrlPack()
    if (fromUrl) {
        resolvedPack = fromUrl
        writeStoredPack(fromUrl)
        return resolvedPack
    }
    resolvedPack = readStoredPack()
    return resolvedPack
}

export function getContentPack(): string | null {
    if (!initialized) return initContentPack()
    return resolvedPack
}

export function isSanguinePack(): boolean {
    return getContentPack() === PACK_SANGUINE
}

export function getContentPackLabel(): string | null {
    const pack = getContentPack()
    return pack ? PACK_LABELS[pack] || pack : null
}

/** Append pack query when a pack is active. */
export function withContentPack(href: string): string {
    const pack = getContentPack()
    if (!pack) return href
    try {
        const url = new URL(href, window.location.href)
        url.searchParams.set("pack", pack)
        if (!/^[a-z]+:\/\//i.test(href)) {
            return `${url.pathname}${url.search}${url.hash}`
        }
        return url.toString()
    } catch {
        const sep = href.includes("?") ? "&" : "?"
        return `${href}${sep}pack=${encodeURIComponent(pack)}`
    }
}

export function isCoreLoresheetSource(source: string): boolean {
    return source.trim().toLowerCase().startsWith("core v5")
}

export function isAllowedPredatorName(name: string): boolean {
    if (!isSanguinePack()) return true
    return (SANGUINE_PREDATOR_NAMES as readonly string[]).includes(name)
}

/** Advanced merit category titles to hide under the Sanguine pack (Cults book). */
export const SANGUINE_HIDDEN_ADVANCED_MERIT_TITLES = ["Cult"] as const

export function isAllowedAdvancedMeritCategory(title: string): boolean {
    if (!isSanguinePack()) return true
    return !(SANGUINE_HIDDEN_ADVANCED_MERIT_TITLES as readonly string[]).includes(title)
}

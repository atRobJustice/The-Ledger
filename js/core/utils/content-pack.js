/**
 * Opt-in content packs for campaign-scoped book limits.
 * Default (no pack) keeps the full Ledger / Progeny catalogs.
 *
 * Activate with ?pack=sanguine (or books=core,pg). Persists in sessionStorage
 * for same-origin navigation between the dashboard and /progeny/.
 */

export const PACK_SANGUINE = "sanguine";
export const STORAGE_KEY = "ledger:contentPack";

/** Predator type keys from predator_types.js allowed under Core + Player's Guide. */
export const SANGUINE_PREDATOR_KEYS = Object.freeze([
  "alleycat",
  "bagger",
  "bloodLeech",
  "cleaver",
  "consensualist",
  "farmer",
  "osiris",
  "sandman",
  "sceneQueen",
  "siren",
  "extortionist",
  "graverobber",
  "grimReaper",
  "montero",
  "pursuer",
  "trapdoor",
]);

/** Progeny predator display names allowed under Core + Player's Guide. */
export const SANGUINE_PREDATOR_NAMES = Object.freeze([
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
  "Trapdoor",
]);

/** Loresheet category keys kept when the Sanguine pack is active. */
export const SANGUINE_LORESHEET_CATEGORIES = Object.freeze(["corebook"]);

const PACK_LABELS = {
  [PACK_SANGUINE]: "Core Rulebook + Player's Guide only (Sanguine Frontier)",
};

function readUrlPack() {
  try {
    const params = new URLSearchParams(window.location.search);
    const pack = (params.get("pack") || "").trim().toLowerCase();
    if (pack === PACK_SANGUINE) return PACK_SANGUINE;
    const books = (params.get("books") || "").trim().toLowerCase();
    if (books === "core,pg" || books === "core+pg") return PACK_SANGUINE;
  } catch {
    /* ignore */
  }
  return null;
}

function readStoredPack() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === PACK_SANGUINE) return PACK_SANGUINE;
  } catch {
    /* ignore */
  }
  return null;
}

function writeStoredPack(pack) {
  try {
    if (pack) sessionStorage.setItem(STORAGE_KEY, pack);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

let resolvedPack = null;
let initialized = false;

/**
 * Resolve pack from URL (wins) or sessionStorage. Call once per page load.
 * @returns {string|null}
 */
export function initContentPack() {
  if (initialized) return resolvedPack;
  initialized = true;
  const fromUrl = readUrlPack();
  if (fromUrl) {
    resolvedPack = fromUrl;
    writeStoredPack(fromUrl);
    return resolvedPack;
  }
  resolvedPack = readStoredPack();
  return resolvedPack;
}

/** @returns {string|null} */
export function getContentPack() {
  if (!initialized) return initContentPack();
  return resolvedPack;
}

export function isSanguinePack() {
  return getContentPack() === PACK_SANGUINE;
}

export function getContentPackLabel() {
  const pack = getContentPack();
  return pack ? PACK_LABELS[pack] || pack : null;
}

/**
 * Append pack query to a relative or absolute URL when a pack is active.
 * @param {string} href
 * @returns {string}
 */
export function withContentPack(href) {
  const pack = getContentPack();
  if (!pack) return href;
  try {
    const base = window.location.href;
    const url = new URL(href, base);
    url.searchParams.set("pack", pack);
    // Prefer relative path when same-origin relative input was used
    if (!/^[a-z]+:\/\//i.test(href)) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
    return url.toString();
  } catch {
    const sep = href.includes("?") ? "&" : "?";
    return `${href}${sep}pack=${encodeURIComponent(pack)}`;
  }
}

/**
 * @param {string[]} categoryKeys
 * @returns {string[]}
 */
export function filterLoresheetCategories(categoryKeys) {
  if (!isSanguinePack()) return categoryKeys;
  return categoryKeys.filter((key) => SANGUINE_LORESHEET_CATEGORIES.includes(key));
}

/**
 * @param {Array<[string, unknown]>} entries
 * @returns {Array<[string, unknown]>}
 */
export function filterPredatorEntries(entries) {
  if (!isSanguinePack()) return entries;
  const allow = new Set(SANGUINE_PREDATOR_KEYS);
  return entries.filter(([key]) => allow.has(key));
}

/**
 * Inject a small banner when a pack is active. Idempotent.
 * @param {ParentNode} [parent=document.body]
 */
export function renderContentPackBanner(parent = document.body) {
  const label = getContentPackLabel();
  if (!label || !parent) return;
  if (document.getElementById("ledger-content-pack-banner")) return;
  const el = document.createElement("div");
  el.id = "ledger-content-pack-banner";
  el.className = "ledger-content-pack-banner";
  el.setAttribute("role", "status");
  el.innerHTML = `<i class="bi bi-book" aria-hidden="true"></i> <span>${label}</span>`;
  parent.insertBefore(el, parent.firstChild);
}

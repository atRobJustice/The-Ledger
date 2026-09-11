import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { test } from "node:test"
import { fileURLToPath } from "node:url"
import {
    convertLedgerToProgeny,
    convertProgenyToLedger,
    detectCharacterFormat,
    toLedgerCharacter,
    toProgenyCharacter,
} from "../js/core/utils/character-format.js"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const brickhouse = JSON.parse(readFileSync(join(root, "data", "Brickhouse.json"), "utf8"))
const progenyExample = JSON.parse(
    readFileSync(join(root, "data", "progeny_example.json"), "utf8")
)

test("detectCharacterFormat identifies sample files", () => {
    assert.equal(detectCharacterFormat(brickhouse), "ledger")
    assert.equal(detectCharacterFormat(progenyExample), "progeny")
    assert.equal(
        detectCharacterFormat({ version: "1.0.0", characters: [] }),
        "ledger-backup"
    )
    assert.equal(detectCharacterFormat({}), "unknown")
})

test("convertProgenyToLedger maps core fields and animal_ken", () => {
    const ledger = convertProgenyToLedger(progenyExample)
    assert.equal(ledger.clan, "tremere")
    assert.equal(ledger.predator, "trapdoor")
    assert.equal(ledger.animal_ken, 0)
    assert.ok(!Object.prototype.hasOwnProperty.call(ledger, "animal ken"))
    assert.equal(ledger.strength, 2)
    assert.ok(ledger.disciplines?.dominate)
    assert.ok(Array.isArray(ledger.convictions))
    assert.equal(ledger.convictions.length, 2)
    assert.equal(ledger.convictions[0].touchstone.name, 'Cornelius "Cornbread" Tate')
    assert.ok(ledger.health?.max >= 1)
})

test("convertLedgerToProgeny maps core fields", () => {
    const progeny = convertLedgerToProgeny(brickhouse)
    assert.equal(progeny.clan, "Tremere")
    assert.equal(progeny.predatorType.name, "Trapdoor")
    assert.equal(progeny.attributes.strength, 3)
    assert.equal(progeny.skills["animal ken"], 0)
    assert.equal(progeny.skills.melee, 1)
    assert.ok(progeny.skillSpecialties.some((s) => s.skill === "melee" && s.name === "Knives"))
    assert.ok(Array.isArray(progeny.disciplines))
    assert.ok(progeny.disciplines.some((p) => p.discipline === "dominate"))
    assert.ok(Array.isArray(progeny.touchstones))
    assert.equal(progeny.touchstones.length, 2)
    assert.equal(progeny.version, 9)
})

test("toLedgerCharacter / toProgenyCharacter are identity for matching format", () => {
    assert.equal(toLedgerCharacter(brickhouse), brickhouse)
    assert.equal(toProgenyCharacter(progenyExample), progenyExample)
})

test("round-trip Ledger → Progeny → Ledger keeps clan and animal_ken", () => {
    const asProgeny = toProgenyCharacter(brickhouse)
    const back = toLedgerCharacter(asProgeny)
    assert.equal(back.clan, "tremere")
    assert.equal(back.animal_ken, 0)
    assert.equal(back.strength, 3)
    assert.equal(back.predator, "trapdoor")
    assert.ok(back.disciplines?.dominate?.level >= 1)
})

test("round-trip Progeny → Ledger → Progeny keeps clan and skills", () => {
    const asLedger = toLedgerCharacter(progenyExample)
    const back = toProgenyCharacter(asLedger)
    assert.equal(back.clan, "Tremere")
    assert.equal(back.predatorType.name, "Trapdoor")
    assert.equal(back.skills.melee, 1)
    assert.equal(back.skills["animal ken"], 0)
    assert.ok(back.disciplines.some((p) => p.name === "Mesmerize"))
})

test("toLedgerCharacter rejects full backups", () => {
    assert.throws(
        () => toLedgerCharacter({ version: "1.0.0", characters: [] }),
        /full Ledger backup/
    )
})

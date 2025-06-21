const thinblood = {
  name: "Thin-Blood",
  nicknames: ["Duskborn", "Mercurians", "The Young Ones", "Run-Off", "Chameleons", "Abortions"],
  disciplines: ["Thin-Blood Alchemy"],
  bane: {
    description: "Thin-bloods do not suffer from a Bane unless the thin-blood Flaw Clan Curse is taken."
  },
  compulsion: {
    description: "Thin-bloods do not suffer from a clan Compulsion."
  },
  general: {
    description: "Thin-bloods are neither entirely vampire nor mortal, the ever changing nature of the Duskborn evokes pity, jealousy, and fear in equal measure. Considered little more than trash by most vampires, the thin-bloods are banding together, leveraging their resistance to sunlight and the strange, mercurial adaptability of their powers against their oppressors.",
    nature: "They are clanless and not considered a clan by most Kindred, as they are the result of embraces too far from the progenitor, Caine. Created by the arrogant Kindred who believed to be closer to the potentiator than they were, a victim of a murder and the guilt forced the hand of a Kindred to embrace or just an experiment of a Tremere gone wrong.",
    status: "The thin-bloods are a high-generation group, often cast out and shunned by Kindred society. Viewed as a threat to the Masquerade, many will destroy them if given the opportunity. Thin-bloods can be of any mortal origin and are not affected by their sire's bloodline."
  },
  characteristics: {
    generation: "Resting in the Generations from 14th to 16th",
    bloodPotency: "Blood Potency of 0",
    advantages: [
      "Less damage from the sun",
      "Some may walk in sunlight without harm",
      "Resistant to frenzies",
      "More lifelike compared to most vampires",
      "Unique Thin-blood Merits and Flaws"
    ],
    disadvantages: [
      "Cannot learn and master Disciplines normally",
      "Weaker than average Kindred",
      "Take damage as if still mortal",
      "Cannot create Blood Bonds",
      "Cannot Embrace with certainty",
      "Can only ghoul a mortal for one night"
    ],
    specialTraits: "Known as Thin-blood Merits and Flaws, they can be curated by the player to pick and choose different advantages and weaknesses unique to only them and create the perfect almost vampire."
  },
  disciplines: {
    thinBloodAlchemy: {
      description: "Thin-bloods created the art of thin-blood alchemy, granting them the potential to create new and replicate existing Disciplines from vitae and other sources.",
      acquisition: "The Merit Thin-blood Alchemist can be taken at Character Creation to begin with level 1 in the Discipline and one formulae, however, if it is not taken they can still traverse Alchemy at the in-clan experience rate.",
      resonance: {
        description: "Whenever they feed from a Resonance, they are granted one dot and one power in a Discipline tree associated with the Resonance. If the Resonance is Intense or stronger, they gain an additional dot in conjunction with a second power.",
        limitations: "This is only temporary as the rating cannot be increased with experience points and is lost upon hitting Hunger 5 or the next feeding."
      },
      disciplineAffinity: "With the thin-blood Merit Discipline Affinity, they are able to select one Discipline and traverse the tree as if a True Kindred."
    }
  },
  archetypes: {
    liveOne: "Due to their closer resemblance to mortals, they are still deeply ingrained in the mortal world. Maintaining a family and, attempting to keep a job, this thin-blood strives to pay the bills rather than deal with a Primogen they've only heard of in passing.",
    alchemist: "Some thin-bloods embrace their abilities rather than hide in the dark, this one does as much. Perfecting their art in private they strive to accomplish things no other alchemist let alone Kindred has done.",
    redemptionSeeker: "Stripped of their previous life, they seek a way to return to their human life. Through seeds of Golconda and rumors about those who have done it in the past; they seek out the legends detailing the steps to leave vampiric life behind.",
    abandoned: "Being groomed for the Kindred life was something they experienced with their sire, or at least until that fateful night. The embrace went south quickly and their sire quickly did as well. Leaving them to take the information they had and survive."
  },
  notableCharacters: {
    kirinTaunk: {
      description: "An alchemist who has met Final Death. She is one of the celebrated alchemist of the 1990s, whose work pioneered techniques used in formulas to this day"
    }
  },
  exclusiveLoresheets: [
    "The Ashfinders",
    "Student of Kirin Taunk"
  ],
  escapeOptions: {
    diablerie: {
      description: "Upon taking the soul of another vampire they join their clan and inch closer to Caine. Removing all Thin-blood traits and characteristics as they become a fully-fledged vampire.",
      circumstances: [
        "Sometimes this is rewarded as a prize to those who show themselves capable to the tower",
        "Sometimes this is a spur-of-the-moment decision against a Kindred who has been left vulnerable by others"
      ]
    },
    returnToMortality: {
      description: "Stories of those who have returned to the sun and become mortal once more. The stories usually entail thin-bloods clinging to their humanity and ending their sire.",
      warning: "Any mortal who knows about Kindred is a threat to the Masquerade and must be taken care of."
    }
  },
  camarillaEdict: {
    year: 2009,
    description: "The Inner Circle of the Camarilla issued an edict that all Thin-bloods must be branded.",
    method: "A task accomplished by a Tremere tattoo artist or even scorched into their skin using the sun.",
    consequences: "Even Anarch and Autarkis will think twice before mingling with a branded thin-blood."
  }
};
window.thinblood = thinblood; 
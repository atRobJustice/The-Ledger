const generation = {
  overview: {
    description: "Generation is the distance between a kindred and the first vampire, following their Embrace a newly formed vampire is one number higher than their sire. The only act which can lower this is known as diablerie.",
    note: "Generation, however, does not dictate the age of a vampire, as a 10th Generation vampire could have been embraced hundreds of years ago and in reverse, a low Generation vampire could have embraced a fledgling in the last year."
  },
  seaOfTime: {
    description: "Players and storytellers may decide the coterie's age range during character creation. The default age range is childer, but they group may agree to play an older coterie. The Generation helps decide the starting Blood Potency.",
    ageGroups: {
      childerThinBlood: {
        name: "Childer (thin-bloods)",
        generationRange: "14th-16th",
        timeOfEmbrace: "Within last 15 years",
        startingBloodPotency: 0
      },
      childer: {
        name: "Childer",
        generationRange: "12th-13th",
        timeOfEmbrace: "Within last 15 years",
        startingBloodPotency: 1
      },
      neonate: {
        name: "Neonate",
        generationRange: "12th-13th",
        timeOfEmbrace: "between 1940 and a decade ago",
        startingBloodPotency: 1
      },
      ancilla: {
        name: "Ancilla",
        generationRange: "10th-11th",
        timeOfEmbrace: "between 1780 and 1940",
        startingBloodPotency: 2
      }
    }
  },
  olderSPCs: {
    description: "If a storyteller wishes to have older SPCs these are the general guidelines.",
    ageGroups: {
      elder: {
        name: "Elder",
        generationRange: "6th-9th",
        timeOfEmbrace: "200–1000 years",
        bloodPotencyRange: "2–8"
      },
      methuselah: {
        name: "Methuselah",
        generationRange: "4th-5th",
        timeOfEmbrace: "older than 1,000 years",
        bloodPotencyRange: "4–10"
      }
    }
  },
  generationTiers: {
    caineAndSecond: {
      description: "Caine and perhaps Lilith for those who believe in these myths were perhaps the first vampires. However, anything could have happened on those first nights."
    },
    third: {
      name: "3rd Generation",
      description: "Also known as the Antediluvians, they are the founders of the 13 clans and are thought to either be dead or asleep for the past thousand years. However, the Sabbat have declared war against them declaring war and beginning the Gehenna which has roused the long-lost vampires and caused the Beckoning."
    },
    fourthAndFifth: {
      name: "4th and 5th Generations",
      description: "Also known as the Methuselahs and are nearly as powerful as the Antediluvians, however, they retreated from The Jyhad and most remain asleep beneath human cities."
    },
    sixthThroughNinth: {
      name: "6th through 9th Generations",
      description: "The elders were mostly Embraced before the modern age and held Domains within the Camarilla and Anarch Movement for generations. However, most are called to the Beckoning these nights and only a few hold out against this calling."
    },
    tenthAndEleventh: {
      name: "10th and 11th Generations",
      description: "These are the ancillae and are the lowest generation for player characters."
    },
    twelfthAndThirteenth: {
      name: "12th and 13th Generations",
      description: "The neonates are a generation between the ancilla and fledglings with little experience with the curses of vampirism, but however, understand the technology and societal changes better than those older than them. Sometimes they are blamed for the recent explosion of uprisings within the Anarch Movement. This generation also contains the fledglings of the modern night, those new to the vampiric life."
    },
    fourteenthThroughSixteenth: {
      name: "14th through 16th Generations",
      description: "Thin-bloods are the furthest from the progenitors, thought to be the bringers of Gehenna by those who believe in The Book of Nod."
    }
  },
  effects: {
    dominate: "Vampires with lower generation can spend a willpower point to completely negate Dominate from a higher (weaker) generation vampire.",
    diablerie: "If a higher generation vampire diablerizes a lower generation vampire, then the attacker's generation lowers by one. After diablerie, the black veins stay in the attackers aura for each generation difference in years if the diablerist had a higher generation."
  },
  bloodPotencyLimits: {
    4: { lowest: 5, highest: 10 },
    5: { lowest: 4, highest: 9 },
    6: { lowest: 3, highest: 8 },
    7: { lowest: 3, highest: 7 },
    8: { lowest: 2, highest: 6 },
    9: { lowest: 2, highest: 5 },
    10: { lowest: 1, highest: 4 },
    11: { lowest: 1, highest: 4 },
    12: { lowest: 1, highest: 3 },
    13: { lowest: 1, highest: 3 },
    14: { lowest: 0, highest: 0 },
    15: { lowest: 0, highest: 0 },
    16: { lowest: 0, highest: 0 }
  },
  getBloodPotencyLimits: function(generation) {
    return this.bloodPotencyLimits[generation] || null;
  },
  getAgeGroup: function(generation, timeOfEmbrace) {
    // This is a simplified version - you might want to add more complex logic
    if (generation >= 14) return this.seaOfTime.ageGroups.childerThinBlood;
    if (generation >= 12) return this.seaOfTime.ageGroups.childer;
    if (generation >= 10) return this.seaOfTime.ageGroups.ancilla;
    return null;
  },
  getGenerationTier: function(generation) {
    if (generation === 3) return this.generationTiers.third;
    if (generation >= 4 && generation <= 5) return this.generationTiers.fourthAndFifth;
    if (generation >= 6 && generation <= 9) return this.generationTiers.sixthThroughNinth;
    if (generation >= 10 && generation <= 11) return this.generationTiers.tenthAndEleventh;
    if (generation >= 12 && generation <= 13) return this.generationTiers.twelfthAndThirteenth;
    if (generation >= 14 && generation <= 16) return this.generationTiers.fourteenthThroughSixteenth;
    return null;
  }
};
window.generation = generation; 
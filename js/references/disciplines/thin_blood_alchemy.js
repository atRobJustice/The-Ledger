// Thin Blood Alchemy Discipline Data
const thinBloodAlchemy = {
  name: "Thin-blood Alchemy",
  nicknames: ["Cooking", "Home Brew", "the Craft", "Mashup"],
  affinity: ["Thin-blood"],
  type: "Varied",
  threat: "Varied",
  resonance: "Varied",
  overview: "Thin-blood Alchemy is a unique Discipline for Thin-bloods, created through ingredients composed of random items, Resonances, and their own vitae. Alchemy is a young Discipline, thought to be born through the street drug scene or of alchemists of the past. Certain thin-bloods have managed to utilize their weak blood to awaken powers unique to them and even create counterfeit versions of the other Disciplines.",
  distillationMethods: {
    athanorCorporis: {
      description: "Alchemy created through their own body by consuming the ingredients",
      distillationRoll: "Stamina + Alchemy",
      cost: "Rouse Check",
      limitations: [
        "Only one power can be activated at a time",
        "New power must be distilled before being activated",
        "Distillation takes around three turns of concentration"
      ]
    },
    calcinatio: {
      description: "Uses a human body to host the alchemy by introductions of incantations and their own blood",
      distillationRoll: "Manipulation + Alchemy",
      cost: "Rouse Check",
      limitations: [
        "Can only distill one power per victim",
        "Current power remains as long as they are kept in the same emotional state",
        "Each power takes as long to activate as it takes to slake the amount of blood required"
      ]
    },
    fixatio: {
      description: "Uses a conventional athanor to brew in a kiln, meth lab, or repurposed propane tank",
      distillationRoll: "Intelligence + Alchemy",
      cost: "Rouse Check",
      limitations: [
        "Requires a lab for best results",
        "Without a lab, can only create level 3 or less formula",
        "Using unsuitable equipment reduces distillation dice pool by 2",
        "Can activate one power per turn"
      ]
    }
  },
  powers: {
    level1: [
      {
        name: "Body Paint",
        effect: "Create tattoos with personal touches beyond regular tattoos",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric",
        duration: "Permanent, unless erased by skin coloured Body Paint",
        dicePool: "Dexterity + Craft",
        opposingPool: "None",
        notes: "After a week, the roll to alter the tattoo is Stamina + Resolve",
        source: "Blood Sigils, page 73"
      },
      {
        name: "Checkout Time",
        effect: "Enter a deep torpor where there is no difference between you or a corpse",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "A number of nights written during creation. This cannot exceed 9 nights",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Coming out of this Torpor does not require a Rouse Check. In this state, they have no aura, require no rouse checks and take no damage from sunlight or other banes",
        source: "Blood Sigils, page 74"
      }
    ],
    level2: [
      {
        name: "Advanced Torpor",
        effect: "Immediately cause Torpor",
        cost: "One Rouse Check",
        origin: "None",
        resonance: ["Choleric", "Phlegmatic"],
        duration: "Until target awakens from Torpor",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Always heal as a vampire, regardless of flaws. Unlike regular torpor, the vampire always has a Rouse Check re-roll",
        source: "Blood Sigils, page 75"
      }
    ],
    level3: [
      {
        name: "Diamond Skin",
        effect: "Reduces physical damage to the alchemist, turning Aggravated to Superficial",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "Until margin of Distillation roll is used up",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Does not affect fire, acid, sunlight or sorcery",
        source: "Blood Sigils, page 76"
      }
    ],
    level4: [
      {
        name: "Airborne Momentum",
        effect: "Achieve flight",
        cost: "One Rouse Check",
        origin: "None",
        resonance: ["Choleric", "Sanguine"],
        duration: "One scene",
        dicePool: "Strength + Alchemy",
        opposingPool: "Strength + Athletics (if resisted)",
        notes: "Can move at running speed and carrying a human-sized mass slows to walking speed. This can only be used by the alchemist.",
        source: "Corebook, page 287"
      }
    ],
    level5: [
      {
        name: "Awaken the Sleeper",
        effect: "Awaken a vampire from torpor",
        cost: "One Rouse Check",
        origin: "None",
        resonance: ["Choleric", "Sanguine"],
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Each Distillation style has a unique method of tapping for this elixir.",
        source: "Corebook, page 287"
      }
    ]
  },
  counterfeitDisciplines: {
    level1: {
      effect: "Counterfeit a one-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      source: "Corebook, page 285"
    },
    level2: {
      effect: "Counterfeit a two-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      source: "Corebook, page 287"
    },
    level3: {
      effect: "Counterfeit a three-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      notes: "Requires a drop of vitae from a vampire of a matching clan or who possesses the Discipline.",
      source: "Corebook, page 287"
    },
    level4: {
      effect: "Counterfeit a four-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      notes: "Requires a drop of vitae from a vampire of a matching clan or who possesses the Discipline.",
      source: "Corebook, page 287"
    }
  }
};
window.thinBloodAlchemy = thinBloodAlchemy; 
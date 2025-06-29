export const bloodSorceryRituals = {
  name: "Blood Sorcery Rituals",
  generalRules: {
    baseCost: "One Rouse Check",
    castingTime: "Five minutes per level",
    ritualRoll: "Intelligence + Blood Sorcery",
    difficulty: "Ritual Level + 1",
    learningTime: "Square of ritual level in weeks",
    additionalNotes: [
      "Rituals that benefit the recipient can only be cast onto the sorcerer themselves unless otherwise stated",
      "Many call for necessary ingredients, but may only require blood and concentration",
      "Good teacher or a good grimoire may lessen the time needed to learn a ritual",
      "It is possible to create new rituals through an extended test that may take in game months to complete"
    ]
  },
  rituals: {
    level1: [
      {
        name: "Astromancy",
        effect: "Learn information such as Skills, Desires and Convictions about someone",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "If you know the correct Birth or Embrace date, you can add 1 die to the Ritual pool. This does not stack if you know both.",
        source: "Blood Sigils, page 59"
      },
      {
        name: "Beelzebeatit",
        effect: "Animals avoid the area",
        cost: "One Rouse Check",
        origin: "Sabbat",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Nothing prevents directed or controlled creatures from entering.",
        source: "Sabbat, page 50"
      }
    ],
    level2: [
      {
        name: "As Fog on Water",
        effect: "Walk on water silently",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "This can be ended early or kept to allow them to walk on water for the rest of the night.",
        source: "Players Guide, page 100"
      },
      {
        name: "Calling the Aura's Remnants",
        effect: "Speak with the residual aura of someone who has died",
        cost: "One Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The aura only has memories up to the time of death.",
        source: "Chicago Folios, page 171"
      }
    ],
    level3: [
      {
        name: "Bladed Hands",
        effect: "Sharpens the user's hands into a weapon",
        cost: "Two Rouse Checks",
        origin: "Milwaukee",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Treated as a light piercing Brawl weapon with a +2 modifier.",
        source: "Chicago Folios, page 174"
      },
      {
        name: "Blood Sigil",
        effect: "Create a tattoo on a Kindred which also contains a message",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Can read the message with a Resolve + Occult roll or by Sense the Unseen (Auspex ●). Caster can remove the Blood Sigil by spending Willpower and touching the tattoo.",
        source: "Blood Sigils, page 66"
      }
    ],
    level4: [
      {
        name: "Compel the Inanimate",
        effect: "Give a simple command to an inanimate object which it follows a few minutes later",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The caster must remain in the same general area as the object. Sense the Unseen (Auspex ●) can detect the caster with a Wits + Auspex vs. caster's Composure + Blood Sorcery roll.",
        source: "Blood Sigils, page 69"
      },
      {
        name: "Defense of the Sacred Haven",
        effect: "Protect a haven with mystical darkness from the sun",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The Ritual roll is made once the sun rises.",
        source: "Corebook, page 279"
      }
    ],
    level5: [
      {
        name: "Antebrachia Ignium",
        effect: "Set their arms on fire",
        cost: "One Rouse Check",
        origin: "Church of Caine",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The user is only resistant to fire on their arms.",
        source: "Cults of the Blood Gods, page 67"
      },
      {
        name: "Atrocity's Release",
        effect: "Reverses the effects of Diablerie",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Can be resisted with a Resolve + Blood Sorcery test.",
        source: "Gehenna War, page 49"
      }
    ]
  },
  chainRituals: {
    elementalChain: {
      description: "Chain of Elemental Grasp, Tiamat Glistens, and Elemental Attack",
      effect: "Creates a natural disaster (e.g. Tornado, Magma Flow or Tsunami)",
      requirements: [
        "Elemental Grasp (Level 2)",
        "Tiamat Glistens (Level 2)",
        "Elemental Attack (Level 5)"
      ]
    },
    landChain: {
      description: "Chain of Land's Sustenance, Compel the Inanimate, and Fisher King",
      effect: "Gain complete control over the land and heal 5 Aggravated damage each night",
      requirements: [
        "Land's Sustenance (Level 4)",
        "Compel the Inanimate (Level 4)",
        "Fisher King (Level 5)"
      ]
    }
  }
}; 
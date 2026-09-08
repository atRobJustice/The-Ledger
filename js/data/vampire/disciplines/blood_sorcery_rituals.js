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
      },
      {
        name: "Blood Missive",
        effect: "Send messages through blood",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The first person to taste the blood receives it as if it was intended for them or they possess A Taste for Blood.",
        source: "Live from the Succubus Club, page 29"
      },
      {
        name: "Sanguine Tidings",
        effect: "Make a message appear on a mirror when a type of person comes nearby",
        cost: "N/A",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "It disappears from the mirror once it's been read once.",
        source: "Live from the Succubus Club, page 29"
      },
      {
        name: "Preservation",
        effect: "Preserve an item from the passage of time",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Only preserves the item from age, ambient elements, and minor accidents. Intentional damage still affects the item.",
        source: "Courts of the Damned, pages 215-216"
      },
      {
        name: "Rite of Introduction",
        effect: "Magically broadcast an introduction and identification to any caster of the Foundation of the Chantry Ritual in the same city",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Caster can withhold but not alter elements of their broadcast.",
        source: "Courts of the Damned, page 216"
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
      },
      {
        name: "Grim Chrysalis",
        effect: "Create a cocoon out of hardened vitae that heals damage taken",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The cocoon itself is hard and protects the user from outside damage to some extent.",
        source: "Tattered Facade, page 93"
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
      },
      {
        name: "Balm of Bathory",
        effect: "Make a balm from the blood of a young mortal to make the user appear younger",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The balm gives the user a temporary Stunning (••••) Merit. However, each subsequent use takes double the amount of mortal blood as the last batch.",
        source: "Tattered Facade, page 94"
      },
      {
        name: "Seek the Gathered Vitae",
        effect: "Discover gatherings of Kindred with a collective Blood Potency of 13 or higher",
        cost: "N/A",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Ghouls count as 1/4th and Duskborn count as 1/2.",
        source: "Live from the Succubus Club, page 29"
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
      },
      {
        name: "Foundation of the Chantry",
        effect: "Make a point of Foundation so the caster and designees can retrieve broadcasts from Rite of Introduction and send responses back",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Foundation is linked to a Vein of the Earth. Designees must be present to also receive messages. Responses may withhold, but not alter information.",
        source: "Courts of the Damned, pages 216-217"
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
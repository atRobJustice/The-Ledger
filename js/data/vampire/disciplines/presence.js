export const presence = {
  name: "Presence",
  nicknames: ["Superstardom", "Enthrallment", "Sublimitas"],
  affinity: ["Brujah", "Ravnos", "Toreador", "The Ministry", "Ventrue"],
  type: "Mental",
  threat: "Low to Medium",
  resonance: "Sanguine",
  overview: "The Kindred ability to dominate a social scene as flawlessly as their hunting ground is embodied by Presence. Skilled Kindred cause others to feel irresistible allure or unfettered dread within mere moments. Presence is a potent emotional manipulation to score easy victims, coerce devotion, and sail through social settings. While Dominate is a handy tool to bend others to one's will, it is not as subtle as presence. Presence isn't direct control, but influence leaves victims with their ability to think; making those affected more useful for manipulation, but unpredictable. To use this discipline, the victim needs to be physically present or within earshot of the Kindred. Without Star Magnetism the power cannot transmit over electronics. While Presence is a subtle Discipline without overt uses or obvious clues, Auspex such as Sense the Unseen can detect its use at the moment, and Unswayable Mind can be used when contesting the supernatural influence. Presence powers do not stack and only Dread Gaze and Majesty can be used on violent enemies, as their minds can't be charmed when they have decided to hurt the Kindred.",
  powers: {
    level1: [
      {
        name: "Awe",
        effect: "Add Presence rating to any Skill roll involving Persuasion, Performance, or Charisma related rolls as per ST discretion",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until ended by the user",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Once the power wears off the victim reverts to their original opinions",
        source: "Vampire: The Masquerade Corebook, page 267"
      },
      {
        name: "Daunt",
        effect: "Add Presence rating to any intimidation rolls",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until ended by the user",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Awe and Daunt cannot be used at the same time",
        source: "Vampire: The Masquerade Corebook, page 267"
      },
      {
        name: "Eyes of the Serpent",
        effect: "Immobilize a victim by making eye contact",
        cost: "Free",
        prerequisite: "None",
        amalgam: "Protean ●",
        duration: "Until eye contact is broken or the scene ends",
        dicePool: "Charisma + Presence",
        opposingPool: "Wits + Composure",
        notes: "A vampire victim can break this by spending Willpower any turn after the first",
        source: "Vampire: The Masquerade Anarch, page 185"
      }
    ],
    level2: [
      {
        name: "Lingering Kiss",
        effect: "Usable during feedings, the victim gains a bonus to Social attribute for one night",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Number of nights equal to the user's Presence rating",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "A withdrawal follows where the victim takes a penalty equal to the original bonus when not actively working towards the next fix. It cannot be used on those under a Blood Bond. Unbondable cannot take this discipline power",
        source: "Vampire: The Masquerade Corebook, page 267"
      },
      {
        name: "Melpominee",
        effect: "Use Presence without seeing the target, only having them within earshot",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This works with Awe, Daunt, Dread Gaze, Entrance, and Majesty",
        source: "Vampire: The Masquerade Players Guide, page 80"
      }
    ],
    level3: [
      {
        name: "Clear the Field",
        effect: "Clear a space in a calm and orderly manner",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Dominate ●●●",
        duration: "N/A",
        dicePool: "Composure + Presence",
        opposingPool: "Wits + Composure",
        notes: "They can exempt a number of people equal to their Composure",
        source: "Vampire: The Masquerade Fall of London, page 31"
      },
      {
        name: "Dread Gaze",
        effect: "Instill fear into a target to make them flee",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Charisma + Presence",
        opposingPool: "Composure + Resolve",
        notes: "A critical win against a vampire victim means the victim makes a terror Frenzy at difficulty 3",
        source: "Vampire: The Masquerade Corebook, page 267"
      },
      {
        name: "Entrancement",
        effect: "Influence someone into a star-struck or beguiled state of mind where they do their best to keep the user happy. Adding their Presence rating in dice to any social rolls against the victim",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One hour plus one per point of margin",
        dicePool: "Charisma + Presence",
        opposingPool: "Composure + Wits",
        notes: "If the request is harmful to the victim or their loved ones, or opposes their tenets the test must be made again or Entrancement fails",
        source: "Vampire: The Masquerade Corebook, page 268"
      },
      {
        name: "Thrown Voice",
        effect: "Throw their voice from any point within sight and leave the voice there",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "A roll is only needed if being used in combination with Irresistible Voice, Melpominee or similar powers",
        source: "Vampire: The Masquerade Players Guide, page 80"
      },
      {
        name: "True Love's Face",
        effect: "The victim will perceive the user as a mortal they have strong emotional ties with, be it hatred or love",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Obfuscate ●●●",
        duration: "One scene",
        dicePool: "Manipulation + Presence",
        opposingPool: "Composure + Wits",
        notes: "Can net stains for the victim if the perceived target is their touchstone",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 85"
      }
    ],
    level4: [
      {
        name: "Irresistible Voice",
        effect: "The user's voice alone is enough to use Dominate on a target",
        cost: "No additional cost",
        prerequisite: "None",
        amalgam: "Dominate ●",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Does not work through technology",
        source: "Vampire: The Masquerade Corebook, page 268"
      },
      {
        name: "Magnum Opus",
        effect: "Infusing Presence into artwork",
        cost: "One or more Rouse Checks",
        prerequisite: "None",
        amalgam: "Auspex ●●●",
        duration: "N/A",
        dicePool: "Charisma/Manipulation + Craft",
        opposingPool: "N/A",
        notes: "Audiences must roll Composure + Resolve to resist its effects",
        source: "Vampire: The Masquerade Winter's Teeth #3"
      },
      {
        name: "Suffuse the Edifice",
        effect: "Extend Presence onto a building",
        cost: "N/A",
        prerequisite: "None",
        amalgam: "No",
        duration: "As power transmitted",
        dicePool: "As power transmitted",
        opposingPool: "As power transmitted",
        notes: "If the vampire is present they become the focus instead of the building",
        source: "Vampire: The Masquerade Players Guide, page 80"
      },
      {
        name: "Summon",
        effect: "Call someone to them who has had certain Presence powers used on them or tasted the user's vitae",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One night",
        dicePool: "Manipulation + Presence",
        opposingPool: "Composure + Intelligence",
        notes: "The victim will not physically or financially harm themselves to reach the user",
        source: "Vampire: The Masquerade Corebook, page 268"
      },
      {
        name: "Wingman",
        effect: "Extend Presence onto another character to use",
        cost: "One Rouse Check plus additional powers",
        prerequisite: "None",
        amalgam: "No",
        duration: "As power used",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The same Presence power used by both does not double the bonus",
        source: "Vampire: The Masquerade Blood Stained Love, page 152"
      }
    ],
    level5: [
      {
        name: "Majesty",
        effect: "Everyone who looks at the user is dumbstruck unable to act in any way other than self-preservation",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "Charisma + Presence",
        opposingPool: "Composure + Resolve",
        notes: "A win on the contested roll allows one turn plus one per margin of freedom",
        source: "Vampire: The Masquerade Corebook, page 268"
      },
      {
        name: "Star Magnetism",
        effect: "Allows the use of presence through live-feed technology, does not work on recorded content",
        cost: "One additional Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "As power used",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "If using Entrancement the user must speak the targets name clearly",
        source: "Vampire: The Masquerade Corebook, page 269"
      }
    ]
  },
  amalgams: [
    {
      name: "Chimestry",
      discipline: "Obfuscate",
      level: "●●",
      presenceLevel: "●",
      effect: "Create brief but realistic hallucinations",
      cost: "One Rouse Check",
      dicePool: "Manipulation + Obfuscate",
      source: "Vampire: The Masquerade Companion, page 25"
    },
    {
      name: "Implant Suggestion",
      discipline: "Dominate",
      level: "●●●●",
      presenceLevel: "●",
      effect: "Change another's personality or opinion temporarily",
      cost: "One Rouse Check",
      dicePool: "Manipulation + Dominate",
      source: "Vampire: The Masquerade Players Guide, page 74"
    },
    {
      name: "Fata Morgana",
      discipline: "Obfuscate",
      level: "●●●",
      presenceLevel: "●●",
      effect: "Elaborate hallucinations",
      cost: "One Rouse Check",
      dicePool: "Manipulation + Obfuscate",
      source: "Vampire: The Masquerade Companion, page 26"
    },
    {
      name: "Spark of Rage",
      discipline: "Potence",
      level: "●●●",
      presenceLevel: "●●●",
      effect: "Incite anger or frenzy onto onlookers",
      cost: "One Rouse Check",
      dicePool: "Manipulation + Potence",
      source: "Vampire: The Masquerade Corebook, page 265"
    }
  ]
}; 
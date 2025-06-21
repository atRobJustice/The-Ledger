// Oblivion Discipline Data
const oblivion = {
  name: "Oblivion",
  nicknames: ["Obtenebration", "Necromancy", "Shadow-boxing", "Abyssal Mastery", "Tenebrae Imperium", "Mortis", "the Dark Arts", "Black Magic", "Entropy"],
  affinity: ["Hecata", "Lasombra"],
  type: "Mental",
  threat: "Medium to High",
  resonance: "Empty",
  overview: "Oblivion is a power rarely used by those outside of the Hecata and Lasombra. The power itself extends into two different styles, one focusing on the more ceremonial and necromancy side as seen with the Hecata and the other reaching into the darkness to utilize shadows as seen with the Lasombra. The power itself originates from a plane of death and nothingness, letting its users reach into it and touch something more supernatural than not. Similar to Blood Sorcery, the possession of Oblivion gives access to Oblivion Ceremonies. Ceremonies all require pre-requisite powers from the Oblivion branch which alters it from Blood Sorcery. Still, ghouls of Necromancers or Thin-bloods gaining temporary access through Resonance do not have access to Ceremonies and only to Oblivion powers. At creation a character may take 1 Oblivion Ceremony should they have at least one dot of Oblivion and the pre-requisite power. Characters can later obtain more Ceremonies at the cost of experience and time. Ceremonies generally take at least the square rating in weeks to learn as well as a teacher who already knows the Ceremony.",
  powers: {
    level1: [
      {
        name: "Ashes to Ashes",
        effect: "Destroy a corpse by dissolving it",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "Variable",
        dicePool: "Stamina + Oblivion",
        opposingPool: "Stamina + Medicine/Fortitude",
        notes: "If the body is not animated it will dissolve throughout three turns with no test needed",
        source: "Vampire: The Masquerade Players Guide, page 85"
      },
      {
        name: "Binding Fetter",
        effect: "Allow users to be able to identify a fetter by use of their senses",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "Wits + Oblivion",
        opposingPool: "N/A",
        notes: "During its use the user receives a -2 penalty to all Awareness, Wits, and Resolve rolls",
        source: "Vampire: The Masquerade Players Guide, page 85"
      },
      {
        name: "Oblivion Sight",
        effect: "See in darkness clearly and see ghosts present",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "While in use there is a two-dice penalty to social interactions with mortals",
        source: "Vampire: The Masquerade Players Guide, page 85"
      },
      {
        name: "Shadow Cloak",
        effect: "+2 bonus to stealth rolls and intimidation against mortals",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Players Guide, page 85"
      }
    ],
    level2: [
      {
        name: "Arms of Ahriman",
        effect: "Conjures shadow appendages that the user can control but the user is unable to do anything else",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Potence ●●",
        duration: "One scene or until ended or destroyed",
        dicePool: "Wits + Oblivion",
        opposingPool: "N/A",
        notes: "Arms do not have a health tracker and do not require Composure + Resolve to escape",
        source: "Vampire: The Masquerade Players Guide, page 86"
      },
      {
        name: "Fatal Prediction",
        effect: "Increase the chances of a mortal being harmed by exterior forces",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●●",
        duration: "24 hours",
        dicePool: "Resolve + Oblivion",
        opposingPool: "Wits + Occult",
        notes: "For every success over margin the victim takes 1 Aggravated damage throughout the duration. The vampire cannot interact with the victim directly or indirectly",
        source: "Vampire: The Masquerade Players Guide, page 87"
      },
      {
        name: "Fatal Precognition",
        effect: "Vision of a non-vampires death",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●●",
        duration: "Until fulfilled, avoided or the story ends",
        dicePool: "Resolve + Oblivion",
        opposingPool: "N/A",
        notes: "The vampire must be able to see or hear the target during the power's use",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 204"
      },
      {
        name: "Shadow Cast",
        effect: "Conjure shadows from the user's body",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The shadow can be extended up to twice the user's Oblivion rating in yards/meters. Those standing in the shadow take more Willpower damage from social conflict",
        source: "Vampire: The Masquerade Players Guide, page 87"
      },
      {
        name: "Where the Veil Thins",
        effect: "Determine the density of the Shroud in their area",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Intelligence + Oblivion",
        opposingPool: "N/A",
        notes: "The book lists a chart stating the possible different densities and causes, as well as their effects",
        source: "Vampire: The Masquerade Players Guide, page 87"
      }
    ],
    level3: [
      {
        name: "Aura of Decay",
        effect: "Harnessing their connection to Oblivion can make plants wilt, animals and humans sick, and food spoil",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "Stamina + Oblivion",
        opposingPool: "Stamina + Medicine/Fortitude",
        notes: "All social rolls the vampire makes when this power is active takes a two dice penalty. Any contaminated food eaten gives two Superficial Damage",
        source: "Vampire: The Masquerade Players Guide, page 88"
      },
      {
        name: "Passion Feast",
        effect: "Allows a vampire to slake Hunger on the passion of wraiths",
        cost: "Free",
        prerequisite: "None",
        amalgam: "Fortitude ●●",
        duration: "Passive",
        dicePool: "Resolve + Oblivion",
        opposingPool: "Resolve + Composure",
        notes: "The hunger consumed does not return the following night",
        source: "Vampire: The Masquerade Players Guide, page 89"
      },
      {
        name: "Shadow Perspective",
        effect: "Projects their senses into a shadow within line of sight",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "Up to one scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The use of this power is undetectable in the shadow other than by supernatural means such as Sense the Unseen",
        source: "Vampire: The Masquerade Players Guide, page 89"
      },
      {
        name: "Shadow Servant",
        effect: "Use a shadow to spy on or scare others",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The servant has no mind of its own and cannot endure bright lights able to be destroyed by them",
        source: "Vampire: The Masquerade Players Guide, page 89"
      },
      {
        name: "Touch of Oblivion",
        effect: "Withers a body part on touch",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Inflicting such damage may warrant Stains up to Storyteller discretion. The user must grip the target",
        source: "Vampire: The Masquerade Players Guide, page 89"
      }
    ],
    level4: [
      {
        name: "Necrotic Plague",
        effect: "Manifest illness in victims",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn to activate, variable length of the condition",
        dicePool: "Intelligence + Oblivion",
        opposingPool: "Stamina + Medicine/Fortitude",
        notes: "This illness cannot be treated in a medical setting as it's supernaturally inflicted, instead only healed by drinking vitae. There is no outcome on Total Failures",
        source: "Vampire: The Masquerade Players Guide, page 89"
      },
      {
        name: "Stygian Shroud",
        effect: "Darkness spews out of a nearby shadow and covers the area",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The shadow can be extended up to twice the user's Oblivion rating in yards/meters",
        source: "Vampire: The Masquerade Players Guide, page 90"
      },
      {
        name: "Umbrous Clutch",
        effect: "Using the victim's shadow they create a portal, dropping them into the user's arms",
        cost: "One Rouse Check, One Stain",
        prerequisite: "None",
        amalgam: "No",
        duration: "Instant",
        dicePool: "Wits + Oblivion",
        opposingPool: "Dexterity + Wits",
        notes: "An unprepared mortal will be terrified while a vampire must test for fury or fear Frenzy test at a Difficulty 4",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 49"
      }
    ],
    level5: [
      {
        name: "Shadow Step",
        effect: "The user can step into one shadow and appear in another within their sight",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "A willing person may be taken through the Shadow Step but should the user stain, so does the passenger",
        source: "Vampire: The Masquerade Players Guide, page 90"
      },
      {
        name: "Skuld Fulfilled",
        effect: "Reintroduce illnesses someone has recovered from",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "Variable, depending on if the condition is treatable",
        dicePool: "Stamina + Oblivion",
        opposingPool: "Stamina + Stamina/Fortitude",
        notes: "If the victim is a ghoul their immunity to aging is removed and eliminates any vitae in their system",
        source: "Vampire: The Masquerade Players Guide, page 91"
      },
      {
        name: "Tenebrous Avatar",
        effect: "Changes their body into a shadow able to move over any surface or through small spaces",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until ended",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The user takes no damage except sunlight and fire while in this form",
        source: "Vampire: The Masquerade Players Guide, page 91"
      },
      {
        name: "Withering Spirit",
        effect: "Erode a victim's spirit till they are a husk",
        cost: "Two Rouse Checks, Stains",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Resolve + Oblivion",
        opposingPool: "Resolve + Occult/Fortitude",
        notes: "If the target is Impaired, they will not return as a wraith",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 208"
      }
    ]
  },
  amalgams: [
    {
      name: "Fatal Flaw",
      discipline: "Auspex",
      level: "●●●",
      oblivionLevel: "●",
      effect: "Find the weakness of a target",
      cost: "One Rouse Check",
      dicePool: "Intelligence + Auspex",
      source: "Vampire: The Masquerade Players Guide, page 71"
    }
  ]
};
window.oblivion = oblivion; 
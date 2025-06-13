export const dominate = {
  name: "Dominate",
  nicknames: ["Snake Charming", "Mesmerism", "Mentis Imperium"],
  affinity: ["Lasombra", "Malkavian", "Salubri", "Tremere", "Tzimisce", "Ventrue"],
  type: "Mental",
  threat: "Low",
  resonance: "Phlegmatic",
  overview: "Dominate gives Kindred the ability to control the actions of others, alter their memories and force others to act not of their own volition. From erasing the memories of a recent feed to enslaving mortals for the vampire to do with them as they please. Dominate gives the feeling of power, although wiser Kindred know this is only a guise from the Blood. At most levels, it requires eye contact with a single victim unless otherwise stated. At the base levels, it can wipe superficial memories or command small immediate actions of their victims and in turn, higher levels allow for more sophisticated uses. The victim needs to understand the Kindred and the Kindred needs to speak their commands. Exceptions exist with Irresistible Voice and Telepathy, the former allows commands without eye contact, and the latter without spoken words. While Dominated, victims are mindless puppets who cannot be interrogated and can only do things they could do on demand. Commands that cause social backlash or cause minor injury are always contested with the victim. The victim cannot be commanded to directly cause serious injury or death to themselves without Terminal Decree. When used against other vampires they must contest this and those with a lower generation may use Willpower to shirk off the attempt. Once Dominate has totally failed against a target, the user will not be able to use it against them for the rest of the story.",
  powers: {
    level1: [
      {
        name: "Cloud Memory",
        effect: "Make someone forget the current moment",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Indefinitely",
        dicePool: "Charisma + Dominate",
        opposingPool: "Wits + Resolve",
        notes: "No rolls are needed when the target is an unprepared mortal",
        source: "Vampire: The Masquerade Corebook, page 256"
      },
      {
        name: "Compel",
        effect: "Issue a single command",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "No more than one scene",
        dicePool: "Charisma + Dominate",
        opposingPool: "Intelligence + Resolve",
        notes: "No rolls are needed when the target is an unprepared mortal. However, mortals who have been Dominated in this scene already or this goes against their nature may roll to resist",
        source: "Vampire: The Masquerade Corebook, page 256"
      },
      {
        name: "Slavish Devotion",
        effect: "Those already underneath Dominate find it easier to resist other kindred's Dominate",
        cost: "Free",
        prerequisite: "None",
        amalgam: "Fortitude ●",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Attempts by a third party take a dice penalty equal to the other vampire's Fortitude rating",
        source: "Vampire: The Masquerade Players Guide, page 73"
      }
    ],
    level2: [
      {
        name: "Mesmerize",
        effect: "Issue complex commands",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "None",
        duration: "Until command is carried out or the scene ends",
        dicePool: "Manipulation + Dominate",
        opposingPool: "Intelligence + Resolve",
        notes: "No rolls are needed when the target is an unprepared mortal. However, if this goes against their nature they may roll to resist",
        source: "Vampire: The Masquerade Corebook, page 256"
      },
      {
        name: "Dementation",
        effect: "Drive others insane",
        cost: "One Rouse Check per target per Scene",
        prerequisite: "None",
        amalgam: "Obfuscate ●●",
        duration: "One scene",
        dicePool: "Manipulation + Dominate",
        opposingPool: "Composure + Intelligence",
        notes: "To use this power, the user must have had a conversation with them",
        source: "Vampire: The Masquerade Corebook, page 256"
      },
      {
        name: "Domitor's Favor",
        effect: "Make defiance while under a Blood Bond more difficult",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "None",
        duration: "One month",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Total fail on defiance rolls means the bond does not weaken that month",
        source: "Vampire: The Masquerade Players Guide, page 74"
      }
    ],
    level3: [
      {
        name: "Forgetful Mind",
        effect: "Rewrite someone's memory",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "Indefinitely",
        dicePool: "Manipulation + Dominate",
        opposingPool: "Intelligence + Resolve",
        notes: "Each point of margin on the test allows one additional memory to be altered",
        source: "Vampire: The Masquerade Corebook, page 257"
      },
      {
        name: "Submerged Directive",
        effect: "Implant Dominate orders as suggestions for victims",
        cost: "Free",
        prerequisite: "Mesmerize",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "These orders never expire until completed and targets can only have one at a time",
        source: "Vampire: The Masquerade Corebook, page 257"
      }
    ],
    level4: [
      {
        name: "Ancestral Dominion",
        effect: "Urge a descendant to act even if against their own opinion",
        cost: "One Rouse Check",
        prerequisite: "Mesmerize",
        amalgam: "Blood Sorcery ●●",
        duration: "Until the command is carried out or the scene ends",
        dicePool: "Manipulation + Dominate",
        opposingPool: "Intelligence + Resolve",
        notes: "For each generation separating them, the target gains an additional die to resist",
        source: "Vampire: The Masquerade Players Guide, page 74"
      },
      {
        name: "Implant Suggestion",
        effect: "Change another's personality or opinion temporarily",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Presence ●",
        duration: "One scene",
        dicePool: "Manipulation + Dominate",
        opposingPool: "Composure + Resolve",
        notes: "No test required for unprepared mortals unless it's a change that opposes their core beliefs",
        source: "Vampire: The Masquerade Players Guide, page 74"
      },
      {
        name: "Rationalize",
        effect: "Convince victims of Dominate it was their idea the entire time",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Indefinitely",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "If pressed on their actions the victim can make a test and if successful they question their actions",
        source: "Vampire: The Masquerade Corebook, page 257"
      },
      {
        name: "Tabula Rasa",
        effect: "Erase the victim's memory to the point they don't know who they are",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "Permanent",
        dicePool: "Resolve + Dominate",
        opposingPool: "Composure + Resolve",
        notes: "Following this power's use is generally a string of lies and Path Indoctrination",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 47"
      }
    ],
    level5: [
      {
        name: "Lethe's Call",
        effect: "Erase weeks' worth of memory",
        cost: "One Rouse Check",
        prerequisite: "Cloud Memory or Forgetful Mind",
        amalgam: "No",
        duration: "Indefinitely",
        dicePool: "Manipulation + Dominate",
        opposingPool: "Intelligence + Resolve",
        notes: "Unprepared mortals cannot test to resist the power. With a verbal command only memories surrounding the spoken subject will be erased",
        source: "Gehenna War, page 46"
      },
      {
        name: "Mass Manipulation",
        effect: "Extend effects of Dominate to multiple targets",
        cost: "One Rouse Check in addition to power it's added to",
        prerequisite: "None",
        amalgam: "No",
        duration: "As per power amplified",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The victims need to see the eyes of the user. The user makes the roll against the strongest of the group",
        source: "Vampire: The Masquerade Corebook, page 257"
      },
      {
        name: "Terminal Decree",
        effect: "Bolster effects of Dominate to be able to circumvent victims' self-preservation",
        cost: "Free but will give Stains",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Terminal commands are always resisted instead of auto failing",
        source: "Vampire: The Masquerade Corebook, page 257"
      }
    ]
  },
  amalgams: [
    {
      name: "Messenger's Command",
      discipline: "Animalism",
      level: "●",
      dominateLevel: "●",
      effect: "Use a Famulus to send a message to someone",
      cost: "One Rouse Check per night",
      dicePool: "None",
      source: "Vampire: The Masquerade Players Guide, page 69"
    },
    {
      name: "Irresistible Voice",
      discipline: "Presence",
      level: "●●●●",
      dominateLevel: "●",
      effect: "The user's voice alone is enough to use Dominate on a target",
      cost: "None",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Corebook, page 268"
    },
    {
      name: "Mask of Isolation",
      discipline: "Obfuscate",
      level: "●●●",
      dominateLevel: "●",
      effect: "Force the effect of Mask of a Thousand Faces onto a victim",
      cost: "One Rouse Check",
      dicePool: "Manipulation + Obfuscate",
      source: "Vampire: The Masquerade Sabbat: The Black Hand, page 48"
    },
    {
      name: "Mental Maze",
      discipline: "Obfuscate",
      level: "●●●",
      dominateLevel: "●",
      effect: "Remove all sense of direction and location from a victim in a location",
      cost: "One or Three Rouse Checks",
      dicePool: "Charisma + Obfuscate",
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 85"
    },
    {
      name: "Unerring Pursuit",
      discipline: "Auspex",
      level: "●●",
      dominateLevel: "●",
      effect: "Tracking a victim",
      cost: "One Rouse Check",
      dicePool: "Resolve + Auspex",
      source: "Vampire: The Masquerade Sabbat: The Black Hand, page 46"
    },
    {
      name: "Mind Masque",
      discipline: "Obfuscate",
      level: "●●●",
      dominateLevel: "●●",
      effect: "Hide and replace emotions and thoughts against those who wish to read them, be it through mundane or supernatural means",
      cost: "One Rouse Check",
      dicePool: "Intelligence + Obfuscate",
      source: "Vampire: The Masquerade Players Guide, page 78"
    },
    {
      name: "Vicissitude",
      discipline: "Protean",
      level: "●●",
      dominateLevel: "●●",
      effect: "Sculpt the flesh of bodies",
      cost: "One Rouse Check",
      dicePool: "Resolve + Protean",
      source: "Vampire: The Masquerade Players Guide, page 81"
    },
    {
      name: "Fleshcrafting",
      discipline: "Protean",
      level: "●●●",
      dominateLevel: "●●",
      effect: "Extends the mastery over the flesh",
      cost: "One Rouse Check",
      dicePool: "Resolve + Protean",
      source: "Vampire: The Masquerade Players Guide, page 82"
    },
    {
      name: "Horrid Form",
      discipline: "Protean",
      level: "●●●●",
      dominateLevel: "●●",
      effect: "Take on a monstrous shape",
      cost: "One Rouse Check",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Players Guide, page 83"
    },
    {
      name: "Clear the Field",
      discipline: "Presence",
      level: "●●●",
      dominateLevel: "●●●",
      effect: "Force others to leave the area in a calm and orderly manner",
      cost: "One Rouse Check",
      dicePool: "Composure + Presence",
      source: "Vampire: The Masquerade Fall of London, page 177"
    },
    {
      name: "Possession",
      discipline: "Auspex",
      level: "●●●●●",
      dominateLevel: "●●●",
      effect: "Possess a mortal body",
      cost: "Two Rouse Checks",
      dicePool: "Resolve + Auspex",
      source: "Vampire: The Masquerade Corebook, page 251"
    },
    {
      name: "Unburdening the Bestial Soul",
      discipline: "Auspex",
      level: "●●●●●",
      dominateLevel: "●●●",
      effect: "Stain removal or protection from Stains",
      cost: "Two Rouse Checks, 1 Stain",
      dicePool: "Composure + Auspex",
      source: "Vampire: The Masquerade Companion, page 24"
    }
  ]
}; 
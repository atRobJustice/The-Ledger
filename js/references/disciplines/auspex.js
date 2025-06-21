const auspex = {
  name: "Auspex",
  nicknames: ["Voyeurism", "Scrying", "Anima Visus"],
  affinity: ["Hecata", "Malkavian", "Salubri", "Toreador", "Tremere"],
  type: "Mental",
  threat: "Low",
  resonance: "Phlegmatic",
  overview: "Considered a potent double sword, Auspex allows Kindred to sift out the truth from lies and read the minds around them, able to feel emotions from others beyond mortal skill and receive horrifying flashes of the future. Reality can be perceived differently by the Auspex user, giving them information that they may wish to never know and, in turn, opens the gateway to paranoia. Those able to master this volatile Discipline make excellent spies, detectives, and seers in courts and factions.",
  powers: {
    level1: [
      {
        name: "Heightened Senses",
        effect: "Enhance vampiric senses and add Auspex rating to all perception rolls",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Until Deactivated",
        dicePool: "Wits + Resolve",
        opposingPool: "N/A",
        notes: "Having the power activated for long periods might require the use of Willpower",
        source: "Vampire: The Masquerade Corebook, page 249"
      },
      {
        name: "Sense the Unseen",
        effect: "Sense supernatural activity",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "Wits/Resolve + Auspex",
        opposingPool: "N/A",
        notes: "If the target is using Obfuscate they oppose using Wits + Obfuscate vs the user's Wits + Auspex, normal searches use Resolve",
        source: "Vampire: The Masquerade Corebook, page 249"
      }
    ],
    level2: [
      {
        name: "Panacea",
        effect: "Heals Willpower and calms nerves",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Fortitude ●",
        duration: "N/A",
        dicePool: "Composure + Auspex",
        opposingPool: "N/A",
        notes: "If the user uses this on more than one subject on the same night, the cost increases to spend Willpower equal to half the number of successes in the margin per additional target",
        source: "Vampire: The Masquerade Players Guide, page 70"
      },
      {
        name: "Premonition",
        effect: "Visions of the future",
        cost: "Free / One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "Resolve + Auspex",
        opposingPool: "N/A",
        notes: "The Storyteller may activate this power passively with no cost, when used actively the user must make a Rouse Check and roll Resolve + Auspex",
        source: "Vampire: The Masquerade Corebook, page 249"
      },
      {
        name: "Reveal Temperament",
        effect: "Smell the Resonance of a target and/or if Dyscrasia is present",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "Intelligence + Auspex",
        opposingPool: "Composure + Subterfuge",
        notes: "When used on Kindred this reveals information about their last feed",
        source: "Vampire: The Masquerade Players Guide, page 71"
      },
      {
        name: "Unerring Pursuit",
        effect: "Tracking a victim",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Dominate ●",
        duration: "One night plus one for each success",
        dicePool: "Resolve + Auspex",
        opposingPool: "N/A",
        notes: "The victim can roll Wits + Awareness to catch a glimpse of the user once under its effects",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 46"
      }
    ],
    level3: [
      {
        name: "Vermin Vision",
        effect: "Share the senses with animals",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Animalism ●●",
        duration: "One scene",
        dicePool: "Resolve + Animalism",
        opposingPool: "N/A",
        notes: "This power works through groups of animals",
        source: "Vampire: The Masquerade Fall of London, page 30"
      },
      {
        name: "Fatal Flaw",
        effect: "Find the weakness of a target",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Oblivion ●",
        duration: "One scene",
        dicePool: "Intelligence + Auspex",
        opposingPool: "Composure/Stamina + Subterfuge",
        notes: "It can be defended against with Composure for mental weaknesses or with Stamina for physical",
        source: "Vampire: The Masquerade Players Guide, page 71"
      },
      {
        name: "Scry the Soul",
        effect: "Perceives information about the target",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Intelligence + Auspex",
        opposingPool: "Composure + Subterfuge",
        notes: "This can either be used on a single target or a crowd",
        source: "Vampire: The Masquerade Corebook, page 250"
      },
      {
        name: "Share the Senses",
        effect: "Tapping into other's senses",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "Resolve + Auspex",
        opposingPool: "N/A",
        notes: "Sense the Unseen can allow the user to be noticed by the victim",
        source: "Vampire: The Masquerade Corebook, page 250"
      }
    ],
    level4: [
      {
        name: "Spirit's Touch",
        effect: "Gathering emotional residue from an object or location",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Intelligence + Auspex",
        opposingPool: "N/A",
        notes: "What information they gleam works from the most recent backward",
        source: "Vampire: The Masquerade Corebook, page 250"
      }
    ],
    level5: [
      {
        name: "Clairvoyance",
        effect: "Information gathering from surroundings",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "Few minutes up to one night",
        dicePool: "Intelligence + Auspex",
        opposingPool: "N/A",
        notes: "This power can be used to monitor events in progress",
        source: "Vampire: The Masquerade Corebook, page 251"
      },
      {
        name: "Possession",
        effect: "Possess a mortal body",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "Dominate ●●●",
        duration: "Until ended",
        dicePool: "Resolve + Auspex",
        opposingPool: "Resolve + Intelligence",
        notes: "This power does not give the ability to read the target's mind, use their skills or impersonate them",
        source: "Vampire: The Masquerade Corebook, page 251"
      },
      {
        name: "Telepathy",
        effect: "Read minds and project thoughts",
        cost: "One Rouse (one Willpower on non-consenting vampires)",
        prerequisite: "None",
        amalgam: "No",
        duration: "One minute per rouse or full scene on consenting subject",
        dicePool: "Resolve + Auspex",
        opposingPool: "Wits + Subterfuge",
        notes: "The user doesn't need to roll to project their thoughts onto others",
        source: "Vampire: The Masquerade Corebook, page 252"
      },
      {
        name: "Unburdening the Bestial Soul",
        effect: "Stain removal or protection from Stains",
        cost: "Two Rouse checks, 1 Stain",
        prerequisite: "Panacea",
        amalgam: "Dominate ●●●",
        duration: "One session",
        dicePool: "Composure + Auspex",
        opposingPool: "N/A",
        notes: "This power only works on vampires with a lower Humanity rating",
        source: "Vampire: The Masquerade Players Guide, page 71"
      }
    ]
  },
  amalgams: [
    {
      name: "Invigorating Vitae",
      discipline: "Fortitude",
      level: "●●",
      auspexRequired: "●",
      effect: "Heal mortals faster with the Blood",
      cost: "None other than the Rouse Checks to give Blood",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Players Guide, page 75"
    },
    {
      name: "Valeren",
      discipline: "Fortitude",
      level: "●●●",
      auspexRequired: "●",
      effect: "Mend an injured vampire",
      cost: "One Rouse Check",
      dicePool: "Intelligence + Fortitude",
      source: "Vampire: The Masquerade Players Guide, page 75"
    },
    {
      name: "Thrown Voice",
      discipline: "Presence",
      level: "●●●",
      auspexRequired: "●",
      effect: "Throw their voice from any point within sight and leave the voice there",
      cost: "One Rouse Check",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Players Guide, page 80"
    },
    {
      name: "Fatal Prediction",
      discipline: "Oblivion",
      level: "●●",
      auspexRequired: "●●",
      effect: "Increase the chances of a mortal being harmed by exterior forces",
      cost: "One Rouse Check",
      dicePool: "Resolve + Oblivion",
      source: "Vampire: The Masquerade Players Guide, page 87"
    },
    {
      name: "Fatal Precognition",
      discipline: "Oblivion",
      level: "●●",
      auspexRequired: "●●",
      effect: "Vision of a non-vampires death",
      cost: "One Rouse Check",
      dicePool: "Resolve + Oblivion",
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 204"
    },
    {
      name: "Ventriloquism",
      discipline: "Obfuscate",
      level: "●●",
      auspexRequired: "●●",
      effect: "Throwing one's voice",
      cost: "One Rouse Check",
      dicePool: "Wits + Obfuscate",
      source: "Vampire: The Masquerade Fall of London, page 148"
    },
    {
      name: "Unerring Aim",
      discipline: "Celerity",
      level: "●●●●",
      auspexRequired: "●●",
      effect: "Slow the world down to attack",
      cost: "One Rouse Check",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Corebook, page 254"
    },
    {
      name: "Conceal",
      discipline: "Obfuscate",
      level: "●●●●",
      auspexRequired: "●●●",
      effect: "Cloak an inanimate object",
      cost: "One Rouse Check",
      dicePool: "Intelligence + Obfuscate",
      source: "Vampire: The Masquerade Corebook, page 262"
    },
    {
      name: "Magnum Opus",
      discipline: "Presence",
      level: "●●●●",
      auspexRequired: "●●●",
      effect: "Infusing Presence into artwork",
      cost: "One or more Rouse Check",
      dicePool: "Charisma/Manipulation + Craft",
      source: "Vampire: The Masquerade Winter's Teeth #3"
    }
  ]
};
window.auspex = auspex; 
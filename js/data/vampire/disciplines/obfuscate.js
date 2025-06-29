export const obfuscate = {
  name: "Obfuscate",
  nicknames: ["Stealth Mode", "Cloaking", "Veiling", "Occulto"],
  affinity: ["Banu Haqim", "Malkavian", "The Ministry", "Nosferatu", "Ravnos"],
  type: "Mental",
  threat: "Low",
  resonance: "Melancholic",
  overview: "Obfuscate is a power that allows the Kindred to hide easily, move without being noticed, and cast illusions. It gives users the ability to get close to victims or disguise themselves as well as give them an out when a situation gets too complicated. The power itself is not invisibility, instead, it works through mental magic, tricking the mind of others to ignore the kindred presence or see a mundane face instead. Unless otherwise stated Obfuscate affects all five senses and coaxes victims to step out of the way to the point of rationalizing to themselves about why they are avoiding that particular corner. However, there are limitations to this power. The power will fail if the victim cannot ignore the user such as being backed into a corner or being blocked from a doorway they wish to walk through. As well as violent actions, loud noises or failed rolls to tamper with items. Without Ghost in the Machine, the kindred is easily recognized by machine surveillance. Users of Sense the Unseen, are able to roll against these powers, as well as those about to be struck by a sneak attack. Without the use of Vanish, users are unable to use Obfuscate while under observation from others.",
  powers: {
    level1: [
      {
        name: "Cloak of Shadows",
        effect: "As long as the user stands still they blend into their surroundings",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Follows the general rules for Obfuscate",
        source: "Vampire: The Masquerade Corebook, page 261"
      },
      {
        name: "Ensconce",
        effect: "Make others ignore small objects that are held on the vampire's body",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Sense Unseen can pierce this power",
        source: "Gehenna War, page 46"
      },
      {
        name: "Silence of Death",
        effect: "Nullifies the sounds a user makes",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power does not eliminate powers made outside of the user's personal space",
        source: "Vampire: The Masquerade Corebook, page 261"
      }
    ],
    level2: [
      {
        name: "Cache",
        effect: "Hide objects that are not held by the vampire",
        cost: "One Rouse Check",
        prerequisite: "Ensconce",
        amalgam: "No",
        duration: "One scene or until dawn",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This can be extended for the duration of the night with an extra rouse check",
        source: "Gehenna War, page 47"
      },
      {
        name: "Chimestry",
        effect: "Create brief but realistic hallucinations",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Presence ●",
        duration: "One turn",
        dicePool: "Manipulation + Obfuscate",
        opposingPool: "Composure + Wits",
        notes: "This can be used in combat but can only affect targets once per conflict",
        source: "Vampire: The Masquerade Players Guide, page 76"
      },
      {
        name: "Ghost's Passing",
        effect: "The user can bestow Obfuscate onto an animal's tracks",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Animalism ●",
        duration: "One session",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Sense the Unseen can discern signs as per general Obfuscate rules",
        source: "Vampire: The Masquerade Forbidden Religions, page 18"
      },
      {
        name: "Unseen Passage",
        effect: "The user can now move while remaining hidden",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until detection",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power will fail if the user is being actively watched when activated",
        source: "Vampire: The Masquerade Corebook, page 261"
      },
      {
        name: "Ventriloquism",
        effect: "Throw their voice so only the intended recipient can hear it",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●●",
        duration: "One scene",
        dicePool: "Wits + Obfuscate",
        opposingPool: "Resolve + Composure",
        notes: "Can be used on anyone in line of sight",
        source: "Vampire: The Masquerade Fall of London, page 148"
      },
      {
        name: "Doubletalk",
        effect: "Say one thing but convey something else in secret",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●",
        duration: "One utterance",
        dicePool: "Composure + Obfuscate",
        opposingPool: "Wits + Auspex",
        notes: "Others present can contest",
        source: "Vampire: The Masquerade Blood Stained Love, page 152"
      }
    ],
    level3: [
      {
        name: "Fata Morgana",
        effect: "Elaborate hallucinations",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Presence ●●",
        duration: "One scene, unless let to lapse",
        dicePool: "Manipulation + Obfuscate",
        opposingPool: "N/A",
        notes: "If the hallucination can trigger Frenzy, give the test at 1 diff lower than the real thing",
        source: "Vampire: The Masquerade Players Guide, page 77"
      },
      {
        name: "Ghost in the Machine",
        effect: "Allows the effects of Obfuscate to be transmitted through technology when viewed on a live screen",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "As power used",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "If viewed later the image seems blurred, making identification harder",
        source: "Vampire: The Masquerade Corebook, page 262"
      },
      {
        name: "Mask of a Thousand Faces",
        effect: "Make themselves appear as a mundane face rather than disappear allowing interaction and communication",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power allows them to interact and speak to others around them",
        source: "Vampire: The Masquerade Corebook, page 262"
      },
      {
        name: "Mask of Isolation",
        effect: "Force Mask of a Thousand Faces onto a victim",
        cost: "One Rouse Check",
        prerequisite: "Mask of a Thousand Faces",
        amalgam: "Dominate ●",
        duration: "One night plus one additional night per margin of success",
        dicePool: "Manipulation + Obfuscate",
        opposingPool: "Charisma + Insight",
        notes: "Should the user be made aware of the power being used on them the effects end",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 48"
      },
      {
        name: "Mental Maze",
        effect: "Remove all sense of direction and location from a victim in a location",
        cost: "One or Three Rouse Checks",
        prerequisite: "None",
        amalgam: "Dominate ●",
        duration: "One night",
        dicePool: "Charisma + Obfuscate",
        opposingPool: "Wits + Resolve",
        notes: "Eye contact is required to active the power",
        source: "Vampire: The Masquerade Players Guide, page 77"
      },
      {
        name: "Mind Masque",
        effect: "Hide and replace emotions and thoughts against those who wish to read them through supernatural means",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Dominate ●●",
        duration: "One scene",
        dicePool: "Intelligence + Obfuscate",
        opposingPool: "N/A",
        notes: "The difficulty to mask their emotion depends on how complicated they want the ruse to be",
        source: "Vampire: The Masquerade Players Guide, page 78"
      }
    ],
    level4: [
      {
        name: "Conceal",
        effect: "Cloak an inanimate object",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●●●",
        duration: "One night plus one additional night per margin of success",
        dicePool: "Intelligence + Obfuscate",
        opposingPool: "N/A",
        notes: "This power cannot affect anything larger than a two-story house or anything moving on it's own",
        source: "Vampire: The Masquerade Corebook, page 262"
      },
      {
        name: "Vanish",
        effect: "Activate Cloak of Shadows or Unseen Passage while being observed",
        cost: "As per power augmented",
        prerequisite: "Cloak of Shadows",
        amalgam: "No",
        duration: "As per power augmented",
        dicePool: "Wits + Obfuscate",
        opposingPool: "Wits + Awareness",
        notes: "This power makes the memory of the Kindred foggy and indistinct, but it will not affect the memories of vampires",
        source: "Vampire: The Masquerade Corebook, page 262"
      }
    ],
    level5: [
      {
        name: "Cloak the Gathering",
        effect: "Shelter companions under Obfuscate",
        cost: "One Rouse Check in additional to the cost of the power extended",
        prerequisite: "None",
        amalgam: "No",
        duration: "As per power extended",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power extends to a number of people equal to the user's Wits, plus additional Rouse Checks",
        source: "Vampire: The Masquerade Corebook, page 263"
      },
      {
        name: "Impostor's Guise",
        effect: "Appear as someone else",
        cost: "One Rouse Check",
        prerequisite: "Mask of a Thousand Faces",
        amalgam: "No",
        duration: "One scene",
        dicePool: "Wits + Obfuscate",
        opposingPool: "Manipulation + Performance",
        notes: "The face they wish to copy must be studied for at least five minutes from multiple angles",
        source: "Vampire: The Masquerade Corebook, page 263"
      }
    ]
  },
  amalgams: [
    {
      name: "Dementation",
      discipline: "Dominate",
      level: "●●",
      obfuscateLevel: "●●",
      effect: "Drive others insane",
      cost: "One Rouse Check per scene",
      dicePool: "Manipulation + Dominate",
      source: "Vampire: The Masquerade Corebook, page 255"
    },
    {
      name: "Unliving Hive",
      discipline: "Animalism",
      level: "●●●",
      obfuscateLevel: "●●",
      effect: "Extend animal influence to swarms of insects",
      cost: "Free",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Corebook, page 246"
    },
    {
      name: "True Love's Face",
      discipline: "Presence",
      level: "●●●",
      obfuscateLevel: "●●●",
      effect: "The victim will perceive the user as a mortal they have strong emotional ties with, be it hatred or love",
      cost: "One Rouse Check",
      dicePool: "Manipulation + Presence",
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 85"
    },
    {
      name: "Unseen Strike",
      discipline: "Celerity",
      level: "●●●●",
      obfuscateLevel: "●●●●",
      effect: "Vanish, blink forwards, and surprise attack an enemy",
      cost: "Two Rouse Checks",
      dicePool: "Dexterity + Celerity",
      source: "Vampire: The Masquerade Players Guide, page 73"
    }
  ]
}; 
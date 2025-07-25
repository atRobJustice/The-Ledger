export const potence = {
  name: "Potence",
  nicknames: ["Hulking", "Blood's Might", "Percutio"],
  affinity: ["Brujah", "Nosferatu", "Lasombra"],
  type: "Physical",
  threat: "Medium to High",
  resonance: "Choleric",
  overview: "Potence fuels the strength behind a hit, enhancing their strikes to a deceptive degree as a frail kindred decapitates a target with one hit. This vitae-fueled power up goes beyond simply being useful in a fight, as it also enables the user to force their body into actions impossible for most to replicate without it. The Brujah use this power as a lethal weapon to cut short any confrontation they don't want to deal with and crack any skulls in their way. They also utilize their strengths with Presence to sway the crowds through Spark of Rage. While they may still feel a deeper connection to Humanity, in their hands this power is a devastating force. Many Nosferatu hesitate to use this power in front of mortals as it will break their deceptive nature. However, when given no choice they understand better than most clans the need to hit and run. Few Lasombra use this power to feed, instead favoring it for the eradication of an enemy with their hands or ripping through a door to command fear and respect.",
  powers: {
    level1: [
      {
        name: "Fluent Strength",
        effect: "Reroll Blood Surge rouse checks on Strength or Potence rolls",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Once",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Gehenna War, page 47"
      },
      {
        name: "Lethal Body",
        effect: "Unarmed attacks do Aggravated Health damage to mortals when used and ignore one level of armor per Potence rating of user",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Corebook, page 264"
      },
      {
        name: "Soaring Leap",
        effect: "Leap higher and further than usual",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "They can move as many meters as three times their Potence rating",
        source: "Vampire: The Masquerade Corebook, page 264"
      }
    ],
    level2: [
      {
        name: "Prowess",
        effect: "Add Potence rating to their unarmed damage and to feats of Strength, add half their Potence rating (Rounded up) to Melee damage",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Corebook, page 264"
      },
      {
        name: "Relentless Grasp",
        effect: "Gain supernatural grip strength",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Does not benefit the initial grapple test",
        source: "Vampire: The Masquerade Players Guide, page 79"
      }
    ],
    level3: [
      {
        name: "Brutal Feed",
        effect: "Turn feeding into a violent and messy affair that only lasts seconds to Slake the user's Hunger",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One feeding",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Against vampires the number of feeding actions is halved (rounded down)",
        source: "Vampire: The Masquerade Corebook, page 264"
      },
      {
        name: "Spark of Rage",
        effect: "The user can add their Potence rating to rile or incite a person or crowd to violent actions",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Presence ●●●",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Against vampires, the user will roll Manipulation + Potence vs Intelligence + Composure",
        source: "Vampire: The Masquerade Corebook, page 265"
      },
      {
        name: "Uncanny Grip",
        effect: "Strengthens their grip on most surfaces, allowing them to climb or hang unsupported",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The use of this power leaves obvious traces from the damage caused",
        source: "Vampire: The Masquerade Corebook, page 265"
      },
      {
        name: "Wrecker",
        effect: "Double Potence rating when used for feats of strength",
        cost: "Free",
        prerequisite: "Prowess",
        amalgam: "No",
        duration: "Refer Prowess",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "It cannot be used against living targets",
        source: "Vampire: The Masquerade Players Guide, page 79"
      }
    ],
    level4: [
      {
        name: "Draught of Might",
        effect: "Turn their vitae into a Potence boost for others",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One night",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Each drinker must take one Rouse Checks worth",
        source: "Vampire: The Masquerade Corebook, page 265"
      },
      {
        name: "Crash Down",
        effect: "Deal damage to a small area when using Soaring Leap",
        cost: "One Rouse Check",
        prerequisite: "Soaring Leap",
        amalgam: "No",
        duration: "N/A",
        dicePool: "Strength + Potence",
        opposingPool: "Dexterity + Athletics",
        notes: "If opponents total fail or take 3 or more levels of damage they are knocked down",
        source: "Vampire: The Masquerade Players Guide, page 79"
      }
    ],
    level5: [
      {
        name: "Earth Shock",
        effect: "Create a shockwave to throw opponents prone",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One use",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This can only be used once per scene",
        source: "Vampire: The Masquerade Corebook, page 265"
      },
      {
        name: "Fist of Caine",
        effect: "Inflict Aggravated Health damage to mortals and supernatural creatures alike",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Corebook, page 266"
      },
      {
        name: "Subtle Hammer",
        effect: "Project the vampire's power in a specific body part",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "You cannot make another attack in the same move, but body parts that have limited movement receive a four-dice bonus or more",
        source: "Vampire: The Masquerade Players Guide, page 79"
      }
    ]
  },
  amalgams: [
    {
      name: "Arms of Ahriman",
      discipline: "Oblivion",
      level: "●●",
      potenceLevel: "●●",
      effect: "Conjures shadow appendages which the user can control",
      cost: "One Rouse Check",
      dicePool: "Wits + Oblivion",
      source: "Vampire: The Masquerade Chicago by Night, page 294"
    },
    {
      name: "Obdurate",
      discipline: "Fortitude",
      level: "●●",
      potenceLevel: "●●",
      effect: "Maintain footing when hit with a massive force",
      cost: "One Rouse Check",
      dicePool: "Wits + Survival",
      source: "Vampire: The Masquerade Winter's Teeth #3"
    }
  ]
}; 
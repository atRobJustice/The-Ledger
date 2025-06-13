export const fortitude = {
  name: "Fortitude",
  nicknames: ["Bricking Up", "Stone Flesh", "Resistentia"],
  affinity: ["Gangrel", "Hecata", "Salubri", "Ventrue"],
  type: "Physical",
  threat: "Medium",
  resonance: "Melancholic",
  overview: "Fortitude allows vampires to resist both physical and mental attacks. The hardiness it creates helps many kindred survive and is a trait most immortal would seek out to survive the violence, fire, and supernatural coercion they experience during their nights. The Gangrel who develop their strengths in this Discipline expect harm to come their way, serving as bodyguards or soldiers for other kindred. This also allows them to track and hunt prey in harsh environments. Their innate prowess with Animalism links them to their animals even more with Enduring Beasts. Ventrue use this power to uphold their thrones even when armies amass against them, feeding in adverse situations. They never run short of vitae and always take their fill. While the Hecata are closer to death than any other clan, they use this power to keep above it. As attacks reign down upon them, they shrug them off and throwback with their Necromancy. The Salubri avoid elimination through the use of these powers, but also enhance it in their own way to aid others through the use of Valeren.",
  powers: {
    level1: [
      {
        name: "Fluent Endurance",
        effect: "Reroll the Blood Surge rouse check on a Stamina or Fortitude test",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Once",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Gehenna War, page 46"
      },
      {
        name: "Resilience",
        effect: "Add their Fortitude rating to the health track",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Corebook, page 258"
      },
      {
        name: "Unswayable Mind",
        effect: "Add Fortitude rating to rolls to resist methods to sway the character's mind against their will including supernatural",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Corebook, page 258"
      }
    ],
    level2: [
      {
        name: "Earth's Perseverance",
        effect: "Become impossible to move from that spot",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until let go by user",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "While they cannot be moved, they can still be harmed and so can the floor beneath them",
        source: "Vampire: The Masquerade Players Guide, page 74"
      },
      {
        name: "Enduring Beasts",
        effect: "Share the vampire's toughness with animals",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Animalism ●",
        duration: "One scene",
        dicePool: "Stamina + Animalism",
        opposingPool: "N/A",
        notes: "If used on their Famulus, it is free and automatic without a roll required",
        source: "Vampire: The Masquerade Corebook, page 258"
      },
      {
        name: "Invigorating Vitae",
        effect: "Heal mortals faster with the Blood",
        cost: "None other than the Rouse Checks to give Blood",
        prerequisite: "None",
        amalgam: "Auspex ●",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The risk of ghouling or blood bonding remains present",
        source: "Vampire: The Masquerade Players Guide, page 75"
      },
      {
        name: "Obdurate",
        effect: "Maintain footing when hit with a massive force",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Potence ●●",
        duration: "One scene",
        dicePool: "Wits + Survival",
        opposingPool: "N/A",
        notes: "Any superficial damage from falling or being hit is reduced by the Fortitude score, before being halved",
        source: "Vampire: The Masquerade Winter's Teeth #3"
      },
      {
        name: "Toughness",
        effect: "Subtract the Fortitude rating from all superficial damage taken before halving, it cannot be rounded down below one",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This occurs before halving the damage but cannot reduce it below one",
        source: "Vampire: The Masquerade Corebook, page 258"
      }
    ],
    level3: [
      {
        name: "Defy Bane",
        effect: "Convert Aggravated Damage to Superficial Damage",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until expired",
        dicePool: "Wits + Survival",
        opposingPool: "N/A",
        notes: "They may not heal the superficial damage for the rest of the scene",
        source: "Vampire: The Masquerade Corebook, page 259"
      },
      {
        name: "Fortify the Inner Façade",
        effect: "Increasing the Difficulty of mental powers to read or pierce the mind by half of the Fortitude Rating",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "If the rules allow them to resist, they add their Fortitude rating to their pool instead",
        source: "Vampire: The Masquerade Corebook, page 259"
      },
      {
        name: "Seal the Beast's Maw",
        effect: "A vampire can ignore the effects of hunger if they do not increase hunger from the two Rouse Checks, but reduce their dice pools",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "If a dice pool reduces to 0, a Fury Frenzy test is made",
        source: "Vampire: The Masquerade Forbidden Religions, page 44"
      },
      {
        name: "Valeren",
        effect: "Mend an injured vampire",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●",
        duration: "N/A",
        dicePool: "Intelligence + Fortitude",
        opposingPool: "N/A",
        notes: "A subject can be affected by the power only once a night",
        source: "Vampire: The Masquerade Companion, page 25"
      }
    ],
    level4: [
      {
        name: "Draught of Endurance",
        effect: "Turn their vitae into a Fortitude boost for others",
        cost: "One Rouse Check + Drinkers",
        prerequisite: "None",
        amalgam: "No",
        duration: "One night",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Each drinker must take one Rouse Checks worth",
        source: "Vampire: The Masquerade Corebook, page 259"
      },
      {
        name: "Gorgon's Scales",
        effect: "Resonances give the Kindred different bonuses",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until the Resonance is lost",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Choleric frees vampires from being staked, Melancholy reduces fire damage, Phlegmatic strengthens against Auspex and, Sanguine reduces damage from sunlight",
        source: "Vampire: The Masquerade Players Guide, page 75"
      },
      {
        name: "Shatter",
        effect: "The opponent takes the damage which Toughness subtracts",
        cost: "One Rouse Check",
        prerequisite: "Toughness",
        amalgam: "No",
        duration: "One scene or until hit",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Weapons will break if their modifier is met in damage received",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 104"
      }
    ],
    level5: [
      {
        name: "Flesh of Marble",
        effect: "Ignore the first source of physical damage each turn unless sunlight",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "A critical win on an attack bypasses this power",
        source: "Vampire: The Masquerade Corebook, page 259"
      },
      {
        name: "Prowess from Pain",
        effect: "No longer suffers penalty from Health damage and can increase one Attribute per level of damage on their tracker",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The Attributes may not exceed their Blood Surge value + 6",
        source: "Vampire: The Masquerade Corebook, page 260"
      }
    ]
  },
  amalgams: [
    {
      name: "Panacea",
      discipline: "Auspex",
      level: "●●",
      fortitudeLevel: "●",
      effect: "Heals Willpower calms nerves",
      cost: "Free",
      dicePool: "Composure + Auspex",
      source: "Vampire: The Masquerade Companion, page 24"
    },
    {
      name: "Slavish Devotion",
      discipline: "Dominate",
      level: "●",
      fortitudeLevel: "●",
      effect: "Those already underneath Dominate find it easier to resist other Kindred's Dominate",
      cost: "Free",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Players Guide, page 73"
    },
    {
      name: "Heart of Darkness",
      discipline: "Protean",
      level: "●●●●●",
      fortitudeLevel: "●●",
      effect: "Allows a vampire to remove their own heart and store it outside of their body",
      cost: "Free",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 85"
    },
    {
      name: "Passion Feast",
      discipline: "Oblivion",
      level: "●●●",
      fortitudeLevel: "●●",
      effect: "Allows a vampire to slake hunger on the passion of wraiths",
      cost: "Free",
      dicePool: "Resolve + Oblivion",
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 206"
    }
  ]
}; 
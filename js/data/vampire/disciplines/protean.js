export const protean = {
  name: "Protean",
  nicknames: ["Morphing", "Shapeshifting", "Mutatio"],
  affinity: ["Gangrel", "The Ministry", "Tzimisce"],
  type: "Physical",
  threat: "High",
  resonance: "Animal Blood",
  overview: "Protean is a power that shapes and mutates the form of the user. This power is employed for its utility above all else, allowing the user to become a beast, turn their limbs into weapons or touch the more animalistic side of their Beast. Small items on the user are affected by this power, however, backpacks and other large items are not. The Gangrel are perhaps the most mastered with this Discipline, as few possess the gifts. They use their abilities to Shapechange in many ways and notably consider feeding this way the best of kills. Ministers use this power to extend their monstrous fangs or to take the shape of animals, generally taking the form of a snake over a wolf. However, they still use Earth Meld as the Gangrel do to avoid the sun. Tzimisce are masters of their form, controlling their shape and appearance at will. With their combined mastery of Dominate, they can manipulate their flesh and that of others with powers such as Fleshcrafting and Vicissitude. They also use Protean to shape themselves into other forms such as a bat or wolf.",
  powers: {
    level1: [
      {
        name: "Eyes of the Beast",
        effect: "Allows the user to see in total darkness",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "As long as desired",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "+2 bonus dice to intimidation against mortals when active",
        source: "Vampire: The Masquerade Corebook, page 269"
      },
      {
        name: "Weight of the Feather",
        effect: "The user can make themselves almost weightless",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "As long as desired",
        dicePool: "Wits + Survival",
        opposingPool: "N/A",
        notes: "Wits + Survival is only used when activated as a reaction",
        source: "Vampire: The Masquerade Corebook, page 269"
      }
    ],
    level2: [
      {
        name: "Feral Weapons",
        effect: "Elongate the user's nails into claws, gaining a +2 modifier to damage or elongate their fangs and not suffer a called shot penalty",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Superficial damage inflicted by the user is not halved while active",
        source: "Vampire: The Masquerade Corebook, page 270"
      },
      {
        name: "Vicissitude",
        effect: "Sculpt the flesh of bodies allowing changes to their own bodies",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Dominate ●●",
        duration: "Permanent",
        dicePool: "Resolve + Protean",
        opposingPool: "N/A",
        notes: "Each success on the roll allows a single change to be made",
        source: "Vampire: The Masquerade Companion, page 27"
      },
      {
        name: "Serpent's Kiss",
        effect: "When biting someone, inject their own vitae into them",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This can also be used to transport powers like Scorpion's Touch",
        source: "Vampire: The Masquerade Blood Stained Love, page 153"
      },
      {
        name: "The False Sip",
        effect: "Prevent any blood or Blood from entering their system",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Fortitude ●",
        duration: "One scene or more",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "They must vomit it back up within the scene or extend to an additional scene by making another Rouse Check",
        source: "Vampire: The Masquerade Blood Stained Love, page 153"
      }
    ],
    level3: [
      {
        name: "Earth Meld",
        effect: "Sink into the earth and become one with the soil",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One day or more, or until disturbed",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power only works on natural surfaces and not artificial such as concrete",
        source: "Vampire: The Masquerade Corebook, page 270"
      },
      {
        name: "Fleshcrafting",
        effect: "Extends the mastery over the flesh to be used on others",
        cost: "One Rouse Check",
        prerequisite: "Vicissitude",
        amalgam: "Dominate ●●",
        duration: "Permanent",
        dicePool: "Resolve + Protean",
        opposingPool: "Stamina + Resolve",
        notes: "An unwilling subject may resist with the margin of the user's role counting as the number of changes able to be made",
        source: "Vampire: The Masquerade Companion, page 27"
      },
      {
        name: "Shapechange",
        effect: "Change into an animal with a similar body mass",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene unless voluntarily ended",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Users gain the Physical Attributes and other traits of the animal they've changed into",
        source: "Vampire: The Masquerade Corebook, page 270"
      },
      {
        name: "Visceral Absorption",
        effect: "Draw in the remains of blood and body to the vampire to clean a scene",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Blood Sorcery ●●",
        duration: "One turn per body",
        dicePool: "Strength + Protean",
        opposingPool: "N/A",
        notes: "Hunger can be reduced by one per body, up to the level of their Blood Sorcery rating but cannot reduce to 0",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 49"
      }
    ],
    level4: [
      {
        name: "Horrid Form",
        effect: "Take on a monstrous shape",
        cost: "One Rouse Check",
        prerequisite: "Vicissitude",
        amalgam: "Dominate ●●",
        duration: "One scene unless voluntarily ended",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Grants several changes equal to the user's Protean rating. Any critical scores are counted as messy criticals and Frenzy checks are made with +2 Difficulty",
        source: "Vampire: The Masquerade Companion, page 28"
      },
      {
        name: "Metamorphosis",
        effect: "Extends shape change to be able to change into a larger animal than the vampire's mass",
        cost: "One Rouse Check",
        prerequisite: "Shapechange",
        amalgam: "No",
        duration: "One scene unless voluntarily ended",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Same rules as Shapechange",
        source: "Vampire: The Masquerade Corebook, page 271"
      }
    ],
    level5: [
      {
        name: "Blood Form",
        effect: "Turn into an amorphous mass of blood",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Blood Sorcery ●●",
        duration: "One scene, or until the effect is voluntarily ended",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Can be consumed, creating blood bonds as normal",
        source: "Gehenna War, page 47"
      },
      {
        name: "The Heart of Darkness",
        effect: "Allows a vampire to remove their own heart and store it outside of their body",
        cost: "Free",
        prerequisite: "None",
        amalgam: "Fortitude ●●",
        duration: "Permanent or until the heart is destroyed or returned to the host's body",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "If the heart is dealt aggravated damage equal to or greater than the user's health tracker, they fall into torpor. It can only be destroyed through fire or sunlight",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 85"
      },
      {
        name: "Master of Forms",
        effect: "Allows the vampire to take on any animal shape, rather than just one",
        cost: "None, but rouse for Shapechange as normal",
        prerequisite: "Shapechange",
        amalgam: "No",
        duration: "As Shapechange or Metamorphosis",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "All other limitations of Shapechange and Metamorphosis apply",
        source: "Gehenna War, page 48"
      },
      {
        name: "Mist Form",
        effect: "Turn into a cloud of mist",
        cost: "One to three Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene unless voluntarily ended",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power takes three turns to use and may be sped up with additional Rouse Checks on a one-for-one trade",
        source: "Vampire: The Masquerade Corebook, page 271"
      },
      {
        name: "One with the Land",
        effect: "Sink into the earth of their Domain",
        cost: "Two Rouse Checks",
        prerequisite: "Earth Meld",
        amalgam: "Animalism ●●",
        duration: "One day or more, or until physically disturbed",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Same system as Earth Meld however they are not limited by the material",
        source: "Vampire: The Masquerade Companion, page 28"
      },
      {
        name: "The Unfettered Heart",
        effect: "The heart of the vampire can move freely within the chest, making staking more difficult",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Only upon a critical win does the stake penetrate when in melee combat",
        source: "Vampire: The Masquerade Corebook, page 271"
      }
    ]
  },
  amalgams: [
    {
      name: "Eyes of the Serpent",
      discipline: "Presence",
      level: "●",
      proteanLevel: "●",
      effect: "Immobilize a victim by making eye contact",
      cost: "Free",
      dicePool: "Charisma + Presence",
      source: "Vampire: The Masquerade Anarch, page 185"
    }
  ]
}; 
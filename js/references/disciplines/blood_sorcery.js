export const bloodSorcery = {
  name: "Blood Sorcery",
  nicknames: ["A Kind of Magic", "Thaumaturgy", "Quietus"],
  affinity: ["Tremere", "Banu Haqim"],
  type: "Sorcery",
  threat: "Low to High",
  resonance: "Sanguine",
  overview: "Unlike other Disciplines, Blood Sorcery is a power that does not develop organically, instead, it is developed by being taught or through research of old tomes. It also functions slightly differently in that not only does it give powers per level but it also opens access to Blood Sorcery Rituals equal or lesser to the user's current Blood Sorcery level. However, ghouls of sorcerers or Thin-Bloods with temporary Disciplines from Resonances do not receive access to these rituals. At creation, if the character has Blood Sorcery they receive one ritual for free, further rituals cost both experience and time. Rituals generally take at least the square of their rating in weeks to learn. The powers on a surface level may appear weaker, but where it shines is in the versatility of the rituals and flexibility as Sorcerers can learn as many rituals as they desire.",
  powers: {
    level1: [
      {
        name: "Corrosive Vitae",
        effect: "Turn vitae corrosive",
        cost: "One or more Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Does not work against unliving flesh, such as other vampires",
        source: "Vampire: The Masquerade Corebook, page 272"
      },
      {
        name: "Shape the Sanguine Sacrament",
        effect: "Shape blood into a shape or image",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene unless deactivated",
        dicePool: "Manipulation + Blood Sorcery",
        opposingPool: "N/A",
        notes: "If the user uses their vitae, it costs one Rouse Check",
        source: "Vampire: The Masquerade Winter's Teeth #3 / Book of Nod Apocrypha, page 33"
      },
      {
        name: "A Taste for Blood",
        effect: "Discover traits of another through their blood",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "Resolve + Blood Sorcery",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Corebook, page 272"
      },
      {
        name: "Koldunic Sorcery",
        effect: "Attune with and sense through an element, e.g. Water",
        cost: "One Rouse Check and Aggravated Health Damage",
        prerequisite: "Tzimisce",
        amalgam: "No",
        duration: "One Scene, Can be renewed",
        dicePool: "Resolve + Blood Sorcery",
        opposingPool: "Wits or Resolve + Obfuscate",
        notes: "Can be taken multiple times to attune to other elements",
        source: "Vampire: The Masquerade Blood Sigils, page 61"
      }
    ],
    level2: [
      {
        name: "Blood's Curse",
        effect: "Temporary increase another vampire's Bane Severity",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "Until dawn",
        dicePool: "Intelligence + Blood Sorcery",
        opposingPool: "Stamina + Occult / Fortitude",
        notes: "If the target is a ghoul, thinblood, or Caitiff they get a clan bane",
        source: "Gehenna War, page 48"
      },
      {
        name: "Extinguish Vitae",
        effect: "In use, this increases another Kindred's Hunger",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "Intelligence + Blood Sorcery",
        opposingPool: "Stamina + Composure",
        notes: "The victim can determine who used this power against them if they can see them and win an Intelligence + Occult vs Wits + Subterfuge roll",
        source: "Vampire: The Masquerade Corebook, page 272"
      },
      {
        name: "Scour Secrets",
        effect: "Pore through a large amount of content within minutes",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One night or till the information is found or there's a dead-end",
        dicePool: "Intelligence + Blood Sorcery",
        opposingPool: "N/A",
        notes: "This power does not allow the user to parse things written in a language they cannot understand",
        source: "Vampire: The Masquerade Players Guide, page 98"
      }
    ],
    level3: [
      {
        name: "Blood of Potency",
        effect: "Increase Blood Potency temporarily",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene or Night",
        dicePool: "Resolve + Blood Sorcery",
        opposingPool: "N/A",
        notes: "This power can allow a Kindred to bypass the Blood Potency limit set by their generation",
        source: "Vampire: The Masquerade Corebook, page 273"
      },
      {
        name: "Scorpion's Touch",
        effect: "Change own vitae into paralyzing poison",
        cost: "One or more Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene",
        dicePool: "Strength + Blood Sorcery",
        opposingPool: "Stamina + Occult/Fortitude",
        notes: "A mortal who takes any damage from this will go unconscious",
        source: "Vampire: The Masquerade Corebook, page 273"
      },
      {
        name: "Transitive Bond",
        effect: "Extend the properties of Blood Bonding in vitae",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power was developed originally by the Tremere to combat their bane to only resurface within the Sabbat",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 49"
      },
      {
        name: "Ripples of the Heart",
        effect: "Manipulate the blood or Blood of others",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power can inflict Compulsions on others who feed from the infected or alter the Resonance of a mortal",
        source: "Vampire: The Masquerade Blood Stained Love, page 153"
      }
    ],
    level4: [
      {
        name: "Theft of Vitae",
        effect: "Manipulate blood from a victim through the air to feed",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One feeding",
        dicePool: "Wits + Blood Sorcery",
        opposingPool: "Wits + Occult",
        notes: "When in use the victim is under the same influence as a standard Kiss",
        source: "Vampire: The Masquerade Corebook, page 274"
      },
      {
        name: "Blood Aegis",
        effect: "Form a protective Blood barrier",
        cost: "One or more Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene or until damage is spent",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "For each Rouse Check, the user can reduce the damage taken by five points",
        source: "Vampire: The Masquerade Players Guide, page 98"
      }
    ],
    level5: [
      {
        name: "Baal's Caress",
        effect: "Change the user's own Vitae into an aggressive and lethal poison",
        cost: "One or more Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene",
        dicePool: "Strength + Blood Sorcery",
        opposingPool: "Stamina + Occult/Fortitude",
        notes: "If a mortal takes one point of damage they die instantly",
        source: "Vampire: The Masquerade Corebook, page 251"
      },
      {
        name: "Cauldron of Blood",
        effect: "Boil the victim's blood in their body",
        cost: "One Rouse Check, Stains",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Resolve + Blood Sorcery",
        opposingPool: "Composure + Occult/Fortitude",
        notes: "If a mortal takes one point of damage they die screaming",
        source: "Vampire: The Masquerade Corebook, page 251"
      },
      {
        name: "Reclamation of Vitae",
        effect: "Reclaim the Blood given to create ghouls over distance",
        cost: "One or more Stains",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Those outside of the Sabbat take stains upon use",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 50"
      }
    ]
  },
  amalgams: [
    {
      name: "Ancestral Dominion",
      discipline: "Dominate",
      level: "●●●●",
      bloodSorceryRequired: "●●",
      effect: "Urge a descendant to act even if against their own opinion",
      cost: "One Rouse Check",
      dicePool: "Manipulation + Dominate",
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 104"
    },
    {
      name: "Blood Form",
      discipline: "Protean",
      level: "●●●●●",
      bloodSorceryRequired: "●●",
      effect: "Turn into an amorphous mass of blood",
      cost: "One Rouse Check",
      dicePool: "N/A",
      source: "Gehenna War, page 47"
    },
    {
      name: "Visceral Absorption",
      discipline: "Protean",
      level: "●●●",
      bloodSorceryRequired: "●●",
      effect: "Draw in the remains of blood and body to the vampire to clean a scene",
      cost: "One Rouse Check",
      dicePool: "Strength + Protean",
      source: "Vampire: The Masquerade Sabbat: The Black Hand, page 49"
    }
  ]
}; 
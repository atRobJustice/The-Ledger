export const bloodSorcery = {
  name: "Blood Sorcery",
  nicknames: [
    "A Kind of Magic",
    "Thaumaturgy",
    "Quietus"
  ],
  affinity: [
    "Tremere",
    "Banu Haqim"
  ],
  type: "Sorcery",
  threat: "Low to High",
  resonance: "Sanguine",
  overview: "Unlike other Disciplines, Blood Sorcery is a power that does not develop organically, instead, it is developed by being taught or through research of old tomes. It also functions slightly differently in that not only does it give powers per level but it also opens access to Blood Sorcery Rituals equal or lesser to the user's current Blood Sorcery level. However, ghouls of sorcerers or Thin-Bloods with temporary Disciplines from Resonances do not receive access to these rituals. At creation, if the character has Blood Sorcery they receive one ritual for free, further rituals cost both experience and time. Rituals generally take at least the square of their rating in weeks to learn. The powers on a surface level may appear weaker, but where it shines is in the versatility of the rituals and flexibility as Sorcerers can learn as many rituals as they desire. This power is unique to the Tremere and Banu Haqim, one which they argue who created it first. \"Thaumaturgy\", as the Tremere call it, maintains that it was theirs. Whereas the Banu Haqim are dead set on their version, \"Quietus\", was the origin long before the Tremere were ever a clan. Both approach the learning style differently, with the Tremere originally relying on the Pyramid and its structure to ensure neonates were taught before its collapse, now they seek information on this power through scraps of its remains. Whereas the Banu Haqim stressed the Sire Childe relationship to teach them, however, these nights many Banu Haqim ends up in different places than their sire. The Tremere use their magics to inflict powerful attacks on their opponent's body with powers like Scorpion's Touch. Some may even use Thaumaturgy to ease their feeding by drawing their blood into their mouth without touching them by utilizing Theft of Vitae. In a similar fashion the Banu Haqim use their blood sorcery to turn vitae into poison and use it as a weapon. Harnessing the power for killing is not the only use they have as the viziers delve into rituals to learn secrets from others' blood. The Old Clan's Sorcerers point out the Tremere and Banu Haqim are the only innate blood sorcerers, while in the shadows the Setites of the Ministry practice a form of sorcery they called Akhu. The Tzimisce sorcerers call themselves koldun, or kolduny when there's a group of them, and consider themselves the oldest and best blood sorcerers that founded the Sabbat’s vaulderie practice among other things. These rare few practice a form of Blood Sorcery that enthralls air, water, fire, or earth to them similar in effect to a Blood Bond during an initiation ritual performed by another Koldun. This mystical practice of theirs is unique in Blood Sorcery in that it behaves similarly to Oblivion ceremonies requiring Koldunic Sorcery as a prerequisite in order for its connected rituals to work. Recent events have made blood sorcery more available in modern nights. The Second Inquisition, Gehenna War, Second Anarch Rebellion, Fall of the Pyramid, and Fall of Alamut have all played a role in the growth of the black market called the blood craft scene. Other clans like the Toreador, Hecata, and Brujah have shown interest in acquiring blood sorcery where in the past only a handful of their members might have had access to its secrets. While Blood sorcery has gotten much less guarded than it was in the past it is still a long and dangerous path as the remnants of the Pyramid in House Tremere, the Praepositors of the Praesidium, older Banu Haqim, and other threats exist to stamp out the red workers for good.",
  powers: {
    level1: [
      {
        name: "Corrosive Vitae",
        effect: "Turn vitae corrosive.",
        cost: "One or more Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Does not work against unliving flesh, such as other vampires.",
        source: "Vampire: The Masquerade Corebook, page 272"
      },
      {
        name: "Shape the Sanguine Sacrament",
        effect: "Shape blood into a shape or image.",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene unless deactivated",
        dicePool: "Manipulation + Blood Sorcery",
        opposingPool: "N/A",
        notes: "If the user uses their vitae, it costs one Rouse Check.",
        source: "Vampire: The Masquerade Winter's Teeth #3 / Vampire: The Masquerade Book of Nod Apocrypha, page 33"
      },
      {
        name: "A Taste for Blood",
        effect: "Discover traits of another through their blood.",
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
        name: "Vinculum Magnum",
        effect: "Raises the limit of Blood Bonds held over other Kindred",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Tremere and Duskborn cannot benefit from this",
        source: "Vampire: The Masquerade Courts of the Damned, pages 214-215"
      },
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
        effect: "Increase Blood Potency temporarily.",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene or Night",
        dicePool: "Resolve + Blood Sorcery",
        opposingPool: "N/A",
        notes: "This power can allow a Kindred to bypass the Blood Potency limit set by their generation.",
        source: "Vampire: The Masquerade Corebook, page 273"
      },
      {
        name: "Scorpion’s Touch",
        effect: "Change own vitae into paralyzing poison.",
        cost: "One or more Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene",
        dicePool: "Strength + Blood Sorcery",
        opposingPool: "Stamina + Occult/Fortitude",
        notes: "A mortal who takes any damage from this will go unconscious.",
        source: "Vampire: The Masquerade Corebook, page 273"
      },
      {
        name: "Transitive Bond",
        effect: "Extend the properties of Blood Bonding in vitae.",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power was developed originally by the Tremere to combat their bane to only resurface within the Sabbat.",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 49"
      },
      {
        name: "Ripples of the Heart",
        effect: "Manipulate the blood or Blood of others.",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power can inflict Compulsions on others who feed from the infected or alter the Resonance of a mortal.",
        source: "Vampire: The Masquerade Blood Stained Love, page 153"
      }
    ],
    level4: [
      {
        name: "Marionette",
        effect: "Control the blood within a body, either living or dead",
        cost: "One Rouse Check",
        prerequisite: "Shape the Sanguine Sacrament",
        amalgam: "No",
        duration: "One turn per point of margin",
        dicePool: "Manipulation + Blood Sorcery",
        opposingPool: "Stamina + Occult or Fortitude",
        notes: "Dead bodies test against Difficulty 2",
        source: "Vampire: The Masquerade Tattered Façade, page 93"
      },
      {
        name: "Fulminating Vitae",
        effect: "Bomb made from jar of vitae",
        cost: "Two Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "Until dawn",
        dicePool: "Stamina + Blood Sorcery",
        opposingPool: "Wits + Athletics",
        notes: "Deals Aggravated to Kindred, Superficial to mortals",
        source: "Vampire: The Masquerade Tattered Façade, page 92-93"
      },
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
        name: "Baal’s Caress",
        effect: "Change the user's own Vitae into an aggressive and lethal poison.",
        cost: "One or more Rouse Checks",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Scene",
        dicePool: "Strength + Blood Sorcery",
        opposingPool: "Stamina + Occult/Fortitude",
        notes: "If a mortal takes one point of damage they die instantly.",
        source: "Vampire: The Masquerade Corebook, page 274"
      },
      {
        name: "Cauldron of Blood",
        effect: "Boil the victim's blood in their body.",
        cost: "One Rouse Check, Stains",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Resolve + Blood Sorcery",
        opposingPool: "Composure + Occult/Fortitude",
        notes: "If a mortal takes one point of damage they die screaming.",
        source: "Vampire: The Masquerade Corebook, page 274"
      },
      {
        name: "Reclamation of Vitae",
        effect: "Reclaim the Blood given to create ghouls over distance.",
        cost: "One or more Stains",
        prerequisite: "None",
        amalgam: "No",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Those outside of the Sabbat take stains upon use.",
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
      effect: "Turn into an amorphous mass of blood.",
      cost: "One Rouse Check",
      dicePool: "N/A",
      source: "Vampire: The Masquerade Gehenna War, page 47"
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

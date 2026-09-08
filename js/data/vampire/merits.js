export const merits = {
  linguistics: {
    name: "Linguistics",
    description: "Merits covering language and ability to communicate/understand spoken or written language.",
    merits: {
      linguistics: {
        name: "Linguistics",
        dots: "• +",
        description: "Each dot of Linguistics allows the character to read, write and speak fluently in another language outside of the default two they already know, which is their native language and the language of the Domain."
      }
    },
    flaws: {
      illiterate: {
        name: "Illiterate",
        dots: "(••)",
        description: "The Character cannot read nor write and their Science and Academics Skills may not go beyond 1 dot."
      }
    }
  },
  looks: {
    name: "Looks",
    description: "Related to the appearance, supernaturally influenced or not, of the character.",
    merits: {
      beautiful: {
        name: "Beautiful",
        dots: "••",
        description: "Add one die to related Social pools"
      },
      stunning: {
        name: "Stunning",
        dots: "••••",
        description: "Add two dice to related Social pools"
      },
      semblanceOfTheMethuselah: {
        name: "Semblance of the Methuselah",
        dots: "• - ••",
        description: "With an appearance strikingly similar to a methuselah, gain one die on rolls to impress, intimidate or attract the attention who recognize your face. As well as gain other bonuses such as status or additional die when meeting the methuselah they resemble."
      },
      famousFace: {
        name: "Famous Face",
        dots: "•",
        description: "Appear as someone famous and gain two dice in social tests where this works to their benefit. Take a two-dice penalty whenever they attempt to hide in a crowd or avoid recognition."
      },
      ingenue: {
        name: "Ingénue",
        dots: "•",
        description: "They appear innocent and blameless, add two dice to any rolls related to avoiding suspicion or deflecting blame at the Storytellers' discretion."
      },
      remarkableFeature: {
        name: "Remarkable Feature",
        dots: "•",
        description: "Possessing a rare, memorable feature such as eye color or unusual complexion. Add two-dice to social interactions with strangers and take a one-die penalty to disguise yourself."
      },
      upAllNight: {
        name: "Up All Night",
        dots: "•• or ••••",
        description: "Treat Humanity as one higher (Max 10), or two dots higher if taken at four dots when using Blush of Life, eating, drinking, or sexual intercourse."
      },
      sceneKid: {
        name: "Scene Kid",
        dots: "•",
        description: "The player's style embodies that of a particular subculture. Add one die to all appropriate Social pools when dealing with that subculture."
      }
    },
    flaws: {
      ugly: {
        name: "Ugly",
        dots: "(•)",
        description: "Lose one die from related Social pools"
      },
      repulsive: {
        name: "Repulsive",
        dots: "(••)",
        description: "Lose two dice from related Social pools"
      },
      stench: {
        name: "Stench",
        dots: "(•)",
        description: "Their breath and body odor are supernaturally foul. Lose one die from seduction and similar Social pools, and lose two from Stealth pools unless they are upwind."
      },
      transparent: {
        name: "Transparent",
        dots: "(•)",
        description: "Unable to lie due to a terrible poker face or a strong urge to be truthful. Lose one die in any pools requiring Subterfuge, they cannot take any dots in Subterfuge either."
      },
      unblinkingVisage: {
        name: "Unblinking Visage",
        dots: "••",
        description: "Treat Humanity as two lower (Min 0) when using Blush of Life, eating, drinking, or sexual intercourse."
      }
    }
  },
  substanceUse: {
    name: "Substance Use",
    description: "Vampires seek out prey with a specific drug in their system, as defined in Character Creation. The effects of specific substances still apply.",
    merits: {
      highFunctioningAddict: {
        name: "High Functioning Addict",
        dots: "•",
        description: "Add one die to either Physical, Social, or Mental pool when the last feeding had the drug of their desire."
      }
    },
    flaws: {
      addiction: {
        name: "Addiction",
        dots: "(•)",
        description: "Unless the action is to immediately gain their drug, lose one die to all pools if the last feeding was not on the drug of their choice."
      },
      hopelessAddiction: {
        name: "Hopeless Addiction",
        dots: "(••)",
        description: "Unless the action is to immediately gain their drug, lose two dice to all pools if the last feeding was not on the drug of their choice."
      }
    }
  },
  archaic: {
    name: "Archaic",
    description: "May only be taken by Ancilla or older vampires.",
    merits: {
      custodianOfHistory: {
        name: "Custodian of History",
        dots: "•",
        description: "Grants +1 to all relevant Skill tests pertaining to a chosen period or character in Kindred lore."
      }
    },
    flaws: {
      livingInThePast: {
        name: "Living in the Past",
        dots: "(•)",
        description: "Unable to grasp modern society's mindset, one or more of the character's Convictions reflect outdated views."
      },
      archaic: {
        name: "Archaic",
        dots: "(••)",
        description: "Cannot use computers, cellphones, and the character's Technology rating is always 0."
      },
      griefPhobia: {
        name: "Grief Phobia",
        dots: "(•)",
        description: "Lose one die to all tests made while in the presence of a phobic stimulus linked to a traumatically lost Touchstone."
      },
      oldTricks: {
        name: "Old Tricks",
        dots: "(•)",
        description: "All specialties are required to be Archaic."
      }
    }
  },
  bonding: {
    name: "Bonding",
    description: "These can be used together to change how the Blood Bond works.",
    merits: {
      bondResistance: {
        name: "Bond Resistance",
        dots: "• - •••",
        description: "Add one die to resist Blood Bonds per level of this merit."
      },
      shortBond: {
        name: "Short Bond",
        dots: "••",
        description: "Bonds decrease by two levels each month if not reinforced."
      },
      unbondable: {
        name: "Unbondable",
        dots: "•••••",
        description: "Unable to be bonded."
      },
      bondsOfFealty: {
        name: "Bonds of Fealty",
        dots: "•••",
        description: "Your Dominate powers do not require eye contacts on those bound to you. The character must have Dominate in order to take this."
      },
      enduringBond: {
        name: "Enduring Bond",
        dots: "•",
        description: "The bonds you create last longer, only weakening every other month"
      }
    },
    flaws: {
      bondJunkie: {
        name: "Bond Junkie",
        dots: "(•)",
        description: "The bond is sweeter to the character, they lose one die when acting against Blood Bonds."
      },
      longBond: {
        name: "Long Bond",
        dots: "(•)",
        description: "Bonds fade slower, decreasing by one level every 3 months without reinforcement."
      },
      bondslave: {
        name: "Bondslave",
        dots: "(••)",
        description: "Bond instantly to another kindred with just one drink, not three."
      }
    }
  },
  feeding: {
    name: "Feeding",
    description: "Related to the act of feeding, taking one does not mean the character must take the others.",
    merits: {
      bloodhound: {
        name: "Bloodhound",
        dots: "•",
        description: "Able to sniff out resonances without tasting them."
      },
      ironGullet: {
        name: "Iron Gullet",
        dots: "•••",
        description: "Able to consume rancid, defractionated, or otherwise unedible blood to other vampires."
      },
      vesselRecognition: {
        name: "Vessel Recognition",
        dots: "•",
        description: "With a Resolve + Awareness test at Difficulty 2 they can tell if a mortal has been fed on recently. A critical win lets them sense if the feed is recurring, meaning there is a chance it's a herd member."
      },
      driveThru: {
        name: "Drive-thru",
        dots: "•",
        description: "The character has mastered the art of feeding while on the move. Safely complete a hunt within minutes by increasing the Difficulty by 1."
      }
    },
    flaws: {
      preyExclusion: {
        name: "Prey Exclusion",
        dots: "(•)",
        description: "Unable to feed from a certain group and take Stains as if breaking a Chronicle Tenet when they do."
      },
      methuselahsThirst: {
        name: "Methuselah's Thirst",
        dots: "(•)",
        description: "Hunger can only be slaked to 0 by Supernatural blood."
      },
      farmer: {
        name: "Farmer",
        dots: "(••)",
        description: "Must spend 2 Willpower Points to feed on human blood. Ventrue may not take this."
      },
      organovore: {
        name: "Organovore",
        dots: "(••)",
        description: "Slake only by consuming human flesh and organs."
      },
      veinTapper: {
        name: "Vein Tapper",
        dots: "(•)",
        description: "Finding the act of feeding to be personal, they go out of their way to feed from the unaware, drugged or unconscious victims."
      },
      outdatedPreference: {
        name: "Outdated Preference",
        dots: "(••)",
        description: "Either capture and force mortals to adhere to their wanted preference, or always spend 1 Willpower to feed."
      },
      resonanceSensitivity: {
        name: "Resonance Sensitivity",
        dots: "(•)",
        description: "One Resonance really messes with the character, causing a unique Compulsion."
      },
      resonanceMimic: {
        name: "Resonance Mimic",
        dots: "(••)",
        description: "The character gets influenced and penalized from the memories of their victim."
      },
      sloppyFeeder: {
        name: "Sloppy Feeder",
        dots: "(••)",
        description: "The pattern of attacks when feeding is telltale enough to identify. One attack can be linked to previous attacks."
      }
    }
  },
  mythic: {
    name: "Mythic",
    description: "Related to vampire mythos.",
    merits: {
      eatFood: {
        name: "Eat Food",
        dots: "••",
        description: "Can consume food but still with no nourishment."
      },
      coldDeadHunger: {
        name: "Cold Dead Hunger",
        dots: "•••",
        description: "Add two dice to resist Hunger frenzy."
      },
      packDiablerie: {
        name: "Pack Diablerie",
        dots: "••",
        description: "The character will always be the one to take the soul unless they otherwise choose during Diablerie. Additionally, if they help another consume the soul, they gain 5 experience points to spend in the same manner as if they'd committed the Diablerie themselves."
      },
      luckOfTheDevil: {
        name: "Luck of the Devil",
        dots: "••••",
        description: "Once per session when misfortune occurs it can be redirected towards someone close to them for the victim to take the fall."
      },
      nuitMode: {
        name: "Nuit Mode",
        dots: "••",
        description: "The Kindred's body does not revert to it's death-state each night, enabling them to keep new haircuts and body modifications. They can mend these changes anytime as if they were Aggravated damage. This does not work for characters with BP higher than 1."
      },
      objectOfPower: {
        name: "Object of Power",
        dots: "• - •••",
        description: "Rare but powerful items: • Reroll one die per story, excluding Hunger. •• Gain one bonus die to all Level 1 Ritual tests. ••• Free premonition warning once per session when someone will cause them harm."
      },
      leyLineLeach: {
        name: "Ley Line Leach",
        dots: "•",
        description: "The character follows ancient paths of power while traveling. After spending more than a few hours traveling to a different city or locale, negate the need for a Rouse Check for the next night."
      },
      persistentBlush: {
        name: "Persistent Blush",
        dots: "•••",
        description: "A single activation of Blush of Life lasts 1 week."
      }
    },
    flaws: {
      folkloricBane: {
        name: "Folkloric Bane",
        dots: "(•)",
        description: "Take Aggravated Damage when touching a specific object rooted in vampire mythos of what harms them, example Silver."
      },
      folkloricBlock: {
        name: "Folkloric Block",
        dots: "(•)",
        description: "Must spend Willpower or move away from a specific object vampires are known to fear in Vampire Mythos, example Holy Symbols."
      },
      stigmata: {
        name: "Stigmata",
        dots: "(•)",
        description: "Bleed from wounds on the hands, feet, and forehead when at Hunger 4."
      },
      stakeBait: {
        name: "Stake Bait",
        dots: "(••)",
        description: "When staked they meet Final Death."
      },
      starvingDecay: {
        name: "Starving Decay",
        dots: "(••)",
        description: "When their Hunger is 3 or higher their body shrivels and decays. Take a two-dice penalty to Physical tests, and social interactions with mortals, this Flaw can risk the Masquerade."
      },
      twiceCursed: {
        name: "Twice Cursed",
        dots: "(••)",
        description: "Take the Clan's variant Bane in addition to the regular Bane. The Storyteller can prohibit this flaw if the second Bane wouldn't mesh with the chronicle."
      },
      cursedObject: {
        name: "Cursed Object",
        dots: "(•)",
        description: "Once per session, a successful test must be rerolled, as determined by the Storyteller."
      },
      resistantBlush: {
        name: "Resistant Blush",
        dots: "(•)",
        description: "When rolling a Rouse Check for Blush of Life, roll twice and take the lowest result."
      },
      landLocked: {
        name: "Land Locked",
        dots: "(•)",
        description: "Unable to leave the land, the character must make a Fear Frenzy test at Difficulty 3 to board a boat or plane."
      },
      corpseFlesh: {
        name: "Corpse Flesh",
        dots: "(••)",
        description: "Unable to use Blush of Life."
      }
    }
  },
  ingrainedDiscipline: {
    name: "Ingrained Discipline Flaws",
    description: "These increase the amount of Discipline powers that a character can purchase by trading off for a drawback. The more they draw on the Blood, the deeper it cuts them. These Flaws have no assigned Dot Value.",
    merits: {},
    flaws: {
      untamed: {
        name: "Untamed",
        dots: "",
        description: "Animalism. When in Frenzy, failing to Ride the Wave inflicts two Stains, which cannot be mitigated by Convictions."
      },
      daymares: {
        name: "Daymares",
        dots: "",
        description: "Auspex. When awakening from the night, make two Rouse Checks instead of one."
      },
      sanguinaryAnimism: {
        name: "Sanguinary Animism",
        dots: "",
        description: "Blood Sorcery. The vampire suffers a two-dice penalty to Social and Mental pools in the scene following a feeding."
      },
      breakdown: {
        name: "Breakdown",
        dots: "",
        description: "Celerity. Take 1 point of Aggravated Health Damage when failing a Rouse Check for a Celerity power."
      },
      blunt: {
        name: "Blunt",
        dots: "",
        description: "Dominate. The vampire cannot spend Willpower to reroll any Social test."
      },
      scarTissue: {
        name: "Scar Tissue",
        dots: "",
        description: "Fortitude. When rousing the Blood to restore Health, the physical appearance of the injuries remain for a day."
      },
      faded: {
        name: "Faded",
        dots: "",
        description: "Obfuscate. When making a Remorse test, roll one fewer die (the total number of dice cannot go below 1)."
      },
      monstrous: {
        name: "Monstrous",
        dots: "",
        description: "Oblivion. The vampire's Humanity rating is treated as three levels lower (affects Blush of Life, Social dice pools, Physical appearance, etc.)."
      },
      killerInstinct: {
        name: "Killer Instinct",
        dots: "",
        description: "Potence. Roll for Fury Frenzy when failing a Rouse Check for activating a Potence power."
      },
      egomaniac: {
        name: "Egomaniac",
        dots: "",
        description: "Presence. Roll for Fury Frenzy when rolling a Messy Critical or failing in a contest when using Presence powers."
      },
      stasis: {
        name: "Stasis",
        dots: "",
        description: "Protean. When failing a Rouse Check to activate a Protean power, reverting to their normal form results in an incomplete change."
      }
    }
  },
  psychological: {
    name: "Psychological",
    description: "Some of these merits are related to cults or other beliefs.",
    merits: {
      unholyWill: {
        name: "Unholy Will",
        dots: "•• or ••••",
        description: "With two dots, add one die to any pool when resisting or contesting against an individual with True Faith when related to their faith. The character also suffers one less point of damage from holy sources. At four dots, add two dice and suffer two fewer points of damage."
      },
      zealotry: {
        name: "Zealotry",
        dots: "• - •••",
        description: "For each dot in this merit, once per session when succeeding with a normal roll that relates or aligns to the character's Conviction, turn it into a messy critical."
      },
      penitence: {
        name: "Penitence",
        dots: "• - •••••",
        description: "Once per session, take one point of self-inflicted Superficial Health Damage in exchange for one point of Superficial Willpower damage."
      },
      soothedBeast: {
        name: "Soothed Beast",
        dots: "•",
        description: "With a SPC as an obsession, once per session they can ignore one Bestial or Messy Critical. Gain three Stains if they die."
      },
      falseLove: {
        name: "False Love",
        dots: "•",
        description: "With a SPC as an obsession, when in their presence treat the character's treat Humanity as one higher (Max 10) for purposes of using Blush of Life, eating, drinking, or sexual intercourse. Gain three Stains if they die."
      }
    },
    flaws: {
      beaconOfProfanity: {
        name: "Beacon of Profanity",
        dots: "(•)",
        description: "Mortals with any amount of True Faith can sense your presence, regardless of True Faith level."
      },
      crisisOfFaith: {
        name: "Crisis of Faith",
        dots: "(•)",
        description: "Whenever there is a bestial failure, take one point of superficial Willpower damage in addition to other outcomes."
      },
      horribleScarsOfPenitence: {
        name: "Horrible Scars of Penitence",
        dots: "(•)",
        description: "This flaw is equivalent to Repulsive when around those not within the cult."
      },
      grovelingWorm: {
        name: "Groveling Worm",
        dots: "(••)",
        description: "The character must find the time to scourge their own flesh once per session for two points of Superficial Health damage or they suffer one point of Aggravated Willpower damage at the next session. Cannot be taken with Penitence Merit."
      }
    }
  },
  bloodTies: {
    name: "Blood Ties",
    description: "Related to your vampiric lineage. Caitiff and Thin-bloods have lineages, however their Blood is not a cohesive enough group to be considered a clan in relation to these Merits.",
    merits: {
      consanguineousSense: {
        name: "Consanguineous Sense",
        dots: "••",
        description: "You can detect whether another Kindred is in your direct bloodline. This does not tell you their Generation."
      },
      consanguineousInfluence: {
        name: "Consanguineous Influence",
        dots: "••",
        description: "You gain a bonus die when using Mental Disciplines on a vampire of your own Clan, or a direct descendant or ancestor. You gain 2 bonus dice instead on those within 2 Generations of you such as your grandsire."
      },
      sinsOfTheFather: {
        name: "Sins of the Father",
        dots: "•• or •••",
        description: "You show no signs if you commit Diablerie on a direct descendant or ancestor. This extends to all members of your clan if taken at three dots."
      }
    },
    flaws: {}
  },
  diablerie: {
    name: "Diablerie",
    description: "Unless otherwise noted, they can only be taken if the character has committed Diablerie at least once.",
    merits: {},
    flaws: {
      blatantDiablerist: {
        name: "Blatant Diablerist",
        dots: "(•)",
        description: "Powers and Merits capable of sensing Diablerie will always reveal evidence of Diablerie even if the test would otherwise fail to show any information."
      },
      inheritedBane: {
        name: "Inherited Bane",
        dots: "(••)",
        description: "You gain another Clan's Bane in addition to your own. Tremere can use this Flaw to gain the Salubri's Bane without committing Diablerie."
      }
    }
  },
  other: {
    name: "Other",
    description: "Miscellaneous Merits uncategorized.",
    merits: {
      checkTheTrunk: {
        name: "Check the Trunk",
        dots: "•",
        description: "Easy access to an armory or cache of tools, none of these items can exceed the value of something a Resources 2 character could access. Add two dice to Preperation Rolls."
      },
      sideHustler: {
        name: "Side Hustler",
        dots: "••",
        description: "Once per session they can get their hands on an item, information, or access to an event as if they had two dots in the related Resources, Contacts, or Influence."
      },
      temperedWill: {
        name: "Tempered Will",
        dots: "•••",
        description: "They are always aware when someone is attempting to use Dominate or Presence against them. They may add two additional dice to resistance pools once per session, which can only be taken by those with no dots in Dominate or Presence."
      },
      untouchable: {
        name: "Untouchable",
        dots: "•••••",
        description: "Once per story they are able to escape all official punishment for a crime that would otherwise see them destroyed."
      },
      mysticOfTheVoid: {
        name: "Mystic of the Void",
        dots: "• or ••",
        description: "Choose a single Oblivion Power they do not know. They count as knowing that power for the purpose of prerequisites to learning Oblivion Ceremonies. For two dots in this merit, Hecata and Lasombra can choose three Oblivion Powers they do not know instead of just one."
      }
    },
    flaws: {
      knowledgeHungry: {
        name: "Knowledge Hungry",
        dots: "(•)",
        description: "At character creation pick a topic that your character desires to study. When they come across the methods to learn these things, they must make a Willpower roll at Difficulty 3 to resist."
      },
      prestationDebts: {
        name: "Prestation Debts",
        dots: "(•)",
        description: "They owe other Kindred boons, even if these boons are paid off the Kindred lords over them. The Boon-owning Kindred keeps a one-die bonus in Social combat against the one who owes it."
      },
      riskTaker: {
        name: "Risk-Taker",
        dots: "(•)",
        description: "When confronted with a risky temptation that the character hasn't done before, they suffer a two-dice penalty for all actions till they participate or the scene ends."
      },
      weakWilled: {
        name: "Weak-Willed",
        dots: "(••)",
        description: "Even when they are aware that someone is attempting to sway they may not use the active resistance systems to avoid the attempts."
      }
    }
  },
  supernatural: {
    name: "Supernatural",
    description: "Introduced in Blood Stained Love.",
    merits: {},
    flaws: {
      twoMasters: {
        name: "Two Masters",
        dots: "(•)",
        description: "Be Blood Bound to two individuals at the same time."
      }
    }
  },
  contagion: {
    name: "Contagion",
    description: "Related to blood-borne illnesses.",
    merits: {},
    flaws: {
      diseaseVector: {
        name: "Disease Vector",
        dots: "(•)",
        description: "When feeding from a sick mortal, the illness is always contracted and will be passed onto the next vessel."
      },
      plaguebringer: {
        name: "Plaguebringer",
        dots: "(• - ••)",
        description: "The Kindred carries a disease that cannot be removed from their vitae. At one dot the disease is minor with visible traces, at two dots the disease can be potentially fatal if not treated. It is passed through the bite."
      }
    }
  },
  caitiff: {
    name: "Caitiff",
    description: "Only available to Caitiff.",
    merits: {
      favoredBlood: {
        name: "Favored Blood",
        dots: "••••",
        description: "Be able to purchase any Discipline even if they've never tasted the vitae of another vampire who has it. Cannot be taken with the Muddled Blood Flaw."
      },
      markOfCaine: {
        name: "Mark of Caine",
        dots: "••",
        description: "Gain two bonus dice on any attempt to intimidate or bully other vampires who believe in the myth of Caine. Anyone who attempts diablerie on the Caitiff cannot add their Blood Potency to the roll and failure results in a Bestial fail."
      },
      mockingbird: {
        name: "Mockingbird",
        dots: "•••",
        description: "For one night, if they've drank the Blood from another vampire, the Caitiff may utilize one of the Disciplines the vampire possesses. It cannot be a level higher than the Caitiff's own highest Discipline, it is rolled like a normal power except in powers that require a roll the Caitiff uses the donor's Discipline level and Caitiff's attributes. During this time the Caitiff suffers the donor vampire's Bane at the same Bane Severity and only one power can be used this way per night."
      },
      sunScarred: {
        name: "Sun-Scarred",
        dots: "•••••",
        description: "The first turn of being exposed to sunlight take no Health damage, take 1 Aggravated Willpower damage, and automatically succeed on terror Frenzy. For the remainder of the scene, all damage from the sun is converted into Superficial damage."
      },
      uncleFangs: {
        name: "Uncle Fangs",
        dots: "•••",
        description: "They have easy access to a local coterie of three to five thin-bloods, and treat this group as Allies even though they are undead. Cannot be taken with Liquidator."
      }
    },
    flaws: {
      befoulingVitae: {
        name: "Befouling Vitae",
        dots: "(••)",
        description: "Any mortal they Embrace or kill by feeding returns as a wight within a few nights."
      },
      clanCurse: {
        name: "Clan Curse",
        dots: "(••)",
        description: "They suffer a Clan Bane of their choice, likely from their sire, with its severity halved and rounded down. (Minimum of 1)"
      },
      debtPeon: {
        name: "Debt Peon",
        dots: "(••)",
        description: "They owe boons to a high-status vampire, even when paid off they will find new ways to have leverage over the Caitiff. The vampire owed the boons gains a two-dice bonus to Social combat against the Caitiff when in front of other Kindred. Refusing to pay this debt adds the Shunned (••) Flaw and could possibly result in a Blood Hunt against them."
      },
      liquidator: {
        name: "Liquidator",
        dots: "(•)",
        description: "Take a two-dice penalty to all your Social skill dice pools against thin-bloods except for Intimidation rolls. Cannot be taken with the Uncle Fangs Merit."
      },
      muddledBlood: {
        name: "Muddled Blood",
        dots: "(•)",
        description: "Even if they possess the Discipline, they must drink the Blood of someone who possesses it in order to buy dots. Cannot be taken with the Favored Blood Merit."
      },
      walkingOmen: {
        name: "Walking Omen",
        dots: "(••)",
        description: "Scrying, premonition, and other forms of future telling point to the Caitiff as the source of misfortune, how this Flaw functions in play is ultimately up to the Storyteller."
      },
      wordScarred: {
        name: "Word-Scarred",
        dots: "(•)",
        description: "The Caitiff body is covered to some degree with ancient vampiric lore text. The extent of what this Flaw does in play is up to the player(s) and Storyteller."
      }
    }
  },
  thinBlood: {
    name: "Thin-blood",
    description: "Only Thin-Bloods may take these Merits and Flaws.",
    merits: {
      anarchComrades: {
        name: "Anarch Comrades",
        dots: "•",
        description: "Befriended an Anarch group, and act as a one-dot Anarch Mawla."
      },
      camarillaContact: {
        name: "Camarilla Contact",
        dots: "•",
        description: "Caught the attention of someone within the Camarilla, acts as a one-dot Camarilla Mawla."
      },
      catenatingBlood: {
        name: "Catenating Blood",
        dots: "•",
        description: "Can create Blood Bonds and Embrace other thin-bloods."
      },
      dayDrinker: {
        name: "Day Drinker",
        dots: "•",
        description: "Able to walk in the sun. Sunlight halves their Health Tracker (rounded up) and removes all vampiric abilities."
      },
      disciplineAffinity: {
        name: "Discipline Affinity",
        dots: "•",
        description: "Natural ability for one Discipline. Gain one dot and can retain additional levels at the experience cost of out-of-clan. Consuming matching resonance does not reward them with extra temporary dots."
      },
      lifelike: {
        name: "Lifelike",
        dots: "•",
        description: "Has a heartbeat, can eat food, and enjoy sexual activities. Most medical checks reveal nothing, as long as it's during the night."
      },
      thinBloodAlchemist: {
        name: "Thin-blood Alchemist",
        dots: "•",
        description: "Gain one dot and one formula of Thin-blood Alchemy."
      },
      vampiricResilience: {
        name: "Vampiric Resilience",
        dots: "•",
        description: "Take damage like a regular vampire."
      },
      abhorrentBlood: {
        name: "Abhorrent Blood",
        dots: "•",
        description: "With Blood so disgusting any vampire who attempts to drink from them must spend two points of Willpower each turn. Mortals and Thin-blood Alchemy are not affected by this."
      },
      faithProof: {
        name: "Faith-Proof",
        dots: "•",
        description: "They are too close to mortality for True Faith to affect them."
      },
      lowAppetite: {
        name: "Low Appetite",
        dots: "•",
        description: "When waking up at sunset with Hunger 0 or 1, roll two dice on the Rouse Check and take the highest between the two."
      },
      lucidDreamer: {
        name: "Lucid Dreamer",
        dots: "•",
        description: "Once per session, they can receive a clue from the previous night's memories or a hint about the story."
      },
      mortalitysMien: {
        name: "Mortality's Mien",
        dots: "•",
        description: "Appearing more mortal than most vampires their vampiric nature cannot be detected through auras. In addition, receive two dice in any attempt to make yourself appear mortal in other methods such as makeup."
      },
      swiftFeeder: {
        name: "Swift Feeder",
        dots: "•",
        description: "Able to slake one Hunger in one turn as well as lick the wound closed. This can only be used once per scene."
      }
    },
    flaws: {
      shunnedByTheAnarchs: {
        name: "Shunned by the Anarchs",
        dots: "(•)",
        description: "They've done something and the Anarch shun them, more likely to throw them to the Camarilla than help. Cannot take Anarch Comrades with this Flaw."
      },
      brandedByTheCamarilla: {
        name: "Branded by the Camarilla",
        dots: "(•)",
        description: "An unhealable and painful brand given by the Camarilla to know what they are. Cannot take Camarilla Contact with this Flaw."
      },
      bestialTemper: {
        name: "Bestial Temper",
        dots: "(•)",
        description: "Frenzy test as normal vampire rules"
      },
      clanCurse: {
        name: "Clan Curse",
        dots: "(•)",
        description: "Cursed by the bane of a clan. Bane Severity becomes 1. Can only take Banu Haqim, Gangrel, or Brujah Bane if they have Bestial Temper and the Tremere Bane if they have Catenating Blood"
      },
      vitaeDependency: {
        name: "Vitae Dependency",
        dots: "(•)",
        description: "Must slake one hunger of vampire vitae each week else they'll lose access to all their vampiric powers."
      },
      deadFlesh: {
        name: "Dead Flesh",
        dots: "(•)",
        description: "Medical inspections will report them as deceased and take a one-die penalty to face-to-face Social tests with a mortal. Cannot take Lifelike with this Flaw."
      },
      babyTeeth: {
        name: "Baby Teeth",
        dots: "(•)",
        description: "Never developed fangs, or grew ones that were not sharp enough to break the skin."
      },
      mortalFrailty: {
        name: "Mortal Frailty",
        dots: "(•)",
        description: "Mend like a mortal, unable to rouse the blood. Cannot take Vampiric Resilience with this Flaw."
      },
      heliophobia: {
        name: "Heliophobia",
        dots: "(•)",
        description: "Fear sunlight as if a full vampire, terror Frenzy from sunlight."
      },
      nightTerrors: {
        name: "Night Terrors",
        dots: "(•)",
        description: "Once per session suffer from night terrors and receive a one-die penalty for all actions for the rest of the scene."
      },
      plagueBearers: {
        name: "Plague Bearers",
        dots: "(•)",
        description: "Still susceptible to mortal illnesses, whenever they feed they have a chance to catch a sickness by rolling a die and it lands on \"1\". Mortal medicine does not heal you, only slaking from a healthy immune system to Hunger 0 does."
      },
      sloppyDrinker: {
        name: "Sloppy Drinker",
        dots: "(•)",
        description: "When feeding make a Dex + Medicine test against a Difficulty equal to the amount of Hunger slaked. On a failure, the wound is too ragged to close and the victim may bleed out from the Masquerade-threatening wound."
      },
      sunFaded: {
        name: "Sun-Faded",
        dots: "(•)",
        description: "Alchemy and Disciplines are unusable in the sunlight, but can be used inside at a two-dice penalty during the day so long as they are away from any sunlight."
      },
      supernaturalTell: {
        name: "Supernatural Tell",
        dots: "(•)",
        description: "Something about them makes them easy to spot for supernatural creatures. Lose two dice from Stealth pools and similar against other supernatural creatures."
      },
      twilightPresence: {
        name: "Twilight Presence",
        dots: "(•)",
        description: "Mortals don't want to be around them and even other Kindred find them more unpleasant than other thin-bloods. Lose one die from Social pools involving others except for other thin-bloods who can adjust to their strange demeanor."
      },
      unendingHunger: {
        name: "Unending Hunger",
        dots: "(•)",
        description: "When feeding in a scene, slake one Hunger less, this only applies once per scene."
      }
    }
  },
  ghouls: {
    name: "Ghouls",
    description: "Only ghouls make take these Merits and Flaws. It is up to the Storyteller if the Merits are lost from major events such as becoming a ghoul or being Embraced. In general, if these are lost, the player should be able to purchase new Advantages for the now invalidated Merits.",
    merits: {
      bloodEmpathy: {
        name: "Blood Empathy",
        dots: "••",
        description: "The ghoul can feel if their regnant is in danger or otherwise, needs them immediately, this does not allow for telepathic communication."
      },
      unseemlyAura: {
        name: "Unseemly Aura",
        dots: "••",
        description: "Their aura has become indistinguishable from a Kindred."
      }
    },
    flaws: {
      banefulBlood: {
        name: "Baneful Blood",
        dots: "(• - ••)",
        description: "The character experiences the bane of their first domitor, this does not change if they get a new domitor. The domitor must be of Clan Lasombra, Malkavian, Ministry, Nosferatu, Ravnos, Salubri, or Toreador."
      },
      cronesCurse: {
        name: "Crone's Curse",
        dots: "(••)",
        description: "The character appears at least a decade older than they actually are which reduces their health tracker by one."
      },
      distressingFangs: {
        name: "Distressing Fangs",
        dots: "(•)",
        description: "Having developed fangs like Kindred, the character suffers one die on Social pools with mortals."
      }
    }
  },
  cults: {
    name: "Cults",
    description: "Some Merits and Flaws below are listed under their associated cult, however, these can be adapted to fit as the Storyteller and players see fit within their chronicle.",
    merits: {
      apocryphalTexts: {
        name: "Apocryphal Texts",
        dots: "•",
        description: "The character possesses writings from one of the church's leaders or prominent figures. On applicable rolls gain two dice Intelligence rolls. As a 1 dot optional Flaw that can come with this Merit the Willpower damage modifier for social combat is increased by 1."
      },
      inspiredArtist: {
        name: "Inspired Artist",
        dots: "••",
        description: "When using the cult's symbols or message in art, add a 1-die penalty to onlookers to resist Social rolls from cult members."
      },
      travelingPreacher: {
        name: "Traveling Preacher",
        dots: "••",
        description: "Having spread the cult's message where they go, reduce the difficulty on rolls to avoid the Second Inquisition by 1."
      },
      ashfindersMemoriesOfTheFallenThinBloods: {
        name: "Memories of the Fallen (Thin-bloods)",
        dots: "••",
        description: "Ashfinders. On Blood Alchemy rolls related to Ashe, one rolled 10 counts as two 10s. Two rolled 10s still count as four."
      },
      ashfindersStreamer: {
        name: "Streamer",
        dots: "••",
        description: "Ashfinders. Once per story, the character can call upon their fanbase to perform something simple and nonviolent for them."
      },
      bahariGardener: {
        name: "Gardener",
        dots: "• - •••••",
        description: "Bahari. Being selected members from the faith, this Merit is equivalent to Herd for the Bahari religion."
      },
      bahariDarkMothersSong: {
        name: "Dark Mother's Song",
        dots: "••",
        description: "Bahari. Add three dice in Manipulation rolls when convincing others to worship Lilith."
      },
      churchOfCaineFireResistant: {
        name: "Fire Resistant",
        dots: "•",
        description: "Church of Caine. Convert Aggravated Health damage from fire to Superficial Health damage equal to their Blood Potency for one Rouse Check instead of three during daysleep."
      },
      churchOfSetVigilant: {
        name: "Vigilant",
        dots: "••",
        description: "Church of Set. The character knows when they are being watched unless it's through supernatural means, they still must roll to know who and where from."
      },
      churchOfSetFixer: {
        name: "Fixer",
        dots: "••",
        description: "Church of Set. Once per story, call in a favor or threaten a former client."
      },
      churchOfSetGoToGround: {
        name: "Go to Ground",
        dots: "•",
        description: "Church of Set. Add two dice on rolls when evading pursuit."
      },
      cultOfShalimInsidiousWhispers: {
        name: "Insidious Whispers",
        dots: "••",
        description: "Cult of Shalim. When making a Social roll to undermine a Conviction, one rolled 10 counts as two 10s. Two rolled 10s still count as four."
      },
      cultOfShalimGematria: {
        name: "Gematria",
        dots: "•",
        description: "Cult of Shalim. The ability to understand a coded cipher allowing both encrypting and decrypting messages."
      },
      mithraicMysteriesBullSlayer: {
        name: "Bull-Slayer",
        dots: "•••",
        description: "Mithraic Mysteries. During Extended Tests, The character can reroll up to three regular dice without spending Willpower once per scene."
      },
      mithraicMysteriesBargainer: {
        name: "Bargainer",
        dots: "•",
        description: "Mithraic Mysteries. Reduce the Difficulty to assess a transaction by 1."
      },
      nephilimArchangelsGrace: {
        name: "Archangel's Grace",
        dots: "•••",
        description: "Nephilim. Replace the Athletics Skill with the Performance Skill or vice versa when doing something akin to heavy cardio, such as fighting."
      }
    },
    flaws: {
      excommunicated: {
        name: "Excommunicated",
        dots: "(• - ••)",
        description: "They've done something to be cast out. At one dot, subtract two dice from all rolls dealing with the cult. At two dots, the cult actively seeks to destroy you in any way possible."
      },
      faithless: {
        name: "Faithless",
        dots: "(••)",
        description: "Being a member for the benefits instead of being a true believer. Lose two dice on rolls pertaining to the Cult from Resolve and Composure rolls. Cannot learn any Rituals, Ceremonies, and Loresheets higher than level 2."
      },
      ashfindersAsheAddiction: {
        name: "Ashe Addiction",
        dots: "(••)",
        description: "Ashfinders. In addition to the Ashe rules in Cults of the Blood Gods, after a failed Blood Alchemy roll, take a two dice penalty for all actions till the session ends"
      },
      churchOfCaineSchismLasombra: {
        name: "Schism (Lasombra)",
        dots: "(•)",
        description: "Church of Caine. Suffer a two-dice penalty on Social rolls with members of your cult."
      },
      churchOfSetFalseAlarm: {
        name: "False Alarm",
        dots: "(•)",
        description: "Church of Set. Every failed Awareness roll counts as a total failure."
      },
      cultOfShalimEmpty: {
        name: "Empty",
        dots: "(•)",
        description: "Cult of Shalim. People attempt to remove themselves from the character's unnerving presence. Subtract two dice from Social rolls"
      },
      mithraicMysteriesFailedInitiate: {
        name: "Failed Initiate",
        dots: "(•)",
        description: "Mithraic Mysteries. The character faltered during the process of becoming a member, being assigned a guide who will interrupt plans, offer instruction, or demand the character prove themselves at any time."
      },
      nephilimYearning: {
        name: "Yearning",
        dots: "(•)",
        description: "Nephilim. Missing their master, they must spend two Willpower to work against their master's wishes."
      }
    }
  }
};

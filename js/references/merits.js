// Remove ES6 export - use traditional script loading
// export const merits = {
const merits = {
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
  }
};
window.merits = merits; 
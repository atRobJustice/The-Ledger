const hunterMerits = {
  description: "Merits describe knacks, gifts, and just plain good fortune inherent to the character: Physical, Mental, and Social. Although something could happen in the course of play to change them – especially once weird inexplicable magic gets unleashed — characters' Merits remain fairly constant over the course of the story.",
  linguistics: {
    name: "Linguistics",
    description: "Merits covering language and ability to communicate/understand spoken or written language.",
    merits: [
      {
        name: "Linguistics",
        dots: "• +",
        description: "Each dot of Linguistics allows the character to read, write and speak fluently in another language outside of the default two they already know, which is their native language and the dominant language of the chronicle setting."
      },
      {
        name: "Dead Tongues",
        dots: "••",
        description: "The character adds 2 bonus dice when attempting to translate an extinct language."
      }
    ],
    flaws: [
      {
        name: "Illiterate",
        dots: "(••)",
        description: "The character cannot read nor write and their Science and Academics Skills may not go beyond 1 dot. The character also cannot have a specialty that incorporates modern knowledge."
      },
      {
        name: "El Mala Educación",
        dots: "(••)",
        description: "Requires the Dead Tongues merit. The character makes some mistakes because of their lackluster education in the language. The Danger rating increases by 1 on total failures or critical results when they attempt to translate any extinct language."
      }
    ]
  },
  academia: {
    name: "The World of Academia",
    description: "Merits gained from higher education.",
    merits: [
      {
        name: "Forbidden Texts",
        dots: "••",
        description: "The character has acquired writings from an expert. Upon choosing this merit, the character picks a monster type, and gains a 2 dice bonus on all research tests on the subject of that monster. The subject in question will most likely want the writings back."
      },
      {
        name: "Thesis",
        dots: "••",
        description: "The character chooses an additional Specialty, though not tied to any Skill but applying to any of them when used in a research test. The Storyteller needs to approve this specialty, which must be tied to academics and not the supernatural."
      },
      {
        name: "Part of the Furniture",
        dots: "•••",
        description: "Once per session, when interacting with campus staff, or while on campus, the character may add 2 dice to any single pool."
      }
    ],
    flaws: [
      {
        name: "Falling Grades",
        dots: "(•)",
        description: "Reduce social pools by two when dealing with campus staff."
      },
      {
        name: "Dangerous Knowledge",
        dots: "(••)",
        description: "Upon purchasing this merit, the Storyteller chooses a monster type. When making research or perception-related tests on that monster type, if the result is a total failure or a critical, the Danger rating increases by 1."
      }
    ]
  },
  looks: {
    name: "Looks",
    description: "Representative to the physical appearance of the character.",
    merits: [
      {
        name: "Beautiful",
        dots: "••",
        description: "Add one die to related Social pools"
      },
      {
        name: "Stunning",
        dots: "••••",
        description: "Add two dice to related Social pools"
      }
    ],
    flaws: [
      {
        name: "Ugly",
        dots: "(•)",
        description: "Lose one die from related Social pools"
      },
      {
        name: "Repulsive",
        dots: "(••)",
        description: "Lose two dice from related Social pools"
      }
    ]
  },
  nutritionist: {
    name: "Nutritionist",
    description: "The ability to use food to heal either themselves or their fellow Hunters.",
    merits: [
      {
        name: "Solo Cooking",
        dots: "•",
        description: "Heal one extra Superficial Health at the beginning of a session if the Hunter has time to prepare a meal before the session begins."
      },
      {
        name: "Cell Chef",
        dots: "••",
        description: "The entire cell heals one extra Superficial Health at the beginning of a session if the Hunter has time to prepare a meal before the session begins. Any Hunters separated from the cell at the start of session would not receive this benefit."
      }
    ],
    flaws: [
      {
        name: "Malnourished",
        dots: "(••)",
        description: "The character is too busy, poor or inept to eat properly, and their Health is calculated as Stamina + 2 instead of Stamina + 3."
      }
    ]
  },
  mentalFeats: {
    name: "Mental Feats",
    description: "Merits & Flaws pertaining to the Hunter's mental flexibility and aptitude, and the consequences of pushing them too far.",
    merits: [
      {
        name: "Always Prepared",
        dots: "••",
        description: "The character is efficient and practical, and adds 2 bonus dice to Preparedness dice pools (seen on page 28 of Alma Maters)."
      },
      {
        name: "Eidetic Memory",
        dots: "••",
        description: "The character benefits from photographic memory, only requiring a bit of study before they can recall a text or details verbatim. They gain 2 bonus dice on any test related to recall for things such as codes, directions, maps, facial recognition, formulae, and rote behaviors."
      }
    ],
    flaws: [
      {
        name: "Disordered Sleep",
        dots: "(••)",
        description: "Sleep catches the character at the least convenient time possible, due to their messy sleep schedule. In situations where they are studying, waiting, or keeping watch, they must roll a die, and fall asleep if the result is a failure. It is up to the Storyteller to define the impact, but it generally means the character can't complete a task, misses a detail, or is easy to ambush."
      }
    ]
  },
  psychologistTraits: {
    name: "Psychologist Traits",
    description: "Flaws related to either the toll being a Hunter takes on one's mind or just a personality that places them in danger before they'd ever become a Hunter.",
    flaws: [
      {
        name: "Living on the Edge",
        dots: "(••)",
        description: "When confronted with a risky temptation that the character hasn't done before, they suffer a two-dice penalty for all actions till they participate or the scene ends."
      },
      {
        name: "Weak-Willed",
        dots: "(•••)",
        description: "Even when they are aware that someone is attempting to sway they may not use the active resistance systems to avoid the attempts."
      }
    ]
  },
  substanceAbuse: {
    name: "Substance Abuse",
    description: "Unfortunately, some Hunters find comfort in substances in order to cope with their world.",
    flaws: [
      {
        name: "Addiction",
        dots: "(•)",
        description: "Unless the action is to immediately gain their drug, lose one die to all pools if the character did not indulge in their substance of choice during the last scene."
      },
      {
        name: "Severe Addiction",
        dots: "(••)",
        description: "Unless the action is to immediately gain their drug, lose two dice to all pools if the character did not indulge in their substance of choice during the last scene."
      }
    ]
  },
  supernaturalSituations: {
    name: "Supernatural Situations",
    description: "Sometimes Hunters are touched by the supernatural, but these Merits and Flaws do not make them anything other than mortal. Hunters with these Merits do not count as monstrous or Unnatural in relation to the Endowment Edges.",
    merits: [
      {
        name: "Unseemly Aura",
        dots: "••",
        description: "Monsters will occasionally believe the Hunter to be one of their own or another supernatural creature entirely."
      }
    ],
    flaws: [
      {
        name: "Crone's Curse",
        dots: "(•••)",
        description: "The character appears at least a decade older than they actually are which reduces their health tracker by one."
      },
      {
        name: "Stigmata",
        dots: "(••)",
        description: "Select either Health or Willpower damage at character creation, this Flaw may also be taken a second time for the other type of damage. The Hunter bleeds from open wounds on their hands, feet and forehead whenever they suffer physical or Willpower damage. However, this does not trigger when they spend Willpower."
      }
    ]
  }
};

export default hunterMerits; 
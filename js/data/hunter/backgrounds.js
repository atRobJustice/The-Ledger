const hunterBackgrounds = {
  allies: {
    name: "Allies",
    description: "Humans who are willing to help a Hunter or another human who has a vendetta against them.",
    merits: [
      {
        name: "Allies",
        dots: "• - ••••••",
        description: "A group who will support or aid the Hunter. Family, friends, or an organization that has loyalty. Build them between (• - ••••) Effectiveness and (•-•••) Reliability, the maximum amount of total points is 6. Effectiveness defines how proficient they are at a task. Reliability determines how dependable they are."
      }
    ],
    flaws: [
      {
        name: "Enemy",
        dots: "(• +)",
        description: "The opposite to Allies, and are rated two dots less than their effectiveness."
      }
    ]
  },
  contacts: {
    name: "Contacts",
    description: "A way to obtain items otherwise much more difficult to obtain on one's own.",
    merits: [
      {
        name: "Contacts",
        dots: "• - •••",
        description: "These are people who can get the character information, items or other things of value."
      }
    ]
  },
  fame: {
    name: "Fame",
    description: "The public notoriety of a character, for good or bad.",
    merits: [
      {
        name: "Fame",
        dots: "• - •••••",
        description: "The character might be a pop singer, actress, or other celebrity. The level of fame can subtract from tests against fans and can be used inplace of a another Trait in Social tests as allowed by the Storyteller. However, this can also be a dangerous trait as tailing a target unnoticed may become difficult with fans spotting the character."
      }
    ],
    flaws: [
      {
        name: "Infamy",
        dots: "(••)",
        description: "They've done something atrocious and others know."
      },
      {
        name: "Dark Secret",
        dots: "(•)",
        description: "What they've done is still a secret, except to one or two very motivated enemies."
      },
      {
        name: "Infamous Partner",
        dots: "(•)",
        description: "A spouse, lover or someone else significant to the character has Infamy that will sometimes tarnish the reputation of the Hunter by association."
      }
    ]
  },
  influence: {
    name: "Influence",
    description: "The ability they have to influence how other groups react or act.",
    merits: [
      {
        name: "Influence",
        dots: "• - •••••",
        description: "They have sway in communities, be they political, through financial status and prestige, or manipulation. By default, this merit usually applies to a specific group or region of the city."
      }
    ],
    flaws: [
      {
        name: "Disliked",
        dots: "(•)",
        description: "Subtract one die from Social tests involving groups outside of the character's loyal followers."
      },
      {
        name: "Despised",
        dots: "(••)",
        description: "One group/region of the city goes out of its way to thwart the character's plans."
      }
    ]
  },
  mask: {
    name: "Mask",
    description: "The status of the Hunter's identification.",
    merits: [
      {
        name: "Mask",
        dots: "• - ••",
        description: "A fake identity that allows the Hunter to keep their true selves away from the law or rival orgs, this might include bank accounts, a birth certificate and everything else a Hunter might need to hide their identity."
      },
      {
        name: "Zeroed",
        dots: "•",
        description: "All of the character's past self has been purged from all systems as if they never existed. The character must have a 2-dot mask in order to take this."
      },
      {
        name: "Cobbler",
        dots: "•",
        description: "The ability to create or source out masks. Making a mask takes 3 days per dot. The character must have a 2-dot mask in order to take this."
      },
      {
        name: "Faked Death",
        dots: "••",
        description: "As long as you keep a low profile and a new identity nobody from your old life is going to be looking for yo including Enemies, Stalkers, and orgs. You do maintain a limited relationship with any Contacts. The character must have a 2-dot mask in order to take this. Unless you buy a separate Mask Merit you have the same penalties as the Serial Error Flaw."
      }
    ],
    flaws: [
      {
        name: "Serial Error",
        dots: "(•)",
        description: "A mistake has been made in the characters background checks showing that they'd recently died, are on a dangerous watchlist, or otherwise likely to be called or detained by the police. This also applies to any database lookups on their identity."
      },
      {
        name: "Person of Interest",
        dots: "(••)",
        description: "The Hunter has become a person of interest and with their biometrics and information having been logged as a potential terrorist in agency databases."
      }
    ]
  },
  mentor: {
    name: "Mentor",
    description: "Their relationship with either one or a group of Hunters who look out for them, offer them guidance, information, or aid in other ways once in awhile. Generally a group costs one more dot than a single mentor of the equivalent level, for example, a cell of three experienced Hunters might be a four dot group.",
    merits: [
      {
        name: "Mentor",
        dots: "• - •••••",
        description: "Another Hunter or group of Hunters who has taken the character under their wing."
      },
      {
        name: "Generous",
        dots: "• - •••",
        description: "You can call upon your mentor for a valuable favor once per story. This does not run the usual risk of offending your mentor but you lose a dot from this background each time you do."
      },
      {
        name: "Spirit Guide (Arcanum)",
        dots: "••",
        description: "Your mentor is some kind of ghost or unearthly being that you studied and formed a rapport with. You have the ability to summon them. They are unable to aid with corporeal matters like law enforcement or politics but they do have reliable knowledge on ghosts."
      }
    ],
    flaws: [
      {
        name: "Adversary",
        dots: "(• - •••)",
        description: "A rival Hunter who wants to do the Hunter or their cell harm."
      },
      {
        name: "Credit Hungry (Arcanum)",
        dots: "(•)",
        description: "On any Hunt where you call upon your mentor for aid, they will take credit for all achievements but not negative consequences."
      }
    ]
  },
  resources: {
    name: "Resources",
    description: "Resources represents the income of a Hunter, be it physical cash, items or places. The source of the income must be defined when obtained.",
    merits: [
      {
        name: "Resources",
        dots: "• - •••••",
        description: "Cash flow, be it from stock trading or equipment to working as a barista at night."
      }
    ],
    flaws: [
      {
        name: "Destitute",
        dots: "(•)",
        description: "No money and no home."
      }
    ]
  },
  retainers: {
    name: "Retainers",
    description: "A loyal servant or assistant; they can be paid employees, longtime stewards of the Hunter or the Hunter's family, or a victim of some type of scheme that keeps them reliant on the Hunter.",
    merits: [
      {
        name: "Retainers",
        dots: "• - •••",
        description: "Loyal followers who will accomplish a request for the Hunter."
      }
    ],
    flaws: [
      {
        name: "Stalkers",
        dots: "(•)",
        description: "Something about the character tends to attract others who get a little bit too attached and just won't let go. Be it a former retainer or a past lover, should they get rid of them, another soon appears."
      }
    ]
  },
  safeHouse: {
    name: "Safe House",
    description: "A Safe House represents the degree of security and distinction beyond a place to sleep and eat. Hunters without dots in this background can still have a place to resides and remain safe, and other Backgrounds can be used as justification for safe houses such as Resources, Status and Influence. However, if these Backgrounds disappear, so does the safe house.",
    merits: [
      {
        name: "Safe House",
        dots: "• - •••",
        description: "Each dot adds +1 to the Difficulty or 1 die to the pools for resisting spotting, penetrating and surveilling the Hunter's home. Also add one dice per dot to notice danger while in the Safe House."
      },
      {
        name: "Hidden Armory",
        dots: "• +",
        description: "Each dot adds one pistol and one long firearm inside the safe house, safely concealed. These aren't as strong as those earned from the Arsenal Edge, nor do they automatically replenish if misplaced."
      },
      {
        name: "Panic Room",
        dots: "• +",
        description: "The ability to house to individuals and breaching this requires a base Difficulty of 5, this can also be applied to those held captive. Each extra dot allows either twice as many individuals with a cap of 32 in large safe houses or adds +1 to the breach/escape Difficulty. This is not available to 1 dot safe houses."
      },
      {
        name: "Watchmen",
        dots: "• +",
        description: "Each dot supplies 4 Average Mortals and one Gifted Mortal to watch over the safe house."
      },
      {
        name: "Laboratory",
        dots: "• +",
        description: "Each dot of this merit contributes to dice rolls related to one Science or Technology specialty. Not available in one dot safe houses."
      },
      {
        name: "Luxury",
        dots: "•",
        description: "Rich and full of value, the safe house is well decorated with high-end décor and items. +2 dice bonus to Social tests when mortals are inside the safe house. Without at least 3 dots in Resources, these items are stolen or illegally obtained."
      },
      {
        name: "Postern",
        dots: "• +",
        description: "The safe house has some kind of secret exit that allows them a safe passage out. For each dot of this merit add one die to pools of evasion or escaping surveillance near the safe house."
      },
      {
        name: "Security System",
        dots: "• +",
        description: "For each dot of this merit, add one die to pools to resist (or to alert the Hunter to) unwelcome guests into the safe house."
      },
      {
        name: "Surgery",
        dots: "•",
        description: "Add two die to relevant pools for relevant tests performed in safe houses."
      },
      {
        name: "Bolt Hole",
        dots: "•",
        description: "Whenever hiding or attempting to move from one safe place to another undetected, receive a 2 dice bonus."
      }
    ],
    flaws: [
      {
        name: "No Safe House",
        dots: "(•)",
        description: "The character has no expectation of security while at home."
      },
      {
        name: "Creepy",
        dots: "(•)",
        description: "Take a two-dice penalty on Social pools in the safe house with human guests."
      },
      {
        name: "Haunted",
        dots: "(• +)",
        description: "There is a supernatural manifestation taking hold over the safe house with the penalties defined by the Storyteller. It should at least give a one-die penalty or bonus to affected pools used in the safe house per dot of Haunted."
      },
      {
        name: "Compromised",
        dots: "(••)",
        description: "This safe house is on a watchlist and may have been raided at some point, adding two dice to pools to penetrate or watch the safe house."
      },
      {
        name: "Interfering Roommate",
        dots: "(•)",
        description: "The safe house isn't private, with someone else also using it for legitimate purpose, keeping an eye on the character. Suspicious or outright criminal activity will be reported to relevant authorities."
      }
    ]
  },
  status: {
    name: "Status",
    description: "Reputation and standing within a specific local community of Hunters.",
    merits: [
      {
        name: "Status",
        dots: "• - •••••",
        description: "The character has built a name for themselves with a group of Hunters."
      }
    ],
    flaws: [
      {
        name: "Suspect",
        dots: "(•)",
        description: "Breaking the rules or weaseling out of something owed has netted this character the ire of this Hunter group. Stay out of sight and mind and nothing will happen until they prove their worth again but until then take a 2 dice penalty to Social tests with the offended Hunters."
      },
      {
        name: "Shunned",
        dots: "(••)",
        description: "Despised by a Hunter group, a line was crossed that never should have been, and now members of this group actively work against them at any opportunity."
      }
    ]
  }
};

export default hunterBackgrounds; 
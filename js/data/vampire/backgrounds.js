export const backgrounds = {
  allies: {
    name: "Allies",
    description: "Groups of mortals who are willing to give aid to a vampire or mortals who have a vendetta.",
    merits: {
      effectiveness: {
        name: "Effectiveness",
        dots: "• - ••••",
        description: "A group of mortals who will support or aid the vampire. Family, friends, or an organization that has loyalty to the vampire. Build them between (• - ••••) Effectiveness and (•-•••) Reliability, the maximum amount of total points is 6. Effectiveness defines how proficient they are at a task. Reliability determines how dependable they are."
      },
      reliability: {
        name: "Reliability",
        dots: "• - •••",
        description: "A group of mortals who will support or aid the vampire. Family, friends, or an organization that has loyalty to the vampire. Build them between (• - ••••) Effectiveness and (•-•••) Reliability, the maximum amount of total points is 6. Effectiveness defines how proficient they are at a task. Reliability determines how dependable they are."
      }
    },
    flaws: {
      enemy: {
        name: "Enemy",
        dots: "• +",
        description: "The opposite to Allies, and are rated two dots less than their effectiveness."
      }
    }
  },
  contacts: {
    name: "Contacts",
    description: "A way to obtain items otherwise much more difficult to obtain on one's own.",
    merits: {
      contacts: {
        name: "Contacts",
        dots: "• - •••",
        description: "These are mortals who can get the character information, items or other things of value."
      }
    }
  },
  fame: {
    name: "Fame",
    description: "The public notoriety of a character, for good or bad.",
    merits: {
      fame: {
        name: "Fame",
        dots: "• - •••••",
        description: "Mortal fame is a dangerous game, the character might have once been a pop singer, actress, or other celebrity. The level of fame can subtract from tests against fans or hunting. There is a downside as people may remember the character as their face is plastered on a nearby billboard. Fame can be bought to apply in Vampire society as well."
      },
      influencer: {
        name: "Influencer",
        dots: "•",
        description: "(Requires Fame ••+)People idolize the character to the point they take the character's words as gospel. Have the equivalent Influence rating equal to your Fame minus one towards a fan or related field once per story."
      },
      enduringFame: {
        name: "Enduring Fame",
        dots: "•",
        description: "(Requires Fame •••+)The character is so beloved that fame and stardom can never leave them. Fame lost during the story fully recovers at the start of the next story."
      }
    },
    flaws: {
      darkSecret: {
        name: "Dark Secret",
        dots: "(• +)",
        description: "What they've done is still a secret, except to one or two very motivated enemies."
      },
      infamy: {
        name: "Infamy",
        dots: "(• +)",
        description: "They've done something atrocious and others know."
      },
      bannedFrom: {
        name: "Banned From",
        dots: "(• - •••)",
        description: "Small cities are one dot, medium cities are two dots, large cities are three dots."
      }
    }
  },
  influence: {
    name: "Influence",
    description: "The ability they have to influence how other groups react or act.",
    merits: {
      influence: {
        name: "Influence",
        dots: "• - •••••",
        description: "They have sway in mortal communities, be they political, through financial status and prestige, or manipulation. By default, this merit only applies to a specific group or region of the city."
      }
    },
    flaws: {
      disliked: {
        name: "Disliked",
        dots: "(•)",
        description: "Subtract one die from Social tests involving groups outside of the character's loyal followers."
      },
      despised: {
        name: "Despised",
        dots: "(••)",
        description: "One group/region of the city goes out of its way to destroy the character's plans."
      }
    }
  },
  haven: {
    name: "Haven",
    description: "The place where a vampire resides during the day. Havens have additional addon Merits that can change the function of the location, aid in certain actions or even hinder certain interactions. Some Kindred turn their Havens into sacred grounds, as seen with the Holy Ground and Shrine Merits.",
    merits: {
      haven: {
        name: "Haven",
        dots: "• - •••",
        description: "A vampire without Haven dots is able to find a safe place for the night. However, Haven dots make it that much more secure and private per dot."
      },
      hiddenArmory: {
        name: "Hidden Armory",
        dots: "• +",
        description: "Each dot adds one pistol and one firearm inside the haven, safely concealed."
      },
      cell: {
        name: "Cell",
        dots: "• +",
        description: "Allows two prisoners to be stored inside. Each additional dot either allows the character to store twice as many prisoners or adds +1 to the attempts to escape. Not available in one dot havens."
      },
      watchmen: {
        name: "Watchmen",
        dots: "• +",
        description: "Each dot supplies 4 Average Mortals and one Gifted Mortal to watch over the haven."
      },
      laboratory: {
        name: "Laboratory",
        dots: "• +",
        description: "Each dot of this Merit contributes to dice rolls related to one Science or Technology specialty or for Alchemy pools when using Fixatio. Not available in one dot havens."
      },
      library: {
        name: "Library",
        dots: "• +",
        description: "Each dot of this merit contributes to dice rolls for one Academics, Investigation or Occult specialty. Small havens are limited to one dot."
      },
      location: {
        name: "Location",
        dots: "•",
        description: "The place in which this haven resides gives a +2 dice bonus (or +2 enemies Difficulty) on relevant rolls from either Chasse or base Haven rating. If this does not work, with the Storyteller the player can craft a custom bonus. Example, living in the heart of downtown allows the character to have a +2 bonus to etiquette rolls to pick up local rumors."
      },
      luxury: {
        name: "Luxury",
        dots: "•",
        description: "Rich and full of value, the haven is well decorated with high-end décor and items. +2 dice bonus to Social tests when mortals are inside the haven. Without at least 3 dots in Resources, these items are stolen or illegally obtained."
      },
      postern: {
        name: "Postern",
        dots: "• +",
        description: "The haven has some kind of secret exit that allows them a safe passage out. For each dot of this Merit add one die to pools of evasion or escaping surveillance near the haven."
      },
      securitySystem: {
        name: "Security System",
        dots: "• +",
        description: "For each dot of this Merit, add one die to pools to resist unwelcome guests into the haven."
      },
      surgery: {
        name: "Surgery",
        dots: "•",
        description: "Add two die to relevant pools for relevant tests performed in havens."
      },
      warding: {
        name: "Warding",
        dots: "• +",
        description: "This haven possesses some type of magic warding that repels supernatural entities. Each dot of this Merit adds one die to pools to resist supernatural scrying and whatever else the Storyteller allows."
      },
      holyGround: {
        name: "Holy Ground",
        dots: "•",
        description: "The haven has significance to the character's cult, granting them the ability to call upon a large group of cultists to protect their haven once per story."
      },
      shrine: {
        name: "Shrine",
        dots: "• - •••",
        description: "A shrine is present in the haven, adding a bonus equivalent to the dots in searching, preparing or otherwise obtaining Ritual or Ceremony ingredients."
      },
      businessEstablishment: {
        name: "Business Establishment",
        dots: "•• - •••",
        description: "The haven is rented out to a business or is run as a business by the Kindred themselves. This gives both benefits and drawbacks, such as a ready stream of income but also being very much on the grid and local enforcement being aware of the location. This reduces the Haven's base dots by one for pools involving the Haven's privacy and defenses against either (pick one) financial or criminal intrusions. Dots in this Merit roughly equal Resources but do not stack onto existing Resources for the character."
      },
      furcus: {
        name: "Furcus",
        dots: "• - •••",
        description: "The haven is located on veins of the earth or a frayed spot in the Veil. Each dot in this Merit adds one die to Rituals or Ceremony dice pools used at the furcus."
      },
      machineShop: {
        name: "Machine Shop",
        dots: "• +",
        description: "Each dot of this Merit adds one dice to the pool for Craft rolls. It also adds this to other tests related to building, repairing, or disassembling machinery or equipment."
      },
      mobile: {
        name: "Mobile",
        dots: "• - •••",
        description: "Mobile haven (car, van, boat, plane, etc.). Size equals the number of dots. (Coterie dots may be used for this merit)."
      },
      armored: {
        name: "Armored",
        dots: "•",
        description: "Requires Mobile Haven merit. Mobile Haven has reinforced panels, locks, tires, and glass. Can sustain 10 points of damage, requiring Critical hits to sufficiently affect passengers."
      },
      smugglersStash: {
        name: "Smugglers Stash",
        dots: "• - ••",
        description: "Requires Mobile Haven merit. A secret stash within the haven to hide contraband. Any searches done to inspect the haven are made with +2 difficulty. Size of the stash equals the number of dots."
      },
      sparePlates: {
        name: "Spare Plates",
        dots: "••",
        description: "Requires Mobile Haven merit. A spare set of plates, stickers, and other identifiers that can be switched out within a turn to avoid all but the most invasive searches."
      }
    },
    flaws: {
      noHaven: {
        name: "No Haven",
        dots: "(•)",
        description: "The character must make a basic test to find a secure resting place."
      },
      creepy: {
        name: "Creepy",
        dots: "(•)",
        description: "Take a two-dice penalty on Social pools in the haven with mortals."
      },
      haunted: {
        name: "Haunted",
        dots: "(• +)",
        description: "There is a supernatural manifestation taking hold over the haven."
      },
      compromised: {
        name: "Compromised",
        dots: "(••)",
        description: "This haven is on a watchlist and may have been raided at some point."
      },
      shared: {
        name: "Shared",
        dots: "(•) or (••)",
        description: "The haven is not entirely owned by the character, instead being shared with other Kindred or having a Kindred landlord. This does not need to be taken by Coteries, as that only has as many problems as they make mutually in play."
      },
      onTheRails: {
        name: "On the Rails",
        dots: "(•)",
        description: "Requires Mobile Haven merit. Haven's movement isn't under Player control, such as a ship or a train, as destinations are likely scheduled and fixed."
      },
      temperamental: {
        name: "Temperamental",
        dots: "(•)",
        description: "Requires Mobile Haven merit. Vehicle is mechanically unreliable; Any failed Drive tests sees the vehicle grind to a halt, requiring a successful repair test to restart. The flaw follows the Player even if they switch to another vehicle, unless bought off with experience."
      }
    }
  },
  herd: {
    name: "Herd",
    description: "Merits and Flaws pertaining to the vampire's ability to have free access to mortal blood through forming a group of willing vessels.",
    merits: {
      herd: {
        name: "Herd",
        dots: "• - •••••",
        description: "A group of vessels that the character may feed from without concern, though they are less loyal than retainers. They can slake Hunger worth the dot value of the Herd each week freely and no roll is required."
      }
    },
    flaws: {
      obviousPredator: {
        name: "Obvious Predator",
        dots: "(••)",
        description: "A predatory vibe removes two dice from any hunting pool except Physical stalking, chasing, and killing. Lose on die from any Social test intended to calm humans. Cannot maintain a Herd."
      }
    }
  },
  mask: {
    name: "Mask",
    description: "The status of the Kindred's identification.",
    merits: {
      mask: {
        name: "Mask",
        dots: "• - ••",
        description: "A fake identity that allows the vampire to keep their true selves away from mortal's prying eyes, including getting bank accounts, a birth certificate and everything else a vampire might need to masquerade as a human."
      },
      zeroed: {
        name: "Zeroed",
        dots: "•",
        description: "All of the character's past self has been purged from all systems as if they never existed. The character must have a 2-dot mask in order to take this."
      },
      cobbler: {
        name: "Cobbler",
        dots: "•",
        description: "The ability to create or source out masks. Making a Mask takes 3 days per dot. The character must have a 2-dot mask in order to take this."
      }
    },
    flaws: {
      knownCorpse: {
        name: "Known Corpse",
        dots: "(•)",
        description: "People know the vampire died recently and react in turn if they see them."
      },
      knownBlankbody: {
        name: "Known Blankbody",
        dots: "(••)",
        description: "The character's name, history, associates, and more are all in several agency databases. Inquisition can recognize them as a vampire."
      }
    }
  },
  mawla: {
    name: "Mawla",
    description: "Their relationship with another Kindred.",
    merits: {
      mawla: {
        name: "Mawla",
        dots: "• - •••••",
        description: "Another kindred who has taken them under their wing to mentor them."
      },
      secretMaster: {
        name: "Secret Master",
        dots: "•",
        description: "Your Mawla gives you tasks that must be completed quietly. The character must have a Mawla to take this"
      }
    },
    flaws: {
      adversary: {
        name: "Adversary",
        dots: "(• +)",
        description: "Another Kindred who perhaps liked the character, but now goes out of their way to ruin their lives in any way they can. Rated two levels higher than the Mawla value."
      },
      shamefulChilde: {
        name: "Shameful Childe",
        dots: "(•)",
        description: "Embraced a childe but abandoned them."
      },
      touchstoneEmbracedByYourEnemies: {
        name: "Touchstone Embraced by your Enemies",
        dots: "(••)",
        description: "A former Touchstone didn't die or change as a person, someone Embraced them. This is a single Neonate, but they have allies and confrontation carries the risk of Stains."
      }
    }
  },
  resources: {
    name: "Resources",
    description: "The cashflow of the Kindred.",
    merits: {
      resources: {
        name: "Resources",
        dots: "• - •••••",
        description: "Cash flow, be it from stock trading or inheritance to working as a barista at night."
      }
    },
    flaws: {
      destitute: {
        name: "Destitute",
        dots: "(•)",
        description: "No money, no home, and no monetary value beyond themselves."
      }
    }
  },
  retainers: {
    name: "Retainers",
    description: "The relationship with mortals who follow the character.",
    merits: {
      retainers: {
        name: "Retainers",
        dots: "• - •••",
        description: "Loyal followers who will do the character's bidding, sometimes Ghouls and/or Blood Bonded."
      }
    },
    flaws: {
      stalkers: {
        name: "Stalkers",
        dots: "(•)",
        description: "Something about the character tends to attract others who get a little bit too attached and just won't let go. Be it a former retainer or a past lover, should they get rid of them, another soon appears."
      }
    }
  },
  status: {
    name: "Status",
    description: "The Kindred's name in the faction and how it affects them.",
    merits: {
      status: {
        name: "Status",
        dots: "• - •••••",
        description: "The character has built a name for themselves in their Faction."
      },
      citySecrets: {
        name: "City Secrets",
        dots: "• - •••",
        description: "This grants knowledge about the city's Kindred power structure. If this secret is about mortal business it's only a way to explain Influence. This information can be sold at a high price, but its value lies in protection as the people involved may not want this information sold off and will do their best to keep you happy, for a time anyway. This can only be taken at a maximum of three times with each being a different secret."
      }
    },
    flaws: {
      suspect: {
        name: "Suspect",
        dots: "(•)",
        description: "Breaking the rules or weaseling out of something owed has netted this character the ire of this Sect. Stay out of sight and mind and nothing will happen until they prove their worth again but until then take a 2 dice penalty to Social tests with the offended Factions."
      },
      shunned: {
        name: "Shunned",
        dots: "(••)",
        description: "Despised by a Sect, a line was crossed that never should have been, and now members of this group actively work against them at any opportunity."
      },
      mortalPretender: {
        name: "Mortal Pretender",
        dots: "(•)",
        description: "The player character goes out of their way to lead a mortal life, unsettling their vampiric peers. Suffer a two-dice penalty to all Social tests against vampires that are specifically dedicated to upholding the Masquerade."
      }
    }
  }
}; 
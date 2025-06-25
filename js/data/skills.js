export const skills = {
  overview: {
    description: "Similar to Attributes, Skills are defined as follows. No dots means they have no knowledge or formal training, one being that they have basic knowledge, two is general knowledge, three is a professional Skill level, four means they've specialized in this, and five is mastery of the Skill.",
    distribution: {
      jackOfAllTrades: {
        name: "Jack of All Trades",
        description: "One Skill at 3 dots, eight Skills at 2 dots, and ten Skills at 1 dot."
      },
      balanced: {
        name: "Balanced",
        description: "Three Skills at 3 dots, five Skills at 2 dots, and seven Skills at 1 dot."
      },
      specialist: {
        name: "Specialist",
        description: "One Skill at 4 dots, three Skills at 3 dots, three Skills at 2 dots, and three Skills at 1 dot."
      }
    },
    specialties: {
      description: "If the players have allotted dots into the Skills Academics, Craft, Performance, and/or Science they will need to choose a free specialty for those with dots. Then they will have one more additional free specialty to place in any Skill. Don't forget to add in the spec from the Predator type and remember that characters can only have a specialty in a Skill for as many dots as they have except in specific cases such as the Craft Skill. If the character gains a specialty from the Predator type but has no dots in the Skill, the specialty can instead be converted to the first dot of one Skill."
    }
  },
  physical: {
    athletics: {
      name: "Athletics",
      description: "Running, jumping, and climbing are all actions within Athletics. Dodging a well-thrown punch in the heat of combat and throwing an item or weapon is also Athletics. Athletics can be used in place of any Physical combat skill in a conflict roll, but they never land any hits.",
      dotValues: {
        1: "They were attentive in gym class",
        2: "They are as fit as a mortal doing regular exercise",
        3: "Could play professional sports at night",
        4: "Immense parkour ability, why even turn into a bat?",
        5: "They could take Olympic records and Kindred mistake their skill for Disciplines"
      },
      specialties: ["Acrobatics", "Archery", "Climbing", "Endurance", "Jumping", "Parkour", "Swimming", "Throwing"],
      examplePools: {
        dexterity: [
          "Dodge both close combat and ranged attacks",
          "Fleeing a situation",
          "Used in Celerity powers, such a Fleetness",
          "Used to dodge an attack from a Potence power, such as Earthshock",
          "Used in Blood Sorcery powers such as Scorpion's touch to spit acid",
          "Used to throw weapons",
          "Climbing",
          "Determining how much fall damage a character takes"
        ],
        stamina: [
          "Out run pursuers in long distance",
          "Swimming"
        ],
        strength: [
          "Used in Blood Sorcery Rituals such as preventing being picked up by Essence of Air",
          "Also used to resist Thin-blood Alchemy powers such as Far Reach",
          "Lifting or smashing things"
        ],
        manipulation: [
          "Picking up someone at a gym using seduction"
        ]
      }
    },
    brawl: {
      name: "Brawl",
      description: "Combat focused on using the body as a weapon rather than an item.",
      dotValues: {
        1: "They had a tough upbringing and had to fight to survive, they still have some moved",
        2: "They have been trained in hitting someone hard and well aimed",
        3: "They can hold more than their own in a fight",
        4: "They either were trained in the special forces or have spent decades fighting",
        5: "They could win a MMA championship and not need their Disciplines to do it"
      },
      specialties: ["Animals", "Armed Mortals", "Bar Fights", "Grappling", "Kindred", "Sporting Combat", "Unarmed Mortals", "Werewolves", "While in Protean Beast Form"],
      examplePools: {
        strength: [
          "A conflict pool for a fight",
          "Escape a foe biting them",
          "Grappling an opponent, but this doesn't cause damage regardless of successes",
          "Hunting as an alleycat"
        ]
      }
    },
    craft: {
      name: "Craft",
      description: "Creating, building, or shaping items such as artwork but also making a makeshift catapult. When taken this skill gains one spec, unlike other Skills, Craft can have more specs than dots.",
      dotValues: {
        1: "They are an amateur artist",
        2: "Their work is admired for it's usefulness",
        3: "Their creations can be gorgeous or terrifying, but intent is always clear",
        4: "Their skill is highly regarded among the kine and Kindred know this",
        5: "They are often selected to create focal points for parties at Elysium"
      },
      specialties: ["Carpentry", "Carving", "Design", "Painting", "Sculpting", "Sewing", "Weaponsmith"],
      examplePools: {
        wits: [
          "Board up a door in record speed and it can hold"
        ],
        intelligence: [
          "Convince the city to build something with magical geometry",
          "Tagging something with graffiti, or making poster art/painting",
          "Build false compartments",
          "Create bombs with clock parts and wires",
          "Preparedness roll to remember a wrench"
        ]
      }
    },
    drive: {
      name: "Drive",
      description: "Driving vehicles specifically under duress and adverse or difficult conditions. Also used for working on cars or general mechanic skills.",
      dotValues: {
        1: "They are a cautious driver",
        2: "They can put the pedal to the metal without too much fear if the weather is clear",
        3: "They have won car chases and earned rep from it",
        4: "They could be a stunt driver or personal chauffeur for someone in power",
        5: "They know cars inside and out, very few can match this skill and knowledge"
      },
      specialties: ["All-Terrain Vehicles", "Evasion", "Motorcycles", "Street Racing", "Stunts", "Tailing", "Trucks", "Vintage Models"],
      examplePools: {
        wits: [
          "Swerve out of the way in time",
          "Pull alongside a vehicle so others can jump on",
          "Keeping the pursuer insight and chasing"
        ],
        resolve: [
          "Scrounging roll to find a vehicle"
        ],
        manipulation: [
          "For a spectre to control a possessed human"
        ],
        dexterity: [
          "Evading traffic, high speed chases, or complex maneuvers"
        ]
      }
    },
    firearms: {
      name: "Firearms",
      description: "Using ranged weaponry such as bows and guns as well as gunsmithing and repair of said items.",
      dotValues: {
        1: "They've fired a gun a few times",
        2: "They know to keep their weapon clean and how to take it apart and put it back together",
        3: "They've been in the shit and came out the other side",
        4: "They can handle trick shots, called shots, running shots, any shots",
        5: "They've been practicing since the Winchester came out"
      },
      specialties: ["Crossbows", "Gun Dealing", "Gunsmithing", "Handloading", "Ammunition", "Quick-Draw", "Sniper", "Trick Shooting"],
      examplePools: {
        composure: [
          "Standard conflict pool"
        ],
        resolve: [
          "Sniper shot",
          "Scrounging roll for bullets"
        ],
        dexterity: [
          "High-noon stand off for the first shot"
        ],
        strength: [
          "If engaged in hand to hand combat"
        ],
        intelligence: [
          "Preparedness roll to see if they brought a silencer"
        ]
      }
    },
    larceny: {
      name: "Larceny",
      description: "Lockpicking a locked door or breaking in other ways, pickpocketing and sleight of hand.",
      dotValues: {
        1: "They can pick a simple lock or pocket",
        2: "They can hotwire a car or shoplift",
        3: "They can identify the location of security cameras and alarms to bypass them",
        4: "They can defeat a keypad, re-tool and ID card, or break into a safe",
        5: "They can into or out of a multinational bank"
      },
      specialties: ["Alarms", "Forgery", "Grand Theft Auto", "Housebreaking", "Lockpicking", "Pickpocket", "Safecracking", "Security Analysis"],
      examplePools: {
        intelligence: [
          "Determining what type of alarm is it",
          "Beating the roof alarm",
          "Controlled demolitions",
          "Bypassing an alarm circuit",
          "Setting up a security system"
        ],
        dexterity: [
          "Breaking in through the skylight",
          "Cracking a safe",
          "Sleight of hand"
        ],
        composure: [
          "Extracting an item from a laser field"
        ],
        resolve: [
          "Cleaning up a crime scene"
        ],
        wits: [
          "Noticing a hidden camera"
        ],
        strength: [
          "Breaking a lock cleanly"
        ]
      }
    },
    melee: {
      name: "Melee",
      description: "Combat focused around using handheld weaponry such as a lead pipe or a baseball bat.",
      dotValues: {
        1: "They can swing a bat or blade",
        2: "They have competence with weapon handling",
        3: "Their skill with a weapon is known in the domain",
        4: "The enemies brought a gun to a knife fight",
        5: "They are the domain's weaponmaster"
      },
      specialties: ["Axes", "Chains", "Clubs", "Fencing", "Disarming Blows", "Garrotes", "Improvised Weapons", "Knives", "Stakes", "Swords"],
      examplePools: {
        strength: [
          "Used when attempting to stake someone",
          "Two-handed melee weapons"
        ],
        dexterity: [
          "One-handed weapons"
        ]
      }
    },
    stealth: {
      name: "Stealth",
      description: "Blending into surroundings to either not be seen or not be recognized, allows characters to move around without alerting anyone of their presence either by sight or sound.",
      dotValues: {
        1: "They can hide in darkness or camouflage",
        2: "They can sneak around casual observers and stalk the same",
        3: "They can evade patrolling guards",
        4: "They are subtle with silent movement",
        5: "The Banu Haqim come to them for advise"
      },
      specialties: ["Ambushes", "Crowds", "Diguise", "Hiding", "Shadowing", "Silent Movement", "Urban", "Wilderness"],
      examplePools: {
        dexterity: [
          "Sneaking",
          "Surprise attacks",
          "Break in and feed from the sleeping as a Sandman"
        ],
        stamina: [
          "Remain motionless while in hiding"
        ],
        wits: [
          "Used with Obfuscate powers to hide from active searchers with Sense the Unseen",
          "Shake surveillance"
        ],
        resolve: [
          "Wait in an alleyway to feed off an unsuspecting victim"
        ]
      }
    },
    survival: {
      name: "Survival",
      description: "Using nature to find shelter, tracking animals or people, and general survival in the wilderness.",
      dotValues: {
        1: "They know the trails and wilderness around the domain",
        2: "They spend more time outside than inside",
        3: "They can subsist outside the city, set ups traps, and shelter for themself",
        4: "They can thrive in the outside",
        5: "Gangrel packs run alongside them"
      },
      specialties: ["Desert", "Hunting", "Jungle", "Tracking", "Traps", "Shelters", "Urban Exploration", "Woodlands"],
      examplePools: {
        wits: [
          "Find somewhere to sleep for the night",
          "Used in Fortitude powers such as Defy Bane",
          "Used in Protean powers such as Weight of the Feather",
          "Tracking something or someone"
        ],
        intelligence: [
          "Used in Blood Sorcery Rituals such as Illuminate the Trail of Prey",
          "Camouflage in nature or burying a body outside undetected"
        ],
        stamina: [
          "Used to defend against Thin-blood Alchemy powers such as Envelop"
        ],
        composure: [
          "Remove flammable material from themselves from something like a Molotov cocktail"
        ]
      }
    }
  },
  social: {
    animalKen: {
      name: "Animal Ken",
      description: "Understanding and reading animal behavior to handle them and work with them.",
      dotValues: {
        1: "Animals shy away from them but do not bolt or attack",
        2: "Animals are docile around them, mostly ignoring them until they build trust",
        3: "Animals treat them as if they were their owner, unless provoked",
        4: "Animals are drawn to them, few creatures keep their aggression",
        5: "They can sense the animal's feelings and thoughts"
      },
      specialties: ["Attack Training", "Cats", "Dogs", "Falconry", "Horses", "Pacification", "Rats", "Snakes", "Stunt Training", "Wolves"],
      examplePools: {
        charisma: [
          "Used in Animalism powers such as Bond Famulus to give commands to animals"
        ],
        composure: [
          "To feed from animals through the Farmer Predator type"
        ],
        manipulation: [
          "Distract guard dogs"
        ]
      }
    },
    etiquette: {
      name: "Etiquette",
      description: "The ability to interact in social settings or blend into different groups.",
      dotValues: {
        1: "They can address their ruler without a faux pas",
        2: "They know the rules of the domain's popular hotspots",
        3: "They can impress others with their politeness, humble submission and respect",
        4: "Their behavior sets the trend, especially if they push against the norms",
        5: "The Keeper of Elysium and Harpies use them to set the protocols"
      },
      specialties: ["Anarch", "Camarilla", "Celebrities", "Corporate", "Elysium", "Feudal", "One-Percenter", "Secret Society"],
      examplePools: {
        manipulation: [
          "In a debate",
          "Seeking to increase social position by undermining or gossiping about their rival"
        ],
        composure: [
          "To divert a conversation",
          "Seeking to increase social position against another during Elysium",
          "Getting a prime dance at a formal event"
        ],
        wits: [
          "To resolve initiative order in social conflict"
        ]
      }
    },
    insight: {
      name: "Insight",
      description: "Reading body language and other cues to discern emotions, thoughts, or motives.",
      dotValues: {
        1: "They can see through empty boasts",
        2: "They can pick up on hidden emotions in kine and sometimes Kindred",
        3: "They can provide therapy",
        4: "They are able to detect lies easily, only the best con artists go undetected",
        5: "People are very easy to read, as if books with large printed text"
      },
      specialties: ["Ambitions", "Desires", "Detect Lies", "Emotions", "Empathy", "Interrogation", "Motives", "Phobias", "Vices"],
      examplePools: {
        manipulation: [
          "Change the Resonance of a Herd",
          "Involving third parties to seduce their rivals vanities and desires",
          "Interrogating someone without violence"
        ],
        resolve: [
          "After a scene to determine Resonance if it's not already known"
        ],
        charisma: [
          "Seduce their rivals vanities and desires",
          "Carousing with others to influence them to relax",
          "Picking someone up at a bar"
        ],
        composure: [
          "Avoiding or detecting something fishy going on when someone is risking a Blood Bond",
          "Resisting fast talking"
        ],
        wits: [
          "Detecting a scam"
        ],
        intelligence: [
          "Tailor a speech to the crowd without having time beforehand to prepare"
        ]
      }
    },
    intimidation: {
      name: "Intimidation",
      description: "Using menacing presence or direct force to ensure compliance, submission, or fear from others. As well as using threats to persuade them to back down.",
      dotValues: {
        1: "They can use scathing insults effectively",
        2: "They can push humans around easily",
        3: "Their swagger and harsh behavior has given them a reputation",
        4: "They are beyond only physical threats",
        5: "Other Kindred may step back if they get involved"
      },
      specialties: ["Extortion", "Insults", "Interrogation", "Physical Coercion", "Staredowns", "Veiled Threats"],
      examplePools: {
        charisma: [
          "Cow a gang leader into submission",
          "Staredown a rival gang"
        ],
        manipulation: [
          "Veiled threat",
          "Violent interrogation",
          "Subtle coercion"
        ],
        wits: [
          "Determine if something was a threat"
        ],
        resolve: [
          "To catch someone's eyes to establish eye contact during the use of Dominate"
        ],
        strength: [
          "Using physical strength to showcase power while threatening someone"
        ]
      }
    },
    leadership: {
      name: "Leadership",
      description: "Motivating, inspiring, or commanding the character's followers.",
      dotValues: {
        1: "They have led informal clubs before",
        2: "They can make their voices heard in council and sometimes their superiors listen",
        3: "They can command on a battlefield",
        4: "They can inspire those dying or near death into action",
        5: "Their words fill a Kindred's heart to make it feel alive and beating once again"
      },
      specialties: ["Command", "Inspiration", "Oratory", "Praxis", "Team Dynamics", "War Pack"],
      examplePools: {
        manipulation: [
          "To rally allies in a message"
        ]
      }
    },
    performance: {
      name: "Performance",
      description: "Showcasing the character's art in front of a crowd regardless of size. Singing, acting, and oration are all examples of this.",
      dotValues: {
        1: "They are the life of a party but can't take this act on stage",
        2: "They have performed for others, but reviews are mixed",
        3: "They are an expert student of their craft",
        4: "They can perform their craft to exceptional success, that even the Toreador have interest",
        5: "They can improvise without issue; every night a different audience and a different show"
      },
      specialties: ["Comedy", "Dance", "Drama", "Drums", "Guitar", "Keyboards", "Poetry", "Public Speaking", "Rap", "Singing", "Violin", "Wind Instruments"],
      examplePools: {
        charisma: [
          "How good they look performing to have groupies",
          "Giving a speech",
          "Fight a rap battle with stage presence instead of rhyming",
          "Get someone to cross the line",
          "Dancing"
        ],
        manipulation: [
          "To impersonate someone else",
          "Get someone to cross the line"
        ],
        wits: [
          "A rap battle or a duel of poesy"
        ],
        dexterity: [
          "Dancing"
        ]
      }
    },
    persuasion: {
      name: "Persuasion",
      description: "Convincing or swaying others to do the character's will or at least agree with their stance.",
      dotValues: {
        1: "They can sell to someone who already wants to buy",
        2: "They can get a discount or find an inside path to hot gossip",
        3: "They can find a compromise in a conflict",
        4: "The other side looks at settlement first when they see them in court",
        5: "They very well could be the OG silver-tongued devil"
      },
      specialties: ["Bargaining", "Fast Talk", "Interrogation", "Legal Argument", "Negotiation", "Rhetoric"],
      examplePools: {
        charisma: [
          "In a debate"
        ],
        manipulation: [
          "Which story will the Prince believe?",
          "Take blood by consent, by lying about the real reason via Consensualist",
          "Feed from high or low-class society by isolating and gaslighting them into silence via Scene Queen",
          "Convert onlookers in a mesage"
        ],
        intelligence: [
          "Convince the Prince the other is lying with ample research"
        ]
      }
    },
    streetwise: {
      name: "Streetwise",
      description: "Knowledge of the streets in criminal and urban societies, being able to locate a gang or dealer, knowing which shortcut will be the fastest.",
      dotValues: {
        1: "They know where to score sex or drugs in the domain",
        2: "They know which gangs are operating in the area, they may have their own graffiti tag",
        3: "They can tell the good product from the bad, get ahold of guns, and blend in with street people and gang members",
        4: "They are the person someone is referring to when they say 'I know a guy'",
        5: "They can hire and arrange almost any criminal activity in the city"
      },
      specialties: ["Arms Dealing", "Black Market", "Bribery", "Drugs", "Fence Stolen Goods", "Gangs", "Graffiti", "Personal Rep", "Sex Trade", "Urban Survival"],
      examplePools: {
        charisma: [
          "To learn more about a new gang in town"
        ],
        manipulation: [
          "A test to determine if they have access to something",
          "Locate someone"
        ],
        wits: [
          "Find a criminal victim to feed upon via Alleycat",
          "Disguising marks as normal graffiti",
          "Shake someone shadowing"
        ],
        intelligence: [
          "Acquire preserved blood instead of hunting, or feed from the dying or dead via Bagger",
          "To spot, recognize or decipher street tags"
        ],
        resolve: [
          "For looking for something or someone through legwork",
          "Scrounge for a specific designer drug",
          "Resisting being shadowed by usual precautions"
        ]
      }
    },
    subterfuge: {
      name: "Subterfuge",
      description: "Deceiving others to complete the character's desires or agree with them or manipulating the truth to further their goals.",
      dotValues: {
        1: "They tell believable and simple lies",
        2: "They can hustle naive people into giving up their things",
        3: "They can tell lies that should be uncovered to bolster their later and bigger lies",
        4: "They can operate well in deep cover",
        5: "They do not believe this person is a liar at all"
      },
      specialties: ["Bluff", "Feign Mortality", "Impeccable Lies", "Innocence", "The Long Con", "Seduction", "Coverups"],
      examplePools: {
        dexterity: [
          "Distract someone to not notice a knife"
        ],
        composure: [
          "Used to resist powers in Animalism such as Sense the Beast",
          "Used to resist powers in Auspex such as Scry the Soul",
          "Faking a direct sip during a Blood Bond"
        ],
        wits: [
          "Used to resist powers in Auspex such as Telepathy",
          "Used to resist powers in Blood Sorcery such as Extinguish Vitae",
          "Picking up someone at a coffee shop"
        ],
        charisma: [
          "Convince another into a Blood Bond",
          "Feeding from the guise of sex",
          "Fast talking"
        ],
        manipulation: [
          "Feeding from their mortal friends and family via Cleaver",
          "Feeding from their fans, church, or another adoring crowd via Osiris",
          "Sending a false message through markings",
          "Social engineering by tricking someone to give you their password",
          "Scamming someone and showing fake credentials"
        ]
      }
    }
  },
  mental: {
    academics: {
      name: "Academics",
      description: "Topics surrounding the humanities and liberal arts.",
      dotValues: {
        1: "Basic primary and secondary educations",
        2: "Basic university education or training, equal to a four-year degree",
        3: "Advanced university education or training, equal to an excellent four-year degree or doctorate",
        4: "Advanced specializations outside of university on subjects very few know",
        5: "A refined and high level scholar likely to be requested for advice or teaching"
      },
      specialties: ["Architecture", "English Literature", "History of art", "History (specific field or period)", "Journalism", "Philosophy", "Research", "Teaching", "Theology"],
      examplePools: {
        charisma: [
          "Convince the police that they need to release the Kindred before sunrise"
        ],
        intelligence: [
          "Playing chess, either the board game or with living pawns",
          "Hide a building to make it look like another through architecture or creating false comparments"
        ],
        manipulation: [
          "Playing chess not to win, but to show they are ruthless"
        ]
      }
    },
    awareness: {
      name: "Awareness",
      description: "Vigilant to their surroundings and the ability to understand/react to threats.",
      dotValues: {
        1: "They can tell when something is out of place",
        2: "They can spot strange or pattern behavior in someone",
        3: "They can see through most disguises and pick up on hidden things",
        4: "Few things escape their notice even when distracted",
        5: "They have senses like that of a wild animal"
      },
      specialties: ["Ambushes", "Camouflage", "Concealed Objects", "Hearing", "Instincts", "Smell", "Sight", "Traps", "Wilderness"],
      examplePools: {
        resolve: [
          "Used for the Ventrue Bane to determine if a mortal has the blood they required",
          "Used for the Bloodhound Merit to determine someone's Resonance",
          "Vampires who have waited enough time in Torpor, make this roll when a potential victim enters the room"
        ],
        wits: [
          "Resistance roll against those actively hiding",
          "Avoiding the gaze of someone attempting to use Dominate",
          "If a vampire using Obfuscate draws attention to themself on accident, those nearby roll to detect them",
          "Resisting surprise attacks"
        ],
        composure: [
          "Initiative rating for physical combat"
        ],
        intelligence: [
          "Used by SI who are attempting to detect vampires through chaoscopes"
        ]
      }
    },
    finance: {
      name: "Finance",
      description: "Knowing how to move and make money legally or not, being able to handle finances and their taxes.",
      dotValues: {
        1: "They can run a business and keep the books",
        2: "They are able to run a corporate division or bank branch",
        3: "They can be a good broker on the foreign exchange market",
        4: "Investments banks follow what they do and they have no issue concealing fraud",
        5: "They can make money doing anything anywhere"
      },
      specialties: ["Appraisal", "Banking", "Black Markets", "Corporate Finance", "Currency Manipulation", "Forensic Accounting", "Money Laundering", "Stock Market"],
      examplePools: {
        manipulation: [
          "Convince the clerk that they are an IRS auditor"
        ]
      }
    },
    investigation: {
      name: "Investigation",
      description: "Being able to find and follow clues, decipher their meaning and solve a mystery.",
      dotValues: {
        1: "An amateur sleuth",
        2: "Strong knowledge on criminology and signature acts of local issues",
        3: "They either are or could be a professional detective",
        4: "The Sheriff reaches out when they need aid",
        5: "They live an enigmatic existence and set riddles for others"
      },
      specialties: ["Criminology", "Deduction", "Forensics", "Missing Persons", "Murder", "Paranormal Mysteries", "Traffic Analysis"],
      examplePools: {
        resolve: [
          "Canvassing the neighborhood for information",
          "Going through a heavy amount of paperwork"
        ],
        intelligence: [
          "Check a crime scene for clues or pick up clues",
          "Noticing patterns in markings"
        ]
      }
    },
    medicine: {
      name: "Medicine",
      description: "Handling mortal injuries and diagnosing/treating diseases.",
      dotValues: {
        1: "They know basic anatomy and can perform basic first aid and CPR",
        2: "They can treat minor trauma and illnesses",
        3: "They can perform major operations and treat serious injuries",
        4: "They can diagnose and treat all but the most obscure diseases and illnesses",
        5: "They are a medical expert, sought out for their knowledge by Kindred and mortals alike"
      },
      specialties: ["First Aid", "Hematology", "Pathology", "Pharmacy", "Phlebotomy", "Surgery", "Trauma Care", "Veterinary", "Anesthetics"],
      examplePools: {
        intelligence: [
          "Used to convert Aggravated damage on a Mortal's Health tracker to Superficial damage",
          "Spotting a disease symptom on a human"
        ],
        dexterity: [
          "Remove a shattered stake splinter from the body per Shaft of Belated Dissolution"
        ]
      }
    },
    occult: {
      name: "Occult",
      description: "Mystical knowledge of the supernatural and rituals, Kindred related or not.",
      dotValues: {
        1: "They know the stories of Caine and the Antediluvians",
        2: "They can find the truth in pop culture nonsense",
        3: "They have experience with something unknown even by Kindred standards",
        4: "They can name most of the Antediluvians",
        5: "Tremere and Banu Haqim consult with them for rare lore"
      },
      specialties: ["Alchemy", "Blood Magic", "Faeries", "Ghosts", "Grimoires", "Infernalism", "Magi", "Necromancy", "Noddism", "Parapsychology", "Voudun", "Werewolves", "Specific Tradition"],
      examplePools: {
        intelligence: [
          "Reading a different language version of the Book of Nod without losing anything"
        ]
      }
    },
    politics: {
      name: "Politics",
      description: "Knowing the inner workings of the government, mortal or not.",
      dotValues: {
        1: "They know mortal politics in their area",
        2: "They have the ability to apply influence at a local scale, or know a guy who could",
        3: "They can run a political campaign or machines",
        4: "They know the truth about the big names living and dead in the area",
        5: "They could guess at the amount of members within the Camarilla's Inner Circle"
      },
      specialties: ["Anarchs", "Camarilla", "City Government", "Clan (specific)", "Diplomacy", "Media", "National Politics", "State/Provincial Politics"],
      examplePools: {
        manipulation: [
          "Have their agents pull strings behind closed doors",
          "Convince the city to use a design that fits their plans"
        ]
      }
    },
    science: {
      name: "Science",
      description: "Scientific knowledge and theory of the real world.",
      dotValues: {
        1: "They understand the basics principles of science",
        2: "They can accurately explain the competing science-based theories of the Embrace to another",
        3: "They can run a lab, interpret results, and get up to speed on most science related fields. They can also repair scientific equipment",
        4: "They are an expert in their field",
        5: "Few others match their understanding and they are sought out for guidance"
      },
      specialties: ["Astronomy", "Biology", "Chemistry", "Demolitions", "Engineering", "Genetics", "Geology", "Mathematics", "Physics"],
      examplePools: {
        resolve: [
          "Example of a scrounging roll"
        ],
        intelligence: [
          "Creating explosives",
          "Controlled demolitions"
        ]
      }
    },
    technology: {
      name: "Technology",
      description: "Internet and computer comprehension, hacking and breaking into secure information through the use of technology.",
      dotValues: {
        1: "They can upgrade a home PC and keep it safe",
        2: "They can conceal an IP, fly a drone, and use photo altering software",
        3: "They can create and distribute viruses without detection",
        4: "The Prince might call them to handle the domain's cybersecurity",
        5: "On the internet, no one knows they exist"
      },
      specialties: ["Artillery", "Coding", "Computer Building", "Data Mining", "Hacking", "Networks", "Phones", "Surveillance Systems"],
      examplePools: {
        intelligence: [
          "Hacking into a computer system",
          "Building clock part or colored wire bombs",
          "Setting a car bomb",
          "Penetrate electronic security systems"
        ]
      }
    }
  }
}; 
const attributes = {
  overview: {
    description: "Attributes represent the characters innate abilities, with 1 being relatively bad, 2 being average and up to 5 which represents peak ability. The Attributes are divided into three separate categories; Physical, Social and Mental.",
    distribution: "When building the sheet; the player will place one attribute at 1 dot, four attributes at 2 dots, three attributes at 3 dots, and one final attribute at 4 dots with this being the vampire's best trait."
  },
  physical: {
    description: "The Physical Attributes measure the general Strength, Dexterity, and Stamina of a character. These Attributes represent the mortal prowess of a vampire's body. Though through the use of certain Disciplines, vampires often exceed the abilities of an otherwise frail-looking physique.",
    attributes: {
      strength: {
        name: "Strength",
        description: "How strong the character is, how much they can lift, and how much force they can exert.",
        dotValues: {
          1: "They can easily crush a beer can. (Deadlift 20kg)",
          2: "They are average physically. (Deadlift 45kg)",
          3: "They might be able to break down a wooden door. (Deadlift 115kg)",
          4: "A prime physical specimen. (Deadlift 180kg)",
          5: "Break open a metal door or tear open a chain-link fence. (Deadlift 250kg)"
        },
        examplePools: {
          strength: "To lift a heavy beam",
          brawl: "Conflict pool for fighting or grappling",
          melee: "Using a knife or other weapon such as a stake",
          athletics: ["Fleeing to break conflict", "Throwing heavy things"],
          stamina: "Used by mortals to survive blood loss after a harmful drink",
          resolve: "A roll made during Diablerie",
          bloodSorcery: "Used by Blood Sorcerers who use powers like Scorpion's Touch or Baal's Caress",
          alchemy: "Used by alchemists who use powers such as Airborne Momentum",
          firearms: "For a firearm user who is engaging in close combat",
          intimidation: "Using physical strength to intimidate someone such as crunching a trashcan while staring them down",
          larceny: "To break a lock cleanly"
        }
      },
      dexterity: {
        name: "Dexterity",
        description: "How agile a character is, how graceful they can be, or how nimble those fingers are.",
        dotValues: {
          1: "They can run but struggle with balance and dodging",
          2: "A solid sprint and sometimes can appear graceful",
          3: "Impressive agility and their coordination is equal to a trained amateur",
          4: "They move in a way few humans can and could excel at acrobatics",
          5: "Almost superhuman movements that are liquid and hypnotic"
        },
        examplePools: {
          stealth: "Sneaking up on another person",
          athletics: ["Common defense pool often for dodging, throwing", "Climbing", "This roll also helps determine how much falling damage a character might take"],
          etiquette: "Pretend to eat and behave flawlessly at the governor's formal dinner",
          larceny: ["Distract someone with one hand and hide a knife with the other", "Breaking into a safe"],
          charisma: "Faking sex per Humanity rules",
          medicine: "Remove a shattered stake splinter from the body per Shaft of Belated Dissolution",
          melee: "One handed melee weapons",
          firearms: "Quick drawing a gun during a cowboy showdown",
          performance: "Dancing",
          drive: "High speed, complex, or evading traffic when driving"
        }
      },
      stamina: {
        name: "Stamina",
        description: "The character's physical resistance, how long they can persevere through hazards and other strenuous activities, or how much damage they can absorb.",
        dotValues: {
          1: "They are winded by lesser exertions",
          2: "They can take a beating, but consider suing for peace",
          3: "They can hike for several days with a backpack without an issue",
          4: "They could win a marathon, or take a tremendous amount of physical pain",
          5: "They'd never break a sweat, if they were mortal"
        },
        examplePools: {
          stealth: "Remain motionless in bushes waiting with each success allowing them to maintain this for one hour",
          athletics: ["Outrun pursuers", "Long distance swimming"],
          strength: "Used by mortals to survive blood loss after a harmful drink",
          composure: [
            "Consume food or drink for up to an hour and then make it outside or to a bathroom in time",
            "Resist pool for powers such as Extinguish Vitae",
            "Concealing non-Duskborn from XScopes while using Blush of Life"
          ],
          occult: "Used to resist many powers in Blood Sorcery such as Scorpion's Touch",
          fortitude: "Used to resist many powers in Blood Sorcery such as Scorpion's Touch",
          resolve: [
            "To keep moving after an hour of extreme cold (-30°C or below)",
            "Resistant rolls for powers such as Quell the Beast",
            "Also used to touch warded objects when affected",
            "Part of the process for Profane Hieros Gamos"
          ],
          animalism: "To imbue an animal with a power such as Enduring Beasts",
          alchemy: "The distillation roll of Athanor Corporis",
          survival: "Resistance roll such as with Envelop"
        }
      }
    }
  },
  social: {
    description: "The Social Attributes reflect how easily the character can communicate with vampires and mortals alike to achieve their goals. Through deception or charisma, some battles are easier won through words than combat. These attributes reflect that by determining how their interactions are shaped through their ability to charm, persuade and motivate others to help them; though it is not always as wholesome as it may seem.",
    attributes: {
      charisma: {
        name: "Charisma",
        description: "Determines the character's natural appeal, charm and grace. With this attribute they'll be able to draw people into them although do not mistake this for good looks, that is a merit all on it's own.",
        dotValues: {
          1: "They speak clearly but few people tend to listen",
          2: "Generally likeable even if they are undead and may even have friends",
          3: "People trust them and they make friends easily",
          4: "They possess significant personal magnetism and have an easy time drawing in followers",
          5: "They could lead a city in a rebellion if they wanted to"
        },
        examplePools: {
          dexterity: "Faking sex per Humanity rules",
          animalKen: "Used with Animalism powers such as Bond Famulus",
          dominate: "Used with Dominate powers such as Cloud Memory",
          presence: "Used with Presence powers such as Dread Gaze",
          performance: ["Giving a speech to a council", "Or have a rap battle using stage presence instead of rhyming"],
          subterfuge: [
            "Attempting to convince others into Blood Bonds",
            "Feeding as a Siren",
            "Used for fast-talking and conning others"
          ],
          insight: ["Play into their rivals desires", "Used for carousing to influence others"]
        }
      },
      manipulation: {
        name: "Manipulation",
        description: "Showcases how skilled the character is at being an effective liar, their ability to twist others to a winning point of view, and how deceptive they are.",
        dotValues: {
          1: "They can convince people to do what they want as long as they remain honest",
          2: "Able to decieve the weak willed and simple minded",
          3: "They never have to pay full price for anything",
          4: "They could be a cult leader or a politician",
          5: "They could convince the Prince to invest in desert property"
        },
        examplePools: {
          etiquette: ["Used in a debate", "Gossip and undermine a rival rather than engaging them in public display"],
          intimidation: ["To give veiled threats", "Violent interrogation", "Subtle coercion that uses a percieved threat"],
          animalKen: "Distract an animal",
          finance: "Convince the the clerk they are a IRS auditor",
          persuasion: [
            "Whose story will the Prince believe?",
            "Convince someone the other person is lying",
            "Taking blood through consent, under the guise of medical work or kink",
            "Feeding from a subculture they have high status in"
          ],
          insight: "Change the Resonance of a victim once a month",
          animalism: "Used in Animalism powers such as Feral Whispers",
          performance: [
            "Used to impersonate the victim's manners in Possession",
            "Or with Obfuscate Imposter's Guide"
          ],
          dominate: "Used in Dominate powers such as Mesmerize",
          potence: "Used in Potence powers such as Spark of Rage",
          presence: "Used in Presence powers such as Awe",
          alchemy: "Used in the distillation method Calcinatio",
          politics: "Convince the city that other designs fit their plans",
          academics: "Don't play chess to win; play to convince the Ventrue that their ruthless enough for a promotion",
          subterfuge: [
            "Taking blood covertly from their mortal friends and family",
            "Feed from their fans or an adoring crowd",
            "Conning someone or impersonating an official"
          ],
          athletics: "Picking someone up at a gym"
        }
      },
      composure: {
        name: "Composure",
        description: "Reflects how well the character can maintain and command their own emotions. As well as how easily they can calm nerves and the anxieties of others. It also represents their ability to stay calm-headed in heated situations such as verbal fights and even firefights.",
        dotValues: {
          1: "The slightest provocations can send them into a rage",
          2: "They can subdue their predatory nature in most non-hostile enviroments",
          3: "Others look to them for guidance when blood hits the fan",
          4: "They can manage their Beast to some extent and bluff their way through cards with ease",
          5: "The Beast is their pet"
        },
        examplePools: {
          etiquette: [
            "To divert discussion and break off conflict",
            "Increase their social positions at Elysium while dealing with a rival",
            "Finding the perfect dance at a ball"
          ],
          stamina: [
            "To consume food or drink without Blush of Life and keep it down for one hour",
            "The resistance pool for Blood Sorcery powers such as Extinguish Vitae",
            "A non-Duskborn concealing themselves with Blush of Life active against an XScope"
          ],
          subterfuge: [
            "The resistance pool for Animalism powers such as Sense the Beast",
            "Resistance pool for Auspex powers such as Scry the Soul",
            "Fake a direct sip during a potential Blood Bond"
          ],
          resolve: [
            "Used to resist many Disciplines",
            "The resistance pool for Animalism powers such as Drawing out the Beast",
            "The resistance pool for Presence powers such as Dread Gaze",
            "Resisting violent interrogation",
            "Resisting subtle intimidation and physical intimidation"
          ],
          intelligence: [
            "The resistance pool for Dominate powers such as Dementation",
            "The resistance pool for Potence powers such as Spark of Rage",
            "The resistance pool for Presence powers such as Awe"
          ],
          wits: [
            "The resistance pool for Presence powers such as Entrancement",
            "Resisting peaceful interrogation"
          ],
          occult: [
            "The resistance pool for Blood Sorcery powers such as Cauldron of Blood",
            "The resistance pool for Blood Sorcery powers such as Truth of Blood"
          ],
          larceny: "Extracting a relic from a laser field",
          firearms: "Standard guns blazing firefight",
          animalKen: "Find and catch an animal to feed from",
          insight: [
            "Avoid the Blood Bond by being careful",
            "Detecting if someone is attempting to fast talk you"
          ],
          survival: "Remove the flaming materials from a molotov cocktail"
        }
      }
    }
  },
  mental: {
    description: "The Mental Attributes represent the character's natural intuition, the ability to learn quickly and react quickly with thoughts rather than their bodies. It also represents their determination and dedication to accomplishing something.",
    attributes: {
      intelligence: {
        name: "Intelligence",
        description: "Represents the character's ability to gather knowledge through research or reason as well as apply logic to an ongoing problem. They have an easier time recalling information they have gathered before and can analyze information from the world around them or the books they've read.",
        dotValues: {
          1: "They can read and write, but some terms confuse them",
          2: "They are smart enough to realize their own limitations",
          3: "They are able to piece together clues without difficulty",
          4: "Likely to be consulted by members of the Tremere for their intelligence",
          5: "A genius"
        },
        examplePools: {
          medicine: [
            "Convert Aggravated damage to Superficial damage for mortals",
            "Spotting a disease in a human"
          ],
          larceny: [
            "Gather information about an alarm system",
            "Getting past a roof alarm",
            "Blowing a safe or breaching wall"
          ],
          occult: [
            "Reading a book that requires translation in the process",
            "Impress a Tremere with their knowledge"
          ],
          linguistics: "Decipher a papyrus",
          investigation: "Check a crime scene for clues",
          resolve: [
            "To resist Blood Bonds",
            "Used to resist Dominate powers such as Cloud Memory",
            "Used to resist Potence powers such as Spark of Rage"
          ],
          auspex: "Used for many Auspex powers such as Spirit's Touch and Scry the Soul",
          composure: [
            "Used to resist Dominate powers such as Dementation",
            "Used to resist Presence powers such as Awe"
          ],
          obfuscate: "Used to activate some Obfuscate powers such as Conceal",
          bloodSorcery: [
            "Used to activate Blood Sorcery such as Extinguish Vitae",
            "Also used to activate Blood Sorcery Rituals"
          ],
          survival: [
            "Following tracks",
            "Burying a body outside undetected"
          ],
          alchemy: "Used for the Fixatio method",
          craft: [
            "Win an architectural contest",
            "Putting up Kindred Iconography posters, paintings or graffiti",
            "Building false compartments or secret chambers"
          ],
          academics: [
            "Playing chess",
            "Building false compartments or secret chambers and relying on a team"
          ],
          persuasion: "Convince the Prince that their opponent is lying through research instead of smooth talking",
          streetwise: [
            "Acquiring bloodbags through the Bagger Predator Type",
            "Spotting or otherwise understanding Kindred Iconography",
            "Urban camouflage"
          ],
          awareness: "For hunters to spot vampires reliably with a chaoscope",
          technology: [
            "Hacking into a computer system",
            "Used for old school wire and clock parts bombs",
            "Setting a car bomb"
          ],
          science: "Building explosive",
          firearms: "Preparedness roll of having bought a silencer",
          insight: "Prepare an oration for a crowd"
        }
      },
      wits: {
        name: "Wits",
        description: "Reflects the character's ability to think quickly on their feet and make decisions based on the information around them or from prior knowledge. Wits allow the character to pick up sounds and smells around them, perhaps preventing a possible ambush from happening without warning. It is also representative of a character's street smarts and know what to say in the heat of the moment. Rather than mulling on it the next night and realizing they had the perfect comeback to that snobby harpy the entire time.",
        dotValues: {
          1: "They get to the point eventually, but need to be explained to",
          2: "They can usually bet the odds in a game of poker or activate emergency breaks on time",
          3: "They can analyze a situation quickly and get out of the situation with the best route",
          4: "They are never caught on the back foot and find a comeback quickly",
          5: "They think and respond faster than most people can understand"
        }
      },
      resolve: {
        name: "Resolve",
        description: "Measures the raw determination of a character and how strong their focus truly is. This Attribute powers the all-night stakeouts. Allowing the character to create a mental block from any distractions, showcasing their mental fortitude and concentration.",
        dotValues: {
          1: "They have minimal attention for anything that isn't pressing",
          2: "They can settle in for the short long haul",
          3: "Distracting them takes longer than most people are willing to attempt",
          4: "They can brute force a way to an answer",
          5: "They can think in a gunfight or watch the door and clean up whatever mess follows impeccably"
        },
        examplePools: {
          composure: "Used to resist many Disciplines"
        }
      }
    }
  },
  derivedTraits: {
    health: {
      description: "A character's health is derived from their Stamina + 3",
      damageTypes: {
        superficial: {
          description: "Superficial damage is bruising and small cuts, but nothing that is life-threatening. Kicking, punching, and any non-lethal weapon do Superficial damage to humans. Standard weapons do Superficial damage to vampires, this includes slashing, stabbing, and piercing weapons. In general, this type of damage is halved before adding it to the tracker and this includes when converting Superficial to Aggravated.",
          healing: {
            mortal: "Mortals may remove a number of Superficial damage equal to their Stamina rating at the beginning of a session",
            kindred: "When healing Superficial damage Kindred can remove a number of Superficial damage levels from their Health tracker by making one Rouse Check per turn, with the number removed dependent on their Blood Potency"
          }
        },
        aggravated: {
          description: "Aggravated damage is broken bones, serious wounds, and other life-threatening injuries. Sharp and piercing weapons do Aggravated damage to humans. Generally, only fire, sunlight and the claws or teeth of other supernatural creatures do Aggravated damage to Kindred.",
          healing: {
            mortal: "With Aggravated damage mortals can have their damage converted from Aggravated to Superficial with an Intelligence + Medicine test. The maximum amount able to be converted is equal to half of the character's Medicine rating rounded up with the healing happening over the course of the night. A mortal being hospitalized removes the need for rolls but takes the amount of Aggravated damage received as the total number of weeks required to heal fully",
            kindred: "With Aggravated damage, Kindred may mend one level of Aggravated damage by making three Rouse Checks at the beginning of a session in addition to the wake-up Rouse Check. This will only heal one point of damage and will remove any Crippling Injury or similar impairments, this can only be done once per night"
          }
        }
      }
    },
    willpower: {
      description: "Willpower is determined by the value of Composure + Resolve",
      spending: {
        description: "Players may spend their character's Willpower in a variety of ways and when doing so, must mark the tracker with one Superficial damage. Should the character hit Willpower 0, they are left Impaired and receives a -2 dice penalty for Social and Mental tests.",
        uses: [
          "They may use Willpower to reroll up to three dice (the dice cannot be Hunger dice) in any pool, except when the rules specifically exclude Willpower such as tracker rolls (Remorse tests, Frenzy tests), or One-Roll Conflict), etc",
          "Willpower may be spent to take control of their character for one turn during a frenzy or when under the influence of certain Disciplines",
          "To perform minor movements, such as movement of a finger while staked",
          "To ignore Health damage penalties, including Impairment, for one turn"
        ]
      },
      recovery: {
        superficial: [
          "Characters may recover their Superficial Willpower damage at the beginning of a session equal to either their Composure or Resolve (whichever is highest between the two). Unless, the session ends on a cliffhanger where the dwindling supply of Willpower provides a strong dramatic tension",
          "At the Storyteller's discretion, once per session, a character who acts to fulfill their desire may immediately recover 1 point of damage",
          "At the Storyteller's discretion, a character who plays out a messy critical, bestial failure, frenzy, or Compulsion in a dramatic way can recover one or more Superficial Willpower damage"
        ],
        aggravated: [
          "At the Storyteller's discretion, a character can recover one or more points of Aggravated Willpower damage when they have acted to significantly benefit a Touchstone, or by following a Conviction to their determent",
          "Characters can heal 1 point of Aggravated damage at the end of a session when the character has worked towards their Ambition"
        ]
      }
    }
  }
};
window.attributes = attributes; 
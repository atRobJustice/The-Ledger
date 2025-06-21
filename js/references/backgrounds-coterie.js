const coterieBackgrounds = {
  name: "Coterie Backgrounds",
  description: "Coteries can purchase certain backgrounds and flaws in common using their pool just as they would during standard character creation. Remember to record major figures on the Relationship Map, just as is done with individual backgrounds. Each member of the coterie can use these backgrounds as if they were their own, however, the backgrounds belong to the coterie and not the individual. Should a character leave the coterie either through mutual splitting up or through ejection in some form, they cannot take backgrounds with them. It is also important to note that Backgrounds do not multiply, a two-dot coterie herd is still the same as an individual's two-dot herd. Regardless of whether being within a coterie's background or not, all backgrounds are subject to in-game risks which means that putting all of it in one place can run a risk should an enemy decide to take action against the characters.",
  source: ["Vampire: The Masquerade Corebook"],
  sourcePage: 196,
  setup: {
    description: "When players are creating characters for a chronicle it is strongly recommended that they work together. During this collaborative process they do have the option of forming a coterie, also known as a Kindred team or group. A coterie aids both the players and the Storyteller as it allows collective buy-ins to the chronicle and help indicate what aspects in the World of Darkness that the players are interested in pursuing.",
    poolRules: {
      standard: "A standard coterie pool begins with one free dot per player character, lending to a small coterie pool to begin with which works well with young hungry Kindred.",
      optional: "There exists an optional rule, however, that allows the use of Coterie Bonuses or just an increase to the starting free coterie pool by two or three dots. This rule is useful for older legacy coteries or for those simply wishing to play with more starting dots.",
      smallGroup: "A group with three or fewer players may be allowed to begin with two free dots per character as determined by their Storyteller.",
      contributions: "Players may contribute their character's advantage dots to the coterie's pool. The pool is spent collectively, however, in some groups the players may choose to control how their contributions are spent.",
      flaws: "It is also possible to purchase coterie flaws in order to obtain more dots for the coterie during creation. Every player must agree to the flaw in order for it to be taken."
    }
  },
  domain: {
    description: "Domain is a core aspect of a coterie as it represents the physical area in which the coterie can hunt. Within the Camarilla it is viewed as a feudal fief and to the Anarchs it is their 'turf'. Each dot of Domain cost one dot from the coterie's pool, these traits cover a lot of ground so use them as abstractions rather than constraints.",
    withoutDomain: "Without any domain, coteries may hunt by either poaching in another's territory at their own risk or through a letter from the Prince or another high official granting them temporary passage and the right to hunt.",
    traits: {
      chasse: {
        description: "A trait that describes how valuable the area is for hunting, be it through vulnerable mortals or the richness of their blood. One dot of this provides hunting grounds inside their domain at a hunting difficulty of 6, with each additional dot lowering this by one. This trait also refers to the size of the domain, with • being one city block and ••••• being three neighborhoods with a large group of features such as all the parks, all the hospitals, or all the convenience stores.",
        merits: {
          builtInFlock: {
            name: "Built-in Flock",
            dots: 1,
            description: "They can feed once per week at a set establishment with the hunting Difficulty lowered by 1."
          },
          mithraeum: {
            name: "Mithraeum",
            dots: 2,
            description: "Provides them with two dots of Haven Merits they can swap for other Haven merits at the start of each story."
          },
          disputedDomain: {
            name: "Disputed Domain",
            dots: 2,
            description: "They are overlapping with a rival's territory and when encountering the opposing groups' member test for fury frenzy."
          }
        },
        locationMerits: {
          apartmentTowers: {
            name: "Apartment Towers",
            dots: 2,
            resonances: ["All"],
            description: "Extortionist Predator Type vampires receives one bonus die on their hunts in the domain. Subtract one die from the domain's Portillion pools."
          },
          backAlleys: {
            name: "Back Alleys",
            dots: 2,
            resonances: ["Phlegmatic"],
            description: "Alley Cat or Montero Predator Type vampires receive one bonus die on their hunts in the domain. Add one die to an Animalism pool using rats to spy on the character's domain."
          },
          funerary: {
            name: "Funerary",
            dots: 1,
            resonances: ["None/Melancholy"],
            description: "Bagger or Graverobber Predator Type vampires receive one bonus die on their hunts in the domain. Due to high-clan snobs seeing feeding in this method as less than worthy of respect, the coterie loses one die from Social pools when in a contest against them."
          },
          gatedCommunity: {
            name: "Gated Community",
            dots: 2,
            resonances: ["Melancholy"],
            description: "The base Difficulty for Larceny tests and related tests is equivalent to the Resource dots of the average resident. Sandman Predator Type vampires receive one bonus die on their hunts in the domain. The mortals within this area tend to be educated professionals or otherwise making them good sources for Allies, Contacts, or, Retainers but on the flip side can cause problems if they spot a vampire hunting. Storytellers may deny this Merit in the coterie is located in the heart of a city."
          },
          hospital: {
            name: "Hospital",
            dots: 2,
            resonances: ["Melancholy/Phlegmatic"],
            description: "Bagger, Consensualist, Grim Reaper or Trapdoor Predator Type vampires receive one bonus die on their hunts in the domain, as do the pools to obtain bagged blood or medical supplies. Hunter groups receive an extra die to their pools to infiltrate the domain."
          },
          nightlife: {
            name: "Nightlife",
            dots: 3,
            resonances: ["Choleric/Sanguine"],
            description: "Montero, Pursuer, Scene Queen, Siren or Trapdoor Predator Type vampires receive one bonus die on their hunts in the domain. Other Kindred may be willing to pay boons to feed in this territory. Any 1 on hunting pool roll means the target has tainted blood. Due to extra leverage for both organized crime and the city government add one dot to those Influence groups here for both the coterie and foes. Storytellers may deny this Merit to a coterie in the outskirts."
          },
          shelter: {
            name: "Shelter",
            dots: 2,
            resonances: ["Choleric/Melancholy"],
            description: "Alley Cat or Sandman Predator Type vampires receive one bonus die on their hunts in the domain. Any 1 on hunting pool roll means the target has tainted blood. The mortals within this area tend to know about streetlife making them a good source for Allies, Contacts, or, Retainers. Storytellers may deny this Merit to a coterie within a prestigious area of the city."
          }
        }
      },
      lien: {
        description: "Another trait dictates how well the coterie has integrated into the domain. Each dot of this adds one die to their pools on attempts to interact peacefully with locals, locate something, gather the word on the street, or investigate all within the area of the domain. Lien does not modify the coterie hunting rolls.",
        merits: {
          communityOutreach: {
            name: "Community Outreach",
            dots: 1,
            description: "Adds one bonus die to all Manipulation and Subterfuge rolls when dealing with mortals in the domain."
          },
          visibility: {
            name: "Visibility",
            dots: 2,
            description: "Turns all failed hunting tests into total failures and any rolls to conceal the coterie's activities within the domain has its Difficulty increased by 2."
          }
        },
        locationMerits: {
          campus: {
            name: "Campus",
            dots: 3,
            resonances: ["Choleric/Melancholy"],
            description: "Either with a break-in or a Mask that gives proper access, the coterie can use the the faculty as if it was a two-dot library. Hunter groups with religious or academic backgrounds gain a bonus die to infiltrate the domain."
          },
          cityHall: {
            name: "City Hall",
            dots: 3,
            resonances: ["Phlegmatic"],
            description: "The dots of this Merit can be used in political or urban Projects. The coterie has access to one dot in Mask due to record access. Foes with Influence add one die to pools when infiltrating the domain. Storytellers may deny this Merit to coteries located outside of the heart of the city."
          },
          culturalLandmark: {
            name: "Cultural Landmark",
            dots: 2,
            resonances: ["Choleric/Sanguine"],
            description: "During event hours the Portillon lowers by one dot. Farmer Predator Type vampires gain one bonus die on hunting pools within the area. Coterie members can leverage their access to this area to gain one bonus die in Social tests. If Elysium is held here regularly then the Merit costs an extra dot but will give a two-dice bonus on Etiquette rolls with other Kindred of the same sect and any test to pick up on Kindred gossip. Storytellers may deny this Merit to a coterie located on the outskirts."
          },
          marketplace: {
            name: "Marketplace",
            dots: 2,
            resonances: ["Melancholy/Sanguine"],
            description: "The dots of this Merit can be used in economic Projects. Add two dice to Social or Finance pools as long as it is appropriately related to the location. Lost two dice from any Stealth or similar pools against hunters or Kindred foes who have police connections."
          },
          membersOnly: {
            name: "Members Only",
            dots: 2,
            resonances: ["Sanguine"],
            description: "Any haven within this area gains one for of either Luxury or Watchmen. Foes can be able to obtain membership or an invitation to enter your haven without problem."
          },
          transitions: {
            name: "Transitions",
            dots: 2,
            resonances: ["Melancholy"],
            description: "Gain a one dot herd with Melancholy Resonance. Hunter groups with religious or medical backgrounds gain one extra die to pools for infiltrating the domain. Storytellers may deny this Merit to a coterie within a prestigious area of the city."
          }
        }
      },
      portillon: {
        description: "The last trait describes how secure the domain is against unwelcome intrusions or disruptions be it other vampires, mortals, or the Second Inquisition. This trait rarely adds to character pools, instead acting as resistance against these forces. A critical success by an intruder may lower the portillon of the domain against that specific group, at least until the coterie deals with them. The portillon does not apply to Havens inside or outside the domain.",
        merits: {
          networked: {
            name: "Networked",
            dots: 1,
            description: "Allows the characters once per story to use the security cameras around the temple to look at footage or ask the patrol of the temple to expand their route for a few nights."
          },
          sharedVulnerabilities: {
            name: "Shared Vulnerabilities",
            dots: 1,
            description: "Regardless of the coterie's precautions the cult's security is lax and enemies who take advantage of this fact can ignore the Portillon rating as long as they breach the cult's security first."
          }
        },
        locationMerits: {
          abandonedBuilding: {
            name: "Abandoned Building",
            dots: 1,
            resonances: ["Melancholy"],
            description: "Any haven the coterie has within the area gains one dot in the Cell and Postern Merits, however they always have the Creepy Flaw. There is a chance the location get demolished unless the coterie uses their Influence to stop it."
          },
          firehouse: {
            name: "Firehouse",
            dots: 3,
            resonances: ["Choleric/Melancholy"],
            description: "Any attempt to burn the coterie out of a haven or destroy their territory has limited success unless the Firehouse is neutralized."
          },
          policeStation: {
            name: "Police Station",
            dots: 2,
            resonances: ["Phlegmatic/Sanguine"],
            description: "The coterie is given a low-level clerical or IT contact in the precinct, who can add two dice to pools to attempt to trace down infiltrators within the domain. If the police or those operating through them move against the coterie, subtract two dots from both the domain's Portillon and their Haven Merit when resisting."
          },
          prison: {
            name: "Prison",
            dots: 2,
            resonances: ["Choleric/Melancholy"],
            description: "Add two dice to negotiate favors with criminals inside or outside the prison. The coterie also have a Diff 3 means to enter and exit the location, a total failure on this roll lowers the domain's Portillon by two dots until the end of the story. The domain's Lien is lowered by one dot with timid mortals or those who consider property value to be the most important. Storytellers may deny this Merit to a coterie within a prestigious area of the city or the heart of the city."
          },
          transit: {
            name: "Transit",
            dots: 2,
            resonances: ["Phlegmatic"],
            description: "Any haven within this area receives two dots in the Postern Merit. Add two dice to pools to evade pursuit on transit, summon rats with Animalism, or any other tests relevant to transit. On the opposite End, Nosferatu and others who know the terrain can bypass these two dots of Portillion when infiltrating."
          }
        }
      }
    }
  },
  homesteading: {
    description: "This mechanic is used to factors in different parts of a city or region. How their access to services or resources shape that location or reputation. This can confer different benefits for operation in different parts of the play area as determined by the ST and players. As the story develops the rating may change as the Kindred and Coterie interact with the city and affect the status quo. When utilizing this system it is recommended players and STs work together on their system when implementing.",
    homesteads: "The areas of gameplay divided up in smaller areas as determined by the ST: single havens, a city's neighborhood, a region's cities, a town's blocks, etc. Each homestead is divided by four aspects and they reflect how Kindred or coterie sees the city, depending on the STs application of the city. Homestead rating is the accumulative of the four homestead traits.",
    areasOfImport: "Can include ease of hunting, frenzy resist, disciplines, attributes, or skills, this term is used to describe what the homestead rating modifies.",
    traits: {
      affair: "The financial situation of the homestead; the property value, taxes spent, and revenue. The financial sector or section of the city filled with the workforce may rank high, while neglected or underemployed portions of the city may rank lower.",
      association: "How that part of the city is integrated into the wider city. How infrastructure, public services, and shops connect the people to the homestead. Subways, highways, trendy restaurants, cultural locations, etc. are things to consider.",
      clout: "The security physical embodiment of the locations and how it can be interacted with by Kindred. A major landmark with a security force may rank high in this trait, while a sleepy neighborhood where they leave their doors unlocked could sit at 0.",
      utility: "Services provided and accessible to the homestead. It can factor in things like air quality, public services responsiveness, cleanliness, etc. Food desert may rank a place low, but to a Kindred if the block has access to medical facilities they see it as highly ranked in utility."
    },
    ratingEffects: {
      "0-5": "Provides -2 to area of import and +1 to a skill",
      "6-10": "Provides a -1 and +1 to area of import",
      "11-15": "Provides +1 to any area of import and +1 to skill roll",
      "16-20": "+2 to any area of import and a -1 to another area of import"
    }
  },
  advantages: {
    description: "These can only be taken with coterie dots or by taking coterie Flaws to offset the cost. These Merits and Flaws affect this coterie wholly as long as their allegiance is openly know, those who hide their affiliation may avoid the Flaws but will also lack the Merits use. Unlike character Advantages, these persist when the character who purchased the Merit or Flaw is destroys or leaves the coterie, though they will fade overtime.",
    source: ["Vampire: The Masquerade Players Guide"],
    sourcePage: "171-173",
    merits: {
      boltHoles: {
        name: "Bolt Holes",
        dots: "1-3",
        description: "Every dot of this Merit gives the coterie a bonus die when attempting to escape pursuit or avoid detection. This may also play into dice pools at the Storytellers discretion."
      },
      onTap: {
        name: "On Tap",
        dots: "1-3",
        description: "Choose a Resonance at CC, whenever hunting in the domain add dice equal to the dot value of the Merit when looking for a victim with the selected Resonance."
      },
      privileged: {
        name: "Privileged",
        dots: 3,
        description: "For some reason the coterie has been granted special rights and are able to avoid punishment for specific crimes. This immunity can be revoked if abused. Should the leadership of the city change hands as long as the coterie remains on the winners side the Merit remains."
      },
      transportation: {
        name: "Transportation",
        dots: 2,
        description: "A small fleet of luxury vehicles and drivers (Drive Skill 6) are available on short notice. Once per story the coterie can ask for a rare or expensive vehicle. As determined by the Storyteller, the death of a driver or destruction of too many vehicles can make this merit unavailable for a short time."
      }
    },
    flaws: {
      bullies: {
        name: "Bullies",
        dots: 1,
        description: "Due to a bad reputation from their past, the coterie suffers a one-die penalty on all Social dice pools except Intimidation when dealing with other vampires. This Flaw does not apply to dealing with their old master's henchmen."
      },
      cursed: {
        name: "Cursed",
        dots: "Varies",
        description: "Select a number of Folkloric Blocks or Banes and whenever the coterie is outside their domain they suffer the effects of them."
      },
      custodians: {
        name: "Custodians",
        dots: 2,
        description: "The coterie is required to take care of certain tasks and should they fail they take a hit to Status with their sect till they make amends. (First the coterie's Status and then character Status). If they lose all Status the coterie becomes Suspect and retains the Flaw."
      },
      targeted: {
        name: "Targeted",
        dots: 1,
        description: "A mortal hunting agency or other threat knows about the coterie and has penetrated their defenses in the past. The coterie's Portillon rating is halved (rounded up) against this threat."
      },
      territorial: {
        name: "Territorial",
        dots: 1,
        description: "For each week the coterie is absent from the domain, it's traits (Chasse, Portillon and, Lien) reduce by one. The traits cannot be reduced to zero in this way. If part of the coterie remains in order to upkeep it, they must reduce their hunting pools by one die (If only one member remains, two dice must be removed). If the coterie is gone for too long or the traits are reduced to zero, the coterie loses the territory. Coteries can reclaim this territory by staying there for one month. Coteries with no dots in domain traits cannot take this Flaw."
      },
      underSiege: {
        name: "Under Siege",
        dots: 1,
        description: "Once per story the Storyteller can reduce one of the coterie's domain traits to one or deny usage of one of the Coterie's Merits/Backgrounds as the foes attempting to take the territory."
      }
    }
  },
  clanMerits: {
    description: "Kindred can also purchase Coterie Merits at Character Creation, these are merits tied to specific clans but they can generally be activated by anyone within the group. In some cases, only one member of the coterie can use the given Merit in a session based on who needs it the most.",
    source: ["Vampire: The Masquerade Companion"],
    sourcePage: 30,
    merits: {
      banuHaqim: {
        name: "Call to Purpose",
        dots: 2,
        description: "Once per session, they may motivate another teammate to gain the effect of a Willpower point to be immediately used."
      },
      brujah: {
        name: "Boot and Rally",
        dots: 1,
        description: "Once per session, a coterie mate may reroll all regular dice on a failed Physical test."
      },
      gangrel: {
        name: "Pack Tactics",
        dots: 3,
        description: "When in combat gain a single die to pools for Brawl or Melee attacks when together."
      },
      hecata: {
        name: "Ars Moriendi",
        dots: 2,
        description: "Once per session, they can mask the corpse of someone killed."
      },
      lasombra: {
        name: "At Any Cost",
        dots: 2,
        description: "Once per session, add two successes to a test. The outcome is treated as a Messy Critical."
      },
      malkavian: {
        name: "Everything is Connected",
        dots: 3,
        description: "Once per session, another member of the coterie may substitute one skill for another on a test involving information gathering."
      },
      ministry: {
        name: "Discerning",
        dots: 1,
        description: "Once per session the Minister character may learn something about a Storytellers character's wants as long as a member of the coterie has spoken to them."
      },
      nosferatu: {
        name: "Contextual Contact",
        dots: 2,
        description: "Once per session, the Nosferatu may add the highest-rated coterie members' contact rating to any one test to recover information."
      },
      ravnos: {
        name: "Cryptolect",
        dots: 3,
        description: "Allows the coterie to communicate in coded language and hand signs."
      },
      salubri: {
        name: "Restraint",
        dots: 3,
        description: "Once per session, the Salubri can allow another member of their group to reroll all of their Hunger dice in a test for free."
      },
      toreador: {
        name: "All Access",
        dots: 1,
        description: "One per session, they can get past bouncers to get into a mortal event by being on the list or knowing the right connections."
      },
      tremere: {
        name: "Multi-Level Lorekeeping",
        dots: 2,
        description: "Once per session, someone can use another's loresheet within the coterie including clan specific."
      },
      tzimisce: {
        name: "Old-World Hospitality",
        dots: 2,
        description: "When daysleeping in the Tzimisce's haven, they regain an additional Superficial Willpower damage."
      },
      ventrue: {
        name: "Kindred Legacies",
        dots: 2,
        description: "Once per session, the Ventrue may ask for relevant information about the history of a single vampire they've met."
      },
      caitiff: {
        name: "Versatile Vitae",
        dots: 2,
        description: "Once per session, the Caitiff can enable another coterie mate to use a Discipline power they do not possess assuming they have the Discipline levels and other pre-requisites for the duration of one scene."
      },
      thinblood: {
        name: "Mortal Heart",
        dots: 2,
        description: "Once per session, the coterie may be reminded by the thin-blood what it means to be alive and count their Humanity as one dot higher for one scene."
      }
    }
  }
};
window.coterieBackgrounds = coterieBackgrounds; 
const hunterEdges = {
  assets: {
    arsenal: {
      name: "Arsenal",
      description: "Either borrowed from an old contact or put together in a garage, the Hunter has access to a wide variety of weapons that are generally not available to the public. This includes not only firearms but also melee weapons; however, this does not include explosives such as bombs, mines, or other munitions. These weapons are still mundane and are only available for a short period of time, either having to be returned to the contact, undergo severe maintenance, or break down due to their nature of being jerry-rigged.",
      edgePool: "Intelligence + Craft for the Hunter who keeps and maintains their own arsenal. Manipulation + Streetwise for the Hunter who relies on contacts.",
      system: "The Hunter is able to provide a single personal firearm or melee weapon upon winning a test at Difficulty 4. This test is made at the start of a scene, and the Hunter must have plausible access to their supplies or contacts. It can only be attempted once per scene, and the weapon can only be used for that scene, but later tests can provide the same or a similar weapon.",
      perks: [
        {
          name: "Team Requisition",
          description: "Up to the margin of the win, the hunter can provide additional copies of the same weapon."
        },
        {
          name: "Special Features",
          description: "The weapon obtained comes with a number of special features, up to the margin of the win. The features can range from thermal signs to disguised cases, the Storyteller makes the final decision of what qualifies as a special feature."
        },
        {
          name: "Exotics",
          description: "The Hunter is able to procure rare or one-of-a-kind weapons or ammunition. The Difficulty of the test can increase in the case of something extremely rare or unique, as determined by the Storyteller."
        },
        {
          name: "Untraceable",
          description: "The weapons are completely untraceable and will never lead authorities or quarry to the Hunters."
        }
      ]
    },
    fleet: {
      name: "Fleet",
      description: "Either borrowed from a reliable contact or put together in a garage, the Hunter has access to a wide variety of personal or commercial vehicles on short notice. This does not include military vehicles such as tanks or attack aircraft.",
      edgePool: "Intelligence + Technology for the Hunter who keeps and maintains their own fleet. Manipulation + Persuasion for the Hunter who relies on contacts.",
      system: "The Hunter is able to provide a single vehicle for either public or commercial use, including boats and aircraft, upon winning a test at Difficulty 4. Outlandish requests should be vetted by the Storyteller with increasing Difficulty as needed. This test is made at the start of a scene, and the Hunter must have plausible access to their garage or contact. It can only be attempted once per scene, and the vehicle can only be used for that scene, but later tests can provide the same or a similar vehicle. This Edge does not grant the ability to pilot the vehicles provided.",
      perks: [
        {
          name: "Armor",
          description: "Vehicles are armored to withstand small firearms. Flying vehicles benefit less from the armor but do provide additional protection to passengers, adding two dice to their defense pools against ranged weaponry."
        },
        {
          name: "Performance",
          description: "Vehicles have superior driving and handling. This gives a bonus equal to the margin on the Edge test to win against pursuit-related Driving tests, however, this bonus cannot be more than 3 dice."
        },
        {
          name: "Surveillance",
          description: "Vehicles come with a wide variety of concealed surveillance tools. This equipment gives bonus dice equal to the margin on the Edge test on stakeouts from the vehicle, such as Awareness or Technology tests. However, this bonus cannot exceed three dice."
        },
        {
          name: "Untraceable",
          description: "The vehicles are completely untraceable and will never lead authorities or quarry to the Hunters."
        }
      ]
    },
    ordnance: {
      name: "Ordnance",
      description: "Either obtained through one or many connections or put together by the Hunter themselves, the Hunter has access to various types of timed or remotely detonated munitions. Examples of these are anti-vehicle mines, C4 explosives, or demolition charges.",
      edgePool: "Composure + Science for the Hunter who builds their own ordnance. Composure + Streetwise for the Hunter who relies on contacts.",
      system: "The Hunter is able to provide a single mine or explosive upon winning a test at Difficulty 4. This test is made at the start of a scene and the Hunter must have plausible access to their supplies or contacts. It can only be attempted once per scene, and the explosive can only be used for that scene.",
      perks: [
        {
          name: "Multiple Payloads",
          description: "Up to the margin of the win, the hunter can provide additional copies of the same explosive."
        },
        {
          name: "Non-lethal Munitions",
          description: "The Hunter is able to obtain non-lethal munitions such as flash grenades or tear gas. The Storyteller should determine the effects of these substances on others, a good rule of thumb is a dice penalty equal to the margin of the Edge test. This penalty cannot exceed three dice."
        },
        {
          name: "Exotics",
          description: "Custom or otherwise rare substances can be obtained. The Storyteller should alter the Difficulty of the test in cases of exceedingly rare items. These items are not inherently supernatural but can exploit supernatural vulnerabilities."
        },
        {
          name: "Disguised Delivery",
          description: "Items obtained are disguised as mundane items. The Difficulty to detect them is increased by the margin on the Edge test, but this penalty cannot exceed more than three dice."
        }
      ]
    },
    library: {
      name: "Library",
      description: "The Hunter has access to a wealth of information on a wide variety of topics and creatures through either a library filled with centuries-old texts or an encrypted database with all the latest research on the supernatural.",
      edgePool: "Resolve + Academics",
      system: "The Hunter must spend about a day researching their quarry before making an Edge test. The Storyteller decides what type of clue they receive upon a win and how vague it is, with the clarity and amount of information increasing based on the margin of the win. This can only be attempted once per scene, and once the Hunter succeeds, it cannot be used again until the next session.",
      perks: [
        {
          name: "Where They Hide",
          description: "In addition to the clues obtained, any attempts to locate where the creature's lair is receive a bonus. This bonus is equal to the margin of the Edge test; it expires after use and cannot be greater than three dice."
        },
        {
          name: "Who They Are",
          description: "In addition to the clues obtained, any attempts to identify the prey receive a bonus. This bonus is equal to the margin of the Edge test; it expires after use and cannot be greater than three dice."
        },
        {
          name: "How to Halt Them",
          description: "In addition to the clues obtained, any attempts to ward or otherwise protect an area or person from the prey receive a bonus. This bonus is equal to the margin of the Edge test; it expires after use and cannot be greater than three dice. This does not apply to any direct attacks."
        },
        {
          name: "How to Harm Them",
          description: "In addition to the clues obtained, any attempts to harm the prey by exploiting their supernatural weaknesses receive a bonus. This bonus is equal to the margin of the Edge test; it expires after use and cannot be greater than three dice."
        },
        {
          name: "Binge",
          description: "Research time is cut in half."
        },
        {
          name: "Friendly Librarian",
          description: "If the character can wait one or two days before the Edge roll, they gain one automatic success."
        },
        {
          name: "Group Study",
          description: "The Hunter may add 1 bonus die per cell member participating in the research, even if they do not have the Library Edge."
        },
        {
          name: "Permanent Fixture",
          description: "The campus library can be used as a safe house once per semester."
        },
        {
          name: "How to Silence Them",
          description: "Gain bonus equal to margin to any attempt to damage the target in social combat. Bonus expires after use and cannot exceed 3 dice."
        },
        {
          name: "Pattern Analysis",
          description: "Able to narrow down specific monster behavior easily, alongside finding people alive to talk to who are familiar with the phenomenon."
        }
      ]
    },
    experimentalMedicine: {
      name: "Experimental Medicine",
      description: "Whether it's drugs or medicine, the Hunter has an indefinite waiver to a medical team to perform whatever experiments on them in exchange for swift, free medical care.",
      edgePool: "Stamina + Medicine for Health, Composure + Insight for Willpower",
      system: "Whenever the Hunter has one or more Aggravated damage, they may undergo this experimental procedure, Difficulty equal to half the subject's current amount of Aggravated damage (rounded up). Winning heals completely, failing inflicts the appropriate Impaired status for the story's duration and raises Danger by 1.",
      perks: [
        {
          name: "Improved Resilience",
          description: "Until the end of the next story, the Hunter counts as having a Armor Value of 1 when unarmored, stacking with worn armor."
        },
        {
          name: "Monstrous Enhancement",
          description: "One of the Hunter's Attributes is increased by 2 dots (To max of 5), but develop a weakness to a common, mundane material (e.g. Silver, Seawater), taking Aggravated damage from it until the story's end."
        },
        {
          name: "Phoenix Protocol",
          description: "For the duration of the next story, the Hunter heals Health twice as quickly, and Aggravated damage downgraded to Superficial. However, they can't use Drive for Desperation dice. When effect ends, they gain Aggravated Willpower damage equal to the times this Perk was used."
        },
        {
          name: "Unstable Steroids",
          description: "One of the Hunter's Attributes is increased by one until the end of the next story. Should they achieve Despair on any tests before that, they also suffer 1 Aggravated damage."
        }
      ]
    }
  },
  aptitudes: {
    improvisedGear: {
      name: "Improvised Gear",
      description: "With the objects and materials nearby, the Hunter is able to create any number of short-lived but useful tools to aid the cell.",
      edgePool: "Intelligence + Craft/Technology/Science depending on the tool or substance being made.",
      system: "The Hunter is able to provide short-lived but useful equipment from ordinary items upon winning a test at Difficulty 4. This item can add to the use of a single Skill by adding a two-dice advantage at the Storyteller's discretion. It can also make certain actions that would have been impossible possible for the Hunters. The amount of time needed to create this item is determined by the Storyteller and may range from a few minutes to several hours. Creating these under duress, such as a firefight, is not possible. These items only last through one scene, and unless they have the associated perks, Hunters can only make one per scene.",
      perks: [
        {
          name: "Frugal",
          description: "With their trinkets and tools on their person in a bag or another container, the Hunter can apply this Edge anywhere."
        },
        {
          name: "Mass Production",
          description: "The Hunter can produce additional items equal to the margin of the test. These items are, however, all identical and grant the bonus to the same Skill. All other restrictions and Perks apply."
        },
        {
          name: "Specialization",
          description: "Specializing in a specific Skill, the Hunter now can produce items that have a 3-dice bonus instead of 2. This perk can be taken multiple times, but only once per Skill."
        },
        {
          name: "Speed Crafting",
          description: "This Edge can now be used under duress, such as in firefights, and the Hunter crafts the tool in three turns minus the margin of the test. There is a minimum of one turn to create the item."
        }
      ]
    },
    globalAccess: {
      name: "Global Access",
      description: "The Hunter is able to accomplish feats of digital larceny well beyond what a normal hacker is able to.",
      edgePool: "Intelligence + Technology",
      system: "To use this Edge, the Hunter must spend the equivalent of a scene (the length of time being determined by the Storyteller). The Hunter is then able to obtain data on any subject or person in any database, ranging from surveillance to buried records, upon winning a test at Difficulty 4. Without the associated Perks, this data may not be manipulated, and in the case of non-networked systems, the Hunter must have physical access to the local network.",
      perks: [
        {
          name: "Watching Big Brother",
          description: "The Hunter can manipulate digital surveillance footage, editing people in and out of the records."
        },
        {
          name: "All-Access Pass",
          description: "The Hunter can bypass electronic locks, tamper with, or disable security countermeasures such as alarm systems. The Difficulty depends on what the system is, with it usually being between 3-5 as determined by the Storyteller."
        },
        {
          name: "Money Trap",
          description: "The Hunter can manipulate financial data and move money with little effort. This can be used to deprive prey or enemies of financial assets or guide authoritarian eyes toward something suspicious. This lowers the level of Resources of a target, when used offensively, by one per margin of the test. This reduction lasts for one month. The Storyteller should decide how this affects the Hunters when they use it for personal gain, with at least an increase in Danger as they line their own pockets."
        },
        {
          name: "The Letter of the Law",
          description: "The Hunter can manipulate criminal records. Making their enemies wanted criminals or erasing another's mistakes. The Difficulty ranges from 3 (local offenses) to 5 (global scale) when attempting to wipe or place them on someone else."
        },
        {
          name: "Digital Cannon Fodder",
          description: "Reduce the success of any attempt to digitally surveil, trace or locate the Hunter by 2."
        }
      ]
    },
    droneJockey: {
      name: "Drone Jockey",
      description: "The Hunter has a drone that surpasses those that are commercially available. They are also able to control it expertly and repair it on their own. The type of drone varies, either as a tool for surveillance or for combat.",
      edgePool: "Wits + Technology for flying the drone. Intelligence + Craft to either repair or rebuild it.",
      system: "When obtained, the drone is equipped to perform two Skills. For example, a walking drone with armor might be able to perform Athletics and Brawl; a surveillance drone might perform Stealth and Awareness. The type of drone that a Hunter uses is determined when the Edge is obtained, and more variants may be obtained through the Perks. When a controller tests the Skill of the drone, either through the hand-held device or hardwired computer, they use their Wits + Technology instead of the usual pool. If the drone must make a Skill test for a Skill they do not possess, they use a one-die pool. The drone has an unlimited range, and can stay active for one day plus additional days equal to the margin of a test made of Intelligence + Science at Difficulty 2. Drones have five health levels, with ground drones treating damage as Superficial and flying drones treating damage as Aggravated. By spending the equivalent of a scene and making a test of Intelligence + Craft at Difficulty 3, the Hunter may repair the damage of a drone by the number of health equal to the margin of the test. This can also be done on destroyed drones, but they must be fully restored before they can be used again.",
      perks: [
        {
          name: "Autonomous",
          description: "The Hunter is able to run drones with simple patterns on their own. Complicated decision trees require a Resolve + Technology test as an appropriate difficulty. Instead of using the Hunter's Wits + Technology, any Skills used in this mode use a flat pool of five dice."
        },
        {
          name: "Variants",
          description: "This Perk can be taken multiple times and allows an additional drone variant (complete with two Skills unrelated to previous drones). Only one drone can be active at a time, unless the Autonomous Perk is used to run them."
        },
        {
          name: "Specialist Skill",
          description: "This drone can obtain an additional Skill, and if the Storyteller agrees, this can also include the drone carrying items or manipulating the environment. Some examples are Larceny with a set of electronic picks or Science with an onboard mobile lab. This Perk only applies to one drone but can be taken multiple times for additional drones."
        },
        {
          name: "Armaments",
          description: "The drone is equipped with the equivalent of a submachine gun or taser, which uses a flat five-dice pool. The Specialist Skill Perk allows the controller to use their Wits + Technology when directly controlling the drone."
        },
        {
          name: "Payload",
          description: "The drone can carry cargo many times bigger than what it would seem to be able to carry. While carrying cargo, the drone moves slower and grants two-dice to those attempting to detect it. This drone will not subdue a resisting cargo, and the size of the drone should be agreed upon by the Storyteller and player before it's used."
        }
      ]
    },
    beastWhisperer: {
      name: "Beast Whisperer",
      description: "Some species of animals may be understood by and loyal to the Hunter. Thus, they are dependable companions and occasionally even friends.",
      edgePool: "Charisma + Animal Ken for commands, Composure + Animal Ken for training.",
      system: "When taking this Edge this Hunter must choose one type of animal and which key action pool it has. This animal is considered completely loyal and will accompany a Hunter into any situation as long as it is desired.",
      perks: [
        {
          name: "Incorruptible",
          description: "The animal is immune to supernatural powers that would sway it away from its master."
        },
        {
          name: "Menagerie",
          description: "Choose another animal type and add it to the available pool of animals."
        },
        {
          name: "Complex Commands",
          description: "Animals can now understand more complex commands. Charisma + Animal Ken is used to give these commands with a Difficult dependent on their complexity, while Intelligence + Animal Ken is used to understand the animal."
        },
        {
          name: "Incognito",
          description: "The animal can now stay out of sight, hiding either just out of observed range or blending into environments. The Storyteller should determine the plausibility of this in certain situations, depending on the animal."
        }
      ]
    },
    turncoat: {
      name: "Turncoat",
      description: "The Hunter is a double agent, working with their cell to get on the inside with the Quarry. The Quarry fully believing in their loyalty completely.",
      edgePool: "Manipulation + Subterfuge",
      system: "The Hunter makes an Edge test vs Difficulty equaling half the target's Intelligence + Wits or standard Difficulty. Target now believes the Hunter is 100% loyal to them.",
      perks: [
        {
          name: "Deathbed Confession",
          description: "Able to use Turncoat edge during combat, taking a full action."
        },
        {
          name: "Poker Face",
          description: "2-dice bonus to Turncoat Edges when questioned."
        },
        {
          name: "Stick to the Plan",
          description: "Cell is always firmly in sync with the Hunter, able to understand the Turncoat Hunter's intent without communication needed."
        },
        {
          name: "We Come as a Team",
          description: "For each point of margin, the Hunter can bring a cellmate along. The Hunter can make Turncoat Edge test to vouch for them."
        }
      ]
    }
  },
  endowments: {
    senseTheUnnatural: {
      name: "Sense the Unnatural",
      description: "While holding an object of focus, the Hunter is able to detect the nearby presence of supernatural creatures. However, this ability does not determine who or what the creature is.",
      edgePool: "Wits + Occult or Science, depending on the Endowment's nature.",
      system: "Upon winning an Edge test with a Difficulty of 3-5 (ranging on the type of creature and its power), the Hunter will be able to detect if there is a presence. The Hunter must hold their object of focus, with its use being intentional and obvious. In order to use this power more than once per scene, it requires spending one point of Willpower for each additional attempt.",
      perks: [
        {
          name: "Creature Specialization",
          description: "Gain a two-dice bonus against a specific type of creature when attempting to detect it. This can be learned multiple times, but only once for each creature type."
        },
        {
          name: "Range",
          description: "The range of the ability is extended to roughly the size of a city block, but it does not give precision beyond if it's in the same room or farther away."
        },
        {
          name: "Precision",
          description: "The Hunter is now able to determine who the supernatural creature in the room is, but they are unable to determine the type unless they have a specialization for it."
        },
        {
          name: "Handsfree",
          description: "The Hunter no longer needs to use an object of focus for this Edge."
        }
      ]
    },
    repelTheUnnatural: {
      name: "Repel the Unnatural",
      description: "By brandishing or otherwise using an object of focus, the Hunter is able to repel supernatural creatures.",
      edgePool: "Resolve + Occult or Science depending on the Endowment's nature.",
      system: "Upon winning an Edge test with a Difficulty set by the Storyteller (Default is half the creature's Composure + Resolve or just the standard Difficulty of the creature), the creature can be held back by the Hunter as long as they remain stationary with their object of focus. When repelled, creatures cannot move closer or engage them in brawl, but they are able to defend themselves and use any of their other powers. Should the Hunter move, they must make the Edge test for each turn spent moving with the same pool and Difficulty as before. If they lose, the repelling stops and cannot be used on the same creature again for the duration of the scene.",
      perks: [
        {
          name: "Ward",
          description: "The area of protection can be extended to include roughly two meters around the Hunter, with an additional meter per margin of success."
        },
        {
          name: "Damage",
          description: "The Hunter can use the object of their focus as a melee weapon with +0 damage and inflict Aggravated damage to the creature under the repel effect. If used in this manner, the Hunter must immediately retake the Edge test, or else its protective power fails."
        },
        {
          name: "Creature Specialization",
          description: "Gain a two-dice bonus against a specific type of creature when attempting to repel it. This can be learned multiple times, but only once for each creature type."
        },
        {
          name: "Handsfree",
          description: "The Hunter no longer needs to use an object of focus for this Edge."
        }
      ]
    },
    thwartTheUnnatural: {
      name: "Thwart the Unnatural",
      description: "Using an object of focus, the Hunter is highly resistant to any supernatural abilities that affect the mind.",
      edgePool: "Composure + Occult or Science, depending on the nature of the Endowment.",
      system: "While holding their object of focus, a Hunter is immune to supernatural abilities that would otherwise require a resistance test. For abilities that would automatically affect them, the Hunter may instead resist with an Edge test. This only applies to attempts that target the Hunter specifically and not to purely physical attacks or augmentations. For example, this would protect against mind control, but not against a creature attempting to rip them into pieces with their claws.",
      perks: [
        {
          name: "Creature Specialization",
          description: "Gain a two-dice bonus against a specific type of creature when attempting to resist it. This can be learned multiple times, but only once for each creature type"
        },
        {
          name: "Ward",
          description: "The area of protection can be extended to include roughly two meters around the Hunter, with an additional meter per margin of success. Anyone in the area receives the benefit of this Edge, with the Hunter who possesses it making all the resistance tests and spending the Willpower."
        },
        {
          name: "Recognition",
          description: "If they successfully resist an ability, the Hunter is made aware of the attempt and what the power would have done. This, however, does not give them the exact rules but instead gives hints."
        },
        {
          name: "Handsfree",
          description: "The Hunter no longer needs to use an object of focus for this Edge."
        }
      ]
    },
    artifact: {
      name: "Artifact",
      description: "The Hunter has obtained a rare tool, whatever it is, that provides more than a similar object would.",
      edgePool: "Intelligence + Occult or Science, depending on the Artifact's nature.",
      system: "The relic provides the Hunter with a one-dice bonus to a single Skill associated with it, however, this bonus does not apply to Edge tests for the Artifact. This can be used as an object of focus if it meets the requirements. Unlike other objects of focus, though, if it is lost, it requires a long ordeal to regain it.",
      perks: [
        {
          name: "Empower",
          description: "Once per scene, the Hunter can make an Edge test at Difficulty 4 to increase the bonus dice to three. If this test fails, they suffer superficial Willpower damage equal to the amount they lost."
        },
        {
          name: "Attraction",
          description: "Many people seek out this item, and so it can be used as bait and provides a two-dice bonus to any ambush attempt. Be warned: once it's revealed, those who know will continue to look for it as long as they know its location."
        },
        {
          name: "Detection",
          description: "The Artifact acts similar to Sense the Unnatural Edge and uses the same base system rules."
        },
        {
          name: "Shield",
          description: "Acting as a supernatural shield for the Hunter, while it's on their person, any physical damage stemming from supernatural sources is halved. (Or halved again, in cases of superficial damage.)"
        },
        {
          name: "Feature Unlocked",
          description: "Once per story, when Danger is at 5, the Artifact allows to spend a Willpower to reroll as many non-Desperation dice as the Hunter likes. Successes are treated as critical wins."
        }
      ]
    },
    cleanseTheUnnatural: {
      name: "Cleanse the Unnatural",
      description: "It is the ability to drive out supernatural influence from a victim, it removes the taint of supernatural control from a person and gives them back their freedom.",
      edgePool: "Charisma + Persuasion (Exorcism), Resolve + Science (Psychic) or Manipulation + Occult (Faith)",
      system: "Hunter makes an Edge test vs Difficulty dependant on duration of supernatural influence (1 if started on same scene, 2 if past 24 hours, 3 for a week, 4 for year, 5 for anything beyond). Targets take 3 Aggravated damage (Health/Willpower), minus 1 for each point of margin. Upon success, target regains full control for 24 hours.",
      perks: [
        {
          name: "Bedside Manner",
          description: "Any damage dealt by this Edge becomes Superficial and after halving, is rounded down."
        },
        {
          name: "Inflict Stigmata",
          description: "Inflicting a Stigmata causes 1 additional point of Aggravated Health damage but reduces Difficulty of Edge test by 2. Stigmata are permanent."
        },
        {
          name: "Trace the Threads",
          description: "The Storyteller will answer 1 question about the supernatural controller's current location for each point of the margin."
        },
        {
          name: "Psychic Backlash",
          description: "For every 2 point of the margin, the controlling entity receives 1 Aggravated damage. (Hunter chooses either Health or Willpower)"
        }
      ]
    },
    greatDestiny: {
      name: "Great Destiny",
      description: "The Hunter is empowered to fulfil a higher purpose.",
      edgePool: "N/A",
      system: "The Hunter chooses a higher purpose or destiny. At the beginning of each session, the Hunter creates a temporary pool of 2 dice, which may be added to any dice pools that further their destiny. This pool resets at the beginning of each session.",
      perks: [
        {
          name: "Divine Protection",
          description: "When the Hunter takes Health damage in service of their destiny, they can reduce the damage by 2 (minimum of 0)."
        },
        {
          name: "Heavenly Resolve",
          description: "When the Hunter takes damage in Social Combat defending or proselytizing their destiny, can restore 1 Aggravated Willpower damage."
        },
        {
          name: "Sacred Insight",
          description: "Once per story, the Hunter can get a supernatural voice/vision providing a clue to help fulfil their destiny."
        },
        {
          name: "Influence Fate",
          description: "Once per session, the Hunter may influence a target to take 1 action that would aid in the Hunter's destiny. Charisma + Occult vs target's Resolve + Occult."
        }
      ]
    }
  }
};

export default hunterEdges; 
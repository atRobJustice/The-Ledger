export const thinBloodAlchemy = {
  name: "Thin-blood Alchemy",
  nicknames: [
    "Cooking",
    "Home Brew",
    "the Craft",
    "Mashup"
  ],
  affinity: [
    "Thin-blood"
  ],
  type: "Varied",
  threat: "Varied",
  resonance: "Varied",
  overview: "Thin-blood Alchemy is a unique Discipline for Thin-bloods, created through ingredients composed of random items, Resonances, and their own vitae. Alchemy is a young Discipline, thought to be born through the street drug scene or of alchemists of the past. Certain thin-bloods have managed to utilize their weak blood to awaken powers unique to them and even create counterfeit versions of the other Disciplines. Rumors spread through kindred about these powers, speculation spreading as much truth as it does misinformation. However, the alchemists do their best to stay out of the way when plenty of elders view this new Discipline as nothing but watered-down diablerie. All formulae require a cost to distill and then a separate cost to activate which is the same as using other Disciplines (Free or additional Rouse Checks). The cost when creating represents the vitae of the Alchemist being used. Once the power is activated they then roll their distillation pool, defined by which method they use to determine how effective their alchemy is. Some powers might require additional rolls to use, and in cases where a power calls for a Discipline rating, they use their Alchemy Rating instead. Learning further formulae has the Alchemist's pouring through old libraries or going on tasting expeditions to learn more. A character receives one formulae for free for each dot in Thin-Blood Alchemy and more can be purchased with experience and experimentation. Distillation methods vary from Alchemist to Alchemist, when they first begin they select which style they'd like. To learn additional styles, later on, means treating it as a separate Discipline where each formula needs to be learned or relearned in order to be used in the new style. The three styles are Athanor Corporis, Calcinatio and Fixatio. Athanor Corporis is the name for alchemy created through their own body by consuming the ingredients they make a distillation roll of Stamina + Alchemy together with a Rouse Check. Only one power can be activated at a time and a new power must be distilled before being activated. Distillation takes around three turns of concentrations where the Alchemist can do nothing else. They can tap themselves for another dose once per night without another Distillation roll, as long as they haven't fed on a different Resonance or hit Hunger 5. Calcinatio is the method where a human body is used to host the alchemy by introductions of incantations and their own blood. The alchemist feeds their vitae to the mortal and makes a Rouse Check, then a distillation roll of Manipulation + Alchemy. The entire host distills the formula and the blood of the mortal can be drunk to use the power, where the hunger slaked is equal to the power level minus 1. However, they can only distill one power per victim and the current power remains as long as they are kept in the same emotional state. Each power takes as long to activate as it takes to slake the amount of blood required. Tapping for elixirs does 1 Aggravated Health damage per Formula level per dose, but does not require another Distillation unless the mortal's mental state or food intake has significant changes. Fixatio is the final method, in a style similar to what most think of when they think of Alchemy. In a kiln, a meth lab, or a repurposed propane tank, the alchemist uses a conventional athanor to brew. They pour their vitae with a Rouse Check into the system with the other ingredients, then makes the distillation roll with Intelligence + Alchemy (Make the distillation roll upon use rather than upon production). The resulting formula is then able to be carried with the amount carried equal to their Wits or Dexterity. They can store a number of formulae equal to Alchemy rating * 2 plus the haven rating. Creating their alchemy requires a lab and without one they at best can only create a level 3 or less formula, and using unsuitable equipment reduces their distillation dice pool by 2. They can activate one power per turn.",
  distillationMethods: {
    athanorCorporis: {
      description: "Alchemy created through their own body by consuming the ingredients",
      distillationRoll: "Stamina + Alchemy",
      cost: "Rouse Check",
      limitations: [
        "Only one power can be activated at a time",
        "New power must be distilled before being activated",
        "Distillation takes around three turns of concentration"
      ]
    },
    calcinatio: {
      description: "Uses a human body to host the alchemy by introductions of incantations and their own blood",
      distillationRoll: "Manipulation + Alchemy",
      cost: "Rouse Check",
      limitations: [
        "Can only distill one power per victim",
        "Current power remains as long as they are kept in the same emotional state",
        "Each power takes as long to activate as it takes to slake the amount of blood required"
      ]
    },
    fixatio: {
      description: "Uses a conventional athanor to brew in a kiln, meth lab, or repurposed propane tank",
      distillationRoll: "Intelligence + Alchemy",
      cost: "Rouse Check",
      limitations: [
        "Requires a lab for best results",
        "Without a lab, can only create level 3 or less formula",
        "Using unsuitable equipment reduces distillation dice pool by 2",
        "Can activate one power per turn"
      ]
    }
  },
  powers: {
    level1: [
      {
        name: "Body Paint",
        effect: "Create tattoos with personal touches beyond regular tattoos",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric",
        duration: "Permanent, unless erased by skin coloured Body Paint",
        dicePool: "Dexterity + Craft",
        opposingPool: "None",
        notes: "After a week, the roll to alter the tattoo is Stamina + Resolve",
        source: "Vampire: The Masquerade Blood Sigils, page 73"
      },
      {
        name: "Checkout Time",
        effect: "Enter a deep torpor where there is no difference between you or a corpse",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "A number of nights written during creation. This cannot exceed 9 nights",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Coming out of this Torpor does not require a Rouse Check. In this state, they have no aura, require no rouse checks and take no damage from sunlight or other banes",
        source: "Vampire: The Masquerade Blood Sigils, page 74"
      },
      {
        name: "Elevate",
        effect: "Get high regardless of Humanity or Blush of Life. Temporarily enhances Dexterity if well made",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Sanguine",
        duration: "One Scene",
        dicePool: "Stamina + Alchemy",
        opposingPool: "N/A",
        notes: "Badly made Elevate still feels great but degrades Dexterity",
        source: "Vampire: The Masquerade Blood Sigils, page 74"
      },
      {
        name: "Far Reach",
        effect: "Push, pull, hold or grab objects or people with their mind.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric",
        duration: "One turn unless held",
        dicePool: "Resolve + Alchemy",
        opposingPool: "Strength + Athletics",
        notes: "Keeping something held in the air requires a check each turn of Resolve + Alchemy Difficulty 3.",
        source: "Vampire: The Masquerade Corebook, page 284"
      },
      {
        name: "Food Stain",
        effect: "Mark someone so anyone who drinks from them becomes obvious to the alchemist when they encounter them",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "Persists until consumed or applied",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "If the alchemist has Auspex 2, they become aware as soon as the feeding occurs",
        source: "Vampire: The Masquerade Blood Sigils, page 74"
      },
      {
        name: "Gaoler's Bane",
        effect: "Receive a 2-dice bonus when freeing themselves from physical restraints or grapples.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Sanguine",
        duration: "One Scene or until ended voluntarily",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Vampire: The Masquerade Winter's Teeth, Page 10"
      },
      {
        name: "Haze",
        effect: "Create a mist that follows the user, making it harder to shoot them or identify them.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "One Scene or until ended voluntarily",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This can be extended to encompass up to five people with an additional Rouse Check.",
        source: "Vampire: The Masquerade Corebook, page 285"
      },
      {
        name: "Mercurian Tongue",
        effect: "Speak other languages than their own.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "N/A",
        duration: "One night or till they feed from someone with the same native language as themselves.",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The alchemist can spend Willpower and feed from another person to swap the language the alchemist currently knows.",
        source: "Vampire: The Masquerade Players Guide, page 103"
      },
      {
        name: "Plug-In",
        effect: "Produce low-level electrical current from their body.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Sanguine",
        duration: "One scene if lighting one room, till half battery if charging a device.",
        dicePool: "Resolve + Alchemy",
        opposingPool: "N/A",
        notes: "It powers through touch and will stop if the connection is lost.",
        source: "Vampire: The Masquerade Players Guide, page 103"
      },
      {
        name: "Portable Shade",
        effect: "Withstand the effects of Sunlight and walk in the sun.",
        cost: "One Rouse Check",
        origin: "Sabbat",
        resonance: "Sanguine",
        duration: "Hours active are equal to the Stamina + Alchemy test or the next sunset, whichever is first",
        dicePool: "Stamina + Alchemy",
        opposingPool: "N/A",
        notes: "This formula was developed by the Path of the Sun Thin-bloods.",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 53"
      },
      {
        name: "Speak From the Heart",
        effect: "Place a message into someone's blood. The next vampire to drink from them gets the message",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "Messages take 1 minute. Lasts until death or blood is drunk",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Different drinks used in the creation affect the message",
        source: "Vampire: The Masquerade Blood Sigils, page 75"
      }
    ],
    level2: [
      {
        name: "Advanced Torpor",
        effect: "Immediately cause Torpor",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Choleric",
          "Phlegmatic"
        ],
        duration: "Until target awakens from Torpor",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Always heal as a vampire, regardless of flaws. Unlike regular torpor, the vampire always has a Rouse Check re-roll",
        source: "Blood Sigils, page 75"
      },
      {
        name: "Blacklight Surprise",
        effect: "Makes UV light damage vampires",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Sanguine",
          "Choleric"
        ],
        duration: "At least one hour. Light source breaking ends the effect",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Kindred who already take damage from UV light, take an extra point",
        source: "Blood Sigils, page 75"
      },
      {
        name: "Blood of Mandagloire",
        effect: "Infect the blood of a herd to cause those who feed from it to fall into a dreamless sleep",
        cost: "One Rouse Check",
        origin: "Second Inquisition",
        resonance: "Melancholic",
        duration: "Remains active in the herd's blood for three nights",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Thin-bloods develop this formula within the Second Inquisition.",
        source: "Second Inquisition, 46"
      },
      {
        name: "Blue State",
        effect: "Forces a target to contemplate obsessively over an ally's failure",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Melancholic",
          "Phlegmatic"
        ],
        duration: "The Stain remains until the people involved, at least, have an uncomfortable talk",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Kindred gain stains if an ally violates their convictions. Mortals just hold a grudge",
        source: "Blood Sigils, page 76"
      },
      {
        name: "Envelop",
        effect: "Create a mist that clings to a victim",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Melancholic",
          "Phlegmatic"
        ],
        duration: "One scene or until ended voluntarily",
        dicePool: "Wits + Alchemy",
        opposingPool: "Stamina + Survival",
        notes: "This can only be employed on single targets one at a time.",
        source: "Corebook, page 285"
      },
      {
        name: "Friends List",
        effect: "See connections between Kindred and mortals",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "One scene",
        dicePool: "Intelligence + Alchemy",
        opposingPool: "N/A",
        notes: "Stronger connections require fewer and fewer successes.",
        source: "Players Guide, page 104"
      },
      {
        name: "Mirror of Trust",
        effect: "Gain 3 extra dice to persuade or intimidate someone into being honest",
        cost: "One Rouse Check",
        origin: "Second Inquisition",
        resonance: "Sanguine",
        duration: "One Hour",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Thin-bloods develop this formula within the Second Inquisition.",
        source: "Second Inquisition, page 46"
      },
      {
        name: "Red's Flaming Hot Sauce",
        effect: "Create a supernatural molotov cocktail",
        cost: "N/A",
        origin: "None",
        resonance: "Choleric",
        duration: "Until used, the fire lasts one scene or longer based on the surroundings",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Fire spreading from it can be extinguished, but the supernatural source cannot.",
        source: "Winter's Teeth, page 10"
      },
      {
        name: "Whiff-Its",
        effect: "Smell and track the Kindred with the highest Blood Potency",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic or Sanguine",
        duration: "Until Dawn",
        dicePool: "Resolve + Awareness",
        opposingPool: "N/A",
        notes: "If multiple Kindred have the same BP, a test allows the user to distinguish between them",
        source: "Gehenna War, page 50"
      }
    ],
    level3: [
      {
        name: "Bleed Out",
        effect: "Liquefy a victim's internal organs into blood enough to feed an entire coterie of Thin-bloods",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Only thin-bloods can feed from the liquefied corpse. Drinkers gain at least 1 Stain.",
        source: "Vampire: The Masquerade Tattered Façade, page 107"
      },
      {
        name: "Chemically-Induced Flashback",
        effect: "Imbue and experience a Memorium of another vampire.",
        cost: "One Rouse Check in addition to the use of Ashe",
        origin: "Ashfinders",
        resonance: "N/A",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Must use the Fixatio method. The Thin-bloods develop this formula within the Ashfinders. Concoct Ashe is a pre-requisite.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 45"
      },
      {
        name: "Concoct Ashe",
        effect: "Create Ashe from the remains of a vampire.",
        cost: "Free",
        origin: "Ashfinders",
        resonance: "N/A",
        duration: "N/A",
        dicePool: "Intelligence + Alchemy",
        opposingPool: "N/A",
        notes: "Must use the Fixatio method. The Thin-bloods develop this formula within the Ashfinders.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 45"
      },
      {
        name: "Diamond Skin",
        effect: "Reduces physical damage to the alchemist, turning Aggravated to Superficial",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "Until margin of Distillation roll is used up",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Does not affect fire, acid, sunlight or sorcery",
        source: "Vampire: The Masquerade Blood Sigils, page 76"
      },
      {
        name: "Defractionate",
        effect: "Turn preserved blood into something palatable by any kindred.",
        cost: "Free",
        origin: "None",
        resonance: "Melancholic, Sanguine",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Each Distillation style has a unique method of tapping for this elixir.",
        source: "Vampire: The Masquerade Corebook, page 286"
      },
      {
        name: "Fang-Stinger",
        effect: "Introduce blood into a mortal that causes no harm to them but harms vampire's that feed from them.",
        cost: "One Rouse Check",
        origin: "Second Inquisition",
        resonance: "Choleric",
        duration: "One day",
        dicePool: "Resolve + Alchemy",
        opposingPool: "Stamina + Resolve",
        notes: "Thin-bloods develop this formula within the Second Inquisition.",
        source: "Vampire: The Masquerade Second Inquisition, page 47"
      },
      {
        name: "Fireskin",
        effect: "Superheat your body",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "N/A",
        duration: "One Scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "They gain +1 additional fire damage with strikes with their body. They are immune to fire but cold hurts more",
        source: "Vampire: The Masquerade Blood Sigils, page 76"
      },
      {
        name: "Freezer Fluid",
        effect: "Freeze a vampire's body.",
        cost: "One Rouse Check",
        origin: "Second Inquisition",
        resonance: "Melancholic, Phlegmatic",
        duration: "One scene",
        dicePool: "Resolve + Alchemy",
        opposingPool: "Stamina + Resolve",
        notes: "Thin-bloods develop this formula within the Second Inquisition.",
        source: "Vampire: The Masquerade Second Inquisition, page 47"
      },
      {
        name: "Hospital Chains",
        effect: "Prevent someone from healing",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "2 days per point of margin",
        dicePool: "Distillation roll vs Stamina",
        opposingPool: "N/A",
        notes: "Critical wins last 2 days per success",
        source: "Vampire: The Masquerade Blood Sigils, page 76"
      },
      {
        name: "Mandagloire",
        effect: "Emit a gas that causes rigid paralysis in mortals and supernatural creatures.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "Three turns",
        dicePool: "Stamina + Alchemy",
        opposingPool: "Stamina + Resolve",
        notes: "For Fixatio alchemists this can be slipped into a drink or burned.",
        source: "Vampire: The Masquerade Players Guide, page 104"
      },
      {
        name: "Martian Purity",
        effect: "Expel blood-borne illnesses through ignited gases",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric",
        duration: "Two rounds",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Deals 2 Aggravated Health damage",
        source: "Vampire: The Masquerade Blood Sigils, page 77"
      },
      {
        name: "Mask Off",
        effect: "Creates an explosion of gas that causes no damage but negates the Blush of Life",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric, Melancholic",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "Stamina + Resolve",
        notes: "Those affected cannot use Blush of Life for rest of the night. The opposing pool is rolled against the Distillation pool",
        source: "Vampire: The Masquerade Blood Sigils, page 77"
      },
      {
        name: "On-Demand Sunburn",
        effect: "Become a sun battery and harm vampires they touch.",
        cost: "One Rouse Check",
        origin: "Sabbat",
        resonance: "Choleric",
        duration: "Until unleashed or next sunset, whichever is first",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This formula was developed by the Path of the Sun Thin-bloods.",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 53"
      },
      {
        name: "Profane Hieros Gamos",
        effect: "Change their form into their ideal human shape.",
        cost: "One Rouse Check or One point of Aggravated Damage for mortals",
        origin: "None",
        resonance: "Melancholic, Phlegmatic",
        duration: "Permanent.",
        dicePool: "Stamina + Resolve",
        opposingPool: "N/A",
        notes: "This cannot spare the Nosferatu from their bane.",
        source: "Vampire: The Masquerade Corebook, page 286"
      },
      {
        name: "Rumor",
        effect: "Make a statement and convince one person to agree.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "One scene",
        dicePool: "Manipulation + Alchemy",
        opposingPool: "Wits + Awareness",
        notes: "It lingers till something contradicts the target’s agreement.",
        source: "Vampire: The Masquerade Players Guide, page 105"
      },
      {
        name: "Stay the Falling Sand",
        effect: "Slow time",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "One round or more if maintained, expires after one use",
        dicePool: "Resolve + Alchemy",
        opposingPool: "N/A",
        notes: "Cannot be used on living creatures or kindred.",
        source: "Vampire: The Masquerade Winter's Teeth, Page 10"
      },
      {
        name: "Saraimu",
        effect: "Create a sentient blob of slime that acts as a familiar",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "N/A",
        duration: "1 - 3 weeks",
        dicePool: "Resolve + Alchemy",
        opposingPool: "N/A",
        notes: "Can only be created using Fixatio.",
        source: "Vampire: The Masquerade Tattered Façade, page 107"
      },
      {
        name: "Tank",
        effect: "Strengthen their resistance to damage",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric",
        duration: "Until they take damage or the scene ends",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The first damage they take is reduced by five.",
        source: "Vampire: The Masquerade Players Guide, page 105"
      },
      {
        name: "TLC",
        effect: "Enhances the blood of animals so it slakes the same as mortal blood",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Animal, Choleric",
        duration: "Permanent",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Killing an animal cannot slake Hunger to zero",
        source: "Vampire: The Masquerade Blood Sigils, page 77"
      },
      {
        name: "Troll the Pious",
        effect: "Cause negatives effects to the religious",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "Changes based on what it is smeared on",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Gives one-dice penalty to most dice pools. Those with True Faith take a two-dice penalty instead and suffer hallucinations",
        source: "Vampire: The Masquerade Blood Sigils, page 78"
      }
    ],
    level4: [
      {
        name: "Airborne Momentum",
        effect: "Achieve flight",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Choleric",
          "Sanguine"
        ],
        duration: "One scene",
        dicePool: "Strength + Alchemy",
        opposingPool: "Strength + Athletics (if resisted)",
        notes: "Can move at running speed and carrying a human-sized mass slows to walking speed. This can only be used by the alchemist.",
        source: "Corebook, page 287"
      },
      {
        name: "Copycat",
        effect: "Turn into an approximate copy of someone",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Choleric",
          "Phlegmatic"
        ],
        duration: "Twenty minutes, possibly up to a scene",
        dicePool: "N/A",
        opposingPool: "Intelligence + Awareness",
        notes: "Those who know the person whose appearance is borrowed can recognise the difference by rolling the Opposing pool against the Distillation roll",
        source: "Blood Sigils, page 78"
      },
      {
        name: "Discipline Channeling",
        effect: "Imbue Ashe with Disciplines",
        cost: "The same as the power channeled",
        origin: "Ashfinders",
        resonance: "N/A",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Must use the Fixatio method. The Thin-bloods develop this formula within the Ashfinders. Concoct Ashe is a prerequisite.",
        source: "Cults of the Blood Gods, page 46"
      },
      {
        name: "Half-Living Conductor",
        effect: "Be immune to, and redirect electrical currents",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Choleric",
          "Sanguine"
        ],
        duration: "One scene, or voluntarily ended",
        dicePool: "Stamina + Alchemy",
        opposingPool: "N/A",
        notes: "Using electricity to attack requires Dexterity + Alchemy. Deals 2 damage, Aggravated to mortals, Superficial to vampires",
        source: "Blood Sigils, page 79"
      },
      {
        name: "Hollow Leg",
        effect: "Poison another Kindred so that they are unable to slake hunger",
        cost: "Free",
        origin: "None",
        resonance: "Non-Resonant Human Blood",
        duration: "One night or until the victim suffers a hunger Frenzy",
        dicePool: "Intelligence + Alchemy",
        opposingPool: "Stamina + Composure",
        notes: "The victim must be tricked, coerced or forced into drinking this.",
        source: "Winter's Teeth, page 10"
      },
      {
        name: "Juice Box",
        effect: "Alters a Formula to be used by any vampire",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "As target Formula",
        duration: "As target Formula",
        dicePool: "As target Formula",
        opposingPool: "As target Formula",
        notes: "Requires Methuselah Blood",
        source: "Gehenna War, page 51"
      },
      {
        name: "Red State",
        effect: "Erases memories of someone's misdeeds",
        cost: "One Rouse Check",
        origin: "None",
        resonance: [
          "Sanguine",
          "Phlegmatic"
        ],
        duration: "Permanent, until target imbibes a choleric Dyscrasia",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Being told of the crime makes no sense to the target",
        source: "Blood Sigils, page 79"
      },
      {
        name: "Short Circuit",
        effect: "Overload the batteries in electronics or electrical equipment",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Melancholic",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This allows for alchemists to touch either the object itself or metal connected and short it out.",
        source: "Players Guide, page 105"
      },
      {
        name: "Toxic Personality",
        effect: "Secrete caustic bile from their pores and orifices",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric",
        duration: "One scene",
        dicePool: "Strength/Dexterity + Alchemy",
        opposingPool: "Dexterity + Alchemy",
        notes: "The alchemist may touch this without being harmed. It can either be used as a physical attack or by making another Rouse Check, spit as a ranged attack.",
        source: "Players Guide, page 105"
      },
      {
        name: "Vitae MSG",
        effect: "Make it hard for vampires to resist feeding off someone",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Sanguine",
        duration: "Once applied to someone, it lasts until dawn, if they survive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Ventrue feeding off someone appointed with this require 1 less Willpower if they aren't in their preferred category.",
        source: "Blood Sigils, page 79"
      }
    ],
    level5: [
      {
        name: "Awaken the Sleeper",
        effect: "Awaken a vampire from torpor",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric or Sanguine",
        duration: "N/A",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Each Distillation style has a unique method of tapping for this elixir.",
        source: "Vampire: The Masquerade Corebook, page 287"
      },
      {
        name: "Beast Mode",
        effect: "Gain the use of 1 Level 5 Potence, Celerity or Fortitude power",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Choleric or Sanguine",
        duration: "One Scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The alchemist must succeed on a Willpower test to avoid Frenzy when consuming this",
        source: "Vampire: The Masquerade Gehenna War, Page 51"
      },
      {
        name: "Da Bomb",
        effect: "Turn a mortal into a walking time bomb",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Sanguine",
        duration: "One week, or until activated",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Only works when imbibed into mortals.",
        source: "Vampire: The Masquerade Tattered Façade, page 108"
      },
      {
        name: "Flowering Amaranth",
        effect: "Share diablerie with other thin-bloods.",
        cost: "One Rouse Check made by each participant",
        origin: "None",
        resonance: "N/A",
        duration: "Used for the Diablerie",
        dicePool: "Resolve + Alchemy",
        opposingPool: "Willpower + Blood Potency",
        notes: "Upon a win they gain a Discipline as if a full-blooded though they cannot level it, they do no gain generation and still lose 1 Humanity. They also gain the black-veined aura of Diablerie.",
        source: "Vampire: The Masquerade Players Guide, page 106"
      },
      {
        name: "Moment of Clarity",
        effect: "Harness the power of the Beast to support them.",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Add four dice to Mental Skill pools, Discipline Skill pools, and to Mental resistance checks when Disciplines are used on them. Immune to Messy Criticals and Frenzy.",
        source: "Vampire: The Masquerade Players Guide, page 106"
      },
      {
        name: "Saturn's Flux",
        effect: "Break Blood-bonds",
        cost: "One Rouse Check",
        origin: "None",
        resonance: "Phlegmatic",
        duration: "Effect kicks in one day after ingestion",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Removing the Blood-bond is painful but Mortals take no damage. Kindred have to take Aggravated damage to expel.",
        source: "Vampire: The Masquerade Blood Sigils, page 80"
      }
    ]
  },
  counterfeitDisciplines: {
    level1: {
      effect: "Counterfeit a one-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      source: "Corebook, page 285"
    },
    level2: {
      effect: "Counterfeit a two-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      source: "Corebook, page 287"
    },
    level3: {
      effect: "Counterfeit a two-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      notes: "The same as the power channeled",
      source: "Vampire: The Masquerade Corebook, page 287"
    },
    level4: {
      effect: "Counterfeit a four-dot Discipline",
      cost: "The same as the power channeled",
      duration: "The same as the power channeled",
      dicePool: "The same as the power channeled",
      opposingPool: "The same as the power channeled",
      notes: "Requires a drop of vitae from a vampire of a matching clan or who possesses the Discipline.",
      source: "Corebook, page 287"
    }
  }
};

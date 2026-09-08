export const bloodSorceryRituals = {
  name: "Blood Sorcery Rituals",
  generalRules: {
    baseCost: "One Rouse Check",
    castingTime: "Five minutes per level",
    ritualRoll: "Intelligence + Blood Sorcery",
    difficulty: "Ritual Level + 1",
    learningTime: "Square of ritual level in weeks",
    additionalNotes: [
      "Rituals that benefit the recipient can only be cast onto the sorcerer themselves unless otherwise stated",
      "Many call for necessary ingredients, but may only require blood and concentration",
      "Good teacher or a good grimoire may lessen the time needed to learn a ritual",
      "It is possible to create new rituals through an extended test that may take in game months to complete"
    ]
  },
  rituals: {
    level1: [
      {
        name: "Astromancy",
        effect: "Learn information such as Skills, Desires and Convictions about someone",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "If you know the correct Birth or Embrace date, you can add 1 die to the Ritual pool. This does not stack if you know both.",
        source: "Blood Sigils, page 59"
      },
      {
        name: "Beelzebeatit",
        effect: "Animals avoid the area",
        cost: "One Rouse Check",
        origin: "Sabbat",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Nothing prevents directed or controlled creatures from entering.",
        source: "Sabbat, page 50"
      },
      {
        name: "Bind the Accusing Tongue",
        effect: "Prevent someone from communicating something negative about the caster",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Victim can break free by rolling Composure + Resolve.",
        source: "Blood Sigils, page 60"
      },
      {
        name: "Blood Apocrypha",
        effect: "Embed messages into Blood or vessels",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The first person receives the message if they are the intended recipient or if they have A Taste For Blood.",
        source: "Book of Nod Apocrypha, page 34"
      },
      {
        name: "Blood Walk",
        effect: "Learn characters generation, name, and sire",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Requires one Rouse Check from the subject to be performed.",
        source: "Corebook, page 276"
      },
      {
        name: "Bloody Message",
        effect: "Make a message appear to a specific type of person then disappear once read",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Make the Ritual Roll when enchanting the surface.",
        source: "Let the Streets Run Red, page 77"
      },
      {
        name: "Blood to Water",
        effect: "Turn blood into water",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Removes all traces of blood.",
        source: "Gehenna War, page 48"
      },
      {
        name: "Clinging of the Insect",
        effect: "Cling to walls like an insect",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The user must cling with both their hands and feet.",
        source: "Corebook, page 276"
      },
      {
        name: "Coax the Garden",
        effect: "Use plant life to defend",
        cost: "One Rouse Check",
        origin: "Bahari",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The plants will target anyone who isn't the caster.",
        source: "Cults of the Blood Gods, page 55"
      },
      {
        name: "Craft Bloodstone",
        effect: "Craft a tracking stone",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "A caster may have up to as many stones as they have Resolve.",
        source: "Corebook, page 276"
      },
      {
        name: "Douse the Fear",
        effect: "Remove their fear of fire temporarily",
        cost: "One Rouse Check",
        origin: "Church of Caine",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The power wears off once the scene ends.",
        source: "Cults of the Blood Gods, page 67"
      },
      {
        name: "Enrich the Blood",
        effect: "Make a mortal more nourishing",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "This does not work on Kindred vitae.",
        source: "Forbidden Religions, page 76"
      },
      {
        name: "Herd Ward (Minor)",
        effect: "Ward a single kine of a herd to prevent unauthorized feeding",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Make the Ritual Roll when someone else feeds off the herd.",
        source: "Let the Streets Run Red, page 77"
      },
      {
        name: "Letter Ward",
        effect: "Place a ward on a letter",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Make the Ritual Roll if anyone other than the intended recipient opens it.",
        source: "Let the Streets Run Red, page 77"
      },
      {
        name: "Revealing the Crimson Trail",
        effect: "Reveal traces of spilled blood",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Very old traces require a Resolve + Awareness test.",
        source: "Gehenna War, page 48"
      },
      {
        name: "Seal the Brand",
        effect: "Make a tattoo permanent on a vampire",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The process inflicts 1 Superficial damage",
        source: "Players Guide, page 99"
      },
      {
        name: "Shared Memory",
        effect: "Observe another's Memoriam",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Participants observe the events and can offer advice but cannot directly influence the events.",
        source: "In Memoriam, page 145"
      },
      {
        name: "Wake with Evening's Freshness",
        effect: "Awakens the caster at any signs of danger during day sleep",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Do not make the Ritual roll until true danger appears.",
        source: "Corebook, page 276"
      },
      {
        name: "Ward Against Ghouls",
        effect: "Protect themselves against Ghouls",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards.",
        source: "Corebook, page 277"
      },
      {
        name: "Blood Missive",
        effect: "Send messages through blood",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The first person to taste the blood receives it as if it was intended for them or they possess A Taste for Blood.",
        source: "Live from the Succubus Club, page 29"
      },
      {
        name: "Sanguine Tidings",
        effect: "Make a message appear on a mirror when a type of person comes nearby",
        cost: "N/A",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "It disappears from the mirror once it's been read once.",
        source: "Live from the Succubus Club, page 29"
      },
      {
        name: "Preservation",
        effect: "Preserve an item from the passage of time",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Only preserves the item from age, ambient elements, and minor accidents. Intentional damage still affects the item.",
        source: "Courts of the Damned, pages 215-216"
      },
      {
        name: "Rite of Introduction",
        effect: "Magically broadcast an introduction and identification to any caster of the Foundation of the Chantry Ritual in the same city",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Caster can withhold but not alter elements of their broadcast.",
        source: "Courts of the Damned, page 216"
      }
    ],
    level2: [
      {
        name: "As Fog on Water",
        effect: "Walk on water silently",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "This can be ended early or kept to allow them to walk on water for the rest of the night.",
        source: "Players Guide, page 100"
      },
      {
        name: "Calling the Aura's Remnants",
        effect: "Speak with the residual aura of someone who has died",
        cost: "One Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The aura only has memories up to the time of death.",
        source: "Chicago Folios, page 171"
      },
      {
        name: "Calix Secretus",
        effect: "Store vitae for a later use",
        cost: "One Rouse Check plus additional to be stored",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Two Rouse Checks stored will slake one Hunger.",
        source: "Players Guide, page 100"
      },
      {
        name: "Communicate with Kindred Sire",
        effect: "Creates a long-distance telepathic link between Sire and Childe",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Major disturbance on either side breaks the connection.",
        source: "Corebook, page 277"
      },
      {
        name: "Craftmaster",
        effect: "Temporarily gain dots and speciality in certain skills (Academics, Craft, Performance or Science)",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Dots replace any skill that caster already has but gain an extra die if they already have the speciality. On a total failure, caster takes Aggravated Damage.",
        source: "Blood Sigils, page 62"
      },
      {
        name: "Depths of Nightmare",
        effect: "Curse someone with nightmares that cause Willpower Damage, which can't be healed during the Ritual's duration",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "On a total failure, the victim has pleasant dreams and is pointed towards the caster.",
        source: "Blood Sigils, page 62"
      },
      {
        name: "Elemental Grasp",
        effect: "Command your chosen element to interfere with a target",
        cost: "One Rouse Check",
        origin: "Koldunic Sorcery",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Target takes Superficial Health Damage and must make an appropriate roll to continue. Caster gains one die to their Ritual pool if the element is already active, like water during a flood.",
        source: "Blood Sigils, page 62"
      },
      {
        name: "Enhance Dyscrasia",
        effect: "Allow multiple Kindred to feed from one Dyscrasia without destroying it",
        cost: "One Rouse Check",
        origin: "Penny Dinning Club",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Usually, they will use Enrich the Blood first.",
        source: "Forbidden Religions, page 77"
      },
      {
        name: "Eyes of Babel",
        effect: "By consuming the eyes and tongue of another, they gain the ability to read and speak any language known by the victim",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "This Ritual may incur Stains.",
        source: "Corebook, page 277"
      },
      {
        name: "Illuminate Trail of Prey",
        effect: "Allows the caster to follow the trail of a specific person",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The victim's face must be known by the caster.",
        source: "Corebook, page 277"
      },
      {
        name: "Le Sang de l'Amour",
        effect: "Create a connection between two people, providing they desire each other at the time the Ritual is cast",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Both participants can use Resolve + Awareness to get an estimation of where the other is. On a total failure of the initial Ritual, this roll disorients them and their Composure is temporarily reduced by one.",
        source: "Blood Sigils, page 63"
      },
      {
        name: "Soporific Touch",
        effect: "Convert a dose of vitae to weaken their victim against mundane manipulations or mind-altering Disciplines",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The Ritual Roll is made after the victim makes contact and is contested against with Stamina + Resolve.",
        source: "Camarilla, page 168"
      },
      {
        name: "Silentia Mortis",
        effect: "Replicates Silence of Death (Obfuscate ●), which creates a radius of silence",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "If intended for someone other than the caster, they will also have to make their own Rouse Check.",
        source: "Blood Sigils, page 64"
      },
      {
        name: "Shroud of Silence",
        effect: "Prevent sounds from escaping a room",
        cost: "One Rouse Check",
        origin: "The Shepherds of Ur-Shulgi",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Requires vitae from a Kindred who possesses Obfuscate",
        source: "Forbidden Religions, page 23"
      },
      {
        name: "Stolen Memory",
        effect: "Access sire's memories",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Can access memories of grandsire or beyond with Difficulty increase of 2 per generation past their sire.",
        source: "In Memoriam, page 145"
      },
      {
        name: "Tiamat Glistens",
        effect: "Attune yourself to a place of power, like a Furcus",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Caster gains bonuses to Rituals they cast. Only one caster can be attuned to a place of power. If someone else performs the Ritual, the original caster loses their bonus immediately.",
        source: "Blood Sigils, page 64"
      },
      {
        name: "Truth of Blood",
        effect: "The caster can discern truth from lies",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Resolve + Blood Sorcery",
        notes: "The target rolls Composure+Occult to resist. This Ritual cannot get past memory wiping Disciplines.",
        source: "Corebook, page 277"
      },
      {
        name: "Unseen Underground",
        effect: "Become invisible underground",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Immediately ends if they go above ground, or they take hostile actions, otherwise it only lasts for one hour.",
        source: "Fall of London, page 31"
      },
      {
        name: "Viscera Garden",
        effect: "Grow Blood-addicted plants that can consume corpses",
        cost: "One Rouse Check, additional Rouse Check of blood per month",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Can be eaten by Kindred, they do not slake hunger but they stay down. Mortals who ingest a plant are more susceptible to Disciplines.",
        source: "Blood Sigils, page 65"
      },
      {
        name: "Ward against Spirits",
        effect: "Protect themselves against spirits",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards.",
        source: "Corebook, page 277"
      },
      {
        name: "Warding Circle against Ghouls",
        effect: "Protect themselves against Ghouls",
        cost: "Three Rouse Checks",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards.",
        source: "Corebook, page 278"
      },
      {
        name: "Web of Hunger",
        effect: "Avoid the pull of the Beckoning",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Without the dagger, this ritual would be 4th level. With the dagger it can be treated as level 2.",
        source: "Fall of London, page 31"
      }
    ],
    level3: [
      {
        name: "Bladed Hands",
        effect: "Sharpens the user's hands into a weapon",
        cost: "Two Rouse Checks",
        origin: "Milwaukee",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Treated as a light piercing Brawl weapon with a +2 modifier.",
        source: "Chicago Folios, page 174"
      },
      {
        name: "Bloodless Feast",
        effect: "Purify blood, creating a clear blood-like substance",
        cost: "One Rouse Check, possible Stains",
        origin: "The Bloodless Pilgrims",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Those who consume the clear vitae enough are weaker to diablerie.",
        source: "Forbidden Religions, page 67"
      },
      {
        name: "Blood Sigil",
        effect: "Create a tattoo on a Kindred which also contains a message",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Can read the message with a Resolve + Occult roll or by Sense the Unseen (Auspex ●). Caster can remove the Blood Sigil by spending Willpower and touching the tattoo.",
        source: "Blood Sigils, page 66"
      },
      {
        name: "Communal Vigor",
        effect: "A Pack Priest shares their Blood Potency with their pack",
        cost: "One Rouse Check",
        origin: "Sabbat",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The Priest gains three bonus dice on Dominate and Presence tests against packmates.",
        source: "Sabbat, page 50"
      },
      {
        name: "Dagon's Call",
        effect: "The caster can rupture the blood vessels of a victim from afar",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Resolve + Blood Sorcery",
        notes: "The caster can use this up to two additional times, each costing an additional Rouse Check. The opposing roll is Stamina + Resolve.",
        source: "Corebook, page 278"
      },
      {
        name: "Deflection of Wooden Doom",
        effect: "This ritual protects them from being staked",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Do not roll the Ritual Roll until staked.",
        source: "Corebook, page 278"
      },
      {
        name: "Elemental Shelter",
        effect: "Meld with your chosen element, similar to Earth Meld (Protean ●●●)",
        cost: "One Rouse Check",
        origin: "Koldunic Sorcery",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Fire Kolduns must resist terror frenzy before casting this ritual. Koldun's form can be seen with a Wits + Awareness roll or by Sense the Unseen (Auspex ●). If bonded element is removed, such as the fire going out, the Koldun enters torpor.",
        source: "Blood Sigils, page 66"
      },
      {
        name: "Essence of Air",
        effect: "Allows for flight",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The Camarilla frowns upon this Ritual due to its Masquerade dangers.",
        source: "Corebook, page 278"
      },
      {
        name: "Eyes of the Past",
        effect: "See what happened at their current location in the past",
        cost: "One Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "It only holds events within the last five years.",
        source: "Chicago Folios, page 172"
      },
      {
        name: "Fire in the Blood",
        effect: "Create anguish of fire in one's blood to incapacitate",
        cost: "One Rouse Check",
        origin: "Church of Caine",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "A victim can only be affected by this Ritual once per night.",
        source: "Cults of the Blood Gods, page 67"
      },
      {
        name: "Firewalker",
        effect: "Allow themselves and their comrades to become resistant to fire",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "This ritual can be performed on others, but the fingertip removal must all come from the caster.",
        source: "Corebook, page 279"
      },
      {
        name: "Galvanic Ruination",
        effect: "Short out electronics and wiring nearby",
        cost: "One Rouse Check",
        origin: "Sabbat",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Generally, it only affects the range of a warehouse or three-story building, but can be extended by adding 1 Difficulty per additional building.",
        source: "Sabbat, page 51"
      },
      {
        name: "Gentle Mind",
        effect: "Protect the mind of a target against Frenzy",
        cost: "One Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The caster must share blood with another and cannot cast it upon themselves.",
        source: "Chicago Folios, page 172"
      },
      {
        name: "Grim Chrysalis",
        effect: "Create a cocoon out of hardened vitae that heals damage taken",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The cocoon itself is hard and protects the user from outside damage to some extent.",
        source: "Tattered Facade, page 93"
      },
      {
        name: "Haunted House",
        effect: "Make a haven appear as if it's haunted",
        cost: "Three Rouse Checks",
        origin: "Milwaukee",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The effects last for 10 years.",
        source: "Chicago Folios, page 175"
      },
      {
        name: "Herd Ward (Major)",
        effect: "Ward a herd against unauthorized feeding by warding the door to protect multiple people within",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Make the Ritual Roll when someone else feeds off the herd.",
        source: "Let the Streets Run Red, page 77"
      },
      {
        name: "Illusion of Peaceful Death",
        effect: "Make a corpse appear as if it'd died a natural death",
        cost: "One Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The body must have at least half of the body's blood to succeed.",
        source: "Chicago Folios, page 172"
      },
      {
        name: "Illusion of Perfection",
        effect: "Become a nondescript person to blend into crowds",
        cost: "One Rouse Check",
        origin: "Milwaukee",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Similar to the ability Mask of a Thousand Faces.",
        source: "Chicago Folios, page 174"
      },
      {
        name: "Nepenthe",
        effect: "Create a draught that can remove Stains, but prolonged use of it can make those Stains permanent",
        cost: "One Rouse check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Using Nepenthe two sessions in a row causes one Stain to become permanent. This is cumulative, e.g. four sessions gives two permanent Stains.",
        source: "Blood Sigils, page 66"
      },
      {
        name: "One with the Blade",
        effect: "Claim ownership of a weapon and protect it from damage",
        cost: "One or more Rouse Checks, enough to submerge the weapon.",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Only one weapon can hold this ritual at a time.",
        source: "Camarilla, page 168"
      },
      {
        name: "Sanguine Watcher",
        effect: "Create a small rat out of vitae",
        cost: "One Rouse Check",
        origin: "Milwaukee",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The caster can send the rat to go where they instruct to observe or steal, but the instructions must be very explicit.",
        source: "Chicago Folios, page 174"
      },
      {
        name: "Seeing with the Sky's Eyes",
        effect: "Observe a target from above",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Player can ask one question about location and surrounding per success roll. Critical Wins give 3 extra questions and can gain information about Ambitions, Desires, Convictions and Humanity.",
        source: "Blood Sigils, page 67"
      },
      {
        name: "Seeking Tiamat",
        effect: "Find veins of the Earth",
        cost: "One Rouse Check and Aggravated Health damage",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Critical wins discover the closest vein and points towards 2 Furcae on that vein",
        source: "Blood Sigils, page 68"
      },
      {
        name: "Sleep of Judas",
        effect: "Incapacitate a vampire by drugging them",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Make the Ritual Roll when the target is drugged.",
        source: "Let the Streets Run Red, page 77"
      },
      {
        name: "Soul of the Hemonculus",
        effect: "Create a Hemonculus, a shrivelled, smaller and weaker version of the caster, who must obey your every command",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Immune to the sun but cannot be Embraced, made into a ghoul or have a Blood Bond. Vampires slake no Hunger if they drink from it.",
        source: "Blood Sigils, page 68"
      },
      {
        name: "Stone of the True Form",
        effect: "Dispel illusions and creatures altered via Disciplines and Rituals",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Must throw the stone with Dexterity + Athletics. The target resists the Ritual with Resolve + Occult. On a win, illusions are dispelled, shapeshifters are painfully returned to their original form and beings made through Disciplines, like a Vozhd, are separated to their original components.",
        source: "Blood Sigils, page 68"
      },
      {
        name: "The Unseen Change",
        effect: "Lupines entering the area are forced into Wolf Form",
        cost: "Three Rouse Checks",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "If they do not succeed on the Ritual Roll against a contested Willpower test, they enter in Lupus Form.",
        source: "Chicago Folios, page 172"
      },
      {
        name: "Trespass",
        effect: "Allows the caster to easily sneak around a building, such as by flowing through crevices that blood can fit through",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Unlike Incorporeal Passage, the caster can be attacked providing they are able to notice the caster.",
        source: "Blood Sigils, page 69"
      },
      {
        name: "Viral Haruspex",
        effect: "Gather information from everyone in an area suffering from a certain disease",
        cost: "One Rouse Check",
        origin: "Plague Oracles",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Caster must drink from someone with the disease within 24 hours before casting this Ritual.",
        source: "Blood Sigils, page 69"
      },
      {
        name: "Ward against Lupines",
        effect: "Protects themselves against Werewolves",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards.",
        source: "Corebook, page 279"
      },
      {
        name: "Warding Circle against Spirits",
        effect: "Protect themselves against spirits",
        cost: "Three Rouse Checks",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards.",
        source: "Corebook, page 279"
      }
    ],
    level4: [
      {
        name: "Balm of Bathory",
        effect: "Make a balm from the blood of a young mortal to make the user appear younger",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The balm gives the user a temporary Stunning (••••) Merit. However, each subsequent use takes double the amount of mortal blood as the last batch.",
        source: "Tattered Facade, page 94"
      },
      {
        name: "Compel the Inanimate",
        effect: "Give a simple command to an inanimate object which it follows a few minutes later",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The caster must remain in the same general area as the object. Sense the Unseen (Auspex ●) can detect the caster with a Wits + Auspex vs. caster's Composure + Blood Sorcery roll.",
        source: "Blood Sigils, page 69"
      },
      {
        name: "Defense of the Sacred Haven",
        effect: "Protect a haven with mystical darkness from the sun",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The Ritual roll is made once the sun rises.",
        source: "Corebook, page 279"
      },
      {
        name: "Egregore Consultation",
        effect: "By hosting an illness, the caster is able to enhance Skills by access the experiences of everyone with that illness in the area",
        cost: "One Rouse Check",
        origin: "Plague Oracles",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "If a Skill is very common in an area, like Finance in New York, the caster can get extra die to their roll, at a maximum of two.",
        source: "Blood Sigils, page 70"
      },
      {
        name: "Eyes of the Nighthawk",
        effect: "Take control of a carnivorous bird and act through them",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The user can use most non-physical Disciplines through the bird.",
        source: "Corebook, page 279"
      },
      {
        name: "Feast of Ashes",
        effect: "Stop another Kindred from drinking blood for one night",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The ritual roll is made against the victim's Resolve + Willpower. The victim can eat the ashes to slake hunger but only down to 3.",
        source: "Players Guide, page 101"
      },
      {
        name: "Guided Memory",
        effect: "With the Blood of another vampire, experience their memories guided by them",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "This can be used to unlock Discipline powers, Merits and other gifts.",
        source: "Players Guide, page 101"
      },
      {
        name: "Incorporeal Passage",
        effect: "The caster's form becomes ghost-like",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "They may only interact through speech and sight.",
        source: "Corebook, page 280"
      },
      {
        name: "Innocence of the Child's Heart",
        effect: "Put up a blockade against Scry the Soul to hide diablerie and other vampiric traits",
        cost: "One Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "There's no record of Nicolai sharing this ritual with his fellow Tremere and is only learned by capturing his notes or by ST discretion.",
        source: "Chicago Folios, page 172"
      },
      {
        name: "Innocence's Veil",
        effect: "Temporarily make traces of Diablerie undetectable",
        cost: "N/A",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Cannot be detected by A Taste for Blood or Scry The Soul",
        source: "Gehenna War, page 48"
      },
      {
        name: "Invisible Chains of Binding",
        effect: "Confine a victim to a single spot",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The victim is unable to move from that spot for one hour per success in the margin unless the chain is destroyed or removed.",
        source: "Players Guide, page 102"
      },
      {
        name: "Land's Sustenance",
        effect: "Feed from a place of power, turning it into a place of suffering where injuries become more severe",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Lasts until end of the Story before needing to be renewed. Once per Session, they can automatically pass a number of Rouse Checks equal to their margin on the Ritual roll.",
        source: "Blood Sigils, page 70"
      },
      {
        name: "Rending the Sweet Earth",
        effect: "Pull a vampire from the earth who is using Earth Meld",
        cost: "One Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The ritual automatically awakens the other vampire unless they are in torpor or the Ritual Roll is a Critical Win.",
        source: "Chicago Folios, page 173"
      },
      {
        name: "Riding the Earth's Vein",
        effect: "Travel from one furcus to another random one",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The caster has no control over where they end up. This Ritual is one way and only activates where it was first cast",
        source: "Blood Sigils, page 71"
      },
      {
        name: "Protean Curse",
        effect: "Transform a target into a bat similar to Metamorphosis",
        cost: "Two Rouse Check",
        origin: "Chicago",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "This cannot be used on the caster.",
        source: "Chicago Folios, page 173"
      },
      {
        name: "Ward against Cainites",
        effect: "Protects themselves against Kindred",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards. A vampire examining this ward may read the name of the caster with an Intelligence + Auspex vs Intelligence + Blood Sorcery roll.",
        source: "Corebook, page 280"
      },
      {
        name: "Warding Circle against Lupines",
        effect: "Protects themselves against Werewolves",
        cost: "Three Rouse Checks",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards.",
        source: "Corebook, page 280"
      },
      {
        name: "Seek the Gathered Vitae",
        effect: "Discover gatherings of Kindred with a collective Blood Potency of 13 or higher",
        cost: "N/A",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Ghouls count as 1/4th and Duskborn count as 1/2.",
        source: "Live from the Succubus Club, page 29"
      }
    ],
    level5: [
      {
        name: "Antebrachia Ignium",
        effect: "Set their arms on fire",
        cost: "One Rouse Check",
        origin: "Church of Caine",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The user is only resistant to fire on their arms.",
        source: "Cults of the Blood Gods, page 67"
      },
      {
        name: "Atrocity's Release",
        effect: "Reverses the effects of Diablerie",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Can be resisted with a Resolve + Blood Sorcery test.",
        source: "Gehenna War, page 49"
      },
      {
        name: "Dominion",
        effect: "Stop the use of Animalism, Auspex, Dominate, and Presence within a building",
        cost: "One Rouse Check or more",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "The area of effect is determined by the amount of Rouse Checks.",
        source: "Players Guide, page 103"
      },
      {
        name: "Eden's Bounty",
        effect: "Drain blood from nearby creatures",
        cost: "One Rouse Check, possible Stains",
        origin: "Bahari",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "For the remainder of the chapter, mortals suffer 1 die penalty to Physical rolls and take 1 Aggravated health damage.",
        source: "Cults of the Blood Gods, page 56"
      },
      {
        name: "Elemental Attack",
        effect: "The Koldun commands their chosen element to attack a foe. This can be a Chain Ritual",
        cost: "One Rouse Check",
        origin: "Koldunic Sorcery",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "If their element is already active, like Air during a storm, they get an extra die to their Ritual pool. If Chained with Elemental Grasp and Tiamat Glistens, the Ritual becomes a natural disaster, e.g. Tornado, Magma Flow or Tsunami",
        source: "Blood Sigils, page 71"
      },
      {
        name: "Escape to True Sanctuary",
        effect: "Create a one-way portal",
        cost: "In total this ritual requires twelve Rouse Checks.",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "A caster may only have one set of these circles active at a time.",
        source: "Corebook, page 280"
      },
      {
        name: "Fisher King",
        effect: "Makes the caster one with their land, giving them access to it's secrets. This can be a Chain Ritual",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Can make a Wits + Streetwise or Survival roll to ask questions about the land. The caster can ask one extra question per session. This Ritual lasts until the end of the story. If Chained with Land's Sustenance and Compel the Inanimate, the casters gain complete control over the land and the casters can heal a total of 5 Aggravated damage each night",
        source: "Blood Sigils, page 72"
      },
      {
        name: "Heart of Stone",
        effect: "Turns their heart to stone preventing staking. The Caster also suffers from emotional detachment, taking penalties to Remorse or active Social-related rolls",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "They are unable to use Presence during this ritual's use but gain a bonus when resisting its use on them.",
        source: "Corebook, page 281"
      },
      {
        name: "Reawakened Vigor",
        effect: "Regain Blood Potency faster after extended torpor",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Inflicts aggravated damage to anyone other than the caster.",
        source: "Gehenna War, page 49"
      },
      {
        name: "Shaft of Belated Dissolution",
        effect: "A stake that will seek out another vampire's heart and will cause final death if it finds it",
        cost: "Two Rouse Checks",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Even if an attack with this stake fails to hit the heart, if it hits, a splinter will break and move towards the heart to eradicate the victim.",
        source: "Corebook, page 281"
      },
      {
        name: "Simulacrum Gate",
        effect: "Create a gate to teleport multiple vampires",
        cost: "One Rouse Check, possible Stains",
        origin: "Sabbat",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "There is only one of these known to exist currently.",
        source: "Sabbat, page 51"
      },
      {
        name: "Transferring the Soul",
        effect: "Take over a body from diablerie",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery and Intelligence + Oblivion",
        notes: "This ritual requires another Kindred who knows Oblivion ●●●●●. It is possible to be done by one Kindred who possess level 5 in both powers.",
        source: "Fall of London, page 11-13"
      },
      {
        name: "Warding Circle against Cainites",
        effect: "Protects themselves against Kindred",
        cost: "Three Rouse Checks",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Uses standard rules for Wards.",
        source: "Corebook, page 282"
      },
      {
        name: "Foundation of the Chantry",
        effect: "Make a point of Foundation so the caster and designees can retrieve broadcasts from Rite of Introduction and send responses back",
        cost: "One Rouse Check",
        origin: "None",
        ritualRoll: "Intelligence + Blood Sorcery",
        notes: "Foundation is linked to a Vein of the Earth. Designees must be present to also receive messages. Responses may withhold, but not alter information.",
        source: "Courts of the Damned, pages 216-217"
      }
    ]
  },
  chainRituals: {
    elementalChain: {
      description: "Chain of Elemental Grasp, Tiamat Glistens, and Elemental Attack",
      effect: "Creates a natural disaster (e.g. Tornado, Magma Flow or Tsunami)",
      requirements: [
        "Elemental Grasp (Level 2)",
        "Tiamat Glistens (Level 2)",
        "Elemental Attack (Level 5)"
      ]
    },
    landChain: {
      description: "Chain of Land's Sustenance, Compel the Inanimate, and Fisher King",
      effect: "Gain complete control over the land and heal 5 Aggravated damage each night",
      requirements: [
        "Land's Sustenance (Level 4)",
        "Compel the Inanimate (Level 4)",
        "Fisher King (Level 5)"
      ]
    }
  }
};

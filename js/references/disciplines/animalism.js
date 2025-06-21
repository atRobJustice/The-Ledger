// Animalism Discipline Data
const animalism = {
    name: "Animalism",
    nicknames: ["Doolittling", "Taming", "Bestiae Sermo"],
    affinity: ["Gangrel", "Nosferatu", "Ravnos", "Tzimisce"],
    type: "Mental",
    threat: "Low to Medium",
    resonance: "Animal Blood",
    overview: "Animalism allows Kindred to communicate with, control, or feed more efficiently on animals. It also lets them act on the inner Beast of other vampires. The power is most effective on predators, and in cases where it's being used on herbivores increases the Difficulty of skills rolls by one.",
    powers: {
        level1: [
            {
                name: "Bond Famulus",
                effect: "Create an enhanced animal companion",
                cost: "Feed the animal a Rouse Check of the vampire's blood on three different nights",
                prerequisite: "None",
                amalgam: "No",
                duration: "Only death releases the famulus",
                dicePool: "Charisma + Animal Ken",
                opposingPool: "N/A",
                notes: "Vampires may only have one famulus but you can make animal ghouls without this",
                source: "Vampire: The Masquerade Corebook, page 245"
            },
            {
                name: "Sense the Beast",
                effect: "Sense hostility and supernatural traits",
                cost: "Free",
                prerequisite: "None",
                amalgam: "No",
                duration: "Passive",
                dicePool: "Resolve + Animalism",
                opposingPool: "Composure + Subterfuge",
                notes: "This power can also be used actively",
                source: "Vampire: The Masquerade Corebook, page 245"
            }
        ],
        level2: [
            {
                name: "Animal Messenger",
                effect: "Use a Famulus to send a message to someone",
                cost: "One Rouse Check per night",
                prerequisite: "None",
                amalgam: "Auspex ●",
                duration: "One or more nights based on how long it takes to search",
                dicePool: "None",
                opposingPool: "None",
                notes: "The Famulus must test Resolve + Streetwise/Survival if target's location is unknown against a diff 2 or Intelligence + Streetwise/Survival if the target is actively hiding",
                source: "Vampire: The Masquerade Players Guide, page 69"
            },
            {
                name: "Atavism",
                effect: "Revert animals to their base and primal instincts",
                cost: "One Rouse Check",
                prerequisite: "None",
                amalgam: "No",
                duration: "Number of rounds equal to margin +1 or entire scene if it's a Critical win",
                dicePool: "Composure + Animalism",
                opposingPool: "N/A",
                notes: "The target must be able to sense the user for this power to work",
                source: "Vampire: The Masquerade Winter's Teeth #3"
            },
            {
                name: "Feral Whispers",
                effect: "Two-way communication with animals or summoning",
                cost: "One Rouse Check per type of animal",
                prerequisite: "None",
                amalgam: "No",
                duration: "One scene",
                dicePool: "Manipulation/Charisma + Animalism",
                opposingPool: "N/A",
                notes: "The cost is free if used on their Famulus",
                source: "Vampire: The Masquerade Corebook, page 246"
            }
        ],
        level3: [
            {
                name: "Messenger's Command",
                effect: "Use Compel or Mesmerize through a Famulus",
                cost: "None",
                prerequisite: "Animal Messenger and Compel or Mesmerize",
                amalgam: "Dominate ●",
                duration: "See Animal Messenger",
                dicePool: "See Compel or Mesmerize",
                opposingPool: "See Compel or Mesmerize",
                notes: "Dominate rating cannot exceed the Animalism rating",
                source: "Vampire: The Masquerade Players Guide, page 69"
            },
            {
                name: "Animal Succulence",
                effect: "Slake additional hunger from animals and counts Blood Potency as 2 levels lower in regards to slaking penalties",
                cost: "Free",
                prerequisite: "None",
                amalgam: "No",
                duration: "Passive",
                dicePool: "N/A",
                opposingPool: "N/A",
                notes: "This will never let the character slake to 0",
                source: "Vampire: The Masquerade Corebook, page 246"
            },
            {
                name: "Plague of Beasts",
                effect: "Mark an individual as a target of animal attention",
                cost: "One Rouse Check",
                prerequisite: "None",
                amalgam: "No",
                duration: "One Night",
                dicePool: "Manipulation + Animalism",
                opposingPool: "Composure + Animal Ken",
                notes: "The target takes the margin of the win as a penalty against Skill pools except Physical, this also makes them easier to track down",
                source: "Vampire: The Masquerade Players Guide, page 69"
            },
            {
                name: "Quell the Beast",
                effect: "Force a vampire's beast to slumber or make a mortal lethargic",
                cost: "One Rouse Check",
                prerequisite: "None",
                amalgam: "No",
                duration: "One scene",
                dicePool: "Charisma + Animalism",
                opposingPool: "Stamina + Resolve",
                notes: "Against Vampires this lasts several turns equal to test margin +1",
                source: "Vampire: The Masquerade Corebook, page 246"
            },
            {
                name: "Scent of Prey",
                effect: "Track a mortal down who has witnessed a masquerade breach",
                cost: "One Rouse Check",
                prerequisite: "None",
                amalgam: "No",
                duration: "One scene",
                dicePool: "Resolve + Animalism",
                opposingPool: "N/A",
                notes: "It lasts one night if Critical Win",
                source: "Vampire: The Masquerade Sabbat: The Black Hand, page 47"
            },
            {
                name: "Unliving Hive",
                effect: "Extends Animalism influence to swarms of insects",
                cost: "None",
                prerequisite: "None",
                amalgam: "Obfuscate ●●",
                duration: "Passive",
                dicePool: "N/A",
                opposingPool: "N/A",
                notes: "Swarms are treated as single creatures",
                source: "Vampire: The Masquerade Corebook, page 246"
            }
        ],
        level4: [
            {
                name: "Subsume the Spirit",
                effect: "Possess the body of an animal",
                cost: "One Rouse Check",
                prerequisite: "None",
                amalgam: "No",
                duration: "One scene / Indefinitely",
                dicePool: "Manipulation + Animalism",
                opposingPool: "N/A",
                notes: "The cost is free if used on their Famulus",
                source: "Vampire: The Masquerade Corebook, page 247"
            },
            {
                name: "Sway the Flock",
                effect: "Influence animals within an area to behave a certain way",
                cost: "One or more Rouse Checks",
                prerequisite: "None",
                amalgam: "No",
                duration: "One night",
                dicePool: "Composure + Animalism",
                opposingPool: "N/A",
                notes: "The amount of successes determine how influenced the animals are, the Discipline's range can be increased per Rouse Check",
                source: "Vampire: The Masquerade Players Guide, page 69"
            }
        ],
        level5: [
            {
                name: "Animal Dominion",
                effect: "Command flocks or packs of animals",
                cost: "Two Rouse Checks",
                prerequisite: "None",
                amalgam: "No",
                duration: "One scene or when the directive is fulfilled",
                dicePool: "Charisma + Animalism",
                opposingPool: "N/A",
                notes: "This power does not summon animals, instead utilizing those already present",
                source: "Vampire: The Masquerade Corebook, page 247"
            },
            {
                name: "Coax the Bestial Temper",
                effect: "Either increase or decrease the Difficulty to resist Frenzy for vampires nearby",
                cost: "One Rouse Check",
                prerequisite: "None",
                amalgam: "No",
                duration: "As long as the user keeps humming",
                dicePool: "Manipulation + Animalism",
                opposingPool: "N/A",
                notes: "Each success of margin increases or decreases the difficulty",
                source: "Vampire: The Masquerade Players Guide, page 70"
            },
            {
                name: "Drawing Out the Beast",
                effect: "Transfer their terror or fury frenzy to a nearby victim",
                cost: "One Rouse Check",
                prerequisite: "None",
                amalgam: "No",
                duration: "Frenzy Duration",
                dicePool: "Wits + Animalism",
                opposingPool: "Composure + Resolve",
                notes: "This power cannot transfer Hunger Frenzy",
                source: "Vampire: The Masquerade Corebook, page 247"
            },
            {
                name: "Spirit Walk",
                effect: "Extends Subsume the Spirit to transfer the vampire's consciousness from one animal to another without retreating to their own body",
                cost: "None",
                prerequisite: "Subsume the Spirit",
                amalgam: "No",
                duration: "Indefinite",
                dicePool: "N/A",
                opposingPool: "N/A",
                notes: "The duration is as though a critical success was rolled",
                source: "Gehenna War, page 46"
            }
        ]
    },
    amalgams: [
        {
            name: "Enduring Beasts",
            discipline: "Fortitude",
            level: "●●",
            animalismRequired: "●",
            effect: "Share the vampire's toughness with animals",
            cost: "One Rouse Check, Free if Famulus",
            dicePool: "Stamina + Animalism (If not Famulus)",
            source: "Vampire: The Masquerade Corebook, page 259"
        },
        {
            name: "Ghost's Passing",
            discipline: "Obfuscate",
            level: "●●",
            animalismRequired: "●",
            effect: "Aid animals in hiding their steps against mundane tracking",
            cost: "One Rouse Check",
            dicePool: "N/A",
            source: "Vampire: The Masquerade Forbidden Religions, page 18"
        },
        {
            name: "Eyes of Beasts",
            discipline: "Auspex",
            level: "●●●",
            animalismRequired: "●●",
            effect: "Share the senses of animals",
            cost: "One Rouse Check",
            dicePool: "N/A",
            source: "Vampire: The Masquerade Fall of London, page 148"
        },
        {
            name: "One with the Land",
            discipline: "Protean",
            level: "●●●●●",
            animalismRequired: "●●",
            effect: "Sink into the earth of their Domain",
            cost: "Two Rouse Checks",
            dicePool: "N/A",
            source: "Vampire: The Masquerade Companion, page 28"
        }
    ]
};
window.animalism = animalism; 
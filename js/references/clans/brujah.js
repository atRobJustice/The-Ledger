const brujah = {
  name: "Brujah",
  nicknames: ["The Learned Clan", "Rabble", "Punks", "Hipsters", "Prometheans", "Rebels", "Philosopher-Kings", "Hellenes"],
  disciplines: ["Celerity", "Potence", "Presence"],
  bane: {
    name: "Violent Temper",
    description: "A rage is simmering in the back of the mind with a Brujah with the slightest provocation able to send them into a frenzied rage. Subtracts dice equal to the Bane Severity of the Brujah against Fury Frenzy."
  },
  variantBane: {
    name: "Violence",
    description: "When a messy critical occurs as the result of any Skill test outside of combat, a Brujah vampire causes damage to the subject of their interaction equal to their Bane Severity, in addition to any other result of the Hunger dice. The type of damage is dependent on the situation either physical or mental. The damage is Aggravated unless the player spends a point of Willpower to turn it into Superficial."
  },
  compulsion: {
    name: "Rebellion",
    description: "The Brujah craves to take a stance against those who represent the status quo. This does not relent until they have gone against orders, expectations, or changed someone's mind. During this Compulsion, they suffer a -2 to dice all pools."
  },
  background: {
    description: "The Brujah are a clan of radicals and troublemakers, Embracing those willing to put someone in their place if the situation calls for it. Most see themselves as warriors with a cause, and these Rebels are guided by their passions, strength, and dedication to their ideals — whatever those may be.",
    culture: "Brujah are generally Embraced from the ranks of those who are sympathetic to those who do not back down. Seeking out others who question the status quo and welcome countercultures. From spirited fighters to critical thinkers, the clan is bolstered by their ability to withstand the storm and persevere through hardships. The Brujah are commonly misplaced as the street punks or anarchists who are looking for nothing but trouble. However, this is far from the truth."
  },
  disciplines: {
    celerity: "Allows the Brujah to strike fast and move even faster when the situation becomes too dangerous.",
    potence: "Gives them the strength behind their attacks, bolstering their swings and allowing them to use fists rather than words to sway.",
    presence: "Is never the last resort with a Brujah. Giving them an edge when attempting to use words rather than physical violence to make their point."
  },
  archetypes: {
    undeadActivist: "Death didn't stop this Kindred from fighting for their causes, rallying mortals and Kindred alike their aim is to bring down structures of power from within.",
    trollingPunk: "The clan full of its outspoken or physical activists still has those who seek the adrenaline of a fight over than the cause itself. Picking fights with those weaker than them they seek out trouble wherever they can find it. While the rush and payoff from the immediate situation is enough, it never lasts and eventually, those who wish to stop them will begin to appear.",
    carthageDenier: "Carthage, myth or not, lives rent-free in this Kindred's mind. The idea of a mortal and Kindred utopia is something they wish to someday witness. Their connection to the mortal world is greater than the average vampire's, working to unify those who they can.",
    learnedOne: "Unlike other members of their clan, they prefer to devour knowledge rather than crushing skulls. Make no mistake at their raw strength, but it's best used when carrying copious amounts of dusty tomes and artifacts."
  },
  notableCharacters: {
    theoBell: {
      description: "Once a Camarilla member, he defected to the Anarch Movement to eventually cause the death Hardestadt and Pierterzoon.",
      currentStatus: "He has no desire for leadership, but he is tired of bending over for the Ventrue. His actions encouraged Brujah to follow suit and take out Princes, forming Anarch domains with the Gangrel. Despite all he's done, he is still a liaison between Camarilla and Anarchs and acts as a mediator. Taking out Sabbat, Anarch riots and Camarilla's abusive actions."
    },
    tyler: {
      description: "Once known as Patricia of Bollingbroke, she goes by many names since.",
      history: "She changed Kindred society and inspired the Anarch Movement with her revolutionary violence against tyrannical elders and methuselahs.",
      currentStatus: "To this night she still exists, a quiet and studious rebel having taken centuries to reflect on her previous actions and reconcile. Formerly taking residence in Chicago for years, her current whereabouts are unknown as the Beckoning calls her, much to the Chicago Anarchs dismay."
    },
    salvadorGarcia: {
      description: "Garcia was once famous for being the chief ideologue of the Anarch Free states in California and as the killer of the old Prince of Los Angeles.",
      currentStatus: "However, in the modern nights, he is not famous for being a killer or masquerade breacher. It is with the power of ideas his fame has grown again as he travels from domain to domain to stir up the local Anarchs enough so that they are willing to fight for their rights. He talks to young Kindred, help them to see the alternative of settling for the bottom wrung and invigorates them into pushing back against those above them."
    },
    juggler: {
      description: "Once a major Chicago Anarch whose success in recruiting new Anarchs made him both bitter rival to Maldavis and one-time candidate for ruler of Chicago.",
      currentStatus: "He now resides in Gary, Indiana after a series of political defeats. He proclaimed himself Baron of Gary and has run part of the city since. Modius is his other bitter rival often clashing with the Toreador. He has recently disappeared leaving the city to his childe."
    },
    maxwell: {
      description: "Once known in Haiti as Maximilien Rousseau, his name changed to simply Maxwell when freed from slavery and Embraced by his sire.",
      history: "His business and politics allowed him to be Prince of the newly incorporated Chicago in 1837. His rule ended with a loss to Lodin's machination during the Great Chicago Fire. Ousted and forced to flee the city, Maxwell planned from afar, gaining resources and allies as he rebuilt.",
      currentStatus: "During the Lupine attacks, Lodin disappeared, and there was a scramble for the throne, but again Chicago eluded him, failing to seize the city when given the chance. Even with the Brujah leaving the Tower, Maxwell remains Camarilla still planning his next attempt to finally take back Chicago as Prince."
    },
    damien: {
      description: "The forever young Sheriff of Chicago.",
      history: "Once a street orphan who performed for food and money, the teenager attracted the attention of an ancient Brujah who Embraced him and left him. He raided Mafia safehouses, to Capone's chagrin, until he finally was taught about Kindred society by a mentor and joined the Kindred band and Coterie Baby Chorus.",
      currentStatus: "Lupine attack in Chicago shattered his band and left his mentor-less. Years passed as he traveled and performed until he returned to Chicago. He made a deal with Prince Jackson; help his band reform and promote them then he will agree to be Sheriff."
    },
    jeremyMacNeil: {
      description: "An Anarch who galvanized the Kindred of LA for the revolution of 1943 which led to the founding of the Anarch Free States.",
      history: "He along with Garcia fought against the old Prince of Los Angelos. MacNeil was the one to coin the term Baron, though he never took he title.",
      currentStatus: "Currently he keeps a low profile, working as a sweeper of the area."
    },
    anitaWainwright: {
      description: "A community activist turned Kindred.",
      history: "Anita was Embraced by a Black Panther who was her sire and lover. She is an Anarch with national connections and a wide web of support from her activism days both human and Kindred.",
      currentStatus: "When Lupines killed her sire, she threw herself into building a powerbase. She has become a formidable Anarch with contacts in the Anarch Movement and some in the Camarilla. She now eyes Lupines for retribution and taking down the Chicago Camarilla."
    }
  },
  culture: {
    embrace: {
      description: "The Brujah are a clan usually Embraced from the ranks of revolution, counterculture, and those that push against the mainstream.",
      criteria: [
        "Protestors and activists",
        "Sociologists",
        "Learned students",
        "Those that endured great personal loss"
      ],
      note: "Quite a few Brujah choose to mingle with mortals and mortal society, attempting to guide humans through activist, political movements, anti-political movements, and the like. The passion of the Brujah have another side with Embraces where some sires are careless with who they choose going off more passion than logic."
    },
    mortalSociety: {
      description: "No matter which side of the coin they are Embraced from the passion their beast gives them is a curse.",
      challenges: "Their need to rage against something is in their Blood, some become cruel masters when they lose control, and keep fighting no matter how many die under their charge. One could say they are cursed with passion, Many try to channel this rage and passion in human endeavors to varying degrees of success.",
      adaptation: "The clan is not a monolith, no clan is, as they are very individualistic with their own passions, politics, and religions. It is said after 30 or 40 years many Brujah fail to adapt to new cultures being stuck in an era's counterculture. Older Brujah dressed as hippies, goths, aristocrats, bohemians, etc. are a not an uncommon sight to see."
    },
    kindredSociety: {
      description: "Many of the Brujah are viewed only for their might and short temper. Even when there are those among the clan who are skilled talkers and cunning organizers.",
      relationships: "Those that values align with a Brujah's passion will find a Kindred allies ready to fight against whatever is ahead of them. Many Brujah may view their advancement in Kindred affairs linked to mortal ones. In domains dominated by Brujah, one may expect coup attempts, revolts, and ideological battles.",
      rivalries: "The upheaval and challenge to the mainstream is the reason for a rivalry with the Ventrue that is as old as Carthage.",
      coteries: "Though the Kindred may look like loners many of them see a coterie as not only allies but brother-in-arms and family. They usually aim to make the coterie cohesive and pull together, even if their own curse may have at times put them at odds."
    },
    factionalDifferences: {
      anarchs: {
        name: "Prometheans",
        description: "Anarch-aligned Brujah are given more of a reputation for being fiery and shooting first. They don't have as big an emphasis on clan ties and bloodlines."
      },
      camarilla: {
        name: "Hellenes",
        description: "Camarilla-aligned Brujah are called Hellenes and they are reputed to lean more on the scholarly philosopher-kings types in their clan. They follow the more traditional conventions of the Camarilla. Some still find decent posts in cities where enough Hellenes flock."
      }
    }
  },
  exclusiveLoresheets: [
    "Descendant of Tyler",
    "High Clan",
    "Low Clan",
    "Descendant of Menele"
  ]
};
window.brujah = brujah; 
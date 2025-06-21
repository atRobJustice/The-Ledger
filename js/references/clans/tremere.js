const tremere = {
  name: "Tremere",
  nicknames: ["The Broken Clan", "Usurpers", "Warlocks", "Hermetics", "Thaumaturges", "Transgressors", "Blood Mages"],
  disciplines: ["Auspex", "Dominate", "Blood Sorcery"],
  bane: {
    name: "Deficient Blood",
    description: "Before the fall of Vienna, they were defined by their rigid hierarchy of Blood Bonds within the Pyramid. After the fall, their Blood weakened and rejected all prior connections. Tremere are unable to Blood Bond other Kindred, though they can still be Bound by other clans. Tremere can still Blood Bond mortals to do their bidding, but their corrupted vitae must be drunk an additional amount of times equal to their Bane Severity."
  },
  variantBane: {
    name: "Stolen Blood",
    description: "When performing a Blood Surge they need to make Rouse Checks equal to their Bane Severity. If these Rouse Checks increase their Hunger to 5 or higher, they can choose whether to back off their Blood Surge or perform it to then hit Hunger 5 afterward immediately."
  },
  compulsion: {
    name: "Perfectionism",
    description: "Nothing but the best will satisfy them, anything less than exceptional still instills a profound sense of failure. When afflicted by this, the Warlock suffers a two-dice penalty to all dice pools. The penalty is reduced to one die when actions are being repeated and removed entirely on a second repeat. This does not end till they managed to score a critical win on a Skill roll or the scene ends."
  },
  background: {
    description: "The arcane Clan Tremere were once a house of mortal mages who sought immortality but found only undeath. As vampires, they've perfected ways to bend their own Blood to their will, employing their sorceries to master and ensorcel both the mortal and vampire world. Their power makes them valuable, but few vampires trust their scheming ways."
  },
  disciplines: {
    auspex: "Allows the Tremere to perceive the truth from their surroundings, hunting down hidden objects and communicate long distances with others without fear of being heard. When in a pinch they use this power to find a pliable victim to feed from.",
    dominate: "Gives the Warlocks the ability to do anything for knowledge and get away with it. Theft, betrayal, and anything else with lesser ethics are easily covered by manipulating the minds of others. They show little remorse when using this power to feed as well when needed.",
    bloodSorcery: "Grants them the ability to release devastating attacks against their foes, protecting themselves in turn and ease feeding. Some Thaumaturgy uses this power to sap the blood from a mortal's body without physical touch. This expertise in unlocking the secrets of blood makes them a valued if not mistrusted member of the Camarilla."
  },
  archetypes: {
    determinedScholar: "Their desire for power is never quenched as they undertake any task regardless of its peril to seek out scraps of information.",
    witchcraftExpert: "Embraced for their skill in mortal occult, this knowledge has only grown as the Kindred attempts to push their Blood Sorcery beyond its normal limits.",
    eternalDetective: "While knowledge is their goal, they find helping others unravel their mysteries to be their true purpose. Perhaps a detective once in life, they now run their own business to continue to work for other Kindred.",
    nichePodcaster: "When other Kindred may prefer to hide in the shadows, this Kindred works to build a cult of personality online. Dabbling in their dark arts using the mortals who have shown true devotion to them."
  },
  notableCharacters: {
    carna: {
      description: "She was once the Prince of Marseilles and the Primogen of Milwaukee and now has her own splinter cell of Tremere called the House of Carna.",
      achievements: "Her group advocates for the freedom from the Blood Bond against the Pyramid's tyranny and the misogyny of the clan itself. When the Pyramid planned to eradicate Carna, it was raided by the Second Inquisition at the Great Chantry."
    },
    karlSchrekt: {
      description: "Former Justicar who was a legend within his own clan and the Camarilla. Before his embrace in 1235, he hunted vampires and for centuries after that he acted as the tower's weapon against the Sabbat and Anarchs or other menaces.",
      achievements: "He hid or destroyed information regarding the Antediluvians. For as many Disciplines as he gained and as few enemies that survived, he's now one of the eldest Tremere remaining."
    },
    aislingSturbridge: "The New York-based High Regent of the Chantry of the Five Boroughs. She oversee research, operations, tutelage, and safety of the chantries.",
    meerlinda: {
      description: "One of the founders of the clan, she has been missing since the attack on the Vienna Chantry by the Second Inquisition.",
      status: "However, the Praesidium believes that she is still alive, and either in torpor or captured somewhere in Krakow, Rome or Moscow."
    }
  },
  history: {
    origins: "Tremere was once the name of an eight-century Romanian hermetic mage, obsessed with knowledge and power. This obsession allowed him to prolong his lifespan beyond the mortal timeframe, but eventually, his power weakened, and in turn, he became unwilling to accept his mortality.",
    embrace: "From his greed, he instigated terrifying magical experiments which damned him and his followers. Thousands of mortals and hundreds of Kindreds were murdered in the experimentation and ritualistic practices to find the elixir of life. These actions eventually unveiled the curse of Caine, entering him and his followers into an eternity of unlife and hunger, unable to use practice their craft.",
    pyramid: "Tremere and followers were able to use Blood Sorcery to imitate their old magic and organized their newly turned clan. The Tremere were once possibly the most organized clan by virtue of their Pyramid, a strict hierarchy with the Blood Bond and oaths enforcing loyalty so power was concentrated at the top and trickled down. They had ranks and chantries who all answered to the Council of Seven, who sat atop the Pyramid.",
    modernStatus: "In 2008 the Prime Chantry in Vienna was destroyed by the Second Inquisition, and their ability to Blood Bond dissolved, it knocked them from their powerful status to unwelcome Kindred. The Usurpers had few friends from the arrogance of their Pyramid, still, the need for their Blood Sorcery hasn't disappeared."
  },
  houses: {
    tremere: {
      leader: "Karl Schrekt",
      alignment: "Camarilla",
      description: "They remain aligned to the Camarilla sect and loyal to the Pyramid with their traditions. They are still secretive with their knowledge and have high standards for embrace.",
      embrace: "They usually embrace from Intellectuals, academia, occultists, and whoever they believe are worthy of the Blood.",
      structure: "This House keeps the previous organization with standardized feeding practices and even a new Council of Seven. Under each Council member are seven Pontifex who oversee wider operations of a specific field. Head of Chantry is a Regent under them are the apprentices."
    },
    carna: {
      nicknames: ["Witches", "Blood Witches", "Carnines"],
      leader: "Carna",
      description: "A splinter cell created by Carna herself looking to separate herself and her followers from the Blood Bonds of the Pyramid. After the fall of the Pyramid, this group attracts many Anarchs and disenfranchised Camarilla members.",
      practices: "In the modern age, she pushes for the modernization and feminization of Clan Tremere. While they are officially Camarilla aligned, they do have Anarch leanings.",
      embrace: "Those embraced in this house are usually unorthodox by old Pyramid standards: pagans, psychics, and chaos magicians.",
      mission: "Their mission is to expand the research on Blood Sorcery. To this end, the Witches have explored Thin-Blood Alchemy, mortal Wiccans, and reach for a new unified theory of magic."
    },
    goratrix: {
      nicknames: ["Goratricine", "Goratrero", "Goratajo"],
      description: "A cultish Tremere house lead by Goratrix and previously apart of the Sabbat, joining the Camarilla in modern nights.",
      practices: "They are sometimes called traditionalists by other blood sorcerers. The one giving directives to their followers is assumed to Goratrix or someone skillful in Blood sorcery.",
      goals: "The structure currently has breaks in communication, but this house aims to rebuild the Pyramid using Dominate, Presence, and strict obedience in absence of Blood Bonds."
    },
    ipsissimus: {
      description: "A faction the Tremere, existing within the Anarch sect after the fall of the Pyramid.",
      philosophy: "Now free from their bonds of enslavement, they strive to find perfect balance in all things in order to reach enlightenment.",
      status: "They are a well known example Solitarchies keeping to street level politics or marketeers for new magic."
    },
    solitarchies: {
      description: "Any other Tremere chantry that operates outside of one of the three major Houses regardless of sect.",
      status: "When the Prime Chantry fell, some chantry leaders continued to operate, having the foresight to not solely rely on the blood bond for loyalty. These Tremere enclaves develop either by choice or through necessity of losing their main body."
    }
  },
  exclusiveLoresheets: [
    "Descendant of Karl Schrekt",
    "Revenant Family: Ducheski",
    "Occult Artifacts",
    "Praepositor",
    "The Pyramid"
  ]
};
window.tremere = tremere; 
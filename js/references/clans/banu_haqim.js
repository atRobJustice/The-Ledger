const banuHaqim = {
  name: "Banu Haqim",
  nicknames: ["The Clan of the Hunt", "Assassins", "Children of Haqim", "Saracens", "Mediators", "Lawmen"],
  disciplines: ["Blood Sorcery", "Celerity", "Obfuscate"],
  bane: {
    name: "Blood Addiction",
    description: "When the Banu Haqim slakes at least one Hunger level from another vampire, they must make a Hunger Frenzy test at difficulty 2 plus Bane Severity. If they fail, they must gorge themselves on vitae, in turn opening the door to possible Diablerie."
  },
  variantBane: {
    name: "Noxious Blood",
    description: "The Blood of the Banu Haqim is toxic to mortals, but not to other vampires. Due to this mortals receive Aggravated Damage equal to the Bane Severity of the vampire for each Rouse Check's worth of Blood consumed. Their Blood cannot be used to heal mortal injuries. In amounts below the amount needed to Blood Bond, it does not harm them, even if directly injected into them."
  },
  compulsion: {
    name: "Judgement",
    description: "Urged to punish a wrongdoer, the vampire must slake one Hunger from anyone that acts against their own Convictions. Failing to do so results in a three-dice penalty to all rolls until the Compulsion is satisfied or the scene ends. Should the victim be a vampire, the Bane applies."
  },
  background: {
    description: "The Judges of the Banu Haqim are torn between their hereditary thirst for vampiric Blood and their passion for justice. Stern adjudicators, they are fiercely devoted to upholding a moral code, and Embrace mortals capable of assessing and handling threats, enforcing laws and traditions, and punishing transgressors.",
    characteristics: "Regardless of the individual Banu Haqim's stance, they all adhere to some type of strict code, be it blood laws, personal ethics, governmental or religious rules. Nevertheless, that doesn't mean they are free of self-interest, and often such codes of conduct are a self-regulation method to keep in check their desire for Kindred blood."
  },
  disciplines: {
    bloodSorcery: "Used to poison their blades and use their blood as a weapon against others, as well as sift out the truth in blood. They keep their secrets of Blood Sorcery close.",
    celerity: "Gives them to ability to move and react more quickly than humanly possible, allowing them to make judgement calls without the hesitation of thought.",
    obfuscate: "How they melt into shadows and disappear when needed. An useful Discipline for those times when they wish to witness a crime without being spotted before casting their judgement."
  },
  archetypes: {
    advocate: "A lawyer with a strong sense of justice, willing to bring it to those in need, who often used to work on unwinnable cases and represented the most downtrodden clients.",
    localSheriff: "A guardian for a limited environment, like a small town or a district, with the need to protect it from any potential harm.",
    hitman: "Unrelenting in their task, the hitman is able to meet their goals and beyond. Their creed sometimes pushes them to take additional contracts for personal reasons.",
    rehabLeader: "Their personal life has shaped their ethos, urging them to aid those who seek it and strike out against those who will not seek rehabilitation."
  },
  notableCharacters: {
    fatimaAlFaqadi: {
      description: "Known within the clan as the Hand of Vengeance, she was embraced in the 12th Century C.E. and is one of the most dangerous and skilled assassins to ever have become a Kindred.",
      currentStatus: "She is faithful to Islam and an enemy to the cultists of Ur-Shulgi. Before Alamut fell under cultist control, she worked for vitae and undertook contracts to benefit the stronghold. Now, she is reported to have become a leader of a Banu Haqim group fighting side by side with the Camarilla in the Gehenna war."
    },
    tegyrius: {
      description: "High ranking Vizier of the Ashirra, the groom in the Vermillion Wedding.",
      currentStatus: "He is to married and Blood Bound to Victoria Ash in a Blood Wedding to bring both clans together and aid in the Banu Haqim's entry into the Camarilla."
    },
    urShulgi: {
      description: "A methuselah of the clan, potentially direct a childe of Haqim, and perhaps one of the greatest sorcerers in the clan.",
      currentStatus: "Having awaken from Torpor after thousands of years, broke the clan blood curse, but was horrified to find his clan follow a human religion. He now leads a schism in his clan with his cult claiming to be the true followers of Haqim at odds with those who follow human religions or challenge his claims."
    },
    alAshrad: {
      description: "The Amr, the most learned and respected of the clan's sorcerers, of the Banu Haqim.",
      currentStatus: "Al-Ashrad helped lead many of his clan into the Camarilla after the awakening of Ur-Shulgi as part of the schism in the clan."
    },
    samira: {
      description: "Featured in Vampire: The Masquerade Shadows of New York",
      currentStatus: "She is the Banu Haqim Primogen of New York."
    },
    justice: {
      description: "Featured in Vampire: The Masquerade Justice",
      currentStatus: "He is the main character that investigates the assassination of his sire in a city controlled by the Hecata."
    },
    julianSim: {
      description: "Featured in Vampire: The Masquerade Night Road",
      currentStatus: "He is an Anarch Banu Haqim."
    }
  },
  culture: {
    embrace: {
      description: "The clan itself is diverse, consisting of many different types of lawmen, scholars, judges, and vigilantes.",
      criteria: [
        "Those that excel in strategy and thought",
        "Honed swords",
        "Those capable of handling threats",
        "Those who can enforce laws or traditions",
        "War veterans seeking redemption"
      ],
      note: "The Viziers and Warriors of the clan have descended from different broods, each compelled to embrace a mortal matching their different inclinations. The Warriors tend towards those skilled in combat and the Viziers seek those knowledgeable in political or legal power."
    },
    mortalSociety: {
      description: "Many rumors float around the Banu Haqim, a popular one around Kindred is the notion of the Banu Haqim being only mercenaries with a taste for vitae and never meddle in human affairs.",
      influence: "Lawmakers and criminals are a prime sector the clan holds their influence. With the wealthy families of Arabia the clan has infiltrated and manipulated have yielded them many connections: petrochemicals for money making, banks for financial espionage, telecommunications to better encrypt messages, and luxury hotels for exclusivity and more money making.",
      retainers: "Their retainers and herd members are often chosen from police departments, private security, and other law enforcement areas and enterprises. Many also select mortals from organized crime for their entourage."
    },
    kindredSociety: {
      description: "The clan is currently recovering from a large schism in their ranks.",
      currentStatus: "This crisis has put the Ashirra and the clan in a rough spot politically, making the Camarilla look more appealing. A union with the Camarilla was more desirable than ever. The Gangrel and Brujah departure made a niche for protectors and hunters the clan was fit for.",
      coteries: {
        description: "Clan culture usually emphasizes childe-sire relationships for mentorship in their blood sorcery ways, though the diaspora of the clan in recent nights has made this challenging.",
        characteristics: "This type of clan culture rewards achievement and rewards the goal-oriented Haqimites. Stark contrast to some clans that exalt lineage or tradition, the Banu Haqim focus more on deed.",
        mixedCoteries: "In mixed coteries, Banu Haqim may find themselves drawn to setting the plan and focus of the coterie and pushing their coterie mates forward. They usually gravitate toward roles where they can determine group direction or interpret collective goals."
      }
    },
    factionalDifferences: {
      description: "The Odense Pact was signed in the Danish city of the same name and led to the Banu Haqim being admitted into the Camarilla.",
      currentStatus: "Now the Clan is mostly in the Camarilla and the allied Ashirra. While there are no naming differences most of the clan resides in either of the two aforementioned sects. Anarchs and Autarkis of the clan would have usually have to forgo the closeness the clan usually has. Of course, the Shepherds of Ur-Shulgi could be considered Autarkis."
    }
  },
  history: {
    description: "For a long time, the Banu Haqim have kept themselves removed from Kindred society, but this era of isolation is coming to an end.",
    currentStatus: "Somewhere in Afghanistan, the Children of Haqim hide within a base called Alamut. However, this base of operation has fallen to blood cultists, the followers of the now awakened methuselah Ur-Shulgi who prepare to deliver judgement upon their kin known as the Shepherds of Ur-Shulgi.",
    bloodCraftScene: "The changes of their clan have brought the Banu Haqim closer to Kindred society. With old strongholds gone and mingling more, the many Haqimites are on the blood craft scene dealing blood magic, services, and secrets out of necessity."
  },
  exclusiveLoresheets: [
    "High Clan",
    "Occult Artifacts",
    "Descendant of Al-Ashrad"
  ]
};
window.banuHaqim = banuHaqim; 
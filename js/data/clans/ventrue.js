export const ventrue = {
  name: "Ventrue",
  nicknames: ["The Clan of Kings", "Blue Bloods", "Tyrants", "Warlords", "Patricians", "Borgias"],
  disciplines: ["Dominate", "Fortitude", "Presence"],
  bane: {
    name: "Rarefied Tastes",
    description: "When the Ventrue drinks the blood of a mortal who does not fall within their preference, they must spend Willpower equal to their Bane Severity else they will vomit the blood from their bodies unable to slake their hunger. Their preferences range within the clan, some looking for descendants of a certain nationality to soldiers suffering from PTSD. With a Resolve + Awareness test, they can sense if a mortal they seek to feed from fits within their preference. At character creation, their preference should be selected."
  },
  variantBane: {
    name: "Hierarchy",
    description: "The Ventrue suffer a penalty equal to their Bane Severity to their Discipline dice pools when using them against a vampire of a lower generation. They must also spend Willpower equal to this penalty if they wish to directly attack other vampires of a lower generation."
  },
  compulsion: {
    name: "Arrogance",
    description: "Fueled by the beast and their natural desire for power, the Ventrue must force someone to obey a command given. The order cannot be given through supernatural means such as Dominate. Until they satisfy the requirements, they receive a two-dice penalty for any actions not directly related to leadership."
  },
  background: {
    description: "The Ventrue are not called the Clan of Kings for nothing. Carefully choosing their progeny from mortals familiar with power, wealth, and influence, the Ventrue style themselves the aristocrats of the vampire world. Their members are expected to assume command wherever possible, and they're willing to endure storms for the sake of leading from the front.",
    currentStatus: "Though in recent nights their status has begun to slip, many Ventrue feel their time is running out and as their privileges slip through their fingers, most Ventrue tighten their grasp, willing to fight fang and claw to keep hold.",
    camarillaRole: "Clan Ventrue has long been the leader of the Camarilla, even after losing their most prominent representative, Hardestat, to a Brujah assassination. A majority of the clan believes that the strength of tradition and lineage is what holds them above the rest."
  },
  disciplines: {
    dominate: "Used to guide the masses they lead, be it Kindred or mortal. It also serves its purpose when hunting to force a mortal to show their neck or to protect the Masquerade in a situation gone wrong.",
    fortitude: "Keeps the Ventrue able to withstand the storms when their lesser fight against them. This power has its use for them to stand against adversity and feed, where others might struggle with blood, they take their fill.",
    presence: "The alternative to mind control. Used to sway their courts and loyal followers to adore them regardless of their less than ethical approaches. With their value of conservation, this aids them in easily finding prey to take their fill upon."
  },
  archetypes: {
    mobBoss: "Through organized crime and manipulation, they've risen through the mortal underworld. Some of their clan might turn their nose to this path, but this Ventrue knows how to get things done, whether blood is spilled or not.",
    shadowDirector: "Hiding in plain sight is the obvious choice, but hiding behind the money and business is one way to survive through the nights. The Shadow Director controls their business with an iron fist, while they remain able to keep from dirtying their hands directly, they will rarely take the ethical choice when power is on the table.",
    politician: "The Clan of Kings have always viewed power as the way to maintain the status quo. Using mortal laws to sway the shape of their city, they use their status to sway the politicians in their party and in turn the reporters to cover the Masquerade.",
    aspiringChilde: "Not all Ventrue have reached the lofty expectation set for them, many Ventrue are small timers, looking to use their skills to build a business empire in the next twenty years."
  },
  notableCharacters: {
    hardestadt: {
      description: "The name of a sire and childe. Hardestadt the Elder met Final Death at the hands of the Brujah, Tyler. This left Hardestadt the Younger room to run the Camarilla with the foundation his sire laid while impersonating him. Until his destruction at the hands of Brujah rebels lead by Theo Bell during the Convention of Prague in 2012, he was the most important Ventrue for eight centuries.",
      achievements: "He, alongside six others, was a founder of the Camarilla. Hardestadt did not Embrace many mortals and never confirmed his lineage to a Fourth Generation methuselah. None who have come before or after could stand to the power and influence he held and as far as he was concerned he was the be-all end-all of the clan."
    },
    fiorenzaSavona: "With her global political control she managed to keep the clan relevant and dangerous as the center of global power. Fiorenza worked has as a mortal and continues to do so in her unlife to secure that wealthy and powerful vampires remain in power.",
    lodin: "Once Prince of Chicago he systematically eradicated anyone who challenged his claim of the throne. He ruthlessness destroyed anyone in his path, including his own clan who was viewed as a primary threat rather than allies. He's gone in the modern nights but his legacy lives on in his bloodline.",
    horatioBallard: {
      description: "Business mogul with millions from his investments, banks, real estate, and construction companies collectively known as Ballard Industries. A childe of Lodin with a large sum of wealth and political power which he used to support his sire's rule.",
      currentStatus: "After Lodin's supposed death, he backed Kevin Jackson's bid for Prince in Chicago. The crash of the housing market didn't hurt his companies due to keen business acumen, but his personal wealth and reputation took a massive hit. This leaves the Ventrue ready for an ambitious rebuilding effort."
    },
    lucinde: {
      description: "A prominent member of clan Ventrue and current Justicar, reaching many ranks in the Camarilla. She first worked as an Archons and later an Alastor the first of its kind.",
      role: "Alastor is a role where she hunts down the Camarilla's most dangerous and most wanted on the 'Red List'. The role is also tasked with hunting down illegal diablerists. She specializes in deep undercover investigations and biding her time to strike her enemies.",
      achievements: "Her background has allowed her to raise to the role of Justicar and be named Justicar for life. Her Archons often work out of Chicago conducting investigations."
    }
  },
  culture: {
    embrace: {
      description: "Ventrue are typically very selective in their Embraces, as they see lineage and traditions to be of the utmost importance. The Embrace is an important ritual for the Blueblood for the aforementioned reasons, going so far as the selection impacting the sire's standing in the clan.",
      criteria: "The usual stock of Ventrue childers come from overachievers, powerful Kindred be it financially or politically, and those with talents that puts them above others in the world. Childers are usually taught to admire their vampiric lineage and the importance of the clan.",
      traditions: "When they greet each other they not only say their sire, grand sire, great grand sire, etc. but also their ancestors' feats. Many of the sire put their new charges through tests to make sure they are worthy of Clan of Kings; the clan is not known to tolerate failure."
    },
    mortalSociety: {
      description: "Pioneers in terms of power and wealth, having well placed pawns in politics, finance, and exclusive clubs. Most Ventrue are no longer able to lead the human world like they did in nights of old.",
      currentApproach: "Many shy from being, leader of the board, or open heads of their community. For safety reasons many have begrudgingly taken to influence from the shadows. They take on the role of bankers, silent partners, shadow directors, and reclusive CEOs.",
      feeding: {
        description: "The clan is among the best customers of the Circulatory System. Their bane has made them need to look carefully at their victims.",
        preferences: "Sometimes the Childe and Sire share the same restriction or the restriction is linked to a Ventrue's past. They can be all over the place factoring in employment, gender, place of birth, blood quality, or even events in the victims life.",
        examples: "Kevin Jackson only feeding on gang members while Hardestadt could only feed on those with military experience."
      }
    },
    kindredSociety: {
      description: "To many Ventrue without them there is no Camarilla. They see themselves as the leaders of the Kindred and it is not just a notion to them, but their destiny.",
      influence: "The Ventrue also know they have some of the most influence in the sect and even with the exodus of the Brujah and the incoming of the Lasombra and the Banu Haqim. The group of self-interested motivated Kindred are said to be the wealthiest Kindred.",
      lineage: "The clan itself looks at the lineage and the human societies they have influenced: Sparta, Rome, Francia, old Italia, and the British Empire. The feats of their past influence their future."
    },
    directorate: {
      description: "The Ventrue have an inner body of elders and high ranking members called the Directorate. They watch over clan affairs and even instruct high profile Blue Bloods.",
      activities: "The Directorate tapped Kevin Jackson to introduce the Lasombra into the Chicago Camarilla and they have a wary eye on Fiorenza Savona's rapid growing success. Little is known of them and it is said to be one of many shadowy inner clan councils similar to the Lasombra's Amici Noctis."
    }
  },
  factionalDifferences: {
    camarilla: {
      description: "The Ventrue seem themselves as the embodiment of the Camarilla and the ones destined to lead Kindred. Camarilla Ventrue hold the most Princedoms of any clan.",
      beliefs: "They are strong enforcers of the Traditions and believe in legacy. Their strong views on legacy shape the Camarilla Ventrue, they judge each other on who they Embrace.",
      traditions: "Their sires teach their vampiric lineage with great tutelage to their childers. When they greet each other they not only say their sire, grand sire, great grand sire, etc. but also their ancestors' feats."
    },
    anarch: {
      description: "Anarch Ventrue call themselves Free Ventrue. They call themselves free from worshiping and adhering to Ventrue of their line, free from giving reverence to Princes because they are of the clan, and free from the yoke of their sire.",
      beliefs: "They despise everything based on bloodlines and age for the Camarilla Ventrue.",
      roles: "In the Anarch Movement they have done well with their limited numbers with many becoming Barons, enforcers, and sweepers."
    }
  },
  exclusiveLoresheets: [
    "Descendant of Hardestadt",
    "Pure Ventrue Lineage",
    "Descendant of Lodin",
    "Spear of Orthia"
  ]
}; 
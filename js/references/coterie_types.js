const coterieTypes = {
  name: "Coterie Types",
  description: "Players have the option to create their coterie type from those below or invent their own. Below are examples of possible types with names that serve as a shorthand rather than a universal term amongst Kindred. Yes, some may call their coterie a Nomad, but they do not have to. Build the coterie around what the troupe desires first and rules second. If a coterie type matches well, use it's requirements but if there are things the players would rather have instead, swap it around with different pre-requisites. In a similar vein, coterie types can change in play. Perhaps the Nomad coterie has found a city they wish to settle down in, changing around their advantages will help represent their current storyline.",
  source: ["Vampire: The Masquerade Players Guide"],
  sourcePage: 155,
  rules: {
    note: "Mechanically when using these types, subtract the listed costs from the coterie pool. If the pool isn't large enough to pay the costs of that type, start collecting contributions from the characters. You can increase any listed value with your remaining coterie pool if there is any. Consider the possible extras as more places to put the remaining pool.",
    source: "Vampire: The Masquerade Corebook",
    sourcePage: 197,
    domainBonus: {
      note: "At the Storytellers discretion some coterie types grant a single dot bonus to one of the domain traits if the coterie meets all the pre-requisites listed. This bonus does not raise a domain trait above five, if a coterie changes types or otherwise changes to receive a bonus that would increase the trait above five either refund a coterie dot or the experience spent by a player character.",
      eligibleTypes: {
        chasse: ["Blood Cult", "Envoy", "Fang Gang", "Hunting Party", "Plumaire", "Questari", "Regency", "Sbirri"],
        lien: ["Champions", "Corporate", "Family", "Gatekeeper", "Vehme"],
        portillon: ["Cerberus", "Commando", "Day Watch", "Maréchal", "Saboteur", "Watchman"]
      }
    }
  },
  types: {
    bloodCult: {
      name: "Blood Cult",
      description: "A coterie that entices mortals into supernatural rituals or schemes. Take their blood and possibly enslave them.",
      requirements: {
        domain: {
          chasse: 1,
          portillon: 2
        },
        herd: 3,
        statusFlaw: "Suspect (1)"
      },
      possibleExtras: ["Enemies (2)", "Haven (Cult church or compound)", "Haven: Furcus", "Retainers"],
      preferredResonances: ["Sanguine"],
      commonAdvantages: ["On Tap (1)", "Cursed (varies)", "Targeted (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 197
    },
    carnival: {
      name: "Carnival",
      description: "A coterie that moves from place to place, this does not mean they always bring entertainment, instead they might share theater tales, politics, Cainite rites or be hidden in plain sight.",
      requirements: {
        contacts: 3,
        fame: 3,
        retainers: 1
      },
      possibleExtras: ["Allies", "Herd (Fans)", "Resources"],
      source: "Vampire: The Masquerade Chicago by Night",
      sourcePage: 300
    },
    cerberus: {
      name: "Cerberus",
      description: "A coterie that protects a certain spot or item.",
      requirements: {
        domain: {
          chasse: 1,
          portillon: 3
        },
        haven: 2
      },
      possibleExtras: ["Adversary", "Haven: Haunted (1)", "Status (For legacies)", "Retainers (Guards)", "Haven: Furcus"],
      preferredResonances: ["Melancholy"],
      commonAdvantages: ["Privileged (3)", "Bullies (1)", "Custodians (2)", "Territorial (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 197
    },
    champions: {
      name: "Champions",
      description: "A coterie that fights for a cause, either in mortal or kindred society.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 3
        },
        allies: 1,
        enemies: 2
      },
      possibleExtras: ["Adversary", "Contacts", "Haven: Hidden Armory", "Influence (Religious or Police)"],
      preferredResonances: ["Choleric"],
      commonAdvantages: ["Bolt Holes (varies)", "Transportation (2)", "Custodian (2)", "Targeted (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 197
    },
    commando: {
      name: "Commando",
      description: "A coterie built to fight enemies.",
      requirements: {
        domain: {
          chasse: 1,
          portillon: 2
        },
        mawla: 3,
        status: 1,
        enemies: 2
      },
      possibleExtras: ["Adversary", "Haven (Base of operations)", "Mask", "Retainers (NCOs/Troops)", "Haven: Hidden Armor"],
      preferredResonances: ["Choleric"],
      commonAdvantages: ["Transportation (2)", "Bullies (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 198
    },
    coOp: {
      name: "Co-op",
      description: "A coterie created based on the mutual agreement of give-and-take.",
      requirements: {
        domain: {
          chasse: 2,
          portillon: 2
        },
        resources: 2,
        status: "Notorious (1)"
      },
      possibleExtras: ["Herd", "Allies", "Contracts"],
      source: "Vampire: The Masquerade Winter's Teeth",
      sourcePage: "vol 2"
    },
    corporate: {
      name: "Corporate",
      description: "A coterie that is organized and functions similarly to a business.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 2
        },
        influence: 2,
        resources: 3
      },
      possibleExtras: ["Contacts", "Haven: Business Establishment", "Herd", "Influence (Corporate or political)", "Retainers"],
      preferredResonances: ["Phlegmatic"],
      commonAdvantages: ["Debt (2)", "Territorial (1)"],
      source: "Vampire: The Masquerade Chicago by Night",
      sourcePage: 300
    },
    dayWatch: {
      name: "Day Watch",
      description: "A coterie that is built to protect someone or something during the day. (Thin-bloods with the Day Drinker merit usually)",
      requirements: {
        domain: {
          chasse: 1,
          portillon: 2
        },
        influence: 2,
        enemies: 3
      },
      possibleExtras: ["Allies", "Contacts", "Haven", "Mawla", "a shared relic or ritual allowing activity during the day", "Status: City Secrets"],
      preferredResonances: ["Whatever the Alchemist needs"],
      commonAdvantages: ["Debts (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 198
    },
    diocese: {
      name: "Diocese",
      description: "Bigger than a blood cult, but secret members of a mortal-facing cult, mega-church, or pyramid scheme with kindred worshipers.",
      requirements: {
        domain: {
          chasse: 3,
          lien: 2
        },
        influence: 2,
        herd: 2,
        mask: 2,
        enemies: 2
      },
      possibleExtras: ["Allies", "Resources", "Retainer", "Status", "a shared relic significant to the cult", "Adversary", "Suspect"],
      source: "Vampire: The Masquerade Children of the Blood",
      sourcePage: 83
    },
    envoys: {
      name: "Envoys",
      description: "A coterie type is formed to serve on diplomatic missions, acting as negotiators and mediators between parties.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 3
        },
        contacts: 3,
        resources: 2,
        statusFlaw: "Suspect (1)"
      },
      possibleExtras: ["Mask (Cover identities for different domains)", "No Haven (always on the move)", "Shared Haven (1)"],
      preferredResonances: ["Sanguine", "Phlegmatic"],
      commonAdvantages: ["Privileged (3)"],
      source: "Vampire: The Masquerade Cults of the Blood Gods",
      sourcePage: 195
    },
    excommunicates: {
      name: "Excommunicates",
      description: "A Coterie on the shit list of a cult who may have secrets of said cults.",
      requirements: {
        contacts: 3,
        loresheet: 3,
        mask: 2
      },
      special: "Excommunicate usually have one of more Flaws related to the cult they escaped.",
      possibleExtras: ["Adversary", "Destitute", "Influence (Outside the cult)", "No Haven", "Shunned"],
      source: "Vampire: The Masquerade Children of the Blood",
      sourcePage: 84
    },
    family: {
      name: "Family",
      description: "A Coterie type that is one of reliance, connection, and support networks. Vampires within this coterie may be related in a mortal sense as well as by clan.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 1,
          portillon: 3
        },
        ally: 1,
        contacts: 2,
        resources: 2,
        enemies: 2
      },
      possibleExtras: ["Herd (Extended family)", "Influence (Family business)", "Mawla (Vampire within the same family)", "Retainers (A family ghoul)", "Fame Flaw: Dark Secret (Family criminal connections)", "Haven", "Haven Flaw: Haunted"],
      preferredResonances: ["Sanguine"],
      commonAdvantages: ["Bolt Holes (varies)", "Cursed", "Territorial"],
      source: "Vampire: The Masquerade Cults of the Blood Gods",
      sourcePage: 150
    },
    fangGang: {
      name: "Fang Gang",
      description: "A coterie that is more of a criminal enterprise.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 1,
          portillon: 1
        },
        contacts: 1,
        enemies: 2
      },
      possibleExtras: ["Haven (Clubhouse)", "Herd (Human members/victims of the gang)", "Influence (Organized Crime)", "Retainers", "Status (Likely with Anarchs)", "Resources"],
      preferredResonances: ["Choleric"],
      commonAdvantages: ["Targeted (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 198
    },
    flagellant: {
      name: "Flagellant",
      description: "A coterie that is formed of members who attempt to make amends for the actions of vampires, either through charitable works or through more extreme actions of hunting down other Kindred who mistreat mortals.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 2
        },
        allies: 3,
        influence: 1,
        adversary: 2
      },
      possibleExtras: ["Contacts", "Loresheet (Golconda or other reputed path to salvation)", "Retainer (Someone they saved with vitae)"],
      source: "Vampire: The Masquerade Players Guide",
      sourcePage: 260
    },
    fugitive: {
      name: "Fugitive",
      description: "A coterie that is on the run, be it from the Second Inquisition or a Bloodhunt.",
      requirements: {
        contacts: 3,
        mask: 2,
        retainer: 1
      },
      special: "These coteries always have one or more Flaws related to who is chasing after them. Such as Adversary, Enemy, Infamy, Known Blankbody or Shunned.",
      possibleExtras: ["Allies", "Cobbler (1)", "Loresheets related to them knowing too much", "Resources", "Despised (2)"],
      preferredResonances: ["Choleric"],
      commonAdvantages: ["Transportation (2)", "Targeted (1)"],
      source: "Vampire: The Masquerade Players Guide",
      sourcePage: 260
    },
    gatekeeper: {
      name: "Gatekeeper",
      description: "A coterie type that utilizes their skills in communion with (and potentially control over) the dead providing spiritual aid and counseling to some, spectral assaults, and sabotage against others.",
      requirements: {
        domain: {
          chasse: 2,
          lien: 1,
          portillon: 1
        },
        contacts: 2,
        retainers: 3,
        infamy: 1
      },
      possibleExtras: ["Mawla (Accomplished necromancer)", "Enemies (vampire hunters)", "Haven: Furcus", "Resources (Stolen from the dead)", "Status: City Secrets"],
      preferredResonances: ["None"],
      commonAdvantages: ["Bolt Holes", "Cursed (varies)", "Territorial (1)"],
      source: "Vampire: The Masquerade Cults of the Blood Gods",
      sourcePage: 150
    },
    household: {
      name: "The Household",
      description: "A coterie made up of members of the Butterflies, a cult that follows Golconda.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 3,
          portillon: 2
        },
        haven: 3,
        herd: 5
      },
      possibleExtras: ["Mawla (Joseph)", "Retainers (Joseph's ghouls)"],
      source: "Vampire: The Masquerade Forbidden Religions",
      sourcePage: 39
    },
    huntingParty: {
      name: "Hunting Party",
      description: "A coterie that specializes and capturing humans with special blood.",
      requirements: {
        domain: {
          chasse: 3
        },
        ally: 1,
        mawla: 1
      },
      possibleExtras: ["Herd", "Influence (Organized Crime)"],
      preferredResonances: ["Whatever benefits them best"],
      commonAdvantages: ["On Tap (2)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 198
    },
    marechal: {
      name: "Maréchal",
      description: "A coterie that serves as guards for a Prince or Baron.",
      requirements: {
        domain: {
          chasse: 2,
          portillon: 2
        },
        status: 3
      },
      possibleExtras: ["Adversaries", "Influence", "Mawla (Prince/Baron)", "Retainers", "Status"],
      preferredResonances: ["Choleric", "Sanguine"],
      commonAdvantages: ["Transportation (2)", "Bullies (2)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 198
    },
    missionaries: {
      name: "Missionaries",
      description: "The start of a Blood cult or a Diocese. A coterie that tries to convert others.",
      requirements: {
        domain: {
          chasse: 2
        },
        mawla: 3,
        resources: 3,
        status: 2
      },
      possibleExtras: ["Mask", "Retainer", "Suspect"],
      source: "Vampire: The Masquerade Children of the Blood",
      sourcePage: 84
    },
    nemeses: {
      name: "Nemeses",
      description: "A Coterie type formed by those kept down in life or unlife, they exist to ruin their enemies and raise those who have suffered like them.",
      requirements: {
        domain: {
          chasse: 2,
          portillon: 1
        },
        contacts: 2,
        influence: 2,
        enemy: 1,
        statusFlaw: "Suspect (1)"
      },
      possibleExtras: ["Herd (Survivors)", "Retainers (Survivors)"],
      source: "Vampire: The Masquerade Cults of the Blood Gods",
      sourcePage: 55
    },
    nomad: {
      name: "Nomad",
      description: "A coterie that travels together.",
      requirements: {
        contacts: 3,
        retainers: 2,
        statusFlaw: "Suspect (1)"
      },
      possibleExtras: ["Herd (Fellow travelers)", "Allies", "Fame", "Resources"],
      preferredResonances: ["Sanguine", "Animal"],
      commonAdvantages: ["Transportation (2)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 198
    },
    plumaire: {
      name: "Plumaire",
      description: "A coterie united by ties of social prominence or simple common enthusiasms with on another.",
      requirements: {
        domain: {
          chasse: 2,
          lien: 2
        },
        contact: 3
      },
      possibleExtras: ["Adversary or Enemy (Rival Fashionista)", "Status (For high society Plumaires)", "Fame (subculture)"],
      preferredResonances: ["Sanguine"],
      commonAdvantages: ["Transportation (2)", "Debt (2)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 199
    },
    questari: {
      name: "Questari",
      description: "A coterie who exists to achieve a major accomplishment; they may chase a target, hunt a relic, or solve a mystery.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 3
        },
        contacts: 2
      },
      possibleExtras: ["Haven with Library", "Mawla", "Resources (Research budget)", "Status: City Secrets"],
      preferredResonances: ["Sanguine", "Phlegmatic"],
      commonAdvantages: ["Transportation (2)", "Territorial (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 199
    },
    rectorate: {
      name: "Rectorate",
      description: "A coterie dedicated to hunting down and locating magical relics and other objects.",
      requirements: {
        domain: {
          chasse: 2,
          portillon: 2
        },
        resources: 2,
        retainers: 1
      },
      possibleExtras: ["Contacts", "Enemies"],
      source: "Vampire: The Masquerade Chicago by Night",
      sourcePage: 248
    },
    regency: {
      name: "Regency",
      description: "A coterie formed to watch over a traveling elder's domain and use their political power in their place.",
      requirements: {
        domain: {
          chasse: 2,
          portillon: 3
        },
        mawla: 2,
        status: 4
      },
      advantages: "Select up to 10 dots shared between Haven, Herd, Influence, Resources, Retainers, Status: City Secrets, and/or Coterie Advantages.",
      flaws: "Select the same amount of dots worth of Flaws (Adversaries, Compromised Haven, Despised, Enemies, Stalkers, and/or Coterie Flaws)",
      preferredResonances: ["Phlegmatic"],
      commonAdvantages: ["Bolt Holes", "Bullies (1)", "Targeted (1)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 199
    },
    saboteur: {
      name: "Saboteur",
      description: "A Coterie type that lacks immediate powerbase and roots within their new domain, but their reach within the mortal world is impressive. Often used for spying, assassination, or political disruption.",
      requirements: {
        contacts: 2,
        influence: 1,
        mawla: 2,
        mask: 1,
        adversaries: 2
      },
      possibleExtras: ["Domain (If the coterie is embedded in their current locale)", "Suspect", "Resources (Liquid cash)", "Retainers", "more Adversaries"],
      preferredResonances: ["Melancholic", "Choleric"],
      commonAdvantages: ["Bolt Holes"],
      source: "Vampire: The Masquerade Cults of the Blood Gods",
      sourcePage: 84
    },
    sbirri: {
      name: "Sbirri",
      description: "A coterie posing as another type, but are actually spies for a rival faction or sect.",
      requirements: {
        domain: "Coterie is being mimicked, can spend one less dot overall",
        mawla: 2,
        mask: 1
      },
      possibleExtras: ["Adversaries on the target city's Primogen", "Status: City Secrets", "and other Advantages from the coterie's supposed cover type", "Adversaries", "Dark Secret (2)"],
      preferredResonances: ["Melancholy or others as coterie prefers"],
      commonAdvantages: ["Bolt Holes (varies)", "Chasse: Back Alleys"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 199
    },
    schism: {
      name: "Schism",
      description: "A coterie leading a schism in a cult or a splinter group.",
      requirements: {
        loresheet: 3,
        resources: 1,
        status: 2
      },
      possibleExtras: ["Influence", "Fame", "Adversary", "Despised", "Excommunicated"],
      source: "Vampire: The Masquerade Children of the Blood",
      sourcePage: 84
    },
    somnophile: {
      name: "Somnophile",
      description: "A coterie that serves an elder vampire.",
      requirements: {
        domain: {
          chasse: 1,
          portillon: 2
        },
        loresheet: 2,
        mawla: 3
      },
      possibleExtras: ["Allies", "Retainers", "Status"],
      source: "Vampire: The Masquerade Chicago by Night",
      sourcePage: 261
    },
    supportGroup: {
      name: "Support Group",
      description: "A coterie that forms around supporting each other, especially fledglings, in surviving the unlife.",
      requirements: {
        herd: 2,
        haven: 1,
        mawla: 2,
        resources: 2,
        enemy: 2
      },
      source: "Vampire: The Masquerade Winter's Teeth",
      sourcePage: "vol 2"
    },
    theologianSociety: {
      name: "Theologian Society",
      description: "A coterie that may tap into dark magic or may just be theological researchers of a cult.",
      requirements: {
        haven: 3,
        resources: 2,
        retainer: 2
      },
      possibleExtras: ["Allies", "Contacts", "Suspect"],
      source: "Vampire: The Masquerade Children of the Blood",
      sourcePage: 84
    },
    thinkTank: {
      name: "Think Tank",
      description: "A coterie type created from advisors, strategists, and researchers for a given cult.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 3
        },
        allies: 3,
        haven: 1
      },
      possibleExtras: ["Resources (Profits made from selling their services)", "Retainers (Librarians, scholars)"],
      source: "Vampire: The Masquerade Cults of the Blood Gods",
      sourcePage: 195
    },
    vanguard: {
      name: "Vanguard",
      description: "A coterie that develops it's base behind enemy lines.",
      requirements: {
        domain: {
          chasse: 2,
          portillon: 3
        },
        status: 1,
        enemies: 1
      },
      possibleExtras: ["Adversary", "Mawla"],
      source: "Vampire: The Masquerade Chicago by Night",
      sourcePage: 236
    },
    vehme: {
      name: "Vehme",
      description: "A coterie tasked by a Primogen or sheriff to protect the masquerade and punish violators.",
      requirements: {
        domain: {
          chasse: 1
        },
        influence: 3,
        status: 3
      },
      possibleExtras: ["Adversaries", "Mawla (Primogen or Anarch Council member)"],
      preferredResonances: ["Sanguine"],
      commonAdvantages: ["Privileged (3)", "Custodians (2)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 199
    },
    watchmen: {
      name: "Watchmen",
      description: "A coterie that patrols the city and protects it from intruders or colonizes new land for their Sect.",
      requirements: {
        domain: {
          chasse: 1,
          lien: 2,
          portillon: 1
        },
        status: 2
      },
      possibleExtras: ["Contacts", "Retainers"],
      preferredResonances: ["Animal", "Melancholy"],
      commonAdvantages: ["Transportation (2)", "Territorial (1)", "Under Siege (2)"],
      source: "Vampire: The Masquerade Corebook",
      sourcePage: 199
    }
  }
};
window.coterieTypes = coterieTypes; 
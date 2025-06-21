const camarilla = {
  name: "Camarilla",
  nicknames: ["The Tower"],
  predominantClans: [
    "Banu Haqim",
    "Lasombra",
    "Malkavian",
    "Nosferatu",
    "Toreador",
    "Tremere",
    "Ventrue",
    "Brujah (dissident)",
    "Gangrel (dissident)"
  ],
  description: "The Camarilla is one of the most organized and influential Kindred organizations in history. Their goal is to preserve the masquerade and keep Kindred in line with rules that help protect their society from the prying mortal eye. Beyond this, it is a conspiracy to help elders preserve their power built on an undead secret society that influences global business and politics. The Camarilla is the closest thing they have to a system of government and an international union of cities. It is completed by an inner circle and its Justicars and Archons that roam the world to 'keep the peace'. A fierce moral stance is held on preserving humanity even against the impulses of the Blood, seeing themselves as shepherds to the herds of mortals they blindly control. Many Camarilla members have a wealth of power and money, on top of their age and the inclusion of Anarch defects joining their ranks makes the sect distinctly upper class.",
  source: ["Vampire: The Masquerade Corebook"],
  sourcePage: 49,
  ashirra: {
    description: "The Ashirra are the Middle Eastern equivalent of the Camarilla, entirely based on Islam to counter their vampiric impulses. Instead of traditions they use the five pillars of Islam as their code of conduct.",
    source: ["Vampire: The Masquerade Corebook", "Vampire: The Masquerade Camarilla"],
    sourcePage: [51, 23]
  },
  culture: {
    description: "They are the monsters that wear designer dresses one night before throwing them away after a splattering of blood. They are the monsters with meticulously created portfolios and houses guarded by servants forced by the Blood. They are the one percent of the one percent who always hunger for more and more power. Masters of disinformation, propaganda, and blackmail allow them to maneuver and manipulate mortal governing bodies or others who get in their way. A loose end never remains loose for long with the tower and they do not hesitate to ruin one who stands in their way in the name of protecting their influence.",
    religion: "Towers members may still cling to their religions from their mortal lives, seeing Caine as nothing but a mythical figure and hoping their religion will reveal more truths to them. Regardless of that, they still worship their ancestors with the methuselahs serving the function of saints in Christianity.",
    elysium: "When it is needed they gather in secret sanctuaries known as Elysium, places which often change location to remain secret from mortals. In here there are feasts and ceremonies, negotiations, or heated debates all of which are protected and directed by the Keeper and their heralds.",
    relationships: "While most members of the Camarilla see themselves as above the rabble Anarchs, they do see some sects as peers or even possible partners. Due to the Second Inquisition playing no favorites, Justicars see the necessity of agreements between Kindred. These nights Archons may carry messages of deep respect or arrangements for local alliances and there's a chance it's a back-and-forth correspondence to the Ashirra."
  },
  redList: {
    description: "The Red List is a list of the most wanted Kindred for egregious acts against the Camarilla. The wanted Kindred are called Anathema. Alastor is the name for the Kindred who use various methods to track down the Anathema.",
    history: "Camarilla domains started the practice with Lucinde's actions as 'the first Alastor' when she hunted down infamous Kindred, as well as repeat enmity from Ministry methuselah, Keminitri, in European Camarilla domains.",
    currentStatus: "Though some Camarilla members have made calls to remove methuselah from the Red List. They see it as both dangerous and arrogant; it may garner unwanted attention from said blood god."
  },
  structure: {
    innerCircle: {
      description: "The names of the Inner Circle remain unknown, a tactic speculated to be used to avoid revenge as it has no target and resistance cannot flourish. What is known is that there are seven of them, but what clans they are and who they are remains a mystery."
    },
    justicars: {
      description: "With only five clans remaining within the tower, the Justicars hold more responsibility and power than ever. Each are selected to a 13-year term and few, save for the Ventrue, serve more than one. They decide the matters of war and law and act as the voice of the inner circle. Beyond these tasks, they also uphold the traditions. With their title they are able to control any assets or resources of the Camarilla at will; this also includes its members.",
      current: [
        {
          name: "Juliet Parr",
          clan: "Malkavian",
          title: "Former Sheriff of North London"
        },
        {
          name: "Molly McDonald",
          clan: "Nosferatu"
        },
        {
          name: "Diana Iadanza",
          clan: "Toreador",
          title: "Bane of Clan Gangrel"
        },
        {
          name: "Ian Carfax",
          clan: "Tremere",
          title: "Former Archon of Karl Schrekt",
          note: "until 2021"
        },
        {
          name: "Lucinde",
          clan: "Ventrue",
          title: "Justicar for unlife",
          note: "titled in 2018"
        }
      ],
      former: [
        {
          name: "Geoffrey Leigh",
          clan: "Gangrel"
        },
        {
          name: "Manuela Cardoso Pinto",
          clan: "Brujah"
        }
      ]
    },
    archons: {
      description: "Beneath the Justicar are the Archons, who against what one might think, are more than simple hired killers. While they are elite hired killers and warriors, they are also scholars and investigators. Each Archon is hand-selected by a Justicar and given only one chance to deny the opportunity. Should they take it, they will be enforcing Camarilla law, seeking out secrets, or spying on enemies of the tower. Some may operate alone and others work within coteries. Often Justicars will blood bond their Archons to themselves or to each other. Even if they are not bound to anyone by blood they still have less freedom of action than the Justicars. They can expect to be obeyed when they order the Final Death of a Kindred. Due to this, Archons can destroy an entire domain without an explanation."
    },
    prince: {
      description: "Within a domain the Prince sits at the top, a vampire so impressive or cunning enough to be acknowledged as the leader."
    },
    primogen: {
      description: "Beneath the Prince is their council of Primogen, built up of representatives often from differing clans and representatives of the major Camarilla factions. They may be clan elders or those who hold the largest hunting grounds, they speak directly to the Prince and give their own advice.",
      currentState: "Due to the Beckoning and the damage it has caused to domains, some Primogen councils now operate on a rotational basis and others have limited their size to only three or five members which will force an odd number and force votes to pass. In smaller domains there might even be a rule that council members must be under a century of age, believing that clan representatives should be more in touch with contemporary culture and neonate ideals or priorities.",
      duties: {
        trialByJury: "Trial by Jury, although the Prince has sole discretion of punishment, they may have the Primogen convene to render the verdict of innocent or guilty.",
        adviseAndConsent: "Advise and consent, which occurs before the Prince makes any major decision regarding the welfare of the domain, they are obliged to meet with and discuss with the Primogen. This advice can of course be ignored, but it is unwise as Princes are easily replaced."
      },
      councilTypes: {
        tribunal: "Those who see themselves as both judge and jury and work endlessly to find the guilty and punish them.",
        circle: "The Primogens who are obsessed with equality and keeping balance.",
        directors: "With no time for frivolity, they do not see court to be worth the time and focus solely on business.",
        patricians: "Primogens who are convinced they are the most important Kindred within the domain and have inflated opinions of their status.",
        union: "Those who believe themselves as representatives of those without a voice and speak up for the 'common ancilla'.",
        covertCommittee: "Primogens who do not attend court and rarely meet in person. They are elders and while they are still interested in politics, they primarily interact with each other and the Prince through letters and other proxies."
      }
    },
    seneschal: {
      description: "Sometimes a prince will select a seneschal, or personal advisor, to sit with them and in some cases act as a replacement when the Prince is unavailable. Order is held by the domain's Sheriff, a Kindred who acts more of a hitman than a policing force. As the Camarilla frowns upon modern ideas like due process, most executions take place without a trial or the victim's ability to speak against the crimes they've been blamed for."
    }
  },
  traditions: {
    description: "Six traditions create the framework for governance among Kindred. While they are open to interpretations in each domain and some are more important than others, they are ancient traditions that all Camarilla Kindred are aware of.",
    first: {
      name: "The Masquerade",
      text: "Thou shall not reveal thy true nature to those not of the Blood. Doing such shall renounce thy claims of Blood.",
      description: "A tradition kept that is not only universally respected by both the Camarilla and the Anarchs, but also the most broken. This represents the Masquerade, the fact that humans must never know about the supernatural which influences the careful nature all Kindred must have in order to survive the modern age of technology. One slopping feeding, one missed times action on a live stream or one mistimed confession to a mortal lover could spell doom for those involved as the Second Inquisition comes knocking down the door to find the creatures who have breached. It is expected that any issues created are quickly solved before something dire happens to them or those they love."
    },
    second: {
      name: "The Domain",
      text: "Thy domain is thine own concern. All others owe thee respect while in it. None may challenge thy word while in thy domain.",
      description: "Princes own the entire domain which more often than not is the entire city. In some cases, however, they may grant smaller districts or city blocks for others to rule over beneath them. These cases resemble the ancient hierarchy of liege lords and lieges from the late Middle Ages feudalism."
    },
    third: {
      name: "The Progeny",
      text: "Thou shall only Sire another with the permission of thine elder. If thou createst another without thine Elder's leave, both thou and thy Progeny shall be slain.",
      description: "Whenever another vampire is sired, they must first ask for permission from the Prince. Overpopulation is a risk to the Masquerade and additional bodies can quickly become a serious threat."
    },
    fourth: {
      name: "The Accounting",
      text: "Those thou create are thing own children. Until thy Progeny shall be Released, thou shall command them in all things. Their sines are thine to endure.",
      description: "Wayward childer are punished, as without that, their Sires are often killed for their actions. Those who make the cut will join the Camarilla alongside their sire and those who do not are cast out to the Anarchs to be hunted, destroyed or stepped on."
    },
    fifth: {
      name: "Hospitality",
      text: "Honor one another's domain. When thou comest to a foreign city, though shall present thyself to the one who ruleth there. Without the word of acceptance, thou art nothing.",
      description: "Keeping tabs on who is within the city has become difficult in the modern age of refugees and global citizens. While some Princes erect walls or attempt to control the borders through political means, others give up on enforcing this law."
    },
    sixth: {
      name: "Destruction",
      text: "Thou art forbidden to destroy another of thy kind. The right of destruction belongeth only to thine Elder. Only the Eldest among thee shall call the Blood Hunt.",
      description: "A Blood Hunt is a call to arms, one that allows other members of the society to hunt another down and mercilessly kill them. This event even calls Thin-bloods, Anarchs, and the Autarkis to become involved in the murder party. Anything goes during this time, including Diablerie, and it can only ever be called by the eldest which is often the Prince. It is even seen that helping in one of these hunts is a good way to find yourself approved of by the Camarilla, while joining one is frowned upon by the Anarchs."
    }
  },
  history: {
    darkAges: {
      description: "The First Inquisition kicked off when humans discovered the existence of vampires. With organization and faith, humans were adept at hunting Kindred. Some claim this was from Elder meddling and abuse of their childer, using them as fodder; especially under the Blood Bond. Others say it comes from Anarch Revolt recklessness, forgetting the Masquerade, and various blood cults. The end result for either account was the Second Inquisition and the First Anarch Revolt.",
      formation: "The sheer chaos soon wore on Kindred society; this pushed a peace of sorts between the Anarchs and the Elders in 1493. The Kindred formed the Camarilla with the seven clans Ventrue, Toreador, Brujah, Tremere, Gangrel, Malkavian, and Nosferatu as a means of survival. The Convention of Thorns codified the traditions for the Camarilla. A group of Kindred decried the Anarch leaders and elder's alliance forming their own group to counter the Camarilla, the Sabbat."
    },
    sectWarEra: {
      description: "For the years that followed the Camarilla worked on expanding its influence. There were a number of clashes in the New World over cities and territory that came to be known as the Sect War. The encounters heated up in the early 90s between the early 00s as the conflict for influence in the New World grew bigger and bigger.",
      gangrelDefection: "During the tail end of this era the Gangrel left the Camarilla supposedly defecting for Independent, but more socially savvy Gangrel funded Anarchs."
    },
    secondInquisition: {
      description: "During the War on Terror era in the early 2000s, the government agencies begin to find hints of Kindred activity; Swiss bank accounts handed over showing century-old accounts and the Kindred forum, SchketNet. Furthermore, the Inner Circle used the War on Terror as a tool to attack the Sabbat in 2002. Nearing the mid-2000s the Second Inquisition focused on all Kindred. The Camarilla leaked Anarch names to the FBI and NSA, alleging only Anarchs could have leaked first or were responsible with disregard to the Masquerade.",
      consequences: "Kindred skeptical of technology and banks were proved right as many tech-savvy Kindred havens were raided. Many of the Camarilla's major strongholds in Europe were lost. The Tremere's head chantry and Domain, Vienna, fell to a major Second Inquisition attack wiping it out. Domains like London and Marseilles are rumored to be Kindred-free by the SI. Queen Anne, Prince of London is rumored dead, and Francois Villon, Prince of Paris, rules in hiding; Paris is the Camarilla's only crown jewel in Europe now. The Beckoning began to happen, a mysterious event where oldest Kindred are called to the Middle East for the Gehenna War. This resulted in the most powerful emptying Camarilla-held cities."
    },
    brujahDefection: {
      description: "Conclave of Prague, sometimes called the Convention of Prague. A meeting of representatives of each Camarilla clan. There it was publicly revealed by Anarch accounts of the Camarilla's aim to toss the Anarchs and Sabbat to the SI. This news is what seemed to kick off the breakdown of the meeting and the expulsion of the Brujah and all Anarchs.",
      events: "Theo Bell was said to be the first to fire, shooting two prominent Ventrue with incendiary rounds, co-founder of Camarilla, Hardestadt, and Venture Representative, Pieterzoon. This prompted the Brujah to launch an attack. During the chaos the two Ventrue dead and missing respectively. This event kick-started the Brujah exodus from the Camarilla. Brujah all over began to defect leaving domains and switching cities. The Nosferatu feigned going Anarch only to sell Brujah defection information to secure their place in the Camarilla. Making up for their Scheknet debacle. Further revelation of the Gangrel not really going Autarkis, but funding Anarchs. Prompted eyes on the new Anarch threat."
    },
    warOfAges: {
      description: "In response to these events, the Tower has recently forbidden any online presence for Camarilla members. The Masquerade has become even more paramount. A new tactic of pushing the SI to Sabbat and Anarchs to preserve the Tower. A notion to send Thin-bloods as fodder and day agents. Even if the Thin-bloods are typically not offered full protection under Camarilla law.",
      currentStatus: "The Camarilla no longer count all Kindred under their protection, now they see themselves as invite-only who look out for their own. Those Kindred outside the Tower do not benefit from their resources. Anarchs especially can not benefit from any of their assets. As far as Elysia goes Anarchs usually need to denounce their sect or be invited to enter, domain depending.",
      diplomaticRelations: "The Camarilla did have good relations with one sect, the Ashirra; the two started diplomatic talks. With a perfect storm of major events: Second Inquisition, destruction of Vienna Chantry, Clan Tremere Pyramid breaking, Brujah going Anarch, Ur Shulgi's Rise, and Gehenna War in the Middle East. The Camarilla and Ashirra made diplomatic overtures to each other culminating in the Odenses Pact and Vermillion Wedding. This Blood Marriage is a Blood Bond between Victoria Ash of Clan Toreador and Tegyrius of the Banu Haqim. The former led to the official entry of the Banu Haqim to the Camarilla.",
      lasombraJoining: "As the Gehenna War peaked, the Lasombra clan also reached out to the Camarilla to join. The keepers saw that the Sabbat began to devolve, the elders were targeted by monstrous younger Kindred, and the Gehenna war was fruitless. They snubbed the Anarch as Low Clan led by Gangrel and Brujah, seeking to be with a High Clan lead organization. The Camarilla imposed harsh demands on defectors that depended on domain policy, Chicago was one of the first prominent cities delegations were sent to.",
      currentThreats: "The Anarch Movement has proven more potent than before. An Anarch uprising took Berlin from the Tower, once thought to be a stronghold of the Camarilla. The Anarch spread their ideals to other domains or lead attacks on vulnerable cities missing their elders. The Camarilla plans to endure and let the world burn their enemies while they stay safe in their Tower."
    }
  },
  prominentKindred: [
    "Hardestadt",
    "Fiorenza Savona",
    "Prince Kevin Jackson",
    "Victoria Ash",
    "Rafael de Corazon",
    "Prince Francois Villon",
    "Juliet Parr"
  ]
};
window.camarilla = camarilla; 
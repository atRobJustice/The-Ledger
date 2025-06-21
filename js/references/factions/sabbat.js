const sabbat = {
  name: "Sabbat",
  description: "The Sabbat are monstrous creatures; vampire supremacists who see themselves above mortals and do not care for them. They are a sect that evokes fear at its mention with their ideologies being met with loathing. The Sword of Caine wages a war against the Antediluvians, a Gehenna War, seeking to claim revenge for Caine and the ancient betrayal done to him by his childer. Their goal is to destroy the Antediluvians and subject the mortal world to a world with vampires at the top.",
  source: ["Vampire: The Masquerade Sabbat: The Black Hand"],
  sourcePage: [6],
  currentStatus: {
    description: "The Sabbat has shrunk in size in recent nights compared to the others. Due to the Lasombra exodus, the fierce Second Inquisition targeting from their breaches, the Anarchs and Camarilla willingness to combine efforts against the Sabbat, and with high Final Death rate due to the Gehenna War the sects find many sources of peril in modern nights. Even then the challenge only enhances their fervor.",
    sourcePage: [9, 13]
  },
  culture: {
    description: "Unlike vampires within the Camarilla or Anarchs, the Sabbat adhere to something called the Paths of Enlightenment. Humanity is seen as a burden and quickly shed their mortal sensibilities for paths that allow them to be an apex predator. This transformation is paramount above all. Their lineage, clan, and antediluvian mean nothing to them and their goal of building a world of eternal night.",
    decentralization: "With the Sabbat being so splintered in the modern nights and conflicts spread across the world they are now decentralized. What might be common in one Black Hand territory might be unheard of in another and, even the concepts that are considered universal to the sect are subject to regional and individual understanding. These concepts can be things such as ritae, Paths of Enlightenment and even the leadership structure and titles.",
    clanIdentity: {
      description: "Clan is thought to be irrelevant to the Sword of Caine, those are the simple names and structures left over by the Antediluvians they want to overthrow. The culture hardly acknowledges clans even in the cases of Nosferatu. This approach has yielded them to consider their identities in this order: vampires, Sabbat, and then their Path. This aids in suppressing individualism in the sect and makes them alien to outside Kindred.",
      antitribu: "When they do need to disclose their clan they always use antitribu at the end of clan names, even former Sabbat-dominant clans: Lucita is a Lasombra antitribu, Sascha Vykos a Tzimisce antitribu. Of course they still use enemy and rivals banes to their advantage."
    },
    problemSolving: "When it comes to problem solving the sect solves problems, the way 'a real vampire' would. Using disciplines with ruthlessness to silence victims and hunt down witnesses. Of course such blatant supernatural powers attract hunters and the SI, but the Sword of Caine ignores these side effects.",
    beliefs: {
      caine: "The Sect holds the Dark Father, Caine, as the progenitor and idol of all vampires. This is where their hate and war of the antediluvians stem from, the Sabbat's fanatical belief the childer of Caine betrayed his will and started the struggle of ages and elder manipulation that is still waged millennia later. Such a struggle once born from medieval rebellion against elders has descended into endless fighting and constant violence, as brutality is the way of the world in their worldview as their enemies are simply pawns of the antediluvians.",
      posthuman: "The Sabbat sees themselves as posthuman in the most extreme way. Caine is the conquering blood god and they are beyond mortals, deserving to treat them as predators treat prey. They want to bring down the Masquerade as they only view it as a trick of the antediluvians, and the Camarilla as the blatant will of the antediluvians.",
      relationships: {
        camarilla: "They have the most enmity with the Tower being overall suspicious and hostile of the organization.",
        anarchs: "They see the Anarchs as misguided so close to the revelation of Caine. They seek to destroy rival cults and their leadership for the younger kindred's own good so they can finally see the truth."
      }
    }
  },
  goals: {
    description: "When getting to the core of the modern Sabbat, they are as they have ever been, uncompromising. This has left the nuance of their agenda shrouded to the other factions. At the core they want unbridled freedom. They see their goal of unbridled personal freedom hampered by the Antediluvians who they see as not only cannibalistic gods, but as the antithesis of their beliefs. To fight gods they fear will end their existence they see fanatical deviation as the only way. They see any lack of total devotion as tools, collaborators, and idiots; thus the Anarchs, Camarilla, and Autakris are seen as such.",
    currentObjectives: {
      camarilla: "They see either subjugation or destruction of their age-old enemy, the Camarilla, as high importance.",
      anarchs: "For the Anarchs, they want to bring their 'estranged siblings' the Anarchs into the fold by the sword.",
      general: "All in all they seek the destruction or upheaval of any rival kindred organization, only then can Kindred see the rightness of the Sabbat way."
    }
  },
  structure: {
    description: "The membership of the Sabbat has decreased and in turn the structure of their hierarchy has been hollowed out partially. Remaining are a few high-ranking titles with no middle ranks due to the size, decentralization of the sect and no need for middle management.",
    titles: {
      common: {
        regent: "The Regent is the leader of the whole of the Sabbat. The current Regent is unknown, some even suspect the position is vacant.",
        archbishop: "Archbishops oversee domains to maintain the Gehenna War effort. Usually an Archbishop holds multiple domains or one very important domain.",
        bishop: "Bishops oversee domains to maintain the Gehenna War effort. Usually a Bishop holds a single domain.",
        packPriest: "The spiritual and tactical leader of a pack, who helps guide his pack down their path.",
        trueSabbat: "Those Sabbat members who have officially joined the sect having passed ritus and adjusted to a Path of Enlightenment.",
        ductus: "The Ductus role is hardly ever used, as it used to be the tactical leader of the pack. Ductus is now usually folded into the Pack Priest role."
      },
      uncommon: {
        cardinal: "Cardinals now refer to the warlords with mobile domains outside the Gehenna War hot areas, losing their more administrative role for lead hawkish warbands.",
        prisci: "Priscus work as spymasters, logisticians, and councilors to Archbishops and Bishops. Front line fighters have little respect for them, but they certainly have helped the sect survive the war.",
        paladin: "Paladins and Templars titles that have fallen to disuse from young not recognizing such authority or packs overusing the terms."
      }
    },
    packStructure: {
      description: "Packs are not only adapted to one path, but to one purpose as well. This is mandated by the Bishop, Archbishop, or other leading figure. Though some packs are their own authorities depending on the region, and how well Bishops can back up a line of command. Nonetheless packs can be infiltrators, soldiers, body-snatchers, saboteurs, etc. The pack's unity is the Sabbat's greatest strength, even becoming infamous for being almost creepily like-minded in goals in modern nights.",
      roles: {
        warrior: "Assassins, brutes, commanders, Guards",
        liaison: "Fast talkers, tempters, seducers, silver-tongued devils",
        scout: "Spies, radicalizers, gossip seekers",
        cleaner: "silencing victims, cleaning massacres, covering tracks",
        scholar: "Researcher, strategists, translators",
        procurer: "Smugglers, Plunderers, thieves, traffickers"
      }
    }
  },
  pathsOfEnlightenment: {
    description: "The Pack priest influences and guides new Cainties on the Paths of Enlightenment. The path compliments the pack's purpose. Their path replaces a Kindred's Humanity. While Humanity denies the beast and keeps it bay, the Paths allow the beast to have some sway over the Cainite, a relationship to the Beast is sought since they believe denying the beast is denying part of who the Cainite is. The beast and the Cainite walk side by side in unlife. To mortals and other Kindred, such thoughts and morals are alien.",
    changingPaths: "Once on a Path of Enlightenment it is rare to change, as it requires being broken down again to near wassail and finding a new teether to the Beast. Many shy away from such a practice, a select few may see it as an experience to help with transcendence.",
    activePaths: {
      pathOfCaine: {
        description: "The premise of this path is to cultivate power in order to emulate the first vampire, Caine. Blood is everything to Noddist, who will rarely pass up a chance for it. They view the beast as a servant and not one to be denied, instead considering it as an eternal conflict that must be nourished and respected.",
        ethics: [
          "Lower one's generation and concentration on one's Blood to become closer to Caine and delight in the power it yields.",
          "Partake in all blood to understand and build wisdom from the power contained.",
          "Leaders must not fail and should they hold the pack back, diablerize them."
        ],
        disciplines: ["Blood Sorcery", "Blood Sorcery Rituals", "Animalism", "Obfuscate", "Potence", "Protean"]
      },
      pathOfCathari: {
        description: "This path is one of excess, indulgence, and giving in to every desire no mater how atrocious, but it usually serves a purpose. To outsiders looking in, the Albigensians may seem selfish, immature, and hedonistic. But if they are Damned, why not act the part? They revel in their wicked nature, doing whatever their Beast drives them to do.",
        ethics: [
          "Experience every vice that being undead affords.",
          "Accept being a creature outside of mortal morality and lead others into damnation or destruction.",
          "Indulge all temptations, give oneself wholly to the beast."
        ],
        disciplines: ["Physical disciplines", "Auspex", "Obfuscate", "Presence"]
      },
      pathOfDeathAndSoul: {
        description: "This is the most studious of paths, with their main subject being death. Necronomists aim to study it, understand it, and master it, so that their enemies stay dead. They fight the Gehenna War from a distance as strategists or engineers, and keep their Beasts at arms length unlike most other paths.",
        ethics: [
          "Leave no survivors at the conclusion of violent conflict.",
          "Investigate the relics and remains of death – personal, historical, occult – in order to discern the details of how the conflict ended and its existential outcomes.",
          "Hasten death's arrival, from humblest insect to the much-lamented flower of human life."
        ],
        disciplines: ["Oblivion", "Oblivion Ceremonies", "Auspex", "Blood Sorcery", "Dominate"]
      },
      pathOfPowerAndInnerVoice: {
        description: "This path's main goal is to subjugate and impose their will upon the world around them. Sometimes even the Beast itself is enslaved by the most accomplished of Unifiers. To them, the Beast is a tool, knowing when to use it is key to mastering it.",
        ethics: [
          "Reward success and excoriate failure, including one's own.",
          "The world around the Cainite exists to be exploited to their benefit: The enlightened Cainite bends it to their will.",
          "Force those who are beneath one's own position into servitude using all the means at one's command."
        ],
        disciplines: ["Social and/or Mental Disciplines first", "Physical Disciplines second", "Dominate", "Fortitude", "Potence", "Presence"]
      },
      pathOfSun: {
        description: "A Thin-Blood only (and perhaps some Caitiff) path that take pride in the fact that they are free of the influence of the Antediluvians. It's a new and growing path that isn't exactly set, and their beliefs are ever changing.",
        ethics: [
          "Let neither one's mortal nor Cainite heritage limit one's potential.",
          "Destroy Cainites but never consume them, leaving oneself untainted.",
          "Do not allow other would-be Prometheans to serve the polluted bloodlines of the Antediluvians."
        ],
        disciplines: ["Thin-Blood Alchemy"]
      }
    },
    forsakenPaths: {
      pathOfBeast: "A violent path that sees their Beast as their true selves rather than a separate entity, seeing their human minds as an obstacle. While they become powerful quickly, it's hard for them to avoid drinking in excess over time, whether that be mortals or each other.",
      pathOfHonorableAccord: "It is rumored that this philosophy has been practiced since before the founding of the Sabbat. They are known as 'paladins of Caine,' sacrificing their personal desires to become one with the Beast, but this has fallen out of practice.",
      pathOfLilith: "The Dark Mother,' and 'the Mother of Monsters,' are a couple of titles for Lilith. Followers of her path may believe her to be the true creator of vampires, among other kinds of supernatural creatures, but the Caine-centric Sabbat see this as heresy."
    }
  },
  ritae: {
    description: "Ritae is another word for 'rituals' within the Sabbat, 'ritus' for a singular ritual. Rituals are a huge part of this sect, it is used to connect with other cainites and their packs. Each pack and/or each Path of Enlightenment may even have their own unique ritae.",
    types: {
      auctoritas: {
        description: "These are formal rituals or grand rites almost every pack uses and it's purpose is to unite members as a Sect.",
        vaulderie: {
          description: "The most well known ritual. This practice consists of usually the whole pack contributing their vitae into a chalice or other kind of container, and then the Pack Priest imbues the mixture with a power that both breaks previous Blood Bonds, and forms new ones with whoever contributed to the mixture.",
          effects: "This bond among the pack members is called 'vincula,' and is usually weaker than normal Blood Bonds, but can become stronger overtime, rendering packmates unable to betray each other."
        },
        creationRites: {
          description: "This is the act of creating new Cainites for the Sabbat, and it's one of the most important ritae. Again each Path and perhaps even each Pack do it differently. From dark but splendid displays, to the classic shovelheading and burying alive of fledglings, Creation Rites could look like many things.",
          process: "What's most consistent is that they usually Embrace more than one person, several people actually, and throw them into a pit or bury them alive, and they see who can dig themselves out. Whoever comes out alive is then stripped of their humanity and indoctrinated into a Path."
        },
        monomacy: {
          description: "The blood duel, a tradition older than the Anarch Revolt. This can be called when a disagreement cannot be settled by their Priest, a contest of combat or some other skill.",
          outcome: "Whoever loses gets diablerized by the winner as the Sabbat believe the winner has Caine's favor."
        },
        bloodFeast: {
          description: "From the Cainite's perspective, the relationship between vampire and human should be predator and prey, predator eat their prey, and they don't care who they are as people. That is what this ritus demonstrates, that humans are simply food.",
          process: "During this practice, the Cainites engorge themselves with mortal blood, sating their hunger in such a way it seems excessive, because it is. Usually these mortals are kidnapped beforehand."
        },
        festivalOfDead: {
          description: "Also known as Festivo dello Estinto. This ritus is to commemorate their fallen, including even those from the Anarch Revolt centuries ago. They also use this time to think about the First and Second Inquisitions and how they have killed so many Cainites."
        },
        fireDance: {
          description: "Cainites use this ritual to face their fear of fire and gain respect from their packmates. A bonfire or other large flame is lit and the members egg each other on to get through the flames, or even dance through them."
        },
        bloodBath: {
          description: "This is for when a title or position of power has been claimed beyond a Pack, such as the Bishop or Arch Bishop. This is like a cursed baptism, as they person who claimed the title is anointed or doused in preferably mortal blood, but animal blood works, too."
        },
        warParty: {
          description: "A War Party is similar to a Bloodhunt in that they pursue and diablerize their enemies. They go after strong, high value targets as a pack."
        },
        wildHunt: {
          description: "The Wild Hunt is the closest thing the Sabbat has to a Bloodhunt because this time they are hunting a traitor within their ranks, or a particularly hated foe."
        }
      },
      ignoblis: {
        description: "These tend to be informal rituals created within packs to differentiate them. They can be used to test the courage, faith, loyalty, etc., to each other.",
        commonRitae: {
          pathOfCaine: "Their ritae are often used to reach altered states of consciousness, using pain, deprivation of blood, stressful positions, and sometimes Disciplines.",
          pathOfCathari: "Rituals for this path are fun and bring joy to the undead hearts of the pack. They indulge in their desires and unlike many other Paths, they include mortals.",
          pathOfDeathAndSoul: "They love to demonstrate how fragile life is and how permanent death is. This is one of the most structured Paths, and so their Ignoblis Ritae are also organized, planned on a calendar, and performed with precision.",
          pathOfPowerAndInnerVoice: "Their rituals are usually tests of mental fortitude under stress, endurance, dominance, and competitions, often done without combat."
        },
        huntingRitae: {
          pathOfCaine: "They usually go after other vampires, especially Thin-bloods, rather than humans when hunting together since diablerie is a huge part of their twisted beliefs.",
          pathOfCathari: "They like to play with their food, hiding their nature until the last second, and teasing their desperate victims to try to escape.",
          pathOfDeathAndSoul: "They tend to feed from the recently dead or close to dying. Sometimes they even feed from the energy of ghosts.",
          pathOfPowerAndInnerVoice: "The members of packs within this path usually keep around a large number of herd members or blood dolls, like actual cattle."
        }
      }
    }
  }
};
window.sabbat = sabbat; 
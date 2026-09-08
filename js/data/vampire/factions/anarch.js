export const anarch = {
  name: "Anarch",
  nicknames: ["The Movement"],
  predominantClans: [
    "Brujah",
    "Gangrel",
    "The Ministry",
    "Caitiff (sometimes)",
    "Camarilla clan dissidents"
  ],
  description: "Originally called the Anarch Revolt, this sect is as old as the revolution against the Camarilla itself. In recent decades it has seen vast growth as younger kindred find it increasingly difficult to understand why they must follow the laws of elders who care nothing for them, but to throw them in harms way when needed. All vampires who fall outside of the Tower's control are considered \"unbound\", and the Anarch movement is a small but visible subsection of the unbound who, rather than hide, have decided to fight back. They fight to claim territory from those who oppress them, as the ancient hands that held onto it are disappearing due to the Beckoning or other outside forces. Word on the street is that the Anarchs seek revolution. With more and more elders disappearing and younger fresher kindred appearing the Anarch numbers grow. The centuries long lethargy has worn off as they remember how to fight.",
  source: ["Vampire: The Masquerade Corebook"],
  sourcePage: [54, 55],
  culture: {
    description: "Just as with Camarilla domains, each Anarch domain is different. Anarch values vary from domain to domain, with one unifying trait: Rebellion against the Tower. Princes are quick to deal out punishments not only for breach of archaic laws, but for any trace of association to the Movement. But the footing Camarilla Courts once had are slipping, especially after members of the sect were suspected for the advent of the Second Inquisition.",
    mortalIntegration: "Most Camarilla vampires influence humankind from deep within the shadows, manipulating them from the outside. Many Anarchs, however, integrate themselves into mortal lives to a much larger degree. This guise makes them simultaneously safe and vulnerable. Their connection to mortals leaves room for mistakes, but they are also members of mortal society rather than a mansion-bound recluse.",
    rants: "These events are usually organized by Brujah, but are no longer just the clan. Now rants are universal and open to all Anarchs. Akin to a political open mic night, where anyone has a chance to talk. An Anarch is able to use their time to argue and convince the other members of their point of view. The crowd reacts to the speaker, getting the crowd fired up or getting booed off stage. The event favors those who can utilize charisma and eloquence.",
    clanNicknames: {
      malkavian: {
        name: "Unchained Malkavians",
        description: "Called so from the belief they are disconnected to the Blood and Network."
      },
      nosferatu: {
        name: "Red Nosferatu",
        description: "Mockingly called so by the Camarilla but adopted by Anarch Nosferatu for having a 'mini revolution.'"
      },
      toreador: {
        name: "Abstract Toreador",
        description: "Mockingly called so by Camarilla Toreadors, and adopted by Anarch Toreadors."
      },
      tremere: {
        name: "Ipsissimus Tremere",
        description: "Sometimes considered the fourth house, these Anarchs are called so because many pursue an arcane sense of self, hence the name."
      },
      ventrue: {
        name: "Free Ventrue",
        description: "Many considers themselves free from the traditions, taboos, and hierarchy of the clan."
      },
      hecata: {
        name: "Emancipated Hecata",
        description: "Nickname used to distinguish Hecata with Anarch political leanings from their counterparts."
      },
      tzimisce: {
        name: "Enlightened Tzimisce",
        description: "Theoretical name."
      }
    }
  },
  structure: {
    description: "Anarch domains commonly follow Gang Rule, with turf split among gangs, or a Barony when one leader rises over the others. Below are roles and groups a domain may include; many domains combine them.",
    gangRule: "A domain ruled by various Anarch gangs. Some are in a perpetual state of tension and others exist in an intricate web politics keeping them from open warfare. Some domains such as these are forward operating bases for gangs to plot moves against nearby Cam domain, domains in eternal gang wars, peaceful Anarch commune ruled mutually, or some other way.",
    barony: "When a gang boss rises to the height of power over others, they become a Baron. A Baron has to shore up support and mingle with their subjects to maintain power compared to a Prince's Praxis. A Baron typically rises when one of the gang bosses rises to the top in power and influence. They could also be appointed by majority, or even claim a mandate when the revolution succeeds in a domain.",
    baron: {
      description: "An informal title for the Anarch leader of a domain or Barony. How they have or wield the power varies by domain and groups. They may be charismatic gang leaders, brutal warlords, an elected public representative, or any other form of leadership. A particular distrusted type of Baron is the one who claims the sole seat of a whole city, like a Prince. They may keep the power to dole out hunting ground and make major decisions, depending on the domain and their base of power. Unlike a Camarilla Prince, Barons typically need to interact with their subjects and negotiate with various parties of the city if they want to be secure in their position."
    },
    revolutionaryCouncil: {
      description: "An Anarch Revolutionary Council may also be the governing body that wields the power in a domain, or they may do it alongside a Baron. Councils are groups of Kindred that may ostensibly be 'appointed' or 'elected' depending on the domain, though any formal process is likely just sham. The councilors may claim the right to set hunting grounds and set up the policies of the domain."
    },
    emissaries: {
      description: "Emissaries are diplomats who may work between gangs, cells, councils, Barons, or from Anarch domains to Camarilla domains. As a domain can have any number of factions within and outside; some domains necessitate a large amount of emissaries to push a group's agenda or deliver messages."
    },
    sweeper: {
      description: "A controversial role that some domains may have that may not even be official. This role is for powerful Anarchs who have the power and gumption to remove problem Kindred from the domain. Traitorous gangs, Kindred on an Embracing spree, a Camarilla spy, etc. They deal with it one way or another. They work like the fixer of the domain who other Anarchs can appeal to for such problems. Those that take the role may find it socially isolating. Protectionist in nature that takes care of dangerous elements in a domain, but some see them as glorified snitches."
    },
    gangs: {
      description: "Gangs are similar to a coterie, a group of Anarchs who carve out territory or turf and they overlook it. Oftentimes may get into conflicts with others when they claim too much or clash with other gangs. This is considered by some the basic unit of organization in the Movement with 3-10 Kindred members being the norm. Gangs can get up to large groups as big as 20-30 members, their mortals included. Mortals are often not told of the vampiric side of their group, except for ghouls. Ghouls often operate as henchmen and messengers for the Kindred member of a gang."
    },
    cells: {
      description: "Cells are underground coteries of Anarchs who work similar to a political cabal or criminal syndicate. Cells do not usually get into as much open conflict as gangs, as they prefer working with clandestine tactics and emphasize security. They may operate in Camarilla territory making their secrecy even more important."
    },
    commonRoles: {
      description: "As work is needed in a domain, many step up and fill a role as needed. Anarchs lack official titles, but these common roles appear with higher frequency.",
      gangBoss: {
        description: "While some Anarch gangs are more egalitarian, others designate a leader that others look to for guidance when trouble happens."
      },
      lieutenant: {
        description: "A leader's second in command. Back up the gang boss or stand in for them."
      },
      secretary: {
        description: "These Anarchs keep track of agreements."
      },
      treasurer: {
        description: "The Anarch who organizes, cleans, and bankrolls the money for the Movement."
      },
      tailGunner: {
        description: "Taken from biker vocabulary. This Anarch looks after the youngest and weakest members of a gang on missions and fights."
      }
    },
    domainTypes: {
      theMovement: "Sometimes called Carthaginian domains. Ruled by a charismatic visionary who leads the Kindred in the old ways of Carthage of living with mortals. They typically argue for the abolishment of the Masquerade. These domains are unstable though produce willing herds and blood cultists. Many attract Anarch scholars and occultists. Many fall to the Second Inquisition, Camarilla, or even other Anarchs opposed to such Carthaginian practices.",
      fakeAnarchDomain: "Anarch in name only. An Anarch boss who wants to be Prince, or a Camarilla prince attempting to hide their domain's allegiance. They may succeed in their deception or face an uprising.",
      gangWar: "A domain lacking in high-minded ideological thought, but many Anarch gangs surviving the night. Each gang has their own leader; rivalries between each stoke constant conflict. Possible to stabilize when one gang wins dominance, or conflict may be exploited by rival Kindred factions or the SI.",
      oldAnarchDomain: "A hold out domain since the Second Anarch Revolt, some of the oldest Anarch domains may remember the First Anarch Revolt. Leadership style can change, but the Kindred have stabilized customs and are strongholds of experience opposing the Camarilla. Though such domains too can fall to the waves of change from the Third Anarch Revolt, and depose their old guard elites.",
      ongoingRevolution: "A recently flipped domain that is still sorting itself out. Maybe still searching for Camarilla members or trying to stabilize. The revolution may spread or lead to infighting.",
      openCity: "Anarch domain very hands off and open for any Kindred to visit. City leadership takes security extremely seriously, but not so much other affairs of the city. The reason for being an open city is usually beneficial in some way. If the leadership is too weak to defend itself it may collapse.",
      preRevolutionDomain: "A Camarilla domain on the brink of uprising or Camarilla in name alone. Prince's power has eroded; gang bosses and demagogues are rising. If successful they can oust the last remnants of the Camarilla. They may fail, by falling to infighting with the Camarilla simply outlasting the Anarchs.",
      specialExperiment: "A domain where ideologues put their theories for Kindred society to the test. If the theories are good or the gang boss has enough influence the domain can stabilize and be a model others try. Common outcome is failure as the domain devolves into chaos.",
      wasteland: "Many vampires are destroyed, the survivors largely hide in their havens. Usually a result of an SI operation or Sabbat attack being successful. No Anarch leaders remain. Either the domain can start anew with a clean slate or remain occupied by the hostile force."
    }
  },
  history: {
    ageOfCarthage: {
      description: "Carthage is sometimes called the 'Third City' in Anarch circles, said to be a major hub for vampires and mortals coexisting like in the First and Second city of Kindred lore. While much debate over the city's nature still rages, especially with the Camarilla and Anarch account, it still stands as an inspiration to many. The North African city is said to have lacked any need for vampires to hide. Kindred were in leadership roles, but the degree is uncertain. Troile, the supposed Brujah Antediluvian, is claimed to have led the city with Brujah and Banu Haqim vampires as the undead majority. The city was eventually destroyed by a Ventrue and Malkavian backed Rome and Troile buried under the earth. Though the city fell, it remained in many Kindred's mind as a symbol of defiance to the old ways, for better or worse."
    },
    firstInquisition: {
      description: "With the First Inquisition in full swing the flames of the Inquisition hit Kindred hard. During the 15th Century elders used their childer as pawns to sacrifice to save themselves from the Inquisition, but not all of the young Kindred died. Some modern Camarilla vampires blame Kindred arrogance and their mingling with mortal for the hunting and destruction of Kindred. Whatever the case, Europe found itself in the First Anarch Revolt."
    },
    firstAnarchRevolt: {
      description: "Young Kindred were tired of being seen as toys and properties of their sires, who often employed a more draconian system where loyalty was ensured with Blood Bonds and enforced expectations of servility to older monsters. The Anarch ideas challenged the status quo. A Brujah vampire, Tyler, rose to prominence as 'the First Anarch'. A rebel English peasant in life, she spread the ideals and revolutionary violence that would later become the movement.",
      bloodSorcery: "To fight the Blood Bond it is said warbands of kindred discovered Blood Sorcery that broke their Bonds and instead tied them to their comrades. This allowed Anarchs to strike out against their old masters.",
      majorEvents: "Major events that highlighted the movement was the apparent destruction of the Tzimisce and Lasombra clans' progenitors. These rumors gave the Anarchs a sense of legitimacy and galvanized younger Kindred. Many leaders of the movement were of the Brujah, Banu Haqim, and Lasombra clans, though most clans experienced their fledglings and neonates revolting against the old ways to some extent."
    },
    conventionOfThorns: {
      description: "Even with the Revolt in full swing Kindred society was still plagued by the Inquisition. It is rumored that the elders began luring the Inquisition towards the Anarchs, though elders claim that it was the audacious attacks of the Anarchs that attracted the inquisitors. Either way, all Kindred were being worn down by the onslaught. A peace summit was proposed --- the Convention of Thorns --- and the formation of a Kindred alliance by Hardestadt the Elder and his associates. In 1493, the deal was offered with mixed reactions. The Lasombra and Minister representatives refused, more extremists like Tyler led a walk out, but the majority of Anarch leaders signed the alliance and acknowledged the Camarilla and its traditions as law for all Kindred.",
      consequences: "The immediate consequence of the Camarilla formation was a vicious attack by Anarch extremists, who loathed the deal their leaders struck. Silchester was at the center of a mass Masquerade violation and the supposed destruction of Hardestadt the Elder by Tyler. To her regret, this faction of Anarchs soon turned into kindred supremacists, eventually becoming the Sabbat.",
      aftermath: "For the years after, the Anarchs worked more so as a political ideology or wing under the Camarilla umbrella, even fighting in the Sect Wars in the 90s against Sabbat incursion on New World cities. That said, there were locations where more hardliners pushed to differentiate themselves, such as the Anarch Free States."
    },
    variousRevolts: {
      paris: {
        description: "Paris is considered along with London and Berlin to be the three Camarilla jewels of the Old World, strongholds since its founding. This stronghold was lost twice to Anarchs, during the French Revolution and May 68. The Revolution was bloody and led to many elders destroyed by both mortal mobs and Anarch groups. Prince Francois Villon was forced to flee the city. In the end kine got new ideals to spread in Europe, but Kindred saw Francois return and return to the status quo. May 68 had a seemingly similar start for Kindred, but was prevented from becoming a full uprising."
      },
      sovietUnion: {
        description: "Young Kindred used the October Revolution as a means to rage war against the elders. They succeeded in the uprising and now they wanted a new country, ruled by the Congress of the Revolutionary Council, or the Brujah Council. Their aim was to make an egalitarian society from the Blood of Princes and elders, like Carthage, though for Kindred but not necessarily mortals. That proved to be a major issue for Kindred in the USSR: whether mortals deserve to be treated equal to Kindred. This motion was eventually brought to a vote and lost, with the Council officially seeing mortals as just tools and food, forever changing the course of the Soviet Anarchs. Kindred with mortal sympathies were purged, Masquerade breaches harshly punished, and mortals manipulated to easily give blood. It all fell apart as the mortal nation dissolved and Princes started to stake out individual domains. Some Anarchs still hold enmity to those of the old Brujah Council."
      },
      anarchFreeStates: {
        description: "Los Angeles, California in the United States was host to a revolution in 1943. Camarilla Prince Don Sebastian's rule was challenged, and revolution was underway. Jeremy MacNeil rallied the Kindred of the domain to stand up to the cruelty of the Prince. In 1944, Don Sebastian supposedly met final death at the hands of Salvador Garcia. Making MacNeil and Garcia Anarch icons, and the Camarilla considered the area a lost cause for years to come. The Anarch States survived Sabbat invasions, Camarilla incursions, and others trying to impose their rule. The area is largely many smaller domains in the San Fernando Valley; ruled by gangs, cells, Barons, etc. who only come together during times of crisis."
      }
    },
    sectWarEra: {
      description: "A sect-wide conflict during the 1990s and early 2000s where the Sabbat attacked the North America domains of then allied Camarilla and Anarchs. This solidified the Anarchs' hatred for the Sabbat."
    },
    defectionFromCamarilla: {
      description: "As the turn of the millennium came to pass, so began the War on Terror and the so-called Second Inquisition. By unearthing old bank accounts and vampire communications thought encrypted, agents in different levels of the government began noticing Kindred activity. Camarilla vampires began to leak information on Anarchs to the FBI and NSA to divert attention. The Red Question, a divisive Anarch hacktivist group, disappeared around this time just a few years after causing a major financial loss to many Camarilla vampires through the crash of 2008. Other problem Anarch groups saw more attention from mortal governments. Such disruptions to Courts and factions soon lead to a call for a Conclave to discuss the future of Camarilla domains.",
      conventionOfPrague: "While it is technically the Conclave of Prague, the Anarchs have taken to calling it the Convention of Prague, paralleling it to the importance of the Convention of Thorns. There, Camarilla Courts' new secret policy of directing Second Inquisition operations to not just Sabbat, but also Anarch domains, came to light. This alienated many Brujah and Anarchs. Theo Bell decapitated Hardestadt and galvanized other malcontents to attack Camarilla officials and defected. A ripple effect from this spread quickly, cities flipped, Anarch domains swelled, and political lines were drawn. The Anarchs had officially broken off from the Camarilla for their betrayal."
    },
    warOfAges: {
      description: "Anarch activity received aid in secret from Gangrel sympathizers. Now with aid, numbers, and motivation, the Anarch could capitalize on Camarilla domains bereft of elders from the Beckoning. Anarchs advanced on weak Camarilla domains, and even abandoned Sabbat domains, spreading the revolution and inspiring others to rise up.",
      berlin: "This was most famously seen with the fall of the Camarilla stronghold Berlin where an infamously cruel Camarilla Prince was overthrown by a mob of Kindred slaying him in the open.",
      consequences: "The turn of events has led to a number of things. The first is the Camarilla shutting its doors to anyone not pledging their allegiance, as well as no longer welcoming anyone of 14th generation or weaker. They also instituted limits on technology, banning the use of networked computers and phones in fear of the now rampant Second Inquisition. Anarchs, typically more adept at using tech, plan to leverage this to their advantage.",
      ministryAlliance: "The Anarchs were soon joined by the Ministry. A clan that was recently spurned by the Camarilla, as they tested the waters joining the Tower and investing, their meeting was blown up and their enemies, the Banu Haqim, invited instead. The Ministers aided the Anarchs in spreading the Movement in places not once thought accessible.",
      tzimisce: "Many young Tzimisce have gone Anarch as well, finding their elders' and sires' greed hampers their own growth."
    }
  },
  prominentKindred: [
    {
      name: "Agata Starek",
      description: "A Brujah Anarch of infamy. Polish-born Kindred has taken on many monikers, all inspired for her appetite for Camarilla Princes. A serial diablerist and Bahari sympathizer, she engages in more brutal methods against the Tower."
    },
    "Theo Bell",
    "Salvador Garcia",
    "Rudi",
    "Jeremy MacNeil",
    "Maldavis",
    "Anita Wainwright",
    "Voerman Sisters",
    "Juggler",
    "Evelyn Stephens",
    "Haze",
    "Rafa",
    "Saule",
    "Katsumi",
    "Joshua \"Blackjack\" Tarnopolski",
    "Nelli G",
    "Issacs Abrams",
    "Victor Temple",
    "Tyler",
    "Hesha Ruhadze",
    "Damsel",
    "Annabelle Li",
    "X",
    "Jasper Heartwood",
    "Carver",
    "Saima Aro",
    "Bobby Weatherbottom",
    "Dalia Nakache",
    "Aren Konway",
    "Thomas Chartrand",
    "Chinasa Adeyemi",
    "Gérard",
    "Gengis",
    "Jennifer MacKay",
    "Cyfrin Pariah",
    "Liane \"The Smile\" Wind",
    "Asad Seddiki",
    "Dumdum",
    "Leni Kroll",
    "Gary Tupmann"
  ]
}; 
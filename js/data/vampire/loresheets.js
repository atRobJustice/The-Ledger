export const loresheets = {
  name: "Loresheets",
  description: "Loresheets are specific advantages tied to a character's background either through their lineage or their history. When looking at loresheets the players should consider how to tie them into their character's background and the plausibility of their implications together with their storyteller. Some loresheets require the character to be of a specific clan, especially Descendant loresheets, and others require certain cults. Players are able to take a Bloodline Loresheet in addition to a non-lineage Loresheet at Character Creation. Additionally, Storytellers may decide that Descendant loresheets are able to count as Bloodlines.",
  source: [
    "Vampire: The Masquerade Cults of the Blood Gods",
    "Vampire: The Masquerade Players Guide"
  ],
  sourcePages: [
    219,
    114
  ],
  rules: {
    dotValue: "1 to 5",
    note: "Each level of a loresheet must be bought separately, meaning that having level 3 in a loresheet does not mean the character also has levels 1 and 2.",
    source: "Vampire: The Masquerade Corebook",
    sourcePage: 190
  },
  categories: {
    corebook: {
      name: "Corebook",
      source: "Vampire: The Masquerade Corebook",
      loresheets: {
        bahari: {
          name: "The Bahari",
          restrictions: "N/A",
          description: "Connected to the cult of the Bahari. Different levels grant bonuses based on their beliefs and ideology when embracing it.",
          sourcePage: 382
        },
        theoBell: {
          name: "Theo Bell",
          restrictions: "N/A",
          description: "Connected to the Anarchs and Theo Bell. Different levels grant bonuses related to commanding a group, gaining information on Anarch defectors, or contacting Theo himself.",
          sourcePage: 383
        },
        cainiteHeresy: {
          name: "Cainite Heresy",
          restrictions: "N/A",
          description: "Connected to the Church of Caine. Different levels grant bonuses related to finding other Church of Caine, representing the character's role within the city's diaconate, sensing True Faith, inducing the Red Pentecost, or the possession of a rare testimony.",
          sourcePage: 384
        },
        carna: {
          name: "Carna",
          restrictions: "N/A",
          description: "Connected to the House of Carna and Carna herself. Different levels grant bonuses related to other members of the House, strengthening pools against Blood Bonds, aids in Rituals, creating a Blood Bond, or owning a copy of a rare book.",
          sourcePage: 385
        },
        circulatorySystem: {
          name: "The Circulatory System",
          restrictions: "N/A",
          description: "Connected to the Circulatory System and their mortal trafficking. Different levels grant vessels to feed from, it aids in learning alchemy, securing safe travel for Kindred, or learning the resonance properties of blood.",
          sourcePage: 386
        },
        conventionOfThorns: {
          name: "Convention of Thorns",
          restrictions: "N/A",
          description: "Connected to the Convention of Thorn. Different levels grant the character information surrounding the events which they can use for their gains.",
          sourcePage: 387
        },
        firstInquisition: {
          name: "The First Inquisition",
          restrictions: "N/A",
          description: "Connected to the Inquisition and its history. Different levels grant knowledge about the original hunters and in turn about the Second Inquisition.",
          sourcePage: 388
        },
        golconda: {
          name: "Golconda",
          restrictions: "N/A",
          description: "Connected to the Golconda and its enlightenment. Different levels grant knowledge of it, copies of its information to learn it, the ability to utilize some of the beliefs from Saulot to stave off hunger, or the ability to walk in the sunlight without harm.",
          sourcePage: 389
        },
        descendantOfHardestadt: {
          name: "Descendant of Hardestadt",
          restrictions: "Ventrue only",
          description: "Connected to the Hardestadt and his descendants. Different levels grant the ability to speak over any noise, strengthen the pools when sending others into danger, grant status due to lineage, contact one of the Camarilla's founders, or take on the name of Hardestadt and be his successor.",
          sourcePage: 390
        },
        descendantOfHelena: {
          name: "Descendant of Helena",
          restrictions: "Toreador only",
          description: "Connected to Helena and her descendants. Different levels grant the ability to alter the character's status by uttering her name, decrease the experience cost of specific talents, aid pools when making rolls to avoid blame, or open a Succubus Club in the character's domain.",
          sourcePage: 391
        },
        sectWarVeteran: {
          name: "Sect War Veteran",
          restrictions: "N/A",
          description: "Connected to the war between the Camarilla and the Sabbat. Different levels grant the ability to gain information about the wars in the character's domain, gain status for the character's bravery during the war, claim trophy kills, aid in setting up ambushes or attacks, or know how to ignite sect wars.",
          sourcePage: 392
        },
        trinity: {
          name: "The Trinity",
          restrictions: "N/A",
          description: "Connected to the Golden Age of Constantinople and the vampire utopia it once was. Different levels grant the knowledge of Constantinople's past, calming a violent court, inspiring others, allowing the character to find and contact Dracon, or rebuilding the Trinity with two others.",
          sourcePage: 393
        },
        voermanSisters: {
          name: "Jeanette/Therese Voerman",
          restrictions: "N/A",
          description: "Connected to the Voerman Sisters. Different levels grant the character varying levels of connections with the sisters up to ownership of an Asylum club within the character's domain.",
          sourcePage: 394
        },
        weekOfNightmares: {
          name: "The Week of Nightmares",
          restrictions: "N/A",
          description: "Connected to the Week of Nightmares. Different levels grant the character varying levels of knowledge about the event that spanned across years, giving contact to the surviving Ravnos, granting status as a survivor, owning the Red Star or a vial of blood from the Ravnos Antediluvian.",
          sourcePage: 395
        },
        rudi: {
          name: "Rudi",
          restrictions: "N/A",
          description: "Connected to Rudi. Different levels grant the character varying abilities when working against oppressive powers to organize groups towards a specific goal.",
          sourcePage: 396
        },
        descendantOfTyler: {
          name: "Descendant of Tyler",
          restrictions: "Brujah only",
          description: "Connected to Tyler. Different levels grant the character varying abilities to channel the ambition of Tyler in their blood when persuading others, the skill to redirect a frenzy into a compulsion, having contact with the Furores, or the back-history of taking down a sect figurehead.",
          sourcePage: 195
        },
        descendantOfZelios: {
          name: "Descendant of Zelios",
          restrictions: "Nosferatu only",
          description: "Connected to Zelios. Different levels grant the character varying abilities to secure their havens, demolish buildings, construct a labyrinth, or discover ley lines.",
          sourcePage: 398
        },
        descendantOfVasantasena: {
          name: "Descendant of Vasantasena",
          restrictions: "Malkavian only",
          description: "Connected to Vasantasena. Different levels grant the character the ability to survive through dangerous or chaotic situations, recognize bonds, destroy bonds or help deprogram another vampire.",
          sourcePage: 399
        },
        highClan: {
          name: "High Clan",
          restrictions: "Must be a member of the High Clans. Lasombra, Toreador, Tzimisce, and Ventrue are historically high. Brujah and some Hecata are also considered high. Occasionally Banu Haqim, The Ministry, and very rarely Tremere are also high depending on the Domain.",
          description: "Connected to the clans regarded as high in the hierarchy. Different levels grant the character the ability to command others, gain an advantage over both Low and High Clan Kindred, or ignore the burden of the clan bane.",
          sourcePage: 400
        },
        lowClan: {
          name: "Low Clan",
          restrictions: "Must be a member of the Low Clans which is defined by their geographical region. Gangrel, Malkavian, and Nosferatu are almost always low. Occasionally Brujah and Tremere are also low depending on the Domain.",
          description: "Connected to the clans regarded as low in the hierarchy. Different levels grant the character the ability to shrug off provocations, use their bane to their advantage, work with other Low Clans, learn another Low Clan's Discipline, or bring down a High Clan Kindred in a coup.",
          sourcePage: 401
        },
        ambrusMaropis: {
          name: "Ambrus Maropis",
          restrictions: "N/A",
          description: "Connected to Ambrus Maropis. Different levels grant the character information regarding security, a connection directly to Ambrus, gain additional dice to related tests, or well-protected fake identities.",
          sourcePage: 402
        },
        carmelitaNeillson: {
          name: "Carmelita Neillson",
          restrictions: "N/A",
          description: "Connected to Carmelita Neillson. Different levels grant the character varying abilities of storytelling, meditating on an object for benefits, the allowance to run one of her libraries, secrets from her interviews, or the privilege to guard one of the character's ancestors.",
          sourcePage: 184
        },
        fiorenzaSavona: {
          name: "Fiorenza Savona",
          restrictions: "N/A",
          description: "Connected to Fiorenza Savona. Different levels grant the character varying levels of relationship with Fiorenza and gain benefits from her, be it a ghoul or other benefits.",
          sourcePage: 186
        },
        descendantOfKarlSchrekt: {
          name: "Descendant of Karl Schrekt",
          restrictions: "Tremere only",
          description: "Connected to Karl Schrekt. Different levels grant the character information regarding House Tremere, bonuses for working towards Schrekt's goals, reduce the effort needed for a ritual, find aid in an unlikely ally, or gain information on those same allies.",
          sourcePage: 405
        },
        descendantOfXaviar: {
          name: "Descendant of Xaviar",
          restrictions: "Gangrel only",
          description: "Connected to Xaviar. Different levels grant the character respect from other Gangrel, detect other vampires in the ground, gain benefits with the Camarilla, turn into a man-sized bat, or have experience with the Antediluvian.",
          sourcePage: 194
        }
      }
    },
    anarch: {
      name: "Anarch",
      source: "Vampire: The Masquerade Anarch",
      loresheets: {
        salvadorGarcia: {
          name: "Salvador Garcia",
          restrictions: "N/A",
          description: "Connected to Salvador Garcia. Different levels grant the character bonuses when using Anarch principles, gain a Mawla to aid them, turn information gathering against them difficult, become known across Anarch territories, or have the skill to rile up the local Anarchs.",
          sourcePage: 190
        },
        agataStarek: {
          name: "Agata Starek",
          restrictions: "N/A",
          description: "Connected to Agata Starek. Different levels grant the character bonuses when threatening someone of greater means than themselves, exposing the weakness of enemies, being given hard-to-obtain blood, turning an enemy's minion to the character's side, or suffering less loss from Diablerie.",
          sourcePage: 191
        },
        heshaRuhadze: {
          name: "Hesha Ruhadze",
          restrictions: "(••••) and (•••••) are Ministry characters only.",
          description: "Connected to Hesha Ruhadze. Different levels grant the character ownership of one of Hesha's treatises, knowledge about what Hesha is seeking or ownership of it already, the rare privilege of membership to one of the Ministry's museums, having been taught by Hesha himself, or hearing the voice of Sutekh for guidance and aid.",
          sourcePage: 192
        },
        churchOfSet: {
          name: "The Church of Set",
          restrictions: "Church of Set members",
          description: "Connected to the Church of Set. Different levels grant the character a congregation of mortals to feed from, bonuses to tell when someone is lying, bonuses against other clans Dominate or Presence attempts, help others indulge in corruption to only come out clean, or ownership of Set's skeleton, sarcophagus or burial robes.",
          sourcePage: 193
        },
        ruinsOfCarthage: {
          name: "Ruins of Carthage",
          restrictions: "N/A",
          description: "Connected to Carthage. Different levels grant the character knowledge of what happened to Carthage, Carthaginian ancestry to boast about, forming a link to them for bonuses in combat, control over the Beast, bonuses over servants, or breach the Masquerade and get away with it.",
          sourcePage: 196
        },
        bloodPlagued: {
          name: "Blood Plagued",
          restrictions: "N/A",
          description: "Connected to the Blood plague, which unlike the majority of diseases does affect other vampires. Different levels grant the character the ability to detect the Blood plague, understand how to track down active victims, locate infected bodies in the ground in torpor, create a cure for this illness, or carry the Blood plague themselves to infect or aid others as they see fit.",
          sourcePage: 197
        },
        anarchRevolt: {
          name: "Anarch Revolt",
          restrictions: "N/A",
          description: "Connected to the Anarch Revolts and other related events such as the fall of tyrannical Princes and the rise of new Barons. Different levels grant the character ancestral ties to one of the sides during these uprisings or gain bonuses or merits in regards to other Anarchs or the Anarch cause.",
          sourcePage: 198
        }
      }
    },
    camarilla: {
      name: "Camarilla",
      source: "Vampire: The Masquerade Camarilla",
      loresheets: {
        fatimaAlFaqadi: {
          name: "Fatima Al-Faqadi",
          restrictions: "N/A",
          description: "Connected to Fatima al-Faqadi. Different levels grant the character access to a weapons locker, connection to the Extended Web, survive a hit by Fatima, the ability to execute a Kindred without retaliation from the Camarilla, or a relationship with Fatima in such she'll eliminate an enemy for the character.",
          sourcePage: 185
        },
        pureVentrueLineage: {
          name: "Pure Ventrue Lineage",
          restrictions: "Ventrue only",
          description: "Connected to the lineage of the Ventrue and the importance they find in their history. Different levels grant the character different lineages, either as a nobility or Prince or clear to Methuselah's as well as later levels giving the option to select between three different lines.",
          sourcePage: 187
        },
        cultOfMithras: {
          name: "The Cult of Mithras",
          restrictions: "N/A",
          description: "Connected to the Cult of Mithras. Different levels grant the character varying levels of relationship and knowledge of the cult and its functions with bonuses related.",
          sourcePage: 188
        },
        pyramid: {
          name: "The Pyramid",
          restrictions: "Tremere only",
          description: "Connected to the Tremere's Pyramid and its inner workings. Different levels grant the character varying levels of relationships and ranks as they progress through the rebuild of a chantry in this loresheet and garner them bonuses.",
          sourcePage: 189
        },
        victoriaAsh: {
          name: "Victoria Ash",
          restrictions: "N/A",
          description: "Connected to Victoria Ash. Different levels grant the character varying levels of relationship with Victoria, being a guest at the wedding, learning her abilities to read people, easing the transportation between two domains, or being protected by Victoria herself.",
          sourcePage: 190
        }
      }
    },
    tatteredFacade: {
      name: "Tattered Façade",
      source: "Vampire: The Masquerade Tattered Façade",
      loresheets: {
        descendantOfTheAnkou: {
          name: "Descendant of the Ankou",
          restrictions: "Malkavian only",
          description: "Connected to the Ankou, a Malkavian connected to visions and death. Levels grant abilities or bonuses in Oblivion, Occult, Auspex, and leveraging occult expertise.",
          sourcePage: 171
        },
        descendantOfBaronVollgirre: {
          name: "Descendant of Baron Vollgirre",
          restrictions: "Toreador only",
          description: "Connected to the Baron Vollgirre. Levels gives access to Protean for Fleshcrafting and Vicissitude. Other benefits include bonuses to social or artistic pursuits, benefits form sadism, and connection to distrusted Kindred.",
          sourcePage: 172
        },
        descendantOfMontano: {
          name: "Descendant of Montano",
          restrictions: "Lasombra only",
          description: "Connected to Montano. Different levels grant the character varying levels of relationship with Montano to learn from him or status within the Lasombra as a whole regardless of sect.",
          sourcePage: "173 (or Chicago by Night page 274)"
        },
        littleSiblings: {
          name: "Little Siblings",
          restrictions: "Hecata only",
          description: "Connected to the Rossellini and the Giovanni. Different levels grant the character experience with commanding wraiths and other dealings with them, or Oblivion Ceremonies benefits.",
          sourcePage: "174 (or Children of the Blood page 101)"
        }
      }
    },
    chicagoByNight: {
      name: "Chicago by Night",
      source: "Vampire: The Masquerade Chicago by Night",
      loresheets: {
        annabelle: {
          name: "Annabelle",
          restrictions: "N/A",
          description: "Connected to Annabelle. Different levels grant the character varying levels of relationship with Annabelle with her ability to pull strings for specific requests or aid them in other ways.",
          sourcePage: 262
        },
        ballardIndustries: {
          name: "Ballard Industries",
          restrictions: "N/A",
          description: "Connected to Ballard Industries which is one of the pillars of Chicago's economy. Different levels grant the character membership and access to the share of wealth, connections to Ballard's name and fake names, influence with the police, claim debt over another, or their own company.",
          sourcePage: 263
        },
        blacksite24: {
          name: "Blacksite 24",
          restrictions: "N/A",
          description: "Connected to Blacksite 24, military and medical installation currently controlled by FIRSTLIGHT. Different levels grant the character knowledge of this site's existence, through knowing others who have been taken or being taken themselves, or granting information about the hunters.",
          sourcePage: 264
        },
        blueVelvet: {
          name: "The Blue Velvet",
          restrictions: "N/A",
          description: "Connected to Blue Velvet, a hotspot for Kindred nightlife. Different levels grant the character connections to the nightclub, through being there since the beginning, knowing who visits the club, being a regular musician there, or different levels of influence in the club.",
          sourcePage: 266
        },
        bookOfNod: {
          name: "The Book of Nod",
          restrictions: "N/A",
          description: "Connected to the Book of Nod, which contains oral histories, text fragments, and other forms of media detailing the history of Caine and his childer. Different levels grant the character knowledge about the contents of the Book of Nod up to possession of pieces of the book.",
          sourcePage: 267
        },
        caponeGang: {
          name: "Capone Gang",
          restrictions: "N/A",
          description: "Connected to the Capone Gang. Different levels grant the character varying levels of aid from the gang, be it making someone disappear, or aiding in a heist to becoming a fully-fledged member of the gang and even the prodigal child of the leader, Eddie Wu.",
          sourcePage: 268
        },
        cobweb: {
          name: "The Cobweb",
          restrictions: "Malkavian only",
          description: "Connected to the Cobweb, a mystical force that connects all Malkavians. Different levels grant the character varying abilities to tap into this mystical source, such as the ability to hear the shattered words, tapping into other's senses, or using the Cobweb to guide them.",
          sourcePage: 270
        },
        cultivar: {
          name: "Cultivar",
          restrictions: "Cultivar member",
          description: "Connected to the Cultivars, who are similar to the Bahari. Different levels grant the character varying progression through the cult with related perks from their joining with the dark mother.",
          sourcePage: 271
        },
        cultOfShalim: {
          name: "Cult of Shalim",
          restrictions: "Cult of Shalim member",
          description: "Connected to the Shalimites. Different levels grant the character varying progression through the cult with related perks as they explore further into the group.",
          sourcePage: 272
        },
        descendantOfLodin: {
          name: "Descendant of Lodin",
          restrictions: "Ventrue only",
          description: "Connected to Lodin. Different levels grant the character varying connections in lineage to Lodin and the benefits from such a title.",
          sourcePage: 273
        },
        firesAndFloodsAndTheDevilsNight: {
          name: "Fires and Floods and the Devil's Night",
          restrictions: "N/A",
          description: "Connected to disasters that occurred within Chicago such as the Great Fire of 1871 or the Chicago Flood in 1992. Different levels grant the character knowledge about the disasters that happened within the city, locations lost to time, survival of these events, a history of offering aid after the disasters struck, or being an orchestrator of one of these events.",
          sourcePage: 275
        },
        firstlight: {
          name: "Firstlight",
          restrictions: "N/A",
          description: "Connected to FIRSTLIGHT. Different levels grant the character varying skills in evasion of hunters, information about them, the ability to erase the character's records from the group, or a connection on the inside.",
          sourcePage: 276
        },
        kevinJackson: {
          name: "Kevin Jackson",
          restrictions: "N/A",
          description: "Connected to Kevin Jackson. Different levels grant the character connections to the Prince, either as a new arrival as part of his service, as a student from one of his schools, or up to being the right-hand man.",
          sourcePage: 277
        },
        kindredIconography: {
          name: "Kindred Iconography",
          restrictions: "N/A",
          description: "Connected to iconography used by Kindred to communicate secretly. Different levels grant the character knowledge of these symbols to help decipher them, know how to utilize clothing in Kindred social circles, or even have enough skill to be able to dress Princes and Primogens.",
          sourcePage: 278
        },
        labyrinth: {
          name: "The Labyrinth",
          restrictions: "N/A",
          description: "Connected to a series of abandoned tunnels beneath Chicago. Different levels grant the character the ability to traverse through the tunnels safely, understand the culture that's been built beneath the city, and participate even, connect with a Tremere named Lydia who lives there or hide out safely and without being caught.",
          sourcePage: 279
        },
        lupineExpert: {
          name: "Lupine Expert",
          restrictions: "N/A",
          description: "Connected to a background where the character has encountered the Lupines and lived to tell the tale. Different levels grant the character different skills needed to track these creatures down and destroy them, the history of having taken one down, or even the level of expertise needed to effectively help maintain a peaceful balance between Kindred and Lupines.",
          sourcePage: 280
        },
        nathanielBordruff: {
          name: "Nathaniel Bordruff",
          restrictions: "N/A",
          description: "Connected to Nathaniel Bordruff. Different levels of this loresheet grants you access to Nathaniel's expansive influence in the city. Though the more the character benefits from his association the more they learn of the Nosferatu's mad grand plan.",
          sourcePage: 281
        },
        paintedLady: {
          name: "The Painted Lady",
          restrictions: "N/A",
          description: "Connected to the Painted Lady; offering tattoos, piercings, and BDSM experiences. Different levels of the loresheets allows the character to have differing levels of access to services. The higher the ranking the more of a dedicated member the character is as well as boosts to the characters social standing and body modification.",
          sourcePage: 282
        },
        revenantFamilyDucheski: {
          name: "Revenant Family: Ducheski",
          restrictions: "Tremere only",
          description: "This lore sheet allows a Tremere character to access a rare revenant retainer of the Ducheski family. Each level of this lore sheet allows for more use and exploitation of their retainer. The Duscheki are keen assistants in the ways of academics and the occult able to help Kindred in either area or impress their master with their creation.",
          sourcePage: 283
        },
        societyOfStLeopold: {
          name: "The Society of St. Leopold",
          restrictions: "N/A",
          description: "This loresheet gives the character knowledge of how the Society of St. Leopold be that current knowledge or past organizational knowledge. This may even be for former religious associations. Each increased level gives the character more knowledge of the diocese and the double edged sword of having deeper connection to a pious old life.",
          sourcePage: 284
        },
        talley: {
          name: "Talley",
          restrictions: "N/A",
          description: "This connects the character with Talley. The different levels confer different benefits with lower levels merely having the player emulate cunning tactics the Shadow has used to survive for centuries. Higher levels the loresheet allows more direct interaction with Talley himself and access to his skills in combat and politics.",
          sourcePage: 286
        },
        wauneka: {
          name: "Wauneka",
          restrictions: "N/A",
          description: "This loresheet connects to Wauneka, an information broker and protector of the downtrodden and vulnerable. The character develops more connections with the outcasts and invisibles of the city allowing the character to use Wauneka's network. The more the character gains trust of Wauneka and his street family the more secrets the character has an opportunity to learn.",
          sourcePage: 287
        }
      }
    },
    chicagoFolios: {
      name: "Chicago Folios",
      source: "Vampire: The Masquerade Chicago Folios",
      loresheets: {
        archons: {
          name: "Archons",
          restrictions: "N/A",
          description: "This Loresheet connects the character to the Archons as an agent or potential recruit of the elite Camarilla guard. The levels of this loresheet gives benefits to any on going investigations one would have in their nights. Higher levels of the loresheet allows the player to have more pull in the sect, communication with reigning justicars, and even an official appointment.",
          sourcePage: 158
        },
        conventionOfChicago: {
          name: "The Convention of Chicago",
          restrictions: "N/A",
          description: "This loresheets has the Character be an attendee to the Convention of Chicago either as a Chicago native or a far traveled diplomat. At this major gathering of Camarilla figures, the character was able to gather information regardless of their sect. The levels of the loresheet lets you be a party crasher, or proper attendee and gain clout from actions at different levels. Higher levels yield more benefits as the character's role in the affair becomes more invested.",
          sourcePage: 159
        },
        descendantOfMenele: {
          name: "Descendant of Menele",
          restrictions: "Brujah only",
          description: "Places Menele as the character's ancient vampiric ancestor. The sheet confers many of the skills and the traits the methuselah possessed in unlife to the character. Levels of the loresheet aid the character in their skills of knowledge seeking and connecting to the old ways of clan Brujah.",
          sourcePage: 160
        },
        goblinRoads: {
          name: "Goblin Roads",
          restrictions: "N/A",
          description: "The loresheet relates to the supernatural route between Milwaukee and Chicago known as the Goblin Road. The levels confer the ease with traveling this route and connections to Gangrel and their allies who know of the route's nature. Higher levels allow the character to interact with the oddity of the road.",
          sourcePage: 161
        },
        justicarLucinde: {
          name: "Justicar Lucinde",
          restrictions: "N/A",
          description: "Gives the character some form of past association with Justicar Lucinde. Low levels gives the character some skills in investigation like the renowned justicar. Higher levels give the character benefits from working under Lucinde on her various missions.",
          sourcePage: 162
        },
        khalidAlRashid: {
          name: "Khalid Al-Rashid",
          restrictions: "N/A",
          description: "Connects the player character to Khalid Al-Rashid by blood or through mundane association. Low levels of the nosferatu sheet will allow skills in areas of the former primogen's expertise. The higher levels of this loresheets begins to give the character clues in the nosferatu extensive notes about the city and powerful beings.",
          sourcePage: 163
        },
        kindredDueling: {
          name: "Kindred Dueling",
          restrictions: "N/A",
          description: "This concerns the ancient practice of dueling with a Kindred twist. This loresheets provides a variety of benefits, be it better fighting skills to go fang to fang with another Kindred or the supplies to form a character's own secret fight club.",
          sourcePage: 164
        },
        malkavianFamily: {
          name: "Malkavian Family",
          restrictions: "Malkavian only",
          description: "The Malkavians of Chicago have a family and communal structure sharing resources, havens, and secrets. Lower levels benefit the Malk with insight and merits with other members of the clan. Higher levels however give benefits in squeaking out some privacy in such a crowded setting.",
          sourcePage: 165
        },
        occultArtifacts: {
          name: "Occult Artifacts",
          restrictions: "Banu Haqim or Tremere only",
          description: "This loresheets allows certain characters access to different magic items either left behind in a chantry, discovered by chance, or entrusted to the character. The artifacts details comes from the likes of the Banu Haqim and Tremere. They can be items of assassination or used to confound gifts of the blood.",
          sourcePage: 166
        },
        ponyExpress: {
          name: "The Pony Express",
          restrictions: "N/A",
          description: "Connects a character to the Pony Express, a network of couriers that carry out communication deliveries, be it letters or packages. The lowest level gives the character access to send and receive information. Higher levels allow the character to be part of the network themselves or be special clients of the service.",
          sourcePage: 167
        },
        sheriffDamien: {
          name: "Sheriff Damien",
          restrictions: "N/A",
          description: "Connects to the Brujah Sheriff of Chicago and famous musician, Damien. The character can be connected to Damien's band as an admirer or be the muscles that he sees as reliable. Higher levels of the loresheet bring the character closer to Sheriff and offer more benefits.",
          sourcePage: 168
        },
        wolfPack: {
          name: "The Wolf Pack",
          restrictions: "N/A",
          description: "Forges a connection between the character and the Camarilla's legendary Wolf Pack. Association with the group gives the character better abilities at handling life on the road. Higher levels aid the character in using their sway over the biking community for different forms of aid.",
          sourcePage: 169
        }
      }
    },
    letTheStreetsRunRed: {
      name: "Let the Streets Run Red",
      source: "Vampire: The Masquerade Let the Streets Run Red",
      loresheets: {
        anubi: {
          name: "The Anubi",
          restrictions: "N/A",
          description: "This loresheets allows a character to have experience in Lupine hunting and connection to other such Kindred organizations. This loresheets offers support for efforts against werewolves be it weapons, information, diplomacy, or precautionary measures.",
          sourcePage: 224
        },
        eletria: {
          name: "Eletria",
          restrictions: "N/A",
          description: "This loresheets the character former association with Eletria in the character's backstory. How the character knew the Toreador depends on the level. Lower levels allude to connection from artist to artist and high levels allude to a deeper connection that has left a lasting impact.",
          sourcePage: 225
        },
        kindredSocialMediaInfluencer: {
          name: "Kindred Social Media Influencer",
          restrictions: "N/A",
          description: "A loresheet that allows a character to be a savvy social media influencer. At lower levels it gives benefit to small time influencers with their close community providing many benefits. The high levels allows for a Kindred to harvest the fruits of their internet presence, though it poses a danger of course.",
          sourcePage: 226
        },
        juggler: {
          name: "Juggler",
          restrictions: "N/A",
          description: "A loresheet that connects the Kindred to both Juggler and the domain of Gary, Indiana. The levels of this lore sheet allows a character to gain an edge over Camarilla loyalists, gain benefits from former association with Juggler, and companion to aid the character's actions for the Movement.",
          sourcePage: 227
        },
        lostSecretsOfTheMilwaukeeChantry: {
          name: "Lost Secrets of the Milwaukee Chantry",
          restrictions: "N/A",
          description: "Secrets of the Null Zone and work of the former chantry Carna used to belong to are detailed in this Loresheet. Characters with this loresheet can benefit can find the files of long gone Tremere for various merits, blood sorcery knowledge, or hidden magical knowledge. Higher levels give more occult secrets at a price.",
          sourcePage: 228
        },
        markDecker: {
          name: "Mark Decker",
          restrictions: "(•••••) is Gangrel only",
          description: "This loresheet forges a connection between the character and Mark Decker. The character get the benefits of allying with the paranoid Prince from favor to leniency in his tyrannical rule. Higher levels allows you deeper connection with the Prince.",
          sourcePage: 229
        },
        maxwell: {
          name: "Maxwell",
          restrictions: "N/A",
          description: "This loresheets yields a connection to Maxwell. This loresheets gives you access to the former Prince's hidden power base or some of his skills he used to outsmart his enemies. Higher levels of this loresheet allows a closer connection and more direct help from Maxwell.",
          sourcePage: 230
        },
        milwaukeeNullZone: {
          name: "The Milwaukee \"Null Zone\"",
          restrictions: "N/A",
          description: "This loresheet gives insight on the Null Zone and the odd effects. Low levels gives you knowledge of the history and the ability to study the area. Higher levels of the loresheet allows the characters to gain knowledge of benefits of this zone's secrets. Many other parties, magical and non-magical will oppose the character.",
          sourcePage: 231
        },
        modius: {
          name: "Modius",
          restrictions: "N/A",
          description: "A loresheet that connects the Kindred to both Modius and the domain, Gary, Indiana. Low levels award the character for their support of Modius' political aspirations. Higher levels of the lore sheet allude to a stronger connection and more benefits over the city and the Toreador's support in the character's one endeavors.",
          sourcePage: 233
        }
      }
    },
    cultsOfTheBloodGods: {
      name: "Cults of the Blood Gods / Players Guide",
      source: "Vampire: The Masquerade Cults of the Blood Gods",
      loresheets: {
        bankersOfDunsirn: {
          name: "Bankers of Dunsirn",
          restrictions: "| Hecata only",
          description: "Connected to the Dunsirn bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as access to money and making it.",
          sourcePage: 220
        },
        childrenOfTenochtitlan: {
          name: "Children of Tenochtitlan",
          restrictions: "|Hecata only",
          description: "Connected to the Pisanob bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as Necromancy with Oblivion and surviving.",
          sourcePage: 221
        },
        nationOfBloodNasyonSanAn: {
          name: "The Nation of Blood / Nasyon San An",
          restrictions: "Hecata only",
          description: "Connected to the Samedi bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as working with corpses and surpassing physical impairment.",
          sourcePage: 222
        },
        fleshEaters: {
          name: "Flesh-Eaters",
          restrictions: "|Hecata only",
          description: "Connected to the Nagaraja bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as their extended fangs and ability to eat corpses.",
          sourcePage: 223
        },
        harbingersOfAshur: {
          name: "Harbingers of Ashur",
          restrictions: "|Hecata only",
          description: "Connected to the Harbinger bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as their masks that denote their strengths and standing.",
          sourcePage: 224
        },
        laFamigliaGiovanni: {
          name: "La Famiglia Giovanni",
          restrictions: "|Hecata only",
          description: "Connected to the Giovanni bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as nepotism to access certain information and generational wealth being accessible.",
          sourcePage: 225
        },
        criminalPuttanesca: {
          name: "The Criminal Puttanesca",
          restrictions: "|Hecata only",
          description: "Connected to the Puttanesca bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as ties to the criminal underworld and the allies it contains.",
          sourcePage: 226
        },
        gorgons: {
          name: "The Gorgons",
          restrictions: "|Hecata only",
          description: "Connected to the Lamia bloodline. Different levels grant the character connections to the lineage and the skills the line generally possesses such as diseases and Resonances.",
          sourcePage: 227
        },
        callingTheFamilyReunion: {
          name: "Calling the Family Reunion",
          restrictions: "|Hecata only",
          description: "Connected to the Family Reunion, an event where elders of the bloodlines were removed and the bloodlines were reunited. Different levels grant the character varying connections to the details of that night each giving bonuses related to the actions taken such as bonus dice against other Hecata, the ability to call upon favors, a mawla, or bonuses against antagonistic ghosts in ceremonies.",
          sourcePage: 228
        },
        childOfTheAngelMichael: {
          name: "Child of the Angel Michael",
          restrictions: "|Nosferatu cannot take this",
          description: "Connected to a cult dedicated to bringing the idea of Constantinople to reality once more. Different levels grant the character merits to represent their followers, beauty beyond compare, bonuses towards vices, or remove stains from another Kindred.",
          sourcePage: 229
        },
        servitorOfIrad: {
          name: "Servitor of Irad",
          restrictions: "N/A",
          description: "Connected to a cult dedicated to the belief that the Antediluvians want the elders of Kindred society to be weak and divided. Different levels grant the character the ability to hide within Kindred society, be it through lying, changing their convictions when joining a new group, ignoring their bane, dealing additional damage to enemy Kindred, or gaining bonuses when working towards their cult's plans.",
          sourcePage: 230
        },
        promiseOf1528: {
          name: "The Promise of 1528",
          restrictions: "N/A",
          description: "Connected to the agreement between the Camarilla and the Hecata, set to last only 500 years. Different levels grant the character varying levels of information about what the promises contained and the ability to use that knowledge to their advantage.",
          sourcePage: 231
        }
      }
    },
    childrenOfTheBlood: {
      name: "Children of the Blood",
      source: "Vampire: The Masquerade Children of the Blood",
      loresheets: {
        grudgeMasters: {
          name: "Grudge Masters",
          restrictions: "Hecata only",
          description: "Connected to the Milliner bloodline. Different levels grant the characters status from the lineage, money from the family, bonuses for projects, declare debts owed, or connections within law enforcement.",
          sourcePage: 102
        },
        ashfinders: {
          name: "The Ashfinders",
          restrictions: "Thin-blood only",
          description: "Connected to the Ashfinders cults. Different levels grant the character different bonuses as they progress through the cult and the skills that are honed during the process.",
          sourcePage: 103
        },
        amaranthan: {
          name: "Amaranthan",
          restrictions: "N/A",
          description: "Connected to the Amaranthans. Different levels grant the character additional bonuses related to interrogating diablerists, sway over a diablerist, humanity benefits, status from their actions, or buff Diablerie attempts.",
          sourcePage: 104
        },
        cleopatras: {
          name: "Cleopatras",
          restrictions: "Nosferatu only",
          description: "Connected to the Cleopatrans. Different levels grant the character bonuses against discovering another's most profound Flaws, the ability to reroll Social failures or resist fury frenzy, make the bane disappear during daysleep, a title position in the domain, or negate the clan bane.",
          sourcePage: 105
        },
        meneleans: {
          name: "Meneleans",
          restrictions: "N/A",
          description: "Connected to the Meneleans. Different levels grant the character bonuses on rerolling against mortals, gain bonuses when resolving things through diplomacy, bonuses when chastising or humiliating someone of higher stature than the character, blend into mortal society easily, or become unbondable.",
          sourcePage: 106
        },
        oneTrueWay: {
          name: "The One True Way",
          restrictions: "N/A",
          description: "Connected to Golconda. Different levels grant the character bonuses when attempting to gain truth from another Kindred, gain bonuses from using those secrets, communicate with the beast, or take more control over it and the character's humanity.",
          sourcePage: 107
        },
        starfallRanch: {
          name: "Starfall Ranch",
          restrictions: "Malkavian only",
          description: "Connected to Starfall Ranch in the Northeastern United States owed by Malkavian Starr. Different levels grant the character connections to this place and those who were once there, gain bonuses for projects, gain Dr. Starr as a Mawla, or cheat death itself.",
          sourcePage: 108
        }
      }
    },
    forbiddenReligions: {
      name: "Forbidden Religions",
      source: "Vampire: The Masquerade Forbidden Religions",
      loresheets: {
        "1444Chamber": {
          name: "1444 Chamber",
          restrictions: "Hecata only",
          description: "Connected to the 1444 Chamber. The once advisor to Augustus Giovanni who is now in the modern age leading the Hecata. Different levels grant the character connection to the chamber to carry out their will, granting bonuses of status, arranging the services of the Hecata to help outsiders, and access to money, or other aid from the Necromancers.",
          sourcePage: 88
        },
        bloodAsceticism: {
          name: "Blood Asceticism",
          restrictions: "N/A",
          description: "Connected to the rejection of blood addiction and the path that Kindred may attempt to take to reduce the amount of blood needed to satisfy them. Different levels grant the character strengths from not consuming blood, the ability to reroll Rouse Checks, animal blood satiating more than it normally would, status as those who see the character's choices and compare them to a godlike figure, or a reduction in the hunger frenzy difficulty.",
          sourcePage: 89
        },
        gehennaCults: {
          name: "Gehenna Cults",
          restrictions: "N/A",
          description: "Connected to the Gehenna Cults and the investigation into these groups. Different levels grant the character knowledge about these cults' lore, bonuses when tracking a new cult, or respect as an expert in these groups.",
          sourcePage: 90
        },
        plaguesOfGehenna: {
          name: "Plagues of Gehenna",
          restrictions: "N/A",
          description: "Connected to diseases and illnesses spread through vampires who are given the name blisters. Different levels grant the character knowledge about these blisters and the illness they spread, access to a clean herd, knowledge of when a victim of the character is infected, influence in handling outbreaks, or ownership of tainted blood.",
          sourcePage: 91
        },
        praepositor: {
          name: "Praepositor",
          restrictions: "Tremere only",
          description: "Connected to the Praesidium and the devotion to restoring the clan to its old power. Different levels grant the character bonuses against other Tremere who stand against the cult's will, draw on favors or debts, strengthen the character when protecting the clan's members or secrets, grant a temporary safehouse when needed, or create a contract officialized by a blood bond.",
          sourcePage: 92
        },
        spearOfOrthia: {
          name: "Spear of Orthia",
          restrictions: "Ventrue only",
          description: "Connected to Artemis Orthia, the first childe of Ventrue. Different levels grant the character membership to the Shattered Spear granting them benefits as they develop their relationship and skills within the cult up to owning a splinter of the spear itself.",
          sourcePage: 93
        }
      }
    },
    trailsOfAshAndBone: {
      name: "Trails of Ash and Bone",
      source: "Vampire: The Masquerade Trails of Ash and Bone",
      loresheets: {
        rubyThroat: {
          name: "The Ruby Throat",
          restrictions: "N/A",
          description: "Connected to the Ruby Throat, a gambling den for powerful players who wager more than just money. Different levels grant the character bonuses related to experiences at this place such as gathering information or intimidating others, gaining human vessels to feed from, a string of luck that's garnered attention, or being invited to play at an important table.",
          sourcePage: 170
        },
        descendantOfRogerDeCamden: {
          name: "Descendant of Roger de Camden",
          restrictions: "Hecata only",
          description: "Connected to Roger De Camden, the current prince of Edinburgh. Different levels grant the character connections to him as part of his lineage and bonuses from being a part of his bloodline.",
          sourcePage: 171
        },
        relicsOfTheVeil: {
          name: "Relics of the Veil",
          restrictions: "N/A",
          description: "Connected to objects of supernatural properties. Different levels grant the character different items each with their own properties such as bonuses to Oblivion, healing at faster than usual rates, bonuses against wraiths, a dangerous stake, or a sacred book of coded passages to unlock powerful secrets of the dead.",
          sourcePage: 172
        }
      }
    },
    bostonByNight: {
      name: "Boston by Night",
      source: "Vampire: The Masquerade Boston by Night",
      loresheets: {
        hartfordChantry: {
          name: "The Hartford Chantry",
          restrictions: "N/A",
          description: "Connected to the Tremere Chantry in Harford and Boston. Different levels grant the character bonuses for revealing the properties of an object, revealing if someone is a member of a secret society, gaining a strong ally, access to the chantry as a haven and library, or becoming a factional authority.",
          sourcePage: 80
        },
        bostonCamarilla: {
          name: "The Boston Camarilla",
          restrictions: "N/A",
          description: "Connected to the Camarilla in Boston. Different levels grant the character bonuses when with their coterie, call for a sit-down with high-ranking members of other domains, gain a conviction in order to better protect their neighborhood, or obtain a retainer from the domain's political backroom.",
          sourcePage: 84
        }
      }
    },
    fallOfLondon: {
      name: "Fall of London",
      source: "Vampire: The Masquerade Fall of London",
      loresheets: {
        agentOfJusticarParr: {
          name: "Agent of Justicar Parr",
          restrictions: "N/A",
          description: "Connected to the current Malkavian Justicar, Juliette Parr. Different levels grant the character connections to Parr either for information, aid in tasks, or being an Archon underneath her.",
          sourcePage: 231
        },
        courtOfShadows: {
          name: "Court of Shadows",
          restrictions: "N/A",
          description: "Connected to The King of Shadows and the mysterious figure they are within London's secret vampire society. Different levels grant the character access to this network for nourishment, information, or other forms of aid for the character's goals.",
          sourcePage: 232
        },
        huntClub: {
          name: "Hunt Club",
          restrictions: "N/A",
          description: "Connected to the Hunt Club, a covert organization operating since the end of WW2 dedicated to the pursuit of hunting Kindred for sport. Different levels grant the character varying levels of membership within the club or renown within to be able to have access to items or other benefits to aid with the capturing or destruction of other vampires.",
          sourcePage: 233
        },
        londonUnderLondon: {
          name: "London under London",
          restrictions: "Nosferatu only",
          description: "Connected to the underground tunnels beneath London. Different levels grant the character knowledge and experience beneath the city allowing them to navigate, find safety beneath the earth, or find animals that dwell down there.",
          sourcePage: 234
        },
        operationAntigen: {
          name: "Operation Antigen",
          restrictions: "N/A",
          description: "Connected to Operation Antigen, a coalition formed of the police, military, and other intelligence that work to purge the city of vampire influence. Different levels grant an insider within the group to help gain information about what the organization is up to and/or other benefits related to classified information.",
          sourcePage: 235
        },
        oskarAnasov: {
          name: "Oskar Anasov",
          restrictions: "N/A",
          description: "Connected to the Nosferatu Oskar Anasov, a once Anarch was forced to serve the Camarilla or be executed. Different levels of this loresheet grant the character access to his services, be it reliable and safe message delivery, arrangement of meetings with other Kindred, smuggling bodies through the city, or being able to join the Kindred Landlords of London meetings.",
          sourcePage: 236
        }
      }
    },
    wintersTeeth: {
      name: "Winter's Teeth",
      source: "Vampire: The Masquerade Winter's Teeth",
      loresheets: {
        wolvesInSheepsClothing: {
          name: "Wolves in Sheep's Clothing",
          restrictions: "N/A",
          description: "Forsaken ghouls aren't a novel concept among the dead. What is new, and what makes some vampires weary, is the growing populace of a group which calls themselves Wolves in Sheeps Clothing. These hungry ghouls found a way to harness power of the dead, using unknown forms of magic, and won't stop, for the hunger grows.",
          sourcePage: "Issue 3, pages 32-33"
        },
        nictuku: {
          name: "The Nictuku",
          restrictions: "Nosferatu only",
          description: "In the darkness of their warren, Nosferatu tell gruesome tales about their mad with fury offspring, the Nictuku. Some of the Nosferatu clan would later decide that these stories are just that. But others know that what they saw deep below the city was not just a rat. It was a warning.",
          sourcePage: "Issue 3, page 34"
        },
        minneapolis: {
          name: "Minneapolis",
          restrictions: "N/A",
          description: "Younger, but bigger and louder of the Twin Cities, Minneapolis used to be the Domain of local Anarchs, standing in opposition to Prince Merrain's court, on the other side of river Mississippi. Nowadays, the Anarch population lays low, wondering if what was achieved in Berlin, could be replicated on their turf.",
          sourcePage: "Issue 2, page 32"
        },
        stPaul: {
          name: "St. Paul",
          restrictions: "N/A",
          description: "Older, although less famous of the Twin Cities, St. Paul is the heart of the local Camarilla. Its artistic soul being the main reason for Prince Samantha Merrain of clan Toreador to make the older sibling her preferred domain.",
          sourcePage: "Issue 2, page 33"
        },
        morticiansArmy: {
          name: "The Mortician's Army",
          restrictions: "N/A",
          description: "A pathologist working for the Medical Examiner's office in downtown Minneapolis, Rafael DeLuna's personal mission of revenge against vampires eventually gave rise to a well equipped and connected network of hunters popular with local law enforcements and prepper communities, who all carry a mortician's hammer as a signature weapon and as an insignia.",
          sourcePage: "Issue 9, page 32"
        }
      }
    },
    bloodSigils: {
      name: "Blood Sigils",
      source: "Vampire: The Masquerade Blood Sigils",
      loresheets: {
        descendantOfAlAshrad: {
          name: "Descendant of Al-Ashrad",
          restrictions: "Banu Haqim only",
          description: "Connected to Al-Ashrad. Different levels provide bonuses to Leadership, access or improvement to Sense the Unseen (Auspex ●), easier time using Blood Sorcery to harm Kindred, the ability to harm incorporeal creatures, or become next in line for being the most respected sorcerer",
          sourcePage: 177
        },
        studentOfKirinTaunk: {
          name: "Student of Kirin Taunk",
          restrictions: "Thin-Blood Alchemists only",
          description: "Connected to the legacy of Kirin Taunk. Different levels provide quicker creation of formulas, the ability to use your alchemical skill in social situations, easier access and bonus to a formula, Status among both the Anarchs and the Camarilla, and a Mawla of one of her patrons.",
          sourcePage: 178
        },
        veinsOfTheEarth: {
          name: "Veins of the Earth",
          restrictions: "N/A",
          description: "This Loresheets helps with understanding of Furcae and the Veins of the Earth. Different levels provide the ability to declare somewhere a Furcus, a Herd of people interested in learning more about the Venae Terrae, the ability to find Kindred and where they're travelling, a bonus to using Disciplines, and addional successes on tests providing you give a sacrifice",
          sourcePage: 179
        },
        viennaZero: {
          name: "Vienna Zero",
          restrictions: "Blood Sorcery Users only",
          description: "Connected to Vienna and what remains from the destruction of the Prime Chantry. Different levels provide knowledge about blood craft or the Tremere, A contact who can get you stuff from the area, access to an occult artifact, access to the last copy of a grimoire, and being a member of the excavation process",
          sourcePage: 180
        }
      }
    },
    bookOfNodApocrypha: {
      name: "Book of Nod Apocrypha",
      source: "Vampire: The Masquerade Book of Nod Apocrypha",
      loresheets: {
        machinationsOfSaulot: {
          name: "Machinations of Saulot",
          restrictions: "Salubri or Tremere",
          description: "This Loresheet gives bonuses and drawbacks shared between the Salubri and Tremere.",
          sourcePage: 39
        }
      }
    },
    gehennaWar: {
      name: "Gehenna War",
      source: "Vampire: The Masquerade Gehenna War",
      loresheets: {
        beckett: {
          name: "Beckett",
          restrictions: "N/A",
          description: "Connected to the Gangrel archaeologist, Cuthbert Beckett. Different levels provide benefits to tracking, questioning and resisting Elders",
          sourcePage: 157
        },
        eternalArena: {
          name: "The Eternal Arena",
          restrictions: "N/A",
          description: "Connected to The Eternal Arena, a famous violent Kindred tournament. Different levels provided benefits to intimidating those who know of your reputation, benefits in combat and the ability to avoid Final Death from violent conflict",
          sourcePage: 158
        },
        tegyriusTheVizier: {
          name: "Tegyrius the Vizier",
          restrictions: "(••••) is Banu Haqim only",
          description: "Connected to Tegyrius, the Banu Haqim Vizier.",
          sourcePage: 159
        }
      }
    },
    inMemoriam: {
      name: "In Memoriam",
      source: "Vampire: The Masquerade In Memoriam",
      loresheets: {
        birthOfTheAnarchFreeStates: {
          name: "Birth of the Anarch Free States",
          restrictions: "N/A",
          description: "Connected to the Anarchs. Different levels grant the ability to rouse Anarchs to action and general status benefits.",
          sourcePage: 149
        },
        childeOfTheRevolution: {
          name: "Childe of the Revolution",
          restrictions: "N/A",
          description: "Connected to the French Revolution. Different levels grant the ability to engage or withstand a chaotic revolution.",
          sourcePage: 150
        },
        descendantOfDracula: {
          name: "Descendant of Dracula",
          restrictions: "Tzimisce only",
          description: "Connected to Dracula. Different levels grant abilities relating to Dracula.",
          sourcePage: 151
        },
        orderOfRepentants: {
          name: "The Order of Repentants",
          restrictions: "N/A",
          description: "Connected to the Repentants. Different levels grant abilities to resist and handle Frenzy, Remorse and anything relating to the Beast.",
          sourcePage: 152
        },
        redLady: {
          name: "The Red Lady",
          restrictions: "N/A",
          description: "Connected to the Red Lady. Different levels grant bonuses to parties, charisma, status and at its highest level, removal of evidence of diablerie.",
          sourcePage: 153
        },
        vanderbiltVentrue: {
          name: "The Vanderbilt Ventrue",
          restrictions: "Ventrue only",
          description: "Connected to the Vanderbilt family. Different levels grant mostly financial boons and charismatic bonuses towards aristocratic and rich characters.",
          sourcePage: 154
        }
      }
    },
    liveFromTheSuccubusClub: {
      name: "Live from the Succubus Club",
      source: "Vampire: The Masquerade Live from the Succubus Club",
      loresheets: {
        descendantOfIdder: {
          name: "Descendant of Idder",
          restrictions: "Banu Haqim Only",
          description: "Connected to Idder, one of the first Kindred nomads. Levels allow shepherding animals and kin alike. Levels offer benefits in maintaining, growing, and protecting Herds, also offers finding shelter from the sun and having multiple Famuli.",
          sourcePage: 158
        },
        descendantOfKerwiya: {
          name: "Descendant of Kerwiya",
          restrictions: "Gangrel only",
          description: "Connected to Kerwiya, a Gangrel known for being more at home in a city than the countryside. Different levels grant the character connections to Obfuscate, as a Boon collector, and her various skill in the social arena.",
          sourcePage: 159
        },
        descendantOfPhaedyme: {
          name: "Descendant of Phaedyme",
          restrictions: "Ravnos Only",
          description: "Connected to methuselah Phaedyme and her line famous for being protectors of pilgrims and travelers. Levels allow skills in fighting, navigating, and protecting your own.",
          sourcePage: 160
        },
        descendantOfTheFallenLord: {
          name: "Descendant of The Fallen Lord",
          restrictions: "Salubri Only",
          description: "Connected to the Fallen Lord, a Sabbat member known for his martial prowess and vendetta against the Tremere and Camarilla. Many of his brood fled the sect after the Gehenna War commenced. Levels of this sheet benefits violence, tracking enemies, violent Convictions, and Willpower rerolls related to violent acts.",
          sourcePage: 161
        },
        succubusClubCopycat: {
          name: "Succubus Club Copycat",
          restrictions: "N/A",
          description: "A loresheet for player clubs that imitate the Succubus Club in vibe, practices, or even name. Levels allows for bonuses to social pools, intense Resonances in the club, safer hunts, loyal staff resistant to some mental Disciplines, and even host the city's important Kindred.",
          sourcePage: 162
        },
        roadCourier: {
          name: "Road Courier",
          restrictions: "N/A",
          description: "To avoid the Second Inquisition the Camarilla has recently turned to over-the-road physical couriers. You are one of these couriers and know how to travel between cities before the sun rises.",
          sourcePage: 164
        },
        storiesOfTheDaughters: {
          name: "Stories of the Daughters",
          restrictions: "N/A",
          description: "Although once thought to be a bloodline, the Daughters of Cacophony are now known to be Kindred of any clan as long as they have the power to sway and hurt others using only their voice.",
          sourcePage: 165
        },
        templeOfBoomContract: {
          name: "Temple of Boom Contract",
          restrictions: "N/A",
          description: "Baron of Los Angeles, Victor Temple, maintains a presence throughout his domains through various nightclubs. The best way to curry favor with the powerful Anarch is through his music label, the Temple of Boom.",
          sourcePage: 166
        }
      }
    },
    courtsOfTheDamned: {
      name: "Courts of the Damned",
      source: "Vampire: The Masquerade Courts of the Damned",
      loresheets: {
        descendantOfCountJocalo: {
          name: "Descendant of Count Jocalo",
          restrictions: "The Ministry only",
          description: "Connected to Count Jocalo, a infamous member of the Ministry. Levels pertain to Status, Skills, Disciplines that relate to feeding are extended in duration, locating lore and relics, and changing Backgrounds around.",
          sourcePage: 218
        },
        descendantOfMarconius: {
          name: "Descendant of Marconius",
          restrictions: "Lasombra only",
          description: "Connected to Marconius, an expert of fell Oblivion Ceremonies. Levels pertain to learning rituals and ceremonies, Looks, a unique use of Dominate, and reduced damage in the sun.",
          sourcePage: 219
        },
        descendantOfMeerlinda: {
          name: "Descendant of Meerlinda",
          restrictions: "Tremere only",
          description: "Connected to Meerlinda, one of the first Tremere to partake in the Ritual of Usurpation. Levels pertain to assisting others in rituals, changing the values of boons, Skills, Status, and a unique Conviction.",
          sourcePage: 220
        },
        descendantOfRasalon: {
          name: "Descendant of Rasalon",
          restrictions: "Nosferatu only",
          description: "Connected to Rasalon, one who believes in the unity of Clan Nosferatu. Levels pertain to connections to other Nosferatu, revealing secrets that were otherwise unknown, extended the effects of Obfuscate, and the manipulation of boons.",
          sourcePage: 222
        }
      }
    },
    miscellaneous: {
      name: "Miscellaneous",
      source: "Various",
      loresheets: {
        amandaChastain: {
          name: "Amanda Chastain",
          restrictions: "N/A",
          description: "Amanda Chastain is a powerful Camarilla Toreador based out of the small city of Jericho Heights. Cryptocurrencies, the Circulatory System, and podcasts are just a small sample of her areas of influence.",
          sourcePage: null
        },
        sheriffQui: {
          name: "Sheriff Qui",
          restrictions: "N/A",
          description: "Although the Nosferatu Sheriff of Ottawa, Canada, Qui is an accomplished investigator, fixer, and veteran of the Sect War, his most notable feature is the distinct lack of the Nosferatu bane save for a pulsating scar down the back of his neck.",
          sourcePage: null
        },
        parthenonTroupe: {
          name: "The Parthenon Troupe",
          restrictions: "N/A",
          description: "A troupe of ghoul actors created and sustained by Prince Peisistratos of Athens, the Parthenon Troupe must be the best to both possibly become Kindred themselves and to avoid the harsh punishments of the Prince himself.",
          sourcePage: null
        }
      }
    }
  }
};

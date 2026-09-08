export const hecata = {
  name: "Hecata",
  nicknames: [
    "The Clan of Death",
    "Necromancers",
    "Graverobbers",
    "The Family",
    "Stiffs",
    "Corpses",
    "Devil-Kindred",
    "Lazarenes"
  ],
  disciplines: [
    "Auspex",
    "Fortitude",
    "Oblivion"
  ],
  disciplines: {
    auspex: "Is how the Hecata plan their moves and for this reason, they rarely strike on impulse.",
    fortitude: "Gives them corpse-like ability to absorb harm to their bodies, able to shrug off anything raining down upon them.",
    oblivion: "Allows them to communicate with and control the energies of death and of spirits. Through it's use they might question the dead or set them to attack a rival."
  },
  bane: {
    name: "Painful Kiss",
    description: "Hecata may only take harmful drinks from mortals which result in blood loss. Unwilling mortals that are able to escape will make the attempt, even those who are convinced or willing must succeed in a Stamina + Resolve test against Difficulty 2 + Bane Severity in order to not recoil. Vampires who are willingly bit must make a Frenzy test against Difficulty 3 to avoid terror Frenzy."
  },
  variantBane: {
    name: "Decay",
    description: "Hecata suffer additional dots in Flaws equal to their Bane Severity spread as they see fit across Retainer, Haven, and Resources Flaws. These Flaws can either be taken at Character Creation or removed by paying twice the amount of Background dots. Additionally, any purchase of dots in these Advantages costs an additional amount of experience points equal to their Bane Severity."
  },
  compulsion: {
    name: "Morbidity",
    description: "The vampire must move something from life to death or vice versa, any action not taken to end or resurrect something suffers a two-dice penalty. The subject does not have to be a living thing and can instead be an object or more abstract such as ideas or conversation points. This Compulsion lasts until they manage to kill or return something to life."
  },
  background: {
    description: "A motley collection of necromantic vampire bloodlines, the Hecata clan are united in the pursuit of a single subject: Death. They are students of the afterlife and resurrectionists of the dead — or worse. Selling their services to the highest bidder, or acting in their own interests, there are few who can hide from the surveillance of those who can summon and command the very spirits of the deceased. A clan steeped in death, they practice the arts of necromancy and communication with the dead. The clan tends to favour mortals either from their own mortal family or those with useful connections to other outside families. It is speculated that the reason all Hecata share the same Disciplines unlike their ancestors is caused by the unification of the necromantic bloodlines that formed clan Hecata and the destruction of so many Giovanni elders. At Storytellers discretion, a few changes to the Discipline line up may be made depending on the character's bloodline either through replacement of a power with another or by offering a unique 4-dot merit to unlock a fourth in-clan discipline. The following changes may be made; Giovanni line may replace Auspex with Dominate, Samedi may replace Auspex with Obfuscate, Lamiae may replace Auspex with Potence and the Nagaraja may replace Fortitude with Dominate. Keep in mind the requirements for certain Amalgams should a player want them.",
    feeding: {
      description: "With the nature of their bane, the Hecata have developed methods to feed safely. Through blood bags and corpses or extracting blood from their victims without the use of their fangs. They have a habit of feeding on herds or from members of their own family, however this brings strife as resentment and fear builds between them. In more recent years, the clan has formed a unique bond with the Circulatory System, to obtain mute or comatose vessels.",
      methods: [
        "Through blood bags and corpses",
        "Extracting blood from their victims without the use of their fangs",
        "Feeding on herds or from members of their own family",
        "Working with the Circulatory System to obtain mute or comatose vessels"
      ]
    }
  },
  bloodlines: {
    giovanni: {
      name: "La Famiglia Giovanni",
      description: "They occupy the leadership role and face within the Hecata, though will not refer to themselves as Hecata outside the clan. 'La Famiglia' also contains other smaller families who have not earned their own bloodline yet. They are known for necromancy, financial prowess, politicking, and directing operations. The Giovanni and their offspring families are the most populous in the Hecata."
    },
    dunsirn: {
      name: "Bankers of Dunsirn",
      description: "A family of Scottish bankers who indulge in wealth, cannibalism, and family secrets. Their reach is felt in the United Kingdom and pockets of the New World. They originated from the Giovanni line."
    },
    tenochtitlan: {
      name: "Children of Tenochtitlan",
      description: "Known as the Pisanob. A bloodline of talented Aztec necromancers, the Giovanni gave them the exonym “Pisanob”, Mayan for \"ghosts of the dead that walk the Earth\". They were brought into the Giovanni family during the invasion of the New World. The Pisanob are most prevalent in Latin America though their numbers were dwindled by the Harbingers of Skulls attacks. After their leader, Potchli, sacrificed himself to calm hostilities, the bloodline is rebuilding."
    },
    samedi: {
      name: "Samedi (Nasyon San An/Nation of Blood)",
      description: "Kindred with holdings all over the Atlantic from the Caribbean to Central America to West Africa. They are led by Doc San, often confused for Baron Samedi. The line is associated with Vodou practices, along with their decaying flesh. In actuality they commune with loa and gedes and their former curse was an obligation to those who gifted them in good faith. They operated as necromantic spies and mercenaries. They have a relationship with the Ministry; some have even joined the Setites over the Hecata. In the Hecata they bring wisdom and ceremonial knowledge to the alliance."
    },
    nagaraja: {
      name: "Flesh-Eaters",
      description: "The Nagaraja are a mysterious branch with an ambiguous origin. Their greatest presence is in Asia where they often guard places of death. Nagaraja sought a new home within Clan Hecata. They're mostly known for their necromantic prowess, shark-like teeth, and cannibalism. Initially reluctant to join the Hecata until a calamity struck, some have finally joined and proven to be useful serial killers for the Clan of Death."
    },
    harbingers: {
      name: "Harbingers of Ashur",
      description: "Remnants of Clan Cappadocian after being usurped by the Giovanni, captivated with the secrets of death and the soul. They are the synthesis of the Harbingers of the Skull and Cappadocians. This bloodline still wears masks to show their hierarchy with one another. They are known to be excellent spies, chamberlains, and advisors. They know not only how to kill, but the ripple effects of a kill."
    },
    puttanesca: {
      name: "The Criminal Puttanesca",
      description: "A family of Sicilian mobsters known for their talents in organized crime and street hustling. Brought into the family by the Giovanni in the 1600s. After the Reunion the family has gotten the bulk of organized crime operations."
    },
    gorgons: {
      name: "The Gorgons",
      description: "Bloodline of Lamia, childer of the ancient Cappadocian Lazarus. Named for their ancestor, they are remnants of the very Lamia bloodline who were devoted to the Bahari faith, from whom the curse of the Painful Kiss originates. Formerly warrior protectors of Cappadocians, this line was thought to have been killed off. They emerge as Bahari followers and warriors in the new Clan of Death, though operate more as mercenaries than unquestioning bodyguards. They are generally lower in number, but ideal for inroads to the Anarchs and House Carna."
    },
    rossellini: {
      name: "Little Siblings",
      description: "The Rossellini, once a rival family of the Giovanni with a similar talent for necromancy. They are known for their brutal exploitation of wraiths. After the Giovanni ascended to vampirism, they eventually took in the Rossellini as a minor family."
    },
    milliners: {
      name: "Grudge Masters",
      description: "The Milliners, family of American bankers with connections to law enforcement originating from Boston. The Giovanni brought them into the family during the 1950s to settle a grudge the family had. In the late 20th century, they aided in a multi-sided, complicated war for influence in New England before the Reunion disrupted their plans."
    }
  },
  archetypes: {
    backAlleyDoctor: "Through backhanded deals they get their blood from those unable to use standard medical facilities. Their skills lie in patching up a bullet wound to cracking the skulls of those who do not pay on time.",
    fortuneTeller: "The Hecata's ability to commune with the dead and perceive glimpses of the future makes them excellent at giving the living a sliver of information for a heavy price. Through guile and manipulation their pockets remained lined.",
    mortuaryAttendant: "Corpses are the Hecata's best friend. Their time in life prepared them for this job and now this job is the only thing feeding them in adversarial nights.",
    crimeSceneCleaner: "Trinkets are the like are easy found at the scene of a crime, this Hecata has taken advantage of that fact. Able to take items to summon spirits they unravel the stories of what truly happened at a brutal murder scene."
  },
  notableCharacters: {
    rogerDeCamden: {
      description: "One of the oldest and most mysterious Kindred in the Clan of Death. In his life he was many things, a scholar, necromancer, and survivor. Originally English-born after his embrace into the Cappadocians he traveled all over to learn more of the clan's craft. He turned to his native England when he heard of the ancient Kindred Mithras' presence. The two grew close becoming his Seneschal and secret lover. When the Giovanni began to hunt members of the bloodline, he used powerful necromancy to fake his death. He took on a new identity, Pater Thomas, to lead the cult of Mithras from London to Edinburgh. After being used as bait to seemingly end Mithras, Roger's identity has been revealed. Currently the elder has joined the Hecata, rules Edinburgh as Prince, and runs the Cult of Mithras as he waits for the Ventrue to return."
    },
    augustusGiovanni: {
      description: "Formerly the leader of the Giovanni. The head of a Venetian merchant and necormancer family, the antediluvian, Cappadocious, embraced him. Over time Augustus led the coup to diablerize the clan founder, Cappadocious, and usurp the Cappadocians for his line. He led family in a campaign to expand, collect spirits, and destroy the old Clan of Death. Soon discontent with his rule led to a revolt the has supposedly led to his Final Death or exile. The Giovanni now helped form the Hecata, with bloodline he once wanted destroyed."
    },
    mora: {
      description: "A mysterious Harbinger, who feigned acceptance of the Family Reunion. They had murdered many members of the Family in times past, but seemed to want to make amends. This was a ruse for them to get close to their enemy and strike. They leave a Honeysuckle twig in the ashes of those slain. They lead a faction, the Death Seers, to help carry out their work."
    },
    hiromitsuAsano: {
      description: "Patriarch of the Asano family. A ruthless industrialist who main goals were to destroy Mora for their hand in his sire's demise and bring the Asano into prominence."
    },
    leonardoBoella: {
      description: "Leader of the Whispers of the Dead cult."
    }
  },
  culture: {
    embrace: {
      description: "The clan tends to favor mortals either from their own mortal family or those with useful connections outside of the families. There is a preference for those able to withstand death, either through mortals who have faced it dead on or caused it. As well as those who worked in the fields of medical or occult. Little need is found in those who hold compassion or empathy unless used to close a gap in the clan. Graverobbers embrace those willing to do whatever it takes for the good of their family or community. To them, family comes first even if you are not a Giovanni by name. It is seen as giving the most exceptional person the most exclusive family houses. Spontaneous Embraces are generally frowned upon, as they tend to prefer a more ritualistic approach of watching and grooming would be childer before casting their opinion on their worthiness. Each new addition is usually carefully selected and adds something to the clan, with them seeking to serve the family and expand its interest. With no other true independents in these nights, the Hecata are alone against everyone else. Criminal kingpins, the self motivated, those who have seen death, occultists, medical professionals, all have things that can attract any branch of the Hecata and sees them as candidates for Embrace. Knowledge of death is also sought after, those with academic, scientific, or religious experience in death or the afterlife are approached. Of course criminals are appealing, from con artists, to professional killers, to crooked money launderers all do much to pique the interest of the clan. Fledglings and neonates usually take to expand the family’s interest or research new mysteries into the cycle of life and death.",
      criteria: [
        "Those able to withstand death",
        "Those who worked in medical or occult fields",
        "Those willing to do whatever it takes for the good of their family or community",
        "Criminal kingpins",
        "The self motivated",
        "Those who have seen death",
        "Occultists",
        "Medical professionals",
        "Those with knowledge of death"
      ],
      approach: "Spontaneous embraces are generally frowned upon, as they tend to prefer a more ritualistic approach of watching and grooming would be childer before casting their opinion on their worthiness."
    },
    structure: {
      description: "The Hecata have adapted the Giovanni structure, but largely names, ranks and organization depends on families and culture on a local level of each domain. Unlike the Camarilla, the Hecata usually focus over areas of expertise rather than praxis or location.",
      anzianiCouncil: {
        description: "The ruling body of the organization who set policy and goals for the Hecata. They convene in a place called the Mausoleum in Venice.",
        role: "The Anziani is the collective name for the many groups within that allow the Hecata to function on an international scale."
      },
      chamber1444: {
        description: "This inner council used to be Augustus Giovanni's most powerful advisors. Currently they are the leaders of the clan and who sponsored both the Family Reunion and Capuchin upon their growing frustration with Augustus management.",
        role: "They are the final arbiters of the Hecata."
      }
    },
    outsideReunion: {
      description: "There are some bloodlines who are indifferent or have rejected the Family Reunion. They may act as free agents or even hostile to the Hecata.",
      morasDeathSeers: {
        description: "This group still hold their cousins still responsible for past crimes. A faction of Harbingers led by Mora.",
        goals: "The group seeks to travel the world and end the Giovanni bloodline and destroy Hecata of note. Mora claims to have the backing of a methuselah called Unre."
      }
    }
  },
  exclusiveLoresheets: [
    "High Clan",
    "Bankers of Dunsirn",
    "Children of Tenochtitlan",
    "The Nation of Blood",
    "Flesh-Eaters",
    "Harbingers of Ashur",
    "La Famiglia Giovanni",
    "The Criminal Puttanesca",
    "The Gorgons",
    "Calling the Family Reunion",
    "Little Siblings",
    "Grudge Masters",
    "1444 Chamber",
    "Descendant of Roger de Camden"
  ],
  history: {
    originalClan: {
      description: "The Cappadocians were the original holders of the title Clan of Death. Cappadocius was the clan founder and leader.",
      role: "They were known for their roles as advisors, scholars, and saboteurs with lamia as a branch family who operated as bodyguards.",
      feastOfFolly: "At a certain point Cappadocius locked a portion of the clan he considered failures away under Kaymakli, to seal them forever, this event is known as the Feast of the Folly."
    },
    giovanniRise: {
      description: "The Giovanni upon seeing the antedullvian's actions grew nervous and plotted a coup. This branch soon had their leader, Augustus Giovanni, destroy Cappadocius and lead to the newly formed Clan Giovanni.",
      promise: "The Promise of 1528 signed between Clan Giovanni and the Camarilla. The Promise declared non-aggression and allowed the Giovanni to continue their hunt for Cappadocians.",
      endlessNight: "Augustus' grand plan was called Endless Night, a goal to tear down the barrier between the world of the living and the Underworld."
    },
    familyReunion: {
      description: "In the modern night the Harbingers, Cappadocians, Nasyon san an, and dissidents of other death bloodlines started secret communication with young disenfranchised or frustrated Giovanni members.",
      consequences: "The Giovanni and all the bloodlines found themself besieged with legions of ghosts that have been enslaved for centuries.",
      currentStatus: "This led to the formation of the Hecata, a tenuous alliance, often called the Family Reunion. Capuchin became a very prominent leader."
    }
  }
};

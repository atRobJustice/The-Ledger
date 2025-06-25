export const loresheets = {
  name: "Loresheets",
  description: "Loresheets are specific advantages tied to a character's background either through their lineage or their history. When looking at loresheets the players should consider how to tie them into their character's background and the plausibility of their implications together with their storyteller. Some loresheets require the character to be of a specific clan, especially Descendant loresheets, and others require certain cults. Players are able to take a Bloodline Loresheet in addition to a non-lineage Loresheet at Character Creation. Additionally, Storytellers may decide that Descendant loresheets are able to count as Bloodlines.",
  source: ["Vampire: The Masquerade Cults of the Blood Gods", "Vampire: The Masquerade Players Guide"],
  sourcePages: [219, 114],
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
          description: "Connected to the Circulatory System and their mortal trafficking. Different levels grant vessels to feed from, it aids in learning alchemy, securing safe travel for kindred, or learning the resonance properties of blood.",
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
          description: "Connected to Hardestadt and his descendants. Different levels grant the ability to speak over any noise, strengthen the pools when sending others into danger, grant status due to lineage, contact one of the Camarilla's founders, or take on the name of Hardestadt and be his successor.",
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
          sourcePage: 397
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
          restrictions: "N/A",
          description: "Connected to the clans regarded as high in the hierarchy. Different levels grant the character the ability to command others, gain an advantage over both Low and High Clan Kindred, or ignore the burden of the clan bane.",
          sourcePage: 400
        },
        lowClan: {
          name: "Low Clan",
          restrictions: "N/A",
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
          sourcePage: 403
        },
        fiorenzaSavona: {
          name: "Fiorenza Savona",
          restrictions: "N/A",
          description: "Connected to Fiorenza Savona. Different levels grant the character varying levels of relationship with Fiorenza and gain benefits from her, be it a ghoul or other benefits.",
          sourcePage: 404
        },
        descendantOfKarlSchrekt: {
          name: "Descendant of Karl Schrekt",
          restrictions: "Tremere only",
          description: "Connected to Karl Schrekt. Different levels grant the character information regarding House Tremere, bonuses for working towards Schrekt's goals, reduce the effort needed for a ritual, find aid in an unlikely ally, or gain information on those same allies.",
          sourcePage: 405
        },
        descendantOfXavier: {
          name: "Descendant of Xavier",
          restrictions: "Gangrel only",
          description: "Connected to Xavier. Different levels grant the character respect from other Gangrel, detect other vampires in the ground, gain benefits with the Camarilla, turn into a man-sized bat, or have experience with the Antediluvian.",
          sourcePage: 406
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
          restrictions: "••••+ Ministry characters only",
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
          description: "Connected to Fatima al-Faqadi. Different levels grant the character access to a weapons locker, connection to the Extended Web, survive a hit by Fatima, the ability to execute a kindred without retaliation from the Camarilla, or a relationship with Fatima in such she'll eliminate an enemy for the character.",
          sourcePage: 185
        },
        pureVentrueLineage: {
          name: "Pure Ventrue Lineage",
          restrictions: "Ventrue only",
          description: "Connected to the lineage of the Ventrue and the importance they find in their history. Different levels grant the character different lineages, either as a nobility or Prince or clear to Methusulah's as well as later levels giving the option to select between three different lines.",
          sourcePage: 187
        },
        cultOfMithras: {
          name: "The Cult of Mithras",
          restrictions: "N/A",
          description: "Connected to the cult of Mithras. Different levels grant the character varying levels of relationship and knowledge of the cult and its functions with bonuses related.",
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
    }
  }
}; 
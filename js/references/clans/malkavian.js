const malkavian = {
  name: "Malkavian",
  nicknames: ["The Clan of the Moon", "Lunatics", "Madmen", "Jesters", "Oracles", "Dervishes", "Visionaries", "Children of Malkav"],
  disciplines: ["Auspex", "Dominate", "Obfuscate"],
  bane: {
    name: "Fractured Perspective",
    description: "When suffering a Bestial Failure or a Compulsion, their mental derangement comes to the forefront. Suffers a penalty equal to their Bane Severity to one category of dice pools (Physical, Social or Mental) for the entire scene. The penalty and nature of the affliction are decided between the player and Storyteller during character creation."
  },
  variantBane: {
    name: "Unnatural Manifestations",
    description: "Using Discipline powers within close proximity of mortals scares them and any social interactions other than Intimidation suffer a dice penalty equal to their Bane Severity. This is not Masquerade-breaking, but the dislike remains for the duration of one scene. Other vampires subject to this recognize the Malkavian as a vampire but suffer no penalty."
  },
  compulsion: {
    name: "Delusion",
    description: "Whether it's figments of their imagination or extrasensory perception of the truths. For one scene, the Malkavian suffers a 2 dice penalty to rolls involving Dexterity, Manipulation, Composure, and Wits. As well as rolls to resist terror Frenzy."
  },
  background: {
    description: "Derided as Lunatics by other vampires, the Blood of the Malkavians lets them perceive and foretell truths hidden from others. Like the 'wise madmen' of poetry their fractured perspective stems from seeing too much of the world at once, from understanding too deeply, and feeling emotions that are just too strong to bear.",
    embrace: "Their Embraces come from all walks of life and age, with most Embraces carries something that was only visible to the sire.",
    gifts: {
      secondSight: "The ability to understand dreams, perceive spirits or predict the future to some successful degree.",
      insight: "Someone who is highly empathetic up to finely-tuned knowledge of a subject.",
      broken: "Those deemed 'broken' by traumatic events."
    },
    cobweb: "Some Children of Malkav claim that there is a common trait they all share. Believed to be connected through a psychic link, a wavelength of sorts called the Cobweb or more recently titled the Network."
  },
  disciplines: {
    auspex: "Enriches their senses in order to play on their victim's weaknesses.",
    dominate: "Gives them the power of Dementation, utilized by the Malkavian to drive others mad.",
    obfuscate: "Remains a discipline they do not advertise, but gives them the ability to traverse unseen when desiring information or blood."
  },
  archetypes: {
    medium: "In life they worked with the occult, piercing whatever the mortal eye could either as truthfully as they could or as a scam. In death, they continue this work but now aided by their vampiric powers.",
    conspiracyTheorist: "There was something they weren't being told. Bigfoot was real and they were determined to prove it. That determination has only shifted now in death, driving them to find out the unknown.",
    brokenSoul: "Life dealt them a bad hand, scarring them forever. If unlife has done anything better for them it is still unknown.",
    reporter: "With their ability to perceive truths and fragments of future events, they utilize their skill with Auspex to gather all the information they can for the biggest scoop of their life."
  },
  notableCharacters: {
    voermanSisters: {
      description: "Jeanette/Therese Voerman - Malkavian Sisters who ran The Asylum club in Los Angeles and have now branched it across the world in a franchise across America, Asia and Europe.",
      nature: "Known for their combative personalities the Voerman sisters do not get along and so now they run separate Asylums, one in Santa Monica and the other in Hollywood. However they are never seen in one place together, as those closest to them know that they are one vampire with two distinct personalities sharing a single body."
    },
    vasantasena: {
      description: "Through the Middle Ages she traveled with her sire, Unmada, preaching against the Blood bond and denying the traditional Kindred hierarchy and the loss of free will that followed.",
      history: "They condemned the Antediluvians through the Jyhad and joined the Sabbat during it's original formation. Her ideals were rejected by both the Sabbat and Camarilla, leading her to eventually creating a faction of Malkavians to embrace free from the Sabbat."
    },
    x: {
      description: "Santa Monica based Kindred. He may be Annabelle's first Kindred friend and became part of the Vamily in LA by Night.",
      currentStatus: "Though he may have more going on than meets the eye as he works under the Baron of Santa Monica, Therese Voerman."
    },
    leysha: {
      description: "Resides in Boston, Massachusetts with powerful precognitive and investigative abilities utilized by the Boston Court.",
      background: "Much of her past is unknown other than her being from Lyon, France and saved by her sire. Due to her gifts and importance, she experienced a more secluded unlife until the events of Vampire: The Masquerade Swansong."
    },
    julietParr: {
      description: "Current Malkavian Justicar, hailing from London as former Sheriff of North London.",
      abilities: "She has the power to investigate and apprehend enemies of the Tower. She uses her skill in interrogation and near obsessive fixation on details to her advantage. She attempts to aid Queen Anne in stabilizing London, her fate is uncertain."
    }
  },
  culture: {
    embrace: {
      description: "Malkavian Embraces are diverse in age, gender, ethnicity, nationality, the only thing that matters is what inner trait the would-be sire sees in a prospective childe.",
      criteria: [
        "Those with Second Sight - ability to see the unseen and pierce the veil",
        "Those with insight - deep questions, high empathy, emotional intelligence",
        "Those who have survived harrowing experiences",
        "Those constantly dissociating from reality"
      ],
      professions: [
        "Spiritualists",
        "Psychologists",
        "Detectives",
        "Broken individuals"
      ]
    },
    humanSociety: {
      description: "In human society many Malkavians are attracted to similar personality types that make a good childe.",
      roles: [
        "Cult leaders",
        "Hospital board members",
        "Clinic owners"
      ],
      herdRelations: "Some herds and retainers of often forgotten communities become obsessive of their Malkavian masters for the attention given."
    },
    kindredSociety: {
      description: "The Malkavians are cursed and their minds are burned with seeing too many truths, feeling emotions to such a strong degree, or the Blood activating age-old mental wounds.",
      reputation: "They have a negative reputation of being a clan cursed with madness. Though some consider their madness may be like the stories told in times of old of seers and prophets with some truth hidden behind their ramblings.",
      cobweb: {
        description: "The Children of Malkav are all connected to one another in what is called the Cobweb or Madness Network.",
        nature: "They are never really alone as their minds are psychically connected to each other's mind. To some it may be hardly noticeable, but for others it is like having a second mind running in the background of their mind.",
        theCall: "The Call is when the Oracles gather, directed by the Cobweb giving vague visions and ideas of meeting up. Some say this is the remaining form of Malkav always presence in his descendants mind."
      }
    },
    factionalDifferences: {
      camarilla: "The Children of Malkav thrive in the Camarilla supposedly with a sense of structure that aids their minds. This allows many Malkavians who make social faux pas to have some room for grace if they are beneficial to the sect. They can rise to seneschals and in some cases Princes.",
      anarch: "The Malkavians of the Anarchs are called the Unchained as they are rumored to be more disconnected from the clan and Cobweb. Many Malks see this as dangerous for the Unchained's mind. Many suppose the Blood resists the Anarch Movement giving many Malkavians a reluctance to join."
    }
  },
  exclusiveLoresheets: [
    "Descendant of Vasantasena",
    "The Cobweb",
    "Malkavian Family",
    "Starfall Ranch"
  ]
};
window.malkavian = malkavian; 
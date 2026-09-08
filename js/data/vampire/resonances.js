export const resonances = {
  overview: {
    description:
      "Mortal blood powers the vampire's corpse, allowing them to remain active during the nights and tap into their powers. Kindred know that it's more than the breakdown of the blood in scientific terms and is instead linked to some unknown essence in the blood. When Kindred find the right victim or when they drink deep enough, they find something more, known as Resonance. This is a tool crucial to all vampires and not just the alchemists or blood mages who can utilize these emotions in their work. Resonances strengthen the Kindred's powers as determined by their Blood Potency and sometimes, with the right amount of kick to it, can give other benefits known as Dyscrasia.",
    temperaments: {
      none: 50,
      fleeting: 30,
      intense: 16,
      acute: 4
    }
  },
  types: {
    choleric: {
      name: "Choleric",
      description:
        "The humor of passion and anger but also one of jealousy and violence. This Resonance can, but not exclusively, be found in vessels that have the will to fight back against whatever problems they face.",
      emotions: [
        "angry",
        "violent",
        "bullying",
        "passionate",
        "envious"
      ],
      disciplines: ["Celerity", "Potence"]
    },
    melancholic: {
      name: "Melancholic",
      description:
        "The humor of sadness and the downtrodden but also those who seek enlightenment. This Resonance can, but not exclusively, be found in vessels who have lost the will to fight or those who are seized by the gain of knowledge.",
      emotions: [
        "sad",
        "scared",
        "depressed",
        "intellectual",
        "grounded"
      ],
      disciplines: ["Fortitude", "Obfuscate"]
    },
    phlegmatic: {
      name: "Phlegmatic",
      description:
        "The humor of those who are calm and relaxed or those who are lost in their own reminiscing. This Resonance can, but not exclusively, be found in vessels who are at peace or can't find a reason to care at the moment.",
      emotions: [
        "lazy",
        "apathetic",
        "calm",
        "controlling",
        "sentimental"
      ],
      disciplines: ["Auspex", "Dominate"]
    },
    sanguine: {
      name: "Sanguine",
      description:
        "The humor of sex and passion but also of happiness and liveliness. This Resonance can, but not exclusively, be found in vessels who have a sexual interest in the vampire or are simply enjoying life itself.",
      emotions: [
        "horny",
        "happy",
        "enthusiastic",
        "addicted",
        "active",
        "flighty"
      ],
      disciplines: ["Blood Sorcery", "Presence"]
    },
    empty: {
      name: "Empty",
      description:
        "This Resonance represents those who lack general emotions.",
      emotions: ["That of sociopaths or the emotionally detached"],
      disciplines: ["Oblivion"]
    },
    animal: {
      name: "Animal Blood",
      description:
        "While not a Resonance, it does serve a purpose to vampires. Giving them access to the last two Disciplines. The Storyteller is free to correlate animal blood to the main four Resonances, should they find it important to their chronicle.",
      emotions: ["None. Not tied to any emotion, simply animal blood"],
      disciplines: ["Animalism", "Protean"]
    }
  },
  temperaments: {
    fleeting: {
      name: "Fleeting",
      description:
        "Fleeting temperament is something that occurs in that moment, something from outside stimuli has influenced this Resonance and humans with basic emotional equilibrium experience this often. This temperament isn't strong enough to give them a bonus, however it is enough to justify the character purchasing dots in the Resonance's associated Discipline."
    },
    intense: {
      name: "Intense",
      description:
        "Intense temperament indicates that the mortal has a strong tendency towards a Resonance, perhaps it's due to past traumas or from a very rewarding lifestyle that gives them a constant dopamine hit. With the strength of this Resonance, characters who consume it receive a bonus of one die towards the pools of the Resonance's associated Disciplines which lasts until their next drink of blood or until their Hunger hits 5."
    },
    acute: {
      name: "Acute",
      description:
        "The acute Resonance is so intense that it contains a self-sustaining reaction, which provides the same bonus as intense, however it also can be taken further. From acute Resonance a Kindred can find something called a Dyscrasia. This is only able to be tapped, unless otherwise stated, through the killing and draining of the vessel or from feeding from them over a course of three nights. Some of these Dyscrasia effects can only be tapped once and others can linger and be tapped on later occasion. The effects of Dyscrasia generally only last till the next feeding or till they reach Hunger 5."
    }
  }
};

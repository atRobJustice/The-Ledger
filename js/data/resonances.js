export const resonances = {
  overview: {
    description:
      "Resonance represents the emotional quality found in mortal blood. Depending on the resonance, a vampire gains bonuses to specific Disciplines and—at higher intensities—additional benefits called Dyscrasias.",
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
        "The humor of passion, anger, jealousy and violence. Often found in vessels ready to fight back against their problems.",
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
        "The humor of sadness, fear and seekers of knowledge. Found in the downtrodden or the intellectually driven.",
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
        "The humor of calm, apathy and reminiscence. Found in vessels who are at peace or detached.",
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
        "The humor of sex, passion, happiness and liveliness. Found in vessels enjoying life or feeling desire toward the vampire.",
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
        "Represents those who lack general emotion—sociopaths or the emotionally detached.",
      emotions: ["emotionally detached", "sociopathic"],
      disciplines: ["Oblivion"]
    },
    animal: {
      name: "Animal Blood",
      description:
        "Not a true resonance but still serves vampires, offering a link to the last two Disciplines. Storytellers may map animal blood to the main four resonances as desired.",
      emotions: [],
      disciplines: ["Animalism", "Protean"]
    }
  },
  temperaments: {
    fleeting: {
      name: "Fleeting",
      description:
        "A momentary burst of emotion caused by external stimuli. Grants no dice bonus but justifies purchasing dots in the resonance's associated Disciplines."
    },
    intense: {
      name: "Intense",
      description:
        "A strong, lingering tendency toward the resonance. Grants +1 die to pools with the resonance's associated Disciplines until the next drink or upon reaching Hunger 5."
    },
    acute: {
      name: "Acute",
      description:
        "An overwhelming, self-sustaining intensity. Provides the intense bonus and enables Dyscrasia effects when fully drained or fed from over three nights."
    }
  }
}; 
export const compulsions = {
  general: {
    hunger: {
      name: "Hunger",
      description: "The vampire will do whatever it takes to slake their hunger, any action taken that does immediately lead to obtaining blood suffers a two-dice penalty.",
      resolution: "This ends when the vampire slakes at least 1 Hunger level."
    },
    dominance: {
      name: "Dominance",
      description: "The vampire's next action is a competition and they desire to gloat in the face of someone they beat. During this time they are unable to utilize teamwork or any actions taken not leading to gloating, establishing dominance or challenging authority at a two-dice penalty.",
      resolution: "This ends when they have beaten someone in some way and gloated over it."
    },
    harm: {
      name: "Harm",
      description: "The vampire desires to inflict harm, be it social, mental or physical harm. Any actions not immediately resulting in someone else's pain, the vampire suffers a two-dice penalty.",
      resolution: "This ends once they have driven away, incapacitates or destroys a target. If the target is an object rather than a person, it must hold serious value to someone."
    },
    paranoia: {
      name: "Paranoia",
      description: "The vampire becomes overwhelmed with fearful paranoia, looking to disengage from a threat or suspecting anyone near them. Any action not taken to getting them somewhere safe suffers a two-dice penalty.",
      resolution: "This ends when they have spent roughly an hour in a safe place."
    },
    insurmountableRegrets: {
      name: "Insurmountable Regrets",
      description: "The vampire is haunted by the memory of something that they did or didn't do when it really mattered. They gain the Compulsion to redo what they did wrong.",
      variants: {
        inaction: {
          name: "Regret of Inaction",
          description: "The vampire regrets something they didn't do, this Compulsion causes as overwhelming desire to take action. They feel compelled to make the most aggressive choice when in a dilemma.",
          penalty: "Actions taken to resist the Compulsion are done at a two-dice penalty.",
          resolution: "The Compulsion ends when given into."
        },
        action: {
          name: "Regret of Action",
          description: "The vampire regrets something they did, this Compulsion causes them to hesitate. When they suffer from it, they feel compelled to withdraw and think everything through thoroughly before they act.",
          penalty: "They get a -2 penalty to all pool until they've had a chance to withdraw and spent a scene in solitude. If in combat, forego initiative ranking: the vampire will go last.",
          resolution: "They can spend a level of Willpower to end the Compulsion early."
        }
      }
    },
    uncontrollableFleshChange: {
      name: "Uncontrollable Flesh Change",
      description: "Habitual use of Vicissitude or other powers requiring Vicissitude as a prerequisite can lead to this Compulsion. They feel an overwhelming urge to use these powers.",
      penalty: "Take a two-dice penalty for any other actions until they've satisfied the urge.",
      source: "Vampire: The Masquerade Tattered Façade, page 105"
    },
    dependency: {
      name: "Dependency",
      description: "Characters with this Compulsion find themselves unable to risk failure, even with minor tasks.",
      resolution: "They must Blood Surge for every action until they fail their test or reach Hunger 5.",
      source: "Vampire: The Masquerade Tattered Façade, page 118"
    },
    masochism: {
      name: "Masochism",
      description: "This Compulsion appears when Kindred are most exposed or where those they respect are present to judge them, when failure would be dramatic, or when they risk doing damage to their unlife or Humanity.",
      penalty: "Suffer a 2-dice penalty on all tests until they intentionally humiliate themselves, cause a far-reaching or monumental failure, gain a Stain, or the scene ends.",
      source: "Vampire: The Masquerade Tattered Façade, page 118"
    },
    overkill: {
      name: "Overkill",
      description: "The power that courses through Kindred is dangerously addictive. This Compulsion does not care for optics, the Masquerade, or appropriateness.",
      penalty: "Suffer a 4-dice penalty on all tests where a Discipline could definitively solve the problem in one move.",
      resolution: "Resolved when they use a Discipline to solve a problem in an egregious manner. Storytellers are encouraged to deny trivial uses of Disciplines.",
      source: "Vampire: The Masquerade Tattered Façade, page 118"
    },
    repetition: {
      name: "Repetition",
      description: "While in exceptionally harrowing or traumatic circumstances, they can gain this Compulsion to repeat the thing that happened when they obtained the Compulsion.",
      penalty: "They cannot rest until they do so, heal no damage during day-sleep, and cannot be roused. Unmoving, they think of what they must do.",
      resolution: "The Compulsion remains the same for the character until they find peace with what they did or until their story ends.",
      source: "Vampire: The Masquerade Tattered Façade, page 119"
    },
    need: {
      name: "Need",
      description: "Only gained through Presence: Inflame Desire. The victim becomes obsessed with satisfying a desire in a scene.",
      penalty: "Any action not taken toward this purpose suffers a two-dice penalty.",
      resolution: "Ends when the need is satisfied or the object of desire becomes unattainable.",
      source: "Vampire: The Masquerade Tattered Façade, page 105"
    }
  },
  clanCompulsions: {
    banuHaqim: {
      name: "Judgement",
      description: "Urged to punish a wrongdoer, the vampire must slake one Hunger from anyone that acts against their own Convictions.",
      penalty: "Failing to do so results in a three-dice penalty to all rolls until the Compulsion is satisfied or the scene ends.",
      note: "Should the victim be a vampire, the Bane applies."
    },
    brujah: {
      name: "Rebellion",
      description: "The Brujah craves to take a stance against those who represent the status quo.",
      penalty: "During this Compulsion, they suffer a -2 to dice all pools.",
      resolution: "This does not relent until they have gone against orders, expectations, or changed someone's mind."
    },
    gangrel: {
      name: "Feral Impulses",
      description: "The Gangrel's Beast becomes more prominent, driving them to act on animalistic instincts.",
      penalty: "They suffer a -2 penalty to all Social rolls.",
      resolution: "This ends when they have successfully hunted and fed from a living creature."
    },
    caitiff: {
      name: "None",
      description: "Caitiff do not have a clan-specific compulsion."
    },
    hecata: {
      name: "Morbid Fascination",
      description: "The Hecata becomes obsessed with death and the dead.",
      penalty: "They suffer a -2 penalty to all rolls not related to death, the dead, or necromancy.",
      resolution: "This ends when they have spent a scene interacting with or studying the dead."
    },
    lasombra: {
      name: "Ruthlessness",
      description: "The Lasombra must prove their dominance and power.",
      penalty: "They suffer a -2 penalty to all rolls not aimed at establishing or maintaining control.",
      resolution: "This ends when they have successfully dominated or destroyed a significant threat."
    },
    malkavian: {
      name: "Delusion",
      description: "The Malkavian becomes convinced of a particular delusion.",
      penalty: "They suffer a -2 penalty to all rolls not related to their delusion.",
      resolution: "This ends when they have acted out their delusion in a significant way."
    },
    ministry: {
      name: "Transgression",
      description: "The Ministry must corrupt or tempt others.",
      penalty: "They suffer a -2 penalty to all rolls not aimed at corruption or temptation.",
      resolution: "This ends when they have successfully corrupted someone's morals or beliefs."
    },
    nosferatu: {
      name: "Cryptophilia",
      description: "The Nosferatu becomes obsessed with secrets and hidden things.",
      penalty: "They suffer a -2 penalty to all rolls not related to uncovering or protecting secrets.",
      resolution: "This ends when they have discovered a significant secret or hidden something important."
    },
    ravnos: {
      name: "Wanderlust",
      description: "The Ravnos must keep moving and avoid staying in one place.",
      penalty: "They suffer a -2 penalty to all rolls when staying in one location for too long.",
      resolution: "This ends when they have moved to a new location or begun a new journey."
    },
    salubri: {
      name: "Healing",
      description: "The Salubri must heal others, even at their own expense.",
      penalty: "They suffer a -2 penalty to all rolls not aimed at healing or helping others.",
      resolution: "This ends when they have successfully healed someone or prevented harm."
    },
    toreador: {
      name: "Aesthetic",
      description: "The Toreador becomes obsessed with beauty and art.",
      penalty: "They suffer a -2 penalty to all rolls not related to art, beauty, or aesthetics.",
      resolution: "This ends when they have created or experienced something beautiful."
    },
    tremere: {
      name: "Perfection",
      description: "The Tremere must maintain perfect control and order.",
      penalty: "They suffer a -2 penalty to all rolls not aimed at maintaining control or order.",
      resolution: "This ends when they have successfully imposed their will or restored order."
    },
    tzimisce: {
      name: "Possession",
      description: "The Tzimisce must claim and control territory or people.",
      penalty: "They suffer a -2 penalty to all rolls not aimed at claiming or controlling something.",
      resolution: "This ends when they have successfully claimed something as their own."
    },
    ventrue: {
      name: "Arrogance",
      description: "The Ventrue must assert their superiority and authority.",
      penalty: "They suffer a -2 penalty to all rolls not aimed at demonstrating their superiority.",
      resolution: "This ends when they have successfully asserted their authority over others."
    },
    thinBlood: {
      name: "None",
      description: "Thin-bloods do not have a clan-specific compulsion."
    }
  },
  getClanCompulsion: function(clanName) {
    return this.clanCompulsions[clanName.toLowerCase()] || null;
  },
  getGeneralCompulsion: function(compulsionName) {
    return this.general[compulsionName.toLowerCase()] || null;
  }
}; 
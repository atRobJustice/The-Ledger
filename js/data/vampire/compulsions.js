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
      description: "Unleash the animal hidden in their Blood. This urges the Gangrel to regress into an animalistic state where speech becomes difficult, clothes become too constrictive and arguments and best settled with claws and teeth. For one scene the Gangrel suffers a -3 dice penalty to all rolls involving Manipulation and Intelligence as they are only able to speak one word sentences during this Compulsion."
    },
    caitiff: {
      name: "None",
      description: "Caitiff do not have a clan-specific compulsion."
    },
    hecata: {
      name: "Morbidity",
      description: "The vampire must move something from life to death or vice versa, any action not taken to end or resurrect something suffers a two-dice penalty. The subject does not have to be a living thing and can instead be an object or more abstract such as ideas or conversation points. This Compulsion lasts until they manage to kill or return something to life."
    },
    lasombra: {
      name: "Ruthlessness",
      description: "The next time the vampire fails an action they receive a two-dice penalty to all rolls until a future attempt at the same action succeeds. This penalty applies to future attempts of the same action still."
    },
    malkavian: {
      name: "Delusion",
      description: "Whether it's figments of their imagination or extrasensory perception of the truths. For one scene, the Malkavian suffers a 2 dice penalty to rolls involving Dexterity, Manipulation, Composure, and Wits. As well as rolls to resist terror Frenzy."
    },
    ministry: {
      name: "Transgression",
      description: "The Minister suffers a burning desire to influence those around them to shatter the chains of their own making. They suffer a two-dice penalty to all dice pools that do not relate to enticing someone or themselves to break a Chronicle or personal Conviction. The Compulsion ends once the Minister causes someone, or themselves, at least one stain."
    },
    nosferatu: {
      name: "Cryptophilia",
      description: "Consumed by a hunger for private secrets, the Nosferatu seeks to obtain knowledge no matter big or small as long as it's not a well-known bit of information. During this, they also refuse to give up their secrets except in strict trade for something greater than their own. Any action not actively working towards gaining them a secret they take a two-dice penalty. This Compulsion does not end till they learn a secret they deem to be useful, sharing this secret is entirely optional."
    },
    ravnos: {
      name: "Tempting Fate",
      description: "When faced with their next problem, the Daredevil must attempt the solution with the most dangerous or daring of actions, anything less incurs a two-dice penalty. Context appropriate flashy or risky attempts may even net bonus dice. They are free to convince others to follow them in their actions but may as well go it alone. This Compulsion persists until the problem is solved or further attempts become impossible to accomplish."
    },
    salubri: {
      name: "Affective Empathy",
      description: "Overwhelmed with empathy for a personal problem of someone else, any action not taken to help the person mitigate their suffering is at a two-dice penalty. This Compulsion continues until the sufferer's burden is eased, a more critical problem arises, or the scene ends."
    },
    toreador: {
      name: "Obsession",
      description: "Utterly obsessed with a single thing, the Toreador cannot speak of anything but that object. Be it a person, a piece of artwork, a blood splatter in the right lighting, or the sunrise itself, they cannot take their attention from it. Any other actions receive a two-dice penalty. This Compulsion lasts until they can no longer perceive the object or the scene ends."
    },
    tremere: {
      name: "Perfectionism",
      description: "Nothing but the best will satisfy them, anything less than exceptional still instills a profound sense of failure. When afflicted by this, the Warlock suffers a two-dice penalty to all dice pools. The penalty is reduced to one die when actions are being repeated and removed entirely on a second repeat. This does not end till they managed to score a critical win on a Skill roll or the scene ends."
    },
    tzimisce: {
      name: "Covetousness",
      description: "When afflicted with this compulsion they become obsessed with owning something in the scene, be it an object, or property to a living person. Whatever it is, they must add it to their collection and any action taken not towards this purpose incurs a two-dice penalty. This penalty continues until ownership is established or the object of their desire is unobtainable."
    },
    ventrue: {
      name: "Arrogance",
      description: "Fueled by the beast and their natural desire for power, the Ventrue must force someone to obey a command given. The order cannot be given through supernatural means such as Dominate. Until they satisfy the requirements, they receive a two-dice penalty for any actions not directly related to leadership."
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
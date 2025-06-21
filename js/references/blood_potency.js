const bloodPotency = {
  overview: {
    description: "As time passes the kindred's blood thickens from age within the boundaries of their Generation's limit. While the stronger they become with age, there is a downside that it will take more blood to satisfy the vampire.",
    progression: "Kindred generally raise Blood Potency by 1 every 100 years while active but even intense or dangerous experiences can expedite the process.",
    regression: "On the reverse side, Kindred in torpor loses one point for every 50 years inactive. It can never rise nor lower beyond the cap determined by their Generation."
  },
  levels: {
    0: {
      description: "Those with this Blood Potency are Thin-bloods. Thin-bloods can never increase their Blood Potency past 0 unless they rise above Generation 14 using Diablerie.",
      effects: [
        "Add one dice to your dice pool when utilizing Blood Surge",
        "Able to mend 1 Superficial damage per Rouse Check",
        "Unable to create Blood Bonds, Embrace with certainty, or create ghouls",
        "Frenzy only occurs with supernatural forces causing it",
        "Take 1 point of Superficial damage per turn in sunlight",
        "Bane Severity (if applicable) is 1"
      ]
    },
    1: {
      effects: [
        "Add two dice to your dice pool when utilizing Blood Surge",
        "Able to mend one Superficial damage per Rouse Check",
        "When making a Rouse Check for a level one Discipline, they can reroll once if they fail",
        "Bane Severity is 2"
      ]
    },
    2: {
      effects: [
        "Add two dice to your dice pool when utilizing Blood Surge",
        "Able to mend two Superficial damage per Rouse Check",
        "When making a Rouse Check for a level one Discipline, they can reroll once if they fail",
        "Animal and bagged blood slake half as less",
        "Gain a one-die bonus when using Disciplines",
        "Bane Severity is 2"
      ]
    },
    3: {
      effects: [
        "Add three dice to your dice pool when utilizing Blood Surge",
        "Able to mend two Superficial damage per Rouse Check",
        "When making a Rouse Check for a level two or below Discipline, they can reroll once if they fail",
        "Animal and bagged blood slake nothing",
        "Gain a one-die bonus when using Disciplines",
        "Bane Severity is 3"
      ]
    },
    4: {
      effects: [
        "Add three dice to your dice pool when utilizing Blood Surge",
        "Able to mend 3 Superficial damage per Rouse Check",
        "When making a Rouse Check for a level two or below Discipline, they can reroll once if they fail",
        "Animal and bagged blood slake nothing. Human blood slakes less",
        "Gain a two-dice bonus when using Disciplines",
        "Bane Severity is 3"
      ]
    },
    5: {
      effects: [
        "Add four dice to your dice pool when utilizing Blood Surge",
        "Able to mend three Superficial damage per Rouse Check",
        "When making a Rouse Check for a level three or below Discipline, they can reroll once if they fail",
        "Animal and bagged blood slake nothing. Human blood slakes less and must drain a human to go below Hunger 2",
        "Gain a two-dice bonus when using Disciplines",
        "Bane Severity is 4"
      ]
    },
    6: {
      description: "The Beckoning is pulling the elders away, making these levels of potency much rarer than they once were. Vampires with this level of potency are alien in both mind and body and are not intended for player characters. Still, their potency information is included for the Storyteller to utilize in chronicles.",
      note: "This level and higher are not intended for player characters"
    }
  },
  getEffects: function(potency) {
    return this.levels[potency]?.effects || [];
  },
  getBaneSeverity: function(potency) {
    const severities = {
      0: 1,
      1: 2,
      2: 2,
      3: 3,
      4: 3,
      5: 4
    };
    return severities[potency] || null;
  },
  getBloodSurgeBonus: function(potency) {
    const bonuses = {
      0: 1,
      1: 2,
      2: 2,
      3: 3,
      4: 3,
      5: 4
    };
    return bonuses[potency] || null;
  },
  getDisciplineBonus: function(potency) {
    const bonuses = {
      2: 1,
      3: 1,
      4: 2,
      5: 2
    };
    return bonuses[potency] || 0;
  },
  getHealingAmount: function(potency) {
    const healing = {
      0: 1,
      1: 1,
      2: 2,
      3: 2,
      4: 3,
      5: 3
    };
    return healing[potency] || null;
  },
  getRerollDisciplineLevel: function(potency) {
    const levels = {
      1: 1,
      2: 1,
      3: 2,
      4: 2,
      5: 3
    };
    return levels[potency] || null;
  }
};
window.bloodPotency = bloodPotency; 
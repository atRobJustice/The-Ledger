const hunterMechanics = {
  danger: {
    name: "Danger",
    description: "Danger is a tracker between the cell of Hunters, which each member contributes to and is affected by. Danger spans a rating from 1 to 5, but this rating can be expanded or limited depending on the chronicle.",
    explanation: "Danger represents the extent to which their enemies are aware of the Hunters, and the likelihood of them becoming a target. Each level of Danger increases the amount of danger that the cell will face as enemies tighten their security, hire more henchmen, and eventually begin taking actions directly to counter the Hunters. The exact effect of Danger can change depending on the chronicle, story, or even scene, as can the length of the tracker. While Danger does not carry over from story to story, some chronicles may have an additional overarching Danger tracker separate from the usual one.",
    mechanics: "The tracker itself increases as the Storyteller sees fit, based on the story events or by the Hunters when they Overreach. It is rare for the Danger to decrease, but it is possible if the Hunters lay low for an extended period of time. This can cause them to lose crucial opportunities."
  },
  despair: {
    name: "Despair",
    description: "Despair is both a mechanic and a thematic element of Hunter: The Reckoning. Thematically, it's caused by failures and shortcomings in a pursuit of the quarry.",
    mechanics: "Mechanically, Despair is caused by rolling 1 on Desperation dice and either failing the test, or choosing to go into Despair instead of Overreach if the test was successful. The higher the Desperation, the stronger the risk of entering Despair. While in Despair, Hunter cannot tap into their Drive and use Desperation dice to fuel their rolls.",
    touchstones: "Despair is also a state tied to the lack of Touchstones. A Hunter with no Touchstones cannot regain Willpower, and is considered to be permanently in Despair.",
    redemption: "Going out of the state of Despair requires redemption tied to the Hunter's Drive - an action that allows the Hunter to remind themselves why they are on the Hunt, and what has driven them into it in the first place. Each Drive has different condition to achieve this. Redemption doesn't have to be tied to actions of an individual Hunter in the state of Despair; instead, it can be considered as a group effort, with other cellies helping the Hunter in tapping into their Drive again."
  },
  desperation: {
    name: "Desperation",
    description: "Desperation is a tracker shared among the cell of Hunters, spanning from 1 to 5. Each member contributes to it and is affected by its rating.",
    explanation: "Desperation represents the state of urgency and anxiety of a cell and dictates the amount of Desperation Dice that each Hunter can add to their pool by tapping into their Drive when performing actions related to their Edge. The higher a cell's Desperation is, the greater the strength of the Hunter's Drives and, in turn, the risk of Danger and Despair. Generally, Desperation increases at the end of a major scene when things do not go in the cell's favor, and when the fate of the Hunters, their quarry, or innocents is on the line. Ultimately, the storyline and the Storyteller should dictate what conditions cause Desperation to increase or decrease.",
    cellSeparation: "If a member of a cell parts ways or if the entire cell breaks apart, they all start with the same Desperation level as the parent cell. Any further changes to the tracker, however, will only impact the specific cell.",
    increasingExamples: [
      "One or more of the Hunters is seriously wounded or killed.",
      "Even with the effort of the cell, the quarry has escaped or advanced its goals.",
      "The quarry manages to kill innocents due to a misstep or failure to protect the cell."
    ],
    decreasingExamples: [
      "The Hunters manage to gain crucial information about their quarry without any issue.",
      "Innocents were protected by the cell while accomplishing another goal.",
      "The quarry is seriously harmed or otherwise majorly impacted by the cell."
    ]
  },
  desperationDice: {
    name: "Desperation Dice",
    description: "Each Hunter has one Drive; should they attempt a roll that falls within the parameters of said Drive, they are able to add the amount of Desperation on the tracker into their Skill pool. This increases their chance of accomplishing their goal, but it also places them at greater risk.",
    mechanics: "A roll made this way counts all successes and criticals as if they were regular dice, but if they roll a \"1\" on at least one Desperation die, it triggers Overreach or Despair. If they win the test, they can choose to either Overreach and keep the win or to treat it as a failure and enter Despair. If they lose the test, they will enter Despair.",
    overreach: {
      name: "Overreach",
      description: "For each \"1\" on the Desperation Dice, increase Danger by 1. The Hunter has somehow revealed themselves and their cell to their quarry in a method related to their Drive. While the test is still a win, the long-term consequences could prove disastrous for the entire cell."
    },
    despair: {
      name: "Despair",
      description: "The test has failed, no matter the number of successes. The Hunter enters a state of Despair, which renders their Drive useless, and they are unable to call upon it to use Desperation Dice until they've redeemed themselves. Each Drive has a unique condition for redemption and can be treated as a group effort instead of being accomplished by an individual."
    }
  }
};

export default hunterMechanics; 
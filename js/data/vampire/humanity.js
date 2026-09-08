export const humanity = {
  overview: {
    description:
      "Most vampires will begin to drop in Humanity over time with neonates and ancillas sitting around Humanity 5. A vampire player character will start at Humanity 7 unless particular circumstances alter this such as Predator Types. Those that are freshly Embraced will begin at Humanity 8. Kindred are monsters, regardless of their rating and even the most saintly and highest of Humanity vampires can be morally corrupt. As their Humanity rating changes over the course of time, it's important to keep track of the changes that will occur. As their rating deteriorates over time, their connections alter and soon they might find themselves holding the corpse of a human they had originally never intended to kill."
  },
  track: {
    description: "The Humanity tracker contains 10 spaces, with the Humanity rating filled from left to right.",
    stains: {
      description: "Stains are what damage Humanity and are caused by significant actions. Those actions may include embracing a new childe, harming a touchstone, breaching their own convictions or the chronicle tenets. Tenet Stains can be negated by a character's Conviction if it was broken in alignment of their Conviction, reducing the amount of Stains gained by one or more. The amount of Stains earned can vary from clear violations giving only 1 and with truly monstrous or egregious breaks netting 2 or more. Fill the amount of Stains exceeds the amount of empty spaces in the tracker degeneration is triggered.",
      tracking: "When taking Stains, the tracker fills in from right to left with slash marks to differentiate the Stains from Humanity."
    },
    remorse: {
      description: "When a character has Stains in their tracker at the end of a session they will make a Remorse test. The Remorse pool is composed of how many empty spaces are left between the Humanity and the amount of Stains taken. In the case of a Humanity 7 character with only one Stain, they'd roll two dice. However, in cases where there are no spaces left, such as a Humanity 7 character with three Stains, they'd still roll 1 die. Any amount of successes means that the character has felt enough guilt, shame and remorse than their Humanity will not drop. If they do not any successes, the beast has won and they must drop 1 Humanity. Once the remorse test is completed, all Stains are removed."
    },
    degeneration: {
      description: "In cases where they have taken more Stains than they have room for, the character becomes impaired. This type of impairment removes two dice from all possible pools as they are racked with regret. In addition to this, they take one point of Aggravated Willpower damage for each Stain that did not fit onto the tracker. During this time, the character is unable of further intentional Tenet violations and upon being forced to commit one must test for a terror frenzy with Difficulty 4. This impairment will remain until they test for Remorse at the end of the session, alternatively they may choose to snap out of it by automatically dropping by one Humanity point and removing all Stains."
    }
  },
  ratings: {
    10: {
      description:
        "Humans with this score are rare, making vampires with this score even rarer.",
      effects: [
        "Blush of Life is not needed to blend into mortal society as they appear as a pale and healthy mortal.",
        "They heal Superficial Damage as a mortal in addition to standard healing.",
        "Food is able to be tasted, eaten, and digested as a human.",
        "The ability to stay awake during the day as if human, though they still must sleep at some point.",
        "Sunlight damage is halved."
      ]
    },
    9: {
      description:
        "Kindred with this rating tend to be more humane than most humans, acting and thinking as mortals would in the same unconscious way as a method actor.",
      effects: [
        "Without Blush of Life they appear ill.",
        "They heal Superficial Damage as a mortal in addition to standard healing.",
        "Taste, eat and digest rare or raw meat and many liquids.",
        "Rise from day-sleep up to an hour before sunset and stay awake an hour after dawn."
      ],
      torporLength: "Three days"
    },
    8: {
      description:
        "They are still able to comprehend and feel the pain from the anguish they cause.",
      effects: [
        "Two dice are used for the Blush of Life checks, taking the highest result between the two.",
        "With Blush of Life, they can digest and taste wine.",
        "Rise from day-sleep an hour before sunset."
      ],
      torporLength: "One week"
    },
    7: {
      description:
        "Kindred with this rating can pass for mortal, still subscribing to the strongest of social norms of viewing murder as wrong but have no qualms about going faster than the speed limit or dodging taxes.",
      effects: [
        "The rules for Humanity 7 are mostly the same for other kindred, with their changes noted in each section below.",
        "Blush of Life requires a Rouse Check.",
        "Can fake sexual intercourse by winning a Dexterity + Charisma test versus the partner's Composure or Wits.",
        "Without Blush of Life, food and drink make them vomit and must make a Composure + Stamina against Difficulty 3 to find a safe place to vomit."
      ],
      torporLength: "Two week"
    },
    6: {
      description:
        "Those at this level are not horrific monsters, but will still do what they need to survive regardless if they must kill someone for it.",
      effects: [
        "Rules work similar to that above unless otherwise noted.",
        "Take a one die penalty to the pool for faking sexual intercourse.",
        "Even with Blush of Life, they must make a Composure + Stamina test against Difficulty 3 to keep food and drink down for one hour."
      ],
      torporLength: "One month"
    },
    5: {
      description:
        "At this level most Kindred only care for their Touchstones, and may manifest some minor physical eeriness or malformation.",
      effects: [
        "Rules work similar to that above unless otherwise noted.",
        "Take a one die penalty in rolls to interact with mortals. This applies to most Social dice pools, including insight, persuasion, and when interacting with Touchstones, but not to intimidation, hunting or killing a human, and supernatural Subterfuge (Seduction). The penalty also applies to creating art or other humanities such as poetry.",
        "Take a two dice penalty to the pool for faking sexual intercourse."
      ],
      torporLength: "One year"
    },
    4: {
      description:
        "At this level Kindred might have accepted the inevitable downwards spiral, seeing killing as acceptable and other normal social taboos are acceptable. Physically they've begun to appear more deathly up to even appearing corpse-like.",
      effects: [
        "Rules work similar to that above unless otherwise noted.",
        "Take a two dice penalty to interact with mortals.",
        "Even with Blush of Life, they can no longer keep food and drink down."
      ],
      torporLength: "One decade"
    },
    3: {
      description:
        "Scrapping near the bottom they take the safe route, the pragmatic route, whatever it takes to keep them safe.",
      effects: [
        "Rules work similar to that above unless otherwise noted.",
        "Take a four dice penalty to interact with mortals.",
        "They can no longer fake sexual intercourse."
      ],
      torporLength: "Five decades"
    },
    2: {
      description:
        "With twisted hobbies that please only them, Kindred at this level have no care for others.",
      effects: [
        "Rules work similar to that above unless otherwise noted.",
        "Take a six dice penalty to interact with mortals, but if using Blush of Life the penalty becomes four dice."
      ],
      torporLength: "One century"
    },
    1: {
      description:
        "Teetering on the edge, they only care for their survival with even their own desires becoming nonexistent.",
      effects: [
        "Rules work similar to that above unless otherwise noted.",
        "Take an eight dice penalty on rolls to interact with mortals, but if using Blush of Life the penalty becomes five dice."
      ],
      torporLength: "Five centuries"
    },
    0: {
      description:
        "The Beast has taken control; leaving the character in a final Rötschreck Frenzy called Wassail with their Physical Attributes all buffed to 5. If they survive this final scene, they become a wight and are taken control of by the Storyteller as a SPC.",
      effects: []
    }
  }
};

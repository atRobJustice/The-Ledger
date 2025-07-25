export const celerity = {
  name: "Celerity",
  nicknames: ["Bolting", "Slipping", "Velocitas"],
  affinity: ["Banu Haqim", "Brujah", "Toreador"],
  type: "Physical",
  threat: "Medium to High",
  resonance: "Choleric",
  overview: "Celerity allows the kindred to defy the constraints of the human body. Dodging, running and general movements outside of the natural ability come easily when using these powers. With this, kindred become even stronger predators or strategists, able to make moves or think faster than most can.",
  powers: {
    level1: [
      {
        name: "Cat's Grace",
        effect: "Automatically pass balance tests",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Does not work on objects that cannot support their weight",
        source: "Vampire: The Masquerade Corebook, page 252"
      },
      {
        name: "Fluent Swiftness",
        effect: "Reroll Blood Surge on a Dexterity or Celerity test",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Once",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "N/A",
        source: "Gehenna War, page 46"
      },
      {
        name: "Rapid Reflexes",
        effect: "Faster reactions and minor actions",
        cost: "Free",
        prerequisite: "None",
        amalgam: "No",
        duration: "Passive",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power also prevents them from taking a penalty when they have no cover during a firefight",
        source: "Vampire: The Masquerade Corebook, page 253"
      }
    ],
    level2: [
      {
        name: "Fleetness",
        effect: "Add Celerity rating for non-combat Dexterity test or defending",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This may be used once per turn when defending with associated pools",
        source: "Vampire: The Masquerade Corebook, page 253"
      },
      {
        name: "Rush Job",
        effect: "Perform a Skill-related task that would take a long time in mere seconds",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This power does not speed up attacks or defenses",
        source: "Vampire: The Masquerade Players Guide, page 72"
      }
    ],
    level3: [
      {
        name: "Blink",
        effect: "Closes the distance as if teleporting",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Dexterity + Athletics",
        opposingPool: "N/A",
        notes: "The user moves in a straight line and may need to make checks against difficult terrain",
        source: "Vampire: The Masquerade Corebook, page 253"
      },
      {
        name: "Traversal",
        effect: "Move fast enough to move up vertical surfaces or liquid surfaces",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One turn",
        dicePool: "Dexterity + Athletics",
        opposingPool: "N/A",
        notes: "The Storyteller should inform the user beforehand if the target is too far away",
        source: "Vampire: The Masquerade Corebook, page 253"
      },
      {
        name: "Weaving",
        effect: "Remove the penalty from dodging multiple ranged opponents",
        cost: "One Rouse Check",
        prerequisite: "Rapid Reflexes",
        amalgam: "No",
        duration: "One scene",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The user can all add their Celerity rating to ranged dodging attempts",
        source: "Vampire: The Masquerade Players Guide, page 72"
      }
    ],
    level4: [
      {
        name: "Blurred Momentum",
        effect: "Attacks against the user with fewer successes than their Celerity rating miss",
        cost: "One Rouse Check per turn",
        prerequisite: "None",
        amalgam: "No",
        duration: "Until the user lets it lapse",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "This works against powers that do not allow defense tests",
        source: "Vampire: The Masquerade Players Guide, page 72"
      },
      {
        name: "Draught of Elegance",
        effect: "Turn their vitae into a Celerity boost for others",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One Night; for drinkers until the vampire's next feeding or Hunger 5",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Each drinker must take one Rouse Checks worth",
        source: "Vampire: The Masquerade Corebook, page 254"
      },
      {
        name: "Unerring Aim",
        effect: "The world slows down to a crawl",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "Auspex ●●",
        duration: "A single attack",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Those with Celerity 5 may nullify this power with a Rouse Check and defend",
        source: "Vampire: The Masquerade Corebook, page 254"
      },
      {
        name: "Unseen Strike",
        effect: "Disappear then reappear to surprise attack an enemy",
        cost: "Two Rouse Checks",
        prerequisite: "Blink",
        amalgam: "Obfuscate ●●●●",
        duration: "One turn",
        dicePool: "Dexterity + Celerity",
        opposingPool: "Wits + Awareness",
        notes: "If the test is won, the attack is treated as a surprise attack. Else it follows the same attack/movement rules as Blink",
        source: "Vampire: The Masquerade Players Guide, page 73"
      }
    ],
    level5: [
      {
        name: "Lightning Strike",
        effect: "Attack with lightning speed",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "A single attack",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "Those with Celerity 5 may nullify this power with a Rouse Check and defend",
        source: "Vampire: The Masquerade Corebook, page 254"
      },
      {
        name: "Split Second",
        effect: "Alter the events given by Storyteller in a current scene within reason",
        cost: "One Rouse Check",
        prerequisite: "None",
        amalgam: "No",
        duration: "One action, as determined by ST",
        dicePool: "N/A",
        opposingPool: "N/A",
        notes: "The action should be reasonable and accomplished within a few seconds in real-time",
        source: "Vampire: The Masquerade Corebook, page 254"
      }
    ]
  }
}; 
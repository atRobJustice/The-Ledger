export const gangrel = {
  name: "Gangrel",
  nicknames: ["The Clan of the Beast", "Animals", "Ferals", "Barbarians", "Outcasts", "Wolves", "Strays"],
  disciplines: ["Animalism", "Fortitude", "Protean"],
  bane: {
    name: "Bestial Features",
    description: "In Frenzy, Gangrel gains animalistic features equal to their Bane Severity. These features last for one more night afterward, each feature reducing one Attribute by 1 point. The Gangrel may choose to Ride the Wave in order to only have one feature manifest and only lose one Attribute point."
  },
  variantBane: {
    name: "Survival Instincts",
    description: "Subtract dice equal to the Bane Severity in any roll to resist fear Frenzy. The pool cannot be below one die."
  },
  compulsion: {
    name: "Feral Impulses",
    description: "Unleash the animal hidden in their Blood. This urges the Gangrel to regress into an animalistic state where speech becomes difficult, clothes become too constrictive and arguments and best settled with claws and teeth. For one scene the Gangrel suffers a -3 dice penalty to all rolls involving Manipulation and Intelligence as they are only able to speak one word sentences during this Compulsion."
  },
  background: {
    description: "Often closer to beasts than other vampires, and so the Gangrel style themselves apex predators. These Ferals prowl the wilds as easily as the urban jungle, and no clan of vampires can match their ability to endure, survive, and thrive in any environment. Often fiercely territorial, their shapeshifting abilities even give the undead pause.",
    culture: "Gangrels are generally embraced from prospects who show the ability to survive and fighters. Due to this their customs encourage fights for dominance but not to final death as they push for a culture of healthy rivalry rather than taking competition personally. They are usually the outcasts of Kindred society, learning to live in undesirable areas and yet thrive without bending the knee to a Prince or Baron. Gangrels tend to care less about appearances and status than they do about action and accomplishments."
  },
  disciplines: {
    animalism: "Gives the Gangrel the ability to make an animal their companion.",
    fortitude: "Allows them to live their desires by traversing harsh landscapes or absorbing a rain of bullets.",
    protean: "Is something they are known to have mastery over. Giving them the ability to shape their body into that of something animalistic."
  },
  archetypes: {
    uncagedJailbird: "Imprisoned for most of their lives, they hold a jaded perspective and an issue with authority. Still, they survive from the desperate taste of freedom they've been given finally.",
    storyteller: "One way to make friends is by telling tales of fantastical stories, be it of their own experiences or made entirely of fiction. Whether within a tent city or a convention, they are great socialists and make friends easily as they recall their tales.",
    businessFirst: "Maybe they were stolen from a Ventrue, or maybe clans aren't defined by a stereotype. Their animalistic tendencies make them great at haggling deals and scaring smaller companies into selling.",
    veterinarian: "Their bond with animals has pushed them into the associated medical field, though they still aren't fond of mortals, they are happy to help animals in need."
  },
  notableCharacters: {
    rudi: {
      description: "An Anarch Representative for the oppressed minorities in Kindred society as well as mortal.",
      location: "Copenhagen",
      role: "Stands up for Gangrel kicked out, stands up for woman Kindred run by misogynistic elders and encourages progressive norms over tradition."
    },
    xaviar: {
      description: "Marched into a Camarilla assembly in order to gain attention to his claims about having interacted with one of the Antediluvians where his entire coterie is eaten alive.",
      history: "He accused the tower of being deceitful and cast aside his roll of Gangrel Justicar, over time his actions spread and the Gangrel departed from the Camarilla with some becoming Autarkis and the rest joining the Anarchs. This Kindred was eventually slain and the culprit is still unknown, but all Gangrel know he was wronged."
    },
    markDecker: {
      description: "Prince of Milwaukee who runs his domain like a police state.",
      policies: "After attacks from Sabbat and werewolves, the Brujah and Gangrel defection from the Tower, and the threat of the Second Inquisition, he has tightly closed off his Domain controlling who comes and goes. The Gangrel maintains draconian rules with a strict no Anarch policy, his own harshly enforced set of rules, and keeps eyes on all corners of his domain via tech and animal. He considers this all necessary for the war Kindred face."
    },
    reyMalcolm: {
      description: "A temperamental corporate Gangrel who wants to regain what he lost and is constantly at war with his inner beast.",
      currentStatus: "Currently trying to claw back to the top in the Bronx."
    },
    ramona: {
      description: "A loner Gangrel who aids the Vamily in their early exploits.",
      abilities: "The leader of a pack of ghouled rats, she uses them as her eyes and ears, on occasion messenger.",
      location: "Griffith College"
    }
  },
  culture: {
    embrace: {
      description: "The clan of Gangrel often embrace those who are outsiders, independent hunters, and any one with wanderlust literal or figurative.",
      criteria: [
        "Those with the urge to fight or survive regardless of their environment",
        "Those who go out bravely into the world and don't care about the odds against them",
        "Businessmen, explorers, rogues, gamblers",
        "Those who have achieved something notable"
      ],
      approach: "When it comes to the ideal childe, their beauty and rank typically mean little, most Gangrel sires want to see what their potential childe has achieved."
    },
    mortalSociety: {
      description: "The Gangrel is a perfect manifestation of their culture and beast, stuck between literal beast and Kindred, never trapped in one place or form.",
      packBehavior: "Some even take on the aggressive and territorial aspects of animals. How this translates to Gangrel and humans relations is with some Ferals taking humans and considering them their 'pack.' The Gangrel will sometimes establish their dominance and cow their pack into line while taking a form of ownership. Many do not feed on their own and look down on those who 'weaken their pack,' preferring to use them for services or even companions."
    },
    kindredSociety: {
      description: "The Gangrel are marked with a culture of individualism and wander.",
      behavior: "Some often travel through domains and cities, crossing borders and city lines as they collect different stories, histories, or adventures. Though they are known to meet around campfires with their clanmates to regal in their adventures they are also prone to the need to establish pecking order, the clan has a culture of friendly rivalry where strength is respected."
    },
    factionalDifferences: {
      description: "They have less faction differences than other clans.",
      history: "Stereotyped as the loyal dog of the clans, the Gangrel filled the roles of bodyguards, enforcers, and hunters. Many of the clan left the Camarilla when they felt taken advantage of, but not all Gangrel went Anarch.",
      currentStatus: "Whether a Camarilla or Anarch, when a Gangrel arrives to a domain many are reluctant to ask them to leave as fighting is usually the only way to get the Gangrel to leave. This has opened a chance for Ferals to work as mercenaries on their travels from domain to domain."
    }
  },
  exclusiveLoresheets: [
    "Low Clan",
    "Descendant of Xaviar",
    "Mark Decker"
  ]
}; 
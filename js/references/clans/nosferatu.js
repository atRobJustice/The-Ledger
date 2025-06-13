export const nosferatu = {
  name: "Nosferatu",
  nicknames: ["The Clan of the Hidden", "Horrors", "Sewer Rats", "Lepers", "Hives", "Scabs", "Vagrants", "Orloks"],
  disciplines: ["Animalism", "Obfuscate", "Potence"],
  bane: {
    name: "Repulsiveness",
    description: "Cursed by their blood, when they are Embraced they are twisted into revolting monsters. They can never raise their rating in the Looks merits and instead must take the (••) Repulsive flaw. Any attempt to disguise themselves incurs a penalty equal to the character's Bane Severity, this also includes the use of Disciplines such as Mask of a Thousand Faces. However, most Nosferatu do not breach the Masquerade by being seen, they are instead perceived as gross or terrifying."
  },
  variantBane: {
    name: "Infestation",
    description: "The Haven of a Nosferatu is always infested with vermin, any attempt to do something that requires concentration takes a two plus Bane Severity penalty, as well as the same penalty to social tests at ST discretion. Additionally, when a Nosferatu spends a scene at an enclosed location, the vermin appears and causes the same penalty though reduced to equal only the Bane Severity. Any attempt to control these vermin with Animalism is done at a penalty equal to Bane Severity."
  },
  compulsion: {
    name: "Cryptophilia",
    description: "Consumed by a hunger for private secrets, the Nosferatu seeks to obtain knowledge no matter big or small as long as it's not a well-known bit of information. During this, they also refuse to give up their secrets except in strict trade for something greater than their own. Any action not actively working towards gaining them a secret they take a two-dice penalty. This Compulsion does not end till they learn a secret they deem to be useful, sharing this secret is entirely optional."
  },
  background: {
    description: "The Nosferatu wear their curse on the outside. Their bodies horribly twisted and deformed through the Embrace, they lurk on the fringes of most cities, acting as spies and brokers of information. Using animals and their own supernatural capacity to hide, nothing escapes the eyes of the so-called Sewer Rats.",
    embrace: "Their Embrace is one of the most painful, twisting and deforming their body into something else forever to be stuck as a monster. The entire transformation process can take weeks and result in deformities similar to birth defects, growths, severe injuries, or, sores; leaving the unlucky as hideous monsters or normal looking humans with conditions.",
    nature: "Regardless of their monstrous appearance, they are often some of the most compassionate kindred from wearing their curse on the outside rather than inside. To blend in some will use their abilities within Obfuscate or heavy make-up and prosthetics."
  },
  disciplines: {
    animalism: "Serves a purpose as a way to increase the Nosferatu's reach with spying, as well as sending swarms to attack their opponents. It also assists the Sewer Rats with feeding as it's easier and arguably more ethical to summon and drain an animal than stalk a mortal to feed from.",
    obfuscate: "Has mixed opinions in the clan as some are proud of their ghastly appearance. Regardless of the controversy, it is an exceptional tool when feeding.",
    potence: "Is a valuable tool in rapidly neutralizing foes in their path. Being able to hit and run a vessel for blood or incapacitate a pursuing enemy as they flee. Many Scabs will think twice before using it in front of mortals as it may expose their deceptions."
  },
  archetypes: {
    privateInvestigator: "While their looks won't bring anyone to the door, their ability to gather information has turned more than one head. In life, they might have once been a gumshoe and now continue their profession from the shadows.",
    undergroundDweller: "Once they lost everything in life they went underground, living with the rats in the dust and debris left behind. Here they've made their home, only surfacing when required and otherwise plotting their schemes from the safety of the warrens.",
    cleopatra: "Once upon a time they were a rising star or one snuffed out too early. Beautiful beyond compare and that invoked the rage of someone without, embracing them to strip everything from them. Now they walk the city with a face that no one could love like they once did.",
    techSpecialist: "Their unappealing presence might deter some, but others know that if you ever need a phone cracked or a server hacked, they are the person to reach out to."
  },
  notableCharacters: {
    zelios: {
      description: "A great architect, mason and master planner of the clan, he disappeared beneath New York in the 90's. Left behind were only his libraries, plans and treatises regarding the power location and sacred geometry."
    },
    ambrusMaropis: {
      description: "His reputation as a trend-setter and Masquerade protector is well-known in Kindred society. With a reputation of being on the cutting edge of technology and culture, the Toreador that know he's a Nosferatu loathe him. His persona allows him to sell software he hacks into including the information, advise on security methods stolen from governments or corporations or simply talk about upcoming trends in Elysia."
    },
    nathanielBordruff: {
      description: "A former vampire hunter turned Nosferatu who harbored his hatred for kindred society throughout the centuries. He served high profile kindred in Chicago gaining influence, while secretly subverting attempts to confound the Second Inquisition. His end goal is death to all kindred society."
    },
    wauneka: {
      description: "A Vietnam veteran turned information broker, Wauneka has a reputation for protecting the vulnerable in the urban centers of Chicago. While not as technologically savvy as other nosferatu his old school spy skills prove effective in Chicago especially with his street family acting as his eyes and ears."
    },
    jasperHeartwood: {
      description: "An reserved Kindred with talents in stealth and physical prowess, he had lost much transition from kine to Kindred. Formerly a recluse in the LA area as the story unfolds in LA by Night where he is shown to be a major asset to his coterie having a humane side and plenty of dark secrets."
    },
    khalidAlRashid: {
      description: "A well-respected Chicago primogen and master swordsman. An elder of the clan who had long searched for a way to win the battle with his Beast, but he never quite reach Golconda. Even when Chicago was dominated by Menele's and Helena's war, he proved stealthy enough to avoid falling under eithers sway. He may have found a deep secret, but has long since disappeared or may have met final death. His disappearance is not widely known as a younger clanmate impersonates him to keep the Clan stable in Chicago."
    }
  },
  culture: {
    embrace: {
      description: "The Nosferatu embrace many different steps of life, typically ones they find of use. The clan has a diversity of needs in these nights.",
      transformation: "The Embrace into the clan is like no other, their transformation isn't done in one instance, but slowly over time. A young fledgling may be subjected to the horror of their flesh slowly breaking out in pussing pox, their bones twisting, or tissue lumping in to growths. At the end of their transformation they take on some physical manifestation of their curse.",
      criteria: [
        "Tech crowd and physical archivists",
        "Those with inquisitive minds",
        "Law enforcement, academics, sleuths",
        "Criminals and survivalists"
      ]
    },
    mortalSociety: {
      description: "Due to their curse, it is hard for Nosferatu to mingle with mortals. However, they usually find ways to blend in with humans outcasts and humans with medical conditions.",
      approaches: [
        "Using Obfuscate or physical masks",
        "Hunting prey from the shadows",
        "Building rapport with social outcasts",
        "Creating unhealthy codependencies"
      ]
    },
    kindredSociety: {
      description: "The Nosferatu are known as clan of secrets, subterfuge and spies. Many Elysia have Nosferatu appearing either wearing their curse with grotesque pride or appear in beautiful masks.",
      schrecknet: "They were the original architects of SchreckNET, a former online hub for Kindred to post information and such. When members of the Second Inquisition compromised the servers, this caused a crisis among Kindred.",
      currentStatus: "With the loss of the Gangrel and Brujah, the Camarilla had to turn to the Nosferatu for their strength. Enforcers, hunters, and spies all fit perfectly for a Sewer Rat trying to advance these nights."
    },
    factionalDifferences: {
      camarilla: "The clan has done much to throw in with the Camarilla. The Betrayal of the Brujah is a big indicator of this. This is because many of the clan thinks the Camarilla's adherence to the Masquerade and being completely hidden is a major benefit to the clan.",
      anarch: "Anarch Nosferatu are called Red Nosferatu, and what the Camarilla Lepers mockingly call their clanmates for their 'mini revolution'. The Nosferatu who become Red Nosferatu do so from being tired of being at the bottom and hiding in the shadows of a sect."
    }
  },
  exclusiveLoresheets: [
    "Descendant of Zelios",
    "Cleopatras",
    "London under London",
    "The Nictuku"
  ]
}; 
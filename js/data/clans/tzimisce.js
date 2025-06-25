export const tzimisce = {
  name: "Tzimisce",
  nicknames: ["Dragons", "The Old Clan", "Voivodes", "Stokers"],
  disciplines: ["Animalism", "Dominate", "Protean"],
  bane: {
    name: "Grounded",
    description: "Each Tzimisce must select a specific charge, be it physical location, a group of people, or something even more esoteric. Each night they must sleep surrounded by their charge, if they do not, they sustain aggravated Willpower damage equal to their Bane Severity upon waking the following night."
  },
  variantBane: {
    name: "Cursed Courtesy",
    description: "If they wish to enter a place of residence uninvited they must spend Willpower equal to their Bane Severity, this penalty also applies to their Discipline pools while they are there. The invitation inside can only be made by someone who lives there and this does not occur in uninhabited homes or public places. Tzimisce with this Bane cannot take the uninvited Folkloric Block."
  },
  compulsion: {
    name: "Covetousness",
    description: "When afflicted with this compulsion they become obsessed with owning something in the scene, be it an object, or property to a living person. Whatever it is, they must add it to their collection and any action taken not towards this purpose incurs a two-dice penalty. This penalty continues until ownership is established or the object of their desire is unobtainable."
  },
  background: {
    description: "The dragons view ownership above all, they aim to conquer and rule the subject of their possessiveness. Traditionally their charges were based on geographical locations, hence the stereotype of a vampire in a looming castle. However, in the modern age, the younger generations have taken a more loose approach, staking claim over mortals rather than their land.",
    currentStatus: "Their desire to own is only limited by their lack of expansion, but once they've sunk their claws in they are hard to shake loose. With the Sabbat shattered, others are wary of them and their cunning abilities. With the elders controlling so much, many younger members are driven from the Black Hand and towards the Anarchs to redefine themselves and their charges. A few Tzimisce find comfort within the Camarilla, finding a familiar comfort in its neo-feudalism even if the tower itself has little love for them."
  },
  disciplines: {
    animalism: "Allows them to extend their oneness with their domain, as well as extend their command over the lesser beasts in their territory.",
    dominate: "Enables them to enforce their edicts through mental force.",
    protean: "Has its purpose beyond changing into animal shape. Growing alongside their ability to Dominate they unlock their ability to use Vicissitude."
  },
  archetypes: {
    landlord: "The extension of their charge reaches into the property they own as slum apartments with tenants that they bleed dry in more than one way.",
    gangLeader: "Where the older seek to control locations, this Tzimisce controls a group, using the underground criminal world to maintain hold over their charges within the ranks beneath them.",
    babyDragon: "A younger Tzimisce still learning the ways to survive the nights, but their sire controls their moves, watching over them and claiming them as their own territory.",
    plasticSurgeon: "Their skills as a mortal reconstructing faces has caught the attention of an older Tzimisce, embracing them to show them the future of facial reconstruction at a cost."
  },
  notableCharacters: {
    theDracon: {
      description: "An Elder of the clan and one of the legendary triumvirates coterie known as the Trinity. The three vampires lead the antiquated city of Constantinople being both coterie-mates and lovers.",
      status: "In the end, he was only one to survive the fall of great vampire city. He was the spiritual guide the Trinity, his work remains well known by those who still believe in the Dream of Constantinople, many hope he one day returns to Kindred society."
    },
    mayumiShibasaki: "A Camarilla-aligned corporate power house and one of the most influential Kindred in Tokyo. While not technically in charge, she does use her clout to keep order in the domain."
  },
  culture: {
    embrace: {
      description: "To many sires the Embrace is an act of ownership, seeing their childe in a traditional sire-childe relationship of old, some even go as far as consider their childers property.",
      practices: "Some will jealously guard their childe so much they would rather see them destroyed then fall into the hands of others. The Dragon's candidate for embrace can be as varied as their supernatural charges."
    },
    humanSociety: {
      description: "The Tzimisce are characterized with charges, something that the Dragon is driven to claim ownership over and even jealousy hoard.",
      traditionalApproach: "In elder Tzimisce, this usually fell into geographic regions or geographic people. The image of a castle in disrepair looming over their claimed land is the usual image many think of when it comes to old Dragons.",
      modernApproach: "For the younger Tzimisce they can have more conceptual claims for their charges: cults, companies, gangs, even military units.",
      servitors: {
        description: "The most infamous servants of the Tzimisce are the servitor ghouls, szlachta and vozhd.",
        szlachta: "Inhuman ghouls with extreme loyalty.",
        vozhd: "Relics of the past, stitching of dozens of szlachta with Vicissitude and Blood Sorcery to create living war machines absent of thought but infinitely ravenous."
      }
    },
    kindredSociety: {
      description: "Masters of their surroundings, charges, and even their own bodies, the Tzimisce are marked with their knack for Vicissitude.",
      vicissitude: "This allows them to circumvent the Curse of Caine allowing them to change their form to their liking. Legends say this stems from the clan rejecting the limitation of Protean animal forms in the old days, pushing themselves to develop their unique art.",
      rivalries: "A major trait about the Tzimisce is their notorious vice of grudge bearing, said to even exceed that of Toreador Vendettas. The clan has a longstanding rivalry with the Tremere, Nosferatu, and Gangrel."
    },
    kolduny: {
      description: "Some Tzimisce may start with Blood Sorcery and practice it. This type of blood sorcery is called a koldunic sorcery practiced by a koldun.",
      practices: "Many kolduny consider themselves the oldest and best blood sorcerers long before the other clans. They practice a form of blood sorcery that thralls an element so they may perceive through it and build more Blood Sorcery Rituals allowing them control their chosen elements.",
      elements: "Each level they choose an element from air, water, fire, or earth to supposedly form a blood bond with so they may command it. Their preferred rituals are those that exert control on people or property."
    }
  },
  factionalDifferences: {
    sabbat: {
      title: "Tzimisce antitribu",
      description: "This is where many of the older members of the clan still reside in the night. The Dragon's hatred for elders is notorious, so much so they participated in the first Anarch Revolt and helped found the Sabbat.",
      mindset: "Still in a medieval mindset fixated on destroying the followers of their despised ancients. They are stereotyped to possessing some of the more traditional trappings of the clan."
    },
    anarch: {
      description: "Anarch Tzimisce does not take a new title, but acknowledge their clan. They grow tired of their hypocritical sires and elders who take up all the good resources and domains of the night.",
      goals: "They are equally tired of their sires treating them as mere property. The young Tzimisce strive to redefine themselves by what they rule over. They set out to found their own holdings and be their own masters in the night."
    },
    camarilla: {
      description: "Some Tzimisce overfond of tradition find the neofeudalism of the Camarilla attractive.",
      challenges: "A rare group they are at odds with the distrust the Tower has for their greed and the Tzimisce question if their personal investment will yield returns."
    }
  }
}; 
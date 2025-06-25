export const lasombra = {
  name: "Lasombra",
  nicknames: ["The Night Clan", "Magisters", "Keepers", "Shadows", "Abyss Mystics", "Turncoats", "Traitors"],
  disciplines: ["Dominate", "Oblivion", "Potence"],
  bane: {
    name: "Distorted Image",
    description: "In reflections or recordings (live or not) the Lasombra appear to be distorted; those who know what vampires are know precisely what's going on, while others might be confused but know something is wrong. This does not however, hide their identity with any certainty and they are not likely to be caught more often on surveillance than any other Kindred. In addition to this, modern technology which includes making a phone call requires a Technology test at Difficulty 2 + Bane Severity as microphones struggle with them as much as cameras. Avoiding any electronic vampire detection system is also done with a penalty equal to their Bane Severity."
  },
  variantBane: {
    name: "Callousness",
    description: "Whenever making a Remorse test remove a number of dice equal to the Bane Severity. The dice pool cannot be reduced below 1."
  },
  compulsion: {
    name: "Ruthlessness",
    description: "The next time the vampire fails an action they receive a two-dice penalty to all rolls until a future attempt at the same action succeeds. This penalty applies to future attempts of the same action still."
  },
  background: {
    description: "Creatures subtly at odds with mundane reality, Lasombra vampires are expected to triumph at any cost. Ruthlessness is a sought-after trait in progeny, making their reputation as betraying interlopers well deserved. Most do not seek attention, preferring to act as puppeteers, powers behind the proverbial throne. To a Shadow, the ends justify any means.",
    embrace: {
      description: "The Lasombra rarely have time for the weak, with a perspective that the only way to survive is to excel. Sympathy and morality do nothing but weigh them down and prevent their inevitable climb to power.",
      criteria: [
        "Those who fought against the odds and came out on top",
        "Those who survive dangerous situations",
        "Those who exemplify excellence",
        "Sociopaths, deviants, or other scarred survivors",
        "Religious officials who use their office for power and control"
      ]
    }
  },
  disciplines: {
    dominate: "The reason they are able to crush wills and command obedience, they will without hesitation use this power to feed.",
    oblivion: "Enriches their Blood and allows them to manipulate and control shadows around them.",
    potence: "The reason some Kindred are able to display such feats of strength unseen by man, however they do not generally use this to feed, instead using it to crush their enemies in demands of respect."
  },
  archetypes: {
    religiousParasite: "Through their congregation they grow their power, hiding behind the faithful they sway the true believers to elevate themself onto a pedestal.",
    ambitiousWinner: "This winner at life strived in every sport and won, determined and able enough to take down anyone that opposed them. This translated into their unlife, even if they truly aren't the brightest their ambition keeps them at the head of the pack."
  },
  notableCharacters: {
    montano: {
      description: "With the clan having shifted towards the Camarilla in the modern night they now sing his praises. Some claim that it was by his will that Christianity rose to its prominence.",
      history: "When the vampire society originally split, he was one of the few to not abandon the newly formed Camarilla and join the Sabbat."
    },
    talley: {
      description: "The cold, professional hitman and former high ranking Sabbat member possesses mastery of Oblivion.",
      currentStatus: "Though he usually resides in Washington DC defending major Lasombra powerbases. Soon the elders of the clan approached him with a special job. The brutal Shadow began to work on facilitating the Lasombra's entry into the Chicago Camarilla. In this efforts, he is said to have defeated Lucita in battle and brought her final death."
    },
    lucita: {
      description: "Lasombra Antitribu, and Archbishop of Madrid and follower of the Path of Night, a variant of the Path of Cathari.",
      history: "The once-rival and lover of Fatima, Lucita is high profile Sabbat member who still uses her human name; Madrid was usually her domain, but it is now contested with the Camarilla. it is said Talley succeeded in killing the Archbishop, but her pack of over a hundred is still being directed in Spain."
    },
    sierra: {
      description: "Childe of Talley, her strong skills as a negotiator and businessperson person impressed Talley, as did her calm in cleaning a murder scene.",
      history: "Even during her tenure as antitribu, she showed restraint rather than follow other Lasombra in degeneration, increasing her resources and influence. Even while bound to a pack, she still showed loyalty to her sire and the Amici Noctis. For this she and her brother-in-vitae were eventually selected for the Lasombra delegation to Chicago Camarilla. With this offer on the table she sent her pack on a suicide mission so she can be free pursue her new duties as ambassador."
    },
    malenkov: {
      description: "Childe of Talley and war hero of the Sabbat for his service in the Sect war.",
      background: "A survivalist to the core he had long fought to survive and succeed. His years of wars and bloodlust had slide him dangerously close to Wassail for ages even with the path system. He thought he would meet his end in the Gehenna war, but instead Talley has selected him and Sierra, his sister-in-vitae, to act as envoys to the Chicago Camarilla."
    }
  },
  culture: {
    embrace: {
      description: "The Lasombra prefer to Embrace those that beat the odds. The people who survive dangerous situations, dire odds, and sit at the top at a level of success.",
      criteria: [
        "Those who beat the odds",
        "Those who survive dangerous situations",
        "Those who sit at the top of success",
        "Counter-culturalists, deviants, and scarred survivors",
        "Corrupt religious officials who use their office for power and control"
      ]
    },
    mortalSociety: {
      church: {
        description: "The Lasombra most infamous realm of influence is the Church. Many younger members may not know or have yet adopted the religious strategy, but the Clan of Night's method is effective.",
        influence: "They can't elect a pope, or influence body wide doctrine, but they can access secret Vatican files, have religious institutions work as their eyes and ears, or even manipulate a religious body at a regional level.",
        uses: [
          "Havens where the Lasombra sleeps underneath during the day",
          "Congregations can be turned into a herd of blood dolls",
          "Turning priests into retainers to serve the Keeper's will"
        ]
      },
      otherFields: "Not all Lasombra are drawn to the Church; there are some that occupied other realms, media field is an example. As long as the Lasombra feels they are able to court influence and eventually triumph to prove their superiority they will go that path of power."
    },
    kindredSociety: {
      camarilla: {
        description: "Due to the devolution of the Sabbat and the elders of the clan realizing they were threatened by the Sabbat crusade, the main body of the clan made political motions to the Camarilla for admittance.",
        entryCosts: [
          "Moratorium for Lasombra to be able to hold titles",
          "Limit the number of Keepers",
          "Blood Bond",
          "Sacrifice of an elder Sabbat member"
        ],
        currentStatus: "The clan is seen to have fickle loyalties now by Kindred, but the Shadows are willing to prove their worth as ruthless strategists."
      },
      coteries: {
        description: "In coteries, the Lasombra are known to be ruthlessly efficient. They will generally not take half-measures in their drive for success.",
        approach: "Most Lasombra see a coterie as a tool, a means to drive success. Success brings rewards, while failure gives experience and growth.",
        reputation: "Though Lasombra are still newcomers to the sect, embellished stories of Keepers backstabbing and sacrificing coterie members float around making others keep a wary eye on these Kindred."
      }
    },
    amiciNoctis: {
      description: "The Friends of the Night in English. This group is of clan legend, the Lasombra's inner council of vampires chosen from the most capable for clan interests above all.",
      role: "Traditionally they are a stabilizing force banning in-clan assassination, diablerie, or power grabs without them sanctioning such actions.",
      membership: "The seats are said to be filled with Lasombra of various ages. The only stipulation to be a member is to provide evidence of overcoming hostile circumstances.",
      currentStatus: "They are the ones to use their influence to change the clan's sects and use their devoted agents, such as Talley, to act as envoys to Camarilla princes and assassins to resist Lasombra."
    },
    factionalDifferences: {
      camarilla: "The Camarilla Lasombra are members of the clan who have gone along with the agenda of the Amici Noctis to change sides. Some may have changed their side based on new opportunities or the degeneration of the Sabbat.",
      anarchs: "Many Lasombra turn their noses up at the Anarchs, they want to be free of their elders control but want to rule a hierarchy not get rid of it. They would rather throw in the with High Clans than go Anarch and 'lay with the dogs.'",
      sabbat: "About half the clan remain in the Sabbat. Like other members in modern nights they want to transcend the trappings of clans, they call themselves Lasombra antitribu. They are thought to be degenerates the clan broke from. Once the heart of the Sabbat, many Sabbat regard the Lasombra with disdain and suspicion now."
    }
  },
  exclusiveLoresheets: [
    "Descendant of Montano"
  ]
}; 
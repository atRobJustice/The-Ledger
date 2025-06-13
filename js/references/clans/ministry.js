export const ministry = {
  name: "The Ministry",
  nicknames: ["The Clan of Faith", "Setites", "Followers of Set", "The Clan of Lies", "Typhonists", "Serpents", "Liberators", "Judasians"],
  disciplines: ["Protean", "Obfuscate", "Presence"],
  bane: {
    name: "Abhors the Light",
    description: "When a Minister is exposed to direct illumination, be it naturally caused or artificial, they receive a penalty equal to their Bane Severity to all dice pools while subject to the light. They also add their Bane Severity to Aggravated damage taken from sunlight."
  },
  variantBane: {
    name: "Cold-Blooded",
    description: "They can only use Blush of Life if they have recently fed from a living vessel in the same scene or up to roughly an hour ago, Storytellers discretion. When they do so, it requires a number of Rouse Checks equal to their Bane Severity rather than just one."
  },
  compulsion: {
    name: "Transgression",
    description: "The Minister suffers a burning desire to influence those around them to shatter the chains of their own making. They suffer a two-dice penalty to all dice pools that do not relate to enticing someone or themselves to break a Chronicle or personal Conviction. The Compulsion ends once the Minister causes someone, or themselves, at least one stain."
  },
  background: {
    description: "The Ministry always has something to offer. This often cult-like clan recruits those able to employ temptation as a weapon. They Embrace those with the will and means to sway, entrap, and ultimately liberate their targets from whatever they seek: the victim's possessions, allegiance, or even faith. To the Serpents, everything has a price.",
    history: "The clan was formerly known as the Followers of Set. For as much as a cult as they are a clan, the majority of their members adhere to a disruptive system of beliefs. They are known as as a group of the devious type, tricksters, tempters and liars.",
    currentStatus: "Their entry into the Camarilla was rejected, leaving most to side up with the Anarchs. With the creed not forced upon their childer, that does not stop their lineage from influencing them and enticing them to gravitate towards the propensity for subterfuge and attraction."
  },
  disciplines: {
    protean: "Allows the minister to change their body's form, be it to extend their fangs or turn into an animal. They often take the form of a snake over a wolf.",
    obfuscate: "Is the reason Ministers are able to melt into shadows or vanish from plain sight. They use this power to discover the beliefs, creeds or other information of those around them to then later weaponize it against them.",
    presence: "When used by the Ministers is a powerful tool to both attract and repel their victims. Used in both swaying a large congregation towards their whim or finding a lone person in need of some help."
  },
  archetypes: {
    fraudster: "Their life of crime hasn't escaped them, their face is known to others to be one who will rip you off. Yet, each time they seek something they manage to slip it right from beneath their victims nose.",
    connivingArcheologist: "Archaeology is a field filled with money and to the Minister, breaking the will of collectors and conning museums is nothing but a passion project.",
    localOccultist: "To the mortal eye, they run a small occult shop filled with crystals and other trinkets. But behind closed doors much more sinister things occur.",
    theMouthpiece: "They believe they have heard Set or maybe it was something else, still they think of themselves like a prophet. Brought to this world to spread the good word and shed the shackles others cast on themselves."
  },
  notableCharacters: {
    heshaRuhadze: {
      description: "Rather than waste his focus on politics, Hesha dedicates his time to history and mysterious origins of vampires as well as their fates. He still sits in during the Anarch meets and listens attentively, however.",
      beliefs: "He believes himself a servant of the Blood and through that can understand the voice of Sutekh from calling his vitae. Because of his standing within Kindred society he is not marked as insane, instead it lends credence to his claims."
    },
    marcel: {
      description: "A war profiteering drug trafficker and gun runner in his mortal life for Algerian Independence, he almost died when the French secret service discovered his operations.",
      history: "His future sire was able to turn him and connect him to the heroin trade, based in Haiti, where he flourished. Then embraced, and left the Caribbean for Chicago, noting the power vacuum after Lodin's death.",
      currentStatus: "While not an official member of the Primogen he has worked his way as a sort of advisor and ambassador that many outsiders approach if they need access to court. Under the façade, he is playing the long game until his ambitions can be met."
    },
    reverendTwosret: {
      description: "Her full name is Sarah P. Donnadieu, and she is an orthodox Setite operating inside of Chicago.",
      background: "Originally a southern preacher she was embraced into the clan when it was still inherently linked to the worship of set. When the schism happened she balked at the thought of heretical Ministers and their reinterpretations of Set teachings.",
      currentStatus: "Thought to be fanatical even my her own clan standards she goes domain to domain to correct the heresy. She eyes Marcel as a fit for assassination as a message to other Ministers. She is currently indoctrinating and manipulating a young Nosferatu to this end."
    }
  },
  culture: {
    embrace: {
      description: "The clan is drawn to those who know their way around human desires and lies. Those who understand corruption, who understand how to handle scams or how to erode those of blinded belief.",
      criteria: [
        "Criminals, con artists and self-help gurus",
        "Skeptics or straight deniers of gods",
        "Hardline atheists, iconoclasts",
        "History professors, philosophers",
        "Seekers of truth"
      ]
    },
    mortalSociety: {
      description: "The kindred of the clan often mingle with human society masquerading among the ranks.",
      roles: [
        "Drug lords",
        "Club owners",
        "Pimps",
        "Counselors",
        "Movie executives",
        "Therapists"
      ],
      herdRelations: "Many Serpents don't see their herds or hunted vessels as family like some may or violently take their blood in the darkened alleyway. They typically look down on such heavy handed ways, thinking themselves better for being above such methods."
    },
    kindredSociety: {
      description: "Refused entry into the Camarilla 500 years ago. Now with the Gehenna War, Sabbat packs, and Beckoning in the Middle East, the Ministry decided it may be time to find allies.",
      organization: "Internally, the clan is organized around 'temples' with the larger cities holding multiple shrines. It is rare that these places are directly seen as places of worship, and instead are usually areas for privacy, discretion and convenience.",
      beliefs: "To some in the Ministry, the clan and their secret belief are joined even if their faith takes many different forms. Usually their faith encompasses a subtle alternative to or outright heresy against the other's belief system with its purpose to erode whatever faith remains."
    },
    factionalDifferences: {
      ministry: "Many Ministers are critical of their Orthodox Setites clan mates, especially the Egyptian styled ones to be outdated and stuck in the past. Stuck in actual temples and associated with mummies feels very much like they aren't able to keep up with the times.",
      orthodoxSetites: "The Setites in the Church of Set could be described as Autarkis, they are much more distant from the sects and factions. They regard the Ministry as frivolous, incorrigible children.",
      schism: "The more confusing aspect of this schism is the possibility of it all being manufactured and truly a rebranding. Ministers are just the front-facing politically active façade of the clan, while the Church can pursue its goals in the dark avoiding out of clan scrutiny."
    }
  },
  exclusiveLoresheets: [
    "Hesha Ruhadze"
  ]
}; 
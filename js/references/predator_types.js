const predatorTypes = {
  name: "Predator Types",
  description: "Each vampire has their preferred method of hunting, which affects their starting specializations, Disciplines, Merits and Flaws, as their experience hunting blood shapes their skillset.",
  types: {
    alleycat: {
      name: "Alleycat",
      description: "Those who find violence to be the quickest way to get what they want might gravitate towards this hunting style. Alleycats are a vampire who feeds by brute force and outright attack and feeds from whomever they can when they can.",
      dicePools: [
        "Strength + Brawl (take blood by force or threat)",
        "Wits + Streetwise (find criminals as if a vigilante figure)"
      ],
      benefits: [
        "Gain one specialty in either Intimidation (Stickups) or Brawl (Grappling)",
        "Gain one dot of either Celerity or Potence",
        "Gain three dots of Criminal Contacts"
      ],
      drawbacks: [
        "Lose one dot of Humanity"
      ],
      source: "Vampire: The Masquerade Corebook, page 175"
    },
    bagger: {
      name: "Bagger",
      description: "Kindred who take an approach most are unable to with their ability to consume preserved, defractionated or rancid blood through Iron Gullet, allowing them to feed from unusual sources such as blood bags or corpses.",
      dicePools: [
        "Intelligence + Streetwise (find, gain access and purchase the goods)"
      ],
      benefits: [
        "Gain one specialty in either Larceny (Lock Picking) or Streetwise (Black Market)",
        "Gain one dot of Blood Sorcery (Tremere and Banu Haqim only), Oblivion (Hecata only), or Obfuscate",
        "Gain the Feeding Merit (•••) Iron Gullet"
      ],
      drawbacks: [
        "Gain an Enemy Flaw (••) of someone who believes this vampire owes them something",
        "Ventrue are unable to pick this Predator type"
      ],
      source: "Vampire: The Masquerade Corebook, page 176"
    },
    bloodLeech: {
      name: "Blood Leech",
      description: "Some Kindred might see feeding from mortals as inherently wrong or disgusting regardless of others' rationale. Blood Leech is a feeding style that is not looked upon kindly by many vampires.",
      benefits: [
        "Gain one specialty in either Brawl (Kindred) or Stealth (Against Kindred)",
        "Gain one dot of Celerity or Protean",
        "Increase blood potency by one"
      ],
      drawbacks: [
        "Lose one dot of Humanity",
        "Gain the Dark Secret Flaw: Diablerist (••), or the Shunned Flaw (••)",
        "Gain the Feeding Flaw: (••) Prey Exclusion (Mortals)"
      ],
      source: "Vampire: The Masquerade Corebook, page 176"
    },
    cleaver: {
      name: "Cleaver",
      description: "The sweetest blood might be from those closest to them, the Cleaver takes advantage of that idea while taking blood from either their own close family and friends or even those close to someone else.",
      dicePools: [
        "Manipulation + Subterfuge (condition the victims, socializing with them and feeding from them without the cover being blown)"
      ],
      benefits: [
        "Gain one specialty in either Persuasion (Gaslighting) or Subterfuge (Coverups)",
        "Gain one dot of Dominate or Animalism",
        "Gain the Herd Advantage (••)"
      ],
      drawbacks: [
        "Gain the Dark Secret Flaw (•) Cleaver"
      ],
      source: "Vampire: The Masquerade Corebook, page 176"
    },
    consensualist: {
      name: "Consensualist",
      description: "Consent is a dangerous thing to gather when they're a blood-sucking monster, but Consensualists make do. They never feed against the victim's free will.",
      dicePools: [
        "Manipulation + Persuasion (take blood by consent, under the guide of medical work or mutual kink)"
      ],
      benefits: [
        "Gain one specialty in either Medicine (Phlebotomy) or Persuasion (Vessels)",
        "Gain one dot of Auspex or Fortitude",
        "Gain one dot of Humanity"
      ],
      drawbacks: [
        "Gain the Dark Secret Flaw: (•) Masquerade Breacher",
        "Gain the Feeding Flaw: (•) Prey Exclusion (Non-consenting)"
      ],
      source: "Vampire: The Masquerade Corebook, page 177"
    },
    farmer: {
      name: "Farmer",
      description: "Perhaps this vampire was once someone who worked as an activist or an aid worker, regardless of their reasoning the Farmer only feed from animals as their primary source of blood.",
      dicePools: [
        "Composure + Animal Ken (find and catch the chosen animal)"
      ],
      benefits: [
        "Gain one specialty in either Animal Ken (specific animal) or Survival (Hunting)",
        "Gain one dot of Animalism or Protean",
        "Gain one dot of Humanity"
      ],
      drawbacks: [
        "Gain the Feeding Flaw: (••) Farmer",
        "Ventrue may not pick this Predator type",
        "Cannot be taken on characters with Blood Potency 3 or higher"
      ],
      source: "Vampire: The Masquerade Corebook, page 177"
    },
    osiris: {
      name: "Osiris",
      description: "More than not, Osiris are celebrities within mortal society. Musicians, writers, priests, and even cult leaders may find an easy time finding their blood by utilizing those already around them.",
      dicePools: [
        "Manipulation + Subterfuge or Intimidation + Fame (feed from the adoring fans)"
      ],
      benefits: [
        "Gain one specialty in either Occult (specific tradition) or Performance (specific entertainment field)",
        "Gain one dot of Blood Sorcery (Tremere or Banu Haqim only) or Presence",
        "Spend three dots between the Fame and Herd Backgrounds"
      ],
      drawbacks: [
        "Spend two dots between Enemies and Mythic Flaws"
      ],
      source: "Vampire: The Masquerade Corebook, page 177"
    },
    sandman: {
      name: "Sandman",
      description: "If they never wake during the feed it never happened, right? Sandman prefers to hunt on sleeping mortals than anyone else by using stealth or Disciplines to feed from their victims.",
      dicePools: [
        "Dexterity + Stealth (casing a location, breaking in and feeding without leaving a trace)"
      ],
      benefits: [
        "Gain one specialty in either Medicine (Anesthetics) or Stealth (Break-in)",
        "Gain one dot of Auspex or Obfuscate",
        "Gain one dot of Resources"
      ],
      source: "Vampire: The Masquerade Corebook, page 178"
    },
    sceneQueen: {
      name: "Scene Queen",
      description: "Similar to Osiris these Kindred find comfort in a particular subculture rather than a wider audience. Hunting in or around a subculture they likely belonged to in their previous life.",
      dicePools: [
        "Manipulation + Persuasion (feed from those within the Kindred's subgroup, through conditioning and isolation to gain blood or gaslighting or forced silence)"
      ],
      benefits: [
        "Gain one specialty in either Etiquette (specific scene), Leadership (specific scene), or Streetwise (specific scene)",
        "Gain one dot of Dominate or Potence",
        "Gain the Fame Advantage (•)",
        "Gain the Contact Advantage (•)"
      ],
      drawbacks: [
        "Gain either the Influence Flaw: (•) Disliked (outside their subculture) or the Feeding Flaw: (•) Prey Exclusion (a different subculture than theirs)"
      ],
      source: "Vampire: The Masquerade Corebook, page 178"
    },
    siren: {
      name: "Siren",
      description: "Everyone knows that sex sells and the Siren uses this to their advantage. Almost exclusively feeding while feigning sex or sexual interest, they utilize Disciplines and seduction to lure away a possible meal.",
      dicePools: [
        "Charisma + Subterfuge (feed under the guise of sexual acts)"
      ],
      benefits: [
        "Gain one specialty in either Persuasion (Seduction) or Subterfuge (Seduction)",
        "Gain one dot of Fortitude or Presence",
        "Gain the Looks Merit: (••) Beautiful"
      ],
      drawbacks: [
        "Gain the Enemy Flaw (•) A spurned lover or jealous partner"
      ],
      source: "Vampire: The Masquerade Corebook, page 178"
    },
    extortionist: {
      name: "Extortionist",
      description: "On the surface, Extortionists acquire their blood in exchange for services such as protection, security, or surveillance. Though, for as many times as the service might be genuine, there are many more times when the service has been offered from fabricated information.",
      dicePools: [
        "Strength/Manipulation + Intimidation (feed through coercion)"
      ],
      benefits: [
        "Gain one specialty in either Intimidation(Coercion) or Larceny(Security)",
        "Gain one dot of Dominate or Potence",
        "Spend three dots between the Contacts and Resources Backgrounds"
      ],
      drawbacks: [
        "Gain the Enemy Flaw (••) The police or a victim who escaped the character's extortion and wants revenge"
      ],
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 150"
    },
    graverobber: {
      name: "Graverobber",
      description: "Similar to Baggers these kindred understand there's no good in wasting good blood, even if others cannot consume it. Often they find themselves digging up corpses or working or mortuaries to obtain their bodies.",
      dicePools: [
        "Resolve + Medicine (sifting through the dead for a body with blood)",
        "Manipulation + Insight (moving among miserable mortals)"
      ],
      benefits: [
        "Gain one in specialty either Occult (Grave Rituals) or Medicine (Cadavers)",
        "Gain one dot of Fortitude or Oblivion",
        "Gain the Feeding Merit (•••) Iron Gullet",
        "Gain the Haven Advantage (•)"
      ],
      drawbacks: [
        "Gain the Herd Flaw: (••) Obvious Predator"
      ],
      source: "Vampire: The Masquerade Cults of the Blood Gods, page 150"
    },
    roadsideKiller: {
      name: "Roadside Killer",
      description: "These Kindred never stay in one spot for too long and are always on the move, hunting those who won't be missed if they disappear alongside the road.",
      dicePools: [
        "Dexterity/Charisma + Drive (feed by picking up down and outs with no other options)"
      ],
      benefits: [
        "Gain one in specialty either Survival (the road) or Investigation (vampire cant)",
        "Gain one dot of Fortitude or Protean",
        "Gain two additional dots of migrating Herd"
      ],
      drawbacks: [
        "Gain the Feeding Flaw: Prey Exclusion (locals)"
      ],
      source: "Vampire: The Masquerade Let the Streets Run Red, page 76"
    },
    grimReaper: {
      name: "Grim Reaper",
      description: "Hunting inside hospice care facilities, assisted living homes, and other places where those who are near death reside. Grim Reapers are constantly on the move in an effort to locate new victims near the end of their lives to feed from.",
      dicePools: [
        "Intelligence + Awareness/Medicine (find victims)"
      ],
      benefits: [
        "Gain one specialty in either Awareness (Death) or Larceny (Forgery)",
        "Gain one dot of Auspex or Oblivion",
        "Gain one dot of Allies or Influence associated with the medical community",
        "Gain one dot of Humanity"
      ],
      drawbacks: [
        "Gain the Feeding Flaw: (•) Prey Exclusion (Healthy Mortals)"
      ],
      source: "Vampire: The Masquerade Players Guide, page 108"
    },
    montero: {
      name: "Montero",
      description: "Montero carry on a tradition held by aristocratic Spaniards where they hunted deer and used teams to drive them into the huntsman. Retainers drive the victims towards the vampire for them to feed.",
      dicePools: [
        "Intelligence + Stealth (expert planning of well-trained Retainers)",
        "Resolve + Stealth (well-practiced plan and patient waiting)"
      ],
      benefits: [
        "Gain one specialty in either Leadership (Hunting Pack) or Stealth (Stakeout)",
        "Gain one dot of Dominate or Obfuscate",
        "Gain two dots of Retainers"
      ],
      drawbacks: [
        "Lose one dot of Humanity"
      ],
      source: "Vampire: The Masquerade Players Guide, page 108"
    },
    pursuer: {
      name: "Pursuer",
      description: "For those who prefer to stalk their victim, learning their habits and routines, determining if they will cause an outcry if they disappear or not. The Pursuer strikes when the time is right and when hunger is at a perfect balance.",
      dicePools: [
        "Intelligence + Investigation (locate and find a victim no one will notice is gone)",
        "Stamina + Stealth (long stalking of unaware urban victims)"
      ],
      benefits: [
        "Gain one specialty in either Investigation (Profiling) or Stealth (Shadowing)",
        "Gain one dot of Animalism or Auspex",
        "Gain the Merit: (•) Bloodhound",
        "Gain one dot of Contacts from the morally flexible inhabitants where the vampire primarily hunts"
      ],
      drawbacks: [
        "Lose one dot of Humanity"
      ],
      source: "Vampire: The Masquerade Players Guide, page 108"
    },
    trapdoor: {
      name: "Trapdoor",
      description: "Much like the spider, this vampire builds a nest and lures their prey inside. Be it an amusement park, an abandoned house, or an underground club, the victim comes to them.",
      dicePools: [
        "Charisma + Stealth (the victims that enter expecting a fun-filled night)",
        "Dexterity + Stealth (feed upon trespassers)",
        "Wits + Awareness + Haven dots (navigate the maze of the den itself)"
      ],
      benefits: [
        "Gain one specialty in either Persuasion (Marketing) or Stealth (Ambushes or Traps)",
        "Gain one dot of Protean or Obfuscate",
        "Gain one dot of Haven",
        "Gain one dot of either Retainers or Herd, or a second Haven dot"
      ],
      drawbacks: [
        "Gain one Haven Flaw, either (•) Creepy or (•) Haunted"
      ],
      source: "Vampire: The Masquerade Players Guide, page 109"
    }
  }
};
window.predatorTypes = predatorTypes; 
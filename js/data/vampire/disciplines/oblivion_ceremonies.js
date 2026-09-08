export const oblivionCeremonies = {
  name: "Oblivion Ceremonies",
  generalRules: {
    baseCost: "One Rouse Check",
    castingTime: "Five minutes per level",
    ritualRoll: "Resolve + Oblivion",
    difficulty: "Ceremony Level + 1",
    additionalNotes: [
      "Unless otherwise marked all ceremonies cost one rouse check, five minutes per level to cast and winning an Resolve + Oblivion Difficulty (Ceremony Level + 1).",
      "Ceremonies that benefit the recipient can only be cast onto the user themselves unless otherwise stated.",
      "They also usually require additional components in order to cast.",
      "Learning new rituals in play take time and experience.",
      "Learning new ritual is at least the square of the its level in weeks."
    ]
  },
  ceremonies: {
    level1: [
      {
        name: "Gift of False Life",
        effect: "Raise either a single corpse or a group to perform simple single or repetitive tasks.",
        cost: "One Rouse Check",
        prerequisite: "Ashes to Ashes",
        ritualRoll: "Resolve + Oblivion",
        notes: "Corpses are mindless creatures and do not defend themselves from attacks, decaying as normal for the duration of the ceremony.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 208"
      },
      {
        name: "Knowing Stone",
        effect: "Identify the locations and existences of specific ghosts.",
        cost: "One Rouse Check",
        prerequisite: "Ashes to Ashes, Binding Fetter",
        ritualRoll: "Resolve + Oblivion",
        notes: "They must know the ghost's name.",
        source: "Vampire: The Masquerade Fall of London, page 264"
      },
      {
        name: "Summon Spirit",
        effect: "Summon a spirit from the Underworld.",
        cost: "One Rouse Check",
        prerequisite: "Binding Fetter",
        ritualRoll: "Resolve + Oblivion",
        notes: "The wraith will disappear at the end of the scene unless a ceremony is used to keep them there such as Compel Spirit.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 209"
      },
      {
        name: "Traveler's Call",
        effect: "Summon another Shalimite.",
        cost: "One Rouse Check",
        prerequisite: "Oblivion Sight",
        ritualRoll: "Resolve + Oblivion",
        notes: "The victim can choose to ignore it, taking -2 to all pools in relation to concentration for one scene. This ceremony is connected to the Cult of Shalim.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 93"
      }
    ],
    level2: [
      {
        name: "Ashen Relic",
        effect: "Preservation of a Kindred's body",
        cost: "One Rouse Check",
        prerequisite: "Ashes to Ashes or Oblivion's Sight",
        ritualRoll: "Resolve + Oblivion",
        notes: "Three successes in the margin preserves more.",
        source: "Book of Nod Apocrypha, page 35"
      },
      {
        name: "Awaken the Homuncular Servant",
        effect: "Create spies and stalkers out of body parts or small animals",
        cost: "One Rouse Check",
        prerequisite: "Where the Shroud Thins",
        ritualRoll: "Resolve + Oblivion",
        notes: "The servant can scale or hop walls and hide, but it cannot speak. It is only able to telepathically communicate single images to its creator.",
        source: "Cults of the Blood Gods, page 209"
      },
      {
        name: "Blinding the Alloy Eye",
        effect: "Cameras cannot perceive the user clearly",
        cost: "One Rouse Check",
        prerequisite: "Shadow Cast",
        ritualRoll: "Resolve + Oblivion",
        notes: "Do not make the ritual roll until the effect is active. This ceremony is connected to the Sabbat.",
        source: "Sabbat, page 52"
      },
      {
        name: "Compel Spirit",
        effect: "Bend a wraith to a vampire's will",
        cost: "One Rouse Check",
        prerequisite: "Where the Shroud Thins",
        ritualRoll: "Resolve + Oblivion",
        notes: "The ritual roll is made against the wraith's Resolve + Composure or Willpower.",
        source: "Cults of the Blood Gods, page 210"
      },
      {
        name: "Maw of Ahriman",
        effect: "Open a portal to the Abyss, usually within their mouth",
        cost: "One Rouse Check",
        prerequisite: "N/A",
        ritualRoll: "Resolve + Oblivion",
        notes: "The user cannot speak till it is either cancelled or the next sunrise.",
        source: "Blood Stained Love, page 152"
      }
    ],
    level3: [
      {
        name: "Create Corpse Suit",
        effect: "Sew a garment made out of mortal flesh that warns the wearer of subtle signs of danger",
        cost: "One Rouse Check",
        prerequisite: "Shadow Perspective or Touch of Oblivion",
        ritualRoll: "Resolve + Oblivion",
        notes: "The garment is semi-sentient and needs to be persuaded with a test. While worn, the wearer gains a Folkoric Bane and Folkloric Block of the Storyteller's Choice",
        source: "Vampire: The Masquerade Tattered Façade, page 101"
      },
      {
        name: "Create Flesh Golem",
        effect: "Build a flesh golem from parts of a corpse",
        cost: "One Rouse Check",
        prerequisite: "Aura of Decay or Necrotic Plague",
        ritualRoll: "Resolve + Oblivion",
        notes: "Can be assembled manually or with the help of Fleshcrafting",
        source: "Vampire: The Masquerade Tattered Façade, page 101"
      },
      {
        name: "Fortezza Sindonica",
        effect: "Create a barrier that harms wraiths.",
        cost: "Three Rouse Checks",
        prerequisite: "Where the Shroud Thins",
        ritualRoll: "Resolve + Oblivion",
        notes: "Do not make the Ritual Roll until a wraith attempts to pass. This ceremony is connected to the Hecata.",
        source: "Vampire: The Masquerade Trails of Ash and Bone, page 173"
      },
      {
        name: "Harrowhaunt",
        effect: "Keep unwanted visitors from their haven.",
        cost: "One Rouse Check, possible Stains",
        prerequisite: "Aura of Decay",
        ritualRoll: "Resolve + Oblivion",
        notes: "Vampires are able to enter making a fear Frenzy check each turn while inside. This ceremony is connected to the Sabbat.",
        source: "Vampire: The Masquerade Sabbat: The Black Hand, page 51"
      },
      {
        name: "Host Spirit",
        effect: "Allows the user to open their body to a ghost for possession.",
        cost: "One Rouse Check",
        prerequisite: "Aura of Decay",
        ritualRoll: "Resolve + Oblivion",
        notes: "Alongside the bonus of +2 to Physical Attribute rolls and +2 health, the wraiths Skills can be substituted for the vampire’s own at Storyteller discretion.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 211"
      },
      {
        name: "Knit the Veil",
        effect: "Turn a shroud impenetrable.",
        cost: "One Rouse Check",
        prerequisite: "Where the Shroud Thins",
        ritualRoll: "Resolve + Oblivion",
        notes: "When not disturbed this effect does not change for as many nights as the user's Oblivion rating.",
        source: "Vampire: The Masquerade Trails of Ash and Bone, page 174"
      },
      {
        name: "Name of the Father",
        effect: "Strike a victim's mind with the empty void of Oblivion, leaving them paralyzed.",
        cost: "One Rouse Check",
        prerequisite: "Shadow Perspective",
        ritualRoll: "Resolve + Oblivion",
        notes: "The victim can spend willpower equal to the number of turns they would remain paralyzed to free themselves. This ceremony is connected to the Cult of Shalim.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 94"
      },
      {
        name: "Shallow Slumber",
        effect: "Reduces time spent in torpor.",
        cost: "One Rouse Check",
        prerequisite: "Passion Feast or Touch of Oblivion",
        ritualRoll: "Resolve + Oblivion",
        notes: "Can be used on self on others even when not in torpor.",
        source: "Vampire: The Masquerade Gehenna War, page 50"
      },
      {
        name: "Shambling Hordes",
        effect: "Raise a group of aggressive walking dead.",
        cost: "One Rouse Check, possible Stains",
        prerequisite: "Aura of Decay",
        ritualRoll: "Resolve + Oblivion",
        notes: "If left without commands, they attack anyone around them other than their master.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 212"
      },
      {
        name: "Wisdom of the Dead",
        effect: "Gain information from a corpse skull or head.",
        cost: "One Rouse Check",
        prerequisite: "Where the Shroud Thins or Oblivion's Sight",
        ritualRoll: "Resolve + Oblivion",
        notes: "Add two dice to their dice pool if they are still carrying the skull/head for the rest of the night.",
        source: "Vampire: The Masquerade Book of Nod Apocrypha, page 35"
      },
      {
        name: "Misfortune's Hand",
        effect: "Use the power of entropy to call ruin on an enemy's Backgrounds",
        cost: "One Rouse Check",
        prerequisite: "Shadow Servant or Touch of Oblivion",
        ritualRoll: "Resolve + Oblivion",
        notes: "A target can only be affect by one casting of this Ceremony at a time.",
        source: "Vampire: The Masquerade Courts of the Damned, page 217"
      }
    ],
    level4: [
      {
        name: "Befoul Vessel",
        effect: "Turn a mortal's blood into poison for other vampires",
        cost: "One Rouse Check",
        prerequisite: "Necrotic Plague",
        ritualRoll: "Resolve + Oblivion",
        notes: "This power leaves no trace other than the mortal dying the next night with the smell of mildew and sweat. This ceremony is connected to the Sabbat.",
        source: "Sabbat, page 52"
      },
      {
        name: "Bind the Spirit",
        effect: "Bind a wraith to a specific location or person",
        cost: "One Rouse Check, possible Stains",
        prerequisite: "Necrotic Plague",
        ritualRoll: "Resolve + Oblivion",
        notes: "Bound wraiths have the same powers as spectres.",
        source: "Cults of the Blood Gods, page 212"
      },
      {
        name: "Bind to Mortal Form",
        effect: "Extend the life of a mortal without ghouling them",
        cost: "One Rouse Check",
        prerequisite: "Necrotic Plague or Skuld Fulfilled",
        ritualRoll: "Resolve + Oblivion",
        notes: "The ceremony does not keep the mortal young, and continues to age both physically and mentally, albeit past their natural lifespan.",
        source: "Tattered Facade, page 102"
      },
      {
        name: "Death Rattle",
        effect: "Inflict the sensory experience of a wraith's death onto a target",
        cost: "One Rouse Check",
        prerequisite: "Fatal Precognition",
        ritualRoll: "Resolve + Oblivion",
        notes: "The victim contests the ritual roll with Composure + Resolve.",
        source: "Trails of Ash and Bone, page 174"
      },
      {
        name: "Split the Veil",
        effect: "Create a tear into a shroud to allow wraiths to enter",
        cost: "One Rouse Check, possible Stains",
        prerequisite: "Necrotic Plague",
        ritualRoll: "Resolve + Oblivion",
        notes: "This Ceremony reduces the density of the veil and can reduce it to absent, allowing wraiths to come through. The veil increased to frayed after the session ends, stopping any more wraiths.",
        source: "Cults of the Blood Gods, page 213"
      }
    ],
    level5: [
      {
        name: "Ex Nihilo",
        effect: "Enter the Shadowlands",
        cost: "Three Rouse Checks and one Willpower point",
        prerequisite: "Withering Spirit",
        ritualRoll: "Resolve + Oblivion",
        notes: "The Shadowlands have several rules that do not exist in the world of the living.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 213"
      },
      {
        name: "Gift of True Life",
        effect: "Extend a mortal's life by shortening the life of another",
        cost: "One Rouse Check",
        prerequisite: "Necrotic Plague or Passion Feast",
        ritualRoll: "Resolve + Oblivion",
        notes: "The receiving mortal ages half as quickly until the extra lifespan granted has been spent, after which, they begin to age normally.",
        source: "Vampire: The Masquerade Tattered Façade, page 102"
      },
      {
        name: "Lazarene Blessing",
        effect: "Bring a fresh corpse back to life",
        cost: "One Rouse Check, possible Stains",
        prerequisite: "Skuld Fulfilled",
        ritualRoll: "Resolve + Oblivion",
        notes: "This lasts until the body dies again or the wraith is exorcised from the host.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 214"
      },
      {
        name: "Pit of Contemplation",
        effect: "Cast an enemy into Oblivion itself.",
        cost: "One Rouse Check, possible Stains",
        prerequisite: "Tenebrous Avatar",
        ritualRoll: "Resolve + Oblivion",
        notes: "Mortals sucked in are instantly killed. This ceremony is connected to the Cult of Shalim.",
        source: "Vampire: The Masquerade Cults of the Blood Gods, page 94"
      }
    ]
  },
  ceremonyConnections: {
    cultOfShalim: [
      "Traveler's Call",
      "Name of the Father",
      "Pit of Contemplation"
    ],
    sabbat: [
      "Blinding the Alloy Eye",
      "Harrowhaunt",
      "Befoul Vessel"
    ],
    hecata: [
      "Fortezza Sindonica"
    ]
  }
};

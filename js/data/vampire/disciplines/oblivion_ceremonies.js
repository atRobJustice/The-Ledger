export const oblivionCeremonies = {
  name: "Oblivion Ceremonies",
  generalRules: {
    baseCost: "One Rouse Check",
    castingTime: "Five minutes per level",
    ritualRoll: "Resolve + Oblivion",
    difficulty: "Ceremony Level + 1",
    additionalNotes: [
      "Ceremonies that benefit the recipient can only be cast onto the user themselves unless otherwise stated",
      "They usually require additional components in order to cast"
    ]
  },
  ceremonies: {
    level1: [
      {
        name: "Gift of False Life",
        effect: "Raise either a single corpse or a group to perform simple single or repetitive tasks",
        cost: "One Rouse Check",
        prerequisite: "Ashes to Ashes",
        ritualRoll: "Resolve + Oblivion",
        notes: "Corpses are mindless creatures and do not defend themselves from attacks, decaying as normal for the duration of the ceremony.",
        source: "Cults of the Blood Gods, page 208"
      },
      {
        name: "Knowing Stone",
        effect: "Identify the locations and existences of specific ghosts",
        cost: "One Rouse Check",
        prerequisite: "Ashes to Ashes, Binding Fetter",
        ritualRoll: "Resolve + Oblivion",
        notes: "They must know the ghost's name.",
        source: "Fall of London, page 264"
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
      }
    ],
    level3: [
      {
        name: "Fortezza Sindonica",
        effect: "Create a barrier that harms wraiths",
        cost: "Three Rouse Checks",
        prerequisite: "Where the Shroud Thins",
        ritualRoll: "Resolve + Oblivion",
        notes: "Do not make the Ritual Roll until a wraith attempts to pass. This ceremony is connected to the Hecata.",
        source: "Trails of Ash and Bone, page 173"
      },
      {
        name: "Host Spirit",
        effect: "Allows the user to open their body to a ghost for possession",
        cost: "One Rouse Check",
        prerequisite: "Aura of Decay",
        ritualRoll: "Resolve + Oblivion",
        notes: "Alongside the bonus of +2 to Physical Attribute rolls and +2 health, the wraiths Skills can be substituted for the vampire's own at Storyteller discretion.",
        source: "Cults of the Blood Gods, page 211"
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
        source: "Cults of the Blood Gods, page 213"
      },
      {
        name: "Lazarene Blessing",
        effect: "Bring a fresh corpse back to life",
        cost: "One Rouse Check, possible Stains",
        prerequisite: "Skuld Fulfilled",
        ritualRoll: "Resolve + Oblivion",
        notes: "This lasts until the body dies again or the wraith is exorcised from the host.",
        source: "Cults of the Blood Gods, page 214"
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
export const salubri = {
  name: "Salubri",
  nicknames: ["Cyclops", "Soul-Thieves", "Dajjals", "Saulot's progeny"],
  disciplines: ["Auspex", "Dominate", "Fortitude"],
  bane: {
    name: "Hunted",
    description: "Their vitae has a unique trait where, when another clan partakes in their Blood, they find it difficult to pull away. Once a non-Salubri has consumed at least one Hunger level worth, they must make a Hunger Frenzy test at difficulty 2 + the Salubri's Bane Severity (3 + the Salubri's Bane Severity for Banu Haqim). If they fail, they will continue to consume the Salubri until pried off. Additionally, each Salubri has a third eye, and while it's not always human-like, it's always present and cannot be obscured by supernatural powers. In addition to this, whenever they activate a Discipline, the eye weeps vitae, with its intensity correlating to the level of the Discipline used. The Blood flowing from the eye can trigger a Hunger Frenzy test from nearby vampires with Hunger 4 or more."
  },
  variantBane: {
    name: "Asceticism",
    description: "Whenever their Hunger is below three, the Salubri suffer a penalty equal to their Bane Severity to any Discipline dice pools. The bleeding third eye still remains."
  },
  compulsion: {
    name: "Affective Empathy",
    description: "Overwhelmed with empathy for a personal problem of someone else, any action not taken to help the person mitigate their suffering is at a two-dice penalty. This Compulsion continues until the sufferer's burden is eased, a more critical problem arises, or the scene ends."
  },
  background: {
    description: "Most of their kind lost to undead usurpers, the highly desirable Blood of the hunted Salubri is a prize to other vampires. This, and their reluctance to Embrace, makes them rare in the modern nights. They often recruit those on the edge of death, believing their curse can provide the worthy a second chance, and they count some of the most humane vampires among their ranks.",
    history: "Once known for their wisdom and knowledge, the clan barely exists these nights. Their legacy is one of tragedy and a painful lesson of the eternal struggle. Their childer are few in the modern nights; as per their customs, they generally only embrace once they've reached Golconda, even though this is only speculation given the current state of Kindred affairs.",
    embrace: {
      description: "The choice of a childe for the Salubri is an intensely personal decision in comparison to other clans. They usually desire those with inquisitive behaviors and personal struggles within them. Salubri rarely embrace on a mere whim.",
      criteria: "Choosing a childe who has a problem which they must then solve for themselves, be it terminal illness or an unquenchable drive to right a wrong done to them."
    },
    saulot: {
      fate: "It is believed that Saulot, their progenitor, was devoured by a Tremere to strengthen his own clan's Blood.",
      legacy: "It is also believed that Saulot was the first Kindred to ever reach Golconda, and so his lineage still attempts to walk in that same path centuries after his death."
    },
    currentStatus: {
      description: "More often than not, the Salubri lead troubled lives, only burdened more by the eternal life they've been given and a third eye, which each Salubri has. Still, they persevere to solve the mystery of Caine's damnation and help others find their salvation.",
      reputation: "However, the power to help comes with the power to harm, and many Kindred believe in the rumors of these Cyclops being able to steal their souls. Some Salubri even take a hard stance of desiring to destroy those too entangled with their beast or keep their distance from other Kindred has done nothing but solidify the speculations about them.",
      acceptance: "Very few domains allow them within their walls because they are running into trouble with others; neither Camarilla Princes nor Anarch Barons are willing to keep them long. Many of the Salubri are still being hunted for actions of their sires centuries ago."
    }
  },
  disciplines: {
    auspex: "Enables the Salubri to perceive what's hidden in the world and reveal truths. With the strength of Dominate, they've managed to turn this power into something of a balm for another Kindred as well.",
    dominate: "Used to unburden others of the horrors Kindred experience or to erase the memories of atrocities Kindred commit.",
    fortitude: "Has aided the Salubri in surviving the endless hunts against them, as well as developing the power in a way to aid others."
  },
  archetypes: {
    tiredOfRunning: "Time and time again this Salubri has been chased from one Domain to the next, seeking out one place to settle down for more than a few nights, yet that never seems to happen for them, as even once they are safe, they suffer from the paranoia of the what ifs.",
    misunderstoodHealer: "They do their best to aid others, but regardless of their actions, the preconceived notions of their clan aid others to cast judgment on them and mistrust them."
  },
  modernNights: {
    description: "Their fate in the modern night is grim. Still, they face this adversity with a perspective rare within Kindred.",
    goals: [
      "Willing to help others walk the difficult path of Golconda",
      "Plenty of Salubri seems to want to help others rather than cause strife",
      "Others seek to protect them in other ways by hunting down wights and other low humanity monsters that plague Kindred and cause nothing but problems"
    ]
  }
}; 
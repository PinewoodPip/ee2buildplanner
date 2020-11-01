export const races = {
	human: {
		name: "Human",
		innateSkill: "Shout_InspireStart",
		innateStatBoosts: [] // todo
	},
	elf: {
		name: "Elf",
		innateSkill: "Shout_FleshSacrifice",
		innateStatBoosts: [] // todo
	},
	lizard: {
		name: "Lizard",
		innateSkill: "Cone_Flamebreath",
		innateStatBoosts: [] // todo
	},
	dwarf: {
		name: "Dwarf",
		innateSkill: "Shout_FleshSacrifice",
		innateStatBoosts: [] // todo
	},
}

export const lifeType = {
	living: {
		name: "",
		innateSkill: null,
		innateStatBoosts: [] // todo
	},
	undead: {
		name: "Undead",
		innateSkill: "Target_AMER_VampiricTouch",
		innateStatBoosts: [] // todo
	},
}

export const origins = {
	red_prince: {
		name: "The Red Prince",
		race: "lizard",
		gender: "male",
		lifeType: "alive",
		innateSkill: "Target_DemonicStare"
	},
	sebille: {
		name: "Sebille",
		race: "elf",
		gender: "female",
		lifeType: "alive",
		innateSkill: "Shout_BreakTheShackles"
	},
	lohse: {
		name: "Lohse",
		race: "human",
		gender: "female",
		lifeType: "alive",
		innateSkill: "Target_MaddeningSong"
	},
	ifan: {
		name: "Ifan Ben-Mezd",
		race: "human",
		gender: "male",
		lifeType: "alive",
		innateSkill: "Summon_SoulWolf"
	},
	beast: {
		name: "Beast",
		race: "dwarf",
		gender: "male",
		lifeType: "alive",
		innateSkill: "Target_Squall"
	},
	fane: {
		name: "Fane",
		race: "human",
		gender: "male",
		lifeType: "undead",
		innateSkill: "Target_TimeWarp",
	}
}
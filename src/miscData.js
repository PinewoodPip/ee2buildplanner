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

export const nodesWithExtraKeywords = {
	Ascension_Occultist_MUTA_EmulateInfectSpendAdapt: ["Adaptation"],
	Ascension_Occultist_MUTA_EmulateInfectSpendAdapt: ["Adaptation"],
	Ascension_VitalityVoid_MUTA_Wither: ["Wither"],
	Ascension_Occultist_MUTA_Adapt: ["Adaptation"],
	Ascension_Abeyance_MUTA_AdaptSpendFireAoE: ["Adaptation"],
	Ascension_Centurion_MUTA_AdaptationStacks: ["Adaptation"],
	Ascension_Centurion_MUTA_CritAdaptStacks: ["Adaptation"],
	Ascension_Ward_MUTA_AdaptationStacks: ["Adaptation"],
	Ascension_Abeyance_MUTA_AdaptSpendBufferReduce: ["Adaptation"],
	Ascension_Centurion_MUTA_AdaptationStacks: ["Adaptation"],
	Ascension_Demolitionist_AdaptSpenderSIBoost: ["Adaptation"], // really special case
	Ascension_Centurion_MUTA_AdaptSpendEmulateChainLight: ["Adaptation"],
	Ascension_Centurion_MUTA_DefianceBHStacks: ["Defiance"],
	Ascension_CenturionAndCelestial_MUTA_WardACTGenExtend: ["Ward"],
	Ascension_Centurion_MUTA_DamageAndViolentStrikeACT: ["ViolentStrike"], //
	Ascension_Adaptation_MUTA_BenevolenceACT: ["Benevolence"],
	Ascension_Benevolence_MUTA_AdaptStacks: ["Adaptation"],
	Ascension_Celestial_MUTA_ViolentStrikeForAlly: ["ViolentStrike"],
	Ascension_Celestial_MUTA_WardShareAndAPRec: ["Ward"],
	Ascension_Benevolence_MUTA_PurityACT_CDReduc: ["Purity"],
	Ascension_Benevolence_MUTA_EmulateCelestialHeal: ["Celestial"],
	Ascension_Centurion_MUTA_PurityGivesCenturionScaling: ["Purity"],
	Ascension_Wither_MUTA_EmulateVampTouchSpendAdapt: ["Adaptation"],

	Ascension_ViolentStrike_MUTA_VitalityVoidACT: ["VitalityVoid"],
	Ascension_VitalityVoid_MUTA_TeleportWithered: ["Wither"],
	Ascension_Paucity_MUTA_WitherACT_BasicAttack: ["Wither"],
	Ascension_Predator_MUTA_VoracityACT: ["Voracity"],

}

export const statCategories = {
	resistances: [
		{type: "flexStat", id: "AllResistance"},
		{type: "flexStat", id: "PHYSICALRESISTANCE"},
		{type: "flexStat", id: "PIERCINGRESISTANCE"},
		{type: "flexStat", id: "EleResistance"},
		{type: "flexStat", id: "FIRERESISTANCE"},
		{type: "flexStat", id: "WATERRESISTANCE"},
		{type: "flexStat", id: "EARTHRESISTANCE"},
		{type: "flexStat", id: "AIRRESISTANCE"},
		{type: "flexStat", id: "POISONRESISTANCE"},
	]
}

export const stats = {
	realStats: {
		str: {
			display: "Strength: {0}",
		},
		finesse: {
			display: "Finesse: {0}",
		},
		pwr: {
			display: "Power: {0}",
		},
		con: {
			display: "Constitution: {0}",
		},
		mem: {
			display: "Memory: {0}",
		},
		wits: {
			display: "Wits: {0}",
		},
	},
	flexStat: {
		CONSTITUTION: {
			display: "Constitution: {0}",
			default: 10,
		},
		MEMORY: {
			display: "Memory: {0}",
			default: 10,
		},
		INTELLIGENCE: {
			display: "Power: {0}",
			default: 10,
		},
		STRENGTH: {
			display: "Strength: {0}",
			default: 10,
		},
		WITS: {
			display: "Wits: {0}",
			default: 10,
		},
		FINESSE: {
			display: "Finesse: {0}",
			default: 10,
		},
		INITIATIVE: {
			display: "Initiative: {0}",
		},
		CRITICALCHANCE: {
			display: "Critical Chance: {0}%",
		},
		DAMAGEBOOST: {
			display: "Damage: +{0}% additive",
		},
		LIFESTEAL: {
			display: "Lifesteal: {0}%",
		},
		MOVEMENT: {
			display: "Movement: +{0}m"
		},

		MAGICARMORBOOST: {
			display: "Magical Armor: {0}%"
		},
		PHYSICALARMORBOOST: {
			display: "Physical Armor: +{0}%"
		},

		MAGICARMOR: {
			display: "Magical Armor: +{0} Qualifier"
		},
		PHYSICALARMOR: {
			display: "Physical Armor: +{0} Qualifier"
		},

		RESISTDEATH: {
			display: "ResistDeath: {0}"
		},

		VITALITYBOOST: {
			display: "Maximum Vitality: +{0}%"
		},

		DODGEBOOST: {
			display: "Dodge: {0}%"
		},

		AllResistance: {
			display: "All Resistances: {0}%"
		},
		EleResistance: {
			display: "Elemental Resistance: {0}%",
		},
		PHYSICALRESISTANCE: {
			display: "Physical Resistance: {0}%",
		},
		PIERCINGRESISTANCE: {
			display: "Piercing Resistance: {0}%",
		},
		EARTHRESISTANCE: {
			display: "Earth Resistance: {0}%"
		},
		PHYSICALRESISTANCE: {
			display: "Physical Resistance: {0}%"
		},
		POISONRESISTANCE: {
			display: "Poison Resistance: {0}%"
		},
		WATERRESISTANCE: {
			display: "Water Resistance: {0}%"
		},
		FIRERESISTANCE: {
			display: "Fire Resistance: {0}%"
		},
		AIRRESISTANCE: {
			display: "Air Resistance: {0}%"
		},

		FireSpecialist: {
			display: "Pyrokinetic: {0}"
		},
		EarthSpecialist: {
			display: "Geomancer: {0}"
		},
		AirSpecialist: {
			display: "Aerotheurge: {0}"
		},
		WaterSpecialist: {
			display: "Hydrosophist: {0}"
		},
		Necromancy: {
			display: "Necromancer: {0}"
		},
		RogueLore: {
			display: "Scoundrel: {0}"
		},
		Summoning: {
			display: "Summoning: {0}"
		},
		RangerLore: {
			display: "Huntsman: {0}"
		},
		WarriorLore: {
			display: "Warfare: {0}"
		},

		Leadership: {
			display: "Leadership: {0}"
		},
		PainReflection: {
			display: "Retribution: {0}"
		},
		DualWielding: {
			display: "Dual Wielding: {0}"
		},
		SingleHanded: {
			display: "Single Handed: {0}"
		},
		Ranged: {
			display: "Ranged: {0}"
		},
		TwoHanded: {
			display: "Two-handed: {0}"
		},
		ACCURACYBOOST: {
			display: "Accuracy: +{0}%"
		},
	},
	extendedStat: {
		FreeReactionCharge_AMER_Centurion: {
			display: "Free Centurion Charges: {0}"
		},
		FreeReactionCharge_AMER_Elementalist: {
			display: "Free Elementalist Charges: {0}"
		},
		FreeReactionCharge_AMER_Predator: {
			display: "Free Predator Charges: {0}"
		},
		Regen_PhysicalArmor: {
			display: "Missing Physical Armor Regen: {0}%"
		},
		PercAttributeIncrease_Finesse: {
			display: "Invested Finesse: +{0}%"
		},
		Voracity_Life: {
			display: "Life restored from Voracity: {0}%"
		},
		SummonStat_ExtendedStat_Voracity_Life: {
			display: "Summon life restored from Voracity: {0}%"
		},
		Voracity_BothArmor: {
			display: "Armors restored from Voracity: {0}%"
		},
		PercAttributeIncrease_Intelligence: {
			display: "Inested Power: +{0}%"
		},
		SourceGen_AddPointsGranted: {
			display: "Source gain from Source Generation: +{0}"
		},
		Regen_PhysicalArmor: {
			display: "Missing Physical Armor Regen: {0}%"
		},
		BattHarr_Threshold_Sum_Self_Both: {
			display: "B/H Threshold: +{0} ???"
		},
		PercAttributeIncrease_Constitution: {
			display: "Invested Constitution: +{0}%"
		},
		PercAttributeIncrease_Wits: {
			display: "Invested Wits: +{0}%"
		},
		SummonStat_FlexStat_Stat_DAMAGEBOOST: {
			display: "Summon Damage: +{0}% additive"
		},
		SummonStat_FlexStat_Stat_ACCURACYBOOST: {
			display: "Summon Accuracy: +{0}%"
		},
		SummonStat_FlexStat_Stat_LIFESTEAL: {
			display: "Summon lifesteal: {0}%"
		},
		Voracity_MagicArmor: {
			display: "Magical Armor restored from Voracity: {0}%"
		},
		FreeReactionCharge_AMER_Occultist: {
			display: "Free Occultist Charges: {0}"
		},
		SummonStat_FlexStat_Stat_CRITICALCHANCE: {
			display: "Summon Critical Chance: +{0}%"
		},
		SummonStat_FlexStat_Stat_MOVEMENT: {
			display: "Summon Movement: +{0}m ???"
		},
		Regen_MagicArmor: {
			display: "Missing Magical Armor regen: {0}%"
		},
		Adaptation_AddMaxStacks: {
			display: "Maximum Adaptation Stacks: +{0}"
		},
		"MaxRes_ELERES_<NODENAME>": {
			display: "Maximum Elemental Resistance: +{0}%"
		},
		VitalityVoid_Radius: {
			display: "Vitality Void Radius: +{0}m"
		},
		Battered_StackInfluence_Enemy: {
			display: "Battered_StackInfluence_Enemy: {0}"
		},
		Harried_StackInfluence_Enemy: {
			display: "Harried_StackInfluence_Enemy: {0}"
		},
		Explode_OnStatus_AMER_WITHER_Projectile_AMER_SCRIPT_Wither_Decay: {
			display: "Explode_OnStatus_AMER_WITHER_Projectile_AMER_SCRIPT_Wither_Decay: {0}"
		},
		SummonStat_FlexStat_Stat_SpecialCase_AllResistance: {
			display: "Summon All Resistances: +{0}%"
		},
		Paucity_Blocked: {
			display: "Unable to activate Paucity: {0}",
			bool: true,
		},
		Status_AddDuration_AMER_BANE: {
			display: "Extra Bane Duration: {0}"
		},
		Reaction_TempFlexStat_AMER_Centurion_Stat_ACCURACYBOOST: {
			display: "Accuracy Boost during Centurion: +{0}%"
		},
		Reaction_TempFlexStat_AMER_Centurion_Stat_CRITICALCHANCE: {
			display: "Critical Chance boost during Centurion: +{0}%"
		},
		SummonStat_FlexStat_Ability_Perseverance: {
			display: "Summon Perseverance: {0}"
		},
		SummonStat_FlexStat_Stat_PHYSICALRESISTANCE: {
			display: "Summon Physical Resistance(s)?: +{0}%"
		},
		SummonStat_ExtendedStat_Regen_Life: {
			display: "Summon Life regen: {0}% ???"
		},
		SummonStat_FlexStat_Stat_DODGEBOOST: {
			display: "Summon Dodge Chance: +{0}%"
		},
		SummonStat_FlexStat_Stat_VITALITYBOOST: {
			display: "Summon Vitality: +{0}%"
		},
		PercAttributeIncrease_Strength: {
			display: "Invested Strength: +{0}%"
		},
		Status_AddDuration_AMER_WARD: {
			display: "Bonus Ward Duration: +{0}"
		},
		PercAttributeIncrease_Memory: {
			display: "Invested Memory: +{0}%"
		},
		FreeReactionCharge_AMER_Celestial: {
			display: "Free Celestial Charges: {0}"
		},
		Status_AddDuration_AMER_DEFIANCE: {
			display: "Bonus Defiance Duration: {0}"
		},
		Reaction_BlockBasic_AMER_Centurion: {
			display: "Cannot perform basic Centurion behaviour: {0}",
			bool: true,
		},
		IgnoreShieldPowerPenalty: {
			display: "Shield Power penalty removed: {0}",
			bool: true,
		},
		Voracity_PhysArmor: {
			display: "Physical Armor restored from Voracity: {0}%"
		},
		SourceGen_InfiniteDuration: {
			display: "Infinite Source Generation: {0}",
			bool: true,
		},
		Explode_OnStatus_AMER_PURITY_AURA_AMER_SCRIPT_TheNymph_Purity_Radial: {
			display: "Explode_OnStatus_AMER_PURITY_AURA_AMER_SCRIPT_TheNymph_Purity_Radial: {0}"
		},
		Purity_CooldownManip: {
			display: "Purity_CooldownManip: {0}"
		},
		Status_AddDuration_AMER_SCORCHED: {
			display: "Bonus Scorched Duration: {0}"
		},
		
	},
	specialLogic: {
		// careful, some are not bools and can stack
		Ascension_Elementalist_ACT_FireEarth_AllySkills: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_3.0"
		},
		Ascension_Predator_ACT_BHStacks: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_3.1"
		},
		Ascension_Elementalist_MUTA_FireEarth_NonTieredStatuses: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_4.0"
		},
		Status_AddDuration_AMER_SCORCHED: {
			display: " : {0}",
			bool: true,
			referenceString: ""
		},
		Status_AddDuration_AMER_SCORCHED: {
			display: " : {0}",
			bool: true,
			referenceString: ""
		},
		Status_AddDuration_AMER_SCORCHED: {
			display: " : {0}",
			bool: true,
			referenceString: ""
		},
		Status_AddDuration_AMER_SCORCHED: {
			display: " : {0}",
			bool: true,
			referenceString: ""
		},
	},

}

export const aspectsAfterWePutAnHrToMakeThingsLookNice = [
	"TheSerpent", "TheTiger", "TheWolf", "TheSupplicant", "TheSilkworm", "Wealth", "TheGuardsman", "TheRhinoceros", "TheRabbit", "TheStag",
]

export const boostsWithKeywords = [
	"specialLogic", "statusExtension", "scalingExtension", "extraStatusApplication"
]

// converts ids to image filenames / in-game names
export const mappings = {
	abilityImages: {
		"Warrior": "Ability_Warfare",
		"Water": "Ability_Hydrosophist",
		"Earth": "Ability_Geomancer",
		"Death": "Ability_Necromancy",
		"Rogue": "Ability_Scoundrel",
		"Ranger": "Ability_Huntsman",
		"Fire": "Ability_Pyrokinetic",
		"Summoning": "Ability_Summoning",
		"Air": "Ability_Aerotheurge",
		"Source": "Skill_Source_Bless",
		"Polymorph": "Ability_Polymorph",
	},
	abilityNames: {
		"Warrior": "Warfare",
		"Water": "Hydrosophist",
		"Earth": "Geomancer",
		"Death": "Necromancer",
		"Rogue": "Scoundrel",
		"Ranger": "Huntsman",
		"Fire": "Pyrokinetic",
		"Summoning": "Summoning",
		"Air": "Aerotheurge",
		"Source": "Sourcery",
		"Polymorph": "Polymorph",
	},
	keywordImages: {
		"Abeyance": "AMER_UI_Ascension_Keyword_Abeyance",
		"Adaptation": "AMER_UI_Ascension_Keyword_Adaptation",
		"Bane": "AMER_UI_Ascension_Keyword_Bane",
		"Benevolence": "AMER_UI_Ascension_Keyword_Benevolence",
		"Celestial": "AMER_UI_Ascension_Keyword_Celestial",
		"Centurion": "AMER_UI_Ascension_Keyword_Centurion",
		"Defiance": "AMER_UI_Ascension_Keyword_Defiance",
		"Disintegrate": "AMER_UI_Ascension_Keyword_Disintegrate",
		"Elementalist": "AMER_UI_Ascension_Keyword_Elementalist",
		"Paucity": "AMER_UI_Ascension_Keyword_Paucity",
		"Predator": "AMER_UI_Ascension_Keyword_Predator",
		"Presence": "AMER_UI_Ascension_Keyword_Presence",
		"Prosperity": "AMER_UI_Ascension_Keyword_Prosperity", // kekw
		"Purity": "AMER_UI_Ascension_Keyword_Purity",
		"Occultist": "AMER_UI_Ascension_Keyword_Bane",
		"VitalityVoid": "AMER_UI_Ascension_Keyword_VitalityVoid",
		"ViolentStrike": "AMER_UI_Ascension_Keyword_ViolentStrike",
		"VolatileArmor": "AMER_UI_Ascension_Keyword_VolatileArmor",
		"Voracity": "AMER_UI_Ascension_Keyword_Voracity",
		"Ward": "AMER_UI_Ascension_Keyword_Ward",
		"Wither": "AMER_UI_Ascension_Keyword_Wither",
	},
	keywordNames: {
		"Abeyance": "Abeyance",
		"Adaptation": "Adaptation",
		"Bane": "Bane",
		"Benevolence": "Benevolence",
		"Celestial": "Celestial",
		"Centurion": "Centurion",
		"Defiance": "Defiance",
		"Disintegrate": "Disintegrate",
		"Elementalist": "Elementalist",
		"Paucity": "Paucity",
		"Predator": "Predator",
		"Presence": "Presence",
		"Prosperity": "Prosperity", // kekw
		"Purity": "Purity",
		"Occultist": "Occultist",
		"VitalityVoid": "Vitality Void",
		"ViolentStrike": "Violent Strike",
		"VolatileArmor": "Volatile Armor",
		"Voracity": "Voracity",
		"Ward": "Ward",
		"Wither": "Wither",
	}
}
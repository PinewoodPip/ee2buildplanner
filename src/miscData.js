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
	Ascension_CenturionAndCelestial_MUTA_WardACTGenExtend: ["Ward", "Centurion"],
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

	Ascension_Elementalist_ACT_CenturionOrWeak3: ["Centurion"],
	Ascension_Centurion_MUTA_RestoreArmorAddDamageFromArmor: ["Ward"],
	Ascension_Celestial_ACT_AllyWard: ["Ward"],
	Ascension_Centurion_ACT_EndOfTurnDefiance: ["Defiance"],

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
	],
	realResistances: [
		{type: "realStats", id: "res_physical"},
		{type: "realStats", id: "res_piercing"},
		{type: "realStats", id: "res_fire"},
		{type: "realStats", id: "res_water"},
		{type: "realStats", id: "res_earth"},
		{type: "realStats", id: "res_air"},
		{type: "realStats", id: "res_poison"},
	],
	realAttributes: [
		{type: "realStats", id: "str"},
		{type: "realStats", id: "fin"},
		{type: "realStats", id: "pwr"},
		{type: "realStats", id: "con"},
		{type: "realStats", id: "mem"},
		{type: "realStats", id: "wits"},
	],
	skillAbilities: [
		{type: "flexStat", id: "AirSpecialist"},
		{type: "flexStat", id: "EarthSpecialist"},
		{type: "flexStat", id: "RangerLore"},
		{type: "flexStat", id: "WaterSpecialist"},
		{type: "flexStat", id: "Necromancy"},
		{type: "flexStat", id: "Polymorph"},
		{type: "flexStat", id: "FireSpecialist"},
		{type: "flexStat", id: "RogueLore"},
		{type: "flexStat", id: "Summoning"},
		{type: "flexStat", id: "WarriorLore"},
	],
	summonBoosts: [
		{type: "extendedStat", id: "SummonStat_ExtendedStat_Voracity_Life"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_DAMAGEBOOST"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_ACCURACYBOOST"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_LIFESTEAL"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_CRITICALCHANCE"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_MOVEMENT"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_SpecialCase_AllResistance"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Ability_Perseverance"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_PHYSICALRESISTANCE"},
		{type: "extendedStat", id: "SummonStat_ExtendedStat_Regen_Life"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_DODGEBOOST"},
		{type: "extendedStat", id: "SummonStat_FlexStat_Stat_VITALITYBOOST"},
		{type: "extendedStat", id: "SummonStat_ExtendedStat_Voracity_Life"},
		{type: "specialLogic", id: "Ascension_SummonLimitTo2"},
	],
	voracity: [
		{type: "extendedStat", id: "Voracity_Life"},
		{type: "extendedStat", id: "Voracity_BothArmor"},
		{type: "extendedStat", id: "Voracity_PhysArmor"},
		{type: "extendedStat", id: "Voracity_MagicArmor"},
	],
	combatAbilities: [
		{type: "flexStat", id: "SingleHanded"},
		{type: "flexStat", id: "TwoHanded"},
		{type: "flexStat", id: "Ranged"},
		{type: "flexStat", id: "DualWielding"},
		{type: "flexStat", id: "Leadership"},
		{type: "flexStat", id: "PainReflection"},
		{type: "flexStat", id: "Perseverance"},
	]
}

export const playerAttributes = 43
export const maxNaturalAttributeInvestment = 30

export const portraits = [
	"ifan",
	"lohse",
	"sebille",
	"red_prince",
	"beast",
	"fane",
	"human_m",
	"human_f",
	"elf_m",
	"elf_f",
	"dwarf_m",
	"dwarf_f",
	"lizard_m",
	"lizard_f",
	"magister_waifu",
	"derpy_bald_guy",
	"obama",
]

export const stats = {
	realStats: {
		str: {
			display: "Strength: {0}",
		},
		fin: {
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
		// resistances
		res_fire: {
			display: "Fire Resistance: {0}%"
		},
		res_water: {
			display: "Water Resistance: {0}%"
		},
		res_earth: {
			display: "Earth Resistance: {0}%"
		},
		res_poison: {
			display: "Poison Resistance: {0}%"
		},
		res_air: {
			display: "Air Resistance: {0}%"
		},
		res_physical: {
			display: "Physical Resistance: {0}%"
		},
		res_piercing: {
			display: "Piercing Resistance: {0}%"
		},
	},
	embodimentReward: {
		Force: {display: "Bonus Force Embodied: {0}"},
		Entropy: {display: "Bonus Entropy Embodied: {0}"},
		Form: {display: "Bonus Form Embodied: {0}"},
		Inertia: {display: "Bonus Inertia Embodied: {0}"},
		Life: {display: "Bonus Life Embodied: {0}"},
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
		Polymorph: {
			display: "Polymorph: {0}"
		},

		Leadership: {
			display: "Leadership: {0}"
		},
		PainReflection: {
			display: "Retribution: {0}"
		},
		Perseverance: {
			display: "Perseverance: {0}"
		},
		DualWielding: {
			display: "Dual Wielding: {0}"
		},
		SingleHanded: {
			display: "Single-Handed: {0}"
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
	keywordBasicActivator: {},
	statusExtension: {},
	scalingExtension: {},
	extraStatusApplication: {},
	specialLogic: {
		// careful, some are not bools and can stack
		Ascension_Elementalist_ACT_FireEarth_AllySkills: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_3_0"
		},
		Ascension_Predator_ACT_BHStacks: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_3_1"
		},
		Ascension_Elementalist_MUTA_FireEarth_NonTieredStatuses: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_4_0"
		},
		Ascension_Predator_MUTA_Slowed2: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_4_1"
		},
		Ascension_MageFin: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheFalcon_Node_4_4"
		},
		Ascension_Paucity_ACT_BHStacks: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHatchet_Node_3_0"
		},
		Ascension_ViolentStrike_ACT_0AP: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHatchet_Node_3_1"
		},
		Ascension_ViolentStrike_MUTA_Acid: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHatchet_Node_4_0"
		},
		Ascension_ViolentStrike_MUTA_Bleeding: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHatchet_Node_4_2"
		},
		Ascension_ViolentStrike_MUTA_Suffocating: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHatchet_Node_4_3"
		},
		Ascension_ViolentStrike_MUTA_Terrified2: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHatchet_Node_4_4"
		},
		Ascension_WeaponSkillTalent_ThePawn: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHornet_Node_2_0"
		},
		Ascension_WeaponSkillTalent_Sortilege: {
			display: " : {0}",
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheHornet_Node_2_1"
		},
		Ascension_WeaponSkillTalent_Inconspicuous: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheSerpent_Node_2_0"
		},
		Ascension_WeaponSkillTalent_Sortilege: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheSerpent_Node_2_1"
		},
		Ascension_Elementalist_ACT_PredatorOrVuln3: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcanist_Node_3_0"
		},
		Ascension_ViolentStrike_ACT_ElemStacks: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcanist_Node_3_1"
		},
		Ascension_Elementalist_MUTA_EmulateSkillSI: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcanist_Node_4_0"
		},
		Ascension_Elementalist_MUTA_FeedbackAttribBonus: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcanist_Node_4_1"
		},
		Ascension_ViolentStrike_MUTA_ForceEntropyLifeDamageScaling: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcanist_Node_4_2"
		},
		Ascension_Paucity_ACT_BHStacks: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcher_Node_3_0"
		},
		Ascension_ViolentStrike_ACT_DamageAtOnce: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcher_Node_3_1"
		},
		Ascension_Paucity_ACT_MK2_ArmorDepleted: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcher_Node_3_2"
		},
		Ascension_ViolentStrike_MUTA_EleArrowheads: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcher_Node_4_1"
		},
		Ascension_ViolentStrike_MUTA_BHStackNonBoss: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheArcher_Node_4_2"
		},
		Ascension_Paucity_ACT_VitThreshold: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheManticore_Node_3_0"
		},
		Ascension_Predator_ACT_Terrified: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheManticore_Node_3_1"
		},
		Ascension_Paucity_MUTA_EmulateBlackShroud: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheManticore_Node_4_0"
		},
		Ascension_Paucity_MUTA_Sneak: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheManticore_Node_4_1"
		},
		Ascension_Predator_MUTA_EmulateFoKSI: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheManticore_Node_4_2"
		},
		Ascension_Elementalist_ACT_FireEarth_AllySkills: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheScorpion_Node_2_0"
		},
		Ascension_VitalityVoid_ACT_DamageAtOnce: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheScorpion_Node_2_1"
		},
		Ascension_Elementalist_ACT_FireEarth_AllySkills_MK2_NecroRogue: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheScorpion_Node_2_2"
		},
		Ascension_Elementalist_MUTA_FeedbackCrit: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheScorpion_Node_3_0"
		},
		Ascension_VitalityVoid_MUTA_AcidSuffCalc: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheScorpion_Node_3_1"
		},
		Ascension_Predator_ACT_Dazzled: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheTiger_Node_2_0"
		},
		Ascension_Purity_ACT_VitThreshold: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheTiger_Node_2_1"
		},
		Ascension_Purity_ACT_MK2_EnemyKilled: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheTiger_Node_2_2"
		},
		Ascension_Predator_MUTA_DualWieldrange: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheTiger_Node_3_0"
		},
		Ascension_Predator_MUTA_Hemorrhage: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheTiger_Node_3_1"
		},
		Ascension_MageFin: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheConqueror_Node_1_3"
		},
		Ascension_2HArmorBonus: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheConqueror_Node_2_0"
		},
		Ascension_ViolentStrike_ACT_BasicOnHit: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheConqueror_Node_2_1"
		},
		Ascension_ViolentStrike_MUTA_FinStrDamageScaling: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheConqueror_Node_3_1"
		},
		Ascension_Purity_MUTA_Conqueror: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheConqueror_Node_4_0"
		},
		Ascension_ViolentStrike_MUTA_VitalityVoidACT: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheConqueror_Node_4_1"
		},
		Ascension_SourceGen_Conq: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheConqueror_Node_4_2"
		},
		Ascension_Elementalist_ACT_OccultOrElem: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheKraken_Node_2_0"
		},
		Ascension_Elementalist_MUTA_FreeOHBasicAttack: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheKraken_Node_2_1"
		},
		Ascension_Elementalist_MUTA_FeedbackPowerEffect: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheKraken_Node_3_0"
		},
		Ascension_VitalityVoid_MUTA_TeleportWithered: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheKraken_Node_3_1"
		},
		Ascension_Elementalist_MUTA_DoTs: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheKraken_Node_4_0"
		},
		Ascension_VitalityVoid_MUTA_Glaciate: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_TheKraken_Node_4_1"
		},
		Ascension_Paucity_ACT_Berserk: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_Wrath_Node_2_0"
		},
		Ascension_VitalityVoid_MUTA_2HDamageFromForce: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_Wrath_Node_2_1"
		},
		Ascension_Paucity_MUTA_WitherACT_BasicAttack: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_Wrath_Node_3_0"
		},
		Ascension_Predator_MUTA_LifestealDamageFromForce: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_Wrath_Node_3_1"
		},
		Ascension_Paucity_MUTA_EffectiveSI_Wrath: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_Wrath_Node_4_0"
		},
		Ascension_Predator_MUTA_EmulateWiltingSI: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_Wrath_Node_4_1"
		},
		Ascension_T3BlockedForDamage: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Force_Wrath_Node_4_2"
		},
		// sortilege
		Ascension_VitalityVoid_ACT_SourceSpent: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheFly_Node_3_0"
		},
		Ascension_Wither_ACT_SlowAndWeak2And3: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheFly_Node_3_1"
		},
		Ascension_VitalityVoid_MUTA_Terrified2: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheFly_Node_4_0"
		},
		Ascension_Wither_MUTA_CritAppliesSubj2: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheFly_Node_4_1"
		},
		// magef
		Ascension_Occultist_ACT_TerrifiedAndSubj2And3: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheVulture_Node_3_0"
		},
		Ascension_Predator_ACT_AllyAoO: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheVulture_Node_3_1"
		},
		Ascension_Occultist_MUTA_Weakened2: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheVulture_Node_4_0"
		},
		Ascension_Predator_MUTA_CritFromTargetLowLife: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheVulture_Node_4_1"
		},
		Ascension_WeaponSkillTalent_ThePawn: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheWolf_Node_2_0"
		},
		Ascension_WeaponSkillTalent_Inconspicuous: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheWolf_Node_2_1"
		},
		Ascension_VitalityVoid_ACT_VitThresholdPerTurn: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_BloodApe_Node_3_0"
		},
		Ascension_Wither_ACT_Bleeding: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_BloodApe_Node_3_1"
		},
		Ascension_VitalityVoid_MUTA_HitCountExtendSourceGen: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_BloodApe_Node_4_0"
		},
		Ascension_Wither_MUTA_BasicAttackSIGotS: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_BloodApe_Node_4_1"
		},
		Ascension_SummonLimitTo2: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_BloodApe_Node_4_3",
			strings: ["Can have 1 controllable summon at once.", "Can have 2 controllable summons at once."]
		},
		Ascension_Paucity_ACT_AllyDeathsPerRound: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_Extinction_Node_2_0"
		},
		Ascension_Predator_ACT_NearCorpseEndOfTurn: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_Extinction_Node_2_1"
		},
		Ascension_Skill_BoneshapedSkitterer: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_Extinction_Node_2_2"
		},
		Ascension_Paucity_MUTA_SummonACT: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_Extinction_Node_3_0"
		},
		Ascension_Predator_MUTA_SkittererConversion: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_Extinction_Node_3_1"
		},
		Ascension_Predator_MUTA_DamagePerCorpse: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_Extinction_Node_3_2"
		},
		Ascension_Occultist_ACT_AllyWither: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheImp_Node_3_0"
		},
		Ascension_Wither_ACT_SubjAndTerrified: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheImp_Node_3_1"
		},
		Ascension_Occultist_MUTA_NowBasicAttack: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheImp_Node_4_0"
		},
		Ascension_Wither_MUTA_EmulateVampTouchSpendAdapt: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheImp_Node_4_2"
		},
		Ascension_Predator_ACT_AllyPredator: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheHyena_Node_3_0"
		},
		Ascension_VitalityVoid_ACT_SourceSpent: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheHyena_Node_3_1"
		},
		Ascension_VitalityVoid_ACT_SourceSpent_MK2_T3Status: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheHyena_Node_3_2"
		},
		Ascension_Predator_MUTA_VoracityACT: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheHyena_Node_4_0"
		},
		Ascension_VitalityVoid_MUTA_Terrified2AndSubj2: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheHyena_Node_4_1"
		},
		Ascension_VitalityVoid_MUTA_DamageFromTargetCount: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheHyena_Node_4_2"
		},
		Ascension_Adaptation_ACT_AllyKilled: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheSupplicant_Node_2_0"
		},
		Ascension_Occultist_ACT_AlliedSummonKilled: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheSupplicant_Node_2_1"
		},
		Ascension_Adaptation_MUTA_PercPowerLifesteal: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheSupplicant_Node_3_0"
		},
		Ascension_Occultist_MUTA_MakeTotem: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheSupplicant_Node_3_1"
		},
		Ascension_Occultist_MUTA_EmulateInfectSpendAdapt: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheSupplicant_Node_3_2"
		},
		Ascension_Skill_AccursedVessel: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_TheSupplicant_Node_3_3"
		},
		Ascension_Predator_ACT_AllyViolentStrike: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_Death_Node_2_0"
		},
		Ascension_VitalityVoid_ACT_CombatDeath: {
			referenceString: "AMER_UI_Ascension_Entropy_Death_Node_2_1"
		},
		Ascension_Predator_MUTA_RecoverAPOnKill: {
			referenceString: "AMER_UI_Ascension_Entropy_Death_Node_3_0"
		},
		Ascension_VitalityVoid_MUTA_Wither: {
			referenceString: "AMER_UI_Ascension_Entropy_Death_Node_3_1"
		},
		Ascension_Predator_MUTA_BloatedCorpseOnKill: {
			referenceString: "AMER_UI_Ascension_Entropy_Death_Node_4_0"
		},
		Ascension_VitalityVoid_MUTA_CorpseSkitterers: {
			referenceString: "AMER_UI_Ascension_Entropy_Death_Node_4_1"
		},
		Ascension_BHThreshold_AlwaysSufficient: {
			referenceString: "AMER_UI_Ascension_Entropy_Death_Node_4_2"
		},
		Ascension_Wither_ACT_CorpseExploded: {
			referenceString: "AMER_UI_Ascension_Entropy_Decay_Node_2_0"
		},
		Ascension_Skill_Haruspicy: {
			referenceString: "AMER_UI_Ascension_Entropy_Decay_Node_4_2"
		},
		// mag fin
		Ascension_Adaptation_ACT_Paucity: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_2_0"
		},
		Ascension_Skill_CorpseMastery: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_2_1"
		},
		Ascension_SummonsFloat: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_2_3"
		},
		Ascension_Adaptation_MUTA_AdaptSpend_DemiLich_A: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_3_0"
		},
		Ascension_Occultist_MUTA_PreexistingBHStacks: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_3_1"
		},
		Ascension_Adaptation_MUTA_AdaptSpend_DemiLich_B: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_4_0"
		},
		Ascension_Occultist_MUTA_Adapt: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_4_1"
		},
		Ascension_DemilichCannotDie: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_4_2"
		},
		Ascension_Skill_BoneshapedCrusher: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_4_3"
		},
		Ascension_DemilichHealConversion: {
			referenceString: "AMER_UI_Ascension_Entropy_Demilich_Node_5"
		},
		Ascension_Abeyance_MUTA_CleanseTiered1And2: {
			referenceString: "AMER_UI_Ascension_Form_TheChalice_Node_4_0"
		},
		Ascension_Adaptation_MUTA_EleRes: {
			referenceString: "AMER_UI_Ascension_Form_TheChalice_Node_4_1"
		},
		// mage fin
		Ascension_Centurion_ACT_MissedByAttack: {
			referenceString: "AMER_UI_Ascension_Form_TheKey_Node_3_0"
		},
		Ascension_Occultist_ACT_AtaxiaSquelched: {
			referenceString: "AMER_UI_Ascension_Form_TheKey_Node_3_1"
		},
		Ascension_Occultist_MUTA_Calcifying: {
			referenceString: "AMER_UI_Ascension_Form_TheKey_Node_4_1"
		},
		Ascension_WeaponSkillShieldsUpAggro: {
			referenceString: "AMER_UI_Ascension_Form_TheNautilus_Node_2_1"
		},
		// sortil
		// mk2 thing? down here
		Ascension_Presence_MUTA_BaseEleRes: {
			referenceString: "AMER_UI_Ascension_Form_TheSilkworm_Node_2_1"
		},
		Ascension_Occultist_ACT_EndOfTurnFreeOffHand: {
			referenceString: "AMER_UI_Ascension_Form_TheBasilisk_Node_2_0"
		},
		Ascension_Wither_ACT_Calcifying: {
			referenceString: "AMER_UI_Ascension_Form_TheBasilisk_Node_2_1"
		},
		Ascension_Occultist_MUTA_EmulatePetrifyingVisage: {
			referenceString: "AMER_UI_Ascension_Form_TheBasilisk_Node_3_0"
		},
		Ascension_Occultist_MUTA_Slowed2: {
			referenceString: "AMER_UI_Ascension_Form_TheBasilisk_Node_3_1"
		},
		Ascension_Adaptation_ACT_MK2_IncarnateInfus: {
			referenceString: "AMER_UI_Ascension_Form_Doppelganger_Node_3_0"
		},
		Ascension_Occultist_ACT_AlliedSummonKilled: {
			referenceString: "AMER_UI_Ascension_Form_Doppelganger_Node_3_1"
		},
		Ascension_Adaptation_MUTA_AllRegen: {
			referenceString: "AMER_UI_Ascension_Form_Doppelganger_Node_4_0"
		},
		Ascension_Occultist_MUTA_EmulateThrowDust: {
			referenceString: "AMER_UI_Ascension_Form_Doppelganger_Node_4_1"
		},
		// summon limit to 2
		Ascension_Defiance_ACT_MK2_NonSummonAllyCount: {
			referenceString: "AMER_UI_Ascension_Form_TheDragon_Node_2_3"
		},
		Ascension_Abeyance_MUTA_ThresholdFromWitsPower: {
			referenceString: "AMER_UI_Ascension_Form_TheDragon_Node_3_0"
		},
		Ascension_Centurion_ACT_AllyPredator: {
			referenceString: "AMER_UI_Ascension_Form_TheDragon_Node_3_1"
		},
		Ascension_Abeyance_MUTA_AdaptSpendFireAoE: {
			referenceString: "AMER_UI_Ascension_Form_TheDragon_Node_4_0"
		},
		Ascension_Abeyance_MUTA_TotemsAttackConversion: {
			referenceString: "AMER_UI_Ascension_Form_TheDragon_Node_4_1"
		},
		Ascension_Centurion_MUTA_EmulateDragonBlaze: {
			referenceString: "AMER_UI_Ascension_Form_TheDragon_Node_4_2"
		},
		Ascension_Centurion_ACT_MissedByAttack: {
			referenceString: "AMER_UI_Ascension_Form_TheGryphon_Node_2_0"
		},
		Ascension_Ward_ACT_DamageBuffer: {
			referenceString: "AMER_UI_Ascension_Form_TheGryphon_Node_2_1"
		},
		// Ascension_Ward_ACT_MK2_CritByEnemy: {
		// 	referenceString: ""
		// },
		// ???
		Ascension_Centurion_ACT_MissedByAttack_MK2_OnAoO: {
			referenceString: "AMER_UI_Ascension_Form_TheGryphon_Node_2_3"
		},
		Ascension_Centurion_MUTA_AdaptationStacks: {
			referenceString: "AMER_UI_Ascension_Form_TheGryphon_Node_3_0"
		},
		Ascension_Centurion_MUTA_CritAdaptStacks: {
			referenceString: "AMER_UI_Ascension_Form_TheGryphon_Node_3_1"
		},
		Ascension_Ward_MUTA_AdaptationStacks: {
			referenceString: "AMER_UI_Ascension_Form_TheGryphon_Node_3_2"
		},
		// ??
		Ascension_Abeyance_MUTA_BufferDRFormInertiaScaling: {
			referenceString: "AMER_UI_Ascension_Form_Wealth_Node_3_0"
		},
		Ascension_Adaptation_ACT_MK2_Flurry: {
			referenceString: "AMER_UI_Ascension_Form_Wealth_Node_3_1"
		},
		Ascension_Abeyance_MUTA_TotemSac: {
			referenceString: "AMER_UI_Ascension_Form_Wealth_Node_4_0"
		},
		Ascension_Adaptation_MUTA_FortifyOpenEyes: {
			referenceString: "AMER_UI_Ascension_Form_Wealth_Node_4_1"
		},
		Ascension_Adaptation_MUTA_MeteorShowerSI: {
			referenceString: "AMER_UI_Ascension_Form_Wealth_Node_4_2"
		},
		Ascension_Adaptation_ACT_Cannibalize: {
			referenceString: "AMER_UI_Ascension_Form_Cerberus_Node_2_0"
		},
		Ascension_Ward_MUTA_DWDamagePerTotem: {
			referenceString: "AMER_UI_Ascension_Form_Cerberus_Node_2_1"
		},
		// floating summon
		Ascension_Adaptation_MUTA_InitMovementCon: {
			referenceString: "AMER_UI_Ascension_Form_Cerberus_Node_3_0"
		},
		Ascension_Ward_MUTA_Skitterer: {
			referenceString: "AMER_UI_Ascension_Form_Cerberus_Node_3_1"
		},
		Ascension_Adaptation_MUTA_MassForHeroes: {
			referenceString: "AMER_UI_Ascension_Form_Cerberus_Node_4_0"
		},
		Ascension_Adaptation_MUTA_MassForSummons: {
			referenceString: "AMER_UI_Ascension_Form_Cerberus_Node_4_1"
		},
		Ascension_SkitterersOnSummonDeath: {
			referenceString: "AMER_UI_Ascension_Form_Cerberus_Node_4_3"
		},
		// mag fin
		Ascension_Occultist_ACT_RitualReaction: {
			referenceString: "AMER_UI_Ascension_Form_TheRitual_Node_2_0"
		},
		Ascension_Wither_MUTA_2HDodgePenalty: {
			referenceString: "AMER_UI_Ascension_Form_TheRitual_Node_2_1"
		},
		// summons float
		Ascension_Occultist_MUTA_TotemsAttack: {
			referenceString: "AMER_UI_Ascension_Form_TheRitual_Node_4_0"
		},
		Ascension_Wither_ACT_TheRitual: {
			referenceString: "AMER_UI_Ascension_Form_TheRitual_Node_4_1"
		},
		Ascension_CannotDie_TheRitual: {
			referenceString: "AMER_UI_Ascension_Form_TheRitual_Node_4_2"
		},
		Ascension_TotemsDupeOnDeath: {
			referenceString: "AMER_UI_Ascension_Form_TheRitual_Node_4_3"
		},
		Ascension_Centurion_MUTA_FreeOHEmulateSilencingStare: {
			referenceString: "AMER_UI_Ascension_Form_Sphinx_Node_2_1"
		},
		Ascension_Abeyance_MUTA_AdaptSpendBufferReduce: {
			referenceString: "AMER_UI_Ascension_Form_Sphinx_Node_3_0"
		},
		Ascension_Centurion_MUTA_AdaptationStacks: {
			referenceString: "AMER_UI_Ascension_Form_Sphinx_Node_3_1"
		},
		Ascension_Demolitionist_AdaptSpenderSIBoost: {
			referenceString: "AMER_UI_Ascension_Form_Sphinx_Node_3_2"
		},
		Ascension_Abeyance_MUTA_NonLethal: {
			referenceString: "AMER_UI_Ascension_Form_Sphinx_Node_4_0"
		},
		Ascension_Centurion_MUTA_AdaptSpendEmulateChainLight: {
			referenceString: "AMER_UI_Ascension_Form_Sphinx_Node_4_1"
		},
		Ascension_SourceGen_Dynamo: {
			referenceString: "AMER_UI_Ascension_Form_Sphinx_Node_4_2"
		},
		// Ascension_WeaponSkillShieldsUpAggro: {
		// 	referenceString: ""
		// },
		//another time
		// presence ele
		Ascension_Presence_MUTA_MK2_PhysRes: {
			referenceString: "AMER_UI_Ascension_Inertia_TheAuroch_Node_2_1"
		},
		// Ascension_Ward_ACT_DamageBuffer: {
		// 	referenceString: ""
		// },
		Ascension_Benevolence_MUTA_SourceGenReward: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCrab_Node_4_0"
		},
		Ascension_Celestial_ACT_BHStacks: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGuardsman_Node_3_0"
		},
		Ascension_Centurion_ACT_HitAlly: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGuardsman_Node_3_1"
		},
		Ascension_Celestial_MUTA_CleanseNonTiered: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGuardsman_Node_4_0"
		},
		Ascension_Centurion_MUTA_Taunt: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGuardsman_Node_4_1"
		},
		Ascension_Benevolence_ACT_MK2_FreeOHPaucityPurity: {
			referenceString: "AMER_UI_Ascension_Life_Pegasus_Node_2_0"
		},
		// bh celestial
		Ascension_Celestial_ACT_MK2_ElemStacks: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCasque_Node_3_2"
		},
		Ascension_Benevolence_MUTA_FlatArmor: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCasque_Node_4_0"
		},
		Ascension_Celestial_MUTA_DupeOnSelf: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCasque_Node_4_1"
		},
		Ascension_Centurion_MUTA_DefianceBHStacks: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCenturion_Node_2_3"
		},
		Ascension_Centurion_ACT_HitAlly: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCenturion_Node_3_0"
		},
		Ascension_CenturionAndCelestial_MUTA_WardACTGenExtend: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCenturion_Node_3_1"
		},
		Ascension_Centurion_ACT_HitAlly_MK2_ACTOnWard: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCenturion_Node_3_2"
		},
		Ascension_Centurion_MUTA_SIRupturedTendons: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCenturion_Node_4_0"
		},
		Ascension_Centurion_MUTA_DamageAndViolentStrikeACT: {
			referenceString: "AMER_UI_Ascension_Inertia_TheCenturion_Node_4_1"
		},
		Ascension_Adaptation_MUTA_BenevolenceACT: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGladiator_Node_3_0"
		},
		// ward
		Ascension_Ward_ACT_MK2_DualWieldDodge: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGladiator_Node_3_2"
		},
		Ascension_Benevolence_MUTA_AdaptStacks: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGladiator_Node_4_0"
		},
		Ascension_Ward_MUTA_HealAndRemoveBHStacks: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGladiator_Node_4_1"
		},
		Ascension_Centurion_MUTA_RestoreArmorAddDamageFromArmor: {
			referenceString: "AMER_UI_Ascension_Inertia_TheGladiator_Node_4_2"
		},
		Ascension_Celestial_ACT_AllyCrit: {
			referenceString: "AMER_UI_Ascension_Inertia_TheHippopotamus_Node_2_0"
		},
		Ascension_Prosperity_ACT_Basic_MK2_Ward: {
			referenceString: "AMER_UI_Ascension_Inertia_TheHippopotamus_Node_2_2"
		},
		Ascension_Celestial_MUTA_ArmorRestoInertiaScaling: {
			referenceString: "AMER_UI_Ascension_Inertia_TheHippopotamus_Node_3_0"
		},
		Ascension_Celestial_MUTA_ViolentStrikeForAlly: {
			referenceString: "AMER_UI_Ascension_Inertia_TheHippopotamus_Node_3_1"
		},
		Ascension_Abeyance_MUTA_DamageOrder: {
			referenceString: "AMER_UI_Ascension_Inertia_TheRhinoceros_Node_2_0"
		},
		Ascension_Centurion_ACT_EnemyT3StatusOnAlly: {
			referenceString: "AMER_UI_Ascension_Inertia_TheRhinoceros_Node_2_1"
		},
		Ascension_Abeyance_MUTA_EmulateShieldsUp: {
			referenceString: "AMER_UI_Ascension_Inertia_TheRhinoceros_Node_3_0"
		},
		Ascension_Centurion_MUTA_EmulateBattleStomp: {
			referenceString: "AMER_UI_Ascension_Inertia_TheRhinoceros_Node_3_1"
		},
		Ascension_Centurion_ACT_EndOfTurnDefiance: {
			referenceString: "AMER_UI_Ascension_Inertia_TheArena_Node_2_0"
		},
		Ascension_Prosperity_MUTA_DWAccCrit: {
			referenceString: "AMER_UI_Ascension_Inertia_TheArena_Node_2_1"
		},
		Ascension_Centurion_MUTA_AtaxiaAndSquelch2: {
			referenceString: "AMER_UI_Ascension_Inertia_TheArena_Node_3_0"
		},
		Ascension_Prosperity_MUTA_EffectiveSI_Poly: {
			referenceString: "AMER_UI_Ascension_Inertia_TheArena_Node_3_1"
		},
		Ascension_Centurion_MUTA_WhirlwindConversion: {
			referenceString: "AMER_UI_Ascension_Inertia_TheArena_Node_4_0"
		},
		Ascension_Celestial_ACT_Offensive: {
			referenceString: "AMER_UI_Ascension_Inertia_Champion_Node_2_0"
		},
		Ascension_Ward_MUTA_EncourageReaction: {
			referenceString: "AMER_UI_Ascension_Inertia_Champion_Node_2_1"
		},
		Ascension_Celestial_MUTA_EnemyEmulateSpells: {
			referenceString: "AMER_UI_Ascension_Inertia_Champion_Node_3_0"
		},
		Ascension_Celestial_MUTA_WardShareAndAPRec: {
			referenceString: "AMER_UI_Ascension_Inertia_Champion_Node_4_0"
		},
		Ascension_Defiance_MUTA_PreparedAP: {
			referenceString: "AMER_UI_Ascension_Inertia_Fortress_Node_1_3"
		},
		Ascension_Benevolence_ACT_AllyArmorToZero: {
			referenceString: "AMER_UI_Ascension_Inertia_Fortress_Node_2_0"
		},
		Ascension_Abeyance_MUTA_ComebackKid: {
			referenceString: "AMER_UI_Ascension_Inertia_Fortress_Node_3_0"
		},
		Ascension_Benevolence_MUTA_SelfArmorHeal: {
			referenceString: "AMER_UI_Ascension_Inertia_Fortress_Node_3_1"
		},
		Ascension_Abeyance_MUTA_Fortress: {
			referenceString: "AMER_UI_Ascension_Inertia_Fortress_Node_4_0"
		},
		Ascension_Benevolence_MUTA_Stockpile: {
			referenceString: "AMER_UI_Ascension_Inertia_Fortress_Node_4_1"
		},
		Ascension_Defiance_MUTA_FlatArmorModerate: {
			referenceString: "AMER_UI_Ascension_Life_TheBeetle_Node_2_0"
		},
		// shiled up
		Ascension_Celestial_ACT_AllySource: {
			referenceString: "AMER_UI_Ascension_Life_TheHind_Node_3_0"
		},
		Ascension_Elementalist_ACT_AirWater_AllySkills: {
			referenceString: "AMER_UI_Ascension_Life_TheHind_Node_3_1"
		},
		Ascension_Celestial_MUTA_ExtendSourceGen: {
			referenceString: "AMER_UI_Ascension_Life_TheHind_Node_4_0"
		},
		Ascension_Elementalist_MUTA_AirWater_NonTieredStatuses: {
			referenceString: "AMER_UI_Ascension_Life_TheHind_Node_4_1"
		},
		// fin
		// sort
		// presence ele
		Ascension_Presence_MUTA_MK2_VitRegen: {
			referenceString: "AMER_UI_Ascension_Life_TheLizard_Node_2_1"
		},
		// ?
		Ascension_Purity_ACT_VitThreshold: {
			referenceString: "AMER_UI_Ascension_Life_TheNymph_Node_3_1"
		},
		Ascension_Prosperity_MUTA_BuffDurationAndRes: {
			referenceString: "AMER_UI_Ascension_Life_TheRabbit_Node_4_0"
		},
		Ascension_Elementalist_ACT_CenturionOrWeak3: {
			referenceString: "AMER_UI_Ascension_Life_TheEnchantress_Node_3_0"
		},
		Ascension_Prosperity_ACT_ElemStacks: {
			referenceString: "AMER_UI_Ascension_Life_TheEnchantress_Node_3_1"
		},
		Ascension_Purity_MUTA_ElemStacksMinus: {
			referenceString: "AMER_UI_Ascension_Life_TheEnchantress_Node_4_0"
		},
		Ascension_Elementalist_MUTA_FeedbackCritAndRes: {
			referenceString: "AMER_UI_Ascension_Life_TheEnchantress_Node_4_1"
		},
		Ascension_Prosperity_MUTA_EffectiveSI_AirWater: {
			referenceString: "AMER_UI_Ascension_Life_TheEnchantress_Node_4_2"
		},
		Ascension_Prosperity_ACT_Basic_MK2_FlurrySI: {
			referenceString: "AMER_UI_Ascension_Life_TheHuntress_Node_3_0"
		},
		// purity
		Ascension_Purity_ACT_MK2_ProsperityLost: {
			referenceString: "AMER_UI_Ascension_Life_TheHuntress_Node_3_1"
		},
		Ascension_Prosperity_MUTA_SkillDurAndStatBoost: {
			referenceString: "AMER_UI_Ascension_Life_TheHuntress_Node_4_0"
		},
		Ascension_Prosperity_MUTA_EffectiveSI_Hunts: {
			referenceString: "AMER_UI_Ascension_Life_TheHuntress_Node_4_1"
		},
		Ascension_Purity_MUTA_CDReduc: {
			referenceString: "AMER_UI_Ascension_Life_TheHuntress_Node_4_2"
		},
		Ascension_Celestial_ACT_AllyPaucityPurity: {
			referenceString: "AMER_UI_Ascension_Life_TheNymph_Node_3_0"
		},
		// purity
		Ascension_Purity_MUTA_MK2_CelestialCDReduc: {
			referenceString: "AMER_UI_Ascension_Life_TheNymph_Node_3_2"
		},
		Ascension_Celestial_MUTA_GiveSourceSI: {
			referenceString: "AMER_UI_Ascension_Life_TheNymph_Node_4_0"
		},
		Ascension_Purity_MUTA_EmulateSpontCombSI: {
			referenceString: "AMER_UI_Ascension_Life_TheNymph_Node_4_2"
		},
		Ascension_Benevolence_ACT_MK2_FreeOH_PaucityPurity: {
			referenceString: "AMER_UI_Ascension_Life_Pegasus_Node_2_0"
		},
		Ascension_Elementalist_ACT_AirWater_AllySkills: {
			referenceString: "AMER_UI_Ascension_Life_Pegasus_Node_2_1"
		},
		Ascension_Elementalist_ACT_AirWater_AllySkills_MK2_HuntsWar: {
			referenceString: "AMER_UI_Ascension_Life_Pegasus_Node_2_3"
		},
		Ascension_Benevolence_MUTA_HealAndEleRes: {
			referenceString: "AMER_UI_Ascension_Life_Pegasus_Node_3_0"
		},
		Ascension_Benevolence_MUTA_PurityACT_CDReduc: {
			referenceString: "AMER_UI_Ascension_Life_Pegasus_Node_3_1"
		},
		Ascension_Elementalist_MUTA_ElemStackMinusFromCelestial: {
			referenceString: "AMER_UI_Ascension_Life_Pegasus_Node_3_2"
		},
		// cele source
		Ascension_Celestial_ACT_MK2_NoVitThreshold: {
			referenceString: "AMER_UI_Ascension_Life_TheStag_Node_2_0"
		},
		Ascension_ViolentStrike_ACT_AllyBHCleanse: {
			referenceString: "AMER_UI_Ascension_Life_TheStag_Node_2_1"
		},
		Ascension_Celestial_MUTA_Haste: {
			referenceString: "AMER_UI_Ascension_Life_TheStag_Node_3_0"
		},
		Ascension_Celestial_MUTA_MagicShell: {
			referenceString: "AMER_UI_Ascension_Life_TheStag_Node_3_1"
		},
		Ascension_ViolentStrike_MUTA_GlaciateIgnition: {
			referenceString: "AMER_UI_Ascension_Life_TheStag_Node_3_2"
		},
		Ascension_Celestial_ACT_AllyWard: {
			referenceString: "AMER_UI_Ascension_Life_TheGoddess_Node_2_0"
		},
		Ascension_Celestial_MUTA_ArmorRestoLifeScaling: {
			referenceString: "AMER_UI_Ascension_Life_TheGoddess_Node_2_1"
		},
		Ascension_Benevolence_MUTA_EmulateCelestialHeal: {
			referenceString: "AMER_UI_Ascension_Life_TheGoddess_Node_3_0"
		},
		Ascension_Celestial_MUTA_CleanseBH: {
			referenceString: "AMER_UI_Ascension_Life_TheGoddess_Node_3_1"
		},
		Ascension_Benevolence_MUTA_GainNoStacks: {
			referenceString: "AMER_UI_Ascension_Life_TheGoddess_Node_4_0"
		},
		Ascension_Celestial_ACT_SIResurrect: {
			referenceString: "AMER_UI_Ascension_Life_TheGoddess_Node_4_1"
		},
		Ascension_GoddessReactionAP: {
			referenceString: "AMER_UI_Ascension_Life_TheGoddess_Node_4_2"
		},
		Ascension_Purity_ACT_ShieldsUp: {
			referenceString: "AMER_UI_Ascension_Life_Hope_Node_2_0"
		},
		// might be bugged
		Ascension_Centurion_MUTA_FreeOHCritCHance: {
			referenceString: "AMER_UI_Ascension_Life_Hope_Node_2_1"
		},
		Ascension_Centurion_MUTA_PurityGivesCenturionScaling: {
			referenceString: "AMER_UI_Ascension_Life_Hope_Node_3_0"
		},
		Ascension_Centurion_MUTA_EmulateSupernova: {
			referenceString: "AMER_UI_Ascension_Life_Hope_Node_3_1"
		},
		Ascension_Purity_MUTA_BlindingRadiance: {
			referenceString: "AMER_UI_Ascension_Life_Hope_Node_3_2"
		},
		Ascension_Centurion_ACT_TeleportStrike: {
			referenceString: "AMER_UI_Ascension_Life_Hope_Node_4_0"
		},
		Ascension_Purity_MUTA_EffectiveSI_AirFire: {
			referenceString: "AMER_UI_Ascension_Life_Hope_Node_4_1"
		},
		// fin
		Ascension_Prosperity_ACT_Purity: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_2_0"
		},
		Ascension_Elementalist_MUTA_RadiusAndNoFF: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_3_0"
		},
		// these 2 are both the same node
		Ascension_Skill_Ignition_Duplicate: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_3_1",
			strings: ["When you cast Ignition, emulate its effects."]
		},
		Ascension_Prosperity_MUTA_ScorchAppliesCharged: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_3_1",
			strings: ["If you have Prosperity when you apply Scorched to an enemy, also apply Charged for 1 turn."]
		},
		Ascension_Elementalist_MUTA_SplendorNova: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_4_0"
		},
		Ascension_Prosperity_MUTA_SplendorSource: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_4_2"
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
	attributeNamesShort: {
		"str": "Str",
		"fin": "Fin",
		"pwr": "Pwr",
		"con": "Con",
		"mem": "Mem",
		"wits": "Wits",
	},
	attributeIcons: {
		"str": "strength",
		"fin": "finesse",
		"pwr": "intelligence",
		"con": "constitution",
		"mem": "memory",
		"wits": "wits",
	},
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
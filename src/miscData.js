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
	Ascension_VitalityVoid_MUTA_Wither: ["Wither"],
	Ascension_Occultist_MUTA_Adapt: ["Adaptation"],
	Ascension_Abeyance_MUTA_AdaptSpendFireAoE: ["Adaptation"],
	Ascension_Centurion_MUTA_AdaptationStacks: ["Adaptation"],
	Ascension_Centurion_MUTA_CritAdaptStacks: ["Adaptation"],
	Ascension_Ward_MUTA_AdaptationStacks: ["Adaptation"],
	Ascension_Abeyance_MUTA_AdaptSpendBufferReduce: ["Adaptation"],
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
	Ascension_Prosperity_ACT_Basic_MK2_Ward: ["Ward"],

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

export const artifactCategories = {
	weapons: [
		"thebutchersdisciple",
		"thechthonian",
		"famine",
		"golem",
		"vertigo",
		"convergence",
		"expedition",
		"hibernaculum",
		"momentum",
		"zenith",
		"cataclysm",
		"leper",
		"mirage",
		"occam",
		"thirst",
		"wraith",
		"thecrucible",
		"glacier",
		"goldforge",
		"leviathan",
		"malleusmaleficarum",
		"gluttony",
		"impetus",
		"lightspire",
		"nightmare",
		"pestilence",
		"thecannibal",
		"eclipse",
		"obelisk",
		"thesavage",
		"zodiac",
		"blackglassbrand",
		"gramswordofgrief",
		"judgement",
		"lambentblade",
		"zeal",
		"rodofabeyance",
		"rodofcommand",
		"rodofconviction",
		"pariah",
		"rapture",
		"sanguineharvest",
	],
	shields: [
		"adamant",
		"amaranthinebulwark",
		"faceofthefallen",
		"infernalcontract",
		"prismaticbarrier"
	],
	boots: [
		"absence",
		"consecration",
		"desperation",
		"godspeed",
		"kudzu",
		"onslaught",
		"salamander",
		"silkclimb",
		"trample",
		"vortex",
	],
	chests: [
		"abyss",
		"antediluviancarapace",
		"bloodforge",
		"bountyhunter",
		"coruscatingsilks",
		"empyreanvestments",
		"thejaguar",
		"malice",
		"mountain",
		"necromancersraiment",
		"nemesis",
		"nihility",
		"ouroboros",
		"urgency",
		"thevault",
	],
	gloves: [
		"apothecarysguile",
		"thebutcherswill",
		"charity",
		"dominion",
		"ethertide",
		"fistofdecay",
		"pyre",
		"redorison",
		"wintersgrasp",
	],
	helmets: [
		"giantsskull",
		"ironmaiden",
		"thelocustcrown",
		"misery",
		"serenity",
		"smother",
		"thornhalo",
		"tundra",
		"paragon"
	],
	amulets: [
		"angelsegg",
		"arcturus",
		"drogsluck",
		"ghostflame",
		"seraph",
		"wendigo"
	],
	rings: [
		"austerity",
		"carnality",
		"dread",
		"exaltation",
		"eyeofthestorm",
		"fecundity",
		"prophecy",
	]
}

export const playerAttributes = 43
export const maxNaturalAttributeInvestment = 30

// list of artifacts that grant stats, and which ones. some are toggleable, others are always active
export const artifactBoosts = {
	// absence
	abyss: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Abyss",
                value: 1.0,
				keywords: [{keyword: "Paucity", keywordBoon: "activator"}, {keyword: "ViolentStrike", keywordBoon: "mutator"}]
            }
		]
	},
	adament: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Adamant",
                value: 1.0,
				keywords: [{keyword: "Ward", keywordBoon: "mutator"}]
            }
		]
	},
	amaranthinebulwark: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_AmaranthineBulwark",
                value: 1.0,
				keywords: [{keyword: "Ward", keywordBoon: "mutator"}]
            }
		]
	},
	angelsegg: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_AngelsEgg",
                value: 1.0,
				keywords: [{keyword: "Purity", keywordBoon: "mutator"}]
            }
		]
	},
	antediluviancarapace: {
		innate: [],
		statuses: ["PIP_Artifact_AntediluvianCarapace"]
	},
	// apothecary guile
	arcturus: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Arcturus",
                value: 1.0,
				keywords: [{keyword: "Centurion", keywordBoon: "mutator"}, {keyword: "Ward", keywordBoon: "activator"}]
            }
		]
	},
	austerity: {
		innate: [
			{
                type: "flexStat",
                id: "PHYSICALRESISTANCE",
                value: 20.0,
			},
			{
                type: "flexStat",
                id: "PIERCINGRESISTANCE",
                value: 20.0,
            },
		]
	},
	blackglassbrand: {
		innate: [
			{
                type: "flexStat",
                id: "FreeReactionCharge_AMER_Centurion",
                value: 1.0,
			},
		]
	},
	// bloodforge - should we include this?
	// bounty hunter
	carnality: {
		innate: [
			{
                type: "flexStat",
                id: "FIRERESISTANCE",
                value: 30.0,
			},
			{
                type: "flexStat",
                id: "WATERRESISTANCE",
                value: 30.0,
			},
			{
                type: "flexStat",
                id: "EARTHRESISTANCE",
                value: 30.0,
			},
			{
                type: "flexStat",
                id: "AIRRESISTANCE",
                value: 30.0,
			},
			{
                type: "flexStat",
                id: "POISONRESISTANCE",
                value: 30.0,
			},
		]
	},
	// CATACLYSM
	charity: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Charity",
                value: 1.0,
				keywords: [{keyword: "Benevolence", keywordBoon: "mutator"}]
            }
		]
	},
	consecration: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Consecration",
                value: 1.0,
				keywords: [{keyword: "Celestial", keywordBoon: "mutator"}]
            }
		]
	},
	// convergence
	// corruscating silks
	// desperation
	// dominion
	dread: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Dread",
                value: 1.0,
				keywords: [{keyword: "Vitality Void", keywordBoon: "mutator"}]
            }
		],
		statuses: ["PIP_Artifact_Dread"]
	},
	drogsluck: {
		innate: [],
		statuses: ["PIP_Artifact_DrogsLuck"]
	},
	// eclipse
	// empyrean vestments
	// ether tide
	exaltation: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Exaltation",
                value: 1.0,
				keywords: [{keyword: "ViolentStrike", keywordBoon: "mutator"}]
            }
		]
	},
	expedition: {
		innate: [],
		statuses: ["PIP_Artifact_Expedition"]
	},
	eyeofthestorm: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_EyeOfTheStorm",
                value: 1.0,
				keywords: [{keyword: "Predator", keywordBoon: "mutator"}]
            }
		],
		statuses: ["PIP_Artifact_EyeOfTheStorm"]
	},
	faceofthefallen: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_FaceOfTheFallen",
                value: 1.0,
				keywords: [{keyword: "Voracity", keywordBoon: "activator"}]
            }
		]
	},
	famine: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Famine",
                value: 1.0,
				keywords: [{keyword: "Paucity", keywordBoon: "mutator"}]
            }
		]
	},
	// fecundity
	fistofdecay: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_FistOfDecay",
                value: 1.0,
				keywords: [{keyword: "VitalityVoid", keywordBoon: "activator"}]
            }
		]
	},
	ghostflame: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_GhostFlame",
                value: 1.0,
				keywords: [{keyword: "Occultist", keywordBoon: "mutator"}]
            }
		]
	},
	// giants skull
	// glacier
	// gluttony
	// godspeed
	goldforge: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Goldforge",
                value: 1.0,
				keywords: [{keyword: "Prosperity", keywordBoon: "mutator"}, {keyword: "VolatileArmor", keywordBoon: "activator"}]
            }
		]
	},
	golem: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Golem",
                value: 1.0,
				keywords: [{keyword: "Prosperity", keywordBoon: "mutator"}]
            }
		]
	},
	// gram
	// hibernaculum
	// impetus
	infernalcontract: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_InfernalContract",
                value: 1.0,
				keywords: [{keyword: "Wither", keywordBoon: "activator"}]
            }
		]
	},
	// iron maiden
	judgement: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Judgement",
                value: 1.0,
				keywords: [{keyword: "ViolentStrike", keywordBoon: "mutator"}]
            }
		]
	},
	kudzu: {
		innate: [],
		statuses: ["PIP_Artifact_Kudzu"]
	},
	// lambent blade
	// leper
	leviathan: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Leviathan",
                value: 1.0,
				keywords: [{keyword: "ViolentStrike", keywordBoon: "mutator"}]
            }
		],
		statuses: ["PIP_Artifact_Leviathan"]
	},
	// lightspire
	// malice
	// malleusmaleficarum
	// mirage
	// misery
	// momentum - todo add rune penalty
	necromancersraiment: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_NecromancersRaiment",
                value: 1.0,
				keywords: [{keyword: "Wither", keywordBoon: "mutator"}]
            }
		]
	},
	nemesis: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Nemesis",
                value: 1.0,
				keywords: [{keyword: "ViolentStrike", keywordBoon: "activator"}]
            }
		]
	},
	// nightmare
	nihility: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Nihility",
                value: 1.0,
				keywords: [{keyword: "VitalityVoid", keywordBoon: "activator"}]
            }
		]
	},
	// obelisk
	// occam
	onslaught: {
		innate: [],
		statuses: ["PIP_Artifact_Onslaught"]
	},
	// ouroboros
	paragon: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Paragon",
                value: 1.0,
				keywords: [{keyword: "VitalityVoid", keywordBoon: "activator"}, {keyword: "VitalityVoid", keywordBoon: "mutator"}, {keyword: "Benevolence", keywordBoon: "mutator"},]
            }
		]
	},
	// pariah - should maybe have a status for this
	// pestilence
	prismaticbarrier: {
		innate: [
			{
				type: "specialLogic",
				id: "PIP_Artifact_PrismaticBarrier",
				value: 1.0,
				keywords: [{keyword: "Prosperity", keywordBoon: "mutator"}]
			}
	],
		statuses: ["PIP_Artifact_PrismaticBarrier"]
	},
	// prophecy todo
	// pyre
	rapture: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Rapture",
                value: 1.0,
				keywords: [{keyword: "Celestial", keywordBoon: "mutator"}, {keyword: "Purity", keywordBoon: "activator"}]
            }
		]
	},
	redorison: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_RedOrison",
                value: 1.0,
				keywords: [{keyword: "Celestial", keywordBoon: "mutator"}, {keyword: "Occultist", keywordBoon: "mutator"}]
            }
		]
	},
	rodofabeyance: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_RodOfAbeyance",
                value: 1.0,
				keywords: [{keyword: "Abeyance", keywordBoon: "mutator"}]
            }
		]
	},
	rodofcommand: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_RodOfCommand",
                value: 1.0,
				keywords: [{keyword: "ViolentStrike", keywordBoon: "mutator"}]
            }
		]
	},
	rodofcommarodofconvictionnd: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_RodOfConviction",
                value: 1.0,
				keywords: [{keyword: "VolatileArmor", keywordBoon: "activator"}]
            }
		]
	},
	// salamander
	sanguineharvest: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_SanguineHarvest",
                value: 1.0,
				keywords: [{keyword: "ViolentStrike", keywordBoon: "activator"}]
            }
		]
	},
	seraph: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Seraph",
                value: 1.0,
				keywords: [{keyword: "Celestial", keywordBoon: "mutator"}]
			},
			{
				type: "extendedStat",
				id: "FreeReactionCharge_AMER_Celestial",
				value: 1.0,
			}
		]
	},
	serenity: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Serenity",
                value: 1.0,
				keywords: [{keyword: "Purity", keywordBoon: "mutator"}]
            }
		]
	},
	// silkclimb
	// smother
	thebutchersdisciple: {
		innate: [],
		statuses: ["PIP_Artifact_TheButchersDisciple"]
	},
	thebutcherswill: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_TheButchersWill",
                value: 1.0,
				keywords: [{keyword: "ViolentStrike", keywordBoon: "mutator"}]
            }
		]
	},
	// thecannibal
	// cthonian
	// crucible
	// jaguar
	thelocustcrown: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_TheLocustCrown",
                value: 1.0,
				keywords: [{keyword: "Wither", keywordBoon: "mutator"}]
            }
		]
	},
	thesavage: {
		innate: [
			{
                type: "flexStat",
                id: "FireSpecialist",
                value: -1.0,
			},
			{
                type: "flexStat",
                id: "WaterSpecialist",
                value: -1.0,
			},
			{
                type: "flexStat",
                id: "EarthSpecialist",
                value: -1.0,
			},
			{
                type: "flexStat",
                id: "AirSpecialist",
                value: -1.0,
			},
			{
                type: "flexStat",
                id: "Summoning",
                value: -1.0,
            },
			{
                type: "flexStat",
                id: "Necromancy",
                value: -1.0,
            },
		]
	},
	// the vault
	// thirst
	// thorn halo
	// trample
	// tundra
	urgency: {
		innate: [],
		statuses: ["PIP_Artifact_Urgency"]
	},
	vertigo: {
		innate: [
			{
				type: "extendedStat",
				id: "PercAttributeIncrease_Finesse",
				value: 20.0,
			}
		],
		statuses: ["PIP_Artifact_Vertigo"]
	},
	vortex: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Vortex",
                value: 1.0,
				keywords: [{keyword: "VitalityVoid", keywordBoon: "mutator"}]
            }
		]
	},
	wendigo: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Wendigo",
                value: 1.0,
				keywords: [{keyword: "Predator", keywordBoon: "mutator"}]
			},
			{
				type: "extendedStat",
				id: "FreeReactionCharge_AMER_Predator",
				value: 1.0,
			}
		]
	},
	// winter grasp
	// wraith
	// zeal
	// zenith
	zodiac: {
		innate: [
			{
                type: "specialLogic",
                id: "PIP_Artifact_Zodiac",
                value: 1.0,
				keywords: [{keyword: "Celestial", keywordBoon: "mutator"}]
            }
		]
	},
}

export const statuses = {
	// PIP_Artifact_AntediluvianCarapace: {
	// 	type: "special",
	// 	id: "PIP_Artifact_AntediluvianCarapace"
	// },
	PIP_Artifact_DrogsLuck: {type: "special", id: "PIP_Artifact_DrogsLuck"},
	PIP_Artifact_Expedition: {type: "special", id: "PIP_Artifact_Expedition"},
	PIP_Artifact_EyeOfTheStorm: {type: "special", id: "PIP_Artifact_EyeOfTheStorm"},
	PIP_Artifact_Kudzu: {type: "special", id: "PIP_Artifact_Kudzu"},
	PIP_Artifact_Leviathan: {type: "special", id: "PIP_Artifact_Leviathan"},
	PIP_Artifact_Onslaught: {type: "special", id: "PIP_Artifact_Onslaught"},
	PIP_Artifact_PrismaticBarrier: {type: "special", id: "PIP_Artifact_PrismaticBarrier"},
	PIP_Artifact_Urgency: {type: "special", id: "PIP_Artifact_Urgency"},

	PeaceOfMind: {
		type: "normal",
		id: "PeaceOfMind",
		icon: "Skill_Fire_BurnMyEyes",
		boosts: [
			{type: "flexStat", id: "FINESSE", value: 3},
			{type: "flexStat", id: "INTELLIGENCE", value: 3},
			{type: "flexStat", id: "STRENGTH", value: 3},
			{type: "flexStat", id: "WITS", value: 7},
		]
	}
}

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
	keywordBasicActivator: {
		Abeyance: {
			display: "If it is not your turn, when you are dealt combat damage equivalent to at least 30% of your maximum Vitality (-0.5% per Inertia or Form embodied, minimum of 20%) at once, Abeyance activates."
		},
		Adaptation: {
			display: "Adaptation skill: 1 AP, no cooldown, activate Adaptation when cast."
		},
		Defiance: {
			display: "When you become Flanked, and when you start your turn within 5m of at least two enemies, Defiance activates for 1 turn."
		},
		IncarnateChampion: {
			display: "Summon Incarnate summons an Incarnate Champion."
		},
		Benevolence: {
			display: "Gain Mercy, 2 AP, 1 turn cooldown, activate Benevolence on each ally within 8m."
		},
		Prosperity: {
			display: "When you have at least 90% Vitality (-1% per Form or Life embodied), Prosperity is considered active."
		}
	},
	statusExtension: {
		// neat hack to get rid of duplicate text. This node grants 2 effects, one for each type of armor, meaning it shows 2 (same) strings in the keywords screen. This removes a duplicate.
		VolatileArmor_Physical_300_Physical_AMER_RS3_FX_VolatileArmor: {
			strings: ["", ""]
		},

	},
	scalingExtension: {},
	extraStatusApplication: {},
	specialLogic: {
		// here we can replace the default text of a node reward with others based on whether we have the node or not. this is used in the summon stats tab for example to show whether we have a second summon slot unlocked or not, so we don't show the ugly whole description of the nodes that grant it
		Ascension_SummonLimitTo2: {
			bool: true,
			referenceString: "AMER_UI_Ascension_Entropy_BloodApe_Node_4_3",
			strings: ["Can have 1 controllable summon at once.", "Can have 2 controllable summons at once."]
		},
		// these 2 are both the same node
		Ascension_Skill_Ignition_Duplicate: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_3_1",
			strings: ["", "When you cast Ignition, emulate its effects."]
		},
		Ascension_Prosperity_MUTA_ScorchAppliesCharged: {
			referenceString: "AMER_UI_Ascension_Life_Splendor_Node_3_1",
			strings: ["", "If you have Prosperity when you apply Scorched to an enemy, also apply Charged for 1 turn."]
		}
	},

}

export const aspectsAfterWePutAnHrToMakeThingsLookNice = [
	"TheSerpent", "TheTiger", "TheWolf", "TheSupplicant", "TheSilkworm", "Wealth", "TheGuardsman", "TheRhinoceros", "TheRabbit", "TheStag",
]

export const boostsWithKeywords = [
	"specialLogic", "statusExtension", "scalingExtension", "extraStatusApplication", "keywordBasicActivator"
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
export const races = {
	human: {
		name: "Human",
		innateSkill: "Shout_InspireStart",
		talents: ["ingenious", "thrifty"],
	},
	elf: {
		name: "Elf",
		innateSkill: "Shout_FleshSacrifice",
		talents: ["corpseEater", "ancestralKnowledge"],
	},
	lizard: {
		name: "Lizard",
		innateSkill: "Cone_Flamebreath",
		talents: ["spellSong", "sophisticated"],
	},
	dwarf: {
		name: "Dwarf",
		innateSkill: "Target_PetrifyingTouch",
		talents: ["dwarvenGuile", "sturdy"],
	},
}

export const lifeType = {
	living: {
		name: "Living",
		innateSkill: null,
		innateStatBoosts: [] // todo
	},
	undead: {
		name: "Undead",
		innateSkill: "Target_AMER_VampiricTouch",
		innateStatBoosts: [] // todo
	},
}

// todo rename forcedPortrait
export const origins = {
	custom: {
		name: "Custom Character",
		race: "human",
		gender: "male",
		lifeType: "alive",
		innateSkill: "Dome_CircleOfProtection",
		forcedPortrait: "human_m",
	},
	red_prince: {
		name: "The Red Prince",
		race: "lizard",
		gender: "male",
		lifeType: "alive",
		innateSkill: "Target_DemonicStare",
		forcedPortrait: "red_prince",
	},
	sebille: {
		name: "Sebille",
		race: "elf",
		gender: "female",
		lifeType: "alive",
		innateSkill: "Shout_BreakTheShackles",
		forcedPortrait: "sebille",
	},
	lohse: {
		name: "Lohse",
		race: "human",
		gender: "female",
		lifeType: "alive",
		innateSkill: "Target_MaddeningSong",
		forcedPortrait: "lohse",
	},
	ifan: {
		name: "Ifan Ben-Mezd",
		race: "human",
		gender: "male",
		lifeType: "alive",
		innateSkill: "Summon_SoulWolf",
		forcedPortrait: "ifan",
	},
	beast: {
		name: "Beast",
		race: "dwarf",
		gender: "male",
		lifeType: "alive",
		innateSkill: "Target_Squall",
		forcedPortrait: "beast",
	},
	fane: {
		name: "Fane",
		race: "human",
		gender: "male",
		lifeType: "undead",
		innateSkill: "Target_TimeWarp",
		forcedPortrait: "fane",
	}
}

export const talents = {
	dwarvenGuile: {
		name: "Dwarwen Guile",
		description: "Dwarven Guile gives you +1 in Sneaking.",
		unselectable: true,
	},
	loneWolf: {
		name: "Lone Wolf",
		description: "If you are traveling alone or with only one companion, Lone Wolf provides +4 Max AP, +4 Recovery AP, and doubles invested points in attributes - up to a maximum of 40 - and combat abilities (except Polymorph ability) - up to a maximum of 10. This bonus is inactive while there are more than two members in the current party.",
		unselectable: true,
	},
	// pet pal
	sturdy: {
		name: "Sturdy",
		description: "Sturdy gives you +10% maximum Vitality and +5% Dodging.",
		unselectable: true,
		boosts: [
			{
                type: "flexStat",
                id: "DODGEBOOST",
                value: 5.0,
			},
			{ // todo double check if this actually uses this stat
                type: "flexStat",
                id: "VITALITYBOOST",
                value: 10.0,
			},
		]
	},
	allSkilledUp: {
		name: "All Skilled Up",
		description: "All Skilled Up immediately grants you 3 extra Combat Ability point(s) and 1 extra Civil Ability point(s)",
		special: {combatAbilities: 3}
	},
	ambidextrous: {
		name: "Ambidextrous",
		description: "When your offhand is free or you are wielding a two-handed weapon, Ambidextrous reduces the cost of using grenades and scrolls by 1 AP. Additionally, when your offhand is free, you recover 1 AP after performing a basic attack (or 2 AP if you have Single Handed 10 or higher). AP recovery from basic attacks may never reduce the net-cost to less than 2 AP."
	},
	astrologersGaze: {
		name: "Astrologer's Gaze",
		description: "Astrologer's Gaze increases the range of non-melee/touch attacks, skills, scrolls, and grenades by 2m. Additionally, reduces the damage you must deal to Batter or Harry a target by 2.5% of its total vitality."
	},
	benevolent: {
		name: "Benevolent",
		description: "With Benevolent, you activate Benevolence on an ally within 8m whenever they reach Battered or Harried 7 or higher; once per round for each ally. Additionally, enemies are prevented from taking attacks of opportunity on you.",
		boosts: [
			{
                type: "specialLogic",
                id: "PIP_Talent_Benevolent",
                value: 1.0,
				keywords: [{keyword: "Benevolence", keywordBoon: "activator"}]
            }
		]
	},
	biggerAndBetter: {
		name: "Bigger and Better",
		description: "Bigger and Better immediately grants you 5 extra attribute points to spend.",
	},
	comebackKid: {
		name: "Comeback Kid",
		description: "Once per combat, if an enemy lands a fatal blow, Comeback Kid will help you bounce back to life with 30% health. If you die and are resurrected in combat, Comeback Kid will be available again.",
	},
	demolitionist: {
		name: "Demolitionist",
		description: "Demolitionist adds an extra 5m range to your grenade throws, allows you to recover the first grenade you throw each round, and unlocks Source Infusions for your grenades (except for Cluster grenades): 1: Duplicates the explosion of your grenade throw. 2: +3 repeated explosions at random locations within 3m where the grenade landed. 3: +2 repeated explosions at random locations within 3m where the grenade landed. Recover 1SP.",
	},
	demon: {
		name: "Demon",
		description: "A character with Demon has an extra 15% Fire Resistance, but takes a 15% penalty to Water Resistance. Additionally, the maximum fire resistance is raised by 10.",
		boosts: [
			{
                type: "flexStat",
                id: "FIRERESISTANCE",
                value: 15.0,
			},
			{
                type: "flexStat",
                id: "WATERRESISTANCE",
                value: -15.0,
            }
		]
	},
	elementalAffinity: {
		name: "Elemental Affinity",
		description: "Elemental Affinity lowers the Action Point cost of spells by 1, to a minimum of 1, when standing in a surface of the same element. If you are not standing in a relevant surface but your spell targets a point that is, you recover 1 Action Point after casting the spell, but only if this recovery would not reduce the net-cost of the spell below 2.",
	},
	elementalRanger: {
		name: "Elemental Ranger",
		description: "Shooting arrows will inflict 20% bonus elemental damage depending on the surface your target is standing in.",
	},
	escapist: {
		name: "Escapist",
		description: "Escapist grants the Escapist spell, which costs 1 AP, has a 1 turn cooldown, and allows you to jump to a target point within 4m of you.",
	},
	executioner: {
		name: "Executioner",
		description: "Once each round, Executioner gives you 4 extra Action Points after dealing a killing blow. Additionally, you recover 1 AP when an ally slays an enemy.",
	},
	fiveStarDinner: {
		name: "Five-Star Dinner",
		description: "Five-Star Dinner doubles the effects of food and potions",
	},
	glassCannon: {
		name: "Glass Cannon",
		description: "With Glass Cannon, you start every combat round with Maximum AP, but your Vitality, Magic Armor, and Physical Armor are reduced by 35%. Additionally, your Armour does not protect you from statuses.",
	},
	guerrilla: {
		name: "Guerrilla",
		description: "While sneaking, Guerrilla grants +40% (+3% per Scoundrel) damage. Also reduces cost of entering sneak mode by 1 AP.",
		statuses: ["PIP_Talent_Guerrilla"],
	},
	hothead: {
		name: "Hothead",
		description: "While you are at maximum Vitality or you have Prosperity active, Hothead grants you +10% critical chance and +10% accuracy.",
		statuses: ["PIP_Talent_Hothead"],
		boosts: [
			{
                type: "specialLogic",
                id: "PIP_Talent_Hothead",
                value: 1.0,
				keywords: [{keyword: "Prosperity", keywordBoon: "mutator"}]
            }
		]
	},
	inconspicuous: {
		name: "Inconspicuous",
		description: "With Inconspicuous, melee opponents find you less attractive in combat and, as you enter combat, you sneak and become invisible until the end of your first turn. However, everyone&apos;s attitude towards you decreases by 15.",
	},
	leech: {
		name: "Leech",
		description: "Leech grants you +15% lifesteal, and you consume contiguous blood puddles that you stand in, healing you for 5% of your maximum vitality.",
		boosts: [
			{
                type: "flexStat",
                id: "LIFESTEAL",
                value: 15.0,
            }
		]
	},
	livingArmor: {
		name: "Living Armor",
		description: "Living Armor adds 35% of all healing you receive by skills or consumables to your Magic Armor.",
	},
	masterFletcher: {
		name: "Master Fletcher",
		description: "With Master Fletcher, your special arrows count as basic attacks. Additionally, you have a 33% chance to recover a special arrow after shooting it. Basic attacks may recover AP from the Finesse attribute, and enjoy benefits from other less-common effects.",
	},
	mnemonic: {
		name: "Mnemonic",
		description: "Mnemonic gives you 8 extra points in the Memory attribute.",
		boosts: [
			{ // surprisingly, this does count as invested memory
                type: "flexStat",
                id: "MEMORY",
                value: 8.0,
            }
		]
	},
	morningPerson: {
		name: "Morning Person",
		description: "Even if you act first in a combat round, you are considered Prepared (with 1 AP recovered) - conversely, if you would normally have been Prepared, you recover 1 more Action Point. Also, when you are resurrected, you return with full health.",
	},
	opportunist: {
		name: "Opportunist",
		description: "Opportunist allows you to perform one attack of opportunity per round against an enemy as it moves out of your melee weapon&apos;s range. Additionally, you may perform one reaction each round for zero AP.",
	},
	parryMaster: {
		name: "Parry Master",
		description: "Parry Master gives you 10% dodge chance while dual wielding, and reduces the penalty of dodge fatigue by 3%.",
		boosts: [
			{ // should this be toggelabel?
                type: "flexStat",
                id: "DODGEBOOST",
                value: 10.0,
            }
		]
	},
	pictureOfHealth: { // todo
		name: "Picture of Health",
		description: "Picture of Health gives you extra Vitality: +3% for every point in Warfare",
	},
	savageSortilege: {
		name: "Savage Sortilege",
		description: "Savage Sortilege gives all magical skills and damaging statuses a critical chance equal to your critical chance score.",
	},
	thePawn: {
		name: "The Pawn",
		description: "The Pawn permits your character 1.5 AP worth of free movement per turn.",
	},
	torturer: {
		name: "Torturer",
		description: "With Torturer, your Brittle status requires 1 less stack of Battered to detonate, your Calcifying status also deals its damage when it is applied, and your Scorched status also deals its damage at the start of its target's turns. Additionally, the base damage dealt by Charged, Poisoned, Bleeding, Acid, Suffocating, and Corroding is increased by 50%.",
	},
	unstable: {
		name: "Unstable",
		description: "With Unstable, you activate Vitality Void when you suffer your fifth stack of Battered or Harried (combined total) in a single turn.",
		boosts: [
			{
                type: "specialLogic",
                id: "PIP_Talent_Unstable",
                value: 1.0,
				keywords: [{keyword: "VitalityVoid", keywordBoon: "activator"}]
            }
		]
	},
	walkItOff: {
		name: "Walk it Off",
		description: "Walk it Off removes 1 stack of both Battered and Harried from you at the start of your turns. Additionally, all status durations are reduced by 1 turn, including positive statuses. Does not affect statuses with a duration of 1 turn.",
	},
	whatARush: {
		name: "What A Rush",
		description: "What A Rush increases your recovery and maximum Action Points by 1 when your health is below 70%, and an additional +1 for every 20% thereafter, up to a maximum of +5 at 10% and below.",
	},
	iceKing: {
		name: "Ice King",
		description: "A character with Ice King has an extra 15% Water Resistance, but takes a 15% penalty to Fire Resistance. Additionally, the maximum Water Resistance is raised by 10",
		boosts: [
			{
                type: "flexStat",
                id: "FIRERESISTANCE",
                value: -15.0,
			},
			{
                type: "flexStat",
                id: "WATERRESISTANCE",
                value: 15.0,
            }
		]
	},
	ingenious: {
		name: "Ingenious",
		description: "Ingenious gives you 5% bonus Critical Chance and 5% extra Critical Multiplier.",
		unselectable: true,
		boosts: [ // todo multiplier
			{
                type: "flexStat",
                id: "CRITICALCHANCE",
                value: 5.0,
			},
		]
	},
	sophisticated: {
		name: "Sophisticated",
		description: "Sophisticated gives you +10% Fire Resistance and +10% Poison Resistance",
		unselectable: true,
		boosts: [
			{
                type: "flexStat",
                id: "FIRERESISTANCE",
                value: 10.0,
			},
			{
                type: "flexStat",
                id: "POISONRESISTANCE",
                value: 10.0,
            }
		]
	},
	spellSong: {
		name: "Spellsong",
		description: "Spellsong gives you +1 to Persuasion.",
		unselectable: true,
	},
	// tradeSecrets: {
	// 	name: "Trade Secrets",
	// 	description: "Trade Secrets gives you +1 to Bartering.",
	// 	innate: true,
	// },
	corpseEater: {
		name: "Corpse Eater",
		description: "Corpse Eater lets you eat body parts to access the memories of the dead.",
		unselectable: true,
	},
	ancestralKnowledge: {
		name: "Ancestral Knowledge",
		description: "Ancestral Knowledge gives you +1 to Loremaster.",
		unselectable: true,
	},
	thrifty: {
		name: "Thrifty",
		description: "Thrifty gives you +1 to Bartering.",
		unselectable: true,
	},
	
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
	Ascension_Predator_MUTA_VoracityACT: ["Voracity"],
	Ascension_Elementalist_ACT_CenturionOrWeak3: ["Centurion"],
	Ascension_Centurion_MUTA_RestoreArmorAddDamageFromArmor: ["Ward"],
	Ascension_Celestial_ACT_AllyWard: ["Ward"],
	Ascension_Centurion_ACT_EndOfTurnDefiance: ["Defiance"],
	Ascension_Prosperity_ACT_Basic_MK2_Ward: ["Ward"],
	Ascension_VitalityVoid_MUTA_2HDamageFromForce: ["Paucity"],
	Ascension_Paucity_MUTA_WitherACT_BasicAttack: ["Wither"],
	Ascension_ViolentStrike_MUTA_GlaciateIgnition: ["Purity"],
	Ascension_Prosperity_ACT_Purity: ["Purity"],
	Ascension_Centurion_ACT_HitAlly_MK2_ACTOnWard: ["Ward"]

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
export const maxTalents = 8 // 5 base, +1 from Karon, +2 from Sworn

// these stat types use strings from the game instead of ones defined by us. Used for non-quantifiable script triggers.
export const statTypesWithGameStrings = [
	"specialLogic",
	"statusExtension",
	"extraStatusApplication"
  ]

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

export const skillAbilityList = [
	"WarriorLore",
	"WaterSpecialist",
	"EarthSpecialist",
	"Necromancy",
	"RogueLore",
	"RangerLore",
	"FireSpecialist",
	"Summoning",
	"AirSpecialist",
	// "Source",
	"Polymorph"
]

export const statusNames = {
    "AMER_DECAYING_APPLY": "Vulnerable III",
    "AMER_WEAKENED_APPLY": "Weakened III",
    "AMER_ENTHRALLED_APPLY": "Subjugated III",
    "AMER_ATAXIA_APPLY": "Ataxia III",

    "AMER_SQUELCHED_APPLY": "Squelched III",
    "AMER_TERRIFIED_APPLY": "Terrified III",
    "AMER_SLOWED_APPLY": "Slowed III",
    "AMER_BLIND_APPLY": "Dazzled III",
}

export const statuses = {
	// PIP_Artifact_AntediluvianCarapace: {
	// 	type: "special",
	// 	id: "PIP_Artifact_AntediluvianCarapace"
	// },
	PIP_Artifact_DrogsLuck: {type: "special", id: "PIP_Artifact_DrogsLuck", icon: "AMER_UNI_Amulet_A"},
	// PIP_Artifact_Expedition: {type: "special", id: "PIP_Artifact_Expedition"},
	PIP_Artifact_EyeOfTheStorm: {type: "special", id: "PIP_Artifact_EyeOfTheStorm", icon: "AMER_UNI_Ring_A"},
	PIP_Artifact_Kudzu: {type: "special", id: "PIP_Artifact_Kudzu", icon: "AMER_UNI_Boots_Cloth_A"},
	PIP_Artifact_Leviathan: {type: "special", id: "PIP_Artifact_Leviathan", icon: "AMER_UNI_Mace_A"},
	PIP_Artifact_Onslaught: {type: "special", id: "PIP_Artifact_Onslaught", icon: "AMER_UNI_Boots_Plate_D"},
	PIP_Artifact_PrismaticBarrier: {type: "special", id: "PIP_Artifact_PrismaticBarrier", icon: "AMER_UNI_Shield_E"},
	PIP_Artifact_Urgency: {type: "special", id: "PIP_Artifact_Urgency", icon: "AMER_UNI_Chest_Leather_C"},
	PIP_Artifact_Vertigo: {type: "special", id: "PIP_Artifact_Vertigo", icon: "AMER_UNI_Axe_A"},

	PIP_Talent_Guerrilla: {type: "special", id: "PIP_Talent_Guerrilla", icon: "Talent_Guerrilla"},

	PIP_Talent_Hothead: {
		type: "special",
		id: "PIP_Talent_Hothead",
		icon: "Talent_Hothead",
	},

	PeaceOfMind: {
		type: "normal",
		id: "PeaceOfMind",
		icon: "Skill_Fire_BurnMyEyes",
		boosts: [
			{type: "realStats", id: "fin", value: 3},
			{type: "realStats", id: "pwr", value: 3},
			{type: "realStats", id: "str", value: 3},
			{type: "realStats", id: "wits", value: 7},
		]
	}
}

export const portraits = [
	// "ifan",
	// "lohse",
	// "sebille",
	// "red_prince",
	// "beast",
	// "fane",
	"human_m",
	"human_f",
	"elf_m",
	"elf_f",
	"dwarf_m",
	"dwarf_f",
	"lizard_m",
	"lizard_f",
	"magister_waifu",
	"pip",
	"derpy_bald_guy",
	"obama",
]

export const stats = {
	realStats: {
		str: {
			display: "Strength: {0}",
			default: 10,
		},
		fin: {
			display: "Finesse: {0}",
			default: 10,
		},
		pwr: {
			display: "Power: {0}",
			default: 10,
		},
		con: {
			display: "Constitution: {0}",
			default: 10,
		},
		mem: {
			display: "Memory: {0}",
			default: 10,
		},
		wits: {
			display: "Wits: {0}",
			default: 10,
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
		// abilities
		dualwielding: {
			display: "Dual Wielding: {0}"
		},
		ranged: {
			display: "Ranged: {0}"
		},
		singlehanded: {
			display: "Single Handed: {0}"
		},
		twohanded: {
			display: "Two Handed: {0}"
		},
		leadership: {
			display: "Leadership: {0}"
		},
		perseverance: {
			display: "Perseverance: {0}"
		},
		retribution: {
			display: "Retribution: {0}"
		},
		warfare: {
			display: "Warfare: {0}"
		},
		hydrosophist: {
			display: "Hydrosophist: {0}"
		},
		geomancer: {
			display: "Geomancer: {0}"
		},
		necromancer: {
			display: "Necromancer: {0}"
		},
		scoundrel: {
			display: "Scoundrel: {0}"
		},
		huntsman: {
			display: "Huntsman: {0}"
		},
		pyrokinetic: {
			display: "Pyrokinetic: {0}"
		},
		summoning: {
			display: "Summoning: {0}"
		},
		aerotheurge: {
			display: "Aerotheurge: {0}"
		},
		polymorph: {
			display: "Polymorph: {0}"
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
		// attributes
		STRENGTH: {
			display: "Strength: +{0}",
		},
		FINESSE: {
			display: "Finesse: +{0}",
		},
		INTELLIGENCE: {
			display: "Power: +{0}",
		},
		CONSTITUTION: {
			display: "Constitution: +{0}",
		},
		MEMORY: {
			display: "Memory: +{0}",
		},
		WITS: {
			display: "Wits: +{0}",
		},

		// other boosts
		DAMAGEBOOST: {
			display: "Damage: +{0}% additive",
		},
		CRITICALCHANCE: {
			display: "Critical Chance: {0}%",
		},
		ACCURACYBOOST: {
			display: "Accuracy: +{0}%"
		},
		DODGEBOOST: {
			display: "Dodge Chance: {0}%"
		},
		INITIATIVE: {
			display: "Initiative: {0}",
		},
		LIFESTEAL: {
			display: "Lifesteal: {0}%",
		},
		MOVEMENT: {
			display: "Movement: +{0}m"
		},

		VITALITYBOOST: {
			display: "Maximum Vitality: +{0}%"
		},

		MAGICARMOR: {
			display: "Magical Armor: +{0} Qualifier"
		},
		PHYSICALARMOR: {
			display: "Physical Armor: +{0} Qualifier"
		},

		MAGICARMORBOOST: {
			display: "Magical Armor: +{0}%"
		},
		PHYSICALARMORBOOST: {
			display: "Physical Armor: +{0}%"
		},

		// resistances
		AllResistance: {
			display: "All Resistances: +{0}%"
		},
		EleResistance: {
			display: "Elemental Resistance: +{0}%",
		},
		PHYSICALRESISTANCE: {
			display: "Physical Resistance: +{0}%",
		},
		PIERCINGRESISTANCE: {
			display: "Piercing Resistance: +{0}%",
		},
		EARTHRESISTANCE: {
			display: "Earth Resistance: +{0}%"
		},
		POISONRESISTANCE: {
			display: "Poison Resistance: +{0}%"
		},
		WATERRESISTANCE: {
			display: "Water Resistance: +{0}%"
		},
		FIRERESISTANCE: {
			display: "Fire Resistance: +{0}%"
		},
		AIRRESISTANCE: {
			display: "Air Resistance: +{0}%"
		},

		// skill abilities
		FireSpecialist: {
			display: "Pyrokinetic: +{0}"
		},
		EarthSpecialist: {
			display: "Geomancer: +{0}"
		},
		AirSpecialist: {
			display: "Aerotheurge: +{0}"
		},
		WaterSpecialist: {
			display: "Hydrosophist: +{0}"
		},
		Necromancy: {
			display: "Necromancer: +{0}"
		},
		RogueLore: {
			display: "Scoundrel: +{0}"
		},
		Summoning: {
			display: "Summoning: +{0}"
		},
		RangerLore: {
			display: "Huntsman: +{0}"
		},
		WarriorLore: {
			display: "Warfare: +{0}"
		},
		Polymorph: {
			display: "Polymorph: +{0}"
		},

		// combat abilities
		DualWielding: {
			display: "Dual Wielding: +{0}"
		},
		SingleHanded: {
			display: "Single-Handed: +{0}"
		},
		Ranged: {
			display: "Ranged: +{0}"
		},
		TwoHanded: {
			display: "Two-handed: +{0}"
		},
		Leadership: {
			display: "Leadership: +{0}"
		},
		PainReflection: {
			display: "Retribution: +{0}"
		},
		Perseverance: {
			display: "Perseverance: +{0}"
		},

		// other
		RESISTDEATH: {
			display: "Resists Death: {0}"
		},
	},
	extendedStat: {
		// free reaction charges
		FreeReactionCharge_AMER_Celestial: {
			display: "Free Celestial Charges: {0}"
		},
		FreeReactionCharge_AMER_Centurion: {
			display: "Free Centurion Charges: {0}"
		},
		FreeReactionCharge_AMER_Elementalist: {
			display: "Free Elementalist Charges: {0}"
		},
		FreeReactionCharge_AMER_Predator: {
			display: "Free Predator Charges: {0}"
		},
		FreeReactionCharge_AMER_Occultist: {
			display: "Free Occultist Charges: {0}"
		},

		// investment bonuses
		PercAttributeIncrease_Strength: {
			display: "Invested Strength: +{0}%"
		},
		PercAttributeIncrease_Finesse: {
			display: "Invested Finesse: +{0}%"
		},
		PercAttributeIncrease_Intelligence: {
			display: "Inested Power: +{0}%"
		},
		PercAttributeIncrease_Constitution: {
			display: "Invested Constitution: +{0}%"
		},
		PercAttributeIncrease_Memory: {
			display: "Invested Memory: +{0}%"
		},
		PercAttributeIncrease_Wits: {
			display: "Invested Wits: +{0}%"
		},

		// regeneration
		Regen_Life: {
			display: "Missing Health Regen: {0}%"
		},
		Regen_PhysicalArmor: {
			display: "Missing Physical Armor Regen: {0}%"
		},
		Regen_MagicArmor: {
			display: "Missing Magical Armor regen: {0}%"
		},

		// voracity
		Voracity_Life: {
			display: "Life restored from Voracity: {0}%"
		},
		Voracity_BothArmor: {
			display: "Armors restored from Voracity: {0}%"
		},
		Voracity_PhysArmor: {
			display: "Physical Armor restored from Voracity: {0}%"
		},
		Voracity_MagicArmor: {
			display: "Magical Armor restored from Voracity: {0}%"
		},

		// summon stats
		SummonStat_ExtendedStat_Voracity_Life: {
			display: "Summon life restored from Voracity: {0}%"
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
		SummonStat_FlexStat_Stat_CRITICALCHANCE: {
			display: "Summon Critical Chance: +{0}%"
		},
		SummonStat_FlexStat_Stat_MOVEMENT: {
			display: "Summon Movement: +{0}m"
		},
		"MaxRes_ELERES_<NODENAME>": {
			display: "Maximum Elemental Resistance: +{0}%"
		},
		SummonStat_FlexStat_Stat_SpecialCase_AllResistance: {
			display: "Summon All Resistances: +{0}%"
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

		// misc
		SourceGen_AddPointsGranted: {
			display: "Source gain from Source Generation: +{0}"
		},
		SourceGen_InfiniteDuration: {
			display: "Infinite Source Generation: {0}",
			bool: true,
		},
		BattHarr_Threshold_Sum_Self_Both: {
			display: "B/H Threshold: +{0} ???"
		},
		Battered_StackInfluence_Enemy: {
			display: "Battered_StackInfluence_Enemy: {0}"
		},
		Harried_StackInfluence_Enemy: {
			display: "Harried_StackInfluence_Enemy: {0}"
		},
		IgnoreShieldPowerPenalty: {
			display: "Shield Power penalty removed: {0}",
			bool: true,
		},
		Purity_CooldownManip: {
			display: "Purity Cooldown Reduction: {0} seconds"
		},
		Status_AddDuration_AMER_SCORCHED: {
			display: "Bonus Scorched Duration: {0}"
		},
		Status_AddDuration_AMER_WARD: {
			display: "Bonus Ward Duration: +{0}"
		},
		Status_AddDuration_AMER_DEFIANCE: {
			display: "Bonus Defiance Duration: {0}"
		},
		Status_AddDuration_AMER_BANE: {
			display: "Extra Bane Duration: {0}"
		},
		VitalityVoid_Radius: {
			display: "Vitality Void Radius: +{0}m"
		},
		Adaptation_AddMaxStacks: {
			display: "Maximum Adaptation Stacks: +{0}"
		},
		Explode_OnStatus_AMER_PURITY_AURA_AMER_SCRIPT_TheNymph_Purity_Radial: {
			display: "Purity applies Subjugated within 8m: {0}",
			bool: true,
		},
		Paucity_Blocked: {
			display: "Unable to activate Paucity: {0}",
			bool: true,
		},
		Reaction_BlockBasic_AMER_Centurion: {
			display: "Basic Centurion behaviour disabled: {0}",
			bool: true,
		},
		Explode_OnStatus_AMER_WITHER_Projectile_AMER_SCRIPT_Wither_Decay: {
			display: "Withered applies Corroding for 1 turn to enemies within 2m of its target(???): {0}"
		},
		Reaction_TempFlexStat_AMER_Centurion_Stat_ACCURACYBOOST: {
			display: "Accuracy Boost during Centurion: +{0}%"
		},
		Reaction_TempFlexStat_AMER_Centurion_Stat_CRITICALCHANCE: {
			display: "Critical Chance boost during Centurion: +{0}%"
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
	statusExtension: { // for most of these, we use the Ascension node's text.
		// neat hack to get rid of duplicate text. This node grants 2 effects, one for each type of armor, meaning it shows 2 (same) strings in the keywords screen. This removes a duplicate.
		// sadly there are other nodes that do a similar thing but use flexStats, meaning we cannot use that workaround for them.
		VolatileArmor_Physical_300_Physical_AMER_RS3_FX_VolatileArmor: {
			strings: ["", ""]
		},
	},
	scalingExtension: {}, // uses Ascension node text.
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

export const statCategories = {
	"Resistance Bonuses": [
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
	"Real Resistances": [
		{type: "realStats", id: "res_physical"},
		{type: "realStats", id: "res_piercing"},
		{type: "realStats", id: "res_fire"},
		{type: "realStats", id: "res_water"},
		{type: "realStats", id: "res_earth"},
		{type: "realStats", id: "res_air"},
		{type: "realStats", id: "res_poison"},
	],
	"Real Attributes": [
		{type: "realStats", id: "str"},
		{type: "realStats", id: "fin"},
		{type: "realStats", id: "pwr"},
		{type: "realStats", id: "con"},
		{type: "realStats", id: "mem"},
		{type: "realStats", id: "wits"},
	],
	"Real Abilities": [
		{type: "realStats", id: "dualwielding"},
		{type: "realStats", id: "ranged"},
		{type: "realStats", id: "singlehanded"},
		{type: "realStats", id: "twohanded"},
		{type: "realStats", id: "leadership"},
		{type: "realStats", id: "perseverance"},
		{type: "realStats", id: "retribution"},
		{type: "realStats", id: "warfare"},
		{type: "realStats", id: "hydrosophist"},
		{type: "realStats", id: "geomancer"},
		{type: "realStats", id: "necromancer"},
		{type: "realStats", id: "scoundrel"},
		{type: "realStats", id: "huntsman"},
		{type: "realStats", id: "pyrokinetic"},
		{type: "realStats", id: "summoning"},
		{type: "realStats", id: "aerotheurge"},
		{type: "realStats", id: "polymorph"},
	],
	"Skill Ability Bonuses": [
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
	"Summoning": [
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
	"Regeneration": [
		{type: "extendedStat", id: "Regen_Life"},
		{type: "extendedStat", id: "Regen_PhysicalArmor"},
		{type: "extendedStat", id: "Regen_MagicArmor"},

		{type: "extendedStat", id: "Voracity_Life"},
		{type: "extendedStat", id: "Voracity_BothArmor"},
		{type: "extendedStat", id: "Voracity_PhysArmor"},
		{type: "extendedStat", id: "Voracity_MagicArmor"},
	],
	"Combat Ability Bonuses": [
		{type: "flexStat", id: "DualWielding"},
		{type: "flexStat", id: "Ranged"},
		{type: "flexStat", id: "SingleHanded"},
		{type: "flexStat", id: "TwoHanded"},
		{type: "flexStat", id: "Leadership"},
		{type: "flexStat", id: "Perseverance"},
		{type: "flexStat", id: "PainReflection"},
	],
	"Free Reactions": [
		{type: "extendedStat", id: "FreeReactionCharge_AMER_Centurion"},
		{type: "extendedStat", id: "FreeReactionCharge_AMER_Elementalist"},
		{type: "extendedStat", id: "FreeReactionCharge_AMER_Predator"},
		{type: "extendedStat", id: "FreeReactionCharge_AMER_Celestial"},
		{type: "extendedStat", id: "FreeReactionCharge_AMER_Occultist"},
	],
	"Investment Bonuses": [
		{type: "extendedStat", id: "PercAttributeIncrease_Strength"},
		{type: "extendedStat", id: "PercAttributeIncrease_Finesse"},
		{type: "extendedStat", id: "PercAttributeIncrease_Intelligence"},
		{type: "extendedStat", id: "PercAttributeIncrease_Constitution"},
		{type: "extendedStat", id: "PercAttributeIncrease_Memory"},
		{type: "extendedStat", id: "PercAttributeIncrease_Wits"},
	],
	"General Boosts": [
		{type: "flexStat", id: "DAMAGEBOOST"},
		{type: "flexStat", id: "CRITICALCHANCE"},
		{type: "flexStat", id: "ACCURACYBOOST"},
		{type: "flexStat", id: "DODGEBOOST"},
		{type: "flexStat", id: "INITIATIVE"},
		{type: "flexStat", id: "LIFESTEAL"},
		{type: "flexStat", id: "MOVEMENT"},
		{type: "flexStat", id: "VITALITYBOOST"},
		{type: "flexStat", id: "PHYSICALARMOR"},
		{type: "flexStat", id: "PHYSICALARMORBOOST"},
		{type: "flexStat", id: "MAGICARMOR"},
		{type: "flexStat", id: "MAGICARMORBOOST"},
		// {type: "extendedStat", id: "Voracity_Life"},
		// {type: "extendedStat", id: "Voracity_BothArmor"},
		{type: "extendedStat", id: "BattHarr_Threshold_Sum_Self_Both"},
		{type: "flexStat", id: "RESISTDEATH"},
	],
	"Miscellaneous": [
		{type: "extendedStat", id: "SourceGen_AddPointsGranted"},
		{type: "extendedStat", id: "SourceGen_InfiniteDuration"},
		{type: "extendedStat", id: "BattHarr_Threshold_Sum_Self_Both"},
		{type: "extendedStat", id: "Battered_StackInfluence_Enemy"},
		{type: "extendedStat", id: "Adaptation_AddMaxSHarried_StackInfluence_Enemytacks"},
		{type: "extendedStat", id: "Purity_CooldownManip"},
		{type: "extendedStat", id: "Status_AddDuration_AMER_SCORCHED"},
		{type: "extendedStat", id: "Explode_OnStatus_AMER_PURITY_AURA_AMER_SCRIPT_TheNymph_Purity_Radial"},
		{type: "extendedStat", id: "IgnoreShieldPowerPenalty"},
		{type: "extendedStat", id: "Status_AddDuration_AMER_WARD"},
		{type: "extendedStat", id: "Status_AddDuration_AMER_DEFIANCE"},
		{type: "extendedStat", id: "Status_AddDuration_AMER_BANE"},
		{type: "extendedStat", id: "VitalityVoid_Radius"},
		{type: "extendedStat", id: "Adaptation_AddMaxStacks"},
		{type: "extendedStat", id: "Paucity_Blocked"},
		{type: "extendedStat", id: "Reaction_BlockBasic_AMER_Centurion"},
		{type: "extendedStat", id: "Explode_OnStatus_AMER_WITHER_Projectile_AMER_SCRIPT_Wither_Decay"},
		{type: "extendedStat", id: "Reaction_TempFlexStat_AMER_Centurion_Stat_ACCURACYBOOST"},
		{type: "extendedStat", id: "Reaction_TempFlexStat_AMER_Centurion_Stat_CRITICALCHANCE"},
	]
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
		"WarriorLore": "Ability_Warfare",
		"WaterSpecialist": "Ability_Hydrosophist",
		"EarthSpecialist": "Ability_Geomancer",
		"Necromancy": "Ability_Necromancy",
		"RogueLore": "Ability_Scoundrel",
		"RangerLore": "Ability_Huntsman",
		"FireSpecialist": "Ability_Pyrokinetic",
		"Summoning": "Ability_Summoning",
		"AirSpecialist": "Ability_Aerotheurge",
		"Source": "Skill_Source_Bless",
		"Polymorph": "Ability_Polymorph",
		// combat abilities
		DualWielding: "Ability_DualWielding",
		Ranged: "Ability_Ranged",
		SingleHanded: "Ability_SingleHanded",
		TwoHanded: "Ability_TwoHanded",
		Leadership: "Ability_Leadership",
		Perseverance: "Ability_Perseverance",
		PainReflection: "Ability_PainReflection",
	},
	abilityNames: {
		"WarriorLore": "Warfare",
		"Warrior": "Warfare",
		"WaterSpecialist": "Hydrosophist",
		"Water": "Hydrosophist",
		"EarthSpecialist": "Geomancer",
		"Earth": "Geomancer",
		"Necromancy": "Necromancer",
		"Death": "Necromancer",
		"RogueLore": "Scoundrel",
		"Rogue": "Scoundrel",
		"RangerLore": "Huntsman",
		"Ranger": "Huntsman",
		"FireSpecialist": "Pyrokinetic",
		"Fire": "Pyrokinetic",
		"Summoning": "Summoning",
		"AirSpecialist": "Aerotheurge",
		"Air": "Aerotheurge",
		"Source": "Sourcery",
		"Polymorph": "Polymorph",
		DualWielding: "Dual Wielding",
		Ranged: "Ranged",
		SingleHanded: "Single Handed",
		TwoHanded: "Two Handed",
		Leadership: "Leadership",
		Perseverance: "Perseverance",
		PainReflection: "Retribution",
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
		"IncarnateChampion": "incarnate",
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
		"IncarnateChampion": "Incarnate Champion"
	},
	skillAbilityToSkillDocName: {
		"WarriorLore": "Warrior",
		"WaterSpecialist": "Water",
		"EarthSpecialist": "Earth",
		"Necromancy": "Death",
		"RogueLore": "Rogue",
		"RangerLore": "Ranger",
		"FireSpecialist": "Fire",
		"Summoning": "Summoning",
		"AirSpecialist": "Air",
		// "Source": "Source",
		"Polymorph": "Polymorph"
	},
	skillDocToGameAbilityName: {
		"Warrior": "WarriorLore",
		"Water": "WaterSpecialist",
		"Earth": "EarthSpecialist",
		"Death": "Necromancy",
		"Rogue": "RogueLore",
		"Ranger": "RangerLore",
		"Fire": "FireSpecialist",
		"Summoning": "Summoning",
		"Air": "AirSpecialist",
		// "Source": "Source",
		"Polymorph": "Polymorph"
	},
	statusCSS: {
		"AMER_ATAXIA_APPLY": "text-ataxia",
        "AMER_DECAYING_APPLY": "text-vulnerable",
        "AMER_WEAKENED_APPLY": "text-weakened",
        "AMER_ENTHRALLED_APPLY": "text-subjugated",

        "AMER_SQUELCHED_APPLY": "text-squelched",
        "AMER_SLOWED_APPLY": "text-slowed",
        "AMER_BLIND_APPLY": "text-dazzled",
		"AMER_TERRIFIED_APPLY": "text-terrified",
	}
}

export const embodimentTypesEnum = ["force", "entropy", "form", "inertia", "life"]
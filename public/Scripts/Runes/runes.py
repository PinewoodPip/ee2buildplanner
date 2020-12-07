import re
import json

data = open("Object.txt")
weapons = open("Weapon.txt")
armors = open("Armor.txt")
consumes = open("Status_CONSUME.txt")

REMOVE_SCAFFOLDING_KEYS = True
ALLOWED_SIZES = ["Giant"]

# todo check viality boost
# check why 1 bone rune does not have the boost in output
# bone rune gives same vit?

# excluded are masterwork, maxvit

# dict to translate weapon boosts to flexStat IDs
REAL_STAT_IDS = {
    "StrengthBoost": "STRENGTH",
    "MemoryBoost": "MEMORY",
    "FinesseBoost": "FINESSE",
    "ConstitutionBoost": "CONSTITUTION",
    "IntelligenceBoost": "INTELLIGENCE",
    "WitsBoost": "WITS",
    "Fire": "FIRERESISTANCE",
    "Water": "WATERRESISTANCE",
    "Air": "AIRRESISTANCE",
    "Earth": "EARTHRESISTANCE",
    "Poison": "POISONRESISTANCE",
    "Initiative": "INITIATIVE",
    "Leadership": "Leadership",
    # "ArmorBoost": "PHYSICALARMORBOOST",
    # "MagicArmorBoost": "MAGICARMORBOOST",
    "DualWielding": "DualWielding",
    "TwoHanded": "TwoHanded",
    "Perseverance": "Perseverance",
    # "LifeSteal": "LIFESTEAL", # already handled by AMER_DELDUM. unsure why it appears as both script boost and game boost
    "Ranged": "Ranged",
    "SingleHanded": "SingleHanded",

    # "VitalityBoost": "VITALITYBOOST",
    "Piercing": "PIERCINGRESISTANCE",
    "PainReflection": "PainReflection",
    "DodgeBoost": "DODGEBOOST",

    "CriticalChance": "CRITICALCHANCE",
    "Movement": "MOVEMENT",
}

# special modifiers handled by script. this dict assigns them the data format we use in the app
DELDUMS = {
    "AMER_DELDUM_RUNEDUMMY_FLAME_SMALL": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Elementalist",
            "value": 1
        },
    ],
    "AMER_DELDUM_RUNEDUMMY_FLAME_MEDIUM": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Elementalist",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_EleCrit",
            "keyword": "Elementalist",
            "keywordBoon": "mutator",
            "value": 15,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_FLAME_LARGE": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Elementalist",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_EleCrit",
            "keyword": "Elementalist",
            "keywordBoon": "mutator",
            "value": 30,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_FLAME_GIANT": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Elementalist",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_EleCrit",
            "keyword": "Elementalist",
            "keywordBoon": "mutator",
            "value": 45,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_FROST_SMALL": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Celestial",
            "value": 1
        },
    ],
    "AMER_DELDUM_RUNEDUMMY_FROST_MEDIUM": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Celestial",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_CelestialVitality",
            "keyword": "Celestial",
            "keywordBoon": "mutator",
            "value": 7,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_FROST_LARGE": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Celestial",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_CelestialVitality",
            "keyword": "Celestial",
            "keywordBoon": "mutator",
            "value": 14,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_FROST_GIANT": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Celestial",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_CelestialVitality",
            "keyword": "Celestial",
            "keywordBoon": "mutator",
            "value": 21,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_EARTH_SMALL": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Centurion",
            "value": 1
        },
    ],
    "AMER_DELDUM_RUNEDUMMY_EARTH_MEDIUM": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Centurion",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_CenturionRestoreArmor",
            "keyword": "Centurion",
            "keywordBoon": "mutator",
            "value": 5,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_EARTH_LARGE": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Centurion",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_CenturionRestoreArmor",
            "keyword": "Centurion",
            "keywordBoon": "mutator",
            "value": 10,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_EARTH_GIANT": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Centurion",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_CenturionRestoreArmor",
            "keyword": "Centurion",
            "keywordBoon": "mutator",
            "value": 15,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_AIR_SMALL": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Predator",
            "value": 1
        },
    ],
    "AMER_DELDUM_RUNEDUMMY_AIR_MEDIUM": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Predator",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_PredatorPowerDamage",
            "keyword": "Predator",
            "keywordBoon": "mutator",
            "value": 15,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_AIR_LARGE": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Predator",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_PredatorPowerDamage",
            "keyword": "Predator",
            "keywordBoon": "mutator",
            "value": 30,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_AIR_GIANT": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Predator",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_PredatorPowerDamage",
            "keyword": "Predator",
            "keywordBoon": "mutator",
            "value": 45,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_VENOM_SMALL": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Occultist",
            "value": 1
        },
    ],
    "AMER_DELDUM_RUNEDUMMY_VENOM_MEDIUM": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Occultist",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_OccultistInstantDamage",
            "keyword": "Occultist",
            "keywordBoon": "mutator",
            "value": 50,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_VENOM_LARGE": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Occultist",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_OccultistInstantDamage",
            "keyword": "Occultist",
            "keywordBoon": "mutator",
            "value": 75,
        }
    ],
    "AMER_DELDUM_RUNEDUMMY_VENOM_GIANT": [
        {
            "type": "extendedStat",
            "id": "FreeReactionCharge_AMER_Occultist",
            "value": 1
        },
        {
            "type": "specialLogic",
            "id": "PIP_Rune_OccultistInstantDamage",
            "keyword": "Occultist",
            "keywordBoon": "mutator",
            "value": 100,
        }
    ],
    # lifesteal for bone runes
    "AMER_DELDUM_LIFESTEAL_5": [
        {
            "type": "flexStat",
            "id": "LIFESTEAL",
            "value": 5
        },
    ],
    "AMER_DELDUM_LIFESTEAL_7": [
        {
            "type": "flexStat",
            "id": "LIFESTEAL",
            "value": 7
        },
    ],
    "AMER_DELDUM_LIFESTEAL_10": [
        {
            "type": "flexStat",
            "id": "LIFESTEAL",
            "value": 10
        },
    ],
    "AMER_DELDUM_LIFESTEAL_14": [
        {
            "type": "flexStat",
            "id": "LIFESTEAL",
            "value": 14
        },
    ],
    # regen
    "AMER_DELDUM_REGEN_LIFE_3": [
        {
            "type": "extendedStat",
            "id": "Regen_Life",
            "value": 3,
        }
    ],
    "AMER_DELDUM_REGEN_LIFE_4": [
        {
            "type": "extendedStat",
            "id": "Regen_Life",
            "value": 4,
        }
    ],
    "AMER_DELDUM_REGEN_LIFE_5": [
        {
            "type": "extendedStat",
            "id": "Regen_Life",
            "value": 5,
        }
    ],
    "AMER_DELDUM_REGEN_LIFE_6": [
        {
            "type": "extendedStat",
            "id": "Regen_Life",
            "value": 6,
        }
    ],
    # magic armor regen
    "AMER_DELDUM_REGEN_MAGIC_4.5": [
        {
            "type": "extendedStat",
            "id": "Regen_MagicArmor",
            "value": 4.5,
        },
    ],
    "AMER_DELDUM_REGEN_MAGIC_6": [
        {
            "type": "extendedStat",
            "id": "Regen_MagicArmor",
            "value": 6,
        },
    ],
    "AMER_DELDUM_REGEN_MAGIC_7.5": [
        {
            "type": "extendedStat",
            "id": "Regen_MagicArmor",
            "value": 7.5,
        },
    ],
    "AMER_DELDUM_REGEN_MAGIC_9": [
        {
            "type": "extendedStat",
            "id": "Regen_MagicArmor",
            "value": 9,
        },
    ],
    # physical armor regen
    "AMER_DELDUM_REGEN_PHYS_4.5": [
        {
            "type": "extendedStat",
            "id": "Regen_PhysicalArmor",
            "value": 4.5,
        },
    ],
    "AMER_DELDUM_REGEN_PHYS_6": [
        {
            "type": "extendedStat",
            "id": "Regen_PhysicalArmor",
            "value": 6,
        },
    ],
    "AMER_DELDUM_REGEN_PHYS_7.5": [
        {
            "type": "extendedStat",
            "id": "Regen_PhysicalArmor",
            "value": 7.5,
        },
    ],
    "AMER_DELDUM_REGEN_PHYS_9": [
        {
            "type": "extendedStat",
            "id": "Regen_PhysicalArmor",
            "value": 9,
        },
    ],
    # resistance reduction
    "AMER_DELDUM_RUNERESIST_PHYSICAL_SMALL": [
        {
            "type": "specialLogic",
            "id": "PIP_PhysResReductionOnHit",
            "value": 6,
            "string": "AMER_DELDUM_RUNERESIST_PHYSICAL_SMALL",
        },
    ],
    "AMER_DELDUM_RUNERESIST_PHYSICAL_MEDIUM": [
        {
            "type": "specialLogic",
            "id": "PIP_PhysResReductionOnHit",
            "value": 8,
            "string": "AMER_DELDUM_RUNERESIST_PHYSICAL_MEDIUM",
        },
    ],
    "AMER_DELDUM_RUNERESIST_PHYSICAL_LARGE": [
        {
            "type": "specialLogic",
            "id": "PIP_PhysResReductionOnHit",
            "value": 10,
            "string": "AMER_DELDUM_RUNERESIST_PHYSICAL_LARGE",
        },
    ],
    "AMER_DELDUM_RUNERESIST_PHYSICAL_GIANT": [
        {
            "type": "specialLogic",
            "id": "PIP_PhysResReductionOnHit",
            "value": 12,
            "string": "AMER_DELDUM_RUNERESIST_PHYSICAL_GIANT",
        },
    ],
    "AMER_DELDUM_RUNERESIST_ELE_SMALL": [
        {
            "type": "specialLogic",
            "id": "PIP_EleResReductionOnHit",
            "value": 6,
            "string": "AMER_DELDUM_RUNERESIST_ELE_SMALL",
        },
    ],
    "AMER_DELDUM_RUNERESIST_ELE_MEDIUM": [
        {
            "type": "specialLogic",
            "id": "PIP_EleResReductionOnHit",
            "value": 8,
            "string": "AMER_DELDUM_RUNERESIST_ELE_MEDIUM",
        },
    ],
    "AMER_DELDUM_RUNERESIST_ELE_LARGE": [
        {
            "type": "specialLogic",
            "id": "PIP_EleResReductionOnHit",
            "value": 10,
            "string": "AMER_DELDUM_RUNERESIST_ELE_LARGE",
        },
    ],
    "AMER_DELDUM_RUNERESIST_ELE_GIANT": [
        {
            "type": "specialLogic",
            "id": "PIP_EleResReductionOnHit",
            "value": 12,
            "string": "AMER_DELDUM_RUNERESIST_ELE_GIANT",
        },
    ],
}

SIZES = ["Small", "Medium", "Large", "Giant"]
RUNES = [
    "Flame", "Frost", "Thunder", "Rock", "Venom", "Masterwork", "Bloodstone", "Ruby", "Lapis", "Pearl", "Sapphire", "Silver", "Clay", "Granite", "Iron", "Bone", "Obsidian", "Onyx", "Steel", "Gold", "TigersEye", "Topaz", "Emerald", "Jade", "Malachite",
]

# data entries/properties to ignore in the .txt files
IGNORED_PROPERTIES = [
    "Value",
    "ExtraProperties",
    "Physical",
]

runeRegex = re.compile('new entry "LOOT_Rune_(?P<material>.*)_(?P<size>.*)"')

weaponEffectRegex = re.compile('data "RuneEffectWeapon" "(?P<effect>.*)"')
armorEffectRegex = re.compile('data "RuneEffectUpperbody" "(?P<effect>.*)"')

runes = {}
boostToRuneDict = {}

currentRune = None
for line in data.readlines():
    if runeRegex.search(line):
        rune = runeRegex.search(line).groupdict()
        runeId = rune["material"] + "_" + rune["size"]

        if rune["material"] != "Frame" and rune["size"] in ALLOWED_SIZES:
            currentRune = {
                "id": runeId,
                "material": rune["material"],
                "size": rune["size"],
            }
            runes[runeId] = currentRune
    elif weaponEffectRegex.search(line) and currentRune:
        effect = weaponEffectRegex.search(line).groupdict()["effect"]
        runes[currentRune["id"]]["weaponEffect"] = effect

        boostToRuneDict[effect] = currentRune["id"]

    elif armorEffectRegex.search(line) and currentRune:
        effect = armorEffectRegex.search(line).groupdict()["effect"]
        runes[currentRune["id"]]["armorEffect"] = effect
        
        boostToRuneDict[effect] = currentRune["id"]

        currentRune = None

weaponEntryRegex = re.compile('new entry "(?P<id>.*)"')
extraPropertiesRegex = re.compile('data "ExtraProperties" ".*:(?P<prop>.*)"')
dataRegex = re.compile('data "(?P<id>.*)" "(?P<value>.*)"')

files = [weapons, armors]
boostTypes = ["weaponEffect", "armorEffect"]
currentWeapon = None
for txt in [0, 1]:
    f = files[txt]
    boostType = boostTypes[txt]
    # todo distinguish between wep boosts and armor boosts
    for line in f.readlines():
        if weaponEntryRegex.search(line):
            currentWeapon = weaponEntryRegex.search(line).groupdict()["id"]

            if currentWeapon not in boostToRuneDict:
                currentWeapon = None

        elif extraPropertiesRegex.search(line) and currentWeapon:
            rune = runes[boostToRuneDict[currentWeapon]]

            rune["real_" + boostType] = {
                "prop": extraPropertiesRegex.search(line).groupdict()["prop"]
            }

            currentWeapon = None

        elif dataRegex.search(line) and currentWeapon:
            rune = runes[boostToRuneDict[currentWeapon]]
            search = dataRegex.search(line).groupdict()

            key = boostType + "_boosts"
            if search["id"] not in IGNORED_PROPERTIES:
                if key in rune:
                    rune[key][search["id"]] = search["value"]
                else:
                    rune[key] = {search["id"]: search["value"]}

# list of all special properties like armor regen
specialEffects = []
for rune in runes:
    if "real_weaponEffect" in runes[rune]:
        specialEffects.append(runes[rune]["real_weaponEffect"]["prop"])
    elif "real_armorEffect" in runes[rune]:
        specialEffects.append(runes[rune]["real_armorEffect"]["prop"])

statuses = {}
currentStatus = None
displayRegex = re.compile('data "DisplayNameRef" "(?P<value>.*)"')
for line in consumes.readlines():
    if weaponEntryRegex.search(line):
        # if weaponEntryRegex.search(line).groupdict()["id"] in specialEffects:
        currentStatus = weaponEntryRegex.search(line).groupdict()["id"]
        # else:
            # currentStatus = None
    elif displayRegex.search(line) and currentStatus:
        statuses[currentStatus] = displayRegex.search(line).groupdict()["value"]

# filter out formatting tags
formatting = re.compile(':<font size=\"17\">( )*(?P<content>.*)</font>')
for key in statuses:
    if formatting.search(statuses[key]):
        statuses[key] = formatting.search(statuses[key]).groupdict()["content"]

# add investment statuses automatically
investmentRegex = re.compile('AMER_DELDUM_(?P<attr>.*)PERC_(?P<value>.*)')
attrs = {
    "STR": "Strength",
    "FIN": "Finesse",
    "INT": "Intelligence",
    "CON": "Constitution",
    "MEM": "Memory",
    "WIT": "Wits"
}
for key in statuses:
    search = investmentRegex.search(key)
    if search:
        DELDUMS[key] = [
            {
                "type": "extendedStat",
                "id": "PercAttributeIncrease_" + attrs[search.groupdict()["attr"]],
                "value": int(search.groupdict()["value"])
            }
        ]

# convert rune boosts to the format we use in the app
for key in runes:
    rune = runes[key]
    rune["name"] = rune["material"].capitalize() + " Rune"
    rune["icon"] = "Item_LOOT_Rune_" + rune["material"] + "_" + rune["size"]

    rune["boosts"] = {"weapon": [], "armor": []}
    if "real_weaponEffect" in rune:
        if rune["real_weaponEffect"]["prop"] in DELDUMS:
            rune["boosts"]["weapon"] += DELDUMS[rune["real_weaponEffect"]["prop"]]
        rune["weaponBoostString"] = statuses[rune["real_weaponEffect"]["prop"]]

    if "real_armorEffect" in rune:
        if rune["real_armorEffect"]["prop"] in DELDUMS:
            rune["boosts"]["armor"] += DELDUMS[rune["real_armorEffect"]["prop"]]
        rune["armorBoostString"] = statuses[rune["real_armorEffect"]["prop"]]

    if "weaponEffect_boosts" in rune:
        for statId in rune["weaponEffect_boosts"]:
            if statId in REAL_STAT_IDS:
                rune["boosts"]["weapon"] += [{
                    "type": "flexStat",
                    "id": REAL_STAT_IDS[statId],
                    "value": int(rune["weaponEffect_boosts"][statId])
                }]
    if "armorEffect_boosts" in rune:
        for statId in rune["armorEffect_boosts"]:
            if statId in REAL_STAT_IDS:
                rune["boosts"]["armor"] += [{
                    "type": "flexStat",
                    "id": REAL_STAT_IDS[statId],
                    "value": int(rune["armorEffect_boosts"][statId])
                }]

    # remove keys we do not need in the final output
    scaffoldingKeys = ["weaponEffect_boosts", "armorEffect_boosts", "real_weaponEffect", "real_armorEffect", "armorEffect", "weaponEffect"]
    if REMOVE_SCAFFOLDING_KEYS:
        for scaffoldingKey in scaffoldingKeys:
            try:
                rune.pop(scaffoldingKey)
            except: pass

with open("runes.json", "w") as f:
    f.write(json.dumps(runes, indent=2))

with open("runeStrings.json", "w") as f:
    f.write(json.dumps(statuses, indent=2))
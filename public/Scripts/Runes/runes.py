import re
import json

data = open("Object.txt")
weapons = open("Weapon.txt")
armors = open("Armor.txt")
consumes = open("Status_CONSUME.txt")

SIZES = ["Small", "Medium", "Large", "Giant"]
RUNES = [
    "Flame", "Frost", "Thunder", "Rock", "Venom", "Masterwork", "Bloodstone", "Ruby", "Lapis", "Pearl", "Sapphire", "Silver", "Clay", "Granite", "Iron", "Bone", "Obsidian", "Onyx", "Steel", "Gold", "TigersEye", "Topaz", "Emerald", "Jade", "Malachite",
]

IGNORED_PROPERTIES = [
    "Value",
    "ExtraProperties"
]

runeRegex = re.compile(
    'new entry "LOOT_Rune_(?P<material>.*)_(?P<size>.*)"'
)

weaponEffectRegex = re.compile('data "RuneEffectWeapon" "(?P<effect>.*)"')
armorEffectRegex = re.compile('data "RuneEffectUpperbody" "(?P<effect>.*)"')

runes = {}
boostToRuneDict = {}

currentRune = None
for line in data.readlines():
    if runeRegex.search(line):
        rune = runeRegex.search(line).groupdict()
        runeId = rune["material"] + "_" + rune["size"]

        if rune["material"] != "Frame":
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

        # currentRune = None
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

# todo figure out where special strings like +free predator come from
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
        if weaponEntryRegex.search(line).groupdict()["id"] in specialEffects:
            currentStatus = weaponEntryRegex.search(line).groupdict()["id"]
        else:
            currentStatus = None
    elif displayRegex.search(line) and currentStatus:
        statuses[currentStatus] = displayRegex.search(line).groupdict()["value"]

# filter out formatting tags
formatting = re.compile(':<font size=\"17\">( )*(?P<content>.*)</font>')
for key in statuses:
    if formatting.search(statuses[key]):
        statuses[key] = formatting.search(statuses[key]).groupdict()["content"]

with open("runes.json", "w") as f:
    f.write(json.dumps(runes, indent=2))

with open("runeStrings.json", "w") as f:
    f.write(json.dumps(statuses, indent=2))
import re
import json

REMOVE_HTML_FORMATTING = True
REMOVE_SOURCE_INFUSIONS_TEXT = False
SORT_BY_ABILITY = True
REMOVE_TIERED_EFFECT_HINT = True
CUSTOM_HIGHLIGHTING = True

# todo show applied effects
# fix gag order damage

newDefRegex = re.compile('new entry "(.*)"')
paramRegex = re.compile('data "(.*)" "(.*)"')
usingSearch = re.compile('using "(.*)"')

statusDocs = ["Potion_vanilla.txt", "Status_CONSUME_vanilla.txt", "Status_HEALING_vanilla.txt", "Status_GUARDIAN_ANGEL_vanilla.txt", "Status_ACTIVE_DEFENSE_vanilla.txt", "Potion.txt", "Status_HEAL.txt", "Status_ACTIVE_DEFENSE.txt", "Status_HEALING.txt", "Status_CONSUME.txt"]
potions = {}
potion = None

potionTypes = [
    "Potion.txt",
    "Status_ACTIVE_DEFENSE.txt",
    "Status_BLIND.txt",
    "Status_CHALLENGE.txt",
    "Status_CHARMED.txt",
    "Status_CONSUME.txt",
    "Status_DAMAGE.txt",
    "Status_DAMAGE_ON_MOVE.txt",
    "Status_DEACTIVATED.txt",
    "Status_DECAYING_TOUCH.txt",
    "Status_DEMONIC_BARGAIN.txt",
    "Status_DISARMED.txt",
    "Status_EFFECT.txt",
    "Status_EXTRA_TURN.txt",
    "Status_FEAR.txt",
    "Status_FLOATING.txt",
    "Status_GUARDIAN_ANGEL.txt",
    "Status_HEAL.txt",
    "Status_HEAL_SHARING.txt",
    "Status_HEAL_SHARING_CASTER.txt",
    "Status_HEALING.txt",
    "Status_INCAPACITATED.txt",
    "Status_INVISIBLE.txt",
    "Status_KNOCKED_DOWN.txt",
    "Status_MUTED.txt",
    "Status_PLAY_DEAD.txt",
    "Status_POLYMORPHED.txt",
    "Status_SPARK.txt",
    "Status_STANCE.txt",
    "Status_THROWN.txt",
    "Weapon.txt",
]

folders = ["Larian", "Amer"]

for folder in folders:
    for doc in potionTypes:
        try:
            d = open("Data/" + folder + "/" + doc)
        except:
            print(folder + " has no file " + doc)
            continue

        potionId = None
        for line in d.readlines():
            if newDefRegex.search(line):
                search = newDefRegex.search(line).groups()

                potions[search[0]] = {"id": search[0]}
                potionId = search[0]
            elif paramRegex.search(line):
                search = paramRegex.search(line).groups()
                potions[potionId][search[0]] = search[1]
            elif usingSearch.search(line):
                search = usingSearch.search(line).groups()
                potions[potionId]["parent"] = search[0]

                for key in potions[search[0]]:
                    if key != "id":
                        potions[potionId][key] = potions[search[0]][key]

tieredStatuses = {
    "AMER_DECAYING_APPLY": re.compile("AMER_DECAYING_APPLY"),
    "AMER_WEAKENED_APPLY": re.compile("AMER_WEAKENED_APPLY"),
    "AMER_ENTHRALLED_APPLY": re.compile("AMER_ENTHRALLED_APPLY"),
    "AMER_ATAXIA_APPLY": re.compile("AMER_ATAXIA_APPLY"),

    "AMER_SQUELCHED_APPLY": re.compile("AMER_SQUELCHED_APPLY"),
    "AMER_TERRIFIED_APPLY": re.compile("AMER_TERRIFIED_APPLY"),
    "AMER_SLOWED_APPLY": re.compile("AMER_SLOWED_APPLY"),
    "AMER_BLIND_APPLY": re.compile("AMER_BLIND_APPLY"),
}

relevantParams = [
    "id",
    "SkillType",
    "Ability",
    "ActionPoints",
    "Cooldown",
    "Icon",
    "DisplayNameRef",
    "DescriptionRef",
    "MemorizationRequirements",
    "Stealth",
    "UseWeaponDamage",
    "UseWeaponProperties",
    "Damage Multiplier",
    "Damage Range",
    "DamageType",
    "TieredStatuses",

    "IsEnemySkill",

    # debug
    "StatsDescriptionParams",
    "ExplodeRadius", # for some reason removing this breaks a few spell descs ???
]

# these parameters will have a "m" added at the end of their value in skill descriptions
parametersWithDistance = [
    "Range", "AreaRadius", "ExplodeRadius", "HitRadius", "MaxDistance", "TargetRadius"
]

skillTypes = [
    "Skill_Cone.txt",
    "Skill_Dome.txt",
    "Skill_Jump.txt",
    "Skill_MultiStrike.txt",
    "Skill_Projectile.txt",
    "Skill_ProjectileStrike.txt",
    "Skill_Quake.txt",
    "Skill_Rain.txt",
    "Skill_Rush.txt",
    "Skill_Shout.txt",
    "Skill_Storm.txt",
    "Skill_Summon.txt",
    "Skill_Target.txt",
    "Skill_Teleportation.txt",
    "Skill_Tornado.txt",
    "Skill_Wall.txt",
    "Skill_Zone.txt",
]

bannedStrings = [
    "Empowered",
    "Polymorph",
    "_Move",
    "Bane",
    "Enemy",
    "Target_Quest_PermanentSoulMate",
    # "Artifact",
    
    # vanilla leftovers
    "SmokeCover",
    "MassCorpseExplosion",
    "MassCleanseWounds",
    "MassCryotherapy",
    "SpiritForm",
    "MassBreathingBubbles",
    "FlamingSkin",
    "IceSkin",
    "JellyfishSkin",
    "PoisonousSkin",
    "DeployMassTraps",
    "VampiricHungerAura",
    "BlessedSmokeCloud",
    "MasterOfSparks",
    "Storm_Blood",
    "Storm_Lightning",
    "Shout_VenomousAura",
    "Shout_OilyCarapace",
    "Shout_MassOilyCarapace",
    "Target_Enrage",
    "Shout_Taunt",
    "Shout_Cryotherapy",
    "ProjectileStrike_HailAttack",
    "Projectile_PyroclasticEruption",
    "Projectile_DustBlast",
    "EvasiveAura",
    "Shout_BreathingBubble",
    "Target_MassSabotage",

    # incarnate / summon
    "IncarnateVault",
    "IncarnateFreeFall",
    "IncarnateNetherswap",
    "IncarnateTerrifyingCruelty",
    "IncarnateGagOrder",
    "SlugSparkingSwings",

    # hmm why are these not tagged as enemy?
    "Summon_EnemyShamblingMound_Caster",
    "Summon_EnemyShamblingMound_Ranger",
    "Summon_EnemyShamblingMound_Melee",

    "InsectShockingTouch",


    # technical
    "NexusMeditate",
    "META",
    "TEST",
    "Infus_",
    "Infus",
    "Infusion",
    "SCRIPT",
    "Debug",
    "Dummy",
    "NULLSKILL",
]

# todo filter out skills with empowered in name

def format(string, params):
    ind = 1
    for x in params:
        if x == None:
            x = "[REPLACE]"
        string = string.replace("[" + str(ind) + "]", x)
        ind += 1
    return string

def hasBannedString(string):
    for x in bannedStrings:
        if x in string:
            return True
    return False

def prettifySkillDescription(string):
    if not REMOVE_HTML_FORMATTING:
        return string
    
    # filter out the initial formatting tag, and replace the br one with newline character
    string = descRegex.search(value).groupdict()["FullText"]

    string = value.replace("<br>", "\n")

    # next, filter out inner formatting tags
    newVal = ""
    pause = False
    for char in string:
        if char == "<": # if a formatting tag starts, wait until it ends
            pause = True
        elif char == ">":
            pause = False
        elif not pause: # if we're not in a formatting tag, add the character
            newVal += char

    # AHHHH THIS INCONSISTENCY IS KILLING ME
    newVal = newVal.replace("Aerothurge", "Aerotheurge")

    if REMOVE_SOURCE_INFUSIONS_TEXT:
        newVal = newVal.split("\n\nSource Infusions:")[0]

    if REMOVE_TIERED_EFFECT_HINT:
        newVal = newVal.replace("\n\nTiered statuses apply up to tier 3 and reduce resistances; see your journal for a full description.", "")
        newVal = newVal.replace("\nTiered statuses apply up to tier 3 and reduce resistances; see your journal for a full description.", "")

        newVal = newVal.replace("\nSubjugated III consumes 7 Battered:\nTarget suffers damage when attacking this status' owner, making it less likely to do so; reduces AP recovery.", "")
        newVal = newVal.replace("\nVulnerable III consumes 7 Battered:\nTarget is easier to Batter or Harry, and suffers damage from healing.", "")
        newVal = newVal.replace("\nAtaxia III consumes 7 Battered:\nTarget slowed and is Disarmed.", "")
        newVal = newVal.replace("\nTerrified III consumes 7 Harried:\nTarget loses attack of opportunity and spends AP fleeing.", "")
        newVal = newVal.replace("\nDazzled III consumes 7 Harried:\nTarget has reduced accuracy, dodge, and is Blinded.", "")
        newVal = newVal.replace("\nSlowed III consumes 7 Harried:\nTarget has reduced movement and AP recovery.", "")
        newVal = newVal.replace("\nSquelched III consumes 7 Harried:\nTarget loses AP when using movement skills and is Silenced.", "")
        newVal = newVal.replace("\nWeakened III consumes 7 Battered:\nTarget's damage is reduced.", "")

    return (newVal)

def highlightKeywords(string):

    colorHighlighting = {
        "Pyrokinetic": "text-pyro",
        "Geomancer": "text-geo",
        "Aerotheurge": "text-aero",
        "Hydrosophist": "text-water",
        "Warfare": "text-warfare",
        "Huntsman": "text-huntsman",
        "Polymorph": "text-poly",
        "Summoning": "text-summon",
        "Scoundrel": "text-rogue",
        "Necromancer": "text-necro",

        "Earth Damage": "text-dmg-earth",
        "Fire Damage": "text-dmg-fire",
        "Water Damage": "text-dmg-water",
        "Air Damage": "text-dmg-air",
        "Physical Damage": "text-dmg-phys",
        "Piercing Damage": "text-dmg-pierce",
        "Physical Armor": "text-dmg-armor-phys",
        "Magic Armor": "text-dmg-armor-magic",
        "Weapon Damage": "text-dmg-phys",
    }

    newString = string

    for key in colorHighlighting:
        newString = newString.replace(key, "<span class='" + colorHighlighting[key] + "'>" + key + "</span>")

    return newString

def replaceParamsInDescription(skill):
    if "DescriptionRef" not in skill.keys():
        return None

    desc = skill["DescriptionRef"]
    # params = skill["allParams"]
    params = skill

    if "StatsDescriptionParams" in params.keys():
        paramDefs = params["StatsDescriptionParams"]
        paramList = []
        p = {"sourceType": "", "source": "", "param": "", "temp": ""}

        # todo nested references
        # might be easier to just go in reverse?
        for char in paramDefs:
            if char == ":":
                if p["source"] != "":
                    p["sourceType"] = p["source"]
                    p["source"] = p["temp"]
                    p["temp"] = ""
                else:
                    p["source"] = p["temp"]
                    p["temp"] = ""
            elif char == ";":
                p["param"] = p["temp"]
                if p["sourceType"] == "":
                    p["sourceType"] = "Skill"
                paramList.append(p)
                p = {"sourceType": "", "source": "", "param": "", "temp": ""}
            else:
                p["temp"] += char
        if p["temp"] != "":
            p["param"] = p["temp"]
            paramList.append(p)

        print(paramList)
        realValues = []
        for x in paramList:
            source = x["source"]
            sourceType = x["sourceType"]
            realSource = None
            param = x["param"]
            valid = False

            if x["sourceType"] == "Skill" or x["sourceType"] == "":
                if source == "":
                    realSource = skill
                    valid = True
                else:
                    if source in allSkills.keys():
                        realSource = allSkills[source]
                        valid = True
            elif sourceType == "StatusData" or sourceType == "Potion" or sourceType == "Weapon":
                realSource = potions[source]
                valid = True

            if valid:
                # remove spaces. property entries have spaces but formatting params do not
                param = param.replace(" ", "")
                # wtf does this do kamil ^, isnt this useless

                # special cases
                if param == "Damage":
                    # todo dmg range
                    damage = ""

                    if "Damage Multiplier" in realSource.keys():
                        damage += realSource["Damage Multiplier"]
                    else:
                        damage += "(UNKNOWN)"

                    # if skill uses weapon damage it wont have damagetype
                    if ("DamageType" in realSource.keys() and (realSource["DamageType"] == "Magic" or realSource["DamageType"] == "Corrosive")):
                        if realSource["DamageType"] == "Magic":
                            damage = "(" + realSource["Damage Multiplier"] + "% Damage) Magic Armor"
                        else:
                            damage = "(" + realSource["Damage Multiplier"] + "% Damage) Physical Armor"
                    elif "UseWeaponDamage" in realSource.keys() and realSource["UseWeaponDamage"] == "Yes":
                        damage += "% Weapon Damage"
                    else:
                        damage += "% "

                        if "DamageType" in realSource.keys():
                            damage += realSource["DamageType"] + " Damage"
                        else:
                            damage += "UNKNOWN DAMAGE TYPE"
                    realValues.append(damage)
                elif param == "HealAmount":
                    if realSource["HealType"] == "Percentage":
                        baseString = "[1]% [2]"
                    else:
                        baseString = "([1] Qualifier) [2]"
                    
                    healType = realSource["HealStat"]
                    if healType == "PhysicalArmor":
                        healType = "Physical Armor"
                    elif healType == "MagicArmor":
                        healType = "Magic Armor"

                    baseString = format(baseString, [realSource["HealValue"], healType])
                    realValues.append(baseString)

                elif param in parametersWithDistance and param in realSource.keys():
                    realValues.append(realSource[param] + "m")

                elif param == "Armor":
                    realValues.append("(" + realSource[param] + " Qualifier) Armor")
                elif param == "StealthDamageMultiplier":
                    realValues.append(realSource["Stealth Damage Multiplier"])
                elif param == "DistanceDamageMultiplier":
                    realValues.append(realSource["Distance Damage Multiplier"])
                else:
                    if param in realSource.keys():
                        realValues.append(realSource[param])
            else:
                # firebrand etc doesnt work
                realValues.append(None)

        print(realValues)
        return highlightKeywords(format(desc, realValues))
    return highlightKeywords(desc)

skills = {}
allSkills = {} # actually has all skills
currentSkill = None
ignore = False
descRegex = re.compile('<font size=\'19\'>(?P<FullText>.*)</font>')

for folder in folders:
    for skillType in skillTypes:
        try:
            data = open("Data/" + folder + "/" + skillType)
        except:
            print(folder + " has no file " + skillType)
            continue
        lineCount = 1
        for line in data.readlines():
            if (newDefRegex.search(line)):
                search = newDefRegex.search(line).groups()

                if currentSkill != None:
                    allSkills[currentSkill["id"]] = currentSkill

                currentSkill = {"id": search[0], "allParams": {}}
                
            elif usingSearch.search(line):
                search = usingSearch.search(line)
                baseSkillId = search.groups()[0]

                for key in allSkills[baseSkillId]:
                    if key != "id":
                        currentSkill[key] = allSkills[baseSkillId][key]

            elif (paramRegex.search(line)):
                paramSearch = paramRegex.search(line)
                param = paramSearch.groups()[0]
                value = paramSearch.groups()[1]

                # filter out formatting from descriptions
                if param == "DescriptionRef":
                    if descRegex.search(value) != None:
                        value = prettifySkillDescription(value)
                
                # status effect application
                if param == "SkillProperties":
                    statuses = []
                    print(line)
                    for key in tieredStatuses:
                        if tieredStatuses[key].search(line):
                            statuses.append(key)
                    
                    if folder == "Amer":
                        print(statuses)
                    currentSkill["TieredStatuses"] = statuses

                currentSkill[param] = value

            lineCount += 1

# remove irrelevant skills and params
relevantSkills = {}
for x in allSkills:
    allSkills[x]["DescriptionRef"] = replaceParamsInDescription(allSkills[x])

    if not hasBannedString(x) and ("IsEnemySkill" not in allSkills[x].keys() or allSkills[x]["IsEnemySkill"] != "Yes"):
        relevantSkills[x] = allSkills[x]

        keysToPop = []
        for key in relevantSkills[x]:
            if key not in relevantParams:
                keysToPop.append(key)
        for z in keysToPop:
            relevantSkills[x].pop(z)


if SORT_BY_ABILITY:
    sort = {}
    for x in relevantSkills:
        skill = relevantSkills[x]
        if "Ability" in skill.keys() and skill["Ability"] != "None":
            if skill["Ability"] in sort.keys():
                sort[skill["Ability"]][skill["id"]] = skill
            else:
                sort[skill["Ability"]] = {skill["id"]: skill}
    relevantSkills["sorted"] = sort

output = json.dumps(relevantSkills, indent=2)
with open("Output/skills.json", "w") as f:
    f.write(output)
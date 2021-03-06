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
    "Memory Cost",

    # manually-added properties
    "TieredStatuses",
    "Hidden",

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

# special skills, like the lizards's flame breath. You can use this tag to hide them in skillbook selection for example
hiddenSkills = [
    "Shout_InspireStart",
    "Shout_FleshSacrifice",
    "Cone_Flamebreath",
    "Target_AMER_VampiricTouch",
    "Dome_CircleOfProtection",
    "Target_DemonicStare",
    "Shout_BreakTheShackles",
    "Target_MaddeningSong",
    "Summon_SoulWolf",
    "Target_Squall",
    "Target_TimeWarp",
    "Target_PetrifyingTouch",
    
    "Shout_AMER_Core_GenerateSource",

    "Shout_ElectricFence_NEW", # old closed circuit spell
    "Target_DemonicBargain_Wealth",
    "Summon_Cat",
    "Summon_Condor",
    "Summon_AMER_BoneshapedSkitterer",
    "Summon_AMER_BoneshapedCrusher",
    "Summon_Quest_SummonNewt",
    "Shout_Ignition_Splendor",
    "Summon_AMER_AccursedVessel",
    "Target_BloatedCorpse_TheSupplicant",
    "Target_AMER_CorpseMastery",
    "Projectile_BouncingShield_TheArena",

    # todo handle this properly. we cannot filter this one out the normal way because the Amer version of this spell has the same string in its name
    "Storm_Ethereal",

]

bannedStrings = [
    "Empowered",
    "Polymorph",
    "_Move",
    "Bane",
    "Enemy",
    "Target_Quest_PermanentSoulMate",
    
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

    TIERED_STATUS_STRINGS = [
        "Tiered statuses apply up to tier 3 and reduce resistances; see your journal for a full description.",

        "<font color='c80030'>Ataxia III</font> consumes 7 Battered:<br>Target slowed and is Disarmed.</font>",
        "<font color='7f25d4'>Subjugated III</font> consumes 7 Battered:<br>Target suffers damage when attacking this status' owner, making it less likely to do so; reduces AP recovery.</font>",
        "<font color='b823cb'>Vulnerable III</font> consumes 7 Battered:<br>Target is easier to Batter or Harry, and suffers damage from healing.</font>",
        "<font color='b823cb'>Terrified III</font> consumes 7 Harried:<br>Target loses attack of opportunity and spends AP fleeing.</font>",
        "<font color='797980'>Dazzled III</font> consumes 7 Harried:<br>Target has reduced accuracy, dodge, and is Blinded.</font>",
        "<font color='c80030'>Slowed III</font> consumes 7 Harried:<br>Target has reduced movement and AP recovery.</font>",
        "<font color='797980'>Squelched III</font> consumes 7 Harried:<br>Target loses AP when using movement skills and is Silenced.</font>",
        "<font color='639594'>Weakened III</font> consumes 7 Battered:<br>Target's damage is reduced.</font>",
    ]

    if REMOVE_TIERED_EFFECT_HINT:
        for entry in TIERED_STATUS_STRINGS:
            string = string.replace(entry, "")
    
    # filter out the initial formatting tag, and replace the br ones with newline character
    string = string.replace("<br>", "\n")
    string = string.replace("size='18'", "")
    string = string.replace("size=\"18\"", "")
    string = string.replace("size=\"12\"", "size=\"1\"")
    string = string.replace("<img src='Icon_BulletPoint'>", "")

    HTMLRegex = re.compile("(</*?font(.*?>)?)")

    # AHHHH THIS INCONSISTENCY IS KILLING ME
    string = string.replace("Aerothurge", "Aerotheurge")

    if REMOVE_SOURCE_INFUSIONS_TEXT:
        string = string.split("\n\nSource Infusions:")[0]

    # next, filter out inner formatting tags
    search = HTMLRegex.search(string)
    if search:
        for match in search.groups():
            string = string.replace(match, "")

    return (string)

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

        "Battered": "text-battered",
        "Harried": "text-harried",

        "AP": "text-ap",

        "Ataxia III": "text-ataxia",
        "Vulnerable III": "text-vulnerable",
        "Weakened III": "text-weakened",
        "Subjugated III": "text-subjugated",

        "Squelched III": "text-squelched",
        "Slowed III": "text-slowed",
        "Dazzled III": "text-dazzled",
        "Terrified III": "text-terrified",
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
                    elif "Damage" in realSource.keys(): # used in weapon boosts
                        damage += "(Level-based) "
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
                        if "DamageType" in realSource.keys():
                            if realSource["DamageType"] == "Chaos":
                                damage += "% "
                            else:
                                damage += "% " + realSource["DamageType"] + " Damage"
                        elif "Damage Type" in realSource.keys():
                            if realSource["Damage Type"] == "Chaos":
                                damage += "% "
                            else:
                                damage += realSource["Damage Type"] + " Damage"
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
allSkills = {}
currentSkill = None
ignore = False
descRegex = re.compile('<font size=(\'|\")19(\'|\")>(?P<FullText>.*)</font>') # 2 vanilla skills use " instead of '

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

    allSkills[x]["Hidden"] = allSkills[x]["id"] in hiddenSkills

    if not hasBannedString(x) and ("IsEnemySkill" not in allSkills[x].keys() or allSkills[x]["IsEnemySkill"] != "Yes" or allSkills[x]["id"] == "Dome_CircleOfProtection"):
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
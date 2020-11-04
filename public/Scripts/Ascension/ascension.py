import re, json

# if this is true, data will be parsed to remove redundant strings like "Click here to allocate..."
PARSE_DATA = True

titleRegex = re.compile('AMER_UI_Ascension_(?P<family>.*)_(?P<id>.*)_Title	(?P<text>.*)')
descRegex = re.compile('AMER_UI_Ascension_(?P<family>.*)_(?P<id>.*)_Desc_A	"(?P<text>.*)"<br><br><font color=\'a8a8a8\' size=\'21\' face=\'Averia Serif\'>Click on a node to view its properties.</font>')
rewardsRegex = re.compile("AMER_UI_Ascension_(?P<family>.*)_(?P<id>.*)_Rewards	(?P<text>.*).")

parentNodeRegex = re.compile("AMER_UI_Ascension_(?P<family>.*)_(?P<id>.*)_Node_(?P<index>[^\\.]*)	(?P<text>.*)")
subNodeRegex = re.compile("AMER_UI_Ascension_(?P<family>.*)_(?P<id>.*)_Node_(?P<index>[^\\.]*).(?P<subIndex>[^\\.]*)	(?P<text>.*)")

# second data file regex
ascensionDataParsers = {
    "requirements": re.compile('PROC_AMER_UI_Ascension_NodeCluster_AddRequirement\("(?P<family>.*)_(?P<id>.*)", "(?P<emb>.*)", (?P<value>[0-9]*)\);'),
    "rewards": re.compile('PROC_AMER_UI_Ascension_NodeCluster_AddReward\("(?P<family>.*)_(?P<id>.*)", "(?P<emb>.*)", (?P<value>[0-9]*)\);'),

    "embReward": re.compile('PROC_AMER_UI_Ascension_Node_AddReward_FromReal\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<emb>.*)",( )?(?P<value>.*)\);'),

    "flexStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_FlexStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", ".*", "(?P<stat>.*)", (?P<value>.*)\);'), # no idea if the "stat" part is relevant to take into account

    "extendedStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_ExtendedStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<stat>.*)", "(?P<subStat>.*)", "(?P<subSubStat>.*)", "(?P<subSubSubStat>.*)", (?P<value>.*)\);'),

    "containedKeywords": re.compile('DB_AMER_UI_Ascension_NodeCluster_Node_Keyword\(".*", "(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)", "(?P<keyword>.*)"\);'),

    "specialLogic": re.compile('DB_AMER_UI_Ascension_Node_Reward_SpecialLogic\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<specialLogic>.*)", (?P<value>.*)\);'),

    "keyword": re.compile('DB_AMER_UI_Ascension_Node_Reward_Keyword\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<keyword>.*)"\)'),

    "statusExtensionflexStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_StatusMod_FlexStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<status>.*)", "(?P<stat>.*)", "(?P<subStat>.*)", (?P<value>.*), ".*", .*\);'),

    "statusExtensionextendedStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_StatusMod_ExtendedStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<status>.*)", "(?P<stat>.*)", "(?P<subStat>.*)", "(?P<subSubStat>.*)", "(?P<subSubSubStat>.*)", (?P<value>.*), ".*", .*\);'),

    "scalingStatextendedStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_ScalingStat_StatusMod_ExtendedStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<scalingStat>.*)", "(?P<scalingSubStat>.*)", "(?P<status>.*)", "(?P<stat>.*)", "(?P<subStat>.*)", "", "", .*, (?P<value>.*)\);'),

    "scalingStatflexStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_ScalingStat_StatusMod_FlexStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<scalingStat>.*)", "(?P<scalingSubStat>.*)", "(?P<status>.*)", "(?P<stat>.*)", "(?P<subStat>.*)", ".*", [0-9], (?P<value>.*)\);'),

    # "scalingStatextendedStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_ScalingStat_StatusMod_ExtendedStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<scalingStat>.*)", "(?P<scalingSubStat>.*)", "(?P<status>.*)", "(?P<stat>.*)", "(?P<subStat>.*)", ([ [0-9]"]*)*, (?P<value>[[0-9]\.]*)\);;'),

    # "scalingStatflexStat": re.compile('DB_AMER_UI_Ascension_Node_Reward_ScalingStat_StatusMod_FlexStat\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<scalingStat>.*)", "(?P<scalingSubStat>.*)", "(?P<status>.*)", "(?P<stat>.*)", "(?P<subStat>.*)", ([ [0-9]"]*)*, (?P<value>[[0-9]\.]*)\);'),

    "extraStatusApplication": re.compile('DB_AMER_UI_Ascension_Node_Reward_StatusMod_AddStatus\("(?P<family>.*)_(?P<id>.*)", "Node_(?P<index>[0-9]*)(.(?P<subIndex>[0-9]*))?", "(?P<status>.*)", "(?P<newStatus>.*)", (?P<duration>.*), .*, .*\);')
}

# regex notes
# you must escape parenthesis
# ^ matches start of string OR works as an exclude inside []

#  todo t2 emb nodes
# PROC_AMER_UI_Ascension_Node_AddReward_FromReal("Force_TheArcanist", "Node_1.0", "Force", 1.0);

ascensions = {
    "force": {},
    "entropy": {},
    "form": {},
    "inertia": {},
    "life": {},
    "special": {},
}

regexes = [
    titleRegex,
    descRegex,
    rewardsRegex,
    parentNodeRegex,
    subNodeRegex,
]

regexes = {
    "name": titleRegex,
    "description": descRegex,
    # "requirementsAndRewards": rewardsRegex,
    "nodes": parentNodeRegex,
    "subNode": subNodeRegex,
}

keywordsPrefix = "Ascension_"
activator = "_ACT_"
mutator = "_MUTA_"
keywords = [
    "Presence",
    "Predator",
    "Defiance",
    "ViolentStrike",
    "Celestial",
    "Occultist",
    "Voracity",
    "Centurion",
    "Ward",
    "Adaptation",
    "Abeyance",
    "Wither",
    "Benevolence",
    "Elementalist",
    "Paucity",
    "Purity",
    "Prosperity",
    "VitalityVoid",
]
keywordStatuses = [
    "AMER_PAUCITY",
    "AMER_PURITY", # WILL ALSO MATCH PURITY_AURA
    "AMER_DEFIANCE",
    "AMER_WITHER",
    "AMER_WARD",
    "AMER_ABEYANCE",
    "AMER_BANE",
    "AMER_PROSPERITY",
]

def prettifyDescription(string):
    newStr = string.replace("<br>", "\n")

    newVal = ""
    pause = False
    for char in newStr:
        if char == "<": # if a formatting tag starts, wait until it ends
            pause = True
        elif char == ">":
            pause = False
        elif not pause: # if we're not in a formatting tag, add the character
            newVal += char

    if (PARSE_DATA):
        # remove redundant text
        newVal = newVal.replace("You may choose from:\n", "")
        newVal = newVal.replace("Click on this node again to allocate it, granting:\n» ", "")

        # replace text related to subnodes in parent node text
        newVal = newVal.split("\n\nAdditionally,")[0]
        newVal = newVal.split("1)")[0]

        # replace "gain:" text in parent nodes
        newVal = newVal.replace("Gain:\n  » ", "")

    return newVal

current = (None, None)

f = open("TSK_Import.txt", encoding='utf8')
for line in f.readlines():
    interpreted = False
    for reg in regexes:
        if regexes[reg].search(line) != None:
            search = regexes[reg].search(line).groupdict()
            search["family"] = search["family"].lower()

            text = prettifyDescription(search["text"])

            if search["id"] not in ascensions[search["family"]].keys():
                ascensions[search["family"]][search["id"]] = {"id": search["id"], "name": text, "nodes": [], "nodesText": []}
            
            if reg == "nodes":
                # text
                ascensions[search["family"]][search["id"]]["nodesText"].append({"parent": text, "subNodes": []})

                ascensions[search["family"]][search["id"]]["nodes"].append({"parent": [], "subNodes": []})
                interpreted = True
            elif reg == "subNode":
                # ascensions[search["family"]][search["id"]]["nodes"][int(search["index"])]["subNodes"].append(text)

                # text
                ascensions[search["family"]][search["id"]]["nodesText"][int(search["index"])]["subNodes"].append(text)
                pass
            else:
                ascensions[search["family"]][search["id"]][reg] = text
        if interpreted:
            break     

ascData = open("AscNodeDataForPip.txt", encoding='utf8')
for line in ascData.readlines():
    interpreted = False
    for key in ascensionDataParsers:
        if ascensionDataParsers[key].search(line) != None:
            search = ascensionDataParsers[key].search(line).groupdict()

            family = search["family"].lower()
            aspect = search["id"]

            value = None
            nodeIndex = None
            subIndex = None
            subNodeData = None
            parentNode = None
            n = None

            # doing this for readability
            if "value" in search.keys():
                value = search["value"]
            if "index" in search.keys():
                nodeIndex = int(search["index"])
            if "subIndex" in search.keys() and search["subIndex"] != None:
                subIndex = int(search["subIndex"])

            if nodeIndex != None:
                parentNode = ascensions[family][aspect]["nodes"][nodeIndex]["parent"]
                n = parentNode
            if subIndex != None:
                subNodeData = ascensions[family][aspect]["nodes"][nodeIndex]["subNodes"]

                # ensure there are enough lists indexed
                while len(subNodeData) <= subIndex:
                    subNodeData.append([])
                
                n = subNodeData[subIndex]

            # define which keywords a node mentions
            if key == "containedKeywords":
                nodeIndex = int(search["index"])

                if "containedKeywords" in ascensions[family][aspect]["nodes"][nodeIndex].keys():
                    ascensions[family][aspect]["nodes"][nodeIndex]["containedKeywords"].append(search["keyword"])
                else:
                    ascensions[family][aspect]["nodes"][nodeIndex]["containedKeywords"] = [search["keyword"]]

            elif key == "requirements" or key == "rewards":
                emb = search["emb"].lower()

                if key in ascensions[family][aspect].keys():
                    ascensions[family][aspect][key][emb] = float(value)
                else:
                    ascensions[family][aspect][key] = {emb: float(value)}

            elif key == "flexStat":
                n.append({"type": "flexStat", "id": search["stat"], "value": float(value)})
            # elif key == "flexStat-subnode":
            #     subNodeData[subIndex].append({"type": "flexStat", "id": search["stat"], "value": value})

            elif key == "specialLogic":
                # search for keywords
                logic = search["specialLogic"]
                
                keyword = None
                keywordBoonType = None

                for x in keywords:
                    if (x + activator) in logic:
                        keyword = x
                        keywordBoonType = "activator"
                    elif (x + mutator) in logic:
                        keyword = x
                        keywordBoonType = "mutator"

                n.append({"type": "specialLogic", "id": logic, "value": float(value), "keyword": keyword, "keywordBoon": keywordBoonType})
                

            elif key == "extendedStat":
                n.append({"type": "extendedStat", "id": search["stat"] + "_" + search["subStat"] + "_" + search["subSubStat"] + "_" + search["subSubSubStat"], "value": float(value)})
                
            elif key == "embReward":
                n.append({"type": "embodimentReward", "id": search["emb"], "value": float(value)})

            elif key == "keyword":
                n.append({"type": "keywordBasicActivator", "id": search["keyword"],})

            elif key == "statusExtensionflexStat" or key =="statusExtensionextendedStat":
                status = search["status"]
                keyword = None
                keywordBoonType = None
                subType = key.replace("statusExtension", "")

                statusKeyword = status.replace("AMER_", "")
                statusKeyword = statusKeyword.replace("_AURA", "")
                statusKeyword = statusKeyword.capitalize()

                subSubStat = ""
                subSubSubStat = ""
                if "subSubStat" in search.keys():
                    subSubStat = search["subSubStat"]
                if "subSubSubStat" in search.keys():
                    subSubSubStat = search["subSubSubStat"]

                for x in keywordStatuses:
                    if (x) in status.upper():
                        keyword = statusKeyword
                        keywordBoonType = "mutator"
                    if status == "LEADERSHIP":
                        keyword = "Presence"
                        keywordBoonType = "mutator"

                n.append({
                    "type": "statusExtension",
                    "subType": subType,
                    "status": status,
                    "id": search["stat"] + "_" + search["subStat"] + "_" + subSubStat + "_" + subSubSubStat,
                    "value": float(value),
                    "keyword": keyword,
                    "keywordBoon": keywordBoonType,
                })

            elif key == "scalingStatflexStat" or key == "scalingStatextendedStat":
                status = search["status"]
                statusKeyword = status.replace("AMER_", "")
                statusKeyword = statusKeyword.replace("_AURA", "")
                statusKeyword = statusKeyword.capitalize()

                keyword = None
                keywordBoonType = None
                subType = key.replace("scalingStat", "")

                subSubStat = ""
                subSubSubStat = ""
                if "subSubStat" in search.keys():
                    subSubStat = search["subSubStat"]
                if "subSubSubStat" in search.keys():
                    subSubSubStat = search["subSubSubStat"]

                for x in keywordStatuses:
                    if (x) in status.upper():
                        keyword = statusKeyword
                        keywordBoonType = "mutator"
                    if status == "LEADERSHIP":
                        keyword = "Presence"
                        keywordBoonType = "mutator"

                n.append({
                    "type": "scalingExtension",
                    "subType": subType,
                    "scalingStat": search["scalingStat"] + "_" + search["scalingSubStat"],
                    "status": status,
                    "id": search["stat"] + "_" + search["subStat"] + "_" + subSubStat + "_" + subSubSubStat,
                    "value": float(value),
                    "keyword": keyword,
                    "keywordBoon": keywordBoonType,
                })

            elif key == "extraStatusApplication":
                status = search["status"]
                keyword = None
                keywordBoonType = None

                statusKeyword = status.replace("AMER_", "")
                statusKeyword = statusKeyword.replace("_AURA", "")
                statusKeyword = statusKeyword.capitalize()
                
                for x in keywordStatuses:
                    if (x) in status.upper():
                        keyword = statusKeyword
                        keywordBoonType = "mutator"
                    if status == "LEADERSHIP":
                        keyword = "Presence"
                        keywordBoonType = "mutator"
                
                n.append({
                    "type": "extraStatusApplication",
                    "status": status,
                    "id": search["newStatus"],
                    "duration": float(search["duration"]),
                    "keyword": keyword,
                    "keywordBoon": keywordBoonType,
                })
            
            interpreted = True

        if interpreted:
            break 

output = json.dumps(ascensions, indent=2, ensure_ascii=False)
with open("ascension.json", "w", encoding="utf8") as w:
    w.write(output)
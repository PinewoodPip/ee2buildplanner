import re, json

treasureTable = open("TreasureTable.txt") # contains the ids of obtainable artifacts
itemProg = open("ItemProgressionNames.txt") # contains names of artifacts
consume = open("Status_CONSUME.txt") # contains artifact descriptions

treasureRegex = re.compile('object category "I_AMER_UNI_(.*)"')
nameRegex = re.compile('new namegroup "AMER_UNI_(.*)"')
realNameRegex = re.compile('add name "(.*)",')

consumeRegex = re.compile(
'''new entry "AMER_ARTIFACTPOWER_(.*)_DISPLAY"
.*
.*
.*
data "DescriptionRef" "(.*)"
(?:data "Icon" "(.*)")''')
artDescRegex = re.compile('Artifact Power:<font size="17"><br>- (.*)(?:</font>|<font>)')

artifacts = {}

# firsst we find the ids of the OBTAINABLE artifacts from the all arts drop table
for line in treasureTable.readlines():
    search = treasureRegex.search(line)

    if (search != None):
        artifacts[search.groups()[0].lower()] = {"id": search.groups()[0].lower()}

# next up, getting the display names from ItemProgressionNames.txt
nextLineContainsName = False
artifactId = None
for line in itemProg.readlines():
    search = nameRegex.search(line)

    if (search != None):
        artifactId = search.groups()[0].lower()
        nextLineContainsName = True
    elif nextLineContainsName:
        search = realNameRegex.search(line)

        # ignore this unused artifact
        if artifactId != "deck":
            artifacts[artifactId]["name"] = search.groups()[0]

        nextLineContainsName = False
        artifactId = None

# finally, we get the descriptions from CONSUME
allEntries = []
entry = ""
for line in consume.readlines():
    if line == "\n" and entry != "":
        allEntries.append(entry)
        entry = ""
    else:
        entry += line
for line in allEntries:
    search = consumeRegex.search(line)
    if search != None:
        artId = search.groups()[0]

        desc = search.groups()[1]
        desc = artDescRegex.search(desc).groups()[0]
        desc = desc.replace("<br>-", "")

        if len(search.groups()) > 2:
            icon = search.groups()[2]
        else:
            icon = None
        artId = artId.lower()

        if artId != "deck":
            artifacts[artId]["description"] = desc
            artifacts[artId]["icon"] = icon

# sanguine harv is the only one that doesnt have an icon defined there; we add it here manually
artifacts["sanguineharvest"]["icon"] = "AMER_UNI_Wand_F"

artifacts["paragon"]["creatorIsAwesome"] = True # it's true

output = json.dumps(artifacts, indent=2)
with open("artifacts.json", "w") as f:
    f.write(output)
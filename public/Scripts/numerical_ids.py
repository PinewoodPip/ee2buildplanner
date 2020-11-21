import json
from pathlib import Path

files = {
    "skills": "Skills/Output/skills.json",
    "artifacts": "Artifacts/artifacts.json"
}

numericalIDs = {}
checkForNewContent = False
oldFile = None

if Path("numerical_ids.json").is_file():
    checkForNewContent = True
    oldFile = json.loads(open("numerical_ids.json").read())

for entry in files:
    file = open(files[entry])
    dictionary = json.loads(file.read())

    numericalIDs[entry] = []

    for key in dictionary:
        if checkForNewContent and key not in oldFile[entry]:
            oldFile[entry].append(key)
        else:
            numericalIDs[entry].append(key)

with open("numerical_ids.json", "w") as f:
    if checkForNewContent:
        f.write(json.dumps(oldFile, indent=2))
    else:
        f.write(json.dumps(numericalIDs, indent=2))
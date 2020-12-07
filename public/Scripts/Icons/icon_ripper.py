from PIL import Image
import re

AMER = "AMER_Icons_Master.png"
AMER_LSX = "AMER_Icons_Master.lsx"
LARIAN = "Ability_Skill_Status_Icons.png"
LARIAN_LSX = "Ability_Skill_Status_Icons.lsx"
TALENTS_AND_ABILITIES = "talentsAndAbilities.png"
TALENTS_AND_ABILITIES_LSX = "talentsAndAbilities.lsx"

PORTRAITS = "Portraits_DOS2_MainPL_Icons.png"
PORTRAITS_LSX = "Portraits_DOS2_MainPL_Icons.lsx"

RUNES_LARIAN = "Icons_DOS2_Runes.png"
RUNES_LARIAN_LSX = "Icons_DOS2_Runes.lsx"

PORTRAITS_ORIGINS = "Generated_1301db3d-1f54-4e98-9be5-5094030916e4_Icons.png"
PORTRAITS_ORIGINS_LSX = "Generated_1301db3d-1f54-4e98-9be5-5094030916e4_Icons.lsx"

img = Image.open(RUNES_LARIAN)
data = open(RUNES_LARIAN_LSX)
pixel = 0.0004882825 * 2 # this is how much % of the width or height a pixel is. Used to figure out pixel values of each icon from its UV mapping
# it is the first U1 value in the lsx times 2, because the UV seems to reference the center of a pixel

# note: for ~1000x1000 files you have to multiple pixel size by 2

regex = re.compile("""
                (<node id="IconUV">
                    <attribute id="MapKey" value="(?P<Id>.*)" type="22" />
                    <attribute id="U1" value="(?P<U1>.*)" type="6" />
                    <attribute id="U2" value="(?P<U2>.*)" type="6" />
                    <attribute id="V1" value="(?P<V1>.*)" type="6" />
                    <attribute id="V2" value="(?P<V2>.*)" type="6" />
                </node>)""")

search = re.findall(regex, data.read())
iteration = 0
for x in search:
    # apparently group names don't work when using findall so
    iconData = {
        "Id": x[1],
        "U1": float(x[2]),
        "U2": float(x[3]),
        "V1": float(x[4]),
        "V2": float(x[5]),
    }
    iconData["sx"] = ((iconData["U1"] / pixel) - 0)
    iconData["ex"] = ((iconData["U2"] / pixel) + 1)
    iconData["sy"] = ((iconData["V1"] / pixel) - 0)
    iconData["ey"] = ((iconData["V2"] / pixel) + 1)
    # why does it need to be 0, 0, 64 64 if the pixels are supposed to start from 0 ??? wth
    # no need to substract anything cuz it's getting rounded down lol

    region = (iconData["sx"], iconData["sy"], iconData["ex"], iconData["ey"])
    cropped = img.crop(region)

    print(region)
    cropped.save("Output/" + iconData["Id"] + ".png")
    
    iteration += 1
    # if iteration > 7:
    #     break

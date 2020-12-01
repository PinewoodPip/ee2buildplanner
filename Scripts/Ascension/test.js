var ascensionDictionary = require('./ascension.json')
/*
var ascensionDictionary = {
	"test1" : {"a":"b", "c":"d"},
	"test2" : {"x":"y", "u":"v"}
};
*/

//console.log(Object.keys(ascensionDictionary));

var allComboKeys = [];

// push all aspect ids to a list
for (const [key, value] of Object.entries(ascensionDictionary))
{
	for (const [ascensionKey, ascensionValue] of Object.entries(value))
	{
		allComboKeys.push(ascensionKey);
	}
}

//console.log(allComboKeys);

function combineKeys(currentCombo, keyArray, combinations, depth, maxDepth)
{
	//console.log(combinations);
	if (depth < maxDepth)
	{
		for (var i = 0; i < keyArray.length; i++)
		{
			var newCombo = currentCombo.concat(keyArray[i]);
			combineKeys(newCombo, keyArray.slice(i + 1), combinations, depth + 1, maxDepth);
		}
	}
	else
	{
		combinations.push(currentCombo);
	}
}

var combinations = [];
combineKeys([], allComboKeys, combinations, 0, 5);
console.log(combinations);
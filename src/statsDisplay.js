import { ContextMenu, Text, Icon, Container } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

export function StatBoost(props) {
	return (
		<div className="flexbox-horizontal">
			{/* todo icons */}
			<Text text={props.text}/>
		</div>
	)
}

function StatTab(props) {
	return (
		<div style={{maxHeight: "500px", width: props.width, height: "unset", marginBottom: "20px"}} className="flexbox-vertical flex-align-start wrap-y">
			<div style={{position: "relative"}}>
				<Text text={props.name} className="sticky-top"/>
			</div>
			<hr/>
			{props.elements}
		</div>
	)
}

export function Boosts(props) {
	let boosts = []
	let stats = game.app.stats
	let statStrings = {}

	// literally all the stats as strings
	for (let x in stats) {
		for (let z in stats[x]) {
			let stat = stats[x][z]
			let displayString;

			displayString = game.getDisplayString(stat)

			// todo optimize
			if (utils.hasKey(statStrings, stat.type)) {
				statStrings[stat.type][stat.id] = displayString
			}
			else {
				statStrings[stat.type] = {}
				statStrings[stat.type][stat.id] = displayString
			}

			boosts.push(<Text text={displayString}/>)
		}
	}

	// categorize stat boosts to display them in different boxes
	let categorizedBoosts = {}
	for (let x in miscData.statCategories) { // for each category defined above
		categorizedBoosts[x] = []
		let statsToCategorize = miscData.statCategories[x]

		for (let z in statsToCategorize) { // for each stat in category
			let statToCategorize = statsToCategorize[z]
			let stat = stats[statToCategorize.type][statToCategorize.id] // the stat in the build
			

			
			if (utils.hasKey(statStrings, statToCategorize.type) && utils.hasKey(statStrings[statToCategorize.type], statToCategorize.id)) {
				categorizedBoosts[x].push(<StatBoost key={Math.random()} type={statToCategorize.type} subType={statToCategorize.id} text={statStrings[statToCategorize.type][statToCategorize.id]}/>)
			}
			else {
				// alert("t")
			}
		}
	}
	return (
		<Container className="flexbox-vertical flex-align-start skillbook">
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Boosts"} className={"flex-grow"}/>
				<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
			</div>

			<div style={{height: "20px"}}/>

			<div className="flexbox-horizontal flex-wrap wrap-y" style={{alignItems: "flex-start"}}>
				<StatTab name="Resistances" elements={categorizedBoosts.realResistances} width="200px"/>
				<StatTab name="Attributes" elements={categorizedBoosts.realAttributes} width="200px"/>
				<StatTab name="Skill Abilities" elements={categorizedBoosts.skillAbilities} width="200px"/>
				<StatTab name="Combat Abilities" elements={categorizedBoosts.combatAbilities} width="300px"/>
				<StatTab name="Summon Boosts" width="300px" elements={categorizedBoosts.summonBoosts}/>
				<StatTab name="Voracity" elements={categorizedBoosts.voracity} width="300px"/>

				<div style={{maxHeight: "500px", width: "500px"}} className="flexbox-vertical flex-align-start wrap-y">
					<Text text="Temp place for other stats"/>
					<hr/>
					{boosts}
				</div>
			</div>
		</Container>
	)
}
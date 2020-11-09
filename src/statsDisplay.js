import { Text, Icon, Container, TabButton } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"
import { BuffBar } from "./buffs.js"

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
		<div style={{maxHeight: "500px", width: props.width, height: "unset", marginBottom: "20px"}} className="flexbox-vertical flex-align-start">
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
	let stats = props.app.stats
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

			if (!(stat.type in miscData.statCategories) || !(utils.hasKey(miscData.statCategories[stat.type], stat.id)))
				boosts.push(<Text key={z} text={displayString}/>)
		}
	}

	let categoryElements = []
	let statSheets = []
	// categorize stat boosts to display them in different boxes
	let categorizedBoosts = {}
	for (let x in miscData.statCategories) { // for each category defined above
		let categoryIsChosen = (props.app.state.statCategories.has(x))

		categoryElements.push(<TabButton key={x} chosen={categoryIsChosen} func={()=>{game.app.toggleStatCategory(x)}} text={utils.capitalize(x)}/>)

		if (!categoryIsChosen)
			continue

		categorizedBoosts[x] = []
		let statsToCategorize = miscData.statCategories[x]

		for (let z in statsToCategorize) { // for each stat in category
			let statToCategorize = statsToCategorize[z]
			// let stat = stats[statToCategorize.type][statToCategorize.id] // the stat in the build
			
			
			if (utils.hasKey(statStrings, statToCategorize.type) && utils.hasKey(statStrings[statToCategorize.type], statToCategorize.id)) {
				categorizedBoosts[x].push(<StatBoost key={z} type={statToCategorize.type} subType={statToCategorize.id} text={statStrings[statToCategorize.type][statToCategorize.id]}/>)
			}
		}

		// add the stat sheet element
		statSheets.push(<StatTab key={x} name={x} elements={categorizedBoosts[x]} width="300px"/>)
	}
	return (
		<Container className="flexbox-vertical flex-align-start skillbook">
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Boosts"} className={"flex-grow"}/>
				<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
			</div>

			<div style={{height: "20px"}}/>

			<BuffBar app={props.app}/>

			<div className="flexbox-horizontal flex-wrap flex-align-space-evenly" style={{alignItems: "flex-start"}}>
				<div className="flexbox-vertical flex-align-start" style={{width: "20%"}}>
					{categoryElements}
				</div>
				<div className="flexbox-horizontal stat-sheets flex-wrap" style={{width: "70%", height: "500px"}}>
					
					{statSheets}

					<div style={{maxHeight: "500px", width: "500px"}} className="flexbox-vertical flex-align-start wrap-y">
						<Text text="Temp place for other stats"/>
						<hr/>
						{boosts}
					</div>
				</div>
			</div>
		</Container>
	)
}
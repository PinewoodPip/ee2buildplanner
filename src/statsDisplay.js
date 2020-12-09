import React from 'react';

import { Text, Icon, Container, TabButton, PopupHeader } from "./genericComponents.js"
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
				<Text text={props.name}/>
			</div>
			<hr/>
			{props.elements}
		</div>
	)
}

export class Boosts extends React.Component {
	constructor() {super()}

	shouldComponentUpdate(nextProps, nextState) {
		return true
	}

	render() {
		let props = this.props
		let boosts = []
		let stats = game.getStats() // todo fix
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
			let categoryIsChosen = (props.app.state.statCategory == x)

			categoryElements.push(<TabButton key={x} chosen={categoryIsChosen} func={()=>{game.app.setState({statCategory: x})}} text={utils.capitalize(x)}/>)

			if (!categoryIsChosen)
				continue

			categorizedBoosts[x] = []
			let statsToCategorize = miscData.statCategories[x]

			for (let z in statsToCategorize) { // for each stat in category
				let statToCategorize = statsToCategorize[z]
				
				
				if (utils.hasKey(statStrings, statToCategorize.type) && utils.hasKey(statStrings[statToCategorize.type], statToCategorize.id)) {
					categorizedBoosts[x].push(<StatBoost key={z} type={statToCategorize.type} subType={statToCategorize.id} text={statStrings[statToCategorize.type][statToCategorize.id]}/>)
				}
			}

			// add the stat sheet element
			statSheets.push(<StatTab key={x} name={x} elements={categorizedBoosts[x]} width="300px"/>)
		}

		// if no stat sheets are selected, show a hint on how to use them
		if (statSheets.length === 0) {
			statSheets = <Text text="Click on the stat categories on the left to display their relevant stats here."/>
		}

		return (
			<Container className="flexbox-vertical flex-align-start" style={{width: "700px", height: "600px"}}>
				<PopupHeader text="Stats" app={props.app}/>

				<BuffBar app={props.app}/>

				<hr/>

				<div className="flexbox-horizontal flex-wrap flex-align-space-evenly">
					<div className="flexbox-vertical flex-align-start" style={{width: "25%"}}>
						{categoryElements}
					</div>

					{/* <div className="flex-grow"/> */}

					<div className="flexbox-horizontal flex-wrap wrap-y" style={{width: "65%", height: "500px", alignItems: "start"}}>
						
						{statSheets}

					</div>
				</div>
			</Container>
		)
	}
}
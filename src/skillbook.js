import './App.css';
import React from 'react';

import { Icon, Container, Text, Tooltip } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

export class Skill extends React.Component {
	toggleSkill() {
		let skills = this.props.app.state.skills.slice()
		let id = this.props.data.id

		if (skills.includes(id)) {
			skills = skills.filter((x) => {return x != id})
		}
		else {
			skills.push(id)
		}

		this.props.app.setState({skills: skills})
	}

	render() {
		let img = this.props.data.Icon
		let highlight = this.props.highlight != "false"
		
		let className = (this.props.app.state.skills.includes(this.props.data.id) && highlight) ? "skill-selected" : ""

		return <SkillTooltip data={this.props.data}>
			<Icon img={img} className={"skill-icon " + className} size={"64px"} onClick={this.toggleSkill.bind(this)} style={this.props.style}>

			</Icon>
		</SkillTooltip>
	}
}

function SkillBookAbilityCategory(props) {
	let func = () => {props.app.setState({skillbookCategory: props.category})}
	let className = (props.app.state.skillbookCategory == props.category) ? "chosen" : ""

	return (
		<div className={"flexbox-horizontal flex-align-start skillbook-category " + className} onClick={func}>
			<Icon img={game.mappings.abilityImages[props.category]} size="32px"/>
			<div style={{width: "15px"}}/>
			<Text text={game.mappings.abilityNames[props.category]}/>
		</div>
	)
}

function SkillTooltip(props) {
	let skill = props.data
	let desc = skill.DescriptionRef.split("Source Infusions:")
	let ability = game.mappings.abilityNames[skill.Ability]

	if (desc.length > 1) {
		desc = [
			desc[0],
		]

		let colorHighlighting = {
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
		}

		let infusionText = [
			skill.DescriptionRef.split(`1:`)[1],
			skill.DescriptionRef.split(`2 (requires 5 <span class='${colorHighlighting[ability]}'>${ability}</span>):`)[1],
			skill.DescriptionRef.split(`3 (requires 9 <span class='${colorHighlighting[ability]}'>${ability}</span>):`)[1],
		]

		if (infusionText[0] != undefined) {
			infusionText[0] = infusionText[0].split(`2 (requires 5 <span class='${colorHighlighting[ability]}'>${ability}</span>):`)[0]
		}
		if (infusionText[1] != undefined) {
			infusionText[1] = infusionText[1].split(`3 (requires 9 <span class='${colorHighlighting[ability]}'>${ability}</span>):`)[0]
		}
	
		let prefixes = [
			"<span class='text-si-symbol'>♦</span>: ",
			"<span class='text-si-symbol'>♦♦</span>: ",
			"<span class='text-si-symbol'>♦♦♦</span>: "
		]
	
		for (let x in infusionText) {
			if (infusionText[x] != undefined) {
				desc.push(prefixes[x] + infusionText[x])
			}
		}
	}
	var parser = require('html-react-parser');

	let realDesc = []
	for (let x in desc) {
		realDesc.push(parser("<p key='" + x + "'>" + desc[x] + "</p>"))
	}

	let tooltip = <div className="flexbox-vertical">
		<Text text={skill.DisplayNameRef}/>
		<Text text={skill.id} className="text-small"/>

		<div style={{height: "10px"}}/>

		<div className="text-si">
			{realDesc}
		</div>
	</div>
	return (
		<Tooltip content={tooltip} placement="right">
			{props.children}
		</Tooltip>
	)
}

export function SkillBook(props) {
	let abilityButtons = []
	for (let x in game.skills.sorted) {
		abilityButtons.push(<SkillBookAbilityCategory key={x} category={x} app={props.app}/>)
	}

	let skills = []
	for (let x in game.skills.sorted[props.app.state.skillbookCategory]) {
		let skill = game.skills.sorted[props.app.state.skillbookCategory][x]
		skills.push(<Skill key={x} data={skill} app={props.app}/>)
	}

	return (
		<Container className="flexbox-vertical flex-align-start skillbook">
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Skillbook"} className={"flex-grow"}/>
				<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
			</div>

			<div style={{height: "20px"}}/>

			<div className="flexbox-horizontal flex-align-space-evenly full-width lateral-margin">
				<div className="flexbox-vertical">
					{abilityButtons}
				</div>
				<div className="flexbox-wrap flexbox-horizontal skill-listing">
					{skills}
				</div>
			</div>
		</Container>
	)
}
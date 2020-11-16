import './App.css';
import React from 'react';
import _ from "underscore";

import { Icon, Container, TabbedContainer, Text, TabButton, Tooltip } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

function IncrementButton(props) {
	return (
		<Icon onContextMenu={props.onContextMenu} img={props.img} onClick={props.onClick} className="button" size="24px"/>
	)
}

function CivilAbility(props) {
	let func = (increment) => {game.changeCivil(props.id, increment)}
	return <div className="flexbox-horizontal">
		{/* <Icon className="" img={game.mappings.attributeIcons[props.id]} size="24px"/> */}
		<Text style={{width: "50px"}} text={utils.format("{0}:", props.id)}/>
		<Text style={{width: "25px"}} text={utils.format("{0}", game.app.state.civils[props.id])}/>

		<IncrementButton img={"remove_point"} onClick={()=>{func(-1)}}/>
		<IncrementButton img={"add_point"} onClick={()=>{func(1)}}/>
	</div>
}

function CivilAbilities(props) {
	return (
		<Container className="flexbox-vertical flex-align-start skill-abilities" name="Attributes" noBg>
			<CivilAbility id="bartering"/>
			<CivilAbility id="luckycharm"/>
			<CivilAbility id="persuasion"/>
			<CivilAbility id="loremaster"/>
			<CivilAbility id="telekinesis"/>
			<CivilAbility id="sneaking"/>
			<CivilAbility id="thievery"/>
		</Container>
	)
}

function Talents(props) {
	let talents = []
	// show innate talents at the top
	for (let x in miscData.races[props.app.state.physique.race].talents) {
		let talent = miscData.talents[miscData.races[props.app.state.physique.race].talents[x]]
		talents.push(
			// when tooltips are used we need to use flex-align-start
			<div className="flexbox-horizontal flex-align-start full-width">
				<Tooltip content={talent.description} placement="right">
					{/* theory: 100% width doesn't work here because it'd be 100% width of the tooltip trigger. annoying */}
					<TabButton key={x} func={null} chosen={props.app.state.talents.has(x)} text={talent.name} style={{width: "170px"}}/>
				</Tooltip>
			</div>
		)
	}
	for (let x in miscData.talents) {
		let talent = miscData.talents[x]

		if (talent.unselectable)
			continue

		let func = () => {props.app.toggleTalent(x)}

		// not 100% sure why we need a flexbox to make this full-width
		talents.push(
			// when tooltips are used we need to use flex-align-start
			<div className="flexbox-horizontal flex-align-start full-width">
				<Tooltip content={talent.description} placement="right">
					{/* theory: 100% width doesn't work here because it'd be 100% width of the tooltip trigger. annoying */}
					<TabButton key={x} func={func} chosen={props.app.state.talents.has(x)} text={talent.name} style={{width: "170px"}}/>
				</Tooltip>
			</div>
		)
	}
	return (
		<Container className="flexbox-vertical flex-align-start skill-abilities" noBg>
			<Text text={utils.format("{0} chosen", props.app.state.talents.size)}/>
			{/* wtf... using a % height down below causes the dropdown to be pushed up */}
			<Container className="flexbox-vertical flex-align-start wrap-y" noBg style={{height: "400px", width: "100%"}}>
				{talents}
			</Container>
		</Container>
	)
}

function Attribute(props) {
	let disabledDecrement = false
	let disabledIncrement = false
	let func = (increment) => {
		game.changeAttribute(props.id, increment)
	}
	let attrName = game.mappings.attributeNamesShort[props.id]
	// let attrAmount = game.app.state.attributes[props.id]
	let attrAmount = game.getStats().realStats[props.id].amount
	let menu = [
		<Text text="Choose option:"/>,
		<Text text="Max out" onClick={()=>{game.maximizeAttribute(props.id)}}/>,
		<Text text="Remove all" onClick={()=>{game.minimizeAttribute(props.id)}}/>,
	]

	return (
		<div className="flexbox-horizontal flex-align-centered" style={{height: "30px"}} onContextMenu={(e)=>{game.app.contextMenu(menu, e)}}>
			<Icon className="" img={game.mappings.attributeIcons[props.id]} size="24px"/>
			<Text style={{width: "50px"}} text={utils.format("{0}:", attrName)}/>
			<Text style={{width: "25px"}} text={utils.format("{0}", attrAmount)}/>

			<div style={{width: "10px"}}/>

			<IncrementButton img={"remove_point"} onClick={()=>{func(-1)}} disabled={disabledDecrement}/>
			<IncrementButton img={"add_point"} onClick={()=>{func(1)}} disabled={disabledIncrement}/>
		</div>
	)
}

class SkillAbilities extends React.Component {
	SI_Levels = [
		"◊",
		"♦",
		"♦♦",
		"♦♦♦",
	]

	hasAnyRelevantSkill(category) {
		for (let x in this.props.app.state.skills) {
			let skill = game.skills[this.props.app.state.skills[x]]
			if (skill.Ability === category)
				return true
		}
		return false
	}

	cycleLevel(category) {
		let currentLevel = this.props.app.state.skillAbilities[category]
		let newLevel;

		// treat the current level as being higher if the user has a relevant skill in this category (SI level 1 has no requirements)
		if (currentLevel === 0 && this.hasAnyRelevantSkill(category))
			currentLevel = 1

		// loop back to first index after going through all the states
		newLevel = (currentLevel + 1 > 3) ? 0 : currentLevel + 1

		let newObj = _.clone(this.props.app.state.skillAbilities)
		newObj[category] = newLevel

		this.props.app.setState({skillAbilities: newObj})
	}

	render() {
		let skillAbilities = []
		let openSkillbookFunc = function(category){this.props.app.setState({popup: "skillbook", skillbookCategory: category})}.bind(this)

		for (let x in game.skills.sorted) {
			if (x === "Source")
				continue
			let level = this.SI_Levels[this.props.app.state.skillAbilities[x]]

			if (this.props.app.state.skillAbilities[x] === 0 && this.hasAnyRelevantSkill(x)) {
				level = this.SI_Levels[1];
			}

			let button = <div className="si-button unselectable" onClick={this.cycleLevel.bind(this, x)}>
				<Text text={level}/>
			</div>

			let className = (this.hasAnyRelevantSkill(x) || this.props.app.state.skillAbilities[x] > 0) ? "highlighted-bg" : ""

			skillAbilities.push(<div key={x} className={"flexbox-horizontal flex-align-start " + className} style={{width: "90%", margin: "2px 0px 2px 0px"}}>
				<Icon img={game.mappings.abilityImages[x]} size="32px" onClick={()=>{openSkillbookFunc(x)}}/>
				<Text text={game.mappings.abilityNames[x]} className="flex-grow" onClick={()=>{openSkillbookFunc(x)}}/>
				{button}
			</div>)
		}

		return <Container className="flexbox-vertical flex-align-start skill-abilities" noBg={this.props.noBg}>
			{/* <Text text={"Skill Abilities"}/> */}
			{skillAbilities}
		</Container>
	}
}

// todo rename this component; holds far more than just attributes now
export class Attributes extends React.Component {
	render() {
        let remaining = miscData.playerAttributes - game.totalAttributePointsSpent
        
		return <TabbedContainer style={{minWidth: "220px", height: "100%"}}>
			<Container className="flexbox-vertical flex-align-start skill-abilities" name="Attributes" noBg>
				<Text text={utils.format("{0} Remaining", remaining)}/>

				<Attribute id="str"/>
				<Attribute id="fin"/>
				<Attribute id="pwr"/>
				<Attribute id="con"/>
				<Attribute id="mem"/>
				<Attribute id="wits"/>
			</Container>
			<Container name="Skill Abilities" noBg className="flexbox-vertical flex-align-start">
				<SkillAbilities app={this.props.app} noBg/>
			</Container>
			<Container name="Civil Abilities" noBg className="flexbox-vertical flex-align-start">
				<CivilAbilities app={this.props.app} noBg/>
			</Container>
			<Container name="Talents" noBg className="flexbox-vertical flex-align-start">
				<Talents app={this.props.app} noBg/>
			</Container>
		</TabbedContainer>
	}
}
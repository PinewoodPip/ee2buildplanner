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

function Ability(props) {
	let func = (increment) => {game.changeAbility(props.id, increment)}
	let amountText = utils.format((game.app.stats.flexStat[props.id].amount > 0 ? "{0} (+{1})" : "{0}"), game.app.state.abilities[props.id], game.app.stats.flexStat[props.id].amount)

	return	<div className={"flexbox-horizontal margin-vertical " + props.className} style={{width: "95%"}}>
			<div className="flexbox-horizontal flex-align-start" style={{width: "80%"}}>
				<Icon className="" img={game.mappings.abilityImages[props.id]} size="24px"/>
				<div style={{width: "5px"}}/>
				<div className="flexbox-horizontal flex-align-space-between" style={{width: "70%"}}>
					<Text text={utils.format("{0}:", miscData.mappings.abilityNames[props.id])}/>
					<Text text={amountText}/>
				</div>
			</div>

			<div className="flexbox-horizontal flex-align-centered" style={{width: "20%"}}>
				<IncrementButton img={"remove_point"} onClick={()=>{func(-1)}}/>
				<IncrementButton img={"add_point"} onClick={()=>{func(1)}}/>
			</div>
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
					<TabButton key={x} func={null} chosen={props.app.talents.has(miscData.races[props.app.state.physique.race].talents[x])} text={talent.name} style={{width: "170px"}}/>
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
					<TabButton key={x} func={func} chosen={props.app.talents.has(x)} text={talent.name} style={{width: "170px"}}/>
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

function CombatAbilities(props) {
	let textClass = game.aboveNaturalAbilityCap ? "overflowed full-width" : ""
	return (
		<Container className="flexbox-vertical flex-align-start full-size" name="Attributes" noBg>
			<Text text={utils.format("{0} points spent", game.investedAbilities)} className={textClass}/>
			<Ability id="DualWielding"/>
			<Ability id="Ranged"/>
			<Ability id="SingleHanded"/>
			<Ability id="TwoHanded"/>
			{/* Defensive */}
			<hr/>
			<Ability id="Leadership"/>
			<Ability id="Perseverance"/>
			<Ability id="PainReflection"/>
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

			<Tooltip content={utils.format("Natural investment: {0}", game.app.state.attributes[props.id])}>
				<Text style={{width: "25px"}} text={utils.format("{0}", attrAmount)}/>
			</Tooltip>

			<div style={{width: "10px"}}/>

			<IncrementButton img={"remove_point"} onClick={()=>{func(-1)}} disabled={disabledDecrement}/>
			<IncrementButton img={"add_point"} onClick={()=>{func(1)}} disabled={disabledIncrement}/>
		</div>
	)
}

class SkillAbilities extends React.Component {
	hasAnyRelevantSkill(category) {
		for (let x in this.props.app.state.skills) {
			let skill = game.skills[this.props.app.state.skills[x]]
			if (skill.Ability === category)
				return true
		}
		return false
	}

	openSkillbook(category) {
		this.props.app.setState({popup: "skillbook", skillbookCategory: category})
	}

	render() {
		let textClass = game.aboveNaturalAbilityCap ? "overflowed full-width" : ""
		let skillAbilities = []

		let index = 0;
		for (let x in game.skills.sorted) {
			let statName = miscData.skillAbilityList[index]
			console.log(game.app.stats)
			if (x === "Source")
				continue

			skillAbilities.push(
				// todo fix this to also consider bonuses
				<Ability key={x} id={statName} className={this.hasAnyRelevantSkill(x) || this.props.app.state.abilities[x] > 0 ? "highlighted-bg" : ""}/>
			)

			index++;
		}

		return <Container className="flexbox-vertical flex-align-start full-size" noBg={this.props.noBg}>
			<Text text={utils.format("{0} points spent", game.investedAbilities)} className={textClass}/>
			{skillAbilities}
		</Container>
	}
}

// todo rename this component; holds far more than just attributes now
export class Attributes extends React.Component {
	render() {
        let remaining = game.maxNaturalAttributePoints - game.totalAttributePointsSpent
        
		return <TabbedContainer style={{minWidth: "300px", height: "100%"}}>
			<Container className="flexbox-vertical flex-align-start skill-abilities" name="Attributes" noBg>
				<Text text={utils.format("{0} Remaining", remaining)} className={remaining < 0 ? "overflowed" : ""}/>

				<Attribute id="str"/>
				<Attribute id="fin"/>
				<Attribute id="pwr"/>
				<Attribute id="con"/>
				<Attribute id="mem"/>
				<Attribute id="wits"/>
			</Container>
			<Container name="Combat Abilities" noBg className="flexbox-vertical flex-align-start full-size">
				<CombatAbilities app={this.props.app} noBg/>
			</Container>
			<Container name="Skill Abilities" noBg className="flexbox-vertical flex-align-start full-size">
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
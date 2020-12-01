import './App.css';
import React from 'react';

import { Icon, Container, TabbedContainer, Text, TabButton, Tooltip } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

function IncrementButton(props) {
	let className = props.disabled ? "disabled" : "button"
	return (
		<Icon onContextMenu={props.onContextMenu} img={props.img} onClick={props.onClick} className={className} size="24px"/>
	)
}

function CivilAbility(props) {
	let func = (increment) => {game.changeCivil(props.id, increment)}
	let disabledDecrement = game.app.state.civils[props.id] === 0
	let disabledIncrement = game.app.state.civils[props.id] === 10 // todo change later when we add equips

	return (
	<div className={"flexbox-horizontal margin-vertical " + props.className} style={{width: "95%"}}>
			<div className="flexbox-horizontal flex-align-start" style={{width: "80%"}}>
				<Icon className="" img={game.mappings.civilIcons[props.id]} size="24px"/>
				<div style={{width: "5px"}}/>
				<div className="flexbox-horizontal flex-align-space-between" style={{width: "70%"}}>
					<Text text={utils.format("{0}:", miscData.mappings.civilNames[props.id])}/>
					<Tooltip content={utils.format("Civil Points invested: {0}", game.app.state.civils[props.id])}>
						<Text text={utils.format("{0}", game.app.state.civils[props.id])}/>
					</Tooltip>
				</div>
			</div>

			<div className="flexbox-horizontal flex-align-centered" style={{width: "20%"}}>
				<IncrementButton img={"remove_point"} onClick={()=>{func(-1)}} disabled={disabledDecrement}/>
				<IncrementButton img={"add_point"} onClick={()=>{func(1)}} disabled={disabledIncrement}/>
			</div>
		</div>
		)
}

class Ability extends React.Component {
	render() {
		let func = (increment) => {game.changeAbility(props.id, increment)}
		let app = this.props.app
		let props = this.props
		// let stats = game.getStats()
		let naturalAmount = game.app.state.abilities[props.id]
		if (game.app.state.lw && props.id !== "Polymorph")
			naturalAmount *= 2
		let amountText = utils.format((app.stats.flexStat[props.id].amount > 0 ? "{0} (+{1})" : "{0}"), naturalAmount, app.stats.flexStat[props.id].amount)

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
}

function CivilAbilities(props) {
	return (
		<Container className="flexbox-vertical flex-align-start full-size" name="Attributes" noBg>
			<CivilAbility id="bartering"/>
			<CivilAbility id="luckycharm"/>
			<CivilAbility id="persuasion"/>
			<hr/>
			<CivilAbility id="loremaster"/>
			<CivilAbility id="telekinesis"/>
			<hr/>
			<CivilAbility id="sneaking"/>
			<CivilAbility id="thievery"/>
		</Container>
	)
}

function Talent(props) {
	// when tooltips are used we need to use flex-align-start
	return <div className="flexbox-horizontal flex-align-start full-width">
		<Tooltip content={props.data.description} placement="right">
			{/* theory: 100% width doesn't work here because it'd be 100% width of the tooltip trigger. annoying. */}
			<TabButton func={props.func} chosen={props.chosen} text={props.data.name} style={{width: "170px"}}/>
		</Tooltip>
	</div>
}

function Talents(props) {
	let talents = []

	// show lw if this build is made for it
	if (props.app.state.lw) {
		talents.push(<Talent key={-1} data={miscData.talents.loneWolf} chosen={true}/>)
	}

	// show innate talents at the top
	for (let x in miscData.races[props.app.state.physique.race].talents) {
		let talent = miscData.talents[miscData.races[props.app.state.physique.race].talents[x]]
		talents.push(<Talent key={x} data={talent} chosen={true}/>)
	}

	// display all normal talents
	for (let x in miscData.talents) {
		let talent = miscData.talents[x]

		if (talent.unselectable)
			continue

		let func = () => {props.app.toggleTalent(x)}

		// not 100% sure why we need a flexbox to make this full-width
		talents.push(<Talent key={x} func={func} data={talent} chosen={props.app.talents.has(x)}/>)
	}

	// use red text highlight if we pick too many talents
	let className = props.app.state.talents.size > miscData.maxTalents ? "overflowed" : ""
	
	return (
		// using full-size class here screws things up, the tooltip's are probably to blame
		<Container className="flexbox-vertical flex-align-start" noBg>
			<Text text={utils.format("{0} chosen", props.app.state.talents.size)} className={className}/>
			{/* wtf... using a % height down below causes the dropdown to be pushed up */}
			<Container className="flexbox-vertical flex-align-start wrap-y" noBg style={{height: "350px", width: "100%"}}>
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
			<Ability app={props.app} id="DualWielding"/>
			<Ability app={props.app} id="Ranged"/>
			<Ability app={props.app} id="SingleHanded"/>
			<Ability app={props.app} id="TwoHanded"/>
			{/* Defensive */}
			<hr/>
			<Ability app={props.app} id="Leadership"/>
			<Ability app={props.app} id="Perseverance"/>
			<Ability app={props.app} id="PainReflection"/>
		</Container>
	)
}

class Attribute extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		// todo
		return true
	}

	render() {
		let props = this.props
		let disabledIncrement = game.attributeIsMaxed(props.id) || game.totalAttributePointsSpent >= game.maxNaturalAttributePoints
		let disabledDecrement = game.app.state.attributes[props.id] === 0

		let func = (increment) => {
			game.changeAttribute(props.id, increment)
		}

		let attrName = game.mappings.attributeNames[props.id]

		// todo fix this
		let total = game.getStats().realStats[props.id].amount

		let menu = [
			<Text key={0} text="Choose option:"/>,
			<Text key={1} text="Max out" onClick={()=>{game.maximizeAttribute(props.id)}}/>,
			<Text key={2} text="Remove all" onClick={()=>{game.minimizeAttribute(props.id)}}/>,
		]

		return (
			<div className={"flexbox-horizontal margin-vertical " + props.className} style={{width: "95%"}}>
				<div className="flexbox-horizontal flex-align-start" style={{width: "80%"}}>
					<Icon className="" img={game.mappings.attributeIcons[props.id]} size="24px"/>
					<div style={{width: "5px"}}/>
					<div className="flexbox-horizontal flex-align-space-between" style={{width: "70%"}}>
						<Text text={attrName}/>
						<Tooltip content={utils.format("Attribute Points invested: {0}", game.app.state.attributes[props.id])}>
							<Text text={utils.format("{0}", total)}/>
						</Tooltip>
					</div>
				</div>

				<div className="flexbox-horizontal flex-align-centered" style={{width: "20%"}} onContextMenu={(e)=>{game.app.contextMenu(menu, e)}}>
					<IncrementButton img={"remove_point"} onClick={()=>{func(-1)}} disabled={disabledDecrement}/>
					<IncrementButton img={"add_point"} onClick={()=>{func(1)}} disabled={disabledIncrement}/>
				</div>
			</div>
		)
	}
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
			if (x === "Source")
				continue

			skillAbilities.push(
				<Ability app={this.props.app} key={x} id={statName} className={this.hasAnyRelevantSkill(x) || this.props.app.state.abilities[x] > 0 ? "highlighted-bg" : ""}/>
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
	shouldComponentUpdate(nextProps, nextState) {
		return true
	}
	render() {
        let remaining = game.maxNaturalAttributePoints - game.totalAttributePointsSpent
        
		return <TabbedContainer app={this.props.app} style={{minWidth: "300px", height: "100%"}}>
			<Container name="Attributes" noBg className="flexbox-vertical flex-align-start full-size">
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
			<Container name="Civil Abilities" noBg className="flexbox-vertical flex-align-start full-size">
				<CivilAbilities app={this.props.app} noBg/>
			</Container>
			<Container name="Talents" noBg className="flexbox-vertical flex-align-start full-size">
				<Talents app={this.props.app} noBg/>
			</Container>
		</TabbedContainer>
	}
}
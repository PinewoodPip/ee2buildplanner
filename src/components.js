import React from 'react';
import { game } from "./App.js"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import _ from "underscore";
import update from 'immutability-helper';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export class Tooltip extends React.Component {
	render() {
		let placement = (this.props.placement != undefined) ? this.props.placement : "bottom"
		return (
		  <Tippy content={this.props.content} placement={placement} duration="0">
			<span>
			  {this.props.children}
			</span>
		  </Tippy>
		)
	}
}

// function ContextMenu(props) {
// 	return (
// 		<MenuProvider id={props.id}>
// 			{props.children}
// 		</MenuProvider>
// 	)
// }

function ContextMenuContents(props) {
	return (
		<ContextMenu id={props.id}>
			{props.children}
		</ContextMenu>
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

class TabbedContainer extends React.Component {
    render() {
        return <div className="flexbox-vertical">
            <div className="flexbox-horiztonal">
                {this.props.tabs}
            </div>
            <Container>
                {this.props.children}
            </Container>
        </div>
    }
}

class Container extends React.Component {
    render() {
        return <div className={this.props.className + " box"}>
            {this.props.children}
        </div>
    }
}

class CharacterProfile extends React.Component {
    render() {
        return <Container className="character-profile">
            <div className="flexbox-horizontal">
				<Portrait app={this.props.app}/>
				<div className="flexbox-vertical">
					<CharacterName app={this.props.app}/>
					<CharacterRace app={this.props.app}/>
				</div>
			</div>
        </Container>
    }
}

function Portrait(props) {
	return (
		<div className="portrait">
			{/* todo */}
		</div>
	)
}

export function Text(props) {
	return <p className={"text " + props.className}>{props.text}</p>
}

function CharacterName(props) {
	return (
		<div className="flexbox-horizontal name-edit-container">
			<Text text={props.app.state.name}/>
			<CharacterNameEditButton app={props.app}/>
		</div>
	)
}

function CharacterNameEditButton(props) {
	let func = () => {
		let newName = window.prompt("Enter a name for this character:")
		newName = (newName != "") ? newName : props.app.state.name
		props.app.setState({name: newName})
	}

	return (
		<div className="name-edit box" onClick={()=>{func()}}>
			{/* todo */}
		</div>
	)
}

function Icon(props) {
	let className = (props.className != undefined) ? props.className : "icon"
	let style = (props.style != undefined) ? props.style : {}
	style.width = props.size
	style.height = props.size
	return (
		<div style={style} className={className} onClick={props.onClick}>
			<img src={props.img} style={{width: props.size, height: props.size}}/>
		</div>
	)
}

function SkillBookAbilityCategory(props) {
	let func = () => {props.app.setState({skillbookCategory: props.category})}
	let className = (props.app.state.skillbookCategory == props.category) ? "chosen" : ""

	return (
		<div className={"flexbox-horizontal flex-align-start skillbook-category " + className} onClick={func}>
			<Icon img={game.getImage(game.mappings.abilities[props.category])} size="32px"/>
			<div style={{width: "15px"}}/>
			<Text text={game.mappings.abilityNames[props.category]}/>
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
			if (skill.Ability == category)
				return true
		}
		return false
	}

	cycleLevel(category) {
		let currentLevel = this.props.app.state.skillAbilities[category]
		let newLevel;

		// treat the current level as being higher if the user has a relevant skill in this category (SI level 1 has no requirements)
		if (currentLevel == 0 && this.hasAnyRelevantSkill(category))
			currentLevel = 1

		// loop back to first index after going through all the states
		newLevel = (currentLevel + 1 > 3) ? 0 : currentLevel + 1

		let newObj = _.clone(this.props.app.state.skillAbilities)
		newObj[category] = newLevel

		this.props.app.setState({skillAbilities: newObj})
	}

	render() {
		let skillAbilities = []
		for (let x in game.skills.sorted) {
			if (x == "Source")
				continue
			let level = this.SI_Levels[this.props.app.state.skillAbilities[x]]

			if (this.props.app.state.skillAbilities[x] == 0 && this.hasAnyRelevantSkill(x)) {
				level = this.SI_Levels[1];
			}

			let button = <div className="si-button unselectable" onClick={this.cycleLevel.bind(this, x)}>
				<Text text={level}/>
			</div>

			let className = (this.hasAnyRelevantSkill(x) || this.props.app.state.skillAbilities[x] > 0) ? "highlighted-bg" : ""

			skillAbilities.push(<div className={"flexbox-horizontal flex-align-start " + className} style={{width: "90%", margin: "2px 0px 2px 0px"}}>
				<Icon img={game.getImage(game.mappings.abilities[x])} size="32px"/>
				<Text text={game.mappings.abilityNames[x]} className="flex-grow"/>
				{button}
			</div>)
		}

		return <Container className="flexbox-vertical skill-abilities">
			<Text text={"Skill Abilities"}/>
			{skillAbilities}
		</Container>
	}
}

class Skill extends React.Component {
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
		let img = game.getImage(this.props.data.Icon)
		let highlight = this.props.highlight != "false"
		
		let className = (this.props.app.state.skills.includes(this.props.data.id) && highlight) ? "skill-selected" : ""

		return <SkillTooltip data={this.props.data}>
			<Icon img={img} className={"skill-icon " + className} size={"64px"} onClick={this.toggleSkill.bind(this)} style={this.props.style}>

			</Icon>
		</SkillTooltip>
	}
}

function AscensionFamilyButton(props) {
	return (
		<div className="flexbox-horizontal">
			<Text text={props.family}/>
		</div>
	)
}

export function AscensionPopup(props) {
	let familyButtons = []
	for (let x in game.ascension.aspects) {
		familyButtons.push(<AscensionFamilyButton key={x} family={x} app={props.app}/>)
	}

	// let skills = []
	// for (let x in game.skills.sorted[props.app.state.skillbookCategory]) {
	// 	let skill = game.skills.sorted[props.app.state.skillbookCategory][x]
	// 	skills.push(<Skill key={x} data={skill} app={props.app}/>)
	// }

	return (
		<Container className="flexbox-vertical skillbook">
			<div className="flexbox-horizontal flex-align-end full-width">
				<Text text={"Ascension"} className={"flex-grow"}/>
				<Icon img={game.getImage("statIcons_DecayingTouch")} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
			</div>
			<div className="flexbox-horizontal">
				<div className="flexbox-vertical">
					{familyButtons}
				</div>
				<div className="flexbox-wrap skill-listing">
					{/* {skills} */}
				</div>
			</div>
		</Container>
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
		<Container className="flexbox-vertical skillbook">
			<div className="flexbox-horizontal flex-align-end full-width">
				<Text text={"Skillbook"} className={"flex-grow"}/>
				<Icon img={game.getImage("statIcons_DecayingTouch")} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
			</div>
			<div className="flexbox-horizontal">
				<div className="flexbox-vertical">
					{abilityButtons}
				</div>
				<div className="flexbox-wrap skill-listing">
					{skills}
				</div>
			</div>
		</Container>
	)
}

function CharacterRace(props) {
	let options = []
	for (let x in game.races) {
		options.push(<option key={x} value={x} selected={props.app.state.physique.race == x} onChange={(e)=>{props.app.setState({race: e.target.value}); game.render()}}>{game.races[x].name}</option>)
	}

	return (<div>
		<select>
			{options}
		</select>
	</div>)
}

function TopBar(props) {
	return (
		<div className="top-bar">

		</div>
	)
}

class Skills extends React.Component {
	openSkillBook() {
		this.props.app.setState({popup: "skillbook"})
	}

	render() {
		let skills = []
		for (let x in this.props.app.state.skills) {
			let skill = game.skills[this.props.app.state.skills[x]]
			skills.push(<Skill key={x} data={skill} app={this.props.app} highlight="false"/>)
		}

		// button to add more skills, opening the skillbook
		skills.push(<Icon img={game.getImage("statIcons_Regenerate")} size="64px" onClick={this.openSkillBook.bind(this)}/>)

		return (
			<Container className="skills">
				<div className="flexbox-horizontal-list" style={{margin: "10px"}}>
					{skills}
				</div>
			</Container>
		)
	}
}

function Aspect(props) {
	let asp = props.data
	let tooltip = game.ascension.getAspectElement(asp)
	let info = game.ascension.getAspect(asp)

	return (
		<Tooltip content={tooltip} placement="right">
			<Text text={info.name}/>
		</Tooltip>
	)
}

export function RightClickMenu(props) {
	let items = []
	for (let x in props.children) {
		items.push(<MenuItem>{props.children[x]}</MenuItem>)
	}
	return (
		<ContextMenu id={props.id} hideOnLeave={true}>
			<div className="context-menu">
				{items}
			</div>
		</ContextMenu>
	)
}

class Ascension extends React.Component {
	render() {
		let aspects = []
		for (let x in this.props.app.state.aspects) {
			let asp = this.props.app.state.aspects[x]

			// let info = game.ascension.getAspect(asp)

			aspects.push(<Aspect data={asp} app={this.props.app}/>)
		}

		let currentAspect = game.ascension.getAspectElement(this.props.app.state.aspects[this.props.app.state.selectedAspect], true)

		return <Container>
			<div className="flexbox-horizontal">
				<div className="flexbox-vertical ascension">
					{aspects}
				</div>
					<div className="aspect-preview flex-grow">
						{currentAspect}
					</div>
			</div>
		</Container>
	}
}

export class MainInterface extends React.Component {
	render() {
		return <div>
			<TopBar app={this.props.app}/>
			<div style={{margin: "25px"}}>
				<div className="flexbox-horizontal flex-align-centered" style={{height: "150px"}}>
					<CharacterProfile app={this.props.app}/>
					<Skills app={this.props.app}/>
				</div>
				<div className="flexbox-horizontal flex-align-start">
					<SkillAbilities app={this.props.app}/>
					<Ascension app={this.props.app}/>
				</div>
			</div>
		</div>
	}
}
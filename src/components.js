import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import _ from "underscore";
import update from 'immutability-helper';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { cloneDeep } from "lodash"

import { ContextMenuContents} from "./genericComponents.js"
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import * as utils from "./utils.js"
import { game } from "./App.js"
import * as miscData from "./miscData.js"

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

// a container that can have multiple tabs to switch between. Each child is a tab
class TabbedContainer extends React.Component {
	constructor() {
		super()
		this.state = {index: 0}
	}

	// changeIndex(increment) {
	// 	let max = this.props.children.length - 1
	// 	let newIndex = this.state.index + increment;

	// 	if (newIndex < 0)
	// 		newIndex = max
	// 	else if (newIndex > max)
	// 		newIndex = 0

	// 	this.setState({index: newIndex})
	// }

    render() {
		let options = []
		for (let x in this.props.children) {
			options.push(<option value={x}>{this.props.children[x].props.name}</option>)
		}
        return <Container className="flexbox-vertical" style={this.props.style}>
				<div style={{marginTop: "20px", marginBottom: "20px"}}>
					<select onChange={(e)=>{this.setState({index: e.target.value})}}>
						{options}
					</select>
				</div>
				
                {this.props.children[this.state.index]}
            </Container>
    }
}

class Container extends React.Component {
    render() {
		let bg = this.props.noBg ? "" : " box"
        return <div className={this.props.className + bg} style={this.props.style}>
            {this.props.children}
        </div>
    }
}

class CharacterProfile extends React.Component {
    render() {
        return <Container className="character-profile">
            <div className="flexbox-horizontal">
				<Portrait app={this.props.app}/>
				<div style={{width: "10px"}}/>
				<div className="flexbox-vertical">
					<CharacterName app={this.props.app}/>
					<CharacterRace app={this.props.app}/>
				</div>
			</div>
        </Container>
    }
}

function Portrait(props) {
	function changePortrait(e) {
		let elements = []
		for (let x in miscData.portraits) {
			elements.push(
				<Icon className="button" img={miscData.portraits[x]} style={{height: "100px", width: "80px"}} onClick={()=>{props.app.setState({portraitIndex: x})}}/>
			)
		}

		let realElements = [
			<div className="flexbox-horizontal flex-wrap" style={{maxWidth: "600px"}}>
				{elements}
			</div>
		]

		props.app.contextMenu(realElements, e)
	}
	return (
		<div className="portrait" style={{position: "relative"}} onContextMenu={changePortrait} >
			<Icon img={miscData.portraits[props.app.state.portraitIndex]} style={{width: "108px", height: "135px"}}/>

			<img src={utils.getImage("portrait_frame")} style={{width: "120px", height: "150px"}} className="portrait-frame"/>
		</div>
	)
}

export function Text(props) {
	let extraClass = game.app.state.darkMode ? "dark-mode-text" : ""
	return <p style={props.style} className={extraClass + " text " + props.className} onClick={props.onClick}>{props.text}</p>
}

function CharacterName(props) {
	return (
		<div className="flexbox-horizontal name-edit-container">
			<Text text={props.app.state.name}/>
			<div style={{width: "20px"}}/>
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
		<Icon img={"name_edit"} className="name-edit button" onClick={()=>{func()}}>
			{/* todo */}
		</Icon>
	)
}

function Icon(props) {
	let className = (props.className != undefined) ? props.className : "icon"
	let style = (props.style != undefined) ? cloneDeep(props.style) : {}

	if (props.style != undefined) {
		style.width = (props.style.width != undefined) ? props.style.width : props.size
		style.height = (props.style.height != undefined) ? props.style.height : props.size
	}
	else {
		style.width = props.size
		style.height = props.size
	}
	
	return (
		<div style={style} className={className} onClick={props.onClick} onContextMenu={props.onContextMenu}>
			{/* <img src={props.img} style={{width: props.size, height: props.size}}/> */}
			<img src={utils.getImage(props.img)} style={{width: "100%", height: "100%"}}/>
		</div>
	)
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
		let openSkillbookFunc = function(category){this.props.app.setState({popup: "skillbook", skillbookCategory: category})}.bind(this)

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
		let img = this.props.data.Icon
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
		<div className="flexbox-horizontal flex-align-start full-width ascension-family" onClick={()=>{props.app.setState({currentFamily: props.family.toLowerCase()})}}>
			<Embodiment type={props.family.toLowerCase()} amount={""}/>
			<Text text={props.family}/>
		</div>
	)
}

export function AscensionPopup(props) {
	let familyButtons = []
	for (let x in game.ascension.aspects) {
		familyButtons.push(<AscensionFamilyButton key={x} family={x} app={props.app}/>)
	}

	function changeCurrentlyViewedAspect(asp) {
		let obj;
		if (game.ascension.hasAspect(asp)) {
			obj = {currentlyViewedAspect: game.ascension.getBuildAspectById(asp.id)}
		}
		else {
			obj = {currentlyViewedAspect: {family: props.app.state.currentFamily, id: asp.id, nodes: []}}

			for (let x in game.ascension.aspects[props.app.state.currentFamily][asp.id].nodes) {
				obj.currentlyViewedAspect.nodes.push(null)
			}
		}

		props.app.setState(obj)
	}

	// this should be an Ascension method
	function addAspect() {
		var cloneDeep = require('lodash.clonedeep');
		let currentlyViewed = props.app.state.currentlyViewedAspect
		if (currentlyViewed.id == null)
			return;

		// just close the interface if this asp is already in the build
		if (game.ascension.hasAspect(currentlyViewed)) {
			props.app.setState({popup: null})
			return;
		}

		let asps = cloneDeep(props.app.state.aspects)
		asps.push({
			family: currentlyViewed.family,
			id: currentlyViewed.id,
			nodes: currentlyViewed.nodes,
		})

		props.app.setState({aspects: asps, selectedAspect: props.app.state.aspects.length, popup: null})
	}

	let currentAspect = game.ascension.getAspectElement(props.app.state.currentlyViewedAspect, true, "preview-edit")

	let asps = []
	asps.push(<AspectListing keywords={<Text text={"Keywords"}/>} name={"Aspect"}/>)
	asps.push(<hr/>)
	for (let x in game.ascension.aspects[props.app.state.currentFamily]) {
		let asp = game.ascension.aspects[props.app.state.currentFamily][x]

		let contextId = x
		let element = 
			<ContextMenuTrigger id={contextId} className="full-width" style={{width: "100%", height: "100%", position: "absolute"}}>
			<Aspect id={x} app={props.app} onClick={() => {changeCurrentlyViewedAspect(asp)}}/>
		</ContextMenuTrigger>

		// asps.push(<RightClickMenu id={contextId}>
		// 	<Text text="Remove"/>
		// 	<Text text="Move up"/>
		// 	<Text text="Move down"/>
		// </RightClickMenu>)

		// asps.push(element)
		asps.push(<Aspect id={x} app={props.app} onClick={() => {changeCurrentlyViewedAspect(asp)}}/>)

		if (miscData.aspectsAfterWePutAnHrToMakeThingsLookNice.includes(x)) {
			asps.push(<hr/>)
		}
		
	}

	// let realAsps = []
	// for (let x in asps) {
	// 	let asp = asps[x]

	// 	realAsps.push(<ContextMenuTrigger id={Math.random()}>
	// 	{asp}
	// </ContextMenuTrigger>)
	// }

	return (
		<Container className="flexbox-vertical flex-align-start skillbook">
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Ascension"} className={"flex-grow"}/>
				<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
			</div>

			<div style={{height: "20px"}}/>

			<div className="flexbox-horizontal flex-align-space-evenly full-width lateral-margin" style={{height: "100%"}}>
				<div className="flexbox-vertical flex-align-start" style={{width: "15%"}}>
					{familyButtons}
				</div>
				<div className="flexbox-vertical flex-align-start aspect-listing" style={{width: "40%"}}>
					{asps}
				</div>

				<div className="flexbox-vertical aspect-preview">
					{currentAspect}

					<div style={{height: "10px"}}/>

					<div className="sticky-bottom">
						<GreenButton text="Add aspect" onClick={() => {addAspect()}}/>
					</div>
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

export function Keywords(props) {
	let keywordButtons = []
	console.log(props.app.keywords)
	for (let x in props.app.keywords) {
		let func = () => {props.app.setState({currentKeyword: x})}
		let element = <div key={x} className={"flexbox-horizontal flex-align-start skillbook-category "} onClick={func}>
			<Icon img={game.mappings.keywordImages[x]} size="32px"/>
			<div style={{width: "15px"}}/>
			<Text text={game.mappings.keywordNames[x]}/>
		</div>
		keywordButtons.push(element)
	}

	let activators = []
	let mutators = []

	activators.push(<Text text={<b>Activators</b>}/>)
	mutators.push(<Text text={<b>Mutators</b>}/>)

	for (let x in props.app.keywords[props.app.state.currentKeyword]) {
		let keyword = props.app.keywords[props.app.state.currentKeyword][x]
		console.log([keyword.id])
		let element = <Text text={game.getDisplayString(game.app.stats.specialLogic[keyword.id])}/>

		console.log(keyword)
		if (keyword.keywordBoon == "activator")
			activators.push(element)
		else
			mutators.push(element)
	}
	
	return (
		<Container className="flexbox-vertical flex-align-start skillbook">
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Keywords"} className={"flex-grow"}/>
				<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
			</div>

			<div style={{height: "20px"}}/>

			<div className="flexbox-horizontal flex-align-space-evenly full-width lateral-margin">
				<div className="flexbox-vertical flex-align-start">
					{keywordButtons}
				</div>
				<div className="flexbox-vertical flex-align-start skill-listing">
					{activators}
					<hr/>
					{mutators}
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
		skills.push(<Icon className="button" borderless={true} img={"add"} size="64px" onClick={this.openSkillBook.bind(this)}/>)

		return (
			<Container className="skills">
				<div className="flexbox-horizontal-list" style={{margin: "10px"}}>
					{skills}
				</div>
			</Container>
		)
	}
}

function Keyword(props) {
	let className = props.faded == true ? "faded-out" : "keyword"
	return (
		<Tooltip content={<Text text={game.mappings.keywordNames[props.keyword]}/>}>
			<Icon className={className} style={{margin: "0 3px 0 3px"}} size={"32px"} img={game.mappings.keywordImages[props.keyword]}/>
		</Tooltip>
	)
}

function AspectListing(props) {
	return (
		<div onContextMenu={props.onContextMenu} className="flexbox-horizontal flex-align-centered aspect" onClick={props.onClick}>
			<Text text={props.name} style={{margin: "0 5px 0 5px", width: "50%"}}/>
			<div style={{width: "50%", margin: "0 5px 0 5px"}} className="flexbox-horizontal flex-align-centered">
				{props.keywords}
			</div>
		</div>
	)
}

function Aspect(props) {
	let asp;
	let info;
	if (props.id != undefined) {
		asp = game.ascension.getReferenceById(props.id)
		info = game.ascension.getReferenceById(props.id)
	}
	else {
		asp = props.data
		info = game.ascension.getAspectText(asp)
	} 
	// let tooltip = game.ascension.getAspectElement(asp)
	let keywords = game.ascension.getKeywordsInAspectBuild(asp)
	let keywordDisplay = []

	let func = null
	if (props.interactable) {
		let elements = [
			<Text text="Select option:"/>,
			<Text text="Remove" onClick={(e)=>{game.ascension.removeAspect(e, asp.id)}}/>,
			<Text text="Move up" onClick={(e)=>{game.ascension.moveAspect(e, asp.id, -1)}}/>,
			<Text text="Move down" onClick={(e)=>{game.ascension.moveAspect(e, asp.id, 1)}}/>
		]
		func = (e) => {props.app.contextMenu(
			elements, e
		)}
	}

	for (let x in keywords.allKeywords) {
		let gotten = keywords.keywordsGotten.includes(keywords.allKeywords[x])
		keywordDisplay.push(<Keyword faded={!gotten} key={x} keyword={keywords.allKeywords[x]}/>)
	}

	return (
		<AspectListing onContextMenu={func} keywords={keywordDisplay} name={info.name} onClick={props.onClick}/>
	)
}

// export function RightClickMenu(props) {
// 	let items = []

// 	console.log(props.children)
// 	for (let x in props.children) {
// 		let className = props.children[x].props.notInteractable ? "context-option-noninteractable" : "context-option"

// 		items.push(<MenuItem className={className}>{props.children[x]}</MenuItem>)
// 	}
// 	return (
// 		<ContextMenu id={props.id} hideOnLeave={true} className="">
// 			<div className="context-menu">
// 				{items}
// 			</div>
// 		</ContextMenu>
// 	)
// }

export function Embodiments(props) {
	let embs = []
	let reqs;
	let rews;
	let unmet = []

	if (props.highlightUnmet) {
		reqs = game.ascension.getTotalRequirements()
		rews = game.ascension.getTotalRewards()

		for (let x in reqs) {
			if (rews[x] < reqs[x])
				unmet.push(x)
		}
	}

	for (let x in props.amounts) {
		if (!props.skipEmpty || (props.skipEmpty && props.amounts[x] > 0)) {
			let className = (unmet.includes(x)) ? "reqs-unmet" : ""
			embs.push(<Embodiment className={className} type={x} amount={props.amounts[x]}/>)
		}
	}
	return <div className="flexbox-horizontal flex-align-centered" style={{width: "unset", ...props.style}}>
		{embs}
	</div>
}

function Embodiment(props) {
	return (
	<Tooltip content={utils.capitalize(props.type)}>
		<div className={"embodiment " + props.type + " " + props.className}>
			<Text text={props.amount}></Text>
		</div>
	</Tooltip>
	)
}

class Ascension extends React.Component {
	changeCurrentAspect(asp) {
		this.props.app.setState({selectedAspect: this.props.app.state.aspects.indexOf(asp)})
	}

	render() {
		let aspects = []
		for (let x in this.props.app.state.aspects) {
			let asp = this.props.app.state.aspects[x]

			aspects.push(<Aspect interactable={true} data={asp} app={this.props.app} onClick={()=>{this.changeCurrentAspect(asp)}}/>)
		}

		let currentAspect = null;
		if (this.props.app.state.selectedAspect != null)
			currentAspect = game.ascension.getAspectElement(this.props.app.state.aspects[this.props.app.state.selectedAspect], true)

		return <Container style={{height: "100%"}}>
			<div className="flexbox-horizontal">
				<div className="flexbox-vertical ascension flex-align-start">
					<AspectListing keywords={<Text text={"Keywords"}/>} name={"Aspect"}/>
					<hr/>

					{aspects}

					<hr/>

					<div className={"flexbox-horizontal flex-align-centered "}>
						<Text text={"Reqs:"} style={{textAlign: "right"}}/>
						<Embodiments highlightUnmet={true} amounts={game.ascension.getTotalRequirements()}/>
					</div>
					<div className="flexbox-horizontal flex-align-centered">
						<Text text={"Rewards:"} style={{textAlign: "right"}}/>
						<Embodiments amounts={game.ascension.getTotalRewards()}/>
					</div>

					<div style={{height: "10px"}}/>

					<GreenButton text="Add Aspect..." onClick={() => {this.props.app.setState({popup: "ascension"})}}/>
					<GreenButton text="View Stats" onClick={() => {this.props.app.setState({popup: "stats"})}}/>
					<GreenButton text="View Keywords" onClick={() => {this.props.app.setState({popup: "keywords"})}}/>
				</div>
					<div className="aspect-preview">
						{currentAspect}
					</div>
			</div>
		</Container>
	}
}

function StatBoost(props) {
	return (
		<div className="flexbox-horizontal">
			<Text text={props.text}/>
		</div>
	)
}

export function Boosts(props) {
	let boosts = []
	let stats = game.getStats()
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

			console.log(statStrings)

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
			// else {
			// 	console.log(statToCategorize.id)
			// 	let text;
			// 	if (statToCategorize.type != "specialLogic")
			// 		text = miscData.stats[statToCategorize.type][statToCategorize.id].display
			// 	else {
			// 		// improve this
			// 		if (miscData.stats[statToCategorize.type][statToCategorize.id].strings != undefined) {
			// 			let strings = miscData.stats[statToCategorize.type][statToCategorize.id].strings
			// 			let val = stats[statToCategorize.type][statToCategorize.id].amount
			// 			text = strings[Math.min(val, strings.length-1)]
			// 			console.log(Math.max(val, strings.length))
			// 		}
			// 		else {
			// 			text = miscData.stats[statToCategorize.type][statToCategorize.id].referenceString
			// 		}
			// 	}

			// 	categorizedBoosts[x].push(<StatBoost key={Math.random()} type={statToCategorize.type} subType={statToCategorize.id} text={utils.format(text, 0)}/>)
			// }
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

function IncrementButton(props) {
	return (
		<Icon onContextMenu={props.onContextMenu} img={props.img} onClick={props.onClick} className="button" size="24px"/>
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

// todo rename this component; holds far more than just attributes now
class Attributes extends React.Component {
	render() {
		let remaining = miscData.playerAttributes - game.totalAttributePointsSpent
		// return <Container className="flexbox-vertical skill-abilities">
		// 	<Text text="Attributes"/>
		// 	<Text text={utils.format("{0} Remaining", remaining)}/>

		// 	<Attribute id="str"/>
		// 	<Attribute id="fin"/>
		// 	<Attribute id="pwr"/>
		// 	<Attribute id="con"/>
		// 	<Attribute id="mem"/>
		// 	<Attribute id="wits"/>
		// </Container>
		return <TabbedContainer style={{minWidth: "220px", height: "100%"}}>
			<Container className="flexbox-vertical flex-align-start skill-abilities" name="Attributes" noBg>
				{/* <Text text="Attributes"/> */}
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
		</TabbedContainer>
	}
}

function GreenButton(props) {
	return (
		<div className="absolute button" onClick={props.onClick}>
			<img style={{width: "150px", height: "30px"}} src={utils.getImage("button_green")}/>
			<Text text={props.text} className="unselectable"/>
		</div>
	)
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

				{/* todo remove this and just use a container as the parent */}
				<div style={{height: "10px"}}/>

				<div className="flexbox-horizontal flex-align-centered" style={{height: "500px"}}>
					<Attributes app={this.props.app}/>
					<Ascension app={this.props.app}/>
				</div>
			</div>
		</div>
	}
}
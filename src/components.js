import React from 'react';
import _ from "underscore";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { cloneDeep } from "lodash"

import { ContextMenuContents, Tooltip, Container, TabbedContainer, Text, Icon } from "./genericComponents.js"
import * as utils from "./utils.js"
import { game } from "./App.js"
import * as miscData from "./miscData.js"
import { CharacterProfile } from "./characterProfile.js"
import { Skill } from "./skillbook.js"
import { Attributes } from "./gameStatSheet.js"
import { Artifacts } from './artifacts.js';

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

function TopBar(props) {
	return (
		<div className="top-bar">
			{/* todo */}
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
			<div className="flexbox-horizontal">
				<div style={{margin: "25px"}}>
					<div className="flexbox-horizontal flex-align-start" style={{height: "150px"}}>
						<CharacterProfile app={this.props.app}/>
						<Skills app={this.props.app}/>
						<Artifacts app={this.props.app}/>
					</div>

					{/* todo remove this and just use a container as the parent */}
					<div style={{height: "10px"}}/>

					<div className="flexbox-horizontal flex-align-start" style={{height: "500px"}}>
						<Attributes app={this.props.app}/>
						<Ascension app={this.props.app}/>
					</div>
				</div>
			</div>
		</div>
	}
}
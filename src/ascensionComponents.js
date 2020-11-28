import './App.css';
import React from 'react';
import { clone } from 'underscore';

import { game } from "./App.js"
import * as miscData from "./miscData.js"
import * as utils from "./utils.js"
import { Tooltip, Container, Text, Icon, TabButton, GreenButton, Flourish } from "./genericComponents.js"

export class Ascension extends React.Component {
	changeCurrentAspect(asp) {
		this.props.app.setState({selectedAspect: this.props.app.state.aspects.indexOf(asp)})
	}

	render() {
		let aspects = []
		for (let x in this.props.app.state.aspects) {
			let asp = this.props.app.state.aspects[x]

			aspects.push(<Aspect key={x} interactable={true} data={asp} app={this.props.app} onClick={()=>{this.changeCurrentAspect(asp)}}/>)
		}

		// if no aspects are in this build, show a hint on how to use the panel
		if (aspects.length == 0)
			aspects = <Text text="Click 'Add Aspect' to add an aspect." className="text-faded"/>

		let currentAspect = null;
		if (this.props.app.state.selectedAspect != null)
			currentAspect = game.ascension.getAspectElement(this.props.app.state.aspects[this.props.app.state.selectedAspect], true)

		if (currentAspect == null)
			currentAspect = <Text text="When you click on an Aspect, its nodes will show up here." style={{width: "80%"}} className="text-faded"/>

		return <Container style={{height: "100%"}}>
			<div className="flexbox-horizontal">
				<div className="flexbox-vertical ascension flex-align-start">
					<AspectListing keywords={<Text text={"Keywords"}/>} name={"Aspect"}/>
					<hr/>

					{aspects}

					<hr/>

					<CoreButtons app={this.props.app}/>
					<div className={"flexbox-horizontal flex-align-centered "}>
						<Text text={"Reqs:"} style={{width: "100px"}}/>
						<Embodiments highlightUnmet={true} amounts={game.ascension.getTotalRequirements()}/>
					</div>
					<div className="flexbox-horizontal flex-align-centered">
						<Text text={"Rewards:"} style={{width: "100px"}}/>
						<Embodiments amounts={game.ascension.getTotalRewards()}/>
					</div>

					<div style={{height: "10px"}}/>

					<Flourish style={{marginBottom: "15px"}}/>

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
	asps.push(<AspectListing key="header" keywords={<Text text={"Keywords"}/>} name={"Aspect"}/>)
	asps.push(<hr key={Math.random()}/>)
	for (let x in game.ascension.aspects[props.app.state.currentFamily]) {
		let asp = game.ascension.aspects[props.app.state.currentFamily][x]

		asps.push(<Aspect key={x} id={x} app={props.app} onClick={() => {changeCurrentlyViewedAspect(asp)}}/>)

		if (miscData.aspectsAfterWePutAnHrToMakeThingsLookNice.includes(x)) {
			asps.push(<hr key={Math.random()}/>)
		}
		
	}

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
	for (let x in props.app.keywords) {
		let func = () => {props.app.setState({currentKeyword: x})}
		let element = <TabButton key={x} img={game.mappings.keywordImages[x]} text={game.mappings.keywordNames[x]} func={func} chosen={props.app.state.currentKeyword === x}/>

		keywordButtons.push(element)
	}

	let activators = []
	let mutators = []

	activators.push(<Text text={<b>Activators</b>}/>)
	mutators.push(<Text text={<b>Mutators</b>}/>)

	for (let x in props.app.keywords[props.app.state.currentKeyword]) {
		let keyword = props.app.keywords[props.app.state.currentKeyword][x]
		let element = <Text text={game.getDisplayString(game.app.stats[keyword.type][keyword.id])}/>

		if (keyword.keywordBoon === "activator")
			activators.push(element)
		else
			mutators.push(element)
	}

	let display;
	if (keywordButtons.length === 0) {
		display = <Text text="You have no keywords in your build."/>
	}
	else if (!(props.app.state.currentKeyword in props.app.keywords)) {
		display = <Text text="Click a keyword on the left to show its actvators and mutators."/>
	}
	else {
		display = [
			activators,
			<hr/>,
			mutators]
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
					{display}
				</div>
			</div>
		</Container>
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
			embs.push(<Embodiment key={x} className={className} type={x} amount={props.amounts[x]}/>)
		}
	}
	return <div className={"flexbox-horizontal flex-align-centered"} style={{width: "unset", ...props.style}}>
		{embs}
	</div>
}

function Aspect(props) {
	let asp;
	let info;
	if (props.id != null) {
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
			<Text key={1} text="Select option:"/>,
			<Text key={2} text="Remove" onClick={(e)=>{game.ascension.removeAspect(e, asp.id)}}/>,
			<Text key={3} text="Move up" onClick={(e)=>{game.ascension.moveAspect(e, asp.id, -1)}}/>,
			<Text key={4} text="Move down" onClick={(e)=>{game.ascension.moveAspect(e, asp.id, 1)}}/>
		]
		func = (e) => {props.app.contextMenu(
			elements, e
		)}
	}

	keywords.allKeywords.forEach(k => {
		let gotten = keywords.keywordsGotten.includes(k)
		keywordDisplay.push(<Keyword faded={!gotten} key={k} keyword={k}/>)
	})

	return (
		<AspectListing interactable={props.interactable} onContextMenu={func} keywords={keywordDisplay} name={info.name} onClick={props.onClick}/>
	)
}

class AspectListing extends React.Component {
	constructor() {super(); this.state = {beingHovered: false}}

	render() {
		// only add :hover class if this is clickable (there is 1 'fake' instance of this component, used as a header)
		let extraClass = this.props.onClick ? "hoverable" : ""
		let dropdownIcon = this.state.beingHovered && this.props.onClick && this.props.interactable ? 
		<div className="aspect-dropdown-button button" onClick={(e)=>{e.stopPropagation(); this.props.onContextMenu(e)}}>
			<Icon img={"dropdown"} size="24px"/>
		</div> : null

		return (
			<div onContextMenu={this.props.onContextMenu} className={"flexbox-horizontal flex-align-centered aspect " + extraClass} onClick={this.props.onClick} style={{position: "relative"}} onMouseEnter={()=>{this.setState({beingHovered: true})}} onMouseLeave={()=>{this.setState({beingHovered: false})}}>
				<Text text={this.props.name} style={{margin: "0 5px 0 5px", width: "50%"}}/>
				<div style={{width: "50%", margin: "0 5px 0 5px"}} className="flexbox-horizontal flex-align-centered">
					{this.props.keywords}
				</div>

				{dropdownIcon}
			</div>
		)
	}
}

function Keyword(props) {
	let className = props.faded === true ? "faded-out" : "keyword"
	return (
		<Tooltip content={<Text text={game.mappings.keywordNames[props.keyword]}/>}>
			<Icon className={className} style={{margin: "0 3px 0 3px"}} size={"32px"} img={game.mappings.keywordImages[props.keyword]}/>
		</Tooltip>
	)
}

function AscensionFamilyButton(props) {
	return (
		<div className="flexbox-horizontal flex-align-start full-width ascension-family" onClick={()=>{props.app.setState({currentFamily: props.family.toLowerCase()})}}>
			<Embodiment type={props.family.toLowerCase()} amount={""}/>
			<Text text={props.family}/>
		</div>
	)
}

function Embodiment(props) {
	return (
	<Tooltip content={utils.capitalize(props.type)}>
		<div className={"embodiment " + props.type + " " + props.className} onClick={props.onClick} style={props.style}>
			<Text text={props.amount}></Text>
		</div>
	</Tooltip>
	)
}

class CoreButtons extends React.Component {
	toggleCoreNode(emb) {
		let state = clone(this.props.app.state.coreNodes)
		state[emb] = !state[emb]

		this.props.app.setState({coreNodes: state})
	}

	render() {
		let embs = []
		for (let x in miscData.embodimentTypesEnum) {
			let emb = miscData.embodimentTypesEnum[x]
			let text = this.props.app.state.coreNodes[emb] ? "✓" : ""
			embs.push(<Embodiment key={x} type={emb} amount={text} onClick={()=>{this.toggleCoreNode(emb)}} className="button"/>)
		}
		return <div className="flexbox-horizontal flex-align-centered">
			<Text text="Core Nodes:" style={{width: "100px"}}/>
			{embs}
		</div>
	}
}
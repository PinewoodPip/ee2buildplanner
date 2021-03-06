import './App.css';
import React from 'react';
import { clone } from 'underscore';

import { game } from "./App.js"
import * as miscData from "./miscData.js"
import * as utils from "./utils.js"
import { Tooltip, Container, Text, Icon, TabButton, GreenButton, Flourish, SearchBar, PopupHeader } from "./genericComponents.js"

export class Ascension extends React.Component {
	changeCurrentAspect(asp) {
		this.props.app.setState({selectedAspect: this.props.app.state.aspects.indexOf(asp)})
	}

	shouldComponentUpdate(nextProps, nextState) {
		return utils.propObjectHasChanged(this.props.data, nextProps.data)
	}

	render() {
		let nodeCount = game.nodeCount
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
			currentAspect = <Text text="When you click on an Aspect, its nodes will show up here." style={{width: "100%", paddingTop: "10px"}} className="text-faded"/>

		return <Container style={{height: "100%"}}>
			<div className="flexbox-horizontal flex-align-space-between">
				<div className="flexbox-vertical ascension flex-align-start wrap-y">
					<AspectListing keywords={<Text text={"Keywords"}/>} name={"Aspect"}/>
					<hr/>

					{aspects}

					<hr/>

					<CoreButtons app={this.props.app}/>
					<div className="flexbox-horizontal flex-align-centered">
						<Text text={"Rewards:"} style={{width: "100px"}}/>
						<Embodiments amounts={game.ascension.getTotalRewards()}/>
					</div>
					<div className={"flexbox-horizontal flex-align-centered "}>
						<Text text={"Reqs:"} style={{width: "100px"}}/>
						<Embodiments highlightUnmet={true} amounts={game.ascension.getTotalRequirements()}/>
					</div>

					<Tooltip content="The late nodes of an Aspect that are set to 'any' do not count towards this counter. You can use that to declare unfinished/dipped Aspects." placement="bottom">
						<Text text={utils.format("{0} Ascension Points used", nodeCount)} className={nodeCount > game.maxAscensionPoints ? "overflowed" : ""}/>
					</Tooltip>

					<div style={{height: "5px"}}/>

					<Flourish style={{marginBottom: "15px"}}/>

					<div className="flexbox-horizontal">
						<GreenButton text="Add Aspect..." onClick={() => {this.props.app.setState({popup: "ascension"})}}/>
						<GreenButton text="View Keywords" onClick={() => {this.props.app.setState({popup: "keywords"})}}/>
					</div>
				</div>
				<div className="aspect-preview">
					{currentAspect}
				</div>
			</div>
		</Container>
	}
}

export class AscensionPopup extends React.Component {
	constructor() {
		super();
		this.state = {searchResults: [], isSearching: false}
	}

	render() {
		// todo move to ascension class
		let searchData = {}
		for (let family in game.ascension.aspects) {
			for (let id in game.ascension.aspects[family]) {
				let asp = game.ascension.aspects[family][id]
				let keywordsInfo = game.ascension.getKeywordsInAspectBuild(asp).betterInfo
				let mutaActi = []
				let keywords = []

				for (let x in keywordsInfo) {
					keywords.push(x)

					for (let prop in keywordsInfo[x]) {
						if (keywordsInfo[x][prop])
							mutaActi.push(x + "_" + prop)
					}
				}

				// allow searching by id, namme, keywod names, keyword ids
				let keywordNames = []
				keywords.forEach(e => {
					keywordNames.push(miscData.mappings.keywordNames[e])
				})

				searchData[id] = "".concat([id, asp.name, ...keywords, ...keywordNames, ...mutaActi]).replace(/,/g, " ")

			}
		}

		let props = this.props
		let familyButtons = []
		for (let x in game.ascension.aspects) {
			if (x != "special")
				familyButtons.push(<AscensionFamilyButton key={x} family={x} app={props.app}/>)
		}

		function changeCurrentlyViewedAspect(asp) {
			let obj;
			if (game.ascension.hasAspect(asp)) {
				obj = {currentlyViewedAspect: game.ascension.getBuildAspectById(asp.id)}
			}
			else {
				obj = {currentlyViewedAspect: {family: asp.family, id: asp.id, nodes: []}}

				for (let x in game.ascension.aspects[asp.family][asp.id].nodes) {
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

		if (!this.state.isSearching) {
			for (let x in game.ascension.aspects[props.app.state.currentFamily]) {
				let asp = game.ascension.aspects[props.app.state.currentFamily][x]

				asps.push(<Aspect key={x} id={x} app={props.app} onClick={() => {changeCurrentlyViewedAspect(asp)}}/>)

				if (miscData.aspectsAfterWePutAnHrToMakeThingsLookNice.includes(x)) {
					asps.push(<hr key={Math.random()}/>)
				}
				
			}
		}
		else {
			this.state.searchResults.forEach(e => {
				let asp = game.ascension.getReferenceById(e)

				asps.push(<Aspect key={e} id={e} app={props.app} onClick={() => {changeCurrentlyViewedAspect(asp)}}/>)
			})
		}

		return (
			<Container className="flexbox-vertical flex-align-start skillbook">
				<PopupHeader app={props.app} text="Ascension" additionalElement={<SearchBar data={searchData} parentElement={this} app={this}/>}/>

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

						{props.app.state.currentlyViewedAspect.id ? (
							<div className="sticky-bottom">
								<GreenButton text="Add Aspect" onClick={() => {addAspect()}}/>
							</div>
						) : null}
					</div>
				</div>
			</Container>
		)
	}
}

export function Keywords(props) {
	let keywordButtons = []
	for (let x in props.app.keywords) {
		if (x == "null")
			continue
		let func = () => {props.app.setState({currentKeyword: x})}
		let element = <TabButton key={Math.random()} img={game.mappings.keywordImages[x]} text={game.mappings.keywordNames[x]} func={func} chosen={props.app.state.currentKeyword === x}/>

		keywordButtons.push(element)
	}

	let activators = []
	let mutators = []

	activators.push(<Text key={-999} text={<b>Activators</b>}/>)
	mutators.push(<Text key={-998} text={<b>Mutators</b>}/>)

	let stringsUsed = [] // used to avoid duplicates - some nodes apply multiple stats for single node effects like scaling statuses with force, ent, form etc. so we avoid displaying them more than once
	for (let x in props.app.keywords[props.app.state.currentKeyword]) {
		let keyword = props.app.keywords[props.app.state.currentKeyword][x]
		console.log(props.app.keywords[props.app.state.currentKeyword])
		let text = game.getDisplayString(game.app.stats[keyword.type][keyword.id])
		if (stringsUsed.includes(text))
			continue
		
		
		let element = <Text key={Math.random()} text={text}/>
		stringsUsed.push(text)

		if (keyword.keywordBoon === "activator")
			activators.push(element)
		else
			mutators.push(element)
	}

	let currentKeyword = props.app.state.currentKeyword
	let display;
	if (keywordButtons.length === 0) {
		display = <Text text="You have no keywords in your build."/>
	}
	else if (!(props.app.state.currentKeyword in props.app.keywords)) {
		display = <Text text="Click a keyword on the left to show its actvators and mutators."/>
	}
	else {
		// basic explanation of the keyword, if it has one
		let basicEffect = null
		if (props.app.state.currentKeyword in miscData.basicKeywordEffects) {
			basicEffect = <div className="flexbox-vertical" style={{height: "unset"}}>
				<Text key={-20} text={miscData.basicKeywordEffects[currentKeyword]}/>
				{miscData.reactions.includes(currentKeyword) ? <Text key={-21} text={miscData.reactionExplanation}/> : null}
			</div>
		}

		if (activators.length === 1) {
			activators.push(<Text key={-3} text={utils.format("You have no {0} activators.", miscData.mappings.keywordNames[props.app.state.currentKeyword])} className="text-faded"/>)
		}
		if (mutators.length == 1) {
			mutators.push(<Text key={-2} text={utils.format("You have no {0} mutators.", miscData.mappings.keywordNames[props.app.state.currentKeyword])} className="text-faded"/>)
		}
		display = [
			<Text key={-19} text={<b>{miscData.mappings.keywordNames[currentKeyword]}</b>} style={{fontSize: "120%"}}/>,
			basicEffect,

			<div style={{height: "15px"}}/>,

			activators,
			<hr key={-997}/>,
			mutators,
		]
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
	if (props.interactable) { // context menu
		let reorderFunc = (move) => {
			game.app.setState({aspects: utils.reorderElementInArray(game.app.state.aspects, game.ascension.getBuildAspectById(asp.id), move), contextMenu: null})
		}

		let elements = [
			<Text key={1} text="Select option:"/>,
			<Text key={2} text="Remove" onClick={(e)=>{game.ascension.removeAspect(e, asp.id)}}/>,
			<Text key={3} text="Move up" onClick={(e)=>{reorderFunc(-1)}}/>,
			<Text key={4} text="Move down" onClick={(e)=>{reorderFunc(1)}}/>,
			<Text key={5} text="Move to top" onClick={(e)=>{reorderFunc(-99999)}}/>,
			<Text key={6} text="Move to bottom" onClick={(e)=>{reorderFunc(99999)}}/>,
		]

		// onContextMenu prop func
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

// the aspect entries on the left side of the main ascension panel, which show the aspect name and keywords
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
		<div className="flexbox-horizontal flex-align-start full-width ascension-family button" onClick={()=>{props.app.setState({currentFamily: props.family.toLowerCase()})}}>
			<Embodiment type={props.family.toLowerCase()} amount={""}/>
			<Text text={utils.capitalize(props.family)}/>
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
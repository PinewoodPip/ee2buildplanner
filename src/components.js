import React from 'react';
import { clone } from 'underscore';
import cloneDeep from 'lodash.clonedeep';
import { uuid } from 'uuidv4';

import { Container, Text, Icon, GreenButton, Flourish, FlairedCheckbox, Tooltip } from "./genericComponents.js"
import { Ascension } from "./ascensionComponents.js"
import { game } from "./App.js"
import * as miscData from "./miscData.js"
import { CharacterProfile } from "./characterProfile.js"
import { Skill } from "./skillbook.js"
import { Attributes } from "./gameStatSheet.js"
import { Artifacts } from './artifacts.js';
import { BuildsDropdown, FeaturedBuilds } from './buildsDropdown.js';
import { APP_DATE, MOD_VERSION } from "./App.js"
import * as utils from "./utils.js"

export class TextField extends React.Component {
	constructor() {super(); this.state = {text: ""}}
	lastId;
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.text !== this.state.text) {
			return true
		}
		return false
	}

	onChange(e) {
		this.setState({text: e.target.value});
		e.preventDefault()
	}

	componentDidMount() {
		this.lastId = this.props.lastValue
	}

	render() {
		let text = this.state.text
		if (this.props.lastValue !== this.lastId) { // yikes there's got to be a better way
			text = this.props.app.state[this.props.stateKey];
			if (this.props.stateSubKey)
				text = text[this.props.stateSubKey];

			this.state.text = text
			this.lastId = this.props.lastValue;
		}

		return (
			// onChange={(e)=>{this.setState({text: e.target.value})}}
			<Container style={{width: "100%", height: "100%"}} className={this.props.className} noBg={this.props.noBg}>
				<textarea onChange={this.onChange.bind(this)} tabIndex={0} onBlur={this.props.onBlur} value={text} className={this.props.textareaClass}></textarea>
			</Container>
		)
	}
}

function TopBar(props) {
	function onContext(e) {
		props.app.contextMenu([
			<Text key={0} text="Choose an option:"/>,
			<Text key={1} text="Save as a new build" onClick={async (e) => {
				await props.app.setState({id: uuid()})
				props.app.saveBuild()
				}}/>
		], e)
	}

	let extraSaveButtonClass = props.app.currentBuildIsStored ? "" : "red-overlay"

	return (
		<div className="flexbox-vertical flex-align-centered">
			<div className="top-bar flexbox-horizontal flex-align-space-between">
				<div style={{width: "10px"}}/>

				<div className="flexbox-horizontal flex-align-start" style={{width: "33%"}}>
					<GreenButton text="View builds" onClick={(e) => {props.app.sidebar(<BuildsDropdown app={props.app}/>, "left")}}/>
					<div style={{width: "10px"}}/>

					<div style={{position: "relative"}}>
						<GreenButton className={extraSaveButtonClass} text="Save Build" onClick={(e) => {props.app.saveBuild()}} onContextMenu={(e)=>{onContext(e)}}/>
						<Icon className="button absolute-center-vertical" img={"dropdown"} onClick={(e)=>{e.stopPropagation(); onContext(e)}} style={{right: "3px"}}/>
					</div>
					<div style={{width: "10px"}}/>
					<GreenButton text="Export build" onClick={()=>{props.app.exportBuild()}}/>
				</div>

				<div className="flexbox-vertical flex-align-centered flex-grow">
					<Flourish className="flipped-y"/>
					<Text text="Pip's Build Planner" style={{margin: "-5px", fontSize: "18px"}}/>
					{/* <Icon img="flourish"/> */}
					<Flourish/>
				</div>

				<div className="flexbox-horizontal flex-align-end" style={{width: "33%"}}>
					<GreenButton text="Build Gallery" onClick={()=>{props.app.sidebar(<FeaturedBuilds app={props.app}/>, "right")}}/>
					<div style={{width: "10px"}}/>
					<GreenButton text="Config &amp; Info" onClick={()=>{props.app.setState({popup: "config"})}}/>
				</div>

				<div style={{width: "10px"}}/>
			</div>
			<div className="top-bar-bottom"/>
		</div>
	)
}

export class Config extends React.Component {
	toggleSetting(e, key) {
		let state = clone(this.props.app.state.config)
		state[key] = !state[key]
		this.props.app.setState({config: state})
	}

	setConfigValue(id, val) {
		let state = clone(this.props.app.state.config)
		state[id] = val
		this.props.app.setState({config: state})
	}

	render() {
		let config = this.props.app.state.config
		return <Container className="flexbox-vertical flex-align-space-between" style={{width: "600px", height: "500px"}}>
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Config"} className={"flex-grow"}/>
				<Icon className="button" img={"close"} size="32px" onClick={()=>{this.props.app.setState({popup: null})}} app={this.props.app}/>
			</div>

			<div style={{height: "20px"}}/>

			<div className="flexbox-vertical flex-grow">
				{/* <FlairedCheckbox text="Highlight keywords in skill tooltips" ticked={config.highlightSkillKeywords} onChange={(e)=>{this.toggleSetting(e, "highlightSkillKeywords")}}/> */}
				<Tooltip content="The name that will be shown when you share your builds with other people." placement="bottom">
					<div className="flexbox-horizontal">
						<Text text="Build author name:"/>
						<div style={{width: "10px"}}/>
						<TextField lastValue={config.author} app={this.props.app} onBlur={(e) => {this.setConfigValue("author", e.target.value)}} text={config.author} className="author-field" noBg stateKey="config" stateSubKey="author"/>
					</div>
				</Tooltip>
			</div>

			<div className="flexbox-vertical">
				<hr/>
				<Text text="App made by PinewoodPip in React."/>
				<Text text="Epic Encounters 2 mod and app design help by Ameranth &amp; Elric."/>
				<Text text="Most graphic assets made by Larian."/>
				<hr/>
				<Text text={utils.format("App version: {0}", APP_DATE)}/>
				<Text text={utils.format("For mod version: {0}", MOD_VERSION)}/>
			</div>
		</Container>
	}
}

class Skills extends React.Component {
	openSkillBook() {
		this.props.app.setState({popup: "skillbook"})
	}

	// only rerender this if anything related to skills has changed
	shouldComponentUpdate(nextProps, nextState) {
		return (utils.propObjectHasChanged(this.props.info, nextProps.info))
	}

	async reorderSkill(e, id, movement) {
		let state = cloneDeep(this.props.app.state.skills)
		let index = this.props.app.state.skills.indexOf(id) + movement
		state = state.filter((x)=>{return x !== id})
	
		state.splice(index, 0, id)
	
		await this.props.app.closeContext()
		this.props.app.setState({skills: state})
	}

	render() {
		let skills = []
		let skillIDs = clone(this.props.app.state.skills)

		// origin and race-specific skills
		skillIDs.push(miscData.origins[this.props.app.state.origin].innateSkill)

		if (this.props.app.state.physique.lifeType != "undead")
			skillIDs.push(miscData.races[this.props.app.state.physique.race].innateSkill)
		else
			skillIDs.push("Target_AMER_VampiricTouch")

		// if build has no skills, show a message explaining this element's purpose
		let usabilityTip = this.props.app.state.skills.length == 0 ?
		<div className="absolute-centered" style={{bottom: "90%"}}>
			<Text text="Click the + button to add skills." className="text-faded"/>
		</div> : null

		if (this.props.app.hasCompleteCore)
			skillIDs.push("Shout_AMER_Core_GenerateSource")

		for (let x in skillIDs) {
			let skill = game.skills[skillIDs[x]]

			let contextMenu = (!skill.Hidden) ? (e)=>{this.props.app.contextMenu([
				<Text text="Select option:"/>,
				<Text text="Move left" onClick={(e)=>{this.reorderSkill(e, skill.id, -1)}}/>,
				<Text text="Move right" onClick={(e)=>{this.reorderSkill(e, skill.id, 1)}}/>,
				<Text text="Move to front" onClick={(e)=>{this.reorderSkill(e, skill.id, -1000000)}}/>,
				<Text text="Move to back" onClick={(e)=>{this.reorderSkill(e, skill.id, 10000000)}}/>,
			], e)} : (e)=>{e.preventDefault()}

			skills.push(<Skill key={x} data={skill} app={this.props.app} highlight="false" onContextMenu={contextMenu}/>)
		}

		// button to add more skills, opening the skillbook
		skills.push(<Icon key="add" className="button" borderless={true} img={"add"} size="64px" onClick={this.openSkillBook.bind(this)}/>)

		return (
			<Container className="skills">
				<div className="flexbox-horizontal-list" style={{margin: "10px", position: "relative"}}>
					{skills}
					{usabilityTip}
				</div>
			</Container>
		)
	}
}

export class MainInterface extends React.Component {
	render() {
		let appState = this.props.app.state
		let skillsInfo = {origin: appState.origin, skills: appState.skills, race: appState.physique.race, lifeType: appState.physique.lifeType, coreNodes: appState.coreNodes}
		let ascData = {aspects: appState.aspects, coreNode: appState.coreNodes, selectedAspect: appState.selectedAspect}
		return <div>
			<TopBar app={this.props.app}/>
			<div className="flexbox-horizontal">
				<div style={{margin: "25px"}}>
					<div className="flexbox-horizontal flex-align-start" style={{height: "150px"}}>
						<CharacterProfile app={this.props.app}/>
						<Skills app={this.props.app} info={skillsInfo}/>
						<Artifacts app={this.props.app} info={{artifacts: appState.artifacts}}/>
					</div>

					{/* todo remove this and just use a container as the parent */}
					<div style={{height: "30px"}}/>

					<div className="flexbox-horizontal flex-align-start" style={{height: "500px"}}>
						<Attributes app={this.props.app}/>
						<Ascension data={ascData} app={this.props.app}/>
						<TextField app={this.props.app} lastValue={this.props.app.state.id} onBlur={(e)=>{this.props.app.setState({text: e.target.value})}} stateKey="text" textareaClass="textarea"/>
					</div>
				</div>
			</div>
		</div>
	}
}
import React from 'react';
import { clone } from 'underscore';
import cloneDeep from 'lodash.clonedeep';
import { uuid } from 'uuidv4';

import { Tooltip, Container, Text, Icon, GreenButton } from "./genericComponents.js"
import { Ascension, AscensionPopup } from "./ascensionComponents.js"
import * as utils from "./utils.js"
import { game } from "./App.js"
import * as miscData from "./miscData.js"
import { CharacterProfile } from "./characterProfile.js"
import { Skill } from "./skillbook.js"
import { Attributes } from "./gameStatSheet.js"
import { Artifacts } from './artifacts.js';
import { BuildsDropdown } from './buildsDropdown.js';

export class TextField extends React.Component {
	constructor() {super(); this.state = {text: ""}}
	lastId;
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.text != this.state.text) {
			return true
		}
		return false
	}

	onChange(e) {
		this.setState({text: e.target.value});
		e.preventDefault()
	}

	componentDidMount() {
		this.lastId = this.props.buildId
	}

	render() {
		let text = this.state.text
		if (this.props.buildId != this.lastId) { // yikes there's got to be a better
			text = this.props.app.state.text;
			this.state.text = text
			this.lastId = this.props.buildId;
		}

		return (
			// onChange={(e)=>{this.setState({text: e.target.value})}}
			<Container style={{width: "100%", height: "100%"}}>
				<textarea onChange={this.onChange.bind(this)} tabIndex={0} onBlur={(e)=>{this.props.app.setState({text: e.target.value})}} value={text}></textarea>
			</Container>
		)
	}
}

function TopBar(props) {
	return (
		<div className="top-bar flexbox-horizontal">
			<GreenButton text="View builds" onClick={(e) => {props.app.contextMenu([<BuildsDropdown app={props.app}/>], e)}}/>
			<GreenButton text="Save Build" onClick={(e) => {props.app.saveBuild()}}/>
			<GreenButton text="Save New Build" onClick={async (e) => {
				await props.app.setState({id: uuid()})
				props.app.saveBuild()
				}}/>
			<div className="flexbox-horizontal top-bar-button" onClick={()=>{props.app.exportBuild()}} style={{width: "150px"}}>
				<Icon className="button" img={"export"} size="32px"/>
				<Text text="Export build"/>
			</div>
		</div>
	)
}

class Skills extends React.Component {
	openSkillBook() {
		this.props.app.setState({popup: "skillbook"})
	}

	async reorderSkill(e, id, movement) {
		let state = cloneDeep(this.props.app.state.skills)
		let index = this.props.app.state.skills.indexOf(id) + movement
		state = state.filter((x)=>{return x != id})
	
		state.splice(index, 0, id)
	
		await this.props.app.closeContext()
		this.props.app.setState({skills: state})
	}

	render() {
		let skills = []
		let skillIDs = clone(this.props.app.state.skills)

		// origin and race-specific skills
		skillIDs.push(miscData.origins[this.props.app.state.origin].innateSkill)
		skillIDs.push(miscData.races[this.props.app.state.physique.race].innateSkill)

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
				<div className="flexbox-horizontal-list" style={{margin: "10px"}}>
					{skills}
				</div>
			</Container>
		)
	}
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
					<div style={{height: "30px"}}/>

					<div className="flexbox-horizontal flex-align-start" style={{height: "500px"}}>
						<Attributes app={this.props.app}/>
						<Ascension app={this.props.app}/>
						<TextField app={this.props.app} buildId={this.props.app.state.id}/>
					</div>
				</div>
			</div>
		</div>
	}
}
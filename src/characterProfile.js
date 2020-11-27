import './App.css';
import React from 'react';

import { Icon, Container, Text, FlairedCheckbox, Dropdown } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"
import cloneDeep from 'lodash.clonedeep';
import { TextField } from './components';

export class CharacterProfile extends React.Component {
	changeRace(e) {
		console.log(e.target.value)
		let state = cloneDeep(this.props.app.state.physique)
		state.race = e.target.value.toLowerCase()
		console.log(e.target.value)
		this.props.app.setState({physique: state})
	}

    render() {
		// build role options
		let roleOptions = {}
		for (let x in miscData.buildRoles) {
			roleOptions[x] = miscData.buildRoles[x].name
		}

		// origin dropdown options
		let originOptions = {}
		for (let x in miscData.origins) {
			let origin = miscData.origins[x]
			originOptions[x] = origin.name
		}

		// race options
		let raceOptions = {}
		for (let x in game.races) {
			raceOptions[x] = game.races[x].name
		}

		// only show race dropdown for custom characters
		let raceDropdown = (this.props.app.state.origin === "custom character") ? <Dropdown options={raceOptions} onChange={(e)=>{this.changeRace(e)}} selected={this.props.app.state.physique.race}/> : null

        return <Container className="character-profile">
            <div className="flexbox-horizontal">
				<Portrait app={this.props.app}/>
				{/* <div style={{width: "10px"}}/> */}
				<div className="flexbox-vertical" style={{width: "180px"}}>
					<CharacterName app={this.props.app}/>
					<Dropdown options={originOptions} onChange={(e)=>{this.props.app.setState({origin: e.target.value})}} selected={this.props.app.state.origin}/>
					{raceDropdown}
					<Dropdown options={roleOptions} onChange={(e)=>{this.props.app.setState({role: e.target.value})}} selected={this.props.app.state.role}/>
					<FlairedCheckbox text={"Lone Wolf"} ticked={this.props.app.state.lw} onChange={(e)=>{this.props.app.toggleLoneWolf()}}/>
				</div>
			</div>
        </Container>
    }
}

export function Portrait(props) {
	function changePortrait(e) {
		if (props.app.state.origin !== "custom")
			return
		let elements = []
		for (let x in miscData.portraits) {
			elements.push(
				<Icon className="button" img={miscData.portraits[x]} style={{height: "100px", width: "80px"}} onClick={()=>{props.app.setState({portrait: miscData.portraits[x]})}}/>
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
		<div className="portrait button" style={{position: "relative"}} onContextMenu={changePortrait} onClick={changePortrait}>
			<Icon img={props.app.state.portrait} style={{width: "108px", height: "135px"}}/>

			<img src={utils.getImage("portrait_frame")} style={{width: "120px", height: "150px"}} className="portrait-frame" alt={""}/>
		</div>
	)
}



function CharacterName(props) {
	return (
		<div className="flexbox-horizontal name-edit-container">
			<TextField app={props.app} text={props.app.state.name} lastValue={props.app.state.id} textareaClass="name-edit" onBlur={(e)=>{props.app.setState({name: e.target.value})}} stateKey="name" noBg/>
		</div>
	)
}

function CharacterNameEditButton(props) {
	let func = () => {
        let newName = window.prompt("Enter a name for this character:")
		newName = (newName != null && !utils.isEmptyString(newName)) ? newName : props.app.state.name
		props.app.setState({name: newName})
	}

	return (
		<Icon img={"name_edit"} className="name-edit button" onClick={()=>{func()}}>
			{/* todo */}
		</Icon>
	)
}
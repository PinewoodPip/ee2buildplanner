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

		let lifeTypes = {alive: miscData.lifeType.living.name, undead: miscData.lifeType.undead.name}
		let lifeType = this.props.app.state.origin == "custom" ?
		<Dropdown options={lifeTypes} onChange={(e)=>{this.props.app.changeLifeType(e.target.value)}} selected={this.props.app.state.physique.lifeType}/>
		: null

		// only show race dropdown for custom characters
		let raceDropdown = (this.props.app.state.origin === "custom") ? <Dropdown options={raceOptions} onChange={(e)=>{this.changeRace(e)}} selected={this.props.app.state.physique.race}/> : null

        return <Container className="character-profile">
            <div className="flexbox-horizontal flex-align-centered">
				<Portrait app={this.props.app}/>
				{/* <div style={{width: "10px"}}/> */}
				<div className="flexbox-vertical flex-align-start" style={{width: "180px", height: "150px"}}>
					<CharacterName app={this.props.app}/>

					{/* oh god bless this solved the clipping */}
					<div className="flexbox-vertical flex-grow flex-align-start">
						<Dropdown options={originOptions} onChange={(e)=>{this.props.app.changeOrigin(e)}} selected={this.props.app.state.origin}/>

						<div style={{height: "2px"}}/>

						<div className="flexbox-horizontal flex-align-centered">
							{raceDropdown}

							<div style={{width: "2px"}}/>

							{lifeType}
						</div>

						<div style={{height: "2px"}}/>

						<Dropdown options={roleOptions} onChange={(e)=>{this.props.app.setState({role: e.target.value})}} selected={this.props.app.state.role}/>
					</div>

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
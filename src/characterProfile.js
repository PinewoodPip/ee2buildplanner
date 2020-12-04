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
		let state = cloneDeep(this.props.app.state.physique)
		state.race = e.target.value.toLowerCase()
		this.props.app.setState({physique: state})
	}

	changeWeapon(hand, id) {
		let state = cloneDeep(this.props.app.state.weapons)
		state[hand] = id

		if (miscData.weapons[id].handedness == 2) {
			state.offhand = "none"
		}

		this.props.app.setState({weapons: state})
	}

    render() {
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

		// weapon options
		let mainWeapons = {}
		let offhands = {}
		for (let x in miscData.weapons) {
			let wep = miscData.weapons[x]
			if (wep.handedness != 0) {
				mainWeapons[x] = wep.name
			}
			else {
				offhands[x] = wep.name
			}

			if (wep.handedness != 2) {
				offhands[x] = wep.name
			}
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

						<div className="flexbox-horizontal flex-align-center">
							<Dropdown options={mainWeapons} onChange={(e)=>{this.changeWeapon("mainhand", e.target.value)}} selected={this.props.app.state.weapons.mainhand}/>

							<div style={{width: "2px"}}/>

							{game.hasFreeOffhand ? (
								<Dropdown options={offhands} onChange={(e)=>{this.changeWeapon("offhand", e.target.value)}} selected={this.props.app.state.weapons.offhand}/>
							) : null}
						</div>
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
				<Icon key={x} className="button" img={miscData.portraits[x]} style={{height: "100px", width: "80px"}} onClick={()=>{props.app.setState({portrait: miscData.portraits[x]})}}/>
			)
		}

		let realElements = [
			<div key={-1} className="flexbox-horizontal flex-wrap" style={{maxWidth: "600px"}}>
				{elements}
			</div>
		]

		props.app.contextMenu(realElements, e)
	}

	let role = miscData.buildRoles[props.app.state.role]

	let roleOptions = []
	roleOptions.push(<Text key={-1} text="Select option:"/>)
	for (let x in miscData.buildRoles) {
		let func = ()=>{props.app.setState({role: x, contextMenu: null})}
		let role = miscData.buildRoles[x]
		roleOptions.push(<div key={x} className="flexbox-horizontal flex-align-start" onClick={func} onContextMenu={func}>
			<Icon className="" size="25px" img={role.icon}/>
			<Text text={role.name} className="flex-grow"/>
		</div>)
	}

	let roleMenu = (e)=>{e.stopPropagation();props.app.contextMenu(roleOptions, e)}

	return (
		<div className="portrait" style={{position: "relative"}}>

			<Icon className={"portrait" + (props.app.state.origin === "custom" ? " button" : "")} img={props.app.state.portrait} style={{width: "108px", height: "135px"}} onClick={changePortrait} onContextMenu={changePortrait}/>

			<div className="role-display flexbox-horizontal button" style={{width: "100px", bottom: "5px"}} onContextMenu={roleMenu} onClick={roleMenu}>
				<Icon className="" size="25px" img={role.icon}/>
				<Text text={role.name}/>
			</div>

			<img src={utils.getImage("portrait_frame")} style={{width: "120px", height: "155px", pointerEvents: "none"}} className="portrait-frame" alt={""}/>
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
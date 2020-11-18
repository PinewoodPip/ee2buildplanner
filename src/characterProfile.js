import './App.css';
import React from 'react';

import { Icon, Container, Text } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"
import cloneDeep from 'lodash.clonedeep';

function CharacterRace(props) {
	let options = []
	for (let x in game.races) {
		options.push(<option key={x} value={x} selected={props.app.state.physique.race === x}>{game.races[x].name}</option>)
	}

	let func = function(e) {
		let state = cloneDeep(props.app.state.physique)
		state.race = e.target.value.toLowerCase()
		console.log(e.target.value)
		props.app.setState({physique: state})
	}

	return (<div>
		<select onChange={func}>
			{options}
		</select>
	</div>)
}

function CharacterOrigin(props) {
	let options = []
	for (let x in miscData.origins) {
		let origin = miscData.origins[x]
		options.push(<option key={x} value={x} selected={props.app.state.origin === x}>{origin.name}</option>)
	}

	return <select onChange={props.app.changeOrigin.bind(props.app)}>
		{options}
	</select>
}

export class CharacterProfile extends React.Component {
    render() {
		// only show race dropdown for custom characters
		let raceDropdown = (this.props.app.state.origin === "custom") ? <CharacterRace app={this.props.app}/> : null
        return <Container className="character-profile">
            <div className="flexbox-horizontal">
				<Portrait app={this.props.app}/>
				<div style={{width: "10px"}}/>
				<div className="flexbox-vertical">
					<CharacterName app={this.props.app}/>
					<CharacterOrigin app={this.props.app}/>
					{raceDropdown}
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
			<Text text={props.app.state.name}/>
			<div style={{width: "20px"}}/>
			<CharacterNameEditButton app={props.app}/>
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
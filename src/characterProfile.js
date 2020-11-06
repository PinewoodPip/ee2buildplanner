import './App.css';
import React from 'react';

import { Icon, Container, Text } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

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

export class CharacterProfile extends React.Component {
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

export function Portrait(props) {
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
import React from 'react';
import { game } from "./App.js"

class TabbedContainer extends React.Component {
    render() {
        return <div className="flexbox-vertical">
            <div className="flexbox-horiztonal">
                {this.props.tabs}
            </div>
            <Container>
                {this.props.children}
            </Container>
        </div>
    }
}

class Container extends React.Component {
    render() {
        return <div className={this.props.className + " box"}>
            {this.props.children}
        </div>
    }
}

class CharacterProfile extends React.Component {
    render() {
        return <Container className="character-profile">
            <div className="flexbox-horizontal">
				<Portrait app={this.props.app}/>
				<div className="flexbox-vertical">
					<CharacterName app={this.props.app}/>
					<CharacterRace app={this.props.app}/>
				</div>
			</div>
        </Container>
    }
}

function Portrait(props) {
	return (
		<div className="portrait">
			{/* todo */}
		</div>
	)
}

function Text(props) {
	return <p>{props.text}</p>
}

function CharacterName(props) {
	return (
		<div className="flexbox-horizontal name-edit-container">
			<Text text={props.app.state.name}/>
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
		<div className="name-edit box" onClick={()=>{func()}}>
			{/* todo */}
		</div>
	)
}

function CharacterRace(props) {
	let options = []
	for (let x in game.data.races) {
		options.push(<option key={x} value={x} selected={props.app.state.physique.race == x} onChange={(e)=>{props.app.setState({race: e.target.value}); game.render()}}>{game.data.races[x].name}</option>)
	}

	return (<div>
		<select>
			{options}
		</select>
	</div>)
}

export class MainInterface extends React.Component {
	render() {
		return <div>
			<CharacterProfile app={this.props.app}/>
		</div>
	}
}
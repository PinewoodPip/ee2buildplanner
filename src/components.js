import React from 'react';
import { game } from "./App.js"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import _ from "underscore"

export class Tooltip extends React.Component {
	render() {
		let placement = (this.props.placement != undefined) ? this.props.placement : "bottom"
		return (
		  <Tippy content={this.props.content} placement={placement} duration="0">
			<span>
			  {this.props.children}
			</span>
		  </Tippy>
		)
	}
}

function SkillTooltip(props) {
	let skill = props.data
	let desc = skill.DescriptionRef.split("Source Infusions:")
	let ability = game.mappings.abilityNames[skill.Ability]

	if (desc.length > 1) {
		if (skill.id == "Cone_GroundSmash") {
			// console.log(desc[1].split("):"))
			console.log(`3 (requires 9 ${ability}):`)
			console.log(skill.DescriptionRef.split(`3 (requires 9 ${ability}):`))
			// .split(`3 (requires 9 ${skill.Ability}):`)[0]
		}
		desc = [
			desc[0],
		]

		let infusionText = [
			skill.DescriptionRef.split(`1:`)[1],
			skill.DescriptionRef.split(`2 (requires 5 ${ability}):`)[1],
			skill.DescriptionRef.split(`3 (requires 9 ${ability}):`)[1],
		]

		console.log(skill.DescriptionRef.split(`2 (requires 5 ${ability}):`))
		// console.log(infusionText)

		if (infusionText[0] != undefined) {
			infusionText[0] = infusionText[0].split(`2 (requires 5 ${ability}):`)[0]
		}
		if (infusionText[1] != undefined) {
			infusionText[1] = infusionText[1].split(`3 (requires 9 ${ability}):`)[0]
		}
	
		let prefixes = ["◊: ", "◊◊: ", "◊◊◊: "]
	
		for (let x in infusionText) {
			if (infusionText[x] != undefined) {
				desc.push(prefixes[x] + infusionText[x])
			}
		}
	}

	let realDesc = []
	for (let x in desc) {
		realDesc.push(<Text key={x} text={desc[x]}/>)
	}

	let tooltip = <div className="flexbox-vertical">
		<Text text={skill.DisplayNameRef}/>
		<Text text={skill.id} className="text-small"/>

		<div style={{height: "10px"}}/>

		{realDesc}
	</div>
	return (
		<Tooltip content={tooltip} placement="right">
			{props.children}
		</Tooltip>
	)
}

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
	return <p className={"text " + props.className}>{props.text}</p>
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

function ClosePanelButton(props) {
	return (
		<div className="name-edit box" onClick={()=>{props.app.closePopupPanel()}}>

		</div>
	)
}

function Icon(props) {
	let className = (props.className != undefined) ? props.className : "icon"
	let style = (props.style != undefined) ? props.style : {}
	style.width = props.size
	style.height = props.size
	return (
		<div style={style} className={className} onClick={props.onClick}>
			<img src={props.img} style={{width: props.size, height: props.size}}/>
		</div>
	)
}

function SkillBookAbilityCategory(props) {
	let func = () => {props.app.setState({skillbookCategory: props.category})}

	return (
		<div className="flexbox-horizontal flex-align-start skillbook-category" onClick={func}>
			<Icon img={game.getImage(game.mappings.abilities[props.category])} size="32px"/>
			<div style={{width: "15px"}}/>
			<Text text={game.mappings.abilityNames[props.category]}/>
		</div>
	)
}

class Skill extends React.Component {
	render() {
		let img = game.getImage(this.props.data.Icon)
		let func = () => {console.log(this.props.data.id)}

		return <SkillTooltip data={this.props.data}>
			<Icon img={img} className="skill-icon" size={"64px"} onClick={func} style={this.props.style}>

			</Icon>
		</SkillTooltip>
	}
}

export function SkillBook(props) {
	let abilityButtons = []
	for (let x in game.skills.sorted) {
		abilityButtons.push(<SkillBookAbilityCategory key={x} category={x} app={props.app}/>)
	}

	let skills = []
	for (let x in game.skills.sorted[props.app.state.skillbookCategory]) {
		let skill = game.skills.sorted[props.app.state.skillbookCategory][x]
		skills.push(<Skill key={x} data={skill}/>)
	}

	return (
		<Container className="flexbox-vertical skillbook">
			<div className="flexbox-horizontal flex-align-end full-width">
				<Text text={"Skillbook"} className={"flex-grow"}/>
				<ClosePanelButton app={props.app}/>
			</div>
			<div className="flexbox-horizontal">
				<div className="flexbox-vertical">
					{abilityButtons}
				</div>
				<div className="flexbox-wrap skill-listing">
					{skills}
				</div>
			</div>
		</Container>
	)
}

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

export class MainInterface extends React.Component {
	render() {
		return <div>
			<CharacterProfile app={this.props.app}/>
		</div>
	}
}
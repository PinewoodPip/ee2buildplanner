import './App.css';
import React from 'react';

import { Icon, Container, Text, Tooltip, TabButton } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"
import cloneDeep from 'lodash.clonedeep';

export class Artifacts extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (utils.propObjectHasChanged(this.props.info, nextProps.info))
    }

    getContextMenu(id, array) {
        let props = this.props
        let newState = {contextMenu: null}
        newState[array] = this.props.app.state[array].filter((e)=>{return e != id})

        function reorder(movement) {
            let newState = {contextMenu: null}
            newState[array] = utils.reorderElementInArray(props.app.state[array], id, movement)
            props.app.setState(newState)
        }
        return [
            <Text key={0} text="Choose option:"/>,
            <Text key={1} text="Remove" onClick={()=>{this.props.app.setState(newState)}}/>,
            <Text key={2} text="Move left" onClick={()=>{reorder(-1)}}/>,
            <Text key={3} text="Move right" onClick={()=>{reorder(1)}}/>,
            <Text key={4} text="Move to front" onClick={()=>{reorder(-9999)}}/>,
            <Text key={5} text="Move to back" onClick={()=>{reorder(9999)}}/>,
        ]
    }

    render() {
        let artifacts = []
        for (let x in this.props.app.state.artifacts) {
            let art = game.getArtifact(this.props.app.state.artifacts[x])
            let func = (e)=>{this.props.app.contextMenu(this.getContextMenu(art.id, "artifacts"), e)}
            
            artifacts.push(<Artifact key={x} data={art} onClick={func} onContextMenu={func}/>)
        }

        // also show runes
        let runes = []
        for (let x in this.props.app.state.runes) {
            let rune = game.runes[this.props.app.state.runes[x].id]
            let func = (e)=>{this.props.app.contextMenu(this.getContextMenu(this.props.app.state.runes[x], "runes"), e)}

            runes.push(<Rune data={rune} key={-1-x} onClick={func} onContextMenu={func}/>)
        }

        // if build has no artifacts, show a message explaining this element's purpose
		let usabilityTip = this.props.app.state.artifacts.length === 0 && this.props.app.state.runes.length === 0 ?
		<div className="absolute-centered" style={{bottom: "90%", width: "100%"}}>
			<Text text="Click the + button to add Artifacts and Runes." className="text-faded"/>
		</div> : null

        return <Container className="artifacts">
            <div className="flexbox-horizontal-list" style={{margin: "10px", position: "relative"}}>
                {artifacts}
                {runes}
                <Icon className="button" borderless={true} img={"add"} size="64px" onClick={()=>{this.props.app.setState({popup: "artifacts"})}}/>

                {usabilityTip}
            </div>
        </Container>
    }
}

export class ArtifactsPopup extends React.Component {
    constructor() {super(); this.state = {tab: "weapons"}}

    addRune(id, slot="weapon") {
        let state = cloneDeep(this.props.app.state.runes)
        
        // can't have duplicate weapon runes
        if (slot === "weapon") {
            for (let x in state) {
                if (state[x].id === id && state[x].slot === "weapon") return
            }
        }

        state.push({id: id, slot: slot,})
        this.props.app.setState({runes: state})
    }

    render() {
        let categories = []
        for (let x in miscData.artifactCategories) {
            categories.push(<TabButton key={x} func={()=>{this.setState({tab: x})}} text={utils.capitalize(x)}>
            </TabButton>)
        }
        categories.push(<TabButton key={-2} func={()=>{this.setState({tab: "runes"})}} text="Runes"/>) // runes tab

        let artifacts = []
        if (this.state.tab !== "runes") {
            for (let x in miscData.artifactCategories[this.state.tab]) {
                let art = game.getArtifact(miscData.artifactCategories[this.state.tab][x])
                artifacts.push(<Artifact key={x} data={art} onClick={()=>{game.addArtifact(art.id)}}/>)
            }
        }
        else {
            for (let x in game.runes) {
                let rune = game.runes[x]
                artifacts.push(<Rune data={rune} key={x} onClick={()=>{this.addRune(rune.id)}}/>)
            }
        }

        return <Container className="flexbox-vertical flex-align-start skillbook">
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Artifacts & Runes"} className={"flex-grow"}/>
				<Icon className="button" img={"close"} size="32px" onClick={()=>{this.props.app.setState({popup: null})}} app={this.props.app}/>
			</div>

			<div style={{height: "20px"}}/>

			<div className="flexbox-horizontal flex-align-space-evenly full-width lateral-margin">
				<div className="flexbox-vertical flex-align-start">
					{categories}
				</div>
				<div className="flexbox-wrap flexbox-horizontal skill-listing">
					{artifacts}
				</div>
			</div>
		</Container>
    }
}

function Artifact(props) {
    let tooltip = <div className="flexbox-vertical">
        <Text text={<b>{props.data.name}</b>}/>
        <Text text={props.data.description}/>
    </div>
    return <Tooltip content={tooltip} placement="right">
        <Icon className="button artifact" img={props.data.icon} size="64px" onClick={props.onClick} onContextMenu={props.onContextMenu}/>
    </Tooltip>
}

function Rune(props) {
    function getRuneDescription(rune) {
        let boosts = []
        rune.boosts.weapon.forEach((e, i) => {
            game.getDisplayString(e)
            boosts.push(<Text key={i} text={game.getDisplayString(e)}/>)
        })
        if (rune.weaponBoostString)
            boosts.push(<Text key={-1} text={rune.weaponBoostString}/>)
        return boosts;
    }

    let tooltip = <div className="flexbox-vertical">
        <Text text={<b>{props.data.name}</b>}/>
        {/* <hr/> */}
        {getRuneDescription(props.data)}
    </div>

    return <Tooltip content={tooltip} placement="right">
        <Icon className="button artifact" img={props.data.icon} size="64px" onClick={props.onClick} onContextMenu={props.onContextMenu}/>
    </Tooltip>
}
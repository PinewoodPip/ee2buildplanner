import './App.css';
import React from 'react';

import { Icon, Container, Text, Tooltip, TabButton } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

export class Artifacts extends React.Component {
    render() {
        let artifacts = []
        for (let x in this.props.app.state.artifacts) {
            let art = game.getArtifact(this.props.app.state.artifacts[x])
            artifacts.push(<Artifact key={x} data={art} onClick={()=>{game.removeArtifact(art.id)}}/>)
        }

        return <Container className="skills">
            <div className="flexbox-horizontal-list" style={{margin: "10px", height: "100%"}}>
                {artifacts}
                <Icon className="button" borderless={true} img={"add"} size="64px" onClick={()=>{this.props.app.setState({popup: "artifacts"})}}/>
            </div>
        </Container>
    }
}

export class ArtifactsPopup extends React.Component {
    constructor() {super(); this.state = {tab: "weapons"}}
    render() {
        let categories = []
        for (let x in miscData.artifactCategories) {
            categories.push(<TabButton key={x} onClick={()=>{this.setState({tab: x})}}>
                <Text text={utils.capitalize(x)}/>
            </TabButton>)
        }

        let artifacts = []
        for (let x in miscData.artifactCategories[this.state.tab]) {
            let art = game.getArtifact(miscData.artifactCategories[this.state.tab][x])
            artifacts.push(<Artifact key={x} data={art} onClick={()=>{game.addArtifact(art.id)}}/>)
        }

        return <Container className="flexbox-vertical flex-align-start skillbook">
			<div className="flexbox-horizontal flex-align-end full-width bar">
				<Text text={"Artifacts"} className={"flex-grow"}/>
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
        <Icon className="button artifact" img={props.data.icon} size="64px" onClick={props.onClick}/>
    </Tooltip>
}
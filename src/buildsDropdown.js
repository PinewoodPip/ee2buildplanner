import './App.css';
import React from 'react';

import { Icon, Container, Text, FileButton, Flourish, Tooltip } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

class Build extends React.Component {
    constructor() {super(); this.state = {beingHovered: false}}

    render() {
        let props = this.props

        // build role info
        let role = miscData.buildRoles[props.data.metadata.role.toLowerCase()]
        let keywords = [];
        for (let x in props.data.metadata.keywords) {
            let keyword = props.data.metadata.keywords[x]
            if (keyword == "null") // todo investigate this later
                continue
            keywords.push(
                <Icon className="" key={x} size="25px" img={miscData.mappings.keywordImages[keyword]} style={{margin: "0 2px 0 2px"}}/>
            )
        }

        let linkButton = props.isForGallery ? (
            <Tooltip content="Copy Link">
                <Icon className="button absolute-center-vertical" img="copy_link" onClick={(e)=>{e.stopPropagation(); props.app.copyBuildLink(props.featuredBuildId)}} size="32px" style={{right: "0px", outline: "1px solid gray"}}/>
            </Tooltip>
        ) : null

        let roleDisplay = <div className="role-display flexbox-horizontal">
            <Icon className="" size="25px" img={role.icon}/>
            <Text text={role.name}/>
        </div>

        let buildRoleInfo = <div className="flexbox-horizontal flex-align-centered">
            {/* <Text text="|" style={{margin: "0 5px 0 5px"}}/> */}
            {keywords}
        </div>

        function deleteBuild(e) {
            e.stopPropagation()
            if (window.confirm("Are you sure you want to delete this build?")) {
                let save = props.app.getSavedBuilds();
                delete save[props.data.id]
                window.localStorage.setItem("savedBuilds", JSON.stringify(save))

                // todo fix this properly
                // this.forceUpdate()
                this.props.app.setState({sidebar: null})
            }
        }

        return (
            <div className="flexbox-horizontal flex-align-space-between build-entry button" style={{position: "relative"}} onClick={()=>{props.app.loadBuild(props.data.id, (props.fullBuild ? props.data : null), true, props.isForGallery)}} onContextMenu={deleteBuild.bind(this)} onMouseEnter={()=>{this.setState({beingHovered: true})}} onMouseLeave={()=>{this.setState({beingHovered: false})}}>
                {roleDisplay}

                <Icon img={props.data.portrait} style={{width: "80px", height: "100px", outline: "1px solid rgb(70, 70, 70)"}}/>
                <div className="flexbox-vertical flex-align-centered flex-grow">
                    <Text text={props.data.metadata.name}/>

                    {props.data.metadata.author != "" && (props.data.metadata.author !== game.app.state.config.author || props.isForGallery) ? <Text text={"by " + props.data.metadata.author}/> : null}

                    <div style={{height: "5px"}}/>

                    {buildRoleInfo}
                </div>

                {/* buttons that appear on hover */}
                {this.state.beingHovered && !props.undeletable ? (
                    <Tooltip content="Delete Build">
                        <Icon className="button absolute-center-vertical" img={"trash_can"} onClick={deleteBuild.bind(this)} size="32px" style={{right: "0px"}}/>
                    </Tooltip>
                ) : null}

                {this.state.beingHovered && props.isForGallery ? (
                    linkButton
                ) : null}
            </div>
        )
    }
}

export function BuildsDropdown(props) {
    let buildsList = game.app.getSavedBuilds()
    let builds = []
    for (let x in buildsList) {
        builds.push(<Build key={x} data={buildsList[x]} app={props.app}/>)
    }

	return (
		<Container className="flexbox-vertical builds-dropdown flex-align-start wrap-y" noBg>
            <div style={{height: "20px"}}/>

            <Text text="Saved Builds" style={{fontSize: "18px"}}/>
            <Flourish style={{marginBottom: "15px"}}/>

			{builds}

            <FileButton text="Import Build" func={(f)=>{props.app.importBuild(f)}}/>
		</Container>
	)
}

export function FeaturedBuilds(props) {
    let buildsList = game.app.getFeaturedBuilds()
    if (!buildsList)
        return <Container className="flexbox-vertical builds-dropdown flex-align-start wrap-y" noBg>
            <Text text="The Build Gallery could not be loaded. Try refreshing."/>
        </Container>

    let builds = []
    for (let x in buildsList) {
        builds.push(<Build featuredBuildId={x} fullBuild isForGallery undeletable key={x} data={buildsList[x]} app={props.app}/>)
    }

	return (
		<Container className="flexbox-vertical builds-dropdown flex-align-start wrap-y" noBg>
            <div style={{height: "20px"}}/>

            <Text text="Build Gallery" style={{fontSize: "18px"}}/>
            <Flourish style={{marginBottom: "15px"}}/>

			{builds}

            <div style={{height: "10px"}}/>
            <Text text="Message @Pip#1249 on the Discord if you want your build added here!"/>

		</Container>
	)
}

// UNUSED
export class ExportMenu extends React.Component {
    render() {
        return <Container className="flexbox-vertical">
            <Text text="Share/Export Build"/>
            <Text text="You can choose to share your build through a link or a JSON file. You can use the latter to keep backups of your builds and move them across machines."/>
            <textarea readOnly>{this.props.app.getBuildURL()}</textarea>
        </Container>
    }
}
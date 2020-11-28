import './App.css';
import React from 'react';

import { Icon, Container, Text, FileButton } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"

function Build(props) {
    let title = props.data.author !== game.app.state.config.author ? "{0} by {1}" : "{0}"
    title = utils.format(title, props.data.metadata.name, props.data.metadata.author)

    // build role info
    let role = miscData.buildRoles[props.data.metadata.role.toLowerCase()]
    let keywords = [];
    for (let x in props.data.metadata.keywords) {
        let keyword = props.data.metadata.keywords[x]
        keywords.push(
            <Icon className="" key={x} size="25px" img={miscData.mappings.keywordImages[keyword]} style={{margin: "0 2px 0 2px"}}/>
        )
    }

    let roleDisplay = <div className="role-display flexbox-horizontal">
        <Icon className="" size="25px" img={role.icon}/>
        <Text text={role.name}/>
    </div>

    let buildRoleInfo = <div className="flexbox-horizontal flex-align-centered">
        {/* <Text text="|" style={{margin: "0 5px 0 5px"}}/> */}
        {keywords}
    </div>

    function deleteBuild(e) {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this build?")) {
            let save = props.app.getSavedBuilds();
            delete save[props.data.id]
            window.localStorage.setItem("savedBuilds", JSON.stringify(save))
            game.render()
        }
    }

    return (
        <div className="flexbox-horizontal flex-align-space-between build-entry button" style={{position: "relative"}} onClick={()=>{props.app.loadBuild(props.data.id)}} onContextMenu={deleteBuild}>
            {roleDisplay}

            <Icon img={props.data.portrait} style={{width: "80px", height: "100px"}}/>
            <div className="flexbox-vertical flex-align-centered flex-grow">
                <Text text={title}/>

                <div style={{height: "5px"}}/>

                {buildRoleInfo}
            </div>
            <div className="flexbox-vertical">
                {/* <Icon className="button" img={"export"} onClick={props.app.exportBuild} size="32px"/> */}
                <Icon className="button" img={"trash_can"} onClick={deleteBuild} size="32px"/>
            </div>
        </div>
    )
}

export function BuildsDropdown(props) {
    let buildsList = game.app.getSavedBuilds()
    let builds = []
    for (let x in buildsList) {
        builds.push(<Build data={buildsList[x]} app={props.app}/>)
    }

    builds.push(<FileButton text="Import build" func={(f)=>{props.app.importBuild(f)}}/>)

	return (
		<Container className="flexbox-vertical builds-dropdown" noBg>
			{builds}
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
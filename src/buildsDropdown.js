import './App.css';
import React from 'react';

import { Icon, Container, Text } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"
import cloneDeep from 'lodash.clonedeep';

function Build(props) {
    let title = props.data.author != null ? "{0} by {1}" : "{0}"
    title = utils.format(title, props.data.metadata.name, props.data.metadata.author)
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
        <div className="flexbox-horizontal flex-align-space-between build-entry button" onClick={()=>{props.app.loadBuild(props.data.id)}} onContextMenu={deleteBuild}>
            <Icon img={props.data.portrait} style={{width: "80px", height: "100px"}}/>
            <Text text={title} className="flex-grow"/>
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
	return (
		<Container className="flexbox-vertical builds-dropdown" noBg>
			{builds}
		</Container>
	)
}

export class ExportMenu extends React.Component {
    render() {
        return <Container className="flexbox-vertical">
            <Text text="Share/Export Build"/>
            <Text text="You can choose to share your build through a link or a JSON file. You can use the latter to keep backups of your builds and move them across machines."/>
            <textarea readOnly>{this.props.app.getBuildURL()}</textarea>
        </Container>
    }
}
import './App.css';
import React from 'react';

import { Icon, Container, Text } from "./genericComponents.js"
import { game } from "./App.js"
import * as utils from "./utils.js"
import * as miscData from "./miscData.js"
import cloneDeep from 'lodash.clonedeep';

function Build(props) {
    let title = props.data.author != null ? "{0} by {1}" : "{0}"
    title = utils.format(title, props.data.name, props.data.author)
    return (
        <div className="flexbox-horizontal flex-align-start build-entry" onClick={()=>{props.app.loadBuild(props.data)}}>
            <Icon img={miscData.portraits[props.data.portrait]} style={{width: "150px", height: "120px"}}/>
            <Text text={title}/>
        </div>
    )
}

export function BuildsDropdown(props) {
    let buildsMeta = game.app.getSavedBuildsMetadata()
    let builds = []
    buildsMeta.forEach(m => {
        builds.push(<Build data={m} app={props.app}/>)
    })
	return (
		<Container className="flexbox-vertical builds-dropdown" noBg>
			{builds}
		</Container>
	)
}
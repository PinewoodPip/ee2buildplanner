import './App.css';
import React from 'react';

import { Icon, Tooltip } from "./genericComponents.js"
import { game } from "./App.js"
import * as miscData from "./miscData.js"

function Buff(props) {
    let className = (game.app.state.buffs.has(props.data.id)) ? "activated button" : "button"
    return <Tooltip content={props.data.name}>
        <Icon size="32px" className={className} img={props.data.icon} onClick={()=>{game.toggleBuff(props.data.id)}}/>
    </Tooltip>
}

export function BuffBar(props) {
    let buffs = []
    for (let x in miscData.statuses) {
        let status = miscData.statuses[x]

        if (status.type !== "special" || props.app.state.artifacts.includes(status.id.replace("PIP_Artifact_", "").toLowerCase()) || props.app.state.talents.has(status.id.replace("PIP_Talent_", "").toLowerCase()))
        buffs.push(<Buff key={x} data={status}/>)
    }
    return <div className="flexbox-horizontal flex-align-centered">
        {buffs}
    </div>
}
import './App.css';
import React from 'react';

import { Icon, Container, Text, FlairedCheckbox, Dropdown, PopupHeader } from "./genericComponents.js"
import * as miscData from "./miscData.js"

export function InstrumentsPopup(props) {
    let instruments = []
    function changeInstrument(id) {props.app.setState({instrument: id, popup: null})}
    for (let x in miscData.instruments) {
        instruments.push(<Icon className="button" key={x} img={x} size="64px" onClick={x => {changeInstrument(x)}}/>)
    }

    return <Container style={{width: "400px", height: "200px"}} className="flexbox-vertical flex-align-start">
        <PopupHeader text="Instrument"/>
        <Text text="Congratulations, you have been deemed worthy of bestowing an instrument of your choice upon your build! Choose wisely."/>

        <div style={{height: "10px"}}/>

        <div className="flexbox-horizontal">
            {instruments}
        </div>
    </Container>
}
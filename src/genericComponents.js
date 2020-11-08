import './App.css';
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { cloneDeep } from "lodash"

import { game } from "./App.js"
import * as utils from "./utils.js"

// text wrapper component. has support for dark mode on/off toggle
export function Text(props) {
	let extraClass = game.app.state.darkMode ? "dark-mode-text" : ""
	return <p style={props.style} className={extraClass + " text " + props.className} onClick={props.onClick}>{props.text}</p>
}

// basic container. has a background by default
export class Container extends React.Component {
  render() {
  let bg = this.props.noBg ? "" : " box"
      return <div className={this.props.className + bg} style={this.props.style}>
          {this.props.children}
      </div>
  }
}

// a container that can have multiple tabs to switch between. Each child is a tab
export class TabbedContainer extends React.Component {
	constructor() {
		super()
		this.state = {index: 0}
	}

	// changeIndex(increment) {
	// 	let max = this.props.children.length - 1
	// 	let newIndex = this.state.index + increment;

	// 	if (newIndex < 0)
	// 		newIndex = max
	// 	else if (newIndex > max)
	// 		newIndex = 0

	// 	this.setState({index: newIndex})
	// }

    render() {
		let options = []
		for (let x in this.props.children) {
			options.push(<option key={x} value={x}>{this.props.children[x].props.name}</option>)
		}
        return <Container className="flexbox-vertical" style={this.props.style}>
				<div style={{marginTop: "20px", marginBottom: "20px"}}>
					<select onChange={(e)=>{this.setState({index: e.target.value})}}>
						{options}
					</select>
				</div>
				
                {this.props.children[this.state.index]}
            </Container>
    }
}

export function Icon(props) {
	let className = (props.className != null) ? props.className : "icon"
	let style = (props.style != null) ? cloneDeep(props.style) : {}

	if (props.style != null) {
		style.width = (props.style.width != null) ? props.style.width : props.size
		style.height = (props.style.height != null) ? props.style.height : props.size
	}
	else {
		style.width = props.size
		style.height = props.size
	}
	
	return (
		<div style={style} className={className} onClick={props.onClick} onContextMenu={props.onContextMenu}>
			{/* <img src={props.img} style={{width: props.size, height: props.size}}/> */}
			<img alt={""} src={utils.getImage(props.img)} style={{width: "100%", height: "100%"}}/>
		</div>
	)
}

export function TabButton(props) {
	return <div className={"flexbox-horizontal flex-align-start skillbook-category " + props.className} onClick={props.onClick}>
		{props.children}
	</div>
}

export function Popup(props) {
  return (
    <div className="popup-cover">
      <div className="pop-up-parent">
        {props.element}
      </div>
    </div>
  )
}

export class Tooltip extends React.Component {
	render() {
		let placement = (this.props.placement != null) ? this.props.placement : "bottom"
		return (
		  <Tippy content={this.props.content} placement={placement} duration="0">
			<span>
			  {this.props.children}
			</span>
		  </Tippy>
		)
	}
}

export function ContextMenu(props) {
  let childs = []
  let info = props.app.state.contextMenu;
  for (let x in props.children) {
    // if an element has no onClick handler, don't highlight it when the user hovers over it
    let className = props.children[x].props.onClick != null ? "context-option" : "context-option-noninteractable"
    childs.push(<div key={Math.random()} className={className}>{props.children[x]}</div>)
  }
  return (
    <div className="context context-menu" onMouseLeave={()=>{props.app.closeContext()}} style={{left: info.position.x, top: info.position.y}}>
      {childs}
    </div>
  )
}
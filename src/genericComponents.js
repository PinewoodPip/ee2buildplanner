import './App.css';
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { cloneDeep } from "lodash"

import { game } from "./App.js"
import * as utils from "./utils.js"

export function Dropdown(props) {
	let options = []
	for (let x in props.options) {
		options.push(<option key={x} value={x}>{props.options[x]}</option>)
	}

	return <select onChange={props.onChange} value={props.selected}>
		{options}
	</select>
}

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
        return <Container className={"flexbox-vertical " + this.props.className} style={this.props.style}>
				<div style={{marginTop: "20px", marginBottom: "20px"}}>
					<select onChange={(e)=>{this.setState({index: e.target.value})}}>
						{options}
					</select>
				</div>
				<Flourish style={{marginTop: "-15px"}}/>
				<div style={{height: "15px"}}/>
				
                {this.props.children[this.state.index]}
            </Container>
    }
}

export function GreenButton(props) {
	return (
		<div className={"absolute button " + props.className} onClick={props.onClick} onContextMenu={props.onContextMenu}>
			<img alt={props.text} style={{width: "150px", height: "30px"}} src={utils.getImage("button_green")}/>
			<Text text={props.text} className="unselectable"/>
		</div>
	)
}

export function Flourish(props) {
	let style = props.style ? props.style : {};
	style.width = style.width ? style.width : "180px"
	style.height = style.height ? style.height : "13px"
	return <Icon className={props.className + " "} style={style} img={"flourish"}/>
}

export function FlairedCheckbox(props) {
	return (
		<div className="flexbox-horizontal flex-align-centered" style={props.style}>
			<input type="checkbox" checked={props.ticked} onChange={props.onChange}/>
			<div style={{width: "10px"}}/>
			<Text text={props.text}/>
		</div>
	)
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
	let img = props.img ? [<Icon img={props.img} size="32px" className=""/>, <div style={{width: "15px"}}/>] : null
	return (
		<div className={"flexbox-horizontal flex-align-start skillbook-category button " + (props.chosen ? "chosen " : " ") + props.className} onClick={props.func} style={props.style}>
			{img}
			<Text text={props.text}/>
		</div>
	)
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

  let left = window.innerWidth > (info.position.x + window.innerWidth/5) ? info.position.x : info.position.x - window.innerWidth/5

  let top = window.innerHeight > (info.position.y + window.innerHeight/3) ? info.position.y : info.position.y - window.innerHeight/3

  return (
    <div className="context context-menu" onMouseLeave={()=>{props.app.closeContext()}} style={{left: left, top: top}} ref={element => {
		if (!element)
			return
		return (element.getBoundingClientRect())
	}}>
      {childs}
    </div>
  )
}

export class FileButton extends React.Component {
	async getFile(event) {
		event.stopPropagation();
		event.preventDefault();
		var file = event.target.files[0];
		return file.text()
	}
	render() {
		return(
			<div className="flexbox-horizontal import-build button" onClick={() => {this.upload.click()}} disabled={(this.props.disabled)}>
				<Icon size="32px" img="export"/>
				<Text text="Import build"/>
			<input id="myInput"
				type="file"
				ref={(ref) => this.upload = ref}
				style={{display: 'none'}}
				onChange={async (e) => {let file = await this.getFile.bind(this)(e); this.props.func(file)}}
			/>
			</div>
		)
	}
}

export function PopupHeader(props) {
	return <div className="flexbox-horizontal flex-align-end full-width bar">
		<Text text={props.text} className={"flex-grow"}/>
		<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
	</div>
}
import './App.css';
import React from 'react';
// import Tippy from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { cloneDeep } from "lodash"
// import "animate.css"

import { game } from "./App.js"
import * as utils from "./utils.js"
import { TextField } from './components';

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
	let extraClass = game.app.state.darkMode && !props.overrideColor ? "dark-mode-text" : ""
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

				{/* todo remove this from here to make this component generic */}
				<GreenButton text="View Stats" onClick={() => {this.props.app.setState({popup: "stats"})}} style={{marginBottom: "15px"}}/>
				<div style={{height: "16px"}}/>
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

export function TooltipHeader(props) {
	return (
		<div className="flexbox-vertical tooltip-header">
            {props.children}
        </div>
	)
}

export class Tooltip extends React.Component {
	render() {
		let placement = (this.props.placement != null) ? this.props.placement : "bottom"
		return (
		  <Tippy content={this.props.content} placement={placement} duration="0"
			render={attrs => (
				<div>
					{/* check if content prop is a valid element; if it's not, make it into a <Text> */}
					<div className="styled-tooltip">
						{React.isValidElement(this.props.content) ? this.props.content : <Text text={this.props.content}/>}
					</div>
				</div>
			)}
		  >
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
    <div className="context context-menu" onMouseLeave={()=>{props.app.closeContext()}} style={{left: left, top: top}}>
      {childs}
    </div>
  )
}

export class SearchBar extends React.Component {
	constructor() {super(); this.state = {text: ""}}

	componentDidMount() {
		this.searchSystem = new SearchSystem(this.props.data)
	}

	search(query) {
		console.log(query)
		this.props.parentElement.setState({
			searchResults: this.searchSystem.getResults(query),
			isSearching: true,
		})
	}

	render() {
		return <div className="flexbox-horizontal search-bar-parent">
			<Icon img="search" size="30px"/>
			<TextField className="search-bar" textareaClass="search-bar-inner" style={{padding: 0}} noBg app={this.props.app} lastValue={this.props.parentElement.state.search} onBlur={(e)=>{this.search(e.target.value)}} stateKey="text" textareaClass="search-bar-inner" onEnterKey={e => {this.search(e)}}/>
		</div>
	}
}

class SearchSystem {
	constructor(data) {
		this.data = data;
		for (let x in this.data) {
			this.data[x] = this.data[x].toLowerCase()
		}
	}

	getResults(query, allWordsMustBeContained=true) {
		console.log(this.data)
		let words = query.trim().toLowerCase().split(" ").filter(e => {return e !== ""})

		if (words.includes("mutator") || words.includes("activator")) {
			words.indexOf("mutator")
		}

		for (let i in words) {
			let word = words[i]

			if ((word === "mutator" || word === "activator") && i > 0) {
				words[i] = words[i - 1] + "_" + word
				words[i - 1] = ""
			}
		}

		words = words.filter(e => {return e != ""})

		console.log(words)

		let results = []

		if (utils.isEmptyString(query))
			return []

		// item is key of object data
		for (let item in this.data) {
			let matches = 0

			for (let word in words) {
				if (this.data[item].includes(words[word])) {
					matches++;
					let matchesAll = matches === words.length
					if (!allWordsMustBeContained || matchesAll) {
						results.push(item)
						break
					}
				}
			}
		}

		console.log(results)
		return results
	}
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
				<Icon size="32px" img="import"/>
				<Text text="Import build"/>
			<input id="myInput"
				type="file"
				accept=".json"
				ref={(ref) => this.upload = ref}
				style={{display: 'none'}}
				onChange={async (e) => {let file = await this.getFile.bind(this)(e); this.props.func(file)}}
			/>
			</div>
		)
	}
}

export function PopupHeader(props) {
	if (!props.additionalElement)
		return <div className="flexbox-horizontal flex-align-end full-width bar">
			<Text text={props.text} className={"flex-grow"}/>
			<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
		</div>
	else {
		return <div className="flexbox-horizontal flex-align-end full-width bar">
			<Text text={props.text} className={"flex-grow"} style={{margin: "0 45px"}}/>
			{props.additionalElement}
			<Icon className="button" img={"close"} size="32px" onClick={()=>{props.app.setState({popup: null})}} app={props.app}/>
		</div>
	}
}

export function Sidebar(props) {
	let style = {}

	// reverse element order for right-sided sidebars
	let extraClass = props.side == "right" ? "flex-row-reverse" : ""

	return (
		<div className={"sidebar-overlay flexbox-horizontal " + extraClass}>
			<Container noBg className="sidebar" style={style}>
				{props.children}
			</Container>

			{/* the clickable element that removes the sidebar */}
			<div className="flex-grow" style={{height: "100%"}} onClick={()=>props.app.setState({sidebar: null})}/>
		</div>
	)
}
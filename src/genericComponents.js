import './App.css';
import React from 'react';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export function Popup(props) {
  return (
    <div className="popup-cover">
      <div className="pop-up-parent">
        {props.element}
      </div>
    </div>
  )
}

export function ContextMenu(props) {
  let childs = []
  let info = props.app.state.contextMenu;
  for (let x in props.children) {
    let className = props.children[x].props.onClick != undefined ? "context-option" : "context-option-noninteractable"
    childs.push(<div key={Math.random()} className={className}>{props.children[x]}</div>)
  }
  return (
    <div className="context context-menu" onMouseLeave={()=>{props.app.closeContext()}} style={{left: info.position.x, top: info.position.y}}>
      {childs}
    </div>
  )
}

// export function ContextMenuContents(props) {
// 	return (
// 		<ContextMenu id={props.id}>
// 			{props.children}
// 		</ContextMenu>
// 	)
// }
import './App.css';
import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export function Popup(props) {
  return (
    <div className="popup-cover">
      <div className="pop-up-parent">
        {props.element}
      </div>
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
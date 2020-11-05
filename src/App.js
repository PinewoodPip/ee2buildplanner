import './App.css';
import React from 'react';
import update from 'immutability-helper';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import * as utils from "./utils.js"
import { Game, Ascension } from "./game.js"
import { MainInterface, SkillBook, Text, RightClickMenu, AscensionPopup, Embodiments, Boosts } from "./components.js"
import * as miscData from "./miscData.js"
import { Popup, ContextMenu } from "./genericComponents.js"

const axios = require('axios').default;

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      ready: false,
      popup: null,
      skillbookCategory: "Air",
      selectedAspect: null,
      currentFamily: "force",
      currentlyViewedAspect: {family: null, id: null, nodes: []},
      contextMenu: {
        position: null,
        element: null,
      },
      DRAmount: 100,
      DR: true,
      rounding: 2,

      physique: {
        race: "lizard",
        gender: "female",
        lifeType: "alive",
      },
      name: "Lindsay Lohan",
      skills: [],
      artifacts: [],
      skillAbilities: {
        "Warrior": 0,
        "Water": 0,
        "Earth": 0,
        "Death": 0,
        "Rogue": 0,
        "Ranger": 0,
        "Fire": 0,
        "Summoning": 0,
        "Air": 0,
        // "Source": 0,
        "Polymorph": 0,
      },
      aspects: [
        {
          family: "force",
          id: "TheFalcon",
          nodes: [
            0,
            2,
            1,
            0,
            0
          ]
        }
      ]
    }
  }

  contextMenu(element, e) {
    e.preventDefault()
    this.setState({contextMenu: {position: {x: e.pageX, y: e.pageY}, element: element}})
  }

  closeContext() {
    this.setState({contextMenu: {position: null, element: null}})
  }

  // called when the component is created for the first time. we fetch data here
  componentDidMount() {
    game.app = this;

    // import images
    game.images.icons = {
      ...utils.importAll(require.context("./images/skills", false, /\.(gif|jpe?g|svg|png)$/)),
      ...utils.importAll(require.context("./images/keywords", false, /\.(gif|jpe?g|svg|png)$/)),
      ...utils.importAll(require.context("./images/interface", false, /\.(gif|jpe?g|svg|png)$/)),
    }

    // load game data
    let requests = [
      "/Scripts/Artifacts/artifacts.json",
      "/Scripts/Ascension/ascension.json",
      "/Scripts/Skills/Output/skills.json",
      "/Scripts/Ascension/tsk_export.json",
    ]
    let promises = []

    for (let x = 0; x < requests.length; x++) {
      promises.push(axios.get(requests[x]))
    }
    
    axios.all(promises)
      .then(function(responses) {
        game.artifacts = responses[0].data
        game.ascension.aspects = responses[1].data
        game.skills = responses[2].data
        game.ascension.specialStrings = responses[3].data
        game.ascension.app = this

        // start rendering once all data is ready
        this.setState({ready: true})
      }.bind(this))
      .catch((error) => {
        alert("The app did not load properly. Try refreshing.")
        throw error;
    });
  }

  closePopupPanel() {this.setState({popup: null})}

  render() {
    // only start rendering once all data has been fetched
    if (this.state.ready) {

      // popup elements which are placed in the middle of the screen
      // darn i think this rerenders unused ones...
      let popup = null;
      switch (this.state.popup) {
        case "skillbook": {popup = <SkillBook app={this}/>; break}
        case "ascension": {popup = <AscensionPopup app={this}/>; break}
        case "stats": {popup = <Boosts app={this}/>; break}
      }

      if (this.state.popup != null) {
        popup = <Popup element={popup}/>
      }

      let contextMenu = null
      if (this.state.contextMenu.element != null) {
        contextMenu = <ContextMenu app={this}>{this.state.contextMenu.element}</ContextMenu>

      }

      return (
        // onClick={this.closeContext.bind(this)}
        <div className="App" >
          {contextMenu}
          {popup}
          <MainInterface app={this}/>
        </div>
      );
    }
    else {
      return <div className="flexbox-vertical">
        <p>Loading...</p>
      </div>
    }
  }
}

export var game = new Game()

export default App;

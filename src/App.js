import './App.css';
import React from 'react';

import * as utils from "./utils.js"
import { Game } from "./game.js"
import { MainInterface, AscensionPopup, Keywords } from "./components.js"
import { Popup, ContextMenu } from "./genericComponents.js"
import { Boosts } from "./statsDisplay.js"
import { SkillBook } from "./skillbook.js"
import { ArtifactsPopup } from "./artifacts.js"
import cloneDeep from 'lodash.clonedeep';

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
      currentKeyword: "Abeyance",
      darkMode: true,
      stats: null,
      text: "",

      statCategories: new Set(),
      portraitIndex: 0,
      customPortrait: null,
      physique: {
        race: "lizard",
        gender: "female",
        lifeType: "alive",
      },
      // naturally invested attrs
      attributes: {
        str: 0,
        fin: 0,
        pwr: 0,
        con: 0,
        mem: 0,
        wits: 0,
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
      ],
      buffs: new Set(),
      civils: {
        thievery: 0,
        luckycharm: 0,
        bartering: 0,
        sneaking: 0,
        persuasion: 0,
        telekinesis: 0,
      },
      talents: new Set(),
    }
  }

  stats;
  keywords;

  // recalculate stats anytime the state changes. far more performant that calling getStats() for any component that needs them
  componentDidUpdate(prevState, newState) {
    // this.setState({stats: game.getStats()})
    this.stats = game.getStats();
  }

  toggleTalent(id) {
    let state = cloneDeep(this.state.talents)
    if (state.has(id))
      state.delete(id)
    else
      state.add(id)
    this.setState({talents: state})
  }

  // todo finish this
  toggle(key, value, obj=null) {
    let state = cloneDeep(this.state)
    
    if (typeof state[key] == "array") {
      if (state[key].includes(value))
        state[key] = state[key].filter((e)=>{return e != value})
      else
        state[key].push(value)
    }
    else if (typeof state[key] == "object") {
      if (value in state[key])
        delete state[key][value]
      else
        state[key][value] = obj
    }
    else {
      console.log("typo")
    }

    console.log(state)
    this.setState(state)
  }

  // should just make a generic method for updating these...
  toggleStatCategory(id) {
    let state = cloneDeep(this.state.statCategories)
    if (state.has(id))
      state.delete(id)
    else
      state.add(id)
    this.setState({statCategories: state})
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
      ...utils.importAll(require.context("./images/icons", false, /\.(gif|jpe?g|svg|png)$/)),
      ...utils.importAll(require.context("./images/portraits", false, /\.(gif|jpe?g|svg|png)$/)),
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

        this.stats = game.getStats()

        // start rendering once all data is ready
        this.setState({ready: true})
      }.bind(this))
      .catch((error) => {
        alert("The app did not load properly. Try refreshing.")
        throw error;
    });
  }

  closePopupPanel() {this.setState({popup: null})}

  handleKeyPress(e) {
    if (e.key === "Escape") {this.closePopupPanel()}
  }

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
        case "keywords": {popup = <Keywords app={this}/>; break}
        case "artifacts": {popup = <ArtifactsPopup app={this}/>; break}
        default: {break}
      }

      if (this.state.popup != null) {
        popup = <Popup element={popup}/>
      }

      let contextMenu = null
      if (this.state.contextMenu.element != null) {
        contextMenu = <ContextMenu app={this}>{this.state.contextMenu.element}</ContextMenu>
      }

      return (
        // tabindex is needed to catch key presses. Outline disables the ugly outline when the element is focused
        <div className="App" tabIndex={-1} style={{outline: "none"}} onKeyDown={(e)=>{this.handleKeyPress(e)}}>
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

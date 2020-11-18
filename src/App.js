import './App.css';
import React from 'react';
import cloneDeep from 'lodash.clonedeep';

import * as utils from "./utils.js"
import { Game } from "./game.js"
import { MainInterface, AscensionPopup, Keywords } from "./components.js"
import { Popup, ContextMenu } from "./genericComponents.js"
import { Boosts } from "./statsDisplay.js"
import { SkillBook } from "./skillbook.js"
import { ArtifactsPopup } from "./artifacts.js"
import * as miscData from "./miscData.js"

const axios = require('axios').default;

const SAVE_PROTOCOL = 0
const APP_VERSION = {major: 0, minor: 0, revision: 0}
const APP_DATE = "16/11/2020" // european format

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
      portrait: "human_m",
      customPortrait: null,
      origin: "custom",
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
      abilities: {
        // combat abilities
        DualWielding: 0,
        Ranged: 0,
        SingleHanded: 0,
        TwoHanded: 0,
        Leadership: 0,
        Perseverance: 0,
        PainReflection: 0,
        // skill abilities
        WarriorLore: 0,
        WaterSpecialist: 0,
        EarthSpecialist: 0,
        Necromancy: 0,
        RogueLore: 0,
        RangerLore: 0,
        FireSpecialist: 0,
        Summoning: 0,
        AirSpecialist: 0,
        // Source: 0, -- the player cannot invest into this ingame.
        Polymorph: 0,
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
      coreNodes: {
        force: false,
        entropy: false,
        form: false,
        inertia: false,
        life: false,
      },
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

  get talents() {
    return new Set([...this.state.talents, ...miscData.races[this.state.physique.race].talents])
  }

  get hasCompleteCore() {
    for (let x in this.state.coreNodes) {
      if (!this.state.coreNodes[x])
        return false
    }
    return true
  }

  // recalculate stats anytime the state changes. far more performant that calling getStats() for any component that needs them
  componentDidUpdate(prevState, newState) {
    // this.setState({stats: game.getStats()})
    this.stats = game.getStats();
  }

  getSavedBuildsMetadata() {
    let builds = window.localStorage.getItem("savedBuilds")

    let list = []
    if (builds) {
      builds = JSON.parse(builds)
      builds.forEach(build => {
        list.push({
          name: build.metadata.name,
          author: build.metadata.author,
          portrait: build.metadata.portrait,
        })
      })
      return list;
    }
    return []
  }

  loadBuild(meta) {
    let metas = this.getSavedBuildsMetadata()
    for (var index = 0; index < metas.length; index++) {
      if (metas[index].name == meta.name)
        break;
    }

    let build = JSON.parse(window.localStorage.getItem("savedBuilds"))[index]
    console.log(build)
    this.setState({
      statCategories: build.statCategories,
      portrait: build.portrait,
      customPortrait: build.customPortrait,
      physique: build.physique,
      attributes: build.attributes,
      skills: build.skills,
      artifacts: build.artifacts,
      abilities: build.abilities,
      aspects: build.aspects,
      buffs: new Set(build.buffs),
      civils: build.civils,
      talents: new Set(build.talents),
    })
  }

  saveBuild() {
    let name = window.prompt("Enter a name for this build. WARNING: this will override previous builds using this name.")
    if (utils.isEmptyString(name))
      return

    let state = this.state
    let metadata = {
      name: name,
      portrait: state.portrait,
      author: "",
      format: SAVE_PROTOCOL,
      appVersion: APP_VERSION,
    }

    let save = {
      metadata: metadata,
      statCategories: state.statCategories,
      portrait: state.portrait,
      customPortrait: state.customPortrait,
      physique: state.physique,
      attributes: state.attributes,
      skills: state.skills,
      artifacts: state.artifacts,
      abilities: state.abilities,
      aspects: state.aspects,
      buffs: Array.from(state.buffs),
      civils: state.civils,
      talents: Array.from(state.talents),
    }

    // save = JSON.stringify(save)

    let storage = window.localStorage.getItem("savedBuilds")

    if (storage) {
      let builds = JSON.parse(storage)
      builds.push(save)

      window.localStorage.setItem("savedBuilds", JSON.stringify(builds))
    }
    else {
      window.localStorage.setItem("savedBuilds", JSON.stringify([save]))
    }

    console.log(JSON.parse(window.localStorage.getItem("savedBuilds")))
  }

  changeOrigin(e) {
    let id = e.target.value
    let origin = miscData.origins[id]

    this.setState({
      origin: id,
      name: origin.name,
      physique: {
        race: origin.race,
        gender: origin.gender,
        lifeType: origin.lifeType,
      },
      portrait: (origin.forcedPortrait) ? origin.forcedPortrait : this.state.portrait
    })
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

    // debug
    window.localStorage.clear()

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

import './App.css';
import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import { Beforeunload, useBeforeunload } from 'react-beforeunload';
import { uuid } from 'uuidv4';
import { Base64 } from 'js-base64';

import * as utils from "./utils.js"
import { Game } from "./game.js"
import { MainInterface, AscensionPopup, Keywords } from "./components.js"
import { Popup, ContextMenu } from "./genericComponents.js"
import { Boosts } from "./statsDisplay.js"
import { SkillBook } from "./skillbook.js"
import { ArtifactsPopup } from "./artifacts.js"
import * as miscData from "./miscData.js"
import { ExportMenu } from './buildsDropdown';

const axios = require('axios').default;

const SAVE_PROTOCOL = 1
const APP_VERSION = {major: 0, minor: 0, revision: 0}
const APP_DATE = "16/11/2020" // european format
const URL_PROTOCOL = 0

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
      text: "", // wait what was this?

      id: uuid(),
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

  loadBuild(id, fullBuild=null) {
    let build;
    if (!fullBuild) {
      build = window.localStorage.getItem("savedBuilds")
      build = JSON.parse(build)[id]
    }
    else
      build = fullBuild

    if (!build)
      return;

    if (build.metadata.format != SAVE_PROTOCOL) {
      alert("This build is either invalid or was made for a different version of the app and cannot be loaded.")
      return;
    }

    console.log(build)

    this.setState({
      id: build.id,
      name: build.metadata.name,
      statCategories: build.statCategories,
      portrait: build.portrait,
      customPortrait: build.customPortrait,
      origin: build.origin,
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

  exportBuild() {
    this.setState({popup: "export"})
  }

  getSavedBuilds() {
    return JSON.parse(window.localStorage.getItem("savedBuilds"))
  }

  saveBuild() {
    let state = this.state

    let save = this.getCurrentBuild()

    // save = JSON.stringify(save)

    let storage = window.localStorage.getItem("savedBuilds")

    if (storage) {
      let builds = JSON.parse(storage)
      builds[save.id] = save

      window.localStorage.setItem("savedBuilds", JSON.stringify(builds))
    }
    else {
      let obj = {}
      obj[save.id] = save
      window.localStorage.setItem("savedBuilds", JSON.stringify(obj))
    }

    console.log(JSON.parse(window.localStorage.getItem("savedBuilds")))

    // save which build we were last using, so we can load it next time the app is opened
    window.localStorage.setItem("lastBuild", state.id)

    window.alert("Build saved. Saving also happens automatically when you close the tab.")
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
      "/Scripts/numerical_ids.json",
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
        game.numericalIDs = responses[4].data

        this.stats = game.getStats()

        // start rendering once all data is ready
        this.setState({ready: true})

        // check for corrupted save storage
        try {
          Object.keys(this.getSavedBuilds())
        }
        catch {
          window.localStorage.removeItem("savedBuilds")
        }

        // check if we're using a build url
        const urlParams = new URLSearchParams(window.location.search)
        let urlVersion = urlParams.get("urlv")
        if (urlVersion) {
          if (urlVersion != URL_PROTOCOL) {
            window.alert("You're trying to load a build using an older url format. Ask Pip to implement this already.")
          }
          else {
            try {
              this.loadBuild(null, this.decodeURLBuild(urlParams.get("build")))
            }
            catch {window.alert("The build in the URL could not be loaded.")}
          }
        }
        else {
          // load the last build the user was working on, if it exists
          let lastBuildId = window.localStorage.getItem("lastBuild")
          if (lastBuildId && lastBuildId in this.getSavedBuilds()) {
            console.log(this.getSavedBuilds()[lastBuildId])
            try {this.loadBuild(lastBuildId)}
            catch {window.alert("Your last build could not be loaded.")}
          }
        }
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

  getCurrentBuild(compressed=false) {
    let state = this.state
    let metadata = {
      name: state.name,
      portrait: state.portrait,
      author: "",
      format: SAVE_PROTOCOL,
      appVersion: APP_VERSION,
    }

    if (!compressed) {
      return {
        metadata: metadata,
        id: state.id,
        name: metadata.name,
        origin: state.origin,
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
    }
    else {
      let artifacts = []
      let skills = []
      for (let x in state.artifacts) {
        artifacts.push(game.numericalIDs.artifacts.indexOf(state.artifacts[x]))
      }
      for (let x in state.skills) {
        skills.push(game.numericalIDs.skills.indexOf(state.skills[x]))
      }

      // todo use a template for this or something
      return {
        metadata: metadata,
        id: state.id,
        name: metadata.name,
        origin: state.origin,
        statCategories: state.statCategories,
        portrait: state.portrait,
        customPortrait: state.customPortrait,
        physique: state.physique,
        attributes: state.attributes,
        skills: skills,
        artifacts: artifacts,
        abilities: state.abilities,
        aspects: state.aspects,
        buffs: Array.from(state.buffs),
        civils: state.civils,
        talents: Array.from(state.talents),
      }
    }
  }

  getBuildURL() {
    // note: this takes a str, don't pass the object itself
    console.log(Base64.encode(JSON.stringify(this.getCurrentBuild(true))).length)
    console.log(Base64.encode(JSON.stringify(this.getCurrentBuild(false))).length)

    let encoded = Base64.encode(JSON.stringify(this.getCurrentBuild(true)))

    return window.location.protocol + "//" + window.location.host + window.location.pathname + utils.format("?urlv={0}&build=", URL_PROTOCOL) + encoded
  }
  
  decodeURLBuild(url) {
    let build = JSON.parse(Base64.decode(url))
    
    // builds shared through url use numerical ids so we must convert them.
    for (let x in build.skills) {
      build.skills[x] = game.numericalIDs.skills[build.skills[x]]
    }
    for (let x in build.artifacts) {
      build.artifacts[x] = game.numericalIDs.artifacts[build.artifacts[x]]
    }

    return build;
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
        case "export": {popup = <ExportMenu app={this}/>}
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
        <Beforeunload onBeforeunload={()=>{this.saveBuild()}}>
          <div className="App" tabIndex={-1} style={{outline: "none"}} onKeyDown={(e)=>{this.handleKeyPress(e)}}>
            {contextMenu}
            {popup}
            <MainInterface app={this}/>
          </div>
        </Beforeunload>
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

import './App.css';
import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import { Beforeunload} from 'react-beforeunload';
import { uuid } from 'uuidv4';
import { Base64 } from 'js-base64';

import * as utils from "./utils.js"
import { Game } from "./game.js"
import { AscensionPopup, Keywords } from "./ascensionComponents.js"
import { Config, MainInterface, TextField } from "./components.js"
import { Popup, ContextMenu, Sidebar } from "./genericComponents.js"
import { Boosts } from "./statsDisplay.js"
import { SkillBook } from "./skillbook.js"
import { ArtifactsPopup } from "./artifacts.js"
import * as miscData from "./miscData.js"
import { ExportMenu, FeaturedBuilds } from './buildsDropdown';
import { clone } from 'underscore';
import { InstrumentsPopup } from './instruments';

const axios = require('axios').default;

const SAVE_PROTOCOL = 0
const APP_VERSION = {major: 0, minor: 9, revision: 0}
export const APP_DATE = "4th Dec 20"
export const MOD_VERSION = "Patch 87 (2nd Nov 20)"
const URL_PROTOCOL = 0
const RESOURCE_PREPPEND = "/ee2buildplanner"

class App extends React.Component {
  constructor() {
    super()
    this.state = { // todo more some stuff to lower components, like current tabs in popups
      ready: false,
      buildGallery: null,
      popup: null,
      sidebar: null,
      skillbookCategory: "Warrior",
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
      metadata: null, // metadata for builds loaded from file. not always present

      config: {
        highlightSkillKeywords: true,
        author: "",
        hasSeenSaveAlert: false,
        buildLevel: 21,
      },

      // should these be saved?
      statCategories: new Set(),
      buffs: new Set(),

      // stuff that is saved
      id: uuid(),
      name: "Custom Character",
      portrait: "human_m",
      customPortrait: null,
      origin: "custom",
      physique: {
        race: "human",
        gender: "male",
        lifeType: "alive",
      },
      instrument: null,
      // textarea text
      text:  `This is a text field. You can write whatever you want here.

================================

You can use this space to take notes, explain your build's usage, strengths/weaknesses, desired gear, etc.

There is no character limit and it will be saved when you save the build.`, 
      lw: false,
      role: "dps",
      weapons: {mainhand: "sword", offhand: "none"},

      skills: [], // todo make these sets
      artifacts: [],

      aspects: [],
      coreNodes: { // todo rework this to use numerical ids
        force: false,
        entropy: false,
        form: false,
        inertia: false,
        life: false,
      },

      attributes: { // naturally invested attrs
        str: 0,
        fin: 0,
        pwr: 0,
        con: 0,
        mem: 0,
        wits: 0,
      },

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
      
      civils: {
        thievery: 0,
        luckycharm: 0,
        bartering: 0,
        sneaking: 0,
        persuasion: 0,
        telekinesis: 0,
        loremaster: 0,
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

  changeLifeType(id) {
    let state = clone(this.state.physique)
    state.lifeType = id
    this.setState({physique: state})
  }

  relevantProps = ["skills", "artifacts", "aspects", "coreNodes", "attributes", "abilities", "civils", "talents", "lw", "physique", "origin", "buffs"]

  shouldComponentUpdate(nextProps, nextState) {
    let current = {}
    let newState = {}
    for (let x in this.relevantProps) {
      let prop = this.relevantProps[x]
      current[prop] = this.state[prop]
      newState[prop] = nextState[prop]
    }

    // only recalculate stats if a relevant state prop changes
    if (utils.propObjectHasChanged(current, newState)) {
      // we have to send the next state to this func, otherwise stat caluculations lag behing
      this.stats = game.getStats(nextState);
    }

    return true;
  }

  async toggleLoneWolf() {
    let newState = cloneDeep(this.state)
    newState.lw = !newState.lw
    let adjusted = false;
    if (newState.lw) {
      // check for overflowed attributes and abilities and fix them
      for (let x in this.state.attributes) {
        if (this.state.attributes[x] > miscData.maxNaturalAttributeInvestment / 2) {
          newState.attributes[x] = miscData.maxNaturalAttributeInvestment / 2
          adjusted = true;
        }
      }
      for (let x in this.state.abilities) {
        if (this.state.abilities[x] > 5 && x !== "Polymorph") {
          newState.abilities[x] = 5
          adjusted = true;
        }
      }
    }
    this.setState(newState)
    if (adjusted) {
      window.alert("Your attribute and ability investments have been adjusted to remove overflow from becoming Lone Wolf.")
    }
  }

  importBuild(f) {
    try {
      let build = JSON.parse(f)
      console.log(Object.keys(build.metadata).length)
      if (build.metadata.format !== SAVE_PROTOCOL)
        throw "";
      this.loadBuild(null, build, true)
    }
    catch {
      window.alert("The file you chose is not a valid build.")
    }
  }

  // get currentBuildChangesAreSaved() {
  //   return utils.propObjectHasChanged(this.getCurrentBuild())
  // }

  newBuild() {
    if (!window.confirm("Confirm whether you want to get a fresh build."))
      return
    let newBuild = cloneDeep(miscData.emptyBuild)
    newBuild.id = uuid()
    this.setState(newBuild)
  }

  exportBuild() {
    let save = this.getCurrentBuild()
    let json = JSON.stringify(save, null, 2);

    var FileSaver = require('file-saver');
    var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, utils.format("{0}.json", save.metadata.name));
  }

  // todo more error handling
  loadBuild(id, fullBuild=null, manual=false, forceNewId=false) {
    if (manual && !window.confirm("Load this build? Changes to your current one will be lost if unsaved."))
      return
    let build;
    if (!fullBuild) {
      build = window.localStorage.getItem("savedBuilds")
      build = JSON.parse(build)[id]
    }
    else
      build = fullBuild

    if (!build)
      return;

    if (build.metadata.format !== SAVE_PROTOCOL) {
      alert("This build is either invalid or was made for a different version of the app and cannot be loaded.")
      return;
    }

    console.log(build)

    this.setState({
      metadata: build.metadata,
      role: build.metadata.role,
      id: forceNewId ? uuid() : build.id,
      name: build.metadata.name,
      portrait: build.portrait,
      customPortrait: build.customPortrait,
      origin: build.origin,
      physique: build.physique,
      text: build.text,
      lw: build.lw,
      instrument: build.instrument,
      weapons: build.weapons,
      
      skills: build.skills,
      artifacts: build.artifacts,
      
      aspects: build.aspects,
      coreNodes: build.coreNodes,

      attributes: build.attributes,
      abilities: build.abilities,
      civils: build.civils,
      talents: new Set(build.talents),

      // remove popups/sidebar
      popup: null,
      sidebar: null,
    })
  }

  getSavedBuilds() {
    return JSON.parse(window.localStorage.getItem("savedBuilds"))
  }

  getFeaturedBuilds() {
    return this.state.buildGallery
  }

  saveConfig() {
    window.localStorage.setItem("config", JSON.stringify(this.state.config))
  }

  get currentBuildIsStored() {
    if (!window.localStorage.getItem("savedBuilds"))
      return false
    return Object.keys(JSON.parse(window.localStorage.getItem("savedBuilds"))).includes(this.state.id)
  }

  saveBuild(e, tabIsBeingClosed=false) {
    if (tabIsBeingClosed && !utils.hasKey(this.getSavedBuilds(), this.state.id)) {
      if (!window.confirm("Do you want to save this build before leaving?"))
        return
    }
    
    let save = this.getCurrentBuild()

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

    // save which build we were last using, so we can load it next time the app is opened
    window.localStorage.setItem("lastBuild", save.id)

    if (!tabIsBeingClosed) {
      this.forceUpdate()

      if (!this.state.config.hasSeenSaveAlert) {
        window.alert("Build saved. Saving also happens automatically for builds you've saved before when you close the tab.")
  
        let config = cloneDeep(this.state.config)
        config.hasSeenSaveAlert = true;
  
        this.setState({config: config})
      }
    }
    
    // return e.returnValue = "Aasdasd"
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
    
    if (typeof state[key] === "array") {
      if (state[key].includes(value))
        state[key] = state[key].filter((e)=>{return e !== value})
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
      RESOURCE_PREPPEND + "/Scripts/Artifacts/artifacts.json",
      RESOURCE_PREPPEND + "/Scripts/Ascension/ascension.json",
      RESOURCE_PREPPEND + "/Scripts/Skills/Output/skills.json",
      RESOURCE_PREPPEND + "/Scripts/Ascension/tsk_export.json",
      RESOURCE_PREPPEND + "/Scripts/numerical_ids.json",
    ]
    let promises = []

    for (let x = 0; x < requests.length; x++) {
      promises.push(axios.get(requests[x]))
    }
    
    axios.all(promises)
      .then(async function(responses) {
        game.artifacts = responses[0].data
        game.ascension.aspects = responses[1].data
        game.skills = responses[2].data
        game.ascension.specialStrings = responses[3].data
        game.ascension.app = this
        game.numericalIDs = responses[4].data

        this.stats = game.getStats()

        // check for corrupted save storage
        try {
          Object.keys(this.getSavedBuilds())
        }
        catch {
          window.localStorage.removeItem("savedBuilds")
        }

        // load config
        let savedConfig = window.localStorage.getItem("config")
        if (savedConfig)
          await this.setState({config: JSON.parse(savedConfig)})

        // load featured builds
        let buildPromises = []
        for (let x in miscData.featuredBuilds) {
          buildPromises.push(axios.get(RESOURCE_PREPPEND + "/BuildGallery/" + miscData.featuredBuilds[x] + ".json"))
        }
        axios.all(buildPromises)
          .then((answers) => {
            let map = {}
            answers.forEach((e, i) => {
              map[miscData.featuredBuilds[i]] = e.data 
            })
            game.app.setState({buildGallery: map})

            // check if we're using a build url
            const urlParams = new URLSearchParams(window.location.search)
            let url = urlParams.get("build")
            if (url) {
              if (miscData.featuredBuilds.includes(url)) {
                try {
                  this.loadBuild(null, this.getFeaturedBuilds()[url], false, true)
                }
                catch {
                  window.alert("The build from the URL could not be loaded.")
                }
              }
              else {
                window.alert("The build in the URL is not valid.")
              }
            }
            else {
              // load the last build the user was working on, if it exists
              let lastBuildId = window.localStorage.getItem("lastBuild")
              if (lastBuildId && utils.hasKey(this.getSavedBuilds(), lastBuildId)) {
                console.log(this.getSavedBuilds()[lastBuildId])
                try {this.loadBuild(lastBuildId)}
                catch {window.alert("Your last build could not be loaded.")}
              }
            }

            // start rendering once all data is ready
            this.setState({ready: true})
          })
          .catch(() => {window.alert("The build gallery did not load properly. Try refreshing or notify Pip.")})
      }.bind(this))
      .catch((error) => {
        alert("The app did not load properly. Try refreshing.")
        throw error;
    });
  }

  closePopupPanel() {this.setState({popup: null, sidebar: null})}

  secretProgress = 0
  handleKeyPress(e) {
    if (e.key === "Escape") {this.closePopupPanel()}
    else {
      if (e.key === miscData.secret.charAt(this.secretProgress)) {
        this.secretProgress++
        if (this.secretProgress >= miscData.secret.length) {
          this.setState({popup: "instrument"})
        }
      }
      else {
        this.secretProgress = e.key === miscData.secret.charAt(0) ? miscData.secret.charAt(0) : 0
      }
    }
  }

  // copy a featured build's link to clipboard
  copyBuildLink(featuredBuildId) {
    // jesus i hate web development sometimes
    let dummy = document.createElement("textarea")
    document.body.append(dummy)
    dummy.value = "https://pinewood.team/ee2buildplanner?build=" + featuredBuildId
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)

    window.alert("Link copied.")
  }

  getCurrentBuild(compressed=false) {
    let state = this.state
    let metadata = {
      name: state.name,
      portrait: state.portrait,
      author: state.metadata ? state.metadata.author : state.config.author,
      role: state.role,
      keywords: game.getKeywordIDsInBuild(),
      format: SAVE_PROTOCOL,
      appVersion: APP_VERSION,
    }
    let template = {
      metadata: metadata,

      id: state.id,
      name: metadata.name,
      portrait: state.portrait,
      customPortrait: state.customPortrait,
      origin: state.origin,
      physique: state.physique,
      text: state.text,
      lw: state.lw,
      intrument: state.instrument,
      weapons: state.weapons,
      
      skills: state.skills,
      artifacts: state.artifacts,
      
      aspects: state.aspects,
      coreNodes: state.coreNodes,

      attributes: state.attributes,
      abilities: state.abilities,
      civils: state.civils,
      talents: Array.from(state.talents),
    }

    if (!compressed) {
      return template;
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

      template.skills = skills;
      template.artifacts = artifacts;

      return template
    }
  }

  sidebar(element, position="left") {
    this.setState({sidebar: {element: element, position: position}})
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
        case "export": {popup = <ExportMenu app={this}/>; break}
        case "config": {popup = <Config app={this}/>; break;}
        case "instrument": {popup = <InstrumentsPopup app={this}/>; break;}
        default: {break}
      }

      if (this.state.popup != null) {
        popup = <Popup element={popup}/>
      }

      let contextMenu = null
      if (this.state.contextMenu && this.state.contextMenu.element != null) {
        contextMenu = <ContextMenu app={this}>{this.state.contextMenu.element}</ContextMenu>
      }

      let sidebar = null
      if (this.state.sidebar && this.state.sidebar.position) {
        sidebar = <Sidebar app={this} side={this.state.sidebar.position}>
          {this.state.sidebar.element}
        </Sidebar>
      }

      return (
        // tabindex is needed to catch key presses. Outline disables the ugly outline when the element is focused
        <Beforeunload onBeforeunload={(e)=>{this.saveConfig(); this.saveBuild(e, true)}}>
          <div className="App" tabIndex={-1} style={{outline: "none"}} onKeyDown={(e)=>{this.handleKeyPress(e)}}>
            {sidebar}
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

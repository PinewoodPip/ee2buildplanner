import logo from './logo.svg';
import './App.css';
import React from 'react';
import { MainInterface, SkillBook, Text, RightClickMenu, AscensionPopup } from "./components.js"
import * as miscData from "./miscData.js"
import update from 'immutability-helper';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const axios = require('axios').default;

// class for holding data and misc functions related to the EE game
class Game {
  skills = null
  artifacts = null
  races = miscData.races
  origins = {

  }

  ascension = new Ascension()
  images = {
    
  }
  mappings = miscData.idToImageMappings

  getImage(id) {
    if (id == "unknown" || id == null || id == undefined) {
      return this.images.icons["Action_Identify.png"].default
    }

    let file = id + ".png"
    if (Object.keys(this.images.icons).includes(file))
      return this.images.icons[file].default
    else {
      console.log("Missing icon: " + file)
      return null
    }
  }

  render() {this.app.forceUpdate()}
}

class Ascension {
  aspects;
  app;

  // get the json info of an aspect by id
  getReferenceById(id) {
    for (let x in this.aspects) {
      if (Object.keys(this.aspects[x]).includes(id))
        return this.aspects[x][id]
    }
    return null
  }

  getKeywordsInAspectBuild(asp) {
    let ref = this.getReferenceById(asp.id)

    let keywords = []
    for (let x in ref.nodes) {
      let node = ref.nodes[x]

      if (node.containedKeywords != undefined) {
        for (let z in node.containedKeywords) {
          let keyword = node.containedKeywords[z]
          if (!keywords.includes(keyword))
            keywords.push(keyword)
        }
      }
    }

    return keywords
  }

  // get an aspect from the user's build by id
  getBuildAspectById(id) {
    for (let x in this.app.state.aspects) {
      if (this.app.state.aspects[x].id == id)
        return this.app.state.aspects[x]
    }
    return null
  }

  // check if user has aspect in their build
  hasAspect(asp) {
    for (let x in this.app.state.aspects) {
      if (this.app.state.aspects[x].id == asp.id)
        return true
    }
    return false
  }

  // [cool ascension-related methods go here]
  getAspectReference(asp) {
    return this.aspects[asp.family][asp.id]
  }

  getAspect(asp) {
    let info = {}
    let ref = this.aspects[asp.family][asp.id]

    info.name = ref.name;
    info.nodesText = []
    // info.subNodeIndexes = []
    
    for (let x in asp.nodes) {
      let nodeSubIndex = asp.nodes[x]
      let node = {parent: null, subNode: null, subNodeIndex: null,}
      
      node.parent = ref.nodesText[x].parent

      node.subNode = ref.nodesText[x].subNodes[nodeSubIndex]
      node.subNodeIndex = nodeSubIndex

      info.nodesText.push(node)
    }

    return info;
  }

  // this is too messy
  changeSubNode(asp, node, newSub, mode="edit") {
    let index = this.app.state.aspects.indexOf(asp)

    if (mode == "edit") {
      var cloneDeep = require('lodash.clonedeep');
      let state = cloneDeep(this.app.state.aspects)

      state[index].nodes[node] = newSub

      this.app.setState({aspects: state})
    }
    else if (mode == "preview-edit") {
      var cloneDeep = require('lodash.clonedeep');
      let state = cloneDeep(this.app.state.currentlyViewedAspect)

      state.nodes[node] = newSub

      this.app.setState({currentlyViewedAspect: state})
    }
  }

  getAspectElement(asp, interactive=false, mode="edit") {
    if (asp.id == null)
      return null;

    // if user ahs this aspect, override behaviour so edits done to the asp in the popup are reflected in the build
    if (game.ascension.hasAspect(asp)) {
      mode = "edit";
      asp = game.ascension.getBuildAspectById(asp.id)
    }

		let tooltip = []
		let nasp = game.ascension.getAspect(asp)

		tooltip.push(<div className="aspect-name-bg"><Text key={Math.random()} className="" text={nasp.name}/>
      </div>)

		for (let x in nasp.nodesText) {
      let parentIndex = (parseInt(x)+1)
      let subIndex = (parseInt(nasp.nodesText[x].subNodeIndex)+1)
      let parentText = `Node ${parentIndex}: ${nasp.nodesText[x].parent}`

      let subNodeText;
      if (nasp.nodesText[x].subNodeIndex != null) {
        subNodeText = `Node ${parentIndex}.${subIndex}: ${nasp.nodesText[x].subNode}`
      }
      else {
        subNodeText = `Node ${parentIndex}.X: Any`
      }

      tooltip.push(<hr/>)
      
      if (interactive) {
        let id = Math.random()

        tooltip.push(
          <ContextMenuTrigger id={id}>
            <Text key={Math.random()} text={parentText}/>
            <Text key={Math.random()} text={subNodeText}/>
          </ContextMenuTrigger>)

        let subNodeOptions = []
        let ref = game.ascension.getAspectReference(asp)

        // header
        subNodeOptions.push(<Text className="context-header" text={"Choose a subnode:"}/>)

        // "any" option
        subNodeOptions.push(<div className="context-option" onClick={() => {this.changeSubNode(asp, x, null, mode)}}>
        <Text text={"Any"}/>
      </div>)

        for (let z in ref.nodesText[x].subNodes) {
          subNodeOptions.push(
            <div className="context-option" onClick={() => {this.changeSubNode(asp, x, z, mode)}}>
              <Text text={ref.nodesText[x].subNodes[z]}/>
            </div>)
          
          // subNodeOptions.push(<hr/>)
        }

        tooltip.push(
          <RightClickMenu id={id}>
            {subNodeOptions}
          </RightClickMenu>)
      }
      else {
        tooltip.push(<Text key={Math.random()} text={parentText}/>)
			  tooltip.push(<Text key={Math.random()} text={subNodeText}/>)
      }
		}

		return <div style={{position: "relative"}}>
			{tooltip}
		</div>;
	}
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      ready: false,
      popup: "ascension",
      skillbookCategory: "Air",
      selectedAspect: null,
      currentFamily: "force",
      currentlyViewedAspect: {family: null, id: null, nodes: []},

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

  componentDidMount() {
    game.app = this;

    // load game data
    let requests = [
      "/Scripts/Artifacts/artifacts.json",
      "/Scripts/Ascension/ascension.json",
      "/Scripts/Skills/Output/skills.json",
    ]
    let promises = []

    game.images.icons = {
      ...importAll(require.context("./images/skills", false, /\.(gif|jpe?g|svg|png)$/)),
      ...importAll(require.context("./images/keywords", false, /\.(gif|jpe?g|svg|png)$/))
    }

    for (let x = 0; x < requests.length; x++) {
      promises.push(axios.get(requests[x]))
    }
    
    axios.all(promises)
      .then(function(responses) {
        game.artifacts = responses[0].data
        game.ascension.aspects = responses[1].data
        game.skills = responses[2].data
        game.ascension.app = this

        this.setState({ready: true})
      }.bind(this))
      .catch((error) => {
        throw error;
    });
  }

  closePopupPanel() {this.setState({popup: null})}

  render() {
    // only start rendering once all data has been fetched
    if (this.state.ready) {

      let popups = {
        "skillbook": <SkillBook app={this}/>,
        "ascension": <AscensionPopup app={this}/>
      }
      let popup = null
      if (this.state.popup != null) {
        popup = <Popup element={popups[this.state.popup]}/>
      }

      return (
        <div className="App">
          {popup}
          <MainInterface app={this}/>
        </div>
      );
    }
    else {
      return <div/>
    }
  }
}

function Popup(props) {
  return (
    <div className="popup-cover">
      <div className="pop-up-parent">
        {props.element}
      </div>
    </div>
  )
}

export var game = new Game()

export default App;

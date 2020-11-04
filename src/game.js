import './App.css';
import React from 'react';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { cloneDeep } from "lodash"

import { MainInterface, SkillBook, Text, AscensionPopup, Embodiments } from "./components.js"
import { ContextMenu } from "./genericComponents.js"
import * as miscData from "./miscData.js"
import { game } from "./App.js" // how does this not cause any problems...
import * as utils from "./utils.js"

// class for holding data and misc functions related to the EE game
export class Game {
  skills = null
  artifacts = null
  races = miscData.races
  origins = miscData.origins

  ascension = new Ascension()
  images = {
    
  }
  mappings = miscData.mappings

  getStats() {
    function addStat(id, amount) {
      if (utils.hasKey(stats, id)) {
        stats[id] += amount
      }
      else {
        stats[id] = amount
      }
    }
    let stats = {}
    for (let x in this.app.state.aspects) {
      let asp = this.ascension.getReferenceById(this.app.state.aspects[x].id)
      let build = this.app.state.aspects[x].nodes

      for (let z in asp.nodes) {
        for (let v in asp.nodes[z].parent) {
          let parentBoost = asp.nodes[z].parent[v]
          addStat(parentBoost.id, parentBoost.value)
        }
        for (let v in asp.nodes[z].subNodes[build[z]]) {
          let subNodeBoost = asp.nodes[z].subNodes[build[z]][v]
          console.log(subNodeBoost)
          addStat(subNodeBoost.id, subNodeBoost.value)
        }
      }

      return stats;
    }
  }

  render() {this.app.forceUpdate()}
}

// class for methods related to ascension mechanics. also holds all aspect data
export class Ascension {
  aspects;
  app;

  // whether the current build meets all requirements
  get meetsRequirements() {
    let reqs = this.getTotalRequirements()
    let rews = this.getTotalRewards()

    for (let x in reqs) {
      if (rews[x] < reqs[x])
        return false
    }

    return true
  }

  async removeAspect(e, id) {
    let asp = this.getBuildAspectById(id)
    let state = cloneDeep(this.app.state.aspects)

    state = state.filter((x)=>{return x.id != asp.id})

    await this.app.closeContext()
    this.app.setState({aspects: state})
  }

  async moveAspect(e, id, movement) {
    let asp = this.getBuildAspectById(id)
    let state = cloneDeep(this.app.state.aspects)
    let index = this.app.state.aspects.indexOf(asp) + movement
    state = state.filter((x)=>{return x.id != asp.id})

    state.splice(index, 0, asp)

    await this.app.closeContext()
    this.app.setState({aspects: state})
  }

  // get requirements of chosen aspects
  getTotalRequirements() {
    let asps = []
    let reqs = {
      force: 0,
      entropy: 0,
      form: 0,
      inertia: 0,
      life: 0,
    }

    for (let x in this.app.state.aspects) {
      asps.push(this.getReferenceById(this.app.state.aspects[x].id))
    }

    for (let x in asps) {
      for (let z in asps[x].requirements) {
        let amount = asps[x].requirements[z]
        if (amount > reqs[z])
          reqs[z] = amount
      }
    }

    return reqs;
  }

  // get rewards of chosen aspects
  // todo: bonus embs from stat boosts
  getTotalRewards() {
    let asps = []
    let rews = {
      force: 0,
      entropy: 0,
      form: 0,
      inertia: 0,
      life: 0,
    }

    for (let x in this.app.state.aspects) {
      asps.push(this.getReferenceById(this.app.state.aspects[x].id))
    }

    for (let x in asps) {
      for (let z in asps[x].rewards) {
        let amount = asps[x].rewards[z]
        rews[z] += amount
      }
    }

    return rews;
  }

  getRequirements(id) {
    return this.getReferenceById(id).requirements;
  }

  getRewards(id) {
    return this.getReferenceById(id).rewards;
  }

  // get the json info of an aspect by id
  getReferenceById(id) {
    for (let x in this.aspects) {
      if (Object.keys(this.aspects[x]).includes(id))
        return this.aspects[x][id]
    }
    return null
  }

  // get all keywords of an aspect, as well as the keywords the user gets from their chosen subnodes
  getKeywordsInAspectBuild(asp) {
    let ref = this.getReferenceById(asp.id)

    let keywords = [] // all keywords that this aspect can offer
    let keywordsInBuild = [] // keywords contained in the subnodes the user has chosen

    // go through all the nodes of this aspect and find keywords
    for (let x in ref.nodes) {
      let node = ref.nodes[x]

      let subNode = node.subNodes[asp.nodes[x]]

      // iterate through stat boosts and look for certain ones which give keyword activators/mutators
      for (let z in subNode) {
        let subNodeStat = subNode[z]

        // if this node has a statBoost capable of giving a keyword, check if it does and add it
        if ((miscData.boostsWithKeywords.includes(subNodeStat.type)) && subNodeStat.keyword != null) {
          keywordsInBuild.push(subNodeStat.keyword)
        }

        // if this node references multiple keywords (only a few do), add them
        if (utils.hasKey(miscData.nodesWithExtraKeywords, subNodeStat.id)) {
          for (let v in miscData.nodesWithExtraKeywords[subNodeStat.id]) {
            keywordsInBuild.push(miscData.nodesWithExtraKeywords[subNodeStat.id][v])
          }
        }
      }

      // node.containedKeywords specifies which keywords are contained in each node (not each subnode) by Amer. We use that to get a list of all the keywords an aspect offers
      if (node.containedKeywords != undefined) {
        for (let z in node.containedKeywords) {
          let keyword = node.containedKeywords[z].replace(" ", "")
          if (!keywords.includes(keyword))
            keywords.push(keyword)
        }
      }
    }

    return {allKeywords: keywords, keywordsGotten: keywordsInBuild}
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

  // get the data realted to an aspect, from ascension.json
  getAspectReference(asp) {
    return this.aspects[asp.family][asp.id]
  }

  // get an object with the text of an aspect based on user subnode choices
  getAspectText(asp) {
    let info = {}
    let ref = this.getReferenceById(asp.id)

    info.name = ref.name;
    info.nodesText = []
    
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

  // change the subnode of an aspect
  changeSubNode(asp, node, newSubNode, mode="edit") {
    let index = this.app.state.aspects.indexOf(asp)

    // edits an aspect in the current build
    if (mode == "edit") {
      let state = cloneDeep(this.app.state.aspects)

      state[index].nodes[node] = newSubNode

      this.app.setState({aspects: state})
    }
    // edits an aspect in the Ascension popup/preview
    else if (mode == "preview-edit") {
      let state = cloneDeep(this.app.state.currentlyViewedAspect)

      state.nodes[node] = newSubNode

      this.app.setState({currentlyViewedAspect: state})
    }

    this.app.closeContext()
  }

  // todo cleanup
  getAspectElement(asp, interactive=false, mode="edit", skipEmptyEmbs=true) {
    // quit if asp is invalid. this can happen when the user removes an aspect they're viewing
    if (asp == undefined || asp.id == null)
      return null;

    // if user has this aspect, override behaviour so edits done to the asp in the popup are reflected in the build
    if (game.ascension.hasAspect(asp)) {
      mode = "edit";
      asp = game.ascension.getBuildAspectById(asp.id)
    }

		let tooltip = []
		let nasp = game.ascension.getAspectText(asp)

    // sticky header containing name and embodiment info
		tooltip.push(<div className="aspect-name-bg">
        <Text key={Math.random()} className="" text={nasp.name}/>

        <div className="flexbox-horizontal flex-align-centered">
          <Text text="Reqs:"/>
          <Embodiments key={Math.random()} skipEmpty={skipEmptyEmbs} amounts={game.ascension.getRequirements(asp.id)}/>
        </div>
        <div className="flexbox-horizontal flex-align-centered">
          <Text text="Rewards:"/>
          <Embodiments key={Math.random()} skipEmpty={skipEmptyEmbs} amounts={game.ascension.getRewards(asp.id)}/>
        </div>
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

        let subNodeOptions = []
        let ref = game.ascension.getAspectReference(asp)

        // header
        subNodeOptions.push(<Text notInteractable={true} className="context-header" text={"Choose a subnode:"}/>)

        // "any" option
        subNodeOptions.push(<div onClick={() => {this.changeSubNode(asp, x, null, mode)}}>
        <Text text={"Any"}/>
      </div>)

        for (let z in ref.nodesText[x].subNodes) {
          subNodeOptions.push(
            <div onClick={() => {this.changeSubNode(asp, x, z, mode)}}>
              <Text text={ref.nodesText[x].subNodes[z]}/>
            </div>)
          
          // subNodeOptions.push(<hr/>)
        }

        let menu = subNodeOptions
        tooltip.push(
          <div onContextMenu={(e)=>{this.app.contextMenu(menu, e)}}>
            <Text key={Math.random()} text={parentText}/>
            <Text key={Math.random()} text={subNodeText}/>
          </div>)
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
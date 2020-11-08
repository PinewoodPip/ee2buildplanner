import './App.css';
import React from 'react';
import { cloneDeep } from "lodash"

import { Embodiments } from "./components.js"
import { Text } from "./genericComponents.js"
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

  get totalAttributePointsSpent() {
    let amount = 0
    for (let x in this.app.state.attributes) {
      amount += this.app.state.attributes[x]
    }
    return amount
  }

  changeCivil(id, increment) {
    let state = cloneDeep(this.app.state.civils)
    let civil = state[id]
    if (civil + increment > 10)
      state[id] = 10
    else if (civil + increment < 0)
      state[id] = 0
    else
      state[id] = civil + increment
    this.app.setState({civils: state})
  }

  toggleBuff(id) {
    let state = cloneDeep(this.app.state.buffs)
    if (state.has(id))
      state.delete(id)
    else
      state.add(id)
    
    this.app.setState({buffs: state}, game.render.bind(game)) // todo we should maybe look into this instead of using a hack
  }

  getArtifact(id) {
    let info = cloneDeep(game.artifacts[id])
    if (utils.hasKey(miscData.artifactBoosts, id))
      info.boosts = miscData.artifactBoosts[id]
    else
      info.boosts = {}

    return info;
  }

  addArtifact(id) {
    let state = cloneDeep(this.app.state.artifacts)
    if (!state.includes(id))
      state.push(id)
    this.app.setState({artifacts: state})
  }

  removeArtifact(id) {
    let state = cloneDeep(this.app.state.artifacts)
    state = state.filter((x)=>{return x !== id})
    this.app.setState({artifacts: state})
  }

  // todo redo these; changing the state so many times lags a lot.
  async maximizeAttribute(id) {
    let amount = this.totalAttributePointsSpent
    while (amount < miscData.playerAttributes) {
      await this.changeAttribute(id, 1)
      amount++;
    }
  }

  async minimizeAttribute(id) {
    let amount = game.app.state.attributes[id]
    while (amount > 0) {
      await this.changeAttribute(id, -1)
      amount--;
    }
  }

  async changeAttribute(id, increment) {
    let attrs = cloneDeep(this.app.state.attributes)

    let attr = attrs[id]

    if (attr + increment < 0)
      return
    if (this.totalAttributePointsSpent + increment > miscData.playerAttributes)
      return;
    if (attr + increment > miscData.maxNaturalAttributeInvestment)
      return;

    attrs[id] += increment

    await this.app.setState({attributes: attrs})
  }

  getStats() {
    function addStat(stat) {
      if (utils.hasKey(stats[stat.type], stat.id)) {
        stats[stat.type][stat.id].amount += stat.value
        stats[stat.type][stat.id].refString = stat.string
      }
      else {
        stats[stat.type][stat.id] = {type: stat.type, amount: stat.value, id: stat.id, refString: stat.string}
      }
    }

    let stats = {}
    let keywords = {}

    // default stats
    for (let x in miscData.stats) {
      let type = miscData.stats[x]
      stats[x] = {}
      if (x !== "realStats") {
        for (let z in type) {
          let stat = type[z]

          let defaultAmount = (stat.default != null) ? stat.default : 0

          stats[x][z] = {type: x, amount: defaultAmount, id: z}
        }
      }
    }

    // if a stat is defined to contain a keyword, add it to a list of this build's keywords
    function tryToAddKeyword(node) {
      if ("keywords" in node) {
        node.keywords.forEach(keywordObj => {
          utils.tryToPush(keywords, keywordObj.keyword, {id: node.id, type: node.type, keyword: keywordObj.keyword, keywordBoon: keywordObj.keywordBoon, refString: node.string})
        })
      }
      else if (utils.hasKey(node, "keyword")) {
        if (utils.hasKey(keywords, node.keyword)) {
          keywords[node.keyword].push({id: node.id, type: node.type, keyword: node.keyword, keywordBoon: node.keywordBoon, refString: node.string})
        }
        else {
          keywords[node.keyword] = [{id: node.id, type: node.type, keyword: node.keyword, keywordBoon: node.keywordBoon, refString: node.string}]
        }
      }
    }

    for (let x in this.app.state.aspects) {
      let asp = this.ascension.getReferenceById(this.app.state.aspects[x].id)
      let build = this.app.state.aspects[x].nodes

      for (let z in asp.nodes) {
        for (let v in asp.nodes[z].parent) {
          let parentBoost = asp.nodes[z].parent[v]
          addStat(parentBoost)
          tryToAddKeyword(parentBoost)
        }
        for (let v in asp.nodes[z].subNodes[build[z]]) {
          let subNodeBoost = asp.nodes[z].subNodes[build[z]][v]
          addStat(subNodeBoost)
          tryToAddKeyword(subNodeBoost)
        }
      }
    }

    // artifact innate stat boosts
    this.app.state.artifacts.forEach(element => {
      let boosts = miscData.artifactBoosts[element]
      if (boosts && "innate" in boosts) {
        boosts.innate.forEach(e => {
          addStat(e)
          tryToAddKeyword(e)
        })
      }
    })

    // status effect boosts
    this.app.state.buffs.forEach(id => {
      let data = miscData.statuses[id]
      if (data.type !== "special") {
        data.boosts.forEach(e => {
          addStat(e)
          // these cannot contain keywords
        })
      }
    })

    // cache
    this.app.keywords = keywords

    return this.getRealStats(stats);
  }

  // get a string display of a stat
  // todo clean up
  getDisplayString(stat) {
    let displayString;
    let isArtifact = stat.id.search("PIP_Artifact_") > -1

    // check if this stat has a defined subtype and string in miscData
    if (utils.hasKey(miscData.stats, stat.type) && utils.hasKey(miscData.stats[stat.type], stat.id) || (stat.type === "specialLogic" || stat.type === "statusExtension") && !isArtifact) {

      // if this stat is of the specialLogic type, the string for it is handled differently; since specialLogics tend to represent boolean powers
      if (stat.type === "specialLogic" || stat.type === "statusExtension") {
        let statDisplay = miscData.stats.[stat.type][stat.id]

        
        if (statDisplay && statDisplay.strings != undefined)
        // if this specialLogic has defined strings for on/off, use those
          displayString = statDisplay.strings[Math.min(stat.amount, statDisplay.strings.length-1)]
        else if (stat.amount > 0) {
          // otherwise use the game's description for it.
          displayString = game.ascension.specialStrings[stat.refString]
        }
        else {
          // we don't have this specialLogic - preppend a "FALSE"
          displayString = "FALSE: " + game.ascension.specialStrings[stat.refString]
        }
      }
      else
        displayString = utils.format(miscData.stats[stat.type][stat.id].display, stat.amount)
    }
    // otherwise use a placeholder
    else {
      if (stat.id.search("PIP_Artifact") > -1) {
        let desc = stat.id.replace("PIP_Artifact_", "").toLowerCase()
        displayString = game.artifacts[desc].description
      }
      else
        displayString = utils.format("UNDEFINED STAT {0}: {1}", stat.id, stat.amount)
    }

    return displayString
  }

  getRealStats(stats) {

    // calculate real, absolute amounts of stats

    // artifact special toggleable effects
    this.app.state.buffs.forEach(id => {
      let data = miscData.statuses[id]
      if (data.type == "special") {
        switch(data.id) {
          case "PIP_Artifact_DrogsLuck": {
            let investmentBonus = 15 + (2 * stats.flexStat.FireSpecialist.amount) + (4 * game.app.state.civils.luckycharm)

            stats.extendedStat.PercAttributeIncrease_Intelligence.amount += investmentBonus
            stats.extendedStat.PercAttributeIncrease_Wits.amount += investmentBonus
          }
        }
      }
    })

    let realStr = (
      stats["flexStat"]["STRENGTH"].amount + game.app.state.attributes.str +
      (stats["flexStat"]["STRENGTH"].amount + game.app.state.attributes.str - 10)*(stats["extendedStat"].PercAttributeIncrease_Strength.amount/100))

    let realFin = (
      stats["flexStat"]["FINESSE"].amount + game.app.state.attributes.fin +
      (stats["flexStat"]["FINESSE"].amount + game.app.state.attributes.fin - 10)*(stats["extendedStat"].PercAttributeIncrease_Finesse.amount/100))

    let realInt = (
      stats["flexStat"]["INTELLIGENCE"].amount + game.app.state.attributes.pwr +
      (stats["flexStat"]["INTELLIGENCE"].amount + game.app.state.attributes.pwr - 10)*(stats["extendedStat"].PercAttributeIncrease_Intelligence.amount/100))

    let realCon = (
      stats["flexStat"]["CONSTITUTION"].amount + game.app.state.attributes.con +
      (stats["flexStat"]["CONSTITUTION"].amount + game.app.state.attributes.con - 10)*(stats["extendedStat"].PercAttributeIncrease_Constitution.amount/100))

    let realMem = (
      stats["flexStat"]["MEMORY"].amount + game.app.state.attributes.mem +
      (stats["flexStat"]["MEMORY"].amount + game.app.state.attributes.mem - 10)*(stats["extendedStat"].PercAttributeIncrease_Memory.amount/100))

    let realWits = (
      stats["flexStat"]["WITS"].amount + game.app.state.attributes.wits +
      (stats["flexStat"]["WITS"].amount + game.app.state.attributes.wits - 10)*(stats["extendedStat"].PercAttributeIncrease_Wits.amount/100))

    stats.realStats["str"] = {type: "realStats", id: "str", amount: realStr}
    stats.realStats["fin"] = {type: "realStats", id: "fin", amount: realFin}
    stats.realStats["pwr"] = {type: "realStats", id: "pwr", amount: realInt}
    stats.realStats["con"] = {type: "realStats", id: "con", amount: realCon}
    stats.realStats["mem"] = {type: "realStats", id: "mem", amount: realMem}
    stats.realStats["wits"] = {type: "realStats", id: "wits", amount: realWits}

    // resistances
    let realResPhys = (
      stats.flexStat.PHYSICALRESISTANCE.amount + stats.flexStat.AllResistance.amount
    )
    let realResPierce = (
      stats.flexStat.PIERCINGRESISTANCE.amount + stats.flexStat.AllResistance.amount
    )
    let realResFire = (
      stats.flexStat.FIRERESISTANCE.amount + stats.flexStat.EleResistance.amount + stats.flexStat.AllResistance.amount
    )
    let realResEarth = (
      stats.flexStat.EARTHRESISTANCE.amount + stats.flexStat.EleResistance.amount + stats.flexStat.AllResistance.amount
    )
    let realResPoison = (
      stats.flexStat.POISONRESISTANCE.amount + stats.flexStat.EleResistance.amount + stats.flexStat.AllResistance.amount
    )
    let realResWater = (
      stats.flexStat.WATERRESISTANCE.amount + stats.flexStat.EleResistance.amount + stats.flexStat.AllResistance.amount
    )
    let realResAir = (
      stats.flexStat.AIRRESISTANCE.amount + stats.flexStat.EleResistance.amount + stats.flexStat.AllResistance.amount
    )

    stats.realStats["res_physical"] = {type: "realStats", id: "res_physical", amount: this.applyDR(realResPhys)}
    stats.realStats["res_piercing"] = {type: "realStats", id: "res_piercing", amount: this.applyDR(realResPierce)}
    stats.realStats["res_fire"] = {type: "realStats", id: "res_fire", amount: this.applyDR(realResFire)}
    stats.realStats["res_water"] = {type: "realStats", id: "res_water", amount: this.applyDR(realResWater)}
    stats.realStats["res_earth"] = {type: "realStats", id: "res_earth", amount: this.applyDR(realResEarth)}
    stats.realStats["res_poison"] = {type: "realStats", id: "res_poison", amount: this.applyDR(realResPoison)}
    stats.realStats["res_air"] = {type: "realStats", id: "res_air", amount: this.applyDR(realResAir)}

    return stats
  }

  // apply diminishing returns; used for resistances in the game, if the setting is on
  applyDR(statAmount) {
    if (!this.app.state.DR)
      return statAmount

    let effectivenessReduction = statAmount / (statAmount + this.app.state.DRAmount)
    return utils.round(statAmount * (1 - effectivenessReduction), this.app.state.rounding)
  }

  render() {this.app.forceUpdate()}
}

// class for methods related to ascension mechanics. also holds all aspect data
export class Ascension {
  aspects;
  specialStrings; // strings related to specialLogic stat boosts
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

  // remove an aspect from the build
  async removeAspect(e, id) {
    let asp = this.getBuildAspectById(id)
    let state = cloneDeep(this.app.state.aspects)

    state = state.filter((x)=>{return x.id != asp.id})

    await this.app.closeContext()
    this.app.setState({aspects: state})
  }

  // move aspect up/down in the list
  async moveAspect(e, id, movement) {
    let asp = this.getBuildAspectById(id)
    let state = cloneDeep(this.app.state.aspects)
    let index = this.app.state.aspects.indexOf(asp) + movement
    state = state.filter((x)=>{return x.id != asp.id})

    state.splice(index, 0, asp)

    await this.app.closeContext()
    this.app.setState({aspects: state})
  }

  // get requirements of chosen aspects. for each emb this will be the highest amount ever required
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

  // get rewards of chosen aspects. this factors in embodiments granted by stat boosts - these are found in the "second tier" of aspects, in their second nodes.
  getTotalRewards() {
    let asps = []
    let stats = game.getStats()
    let rews = {
      force: stats.embodimentReward.Force.amount,
      entropy: stats.embodimentReward.Entropy.amount,
      form: stats.embodimentReward.Form.amount,
      inertia: stats.embodimentReward.Inertia.amount,
      life: stats.embodimentReward.Life.amount,
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

  getRequirements(id) { // get reqs of an aspect by id
    return this.getReferenceById(id).requirements;
  }

  getRewards(id) { // get rewards of an aspect by id
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

        // if this node references multiple keywords (only a few do), add them. These are manually defined in miscData
        if (utils.hasKey(miscData.nodesWithExtraKeywords, subNodeStat.id)) {
          for (let v in miscData.nodesWithExtraKeywords[subNodeStat.id]) {
            keywordsInBuild.push(miscData.nodesWithExtraKeywords[subNodeStat.id][v])
          }
        }
      }

      // node.containedKeywords specifies which keywords are contained in each node (not each subnode) by Amer. We use that to get a list of all the keywords an aspect offers
      // todo redo this. This is sometimes "inaccurate" because Amer includes +free reaction nodes.
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
      if (this.app.state.aspects[x].id === id)
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
		tooltip.push(<div className="aspect-name-bg" key={"header"}>
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

      tooltip.push(<hr key={Math.random()}/>)
      
      if (interactive) {
        let subNodeOptions = []
        let ref = game.ascension.getAspectReference(asp)

        // header
        subNodeOptions.push(<Text key="header" notInteractable={true} className="context-header" text={"Choose a subnode:"}/>)

        // "any" option
        subNodeOptions.push(<div key={x} onClick={() => {this.changeSubNode(asp, x, null, mode)}}>
        <Text text={"Any"}/>
      </div>)

        for (let z in ref.nodesText[x].subNodes) {
          subNodeOptions.push(
            <div key={z} onClick={() => {this.changeSubNode(asp, x, z, mode)}}>
              <Text text={ref.nodesText[x].subNodes[z]}/>
            </div>)
        }

        let menu = subNodeOptions
        tooltip.push(
          <div key={x} onContextMenu={(e)=>{this.app.contextMenu(menu, e)}}>
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
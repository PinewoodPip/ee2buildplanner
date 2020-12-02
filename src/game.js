import './App.css';
import React from 'react';
import { cloneDeep } from "lodash"

import { Embodiments } from "./ascensionComponents.js"
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
  numericalIDs;

  ascension = new Ascension()
  images = {
    
  }
  mappings = miscData.mappings

  get aboveNaturalAbilityCap() {
    return this.investedAbilities > this.maxNaturalAbilityPoints
  }

  get maxNaturalAbilityPoints() {return (
    2 + // starting points
    (1 * 21) + // per-level points
    (this.app.state.talents.has("allSkilledUp") ? 3 : 0) // All Skilled Up talent grants 3 extra points.
  )}

  get investedAbilities() {
    let count = 0
    for (let x in this.app.state.abilities) {
      count += this.app.state.abilities[x]
    }
    return count;
  }

  changeAbility(id, increment) {
    let state = cloneDeep(this.app.state.abilities)
    let maximum = this.app.state.lw ? 5 : 10
    state[id] += increment
    state[id] = utils.limitRange(state[id], 0, maximum)

    this.app.setState({abilities: state})
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

  get maxNaturalAttributePoints() {
    let amount = miscData.playerAttributes
    amount += this.app.state.talents.has("biggerAndBetter") ? 5 : 0
    amount += this.app.state.abilities.Polymorph
    return amount;
  }

  get totalAttributePointsSpent() {
    let amount = 0
    for (let x in this.app.state.attributes) {
      amount += this.app.state.attributes[x]
    }
    return amount
  }

  // get amount of ascension points the build uses. If the last X nodes of an aspect are set to 'any', they are ignored for this count.
  get nodeCount() {
    let count = 0
    for (let x in this.app.state.aspects) {
      let nodes = cloneDeep(this.app.state.aspects[x].nodes)
      nodes.reverse()
      let countNulls = false
      for (let z in nodes) {
        if (nodes[z] != null)
          countNulls = true
        if (nodes[z] != null || countNulls) {
          count++
        }
      }
    }
    return count
  }

  get maxAscensionPoints() {
    return 5 + this.app.state.config.buildLevel
  }

  async changeAttribute(id, increment) {
    let attrs = cloneDeep(this.app.state.attributes)
    let maxInvestment = miscData.maxNaturalAttributeInvestment
    if (this.app.state.lw)
      maxInvestment /= 2

    let attr = attrs[id]

    if (attr + increment < 0)
      return
    
    // don't restrict point retrievement if we're in the negatives (happens when you remove the bigger and better talent)
    if (this.maxNaturalAttributePoints - this.totalAttributePointsSpent > 0 || increment > 0) {
      if (this.totalAttributePointsSpent + increment > this.maxNaturalAttributePoints)
        return;
      if (attr + increment > maxInvestment)
        return;
    }

    attrs[id] += increment

    await this.app.setState({attributes: attrs})
  }

  maximizeAttribute(id) {
    let state = cloneDeep(this.app.state.attributes)

    let max = this.app.state.lw ? miscData.maxNaturalAttributeInvestment/2 : miscData.maxNaturalAttributeInvestment

    let pointsLeft = Math.max(this.maxNaturalAttributePoints - this.totalAttributePointsSpent, 0)

    let points = utils.limitRange(state[id] + pointsLeft, 0, max)

    state[id] = points

    this.app.setState({attributes: state, contextMenu: null})
  }

  async minimizeAttribute(id) {
    let state = cloneDeep(this.app.state.attributes)
    state[id] = 0

    this.app.setState({attributes: state, contextMenu: null})
  }

  attributeIsMaxed(id) {
    let cap = this.app.state.lw ? 15 : 30
    return this.app.state.attributes[id] >= cap
  }

  getStats(nextState=null) {
    // use the param state object if one is provided, else fallback to current state. The point of this is to pass the next state from App.shouldComponentUpdate() so stats can be recalculated BEFORE components are re-rendered, avoiding the issue of certain stat calculations falling behind.
    let state = nextState ? nextState : this.app.state

    function addStat(stat) {
      if (utils.hasKey(stats[stat.type], stat.id)) {
        // stat total
        stats[stat.type][stat.id].amount += stat.value

        if (stats[stat.type][stat.id].sources == undefined) // eslint-disable-line
          stats[stat.type][stat.id].sources = {}

        // per-source tracking
        if (stat.source != null)
          stats[stat.type][stat.id].sources[stat.source] += stat.value
        else
          stats[stat.type][stat.id].sources["Unknown"] += stat.value

        stats[stat.type][stat.id].refString = stat.string
      }
      else {
        stats[stat.type][stat.id] = {type: stat.type, amount: stat.value, id: stat.id, refString: stat.string, sources: {}}

        if (stat.source != null)
          stats[stat.type][stat.id].sources[stat.source] = stat.value
        else
          stats[stat.type][stat.id].sources["Unknown"] = stat.value
      }
    }

    let stats = {}
    let keywords = {}

    // default stat amounts
    for (let x in miscData.stats) {
      let type = miscData.stats[x]
      stats[x] = {}
      if (x !== "realStats") {
        for (let z in type) {
          let stat = type[z]

          let defaultAmount = (stat.default != null) ? stat.default : 0

          stats[x][z] = {type: x, amount: defaultAmount, id: z, sources: {"Base": defaultAmount}}
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

    // stats from ascension
    for (let x in state.aspects) {
      let asp = this.ascension.getReferenceById(state.aspects[x].id)
      let build = state.aspects[x].nodes

      for (let z in asp.nodes) {
        for (let v in asp.nodes[z].parent) {
          let parentBoost = asp.nodes[z].parent[v]
          parentBoost.source = "Ascension"

          addStat(parentBoost)
          tryToAddKeyword(parentBoost)
        }
        for (let v in asp.nodes[z].subNodes[build[z]]) {
          let subNodeBoost = asp.nodes[z].subNodes[build[z]][v]
          subNodeBoost.source = "Ascension"

          addStat(subNodeBoost)
          tryToAddKeyword(subNodeBoost)
        }
      }
    }

    // artifact innate stat boosts
    state.artifacts.forEach(element => {
      let boosts = miscData.artifactBoosts[element]
      if (boosts && "innate" in boosts) {
        boosts.innate.forEach(e => {
          e.source = element
          addStat(e)
          tryToAddKeyword(e)
        })
      }
    })

    // boosts from talents
    this.app.talents.forEach(id => {
      let talent = miscData.talents[id]

      if ("boosts" in talent) {
        talent.boosts.forEach(boost => {
          boost.source = "Talent"
          addStat(boost)
          tryToAddKeyword(boost)
        })
      }
    })

    // cache
    this.app.keywords = keywords

    return this.getRealStats(stats, nextState);
  }

  getRealStats(stats, nextState=null) { // calculate real, absolute amounts of stats
    let state = nextState ? nextState : this.app.state
    
    function addStat(stat) {
      if (utils.hasKey(stats[stat.type], stat.id)) {
        // stat total
        stats[stat.type][stat.id].amount += stat.value

        if (stats[stat.type][stat.id].sources == undefined) // eslint-disable-line
          stats[stat.type][stat.id].sources = {}

        // per-source tracking
        if (stat.source != null)
          stats[stat.type][stat.id].sources[stat.source] += stat.value
        else
          stats[stat.type][stat.id].sources["Unknown"] += stat.value

        stats[stat.type][stat.id].refString = stat.string
      }
      else {
        stats[stat.type][stat.id] = {type: stat.type, amount: stat.value, id: stat.id, refString: stat.string, sources: {}}

        if (stat.source != null)
          stats[stat.type][stat.id].sources[stat.source] = stat.value
        else
          stats[stat.type][stat.id].sources["Unknown"] = stat.value
      }
    }

    // artifact special toggleable effects.
    state.buffs.forEach(id => {
      let data = miscData.statuses[id]
      if (data.type === "special") {
        switch(data.id) {
          case "PIP_Artifact_DrogsLuck": {
            let investmentBonus = 15 + (2 * stats.flexStat.FireSpecialist.amount) + (4 * game.app.state.civils.luckycharm)

            addStat({type: "extendedStat", id: "PercAttributeIncrease_Intelligence", value: investmentBonus, source: "Drog's Luck"})
            addStat({type: "extendedStat", id: "PercAttributeIncrease_Wits", value: investmentBonus, source: "Drog's Luck"})
            break;
          }
          case "PIP_Artifact_EyeOfTheStorm": {
            let investmentBonus = 25 + (2.5 * stats.flexStat.airSpecialist.amount)

            addStat({type: "extendedStat", id: "PercAttributeIncrease_Finesse", value: investmentBonus, source: "Eye of the Storm"})
            break;
          }
          case "PIP_Artifact_Kudzu": {
            addStat({type: "flexStat", id: "POISONRESISTANCE", value: 20, source: "Kudzu"})
            addStat({type: "flexStat", id: "EARTHRESISTANCE", value: 10, source: "Kudzu"})
            addStat({type: "flexStat", id: "PHYSICALRESISTANCE", value: 10, source: "Kudzu"})
            break;
          }
          case "PIP_Artifact_Leviathan": {
            addStat({type: "flexStat", id: "MOVEMENT", value: 0.5, source: "Leviathan"})
            break;
          }
          case "PIP_Artifact_Onslaught": {
            let investmentBonus = 3 * (Math.min(0, stats.flexStat.MOVEMENT.amount - 2))

            addStat({type: "extendedStat", id: "PercAttributeIncrease_Finesse", value: investmentBonus, source: "Onslaught"})
            addStat({type: "extendedStat", id: "PercAttributeIncrease_Intelligence", value: investmentBonus, source: "Onslaught"})
            break;
          }
          case "PIP_Artifact_PrismaticBarrier": {
            let resBonus = 3 * stats.flexStat.Perseverance.amount
            
            addStat({type: "flexStat", id: "EleResistance", value: resBonus, source: "Prismatic Barrier"})
            break;
          }
          case "PIP_Artifact_Urgency": {
            let force = stats.embodimentReward.Force.amount + this.ascension.getTotalRewards().force
            let dmgBoost = 10 * force
            let movementBoost = 0.3 * force

            addStat({type: "flexStat", id: "DAMAGEBOOST", value: dmgBoost, source: "Urgency"})
            addStat({type: "flexStat", id: "MOVEMENT", value: movementBoost, source: "Urgency"})
            break;
          }
          case "PIP_Artifact_Vertigo": {
            let fin = (
              stats["flexStat"]["FINESSE"].amount + game.app.state.attributes.fin +
              (stats["flexStat"]["FINESSE"].amount + game.app.state.attributes.fin - 10)*(stats["extendedStat"].PercAttributeIncrease_Finesse.amount/100)
              - 10
            )

            addStat({type: "flexStat", id: "DODGEBOOST", value: 1 * fin, source: "Vertigo"})
            addStat({type: "flexStat", id: "ACCURACYBOOST", value: -0.5 * fin, source: "Vertigo"})

            break;
          }
          case "PIP_Talent_Guerrilla": {
            let boost = 40 + (3 * (stats.flexStat.RogueLore.amount + game.app.state.abilities.RogueLore))

            addStat({type: "flexStat", id: "DAMAGEBOOST", value: boost, source: "Guerrilla"})

            break;
          }
          case "PIP_Talent_Hothead": {

            addStat({type: "flexStat", id: "CRITICALCHANCE", value: 10, source: "Hothead"})
            addStat({type: "flexStat", id: "ACCURACYBOOST", value: 10, source: "Hothead"})

            break;
          }
        }
      }
    })

    function getInvestedAttribute(id) {
      let investmentMult = (game.app.state.lw) ? 2 : 1
      let flexStatIDs = {
        "str": "STRENGTH",
        "fin": "FINESSE",
        "pwr": "INTELLIGENCE",
        "con": "CONSTITUTION",
        "mem": "MEMORY",
        "wits": "WITS",
      }
      return (
        (game.app.state.attributes[id] +
        stats["flexStat"][flexStatIDs[id]].amount) * investmentMult
      )
    }

    let invested = {
      str: getInvestedAttribute("str"),
      fin: getInvestedAttribute("fin"),
      pwr: getInvestedAttribute("pwr"),
      con: getInvestedAttribute("con"),
      mem: getInvestedAttribute("mem"),
      wits: getInvestedAttribute("wits"),
    }

    // these are not initialized like normal stats, so we add the default amount manaully
    let realStr = (
      miscData.stats.realStats.str.default +
      invested.str +
      (invested.str)*(stats["extendedStat"].PercAttributeIncrease_Strength.amount/100))

    let realFin = (
      miscData.stats.realStats.fin.default +
      invested.fin +
      (invested.fin)*(stats["extendedStat"].PercAttributeIncrease_Finesse.amount/100))

    let realInt = (
      miscData.stats.realStats.pwr.default +
      invested.pwr +
      (invested.pwr)*(stats["extendedStat"].PercAttributeIncrease_Intelligence.amount/100))

    let realCon = (
      miscData.stats.realStats.con.default +
      invested.con +
      (invested.con)*(stats["extendedStat"].PercAttributeIncrease_Constitution.amount/100))

    let realMem = (
      miscData.stats.realStats.mem.default +
      invested.mem +
      (invested.mem)*(stats["extendedStat"].PercAttributeIncrease_Memory.amount/100))

    let realWits = (
      miscData.stats.realStats.wits.default +
      invested.wits +
      (invested.wits)*(stats["extendedStat"].PercAttributeIncrease_Wits.amount/100))

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
    let realResPoison = state.physique.lifeType !== "undead" ? (
      stats.flexStat.POISONRESISTANCE.amount + stats.flexStat.EleResistance.amount + stats.flexStat.AllResistance.amount
    ) : 200
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

    // todo fix
    if (state.physique.lifeType !== "undead")
      stats.realStats["res_poison"] = {type: "realStats", id: "res_poison", amount: this.applyDR(realResPoison)}
    else
      stats.realStats["res_poison"] = {type: "realStats", id: "res_poison", amount: realResPoison}

    stats.realStats["res_air"] = {type: "realStats", id: "res_air", amount: this.applyDR(realResAir)}

    // abilities
    let abilities = state.abilities
    let mult = state.lw ? 2 : 1
    stats.realStats["warfare"] = {type: "realStats", id: "warfare", amount: (
      stats.flexStat.WarriorLore.amount + abilities.WarriorLore * mult
    )}
    stats.realStats["hydrosophist"] = {type: "realStats", id: "hydrosophist", amount: (
      stats.flexStat.WaterSpecialist.amount + abilities.WaterSpecialist * mult
    )}
    stats.realStats["geomancer"] = {type: "realStats", id: "geomancer", amount: (
      stats.flexStat.EarthSpecialist.amount + abilities.EarthSpecialist * mult
    )}
    stats.realStats["necromancer"] = {type: "realStats", id: "necromancer", amount: (
      stats.flexStat.Necromancy.amount + abilities.Necromancy * mult
    )}
    stats.realStats["scoundrel"] = {type: "realStats", id: "scoundrel", amount: (
      stats.flexStat.RogueLore.amount + abilities.RogueLore * mult
    )}
    stats.realStats["huntsman"] = {type: "realStats", id: "huntsman", amount: (
      stats.flexStat.RangerLore.amount + abilities.RangerLore * mult
    )}
    stats.realStats["pyrokinetic"] = {type: "realStats", id: "pyrokinetic", amount: (
      stats.flexStat.FireSpecialist.amount + abilities.FireSpecialist * mult
    )}
    stats.realStats["aerotheurge"] = {type: "realStats", id: "aerotheurge", amount: (
      stats.flexStat.AirSpecialist.amount + abilities.AirSpecialist * mult
    )}
    stats.realStats["summoning"] = {type: "realStats", id: "summoning", amount: (
      stats.flexStat.Summoning.amount + abilities.Summoning * mult
    )}
    // poly gets no boost from lw
    stats.realStats["polymorph"] = {type: "realStats", id: "polymorph", amount: (
      stats.flexStat.Polymorph.amount + abilities.Polymorph
    )}
    stats.realStats["dualwielding"] = {type: "realStats", id: "dualwielding", amount: (
      stats.flexStat.DualWielding.amount + abilities.DualWielding * mult
    )}
    stats.realStats["ranged"] = {type: "realStats", id: "ranged", amount: (
      stats.flexStat.Ranged.amount + abilities.Ranged * mult
    )}
    stats.realStats["singlehanded"] = {type: "realStats", id: "singlehanded", amount: (
      stats.flexStat.SingleHanded.amount + abilities.SingleHanded * mult
    )}
    stats.realStats["twohanded"] = {type: "realStats", id: "twohanded", amount: (
      stats.flexStat.TwoHanded.amount + abilities.TwoHanded * mult
    )}
    stats.realStats["leadership"] = {type: "realStats", id: "leadership", amount: (
      stats.flexStat.Leadership.amount + abilities.Leadership * mult
    )}
    stats.realStats["perseverance"] = {type: "realStats", id: "perseverance", amount: (
      stats.flexStat.Perseverance.amount + abilities.Perseverance * mult
    )}
    stats.realStats["retribution"] = {type: "realStats", id: "retribution", amount: (
      stats.flexStat.PainReflection.amount + abilities.PainReflection * mult
    )}

    // status effect boosts
    state.buffs.forEach(id => {
      let data = miscData.statuses[id]
      if (data.type !== "special") {
        data.boosts.forEach(e => {
          addStat(e)
          // these cannot contain keywords
        })
      }
    })

    // extra stats from attributes. We should prob have a realStats entry for these?
    stats.flexStat.PHYSICALARMORBOOST.amount += (3 * (stats.realStats.str.amount - 10))
    stats.flexStat.MAGICARMORBOOST.amount += (3 * (stats.realStats.str.amount - 10))
    stats.flexStat.DODGEBOOST.amount += (0.5 * (stats.realStats.fin.amount - 10))
    // todo shield consideration
    stats.flexStat.DAMAGEBOOST.amount += (2.5 * (stats.realStats.pwr.amount - 10))
    stats.flexStat.CRITICALCHANCE.amount += stats.realStats.pwr.amount - 10
    stats.flexStat.INITIATIVE.amount += stats.realStats.wits.amount - 10

    // extra stats from abilities
    stats.flexStat.INITIATIVE.amount += 2 * stats.realStats.aerotheurge.amount
    stats.flexStat.ACCURACYBOOST.amount += stats.realStats.huntsman.amount
    stats.flexStat.LIFESTEAL.amount += stats.realStats.necromancer.amount
    stats.flexStat.MOVEMENT.amount += 0.2 * stats.realStats.scoundrel.amount

    stats.flexStat.DODGEBOOST.amount += 2 * stats.realStats.dualwielding.amount

    return stats
  }

  getKeywordIDsInBuild() {
    let kws = new Set()
    for (let x in game.app.keywords) {
      kws.add(x)
    }
    return Array.from(kws)
  }

  // apply diminishing returns; used for resistances in the game, if the setting is on
  applyDR(statAmount) {
    if (!this.app.state.DR)
      return statAmount

    let effectivenessReduction = statAmount / (statAmount + this.app.state.DRAmount)
    return utils.round(statAmount * (1 - effectivenessReduction), this.app.state.rounding)
  }

  // get a string display of a stat, formatted with value or true/false when appropriate
  getDisplayString(stat) {
    let isArtifactBoost = stat.id.search("PIP_Artifact_") > -1
    let isTalentBoost = stat.id.search("PIP_Talent") > -1

    if (isArtifactBoost) {
      // artifact boosts use the Artifact's description
      let artifactId = stat.id.replace("PIP_Artifact_", "").toLowerCase()
      return game.artifacts[artifactId].description
    }
    else if (isTalentBoost) {
      // talent boosts use the talent's description
      let talentId = stat.id.replace("PIP_Talent_", "").toLowerCase()
      return miscData.talents[talentId].description
    }
    else if (stat.type in miscData.stats && stat.id in miscData.stats[stat.type]) {
      // strings defined by us, for generic stats like +movement.
      let displayInfo = miscData.stats[stat.type][stat.id]

      // manually defined strings for each possible value of a stat. Used by the summon capacity boost for example.
      if (displayInfo && displayInfo.strings != null) {
        return displayInfo.strings[Math.min(stat.amount, displayInfo.strings.length-1)]
      }
      else if (displayInfo && displayInfo.bool)
        return utils.format(miscData.stats[stat.type][stat.id].display, utils.capitalize((stat.amount > 0).toString()))

      return utils.format(miscData.stats[stat.type][stat.id].display, stat.amount)
    }
    else if (miscData.statTypesWithGameStrings.includes(stat.type)) {
      // stat types that use strings from the game if we have not defined a replacement for them.
      return game.ascension.specialStrings[stat.refString]
    }

    return "STAT WITH NO STRING: " + stat.type + " " + stat.id
  }

  // wip method for showing sources of stat boosts
  getStatSourcesText(type, id) {
    let stat = this.app.stats[type][id]

    let text = []
    for (let source in stat.sources) {
      text.push(<Text key={source} text={utils.format("From {0}: +{1}", source, stat.sources[source])}/>)
    }

    return text;
  }

  async render() {await this.app.forceUpdate()}
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

    state = state.filter((x)=>{return x.id !== asp.id})

    await this.app.closeContext()
    this.app.setState({aspects: state})
  }

  // move aspect up/down in the list
  async moveAspect(e, id, movement) {
    let asp = this.getBuildAspectById(id)
    let state = cloneDeep(this.app.state.aspects)
    let index = this.app.state.aspects.indexOf(asp) + movement
    state = state.filter((x)=>{return x.id !== asp.id})

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
    let stats = game.app.stats
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

    // core nodes
    for (let x in game.app.state.coreNodes) {
      rews[x] += game.app.state.coreNodes[x] ? 1 : 0
      if (game.app.hasCompleteCore)
        rews[x] += 1
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

    let keywords = new Set() // all keywords that this aspect can offer
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

      // go through every subnode to note down all the keywords offered in this aspect
      for (let v in node.subNodes) {
        for (let z in node.subNodes[v]) {
          let statBoost = node.subNodes[v][z]
          if ((miscData.boostsWithKeywords.includes(statBoost.type)) && statBoost.keyword != null) {
            keywords.add(statBoost.keyword)
          }

          if (utils.hasKey(miscData.nodesWithExtraKeywords, statBoost.id)) {
            for (let v in miscData.nodesWithExtraKeywords[statBoost.id]) {
              keywords.add(miscData.nodesWithExtraKeywords[statBoost.id][v])
            }
          }
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
      if (this.app.state.aspects[x].id === asp.id)
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
  async changeSubNode(asp, node, newSubNode, mode="edit") {
    let index = this.app.state.aspects.indexOf(asp)

    // edits an aspect in the current build
    if (mode === "edit") {
      let state = cloneDeep(this.app.state.aspects)

      state[index].nodes[node] = newSubNode

      await this.app.setState({aspects: state})
    }
    // edits an aspect in the Ascension popup/preview
    else if (mode === "preview-edit") {
      let state = cloneDeep(this.app.state.currentlyViewedAspect)

      state.nodes[node] = newSubNode

      await this.app.setState({currentlyViewedAspect: state})
    }

    this.app.closeContext()
  }

  // todo cleanup
  getAspectElement(asp, interactive=false, mode="edit", skipEmptyEmbs=true) {
    // quit if asp is invalid. this can happen when the user removes an aspect they're viewing
    if (asp == null || asp.id == null)
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
        let func = (e)=>{this.app.contextMenu(menu, e)}
        tooltip.push(
          <div key={x} onContextMenu={func} onClick={func}>
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
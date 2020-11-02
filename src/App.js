import logo from './logo.svg';
import './App.css';
import React from 'react';
import { MainInterface, SkillBook } from "./components.js"
import * as miscData from "./miscData.js"
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

  // [cool ascension-related methods go here]
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// object with all images
// const images = {
//   icons: importAll(require.context("./images/skills", false, /\.(gif|jpe?g|svg|png)$/)),
// }

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      ready: false,
      popup: "skillbook",
      skillbookCategory: "Air",

      physique: {
        race: "human",
        gender: "male",
        lifeType: "alive",
      },
      name: "Lindsay Lohan",
      skills: [],
      artifacts: [],
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

    game.images.icons = importAll(require.context("./images/skills", false, /\.(gif|jpe?g|svg|png)$/))

    for (let x = 0; x < requests.length; x++) {
      promises.push(axios.get(requests[x]))
    }
    
    axios.all(promises)
      .then(function(responses) {
        game.artifacts = responses[0].data
        game.ascension.aspects = responses[1].data
        game.skills = responses[2].data

        this.setState({ready: true})
      }.bind(this))
      .catch((error) => {
        throw error;
    });

    console.log(game.images.icons)
    console.log(game.images.icons["AMER_DoS1_LOOT_PhilosopherStone_A.png"].default)
  }

  closePopupPanel() {this.setState({popup: null})}

  render() {
    // only start rendering once all data has been fetched
    if (this.state.ready) {

      let popups = {
        "skillbook": <SkillBook app={this}/>
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
      <div className="pop-up-parent popup-box">
        {props.element}
      </div>
    </div>
  )
}

export var game = new Game()

export default App;

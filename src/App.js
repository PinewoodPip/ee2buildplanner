import logo from './logo.svg';
import './App.css';
import React from 'react';
import { MainInterface } from "./components.js"
import * as miscData from "./miscData.js"
const axios = require('axios').default;

// class for holding data and misc functions related to the EE game
class Game {
  data = {
    skills: null,
    artifacts: null,
    races: miscData.races,
    origins: {

    },
  }
  ascension = new Ascension()

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
const images = {
  icons: importAll(require.context("./images/skills", false, /\.(gif|jpe?g|svg|png)$/)),
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      ready: false,
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
  }

  render() {
    // only start rendering once all data has been fetched
    if (this.state.ready) {
      return (
        <div className="App">
          <MainInterface app={this}/>
        </div>
      );
    }
    else {
      return <div/>
    }
  }
}

export var game = new Game()

export default App;

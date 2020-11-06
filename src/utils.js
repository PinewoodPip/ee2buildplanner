import { game } from "./App.js"


// import all images from a folder in /src/ and map them to an object
export function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

export function hasKey(obj, key) {
  return Object.keys(obj).includes(key)
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function limitRange(value, min, max) {
  return Math.max(min, Math.min(value, max))
}

export function round(number, places=1) {
  var rounded = Math.round( number * Math.pow(10, places) ) / Math.pow(10, places);
  return rounded;
}

// get an image by its filename (extension excluded)
export function getImage(id) {
  // missing image; some skills don't have an icon assigned and just say "unknown"
  if (id == "unknown" || id == null || id == undefined) {
    return game.images.icons["Action_Identify.png"].default
  }

  let file = id + ".png"
  if (hasKey(game.images.icons, file))
    return game.images.icons[file].default
  else {
    // report missing/typo'd images
    console.log("Missing icon: " + file)
    return null
  }
}

export function format(str) { // by gpvos from stackoverflow
  var args = arguments;
  return str.replace(/\{(\d+)\}/g, function (m, n) { return args[parseInt(n) + 1]; });
};
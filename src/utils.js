import { game } from "./App.js"


// import all images from a folder in /src/ and map them to an object
export function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

export function hasKey(obj, key) {
  if (obj == null)
    return false
  return Object.keys(obj).includes(key)
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function limitRange(value, min, max) {
  return Math.max(min, Math.min(value, max))
}

export function isEmptyString(string) {
  return (string.length === 0 || string.trim().length === 0)
}

export function tryToPush(obj, key, element) {
  if (key in obj) {
    obj[key].push(element)
  }
  else {
    obj[key] = [element]
  }
}

export function round(number, places=1) {
  return Math.round( number * Math.pow(10, places) ) / Math.pow(10, places);;
}

// get an image by its filename (extension excluded)
export function getImage(id) {
  // missing image; some skills don't have an icon assigned and just say "unknown"
  if (id === "unknown" || id === null || id === undefined) {
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
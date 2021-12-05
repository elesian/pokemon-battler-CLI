function Pokemon(pokemonParameters = null) {
  if (pokemonParameters != null) {
    this.name = pokemonParameters["name"];
    this.type = pokemonParameters["type"];
    this.hitPoints = pokemonParameters["hitPoints"];
    this.move = pokemonParameters["move"];
    this.damage = pokemonParameters["damage"];
    this.strength = pokemonParameters["strength"];
    this.weakness = pokemonParameters["weakness"];
    this.sound = pokemonParameters["sound"];
    this.defend = false;
  }
}

Pokemon.prototype.talk = function () {
  return this.sound;
};

Pokemon.prototype.useYourMoves = function () {
  return this.move;
};

//for testing purposes when pokemon parameters are null
Pokemon.prototype.propertyValues = function () {
  let returnObj = [
    this.name,
    this.type,
    this.hitPoints,
    this.move,
    this.damage,
    this.strength,
    this.weakness,
    this.sound,
  ];
  return returnObj;
};

function randomizePokemon(pokemonDatabase) {
  let pokemonKeys = Object.keys(pokemonDatabase);
  //generate random number
  let randomNumber = Math.floor(Math.random() * 7);
  return pokemonDatabase[pokemonKeys[randomNumber]];
}

//used to pass parameters to Pokemon class
const pokemonData = {};
pokemonData.eeveeObj = {
  name: "Eevee",
  type: "normal",
  hitPoints: 55,
  move: "HEADBUTT",
  damage: 18,
  strength: "none",
  weakness: "fighting",
  sound: "Eev...Eevee!",
};

pokemonData.flareonObj = {
  name: "Flareon",
  type: "fire",
  hitPoints: 65,
  move: "FIREBLAST",
  damage: 20,
  strength: "grass",
  weakness: "water",
  sound: "EFla... Flareon!",
};

pokemonData.vaporeonObj = {
  name: "Vaporeon",
  type: "water",
  hitPoints: 70,
  move: "HYDRO PUMP",
  damage: 19,
  strength: "fire",
  weakness: "grass",
  sound: "Vap... Vaporeon!",
};

pokemonData.leafeonObj = {
  name: "Leafeon",
  type: "grass",
  hitPoints: 65,
  move: "GIGA DRAIN",
  damage: 17,
  strength: "water",
  weakness: "fire",
  sound: "Lea... Leafeon!",
};

pokemonData.charmanderObj = {
  name: "Charmander",
  type: "fire",
  hitPoints: 44,
  move: "FLAMETHROWER",
  damage: 17,
  strength: "grass",
  weakness: "water",
  sound: "Cha... Charmander!",
};

pokemonData.squirtleObj = {
  name: "Squirtle",
  type: "water",
  hitPoints: 44,
  move: "SURF",
  damage: 16,
  strength: "fire",
  weakness: "grass",
  sound: "Squ... Squirtle!",
};

pokemonData.bulbasaurObj = {
  name: "Bulbasaur",
  type: "grass",
  hitPoints: 45,
  move: "RAZOR LEAF",
  damage: 16,
  strength: "water",
  weakness: "fire",
  sound: "Bul... Bulbasaur!",
};

module.exports = { Pokemon, pokemonData, randomizePokemon };

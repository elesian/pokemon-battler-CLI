const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

function Trainer(inputName = "Ash") {
  this.name = inputName;
  this.pokemonInventory = [];
  this.pokemonInventoryMaxSize = 6;
  this.currentPokemon = null;
  this.playerDefeated = false;
}

Trainer.prototype.trainerInitialisation = function () {
  for (let i = 0; i < 6; i++) {
    this.pokemonInventory.push(randomizePokemon(pokemonData));
  }
  this.selectCurrentPokemon();
};

Trainer.prototype.pokemonInformation = function () {
  let printCurrentNames = "Your Inventory of Pokemon are: \n\n";
  for (let i = 0; i < this.pokemonInventory.length; i++) {
    printCurrentNames += i + ". " + this.pokemonInventory[i].name + " " + "\n";
  }
  console.log(printCurrentNames);
};

Trainer.prototype.selectCurrentPokemon = function (selection = 0) {
  this.pokemonInformation();
  console.log(
    "Please select the number of the Pokemon you wish to change to : "
  );
  //GET USER INPUT
  console.log(`You have selected: ${selection}`);
  //reset current pokemon
  if (selection >= 0 && selection <= this.pokemonInventoryMaxSize) {
    this.currentPokemon = selection;
    let currentPokemon = Object.values(
      this.pokemonInventory[this.currentPokemon]
    )[0];
    return `Your current Pokemon is slot ${selection} : ${currentPokemon}`;
  } else return "Invalid Selection";
};

//selection set to 0 for testing purposes
Trainer.prototype.removePokemon = function (selection = 0) {
  if (this.pokemonInventory.length > 1) {
    console.log("before");
    this.pokemonInformation();
    console.log("Which Pokemon do you wish to remove?");
    //GET USER INPUT - SELECTION
    this.pokemonInventory.splice(selection, 1);
    console.log("after");
    this.pokemonInformation();
    if (selection == this.currentPokemon) {
      console.log("You have removed your current Pokemon.");
      this.selectCurrentPokemon();
    }
    if (selection < this.currentPokemon) {
      this.currentPokemon--;
    }
  } else console.log("You must have at least one Pokemon");
};

Trainer.prototype.catchPokemon = function () {
  if (this.pokemonInventory.length < this.pokemonInventoryMaxSize) {
    this.pokemonInventory.push(randomizePokemon(pokemonData));
  } else return "Inventory Full. Unable to catch new Pokemon";
};

//pokemonDefeated
Trainer.prototype.pokemonDefeated = function () {
  if (this.pokemonInventoryMaxSize > 1) {
    this.pokemonInventory.splice(this.currentPokemon, 1);
    this.pokemonInventoryMaxSize--;
    this.selectCurrentPokemon();
  } else this.playerDefeated = true;
};

module.exports = { Trainer };

const { Console } = require("console");
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
  this.defendStatus = false;
  this.playerDefeated = false;
}

Trainer.prototype.trainerInitialisation = function () {
  for (let i = 0; i < 6; i++) {
    this.pokemonInventory.push(randomizePokemon(pokemonData));
  }
  console.log("Please select a starting Pokemon.");
  this.selectCurrentPokemon();
};

Trainer.prototype.pokemonInformation = function () {
  let printCurrentNames = "Your Inventory of Pokemon is: \n\n";
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
  //GET USER INPUT - ERROR CHECKING
  console.log(`You have selected: ${selection}`);
  //reset current pokemon
  if (selection >= 0 && selection <= this.pokemonInventoryMaxSize) {
    this.currentPokemon = selection;
    let currentPokemon = Object.values(
      this.pokemonInventory[this.currentPokemon]
    )[0];
    console.log(
      `Your current Pokemon is slot ${selection} : ${currentPokemon}`
    );
    return true;
  } else console.log("Invalid Selection.");
  return false;
};

//selection set to 0 for testing purposes
Trainer.prototype.removePokemon = function (selection = 0) {
  if (this.pokemonInventory.length > 1) {
    console.log("Before removal:");
    this.pokemonInformation();
    console.log("Which Pokemon do you wish to remove?");
    //GET USER INPUT - SELECTION - ERROR CHECKING
    console.log(`You have selected ${selection}`);
    this.pokemonInventory.splice(selection, 1);
    console.log("After removal:");
    this.pokemonInformation();
    console.log("Pokemon Removed Successfully!!!");
    if (selection == this.currentPokemon) {
      console.log(
        "You have removed your current Pokemon. Please select a new Pokemon."
      );
      this.selectCurrentPokemon();
    }
    if (selection < this.currentPokemon) {
      this.currentPokemon--;
    }

    return true;
  } else console.log("You must have at least one Pokemon.");
  return false;
};

Trainer.prototype.catchPokemon = function () {
  if (this.pokemonInventory.length < this.pokemonInventoryMaxSize) {
    //randomize 80% chance of catching a Pokemon
    let catchProbability = Math.random();
    if (catchProbability <= 0.8) {
      this.pokemonInventory.push(randomizePokemon(pokemonData));
      console.log("Pokemon caught successfully !!!");
      return true;
    } else console.log("Pokemon escaped capture !!!");
    return true;
  } else console.log("Inventory Full. Unable to catch new Pokemon.");
  return false;
};

//pokemonDefeated
Trainer.prototype.pokemonDefeated = function () {
  console.log("Your Pokemon was defeated !!!");
  if (this.pokemonInventoryMaxSize > 1) {
    this.pokemonInventory.splice(this.currentPokemon, 1);
    this.pokemonInventoryMaxSize--;
    this.selectCurrentPokemon();
  } else this.playerDefeated = true;
};

module.exports = { Trainer };

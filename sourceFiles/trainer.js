/** @format */

const {
  Pokemon,
  pokemonData,
} = require('../sourceFiles/pokemon.js');

const { optionSelect } = require('./utilities');

function Trainer(inputName = 'Ash') {
  this.name = inputName;
  this.pokemonInventory = [];
  this.pokemonInventoryMaxSize = 6;
  this.currentPokemon = null;
  this.defendStatus = false;
  this.playerDefeated = false;
}

Trainer.prototype.randomizePokemon = function () {
  const pokemonKey = Object.keys(pokemonData);
  let randomNumber = Math.floor(Math.random() * 7);
  const newPokemon = new Pokemon(pokemonData[pokemonKey[randomNumber]]);
  return newPokemon;
};

Trainer.prototype.trainerInitialisation = function () {
  for (let i = 0; i < 6; i++) {
    this.pokemonInventory.push(this.randomizePokemon());
  }
  console.log('Please select a starting Pokemon.');
  this.selectCurrentPokemon();
};

Trainer.prototype.pokemonInformation = function () {
  let printCurrentNames = `\n${this.name}'s inventory of Pokemon is: \n\n`;
  for (let i = 0; i < this.pokemonInventory.length; i++) {
    printCurrentNames += i + '. ' + this.pokemonInventory[i].name + ' ' + '\n';
  }
  console.log(printCurrentNames);
};

Trainer.prototype.selectCurrentPokemon = function () {
  this.pokemonInformation();
  console.log(
    '\nPlease select the number of the Pokemon you wish to change to : '
  );

  let selection = optionSelect(null, 0, this.pokemonInventory.length - 1);

  //GET USER INPUT - ERROR CHECKING
  console.log(`\nYou have selected: ${selection}`);
  //reset current pokemon
  if (selection >= 0 && selection < this.pokemonInventoryMaxSize) {
    this.currentPokemon = selection;
    let currentPokemon = this.pokemonInventory[this.currentPokemon].name;
    console.log(
      `\nYour current Pokemon is slot ${selection} : ${currentPokemon}`
    );
    return true;
  } else console.log('\nInvalid Selection.');
  return false;
};

//selection set to 0 for testing purposes
Trainer.prototype.removePokemon = function () {
  if (this.pokemonInventory.length > 1) {
    console.log('\nBefore removal:');
    this.pokemonInformation();
    console.log('Which Pokemon do you wish to remove?');
    let selection = optionSelect('', 0, this.pokemonInventory.length - 1);

    //GET USER INPUT - SELECTION - ERROR CHECKING
    console.log(`\nYou have selected ${selection}`);
    this.pokemonInventory.splice(selection, 1);
    console.log('\nAfter removal:');
    this.pokemonInformation();
    console.log('\nPokemon Removed Successfully!!!');
    if (selection == this.currentPokemon) {
      console.log(
        '\nYou have removed your current Pokemon. Please select a new Pokemon.'
      );
      this.selectCurrentPokemon();
    }
    if (selection < this.currentPokemon) {
      this.currentPokemon--;
    }

    return true;
  } else console.log('\nYou must have at least one Pokemon.');
  return false;
};

Trainer.prototype.catchPokemon = function () {
  if (this.pokemonInventory.length < this.pokemonInventoryMaxSize) {
    //randomize 80% chance of catching a Pokemon
    inventoryFull = false;
    let catchProbability = Math.random();
    if (catchProbability <= 0.8) {
      this.pokemonInventory.push(this.randomizePokemon());
      console.log('\nPokemon caught successfully !!!');
      return true;
    } else console.log('\nPokemon escaped capture !!!');
    return true;
  } else {
    console.log('\nInventory is full, please re-select another option!');
    return false;
  }
};

//pokemonDefeated
Trainer.prototype.pokemonDefeated = function () {
  console.log(
    `\n${this.pokemonInventory[this.currentPokemon].name} is defeated !!!`
  );
  if (this.pokemonInventoryMaxSize > 1) {
    this.pokemonInventory.splice(this.currentPokemon, 1);
    this.pokemonInventoryMaxSize--;
    console.log(
      `\n${this.name} now has one less inventory space. ${this.name} now has ${this.pokemonInventoryMaxSize} spaces.`
    );
    console.log('\nPlease select a new Pokemon.');
    this.selectCurrentPokemon();
  } else this.playerDefeated = true;
};

module.exports = { Trainer };

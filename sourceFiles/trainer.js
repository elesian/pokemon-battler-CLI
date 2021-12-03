const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

function Trainer(inputName = "Ash") {
  this.name = inputName;
  this.pokemonInventory = [];
  this.currentPokemon = {};
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
    printCurrentNames += (i+1) + ". " + this.pokemonInventory[i].name + " " + "\n"
  }
  console.log(printCurrentNames);
};

Trainer.prototype.selectCurrentPokemon = function () {
  this.pokemonInformation();
  //get userinput
  console.log(
    "Please select the number of the Pokemon you wish to change to : "
  );
  //hardcoded - error checking for user input
  const hardcodedInput = 0;
  this.currentPokemon[hardcodedInput] =
    this.pokemonInventory[hardcodedInput].name;
    let currentNumber = parseInt(Object.keys(this.currentPokemon));
    let currentPokemon = Object.values(this.currentPokemon);
    console.log(++currentNumber + " : " + currentPokemon);
 };

Trainer.prototype.removePokemon = function () {
  const hardcodedInput = 0;
  if (this.pokemonInventory.length > 1) {
    this.pokemonInformation();
    this.pokemonInventory.splice(hardcodedInput, 1);
    console.log(this.pokemonInventory);
  }
  if(hardcodedInput==this.currentPokemon){
      this.selectCurrentPokemon();
  }
};

//pokemon defend change pokemon status
//pokemon catch - new random pokemon call
//pokemon discard -

module.exports = { Trainer };

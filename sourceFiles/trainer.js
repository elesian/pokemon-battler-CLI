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
  this.defeated = false;
  
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
    printCurrentNames += (i) + ". " + this.pokemonInventory[i].name + " " + "\n"
  }
  console.log(printCurrentNames);
};

Trainer.prototype.selectCurrentPokemon = function (selection=0) {
  this.pokemonInformation();
  //get userinput
  console.log(
    "Please select the number of the Pokemon you wish to change to : "
  );
  console.log(`You have selected: ${selection}`);
  //reset current pokemon
  if(selection >= 0 && selection <= this.pokemonInventoryMaxSize){
    this.currentPokemon = selection;
    let currentPokemon = Object.values(this.pokemonInventory[4])[0];
    return `Your current Pokemon is slot ${selection} : ${currentPokemon}`;
  } else return "Invalid Selection";
 };

Trainer.prototype.removePokemon = function (selection=0) {
  if(this.pokemonInventory.length > 1) {
    console.log("before");
    this.pokemonInformation();
    this.pokemonInventory.splice((selection), 1);
    console.log("after");
    this.pokemonInformation();}
    else console.log("You must have at least one Pokemon");
    
};

//catch pokemon to maximal size

//pokemon defend change pokemon status
//pokemon catch - new random pokemon call
//pokemon discard -

module.exports = { Trainer };

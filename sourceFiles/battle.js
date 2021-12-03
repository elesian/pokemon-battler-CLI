const { buildFailureTestResult } = require("@jest/test-result");
const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

const { Trainer } = require("../sourceFiles/trainer.js");

function Battle(trainer1, trainer2) {

        this.endGame = false;
        this.player1 = trainer1;
        this.player2 = trainer2;
        this.winner = false;
        

}

Battle.prototype.gameLoop = function(){

    while(this.endGame==false){

        

    }

}



//Used to determine which player goes first and whether critical hit
Battle.prototype.numberRandomiser = function () {
    let randomNumber = Math.round(Math.random());
    if(randomNumber===1) return true;
    else return false;
  }

  //selection variable for testing purposes; to be overriden with UI
  Battle.prototype.optionSelect = function (selection) {
      console.log("Please choose an action: \n\n 1. Attack \n 2. Defend \n 3. Switch Pokemon \n 4. Catch Pokemon \n 5. Remove Pokemon ");
    
  }

  Battle.prototype.attack = function () {

        //take attack damage * crit chance * weakness * defense flag
        //You are attacking with current pokemon with attack for X damage
        //If attacking pokemons type == weakness, it's super effective!
        //If attacking pokemons type == strength, it's not very effective!
        //pokemon is defending resists your attack!
        //if pokemon hp <=0, then remove current Pokemon
        //if playerdefeated = true, break, change flag;
  }

  Battle.prototype.defend = function () {


  }

 Battle.prototype.switchPokemon = function () {


}

Battle.prototype.catchPokemon = function () {


}

Battle.prototype.removePokemon = function () {


}


module.exports = { Battle };

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

  Battle.prototype.optionSelect = function () {
      console.log("Please choose an action: \n 1. Attack \n 2. Defend \n 3. Switch Pokemon \n 4. Catch Pokemon \n 5. Remove Pokemon");
    
  }

  Battle.prototype.attack = function () {


  }





module.exports = { Battle };

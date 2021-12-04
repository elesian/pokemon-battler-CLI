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
        this.winner = null
    
}

Battle.prototype.gameLoop = function(){

    this.whoGoesFirst();

    while(this.endGame==false){

        

    }

}

Battle.prototype.whoGoesFirst = function () {
    let firstPlayer = this.numberRandomiser();
    if(firstPlayer===false){
        console.log("numberRandomiser() returned false - player 2 will go frst!");
        let temp = this.player2;
        this.player2 = this.player1;
        this.player1 = temp;
    }
    console.log(`${this.player1.name} will go first.`);
  }

//Used to determine which player goes first and whether critical hit
Battle.prototype.numberRandomiser = function () {
    let randomNumber = Math.round(Math.random());
    if(randomNumber===1) return true;
    else return false;
  }

  //selection variable for testing purposes; to be overriden with UI
  Battle.prototype.optionSelect = function (selection=1) {
    let invalidSelection = true;
    while(invalidSelection){  
    console.log("Please choose an action: \n\n 1. Attack \n 2. Defend \n 3. Switch Pokemon \n 4. Catch Pokemon \n 5. Remove Pokemon ");
      //USER INPUT - SELECTION
      if(selection >= 1 && selection <=5){
          invalidSelection=false;
      } else "Invalid Input."}
      return selection;}
  

  Battle.prototype.attack = function () {

        //take attack damage * crit chance * weakness * defense flag
        //You are attacking with current pokemon with attack for X damage
        //If attacking pokemons type == weakness, it's super effective!
        //If attacking pokemons type == strength, it's not very effective!
        //pokemon is defending resists your attack!
        //if pokemon hp <=0, then remove current Pokemon
        //if playerdefeated = true, break, change flag;
  }

  Battle.prototype.defend = function (trainer) {
    console.log(`Your current Pokemon ${trainer.pokemonInventory[trainer.currentPokemon].name} is now defending!`);  
    trainer.defendStatus=true;
  }

 Battle.prototype.switchPokemon = function () {


}

Battle.prototype.catchPokemon = function () {


}

Battle.prototype.removePokemon = function () {


}


module.exports = { Battle };

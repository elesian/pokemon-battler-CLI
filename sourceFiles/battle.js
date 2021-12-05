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
  this.winner = null;
  this.loser = null;
}

Battle.prototype.gameLoop = function () {
  this.whoGoesFirst();

  while (this.endGame == false) {
    //reset defence flags
    this.player1.defendStatus = false;
    if (!playerTurn(this.player1, this.player2)) {
      this.player2.defendStatus = false;
      playerTurn(this.player2, this.player1);
    }
  }

  console.log(`${this.winner} has defeated ${this.loser}`);
};

Battle.prototype.playerTurn = function (
  //WILL BE CALLED BY GAMELOOP - NO NEED FOR THIS OUTSIDE OF UNIT TESTING
  trainer1 = this.player1,
  trainer2 = this.player2
) {
  //   "Please choose an action: \n\n 1. Attack \n 2. Defend \n 3. Switch Pokemon \n 4. Catch Pokemon \n 5. Remove Pokemon "

  //USER INPUT HERE
  let selection = this.optionSelect();
  switch (selection) {
    case 1:
      this.attack(trainer1, trainer2);
      break;
    case 2:
      this.defend(trainer1);
      break;
    case 3:
      trainer1.selectCurrentPokemon();
      this.playerTurn(trainer1, trainer2);
      break;
    case 4:
      //if false and inventory full, reselect
      let validSelection4 = trainer1.catchPokemon();
      if (validSelection4 === false) {
        this.playerTurn(trainer1, trainer2);
      }
      break;
    case 5:
      let validSelection5 = trainer1.removePokemon();
      if (validSelection5 === false) {
        this.playerTurn(trainer1, trainer2);
      }
      break;
    default:
    // code block
  }

  if (trainer2.playerDefeated == true) {
      this.endGame=true;
    return true;
  } else return false;
};

Battle.prototype.whoGoesFirst = function () {
  let firstPlayer = this.numberRandomiser();
  if (firstPlayer === false) {
    console.log("numberRandomiser() returned false - player 2 will go frst!");
    let temp = this.player2;
    this.player2 = this.player1;
    this.player1 = temp;
  }
  console.log(`${this.player1.name} will go first.`);
};

//Used to determine which player goes first and whether critical hit
Battle.prototype.numberRandomiser = function () {
  let randomNumber = Math.round(Math.random());
  if (randomNumber === 1) return true;
  else return false;
};

//selection variable for testing purposes; to be overriden with UI
Battle.prototype.optionSelect = function (selection = 2) {
  let invalidSelection = true;
  while (invalidSelection) {
    console.log(
      "Please choose an action: \n\n 1. Attack \n 2. Defend \n 3. Switch Pokemon \n 4. Catch Pokemon \n 5. Remove Pokemon "
    );
    //USER INPUT - SELECTION = INPUT
    if (selection >= 1 && selection <= 5) {
      invalidSelection = false;
    } else console.log("Invalid Input.");
  }
  return selection;
};

Battle.prototype.attack = function (trainer1, trainer2) {
  currentPokemonTrainer1 = trainer1.pokemonInventory[trainer1.currentPokemon];
  currentPokemonTrainer2 = trainer2.pokemonInventory[trainer1.currentPokemon];
  let trainerOneDamage = this.damageCalculator(trainer1, trainer2);
  
  //is Pokemon dead? If so, call 
};

Battle.prototype.damageCalculator = function (trainer1, trainer2) {
  currentPokemonTrainer1 = trainer1.pokemonInventory[trainer1.currentPokemon];
  currentPokemonTrainer2 = trainer2.pokemonInventory[trainer1.currentPokemon];

  //calculate base damage
  let baseDamage = currentPokemonTrainer1.damage;

  //
  console.log(`${currentPokemonTrainer1.name} attacks ${currentPokemonTrainer2.name} with ${currentPokemonTrainer1.move}`);

  //calculate damage modifiers
  if (currentPokemonTrainer1.type === currentPokemonTrainer2.weakness) {
    console.log(
      `${currentPokemonTrainer2.name} is weak against ${currentPokemonTrainer1.type}`
    );
    console.log(`${currentPokemonTrainer1.move} is super effective !!!`);
    baseDamage *= 2;
  } else if (currentPokemonTrainer1.type === currentPokemonTrainer2.strength) {
    console.log(
      `${currentPokemonTrainer2.name} is resistant against ${currentPokemonTrainer1.type}`
    );
    console.log(`${currentPokemonTrainer1.move} is not very effective ...`);
    baseDamage *= 0.5;
  }
  //factor in defending pokemons defense status
  if (trainer1.defendStatus == true) {
    console.log(`${currentPokemonTrainer2.name} is defending !!! Damage reduced
           by 50%`);
    baseDamage *= 0.5;
  }

  //calculate critical hit
  let criticalHit = this.numberRandomiser();
  if (criticalHit == true) {
    console.log(`${currentPokemonTrainer1.name} does a CRITICAL hit !!!`);
    baseDamage *= 2;
  }
  //return rounded final damage calculation
  baseDamage = Math.round(baseDamage);
  console.log(`${currentPokemonTrainer1.name} hits you for ${baseDamage}`);
  return baseDamage;
};

Battle.prototype.defend = function (trainer) {
  console.log(
    `Your current Pokemon ${
      trainer.pokemonInventory[trainer.currentPokemon].name
    } is now defending!`
  );
  trainer.defendStatus = true;
};

module.exports = { Battle };

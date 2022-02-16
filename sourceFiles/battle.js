/** @format */

const { optionSelect } = require('./utilities');

const { Trainer } = require('../sourceFiles/trainer.js');

function Battle(trainer1, trainer2) {
  this.endGame = false;
  this.player1 = trainer1;
  this.player2 = trainer2;
  this.winner = null;
  this.loser = null;
}

Battle.prototype.gameLoop = function () {
  this.whoGoesFirst();
  while (this.endGame === false) {
    //reset defence flag player 1
    this.player1.defendStatus = false;
    if (this.playerTurn(this.player1, this.player2) === false) {
      //reset defence flag player 2
      this.player2.defendStatus = false;
      this.playerTurn(this.player2, this.player1);
    }
  }
  console.log(`\n${this.winner} has defeated ${this.loser}`);
  return true;
};

Battle.prototype.playerTurn = function (trainer1, trainer2) {
  //WILL BE CALLED BY GAMELOOP - NO NEED FOR THIS OUTSIDE OF UNIT TESTING
  //   "Please choose an action: \n\n 1. Attack \n 2. Defend \n 3. Switch Pokemon \n 4. Catch Pokemon \n 5. Remove Pokemon "
  console.log(`\nIt is now ${trainer1.name}'s turn !!!`);
  let options =
    '\nPlease select from the following options: \n\n 1. Attack \n 2. Defend \n 3. Change current Pokemon \n 4. Catch new Pokemon \n 5. Remove Pokemon \n';
  let selection = optionSelect(options, 1, 5);
  console.log(`\nYou have selected option ${selection}`);

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
      //if inventory is full -> MENU
      let validSelection4 = trainer1.catchPokemon();
      if (validSelection4 === false) {
        this.playerTurn(trainer1, trainer2);
      }
      break;
    case 5:
      //if invalid selection -> MENU
      let validSelection5 = trainer1.removePokemon();
      if (validSelection5 === false) {
        this.playerTurn(trainer1, trainer2);
      }
      break;
    default:
    // code block
  }

  if (trainer2.playerDefeated === true) {
    this.endGame = true;
    this.winner = trainer1.name;
    this.loser = trainer2.name;
    return true;
  } else return false;
};

Battle.prototype.whoGoesFirst = function () {
  let firstPlayer = this.numberRandomiser();
  if (firstPlayer === false) {
    console.log(`\n${this.player2.name} is pre-emptive and attacks first!`);
    let temp = this.player2;
    this.player2 = this.player1;
    this.player1 = temp;
  } else {
    console.log(`\n${this.player1.name} is pre-emptive and attacks first!`);
  }
};

//Used to determine which player goes first and whether critical hit
Battle.prototype.numberRandomiser = function () {
  let randomNumber = Math.round(Math.random());
  if (randomNumber === 1) return true;
  else return false;
};

//TEST THIS FUNCTION
Battle.prototype.attack = function (trainer1, trainer2) {
  currentPokemonTrainer2 = trainer2.pokemonInventory[trainer2.currentPokemon];
  let trainerOneDamage = this.damageCalculator(trainer1, trainer2);
  currentPokemonTrainer2.hitPoints -= trainerOneDamage;
  if (currentPokemonTrainer2.hitPoints <= 0) {
    trainer2.pokemonDefeated();
  } else {
    console.log(
      `\n${currentPokemonTrainer2.name}'s new HP is ${currentPokemonTrainer2.hitPoints}`
    );
  }
};

Battle.prototype.damageCalculator = function (trainer1, trainer2) {
  currentPokemonTrainer1 = trainer1.pokemonInventory[trainer1.currentPokemon];
  currentPokemonTrainer2 = trainer2.pokemonInventory[trainer2.currentPokemon];

  //calculate base damage
  let baseDamage = currentPokemonTrainer1.damage;

  //Announce who is attacking who with what move
  console.log(`${currentPokemonTrainer1.sound}`);
  console.log(
    `\n${currentPokemonTrainer1.name} attacks ${currentPokemonTrainer2.name} with ${currentPokemonTrainer1.move}`
  );

  //calculate damage modifiers
  if (currentPokemonTrainer1.type === currentPokemonTrainer2.weakness) {
    console.log(
      `\n${currentPokemonTrainer2.name} is weak against ${currentPokemonTrainer1.type}`
    );
    console.log(`\n${currentPokemonTrainer1.move} is super effective !!!`);
    baseDamage *= 2;
  } else if (currentPokemonTrainer1.type === currentPokemonTrainer2.strength) {
    console.log(
      `\n${currentPokemonTrainer2.name} is resistant against ${currentPokemonTrainer1.type}`
    );
    console.log(`\n${currentPokemonTrainer1.move} is not very effective ...`);
    baseDamage *= 0.5;
  }
  //factor in defending pokemons defense status
  if (trainer1.defendStatus === true) {
    console.log(`\n${currentPokemonTrainer2.name} is defending !!! Damage reduced
           by 50%`);
    baseDamage *= 0.5;
  }

  //calculate critical hit
  let criticalHit = this.numberRandomiser();
  if (criticalHit == true) {
    console.log(`\n${currentPokemonTrainer1.name} does a CRITICAL hit !!!`);
    baseDamage *= 2;
  }
  //return rounded final damage calculation
  baseDamage = Math.round(baseDamage);
  console.log(
    `\n${currentPokemonTrainer1.name} hits ${currentPokemonTrainer2.name} for ${baseDamage}`
  );
  return baseDamage;
};

Battle.prototype.defend = function (trainer) {
  console.log(
    `\nYour current Pokemon ${
      trainer.pokemonInventory[trainer.currentPokemon].name
    } is now defending!`
  );
  trainer.defendStatus = true;
};

const trainer1 = new Trainer('Ash');
const trainer2 = new Trainer('Brock');
trainer1.trainerInitialisation();
trainer2.trainerInitialisation();
testBattle = new Battle(trainer1, trainer2);
//act
testBattle.gameLoop();

module.exports = { Battle };

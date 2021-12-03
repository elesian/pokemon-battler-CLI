const { Trainer } = require("../sourceFiles/trainer.js");

const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

const { Battle } = require("../sourceFiles/battle.js");
const { describe, expect } = require("@jest/globals");

describe("Test suite for Battle", () => {
  test("Battle accepts two trainers", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
  });
  test("Randomisation Function returns true ~50% of the time", () => {
    //arrange
    let zero = 0;
    let one = 0;
    //act
    testBattle = new Battle();
    for (let i = 0; i <= 1000; i++) {
      if (testBattle.numberRandomiser() === true) {
        one++;
      } else zero++;
    }
    //assert
    console.log((zero/1000)*100 + " %"); //returns ~50%
  });
    test('optionSelect should give a list of actions to the player ', () => {
        testBattle = new Battle();
        //act 
        testBattle.optionSelect();
    });

});

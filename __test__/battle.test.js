const { Trainer } = require("../sourceFiles/trainer.js");

const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

const { Battle } = require("../sourceFiles/battle.js");
const { describe, expect } = require("@jest/globals");

describe("Test suite for Battle", () => {
	let functionSpy = null;
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
    console.log((zero / 1000) * 100 + " %"); //returns ~50%
  });
  test("optionSelect() should give a list of actions to the player ", () => {
    testBattle = new Battle();
    //act
    testBattle.optionSelect();
  });
  test("optionSelect() should return user input selection", () => {
    testBattle = new Battle();
    //act
    //assert
    expect(testBattle.optionSelect(1)).toEqual(1);
  });
  test("optionSelect() should return only 1 to 5", () => {
    //act
    testBattle = new Battle();
    //act
    //assert
    expect(testBattle.optionSelect(1)).toEqual(1);
    expect(testBattle.optionSelect(5)).toEqual(5);
    //infinite loop testing - can be seen by running testBattle.optionSelect(0) - robust way to test this?

  });
  test("whoGoesFirst() should swap trainers if numberRandomiser() is false", () => {
    //act
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
		testBattle = new Battle(trainer1, trainer2);
		//mock function setup
		functionSpy = jest.spyOn(testBattle, 'numberRandomiser');
		functionSpy.mockReturnValue(false);
		testBattle.whoGoesFirst();
		expect(testBattle.player1.name).toEqual("Brock");
		expect(testBattle.player2.name).toEqual("Ash");
		functionSpy.mockRestore();
  });
	test("whoGoesFirst() should NOT swap trainers if numberRandomiser() is true", () => {
    //act
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
		testBattle = new Battle(trainer1, trainer2);
		//mock function setup
		functionSpy = jest.spyOn(testBattle, 'numberRandomiser');
		functionSpy.mockReturnValue(true);
		testBattle.whoGoesFirst();
		expect(testBattle.player1.name).toEqual("Ash");
		expect(testBattle.player2.name).toEqual("Brock");
		functionSpy.mockRestore();
  });
	test('Calling defend should set current trainer defend flag to true', () => {
		const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
		trainer1.trainerInitialisation();
		trainer2.trainerInitialisation();
		testBattle = new Battle(trainer1, trainer2);
		testBattle.defend(trainer1);
		expect(testBattle.player1.defendStatus).toEqual(true);
		expect(testBattle.player2.defendStatus).toEqual(false);
	});
});

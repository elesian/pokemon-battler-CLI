const { Trainer } = require("../sourceFiles/trainer.js");
const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

const { Battle } = require("../sourceFiles/battle.js");
const { test, expect } = require("@jest/globals");
describe("Test suite for Battle", () => {
  let functionSpy = null;
  test("Battle accepts two trainers", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1);
    expect(testBattle.player1).not.toEqual(null);
    expect(testBattle.player2).not.toEqual(null);
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
    functionSpy = jest.spyOn(testBattle, "numberRandomiser");
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
    functionSpy = jest.spyOn(testBattle, "numberRandomiser");
    functionSpy.mockReturnValue(true);
    testBattle.whoGoesFirst();
    expect(testBattle.player1.name).toEqual("Ash");
    expect(testBattle.player2.name).toEqual("Brock");
    functionSpy.mockRestore();
  });
  test("Calling defend should set current trainer defend flag to true", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
    testBattle.defend(trainer1);
    expect(testBattle.player1.defendStatus).toEqual(true);
    expect(testBattle.player2.defendStatus).toEqual(false);
  });
  test("PlayerTurn() should return false if player is not defeated", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
    expect(testBattle.playerTurn(trainer1, trainer2)).toEqual(false);
  });
  test("PlayerTurn() should invoke defend() if optionSelect(2) is invoked within the function", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    //act
    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyDefend = jest.spyOn(testBattle, "defend");
    testBattle.playerTurn(trainer1, trainer2, 2);

    //assert
    expect(testBattle.player1.defendStatus).toEqual(true);
    expect(testBattle.player2.defendStatus).toEqual(false);
    expect(spyOptionSelect).toHaveBeenCalledTimes(1);
    expect(spyDefend).toHaveBeenCalledTimes(1);
  });
  test.only("PlayerTurn() should invoke switchPokemon() if optionSelect(3) is invoked within the function", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    //act
    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spySelectPokemom = jest.spyOn(testBattle.player1, "selectCurrentPokemon");
    spyDefend = jest.spyOn(testBattle, "defend");

    spyOptionSelect.mockReturnValueOnce(3).mockReturnValueOnce(2);
    spySelectPokemom.mockReturnValueOnce(true).mockReturnValueOnce(true);

    testBattle.playerTurn(trainer1, trainer2);
    //assert
    expect(spySelectPokemom).toHaveBeenCalledTimes(1);
    expect(spyOptionSelect).toHaveBeenCalledTimes(2);
    expect(spyDefend).toHaveBeenCalledTimes(1);
    expect(testBattle.player1.currentPokemon).toEqual(0);
  });
  test("PlayerTurn() should invoke catchPokemon() if optionSelect(4) is invoked within the function", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyCatchPokemon = jest.spyOn(testBattle.player1, "catchPokemon");

    spyOptionSelect.mockReturnValueOnce(4);
    spyCatchPokemon.mockReturnValueOnce(true);
    //act
    testBattle.playerTurn(trainer1, trainer2);

    //assert
    expect(spyOptionSelect).toHaveBeenCalledTimes(1);
    expect(spyCatchPokemon).toHaveBeenCalledTimes(1);
  });
  test("If PlayerTurn() invokes catchPokemon() and inventory is full, player can reselect from menu", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyCatchPokemon = jest.spyOn(testBattle.player1, "catchPokemon");

    spyOptionSelect.mockReturnValueOnce(4).mockReturnValueOnce(2);
    spyCatchPokemon.mockReturnValueOnce(false);
    //act
    testBattle.playerTurn(trainer1, trainer2);
    //assert
    expect(spyOptionSelect).toHaveBeenCalledTimes(2);
    expect(spyCatchPokemon).toHaveBeenCalledTimes(1);
  });
  test("PlayerTurn() should invoke removePokemon() if optionSelect(5) is invoked within the function", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyRemovePokemon = jest.spyOn(testBattle.player1, "removePokemon");

    spyOptionSelect.mockReturnValueOnce(5);
    spyRemovePokemon.mockReturnValueOnce(true);
    //act
    testBattle.playerTurn(trainer1, trainer2);
    //assert
    expect(spyOptionSelect).toHaveBeenCalledTimes(1);
    expect(spyRemovePokemon).toHaveBeenCalledTimes(1);
  });
  test("If PlayerTurn() invokes removePokemon() and inventory is full, player can select", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyRemovePokemon = jest.spyOn(testBattle.player1, "removePokemon");

    spyOptionSelect.mockReturnValueOnce(5).mockReturnValueOnce(2);
    spyRemovePokemon.mockReturnValueOnce(false).mockReturnValueOnce(true);
    //act
    testBattle.playerTurn(trainer1, trainer2);
    //assert
    expect(spyOptionSelect).toHaveBeenCalledTimes(2);
    expect(spyRemovePokemon).toHaveBeenCalledTimes(1);
  });
  test("PlayerTurn() should invoke removePokemon() if optionSelect(1) is invoked within the function", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyOptionSelect.mockReturnValue(1);
    spyAttack = jest.spyOn(testBattle, "attack");

    //act
    testBattle.playerTurn();
    expect(spyOptionSelect).toHaveBeenCalledTimes(1);
    expect(spyAttack).toHaveBeenCalledTimes(1);
  });
});

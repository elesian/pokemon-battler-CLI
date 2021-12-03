const { expect } = require("@jest/globals");
const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

const { Trainer } = require("../sourceFiles/trainer.js");

describe("Test suite for Trainer", () => {
  test("Trainer returns an object", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    //assert
    expect(typeof testTrainer).toEqual("object");
  });
  test("Trainer defaults to name of Ash", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    //assert
    expect(testTrainer.name).toEqual("Ash");
  });
  test("Trainer name can be specified", () => {
    //arrange
    const testTrainer = new Trainer("Misty");
    //act
    //assert
    expect(testTrainer.name).toEqual("Misty");
  });
  test("Trainer defaults to empty pokemon inventory and current pokemon is null", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    //assert
    expect(testTrainer.pokemonInventory).toEqual([]);
    expect(testTrainer.currentPokemon).toEqual(null);
  });

  test("Trainer intialisation results in an inventory of six pokemon", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    //assert
    expect(testTrainer.pokemonInventory.length).toEqual(6);
  });
  test("Trainer can select the pokemon of their choice", () => {
    //arrange
    const testTrainerOne = new Trainer();
    const testTrainerTwo = new Trainer();
    //act
    testTrainerOne.trainerInitialisation();
    const selectionReturnOne = testTrainerOne.selectCurrentPokemon(3);
    testTrainerTwo.trainerInitialisation();
    const selectionReturnTwo = testTrainerTwo.selectCurrentPokemon(7);
    //assert
    expect(selectionReturnOne).toEqual(true);
    expect(selectionReturnTwo).toEqual(false);
  });
  test("Trainer initialisation also requires initial Pokemon selection", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    //assert
    expect(testTrainer.currentPokemon).toEqual(0);
  });
  test("RemovePokemon() reduces size of inventory of Pokemon by 1", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.removePokemon();
    //assert
    expect(testTrainer.pokemonInventory.length).toEqual(5);
  });
  test("RemovePokemon() cannot reduce the size of inventory to less than 1 ", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.removePokemon();
    for (let i = 0; i < 10; i++) {
      testTrainer.removePokemon();
    }
    expect(testTrainer.pokemonInventory.length).toEqual(1);
  });
  test("If current pokemon is removed, invoke selectCurrentPokemon() and select new Pokemon", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.selectCurrentPokemon(3);
    //test case that current Pokemon is removed
    testTrainer.removePokemon(3);
    //assert
    expect(testTrainer.pokemonInventory.length).toEqual(5);
    expect(testTrainer.currentPokemon).toEqual(0);
  });
  test("If slot greater than current Pokemon is removed, current Pokemon index should remain the same ", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.selectCurrentPokemon(3);
    //test case that current Pokemon is removed
    testTrainer.removePokemon(4);
    expect(testTrainer.pokemonInventory.length).toEqual(5);
    expect(testTrainer.currentPokemon).toEqual(3);
  });
  test("If slot less than current Pokemon is removed, current Pokemon index should decrease by one", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.selectCurrentPokemon(3);
    //test case that current Pokemon is removed
    testTrainer.removePokemon(2);
    expect(testTrainer.pokemonInventory.length).toEqual(5);
    expect(testTrainer.currentPokemon).toEqual(2);
  });
  test("It is not possible to catch a Pokemon if Inventory full", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    const inventoryFull = testTrainer.catchPokemon();
    expect(inventoryFull).toEqual(false);
  });
  test("It is possible to catch a Pokemon if Inventory is not full", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.removePokemon();
    testTrainer.removePokemon();
    expect(testTrainer.pokemonInventory.length).toEqual(4);
    testTrainer.catchPokemon();
    const catchAttempt = testTrainer.catchPokemon();
    expect(testTrainer.pokemonInventory.length).toBeGreaterThanOrEqual(4);
    expect(catchAttempt).toEqual(true);
  });
  test("If Pokemon is defeated, remove from inventory", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.pokemonDefeated();
    testTrainer.pokemonDefeated();
    expect(testTrainer.pokemonInventory.length).toEqual(4);
  });
  test("If Pokemon is defeated, should call selectCurrentPokemon", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.pokemonDefeated();
    testTrainer.pokemonDefeated();
    expect(testTrainer.pokemonInventory.length).toEqual(4);
    expect(testTrainer.currentPokemon).toEqual(0);
  });
  test("If Pokemon is defeated, pokemonInventoryMaxSize is decreased by one", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.pokemonDefeated();
    testTrainer.pokemonDefeated();
    expect(testTrainer.pokemonInventory.length).toEqual(4);
    expect(testTrainer.pokemonInventoryMaxSize).toEqual(4);
  });
  test("If ALL Pokemon are defeated, status of player is defeated", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.pokemonDefeated();
    testTrainer.pokemonDefeated();
    testTrainer.pokemonDefeated();
    testTrainer.pokemonDefeated();
    testTrainer.pokemonDefeated();
    expect(testTrainer.pokemonInventory.length).toEqual(1);
    expect(testTrainer.currentPokemon).toEqual(0);
    expect(testTrainer.playerDefeated).toEqual(false);
    //player is now defeated.
    testTrainer.pokemonDefeated();
    expect(testTrainer.playerDefeated).toEqual(true);
  });
});

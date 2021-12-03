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
  test("Trainer defaults to empty pokemon inventory and current pokemon is null", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    //assert
    expect(testTrainer.pokemonInventory).toEqual([]);
    expect(testTrainer.currentPokemon).toEqual({});
  });
  test("Trainer name can be specified", () => {
    //arrange
    const testTrainer = new Trainer("Misty");
    //act
    //assert
    expect(testTrainer.name).toEqual("Misty");
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
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.selectCurrentPokemon();
    //assert
    expect(Object.values(testTrainer.currentPokemon)[0]).toEqual(
      testTrainer.pokemonInventory[0].name
    );
  });
  test("Trainer initialisation also requires initial Pokemon selection", () => {
    //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    //assert
    expect(Object.values(testTrainer.currentPokemon)[0]).toEqual(
      testTrainer.pokemonInventory[0].name
    );
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
  test("Remove Function should make an empty ", () => {});
  test("Remove Function should call select function if 'current' Pokemon is removed", () => {});
});

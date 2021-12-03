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
    expect(selectionReturnOne).toEqual(`Your current Pokemon is slot 3 : ${Object.values(testTrainerOne.pokemonInventory[4])[0]}`);
    expect(selectionReturnTwo).toEqual("Invalid Selection");
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
  test('If current pokemon is removed, call selection and select new Pokemon', () => {
      //arrange
    const testTrainer = new Trainer();
    //act
    testTrainer.trainerInitialisation();
    testTrainer.removePokemon(); 
  });

});

const { expect } = require("@jest/globals");
const {
  Pokemon,
  pokemonData,
  randomizePokemon,
} = require("../sourceFiles/pokemon.js");

describe("Test suite for creating Pokemon", () => {
  test("Returns an object", () => {
    //arrange
    const testPokemon = new Pokemon();
    //act
    //assert
    expect(typeof testPokemon).toEqual("object");
  });
  test("Instance of pokemon has specified properties", () => {
    const pokemonParameters = pokemonData["eeveeObj"];
    const testPokemon = new Pokemon(pokemonParameters);
    console.log(testPokemon);
    expect(testPokemon.hasOwnProperty("name")).toEqual(true);
    expect(testPokemon.hasOwnProperty("type")).toEqual(true);
    expect(testPokemon.hasOwnProperty("hitPoints")).toEqual(true);
    expect(testPokemon.hasOwnProperty("move")).toEqual(true);
    expect(testPokemon.hasOwnProperty("damage")).toEqual(true);
    expect(testPokemon.hasOwnProperty("strength")).toEqual(true);
    expect(testPokemon.hasOwnProperty("weakness")).toEqual(true);
    expect(testPokemon.hasOwnProperty("defend")).toEqual(true);
		expect(testPokemon.hasOwnProperty("sound")).toEqual(true)

  });
  test("Instance of pokemon stores passed parameters from pokemonDatabase ", () => {
    //arrange
    const pokemonParameters = pokemonData["eeveeObj"];
    //act
    const testPokemon = new Pokemon(pokemonParameters);
    //assert
    expect(testPokemon.propertyValues()).toEqual(
      Object.values(pokemonParameters)
    );
  });
  test("Randomise function that returns a random pokemon", () => {
    //arrange
    const pokemonDataTable = pokemonData;
    //act
    let returnPokemon = randomizePokemon(pokemonDataTable);
    //assert
    let found = false;
    for (key in pokemonDataTable) {
      if (key == returnPokemon["name"]);
      found = true;
    }
    expect(typeof returnPokemon).toEqual("object");
    expect(found).toEqual(true);
  });
  test("Is correct Pokemon sound returned?", () => {
    //arrange
    const eeveeData = pokemonData["eeveeObj"];
    const eeveePokemon = new Pokemon(eeveeData);
    const squirtleData = pokemonData["squirtleObj"];
    const squirtlePokemon = new Pokemon(squirtleData);
    //act
    expect(eeveePokemon.talk()).toEqual("Eev...Eevee!");
    expect(squirtlePokemon.talk()).toEqual("Squ... Squirtle!");
  });
  test("Is correct Pokemon move returned?", () => {
    //arrange
    const eeveeData = pokemonData["eeveeObj"];
    const eeveePokemon = new Pokemon(eeveeData);
    const squirtleData = pokemonData["squirtleObj"];
    const squirtlePokemon = new Pokemon(squirtleData);
    //act
    expect(eeveePokemon.useYourMoves()).toEqual("HEADBUTT");
    expect(squirtlePokemon.useYourMoves()).toEqual("SURF");
  });
});

const { Pokemon, pokemonData } = require("../sourceFiles/pokemon.js");

describe("Test suite for creating Pokemon", () => {
	test("Returns an empty object", () => {
		//arrange
		const testPokemon = new Pokemon();
		//act
		//assert
		expect(typeof testPokemon).toEqual("object");
	})
	test("Instance of pokemon has specified properties", () => {
		const testPokemon = new Pokemon();
		expect(testPokemon.hasOwnProperty("name")).toEqual(true);
		expect(testPokemon.hasOwnProperty("hitPoints")).toEqual(true);
		expect(testPokemon.hasOwnProperty("type")).toEqual(true);
		expect(testPokemon.hasOwnProperty("sound")).toEqual(true);
		expect(testPokemon.hasOwnProperty("move")).toEqual(true);
});
test("Instance of pokemon stores passed parameters ", () => {
	//arrange
	const pokemonDataTable = pokemonData;
	console.log(pokemonDataTable);


});

});



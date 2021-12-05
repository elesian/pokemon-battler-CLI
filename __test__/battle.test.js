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
  test("PlayerTurn() should invoke switchPokemon() if optionSelect(3) is invoked within the function", () => {
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
  test("PlayerTurn() should invoke attack() if optionSelect(1) is invoked within the function", () => {
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
    testBattle.playerTurn(trainer1, trainer2);
    expect(spyOptionSelect).toHaveBeenCalledTimes(1);
    expect(spyAttack).toHaveBeenCalledTimes(1);
  });
  test("Damage calculator returns a damage amount", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
    const returnDamage = testBattle.damageCalculator(trainer1, trainer2);
    expect(typeof returnDamage).toEqual("number");
    expect(returnDamage).toBeGreaterThan(0);
  });
  test("Damage calculator returns a damage amount modified by criticals and damage modifiers", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    spyCriticalHit = jest.spyOn(testBattle, "numberRandomiser");
    //CRITCAL SET TO ON
    spyCriticalHit.mockReturnValue(true);

    const returnDamage = testBattle.damageCalculator(trainer1, trainer2);
    //return Critical AND defending pokemon is WEAK against attacking Pokemon
    if (
      trainer1.pokemonInventory[trainer1.currentPokemon].type ===
      trainer2.pokemonInventory[trainer2.currentPokemon].weakness
    ) {
      expect(returnDamage).toEqual(
        4 * trainer1.pokemonInventory[trainer1.currentPokemon].damage
      );
    }
    //return Critical AND defending pokemon is STRONG against attacking Pokemon
    else if (
      trainer1.pokemonInventory[trainer1.currentPokemon].type ===
      trainer2.pokemonInventory[trainer2.currentPokemon].strength
    ) {
      expect(returnDamage).toEqual(
        trainer1.pokemonInventory[trainer1.currentPokemon].damage
      );
    } else
      expect(returnDamage).toEqual(
        2 * trainer1.pokemonInventory[trainer1.currentPokemon].damage
      );
  });
  test("Damage calculator returns a damage amount modified by defenders defend status", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    trainer1.defendStatus = false;
    trainer2.defendStatus = true;
    testBattle = new Battle(trainer1, trainer2);

    spyCriticalHit = jest.spyOn(testBattle, "numberRandomiser");
    //CRITICAL SET TO OFF
    spyCriticalHit.mockReturnValue(false);

    const returnDamage = testBattle.damageCalculator(trainer1, trainer2);

    //return defending pokemon is WEAK against attacking Pokemon AND defending
    if (
      trainer1.pokemonInventory[trainer1.currentPokemon].type ===
      trainer2.pokemonInventory[trainer2.currentPokemon].weakness
    ) {
      expect(returnDamage).toEqual(
        Math.round(
          2 * trainer1.pokemonInventory[trainer1.currentPokemon].damage
        )
      );
    }
    //return defending pokemon is STRONG against attacking Pokemon AND defending
    else if (
      trainer1.pokemonInventory[trainer1.currentPokemon].type ===
      trainer2.pokemonInventory[trainer2.currentPokemon].strength
    ) {
      expect(returnDamage).toEqual(
        Math.round(
          0.5 * trainer1.pokemonInventory[trainer1.currentPokemon].damage
        )
      );
    } else
      expect(returnDamage).toEqual(
        Math.round(
          1 * trainer1.pokemonInventory[trainer1.currentPokemon].damage
        )
      );
  });
  test("Attack successfully reduces defenders hitpoints", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
    let beforeHP = trainer2.pokemonInventory[trainer2.currentPokemon].hitPoints;
    //act
    testBattle.attack(trainer1, trainer2);
    let afterHP = trainer2.pokemonInventory[trainer2.currentPokemon].hitPoints;
    expect(afterHP).toBeLessThan(beforeHP);
  });
  test("If a Pokemon is defeated, attack will call pokemonDefeated()", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
    spyDefeatedPokemon = jest.spyOn(trainer2, "pokemonDefeated");
    //arrange
    //Invoke attack function until defender HP <= 0
    while (trainer2.pokemonInventory[trainer2.currentPokemon].hitPoints > 0) {
      testBattle.attack(trainer1, trainer2);
    }
    //assert
    expect(spyDefeatedPokemon).toHaveBeenCalled();
  });
  test("GameLoop returns a victory message", () => {
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);

    spyWhoGoesFirst = jest.spyOn(testBattle, "whoGoesFirst");
    testBattle.endGame = true;
    let exitGameLoop = testBattle.gameLoop();
    expect(exitGameLoop).toEqual(true);
    expect(spyWhoGoesFirst).toHaveBeenCalledTimes(1);
  });
  test("GameLoop returns a victory message when a player is defeated", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
    //act
    spyWhoGoesFirst = jest.spyOn(testBattle, "whoGoesFirst");
    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyNumberRandomiser = jest.spyOn(testBattle, "numberRandomiser");
    spyNumberRandomiser.mockReturnValue(true);
    spyOptionSelect.mockReturnValue(1);
    trainer2.playerDefeated = true;
    testBattle.gameLoop();
  });
  test("GameLoop correctly loops and returns winner", () => {
    //arrange
    const trainer1 = new Trainer("Ash");
    const trainer2 = new Trainer("Brock");
    trainer1.trainerInitialisation();
    trainer2.trainerInitialisation();
    testBattle = new Battle(trainer1, trainer2);
    //act
    spyOptionSelect = jest.spyOn(testBattle, "optionSelect");
    spyNumberRandomiser = jest.spyOn(testBattle, "numberRandomiser");
    spyNumberRandomiser.mockReturnValue(true);
    spyOptionSelect.mockReturnValue(1);
    testBattle.gameLoop();
  });
});

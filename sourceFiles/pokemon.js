function Pokemon() {

    this.name = null;
    this.hitPoints = 0;
    this.type = null;
    this.sound = null;
    this.move = null


   
}


Pokemon.prototype.talk = function() {
    return this.sound;
  } 

Pokemon.prototype.useYourMoves = function() {
    return this.move;
  } 


const pokemonData = {};
pokemonData.eveeObjeveeObj = {name : "Eevee", type : "normal", hitPoints : 55, move : "headbutt", damage : "18", strength : "none", weakness : "fighting", sound : "Eev...Eevee!"}

pokemonData.flareonObj = {name : "Flareon", type : "fire", hitPoints : 65, move : "fireblast", damage : "20", strength : "grass", weakness : "water", sound : "EFla... Flareon!"}

pokemonData.vaporeonObj = {name : "Eevee", type : "water", hitPoints : 70, move : "hydro pump", damage : "19", strength : "fire", weakness : "grass", sound : "Vap... Vaporeon!"}

pokemonData.leafeonObj = {name : "Leafeon", type : "grass", hitPoints : 65, move : "giga drain", damage : "17", strength : "water", weakness : "fire", sound : "Lea... Leafeon!"}

pokemonData.charmanderObj = {name : "Charmander", type : "fire", hitPoints : 44, move : "flamethrower", damage : "17", strength : "grass", weakness : "water", sound : "Cha... Charmander!"}

pokemonData.squirtleObj = {name : "Squirtle", type : "water", hitPoints : 44, move : "surf", damage : "16", strength : "fire", weakness : "grass", sound : "Squ... Squirtle!"}

pokemonData.bulbasaurObj = {name : "Bulbasaur", type : "grass", hitPoints : 45, move : "razor leaf", damage : "16", strength : "water", weakness : "fire", sound : "Bul... Bulbasaur!"}

module.exports = { Pokemon, pokemonData };
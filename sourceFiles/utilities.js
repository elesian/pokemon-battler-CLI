/** @format */

//selection variable for testing purposes; to be overriden with UI
const prompt = require('prompt-sync')();

const optionSelect = (options, min, max) => {
  let input = null;
  let invalidInput = true;
  while (invalidInput === true) {
    if (options) {
      console.log(options);
    }
    input = prompt();
    //USER INPUT - SELECTION = INPUT
    if (parseInt(input) >= min && parseInt(input) <= max) {
      return parseInt(input);
    } else {
      console.log('\nInvalid Choice, please select again \n');
    }
  }
};

module.exports = { optionSelect };

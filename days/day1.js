function findFirstNumberInString(str){
    return str.match(/\d+/).join().split('')[0];
}

function findLastNumberInString(str){
    return str.match(/\d+/g).join().split('').reverse()[0];
}

function isStringANumber(str){
    return !isNaN(str);
}

const TextToNumberMap = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
}
const textNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function isStringANumberText(str){
    const numberFound = textNumbers.find(textNumber => str.startsWith(textNumber));
    if (numberFound){
        return TextToNumberMap[numberFound];
    }
    return false;
}

function findFirstAndLastNumbersInString(str){
    const allNumbers = [];
    for (let i = 0; i < str.length; i++){
        if (isStringANumber(str[i])){
            allNumbers.push(str[i]);
        } else {
            const textNumberFound = isStringANumberText(str.substring(i));
            if (textNumberFound){
                allNumbers.push(textNumberFound);
            }
        }
    }
    return eval(`${allNumbers[0]}`+`${allNumbers[allNumbers.length - 1]}`);
}

const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');
const { findFirstAndLastNumbersInString } = require('./days/day1');

const arrayOfNumbers = [];

async function processLineByLine() {
  const fileStream = fs.createReadStream('calibrationCodes.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const list = [];
  for await (const line of rl) {
    list.push(line);
  }
  list.forEach((item)=>{
    arrayOfNumbers.push(findFirstAndLastNumbersInString(item));
  });

  console.log(_.sum(arrayOfNumbers));
}

processLineByLine();
const { processLineByLine } = require('../common');

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

function getPointsOfGame(str){
    let points = 0;
    const gameWinners = str.split(':')[1].split('|')[0].trim().split(' ').map((string)=> eval(string));
    const gottenNumbers = str.split(':')[1].split('|')[1].trim().split(' ').map((string)=> eval(string));

    let numbersMatched = gameWinners.filter((number)=> number && gottenNumbers.includes(number));
    numbersMatched = removeDuplicates(numbersMatched);

    if (numbersMatched.length){
        points += 2**(numbersMatched.length-1);
    }

    return { matches: numbersMatched.length, points, copies:0}
}

async function partOne(){
    const lines = (await processLineByLine('scratch'));
    let points = 0;

    for (i in lines){
        const scoreOfCard = getPointsOfGame(lines[i]);
        points+= scoreOfCard.points;
    }
    console.log(points);
}

async function partTwo(){
    const lines = (await processLineByLine('scratch'));
    const mappingOfCardScores = {};
    let numberOfCopies = 0;
    let originalCards = 0;

    // retrieve all points and matches per card game
    for (i in lines){
        const scoreOfCard = getPointsOfGame(lines[i]);
        mappingOfCardScores[i] = scoreOfCard;
        originalCards++;
    }

    // retrieve all won copies
    for (key in mappingOfCardScores){
        const matches = mappingOfCardScores[key].matches;
        const copies = mappingOfCardScores[key].copies;

        for (let j=eval(key)+1; j <= matches+eval(key); j++){
            mappingOfCardScores[j].copies += 1 + copies;

        }

        numberOfCopies += copies;
    }

    console.log(numberOfCopies + originalCards);
}

(async function () {
    // await partOne();

    await partTwo();
})();
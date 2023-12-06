const { processLineByLine } = require('../common');
const _ = require('lodash');

function adjacentIndeces(indexStart, indexEnd, indexRow, rows){
    const positionsToCheck = [];

    // left and right; same row
    positionsToCheck.push([indexRow, indexStart -1]);
    positionsToCheck.push([indexRow, indexEnd + 1]);
    
    const indexBottomRow = indexRow + 1;
    const indexTopRow = indexRow - 1;

    let iterate = indexStart - 1;
    while (iterate <= indexEnd + 1){
        positionsToCheck.push([indexBottomRow, iterate]);
        positionsToCheck.push([indexTopRow, iterate]);
        iterate++;
    }
    return positionsToCheck;
}

function isPositionASpecialCharacter(position, rows){
    const char = rows[position[0]]?.[position[1]] ?? '.';
    return char !== '.' && isNaN(char);
}

async function main(){
    const lines = (await processLineByLine('engineCodes'));
    const foundNumbers = [];
    const gears = {};

    for (let i in lines){
        const line = lines[i];
        let nextIndex = 0;
        let numbers = line.match(/\d+/g);
        while (numbers.length) {
            const numberToCheck = numbers.shift();
            const startIndex = line.indexOf(numberToCheck, nextIndex);
            const endIndex = startIndex + numberToCheck.length - 1;
            nextIndex = endIndex;
            const positionsToCheck = adjacentIndeces(startIndex, endIndex, eval(i), lines);
            
            // is engine part (part 1)
            if (!!positionsToCheck.find((position)=> isPositionASpecialCharacter(position, lines))){
                foundNumbers.push(eval(numberToCheck));
            }
            // is gear part (part 2)
            positionsToCheck.forEach((position)=>{
                const char = lines[position[0]]?.[position[1]] ?? '.';
                if (char === '*'){
                    gears[position] = gears[position] ?? [];
                    gears[position].push(numberToCheck);
                }
            });
        }
    }
    let sumOfGears = 0;
    _.values(gears).forEach((gear)=> {
        if (gear.length > 1){
            sumOfGears += _.multiply(...gear.map((g)=> eval(g)));
        }
    });

    console.log(sumOfGears);
    console.log(_.sum(foundNumbers));
}

(async function () {
    await main();
})();
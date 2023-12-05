const { processLineByLine } = require('../common');

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

(async function () {
    const lines = (await processLineByLine('engineCodes'));
    const foundNumbers = [];

    for (i in lines){
        const line = lines[i];
        let nextIndex = 0;
        let numbers = line.match(/\d+/g);
        while (numbers.length) {
            const numberToCheck = numbers.shift();
            const startIndex = line.indexOf(numberToCheck, nextIndex);
            const endIndex = startIndex + numberToCheck.length;
            nextIndex = endIndex;

            const positionsToCheck = adjacentIndeces(startIndex, endIndex, eval(i), lines);
            
            // is engine part
            if (!!positionsToCheck.find((position)=> isPositionASpecialCharacter(position, lines))){
                foundNumbers.push(numberToCheck);
            }
        }
    }
    console.log(foundNumbers);
})();
const { processLineByLine } = require("../common");
const _ = require('lodash');

AMOUNT_OF_EMPTY = 1000000;

(async function main(){
    let lines = await processLineByLine('galaxies');
    lines = lines.map((line) => line.split(''));

    const columnsToNotExpand = [];
    const rowsToExpand = [];

    // expend rows and columns without galaxies
    // get all expandable columns & rows
    for (let rowIndex=0; rowIndex < lines.length; rowIndex++){
        const row = lines[rowIndex];
        if (!row.includes('#')){
            rowsToExpand.push(rowIndex);
        }
        for (let column=0; column < row.length; column++){
            if (row[column] === '#'){
                columnsToNotExpand.push(column);
                continue;
            }
        }
    };

    const columnsToExpand = lines[0].map((_, index) => index).filter((column) => !columnsToNotExpand.includes(column));

    // get all the galaxy coordinates
    const coordinatesOfGalaxies = [];
    for (let row=0; row < lines.length; row++){
        for (let column=0; column < lines[row].length; column++){
            if (lines[row][column] === '#'){
                coordinatesOfGalaxies.push([row, column]);
            }
        }
    };

    const copyOfCoordinates = _.cloneDeep(coordinatesOfGalaxies);

    // go over all the coordinates and their shortest distance and add it to the total array
    const total = [];
    for (let index=0; index < coordinatesOfGalaxies.length; index++){
        const [row, column] = coordinatesOfGalaxies[index];
        for (let index2=0; index2 < copyOfCoordinates.length; index2++){
            const [row2, column2] = copyOfCoordinates[index2];
            if (row === row2 && column === column2){
                continue;
            }
            const amountOfExpandedColumns = columnsToExpand.filter((columnToExpand) => (columnToExpand > column && columnToExpand < column2) || columnToExpand < column && columnToExpand > column2).length;
            const amountOfExpandedRows = rowsToExpand.filter((rowToExpand) => (rowToExpand > row && rowToExpand < row2) || rowToExpand < row && rowToExpand > row2).length;
            total.push((Math.abs(column2 - column) + (AMOUNT_OF_EMPTY-1) * amountOfExpandedColumns + Math.abs(row2 - row) + (AMOUNT_OF_EMPTY-1) * amountOfExpandedRows));
        }
        // so we dont check doubles
        copyOfCoordinates.shift();
    }

    console.log(_.sum(total));
})()
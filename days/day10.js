const { processLineByLine } = require("../common");

function positionOfS(pipes){
    let column = pipes.find((element)=> element.includes('S')).indexOf('S');
    let row = pipes.indexOf(pipes.find((element)=> element.includes('S')));
    return [row, column];
}

function connectedPipes(pipes, coordinates, pastCoordinates = []){
    const row = coordinates[0];
    const column = coordinates[1];
    const connected = [];
    const pipe = pipes[row][column];
    if (pipe === '-'){
        connected.push([row, column-1]);
        connected.push([row, column+1]);
    }
    if (pipe === '|'){
        connected.push([row-1, column]);
        connected.push([row+1, column]);
    }
    if (pipe === '7'){
        connected.push([row+1, column]);
        connected.push([row, column-1]);
    }
    if (pipe === 'L'){
        connected.push([row-1, column]);
        connected.push([row, column+1]);
    }
    if (pipe === 'J'){
        connected.push([row-1, column]);
        connected.push([row, column-1]);
    }
    if (pipe === 'F'){
        connected.push([row+1, column]);
        connected.push([row, column+1]);
    }
    return connected.filter((coordinates)=> !(coordinates[0] === pastCoordinates[0] && coordinates[1] === pastCoordinates[1]));
}

function connectingPipesToS(pipes, coordinatesOfS){
    const row = coordinatesOfS[0];
    const column = coordinatesOfS[1];

    const coordinatesToCheck = [
        [row-1, column],
        [row+1, column],
        [row, column-1],
        [row, column+1]
    ];

    return coordinatesToCheck.find((coordinates)=> connectedPipes(pipes, coordinates).some((connected)=> connected[0] === coordinatesOfS[0] && connected[1] === coordinatesOfS[1]));
}

(async function main(){
    const pipes = await processLineByLine('pipes');

    const startPosition = positionOfS(pipes);
    let positions = [startPosition];
    let nextPipe = connectingPipesToS(pipes, startPosition);

    while (nextPipe[0] !== startPosition[0] || nextPipe[1] !== startPosition[1]){
        nextPosition = connectedPipes(pipes, nextPipe, positions[0])[0];
        positions.unshift(nextPipe);

        nextPipe = nextPosition;
    }
    console.log(Math.ceil(positions.length/2));
})();
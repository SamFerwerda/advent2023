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
    const pipe = pipes?.[row]?.[column];
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

function isPartOfLoop(loop, coordinates){
    return loop.some((position)=> position[0] === coordinates[0] && position[1] === coordinates[1]);
}

function isSurrounded(pipes, loop, coordinates){
    const row = coordinates[0];
    const column = coordinates[1];
    
    // amount of walls in north 
    let amountOfWallsNorth = 0;
    let lastPipe = null;
    for (let i = row-1; i >= 0; i--){
        if (isPartOfLoop(loop, [i, column])){
            const currentPipe = pipes[i][column] === 'S' ? 'L' : pipes[i][column];
            if (currentPipe === '-'){
                amountOfWallsNorth++;
            }
            if (currentPipe === 'L' || currentPipe === 'J'){
                lastPipe = currentPipe;
            }
            if (currentPipe === '|'){
                continue;
            }
            if (currentPipe === '7'){
                if (lastPipe === 'L'){
                    amountOfWallsNorth++;
                } else {
                    amountOfWallsNorth+=2;
                }
                lastPipe = null;
            }
            if (currentPipe === 'F'){
                if (lastPipe === 'J'){
                    amountOfWallsNorth++;
                } else {
                    amountOfWallsNorth+=2;
                }
                lastPipe = null;
            }
        } else {
            lastPipe = null;
        }
    }
    if (amountOfWallsNorth % 2 === 0){
        return false;
    }
    return true;
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
    console.log(Math.ceil(positions.length/2)); // part 1

    let surrounded = 0;
    for (let i = 0; i < pipes.length; i++){
        for (let j = 0; j < pipes[i].length; j++){
            if (!isPartOfLoop(positions, [i, j]) && isSurrounded(pipes, positions, [i, j])){
                surrounded++;
            }
        }
    }

    console.log(surrounded); // part 2
})();
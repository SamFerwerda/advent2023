const { processLineByLine } = require("../common")
const { lcm } = require('mathjs')

function createMappingOfDirections(lines){
    const mapping = {};
    lines.forEach((line)=>{
        const name = line.split(' = ')[0];
        const [left, right] = line.split(' = ')[1].split(', ');
        mapping[name] = {'L': left.substring(1), "R": right.substring(0, 3)};
    });
    return mapping;

}

function getNextState(mapping, state, direction){
    return mapping[state][direction];
}

function part1(lines){
    const instructionString = lines.shift();
    const mapping = createMappingOfDirections(lines);

    let start = 0;
    let currentState = 'AAA';
    while (currentState !== 'ZZZ'){
        currentState = getNextState(mapping, currentState, instructionString[start%(instructionString.length)]);
        start++;
    }
    console.log(start);
}

function RunUntilCycleFound(mapping, state, instructionString){
    let start = 0;
    let currentState = state;
    let mappingOfEndStates = {};
    while (true){
        currentState = getNextState(mapping, currentState, instructionString[start%(instructionString.length)]);
        start++;
        if (currentState[2] == "Z"){
            if (mappingOfEndStates[currentState] !== undefined){
                // Ending state already found, calculating cycle length
                return start - mappingOfEndStates[currentState];
            }
            mappingOfEndStates[currentState] = start;
        }
    }
};

function part2(lines){
    const instructionString = lines.shift();
    const mapping = createMappingOfDirections(lines);

    const cycles = Object.keys(mapping).filter((state)=> state[2] === 'A').map((state)=> RunUntilCycleFound(mapping, state, instructionString));
    console.log(lcm(...cycles));
}

(async function main(){
    const lines = await processLineByLine('LR');
   
    // part1(lines);
    part2(lines);
})()
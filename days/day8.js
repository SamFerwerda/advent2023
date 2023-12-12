const { processLineByLine } = require("../common")

function createMappingOfDirections(lines){
    const mapping = {};
    lines.forEach((line)=>{
        const name = line.split(' = ')[0];
        const [left, right] = line.split(' = ')[1].split(', ');
        mapping[name] = {'L': left.substring(1), "R": right.substring(0, 3)};
    });
    return mapping;

}
(async function main(){
    const lines = await processLineByLine('LR');
    const instructionString = lines.shift();
    const mapping = createMappingOfDirections(lines);

    let startDirection = 0;
    let steps = 0;
    let currentState = 'AAA';
    while (currentState !== 'ZZZ'){
        const currentInstruction = instructionString[startDirection];
        const currentDirection = mapping[currentState][currentInstruction];
        currentState = currentDirection;
        startDirection++;
        steps++;
        // at the end of the string, return to start
        if (startDirection === instructionString.length){
            startDirection = 0;
        }
    }
    console.log(steps);
})()
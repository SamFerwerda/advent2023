const { processLineByLine } = require('../common');

const differentMaps = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location'];

function retrieveInformationFromLines(lines){
    const transitionMaps = {
        'seed-to-soil': [], 'soil-to-fertilizer': [], 'fertilizer-to-water':[], 'water-to-light':[], 'light-to-temperature':[], 'temperature-to-humidity':[], 'humidity-to-location':[]
    }

    const seeds = lines[0].split(':')[1].trim().split(' ');
    differentMaps.forEach((transition, index)=>{
        const nextTransition = differentMaps[index + 1] ?? 'does-not-exist';
        const transitionStartIndex = lines.indexOf(`${transition} map:`);
        const transitionEndIndex = lines.indexOf(`${nextTransition} map:`)-1 === -2 ? lines.length : lines.indexOf(`${nextTransition} map:`)-1;
        
        for (let i = transitionStartIndex + 1; i < transitionEndIndex; i++){
            const line = lines[i];
            const [destinationRange, sourceRange, rangeLength] = line.split(' ');
            const transitionOfLine = {
                destination: {
                    min: eval(destinationRange), 
                    max: eval(destinationRange) + eval(rangeLength) - 1
                },
                sourceRange: {
                    min: eval(sourceRange), 
                    max: eval(sourceRange) + eval(rangeLength) - 1
                }
            };
            transitionMaps[transition].push(transitionOfLine);
        }
    });
    return {seeds, transitionMaps};
}

function transitionSeedsToLocation(seeds, transitionMaps){
    const result = [];
    seeds.forEach((seed)=>{
        const seedInformation = {seed: eval(seed)};
        let indexOfState = seed;
        
        for (i in differentMaps){
            const transition = differentMaps[i];
            const transitionRanges = transitionMaps[transition];
            const destinationName = transition.split('-to-')[1];
            const transitionOfSeed = transitionRanges.find((transition)=> transition.sourceRange.min <= indexOfState && indexOfState <= transition.sourceRange.max);
            const destinationRange = transitionOfSeed?.destination
            if (destinationRange){
                const seedLocationOffset = indexOfState - transitionOfSeed.sourceRange.min;
                indexOfState = destinationRange.min + seedLocationOffset;
            } 
            seedInformation[destinationName] = indexOfState;
        }
        result.push(seedInformation);
    });
    return result;
}

function part1(lines){
    const {seeds, transitionMaps} = retrieveInformationFromLines(lines);
    const result = transitionSeedsToLocation(seeds, transitionMaps);
    
    let lowestNumber = Infinity;
    result.forEach((seedInformation)=>{
        if (seedInformation.location < lowestNumber){
            lowestNumber = seedInformation.location;
        }
    });

    console.log(lowestNumber);
}

function part2(lines){
    // to do
}

(async function main(){
    const lines = await processLineByLine('seeds');
   
    // part1(lines); 

    part2(lines);
})();
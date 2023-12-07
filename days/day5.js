const { processLineByLine } = require('../common');

const differentMaps = ['seed-to-soil', 'soil-to-fertilizer', 'fertilizer-to-water', 'water-to-light', 'light-to-temperature', 'temperature-to-humidity', 'humidity-to-location'];

function locationOfSeed(seed, transitionMaps){
    let indexOfState = seed;
    
    for (i in differentMaps){
        const transition = differentMaps[i];
        const transitionRanges = transitionMaps[transition];
        const transitionOfSeed = transitionRanges.find((transition)=> transition.sourceRange.min <= indexOfState && indexOfState <= transition.sourceRange.max);
        const destinationRange = transitionOfSeed?.destination
        if (destinationRange){
            const seedLocationOffset = indexOfState - transitionOfSeed.sourceRange.min;
            indexOfState = destinationRange.min + seedLocationOffset;
        }
    }
    
    return indexOfState;
}

function retrieveInformationFromLines(lines){
    const transitionMaps = {
        'seed-to-soil': [], 'soil-to-fertilizer': [], 'fertilizer-to-water':[], 'water-to-light':[], 'light-to-temperature':[], 'temperature-to-humidity':[], 'humidity-to-location':[]
    }
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
    return transitionMaps;
}

function part1(lines){
    const transitionMaps = retrieveInformationFromLines(lines);
    const seeds = lines[0].split(':')[1].trim().split(' ');
    
    let lowestNumber = Infinity;
    seeds.forEach((seed)=>{
        const location = locationOfSeed(eval(seed), transitionMaps);
        if (location < lowestNumber){
            lowestNumber = location;
        }
    });

    console.log(lowestNumber);
}

function part2(lines){
    const transitionMaps = retrieveInformationFromLines(lines);
    const initialSeeds = lines[0].split(':')[1].trim().split(' ');

    let lowestNumber = Infinity;

    for (let i = 0; i < initialSeeds.length-1; i+=2){
        console.log(`Initiating seed ${i}/${initialSeeds.length-1}`);
        const initialSeed = eval(initialSeeds[i]);
        const range = eval(initialSeeds[i+1]);
        for (let j = initialSeed; j < initialSeed + range; j++){
            const location = locationOfSeed(j, transitionMaps);
            if (location < lowestNumber){
                lowestNumber = location;
            }
        }
    }
    console.log(lowestNumber);
}

(async function main(){
    const lines = await processLineByLine('seeds');
    
    // part1(lines); 

    part2(lines);
})();
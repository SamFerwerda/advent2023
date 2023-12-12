const { processLineByLine } = require("../common");

function arraySum(array){
    return array.reduce((acc, curr)=> acc + curr, 0);
}

function onlyZeroes(array){
    return array.filter((element)=> element !== 0).length === 0;
}

function arrayOfDifferences(array){
    const differences = [];
    for (let index=0; index < array.length - 1; index++){
        differences.push(array[index+1] - array[index]);
    }
    return differences;
}

function differenceUntilZeroes(array, part2=false){
    let index = 0;
    let newArray = array;
    let differences = [array];
    while (!onlyZeroes(newArray)){
        newArray = arrayOfDifferences(newArray);
        differences.push(newArray);
        index++;
    }
    
    differences = differences.reverse(-1);
    let lastDifference = 0;
    for (let index=1; index < differences.length; index++){
        if (part2){
            const currentLayer = differences[index].reverse(-1);
            lastElement = currentLayer[currentLayer.length - 1];
            lastDifference = lastElement - lastDifference;
        } else {
            const currentLayer = differences[index];
            lastElement = currentLayer[currentLayer.length - 1];
            lastDifference = lastDifference + lastElement ;
        }
    }
    return lastDifference;
}

(async function main(){
    const lines = await processLineByLine('history');
   
    // part 1
    const results = [];
    for (let index=0; index < lines.length; index++){
        const numbers = lines[index].split(' ').map((element)=> parseInt(element));
        const extrapolated = differenceUntilZeroes(numbers);
        results.push(extrapolated);
    }
    console.log(arraySum(results));

    // part 2
    const results2 = [];
    for (let index=0; index < lines.length; index++){
        const numbers = lines[index].split(' ').map((element)=> parseInt(element));
        const extrapolated = differenceUntilZeroes(numbers, true);
        results2.push(extrapolated);
    }
    console.log(arraySum(results2));
})()
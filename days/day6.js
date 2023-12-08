const { processLineByLine } = require('../common');

function findAllSolutionsWithABCFormula(time, distance){
    const a = -1;
    const b = eval(time);
    const c = -eval(distance);
    const d = eval(time)**2 - 4 * a * c;

    if (d <= 0){
        return [];
    }
    const x1 = (-b - d**0.5)/(2*a);
    const x2 = (-b + d**0.5)/(2*a);

    const start = x1 > x2 ? x2 : x1;
    const end = x1 > x2 ? x1 : x2;

    return Math.floor(end) - Math.ceil(start) + 1;
}

(async function () {
    // part 1
    const lines = (await processLineByLine('boats'));
    const time = lines[0].split(':')[1].trim().split(' ');
    const distance = lines[1].split(':')[1].trim().split(' ');
    
    let multiply = 1;

    for (index in time){
        const timeDuration = time[index];
        const record = distance[index];

        multiply*= findAllSolutionsWithABCFormula(timeDuration, record);
    }

    console.log(`Part 1: ${multiply}`);

    const concatedTime = time.reduce((prev, curr) => prev + curr, '');
    const concatedDistance = distance.reduce((prev, curr) => prev + curr, '');

    // Part 2
    console.log(findAllSolutionsWithABCFormula(concatedTime, concatedDistance));
})();
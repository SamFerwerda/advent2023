const { processLineByLine } = require('../common');

(async function () {
    const lines = (await processLineByLine('scratch'));
    let points = 0;

    for (i in lines){
        const line = lines[i];
        let numbersMatched = [];
        const gameWinners = line.split(':')[1].split('|')[0].trim().split(' ').map((str)=> eval(str));
        const gottenNumbers = line.split(':')[1].split('|')[1].trim().split(' ').map((str)=> eval(str));

        console.log(gameWinners);
        console.log(gottenNumbers);

        gameWinners.forEach((number)=>{
            if (number && gottenNumbers.includes(number) && !numbersMatched.includes(number)){
                numbersMatched.push(number);
            }
        });

        if (numbersMatched.length){
            console.log(`Line ${i}: ${numbersMatched}`);
            points += 2**(numbersMatched.length-1);
        }
    }
    console.log(points);
})();
const { processLineByLine } = require('../common');

(async function () {
    const MAX_IN_BAG = {red: 12, green: 13, blue: 14};

    const lines = (await processLineByLine('cubes'));
    const maxCubes = lines.map(line => {
        const maxCubesPerColor = {blue: 0, green: 0, red: 0, min: 0};
        const removeGame = line.split(':')[1];
        const splitGames = removeGame.split(';');
        splitGames.forEach(game =>{
            const subGames = game.trim().split(',');
            subGames.forEach(subGame => {
                const color = subGame.trim().split(' ')[1];
                const cubes = parseInt(subGame.trim().split(' ')[0]);
                if (cubes > maxCubesPerColor[color]){
                    maxCubesPerColor[color] = cubes;
                }
            })
        })
        maxCubesPerColor.min = maxCubesPerColor.blue * maxCubesPerColor.green * maxCubesPerColor.red;
        return maxCubesPerColor;
    });

    let sum = 0;
    maxCubes.forEach((value, index)=>{
        sum+=value.min;
    })
    console.log(sum);
})();
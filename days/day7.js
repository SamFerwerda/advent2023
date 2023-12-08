const { processLineByLine } = require('../common.js');

function determineStrength(hand){
    const orderedList = hand.split('').sort();
    const set = new Set(orderedList);
    const size = set.size;
    if (size === 1){
        // 5 of a kind
        return 1;
    } else if (size === 2){
        // 4 of a kind
        if (orderedList[0] === orderedList[3] || orderedList[1] === orderedList[4]){
            return 2;
        } else {
            // full house
            return 3;
        }
    } else if (size === 3){
        // 3 of a kind or 2 pair
        if (orderedList[0] === orderedList[2] || orderedList[1] === orderedList[3] || orderedList[2] === orderedList[4]){
            return 4;
        } else {
            return 5;
        }
    } 
    return size + 2;
};

const strengthMap = {'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};

function isFirstHandBetterThenSecond(firstHand, secondHand){
    if (firstHand.strength === secondHand.strength){
        for (let index=0; index < firstHand.cards.length; index++){
            const playerOneCard = strengthMap[firstHand.cards[index]] || eval(firstHand.cards[index]);
            const playerTwoCard = strengthMap[secondHand.cards[index]] || eval(secondHand.cards[index]);
            if (playerOneCard !== playerTwoCard){
                return playerOneCard > playerTwoCard ? -1 : 1;
            }
        }
    } 
    return firstHand.strength < secondHand.strength ? -1 : 1;
}

(async function main(){
    const lines = await processLineByLine('hands');

    const hands = lines.map((hand)=>{
        const [cards, bid] = hand.split(' ');
        const strength = determineStrength(cards);
        return {cards, bid: eval(bid), strength};
    });
    const sortedByStrength = hands.sort(isFirstHandBetterThenSecond);
    const score = sortedByStrength.reverse(-1).reduce((prev, curr, index)=> prev + curr.bid * (index+1), 0);
    console.log(score);
})()
const { processLineByLine } = require('../common.js');
const fs = require('fs').promises;
const allCards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

function getStrongestCardOfHandNotJ(orderedList){
    // go over the hand from strongest to weakest and check for occurance
    let occurance = 5;
    while (occurance > 0){
        const card = allCards.find((card)=>{
            return orderedList.filter((c)=> c === card).length === occurance;
        });
        if (card){
            return card;
        }
        occurance--;
    }
    return 'J';
};

function determineStrength(hand){
    let orderedList = hand.split('').sort();
    if (orderedList.includes('J')){
        const strongestCard = getStrongestCardOfHandNotJ(orderedList);
        orderedList = orderedList.map((card)=> card === 'J' ? strongestCard : card);
    }
    const set = new Set(orderedList.sort());
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
        // 3 of a kind
        if (orderedList[0] === orderedList[2] || orderedList[1] === orderedList[3] || orderedList[2] === orderedList[4]){
            return 4;
        } else {
            // two pair
            return 5;
        }
    } 
    return size + 2;
};

function isFirstHandBetterThenSecond(firstHand, secondHand){
    const strengthMap = {'T': 10, 'J': 1, 'Q': 11, 'K': 12, 'A': 13};
    if (firstHand.strength === secondHand.strength){
        for (let index=0; index < firstHand.cards.length; index++){
            const playerOneCard = isNaN(firstHand.cards[index]) ? strengthMap[firstHand.cards[index]] : firstHand.cards[index];
            const playerTwoCard = isNaN(secondHand.cards[index]) ? strengthMap[secondHand.cards[index]] : secondHand.cards[index];
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
    const sortedByStrength = hands.sort(isFirstHandBetterThenSecond).reverse(-1);
    const score = sortedByStrength.reduce((prev, curr, index)=> prev + (curr.bid * (index+1)), 0);
    await fs.writeFile('sortedArray.json', JSON.stringify(sortedByStrength));
    console.log(score);
})()
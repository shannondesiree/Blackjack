// Create Deck of cards

function createDeck() {
    var suits = ['C', 'D', 'H', 'S'];
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    var deck = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 13; j++) {
        deck.push(ranks[i] + suits[i]);
        }
    }
    return deck; 
}

function shuffleDeck(deck) {
    for (var i = 0; i < 52; i++) {
        var tempCard = deck[i];
        var randomIndex = Math.floor(Math.random() * 52);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = tempCard;
    }
}
console.log(deck);
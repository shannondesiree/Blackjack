
// Create deck of cards
const deck = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

var aceDeck = new Array("/templates/ace_of_clubs.png", "/templates/ace_of_spades.png", "/templates/ace_of_diamonds.png", "/templates/ace_of_hearts.png");
var twoDeck = new Array("/templates/2_of_clubs.png", "/templates/2_of_spades.png", "/templates/2_of_diamonds.png", "/templates/2_of_hearts.png");
var threeDeck = new Array("/templates/3_of_clubs.png", "/templates/3_of_spades.png", "/templates/3_of_diamonds.png", "/templates/3_of_hearts.png");
var fourDeck = new Array("/templates/4_of_clubs.png", "/templates/4_of_spades.png", "/templates/4_of_diamonds.png", "/templates/4_of_hearts.png");
var fiveDeck = new Array("/templates/5_of_clubs.png", "/templates/5_of_spades.png", "/templates/5_of_diamonds.png", "/templates/5_of_hearts.png");
var sixDeck = new Array("/templates/6_of_clubs.png", "/templates/6_of_spades.png", "/templates/6_of_diamonds.png", "/templates/6_of_hearts.png");
var sevenDeck = new Array("/templates/7_of_clubs.png", "/templates/7_of_spades.png", "/templates/7_of_diamonds.png", "/templates/7_of_hearts.png");
var eightDeck = new Array("/templates/8_of_clubs.png", "/templates/8_of_spades.png", "/templates/8_of_diamonds.png", "/templates/8_of_hearts.png");
var nineDeck = new Array("/templates/9_of_clubs.png", "/templates/9_of_spades.png", "/templates/9_of_diamonds.png", "/templates/9_of_hearts.png");
var tenDeck = new Array("/templates/10_of_clubs.png", "/templates/10_of_spades.png", "/templates/10_of_diamonds.png", "/templates/10_of_hearts.png");
var jackDeck = new Array("/templates/jack_of_clubs2.png", "/templates/jack_of_spades2.png", "/templates/jack_of_diamonds2.png", "/templates/jack_of_hearts2.png");
var queenDeck = new Array("/templates/queen_of_clubs2.png", "/templates/queen_of_spades2.png", "/templates/queen_of_diamonds2.png", "/templates/queen_of_hearts2.png");
var kingDeck = new Array("/templates/king_of_clubs2.png", "/templates/king_of_spades2.png", "/templates/king_of_diamonds2.png", "/templates/king_of_hearts2.png");
// Create a hand for both player and dealer
var dealerHand = [];
var playerHand = [];

// Start game
function startGame() {
    var gameStart = document.getElementById("game-start");
    if (gameStart.style.visibility === "hidden") {
        gameStart.style.visibility = "visible";
    } else {
        gameStart.style.visibility = "hidden";
    }
    hideStartButton()
    // Shuffle deck
    shuffleDeck();
    // Deal cards to Dealer
    dealTwoCardsToDealer();
    console.log(dealerHand);

// Reveal dealer one card
var dealerCardOne = dealerHand[0];
let dealerCardOneSource = document.getElementById("dealer-card-one");
revealCard(dealerCardOne, dealerCardOneSource);


// Deal cards to Player
dealTwoCardsToPlayer();
console.log(playerHand);

// Reveal both player cards
var playerCardOne = playerHand[0];
var playerCardTwo = playerHand[1];
var playerCardOneSource = document.getElementById("player-card-one")
var playerCardTwoSource = document.getElementById("player-card-two")
revealCard(playerCardOne, playerCardOneSource);
revealCard(playerCardTwo, playerCardTwoSource);


// Calculate dealer sum after 2 cards dealt
var dealerSum = addCardValues(dealerHand);
// console.log(dealerSum);

// The dealer will Hit if they have a total less than 17 and Stand if they have 17 or more total
var dealerStand = dealerResponse(dealerSum);
dealerTotal = document.getElementById("dealer-total");
dealerTotal.innerHTML = dealerStand;

var playerTotal = addCardValues(playerHand);
document.getElementById("player-total").innerHTML = playerTotal;

}

// playerHit();
function playerHit() {
    // Hide hit button
    let hitButton = document.getElementById("hit-button")
    hideInfo(hitButton);

    // Display the player's Hit card
    displayPlayerHitCard();
    
    // Add card hit card player hand
    var playerHitHand = addCardToHand(playerHand);
    // console.log(playerHitHand);

    // reveal image and correct card
    var playerHitCard = playerHitHand[2];
    var playerCardThreeSource = document.getElementById("player-card-three");
    revealCard(playerHitCard, playerCardThreeSource);
     
    // calculate new hand value and record value
    var finalPlayerSum = addCardValues(playerHitHand);
    console.log(finalPlayerSum);
    document.getElementById("player-total").innerHTML = finalPlayerSum;

    // check if instant win/lose on player hit and declare winner
    checkForWinOrLoseOnHit(finalPlayerSum);
}


// Reveal winner after stand button clicked 
function finishGame() {
    endCardDisplay();
    let dealerStand = document.getElementById("dealer-total").innerHTML;
    let playerSum = document.getElementById("player-total").innerHTML;
    console.log(dealerStand);
    console.log(playerSum);
     // Print winner
     declareWinner(playerSum,dealerStand);
     displayPlayAgainButton();
}

// Hide start button function
function hideStartButton() {
    var startBtn = document.getElementById("start-button");
    if (startBtn.style.visibility === "visible") {
        startBtn.style.visibility = "hidden";
    } else {
        startBtn.style.visibility = "visible";
    }
}

function displayPlayAgainButton() {
    var playAgainBtn = document.getElementById("play-again-button");
    // if( playAgainBtn)
    playAgainBtn.style.visibility = "visible";
}

function displayDealerHitCard() {
    var dealerCardThreeSource = document.getElementById("dealer-card-three");
    if (dealerCardThreeSource.style.visibility === "visible") {
        dealerCardThreeSource.style.visibility = "hidden";
    } else {
        dealerCardThreeSource.style.visibility = "visible";
    }
}
function displayPlayerHitCard() {
    var playerCardThreeSource = document.getElementById("player-card-three");
    if (playerCardThreeSource.style.visibility === "visible") {
        playerCardThreeSource.style.visibility = "hidden";
    } else {
        playerCardThreeSource.style.visibility = "visible";
    }
}

function hideInfo(info) {
    info.style.display = "none";
}


// Shuffle deck function
function shuffleDeck() {
    for (var i = 0; i < 52; i++) {
        let tempCard = deck[i];
        var randomIndex = Math.floor(Math.random() * 52);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = tempCard;
    }
}

// Deal to dealer function
function dealTwoCardsToDealer() {
    dealerHand = deck.splice(0, 2);
}

// Deal to player function
function dealTwoCardsToPlayer() {
    playerHand = deck.splice(0, 2);
}

 // Calculate total of a given hand
 function addCardValues(hand) {
    let total = 0;
    let aceCount = 0;
    
    for (let i = 0; i < hand.length; i++) {
      let card = hand[i];
      if (card == "J" || card == "Q" || card == "K") {
        total += 10;
      } else if (card === "A") {
        aceCount += 1;
        total += 11;
      } else {
        total += card;
      }
    }
    // If hand contains A and total is over 21, set the value of each ace to 1
    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount -= 1;
    }
    return total;
  }

  // Check and declare if player is winner or loser on hit
  function checkForWinOrLoseOnHit(sum) {
    var playInfo = document.getElementById("play-info");
    var playButtons = document.getElementById("play-buttons");
    if (sum > 21) {
        document.getElementById("declare-winner").innerHTML = "You have gone over 21 with " + sum + ". Dealer wins!";
        displayPlayAgainButton();
        endCardDisplay();
        var playInfo = document.getElementById("play-info");
        hideInfo(playInfo);
        hideInfo(playButtons);
        
    } else if (sum === 21) {
        document.getElementById("declare-winner").innerHTML = "You have 21. You Win!"
        displayPlayAgainButton();
        endCardDisplay();
        hideInfo(playInfo);
        hideInfo(playButtons);
        
    } else {
        return sum;
    }
}

function revealCard(card, source) {
    if (card == "J") {
        var randomNum = Math.floor(Math.random() * jackDeck.length);
        source.src= jackDeck[randomNum];
    } else if (card == "K") {
        randomNum = Math.floor(Math.random() * kingDeck.length);
        source.src= kingDeck[randomNum];
    } else if (card == "Q") {
        randomNum = Math.floor(Math.random() * queenDeck.length);
        source.src= queenDeck[randomNum];
    } else if (card == "10") {
        randomNum = Math.floor(Math.random() * tenDeck.length);
        source.src= tenDeck[randomNum];
    } else if (card == "9") {
        randomNum = Math.floor(Math.random() * nineDeck.length);
        source.src= nineDeck[randomNum];
    } else if (card == "8") {
        randomNum = Math.floor(Math.random() * eightDeck.length);
        source.src= eightDeck[randomNum];
    } else if (card == "7") {
        randomNum = Math.floor(Math.random() * sevenDeck.length);
        source.src= sevenDeck[randomNum];
    } else if (card == "6") {
        randomNum = Math.floor(Math.random() * sixDeck.length);
        source.src= sixDeck[randomNum];
    } else if (card == "5") {
        randomNum = Math.floor(Math.random() * fiveDeck.length);
        source.src= fiveDeck[randomNum];
    } else if (card == "4") {
        randomNum = Math.floor(Math.random() * fourDeck.length);
        source.src= fourDeck[randomNum];
    } else if (card == "3") {
        randomNum = Math.floor(Math.random() * threeDeck.length);
        source.src= threeDeck[randomNum];
    } else if (card == "2") {
        randomNum = Math.floor(Math.random() * twoDeck.length);
        source.src= twoDeck[randomNum];
    } else if (card == "A") {
    randomNum = Math.floor(Math.random() * aceDeck.length);
        source.src= aceDeck[randomNum];
    }
}

function dealerResponse(sum) {
    if (sum < 17) {
        dealerHand = addCardToHand(dealerHand);
        sum = addCardValues(dealerHand);
        document.getElementById("dealer-choice").innerHTML = "The dealer has hit in this round";
        displayDealerHitCard(); 
        return sum;
    } else if (sum => 17) {
        document.getElementById("dealer-choice").innerHTML = "The dealer has decided to stand for this round";
        return sum;
    }  
}

function addCardToHand(arr) {
    let addedCard = deck.splice(0, 1);
    var newHand = arr.concat(addedCard);
    return newHand;
}
    // Reveal all Dealer Cards
    function endCardDisplay() {
        var dealerCardTwo = dealerHand[1];
        var dealerCardTwoSource = document.getElementById("dealer-card-two");
        revealCard(dealerCardTwo, dealerCardTwoSource);
        var dealerCardThree = dealerHand[2];
        var dealerCardThreeSource = document.getElementById("dealer-card-three");
        revealCard(dealerCardThree, dealerCardThreeSource);
        var playerCardThree = playerHand[2];
        var playerCardThreeSource = document.getElementById("player-card-three");
        revealCard(playerCardThree, playerCardThreeSource);
    }
    
    function declareWinner(pTotal, dTotal) {
        var playInfo = document.getElementById("play-info");
        var playButtons = document.getElementById("play-buttons");
        if (pTotal === 21) {
            document.getElementById("declare-winner").innerHTML = "You have 21. You Win!";
        } else if (dTotal === 21) {
            document.getElementById("declare-winner").innerHTML = "The dealer has 21. Dealer Wins!";
        } else if (pTotal > dTotal && pTotal < 21) {
            document.getElementById("declare-winner").innerHTML = "You have: " + pTotal + ". The dealer has: " + dTotal + ". You win!";
        } else if (pTotal > 21) {
            document.getElementById("declare-winner").innerHTML = "You have gone over 21 with " + pTotal + ". Dealer wins!";
        } else if (dTotal > pTotal && dTotal < 21) {
            document.getElementById("declare-winner").innerHTML = "You have: " + pTotal + " .The dealer has: " + dTotal + ". Dealer wins!";
        } else if (pTotal < dTotal && pTotal < 21) {
            document.getElementById("declare-winner").innerHTML = "You have: " + pTotal + " .The dealer has: " + dTotal + ". You win!";
        } else if (pTotal === dTotal) {
            document.getElementById("declare-winner").innerHTML = "It's a Draw!"
        }
        hideInfo(playInfo);
        hideInfo(playButtons);
    }
    


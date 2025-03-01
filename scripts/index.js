// https://opengameart.org/content/playing-cards-vector-png

const cardsHolder = document.getElementById("cardsHolder");

const playArea = document.getElementById("playArea");

let placeholder = document.createElement("div");
placeholder.id = "placeholder";
placeholder.textContent = "+";
playArea.append(placeholder);

playArea.addEventListener("click", placeCard);

let movingCard;
function clickedHandCard(cardIndex) {
  const cards = document.getElementsByClassName("cards");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = "1";
  }
  const card = cards[cardIndex];
  // console.log(card)
  movingCard = card;
  card.style.opacity = ".5";
  // console.log("movingCard", movingCard)
}
// create a deck of cards:
// 52 cards
// 2 - 10, jack, queen, king, ace
// 4 suits: hearts, diamonds, spades, clubs

const deck = [];
let cards = document.getElementsByClassName("cards")
const card_template = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "jack",
  "queen",
  "king",
  "ace",
];

const suits = ["hearts", "diamonds", "spades", "clubs"];

for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < card_template.length; j++) {
    let value;
    if (typeof card_template[j] === "number") {
      value = card_template[j];
    } else if (card_template[j] == "ace") {
      value = "ace";
    } else {
      value = 10;
    }

    const image = `../media/PNG-cards-1.3/${card_template[j]}_of_${suits[i]}.png`;
    const card = {
      description: card_template[j],
      suit: suits[i],
      value: value,
      image: image,
    };
    deck.push(card);
  }
}

let hand = [];

function drawCards() {
  for (let i = 0; hand.length < 7; i++) {
    // console.log("hand.length: ", hand.length)
    let cardNum = Math.floor(Math.random() * deck.length);
    hand.push(deck[cardNum]);
    deck.splice(cardNum, 1);
  }
  placeHandCards ()
}

drawCards();

function placeHandCards (){
    // console.log("hand: ",hand)
    for (let i = cards.length; i < hand.length; i++) {
      const card = document.createElement("img");
      card.className = "cards";
      card.alt = `card_${i + 1}`;
      card.src = hand[i].image;
    //   console.log("card: ",card)
      cardsHolder.append(card);
      card.addEventListener("click", () => {
        clickedHandCard(i);
      });
    }
}

// shuffle the deck
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

shuffle(deck);
// console.log("deck: ", deck)

function placeCard() {
  if (movingCard) {
    console.log(movingCard);
    console.log(document.getElementsByClassName("cards"))
    movingCard.className = "playedCard";

    let tempcards = [...cards].splice([...cards].indexOf(movingCard),1)
    cards = []
    console.log(cards)
    let end = document.getElementsByClassName("cards")
    end = tempcards
    playArea.append(movingCard);
    drawCards();
  }
}

// Citations
// https://opengameart.org/content/playing-cards-vector-png
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

// ---------------------- DOM Variables --------------------
const cardsHolder = document.getElementById("cardsHolder");
const playArea = document.getElementById("playArea");
const cards = document.getElementsByClassName("cards");

// ----------------------- Global Variables

const deck = [];
let hand = [];
let selectedCard;

let placeholder = document.createElement("div");
placeholder.id = "placeholder";
placeholder.textContent = "+";


playArea.append(placeholder);

playArea.addEventListener("click", placeCard);

function clickedHandCard(cardIndex) {
  const cards = document.getElementsByClassName("cards");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = "1";
  }

  selectedCard = cards[cardIndex];
  selectedCard.style.opacity = ".5";
}
// create a deck of cards:
// 52 cards
// 2 - 10, jack, queen, king, ace
// 4 suits: hearts, diamonds, spades, clubs

function buildDeck() {
  const suits = ["hearts", "diamonds", "spades", "clubs"];
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
      const alt = `${card_template[j]}_of_${suits[i]}`
      const card = {
        description: card_template[j],
        suit: suits[i],
        value: value,
        image: image,
      };
      deck.push(card);
    }
  }
}

buildDeck();
shuffle(deck);
drawCards();
console.log("deck: ",deck)
function drawCards() {
  for (let i = 0; hand.length < 7; i++) {
    hand.push(deck[i]);
    deck.splice(i, 1);
  }

  // place cards in "Cards In Hand"
  console.log("cards.length: ",cards.length)
  for (let i = cards.length; i < hand.length; i++) {
    const card = document.createElement("img");
    card.className = "cards";
    card.alt = `card_${i + 1}`;
    card.src = hand[i].image;
    cardsHolder.append(card);
    card.addEventListener("click", () => {
      clickedHandCard(i);
    });
  }
  console.log("cards.length: ",cards.length)
}


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

function placeCard() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].style = ""
  }
  console.log("placing card in `Play Area`")
  // if (selectedCard) {
    console.log(selectedCard);
    console.log(cards)
    console.log("hand: ",hand)

    for (let i = 0; i < cards.length; i++) {
      if (cards[i] = selectedCard) {
        console.log("selected card index:" ,i)
      }
    }
    // hand.splice(hand.indexOf(selectedCard),1)
    // console.log("hand: ",hand)

    // console.log(cards);
    selectedCard.className = "playedCard";

    // console.log(cards);
    playArea.append(selectedCard);
    drawCards();
  // }
}

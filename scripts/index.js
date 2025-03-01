// Citations
// https://opengameart.org/content/playing-cards-vector-png
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

// ---------------------- DOM Variables --------------------
const cardsHolder = document.getElementById("cardsHolder");
// const playArea_1 = document.getElementById("playArea_1");
playArea = document.getElementsByClassName("playArea")
const cards = document.getElementsByClassName("cards");
const deckCards = document.getElementById("deckCards")
const passBtn = document.getElementById("passBtn")
// ----------------------- Global Variables

const deck = [];
const displayedDeck = [];
let hand = [];
let selectedCard;
let clickedCardIndex;

let placeholder = document.createElement("div");
placeholder.id = "placeholder";
placeholder.textContent = "+";

playArea[0].append(placeholder);



// create a deck of cards:
// 52 cards
// 2 - 10, jack, queen, king, ace
// 4 suits: hearts, diamonds, spades, clubs

buildDeck();
shuffle(deck);playArea
drawCards();
addCardToDisplayedDeck();

if (displayedDeck.length > 0) {
  for (let i = 0; i < displayedDeck.length; i++) {
    deckCards.append(displayedDeck[i])
  }
}

passBtn.addEventListener("click", addCardToDisplayedDeck)

function addCardToDisplayedDeck() {
  console.log(deck.length)
  if (deck.length === 0) {
    return
  }
  const card = deck[deck.length-1] 
  console.log(card.image)

  const topCard = document.createElement("img")
  topCard.src = card.image
  displayedDeck.push(topCard)
  console.log(deck.length)
  deck.splice(deck.indexOf(topCard), 1)
  console.log(deck.length)

  if (displayedDeck.length > 0) {
    for (let i = 0; i < displayedDeck.length; i++) {
      deckCards.append(displayedDeck[i])
    }
  }
}



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
      const alt = `${card_template[j]}_of_${suits[i]}`;
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

function drawCards() {
  document.getElementById("cardsHolder").remove();
  const cardsHolder = document.createElement("div");
  cardsHolder.id = "cardsHolder";
  document.getElementById("cardsInHand").after(cardsHolder);

  for (let i = 0; hand.length < 7; i++) {
    hand.push(deck[i]);
    deck.splice(i, 1);
  }

  // place cards in "Cards In Hand"

  for (let i = cards.length; i < hand.length; i++) {
    const card = document.createElement("img");
    card.className = "cards";
    card.alt = `card_${i + 1}`;
    card.src = hand[i].image;
    cardsHolder.append(card);
    card.addEventListener("mousedown", () => {
      clickedCardIndex = Number(card.alt[card.alt.length - 1]);
        clickedHandCard();
    })
    // card.addEventListener("click", () => {
    //   clickedCardIndex = Number(card.alt[card.alt.length - 1]);
    //   clickedHandCard();
    // });
  }
}

console.log(playArea.length)
for (let i = 0; i < playArea.length; i++) {
  console.log(i)
  playArea[i].addEventListener("mouseup", mousingUp)
}

function mousingUp () {
  console.log("mouse up")
}

function clickedHandCard() {
 
  placeholder.addEventListener("click", placeCard);
  cardIndex = clickedCardIndex - 1;
  const cards = document.getElementsByClassName("cards");
  for (let i = 0; i < cards.length; i++) {
    // cards[i].style.opacity = "1";
  }
  selectedCard = cards[cardIndex];
  // selectedCard.style.opacity = ".5";
}

function placeCard() {
  console.log("placing card")
  if (!clickedCardIndex || deck.length === 0) {
    return;
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].style = "";
  }
  for (let i = 0; i < cards.length; i++) {
    if ((cards[i] = selectedCard)) {
    }
  }
  hand.splice(cardIndex, 1);
  selectedCard.className = "playedCard";
  placeholder.before(selectedCard); //todo change this to the section being appended
  drawCards();
  placeholder.removeEventListener("click", placeCard);
  cardIndex = null
}

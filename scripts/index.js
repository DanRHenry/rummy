// Citations
// https://opengameart.org/content/playing-cards-vector-png
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event

// ---------------------- DOM Variables --------------------
const cardsInHand = document.getElementById("cardsInHand");
const playAreaSection = document.getElementById("playAreaSection")
const playArea = document.getElementsByClassName("playArea");
const cards = document.getElementsByClassName("cards");
const deckCards = document.getElementById("deckCards");
const passBtn = document.getElementById("passBtn");
// ----------------------- Global Variables

const cardsImagesURLPrefix = "https://danhenrydev.com/apps/rummy/media/PNG-cards-1.3"
// const cardsImagesURLPrefix = "../media/PNG-cards-1.3"

const deck = [];
const displayedDeck = [];
let hand = [];
let selectedCard;
let clickedCardIndex;
let dragged;

buildDeck();
shuffle(deck);
playArea;
drawCards();
addCardToDisplayedDeck();
createPlayArea()

if (displayedDeck.length > 0) {
  for (let i = 0; i < displayedDeck.length; i++) {
    deckCards.append(displayedDeck[i]);
  }
}

passBtn.addEventListener("click", addCardToDisplayedDeck);

function addCardToDisplayedDeck() {
  console.log(deck.length);
  if (deck.length === 0) {
    return;
  }
  const card = deck[deck.length - 1];
  console.log(card.image);

  const topCard = document.createElement("img");
  topCard.src = card.image;
  displayedDeck.push(topCard);
  console.log(deck.length);
  deck.splice(deck.indexOf(topCard), 1);
  console.log(deck.length);

  if (displayedDeck.length > 0) {
    for (let i = 0; i < displayedDeck.length; i++) {
      deckCards.append(displayedDeck[i]);
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

      const image = `${cardsImagesURLPrefix}/${card_template[j]}_of_${suits[i]}.png`;
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
  document.getElementById("cardsInHand").remove();
  const cardsInHand = document.createElement("div");
  cardsInHand.id = "cardsInHand";
  document.getElementById("cardsInHandSection").after(cardsInHand);

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
    cardsInHand.append(card);
    card.addEventListener("dragstart", (e) => {
      // console.log("dragstart");
      // store a ref. on the dragged elem
      dragged = e.target;
      // console.log("deck: ", deck);
      // console.log("hand: ", hand);
      // console.log("card:", hand[i])
      selectedCard = hand[i]
      // console.log(selectedCard)
      // console.log("cards[i]: ", cards[i], i);
      
      // make it half transparent
      e.target.classList.add("dragging");
      draggingCard(i)
    });
  }
}

function createPlayArea() {
  
  for (let i = 0; i < 24; i++) {
    const playArea = document.createElement("div")
    playArea.className = "playArea"
    playArea.id = `playArea_${i}`
    playAreaSection.append(playArea)

    playArea.addEventListener("dragstart", (e) => {
      // store a ref. on the dragged elem
      dragged = e.target;
      console.log("hand: ", hand);
      selectedCard = hand[i]
      
      // make it half transparent
      e.target.classList.add("dragging");
      draggingCard(i)
    });

    playArea.addEventListener("dragover", (e) => {
      e.preventDefault()
    })

    playArea.addEventListener("dragend", () => {
      console.log("ended dragging")
    })
  }


  // ----------------- Add Event Listeners for Dragging & Dropping ---------------
  for (let i = 0; i < playArea.length; i++) {
  
    playArea[i].addEventListener("drop", (e) => 
    {
        placeCard(i, "playArea")
      e.preventDefault()
      console.log("dropped")
    }
    )

    playArea[i].addEventListener("dragenter", (e) => {
      // console.log('dragenter')
      playArea[i].style.backgroundColor = "blue";
      // highlight potential drop target when the draggable element enters it
      if (e.target.classList.contains("dropzone")) {
        e.target.classList.add("dragover");
      }
    });
  
    playArea[i].addEventListener("dragleave", (e) => {
      // console.log("dragleave")
      playArea[i].style.backgroundColor = null;
      // reset background of potential drop target when the draggable element leaves it
      if (e.target.classList.contains("dropzone")) {
        e.preventDefault();
  
        // move dragged element to the selected drop target
        if (e.target.classList.contains("dropzone")) {
          e.target.classList.remove("dragover");
          e.target.appendChild(dragged);
        }
      }
    });
  }
}

function draggingCard(cardIndex) {

  const cards = document.getElementsByClassName("cards");
  for (let i = 0; i < cards.length; i++) {
  }

  clickedCardIndex = cardIndex;
}

function placeCard(index, source) {
  console.log("index: ",index)
  console.log(source)

  if (!clickedCardIndex || deck.length === 0) {
    console.log(clickedCardIndex)
    console.log(selectedCard)
    return;
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].style = "";
  }
  for (let i = 0; i < cards.length; i++) {
    if ((cards[i] = selectedCard)) {
    }
  }
  
  if (selectedCard) {
    const card = document.createElement("img")
    card.src = selectedCard.image;
    card.className = "placedCards"
    
    if (playArea[index].childNodes.length === 0) {
      playArea[index].append(card); 
      drawCards();
      cardIndex = null;
      selectedCard = null;
      hand.splice(clickedCardIndex, 1);
      clickedCardIndex = null
    }
  }
}

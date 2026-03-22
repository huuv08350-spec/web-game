const cardsData = [
  { name: "red", color: "#ff4d4d" },
  { name: "blue", color: "#4d79ff" },
  { name: "green", color: "#4dff88" },
  { name: "yellow", color: "#ffe44d" },
  { name: "red", color: "#ff4d4d" },
  { name: "blue", color: "#4d79ff" },
  { name: "green", color: "#4dff88" },
  { name: "yellow", color: "#ffe44d" },
];

// Trộn thẻ
cardsData.sort(() => 0.5 - Math.random());

const board = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");

let chosenNames = [];
let chosenIndexes = [];
let score = 0;
let lockBoard = false;

function createBoard() {
  cardsData.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.setProperty("--color", card.color);
    cardDiv.setAttribute("data-index", index);

    cardDiv.addEventListener("click", flipCard);
    board.appendChild(cardDiv);
  });
}

function flipCard() {
  if (lockBoard) return;

  const index = this.getAttribute("data-index");

  if (chosenIndexes.includes(index) || this.classList.contains("matched")) {
    return;
  }

  this.classList.add("flipped");
  chosenNames.push(cardsData[index].name);
  chosenIndexes.push(index);

  if (chosenNames.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll(".card");
  const first = chosenIndexes[0];
  const second = chosenIndexes[1];

  if (chosenNames[0] === chosenNames[1]) {
    cards[first].classList.add("matched");
    cards[second].classList.add("matched");
    score++;
    scoreDisplay.textContent = score;
  } else {
    cards[first].classList.remove("flipped");
    cards[second].classList.remove("flipped");
  }

  chosenNames = [];
  chosenIndexes = [];
  lockBoard = false;
}

createBoard();
function shuffleCards() {
  cardsData.sort(() => 0.5 - Math.random());
}
function restartGame() {
  // Reset dữ liệu
  score = 0;
  chosenNames = [];
  chosenIndexes = [];
  lockBoard = false;
  scoreDisplay.textContent = score;

  // Xóa bàn cờ cũ
  board.innerHTML = "";

  // Trộn lại thẻ
  shuffleCards();

  // Tạo lại board
  createBoard();
}

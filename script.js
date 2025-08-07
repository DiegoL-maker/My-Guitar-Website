const guitars = [
  'StratG.png',
  'GretchG.png',
  'JacksonG.png',
  'TeleG.png',
  'SgG.png',
  'ExplorerG.png',
  'FlyingVG.png',
  'LesPaulG.png'
];

let cards = [...guitars, ...guitars];
cards = shuffle(cards);

let flippedCards = [];
let matchedPairs = 0;

const board = document.getElementById('game-board');
const winMessage = document.getElementById('win-message');
const resetButton = document.getElementById('reset-button');
const scoreDisplay = document.getElementById('score');

let pairsFlipped = 0;

resetButton.addEventListener('click', resetGame);

function createBoard() {
  board.innerHTML = '';
  cards = shuffle([...guitars, ...guitars]);
  matchedPairs = 0;
  flippedCards = [];
  pairsFlipped = 0;
  winMessage.classList.remove('show-win');
  winMessage.innerHTML = '🎉 You Matched All the Guitars! 🎸';
  scoreDisplay.textContent = 'Pairs Flipped: 0';

  cards.forEach(src => {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.style.backgroundImage = `url("${src}")`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener('click', () => flipCard(card, src));
    board.appendChild(card);
  });
}

function flipCard(card, src) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push({ card, src });

  if (flippedCards.length === 2) {
    pairsFlipped++;
    scoreDisplay.textContent = `Pairs Flipped: ${pairsFlipped}`;

    const [first, second] = flippedCards;

    setTimeout(() => {
      if (first.src === second.src) {
        matchedPairs++;

        if (matchedPairs === guitars.length) {
          winMessage.innerHTML = `🎉 You Matched All the Guitars! 🎸<br>It took you <strong>${pairsFlipped}</strong> pairs!`;
          winMessage.classList.add('show-win');
        }

        flippedCards = [];
      } else {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
        flippedCards = [];
      }
    }, 600);
  }
}

function resetGame() {
  createBoard();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start game
createBoard();

let obj = document.querySelector('.name');
let quizPanel = document.querySelector('.quiz-panel');
let questionPanel = document.querySelector('.questions-panel');
const startGame = document.querySelector('.letsgo')
const formName = document.querySelector('form')

function hideForm(e) {
  e.preventDefault();
  obj.style.opacity = '0';
  window.setTimeout(
    function removethis() {
      obj.style.display = 'none';
      quizPanel.style.display = 'block';
    }, 300);
}

function runInstruction() {
  const autoType = document.getElementById('type-instruction');
  let playerName = document.querySelector('.playerName').value;
  var buildWeb = `Hi ${playerName}, You've been lucky to play my quiz game. In order for you to join my forces you need to reach the square tier and answer all of the questions correctly. You only have 3 lives, so use it wisely. You need to choose the correct anwer or else you will fail.`;
  var index = 0;

  window.next_letter = function () {
    if (index <= buildWeb.length) {
      autoType.textContent = buildWeb.substr(0, index++);
      setTimeout("next_letter()", 5);
    }

    if (index === buildWeb.length) {
      let startBtn = document.querySelector('.initiate-game')
      startBtn.style.display = 'block';
    }
  }

  next_letter();
}

function getQuestion(playerlevel) {
  return fetch(`https://opentdb.com/api.php?amount=1&difficulty=${playerlevel}`)
  .then((result) => result.json())
  .then((data) => data.results)
}

function hideInstruction(e) {
  e.preventDefault();
  quizPanel.style.opacity = '0';
  startGame.style.opacity = '0';
  window.setTimeout(
    function removethis() {
      quizPanel.style.display = 'none';
      startGame.style.display = 'none';
      questionPanel.style.display = 'block';
    }, 300);
}


function playGame(e) {
  let playerLives = 3;
  let playerRank = 'easy';
  let quizCounter = 1;

  hideInstruction(e);
  getQuestion(playerRank)
  .then((data) => printQuestion(data));
}

function printQuestion(data) {
  console.log(data[0].question);
  var question = data[0].question;
  const questionCounter = document.getElementById('question-counter');
  questionCounter.textContent = question;
}

formName.addEventListener('submit', (e) => {
  hideForm(e);
  runInstruction();
});

startGame.addEventListener('click', (e) => {
  playGame(e);
});

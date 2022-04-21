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
  console.log(playerName);
  var buildWeb = `Hi ${playerName}, You've been lucky to play my quiz game. In order for you to join my forces you need to reach the square tier and answer all of the questions correctly. You only have 3 lives, so use it wisely. You need to choose the correct anwer or else you will fail.`;
  var index = 0;

  window.next_letter = function () {
    if (index <= buildWeb.length) {
      autoType.textContent = buildWeb.substr(0, index++);
      setTimeout("next_letter()", 10);
    }

    if (index === buildWeb.length) {
      let startBtn = document.querySelector('.initiate-game')
      startBtn.style.display = 'block';
    }
  }

  next_letter();
}


const easyQuestions = fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
  .then((result) => result.json())
  .then((data) => data.results)

const medQuestions = fetch('https://opentdb.com/api.php?amount=5&difficulty=medium')
  .then((result) => result.json())
  .then((data) => data.results)

const hardQuestions = fetch('https://opentdb.com/api.php?amount=5&difficulty=hard')
  .then((result) => result.json())
  .then((data) => data.results)


Promise.all([easyQuestions, medQuestions, hardQuestions]).then((values) => {
  console.log(values[0][0]);
});

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
  hideInstruction(e);
}



formName.addEventListener('submit', (e) => {
  hideForm(e);
  runInstruction();
});
startGame.addEventListener('click', (e) => {
  playGame(e);
});

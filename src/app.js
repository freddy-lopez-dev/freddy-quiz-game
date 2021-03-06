const obj = document.querySelector('.name');
const quizPanel = document.querySelector('.quiz-panel');
const questionPanel = document.querySelector('.questions-panel');
const quizEl = document.querySelector('.quiz-number');
const startGame = document.querySelector('.letsgo')
const formName = document.querySelector('form')
const answerEvent = document.querySelector('.option');
let playerLives = 3;
let quizCounter = 1;

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
  return fetch(`https://opentdb.com/api.php?amount=1&difficulty=${playerlevel}&type=multiple`)
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
  let playerRank = 'easy';

  hideInstruction(e);
  getQuestion(playerRank)
    .then((data) => printQuestion(data))

}

function printQuestion(data) {
  console.log(data[0].question);
  var question = data[0].question;
  let answers = [data[0].correct_answer, data[0].incorrect_answers[0], data[0].incorrect_answers[1], data[0].incorrect_answers[2]]
  const answerButton = document.querySelectorAll('.answer')
  answerButton.forEach((button) => {
    var idx = Math.floor(Math.random() * answers.length);
    button.textContent = answers[idx];
    answers.splice(idx, 1);
  })
  const questionCounter = document.getElementById('question-counter');
  quizEl.textContent = `Quiz: ${quizCounter}`;
  questionCounter.textContent = question;

  chooseAnswer(data[0].correct_answer);
}

formName.addEventListener('submit', (e) => {
  hideForm(e);
  runInstruction();
});

startGame.addEventListener('click', (e) => {
  playGame(e);
});


function chooseAnswer(correctAnswer) {
  answerEvent.addEventListener('click', (e) => {
    if (e.target.className = 'answer') {
      checkAnswer(e.target.textContent, correctAnswer);
    }
  })
}

function checkAnswer(userAns, correctAns) {
  if (userAns === correctAns) {
    alert('Correct!');
    quizCounter++;
  } else {
    alert('Incorrect');
  }
}
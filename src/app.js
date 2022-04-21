const formName = document.querySelector('form')
formName.addEventListener('submit', (e) => {
  hideForm(e);
  runInstruction();
});

function hideForm(e) {
  e.preventDefault();
  let obj = document.querySelector('.name');
  let quizPanel = document.querySelector('.quiz-panel');
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
  var buildWeb = `Hi ${playerName}, You've been lucky to play my quiz game. In order to win the prize you need to reach the gold tier and answer all of the questions. You only have 3 lives, so use it wisely. Each questions you need to answer within the time limit. You need to choose the answer correctly or else your life will be deducted. Enjoy!`;
  var index = 0;

  window.next_letter = function () {
    if (index <= buildWeb.length) {
      autoType.textContent = buildWeb.substr(0, index++);
      setTimeout("next_letter()", 60);
    }
  }

  next_letter();
}



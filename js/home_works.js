//gmail checker
const gmailInput = document.querySelector('#gmail_input');
const gmailCheck = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^(\w)+@gmail\.com$/;

gmailCheck.onclick = () => {
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    }else{
        gmailResult.innerHTML = 'NOT OK'
        gmailResult.style.color = 'red'
    }
}

//MOVE BLOCK
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const moveBlock = () => {
  if (positionX < 446 && positionY === 0) { // 500 (parent width) - 50 (child width)
    positionX++;
    childBlock.style.left = `${positionX}px`;
    setTimeout(moveBlock, 1);
  } else if (positionX >= 446 && positionY < 446) { // 500 - 52
    positionY++;
    childBlock.style.top = `${positionY}px`;
    setTimeout(moveBlock, 1);
  } else if (positionX >= 0) {
    positionX--;
    childBlock.style.left = `${positionX}px`;
    setTimeout(moveBlock, 1);
  } else if (positionY > 0) {
    positionY--;
    childBlock.style.top = `${positionY}px`;
    setTimeout(moveBlock, 1);
  }
};

moveBlock();

//timer 
const secondsValue = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const resumeButton = document.querySelector('#resume');

let timer;
let isRunning = false;

function updateButtonStates() {
  startButton.disabled = isRunning;
  stopButton.disabled = !isRunning;
  resumeButton.disabled = isRunning;
  resetButton.disabled = false;
}

startButton.addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(() => {
      secondsValue.innerText++;
    }, 1000);

    isRunning = true;
    updateButtonStates();
  }
});

stopButton.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    updateButtonStates();
  }
});

resumeButton.addEventListener('click', () => {
  if (!isRunning) {
    timer = setInterval(() => {
      secondsValue.innerText++;
    }, 1000);

    isRunning = true;
    updateButtonStates();
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(timer);
  secondsValue.innerText = 0;
  isRunning = false;
  updateButtonStates();
});



















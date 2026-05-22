import * as UI from './ui.js';
import { questions } from './questions.js'

const TIMER_SECONDS = 15;
const letters = ['A', 'B', 'C', 'D'];

let score = 0;
let timeLeft = 0;
let shuffledQuestions;
let currentIndex;
let timerInterval;


function startQuiz() {
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  score = 0;
  currentIndex = 0;
  UI.elements.newHighBadge.style.display = 'none';
  UI.showScreen(UI.elements.quizScreen);
  loadQuestion();
}

function loadQuestion() {
  const { question, options } = shuffledQuestions[currentIndex];
  UI.elements.questionText.textContent = question;
  UI.updateProgressBar(currentIndex, questions.length);
  UI.elements.feedback.style.display = 'none';

  UI.elements.optionsList.innerHTML = '';
  options.forEach((option, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <button class="option-btn" data-index="${i}">
            <span class="option-letter">${letters[i]}</span>
            ${option}
        </button>
    `;
    li.querySelector('button').addEventListener('click', () => selectAnswer(i));
    UI.elements.optionsList.appendChild(li);
  });
  startTimer();
}

function startTimer() {
  timeLeft = TIMER_SECONDS;
  UI.updateTimerUI(timeLeft, TIMER_SECONDS);
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    UI.updateTimerUI(timeLeft, TIMER_SECONDS);
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  clearInterval(timerInterval);
  const { answer } = shuffledQuestions[currentIndex];
  const isCorrect = selectedIndex === answer;
  const buttons = document.querySelectorAll('.option-btn');

  if (isCorrect) {
    buttons[selectedIndex].classList.add('correct');
    UI.displayFeedback(true, '✓ Correct!');
    score++;
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[answer].classList.add('correct');
    UI.displayFeedback(false, '✗ Wrong!');
  }

  buttons.forEach(btn => btn.disabled = true);
  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < shuffledQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
}

function handleTimeout() {
  const { answer } = shuffledQuestions[currentIndex];
  const buttons = document.querySelectorAll('.option-btn');
  buttons[answer].classList.add('correct');
  UI.displayFeedback(false, '⏰ Time up!');
  buttons.forEach(btn => btn.disabled = true);
  setTimeout(nextQuestion, 1500);
}

function showResults() {
  const prevBest = parseInt(localStorage.getItem('quizHighScore')) || 0;
  UI.showScreen(UI.elements.resultScreen);
  UI.elements.finalScore.textContent = score;

  if (score > prevBest) {
      localStorage.setItem('quizHighScore', score);
      UI.elements.newHighBadge.style.display = 'block';
  }
  UI.elements.highScoreEl.textContent = localStorage.getItem('quizHighScore');
}

UI.elements.startBtn.addEventListener('click', startQuiz);
UI.elements.restartBtn.addEventListener('click', startQuiz);
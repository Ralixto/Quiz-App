export const elements = {
    startScreen: document.getElementById('start-screen'),
    quizScreen: document.getElementById('quiz-screen'),
    resultScreen: document.getElementById('result-screen'),
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    questionText: document.getElementById('question-text'),
    optionsList: document.getElementById('options-list'),
    feedback: document.getElementById('feedback'),
    progressBar: document.getElementById('progress-bar'),
    questionCounter: document.getElementById('question-counter'),
    timerBar: document.getElementById('timer-bar'),
    timerText: document.getElementById('timer-text'),
    finalScore: document.getElementById('final-score'),
    highScoreEl: document.getElementById('high-score'),
    newHighBadge: document.getElementById('new-high-badge'),
}

export function updateProgressBar(current, total) {
    elements.questionCounter.textContent = `${current + 1} / ${total}`;
    elements.progressBar.style.width = ((current + 1) / total) * 100 + '%';
}

export function displayFeedback(isCorrect, message) {
    elements.feedback.textContent = message;
    elements.feedback.style.color = isCorrect ? '#16a34a' : '#dc2626';
    elements.feedback.style.display = 'block';
}

export function updateTimerUI(timeLeft, totalTime) {
    elements.timerText.textContent = timeLeft;
    elements.timerBar.style.width = (timeLeft / totalTime) * 100 + '%';
    elements.timerBar.style.background = timeLeft <= 5 ? 'red' : '';
}

export function showScreen(screen) {
    elements.startScreen.style.display = 'none';
    elements.quizScreen.style.display = 'none';
    elements.resultScreen.style.display = 'none';
    screen.style.display = 'block';
}
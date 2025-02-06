const loginForm = document.getElementById('login-form');
const nameInput = document.getElementById('name');
const loginIdInput = document.getElementById('log-in');

const loginPage = document.getElementById('login-page');
const instructionPage = document.getElementById('instruction-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');

const startQuizButton = document.getElementById('start-quiz');
const nextQuestionButton = document.getElementById('next-question');
const restartQuizButton = document.getElementById('restart-quiz');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer'); 

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the capital of India?",
        options: ["UttarPradesh", "Bihar", "New Delhi", "Chennai"],
        answer: "New Delhi"
    },
    {
        question: "Who is the Father of Computer?",
        options: ["Charles Babbage", "Robert Hooke", "AT&Bell lab", "Edison"],
        answer: "Charles Babbage"
    }
];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    loginPage.style.display = 'none';
    instructionPage.style.display = 'block';
});

startQuizButton.addEventListener('click', function () {
    instructionPage.style.display = 'none';
    questionPage.style.display = 'block';
    loadQuestion();
});

nextQuestionButton.addEventListener('click', function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

restartQuizButton.addEventListener('click', function () {
    currentQuestionIndex = 0;
    score = 0;
    resultPage.style.display = 'none';
    loginPage.style.display = 'block';
    nameInput.value = '';
    loginIdInput.value = '';
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    timeLeft = 30;
    startTimer();

    currentQuestion.options.forEach((option, index) => {
        const optionLabel = document.createElement("label");
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "option";
        optionInput.value = option;
        optionInput.id = `option${index}`;
        optionLabel.textContent = option;
        optionLabel.htmlFor = `option${index}`; 
        
        optionsContainer.appendChild(optionInput);
        optionsContainer.appendChild(optionLabel);
        optionsContainer.appendChild(document.createElement("br"));
    });


    const radioButtons = document.querySelectorAll('input[name="option"]');
    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', () => {
            checkAnswer(radioButton.value);
        });
    });
}

function startTimer() {
    // Display the timer value
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    
    timer = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer); 
            nextQuestionButton.style.display = 'block'; 
        }
    }, 1000);
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    clearInterval(timer); 

    if (selectedAnswer === currentQuestion.answer) {
        score++;
    }

    nextQuestionButton.style.display = 'block'; 
}

function showResult() {
    questionPage.style.display = 'none';
    resultPage.style.display = 'block';
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;
}

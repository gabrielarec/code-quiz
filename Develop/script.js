// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

//Selecting elements from HTML file
const startButton = document.getElementById("start-button");
const scoreElement = document.querySelector('.score');
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");
const timerElement = document.getElementById('timer-count');
const questionContainerElement = document.querySelector ('.question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.querySelector('.answer-buttons');

//Setting the timer duration and current questions
const TIMER_DURATION = 75 //in seconds
let shuffledQuestions, currentQuestionIndex, timer, score, timeLeft;

//Event listener for the start button
startButton.addEventListener("click", startGame);

//starting the game
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() -0.5)
    currentQuestionIndex = 0
    score = 0;
    scoreElement.innerText = score;
    timerElement.innerText = timeLeft;
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
    startTimer()
}


//function to start the timer
function startTimer() {
timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

 if (timeLeft === 0) {
    clearInterval(timer);
    endGame();
   }
  }, 1000)
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//function to show a question 
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
// function to set the next question 

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score +=1;
        scoreElement.innerText = score;
    } else  {
        timeLeft -=10;
        if (timeLeft <0){
        timeLeft =0;
        }
    timerElement.innerText = timeLeft;
    }

    currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    clearInterval(timer);
    endGame();
  }
}

// set of questions

let questions = [
    {
        question: "What are the advantages of using Rest in Web API?",
        answers: [
            {choice1: 'It allows less data transfer between client and server', correct:false},
            {choice2: 'It is easy to use and lightweight.', correct: false},
            {choice3: 'It provides more flexibility.', correct: false},
            {choice4: 'All of the above', correct: true}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {choice1: "Leonardo DiCaprio ", correct: false},
            {choice2: "Lionel Messi", correct:false},
            {choice3: "Albert Einstein", correct:false},
            {choice4: "Leonardo DaVinci", correct:true},
        ]
    },

    {  question: "What is the joule a unit of?",
        answers: [
            {choice1:"Fire", correct: false},
            {choice2:"Air", correct: false},
            {choice3:"Wind", correct: false},
            {choice4:"Ernergy", correct: true},
        ]
    },
    {  question: "Which is the chemical symbol for potassium?",
        answers: [
            {choice1:"Q", correct: false},
            {choice2:"P", correct: false},
            {choice3:"M", correct: false},
            {choice4:"K", correct: true},
        ]
    },
    {  question: "What color is the sunset on Mars?",
        answers: [
            {choice1:"Red", correct: false},
            {choice2:"Pink", correct: false},
            {choice3:"Yellow", correct: false},
            {choice4:"Blue", correct: true},
    ]
    },
    {  question: "How many bones do sharks have in their bodies?",
        answers: [
            {choice1:"100", correct: false},
            {choice2:"450", correct: false},
            {choice3:"70", correct: false},
            {choice4:"0", correct: true},
    ]
    },
    {  question: "How many hearts does an octopus have?",
        answers: [
            {choice1:"10", correct: false},
            {choice2:"1", correct: false},
            {choice3:"2", correct: false},
            {choice4:"3", correct: true},
    ]
    },
]

function endGame() {
  questionContainerElement.classList.add('hide');
  scoreElement.innerText = `Your final score is ${score}`;
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

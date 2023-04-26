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

const startButton = document.getElementById("start-button");
const scoreElement = document.querySelector('.score');
const goBackButton = document.getElementById("go-back");
const clearScoresButton = document.getElementById("clear-scores");
const timerElement = document.getElementById('timer-count');
const quizContainerElement = document.querySelector ('.quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.querySelectorAll('#answer-buttons button');



//function to change pages to each question and hide the elements
function changePage(oldPage, newPage, oldElements, newElements) {
    oldPage.classList.add("hide");
    newPage.classList.remove("hide");
    
    oldElements.forEach(element => element.classList.add("hide"));
    newElements.forEach(element => element.classList.remove("hide"));
  }

  changePage(
    document.getElementById("quiz"), 
    document.querySelector(".quiz-container"),
    [document.querySelector(".quiz")],
    [document.getElementById("timer-count"), scoreElement, questionElement, ...answerButtonsElement]
  );
  

//Setting the timer duration and current questions
const TIMER_DURATION = 75 //in seconds
let shuffledQuestions, currentQuestionIndex, timer, score, timeLeft = TIMER_DURATION;

//starting the game

function startGame() {
    console.log("Game started!");
    // timeLeft = TIMER_DURATION;
    timerElement.innerText= `${timeLeft} seconds remaining`;
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() -0.5)
    currentQuestionIndex = 0
    score = 0;
    scoreElement.innerText = score;
    timerElement.innerText = timeLeft;
    quizContainerElement.classList.remove('hide');
    showQuestion(shuffledQuestions[currentQuestionIndex]); // Display the first question
    startTimer()
}
//event listener for the start button


// setNextQuestion()
function setNextQuestion(){
        resetState();
        if (currentQuestionIndex < shuffledQuestions.lenght){
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        } else {
            endGame();
        }
    }
//Event listener for the start button
startButton.addEventListener("click", startGame);

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
//function to show a question 
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const button = answerButtonsElement[index];
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

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
            {text: 'It allows less data transfer between client and server', correct:false},
            {text: 'It is easy to use and lightweight.', correct: false},
            {text: 'It provides more flexibility.', correct: false},
            {text: 'All of the above', correct: true}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Leonardo DiCaprio ", correct: false},
            {text: "Lionel Messi", correct:false},
            {text: "Albert Einstein", correct:false},
            {text: "Leonardo DaVinci", correct:true},
        ]
    },

    {  question: "What is the joule a unit of?",
        answers: [
            {text:"Fire", correct: false},
            {text:"Air", correct: false},
            {text:"Wind", correct: false},
            {text:"Ernergy", correct: true},
        ]
    },
    {  question: "Which is the chemical symbol for potassium?",
        answers: [
            {text:"Q", correct: false},
            {text:"P", correct: false},
            {text:"M", correct: false},
            {text:"K", correct: true},
        ]
    },
    {  question: "What color is the sunset on Mars?",
        answers: [
            {text:"Red", correct: false},
            {text:"Pink", correct: false},
            {text:"Yellow", correct: false},
            {text:"Blue", correct: true},
    ]
    },
    {  question: "How many bones do sharks have in their bodies?",
        answers: [
            {text:"100", correct: false},
            {text:"450", correct: false},
            {text:"70", correct: false},
            {text:"0", correct: true},
    ]
    },
    {  question: "How many hearts does an octopus have?",
        answers: [
            {text:"10", correct: false},
            {text:"1", correct: false},
            {text:"2", correct: false},
            {text:"3", correct: true},
    ]
    },
]

function endGame() {
  quizContainerElement.classList.add('hide');
  scoreElement.innerText = `Your final score is ${score}`;
}


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

let startButton = document.querySelector('.start-button')
let timerElement = document.querySelector('.timer-count')
let questionContainerElement = document.querySelector ('.question-container')
let questionElement =document.querySelector('.question')
let answerButtonsElement =document.querySelector('.answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    console.log ('Started')
    startButton.classList.add('hide')
    // shuffledQuestions = question.sort()
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQeustion(){
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question){
    questionContainerElement.innerText = question.question
}

function selectAnswer() {}


let questions = [
    {
        question: "What are the advantages of using Rest in Web API?",
        answers: [
            // answer1: 'It allows less data transfer between client and server',
            // choice2: 'It is easy to use and lightweight.',
            // choice3: 'It provides more flexibility.' ,
            // choice4: 'All of the above',
            // answer: 4,
        ]
    }
]
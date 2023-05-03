//Declare variables from HTML
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

//Declare question and score variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = [];

//Array of questions
let questions = [
    {
        question: "What is 2+2?",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "5",
        answer: "3"
        
    },
    {
        question: "What is 1+1?",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "5",
        answer: "1"
        
    },
    {
        question: "What is 1+2",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "5",
        answer: "2"
        
    },
    {
        question: "What is 1+3",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "5",
        answer: "3"
        
    },
    {
        question: "What is 3+2",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "5",
        answer: "4"
        
    }
];

//fixed criteria
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

//sett he start criteria for the beginning of the game. 
startGame = () => {
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
};

//function to store score in local storage and count progression through questions
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("/end.html")
    }

    questionsCounter++
    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionsCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

//this is where time decrement score would go!!
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000)
    })
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
};

startGame();
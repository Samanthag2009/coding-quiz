//Declare variables from HTML
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressFill = document.querySelector("#progressFill");
const timerText = document.querySelector("#timer");

//Declare question and score variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = [];

//Array of questions
let questions = [
    {
        question: "JavaScript arrays are...",
        choice1: "text enclosed in quotes",
        choice2: "the only JavaScript operator that takes three operands: a condition followed by a question mark (?)",
        choice3: "0 indexed",
        choice4: "okay i guess",
        answer: "3"
        
    },
    {
        question: "The concat() method is...",
        choice1: "used to merge two or more arrays",
        choice2: "manipulating someone into giving you their cat",
        choice3: "creates a new array filled with elements that pass a test provided by a function",
        choice4: "extracts a part of a string",
        answer: "1"
        
    },
    {
        question: "Which of these are JavaScript math operators?",
        choice1: "Division(/)",
        choice2: "Increment(++)",
        choice3: "Addition(+)",
        choice4: "All of the above",
        answer: "4"
        
    },
    {
        question: "Variables defined with const...",
        choice1: "can be reassigned",
        choice2: "are a lost cause",
        choice3: "cannot be redeclared",
        choice4: "can be redeclared",
        answer: "3"
        
    },
    {
        question: "Single line comments start with...",
        choice1: ":)",
        choice2: "{}",
        choice3: "~~",
        choice4: "//",
        answer: "4"
        
    }
];

//fixed criteria
const POINT_COUNT = 10;
const MAX_QUESTIONS = 5;

//sett he start criteria for the beginning of the game. 
gameStart = () => {
    countdown();
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion();
};

//function to store score in local storage and count progression through questions
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
        localStorage.setItem('lastScore', score)

        return window.location.assign("../end.html")
    }

    questionsCounter++
    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    progressFill.style.width = `${(questionsCounter/MAX_QUESTIONS) * 100}%`

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


//adding event listener for each choice and marking them red for incorrect and green for correct
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let answerKey = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        //if answer is correct, add points to score
        if(answerKey === "correct") {
            incrementScore(POINT_COUNT)
        }
        //if answer is wrong, decrement time and points
        if (answerKey === "incorrect") {
            decrementScore(POINT_COUNT)
            decrementTime(10)
        }

        selectedChoice.parentElement.classList.add(answerKey);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(answerKey);
            getNewQuestion();

        }, 1000)
    })
});

//functions to ad and take away points and take away seconds
incrementScore = num => {
    score +=num
    scoreText.innerText = score
};

decrementScore = num => {
    score -=num
    scoreText.innerText = score
};

decrementTime = num => {
    time -=num
    timerText.textContent = time
    
}

//setting timer
countdown = () => {
    let timeLeft = 60;
    let timeInterval = setInterval(() => {
    
        if (timeLeft > 1) {
            timeLeft--
            timerText.textContent = timeLeft;
        } if (timeLeft === 1){
            clearInterval(timeInterval);
            return window.location.assign("../end.html")
        } 
    }, 1000);
}

gameStart();


//Declaring variables and ensuring that they are parsed 
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5;

//using the most recent score as the final score on the end page
finalScore.innerText = mostRecentScore;

//user can't use the save button unless there's a value in the name form
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
});

//Preventing automatic refresh when saving high score, saving the score within local storage and then stringifying them
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
};
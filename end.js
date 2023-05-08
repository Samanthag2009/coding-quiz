//Declaring variables and ensuring that they are parsed 
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const lastScore = localStorage.getItem('lastScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

//fixed criteria to limit the amount of scores kept in local storage
const MAX_HIGH_SCORES = 5;

//using the most recent score as the final score on the end page
finalScore.innerText = lastScore;

//user can't use the save button unless there's a value in the name form
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
});

//Preventing automatic refresh when saving high score, saving the score within local storage and then stringifying them
saveScore = e => {
    e.preventDefault();

    const score = {
        score: lastScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./')
};
const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

//retrieving the highscores from the innerHTML which have been parsed by our variable above
highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="highScore">${score.name} - ${score.score} points</li>`
}).join('')
//Timer Declarations
var timeEl = document.querySelector(".time");
var secondsLeft = 60;
var mainEl = document.getElementById("main");
//Timer counting down by default, counting down in intervals

document.getElementById("startbtn").addEventListener("click", countDown);
function countDown() {
    var timerSeconds = setInterval (function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
    /*
        if (secondsLeft===0);
        clearInterval(timerSeconds);
        displayTimer(); */
    }, 1000);
}
/* displaying timer end */
function displayTimer() {
timeEl.textContent = " ";
}



//countDown();


/* Title and caption displays with the start button*/
//Start Page is displayed with Start Button


/*
var titlePage = document.querySelector("#start");
var title = getElementbyId("banner");
var caption = getElementbyId("caption");
let startBtn = document.createElement("startBtn");
startBtn.innerHTML = "Start!";
title.textContent = "Coding Quiz";
caption.textContent = "Test your knowledge! Try to answer all the questions correctly within the time limit, but be careful; a wrong answer will decrease your score/time by 10! Good luck!";
document.body.appendChild(startBtn);

startBtn.addEventListener("click", countDown);
*/
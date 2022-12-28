//Timer Declarations
var timeEl = document.querySelector(".time");
var secondsLeft = 10;
//Timer counting down by default, counting down in intervals
function countDown() {
    var timerSeconds = setInterval (function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
    
        if (secondsLeft===0);
        clearInterval(timerSeconds);
        displayTimer();
    }
    );
}
//displaying timer
function displayTimer() {
timeEl.textContent = " ";
}
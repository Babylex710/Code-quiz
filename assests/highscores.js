//variables
var highscore = document.getElementById('highscores');
var back = document.getElementById('backBtn');
var clear = document.getElementById('clear');


//Adds new score to Score Board
function addScores(){
var highscores = JSON.parse(localStorage.getItem("scores"))|| []
    

    for (var i = 0; i <highscores.length; i++) {
        var newScore = document.createElement("p");
        newScore.innerHTML = `initials: ${highscores[i].initials}  score: ${highscores[i].score}`;
        highscore.appendChild(newScore);
    }
}
addScores()


//Takes user back to beginning of Quiz
backBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
});

//Clears Score Board
clear.addEventListener("click", function(){
    window.localStorage.removeItem("scores")
});

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. numbers", "d. alerts"],
        answer: "d. alerts"
    },

    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. quotes", "b. curly brackets", "c. commas", "d. parenthesis"],
        answer: "a. quotes"
    },

    {
        question: "The first index of an array is ____.",
        choices: ["a. 1", "b. 0", "c. 8", "d. any"],
        answer: "b. 0"
    },

    {
        question: "How do you call a function named myFunction?",
        choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
        answer: "c. myFunction()"
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["a. <js>", "b. <script>", "c. <scripting>", "d. <javascript>"],
        answer: "b. <script>"
    }
];

const startButton = document.getElementById('startBtn');
startButton.addEventListener('click', startGame);

var timer = document.getElementById('timer');
var timeLeft = document.getElementById('timeLeft');
var questionIndex = 0;
var totalTime = 60;


function startGame() {
    console.log('started')
    totalTime = 60;
    questionIndex = 0
    timeLeft.textContent = totalTime;
    initials.textContent = "";

    startButton.style.display = "none";
    questionContainer.style.display = "block";
    timer.style.display = "block";
    highscores.style.display = "none";

    var startTimer = setInterval(function () {
        totalTime--;
        timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);
    startQuiz();
};



var questionContainer = document.getElementById('questionContainer');
var questionsDiv = document.getElementById('questionsDiv');
var answerA = document.getElementById('btn1');
var answerB = document.getElementById('btn2');
var answerC = document.getElementById('btn3');
var answerD = document.getElementById('btn4');
var checkAnswer = document.getElementById('checkAnswer');
var correctAnswer = 0;

function startQuiz() {
    console.log('present question')
    nextQuestion();
}

function nextQuestion() {
    questionsDiv.textContent = questions[questionIndex].question;
    answerA.textContent = questions[questionIndex].choices[0];
    answerB.textContent = questions[questionIndex].choices[1];
    answerC.textContent = questions[questionIndex].choices[2];
    answerD.textContent = questions[questionIndex].choices[3];


};

function selectAnswer(answer) {
    var line = document.getElementById('line');
    line.style.display = "block";
    checkAnswer.style.display = "block";
    highscores.style.display = "none";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAnswer++;
        checkAnswer.textContent = "Correct!🤩";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        checkAnswer.textContent = "Wrong!🙁";
    }
    questionIndex++;

    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        allDone();
    }
}

function choiceA() { selectAnswer(0); }
function choiceB() { selectAnswer(1); }
function choiceC() { selectAnswer(2); }
function choiceD() { selectAnswer(3); }

answerA.addEventListener('click', choiceA);
answerB.addEventListener('click', choiceB);
answerC.addEventListener('click', choiceC);
answerD.addEventListener('click', choiceD);


var done = document.getElementById('done');
var score = document.getElementById('score');
var initials = document.getElementById('initials');
var submit = document.getElementById('submit');

function allDone() {
    done.style.display = "block";
    questionContainer.style.display = "none";
    startButton.style.display = "none";
    timer.style.display = "none";
    highscores.style.display = "none";
    score.textContent = correctAnswer;
}

var highscores = document.getElementById('highscores')
function saveHighScores(event) {
    event.preventDefault();
}

highscores.style.display = "block";

var storeScores = localStorage.getItem('highscores');
var scoreString;

if (storeScores === null) {
    scoreString = [];
} else {
    scoreString = JSON.parse(storeScores)
}

var totalScore = {
    initials: initials.value,
    score: score.textContent
};

console.log(totalScore);
scoreString.push(totalScore);


var scoreList = JSON.stringify(scoreString);
window.localStorage.setItem('highscores', scoreList);

userHighscores();

function userHighscores() {
    highscores.style.display = "block";

    var storeScores = localStorage.getItem('highscores');
    if (storeScores === null) {
        return;
    }
    console.log(storeScores);

    var list = document.getElementById('list')
    var allHighscores = JSON.parse(storeScores);
    for ( var i = 0; i < allHighscores.length; i++){
        var newScore = document.createElement('p');
        newScore.innerHTML = allHighscores[i].initials + allHighscores[i].score;
        list.appendChild(allHighscores);
    }
}

var submit = document.getElementById('submit');
submit.addEventListener('click', function(event){
    allHighscores(event);
});

var view = document.getElementById('view')
view.addEventListener('click', function(event){
    userHighscores(event);
});

var back = document.getElementById('backBtn');
back.addEventListener('click', function(){
startButton.style.display = "block";
});

var clear = document.getElementById('clearBtn', function(){
    window.localStorage.removeItem('highscores');
});
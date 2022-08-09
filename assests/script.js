//Create a variable to define a set of questions with answers
let questions = [
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


//Added an event listener for Start Button to begin quiz
let startButton = document.getElementById('startBtn');
startButton.addEventListener('click', startGame);


//Created variables for Time section
var timer = document.getElementById('timer');
var timeLeft = document.getElementById('timeLeft');
var questionIndex = 0;
var totalTime = 60;

//Funcation created to start 60 second timer
function startGame() {
    console.log('started')
    totalTime = 60;
    questionIndex = 0
    timeLeft.textContent = totalTime;
    initials.textContent = "";

    //Hide start button and highscore board
    startButton.style.display = "none";
    questionContainer.style.display = "block";
    timer.style.display = "block";
    highscores.style.display = "none";

    //When time runs out, the game is over
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


//Created variables for question section and to check answers
var questionContainer = document.getElementById('questionContainer');
var questionsDiv = document.getElementById('questionsDiv');
var answerA = document.getElementById('btn1');
var answerB = document.getElementById('btn2');
var answerC = document.getElementById('btn3');
var answerD = document.getElementById('btn4');
var checkAnswer = document.getElementById('checkAnswer');
var correctAnswer = 0;

//Function to present user with the first question
function startQuiz() {
    console.log('present question')
    nextQuestion();
}

//Funtion to present next question after previous question is answered
function nextQuestion() {
    questionsDiv.textContent = questions[questionIndex].question;
    answerA.textContent = questions[questionIndex].choices[0];
    answerB.textContent = questions[questionIndex].choices[1];
    answerC.textContent = questions[questionIndex].choices[2];
    answerD.textContent = questions[questionIndex].choices[3];
};


//Funtion to see if answer is correct or incorrect
function selectAnswer(answer) {
    var line = document.getElementById('line');
    line.style.display = "block";
    checkAnswer.style.display = "block";
    highscores.style.display = "none";

    //User will be notify if answer is correct or wrong. Time will be deducted by 10 secs
    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAnswer++;
        checkAnswer.textContent = "Correct!🤩";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        checkAnswer.textContent = "Wrong!🙁";
    }

    //Next question is presented 
    questionIndex++;

    //Quiz is done when all questions are answered
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        allDone();
    }
}


//Checks answer for selected choice
function choiceA() { selectAnswer(0); }
function choiceB() { selectAnswer(1); }
function choiceC() { selectAnswer(2); }
function choiceD() { selectAnswer(3); }

//Added event listener to multiple choice buttons
answerA.addEventListener('click', choiceA);
answerB.addEventListener('click', choiceB);
answerC.addEventListener('click', choiceC);
answerD.addEventListener('click', choiceD);

//Variables for scores and initials
var done = document.getElementById('done');
var score = document.getElementById('score');
var initials = document.getElementById('initials');
var submit = document.getElementById('submit');

//Game is over when time is done 
function allDone() {
    done.style.display = "block";
    questionContainer.style.display = "none";
    startButton.style.display = "none";
    timer.style.display = "none";
    highscores.style.display = "none";
    score.textContent = correctAnswer;
}

//User inputs initials/score and it is saved in local storage 
function saveHighscore(){
    var savedInitials = initials.value
    var hscores = JSON.parse(localStorage.getItem("scores"))||[]
    var newScore = {
        initials: savedInitials,
        score: correctAnswer
    }
    hscores.push(newScore)
console.log(correctAnswer)
localStorage.setItem("scores", JSON.stringify(hscores))
} 

function displayHighscores(){
    for (const key in localStorage) {
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }
    
}
displayHighscores()






//Added event listener for Submit, View Highscores, Go Back and Clear buttons
submit.addEventListener('click', saveHighscore);

// var back = document.getElementById('backBtn');
// back.addEventListener('click',);

// var clear = document.getElementById('clearBtn');
// clearBtn.addEventListener('click',);
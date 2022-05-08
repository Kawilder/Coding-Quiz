var questionIndex = 0;
var timerId;

var startQuizBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var timeEl = document.getElementById("time");
var initialsEl = document.getElementById("initials");
var submitBtn = document.getElementById("submit");

let questions = [
  {
    question:"What does the return statement do in Javascript?",
    choices: ["Declares a variable with a constant value.", "Declares a function.","Declares a class.", "Stops the execution of a function and returns a value from that function."],
    answer: "Stops the execution of a function and returns a value from that function."         
  },
  {
    question:"How do you make a single line comment in JavaScript?",
    choices: ["//","/*","/","<!--"],
    answer: "//"
  },
  {
    question:"Which array method adds new elements to the end of an array and returns the new length?",
    choices: ["join()","pop()","push()","map()"],
    answer: "push()"
  },
  {
    question:"Which string method checks whether a string ends with a specified string/characters?",
    choices: ["endsWith()","concat()","charAt()","match()"],
    answer: "endsWith()"
  },
  {
    question:"Which comparison operator means equal value and equal type?",
    choices: ["==","!==","=","==="],
    answer: "==="
  },
  {
    question:"Which is NOT a JavaScript data type?",
    choices: ["Number","Variable","String","Boolean"],
    answer: "Variable"
  },
  {
    question:"Which assignment operator subtracts a value from a variable?",
    choices: ["=","+=","*=","-="],
    answer: "-="
  },
  {
    question:"Which is true about JavaScript objects:",
    choices: ["They are containers for named values called properties or methods.","Object properties can be accessed with objectName.propertyName.","Object methods can be accessed with objectName.methodName().","All of the above"],
    answer: "All of the above"
  },
  {
    question:"Which results in false?",
    choices: ["5=='5'","5===5.0","5==='5'","5>=2+3"],
    answer: "5==='5'"
  },
  {
    question:"Which does NaN stand for?",
    choices: ["Not a Number","No and No","Not a Neutral","Not as Neat"],
    answer: "Not a Number"
  }
]

var time = questions.length * 15;

function startQuiz() {
  var startEl = document.getElementById("start-screen");

  startEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(countdown, 1000);
  timeEl.textContent = time;

  getQuestion();
};

function getQuestion() {
  var currentQuestion = questions[questionIndex];
  var titleH2 = document.getElementById("question");

  titleH2.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var btnChoice = document.createElement("button");
    btnChoice.setAttribute("class", "choice");
    btnChoice.setAttribute("value", choice);
    btnChoice.textContent = i + 1 + ". " + choice;
    btnChoice.onclick = answerQuestion;
    choicesEl.appendChild(btnChoice);
  });
}

function answerQuestion() {
  if (this.value === questions[questionIndex].answer) {
    time += 10;
    if (time < 0) {   
      time = 0;
    }
    timeEl.textContent = time;
    questionIndex++;
    if (questionIndex === questions.length) {
      gameEnd();
    } else {
      getQuestion();
    }
  }
  if (this.value !== questions[questionIndex].answer) {
    time -= 10;
    if (time < 0) {   
      time = 0;
    }
    timeEl.textContent = time;
    questionIndex++;
    if (questionIndex === questions.length) {
      gameEnd();
    } else {
      getQuestion();
    }
  }
}

function gameEnd() {
  clearInterval(timerId);
  var finalEl = document.getElementById("final");
  finalEl.removeAttribute("class");
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function countdown() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    gameEnd();
  }
}

function submitScore() {
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };
    highScores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highScores));
    window.location.href = "score.html";
  }
}

function inputEntry(event) {
  if (event.key === "Enter") {
    submitScore();
  }
}

startQuizBtn.onclick = startQuiz;
submitBtn.onclick = submitScore;
initialsEl.onkeyup = inputEntry;
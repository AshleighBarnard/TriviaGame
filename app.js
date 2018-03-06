function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
  new Question ("What animal is the national emblem of Canada?", ["Moose", "Beaver", "Wolf", "Eagle"], "Beaver"),
  new Question ("How many players are there in a baseball team?", ["8", "21", "9", "11"], "9"),
  new Question ("What is the name of Batman's butler", ["Horris", "Jeffry", "Alfred", "Chip"], "Alfred"),
  new Question ("The Pyrenees mountain range separates which two European countries?",["Italy and Switzerland", "Germany and Holland", "Canada and The United States", "France and Spain"], "France and Spain"),
  new Question ("According to Greek mythology who was the first woman on earth?", ["Pandpora", "Athena", "Helena", "Eve"], "Pandora")

];
// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();

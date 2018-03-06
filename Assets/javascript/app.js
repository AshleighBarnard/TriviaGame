$(document).ready(function() {

  // Collect Questions and Answers

    // Show only New Game info on page load
  $('.game').hide();
  $('.results').hide();
  // Create HTML for game

  // Set Variables
  
  var correct;
  var wrong;
  var answer;
  var counter;
  var count;
  var timeout;
  var i = 0;

  var activeQuestion = {
    question: "",
    answer: '',
    choices: [],
  }

var questions = {};
function setQuestions() {
  questions ={

    q1: {
      question: "What animal is the national emblem of Canada?",
      answer: 'Beaver',
      choices: ['Moose', 'Wolf', 'Beaver', 'Eagle'],
     },

     q2: {
      question: "How many players are there in a baseball team?",
      answer: '9',
      choices: ['20', '12', '9', '10'],
     },

     q3: {
      question: "What is the name of Batman's butler?",
      answer: 'Alfred',
      choices: ['Horris', 'Chipper', 'Alfred', 'Jeffry'],
     },

     q4: {
      question: "The Pyrenees mountain range separates which two European countries?",
      answer: 'France and Spain',
      choices: ['Italy and Switzerland', 'Germany and Holland', 'Canada and The United States', 'America and Mexico'],
     },

     q5: {
      question: "In Fahrenheit, at what temperature does water freeze?",
      answer: '32 degrees Fahrenheit',
      choices: ['13', '23', '31', '32'],
     
    },

    q6: {
     question: "The Statue of Liberty was given to the US by which country?",
     answer: 'France',
     choices: ['Canada', 'France', 'England', 'Japan'],
    },

    q7: {
    question: "According to Greek mythology who was the first woman on earth?",
    answer: 'Pandora',
    choices: ['Pandora', 'Aphrodite', 'Helena', 'Eve'],
   },

    q8: {
    question: "How many letters are there in the German alphabet?",
    answer: '30',
    choices: ['24', '26', '30', '70'],
  },

  q9: {
    question: "According to legend, who led a gang of merry outlaws in Sherwood Forest in Nottingham, England?",
    answer: 'Robin Hood',
    choices: ['Batman', 'Arrow', 'Puss in Boots', 'Robin Hood'],
  },
  q10: {
    question: "In which continent is the country of Egypt found?",
    answer: 'Africa',
    choices: ['Asia', 'Europe', 'Micronesia', 'Africa'],
  },

}
};

 // Timer Settings
 var questionTimer = {
  //Time Per Question
  time: 15,
  reset: function(t) {
    questionTimer.time = t;
    $('.timeLeft').html('Time Left: ' + questionTimer.time);
  },
  gameTimeout: function(){
    timeout = setTimeout(questionTimer.timeUp, 1000*16);
  },
  count: function() {
    $('.timeLeft').html('Time Left: ' +questionTimer.time);
    questionTimer.time--;
  },
  countDown: function(){
    counter = setInterval(questionTimer.count,1000);
  },
  stopTimer: function(){
    clearInterval(counter);
  },
  timeUp: function(){
    wrong++;
    questionTimer.reset(5)
    $('.answers').html('<h2>Incorrect! The answer is ' + activeQuestion.answer + ' </h2>');
    setTimeout(game, 5000);
  },
};

// Run this to make sure there are still questions left
function gameOver() {
  if (Object.keys(questions).length === 0) {
    questionTimer.stopTimer();
    $('.game').hide();
    $('.results').show();
    $('.correct').html('Number Correct: ' + correct);
    $('.wrong').html('Number Incorrect: ' + wrong);
    activeQuestion = false;
  };
};

// Check if selected answer is correct or incorrect
function answerCheck() {
  if (answer == activeQuestion.answer && questionTimer.time > 0) {
    correct++;
    questionTimer.reset(5);
    $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
    setTimeout(game, 5000);   
  }
    
  if (answer != activeQuestion.answer){
    questionTimer.timeUp();
  }
}

 //Randomize order of possible answers
function randomize() {
  activeQuestion.choices.sort(function() { 
    return 0.5 - Math.random(); 
  });
};

// Starts up the game
function game(){

  // Checks to see if there are no more questions first
  gameOver();

  // If there are still questions left
  if (Object.keys(questions).length > 0) {

    // Get Question
    var keys = Object.keys(questions);
    var objIndex = keys[ keys.length * Math.random() << 0];
    activeQuestion = questions[objIndex];

    // Reorder the choices so it's not obvious
    randomize();

    // Delete question so it can't be pulled again
    delete questions[objIndex];

    // Empty out answer area from previous question
    $('.answers').empty();

    // Stop and Reset timer incase it was running
    questionTimer.stopTimer();
    questionTimer.reset(15);
    questionTimer.gameTimeout()

    // Start Timer
    questionTimer.countDown();

    // Place question information into .game area
    $('.question').html(activeQuestion.question);
    // Reset counter
    i=0;

    //Create buttons for possible answers
    $(activeQuestion.choices).each(function() {
    $('.answers').append('<button class="btn btn-lg option text-center">' + activeQuestion.choices[i] + '</button>');
    i++;
    });
  }; 

  // When you click on a possible answer
  $('.option').on('click', function(){
      answer = $(this).html();
      answerCheck();
      clearTimeout(timeout);
    });
};

 // New Game Function
  // Resets score to zero
  // Sets new time countdown
function newGame() {
  $('.results').hide();
  // questions = questionInfo;
  correct = 0;
  wrong = 0;
  $('.game').show();
}


$('.home').on('click','.start',function(){
  setQuestions();
  newGame();
  
  game();
});
    

});

// Define variable
  var count = 0;
  var time = 31;
  var isSelected = false;
  var ticker;
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;

// Questions and Answer Arrays
  var question = ["What is Lord Voldemort's real name?",
  "Who was Dumbledore's immediate predecessor as Headmaster or Headmistress at Hogwarts?", "Whose mother was Rowena Ravenclaw?", "What was Voldemort's mother's maiden name?", "How many points is the Golden Snitch worth?",
  "What is the only antidote to Basilisk's venom?", "What is the symbol for Gryffindor house?", "Who destroyed the last remaining Horcrux?"];
  var answer = ["Tom Marvolo Riddle", "Armando Dippet", "The Grey Lady", "Gaunt", "150", "Phoenix Tears", "A Lion", "Neville Longbottom", "A Lion", "Neville Longbottom"];
  var firstChoice = ["Tom Marvolo Riddle", "Phineas Nigellus Black", "Moaning Myrtle", "Riddle", "50", "Phoenix Tears", "A Badger", "Ginny Weasley"];
  var secondChoice = ["Gellert Grindelwald", "Dexter Fortescue", "Lily Potter", "Clearwater", "500", "Dragon's Blood", "An Eagle", "Neville Longbottom"];
  var thirdChoice = ["Salazar Slytherin", "Armando Dippet", "The Grey Lady", "Peverell", "100", "Mandrake Draught", "A Lion", "Severus Snape"];
  var fourthChoice = ["Morfin Gaunt", "Dilys Derwent", "The Fat Lady", "Gaunt", "150", "A Bezoard", "A Snake", "Viktor Krum"];

// Show & Hide Functions
  function showHolders() {
      $("#question-holder").show();
      $("#option1").show();
      $("#choice-holder-2").show();
      $("#choice-holder-3").show();
      $("#choice-holder-4").show();
  }
  function hideHolders() {
      $("#question-holder").hide();
      $("#option1").hide();
      $("#choice-holder-2").hide();
      $("#choice-holder-3").hide();
      $("#choice-holder-4").hide();
  }
  function hideResults() {
      $("#correct-holder").hide();
      $("#incorrect-holder").hide();
      $("#unanswered-holder").hide();
      $("#restart-holder").hide();
  }
  function displayQuestion () {
      hideResults();
      $("#answer-holder").hide();
      $("#image-holder").hide();
      $("#time-holder").show();
      showHolders();
      $("#question-holder").html(question[count]);
      $("#option1").html(firstChoice[count]);
      $("#choice-holder-2").html(secondChoice[count]);
      $("#choice-holder-3").html(thirdChoice[count]);
      $("#choice-holder-4").html(fourthChoice[count]);
  
  // Hover CSS
      $("#option1").hover(function() {
          $(this).css("color", "gray");
      },
      function(){
          $(this).css("color", "black");
      });
      $("#choice-holder-2").hover(function() {
          $(this).css("color", "gray");
      },
      function(){
          $(this).css("color", "black");
      });
      $("#choice-holder-3").hover(function() {
          $(this).css("color", "gray");
      },
      function(){
          $(this).css("color", "black");
      });
      $("#choice-holder-4").hover(function() {
          $(this).css("color", "gray");
      },
      function(){
          $(this).css("color", "black");
      });
  }
  $("#option1").on("click", checkAnswer);
  $("#choice-holder-2").on("click", checkAnswer);
  $("#choice-holder-3").on("click", checkAnswer);
  $("#choice-holder-4").on("click", checkAnswer);

// Check Answer Function
  function checkAnswer() {

      hideHolders();

      if($(this).text() === answer[count]) {
          stopTime();
          isSelected = true;
          $("#answer-holder").show();
          $("#answer-holder").html("Right! The answer is: " + answer[count]);
          displayImage();
          correct++;
          count++;
      }
      else {
          stopTime();
          isSelected = true;
          $("#answer-holder").show();
          $("#answer-holder").html("Wrong! The answer is: " + answer[count]);
          displayImage();
          incorrect++;
          count++;
      } 

      checkGameEnd();  
  }

// Chekc End Game Function
  function checkGameEnd() {
      if(count === question.length) {
          $("#time-holder").hide();
          showResults();
          count = 0;
          $(".start").show();
          $(".start").on("click", function() {
              resetResults();
              startGame();
          });
      }
  }

  function resetTime() {
      time = 31;
  }

  function displayTime() {
      time--;
      $("#time-holder").html("Time remaining: " + time);
    
          if(time <= 0) {
              hideHolders();
              stopTime();
              $("#answer-holder").show();
              $("#answer-holder").html("Time is up! The answer is: " + answer[count]);
              displayImage();
              unanswered++;
              count++;
              checkGameEnd();
          }
  }

  function startTime() {
      clearInterval(ticker);
      ticker = setInterval(displayTime, 1000);
  }
  function stopTime() {
      clearInterval(ticker);
      resetTime();
      if(count < question.length - 1) {
          setTimeout(startTime, 2000);
          setTimeout(displayQuestion, 3000);
      }
  }

  resetTime();

// Display Images With Answer
  function displayImage() {
      if(count === 0) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/tom_marvolo_riddle.jpg">');
      }
      else if(count === 1) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/armando_dippet.jpg">');
      }
      else if(count === 2) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/helena_ravenclaw.png">');
      }
      else if(count === 3) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/merope_gaunt.png">');
      }
      else if(count === 4) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/snitch.jpg">');
      }
      else if(count === 5) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/phoenix.jpg">');
      }
      else if(count === 6) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/lion.jpg">');
      }
      else if(count === 7) {
          $("#image-holder").show();
          $("#image-holder").html('<img src="assets/images/neville_longbottom.jpg">');
      }
  }

// Show Results Function   
  function showResults() {
      $("#correct-holder").show();
      $("#correct-holder").html("Correct: " + correct);
      $("#incorrect-holder").show();
      $("#incorrect-holder").html("Incorrect: " + incorrect);
      $("#unanswered-holder").show();
      $("#unanswered-holder").html("Unanswered: " + unanswered);
      $("#restart-holder").show();
      $("#restart-holder").html("Click Start above to play again!");
  }

// Reset Results Function 
  function resetResults() {
      correct = 0;
      incorrect = 0;
      unanswered = 0;
  }

// Start Game Function
  function startGame() {
      $(".start").hide();
      startTime();
      displayQuestion();
  }

// Start Game On Click
$(".start").on("click", function() {
  startGame();
});

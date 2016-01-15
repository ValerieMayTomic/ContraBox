bluePlayer = $(".bluePlayer");
redPlayer = $(".redPlayer");

//Obstacle creation
b1 = $("#b1");
b2 = $("#b2");
b3 = $("#b3");
b4 = $("#b4");
b5 = $("#b5");
b6 = $("#b6");
b7 = $("#b7");
b8 = $("#b8");
b9 = $("#b9");
b10 = $("#b10");
b11 = $("#b11");
b12 = $("#b12");
b13 = $("#b13");
b14 = $("#b14");
r1 = $("#r1");
r2 = $("#r2");
r3 = $("#r3");
r4 = $("#r4");
r5 = $("#r5");
r6 = $("#r6");
r7 = $("#r7");
r8 = $("#r8");
r9 = $("#r9");
r10 = $("#r10");
r11 = $("#r11");
r12 = $("#r12");
r13 = $("#r13");
r14 = $("#r14");
finishLine = $(".scoreBox");
clear = $(".clear");
turnBlue = $("#turnBlue");
turnRed = $("#turnRed");
blueWon = $("#blueWon");
redWon = $("#redWon");

/***** VARIABLES ******/

var currentBox;
var blueTurn;
var redTurn;
var hasMoved= false;
var gameOver = false;


/**** FUNCTION CALLS *****/

setUpGame();
setBox();

if(!gameOver){
$("body").keydown (function(event) {
  moveBox(event, currentBox);
});
$("body").keydown (function(event) {
  if (event.keyCode == 32)
    switchPlayer();
});
}
/****** FUNCTIONS ***************/
  
function setBox() {
  
  $('div').click(function() {
    if (!hasMoved) {
      if (blueTurn && ($(this).hasClass("bluePlayer") || $(this).hasClass("blue1by2") || $(this).hasClass("blue2by1") || $(this).hasClass("blue1by3") || $(this).hasClass("blue3by1") || $(this).hasClass("blue2by2")))
            { currentBox.css ({
                'border-color': 'black',
              })              
              currentBox = $(this);
              $(this).css( {
                'border-color': '#FFD700',
              })
            }
      if (redTurn && ($(this).hasClass("redPlayer") || $(this).hasClass("red1by2") || $(this).hasClass("red2by1") || $(this).hasClass("red1by3") || $(this).hasClass("red3by1") || $(this).hasClass("red2by2")))
            {
              currentBox.css ({
  'border-color': 'black',
              })
              currentBox = $(this);
              $(this).css ({
                'border-color': '#FFD700',
              })
            }
             }
        });
    } 

function setUpGame() {
  blueTurn = true;
  redTurn = false;
  currentBox = clear;
}

function switchPlayer() {
if(!gameOver){
   currentBox.css ({
  'border-color': 'black',
              })
  hasMoved = false;
  if (blueTurn) {
    blueTurn = false;
    redTurn = true;
     currentBox.css ({
        'border-color': 'black',
         })
    currentBox = clear;
    toggleOff('turnBlue');
    toggleOn('turnRed');
  }
  else if (redTurn) {
    redTurn = false;
    blueTurn = true; 
     currentBox.css ({
  'border-color': 'black',
              })
    currentBox = clear;
    toggleOn('turnBlue');
    toggleOff('turnRed');
  }
 
} 
}

function moveBox(event, box){
if(!gameOver){
  if (!(currentBox.hasClass("clear")))
    hasMoved = true;

  box.speed(Infinity);
 
  if (event.keyCode == 37)
    box.slide(-50, 0);
  else if (event.keyCode == 38)
    box.slide(0, 50);
  else if (event.keyCode == 39)
    box.slide(50, 0);
  else if (event.keyCode == 40)
    box.slide(0, -50);
}  
  
 $(".block").each(function(i) {
  if (this != currentBox[0]) {
    var obstacle = $(this);
  //this is where the loop of lists goes to cycle through all the blocks (this might need to be a function)
  
  
    if (isCollide(box, finishLine) && box.hasClass("bluePlayer") && !gameOver) {
      toggleOn('blueWon');
      gameOver = true;
    } 
    
    else if (isCollide(box, finishLine) && box.hasClass("redPlayer") && !gameOver) 
    {
      toggleOn('redWon');
      gameOver = true;
    } 
    
    else if (isCollide(box, obstacle) &&!gameOver){
      if (event.keyCode == 37)
        box.slide(50, 0);
      else if (event.keyCode == 38)
        box.slide(0, -50);
      else if (event.keyCode == 39)
       box.slide(-50, 0);
      else if (event.keyCode == 40)
       box.slide(0, 50);
  }
  }
}
 

)
}

function isCollide(moveBox, statBox) {
    return !(
        ((moveBox.offset().top + moveBox.height()) <=
          (statBox.offset().top)) ||
        (moveBox.offset().top >=
          (statBox.offset().top + statBox.height())) ||
        ((moveBox.offset().left + moveBox.width()) <
          statBox.offset().left) ||
        (moveBox.offset().left >
          (statBox.offset().left + statBox.width()))
    );
}

function toggleOn(id){
  var state = document.getElementById(id).style.display;
  document.getElementById(id).style.display = 'block';
}

function toggleOff(id){
  var state = document.getElementById(id).style.display;
  document.getElementById(id).style.display = 'none';
}

$(".title").click(function(){$(this).fadeOut()})

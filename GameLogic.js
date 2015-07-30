/**
 * Created by rossevans on 2015-07-29.
 */

var previousTime;


var gamecanvas;
var gamewindow;
var snakeObject;
var mapObject;
var hasFocus = true;
var gameStarted;

function resetGame(){

    var highscorehtml = document.getElementById("highscore");
    highscorehtml.innerHTML = docCookies.getItem("highscore");

    gamecanvas = document.getElementById("SnakeGame");

    gamecanvas.addEventListener("click", startGame);

    gamewindow = gamecanvas.getContext("2d");
    //draw base grid


    previousTime = Date.now();

    mapObject = new Map();

    snakeObject = new Snake(16, 9, 1);

    window.addEventListener("keydown", keypressed);

    window.onblur = function() {
        hasFocus = false;

    };

    window.onfocus = function() {
    };

    updateHighScore(0);

    gameStarted = false;
    drawMenu();



}

function gameLoop() {

    if (hasFocus && gameStarted) {


        var currenttime = Date.now();

        var dt = (currenttime-previousTime)/1000;



        previousTime = currenttime;


        update(dt);

        gamewindow.clearRect(0, 0, 640, 360);
        draw();



        requestAnimationFrame(gameLoop);
    }
    else {
        drawMenu();
    }





}

function update(dt) {
    snakeObject.update(dt);
}

function draw() {

    mapObject.draw();

    snakeObject.draw();

}

function keypressed(event) {
    snakeObject.keypressed(event.keyCode);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function updateHighScore(newhighscore) {
    var highscore = document.getElementById("highscore");
    if (newhighscore > highscore.innerHTML) {
        highscore.innerHTML = newhighscore;
    }
    var currentscore = document.getElementById("currentscore");
    currentscore.innerHTML = newhighscore;
    docCookies.setItem("highscore", highscore.innerHTML, 86400);
}

function drawMenu() {
    gamewindow.clearRect(0, 0, 640, 360);
    gamewindow.font = "30px Arial";
    gamewindow.fillText("SNAKE", 320-gamewindow.measureText("SNAKE").width/2, 180);
    if (!gameStarted) {
        gamewindow.fillText("CLICK TO PLAY", 320 - gamewindow.measureText("CLICK TO PLAY").width / 2, 280);
    } else {
        gamewindow.fillText("CLICK TO CONTINUE", 320 - gamewindow.measureText("CLICK TO CONTINUE").width / 2, 280);
    }
}

function startGame() {
    hasFocus = true;
    gameStarted = true;
    previousTime = Date.now();
    requestAnimationFrame(gameLoop);
}
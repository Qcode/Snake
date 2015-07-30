/**
 * Created by rossevans on 2015-07-29.
 */

var previousTime;


var gamecanvas;
var gamewindow;
var snakeObject;
var mapObject;
var hasFocus = true;

function resetGame(){

    gamecanvas = document.getElementById("SnakeGame");

    gamewindow = gamecanvas.getContext("2d");
    //draw base grid


    previousTime = Date.now();

    mapObject = new Map();

    snakeObject = new Snake(0, 0, 1);

    requestAnimationFrame(gameLoop);

    window.addEventListener("keydown", keypressed);

    window.onblur = function() {
        hasFocus = false;

    };

    window.onfocus = function() {
        hasFocus = true;
        previousTime = Date.now();
        requestAnimationFrame(gameLoop);
    }



}

function gameLoop() {

    if (hasFocus) {
        var currenttime = Date.now();

        var dt = (currenttime-previousTime)/1000;

        previousTime = currenttime;


        update(dt);

        gamewindow.clearRect(0, 0, 640, 360);
        draw();

        console.log();

        requestAnimationFrame(gameLoop);
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

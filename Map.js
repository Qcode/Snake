/**
 * Created by rossevans on 2015-07-30.
 */

function Map() {
    this.tiles = [];
    for (x=0;x<32;x++) {
        this.tiles[x] = [];
        for (y = 0; y < 18; y++) {
            this.tiles[x][y] = 0;
        }
    }
    this.addBlock();
}

Map.prototype.draw = function() {
    gamewindow.fillStyle = "red";
    gamewindow.beginPath();
    for (x=0;x<32;x++) {
        for (y=0;y<18;y++) {
            if (this.tiles[x][y] == 0) {
                gamewindow.rect(x * 20, y * 20, 20, 20);
            }
            else {
                gamewindow.fillRect(x*20, y*20, 20, 20);
            }
        }
    }
    gamewindow.stroke();
    gamewindow.closePath();
};

Map.prototype.addBlock = function(){
    var createnewblock = true;
    var x;
    var y;
    while (createnewblock) {
        createnewblock = false;
        x = getRandomInt(0, 31);
        y = getRandomInt(0, 17);
        if (snakeObject) {
            for (count = 1; count < snakeObject.blocks.length; count++) {
                if (x == snakeObject.blocks[count].x && y == snakeObject.blocks[count].y) {
                    createnewblock = true;

                }
            }
        }
    }
    this.tiles[x][y] = 1;
};
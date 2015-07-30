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
    var x = getRandomInt(0, 31);
    var y = getRandomInt(0, 17);
    this.tiles[x][y] = 1;
};
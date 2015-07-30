/**
 * Created by rossevans on 2015-07-30.
 */
function Snake(x, y, length) {
    this.length = length;
    this.movementTimer = 0;
    this.speed = .1;

    this.direction = {x:1, y:0};

    this.newdirection = {x:1, y:0};

    this.blocks = [];
    this.blocks[1] = {x:x, y:y};
}

Snake.prototype.update = function(dt) {
    this.movementTimer += dt;



    if (this.movementTimer > this.speed) {

        this.updatefollowers();

        this.movementTimer -= this.speed;
        if (this.newdirection.x != this.direction.x || this.newdirection.y != this.direction.y) {
            this.direction.x = this.newdirection.x;
            this.direction.y = this.newdirection.y;
        }
        this.blocks[1].x += this.direction.x;
        this.blocks[1].y += this.direction.y;


        if (this.checkDeath()) {
            return false;
        }

        this.getPoints();


    }





};

Snake.prototype.draw = function() {
    gamewindow.fillStyle = "black";
    gamewindow.beginPath();
    for (x=1;x<this.blocks.length;x++) {
        gamewindow.fillRect(this.blocks[x].x*20, this.blocks[x].y*20, 20, 20);
    }

    gamewindow.closePath();
};

Snake.prototype.keypressed = function(key) {
    if (key == 37) { //left
        if (this.direction.x != 1) {
            this.newdirection.x = -1;
            this.newdirection.y = 0;
        }
    }
    else if (key == 38) { //Up
        if (this.direction.y != 1) {
            this.newdirection.x = 0;
            this.newdirection.y = -1;
        }
    }
    else if (key == 39) { //Right
        if (this.direction.x != -1) {
            this.newdirection.x = 1;
            this.newdirection.y = 0;
        }
    }
    else if (key == 40) { //Down
        if (this.direction.y != -1) {
            this.newdirection.x = 0;
            this.newdirection.y = 1;
        }
    }
};

Snake.prototype.getPoints = function() {
    if (mapObject.tiles[this.blocks[1].x][this.blocks[1].y] == 1) {
        mapObject.tiles[this.blocks[1].x][this.blocks[1].y] = 0;
        mapObject.addBlock();
        this.addBlock();
    }
};

Snake.prototype.addBlock = function() {
    updateHighScore(this.blocks.length-1);
    this.blocks.push({x:this.blocks[1].x, y:this.blocks[1].y, activated:false});

};

Snake.prototype.updatefollowers = function() {


    for (x=2;x<this.blocks.length;x++) {
        if (!this.blocks[x].activated) {
            var canbeactivated = true;
            for (y=1;y<this.blocks.length;y++) {
                if (x != y && this.blocks[x].x == this.blocks[y].x && this.blocks[x].y == this.blocks[y].y) {
                    canbeactivated = false;
                    break;
                }
            }

            if (canbeactivated) {
                this.blocks[x].activated = true;

            }
        }
    }

    for (x=this.blocks.length-1; x > 1;x--) {
        if (this.blocks[x].activated) {
            this.blocks[x].x = this.blocks[x-1].x;
            this.blocks[x].y = this.blocks[x-1].y;
        }
    }
};

Snake.prototype.checkDeath = function() {
    for (x = 2; x < this.blocks.length; x++) {
        if (this.blocks[1].x == this.blocks[x].x && this.blocks[1].y == this.blocks[x].y && this.blocks[x].activated) {
            console.log("collision reset");
            resetGame();
            return true;

        }
    }
    if (this.blocks[1].x == -1 || this.blocks[1].x == 32 || this.blocks[1].y == -1 || this.blocks[1].y == 18) {
        resetGame();
        console.log("off reset");
        return true;
    }

};
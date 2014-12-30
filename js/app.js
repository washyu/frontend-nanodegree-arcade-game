// Enemies our player must avoid
var Enemy = function(posx, posy, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = posx;
    this.y = posy;
    this.rows = [60,144,227]
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	if (this.x > 501) {
			this.x = 0 - 101;
	} else {
			this.x = this.x + (this.speed * dt);
	}
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.rows[this.y]);
}


var Player = function(posx, posy) {
	this.x = posx;
	this.y = posy;
	this.sprite = 'images/char-boy.png';
	this.rows = [70,154,237,321,400];
	this.cols = [0,100,200,300,400];
}

Player.prototype.update = function(dt){
}

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.cols[this.x], this.rows[this.y]);
}

Player.prototype.handleInput = function(direction) {
		switch(direction) {
		case 'right':
			if(this.x < 4) {
				this.x++;
			}
			break;
		case 'left':
			if(this.x > 0) {
				this.x--;
			}
			break;
		case 'down':
			if(this.y < 4) {
				this.y++;
			}
			break;
		case "up":
			if(this.y > 0) {
				this.y--;
			}
			break;
	}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var allEnemies = [new Enemy(-101,0,50), new Enemy(-101, 1, 60), new Enemy(-101,2,70)];
var player = new Player(2,4);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

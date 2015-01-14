// Base sprite class that holds the position and image data.
var Sprite = function(posX, posY, img) {
	this.x = posX;
	this.y = posY;
	this.sprite = img;
	this.width = 101;
	this.height = 83;
};

Sprite.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Sprite.prototype.collisionCheck = function(sprite) {
	var collision = false;

	if(Math.abs(this.y - sprite.y) <= (sprite.height/2)) { //checking to see if the sprites are in the same row.
		if(Math.abs(this.x - sprite.x) <= (sprite.width/2)){  //checking if the sprites are withing half the with of each other.  This should make them look they they are hitting each other.
			collision = true;
		}
	}

	return collision;
};

// Enemies our player must avoid
var Enemy = function(posx, posy, veloicty) {
    Sprite.call(this, posx, posy, 'images/enemy-bug.png');
    this.veloicty = veloicty;
};

Enemy.prototype = Object.create(Sprite.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt){

	//if the sprite is an Ememy we will move them across the screen left to right.
	if (this.x > 505) {
		//if the Enemy of off the right of the playfield we move him back to the left minus the width of the sprite.
		this.x = -this.width;
		if(this.y >= 226) {
			//the enemy sprites will move down a row then wrap back to the top row.
			//here if they are at the bottom row we moved them to the top row.
			this.y = 60;
		} else {
			this.y += this.height;
		}
	} else {
		//if nothing else needs to be done to reposition the sprites we jsut moved them across the playfield based on time from last move times veloicty.
		this.x = this.x + (this.veloicty * dt);
	}
}

// Player object.
var Player = function() {
	Sprite.call(this, 202, 373, 'images/char-boy.png')
};

Player.prototype = Object.create(Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.handleInput = function(direction) {
		switch(direction) {
		case 'right':
			if(this.x < 404) {
				this.x += this.width;
			}
			break;
		case 'left':
			if(this.x > 0) {
				this.x -= this.width;
			}
			break;
		case 'down':
			if(this.y < 373) {
				this.y += this.height;
			}
			break;
		case "up":
			if(this.y > 0) {
				this.y -= this.height; 
			}
			break;
	}
};

Player.prototype.reset = function() {
	this.x = 202;
	this.y = 373;	
};

Player.prototype.kill = function() {
	// TODO: Add other code to handle life count.
	// But for now we will just reset the player to the starting point.
	this.reset();
};

Player.prototype.update = function(dt) {
		if(this instanceof Player) {
		if (this.y <= 0) {
			console.log("You made it!");
			this.reset();
		}
	}
};

var allEnemies = [new Enemy(-101,60,150), new Enemy(-101, 143, 500), new Enemy(-101,226,220)];

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

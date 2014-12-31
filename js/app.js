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

Sprite.prototype.update = function(dt){
	if(this instanceof Enemy){
		if (this.x > 505) {
			this.x = -this.width;
			if(this.y >= 226) {
				this.y = 60;
			} else {
				this.y += this.height;
			}
		} else {
			this.x = this.x + (this.speed * dt);
		}
	}
};

// Enemies our player must avoid
var Enemy = function(posx, posy, speed) {
    Sprite.call(this, posx, posy, 'images/enemy-bug.png');
    this.speed = speed;
};

Enemy.prototype = Object.create(Sprite.prototype);

Enemy.prototype.constructor = Enemy;

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
			if(this.y > 41) {
				this.y -= this.height; 
			}
			break;
	}
};

var allEnemies = [new Enemy(-101,60,50), new Enemy(-101, 143, 60), new Enemy(-101,226,70)];

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

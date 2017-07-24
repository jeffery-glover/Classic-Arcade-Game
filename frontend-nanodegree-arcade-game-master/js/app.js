var Enemy = function(x, y, speed) {
    //creates the image of the enemy
    this.sprite = 'images/enemy-bug.png';
    //determines the demensions of the enemy
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 60;
    //sets random speed for enemies
    this.speed = Math.floor(Math.random() * 251) + 50;
};


Enemy.prototype.update = function(dt) {
    //alows game to run at same speed across all platforms
    var distance = this.speed * dt;
    this.x = this.x + distance;
    dt = 8;
    //returns the enemy to the far side of the screen after it has crossed the screen
    if (this.x > 500) {
        this.reset();
        //sets a new random speed for the enemy
        this.speed = Math.floor(Math.random() * 251) + 50;
   }
    //calls the collision method for when the player runs into the enemy
    this.checkCollisions();
};

//sets a random track for the enemy to run across the screen on based on the three original positions of the bugs
Enemy.prototype.reset = function() {
    this.x = -100;
    var ySpot = [220, 140, 60];
    this.y = ySpot[Math.floor((Math.random() * 3))];
    this.speed = Math.floor((Math.random() * 3) + 1);
};
//renders the enemy image on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//resets the player if it hits an enemy bug
Enemy.prototype.checkCollisions = function() {
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
        console.log("checkCollisions invoked!");
        player.x = 200;
        player.y = 405;
    }
};

//holds the player image, dimensions, and speed at which it moves
var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.width = 80;
    this.height = 60;
    this.x = x;
    this.y = y;
}
//Updates the player position
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
//displays "Game Won!" and resets player if player reaches a certain point (water)
    if (this.y < 50) {
        console.log("Game Won!");
        this.x = 200;
        this.y = 405;
    }
};
//renders the player on the game board
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//assigns how far the player moves in each direction
Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys == "left") {
        this.x -= 101;
    }
    if (allowedKeys == "right") {
        this.x += 101;
    }
    if (allowedKeys == "up") {
        this.y += 83.5;
    }
    if (allowedKeys == "down") {
        this.y -= 83.5;
    }

//sets boundaries that player cannot cross
    if (this.x < 0) {
        this.x = 0;
    }
    else if (this.x > 400) {
        this.x = 400;
    }
    else if (this.y < -10) {
        this.y = -10;
    }
    else if (this.y > 405) {
        this.y = 405;
    }
};

//creates bug objects
var bug1 = new Enemy(15, 65, 35);
var bug2 = new Enemy(200, 230, 35);
var bug3 = new Enemy(100, 145, 200);
//holds all enemies
var allEnemies = [bug1, bug2, bug3];
//creates initial start position
var player = new Player(200, 405);

//assigns key on keyboard and sends to handleInput method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'down',
        39: 'right',
        40: 'up'
    };
//passes to handleInput method
    player.handleInput(allowedKeys[e.keyCode]);
});

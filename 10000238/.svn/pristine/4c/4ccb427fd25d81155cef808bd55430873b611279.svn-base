StaticMissile = function(game, posX, posY, angle, speed, missileType)
{
	this.spriteID = "mine.png";

	this.maxVelocity = 0;
	this.acceleration = 0;

	Missile.call(this, game, posX, posY, angle, speed, missileType, 3);

};
StaticMissile.prototype = Object.create(Missile.prototype);
StaticMissile.prototype.constructor = StaticMissile;

StaticMissile.prototype.UpdateMissile = function(){
	this.Hover();
},

StaticMissile.prototype.Hover = function()
{
	if(this.physicsBody.a == Math.Infinity) { return; }

	if(this.physicsBody == null) { return; }

	var radians = this.physicsBody.a;

	var forceToApply = this.physicsBody.m * this.game.gravity;
	var upwardForce = forceToApply;
	this.physicsBody.resetForces();
	this.physicsBody.applyForce(v(0, upwardForce), v(0, 0));
},

StaticMissile.prototype.PlayerCollisionCallback = function(arb)
{
	arb.ignore();
	var shapes = arb.getShapes();
	var missile = shapes[0].parentObject;
	var player = shapes[1].parentObject;

	if(player == null) {
		return;
	}

	if(player.health < 0) {
		return;
	}

	player.health -= 5;

	if(player.health > 0) player.game.achievementManager.UnlockAchievement("MineSurvive");


	var hitForce = 40;

	var distanceX = player.x - missile.x;
	var distanceY = player.y - missile.y;

	var distanceVector = new Phaser.Point(distanceX, distanceY);
	distanceVector.normalize();

	var forceDirection = new Phaser.Point(distanceX * hitForce, distanceY * hitForce);

	var randomAngularForce = 40;

	if((Math.random() * 2) == 0) {
		randomAngularForce *= -1;
	}

	player.physicsBody.applyImpulse(
		v(forceDirection.x, forceDirection.y),
		v(randomAngularForce, randomAngularForce));

	missile.collided = true;
};


DumbMissile = function(game, posX, posY, angle, speed, missileType)
{
	this.spriteID = "SAM02.png";

	this.maxVelocity = 1000;
	this.acceleration = 1000;

	Missile.call(this, game, posX, posY, angle, speed, missileType, 2);

};
DumbMissile.prototype = Object.create(Missile.prototype);
DumbMissile.prototype.constructor = DumbMissile;

DumbMissile.prototype.UpdateMissile = function(){

	this.AddAccelForce(1.0);
	this.FakeAero();
},

DumbMissile.prototype.FakeAero = function()
{
	if(this.physicsBody.a == Math.Infinity) { return; }

	var radians = this.physicsBody.a;
	var liftRatio = 1.0;

	liftRatio = Phaser.Math.clamp(liftRatio, 0, 1);

	var forceToApply = this.physicsBody.m * this.game.gravity;
	var upwardForce = forceToApply * liftRatio;
	this.physicsBody.resetForces();
	this.physicsBody.applyForce(v(0, upwardForce), v(0, 0));
},

DumbMissile.prototype.PlayerCollisionCallback = function(arb)
{
	//console.log("Dumb Missile hit player")

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

	player.health -= 10;

	if(player.health > 0)
	{
		player.game.achievementManager.UnlockAchievement("DumbSurvive");
	} 

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


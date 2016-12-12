WaveMissile = function(game, posX, posY, angle, speed, missileType)
{
	this.spriteID = "SAM02.png";

	this.maxVelocity = 1000;
	this.acceleration = 1000;

	if(speed < 0) {
		speed *= -1;
		this.rotatingLeft = false;
	}
	else {
		this.rotatingLeft = true;	
	}

	Missile.call(this, game, posX, posY, angle, speed, missileType, 1.6);


	this.turnSpeed = 250 * speed;
	this.defaultAngle = this.physicsBody.a - (Math.PI / 2);
	this.maxAngle = this.defaultAngle + (14 * (Math.PI / 180));
	this.minAngle = this.defaultAngle - (14 * (Math.PI / 180));

};
WaveMissile.prototype = Object.create(Missile.prototype);
WaveMissile.prototype.constructor = WaveMissile;

WaveMissile.prototype.UpdateMissile = function(){

	//Get angle in radians
	var angleInRadians = this.physicsBody.a - (Math.PI / 2);
		
	if(angleInRadians > this.maxAngle) {

		//if(!this.rotatingLeft) {
		//	this.physicsBody.w = 0;
		//}

		this.rotatingLeft = true;
	}

	if(angleInRadians < this.minAngle) {
		
		//if(this.rotatingLeft) {
		//	this.physicsBody.w = 0;
		//}

		this.rotatingLeft = false;
	}

	if(!this.rotatingLeft) {
		this.physicsBody.applyImpulse(v(this.turnSpeed * 0.5, 0), v(0, -3));
		this.physicsBody.applyImpulse(v(-this.turnSpeed * 0.5, 0), v(0, 3));
	}
	else {
		this.physicsBody.applyImpulse(v(-this.turnSpeed * 0.5, 0), v(0, -3));
		this.physicsBody.applyImpulse(v(this.turnSpeed * 0.5, 0), v(0, 3));
	}

	this.AddAccelForce(1.0);
	this.FakeAero();
},


WaveMissile.prototype.FakeAero = function()
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

WaveMissile.prototype.PlayerCollisionCallback = function(arb)
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


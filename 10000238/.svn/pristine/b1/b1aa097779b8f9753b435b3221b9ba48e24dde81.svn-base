GuidedMissile = function(game, posX, posY, angle, speed, missileType)
{
	this.spriteID = "SAM01.png";

	this.maxVelocity = 1900;//1920;
	this.acceleration = 2000;
	this.defaultMaxVelocity = this.maxVelocity;

	Missile.call(this, game, posX, posY, angle, speed, missileType, 2);

	this.aliveTimeMax = 4.5;
};
GuidedMissile.prototype = Object.create(Missile.prototype);
GuidedMissile.prototype.constructor = GuidedMissile;

GuidedMissile.prototype.UpdateMissile = function(){

	this.physicsBody.a = this.WrapRadians(this.physicsBody.a );

	var player = this.game.player;
	var dot = 0;

	//Get angle in radians
	var angleInRadians = this.physicsBody.a - (Math.PI / 2);
	//Get normalized vector in direction of angle. Converts angle in radians into Vector.
	var directionTravelling = new Phaser.Point(Math.cos(angleInRadians), Math.sin(angleInRadians));

	var vectorToPlayer = new Phaser.Point(player.x - this.x, player.y - this.y );
	vectorToPlayer.normalize();

	dot = (directionTravelling.x * vectorToPlayer.x) + (directionTravelling.y * vectorToPlayer.y)

	if(dot < 0.52 && dot > -0.52) {

		var playerMag = player.GetVelocityMagnitude();
		var adjustedPlayerPosition = new Phaser.Point(player.x, player.y);
		adjustedPlayerPosition.x += player.directionTravelling.x * playerMag;
		adjustedPlayerPosition.y += player.directionTravelling.y * playerMag;

		vectorToPlayer = new Phaser.Point(adjustedPlayerPosition.x - this.x, adjustedPlayerPosition.y - this.y );
		vectorToPlayer.normalize();

		dot = (directionTravelling.x * vectorToPlayer.x) + (directionTravelling.y * vectorToPlayer.y)
	}

	if(dot > 0.05 || dot < -0.05) {

		var turnSpeed = 400;
		var actualTurnSpeed = turnSpeed * Math.abs(dot);

		if(dot < 0)
		{
			this.physicsBody.applyImpulse(v(actualTurnSpeed * 0.5, 0), v(0, -10));
			this.physicsBody.applyImpulse(v(-actualTurnSpeed * 0.5, 0), v(0, 10));
		}
		else
		{
			this.physicsBody.applyImpulse(v(-actualTurnSpeed * 0.5, 0), v(0, -10));
			this.physicsBody.applyImpulse(v(actualTurnSpeed * 0.5, 0), v(0, 10));
		}
	}
	else {
		this.physicsBody.w = this.physicsBody.w * 0.3;
	}
	
	var thrustValue = 	Phaser.Math.clamp(1.0 - Math.abs(dot), 0.7, 1.0);

	var distanceToPlayer = Phaser.Point.distance(new Phaser.Point(this.x, this.y), new Phaser.Point(player.x, player.y));
	distanceToPlayer = Math.abs(distanceToPlayer);

	var minumumDistance = 2500;
	var speedRatio = distanceToPlayer / minumumDistance;
	speedRatio = Phaser.Math.clamp(speedRatio, 1.0, 10);

	this.maxVelocity = this.defaultMaxVelocity * speedRatio;

	this.AddAccelForce(thrustValue * speedRatio);
	this.FakeAero();
},

GuidedMissile.prototype.FakeAero = function()
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

GuidedMissile.prototype.PlayerCollisionCallback = function(arb)
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

	player.health -= 25;

	if(player.health > 0) player.game.achievementManager.UnlockAchievement("GuidedSurvive");


/*
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
	*/
	missile.collided = true;
};


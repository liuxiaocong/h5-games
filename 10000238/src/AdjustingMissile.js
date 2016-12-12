AdjustingMissile = function(game, posX, posY, angle, speed, missileType)
{
	this.spriteID = "SAM03.png";

	this.maxVelocity = 1000;
	this.acceleration = 500;

	Missile.call(this, game, posX, posY, angle, speed, missileType, 2);
	
	
	this.trackingDegrees = 45;
	this.lastDegrees = this.physicsBody.a * (180 / Math.PI);
	this.lastDegrees = this.WrapRadians(this.lastDegrees);
};
AdjustingMissile.prototype = Object.create(Missile.prototype);
AdjustingMissile.prototype.constructor = AdjustingMissile;

AdjustingMissile.prototype.UpdateMissile = function(){

	this.physicsBody.a = this.WrapRadians(this.physicsBody.a );

	if(this.spriteRef.inCamera) {

		var currentDegrees = this.physicsBody.a * (180 / Math.PI);
		currentDegrees = this.WrapAngle(currentDegrees);
		var difference = currentDegrees - this.lastDegrees;
		difference = this.WrapAngle(difference);
		this.trackingDegrees -= Math.abs(difference);

		this.lastDegrees = currentDegrees;

		if(this.trackingDegrees > 0) {

			var player = this.game.player;
			var dot = 0;

			var vectorToPlayer = new Phaser.Point(player.x - this.x, player.y - this.y );
			vectorToPlayer.normalize();

			//Get angle in radians
			var angleInRadians = this.physicsBody.a - (Math.PI / 2);
			//Get normalized vector in direction of angle. Converts angle in radians into Vector.
			var directionTravelling = new Phaser.Point(Math.cos(angleInRadians), Math.sin(angleInRadians));

			dot = (directionTravelling.x * vectorToPlayer.x) + (directionTravelling.y * vectorToPlayer.y)

			var turnSpeed = 40;
			var actualTurnSpeed = turnSpeed;

			if(dot < 0) {
				this.physicsBody.applyImpulse(v(actualTurnSpeed * 0.5, 0), v(0, -20));
				this.physicsBody.applyImpulse(v(-actualTurnSpeed * 0.5, 0), v(0, 20));
			}
			else {
				this.physicsBody.applyImpulse(v(-actualTurnSpeed * 0.5, 0), v(0, -20));
				this.physicsBody.applyImpulse(v(actualTurnSpeed * 0.5, 0), v(0, 20));
			}
		}
		else {
			this.physicsBody.w = this.physicsBody.w * 0.85;
		}
	}

	this.AddAccelForce(1.0);
	this.FakeAero();
},

AdjustingMissile.prototype.FakeAero = function()
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

AdjustingMissile.prototype.PlayerCollisionCallback = function(arb)
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

	if(player.health > 0) player.game.achievementManager.UnlockAchievement("HomingSurvive");


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


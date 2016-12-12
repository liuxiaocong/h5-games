BombMissile = function(game, posX, posY, angle, speed, missileType)
{
	this.spriteID = "ClusterBomb.png";

	this.maxVelocity = 5000;
	this.acceleration = 5000;

	Missile.call(this, game, posX, posY, angle, speed, missileType, 3);

};
BombMissile.prototype = Object.create(Missile.prototype);
BombMissile.prototype.constructor = BombMissile;

BombMissile.prototype.UpdateMissile = function(){
	this.FakeAero();
},

BombMissile.prototype.FakeAero = function()
{
	if(this.physicsBody.a == Math.Infinity) { return; }

	var noseDroopRatio = 1.0;

	var angleFromDown = this.physicsBody.a * (180 / Math.PI);
	angleFromDown += 90;

	//console.log(angleFromDown);

	//if(angleFromDown > 180) { angleFromDown -= 360; }
	//if(angleFromDown < -180) { angleFromDown += 360; }

	this.physicsBody.resetForces();

	if(angleFromDown > 10 || angleFromDown < -10) {

		var directionToMove = angleFromDown < 0 ? 1 : -1;
		this.physicsBody.applyImpulse(v(50 * (directionToMove * noseDroopRatio), 0), v(0, -10));
	}
	else {
		this.physicsBody.w = this.physicsBody.w * 0.85;
	}
},

BombMissile.prototype.PlayerCollisionCallback = function(arb)
{
	console.log("Dumb Missile hit player")

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


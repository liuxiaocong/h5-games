Missile = function(game, posX, posY, rotation, speedMultiplier, missileType, scale)
{
	this.x = posX;
	this.y = posY;

	this.spriteRef = null;	
	this.physicsShape = null;
	this.alive = true;
	this.active = true;
	this.collided = false;
	this.boundingBox = null;
	this.game = game;

	this.spriteRef = this.game.add.image(this.x, this.y, 'gameAtlas', this.spriteID);
	this.spriteRef.autoCull = true;
	this.game.layerThreeGroup.add(this.spriteRef);
	this.spriteRef.anchor.setTo(0.5, 0.5);
	this.spriteRef.scale.setTo(scale, scale);
	this.spriteRef.angle = rotation;

	this.thrustAnimation =  this.game.add.sprite(0, 0, "thrust_animation");
	this.thrustAnimation.body = null;
	this.thrustAnimation.visible = false;
	this.thrustAnimation.anchor.setTo(0.5, 0.1);
	this.thrustAnimation.scale.setTo(2,2);
	this.game.layerThreeGroup.add(this.thrustAnimation);

	this.thrustAnimationTime = 0.0;

	this.maxVelocity = this.maxVelocity * speedMultiplier;
	this.acceleration = this.acceleration * speedMultiplier;

	this.aliveTimer = 0;
	this.aliveTimeMax = 12;

	this.SetupPhysicsBody()
};
Missile.prototype.constructor = Missile;

Missile.prototype.SetupPhysicsBody = function()
{
	//lbrt
	var spriteWidth = this.spriteRef.width * 0.2;
	var spriteHeight = this.spriteRef.height * 0.2;

	var boundingBox = new cp.BB(
								spriteWidth,
								spriteHeight,
								-spriteWidth,
								-spriteHeight
							   );
	
	//create body definition here
	this.physicsBody = new cp.Body(10, cp.momentForBox2(10, boundingBox));
	this.game.game.space.addBody(this.physicsBody);
	this.physicsBody.setPos(v(this.x, this.game.world.height - this.y));
	this.physicsBody.setAngle(-this.spriteRef.rotation - Math.PI);

	//shape definition
	this.physicsShape = this.game.game.space.addShape(new cp.BoxShape2(this.physicsBody, boundingBox));
	this.physicsShape.setFriction(0);
	this.physicsShape.setSensor(true);
	this.physicsShape.setElasticity(0.2);
	this.physicsShape.angle = (this.spriteRef.angle);
	this.physicsShape.parentObject = this;

	this.physicsShape.setCollisionType(CollisionTags.missileCollisionType);

	this.game.game.space.addCollisionHandler(CollisionTags.missileCollisionType, CollisionTags.rocketCollisionType, 
		this.PlayerCollisionCallback, null, null, null);
};

Missile.prototype.RemoveMissile = function()
{
	//console.log("RemoveMissile");

	this.spriteRef.kill();
	this.thrustAnimation.kill();

	this.game.game.space.removeShape(this.physicsShape);
	this.physicsShape = null;

	this.alive = false;
};

Missile.prototype.PlayerCollisionCallback = function(arb)
{
	console.error("Missile prototype chain not configured properly");
};

Missile.prototype.Update = function() {

	if(this.alive) {

		if(this.collided) {
			this.game.missileManager.ShowExplosion(this.x, this.y);
			this.RemoveMissile();
		}

		if(this.active) {
			this.UpdateMissile();
			this.CapVelocity();
		}
		else {
			this.physicsBody.resetForces();
		}

		this.UpdateRenderPosition();
		this.UpdateEmitterPosition();

		if(this.aliveTimer < this.aliveTimeMax) {
			this.aliveTimer += this.game.time.elapsed / 1000;

			if(this.aliveTimer >= this.aliveTimeMax) {
				this.active = false;
				this.thrustAnimation.visible = false;
			}
		}

		if(!this.active && !this.spriteRef.inCamera) {
			this.RemoveMissile();
		}
	}
};

Missile.prototype.UpdateMissile = function(){
}

//Apply acceleration in direction rocket is facing.
Missile.prototype.AddAccelForce = function(thrustAmount)
{
	var movementSpeed = this.acceleration * thrustAmount;

	//Get angle in radians
	var angleInRadians = this.physicsBody.a;

	//Get normalized vector in direction of angle. Converts angle in radians into Vector.
	var directionTravel = new Phaser.Point(Math.cos(angleInRadians), -Math.sin(angleInRadians));

	var impulseToApply = new Phaser.Point(0,0);
	impulseToApply.x = directionTravel.x * movementSpeed;
	impulseToApply.y = directionTravel.y * -movementSpeed;

	var offset = new Phaser.Point(0,0);

	//Apply impulse
	this.physicsBody.applyImpulse(
		v(impulseToApply.x, impulseToApply.y),
		v(offset.x, offset.y));

	
	//Thrust Animation
	this.thrustAnimation.visible = true;

	this.thrustAnimationTime += this.game.time.elapsed / 1000;
	if(this.thrustAnimationTime > 0.05) {
		this.thrustAnimationTime = 0.0;
		this.thrustAnimation.frame = (this.thrustAnimation.frame == 0) ? 1 : 0;
	}
};


Missile.prototype.CapVelocity = function()
{
	var forceX = this.physicsBody.vx;
	var forceY = this.physicsBody.vy;
	var newX = 0;
	var newY = 0;

	var maxVelocity = this.maxVelocity;

	if(forceX > maxVelocity) newX = maxVelocity - forceX;
	if(forceX < -maxVelocity) newX = -maxVelocity - forceX;

	if(forceY > maxVelocity) newY = maxVelocity - forceY;
	if(forceY < -maxVelocity) newY = -maxVelocity - forceY;

	this.physicsBody.applyImpulse(v(newX, newY), v(0, 0));
};

Missile.prototype.UpdateRenderPosition = function()
{
	//change rotation
	this.spriteRef.rotation = -this.physicsBody.a - (Math.PI);

	var worldPosition = new Phaser.Point(this.physicsBody.p.x, this.game.world.height - this.physicsBody.p.y);

	this.spriteRef.x = worldPosition.x;
	this.spriteRef.y = worldPosition.y;

	this.x = this.physicsBody.p.x;
	this.y = this.physicsBody.p.y;
};

Missile.prototype.UpdateEmitterPosition = function()
{
	var emitterOffset = this.spriteRef.width * 0.5;
	
	var angleInRadians = this.spriteRef.rotation

	//Get normalized vector in direction of angle. Converts angle in radians into Vector.
	var directionTravel = new Phaser.Point(Math.cos(angleInRadians), Math.sin(angleInRadians));

	//directionTravel.multiply(emitterOffset, emitterOffset);

	directionTravel.x *= emitterOffset;
	directionTravel.y *= emitterOffset;

	this.thrustAnimation.x = this.spriteRef.x + directionTravel.x;
	this.thrustAnimation.y = this.spriteRef.y + directionTravel.y;

	this.thrustAnimation.angle = (-this.physicsBody.a * (180 / Math.PI)) + 90;
};

Missile.prototype.render = function()
{
	if(this.physicsShape != null) {

		this.game.DrawDebug(this.physicsBody, this.physicsShape.verts, 'rgba(0, 0, 0, 0.7)');
	}
};

Missile.prototype.destroy = function()
{
	if(this.spriteRef != null) this.spriteRef.destroy();
	if(this.thrustAnimation != null) this.thrustAnimation.destroy();
	if(this.physicsShape != null) this.game.game.space.removeShape(this.physicsShape);

	this.thrustAnimation = null;
	this.physicsShape = null;
	this.spriteRef = null;
}

Missile.prototype.WrapRadians = function(radians) {
	if(radians>= Math.PI) {
		radians -= (Math.PI * 2);
	}
	else if(radians < -Math.PI) {
		radians += (Math.PI * 2);
	}

	return radians;
}

Missile.prototype.WrapAngle = function(angle) {
	if(angle>= 180) {
		angle -= (360);
	}
	else if(angle < -180) {
		angle += (360);
	}

	return angle;
}


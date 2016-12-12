//Keys
var upKey;
var leftKey;
var rightKey;

var gameEndTime = 2500;
var timeSinceDeath = 0;

//Rocket
Rocket = function(game, phaserGame, space, posX, posY, partArray)
{
	this.game = game;
	this.phaserGame = phaserGame;
	this.space = space;
	this.width = 0;
	this.height = 0;
	this.scale = 0.6;
	this.health = 100;
	this.maxHealth = 100;
	this.maxVelocity = 0;
	this.hasControl = true;
	this.targetHitValue = 0;
	this.targetDestroyed = false;
	this.coinsCollected = 0;
	this.thrustButtonDown = false;
	this.leftButtonDown = false;
	this.rightButtonDown = false;
	this.warheadBody = null;
	this.fuselageBody = null;
	this.engineNoise = this.game.add.audio('EngineAudio');
	this.isEngineFiring = false;
	this.SetupControls();
	this.SetupEffects();
	this.timeSinceHit = 0;
	this.hit = false;
	this.hitDuration = 1.5;
	this.posX = posX;

	this.directionTravelling = new Phaser.Point(0,0);

	this.thrustTime = 0.0;
	this.maxThrustTime = 1.5;

	//Setup Body for use in world
	this.SetupBody(partArray, posX, posY);

	this.totalDistanceTravelled = 0;
	this.lastPosition = new Phaser.Point(this.x, this.y)

	this.game.layerThreeGroup.add(this.warheadPart.spriteRef);
	this.game.layerThreeGroup.add(this.fuselagePart.spriteRef);
	this.game.layerThreeGroup.add(this.enginePart.spriteRef);
};
Rocket.prototype.constructor = Rocket;

Rocket.prototype.SetupBody = function(partArray, posX, posY)
{
	//Setup Physics properties NEEDS ATTRIBUTES FIRST FOR MASS AND SIZE
	//Rocket Attributes
	this.enginePart = partArray[2];
	this.fuselagePart = partArray[1];
	this.warheadPart = partArray[0];
	this.ApplyPartMultipliers();
	this.SetupPhysicsBody(posX, posY);
};

Rocket.prototype.SetupEffects = function()
{
	this.thrustAnimation =  this.game.add.sprite(0, 0, "thrust_animation");
	this.thrustAnimation.body = null;
	this.thrustAnimation.visible = false;
	this.thrustAnimation.anchor.setTo(0.5, 0.1);
	if(!MissileMania.isHD) this.thrustAnimation.scale.setTo(0.5, 0.5);

	this.thrustAnimationTime = 0.0;

	this.game.layerThreeGroup.add(this.thrustAnimation);
};

Rocket.prototype.SetupBaseAttributes = function()
{
	this.acceleration = 10;
	this.turnRate = 0;
	this.mass = 0.5;
	this.maxHealth = 0;
	this.maxVelocity = 350;
};

Rocket.prototype.SetupPhysicsBody = function(positionX, positionY)
{
	this.ScalePart(this.warheadPart);
	this.ScalePart(this.fuselagePart);
	this.ScalePart(this.enginePart);
	//lbrt
	var boundingBox = new cp.BB(
								this.fuselagePart.GetPosX() - 40,
								this.fuselagePart.GetPosY() - (this.fuselagePart.GetHeight() / 2) - this.enginePart.GetHeight(),
								this.fuselagePart.GetPosX() + 40,
								this.fuselagePart.GetPosY() + (this.fuselagePart.GetHeight() / 2) + this.warheadPart.GetHeight()
							   );
	
	this.halfRocketHeight = (this.fuselagePart.GetHeight() / 2) + (this.enginePart.GetHeight());

	//create body definition here
	this.physicsBody = new cp.Body(this.mass, cp.momentForBox2(this.mass, boundingBox));
	this.space.addBody(this.physicsBody);
	this.physicsBody.setPos(v(positionX, positionY));
	this.physicsBody.setAngle(-45/*135*/ * (Math.PI / 180));

	var shrinkOffset = 100;
	//boundingBox.l += shrinkOffset;
	//boundingBox.r -= shrinkOffset;
	//boundingBox.b += shrinkOffset;
	//boundingBox.t -= shrinkOffset;

	//shape definition
	this.physicsShape = this.space.addShape(new cp.BoxShape2(this.physicsBody, boundingBox));
	this.physicsShape.setFriction(1);
	this.physicsShape.setElasticity(0.2);
	this.physicsShape.setCollisionType(CollisionTags.rocketCollisionType);
	this.physicsShape.parentObject = this;

	this.x = this.physicsBody.p.x;
	this.y = this.physicsBody.p.y;
};

Rocket.prototype.ApplyPartMultipliers = function()
{
	var components = new Array(this.warheadPart, this.fuselagePart, this.enginePart);
	this.SetupBaseAttributes();

	for(var i = 0; i < components.length; i++)
	{
		var component = components[i];

		//add all the properties!
		this.turnRate += component.turnRate;
		this.acceleration += component.acceleration;
		this.mass += component.mass;
		this.maxHealth += component.health;
		this.health += component.health;
		this.maxVelocity += component.maxVelocity;

		if(!MissileMania.isHD) this.maxVelocity *= 0.5;
	}
};

Rocket.prototype.SetupControls = function()
{
	upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
};

Rocket.prototype.Update = function()
{
	this.UpdatePartPositions();
	this.DetectInput();
	this.UpdateEmitterPosition();
	this.CheckForDeath();
	this.RemoveControl();
	this.CapVelocity();
	this.FakeAero();

	if(this.isEngineFiring && !this.hit)
	{
		this.AddAccelForce();

		this.thrustTime += this.game.time.elapsed / 1000;
		this.thrustTime = Phaser.Math.clamp(this.thrustTime, 0, this.maxThrustTime);

		//Thrust Animation
		this.thrustAnimation.visible = true;

		this.thrustAnimationTime += this.game.time.elapsed / 1000;
		if(this.thrustAnimationTime > 0.05) {
			this.thrustAnimationTime = 0.0;
			this.thrustAnimation.frame = (this.thrustAnimation.frame == 0) ? 1 : 0;
		}
		
		var newThrustScale = ((this.thrustTime / this.maxThrustTime) * 1.2) + 0.5;
		this.thrustAnimation.scale = new Phaser.Point(newThrustScale, newThrustScale)

		//Shake
		var shakeRatio = this.thrustTime / this.maxThrustTime;
		shakeRatio = 1.0 - Phaser.Math.clamp(shakeRatio, 0, 0.8);

		this.game.ShakeCamera(5 * shakeRatio, 0.1, false);

		if(!this.engineNoise.isPlaying){ this.engineNoise.play(); }	

	}else
	{
		this.engineNoise.stop();

		this.thrustAnimation.visible = false;

		this.thrustTime -= this.game.time.elapsed / 1000;
		this.thrustTime = Phaser.Math.clamp(this.thrustTime, 0, this.maxThrustTime);
	}	

	//Update total distance travelled
	this.totalDistanceTravelled += Math.abs(Phaser.Point.distance(this.lastPosition, new Phaser.Point(this.x , this.y)));
	this.lastPosition.x = this.x;
	this.lastPosition.y = this.y;
};

Rocket.prototype.UpdateRenderPosition = function(part, offsetY, physicsBody)
{
	if(physicsBody == null) {
		return;
	}

	//change rotation
	part.rotation = -physicsBody.a;

	//change position
	var directionVector = new Phaser.Point(Math.cos(-physicsBody.a - (Math.PI / 2)),
										   Math.sin(-physicsBody.a - (Math.PI / 2)));

	var worldPosition = new Phaser.Point(physicsBody.p.x, this.game.world.height - physicsBody.p.y);

	part.x = worldPosition.x + (directionVector.x * offsetY);
	part.y = worldPosition.y + (directionVector.y * offsetY);
};

Rocket.prototype.UpdatePartPositions = function()
{
	var scale = new Phaser.Point(this.scale, this.scale);
	this.warheadPart.SetScale(scale);
	this.warheadPart.SetHealth(this.health);

	this.fuselagePart.SetScale(scale);
	this.fuselagePart.SetHealth(this.health);

	this.enginePart.SetScale(scale);
	this.enginePart.SetHealth(this.health);

	this.UpdateRenderPosition(this.enginePart.spriteRef, ((-this.fuselagePart.GetHeight() / 2) - this.enginePart.GetHeight() / 2) + 3, this.physicsBody);
	this.UpdateRenderPosition(this.fuselagePart.spriteRef, 0, this.physicsBody);
	this.UpdateRenderPosition(this.warheadPart.spriteRef, ((this.fuselagePart.GetHeight() / 2) + (this.warheadPart.GetHeight() / 2)), this.physicsBody);

	if(this.physicsBody != null) {

		this.x = this.physicsBody.p.x;
		this.y = this.physicsBody.p.y;
	}
};


Rocket.prototype.CheckForDeath = function()
{
	if(this.y < 126) this.health -= (this.maxHealth / 0.5) * (this.game.time.elapsed / 1000);
	if(this.x < 160) this.health -= (this.maxHealth / 4) * (this.game.time.elapsed / 1000);
	if(this.y > this.game.world.height + 120) this.health -= (this.maxHealth / 4) * (this.game.time.elapsed / 1000);

	this.health = Phaser.Math.clamp(this.health, 0, this.maxHealth);

	if(this.health <= 0)
	{
		if(timeSinceDeath < gameEndTime)
		{
			if(timeSinceDeath == 0) {
				//Take away controls
				this.hasControl = false;
				this.isEngineFiring = false;

				//if(!this.warheadPart.HasPhysicsBody()) this.BreakRocket();

				this.fuselagePart.spriteRef.visible = false;
				this.fuselagePart.spriteRef.exists = false;
				
				this.enginePart.spriteRef.visible = false;
				this.enginePart.spriteRef.exists = false;

				this.warheadPart.spriteRef.visible = false;
				this.warheadPart.spriteRef.exists = false;

				this.engineNoise.stop();
				
				this.thrustAnimation.visible = false;

				this.game.StartCircleExplosion(this.x, this.y);

				this.game.ShakeCamera(40, 2, true);

				this.RemoveShape();

			}

			timeSinceDeath += this.game.time.elapsed;
		}else
		{
			this.engineNoise.stop();
			this.dead = true;
			timeSinceDeath = 0;
		}
	}
};


Rocket.prototype.BreakRocket = function()
{	
	var position = this.physicsBody.p;
	this.physicsBody.p.x = 0;
	this.physicsBody.p.y = 0;
	if(!this.warheadPart.HasPhysicsBody())
	{
		this.warheadPart.CreatePhysicsBody(this.space, this.physicsBody.a, this.physicsBody.getVel());		

		this.fuselagePart.CreatePhysicsBody(this.space, this.physicsBody.a, this.physicsBody.getVel());

		this.enginePart.CreatePhysicsBody(this.space, this.physicsBody.a, this.physicsBody.getVel());

		//this.engineExplosonEffect.on = true;
		//this.fuselageExplosonEffect.on = true;
		//this.warheadExplosonEffect.on = true;

		//this.game.StartCircleExplosion(this.x, this.y);

		//this.game.ShakeCamera(40, 2, true);
	}
	
};


Rocket.prototype.DetectInput = function()
{
	if(this.physicsBody == null) {
		return;
	}

/*
	//Give the player a turn rate buff if they are near the floor
	var actualheight = (this.GetHeight() - this.game.floorHeight) / this.phaserGame.world.height;
	actualheight = Phaser.Math.clamp(actualheight, 0.01, 0.6);
	var altitudeTurnRateBuff = actualheight / 0.6;
	altitudeTurnRateBuff = 3 *  (1.0 - altitudeTurnRateBuff);

	//Give the player a turn rate buff if they are facing towards the floor
	var angleFromDown = this.physicsBody.a * (180 / Math.PI);
	if(angleFromDown > 180) { angleFromDown -= 360; }
	if(angleFromDown < -180) { angleFromDown += 360; }
	if(angleFromDown < 0) { angleFromDown *= -1; }
	angleFromDown = Phaser.Math.clamp(angleFromDown, 0, 45);
	var angleTurnBuff = (angleFromDown / 45);
	angleTurnBuff = 10 *  (1.0 - angleTurnBuff);

	var turnRatio = (this.thrustTime + (this.maxThrustTime * 0.5)) / (this.maxThrustTime + (this.maxThrustTime * 0.5));
	
	*/
	var turnRate = this.turnRate;

	if(this.hasControl)
	{
		if(leftKey.isDown || this.leftButtonDown)
		{
			this.physicsBody.applyImpulse(v(turnRate * 0.5, 0), v(0, -this.halfRocketHeight * 0.5));
			this.physicsBody.applyImpulse(v(-turnRate * 0.5, 0), v(0, this.halfRocketHeight * 0.5));
		}

		if(rightKey.isDown || this.rightButtonDown)
		{
			this.physicsBody.applyImpulse(v(-turnRate * 0.5, 0), v(0, -this.halfRocketHeight * 0.5));
			this.physicsBody.applyImpulse(v(turnRate * 0.5, 0), v(0, this.halfRocketHeight * 0.5));
		}

		if(upKey.isDown || this.thrustButtonDown) 
		{
			//if(this.fuel > 0 && !this.hit)
			if(!this.hit)
			{
				this.isEngineFiring = true;
			}else
			{
				this.isEngineFiring = false;
			}
		}
		else
		{
			this.isEngineFiring = false;
		}
	}
	
};

Rocket.prototype.UpdateEmitterPosition = function()
{
	if(this.physicsBody == null) {
		return;
	}

	var emitterOffset = this.fuselagePart.GetHeight() / 2 + this.enginePart.GetHeight();

	var directionTravelling = new Phaser.Point(Math.cos(-this.physicsBody.a - (Math.PI / 2)),
										       Math.sin(-this.physicsBody.a - (Math.PI / 2)));
	directionTravelling.multiply(emitterOffset, emitterOffset);

	this.thrustAnimation.x = this.x - directionTravelling.x;
	this.thrustAnimation.y = this.game.world.height - this.y - directionTravelling.y;
	this.thrustAnimation.angle = (-this.physicsBody.a * (180 / Math.PI));
};

//Apply acceleration in direction rocket is facing.
Rocket.prototype.AddAccelForce = function()
{
	//Get angle in radians
	var angleInRadians = -this.physicsBody.a;

	//Rotate counter clockwise 90 degrees
	angleInRadians -= (Math.PI / 2);

	//Get normalized vector in direction of angle. Converts angle in radians into Vector.
	this.directionTravelling = new Phaser.Point(Math.cos(angleInRadians), Math.sin(angleInRadians));


	var impulseToApply = new Phaser.Point(0,0);
	impulseToApply.x = this.directionTravelling.x * this.acceleration;
	impulseToApply.y = this.directionTravelling.y * -this.acceleration;
	
	var offset = new Phaser.Point(0,0);
	offset.x = -this.directionTravelling.x;
	offset.y = -this.directionTravelling.y;

	//Apply impulse
	this.physicsBody.applyImpulse(
		v(impulseToApply.x, impulseToApply.y),
		v(offset.x, offset.y));
};



Rocket.prototype.RemoveControl = function()
{
	if(this.hit)
	{
		if(this.timeSinceHit < this.hitDuration)
		{
			this.isEngineFiring = false;
			//this.physicsBody.applyImpulse(v(-25, -15), v(-5, 9));
			this.timeSinceHit += this.game.time.elapsed / 1000;
		}else
		{
			this.hit = false;
			this.timeSinceHit = 0;
		}
	}
};

Rocket.prototype.CapVelocity = function()
{
	if(this.physicsBody == null) {
		return;
	}

	var forceX = this.physicsBody.vx;
	var forceY = this.physicsBody.vy;
	var newX = 0;
	var newY = 0;

	if(forceX > this.maxVelocity) newX = this.maxVelocity - forceX;
	if(forceY > this.maxVelocity) newY = this.maxVelocity - forceY;

	this.physicsBody.applyImpulse(v(newX, newY), v(0, 0));
};

Rocket.prototype.FakeAero = function()
{
	if(this.physicsBody == null) {
		return;
	}

	if(this.physicsBody.a == Math.Infinity) { return; }

	var radians = this.physicsBody.a;
	var liftRatio = this.thrustTime / this.maxThrustTime;

	liftRatio = Phaser.Math.clamp(liftRatio, 0, 1);

	var forceToApply = this.physicsBody.m * this.game.gravity;
	var upwardForce = forceToApply * liftRatio;

	this.physicsBody.resetForces();
	this.physicsBody.applyForce(v(0, upwardForce), v(0, 0));

	var noseDroopRatio = 1.0 - liftRatio;

	var angleFromDown = this.physicsBody.a * (180 / Math.PI);

	if(angleFromDown > 180) { angleFromDown -= 360; }
	if(angleFromDown < -180) { angleFromDown += 360; }

	if(angleFromDown > 15 || angleFromDown < -15) {

		var directionToMove = angleFromDown < 0 ? 1 : -1;
		this.physicsBody.applyImpulse(v(1 * (directionToMove * noseDroopRatio), 0), v(0, -this.halfRocketHeight));
	}
};

Rocket.prototype.GetDistanceTravelled = function()
{
	return Math.round(this.x / 100);
};

Rocket.prototype.GetHeight = function()
{
	if(this.physicsBody == null) return this.height / 2;
	if(!this.fuselagePart.HasPhysicsBody()) return this.physicsBody.p.y - (this.height/ 2);

	return this.fuselagePart.physicsBody.p.y - (this.fuselagePart.GetHeight()/ 2);
};

Rocket.prototype.ScalePart = function(part)
{
	part.SetScale(new Phaser.Point(this.scale, this.scale));

	if(part.GetWidth() > this.width) this.width = part.GetWidth();

	this.height += part.GetHeight();
};

Rocket.prototype.SetPart = function(part, partID)
{
	var partDictionary = {"Engine": 0, "Fuselage": 1, "Warhead": 2};

	if(part instanceof GamePart)
	{
		this.ScalePart(part);

		switch(partDictionary[partID])
		{
			case 0:
				this.enginePart.SetPosX(-10000);
				this.enginePart = part;
				break;
			case 1:
				this.fuselagePart.SetPosX(-10000);
				this.fuselagePart = part;
				break;
			case 2:
				this.warheadPart.SetPosX(-10000);
				this.warheadPart = part;
				break;
			default:
				console.log("Enter a valid PartID");
				return;
		}

		this.ApplyPartMultipliers();
	}else
	{
		console.log("Enter a valid Part for Rocket");
	}
};

Rocket.prototype.GetVelocityMagnitude = function()
{
	if(this.physicsBody == null) { return 0; }

	var velocity = new Phaser.Point(this.physicsBody.vx, this.physicsBody.vy);
	return velocity.getMagnitude();
};

Rocket.prototype.SetPos = function(x, y)
{
	this.physicsBody.setPos(v(x, y));
	this.x = this.physicsBody.p.x;
	this.y = this.physicsBody.p.y;
};

Rocket.prototype.RemoveShape = function()
{
	if(this.physicsShape != null) {
		this.space.removeShape(this.physicsShape);
	}

	if(this.physicsBody != null) {
		this.space.removeBody(this.physicsBody);
	}

	this.physicsBody = null;
	this.physicsShape = null;
}

Rocket.prototype.ResetRocket = function(posX, posY)
{
	this.width = 0;
	this.height = 0;
	this.hasControl = true;

	this.RemoveShape();

	this.SetupBody(new Array(this.warheadPart, this.fuselagePart, this.enginePart), posX, posY);

	//this.fuel = this.maxFuel;
	this.dead = false;
	this.health = this.maxHealth;
	this.targetHitValue = 0;
};

Rocket.prototype.render = function()
{
	//this.game.debug.renderSpriteBounds(this.warheadPart.spriteRef)

	if(this.physicsBody != null) {
		this.game.DrawDebug(this.physicsBody, this.physicsShape.verts, 'rgba(0, 0, 0, 0.7)');
	}
};

Rocket.prototype.destroy = function()
{
	//this.smokeEmitter.destroy();
	//this.warheadExplosonEffect.destroy();
	//this.fuselageExplosonEffect.destroy();
	//this.engineExplosonEffect.destroy();
	this.enginePart.destroy();
	this.fuselagePart.destroy();
	this.enginePart.destroy();
	this.RemoveShape();

	//this.smokeEmitter = null;
	this.warheadExplosonEffect = null;
	this.fuselageExplosonEffect = null;
	this.engineExplosonEffect = null;
	this.enginePart = null;
	this.fuselagePart = null;
	this.warheadPart = null;
	this.physicsShape = null;
	this.physicsBody = null;
};
PartData = function(parentName, atlasRef, partImageRef, smallIconRef, largeIconRef, acceleration, maxVelocity, turnRate, mass, health, isUnlocked, price)
{
	this.parentName = parentName;
	this.atlasRef = atlasRef;
	this.partImageRef = partImageRef;
	this.turnRate = turnRate;
	this.acceleration = acceleration;
	this.mass = mass;
	this.health = health;
	this.isUnlocked = isUnlocked;
	this.price = price;
	this.smallIconRef = smallIconRef;
	this.largeIconRef = largeIconRef;
	this.maxVelocity = maxVelocity;
};
PartData.prototype.constructor = PartData;

GamePart = function(posX, posY, game, partData)
{
	this.space = game.space;
	this.game = game;
	this.spriteRef = game.add.image(posX, posY, partData.atlasRef, partData.partImageRef);
	this.spriteRef.autoCull = true;
	this.spriteRef.anchor.setTo(0.5, 0.5);

	this.turnRate = partData.turnRate;
	this.acceleration = partData.acceleration;
	this.mass = partData.mass;
	this.health = partData.health;
	this.maxVelocity = partData.maxVelocity;

	this.partData = partData;

	this.physicsBody = null;

	this.SetPosX = function(x){ this.spriteRef.x = x;};
	this.GetPosX = function(){ return this.spriteRef.x; };
	this.SetPosY = function(y){ this.spriteRef.y = y; };
	this.GetPosY = function(){ return this.spriteRef.y; };

	this.GetWidth = function(){  return this.spriteRef.width; };
	this.GetHeight = function(){ return this.spriteRef.height; };

	this.SetScale = function(scale){ this.spriteRef.scale = scale; };
	this.SetHealth = function(health){ this.spriteRef.health = health; };
	this.GetHealth = function(){ return this.spriteRef.health; };

	this.SetRotation = function(rotation){ this.spriteRef.rotation = rotation; };
	this.HasPhysicsBody = function()
	{
		if(this.physicsBody == null){ return false;	}
		return true;
	};
};
GamePart.prototype.constructor = GamePart;

GamePart.prototype.CreatePhysicsBody = function(space, rotation, velocity)
{
	if(this.mass < 1) this.mass = 1;
	//Body definition
	this.physicsBody = new cp.Body(this.mass, cp.momentForBox(this.mass, this.spriteRef.width, this.spriteRef.height));

	space.addBody(this.physicsBody);
	this.physicsBody.setPos(v(this.spriteRef.x, this.game.world.height - this.spriteRef.y));
	this.physicsBody.setAngle(rotation);
	this.physicsBody.setVel(velocity);
	this.physicsBody.applyImpulse(v(-200, 200), v(50, 0));

	//shape definition
	this.physicsShape = space.addShape(new cp.BoxShape(this.physicsBody, this.spriteRef.width, this.spriteRef.height));
	this.physicsShape.setFriction(1);
	this.physicsShape.setElasticity(0.2);
	this.physicsShape.parentObject = this;
};

GamePart.prototype.RemovePhysicsBody = function(space)
{
	if(this.physicsBody == null) return;
	space.removeShape(this.physicsShape);
	space.removeBody(this.physicsBody);
	this.physicsBody = null;
	this.physicsShape = null;
};

GamePart.prototype.destroy = function()
{
	if(this.spriteRef != null) this.spriteRef.destroy();
	if(this.physicsShape != null) this.space.removeShape(this.physicsShape);
	if(this.physicsBody != null) this.space.removeBody(this.physicsBody);

	this.spriteRef = null;
	this.physicsShape = null;
	this.physicsBody = null;
};

LevelSelectPart = function(posX, posY, game, scale, partData, group)
{
	this.spriteRef = game.add.image(posX, posY, partData.atlasRef, partData.partImageRef);
	this.spriteRef.scale.setTo(scale, scale);
	this.spriteRef.anchor.setTo(0.5, 1);
	this.spriteRef.autoCull = true;
	this.spriteRef.body = null;	
	group.add(this.spriteRef);

	this.turnRate = partData.turnRate;
	this.acceleration = partData.acceleration;
	this.mass = partData.mass;
	this.health = partData.health;
	this.isUnlocked = partData.isUnlocked;
	this.maxVelocity = partData.maxVelocity;
	
	this.partData = partData;


	this.GetPrice = function(){ partData.price; };
	this.UnlockPart = function(){ partData.isUnlocked = true; };
	this.SetPosX = function(x){ this.spriteRef.x = x;};
	this.GetPosX = function(){ return this.spriteRef.x; };
	this.SetPosY = function(y){ this.spriteRef.y = y; };
	this.GetPosY = function(){ return this.spriteRef.y; };

	this.GetWidth = function(){  return this.spriteRef.width; };
	this.GetHeight = function(){ return this.spriteRef.height; };

	this.GetSmallIconRef = function(){ this.partData.smallIconRef; };
	this.GetLargeIconRef = function(){ this.partData.largeIconRef; };
};
LevelSelectPart.prototype.constructor = LevelSelectPart;

LevelSelectPart.prototype.SetPos = function(x, y)
{
	this.spriteRef.x = x;
	this.spriteRef.y = y;
};

LevelSelectPart.prototype.destroy = function()
{
	if(this.spriteRef != null) this.spriteRef.destroy();

	this.spriteRef = null;
};


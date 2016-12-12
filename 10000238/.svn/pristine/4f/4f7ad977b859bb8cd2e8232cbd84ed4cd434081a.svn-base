FuelCollectable = function(imageRef, game, posX, posY)
{
	Collectable.call(this, imageRef, game,posX, posY, 4, CollisionTags.fuelCollisionTag, true);	
};
FuelCollectable.prototype = Object.create(Collectable.prototype);
FuelCollectable.prototype.constructor = FuelCollectable;

FuelCollectable.prototype.PlayerCollisionCallback = function(arb)
{
	var shapes = arb.getShapes();
	var collectable = shapes[0].parentObject;
	var player = shapes[1].parentObject;

	//player.fuel += player.maxFuel / 10;
	//player.fuel = Phaser.Math.clamp(player.fuel, 0, player.maxFuel);
	collectable.collided = true;
};

FuelCollectable.prototype.Update = function()
{
	/*
	var distanceX = this.game.player.x - this.posX;
	var distanceY = this.game.player.y - this.posY;

	var distanceVector = new Phaser.Point(distanceX, distanceY);

	if(distanceVector.getMagnitude() < 400)
	{
		distanceVector.normalize();

		this.posX += distanceVector.x * this.movementSpeed;
		this.posY += distanceVector.y * this.movementSpeed;
	}
	else {
		var defaultDistanceX = this.defaultPosX - this.posX;
		var defaultDistanceY = this.defaultPosY - this.posY;

		var defaultDistanceVector = new Phaser.Point(defaultDistanceX, defaultDistanceY);
		distanceVector.normalize();

		this.posX += defaultDistanceVector.x * this.movementSpeed;
		this.posY += defaultDistanceVector.y * this.movementSpeed;
	}

	this.spriteRef.x = this.posX;
	this.spriteRef.y = this.game.world.height - this.posY;
	
	this.game.game.space.removeShape(this.physicsShape);
	this.AddShape();
	*/
};
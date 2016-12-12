CoinCollectable = function(imageRef, game, posX, posY)
{
	Collectable.call(this, imageRef, game, posX, posY, 4, CollisionTags.coinCollisionTag, true);
};
CoinCollectable.prototype = Object.create(Collectable.prototype);
CoinCollectable.prototype.constructor = CoinCollectable;

CoinCollectable.prototype.PlayerCollisionCallback = function(arb)
{
	var shapes = arb.getShapes();
	var collectable = shapes[0].parentObject;
	var player = shapes[1].parentObject;

	player.coinsCollected++;

	if(player.coinsCollected >= 10)
	{
		player.game.achievementManager.UnlockAchievement("TenCollected");
	}

	if(player.coinsCollected >= 50)
	{
		player.game.achievementManager.UnlockAchievement("FiftyCollected");
	}

	if(player.coinsCollected >= 100)
	{
		player.game.achievementManager.UnlockAchievement("HundredCollected");
	}

	collectable.collided = true;
};

CoinCollectable.prototype.UpdateCollectable = function()
{
	if(this.physicsBody == null) { return; }
	if(this.physicsShape == null) { return; }

	var distanceX = this.game.player.x - this.x;
	var distanceY = this.game.player.y - this.y;

	var distanceVector = new Phaser.Point(distanceX, distanceY);

	var distance = distanceVector.getMagnitude();
	var maxDistance = 800;
	var scale = (distance - 200) / (maxDistance * 0.5);
	scale = Phaser.Math.clamp(scale, 0.0, 1.0);

	this.spriteRef.scale.setTo(scale * this.defaultScale);

	if(distance < 600 && this.game.player.health > 0)
	{
		distanceVector.normalize();

		var playerMag = this.game.player.GetVelocityMagnitude() * 0.05;
		var adjustedPlayerPosition = new Phaser.Point(this.game.player.x, this.game.player.y);
		adjustedPlayerPosition.x += this.game.player.directionTravelling.x * playerMag;
		adjustedPlayerPosition.y += this.game.player.directionTravelling.y * playerMag;

		vectorToPlayer = new Phaser.Point(adjustedPlayerPosition.x - this.x, adjustedPlayerPosition.y - this.y );
		vectorToPlayer.normalize();

		var movementSpeed = 2500;

		//Apply impulse
		this.physicsBody.applyImpulse(
			v(vectorToPlayer.x * movementSpeed, vectorToPlayer.y * movementSpeed),
			v(0, 0));
	}
	else {
		var forceX = this.physicsBody.vx;
		var forceY = this.physicsBody.vy;
		var newX = 0;
		var newY = 0;

		var maxVelocity = 0;

		newX = newX * -0.9;
		newY = newY * -0.9;


		if(newX == 0 && newY == 0) {
			return;
		}


		this.physicsBody.applyImpulse(v(newX, newY), v(0, 0));
	}
};
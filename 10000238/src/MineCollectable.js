MineCollectable = function(imageRef, game, posX, posY)
{
	Collectable.call(this, imageRef, game, posX, posY, 2, CollisionTags.mineCollisionTag, false);
};
MineCollectable.prototype = Object.create(Collectable.prototype);
MineCollectable.prototype.constructor = MineCollectable;

MineCollectable.prototype.PlayerCollisionCallback = function(arb)
{
	var shapes = arb.getShapes();
	var collectable = shapes[0].parentObject;


	var player = shapes[1].parentObject;
	collectable.collided = true;

	var hitForce = (Math.random() * 200) + 100;

	var distanceX = player.x - collectable.posX;
	var distanceY = player.y - collectable.posY;

	var distanceVector = new Phaser.Point(distanceX, distanceY);
	distanceVector.normalize();

	var forceDirection = new Phaser.Point(distanceX * hitForce, distanceY * hitForce);

	var randomAngularForce = Math.random() * 100;

	if((Math.random() * 2) == 0) {
		randomAngularForce *= -1;
	}

	player.physicsBody.applyImpulse(
		v(forceDirection.x, forceDirection.y),
		v(randomAngularForce, randomAngularForce));
};
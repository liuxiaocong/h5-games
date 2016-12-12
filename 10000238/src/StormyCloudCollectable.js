StormyCloudCollectable = function(imageRef, game, posX, posY)
{
	Collectable.call(this, imageRef, game, posX, posY, 7, CollisionTags.stormyCloudCollisionTag, true);
};
StormyCloudCollectable.prototype = Object.create(Collectable.prototype);
StormyCloudCollectable.prototype.constructor = StormyCloudCollectable;

StormyCloudCollectable.prototype.PlayerCollisionCallback = function(arb)
{
	var shapes = arb.getShapes();
	var collectable = shapes[0].parentObject;
	var player = shapes[1].parentObject;
	//collectable.collided = true;
	player.hit = true;
};
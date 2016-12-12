Collectable = function(imageRef, game, posX, posY, scale, collisionType, isSensor)
{
	this.x = posX;
	this.y = posY;
	this.defaultPosX = posX;
	this.defaultPosY = posY;
	this.movementSpeed = 50;
	this.isSensor = isSensor;
	this.scale = scale;
	this.collisionType = collisionType;
	this.defaultScale = scale;

	this.imageRef = imageRef;
	this.spriteRef = null;	
	this.physicsShape = null;
	this.alive = true;
	this.collided = false;
	this.boundingBox = null;
	this.game = game;

	this.bounceSpeed = 2;
	this.bounceOffset = 10;	

	this.spriteRef = this.game.add.image(this.x, this.game.world.height - this.y, 'gameAtlas', this.imageRef);
	this.spriteRef.autoCull = true;
	this.game.layerThreeGroup.add(this.spriteRef);
	this.spriteRef.anchor.setTo(0.5, 0.5);
	this.spriteRef.scale.setTo(this.scale , this.scale);

	this.AddShape()
};
Collectable.prototype.constructor = Collectable;

Collectable.prototype.RemoveCollectable = function()
{
	if(this.spriteRef != null) this.spriteRef.destroy();
	this.spriteRef = null;

	if(this.physicsBody != null) this.game.game.space.removeBody(this.physicsBody);
	if(this.physicsShape != null) this.game.game.space.removeShape(this.physicsShape);
	this.physicsShape = null;
	this.physicsBody = null;
	this.alive = false;
};

Collectable.prototype.AddShape = function()
{
	//lbrt
	this.boundingBox = new cp.BB((this.spriteRef.width * 0.5), 
								 (this.spriteRef.height * 0.5),
								 -(this.spriteRef.width * 0.5) , 
								 -(this.spriteRef.height * 0.5));


	this.physicsBody = new cp.Body(2, cp.momentForBox2(2, this.boundingBox));
	this.game.game.space.addBody(this.physicsBody);
	this.physicsBody.setPos(v(this.x, this.y));
	this.physicsBody.setAngle(-this.spriteRef.rotation - Math.PI);

	//shape definition
	this.physicsShape = this.game.game.space.addShape(new cp.BoxShape2(this.physicsBody, this.boundingBox));
	this.physicsShape.setSensor(this.isSensor);
	this.physicsShape.setFriction(0.5);
	this.physicsShape.setElasticity(0.2);
	this.physicsShape.setCollisionType(this.collisionType);
	this.physicsShape.parentObject = this;

	this.game.game.space.addCollisionHandler(this.collisionType, CollisionTags.rocketCollisionType, 
		this.PlayerCollisionCallback, null, null, null);
};

Collectable.prototype.PlayerCollisionCallback = function(arb)
{
	console.error("Collectable prototype chain not configured properly");
};

Collectable.prototype.Update = function(){

	if(!this.alive) {
		return;
	}

	this.Float();
	this.UpdateRenderPosition();
	this.UpdateCollectable();
};

Collectable.prototype.UpdateCollectable = function(){
}

Collectable.prototype.UpdateRenderPosition = function()
{
	if(this.physicsBody == null) { return; }

	//change rotation
	this.spriteRef.rotation = -this.physicsBody.a - (Math.PI);

	var worldPosition = new Phaser.Point(this.physicsBody.p.x, this.game.world.height - this.physicsBody.p.y);

	this.spriteRef.x = worldPosition.x;
	this.spriteRef.y = worldPosition.y;

	this.x = this.physicsBody.p.x;
	this.y = this.physicsBody.p.y;
};

Collectable.prototype.Float = function()
{
	if(this.physicsBody.a == Math.Infinity) { return; }

	if(this.physicsBody == null) { return; }

	var radians = this.physicsBody.a;

	var forceToApply = this.physicsBody.m * this.game.gravity;
	var upwardForce = forceToApply;
	this.physicsBody.resetForces();
	this.physicsBody.applyForce(v(0, upwardForce), v(0, 0));
};

Collectable.prototype.destroy = function()
{
	if(this.spriteRef != null) this.spriteRef.destroy();
	if(this.physicsBody != null) this.game.game.space.removeBody(this.physicsBody);
	if(this.physicsShape != null) this.game.game.space.removeShape(this.physicsShape);
	
	this.physicsBody = null;
	this.physicsShape = null;
	this.spriteRef = null;
}

Collectable.prototype.render = function()
{
	if(this.physicsShape != null && this.physicsBody != null) {
		this.game.DrawDebug(this.physicsBody, this.physicsShape.verts, 'rgba(0, 0, 0, 0.7)');
	}
};

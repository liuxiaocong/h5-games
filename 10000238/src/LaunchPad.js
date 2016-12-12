LaunchPad = function(game, phaserGame, posX, posY)
{
	this.game = game;
	this.phaserGame = phaserGame;
	this.posX = posX;
	this.posY = posY;

	this.islandYOffset = GetYPos(375, this.phaserGame);

	this.islandSpriteRef = this.game.add.image(this.posX, this.game.world.height - this.posY, 'gameAtlas', "Cat_Island.png");
	this.islandSpriteRef.autoCull = true;

	this.padSpriteRef = this.game.add.image(this.posX, (this.game.world.height - this.posY) - this.islandYOffset, 'gameAtlas', "Launch_Pad_Base.png");
	this.padSpriteRef.autoCull = true;

	this.backgroundSpriteRef = this.game.add.image(this.posX + GetXPos(10, this.phaserGame), ((this.game.world.height - this.posY) -  this.islandYOffset) - (GetYPos(this.padSpriteRef.height, this.phaserGame) + GetYPos(80, this.phaserGame)), 'gameAtlas', "Launch_Pad_Mast.png");
	this.backgroundSpriteRef.autoCull = true;
	this.backgroundSpriteRef.angle = 45;
	
	this.islandSpriteRef.scale.setTo(2, 2);
	this.padSpriteRef.scale.setTo(2, 2);
	this.backgroundSpriteRef.scale.setTo(2, 2);

	this.islandSpriteRef.anchor.setTo(0.5, 1);
	this.padSpriteRef.anchor.setTo(0.5, 1);
	this.backgroundSpriteRef.anchor.setTo(0.5, 1);
	
	this.game.layerTwoGroup.add(this.backgroundSpriteRef);
	this.game.layerTwoGroup.add(this.padSpriteRef);
	this.game.layerTwoGroup.add(this.islandSpriteRef);

	this.physicsShape = null;
};
LaunchPad.prototype.constructor = LaunchPad;

LaunchPad.prototype.AddPad = function()
{
	this.alive = true;
	this.CreateShape();
};

LaunchPad.prototype.CreateShape = function()
{
	var staticBody = this.game.game.space.staticBody;
	this.boundingBox = new cp.BB(this.posX - GetXPos(900, this.phaserGame), 
								 this.posY,
								 this.posX + GetXPos(900, this.phaserGame), 
								 this.posY + GetYPos((this.padSpriteRef.height * 0.75), this.phaserGame) + this.islandYOffset);

	//shape definition
	this.physicsShape = this.game.game.space.addShape(new cp.BoxShape2(staticBody, this.boundingBox));
	this.physicsShape.setElasticity(0);
	this.physicsShape.setFriction(1);	
	this.physicsShape.setLayers(NOT_GRABABLE_MASK);


	this.rampRightShape = new cp.PolyShape(staticBody, new Array(this.posX , this.posY + GetYPos((this.padSpriteRef.height * 0.975), this.phaserGame) + this.islandYOffset, 
															this.posX + GetXPos(450, this.phaserGame), (this.posY + GetYPos(this.padSpriteRef.height, this.phaserGame)) + this.islandYOffset + GetYPos(450, this.phaserGame), 
															this.posX + GetXPos(200, this.phaserGame), this.posY + this.islandYOffset + GetYPos(120, this.phaserGame)), v(0,0))

	this.rampRightPhysicsShape = this.game.game.space.addShape(this.rampRightShape);
	this.rampRightPhysicsShape.setElasticity(0);
	this.rampRightPhysicsShape.setFriction(0);	
	this.rampRightPhysicsShape.setLayers(NOT_GRABABLE_MASK);

	this.rampLeftShape = new cp.PolyShape(staticBody, new Array(this.posX  - GetXPos(80, this.phaserGame), (this.posY + GetYPos(this.padSpriteRef.height, this.phaserGame)) + GetYPos(160, this.phaserGame) + this.islandYOffset,
																this.posX + GetXPos(100, this.phaserGame) , this.posY + GetYPos(this.padSpriteRef.height, this.phaserGame) + this.islandYOffset, 
															this.posX  - GetXPos(200, this.phaserGame), this.posY + GetYPos(this.padSpriteRef.height, this.phaserGame) + this.islandYOffset), v(0,0))

	this.rampLeftPhysicsShape = this.game.game.space.addShape(this.rampLeftShape);
	this.rampLeftPhysicsShape.setElasticity(0);
	this.rampLeftPhysicsShape.setFriction(0);	
	this.rampLeftPhysicsShape.setLayers(NOT_GRABABLE_MASK);

	this.boundingBox = null;
};

LaunchPad.prototype.RemovePad = function()
{
	this.game.game.space.removeShape(this.physicsShape);
	this.alive = false;
};

LaunchPad.prototype.Update = function()
{
	var maxDistance = 3000;
	var distanceFromPlayer = this.game.player.x - this.posX;

	if(this.alive)
	{
		if(distanceFromPlayer > maxDistance || distanceFromPlayer < -maxDistance)
		{
			this.RemovePad();
		}
	}else
	{
		if(distanceFromPlayer < maxDistance && distanceFromPlayer > -maxDistance)
		{			
			this.AddPad();
		}
	}
};

LaunchPad.prototype.destroy = function()
{
	this.padSpriteRef.destroy();
	this.islandSpriteRef.destroy();
	this.backgroundSpriteRef.destroy();
	this.game.game.space.removeShape(this.rampLeftPhysicsShape);
	this.game.game.space.removeShape(this.rampRightPhysicsShape);

	this.rampRightPhysicsShape = null;
	this.padSpriteRef = null;
	this.backgroundSpriteRef = null;
	this.rampLeftPhysicsShape = null;
	this.islandSpriteRef = null;
},

LaunchPad.prototype.render = function()
{
	//this.phaserGame.debug.renderRectangle(new Phaser.Rectangle(0,0,1000,1000))
	this.game.DrawDebug(this.phaserGame.space.staticBody, this.physicsShape.verts, 'rgba(255, 0, 255, 0.7)');

	this.game.DrawDebug(this.phaserGame.space.staticBody, this.rampRightPhysicsShape.verts, 'rgba(0, 0, 0, 0.7)');
	this.game.DrawDebug(this.phaserGame.space.staticBody, this.rampLeftPhysicsShape.verts, 'rgba(0, 255, 0, 0.7)');
}


Cloud = function(imageRef, game)
{
	this.game = game;

	this.x = this.GetRandomXPosition() - 4750;
	this.y = this.GetRandomYPosition();

	this.spriteRef = this.game.add.image(this.x, this.y, 'gameAtlas', imageRef);
	this.spriteRef.autoCull = true;
	this.spriteRef.scale = new Phaser.Point(10,10);
	this.game.layerTwoGroup.add(this.spriteRef);
	this.spriteRef.anchor.setTo(0.5, 0.5);

	this.alive = true;
};

Cloud.prototype.constructor = Cloud;

Cloud.prototype.update = function()
{
	this.KillCloud();
	this.RespawnCloud();

	this.spriteRef.x = this.x;
	this.spriteRef.y = this.y;
};

Cloud.prototype.GetRandomXPosition = function() 
{
	return (Math.random() * 8000) + 4750;
}

Cloud.prototype.GetRandomYPosition = function() 
{
	return (Math.random() * (this.game.world.height - 800)) - 400
}

Cloud.prototype.RespawnCloud = function()
{
	if(!this.alive)
	{
		this.alive = true;
		this.spriteRef.visible=true;

		this.x = this.game.player.x + this.GetRandomXPosition();
		this.y = this.GetRandomYPosition();;
	}
};

Cloud.prototype.KillCloud = function()
{
	if(this.alive &&
	  (this.game.player.x - this.x > 4500))
	{
		this.alive = false;
		this.spriteRef.visible=false;
	}
};

Cloud.prototype.destroy = function()
{
	this.spriteRef.destroy();
	this.spriteRef = null;
};

SeaManager = function(game)
{
	this.player = game.player;
	this.game = game;

	this.seaBackgroundSpriteArray = new Array(3);
	this.seaBackgroundXSize = 5;
	this.seaBackgroundYSize = 1;
	this.seaSeperation = 256 * 3;

	for(var i = 0; i < this.seaBackgroundSpriteArray.length; i++) {
		
		var seaPart = this.game.add.tileSprite((this.seaSeperation * this.seaBackgroundXSize) * (i), this.game.world.height - 120, 768, 165, 'gameAtlas', 'Sea.png');
		seaPart.tileScale.setTo(3 / this.seaBackgroundXSize, 1);
		seaPart.scale.setTo(this.seaBackgroundXSize, 1);
		this.seaBackgroundSpriteArray[i] = seaPart;
		this.game.layerOneGroup.add(seaPart);
	}

	this.seaForegroundSpriteArray = new Array(3);
	this.seaForegroundXSize = 5;
	this.seaForegroundYSize = 1;

	for(var i = 0; i < this.seaForegroundSpriteArray.length; i++) {
		
		var seaPart = this.game.add.tileSprite((this.seaSeperation * this.seaForegroundXSize) * (i), this.game.world.height, 768, 156, 'gameAtlas', 'Sea_Front.png');
		seaPart.tileScale.setTo(3 / this.seaForegroundXSize, 3 / this.seaForegroundYSize);
		seaPart.scale.setTo(this.seaForegroundXSize, this.seaForegroundYSize);
		this.seaForegroundSpriteArray[i] = seaPart;
		this.game.layerFiveGroup.add(seaPart);
	}

	this.seaForegroundBottomSpriteArray = new Array(3);
	this.seaForegroundBottomXSize = 5;
	this.seaForegroundBottomYSize = 4;

	for(var i = 0; i < this.seaForegroundBottomSpriteArray.length; i++) {
		
		var seaPart = this.game.add.tileSprite((this.seaSeperation * this.seaForegroundBottomXSize) * (i), this.game.world.height + 156, 768, 174, 'gameAtlas', 'Sea_Tile.png');
		seaPart.tileScale.setTo(3 / this.seaForegroundBottomXSize, 3 / this.seaForegroundBottomYSize);
		seaPart.scale.setTo(this.seaForegroundBottomXSize, this.seaForegroundBottomYSize);
		this.seaForegroundBottomSpriteArray[i] = seaPart;
		this.game.layerFiveGroup.add(seaPart);
	}

	this.lastCameraPosition = this.game.camera.x;
};

SeaManager.prototype.constructor = SeaManager;

SeaManager.prototype.Update = function()
{
	var cameraMovement = this.game.camera.x - this.lastCameraPosition;

	for(var i = 0; i < this.seaBackgroundSpriteArray.length; i++) {
		var backgroundSea = this.seaBackgroundSpriteArray[i];
		var foregroundSea = this.seaForegroundSpriteArray[i];
		var foregroundBottomSea = this.seaForegroundBottomSpriteArray[i];

		if(cameraMovement > 0) {
			if(backgroundSea.x <= (this.game.camera.x / this.game.scale) - (this.seaSeperation * this.seaBackgroundXSize)) {
				backgroundSea.x += (this.seaSeperation * this.seaBackgroundXSize) * this.seaBackgroundSpriteArray.length;
				foregroundSea.x = backgroundSea.x;
				foregroundBottomSea.x = backgroundSea.x;
			}
		}
		else {
			if(backgroundSea.x > ((this.game.camera.x / this.game.scale) + (this.game.camera.width / this.game.scale))) {
				backgroundSea.x -= ((this.seaSeperation * this.seaBackgroundXSize) * this.seaBackgroundSpriteArray.length);
				foregroundSea.x = backgroundSea.x;
				foregroundBottomSea.x = backgroundSea.x;
			}
		}
	}

	this.lastCameraPosition  = this.game.camera.x;
};


SeaManager.prototype.destroy = function()
{
	while(this.seaBackgroundSpriteArray.length > 0)
	{
		var end = this.seaBackgroundSpriteArray.length - 1;
		this.seaBackgroundSpriteArray[end].destroy();
		this.seaBackgroundSpriteArray.pop();
	}

	this.seaBackgroundSpriteArray = null;

	while(this.seaForegroundSpriteArray.length > 0)
	{
		var end = this.seaForegroundSpriteArray.length - 1;
		this.seaForegroundSpriteArray[end].destroy();
		this.seaForegroundSpriteArray.pop();
	}

	this.seaForegroundSpriteArray = null;

	while(this.seaForegroundBottomSpriteArray.length > 0)
	{
		var end = this.seaForegroundBottomSpriteArray.length - 1;
		this.seaForegroundBottomSpriteArray[end].destroy();
		this.seaForegroundBottomSpriteArray.pop();
	}

	this.seaForegroundBottomSpriteArray = null;
};


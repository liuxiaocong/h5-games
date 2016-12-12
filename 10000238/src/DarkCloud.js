DarkCloud = function(game, posX, posY, jsonData)
{
	this.game = game;
	this.posX = posX;
	this.posY = posY;
	this.cloudSprites = new Array();

	this.alive = true;

	this.CreateDarkCloud(jsonData);
};
DarkCloud.prototype.constructor = Island;

DarkCloud.prototype.CreateDarkCloud = function(jsonData)
{
	var cloudScale = 3;

	var spriteWidth = GetXPos(254 * cloudScale, this.game.game);
	var spriteHeight = GetYPos(254 * cloudScale, this.game.game);
	
	var mapWidth = jsonData.layers[0].width;
	var mapHeight = jsonData.layers[0].height;

	var mapPixelsHeight = GetYPos((256 * mapHeight), this.game.game);

	var data = jsonData.layers[0].data;

	for(var i = 0; i < mapWidth * mapHeight; i++){

		var x = (i % mapWidth);
		var y = Math.floor(i / mapWidth);

		var posX = (x * spriteWidth);
		var posY =  (y * -spriteHeight) + spriteHeight;

		posX = Phaser.Math.floor(posX);
		posY = Phaser.Math.floor(posY);

		var tileIndex = data[i];

		if(tileIndex != 0) {

			var tileString = "";

			if(tileIndex == 1) {
				tileString = "Cloud_End_Left.png";
			}
			else if(tileIndex == 2) {
				tileString = "Cloud_Tile_Blank.png";
			}
			else if(tileIndex == 3) {
				tileString = "Cloud_End_Right.png";
			}

			var sprite = this.game.add.image(this.posX + posX, this.posY + (mapPixelsHeight - posY), 'gameAtlas', tileString);
			sprite.scale.setTo(cloudScale)
			sprite.y -= sprite.height;
			sprite.autoCull = true;
			this.cloudSprites.push(sprite);
			this.game.layerFourGroup.add(sprite);
			
			var aboveTileIndex = i + mapWidth;

			var needsCap = true;

			if(tileIndex == 1 || tileIndex == 3) {
				needsCap = false;
			}
			else if (aboveTileIndex < mapWidth * mapHeight) {

				if(data[aboveTileIndex] != 0) {
					needsCap = false;
				}
			}

			if(needsCap) {

				var capSprite = this.game.add.image(this.posX + posX, (this.posY + (mapPixelsHeight - posY)), 'gameAtlas', "Cloud_Cap_NonTiled.png");
				capSprite.scale.setTo(cloudScale)
				capSprite.autoCull = true;
				capSprite.body = null;
				this.cloudSprites.push(capSprite);
				this.game.layerFourGroup.add(capSprite);
			}
		}
	}

	//Setup physics from tilemap
	var staticBody = this.game.game.space.staticBody;

	this.physicsShapeArray = new Array(jsonData.layers[1].objects.length);

	for(var i = 0; i < jsonData.layers[1].objects.length; i++) {

		var polyObjectOffsetX = GetXPos(jsonData.layers[1].objects[i].x, this.game.game);
		var polyObjectOffsetY =  0 - GetYPos(jsonData.layers[1].objects[i].y, this.game.game);

		var polyLine = jsonData.layers[1].objects[i].polyline;

		var polyLineArray = new Array((polyLine.length - 1) * 2)

		var index = 0;

		for(var a = 0; a < polyLine.length; a++) {

			polyLineArray[index] = this.posX + ((polyObjectOffsetX + GetXPos(polyLine[a].x, this.game.game)) * cloudScale);

			var startPosY = this.posY;
			var offsetPosY = ((GetYPos(polyLine[a].y, this.game.game) * -1) + polyObjectOffsetY) * cloudScale

			polyLineArray[index + 1] = this.game.world.height + startPosY + offsetPosY;

			index += 2;
		}

		var polyShape = new cp.PolyShape(staticBody, polyLineArray, v(0,0))

		//shape definition
		this.physicsShapeArray[i] = this.game.game.space.addShape(polyShape);
		this.physicsShapeArray[i].setCollisionType(CollisionTags.darkCloudCollisionType);
		this.physicsShapeArray[i].parentObject = this;
	}

	
	this.game.game.space.addCollisionHandler(CollisionTags.darkCloudCollisionType, CollisionTags.rocketCollisionType , 
		null, this.PlayerCollisionCallback, null, null);
};

DarkCloud.prototype.PlayerCollisionCallback = function(arb)
{
	//arb.ignore();
	var shapes = arb.getShapes();
	var cloud = shapes[0].parentObject;
	var player = shapes[1].parentObject;

	player.health -= (player.maxHealth / 4) * (cloud.game.time.elapsed / 1000);
};

DarkCloud.prototype.Kill = function()
{
	for(var i = 0; i < this.cloudSprites.length; i++)
	{		
		this.cloudSprites[i].kill();
	}

	this.alive = false;
};

DarkCloud.prototype.Revive = function()
{
	for(var i = 0; i < this.cloudSprites.length; i++)
	{		
		this.cloudSprites[i].revive();
	}

	this.alive = true;
};

DarkCloud.prototype.destroy = function()
{
	while(this.cloudSprites.length > 0)
	{
		var end = this.cloudSprites.length - 1;

		if(this.cloudSprites[end] != null) this.cloudSprites[end].destroy();

		this.cloudSprites.pop();
	}

	for(var i = 0; i < this.physicsShapeArray.length; i++) {
		this.game.game.space.removeStaticShape(this.physicsShapeArray[i]);
		this.physicsShapeArray[i] = null;
	}

	this.physicsShapeArray = null;
}

DarkCloud.prototype.render = function()
{

	if(this.physicsShapeArray != null) {

		for(var i = 0; i < this.physicsShapeArray.length; i++) {
			this.game.DrawDebug(this.game.game.space.staticBody, this.physicsShapeArray[i].verts, 'rgba(255, 0, 0, 0.7)');
		}
	}
};

DarkCloudManager = function(game)
{
	this.cloudArray = new Array();
	this.player = game.player;
	this.game = game;
	this.cloudSpawnDistance = 0;

	this.cloudBackgroundSpriteArray = new Array(3);
	this.cloudCapBackgroundSpriteArray = new Array(3);
	this.cloudBackgroundSize = 5;
	this.cloudSeperation = 256 * 3;

	for(var i = 0; i < 3; i++) {
		
		var cloud = this.game.add.tileSprite((this.cloudSeperation * this.cloudBackgroundSize) * (i - 1), 0, 768, 768, 'gameAtlas', 'Cloud_Tile_Blank.png');
		cloud.tileScale.setTo(3 / this.cloudBackgroundSize, 3 / this.cloudBackgroundSize);
		cloud.scale.setTo(this.cloudBackgroundSize, this.cloudBackgroundSize);
		cloud.y -= this.cloudSeperation * this.cloudBackgroundSize;
		this.cloudBackgroundSpriteArray[i] = cloud;
		this.game.layerFourGroup.add(cloud);

		var cloudCap = this.game.add.tileSprite((this.cloudSeperation * this.cloudBackgroundSize) * (i - 1), cloud.y + cloud.height, 768, 201, 'gameAtlas', 'Cloud_Cap.png');
		cloudCap.tileScale.setTo(3 / this.cloudBackgroundSize, 3);
		cloudCap.scale.setTo(this.cloudBackgroundSize, 1);
		this.cloudCapBackgroundSpriteArray[i] = cloudCap;
		this.game.layerFourGroup.add(cloudCap);
	}

	this.lastCameraPosition = this.game.camera.x;
};

DarkCloudManager.prototype.constructor = DarkCloudManager;

DarkCloudManager.prototype.Update = function()
{
	this.UpdateBackgroundClouds();

	if(this.game.furthestDistanceTravelled > this.cloudSpawnDistance) {

		var cloudDataName = "cloudData";

		var randomCloudInt = Math.floor((Math.random() * 4)) + 1;

		if(randomCloudInt < 10) {
			cloudDataName += "0";
		}
	
		cloudDataName += randomCloudInt.toString();
			
		var spawnXPosition = this.cloudSpawnDistance + GetXPos(15000 + (Math.random() * 10000), this.game.game);
		spawnXPosition = Math.floor(spawnXPosition);
		
		var snapValue = spawnXPosition  % this.cloudSeperation
		spawnXPosition -= snapValue;

		this.AddCloud(spawnXPosition, 0, cloudDataName); 

		this.cloudSpawnDistance = spawnXPosition;
	}

	for(var i = 0; i < this.cloudArray.length; i++)
	{
		var maxDistance = 10000;
		var cloud = this.cloudArray[i];
		var distanceFromPlayer =  cloud.posX - this.player.x;

		if(distanceFromPlayer < -maxDistance)
		{
			cloud.Kill();
		}
	}	

	for(var i = 0; i < this.cloudArray.length; i++)
	{
		if(!this.cloudArray[i].alive) {
			this.cloudArray[i].destroy();
			this.cloudArray.splice(i, 1);
		}
	}
};

DarkCloudManager.prototype.UpdateBackgroundClouds = function()
{
	var cameraMovement = this.game.camera.x - this.lastCameraPosition;

	for(var i = 0; i < this.cloudBackgroundSpriteArray.length; i++) {
		var backgroundCloud = this.cloudBackgroundSpriteArray[i];
		var backgroundCloudCap = this.cloudCapBackgroundSpriteArray[i];

		if(cameraMovement > 0) {
			if(backgroundCloud.x <= (this.game.camera.x / this.game.scale) - (this.cloudSeperation * this.cloudBackgroundSize)) {
				backgroundCloud.x += (this.cloudSeperation * this.cloudBackgroundSize) * this.cloudBackgroundSpriteArray.length;
				backgroundCloudCap.x = backgroundCloud.x;
			}
		}
		else {
			if(backgroundCloud.x > ((this.game.camera.x / this.game.scale) + (this.game.camera.width / this.game.scale))) {
				backgroundCloud.x -= ((this.cloudSeperation * this.cloudBackgroundSize) * this.cloudBackgroundSpriteArray.length);
				backgroundCloudCap.x = backgroundCloud.x;
			}
		}
	}

	this.lastCameraPosition  = this.game.camera.x;
}

DarkCloudManager.prototype.AddCloud = function(posX, posY, jsonFileName)
{
	var jsonData = JSON.parse(this.game.cache.getText(jsonFileName));

	this.cloudArray.push(new DarkCloud(this.game, posX, posY, jsonData));
};

DarkCloudManager.prototype.destroy = function()
{
	while(this.cloudArray.length > 0)
	{
		var end = this.cloudArray.length - 1;
		this.cloudArray[end].destroy();
		this.cloudArray.pop();
	}

	while(this.cloudBackgroundSpriteArray.length > 0)
	{
		var end = this.cloudBackgroundSpriteArray.length - 1;
		this.cloudBackgroundSpriteArray[end].destroy();
		this.cloudBackgroundSpriteArray.pop();
	}

	while(this.cloudCapBackgroundSpriteArray.length > 0)
	{
		var end = this.cloudCapBackgroundSpriteArray.length - 1;
		this.cloudCapBackgroundSpriteArray[end].destroy();
		this.cloudCapBackgroundSpriteArray.pop();
	}

	this.cloudCapBackgroundSpriteArray = null;
	this.cloudBackgroundSpriteArray = null;
	this.cloudArray = null;
};

DarkCloudManager.prototype.render = function()
{
	for(var i = 0; i < this.cloudArray.length; i++)
	{
		var cloud = this.cloudArray[i];
		cloud.render();
	}
};

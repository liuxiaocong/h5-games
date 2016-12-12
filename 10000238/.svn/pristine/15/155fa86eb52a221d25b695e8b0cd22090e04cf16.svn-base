Island = function(posX, posY, game, jsonData)
{
	this.game = game;
	this.posX = posX;
	this.posY = posY;
	this.islandSprites = new Array();

	this.alive = true;

	this.CreateStandardIsland(jsonData);
};
Island.prototype.constructor = Island;

Island.prototype.CreateStandardIsland = function(jsonData)
{
	var islandScale = 3;

	var spriteWidth = GetXPos(254, this.game.game) * islandScale;
	var spriteHeight = GetYPos(254, this.game.game) * islandScale;
	
	this.spawnPointArray = new Array(2);
	this.spawnPointArray[0] = new Phaser.Point(500, 200);
	this.spawnPointArray[1] = new Phaser.Point(1000, 240);

	var mapWidth = jsonData.layers[0].width;
	var mapHeight = jsonData.layers[0].height;

	var mapPixelsHeight = (256 * mapHeight);

	//Setup land from tilemap
	var data = jsonData.layers[0].data;

	//Setup decals from tilemap
	var decalsArray = jsonData.layers[2].objects;
	for(var i = 0; i < decalsArray.length; i++)
	{
		var typeIndex = decalsArray[i].properties.Type;

		var decalString = "";

		if(typeIndex == 0) {
			decalString = "Palm_01.png";
		}
		else if (typeIndex == 1) {
			decalString = "Palm_02.png";
		}

		var decalPosX = GetXPos(decalsArray[i].x, this.game.game);
		var decalPosY = GetYPos((mapPixelsHeight - (decalsArray[i].y)) - decalsArray[i].height, this.game.game);
		var sprite = this.game.add.image(this.posX + (decalPosX * islandScale), (this.game.world.height -this.posY)  - (decalPosY * islandScale), 'gameAtlas', decalString);

		var scaleX = (Math.random() * 0.75) + 0.5
		sprite.scale.setTo(scaleX * islandScale);
		sprite.y -= sprite.height;

		if(typeIndex == 0) {
			//sprite.x -= sprite.width * 0.5;
		}
		else if (typeIndex == 1) {
			sprite.x -= sprite.width * 0.5;
		}
		sprite.autoCull = true;
		sprite.body = null;
		this.islandSprites.push(sprite);
		this.game.layerThreeGroup.add(sprite);
	}

	for(var i = 0; i < mapWidth * mapHeight; i++){

		var x = (i % mapWidth);
		var y = Math.floor(i / mapWidth);

		var posX = (x * spriteWidth);
		var posY =  ((spriteHeight * mapHeight) - (y * spriteHeight)) - (spriteHeight);

		posX = Phaser.Math.floor(posX);
		posY = Phaser.Math.floor(posY);

		var tileIndex = data[i];

		if(tileIndex != 0) {

			var tileString = "";

			if(tileIndex == 1) {
				tileString = "Island_End_Left.png";
			}
			else if(tileIndex == 2) {
				tileString = "Island_Tile_Blank.png";
			}
			else if(tileIndex == 3) {
				tileString = "Island_End_Right.png";
			}
			else if(tileIndex == 4) {
				tileString = "Island_Tile_Cave02.png";
			}
			else if(tileIndex == 5) {
				tileString = "Island_Tile_Cave03.png";
			}
			else if(tileIndex == 6) {
				tileString = "Island_Tile_Cave01.png";
			}
			else if(tileIndex == 7) {
				tileString = "Island_Tile_Cave04.png";
			}

			var sprite = this.game.add.image(this.posX + posX, (this.game.world.height - this.posY) - posY, 'gameAtlas', tileString);
			sprite.scale.setTo(islandScale)
			sprite.y -= sprite.height;
			sprite.autoCull = true;
			sprite.body = null;
			this.islandSprites.push(sprite);
			this.game.layerThreeGroup.add(sprite);

			var aboveTileIndex = i - mapWidth;

			var needsGrass = true;

			if(tileIndex == 1 || tileIndex == 3 || tileIndex == 6) {
				needsGrass = false;
			}
			else if (aboveTileIndex >= 0) {

				if(data[aboveTileIndex] != 0) {
					needsGrass = false;
				}
			}

			if(needsGrass) {

				var grassSprite = this.game.add.image(this.posX + posX, ((this.game.world.height - this.posY) - posY) - spriteHeight, 'gameAtlas', "Island_Tile_Grass.png");
				grassSprite.scale.setTo(islandScale)
				grassSprite.y -= grassSprite.height;
				grassSprite.autoCull = true;
				grassSprite.body = null;
				this.islandSprites.push(grassSprite);
				this.game.layerThreeGroup.add(grassSprite);
			}

			var needsLeftEdge = true;
			if(tileIndex == 1) {
				needsLeftEdge = false;
			}

			if(x != 0 && data[i - 1] != 0) {
				needsLeftEdge = false;
			}

			if(needsLeftEdge) {

				var leftEdgeSprite = this.game.add.image(this.posX + posX, ((this.game.world.height - this.posY) - posY), 'gameAtlas', "Island_Flat_End_Left.png");
				leftEdgeSprite.scale.setTo(islandScale)
				leftEdgeSprite.y -= leftEdgeSprite.height;
				leftEdgeSprite.x -= leftEdgeSprite.width;
				leftEdgeSprite.autoCull = true;
				leftEdgeSprite.body = null;
				this.islandSprites.push(leftEdgeSprite);
				this.game.layerThreeGroup.add(leftEdgeSprite);
			}

			var needsRightEdge = true;
			if(tileIndex == 3) {
				needsRightEdge = false;
			}

			if(x != mapWidth && data[i + 1] != 0) {
				needsRightEdge = false;
			}

			if(needsRightEdge) {

				var rightEdgeSprite = this.game.add.image((this.posX + posX) + spriteWidth, ((this.game.world.height - this.posY) - posY), 'gameAtlas', "Island_Flat_End_Right.png");
				rightEdgeSprite.scale.setTo(islandScale)
				rightEdgeSprite.y -= rightEdgeSprite.height;
				rightEdgeSprite.autoCull = true;
				rightEdgeSprite.body = null;
				this.islandSprites.push(rightEdgeSprite);
				this.game.layerThreeGroup.add(rightEdgeSprite);
			}
		}
	}


	//Setup physics from tilemap
	var staticBody = this.game.game.space.staticBody;

	this.physicsShapeArray = new Array(jsonData.layers[1].objects.length);

	for(var i = 0; i < jsonData.layers[1].objects.length; i++) {

		//console.log("Creating Shape : " + i)

		var polyObjectOffsetX = jsonData.layers[1].objects[i].x;
		var polyObjectOffsetY = mapPixelsHeight - jsonData.layers[1].objects[i].y;

		var polyLine = jsonData.layers[1].objects[i].polyline;

		var polyLineArray = new Array((polyLine.length - 1) * 2)

		var index = 0;

		for(var a = 0; a < polyLine.length; a++) {

			polyLineArray[index] = this.posX + GetXPos(((polyObjectOffsetX + polyLine[a].x) * islandScale), this.game.game);

			var startPosY = this.posY;
			var offsetPosY = GetYPos(((polyLine[a].y * -1) + polyObjectOffsetY)* islandScale, this.game.game);

			polyLineArray[index + 1] = startPosY + offsetPosY;

			index += 2;
		}

		var polyShape = new cp.PolyShape(staticBody, polyLineArray, v(0,0))

		//shape definition
		this.physicsShapeArray[i] = this.game.game.space.addShape(polyShape);
		//this.physicsShapeArray[i].setSensor(true);
		this.physicsShapeArray[i].setCollisionType(CollisionTags.islandCollisionType);
		this.physicsShapeArray[i].parentObject = this;
	}

	
	this.game.game.space.addCollisionHandler(CollisionTags.islandCollisionType, CollisionTags.rocketCollisionType , 
		this.PlayerCollisionCallback, null, null, null);

	//this.Kill();
};

Island.prototype.PlayerCollisionCallback = function(arb)
{
	arb.ignore();
	var shapes = arb.getShapes();
	var island = shapes[0].parentObject;
	var player = shapes[1].parentObject;

	//if(player.hasControl)
	//{
	player.health = -1;
	player.physicsBody.applyImpulse(v(-player.physicsBody.vx * player.physicsBody.m / 1.5, 0), v(0, 0));
	//}
};

Island.prototype.Kill = function()
{
	for(var i = 0; i < this.islandSprites.length; i++)
	{		
		this.islandSprites[i].kill();
	}

	this.alive = false;
};

Island.prototype.Revive = function()
{
	for(var i = 0; i < this.islandSprites.length; i++)
	{		
		this.islandSprites[i].revive();
	}

	this.alive = true;
};

Island.prototype.destroy = function()
{
	while(this.islandSprites.length > 0)
	{
		var end = this.islandSprites.length - 1;

		if(this.islandSprites[end] != null) this.islandSprites[end].destroy();

		this.islandSprites.pop();
	}

	for(var i = 0; i < this.physicsShapeArray.length; i++) {
		this.game.game.space.removeStaticShape(this.physicsShapeArray[i]);
		this.physicsShapeArray[i] = null;
	}

	this.physicsShapeArray = null;
}

Island.prototype.render = function()
{

	if(this.physicsShapeArray != null) {

		for(var i = 0; i < this.physicsShapeArray.length; i++) {
			this.game.DrawDebug(this.game.game.space.staticBody, this.physicsShapeArray[i].verts, 'rgba(255, 0, 0, 0.7)');
		}
	}

};

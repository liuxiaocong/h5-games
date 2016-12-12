Structure = function(game, posX, posY, jsonData, structureNumber, targetNumber)
{
	this.targetNumber = targetNumber;
	this.structureNumber = structureNumber;
	this.game = game;

	this.posX = posX;
	this.posY = posY;

	this.x = 0;
	this.y = 0;

	this.alive = true;

	this.jsonData = jsonData;

	this.coinValue = 10;
	this.destroyed = false;

	this.AddStructure();
	this.CreateShape();
};
Structure.prototype.constructor = Structure;

Structure.prototype.AddStructure = function()
{
	var scale = 3;
	var islandScale = 3;
	if(this.structureAliveSprite == null)
	{
		var structureObject = this.jsonData.layers[3].objects[this.structureNumber];

		var xOffset = GetXPos(structureObject.x, this.game.game);
		var yOffset = GetYPos(((this.jsonData.layers[3].height * 256) - structureObject.y) - (structureObject.height ), this.game.game);

		var typeString = "";
		var typeProperty = structureObject.properties.Type;

		if(typeProperty == 0) {

			typeString = "Pill_Box";
		}
		else if (typeProperty == 1) {

			typeString = "Radar_Dish";
		}
		else if (typeProperty == 2) {

			typeString = "Hanger";
		}
		else if (typeProperty == 3) {

			typeString = "SAM_Launcher";
		}

		this.structureAliveSprite = this.game.add.image(this.posX + (xOffset * islandScale), (this.game.world.height - this.posY) - (yOffset * islandScale), 'gameAtlas', typeString + ".png");
		this.structureAliveSprite.scale.setTo(scale, scale);
		this.structureAliveSprite.y -= this.structureAliveSprite.height ;
		this.structureAliveSprite.autoCull = true;
		this.structureAliveSprite.body = null;

		this.structureDeadSprite = this.game.add.image(this.posX + (xOffset * islandScale), (this.game.world.height - this.posY) -  (yOffset * islandScale), 'gameAtlas', typeString + "_Destroyed.png");
		this.structureDeadSprite.scale.setTo(scale, scale);
		this.structureDeadSprite.y -= this.structureDeadSprite.height;
		this.structureDeadSprite.autoCull = true;
		this.structureDeadSprite.body = null;

		//Setup missles if this is a sam launcher
		if(typeProperty == 3) {

			this.SAMArray = new Array(3);

			for(var i = 0; i < 3; i++) {
				var missileSprite = this.game.add.image(this.posX + (xOffset * islandScale), ((this.game.world.height - this.posY) -  (yOffset * islandScale)), 'gameAtlas', "Sam_Missile.png");
				missileSprite.y -= GetYPos(520 - (60 * i), this.game.game);
				missileSprite.x += GetXPos(320 - (120 * i), this.game.game);
				missileSprite.scale.setTo(scale - (0.4 * i));
				missileSprite.autoCull = true;
				missileSprite.body = null;
				missileSprite.angle = 57.5;
				missileSprite.anchor = new Phaser.Point(0.5, 0.5)

				this.game.layerThreeGroup.add(missileSprite);
				this.SAMArray[2 - i] = missileSprite;
			}

			this.SAMLaunchDelay = 0.0;
		}

		this.game.layerThreeGroup.add(this.structureAliveSprite);
		this.game.layerThreeGroup.add(this.structureDeadSprite);
		
		this.x = this.structureAliveSprite.x;
		this.y = this.structureAliveSprite.y;

		this.structureDeadSprite.kill();
		
	}else
	{
		if(this.destroyed)
		{
			this.Kill();
		}else
		{
			this.Revive();
		}
	}
};

Structure.prototype.GetWidth = function()
{
	return this.structureDeadSprite.width;
}

Structure.prototype.Update = function()
{
	/*
	if(this.SAMArray != null && !this.destroyed) {

		var player = this.game.player;

		var distanceToPlayer = Phaser.Point.distance(new Phaser.Point(this.x, this.game.world.height - this.y), new Phaser.Point(player.x,  player.y))

		distanceToPlayer = Math.abs(distanceToPlayer);

		if(Math.abs(distanceToPlayer) < 10000 && this.SAMLaunchDelay <= 0) { 

			for(var i = this.SAMArray.length - 1; i >= 0; i--) {
				var SAMSprite = this.SAMArray[i];

				this.game.SAMMissileManager.AddMissile(this.game, SAMSprite.x, SAMSprite.y, SAMSprite.scale.x, SAMSprite.angle);

				SAMSprite.destroy();
				this.SAMArray.pop();

				this.SAMLaunchDelay = 4.5;

				break;
			}
		}
		
		if (this.SAMLaunchDelay > 0) {

			this.SAMLaunchDelay -= this.game.time.elapsed / 1000;
		}
	}
	*/
}

Structure.prototype.Kill = function()
{
	if(!this.alive) {
		return;
	}

	this.alive = false;
	
	if(!this.destroyed)
	{
		this.structureAliveSprite.kill();
		this.structureDeadSprite.kill();
		if(this.physicsShape != null) this.RemoveShape();

		if(this.SAMArray != null) {
			for(var i = 0; i < this.SAMArray.length; i++) {
				this.SAMArray[i].kill();
			}
		}
	}else
	{
		this.structureDeadSprite.kill();
		this.structureAliveSprite.kill();

		if(this.SAMArray != null) {
			for(var i = 0; i < this.SAMArray.length; i++) {
				this.SAMArray[i].kill();
			}
		}
	}
};

Structure.prototype.Revive = function()
{
	if(this.alive) {
		return;
	}

	this.alive = true;

	if(!this.destroyed)
	{
		this.structureAliveSprite.revive();
		this.structureDeadSprite.kill();
		if(this.physicsShape == null) this.CreateShape();

		if(this.SAMArray != null) {
			for(var i = 0; i < this.SAMArray.length; i++) {
				this.SAMArray[i].revive();
			}
		}
	}else
	{
		this.structureDeadSprite.revive();
		this.structureAliveSprite.kill();

		if(this.SAMArray != null) {
			for(var i = 0; i < this.SAMArray.length; i++) {
				this.SAMArray[i].kill();
			}
		}
	}
};

Structure.prototype.CreateShape = function()
{
	var staticBody = this.game.game.space.staticBody;
	var shrinkOffset = this.structureAliveSprite.width / 5;

	//lbrt
	var boundingBox = new cp.BB(
								(this.structureAliveSprite.x+ shrinkOffset),
								(this.game.world.height - this.structureAliveSprite.y) - this.structureAliveSprite.height,
								(this.structureAliveSprite.x + this.structureAliveSprite.width)  - shrinkOffset,
								(this.game.world.height - this.structureAliveSprite.y) - shrinkOffset
							   );

	//shape definition
	this.physicsShape = this.game.game.space.addShape(new cp.BoxShape2(staticBody, boundingBox));
	this.physicsShape.setSensor(true);
	this.physicsShape.setCollisionType(CollisionTags.structureCollisionType);
	this.physicsShape.parentObject = this;

	this.game.game.space.addCollisionHandler(CollisionTags.structureCollisionType, CollisionTags.rocketCollisionType , 
		this.PlayerCollisionCallback, null, null, null);
};

Structure.prototype.RemoveShape = function()
{
	this.game.game.space.removeShape(this.physicsShape);
	this.physicsShape = null;
};

Structure.prototype.MissileLaunched = function() {

	if(this.SAMArray != null) {
		for(var i = 0; i < this.SAMArray.length; i++) {
			
			if(!this.SAMArray[i].hasLaunched) {
				//this.SAMArray[i].canLaunch = true;
				break;
			}
		}
	}
}

Structure.prototype.PlayerCollisionCallback = function(arb)
{
	arb.ignore();
	var shapes = arb.getShapes();
	var structure = shapes[0].parentObject;
	var player = shapes[1].parentObject;

	if(player.hasControl)
	{
		structure.structureAliveSprite.kill();
		structure.structureDeadSprite.revive();
		structure.destroyed = true;
		player.game.achievementManager.UnlockAchievement("TargetDestroyed");

		if(structure.SAMArray != null) {
			for(var i = 0; i < structure.SAMArray.length; i++) {
				structure.SAMArray[i].kill();
			}
		}



		player.health = -1;
		player.targetDestroyed = true;
		player.targetHitValue += structure.coinValue;
		player.physicsBody.applyImpulse(v(-player.physicsBody.vx * player.physicsBody.m / 1.5, 0), v(0, 0));

		var structRef = {"target": structure.targetNumber, "structure": structure.structureNumber};

		MissileMania.levelData.deadStructureList.push(structRef);
	}
};

Structure.prototype.render = function()
{
	if(!this.alive) { return; }

	if(this.physicsShape != null) {
		this.game.DrawDebug(this.game.game.space.staticBody, this.physicsShape.verts, 'rgba(0, 0, 0, 0.7)');
	}
};

Structure.prototype.destroy = function()
{
	if(this.physicsShape != null) this.game.game.space.removeShape(this.physicsShape);
	if(this.structureAliveSprite != null) this.structureAliveSprite.destroy();
	if(this.structureDeadSprite != null) this.structureDeadSprite.destroy();

	this.structureDeadSprite = null;
	this.structureAliveSprite = null;
	this.physicsShape = null;
};

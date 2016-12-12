Target = function(game, posX, posY, targetNumber, jsonFileName)
{
	this.targetNumber = targetNumber;
	this.game = game;
	this.posX = posX;
	this.posY = posY;
	this.structureArray = new Array();

	this.alive = true;

	var jsonData = JSON.parse(this.game.cache.getText(jsonFileName));

	var structCount = jsonData.layers[3].objects.length;

	this.structureArray = new Array(structCount);

	for(var i = 0; i < structCount; i++) {

		this.structureArray[i] = new Structure(game, posX, posY, jsonData, i,this.targetNumber);
	}

	this.island = new Island(posX, posY, game, jsonData);
};
Target.prototype.constructor = Target;


Target.prototype.ReviveTarget = function()
{
	for(var i = 0; i < this.structureArray.length; i++)
	{
		this.structureArray[i].Revive();
	}

	this.island.Revive();

	this.alive = true;
};

Target.prototype.KillTarget = function()
{
	for(var i = 0; i < this.structureArray.length; i++)
	{
		this.structureArray[i].Kill();
	}

	this.island.Kill();

	this.alive = false;
};

Target.prototype.IsTargetDestroyed = function()
{
	var allStructuresDestroyed = true;

	for(var i = 0; i < this.structureArray.length; i++)
	{
		if(this.structureArray[i].destroyed == false) allStructuresDestroyed = false;
	}

	return allStructuresDestroyed;
};

Target.prototype.destroy = function()
{
	this.island.destroy();

	for(var i = 0; i < this.structureArray.length; i++) 
	{
		this.structureArray[i].destroy();
	}
};

Target.prototype.Update = function()
{

	for(var i = 0; i < this.structureArray.length; i++)
	{
		var structure = this.structureArray[i];
		if(this.structureArray[i].alive) {
			structure.Update();
		}
	}
}

Target.prototype.render = function()
{
	this.island.render();

	for(var i = 0; i < this.structureArray.length; i++)
	{
		var structure = this.structureArray[i];
		if(this.structureArray[i].alive) {
			structure.render();
		}
	}
};

Target.prototype.NumberOfStructures = function()
{
	return this.structureArray.length;
};

Target.prototype.NumberOfAliveStructures = function()
{
	var total = 0;

	for(var i = 0; i < this.structureArray.length; i++)
	{
		if(!this.structureArray[i].destroyed) total++;
	}

	return total;
}

TargetManager = function(game)
{
	this.targetArray = new Array();
	this.player = game.player;
	this.game = game;
	this.targetSpawnDistance = 0;
};

TargetManager.prototype.constructor = TargetManager;

TargetManager.prototype.Update = function()
{
	if(this.game.furthestDistanceTravelled > this.targetSpawnDistance) {

		var islandDataName = "islandData";

		var randomIslandInt = Math.floor((Math.random() * 17)) + 1;

		if(randomIslandInt < 10) {
			islandDataName += "0";
		}
			
		islandDataName += randomIslandInt.toString();
			
		var spawnXPosition = this.targetSpawnDistance + GetXPos((15000) + (Math.random() * 7000), this.game.game);

		this.AddTarget(spawnXPosition, 0, islandDataName); 

		this.targetSpawnDistance = spawnXPosition;
	}

	for(var i = 0; i < this.targetArray.length; i++)
	{
		var maxDistance = 10000;
		if(!MissileMania.isHD) maxDistance *= 0.5;
		var target = this.targetArray[i];
		var distanceFromPlayer =  target.posX - this.player.x;

		target.Update();

		if(distanceFromPlayer < -maxDistance)
		{
			target.KillTarget();
		}
	}	

	for(var i = 0; i < this.targetArray.length; i++)
	{
		if(!this.targetArray[i].alive) {
			this.targetArray[i].destroy();
			this.targetArray.splice(i, 1);
		}
	}
};

TargetManager.prototype.AddTarget = function(posX, posY, jsonFileName)
{
	this.targetArray.push(new Target(this.game, posX, posY, this.targetArray.length, jsonFileName));
};

TargetManager.prototype.destroy = function()
{
	while(this.targetArray.length > 0)
	{
		var end = this.targetArray.length - 1;
		this.targetArray[end].destroy();
		this.targetArray.pop();
	}

	this.targetArray = null;
};

TargetManager.prototype.render = function()
{
	for(var i = 0; i < this.targetArray.length; i++)
	{
		var target = this.targetArray[i];
		target.render();
	}
};




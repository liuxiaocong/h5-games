CollectableManager = function(game)
{
	this.game = game;
	this.player = game.player;
	this.collectableArray = new Array();
	this.lastCoinPatternChoice = -1;
	this.lastMinePatternChoice = -1;

	this.soundEffectArray = new Array(6);

	for(var i = 0; i < this.soundEffectArray.length; i++) {
		this.soundEffectArray[i] = this.game.add.audio('CoinCollect');
	}
	this.currentCoinSFXIndex = 0;

	this.collectableSpawnDistance = 6000;
};

CollectableManager.prototype.constructor = CollectableManager;

CollectableManager.prototype.AddCollectable = function(collectable)
{
	this.collectableArray.push(collectable);
};

CollectableManager.prototype.GenerateCoinPattern = function(xSpawn, ySpawn)
{
	var startX = xSpawn;
	var startY = ySpawn;

	var pattern = new Array();
	var patternCount = 10;

	var patternChoice = Math.floor((Math.random()*patternCount));

	while (patternChoice == this.lastCoinPatternChoice) {
		patternChoice = Math.floor((Math.random()*patternCount));
	}

	this.lastCoinPatternChoice = patternChoice;

	if(patternChoice == 0) {
		pattern[0] = new Array(1,1,1)
		pattern[1] = new Array(1,1,1)
		pattern[2] = new Array(1,1,1)
	}
	else if(patternChoice == 1) {
		pattern[0] = new Array(1,1,1,1,1)
	}
	else if(patternChoice == 2) {
		pattern[0] = new Array(0,1)
		pattern[1] = new Array(0,1)
		pattern[2] = new Array(0,1)
		pattern[3] = new Array(0,1)
		pattern[4] = new Array(0,1)
	}
	else if(patternChoice == 3) {
		pattern[0] = new Array(0,1,0)
		pattern[1] = new Array(1,1,1)
		pattern[2] = new Array(0,1,0)
	}
	else if(patternChoice == 4) {
		pattern[0] = new Array(1,0,0,0,1)
		pattern[1] = new Array(0,1,0,1,0)
		pattern[2] = new Array(0,0,1,0,0)
	}
	else if(patternChoice == 5) {
		pattern[0] = new Array(1,0,0,0,1)
		pattern[1] = new Array(0,1,1,1,0)
		pattern[2] = new Array(0,1,1,1,0)
		pattern[3] = new Array(1,0,0,0,1)
	}
	else if(patternChoice == 6) {
		pattern[0] = new Array(1,1)
		pattern[1] = new Array(1,1)
		pattern[2] = new Array(1,1)
		pattern[3] = new Array(1,1)
	}
	else if(patternChoice == 7) {
		pattern[0] = new Array(1,0,1)
		pattern[1] = new Array(1,1,1)
		pattern[2] = new Array(1,1,1)
		pattern[3] = new Array(1,0,1)
	}
	else if(patternChoice == 8) {
		pattern[0] = new Array(1,1,1,1,1)
		pattern[1] = new Array(1,0,0,0,1)
		pattern[2] = new Array(1,0,1,0,1)
		pattern[3] = new Array(1,0,0,0,1)
		pattern[3] = new Array(1,1,1,1,1)
	}
	else if(patternChoice == 9) {
		pattern[0] = new Array(0,1,1,1,0)
		pattern[1] = new Array(1,0,1,0,1)
		pattern[2] = new Array(1,1,1,1,1)
		pattern[3] = new Array(1,0,1,0,1)
		pattern[3] = new Array(0,1,1,1,0)
	}

	for(var i = 0; i < pattern.length; i++) {

		var patternArray = pattern[i];
		for (var x = 0; x < patternArray.length; x++) {

			if(patternArray[x] == 1) {
				var collectable = new CoinCollectable('coin_collectable.png',
														this.game,
														startX + (x * GetXPos(240, this.game.game)), 
														startY + (i * GetYPos(240, this.game.game)));

				this.collectableArray.push(collectable);
			}

			
		}
	}
	
};


CollectableManager.prototype.UpdateCollectableStatus = function()
{
	if(this.game.furthestDistanceTravelled + 6000 > this.collectableSpawnDistance)
	{
		var spawnXPosition = (this.collectableSpawnDistance + GetXPos(1500, this.game.game)) + (Math.random() * GetXPos(1000, this.game.game));

		var spawnOneYPosition =  (Math.random() * ((this.game.world.height / 2) - GetYPos(600, this.game.game)));
		var spawnTwoYPosition =  (Math.random() * (this.game.world.height / 2)) + (this.game.world.height / 2);

		this.GenerateCoinPattern(spawnXPosition, spawnOneYPosition);
		this.GenerateCoinPattern(spawnXPosition, spawnTwoYPosition);
		this.collectableSpawnDistance = spawnXPosition;
	}

	for(var i = 0; i < this.collectableArray.length; i++)
	{
		var maxDistance = 7000;
		if(!MissileMania.isHD) maxDistance *= 0.5;

		var collectable = this.collectableArray[i];
		var distanceFromPlayer = collectable.x - this.player.x;

		if(collectable.alive)
		{
			collectable.Update();

			if(distanceFromPlayer < -maxDistance)
			{
				collectable.RemoveCollectable();
			}
		}
	}

	for(var i = 0; i < this.collectableArray.length; i++)
	{
		if(this.collectableArray[i].collided) {

			this.soundEffectArray[this.currentCoinSFXIndex].play();
			this.currentCoinSFXIndex++;

			if(this.currentCoinSFXIndex >= this.soundEffectArray.length) {
				this.currentCoinSFXIndex = 0;
			}

			this.collectableArray[i].RemoveCollectable();
		}
	}

	for(var i = 0; i < this.collectableArray.length; i++)
	{
		if(!this.collectableArray[i].alive || this.collectableArray[i].collided) {
			this.collectableArray[i].destroy();
			this.collectableArray.splice(i, 1);
		}
	}
};

CollectableManager.prototype.destroy = function()
{
	while(this.collectableArray.length > 0)
	{
		var end = this.collectableArray.length - 1;
		this.collectableArray[end].destroy();
		this.collectableArray.pop();
	}

	for(var i = 0; i < this.soundEffectArray.length; i++)
	{
		this.soundEffectArray[i].stop();
		this.soundEffectArray[i] = null;
	}

	this.soundEffectArray = null;
	this.collectableArray = null;
};

CollectableManager.prototype.render = function()
{
	for(var i = 0; i < this.collectableArray.length; i++)
	{
		var collectable = this.collectableArray[i];

		collectable.render();

		//if(collectable.physicsShape != null)
		//{
			//this.game.DrawDebug(this.game.game.space.staticBody, collectable.physicsShape.verts, 'rgba(0, 0, 0, 0.7)');
		//}
	}
};


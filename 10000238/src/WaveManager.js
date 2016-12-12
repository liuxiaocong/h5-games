WaveManager = function(game)
{
	this.game = game;
	this.player = game.player;

	this.nextWaveTimer = 0.1;

	this.lastFurthestDistance = this.game.spawnX;

	this.currentDifficulty = 0;

	this.difficultWaveCount = [8,9,8,7,7,5,5];

	this.lastWaveVariation = -1;

	this.waveOrderArray = new Array(this.difficultWaveCount[0]);
	this.waveOrderArray = this.ShuffleArray(this.waveOrderArray);
	this.currentWave = 0;

};
WaveManager.prototype.constructor = WaveManager;

WaveManager.prototype.Update = function()
{
	if(this.game.player.x < GetXPos(300, this.game) + this.game.spawnX) { return; }

	if(this.game.furthestDistanceTravelled <= this.lastFurthestDistance) { return; }

	this.lastFurthestDistance = this.game.furthestDistanceTravelled

	var actualDistance = this.game.furthestDistanceTravelled / 10;

	if(actualDistance > 1500 && this.currentDifficulty == 0) {
		this.IncreaseDifficulty();
	}
	if(actualDistance > 4000 && this.currentDifficulty == 1) {
		this.IncreaseDifficulty();
	}
	if(actualDistance > 8000 && this.currentDifficulty == 2) {
		this.IncreaseDifficulty();
	}
	if(actualDistance > 16000 && this.currentDifficulty == 3) {
		this.IncreaseDifficulty();
	}
	if(actualDistance > 24000 && this.currentDifficulty == 4) {
		this.IncreaseDifficulty();
	}
	if(actualDistance > 37000 && this.currentDifficulty == 5) {
		this.IncreaseDifficulty();
	}

	if(this.nextWaveTimer > 0) {

		this.nextWaveTimer -= this.game.time.elapsed / 1000;

		if(this.nextWaveTimer <= 0) {
			this.SpawnNextWave();
		}
	}
}

WaveManager.prototype.ShuffleArray = function(array) {

	for(var i = 0; i < array.length; i++) {
		array[i] = i + 1;
	}

	for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

WaveManager.prototype.IncreaseDifficulty = function() {

	this.currentDifficulty += 1;

	this.lastWaveVariation = -1;

	this.waveOrderArray = new Array(this.difficultWaveCount[this.currentDifficulty]);
	this.waveOrderArray = this.ShuffleArray(this.waveOrderArray);

	this.currentWave = 0;
}

WaveManager.prototype.SpawnNextWave = function()
{
	var waveDifficulty = this.currentDifficulty;
	var waveDifficultyString = waveDifficulty.toString();

	if(waveDifficulty < 10) {
		waveDifficultyString = "0" + waveDifficultyString;
	}

	/*
	var waveVariation = Math.floor((Math.random() * this.difficultWaveCount[this.currentDifficulty])) + 1;
	
	var attemptCount = 0;
	if(this.difficultWaveCount[this.currentDifficulty] > 1) {
		while(waveVariation == this.lastWaveVariation && attemptCount < 5) {
			//console.log("Looking for new wave " + attemptCount);
			waveVariation = Math.floor((Math.random() * this.difficultWaveCount[this.currentDifficulty])) + 1;
			attemptCount+= 1;
		}
	}

	this.lastWaveVariation = waveVariation; */

	var waveVariation = this.waveOrderArray[this.currentWave];
	this.currentWave++;
	if(this.currentWave >= this.waveOrderArray.length) {
		this.currentWave = 0;
	}

	var waveVariationString = waveVariation.toString();

	if(waveVariation < 10) {
		waveVariationString = "0" + waveVariationString;
	}

	var waveString = "wave_" + waveDifficultyString +  "_" + waveVariationString;

	//var waveString = "wave_06_05";

	var textData = this.game.cache.getText(waveString);

	if(textData != null) {
		var jsonData = JSON.parse(textData);

		if(jsonData != null) {
			var missileCount = jsonData.missiles.length;

			for(var i = 0; i < missileCount; i++) {

				this.game.missileManager.AddDelayedMissile(jsonData.missiles[i].type, 
															jsonData.missiles[i].screenSide, 
															jsonData.missiles[i].position,
															jsonData.missiles[i].rotation,
															jsonData.missiles[i].speed,
															jsonData.missiles[i].delay
															);
			}

			this.nextWaveTimer += jsonData.timeLength;
		}
	}
}
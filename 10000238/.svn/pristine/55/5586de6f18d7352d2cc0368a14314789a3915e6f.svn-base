MissileManager = function(game)
{
	this.missileArray = new Array();
	this.delayedMissileArray = new Array();

	this.player = game.player;
	this.game = game;

	this.warningValue = 0;
	this.warningIncreasing = true;

	this.indicatorArray = new Array(6);

	//Top Left, Top Right, Bottom Right, Bottom Left
	this.warningCornerSections = new Array(4);
	//Top, Right, Bottom, Left
	this.warningEdgeSections = new Array(4);

	this.warningEdgeSectionDefaultWidths = new Array(4);

	this.displayWarning = false;

	this.SetupIndicators();

	this.explosionArray = new Array(6);
	this.SetupExplosions();

	this.soundEffectArray = new Array(6);
	for(var i = 0; i < this.soundEffectArray.length; i++) {
		this.soundEffectArray[i] = this.game.add.audio('SmallExplosion');
	}
	this.currentCoinSFXIndex = 0;

	//this.AddMissile(this.game, 1200, this.game.world.height - 300, "Dumb");
};

MissileManager.prototype.constructor = MissileManager;

MissileManager.prototype.SetupExplosions = function()
{
	for(var i = 0; i < this.explosionArray.length; i++) {
		
		var circleExplosionSprite = this.game.add.image(0, 0, "explosion_circle");
		circleExplosionSprite.autoCull = true;
		circleExplosionSprite.body = null;
		circleExplosionSprite.visible = false;
		circleExplosionSprite.exists = false;
		circleExplosionSprite.anchor.x = 0.5;
		circleExplosionSprite.anchor.y = 0.5;
		this.game.layerFourGroup.add(circleExplosionSprite);

		this.explosionArray[i] = circleExplosionSprite;
	}
},

MissileManager.prototype.SetupIndicators = function()
{
	for(var i = 0; i < this.indicatorArray.length; i++) {

		var arrowSprite = this.game.add.image(this.x, this.y, 'gameAtlas', "sam_indicator.png");
		arrowSprite.autoCull = true;
		arrowSprite.angle = 0;
		arrowSprite.anchor = new Phaser.Point(0.5, 0)
		arrowSprite.visible = false;
		this.game.hudGroup.add(arrowSprite);
		this.game.hudGroup.bringToTop(arrowSprite);
		this.indicatorArray[i] = arrowSprite;
	}

	for(var i = 0; i < this.warningCornerSections.length; i++) {

		var posX = 0;
		var posY = 0;
		var angle = 0;
		var anchor = new Phaser.Point(0,0);

		if(i == 1) {
			posX = this.game.camera.width;
			angle = 90;
		}
		else if (i == 2) {
			angle = 180;
			posX = this.game.camera.width;
			posY = this.game.camera.height;
		}
		else if (i == 3) {
			angle = 270;
			posY = this.game.camera.height;
		}

		var cornerSprite = this.game.add.image(posX, posY, "warning_edge");
		cornerSprite.autoCull = true;
		cornerSprite.angle = angle;
		cornerSprite.anchor = new Phaser.Point(anchor.x, anchor.y)
		cornerSprite.visible = false;
		this.game.hudGroup.add(cornerSprite);
		this.game.hudGroup.bringToTop(cornerSprite);
		this.warningCornerSections[i] = cornerSprite;
	}

	for(var i = 0; i < this.warningEdgeSections.length; i++) {

		var posX = 0;
		var posY = 0;
		var angle = 0;
		var anchor = new Phaser.Point(0.5,0);

		var width = 0;

		if(i == 0) {
			posX = this.game.camera.width * 0.5;
			width = this.game.camera.width - 400;
		}
		else if(i == 1) {
			posX = this.game.camera.width;
			posY = this.game.camera.height * 0.5;
			angle = 90;
			width = this.game.camera.height - 400;
		}
		else if (i == 2) {
			angle = 180;
			posX = this.game.camera.width * 0.5;
			posY = this.game.camera.height;
			width = this.game.camera.width - 400;
		}
		else if (i == 3) {
			angle = 270;
			posY = this.game.camera.height * 0.5;
			width = this.game.camera.height - 400;
		}

		var edgeSprite = this.game.add.image(posX, posY, "warning_straight");
		edgeSprite.autoCull = true;
		edgeSprite.angle = angle;
		edgeSprite.anchor = new Phaser.Point(anchor.x, anchor.y)
		edgeSprite.width = width;
		edgeSprite.visible = false;
		this.game.hudGroup.add(edgeSprite);
		this.game.hudGroup.bringToTop(edgeSprite);
		this.warningEdgeSections[i] = edgeSprite;

		this.warningEdgeSectionDefaultWidths[i] = width;
	}
}

MissileManager.prototype.AddMissile = function(posX, posY, angle, speed, type)
{
	var newMissile = null;

	if(type == "dumb") {
		newMissile = new DumbMissile(this.game, posX, posY, angle, speed, type);
	}
	else if(type == "adjusting") {
		newMissile = new AdjustingMissile(this.game, posX, posY, angle, speed, type);
	}
	else if(type == "guided") {
		newMissile = new GuidedMissile(this.game, posX, posY, angle, speed, type);
	}
	else if(type == "bomb") {
		newMissile = new BombMissile(this.game, posX, posY, angle, speed, type);
	}
	else if(type == "mine") {
		newMissile = new StaticMissile(this.game, posX, posY, angle, speed, type);
	}
	else if(type == "wave") {
		newMissile = new WaveMissile(this.game, posX, posY, angle, speed, type);
	}

	this.missileArray.push(newMissile);
}

MissileManager.prototype.AddDelayedMissile = function(missileType, screenSide, position, angle, speed, delay)
{
	var delayedMissile = { };
	delayedMissile.screenSide = screenSide;
	delayedMissile.position= position;
	delayedMissile.angle = angle;
	delayedMissile.missileType = missileType;
	delayedMissile.delay = delay
	delayedMissile.speed = speed;

	this.delayedMissileArray.push(delayedMissile);
}

MissileManager.prototype.ShowExplosion = function(posX, posY)
{
	this.soundEffectArray[this.currentCoinSFXIndex].play();
	this.currentCoinSFXIndex++;

	if(this.currentCoinSFXIndex >= this.soundEffectArray.length) {
		this.currentCoinSFXIndex = 0;
	}

	var explosionCircle = null;

	for(var i = 0; i < this.explosionArray.length; i++) {
		if(!this.explosionArray[i].exists) {
			explosionCircle = this.explosionArray[i];
			break;
		}
	}

	if(explosionCircle == null) { return; }

	//console.log("Showing Explosion");

	explosionCircle.exists = true;
	explosionCircle.visible = true;
	explosionCircle.x = posX;
	explosionCircle.y = this.game.world.height - posY;
	explosionCircle.scale.setTo(1);
}

MissileManager.prototype.Update = function()
{
	//Update delayed missiles
	for(var i = 0; i < this.delayedMissileArray.length; i++) {
		if(this.delayedMissileArray[i].delay >= 0) {

			this.delayedMissileArray[i].delay -= this.game.time.elapsed / 1000;

			if(this.delayedMissileArray[i].delay < 0) {

				var delayedMissile = this.delayedMissileArray[i];

				//Spawn missile
				var posX = this.game.player.x;
				var posY = this.game.world.height - this.game.player.y;

				if(delayedMissile.screenSide == "right") {
					posX += 5000;
					posY += delayedMissile.position;
				}
				else if(delayedMissile.screenSide == "left") {
					posX -= 5000;
					posY += delayedMissile.position;
				}
				else if(delayedMissile.screenSide == "top") {
					posX += delayedMissile.position;
					posY -= 3000;
				}
				else if(delayedMissile.screenSide == "bottom") {
					posX += delayedMissile.position;
					posY += 3000;
				}

				var angle = delayedMissile.angle;
				var type = delayedMissile.missileType;
				var speed = delayedMissile.speed;

				this.AddMissile(posX, posY, angle + 90, speed, type);
			}
		}
	}

	for(var i = this.delayedMissileArray.length - 1; i >= 0; i--) {
		if(this.delayedMissileArray[i].delay < 0) {
			this.delayedMissileArray[i] = null;
			this.delayedMissileArray.splice(i, 1);
		}
	}

	for(var i = 0; i < this.missileArray.length; i++)
	{
		var missile = this.missileArray[i];
		missile.Update();
	}

	for(var i = 0; i < this.missileArray.length; i++)
	{
		if(!this.missileArray[i].alive) {
			this.missileArray[i].destroy();
			this.missileArray.splice(i, 1);
		}
	}

	this.UpdateIndicators();
	this.UpdateExplosions();
};

MissileManager.prototype.UpdateIndicators = function()
{
	var indicatorIndex = 0;
	var displayWarning = false;
	for(var i = 0; i < this.missileArray.length; i++)
	{
		var missile = this.missileArray[i];
		
		//Update indicator positions
		if(!missile.alive) { continue; }

		if(missile.aliveTimer > 1.0) { continue; }

		if(indicatorIndex >= this.indicatorArray.length) { continue; }

		var xPos = (missile.x * this.game.scale) - this.game.camera.x;
		var yPos = ((this.game.world.height - missile.y) * this.game.scale) - this.game.camera.y;

		var clampedXPos = Phaser.Math.clamp(xPos, 5, this.game.camera.width - 5);
		var clampedYPos = Phaser.Math.clamp(yPos, 5, this.game.camera.height - 5);

		displayWarning = true;

		if(clampedXPos > 5 && clampedXPos < this.game.camera.width - 5 && clampedYPos > 5 && clampedYPos < (this.game.camera.height) - 5) {
			continue;
		}

		var angle = Phaser.Math.angleBetween(xPos, yPos, clampedXPos, clampedYPos);

		var missilePosition = new Phaser.Point(clampedXPos, clampedYPos);

		this.indicatorArray[indicatorIndex].visible = true;
		this.indicatorArray[indicatorIndex].x = missilePosition.x;
		this.indicatorArray[indicatorIndex].y = missilePosition.y;
		this.indicatorArray[indicatorIndex].rotation = -angle;

		indicatorIndex++;
	}	

	for(var i = indicatorIndex; i < this.indicatorArray.length; i++) {
		this.indicatorArray[i].visible = false;
	}

	if(this.game.player.health < 0) {
		displayWarning = false;
	}

	var fadeTime = 0.5;

	if(displayWarning) {
		if(this.warningIncreasing) {
			this.warningValue += (this.game.time.elapsed / 1000) / fadeTime;
			if(this.warningValue >= 1.0) { this.warningIncreasing = false; }
		}
		else {
			this.warningValue -= (this.game.time.elapsed / 1000) / fadeTime;
			if(this.warningValue <= 0.0) { this.warningIncreasing = true; }
		}
	}
	else {
		if(this.warningValue > 0.0) {
			this.warningValue -= (this.game.time.elapsed / 1000) / fadeTime;
			this.warningIncreasing = false;
		}
	}

	this.warningValue = Phaser.Math.clamp(this.warningValue, 0.0, 1.0);

	var easedWarningValue =  Phaser.Easing.Sinusoidal.InOut(this.warningValue);

	for(var i = 0; i < this.warningCornerSections.length; i++) {
		var cornerSection = this.warningCornerSections[i];

		if(this.warningValue > 0) {
			cornerSection.visible = true;
		}

		cornerSection.alpha = easedWarningValue;
		cornerSection.scale.setTo(easedWarningValue);
	}

	for(var i = 0; i < this.warningEdgeSections.length; i++) {
		var edgeSection = this.warningEdgeSections[i];

		if(this.warningValue > 0) {
			edgeSection.visible = true;
		}

		edgeSection.alpha = easedWarningValue;
		edgeSection.scale.y = easedWarningValue;
		edgeSection.width = this.warningEdgeSectionDefaultWidths[i] + (400 - (400 * easedWarningValue));
	}
}

MissileManager.prototype.UpdateExplosions = function()
{
	for(var i = 0; i < this.explosionArray.length; i++) {
		var explosion = this.explosionArray[i];

		if(!explosion.exists) { continue; }

		var scaleTime = 0.2;
		var maxScale = 15;
		var currentScale = explosion.scale.x;

		currentScale += (maxScale / scaleTime) * (this.game.time.elapsed / 1000);

		explosion.scale.setTo(currentScale);

		if(currentScale >= maxScale) {
			explosion.exists = false;
			explosion.visible = false;
		}
	}
}

MissileManager.prototype.destroy = function()
{
	while(this.missileArray.length > 0)
	{
		var end = this.missileArray.length - 1;
		this.missileArray[end].destroy();
		this.missileArray.pop();
	}

	this.missileArray = null;
};

MissileManager.prototype.render = function()
{
	if(this.missileArray != null) {

		for(var i = 0; i < this.missileArray.length; i++)
		{
			var Missile = this.missileArray[i];
			Missile.render();
		}
	}
};
AchievementManager = function(game)
{
	this.game = game;
	var jsonData = JSON.parse(this.game.cache.getText('achievements'));
	this.popupText = new Array();

	this.popupBackground = this.game.add.image(this.game.camera.width / 2, -65, 'gameAtlas', 'UI_Challenge_Background.png');
	this.popupBackground.y = -this.popupBackground.height;
	this.popupBackground.anchor.setTo(0.5, 0.5);
	this.popupBackground.scale.setTo(1, 1);
	this.game.hudGroup.add(this.popupBackground);

	this.achievementList = jsonData.achievements;

	for(var i = 0; i < MissileMania.playerData.achievementsUnlocked.length; i++)
	{
		for(var j = 0; j < this.achievementList.length; j++)
		{
			if(MissileMania.playerData.achievementsUnlocked[i] === this.achievementList[j].name)
			{
				this.achievementList[j].isUnlocked = true;
			}
		}
	}
};
AchievementManager.prototype.constructor = AchievementManager;

AchievementManager.prototype.UnlockAchievement = function(achievementName)
{
	for(var i = 0; i < this.achievementList.length; i++)
	{
		if(this.achievementList[i].name === achievementName)
		{
			if(this.achievementList[i].isUnlocked == false)
			{
				this.achievementList[i].isUnlocked = true;
				if(this.achievementList[i].persistantLock === true)
				{
					MissileMania.playerData.achievementsUnlocked.push(this.achievementList[i].name);	
				} 
				this.ShowAchievementPopup(this.achievementList[i].text);
			}
		}
	}
};

AchievementManager.prototype.ShowAchievementPopup = function(text)
{
	var textSize = 22;

	if(!MissileMania.isHD) textSize *= 0.5;

	this.popupText.push(this.game.add.bitmapText((this.game.camera.width / 2) - (this.popupBackground.width * 0.43), -this.popupBackground.height - GetYPos(15, this.game.game), 'GreenFont', text, textSize));
	this.game.hudGroup.add(this.popupText[this.popupText.length - 1]);

	this.game.add.tween(this.popupText[this.popupText.length - 1])
	.to({"y": this.popupBackground.height / 2 - GetYPos(15, this.game.game)}, 500, Phaser.Easing.Quadratic.Out, true, (this.popupText.length - 1) * 3000, false, false)
	.onComplete.add(CreateSecondTween, this);

	this.game.add.tween(this.popupBackground)
	.to({"y": this.popupBackground.height / 2}, 500, Phaser.Easing.Quadratic.Out, true, (this.popupText.length - 1) * 3000, false, false);


	function CreateSecondTween()
	{
		this.game.add.tween(this.popupText[0])
		.to({"y": -this.popupBackground.height - GetYPos(15, this.game.game)}, 500, Phaser.Easing.Quadratic.Out, true, 2000, false, false)
		.onComplete.add(RemoveImage, this);

		this.game.add.tween(this.popupBackground)
		.to({"y": -this.popupBackground.height}, 500, Phaser.Easing.Quadratic.Out, true, 2000, false, false);
	};

	function RemoveImage()
	{
		this.popupText[0].destroy();
		this.popupText.shift();
	};
};

AchievementManager.prototype.Destroy = function()
{
	while(this.achievementList.length > 0)
	{
		this.achievementList.pop();
	}

	this.achievementList = null;
};

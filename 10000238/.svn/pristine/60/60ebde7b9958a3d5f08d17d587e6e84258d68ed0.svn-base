TickerDigit = function(spritesheetRef, posX, posY, scale, game, group)
{
	this.spritesheetRef = game.add.sprite(posX, posY, spritesheetRef);
	if(!MissileMania.isHD) scale -= 0.5;
	this.spritesheetRef.scale.setTo(scale, scale);
	this.spritesheetRef.body = null;
	this.game = game;
	this.currentFrame = this.spritesheetRef.animations.frame;
	this.currentAnimation = 0;
	this.currentNumber = 0;
	group.add(this.spritesheetRef);
};
TickerDigit.prototype.constructor = TickerDigit;

TickerDigit.prototype.SetNumber = function(number)
{
	this.currentNumber = number;
	number *= 4; //4 frames between stopping frames
	this.CreateAnimation(this.currentFrame, number);
	this.spritesheetRef.animations.play('move', null, false, false);
	this.currentAnimation = this.spritesheetRef.animations.getAnimation('move');
};

TickerDigit.prototype.GetNumberShowing = function()
{
	return this.currentNumber;
};

TickerDigit.prototype.CreateAnimation = function(startFrame, endFrame)
{
	var frames = new Array();

	if(startFrame < endFrame)
	{
		for(var i = startFrame; i <= endFrame; i++)
		{
			frames[i] = i;
		};
	}else
	{
		for(var i = startFrame; i <= 10; i++)
		{
			frames[i] = i;
		};

		for(var i = 0; i <= endFrame; i++)
		{
			frames[frames.length - 1 + i] = i;
		}
	}

	this.spritesheetRef.animations.add("move", frames, null, false);
};

TickerDigit.prototype.destroy = function()
{
	if(this.spritesheetRef != null) this.spritesheetRef.destroy();
	this.spritesheetRef = null;
};
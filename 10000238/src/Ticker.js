Ticker = function(spriteSheetRef, game, posX, posY, scale, numberOfDigits, group, dollar)
{
	this.tickerReel = new Array();
	this.game = game;

	if(dollar)
	{
		this.currencyImage = game.add.image(posX, posY + GetYPos(6, this.game), 'dollar');
		this.currencyImage.scale.setTo(scale, scale);
		group.add(this.currencyImage);
	}

	this.currencyImage = null;

	var offsetX = GetXPos(38, this.game) * (scale);
	posX += offsetX;

	for(var i = 0; i < numberOfDigits; i++)
	{
		this.tickerReel.push(new TickerDigit(spriteSheetRef, posX + (i * offsetX), posY, scale, game, group));
	};
};
Ticker.prototype.constructor = Ticker;

Ticker.prototype.DisplayNumber = function(number)
{
	this.ResetTicker();

	var digitArray = new Array();
	var sNumber = number.toString();

	if(sNumber.length > this.tickerReel.length)
	{
		console.error("Number too large for Ticker Reel");
		return;
	}

	for(var i = 0; i < sNumber.length; i++)
	{
		digitArray.push(parseInt(sNumber.charAt(i)));
	}

	for(var i = digitArray.length -1; i >= 0; i--)
	{
		var index = ((this.tickerReel.length - 1) - ((digitArray.length - 1) - i));
		this.tickerReel[index].SetNumber(digitArray[i]);
	}
};

Ticker.prototype.ResetTicker = function()
{
	for(var i = 0; i < this.tickerReel.length - 1; i++)
	{
		if(this.tickerReel[i].GetNumberShowing() !== 0)	this.tickerReel[i].SetNumber(0);
	}
};

Ticker.prototype.destroy = function()
{
	if(this.currencyImage != null) this.currencyImage.destroy();

	while(this.tickerReel.length > 0)
	{
		var end = this.tickerReel.length -1;
		this.tickerReel[end].destroy();
		this.tickerReel.pop();
	}

	this.tickerReel = null;
	this.currencyImage = null;
};
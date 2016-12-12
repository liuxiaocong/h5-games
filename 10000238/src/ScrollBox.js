ScrollBox = function(game, posX, posY, textArray, scrollBarEvent, group)
{
	this.game = game;
	this.textArray = textArray;
	this.lastPercentageHeight = 0;
	this.topIndex = 0;
	this.posX = posX;

	this.bitmapTextArray = new Array();
	this.statusBitmapText = new Array();
	this.numberOfTextItems = 9;

	var fontSize = 25;
	if(!MissileMania.isHD) fontSize *= 0.5;

	//setup bitmapFonts
	var offsetY = GetYPos(41, this.game);
	for(var i = 0; i < this.numberOfTextItems; i++) //12
	{
		this.bitmapTextArray.push(this.game.add.bitmapText(posX, posY + ((offsetY + GetYPos(10, this.game)) * i), 'GreenFont', '', fontSize));
		this.statusBitmapText.push(this.game.add.bitmapText(posX + GetXPos(700, this.game), posY + ((offsetY + GetYPos(10, this.game)) * i), 'GreenFont', '', fontSize))
		group.add(this.bitmapTextArray[i]);
		group.add(this.statusBitmapText[i]);
	};

	//Set the text
	for(var i = 0; i < this.numberOfTextItems; i++)
	{
		if(this.textArray[i].persistantLock)
		{
			this.bitmapTextArray[i].alpha = 0.5;
			this.statusBitmapText[i].alpha = 0.5;

			this.bitmapTextArray[i].text = this.textArray[i].text;

			var playerValueString = "";
			if(this.textArray[i].name === "TenCollected" || this.textArray[i].name === "FiftyCollected" || this.textArray[i].name === "HundredCollected")
			{
				if(MissileMania.playerData.maxCoinsCollected > this.textArray[i].maxValue)
				{
					playerValueString = this.textArray[i].maxValue.toString();
				}else
				{
					playerValueString = MissileMania.playerData.maxCoinsCollected.toString();
				}
			}else if(this.textArray[i].name === "DumbSurvive" || this.textArray[i].name === "MineSurvive" || this.textArray[i].name === "HomingSurvive" || this.textArray[i].name === "GuidedSurvive" || this.textArray[i].name === "TargetDestroyed")
			{
				if(MissileMania.playerData.achievementsUnlocked.length === 0) playerValueString = "0";
				for(var j = 0; j < MissileMania.playerData.achievementsUnlocked.length; j++)
				{
					if(MissileMania.playerData.achievementsUnlocked[j] === this.textArray[i].name)
					{
						playerValueString = "1";
						break;				
					}else
					{
						playerValueString = "0";
					}
				}
			}else if(this.textArray[i].name === "FiveThousandTravelled" || this.textArray[i].name === "TenThousandTravelled" || this.textArray[i].name === "TwentyThousandTravelled" || this.textArray[i].name === "FortyThousandTravelled")
			{
				if(MissileMania.playerData.furthestDistanceTravelled > this.textArray[i].maxValue)
				{
					playerValueString = this.textArray[i].maxValue.toString();
				}else
				{
					playerValueString = MissileMania.playerData.furthestDistanceTravelled.toString();
				}
			}

			this.statusBitmapText[i].text = playerValueString + "/" + this.textArray[i].maxValue.toString();
			this.statusBitmapText[i].updateText();		
			this.statusBitmapText[i].x -= this.statusBitmapText[i].textWidth;

			for(var j = 0; j < MissileMania.playerData.achievementsUnlocked.length; j++)
			{
				if(MissileMania.playerData.achievementsUnlocked[j] === this.textArray[i].name)
				{
					this.bitmapTextArray[i].alpha = 1;
					this.statusBitmapText[i].alpha = 1;			
				}
			}

			this.bitmapTextArray[i].updateText();
		}
	};

	scrollBarEvent.add(this.UpdateTextPositions, this);
};
ScrollBox.prototype.constructor = ScrollBox;

ScrollBox.prototype.UpdateTextPositions = function(percentageHeight)
{
	var textChangeLimit = 0.2;

	if((percentageHeight - this.lastPercentageHeight) > textChangeLimit)
	{
		this.topIndex++;
		this.lastPercentageHeight = percentageHeight;
	}

	if((percentageHeight - this.lastPercentageHeight) < -textChangeLimit)
	{
		this.topIndex--;
		this.lastPercentageHeight = percentageHeight;
	}

	if(percentageHeight === 0) this.topIndex = 0;	

	this.PositionText();
};

ScrollBox.prototype.PositionText = function()
{
	for(var i = 0; i < this.bitmapTextArray.length; i++)
	{
		var index = i + this.topIndex;

		if(index < this.textArray.length && index > 0) 
		{
			if(this.textArray[index].persistantLock)
			{
				this.bitmapTextArray[i].alpha = 0.5;
				this.statusBitmapText[i].alpha = 0.5;
				this.bitmapTextArray[i].text = this.textArray[index].text;


				var playerValueString = "";
				if(this.textArray[index].name === "TenCollected" || this.textArray[index].name === "FiftyCollected" || this.textArray[index].name === "HundredCollected")
				{
					if(MissileMania.playerData.maxCoinsCollected > this.textArray[index].maxValue)
					{
						playerValueString = this.textArray[index].maxValue.toString();
					}else
					{
						playerValueString = MissileMania.playerData.maxCoinsCollected.toString();
					}
				}else if(this.textArray[index].name === "DumbSurvive" || this.textArray[index].name === "MineSurvive" || this.textArray[index].name === "HomingSurvive" || this.textArray[index].name === "GuidedSurvive" || this.textArray[index].name === "TargetDestroyed")
				{
					for(var j = 0; j < MissileMania.playerData.achievementsUnlocked.length; j++)
					{
						if(MissileMania.playerData.achievementsUnlocked[j] === this.textArray[index].name)
						{
							playerValueString = "1";
							break;				
						}else
						{
							playerValueString = "0";
						}
					}
				}else if(this.textArray[index].name === "FiveThousandTravelled" || this.textArray[index].name === "TenThousandTravelled" || this.textArray[index].name === "TwentyThousandTravelled" || this.textArray[index].name === "FortyThousandTravelled")
				{
					if(MissileMania.playerData.furthestDistanceTravelled > this.textArray[index].maxValue)
					{
						playerValueString = this.textArray[index].maxValue.toString();
					}else
					{
						playerValueString = MissileMania.playerData.furthestDistanceTravelled.toString();
					}
				}

				this.statusBitmapText[i].text = playerValueString + "/" + this.textArray[index].maxValue.toString();

				for(var j = 0; j < MissileMania.playerData.achievementsUnlocked.length; j++)
				{
					if(MissileMania.playerData.achievementsUnlocked[j] === this.textArray[index].name)
					{
						this.bitmapTextArray[i].alpha = 1;
						this.statusBitmapText[i].alpha = 1;			
					}
				}

				this.bitmapTextArray[i].updateText();
				this.statusBitmapText[i].updateText();	
				this.statusBitmapText[i].x = (this.posX + GetXPos(700, this.game)) - this.statusBitmapText[i].textWidth;
			}else
			{
				this.bitmapTextArray[i].text = "";
				this.statusBitmapText[i].text = "";
			}
		}
		else 
		{
			this.bitmapTextArray[i].text = "";
			this.statusBitmapText[i].text = "";
		}
		
	}
	
};

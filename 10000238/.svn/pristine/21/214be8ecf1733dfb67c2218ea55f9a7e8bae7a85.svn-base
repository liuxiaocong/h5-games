MissileMania.Upgrade = function(game)
{

}; 

var warheadCarouselIndex = 0;
var fuselageCarouselIndex = 0;
var engineCarouselIndex = 0;

MissileMania.Upgrade.prototype =
{
	create: function()
	{
		if(MissileMania.mainMusic === null)
		{
			MissileMania.mainMusic = this.game.add.audio("MenuMusic");
			MissileMania.mainMusic.play('', 0, 0, true, true);
		}else
		{
			MissileMania.mainMusic.resume();
			MissileMania.mainMusic.volume = 0;
		}

		this.game.add.tween(MissileMania.mainMusic).to({volume: 0.25}, 2500, Phaser.Easing.Quadratic.Out, true, 0, false, false);
		
		MissileMania.playerData = GetObject('playerData');
		MissileMania.levelData = GetObject('levelData');
		this.lock = true;
		this.buttonClickSound = this.game.add.audio('ButtonClick');

		this.lastCoin = -1;
		this.partToEquip = null;
		this.objectScale = 1; //0.72;
		this.upgradeGroup = this.game.add.group('', 'upgradeGroup', true);
		this.upgradeGroup.z = 0;
		this.moneyPanelGroup = this.game.add.group('', 'moneyPanelGroup', true);
		this.game.world.scale.setTo(1, 1);
		this.SetupBackgroundImage();

		this.purchaseSound = this.game.add.audio('CoinCollect');
		this.equipSound = this.game.add.audio('Wrench');

		this.SetupStartButton();
		this.SetupPartData();

		this.achievementButton = this.game.add.button(this.game.camera.width / 2 + GetXPos(357, this.game),
													  this.game.camera.height / 2 - GetYPos(300, this.game),
													  'transparent',
													  OpenAchievementPopup, this,
													  'transparent',
													  'transparent',
													  'transparent');
		this.achievementButton.anchor.setTo(0.5, 0.5);
		this.achievementButton.scale.setTo(27, 22);
		
		this.SetupPopup();
		this.SetupAchievementPopup();

		this.SetupUpgradeParts();

		this.SetupPopupButtons();

		if(MissileMania.brandingSplash.image)
		{
			var moreGamesButton = this.game.add.button(GetXPos(10, this.game), GetYPos(50, this.game), 'a10_splash', MissileMania.brandingSplash.action, this, 'a10_splash', 'a10_splash', 'a10_splash');
			this.upgradeGroup.add(moreGamesButton);
		}

		this.ChangeWarheadStatText(GetPart(MissileMania.playerData.currentParts['Warhead'], "Warhead"));
		this.ChangeFuselageStatText(GetPart(MissileMania.playerData.currentParts['Fuselage'], "Fuselage"));
		this.ChangeEngineStatText(GetPart(MissileMania.playerData.currentParts["Engine"], "Engine"));

		this.SetupTicker();
		this.CreateMutePanel();

		function OpenAchievementPopup()
		{
			this.achievementButton.visible = false;
			this.upgradeStartButton.visible = false;
			this.popupButtonGroup.visible = false;

			this.buttonClickSound.play();
			this.achievementPopupGroup.visible = true;
		}
	},

	CreateMutePanel: function()
	{
		this.mutePanelGroup = this.game.add.group('', 'mutePanelGroup', true);

		var mutePanel = this.game.add.image(/*this.centerX, this.centerY*/0, 0, 'upgradeAtlas', 'UI_Home_Background.png');
		this.mutePanelGroup.add(mutePanel);

		if(this.game.sound.mute)
		{
			this.muteButton = this.game.add.button(GetXPos(50, this.game)/*this.centerX + 50*/, /*this.centerY + 30*/GetYPos(35, this.game), 'menuAtlas', Mute, this, 'button_mute_up.png', 'button_mute_up.png', 'button_mute_down.png');
		}else
		{
			this.muteButton = this.game.add.button(GetXPos(50, this.game)/*this.centerX + 50*/, /*this.centerY + 30*/GetYPos(35, this.game), 'menuAtlas', Mute, this, 'button_audio_up.png', 'button_audio_up.png', 'button_audio_down.png');
		}

		
		this.mutePanelGroup.add(this.muteButton);

		var homeButton = this.game.add.button(GetXPos(50, this.game), GetYPos(160, this.game), 'upgradeAtlas', function(){this.game.state.start("MainMenu", true, true); this.buttonClickSound.play();}, this, 'UI_Button_Home.png', 'UI_Button_Home.png', 'UI_Button_Home_Down.png');
		//homeButton.x -= homeButton.width + 50;
		this.mutePanelGroup.add(homeButton);

		this.mutePanelGroup.x = this.game.camera.width + mutePanel.width;
		this.mutePanelGroup.y = 0;

		this.game.add.tween(this.mutePanelGroup).to({x: this.game.camera.width - mutePanel.width}, 500, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

		function Mute()
		{
			this.game.sound.mute = !this.game.sound.mute;
			MissileMania.settingsData.mute = this.game.sound.mute;

			if(this.game.sound.mute)
			{
				this.muteButton.setFrames('button_mute_up.png', 'button_mute_up.png', 'button_mute_down.png');
			}
			else
			{
				this.muteButton.setFrames('button_audio_up.png', 'button_audio_up.png', 'button_audio_down.png');
			}
		}
	},	

	SetupPopupButtons: function()
	{
		var scaleOffset = 0.15;

		this.popupButtonGroup = this.game.add.group('', 'popupButtonGroup', true);
		this.upgradeGroup.add(this.popupButtonGroup);

		if(this.warheadPopupButton != null) this.warheadPopupButton.destroy();

		this.warheadPopupButton = this.game.add.button(this.game.camera.width / 2 + GetXPos(110, this.game),
													   this.game.camera.height / 2 - GetYPos(215, this.game), 
													   'upgradeAtlas',
													   warheadPopup, this,
													   GetPart(MissileMania.playerData.currentParts['Warhead'], "Warhead").smallIconRef,
													   GetPart(MissileMania.playerData.currentParts['Warhead'], "Warhead").smallIconRef,
													   GetPart(MissileMania.playerData.currentParts['Warhead'], "Warhead").smallIconRef);
		this.warheadPopupButton.anchor.setTo(0.5, 0.5);
		this.warheadPopupButton.scale.setTo(this.objectScale - scaleOffset, this.objectScale - scaleOffset);

		
		if(this.fuselagePopupButton != null) this.fuselagePopupButton.destroy();

		this.fuselagePopupButton = this.game.add.button(this.game.camera.width / 2 + GetXPos(360, this.game),
													   this.game.camera.height / 2 - GetYPos(15, this.game), 
													   'upgradeAtlas',
													   fuselagePopup, this,
													   GetPart(MissileMania.playerData.currentParts['Fuselage'], "Fuselage").smallIconRef,
													   GetPart(MissileMania.playerData.currentParts['Fuselage'], "Fuselage").smallIconRef,
													   GetPart(MissileMania.playerData.currentParts['Fuselage'], "Fuselage").smallIconRef);
		this.fuselagePopupButton.anchor.setTo(0.5, 0.5);
		this.fuselagePopupButton.scale.setTo(this.objectScale - scaleOffset, this.objectScale - scaleOffset);


		if(this.enginePopupButton != null) this.enginePopupButton.destroy();

		this.enginePopupButton = this.game.add.button(this.game.camera.width / 2 + GetXPos(105, this.game),
													   this.game.camera.height / 2 + GetYPos(180, this.game),
													   'upgradeAtlas',
													   enginePopup, this,
													   GetPart(MissileMania.playerData.currentParts['Engine'], "Engine").smallIconRef,
													   GetPart(MissileMania.playerData.currentParts['Engine'], "Engine").smallIconRef,
													   GetPart(MissileMania.playerData.currentParts['Engine'], "Engine").smallIconRef);
		this.enginePopupButton.anchor.setTo(0.5, 0.5);
		this.enginePopupButton.scale.setTo(this.objectScale - scaleOffset, this.objectScale - scaleOffset);

		this.popupButtonGroup.add(this.warheadPopupButton);
		this.popupButtonGroup.add(this.fuselagePopupButton);
		this.popupButtonGroup.add(this.enginePopupButton);

		//(imageRef, smallIconRef, largeIconRef, acceleration, turnRate, mass, damage, explosionRadius, fuel, aerodynamicValue, isUnlocked, price)

		function warheadPopup()
		{
			this.upgradeStartButton.visible = false;
			this.popupGroup.visible = true;
			this.warheadButtonGroup.visible = true;
			this.popupButtonGroup.visible = false;
			this.achievementButton.deactivate();

			this.buttonClickSound.play();
			
			this.partToEquip = GetPart(MissileMania.playerData.currentParts["Warhead"], "Warhead");

			this.CreateLargeIcon('Warhead');
			this.ChangeWarheadStatText(this.partToEquip);

			MissileMania.playerData.warheadCarouselIndex = this.upgradeWarheadCarousel.GetIndex(this.partToEquip);
		};

		function fuselagePopup()
		{
			this.upgradeStartButton.visible = false;
			this.popupGroup.visible = true;
			this.fuselageButtonGroup.visible = true;
			this.popupButtonGroup.visible = false;
			this.achievementButton.deactivate();

			this.buttonClickSound.play();
			
			this.partToEquip = GetPart(MissileMania.playerData.currentParts['Fuselage'], "Fuselage");

			this.CreateLargeIcon('Fuselage');
			this.ChangeFuselageStatText(this.partToEquip);

			MissileMania.playerData.fuselageCarouselIndex = this.upgradeFuselageCarousel.GetIndex(this.partToEquip);
		};

		function enginePopup()
		{
			this.upgradeStartButton.visible = false;
			this.popupGroup.visible = true;
			this.engineButtonGroup.visible = true;
			this.popupButtonGroup.visible = false;
			this.achievementButton.deactivate();

			this.buttonClickSound.play();

			this.partToEquip = GetPart(MissileMania.playerData.currentParts['Engine'], "Engine");

			this.CreateLargeIcon('Engine');
			this.ChangeEngineStatText(this.partToEquip);

			MissileMania.playerData.engineCarouselIndex = this.upgradeEngineCarousel.GetIndex(this.partToEquip);
		};
	},

	SetupAchievementPopup: function()
	{
		var titleFontSize = 38
		var fontSize = 32;

		if(!MissileMania.isHD) 
		{
			titleFontSize *= 0.5;
			fontSize *= 0.5;
		}
			

		this.achievementPopupGroup = this.game.add.group('', 'achievementgroup', true);
		this.achievementPopupGroup.visible = false;

		var popupBackground = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'upgradeAtlas', 'Bunker_Popup.png');
		popupBackground.anchor.setTo(0.5, 0.5);
		popupBackground.scale.setTo(this.objectScale, this.objectScale);
		this.achievementPopupGroup.add(popupBackground);

		var mitOSText = this.game.add.bitmapText(this.game.camera.x + this.game.camera.width / 2 - GetXPos(387, this.game), this.game.camera.y + this.game.camera.height / 2 - GetYPos(279, this.game), 'GreenFont', 'MIT OS 1.5', fontSize);//'MIT OS 1.5', { font: '25px CMSansSerif-Medium', align: 'center'});
		this.achievementPopupGroup.add(mitOSText);

		var exitButton = this.game.add.button(this.game.camera.x + this.game.camera.width / 2 + GetXPos(394, this.game), this.game.camera.y + this.game.camera.height / 2 - GetYPos(285, this.game), 'upgradeAtlas', exitButton, this, 'UI_Button_Exit_Up.png', 'UI_Button_Exit_Up.png', 'UI_Button_Exit_Down.png');
		exitButton.anchor.setTo(0.5, 0.5);
		this.achievementPopupGroup.add(exitButton);

		var title = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2 - GetYPos(285, this.game), 'GreenFont', 'Achievements', titleFontSize);
		title.x -= title.textWidth / 2;
		this.achievementPopupGroup.add(title);

		this.scrollbar = new Scrollbar(this.game, this.camera.width / 2 + GetXPos(330, this.game), this.camera.height / 2 - GetYPos(220, this.game), "Scroll_Background.png", "Scroll_Node.png", this.achievementPopupGroup);

		var achievementArray = JSON.parse(this.game.cache.getText('achievements')).achievements;


		var offsetY = GetYPos(31, this.game);
		var startPosY = this.game.camera.height / 2 - GetYPos(200, this.game);
		var posX = this.game.camera.width / 2 - GetXPos(387, this.game);

		this.scrollbox = new ScrollBox(this.game, posX, startPosY, achievementArray, this.scrollbar.scrollingEvent, this.achievementPopupGroup);		

		/*for(var i = 0; i < achievementArray.length; i++)
		{
			var achievement = achievementArray[i];

			if(achievement.persistantLock)
			{
				var achievementText = this.game.add.bitmapText(posX, startPosY + ((offsetY + 10) * i), 'GreenFont', achievement.text, 25);	
				achievementText.alpha = 0.5;
				var progressText = this.game.add.bitmapText(this.game.camera.width / 2 + /*280*387, startPosY + ((offsetY + 10) * i), 'GreenFont', achievement.text, 25);
				progressText.alpha = 0.5
				var playerValueString = "";

				if(achievement.name === "TenCollected" || achievement.name === "FiftyCollected" || achievement.name === "HundredCollected")
				{
					if(MissileMania.playerData.maxCoinsCollected > achievement.maxValue)
					{
						playerValueString = achievement.maxValue.toString();
					}else
					{
						playerValueString = MissileMania.playerData.maxCoinsCollected.toString();
					}
				}else if(achievement.name === "DumbSurvive" || achievement.name === "MineSurvive" || achievement.name === "HomingSurvive" || achievement.name === "GuidedSurvive" || achievement.name === "TargetDestroyed")
				{
					for(var j = 0; j < MissileMania.playerData.achievementsUnlocked.length; j++)
					{
						if(MissileMania.playerData.achievementsUnlocked[j] === achievement.name)
						{
							playerValueString = "1";
							break;				
						}else
						{
							playerValueString = "0";
						}
					}
				}else if(achievement.name === "FiveThousandTravelled" || achievement.name === "TenThousandTravelled" || achievement.name === "TwentyThousandTravelled" || achievement.name === "FortyThousandTravelled")
				{
					if(MissileMania.playerData.furthestDistanceTravelled > achievement.maxValue)
					{
						playerValueString = achievement.maxValue.toString();
					}else
					{
						playerValueString = MissileMania.playerData.furthestDistanceTravelled.toString();
					}
				}

				progressText.text = playerValueString + "/" + achievement.maxValue.toString();	
				progressText.updateText();		
				progressText.x -= progressText.textWidth;

				for(var j = 0; j < MissileMania.playerData.achievementsUnlocked.length; j++)
				{
					if(MissileMania.playerData.achievementsUnlocked[j] === achievement.name)
					{
						achievementText.alpha = 1;	
						progressText.alpha = 1;					
					}
				}

				this.achievementPopupGroup.add(achievementText);
				this.achievementPopupGroup.add(progressText);	
			}		
		}
		*/
		function exitButton()
		{
			this.buttonClickSound.play();
			this.achievementPopupGroup.visible = false;
			
			this.achievementButton.visible = true;
			this.upgradeStartButton.visible = true;
			this.popupButtonGroup.visible = true;
		};
	},

	SetupPopup: function()
	{
		var mitFontSize = 32;
		var buttonFontSize = 29;

		if(!MissileMania.isHD)
		{
			mitFontSize *= 0.5;
			buttonFontSize *= 0.5;
		}


		this.popupGroup = this.game.add.group('', 'popupGroup', true);
		this.popupGroup.z = 1;
		
		var popupBackground = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'upgradeAtlas', 'Bunker_Popup.png');
		popupBackground.anchor.setTo(0.5, 0.5);
		popupBackground.scale.setTo(this.objectScale, this.objectScale);
		this.popupGroup.add(popupBackground);
		this.popupGroup.visible = false;

		var mitOSText = this.game.add.bitmapText(this.game.camera.x + this.game.camera.width / 2 - GetXPos(387, this.game), this.game.camera.y + this.game.camera.height / 2 - GetYPos(279, this.game), 'GreenFont', 'MIT OS 1.5', mitFontSize);//'MIT OS 1.5', { font: '25px CMSansSerif-Medium', align: 'center'});
		this.popupGroup.add(mitOSText);

		this.moneyXPos = this.game.camera.width / 2 + GetXPos(320, this.game);

		this.moneyText = this.game.add.bitmapText(this.moneyXPos, this.game.camera.y + this.game.camera.height / 2 - GetYPos(279, this.game), 'GreenFont', '', mitFontSize);//"$" + MissileMania.playerData.totalCoins.toString(), { font: '25px CMSansSerif-Medium', align: 'right'});
		this.popupGroup.add(this.moneyText);

		this.nameText = this.game.add.bitmapText(this.game.camera.width / 2 - 0, this.game.camera.height / 2 - GetYPos(279, this.game), 'GreenFont', '', mitFontSize);
		this.popupGroup.add(this.nameText);

		var exitButton = this.game.add.button(this.game.camera.x + this.game.camera.width / 2 + GetXPos(394, this.game), this.game.camera.y + this.game.camera.height / 2 - GetYPos(285, this.game), 'upgradeAtlas', exitButton, this, 'UI_Button_Exit_Up.png', 'UI_Button_Exit_Up.png', 'UI_Button_Exit_Down.png');
		exitButton.anchor.setTo(0.5, 0.5);
		this.popupGroup.add(exitButton);

		var barOffsetX = GetXPos(347, this.game);
		var barOffsetY = GetYPos(170, this.game);

		//TODO STAT BAR AND PURCHASE BUTTON
		var popupBar = this.game.add.image(this.game.camera.x + this.game.camera.width / 2 - barOffsetX, this.game.camera.y + this.game.camera.height / 2 + barOffsetY, 'upgradeAtlas', 'Bunker_Popup_Bar_Empty.png');
		this.popupGroup.add(popupBar);

		this.fillBar = this.game.add.image(this.game.camera.x + this.game.camera.width / 2 - barOffsetX + GetXPos(12, this.game), this.game.camera.y + this.game.camera.height / 2 + barOffsetY + GetYPos(14, this.game), 'upgradeAtlas', 'Bunker_Popup_Bar_Fill.png');
		this.popupGroup.add(this.fillBar);

		this.statTitleText = this.game.add.bitmapText(this.game.camera.x + this.camera.width / 2 - GetXPos(340, this.game), this.game.camera.y + this.game.camera.height / 2 + GetYPos(140, this.game), "GreenFont", '', mitFontSize);//'', { font: '32px CMSansSerif-Medium', align: 'center'});
		this.popupGroup.add(this.statTitleText);

		this.buyButton = this.game.add.button(this.game.camera.x + this.game.camera.width / 2 + GetXPos(200, this.game), this.game.camera.y + this.game.camera.height / 2 + GetYPos(120, this.game), 'upgradeAtlas', buyPart, this, 'Bunker_Popup_Button.png', 'Bunker_Popup_Button.png', 'Bunker_Popup_Button.png');
		this.popupGroup.add(this.buyButton);

		this.buttonText = this.game.add.bitmapText(this.game.camera.x + this.game.camera.width / 2 + GetXPos(245, this.game), this.game.camera.y + this.game.camera.height / 2 + GetYPos(190, this.game), "GreenFont", '', buttonFontSize);//'', { font: '32px CMSansSerif-Medium', align: 'left'});
		this.popupGroup.add(this.buttonText);
		this.priceText = this.game.add.bitmapText(this.game.camera.x + this.game.camera.width / 2 + GetXPos(245, this.game), this.game.camera.y + this.game.camera.height / 2 + GetYPos(200, this.game), "GreenFont", '', buttonFontSize);//'', { font: '32px CMSansSerif-Medium', align: 'left'});
		this.popupGroup.add(this.priceText);

		this.buttonYPos = this.buttonText.y;


		this.largeIconButton = null;
		
		this.SetupWarheadCarousel();
		this.SetupFuselageCarousel();
		this.SetupEngineCarousel();
		this.SetupCarouselButtons();

		function exitButton()
		{
			this.buttonClickSound.play();
			this.upgradeStartButton.visible = true;
			this.popupGroup.visible = false;
			this.warheadButtonGroup.visible = false;
			this.fuselageButtonGroup.visible = false;
			this.engineButtonGroup.visible = false;
			this.popupButtonGroup.visible = true;
			this.SetupUpgradeParts();
			this.achievementButton.activate();
		};

		function buyPart()
		{
			if(this.partToEquip.isUnlocked)
			{
				MissileMania.playerData.currentParts[this.currentType] = this.partToEquip.parentName;

				this.equipSound.play();

				this.upgradeStartButton.visible = true;
				this.popupGroup.visible = false;
				this.warheadButtonGroup.visible = false;
				this.fuselageButtonGroup.visible = false;
				this.engineButtonGroup.visible = false;
				this.popupButtonGroup.visible = true;
				this.SetupUpgradeParts();
				this.achievementButton.activate();
			}
			else if(MissileMania.playerData.totalCoins >= this.partToEquip.price)
			{
				MissileMania.playerData.totalCoins -= this.partToEquip.price;
				MissileMania.playerData.unlockedParts[this.currentType].push(this.partToEquip.parentName);

				this.partToEquip.isUnlocked = true;
				MissileMania.playerData.currentParts[this.currentType] = this.partToEquip.parentName;
				this.ticker.DisplayNumber(MissileMania.playerData.totalCoins);

				this.purchaseSound.play();
				this.equipSound.play();

				this.upgradeStartButton.visible = true;
				this.popupGroup.visible = false;
				this.warheadButtonGroup.visible = false;
				this.fuselageButtonGroup.visible = false;
				this.engineButtonGroup.visible = false;
				this.popupButtonGroup.visible = true;
				this.SetupUpgradeParts();
				this.achievementButton.activate();
			}			
		};
	},

	SetupUpgradeParts: function()
	{
		var scale = 0.78;//0.58;
		var xPos = (this.game.camera.x + this.game.camera.width / 2) - GetXPos(276, this.game);
		var yPos = (this.game.camera.y + this.game.camera.height / 2) + GetYPos(320, this.game);

		if(this.upgradeEnginePart != null) this.upgradeEnginePart.destroy();
		if(this.upgradeFuselagePart != null) this.upgradeFuselagePart.destroy();
		if(this.upgradeWarheadPart != null) this.upgradeWarheadPart.destroy();

		
		this.upgradeEnginePart = new LevelSelectPart(xPos, 0, this.game, scale, GetPart(MissileMania.playerData.currentParts["Engine"], "Engine"), this.upgradeGroup);
		this.upgradeWarheadPart = new LevelSelectPart(xPos, 0, this.game, scale, GetPart(MissileMania.playerData.currentParts["Warhead"], "Warhead"), this.upgradeGroup);
		this.upgradeFuselagePart = new LevelSelectPart(xPos, 0, this.game, scale, GetPart(MissileMania.playerData.currentParts["Fuselage"], "Fuselage"), this.upgradeGroup);
		this.upgradeEnginePart.SetPosY(yPos);
		this.upgradeFuselagePart.SetPosY(this.upgradeEnginePart.GetPosY() - this.upgradeEnginePart.GetHeight());
		this.upgradeWarheadPart.SetPosY(this.upgradeFuselagePart.GetPosY() - this.upgradeFuselagePart.GetHeight());

		this.SetupPopupButtons();
	},

	SetupTicker: function()
	{
		this.tickerPanel = this.game.add.image(this.game.camera.width / 2 - GetXPos(500, this.game), this.game.camera.height / 2 - GetYPos(371, this.game), 'upgradeAtlas', 'Bunker_Top_UI.png');
		this.moneyPanelGroup.add(this.tickerPanel);


		this.ticker = new Ticker('numberTicker', this.game, (this.game.camera.x + this.game.camera.width / 2) - GetXPos(97, this.game), (this.game.camera.y + this.game.camera.height / 2) - GetYPos(361, this.game), this.objectScale - 0.11, 9, this.moneyPanelGroup, false);

		this.distanceTicker = new Ticker('numberTicker', this.game, (this.game.camera.x + this.game.camera.width / 2) - GetXPos(513, this.game), (this.game.camera.y + this.game.camera.height / 2) - GetYPos(361, this.game), this.objectScale - 0.11, 10, this.moneyPanelGroup, false);
	},

	SetupBackgroundImage: function()
	{
		this.backgroundImage = this.game.add.image(0, 0, 'upgradeAtlas', 'Bunker_Background.jpg');
		this.upgradeGroup.add(this.backgroundImage);
	},

	SetupStartButton: function()
	{
		//Start Game button
		this.upgradeStartButton = this.game.add.button(this.game.camera.x + this.game.camera.width / 2 + GetXPos(380, this.game),
													   this.game.camera.y + this.game.camera.height / 2 + GetYPos(240, this.game), 
													   'upgradeAtlas',
													   StartGame, this,
													   'Bunker_Button_Launch.png',
													   'Bunker_Button_Launch.png',
													   'Bunker_Button_Launch.png');

		this.upgradeStartButton.anchor.setTo(0.5, 0.5);
		this.upgradeStartButton.scale.setTo(this.objectScale, this.objectScale);	
		this.upgradeGroup.add(this.upgradeStartButton);

		function StartGame()
		{	
			MissileMania.mainMusic.pause();
			this.buttonClickSound.play();		
			this.game.state.start("Game", true, true);
		}
	},

	SetupPartData: function()
	{
		
	},

/*
	SetupStatText: function()
	{
		var xPos = 850;
		var yPos = 100;
		var xOffset = -10;
		var yOffset = 30;

		this.statTitle = this.game.add.text(xPos,
									  yPos,
									  "STATS",
									  {font: "21px Arial", fill: "#ff0000", align: "center"});

		this.controlText = this.game.add.text(xPos + xOffset,
									  yPos + yOffset,
									  "Control: " + 0,
									  {font: "18px Arial", fill: "#000000", align: "left"});

		this.powerText = this.game.add.text(xPos + xOffset,
									  yPos + (yOffset * 2),
									  "Power: " + 0,
									  {font: "18px Arial", fill: "#000000", align: "left"});

		this.healthText = this.game.add.text(xPos + xOffset,
									  yPos + (yOffset * 3),
									  "Health: " + 0,
									  {font: "18px Arial", fill: "#000000", align: "left"});


		this.upgradeGroup.add(this.statTitle);
		this.upgradeGroup.add(this.controlText);
		this.upgradeGroup.add(this.powerText);
		this.upgradeGroup.add(this.healthText);
	},
	*/
	SetupWarheadCarouselButtons: function(buttonOffsetX, buttonOffsetY)
	{
		this.warheadButtonGroup = this.game.add.group('', 'warheadButtonGroup', true);
		this.popupGroup.add(this.warheadButtonGroup);
		//Warhead Buttons
		this.upgradeWarheadRight = this.game.add.button((this.game.camera.x + this.game.camera.width / 2) + buttonOffsetX,
														(this.game.camera.y + this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														RightWarheadCarousel, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.upgradeWarheadRight.anchor.setTo(0.5, 0.5);
		this.upgradeWarheadRight.angle += 180;

		this.upgradeWarheadLeft = this.game.add.button((this.game.camera.x + this.game.camera.width / 2) - buttonOffsetX,
														(this.game.camera.y + this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														LeftWarheadCarousel, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.upgradeWarheadLeft.anchor.setTo(0.5, 0.5);
		
		this.warheadButtonGroup.add(this.upgradeWarheadRight);
		this.warheadButtonGroup.add(this.upgradeWarheadLeft);

		this.warheadButtonGroup.visible = false;

		function RightWarheadCarousel()
		{
			this.upgradeWarheadCarousel.currentIndex = MissileMania.playerData.warheadCarouselIndex;
			this.partToEquip = this.upgradeWarheadCarousel.GetNextObject();
			MissileMania.playerData.warheadCarouselIndex = this.upgradeWarheadCarousel.currentIndex;

			this.buttonClickSound.play();

			this.CreateLargeIcon('Warhead');	

			this.ChangeWarheadStatText(this.partToEquip);		
		};

		function LeftWarheadCarousel()
		{
			this.upgradeWarheadCarousel.currentIndex = MissileMania.playerData.warheadCarouselIndex;
			this.partToEquip = this.upgradeWarheadCarousel.GetPreviousObject();
			MissileMania.playerData.warheadCarouselIndex = this.upgradeWarheadCarousel.currentIndex;
			this.buttonClickSound.play();

			this.CreateLargeIcon('Warhead');

			this.ChangeWarheadStatText(this.partToEquip);			
		};
	},

	ChangeWarheadStatText: function(partData)
	{
		this.statTitleText.setText("HEALTH");

		this.nameText.text = partData.parentName;
		this.nameText.updateText();
		this.nameText.x = this.game.camera.width / 2 - this.nameText.textWidth / 2;

		if((partData.health / 200) * 12.3 < 12.3)
		{
			this.fillBar.scale.setTo((partData.health / 200) * 12.3, 1);
		}else
		{
			this.fillBar.scale.setTo(12.3, 1);
		}

		if(GetPart(MissileMania.playerData.currentParts["Warhead"], "Warhead") == partData)
		{
			this.buttonText.setText("EQUIPPED");
			this.buttonText.updateText();
			this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
			this.buttonText.y = this.buttonYPos;
			this.priceText.text = '';
		}else
		{
			if(partData.isUnlocked)
			{
				this.buttonText.setText("EQUIP");
				this.buttonText.updateText();
				this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
				this.buttonText.y = this.buttonYPos;
				this.priceText.text = '';

			}else
			{
				this.buttonText.setText("BUY");
				this.buttonText.updateText();
				this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
				this.buttonText.y = this.buttonYPos - this.buttonText.textHeight / 2 - 2;

				this.priceText.setText("$"+ partData.price.toString());
				this.priceText.updateText();
				this.priceText.x = this.buyButton.x + this.buyButton.width / 2 - this.priceText.textWidth / 2;
				this.priceText.y = this.buttonYPos + this.priceText.textHeight / 2 + 2;

			}
		}

		

	},

	ChangeFuselageStatText: function(partData)
	{
		this.statTitleText.setText("TURN RATE");

		this.nameText.text = partData.parentName;
		this.nameText.updateText();
		this.nameText.x = this.game.camera.width / 2 - this.nameText.textWidth / 2;

		if((partData.turnRate / 60) * 12.3 < 12.3)
		{
			this.fillBar.scale.setTo((partData.turnRate / 60) * 12.3, 1);
		}else
		{
			this.fillBar.scale.setTo(12.3, 1);
		}
		
		if(GetPart(MissileMania.playerData.currentParts["Fuselage"], "Fuselage") == partData)
		{
			this.buttonText.setText("EQUIPPED");
			this.buttonText.updateText();
			this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
			this.buttonText.y = this.buttonYPos;
			this.priceText.text = '';
		}else
		{
			if(partData.isUnlocked)
			{
				this.buttonText.setText("EQUIP");
				this.buttonText.updateText();
				this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
				this.buttonText.y = this.buttonYPos;
				this.priceText.text = '';

			}else
			{
				this.buttonText.setText("BUY");
				this.buttonText.updateText();
				this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
				this.buttonText.y = this.buttonYPos - this.buttonText.textHeight / 2 - GetYPos(2, this.game);

				this.priceText.setText("$"+ partData.price.toString());
				this.priceText.updateText();
				this.priceText.x = this.buyButton.x + this.buyButton.width / 2 - this.priceText.textWidth / 2;
				this.priceText.y = this.buttonYPos + this.priceText.textHeight / 2 + GetYPos(2, this.game);

			}
		}

	},

	ChangeEngineStatText: function(partData)
	{
		this.statTitleText.setText("POWER");

		this.nameText.text = partData.parentName;
		this.nameText.updateText();
		this.nameText.x = this.game.camera.width / 2 - this.nameText.textWidth / 2;

		if((partData.acceleration / 1200) * 12.3 < 12.3)
		{
			this.fillBar.scale.setTo((partData.acceleration / 1200) * 12.3, 1);
		}else
		{
			this.fillBar.scale.setTo(12.3, 1);
		}
		
		if(GetPart(MissileMania.playerData.currentParts["Engine"], "Engine") == partData)
		{
			this.buttonText.setText("EQUIPPED");
			this.buttonText.updateText();
			this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
			this.buttonText.y = this.buttonYPos;
			this.priceText.text = '';
		}else
		{
			if(partData.isUnlocked)
			{
				this.buttonText.setText("EQUIP");
				this.buttonText.updateText();
				this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
				this.buttonText.y = this.buttonYPos;
				this.priceText.text = '';

			}else
			{
				this.buttonText.setText("BUY");
				this.buttonText.updateText();
				this.buttonText.x = (this.buyButton.x + (this.buyButton.width / 2)) - (this.buttonText.textWidth / 2);
				this.buttonText.y = this.buttonYPos - this.buttonText.textHeight / 2 - GetYPos(2, this.game);

				this.priceText.setText("$"+ partData.price.toString());
				this.priceText.updateText();
				this.priceText.x = this.buyButton.x + this.buyButton.width / 2 - this.priceText.textWidth / 2;
				this.priceText.y = this.buttonYPos + this.priceText.textHeight / 2 + GetYPos(2, this.game);

			}
		}
	},

	CreateLargeIcon: function(stringPart)
	{
		this.currentType = stringPart;
		var yOffset = GetYPos(-50, this.game);
		if(this.largeIconButton == null)
		{
			this.largeIconButton = this.game.add.image(0, 0, 'upgradeAtlas', GetPart(MissileMania.playerData.currentParts[stringPart], stringPart).largeIconRef);
			this.largeIconButton.anchor.setTo(0.5, 0.5);
			this.largeIconButton.x = (this.game.camera.x + this.game.camera.width / 2);
			this.largeIconButton.y = (this.game.camera.y + this.game.camera.height / 2) + yOffset;
			this.largeIconButton.scale.setTo(this.objectScale, this.objectScale);				
			this.popupGroup.add(this.largeIconButton);
		}else
		{
			this.largeIconButton.destroy();
			this.largeIconButton = this.game.add.image(0, 0, 'upgradeAtlas', this.partToEquip.largeIconRef);
			this.largeIconButton.anchor.setTo(0.5, 0.5);
			this.largeIconButton.x = (this.game.camera.x + this.game.camera.width / 2);
			this.largeIconButton.y = (this.game.camera.y + this.game.camera.height / 2) + yOffset;
			this.largeIconButton.scale.setTo(this.objectScale, this.objectScale);				
			this.popupGroup.add(this.largeIconButton);
		}
	},

	SetupFuselageCarouselButtons: function(buttonOffsetX, buttonOffsetY)
	{
		this.fuselageButtonGroup = this.game.add.group('', 'fuselageButtonGroup', true);
		this.popupGroup.add(this.fuselageButtonGroup);
		//Fuselage Buttons
		this.upgradeFuselageRight = this.game.add.button((this.game.camera.x + this.game.camera.width / 2) + buttonOffsetX,
														(this.game.camera.y + this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														RightFuselageCarousel, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.upgradeFuselageRight.anchor.setTo(0.5, 0.5);
		this.upgradeFuselageRight.angle += 180;

		this.upgradeFuselageLeft = this.game.add.button((this.game.camera.x + this.game.camera.width / 2) - buttonOffsetX,
														(this.game.camera.y + this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														LeftFuselageCarousel, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.upgradeFuselageLeft.anchor.setTo(0.5, 0.5);
		
		this.fuselageButtonGroup.add(this.upgradeFuselageRight);
		this.fuselageButtonGroup.add(this.upgradeFuselageLeft);

		this.fuselageButtonGroup.visible = false;

		function RightFuselageCarousel()
		{
			this.upgradeFuselageCarousel.currentIndex = MissileMania.playerData.fuselageCarouselIndex;
			this.partToEquip = this.upgradeFuselageCarousel.GetNextObject();
			MissileMania.playerData.fuselageCarouselIndex = this.upgradeFuselageCarousel.currentIndex;
			this.buttonClickSound.play();
			this.CreateLargeIcon('Fuselage');
			this.ChangeFuselageStatText(this.partToEquip);
		};

		function LeftFuselageCarousel()
		{
			this.upgradeFuselageCarousel.currentIndex = MissileMania.playerData.fuselageCarouselIndex;
			this.partToEquip = this.upgradeFuselageCarousel.GetPreviousObject();
			MissileMania.playerData.fuselageCarouselIndex = this.upgradeFuselageCarousel.currentIndex;
			this.buttonClickSound.play();
			this.CreateLargeIcon('Fuselage');
			this.ChangeFuselageStatText(this.partToEquip);
		};
	},

	SetupEngineCarouselButtons: function(buttonOffsetX, buttonOffsetY)
	{
		this.engineButtonGroup = this.game.add.group('', 'engineButtonGroup', true);
		this.popupGroup.add(this.engineButtonGroup);
		//Engine Buttons
		this.upgradeEngineRight = this.game.add.button((this.game.camera.x + this.game.camera.width / 2) + buttonOffsetX,
														(this.game.camera.y + this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														RightEngineCarousel, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.upgradeEngineRight.anchor.setTo(0.5, 0.5);
		this.upgradeEngineRight.angle += 180;

		this.upgradeEngineLeft = this.game.add.button((this.game.camera.x + this.game.camera.width / 2) - buttonOffsetX,
														(this.game.camera.y + this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														LeftEngineCarousel, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.upgradeEngineLeft.anchor.setTo(0.5, 0.5);
		
		this.engineButtonGroup.add(this.upgradeEngineRight);
		this.engineButtonGroup.add(this.upgradeEngineLeft);		

		this.engineButtonGroup.visible = false;

		function RightEngineCarousel()
		{
			this.upgradeEngineCarousel.currentIndex = MissileMania.playerData.engineCarouselIndex;
			this.partToEquip = this.upgradeEngineCarousel.GetNextObject();
			MissileMania.playerData.engineCarouselIndex = this.upgradeEngineCarousel.currentIndex;
			this.buttonClickSound.play();

			this.CreateLargeIcon('Engine');
			this.ChangeEngineStatText(this.partToEquip);
		};

		function LeftEngineCarousel()
		{
			this.upgradeEngineCarousel.currentIndex = MissileMania.playerData.engineCarouselIndex;
			this.partToEquip = this.upgradeEngineCarousel.GetPreviousObject();
			MissileMania.playerData.engineCarouselIndex = this.upgradeEngineCarousel.currentIndex;
			this.buttonClickSound.play();
			this.CreateLargeIcon('Engine');
			this.ChangeEngineStatText(this.partToEquip);
		};
	},

	SetupCarouselButtons: function()
	{
		var buttonOffsetX = GetXPos(350, this.game);
		var buttonOffsetY = GetYPos(-50, this.game);

		this.SetupWarheadCarouselButtons(buttonOffsetX, buttonOffsetY);
		this.SetupFuselageCarouselButtons(buttonOffsetX, buttonOffsetY);
		this.SetupEngineCarouselButtons(buttonOffsetX, buttonOffsetY);		
	},

	SetupWarheadCarousel: function()
	{
		var warheadArray = new Array(
				MEOW_Rocket["Warhead"],
				Cataclysm_Rocket["Warhead"],
				KIT10_Rocket["Warhead"],
				PU55Y_Rocket["Warhead"]
					 );

		this.upgradeWarheadCarousel = new Carousel(warheadArray);
	},

	SetupFuselageCarousel: function()
	{
		var fuselageArray = new Array(
				MEOW_Rocket["Fuselage"],
				Cataclysm_Rocket["Fuselage"],
				KIT10_Rocket["Fuselage"],
				PU55Y_Rocket["Fuselage"]
					 );


		this.upgradeFuselageCarousel = new Carousel(fuselageArray);
	},

	SetupEngineCarousel: function()
	{
		var engineArray = new Array(
				MEOW_Rocket["Engine"],
				Cataclysm_Rocket["Engine"],
				KIT10_Rocket["Engine"],
				PU55Y_Rocket["Engine"]
					 );


		this.upgradeEngineCarousel = new Carousel(engineArray);
	},

	update: function()
	{
		this.scrollbar.Update();
		if(this.lastCoin != MissileMania.playerData.totalCoins)
		{
			this.moneyText.text = "$" + MissileMania.playerData.totalCoins.toString();
			this.moneyText.updateText();
			this.moneyText.x = this.moneyXPos - this.moneyText.textWidth;
			this.ticker.DisplayNumber(MissileMania.playerData.totalCoins);	
		} 

		if(this.lock)
		{
			this.distanceTicker.DisplayNumber(MissileMania.playerData.furthestDistanceTravelled);
			this.lock = false;
		}
		
		this.lastCoin = MissileMania.playerData.totalCoins;
	},

	render: function()
	{
		//this.game.debug.renderText("FPS: " + this.time.fps,
		//					  this.camera.view.width /2 ,
		//					  32);
	},

	shutdown: function()
	{
		SaveObject('playerData', MissileMania.playerData);		
		SaveObject('settings', MissileMania.settingsData);
		
		this.game.add.tween(MissileMania.mainMusic).to({volume: 0}, 2500, Phaser.Easing.Quadratic.Out, true, 0, false, false).onComplete.add(function(){ MissileMania.mainMusic.pause();}, this);

		this.mutePanelGroup.destroy();
		this.upgradeGroup.destroy();
		this.scrollbar.destroy();
		this.popupGroup.destroy();
		this.upgradeWarheadCarousel.destroy();
		this.upgradeFuselageCarousel.destroy();
		this.upgradeEngineCarousel.destroy();
		this.backgroundImage.destroy();
		this.moneyPanelGroup.destroy();
		this.purchaseSound.stop();
		this.equipSound.stop();
		this.achievementButton.destroy();
		this.ticker.destroy();
		this.distanceTicker.destroy();


		MissileMania.mainMusic = null;
		this.game = null;
		this.buttonClickSound = null;
		this.equipSound = null;
		this.purchaseSound = null;
		this.middleStatBox = null;
		this.rightstatBox = null;
		this.ticker = null;
		this.backgroundImage = null;
		this.MEOW_Rocket = null;
		this.Cataclysm_Rocket = null;
		this.upgradeWarheadCarousel = null;
		this.upgradeFuselageCarousel = null;
		this.upgradeEngineCarousel = null;
	}
};


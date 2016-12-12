
MissileMania.MainMenu = function (game)
{	
};

var rocketData = null;
var mute = false;

function GetPart(name, segment)
{
	for(var i = 0; i < rocketData.length; i++)
	{
		if(name === rocketData[i]["Name"]) return rocketData[i][segment];
	}

	return rocketData[0]["Warhead"];
};

MissileMania.MainMenu.prototype = 
{
	create: function () 
	{
		MissileMania.playerData = null;
		MissileMania.levelData = null;

		this.LoadSettings();
		
		MissileMania.mainMusic = null;
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

		this.centerX = this.game.camera.x + this.game.camera.width / 2;
		this.centerY = this.game.camera.y + this.game.camera.height / 2;

		this.buttonClickSound = this.game.add.audio('ButtonClick');
		this.game.sound.mute = MissileMania.settingsData.mute;

		this.CreateBackground();
		this.CreateMainPanel();
		this.CreateProfessor();	
		this.CreateMutePanel();
		this.CreateInstructionScreen();

		if(MissileMania.brandingSplash.image)
		{
			var moreGamesButton = this.game.add.button(GetXPos(10, this.game), GetYPos(10, this.game), 'a10_splash', MissileMania.brandingSplash.action, this, 'a10_splash', 'a10_splash', 'a10_splash');
			this.mainPanelGroup.add(moreGamesButton);
		}

		if(MissileMania.SpilAPI.isReady) MissileMania.SpilAPI.GameBreak.request(fnPause.bind(this), fnResume.bind(this));

		

		function fnPause()
		{
			//mute game audio
			this.game.sound.mute = true;

		};

		function fnResume()
		{
			this.game.sound.mute = MissileMania.settingsData.mute;

		};


	},

	CreateInstructionScreen: function()
	{
		this.instructionPopupGroup = this.game.add.group('', 'instructionPopupGroup', true);
		this.upgradeInstructionGroup = this.game.add.group('', 'upgradeInstructionGroup', true);
		this.gameInstructionGroup = this.game.add.group('', 'gameInstructionGroup', true);

		//this.instructionPopupGroup.add(this.upgradeInstructionGroup);
		//this.instructionPopupGroup.add(this.gameInstructionGroup);

		var titleTextSize = 38;


		//Background
		var popupBackground = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'upgradeAtlas', 'Bunker_Popup.png');
		popupBackground.anchor.setTo(0.5, 0.5);
		this.instructionPopupGroup.add(popupBackground);

		var exitButton = this.game.add.button(this.game.camera.x + this.game.camera.width / 2 + GetXPos(394, this.game), this.game.camera.y + this.game.camera.height / 2 - GetYPos(285, this.game), 'upgradeAtlas', exitButton, this, 'UI_Button_Exit_Up.png', 'UI_Button_Exit_Up.png', 'UI_Button_Exit_Down.png');
		exitButton.anchor.setTo(0.5, 0.5);
		this.instructionPopupGroup.add(exitButton);

		var title = this.game.add.bitmapText(this.game.camera.width / 2, this.game.camera.height / 2 - GetYPos(285, this.game), 'GreenFont', 'HELP', MissileMania.isHD ? 38 : 38 * 0.5);
		title.x -= title.textWidth / 2;
		this.instructionPopupGroup.add(title);

		var mitOSText = this.game.add.bitmapText(this.game.camera.x + this.game.camera.width / 2 - GetXPos(387, this.game), this.game.camera.y + this.game.camera.height / 2 - GetYPos(279, this.game), 'GreenFont', 'MIT OS 1.5', MissileMania.isHD ? 32 : 32 * 0.5);
		this.instructionPopupGroup.add(mitOSText);

		var buttonOffsetX = GetXPos(350, this.game);
		var buttonOffsetY = 0;

		this.leftButton = this.game.add.button((this.game.camera.width / 2) - buttonOffsetX,
														(this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														ButtonPress, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.leftButton.anchor.setTo(0.5, 0.5);
		this.leftButton.visible = false;

		this.rightButton = this.game.add.button((this.game.camera.width / 2) + buttonOffsetX,
														(this.game.camera.height / 2) + buttonOffsetY,
														'upgradeAtlas',
														ButtonPress, this,
														'Bunker_Arrow.png',
														'Bunker_Arrow.png',
														'Bunker_Arrow.png');
		this.rightButton.anchor.setTo(0.5, 0.5);
		this.rightButton.angle += 180;

		this.instructionPopupGroup.add(this.leftButton);
		this.instructionPopupGroup.add(this.rightButton);

		this.instructionPopupGroup.y = -this.game.camera.height;
		this.upgradeInstructionGroup.y = -this.game.camera.height;
		this.gameInstructionGroup.y = -this.game.camera.height;


		this.instructionTweenOut = this.game.add.tween(this.instructionPopupGroup)
			.to({y: -this.game.camera.height}, 1000, Phaser.Easing.Quartic.Out, false, 0, false, false);
		this.gameInstructionTweenOut = this.game.add.tween(this.gameInstructionGroup)
			.to({y: -this.game.camera.height}, 1000, Phaser.Easing.Quartic.Out, false, 0, false, false);
		this.upgradeInstructionTweenOut = this.game.add.tween(this.upgradeInstructionGroup)
			.to({y: -this.game.camera.height}, 1000, Phaser.Easing.Quartic.Out, false, 0, false, false);

		this.instructionTweenIn = this.game.add.tween(this.instructionPopupGroup)
			.to({y: 0}, 1000, Phaser.Easing.Quartic.Out, false, 0, false, false);
		this.gameInstructionTweenIn = this.game.add.tween(this.gameInstructionGroup)
			.to({y: 0}, 1000, Phaser.Easing.Quartic.Out, false, 0, false, false);
		this.upgradeInstructionTweenIn = this.game.add.tween(this.upgradeInstructionGroup)
			.to({y: 0}, 1000, Phaser.Easing.Quartic.Out, false, 0, false, false);

		var rocketScale = 0.75;

		var headerSize = 25;
		var textSize = 21;

		if(!MissileMania.isHD)
		{
			headerSize *= 0.5;
			textSize *= 0.5;
		}

		//Upgrade Instruction
		var upgradeText = this.game.add.bitmapText(this.camera.width / 2, this.game.camera.height / 2 - GetYPos(220, this.game), "GreenFont", "UPGRADE YOUR ROCKET PARTS IN YOUR SECRET ISLAND BUNKER", headerSize);
		upgradeText.x -= upgradeText.textWidth / 2;
		this.upgradeInstructionGroup.add(upgradeText);

		var fuselageImage = this.game.add.image(this.camera.width / 2 - GetXPos(300, this.game), this.camera.height / 2 + GetYPos(50, this.game), 'upgradeAtlas', 'Body-1.png');
		fuselageImage.angle -= 90;
		fuselageImage.anchor.setTo(0.5, 0.5);
		fuselageImage.scale.setTo(rocketScale + 0.4, rocketScale + 0.4);
		this.upgradeInstructionGroup.add(fuselageImage);

		var warheadImage = this.game.add.image(this.camera.width / 2 - GetXPos(300, this.game), fuselageImage.y - fuselageImage.height - GetYPos(20, this.game), 'upgradeAtlas', 'Warhead-1.png');
		warheadImage.angle -= 90;
		warheadImage.anchor.setTo(0.5, 0.5);
		warheadImage.scale.setTo(rocketScale, rocketScale);
		this.upgradeInstructionGroup.add(warheadImage);

		var engineImage = this.game.add.image(this.camera.width / 2 - GetXPos(300, this.game), fuselageImage.y + fuselageImage.height + GetYPos(20, this.game), 'upgradeAtlas', 'Engine-1.png');
		engineImage.angle -= 90;
		engineImage.anchor.setTo(0.5, 0.5);
		engineImage.scale.setTo(rocketScale + 0.1, rocketScale + 0.1);
		this.upgradeInstructionGroup.add(engineImage);

		var warheadText = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(200, this.game), this.game.camera.height / 2 - GetYPos(150, this.game), "GreenFont", "WARHEAD CONTAINMENT INTEGRITY", headerSize);
		this.upgradeInstructionGroup.add(warheadText);
		var warheadText2 = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(200, this.game), this.game.camera.height / 2 - GetYPos(120, this.game), "GreenFont", "(HOW MANY HITS YOUR MISSILE\nCAN TAKE BEFORE EXPLODING)", textSize);
		this.upgradeInstructionGroup.add(warheadText2);

		var fuselageText = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(200, this.game), this.game.camera.height / 2 + GetYPos(10, this.game), "GreenFont", "MAXIMUM G-FORCE POTENTIAL", headerSize);
		this.upgradeInstructionGroup.add(fuselageText);
		var fuselageText2 = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(200, this.game), this.game.camera.height / 2 + GetYPos(40, this.game), "GreenFont", "(HOW QUICKLY YOUR MISSILE CAN\nTURN TO AVOID ON COMING ENEMIES)", textSize);
		this.upgradeInstructionGroup.add(fuselageText2);

		var engineText = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(200, this.game), this.game.camera.height / 2 + GetYPos(165, this.game), "GreenFont", "MAXIMUM VELOCITY", headerSize);
		this.upgradeInstructionGroup.add(engineText);
		var engineText2 = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(200, this.game), this.game.camera.height / 2 + GetYPos(195, this.game), "GreenFont", "(HOW FAST YOUR MISSILE CAN GO)", textSize);
		this.upgradeInstructionGroup.add(engineText2);


		//Game Instruction
		var upgradeText = this.game.add.bitmapText(this.camera.width / 2, this.game.camera.height / 2 - GetYPos(220, this.game), "GreenFont", "GUIDE YOUR MISSILE AS FAR AS YOU CAN TO MAKE MONEY", headerSize);
		upgradeText.x -= upgradeText.textWidth / 2;
		this.gameInstructionGroup.add(upgradeText);

		var warheadText = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(350, this.game), this.game.camera.height / 2 + GetYPos(200, this.game), "GreenFont", "CONTROLS", headerSize);
		this.gameInstructionGroup.add(warheadText);
		var warheadText2 = this.game.add.bitmapText(this.camera.width / 2 - GetXPos(350, this.game), this.game.camera.height / 2 + GetYPos(230, this.game), "GreenFont", "USE THE ARROW KEYS OR ON SCREEN BUTTONS TO NAVIGATE YOUR WAY\nTHROUGH THE TREACHEROUS ARCHIPELAGO", textSize);
		this.gameInstructionGroup.add(warheadText2);

		var fuselageImage = this.game.add.image(this.camera.width / 2 - GetXPos(150, this.game), this.camera.height / 2, 'upgradeAtlas', 'Body-1.png');
		fuselageImage.angle -= 45;
		fuselageImage.anchor.setTo(0.5, 0.5);
		fuselageImage.scale.setTo(rocketScale + 0.4, rocketScale + 0.4);
		this.gameInstructionGroup.add(fuselageImage);

		var warheadImage = this.game.add.image(this.camera.width / 2 - GetXPos(150 - 75, this.game), fuselageImage.y - fuselageImage.height / 2 - GetYPos(6, this.game), 'upgradeAtlas', 'Warhead-1.png');
		warheadImage.angle -= 45;
		warheadImage.anchor.setTo(0.5, 0.5);
		warheadImage.scale.setTo(rocketScale, rocketScale);
		this.gameInstructionGroup.add(warheadImage);

		var engineImage = this.game.add.image(this.camera.width / 2 - GetXPos(150 + 80, this.game), fuselageImage.y + fuselageImage.height / 2 + GetYPos(15, this.game), 'upgradeAtlas', 'Engine-1.png');
		engineImage.angle -= 45;
		engineImage.anchor.setTo(0.5, 0.5);
		engineImage.scale.setTo(rocketScale + 0.1, rocketScale + 0.1);
		this.gameInstructionGroup.add(engineImage);

		var xPos = this.camera.width / 2 + GetXPos(50, this.game);
		var yPos = this.camera.height / 2 - GetYPos(100, this.game);
		
		var coin = this.game.add.image(xPos, yPos, 'menuAtlas', 'help_coin.png');
		this.gameInstructionGroup.add(coin);
		var coin = this.game.add.image(xPos + coin.width, yPos, 'menuAtlas', 'help_coin.png');
		this.gameInstructionGroup.add(coin);
		var coin = this.game.add.image(xPos + coin.width * 2, yPos, 'menuAtlas', 'help_coin.png');
		this.gameInstructionGroup.add(coin);

		var coin = this.game.add.image(xPos + coin.width / 2, yPos + coin.height, 'menuAtlas', 'help_coin.png');
		this.gameInstructionGroup.add(coin);
		var coin = this.game.add.image(xPos + coin.width / 2 * 3, yPos + coin.height, 'menuAtlas', 'help_coin.png');
		this.gameInstructionGroup.add(coin);
			



		function ButtonPress()
		{
			this.upgradeInstructionGroup.visible = !this.upgradeInstructionGroup.visible;
			this.gameInstructionGroup.visible = !this.gameInstructionGroup.visible;
			this.leftButton.visible = !this.leftButton.visible;
			this.rightButton.visible = !this.rightButton.visible;

			this.buttonClickSound.play();
		}

		function exitButton()
		{
			this.instructionTweenOut.start();
			this.gameInstructionTweenOut.start();
			this.upgradeInstructionTweenOut.start();
			this.buttonClickSound.play();
			this.newGameButton.activate();
			this.continueButton.activate();
			this.moreGamesButton.activate();
		}
	},

	LoadSettings: function()
	{
		MissileMania.settingsData = GetObject("settings");

		if(MissileMania.settingsData === null)
		{
			MissileMania.settingsData = {};
			MissileMania.settingsData.mute = false;
		}
	},

	CreateProfessor: function()
	{
		var professor = this.game.add.image(this.game.camera.x + this.game.camera.width, this.centerY - GetYPos(170, this.game), 'gameAtlas', 'summary_professor.png');
		professor.anchor.setTo(0, 0);
		professor.scale.setTo(1, 1);
		this.backgroundGroup.add(professor);

		this.game.add.tween(professor).to({x: this.centerX - GetXPos(750, this.game)}, 1000, Phaser.Easing.Quadratic.Out, true, 750, 0, false);
	},

	CreateBackground: function()
	{
		this.backgroundGroup = this.game.add.group('undefined', 'backgroundGroup', true);

		var sky = this.game.add.image(this.centerX, this.centerY, 'sky');
		sky.anchor.setTo(0.5, 0.5);
		sky.scale.setTo(100, 50);
		this.backgroundGroup.add(sky);

		var skyGradient = this.game.add.image(this.centerX, this.centerY, 'sky_fog');
		skyGradient.anchor.setTo(0.5, 0.5);
		skyGradient.scale.setTo(1000, 7);
		this.backgroundGroup.add(skyGradient);

		var cloud = this.game.add.image(this.centerX - GetXPos(400, this.game), this.centerY - GetYPos(250, this.game), 'gameAtlas', 'cloud.png');
		cloud.anchor.setTo(0.5, 0.5);
		cloud.scale.setTo(1.5, 1.5);
		this.backgroundGroup.add(cloud);

		this.sea = this.game.add.tileSprite(this.centerX - this.camera.width / 2, this.centerY + GetYPos(200, this.game), 265, 165, 'gameAtlas', 'Sea.png');
		this.sea.anchor.setTo(0.5, 0);
		this.sea.tileScale.setTo(1, 1.25);
		this.sea.scale.setTo(6, 1.25);
		this.backgroundGroup.add(this.sea);

		this.farBackgroundGroup = this.game.add.group();
		this.backgroundGroup.add(this.farBackgroundGroup);		

		var farIsland = this.game.add.image(this.centerX + GetXPos(650, this.game), this.centerY + GetYPos(200, this.game), 'gameAtlas', 'Island_Distant_02.png');
		farIsland.anchor.setTo(0.5, 0.5);
		this.farBackgroundGroup.add(farIsland);
		
		this.closeBackgroundGroup = this.game.add.group();
		this.backgroundGroup.add(this.closeBackgroundGroup);

		var closeIslandRight = this.game.add.image(this.centerX + GetXPos(800, this.game), this.centerY + GetYPos(250, this.game), 'gameAtlas', 'Island_Midground_01.png');
		closeIslandRight.anchor.setTo(0.5, 0.5);
		this.closeBackgroundGroup.add(closeIslandRight);

		var closeIslandLeft = this.game.add.image(this.centerX - GetXPos(350, this.game), this.centerY + GetYPos(255, this.game), 'gameAtlas', 'Island_Midground_01.png');
		closeIslandLeft.anchor.setTo(0.5, 0.5);
		this.closeBackgroundGroup.add(closeIslandLeft);
	},

	CreateMutePanel: function()
	{
		this.mutePanelGroup = this.game.add.group('', 'mutePanelGroup', true);

		var mutePanel = this.game.add.image(/*this.centerX, this.centerY*/0, 0, 'menuAtlas', 'button_audio_background.png');
		this.mutePanelGroup.add(mutePanel);

		if(this.game.sound.mute)
		{
			this.muteButton = this.game.add.button(GetXPos(50, this.game)/*this.centerX + 50*/, /*this.centerY + 30*/GetYPos(30, this.game), 'menuAtlas', Mute, this, 'button_mute_up.png', 'button_mute_up.png', 'button_mute_down.png');
		}else
		{
			this.muteButton = this.game.add.button(GetXPos(50, this.game)/*this.centerX + 50*/, /*this.centerY + 30*/GetYPos(30, this.game), 'menuAtlas', Mute, this, 'button_audio_up.png', 'button_audio_up.png', 'button_audio_down.png');
		}

		
		this.mutePanelGroup.add(this.muteButton);

		this.mutePanelGroup.x = this.game.camera.width + mutePanel.width;
		this.mutePanelGroup.y = 0;

		this.game.add.tween(this.mutePanelGroup).to({x: this.game.camera.width - mutePanel.width}, 500, Phaser.Easing.Quadratic.Out, true, 1250, 0, false);

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

	CreateMainPanel: function()
	{
		this.mainPanelGroup = this.game.add.group('', 'mainPanelGroup', true);

		var menuPanel = this.game.add.image(this.centerX, this.centerY, 'menuAtlas', 'Logo.png');
		menuPanel.anchor.setTo(0.5, 0.5);
		this.mainPanelGroup.add(menuPanel);

		this.newGameButton = this.game.add.button(this.centerX, this.centerY + GetYPos(65, this.game), 'menuAtlas', StartNewGame, this, 'button_new_game_up.png', 'button_new_game_up.png', 'button_new_game_down.png');
		this.newGameButton.anchor.setTo(0.5 , 0.5);
		this.mainPanelGroup.add(this.newGameButton);

		this.continueButton;

		if(GetObject('playerData') === null || GetObject('levelData') === null)
		{
			//not played before
			this.continueButton = this.game.add.image(this.centerX, this.centerY - GetYPos(20, this.game), 'menuAtlas', 'button_continue_game_grey.png');
		}
		else
		{
			//played before
			this.continueButton = this.game.add.button(this.centerX, this.centerY - GetYPos(20, this.game), 'menuAtlas', ContinueGame, this, 'button_continue_game_up.png', 'button_continue_game_up.png', 'button_continue_game_down.png');
		}

		this.continueButton.anchor.setTo(0.5, 0.5);
		this.mainPanelGroup.add(this.continueButton);

		var instructionButton = this.game.add.button(this.centerX, this.centerY + GetYPos(150, this.game), 'menuAtlas', OpenInstructionScreen, this, 'button_help_up.png', 'button_help_up.png', 'button_help_down.png');
		instructionButton.anchor.setTo(0.5 , 0.5);
		this.mainPanelGroup.add(instructionButton);

		this.moreGamesButton = this.game.add.button(this.centerX, this.centerY + GetYPos(285, this.game), 'menuAtlas', MissileMania.moreGamesLink.action, this, 'button_more_game_up.png', 'button_more_game_up.png', 'button_more_game_down.png');
		this.moreGamesButton.anchor.setTo(0.5, 0.0);
		this.mainPanelGroup.add(this.moreGamesButton);

		this.mainPanelGroup.y = this.game.camera.y - menuPanel.height - GetYPos(20, this.game);

		this.game.add.tween(this.mainPanelGroup)
			.to({y: 0}, 1000, Phaser.Easing.Quartic.Out, true, 250, 0, false);

		function OpenInstructionScreen()
		{
			this.upgradeInstructionGroup.visible = true;
			this.gameInstructionGroup.visible = false;
			this.leftButton.visible = false;
			this.rightButton.visible = true;

			this.newGameButton.deactivate();

			if (this.continueButton) {
				this.continueButton.deactivate();
			}

			this.moreGamesButton.deactivate();



			this.buttonClickSound.play();


			this.instructionTweenIn.start();
			this.upgradeInstructionTweenIn.start();
			this.gameInstructionTweenIn.start();
		};

		function StartNewGame()
		{
			//create empty player Data
			MissileMania.playerData = { };
			MissileMania.playerData.totalCoins = 0;
			MissileMania.playerData.currentParts = {"Warhead": null, "Fuselage": null, "Engine": null };
			MissileMania.playerData.warheadCarouselIndex = 0;
			MissileMania.playerData.fuselageCarouselIndex = 0;
			MissileMania.playerData.engineCarouselIndex = 0;
			MissileMania.playerData.furthestDistanceTravelled = 0;
			MissileMania.playerData.achievementsUnlocked = new Array();
			MissileMania.playerData.maxCoinsCollected = 0;
			MissileMania.playerData.firstPlaythrough = true;
			MissileMania.playerData.unlockedParts = {"Warhead": [], "Fuselage": [], "Engine":[] };
			this.DefineRocketParts();

			this.buttonClickSound.play();

			//create empty MissileMania.levelData
			MissileMania.levelData = { };
			MissileMania.levelData.deadStructureList = new Array();

			this.game.state.start("Upgrade", true, true);
		};

		function ContinueGame()
		{
			//SaveObject("playerData", MissileMania.playerData);
			MissileMania.playerData = GetObject('playerData');
			MissileMania.playerData.firstPlaythrough = false;
			MissileMania.levelData = GetObject('levelData');
			this.DefineRocketParts();

			this.buttonClickSound.play();

			this.game.state.start("Upgrade", true, true);
		};
	},

	update: function () 
	{
		this.sea.tilePosition.x -= 0.075;
		this.farBackgroundGroup.forEach(MoveFarBackground, this);
		this.closeBackgroundGroup.forEach(MoveCloseBackground, this);

		function MoveFarBackground(islandimage)
		{
			islandimage.x -= 0.5;
			if(islandimage.x + islandimage.width / 2 < this.game.camera.x)
			{
				islandimage.x = this.game.camera.x + this.game.camera.width + islandimage.width / 2 + 5;
			}
		}

		function MoveCloseBackground(islandimage)
		{
			islandimage.x -= 1;
			if(islandimage.x + islandimage.width / 2 < this.game.camera.x)
			{
				islandimage.x = this.game.camera.x + this.game.camera.width + islandimage.width / 2 + 5;
			}
		}
	},

	shutdown: function()
	{
		this.mainPanelGroup.destroy();
		this.backgroundGroup.destroy();
		this.mutePanelGroup.destroy();
		this.instructionPopupGroup.destroy();
		this.gameInstructionGroup.destroy();
		this.upgradeInstructionGroup.destroy();
		this.buttonClickSound = null;

		SaveObject("playerData", MissileMania.playerData);
		SaveObject('levelData', MissileMania.levelData);
		SaveObject('settings', MissileMania.settingsData);


		this.mutePanelGroup = null;
		this.mainPanelGroup = null;		
		this.backgroundGroup = null;
		this.game = null;
	},

	render: function () 
	{
		//this.game.debug.renderText("",
		//					 20, 32, 'rgba(0, 0, 0, 0.7)');
	},

	DefineRocketParts: function()
	{
		//(imageRef, smallIconRef, largeIconRef, acceleration, maxVel, turnRate, mass, damage, explosionRadius, fuel, aerodynamicValue, isUnlocked, price)
		MEOW_Rocket = 
			{
				"Name": "MEOW MISSILE",																								  			//A 	MaxV 	Tr 		Ma  	Health 		Un 	  	Price
				"Warhead": new PartData("MEOW MISSILE", "rocketParts", "MEOW_Missile_Warhead.png", "Warhead-1.png", "Warhead_1.png", 			0,		0, 		0, 		0,		10, 		true, 	0), 
			    "Fuselage": new PartData("MEOW MISSILE", "rocketParts", "MEOW_Missile_Fuselage.png", "Body-1.png", "Body_1.png",	     		0, 		0, 		4, 		0, 		0, 			true, 	0),
			    "Engine": new PartData("MEOW MISSILE", "rocketParts", "MEOW_Missile_Engine.png", "Engine-1.png", "Engine_1.png", 				80, 	1200, 	0, 		5, 		0, 			true, 	0)
			};

		Cataclysm_Rocket = 
			{ 
				"Name": "CAT-A-CLYSM",																						  				  //A 	MaxV  	Tr 		Ma 		Health 		Un 	  	Price
				"Warhead": new PartData("CAT-A-CLYSM", "rocketParts", "Cataclysm_Missile_Warhead.png", "Warhead-2.png", "Warhead_2.png", 	0, 		0, 		0, 		0,		30, 		false, 	200),
				"Fuselage": new PartData("CAT-A-CLYSM", "rocketParts", "Cataclysm_Missile_Fuselage.png", "Body-2.png", "Body_2.png",		0,		0, 		12, 	0, 		0, 			false, 	800),
				"Engine": new PartData("CAT-A-CLYSM", "rocketParts", "Cataclysm_Missile_Engine.png", "Engine-2.png", "Engine_2.png", 		160, 	1400,	0, 		8, 		0, 			false, 	1000)
			};

		KIT10_Rocket = 
			{ 
				"Name": "KIT10",																							 			//A 	MaxV  	Tr 		Ma 		Health 		Un 	  	Price
				"Warhead": new PartData("KIT10", "rocketParts", 'KIT10_Missile_Warhead.png', "Warhead-4.png", "Warhead_4.png", 			0,		0, 		0, 		0, 		80, 		false, 	1700),
				"Fuselage": new PartData("KIT10", "rocketParts", 'KIT10_Missile_Fuselage.png', "Body-4.png", "Body_4.png", 				0,		0, 		20, 	0,  	0,			false, 	2300),
				"Engine": new PartData("KIT10", "rocketParts", 'KIT10_Missile_Engine.png', "Engine-4.png", "Engine_4.png", 				280, 	1700, 	0, 		8,  	0, 			false, 	2800)
			};

		PU55Y_Rocket = 
			{ 
				"Name": "KI77Y",																							 			//A 	MaxV  	Tr 		Ma 		Health 		Un 	  	Price
				"Warhead": new PartData("KI77Y", "rocketParts", 'PU55y_Missile_Warhead.png', "Warhead-3.png", "Warhead_3.png", 			0,		0, 		0, 		0, 		120, 		false, 	4000),
				"Fuselage": new PartData("KI77Y", "rocketParts", 'PU55y_Missile_Fuselage.png', "Body-3.png", "Body_3.png", 				0,		0, 		50, 	0,  	0, 			false, 	4500),
				"Engine": new PartData("KI77Y", "rocketParts", 'PU55y_Missile_Engine.png', "Engine-3.png", "Engine_3.png", 				600, 	2100, 	0, 		20,  	0, 			false, 	5000)
			};

		rocketData = new Array(MEOW_Rocket, Cataclysm_Rocket, KIT10_Rocket, PU55Y_Rocket);

		if(MissileMania.playerData.currentParts["Warhead"] == null)
		{		
			MissileMania.playerData.currentParts["Warhead"] = MEOW_Rocket["Name"];			
		}

		if(MissileMania.playerData.currentParts["Fuselage"] == null) 
		{
			MissileMania.playerData.currentParts["Fuselage"] = MEOW_Rocket["Name"];			
		}

		if(MissileMania.playerData.currentParts["Engine"] == null)
		{
			MissileMania.playerData.currentParts["Engine"] = MEOW_Rocket["Name"];
		}

		//Check parts unlocked
		//warhead
		for(var i = 0; i < MissileMania.playerData.unlockedParts["Warhead"].length; i++)
		{
			for(var j = 0; j < rocketData.length; j++)
			{
				if(MissileMania.playerData.unlockedParts["Warhead"][i] === rocketData[j].Name)
				{
					rocketData[j]["Warhead"].isUnlocked = true;
				}
			}
		}
		//fuselage
		for(var i = 0; i < MissileMania.playerData.unlockedParts["Fuselage"].length; i++)
		{
			for(var j = 0; j < rocketData.length; j++)
			{
				if(MissileMania.playerData.unlockedParts["Fuselage"][i] === rocketData[j].Name)
				{
					rocketData[j]["Fuselage"].isUnlocked = true;
				}
			}
		}
		//engine
		for(var i = 0; i < MissileMania.playerData.unlockedParts["Engine"].length; i++)
		{
			for(var j = 0; j < rocketData.length; j++)
			{
				if(MissileMania.playerData.unlockedParts["Engine"][i] === rocketData[j].Name)
				{
					rocketData[j]["Engine"].isUnlocked = true;
				}
			}
		}
	},
};

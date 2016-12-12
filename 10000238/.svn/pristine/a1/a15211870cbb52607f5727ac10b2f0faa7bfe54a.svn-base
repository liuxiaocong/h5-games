MissileMania.Game = function (game) 
{
};

var v = cp.v;
var GRABABLE_MASK_BIT = 1<<31;
var NOT_GRABABLE_MASK = ~GRABABLE_MASK_BIT;

MissileMania.Game.prototype = 
{
	gameGroup: null,
	upgradeGroup: null,
	gravity: 1200,
	player: null,
	targetManager: null,
	darkCloudManager: null,
	collectableManager: null,
	missileManager:null,
	waveManager:null,
	seaManager:null,

	lastPlayerX: null,

	farBackground: null,
	closeBackground: null,
	foreground: null,
	parallaxSpeed: 2,
	floorHeight: 0,
	maximumHeight: 500,
	playerHeight: 0,
	floorTile: null,
	skyTile: null,
	floor: null,
	playerPercentageHeight: null,
	scale: 0,

	upgradeWarheadCarousel: null,
	upgradeWarheadLeft: null,
	upgradeWarheadRight: null,
	upgradeFuselageCarousel: null,
	upgradeFuselageLeft: null,
	upgradeFuselageRight: null,
	upgradeEngineCarousel: null,
	upgradeEngineLeft: null,
	upgradeEngineRight: null,

	summaryResetButton: null,
	summaryGroup: null,
	summaryText: null,
	summaryImage: null,
	summaryStatText: null,

	hudGroup: null,
	altText: null,
	altitudeText: null,
	healthBar: null,
	healthBarWidth: null,

	spawnX: 0,
	spawnY: 0,

	currentGameState: 0,
	gameStates: {"Game": 0, "Summary": 1, "Pause": 2},

	cameraOffsetValue: null,
	screenShakeValue: 0,
	screenShakeTime: 0,
	screenShakeFades: false,
	screenShakeStartTime: 0,
	screenShakeStartValue: 0,

	circleExplosionActive: false,
	circleExplosionTime: 0,
	rocketExplosionSFX: null,

	//debug:null,

	//reserved properties by Phaser
	create: function() 
	{
		this.buttonClickSound = this.game.add.audio("ButtonClick");
		this.gameMusic = this.game.add.audio('GameMusic');
		this.gameMusic.play('', 0, 0, true, true);
		this.game.add.tween(this.gameMusic).to({volume: 0.35}, 2500, Phaser.Easing.Quadratic.Out, true, 0, false, false);

		this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

		if(!MissileMania.isHD) this.gravity *= 0.5;
		

		this.game.time.reset();

		this.currentGameState = 0;
		this.lock = false;

		this.spawnX = GetXPos(1380, this.game);
		this.spawnY = this.floorHeight + GetYPos(850, this.game);

		this.device = this.game.device;
		this.lastPlayerX = 0;
		this.cloudArray = new Array(8);

		this.SetupPhysicsSpace();
		this.SetupWorld();
		this.SetupGroups();
		this.SetupBackgrounds();
		this.SetupRocket(new Array(
				new GamePart(0, 0, this.game, GetPart(MissileMania.playerData.currentParts["Warhead"], "Warhead")),
				new GamePart(0, 0, this.game, GetPart(MissileMania.playerData.currentParts["Fuselage"], "Fuselage")),
				new GamePart(0, 0, this.game, GetPart(MissileMania.playerData.currentParts["Engine"], "Engine"))		
					 ));
		this.SetupCamera();
		this.SetupSummaryScreen();
		this.SetupPauseMenu();
		this.SetupHUD();
		
		this.addFloor();
		this.SetupClouds();
		this.targetManager = new TargetManager(this);
		this.darkCloudManager = new DarkCloudManager(this);
		this.seaManager = new SeaManager(this);
		this.collectableManager = new CollectableManager(this);
		this.SetupIslands();
		this.missileManager = new MissileManager(this);
		this.waveManager = new WaveManager(this);
		//this.missileManager.SetupIndicators();
		this.achievementManager = new AchievementManager(this);

		this.previousHeight = this.player.GetHeight();

		this.furthestDistanceTravelled = 0;
		this.lastDistance = 0;
		this.screenShakeTime = 0;

		this.cameraOffsetValue = new Phaser.Point(0,0);

		this.circleExplosionActive = false;
		this.circleExplosionTime = 0;

		this.rocketExplosionSFX = this.game.add.audio('LargeExplosion');

		this.lastAchievementDistanceChecked = 0;

		this.CreateMutePanel();

		if(MissileMania.brandingSplash.image)
		{
			var moreGamesButton = this.game.add.button(GetXPos(40, this.game), 0, 'a10_splash', MissileMania.brandingSplash.action, this, 'a10_splash', 'a10_splash', 'a10_splash');
			this.hudGroup.add(moreGamesButton);
		}
	},

	SetupGroups: function()
	{
		this.gameRootGroup = this.game.add.group();

		this.layerOneGroup = this.game.add.group();
		this.layerTwoGroup = this.game.add.group();
		this.layerThreeGroup = this.game.add.group();
		this.layerFourGroup = this.game.add.group();
		this.layerFiveGroup = this.game.add.group();

		this.gameRootGroup.add(this.layerOneGroup);
		this.gameRootGroup.add(this.layerTwoGroup);
		this.gameRootGroup.add(this.layerThreeGroup);
		this.gameRootGroup.add(this.layerFourGroup);
		this.gameRootGroup.add(this.layerFiveGroup);
	},

	SetupPauseMenu: function()
	{
		this.pauseMenuGroup = this.game.add.group('', 'pauseMenuGroup', true);

		/*var blackFade = this.game.add.image(this.game.camera.width / 2, this.game.camera.height / 2, 'sky_top_colour');
		blackFade.anchor.setTo(0.5, 0.5);
		blackFade.scale.setTo(5000, 5000);
		this.pauseGradientTween = this.game.add.tween(blackFade).to({alpha: 0.9}, 250, Phaser.Easing.Quadratic.Out, false, 100, 0, false);
		this.pauseMenuGroup.add(blackFade);*/

		var popupBackground = this.game.add.image(this.game.camera.width / 2 + GetXPos(50, this.game), this.game.camera.height / 2, 'gameAtlas', 'pause_background.png');
		popupBackground.anchor.setTo(0.5, 0.5);
		popupBackground.scale.setTo(1, 1);
		this.pauseMenuGroup.add(popupBackground);

		var resumeButton = this.game.add.button(this.game.camera.width / 2 + GetXPos(53, this.game), this.game.camera.height / 2 - GetYPos(70, this.game), 'menuAtlas', resumeButton, this,  'button_continue_game_up.png', 'button_continue_game_up.png', 'button_continue_game_down.png');
		resumeButton.anchor.setTo(0.5, 0.5);
		this.pauseMenuGroup.add(resumeButton);

		var exitButton = this.game.add.button(this.game.camera.width / 2 + GetXPos(53, this.game), this.game.camera.height / 2 + GetYPos(27, this.game), 'gameAtlas', exitButton, this, 'UI_Button_Exit.png', 'UI_Button_Exit.png', 'UI_Button_Exit_Down.png');
		exitButton.anchor.setTo(0.5, 0.5);
		this.pauseMenuGroup.add(exitButton);

		var moreGamesButton = this.game.add.button(this.game.camera.width / 2 + GetXPos(53, this.game), this.game.camera.height / 2 + GetYPos(130, this.game), 'menuAtlas', MissileMania.moreGamesLink.action, this, 'button_more_game_up.png', 'button_more_game_up.png', 'button_more_game_down.png');
		moreGamesButton.anchor.setTo(0.5, 0.0);
		this.pauseMenuGroup.add(moreGamesButton);

		this.pauseMenuGroup.visible = false;
		this.pauseMenuGroup.y = this.game.camera.height / 2 + popupBackground.height;

		this.pauseEnterTween = this.game.add.tween(this.pauseMenuGroup).to({y: 0},  500, Phaser.Easing.Quadratic.Out, false, 0, 0, false);
		this.pauseExitTween = this.game.add.tween(this.pauseMenuGroup).to({y: this.game.camera.height / 2 + popupBackground.height},  500, Phaser.Easing.Quadratic.Out, false, 0, 0, false);

		

		function resumeButton()
		{
			this.phaseMuteOut.start();
			this.buttonClickSound.play();
			//this.pauseMenuGroup.visible = false;
			this.pauseExitTween.start();
			this.pauseButton.activate();
			this.thrustButton.activate();
			this.leftButton.activate();
			this.rightButton.activate();
			this.currentGameState = this.gameStates["Game"];
		};

		function exitButton()
		{
			this.buttonClickSound.play();
			this.phaseMuteOut.start();
			this.game.state.start("MainMenu", true, true);
		};
	},

	CreateMutePanel: function()
	{
		this.mutePanelGroup = this.game.add.group('', 'mutePanelGroup', true);

		var mutePanel = this.game.add.image(0, 0, 'menuAtlas', 'button_audio_background.png');
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

		this.phaseMuteIn = this.game.add.tween(this.mutePanelGroup).to({x: this.game.camera.width - mutePanel.width - GetXPos(10, this.game)}, 500, Phaser.Easing.Quadratic.Out, false, 0, 0, false);
		this.phaseMuteOut = this.game.add.tween(this.mutePanelGroup).to({x: this.game.camera.width + mutePanel.width}, 500, Phaser.Easing.Quadratic.Out, false, 0, 0, false);

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

	//My properties
	addFloor: function() 
	{
		var pos = v(0, GetXPos(this.floorHeight, this.game));
		var size = v(this.world.width * 200, GetYPos(10, this.game));

		this.floor = this.game.space.addShape(new cp.SegmentShape(this.game.space.staticBody, v(pos.x, pos.y), v(size.x, size.y), 0));
		this.floor.setElasticity(0.2);
		this.floor.setSensor(true);
		this.floor.setFriction(1);
		this.floor.setLayers(NOT_GRABABLE_MASK);
	},

	addWall: function()
	{
		var pos = v(GetXPos(10, this.game), 0);
		var size = v(0, this.world.height);

		var floor = this.game.space.addShape(new cp.SegmentShape(this.game.space.staticBody, v(pos.x, pos.y), v(size.x, size.y), 0));
		floor.setElasticity(1);
		floor.setFriction(1);
		floor.setLayers(NOT_GRABABLE_MASK);
	},

	SetupIslands: function()
	{
		var currentIslandX = GetXPos(1200, this.game);

		for(var i = 0; i < 25; i++)
		{
			var farIslandString = Math.floor(Math.random() * 2) == 0 ? 'Island_Distant_01.png': 'Island_Distant_02.png';

			var island = this.game.add.image(currentIslandX, this.game.world.height + GetYPos(6, this.game), 'gameAtlas', farIslandString);
			island.anchor.setTo(0.5, 1);
			island.autoCull = true;
			island.body = null;
			this.layerOneGroup.add(island);

			currentIslandX += GetXPos((Math.random() * 10000), this.game) + GetXPos(4000, this.game);
		}

		currentIslandX = GetXPos(2600, this.game);

		for(var i = 0; i < 25; i++)
		{
			island = this.game.add.image(currentIslandX, this.game.world.height - GetYPos(20, this.game), 'gameAtlas', 'Island_Midground_01.png');
			island.anchor.setTo(0.5, 1);
			island.autoCull = true;
			island.body = null;
			this.layerOneGroup.add(island);

			currentIslandX += GetXPos((Math.random() * 10000), this.game) + GetXPos(4000, this.game);
		}
	},

	SetupBackgrounds: function()
	{
		this.skyTile = this.game.add.image(0, 0, 'sky');
		this.skyTile.scale.setTo(500, 470);
		this.skyTile.anchor.y = 1;
		this.skyTile.y = this.game.world.height - GetYPos(536, this.game);
		this.layerOneGroup.add(this.skyTile);

		this.skyFadeTile = this.game.add.image(GetXPos(-1000, this.game), this.game.world.height - GetYPos(130, this.game), 'sky_fog');
		this.skyFadeTile.scale.setTo(100000, 7);
		this.skyFadeTile.z = -1;
		this.skyFadeTile.y -= this.skyFadeTile.height;
		this.layerOneGroup.add(this.skyFadeTile);

		this.skyTopGradient = this.game.add.image(0, 0, 'sky_top_gradient');
		this.skyTopGradient.scale.setTo(10000, 5);
		this.layerOneGroup.add(this.skyTopGradient);

		//Sky Top
		this.skyTopLine = this.game.add.tileSprite(0, 0, 12, 2, 'sky_top_line');
		this.skyTopLine.tileScale.setTo(1 / 1000, 1);
		this.skyTopLine.scale.setTo(10000, 10);
		this.layerFiveGroup.add(this.skyTopLine);

		if(!MissileMania.isHD)
		{
			var fontSize = "87.5px Arial";

		}else
		{
			var fontSize = "175px Arial";
		}

		this.skyTopText = this.game.add.text(this.camera.x + ((this.camera.width * 0.5) * this.scale), - GetYPos(250, this.game), "MAX ALTITUDE", {font: fontSize, fill: "#ff0000", align: "centre"});
		this.layerFiveGroup.add(this.skyTopText);

		//this.floorTile = this.game.add.tileSprite(-1000, this.game.world.height - 140, 100000000000, 1000, 'gameAtlas', 'Sea.png');
		//this.floorTile.tileScale.setTo(2, 2.2);
		//this.floorTile.scale = new Phaser.Point(1,2.5);
		//this.layerOneGroup.add(this.floorTile);
	},

	SetupRocket: function(partArray)
	{
		this.launchPad = new LaunchPad(this,
									  this.game,
									 GetXPos(1200, this.game),
									 GetYPos(this.floorHeight - 40, this.game)
									  );
		
		this.player = new Rocket(this, 
			this.game,
		    this.game.space,
		    this.spawnX,
		    this.spawnY, 
			partArray);

		this.circleExplosionSprite = this.game.add.image(0, 0, "explosion_circle");
		this.circleExplosionSprite.autoCull = true;
		this.circleExplosionSprite.body = null;
		this.circleExplosionSprite.visible = false;
		this.circleExplosionSprite.exists = false;
		this.circleExplosionSprite.z = -5;
		this.layerFourGroup.add(this.circleExplosionSprite);

		this.circleExplosionPosition = new Phaser.Point(0,0);
	},

	SetupCamera: function()
	{
		this.game.camera.bounds = this.game.world.bounds * 2;
	},

	SetupWorld: function()
	{
		this.game.stage.backgroundColor = '#FFFFFF';
		var worldHeight = 10000;
		if(!MissileMania.isHD) worldHeight *= 0.5;
		this.game.world.setBounds(0, 0, 2000, worldHeight);
	},

	SetupClouds: function()
	{
		for(var i = 0; i < this.cloudArray.length; i++)
		{
			var cloud = new Cloud('cloud.png', this);
			this.cloudArray[i] = cloud;
		}
	},

	SetupHUD: function()
	{
		this.hudGroup = this.game.add.group('', 'hudGroup', true);
		
		//if(!this.game.device.desktop)
		if(true)
		{
			var yOffset = GetYPos(100, this.game);
			var xOffset = GetXPos(4, this.game);
			var scale = 2;

			this.totalDistanceMeterMovement = 0;

			this.verticalControlBarGroup = this.game.add.group(this.hudGroup);
			this.controlBarGroup = this.game.add.group(this.hudGroup);

			//Create distance meter
			this.distanceMeterArray = new Array(3);
			this.distanceMeterTextArray = new Array(3);
			
			this.distanceMeterLeftLimit = (this.game.camera.x + (this.game.camera.width * 0.5)) - (GetXPos(320, this.game) * 2) + GetXPos(50, this.game);
			this.distanceMeterRightLimit = this.distanceMeterLeftLimit + (GetXPos(320, this.game) * 3);

			for(var i = 0; i < this.distanceMeterArray.length; i++) {

				var distanceMeterEntry = this.game.add.image(0, 0, 'gameAtlas', 'UI_Distance_Background.png');

				distanceMeterEntry.x = this.distanceMeterLeftLimit;
				distanceMeterEntry.x += distanceMeterEntry.width * i;
				distanceMeterEntry.y = (this.game.camera.height - GetYPos(70, this.game)) - distanceMeterEntry.height;
				this.distanceMeterArray[i] = distanceMeterEntry;
				this.controlBarGroup.add(distanceMeterEntry);

				distanceMeterEntry.scale.x = 1.01;

				if(!MissileMania.isHD)
				{
					var fontSize = "9px Arial";
				}else
				{
					var fontSize = "18px Arial";
				}

				//Text
				var distanceMeterText = this.game.add.text(0, 0, (-2000 + (1000 * i)).toString(), {font: fontSize, fill: "#ffffff", align: "left"});
				distanceMeterText.x = this.distanceMeterLeftLimit + GetXPos(15, this.game);
				distanceMeterText.x += distanceMeterEntry.width * i;
				distanceMeterText.y = (this.game.camera.height - GetYPos(70, this.game)) - distanceMeterEntry.height;
				this.distanceMeterTextArray[i] = distanceMeterText;
				this.controlBarGroup.add(distanceMeterText);
			}

			this.distanceMeterCentre = this.game.add.image(0, 0, 'gameAtlas', 'UI_Distance_Middle.png');
			this.distanceMeterCentre.x = ((this.game.camera.x + (this.game.camera.width * 0.5)) - this.distanceMeterCentre.width * 0.5) + GetXPos(50, this.game);
			this.distanceMeterCentre.y = (this.game.camera.height - GetYPos(70, this.game)) - this.distanceMeterCentre.height;
			this.controlBarGroup.add(this.distanceMeterCentre);

			/*
			this.distanceMeterTargetIdentifierArray = new Array(8);

			for(var i = 0; i < this.distanceMeterTargetIdentifierArray.length; i++) {
				var distanceMeterTargetEntry = this.game.add.image(0, 0, 'gameAtlas', 'UI_Distance_Circle.png');
				distanceMeterTargetEntry.y = (this.game.camera.height - 70) - 15;
				distanceMeterTargetEntry.x = this.game.camera.width * 0.5; 
				distanceMeterTargetEntry.visible = false;
				distanceMeterTargetEntry.exists = false;
				distanceMeterTargetEntry.anchor.x = 0.5;
				distanceMeterTargetEntry.anchor.y = 0.5;
				this.distanceMeterTargetIdentifierArray[i] = distanceMeterTargetEntry;
				this.controlBarGroup.add(distanceMeterTargetEntry);
			}
			*/

			//Altimeter
			this.dashboardYHeight = GetYPos(218, this.game);
			var currentYHeight = this.camera.height - this.dashboardYHeight;
			while(currentYHeight > GetYPos(-60, this.game)) {
				var altimeterEntry = this.game.add.image(0, 0, 'gameAtlas', 'UI_Altimeter.png');
				altimeterEntry.y = currentYHeight ;
				altimeterEntry.x = 0; 
				this.verticalControlBarGroup.add(altimeterEntry);

				currentYHeight -= altimeterEntry.height;
			}

			this.altimeterMarker = this.game.add.image(0, 0, 'gameAtlas', 'UI_Distance_Middle.png');
			this.altimeterMarker.x = 0;
			this.altimeterMarker.y = this.dashboardYHeight - GetYPos(10, this.game);
			this.altimeterMarker.anchor.y = 0.8;
			this.altimeterMarker.angle = 90;
			this.verticalControlBarGroup.add(this.altimeterMarker);

			//Create dashboard background
			this.dashboardBackground = this.game.add.image(0, 0, 'gameAtlas', 'UI_Bottom_Background.png');
			this.dashboardBackground.x = (this.game.camera.x + (this.game.camera.width * 0.5)) - this.dashboardBackground.width * 0.5
			this.dashboardBackground.y = this.game.camera.height - this.dashboardBackground.height;
			this.controlBarGroup.add(this.dashboardBackground);

			var screenMiddle = (this.game.camera.x + (this.game.camera.width * 0.5));
			var buttonMiddle = screenMiddle - GetXPos(402, this.game);

			this.healthBar = this.game.add.image(0, 0, 'gameAtlas', 'UI_Bar_Fuel.png');
			this.healthBar.x = (screenMiddle - (this.healthBar.width * 0.5)) + GetXPos(55, this.game);
			this.healthBar.y = this.game.camera.height - GetYPos(41, this.game);
			this.healthBarWidth = this.healthBar.width;
			this.controlBarGroup.add(this.healthBar);

			//create buttons
			this.leftButton = this.game.add.button(buttonMiddle - GetXPos(110, this.game), 
												   this.game.camera.height - GetYPos(98, this.game),
												   'gameAtlas');
			this.leftButton.setFrames('UI_Button_Arrow.png', 'UI_Button_Arrow.png', 'UI_Button_Arrow_Down.png');
			this.controlBarGroup.add(this.leftButton);


			this.rightButton = this.game.add.button(buttonMiddle + GetXPos(110, this.game), 
												   this.game.camera.height - GetYPos(98, this.game),
												   'gameAtlas');

			this.rightButton.width = -this.rightButton.width;
			this.rightButton.setFrames('UI_Button_Arrow.png', 'UI_Button_Arrow.png', 'UI_Button_Arrow_Down.png');
			this.controlBarGroup.add(this.rightButton);

			this.thrustButton = this.game.add.button(screenMiddle + GetXPos(842, this.game),
												     this.game.camera.height - GetYPos(98, this.game),
												     'gameAtlas');
			this.thrustButton.x -= this.thrustButton.width / 2;
			this.thrustButton.setFrames('UI_Button_Power.png', 'UI_Button_Power.png', 'UI_Button_Power_Down.png');
			this.controlBarGroup.add(this.thrustButton);

			function ThrustButtonDownAction()
			{
				this.player.thrustButtonDown = true;
			};

			function ThrustButtonUpAction()
			{
				this.player.thrustButtonDown = false;
			};

			//Thrust Signals
			this.thrustDownSignal = new Phaser.Signal();
			this.thrustDownSignal.add(ThrustButtonDownAction, this);
			this.thrustUpSignal = new Phaser.Signal();
			this.thrustUpSignal.add(ThrustButtonUpAction, this);
			this.thrustButton.onInputDown = this.thrustDownSignal;
			this.thrustButton.onInputUp = this.thrustUpSignal;

			function leftButtonDownAction()
			{
				this.player.leftButtonDown = true;
			};

			function leftButtonUpAction()
			{
				this.player.leftButtonDown = false;
			};			

			//Left Signals
			this.leftDownSignal = new Phaser.Signal();
			this.leftDownSignal.add(leftButtonDownAction, this);
			this.leftUpSignal = new Phaser.Signal();
			this.leftUpSignal.add(leftButtonUpAction, this);
			this.leftButton.onInputDown = this.leftDownSignal;
			this.leftButton.onInputUp = this.leftUpSignal;

			function rightButtonDownAction()
			{
				this.player.rightButtonDown = true;
			};

			function rightButtonUpAction()
			{
				this.player.rightButtonDown = false;
			};

			//Right Signals
			this.rightDownSignal = new Phaser.Signal();
			this.rightDownSignal.add(rightButtonDownAction, this);
			this.rightUpSignal = new Phaser.Signal();
			this.rightUpSignal.add(rightButtonUpAction, this);
			this.rightButton.onInputDown = this.rightDownSignal;
			this.rightButton.onInputUp = this.rightUpSignal;

			function PauseGame()
			{
				this.currentGameState = this.gameStates["Pause"];
				this.phaseMuteIn.start();
				this.pauseButton.deactivate();
				this.thrustButton.deactivate();
				this.leftButton.deactivate();
				this.rightButton.deactivate();
				this.pauseEnterTween.start();
				this.buttonClickSound.play();
			}

			this.pauseGroup = this.game.add.group(this.hudGroup);

			var pausePanel = this.game.add.image(/*this.centerX, this.centerY*/0, 0, 'menuAtlas', 'UI_Pause_Background.png');
			this.pauseGroup.add(pausePanel);

			this.pauseButton = this.game.add.button(GetXPos(50, this.game)/*this.centerX + 50*/, /*this.centerY + 30*/GetYPos(30, this.game), 'gameAtlas', PauseGame, this, 'UI_Button_Pause.png', 'UI_Button_Pause.png', 'UI_Button_Pause_Down.png');
			this.pauseGroup.add(this.pauseButton);

			this.pauseGroup.x = this.game.camera.width - pausePanel.width;
			this.pauseGroup.y = 0;

			this.pauseTweenOut = this.game.add.tween(this.pauseGroup).to({x: this.game.camera.width}, 500, Phaser.Easing.Quartic.Out, false, 0, 0, false);
			this.hudVerticalTweenOut = this.game.add.tween(this.controlBarGroup).to({y: this.game.camera.y + this.dashboardBackground.height}, 1000, Phaser.Easing.Quartic.Out, false, 0, 0, false);
			this.hudHorizontalTweenOut = this.game.add.tween(this.verticalControlBarGroup).to({x: GetXPos(-200, this.game)}, 2000, Phaser.Easing.Quartic.Out, false, 0, 0, false);

		}

	},

	SetupPhysicsSpace: function()
	{
		this.game.space = new cp.Space();
		this.game.space.iterations = 60;
		this.game.space.gravity = v(0, -this.gravity);
		this.game.space.collisionSlop = 0.1;
		this.game.space.damping = 0.8;
		this.game.space.angularDamping = 0.6;
	},

	SetupSummaryScreen: function()
	{
		this.summaryGroup = this.game.add.group('', 'summarygroup', true);
		this.summaryGroup.z = 5;
		this.summaryGroup.visible = false;	

		var tweenTime = 1000;

		this.centerX = this.game.camera.x + this.game.camera.width / 2;
		this.centerY = this.game.camera.y + this.game.camera.height / 2;

		var professor = this.game.add.image(GetXPos(-500, this.game), this.centerY + GetYPos(80, this.game), 'gameAtlas', 'summary_professor.png');
		professor.anchor.setTo(0.5, 0.5);
		this.summaryGroup.add(professor);

		//prof tween
		this.professorTween = this.game.add.tween(professor).to({x: this.centerX - GetXPos(285, this.game)}, tweenTime + 500, Phaser.Easing.Quartic.Out, false, 0, false, false);


		//statGroup
		this.statGroup = this.game.add.group(this.summaryGroup);

		this.statGroup.y = GetYPos(650, this.game);

		var container = this.game.add.image(this.centerX + GetXPos(290, this.game), this.centerY + GetYPos(90, this.game), 'gameAtlas', 'summary_background.png');
		container.anchor.setTo(0.5, 0.5);
		this.statGroup.add(container);

		var tickerScale = 0.94;

		this.collectedTicker = new Ticker('numberTicker', this.game, this.centerX + GetXPos(48, this.game), this.centerY - GetYPos(95, this.game), tickerScale, 4, this.statGroup);

		this.targetValueTicker = new Ticker('numberTicker', this.game, this.centerX + GetXPos(48, this.game), this.centerY + GetYPos(16, this.game), tickerScale, 6, this.statGroup);

		this.distanceTravelledTicker = new Ticker('numberTicker', this.game, this.centerX + GetXPos(300, this.game), this.centerY + GetYPos(18, this.game), tickerScale, 6, this.statGroup);

		this.totalCoinsTicker = new Ticker('numberTicker', this.game, this.centerX + GetXPos(48, this.game), this.centerY + GetYPos(147, this.game), tickerScale, 7, this.statGroup);

		var resetButton = this.game.add.button(this.centerX + GetXPos(434, this.game), this.centerY + GetYPos(135, this.game), 'gameAtlas', ResetGame, this, 'UI_Button_Red_Up.png', 'UI_Button_Red_Up.png', 'UI_Button_Red_Down.png');
		this.statGroup.add(resetButton);


		//targets hit
	 	this.targetsDestroyedTicker = new Ticker('numberTicker', this.game, this.centerX + GetXPos(310, this.game), this.centerY - GetYPos(95, this.game), tickerScale, 2, this.statGroup);
		this.totalTargetsTicker = new Ticker('numberTicker', this.game, this.centerX + GetXPos(410,  this.game), this.centerY - GetYPos(95, this.game), tickerScale, 2, this.statGroup);



		this.statTween = this.game.add.tween(this.statGroup).to({y: GetYPos(100, this.game)}, tweenTime, Phaser.Easing.Quadratic.Out, false, 0, false, false);
		function ResetGame()
		{
			this.buttonClickSound.play();

			MissileMania.playerData.totalCoins += this.totalCoins;

			if(this.player.coinsCollected > MissileMania.playerData.maxCoinsCollected) MissileMania.playerData.maxCoinsCollected = this.player.coinsCollected;


			this.game.state.start("Upgrade", true, true);
		}
	},

	update: function () 
	{
		//this.game.debug.currentY = this.world.height - this.camera.y;
		//this.game.debug.currentX = this.camera.x;

		switch(this.currentGameState)
		{
			case 0: //Game
				this.UpdateGame();
				break;
			case 1://Summary
				this.UpdateSummary();
				break;
			case 2://Paused
				this.UpdatePause();
				break;
		}		
	},

	UpdatePause: function()
	{
		this.pauseMenuGroup.visible = true;

	},

	UpdateGame: function()
	{
		this.targetManager.Update();
		this.darkCloudManager.Update();
		
		this.waveManager.Update();
		this.missileManager.Update();
		this.collectableManager.UpdateCollectableStatus();
		this.MoveBackgrounds();
		this.UpdateAltitude();	
		this.UpdateScreenShake();
		this.ZoomWorld();
		this.launchPad.Update();
		this.UpdateCircleExplosion();
		this.UpdateClouds();
		this.seaManager.Update();
		
		this.game.space.step(1/50);

		if(this.furthestDistanceTravelled < this.player.x - this.spawnX) {
			this.furthestDistanceTravelled = this.player.x - this.spawnX;
		}

		//No.
		if(this.player.x > 0) {
			this.game.world.width += this.player.x - this.lastPlayerX;
		}

		this.UpdateHUD();		

		this.player.Update();
		this.lastPlayerX = this.player.x;
		if(this.player.dead) this.currentGameState = this.gameStates["Summary"];
		if(this.pauseKey.justPressed(250)) this.currentGameState = this.gameStates["Paused"];
	},

	UpdateSummary: function()
	{
		this.UpdateCircleExplosion();

		if(!this.lock)
		{
			this.lock = true;
			this.summaryGroup.visible = true;
			this.gameRootGroup.exists = false;

			var offset = -GetYPos(300, this.game);

			this.purrfect = this.game.add.image(this.centerX, -GetYPos(200, this.game), 'gameAtlas', 'summary_success.png');
			this.purrfect.anchor.setTo(0.5, 0.5);
			this.summaryGroup.add(this.purrfect);
			

			var tweenTime = 1500;

			this.game.add.tween(this.purrfect)
			.to({y: this.centerY + offset}, tweenTime, Phaser.Easing.Bounce.Out, true, 0, false, false);

			this.professorTween.start();
			this.statTween.start();
			this.pauseTweenOut.start();
			this.hudVerticalTweenOut.start();
			this.hudHorizontalTweenOut.start();

			var distance = (this.spawnX - this.player.x) * -1;
			if(distance < 0) distance = 0;
			distance /= 10;
			distance = distance.toFixed(0);

			if(parseInt(distance) > MissileMania.playerData.furthestDistanceTravelled)
			{
				this.achievementManager.UnlockAchievement("FurthestTravelled");
				MissileMania.playerData.furthestDistanceTravelled = distance;
			} 

			var distanceMoney = parseInt((this.player.coinsCollected * distance) / 1000);

			this.collectedTicker.DisplayNumber(this.player.coinsCollected * 2);
			this.targetValueTicker.DisplayNumber(distanceMoney);
			this.distanceTravelledTicker.DisplayNumber(distance);
			this.totalCoins = (this.player.coinsCollected * 2) + distanceMoney;
			this.totalCoinsTicker.DisplayNumber(this.totalCoins);


			var secondsSinceStart = (this.game.time.totalElapsedSeconds());

			var minutesLasted = parseInt((secondsSinceStart / 60));

			secondsSinceStart = parseInt((secondsSinceStart % 60));


			this.targetsDestroyedTicker.DisplayNumber(minutesLasted);
			this.totalTargetsTicker.DisplayNumber(secondsSinceStart);
		}
	},

	UpdateAltitude: function()
	{
		//work out percentage up the screen
		var newHeight = this.player.GetHeight();

		if(newHeight != this.previousHeight) {

			var actualHeight = this.previousHeight + ((newHeight - this.previousHeight) * (this.game.time.elapsed / 1000) / 0.1);
			newHeight = actualHeight; 
		}

		this.previousHeight = newHeight - this.floorHeight;

		this.playerHeight = newHeight - this.floorHeight;
		this.playerHeight /= (this.game.world.height - this.floorHeight);

		this.playerPercentageHeight = this.playerHeight;

		if(this.playerPercentageHeight > 1.0) this.player.hit = true;

		//find out how high from maximum height
		this.playerHeight *= this.maximumHeight;
		this.playerHeight = Phaser.Math.clamp(this.playerHeight, 0, 15000);		
	},

	UpdateHUD: function()
	{

		var targetPositionX = (this.camera.x / this.scale) + ((this.camera.width * 0.5) / this.scale);
		//if(targetPositionX < this.camera.width + 200) { targetPositionX = this.camera.width + 200; }

		this.skyTopText.x = targetPositionX - (this.skyTopText.width * 0.5);
		this.skyTopGradient.x = targetPositionX - (this.skyTopGradient.width * 0.5);
		//this.skyTopColour.x = targetPositionX - (this.skyTopColour.width * 0.5);
		this.skyTopLine.x = targetPositionX - (this.skyTopGradient.width * 0.5);
		this.skyTile.x =  targetPositionX - (this.skyTile.width * 0.5);


		var percentOfHealthLeft = this.player.health / this.player.maxHealth;
		this.healthBar.width = this.healthBarWidth * percentOfHealthLeft;

		this.lastAltitiude = this.playerHeight;

		var altimeterHeight = (this.camera.height - this.dashboardYHeight + GetYPos(64, this.game)) * (1.0 - this.playerPercentageHeight);
		if(altimeterHeight < 0) altimeterHeight = 0;
		this.altimeterMarker.y = altimeterHeight;

		//Update distance meter
		var distance = (this.spawnX - this.player.x) * -1;
		distance /= 20;



		//Check distance achievements
		if(distance > 5000 && this.lastAchievementDistanceChecked == 0) {
			this.achievementManager.UnlockAchievement("FiveThousandTravelled");
			this.lastAchievementDistanceChecked = 5000;
		}
		if(distance > 10000 && this.lastAchievementDistanceChecked == 5000) {
			this.achievementManager.UnlockAchievement("TenThousandTravelled");
			this.lastAchievementDistanceChecked = 10000;
		}
		if(distance > 20000 && this.lastAchievementDistanceChecked == 10000) {
			this.achievementManager.UnlockAchievement("TwentyThousandTravelled");
			this.lastAchievementDistanceChecked = 20000;
		}
		if(distance > 40000 && this.lastAchievementDistanceChecked == 40000) {
			this.achievementManager.UnlockAchievement("FortyhousandTravelled");
			this.lastAchievementDistanceChecked = 40000;
		}

		var newX = (distance - this.lastDistance) / 3.12;
		

		if(distance > this.lastDistance + 1 || distance < this.lastDistance - 1 || this.lastDistance == 0) {

			for(var i = 0; i < this.distanceMeterArray.length; i++) 
			{
				var meterEntry = this.distanceMeterArray[i];
				var meterText = this.distanceMeterTextArray[i];
				var meterX = (meterEntry.x - newX);

				//Reset to right
				if(meterX <= this.distanceMeterLeftLimit) {

					meterX += this.distanceMeterRightLimit - this.distanceMeterLeftLimit;

					var index = i - 1;
					if(index < 0) { index = this.distanceMeterTextArray.length - 1; }
					meterText.text = (parseInt(this.distanceMeterTextArray[index].text) + 1000).toString();
				}
				//Reset to left
				else if(meterX > this.distanceMeterRightLimit) {

					meterX += this.distanceMeterLeftLimit - this.distanceMeterRightLimit;
					var index = i + 1;
					if(index >= this.distanceMeterTextArray.length) { index = 0; }
					meterText.text = (parseInt(this.distanceMeterTextArray[index].text) - 1000).toString();
				}
				
				meterEntry.x = meterX;
				meterText.x = meterX + GetXPos(15, this.game);
			}

			/*
			var currentIndicatorIndex = 0;
			//Check for nearby target
			for(var i = 0; i < this.targetManager.targetArray.length; i++) {

				if(this.targetManager.targetArray[i].IsTargetDestroyed()) {
					continue;
				}

				var targetDistance = (this.spawnX - this.targetManager.targetArray[i].posX) * -1;
				targetDistance /= 30;

				if(targetDistance > distance -320 && targetDistance < distance + 320) {

					//Loop through structures
					for(var a = 0; a < this.targetManager.targetArray[i].structureArray.length; a++) {

						var structure = this.targetManager.targetArray[i].structureArray[a];

						if(!structure.destroyed) {

							var structureDistance = (this.spawnX - (structure.x + (structure.GetWidth() * 0.5))) * -1;
							structureDistance /= 30;

							var actualStructureDistance = targetDistance - distance;

							var targetIndicator = this.distanceMeterTargetIdentifierArray[currentIndicatorIndex]; 

							if(!targetIndicator.visible) {
								targetIndicator.visible = true;
								targetIndicator.exists = true;
								targetIndicator.scale.x = 1.0;
								targetIndicator.scale.y = 1.0;
								//var scaleTween= this.game.add.tween(targetIndicator.scale).to({x: 1.5, y: 1.5}, 500, Phaser.Easing.Quadratic.InOut, true, 300).to({x: 0.0, y: 0.0}, 500, Phaser.Easing.Quadratic.InOut, true, 0).loop() ;
							}

							var structureEntryX = (this.distanceMeterCentre.x + actualStructureDistance);

							targetIndicator.x = structureEntryX + (targetIndicator.width) //- ((targetIndicator.width * 0.5) * targetIndicator.scale.x)); 
							var newIndicatorIndex = currentIndicatorIndex + 1;

							if(currentIndicatorIndex >= this.distanceMeterTargetIdentifierArray.length) {

								//console.log("Target indicator array too small to show this target.")
								break;
							}
							else {
								currentIndicatorIndex = newIndicatorIndex;
							}
						}
					}
				}
			}

			//Hide all unused target indicators
			for(var i = currentIndicatorIndex; i < this.distanceMeterTargetIdentifierArray.length; i++){

				this.distanceMeterTargetIdentifierArray[i].visible = false;
				this.distanceMeterTargetIdentifierArray[i].exists = false;
			}
			*/

			this.lastDistance = distance;
		}
	},

	ZoomWorld: function()
	{
		//Zoom
		var farZoom = 0.2;
		var closeZoom = 0.45;
		
		var maxMovementDistance = 3000;

		var percentageHeightToUse = (1.0 / maxMovementDistance) * this.player.totalDistanceTravelled;
		percentageHeightToUse = Phaser.Math.clamp(percentageHeightToUse, 0, 1);

		var quinticEasedPercentageHeightToUse = Phaser.Easing.Quadratic.InOut(percentageHeightToUse);
		var zoomChange = quinticEasedPercentageHeightToUse * (closeZoom - farZoom)
		var targetScale = closeZoom - zoomChange;

		this.scale = targetScale;
		this.game.world.scale.setTo(this.scale, this.scale);

		//Vertical
		var focusY = ((this.game.world.height - this.player.y) * this.scale) - (this.game.camera.height / 2) + (200 * this.scale);
		var maxCameraY = ((this.game.world.height) * this.scale) - (this.game.camera.height - GetYPos(160, this.game));
		if(focusY > maxCameraY) focusY = maxCameraY;

		var minCameraY = this.skyTopLine.y - (500 * this.scale);
		if(focusY < minCameraY)	focusY = minCameraY; 

		//Horizontal
		var horizontalOffset = (200 * this.scale);

		var offsetX = GetXPos(150, this.game);
		var focusX = (this.player.x * this.scale) + offsetX;
		focusX = focusX - (this.game.camera.width / 2);
		if(focusX < GetXPos(-160, this.game)) focusX = GetXPos(-160, this.game);

		if(focusX < (this.furthestDistanceTravelled * this.scale) - GetXPos(3000, this.game)) focusX = (this.furthestDistanceTravelled * this.scale) - GetXPos(3000, this.game);

		focusX += this.cameraOffsetValue.x;

	   this.game.camera.x = focusX;
	   this.game.camera.y = focusY;
	},

	UpdateClouds: function () {

		for(var i = 0; i < this.cloudArray.length; i++)
		{
			this.cloudArray[i].update();
		}
	},

	UpdateScreenShake: function () {

		if(this.screenShakeTime > 0) {

			this.screenShakeTime -= this.game.time.elapsed / 1000;
			
			this.cameraOffsetValue.x = (Math.random() * (this.screenShakeValue * 2)) - this.screenShakeValue;
			this.cameraOffsetValue.y = (Math.random() * (this.screenShakeValue * 2)) - this.screenShakeValue;

			if(this.screenShakeFades) {
				this.screenShakeValue = this.screenShakeStartValue * (this.screenShakeTime / this.screenShakeStartTime);
			}
		}
		else {
			this.cameraOffsetValue.x = 0;
			this.cameraOffsetValue.y = 0;
			this.screenShakeTime = 0;
		}
	},

	ShakeCamera: function (amount, time, doesFade)
	{
		this.screenShakeValue = amount;
		this.screenShakeStartTime = time;
		this.screenShakeStartValue = amount;
		this.screenShakeTime = time;
		this.screenShakeFades = true;
	},


	StartCircleExplosion: function (x, y) 
	{
		if(this.circleExplosionActive) {
			return;
		}

		this.circleExplosionSprite.visible = true;
		this.circleExplosionSprite.exists = true;
		this.circleExplosionPosition.x = x;
		this.circleExplosionPosition.y = y;
		this.circleExplosionSprite.scale = new Phaser.Point(1,1);
		this.circleExplosionSprite.alpha = 1.0;
		this.circleExplosionActive = true;

		this.rocketExplosionSFX.play();
	},

	UpdateCircleExplosion: function () 
	{
		if(!this.circleExplosionActive) {
			return;
		}

		this.circleExplosionTime += this.game.time.elapsed / 1000;
		
		var maxExplosionTime = 0.5;

		var circleExplosionScaleTime = Phaser.Math.clamp(this.circleExplosionTime, 0.0, maxExplosionTime);

		var newScale = new Phaser.Point(this.circleExplosionSprite.scale.x, this.circleExplosionSprite.scale.y) ;

		newScale.x = 1.5 + ((this.circleExplosionTime / maxExplosionTime) * 50);
		newScale.y = 1.5 + ((this.circleExplosionTime / maxExplosionTime) * 50);
		this.circleExplosionSprite.scale = newScale;

		this.circleExplosionSprite.x = this.circleExplosionPosition.x  - (this.circleExplosionSprite.width * 0.5);
		this.circleExplosionSprite.y = (this.game.world.height - this.circleExplosionPosition.y) - (this.circleExplosionSprite.height * 0.5);;

		if(this.circleExplosionTime > maxExplosionTime) {

			var circleExplosionFadeTime = Phaser.Math.clamp(this.circleExplosionTime - maxExplosionTime, 0.0, 1.0);

			var newAlpha = 1.0 - (circleExplosionFadeTime);
			this.circleExplosionSprite.alpha = newAlpha;
		}

	},

	MoveBackgrounds: function()
	{
		//var velocity = (this.player.x - this.lastPlayerX);
		//this.farBackground.x -= velocity / 20;
		//this.closeBackground.x -= velocity / 7;	
	},

	DrawDebug: function (staticBody, verts, colour) 
	{
		var worldPosition = new Phaser.Point(staticBody.p.x, this.game.world.height - staticBody.p.y);

		var pointArray = new Array(verts.length / 2);
		var currentIndex = 0;

		for(i = 0; i < verts.length; i += 2) {

			var x = verts[i];
			var y = verts[i + 1];

			y =  y;

			x = worldPosition.x + x;
			y = (worldPosition.y - y)

			x *= this.scale;
			y *= this.scale;

			x -= this.camera.x;
			y -= this.camera.y;

		
			pointArray[currentIndex] = new Phaser.Point(x,y);
			currentIndex++;
		}


        this.game.debug.start(0, 0, colour);

        this.game.debug.context.beginPath();
        this.game.debug.context.moveTo(pointArray[0].x,  pointArray[0].y);

        for (var i = 1; i < pointArray.length; i++)
        {
            this.game.debug.context.lineTo(pointArray[i].x,  pointArray[i].y);
        }

        this.game.debug.context.closePath();
        this.game.debug.context.strokeStyle = colour;
        this.game.debug.context.stroke();

        this.game.debug.context.fillStyle = 'rgb(255,0,0)';
        this.game.debug.context.fillRect(pointArray[0].x - 2, pointArray[0].y - 2, 5, 5);

        for (var i = 1; i < pointArray.length; i++)
        {
            this.game.debug.context.fillStyle = 'rgb(255,' + (i * 40) + ',0)';
            this.game.debug.context.fillRect(pointArray[i].x - 2,  pointArray[i].y - 2, 5, 5);
        }

        this.game.debug.stop();
	},

	render: function()
	{
		/*this.game.debug.renderText("FPS: " + this.time.fps,
							  this.camera.view.width - 100,
							  32);*/

		
			/*this.missileManager.render();
			this.player.render();
			this.collectableManager.render();
			*/
			//this.launchPad.render();
			//this.player.render();
			//this.collectableManager.render();
			//this.targetManager.render();
		

		this.darkCloudManager.render();
	},

	shutdown: function()
	{
		SaveObject('playerData', MissileMania.playerData);
		SaveObject('levelData', MissileMania.levelData);		
		SaveObject('settings', MissileMania.settingsData);
		
		this.game.add.tween(this.gameMusic).to({volume: 0}, 2500, Phaser.Easing.Quadratic.Out, true, 0, false, false);

		if(this.cloudArray != null) {
			//Destroy and empty cloud array
			while(this.cloudArray.length > 0)
			{
				this.cloudArray[this.cloudArray.length - 1].destroy();
				this.cloudArray.pop();
			};

			this.cloudArray = null;
		}

		this.mutePanelGroup.destroy();

		this.achievementManager.Destroy();
		this.achievementManager = null;

		this.gameMusic.stop();
		this.gameMusic = null;
		this.buttonClickSound = null;

		this.targetManager.destroy();
		this.darkCloudManager.destroy();
		this.missileManager.destroy();
		this.collectableManager.destroy();
		this.launchPad.destroy();
		this.player.destroy();
		this.pauseMenuGroup.destroy();

		this.hudGroup.destroy();
		this.summaryGroup.destroy();
		this.gameRootGroup.destroy();

		for(var member in this.game.space) delete this.game.space[member];
		this.game.space = null;

		this.cameraOffsetValue = null;

		this.collectableManager = null;
		this.player = null;
		this.hudGroup = null;
		this.summaryGroup = null;
		this.gameRootGroup = null;
		this.targetManager = null;
		this.darkCloudManager = null;
		this.launchPad = null;
		this.game = null;
	},

};
window.addEventListener("load", init, false);
window.onresize = function() { onResize(); }

//system
var stage;
var background;
var globalWidth = 640;
var globalHeight = 720;
var globalScale = 1;
var diffX = 0;
var diffY = 0;
var manifest;
var preload;
var fpsLabel;

//containers
var preloaderContainer = new createjs.Container();
var backgroundContainer = new createjs.Container();
var guiContainer = new createjs.Container();
var gameContainer = new createjs.Container();
var faderContainer = new createjs.Container();
var faderMainContainer = new createjs.Container();

//ingame stats
var stageCreated = false;
var rotateDeviceBool = false;
var faderAnimAction = false;
var gameOverBool = false;
var currentState = "preload";
var currentLevel;
var globalLevel = 0;
var currentLevelArray;
var allLevelCount = 24;
var lives = 3;
var remainingTime = 5000;
var isPaused = false;

//program sprites
var progressBar;
var progressBarWhite;
var faderBlack;

//bitmaps
var rotateDevice;
var playButton;
var pauseButton;
var restartButton;

var logoBitmap;
var catBitmap;

var timerProgressBitmap;
var timerProgressMask;

var basket;
var basket0;
var basket1;
var smile;

var heart0;
var heart1;
var heart2;

var globalArray;

var itemOffsetX;
var itemOffsetY;

var fullWord;

var currentLevelProgress;

var currentLevelText;

var timerProgress;


var scoreText;
var scoreText_;

var scoreOnLevel = 0;

var globalScore = 0;

var ingameCounterText;
var ingameCounterText_;
var clicks;

var goalText;
var goalBitmap;

var appleArray;
var arrOfApples;

var starShip;

var infoButton;
var moreButton;

var handle;

var handleRotatePrev;
var handleRotateResult;
var handleRotateCount;
var handleRotateFlag;

var lastShowCard0;
var lastShowCard1;

var ran;

var compareDigits0;
var compareDigits1;

var globalApple;

var finishCircle;

var horseStat;
var horse;

var avoider;

var yes0;
var yes1;
var no0;
var no1;

var lightbulb0;
var lightbulb1;
var lightbulb2;
var lightbulb3;
var lightbulb4;
var lightbulb5;

var lightbulbOff0;
var lightbulbOff1;
var lightbulbOff2;
var lightbulbOff3;
var lightbulbOff4;
var lightbulbOff5;

var equipment;
var blade;
var pirate;
var hat;
var catMask;
var shuriken;
var hand;
var bandage;

var equipment_;
var blade_;
var pirate_;
var hat_;
var catMask_;
var shuriken_;
var hand_;
var bandage_;

var artSpriteSheet;

var lang;

var storageBestScore = "score";

var globalBestScore = 0;

var shownTutor = false; //false

function init()
{
	setTimeout(function(){window.scrollTo(0, 0);}, 0);
	setTimeout(main, 0);
}

function main()
{
	lang = en;

    stage = new createjs.Stage(document.getElementById("canvas"));

    if (isLocalStorageAvailable())
    {
        if (window.localStorage.getItem(storageBestScore) == null)
        {
            window.localStorage.setItem(storageBestScore, 0);
        }
        else
        {
            globalBestScore = window.localStorage.getItem(storageBestScore);
        }
    }
	
	onResize();
	
    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(60);
    stage.enableMouseOver(0);
	
    manifest = [
    		"rotate.png",

			"menuBack.png",
			"gameBack.png",

			"avoider0.png",
			"avoider1.png",
			"avoider2.png",

			"glowworm_0.png",
			"glowworm_1.png",
			"glowworm_2.png",

			"art.png"
            ];
	
    progressBarWhite = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, globalWidth, globalHeight+diffY*4));
	progressBarWhite.regX = globalWidth/2;
    progressBarWhite.regY = globalHeight/2;
    progressBarWhite.x = globalWidth/2;
    progressBarWhite.y = globalHeight/2-(diffY*2);
	
    progressBar = new createjs.Shape(new createjs.Graphics().beginFill("#d44b94").drawRect(0, 550, globalWidth, 60));
	
    preloaderContainer.addChild(progressBarWhite);
    preloaderContainer.addChild(progressBar);
	
    stage.addChild(preloaderContainer);
    
    if (preload != null) preload.close();
    preload = new createjs.LoadQueue(false, "assets/");
    preload.on("progress", handleOverallProgress);
    preload.setMaxConnections(1);
    while (manifest.length > 0) preload.loadFile(manifest.shift());
}

function handleOverallProgress()
{
    progressBar.scaleX = preload.progress;
    stage.update();
    if (preload.progress == 1)
    {
		createjs.Ticker.addEventListener("tick", preloaderUpdate);
		createjs.Tween.get(progressBar).to({alpha: 0}, 1000*0, createjs.Ease.cubicInOut).call(function() {
			preloaderContainer.removeChild(progressBar);
			progressBar = null;

			createjs.Ticker.removeEventListener("tick", preloaderUpdate);

			createStage();
			createjs.Tween.get(progressBarWhite).to({alpha:0}, 1000*0, createjs.Ease.cubicInOut).call(function() {
				preloaderContainer.removeChild(progressBarWhite);
				progressBarWhite = null;
				stage.removeChild(preloaderContainer);
				preloaderContainer = null;
			});
		});
    }
}

function preloaderUpdate()
{
	stage.update();
}

function isLocalStorageAvailable()
{
    var checkKey = "check", storage = window.sessionStorage;
    try
    {
        storage.setItem(checkKey, "check");
        storage.removeItem(checkKey);
        return true;
    }
    catch (error)
    {
        return false;
    }
}

function createStage()
{
    if (stageCreated) return;
    stageCreated = true;

    stage.addChild(backgroundContainer);
    stage.addChild(guiContainer);
    stage.addChild(gameContainer);
	stage.addChild(faderContainer);
	stage.addChild(faderMainContainer);
    
    fpsLabel = new createjs.Text("--", "bold 40px arial", "#ffffff");
    fpsLabel.x = 10;
    fpsLabel.y = 10;
    guiContainer.addChild(fpsLabel);
	
    prepareAssets();
    
    showMenu();
	
	//clickPlayButton();
	
    createjs.Ticker.addEventListener("tick", update);
}

function showMenu()
{
	clearStage();
	
    currentState = "menu";

    onResize();

    background = new createjs.Bitmap(preload.getResult("menuBack.png"));

    backgroundContainer.regX = 960/2;
    backgroundContainer.regY = 1136/2;

    var offsetY = 30;

    backgroundContainer.addChild(background);
	
    gameContainer.addChild(logoBitmap);
    gameContainer.addChild(playButton);

    //guiContainer.addChild(infoButton);
    //guiContainer.addChild(moreButton);

    catBitmap = new createjs.Sprite(artSpriteSheet, "cat");
	catBitmap.regX = 180/2;
    catBitmap.regY = 250/2;
    catBitmap.x = 640/2;
    catBitmap.y = 550 + offsetY;

    bandage = new createjs.Sprite(artSpriteSheet, "bandage");
    bandage.regX = 120/2;
    bandage.regX = 135/2;
    bandage.scaleX = 0.5;
    bandage.scaleY = 0.5;
    bandage.x = 310;
    bandage.y = 465 + offsetY;

	blade = new createjs.Sprite(artSpriteSheet, "blade");
	blade.regX = 251/2;
    blade.regX = 107/2;
    blade.x = 270;
	blade.y = 515 + offsetY;

	shuriken = new createjs.Sprite(artSpriteSheet, "shuriken");
    shuriken.regX = 54/2;
    shuriken.regX = 50/2;
    shuriken.scaleX = 0.5;
    shuriken.scaleY = 0.5;
    shuriken.x = 317;
    shuriken.y = 535 + offsetY;

    hand = new createjs.Sprite(artSpriteSheet, "hand");
    hand.regX = 43/2;
    hand.regX = 57/2;
    hand.x = 363;
    hand.y = 562 + offsetY;
    
    gameContainer.addChild(blade);
    gameContainer.addChild(catBitmap);
    gameContainer.addChild(bandage);
	gameContainer.addChild(pirate);
	gameContainer.addChild(shuriken);
	gameContainer.addChild(hand);

	var glowworm0 = new createjs.Sprite(glowwormSpriteSheet, "anim");
	glowworm0.scaleX = 1;
	glowworm0.scaleY = 1;
	glowworm0.x = 190;
	glowworm0.y = 130;
	gameContainer.addChild(glowworm0);

	var glowworm1 = new createjs.Sprite(glowwormSpriteSheet, "anim");
	glowworm1.scaleX = -0.65;
	glowworm1.scaleY = 0.65;
	glowworm1.x = 340 + 140;
	glowworm1.y = 200;
	gameContainer.addChild(glowworm1);

	var glowworm2 = new createjs.Sprite(glowwormSpriteSheet, "anim");
	glowworm2.scaleX = -0.9;
	glowworm2.scaleY = 0.9;
	glowworm2.x = 320 + 180;
	glowworm2.y = 300;
	gameContainer.addChild(glowworm2);

	var glowworm3 = new createjs.Sprite(glowwormSpriteSheet, "anim");
	glowworm3.scaleX = 0.8;
	glowworm3.scaleY = 0.8;
	glowworm3.x = 260;
	glowworm3.y = 360;
	gameContainer.addChild(glowworm3);

	var glowworm4 = new createjs.Sprite(glowwormSpriteSheet, "anim");
	glowworm4.scaleX = 1;
	glowworm4.scaleY = 1;
	glowworm4.x = 120;
	glowworm4.y = 300;
	gameContainer.addChild(glowworm4);

	var glowworm5 = new createjs.Sprite(glowwormSpriteSheet, "anim");
	glowworm5.scaleX = -0.6;
	glowworm5.scaleY = 0.6;
	glowworm5.x = 280;
	glowworm5.y = 230;
	
	gameContainer.addChild(glowworm5);

	glowworm0.gotoAndPlay(Math.floor(Math.random() * 145));
	glowworm1.gotoAndPlay(Math.floor(Math.random() * 145));
	glowworm2.gotoAndPlay(Math.floor(Math.random() * 145));
	glowworm3.gotoAndPlay(Math.floor(Math.random() * 145));
	glowworm4.gotoAndPlay(Math.floor(Math.random() * 145));
	glowworm5.gotoAndPlay(Math.floor(Math.random() * 145));
    
    playButton.addEventListener("click", clickPlayButton);
}

function clickPlayButton()
{
	if (currentState == "menu")
	{
		if (!shownTutor)
		{
			showTutorial();
		}
		else
		{
			resetLevels();
		}
	}
}

function prepareAssets()
{
	rotateDevice = new createjs.Bitmap(preload.getResult("rotate.png"));

	glowwormSpriteSheet = new createjs.SpriteSheet({
		"framerate":30,
		"images":["assets/glowworm_0.png", "assets/glowworm_1.png", "assets/glowworm_2.png"],
		"frames":[
		    [0, 0, 256, 256, 0, 0, 0],
		    [256, 0, 256, 256, 0, 0, 0],
		    [512, 0, 256, 256, 0, 0, 0],
		    [768, 0, 256, 256, 0, 0, 0],
		    [1024, 0, 256, 256, 0, 0, 0],
		    [1280, 0, 256, 256, 0, 0, 0],
		    [1536, 0, 256, 256, 0, 0, 0],
		    [0, 256, 256, 256, 0, 0, 0],
		    [256, 256, 256, 256, 0, 0, 0],
		    [512, 256, 256, 256, 0, 0, 0],
		    [768, 256, 256, 256, 0, 0, 0],
		    [1024, 256, 256, 256, 0, 0, 0],
		    [1280, 256, 256, 256, 0, 0, 0],
		    [1536, 256, 256, 256, 0, 0, 0],
		    [0, 512, 256, 256, 0, 0, 0],
		    [256, 512, 256, 256, 0, 0, 0],
		    [512, 512, 256, 256, 0, 0, 0],
		    [768, 512, 256, 256, 0, 0, 0],
		    [1024, 512, 256, 256, 0, 0, 0],
		    [1280, 512, 256, 256, 0, 0, 0],
		    [1536, 512, 256, 256, 0, 0, 0],
		    [0, 768, 256, 256, 0, 0, 0],
		    [256, 768, 256, 256, 0, 0, 0],
		    [512, 768, 256, 256, 0, 0, 0],
		    [768, 768, 256, 256, 0, 0, 0],
		    [1024, 768, 256, 256, 0, 0, 0],
		    [1280, 768, 256, 256, 0, 0, 0],
		    [1536, 768, 256, 256, 0, 0, 0],
		    [0, 1024, 256, 256, 0, 0, 0],
		    [256, 1024, 256, 256, 0, 0, 0],
		    [512, 1024, 256, 256, 0, 0, 0],
		    [768, 1024, 256, 256, 0, 0, 0],
		    [1024, 1024, 256, 256, 0, 0, 0],
		    [1280, 1024, 256, 256, 0, 0, 0],
		    [1536, 1024, 256, 256, 0, 0, 0],
		    [0, 1280, 256, 256, 0, 0, 0],
		    [256, 1280, 256, 256, 0, 0, 0],
		    [512, 1280, 256, 256, 0, 0, 0],
		    [768, 1280, 256, 256, 0, 0, 0],
		    [1024, 1280, 256, 256, 0, 0, 0],
		    [1280, 1280, 256, 256, 0, 0, 0],
		    [1536, 1280, 256, 256, 0, 0, 0],
		    [0, 1536, 256, 256, 0, 0, 0],
		    [256, 1536, 256, 256, 0, 0, 0],
		    [512, 1536, 256, 256, 0, 0, 0],
		    [768, 1536, 256, 256, 0, 0, 0],
		    [1024, 1536, 256, 256, 0, 0, 0],
		    [1280, 1536, 256, 256, 0, 0, 0],
		    [1536, 1536, 256, 256, 0, 0, 0],
		    [0, 1792, 256, 256, 0, 0, 0],
		    [256, 1792, 256, 256, 0, 0, 0],
		    [512, 1792, 256, 256, 0, 0, 0],
		    [768, 1792, 256, 256, 0, 0, 0],
		    [1024, 1792, 256, 256, 0, 0, 0],
		    [1280, 1792, 256, 256, 0, 0, 0],
		    [1536, 1792, 256, 256, 0, 0, 0],
		    [0, 0, 256, 256, 1, 0, 0],
		    [256, 0, 256, 256, 1, 0, 0],
		    [512, 0, 256, 256, 1, 0, 0],
		    [768, 0, 256, 256, 1, 0, 0],
		    [1024, 0, 256, 256, 1, 0, 0],
		    [1280, 0, 256, 256, 1, 0, 0],
		    [1536, 0, 256, 256, 1, 0, 0],
		    [0, 256, 256, 256, 1, 0, 0],
		    [256, 256, 256, 256, 1, 0, 0],
		    [512, 256, 256, 256, 1, 0, 0],
		    [768, 256, 256, 256, 1, 0, 0],
		    [1024, 256, 256, 256, 1, 0, 0],
		    [1280, 256, 256, 256, 1, 0, 0],
		    [1536, 256, 256, 256, 1, 0, 0],
		    [0, 512, 256, 256, 1, 0, 0],
		    [256, 512, 256, 256, 1, 0, 0],
		    [512, 512, 256, 256, 1, 0, 0],
		    [768, 512, 256, 256, 1, 0, 0],
		    [1024, 512, 256, 256, 1, 0, 0],
		    [1280, 512, 256, 256, 1, 0, 0],
		    [1536, 512, 256, 256, 1, 0, 0],
		    [0, 768, 256, 256, 1, 0, 0],
		    [256, 768, 256, 256, 1, 0, 0],
		    [512, 768, 256, 256, 1, 0, 0],
		    [768, 768, 256, 256, 1, 0, 0],
		    [1024, 768, 256, 256, 1, 0, 0],
		    [1280, 768, 256, 256, 1, 0, 0],
		    [1536, 768, 256, 256, 1, 0, 0],
		    [0, 1024, 256, 256, 1, 0, 0],
		    [256, 1024, 256, 256, 1, 0, 0],
		    [512, 1024, 256, 256, 1, 0, 0],
		    [768, 1024, 256, 256, 1, 0, 0],
		    [1024, 1024, 256, 256, 1, 0, 0],
		    [1280, 1024, 256, 256, 1, 0, 0],
		    [1536, 1024, 256, 256, 1, 0, 0],
		    [0, 1280, 256, 256, 1, 0, 0],
		    [256, 1280, 256, 256, 1, 0, 0],
		    [512, 1280, 256, 256, 1, 0, 0],
		    [768, 1280, 256, 256, 1, 0, 0],
		    [1024, 1280, 256, 256, 1, 0, 0],
		    [1280, 1280, 256, 256, 1, 0, 0],
		    [1536, 1280, 256, 256, 1, 0, 0],
		    [0, 1536, 256, 256, 1, 0, 0],
		    [256, 1536, 256, 256, 1, 0, 0],
		    [512, 1536, 256, 256, 1, 0, 0],
		    [768, 1536, 256, 256, 1, 0, 0],
		    [1024, 1536, 256, 256, 1, 0, 0],
		    [1280, 1536, 256, 256, 1, 0, 0],
		    [1536, 1536, 256, 256, 1, 0, 0],
		    [0, 1792, 256, 256, 1, 0, 0],
		    [256, 1792, 256, 256, 1, 0, 0],
		    [512, 1792, 256, 256, 1, 0, 0],
		    [768, 1792, 256, 256, 1, 0, 0],
		    [1024, 1792, 256, 256, 1, 0, 0],
		    [1280, 1792, 256, 256, 1, 0, 0],
		    [1536, 1792, 256, 256, 1, 0, 0],
		    [0, 0, 256, 256, 2, 0, 0],
		    [256, 0, 256, 256, 2, 0, 0],
		    [512, 0, 256, 256, 2, 0, 0],
		    [768, 0, 256, 256, 2, 0, 0],
		    [1024, 0, 256, 256, 2, 0, 0],
		    [1280, 0, 256, 256, 2, 0, 0],
		    [1536, 0, 256, 256, 2, 0, 0],
		    [0, 256, 256, 256, 2, 0, 0],
		    [256, 256, 256, 256, 2, 0, 0],
		    [512, 256, 256, 256, 2, 0, 0],
		    [768, 256, 256, 256, 2, 0, 0],
		    [1024, 256, 256, 256, 2, 0, 0],
		    [1280, 256, 256, 256, 2, 0, 0],
		    [1536, 256, 256, 256, 2, 0, 0],
		    [0, 512, 256, 256, 2, 0, 0],
		    [256, 512, 256, 256, 2, 0, 0],
		    [512, 512, 256, 256, 2, 0, 0],
		    [768, 512, 256, 256, 2, 0, 0],
		    [1024, 512, 256, 256, 2, 0, 0],
		    [1280, 512, 256, 256, 2, 0, 0],
		    [1536, 512, 256, 256, 2, 0, 0],
		    [0, 768, 256, 256, 2, 0, 0],
		    [256, 768, 256, 256, 2, 0, 0],
		    [512, 768, 256, 256, 2, 0, 0],
		    [768, 768, 256, 256, 2, 0, 0],
		    [1024, 768, 256, 256, 2, 0, 0],
		    [1280, 768, 256, 256, 2, 0, 0],
		    [1536, 768, 256, 256, 2, 0, 0],
		    [0, 1024, 256, 256, 2, 0, 0],
		    [256, 1024, 256, 256, 2, 0, 0],
		    [512, 1024, 256, 256, 2, 0, 0],
		    [768, 1024, 256, 256, 2, 0, 0],
		    [1024, 1024, 256, 256, 2, 0, 0],
		    [1280, 1024, 256, 256, 2, 0, 0],
		    [1536, 1024, 256, 256, 2, 0, 0]
		    ],
		"animations": {
			"anim":[0]
		}});

	artSpriteSheet = new createjs.SpriteSheet(
		{
		"images": ["assets/art.png"],
		"frames": [
		    [1413, 1346, 150, 150], 
		    [304, 1716, 300, 300], 
		    [1565, 1410, 60, 60], 
		    [1470, 1072, 150, 150], 
		    [746, 1176, 300, 300], 
		    [1565, 1348, 60, 60], 
		    [1284, 1809, 150, 150], 
		    [444, 1176, 300, 300], 
		    [1579, 1286, 60, 60], 
		    [859, 1892, 150, 150], 
		    [2, 1716, 300, 300], 
		    [1579, 1224, 60, 60], 
		    [1049, 1580, 250, 125], 
		    [1315, 860, 160, 200], 
		    [1315, 658, 160, 200], 
		    [1049, 1378, 160, 200], 
		    [1048, 1176, 160, 200], 
		    [1213, 1961, 220, 40], 
		    [1066, 426, 240, 60], 
		    [2, 1414, 440, 300], 
		    [1066, 2, 440, 300], 
		    [1011, 1938, 200, 100], 
		    [2, 1112, 440, 300], 
		    [606, 1937, 251, 107], 
		    [1011, 1809, 271, 127], 
		    [559, 2, 505, 490], 
		    [2, 620, 505, 490], 
		    [1508, 2, 140, 195], 
		    [1477, 628, 155, 200], 
		    [1354, 426, 155, 200], 
		    [606, 1685, 200, 250], 
		    [1210, 1229, 250, 115], 
		    [1511, 356, 120, 135], 
		    [1508, 199, 140, 155], 
		    [444, 1478, 381, 205], 
		    [1477, 830, 160, 160], 
		    [1409, 1715, 90, 90], 
		    [1308, 426, 43, 57], 
		    [1113, 676, 200, 360], 
		    [1000, 1707, 330, 100], 
		    [1066, 304, 350, 120], 
		    [1211, 1513, 75, 62], 
		    [1301, 1513, 110, 145], 
		    [1538, 1822, 100, 100], 
		    [811, 676, 300, 400], 
		    [509, 676, 300, 400], 
		    [827, 1478, 220, 220], 
		    [1477, 992, 170, 78], 
		    [1413, 1498, 190, 98], 
		    [1436, 1822, 100, 100], 
		    [1211, 1346, 200, 165], 
		    [1332, 1660, 75, 75], 
		    [1413, 1598, 115, 115], 
		    [1462, 1229, 115, 115], 
		    [1151, 1038, 115, 115], 
		    [1418, 304, 85, 100], 
		    [1530, 1598, 105, 120], 
		    [1201, 488, 151, 168], 
		    [2, 2, 555, 616], 
		    [1501, 1720, 108, 100], 
		    [1511, 493, 128, 120], 
		    [808, 1700, 190, 190], 
		    [1332, 1737, 60, 60], 
		    [559, 494, 640, 180], 
		    [509, 1078, 640, 50], 
		    [444, 1130, 640, 44], 
		    [1268, 1062, 200, 165]
		],
		"animations": {
    
        "appleBlue":[0], 
        "appleBlueBig":[1], 
        "appleBlueMini":[2], 
        "appleGreen":[3], 
        "appleGreenBig":[4], 
        "appleGreenMini":[5], 
        "appleRed":[6], 
        "appleRedBig":[7], 
        "appleRedMini":[8], 
        "appleYellow":[9], 
        "appleYellowBig":[10], 
        "appleYellowMini":[11], 
        "arrow":[12], 
        "balloonBlue":[13], 
        "balloonGreen":[14], 
        "balloonPink":[15], 
        "balloonRed":[16], 
        "bandage":[17], 
        "bandage_":[18], 
        "basket":[19], 
        "basketGreen":[20], 
        "basketMini":[21], 
        "basketRed":[22], 
        "blade":[23], 
        "blade_":[24], 
        "board":[25], 
        "boardDigits":[26], 
        "bomb":[27], 
        "card":[28], 
        "cardBack":[29], 
        "cat":[30], 
        "compare":[31], 
        "equipment":[32], 
        "equipment_":[33], 
        "finery":[34], 
        "finish":[35], 
        "finishCircle":[36], 
        "hand":[37], 
        "handle":[38], 
        "hat":[39], 
        "hat_":[40], 
        "heart":[41], 
        "horse":[42], 
        "info":[43], 
        "lightbulb":[44], 
        "lightbulbOff":[45], 
        "logo":[46], 
        "mask":[47], 
        "mask_":[48], 
        "more":[49], 
        "no":[50], 
        "pause":[51], 
        "pauseHome":[52], 
        "pausePlay":[53], 
        "pauseRestart":[54], 
        "pirate":[55], 
        "pirate_":[56], 
        "play":[57], 
        "score":[58], 
        "shuriken":[59], 
        "shuriken_":[60], 
        "star":[61], 
        "starMini":[62], 
        "task":[63], 
        "timer":[64], 
        "track":[65], 
        "yes":[66]
	}});
	
	logoBitmap = new createjs.Sprite(artSpriteSheet, "logo");
	logoBitmap.regX = 220/2;
    logoBitmap.regY = 220/2;
    logoBitmap.x = 640/2;
    logoBitmap.y = 120;

    playButton = new createjs.Sprite(artSpriteSheet, "play");
    playButton.regX = 151/2;
    playButton.regY = 168/2;
    playButton.x = 640/2;
    playButton.y = 350;

    infoButton = new createjs.Sprite(artSpriteSheet, "info");
    infoButton.regX = 100/2;
    infoButton.regY = 100/2;
    infoButton.x = 70;
    infoButton.y = diffY/ globalScale + 650;;

    moreButton = new createjs.Sprite(artSpriteSheet, "more");
    moreButton.regX = 100/2;
    moreButton.regY = 100/2;
    moreButton.x = 575;
    moreButton.y = diffY/ globalScale + 650;;

    pauseButton = new createjs.Sprite(artSpriteSheet, "pause");
    pauseButton.regX = 75/2;
    pauseButton.regY = 75/2;
    pauseButton.x = 595;
    pauseButton.y = 40;
}

function resetLevels()
{
	currentLevelArray = [];

	for (var j = 1; j <= allLevelCount; j++)
	{
		currentLevelArray.push(j);
	}

	currentLevelArray = shuffleArray(currentLevelArray);

	globalScore = 0;

	globalLevel = 0;

	lives = 3;

	createLevel(currentLevelArray[globalLevel]);
	
	//globalLevel = 1;
	//createLevel(1);
}

function clearStage()
{
    while (backgroundContainer.getNumChildren()) backgroundContainer.removeChildAt(0);
    while (gameContainer.getNumChildren()) gameContainer.removeChildAt(0);
    while (guiContainer.getNumChildren()) guiContainer.removeChildAt(0);
    while (faderContainer.getNumChildren()) faderContainer.removeChildAt(0);
}

function animHeader(num)
{
	if (!gameOverBool)
	{
		gameOverBool = true;

		pauseButton.visible = false;

	    goalBitmap = new createjs.Sprite(artSpriteSheet, "task");
	    goalBitmap.y = -diffY / globalScale - 180;
	    gameContainer.addChild(goalBitmap);

	    var str;
	    var goal;

	    switch (num)
	    {
	    	case 1:
	    		str = lang.pick;
	    	break;

	    	case 2:
	    		goal = "5";
	    		str = lang.clickStar_0 + goal + lang.clickStar_1;
	    	break;

	    	case 3:
	    		str = lang.completePic;
	    	break;

	    	case 4:
	    		goal = "30";
	    		str = lang.clickTimes_0 + goal + lang.clickTimes_1;
	    	break;

	    	case 5:
	    		str = lang.findStar;
	    	break;

	    	case 6:
	    		str = lang.pickAll;
	    	break;

	    	case 7:
	    		var arr = [0, 1, 2, 3];
	    		arr = shuffleArray(arr);

	    		var colorArr = ["red", "green", "blue", "yellow"];

	    		var color0;
	    		var color1;
	    		
	    		if (arr[0] == 0) color0 = lang.pickApples_red;
	    		if (arr[0] == 1) color0 = lang.pickApples_green;
	    		if (arr[0] == 2) color0 = lang.pickApples_blue;
	    		if (arr[0] == 3) color0 = lang.pickApples_yellow;
	    		
	    		if (arr[1] == 0) color1 = lang.pickApples_red;
	    		if (arr[1] == 1) color1 = lang.pickApples_green;
	    		if (arr[1] == 2) color1 = lang.pickApples_blue;
	    		if (arr[1] == 3) color1 = lang.pickApples_yellow;
	    		
	    		globalArray.push(colorArr[arr[0]]);
	    		globalArray.push(colorArr[arr[1]]);

	    		goal = color0 + " & " + color1;

	    		str = lang.pickApples_0 + goal + lang.pickApples_1;
	    	break;

	    	case 8:
	    		goal = "10";

	    		str = lang.turnTimes_0 + goal + lang.turnTimes_1;
	    	break;

	    	case 9:
	    		str = lang.findPair;
	    	break;

	    	case 10:
	    		str = lang.guessSequence;
	    	break;
			
			case 11:
				var r = Math.floor(Math.random() * 2);
	    		
	    		if (r == 0)
	    		{
	    			goal = lang.selectNumber_small;
					globalArray = ["compare0", "compare1"];
	    		}
	    		if (r == 1)
	    		{
	    			goal = lang.selectNumber_big;
	    			globalArray = ["compare1", "compare0"];
	    		}

	    		str = lang.selectNumber_0 + goal + lang.selectNumber_1;
	    	break;
			
			case 12:
	    		str = lang.reachFinish;
	    	break;

	    	case 13:
	    		str = lang.makeWord;
	    	break;

	    	case 14:
	    		str = lang.catchApples;
	    	break;

	    	case 15:
	    		goal = "5";
	    		str = lang.countTo + goal;
	    	break;

	    	case 16:
	    		str = lang.walkDown;
	    	break;

	    	case 17:
	    		str = lang.jumpOver;
	    	break;

	    	case 18:
	    		str = lang.avoidBombs;
	    	break;

	    	case 19:
	    		str = lang.switchLamps;
	    	break;

	    	case 20:
	    		str = lang.dressUp;
	    	break;

	    	case 21:
	    		var arr = [0, 1, 2, 3];
	    		arr = shuffleArray(arr);
	    		
	    		if (arr[0] == 0) goal = lang.popBallons_red;
	    		if (arr[0] == 1) goal = lang.popBallons_green;
	    		if (arr[0] == 2) goal = lang.popBallons_blue;
	    		if (arr[0] == 3) goal = lang.popBallons_yellow;

	    		goal = lang.popBallons_red;

	    		str = lang.popBallons_0 + goal + lang.popBallons_1;
	    	break;

	    	case 22:
	    		if (globalArray[0] == "minToMax") goal = lang.littleBig_0;
	    		if (globalArray[0] == "maxToMin") goal = lang.littleBig_1;

	    		str = goal;
	    	break;

	    	case 23:
	    		str = lang.repeateSequence;
	    	break;

	    	case 24:
	    		str = lang.sortOver;
	    	break;

	    	case 25:
	    		str = lang.saveBallon;
	    	break;
	    }
	    
	    if (num == 0) str = lang.collected + " " + scoreOnLevel;
	    if (num == -1) str = lang.timeIsUp;
	    if (num == -2) str = lang.notPassed;
	    
	    goalText = new createjs.Text(str, "bold 40px arial", "#ffffff");
	    goalText.textAlign = "center";
	    goalText.textBaseline = "middle";
	    goalText.maxWidth = 600;
	    goalText.x = 640/2;
	    goalText.y = -diffY/ globalScale - 90;
	    gameContainer.addChild(goalText);

	    var quick = 1;

	    createjs.Tween.get(goalBitmap).to({y: 300, alpha: 1}, 1000*quick, createjs.Ease.cubicOut);
	    createjs.Tween.get(goalText).to({y: 300 + 90, alpha: 1}, 1000*quick, createjs.Ease.cubicOut).call(function() {

	    	createjs.Tween.get(goalBitmap).to({y: 720 + diffY/ globalScale, alpha: 1}, 1000*quick, createjs.Ease.cubicIn);
	    	createjs.Tween.get(goalText).to({y: 720 + 90 + diffY / globalScale, alpha: 1}, 1000*quick, createjs.Ease.cubicIn).call(function() {

	    		gameContainer.removeChild(goalBitmap);
	    		gameContainer.removeChild(goalText);

	    		pauseButton.visible = true;
	    		
	    		if (lives > 0)
	    		{
		    		if (num > 0)
		    		{
			    		gameOverBool = false;

			    		if (num != 23)
						createjs.Tween.get(timerProgressMask).to({scaleX: 0}, remainingTime).call(function() {
					    	
							
							if (currentLevel == 17 || currentLevel == 18)
							{
					    		winLevelProcess();
					    	}
					    	else
					    	{
					    		gameOverFunc(-1);
					    	}
					    });
						else
						{
							ran[0].visible = true;
							createjs.Tween.get(ran[1]).to({visible: true}, 1000).call(function() {
								ran[0].visible = false;
								createjs.Tween.get(ran[2]).to({visible: true}, 1000).call(function() {
									ran[1].visible = false;
									createjs.Tween.get(ran[3]).to({visible: true}, 1000).call(function() {
										ran[2].visible = false;
										createjs.Tween.get(ran[4]).to({visible: true}, 1000).call(function() {
											ran[3].visible = false;
											createjs.Tween.get(ran[5]).to({visible: true}, 1000).call(function() {
												ran[4].visible = false;
												createjs.Tween.get(ran[4]).to({visible: false}, 1000).call(function() {
													ran[5].visible = false;

													lightbulbOff0.addEventListener("mousedown", clickObject);
											    	lightbulbOff1.addEventListener("mousedown", clickObject);
											    	lightbulbOff2.addEventListener("mousedown", clickObject);
											    	lightbulbOff3.addEventListener("mousedown", clickObject);
											    	lightbulbOff4.addEventListener("mousedown", clickObject);
											    	lightbulbOff5.addEventListener("mousedown", clickObject);

													createjs.Tween.get(timerProgressMask).to({scaleX: 0}, remainingTime).call(function() {
														gameOverFunc(-1);
												    });
												});
											});
										});
									});
								});
							});
						}

					    if (num == 14)
					    {
					    	globalApple.alpha = 1;
					    	createjs.Tween.get(globalApple).to({y: 630}, 1000).call(function() {
					    		gameOverFunc(-2);
					    	});
					    }

					    if (num == 17)
					    {
					    	horseAnim();
					    	bombHorse();
					    }

					    if (num == 18)
					    {
					    	bombAnim();
					    }

					    if (num == 21)
					    {
					    	addBalloon(0);
					    }

					    if (num == 24)
					    {
					    	addApple();
					    }
					}
					
					if (num <= 0)
					{
						globalLevel++;

						if (globalLevel < allLevelCount)
						{
							createLevel(currentLevelArray[globalLevel]);
							//createLevel(globalLevel);
						}
						else
						{
							addScoresBoard();
						}
					}
				}
				else
				{
					addScoresBoard();
				}
	    	});
	    });
	}
}

function showTutorial()
{
	shownTutor = true;
	currentState = "tutorial";
	clearStage();
	
	onResize();
    
    background = new createjs.Bitmap(preload.getResult("gameBack.png"));
    backgroundContainer.addChild(background);
	
	var scoresBoard = new createjs.Sprite(artSpriteSheet, "score");
	scoresBoard.regX = 555/2;
	scoresBoard.regY = 616/2;
	scoresBoard.x = 640/2;
	scoresBoard.y = 800/2;
	gameContainer.addChild(scoresBoard);

	var description = new createjs.Text(lang.tutorial, "bold 35px arial", "#ffffff");
    description.textAlign = "center";
    description.textBaseline = "middle";
    description.x = 640/2;
    description.y = 260;
    gameContainer.addChild(description);

    var playButton = new createjs.Sprite(artSpriteSheet, "pausePlay");
    playButton.regX = 115/2;
    playButton.regY = 115/2;
    playButton.x = 640/2;
    playButton.y = 630;
    gameContainer.addChild(playButton);

    playButton.addEventListener("mousedown", resetLevels);
}

function addScoresBoard()
{
	pauseButton.visible = false;
    updateShareScore(globalScore);
	if (globalScore > globalBestScore)
	{
		globalBestScore = globalScore;
		
		if (isLocalStorageAvailable())
		{
        	window.localStorage.setItem(storageBestScore, globalBestScore);
    	}
    }

	var scoresBoard = new createjs.Sprite(artSpriteSheet, "score");
	scoresBoard.regX = 555/2;
	scoresBoard.regY = 616/2;
	scoresBoard.x = 640/2;
	scoresBoard.y = 800/2;
	gameContainer.addChild(scoresBoard);

	var finery = new createjs.Sprite(artSpriteSheet, "finery");
	finery.regX = 381/2;
	finery.x = 640/2;
	finery.y = 210;
	gameContainer.addChild(finery);

	var finalScoresText = new createjs.Text(lang.total +"\n" + lang.scores, "bold 50px arial", "#F7DF8F");
    finalScoresText.textAlign = "center";
    finalScoresText.textBaseline = "middle";
    finalScoresText.x = 640/2;
    finalScoresText.y = 240;
    gameContainer.addChild(finalScoresText);

	var finalScores = new createjs.Text(globalScore, "bold 100px arial", "#ffffff");
    finalScores.textAlign = "center";
    finalScores.textBaseline = "middle";
    finalScores.x = 640/2;
    finalScores.y = 370;
    gameContainer.addChild(finalScores);



    var bestScoresText = new createjs.Text(lang.best, "bold 40px arial", "#F7DF8F");
    bestScoresText.textAlign = "center";
    bestScoresText.textBaseline = "middle";
    bestScoresText.x = 640/2;
    bestScoresText.y = 480;
    gameContainer.addChild(bestScoresText);

	var bestScores = new createjs.Text(globalBestScore, "bold 50px arial", "#ffffff");
    bestScores.textAlign = "center";
    bestScores.textBaseline = "middle";
    bestScores.x = 640/2;
    bestScores.y = 530;
    gameContainer.addChild(bestScores);

    var restartButton = new createjs.Sprite(artSpriteSheet, "pauseRestart");
    restartButton.regX = 115/2;
    restartButton.regY = 115/2;
    restartButton.x = 640/2;
    restartButton.y = 630;
    gameContainer.addChild(restartButton);

    restartButton.addEventListener("mousedown", resetLevels);
}

function addApple()
{
	if (currentState == "game")
	{
		var r = Math.floor(Math.random() * 2);

		if (r == 0)
		{
			apple = new createjs.Sprite(artSpriteSheet, "appleRed");
			apple.name = "red";
		}
		else
		{
			apple = new createjs.Sprite(artSpriteSheet, "appleGreen");
			apple.name = "green";
		}

		gameContainer.addChild(apple);

		apple.y = 300;

		createjs.Tween.get(apple).to({x: 380}, 1000).call( function(){
			gameOverFunc(-2);
		});

		apple.addEventListener("mousedown", clickObject);
		apple.addEventListener("pressmove", moveObject);
	}
}

function bombHorse()
{
	createjs.Tween.get(globalApple).to({x: 50}, 1000).call(function() {
		createjs.Tween.get(globalApple).to({alpha: 0}, 500).call(function() {
			globalApple.x = 600;
			createjs.Tween.get(globalApple).to({alpha: 1}, 500).call(function() {
				bombHorse();
			});
		});
	});
}

function bombAnim()
{
	globalApple.alpha = 1;
	globalApple.x = basket.x;
	globalApple.y = 100;
	createjs.Tween.get(globalApple).to({y: 630}, 1000).call(function() {
		currentLevelProgress++;
		bombAnim();
	});
}

function createLevel(num)
{
    clearStage();
    
    background = new createjs.Bitmap(preload.getResult("gameBack.png"));
    backgroundContainer.addChild(background);

    timerProgressBitmap = new createjs.Sprite(artSpriteSheet, "timer");
    timerProgressBitmap.y = 720-50;
    guiContainer.addChild(timerProgressBitmap);

    timerProgressMask = new createjs.Shape();
    timerProgressMask.graphics.beginFill("#ffffff");
    timerProgressMask.graphics.drawRect(0, 0, 640, 50);
    timerProgressMask.y = 720-50;

	timerProgressBitmap.mask = timerProgressMask;
    
	var offset = 85-80;

	heart0 = new createjs.Sprite(artSpriteSheet, "heart");
    heart0.x = 470 - 0 * 90 + offset;
    heart0.y = 10;

    heart1 = new createjs.Sprite(artSpriteSheet, "heart");
    heart1.x = 470 - 1 * 90 + offset;
    heart1.y = 10;

    heart2 = new createjs.Sprite(artSpriteSheet, "heart");
    heart2.x = 470 - 2 * 90 + offset;
    heart2.y = 10;

    if (lives > 0) guiContainer.addChild(heart0);
    if (lives > 1) guiContainer.addChild(heart1);
    if (lives > 2) guiContainer.addChild(heart2);
    
    currentLevel = num;

    scoreText_ = new createjs.Text(lang.score + " " + globalScore, "bold 40px arial", "#9A1648");
    scoreText_.textBaseline = "middle";
    scoreText_.x = 20;
    scoreText_.y = 5;
    guiContainer.addChild(scoreText_);
    
    scoreText = new createjs.Text(lang.score + " " + globalScore, "bold 40px arial", "#FFF29A");
    scoreText.textBaseline = "middle";
    scoreText.x = 20;
    guiContainer.addChild(scoreText);

    onResize();

    fullWord = "NINJACAT";

    gameOverBool = false;

    currentLevelProgress = 0;

    timerProgress = 5;

    clicks = 0;

    scoreOnLevel = 500;

    appleArray = [];

    arrOfApples = [];
    
    ran = [];

    globalArray = [];
    
    currentState = "game";
    
    onResize();
    
    if (horse != undefined)
    if (createjs.Tween.hasActiveTweens(horse))
	{
        createjs.Tween.removeTweens(horse);
	}
	
    switch (num)
    {
    	case 1:
    		var offsetX = 30;
    		var offsetY = 30;
    		
	    	basket = new createjs.Sprite(artSpriteSheet, "basket");
	    	basket.x = 100;
	    	basket.y = 70;
	    	gameContainer.addChild(basket);
	    	
	    	for (var j = 0; j < 2; j++)
	    	for (var i = 0; i < 4; i++)
	    	{
		    	var item;

		    	switch (Math.floor(Math.random() * 4))
		    	{
		    		case 0:
		    			item = new createjs.Sprite(artSpriteSheet, "appleRed");
		    			break;
		    		case 1:
		    			item = new createjs.Sprite(artSpriteSheet, "appleGreen");
		    			break;
		    		case 2:
		    			item = new createjs.Sprite(artSpriteSheet, "appleBlue");
		    			break;
		    		case 3:
		    			item = new createjs.Sprite(artSpriteSheet, "appleYellow");
		    			break;
		    	}
		    	
		    	item.regX = 75;
		    	item.regY = 75;
		    	item.x = i*150-offsetX + 50 + 75;
		    	item.y = j*150 -offsetY + 400 + 75;
		    	gameContainer.addChild(item);

		    	appleAnim(item);

		    	item.addEventListener("mousedown", clickObject);
		    	item.addEventListener("pressmove", moveObject);
	    	}
    	break;

    	case 2:
    		addStar();
    	break;

    	case 3:
    		for (var i = 0; i < 4; i++) ran.push(Math.floor(Math.random() * 2));

    		var arr = ["appleRedBig", "appleGreenBig", "appleBlueBig", "appleYellowBig"];
    		arr = shuffleArray(arr);

    		smile0 = new createjs.Sprite(artSpriteSheet, arr[0]);
    		smile0.scaleX = 1.66;
    		smile0.scaleY = 1.66;
		    smile0.regX = 150/2+0;
		    smile0.regY = 150/2+0;
		    smile0.x = 200;
		    smile0.y = 250;
		    gameContainer.addChild(smile0);

		    smileMask0 = new createjs.Shape();
		    smileMask0.graphics.beginFill("#ffffff");
		    smileMask0.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smile0.mask = smileMask0;
		    smileMask0.x = smile0.x;
		    smileMask0.y = smile0.y;
			smile0.rotation = Math.floor(Math.random() * 3) * 90 + 90;

		    smile1 = new createjs.Sprite(artSpriteSheet, arr[1]);
		    smile1.scaleX = 1.66;
    		smile1.scaleY = 1.66;
		    smile1.regX = 150/2+150;
		    smile1.regY = 150/2+0;
		    smile1.x = 200+250;
		    smile1.y = 250;
		    gameContainer.addChild(smile1);

		    smileMask1 = new createjs.Shape();
		    smileMask1.graphics.beginFill("#ffffff");
		    smileMask1.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smile1.mask = smileMask1;
		    smileMask1.x = smile1.x;
		    smileMask1.y = smile1.y;
		    smile1.rotation = Math.floor(Math.random() * 3) * 90 + 90;


		    smile2 = new createjs.Sprite(artSpriteSheet, arr[2]);
		    smile2.scaleX = 1.66;
    		smile2.scaleY = 1.66;
		    smile2.regX = 150/2+0;
		    smile2.regY = 150/2+150;
		    smile2.x = 200+0;
		    smile2.y = 250+250;
		    gameContainer.addChild(smile2);

		    smileMask2 = new createjs.Shape();
		    smileMask2.graphics.beginFill("#ffffff");
		    smileMask2.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smile2.mask = smileMask2;
		    smileMask2.x = smile2.x;
		    smileMask2.y = smile2.y;
		    smile2.rotation = Math.floor(Math.random() * 3) * 90 + 90;


		    smile3 = new createjs.Sprite(artSpriteSheet, arr[3]);
		    smile3.scaleX = 1.66;
    		smile3.scaleY = 1.66;
		    smile3.regX = 150/2+150;
		    smile3.regY = 150/2+150;
		    smile3.x = 200+250;
		    smile3.y = 250+250;
		    gameContainer.addChild(smile3);

		    smileMask3 = new createjs.Shape();
		    smileMask3.graphics.beginFill("#ffffff");
		    smileMask3.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smile3.mask = smileMask3;
		    smileMask3.x = smile3.x;
		    smileMask3.y = smile3.y;
		    smile3.rotation = Math.floor(Math.random() * 3) * 90 + 90;


		    smileMask0_ = new createjs.Shape();
		    smileMask0_.graphics.beginFill("#ffffff");
		    smileMask0_.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smileMask0_.x = smile0.x;
		    smileMask0_.y = smile0.y;
		    smileMask0_.name = "smile0";
		    smileMask0_.alpha = 0.01;
		    gameContainer.addChild(smileMask0_);

		    smileMask1_ = new createjs.Shape();
		    smileMask1_.graphics.beginFill("#ffffff");
		    smileMask1_.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smileMask1_.x = smile1.x;
		    smileMask1_.y = smile1.y;
		    smileMask1_.name = "smile1";
		    smileMask1_.alpha = 0.01;
		    gameContainer.addChild(smileMask1_);

		    smileMask2_ = new createjs.Shape();
		    smileMask2_.graphics.beginFill("#ffffff");
		    smileMask2_.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smileMask2_.x = smile2.x;
		    smileMask2_.y = smile2.y;
		    smileMask2_.name = "smile2";
		    smileMask2_.alpha = 0.01;
		    gameContainer.addChild(smileMask2_);

		    smileMask3_ = new createjs.Shape();
		    smileMask3_.graphics.beginFill("#ffffff");
		    smileMask3_.graphics.drawRect(-250/2, -250/2, 250, 250);
		    smileMask3_.x = smile3.x;
		    smileMask3_.y = smile3.y;
		    smileMask3_.name = "smile3";
		    smileMask3_.alpha = 0.01;
		    gameContainer.addChild(smileMask3_);


		    smileMask0_.addEventListener("click", smileGame);
		    smileMask1_.addEventListener("click", smileGame);
		    smileMask2_.addEventListener("click", smileGame);
		    smileMask3_.addEventListener("click", smileGame);
    	break;

    	case 4:
    		ingameCounterText = new createjs.Text("0", "bold 300px arial", "#FFE07B");
    		ingameCounterText.textAlign = "center";
    		ingameCounterText.textBaseline = "middle";
		    ingameCounterText.x = 320;
		    ingameCounterText.y = 380;
		    
		    ingameCounterText_ = new createjs.Text("0", "bold 300px arial", "#9A1648");
    		ingameCounterText_.textAlign = "center";
    		ingameCounterText_.textBaseline = "middle";
		    ingameCounterText_.x = ingameCounterText.x + 0;
		    ingameCounterText_.y = ingameCounterText.y + 15;

		    guiContainer.addChild(ingameCounterText_);
			guiContainer.addChild(ingameCounterText);

		    stage.addEventListener("stagemousedown", touch_down);
    	break;

    	case 5:
    		var arr = ["appleRed", "appleGreen", "appleBlue", "appleYellow",
			    		"appleRed", "appleGreen", "appleBlue", "appleYellow",
			    		"appleRed", "appleGreen", "appleBlue", "appleYellow"];

	    	for (var i = 0; i < 10; i++)
	    	{
		    	var itemApple = new createjs.Sprite(artSpriteSheet, arr[i]);
		    	itemApple.regX = 75;
		    	itemApple.regY = 75;
		    	itemApple.x = Math.random() * 300 + 175;
		    	itemApple.y = Math.random() * 300 + 175;
		    	itemApple.name = "apple" + i;
		    	gameContainer.addChild(itemApple);

		    	appleAnim(itemApple);

		    	itemApple.addEventListener("mousedown", clickObject);
	    		itemApple.addEventListener("pressmove", moveObject);
	    	}
    	break;

    	case 6:
    		for (var i = 0; i < 12; i++)
	    	{
	    		var item;
	    		var r = Math.floor(Math.random() * 4);
	    		if (r == 0) item = new createjs.Sprite(artSpriteSheet, "appleRedMini");
	    		if (r == 1) item = new createjs.Sprite(artSpriteSheet, "appleBlueMini");
	    		if (r == 2) item = new createjs.Sprite(artSpriteSheet, "appleGreenMini");
	    		if (r == 3) item = new createjs.Sprite(artSpriteSheet, "appleYellowMini");
	    		
	    		item.regX = 60/2;
	    		item.regY = 60/2;
	    		item.scaleX = 0.8;
	    		item.scaleY = 0.8;

		    	var radius = 120;
		    	var angle = (3 / 180) * Math.PI;;

		    	item.x = 150+40 + Math.cos(angle * i * 10) * radius;
    			item.y = 210+20 + Math.sin(angle * i * 10) * radius;

		    	gameContainer.addChild(item);
		    	arrOfApples.push(item);
	    	}

	    	for (var i = 0; i < 12; i++)
	    	{
	    		var item;
	    		var r = Math.floor(Math.random() * 4);
	    		if (r == 0) item = new createjs.Sprite(artSpriteSheet, "appleRedMini");
	    		if (r == 1) item = new createjs.Sprite(artSpriteSheet, "appleBlueMini");
	    		if (r == 2) item = new createjs.Sprite(artSpriteSheet, "appleGreenMini");
	    		if (r == 3) item = new createjs.Sprite(artSpriteSheet, "appleYellowMini");

	    		item.regX = 60/2;
	    		item.regY = 60/2;
	    		item.scaleX = 0.8;
	    		item.scaleY = 0.8;

		    	var radius = 120;
		    	var angle = (3 / 180) * Math.PI;;

		    	item.x = 400+40 + Math.cos(angle * i * 10) * radius;
    			item.y = 460+20 + Math.sin(angle * i * 10) * radius;

		    	gameContainer.addChild(item);
		    	arrOfApples.push(item);
	    	}

	    	starShip = new createjs.Sprite(artSpriteSheet, "starMini");
	    	starShip.regX = 60/2;
	    	starShip.regY = 60/2;
			starShip.x = 500;
			starShip.y = 100;
			gameContainer.addChild(starShip);

			stage.addEventListener("stagemousedown", touch_down);
    	break;

    	case 7:
	    	for (var _i0 = 0; _i0 < 5; _i0++) ran.push(0);
	    	for (var _i1 = 0; _i1 < 5; _i1++) ran.push(1);
	    	for (var _i1 = 0; _i1 < 5; _i1++) ran.push(2);
	    	for (var _i1 = 0; _i1 < 5; _i1++) ran.push(3);

	    	ran = shuffleArray(ran);

	    	var colorArr = ["red", "green", "blue", "yellow"];

	    	var c = 0;

	    	for (var j = 0; j < 5; j++)
	    	{
		    	for (var i = 0; i < 4; i++)
		    	{
		    		var itemApple;

		    		switch (ran[c])
		    		{
		    			case 0: itemApple = new createjs.Sprite(artSpriteSheet, "appleRed");
		    					itemApple.name = "red";
		    					break;
		    			case 1: itemApple = new createjs.Sprite(artSpriteSheet, "appleGreen");
			    				itemApple.name = "green";
			    				break;
			    		case 2: itemApple = new createjs.Sprite(artSpriteSheet, "appleBlue");
			    				itemApple.name = "blue";
			    				break;
			    		case 3: itemApple = new createjs.Sprite(artSpriteSheet, "appleYellow");
			    				itemApple.name = "yellow";
			    				break;
		    		}

			    	itemApple.scaleX = 0.8;
			    	itemApple.scaleY = 0.8;
			    	itemApple.x = j * 120 + 20;
			    	itemApple.y = i * 140 + 100;
			    	gameContainer.addChild(itemApple);

			    	itemApple.addEventListener("mousedown", clickObject);

		    		c++;
		    	}
	    	}
    	break;

    	case 8:
    		var arrow0 = new createjs.Sprite(artSpriteSheet, "arrow");
    		arrow0.regX = 250/2;
    		arrow0.regY = 125/2;
    		arrow0.x = 450;
    		arrow0.y = 200;
    		arrow0.rotation = 45;
    		gameContainer.addChild(arrow0);

    		var arrow1 = new createjs.Sprite(artSpriteSheet, "arrow");
    		arrow1.regX = 120;
    		arrow1.regY = 70;
    		arrow1.x = 200;
    		arrow1.y = 500;
    		arrow1.rotation = 225;
    		gameContainer.addChild(arrow1);

    		handle = new createjs.Sprite(artSpriteSheet, "handle");
    		handle.regX = 100;
    		handle.regY = 260;
    		handle.x = 640/2;
    		handle.y = 350;
    		gameContainer.addChild(handle);

    		handleRotatePrev = 0;
			handleRotateResult = 0;
			handleRotateCount = 0;
			handleRotateFlag = 0;

    		stage.addEventListener("stagemousedown", touch_down);
    	break;

    	case 9:
    		var c = 0;

    		ran = [0, 1, 2, 3];
    		ran = shuffleArray(ran);

    		ran.splice(3, 1);

    		ran.push(ran[0] + 10);
    		ran.push(ran[1] + 10);
    		ran.push(ran[2] + 10);

    		for (var j = 0; j < 3; j++)
	    	{
		    	for (var i = 0; i < 2; i++)
		    	{
		    		var cardBack;
		    		var card;
		    		var apple;

		    		if (ran[c] == 0 || ran[c] == 10)
		    		{
		    			apple = new createjs.Sprite(artSpriteSheet, "appleRed");
		    			apple.name = "apple"+ran[c];
		    		}
			    	
			    	if (ran[c] == 1 || ran[c] == 11)
		    		{
			    		apple = new createjs.Sprite(artSpriteSheet, "appleGreen");
			    		apple.name = "apple"+ran[c];
			    	}

			    	if (ran[c] == 2 || ran[c] == 12)
		    		{
			    		apple = new createjs.Sprite(artSpriteSheet, "appleBlue");
			    		apple.name = "apple"+ran[c];
			    	}

			    	if (ran[c] == 3 || ran[c] == 13)
		    		{
			    		apple = new createjs.Sprite(artSpriteSheet, "appleYellow");
			    		apple.name = "apple"+ran[c];
			    	}

			    	cardBack = new createjs.Sprite(artSpriteSheet, "cardBack");
			    	cardBack.name = ""+ran[c];

			    	card = new createjs.Sprite(artSpriteSheet, "card");
			    	card.name = "card"+ran[c];

			    	var offsetY = 30;

			    	cardBack.scaleX = 1;
			    	cardBack.scaleY = 1;
			    	cardBack.x = j * 200 + 45;
			    	cardBack.y = i * 240 + 130 + offsetY;;

			    	card.scaleX = 1;
			    	card.scaleY = 1;
			    	card.x = j * 200 + 45;
			    	card.y = i * 240 + 130 + offsetY;;

			    	apple.scaleX = 0.6;
			    	apple.scaleY = 0.6;
			    	apple.x = card.x + 32;
			    	apple.y = card.y + 52;
			    	gameContainer.addChild(cardBack);
			    	gameContainer.addChild(card);
			    	gameContainer.addChild(apple);

			    	card.visible = false;
			    	apple.visible = false;

			    	cardBack.addEventListener("mousedown", clickObject);

		    		c++;
		    	}
	    	}
    	break;

    	case 10:
    		ran = [0, 1, 2, 3];
			ran = shuffleArray(ran);

			var colorArr = ["appleRedBig", "appleGreenBig", "appleBlueBig", "appleYellowBig"];
    		
    		var apple0 = new createjs.Sprite(artSpriteSheet, colorArr[ran[0]]);
    		apple0.regX = 150;
    		apple0.regY = 150;
		    apple0.name = ""+ran[0];
		    
			var apple1 = new createjs.Sprite(artSpriteSheet, colorArr[ran[1]]);
			apple1.regX = 150;
    		apple1.regY = 150;
			apple1.name = ""+ran[1];
			
			var apple2 = new createjs.Sprite(artSpriteSheet, colorArr[ran[2]]);
			apple2.regX = 150;
    		apple2.regY = 150;
			apple2.name = ""+ran[2];
			
			var apple3 = new createjs.Sprite(artSpriteSheet, colorArr[ran[3]]);
			apple3.regX = 150;
    		apple3.regY = 150;
			apple3.name = ""+ran[3];

			apple0.x = apple2.x = 20 + 150;
			apple1.x = apple3.x = 320 + 150;
			apple0.y = apple1.y = 70 + 150;
			apple2.y = apple3.y = 370 + 150;

			gameContainer.addChild(apple0);
			gameContainer.addChild(apple1);
			gameContainer.addChild(apple2);
			gameContainer.addChild(apple3);

			apple0.addEventListener("mousedown", clickObject);
			apple1.addEventListener("mousedown", clickObject);
			apple2.addEventListener("mousedown", clickObject);
			apple3.addEventListener("mousedown", clickObject);

    	break;

    	case 11:
    		var compare0 = new createjs.Sprite(artSpriteSheet, "compare");
    		var compare1 = new createjs.Sprite(artSpriteSheet, "compare");

		    if (globalArray[0] == "compare0")
		    {
			    compare0.name = "compare0";
			    compare1.name = "compare1";
			}
			else
			{
				compare0.name = "compare1";
			    compare1.name = "compare0";
			}

		    gameContainer.addChild(compare0);
			gameContainer.addChild(compare1);

			compare0.x = 50;
			compare1.x = 350;
			compare0.y = compare1.y = 400;

			compareText0 = new createjs.Text("", "bold 80px arial", "#FFE07B");
		    compareText0.textAlign = "center";
			compareText0.textBaseline = "middle";
		    compareText0.x = compare0.x + 125;
		    compareText0.y = compare0.y + 60;
		    gameContainer.addChild(compareText0);

		    compareText1 = new createjs.Text("", "bold 80px arial", "#FFE07B");
		    compareText1.textAlign = "center";
			compareText1.textBaseline = "middle";
		    compareText1.x = compare1.x + 125;
		    compareText1.y = compare1.y + 60;
		    gameContainer.addChild(compareText1);

		    no0 = new createjs.Sprite(artSpriteSheet, "no");
		    no0.x = 75;
			no0.y = 200;

			no1 = new createjs.Sprite(artSpriteSheet, "no");
		    no1.x = 375;
			no1.y = 200;

			yes0 = new createjs.Sprite(artSpriteSheet, "yes");
		    yes0.x = 75;
			yes0.y = 200;

			yes1 = new createjs.Sprite(artSpriteSheet, "yes");
		    yes1.x = 375;
			yes1.y = 200;

			gameContainer.addChild(no0);
			gameContainer.addChild(no1);

			gameContainer.addChild(yes0);
			gameContainer.addChild(yes1);

			no0.alpha = 0;
			no1.alpha = 0;

			yes0.alpha = 0;
			yes1.alpha = 0;

		    generateCompareDigits();

		    compare0.addEventListener("mousedown", clickObject);
			compare1.addEventListener("mousedown", clickObject);
    	break;

    	case 12:
    		/*ran = [ 2, 0, 0,
    				0, 0, 0,
    				0, 0, 1];*/

    		var board = new createjs.Sprite(artSpriteSheet, "board");
		    board.x = 67;
		    board.y = 120;

		    var finish = new createjs.Sprite(artSpriteSheet, "finish");
		    finish.x = 87;
		    finish.y = 132;

		    horse = new createjs.Sprite(artSpriteSheet, "horse");
		    horse.regX = 130/2;
    		horse.regY = 220/2;
		    horse.name = "horse";

		 	gameContainer.addChild(board);
		 	gameContainer.addChild(finish);
		 	gameContainer.addChild(horse);

		 	var c = 0;

		 	for (var j = 0; j < 3; j++)
		 	for (var i = 0; i < 3; i++)
	    	{
	    		var shape = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, 140, 140));
	    		shape.x = i * 150 + 98;
			    shape.y = j * 150 + 143;
	    		shape.alpha = 0.01;
				shape.name = c;

			    gameContainer.addChild(shape);

			    shape.addEventListener("mousedown", clickObject);

			    c++;
	    	}

	    	horse.x = shape.x + 20 + 130/2;
	    	horse.y = shape.y + 220/2;

	    	horseAnim();

	    	horseStat = 8;
    	break;

    	case 13:
    		ran = [0, 1, 2, 3, 4, 5, 6, 7];
    		ran = shuffleArray(ran);

    		var c = 0;
    		for (var j = 0; j < 2; j++)
		 	for (var i = 0; i < 4; i++)
		 	{
    			var cardBack = new createjs.Sprite(artSpriteSheet, "cardBack");
    			cardBack.x = i * 150 + 20;
			    cardBack.y = j * 210 + 160;
				cardBack.name = ran[c];

				gameContainer.addChild(cardBack);
				cardBack.addEventListener("mousedown", clickObject);

			    var word = new createjs.Text(fullWord[ran[c]], "bold 180px arial", "#FFE07B");
			    word.textAlign = "center";
			    word.textBaseline = "middle";
			    word.x = cardBack.x + 78;
			    word.y = cardBack.y + 110;
			    word.name = ran[c] + "_";
			    gameContainer.addChild(word);

			    c++;
			}
    	break;

    	case 14:
	    	basket = new createjs.Sprite(artSpriteSheet, "basketMini");
	    	basket.regX = 100;
	    	basket.regY = 50;
	    	basket.x = 220+100;
	    	basket.y = 570+50;
	    	gameContainer.addChild(basket);
	    	
	    	globalApple = new createjs.Sprite(artSpriteSheet, "appleRed");
	    	globalApple.scaleX = globalApple.scaleY = 0.5;
	    	globalApple.regX = 75;
	    	globalApple.regY = 75;
	    	globalApple.x = Math.random() * 450 + 100;
	    	globalApple.y = 100;
	    	globalApple.alpha = 0;

	    	gameContainer.addChild(globalApple);
	    	
	    	stage.addEventListener("stagemousedown", touch_down);
    	break;

    	case 15:
    		ran = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    		ran = shuffleArray(ran);

    		var board = new createjs.Sprite(artSpriteSheet, "boardDigits");
		    board.x = 67;
		    board.y = 120;

		 	gameContainer.addChild(board);
		 	
		 	var c = 0;

		 	for (var j = 0; j < 4; j++)
		 	for (var i = 0; i < 4; i++)
	    	{
	    		var shape = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, 110, 110));
	    		shape.x = i * 115 + 92;
			    shape.y = j * 115 + 138;
	    		shape.alpha = 0.01;
				shape.name = ran[c];

			    gameContainer.addChild(shape);

				var digit_ = new createjs.Text(ran[c], "bold 80px arial", "#9A1648");
			    digit_.textAlign = "center";
			    digit_.textBaseline = "middle";
			    digit_.x = shape.x + 60-2;
			    digit_.y = shape.y + 24+37;
			    digit_.name = ran[c] + "_";
			    gameContainer.addChild(digit_);

			    var digit = new createjs.Text(ran[c], "bold 80px arial", "#FFE07B");
			    digit.textAlign = "center";
			    digit.textBaseline = "middle";
			    digit.x = shape.x + 58;
			    digit.y = shape.y + 20+37;
			    digit.name = ran[c] + "__";
			    gameContainer.addChild(digit);

			    shape.addEventListener("mousedown", clickObject);

			    c++;
	    	}
    	break;

    	case 16:
    		var r = Math.floor(Math.random() * 3);

    		starShip = new createjs.Sprite(artSpriteSheet, "starMini");
    		finishCircle = new createjs.Sprite(artSpriteSheet, "finishCircle");

			if (r == 0)
			{
				avoider = new createjs.Bitmap(preload.getResult("avoider0.png"));
				starShip.x = 575;
				starShip.y = 565;
				finishCircle.x = 218;
				finishCircle.y = 405;
			}
			if (r == 1)
			{
				avoider = new createjs.Bitmap(preload.getResult("avoider1.png"));
				starShip.x = 582;
				starShip.y = 588;
				finishCircle.x = 10;
				finishCircle.y = 110;
			}
			if (r == 2)
			{
				avoider = new createjs.Bitmap(preload.getResult("avoider2.png"));
				starShip.x = 565;
				starShip.y = 610;
				finishCircle.x = 520;
				finishCircle.y = 100;
			}

			starShip.regX = 60/2;
	    	starShip.regY = 60/2;
			
			gameContainer.addChild(avoider);
			gameContainer.addChild(starShip);

			stage.addEventListener("stagemousedown", touch_down);
    	break;

    	case 17:
    		var track = new createjs.Sprite(artSpriteSheet, "track");
		    track.y = 400;
    		gameContainer.addChild(track);

    		horse = new createjs.Sprite(artSpriteSheet, "horse");
    		horse.regX = 130/2;
    		horse.regY = 220/2;
		    horse.scaleX = -1;
		    horse.x = 200;
		    horse.y = 390;
    		gameContainer.addChild(horse);

    		globalApple = new createjs.Sprite(artSpriteSheet, "bomb");
	    	globalApple.scaleX = globalApple.scaleY = 0.5;
	    	globalApple.regX = 75;
	    	globalApple.regY = 75;
	    	globalApple.x = 600;
	    	globalApple.y = 370;

	    	gameContainer.addChild(globalApple);

    		stage.addEventListener("stagemousedown", touch_down);
		break;

		case 18:
	    	basket = new createjs.Sprite(artSpriteSheet, "basketMini");
	    	basket.regX = 100;
	    	basket.regY = 50;
	    	basket.x = 220+100;
	    	basket.y = 570+50;
	    	gameContainer.addChild(basket);
	    	
	    	globalApple = new createjs.Sprite(artSpriteSheet, "bomb");
	    	globalApple.scaleX = globalApple.scaleY = 0.5;
	    	globalApple.regX = 70;
	    	globalApple.regY = 70+50;
	    	globalApple.x = Math.random() * 450 + 100;
	    	globalApple.y = 100;
	    	globalApple.alpha = 0;

	    	gameContainer.addChild(globalApple);
	    	
	    	stage.addEventListener("stagemousedown", touch_down);
    	break;

    	case 19:
	    	lightbulbOff0 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulbOff1 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulbOff2 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulb0 = new createjs.Sprite(artSpriteSheet, "lightbulb");
	    	lightbulb1 = new createjs.Sprite(artSpriteSheet, "lightbulb");
	    	lightbulb2 = new createjs.Sprite(artSpriteSheet, "lightbulb");

	    	lightbulbOff0.scaleX = lightbulbOff0.scaleY = lightbulbOff1.scaleX = lightbulbOff1.scaleY = lightbulbOff2.scaleX = lightbulbOff2.scaleY = 0.7;
	    	lightbulb0.scaleX = lightbulb0.scaleY = lightbulb1.scaleX = lightbulb1.scaleY = lightbulb2.scaleX = lightbulb2.scaleY = 0.7;

	    	lightbulbOff0.y = lightbulbOff1.y = lightbulbOff2.y = lightbulb0.y = lightbulb1.y = lightbulb2.y = 200;

	    	lightbulbOff0.x = lightbulb0.x = 0;
	    	lightbulbOff1.x = lightbulb1.x = 215;
	    	lightbulbOff2.x = lightbulb2.x = 430;

	    	gameContainer.addChild(lightbulbOff0);
	    	gameContainer.addChild(lightbulbOff1);
	    	gameContainer.addChild(lightbulbOff2);
	    	gameContainer.addChild(lightbulb0);
	    	gameContainer.addChild(lightbulb1);
	    	gameContainer.addChild(lightbulb2);

	    	lightbulb0.visible = false;
	    	lightbulb1.visible = false;
	    	lightbulb2.visible = false;

	    	var ran_0 = [lightbulb1, lightbulb2, lightbulb0];
	    	var ran_1 = [lightbulb2, lightbulb0, lightbulb1];

	    	var ran_a = [ran_0, ran_1];

	    	var r = Math.floor(Math.random() * 2);

	    	ran = ran_a[r];
    		
	    	lightbulbOff0.addEventListener("mousedown", clickObject);
	    	lightbulbOff1.addEventListener("mousedown", clickObject);
	    	lightbulbOff2.addEventListener("mousedown", clickObject);
	    	lightbulb0.addEventListener("mousedown", clickObject);
	    	lightbulb1.addEventListener("mousedown", clickObject);
	    	lightbulb2.addEventListener("mousedown", clickObject);
    	break;

    	case 20:
	    	catBitmap = new createjs.Sprite(artSpriteSheet, "cat");
			catBitmap.regX = 180/2;
		    catBitmap.regY = 250/2;
		    catBitmap.x = 640/2;
		    catBitmap.y = 550;

		    bandage = new createjs.Sprite(artSpriteSheet, "bandage");
		    bandage.regX = 120/2;
		    bandage.regX = 135/2;
		    bandage.x = 280;
		    bandage.y = 350;

		    equipment = new createjs.Sprite(artSpriteSheet, "equipment");
		    equipment.regX = 120/2;
		    equipment.regX = 135/2;
		    equipment.x = 130;
		    equipment.y = 500;

			blade = new createjs.Sprite(artSpriteSheet, "blade");
			blade.regX = 251/2;
		    blade.regX = 107/2;
		    blade.x = 100;
		    blade.y = 80;

			pirate = new createjs.Sprite(artSpriteSheet, "pirate");
			pirate.regX = 85/2;
		    pirate.regX = 100/2;
		    pirate.x = 500;
		    pirate.y = 250;

			hat = new createjs.Sprite(artSpriteSheet, "hat");
			hat.regX = 330/2;
		    hat.regX = 100/2;
		    hat.x = 350;
		    hat.y = 100;

			catMask = new createjs.Sprite(artSpriteSheet, "mask");
			catMask.regX = 170/2;
		    catMask.regX = 78/2;
		    catMask.x = 100;
		    catMask.y = 250;

			shuriken = new createjs.Sprite(artSpriteSheet, "shuriken");
		    shuriken.regX = 54/2;
		    shuriken.regX = 50/2;
		    shuriken.x = 500;
		    shuriken.y = 500;

		    hand = new createjs.Sprite(artSpriteSheet, "hand");
		    hand.regX = 43/2;
		    hand.regX = 57/2;
		    hand.x = 363;
		    hand.y = 562;


		    bandage_ = new createjs.Sprite(artSpriteSheet, "bandage_");
		    bandage_.regX = 120/2;
		    bandage_.regX = 135/2;
		    bandage_.x = 280-10;
		    bandage_.y = 350-10;

		    equipment_ = new createjs.Sprite(artSpriteSheet, "equipment_");
		    equipment_.regX = 120/2;
		    equipment_.regX = 135/2;
		    equipment_.x = 130-10;
		    equipment_.y = 500-10;

			blade_ = new createjs.Sprite(artSpriteSheet, "blade_");
			blade_.regX = 251/2;
		    blade_.regX = 107/2;
		    blade_.x = 100-10;
		    blade_.y = 80-10;
		    
			pirate_ = new createjs.Sprite(artSpriteSheet, "pirate_");
			pirate_.regX = 85/2;
		    pirate_.regX = 100/2;
		    pirate_.x = 500-10;
		    pirate_.y = 250-10;
		    
			hat_ = new createjs.Sprite(artSpriteSheet, "hat_");
			hat_.regX = 330/2;
		    hat_.regX = 100/2;
		    hat_.x = 350-10;
		    hat_.y = 100-10;
		    
			catMask_ = new createjs.Sprite(artSpriteSheet, "mask_");
			catMask_.regX = 170/2;
		    catMask_.regX = 78/2;
		    catMask_.x = 100-10;
		    catMask_.y = 250-10;
		    
			shuriken_ = new createjs.Sprite(artSpriteSheet, "shuriken_");
		    shuriken_.regX = 54/2;
		    shuriken_.regX = 50/2;
		    shuriken_.x = 500-10;
		    shuriken_.y = 500-10;

		    hand_ = new createjs.Sprite(artSpriteSheet, "hand");
		    hand_.regX = 43/2;
		    hand_.regX = 57/2;
		    hand_.x = 363-10;
		    hand_.y = 562-10;

		    gameContainer.addChild(blade_);
		    gameContainer.addChild(bandage_);
			gameContainer.addChild(catMask_);
			gameContainer.addChild(pirate_);
			gameContainer.addChild(shuriken_);
			gameContainer.addChild(equipment_);
			gameContainer.addChild(hat_);

		    gameContainer.addChild(blade);
		    gameContainer.addChild(catBitmap);
		    gameContainer.addChild(bandage);
			gameContainer.addChild(catMask);
			gameContainer.addChild(pirate);
			gameContainer.addChild(shuriken);
			gameContainer.addChild(hand);
			gameContainer.addChild(equipment);
			gameContainer.addChild(hat);

			equipment.addEventListener("mousedown", clickObject);
		    equipment.addEventListener("pressmove", moveObject);
		    blade.addEventListener("mousedown", clickObject);
		    blade.addEventListener("pressmove", moveObject);
		    pirate.addEventListener("mousedown", clickObject);
		    pirate.addEventListener("pressmove", moveObject);
		    hat.addEventListener("mousedown", clickObject);
		    hat.addEventListener("pressmove", moveObject);
		    catMask.addEventListener("mousedown", clickObject);
		    catMask.addEventListener("pressmove", moveObject);
		    shuriken.addEventListener("mousedown", clickObject);
		    shuriken.addEventListener("pressmove", moveObject);
		    bandage.addEventListener("mousedown", clickObject);
		    bandage.addEventListener("pressmove", moveObject);
		break;

		case 22:
			for (var j = 0; j < 6; j++)
			{
				var r;
				do
				{
					var r = Math.floor(Math.random() * 90 + 1);
				}
				while (ran.indexOf(r) != -1)
				
				ran.push(r);
			}

			var c = 0;

	    	for (var j = 0; j < 2; j++)
	    	for (var i = 0; i < 3; i++)
	    	{
		    	var item = new createjs.Sprite(artSpriteSheet, "bomb");
		    	item.regX = 75;
		    	item.regY = 75;
		    	item.x = i*150 + 50 + 130;
		    	item.y = j*250 + 230;
		    	item.name = ran[c];
		    	gameContainer.addChild(item);

		    	var digit_ = new createjs.Text(ran[c], "bold 60px arial", "#FFE07B");
			    digit_.textAlign = "center";
			    digit_.textBaseline = "middle";
			    digit_.x = item.x - 5;
			    digit_.y = item.y + 24+34;
			    digit_.name = ran[c] + "_";
			    gameContainer.addChild(digit_);

				item.addEventListener("mousedown", clickObject);

				c++;
	    	}
			
			ran.sort(function(a, b){return a-b});

			var r = Math.floor(Math.random() * 2);

			if (r == 0) globalArray[0] = "minToMax";
			if (r == 1) {
				globalArray[0] = "maxToMin";
				ran.reverse();
			}
		break;

		case 23:
			lightbulbOff0 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulbOff1 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulbOff2 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulbOff3 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulbOff4 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulbOff5 = new createjs.Sprite(artSpriteSheet, "lightbulbOff");
	    	lightbulb0 = new createjs.Sprite(artSpriteSheet, "lightbulb");
	    	lightbulb1 = new createjs.Sprite(artSpriteSheet, "lightbulb");
	    	lightbulb2 = new createjs.Sprite(artSpriteSheet, "lightbulb");
	    	lightbulb3 = new createjs.Sprite(artSpriteSheet, "lightbulb");
	    	lightbulb4 = new createjs.Sprite(artSpriteSheet, "lightbulb");
	    	lightbulb5 = new createjs.Sprite(artSpriteSheet, "lightbulb");

	    	lightbulbOff0.scaleX = lightbulbOff0.scaleY = lightbulbOff1.scaleX = lightbulbOff1.scaleY = lightbulbOff2.scaleX = lightbulbOff2.scaleY = 0.7;
	    	lightbulb0.scaleX = lightbulb0.scaleY = lightbulb1.scaleX = lightbulb1.scaleY = lightbulb2.scaleX = lightbulb2.scaleY = 0.7;

	    	lightbulbOff3.scaleX = lightbulbOff3.scaleY = lightbulbOff4.scaleX = lightbulbOff4.scaleY = lightbulbOff5.scaleX = lightbulbOff5.scaleY = 0.7;
	    	lightbulb3.scaleX = lightbulb3.scaleY = lightbulb4.scaleX = lightbulb4.scaleY = lightbulb5.scaleX = lightbulb5.scaleY = 0.7;

	    	lightbulbOff0.y = lightbulbOff1.y = lightbulbOff2.y = lightbulb0.y = lightbulb1.y = lightbulb2.y = 100;
	    	lightbulbOff3.y = lightbulbOff4.y = lightbulbOff5.y = lightbulb3.y = lightbulb4.y = lightbulb5.y = 400;

	    	lightbulbOff0.x = lightbulb0.x = 0;
	    	lightbulbOff1.x = lightbulb1.x = 215;
	    	lightbulbOff2.x = lightbulb2.x = 430;
	    	lightbulbOff3.x = lightbulb3.x = 0;
	    	lightbulbOff4.x = lightbulb4.x = 215;
	    	lightbulbOff5.x = lightbulb5.x = 430;

	    	gameContainer.addChild(lightbulbOff0);
	    	gameContainer.addChild(lightbulbOff1);
	    	gameContainer.addChild(lightbulbOff2);
	    	gameContainer.addChild(lightbulbOff3);
	    	gameContainer.addChild(lightbulbOff4);
	    	gameContainer.addChild(lightbulbOff5);
	    	gameContainer.addChild(lightbulb0);
	    	gameContainer.addChild(lightbulb1);
	    	gameContainer.addChild(lightbulb2);
	    	gameContainer.addChild(lightbulb3);
	    	gameContainer.addChild(lightbulb4);
	    	gameContainer.addChild(lightbulb5);

	    	lightbulb0.visible = false;
	    	lightbulb1.visible = false;
	    	lightbulb2.visible = false;
	    	lightbulb3.visible = false;
	    	lightbulb4.visible = false;
	    	lightbulb5.visible = false;

	    	lightbulb0.name = 0;
	    	lightbulb1.name = 1;
	    	lightbulb2.name = 2;
	    	lightbulb3.name = 3;
	    	lightbulb4.name = 4;
	    	lightbulb5.name = 5;

	    	ran = [lightbulb0, lightbulb1, lightbulb2, lightbulb3, lightbulb4, lightbulb5];
			ran = shuffleArray(ran);

			lightbulbOff0.name = ran[0].name;
	    	lightbulbOff1.name = ran[1].name;
	    	lightbulbOff2.name = ran[2].name;
	    	lightbulbOff3.name = ran[3].name;
	    	lightbulbOff4.name = ran[4].name;
	    	lightbulbOff5.name = ran[5].name;

	    	lightbulb0.name = lightbulbOff0.name;
	    	lightbulb1.name = lightbulbOff1.name;
	    	lightbulb2.name = lightbulbOff2.name;
	    	lightbulb3.name = lightbulbOff3.name;
	    	lightbulb4.name = lightbulbOff4.name;
	    	lightbulb5.name = lightbulbOff5.name;
		break;

		case 24:
			var basket0 = new createjs.Sprite(artSpriteSheet, "basketRed");
			basket0.regX = 440/2;
			basket0.regY = 300/2;
			basket0.scaleX = 0.7;
			basket0.scaleY = 0.7;
	    	basket0.x = 640/2;
	    	basket0.y = 180;
	    	gameContainer.addChild(basket0);

	    	var basket1 = new createjs.Sprite(artSpriteSheet, "basketGreen");
			basket1.regX = 440/2;
			basket1.regY = 300/2;
			basket1.scaleX = 0.7;
			basket1.scaleY = 0.7;
	    	basket1.x = 640/2;
	    	basket1.y = 570;
	    	gameContainer.addChild(basket1);

	    	globalApple = new createjs.Sprite(artSpriteSheet, "bomb");
	    	globalApple.scaleX = globalApple.scaleY = 0.8;
	    	globalApple.regX = 75;
	    	globalApple.regY = 75;
	    	globalApple.x = 580;
	    	globalApple.y = 340;

	    	gameContainer.addChild(globalApple); 
		break;

		case 25:


		break;
    }
	
    animHeader(num);

    guiContainer.addChild(pauseButton);

    pauseButton.addEventListener("click", pauseGame);

    //guiContainer.addChild(fpsLabel);
	
    currentState = "game";
}

function pauseGame()
{
	isPaused = !isPaused;
	pauseButton.visible = !isPaused;
	createjs.Ticker.setPaused(isPaused);

	if (isPaused)
	{
		faderBlack = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0, 0, globalWidth, globalHeight+diffY*4));
	    faderBlack.regX = globalWidth/2;
	    faderBlack.regY = globalHeight/2;
	    faderBlack.x = globalWidth/2;
	    faderBlack.y = globalHeight/2-(diffY*2);
	    faderBlack.alpha = 0.5;
	    
	    gameContainer.addChild(faderBlack);
	    
		goalBitmap = new createjs.Sprite(artSpriteSheet, "task");
	    goalBitmap.y = 300-100;
	    gameContainer.addChild(goalBitmap);
	    
	    goalText = new createjs.Text(lang.pause, "bold 40px arial", "#ffffff");
	    goalText.textAlign = "center";
	    goalText.textBaseline = "middle";
	    goalText.x = 640/2;
	    goalText.y = 390-100;
	    gameContainer.addChild(goalText);

	    pauseRestartBitmap = new createjs.Sprite(artSpriteSheet, "pauseRestart");
	    pauseRestartBitmap.x = 640/2-115/2 - 150;
	    pauseRestartBitmap.y = 370;
	    gameContainer.addChild(pauseRestartBitmap);

	    pausePlayBitmap = new createjs.Sprite(artSpriteSheet, "pausePlay");
	    pausePlayBitmap.x = 640/2-115/2;
	    pausePlayBitmap.y = 370;
	    gameContainer.addChild(pausePlayBitmap);

	    pauseHomeBitmap = new createjs.Sprite(artSpriteSheet, "pauseHome");
	    pauseHomeBitmap.x = 640/2-115/2 + 150;
	    pauseHomeBitmap.y = 370;
	    gameContainer.addChild(pauseHomeBitmap);

	    pauseRestartBitmap.addEventListener("mousedown", restartGameFromPause);
	    pausePlayBitmap.addEventListener("mousedown", pauseGame);
	    pauseHomeBitmap.addEventListener("mousedown", showMenuFromPause);
	}
	else
	{
		gameContainer.removeChild(faderBlack);
		gameContainer.removeChild(goalBitmap);
		gameContainer.removeChild(goalText);
		gameContainer.removeChild(pauseRestartBitmap);
		gameContainer.removeChild(pausePlayBitmap);
		gameContainer.removeChild(pauseHomeBitmap);

		pauseRestartBitmap.removeEventListener("mousedown", restartGameFromPause);
	    pausePlayBitmap.removeEventListener("mousedown", pauseGame);
	    pauseHomeBitmap.removeEventListener("mousedown", showMenuFromPause);
	}
}

function restartGameFromPause()
{
	createjs.Tween.removeAllTweens();
	pauseGame();
	resetLevels();
}

function showMenuFromPause()
{
	createjs.Tween.removeAllTweens();
	pauseGame();
	showMenu();
}

function generateCompareDigits()
{
	compareDigits0 = Math.floor(Math.random() * 899) + 100;
	compareDigits1 = Math.floor(Math.random() * 899) + 100;

	if (compareDigits0 == compareDigits1) compareDigits0 += 1;

	compareText0.text = compareDigits0;
	compareText1.text = compareDigits1;
}

function shuffleArray(array)
{
    for (var i = array.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function smileGame(e)
{
	if (!gameOverBool)
	{
		var tar;
		var curr;

		if (e.target.name == "smile0")
		{
			tar = smile0;
			curr = 0;
		}
		if (e.target.name == "smile1")
		{
			tar = smile1;
			curr = 1;
		}
		if (e.target.name == "smile2")
		{
			tar = smile2;
			curr = 2;
		}
		if (e.target.name == "smile3")
		{
			tar = smile3;
			curr = 3;
		}
		
		if (!createjs.Tween.hasActiveTweens(tar))
		{
			if (ran[curr] > 0)
			{
				createjs.Tween.get(tar).to({rotation: tar.rotation+90}, 100, createjs.Ease.cubicIn).call( function(){
					tar.rotation %= 360;
					if (smile0.rotation == 0 && smile1.rotation == 0 && smile2.rotation == 0 && smile3.rotation == 0)
					{
						winLevelProcess();
					}
				});
			}
			else
			{
				createjs.Tween.get(tar).to({rotation: tar.rotation-90}, 100, createjs.Ease.cubicIn).call( function(){
					tar.rotation %= 360;
					if (smile0.rotation == 0 && smile1.rotation == 0 && smile2.rotation == 0 && smile3.rotation == 0)
					{
						winLevelProcess();
					}
				});
			}
		}
	}
}

function addBalloon(num)
{
	if (globalApple != undefined)
	if (createjs.Tween.hasActiveTweens(globalApple))
	{
        createjs.Tween.removeTweens(globalApple);
        gameContainer.removeChild(globalApple);
    }

	if (num == 0)
	{
		globalApple = new createjs.Sprite(artSpriteSheet, "balloonRed");
		globalApple.name = "red";
	}
	if (num == 1)
	{
		globalApple = new createjs.Sprite(artSpriteSheet, "balloonBlue");
		globalApple.name = "blue";
	}
	globalApple.regX = 160/2;
	globalApple.regY = 200/2;
	globalApple.x = Math.random() * 460 + 95;
	globalApple.y = Math.random() * 420 + 70 + 95;

	gameContainer.addChild(globalApple);
	globalApple.addEventListener("mousedown", clickObject);

	if (num == 0)
	createjs.Tween.get(globalApple).to({alpha: 0}, 1000, createjs.Ease.cubicIn).call(function() {
		gameOverFunc(-2);
	});
	else
	createjs.Tween.get(globalApple).to({alpha: 0}, 1000, createjs.Ease.cubicIn).call(function() {
		addBalloon(0);
	});
}

function addStar()
{
	var star = new createjs.Sprite(artSpriteSheet, "star");
	star.regX = 95;
	star.regY = 95;
	star.x = Math.random() * 450 + 95;
	star.y = Math.random() * 410 + 70 + 95;
	gameContainer.addChild(star);
	star.addEventListener("mousedown", clickObject);
}

function clickObject(e)
{
	if (!isPaused)
	{
		if (!gameOverBool)
		{
			switch (currentLevel)
			{
				case 1:
					itemOffsetX = e.target.x - e.stageX;
					itemOffsetY = e.target.y - e.stageY;
					gameContainer.addChild(e.target);
				break;

				case 2:
					e.target.removeEventListener("mousedown", clickObject);

					createjs.Tween.get(e.target).to({alpha: 0, scaleX: 0.5, scaleY: 0.5}, 300, createjs.Ease.cubicIn).call( function(){

						currentLevelProgress++;

						gameContainer.removeChild(this);

						if (currentLevelProgress < 5) addStar();
						else winLevelProcess();
					});

				break;

				case 5:

					if (createjs.Tween.hasActiveTweens(e.target))
					{
				        createjs.Tween.removeTweens(e.target);
				    }

					itemOffsetX = e.target.x - e.stageX;
					itemOffsetY = e.target.y - e.stageY;
					gameContainer.addChild(e.target);

					if (appleArray.indexOf(e.target) == -1)
					{
						appleArray.push(e.target);
					}

					if (appleArray.length == 10)
					{
						appleArray.push(e.target);

						star = new createjs.Sprite(artSpriteSheet, "star");
			    		star.scaleX = 0.8;
			    		star.scaleY = 0.8;
			    		star.regX = 90;
			    		star.regY = 90;
				    	star.x = appleArray[appleArray.length-1].x;
				    	star.y = appleArray[appleArray.length-1].y;
				    	gameContainer.addChild(star);
				    	gameContainer.addChild(appleArray[appleArray.length-1]);
						star.addEventListener("click", winLevelProcess);
					}
				break;

				case 7:
					if ((e.target.name == globalArray[0]) || (e.target.name == globalArray[1]))
					{
						gameContainer.removeChild(e.target);
						currentLevelProgress++;
						if (currentLevelProgress == 10) winLevelProcess();
					}
					else
					{
						gameOverFunc(-2);
					}
				break;

				case 9:
					if (!gameContainer.getChildByName("card" + e.target.name).visible)
					{
						if (lastShowCard0 != undefined) 
						if (lastShowCard1 != undefined) 
						{
							gameContainer.getChildByName("card" + lastShowCard0).visible = false;
							gameContainer.getChildByName("apple" + lastShowCard0).visible = false;
							gameContainer.getChildByName("card" + lastShowCard1).visible = false;
							gameContainer.getChildByName("apple" + lastShowCard1).visible = false;

							lastShowCard0 = undefined;
							lastShowCard1 = undefined;
						}

						gameContainer.getChildByName("card" + e.target.name).visible = true;
						gameContainer.getChildByName("apple" + e.target.name).visible = true;

						if (lastShowCard0 == undefined)
						{
							lastShowCard0 = e.target.name;
							break;
						}

						if (lastShowCard1 == undefined)
						{
							lastShowCard1 = e.target.name;

							if ((lastShowCard0 == 1+lastShowCard1) || (lastShowCard1 == 1+lastShowCard0))
							{
								lastShowCard0 = undefined;
								lastShowCard1 = undefined;

								currentLevelProgress++;

								if (currentLevelProgress == 3) winLevelProcess();
							}
						}
					}
				break;

				case 10:
					if (currentLevelProgress == e.target.name)
					{
						currentLevelProgress++;

						createjs.Tween.get(e.target).to({scaleX: 0.5, scaleY: 0.5}, 200, createjs.Ease.cubicIn);

						if (currentLevelProgress == 4) winLevelProcess();
					}
					else
					{
						currentLevelProgress = 0;

						createjs.Tween.get(gameContainer.getChildByName("0")).to({scaleX: 1, scaleY: 1}, 200, createjs.Ease.cubicIn);
						createjs.Tween.get(gameContainer.getChildByName("1")).to({scaleX: 1, scaleY: 1}, 200, createjs.Ease.cubicIn);
						createjs.Tween.get(gameContainer.getChildByName("2")).to({scaleX: 1, scaleY: 1}, 200, createjs.Ease.cubicIn);
						createjs.Tween.get(gameContainer.getChildByName("3")).to({scaleX: 1, scaleY: 1}, 200, createjs.Ease.cubicIn);
					}
				break;

				case 11:
					if (e.target.name == globalArray[0])
					{
						if (compareDigits0 > compareDigits1)
						{
							currentLevelProgress++;

							if (globalArray[0] == "compare1") yes0.alpha = 1;
							if (globalArray[0] == "compare0") yes1.alpha = 1;

							if (currentLevelProgress < 5)
							{
								generateCompareDigits();
							}
							else
							{
								winLevelProcess();
								break;
							}

							createjs.Tween.get(yes0).to({alpha: 0}, 500, createjs.Ease.cubicIn);
							createjs.Tween.get(yes1).to({alpha: 0}, 500, createjs.Ease.cubicIn);
						}
						else
						{
							if (globalArray[0] == "compare1") no0.alpha = 1;
							if (globalArray[0] == "compare0") no1.alpha = 1;

							gameOverFunc(-2);
						}
					}

					if (e.target.name == globalArray[1])
					{
						if (compareDigits1 > compareDigits0)
						{
							currentLevelProgress++;

							if (globalArray[0] == "compare0") yes0.alpha = 1;
							if (globalArray[0] == "compare1") yes1.alpha = 1;

							if (currentLevelProgress < 5)
							{
								generateCompareDigits();
							}
							else
							{
								winLevelProcess();
								break;
							}

							createjs.Tween.get(yes0).to({alpha: 0}, 500, createjs.Ease.cubicIn);
							createjs.Tween.get(yes1).to({alpha: 0}, 500, createjs.Ease.cubicIn);
						}
						else
						{
							if (globalArray[0] == "compare0") no0.alpha = 1;
							if (globalArray[0] == "compare1") no1.alpha = 1;

							gameOverFunc(-2);
						}
					}
				break;

				case 12:
					if (e.target.name == "3")
					if (horseStat == 8 || horseStat == 2)
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 3;
					}

					if (e.target.name == "8")
					if (horseStat == 3 || horseStat == 1)
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 8;
					}

					if (e.target.name == "2")
					if (horseStat == 3 || horseStat == 7)
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 2;
					}

					if (e.target.name == "7")
					if (horseStat == 2)
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 7;
					}

					if (e.target.name == "0")
					if (horseStat == 7)
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 0;

				    	winLevelProcess();
					}


					if (e.target.name == "1")
					if (horseStat == 8 || horseStat == 6) 
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 1;
					}

					if (e.target.name == "6")
					if (horseStat == 1 || horseStat == 5) 
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 6;
					}

					if (e.target.name == "5")
					if (horseStat == 6 || horseStat == 0)
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 5;
					}

					if (e.target.name == "0")
					if (horseStat == 5)
					{
						horse.x = e.target.x + 20 + 130/2;
				    	horse.y = e.target.y + 220/2;

				    	horseStat = 0;

				    	winLevelProcess();
					}
				break;

				case 13:
					if (fullWord[e.target.name] == fullWord[currentLevelProgress])
					{
						gameContainer.getChildByName(e.target.name).visible = false;
						gameContainer.getChildByName(e.target.name + "_").visible = false;

						currentLevelProgress++

						if (currentLevelProgress == 8) winLevelProcess();
					}
					else
					{
						gameOverFunc(-2);
					}
				break;

				case 15:
					if (e.target.name == parseInt(currentLevelProgress+1))
					{
						currentLevelProgress += 1;

						gameContainer.getChildByName(e.target.name).visible = false;
						gameContainer.getChildByName(e.target.name + "_").visible = false;
						gameContainer.getChildByName(e.target.name + "__").visible = false;

						if (currentLevelProgress == 5) winLevelProcess();
					}
					else
					{
						gameOverFunc(-2);
					}
				break;

				case 19:
					if (e.target == lightbulb0 || e.target == lightbulbOff0) ran[0].visible = !ran[0].visible;
					if (e.target == lightbulb1 || e.target == lightbulbOff1) ran[1].visible = !ran[1].visible;
					if (e.target == lightbulb2 || e.target == lightbulbOff2) ran[2].visible = !ran[2].visible;

					if (ran[0].visible) if (ran[1].visible) if (ran[2].visible) winLevelProcess();
				break;

				case 20:
					itemOffsetX = e.target.x - e.stageX;
					itemOffsetY = e.target.y - e.stageY;
				break;

				case 21:
					e.target.removeEventListener("mousedown", clickObject);

					if (createjs.Tween.hasActiveTweens(globalApple))
					{
				        createjs.Tween.removeTweens(globalApple);
				    }

					if (e.target.name == "red")
					{
						createjs.Tween.get(e.target).to({alpha: 0, scaleX: 0.5, scaleY: 0.5}, 300, createjs.Ease.cubicIn).call( function(){
							currentLevelProgress++;

							if (currentLevelProgress < 3) addBalloon(0);
							if (currentLevelProgress == 3) addBalloon(1);
							if (currentLevelProgress == 4) winLevelProcess();
						});
					}
					else
					{
						gameOverFunc(-2);
					}
				break;

				case 22:
					if (e.target.name == ran[currentLevelProgress])
					{
						currentLevelProgress++;

						gameContainer.getChildByName(e.target.name).visible = false;
						gameContainer.getChildByName(e.target.name + "_").visible = false;

						if (currentLevelProgress == 6) winLevelProcess();
					}
					else
					{
						gameOverFunc(-2);
					}
				break;

				case 23:
					if (e.target.name == ran[currentLevelProgress].name)
					{
						e.target.visible = false;
						ran[currentLevelProgress].visible = true;

						currentLevelProgress++;

						if (currentLevelProgress == 6) winLevelProcess();
					}
					else
					{
						gameOverFunc(-2);
					}
				break;

				case 24:
					if (createjs.Tween.hasActiveTweens(e.target))
					{
				        createjs.Tween.removeTweens(e.target);
					}

					itemOffsetX = e.target.x - e.stageX;
					itemOffsetY = e.target.y - e.stageY;
				break;
			}
		}
	}
}

function moveObject(e)
{
	if (!isPaused)
	{
		if (!gameOverBool)
		{
			e.target.x = e.stageX + itemOffsetX;
			e.target.y = e.stageY + itemOffsetY;

			switch (currentLevel)
			{
				case 1:
					var hiTestRes = basket.globalToLocal(stage.mouseX, stage.mouseY);

					if (basket.hitTest(hiTestRes.x, hiTestRes.y))
					{
						e.target.removeEventListener("mousedown", clickObject);
				    	e.target.removeEventListener("pressmove", moveObject);

				    	gameContainer.removeChild(e.target);

				    	currentLevelProgress++;

				    	if (currentLevelProgress == 8) winLevelProcess();
					}
				break;

				case 20:

					var hiTestRes = catBitmap.globalToLocal(stage.mouseX, stage.mouseY);

					if (e.target == equipment) equipment_.visible = false;
					if (e.target == blade) blade_.visible = false;
					if (e.target == catMask) catMask_.visible = false;
					if (e.target == pirate) pirate_.visible = false;
					if (e.target == hat) hat_.visible = false;
					if (e.target == shuriken) shuriken_.visible = false;
					if (e.target == bandage) bandage_.visible = false;

				    if (catBitmap.hitTest(hiTestRes.x, hiTestRes.y))
			    	{
						if (e.target == equipment)
						{
							equipment.x = 347;
						    equipment.y = 550;
						    
						    e.target.removeEventListener("mousedown", clickObject);
				    		e.target.removeEventListener("pressmove", moveObject);
				    		currentLevelProgress++;
						}
						if (e.target == blade)
						{
							blade.x = 270;
				    		blade.y = 515;

				    		e.target.removeEventListener("mousedown", clickObject);
				    		e.target.removeEventListener("pressmove", moveObject);
				    		currentLevelProgress++;
						}
						if (e.target == catMask)
						{
							catMask.x = 286;
				    		catMask.y = 473;
				    		
				    		e.target.removeEventListener("mousedown", clickObject);
				    		e.target.removeEventListener("pressmove", moveObject);
				    		currentLevelProgress++;
						}
						if (e.target == pirate)
						{
							pirate.x = 310;
				    		pirate.y = 453;
				    		
				    		e.target.removeEventListener("mousedown", clickObject);
				    		e.target.removeEventListener("pressmove", moveObject);
				    		currentLevelProgress++;
						}
						if (e.target == hat)
						{
							hat.x = 215;
				    		hat.y = 380;
				    		
				    		e.target.removeEventListener("mousedown", clickObject);
				    		e.target.removeEventListener("pressmove", moveObject);
				    		currentLevelProgress++;
						}
						if (e.target == shuriken)
						{
				    		shuriken.scaleX = 0.5;
						    shuriken.scaleY = 0.5;
						    shuriken.x = 317;
						    shuriken.y = 535;
						    
						    e.target.removeEventListener("mousedown", clickObject);
				    		e.target.removeEventListener("pressmove", moveObject);
				    		currentLevelProgress++;
						}

						if (e.target == bandage)
						{
						    bandage.scaleX = 0.5;
						    bandage.scaleY = 0.5;
						    bandage.x = 310;
						    bandage.y = 465;
						    
						    e.target.removeEventListener("mousedown", clickObject);
				    		e.target.removeEventListener("pressmove", moveObject);
				    		currentLevelProgress++;
						}

						if (currentLevelProgress == 7) winLevelProcess();
			    	}
				break;

				case 24:
					if (e.target.y < 300)
					{
						e.target.removeEventListener("mousedown", clickObject);
				    	e.target.removeEventListener("pressmove", moveObject);
						
						createjs.Tween.get(e.target).to({x: 280, y: 100, scaleX:0.5, scaleY:0.5}, 500).call( function(){

							if (e.target.name == "red")
							{
								gameContainer.removeChild(e.target);
								currentLevelProgress++;
								if (currentLevelProgress == 4) winLevelProcess()
								else addApple();
							}
							else
							{
								if (createjs.Tween.hasActiveTweens(e.target))
								{
							        createjs.Tween.removeTweens(e.target);
								}
								gameOverFunc(-2);
							}
						});
					}
					if (e.target.y > 300)
					{
						e.target.removeEventListener("mousedown", clickObject);
				    	e.target.removeEventListener("pressmove", moveObject);

						createjs.Tween.get(e.target).to({x: 280, y: 500, scaleX:0.5, scaleY:0.5}, 500).call( function(){

							if (e.target.name == "green")
							{
								gameContainer.removeChild(e.target);
								currentLevelProgress++;
								if (currentLevelProgress == 4) winLevelProcess()
								else addApple();
							}
							else
							{
								if (createjs.Tween.hasActiveTweens(e.target))
								{
							        createjs.Tween.removeTweens(e.target);
								}
								gameOverFunc(-2);
							}
						});
					}
				break;

		    }
		}
	}
}

function winLevelProcess()
{
	currentState = "win";

	if (createjs.Tween.hasActiveTweens(timerProgressMask))
	{
        createjs.Tween.removeTweens(timerProgressMask);
    }

    if (globalApple != undefined)
    if (createjs.Tween.hasActiveTweens(globalApple))
	{
        createjs.Tween.removeTweens(globalApple);
	}

	var flag = 0;

	if (currentLevel == 2) flag = 3;
	if (currentLevel == 5) flag = 3;
	if (currentLevel == 6) flag = 5;
	if (currentLevel == 7) flag = 5;
	if (currentLevel == 8) flag = 2;
	if (currentLevel == 9) flag = 5;
	if (currentLevel == 11) flag = 3;
	if (currentLevel == 13) flag = 2;
	if (currentLevel == 14) flag = 500;
	if (currentLevel == 15) flag = 2;
	if (currentLevel == 16) flag = 2;
	if (currentLevel == 17) flag = 500;
	if (currentLevel == 18) flag = 500;
	if (currentLevel == 21) flag = 500;
	if (currentLevel == 22) flag = 5;
	if (currentLevel == 23) flag = 2;
	if (currentLevel == 24) flag = 5;
	
	if (flag == 0)
	{
		globalScore += scoreOnLevel;
	}
	if (flag > 0 && flag < 500)
	{
		scoreOnLevel *= flag
		globalScore += scoreOnLevel;
	}
	if (flag == 500)
	{
		scoreOnLevel = 500;
		globalScore += scoreOnLevel;
	}

    animHeader(0);
}

function hitRadius(obj1, obj2, rad)
{
	var result = false;
	var xDist = obj1.x - obj2.x;
	var yDist = obj1.y - obj2.y;
	var distance = Math.sqrt(xDist*xDist + yDist*yDist);
	if (distance < rad) result = true;
	return result;
}

function hitRadiusXY(obj1, _x, _y, rad)
{
	var result = false;
	var xDist = obj1.x - _x;
	var yDist = obj1.y - _y;
	var distance = Math.sqrt(xDist*xDist + yDist*yDist);
	if (distance < rad) result = true;
	return result;
}

function update(event)
{
    if (!rotateDeviceBool)
    if (currentState == "game")
    {
        if (currentLevel == 6)
		{
			for (var i = 0; i < arrOfApples.length; i++)
			{
				if (hitRadius(starShip, arrOfApples[i], 40))
				{
			    	gameContainer.removeChild(arrOfApples[i]);
			    	arrOfApples.splice(i, 1);
				}
			}

			if (arrOfApples.length == 0) winLevelProcess();
		}

		if (currentLevel == 14)
	    {
	    	if (hitRadiusXY(basket, globalApple.x, globalApple.y-30, 70))
	    	{
	    		if (createjs.Tween.hasActiveTweens(globalApple))
				{
			        createjs.Tween.removeTweens(globalApple);
		    	}

		    	currentLevelProgress++;

		    	if (currentLevelProgress < 5)
		    	{
			    	globalApple.x = Math.random() * 450 + 100;
			    	globalApple.y = 100;
			    	globalApple.alpha = 1;

					createjs.Tween.get(globalApple).to({y: 630}, 1000).call(function() {
			    		gameOverFunc(-2);
			    	});
				}
				else
				{
					globalApple.visible = false;

					winLevelProcess();
				}
	    	}
	    }

	    if (currentLevel == 16)
	    {
	    	var hiTestRes = avoider.localToGlobal(starShip.x, starShip.y);

			if (!avoider.hitTest(hiTestRes.x - diffX/globalScale, hiTestRes.y - diffY/globalScale))
	    	{
	    		gameOverFunc(-2);
	    	}

	    	if (finishCircle.hitTest(starShip.x-finishCircle.x, starShip.y-finishCircle.y))
	    	{
	    		winLevelProcess();
	    	}
	    }

	    if (currentLevel == 17)
	    {
			if (horse.hitTest(horse.x - globalApple.x + 80, horse.y - globalApple.y + 50))
	    	{
	    		createjs.Tween.removeTweens(globalApple);
	    		gameOverFunc(-2);
	    	}
	    }

	    if (currentLevel == 18)
	    {
	    	if (hitRadiusXY(basket, globalApple.x, globalApple.y-30, 70))
	    	{
				gameOverFunc(-2);

	    		if (createjs.Tween.hasActiveTweens(globalApple))
				{
			        createjs.Tween.removeTweens(globalApple);
		    	}
	    	}
	    	else
	    	{
	    		if (currentLevelProgress == 5)
		    	{
			    	globalApple.visible = false;
					winLevelProcess();
				}
	    	}
	    }

		scoreOnLevel = Math.floor(timerProgressMask.scaleX * 500);
        scoreText.text = lang.score + " " + globalScore;
        scoreText_.text = lang.score + " " + globalScore;

        fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS());
    }
    
    stage.update(event);
}

function gameOverFunc(num)
{
	lives--;

	if (lives == 2) heart2.visible = false;
	if (lives == 1) heart1.visible = false;
	if (lives == 0) heart0.visible = false;

    animHeader(num);

    currentState = "gameover";

    if (createjs.Tween.hasActiveTweens(timerProgressMask))
	{
        createjs.Tween.removeTweens(timerProgressMask);
    }
}

function touch_down(e)
{
    stage.addEventListener("stagemousemove", touch_move);
    stage.addEventListener("stagemouseup", touch_up);

    if (!gameOverBool)
    {
	    if (currentLevel == 4)
	    {
	    	clicks++;
	    	ingameCounterText.text = clicks;
	    	ingameCounterText_.text = clicks;

	    	if (createjs.Tween.hasActiveTweens(ingameCounterText))
			{
		        createjs.Tween.removeTweens(ingameCounterText);
		        createjs.Tween.removeTweens(ingameCounterText_);
	    	}

	    	ingameCounterText.scaleX = 1.5;
	    	ingameCounterText.scaleY = 1.5;

	    	ingameCounterText_.scaleX = 1.5;
	    	ingameCounterText_.scaleY = 1.5;

	    	createjs.Tween.get(ingameCounterText).to({scaleX: 1, scaleY: 1}, 300);
	    	createjs.Tween.get(ingameCounterText_).to({scaleX: 1, scaleY: 1}, 300);

	    	if (clicks == 30)
	    	{
	    		stage.removeEventListener("stagemousedown", touch_down);
	    		winLevelProcess();
	    	}
	    }

	    if (currentLevel == 6)
	    {
	    	if (createjs.Tween.hasActiveTweens(starShip))
			{
		        createjs.Tween.removeTweens(starShip);
	    	}

	    	createjs.Tween.get(starShip).to({x: e.stageX - diffX/globalScale, y: e.stageY - diffY/globalScale}, 200);
	    }

	    if (currentLevel == 16)
	    {
	    	if (createjs.Tween.hasActiveTweens(starShip))
			{
		        createjs.Tween.removeTweens(starShip);
	    	}

	    	createjs.Tween.get(starShip).to({x: e.stageX - diffX/globalScale, y: e.stageY - diffY/globalScale}, 500);
	    }

	    if (currentLevel == 14 || currentLevel == 18)
	    {
	    	if (createjs.Tween.hasActiveTweens(basket))
			{
		        createjs.Tween.removeTweens(basket);
	    	}

	    	createjs.Tween.get(basket).to({x: e.stageX - diffX/globalScale}, 200);
	    }

	    if (currentLevel == 17)
	    {
	    	if (horse.y == 390)
	    	createjs.Tween.get(horse).to({y: 390 - 150}, 500).call(function() {
	    		createjs.Tween.get(horse).to({y: 390}, 500);
	    	});
	    }
	}
}

function appleAnim(target)
{
	createjs.Tween.get(target).to({rotation: 10}, 300).call(function() {
		createjs.Tween.get(this).to({rotation: -10}, 300).call(function() {
			appleAnim(this);
	    });
	});
}

function horseAnim()
{
	createjs.Tween.get(horse).to({rotation: 20}, 500).call(function() {
		createjs.Tween.get(horse).to({rotation: -20}, 500).call(function() {
			horseAnim();
	    });
	});
}

function touch_move(e)
{
	if (!gameOverBool)
    {
    	if (currentLevel == 6 || currentLevel == 16)
	    {
	    	if (createjs.Tween.hasActiveTweens(starShip))
			{
		        createjs.Tween.removeTweens(starShip);
	    	}

	    	createjs.Tween.get(starShip).to({x: e.stageX - diffX/globalScale, y: e.stageY - diffY/globalScale}, 200);
	    }

	    if (currentLevel == 14 || currentLevel == 18)
	    {
	    	if (createjs.Tween.hasActiveTweens(basket))
			{
		        createjs.Tween.removeTweens(basket);
	    	}

	    	createjs.Tween.get(basket).to({x: e.stageX - diffX/globalScale}, 200);
	    }

	    if (currentLevel == 8)
	    {
	    	if (!hitRadiusXY(handle, e.stageX - diffX/globalScale, e.stageY - diffY/globalScale, 90))
	    	{
			    handle.rotation = (180*Math.atan2(e.stageY - handle.y - diffY/globalScale, e.stageX-handle.x - diffX/globalScale))/Math.PI + 90;

			    var rotation360 = 0;
			    rotation360 = handle.rotation;

			    if (handle.rotation < 0 && handle.rotation > -90)
			    	rotation360 = handle.rotation + 360;

			    if (Math.floor(rotation360) > handleRotatePrev)
			    {
				    handleRotatePrev = handleRotateResult;
				    handleRotateResult = Math.floor(rotation360);
				}
				
				if ((Math.floor(rotation360) >= 0) && (Math.floor(rotation360) < 90))
				{
					if (handleRotateFlag == 4) handleRotateCount += 1;

					handleRotateFlag = 1;
				}
				if ((Math.floor(rotation360) >= 90) && (Math.floor(rotation360) < 180))
				{
					if (handleRotateFlag == 1) handleRotateFlag = 2;
				}
				if ((Math.floor(rotation360) >= 180) && (Math.floor(rotation360) < 270))
				{
					if (handleRotateFlag == 2) handleRotateFlag = 3;
				}
				if ((Math.floor(rotation360) >= 270) && (Math.floor(rotation360) < 360))
				{
					if (handleRotateFlag == 3) handleRotateFlag = 4;
				}

			    if (handleRotateCount == 10) winLevelProcess();
			}
	    }
    }
}

function touch_up(e)
{
	stage.removeEventListener("stagemousemove", touch_move);
    stage.removeEventListener("stagemouseup", touch_up);
}

function onResize()
{
    globalScale = Math.min(window.innerWidth / globalWidth, window.innerHeight / globalHeight);
    
    diffX = 0;
    diffY = 0;
	
	diffY = (window.innerHeight - globalHeight * globalScale) / 2;
	diffX = (window.innerWidth - globalWidth * globalScale) / 2;
    
	if (preloaderContainer != null)
	{
		preloaderContainer.x = diffX/globalScale;
		preloaderContainer.y = diffY/globalScale;
	}
	
	if (gameContainer != null)
	{
		gameContainer.x = diffX/globalScale;
		gameContainer.y = diffY/globalScale;

		gameContainer.scaleX = 1;
		gameContainer.scaleY = 1;
	}
	
	if (guiContainer != null)
	{
		guiContainer.x = diffX/globalScale;
		guiContainer.y = diffY/globalScale;
	}
	
	if (faderContainer != null)
	{
		faderContainer.x = diffX/globalScale;
		faderContainer.y = diffY/globalScale;
	}

	if (currentState == "menu")
	{
		if (diffY > 0)
		{
			var s = diffY/globalScale/400;

			gameContainer.scaleX = 1+s;
			gameContainer.scaleY = 1+s;

			gameContainer.x = -((diffY*0.8/globalScale));
			gameContainer.y = 0;
		}
	}

    stage.canvas.width = (640+diffX*2/globalScale);
    stage.canvas.height = (720+diffY*2/globalScale);
	
    stage.canvas.style.width = window.innerWidth + "px";
    stage.canvas.style.height = window.innerHeight + "px";
	
	if (backgroundContainer != null)
	{
		backgroundContainer.regX = 960/2;
		backgroundContainer.regY = 1136/2;
		
		if (diffX == 0)
		{	
			backgroundContainer.x = diffX/globalScale + (640/2);
			backgroundContainer.y = diffY/globalScale + (720/2);
			
			backgroundContainer.scaleX = window.innerHeight / (1136*globalScale);
			
			if (backgroundContainer.scaleX < 640/960) backgroundContainer.scaleX = 640/960;
			
			backgroundContainer.scaleY = window.innerHeight / (1136*globalScale);
		}
		else
		{
			backgroundContainer.x = diffX/globalScale + (640/2);
			backgroundContainer.y = 720/2;
			
			backgroundContainer.scaleX = 640/960;
			backgroundContainer.scaleY = 720/1136;
		}
	}
	
    if (window.orientation != undefined)
    {
        if (window.innerWidth < window.innerHeight)
        {
            if (rotateDeviceBool == true)
            {
                rotateDeviceBool = false;
                faderMainContainer.removeChild(rotateDevice);
            }
        }
        else
        {
            if (rotateDeviceBool == false)
            {
                rotateDeviceBool = true;
            }
			rotateDevice.x = diffX/globalScale;
            faderMainContainer.addChild(rotateDevice);
        }
    }

	if (heart0 != undefined) heart0.y = -diffY/globalScale + 10;
	if (heart1 != undefined) heart1.y = -diffY/globalScale + 10;
	if (heart2 != undefined) heart2.y = -diffY/globalScale + 10;
	if (fpsLabel != undefined) fpsLabel.y = -diffY/globalScale + 10;

	if (pauseButton != undefined) pauseButton.y = 40 - diffY/globalScale;
	if (timerProgressBitmap != undefined) timerProgressBitmap.y = diffY/globalScale + 720-50;
	if (timerProgressMask != undefined) timerProgressMask.y = diffY/globalScale + 720-50;
	if (currentLevelText != undefined) currentLevelText.y = -diffY/globalScale + 40;
	if (scoreText != undefined) scoreText.y = -diffY/globalScale + 40;
	if (scoreText_ != undefined) scoreText_.y = -diffY/globalScale + 45;
	if (infoButton != undefined) infoButton.y = diffY/ globalScale + 650;
	if (moreButton != undefined) moreButton.y = diffY/ globalScale + 650;
    
    stage.update();
    
    window.scrollTo(0, 0);
}
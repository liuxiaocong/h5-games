Phaser.Button.prototype.activate = function() {
  this.input.enabled = true;
  this.frame = 0;
};

Phaser.Button.prototype.deactivate = function() {
  this.input.enabled = false;
  this.frame = 0; // change this to match your greyed out frame in the button spritesheet
};

function GetXPos(value, game)
{
    return (value / 1500) * game.width;
};

function GetYPos(value, game)
{
    return(value / 800) * game.height;
};

MissileMania = 
{
    orientated: false,
    SpilAPI: null,
    game: null,
    deviceType: "desktop_",
    isHD: true
};

window.onload = function() 
{
    GameAPI.loadAPI(function(API)
    {
        MissileMania.SpilAPI = API; 
    });

    //  Create your Phaser game and inject it into the gameContainer div.
    //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, etc - whatever floats your boat
    var game = new Phaser.Game(0, 0, Phaser.CANVAS); //1500 x 800
    game.boot();

    if(game.device.desktop)
    {
        //game.destroy();
        game = null;
        game = new Phaser.Game(1500, 800, Phaser.CANVAS, 'gameContainer');

    }else
    {
        //game.destroy();
        game = null;
        game = new Phaser.Game(750, 400, Phaser.CANVAS, 'gameContainer');
    }

    //  Add the States your game has.
    //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
    var Splash = new MissileMania.Splash(game, 'MainMenu', 3000);

    game.state.add('Boot', MissileMania.Boot);
    game.state.add('Preloader', MissileMania.Preloader);
    game.state.add('Splash', Splash);
    
    game.state.add('MainMenu', MissileMania.MainMenu);
    game.state.add('Upgrade', MissileMania.Upgrade);
    game.state.add('Game', MissileMania.Game);

    //  Now start the Boot state.
    game.state.start('Boot');
};

window.onunload = function()
{
    MissileMania.game.destroy();
    MissileMania.game = null;
}


function SaveObject(key, object)
{
	localStorage.setItem(key, JSON.stringify(object));
};

function GetObject(key)
{
	if(localStorage.getItem(key) === null) return null;

	return JSON.parse(localStorage.getItem(key));
};

MissileMania.Boot = function (game) 
{
};

MissileMania.Boot.prototype = 
{

	preload: function ()
	{
		this.game.load.image('loading_bar', 'bin/images/loading_bar.png');
        this.game.load.image('loading_background', 'bin/images/Loading_Background.png');
	},

	create: function () 
	{

		//	Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
		this.game.input.maxPointers = 2;
		//this.game.stage.disableVisibilityChange = true;

        this.game.stage.visibiltyChange = function(event){ this.game.audio.mute = !this.game.audio.mute; };

        if(this.game.device.silk || this.game.device.iOS || this.game.device.android)
        {
            
            MissileMania.deviceType = "tablet_";
            MissileMania.isHD = false;

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            if(!this.game.device.android)
            {
                this.game.scale.pageAlignHorizontally = true;

            }else if(this.game.device.chrome)
            {
                this.game.scale.pageAlignHorizontally = true;
            }
            this.game.scale.pageAlignVertically = true;
            //this.game.scale.minWidth = 320;
            //this.game.scale.minHeight = 480;
            //this.game.scale.forceOrientation(true, false);
            //this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);

            this.game.scale.setScreenSize(true);
        }else
        {
            //DESKTOP
            MissileMania.deviceType = "desktop_";
            MissileMania.isHD = true;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.game.scale.minWidth = 480;
            //this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 1500;
            this.game.scale.maxHeight = 800;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
        }

	    //	By this point the preloader assets have loaded to the cache, we've set the game settings
	    //	So now let's start the real preloader going
		this.game.state.start('Preloader');
	},

    enterIncorrectOrientation: function ()
    {
        MissileMania.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () 
    {
        MissileMania.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }
};

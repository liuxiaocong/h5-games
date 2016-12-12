MissileMania.Splash = function(game, nextStateID, transitionTime)
{
	this.nextState = nextStateID;
	this.transitionTime = transitionTime / 2;
};

MissileMania.Splash.prototype = 
{
	create: function()
	{	
		var splashScreenData = MissileMania.SpilAPI.Branding.getSplashScreen();

		this.logoName = "a10_splash";


		if(MissileMania.SpilAPI.IS_STANDALONE){
			this.action = goA10;	
		}else{
			this.action = splashScreenData.action;	
		}

		

		function SwitchState()
		{
			this.game.state.start(this.nextState);
		}

		var count = 0;
		if(splashScreenData.show && MissileMania.brandingSplash.image != undefined)
		{
			this.logo = this.game.add.button(0, 0, this.logoName, this.action, this, this.logoName, this.logoName, this.logoName);
			this.logo.x = this.game.width / 2 - this.logo.width / 2;
			this.logo.y = this.game.height / 2 - this.logo.height / 2;

			//create a tween with the init values
			this.logo.alpha = 0;
			this.game.add.tween(this.logo)
			.to({ alpha: 1}, this.transitionTime, Phaser.Easing.Linear.None, true, 0, 1000, true)
			.repeat(1)
			.onComplete.add(SwitchState, this);
		}else
		{
			this.game.state.start(this.nextState);
		}	
	},

	shutdown: function()
	{
		if(this.logo) this.logo.destroy();
	}
}
/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

PreLevelScreen.prototype = inherit(Screen.prototype);
PreLevelScreen.prototype.super = Screen.prototype;

function PreLevelScreen(context, game)
{
	this.super.constructor.apply(this, [context, game]);
	
	this.overlayImg = loadImage("images/pixelkaiju-map-blackoverlay.png");
    this.popupBackgroundImg = loadImage("images/pixelkaiju-map-popup.png");
    this.lineImg = loadImage("images/pixelkaiju-map-streepje.png");
    this.checkImg = loadImage("images/pixelkaiju-map-vinkje.png");

    this.levelID = -1;
    
    var thisRef = this;
    this.buttons.push(new Button(context, getLangString("start").toUpperCase(), (GAME_WIDTH/2) - (178 / 2), 345, 178, 89, [loadImage("images/button.png")], BUTTON_LAYOUT_DEFAULT, function(){ thisRef.handleContinue();}, 0.44));
    this.buttons.push(new Button(context, "", 630, 70, 26, 30, [loadImage("images/pixelkaiju-map-popup-afsluitbutton.png")], BUTTON_LAYOUT_DEFAULT, function(){thisRef.handleCancel();}));

    this.buttons.push(new Button(context, "", 196, 175, 114, 85, [loadImage("images/powerups/headstart.png")],BUTTON_LAYOUT_DEFAULT, function(){thisRef.activate(3);}, 0.5));
    this.buttons.push(new Button(context, "", 347, 173, 107, 90, [loadImage("images/powerups/extralife.png")],BUTTON_LAYOUT_DEFAULT, function(){thisRef.activate(4);}, 0.5));
    this.buttons.push(new Button(context, "", 500, 177, 98, 85, [loadImage("images/powerups/magnet.png")],BUTTON_LAYOUT_DEFAULT, function(){thisRef.activate(2);}, 0.5));
};

PreLevelScreen.prototype.activate = function(powerUpID)
{
	 for (var i = 0; i < POWERUPS.length; i++)
	 {
		 if (POWERUPS[i].id == powerUpID)
		 {
			 if (POWERUPS[i].activated == 0)
			 {
				 if(POWERUPS[i].amount > 0){
					 //TODO: show button activated
					 POWERUPS[i].amount--;
					 POWERUPS[i].activated = 1;
				 }
			 }else{
				 //TODO show button not activated
				 POWERUPS[i].amount++;
				 POWERUPS[i].activated = 0;				 
			 }
		 }
	 }
};

PreLevelScreen.prototype.setLevel = function(levelID)
{
	this.levelID = levelID;
	
	//Reset activated powerups
	 for (var i = 0; i < POWERUPS.length; i++)
	 {
		 POWERUPS[i].activated = 0;
	 }
};

PreLevelScreen.prototype.handleContinue = function()
{
	console.log("handlecontinue");
	this.game.startLevel(this.levelID);
};

PreLevelScreen.prototype.handleCancel = function()
{
	this.game.hidePreLevelScreen();
};

PreLevelScreen.prototype.update = function(timeFactor) 
{
	if (this.isVisible)
	{
		context.drawImage(this.overlayImg, 0, 0);
		context.drawImage(this.popupBackgroundImg, 0, 0);
		
		context.drawImage(this.lineImg, 179, 164);
		context.drawImage(this.lineImg, 326, 164);
		context.drawImage(this.lineImg, 471, 164);
		context.drawImage(this.lineImg, 621, 164);
		
		this.drawTitle();
		this.drawSubTitle();
		
		this.super.update.apply(this, []);
		
		var powerupOrder = [1, 2, 0];
		
		for (var i = 0; i < powerupOrder.length; i++)
	    {
    		var posX = 255 + (146 * i);
    		var posY = 294;
    		
    		this.drawPowerupTitle(POWERUPS[powerupOrder[i]].name, posX, posY);
    		this.drawPowerupAmount(getLangString("youHave").replace("$", POWERUPS[powerupOrder[i]].amount), posX, posY + 30); 
    		if (POWERUPS[powerupOrder[i]].activated > 0){
    			context.drawImage(this.checkImg, posX + 15, posY - 103);
    		}
	    }

		
	}
}; 

PreLevelScreen.prototype.drawTitle = function()
{
    context.font = "" + 75 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 8;
    context.strokeStyle = '#032d41';
    context.textAlign = 'left';
    context.fillStyle = "white";
    
    var txt = getLangString("selectPower").toUpperCase();
    var textX = (GAME_WIDTH / 2) - (context.measureText(txt).width / 2);
    
    strokedText(context, txt, textX, 120);
};

PreLevelScreen.prototype.drawSubTitle = function()
{
    context.font = "bold " + 30 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
    context.textAlign = 'left';
    context.fillStyle = "black";
    
    var text  = getLangString("tapPowerOnOff");
    var textX = (GAME_WIDTH / 2) - (context.measureText(text).width / 2);
    
    context.fillText(text, textX, 153);
};

PreLevelScreen.prototype.drawPowerupTitle = function(text, x, y)
{
    context.font = " " + 28 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 6;
    context.strokeStyle = 'black';
    context.textAlign = 'center'; //(alignLeft? 'left' : 'right');
    context.fillStyle = "white";
    strokedText(context, text, x, y);
};

PreLevelScreen.prototype.drawPowerupAmount = function(text, x, y)
{
    context.font = "bold " + 25 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 6;
    context.strokeStyle = 'black';
    context.textAlign = 'center';//(alignLeft? 'left' : 'right');
    context.fillStyle = "#f29400";
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
};

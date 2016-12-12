/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

ShopScreen.prototype = inherit(Screen.prototype);
ShopScreen.prototype.super = Screen.prototype;

//var POWERUP_JUMP_LEVEL = {level:0, maxLevel:5, step:1, price:250, name:"Hoger springen", id:1, button:"addJumpButton"} ; 					//Range 1-5

//TODO: Move this data to json file
var POWERUP_HEAD_START = {amount:0, price:50, activated:0, name:getLangString("powerUps.headstart"), id:3, button:"addHeadStartButton", shopPosX:200, shopPosY:95, alignLeft:true, distance:70};	//distance in meters
var POWERUP_EXTRA_HEALTH = {amount:0, price:75, activated:0, name:getLangString("powerUps.extraLife"), id:4, button:"addHealthButton",  shopPosX:623, shopPosY:100, alignLeft:true};
var POWERUP_MAGNET_LEVEL = {amount:0, price:100, activated:0, name:getLangString("powerUps.magnet"), id:2, button:"addMagnetButton", shopPosX:634, shopPosY:213, alignLeft:false, power:5}; 	//power range 1-5

var POWERUPS = [POWERUP_MAGNET_LEVEL, POWERUP_HEAD_START, POWERUP_EXTRA_HEALTH];

var RETURNSCREEN_STARTSCREEN = "startscreen";
var RETURNSCREEN_ENDSCREEN = "endscreen";
var RETURNSCREEN_MAPSCREEN = "mapscreen";

function ShopScreen(context, game)
{
	this.super.constructor.apply(this, [context, game]);
	
    this.background = new loadImage("images/shop/bg.jpg");
    this.eggIcon = new loadImage("images/hud/eggs.png");
    this.eggIconSmall = new loadImage("images/shop/egg-small.png");
    
    this.returnScreen = "";
    
    this.emptyButton = loadImage("images/button.png");
    
    var thisRef = this;
    this.buttons.push(new Button(context, getLangString("back").toUpperCase(), 13, 384, 178, 89, [this.emptyButton], BUTTON_LAYOUT_NORMAL_BUTTON, function(){
    	if (spil != null) spil.showAd();
    	thisRef.closeShop();
    }, 0.44));
    if (spil != null && spil.moreGamesAction != null) {
    	this.buttons.push(new Button(context, getLangString("moreGames").toUpperCase(), 13+178+13, 384, 178, 89, [this.emptyButton], BUTTON_LAYOUT_MOREGAMES, spil.moreGamesAction, 0.44));	
    }
    
    this.buttons.push(new Button(context, "", 647, 193, 98, 85, [loadImage("images/powerups/magnet.png")],BUTTON_LAYOUT_DEFAULT, function(){thisRef.buyItem(2);}, 0.5));
    this.buttons.push(new Button(context, "", 76, 73, 114, 85, [loadImage("images/powerups/headstart.png")],BUTTON_LAYOUT_DEFAULT, function(){thisRef.buyItem(3);}, 0.5));
    this.buttons.push(new Button(context, "", 507, 77, 107, 90, [loadImage("images/powerups/extralife.png")],BUTTON_LAYOUT_DEFAULT, function(){thisRef.buyItem(4);}, 0.5));
    
    this.updateButtons(); 
}

ShopScreen.prototype.closeShop = function()
{
	this.isVisible = false;
	
	switch(this.returnScreen)
	{
		case RETURNSCREEN_STARTSCREEN:
			this.game.showStartScreen();
			break;
		case RETURNSCREEN_MAPSCREEN:
			this.game.showMapScreen();
			break;
		case RETURNSCREEN_ENDSCREEN:
			this.game.showEndScreen();
			break;
	}
};

//TODO: disable the store buttons and setImage
ShopScreen.prototype.updateButtons = function()
{
//	for (var i = 0; i < POWERUPS.length; i++)
//    {
//		if (POWERUPS[i].level >= POWERUPS[i].maxLevel){
//			//disable button
//		}else{
//			//show button
//		}
//    }
};

ShopScreen.prototype.drawTitle = function()
{
    context.font = "" + 72 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 8;
    context.strokeStyle = '#032d41';
    context.textAlign = 'left';
    context.fillStyle = "white";
    strokedText(context, getLangString("shop").toUpperCase(), 330, 75);
};

ShopScreen.prototype.drawTotalEggs = function()
{
	drawImageScaled(context, this.eggIcon, 11, 11, 0.5);
    context.font = "bold " + 36 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 8;
    context.strokeStyle = 'black';
    context.textAlign = 'left';
    context.fillStyle = "white";
    context.strokeText(this.game.totalEggs, 53, 48);
    context.fillText(this.game.totalEggs, 53, 48);
};

ShopScreen.prototype.drawPowerupTitle = function(text, x, y, alignLeft)
{
    context.font = "bold " + 32 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 6;
    context.strokeStyle = 'black';
    context.textAlign = (alignLeft? 'left' : 'right');
    context.fillStyle = "#06cdc2";
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
};

ShopScreen.prototype.drawPowerupAmount = function(text, x, y, alignLeft)
{
    context.font = "bold " + 25 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 6;
    context.strokeStyle = 'black';
    context.textAlign = (alignLeft? 'left' : 'right');
    context.fillStyle = "#f29400";
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
};

ShopScreen.prototype.drawPowerupCosts = function(text, x, y, alignLeft)
{
    context.font = "bold " + 34 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 6;
    context.strokeStyle = 'black';
    context.textAlign = (alignLeft? 'left' : 'right');
    context.fillStyle = "white";
    context.strokeText(text, (x  + 35) - (alignLeft?0:35), y - 2);
    context.fillText(text, (x + 35) - (alignLeft?0:35), y - 2);
    
    drawImageScaled(context, this.eggIconSmall, x - (alignLeft?0:context.measureText(text).width + 33), y - this.eggIconSmall.height*0.5, 0.5);
};

ShopScreen.prototype.update = function()
{
	if (this.isVisible){
		drawImageScaled(context, this.background, 0, 0, 0.5);

	    for (var i = 0; i < POWERUPS.length; i++)
	    {
    		var posX = POWERUPS[i].shopPosX;
    		var posY = POWERUPS[i].shopPosY;
    		var alignLeft = POWERUPS[i].alignLeft;
    		
    		this.drawPowerupTitle(POWERUPS[i].name, posX, posY, alignLeft);
    		this.drawPowerupAmount(getLangString("youHave").replace("$", POWERUPS[i].amount), posX, posY + 30, alignLeft);
    		this.drawPowerupCosts(POWERUPS[i].price, posX, posY + 67, alignLeft);
	    }
	    
	    this.drawTotalEggs();
	    this.drawTitle();
	    
	    this.super.update.apply(this, []);
	}
};

ShopScreen.prototype.buyItem = function(itemId)
{
	for (var i = 0; i < POWERUPS.length; i++)
    {
		if (POWERUPS[i].id == itemId){
			
			var newEggAmount = this.game.totalEggs - POWERUPS[i].price;
			if (newEggAmount >= 0){
				this.game.totalEggs = newEggAmount;
				POWERUPS[i].amount++;
				this.game.writeProgress();
			}
		}
    }
	
	this.updateButtons();
};
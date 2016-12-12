/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

MapScreen.prototype = inherit(Screen.prototype);
MapScreen.prototype.super = Screen.prototype;

var MAPSCALE = 0.5;

function MapScreen(context, game, highestReachedLevel)
{
	this.super.constructor.apply(this, [context, game]);
	
	this.maxLevel = highestReachedLevel;
	this.mapButtons = [];
    this.mapImg = loadImage("images/map/map.png");
    this.mapBaseY = 0;
    this.mapOffsetY = 0;
    
    this.miniPlayer = {img:loadImage("images/map/map-game-kaiju.png"), x:0, y:0, offSetX:45, offSetY:10, tweenY:0};
    this.miniPlayerAnim = {counter:0, movementDistance:5, movementSpeed:0.33};
    
    this.emptyButton = loadImage("images/button.png");
    
    this.buttons.push(new Button(context, getLangString("back").toUpperCase(), 19, 17, 136, 70, [this.emptyButton], BUTTON_LAYOUT_SMALL_BUTTON, function(){game.showStartScreen();}, 0.33));
    this.buttons.push(new Button(context, getLangString("shop").toUpperCase(), 651, 17, 136, 70, [this.emptyButton], BUTTON_LAYOUT_SMALL_BUTTON, function(){game.showShopScreen(RETURNSCREEN_MAPSCREEN);}, 0.33));
    if (spil != null && spil.moreGamesAction != null) {
    	this.buttons.push(new Button(context, getLangString("moreGames").toUpperCase(), 19+136+3, 17, 136, 70, [this.emptyButton], BUTTON_LAYOUT_MOREGAMES_SMALL, spil.moreGamesAction, 0.33));	
    }
    
    
	this.createMapButtons(configData.levels); 
};

MapScreen.prototype.reset = function()
{
	this.setButtonHighlights();
	this.centerMapAroundButton(this.mapButtons[this.maxLevel - 1]);
	this.positionMiniPlayer();
};

MapScreen.prototype.positionMiniPlayer = function()
{
	this.miniPlayer.x = (this.mapButtons[this.maxLevel - 1].posX +  this.miniPlayer.offSetX);
	this.miniPlayer.y = (this.mapButtons[this.maxLevel - 1].posY +  this.miniPlayer.offSetY);
};

MapScreen.prototype.unlockLevel = function(level)
{	
	if (level > this.mapButtons.length){
		//TODO: do something awsome
//		console.log("No levels left to unlock!");
		return;
	}
	
	this.maxLevel = level;
	this.miniPlayerAnim.playing = true;
	
	var thisRef = this;
	TweenLite.to(this.miniPlayer, 1, {x:(this.mapButtons[this.maxLevel - 1].posX +  this.miniPlayer.offSetX), y:(this.mapButtons[this.maxLevel - 1].posY +  this.miniPlayer.offSetY), ease:Linear.easeNone, onComplete:function(){
		thisRef.miniPlayerAnim.playing = false;
		thisRef.miniPlayer.tweenY = 0;
		
		thisRef.setButtonHighlights();
	}});
};

MapScreen.prototype.limitMapBaseY = function()
{
	var min = GAME_HEIGHT - (this.mapImg.height*MAPSCALE);
	if (this.mapBaseY > 0) this.mapBaseY = 0;
	if (this.mapBaseY < min) this.mapBaseY = min;
};

MapScreen.prototype.centerMapAroundButton = function(mapButton)
{
	this.mapBaseY = (-mapButton.posY + (GAME_HEIGHT / 2)) - (mapButton.getHeight() / 2);
	this.limitMapBaseY();
};

MapScreen.prototype.handleDragEnd = function()
{
	this.mapBaseY = this.mapBaseY + this.mapOffsetY;
	this.limitMapBaseY();
	this.mapOffsetY = 0;
};	

MapScreen.prototype.handleDrag = function(deltaX, deltaY)
{
	this.mapOffsetY = deltaY;
};	

MapScreen.prototype.setButtonHighlights = function()
{
	for(var i = 0; i < this.mapButtons.length; i++)
	{
		if (i <= (this.maxLevel - 1)){
			this.mapButtons[i].setHighlight(true);
		}else{
			this.mapButtons[i].setHighlight(false);
		}
	}
};

MapScreen.prototype.createMapButtons = function(data)
{
	for(var i = 0; i < data.length; i++)
	{
		this.mapButtons.push(new MapButton(this.context, this.game, Math.floor(data[i].mapposx*1.002)-1, Math.floor(data[i].mapposy*1.002)+57, data[i].id));
	}
};

MapScreen.prototype.handleTap = function(tapPosition)
{
	if ((this.isVisible) && (this.isEnabled)){
		
		for (var i in this.mapButtons)
	    {
			if (this.mapButtons[i].checkClick(tapPosition.x, tapPosition.y)) return true;
	    };
		
	    this.super.handleTap.apply(this, [tapPosition]);
	}
};

MapScreen.prototype.checkMouseOver = function (mousePosition)
{
	if ((this.isVisible) && (this.isEnabled)){
		
	    for (var i in this.mapButtons)
	    {
	    	if (this.mapButtons[i].checkMouseOver(mousePosition.x, mousePosition.y))
	    	{
	    		return true;
	    	}
	    }
	    
	    for (var j in this.buttons)
	    {
	    	if (this.buttons[j].checkMouseOver(mousePosition))
	    	{
	    		return true;
	    	}
	    }
	    
	    return false;
	}
};

MapScreen.prototype.update = function(timeFactor)
{
	if (this.isVisible){
		if (this.miniPlayerAnim.playing){
			var prevCounter = this.miniPlayerAnim.counter; 
			this.miniPlayerAnim.counter += timeFactor;
			var prevWave = Math.sin((prevCounter * this.miniPlayerAnim.movementSpeed));
			
			if (signum(prevWave) != signum(wave)) footStepSound.play();
			
			var wave = Math.sin((this.miniPlayerAnim.counter * this.miniPlayerAnim.movementSpeed));
			this.miniPlayer.tweenY = (this.miniPlayerAnim.movementDistance * Math.abs(wave));
		};
		
		var mapY = this.mapBaseY + this.mapOffsetY;
		if (mapY > 0) mapY = 0;
		if (mapY < (GAME_HEIGHT - this.mapImg.height)) mapY = (GAME_HEIGHT - this.mapImg.height);
		
		drawImageScaled(context, this.mapImg, 0, mapY, MAPSCALE);
		
		for(var i = 0; i < this.mapButtons.length; i++)
		{
			this.mapButtons[i].update(mapY);
		}
		
		drawImageScaled(context, this.miniPlayer.img, this.miniPlayer.x, this.miniPlayer.y + mapY + this.miniPlayer.tweenY, 0.5);
		
		 context.font = "" + 72 + 'px dimboregular';
		context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
		context.lineWidth = 8;
	    context.strokeStyle = '#032d41';
	    context.textAlign = 'left';
	    context.fillStyle = "white";
	    strokedText(context, getLangString("map").toUpperCase(), 350,75);
		
	    this.super.update.apply(this, []);
	}
};
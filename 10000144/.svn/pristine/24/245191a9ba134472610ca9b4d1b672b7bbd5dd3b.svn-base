/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function MapButton(context, game, posX, posY, level)
{
	var HIT_BOX_WIDTH = 67;
	var HIT_BOX_HEIGHT = 41;

	this.context = context;
	this.game = game;
	this.posX = posX;
	this.posY = posY;
	
	var isHighlighted = false;
	
	var spotImg = loadImage("images/map/map-game-zwartvlakje.png");
	
	var thisRef = this;
	this.hitBox = new HitBox(posX, posY, HIT_BOX_WIDTH, HIT_BOX_HEIGHT, function(){ thisRef.handleButtonClicked();}, context);
	
	this.getHeight = function()
	{
		return spotImg.height;
	};
	
	this.handleButtonClicked = function()
	{
		console.log("click map button");
		this.game.showPreLevelScreen(level);
	};
	
	this.update = function(mapY)
	{
		if(!isHighlighted){
			this.context.drawImage(spotImg, this.posX, this.posY + mapY);
		}
		
		this.hitBox.setPosition(this.posX, this.posY + mapY);
		this.hitBox.update();
	};
	
	this.setHighlight = function(highlight)
	{
		isHighlighted = highlight;
	};
	
    this.checkMouseOver = function(mouseX, mouseY)
    {
    	if(isHighlighted){
    		return this.hitBox.checkMouseOver(mouseX, mouseY);
    	};
    	
    	return false;
    };

    this.checkClick = function(mouseX, mouseY)
    {
    	if(isHighlighted){
    		return this.hitBox.checkClick(mouseX, mouseY);
    	}
    	
    	return false;
    };
}
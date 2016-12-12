/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

EndScreen.prototype = inherit(Screen.prototype);
EndScreen.prototype.super = Screen.prototype;

function EndScreen(context, game)
{
	this.super.constructor.apply(this, [context, game]);
	
	this.overlayImg = loadImage("images/pixelkaiju-map-blackoverlay.png");
    this.popupBackgroundImg = loadImage("images/pixelkaiju-map-popup.png");
    
    var buttonImg = loadImage("images/button.png");
    
    var mg = (spil != null && spil.moreGamesAction != null);
    
    var bbLeft = 175 - (mg ? 45 : 0);
    var bbRight = 626 + (mg ? 45 : 0);
    var bbWidth = bbRight-bbLeft;
    var bbBWidth = 136;
    var bbCount = 3 + (mg ? 1 : 0);
    var bbSpacing = (bbWidth-bbBWidth)/(bbCount-1);
    
    this.buttons.push(new Button(context, getLangString("replay").toUpperCase(), bbLeft + (0*bbSpacing), 350, bbBWidth, 70, [buttonImg], BUTTON_LAYOUT_SMALL_BUTTON, function(){game.startLevel(-1);}, 0.33));
    this.buttons.push(new Button(context, getLangString("map").toUpperCase(), bbLeft + (1*bbSpacing), 350, bbBWidth, 70, [buttonImg], BUTTON_LAYOUT_SMALL_BUTTON, function(){
    	if (spil != null) spil.showAd();
    	game.endLevel();
    }, 0.33));
    this.buttons.push(new Button(context, getLangString("shop").toUpperCase(), bbLeft + (2*bbSpacing), 350, bbBWidth, 70, [buttonImg], BUTTON_LAYOUT_SMALL_BUTTON, function(){
    	game.showShopScreen(RETURNSCREEN_ENDSCREEN);
    }, 0.33));
    if (mg) {
    	this.buttons.push(new Button(context, getLangString("moreGames").toUpperCase(), bbLeft + (3*bbSpacing), 350, bbBWidth, 70, [buttonImg], BUTTON_LAYOUT_MOREGAMES_SMALL, spil.moreGamesAction, 0.33));	
    }
    
    this.result = {eggs:0, score:0, hits:0, succes:false};
};

EndScreen.prototype.setResult = function(eggs, score, hits, succes)
{
	if (typeof succes === "undefined") debugger;
	 this.result.eggs = eggs;
	 this.result.score = score;
	 this.result.hits = hits;
	 this.result.succes = succes;
};

EndScreen.prototype.update = function(timeFactor)
{
	if (this.isVisible){
		context.drawImage(this.overlayImg, 0, 0);
		context.drawImage(this.popupBackgroundImg, 0, 0);
	    
	    var titleText = getLangString(this.result.succes ? "wellDone" : "youFailed").toUpperCase();
	    
	    this.drawTitle(titleText);
	    
		context.font = "bold " + 32 + 'px dimboregular';
	    context.textAlign = 'left';
	    context.lineJoin = 'round';
		context.lineWidth = 6;
	    context.strokeStyle = 'black';
	    context.fillStyle = "white";

	    strokedText(context, getLangString("hits").replace("$", this.result.hits), 300, 210);
	    strokedText(context, getLangString("eggs").replace("$", this.result.eggs), 300, 250);
	    strokedText(context, getLangString("score").replace("$", this.result.score), 300, 290);
	    //context.fillText("succes: " + this.result.succes, 300, 150);
	    
	    this.super.update.apply(this, []);
	}
};

EndScreen.prototype.drawTitle = function(text)
{
    context.font = "" + 75 + 'px dimboregular';
	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	context.lineWidth = 8;
    context.strokeStyle = '#032d41';
    context.textAlign = 'left';
    context.fillStyle = "white";
    
    var textX = (GAME_WIDTH / 2) - (context.measureText(text).width / 2);
    
    context.strokeText(text, textX, 120);
    context.fillText(text, textX, 120);
};
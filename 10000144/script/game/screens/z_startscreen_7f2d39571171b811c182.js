/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

StartScreen.prototype = inherit(Screen.prototype);
StartScreen.prototype.super = Screen.prototype;

function StartScreen(context, game)
{
	this.super.constructor.apply(this, [context, game]);
	
    this.backgroundImg = loadImage("images/bg.jpg");
    
    //Sound on/off button
	this.soundButtonImg = loadImage("images/audiobutton.png");
//	this.soundButtonImgOn = loadImage("images/muziek-aan.png");
	
	var thisRef = this;
	this.soundButton = new Button(context, "", 670, 24, 117, 31, [this.soundButtonImg], BUTTON_LAYOUT_DEFAULT, function(){thisRef.toggleSound();}, 0.44);
    this.buttons.push(this.soundButton);
    this.updateSoundButton();
    
    this.emptyButton = loadImage("images/button.png");
    
    var mg = (spil != null && spil.moreGamesAction != null);
    var offsetY = mg ? (285-378) : 0;
    this.buttons.push(new Button(context, getLangString("start").toUpperCase(), 21, 285 + offsetY, 178, 89, [this.emptyButton], BUTTON_LAYOUT_NORMAL_BUTTON, function(){game.showMapScreen();}, 0.44));
    this.buttons.push(new Button(context, getLangString("shop").toUpperCase(), 21, 378 + offsetY, 178, 89, [this.emptyButton], BUTTON_LAYOUT_NORMAL_BUTTON, function(){game.showShopScreen(RETURNSCREEN_STARTSCREEN);}, 0.44));
    if (mg) {
   		this.buttons.push(new Button(context, getLangString("moreGames").toUpperCase(), 21, 378, 178, 89, [this.emptyButton], BUTTON_LAYOUT_MOREGAMES, spil.moreGamesAction, 0.44));	
    }
    
    this.leftTitle = {image:loadImage("images/titlescreen/title1.png"), x:61, y:-112};
    this.centerTitle = {image:loadImage("images/titlescreen/title2.png"), x:240, y:-173};
    this.rightTitle = {image:loadImage("images/titlescreen/title3.png"), x:559, y:-115};
    this.kaiju = {image:loadImage("images/titlescreen/kaiju.png"), x:-234, y:228};
    this.egg1 = {image:loadImage("images/titlescreen/egg.png"), x:800, y:359};
    this.egg2 = {image:loadImage("images/titlescreen/egg.png"), x:912, y:359}; 
};

StartScreen.prototype.animateScreen = function()
{
	TweenLite.to(this.leftTitle, 0.5, {y:46, delay:0, ease:Bounce.easeOut});
	TweenLite.to(this.centerTitle, 0.5, {y:27, delay:0.3, ease:Bounce.easeOut});
	TweenLite.to(this.rightTitle, 0.5, {y:46, delay:0.6, ease:Bounce.easeOut});
	TweenLite.to(this.kaiju, 0.5, {x:295, delay:0.6, ease:Expo.easeOut});
	TweenLite.to(this.egg1, 0.5, {x:577, delay:0.6, ease:Expo.easeOut});
	TweenLite.to(this.egg2, 0.5, {x:689, delay:0.6, ease:Expo.easeOut});
};

StartScreen.prototype.update = function(timeFactor)
{
	if (this.isVisible) {
		
		drawImageScaled(this.context, this.backgroundImg, 0, 0, 0.5);
		drawImageScaled(this.context, this.leftTitle.image, this.leftTitle.x, this.leftTitle.y, 0.5);
		drawImageScaled(this.context, this.centerTitle.image, this.centerTitle.x, this.centerTitle.y, 0.5);
		drawImageScaled(this.context, this.rightTitle.image, this.rightTitle.x, this.rightTitle.y, 0.5);

		drawImageScaled(this.context, this.egg1.image, this.egg1.x, this.egg1.y, 0.5);
		drawImageScaled(this.context, this.egg2.image, this.egg2.x, this.egg2.y, 0.5);
		drawImageScaled(this.context, this.kaiju.image, this.kaiju.x, this.kaiju.y, 0.5);
		
		this.super.update.apply(this, []);
		
		var tx = 700;
		var ty = 39;
		this.context.font = " " + 20 + 'px dimboregular';
		this.context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
		this.context.lineWidth = 3;
		this.context.strokeStyle = '#032d41';
		this.context.textAlign = 'left';
		
		drawRichText(this.context, tx, ty, [
			[getLangString("music")+" ", "white"],
			[getLangString(muteManual ? "off" : "on"), "yellow"]
		]);
	    
	}
};

StartScreen.prototype.updateSoundButton = function() {
//	this.soundButton.setImage(Howler._muted ? this.soundButtonImgOff : this.soundButtonImgOn);
//	this.soundButton.setText(Howler._muted ? "muziek uit" : "muziek aan");
};

StartScreen.prototype.toggleSound = function()
{
	toggleSound();
	this.updateSoundButton();
};
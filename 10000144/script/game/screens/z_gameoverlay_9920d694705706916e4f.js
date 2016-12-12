/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

//NOT USED ATM

//
//GameOverlay.prototype = inherit(Screen.prototype);
//GameOverlay.prototype.super = Screen.prototype;
//
//function GameOverlay(context, game)
//{
//	this.super.constructor.apply(this, [context, game]);
//	
//	this.alwaysOnTop = true;
//	
//	this.soundButtonImgOff = loadImage("images/muziek-uit.png");
//	this.soundButtonImgOn = loadImage("images/muziek-aan.png");
//	
//	var thisRef = this;
//	this.soundButton = new Button(context, "", 662, 432, 117, 31, [this.soundButtonImgOff], BUTTON_LAYOUT_DEFAULT, function(){thisRef.toggleSound();});
//    this.buttons.push(this.soundButton);
//};
//
//GameOverlay.prototype.update = function(timeFactor)
//{
//	if (this.isVisible){
//	    this.super.update.apply(this, []);
//	}
//};
//
//GameOverlay.prototype.toggleSound = function()
//{
//	if (soundMuted){
//		soundMuted = false;
//		Howler.unmute();
//		this.soundButton.setImage(this.soundButtonImgOff);
//	}else{
//		soundMuted = true;
//		Howler.mute();
//		this.soundButton.setImage(this.soundButtonImgOn);
//	}
//};
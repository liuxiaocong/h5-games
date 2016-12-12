/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

LoadingScreen.prototype = inherit(Screen.prototype);
LoadingScreen.prototype.super = Screen.prototype;

function LoadingScreen(context, game)
{
	this.super.constructor.apply(this, [context, game]);
	
    //private vars
//    this.loadTextCounter = 0;
//    this.loadText;
    this.loadingImg = loadImage("images/bg.jpg");
    this.barBg = loadImage("images/loadScreen/barBg.png");
    this.barFill = loadImage("images/loadScreen/barFill.png");
    
    var self = this;
    this.animFrames = 5;
    function afLoaded() {
    	
    }
    function lf(f) {
    	return loadImage("images/loadScreen/dance/" + f + ".png", function() { self.animFrames--; });
    }
    var ass1 = lf("ass1");
    var ass2 = lf("ass2");
    var ass3 = lf("ass3");
    var left = lf("left1");
    var right = lf("right1");
    
    this.anim = [
        right,right,right,right,ass1,left,left,left,left,ass3,ass2,ass2,ass3,ass1,ass3,ass3,ass3,ass2,ass2,ass3,ass1,ass3,ass3
	];
    
    this.scroll = 0;
    
    this.targetLoad = 0;
    
};

LoadingScreen.prototype.update = function(timeFactor)
{
	
	this.scroll += timeFactor;
	
	if (needToLoad > this.targetLoad || needToLoad == 0) this.targetLoad = needToLoad;
	
	if (this.isVisible){
		
		context.save(); {
			context.scale(0.5,0.5);

			context.drawImage(this.loadingImg, 0, 0);
			
			var l = getLangString("loading");

			context.font = "bold " + 72 + "px dimboregular";
		    context.textAlign = 'left';
		    context.fillStyle = "white";
		    context.lineWidth = 8;
		    context.strokeStyle = 'black';
		    
		    var tw = context.measureText(l).width;
		    
		    context.save(); {
		    	context.translate(GAME_WIDTH, GAME_HEIGHT-10);
		    	
		    	var animScale = 0.75;
		    	var headerWidth = tw + 20 + (animScale*136);
		    	
		    	context.translate(-headerWidth/2,0);
		    
		    	strokedText(context, l, headerWidth-tw, 0);
		    
		    	// anim
			    context.scale(0.75,0.75);
			    context.translate(0, -this.anim[0].height+5);
			    if (this.animFrames == 0) {
			    	context.drawImage(this.anim[Math.floor(this.scroll*0.15) % this.anim.length], 0, 0);
			    }
			    
		    } context.restore();
		    
		    // bar
		    try {
		    	
		    	context.translate(GAME_WIDTH, GAME_HEIGHT+10);
		    	context.scale(0.75,0.75);
		    	
		    	var barWidth = this.barBg.width;
		    	var barHeight = this.barBg.height;
		    	var barX = -(barWidth/2);
		    	var barY = 0;
		    	var border = 7;
		    	
		    	context.drawImage(this.barBg, barX, barY);
		    	
		    	var offset = this.scroll;
		    	
		    	context.translate(offset,0);
		    	
		    	var progress = 1-(needToLoad/this.targetLoad);
		    	
		    	var pat = context.createPattern(this.barFill, "repeat");
		    	context.fillStyle = pat;
		    	context.fillRect(barX-offset+border,barY+border,progress*(barWidth-(border*2)),barHeight-(border*2));
		    	
		    	
		    } catch (e) {}
			
		} context.restore();
			    
		this.super.update.apply(this, []);
	}
};
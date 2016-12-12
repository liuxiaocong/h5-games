/**
 * Created by Christiaan Duim on 10-10-13.
 */

"use strict";

function GameObject(context, lane, level, imageData)
{
    //this.superVar = 10;
    //console.log("super var superclass" + this.superVar);

    this.level = level;
    this.lane = lane;
    this.context = context;

    this.imageData = imageData;
    this.img = imageData.img;
    this.canCollide = false;
    this.side = ROAD_SIDE_CENTER;
    this.canBeJumped = true;
    this.scale = 0;
    
    this.randomFlip = Math.random() > 0.5;
    
    this.nextPosition = new Point(0, 0);
    this.width = 0;
    this.height = 0;
    
    //this.maximumPositions = this.lane.MAX_POSITIONS - 1;
    //this.alpha = 0;
    //this.pointsToFadeIn = 0.2; //0.25; //The object will fade-in over the cource of 0.25 points
    //this.fadeInMultiplier = 1 / this.pointsToFadeIn;
    //this.pointsToFadeOut = 7; //2;
    //this.fadeOutStartingPoint = this.maximumPositions - this.pointsToFadeOut;
    //this.percentageToFadeIn = 0.02;
    this.fadeInFactor = 1 / OBSTACLE_FADE_IN_PERCENTAGE;
    
    this.currentIndex = 0;
    this.baseScale = imageData.baseScale * (1+Math.random()*imageData.scaleVar); //0.05;//0.125;
    //this.maxScale = this.baseScale * this.lane.perspectiveFactor;
    //this.scaleDifference =  this.maxScale - this.baseScale;
    
    this.effectiveRoadHeight = GAME_HEIGHT - HORIZON_Y; //From the horizon to the bottom of the screen
    
    this.tweeningToPlayer = false;
    this.tweenStartingPoint = new Point(0, 0);
    this.tweenProgress = 0;
    this.tweenBezierHeight = 0;
    
    this.x = 0;
    this.percentageOnRoad = 0;
};

GameObject.prototype.calculateAlpha = function(percentageOnRoad)
{
	  return (percentageOnRoad < OBSTACLE_FADE_IN_PERCENTAGE ? percentageOnRoad * this.fadeInFactor : 1);
};

GameObject.prototype.update = function(speed)
{
	if (this.tweeningToPlayer){
		
		if (this.tweenProgress >= 1)
		{
			console.error("tweenProgress >= 1, should not happen");
			//this.tweeningToPlayer = false;
			//this.handleTweenToPlayerDone();
			this.nextPosition = 0;
		}else{
			var playerCenter = new Point(this.level.player.referenceX, this.level.player.referenceY);
			//var playerCenter = new Point(this.level.player.referenceX + (level.calculateCurve(this.level.player.referenceY)), this.level.player.referenceY);
			var tweenEndPoint = playerCenter;
			var curveTop = tweenEndPoint.y - this.tweenBezierHeight;
			var curvePoint1 = new Point(this.tweenStartingPoint.x, curveTop);
			var curvePoint2 = new Point(playerCenter.x, curveTop);
			
			var nextPoint = getBezierPoint(this.tweenProgress, this.tweenStartingPoint, curvePoint1, curvePoint2, tweenEndPoint);
			this.nextPosition = nextPoint;
			this.tweenProgress += COIN_MOVE_SPEED;
			
			//console.log("playerCenter: " + playerCenter.x + ", " + playerCenter.y + " : " + this.tweenStartingPoint.x + ", " + this.tweenStartingPoint.y);
			//console.log("curvePoint1: " + curvePoint1.x + ", " + curvePoint1.y + " curvePoint2: " + curvePoint2.x + ", " + curvePoint2.y);
		}
		
		
	}else{
		this.nextPosition = this.lane.getNextPosition(this.currentIndex);//currentIndex);
	}
	
    if (this.nextPosition != null){
    		
    	this.currentIndex += speed;
    	
    	this.percentageOnRoad = (this.nextPosition.y - HORIZON_Y) / this.effectiveRoadHeight;
    
        //Determine scale
    	if (this.tweeningToPlayer){
    		this.scale -= ((this.scale - 0.3) * COIN_MOVE_SPEED); // * this.tweenProgress;
    	}else{
    		//this.scale =  this.baseScale + (this.scaleDifference * percentageOnRoad); //(perspectiveIndex / this.maximumPositions));
    		this.scale =  this.baseScale + (((this.baseScale * this.lane.perspectiveFactor) - this.baseScale) * this.percentageOnRoad); //(perspectiveIndex / this.maximumPositions));
    	}
    	
        this.width = this.img.width * this.scale * this.imageData.imgScale;
        this.height = this.img.height * this.scale * this.imageData.imgScale;

    
        
        //x = this.nextPosition.x;
        //x = (this.nextPosition.x - (this.width * this.side)) + this.level.calculateCurve(this.nextPosition.y);  //+ een stukje in de richting
//        if (this.tweeningToPlayer){
//        	x = (this.nextPosition.x - (this.width * this.side)) ;  //+ een stukje in de richting
//        }
        
        if (this.tweeningToPlayer){
        	this.x = this.nextPosition.x;
        }else{
        	this.x = (this.nextPosition.x - (this.width * this.side)) + this.level.calculateCurve(this.nextPosition.y);  //+ een stukje in de richting
        }
        

        if ((this.x < -this.width)||(this.x > GAME_WIDTH)){
        	this.handleEndOfPath();
        }
        
        if (this.canCollide){
        	this.checkCollision(this.percentageOnRoad, this.nextPosition.x, this.nextPosition.y);
        }

    }else{
    	this.handleEndOfPath();
    }
};

GameObject.prototype.draw = function() {
	
	if (this.nextPosition == null) return;

	//Draw image 
    this.context.save(); {
   
    	this.context.globalAlpha = this.calculateAlpha(this.percentageOnRoad);
	
		var flip;
	    switch(this.imageData.flipStyle) {
	        case GO_FLIPSTYLE_SIDE:
	        	flip = this.side == 0;
	        	break;
	        case GO_FLIPSTYLE_SIDEREVERSE:
	        	flip = this.side == 1;
	        	break;
	        case GO_FLIPSTYLE_RANDOM:
	        	flip = this.randomFlip;
	        	break;
	        case GO_FLIPSTYLE_NONE:
	        default:
	        	flip = false;
	        	break;
	    }
	    
	    this.context.translate(this.x, this.nextPosition.y - this.height);
	    if (flip) {
	    	this.context.translate(this.width,0);
	    	this.context.scale(-1, 1);
	    }
	    
    	this.context.drawImage(this.img, 0, 0, this.width, this.height);

    } this.context.restore();
	
    if (DRAW_REFERENCE_POINTS){
    	this.drawReferencePoints(this.nextPosition.x, this.nextPosition.y);
    }
    
};


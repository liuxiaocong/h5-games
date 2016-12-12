/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function Player(context, level)
{
	var PLAYER_ANIM_DEAD = "dead";
	var PLAYER_ANIM_CHEER = "cheer";
	
    var level = level;
    var context = context;

    this.defaultY = 300; //400;
    var LEFT_MOST_X = 130; //130;  //160; //50;
    var RIGHT_MOST_X = 670;//670; //820; //930;
    var X_MOVEMENT_SPACE = RIGHT_MOST_X - LEFT_MOST_X;
    var leftMost = new Point(LEFT_MOST_X, this.defaultY);
    var rightMost = new Point(RIGHT_MOST_X, this.defaultY);

    var ANGLE_CENTER = 3;
    var playerAngle = ANGLE_CENTER;
    
    var width;
    var height;
    
    //Jumping
    var jumping = false;
	var jumpCounter = 0;
	var jumpProgress = 0;  //100% = at top of jump 0% = down again or starting to jump
	var jumpGoingUp = true;
	var previousJumpProgress = 0;

    var HIT_COOLDOWN = 25;
    this.hitCoolDownCounter = 0;

    this.positionOnRoad = 50;   //Start in the center of the road (for the x-axis)
    this.laneId = 3;

    this.upperLeftPoint = new Point(0, 0);
    this.bottomRightPoint = new Point(0, 0);
    this.referenceX = 0;
    this.referenceY = 0;
    this.playerX = 0;
    this.alpha = 1;

    var collisionWidth = 120; //135//150;//120;
    this.spinning = false;
    var spinCounter = 0;
    var spinDirection = "";
    var DIRECTION_LEFT = 0;
    var DIRECTION_RIGHT = 1;
    var dead = false;
    var finalAnimCounter = 0;
    var finalAnim = "";
    
    var showHitAnim = false;
    var showHitCounter = 0;
    var showHitSide = 0;
    var HIT_ANIM_TIME = 13; //7;

    var drivingSpeed = 0;
    var moving = false;
    //var movingLeft = true;
    //var movingRight = true;
    var jumpHeight = 0;
    
    var prevMovingLeft = false;
    var prevMovingRight = false;
    
    var LANES = [15,50,85];
    var targetLane = 1;

    var SPIN_TIME = 45; //40; //20;
    var TOP_SPEED = 3.5;
    var MOVING_SPEED = 2.5; //0.2; //0.15;
    var TO_RADIANS = Math.PI/180;
    
    var spilledSauceBottles = [];
    var collisionYOffset = 50;
    
    var moveCounter = 0;
    var playerFramesStraight = [loadImage("images/player/pixelkaiju-running-normal01-v2.png"), loadImage("images/player/pixelkaiju-running-normal02-v2.png"), loadImage("images/player/pixelkaiju-running-normal03-v2.png"), loadImage("images/player/pixelkaiju-running-normal04-v2.png"), loadImage("images/player/pixelkaiju-running-normal05-v2.png"), loadImage("images/player/pixelkaiju-running-normal06-v2.png")];
    var playerFramesStraightJump = [loadImage("images/player/pixelkaiju-jump-normal01.png"), loadImage("images/player/pixelkaiju-jump-normal02.png"), loadImage("images/player/pixelkaiju-jump-normal03.png"), loadImage("images/player/pixelkaiju-jump-normal04.png"), loadImage("images/player/pixelkaiju-jump-normal05.png"), loadImage("images/player/pixelkaiju-jump-normal06.png"), loadImage("images/player/pixelkaiju-jump-normal07.png"), loadImage("images/player/pixelkaiju-jump-normal08.png")];
    var playerFramesLeft = [loadImage("images/player/pixelkaiju-running-side01.png"), loadImage("images/player/pixelkaiju-running-side02.png"), loadImage("images/player/pixelkaiju-running-side03.png"), loadImage("images/player/pixelkaiju-running-side04.png"), loadImage("images/player/pixelkaiju-running-side05.png"), loadImage("images/player/pixelkaiju-running-side06.png"), loadImage("images/player/pixelkaiju-running-side07.png"), loadImage("images/player/pixelkaiju-running-side08.png")];
    var playerFramesLeftJump = [loadImage("images/player/pixelkaiju-jump-side01.png"), loadImage("images/player/pixelkaiju-jump-side02.png"), loadImage("images/player/pixelkaiju-jump-side03.png"), loadImage("images/player/pixelkaiju-jump-side04.png"), loadImage("images/player/pixelkaiju-jump-side05.png"), loadImage("images/player/pixelkaiju-jump-side06.png"), loadImage("images/player/pixelkaiju-jump-side07.png"), loadImage("images/player/pixelkaiju-jump-side08.png")];
//    var playerFramesRight = [loadImage("images/player/pixelkaiju-running-right01.png"), loadImage("images/player/pixelkaiju-running-right02.png"), loadImage("images/player/pixelkaiju-running-right03.png"), loadImage("images/player/pixelkaiju-running-right04.png"), loadImage("images/player/pixelkaiju-running-right05.png"), loadImage("images/player/pixelkaiju-running-right06.png"), loadImage("images/player/pixelkaiju-running-right07.png"), loadImage("images/player/pixelkaiju-running-right08.png")];
//    var playerFramesRightJump = [loadImage("images/player/pixelkaiju-jump-right01.png"), loadImage("images/player/pixelkaiju-jump-right02.png"), loadImage("images/player/pixelkaiju-jump-right03.png"), loadImage("images/player/pixelkaiju-jump-right04.png"), loadImage("images/player/pixelkaiju-jump-right05.png"), loadImage("images/player/pixelkaiju-jump-right06.png"), loadImage("images/player/pixelkaiju-jump-right07.png"), loadImage("images/player/pixelkaiju-jump-right08.png")];
    
    var playerShadowImg = loadImage("images/player/pixelkaiju-shadow.png");
    
    var playerFramesHit = [loadImage("images/player/pixelkaiju-death01-left.png"), loadImage("images/player/pixelkaiju-death01-right.png")];
    
    //var spinFrames = [loadImage("images/bus55.png"), loadImage("images/bus51.png"), loadImage("images/bus50.png"), loadImage("images/bus48.png"), loadImage("images/bus40.png"), loadImage("images/bus40.png"), loadImage("images/bus34.png"), loadImage("images/bus34.png"), loadImage("images/bus30.png"), loadImage("images/bus30.png"), loadImage("images/bus25.png"), loadImage("images/bus25.png"), loadImage("images/bus20.png"), loadImage("images/bus20.png"), loadImage("images/bus12.png"), loadImage("images/bus10.png"), loadImage("images/bus9.png"), loadImage("images/bus6.png"), loadImage("images/bus60.png")];
    var spinFrames = [loadImage("images/player/pixelkaiju-running-side01.png"), loadImage("images/player/pixelkaiju-running-normal01-v2.png"),loadImage("images/player/pixelkaiju-running-right01.png")];
    
    var playerFramesDead = [loadImage("images/player/pixelkaiju-death01-left.png"), loadImage("images/player/pixelkaiju-death02.png"), loadImage("images/player/pixelkaiju-death03.png"), loadImage("images/player/pixelkaiju-death04.png")];
    var playerFramesCheer = [loadImage("images/player/pixelkaiju-cheer01.png"), loadImage("images/player/pixelkaiju-cheer02.png"), loadImage("images/player/pixelkaiju-cheer03.png"), loadImage("images/player/pixelkaiju-cheer04.png"), loadImage("images/player/pixelkaiju-cheer05.png"), loadImage("images/player/pixelkaiju-cheer06.png")];
    
    var deadAnim = {ticksToVanish:130, ticksToFadeIn:50, ticksToMoveUp:10, baseMovementDistance:2, baseMovementSpeed:0.1, movementDistanceIncreaseFactor:2, ySpeedIncreaseFactor:75};
    var ghostImg = loadImage("images/player/pixelkaiju-ghost.png");
    var ghostCounter = 0;
    var ghostAnimDone = false;
    
    var finishTweenActive = false;
    this.posX;
    this.posY;
    
    this.getNextPlayerSprite = function(speed)
    {
    	var playerSprite = null;
        var frameNumber = 0;
        
        if (finalAnim == PLAYER_ANIM_DEAD)
        {
        	frameNumber = Math.floor(finalAnimCounter / 10) % playerFramesDead.length;
            if (finalAnimCounter > playerFramesDead.length){
            	frameNumber = playerFramesDead.length - 1;
            }
            playerSprite = playerFramesDead[frameNumber];
        }else if (finalAnim == PLAYER_ANIM_CHEER)
        {
//        	frameNumber = Math.floor(finalAnimCounter / 20) % playerFramesCheer.length;
//            if (finalAnimCounter > playerFramesCheer.length){
//            	frameNumber = playerFramesCheer.length - 1;
//            }
            frameNumber = Math.floor(finalAnimCounter / 6) % playerFramesCheer.length;
            
            playerSprite = playerFramesCheer[frameNumber];
        	
        }else if (showHitAnim){
        		playerSprite = playerFramesHit[showHitSide];

        }else if (this.spinning)
        {
        	frameNumber = Math.floor(spinCounter / 1.25) % spinFrames.length;
        	playerSprite = spinFrames[frameNumber];
        }else{
            if (jumping){
            	
            	//Jumping up
            	if (jumpGoingUp){
            		
            		if (jumpProgress < 0.2){
            			frameNumber = 0;
                	}else if (jumpProgress < 0.4){
                		frameNumber = 1;
                	}else if (jumpProgress < 0.6){
                		frameNumber = 2;
                	}else{
                		frameNumber = 3;
                	}
            		
            	//Falling down again
            	}else{
            		if (jumpProgress > 0.8){
            			frameNumber = 3;
                	}else if (jumpProgress > 0.6){
                		frameNumber = 4;
                	}else if (jumpProgress > 0.4){
                		frameNumber = 5;
                	}else if (jumpProgress > 0.2){
                		frameNumber = 6;
                	}else{
                		frameNumber = 7;
                	}
            	}

        		if (playerAngle == ANGLE_CENTER){
        			playerSprite = playerFramesStraightJump[frameNumber];
	        	}else if (playerAngle > ANGLE_CENTER) {
	        		playerSprite = playerFramesLeftJump[frameNumber];
	        	}else if (playerAngle < ANGLE_CENTER) {
	        		playerSprite = playerFramesLeftJump[frameNumber];
	        	}
        		
            }else{
            	
            	var spriteArray = [];
            	var frameSpeed  = 3;
            	
          		if (playerAngle == ANGLE_CENTER){
          			spriteArray = playerFramesStraight;
          			frameSpeed = 4;
	        	}else if (playerAngle > ANGLE_CENTER) {
	        		spriteArray = playerFramesLeft;
	          	}else if (playerAngle < ANGLE_CENTER){
	          		spriteArray = playerFramesLeft;
	        	}
          		
          		
          		//console.log("speed: " + speed)
          		//var percentageOfTopSpeed = (speed - STARTING_SPEED) / (MAX_SPEED - STARTING_SPEED);
          		//console.log("percentageOfTopSpeed: " + percentageOfTopSpeed);
          		//var frameSpeed = 3 - (1 * percentageOfTopSpeed);
          		
          		frameNumber = Math.floor(moveCounter / frameSpeed) % spriteArray.length;
          		playerSprite = spriteArray[frameNumber];
            }
        }
        
        return playerSprite;
        
    };
    
    this.update = function(speed, timeFactor, currentCurve, currentDistance)
    {
    	 //console.log("aaaa movingRight: " + movingRight + " movingLeft: " + movingLeft)
        
    	moveCounter += timeFactor;
    	
    	if (showHitAnim){
    		showHitCounter += timeFactor;
    		if (showHitCounter >= HIT_ANIM_TIME)
    		{
    			showHitAnim = false;
    			showHitCounter = 0;
    		}
    	}
    	
        if (this.spinning)
        {
            spinCounter += timeFactor;
            if (spinDirection == DIRECTION_LEFT){
                this.moveLeft();
            }else if (spinDirection == DIRECTION_RIGHT){
                this.moveRight();
            }
            
            //console.log("bbbb movingRight: " + movingRight + " movingLeft: " + movingLeft);

            if (spinCounter >= SPIN_TIME)
            {
                this.stopSpinning();
            }
        }

    	this.applyMovement(timeFactor);
    	 
        if (finalAnim != "") {
        	drivingSpeed = 0;
        	movingLeft = false;
        	movingRight = false;
            finalAnimCounter += timeFactor;
        }

        this.hitCoolDownCounter -= 1 * timeFactor;

        //leftMost.x = LEFT_MOST_X; //+ (currentCurve / 2);
        //rightMost.x = RIGHT_MOST_X; //+ (currentCurve /2);

        //Change angle to match the curve
        if (currentCurve > (level.MAX_CURVE / 2)){
        	playerAngle++;
        }else if(currentCurve < (-level.MAX_CURVE / 2)){
        	playerAngle--;
        }
        
        var playerSprite = this.getNextPlayerSprite(speed);
        width = playerSprite.width;
        height = 159; //height of normal running anim  //playerSprite.height;

        var positionOnRoadFactor = this.positionOnRoad / 100;
        
        this.posX = leftMost.x + (X_MOVEMENT_SPACE * positionOnRoadFactor) - (width / 2);
        
        if (!finishTweenActive){
        	this.posY = leftMost.y - jumpHeight; //+ ((rightMost.y - leftMost.y) * positionOnRoadFactor);
        }else{
        	this.posY -= jumpHeight; //+ ((rightMost.y - leftMost.y) * positionOnRoadFactor);
        }
        //y -= jumpHeight;
        
        this.upperLeftPoint.x = this.posX +  ((width - collisionWidth) / 2);
        this.upperLeftPoint.y = this.posY + collisionYOffset;
        this.bottomRightPoint.x = this.posX + width - ((width - collisionWidth) / 2);
        //this.bottomRightPoint.x = this.upperLeftPoint.x + width; //x + width - ((width - collisionWidth) / 2);
        this.bottomRightPoint.y = this.posY + (height); // - collisionYOffset);
        //this.bottomRightPoint.y = this.upperLeftPoint.y + height; //y + (height - collisionYOffset);
        
        //level.hud.setDebugValue("height: " + height + " collisionYOffset: " + collisionYOffset);
        
       // console.log("upperLeftPoint.y : " + this.upperLeftPoint.y + " bottomRightPoint.y: " + this.bottomRightPoint.y + "height: " + height);
        
        //this.referenceX = x + (width / 2);
        this.referenceY = this.posY + (height / 2);
        
        if (level.headstartMode){
    		this.upperLeftPoint.y -= (this.bottomRightPoint.y - this.upperLeftPoint.y) / 2;
    		//this.bottomRightPoint.y += (this.bottomRightPoint.y - this.upperLeftPoint.y) / 3;
    	}
        
        this.positionOnRoadPixels = ((positionOnRoadFactor - 0.5) * X_MOVEMENT_SPACE); //The center has to be 0, so thats why -0.5;

        this.posY += jumpHeight;
        //ENABLE_PARALAX_SCROLLING = false;
        this.posX += (level.calculateCurve(this.posY + (height * 0.75)) * 0.1) + (currentCurve / 2); // ((LEFT_MOST_X + rightMost.x) /2) - (width / 2);
        
        //Make up for the paralax scrolling
        //TODO: mooier doen.
        if (ENABLE_PARALAX_SCROLLING){
        	this.posX -= ((this.posY + (height * 0.75)) - HORIZON_Y) / (PARALAX_STRENGTH - HORIZON_Y) * this.positionOnRoadPixels;
        }
        
        this.referenceX = this.posX + (width / 2);
      
        
        context.save(); {
        	
	        context.globalAlpha = this.alpha;
	        
	        //y -= jumpHeight;
	        
	        //Draw shadow
	        var jumpDistanceFactor = (1-(jumpProgress * 0.5));
	        var shadowWidth = (playerShadowImg.width * ((finalAnim == PLAYER_ANIM_DEAD)?2:1)) * jumpDistanceFactor;
	        var shadowHeight = (playerShadowImg.height * ((finalAnim == PLAYER_ANIM_DEAD)?2:1));
	        context.drawImage(playerShadowImg, (this.posX + (width / 2)) - (shadowWidth / 2), ((this.defaultY) + height) - ((shadowHeight/2) + ((finalAnim == PLAYER_ANIM_DEAD)?30:0)), shadowWidth, (shadowHeight * jumpDistanceFactor));
	        
	        context.translate(this.posX, this.posY - jumpHeight);
	        if (playerAngle < ANGLE_CENTER) {
	        	context.translate(width,0);
	        	context.scale(-1,1);
	        }
	        context.drawImage(playerSprite, 0, 0, width, height);
	        
	        //context.fillText(""+this.positionOnRoad, this.posX+10, this.posY+10);
	        
	    } context.restore();
        
        var spilledSauceBottle;
        for (var i = 0; i < spilledSauceBottles.length; i++)
        {
        	spilledSauceBottle = spilledSauceBottles[i];
        	
        	context.save(); {
	            context.globalAlpha = spilledSauceBottle.alpha;
	            //spilledSauceBottle.scale = 0.5 + (0.25 * (spilledSauceBottle.step / 100));
	            context.translate(spilledSauceBottle.x - (spilledSauceBottle.targetX * (spilledSauceBottle.step / 100)),spilledSauceBottle.targetY + spilledSauceBottle.y + (((spilledSauceBottle.step - 25) / 2) * ((spilledSauceBottle.step -25) / 2)));
	            context.translate(((spilledSauceBottle.img.width* spilledSauceBottle.scale)/2), ((spilledSauceBottle.img.height* spilledSauceBottle.scale)/2) );
	            context.rotate((spilledSauceBottle.targetRotation * (spilledSauceBottle.step / 100)) * TO_RADIANS);
	            context.drawImage(spilledSauceBottle.img, ((-spilledSauceBottle.width* spilledSauceBottle.scale)/2), ((-spilledSauceBottle.height* spilledSauceBottle.scale)/2), spilledSauceBottle.width * spilledSauceBottle.scale, spilledSauceBottle.height * spilledSauceBottle.scale);
        	} context.restore();
        }
        
        //Draw ghost animation
        if (finalAnim == PLAYER_ANIM_DEAD){
        	if (!ghostAnimDone){
	        	if (ghostCounter < deadAnim.ticksToVanish)
	        	{
		        	ghostCounter += timeFactor;
		        	context.save();
		        	
		        	//Calculate alpha
		        	var ghostAlpha = 1;
		        	if (ghostCounter < deadAnim.ticksToFadeIn){
		        		ghostAlpha = (ghostCounter / deadAnim.ticksToFadeIn);
		        		ghostAlpha = (ghostAlpha > 1? 1:ghostAlpha);
		        	}
		        	
		        	//Calculate x
		        	var ghostX = this.posX + ((width / 2) - (ghostImg.width / 2));																	//Center image
		        	var movementDistance = deadAnim.baseMovementDistance + (ghostCounter / deadAnim.movementDistanceIncreaseFactor);		//Sin movedistance
		            var movementSpeed = deadAnim.baseMovementSpeed;																			//Sin movespeed, higher is faster
		        	ghostX = ghostX + (movementDistance * Math.sin((ghostCounter * movementSpeed)));
		            
		        	//Calculate y
		            var ghostY = this.posY - (ghostImg.height / 2);
		            if (ghostCounter > deadAnim.ticksToMoveUp){
		            	ghostY = ghostY - ((ghostCounter - deadAnim.ticksToMoveUp) * (2 + (ghostCounter / deadAnim.ySpeedIncreaseFactor)));
		            }
		            
		            //Draw image
		            context.globalAlpha = ghostAlpha;
		        	context.drawImage(ghostImg, ghostX, ghostY, ghostImg.width, ghostImg.height);
		        	context.restore();
	        	}else{
	        		ghostAnimDone = true;
	        		level.handlePlayerGhostAnimDone();
	        	}
        	}
        }
        
        if (DRAW_REFERENCE_POINTS){
            context.fillRect(this.referenceX, this.referenceY, 5, 5);
        }
        
        if (SHOW_COLLISION_RECTANGLES)
        {
        	drawLine(context, this.upperLeftPoint, new Point(this.upperLeftPoint.x, this.bottomRightPoint.y));
	        drawLine(context, new Point(this.upperLeftPoint.x, this.bottomRightPoint.y), this.bottomRightPoint);
	        drawLine(context, this.upperLeftPoint, new Point(this.bottomRightPoint.x, this.upperLeftPoint.y));
	        drawLine(context, new Point(this.bottomRightPoint.x, this.upperLeftPoint.y), this.bottomRightPoint);
        }
        
    };
  
    this.applyMovement= function(timeFactor) {
    	
    	if (dead) return;

    	// --- vertical movement
    	
    	if (jumping) {
    		jumpCounter += timeFactor;
    		
    		var top = 275; //275; //+ (10 * POWERUP_JUMP_LEVEL); 			//make higher to jump higher
    		//var duration = 1.35 + (0.15 * (POWERUP_JUMP_LEVEL.level - 1)); 	//make higher to make the jump last longer
    		var duration = 1.35; 	//make higher to make the jump last longer
    		jumpHeight = (top + -Math.pow((jumpCounter-(Math.sqrt(top) * duration)) /duration, 2));
    		jumpProgress = (jumpHeight/top);

    		if (previousJumpProgress > jumpProgress){
    			jumpGoingUp = false;
    		}
    		
    		previousJumpProgress = jumpProgress;

    		if (jumpHeight <= 0){
    			jumpHeight = 0;
    			console.log("jumpCounter: " + jumpCounter);
    			jumpCounter = 0;
    			jumpGoingUp = true;
    			jumping = false;
    			leftMost.y = this.defaultY;
        		rightMost.y = this.defaultY;
    		}
    	}
    	
    	
    	
    	
    	// --- horizontal movement
    	
//    	var tl = targetLane;
    	if (movingLeft && !prevMovingLeft) {
    		targetLane--;
//    		console.log("move to the left");
    	}
    	if (movingRight && !prevMovingRight) {
    		targetLane++;
//    		console.log("move to the right");
    	}
    	targetLane = clamp(targetLane, 0, LANES.length-1);
//    	if (targetLane != tl) console.log(tl + " -> " + targetLane);
    	
    	prevMovingLeft = movingLeft;
    	prevMovingRight = movingRight;
    	 
        var targetRoadX = LANES[targetLane];
       
        var dx;
        if (!finishTweenActive) {
        	var ts = TOP_SPEED * timeFactor;
        	dx = clamp(targetRoadX - this.positionOnRoad, -ts, ts);
        } else {
        	dx = 0;
        }
        this.positionOnRoad += dx;
        drivingSpeed = dx / timeFactor;
        
        // angle the player if steering
        playerAngle = ANGLE_CENTER;
        playerAngle -= signum(drivingSpeed);
        
    };
    
    this.moveUp = function() {
    	if (!jumping){
    		jumpSound.play();
    		jumping = true;
    		jumpCounter = 0;
    	}
    };
    
//    this.moveLeft = function()
//    {
//        movingLeft = true;
//        movingRight = false;
//    };
//    
//    this.moveRight = function()
//    {
//        movingRight = true;
//        movingLeft = false;
//    };

//    this.stopMoving = function()
//    {
//        //movingSpeedFactor = 0;
//        movingLeft = false;
//        movingRight = false;
//
//        moving = false;
//        //this.updatePositionOnRoad();
//    };

    this.loseEggs = function(numEggs)
    {
    	
    	//clear spilledSauceBottles;
    	//add number off bottles nessesary
    	
    	//spilledSauceBottles = [];
    	
    	for (var i = 0; i < numEggs; i++)
    	{
    		var  spilledSauceBottle = {img:loadImage("images/pixelkaiju-eitje1.png"), rotation:0, x:this.referenceX, y:this.referenceY, scale:0.75, alpha:1, step:0, height:0, width:0, targetX:getRandomInt(0, 1)?getRandomInt(300, 900):getRandomInt(-300, -900), targetY:getRandomInt(-50, -350), targetRotation:getRandomInt(500, 900)};
    	    spilledSauceBottle.width = spilledSauceBottle.img.width;
    	    spilledSauceBottle.height = spilledSauceBottle.img.height;
    	    
//    		TweenLite.killTweensOf(spilledSauceBottle);
        	
//        	spilledSauceBottle.alpha = 1;
//        	spilledSauceBottle.x = this.referenceX;
//        	spilledSauceBottle.y = this.referenceY;
//        	spilledSauceBottle.step = 0;
//        	spilledSauceBottle.scale = 0.5;
//        	
//        	spilledSauceBottle.targetX = getRandomInt(0, 1)?600:-600;
        	
        	//console.log("spilledSauceBottle.x: " + spilledSauceBottle.x);
        	//console.log("spilledSauceBottle.y: " + spilledSauceBottle.y);
        	
        	TweenLite.to(spilledSauceBottle, 0.75, {step:100, ease:Linear.easeNone, onComplete:function(){
        		
        		spilledSauceBottle.alpha = 0;
        		spilledSauceBottles.splice(spilledSauceBottles.indexOf(spilledSauceBottle), 1);
        		
        	}});
        	
        	spilledSauceBottles.push(spilledSauceBottle);
        	
        	//console.log("add spilled sauce, total: " + spilledSauceBottles.length);
    	}
    };
    
    this.showHitAnimation = function()
    {
    	showHitSide = getRandomInt(0, 1);
    	showHitAnim = true;
    	showHitCounter = 0;
    };
    
    this.spin = function()
    {
        this.spinning = true;
        spinCounter = 0;
        spinDirection = getRandomInt(0, 1);
    };

    this.setCoolDown = function()
    {
    	//console.log("setCoolDown");
        this.hitCoolDownCounter = HIT_COOLDOWN;
        this.showHitFlash(this);
    };
    
    this.showHitFlash = function(thisPlayer)
    {
    	TweenLite.to(thisPlayer, 0.15, {alpha:0, ease:Power2.easeIn, onComplete:function(){
    		TweenLite.to(thisPlayer, 0.15, {alpha:1, ease:Power2.easeIn, onComplete:function(){
    			if ( thisPlayer.hitCoolDownCounter > 0){
    				thisPlayer.showHitFlash(thisPlayer);
    			}
    		}});
    	}});
    };

    this.cheer = function()
    {
    	 this.stopSpinning();
    	 //cheer = true;
    	 finalAnim = PLAYER_ANIM_CHEER;
    	 
    	 //Stop the flashing effect from the headstart
    	 TweenMax.to(this, 0.25, {alpha:1});
    };
    
    this.die = function()
    {
        this.stopSpinning();
        finalAnim = PLAYER_ANIM_DEAD;
        dead = true;
    };

    this.stopSpinning = function()
    {
        this.spinning = false;
        spinCounter = 0;
    };
    
    this.tweenToFinish = function(finishY)
    {
    	console.log("finishY: " + finishY);
    	finishTweenActive = true;
    	var thisRef = this;
    	TweenLite.to(this, 0.61, {positionOnRoad:50, posY:finishY - 209, defaultY:finishY - 209, onComplete:function(){thisRef.cheer();}});
    	//TweenLite.to(this, 1, {positionOnRoad:50, posY:finishY - 209, defaultY:finishY - 209, ease:Linear.easeNone, onComplete:function(){thisRef.cheer();}});
    };

//    this.updatePositionOnRoad = function()
//    {
//        //offRoad = false;
//
//        if ((this.positionOnRoad) <= 10){
//            //offRoad = true;
//            //playerAngle = 1;
//        }else if ((this.positionOnRoad) <= 26){
//            //playerAngle = 2;
//        }else if ((this.positionOnRoad) <= 42){
//            //playerAngle = 3;
//        }else if ((this.positionOnRoad) <= 58){
//            //playerAngle = 4;
//        }else if ((this.positionOnRoad) <= 74){
//            //playerAngle = 5;
//        }else if ((this.positionOnRoad) <= 90){
//            //playerAngle = 6;
//        }else if ((this.positionOnRoad) <= 100){
//            //offRoad = true;
//            //playerAngle = 7;
//        }
//    };
}
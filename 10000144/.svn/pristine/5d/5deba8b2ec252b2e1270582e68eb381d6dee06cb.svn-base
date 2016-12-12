/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function Level(context, game, levelID, time, startingSpeed)
{
    //Private vars
    var game = game;
    var context = context;
    this.levelID = levelID;
    var objects = new Array();
    var objectsToBeDeleted = new Array();
    
    //Public vars
    this.eggs = 0;
    this.lifes = STARTING_HEALTH;
    
    if (POWERUP_EXTRA_HEALTH.activated > 0){
    	this.lifes += POWERUP_EXTRA_HEALTH.activated;
    }

    //this.distancePercentage = 0;
    //this.endDistance = 700; //900;//1000;
    this.currentDistance = 1;
    this.currentTime = 0;
    this.totalTime  = time * 1000;
    this.isVisible = false;
    this.player;
    this.hud;
    this.backgroundMountains;
    this.road;
    this.speed = 0;
    
    this.headstartMode = false;
    //var flashPlayer = false;

    console.log("Level " + levelID + " speed " + startingSpeed);
    this.uncorrectedSpeed = startingSpeed * STARTING_SPEED;
    this.badge1Collected = 0;
    this.badge2Collected = 0;
    this.badge3Collected = 0;
    this.badge4Collected = 0;
    this.badge5Collected = 0;
    //this.offRoadEggsDrops = 0;
    this.carHit = 0;
    this.pylonHit = 0;
    this.timesSpinned = 0;
    this.lifesCollected = 0;
    this.rockHit = 0;
    
    this.score = 0;
    this.hits = 0;
    //this.coinMultiplyFactor = 1;

    this.timeFactor = 0;

    var lanes = new Array();
    //var freeLanes = [1, 2, 3];

    var lastBackgroundObjectSpawn = 0;
    var lastObstacleSpawn = 0;
    var lastCurveSpawn = 0;
    var lastSauceSpawn = 0;
    var lastBadgeSpawn = 0;
    var lastSignSpawn = 0;
    var lastStreetLightSpawn = 0;
    //var lastBigSignSpawn = 0;

    var STAY_IN_CURVE_TICKS = 6; //600//150 //50;
    var STAY_STRAIGHT_TICKS = 15; //1500//400;
    var CURVE_STEP_SIZE = 3; //20;//9;
    var currentCurve = 0;
    this.MAX_CURVE = 200;
    var curveStep = CURVE_STEP_SIZE * this.uncorrectedSpeed;// 0.5;
    var stayInCurveCounter = STAY_IN_CURVE_TICKS;
    var stayStraightCounter = STAY_STRAIGHT_TICKS;

    this.movingDisabled = false;
    //var rockHit = false;
    var stopMovement = false;
    //var pauseCounter = 0;
    //var endCounter = 0;
    var popups = new Array();
    //var finishShown = false;
    //var snackBarShown = false;
    //var startAnimationPlaying = true;
    //var startAnimation = new LevelAnimation(context, this);
    //var levelEnded = false;
    var lastHighscoreShown = false;
    
    var clickToContinue = false;
    
    //console.log("LOAD LEVEL: " + levelID);
    
    var theme = "grass";
    var roadColor = null;
    if (levelID >= 20) {
    	theme = "desert";
    	roadColor = "rgba(250,248,112,0.5)";
    }
    if (levelID >= 40) {
    	theme = "snow";
    	roadColor = "rgba(255,255,255,0.5)";
    }
    
    //var backgrounds = [loadImage("images/background1.jpg"), loadImage("images/background2.jpg"), loadImage("images/background3.jpg")];
    //var grasses = [loadImage("images/grass1.png"), loadImage("images/grass2.png"), loadImage("images/grass3.png")];
    var backgroundImg = loadImage("images/env/" + theme + "/sky.jpg");  //loadImage("images/background" + this.levelId + ".jpg"); // backgrounds[levelId - 1];
    
    var grassImg = loadImage("images/env/" + theme + "/floor.jpg"); //loadImage("images/grass" + this.levelId + ".png"); //grasses[levelId - 1];
    
    //var cloudsImg = loadImage("images/clouds.png");
    
    this.road = new Road(context, this, roadColor);
    this.player = new Player(context, this);
    this.hud = new Hud(context, this);
    this.backgroundMountains = new MovingBackground(context, this, theme);

    //Make lanes 1 to 5
    for (var i = 0; i < 11; i++){
        lanes.push(new Lane(i, context));
    }

    if (POWERUP_HEAD_START.activated > 0){
    	//GOD_MODE = true;
    	//flashPlayer = true;
    	this.headstartMode = true;
    	TweenMax.to(this.player, 0.15, {alpha:0, repeat:-1, repeatDelay:0, yoyo:true});
    	//this.uncorrectedSpeed = HEADSTART_SPEED;
    }
    
    this.obstacleManager = new ObstacleManager(context, this, lanes, this.levelID);
    this.backgroundObjectManager = new BackgroundObjectManager(context, this, theme);
    
//    this.preLoadImages = function()
//    {
//    	//console.log("PRELOAD");
//    	 //Create these objects just to load the pictures
//        //var loadingObstacle = new Obstacle(context, 0, this, 0);
//        //var loadingBackgroundObject1 = new BackgroundObject(0, context, lanes[3], this, false, false);
//        //var loadingBackgroundObject2 = new BackgroundObject(0, context, lanes[3], this, true, false);
//        //var loadingBackgroundObject3 = new BackgroundObject(0, context, lanes[3], this, false, true);
//        //var loadingSauce = new Sauce(context, this, 0, 0);
//        //var loadingSign1 = new Finish(context, this, lanes[3], 0);
//        //var loadingSign2 = new Arc(context, this, lanes[3], 1);
//        //var loadingSign3 = new Arc(context, this, lanes[3], 2);
//        //var loadingAnimation = new LevelAnimation(context, this);
//        
//        //var interfaceImages;
////        switch (this.levelId){
////        	case 1:
//        		//interfaceImages = [loadImage("images/fredjoyce-1967.png"), loadImage("images/popup1967.png")];
////        		break;
////        	case 2:
////        		interfaceImages = [loadImage("images/fredjoyce-1995.png"), loadImage("images/popup1995.png")];
////        		break;
////        	case 3:
////        		interfaceImages = [loadImage("images/fredjoyce-2013.png"), loadImage("images/popup2013.png")];
////        		break;
////        }
//        
//        //var endScreenImages = [loadImage("images/popup-einde.png")];
//        //var endScreenImages = [loadImage("images/popup-einde.png"), loadImage("images/popup-gameover.png"), loadImage("images/popup-volgendlevel.png")];
//    };
    //this.preLoadImages();
    
    this.getResultString = function(){
    	
    	//return (this.lifesCollected + ", " + this.rockHit + ", " + this.timesSpinned + ", " + this.pylonHit + ", " + this.carHit + ", " + this.offRoadEggsDrops + ", " + this.badge5Collected + ", " + this.badge4Collected + ", " + this.badge3Collected + ", " + this.badge2Collected + ", " + this.badge1Collected);
    	return (this.lifesCollected + ", " + this.rockHit + ", " + this.timesSpinned + ", " + this.pylonHit + ", " + this.carHit + ", " + this.badge5Collected + ", " + this.badge4Collected + ", " + this.badge3Collected + ", " + this.badge2Collected + ", " + this.badge1Collected);
    	
    };
    
    //Fail text lines
    var linePool = new Array();
    
    this.fillLinePool = function()
    {
    	for(var i = 0; i < FAIL_TEXTS.length; i++)
    	{
    		linePool.push(FAIL_TEXTS[i]);
    	}
    };
    
    this.fillLinePool();
    
    this.getNextFailText = function(){
    	var randomIndex = getRandomInt(0, linePool.length-1);
    	var result = linePool[randomIndex];
    	linePool.splice(randomIndex, 1);
    	
    	if (linePool.length == 0)
    	{
    		this.fillLinePool();
    	}
    	return result;
    };
    
    this.handleTap = function(e)
    {
    	this.continueOnFinish();
    };
    
    this.continueOnFinish = function() {
    	console.log("clickToContinue:  " + clickToContinue);
    	if (clickToContinue) {
			//Only do this once
			clickToContinue = false;
			console.log("show endscreen");
			//alert("showendscreen");
			game.showEndScreen(this.eggs, this.score, this.hits, true, this.getResultString());
    	}
    };
    
    this.handleInput = function() {
    	
//        if (ENABLE_CHEATS){
//            if (keydown.return){
//            	 this.skipRoad();
//            } else if (keydown.down){
//  	this.speedUp();
//            } else if (keydown.z) {
//            	 this.decreasePerspective();
//            } else if (keydown.x) {
//            	 this.increasePerspective();
//            }
//        }

        var movingUp = false;
        movingLeft = false;
        movingRight = false;
        
    	if (keydown.up){
    		 movingUp = true;
    	}

        var i = touches.length;
        if (touches.length != 0) console.log("touches " + touches.length);
        while(i--) {
            var touchobj = touches[i];
            var canvasCoordinates  = tortilla.windowToCanvas(touchobj.pageX, touchobj.pageY);
    		var transformedCoordinates = pointToTransformedPoint(canvasCoordinates.x, canvasCoordinates.y);
    		if (transformedCoordinates.y < GAME_HEIGHT/2) {
    			movingUp = true;
    		} else {
	            if (transformedCoordinates.x < GAME_WIDTH/2){
	                movingLeft = true;
	            } else {
	                movingRight = true;
	            }
    		}
        }   
        
    	if (keydown.left) movingLeft = true;
    	if (keydown.right) movingRight = true;
    	
    	if (movingUp && this.levelID >= 3) this.moveUp();
    	
    };
    
    
//    this.getFreeLane = function(){
//
//        if (freeLanes.length> 0){
//            var laneIndex = getRandomInt(0, freeLanes.length - 1);
//            var lane = freeLanes[laneIndex];
//
//            freeLanes.splice(laneIndex, 1);
//
//            return lanes[lane];
//        }else{
//            return null;
//        }
//    };
    
    this.spawnBackgroundObject = function(){
    	if (this.currentDistance - lastBackgroundObjectSpawn > SPAWN_RATE_BACKGROUND_OBJECT){
            lastBackgroundObjectSpawn += SPAWN_RATE_BACKGROUND_OBJECT; //this.currentDistance;

            //signCounter++;

            //if (signCounter % 40 == 0){
            //    objects.push(new Finish(context, this, lanes[5]));
            //}

            var newBackgroundObject = null;
            
            for (var i = 0; i < 4; i++)
            {
            	newBackgroundObject = this.backgroundObjectManager.getBackgroundObject(lanes[i], ROAD_SIDE_LEFT);
            	if (newBackgroundObject != null){
            		objects.push(newBackgroundObject); //new BackgroundObject(1, context, lanes[i], this, false, false));
            	}
            }
            for (var i = 7; i < 11; i++)
            {
            	newBackgroundObject = this.backgroundObjectManager.getBackgroundObject(lanes[i], ROAD_SIDE_RIGHT);
            	if (newBackgroundObject != null){
            		objects.push(newBackgroundObject); //new BackgroundObject(1, context, lanes[i], this, false, false));
            	}
            }
        }
    };
    
    this.updateObjects = function(){
        //Draw objects
        var i = objects.length;
        while(i--)
        {
            objects[i].update(this.speed);
        };
    };
    
    this.drawObjects = function(){
        //Draw objects
        var i = objects.length;
        while(i--)
        {
            objects[i].draw();
        };
    };
    
    this.handleFinish = function(finishY){
    	//alert("end level");
    	
    	this.uncorrectedSpeed = 0;
	    this.speed = 0;
	    this.movingDisabled = true; 
	    stopMovement = true; 
	    //this.hud.setAvatar(AVATAR_DEAD);
	    //this.lifes = 0;
	    //loseSauceSound1.play();
	    this.hud.setAvatar(AVATAR_HAPPY_FINISH);
	    game.completedLevel(this.eggs, this.levelID);
	    this.player.tweenToFinish(finishY);
	    //this.player.cheer();
	    console.log("clickToContinue: " + clickToContinue);
	    clickToContinue = true;
	    //game.endLevel(this.eggs, this.getResultString());
	    
	    var self = this;
	    setTimeout(function() {
	    	self.continueOnFinish();
	    }, 3000);
	    
    };
    
    this.tutsShown = {};
    
    this.showTutorial = function(which) {
    	
    	if (this.tutsShown.hasOwnProperty(which)) return;
    	this.tutsShown[which] = 0xCAFEBABE;
    	
    	var self = this;
    	self.paused = true;
    	this.hud.showTutorial(which, function() {
    		self.paused = false;
    	});
    };
    
    this.update = function(timeFactor, timePast)
    {
    	
    	if (!this.paused) {
    		
    		this.handleInput();
	    	
	        if (!stopMovement){
	        	this.currentTime += timePast;
	        }
	        
	        this.timeFactor = timeFactor;
	        
	        if (this.currentTime > this.totalTime) {
	        	this.uncorrectedSpeed = 0;
			    this.speed = 0;
			    this.movingDisabled = true;
			    stopMovement = true;
			    //this.hud.setAvatar(AVATAR_DEAD);
			    //this.lifes = 0;
			    //loseSauceSound1.play();
			    
			    this.player.die();
			    //game.endLevel(this.eggs, this.getResultString());
	        };
	        	
	        if (!stopMovement){
	            this.uncorrectedSpeed += (0.000014 * this.timeFactor); //+ (timePast / 1000000) //0.00005;
	            //Enforce the max speed. But don't if headstartmode is on
	            if (!this.headstartMode){
	            	if (this.uncorrectedSpeed > MAX_SPEED){
	            		this.uncorrectedSpeed = MAX_SPEED;
	            	}
	            }
	            this.speed = (this.uncorrectedSpeed * this.timeFactor);
	            this.currentDistance += (this.speed * SPEED_TO_METER);
	            //this.distancePercentage = this.currentDistance / this.endDistance;
	        }
	        
	        if (this.currentDistance - lastBadgeSpawn > SPAWN_RATE_BADGE)
	        {
	            lastBadgeSpawn += SPAWN_RATE_BADGE; //this.currentDistance;
	            var newObstacles = this.obstacleManager.getObstacleRow();
	            
	            if (newObstacles != null){
		            for (var i = 0; i < newObstacles.length; i++)
		            {
		            	objects.push(newObstacles[i]);
		            }
	            }
	        }
	        
	        this.spawnBackgroundObject();
	
	        if (!lastHighscoreShown){
	            if (this.currentDistance + LENGTH_OF_ROAD >= LAST_HIGHSCORE){
	            	lastHighscoreShown = true;
	            }
	        }
	        
	        // If the game is performing a headstart
	        if (this.headstartMode) {
	        	
	        	var metersToGo = (POWERUP_HEAD_START.distance - this.currentDistance);
	        	//You have reached the end of the headstart
	        	if (metersToGo <= 0) {
	        		//POWERUP_HEAD_START.amount = 0;
	        		this.headstartMode = false;
	        		this.uncorrectedSpeed = STARTING_SPEED;
	        		TweenMax.to(this.player, 0.25, {alpha:1});
	        		
	        	//You have reached HEADSTART_SLOWDOWN_POINT meters before the end of the headstart
	        	} else if (metersToGo < HEADSTART_SLOWDOWN_POINT){
	        		console.log("STARTING_SPEED: "  + STARTING_SPEED + " HEADSTART_SPEED: " + HEADSTART_SPEED);
	        		console.log("metersToGo: " + metersToGo + "HEADSTART_SLOWDOWN_POINT: " + HEADSTART_SLOWDOWN_POINT);
	        		this.uncorrectedSpeed = STARTING_SPEED + ((HEADSTART_SPEED - STARTING_SPEED) * (metersToGo / HEADSTART_SLOWDOWN_POINT));
	        		
	        	//You are in the middle of the headstart
	        	} else{
	        		if (this.uncorrectedSpeed < HEADSTART_SPEED) {
	        			this.uncorrectedSpeed += (HEADSTART_SPEED / HEADSTART_FULLSPEED_POINT) * this.timeFactor;
	        		} else if (this.uncorrectedSpeed > HEADSTART_SPEED) {
	        			this.uncorrectedSpeed = HEADSTART_SPEED;
	        		}
	        	}
	        }
	            
	        if (APPLY_CURVES) {
	            //Apply curves
	        	//if (this.distancePercentage < 0.90) {
	        		stayStraightCounter -= this.speed; // * 100;//(1 * this.timeFactor) * (this.uncorrectedSpeed * 100);
	        	//}
	            //console.log("stayStraightCounter: " + stayStraightCounter);
	        	//console.log("stayStraightCounter: " + stayStraightCounter);
	            if ((stayStraightCounter <= 0)) {
	
	            	//console.log("this.currentDistance: " + this.currentDistance +  "  lastCurveSpawn: " + lastCurveSpawn);
	            	
	                if (this.currentDistance - lastCurveSpawn > 0) {
	                    lastCurveSpawn = this.currentDistance;
	
	                    currentCurve = currentCurve + (curveStep * this.timeFactor);
	                    //console.log("smaller than zero"  + currentCurve + "curveStep: " + curveStep)
	                    this.backgroundMountains.move(currentCurve);
	                    //console.log("curve: " + currentCurve + " curveStep: " + curveStep);
	                    if (currentCurve > this.MAX_CURVE){
	                        stayInCurveCounter -= this.speed; //1 * this.timeFactor * (this.uncorrectedSpeed * 100);
	                        curveStep = 0;
	                        if (stayInCurveCounter <= 0){
	                            stayInCurveCounter = STAY_IN_CURVE_TICKS;
	                            curveStep = -CURVE_STEP_SIZE * this.uncorrectedSpeed;
	                        }
	                    }else if (currentCurve < -this.MAX_CURVE){
	                        stayInCurveCounter -= this.speed; //1 * this.timeFactor * (this.uncorrectedSpeed * 100);
	                        curveStep = 0;
	                        if (stayInCurveCounter <= 0){
	                            stayInCurveCounter = STAY_IN_CURVE_TICKS;
	                            curveStep = CURVE_STEP_SIZE * this.uncorrectedSpeed;
	                        }
	                    }else if ((currentCurve < (curveStep <0? -curveStep : curveStep)) && (currentCurve > -(curveStep <0? -curveStep : curveStep)))
	                    {
	                        stayStraightCounter =  STAY_STRAIGHT_TICKS;
	                        currentCurve = curveStep;
	                    }
	                }
	            }
	        }
	        
	        //Draw road
	        this.road.update(this.speed);
	        
	        this.updateObjects();
	        this.clearObjectsMarkedForDeletion();
	        
    	}

        //-------------
        //DRAW THE GAME
        //-------------

        context.drawImage(backgroundImg, 0, 0);

        //Draw clouds
        //context.drawImage(cloudsImg, 0, 0);

        //Draw background city
        this.backgroundMountains.update(0.5);
        
        //Draw grass
        context.drawImage(grassImg, 0, HORIZON_Y);
        
        this.road.draw();
        
        //Draw saucespots
//        var h = sauceSpots.length;
//        while(h--)
//        {
//            sauceSpots[h].update(this.speed);
//        }

        //Draw objects
        this.drawObjects();

        //Draw lanes
        if (DRAW_LANES){
	        var j = lanes.length;
	        while(j--)
	        {
	            lanes[j].draw();
	        }
        }

        //Draw popups
        var k = popups.length;
        while(k--)
        {
            popups[k].update(this.timeFactor);
        }

        // TODO should be separate update/draw
        this.player.update(this.speed, this.paused ? 0 : this.timeFactor, currentCurve, this.currentDistance);

        //Draw/update HUD
        this.hud.update(this.eggs, this.lifes, this.score, this.currentDistance, (this.totalTime - this.currentTime));

    };

//    function resetSignCounter(){
//        signCounter = 0;
//    }

//    this.setPlayer = function(playAsMan)
//    {
//    	this.hud.setPlayer(playAsMan);
//    };
    
//    this.resumLevelAnimation = function(){
//    	startAnimation.resumeAnimation();
//    };
//    
    this.calculateCurve = function(y) {
    	
        var distance = (GAME_HEIGHT - y) / ROAD_HEIGHT;
        var exponentiation = Math.pow(distance, 4);
        var x =  -(exponentiation * currentCurve) + (currentCurve / 2);  //last part moves the road

        if (ENABLE_PARALAX_SCROLLING){
            x -= (y - HORIZON_Y) / (PARALAX_STRENGTH - HORIZON_Y) * this.player.positionOnRoadPixels;
        }

        return x;
        
    };

    this.addScore = function(score)
    {
    	this.score += score;
    	
    	if (this.score < 0) this.score = 0;
    };
    
    this.addEggs = function(eggs)
    {
        this.eggs += eggs;
        
        //this.hud.setAvatar(AVATAR_HAPPY);
    };

    this.spinPlayer = function()
    {
        this.player.spin();
        this.timesSpinned++;
    };

    this.showHitAnimation = function()
    {
    	this.player.showHitAnimation();
    };
    
    this.killPlayer = function()
    {
    	if (!stopMovement){
	    	if ((!GOD_MODE) && (!this.headstartMode)){
			    //this.player.die(this.lifes);
	    		stopMovement = true;
	    		
	    		//levelEnded = true;
	    		
			    this.uncorrectedSpeed = 0;
			    this.speed = 0;
			    this.movingDisabled = true;
			    this.hud.setAvatar(AVATAR_DEAD);
			    this.lifes = 0;
			    loseSauceSound1.play();
			    
			    this.player.die();
	    		
	    	}
    	}
    };
    
    //When the ghost of the dead player went all the way up
    this.handlePlayerGhostAnimDone = function(){
    	game.showEndScreen(this.eggs, this.score, this.hits, false, this.getResultString());
    };

    this.loseEggs = function(numEggs)
    {
    	for (var i = 0; i < numEggs; i++){
    		if (this.eggs > 0){
		    	this.eggs -= 1;
		    	this.player.loseEggs(1);
		    	//level.offRoadEggsDrops++;
    		}
    	}
    };
    
    this.loseLife = function(lane, objectIndex)
    {
    	this.hits++;
    	if (!this.headstartMode){
	        this.lifes--;
	        loseSauceSound1.play();
	        //this.player.setCoolDown();

	        if (this.lifes < 1){
	        	if (!GOD_MODE){
	            	//if (!levelEnded){
	            		//levelEnded = true;
	            		//this.uncorrectedSpeed = 0;
	                    //this.speed = 0;
	                    //this.movingDisabled = true;
	                    //stopMovement = true;
	                    //"GAMEOVER: Je hebt teveel saus geknoeid"
	                    
	                    //this.player.die(this.lifes);
	            		//game.endLevel(this.eggs, false, this.getResultString());
	              	this.loseEggs(EGG_DROP_DEAD);
	        		this.killPlayer();
	            	//}
	            }
	        }else{
	        	this.loseEggs(EGG_DROP_HIT);
	        }
    	}
    };

    this.addLife = function()
    {
    	this.lifesCollected++;
        this.lifes++;
        this.hud.setAvatar(AVATAR_HAPPY);
    };

    this.checkCollision = function(collisionObject, defaultWidth, defaultHeight)
    {
    	
    	
    	//if ((!this.player.highEnoughToJumpOverObject) || (!collisionObject.canBeJumped) || (collisionObject.type == 6)){
    	
	    	//Give every object the same hit rectangle
	    	//var defaultWidth = 100;
	    	//var defaultHeight = 100;
	    	
	    	//console.log("collisionObject.scale: " + collisionObject.scale);
	    	
    		//.--
    		//---
    		//--.
    	
	    	var bottomRightPoint = new Point(collisionObject.referenceX + ((defaultWidth * collisionObject.scale) /2), collisionObject.referenceY);
	    	var upperLeftPoint = new Point(collisionObject.referenceX - ((defaultWidth * collisionObject.scale) /2), collisionObject.referenceY - (defaultHeight * collisionObject.scale));
	    	
	    	//When moving realy fast, make the collision rectangles twice as big
//	    	if (this.headstartMode){
//	    		//bottomRightPoint.y += (bottomRightPoint.y - upperLeftPoint.y);
//	    		//bottomRightPoint.x += 250;
//	    		//upperLeftPoint.x -= 250;
//	    	}
	    	
	    	
	    	if (SHOW_COLLISION_RECTANGLES){
		        context.fillStyle = "red";
		        //context.fillRect(bottomRightPoint.x, bottomRightPoint.y, 15, 15);
		        //context.fillRect(upperLeftPoint.x, upperLeftPoint.y, 15, 15);
		        //context.fillRect(this.player.bottomRightPoint.x, this.player.bottomRightPoint.y, 15, 15);
		        //context.fillRect(this.player.upperLeftPoint.x, this.player.upperLeftPoint.y, 15, 15);
		        
		        drawLine(context, upperLeftPoint, new Point(upperLeftPoint.x, bottomRightPoint.y));
		        drawLine(context, new Point(upperLeftPoint.x, bottomRightPoint.y), bottomRightPoint);
		        drawLine(context, upperLeftPoint, new Point(bottomRightPoint.x, upperLeftPoint.y));
		        drawLine(context, new Point(bottomRightPoint.x, upperLeftPoint.y), bottomRightPoint);
	    	}
	    	
	        if (bottomRightPoint.x < this.player.upperLeftPoint.x) return false; // a is left of b
	        if (upperLeftPoint.x > this.player.bottomRightPoint.x) return false; // a is right of b
	        if (bottomRightPoint.y < this.player.upperLeftPoint.y) return false; // a is above b
	        if (upperLeftPoint.y > this.player.bottomRightPoint.y) return false; // a is below b
	
	        return true; // boxes overlap
        
    	//}
    };

    this.clearObjectsMarkedForDeletion = function()
    {
        for (var i in objectsToBeDeleted)
        {
        	//console.log("clear object");
            objects.splice(objects.indexOf(objectsToBeDeleted[i]), 1);
        }

        objectsToBeDeleted = new Array();
    };

    this.removeObject = function(object)
    {
        objectsToBeDeleted.push(object);
    };

    
    this.decreasePerspective = function()
    {
    	var newStepFactor = lanes[0].getFactorBottom() - 1;
    	
    	console.log(" newStepFactor: " + newStepFactor);
    	
        for (var i = 0; i < lanes.length; i++){
            lanes[i].setPerspective(25, newStepFactor);
        };
    };
    
    this.increasePerspective = function()
    {
    	var newStepFactor = lanes[0].getFactorBottom() + 1;
    	
    	console.log(" newStepFactor: " + newStepFactor);
    	
        for (var i = 0; i < lanes.length; i++){
            lanes[i].setPerspective(25, newStepFactor);
        };
    };

//    this.moveLeft = function()
//    {//this.hud.setDebugValue("MOVELEFT")
//    	
//        if (!this.movingDisabled){
//            if (!this.player.spinning){
//                this.player.moveLeft();
//            }
//        }
//    };
    
    this.moveUp = function()
    {
    	if (!this.movingDisabled){
            if (!this.player.spinning){
                this.player.moveUp();
            }
        }
    };

//    this.moveRight = function()
//    {
//        //this.hud.setDebugValue("MOVERIGHT")
//        if (!this.movingDisabled){
//            if (!this.player.spinning){
//                this.player.moveRight();
//            }
//        }
//    };

//    this.stopMoving = function(){
//        //this.player.updatePositionOnRoad();
//        //this.hud.setDebugValue("STOP");
//        this.player.stopMoving();
//    };

    this.showPopup = function(text, posX, posY, positive){
    	if((positive) || (!this.headstartMode)){
    		popups.push(new ScorePopup(context, this, text, posX, posY, positive));
    	}
    };

    this.removePopup = function(popup){
        popups.splice(popups.indexOf(popup), 1);
    };

    //For the cheats
    this.speedUp = function (){
        this.uncorrectedSpeed += 0.005; //0.2 //0.005;
    };
    
    this.preSpawnBackgroundObjects = function(){
    	
    	var thisRef = this;
    	
    	function fakeUpdate(){
        	
        	//Update speed
        	var fakeTimeFactor = 0.7; //6.4;
        	thisRef.uncorrectedSpeed += (0.000014 * fakeTimeFactor); //+ (timePast / 1000000) //0.00005;
        	thisRef.speed = (thisRef.uncorrectedSpeed * fakeTimeFactor);
        	thisRef.currentDistance += (thisRef.speed * SPEED_TO_METER);
            
        	thisRef.spawnBackgroundObject();
        	thisRef.updateObjects();
        };
        
        for (var i = 0; i < 31; i++){
        	fakeUpdate();
        }
        
        console.log("Objects prespawned:" + objects.length);
//        this.uncorrectedSpeed  = STARTING_SPEED;
        this.currentDistance = 0;
        lastBackgroundObjectSpawn = 0;
    };
    
    this.preSpawnBackgroundObjects();
    
    
    //this.skipRoad = function(){
    //    this.currentDistance = this.endDistance;
    //};
}
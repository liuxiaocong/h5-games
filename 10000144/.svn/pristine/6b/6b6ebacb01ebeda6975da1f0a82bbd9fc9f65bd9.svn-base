/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

Obstacle.prototype = inherit(GameObject.prototype);
Obstacle.prototype.super = GameObject.prototype;

function Obstacle(context, lane, level, obstacleData, extra)
{
    this.super.constructor.apply(this, [context, lane, level, getRandomArrayItem(obstacleData.images)]); //gameObjectImageData]);

    this.canCollide = true;

    this.hit = false;
    this.referenceX = 0;
    this.referenceY = 0;
    this.collisionWidth = obstacleData.collisionWidth;
    this.collisionHeight = obstacleData.collisionHeight;
    this.type = obstacleData.type;
    this.score = obstacleData.score;
    this.extra = extra;
};

Obstacle.prototype.collide = function(){

   // console.log("collide: " + this.type );
    if (this.hit) return;
        
    this.hit = true;

    switch (this.type)
    {
        case 0:
        case OBSTACLE_TYPE_PYLON1:
        case OBSTACLE_TYPE_PYLON2:
        case OBSTACLE_TYPE_PYLON3:
        case OBSTACLE_TYPE_CAR:
            if (level.player.hitCoolDownCounter <= 0){
            	level.player.setCoolDown(); 
            	//level.addScore(SCORE_ROADBLOCK);

            	switch(this.type)
            	{
            		case 0:
            			pylonSound.play();
            			//level.loseSauce(this.lane, this.currentIndex);
            			//level.pylonHit++;
            			break;
            		case OBSTACLE_TYPE_PYLON1:
            		case OBSTACLE_TYPE_PYLON2:
            		case OBSTACLE_TYPE_PYLON3:
            			pylonSound.play();
            			//bearSound.play();
            			//level.loseSauce(this.lane, this.currentIndex);
            			//level.pylonHit++;
            			break;
            		case OBSTACLE_TYPE_CAR:
            			carSound.play();
            			//level.hitPlayer();
            			//level.loseSauce(this.lane, this.currentIndex);
            			//level.carHit++;
            			break;
            	}
            	
            	level.addScore(this.score);
            	level.loseLife(this.lane, this.currentIndex);
            	//level.hitPruck();
            	level.showHitAnimation();
                level.showPopup(this.level.getNextFailText(), this.referenceX + this.level.calculateCurve(this.nextPosition.y), this.referenceY - this.height, false);
            }
            break;
        case OBSTACLE_TYPE_OIL:
            if (level.player.hitCoolDownCounter <= 0){
            	level.player.setCoolDown();
            	//level.addScore(SCORE_OIL);
                //if (!GOD_MODE){
            	if (!level.headstartMode){
                    spinSound.play();
                    level.spinPlayer();
            	}
                //}
            	level.addScore(this.score);
                level.showPopup(this.level.getNextFailText(), this.referenceX + this.level.calculateCurve(this.nextPosition.y), this.referenceY- this.height, false);
            }
            break;
        case OBSTACLE_TYPE_ROCK:
        case OBSTACLE_TYPE_HOLE:
            if (level.player.hitCoolDownCounter <= 0){
            	level.player.setCoolDown();
            	//level.addScore(SCORE_ROCK);
                //if (!GOD_MODE){
                hitRockSound.play();
                    //level.rockHit++;
                level.killPlayer();
                //}
                level.addScore(this.score);
                level.showPopup(this.level.getNextFailText(), this.referenceX + this.level.calculateCurve(this.nextPosition.y), this.referenceY- this.height, false);
            }
            break;
        case OBSTACLE_TYPE_LIFE:
            hitSauceSound.play();
            //level.addScore(SCORE_SAUCE);
            level.removeObject(this);
            level.addLife();
            level.addScore(this.score);
            var eggsToAdd = 10;
            var addEgg = function() {
            	console.log("addEgg", eggsToAdd);
            	if (eggsToAdd == 0) return;
        		level.addEggs(1);
        		eggsToAdd--;
        		setTimeout(addEgg, 33);
            };
            addEgg();
            //level.showPopup("+" + SCORE_SAUCE, this.referenceX, this.referenceY, true);
            break;
        case OBSTACLE_TYPE_COIN:
        	level.addScore(this.score);
        	level.addEggs(1); // * level.coinMultiplyFactor);
            hitCoinSound.play();
            level.removeObject(this);
            break;
        case OBSTACLE_TYPE_FINISH:
        	level.handleFinish(this.referenceY);
        	break;
        case OBSTACLE_TYPE_TRIGGER:
        	// TODO trigger
        	console.log("TRIGGER!!!", this.extra);
        	eval("level." + this.extra + ";");
        	break;
    }

};

Obstacle.prototype.handleEndOfPath = function()
{
    this.level.removeObject(this);
};

Obstacle.prototype.checkCollision = function(percentageOnRoad, posX, posY)
{
	//this.referenceX = posX + this.level.calculateCurve(posY); //+ (width / 2);
	this.referenceX = posX; //+ (100);
    this.referenceY = posY;
   
    this.context.fillStyle = "yellow";
    
    var canCollide = ((percentageOnRoad >= 0.55) && (percentageOnRoad <= 1)) || level.headstartMode;
    
    //If close enough to the player
//	if (canCollide)
//    {
//		if (percentageOnRoad > 1)
//			{
//			console.log("percentageOnRoad: " + percentageOnRoad);
//			}
		//if coin
		if (this.type == OBSTACLE_TYPE_COIN){
			//start tweening
	    	if (!this.tweeningToPlayer){
	    		
	    		if (canCollide) {
	    		
		    		//console.log("this.collisionWidth * POWERUP_MAGNET_LEVEL.level: " + this.collisionWidth * POWERUP_MAGNET_LEVEL.level);
		    		var magnetPower = (POWERUP_MAGNET_LEVEL.activated > 0? POWERUP_MAGNET_LEVEL.power : 1);
		    		
					if (level.checkCollision(this, this.collisionWidth * magnetPower, this.collisionHeight * magnetPower)){		//500, 500
						this.tweeningToPlayer = true;
						this.tweenBezierHeight = getRandomInt(25, 200); //100;  //Dynamic bezier height to makethis more fun to watch
						this.tweenStartingPoint = new Point(posX, posY);
					}
				
	    		}
			//tweening is busy, check for collision 
	    	}else{
	    		if (level.checkCollision(this, 5, 5) || this.tweenProgress >= 1){
	    			this.collide();
	    		}
	    	}
	    //if any other object
		}else if (canCollide && level.checkCollision(this, this.collisionWidth, this.collisionHeight)){
			//instant colide
            this.collide();
            return;
        }
//    }
};

Obstacle.prototype.drawReferencePoints = function(posX, posY)
{
	this.context.fillRect(posX + this.level.calculateCurve(posY), posY, 5, 5);
};
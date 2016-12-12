/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function Road(context, level, color)
{
    var level = level;
    var context = context;

    var frameCounter = 0;
    var currentFrame = 0;
    var FRAME_CHANGE_RATE = 0.1; //0.2; 							///0.2; //0.32 //1.6; //smaller is faster
    var roadFrames = [];
    for (var r = 1; r <= 14; r++) {
    	roadFrames.push(loadImage("images/road/road" + r + ".png"));
    }
//    	[loadImage("images/road1.png"), loadImage("images/road2.png"), loadImage("images/road3.png"), loadImage("images/road4.png"), loadImage("images/road5.png"), loadImage("images/road6.png"), loadImage("images/road7.png"), loadImage("images/road8.png"), loadImage("images/road9.png"), loadImage("images/road10.png"), loadImage("images/road11.png"), loadImage("images/road12.png"), loadImage("images/road13.png"), loadImage("images/road14.png")];
    var numFrames = roadFrames.length;
    
    var roadFixed = false;
    
    this.draw = function() {
    	
    	if (color != null && !roadFixed) {
    		
    		for (var r = 0; r < roadFrames.length; r++) {
    			
    			var org = roadFrames[r];
    			
    			var fix = tortilla.createBuffer(org.width, org.height);
    			var g = fix.getContext('2d');
    			
    			g.drawImage(org, 0, 0);
    			
    			g.fillStyle = color;
    			g.globalCompositeOperation = "source-atop";
    			g.fillRect(0,0,org.width,org.height);
    			
    			roadFrames[r] = fix;

    	    }
    		
    		roadFixed = true;
    	}
    	
    	var stepY = 20;  //10;   //The starting size of the parts of the image that get sheared
        var currentX;
        var nextX;
        var shear;
        var nextRoadFrameNumber = currentFrame % numFrames;
        var nextRoadFrame = roadFrames[nextRoadFrameNumber];
        //console.log("currentFrame % framesCount: " + nextRoadFrameNumber)

        for (var y = HORIZON_Y; y < GAME_HEIGHT; y+= stepY) { 

            //Increase shear size
            stepY += 5; //3;

            context.save();
            context.beginPath();
            context.rect(0, y, GAME_WIDTH, stepY + 1); //Small margin to fix the road

            currentX = level.calculateCurve(y);
            nextX = level.calculateCurve(y + stepY);
            shear = (nextX - currentX) / stepY;

            context.translate(0, y);
            context.transform(1, 0, shear, 1, 0, 0);
            context.translate(0, -y);
            context.clip();

            context.drawImage(nextRoadFrame, currentX - (35), HORIZON_Y);   //55 is de helft van de breedte die het plaatje groter is dan de spelbreedte
            //context.drawImage(nextRoadFrame, currentX - (44.5 + 90), HORIZON_Y);   //55 is de helft van de breedte die het plaatje groter is dan de spelbreedte

            if (DRAW_ROAD_LINES){
                context.fillStyle = "red";
                context.fillRect(0, y, GAME_WIDTH, 1);
            }

            context.restore();
        }
    }

    this.update = function(speed)
    {
        frameCounter += speed;
        
//        if (frameCounter > FRAME_CHANGE_RATE){   //smaller is faster
//            frameCounter -= FRAME_CHANGE_RATE; //0;
//            currentFrame++;
//            //console.log("currentFrame: " + (currentFrame % 2));
//        }

        var number = Math.floor(frameCounter / FRAME_CHANGE_RATE);
        frameCounter -= FRAME_CHANGE_RATE * number;
        currentFrame += number;
        
        
    };
}
/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function MovingBackground(context, level, theme)
{
    var level = level;
    var context = context;
    var backgroundImg = new Image();

    var startingScale = 0.5;

    this.x = 350;
    this.y = HORIZON_Y + 5; //A bit below the horizon, because the 'world' is round
    
    backgroundImg = loadImage("images/env/" + theme + "/horizon.png"); 
        
    this.move = function(step)
    {
        this.x = this.x + (step / 200);
    };

    this.update = function(distancePercentage)
    {
        var scale =  startingScale + ((1 - startingScale) * distancePercentage); //0.125 + (0.875 * (currentIndex / lane.MAX_POSITIONS));
        var width = backgroundImg.width * scale;
        var height = backgroundImg.height * scale;

        context.drawImage(backgroundImg, this.x - width / 2, this.y - height, width, height);
    };
}
/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function ScorePopup(context, level, text, x, y, positive)
{
    var level = level;
    var context = context;
    var text = text;
    var x = x;
    var y = y;
    var positive = positive;

    var Y_PATH_DISTANCE = 125;
    var Y_SPEED = 4;
    var Y_START = y;

    //Define methods
    this.update = update;
    
    function update(timeFactor)
    {
        y -= Y_SPEED * timeFactor;

        var pathProgress = ((Y_START - y) / Y_PATH_DISTANCE);

        context.save();

        var textAlpha = (1 - (pathProgress - (1 - 0.2)) * (1 / 0.2));
        if (textAlpha < 0){
        	textAlpha = 0;
        }

        context.globalAlpha = textAlpha;
        
        context.font = "bold " + 30 + 'px dimboregular';
        context.textBaseline = 'bottom';
        context.textAlign = 'left';
        
        if (positive){
            context.fillStyle = "white";
        }else{
            context.fillStyle = "orange";
        }
        
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        
        var width = context.measureText(text).width;
        
        context.strokeText(text, x - width/2, y);
        context.fillText(text, x - width/2, y);
        
        context.restore();

        if (pathProgress >= 1){
            level.removePopup(this);
        }
    }
}
/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

BackgroundObject.prototype = inherit(GameObject.prototype);
BackgroundObject.prototype.super = GameObject.prototype;

function BackgroundObject(context, lane, level, side, imageData)
{
    this.super.constructor.apply(this, [context, lane, level, imageData]);
    this.side = side; 
};
    
BackgroundObject.prototype.drawReferencePoints = function(posX, posY)
{
    this.context.fillStyle = "blue";
    this.context.fillRect(posX + this.level.calculateCurve(posY), posY, 5, 5);
};

BackgroundObject.prototype.handleEndOfPath = function()
{
    this.level.removeObject(this);
};
    
 
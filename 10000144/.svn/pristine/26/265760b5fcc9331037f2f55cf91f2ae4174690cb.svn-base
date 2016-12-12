/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function HitBox(x, y, width, height, returnFunction, context)
{
    //Constants
    var DEFAULT_ALPHA = 0.5;
    var DEFAULT_COLOR = "black";

    //Private vars
    var context = context;
    var returnFunction = returnFunction;
    var x = x;
    var y = y;
    var width = width;
    var height = height;

    //Methods
    this.update = update;
    this.setPosition = setPosition;
    this.checkClick = checkClick;
    this.checkMouseOver = checkMouseOver;

    this.isEnabled = true;

    function update(){
        if (SHOW_HITBOXES){
            if (this.isEnabled){
                context.globalAlpha = DEFAULT_ALPHA;
                context.fillStyle = DEFAULT_COLOR;
                context.fillRect(x, y, width, height);
                context.globalAlpha = 1;
            }
        }
    }
    
    function setPosition(posX, posY)
    {
    	x = posX;
    	y = posY;
    }

    function checkMouseOver(mouseX, mouseY)
    {
        if (this.isEnabled){
            if ((mouseX < (x + width)) && (mouseX > x) && (mouseY < (y + height)) && (mouseY > y)){
                return true;
            }
        }
        
        return false;
    }

    function checkClick(mouseX, mouseY)
    {
        if (this.isEnabled){
            if ((mouseX < (x + width)) && (mouseX > x) && (mouseY < (y + height)) && (mouseY > y)){
                returnFunction();
                return true;
            }
        }
        
        return false;
    }
}
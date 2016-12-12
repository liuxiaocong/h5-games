/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function ScreenManager()
{
	var screens = [];
	
    this.updateScreens = function(timeFactor)
    {
    	for (var i = 0; i < screens.length; i++){
    		if (!screens[i].alwaysOnTop){
    			screens[i].update(timeFactor);
    		}
    	}
    	for (var j = 0; j < screens.length; j++){
    		if (screens[j].alwaysOnTop){
    			screens[j].update(timeFactor);
    		}
    	}
    };
    
    this.addScreens = function(screenArray){
    	
    	for (var i = 0; i < screenArray.length; i++)
    	{
    		screens.push(screenArray[i]);
		}
    };

    this.checkMouseOver = function(mousePosition)
    {
    	for (var i = 0; i < screens.length; i++){
    		if (screens[i].checkMouseOver(mousePosition))
    		{
    			showHandCursor();
    			return;
    		}
    	}
    	
    	showDefaultCursor();
    };
    
    this.handleTap = function(tapPosition)
    {
    	
//    	console.log("screentap", tapPosition);
    	
		for (var i = 0; i < screens.length; i++){
			if (screens[i].handleTap(tapPosition)) break;
		}
		
		//Check if still above a button after clicking
    	this.checkMouseOver(tapPosition);
    };
    
    this.hideAllScreens = function(){
    	for (var i = 0; i < screens.length; i++){
    		if (!screens[i].alwaysOnTop){
    			screens[i].isVisible = false;
    		}
    	}
    };
}
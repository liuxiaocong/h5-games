/**
 * Created by Christiaan Duim on 10-10-13.
 */

function Screen(context, game)
{
    this.context = context;
    this.game = game;
    
    if (!game)
    {
    	throw ("error");
    }
    
    this.isVisible = false;
    this.alwaysOnTop = false;
    this.isEnabled = true;
    this.buttons = [];
};

Screen.prototype.update = function()
{
    for (var i in this.buttons)
    {
    	this.buttons[i].update();
    }
};

Screen.prototype.handleTap = function(tapPosition)
{
//	console.log("tap on", this, tapPosition, this.isVisible, this.isEnabled);
	if ((this.isVisible) && (this.isEnabled)){
//		console.log("yessss");
		for (var i in this.buttons)
	    {
			if (this.buttons[i].checkClick(tapPosition)) return true;
	    }
		
		return false;
		//showDefaultCursor();
	}
};

Screen.prototype.checkMouseOver = function (mousePosition)
{
	if ((this.isVisible) && (this.isEnabled)){
		
	    for (var i in this.buttons)
	    {
	    	if (this.buttons[i].checkMouseOver(mousePosition))
	    	{
	    		return true;
	    	}
	    }
	    
	    return false;
	}
};
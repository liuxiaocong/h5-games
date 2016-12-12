Scrollbar = function(game, posX, posY, backgroundImageRef, scrollBarImageRef, group)
{
	this.game = game;

	this.backgroundSpriteRef = this.game.add.image(posX, posY, 'upgradeAtlas', backgroundImageRef, group);

	this.scrollBarSpriteRef = this.game.add.sprite(posX, posY, 'upgradeAtlas', scrollBarImageRef, group);
	this.scrollBarSpriteRef.inputEnabled = true;
	this.scrollBarSpriteRef.input.enableDrag(false, true, false,255, null, null);
	this.scrollBarSpriteRef.input.allowVerticalDrag = true;
	this.scrollBarSpriteRef.input.allowHorizontalDrag = false;
	this.scrollBarSpriteRef.input.draggable = true;

	this.scrollingEvent = new Phaser.Signal();	
};
Scrollbar.prototype.constructor = Scrollbar;

Scrollbar.prototype.Update = function()
{	
	this.ClampScrollBarPosition();

	if(this.scrollBarSpriteRef.input.isDragged)
	{
		var scrollBarPercentageHeight = (this.scrollBarSpriteRef.y - this.backgroundSpriteRef.y) / (this.backgroundSpriteRef.height - this.scrollBarSpriteRef.height);
		this.scrollingEvent.dispatch(scrollBarPercentageHeight)
	}
};

Scrollbar.prototype.ClampScrollBarPosition = function()
{
	//clamp y position
	if(this.scrollBarSpriteRef.y < this.backgroundSpriteRef.y) 
	{
		this.scrollBarSpriteRef.y = this.backgroundSpriteRef.y;
	}

	if(this.scrollBarSpriteRef.y + this.scrollBarSpriteRef.height > 
		this.backgroundSpriteRef.y + this.backgroundSpriteRef.height)
	{
		this.scrollBarSpriteRef.y = (this.backgroundSpriteRef.y + this.backgroundSpriteRef.height) - this.scrollBarSpriteRef.height;
	}
};

Scrollbar.prototype.destroy = function()
{
	this.scrollBarSpriteRef.destroy();
	this.backgroundSpriteRef.destroy();
};


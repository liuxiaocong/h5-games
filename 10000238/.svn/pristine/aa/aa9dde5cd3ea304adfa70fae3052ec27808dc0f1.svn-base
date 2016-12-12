StatBox = function(boxRef, fontImage, posX, posY, game, group)
{
	this.posX = posX;
	this.posY = posY;
	this.boxSpriteRef = game.add.sprite(posX, posY, boxRef);
	this.boxSpriteRef.anchor.setTo(0.5, 0.5);
	group.add(this.boxSpriteRef);

	this.titleText = game.add.bitmapText(posX - this.boxSpriteRef.width / 2 + 22, posY - this.boxSpriteRef.height / 2 + 22, '', { font: '30px CMSansSerif-Medium', align: 'center'});
	this.attributeText = game.add.bitmapText(posX - 50, posY, '', { font: '40px CMSansSerif-Medium', align: 'center'});
	group.add(this.titleText);
	group.add(this.attributeText);
};
StatBox.prototype.constructor = StatBox;

StatBox.prototype.SetTitleText = function(text)
{
	this.titleText.setText(text);		
};

StatBox.prototype.SetStatText = function(value)
{
	this.attributeText.setText(value.toString());		
};

StatBox.prototype.destroy = function()
{
	if(this.boxSpriteRef != null) this.boxSpriteRef.destroy();
	this.boxSpriteRef = null;

	if(this.titleText != null) this.titleText.destroy();
	this.titleText = null;

	if(this.attributeText != null) this.attributeText.destroy();
	this.attributeText = null;
};

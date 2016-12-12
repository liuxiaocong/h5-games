/**
 * Created by Christiaan Duim on 10-10-13.
 */

var BUTTON_LAYOUT_DEFAULT = 1;
var BUTTON_LAYOUT_NORMAL_BUTTON = 1;
var BUTTON_LAYOUT_SMALL_BUTTON = 2;
var BUTTON_LAYOUT_MOREGAMES = 3;
var BUTTON_LAYOUT_MOREGAMES_SMALL = 4;

function Button(context, text, posX, posY, width, height, images, layoutFormat, returnFunction, scale)
{
	this.context = context;
	this.text = text;
	this.posX = posX;
	this.posY = posY;
	this.textPosX = posX;
	this.textPosY = posY;
	this.width = width;
	this.height = height;
	this.images = images;
	this.layoutFormat = layoutFormat;
	
	this.textHeight = 0;
	this.fontSize = 1;
	this.lineWidth = 0;
	this.currentImage = (this.images[0]? this.images[0]: null);
	
	this.pickFont();
	this.setFont();
	
	if (typeof scale === "undefined") scale = 1;
	this.scale = scale;
	
	//No width given, use text-width or image-width
	if (this.width == -1){
		if (this.currentImage != null){
			//Be careful, the image has to be loaded for this to work
			this.width = this.images[0].width * this.scale;
		}else if (text != ""){
			this.width = context.measureText(this.text).width;
		} 
	}
	
	//No height given, use the font-size or image-height
	if (this.height == -1){
		if (this.currentImage != null){
			//Be careful, the image has to be loaded for this to work
			this.height = this.images[0].height * this.scale;
		}else if (text != ""){
			this.height = this.fontSize;
		} 
	}
	
	//this.setPosition();
	
    this.hitBox = new HitBox(this.posX, this.posY, this.width, this.height, returnFunction, context);
};

Button.prototype.pickFont = function()
{
	switch(this.layoutFormat)
	{
		case BUTTON_LAYOUT_DEFAULT:
			this.fontSize = 52;
			this.lineWidth = 8;
			this.textHeight = 39;
			break;
		case BUTTON_LAYOUT_MOREGAMES:
			this.fontSize = 33;
			this.lineWidth = 6;
			this.textHeight = 22;
			break;
		case BUTTON_LAYOUT_SMALL_BUTTON:
			this.fontSize = 38;
			this.lineWidth = 6;
			this.textHeight = 29;
			break;
		case BUTTON_LAYOUT_MOREGAMES_SMALL:
			this.fontSize = 24;
			this.lineWidth = 4;
			this.textHeight = 16;
			break;
//		case BUTTON_LAYOUT_CENTERED:
//			this.fontSize = 45;
//			this.lineWidth = 6;
//			this.textHeight = this.fontSize - this.lineWidth; //(this.lineWidth / 2);
//			break;
	};
};

Button.prototype.setPosition = function()
{
	console.log("context.measureText(this.text).width: " + context.measureText(this.text).width);
	
	switch(this.layoutFormat)
	{
		case BUTTON_LAYOUT_SMALL_BUTTON:
		case BUTTON_LAYOUT_MOREGAMES_SMALL:
			this.textPosX += (this.width / 2) - (context.measureText(this.text).width / 2);
			this.textPosY += (this.height / 2) + (this.textHeight / 2) - 3;
			break;
		default:
			this.textPosX += (this.width / 2) - (context.measureText(this.text).width / 2);
			this.textPosY += (this.height / 2) + (this.textHeight / 2);
	};
};

Button.prototype.update = function()
{
    if (this.currentImage != null){
    	drawImageScaled(this.context, this.currentImage, this.posX, this.posY, this.scale);
    }
    
    this.setFont();
    
    var tx = this.textPosX;
    var ty = this.textPosY;
	switch(this.layoutFormat)
	{
		case BUTTON_LAYOUT_SMALL_BUTTON:
		case BUTTON_LAYOUT_MOREGAMES_SMALL:
			tx += (this.width / 2) - (context.measureText(this.text).width / 2);
			ty += (this.height / 2) + (this.textHeight / 2) - 3;
			break;
		default:
			tx += (this.width / 2) - (context.measureText(this.text).width / 2);
			ty += (this.height / 2) + (this.textHeight / 2);
			break;
//		case BUTTON_LAYOUT_CENTERED:
//			this.posX -= (this.width / 2);
//			break;
	};
    
    
    this.context.strokeText(this.text, tx, ty);
    this.context.fillText(this.text, tx, ty);
    
    this.hitBox.update();
};

Button.prototype.setFont = function()
{
	//Set default fill properties
	this.context.font = " " + this.fontSize + 'px dimboregular';
	this.context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
	this.context.lineWidth = this.lineWidth;
	this.context.strokeStyle = '#032d41';
	this.context.textAlign = 'left';
	this.context.fillStyle = "white";
};

Button.prototype.resizeToImage = function()
{
	if (this.currentImage != null)
	{
		this.width = this.images[0].width * this.scale;
		this.height = this.images[0].height * this.scale;
	};
};

Button.prototype.setText = function(text) {
	this.text = text;
}

Button.prototype.setImage = function(newImage)
{
	this.currentImage = newImage;
	this.resizeToImage();
};

Button.prototype.checkClick = function(tapPosition)
{
	return this.hitBox.checkClick(tapPosition.x, tapPosition.y);
};

Button.prototype.checkMouseOver = function (mousePosition)
{
	return this.hitBox.checkMouseOver(mousePosition.x, mousePosition.y);
};
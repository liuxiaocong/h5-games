Carousel = function(objectArray)
{
	this.objectArray = objectArray;
	this.currentIndex = 0;
};
Carousel.prototype.constructor = Carousel;

Carousel.prototype.GetNextObject = function()
{
	this.currentIndex++;

	if(this.currentIndex > this.objectArray.length - 1) this.currentIndex = 0;

	return this.objectArray[this.currentIndex];
};

Carousel.prototype.GetPreviousObject = function()
{
	this.currentIndex--;

	if(this.currentIndex < 0) this.currentIndex = this.objectArray.length - 1;

	return this.objectArray[this.currentIndex];
};

Carousel.prototype.GetIndex = function(object)
{
	for(var i = 0; i < this.objectArray.length; i++)
	{
		if(object === this.objectArray[i]) return i;
	};

	return 0;
};

Carousel.prototype.destroy = function()
{
	while(this.objectArray.length > 0)
	{
		var end = this.objectArray.length - 1;
		this.objectArray.pop();
	};

	this.objectArray = null;
};
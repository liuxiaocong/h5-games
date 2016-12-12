/**
 * @class
 * @augments Sprite
 * @description Класс спрайта с расположением последовательности кадров в несколько столбцов
 * @param {Image} img изображение
 * @param {Number} width ширина кадра
 * @param {Number} height высота кадра
 * @param {Number} frames общее количество кадров
 * @param {Number} rows количество строк кадров
 * @param {Number} columns количество столбцов кадров
 */
function TilesSprite(img, width, height, frames, rows, columns)
{
	TilesSprite.superclass.constructor.call(this, img, width, height, rows, columns);
	
	this.framesCount = frames;
	this.animated = (frames > 1);
	
	/** текущий кадр анимации */
	this.currentFrameX = 0;
	
	this.addEventListener("changeframe", TilesSprite.changeStep);
	this.addEventListener("prerender", TilesSprite.sync);
};

Utils.extend(TilesSprite, Sprite);

TilesSprite.create = function(asset, library)
{
	if (typeof asset == 'string')
	{
		library = library || window['library'];
		if (!library) throw new Error("Could not create sprite from asset '%s'. Library not found.", asset);
		asset = library.getAsset(asset);
	}
	return new TilesSprite(asset.bitmap, asset.width||1, asset.height||1, (asset.framesCount || (asset.frames||1)*(asset.layers||1)), asset.frames||1, asset.layers||1);
};

/** @ignore */
TilesSprite.prototype.gotoAndStop = function(frame)
{
	this.currentFrameX = frame;
	this.stop();
};

/** @ignore */
TilesSprite.prototype.gotoAndPlay = function(frame)
{
	this.currentFrameX = frame;
	this.play();
};

/** @ignore */
TilesSprite.changeStep = function(e)
{
	var self = e.target;
	
	if(self.animated)
	{
		self.currentFrameX++;
		if(self.currentFrameX >= self.framesCount) self.currentFrameX = 0;
	}
};

/** @ignore */
TilesSprite.sync = function(e)
{
	var self = e.target;
	
	self.currentLayer = Math.floor(self.currentFrameX / self.totalFrames);
	self.currentFrame = self.currentFrameX - self.currentLayer * self.totalFrames;
};
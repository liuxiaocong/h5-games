/**
 * @class
 * @description Класс для рендеринга текста с помощью спрайтов
 * @param {Image} font изображение в формате спрайта, в котором каждый символ размещен на отдельном кадре
 * @param {Object} width ширина кадра-символа
 * @param {Object} height высота кадра-символа
 */
function SimpleText(font, width, height)
{
	this.font = font;

	/** x-координата точки привязки */
	this.x = 0;
	/** y-координата точки привязки */
	this.y = 0;

	this.width = width;
	this.height = height;

	/** выравнивание */
	this.align = SimpleText.ALIGN_LEFT;
	/** угол поворота */
	this.rotation = 0;
	/** расстояние между символами */
	this.charSpacing = 0;
	/** масштаб */
	this.scale = 1;
	/** полупрозрачность */
	this.opacity = 1;
	/** признак статичности спрайтов текста */
	this.static = false;

	/** карта символов, которая указывает на каком кадре изображения находится какой символ. По умолчанию: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 */
	this.charMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	/** карта нестандартных ширин символов. По умолчанию ширина символа равна ширине, указанной в конструкторе */
    this.charWidth = [];

	/** @ignore */
	this.sprites = [];

	/** @ignore */
	this.text = "";

	/** сцена, на которой будет производится рендеринг */
	this.stage = window.stage;
	
	/** родительский объект, в который будут добавлены спрайты */
	this.parent = window.stage;

	/** @deprecated */
	/** @ignore */
	this.ALIGN_LEFT = SimpleText.ALIGN_LEFT;
	/** @ignore */
	this.ALIGN_RIGHT = SimpleText.ALIGN_RIGHT;
	/** @ignore */
	this.ALIGN_CENTER = SimpleText.ALIGN_CENTER;
}

/** @ignore */
SimpleText.prototype.manageSprites = function(text)
{
	var i, char;
	var len = text.length;
	var sp_len = this.sprites.length;
	if(sp_len < len)
	{
		for(i=0; i<len-sp_len; i++)
		{
			char = new window[SimpleText.spriteClass](this.font, this.width, this.height, this.charMap.length);
			this.sprites.push(char);
			this.parent.addChild(char);
		}
	}

	if(sp_len > len)
	{
		for(i=0; i<sp_len-len; i++) this.parent.removeChild(this.sprites[i]);
		this.sprites.splice(0, sp_len-len);
	}
};

/** @ignore */
SimpleText.prototype.getCharIx = function(char)
{
    for(var i=0; i<this.charMap.length; i++)
    {
        if(this.charMap[i] == char) return i;
    }
    return -1;
};

/** @ignore */
SimpleText.prototype.getCharWidth = function(char)
{
    var i = this.getCharIx(char);

    if(i >= 0) return this.charWidth[i] ? this.charWidth[i] : this.width;
    else return this.width;
};

/** @ignore */
SimpleText.prototype.getWidth = function()
{
    var w = 0;
    for(var i=0; i<this.text.length; i++)
    {
        w += this.getCharWidth(this.text.substr(i, 1)) + this.charSpacing;
    }

    return w;
};

/**
 * рендеринг
 * @param {String} text текст
 */
SimpleText.prototype.write = function(text)
{
	var curX, curY, p, p2, n;

	text = text + "";

	this.text = text;

	this.manageSprites(text);

	curX = this.x;
	curY = this.y;

    if(this.align == SimpleText.ALIGN_CENTER) curX = this.x - (this.getWidth()/2) * this.scale + ((this.getCharWidth(this.text.substr(0, 1))/2) * this.scale);
	if(this.align == SimpleText.ALIGN_RIGHT) curX = this.x - this.getWidth() * this.scale;

	p = new Vector(curX-this.x, 0);
	p.rotate(-this.rotation);
	curX = p.x + this.x;
	curY = p.y + this.y;

	p = new Vector(0, 0);
	for(var i=0; i<text.length; i++)
	{
		this.sprites[i].visible = true;
		n = this.charMap.indexOf(text.substr(i, 1));
		if(n < 0) this.sprites[i].visible = false;
		else
		{
            var chw = this.getCharWidth(this.text.substr(i, 1));

			this.sprites[i].scaleX = this.sprites[i].scaleY = this.scale;
			this.sprites[i].gotoAndStop(n);
			p2 = p.clone();
			p2.x *= this.scale;
			p2.rotate(-this.rotation);
			this.sprites[i].x = p2.x + (this.text.substr(i, 1) == ',' ? curX - (chw / 2) : curX);

			this.sprites[i].y = p2.y + curY;
			this.sprites[i].rotation = this.rotation;
			this.sprites[i].static = this.static;
			this.sprites[i].opacity = this.opacity;

			this.sprites[i].gx = this.sprites[i].x;
			this.sprites[i].gy = this.sprites[i].y;
			this.sprites[i].gscaleX = this.sprites[i].scaleX;
			this.sprites[i].gscaleY = this.sprites[i].scaleY;
			this.sprites[i].grotation = this.sprites[i].rotation;
			this.sprites[i].gopacity = this.sprites[i].opacity;

			p.x += chw + this.charSpacing;
		}
	}
};

/**
 * рендеринг с предыдущим значением текста
 * ВНИМАНИЕ! при изменении любых свойств текста (кроме встроенных твинов), необходимо вызывать этот метод
 */
SimpleText.prototype.refresh = function()
{
	this.write(this.text);
};

/** @ignore */
SimpleText.prototype.addToGroup = function(group)
{
	for(var i=0; i<this.sprites.length; i++)
	{
		this.sprites[i].gx = this.sprites[i].x/2;
		this.sprites[i].gy = this.sprites[i].y;
		group.addChild(this.sprites[i], false);
	}
};

/**
 * добавление текста в группу. Можно использовать после успешного write
 * @param {SpritesGroup} group группа спрайтов
 */
SimpleText.prototype.putToGroup = function(group)
{
	for(var i=0; i<this.sprites.length; i++)
	{
		this.sprites[i].gx = this.sprites[i].x;
		this.sprites[i].gy = this.sprites[i].y;
		group.addChild(this.sprites[i], false);
	}
};

/**
 * рендеринг с предыдущим значением текста в процессе выполнения твина
 */
SimpleText.prototype.refreshOnTween = function(e)
{
	e.target.obj.refresh();
};

/**
 * установка позиции точки привязки
 * @param {Number} x x-координата
 * @param {Number} y y-координата
 */
SimpleText.prototype.setPosition = function(x, y)
{
	this.x = x;
	this.y = y;
	this.refresh();
};

/** очистка твинов текста */
SimpleText.prototype.removeTweens = function()
{
	if(!this.stage) return;
	this.stage.clearObjectTweens(this);
};

/**
 * Создаёт анимацию (сокращённый вызов <a href="Stage.html#createTween">stage.createTween</a>)
 * @return {Tween}
 */
SimpleText.prototype.addTween = function(prop, end, duration, ease, onfinish, onchange)
{
	if(!this.stage)	return;

	var val = this[prop];
	if(isNaN(val)) return;

	var t = this.stage.createTween(this, prop, val, end, duration, ease);
	t.onchange = onchange;
	t.onfinish = onfinish;
	return t;
};

/**
 * Перемещение текста в указанную точку
 * @param {Number} x координата X
 * @param {Number} y координата Y
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
SimpleText.prototype.moveTo = function(x, y, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.setPosition(x, y);
	}
	else
	{
		var t1 = this.addTween('x', x, duration, ease, onfinish, onchange);
		if(t1)
		{
			t1.play();
			t1.addEventListener("change", this.refreshOnTween);
		}

		var t2 = this.addTween('y', y, duration, ease, ( t1 ? null : onfinish), ( t1 ? null : onchange));
		if(t2) t2.play();
		if(t2 && !t1)
		{
			t2.addEventListener("change", this.refreshOnTween);
		}

	}
	return this;
};

/**
 * Перемещение текста на указанное расстояние. Можно использовать в цепочке.
 * @param {Number} x координата X
 * @param {Number} y координата Y
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
SimpleText.prototype.moveBy = function(x, y, duration, ease, onfinish, onchange)
{
	return this.moveTo(this.x + x, this.y + y, duration, ease, onfinish, onchange);
};

/**
 * Изменение прозрачности текста до указанного значения
 * @param {Number} opacity Прозрачность (0-1)
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
SimpleText.prototype.fadeTo = function(opacity, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.opacity = opacity;
	}
	else
	{
		var t = this.addTween('opacity', opacity, duration, ease, onfinish, onchange);
		if(t)
		{
			t.play();
			t.addEventListener("change", this.refreshOnTween);
		}
	}
	return this;
};

/**
 * Изменение прозрачности текста на указанное значение
 * @param {Number} opacity Прозрачность (0-1)
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
SimpleText.prototype.fadeBy = function(opacity, duration, ease, onfinish, onchange)
{
	var val = Math.max(0, Math.min(1, this.opacity + opacity));
	return this.fadeTo(val, duration, ease, onfinish, onchange);
};

/**
 * Поворот текста до указанного угла
 * @param {Number} rotation Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
SimpleText.prototype.rotateTo = function(rotation, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.rotation = rotation;
	}
	else
	{
		var t = this.addTween('rotation', rotation, duration, ease, onfinish, onchange);
		if(t)
		{
			t.play();
			t.addEventListener("change", this.refreshOnTween);
		}
	}
	return this;
};

/**
 * Поворот текста на указанный угол
 * @param {Number} rotation Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
SimpleText.prototype.rotateBy = function(rotation, duration, ease, onfinish, onchange)
{
	return this.rotateTo(this.rotation + rotation, duration, ease, onfinish, onchange);
};

/**
 * Пропорциональное изменение масштаба
 * @param {Number} scale Масштаб
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
SimpleText.prototype.scaleTo = function(scale, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.scale = scale;
	}
	else
	{
		var t = this.addTween('scale', scale, duration, ease, onfinish, onchange);
		if(t)
		{
			t.play();
			t.addEventListener("change", this.refreshOnTween);
		}
	}
	return this;
};

/** название класса спрайта для рендеринга. По умолчанию Sprite */
SimpleText.spriteClass = "Sprite";

/** константа - выравнивание по левому краю */
SimpleText.ALIGN_LEFT = 0;
/** константа - выравнивание по правому краю */
SimpleText.ALIGN_RIGHT = 1;
/** константа - выравнивание по центру */
SimpleText.ALIGN_CENTER = 2;
/**
 * @fileOverview Набор утилит для спрайтового рендеринга на канвасе в стиле Flash
 * @author <a href="mailto:dev@playtomax.com">Александр Dev Норинчак</a>
 * @author <a href="mailto:jet@playtomax.com">Евгений Jet Савичев</a>
 * @version 1.3
 */

var CRENDER_DEBUG = false;

/**
 * @ignore
 */
if( typeof window.console == 'undefined')
{
	window.console =
	{
		log: function() {}
	};
}

/**
 * @class
 * @description Набор утилитарных функций
 */
var Utils = {};

/**
 * Является ли текущее устройство мобильным
 * @type Boolen
 */
Utils.touchScreen = ("createTouch" in document);

/**
 * @description текущий масштаб (1, 1.5, 2)
 * @type Number
 */
Utils.globalScale = 1;

/**
 * Глобальный пиксельный масштаб
 * @type Number
 */
Utils.globalPixelScale = 1;

/**
 * Является ли текущая вкладка не активной
 * @type Boolean
 */
Utils.isWindowHidden = false;

Utils.DOMMainContainerId = "main_container";
Utils.DOMProgressContainerId = "progress_container";
Utils.DOMProgressId = "progress";
Utils.DOMScreenBackgroundContainerId = "screen_background_container";
Utils.DOMScreenBackgroundWrapperId = "screen_background_wrapper";
Utils.DOMScreenBackgroundId = "screen_background";
Utils.DOMScreenContainerId = "screen_container";
Utils.DOMScreenWrapperId = "screen_wrapper";
Utils.DOMScreenId = "screen";
Utils.DOMP2lContainerId = "p2l_container";
Utils.DOMP2lId = "p2l";
Utils.DOMMarkId = "mark";

/**
 * @description Установка куки
 * @param {String} name имя
 * @param {String} value значение
 */
Utils.setCookie = function(name, value)
{
	try
	{
		window.localStorage.setItem(name, value);
	}
	catch(e)
	{
		var exp = new Date();
		exp.setDate(exp.getDate() + 365*10);
		document.cookie = name + "=" + value + "; expires=" + exp.toUTCString();
	}
};

/**
 * @description Получение куки
 * @param {String} name имя
 * @returns {String} значение куки
 */
Utils.getCookie = function(name)
{
	var ret;

	try
	{
		ret = window.localStorage.getItem(name);
	}
	catch(e)
	{
		var prefix = name + "=";
		var cookieStartIndex = document.cookie.indexOf(prefix);
		if (cookieStartIndex == -1) return null;
		var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
		if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
		ret = unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
	}

	return ret;
};

/**
 * @ignore
 */
Utils.bindEvent = function(el, eventName, eventHandler)
{
	if(el.addEventListener)
	{
		el.addEventListener(eventName, eventHandler, false);
	}
	else if(el.attachEvent)
	{
		el.attachEvent('on' + eventName, eventHandler);
	}
};

/**
 * @description Получение абсолютной X координаты левого верхнего угла DOM-элемента
 * @param {DOM} element ссылка на DOM-элемент
 * @returns {Number} координата
 */
Utils.getObjectLeft = function(element)
{
	var result = element.offsetLeft;
	if(element.offsetParent) result += Utils.getObjectLeft(element.offsetParent);
	return result;
};

/**
 * @description Получение абсолютной Y координаты левого верхнего угла DOM-элемента
 * @param {DOM} element ссылка на DOM-элемент
 * @returns {Number} координата
 */
Utils.getObjectTop = function(element)
{
	var result = element.offsetTop;
	if(element.offsetParent) result += Utils.getObjectTop(element.offsetParent);
	return result;
};

/**
 * @description Парсинг GET-параметров страницы
 * @returns {Array} ассоциативный массив ключ-значение
 */
Utils.parseGet = function()
{
	var get = {};

	var s = window.location.toString();
	var p = window.location.toString().indexOf("?");
	var tmp, params;
	if(p >= 0)
	{
		s = s.substr(p + 1, s.length);
		params = s.split("&");
		for(var i = 0; i < params.length; i++)
		{
			tmp = params[i].split("=");
			get[tmp[0]] = tmp[1];
		}
	}

	return get;
};

/**
 * @description Определение координат мыши относительно объекта
 * @param {Event} event событие
 * @param {DOM} object ссылка на DOM-элемент, относительно которого необходимо получить координаты
 * @returns {Object} объект, содержащий в свойствах x и y координаты
 */
Utils.getMouseCoord = function(event, object)
{
	var e = event || window.event;
	if(e.touches) e = e.touches[0];
	if(!e) return {x: 0, y: 0};

	var x = 0;
	var y = 0;
	var mouseX = 0;
	var mouseY = 0;

	if(object)
	{
		x = Utils.getObjectLeft(object);
		y = Utils.getObjectTop(object);
	}

	if(e.pageX || e.pageY)
	{
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
	else if(e.clientX || e.clientY)
	{
		mouseX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		mouseY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	}

	var retX = (mouseX - x);
	var retY = (mouseY - y);

	return {x: retX, y: retY};
};

/**
 * @description Удаление объекта и всех его копий из массива
 * @param {Array} arr Массив
 * @param {Object} item Объект для удаление
 * @returns {Array} Массив без указанного объекта
 */
Utils.removeFromArray = function(arr, item)
{
	var tmp = [];
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i] != item) tmp.push(arr[i]);
	}
	return tmp;
};

/**
 * @description Анимация процесса загрузки. Создает и отображает в элементе с id progress визуальное отображение состояния загрузки. Рекомендуется использовать вместе с <b>Utils.createLayout</b>.
 * @param {Number} val процент загрузки
 * @example
 * var preloader = new ImagesPreloader();
 * preloader.load({"logo", "logo.png"}, loadImagesEnd, Utils.showLoadProgress);
 */
Utils.showLoadProgress = function(val)
{
	var scl = Utils.globalScale;

	var s = 'Loading: ' + val + '%';
	s += '<br><br>';
	s += '<div style="display: block; background: #000; width: ' + (val * scl * 2) + 'px; height: ' + (10 * scl) + 'px;">&nbsp;</div>';

	document.getElementById(Utils.DOMProgressId).innerHTML = s;
};

/**
 * Отключение попыток убрать адресную строку мобильного браузера
 * @type Boolean
 */
Utils.hideAddressBarLock = false;

/**
 * @description Убирание адресной строки мобильного браузера
 */
Utils.mobileHideAddressBar = function()
{
	if(Utils.hideAddressBarLock) return;
	window.scrollTo(0, 1);
};

/**
 * @description Проверка на то, запущено ли приложение на 4-м IPhone
 * @returns {Boolean}
 */
Utils.mobileCheckIphone4 = function()
{
	return (Utils.touchScreen && navigator.userAgent.indexOf('iPhone') >= 0 && window.devicePixelRatio == 2);
};

/** @ignore */
Utils.mobileCheckBrokenAndroid = function()
{
	return ( Utils.touchScreen &&
			 Utils.isAndroid() &&
			!Utils.isChrome() &&
			!Utils.isFirefox() );
};

/** @ignore */
Utils.mobileCheckSlowDevice = function()
{
    return (Utils.mobileCheckBrokenAndroid() && navigator.userAgent.toLowerCase().indexOf("sm-t310") >= 0) ||
           (Utils.touchScreen && Utils.isAndroid() && Utils.isFirefox() && navigator.userAgent.toLowerCase().indexOf("sm-t310") >= 0);
};

/**
 * @description Проверка является ли текущий браузер Chrome
 * @returns {Boolean}
 */
Utils.isChrome = function()
{
	var ret = false;

	if(navigator.userAgent.toLowerCase().indexOf('chrome') >= 0)
	{
		ret = true;
		if(Utils.isAndroid())
		{
			var version = parseInt((/Chrome\/([0-9]+)/.exec(navigator.appVersion) || 0)[1], 10) || 0;
			if(version < 22) ret = false;
		}
	}

	return ret;
};

/**
 * @description Проверка является ли текущее устройство Android
 * @returns {Boolean}
 */
Utils.isAndroid = function()
{
	return navigator.userAgent.toLowerCase().indexOf('android') >= 0;
};

/**
 * @description Проверка является ли текущий браузер PlayFreeBrowser
 * @returns {Boolean}
 */
Utils.isPlayFreeBrowser = function()
{
	return navigator.userAgent.toLowerCase().indexOf('playfreebrowser') >= 0;
};

/**
 * @description Проверка является ли текущий браузер Firefox
 * @returns {Boolean}
 */
Utils.isFirefox = function()
{
	return navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
};

/**
 * @ignore
 */
Utils.checkSpilgamesEnvironment = function()
{
	return ((typeof window.ExternalAPI != "undefined") && ExternalAPI.type == "Spilgames" && ExternalAPI.check());
};

/**
 * @description Добавление meta-тегов, корректирующих viewport мобильных устройств
 */
Utils.mobileCorrectPixelRatio = function()
{
	var meta = document.createElement('meta');
	meta.name = "viewport";
	var content = "target-densitydpi=device-dpi, user-scalable=0";

	if(Utils.isPlayFreeBrowser()) content += ", width=device-width, height=device-height";

	var scale = 1/(window.devicePixelRatio ? window.devicePixelRatio : 1);
	scale = scale.toFixed(2);
	content += ", initial-scale="+scale+", maximum-scale="+scale+", minimum-scale="+scale;

	meta.content = content;

	document.getElementsByTagName('head')[0].appendChild(meta);
};

/**
 * @description Определение разрешения мобильного устройства. Возвращает одно из 4-х поддерживаемых: 240x400, 320х480, 480х800 или 640х960
 * @returns {Object} Объект со свойствами width, height и scale (1 для 320х480, 1.5 или 2)
 */
Utils.getMobileScreenResolution = function(landscape)
{
	var scale = 1;

	var w = window.innerWidth;
	var h = window.innerHeight;

	if(!w || !h)
	{
		w = screen.width;
		h = screen.height;
	}

	var scales =
	[
		{scale: 1, width: 320, height: 480},
		{scale: 1.5, width: 480, height: 720},
		{scale: 2, width: 640, height: 960}
	];

	var container =	{width: 0, height: 0};

	var prop = "";

	if(Utils.touchScreen)
	{
		container.width = Math.min(w, h);
		container.height = Math.max(w, h);
		prop = "height";
	}
	else
	{
		if(landscape)
		{
			var scales =
			[
				{scale: 1, width: 480, height: 320},
				{scale: 1.5, width: 720, height: 480},
				{scale: 2, width: 960, height: 640}
			];
		}

		container.width = w;
		container.height = h;
		prop = "height";
	}

	var min = Number.MAX_VALUE;
	for(var i = 0; i < scales.length; i++)
	{
		var diff = Math.abs(container[prop]-scales[i][prop]);
		if(min > diff)
		{
			min = diff;
			scale = scales[i].scale;
		}
	}

	return Utils.getScaleScreenResolution(scale, landscape);
};

/**
 * @ignore
 */
Utils.getScaleScreenResolution = function(scale, landscape)
{
	var w = Math.round(320 * scale);
	var h = Math.round(480 * scale);

	return {width: landscape ? h : w, height: landscape ? w : h, scale: scale};
};

/**
 * Базовый путь для загрузки изображений
 * @type String
 */
Utils.imagesRoot = 'images';

/**
 * @ignore
 */
Utils.initialResolution = {width: 320, height: 480, scale: 1};

/**
 * Отключение корректировки высоты страницы на мобильных браузерах
 * @type Boolean
 */
Utils.ignoreMobileHeightCorrection = false;

Utils.maxLayoutHeight = 6144;

/**
 * @description Создание стандартного набора элементов окружения: прогресс загрузки, экран для подложки, основной экран и сигнализация о неверном повороте экрана
 * @param {DOM} container элемент-контейнер
 * @param {Object} resolution объект, полученный с помощью Utils.getMobileScreenResolution
 */
Utils.createLayout = function(container, resolution, debug, ignoreCanvas)
{
	var scl = Utils.globalScale;

	Utils.initialResolution = resolution;

	var height = window.innerHeight;

	if(Utils.touchScreen && !Utils.ignoreMobileHeightCorrection) height = Utils.maxLayoutHeight;
	else document.body.style.overflow = "hidden";

	var s = "";
	s += '<div id="' + Utils.DOMProgressContainerId + '" align="center" style="width: 100%; height: ' + height + 'px; display: block; width: 100%; position: absolute; left: 0px; top: 0px;">';
	s += '<table cellspacing="0" cellpadding="0" border="0"><tr><td id="' + Utils.DOMProgressId + '" align="center" valign="middle" style="width: ' + resolution.width + 'px; height: ' + resolution.height + 'px; color: #000; background: #fff; font-weight: bold; font-family: Verdana; font-size: ' + (12 * scl) + 'px; vertical-align: middle;"></td></tr></table>';
	s += '</div>';
	s += '<div id="' + Utils.DOMScreenBackgroundContainerId + '" style="width: 100%; height: ' + height + 'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 2;">';
	s += '<div id="' + Utils.DOMScreenBackgroundWrapperId + '" style="width: ' + resolution.width + 'px; height: ' + resolution.height + 'px; position: relative; left: 0px; overflow: hidden;">';
	if(!ignoreCanvas) s += '<canvas id="' + Utils.DOMScreenBackgroundId + '" width="' + resolution.width + '" height="' + resolution.height + '"></canvas>';
	s += '</div>';
	s += '</div>';
	s += '<div id="' + Utils.DOMScreenContainerId + '" style="width: 100%; height: ' + height + 'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 3;">';
	s += '<div id="' + Utils.DOMScreenWrapperId + '" width="' + resolution.width + '" height="' + resolution.height + '" style="width: ' + resolution.width + 'px; height: ' + resolution.height + 'px; position: relative; left: 0px; overflow: hidden;">';
	if(!ignoreCanvas) s += '<canvas id="' + Utils.DOMScreenId + '" style="position: absolute; left: 0px; top: 0px;" width="' + resolution.width + '" height="' + resolution.height + '">You browser does not support this application :(</canvas>';
	s += '</div>';
	s += '</div>';

	container.innerHTML = s;

	var p = document.createElement("div");
	p.setAttribute("id", Utils.DOMP2lContainerId);
	p.setAttribute("align", "center");

	var w = resolution.width;

	p.setAttribute("style", "width: 100%; height: " + height + "px; position: absolute; left: 0px; top: 0px; visibility: hidden; z-index: 1000; background: #fff;");
	var padding = ((w - 240) / 2);
	if(Utils.isPlayFreeBrowser()) padding /= 8;
	p.innerHTML = '<img id="' + Utils.DOMP2lId + '" src="' + Utils.imagesRoot + '/p2l.jpg" style="padding-top: ' + Math.floor(padding) + 'px" />';
	document.body.appendChild(p);

	var m = document.createElement("div");
	m.setAttribute("id", Utils.DOMMarkId);
	m.style.position = "fixed";
	m.style.right = "0px";
	m.style.bottom = "0px";
	m.style.width = "1px";
	m.style.height = "1px";
	m.style.background = "";
	m.style.zIndex = "100000";
	document.body.appendChild(m);

	Utils.fitLayoutToScreen();
};

/** @description Переключение лайаута в стандартный режим после загрузки */
Utils.showMainLayoutContent = function()
{
	document.getElementById(Utils.DOMProgressContainerId).style.display = 'none';
	document.getElementById(Utils.DOMScreenContainerId).style.display = 'block';
	document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = 'block';
};

/**
 * @description Превент любого бразурного события
 * @param {Event} e Событие
 */
Utils.preventEvent = function(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
};

/**
 * @description Добавление стандартных обработчиков событий для контроля прокрутки страница и поворота экрана
 * @param {Boolean} landscape правильная ориентация экрана
 * @param {Boolean} ignoreIOS7 при true будел лочится скролл даже на IOS7
 */
Utils.addMobileListeners = function(landscape, ignoreIOS7)
{
	if(ignoreIOS7 || !navigator.userAgent.match(/(iPad|iPhone|iPod).*CPU.*OS 7_\d/i))
	{
		Utils.bindEvent(document.body, "touchstart", Utils.preventEvent);
	}

	if(!Utils.isPlayFreeBrowser())
	{
		Utils.bindEvent(window, "scroll", function(e)
		{
			setTimeout(Utils.mobileHideAddressBar, 300);
		});
	}

	document.addEventListener(Utils.getVisibiltyProps().visibilityChange, Utils.handleVisibilityChange, false);

	setInterval("Utils.checkOrientation(" + ( landscape ? "true" : "false") + ")", 500);
	setTimeout(Utils.mobileHideAddressBar, 500);
};

/** @ignore */
Utils.handleVisibilityChange = function()
{
    Utils.isWindowHidden = document[Utils.getVisibiltyProps().hidden];
    Utils.dispatchEvent(Utils.isWindowHidden ? "hidewindow" : "showwindow");
};

/** @ignore */
Utils.getVisibiltyProps = function()
{
    var hidden, visibilityChange;

    if (typeof document.hidden !== "undefined")
    {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    }
    else if (typeof document.mozHidden !== "undefined")
    {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    }
    else if (typeof document.msHidden !== "undefined")
    {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    }
    else if (typeof document.webkitHidden !== "undefined")
    {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    return {hidden: hidden, visibilityChange: visibilityChange};
};

/**
 * @description Определение размеров доступного пространства
 * @returns {Object} {"width": width, "height": height}
 */
Utils.getWindowRect = function()
{
	var d = document.getElementById(Utils.DOMMarkId);

	if(Utils.isAndroid() && d)
	{
		return {width: window.innerWidth, height: d.offsetTop+1};
	}

	return {width: window.innerWidth, height: window.innerHeight};
};

/**
 * @ignore
 */
Utils.storeOrient = null;

/**
 * Отключение проверки на ориентацию устройства
 * @type Boolean
 */
Utils.noCheckOrient = false;

/**
 * @description Проверка на правильную ориентацию устройства
 * @param {Boolean} landscape Верная ориантация: false - портретная, true - лэндскейпная
 */
Utils.checkOrientation = function(landscape)
{
	if(!Utils.touchScreen) return;
	if(!document.getElementById(Utils.DOMScreenContainerId)) return;

	if(Utils.noCheckOrient || Utils.parseGet().nocheckorient == 1) return;

	var rect = Utils.getWindowRect();
	var orient = rect.width > rect.height;

	if(Utils.storeOrient === orient) return;

	Utils.storeOrient = orient;

	var ok = (orient == landscape);

	if(!ok)
	{
		Utils.dispatchEvent("lockscreen");

		document.getElementById(Utils.DOMP2lContainerId).style.visibility = 'visible';
		document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = 'none';
		document.getElementById(Utils.DOMScreenContainerId).style.display = 'none';
	}
	else
	{
		Utils.dispatchEvent("unlockscreen");

		document.getElementById(Utils.DOMP2lContainerId).style.visibility = 'hidden';
		document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = 'block';
		document.getElementById(Utils.DOMScreenContainerId).style.display = 'block';
	}

	if(Utils.checkSpilgamesEnvironment()) document.getElementById(Utils.DOMP2lContainerId).style.display = 'none';

	setTimeout(Utils.mobileHideAddressBar, 900);
	setTimeout(Utils.fitLayoutToScreen, 1000);
};

/**
 * @ignore
 */
Utils.fitLayoutTimer = null;

/**
 * Добавление обработчика изменения размеров экрана
 */
Utils.addFitLayoutListeners = function()
{
	Utils.fitLayoutTimer = setInterval(Utils.fitLayoutToScreen, 500);
};

/**
 * Убирание обработчика изменения размеров экрана
 */
Utils.removeFitLayoutListeners = function()
{
	clearInterval(Utils.fitLayoutTimer);
};

/**
 * Отключение автоматического масштабирования
 * @type Boolean
 */
Utils.fitLayoutLock = false;

/**
 * Отступ по высоте при автоматической коррекции размера
 * @type Number
 */
Utils.fitLayoutCorrectHeight = 0;

/**
 * @ignore
 */
Utils.fitLayoutToScreen = function(container)
{
	if(Utils.fitLayoutLock)	return;

	var p, s, width, height, windowRect;

	if((typeof container != "object") || !container.width)
	{
		windowRect = Utils.getWindowRect();

		width = windowRect.width;
		height = windowRect.height;

		if(Utils.checkSpilgamesEnvironment()) height -= 25;
		height += Utils.fitLayoutCorrectHeight;

		container = {width: width, height: height};
	}

	s = document.getElementById(Utils.DOMScreenWrapperId);
	if(!s) return;

	if(!s.initWidth)
	{
		s.initWidth = Utils.initialResolution.width;
		s.initHeight = Utils.initialResolution.height;
	}

	width = s.initWidth;
	height = s.initHeight;

	var scale = 1;

	var scaleX = container.width / width;
	var scaleY = container.height / height;

	scale = (scaleX < scaleY ? scaleX : scaleY);
	Utils.globalPixelScale = scale;

	width = Math.floor(width * scale);
	height = Math.floor(height * scale);

	if(s.lastWidth == width && s.lastHeight == height) return;

	s.lastWidth = width;
	s.lastHeight = height;

	var maxHeight = Utils.ignoreMobileHeightCorrection ? windowRect.height : Utils.maxLayoutHeight;

	Utils.resizeElement(Utils.DOMScreenId, width, height);
	Utils.resizeElement(Utils.DOMScreenBackgroundId, width, height);

	Utils.resizeElement(Utils.DOMProgressContainerId, windowRect.width, maxHeight);

	Utils.resizeElement(Utils.DOMProgressId, width, height);

	s = Utils.resizeElement(Utils.DOMScreenWrapperId, width, height);
	if(s) s.style.left = Math.floor((windowRect.width-width)/2) + "px";

	s = Utils.resizeElement(Utils.DOMScreenBackgroundWrapperId, width, height);
	if(s) s.style.left = Math.floor((windowRect.width-width)/2) + "px";

	Utils.resizeElement(Utils.DOMP2lContainerId, windowRect.width, windowRect.height);

	Utils.resizeElement(Utils.DOMScreenContainerId, windowRect.width, windowRect.height);
	Utils.resizeElement(Utils.DOMScreenBackgroundContainerId, windowRect.width, windowRect.height);

	Utils.dispatchEvent("fitlayout");

	if(Utils.isPlayFreeBrowser()) window.scrollTo(1, 2);

	setTimeout(Utils.mobileHideAddressBar, 10);
};

/**
 * @ignore
 */
Utils.resizeElement = function(id, width, height)
{
	var s = document.getElementById(id);
	if(!s) return null;

	s.style.width = Math.floor(width) + "px";
	s.style.height = Math.floor(height) + "px";

	return s;
};

/**
 * Отрисовка на сцене области, в которую не должны попадать игровые объекты в связи с ограниченим в IPhone по высоте видимой области браузера.
 * @deprecated
 * @param {Stage} stage сцена
 * @param {Boolean} landscape ориентация экрана игры
 */
Utils.drawIphoneLimiter = function(stage, landscape)
{
	if(landscape) stage.drawRectangle(240, 295, 480, 54, "#f00", true, 0.5, true);
	else stage.drawRectangle(160, 448, 320, 64, "#f00", true, 0.5, true);
};

/**
 * Отладочный метод. Рисует сетку с шагом 10х10, просто чтобы удобнее координаты вычислять.
 * @param {Boolean} landscape ориентация экрана игры
 * @param {String} col цвет в формате #RGB, по умолчанию #FFFFFF
 */
Utils.drawGrid = function(stage, landscape, col)
{
	if( typeof landscape == 'undefined') landscape = false;
	var dx = 10;
	var dy = 10;
	if( typeof col == 'undefined') col = '#FFF';
	var w = 1;

	var s = {w: ( landscape ? 480 : 320), h: ( landscape ? 320 : 480)};

	for(var x = dx; x < s.w; x += dx)
	{
		var o = 0.1 + 0.1 * (((x - dx) / dx) % 10);
		stage.drawLine(x, 0, x, s.h, w, col, o);
	}
	for(var y = dy; y < s.h; y += dy)
	{
		var o = 0.1 + 0.1 * (((y - dy) / dy) % 10);
		stage.drawLine(0, y, s.w, y, w, col, o);
	}
};

/**
 * Заливка неиспользуемого пространства на канвасе для нестандартных масштабов
 * @deprecated
 * @param {Stage} stage сцена
 * @param {Boolean} landscape ориентация экрана
 */
Utils.drawScaleFix = function(stage, landscape)
{
	if(Utils.globalScale == 0.75)
	{
		if(landscape) stage.drawRectangle(507, 160, 54, 320, "#000", true, 1, true);
		else stage.drawRectangle(160, 507, 320, 54, "#000", true, 1, true);
	}
	if(Utils.globalScale == 1.5)
	{
		if(landscape) stage.drawRectangle(510, 160, 60, 320, "#000", true, 1, true);
		else stage.drawRectangle(160, 510, 320, 60, "#000", true, 1, true);
	}
};

/**
 * Перевод градусов в радианы
 * @param val значение
 */
Utils.grad2radian = function(val)
{
	return val / (180 / Math.PI);
};

/**
 * Перевод радиан в градусы
 * @param val значение
 */
Utils.radian2grad = function(val)
{
	return val * (180 / Math.PI);
};

/** @ignore */
Utils.eventsListeners = [];

/**
 * @event
 * @description Callback, вызываемый при блокировании экрана
 */
Utils.onlockscreen = null;

/**
 * @event
 * @description Callback, вызываемый при разблокировании экрана
 */
Utils.onunlockscreen = null;

/**
 * @event
 * @description Callback, вызываемый при переключении на другую вкладку
 */
Utils.onhidewindow = null;

/**
 * @event
 * @description Callback, вызываемый при переключении на текущую вкладку
 */
Utils.onshowwindow = null;

/**
 * @event
 * @description Callback, вызываемый при изменении размера окна
 */
Utils.onfitlayout = null;

/**
 * @description добавление обработчика событий
 * @param {String} type Тип события (lockscreen, unlockscreen, fitlayout)
 * @param {Function} callback Функция обработчик события
 */
Utils.addEventListener = function(type, callback)
{
	EventsManager.addEvent(Utils, type, callback);
};

/**
 * @description удаление обработчика событий
 * @param {String} type Тип события
 * @param {Function} callback Функция обработчик события
 */
Utils.removeEventListener = function(type, callback)
{
	EventsManager.removeEvent(Utils, type, callback);
};

/**
 * @description генерирование события
 * @param {String} type Тип события
 * @param {Object} params Параметры, которые будут переданы в обработчик
 */
Utils.dispatchEvent = function(type, params)
{
	return EventsManager.dispatchEvent(Utils, type, params);
};

/**
 * @description Проверка на то, является ли объект массивом
 * @param {Object} obj Проверяемый объект
 */
Utils.isArray = function(obj)
{
	return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * @description Проверка на то, является ли объект "чистым" объектом, а не инстансом какого-либо класса
 * @param {Object} obj Проверяемый объект
 */
Utils.isPlainObject = function(obj)
{
	if(!obj || !obj.constructor) return false;
	return obj.constructor === Object;
};

/**
 * @description Преобразование в массив аргументов функции
 * @param {Object} arg Арументы функции
 * @param {Number} from Начиная с какого аргумента возвращать значения
 */
Utils.getFunctionArguments = function(arg, from)
{
	if(typeof from == "undefined") from = 0;
	return [].slice.call(arg, from);
};

/**
 * @description Привязка функции к контексту. Все переданные аргументы после обязательных будут также переданы.
 * @param {Function} fn
 * @param {Object} context
 */
Utils.proxy = function(fn, context)
{
	var args = Utils.getFunctionArguments(arguments, 2);

	var p = function()
	{
		return fn.apply(context || this, Utils.getFunctionArguments(arguments, 0).concat(args));
	};

	return p;
};

/**
 * @description Имитация наследования
 * @param {Function} Child дочерняя функция
 * @param {Function} Parent родительская функция
 */
Utils.extend = function(Child, Parent)
{
	var F = function() {};

	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.superclass = Parent.prototype;
};

/**
 * @description Вызов конструктора родительского класса. Все аргументы после обязательных будут переданы в конструктор.
 * @param {Function} fn Дочерняя функция
 * @param {Object} context Дочерний объект
 * @example Utils.callSuperConstructor(MyVector, this, 10, 20);
 */
Utils.callSuperConstructor = function(fn, context)
{
	fn.superclass.constructor.apply(context, Utils.getFunctionArguments(arguments, 2));
};

/**
 * @description Вызов метода родительского класса. Все аргументы после обязательных будут переданы в метод.
 * @param {Function} fn Фунция текущего объекта функция
 * @param {Object} context Текущий объект (в общем случае - this)
 * @param {String} method Имя метода
 * @example Utils.callSuperMethod(MyVector, this, "rotate", Math.PI);
 */
Utils.callSuperMethod = function(fn, context, method)
{
	return fn.superclass[method].apply(context, Utils.getFunctionArguments(arguments, 3));
};

/**
 * Копирование свойств из одного объекта в другой. Функции и инстансы классов копируются по ссылке. Остальные - по значению.
 * @param {objFrom} obj
 * @param {objTo} obj
 */
Utils.copyObjectProps = function(objFrom, objTo)
{
    for(var i in objFrom)
    {
        if(!objFrom.hasOwnProperty(i)) continue;

        if(Utils.isArray(objFrom[i]))
        {
            objTo[i] = [];
            for(var n=0; n<objFrom[i].length; n++)
            {
                if(typeof objFrom[i][n] == "object") objTo[i][n] = Utils.cloneEmptyObject(objFrom[i][n]);
                Utils.copyObjectProps(objFrom[i][n], objTo[i][n]);
            }
            continue;
        }

        if(Utils.isPlainObject(objFrom[i]))
        {
            Utils.copyObjectProps(objFrom[i], objTo[i]);
            continue;
        }

        objTo[i] = objFrom[i];
    }
};

/** @ignore */
Utils.cloneEmptyObject = function(obj)
{
    if(obj.constructor) return new obj.constructor();
    return {};
};

/**
 * Клонирование объекта
 * @param {Object} obj
 */
Utils.clone = function(obj)
{
    if(!obj || (typeof obj != "object")) return obj;

    var clone = Utils.cloneEmptyObject(obj);

    Utils.copyObjectProps(obj, clone);

    return clone;
};

/**
 * Переключение работы всех классов на тайминг по времени, а не по кадрам
 * @param {Number} delta Таймаут на переключение кадров
 */
Utils.switchToTimeMode = function(delta)
{
    Tween.STEP_TYPE = Tween.STEP_BY_TIME;
    StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_TIME;
    Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_TIME;
    Sprite.CHANGE_FRAME_DELAY = delta;
};

Utils.getGameID = function()
{
    if(window.GAME_ID && window.GAME_ID != "my_game") return window.GAME_ID;

    var s = window.location.toString(), tmp = s.split("/"), id = "", name;
    while(!id)
    {
        id = tmp.pop();
        if(id.split(".").length > 1) id = "";
        if(tmp.length == 0) id = "my_game";
    }
    return id;
};

/** @ignore */
Utils.ajax = function(url, method, params, dataType, successCallback, failCallback)
{
    var xmlhttp;

    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4)
        {
            if (xmlhttp.status == 200 || xmlhttp.status==0)
            {
                var ret = xmlhttp.responseText;
                if(dataType == "json") ret = JSON.parse(ret);
                if(dataType == "xml") ret = Utils.parseXMLString(ret);

                if(successCallback) successCallback(ret, xmlhttp);
            }
            else
            {
                if(failCallback) failCallback(xmlhttp.status, xmlhttp);
            }
        }
    };

    if(params)
    {
        var p = [];
        for(var i in params) p.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));
        params = p.join("&");
    }
    else params = "";

    if(!method) method = "GET";

    xmlhttp.open(method, url + (method == "GET" ? "?"+params : ""), true);

    if(method == "POST") xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.send(method != "GET" ? params : null);
};

/**
 * GET-запрос
 * @param {String} url ссылка
 * @param {Object} params объект ключ-значение параметров запроса
 * @param {String} dataType тип ожидаемых данных (string, xml или json)
 * @param {Function} successCallback обработчик успешного запроса
 * @param {Function} failCallback обработчик ошибочного запроса
 */
Utils.get = function(url, params, dataType, successCallback, failCallback)
{
    Utils.ajax(url, "GET", params, dataType, successCallback, failCallback);
};

/**
 * POST-запрос
 * @param {String} url ссылка
 * @param {Object} params объект ключ-значение параметров запроса
 * @param {String} dataType тип ожидаемых данных (string, xml или json)
 * @param {Function} successCallback обработчик успешного запроса
 * @param {Function} failCallback обработчик ошибочного запроса
 */
Utils.post = function(url, params, dataType, successCallback, failCallback)
{
    Utils.ajax(url, "POST", params, dataType, successCallback, failCallback);
};

/** @ignore */
Utils.getBezierBasis = function(i, n, t)
{
    function f(n) {return (n <= 1) ? 1 : n * f(n - 1);}
    return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
};

/**
 * Рассчет кривой безье
 * @param {Array} points массив точек ({x: x, y: y})
 * @param {Object} step шаг рассчета (от >0 до 1)
 */
Utils.getBezierCurve = function(points, step)
{
    if (typeof step == "undefined") step = 0.1;

    var res = [];

    step = step / points.length;

    for (var t = 0.0; t < 1 + step; t += step)
    {
        if (t > 1) t = 1;

        var ind = res.length;

        res[ind] = {x: 0, y: 0};

        for (var i = 0; i < points.length; i++)
        {
            var b = Utils.getBezierBasis(i, points.length - 1, t);

            res[ind].x += points[i].x * b;
            res[ind].y += points[i].y * b;
        }
    }

    return res;
};

/**
 * Парсинг xml-строки
 * @param {Object} data
 */
Utils.parseXMLString = function(data)
{
    var xml = null;

    if (typeof window.DOMParser != "undefined")
    {
        xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    }
    else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM"))
    {
        xml = new window.ActiveXObject("Microsoft.XMLDOM");
        xml.async = "false";
        xml.loadXML(data);
    }
    else
    {
        throw new Error("No XML parser found");
    }

    return xml;
};

/**
 * @class
 * @description Класс для загрузки картинок
 */
function ImagesPreloader()
{
	this.curItem = -1;
	this.loadedImages =	{};

	this.data = null;
	this.endCallback = null;
	this.processCallback = null;

	/**
	 * стартовое значение прогресса загрузки
	 * @type Number
	 */
	this.minProgressVal = 0;
	/**
	 * на сколько процентов максимум может поменяться прогресс загрузки
	 * @type Number
	 */
	this.maxProgressVal = 100;

	this.wait = Utils.proxy(this.wait, this);
}

/**
 * @method load
 * @description Старт загрузки
 * @param {Array} data Массив объектов вида [{name: '', src: ''}, {...}...], где name - идентификатор картинки, src - ссылка на картинку.
 * @param {Function} endCallback Callback функция, которая будет вызвана при окончании загрузки. Передаваемый параметр - массив объектов вида [{name: Image}, {...}...]
 * @param {Function} processCallback (Optional) Callback функция, которая вызывается в процессе загрузки. Передаваемый параметр - процент загрузки.
 * @example
 * var preloader = new ImagesPreloader();
 * var data = [];
 * data.push({'test1', 'test1.jpg'});
 * data.push({'test2', 'test2.jpg'});
 * preloader.load(data, endLoad, processLoad);
 */
ImagesPreloader.prototype.load = function(data, endCallback, processCallback)
{
	this.data = data;
	this.endCallback = endCallback;
	this.processCallback = processCallback;

	for(var i = 0; i < this.data.length; i++)
	{
		var item = this.data[i];
		var img = new Image();
		img.src = item.src;
		this.loadedImages[item.name] = img;
	}

	this.wait();
};

/**
 * @ignore
 */
ImagesPreloader.prototype.wait = function()
{
	var itemsLoaded = 0;
	var itemsTotal = 0;
	for(var key in this.loadedImages)
	{
		if(this.loadedImages[key].complete)	itemsLoaded++;
		itemsTotal++;
	}

	if(itemsLoaded >= itemsTotal)
	{
		if(this.endCallback) this.endCallback(this.loadedImages);
		return;
	}
	else
	{
		if(this.processCallback) this.processCallback(Math.floor(itemsLoaded / itemsTotal * this.maxProgressVal + this.minProgressVal));
		setTimeout(this.wait, 50);
	}
};

/**
 * @class
 * @description Класс для загрузки звуков
 */
function SoundsPreloader(sounds, endCallback, progressCallback)
{
	this.sounds = sounds;
	this.endCallback = endCallback;
	this.progressCallback = progressCallback;

	this.loadedCount = 0;

	/**
	 * стартовое значение прогресса загрузки
	 * @type Number
	 */
	this.minProgressVal = 0;
	/**
	 * на сколько процентов максимум может поменяться прогресс загрузки
	 * @type Number
	 */
	this.maxProgressVal = 100;
}

/**
 * @method
 * @description Проверка на поддержку формата mp3 браузером
 */
SoundsPreloader.prototype.isMp3Support = function()
{
    return false;
	return document.createElement('audio').canPlayType('audio/mpeg') != "";
};

/**
 * @method
 * @description Проверка на поддержку WebAudio браузером
 */
SoundsPreloader.prototype.isWebAudio = function()
{
	return Boolean(window.AudioMixer) && AudioMixer.isWebAudioSupport();
};

/**
 * @method
 * @description Старт загрузки
 * @param {Array} sounds Массив имен звуков для загрузки.
 * @param {Function} endCallback Callback функция, которая будет вызвана при окончании загрузки.
 * @param {Function} processCallback (Optional) Callback функция, которая вызывается в процессе загрузки. Передаваемый параметр - процент загрузки.
 */
SoundsPreloader.prototype.load = function(sounds, endCallback, progressCallback)
{
	if(sounds) this.sounds = sounds;
	if(endCallback) this.endCallback = endCallback;
	if(progressCallback) this.progressCallback = progressCallback;


	if(!this.sounds || this.sounds.length < 1 || !this.isWebAudio())
	{
		if(this.endCallback) this.endCallback();
		return;
	}

    if(!this.isMp3Support())
    {
        if(this.endCallback) this.endCallback();
        return;
    }
	var ext = this.isMp3Support() ? "mp3" : "ogg";
	var xmlhttp, src, wrapper;

	this.loadedCount = 0;

	var self = this;

	for(var i=0; i<this.sounds.length; i++)
	{
	    src = this.sounds[i] + "." + ext;

	    if(this.isWebAudio())
	    {
		    if (window.XMLHttpRequest)
		    {
		        xmlhttp = new XMLHttpRequest();
		    }
		    else
		    {
		        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		    }

		    xmlhttp.open("GET", src, true);
		    xmlhttp.responseType = 'arraybuffer';

		    xmlhttp.onreadystatechange = function()
		    {
		        if (this.readyState == 4 && (this.status == 200 || this.status == 0))
		        {
					var url = this.soundSrc;

					if(!AudioMixer.waContext) AudioMixer.waContext = new AudioContext();
					AudioMixer.waContext.decodeAudioData(this.response,
						function(buffer)
						{
							AudioMixer.buffer[url] = buffer;
							self.soundIsLoaded(null, self);
						},
						function(err)
						{
							self.soundIsLoaded(null, self);
						});
		        }
		    };

		    xmlhttp.soundSrc = src;
		    xmlhttp.send();
	    }
	    else
	    {
	    	wrapper = document.createElement('audio');
	    	wrapper.src = src;
			wrapper.type = (ext == "mp3" ? "audio/mpeg" : "audio/ogg");
			wrapper.preload = "auto";
			wrapper.load();
			wrapper.addEventListener("canplay", Utils.proxy(this.soundIsLoaded, wrapper, this));
			wrapper.addEventListener("canplaythrough", Utils.proxy(this.soundIsLoaded, wrapper, this));
	    }
	}
};

/**
 * @ignore
 */
SoundsPreloader.prototype.soundIsLoaded = function(e, self)
{
	if(this.nodeName && this.nodeName.toLowerCase() == "audio")
	{
		if(this.alreadyLoaded) return;
		this.alreadyLoaded = true;
	}

	self.loadedCount++;

	if(self.progressCallback) self.progressCallback(Math.floor(self.loadedCount / self.sounds.length * self.maxProgressVal + self.minProgressVal));

	if(self.loadedCount >= self.sounds.length)
	{
		if(self.endCallback) self.endCallback();
	}
};


/**
 * @class
 * @description Класс элемента в библиотеке <a href="AssetsLibrary.html">AssetsLibrary</a>
 * @param {String} name Уникальное название, по которому можно будет обращаться к элементу в библиотеке
 * @param {String} src URL изображения
 * @param {Number} w ширина одного кадра в спрайте в масштабе 1х
 * @param {Number} h высота одного кадра спрайта в масштабе 1х
 * @param {Number} f количество кадров в спрайте (расположены вертикально)
 * @param {Number} l количество слоёв в спрайте (расположены горизонтально)
 * @example см. описание <a href="Sprite.html#constructor">Sprite</a>
 */
function Asset(name, src, w, h, f, l)
{
	/**
	 * @description Название, по которому потом можно обращаться к элементу в библиотеке
	 * @type {String}
	 */
	this.name = name + '';

	/**
	 * @description URL изображения
	 * @type {String}
	 */
	this.src = src + '';

	/**
	 * @description ширина одного кадра в спрайте в масштабе 1х
	 * @type {Number}
	 */
	this.width = w;

	/**
	 * @description высота одного кадра спрайта в масштабе 1х
	 * @type {Number}
	 */
	this.height = h;

	/**
	 * @description количество кадров в спрайте (расположены вертикально)
	 * @type {Number}
	 */
	this.frames = f;

	/**
	 * @description количество слоёв в спрайте (расположены горизонтально)
	 * @type {Number}
	 */
	this.layers = l;

	/**
	 * @description Изображение после загрузки
	 * @type {Image}
	 */
	this.bitmap = null;

	/**
	 * @ignore
	 * @description Associated game object
	 * @type {Object}
	 */
	this.object = null;

	/**
	 * @description Флаг выставляется в TRUE после того, как изображение загружено и готово к использованию.
	 * @type {Boolean}
	 */
	this.ready = (this.width && this.height);

	/**
	 * @description Конструктор спрайта (строка или функция)
	 * @type {Function}
	 */
	this.spriteClass = null;
};

/**
 * @ignore
 * @method detectSize
 * @description Определяет размеры спрайта либо как указано, либо пытается автоматом
 */
Asset.prototype.detectSize = function()
{
	if(!this.bitmap) return false;
	try
	{
		if(isNaN(this.width))
		{
			this.width = this.bitmap.width ? parseInt(this.bitmap.width) : 0;
		}

		if(isNaN(this.height))
		{
			this.height = this.bitmap.height ? parseInt(this.bitmap.height) : 0;
		}
	}
	catch (e)
	{
		if(CRENDER_DEBUG) console.log(e);
	}

	return (!isNaN(this.width) && !isNaN(this.height));
};

/**
 * @ignore
 * @method normalize
 * @description Преобразовывает размеры соответственно указанному масштабу и количеству кадров/слоёв. Если размер неизвестен - пытается определить его сам.
 */
Asset.prototype.normalize = function(scale)
{
	if(this.ready) return;
	if(!this.detectSize()) return;

	if(isNaN(this.frames) || this.frames < 1) this.frames = 1;
	if(isNaN(this.layers) || this.layers < 1) this.layers = 1;

	this.width = Math.ceil((this.width / this.layers) / scale);
	this.height = Math.ceil((this.height / this.frames) / scale);

	this.ready = true;
};

/**
 * @class
 * @description Класс для предзагрузки растра и его использования
 * @param {String} path Путь к изображениям относительно JS, в котором используется библиотека
 * @param {Number} scale Используемый масштаб
 * @param {Array of Asset} assets Необязательный массив описаний для загрузки (см. <a href="Asset.html">Asset</a>). Удобно использовать, если эти данные определяются в отдельном JS.
 * @example
 * Использовать примерно так:
 * <code>
 * var library = new AssetsLibrary('images', Utils.globalScale);
 *
 * library.addAsset('%PATH%/blank.gif', 'blank'); // %PATH% указывается в конструкторе
 * library.addAsset('%SCALE%/hourglass.png', 'hourglass'); // %SCALE% = %PATH%/scale
 * library.addAsset('%SCALE%/ui/background.jpg', 'background', 480, 320); // 1 frame, 1 layer
 * library.addAsset('%SCALE%/ui/button.png', 'button', 480, 320, 1, 3); // 1 frame, 3 layers
 * library.addAsset('%SCALE%/animations/thing.png', 'thing', 120, 100, 5); // 5 frames animation
 *
 * library.load(
 * 	function(assets) {
 * 		// всё загружено
 * 	},
 * 	function(progress) {
 * 		// загружено (progress * 100) процентов
 * 	}
 * );
 *
 * // --------------------------------
 *
 * var params = {
 * 	x: 100, y: 200, zIndex: 20,
 * 	animated: false,
 * 	onclick: myClickHandler
 * }
 *
 * var mc = library.getSprite('thing', params);
 * stage.addChild(mc);
 * </code>
 */
function AssetsLibrary(path, scale, assets)
{
	/**
	 * @description Папка с картинками
	 * @type {String}
	 */
	this.path = 'images';

	/**
	 * @description Масштаб
	 * @type {String}
	 */
	this.scale = 1;

	/**
	 * @description Массив описаний мувиков
	 * @type {Hash of Asset}
	 */
	this.items = {};

	/**
	 * @description Хеш загруженных мувиков имя:Sprite. Доступен после загрузки.
	 * @type {Hash of Image}
	 */
	this.bitmaps = {};

	/**
	 * @description Флаг полной загрузки последней очереди.
	 * @type {Boolean}
	 */
	this.loaded = false;

	/**
	 * @description callback на загрузку очереди
	 * @type {Function}
	 */
	this.onload = null;

	/**
	 * @description callback на прогресс загрузки очереди
	 * @type {Function}
	 */
	this.onloadprogress = null;

	/**
	 * @description Класс спрайта, который будет возвращаться библиотекой
	 * @type {Function}
	 */
	this.spriteClass = Sprite;

	this.onLoadHandler = Utils.proxy(this.onLoadHandler, this);
	this.onLoadProgressHandler = Utils.proxy(this.onLoadProgressHandler, this);

	this.init(path, scale);
	this.addAssets(assets);
};

/**
 * @method init
 * @description Инициализация библиотеки
 * @param {String} папка с картинками
 * @param {float} масштаб
 * @returns {void}
 */
AssetsLibrary.prototype.init = function(path, scale)
{
	if( typeof path != 'undefined')
	{
		this.path = path + '';
	}
	if( typeof scale != 'undefined')
	{
		this.scale = parseFloat(scale);
		if(isNaN(this.scale)) this.scale = 1;
	}
};

/**
 * @method load
 * @description Загрузка AssetsLibrary.items
 * @param {Function} callback завершения
 * @param {Function} callback прогресса
 * @param {Number} minProgressVal стартовое значение прогресса загрузки
 * @param {Number} maxProgressVal на сколько процентов максимум может поменяться прогресс загрузки
 * @returns {void}
 */
AssetsLibrary.prototype.load = function(onload, onloadprogress, minProgressVal, maxProgressVal)
{
	this.onload = onload;
	this.onloadprogress = onloadprogress;

	var preloader = new ImagesPreloader();
	var data = [];
	for(var n in this.items)
	data.push(this.items[n]);

	if(typeof minProgressVal != "undefined") preloader.minProgressVal = minProgressVal;
	if(typeof maxProgressVal != "undefined") preloader.maxProgressVal = maxProgressVal;

	preloader.load(data, this.onLoadHandler, this.onLoadProgressHandler);
};

/**
 * @method onLoadProgressHandler
 * @access private
 * @description Внутренний обработчик прогресса загрузки
 * @param {Number} Progress 0-1
 * @returns {void}
 */
AssetsLibrary.prototype.onLoadProgressHandler = function(val)
{
	if( typeof this.onloadprogress == 'function')
	{
		this.onloadprogress(val);
	}
};

/**
 * @method onLoadHandler
 * @access private
 * @description Внутренний обработчик завершения загрузки
 * @param {Array of Image} Loaded bitmaps
 * @returns {void}
 */
AssetsLibrary.prototype.onLoadHandler = function(data)
{
	this.loaded = true;
	for(var n in data)
	{
		var bmp = data[n];
		var asset = this.items[n];

		asset.bitmap = bmp;
		asset.normalize(this.scale);
	}

	if( typeof this.onload == 'function')
	{
		this.onload(this.items);
	}
	};

/**
 * @method addAssets
 * @description Добавляет набор картинок
 * @param {Array of Object} Набор картинок, массив объектов-описаний, например из конфига приложения.
 * @returns {void}
 */
AssetsLibrary.prototype.addAssets = function(data)
{
	if( typeof data == 'undefined') return;
	if( typeof data != 'object') return;

	for(var i = 0; i < data.length; i++)
	{
		var item = data[i];
		item.noscale = ( typeof item.noscale == 'undefined') ? false : item.noscale;
		if(!item.noscale) item.src = '%SCALE%/' + item.src;

		//this.addAsset(item.src, item.name, item.width, item.height, item.frames, item.layers);
		this.addAsset(item);
	}
};

/**
 * @method addAsset
 * @description Ставит мувик в очередь на загрузку
 * @param {String} Путь к картинке. Используйте %SCALE%/path/asset.ext для картинок с масштабом
 * @param {String} Название в bitmaps. Если не указано, будет использовано имя файла без расширения.
 * @param {Number} Ширина в масштабе 1x. Если не указана, будет произведена попытка определить автоматически (Внимание! Автоопределение не везде поддерживается)
 * @param {Number} Высота в масштабе 1x. Если не указана, будет произведена попытка определить автоматически (Внимание! Автоопределение не везде поддерживается)
 * @param {Number} Количество фреймов (вертикально). Default = 1
 * @param {Number} Количество слоёв (горизонтально). Default = 1
 * @returns {Asset}
 */
AssetsLibrary.prototype.addAsset = function(src, name, w, h, f, l)
{
	function src2name(src)
	{
		var name = src.split('/');
		name = name.pop();
		name = name.split('.');
		name = name.shift() + '';
		return name;
	}

	var spriteClass = null;
	if (typeof src == 'object' && (arguments.length == 1))
	{
		name = src.name;
		w = src.width || 1;
		h = src.height || 1;
		f = src.frames || 1;
		l = src.layers || 1;
		spriteClass = src.spriteClass || null;
		properties = src.properties || null;
		src = src.src;
	}

	src = src.replace('%SCALE%', '%PATH%/' + this.scale);
	src = src.replace('%PATH%', this.path);
	if( typeof name == 'undefined') name = src2name(src);

	var asset = new Asset(name, src, w, h, f, l);
	asset.spriteClass = spriteClass;

	// extend asset with custom properties
	if (properties) for (var prop in properties)
	{
		if (typeof asset[prop] == 'undefined') asset[prop] = properties[prop];
	}

	this.items[name] = asset;
	return asset;
};

/**
 * @method addObject
 * @description Добавляет новый игровой объект в очередь загрузки
 * @param {Object} Объект из levels.js
 * @returns {Asset}
 */
AssetsLibrary.prototype.addObject = function(obj)
{
	// objects are always scaled and size is 1x
	var asset = this.addAsset('%SCALE%/' + obj.image, obj.name, obj.width * this.scale, obj.height * this.scale, obj.frames, obj.layers);
	if(asset) asset.object = obj;
	return asset;
};

/**
 * @method getAsset
 * @description Получить спрайт по имени
 * @param {String} Имя спрайта
 * @param {Boolean} Проверка, загружен ли и готов ли к использованию спрайт. Default = TRUE
 * @returns {Asset}
 */
AssetsLibrary.prototype.getAsset = function(name, checkLoad)
{
	var asset = null;

	if(( typeof this.items[name] != 'undefined') && (this.items[name].bitmap))
	{
		checkLoad = ( typeof checkLoad == 'undefined') ? true : checkLoad;
		asset = (!checkLoad || this.items[name].ready) ? this.items[name] : null;
	}

	if(!asset)
	{
		throw new Error('Trying to get undefined asset "' + name + '"');
	}

	return asset;
};

/**
 * @method getSprite
 * @description Возвращает спрайт в нужном масштабе и размере.
 * @param {String} Название картинки
 * @param {Object} Стартовые значениея свойств спрайта (например {x:10, y:20, opacity:0.5, onclick:myOnClick})
 * @param {Function} Конструктор спрайта. По умолчанию Sprite. Этот аргумент можно использовать, если требуется инстанциировать объект класса, наследующего Sprite
 * @returns {Sprite}
 */
AssetsLibrary.prototype.getSprite = function(name, params, spriteClass)
{
	var mc = null, asset = null;
	try
	{
		asset = this.getAsset(name, true);
	}
	catch (e)
	{
		asset = new Asset();
	}

	spriteClass = spriteClass || asset.spriteClass || this.spriteClass || window.Sprite;
	if (spriteClass && (typeof spriteClass == 'function') || (typeof window[spriteClass] == 'function'))
	{
		spriteClass = (typeof spriteClass == 'function') ? spriteClass : window[spriteClass];
	}

	if (spriteClass.create && (typeof spriteClass.create == 'function'))
	{
		mc = spriteClass.create(asset, this);
	}
	else
	{
		// TODO: remove default sprite constructor usage
		mc = new spriteClass(asset.bitmap, asset.width, asset.height, asset.frames, asset.layers);
	}

	if (params && (typeof params == 'object'))
	{
		// override sprite defaults
		for(var prop in params)	mc[prop] = params[prop];
	}

	return mc;
};

/**
 * @method getBitmap
 * @description Возвращает bitmap в нужном масштабе и размере.
 * @param {String} Название картинки
 * @returns {Image}
 */
AssetsLibrary.prototype.getBitmap = function(name)
{
	try
	{
		var asset = this.getAsset(name, true);
		return asset.bitmap;
	}
	catch (e)
	{
		return null;
	}
};

/**
 * @class
 * @description Абстрактная точка
 * @param {Number} x координата
 * @param {Number} y координата
 */
function Vector(x, y)
{
	if( typeof (x) == 'undefined') x = 0;
	/**
	 * координата x
	 * @type Number
	 */
	this.x = x;

	if( typeof (y) == 'undefined') y = 0;
	/**
	 * координата y
	 * @type Number
	 */
	this.y = y;
}

/**
 * Проверка на нулевые значения x и y
 */
Vector.prototype.isZero = function()
{
	return this.x == 0 && this.y == 0;
};

/**
 * Клонирование точки
 * @returns {Vector} копия точки
 */
Vector.prototype.clone = function()
{
	return new Vector(this.x, this.y);
};

/**
 * Сложение точек
 * @param {Vector} точка
 */
Vector.prototype.add = function(p)
{
	this.x += p.x;
	this.y += p.y;
	return this;
};

/**
 * Вычитание точек
 * @param {Vector} точка
 */
Vector.prototype.subtract = function(p)
{
	this.x -= p.x;
	this.y -= p.y;
	return this;
};

/**
 * Скалярное умножение
 * @param {Number} число
 */
Vector.prototype.mult = function(n)
{
	this.x *= n;
	this.y *= n;
	return this;
};

/**
 * Инвертирование
 * @param {Number} число
 */
Vector.prototype.invert = function()
{
	this.mult(-1);
	return this;
};

/**
 * Поворот точки
 * @param {Number} angle угол поворота
 * @param {Vector} offset смещение
 */
Vector.prototype.rotate = function(angle, offset)
{
	if( typeof (offset) == 'undefined') offset = new Vector(0, 0);
	var r = this.clone();
	r.subtract(offset);
	r.x = this.x * Math.cos(angle) + this.y * Math.sin(angle);
	r.y = this.x * -Math.sin(angle) + this.y * Math.cos(angle);
	r.add(offset);
	this.x = r.x;
	this.y = r.y;
	return this;
};

/**
 * Нормализация точки
 * @param {Number} angle угол поворота
 * @param {Vector} offset смещение
 */
Vector.prototype.normalize = function(angle, offset)
{
	if( typeof (offset) == 'undefined') offset = new Vector(0, 0);
	this.subtract(offset);
	this.rotate(-angle);
	return this;
};

/**
 * Возвращает скалярную длину вектора
 * @returns {Number} длина вектора
 */
Vector.prototype.getLength = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Вычисление расстояния до другой точки
 * @param {Vector} p точка
 */
Vector.prototype.distanceTo = function(p)
{
	p2 = this.clone();
	p2.subtract(p);
	return p2.getLength();
	};

/**
 * @class
 * @description Абстрактный прямоугольник
 * @param {Number} x x координата центра
 * @param {Number} y y координата центра
 * @param {Number} w ширина
 * @param {Number} h высота
 * @param {Number} angle угол поворота
 */
function Rectangle(x, y, w, h, angle)
{
	/**
	 * центр
	 * @type Vector
	 */
	this.center = new Vector(x, y);

	/**
	 * ширина
	 * @type Number
	 */
	this.width = w;

	/**
	 * высота
	 * @type Number
	 */
	this.height = h;

	/**
	 * угол поворота
	 * @type Number
	 */
	this.angle = angle;

	/**
	 * массив вершин (Vector)
	 * @type Array
	 */
	this.vertices = [];

	/**
	 * Координаты верхнего левого и нижнего правого угла Axis-Aligned Bounding Box прямоугольника (Vector)
	 * @type Array
	 */
	this.AABB = [];

	this.refreshVertices();
};

/**
 * Клонирование прямоугольника
 * @returns {Rectangle} копия прямоугольника
 */
Rectangle.prototype.clone = function()
{
	return new Rectangle(this.center.x, this.center.y, this.width, this.height, this.angle);
};

/**
 * Пересчет вершин прямоугольника
 */
Rectangle.prototype.refreshVertices = function()
{
	var w = this.width / 2;
	var h = this.height / 2;
	this.vertices = [];
	this.vertices.push(new Vector(-w, h));
	this.vertices.push(new Vector(w, h));
	this.vertices.push(new Vector(w, -h));
	this.vertices.push(new Vector(-w, -h));

	this.AABB = [this.center.clone(), this.center.clone()];

	for(var i = 0; i < 4; i++)
	{
		this.vertices[i].rotate(-this.angle, this.center);
		if(this.vertices[i].x < this.AABB[0].x) this.AABB[0].x = this.vertices[i].x;
		if(this.vertices[i].x > this.AABB[1].x) this.AABB[1].x = this.vertices[i].x;
		if(this.vertices[i].y < this.AABB[0].y) this.AABB[0].y = this.vertices[i].y;
		if(this.vertices[i].y > this.AABB[1].y) this.AABB[1].y = this.vertices[i].y;
	}
};

/**
 * Смещение прямоугольника
 * @param {Number} x смещение по оси x
 * @param {Number} y смещение по оси y
 */
Rectangle.prototype.move = function(x, y)
{
	this.center.add(new Vector(x, y));
	this.refreshVertices();
};

/**
 * Поворот прямоугольника
 * @param {Number} angle угол поворота
 */
Rectangle.prototype.rotate = function(angle)
{
	this.angle += angle;
	this.refreshVertices();
};

/**
 * Проверка на вхождение точки в прямоугольник
 * @param {Vector} point точка
 * @returns {Boolean}
 */
Rectangle.prototype.hitTestPoint = function(point)
{
	var p = point.clone();
	p.normalize(-this.angle, this.center);
	return ((Math.abs(p.x) <= (this.width / 2)) && (Math.abs(p.y) <= (this.height / 2)));
};

/**
 * Проверка на пересечение с другим прямоугольником
 * @param {Rectangle} rect прямоугольник
 * @returns {Boolean}
 */
Rectangle.prototype.hitTestRectangle = function(rect)
{
	var r1 = this.clone();
	var r2 = rect.clone();
	var len, len1, len2;

	r1.move(-this.center.x, -this.center.y);
	r2.move(-this.center.x, -this.center.y);
	r2.center.rotate(this.angle);
	r1.rotate(-this.angle);
	r2.rotate(-this.angle);
	len = Math.max(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x) - Math.min(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x);
	len1 = r1.AABB[1].x - r1.AABB[0].x;
	len2 = r2.AABB[1].x - r2.AABB[0].x;
	if(len > len1 + len2) return false;

	len = Math.max(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y) - Math.min(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y);
	len1 = r1.AABB[1].y - r1.AABB[0].y;
	len2 = r2.AABB[1].y - r2.AABB[0].y;
	if(len > len1 + len2) return false;

	r1.move(-r2.center.x, -r2.center.y);
	r2.move(-r2.center.x, -r2.center.y);
	r1.center.rotate(r2.angle);
	r1.refreshVertices();
	r1.rotate(-r2.angle);
	r2.rotate(-r2.angle);

	len = Math.max(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x) - Math.min(r1.AABB[0].x, r1.AABB[1].x, r2.AABB[0].x, r2.AABB[1].x);
	len1 = r1.AABB[1].x - r1.AABB[0].x;
	len2 = r2.AABB[1].x - r2.AABB[0].x;
	if(len > len1 + len2) return false;

	len = Math.max(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y) - Math.min(r1.AABB[0].y, r1.AABB[1].y, r2.AABB[0].y, r2.AABB[1].y);
	len1 = r1.AABB[1].y - r1.AABB[0].y;
	len2 = r2.AABB[1].y - r2.AABB[0].y;
	if(len > len1 + len2) return false;

	return true;
};

/** @ignore */
var EventsManager = {};

/** @ignore */
EventsManager.addEvent = function(obj, type, callback)
{
	if(!obj.eventsListeners) return;

	for(var i = 0; i < obj.eventsListeners.length; i++)
	{
		if(obj.eventsListeners[i].type === type && obj.eventsListeners[i].callback === callback) return;
	}

	obj.eventsListeners.push({type: type, callback: callback});
};

/** @ignore */
EventsManager.removeEvent = function(obj, type, callback)
{
	if(!obj.eventsListeners) return;

	for(var i = 0; i < obj.eventsListeners.length; i++)
	{
		if(obj.eventsListeners[i].type === type && obj.eventsListeners[i].callback === callback)
		{
			obj.eventsListeners = Utils.removeFromArray(obj.eventsListeners, obj.eventsListeners[i]);
			return;
		}
	}
};

/** @ignore */
EventsManager.dispatchEvent = function(obj, type, params)
{
	if(!obj.eventsListeners) return;

	var ret;

	if( typeof obj["on" + type] == "function")
	{
		ret = obj["on"+type](params);
		if(ret === false) return false;
	}

	for(var i = 0; i < obj.eventsListeners.length; i++)
	{
		if(obj.eventsListeners[i].type === type)
		{
			ret = obj.eventsListeners[i].callback(params);
			if(ret === false) return false;
		}
	}
};

/** @ignore */
EventsManager.hasEventListener = function(obj, type)
{
	if(!obj.eventsListeners) return;

	for(var i = 0; i < obj.eventsListeners.length; i++)
	{
		if(obj.eventsListeners[i].type === type) return true;
	}

	return false;
};

/** @ignore */
EventsManager.removeAllEventListeners = function(obj, type)
{
	if(!obj.eventsListeners) return;
	if(typeof type == "undefined") obj.eventsListeners = [];

	var result = [];

	for(var i = 0; i < obj.eventsListeners.length; i++)
	{
		if(obj.eventsListeners[i].type !== type) result.push(obj.eventsListeners[i]);
	}

	obj.eventsListeners = result;
};

/**
 * @class
 * @description Класс, реализующий механизм менеджмента событий
 */
function EventsProxy()
{
	/** @ignore */
	this.eventsListeners = [];
};

/**
 * @description добавление обработчика событий
 * @param {String} type Тип события
 * @param {Function} callback Функция обработчик события
 */
EventsProxy.prototype.addEventListener = function(type, callback)
{
	EventsManager.addEvent(this, type, callback);
};

/**
 * @description удаление обработчика событий
 * @param {String} type Тип события
 * @param {Function} callback Функция обработчик события
 */
EventsProxy.prototype.removeEventListener = function(type, callback)
{
	EventsManager.removeEvent(this, type, callback);
};

/**
 * @description генерирование события
 * @param {String} type Тип события
 * @param {Object} params Параметры, которые будут переданы в обработчик
 */
EventsProxy.prototype.dispatchEvent = function(type, params)
{
	return EventsManager.dispatchEvent(this, type, params);
};

/**
 * @description проверка, имеет ли объект обработчики событий указанного типа
 * @param {String} type Тип события
 */
EventsProxy.prototype.hasEventListener = function(type)
{
	return EventsManager.hasEventListener(this, type);
};

/**
 * @description удаление всех обработчиков событий
 * @param {String} type Тип события. Если тип не указан, будут удалены все обработчики
 */
EventsProxy.prototype.removeAllEventListeners = function(type)
{
	EventsManager.removeAllEventListeners(this, type);
};

/**
 * @class
 * @description Коллекция обработчиков анимации. Все типы обработчиков состоят из функций easeIn, easeOut и easeInOut
 * @example Easing.bounce.easeIn
 */
var Easing = {};

// t - the current time, between 0 and duration inclusive.
// b - the initial value of the animation property.
// c - the total change in the animation property.
// d - the duration of the motion.

/**
 * Анимация движения вперед-назад
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.back =
{
	easeIn: function(t, b, c, d)
	{
		var s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},

	easeOut: function(t, b, c, d)
	{
		var s = 1.70158;
		return c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		var s = 1.70158;
		if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	}
};

/**
 * Анимация подпрыгивания
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.bounce =
{
	easeIn: function(t, b, c, d)
	{
		return c - Easing.bounce.easeOut(d - t, 0, c, d) + b;
	},

	easeOut: function(t, b, c, d)
	{
		if((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b;
		else if(t < (2 / 2.75)) return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		else if(t < (2.5 / 2.75)) return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		else return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		if(t < d / 2) return Easing.bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
		else return Easing.bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
};

/**
 * Анимация с имитацией движения по кругу
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.circular =
{
	easeIn: function(t, b, c, d)
	{
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},

	easeOut: function(t, b, c, d)
	{
		return c * Math.sqrt(1 - ( t = t / d - 1) * t) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}
};

/**
 * Анимация с гиперболическим ускорением
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.cubic =
{
	easeIn: function(t, b, c, d)
	{
		return c * (t /= d) * t * t + b;
	},

	easeOut: function(t, b, c, d)
	{
		return c * (( t = t / d - 1) * t * t + 1) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}
};

/**
 * Анимация с экспоненциальным ускорением
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.exponential =
{
	easeIn: function(t, b, c, d)
	{
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},

	easeOut: function(t, b, c, d)
	{
		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
};

/**
 * Анимация без ускорения (линейное изменение параметра)
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.linear =
{
	easeIn: function(t, b, c, d)
	{
		return c * t / d + b;
	},

	easeOut: function(t, b, c, d)
	{
		return c * t / d + b;
	},

	easeInOut: function(t, b, c, d)
	{
		return c * t / d + b;
	}
};

/**
 * Анимация с параболическим ускорением
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.quadratic =
{
	easeIn: function(t, b, c, d)
	{
		return c * (t /= d) * t + b;
	},

	easeOut: function(t, b, c, d)
	{
		return -c * (t /= d) * (t - 2) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		if((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}
};

/**
 * Анимация с квадратичным ускорением
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.quartic =
{
	easeIn: function(t, b, c, d)
	{
		return c * (t /= d) * t * t * t + b;
	},

	easeOut: function(t, b, c, d)
	{
		return -c * (( t = t / d - 1) * t * t * t - 1) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}
};

/**
 * Анимация с ускорением в 5 степени
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.quintic =
{
	easeIn: function(t, b, c, d)
	{
		return c * (t /= d) * t * t * t * t + b;
	},

	easeOut: function(t, b, c, d)
	{
		return c * (( t = t / d - 1) * t * t * t * t + 1) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}
};

/**
 * Анимация с синусоидальным ускорением
 * @property {Function} easeIn
 * @property {Function} easeOut
 * @property {Function} easeInOut
 */
Easing.sine =
{
	easeIn: function(t, b, c, d)
	{
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},

	easeOut: function(t, b, c, d)
	{
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},

	easeInOut: function(t, b, c, d)
	{
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
};

/**
 * @class
 * @augments EventsProxy
 * @description Класс Анимации
 * @example Рекомендуется использовать посредством метода <a href="Stage.html#createTween">Stage.createTween</a>
 */
function Tween(obj, prop, start, end, duration, callback)
{
	Utils.callSuperConstructor(Tween, this);

	if( typeof obj != 'object') obj = null;

	if(obj)
	{
		if( typeof obj[prop] == 'undefined') throw new Error('Trying to tween undefined property "' + prop + '"');
		if(isNaN(obj[prop])) throw new Error('Tweened value can not be ' + ( typeof obj[prop]));
	}
	else
	{
		if(isNaN(prop)) throw new Error('Tweened value can not be ' + ( typeof prop));
	}

	if( typeof callback != 'function') callback = Easing.linear.easeIn;

	/**
	 * Объект, содержащий анимируемое свойство
	 * @type Object
	 */
	this.obj = obj;

	/**
	 * Название анимируемого свойства. Значение свойства должно быть числом.
	 * @type String
	 */
	this.prop = prop;

	/**
	 * @event
	 * @description Callback функция, вызываемая после очередного шага анимации.
	 * @description В качестве параметра передается объект с полями: target - ссылка на Tween, value - текущее значение функции анимации
	 */
	this.onchange = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая после полного завершения анимации.
	 * @description В качестве параметра передается объект с полями: target - ссылка на Tween, value - итоговое значение переменной
	 */
	this.onfinish = null;

	/**
	 * Начальное значение
	 * @type Number
	 */
	this.start = start;

	/**
	 * Конечное значение
	 * @type Number
	 */
	this.end = end;

	/**
	 * Длительность анимации в фреймах или милисекундах (зависит от Tween.STEP_TYPE)
	 * @type Number
	 */
	this.duration = ~~duration;

	/**
	 * Функция анимации
	 * @type Function
	 */
	this.callback = callback;

	/**
	 * Флаг воспроизведения анимации
	 * @type Boolean
	 */
	this.playing = false;

	/**
	 * Текущая позиция анимации
	 * @ignore
	 * @type Boolean
	 */
	this._pos = -1;

	/** @ignore */
	this.eventsListeners = [];
}

Utils.extend(Tween, EventsProxy);

/**
 * Начинает воспроизведение
 */
Tween.prototype.play = function()
{
	this.playing = true;
	this.tick(0);
};

/**
 * Приостанавливает воспроизведение
 */
Tween.prototype.pause = function()
{
	this.playing = false;
};

/**
 * Отматывает воспроизведение в начало
 */
Tween.prototype.rewind = function()
{
	this._pos = -1;
};

/**
 * Перепрыгивает сразу на последню позицию
 */
Tween.prototype.forward = function()
{
	this._pos = this.duration;
};

/**
 * Останавливает воспроизведение и перематывает в начало
 */
Tween.prototype.stop = function()
{
	this.pause();
	this.rewind();
};

/**
 * Устанавливает изменяемое значение
 * @param {Number} val Новое значение анимируемого параметра
 */
Tween.prototype.updateValue = function(val)
{
	if(this.obj)
	{
		this.obj[this.prop] = val;
	}
	else
	{
		this.prop = val;
	}
};

/**
 * Делает очередной шаг анимации
 */
Tween.prototype.tick = function(delta)
{
	if(!this.playing) return false;
	if(!delta) delta = 0;

	if(Tween.STEP_TYPE == Tween.STEP_BY_FRAME) this._pos++;
	else this._pos += delta;

	// it's possible to use this behavior to create delay before animation
	if(this._pos < 0) return false;

	if(this._pos > this.duration) return this.finish();

	var func = this.callback;
	var val = func(this._pos, this.start, this.end - this.start, this.duration);

	this.updateValue(val);

	this.dispatchEvent("change", {target: this, value: val});
	return false;
};

/**
 * Завершает анимацию
 */
Tween.prototype.finish = function()
{
	this.stop();
	this.updateValue(this.end);

	if(this.dispatchEvent("finish", {target: this, value: this.end}) === false) return false;

	return true;
};

/** Тайминг твина по кадрам анимации */
Tween.STEP_BY_FRAME = 0;
/** Тайминг твина по милисекундам */
Tween.STEP_BY_TIME = 1;

/** Тип тайминга у твина. По усмолчанию: Tween.STEP_BY_FRAME */
Tween.STEP_TYPE = Tween.STEP_BY_FRAME;

/**
 * @class
 * @description Класс контейнера для визуальных объектов
 * @augments EventsProxy
 */
function DisplayObjectContainer()
{
	Utils.callSuperConstructor(DisplayObjectContainer, this);

	this.parent = null;

	this.objectsCounter = 0;
	this.objects = [];

	/**
	 * x координата центра
	 * @type Number
	 */
	this.x = 0;

	/**
	 * y координата центра
	 * @type Number
	 */
	this.y = 0;

	/**
	 * Ширина
	 * @type Number
	 */
	this.width = 0;

	/**
	 * Высота
	 * @type Number
	 */
	this.height = 0;

	/**
	 * Точка привязки к координатам и центр вращения
	 * Задается относительно центра
	 * @type Point
	 */
	this.anchor = {x: 0, y: 0};

	/**
	 * Область, в которой определяются мышиные события. По умолчанию - видимая область объекта.
	 * Переназначется объектом: sprite.hitArea = {x: 0, y: 0, width: 10, height: 20}
	 * x, y - координаты центра области относительно точки привязки спрайта. width, height - размеры области
	 */
	this.hitArea = null;

	/**
	 * Масштаб по X
	 * @type Number
	 */
	this.scaleX = 1;

	/**
	 * Масштаб по Y
	 * @type Number
	 */
	this.scaleY = 1;

	/**
	 * Искривление по оси X
	 * @type Number
	 */
	this.skewX = 0;

	/**
	 * Искривление по оси Y
	 * @type Number
	 */
	this.skewY = 0;

	/**
	 * Угол поворота в радианах
	 * @type Number
	 */
	this.rotation = 0;

	/**
	 * Полупрозрачность
	 * @type Number
	 */
	this.opacity = 1;

	/**
	 * Цвет заливки фона (CSS)
	 * @type String
	 */
	this.fillColor = null;

	/**
	 * Линейный градиент заливки
	 * @type Object
	 * @example
	 * var fill = {
	 *		x0: 0,  //x координата первой точки вектора градиента
	 *		y0: 0,  //y координата первой точки вектора градиента
	 *		x1: 20, //x координата второй точки вектора градиента
	 *		y1: 20, //y координата второй точки вектора градиента
	 *		//массив точек изменения цвета
	 *		points: [
	 *			{point: 0, color: "#FF0"},
	 *			{point: 0.5, color: "#F0F"}
	 *		]
	 *	}
	 */
	this.fillLinearGradient = null;

	/**
	 * Радиальный градиент заливки
	 * @type Object
	 * @example
	 * var fill = {
	 *		x0: 0,  //x координата первого круга градиента
	 *		y0: 0,  //y координата первого круга градиента
	 *		r0: 5,  //радиус первого круга градиента
	 *		x1: 0,  //x координата второго круга градиента
	 *		y1: 0,  //y координата второго круга градиента
	 *		r1: 20  //радиус второго круга градиента
	 *		//массив точек изменения цвета
	 *		points: [
	 *			{point: 0, color: "#FF0"},
	 *			{point: 0.5, color: "#F0F"}
	 *		]
	 *	}
	 */
	this.fillRadialGradient = null;

	/**
	 * Заливка текстурой
	 * @type Object
	 * @example
	 * var fill = {
			img: bitmaps.brick1, //ссылка на картинку
			repeat: "repeat" //метод размножения картинки: repeat, repeat-x, repeat-y, no-repeat
		}
	 */
	this.fillPattern = null;
};

Utils.extend(DisplayObjectContainer, EventsProxy);

/**
 * Возвращает абсолютный угол наклона относительно родительского элемента самого верхнего уровня
 */
DisplayObjectContainer.prototype.getAbsoluteRotation = function()
{
	return this.rotation + (this.parent ? this.parent.getAbsoluteRotation() : 0);
};

/**
 * Возвращает абсолютное значение полупрозрачности относительно родительского элемента самого верхнего уровня
 */
DisplayObjectContainer.prototype.getAbsoluteOpacity = function()
{
	return this.opacity * (this.parent ? this.parent.getAbsoluteOpacity() : 1);
};

/**
 * Возвращает абсолютное значение масштаба по оси x относительно родительского элемента самого верхнего уровня
 */
DisplayObjectContainer.prototype.getAbsoluteScaleX = function()
{
	return this.scaleX * (this.parent ? this.parent.getAbsoluteScaleX() : 1);
};

/**
 * Возвращает абсолютное значение масштаба по оси y относительно родительского элемента самого верхнего уровня
 */
DisplayObjectContainer.prototype.getAbsoluteScaleY = function()
{
	return this.scaleY * (this.parent ? this.parent.getAbsoluteScaleY() : 1);
};

/**
 * Возвращает абсолютное значение искривления по оси x относительно родительского элемента самого верхнего уровня
 */
DisplayObjectContainer.prototype.getAbsoluteSkewX = function()
{
	return this.skewX + (this.parent ? this.parent.getAbsoluteSkewX() : 0);
};

/**
 * Возвращает абсолютное значение искривления по оси y относительно родительского элемента самого верхнего уровня
 */
DisplayObjectContainer.prototype.getAbsoluteSkewY = function()
{
	return this.skewY + (this.parent ? this.parent.getAbsoluteSkewY() : 0);
};

DisplayObjectContainer.prototype.render = function(cns, drawStatic, delta)
{
	for(var i = 0; i < this.objects.length; i++)
	{
		obj = this.objects[i];

		if(obj.destroy)
        {
            this.removeChild(obj);
            i--;
        }
        else
        {
            if(obj.visible) obj.render(cns, drawStatic, delta);
        }

		/*
		ok = false;
		if(!drawStatic && !obj['static']) ok = true;
		if(drawStatic && obj['static'])	ok = true;

		if(ok)
		{
			if(obj.destroy)
			{
				this.removeChild(obj);
				i--;
			}
			else
			{
				if(obj.visible)	obj.render(cns, drawStatic, delta);
			}
		}
		*/
	}
};

/**
 * @description Получение абсолютной X координаты с учетом текущего масштаба
 * @returns {Number}
 */
DisplayObjectContainer.prototype.getX = function()
{
	return Math.round(this.x * Utils.globalScale);
};
/**
 * @description Получение абсолютной Y координаты с учетом текущего масштаба
 * @returns {Number}
 */
DisplayObjectContainer.prototype.getY = function()
{
	return Math.round(this.y * Utils.globalScale);
};
/**
 * @description Получение абсолютной ширины с учетом текущего масштаба
 * @returns {Number}
 */
DisplayObjectContainer.prototype.getWidth = function()
{
	return this.width * Math.abs(this.getAbsoluteScaleX()) * Utils.globalScale;
};
/**
 * @description Получение абсолютной высоты с учетом текущего масштаба
 * @returns {Number}
 */
DisplayObjectContainer.prototype.getHeight = function()
{
	return this.height * Math.abs(this.getAbsoluteScaleY()) * Utils.globalScale;
};

/**
 * Обёртка для позиционирования
 * @param {Number} x
 * @param {Number} y
 */
DisplayObjectContainer.prototype.getPosition = function()
{
	return {x: this.x, y: this.y};
};

/**
 * Обёртка для позиционирования
 * @param {Number} x
 * @param {Number} y
 */
DisplayObjectContainer.prototype.setPosition = function(x, y)
{
	if((typeof y == 'undefined') && (typeof x['x'] != 'undefined') && (typeof x['y'] != 'undefined'))
	{
		return this.setPosition(x.x, x.y);
	}
	this.x = parseFloat(x);
	this.y = parseFloat(y);
};

/**
 * Установка пропорционального масштаба
 * @param {Number} scale Масштаб по осям X и Y
 */
DisplayObjectContainer.prototype.setPropScale = function(scale)
{
	this.scaleX = this.scaleY = scale * 1;
};

/**
 * Возвращает точку привязки относительно центра
 * @return {Vector} Точка привязки
 */
DisplayObjectContainer.prototype.getAnchor = function()
{
	return this.anchor;
};

/**
 * Устанавливает точку привязки относительно центра
 * @param {Number} x
 * @param {Number} y
 */
DisplayObjectContainer.prototype.setAnchor = function(x, y)
{
	if(( typeof y == 'undefined') && ( typeof x['x'] != 'undefined') && ( typeof x['y'] != 'undefined'))
	{
		return this.setAnchor(x.x, x.y);
	}
	this.anchor.x = parseFloat(x);
	this.anchor.y = parseFloat(y);
};

/**
 * Выравнивает точку привязки горизонтально и вертикально
 * @param {Number} h = DisplayObjectContainer.ANCHOR_ALIGN_LEFT | DisplayObjectContainer.ANCHOR_ALIGN_CENTER | DisplayObjectContainer.ANCHOR_ALIGN_RIGHT
 * @param {Number} v = DisplayObjectContainer.ANCHOR_VALIGN_TOP | DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE | DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM
 * @return {Vector} Точка привязки
 */
DisplayObjectContainer.prototype.alignAnchor = function(h, v)
{
	h = parseInt(h);
	if(isNaN(h)) h = DisplayObjectContainer.ANCHOR_ALIGN_CENTER;
	if(h < 0) h = DisplayObjectContainer.ANCHOR_ALIGN_LEFT;
	if(h > 0) h = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT;

	v = parseInt(v);
	if(isNaN(v)) v = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE;
	if(v < 0) v = DisplayObjectContainer.ANCHOR_VALIGN_TOP;
	if(v > 0) v = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM;

	this.anchor.x = this.width * h / 2;
	this.anchor.y = this.height * v / 2;
	return this.getAnchor();
};

/**
 * Возвращает точку привязки в координатах родителя
 * @return {Vector}
 */
DisplayObjectContainer.prototype.getAbsoluteAnchor = function()
{
	return this.getPosition();
};

/**
 * Возвращает смещение центра относительно точки привязки с учётом scaleX, scaleY
 * @return {Vector}
 */
DisplayObjectContainer.prototype.getRelativeCenter = function()
{
	var anchor = this.getAnchor(), r = this.getAbsoluteRotation();
	var a = {x: anchor.x, y: anchor.y};

	if(r != 0)
	{
		a = new Vector(-a.x * this.getAbsoluteScaleX(), -a.y * this.getAbsoluteScaleY());
		a.rotate(-r);
	}
	else
	{
		a.x = -(a.x * this.getAbsoluteScaleX());
		a.y = -(a.y * this.getAbsoluteScaleY());
	}

	return a;
};

/**
 * Возвращает координаты точки привязки в глобальной системе координат
 */
DisplayObjectContainer.prototype.getAbsolutePosition = function()
{
	var v = {x: this.x, y: this.y};
	if(this.parent)
	{
		var p = this.parent.getAbsolutePosition();
		var r = this.parent.getAbsoluteRotation();

		if(r != 0)
		{
			var a = new Vector(v.x * this.parent.getAbsoluteScaleX(), v.y * this.parent.getAbsoluteScaleY());
			a.rotate(-r);

			v.x = p.x + a.x;
			v.y = p.y + a.y;
		}
		else
		{
			v.x = p.x + v.x * this.parent.getAbsoluteScaleX();
			v.y = p.y + v.y * this.parent.getAbsoluteScaleY();
		}
	}
	return v;
};

/**
 * Возвращает центр в координатах родителя с учётом scaleX, scaleY
 * @return {Vector}
 */
DisplayObjectContainer.prototype.getAbsoluteCenter = function()
{
	var v = this.getAbsolutePosition();
	var c = this.getRelativeCenter();

	v.x += c.x;
	v.y += c.y;

	return v;
};

/**
 * Синоним DisplayObjectContainer.getAbsoluteCenter()
 * @return {Vector}
 */
DisplayObjectContainer.prototype.getCenter = function()
{
	return this.getAbsoluteCenter();
};

DisplayObjectContainer.prototype.getHitAreaRectangle = function()
{
	if(!this.hitArea) return this.getDrawRectangle();

	var rotation = this.getAbsoluteRotation(), scX = this.getAbsoluteScaleX(), scY = this.getAbsoluteScaleY();
	var c = this.getCenter(), r = new Rectangle(0, 0, this.hitArea.width * Math.abs(scX), this.hitArea.height * Math.abs(scY), rotation);
	if(rotation != 0)
	{
		var p = new Vector(this.hitArea.x * scX, this.hitArea.y * scY);
		p.rotate(-rotation);
		r.move(c.x + p.x, c.y + p.y);
	}
	else
	{
		r.move(c.x + this.hitArea.x * scX, c.y + this.hitArea.x * scY);
	}

	return r;
};

/**
 * Возвращает зону отрисовки с учётом масштабирования и вращения
 * @return {Rectangle}
 */
DisplayObjectContainer.prototype.getDrawRectangle = function()
{
	var c = this.getCenter(), r = new Rectangle(0, 0, this.width * Math.abs(this.getAbsoluteScaleX()), this.height * Math.abs(this.getAbsoluteScaleY()), this.getAbsoluteRotation());
	r.move(c.x, c.y);
	return r;
};

/**
 * Возвращает зону AABB с учётом масштабирования и вращения
 * @return {Rectangle}
 */
DisplayObjectContainer.prototype.getAABBRectangle = function()
{
	var r = this.getDrawRectangle(), w = r.AABB[1].x - r.AABB[0].x, h = r.AABB[1].y - r.AABB[0].y;
	return new Rectangle(r.AABB[0].x + (w / 2), r.AABB[0].y + (h / 2), w, h, 0);
};

/**
 * Переводит точку в координатах объекта в координаты сцены.
 * За центр координат объекта берётся точка привязки, оси координат с учётом вращения объекта
 * @param {Number|Vector} x или Vector
 * @param {Number} y
 * @return {Vector}
 */
DisplayObjectContainer.prototype.localToGlobal = function(x, y)
{
	var p = (( typeof x == 'object') && ( typeof x['x'] != 'undefined') && ( typeof x['y'] != 'undefined')) ? new Vector(x.x + 0, x.y + 0) : new Vector(x, y);
	p.rotate(this.getAbsoluteRotation()).add(this.getAbsolutePosition());
	return p;
};

/**
 * Переводит точку в координатах сцены в координаты объекта.
 * За центр координат объекта берётся точка привязки, оси координат с учётом вращения объекта
 * @param {Number|Vector} x или Vector
 * @param {Number} y
 * @return {Vector}
 */
DisplayObjectContainer.prototype.globalToLocal = function(x, y)
{
	var p = (( typeof x == 'object') && ( typeof x['x'] != 'undefined') && ( typeof x['y'] != 'undefined')) ? new Vector(x.x + 0, x.y + 0) : new Vector(x, y);
	p.subtract(this.getAbsolutePosition()).rotate(this.getAbsoluteRotation());
	return p;
};

/**
 * Получение максимального zIndex объекта
 * Возвращает объект, содержащий index - индекс объекта в массиве objects и zIndex
 */
DisplayObjectContainer.prototype.findMaxZIndex = function()
{
	var max = -1;
	var ix = false;
	for(var i = 0; i < this.objects.length; i++)
	{
		if(this.objects[i].zIndex > max)
		{
			max = this.objects[i].zIndex;
			ix = i;
		}
	}

	return {index: ix, zIndex: max};
};

/**
 * Получение минимального zIndex объекта
 * Возвращает объект, содержащий index - индекс объекта в массиве objects и zIndex
 */
DisplayObjectContainer.prototype.findMinZIndex = function()
{
	var min = -1;
	var ix = false;
	for(var i = 0; i < this.objects.length; i++)
	{
		if(i == 0)
		{
			min = this.objects[i].zIndex;
			ix = 0;
		}

		if(this.objects[i].zIndex < min)
		{
			min = this.objects[i].zIndex;
			ix = i;
		}
	}

	return {index: ix, zIndex: min};
};

/**
 * Добавление объекта в стек
 * @param {Object} item ссылка на объект
 * @returns {Object} ссылка на объект в массиве objects
 */
DisplayObjectContainer.prototype.addChild = function(item)
{
	var f = this.findMaxZIndex();

	var z = item.zIndex;

	if(f.index !== false) item.zIndex = f.zIndex + 1;
	else item.zIndex = 0;

	this.objectsCounter++;
	item.uid = this.objectsCounter;

	item.parent = this;
	item.setStage(this.stage);

	this.objects.push(item);

	if(z != 0) this.setChildZIndex(item, ~~z);

	item.dispatchEvent("add", {target: item});

	return item;
};

DisplayObjectContainer.prototype.setStage = function(stage)
{
    this.stage = stage;
    for(var i=0; i<this.objects.length; i++) this.objects[i].setStage(stage);
};

/**
 * Удаление объекта со сцены. Не рекомендуется к прямому использованию. Предпочтительнее использовать флаг destroy у объекта.
 * @param {DisplayObjectContainer} item ссылка на объект
 */
DisplayObjectContainer.prototype.removeChild = function(item)
{
	if(item && this.objects.indexOf(item) >= 0)
	{
		item.clear();

		item.removeAllEventListeners();
		item.dispatchEvent("remove", {target: item});
		item.parent = null;
		this.objects = Utils.removeFromArray(this.objects, item);
	}
};

/**
 * Установка нового zIndex для объекта.
 * Рекомендованный метод изменение zIndex. Прямое изменение этого свойства объекта может привести в некорректному поведению рендеринга.
 * @param {DisplayObjectContainer} item ссылка на объект
 * @param {Number} index новое значение zIndex
 */
DisplayObjectContainer.prototype.setChildZIndex = function(item, index)
{
	item.zIndex = index;

	this.objects = this.objects.sort(function(obj1, obj2)
	{
		if(obj1.zIndex == obj2.zIndex)
		{
			return obj1.uid > obj2.uid ? 1 : -1;
		}
		else
		{
			return obj1.zIndex > obj2.zIndex ? 1 : -1;
		}
	});
};

DisplayObjectContainer.prototype.getHitArea = function()
{
	return this.hitArea ? this.hitArea : {x: 0, y: 0, width: this.width, height: this.height};
};

/**
 * @description Проверка на hit в точке, по умолчанию без учёта прозрачности
 * @param {DisplayObjectContainer} obj
 * @param {int} x
 * @param {int} y
 * @param {bool} checkPixel = false
 * @return {bool}
 */
DisplayObjectContainer.prototype.hitTestPointObject = function(obj, x, y, pixelCheck, includeDragged)
{
	var cX, cY, cW, cH, mX, mY, r, present, imageData;

	if (typeof obj.pixelCheck == 'boolean') pixelCheck = obj.pixelCheck;

	var hitArea = obj.getHitArea();

	cW = hitArea.width * Math.abs(obj.getAbsoluteScaleX());
	cH = hitArea.height * Math.abs(obj.getAbsoluteScaleY());

	var c = obj.getAbsoluteCenter();

	cX = c.x + hitArea.x - cW / 2;
	cY = c.y + hitArea.y - cH / 2;

	mX = x;
	mY = y;

	if(!obj.ignoreViewport)
	{
		mX += this.stage.viewport.x;
		mY += this.stage.viewport.y;
	}

	present = false;
	if(obj.getAbsoluteRotation() == 0)
	{
		if(cX <= mX && cY <= mY && cX + cW >= mX && cY + cH >= mY) present = true;
	}
	else
	{
		r = obj.getHitAreaRectangle();
		if(r.hitTestPoint(new Vector(mX, mY))) present = true;
	}

	if(present && pixelCheck)
	{
		this.stage.buffer.width = this.stage.canvas.width;
		this.stage.buffer.height = this.stage.canvas.height;

		this.stage.clearScreen(this.stage.buffer);
		obj.render(this.stage.buffer, obj.static, 0);

		var pX = Math.floor(x * Utils.globalScale);
		var pY = Math.floor(y * Utils.globalScale);
		imageData = this.stage.buffer.ctx.getImageData(pX, pY, 1, 1);
		if(imageData.data[3] == 0) present = false;
	}

	if(!present && includeDragged && obj.dragged) present = true;

	return present;
};

/** @ignore */
DisplayObjectContainer.prototype.getObjectsStackByCoord = function(x, y, pixelCheck, includeDragged)
{
	var obj;
	var tmp = [];
	for(var i = this.objects.length - 1; i >= 0; i--)
	{
		if(this.objects[i].visible)
		{
			obj = this.objects[i];

			if(obj.objects && obj.objects.length)
			{
				tmp = tmp.concat(obj.getObjectsStackByCoord(x, y, pixelCheck, includeDragged));
			}

			if(this.hitTestPointObject(obj, x, y, pixelCheck, includeDragged))
			{
				tmp.push(obj);
			}
		}
	}

	return tmp;
};

/** @ignore */
DisplayObjectContainer.prototype.doDrag = function(dX, dY)
{
	for(var i = 0; i < this.objects.length; i++) this.objects[i].doDrag(dX, dY);

	if(this.dragged)
	{
		var eX = dX;
		var eY = dY;
		if(!this.ignoreViewport)
		{
			eX += this.stage.viewport.x;
			eY += this.stage.viewport.y;
		}

		this.x = eX - this.dragX;
		this.y = eY - this.dragY;
	}
};

/** @ignore */
DisplayObjectContainer.prototype.checkMouseOut = function(overStack, mouseCoords)
{
	for(var i = this.objects.length-1; i >= 0; i--)
	{
		if(this.objects[i].checkMouseOut(overStack, mouseCoords) === false) return;
	}

	if(this.mouseOn && overStack.indexOf(this) < 0)
	{
		this.mouseOn = false;

		var f = this.stage.finalizeMouseCoords(this, mouseCoords);
		return this.dispatchEvent("mouseout", {target: this, x: f.x, y: f.y});
	}
};

/** @ignore */
DisplayObjectContainer.prototype.getMaxZIndexInStack = function(stack)
{
	var max = -1;
	var ix = 0;
	for(var i = 0; i < stack.length; i++)
	{
		if(stack[i].zIndex > max)
		{
			max = stack[i].zIndex;
			ix = i;
		}
	}

	return ix;
};

/** @ignore */
DisplayObjectContainer.prototype.sortStack = function(stack, revert)
{
	return stack.sort(function(obj1, obj2)
	{
		if(obj1.zIndex == obj2.zIndex)
		{
			if(revert) obj1.uid < obj2.uid ? 1 : -1;
			else obj1.uid > obj2.uid ? 1 : -1;
		}
		else
		{
			if(revert) obj1.zIndex < obj2.zIndex ? 1 : -1;
			else obj1.zIndex > obj2.zIndex ? 1 : -1;
		}
	});
};

/**
 * Рекурсивное удаление всех дочерних объектов
 */
DisplayObjectContainer.prototype.clear = function()
{
	while(this.objects.length) this.removeChild(this.objects[0]);
};

/** @ignore */
DisplayObjectContainer.prototype.getFillStyle = function(cns)
{
	var fill = null;

	if(this.fillLinearGradient)
	{
		var gradient = cns.ctx.createLinearGradient(this.fillLinearGradient.x0 * Utils.globalScale,
												    this.fillLinearGradient.y0 * Utils.globalScale,
												    this.fillLinearGradient.x1 * Utils.globalScale,
												    this.fillLinearGradient.y1 * Utils.globalScale);

		for(var i=0; i<this.fillLinearGradient.points.length; i++)
		{
			gradient.addColorStop(this.fillLinearGradient.points[i].point, this.fillLinearGradient.points[i].color);
		}

		fill = gradient;
	}
	else if(this.fillRadialGradient)
	{
		var gradient = cns.ctx.createRadialGradient(this.fillRadialGradient.x0 * Utils.globalScale,
													this.fillRadialGradient.y0 * Utils.globalScale,
													this.fillRadialGradient.r0 * Utils.globalScale,
													this.fillRadialGradient.x1 * Utils.globalScale,
													this.fillRadialGradient.y1 * Utils.globalScale,
													this.fillRadialGradient.r1 * Utils.globalScale);

		for(var i=0; i<this.fillRadialGradient.points.length; i++)
		{
			gradient.addColorStop(this.fillRadialGradient.points[i].point, this.fillRadialGradient.points[i].color);
		}

		fill = gradient;
	}
	else if(this.fillPattern)
	{
		var pattern = cns.ctx.createPattern(this.fillPattern.img, this.fillPattern.repeat);
		fill = pattern;
	}
	else
	{
		fill = this.fillColor;
	}

	return fill;
};

DisplayObjectContainer.ANCHOR_ALIGN_LEFT = -1;
DisplayObjectContainer.ANCHOR_ALIGN_CENTER = 0;
DisplayObjectContainer.ANCHOR_ALIGN_RIGHT = 1;
DisplayObjectContainer.ANCHOR_VALIGN_TOP = -1;
DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE = 0;
DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM = 1;

//Для поддержки обратной совместимости
var ANCHOR_ALIGN_LEFT = DisplayObjectContainer.ANCHOR_ALIGN_LEFT;
var ANCHOR_ALIGN_CENTER = DisplayObjectContainer.ANCHOR_ALIGN_CENTER;
var ANCHOR_ALIGN_RIGHT = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT;
var ANCHOR_VALIGN_TOP = DisplayObjectContainer.ANCHOR_VALIGN_TOP;
var ANCHOR_VALIGN_MIDDLE = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE;
var ANCHOR_VALIGN_BOTTOM = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM;

/**
 * @class
 * @description Класс визуального объекта
 * @augments DisplayObjectContainer
 */
function DisplayObject()
{
	Utils.callSuperConstructor(DisplayObject, this);

	/**
	 * Уникальный ID
	 * @type Number
	 */
	this.uid = 0;

	/**
	 * Сцена, содержащая объект. NULL, если объект не добавлен на сцену или в родительский объект
	 * @type Stage
	 */
	this.stage = null;

	/**
	 * Цвет тени
	 * @type String
	 */
	this.shadowColor = null;

	/**
	 * Смещение тени по x
	 * @type Number
	 */
	this.shadowOffsetX = 0;

	/**
	 * Смещение тени по y
	 * @type Number
	 */
	this.shadowOffsetY = 0;

	/**
	 * Размытие тени
	 * @type Number
	 */
	this.shadowBlur = 0;

	/**
	 * z-index объекта
	 * @type Number
	 */
	this.zIndex = 0;

	/**
	 * Видимость объекта
	 * @type Boolean
	 */
	this.visible = true;

	/**
	 * Флаг статичности. В случае установки в true объект будет отрисовываться на фоновом канвасе.
	 * Не рекомендуется к прямому изменению. Используйте метод setStatic
	 * @type Boolean
	 */
	this.static = false;

	/**
	 * Поведение с камерой. В случае установки в true объект будет игнорировать положение камеры.
	 * @type Boolean
	 */
	this.ignoreViewport = false;

	/**
	 * Флаг, указывающий на то, что сцена обязана уничтожить этот объект на следующей итерации отрисовки
	 * @type Boolean
	 */
	this.destroy = false;

	/** @ignore */
	this.dragged = false;

	/** @ignore */
	this.dragX = 0;

	/** @ignore */
	this.dragY = 0;

	/** @ignore */
	this.mouseOn = false;

	/**
	 * Флаг отладочной отрисовки
	 */
	this.allowDebugDrawing = true;

	/**
	 * Если это флаг установлен в boolean (true|false), он принуждает сцену обрабатывать hitTest используя указанное значение вместо pixelClickEvent. Не boolean значения игнорируются (например null или 0).
	 * @type Boolean
	 */
	this.pixelCheck = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при заходе курсора мыши на объект.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект, x, y - координаты курсора мыши в системе координат объекта.
	 */
	this.onmouseover = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при выходе курсора мыши из объекта.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект, x, y - координаты курсора мыши в системе координат объекта.
	 */
	this.onmouseout = null;

	/**
	 * @event
	 * @description Callback функция, нажатии левой кнопки мыши на объекте.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект, x, y - координаты курсора мыши в системе координат объекта.
	 */
	this.onmousedown = null;

	/**
	 * @event
	 * @description Callback функция, отпускании левой кнопки мыши на объекте.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект, x, y - координаты курсора мыши в системе координат объекта.
	 */
	this.onmouseup = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при клике на объекте.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект, x, y - координаты курсора мыши в системе координат объекта.
	 */
	this.onclick = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при правом клике на объекте.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект, x, y - координаты курсора мыши в системе координат объекта.
	 */
	this.oncontextmenu = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при передвижении курсора мыши на объекте.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект, x, y - координаты курсора мыши в системе координат объекта.
	 */
	this.onmousemove = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая на каждом кадре перед рендерингом.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект
	 */
	this.onprerender = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая на каждом кадре
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект
	 */
	this.onenterframe = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая на каждом кадре после рендеринга.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект
	 */
	this.onrender = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при добавлении объекта на сцену.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект
	 */
	this.onadd = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при удалении объекта со сцены.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект
	 */
	this.onremove = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при синхронизации сценой тела Box2D и объекта. Применяется как правило в случае разных размеров объекта и тела.
	 * @description В качестве параметра передается объект с полями: target - ссылка на объект
	 */
	this.onbox2dsync = null;
};

Utils.extend(DisplayObject, DisplayObjectContainer);

/**
 * Установка флага статичности
 * При изменении значения форсирует перерисовку background-канваса у сцены
 * @param {Boolean} val
 * @returns {Boolean} было ли действительно изменено свойство
 */
DisplayObject.prototype.setStatic = function(val)
{
	val = Boolean(val);

	for(var i=0; i<this.objects.length; i++) this.objects[i].setStatic(val);

	if(this.static != val)
	{
		this.static = val;
		if(this.stage) this.stage.refreshBackground();

		return true;
	}

	return false;
};

/**
 * @description Начало drag`n`drop
 * @param {Number} x координата клика в системе координат объекта
 * @param {Number} y координата клика в системе координат объекта
 */
DisplayObject.prototype.startDrag = function(x, y)
{
	this.dragged = true;
	this.dragX = x;
	this.dragY = y;
};
/**
 * @description Остановка drag`n`drop
 */
DisplayObject.prototype.stopDrag = function()
{
	this.dragged = false;
	this.dragX = 0;
	this.dragY = 0;
};

/**
 * Очищает всю анимацию для объекта
 */
DisplayObject.prototype.removeTweens = function()
{
	if(!this.stage) return;
	this.stage.clearObjectTweens(this);
};

/**
 * Создаёт анимацию (сокращённый вызов <a href="Stage.html#createTween">stage.createTween</a>)
 * @return {Tween}
 */
DisplayObject.prototype.addTween = function(prop, end, duration, ease, onfinish, onchange)
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
 * Перемещение объекта в указанную точку. Можно использовать в цепочке.
 * @param {Number} x координата X
 * @param {Number} y координата Y
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.moveTo = function(x, y, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.setPosition(x, y);
	}
	else
	{
		var t1 = this.addTween('x', x, duration, ease);
        if(t1) t1.play();

        var t2 = this.addTween('y', y, duration, ease, onfinish, onchange);
        if(t2) t2.play();
	}
	return this;
};

/**
 * Перемещение объекта на указанное расстояние. Можно использовать в цепочке.
 * @param {Number} x координата X
 * @param {Number} y координата Y
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.moveBy = function(x, y, duration, ease, onfinish, onchange)
{
	return this.moveTo(this.x + x, this.y + y, duration, ease, onfinish, onchange);
};

/**
 * Изменение прозрачности объекта до указанного значения
 * @param {Number} opacity Прозрачность (0-1)
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.fadeTo = function(opacity, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.opacity = opacity;
	}
	else
	{
		var t = this.addTween('opacity', opacity, duration, ease, onfinish, onchange);
		if(t) t.play();
	}
	return this;
};

/**
 * Изменение прозрачности объекта на указанное значение
 * @param {Number} opacity Прозрачность (0-1)
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.fadeBy = function(opacity, duration, ease, onfinish, onchange)
{
	var val = Math.max(0, Math.min(1, this.opacity + opacity));
	return this.fadeTo(val, duration, ease, onfinish, onchange);
};

/**
 * Поворот объекта до указанного угла
 * @param {Number} rotation Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.rotateTo = function(rotation, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.rotation = rotation;
	}
	else
	{
		var t = this.addTween('rotation', rotation, duration, ease, onfinish, onchange);
		if(t) t.play();
	}
	return this;
};

/**
 * Поворот объекта на указанный угол
 * @param {Number} rotation Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.rotateBy = function(rotation, duration, ease, onfinish, onchange)
{
	return this.rotateTo(this.rotation + rotation, duration, ease, onfinish, onchange);
};

/**
 * Искривление объекта по оси x до указанного угла
 * @param {Number} skew Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.skewXTo = function(skew, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.skewX = skew;
	}
	else
	{
		var t = this.addTween('skewX', skew, duration, ease, onfinish, onchange);
		if(t) t.play();
	}
	return this;
};

/**
 * Искривление объекта по оси x на указанный угол
 * @param {Number} skew Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.skewXBy = function(skew, duration, ease, onfinish, onchange)
{
	return this.skewXTo(this.skewX + skew, duration, ease, onfinish, onchange);
};

/**
 * Искривление объекта по оси y до указанного угла
 * @param {Number} skew Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.skewYTo = function(skew, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.skewY = skew;
	}
	else
	{
		var t = this.addTween('skewY', skew, duration, ease, onfinish, onchange);
		if(t) t.play();
	}
	return this;
};

/**
 * Искривление объекта по оси y на указанный угол
 * @param {Number} skew Угол в радианах
 * @param {Number} duration Необязательная длительность в фреймах
 * @param {Function} ease функция анимации (см. <a href="Easing.html">Easing</a>)
 * @param {Function} onfinish callback завершения (см. <a href="Tween.html#onfinish">Tween</a>)
 * @param {Function} onchange callback шага анимации (см. <a href="Tween.html#onchange">Tween</a>)
 * @return {Sprite}
 */
DisplayObject.prototype.skewYBy = function(skew, duration, ease, onfinish, onchange)
{
	return this.skewYTo(this.skewY + skew, duration, ease, onfinish, onchange);
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
DisplayObject.prototype.scaleTo = function(scale, duration, ease, onfinish, onchange)
{
	duration = ~~duration;
	if(duration <= 0)
	{
		this.scaleX = this.scaleY = scale;
	}
	else
	{
		var t1 = this.addTween('scaleX', scale, duration, ease, onfinish, onchange);
		if(t1) t1.play();

		var t2 = this.addTween('scaleY', scale, duration, ease, ( t1 ? null : onfinish), ( t1 ? null : onchange));
		if(t2) t2.play();
	}
	return this;
};

/**
 * Обёртка для Z-позиционирования
 * @param {Number} z zIndex
 */
DisplayObject.prototype.setZIndex = function(z)
{
	this.zIndex = ~~z;
	if(!this.parent) return;
	this.parent.setChildZIndex(this, this.zIndex);
};

/**
 * @description Проверка на hit в точке, по умолчанию без учёта прозрачности
 * @param {int} x
 * @param {int} y
 * @param {bool} checkPixel = false
 * @param {bool} checkDragged = false
 * @param {bool} debug = false
 * @return {bool}
 */
DisplayObject.prototype.hitTestPoint = function(x, y, checkPixel, checkDragged, debug)
{
	if(!this.stage)	return false;
	return this.stage.hitTestPointObject(this, x, y, checkPixel, checkDragged, debug);
};

/**
 * Установка относительных координат объекта
 * @param {Number} x x
 * @param {Number} y y
 * @param {String} leftAnchor привязка слева. Допустимые значения: "left", "center", "right". Значение по умолчанию: "center"
 * @param {String} topAnchor привязка сверху. Допустимые значения: "top", "center", "bottom". Значение по умолчанию: "center"
 */
DisplayObject.prototype.setRelativePosition = function(x, y, leftAnchor, topAnchor)
{
	switch(leftAnchor)
	{
		case "right":
			x = this.stage.screenWidth - x;
			break;
		case "left":
			break;
		default:
			x = this.stage.screenWidth/2 + x;
			break;
	}

	switch(topAnchor)
	{
		case "bottom":
			y = this.stage.screenHeight - y;
			break;
		case "top":
			break;
		default:
			y = this.stage.screenHeight/2 + y;
			break;
	}

	this.setPosition(x, y);
};

/**
 * Отладочная отрисовка.
 * Вызывается при рендеринге, но можно вызывать и вручную.
 */
DisplayObject.prototype.debugDraw = function()
{
	if(!this.visible) return;
	if(!this.allowDebugDrawing) return;

	var a = this.getAbsolutePosition(), c = this.getCenter(), r = this.getDrawRectangle(), aabb = this.getAABBRectangle();

	stage.drawCircle(a.x, a.y, 1, 1, 'rgba(255,0,0,0.9)');
	stage.drawCircle(c.x, c.y, 1, 1, 'rgba(0,255,0,0.9)');
	stage.drawLine(a.x, a.y, c.x, c.y, 1, 'rgba(255,255,255,0.5)');

	stage.drawPolygon(r.vertices, 0.5, 'rgba(255,0,255,0.5)', 1);

	stage.drawLine(aabb.vertices[0].x, aabb.vertices[0].y, aabb.vertices[2].x, aabb.vertices[2].y, 1, 'rgba(255,255,255,0.5)');
	stage.drawLine(aabb.vertices[2].x, aabb.vertices[0].y, aabb.vertices[0].x, aabb.vertices[2].y, 1, 'rgba(255,255,255,0.5)');
	stage.drawPolygon(aabb.vertices, 0.5, 'rgba(255,255,255,0.5)');
};

/**
 * Клонирование объекта
 */
DisplayObject.prototype.clone = function()
{
	return Utils.clone(this);
};

/**
 * @class
 * @description Базовый класс графического объекта
 * @augments DisplayObject
 */

function Graphics()
{
	Utils.callSuperConstructor(Graphics, this);

	/** x координата */
	this.x = 0;
	/** y координата */
	this.y = 0;
	/** цвет */
	this.color = "#000";
	/** толщина линии */
	this.lineWidth = 1;
}
Utils.extend(Graphics, DisplayObject);

/** @ignore */
Graphics.prototype.render = function(cns, drawStatic, delta)
{
	if(!!this.static == !!drawStatic) this.dispatchEvent("render", {target: this, canvas: cns, delta: delta});

	Utils.callSuperMethod(Graphics, this, "render", cns, drawStatic, delta);
};

/** @ignore */
Graphics.prototype.prepareCanvas = function(pos, cns)
{
	cns.ctx.save();

	if(!this.ignoreViewport)
	{
		pos.x -= this.stage.viewport.x;
		pos.y -= this.stage.viewport.y;
	}

	pos.x *= Utils.globalScale;
	pos.y *= Utils.globalScale;

	cns.ctx.translate(pos.x, pos.y);
	var r = this.getAbsoluteRotation();
	cns.ctx.rotate(r);
	cns.ctx.scale(this.getAbsoluteScaleX(), this.getAbsoluteScaleY());

	var skewX = this.getAbsoluteSkewX(), skewY = this.getAbsoluteSkewY();
	if(skewX != 0 || skewY != 0) cns.ctx.transform(1, skewX, skewY, 1, 0, 0);

	if(this.shadowColor)
	{
		cns.ctx.shadowColor = this.shadowColor;

		if(r != 0)
		{
			var p = new Vector(this.shadowOffsetX * Utils.globalScale, this.shadowOffsetY * Utils.globalScale);
			p.rotate(-r);
			cns.ctx.shadowOffsetX = p.x;
			cns.ctx.shadowOffsetY = p.y;
		}
		else
		{
			cns.ctx.shadowOffsetX = this.shadowOffsetX * Utils.globalScale;
			cns.ctx.shadowOffsetY = this.shadowOffsetY * Utils.globalScale;
		}

		cns.ctx.shadowBlur = this.shadowBlur * Utils.globalScale;
	}
};

Graphics.prototype.preparePath = function(cns)
{
    cns.ctx.beginPath();

    cns.ctx.strokeStyle = this.lineWidth > 0 ? this.color : "transparent";
    cns.ctx.lineWidth = this.lineWidth * Utils.globalScale;
    cns.ctx.globalAlpha = this.getAbsoluteOpacity();

    cns.ctx.fillStyle = this.getFillStyle(cns);
};

/** @ignore */
Graphics.prototype.finalizeCanvas = function(cns)
{
	if(this.fillColor ||
	   this.fillLinearGradient ||
	   this.fillRadialGradient ||
	   this.fillPattern)
	{
		cns.ctx.fill();
	}
	cns.ctx.stroke();
};

Graphics.prototype.restoreCanvas = function(cns)
{
    cns.ctx.restore();
};

/**
 * @class
 * @augments Graphics
 * @description Окружность
 * @param {Number} x x координата центра
 * @param {Number} y y координата центра
 * @param {Number} radius радиус
 */
Graphics.circle = function(x, y, radius)
{
	Utils.callSuperConstructor(Graphics.circle, this);

	this.x = x;
	this.y = y;
	this.radius = radius;

	this.width = radius*2;
	this.height = radius*2;
};
Utils.extend(Graphics.circle, Graphics);

/** @ignore */
Graphics.circle.prototype.render = function(cns, drawStatic, delta)
{
	if(!!this.static == !!drawStatic)
	{
		this.prepareCanvas(this.getAbsoluteCenter(), cns);
		this.preparePath(cns);
		cns.ctx.arc(0, 0, this.radius * Utils.globalScale, 0, Math.PI * 2);
		this.finalizeCanvas(cns);
		this.restoreCanvas(cns);
	}

	Utils.callSuperMethod(Graphics.circle, this, "render", cns, drawStatic, delta);
};

/**
 * @class
 * @augments Graphics
 * @description Линия
 * @param {Number} x1 x координата первой точки
 * @param {Number} y1 y координата первой точки
 * @param {Number} x2 x координата второй точки
 * @param {Number} y2 y координата второй точки
 */
Graphics.line = function(x1, y1, x2, y2)
{
	Utils.callSuperConstructor(Graphics.line, this);

	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
};
Utils.extend(Graphics.line, Graphics);

/** @ignore */
Graphics.line.prototype.render = function(cns, drawStatic, delta)
{
	if(!!this.static == !!drawStatic)
	{
		this.prepareCanvas(this.getAbsoluteCenter(), cns);
		this.preparePath(cns);
		cns.ctx.moveTo(this.x1 * Utils.globalScale, this.y1 * Utils.globalScale);
		cns.ctx.lineTo(this.x2 * Utils.globalScale, this.y2 * Utils.globalScale);
		this.finalizeCanvas(cns);
		this.restoreCanvas(cns);
	}

	Utils.callSuperMethod(Graphics.line, this, "render", cns, drawStatic, delta);
};

/**
 * @class
 * @augments Graphics
 * @description Прямоугольник
 * @param {Number} x x координата центра
 * @param {Number} y y координата центра
 * @param {Number} width ширина
 * @param {Number} height высота
 */
Graphics.rectangle = function(x, y, width, height)
{
	Utils.callSuperConstructor(Graphics.rectangle, this);

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
Utils.extend(Graphics.rectangle, Graphics);

/** @ignore */
Graphics.rectangle.prototype.render = function(cns, drawStatic, delta)
{
	if(!!this.static == !!drawStatic)
	{
		this.prepareCanvas(this.getAbsoluteCenter(), cns);
		this.preparePath(cns);
		cns.ctx.rect((-this.width/2) * Utils.globalScale, (-this.height/2) * Utils.globalScale,
					 this.width  * Utils.globalScale, this.height  * Utils.globalScale);
		this.finalizeCanvas(cns);
		this.restoreCanvas(cns);
	}

	Utils.callSuperMethod(Graphics.rectangle, this, "render", cns, drawStatic, delta);
};

/**
 * @class
 * @augments Graphics
 * @description Дуга
 * @param {Number} x x координата центра
 * @param {Number} y y координата центра
 * @param {Number} startAngle начальный угол
 * @param {Number} endAngle конечный угол
 * @param {Boolean} antiClockWise нужно ли рисовать дугу против часовой стрелки
 */
Graphics.arc = function(x, y, radius, startAngle, endAngle, antiClockWise)
{
	Utils.callSuperConstructor(Graphics.arc, this);

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.startAngle = startAngle;
	this.endAngle = endAngle;
	this.antiClockWise = antiClockWise;

	this.width = radius*2;
	this.height = radius*2;
};
Utils.extend(Graphics.arc, Graphics);

/** @ignore */
Graphics.arc.prototype.render = function(cns, drawStatic, delta)
{
	if(!!this.static == !!drawStatic)
	{
		this.prepareCanvas(this.getAbsoluteCenter(), cns);
		this.preparePath(cns);
		cns.ctx.arc(0, 0, this.radius * Utils.globalScale, this.startAngle, this.endAngle, this.antiClockWise);
		this.finalizeCanvas(cns);
		this.restoreCanvas(cns);
	}

	Utils.callSuperMethod(Graphics.arc, this, "render", cns, drawStatic, delta);
};

/**
 * @class
 * @augments Graphics
 * @description Полигон
 * @param {Array} points массив объектов точек: {x: 10, y: 20}
 */
Graphics.polygon = function(points)
{
	if(!points || points.length < 2)
	{
		throw Error("Invalid parameters");
	}

	Utils.callSuperConstructor(Graphics.polygon, this);

	this.points = points;

	var minX = Number.MAX_VALUE;
	var minY = Number.MAX_VALUE;
	var maxX = Number.MIN_VALUE;
	var maxY = Number.MIN_VALUE;

	for(var i=0; i<points.length; i++)
	{
		if(points[i].x < minX) minX = points[i].x;
		if(points[i].y < minY) minY = points[i].y;
		if(points[i].x > maxX) maxX = points[i].x;
		if(points[i].y > maxY) maxY = points[i].y;
	}

	this.width = maxX - minX;
	this.height = maxY - minY;
};
Utils.extend(Graphics.polygon, Graphics);

/** @ignore */
Graphics.polygon.prototype.render = function(cns, drawStatic, delta)
{
	if(!!this.static == !!drawStatic)
	{
		this.prepareCanvas(this.getAbsoluteCenter(), cns);
		this.preparePath(cns);

		cns.ctx.moveTo(this.points[0].x * Utils.globalScale, this.points[0].y * Utils.globalScale);

		for(var i=1; i < this.points.length; i++)
		{
			cns.ctx.lineTo(this.points[i].x * Utils.globalScale, this.points[i].y * Utils.globalScale);
		}

		cns.ctx.lineTo(this.points[0].x * Utils.globalScale, this.points[0].y * Utils.globalScale);

		this.finalizeCanvas(cns);
		this.restoreCanvas(cns);
	}

	Utils.callSuperMethod(Graphics.polygon, this, "render", cns, drawStatic, delta);
};

/**
 * @class
 * @augments Graphics
 * @description Текст
 * @param {Number} x x координата
 * @param {Number} y y координата
 * @param {String} text текст
 */
Graphics.text = function(x, y, text)
{
	Utils.callSuperConstructor(Graphics.text, this);

	this.x = x;
	this.y = y;
	this.text = text;

	/** выравнивание по горизонтали */
	this.align = Graphics.text.ALIGN_LEFT;
	/** выравнивание по вертикали */
	this.valign = Graphics.text.VALIGN_MIDDLE;

	/** стиль текста */
	this.style = "normal";
	/** размер шрифта */
	this.size = 10;
	/** шрифт */
	this.font = "sans-serif";
};
Utils.extend(Graphics.text, Graphics);

/** константа - выравнивание текста по левому краю */
Graphics.text.ALIGN_LEFT = "left";
/** константа - выравнивание текста по центру */
Graphics.text.ALIGN_CENTER = "center";
/** константа - выравнивание текста по правому краю */
Graphics.text.ALIGN_RIGHT = "right";
/** константа - выравнивание текста по верху */
Graphics.text.VALIGN_TOP = "top";
/** константа - выравнивание текста по середине */
Graphics.text.VALIGN_MIDDLE = "middle";
/** константа - выравнивание текста по низу */
Graphics.text.VALIGN_BOTTOM = "bottom";

/** @ignore */
Graphics.text.prototype.getRect = function(cns)
{
	return cns.ctx.measureText(this.text);
};

/** @ignore */
Graphics.text.prototype.render = function(cns, drawStatic, delta)
{
	if(!!this.static == !!drawStatic)
	{
		this.prepareCanvas(this.getAbsoluteCenter(), cns);
		this.preparePath(cns);

		cns.ctx.font = this.style + " " + Math.floor(this.size * Utils.globalScale) + "px " + this.font;

		cns.ctx.textAlign = this.align;
		cns.ctx.textBaseline = this.valign;

		if(this.fillColor) cns.ctx.fillText(this.text, 0, 0);
		cns.ctx.strokeText(this.text, 0, 0);

		this.finalizeCanvas(cns);
		this.restoreCanvas(cns);
	}

	Utils.callSuperMethod(Graphics.text, this, "render", cns, drawStatic, delta);
};

/**
 * @class
 * @augments Graphics
 * @description Произвольные графические элементы
 */
Graphics.free = function()
{
    this.commands = [];

    Utils.callSuperConstructor(Graphics.free, this);
};
Utils.extend(Graphics.free, Graphics);

Graphics.free.prototype.clear = function()
{
    this.commands = [];
};

Graphics.free.prototype.beginPath = function()
{
    this.commands.push({command: "beginPath"});
    return this;
};

Graphics.free.prototype.stroke = function()
{
    this.commands.push({command: "stroke"});
    return this;
};

Graphics.free.prototype.setStrokeStyle = function(style)
{
    this.commands.push({command: "setStrokeStyle", style: style});
    return this;
};

Graphics.free.prototype.setFillStyle = function(style)
{
    this.commands.push({command: "setFillStyle", style: style});
    return this;
};

Graphics.free.prototype.fill = function()
{
    this.commands.push({command: "fill"});
    return this;
};

Graphics.free.prototype.moveTo = function(x, y)
{
    this.commands.push({command: "moveTo", x: x, y: y});
    return this;
};

Graphics.free.prototype.lineTo = function(x, y)
{
    this.commands.push({command: "lineTo", x: x, y: y});
    return this;
};

Graphics.free.prototype.arc = function(x, y, radius, startAngle, endAngle, antiClockWise)
{
    this.commands.push({command: "arc", x: x, y: y, radius: radius, startAngle: startAngle, endAngle: endAngle, antiClockWise: antiClockWise});
    return this;
};

Graphics.free.prototype.circle = function(x, y, radius)
{
    this.commands.push({command: "circle", x: x, y: y, radius: radius});
    return this;
};

Graphics.free.prototype.rect = function(x, y, width, height)
{
    this.commands.push({command: "circle", x: x, y: y, width: width, height: height});
    return this;
};

Graphics.free.prototype.polygon = function(points)
{
    this.commands.push({command: "polygon", points: points});
    return this;
};

Graphics.free.prototype.executeCommand = function(cns, c)
{
    switch(c.command)
    {
        case "beginPath":
            cns.ctx.beginPath();
            break;
        case "stroke":
            cns.ctx.stroke();
            break;
        case "fill":
            cns.ctx.fill();
            break;
        case "setStrokeStyle":
            cns.ctx.strokeStyle = this.lineWidth > 0 ? c.style : "transparent";
            break;
        case "setFillStyle":
            cns.ctx.fillStyle = c.style;
            break;
        case "moveTo":
            cns.ctx.moveTo(c.x * Utils.globalScale, c.y * Utils.globalScale);
            break;
        case "lineTo":
            cns.ctx.lineTo(c.x * Utils.globalScale, c.y * Utils.globalScale);
            break;
        case "arc":
            cns.ctx.arc(c.x * Utils.globalScale, c.y * Utils.globalScale, c.radius * Utils.globalScale, c.startAngle, c.endAngle, c.antiClockWise);
            break;
        case "circle":
            cns.ctx.arc(c.x * Utils.globalScale, c.y * Utils.globalScale, c.radius * Utils.globalScale, 0, Math.PI * 2);
            break;
        case "rect":
            cns.ctx.rect((c.x - c.width/2) * Utils.globalScale, (c.y - c.height/2) * Utils.globalScale,
                c.width * Utils.globalScale, с.height  * Utils.globalScale);
            break;
        case "polygon":
            cns.ctx.moveTo(c.points[0].x * Utils.globalScale, c.points[0].y * Utils.globalScale);
            for(var n=1; n < c.points.length; n++) cns.ctx.lineTo(c.points[n].x * Utils.globalScale, c.points[n].y * Utils.globalScale);
            cns.ctx.lineTo(c.points[0].x * Utils.globalScale, c.points[0].y * Utils.globalScale);
            break;
    }
};

Graphics.free.prototype.executeCommands = function(cns)
{
    for(var i=0; i<this.commands.length; i++)
    {
        this.executeCommand(cns, this.commands[i]);
    }
};

/** @ignore */
Graphics.free.prototype.render = function(cns, drawStatic, delta)
{
    if(!!this.static == !!drawStatic)
	{
		this.prepareCanvas(this.getAbsoluteCenter(), cns);
		this.preparePath(cns);
		this.executeCommands(cns);
		this.finalizeCanvas(cns);
		this.restoreCanvas(cns);
	}

    Utils.callSuperMethod(Graphics.free, this, "render", cns, drawStatic, delta);
};




/**
 * @class
 * @augments DisplayObject
 * @description Класс спрайта
 * @param {Image} img ссылка на элемент Image, содержащий картинку для спрайта
 * @param {Number} w ширина спрайта
 * @param {Number} h высота спрайта
 * @param {Number} f количество кадров в спрайте
 * @param {Number} l количество слоев в спрайте
 * @example Для использования в качестве спрайта картинка должна быть подготовлена определенным образом.
 * В ней сверху вниз должны содержаться кадры анимации. Например:<br><img src="../../examples/explosion.png" />
 * Также слева направо могут располагаться дополнительные слои анимации
 */
function Sprite(img, w, h, f, l)
{
	Utils.callSuperConstructor(Sprite, this);

	this.width = w;
	this.height = h;

	/**
	 * Смещение изображения спрайта относительно верхнего левого угла (x, y)
	 * @type Object
	 */
	this.offset = {left: 0, top: 0};

	/**
	 * Флаг, указывающий на то, анимируется ли спрайт
	 * @type Boolean
	 */
	this.animated = true;

	/**
	 * Направление изменения кадров при анимации (1 или -1)
	 * @type {Number}
	 */
	this.animDirection = 1;

	/**
	 * Текущий кадр анимации
	 * @type Number
	 */
	this.currentFrame = 0;

	/**
	 * Количество кадров анимации (вертикально)
	 * @type Number
	 */
	this.totalFrames = Math.max(1, ~~f);
	if(this.totalFrames <= 1) this.animated = false;

	/**
	 * Текущий слой анимации
	 * @type Number
	 */
	this.currentLayer = 0;

	/**
	 * Количество слоёв (горизонтально)
	 * @type Number
	 */
	this.totalLayers = Math.max(1, ~~l);

	/**
	 * Ссылка на изображение для спрайта
	 * @type Image
	 */
	this.bitmap = img;

	/**
	 * Ссылка на маску изображения спрайта
	 * @type Image
	 */
	this.mask = null;

	/** @ignore */
	this.isMask = false;

	/** @ignore */
	this.maskParent = null;

	/**
	 * Нужно ли инвертировать маску (при true отображаться будет та часть спрайта, которая не попадает в маску)
	 * @type Boolean
	 */
	this.maskInvert = false;

	/** @ignore */
	this.animStep = 0;

	/**
	 * Задержка анимации: при значении 1 кадр будет меняться при каждой следующей итерации, при 2 - каждую 2-ю итерацию и т.д..
	 * @type Number
	 */
	this.animDelay = 1;

	/**
	 * Задержка в милисекундах между переключением кадров. Используется только при значении Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_TIME
	 */
	this.changeFrameDelay = Sprite.CHANGE_FRAME_DELAY;

	/** @ignore */
	this.changeFrameTime = 0;

	/**
	 * @event
     * @description Callback функция, вызываемая каждый раз, когда спрайт пытается сменить свой кадр.
	 */
	this.onchangeframe = null;
};

Utils.extend(Sprite, DisplayObject);

Sprite.create = function(asset, library)
{
	if (typeof asset == 'string')
	{
		library = library || window['library'];
		if (!library) throw new Error("Could not create sprite from asset '%s'. Library not found.", asset);
		asset = library.getAsset(asset);
	}
	return new Sprite(asset.bitmap, asset.width||1, asset.height||1, asset.frames||1, asset.layers||1);
}

/**
 * Запуск анимации
 */
Sprite.prototype.play = function()
{
	this.animated = true;
};
/**
 * Остановка анимации
 */
Sprite.prototype.stop = function()
{
	this.animated = false;
};

/**
 * Переход на указанный кадр и остановка анимации
 * @param {Number} frame номер кадра
 */
Sprite.prototype.gotoAndStop = function(frame)
{
	this.currentFrame = frame;
	this.stop();
};

/**
 * Переход на указанный кадр и запуск анимации
 * @param {Number} frame номер кадра
 */
Sprite.prototype.gotoAndPlay = function(frame)
{
	this.currentFrame = frame;
	this.play();
};

/** @ignore */
Sprite.prototype.nextFrame = function(delta)
{
	this.dispatchEvent("enterframe", {target: this, delta: delta});

    var changeFramesCount = 1;

    if(Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME)
    {
        this.changeFrameTime += delta;

        if(this.changeFrameTime >= this.changeFrameDelay * this.animDelay)
        {
            changeFramesCount = Math.floor(this.changeFrameTime / (this.changeFrameDelay * this.animDelay));
            this.changeFrameTime -= Math.abs(changeFramesCount) * this.changeFrameDelay * this.animDelay;
        }
        else return;
    }
    else this.animStep++;

	if(this.animStep >= this.animDelay || Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME)
	{
	    for(var i=0; i<changeFramesCount; i++)
	    {
	        if(this.animated) this.currentFrame += this.animDirection;

	        if(this.animDirection > 0 && this.currentFrame >= this.totalFrames) this.currentFrame = 0;
            if(this.animDirection < 0 && this.currentFrame < 0) this.currentFrame = this.totalFrames - 1;

	        this.dispatchEvent("changeframe", {target: this, delta: delta});
	    }

		this.animStep = 0;
	}
};

/**
 * Устанавливает маску для спрайта. Для корректной работы метод должен вызываться после добавления спрайта в контейнер.
 * @param {Object} mask ссылка на маску
 */
Sprite.prototype.setMask = function(mask)
{
	this.mask = mask;
	this.mask.isMask = true;
	this.mask.stage = this.stage;
	this.mask.maskParent = this;
};

Sprite.prototype.renderBack = function(cns, fill, x, y, w, h)
{
	if(fill)
	{
		cns.ctx.fillStyle = fill;
		cns.ctx.strokeStyle = fill;
		cns.ctx.fillRect(x, y, w, h);
	}
};

Sprite.prototype.renderBitmap = function(cns, x, y, w, h)
{
	var rect = {x: 0, y: 0, width: w, height: h};

	if(this.bitmap)
	{
		// bitmap size
		var iw = this.bitmap.width, ih = this.bitmap.height;
		// frame top-left corner
		var fx = this.currentLayer * w + this.offset.left * Utils.globalScale, fy = this.currentFrame * h + this.offset.top * Utils.globalScale;

		// frame in bitmap bounds?
		if(fx < iw && fy < ih)
		{
			var	fw = w, fh = h;

			// check bitmap bounds
			if(fx + fw > iw) fw = iw - fx;
			if(fy + fh > ih) fh = ih - fy;

			if(Sprite.FLOOR_VALUES_ON_RENDER)
			{
			    fx = ~~fx; fy = ~~fy; fw = ~~fw; fh = ~~fh;
			    x = ~~x; y = ~~y; w = ~~w; h = ~~h;
			}

            if(fw > 0 && fh > 0 && w > 0 && h > 0)
			{
			    cns.ctx.drawImage(this.bitmap, fx, fy, fw, fh, x, y, w, h);
            }

			rect.x = fx;
			rect.y = fy;
			rect.width = fw;
			rect.height = fh;
		}
	}

	return rect;
};

Sprite.prototype.render = function(cns, drawStatic, delta, drawMask)
{
	if(this.isMask && !drawMask) return;

	if(!!this.static == !!drawStatic)
	{
		if(!delta) delta = 0;

		this.nextFrame(delta);

		if(this.dispatchEvent("prerender", {target: this, canvas: cns, delta: delta}) === false) return;

		if(!this.stage) return;

		var center = this.getAbsoluteCenter();

		if(drawMask)
		{
			center = {x: this.x - this.getAnchor().x, y: this.y - this.getAnchor().y};
			var p = this.parent ? this.parent : this.maskParent;
			if(p)
			{
				center.x += p.getAnchor().x + p.width/2;
				center.y += p.getAnchor().y + p.height/2;
			}
		}

		var	ow = this.width * Utils.globalScale,
			oh = this.height * Utils.globalScale,
			// lef-top corner
			ox = center.x * Utils.globalScale - Math.floor(ow / 2),
			oy = center.y * Utils.globalScale - Math.floor(oh / 2),
			// rotation
			or = this.getAbsoluteRotation(),
			// axis scales
			scX = this.getAbsoluteScaleX(), scY = this.getAbsoluteScaleY(),
			skewX = this.getAbsoluteSkewX(), skewY = this.getAbsoluteSkewY(),
			fill = this.getFillStyle(cns),
			canvasMod = Boolean(or != 0 || scX != 1 || scY != 1 || this.shadowColor || fill || skewX != 0 || skewY != 0)
		;

		// viewport correction
		if(!this.ignoreViewport)
		{
			ox -= this.stage.viewport.x * Utils.globalScale;
			oy -= this.stage.viewport.y * Utils.globalScale;
		}

		// translate canvas only if needed
		if(canvasMod)
		{
			cns.ctx.save();

			cns.ctx.translate(ox + Math.floor(ow / 2), oy + Math.floor(oh / 2));
			cns.ctx.rotate(or);
			cns.ctx.scale(scX, scY);

			if(skewX != 0 || skewY != 0) cns.ctx.transform(1, skewX, skewY, 1, 0, 0);

			ox = -Math.floor(ow / 2);
			oy = -Math.floor(oh / 2);

			if(this.shadowColor)
			{
				if(or != 0)
				{
					var p = new Vector(this.shadowOffsetX * Utils.globalScale, this.shadowOffsetY * Utils.globalScale);
					p.rotate(-or);
					cns.ctx.shadowOffsetX = p.x;
					cns.ctx.shadowOffsetY = p.y;
				}
				else
				{
					cns.ctx.shadowOffsetX = this.shadowOffsetX * Utils.globalScale;
					cns.ctx.shadowOffsetY = this.shadowOffsetY * Utils.globalScale;
				}

				cns.ctx.shadowColor = this.shadowColor;
				cns.ctx.shadowBlur = this.shadowBlur * Utils.globalScale;
			}
		}

		cns.ctx.globalAlpha = this.getAbsoluteOpacity();

		if(this.ceilSizes)
		{
			ow = Math.ceil(ow);
			oh = Math.ceil(oh);
		}

		var masked = false;

		if(this.mask)
		{
			this.stage.buffer.ctx.save();
			this.stage.buffer.ctx.clearRect(0, 0, ow, oh);

			this.renderBack(this.stage.buffer, fill, 0, 0, ow, oh);
			var rect = this.renderBitmap(this.stage.buffer, 0, 0, ow, oh);

			this.stage.buffer.ctx.globalCompositeOperation = this.maskInvert ? "destination-out" : "destination-in";

			if(this.mask.render) this.mask.render(this.stage.buffer, drawStatic, delta, true);
			else this.stage.buffer.ctx.drawImage(this.mask, this.mask.x ? this.mask.x : 0, this.mask.y ? this.mask.y : 0);

			if(Sprite.FLOOR_VALUES_ON_RENDER) cns.ctx.drawImage(this.stage.buffer, 0, 0, rect.width, rect.height, ~~ox, ~~oy, ~~ow, ~~oh);
			else cns.ctx.drawImage(this.stage.buffer, 0, 0, rect.width, rect.height, ox, oy, ow, oh);

			this.stage.buffer.ctx.restore();
		}
		else
		{
			this.renderBack(cns, fill, ox, oy, ow, oh);
			this.renderBitmap(cns, ox, oy, ow, oh);
		}

		if(canvasMod) cns.ctx.restore();

		if(this.stage.allowDebugDrawing && this.allowDebugDrawing)
		{
			if(this.stage.allowStaticDebugDrawing || !this.static)
			{
				this.debugDraw();
			}
		}

		this.dispatchEvent("render", {target: this, canvas: cns, delta: delta});
	}

	Utils.callSuperMethod(Sprite, this, "render", cns, drawStatic, delta);
};

/** Изменение кадра спрайтов каждую итерацию отрисовки */
Sprite.CHANGE_FRAME_BY_FRAME = 0;
/** Изменение кадра спрайтов после истечения таймаута */
Sprite.CHANGE_FRAME_BY_TIME = 1;

/** Дефолтный таймаут на изменение кадра спрайтов */
Sprite.CHANGE_FRAME_DELAY = 1000/24;

/** Способ изменения кадров анимации спрайтов */
Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_FRAME;

Sprite.FLOOR_VALUES_ON_RENDER = true;

/**
 * @class
 * @augments EventsProxy
 * @description Класс таймера сцены
 * @param {Function} onend функция, которая будет вызвана по окончанию таймера
 * @param {Number} timeout таймаут в кадрах или милисекундах
 * @param {Boolean} repeat нужно ли повторять таймер по его завершению
 */
function StageTimer(onend, timeout, repeat)
{
	Utils.callSuperConstructor(StageTimer, this);

	this.repeat = repeat;
	this.initialTimeout = timeout;

	this.timeout = timeout;

	this.onend = onend;
	this.ontick = null;

	/**
	 * Флаг паузы таймера
	 * @type Boolean
	 */
	this.paused = false;
};

Utils.extend(StageTimer, EventsProxy);

/** @ignore */
StageTimer.prototype.update = function(delta)
{
	if(this.paused) return;

	if(StageTimer.TIMEOUT_TYPE == StageTimer.TIMEOUT_BY_FRAME) this.timeout--;
	else this.timeout -= delta;

	if(this.timeout <= 0)
	{
		if(typeof this.onend == "string") eval(this.onend);
		else this.dispatchEvent("end", {target: this});

		if(this.repeat)	this.timeout = this.initialTimeout;
		else return true;
	}

	this.dispatchEvent("tick", {target: this, delta: delta});

	return false;
};

/**
 * Возобновление таймера
 */
StageTimer.prototype.resume = function()
{
	this.paused = false;
};

/**
 * Пауза таймера
 */
StageTimer.prototype.pause = function()
{
	this.paused = true;
};

/** Таймаут в кадрах */
StageTimer.TIMEOUT_BY_FRAME = 0;
/** Таймаут в милисекундах */
StageTimer.TIMEOUT_BY_TIME = 1;

/** Тип таймаута таймеров */
StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_FRAME;

/**
 * @class
 * @augments DisplayObjectContainer
 * @description Класс сцены
 * @param {String} cnsId ID canvas-элемента
 * @param {Number} w ширина сцены
 * @param {Number} h высота сцены
 */
function Stage(cnsId, w, h)
{
	Utils.callSuperConstructor(Stage, this);

	/**
	 * ссылка на основной canvas
	 * @type DOM
	 */
	this.canvas = null;
	if(cnsId)
	{
		this.canvas = document.getElementById(cnsId);
		this.canvas.ctx = this.canvas.getContext('2d');
	}

	/**
	 * ссылка на фоновый canvas
	 * @type DOM
	 */
	this.backgroundCanvas = null;

	/**
	 * флаг, вынуждающий сцену перерисовать фон
	 * @type Boolean
	 */
	this.needToRebuildBack = false;

	/**
	 * ширина сцены
	 * @type Number
	 */
	this.screenWidth = w;

	/**
	 * высота сцены
	 * @type Number
	 */
	this.screenHeight = h;

	/**
	 * позиция (x, y) камеры
	 * @type Object
	 */
	this.viewport = {x: 0, y: 0};

	/**
	 * буфер для отрисовки в фоне
	 * @type DOM
	 */
	this.buffer = null;

	try
	{
		this.buffer = document.createElement('canvas');
		this.buffer.width = w * Utils.globalScale;
		this.buffer.height = h * Utils.globalScale;
		this.buffer.ctx = this.buffer.getContext('2d');
	}
	catch(e)
	{
		this.buffer = this.canvas;
	}

	/**
	 * задержка в милисекундах между итерациями отрисовки
	 * @type Number
	 */
	this.delay = 40;

	/**
	 * флаг, указывающий запущен ли процесс рендеринга сцены
	 * @type Boolean
	 */
	this.started = false;

	/**
	 * количество отрисованных кадров за секунду
	 * @type Number
	 */
	this.fps = 0;

	/** @ignore */
	this.lastFPS = 0;

	/**
	 * Флаг, указывающий на необходимость отображать в левом верхнем углу FPS
	 * @type Boolean
	 */
	this.showFPS = false;

	/**
	 * Флаг, указывающий на необходимость проверять событие Click не только по региону спрайта, по и по наличию в точке непрозрачного пикселя
	 * @type Boolean
	 */
	this.pixelClickEvent = false;

	/**
	 * Флаг, указывающий на необходимость проверять событие MouseUp не только по региону спрайта, по и по наличию в точке непрозрачного пикселя
	 * @type Boolean
	 */
	this.pixelMouseUpEvent = false;

	/**
	 * Флаг, указывающий на необходимость проверять событие MouseDown не только по региону спрайта, по и по наличию в точке непрозрачного пикселя
	 * @type Boolean
	 */
	this.pixelMouseDownEvent = false;

	/**
	 * Флаг, указывающий на необходимость проверять событие MouseMove не только по региону спрайта, по и по наличию в точке непрозрачного пикселя
	 * @type Boolean
	 */
	this.pixelMouseMoveEvent = false;

	/**
	 * Флаг, указывающий на необходимость округлять размеры спрайтов при рендеринге
	 * @type Boolean
	 */
	this.ceilSizes = false;

	/** @ignore */
	this.tmMain = null;

	/** @ignore */
	this.tmFPS = null;

	/**
	 * Флаг, указывающий на то, что сцена не будет очищаться перед отрисовкой каждого кадра
	 * @type Boolean
	 */
	this.clearLock = false;

	/**
	 * @description Если установлен - все спрайты с таким флагом будут рисовать отладочную информацию
	 * @type Boolean
	 */
	this.allowDebugDrawing = false;

	/**
	 * @description Если не установлен - все static спрайты не будут рисовать отладочную информацию
	 * @type Boolean
	 */
	this.allowStaticDebugDrawing = false;

	/** @ignore */
	this.drawBackAlways = Utils.mobileCheckBrokenAndroid();

	/** Массив твинов сцены */
	this.tweens = [];

	/** Массив таймеров сцены */
	this.timers = [];

	/** @ignore */
	this.eventsListeners = [];

	/** @ignore */
	this.lastTick = 0;

	/** @ignore */
	this.inputController = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая каждый раз перед началом итерации отрисовки
	 */
	this.onpretick = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая каждый раз в конце итерации отрисовки
	 */
	this.onposttick = null;

	/**
	 * @event
	 * @description Callback функция, нажатии левой кнопки мыши на сцене.
	 * @description В качестве параметра передается объект с полями: target - ссылка на сцену, x, y - координаты курсора мыши.
	 */
	this.onmousedown = null;

	/**
	 * @event
	 * @description Callback функция, отпускании левой кнопки мыши на сцене.
	 * @description В качестве параметра передается объект с полями: target - ссылка на сцену, x, y - координаты курсора мыши.
	 */
	this.onmouseup = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при клике на сцене.
	 * @description В качестве параметра передается объект с полями: target - ссылка на сцену, x, y - координаты курсора мыши.
	 */
	this.onclick = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при правом клике на сцене.
	 * @description В качестве параметра передается объект с полями: target - ссылка на сцену, x, y - координаты курсора мыши.
	 */
	this.oncontextmenu = null;

	/**
	 * @event
	 * @description Callback функция, вызываемая при передвижении курсора мыши на сцене.
	 * @description В качестве параметра передается объект с полями: target - ссылка на сцену, x, y - координаты курсора мыши.
	 */
	this.onmousemove = null;
	console.log(this.canvas);
	if(this.canvas) this.addInputListeners(this.canvas);

	this.tick = Utils.proxy(this.tick, this);
	this.clearFPS = Utils.proxy(this.clearFPS, this);

	this.stage = this;

	/** @deprecated */
	this.drawScene = this.render;
};

Utils.extend(Stage, DisplayObjectContainer);

/**
 * Принудительная перерисовка фона
 */
Stage.prototype.refreshBackground = function()
{
	this.needToRebuildBack = true;
};

/**
 * Установка фонового канваса для сцены
 * @param {String} cnsId id канваса
 */
Stage.prototype.setBackgroundCanvas = function(cnsId)
{
	if(cnsId)
	{
		this.backgroundCanvas = document.getElementById(cnsId);
		this.backgroundCanvas.ctx = this.backgroundCanvas.getContext('2d');
	}
};

/**
 * Полная очистка сцены
 */
Stage.prototype.destroy = function()
{
	clearTimeout(this.tmMain);
	clearTimeout(this.tmFPS);
	this.stop();
	this.clear();
	this.clearScreen(this.canvas);
	if(this.backgroundCanvas) this.clearScreen(this.backgroundCanvas);
	this.removeInputListeners(this.stage);
};

/**
 * Очистка указанного канваса
 * @param {DOM} canvas
 */
Stage.prototype.clearScreen = function(canvas)
{
	if(!this.clearLock)
	{
		canvas.ctx.clearRect(0, 0, Math.floor(canvas.width), Math.floor(canvas.height));
	}
};

Stage.prototype.addChild = function(item)
{
	item.stage = this;
	return Utils.callSuperMethod(Stage, this, "addChild", item);
};

Stage.prototype.setZIndex = function(item, index)
{
	this.setChildZIndex(item, index);
};

Stage.prototype.removeChild = function(item)
{
	if(item && this.objects.indexOf(item) >= 0)
	{
		this.clearObjectTweens(item);
		item.stage = null;
		Utils.callSuperMethod(Stage, this, "removeChild", item);
	}
};

/** @ignore */
Stage.prototype.finalizeMouseCoords = function(obj, m)
{
	if(!obj) return m;

	var eX = this.prepareMouseCoord(m.x);
	var eY = this.prepareMouseCoord(m.y);

	if(!obj.ignoreViewport)
	{
		eX += this.viewport.x;
		eY += this.viewport.y;
	}

	eX = eX - obj.x;
	eY = eY - obj.y;

	return {x: eX, y: eY};
};

/** @ignore */
Stage.prototype.prepareMouseCoord = function(val)
{
	return val / Utils.globalScale / Utils.globalPixelScale;
};

Stage.prototype.processMouseEvent = function(event, type, pixelCheck)
{
	var m = Utils.getMouseCoord(event, this.inputController);

	var stack = this.getObjectsStackByCoord(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y), pixelCheck, false);

	var ret, f;

	for(var i = 0; i < stack.length; i++)
	{
		f = this.finalizeMouseCoords(stack[i], m);
		ret = stack[i].dispatchEvent(type, {target: stack[i], x: f.x, y: f.y});
		if(ret === false) return;
	}

	this.dispatchEvent(type, {target: this, x: Math.floor(this.prepareMouseCoord(m.x)), y: Math.floor(this.prepareMouseCoord(m.y))});
};

/** @ignore */
Stage.prototype.checkClick = function(event)
{
	this.processMouseEvent(event, "click", this.pixelClickEvent);
};

/** @ignore */
Stage.prototype.checkContextMenu = function(event)
{
	this.processMouseEvent(event, "contextmenu", this.pixelClickEvent);
};

/** @ignore */
Stage.prototype.checkMouseMove = function(event)
{
	var m = Utils.getMouseCoord(event, this.inputController);

	this.doDrag(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y));

	var stack = this.getObjectsStackByCoord(this.prepareMouseCoord(m.x), this.prepareMouseCoord(m.y), this.pixelMouseMoveEvent);

	var i, n, ret, bOk, f, overStack = [];

	if(stack.length > 0)
	{
		for(i = 0; i < stack.length; i++)
		{
			overStack.push(stack[i]);

			f = this.finalizeMouseCoords(stack[i], m);
			if(!stack[i].mouseOn) ret = stack[i].dispatchEvent("mouseover",	{target: stack[i], x: f.x, y: f.y});

			stack[i].mouseOn = true;

			if(ret === false) break;
		}

		ret = true;

		for(i = 0; i < stack.length; i++)
		{
			f = this.finalizeMouseCoords(stack[i], m);
			ret = stack[i].dispatchEvent("mousemove", {target: stack[i], x: f.x, y: f.y});
			if(ret === false) break;
		}

		if(ret !== false) this.dispatchEvent("mousemove", {target: this, x: Math.floor(this.prepareMouseCoord(m.x)), y: Math.floor(this.prepareMouseCoord(m.y))});
	}

	this.checkMouseOut(overStack, m);
};

/** @ignore */
Stage.prototype.checkMouseDown = function(event)
{
	this.processMouseEvent(event, "mousedown", this.pixelMouseDownEvent);
};

/** @ignore */
Stage.prototype.checkMouseUp = function(event)
{
	this.processMouseEvent(event, "mouseup", this.pixelMouseUpEvent);
};

/**
 * Очистка спрайтов, твинов, таймеров и т.д.
 */
Stage.prototype.clear = function()
{
	this.tweens = [];
	this.timers = [];
	this.eventsListeners = [];
	this.objectsCounter = 0;

	Utils.callSuperMethod(Stage, this, "clear");
};

/**
 * Определение факта пересечения двух спрайтов
 * @param {Sprite} sprite1
 * @param {Sprite} sprite2
 */
Stage.prototype.hitTest = function(obj1, obj2)
{
	if(obj1.getAbsoluteRotation() == 0 && obj2.getAbsoluteRotation() == 0)
	{
		var cX1 = obj1.getX() - obj1.getWidth() / 2;
		var cY1 = obj1.getY() - obj1.getHeight() / 2;
		var cX2 = obj2.getX() - obj2.getWidth() / 2;
		var cY2 = obj2.getY() - obj2.getHeight() / 2;

		var top = Math.max(cY1, cY2);
		var left = Math.max(cX1, cX2);
		var right = Math.min(cX1 + obj1.getWidth(), cX2 + obj2.getWidth());
		var bottom = Math.min(cY1 + obj1.getHeight(), cY2 + obj2.getHeight());
		var width = right - left;
		var height = bottom - top;

		if(width > 0 && height > 0)	return true;
		else return false;
	}
	else
	{
		var r1 = obj1.getDrawRectangle(), r2 = obj2.getDrawRectangle();
		return r1.hitTestRectangle(r2);
	}
};

/**
 * Определение центра сцены
 * @returns {Object} Объект {x: x, y: y}
 */
Stage.prototype.getCenter = function()
{
	return {x: this.screenWidth/2, y: this.screenHeight/2};
};

/**
 * Отрисовка прямоугольника на сцене
 * @param {Number} x x координата центра
 * @param {Number} y y координата центра
 * @param {Number} width ширина
 * @param {Number} height высота
 * @param {String} color цвет
 * @param {Boolean} fill нужно ли заливать прямоугольник
 * @param {Number} opacity прозрачность
 * @param {Boolean} ignoreViewport игнорирование состояния камеры
 */
Stage.prototype.drawRectangle = function(x, y, width, height, color, fill, opacity, ignoreViewport)
{
	var cns = this.canvas;

	if( typeof opacity != 'undefined') cns.ctx.globalAlpha = opacity;
	else cns.ctx.globalAlpha = 1;

	cns.ctx.fillStyle = color;
	cns.ctx.strokeStyle = color;

	if(!ignoreViewport)
	{
		x -= this.viewport.x;
		y -= this.viewport.y;
	}

	x = x * Utils.globalScale;
	y = y * Utils.globalScale;
	width = width * Utils.globalScale;
	height = height * Utils.globalScale;

	if(fill) cns.ctx.fillRect(x - width / 2, y - height / 2, width, height);
	else cns.ctx.strokeRect(x - width / 2, y - height / 2, width, height);
};

/**
 * Отрисовка круга на сцене
 * @param {Number} x x координата центра
 * @param {Number} y y координата центра
 * @param {Number} radius радиус круга
 * @param {Number} width толщина линии
 * @param {String} color цвет
 * @param {Number} opacity прозрачность
 * @param {Boolean} ignoreViewport игнорирование состояния камеры
 */
Stage.prototype.drawCircle = function(x, y, radius, width, color, opacity, ignoreViewport)
{
	this.drawArc(x, y, radius, 0, Math.PI * 2, false, width, color, opacity, ignoreViewport);
};

/**
 * Отрисовка дуги на сцене
 * @param {Number} x x координата
 * @param {Number} y y координата
 * @param {Number} radius радиус
 * @param {Number} startAngle начальный угол
 * @param {Number} endAngle конечный угол
 * @param {Boolean} anticlockwise флаг отрисовки против часовой стрелки
 * @param {Number} width толщина линии
 * @param {String} color цвет
 * @param {Number} opacity прозрачность
 * @param {Boolean} ignoreViewport игнорирование состояния камеры
 */
Stage.prototype.drawArc = function(x, y, radius, startAngle, endAngle, anticlockwise, width, color, opacity, ignoreViewport)
{
	var cns = this.canvas;

	var oldLW = cns.ctx.lineWidth;

	if( typeof color == "undefined") color = "#000";
	cns.ctx.strokeStyle = color;

	if( typeof width == "undefined") width = 1;
	cns.ctx.lineWidth = width * Utils.globalScale;

	if( typeof opacity == "undefined") opacity = 1;
	cns.ctx.globalAlpha = opacity;

	if(!ignoreViewport)
	{
		x -= this.viewport.x;
		y -= this.viewport.y;
	}

	x = x * Utils.globalScale;
	y = y * Utils.globalScale;
	radius = radius * Utils.globalScale;

	cns.ctx.beginPath();
	cns.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	cns.ctx.stroke();

	cns.ctx.lineWidth = oldLW;
};

/**
 * Отрисовка полигона на сцене
 * @param {Array} points массив точек полигона. Должен содержать объекты вида {x: value, y: value}.
 * @param {Number} width толщина линии
 * @param {String} color цвет
 * @param {Number} opacity прозрачность
 * @param {Boolean} ignoreViewport игнорирование состояния камеры
 */
Stage.prototype.drawPolygon = function(points, width, color, opacity, ignoreViewport)
{
	if(( typeof points != "object") || !( points instanceof Array) || points.length < 2) return;

	for(var i = 0; i < points.length - 1; i++)
	{
		this.drawLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, width, color, opacity, ignoreViewport);
	}

	this.drawLine(points[i].x, points[i].y, points[0].x, points[0].y, width, color, opacity, ignoreViewport);

};

/**
 * Отрисовка линии на сцене
 * @param {Number} x1 x координата начала
 * @param {Number} y1 y координата начала
 * @param {Number} x2 x координата конца
 * @param {Number} y2 y координата конца
 * @param {Number} width толщина
 * @param {String} color цвет
 * @param {Number} opacity прозрачность
 * @param {Boolean} ignoreViewport игнорирование состояния камеры
 */
Stage.prototype.drawLine = function(x1, y1, x2, y2, width, color, opacity, ignoreViewport)
{
	var cns = this.canvas;

	var oldLW = cns.ctx.lineWidth;

	if(color) cns.ctx.strokeStyle = color;
	else cns.ctx.strokeStyle = '#000';

	if(width) cns.ctx.lineWidth = width * Utils.globalScale;
	else cns.ctx.lineWidth = 1 * Utils.globalScale;

	if(opacity) cns.ctx.globalAlpha = opacity;
	else cns.ctx.globalAlpha = 1;

	if(!ignoreViewport)
	{
		x1 -= this.viewport.x;
		y1 -= this.viewport.y;
		x2 -= this.viewport.x;
		y2 -= this.viewport.y;
	}

	x1 = x1 * Utils.globalScale;
	y1 = y1 * Utils.globalScale;
	x2 = x2 * Utils.globalScale;
	y2 = y2 * Utils.globalScale;

	cns.ctx.beginPath();
	cns.ctx.moveTo(x1, y1);
	cns.ctx.lineTo(x2, y2);
	cns.ctx.stroke();

	cns.ctx.lineWidth = oldLW;
};

/**
 * Старт отрисовки
 */
Stage.prototype.start = function()
{
	if(this.started) return;

	this.started = true;
	this.clearFPS();
	this.tick();
};

/**
 * Принудительная отрисовка
 */
Stage.prototype.forceRender = function()
{
	if(this.started) this.tick();
};

/**
 * Остановка отрисовки
 */
Stage.prototype.stop = function()
{
	this.started = false;
};

/** @ignore */
Stage.prototype.clearFPS = function()
{
	this.lastFPS = this.fps;
	this.fps = 0;
	if(this.started) this.tmFPS = setTimeout(this.clearFPS, 1000);
};

/**
 * Установка стиля текста
 * @param {String} font шрифт
 * @param {Number} size размер
 * @param {String} style стиль
 * @param {String} color цвет
 * @param {String} borderColor цвет окантовки
 * @param {DOM} canvas канвас, для которого будет применен стиль
 */
Stage.prototype.setTextStyle = function(font, size, style, color, borderColor, canvas)
{
	var cns = ( canvas ? canvas : this.canvas);

	cns.ctx.fillStyle = color;
	cns.ctx.strokeStyle = borderColor;

	var s = "";
	if(style) s += style + " ";
	if(size) s += Math.floor(size * Utils.globalScale) + "px ";
	if(font) s += font;

	cns.ctx.font = s;
};

/**
 * Отрисовка текста
 * @param {String} text текст
 * @param {Number} x x координата
 * @param {Number} y y координата
 * @param {Number} opacity прозрачность
 * @param {Boolean} ignoreViewport игнорирование состояния камеры
 * @param {Boolean} alignCenter выравнивание по центру
 * @param {DOM} canvas канвас, на котором будет произведена отрисовка
 */
Stage.prototype.drawText = function(text, x, y, opacity, ignoreViewport, alignCenter, canvas)
{
	var cns = ( canvas ? canvas : this.canvas);

	if( typeof opacity == "undefined") cns.ctx.globalAlpha = 1;
	else cns.ctx.globalAlpha = opacity;

	if(!ignoreViewport)
	{
		x -= this.viewport.x;
		y -= this.viewport.y;
	}

	x = x * Utils.globalScale;
	y = y * Utils.globalScale;

	if(alignCenter)	x = x - this.getTextWidth(text) / 2;

	cns.ctx.fillText(text, x, y);
};

/**
 * Отрисовка контуров текста
 * @param {String} text текст
 * @param {Number} x x координата
 * @param {Number} y y координата
 * @param {Number} opacity прозрачность
 * @param {Boolean} ignoreViewport игнорирование состояния камеры
 * @param {Boolean} alignCenter выравнивание по центру
 * @param {DOM} canvas канвас, на котором будет произведена отрисовка
 */
Stage.prototype.strokeText = function(text, x, y, opacity, ignoreViewport, alignCenter, canvas)
{
	var cns = ( canvas ? canvas : this.canvas);

	if( typeof opacity == "undefined") cns.ctx.globalAlpha = 1;
	else cns.ctx.globalAlpha = opacity;

	if(!ignoreViewport)
	{
		x -= this.viewport.x;
		y -= this.viewport.y;
	}

	x = x * Utils.globalScale;
	y = y * Utils.globalScale;

	if(alignCenter) x = x - this.getTextWidth(text) / 2;

	cns.ctx.strokeText(text, x, y);
};

/**
 * Определение ширины текста
 * @param {String} str текст
 */
Stage.prototype.getTextWidth = function(str, canvas)
{
	var cns = ( canvas ? canvas : this.canvas);
	return cns.ctx.measureText(str).width;
};

/**
 * Отрисовка сцены. Применяется каждый кадр рендеринга. Кроме этого может вызываться напрямую. Например, для формирования изображения на подложке экрана.
 * @param {Canvas} cns ссылка на канвас
 * @param {Boolean} drawStatic флаг, указывающий на то, какой тип объектов нужно отрисовывать. false - динамичные, true - статичные.
 */
Stage.prototype.render = function(cns, drawStatic, noClear, delta)
{
	if(!cns) return;
	if(!delta) delta = 0;

	var obj, ok;

	if(cns && !cns.ctx) cns.ctx = cns.getContext("2d");

	if(!noClear)
	{
		var fill = this.getFillStyle(cns);
		if(!fill)
		{
			if(!this.clearLock) this.clearScreen(cns);
		}
		else
		{
			cns.ctx.fillStyle = fill;
			cns.ctx.fillRect(0, 0, cns.width, cns.height);
		}
	}

	Utils.callSuperMethod(Stage, this, "render", cns, drawStatic, delta);
};

/**
 * Создаёт анимацию заданного свойства с указанными диапазоном и скоростью
 * @param {Object} obj Объект, содержащий анимируемое свойство
 * @param {String} prop Объект, содержащий анимируемое свойство
 * @param {Number} start Начальное значение
 * @param {Number} end Конечное значение
 * @param {Number} duration Длительность в фреймах
 * @param {Number} ease Функция анимации. См. <a href="Easing.html">Easing.type.func</a>
 */
Stage.prototype.createTween = function(obj, prop, start, end, duration, ease)
{
	var t = new Tween(obj, prop, start, end, duration, ease);
	this.tweens.push(t);
	return t;
};

/**
 * Удаляет анимацию из стека, остановив её где есть.
 * @param {Object} t Объект класса Tween, или ID анимации в стеке
 */
Stage.prototype.removeTween = function(t)
{
	var id = null;
	if(isNaN(t))
	{
		for(var i = 0; i < this.tweens.length; i++)
		{
			if(this.tweens[i] === t)
			{
				id = i;
				break;
			}
		}
	}
	else id = t;

	if (!isNaN(id))
	{
		if (this.tweens[id])
		{
			this.tweens[id].pause();
		}
		this.tweens.splice(id, 1);
	}

	return id;
};

/**
 * Удаляет всю анимацию из стека, которая относится к указанному объекту.
 * @param {Object} t Объект, содержащий анимируемые свойства
 */
Stage.prototype.clearObjectTweens = function(obj)
{
	for(var i = 0; i < this.tweens.length; i++)
	{
		if(this.tweens[i].obj === obj)
		{
			this.tweens[i].destroy = true;
		}
	}
};

/**
 * Очередной шаг анимации
 * @ignore
 */
Stage.prototype.updateTweens = function(delta)
{
	for(var i = 0; i < this.tweens.length; i++)
	{
		if(this.tweens[i].destroy)
		{
			i = this.removeTween(i);
			i--;
		}
	}

	for(var i = 0; i < this.tweens.length; i++)
	{
		if(this.tweens[i].tick(delta))
		{
			if(this.tweens[i]) this.tweens[i].destroy = true;
		}
	}
};

/**
 * Установка таймаута
 * @param {Function} callback функция, которая будет вызвана по окончанию таймера
 * @param {Number} timeout таймаут
 * @returns {StageTimer} таймер
 */
Stage.prototype.setTimeout = function(callback, timeout)
{
	var t = new StageTimer(callback, timeout);
	this.timers.push(t);
	return t;
};

/**
 * Очистка таймера
 * @param {StageTimer} t таймер
 */
Stage.prototype.clearTimeout = function(t)
{
	this.timers = Utils.removeFromArray(this.timers, t);
};

/**
 * Установка интервала
 * @param {Function} callback функция, которая будет вызваться каждый раз по окончанию таймера
 * @param {Number} timeout таймаут
 * @returns {StageTimer} таймер
 */
Stage.prototype.setInterval = function(callback, timeout)
{
	var t = new StageTimer(callback, timeout, true);
	this.timers.push(t);
	return t;
};

/**
 * Очистка интервала
 * @param {StageTimer} t интервал
 */
Stage.prototype.clearInterval = function(t)
{
	this.clearTimeout(t);
};

/** @ignore */
Stage.prototype.updateTimers = function(delta)
{
	for(var i = 0; i < this.timers.length; i++)
	{
		if(this.timers[i].update(delta))
		{
			this.clearTimeout(this.timers[i]);
			i--;
		}
	}
};

/** @ignore */
Stage.prototype.tick = function()
{
	clearTimeout(this.tmMain);

    var d;

    if(Utils.isWindowHidden)
    {
        this.lastTick = 0;
        d = this.delay;
    }
    else
    {
    	var tmStart = new Date().getTime();
    	var delta = this.lastTick ? tmStart - this.lastTick : this.delay;
    	this.lastTick = tmStart;

    	this.dispatchEvent("pretick", {target: this, delta: delta});
    	if(!this.started)
    	{
    	    this.lastTick = 0;
    	    return;
        }

    	this.updateTweens(delta);
        if(!this.started)
        {
            this.lastTick = 0;
            return;
        }

        this.updateTimers(delta);
        if(!this.started)
        {
            this.lastTick = 0;
            return;
        }

    	var noClear = false;
    	if(this.drawBackAlways)
    	{
    		this.render(this.canvas, true, false, delta);
    		noClear = true;
    	}
    	else
    	{
    		if(this.needToRebuildBack)
    		{
    			this.needToRebuildBack = false;
    			if(this.backgroundCanvas) this.render(this.backgroundCanvas, true);
    		}
    	}

    	this.render(this.canvas, false, noClear, delta);

    	if(this.showFPS)
    	{
    		this.setTextStyle("sans-serif", 10, "bold", "#fff", "#000");
    		this.drawText("FPS: " + this.lastFPS, 2, 10, 1, true);
    	}

    	this.dispatchEvent("posttick", {target: this, delta: delta});

    	d = new Date().getTime() - tmStart;
    	d = this.delay - d;
    	if(d < 1) d = 1;
    	this.fps++;
	}

	if(this.started) this.tmMain = setTimeout(this.tick, d);
	else this.lastTick = 0;
};

/**
 * Синхронизация спрайтов с объектами box2d.
 * Внимание! Для синхронизации спрайты должны быть включены в объекты box2d в виде свойства sprite.
 * @deprecated используется только в старых играх с использованием 1-й версии box2d
 */
Stage.prototype.box2dSync = function(world)
{
	var p;
	for( b = world.m_bodyList; b; b = b.m_next)
	{
		if(b.sprite)
		{
			b.sprite.rotation = b.GetRotation();
			p = b.GetPosition();
			b.sprite.x = p.x;
			b.sprite.y = p.y;

			b.sprite.dispatchEvent("box2dsync",	{target: b.sprite});
		}
	}
};

/** @ignore */
Stage.prototype.processTouchEvent = function(touches, controller)
{
	for(var i = 0; i < touches.length; i++)
	{
		var e = {clientX: touches[i].clientX, clientY: touches[i].clientY};
		this[controller](e);
	}
};

/** @ignore */

Stage.prototype.addInputListeners = function(obj)
{
    console.log(obj);
    console.log(Utils.touchScree);
	this.inputController = obj;
	if(Utils.touchScreen)
	{

		obj.ontouchstart = Utils.proxy(function(event)
		{
			this.processTouchEvent(event.touches, "checkMouseDown");
			this.processTouchEvent(event.touches, "checkClick");
			event.preventDefault();
		}, this);

		obj.ontouchmove = Utils.proxy(function(event)
		{
			this.processTouchEvent(event.touches, "checkMouseMove");
			event.preventDefault();
		}, this);

		obj.ontouchend = Utils.proxy(function(event)
		{
			this.processTouchEvent(event.changedTouches, "checkMouseUp");
			event.preventDefault();
		}, this);
	}
	else
	{
		obj.onclick = Utils.proxy(function(event)
		{
			this.checkClick(event);
		}, this);
		obj.onmousemove = Utils.proxy(function(event)
		{
			this.checkMouseMove(event);
		}, this);
		obj.onmousedown = Utils.proxy(function(event)
		{
			if(event.button == 0) this.checkMouseDown(event);
		}, this);
		obj.onmouseup = Utils.proxy(function(event)
		{
			if(event.button == 0) this.checkMouseUp(event);
		}, this);
		obj.oncontextmenu = Utils.proxy(function(event)
		{
			this.checkContextMenu(event);
		}, this);
	}
};

Stage.prototype.removeInputListeners= function(obj)
{
	obj.ontouchstart = null;
	obj.ontouchmove = null;
	obj.ontouchend = null;
	obj.onclick = null;
	obj.onmousemove = null;
	obj.onmousedown = null;
	obj.onmouseup = null;
	obj.oncontextmenu = null;
};


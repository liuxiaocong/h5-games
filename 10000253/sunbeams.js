var isNeedFpsMeter = true;
var isLevelEditor = true;
var isSkipMenus = !true;
var editLevelToLoad = 20;
var isLastLevelLoad = !true;
var isDisableWin = false;
var isOpenAllLevels = true;
var openedLevels = 20;
var isPhysicsDebugDraw = false;
var isGetAllProperties = false;
var isLoadAnimFromJSON = !false;
var isSkipSplash = false;
var isShowLogo = !false;
var isLevelSelectShow = !true;
var spriteScale = 1;
var isWithCache = !true;
var isTimerUpdateMode = false;
var isPageLeaved = false;
var isDesktopBrowser = false;
var SPONSOR_URL = "http://";
var PRELOADER_BAR = "preload_bar.png";
var PRELOADER_BG = "preloader_bg.png";
var PRELOADER_BUT = "butGo.png";
var MAIN_BG = "mainBack.jpg";
var HERO_TYPE = 0;
var DECOR_OWL_TYPE = 25;
var DECOR_CLOUD_1_TYPE = 26;
var DECOR_CLOUD_2_TYPE = 27;
var DECOR_CLOUD_3_TYPE = 28;
var DECOR_CLOUD_4_TYPE = 29;
var PHYSICS_RECT_TYPE = 100;
var DYNAMIC_BOX_TYPE = 101;
var TELEPORT_TYPE = 102;
var BOMB_TYPE = 103;
var MOVER_1_TYPE = 109;
var MOVER_2_TYPE = 110;
var CLOUD_TYPE = 114;
var MOVER_CLOUD_DANGER_TYPE = 116;
var BONUS_STAR_TYPE = 203;
var AIM_TYPE = 301;
var STATIC_CATEGORY = 1;
var DOC_CATEGORY = 2;
var MAN_CATEGORY = 4;
this.createjs = this.createjs || {};
(function() {
    var Event = function(type, bubbles, cancelable) {
        this.initialize(type, bubbles, cancelable)
    };
    var p = Event.prototype;
    p.type = null;
    p.target = null;
    p.currentTarget = null;
    p.eventPhase = 0;
    p.bubbles = false;
    p.cancelable = false;
    p.timeStamp = 0;
    p.defaultPrevented = false;
    p.propagationStopped = false;
    p.immediatePropagationStopped = false;
    p.removed = false;
    p.initialize = function(type, bubbles, cancelable) {
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.timeStamp = (new Date).getTime()
    };
    p.preventDefault = function() {
        this.defaultPrevented = true
    };
    p.stopPropagation = function() {
        this.propagationStopped = true
    };
    p.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = true
    };
    p.remove = function() {
        this.removed = true
    };
    p.clone = function() {
        return new Event(this.type, this.bubbles, this.cancelable)
    };
    p.toString = function() {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = Event
})();
this.createjs = this.createjs || {};
(function() {
    var EventDispatcher = function() {};
    var p = EventDispatcher.prototype;
    EventDispatcher.initialize = function(target) {
        target.addEventListener = p.addEventListener;
        target.on = p.on;
        target.removeEventListener = target.off = p.removeEventListener;
        target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasEventListener = p.hasEventListener;
        target.dispatchEvent = p.dispatchEvent;
        target._dispatchEvent = p._dispatchEvent
    };
    p._listeners = null;
    p._captureListeners = null;
    p.initialize = function() {};
    p.addEventListener = function(type, listener, useCapture) {
        var listeners;
        if (useCapture) listeners = this._captureListeners = this._captureListeners || {};
        else listeners = this._listeners = this._listeners || {};
        var arr = listeners[type];
        if (arr) this.removeEventListener(type, listener, useCapture);
        arr = listeners[type];
        if (!arr) listeners[type] = [listener];
        else arr.push(listener);
        return listener
    };
    p.on = function(type, listener, scope, once, data, useCapture) {
        if (listener.handleEvent) {
            scope = scope || listener;
            listener = listener.handleEvent
        }
        scope = scope || this;
        return this.addEventListener(type, function(evt) {
            listener.call(scope, evt, data);
            once && evt.remove()
        }, useCapture)
    };
    p.removeEventListener = function(type, listener, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners;
        if (!listeners) return;
        var arr = listeners[type];
        if (!arr) return;
        for (var i = 0, l = arr.length; i < l; i++) if (arr[i] == listener) {
            if (l == 1) delete listeners[type];
            else arr.splice(i, 1);
            break
        }
    };
    p.off = p.removeEventListener;
    p.removeAllEventListeners = function(type) {
        if (!type) this._listeners = this._captureListeners = null;
        else {
            if (this._listeners) delete this._listeners[type];
            if (this._captureListeners) delete this._captureListeners[type]
        }
    };
    p.dispatchEvent = function(eventObj, target) {
        if (typeof eventObj == "string") {
            var listeners = this._listeners;
            if (!listeners || !listeners[eventObj]) return false;
            eventObj = new createjs.Event(eventObj)
        }
        eventObj.target = target || this;
        if (!eventObj.bubbles || !this.parent) this._dispatchEvent(eventObj, 2);
        else {
            var top = this,
                list = [top];
            while (top.parent) list.push(top = top.parent);
            var i, l = list.length;
            for (i = l - 1; i >= 0 && !eventObj.propagationStopped; i--) list[i]._dispatchEvent(eventObj, 1 + (i == 0));
            for (i = 1; i < l && !eventObj.propagationStopped; i++) list[i]._dispatchEvent(eventObj, 3)
        }
        return eventObj.defaultPrevented
    };
    p.hasEventListener = function(type) {
        var listeners = this._listeners,
            captureListeners = this._captureListeners;
        return !!(listeners && listeners[type] || captureListeners && captureListeners[type])
    };
    p.toString = function() {
        return "[EventDispatcher]"
    };
    p._dispatchEvent = function(eventObj, eventPhase) {
        var l, listeners = eventPhase == 1 ? this._captureListeners : this._listeners;
        if (eventObj && listeners) {
            var arr = listeners[eventObj.type];
            if (!arr || !(l = arr.length)) return;
            eventObj.currentTarget = this;
            eventObj.eventPhase = eventPhase;
            eventObj.removed = false;
            arr = arr.slice();
            for (var i = 0; i < l && !eventObj.immediatePropagationStopped; i++) {
                var o = arr[i];
                if (o.handleEvent) o.handleEvent(eventObj);
                else o(eventObj);
                if (eventObj.removed) {
                    this.off(eventObj.type, o, eventPhase == 1);
                    eventObj.removed = false
                }
            }
        }
    };
    createjs.EventDispatcher = EventDispatcher
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(array, searchElement) {
        for (var i = 0, l = array.length; i < l; i++) if (searchElement === array[i]) return i;
        return -1
    }
})();
this.createjs = this.createjs || {};
(function() {
    var UID = function() {
        throw "UID cannot be instantiated";
    };
    UID._nextID = 0;
    UID.get = function() {
        return UID._nextID++
    };
    createjs.UID = UID
})();
this.createjs = this.createjs || {};
(function() {
    var Ticker = function() {
        throw "Ticker cannot be instantiated.";
    };
    Ticker.RAF_SYNCHED = "synched";
    Ticker.RAF = "raf";
    Ticker.TIMEOUT = "timeout";
    Ticker.useRAF = false;
    Ticker.timingMode = null;
    Ticker.maxDelta = 60;
    Ticker.removeEventListener = null;
    Ticker.removeAllEventListeners = null;
    Ticker.dispatchEvent = null;
    Ticker.hasEventListener = null;
    Ticker._listeners = null;
    createjs.EventDispatcher.initialize(Ticker);
    Ticker._addEventListener = Ticker.addEventListener;
    Ticker.addEventListener = function() {
        !Ticker._inited && Ticker.init();
        return Ticker._addEventListener.apply(Ticker, arguments)
    };
    Ticker._paused = false;
    Ticker._inited = false;
    Ticker._startTime = 0;
    Ticker._pausedTime = 0;
    Ticker._ticks = 0;
    Ticker._pausedTicks = 0;
    Ticker._interval = 50;
    Ticker._lastTime = 0;
    Ticker._times = [];
    Ticker._tickTimes = [];
    Ticker._timerId = null;
    Ticker._raf = true;
    Ticker._isFirstInit = true;
    Ticker.init = function() {
        if (Ticker._inited) return;
        Ticker._timerId = null;
        Ticker._inited = true;
        Ticker._isFirstInit = false;
        Ticker._times = [];
        Ticker._tickTimes = [];
        Ticker._startTime = Ticker._getTime();
        Ticker._times.push(Ticker._lastTime = 0);
        Ticker.setInterval(Ticker._interval)
    };
    Ticker.reset = function() {
        Ticker._inited = false;
        if (Ticker._raf) {
            var f = window.cancelAnimationFrame || (window.webkitCancelAnimationFrame || (window.mozCancelAnimationFrame || (window.oCancelAnimationFrame || window.msCancelAnimationFrame)));
            f && f(Ticker._timerId)
        } else clearTimeout(Ticker._timerId)
    };
    Ticker.setInterval = function(interval) {
        Ticker._interval = interval;
        if (!Ticker._inited) return;
        Ticker._setupTick()
    };
    Ticker.getInterval = function() {
        return Ticker._interval
    };
    Ticker.setFPS = function(value) {
        Ticker.setInterval(1E3 / value)
    };
    Ticker.getFPS = function() {
        return 1E3 / Ticker._interval
    };
    Ticker.getMeasuredTickTime = function(ticks) {
        var ttl = 0,
            times = Ticker._tickTimes;
        if (times.length < 1) return -1;
        ticks = Math.min(times.length, ticks || Ticker.getFPS() | 0);
        for (var i = 0; i < ticks; i++) ttl += times[i];
        return ttl / ticks
    };
    Ticker.getMeasuredFPS = function(ticks) {
        var times = Ticker._times;
        if (times.length < 2) return -1;
        ticks = Math.min(times.length - 1, ticks || Ticker.getFPS() | 0);
        return 1E3 / ((times[0] - times[ticks]) / ticks)
    };
    Ticker.setPaused = function(value) {
        Ticker._paused = value
    };
    Ticker.getPaused = function() {
        return Ticker._paused
    };
    Ticker.getTime = function(runTime) {
        return Ticker._getTime() - Ticker._startTime - (runTime ? Ticker._pausedTime : 0)
    };
    Ticker.getEventTime = function(runTime) {
        return (Ticker._lastTime || Ticker._startTime) - (runTime ? Ticker._pausedTime : 0)
    };
    Ticker.getTicks = function(pauseable) {
        return Ticker._ticks - (pauseable ? Ticker._pausedTicks : 0)
    };
    Ticker._handleSynch = function() {
        var time = Ticker._getTime() - Ticker._startTime;
        Ticker._timerId = null;
        Ticker._setupTick();
        if (time - Ticker._lastTime >= (Ticker._interval - 1) * 0.97) Ticker._tick()
    };
    Ticker._handleRAF = function() {
        Ticker._timerId = null;
        Ticker._setupTick();
        Ticker._tick()
    };
    Ticker._handleTimeout = function() {
        Ticker._timerId = null;
        Ticker._setupTick();
        Ticker._tick()
    };
    Ticker._setupTick = function() {
        if (Ticker._timerId != null) {
            trace("duplicate");
            return
        }
        var mode = Ticker.timingMode || Ticker.useRAF && Ticker.RAF_SYNCHED;
        if (mode == Ticker.RAF_SYNCHED || mode == Ticker.RAF) {
            var f = window.requestAnimationFrame || (window.webkitRequestAnimationFrame || (window.mozRequestAnimationFrame || (window.oRequestAnimationFrame || window.msRequestAnimationFrame)));
            if (f) {
                Ticker._timerId = f(mode == Ticker.RAF ? Ticker._handleRAF : Ticker._handleSynch);
                Ticker._raf = true;
                return
            }
        }
        Ticker._raf = false;
        Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval)
    };
    Ticker._tick = function() {
        var time = Ticker._getTime() - Ticker._startTime;
        var elapsedTime = time - Ticker._lastTime;
        var paused = Ticker._paused;
        Ticker._ticks++;
        if (paused) {
            Ticker._pausedTicks++;
            Ticker._pausedTime += elapsedTime
        }
        Ticker._lastTime = time;
        if (Ticker.hasEventListener("tick")) {
            var event = new createjs.Event("tick");
            var maxDelta = Ticker.maxDelta;
            event.delta = maxDelta && elapsedTime > maxDelta ? maxDelta : elapsedTime;
            event.paused = paused;
            event.time = time;
            event.runTime = time - Ticker._pausedTime;
            Ticker.dispatchEvent(event)
        }
        Ticker._tickTimes.unshift(Ticker._getTime() - time);
        while (Ticker._tickTimes.length > 100) Ticker._tickTimes.pop();
        Ticker._times.unshift(time);
        while (Ticker._times.length > 100) Ticker._times.pop()
    };
    var now = window.performance && (performance.now || (performance.mozNow || (performance.msNow || (performance.oNow || performance.webkitNow))));
    Ticker._getTime = function() {
        return now && now.call(performance) || (new Date).getTime()
    };
    createjs.Ticker = Ticker
})();
this.createjs = this.createjs || {};
(function() {
    var MouseEvent = function(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY) {
        this.initialize(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY)
    };
    var p = MouseEvent.prototype = new createjs.Event;
    p.stageX = 0;
    p.stageY = 0;
    p.rawX = 0;
    p.rawY = 0;
    p.nativeEvent = null;
    p.pointerID = 0;
    p.primary = false;
    p.addEventListener = null;
    p.removeEventListener = null;
    p.removeAllEventListeners = null;
    p.dispatchEvent = null;
    p.hasEventListener = null;
    p._listeners = null;
    createjs.EventDispatcher.initialize(p);
    p.Event_initialize = p.initialize;
    p.initialize = function(type, bubbles, cancelable, stageX, stageY, nativeEvent, pointerID, primary, rawX, rawY) {
        this.Event_initialize(type, bubbles, cancelable);
        this.stageX = stageX;
        this.stageY = stageY;
        this.nativeEvent = nativeEvent;
        this.pointerID = pointerID;
        this.primary = primary;
        this.rawX = rawX == null ? stageX : rawX;
        this.rawY = rawY == null ? stageY : rawY
    };
    p.clone = function() {
        return new MouseEvent(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
    };
    p.toString = function() {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
    };
    createjs.MouseEvent = MouseEvent
})();
this.createjs = this.createjs || {};
(function() {
    var Matrix2D = function(a, b, c, d, tx, ty) {
        this.initialize(a, b, c, d, tx, ty)
    };
    var p = Matrix2D.prototype;
    Matrix2D.identity = null;
    Matrix2D.DEG_TO_RAD = Math.PI / 180;
    p.a = 1;
    p.b = 0;
    p.c = 0;
    p.d = 1;
    p.tx = 0;
    p.ty = 0;
    p.alpha = 1;
    p.shadow = null;
    p.compositeOperation = null;
    p.initialize = function(a, b, c, d, tx, ty) {
        this.a = a == null ? 1 : a;
        this.b = b || 0;
        this.c = c || 0;
        this.d = d == null ? 1 : d;
        this.tx = tx || 0;
        this.ty = ty || 0;
        return this
    };
    p.prepend = function(a, b, c, d, tx, ty) {
        var tx1 = this.tx;
        if (a != 1 || (b != 0 || (c != 0 || d != 1))) {
            var a1 = this.a;
            var c1 = this.c;
            this.a = a1 * a + this.b * c;
            this.b = a1 * b + this.b * d;
            this.c = c1 * a + this.d * c;
            this.d = c1 * b + this.d * d
        }
        this.tx = tx1 * a + this.ty * c + tx;
        this.ty = tx1 * b + this.ty * d + ty;
        return this
    };
    p.append = function(a, b, c, d, tx, ty) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        this.a = a * a1 + b * c1;
        this.b = a * b1 + b * d1;
        this.c = c * a1 + d * c1;
        this.d = c * b1 + d * d1;
        this.tx = tx * a1 + ty * c1 + this.tx;
        this.ty = tx * b1 + ty * d1 + this.ty;
        return this
    };
    p.prependMatrix = function(matrix) {
        this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        this.prependProperties(matrix.alpha, matrix.shadow, matrix.compositeOperation);
        return this
    };
    p.appendMatrix = function(matrix) {
        this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        this.appendProperties(matrix.alpha, matrix.shadow, matrix.compositeOperation);
        return this
    };
    p.prependTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
        if (rotation % 360) {
            var r = rotation * Matrix2D.DEG_TO_RAD;
            var cos = Math.cos(r);
            var sin = Math.sin(r)
        } else {
            cos = 1;
            sin = 0
        }
        if (regX || regY) {
            this.tx -= regX;
            this.ty -= regY
        }
        if (skewX || skewY) {
            skewX *= Matrix2D.DEG_TO_RAD;
            skewY *= Matrix2D.DEG_TO_RAD;
            this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y)
        } else this.prepend(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        return this
    };
    p.appendTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
        if (rotation % 360) {
            var r = rotation * Matrix2D.DEG_TO_RAD;
            var cos = Math.cos(r);
            var sin = Math.sin(r)
        } else {
            cos = 1;
            sin = 0
        }
        if (skewX || skewY) {
            skewX *= Matrix2D.DEG_TO_RAD;
            skewY *= Matrix2D.DEG_TO_RAD;
            this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0)
        } else this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        if (regX || regY) {
            this.tx -= regX * this.a + regY * this.c;
            this.ty -= regX * this.b + regY * this.d
        }
        return this
    };
    p.rotate = function(angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;
        this.a = a1 * cos - this.b * sin;
        this.b = a1 * sin + this.b * cos;
        this.c = c1 * cos - this.d * sin;
        this.d = c1 * sin + this.d * cos;
        this.tx = tx1 * cos - this.ty * sin;
        this.ty = tx1 * sin + this.ty * cos;
        return this
    };
    p.skew = function(skewX, skewY) {
        skewX = skewX * Matrix2D.DEG_TO_RAD;
        skewY = skewY * Matrix2D.DEG_TO_RAD;
        this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
        return this
    };
    p.scale = function(x, y) {
        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;
        return this
    };
    p.translate = function(x, y) {
        this.tx += x;
        this.ty += y;
        return this
    };
    p.identity = function() {
        this.alpha = this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        this.shadow = this.compositeOperation = null;
        return this
    };
    p.invert = function() {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        var tx1 = this.tx;
        var n = a1 * d1 - b1 * c1;
        this.a = d1 / n;
        this.b = -b1 / n;
        this.c = -c1 / n;
        this.d = a1 / n;
        this.tx = (c1 * this.ty - d1 * tx1) / n;
        this.ty = -(a1 * this.ty - b1 * tx1) / n;
        return this
    };
    p.isIdentity = function() {
        return this.tx == 0 && (this.ty == 0 && (this.a == 1 && (this.b == 0 && (this.c == 0 && this.d == 1))))
    };
    p.transformPoint = function(x, y, pt) {
        pt = pt || {};
        pt.x = x * this.a + y * this.c + this.tx;
        pt.y = x * this.b + y * this.d + this.ty;
        return pt
    };
    p.decompose = function(target) {
        if (target == null) target = {};
        target.x = this.tx;
        target.y = this.ty;
        target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
        target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var skewX = Math.atan2(-this.c, this.d);
        var skewY = Math.atan2(this.b, this.a);
        if (skewX == skewY) {
            target.rotation = skewY / Matrix2D.DEG_TO_RAD;
            if (this.a < 0 && this.d >= 0) target.rotation += target.rotation <= 0 ? 180 : -180;
            target.skewX = target.skewY = 0
        } else {
            target.skewX = skewX / Matrix2D.DEG_TO_RAD;
            target.skewY = skewY / Matrix2D.DEG_TO_RAD
        }
        return target
    };
    p.reinitialize = function(a, b, c, d, tx, ty, alpha, shadow, compositeOperation) {
        this.initialize(a, b, c, d, tx, ty);
        this.alpha = alpha == null ? 1 : alpha;
        this.shadow = shadow;
        this.compositeOperation = compositeOperation;
        return this
    };
    p.copy = function(matrix) {
        return this.reinitialize(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty, matrix.alpha, matrix.shadow, matrix.compositeOperation)
    };
    p.appendProperties = function(alpha, shadow, compositeOperation) {
        this.alpha *= alpha;
        this.shadow = shadow || this.shadow;
        this.compositeOperation = compositeOperation || this.compositeOperation;
        return this
    };
    p.prependProperties = function(alpha, shadow, compositeOperation) {
        this.alpha *= alpha;
        this.shadow = this.shadow || shadow;
        this.compositeOperation = this.compositeOperation || compositeOperation;
        return this
    };
    p.clone = function() {
        return (new Matrix2D).copy(this)
    };
    p.toString = function() {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    };
    Matrix2D.identity = new Matrix2D;
    createjs.Matrix2D = Matrix2D
})();
this.createjs = this.createjs || {};
(function() {
    var Point = function(x, y) {
        this.initialize(x, y)
    };
    var p = Point.prototype;
    p.x = 0;
    p.y = 0;
    p.initialize = function(x, y) {
        this.x = x == null ? 0 : x;
        this.y = y == null ? 0 : y;
        return this
    };
    p.copy = function(point) {
        return this.initialize(point.x, point.y)
    };
    p.clone = function() {
        return new Point(this.x, this.y)
    };
    p.toString = function() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
    };
    createjs.Point = Point
})();
this.createjs = this.createjs || {};
(function() {
    var Rectangle = function(x, y, width, height) {
        this.initialize(x, y, width, height)
    };
    var p = Rectangle.prototype;
    p.x = 0;
    p.y = 0;
    p.width = 0;
    p.height = 0;
    p.initialize = function(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        return this
    };
    p.copy = function(rectangle) {
        return this.initialize(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
    };
    p.clone = function() {
        return new Rectangle(this.x, this.y, this.width, this.height)
    };
    p.toString = function() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
    };
    createjs.Rectangle = Rectangle
})();
this.createjs = this.createjs || {};
(function() {
    var ButtonHelper = function(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
        this.initialize(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel)
    };
    var p = ButtonHelper.prototype;
    p.target = null;
    p.overLabel = null;
    p.outLabel = null;
    p.downLabel = null;
    p.play = false;
    p._isPressed = false;
    p._isOver = false;
    p.initialize = function(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
        if (!target.addEventListener) return;
        this.target = target;
        target.cursor = "pointer";
        this.overLabel = overLabel == null ? "over" : overLabel;
        this.outLabel = outLabel == null ? "out" : outLabel;
        this.downLabel = downLabel == null ? "down" : downLabel;
        this.play = play;
        this.setEnabled(true);
        this.handleEvent({});
        if (hitArea) {
            if (hitLabel) {
                hitArea.actionsEnabled = false;
                hitArea.gotoAndStop && hitArea.gotoAndStop(hitLabel)
            }
            target.hitArea = hitArea
        }
    };
    p.setEnabled = function(value) {
        var o = this.target;
        if (value) {
            o.addEventListener("rollover", this);
            o.addEventListener("rollout", this);
            o.addEventListener("mousedown", this);
            o.addEventListener("pressup", this)
        } else {
            o.removeEventListener("rollover", this);
            o.removeEventListener("rollout", this);
            o.removeEventListener("mousedown", this);
            o.removeEventListener("pressup", this)
        }
    };
    p.toString = function() {
        return "[ButtonHelper]"
    };
    p.handleEvent = function(evt) {
        var label, t = this.target,
            type = evt.type;
        if (type == "mousedown") {
            this._isPressed = true;
            label = this.downLabel
        } else if (type == "pressup") {
            this._isPressed = false;
            label = this._isOver ? this.overLabel : this.outLabel
        } else if (type == "rollover") {
            this._isOver = true;
            label = this._isPressed ? this.downLabel : this.overLabel
        } else {
            this._isOver = false;
            label = this._isPressed ? this.overLabel : this.outLabel
        }
        if (this.play) t.gotoAndPlay && t.gotoAndPlay(label);
        else t.gotoAndStop && t.gotoAndStop(label)
    };
    createjs.ButtonHelper = ButtonHelper
})();
this.createjs = this.createjs || {};
(function() {
    var Shadow = function(color, offsetX, offsetY, blur) {
        this.initialize(color, offsetX, offsetY, blur)
    };
    var p = Shadow.prototype;
    Shadow.identity = null;
    p.color = null;
    p.offsetX = 0;
    p.offsetY = 0;
    p.blur = 0;
    p.initialize = function(color, offsetX, offsetY, blur) {
        this.color = color;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.blur = blur
    };
    p.toString = function() {
        return "[Shadow]"
    };
    p.clone = function() {
        return new Shadow(this.color, this.offsetX, this.offsetY, this.blur)
    };
    Shadow.identity = new Shadow("transparent", 0, 0, 0);
    createjs.Shadow = Shadow
})();
this.createjs = this.createjs || {};
(function() {
    var SpriteSheet = function(data) {
        this.initialize(data)
    };
    var p = SpriteSheet.prototype = new createjs.EventDispatcher;
    p.complete = true;
    p.framerate = 0;
    p._animations = null;
    p._frames = null;
    p._images = null;
    p._data = null;
    p._loadCount = 0;
    p._frameHeight = 0;
    p._frameWidth = 0;
    p._numFrames = 0;
    p._regX = 0;
    p._regY = 0;
    p.initialize = function(data) {
        var i, l, o, a;
        if (data == null) return;
        this.framerate = data.framerate || 0;
        if (data.images && (l = data.images.length) > 0) {
            a = this._images = [];
            for (i = 0; i < l; i++) {
                var img = data.images[i];
                if (typeof img == "string") {
                    var src = img;
                    img = document.createElement("img");
                    img.src = src
                }
                a.push(img);
                if (!img.getContext && !img.complete) {
                    this._loadCount++;
                    this.complete = false;
                    (function(o) {
                        img.onload = function() {
                            o._handleImageLoad()
                        }
                    })(this)
                }
            }
        }
        if (data.frames == null);
        else if (data.frames instanceof Array) {
            this._frames = [];
            a = data.frames;
            for (i = 0, l = a.length; i < l; i++) {
                var arr = a[i];
                this._frames.push({
                    image: this._images[arr[4] ? arr[4] : 0],
                    rect: new createjs.Rectangle(arr[0], arr[1], arr[2], arr[3]),
                    regX: arr[5] || 0,
                    regY: arr[6] || 0
                })
            }
        } else {
            o = data.frames;
            this._frameWidth = o.width;
            this._frameHeight = o.height;
            this._regX = o.regX || 0;
            this._regY = o.regY || 0;
            this._numFrames = o.count;
            if (this._loadCount == 0) this._calculateFrames()
        }
        this._animations = [];
        if ((o = data.animations) != null) {
            this._data = {};
            var name;
            for (name in o) {
                var anim = {
                    name: name
                };
                var obj = o[name];
                if (typeof obj == "number") a = anim.frames = [obj];
                else if (obj instanceof Array) if (obj.length == 1) anim.frames = [obj[0]];
                else {
                    anim.speed = obj[3];
                    anim.next = obj[2];
                    a = anim.frames = [];
                    for (i = obj[0]; i <= obj[1]; i++) a.push(i)
                } else {
                    anim.speed = obj.speed;
                    anim.next = obj.next;
                    var frames = obj.frames;
                    a = anim.frames = typeof frames == "number" ? [frames] : frames.slice(0)
                }
                if (anim.next === true || anim.next === undefined) anim.next = name;
                if (anim.next === false || a.length < 2 && anim.next == name) anim.next = null;
                if (!anim.speed) anim.speed = 1;
                this._animations.push(name);
                this._data[name] = anim
            }
        }
    };
    p.getNumFrames = function(animation) {
        if (animation == null) return this._frames ? this._frames.length : this._numFrames;
        else {
            var data = this._data[animation];
            if (data == null) return 0;
            else return data.frames.length
        }
    };
    p.getAnimations = function() {
        return this._animations.slice(0)
    };
    p.getAnimation = function(name) {
        return this._data[name]
    };
    p.getFrame = function(frameIndex) {
        var frame;
        if (this._frames && (frame = this._frames[frameIndex])) return frame;
        return null
    };
    p.getFrameBounds = function(frameIndex, rectangle) {
        var frame = this.getFrame(frameIndex);
        return frame ? (rectangle || new createjs.Rectangle).initialize(-frame.regX, -frame.regY, frame.rect.width, frame.rect.height) : null
    };
    p.toString = function() {
        return "[SpriteSheet]"
    };
    p.clone = function() {
        var o = new SpriteSheet;
        o.complete = this.complete;
        o._animations = this._animations;
        o._frames = this._frames;
        o._images = this._images;
        o._data = this._data;
        o._frameHeight = this._frameHeight;
        o._frameWidth = this._frameWidth;
        o._numFrames = this._numFrames;
        o._loadCount = this._loadCount;
        return o
    };
    p._handleImageLoad = function() {
        if (--this._loadCount == 0) {
            this._calculateFrames();
            this.complete = true;
            this.dispatchEvent("complete")
        }
    };
    p._calculateFrames = function() {
        if (this._frames || this._frameWidth == 0) return;
        this._frames = [];
        var ttlFrames = 0;
        var fw = this._frameWidth;
        var fh = this._frameHeight;
        for (var i = 0, imgs = this._images; i < imgs.length; i++) {
            var img = imgs[i];
            var cols = (img.width + 1) / fw | 0;
            var rows = (img.height + 1) / fh | 0;
            var ttl = this._numFrames > 0 ? Math.min(this._numFrames - ttlFrames, cols * rows) : cols * rows;
            for (var j = 0; j < ttl; j++) this._frames.push({
                image: img,
                rect: new createjs.Rectangle(j % cols * fw, (j / cols | 0) * fh, fw, fh),
                regX: this._regX,
                regY: this._regY
            });
            ttlFrames += ttl
        }
        this._numFrames = ttlFrames
    };
    createjs.SpriteSheet = SpriteSheet
})();
this.createjs = this.createjs || {};
(function() {
    function Command(f, params, path) {
        this.f = f;
        this.params = params;
        this.path = path == null ? true : path
    }
    Command.prototype.exec = function(scope) {
        this.f.apply(scope, this.params)
    };
    var Graphics = function() {
        this.initialize()
    };
    var p = Graphics.prototype;
    Graphics.getRGB = function(r, g, b, alpha) {
        if (r != null && b == null) {
            alpha = g;
            b = r & 255;
            g = r >> 8 & 255;
            r = r >> 16 & 255
        }
        if (alpha == null) return "rgb(" + r + "," + g + "," + b + ")";
        else return "rgba(" + r + "," + g + "," + b + "," + alpha + ")"
    };
    Graphics.getHSL = function(hue, saturation, lightness, alpha) {
        if (alpha == null) return "hsl(" + hue % 360 + "," + saturation + "%," + lightness + "%)";
        else return "hsla(" + hue % 360 + "," + saturation + "%," + lightness + "%," + alpha + ")"
    };
    Graphics.Command = Command;
    Graphics.BASE_64 = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "E": 4,
        "F": 5,
        "G": 6,
        "H": 7,
        "I": 8,
        "J": 9,
        "K": 10,
        "L": 11,
        "M": 12,
        "N": 13,
        "O": 14,
        "P": 15,
        "Q": 16,
        "R": 17,
        "S": 18,
        "T": 19,
        "U": 20,
        "V": 21,
        "W": 22,
        "X": 23,
        "Y": 24,
        "Z": 25,
        "a": 26,
        "b": 27,
        "c": 28,
        "d": 29,
        "e": 30,
        "f": 31,
        "g": 32,
        "h": 33,
        "i": 34,
        "j": 35,
        "k": 36,
        "l": 37,
        "m": 38,
        "n": 39,
        "o": 40,
        "p": 41,
        "q": 42,
        "r": 43,
        "s": 44,
        "t": 45,
        "u": 46,
        "v": 47,
        "w": 48,
        "x": 49,
        "y": 50,
        "z": 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63
    };
    Graphics.STROKE_CAPS_MAP = ["butt", "round", "square"];
    Graphics.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
    var canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    if (canvas.getContext) {
        var ctx = Graphics._ctx = canvas.getContext("2d");
        Graphics.beginCmd = new Command(ctx.beginPath, [], false);
        Graphics.fillCmd = new Command(ctx.fill, [], false);
        Graphics.strokeCmd = new Command(ctx.stroke, [], false);
        canvas.width = canvas.height = 1
    }
    p._strokeInstructions = null;
    p._strokeStyleInstructions = null;
    p._strokeIgnoreScale = false;
    p._fillInstructions = null;
    p._fillMatrix = null;
    p._instructions = null;
    p._oldInstructions = null;
    p._activeInstructions = null;
    p._active = false;
    p._dirty = false;
    p.initialize = function() {
        this.clear();
        this._ctx = Graphics._ctx
    };
    p.isEmpty = function() {
        return !(this._instructions.length || (this._oldInstructions.length || this._activeInstructions.length))
    };
    p.draw = function(ctx) {
        if (this._dirty) this._updateInstructions();
        var instr = this._instructions;
        for (var i = 0, l = instr.length; i < l; i++) instr[i].exec(ctx)
    };
    p.drawAsPath = function(ctx) {
        if (this._dirty) this._updateInstructions();
        var instr, instrs = this._instructions;
        for (var i = 0, l = instrs.length; i < l; i++) if ((instr = instrs[i]).path || i == 0) instr.exec(ctx)
    };
    p.moveTo = function(x, y) {
        this._activeInstructions.push(new Command(this._ctx.moveTo, [x, y]));
        return this
    };
    p.lineTo = function(x, y) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new Command(this._ctx.lineTo, [x, y]));
        return this
    };
    p.arcTo = function(x1, y1, x2, y2, radius) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new Command(this._ctx.arcTo, [x1, y1, x2, y2, radius]));
        return this
    };
    p.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
        this._dirty = this._active = true;
        if (anticlockwise == null) anticlockwise = false;
        this._activeInstructions.push(new Command(this._ctx.arc, [x, y, radius, startAngle, endAngle, anticlockwise]));
        return this
    };
    p.quadraticCurveTo = function(cpx, cpy, x, y) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new Command(this._ctx.quadraticCurveTo, [cpx, cpy, x, y]));
        return this
    };
    p.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new Command(this._ctx.bezierCurveTo, [cp1x, cp1y, cp2x, cp2y, x, y]));
        return this
    };
    p.rect = function(x, y, w, h) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new Command(this._ctx.rect, [x, y, w, h]));
        return this
    };
    p.closePath = function() {
        if (this._active) {
            this._dirty = true;
            this._activeInstructions.push(new Command(this._ctx.closePath, []))
        }
        return this
    };
    p.clear = function() {
        this._instructions = [];
        this._oldInstructions = [];
        this._activeInstructions = [];
        this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = this._fillMatrix = null;
        this._active = this._dirty = this._strokeIgnoreScale = false;
        return this
    };
    p.beginFill = function(color) {
        if (this._active) this._newPath();
        this._fillInstructions = color ? [new Command(this._setProp, ["fillStyle", color], false)] : null;
        this._fillMatrix = null;
        return this
    };
    p.beginLinearGradientFill = function(colors, ratios, x0, y0, x1, y1) {
        if (this._active) this._newPath();
        var o = this._ctx.createLinearGradient(x0, y0, x1, y1);
        for (var i = 0, l = colors.length; i < l; i++) o.addColorStop(ratios[i], colors[i]);
        this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
        this._fillMatrix = null;
        return this
    };
    p.beginRadialGradientFill = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
        if (this._active) this._newPath();
        var o = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (var i = 0, l = colors.length; i < l; i++) o.addColorStop(ratios[i], colors[i]);
        this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
        this._fillMatrix = null;
        return this
    };
    p.beginBitmapFill = function(image, repetition, matrix) {
        if (this._active) this._newPath();
        repetition = repetition || "";
        var o = this._ctx.createPattern(image, repetition);
        this._fillInstructions = [new Command(this._setProp, ["fillStyle", o], false)];
        this._fillMatrix = matrix ? [matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty] : null;
        return this
    };
    p.endFill = function() {
        return this.beginFill()
    };
    p.setStrokeStyle = function(thickness, caps, joints, miterLimit, ignoreScale) {
        if (this._active) this._newPath();
        this._strokeStyleInstructions = [new Command(this._setProp, ["lineWidth", thickness == null ? "1" : thickness], false), new Command(this._setProp, ["lineCap", caps == null ? "butt" : isNaN(caps) ? caps : Graphics.STROKE_CAPS_MAP[caps]], false), new Command(this._setProp, ["lineJoin", joints == null ? "miter" : isNaN(joints) ? joints : Graphics.STROKE_JOINTS_MAP[joints]], false), new Command(this._setProp, ["miterLimit", miterLimit == null ? "10" : miterLimit], false)];
        this._strokeIgnoreScale = ignoreScale;
        return this
    };
    p.beginStroke = function(color) {
        if (this._active) this._newPath();
        this._strokeInstructions = color ? [new Command(this._setProp, ["strokeStyle", color], false)] : null;
        return this
    };
    p.beginLinearGradientStroke = function(colors, ratios, x0, y0, x1, y1) {
        if (this._active) this._newPath();
        var o = this._ctx.createLinearGradient(x0, y0, x1, y1);
        for (var i = 0, l = colors.length; i < l; i++) o.addColorStop(ratios[i], colors[i]);
        this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
        return this
    };
    p.beginRadialGradientStroke = function(colors, ratios, x0, y0, r0, x1, y1, r1) {
        if (this._active) this._newPath();
        var o = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (var i = 0, l = colors.length; i < l; i++) o.addColorStop(ratios[i], colors[i]);
        this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
        return this
    };
    p.beginBitmapStroke = function(image, repetition) {
        if (this._active) this._newPath();
        repetition = repetition || "";
        var o = this._ctx.createPattern(image, repetition);
        this._strokeInstructions = [new Command(this._setProp, ["strokeStyle", o], false)];
        return this
    };
    p.endStroke = function() {
        this.beginStroke();
        return this
    };
    p.curveTo = p.quadraticCurveTo;
    p.drawRect = p.rect;
    p.drawRoundRect = function(x, y, w, h, radius) {
        this.drawRoundRectComplex(x, y, w, h, radius, radius, radius, radius);
        return this
    };
    p.drawRoundRectComplex = function(x, y, w, h, radiusTL, radiusTR, radiusBR, radiusBL) {
        var max = (w < h ? w : h) / 2;
        var mTL = 0,
            mTR = 0,
            mBR = 0,
            mBL = 0;
        if (radiusTL < 0) radiusTL *= mTL = -1;
        if (radiusTL > max) radiusTL = max;
        if (radiusTR < 0) radiusTR *= mTR = -1;
        if (radiusTR > max) radiusTR = max;
        if (radiusBR < 0) radiusBR *= mBR = -1;
        if (radiusBR > max) radiusBR = max;
        if (radiusBL < 0) radiusBL *= mBL = -1;
        if (radiusBL > max) radiusBL = max;
        this._dirty = this._active = true;
        var arcTo = this._ctx.arcTo,
            lineTo = this._ctx.lineTo;
        this._activeInstructions.push(new Command(this._ctx.moveTo, [x + w - radiusTR, y]), new Command(arcTo, [x + w + radiusTR * mTR, y - radiusTR * mTR, x + w, y + radiusTR, radiusTR]), new Command(lineTo, [x + w, y + h - radiusBR]), new Command(arcTo, [x + w + radiusBR * mBR, y + h + radiusBR * mBR, x + w - radiusBR, y + h, radiusBR]), new Command(lineTo, [x + radiusBL, y + h]), new Command(arcTo, [x - radiusBL * mBL, y + h + radiusBL * mBL, x, y + h - radiusBL, radiusBL]), new Command(lineTo, [x, y + radiusTL]), new Command(arcTo, [x - radiusTL * mTL, y - radiusTL * mTL, x + radiusTL, y, radiusTL]), new Command(this._ctx.closePath));
        return this
    };
    p.drawCircle = function(x, y, radius) {
        this.arc(x, y, radius, 0, Math.PI * 2);
        return this
    };
    p.drawEllipse = function(x, y, w, h) {
        this._dirty = this._active = true;
        var k = 0.5522848;
        var ox = w / 2 * k;
        var oy = h / 2 * k;
        var xe = x + w;
        var ye = y + h;
        var xm = x + w / 2;
        var ym = y + h / 2;
        this._activeInstructions.push(new Command(this._ctx.moveTo, [x, ym]), new Command(this._ctx.bezierCurveTo, [x, ym - oy, xm - ox, y, xm, y]), new Command(this._ctx.bezierCurveTo, [xm + ox, y, xe, ym - oy, xe, ym]), new Command(this._ctx.bezierCurveTo, [xe, ym + oy, xm + ox, ye, xm, ye]), new Command(this._ctx.bezierCurveTo, [xm - ox, ye, x, ym + oy, x, ym]));
        return this
    };
    p.inject = function(callback, data) {
        this._dirty = this._active = true;
        this._activeInstructions.push(new Command(callback, [data]));
        return this
    };
    p.drawPolyStar = function(x, y, radius, sides, pointSize, angle) {
        this._dirty = this._active = true;
        if (pointSize == null) pointSize = 0;
        pointSize = 1 - pointSize;
        if (angle == null) angle = 0;
        else angle /= 180 / Math.PI;
        var a = Math.PI / sides;
        this._activeInstructions.push(new Command(this._ctx.moveTo, [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius]));
        for (var i = 0; i < sides; i++) {
            angle += a;
            if (pointSize != 1) this._activeInstructions.push(new Command(this._ctx.lineTo, [x + Math.cos(angle) * radius * pointSize, y + Math.sin(angle) * radius * pointSize]));
            angle += a;
            this._activeInstructions.push(new Command(this._ctx.lineTo, [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius]))
        }
        return this
    };
    p.decodePath = function(str) {
        var instructions = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath];
        var paramCount = [2, 2, 4, 6, 0];
        var i = 0,
            l = str.length;
        var params = [];
        var x = 0,
            y = 0;
        var base64 = Graphics.BASE_64;
        while (i < l) {
            var c = str.charAt(i);
            var n = base64[c];
            var fi = n >> 3;
            var f = instructions[fi];
            if (!f || n & 3) throw "bad path data (@" + i + "): " + c;
            var pl = paramCount[fi];
            if (!fi) x = y = 0;
            params.length = 0;
            i++;
            var charCount = (n >> 2 & 1) + 2;
            for (var p = 0; p < pl; p++) {
                var num = base64[str.charAt(i)];
                var sign = num >> 5 ? -1 : 1;
                num = (num & 31) << 6 | base64[str.charAt(i + 1)];
                if (charCount == 3) num = num << 6 | base64[str.charAt(i + 2)];
                num = sign * num / 10;
                if (p % 2) x = num += x;
                else y = num += y;
                params[p] = num;
                i += charCount
            }
            f.apply(this, params)
        }
        return this
    };
    p.clone = function() {
        var o = new Graphics;
        o._instructions = this._instructions.slice();
        o._activeInstructions = this._activeInstructions.slice();
        o._oldInstructions = this._oldInstructions.slice();
        if (this._fillInstructions) o._fillInstructions = this._fillInstructions.slice();
        if (this._strokeInstructions) o._strokeInstructions = this._strokeInstructions.slice();
        if (this._strokeStyleInstructions) o._strokeStyleInstructions = this._strokeStyleInstructions.slice();
        o._active = this._active;
        o._dirty = this._dirty;
        o._fillMatrix = this._fillMatrix;
        o._strokeIgnoreScale = this._strokeIgnoreScale;
        return o
    };
    p.toString = function() {
        return "[Graphics]"
    };
    p.mt = p.moveTo;
    p.lt = p.lineTo;
    p.at = p.arcTo;
    p.bt = p.bezierCurveTo;
    p.qt = p.quadraticCurveTo;
    p.a = p.arc;
    p.r = p.rect;
    p.cp = p.closePath;
    p.c = p.clear;
    p.f = p.beginFill;
    p.lf = p.beginLinearGradientFill;
    p.rf = p.beginRadialGradientFill;
    p.bf = p.beginBitmapFill;
    p.ef = p.endFill;
    p.ss = p.setStrokeStyle;
    p.s = p.beginStroke;
    p.ls = p.beginLinearGradientStroke;
    p.rs = p.beginRadialGradientStroke;
    p.bs = p.beginBitmapStroke;
    p.es = p.endStroke;
    p.dr = p.drawRect;
    p.rr = p.drawRoundRect;
    p.rc = p.drawRoundRectComplex;
    p.dc = p.drawCircle;
    p.de = p.drawEllipse;
    p.dp = p.drawPolyStar;
    p.p = p.decodePath;
    p._updateInstructions = function() {
        this._instructions = this._oldInstructions.slice();
        this._instructions.push(Graphics.beginCmd);
        this._appendInstructions(this._fillInstructions);
        this._appendInstructions(this._strokeInstructions);
        this._appendInstructions(this._strokeInstructions && this._strokeStyleInstructions);
        this._appendInstructions(this._activeInstructions);
        if (this._fillInstructions) this._appendDraw(Graphics.fillCmd, this._fillMatrix);
        if (this._strokeInstructions) this._appendDraw(Graphics.strokeCmd, this._strokeIgnoreScale && [1, 0, 0, 1, 0, 0])
    };
    p._appendInstructions = function(instructions) {
        if (instructions) this._instructions.push.apply(this._instructions, instructions)
    };
    p._appendDraw = function(command, matrixArr) {
        if (!matrixArr) this._instructions.push(command);
        else this._instructions.push(new Command(this._ctx.save, [], false), new Command(this._ctx.transform, matrixArr, false), command, new Command(this._ctx.restore, [], false))
    };
    p._newPath = function() {
        if (this._dirty) this._updateInstructions();
        this._oldInstructions = this._instructions;
        this._activeInstructions = [];
        this._active = this._dirty = false
    };
    p._setProp = function(name, value) {
        this[name] = value
    };
    createjs.Graphics = Graphics
})();
this.createjs = this.createjs || {};
(function() {
    var DisplayObject = function() {
        this.initialize()
    };
    var p = DisplayObject.prototype = new createjs.EventDispatcher;
    DisplayObject.suppressCrossDomainErrors = false;
    var canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    if (canvas.getContext) {
        DisplayObject._hitTestCanvas = canvas;
        DisplayObject._hitTestContext = canvas.getContext("2d");
        canvas.width = canvas.height = 1
    }
    DisplayObject._nextCacheID = 1;
    p.alpha = 1;
    p.cacheCanvas = null;
    p.id = -1;
    p.mouseEnabled = true;
    p.name = null;
    p.parent = null;
    p.regX = 0;
    p.regY = 0;
    p.rotation = 0;
    p.scaleX = 1;
    p.scaleY = 1;
    p.skewX = 0;
    p.skewY = 0;
    p.shadow = null;
    p.visible = true;
    p.x = 0;
    p.y = 0;
    p.compositeOperation = null;
    p.snapToPixel = false;
    p.filters = null;
    p.cacheID = 0;
    p.mask = null;
    p.hitArea = null;
    p.cursor = null;
    p._cacheOffsetX = 0;
    p._cacheOffsetY = 0;
    p._cacheScale = 1;
    p._cacheDataURLID = 0;
    p._cacheDataURL = null;
    p._matrix = null;
    p._rectangle = null;
    p._bounds = null;
    p.initialize = function() {
        this.id = createjs.UID.get();
        this._matrix = new createjs.Matrix2D;
        this._rectangle = new createjs.Rectangle
    };
    p.isVisible = function() {
        return !!(this.visible && (this.alpha > 0 && (this.scaleX != 0 && this.scaleY != 0)))
    };
    p.draw = function(ctx, ignoreCache) {
        var cacheCanvas = this.cacheCanvas;
        if (ignoreCache || !cacheCanvas) return false;
        var scale = this._cacheScale,
            offX = this._cacheOffsetX,
            offY = this._cacheOffsetY,
            fBounds;
        if (fBounds = this._applyFilterBounds(offX, offY, 0, 0)) {
            offX = fBounds.x;
            offY = fBounds.y
        }
        ctx.drawImage(cacheCanvas, offX, offY, cacheCanvas.width / scale, cacheCanvas.height / scale);
        return true
    };
    p.updateContext = function(ctx) {
        var mtx, mask = this.mask,
            o = this;
        if (mask && (mask.graphics && !mask.graphics.isEmpty())) {
            mtx = mask.getMatrix(mask._matrix);
            ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
            mask.graphics.drawAsPath(ctx);
            ctx.clip();
            mtx.invert();
            ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty)
        }
        mtx = o._matrix.identity().appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY);
        if (createjs["Stage"]._snapToPixelEnabled && o.snapToPixel) ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx + 0.5 | 0, mtx.ty + 0.5 | 0);
        else ctx.transform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        ctx.globalAlpha *= o.alpha;
        if (o.compositeOperation) ctx.globalCompositeOperation = o.compositeOperation;
        if (o.shadow) this._applyShadow(ctx, o.shadow)
    };
    p.cache = function(x, y, width, height, scale) {
        scale = scale || 1;
        if (!this.cacheCanvas) this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        this._cacheWidth = width;
        this._cacheHeight = height;
        this._cacheOffsetX = x;
        this._cacheOffsetY = y;
        this._cacheScale = scale;
        this.updateCache()
    };
    p.updateCache = function(compositeOperation) {
        var cacheCanvas = this.cacheCanvas,
            scale = this._cacheScale,
            offX = this._cacheOffsetX * scale,
            offY = this._cacheOffsetY * scale;
        var w = this._cacheWidth,
            h = this._cacheHeight,
            fBounds;
        if (!cacheCanvas) throw "cache() must be called before updateCache()";
        var ctx = cacheCanvas.getContext("2d");
        if (fBounds = this._applyFilterBounds(offX, offY, w, h)) {
            offX = fBounds.x;
            offY = fBounds.y;
            w = fBounds.width;
            h = fBounds.height
        }
        w = Math.ceil(w * scale);
        h = Math.ceil(h * scale);
        if (w != cacheCanvas.width || h != cacheCanvas.height) {
            cacheCanvas.width = w;
            cacheCanvas.height = h
        } else if (!compositeOperation) ctx.clearRect(0, 0, w + 1, h + 1);
        ctx.save();
        ctx.globalCompositeOperation = compositeOperation;
        ctx.setTransform(scale, 0, 0, scale, -offX, -offY);
        this.draw(ctx, true);
        this._applyFilters();
        ctx.restore();
        this.cacheID = DisplayObject._nextCacheID++
    };
    p.uncache = function() {
        this._cacheDataURL = this.cacheCanvas = null;
        this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
        this._cacheScale = 1
    };
    p.getCacheDataURL = function() {
        if (!this.cacheCanvas) return null;
        if (this.cacheID != this._cacheDataURLID) this._cacheDataURL = this.cacheCanvas.toDataURL();
        return this._cacheDataURL
    };
    p.getStage = function() {
        var o = this;
        while (o.parent) o = o.parent;
        if (o instanceof createjs["Stage"]) return o;
        return null
    };
    p.localToGlobal = function(x, y) {
        var mtx = this.getConcatenatedMatrix(this._matrix);
        if (mtx == null) return null;
        mtx.append(1, 0, 0, 1, x, y);
        return new createjs.Point(mtx.tx, mtx.ty)
    };
    p.globalToLocal = function(x, y) {
        var mtx = this.getConcatenatedMatrix(this._matrix);
        if (mtx == null) return null;
        mtx.invert();
        mtx.append(1, 0, 0, 1, x, y);
        return new createjs.Point(mtx.tx, mtx.ty)
    };
    p.localToLocal = function(x, y, target) {
        var pt = this.localToGlobal(x, y);
        return target.globalToLocal(pt.x, pt.y)
    };
    p.setTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
        this.x = x || 0;
        this.y = y || 0;
        this.scaleX = scaleX == null ? 1 : scaleX;
        this.scaleY = scaleY == null ? 1 : scaleY;
        this.rotation = rotation || 0;
        this.skewX = skewX || 0;
        this.skewY = skewY || 0;
        this.regX = regX || 0;
        this.regY = regY || 0;
        return this
    };
    p.getMatrix = function(matrix) {
        var o = this;
        return (matrix ? matrix.identity() : new createjs.Matrix2D).appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).appendProperties(o.alpha, o.shadow, o.compositeOperation)
    };
    p.getConcatenatedMatrix = function(matrix) {
        if (matrix) matrix.identity();
        else matrix = new createjs.Matrix2D;
        var o = this;
        while (o != null) {
            matrix.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY).prependProperties(o.alpha, o.shadow, o.compositeOperation);
            o = o.parent
        }
        return matrix
    };
    p.hitTest = function(x, y) {
        var ctx = DisplayObject._hitTestContext;
        ctx.setTransform(1, 0, 0, 1, -x, -y);
        this.draw(ctx);
        var hit = this._testHit(ctx);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 2, 2);
        return hit
    };
    p.set = function(props) {
        for (var n in props) this[n] = props[n];
        return this
    };
    p.getBounds = function() {
        if (this._bounds) return this._rectangle.copy(this._bounds);
        var cacheCanvas = this.cacheCanvas;
        if (cacheCanvas) {
            var scale = this._cacheScale;
            return this._rectangle.initialize(this._cacheOffsetX, this._cacheOffsetY, cacheCanvas.width / scale, cacheCanvas.height / scale)
        }
        return null
    };
    p.getTransformedBounds = function() {
        return this._getBounds()
    };
    p.setBounds = function(x, y, width, height) {
        if (x == null) this._bounds = x;
        this._bounds = (this._bounds || new createjs.Rectangle).initialize(x, y, width, height)
    };
    p.clone = function() {
        var o = new DisplayObject;
        this.cloneProps(o);
        return o
    };
    p.toString = function() {
        return "[DisplayObject (name=" + this.name + ")]"
    };
    p.cloneProps = function(o) {
        o.alpha = this.alpha;
        o.name = this.name;
        o.regX = this.regX;
        o.regY = this.regY;
        o.rotation = this.rotation;
        o.scaleX = this.scaleX;
        o.scaleY = this.scaleY;
        o.shadow = this.shadow;
        o.skewX = this.skewX;
        o.skewY = this.skewY;
        o.visible = this.visible;
        o.x = this.x;
        o.y = this.y;
        o._bounds = this._bounds;
        o.mouseEnabled = this.mouseEnabled;
        o.compositeOperation = this.compositeOperation
    };
    p._applyShadow = function(ctx, shadow) {
        shadow = shadow || Shadow.identity;
        ctx.shadowColor = shadow.color;
        ctx.shadowOffsetX = shadow.offsetX;
        ctx.shadowOffsetY = shadow.offsetY;
        ctx.shadowBlur = shadow.blur
    };
    p._tick = function(params) {
        var ls = this._listeners;
        if (ls && ls["tick"]) {
            var evt = new createjs.Event("tick");
            evt.params = params;
            this._dispatchEvent(evt, this, 2)
        }
    };
    p._testHit = function(ctx) {
        try {
            var hit = ctx.getImageData(0, 0, 1, 1).data[3] > 1
        } catch (e) {
            if (!DisplayObject.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
        }
        return hit
    };
    p._applyFilters = function() {
        if (!this.filters || (this.filters.length == 0 || !this.cacheCanvas)) return;
        var l = this.filters.length;
        var ctx = this.cacheCanvas.getContext("2d");
        var w = this.cacheCanvas.width;
        var h = this.cacheCanvas.height;
        for (var i = 0; i < l; i++) this.filters[i].applyFilter(ctx, 0, 0, w, h)
    };
    p._applyFilterBounds = function(x, y, width, height) {
        var bounds, l, filters = this.filters;
        if (!filters || !(l = filters.length)) return;
        for (var i = 0; i < l; i++) {
            var f = this.filters[i];
            var fBounds = f.getBounds && f.getBounds();
            if (!fBounds) continue;
            if (!bounds) bounds = this._rectangle.initialize(x, y, width, height);
            bounds.x += fBounds.x;
            bounds.y += fBounds.y;
            bounds.width += fBounds.width;
            bounds.height += fBounds.height
        }
        return bounds
    };
    p._getBounds = function(matrix, ignoreTransform) {
        return this._transformBounds(this.getBounds(), matrix, ignoreTransform)
    };
    p._transformBounds = function(bounds, matrix, ignoreTransform) {
        if (!bounds) return bounds;
        var x = bounds.x,
            y = bounds.y,
            width = bounds.width,
            height = bounds.height;
        var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);
        if (x || y) mtx.appendTransform(0, 0, 1, 1, 0, 0, 0, -x, -y);
        if (matrix) mtx.prependMatrix(matrix);
        var x_a = width * mtx.a,
            x_b = width * mtx.b;
        var y_c = height * mtx.c,
            y_d = height * mtx.d;
        var tx = mtx.tx,
            ty = mtx.ty;
        var minX = tx,
            maxX = tx,
            minY = ty,
            maxY = ty;
        if ((x = x_a + tx) < minX) minX = x;
        else if (x > maxX) maxX = x;
        if ((x = x_a + y_c + tx) < minX) minX = x;
        else if (x > maxX) maxX = x;
        if ((x = y_c + tx) < minX) minX = x;
        else if (x > maxX) maxX = x;
        if ((y = x_b + ty) < minY) minY = y;
        else if (y > maxY) maxY = y;
        if ((y = x_b + y_d + ty) < minY) minY = y;
        else if (y > maxY) maxY = y;
        if ((y = y_d + ty) < minY) minY = y;
        else if (y > maxY) maxY = y;
        return bounds.initialize(minX, minY, maxX - minX, maxY - minY)
    };
    p.isRoot = false;
    p.bounding_box = null;
    p.isCheckMouseWithDraw = false;
    p.setBoundingBox = function(x, y, w, h) {
        return this.bounding_box = new createjs.Rectangle(x, y, w, h)
    };
    createjs.DisplayObject = DisplayObject
})();
this.createjs = this.createjs || {};
(function() {
    var Container = function() {
        this.initialize()
    };
    var p = Container.prototype = new createjs.DisplayObject;
    p.children = null;
    p.mouseChildren = true;
    p.DisplayObject_initialize = p.initialize;
    p.initialize = function() {
        this.DisplayObject_initialize();
        this.children = []
    };
    p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.children.length;
        return !!(this.visible && (this.alpha > 0 && (this.scaleX != 0 && (this.scaleY != 0 && hasContent))))
    };
    p.DisplayObject_draw = p.draw;
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) return true;
        var list = this.children.slice(0);
        for (var i = 0, l = list.length; i < l; i++) {
            var child = list[i];
            if (!child.isVisible()) continue;
            ctx.save();
            child.updateContext(ctx);
            child.draw(ctx);
            ctx.restore()
        }
        return true
    };
    p.addChild = function(child) {
        if (child == null) return child;
        var l = arguments.length;
        if (l > 1) {
            for (var i = 0; i < l; i++) this.addChild(arguments[i]);
            return arguments[l - 1]
        }
        if (child.parent) child.parent.removeChild(child);
        child.parent = this;
        this.children.push(child);
        return child
    };
    p.addChildAt = function(child, index) {
        var l = arguments.length;
        var indx = arguments[l - 1];
        if (indx < 0 || indx > this.children.length) return arguments[l - 2];
        if (l > 2) {
            for (var i = 0; i < l - 1; i++) this.addChildAt(arguments[i], indx + i);
            return arguments[l - 2]
        }
        if (child.parent) child.parent.removeChild(child);
        child.parent = this;
        this.children.splice(index, 0, child);
        return child
    };
    p.removeChild = function(child) {
        var l = arguments.length;
        if (l > 1) {
            var good = true;
            for (var i = 0; i < l; i++) good = good && this.removeChild(arguments[i]);
            return good
        }
        return this.removeChildAt(createjs.indexOf(this.children, child))
    };
    p.removeChildAt = function(index) {
        var l = arguments.length;
        if (l > 1) {
            var a = [];
            for (var i = 0; i < l; i++) a[i] = arguments[i];
            a.sort(function(a, b) {
                return b - a
            });
            var good = true;
            for (var i = 0; i < l; i++) good = good && this.removeChildAt(a[i]);
            return good
        }
        if (index < 0 || index > this.children.length - 1) return false;
        var child = this.children[index];
        if (child) child.parent = null;
        this.children.splice(index, 1);
        return true
    };
    p.removeAllChildren = function() {
        var kids = this.children;
        while (kids.length) kids.pop().parent = null
    };
    p.getChildAt = function(index) {
        return this.children[index]
    };
    p.getChildByName = function(name) {
        var kids = this.children;
        for (var i = 0, l = kids.length; i < l; i++) if (kids[i].name == name) return kids[i];
        return null
    };
    p.sortChildren = function(sortFunction) {
        this.children.sort(sortFunction)
    };
    p.getChildIndex = function(child) {
        return createjs.indexOf(this.children, child)
    };
    p.getNumChildren = function() {
        return this.children.length
    };
    p.swapChildrenAt = function(index1, index2) {
        var kids = this.children;
        var o1 = kids[index1];
        var o2 = kids[index2];
        if (!o1 || !o2) return;
        kids[index1] = o2;
        kids[index2] = o1
    };
    p.swapChildren = function(child1, child2) {
        var kids = this.children;
        var index1, index2;
        for (var i = 0, l = kids.length; i < l; i++) {
            if (kids[i] == child1) index1 = i;
            if (kids[i] == child2) index2 = i;
            if (index1 != null && index2 != null) break
        }
        if (i == l) return;
        kids[index1] = child2;
        kids[index2] = child1
    };
    p.setChildIndex = function(child, index) {
        var kids = this.children,
            l = kids.length;
        if (child.parent != this || (index < 0 || index >= l)) return;
        for (var i = 0; i < l; i++) if (kids[i] == child) break;
        if (i == l || i == index) return;
        kids.splice(i, 1);
        kids.splice(index, 0, child)
    };
    p.contains = function(child) {
        while (child) {
            if (child == this) return true;
            child = child.parent
        }
        return false
    };
    p.hitTest = function(x, y) {
        return this.getObjectUnderPoint(x, y) != null
    };
    p.getObjectsUnderPoint = function(x, y) {
        var arr = [];
        var pt = this.localToGlobal(x, y);
        this._getObjectsUnderPoint(pt.x, pt.y, arr);
        return arr
    };
    p.getObjectUnderPoint = function(x, y) {
        var pt = this.localToGlobal(x, y);
        return this._getObjectsUnderPoint(pt.x, pt.y)
    };
    p.DisplayObject_getBounds = p.getBounds;
    p.getBounds = function() {
        return this._getBounds(null, true)
    };
    p.getTransformedBounds = function() {
        return this._getBounds()
    };
    p.clone = function(recursive) {
        var o = new Container;
        this.cloneProps(o);
        if (recursive) {
            var arr = o.children = [];
            for (var i = 0, l = this.children.length; i < l; i++) {
                var clone = this.children[i].clone(recursive);
                clone.parent = o;
                arr.push(clone)
            }
        }
        return o
    };
    p.toString = function() {
        return "[Container (name=" + this.name + ")]"
    };
    p.DisplayObject__tick = p._tick;
    p._tick = function(params) {
        for (var i = this.children.length - 1; i >= 0; i--) {
            var child = this.children[i];
            if (child._tick) child._tick(params)
        }
        this.DisplayObject__tick(params)
    };
    p._getObjectsUnderPoint = function(x, y, arr, mouse) {
        var i, child;
        var l = this.children.length;
        if (!isDesktopBrowser) {
            var bb, match, result;
            for (i = l - 1; i >= 0; i--) {
                child = this.children[i];
                if (!child.visible || (!child.mouseEnabled || child.alpha <= 0)) continue;
                bb = child.bounding_box;
                if (bb) {
                    if (child.isRoot) match = child.x + bb.x <= x && x < child.x + bb.x + bb.width && (child.y + bb.y <= y && y < child.y + bb.y + bb.height);
                    else match = (child.x + bb.x) * scaleFactor <= x && x < scaleFactor * (child.x + bb.x + bb.width) && ((child.y + bb.y) * scaleFactor <= y && y < scaleFactor * (child.y + bb.y + bb.height));
                    if (match) if (arr) {
                        arr.push(child);
                        continue
                    } else return child
                } else if (child.isCheckMouseWithDraw) {
                    var ctx = createjs.DisplayObject._hitTestContext;
                    var mtx = this._matrix;
                    var hitArea = mouse && child.hitArea;
                    child.getConcatenatedMatrix(mtx);
                    if (hitArea) {
                        mtx.appendTransform(hitArea.x, hitArea.y, hitArea.scaleX, hitArea.scaleY, hitArea.rotation, hitArea.skewX, hitArea.skewY, hitArea.regX, hitArea.regY);
                        mtx.alpha = hitArea.alpha
                    }
                    ctx.globalAlpha = mtx.alpha;
                    ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx - x, mtx.ty - y);
                    (hitArea || child).draw(ctx);
                    if (!this._testHit(ctx)) continue;
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.clearRect(0, 0, 2, 2);
                    if (arr) arr.push(child);
                    else return mouse && !this.mouseChildren ? this : child
                }
                if (child instanceof Container) {
                    if (child.isRoot) result = child._getObjectsUnderPoint(x - (child.x + child.regX), y - (child.y + child.regY), arr, mouse);
                    else result = child._getObjectsUnderPoint(x - (child.x + child.regX) * scaleFactor, y - (child.y + child.regY) * scaleFactor, arr, mouse);
                    if (result) if (arr) {
                        arr.push(result);
                        continue
                    } else return result
                }
            }
            return null
        }
        var ctx = createjs.DisplayObject._hitTestContext;
        var mtx = this._matrix;
        for (i = l - 1; i >= 0; i--) {
            child = this.children[i];
            var hitArea = mouse && child.hitArea;
            if (!child.visible || (!hitArea && !child.isVisible() || mouse && !child.mouseEnabled)) continue;
            if (!hitArea && child instanceof Container) {
                var result = child._getObjectsUnderPoint(x, y, arr, mouse);
                if (!arr && result) return mouse && !this.mouseChildren ? this : result
            } else {
                child.getConcatenatedMatrix(mtx);
                if (hitArea) {
                    mtx.appendTransform(hitArea.x, hitArea.y, hitArea.scaleX, hitArea.scaleY, hitArea.rotation, hitArea.skewX, hitArea.skewY, hitArea.regX, hitArea.regY);
                    mtx.alpha = hitArea.alpha
                }
                ctx.globalAlpha = mtx.alpha;
                ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx - x, mtx.ty - y);
                (hitArea || child).draw(ctx);
                if (!this._testHit(ctx)) continue;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, 2, 2);
                if (arr) arr.push(child);
                else return mouse && !this.mouseChildren ? this : child
            }
        }
        return null
    };
    p._getBounds = function(matrix, ignoreTransform) {
        var bounds = this.DisplayObject_getBounds();
        if (bounds) return this._transformBounds(bounds, matrix, ignoreTransform);
        var minX, maxX, minY, maxY;
        var mtx = ignoreTransform ? this._matrix.identity() : this.getMatrix(this._matrix);
        if (matrix) mtx.prependMatrix(matrix);
        var l = this.children.length;
        for (var i = 0; i < l; i++) {
            var child = this.children[i];
            if (!child.visible || !(bounds = child._getBounds(mtx))) continue;
            var x1 = bounds.x,
                y1 = bounds.y,
                x2 = x1 + bounds.width,
                y2 = y1 + bounds.height;
            if (x1 < minX || minX == null) minX = x1;
            if (x2 > maxX || maxX == null) maxX = x2;
            if (y1 < minY || minY == null) minY = y1;
            if (y2 > maxY || maxY == null) maxY = y2
        }
        return maxX == null ? null : this._rectangle.initialize(minX, minY, maxX - minX, maxY - minY)
    };
    createjs.Container = Container
})();
this.createjs = this.createjs || {};
(function() {
    var Stage = function(canvas) {
        this.initialize(canvas)
    };
    var p = Stage.prototype = new createjs.Container;
    Stage._snapToPixelEnabled = false;
    p.autoClear = true;
    p.canvas = null;
    p.mouseX = 0;
    p.mouseY = 0;
    p.snapToPixelEnabled = false;
    p.mouseInBounds = false;
    p.tickOnUpdate = true;
    p.mouseMoveOutside = false;
    p.nextStage = null;
    p._pointerData = null;
    p._pointerCount = 0;
    p._primaryPointerID = null;
    p._mouseOverIntervalID = null;
    p.Container_initialize = p.initialize;
    p.initialize = function(canvas) {
        this.Container_initialize();
        this.canvas = typeof canvas == "string" ? document.getElementById(canvas) : canvas;
        this._pointerData = {};
        this.enableDOMEvents(true)
    };
    p.update = function(params) {
        if (!this.canvas) return;
        if (this.tickOnUpdate) {
            this.dispatchEvent("tickstart");
            this._tick(arguments.length ? arguments : null);
            this.dispatchEvent("tickend")
        }
        this.dispatchEvent("drawstart");
        Stage._snapToPixelEnabled = this.snapToPixelEnabled;
        if (this.autoClear) this.clear();
        var ctx = this.canvas.getContext("2d");
        ctx.save();
        this.updateContext(ctx);
        this.draw(ctx, false);
        ctx.restore();
        this.dispatchEvent("drawend")
    };
    p.handleEvent = function(evt) {
        if (evt.type == "tick") this.update(evt)
    };
    p.clear = function() {
        if (!this.canvas) return;
        var ctx = this.canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
    };
    p.toDataURL = function(backgroundColor, mimeType) {
        if (!mimeType) mimeType = "image/png";
        var ctx = this.canvas.getContext("2d");
        var w = this.canvas.width;
        var h = this.canvas.height;
        var data;
        if (backgroundColor) {
            data = ctx.getImageData(0, 0, w, h);
            var compositeOperation = ctx.globalCompositeOperation;
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, w, h)
        }
        var dataURL = this.canvas.toDataURL(mimeType);
        if (backgroundColor) {
            ctx.clearRect(0, 0, w + 1, h + 1);
            ctx.putImageData(data, 0, 0);
            ctx.globalCompositeOperation = compositeOperation
        }
        return dataURL
    };
    p.enableMouseOver = function(frequency) {
        if (this._mouseOverIntervalID) {
            clearInterval(this._mouseOverIntervalID);
            this._mouseOverIntervalID = null;
            if (frequency == 0) this._testMouseOver(true)
        }
        if (frequency == null) frequency = 20;
        else if (frequency <= 0) return;
        var o = this;
        this._mouseOverIntervalID = setInterval(function() {
            o._testMouseOver()
        }, 1E3 / Math.min(50, frequency))
    };
    p.enableDOMEvents = function(enable) {
        if (enable == null) enable = true;
        var n, o, ls = this._eventListeners;
        if (!enable && ls) {
            for (n in ls) {
                o = ls[n];
                o.t.removeEventListener(n, o.f, false)
            }
            this._eventListeners = null
        } else if (enable && (!ls && this.canvas)) {
            var t = window.addEventListener ? window : document;
            var _this = this;
            ls = this._eventListeners = {};
            ls["mouseup"] = {
                t: t,
                f: function(e) {
                    _this._handleMouseUp(e)
                }
            };
            ls["mousemove"] = {
                t: t,
                f: function(e) {
                    _this._handleMouseMove(e)
                }
            };
            ls["dblclick"] = {
                t: t,
                f: function(e) {
                    _this._handleDoubleClick(e)
                }
            };
            ls["mousedown"] = {
                t: this.canvas,
                f: function(e) {
                    _this._handleMouseDown(e)
                }
            };
            for (n in ls) {
                o = ls[n];
                o.t.addEventListener(n, o.f, false)
            }
        }
    };
    p.clone = function() {
        var o = new Stage(null);
        this.cloneProps(o);
        return o
    };
    p.toString = function() {
        return "[Stage (name=" + this.name + ")]"
    };
    p._getElementRect = function(e) {
        var bounds;
        try {
            bounds = e.getBoundingClientRect()
        } catch (err) {
            bounds = {
                top: e.offsetTop,
                left: e.offsetLeft,
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }
        var offX = (window.pageXOffset || (document.scrollLeft || 0)) - (document.clientLeft || (document.body.clientLeft || 0));
        var offY = (window.pageYOffset || (document.scrollTop || 0)) - (document.clientTop || (document.body.clientTop || 0));
        var styles = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle;
        var padL = parseInt(styles.paddingLeft) + parseInt(styles.borderLeftWidth);
        var padT = parseInt(styles.paddingTop) + parseInt(styles.borderTopWidth);
        var padR = parseInt(styles.paddingRight) + parseInt(styles.borderRightWidth);
        var padB = parseInt(styles.paddingBottom) + parseInt(styles.borderBottomWidth);
        return {
            left: bounds.left + offX + padL,
            right: bounds.right + offX - padR,
            top: bounds.top + offY + padT,
            bottom: bounds.bottom + offY - padB
        }
    };
    p._getPointerData = function(id) {
        var data = this._pointerData[id];
        if (!data) {
            data = this._pointerData[id] = {
                x: 0,
                y: 0
            };
            if (this._primaryPointerID == null) this._primaryPointerID = id
        }
        return data
    };
    p._handleMouseMove = function(e) {
        if (!e) e = window.event;
        this._handlePointerMove(-1, e, e.pageX, e.pageY)
    };
    p._handlePointerMove = function(id, e, pageX, pageY) {
        if (!this.canvas) return;
        var o = this._getPointerData(id);
        var inBounds = o.inBounds;
        this._updatePointerPosition(id, e, pageX, pageY);
        if (!inBounds && (!o.inBounds && !this.mouseMoveOutside)) return;
        if (id == -1 && o.inBounds == !inBounds) this._dispatchMouseEvent(this, inBounds ? "mouseleave" : "mouseenter", false, id, o, e);
        this._dispatchMouseEvent(this, "stagemousemove", false, id, o, e);
        this._dispatchMouseEvent(o.target, "pressmove", true, id, o, e);
        var oEvent = o.event;
        if (oEvent && oEvent.hasEventListener("mousemove")) oEvent.dispatchEvent(new createjs.MouseEvent("mousemove", false, false, o.x, o.y, e, id, id == this._primaryPointerID, o.rawX, o.rawY), oTarget);
        this.nextStage && this.nextStage._handlePointerMove(id, e, pageX, pageY)
    };
    p._updatePointerPosition = function(id, e, pageX, pageY) {
        var rect = this._getElementRect(this.canvas);
        pageX -= rect.left;
        pageY -= rect.top;
        var w = this.canvas.width;
        var h = this.canvas.height;
        pageX /= (rect.right - rect.left) / w;
        pageY /= (rect.bottom - rect.top) / h;
        var o = this._getPointerData(id);
        if (o.inBounds = pageX >= 0 && (pageY >= 0 && (pageX <= w - 1 && pageY <= h - 1))) {
            o.x = pageX;
            o.y = pageY
        } else if (this.mouseMoveOutside) {
            o.x = pageX < 0 ? 0 : pageX > w - 1 ? w - 1 : pageX;
            o.y = pageY < 0 ? 0 : pageY > h - 1 ? h - 1 : pageY
        }
        o.posEvtObj = e;
        o.rawX = pageX;
        o.rawY = pageY;
        if (id == this._primaryPointerID) {
            this.mouseX = o.x;
            this.mouseY = o.y;
            this.mouseInBounds = o.inBounds
        }
    };
    p._handleMouseUp = function(e) {
        this._handlePointerUp(-1, e, false)
    };
    p._handlePointerUp = function(id, e, clear) {
        var o = this._getPointerData(id);
        var oTarget = o.target;
        if (oTarget && (oTarget.hasEventListener("pressup") || oTarget.hasEventListener("click"))) {
            if (oTarget.hasEventListener("click") && this._getObjectsUnderPoint(o.x, o.y, null, true) == oTarget) this._dispatchMouseEvent(oTarget, "click", true, id, o, e);
            this._dispatchMouseEvent(oTarget, "pressup", true, id, o, e)
        } else this._dispatchMouseEvent(this, "stagemouseup", false, id, o, e);
        if (clear) {
            if (id == this._primaryPointerID) this._primaryPointerID = null;
            delete this._pointerData[id]
        } else o.event = o.target = null;
        this.nextStage && this.nextStage._handlePointerUp(id, e, clear)
    };
    p._handleMouseDown = function(e) {
        this._handlePointerDown(-1, e, e.pageX, e.pageY)
    };
    p._handlePointerDown = function(id, e, pageX, pageY) {
        if (pageY != null) this._updatePointerPosition(id, e, pageX, pageY);
        var o = this._getPointerData(id);
        o.target = this._getObjectsUnderPoint(o.x, o.y, null, true);
        this._dispatchMouseEvent(o.target, "mousedown", true, id, o, e);
        if (!o.target || !o.target.hasEventListener("mousedown")) this._dispatchMouseEvent(this, "stagemousedown", false, id, o, e);
        this.nextStage && this.nextStage._handlePointerDown(id, e, pageX, pageY)
    };
    p._testMouseOver = function(clear) {
        if (this._primaryPointerID != -1 || !clear && (this.mouseX == this._mouseOverX && (this.mouseY == this._mouseOverY && this.mouseInBounds))) return;
        var o = this._getPointerData(-1);
        var e = o.posEvtObj;
        var target, common = -1,
            cursor = "",
            t, i, l;
        if (clear || this.mouseInBounds && (e && e.target == this.canvas)) {
            target = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true);
            this._mouseOverX = this.mouseX;
            this._mouseOverY = this.mouseY
        }
        var oldList = this._mouseOverTarget || [];
        var oldTarget = oldList[oldList.length - 1];
        var list = this._mouseOverTarget = [];
        t = target;
        while (t) {
            list.unshift(t);
            if (t.cursor != null) cursor = t.cursor;
            t = t.parent
        }
        this.canvas.style.cursor = cursor;
        for (i = 0, l = list.length; i < l; i++) {
            if (list[i] != oldList[i]) break;
            common = i
        }
        if (oldTarget != target) this._dispatchMouseEvent(oldTarget, "mouseout", true, -1, o, e);
        for (i = oldList.length - 1; i > common; i--) this._dispatchMouseEvent(oldList[i], "rollout", false, -1, o, e);
        for (i = list.length - 1; i > common; i--) this._dispatchMouseEvent(list[i], "rollover", false, -1, o, e);
        if (oldTarget != target) this._dispatchMouseEvent(target, "mouseover", true, -1, o, e)
    };
    p._handleDoubleClick = function(e) {
        var o = this._getPointerData(-1);
        var target = this._getObjectsUnderPoint(o.x, o.y, null, true);
        this._dispatchMouseEvent(target, "dblclick", true, -1, o, e);
        this.nextStage && this.nextStage._handleDoubleClick(e)
    };
    p._dispatchMouseEvent = function(target, type, bubbles, pointerId, o, nativeEvent) {
        if (!target || !bubbles && !target.hasEventListener(type)) return;
        var evt = new createjs.MouseEvent(type, bubbles, false, o.x, o.y, nativeEvent, pointerId, pointerId == this._primaryPointerID, o.rawX, o.rawY);
        target.dispatchEvent(evt)
    };
    createjs.Stage = Stage
})();
this.createjs = this.createjs || {};
(function() {
    var Bitmap = function(imageOrUri) {
        this.initialize(imageOrUri)
    };
    var p = Bitmap.prototype = new createjs.DisplayObject;
    p.image = null;
    p.snapToPixel = true;
    p.sourceRect = null;
    p.DisplayObject_initialize = p.initialize;
    p.initialize = function(imageOrUri) {
        this.DisplayObject_initialize();
        if (typeof imageOrUri == "string") {
            this.image = document.createElement("img");
            this.image.src = imageOrUri
        } else this.image = imageOrUri
    };
    p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.image && (this.image.complete || (this.image.getContext || this.image.readyState >= 2));
        return !!(this.visible && (this.alpha > 0 && (this.scaleX != 0 && (this.scaleY != 0 && hasContent))))
    };
    p.DisplayObject_draw = p.draw;
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) return true;
        var rect = this.sourceRect;
        if (rect) ctx.drawImage(this.image, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
        else ctx.drawImage(this.image, 0, 0);
        return true
    };
    p.DisplayObject_getBounds = p.getBounds;
    p.getBounds = function() {
        var rect = this.DisplayObject_getBounds();
        if (rect) return rect;
        var o = this.sourceRect || this.image;
        var hasContent = this.image && (this.image.complete || (this.image.getContext || this.image.readyState >= 2));
        return hasContent ? this._rectangle.initialize(0, 0, o.width, o.height) : null
    };
    p.clone = function() {
        var o = new Bitmap(this.image);
        if (this.sourceRect) o.sourceRect = this.sourceRect.clone();
        this.cloneProps(o);
        return o
    };
    p.toString = function() {
        return "[Bitmap (name=" + this.name + ")]"
    };
    createjs.Bitmap = Bitmap
})();
this.createjs = this.createjs || {};
(function() {
    var Sprite = function(spriteSheet, frameOrAnimation) {
        this.initialize(spriteSheet, frameOrAnimation)
    };
    var p = Sprite.prototype = new createjs.DisplayObject;
    p.currentFrame = 0;
    p.currentAnimation = null;
    p.paused = true;
    p.spriteSheet = null;
    p.snapToPixel = true;
    p.isLoop = true;
    p.offset = 0;
    p.currentAnimationFrame = 0;
    p.framerate = 0;
    p._advanceCount = 0;
    p._animation = null;
    p._currentFrame = null;
    p.rectMask = null;
    p.DisplayObject_initialize = p.initialize;
    p.initialize = function(spriteSheet, frameOrAnimation) {
        this.DisplayObject_initialize();
        this.spriteSheet = spriteSheet;
        if (frameOrAnimation) this.gotoAndPlay(frameOrAnimation)
    };
    p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.spriteSheet.complete;
        return !!(this.visible && (this.alpha > 0 && (this.scaleX != 0 && (this.scaleY != 0 && hasContent))))
    };
    p.DisplayObject_draw = p.draw;
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) return true;
        this._normalizeFrame();
        var o = this.spriteSheet.getFrame(this._currentFrame | 0);
        if (!o) return false;
        var rect = o.rect;
        if (this.rectMask) ctx.drawImage(o.image, rect.x + this.rectMask.x, rect.y + this.rectMask.y, rect.width + this.rectMask.width, rect.height + this.rectMask.height, -o.regX + this.rectMask.x, -o.regY + this.rectMask.y, rect.width + this.rectMask.width, rect.height + this.rectMask.height);
        else ctx.drawImage(o.image, rect.x, rect.y, rect.width, rect.height, -o.regX, -o.regY, rect.width, rect.height);
        return true
    };
    p.play = function() {
        this.paused = false
    };
    p.stop = function() {
        this.paused = true
    };
    p.gotoAndPlay = function(frameOrAnimation) {
        this.paused = false;
        this._goto(frameOrAnimation)
    };
    p.gotoAndStop = function(frameOrAnimation) {
        this.paused = true;
        this._goto(frameOrAnimation)
    };
    p.advance = function(time) {
        var speed = this._animation && this._animation.speed || 1;
        var fps = this.framerate || this.spriteSheet.framerate;
        var t = fps && time != null ? time / (1E3 / fps) : 1;
        if (this._animation) this.currentAnimationFrame += t * speed;
        else this._currentFrame += t * speed;
        this._normalizeFrame()
    };
    p.DisplayObject_getBounds = p.getBounds;
    p.getBounds = function() {
        return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
    };
    p.clone = function() {
        var o = new Sprite(this.spriteSheet);
        this.cloneProps(o);
        return o
    };
    p.toString = function() {
        return "[Sprite (name=" + this.name + ")]"
    };
    p.DisplayObject__tick = p._tick;
    p._tick = function(params) {
        if (!this.paused) this.advance(params && (params[0] && params[0].delta));
        this.DisplayObject__tick(params)
    };
    p._normalizeFrame = function() {
        var animation = this._animation;
        var paused = this.paused;
        var frame = this._currentFrame;
        var animFrame = this.currentAnimationFrame;
        var l;
        if (animation) {
            l = animation.frames.length;
            if ((animFrame | 0) >= l) {
                var next = animation.next;
                if (this._dispatchAnimationEnd(animation, frame, paused, next, l - 1));
                else if (next && this.isLoop) return this._goto(next, animFrame - l);
                else {
                    this.paused = true;
                    animFrame = this.currentAnimationFrame = animation.frames.length - 1;
                    this._currentFrame = animation.frames[animFrame]
                }
            } else this._currentFrame = animation.frames[animFrame | 0]
        } else {
            l = this.spriteSheet.getNumFrames();
            if (frame >= l) if (!this._dispatchAnimationEnd(animation, frame, paused, l - 1)) if ((this._currentFrame -= l) >= l) return this._normalizeFrame()
        }
        this.currentFrame = this._currentFrame | 0
    };
    p._dispatchAnimationEnd = function(animation, frame, paused, next, end) {
        var name = animation ? animation.name : null;
        if (this.hasEventListener("animationend")) {
            var evt = new createjs.Event("animationend");
            evt.name = name;
            evt.next = next;
            this.dispatchEvent(evt)
        }
        var changed = this._animation != animation || this._currentFrame != frame;
        if (!changed && (!paused && this.paused)) {
            this.currentAnimationFrame = end;
            changed = true
        }
        return changed
    };
    p.DisplayObject_cloneProps = p.cloneProps;
    p.cloneProps = function(o) {
        this.DisplayObject_cloneProps(o);
        o.currentFrame = this.currentFrame;
        o._currentFrame = this._currentFrame;
        o.currentAnimation = this.currentAnimation;
        o.paused = this.paused;
        o._animation = this._animation;
        o.currentAnimationFrame = this.currentAnimationFrame;
        o.framerate = this.framerate
    };
    p._goto = function(frameOrAnimation, frame) {
        if (isNaN(frameOrAnimation)) {
            var data = this.spriteSheet.getAnimation(frameOrAnimation);
            if (data) {
                this.currentAnimationFrame = frame || 0;
                this._animation = data;
                this.currentAnimation = frameOrAnimation;
                this._normalizeFrame()
            }
        } else {
            this.currentAnimationFrame = 0;
            this.currentAnimation = this._animation = null;
            this._currentFrame = frameOrAnimation;
            this._normalizeFrame()
        }
    };
    createjs.Sprite = Sprite
})();
this.createjs = this.createjs || {};
(function() {
    var e = "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
    if (!createjs.Sprite) throw e;
    (createjs.BitmapAnimation = function(spriteSheet) {
        console.log(e);
        this.initialize(spriteSheet)
    }).prototype = new createjs.Sprite
})();
this.createjs = this.createjs || {};
(function() {
    var Shape = function(graphics) {
        this.initialize(graphics)
    };
    var p = Shape.prototype = new createjs.DisplayObject;
    p.graphics = null;
    p.DisplayObject_initialize = p.initialize;
    p.initialize = function(graphics) {
        this.DisplayObject_initialize();
        this.graphics = graphics ? graphics : new createjs.Graphics
    };
    p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
        return !!(this.visible && (this.alpha > 0 && (this.scaleX != 0 && (this.scaleY != 0 && hasContent))))
    };
    p.DisplayObject_draw = p.draw;
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) return true;
        this.graphics.draw(ctx);
        return true
    };
    p.clone = function(recursive) {
        var o = new Shape(recursive && this.graphics ? this.graphics.clone() : this.graphics);
        this.cloneProps(o);
        return o
    };
    p.toString = function() {
        return "[Shape (name=" + this.name + ")]"
    };
    createjs.Shape = Shape
})();
this.createjs = this.createjs || {};
(function() {
    var Text = function(text, font, color) {
        this.initialize(text, font, color)
    };
    var p = Text.prototype = new createjs.DisplayObject;
    var canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    if (canvas.getContext) {
        Text._workingContext = canvas.getContext("2d");
        canvas.width = canvas.height = 1
    }
    Text.H_OFFSETS = {
        start: 0,
        left: 0,
        center: -0.5,
        end: -1,
        right: -1
    };
    Text.V_OFFSETS = {
        top: 0,
        hanging: -0.01,
        middle: -0.4,
        alphabetic: -0.8,
        ideographic: -0.85,
        bottom: -1
    };
    p.text = "";
    p.font = null;
    p.color = null;
    p.textAlign = "left";
    p.textBaseline = "top";
    p.maxWidth = null;
    p.outline = 0;
    p.lineHeight = 0;
    p.lineWidth = null;
    p.DisplayObject_initialize = p.initialize;
    p.initialize = function(text, font, color) {
        this.DisplayObject_initialize();
        this.text = text;
        this.font = font;
        this.color = color
    };
    p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.text != null && this.text !== "";
        return !!(this.visible && (this.alpha > 0 && (this.scaleX != 0 && (this.scaleY != 0 && hasContent))))
    };
    p.DisplayObject_draw = p.draw;
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) return true;
        var col = this.color || "#000";
        if (this.outline) {
            ctx.strokeStyle = col;
            ctx.lineWidth = this.outline * 1
        } else ctx.fillStyle = col;
        this._drawText(this._prepContext(ctx));
        return true
    };
    p.getMeasuredWidth = function() {
        return this._prepContext(Text._workingContext).measureText(this.text).width
    };
    p.getMeasuredLineHeight = function() {
        return this._prepContext(Text._workingContext).measureText("M").width * 1.2
    };
    p.getMeasuredHeight = function() {
        return this._drawText(null, {}).height
    };
    p.DisplayObject_getBounds = p.getBounds;
    p.getBounds = function() {
        var rect = this.DisplayObject_getBounds();
        if (rect) return rect;
        if (this.text == null || this.text == "") return null;
        var o = this._drawText(null, {});
        var w = this.maxWidth && this.maxWidth < o.width ? this.maxWidth : o.width;
        var x = w * Text.H_OFFSETS[this.textAlign || "left"];
        var lineHeight = this.lineHeight || this.getMeasuredLineHeight();
        var y = lineHeight * Text.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.initialize(x, y, w, o.height)
    };
    p.clone = function() {
        var o = new Text(this.text, this.font, this.color);
        this.cloneProps(o);
        return o
    };
    p.toString = function() {
        return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
    };
    p.DisplayObject_cloneProps = p.cloneProps;
    p.cloneProps = function(o) {
        this.DisplayObject_cloneProps(o);
        o.textAlign = this.textAlign;
        o.textBaseline = this.textBaseline;
        o.maxWidth = this.maxWidth;
        o.outline = this.outline;
        o.lineHeight = this.lineHeight;
        o.lineWidth = this.lineWidth
    };
    p._prepContext = function(ctx) {
        ctx.font = this.font;
        ctx.textAlign = this.textAlign || "left";
        ctx.textBaseline = this.textBaseline || "top";
        return ctx
    };
    p._drawText = function(ctx, o) {
        var paint = !! ctx;
        if (!paint) ctx = this._prepContext(Text._workingContext);
        var lineHeight = this.lineHeight || this.getMeasuredLineHeight();
        var maxW = 0,
            count = 0;
        var lines = String(this.text).split(/(?:\r\n|\r|\n)/);
        for (var i = 0, l = lines.length; i < l; i++) {
            var str = lines[i];
            var w = null;
            if (this.lineWidth != null && (w = ctx.measureText(str).width) > this.lineWidth) {
                var words = str.split(/(\s)/);
                str = words[0];
                w = ctx.measureText(str).width;
                for (var j = 1, jl = words.length; j < jl; j += 2) {
                    var wordW = ctx.measureText(words[j] + words[j + 1]).width;
                    if (w + wordW > this.lineWidth) {
                        if (paint) this._drawTextLine(ctx, str, count * lineHeight);
                        if (w > maxW) maxW = w;
                        str = words[j + 1];
                        w = ctx.measureText(str).width;
                        count++
                    } else {
                        str += words[j] + words[j + 1];
                        w += wordW
                    }
                }
            }
            if (paint) this._drawTextLine(ctx, str, count * lineHeight);
            if (o && w == null) w = ctx.measureText(str).width;
            if (w > maxW) maxW = w;
            count++
        }
        if (o) {
            o.count = count;
            o.width = maxW;
            o.height = count * lineHeight
        }
        return o
    };
    p._drawTextLine = function(ctx, text, y) {
        if (this.outline) ctx.strokeText(text, 0, y, this.maxWidth || 65535);
        else ctx.fillText(text, 0, y, this.maxWidth || 65535)
    };
    createjs.Text = Text
})();
this.createjs = this.createjs || {};
(function() {
    function BitmapText(text, spriteSheet) {
        this.initialize(text, spriteSheet)
    }
    var p = BitmapText.prototype = new createjs.DisplayObject;
    p.text = "";
    p.spriteSheet = null;
    p.lineHeight = 0;
    p.letterSpacing = 0;
    p.isNeedCenter = false;
    p.centerX = 0;
    p.centerY = 0;
    p.textBounds;
    p.spaceWidth = 0;
    p.postfix = "";
    p.DisplayObject_initialize = p.initialize;
    p.initialize = function(text, spriteSheet) {
        this.DisplayObject_initialize();
        this.text = text;
        this.spriteSheet = spriteSheet;
        p.textBounds = new createjs.Rectangle
    };
    p.DisplayObject_draw = p.draw;
    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) return true;
        this._drawText(ctx)
    };
    p.isVisible = function() {
        var hasContent = this.cacheCanvas || this.spriteSheet && (this.spriteSheet.complete && this.text);
        return !!(this.visible && (this.alpha > 0 && (this.scaleX != 0 && (this.scaleY != 0 && hasContent))))
    };
    p.getBounds = function() {
        var bounds = this._rectangle;
        this._drawText(null, bounds);
        return bounds.width ? bounds : null
    };
    p._getFrame = function(character, spriteSheet) {
        var c, o = spriteSheet.getAnimation(character + this.postfix);
        if (!o) {
            character != (c = character.toUpperCase()) || (character != (c = character.toLowerCase()) || (c = null));
            if (c) o = spriteSheet.getAnimation(c + this.postfix)
        }
        return o && spriteSheet.getFrame(o.frames[0])
    };
    p._getLineHeight = function(ss) {
        var frame = this._getFrame("1", ss) || (this._getFrame("T", ss) || (this._getFrame("L", ss) || ss.getFrame(0)));
        return frame ? frame.rect.height : 1
    };
    p._getSpaceWidth = function(ss) {
        var frame = this._getFrame("1", ss) || (this._getFrame("l", ss) || (this._getFrame("e", ss) || (this._getFrame("a", ss) || ss.getFrame(0))));
        return frame ? frame.rect.width : 1
    };
    p._drawText = function(ctx, bounds) {
        var w, h, rx, x = 0,
            y = 0,
            spaceW = this.spaceWidth,
            lineH = this.lineHeight,
            ss = this.spriteSheet;
        if (spaceW == 0) spaceW = this._getSpaceWidth(ss);
        if (lineH == 0) lineH = this._getLineHeight(ss);
        var maxX = 0;
        for (var i = 0, l = this.text.length; i < l; i++) {
            var character = this.text.charAt(i);
            if (character == " ") {
                x += spaceW;
                continue
            } else if (character == "\n" || character == "\r") {
                if (character == "\r" && this.text.charAt(i + 1) == "\n") i++;
                if (x - rx > maxX) maxX = x - rx;
                x = 0;
                y += lineH;
                continue
            }
            var o = this._getFrame(character, ss);
            if (!o) continue;
            var rect = o.rect;
            rx = o.regX;
            w = rect.width;
            ctx && ctx.drawImage(o.image, rect.x, rect.y, w, h = rect.height, x - rx, y - o.regY, w, h);
            x += w + this.letterSpacing
        }
        if (x - rx > maxX) maxX = x - rx;
        if (bounds) {
            bounds.width = maxX - this.letterSpacing;
            bounds.height = y + lineH
        }
        this.textBounds.width = maxX - this.letterSpacing;
        this.textBounds.height = y + lineH
    };
    createjs.BitmapText = BitmapText
})();
this.createjs = this.createjs || {};
(function() {
    var SpriteSheetUtils = function() {
        throw "SpriteSheetUtils cannot be instantiated";
    };
    var canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    if (canvas.getContext) {
        SpriteSheetUtils._workingCanvas = canvas;
        SpriteSheetUtils._workingContext = canvas.getContext("2d");
        canvas.width = canvas.height = 1
    }
    SpriteSheetUtils.addFlippedFrames = function(spriteSheet, horizontal, vertical, both) {
        if (!horizontal && (!vertical && !both)) return;
        var count = 0;
        if (horizontal) SpriteSheetUtils._flip(spriteSheet, ++count, true, false);
        if (vertical) SpriteSheetUtils._flip(spriteSheet, ++count, false, true);
        if (both) SpriteSheetUtils._flip(spriteSheet, ++count, true, true)
    };
    SpriteSheetUtils.extractFrame = function(spriteSheet, frameOrAnimation) {
        if (isNaN(frameOrAnimation)) frameOrAnimation = spriteSheet.getAnimation(frameOrAnimation).frames[0];
        var data = spriteSheet.getFrame(frameOrAnimation);
        if (!data) return null;
        var r = data.rect;
        var canvas = SpriteSheetUtils._workingCanvas;
        canvas.width = r.width;
        canvas.height = r.height;
        SpriteSheetUtils._workingContext.drawImage(data.image, r.x, r.y, r.width, r.height, 0, 0, r.width, r.height);
        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        return img
    };
    SpriteSheetUtils.mergeAlpha = function(rgbImage, alphaImage, canvas) {
        if (!canvas) canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
        canvas.width = Math.max(alphaImage.width, rgbImage.width);
        canvas.height = Math.max(alphaImage.height, rgbImage.height);
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.drawImage(rgbImage, 0, 0);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(alphaImage, 0, 0);
        ctx.restore();
        return canvas
    };
    SpriteSheetUtils._flip = function(spriteSheet, count, h, v) {
        var imgs = spriteSheet._images;
        var canvas = SpriteSheetUtils._workingCanvas;
        var ctx = SpriteSheetUtils._workingContext;
        var il = imgs.length / count;
        for (var i = 0; i < il; i++) {
            var src = imgs[i];
            src.__tmp = i;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width + 1, canvas.height + 1);
            canvas.width = src.width;
            canvas.height = src.height;
            ctx.setTransform(h ? -1 : 1, 0, 0, v ? -1 : 1, h ? src.width : 0, v ? src.height : 0);
            ctx.drawImage(src, 0, 0);
            var img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");
            img.width = src.width;
            img.height = src.height;
            imgs.push(img)
        }
        var frames = spriteSheet._frames;
        var fl = frames.length / count;
        for (i = 0; i < fl; i++) {
            src = frames[i];
            var rect = src.rect.clone();
            img = imgs[src.image.__tmp + il * count];
            var frame = {
                image: img,
                rect: rect,
                regX: src.regX,
                regY: src.regY
            };
            if (h) {
                rect.x = img.width - rect.x - rect.width;
                frame.regX = rect.width - src.regX
            }
            if (v) {
                rect.y = img.height - rect.y - rect.height;
                frame.regY = rect.height - src.regY
            }
            frames.push(frame)
        }
        var sfx = "_" + (h ? "h" : "") + (v ? "v" : "");
        var names = spriteSheet._animations;
        var data = spriteSheet._data;
        var al = names.length / count;
        for (i = 0; i < al; i++) {
            var name = names[i];
            src = data[name];
            var anim = {
                name: name + sfx,
                frequency: src.frequency,
                next: src.next,
                frames: []
            };
            if (src.next) anim.next += sfx;
            frames = src.frames;
            for (var j = 0, l = frames.length; j < l; j++) anim.frames.push(frames[j] + fl * count);
            data[anim.name] = anim;
            names.push(anim.name)
        }
    };
    createjs.SpriteSheetUtils = SpriteSheetUtils
})();
this.createjs = this.createjs || {};
(function() {
    var SpriteSheetBuilder = function() {
        this.initialize()
    };
    var p = SpriteSheetBuilder.prototype = new createjs.EventDispatcher;
    SpriteSheetBuilder.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
    SpriteSheetBuilder.ERR_RUNNING = "a build is already running";
    p.maxWidth = 2048;
    p.maxHeight = 2048;
    p.spriteSheet = null;
    p.scale = 1;
    p.padding = 1;
    p.timeSlice = 0.3;
    p.progress = -1;
    p._frames = null;
    p._animations = null;
    p._data = null;
    p._nextFrameIndex = 0;
    p._index = 0;
    p._timerID = null;
    p._scale = 1;
    p.initialize = function() {
        this._frames = [];
        this._animations = {}
    };
    p.addFrame = function(source, sourceRect, scale, setupFunction, setupParams, setupScope) {
        if (this._data) throw SpriteSheetBuilder.ERR_RUNNING;
        var rect = sourceRect || (source.bounds || source.nominalBounds);
        if (!rect && source.getBounds) rect = source.getBounds();
        if (!rect) return null;
        scale = scale || 1;
        return this._frames.push({
            source: source,
            sourceRect: rect,
            scale: scale,
            funct: setupFunction,
            params: setupParams,
            scope: setupScope,
            index: this._frames.length,
            height: rect.height * scale
        }) - 1
    };
    p.addAnimation = function(name, frames, next, frequency) {
        if (this._data) throw SpriteSheetBuilder.ERR_RUNNING;
        this._animations[name] = {
            frames: frames,
            next: next,
            frequency: frequency
        }
    };
    p.addMovieClip = function(source, sourceRect, scale) {
        if (this._data) throw SpriteSheetBuilder.ERR_RUNNING;
        var rects = source.frameBounds;
        var rect = sourceRect || (source.bounds || source.nominalBounds);
        if (!rect && source.getBounds) rect = source.getBounds();
        if (!rect && !rects) return null;
        var baseFrameIndex = this._frames.length;
        var duration = source.timeline.duration;
        for (var i = 0; i < duration; i++) {
            var r = rects && rects[i] ? rects[i] : rect;
            this.addFrame(source, r, scale, function(frame) {
                var ae = this.actionsEnabled;
                this.actionsEnabled = false;
                this.gotoAndStop(frame);
                this.actionsEnabled = ae
            }, [i], source)
        }
        var labels = source.timeline._labels;
        var lbls = [];
        for (var n in labels) lbls.push({
            index: labels[n],
            label: n
        });
        if (lbls.length) {
            lbls.sort(function(a, b) {
                return a.index - b.index
            });
            for (var i = 0, l = lbls.length; i < l; i++) {
                var label = lbls[i].label;
                var start = baseFrameIndex + lbls[i].index;
                var end = baseFrameIndex + (i == l - 1 ? duration : lbls[i + 1].index);
                var frames = [];
                for (var j = start; j < end; j++) frames.push(j);
                this.addAnimation(label, frames, true)
            }
        }
    };
    p.build = function() {
        if (this._data) throw SpriteSheetBuilder.ERR_RUNNING;
        this._startBuild();
        while (this._drawNext());
        this._endBuild();
        return this.spriteSheet
    };
    p.buildAsync = function(timeSlice) {
        if (this._data) throw SpriteSheetBuilder.ERR_RUNNING;
        this.timeSlice = timeSlice;
        this._startBuild();
        var _this = this;
        this._timerID = setTimeout(function() {
            _this._run()
        }, 50 - Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)) * 50)
    };
    p.stopAsync = function() {
        clearTimeout(this._timerID);
        this._data = null
    };
    p.clone = function() {
        throw "SpriteSheetBuilder cannot be cloned.";
    };
    p.toString = function() {
        return "[SpriteSheetBuilder]"
    };
    p._startBuild = function() {
        var pad = this.padding || 0;
        this.progress = 0;
        this.spriteSheet = null;
        this._index = 0;
        this._scale = this.scale;
        var dataFrames = [];
        this._data = {
            images: [],
            frames: dataFrames,
            animations: this._animations
        };
        var frames = this._frames.slice();
        frames.sort(function(a, b) {
            return a.height <= b.height ? -1 : 1
        });
        if (frames[frames.length - 1].height + pad * 2 > this.maxHeight) throw SpriteSheetBuilder.ERR_DIMENSIONS;
        var y = 0,
            x = 0;
        var img = 0;
        while (frames.length) {
            var o = this._fillRow(frames, y, img, dataFrames, pad);
            if (o.w > x) x = o.w;
            y += o.h;
            if (!o.h || !frames.length) {
                var canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                canvas.width = this._getSize(x, this.maxWidth);
                canvas.height = this._getSize(y, this.maxHeight);
                this._data.images[img] = canvas;
                if (!o.h) {
                    x = y = 0;
                    img++
                }
            }
        }
    };
    p._getSize = function(size, max) {
        var pow = 4;
        while (Math.pow(2, ++pow) < size);
        return Math.min(max, Math.pow(2, pow))
    };
    p._fillRow = function(frames, y, img, dataFrames, pad) {
        var w = this.maxWidth;
        var maxH = this.maxHeight;
        y += pad;
        var h = maxH - y;
        var x = pad;
        var height = 0;
        for (var i = frames.length - 1; i >= 0; i--) {
            var frame = frames[i];
            var sc = this._scale * frame.scale;
            var rect = frame.sourceRect;
            var source = frame.source;
            var rx = Math.floor(sc * rect.x - pad);
            var ry = Math.floor(sc * rect.y - pad);
            var rh = Math.ceil(sc * rect.height + pad * 2);
            var rw = Math.ceil(sc * rect.width + pad * 2);
            if (rw > w) throw SpriteSheetBuilder.ERR_DIMENSIONS;
            if (rh > h || x + rw > w) continue;
            frame.img = img;
            frame.rect = new createjs.Rectangle(x, y, rw, rh);
            height = height || rh;
            frames.splice(i, 1);
            dataFrames[frame.index] = [x, y, rw, rh, img, Math.round(-rx + sc * source.regX - pad), Math.round(-ry + sc * source.regY - pad)];
            x += rw
        }
        return {
            w: x,
            h: height
        }
    };
    p._endBuild = function() {
        this.spriteSheet = new createjs.SpriteSheet(this._data);
        this._data = null;
        this.progress = 1;
        this.dispatchEvent("complete")
    };
    p._run = function() {
        var ts = Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)) * 50;
        var t = (new Date).getTime() + ts;
        var complete = false;
        while (t > (new Date).getTime()) if (!this._drawNext()) {
            complete = true;
            break
        }
        if (complete) this._endBuild();
        else {
            var _this = this;
            this._timerID = setTimeout(function() {
                _this._run()
            }, 50 - ts)
        }
        var p = this.progress = this._index / this._frames.length;
        if (this.hasEventListener("progress")) {
            var evt = new createjs.Event("progress");
            evt.progress = p;
            this.dispatchEvent(evt)
        }
    };
    p._drawNext = function() {
        var frame = this._frames[this._index];
        var sc = frame.scale * this._scale;
        var rect = frame.rect;
        var sourceRect = frame.sourceRect;
        var canvas = this._data.images[frame.img];
        var ctx = canvas.getContext("2d");
        frame.funct && frame.funct.apply(frame.scope, frame.params);
        ctx.save();
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.clip();
        ctx.translate(Math.ceil(rect.x - sourceRect.x * sc), Math.ceil(rect.y - sourceRect.y * sc));
        ctx.scale(sc, sc);
        frame.source.draw(ctx);
        ctx.restore();
        return ++this._index < this._frames.length
    };
    createjs.SpriteSheetBuilder = SpriteSheetBuilder
})();
this.createjs = this.createjs || {};
(function() {
    var DOMElement = function(htmlElement) {
        this.initialize(htmlElement)
    };
    var p = DOMElement.prototype = new createjs.DisplayObject;
    p.htmlElement = null;
    p._oldMtx = null;
    p._visible = false;
    p.DisplayObject_initialize = p.initialize;
    p.initialize = function(htmlElement) {
        if (typeof htmlElement == "string") htmlElement = document.getElementById(htmlElement);
        this.DisplayObject_initialize();
        this.mouseEnabled = false;
        this.htmlElement = htmlElement;
        var style = htmlElement.style;
        style.position = "absolute";
        style.transformOrigin = style.WebkitTransformOrigin = style.msTransformOrigin = style.MozTransformOrigin = style.OTransformOrigin = "0% 0%"
    };
    p.isVisible = function() {
        return this.htmlElement != null
    };
    p.draw = function(ctx, ignoreCache) {
        if (this.visible) this._visible = true;
        return true
    };
    p.cache = function() {};
    p.uncache = function() {};
    p.updateCache = function() {};
    p.hitTest = function() {};
    p.localToGlobal = function() {};
    p.globalToLocal = function() {};
    p.localToLocal = function() {};
    p.clone = function() {
        throw "DOMElement cannot be cloned.";
    };
    p.toString = function() {
        return "[DOMElement (name=" + this.name + ")]"
    };
    p.DisplayObject__tick = p._tick;
    p._tick = function(params) {
        var stage = this.getStage();
        this._visible = false;
        stage && stage.on("drawend", this._handleDrawEnd, this, true);
        this.DisplayObject__tick(params)
    };
    p._handleDrawEnd = function(evt) {
        var o = this.htmlElement;
        if (!o) return;
        var style = o.style;
        var visibility = this._visible ? "visible" : "hidden";
        if (visibility != style.visibility) style.visibility = visibility;
        if (!this._visible) return;
        var mtx = this.getConcatenatedMatrix(this._matrix);
        var oMtx = this._oldMtx;
        var n = 1E4;
        if (!oMtx || oMtx.alpha != mtx.alpha) {
            style.opacity = "" + (mtx.alpha * n | 0) / n;
            if (oMtx) oMtx.alpha = mtx.alpha
        }
        if (!oMtx || (oMtx.tx != mtx.tx || (oMtx.ty != mtx.ty || (oMtx.a != mtx.a || (oMtx.b != mtx.b || (oMtx.c != mtx.c || oMtx.d != mtx.d)))))) {
            var str = "matrix(" + (mtx.a * n | 0) / n + "," + (mtx.b * n | 0) / n + "," + (mtx.c * n | 0) / n + "," + (mtx.d * n | 0) / n + "," + (mtx.tx + 0.5 | 0);
            style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str + "," + (mtx.ty + 0.5 | 0) + ")";
            style.MozTransform = str + "px," + (mtx.ty + 0.5 | 0) + "px)";
            this._oldMtx = oMtx ? oMtx.copy(mtx) : mtx.clone()
        }
    };
    createjs.DOMElement = DOMElement
})();
this.createjs = this.createjs || {};
(function() {
    var Filter = function() {
        this.initialize()
    };
    var p = Filter.prototype;
    p.initialize = function() {};
    p.getBounds = function() {
        return null
    };
    p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {};
    p.toString = function() {
        return "[Filter]"
    };
    p.clone = function() {
        return new Filter
    };
    createjs.Filter = Filter
})();
this.createjs = this.createjs || {};
(function() {
    var BlurFilter = function(blurX, blurY, quality) {
        this.initialize(blurX, blurY, quality)
    };
    var p = BlurFilter.prototype = new createjs.Filter;
    p.initialize = function(blurX, blurY, quality) {
        if (isNaN(blurX) || blurX < 0) blurX = 0;
        this.blurX = blurX | 0;
        if (isNaN(blurY) || blurY < 0) blurY = 0;
        this.blurY = blurY | 0;
        if (isNaN(quality) || quality < 1) quality = 1;
        this.quality = quality | 0
    };
    p.blurX = 0;
    p.blurY = 0;
    p.quality = 1;
    p.mul_table = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1];
    p.shg_table = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9];
    p.getBounds = function() {
        var q = Math.pow(this.quality, 0.6) * 0.5;
        return new createjs.Rectangle(-this.blurX * q, -this.blurY * q, 2 * this.blurX * q, 2 * this.blurY * q)
    };
    p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
        targetCtx = targetCtx || ctx;
        if (targetX == null) targetX = x;
        if (targetY == null) targetY = y;
        try {
            var imageData = ctx.getImageData(x, y, width, height)
        } catch (e) {
            return false
        }
        var radiusX = this.blurX / 2;
        if (isNaN(radiusX) || radiusX < 0) return false;
        radiusX |= 0;
        var radiusY = this.blurY / 2;
        if (isNaN(radiusY) || radiusY < 0) return false;
        radiusY |= 0;
        if (radiusX == 0 && radiusY == 0) return false;
        var iterations = this.quality;
        if (isNaN(iterations) || iterations < 1) iterations = 1;
        iterations |= 0;
        if (iterations > 3) iterations = 3;
        if (iterations < 1) iterations = 1;
        var pixels = imageData.data;
        var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
        var divx = radiusX + radiusX + 1;
        var divy = radiusY + radiusY + 1;
        var w4 = width << 2;
        var widthMinus1 = width - 1;
        var heightMinus1 = height - 1;
        var rxp1 = radiusX + 1;
        var ryp1 = radiusY + 1;
        var stackStartX = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null
        };
        var stackx = stackStartX;
        for (i = 1; i < divx; i++) {
            stackx = stackx.next = {
                r: 0,
                b: 0,
                g: 0,
                a: 0,
                next: null
            };
            if (i == rxp1) var stackEndX = stackx
        }
        stackx.next = stackStartX;
        var stackStartY = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null
        };
        var stacky = stackStartY;
        for (i = 1; i < divy; i++) {
            stacky = stacky.next = {
                r: 0,
                b: 0,
                g: 0,
                a: 0,
                next: null
            };
            if (i == ryp1) var stackEndY = stacky
        }
        stacky.next = stackStartY;
        var stackIn = null;
        while (iterations-- > 0) {
            yw = yi = 0;
            var mul_sum = this.mul_table[radiusX];
            var shg_sum = this.shg_table[radiusX];
            for (y = height; --y > -1;) {
                r_sum = rxp1 * (pr = pixels[yi]);
                g_sum = rxp1 * (pg = pixels[yi + 1]);
                b_sum = rxp1 * (pb = pixels[yi + 2]);
                a_sum = rxp1 * (pa = pixels[yi + 3]);
                stackx = stackStartX;
                for (i = rxp1; --i > -1;) {
                    stackx.r = pr;
                    stackx.g = pg;
                    stackx.b = pb;
                    stackx.a = pa;
                    stackx = stackx.next
                }
                for (i = 1; i < rxp1; i++) {
                    p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
                    r_sum += stackx.r = pixels[p];
                    g_sum += stackx.g = pixels[p + 1];
                    b_sum += stackx.b = pixels[p + 2];
                    a_sum += stackx.a = pixels[p + 3];
                    stackx = stackx.next
                }
                stackIn = stackStartX;
                for (x = 0; x < width; x++) {
                    pixels[yi++] = r_sum * mul_sum >>> shg_sum;
                    pixels[yi++] = g_sum * mul_sum >>> shg_sum;
                    pixels[yi++] = b_sum * mul_sum >>> shg_sum;
                    pixels[yi++] = a_sum * mul_sum >>> shg_sum;
                    p = yw + ((p = x + radiusX + 1) < widthMinus1 ? p : widthMinus1) << 2;
                    r_sum -= stackIn.r - (stackIn.r = pixels[p]);
                    g_sum -= stackIn.g - (stackIn.g = pixels[p + 1]);
                    b_sum -= stackIn.b - (stackIn.b = pixels[p + 2]);
                    a_sum -= stackIn.a - (stackIn.a = pixels[p + 3]);
                    stackIn = stackIn.next
                }
                yw += width
            }
            mul_sum = this.mul_table[radiusY];
            shg_sum = this.shg_table[radiusY];
            for (x = 0; x < width; x++) {
                yi = x << 2;
                r_sum = ryp1 * (pr = pixels[yi]);
                g_sum = ryp1 * (pg = pixels[yi + 1]);
                b_sum = ryp1 * (pb = pixels[yi + 2]);
                a_sum = ryp1 * (pa = pixels[yi + 3]);
                stacky = stackStartY;
                for (i = 0; i < ryp1; i++) {
                    stacky.r = pr;
                    stacky.g = pg;
                    stacky.b = pb;
                    stacky.a = pa;
                    stacky = stacky.next
                }
                yp = width;
                for (i = 1; i <= radiusY; i++) {
                    yi = yp + x << 2;
                    r_sum += stacky.r = pixels[yi];
                    g_sum += stacky.g = pixels[yi + 1];
                    b_sum += stacky.b = pixels[yi + 2];
                    a_sum += stacky.a = pixels[yi + 3];
                    stacky = stacky.next;
                    if (i < heightMinus1) yp += width
                }
                yi = x;
                stackIn = stackStartY;
                if (iterations > 0) for (y = 0; y < height; y++) {
                    p = yi << 2;
                    pixels[p + 3] = pa = a_sum * mul_sum >>> shg_sum;
                    if (pa > 0) {
                        pixels[p] = r_sum * mul_sum >>> shg_sum;
                        pixels[p + 1] = g_sum * mul_sum >>> shg_sum;
                        pixels[p + 2] = b_sum * mul_sum >>> shg_sum
                    } else pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
                    p = x + ((p = y + ryp1) < heightMinus1 ? p : heightMinus1) * width << 2;
                    r_sum -= stackIn.r - (stackIn.r = pixels[p]);
                    g_sum -= stackIn.g - (stackIn.g = pixels[p + 1]);
                    b_sum -= stackIn.b - (stackIn.b = pixels[p + 2]);
                    a_sum -= stackIn.a - (stackIn.a = pixels[p + 3]);
                    stackIn = stackIn.next;
                    yi += width
                } else for (y = 0; y < height; y++) {
                    p = yi << 2;
                    pixels[p + 3] = pa = a_sum * mul_sum >>> shg_sum;
                    if (pa > 0) {
                        pa = 255 / pa;
                        pixels[p] = (r_sum * mul_sum >>> shg_sum) * pa;
                        pixels[p + 1] = (g_sum * mul_sum >>> shg_sum) * pa;
                        pixels[p + 2] = (b_sum * mul_sum >>> shg_sum) * pa
                    } else pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
                    p = x + ((p = y + ryp1) < heightMinus1 ? p : heightMinus1) * width << 2;
                    r_sum -= stackIn.r - (stackIn.r = pixels[p]);
                    g_sum -= stackIn.g - (stackIn.g = pixels[p + 1]);
                    b_sum -= stackIn.b - (stackIn.b = pixels[p + 2]);
                    a_sum -= stackIn.a - (stackIn.a = pixels[p + 3]);
                    stackIn = stackIn.next;
                    yi += width
                }
            }
        }
        targetCtx.putImageData(imageData, targetX, targetY);
        return true
    };
    p.clone = function() {
        return new BlurFilter(this.blurX, this.blurY, this.quality)
    };
    p.toString = function() {
        return "[BlurFilter]"
    };
    createjs.BlurFilter = BlurFilter
})();
this.createjs = this.createjs || {};
(function() {
    var AlphaMapFilter = function(alphaMap) {
        this.initialize(alphaMap)
    };
    var p = AlphaMapFilter.prototype = new createjs.Filter;
    p.initialize = function(alphaMap) {
        this.alphaMap = alphaMap
    };
    p.alphaMap = null;
    p._alphaMap = null;
    p._mapData = null;
    p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
        if (!this.alphaMap) return true;
        if (!this._prepAlphaMap()) return false;
        targetCtx = targetCtx || ctx;
        if (targetX == null) targetX = x;
        if (targetY == null) targetY = y;
        try {
            var imageData = ctx.getImageData(x, y, width, height)
        } catch (e) {
            return false
        }
        var data = imageData.data;
        var map = this._mapData;
        var l = data.length;
        for (var i = 0; i < l; i += 4) data[i + 3] = map[i] || 0;
        imageData.data = data;
        targetCtx.putImageData(imageData, targetX, targetY);
        return true
    };
    p.clone = function() {
        return new AlphaMapFilter(this.alphaMap)
    };
    p.toString = function() {
        return "[AlphaMapFilter]"
    };
    p._prepAlphaMap = function() {
        if (!this.alphaMap) return false;
        if (this.alphaMap == this._alphaMap && this._mapData) return true;
        this._mapData = null;
        var map = this._alphaMap = this.alphaMap;
        var canvas = map;
        var ctx;
        if (map instanceof
            HTMLCanvasElement) ctx = canvas.getContext("2d");
        else {
            canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
            canvas.width = map.width;
            canvas.height = map.height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(map, 0, 0)
        }
        try {
            var imgData = ctx.getImageData(0, 0, map.width, map.height)
        } catch (e) {
            return false
        }
        this._mapData = imgData.data;
        return true
    };
    createjs.AlphaMapFilter = AlphaMapFilter
})();
this.createjs = this.createjs || {};
(function() {
    var AlphaMaskFilter = function(mask) {
        this.initialize(mask)
    };
    var p = AlphaMaskFilter.prototype = new createjs.Filter;
    p.initialize = function(mask) {
        this.mask = mask
    };
    p.mask = null;
    p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
        if (!this.mask) return true;
        targetCtx = targetCtx || ctx;
        if (targetX == null) targetX = x;
        if (targetY == null) targetY = y;
        targetCtx.save();
        if (ctx != targetCtx);
        targetCtx.globalCompositeOperation = "destination-in";
        targetCtx.drawImage(this.mask, targetX, targetY);
        targetCtx.restore();
        return true
    };
    p.clone = function() {
        return new AlphaMaskFilter(this.mask)
    };
    p.toString = function() {
        return "[AlphaMaskFilter]"
    };
    createjs.AlphaMaskFilter = AlphaMaskFilter
})();
this.createjs = this.createjs || {};
(function() {
    var ColorFilter = function(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        this.initialize(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset)
    };
    var p = ColorFilter.prototype = new createjs.Filter;
    p.redMultiplier = 1;
    p.greenMultiplier = 1;
    p.blueMultiplier = 1;
    p.alphaMultiplier = 1;
    p.redOffset = 0;
    p.greenOffset = 0;
    p.blueOffset = 0;
    p.alphaOffset = 0;
    p.initialize = function(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        this.redMultiplier = redMultiplier != null ? redMultiplier : 1;
        this.greenMultiplier = greenMultiplier != null ? greenMultiplier : 1;
        this.blueMultiplier = blueMultiplier != null ? blueMultiplier : 1;
        this.alphaMultiplier = alphaMultiplier != null ? alphaMultiplier : 1;
        this.redOffset = redOffset || 0;
        this.greenOffset = greenOffset || 0;
        this.blueOffset = blueOffset || 0;
        this.alphaOffset = alphaOffset || 0
    };
    p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
        targetCtx = targetCtx || ctx;
        if (targetX == null) targetX = x;
        if (targetY == null) targetY = y;
        try {
            var imageData = ctx.getImageData(x, y, width, height)
        } catch (e) {
            return false
        }
        var data = imageData.data;
        var l = data.length;
        for (var i = 0; i < l; i += 4) {
            data[i] = data[i] * this.redMultiplier + this.redOffset;
            data[i + 1] = data[i + 1] * this.greenMultiplier + this.greenOffset;
            data[i + 2] = data[i + 2] * this.blueMultiplier + this.blueOffset;
            data[i + 3] = data[i + 3] * this.alphaMultiplier + this.alphaOffset
        }
        targetCtx.putImageData(imageData, targetX, targetY);
        return true
    };
    p.toString = function() {
        return "[ColorFilter]"
    };
    p.clone = function() {
        return new ColorFilter(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
    };
    createjs.ColorFilter = ColorFilter
})();
this.createjs = this.createjs || {};
(function() {
    var ColorMatrix = function(brightness, contrast, saturation, hue) {
        this.initialize(brightness, contrast, saturation, hue)
    };
    var p = ColorMatrix.prototype = [];
    ColorMatrix.DELTA_INDEX = [0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10];
    ColorMatrix.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
    ColorMatrix.LENGTH = ColorMatrix.IDENTITY_MATRIX.length;
    p.initialize = function(brightness, contrast, saturation, hue) {
        this.reset();
        this.adjustColor(brightness, contrast, saturation, hue);
        return this
    };
    p.reset = function() {
        return this.copyMatrix(ColorMatrix.IDENTITY_MATRIX)
    };
    p.adjustColor = function(brightness, contrast, saturation, hue) {
        this.adjustHue(hue);
        this.adjustContrast(contrast);
        this.adjustBrightness(brightness);
        return this.adjustSaturation(saturation)
    };
    p.adjustBrightness = function(value) {
        if (value == 0 || isNaN(value)) return this;
        value = this._cleanValue(value, 255);
        this._multiplyMatrix([1, 0, 0, 0, value, 0, 1, 0, 0, value, 0, 0, 1, 0, value, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    };
    p.adjustContrast = function(value) {
        if (value == 0 || isNaN(value)) return this;
        value = this._cleanValue(value, 100);
        var x;
        if (value < 0) x = 127 + value / 100 * 127;
        else {
            x = value % 1;
            if (x == 0) x = ColorMatrix.DELTA_INDEX[value];
            else x = ColorMatrix.DELTA_INDEX[value << 0] * (1 - x) + ColorMatrix.DELTA_INDEX[(value << 0) + 1] * x;
            x = x * 127 + 127
        }
        this._multiplyMatrix([x / 127, 0, 0, 0, 0.5 * (127 - x), 0, x / 127, 0, 0, 0.5 * (127 - x), 0, 0, x / 127, 0, 0.5 * (127 - x), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    };
    p.adjustSaturation = function(value) {
        if (value == 0 || isNaN(value)) return this;
        value = this._cleanValue(value, 100);
        var x = 1 + (value > 0 ? 3 * value / 100 : value / 100);
        var lumR = 0.3086;
        var lumG = 0.6094;
        var lumB = 0.082;
        this._multiplyMatrix([lumR * (1 - x) + x, lumG * (1 - x), lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x) + x, lumB * (1 - x), 0, 0, lumR * (1 - x), lumG * (1 - x), lumB * (1 - x) + x, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    };
    p.adjustHue = function(value) {
        if (value == 0 || isNaN(value)) return this;
        value = this._cleanValue(value, 180) / 180 * Math.PI;
        var cosVal = Math.cos(value);
        var sinVal = Math.sin(value);
        var lumR = 0.213;
        var lumG = 0.715;
        var lumB = 0.072;
        this._multiplyMatrix([lumR + cosVal * (1 - lumR) + sinVal * -lumR, lumG + cosVal * -lumG + sinVal * -lumG, lumB + cosVal * -lumB + sinVal * (1 - lumB), 0, 0, lumR + cosVal * -lumR + sinVal * 0.143, lumG + cosVal * (1 - lumG) + sinVal * 0.14, lumB + cosVal * -lumB + sinVal * -0.283, 0, 0, lumR + cosVal * -lumR + sinVal * -(1 - lumR), lumG + cosVal * -lumG + sinVal * lumG, lumB + cosVal * (1 - lumB) + sinVal * lumB, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    };
    p.concat = function(matrix) {
        matrix = this._fixMatrix(matrix);
        if (matrix.length != ColorMatrix.LENGTH) return this;
        this._multiplyMatrix(matrix);
        return this
    };
    p.clone = function() {
        return new ColorMatrix(this)
    };
    p.toArray = function() {
        return this.slice(0, ColorMatrix.LENGTH)
    };
    p.copyMatrix = function(matrix) {
        var l = ColorMatrix.LENGTH;
        for (var i = 0; i < l; i++) this[i] = matrix[i];
        return this
    };
    p._multiplyMatrix = function(matrix) {
        var col = [];
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) col[j] = this[j + i * 5];
            for (var j = 0; j < 5; j++) {
                var val = 0;
                for (var k = 0; k < 5; k++) val += matrix[j + k * 5] * col[k];
                this[j + i * 5] = val
            }
        }
    };
    p._cleanValue = function(value, limit) {
        return Math.min(limit, Math.max(-limit, value))
    };
    p._fixMatrix = function(matrix) {
        if (matrix instanceof ColorMatrix) matrix = matrix.slice(0);
        if (matrix.length < ColorMatrix.LENGTH) matrix = matrix.slice(0, matrix.length).concat(ColorMatrix.IDENTITY_MATRIX.slice(matrix.length, ColorMatrix.LENGTH));
        else if (matrix.length > ColorMatrix.LENGTH) matrix = matrix.slice(0, ColorMatrix.LENGTH);
        return matrix
    };
    createjs.ColorMatrix = ColorMatrix
})();
this.createjs = this.createjs || {};
(function() {
    var ColorMatrixFilter = function(matrix) {
        this.initialize(matrix)
    };
    var p = ColorMatrixFilter.prototype = new createjs.Filter;
    p.matrix = null;
    p.initialize = function(matrix) {
        this.matrix = matrix
    };
    p.applyFilter = function(ctx, x, y, width, height, targetCtx, targetX, targetY) {
        targetCtx = targetCtx || ctx;
        if (targetX == null) targetX = x;
        if (targetY == null) targetY = y;
        try {
            var imageData = ctx.getImageData(x, y, width, height)
        } catch (e) {
            return false
        }
        var data = imageData.data;
        var l = data.length;
        var r, g, b, a;
        var mtx = this.matrix;
        var m0 = mtx[0],
            m1 = mtx[1],
            m2 = mtx[2],
            m3 = mtx[3],
            m4 = mtx[4];
        var m5 = mtx[5],
            m6 = mtx[6],
            m7 = mtx[7],
            m8 = mtx[8],
            m9 = mtx[9];
        var m10 = mtx[10],
            m11 = mtx[11],
            m12 = mtx[12],
            m13 = mtx[13],
            m14 = mtx[14];
        var m15 = mtx[15],
            m16 = mtx[16],
            m17 = mtx[17],
            m18 = mtx[18],
            m19 = mtx[19];
        for (var i = 0; i < l; i += 4) {
            r = data[i];
            g = data[i + 1];
            b = data[i + 2];
            a = data[i + 3];
            data[i] = r * m0 + g * m1 + b * m2 + a * m3 + m4;
            data[i + 1] = r * m5 + g * m6 + b * m7 + a * m8 + m9;
            data[i + 2] = r * m10 + g * m11 + b * m12 + a * m13 + m14;
            data[i + 3] = r * m15 + g * m16 + b * m17 + a * m18 + m19
        }
        targetCtx.putImageData(imageData, targetX, targetY);
        return true
    };
    p.toString = function() {
        return "[ColorMatrixFilter]"
    };
    p.clone = function() {
        return new ColorMatrixFilter(this.matrix)
    };
    createjs.ColorMatrixFilter = ColorMatrixFilter
})();
this.createjs = this.createjs || {};
(function() {
    var Touch = function() {
        throw "Touch cannot be instantiated";
    };
    Touch.isSupported = function() {
        return "ontouchstart" in window || window.navigator["msPointerEnabled"] && window.navigator["msMaxTouchPoints"] > 0
    };
    Touch.enable = function(stage, singleTouch, allowDefault) {
        if (!stage || (!stage.canvas || !Touch.isSupported())) return false;
        stage.__touch = {
            pointers: {},
            multitouch: !singleTouch,
            preventDefault: !allowDefault,
            count: 0
        };
        if ("ontouchstart" in window) Touch._IOS_enable(stage);
        else if (window.navigator["msPointerEnabled"]) Touch._IE_enable(stage);
        return true
    };
    Touch.disable = function(stage) {
        if (!stage) return;
        if ("ontouchstart" in window) Touch._IOS_disable(stage);
        else if (window.navigator["msPointerEnabled"]) Touch._IE_disable(stage)
    };
    Touch._IOS_enable = function(stage) {
        var canvas = stage.canvas;
        var f = stage.__touch.f = function(e) {
            Touch._IOS_handleEvent(stage, e)
        };
        canvas.addEventListener("touchstart", f, false);
        canvas.addEventListener("touchmove", f, false);
        canvas.addEventListener("touchend", f, false);
        canvas.addEventListener("touchcancel", f, false)
    };
    Touch._IOS_disable = function(stage) {
        var canvas = stage.canvas;
        if (!canvas) return;
        var f = stage.__touch.f;
        canvas.removeEventListener("touchstart", f, false);
        canvas.removeEventListener("touchmove", f, false);
        canvas.removeEventListener("touchend", f, false);
        canvas.removeEventListener("touchcancel", f, false)
    };
    Touch._IOS_handleEvent = function(stage, e) {
        if (!stage) return;
        if (stage.__touch.preventDefault) e.preventDefault && e.preventDefault();
        var touches = e.changedTouches;
        var type = e.type;
        for (var i = 0, l = touches.length; i < l; i++) {
            var touch = touches[i];
            var id = touch.identifier;
            if (touch.target != stage.canvas) continue;
            if (type == "touchstart") this._handleStart(stage, id, e, touch.pageX, touch.pageY);
            else if (type == "touchmove") this._handleMove(stage, id, e, touch.pageX, touch.pageY);
            else if (type == "touchend" || type == "touchcancel") this._handleEnd(stage, id, e)
        }
    };
    Touch._IE_enable = function(stage) {
        var canvas = stage.canvas;
        var f = stage.__touch.f = function(e) {
            Touch._IE_handleEvent(stage, e)
        };
        canvas.addEventListener("MSPointerDown", f, false);
        window.addEventListener("MSPointerMove", f, false);
        window.addEventListener("MSPointerUp", f, false);
        window.addEventListener("MSPointerCancel", f, false);
        if (stage.__touch.preventDefault) canvas.style.msTouchAction = "none";
        stage.__touch.activeIDs = {}
    };
    Touch._IE_disable = function(stage) {
        var f = stage.__touch.f;
        window.removeEventListener("MSPointerMove", f, false);
        window.removeEventListener("MSPointerUp", f, false);
        window.removeEventListener("MSPointerCancel", f, false);
        if (stage.canvas) stage.canvas.removeEventListener("MSPointerDown", f, false)
    };
    Touch._IE_handleEvent = function(stage, e) {
        if (!stage) return;
        if (stage.__touch.preventDefault) e.preventDefault && e.preventDefault();
        var type = e.type;
        var id = e.pointerId;
        var ids = stage.__touch.activeIDs;
        if (type == "MSPointerDown") {
            if (e.srcElement != stage.canvas) return;
            ids[id] = true;
            this._handleStart(stage, id, e, e.pageX, e.pageY)
        } else if (ids[id]) if (type == "MSPointerMove") this._handleMove(stage, id, e, e.pageX, e.pageY);
        else if (type == "MSPointerUp" || type == "MSPointerCancel") {
            delete ids[id];
            this._handleEnd(stage, id, e)
        }
    };
    Touch._handleStart = function(stage, id, e, x, y) {
        var props = stage.__touch;
        if (!props.multitouch && props.count) return;
        var ids = props.pointers;
        if (ids[id]) return;
        ids[id] = true;
        props.count++;
        stage._handlePointerDown(id, e, x, y)
    };
    Touch._handleMove = function(stage, id, e, x, y) {
        if (!stage.__touch.pointers[id]) return;
        stage._handlePointerMove(id, e, x, y)
    };
    Touch._handleEnd = function(stage, id, e) {
        var props = stage.__touch;
        var ids = props.pointers;
        if (!ids[id]) return;
        props.count--;
        stage._handlePointerUp(id, e, true);
        delete ids[id]
    };
    createjs.Touch = Touch
})();
this.createjs = this.createjs || {};
(function() {
    var s = createjs.EaselJS = createjs.EaselJS || {};
    s.version = "NEXT";
    s.buildDate = "Sun, 06 Oct 2013 10:56:52 GMT"
})();
(function() {
    var stageMouseDownHandler = createjs.Stage.prototype._handlePointerDown;
    var stageMouseUpHandler = createjs.Stage.prototype._handlePointerUp;
    var isTouchEventSystem = false;
    if (navigator.userAgent.indexOf("Android") > -1) {
        createjs.Stage.prototype._handlePointerDown = function(id, event, pageX, pageY) {
            if (event.touches) {
                isTouchEventSystem = true;
                this.enableDOMEvents(false)
            } else; if (!isTouchEventSystem) {
                event.screenX = event.x;
                event.screenY = event.y;
                stageMouseDownHandler.call(this, id, event, pageX, pageY)
            } else if (event.touches && typeof event.touches[0].pageX != "undefined") {
                event.screenX = event.touches[0].pageX;
                event.screenY = event.touches[0].pageY;
                stageMouseDownHandler.call(this, id, event, pageX, pageY)
            }
        };
        createjs.Stage.prototype._handlePointerUp = function(id, event, clear) {
            if (event.changedTouches) isTouchEventSystem = true;
            if (!isTouchEventSystem) {
                event.screenX = event.x;
                event.screenY = event.y;
                stageMouseUpHandler.call(this, id, event, clear)
            } else if (event.changedTouches && typeof event.changedTouches[0].pageX != "undefined") {
                event.screenX = event.changedTouches[0].pageX;
                event.screenY = event.changedTouches[0].pageY;
                stageMouseUpHandler.call(this, id, event, clear)
            }
        }
    }
})();
this.createjs = this.createjs || {}, function() {
    var a = createjs.PreloadJS = createjs.PreloadJS || {};
    a.version = "0.4.0", a.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
}(), this.createjs = this.createjs || {}, function() {
    var a = function(a, b, c) {
            this.initialize(a, b, c)
        },
        b = a.prototype;
    b.type = null, b.target = null, b.currentTarget = null, b.eventPhase = 0, b.bubbles = !1, b.cancelable = !1, b.timeStamp = 0, b.defaultPrevented = !1, b.propagationStopped = !1, b.immediatePropagationStopped = !1, b.removed = !1, b.initialize = function(a, b, c) {
        this.type = a, this.bubbles = b, this.cancelable = c, this.timeStamp = (new Date).getTime()
    }, b.preventDefault = function() {
        this.defaultPrevented = !0
    }, b.stopPropagation = function() {
        this.propagationStopped = !0
    }, b.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }, b.remove = function() {
        this.removed = !0
    }, b.clone = function() {
        return new a(this.type, this.bubbles, this.cancelable)
    }, b.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }, createjs.Event = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function() {},
        b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent
    }, b._listeners = null, b._captureListeners = null, b.initialize = function() {}, b.addEventListener = function(a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b
    }, b.on = function(a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function(a) {
            b.call(c, a, e), d && a.remove()
        }, f)
    }, b.removeEventListener = function(a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e) for (var f = 0, g = e.length; g > f; f++) if (e[f] == b) {
                1 == g ? delete d[a] : e.splice(f, 1);
                break
            }
        }
    }, b.off = b.removeEventListener, b.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }, b.dispatchEvent = function(a, b) {
        if ("string" == typeof a) {
            var c = this._listeners;
            if (!c || !c[a]) return !1;
            a = new createjs.Event(a)
        }
        if (a.target = b || this, a.bubbles && this.parent) {
            for (var d = this, e = [d]; d.parent;) e.push(d = d.parent);
            var f, g = e.length;
            for (f = g - 1; f >= 0 && !a.propagationStopped; f--) e[f]._dispatchEvent(a, 1 + (0 == f));
            for (f = 1; g > f && !a.propagationStopped; f++) e[f]._dispatchEvent(a, 3)
        } else this._dispatchEvent(a, 2);
        return a.defaultPrevented
    }, b.hasEventListener = function(a) {
        var b = this._listeners,
            c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }, b.toString = function() {
        return "[EventDispatcher]"
    }, b._dispatchEvent = function(a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length)) return;
            a.currentTarget = this, a.eventPhase = b, a.removed = !1, e = e.slice();
            for (var f = 0; c > f && !a.immediatePropagationStopped; f++) {
                var g = e[f];
                g.handleEvent ? g.handleEvent(a) : g(a), a.removed && (this.off(a.type, g, 1 == b), a.removed = !1)
            }
        }
    }, createjs.EventDispatcher = a
}(), this.createjs = this.createjs || {}, function() {
    createjs.indexOf = function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (b === a[c]) return c;
        return -1
    }
}(), this.createjs = this.createjs || {}, function() {
    createjs.proxy = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return function() {
            return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c))
        }
    }
}(), this.createjs = this.createjs || {}, function() {
    var a = function() {
        this.init()
    };
    a.prototype = {};
    var b = a.prototype,
        c = a;
    c.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/, b.loaded = !1, b.canceled = !1, b.progress = 0, b._item = null, b._basePath = null, b.addEventListener = null, b.removeEventListener = null, b.removeAllEventListeners = null, b.dispatchEvent = null, b.hasEventListener = null, b._listeners = null, createjs.EventDispatcher.initialize(b), b.getItem = function() {
        return this._item
    }, b.init = function() {}, b.load = function() {}, b.close = function() {}, b._sendLoadStart = function() {
        this._isCanceled() || this.dispatchEvent("loadstart")
    }, b._sendProgress = function(a) {
        if (!this._isCanceled()) {
            var b = null;
            "number" == typeof a ? (this.progress = a, b = new createjs.Event("progress"), b.loaded = this.progress, b.total = 1) : (b = a, this.progress = a.loaded / a.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)), b.progress = this.progress, this.hasEventListener("progress") && this.dispatchEvent(b)
        }
    }, b._sendComplete = function() {
        this._isCanceled() || this.dispatchEvent("complete")
    }, b._sendError = function(a) {
        !this._isCanceled() && (this.hasEventListener("error") && (null == a && (a = new createjs.Event("error")), this.dispatchEvent(a)))
    }, b._isCanceled = function() {
        return null == window.createjs || this.canceled ? !0 : !1
    }, b._parseURI = function(a) {
        return a ? a.match(c.FILE_PATTERN) : null
    }, b._formatQueryString = function(a, b) {
        if (null == a) throw new Error("You must specify data.");
        var c = [];
        for (var d in a) c.push(d + "=" + escape(a[d]));
        return b && (c = c.concat(b)), c.join("&")
    }, b.buildPath = function(a, b, c) {
        if (null != b) {
            var d = this._parseURI(a);
            (null == d || (null == d[1] || "" == d[1])) && (a = b + a)
        }
        if (null == c) return a;
        var e = [],
            f = a.indexOf("?");
        if (-1 != f) {
            var g = a.slice(f + 1);
            e = e.concat(g.split("&"))
        }
        return -1 != f ? a.slice(0, f) + "?" + this._formatQueryString(c, e) : a + "?" + this._formatQueryString(c, e)
    }, b.toString = function() {
        return "[PreloadJS AbstractLoader]"
    }, createjs.AbstractLoader = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function(a, b) {
            this.init(a, b)
        },
        b = a.prototype = new createjs.AbstractLoader,
        c = a;
    c.LOAD_TIMEOUT = 8E3, c.BINARY = "binary", c.CSS = "css", c.IMAGE = "image", c.JAVASCRIPT = "javascript", c.JSON = "json", c.JSONP = "jsonp", c.SOUND = "sound", c.SVG = "svg", c.TEXT = "text", c.XML = "xml", c.POST = "POST", c.GET = "GET", b.useXHR = !0, b.stopOnError = !1, b.maintainScriptOrder = !0, b.next = null, b._typeCallbacks = null, b._extensionCallbacks = null, b._loadStartWasDispatched = !1, b._maxConnections = 1, b._currentlyLoadingScript = null, b._currentLoads = null, b._loadQueue = null, b._loadQueueBackup = null, b._loadItemsById = null, b._loadItemsBySrc = null, b._loadedResults = null, b._loadedRawResults = null, b._numItems = 0, b._numItemsLoaded = 0, b._scriptOrder = null, b._loadedScripts = null, b.init = function(a, b) {
        this._numItems = this._numItemsLoaded = 0, this._paused = !1, this._loadStartWasDispatched = !1, this._currentLoads = [], this._loadQueue = [], this._loadQueueBackup = [], this._scriptOrder = [], this._loadedScripts = [], this._loadItemsById = {}, this._loadItemsBySrc = {}, this._loadedResults = {}, this._loadedRawResults = {}, this._typeCallbacks = {}, this._extensionCallbacks = {}, this._basePath = b, this.setUseXHR(a)
    }, b.setUseXHR = function(a) {
        return this.useXHR = 0 != a && null != window.XMLHttpRequest, this.useXHR
    }, b.removeAll = function() {
        this.remove()
    }, b.remove = function(a) {
        var b = null;
        if (!a || a instanceof Array) if (a) b = a;
        else {
            if (arguments.length > 0) return
        } else b = [a];
        var c = !1;
        if (b) {
            for (; b.length;) {
                var d = b.pop(),
                    e = this.getResult(d);
                for (f = this._loadQueue.length - 1; f >= 0; f--) if (g = this._loadQueue[f].getItem(), g.id == d || g.src == d) {
                    this._loadQueue.splice(f, 1)[0].cancel();
                    break
                }
                for (f = this._loadQueueBackup.length - 1; f >= 0; f--) if (g = this._loadQueueBackup[f].getItem(), g.id == d || g.src == d) {
                    this._loadQueueBackup.splice(f, 1)[0].cancel();
                    break
                }
                if (e) delete this._loadItemsById[e.id], delete this._loadItemsBySrc[e.src], this._disposeItem(e);
                else for (var f = this._currentLoads.length - 1; f >= 0; f--) {
                    var g = this._currentLoads[f].getItem();
                    if (g.id == d || g.src == d) {
                        this._currentLoads.splice(f, 1)[0].cancel(), c = !0;
                        break
                    }
                }
            }
            c && this._loadNext()
        } else {
            this.close();
            for (var h in this._loadItemsById) this._disposeItem(this._loadItemsById[h]);
            this.init(this.useXHR)
        }
    }, b.reset = function() {
        this.close();
        for (var a in this._loadItemsById) this._disposeItem(this._loadItemsById[a]);
        var b = [];
        for (i = 0, l = this._loadQueueBackup.length; l > i; i++) b.push(this._loadQueueBackup[i].getItem());
        this.loadManifest(b, !1)
    }, c.isBinary = function(a) {
        switch (a) {
            case createjs.LoadQueue.IMAGE:
            case createjs.LoadQueue.BINARY:
                return !0;
            default:
                return !1
        }
    }, b.installPlugin = function(a) {
        if (null != a && null != a.getPreloadHandlers) {
            var b = a.getPreloadHandlers();
            if (null != b.types) for (var c = 0, d = b.types.length; d > c; c++) this._typeCallbacks[b.types[c]] = b.callback;
            if (null != b.extensions) for (c = 0, d = b.extensions.length; d > c; c++) this._extensionCallbacks[b.extensions[c]] = b.callback
        }
    }, b.setMaxConnections = function(a) {
        this._maxConnections = a, !this._paused && (this._loadQueue.length > 0 && this._loadNext())
    }, b.loadFile = function(a, b, c) {
        if (null == a) {
            var d = new createjs.Event("error");
            return d.text = "PRELOAD_NO_FILE", this._sendError(d), void 0
        }
        this._addItem(a, c), b !== !1 ? this.setPaused(!1) : this.setPaused(!0)
    }, b.loadManifest = function(a, b, c) {
        var d = null;
        if (a instanceof Array) {
            if (0 == a.length) {
                var e = new createjs.Event("error");
                return e.text = "PRELOAD_MANIFEST_EMPTY", this._sendError(e), void 0
            }
            d = a
        } else {
            if (null == a) {
                var e = new createjs.Event("error");
                return e.text = "PRELOAD_MANIFEST_NULL", this._sendError(e), void 0
            }
            d = [a]
        }
        for (var f = 0, g = d.length; g > f; f++) this._addItem(d[f], c);
        b !== !1 ? this.setPaused(!1) : this.setPaused(!0)
    }, b.load = function() {
        this.setPaused(!1)
    }, b.getItem = function(a) {
        return this._loadItemsById[a] || this._loadItemsBySrc[a]
    }, b.getResult = function(a, b) {
        var c = this._loadItemsById[a] || this._loadItemsBySrc[a];
        if (null == c) return null;
        var d = c.id;
        return b && this._loadedRawResults[d] ? this._loadedRawResults[d] : this._loadedResults[d]
    }, b.setPaused = function(a) {
        this._paused = a, this._paused || this._loadNext()
    }, b.close = function() {
        for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
        this._scriptOrder.length = 0, this._loadedScripts.length = 0, this.loadStartWasDispatched = !1
    }, b._addItem = function(a, b) {
        var c = this._createLoadItem(a);
        if (null != c) {
            var d = this._createLoader(c, b);
            null != d && (this._loadQueue.push(d), this._loadQueueBackup.push(d), this._numItems++, this._updateProgress(), this.maintainScriptOrder && (c.type == createjs.LoadQueue.JAVASCRIPT && (d instanceof createjs.XHRLoader && (this._scriptOrder.push(c), this._loadedScripts.push(null)))))
        }
    }, b._createLoadItem = function(a) {
        var b = null;
        switch (typeof a) {
            case "string":
                b = {
                    src: a
                };
                break;
            case "object":
                b = window.HTMLAudioElement && a instanceof HTMLAudioElement ? {
                    tag: a,
                    src: b.tag.src,
                    type: createjs.LoadQueue.SOUND
                } : a;
                break;
            default:
                return null
        }
        var c = this._parseURI(b.src);
        if (null != c && (b.ext = c[5]), null == b.type && (b.type = this._getTypeByExtension(b.ext)), b.type == createjs.LoadQueue.JSON && (null != b.callback && (b.type = createjs.LoadQueue.JSONP)), b.type == createjs.LoadQueue.JSONP && null == b.callback) throw new Error("callback is required for loading JSONP requests.");
        null == b.tag && (b.tag = this._createTag(b.type)), (null == b.id || "" == b.id) && (b.id = b.src);
        var d = this._typeCallbacks[b.type] || this._extensionCallbacks[b.ext];
        if (d) {
            var e = d(b.src, b.type, b.id, b.data);
            if (e === !1) return null;
            e === !0 || (null != e.src && (b.src = e.src), null != e.id && (b.id = e.id), null != e.tag && (e.tag.load instanceof Function && (b.tag = e.tag)), null != e.completeHandler && (b.completeHandler = e.completeHandler)), e.type && (b.type = e.type), c = this._parseURI(b.src), null != c && (null != c[5] && (b.ext = c[5].toLowerCase()))
        }
        return this._loadItemsById[b.id] = b, this._loadItemsBySrc[b.src] = b, b
    }, b._createLoader = function(a, b) {
        var c = this.useXHR;
        switch (a.type) {
            case createjs.LoadQueue.JSON:
            case createjs.LoadQueue.XML:
            case createjs.LoadQueue.TEXT:
                c = !0;
                break;
            case createjs.LoadQueue.SOUND:
            case createjs.LoadQueue.JSONP:
                c = !1;
                break;
            case null:
                return null
        }
        return null == b && (b = this._basePath), c ? new createjs.XHRLoader(a, b) : new createjs.TagLoader(a, b)
    }, b._loadNext = function() {
        if (!this._paused) {
            this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0), this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && (this.next.load && this.next.load())) : this.loaded = !1;
            for (var a = 0; a < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); a++) {
                var b = this._loadQueue[a];
                if (this.maintainScriptOrder && (b instanceof createjs.TagLoader && b.getItem().type == createjs.LoadQueue.JAVASCRIPT)) {
                    if (this._currentlyLoadingScript) continue;
                    this._currentlyLoadingScript = !0
                }
                this._loadQueue.splice(a, 1), a--, this._loadItem(b)
            }
        }
    }, b._loadItem = function(a) {
        a.addEventListener("progress", createjs.proxy(this._handleProgress, this)), a.addEventListener("complete", createjs.proxy(this._handleFileComplete, this)), a.addEventListener("error", createjs.proxy(this._handleFileError, this)), this._currentLoads.push(a), this._sendFileStart(a.getItem()), a.load()
    }, b._handleFileError = function(a) {
        var b = a.target;
        this._numItemsLoaded++, this._updateProgress();
        var a = new createjs.Event("error");
        a.text = "FILE_LOAD_ERROR", a.item = b.getItem(), this._sendError(a), this.stopOnError || (this._removeLoadItem(b), this._loadNext())
    }, b._handleFileComplete = function(a) {
        var b = a.target,
            c = b.getItem();
        if (this._loadedResults[c.id] = b.getResult(), b instanceof createjs.XHRLoader && (this._loadedRawResults[c.id] = b.getResult(!0)), this._removeLoadItem(b), this.maintainScriptOrder && c.type == createjs.LoadQueue.JAVASCRIPT) {
            if (!(b instanceof
                createjs.TagLoader)) return this._loadedScripts[createjs.indexOf(this._scriptOrder, c)] = c, this._checkScriptLoadOrder(b), void 0;
            this._currentlyLoadingScript = !1
        }
        this._processFinishedLoad(c, b)
    }, b._processFinishedLoad = function(a, b) {
        this._numItemsLoaded++, this._updateProgress(), this._sendFileComplete(a, b), this._loadNext()
    }, b._checkScriptLoadOrder = function() {
        for (var a = this._loadedScripts.length, b = 0; a > b; b++) {
            var c = this._loadedScripts[b];
            if (null === c) break;
            c !== !0 && (this._processFinishedLoad(c), this._loadedScripts[b] = !0, b--, a--)
        }
    }, b._removeLoadItem = function(a) {
        for (var b = this._currentLoads.length, c = 0; b > c; c++) if (this._currentLoads[c] == a) {
            this._currentLoads.splice(c, 1);
            break
        }
    }, b._handleProgress = function(a) {
        var b = a.target;
        this._sendFileProgress(b.getItem(), b.progress), this._updateProgress()
    }, b._updateProgress = function() {
        var a = this._numItemsLoaded / this._numItems,
            b = this._numItems - this._numItemsLoaded;
        if (b > 0) {
            for (var c = 0, d = 0, e = this._currentLoads.length; e > d; d++) c += this._currentLoads[d].progress;
            a += c / b * (b / this._numItems)
        }
        this._sendProgress(a)
    }, b._disposeItem = function(a) {
        delete this._loadedResults[a.id], delete this._loadedRawResults[a.id], delete this._loadItemsById[a.id], delete this._loadItemsBySrc[a.src]
    }, b._createTag = function(a) {
        var b = null;
        switch (a) {
            case createjs.LoadQueue.IMAGE:
                return document.createElement("img");
            case createjs.LoadQueue.SOUND:
                return b = document.createElement("audio"), b.autoplay = !1, b;
            case createjs.LoadQueue.JSONP:
            case createjs.LoadQueue.JAVASCRIPT:
                return b = document.createElement("script"), b.type = "text/javascript", b;
            case createjs.LoadQueue.CSS:
                return b = this.useXHR ? document.createElement("style") : document.createElement("link"), b.rel = "stylesheet", b.type = "text/css", b;
            case createjs.LoadQueue.SVG:
                return this.useXHR ? b = document.createElement("svg") : (b = document.createElement("object"), b.type = "image/svg+xml"), b
        }
        return null
    }, b._getTypeByExtension = function(a) {
        if (null == a) return createjs.LoadQueue.TEXT;
        switch (a.toLowerCase()) {
            case "jpeg":
            case "jpg":
            case "gif":
            case "png":
            case "webp":
            case "bmp":
                return createjs.LoadQueue.IMAGE;
            case "ogg":
            case "mp3":
            case "wav":
                return createjs.LoadQueue.SOUND;
            case "json":
                return createjs.LoadQueue.JSON;
            case "xml":
                return createjs.LoadQueue.XML;
            case "css":
                return createjs.LoadQueue.CSS;
            case "js":
                return createjs.LoadQueue.JAVASCRIPT;
            case "svg":
                return createjs.LoadQueue.SVG;
            default:
                return createjs.LoadQueue.TEXT
        }
    }, b._sendFileProgress = function(a, b) {
        if (this._isCanceled()) return this._cleanUp(), void 0;
        if (this.hasEventListener("fileprogress")) {
            var c = new createjs.Event("fileprogress");
            c.progress = b, c.loaded = b, c.total = 1, c.item = a, this.dispatchEvent(c)
        }
    }, b._sendFileComplete = function(a, b) {
        if (!this._isCanceled()) {
            var c = new createjs.Event("fileload");
            c.loader = b, c.item = a, c.result = this._loadedResults[a.id], c.rawResult = this._loadedRawResults[a.id], a.completeHandler && a.completeHandler(c), this.hasEventListener("fileload") && this.dispatchEvent(c)
        }
    }, b._sendFileStart = function(a) {
        var b = new createjs.Event("filestart");
        b.item = a, this.hasEventListener("filestart") && this.dispatchEvent(b)
    }, b.toString = function() {
        return "[PreloadJS LoadQueue]"
    }, createjs.LoadQueue = a;
    var d = function() {};
    d.init = function() {
        var a = navigator.userAgent;
        d.isFirefox = a.indexOf("Firefox") > -1, d.isOpera = null != window.opera, d.isChrome = a.indexOf("Chrome") > -1, d.isIOS = a.indexOf("iPod") > -1 || (a.indexOf("iPhone") > -1 || a.indexOf("iPad") > -1)
    }, d.init(), createjs.LoadQueue.BrowserDetect = d
}(), this.createjs = this.createjs || {}, function() {
    var a = function(a, b) {
            this.init(a, b)
        },
        b = a.prototype = new createjs.AbstractLoader;
    b._loadTimeout = null, b._tagCompleteProxy = null, b._isAudio = !1, b._tag = null, b._jsonResult = null, b.init = function(a, b) {
        this._item = a, this._basePath = b, this._tag = a.tag, this._isAudio = window.HTMLAudioElement && a.tag instanceof HTMLAudioElement, this._tagCompleteProxy = createjs.proxy(this._handleLoad, this)
    }, b.getResult = function() {
        return this._item.type == createjs.LoadQueue.JSONP ? this._jsonResult : this._tag
    }, b.cancel = function() {
        this.canceled = !0, this._clean(), this.getItem()
    }, b.load = function() {
        var a = this._item,
            b = this._tag;
        clearTimeout(this._loadTimeout), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT), this._isAudio && (b.src = null, b.preload = "auto"), b.onerror = createjs.proxy(this._handleError, this), this._isAudio ? (b.onstalled = createjs.proxy(this._handleStalled, this), b.addEventListener("canplaythrough", this._tagCompleteProxy, !1)) : (b.onload = createjs.proxy(this._handleLoad, this), b.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this));
        var c = this.buildPath(a.src, this._basePath, a.values);
        switch (a.type) {
            case createjs.LoadQueue.CSS:
                b.href = c;
                break;
            case createjs.LoadQueue.SVG:
                b.data = c;
                break;
            default:
                b.src = c
        }
        if (a.type == createjs.LoadQueue.JSONP) {
            if (null == a.callback) throw new Error("callback is required for loading JSONP requests.");
            if (null != window[a.callback]) throw new Error('JSONP callback "' + a.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
            window[a.callback] = createjs.proxy(this._handleJSONPLoad, this)
        }(a.type == createjs.LoadQueue.SVG || (a.type == createjs.LoadQueue.JSONP || (a.type == createjs.LoadQueue.JSON || (a.type == createjs.LoadQueue.JAVASCRIPT || a.type == createjs.LoadQueue.CSS)))) && (this._startTagVisibility = b.style.visibility, b.style.visibility = "hidden", (document.body || document.getElementsByTagName("body")[0]).appendChild(b)), null != b.load && b.load()
    }, b._handleJSONPLoad = function(a) {
        this._jsonResult = a
    }, b._handleTimeout = function() {
        this._clean();
        var a = new createjs.Event("error");
        a.text = "PRELOAD_TIMEOUT", this._sendError(a)
    }, b._handleStalled = function() {}, b._handleError = function() {
        this._clean();
        var a = new createjs.Event("error");
        this._sendError(a)
    }, b._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var a = this.getItem().tag;
        ("loaded" == a.readyState || "complete" == a.readyState) && this._handleLoad()
    }, b._handleLoad = function() {
        if (!this._isCanceled()) {
            var a = this.getItem(),
                b = a.tag;
            if (!(this.loaded || this.isAudio && 4 !== b.readyState)) {
                switch (this.loaded = !0, a.type) {
                    case createjs.LoadQueue.SVG:
                    case createjs.LoadQueue.JSONP:
                        b.style.visibility = this._startTagVisibility, (document.body || document.getElementsByTagName("body")[0]).removeChild(b)
                }
                this._clean(), this._sendComplete()
            }
        }
    }, b._clean = function() {
        clearTimeout(this._loadTimeout);
        var a = this.getItem().tag;
        a.onload = null, a.removeEventListener && a.removeEventListener("canplaythrough", this._tagCompleteProxy, !1), a.onstalled = null, a.onprogress = null, a.onerror = null, a.parentNode && a.parentNode.removeChild(a);
        var b = this.getItem();
        b.type == createjs.LoadQueue.JSONP && (window[b.callback] = null)
    }, b.toString = function() {
        return "[PreloadJS TagLoader]"
    }, createjs.TagLoader = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function(a, b) {
            this.init(a, b)
        },
        b = a.prototype = new createjs.AbstractLoader;
    b._request = null, b._loadTimeout = null, b._xhrLevel = 1, b._response = null, b._rawResponse = null, b.init = function(a, b) {
        this._item = a, this._basePath = b, !this._createXHR(a)
    }, b.getResult = function(a) {
        return a && this._rawResponse ? this._rawResponse : this._response
    }, b.cancel = function() {
        this.canceled = !0, this._clean(), this._request.abort()
    }, b.load = function() {
        if (null == this._request) return this._handleError(), void 0;
        this._request.onloadstart = createjs.proxy(this._handleLoadStart, this), this._request.onprogress = createjs.proxy(this._handleProgress, this), this._request.onabort = createjs.proxy(this._handleAbort, this), this._request.onerror = createjs.proxy(this._handleError, this), this._request.ontimeout = createjs.proxy(this._handleTimeout, this), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT)), this._request.onload = createjs.proxy(this._handleLoad, this), this._request.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
        try {
            this._item.values && this._item.method != createjs.LoadQueue.GET ? this._item.method == createjs.LoadQueue.POST && this._request.send(this._formatQueryString(this._item.values)) : this._request.send()
        } catch (a) {
            var b = new createjs.Event("error");
            b.error = a, this._sendError(b)
        }
    }, b.getAllResponseHeaders = function() {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
    }, b.getResponseHeader = function(a) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null
    }, b._handleProgress = function(a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
            var b = new createjs.Event("progress");
            b.loaded = a.loaded, b.total = a.total, this._sendProgress(b)
        }
    }, b._handleLoadStart = function() {
        clearTimeout(this._loadTimeout), this._sendLoadStart()
    }, b._handleAbort = function(a) {
        this._clean();
        var a = new createjs.Event("error");
        a.text = "XHR_ABORTED", this._sendError(a)
    }, b._handleError = function() {
        this._clean();
        var a = new createjs.Event("error");
        this._sendError(a)
    }, b._handleReadyStateChange = function() {
        4 == this._request.readyState && this._handleLoad()
    }, b._handleLoad = function() {
        if (!this.loaded) {
            if (this.loaded = !0, !this._checkError()) return this._handleError(), void 0;
            this._response = this._getResponse(), this._clean();
            var a = this._generateTag();
            a && this._sendComplete()
        }
    }, b._handleTimeout = function(a) {
        this._clean();
        var b = new createjs.Event("error");
        b.text = "PRELOAD_TIMEOUT", this._sendError(a)
    }, b._checkError = function() {
        var a = parseInt(this._request.status);
        switch (a) {
            case 404:
            case 0:
                return !1
        }
        return !0
    }, b._getResponse = function() {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
            if (null != this._request.responseText) return this._request.responseText
        } catch (a) {}
        try {
            if (null != this._request.responseXML) return this._request.responseXML
        } catch (a) {}
        return null
    }, b._createXHR = function(a) {
        var b = document.createElement("a");
        b.href = this.buildPath(a.src, this._basePath);
        var c = document.createElement("a");
        c.href = location.href;
        var d = "" != b.hostname && (b.port != c.port || (b.protocol != c.protocol || b.hostname != c.hostname)),
            e = null;
        if (d && window.XDomainRequest) e = new XDomainRequest;
        else if (window.XMLHttpRequest) e = new XMLHttpRequest;
        else try {
                e = new ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (f) {
                try {
                    e = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                } catch (f) {
                    try {
                        e = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (f) {
                        return !1
                    }
                }
            }
        a.type == createjs.LoadQueue.TEXT && (e.overrideMimeType && e.overrideMimeType("text/plain; charset=x-user-defined")), this._xhrLevel = "string" == typeof e.responseType ? 2 : 1;
        var g = null;
        return g = a.method == createjs.LoadQueue.GET ? this.buildPath(a.src, this._basePath, a.values) : this.buildPath(a.src, this._basePath), e.open(a.method || createjs.LoadQueue.GET, g, !0), d && (e instanceof XMLHttpRequest && (1 == this._xhrLevel && e.setRequestHeader("Origin", location.origin))), a.values && (a.method == createjs.LoadQueue.POST && e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")), createjs.LoadQueue.isBinary(a.type) && (e.responseType = "arraybuffer"), this._request = e, !0
    }, b._clean = function() {
        clearTimeout(this._loadTimeout);
        var a = this._request;
        a.onloadstart = null, a.onprogress = null, a.onabort = null, a.onerror = null, a.onload = null, a.ontimeout = null, a.onloadend = null, a.onreadystatechange = null
    }, b._generateTag = function() {
        var a = this._item.type,
            b = this._item.tag;
        switch (a) {
            case createjs.LoadQueue.IMAGE:
                return b.onload = createjs.proxy(this._handleTagReady, this), b.src = this.buildPath(this._item.src, this._basePath, this._item.values), this._rawResponse = this._response, this._response = b, !1;
            case createjs.LoadQueue.JAVASCRIPT:
                return b = document.createElement("script"), b.text = this._response, this._rawResponse = this._response, this._response = b, !0;
            case createjs.LoadQueue.CSS:
                var c = document.getElementsByTagName("head")[0];
                if (c.appendChild(b), b.styleSheet) b.styleSheet.cssText = this._response;
                else {
                    var d = document.createTextNode(this._response);
                    b.appendChild(d)
                }
                return this._rawResponse = this._response, this._response = b, !0;
            case createjs.LoadQueue.XML:
                var e = this._parseXML(this._response, "text/xml");
                return this._response = e, !0;
            case createjs.LoadQueue.SVG:
                var e = this._parseXML(this._response, "image/svg+xml");
                return this._rawResponse = this._response, null != e.documentElement ? (b.appendChild(e.documentElement), this._response = b) : this._response = e, !0;
            case createjs.LoadQueue.JSON:
                var f = {};
                try {
                    f = JSON.parse(this._response)
                } catch (g) {
                    f = g
                }
                return this._rawResponse = this._response, this._response = f, !0
        }
        return !0
    }, b._parseXML = function(a, b) {
        var c = null;
        if (window.DOMParser) {
            var d = new DOMParser;
            c = d.parseFromString(a, b)
        } else c = new ActiveXObject("Microsoft.XMLDOM"), c.async = !1, c.loadXML(a);
        return c
    }, b._handleTagReady = function() {
        this._sendComplete()
    }, b.toString = function() {
        return "[PreloadJS XHRLoader]"
    }, createjs.XHRLoader = a
}(), "object" != typeof JSON && (JSON = {}), function() {
    function f(a) {
        return 10 > a ? "0" + a : a
    }
    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
            var b = meta[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function str(a, b) {
        var c, d, e, f, g, h = gap,
            i = b[a];
        switch (i && ("object" == typeof i && ("function" == typeof i.toJSON && (i = i.toJSON(a)))), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
            case "string":
                return quote(i);
            case "number":
                return isFinite(i) ? String(i) : "null";
            case "boolean":
            case "null":
                return String(i);
            case "object":
                if (!i) return "null";
                if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                    for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
                    return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
                }
                if (rep && "object" == typeof rep) for (f = rep.length, c = 0; f > c; c += 1)"string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(a, b, c) {
        var d;
        if (gap = "", indent = "", "number" == typeof c) for (d = 0; c > d; d += 1) indent += " ";
        else "string" == typeof c && (indent = c);
        if (rep = b, b && ("function" != typeof b && ("object" != typeof b || "number" != typeof b.length))) throw new Error("JSON.stringify");
        return str("", {
            "": a
        })
    }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
            "": j
        }, "") : j;
        throw new SyntaxError("JSON.parse");
    })
}();
this.createjs = this.createjs || {}, function() {
    var a = function(a, b, c) {
            this.initialize(a, b, c)
        },
        b = a.prototype;
    b.type = null, b.target = null, b.currentTarget = null, b.eventPhase = 0, b.bubbles = !1, b.cancelable = !1, b.timeStamp = 0, b.defaultPrevented = !1, b.propagationStopped = !1, b.immediatePropagationStopped = !1, b.removed = !1, b.initialize = function(a, b, c) {
        this.type = a, this.bubbles = b, this.cancelable = c, this.timeStamp = (new Date).getTime()
    }, b.preventDefault = function() {
        this.defaultPrevented = !0
    }, b.stopPropagation = function() {
        this.propagationStopped = !0
    }, b.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }, b.remove = function() {
        this.removed = !0
    }, b.clone = function() {
        return new a(this.type, this.bubbles, this.cancelable)
    }, b.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }, createjs.Event = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function() {
            this.initialize()
        },
        b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent
    }, b._listeners = null, b._captureListeners = null, b.initialize = function() {}, b.addEventListener = function(a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b
    }, b.on = function(a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function(a) {
            b.call(c, a, e), d && a.remove()
        }, f)
    }, b.removeEventListener = function(a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e) for (var f = 0, g = e.length; g > f; f++) if (e[f] == b) {
                1 == g ? delete d[a] : e.splice(f, 1);
                break
            }
        }
    }, b.off = b.removeEventListener, b.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }, b.dispatchEvent = function(a, b) {
        if ("string" == typeof a) {
            var c = this._listeners;
            if (!c || !c[a]) return !1;
            a = new createjs.Event(a)
        }
        if (a.target = b || this, a.bubbles && this.parent) {
            for (var d = this, e = [d]; d.parent;) e.push(d = d.parent);
            var f, g = e.length;
            for (f = g - 1; f >= 0 && !a.propagationStopped; f--) e[f]._dispatchEvent(a, 1 + (0 == f));
            for (f = 1; g > f && !a.propagationStopped; f++) e[f]._dispatchEvent(a, 3)
        } else this._dispatchEvent(a, 2);
        return a.defaultPrevented
    }, b.hasEventListener = function(a) {
        var b = this._listeners,
            c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }, b.toString = function() {
        return "[EventDispatcher]"
    }, b._dispatchEvent = function(a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length)) return;
            a.currentTarget = this, a.eventPhase = b, a.removed = !1, e = e.slice();
            for (var f = 0; c > f && !a.immediatePropagationStopped; f++) {
                var g = e[f];
                g.handleEvent ? g.handleEvent(a) : g(a), a.removed && (this.off(a.type, g, 1 == b), a.removed = !1)
            }
        }
    }, createjs.EventDispatcher = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function(a, b, c) {
            this.initialize(a, b, c)
        },
        b = a.prototype = new createjs.EventDispatcher;
    a.NONE = 0, a.LOOP = 1, a.REVERSE = 2, a.IGNORE = {}, a._tweens = [], a._plugins = {}, a.get = function(b, c, d, e) {
        return e && a.removeTweens(b), new a(b, c, d)
    }, a.tick = function(b, c) {
        for (var d = a._tweens.slice(), e = d.length - 1; e >= 0; e--) {
            var f = d[e];
            c && !f.ignoreGlobalPause || (f._paused || f.tick(f._useTicks ? 1 : b))
        }
    }, a.handleEvent = function(a) {
        "tick" == a.type && this.tick(a.delta, a.paused)
    }, a.removeTweens = function(b) {
        if (b.tweenjs_count) {
            for (var c = a._tweens, d = c.length - 1; d >= 0; d--) c[d]._target == b && (c[d]._paused = !0, c.splice(d, 1));
            b.tweenjs_count = 0
        }
    }, a.removeAllTweens = function() {
        for (var b = a._tweens, c = 0, d = b.length; d > c; c++) {
            var e = b[c];
            e.paused = !0, e.target.tweenjs_count = 0
        }
        b.length = 0
    }, a.hasActiveTweens = function(b) {
        return b ? b.tweenjs_count : a._tweens && !! a._tweens.length
    }, a.installPlugin = function(b, c) {
        var d = b.priority;
        null == d && (b.priority = d = 0);
        for (var e = 0, f = c.length, g = a._plugins; f > e; e++) {
            var h = c[e];
            if (g[h]) {
                for (var i = g[h], j = 0, k = i.length; k > j && !(d < i[j].priority); j++);
                g[h].splice(j, 0, b)
            } else g[h] = [b]
        }
    }, a._register = function(b, c) {
        var d = b._target,
            e = a._tweens;
        if (c) d && (d.tweenjs_count = d.tweenjs_count ? d.tweenjs_count + 1 : 1), e.push(b), !a._inited && (createjs.Ticker && (createjs.Ticker.addEventListener("tick", a), a._inited = !0));
        else {
            d && d.tweenjs_count--;
            for (var f = e.length; f--;) if (e[f] == b) return e.splice(f, 1), void 0
        }
    }, b.ignoreGlobalPause = !1, b.loop = !1, b.duration = 0, b.pluginData = null, b.target = null, b.position = null, b.passive = !1, b._paused = !1, b._curQueueProps = null, b._initQueueProps = null, b._steps = null, b._actions = null, b._prevPosition = 0, b._stepPosition = 0, b._prevPos = -1, b._target = null, b._useTicks = !1, b._inited = !1, b.initialize = function(b, c, d) {
        this.target = this._target = b, c && (this._useTicks = c.useTicks, this.ignoreGlobalPause = c.ignoreGlobalPause, this.loop = c.loop, c.onChange && this.addEventListener("change", c.onChange), c.override && a.removeTweens(b)), this.pluginData = d || {}, this._curQueueProps = {}, this._initQueueProps = {}, this._steps = [], this._actions = [], c && c.paused ? this._paused = !0 : a._register(this, !0), c && (null != c.position && this.setPosition(c.position, a.NONE))
    }, b.wait = function(a, b) {
        if (null == a || 0 >= a) return this;
        var c = this._cloneProps(this._curQueueProps);
        return this._addStep({
            d: a,
            p0: c,
            e: this._linearEase,
            p1: c,
            v: b
        })
    }, b.to = function(a, b, c) {
        return (isNaN(b) || 0 > b) && (b = 0), this._addStep({
            d: b || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: c,
            p1: this._cloneProps(this._appendQueueProps(a))
        })
    }, b.call = function(a, b, c) {
        return this._addAction({
            f: a,
            p: b ? b : [this],
            o: c ? c : this._target
        })
    }, b.set = function(a, b) {
        return this._addAction({
            f: this._set,
            o: this,
            p: [a, b ? b : this._target]
        })
    }, b.play = function(a) {
        return a || (a = this), this.call(a.setPaused, [!1], a)
    }, b.pause = function(a) {
        return a || (a = this), this.call(a.setPaused, [!0], a)
    }, b.setPosition = function(a, b) {
        0 > a && (a = 0), null == b && (b = 1);
        var c = a,
            d = !1;
        if (c >= this.duration && (this.loop ? c %= this.duration : (c = this.duration, d = !0)), c == this._prevPos) return d;
        var e = this._prevPos;
        if (this.position = this._prevPos = c, this._prevPosition = a, this._target) if (d) this._updateTargetProps(null, 1);
        else if (this._steps.length > 0) {
            for (var f = 0, g = this._steps.length; g > f && !(this._steps[f].t > c); f++);
            var h = this._steps[f - 1];
            this._updateTargetProps(h, (this._stepPosition = c - h.t) / h.d)
        }
        return 0 != b && (this._actions.length > 0 && (this._useTicks ? this._runActions(c, c) : 1 == b && e > c ? (e != this.duration && this._runActions(e, this.duration), this._runActions(0, c, !0)) : this._runActions(e, c))), d && this.setPaused(!0), this.dispatchEvent("change"), d
    }, b.tick = function(a) {
        this._paused || this.setPosition(this._prevPosition + a)
    }, b.setPaused = function(b) {
        return this._paused = !! b, a._register(this, !b), this
    }, b.w = b.wait, b.t = b.to, b.c = b.call, b.s = b.set, b.toString = function() {
        return "[Tween]"
    }, b.clone = function() {
        throw "Tween can not be cloned.";
    }, b._updateTargetProps = function(b, c) {
        var d, e, f, g, h, i;
        if (b || 1 != c) {
            if (this.passive = !! b.v, this.passive) return;
            b.e && (c = b.e(c, 0, 1, 1)), d = b.p0, e = b.p1
        } else this.passive = !1, d = e = this._curQueueProps;
        for (var j in this._initQueueProps) {
            null == (g = d[j]) && (d[j] = g = this._initQueueProps[j]), null == (h = e[j]) && (e[j] = h = g), f = g == h || (0 == c || (1 == c || "number" != typeof g)) ? 1 == c ? h : g : g + (h - g) * c;
            var k = !1;
            if (i = a._plugins[j]) for (var l = 0, m = i.length; m > l; l++) {
                var n = i[l].tween(this, j, f, d, e, c, !! b && d == e, !b);
                n == a.IGNORE ? k = !0 : f = n
            }
            k || (this._target[j] = f)
        }
    }, b._runActions = function(a, b, c) {
        var d = a,
            e = b,
            f = -1,
            g = this._actions.length,
            h = 1;
        for (a > b && (d = b, e = a, f = g, g = h = -1);
             (f += h) != g;) {
            var i = this._actions[f],
                j = i.t;
            (j == e || (j > d && e > j || c && j == a)) && i.f.apply(i.o, i.p)
        }
    }, b._appendQueueProps = function(b) {
        var c, d, e, f, g;
        for (var h in b) if (void 0 === this._initQueueProps[h]) {
            if (d = this._target[h], c = a._plugins[h]) for (e = 0, f = c.length; f > e; e++) d = c[e].init(this, h, d);
            this._initQueueProps[h] = this._curQueueProps[h] = void 0 === d ? null : d
        } else d = this._curQueueProps[h];
        for (var h in b) {
            if (d = this._curQueueProps[h], c = a._plugins[h]) for (g = g || {}, e = 0, f = c.length; f > e; e++) c[e].step && c[e].step(this, h, d, b[h], g);
            this._curQueueProps[h] = b[h]
        }
        return g && this._appendQueueProps(g), this._curQueueProps
    }, b._cloneProps = function(a) {
        var b = {};
        for (var c in a) b[c] = a[c];
        return b
    }, b._addStep = function(a) {
        return a.d > 0 && (this._steps.push(a), a.t = this.duration, this.duration += a.d), this
    }, b._addAction = function(a) {
        return a.t = this.duration, this._actions.push(a), this
    }, b._set = function(a, b) {
        for (var c in a) b[c] = a[c]
    }, createjs.Tween = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function(a, b, c) {
            this.initialize(a, b, c)
        },
        b = a.prototype = new createjs.EventDispatcher;
    b.ignoreGlobalPause = !1, b.duration = 0, b.loop = !1, b.position = null, b._paused = !1, b._tweens = null, b._labels = null, b._labelList = null, b._prevPosition = 0, b._prevPos = -1, b._useTicks = !1, b.initialize = function(a, b, c) {
        this._tweens = [], c && (this._useTicks = c.useTicks, this.loop = c.loop, this.ignoreGlobalPause = c.ignoreGlobalPause, c.onChange && this.addEventListener("change", c.onChange)), a && this.addTween.apply(this, a), this.setLabels(b), c && c.paused ? this._paused = !0 : createjs.Tween._register(this, !0), c && (null != c.position && this.setPosition(c.position, createjs.Tween.NONE))
    }, b.addTween = function(a) {
        var b = arguments.length;
        if (b > 1) {
            for (var c = 0; b > c; c++) this.addTween(arguments[c]);
            return arguments[0]
        }
        return 0 == b ? null : (this.removeTween(a), this._tweens.push(a), a.setPaused(!0), a._paused = !1, a._useTicks = this._useTicks, a.duration > this.duration && (this.duration = a.duration), this._prevPos >= 0 && a.setPosition(this._prevPos, createjs.Tween.NONE), a)
    }, b.removeTween = function(a) {
        var b = arguments.length;
        if (b > 1) {
            for (var c = !0, d = 0; b > d; d++) c = c && this.removeTween(arguments[d]);
            return c
        }
        if (0 == b) return !1;
        for (var e = this._tweens, d = e.length; d--;) if (e[d] == a) return e.splice(d, 1), a.duration >= this.duration && this.updateDuration(), !0;
        return !1
    }, b.addLabel = function(a, b) {
        this._labels[a] = b;
        var c = this._labelList;
        if (c) {
            for (var d = 0, e = c.length; e > d && !(b < c[d].position); d++);
            c.splice(d, 0, {
                label: a,
                position: b
            })
        }
    }, b.setLabels = function(a) {
        this._labels = a ? a : {}
    }, b.getLabels = function() {
        var a = this._labelList;
        if (!a) {
            a = this._labelList = [];
            var b = this._labels;
            for (var c in b) a.push({
                label: c,
                position: b[c]
            });
            a.sort(function(a, b) {
                return a.position - b.position
            })
        }
        return a
    }, b.getCurrentLabel = function() {
        var a = this.getLabels(),
            b = this.position,
            c = a.length;
        if (c) {
            for (var d = 0; c > d && !(b < a[d].position); d++);
            return 0 == d ? null : a[d - 1].label
        }
        return null
    }, b.gotoAndPlay = function(a) {
        this.setPaused(!1), this._goto(a)
    }, b.gotoAndStop = function(a) {
        this.setPaused(!0), this._goto(a)
    }, b.setPosition = function(a, b) {
        0 > a && (a = 0);
        var c = this.loop ? a % this.duration : a,
            d = !this.loop && a >= this.duration;
        if (c == this._prevPos) return d;
        this._prevPosition = a, this.position = this._prevPos = c;
        for (var e = 0, f = this._tweens.length; f > e; e++) if (this._tweens[e].setPosition(c, b), c != this._prevPos) return !1;
        return d && this.setPaused(!0), this.dispatchEvent("change"), d
    }, b.setPaused = function(a) {
        this._paused = !! a, createjs.Tween._register(this, !a)
    }, b.updateDuration = function() {
        this.duration = 0;
        for (var a = 0, b = this._tweens.length; b > a; a++) {
            var c = this._tweens[a];
            c.duration > this.duration && (this.duration = c.duration)
        }
    }, b.tick = function(a) {
        this.setPosition(this._prevPosition + a)
    }, b.resolve = function(a) {
        var b = parseFloat(a);
        return isNaN(b) && (b = this._labels[a]), b
    }, b.toString = function() {
        return "[Timeline]"
    }, b.clone = function() {
        throw "Timeline can not be cloned.";
    }, b._goto = function(a) {
        var b = this.resolve(a);
        null != b && this.setPosition(b)
    }, createjs.Timeline = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function() {
        throw "Ease cannot be instantiated.";
    };
    a.linear = function(a) {
        return a
    }, a.none = a.linear, a.get = function(a) {
        return -1 > a && (a = -1), a > 1 && (a = 1), function(b) {
            return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
        }
    }, a.getPowIn = function(a) {
        return function(b) {
            return Math.pow(b, a)
        }
    }, a.getPowOut = function(a) {
        return function(b) {
            return 1 - Math.pow(1 - b, a)
        }
    }, a.getPowInOut = function(a) {
        return function(b) {
            return (b *= 2) < 1 ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
        }
    }, a.quadIn = a.getPowIn(2), a.quadOut = a.getPowOut(2), a.quadInOut = a.getPowInOut(2), a.cubicIn = a.getPowIn(3), a.cubicOut = a.getPowOut(3), a.cubicInOut = a.getPowInOut(3), a.quartIn = a.getPowIn(4), a.quartOut = a.getPowOut(4), a.quartInOut = a.getPowInOut(4), a.quintIn = a.getPowIn(5), a.quintOut = a.getPowOut(5), a.quintInOut = a.getPowInOut(5), a.sineIn = function(a) {
        return 1 - Math.cos(a * Math.PI / 2)
    }, a.sineOut = function(a) {
        return Math.sin(a * Math.PI / 2)
    }, a.sineInOut = function(a) {
        return -0.5 * (Math.cos(Math.PI * a) - 1)
    }, a.getBackIn = function(a) {
        return function(b) {
            return b * b * ((a + 1) * b - a)
        }
    }, a.backIn = a.getBackIn(1.7), a.getBackOut = function(a) {
        return function(b) {
            return --b * b * ((a + 1) * b + a) + 1
        }
    }, a.backOut = a.getBackOut(1.7), a.getBackInOut = function(a) {
        return a *= 1.525, function(b) {
            return (b *= 2) < 1 ? 0.5 * b * b * ((a + 1) * b - a) : 0.5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
        }
    }, a.backInOut = a.getBackInOut(1.7), a.circIn = function(a) {
        return -(Math.sqrt(1 - a * a) - 1)
    }, a.circOut = function(a) {
        return Math.sqrt(1 - --a * a)
    }, a.circInOut = function(a) {
        return (a *= 2) < 1 ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
    }, a.bounceIn = function(b) {
        return 1 - a.bounceOut(1 - b)
    }, a.bounceOut = function(a) {
        return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
    }, a.bounceInOut = function(b) {
        return 0.5 > b ? 0.5 * a.bounceIn(2 * b) : 0.5 * a.bounceOut(2 * b - 1) + 0.5
    }, a.getElasticIn = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            if (0 == d || 1 == d) return d;
            var e = b / c * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b))
        }
    }, a.elasticIn = a.getElasticIn(1, 0.3), a.getElasticOut = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            if (0 == d || 1 == d) return d;
            var e = b / c * Math.asin(1 / a);
            return a * Math.pow(2, -10 * d) * Math.sin((d - e) * c / b) + 1
        }
    }, a.elasticOut = a.getElasticOut(1, 0.3), a.getElasticInOut = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            var e = b / c * Math.asin(1 / a);
            return (d *= 2) < 1 ? -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b) : 0.5 * a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * c / b) + 1
        }
    }, a.elasticInOut = a.getElasticInOut(1, 0.3 * 1.5), createjs.Ease = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function() {
        throw "MotionGuidePlugin cannot be instantiated.";
    };
    a.priority = 0, a._rotOffS, a._rotOffE, a._rotNormS, a._rotNormE, a.install = function() {
        return createjs.Tween.installPlugin(a, ["guide", "x", "y", "rotation"]), createjs.Tween.IGNORE
    }, a.init = function(a, b, c) {
        var d = a.target;
        return d.hasOwnProperty("x") || (d.x = 0), d.hasOwnProperty("y") || (d.y = 0), d.hasOwnProperty("rotation") || (d.rotation = 0), "rotation" == b && (a.__needsRot = !0), "guide" == b ? null : c
    }, a.step = function(b, c, d, e, f) {
        if ("rotation" == c && (b.__rotGlobalS = d, b.__rotGlobalE = e, a.testRotData(b, f)), "guide" != c) return e;
        var g, h = e;
        h.hasOwnProperty("path") || (h.path = []);
        var i = h.path;
        if (h.hasOwnProperty("end") || (h.end = 1), h.hasOwnProperty("start") || (h.start = d && (d.hasOwnProperty("end") && d.path === i) ? d.end : 0), h.hasOwnProperty("_segments") && h._length) return e;
        var j = i.length,
            k = 10;
        if (!(j >= 6 && 0 == (j - 2) % 4)) throw "invalid 'path' data, please see documentation for valid paths";
        h._segments = [], h._length = 0;
        for (var l = 2; j > l; l += 4) {
            for (var m, n, o = i[l - 2], p = i[l - 1], q = i[l + 0], r = i[l + 1], s = i[l + 2], t = i[l + 3], u = o, v = p, w = 0, x = [], y = 1; k >= y; y++) {
                var z = y / k,
                    A = 1 - z;
                m = A * A * o + 2 * A * z * q + z * z * s, n = A * A * p + 2 * A * z * r + z * z * t, w += x[x.push(Math.sqrt((g = m - u) * g + (g = n - v) * g)) - 1], u = m, v = n
            }
            h._segments.push(w), h._segments.push(x), h._length += w
        }
        g = h.orient, h.orient = !0;
        var B = {};
        return a.calc(h, h.start, B), b.__rotPathS = Number(B.rotation.toFixed(5)), a.calc(h, h.end, B), b.__rotPathE = Number(B.rotation.toFixed(5)), h.orient = !1, a.calc(h, h.end, f), h.orient = g, h.orient ? (b.__guideData = h, a.testRotData(b, f), e) : e
    }, a.testRotData = function(a, b) {
        if (void 0 === a.__rotGlobalS || void 0 === a.__rotGlobalE) {
            if (a.__needsRot) return;
            a.__rotGlobalS = a.__rotGlobalE = void 0 !== a._curQueueProps.rotation ? a._curQueueProps.rotation : b.rotation = a.target.rotation || 0
        }
        if (void 0 !== a.__guideData) {
            var c = a.__guideData,
                d = a.__rotGlobalE - a.__rotGlobalS,
                e = a.__rotPathE - a.__rotPathS,
                f = d - e;
            if ("auto" == c.orient) f > 180 ? f -= 360 : -180 > f && (f += 360);
            else if ("cw" == c.orient) {
                for (; 0 > f;) f += 360;
                0 == f && (d > 0 && (180 != d && (f += 360)))
            } else if ("ccw" == c.orient) {
                for (f = d - (e > 180 ? 360 - e : e); f > 0;) f -= 360;
                0 == f && (0 > d && (-180 != d && (f -= 360)))
            }
            c.rotDelta = f, c.rotOffS = a.__rotGlobalS - a.__rotPathS, a.__rotGlobalS = a.__rotGlobalE = a.__guideData = a.__needsRot = void 0
        }
    }, a.tween = function(b, c, d, e, f, g, h) {
        var i = f.guide;
        if (void 0 == i || i === e.guide) return d;
        if (i.lastRatio != g) {
            var j = (i.end - i.start) * (h ? i.end : g) + i.start;
            switch (a.calc(i, j, b.target), i.orient) {
                case "cw":
                case "ccw":
                case "auto":
                    b.target.rotation += i.rotOffS + i.rotDelta * g;
                    break;
                case "fixed":
                default:
                    b.target.rotation += i.rotOffS
            }
            i.lastRatio = g
        }
        return "rotation" != c || i.orient && "false" != i.orient ? b.target[c] : d
    }, a.calc = function(b, c, d) {
        void 0 == b._segments && a.validate(b), void 0 == d && (d = {
            x: 0,
            y: 0,
            rotation: 0
        });
        for (var e = b._segments, f = b.path, g = b._length * c, h = e.length - 2, i = 0; g > e[i] && h > i;) g -= e[i], i += 2;
        var j = e[i + 1],
            k = 0;
        for (h = j.length - 1; g > j[k] && h > k;) g -= j[k], k++;
        var l = k / ++h + g / (h * j[k]);
        i = 2 * i + 2;
        var m = 1 - l;
        return d.x = m * m * f[i - 2] + 2 * m * l * f[i + 0] + l * l * f[i + 2], d.y = m * m * f[i - 1] + 2 * m * l * f[i + 1] + l * l * f[i + 3], b.orient && (d.rotation = 57.2957795 * Math.atan2((f[i + 1] - f[i - 1]) * m + (f[i + 3] - f[i + 1]) * l, (f[i + 0] - f[i - 2]) * m + (f[i + 2] - f[i + 0]) * l)), d
    }, createjs.MotionGuidePlugin = a
}(), this.createjs = this.createjs || {}, function() {
    var a = createjs.TweenJS = createjs.TweenJS || {};
    a.version = "0.5.0", a.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
}();
this.createjs = this.createjs || {}, function() {
    var a = createjs.SoundJS = createjs.SoundJS || {};
    a.version = "0.5.0", a.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
}(), this.createjs = this.createjs || {}, function() {
    var a = function() {},
        b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent
    }, b._listeners = null, b._captureListeners = null, b.initialize = function() {}, b.addEventListener = function(a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b
    }, b.on = function(a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function(a) {
            b.call(c, a, e), d && a.remove()
        }, f)
    }, b.removeEventListener = function(a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e) for (var f = 0, g = e.length; g > f; f++) if (e[f] == b) {
                1 == g ? delete d[a] : e.splice(f, 1);
                break
            }
        }
    }, b.off = b.removeEventListener, b.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }, b.dispatchEvent = function(a, b) {
        if ("string" == typeof a) {
            var c = this._listeners;
            if (!c || !c[a]) return !1;
            a = new createjs.Event(a)
        }
        if (a.target = b || this, a.bubbles && this.parent) {
            for (var d = this, e = [d]; d.parent;) e.push(d = d.parent);
            var f, g = e.length;
            for (f = g - 1; f >= 0 && !a.propagationStopped; f--) e[f]._dispatchEvent(a, 1 + (0 == f));
            for (f = 1; g > f && !a.propagationStopped; f++) e[f]._dispatchEvent(a, 3)
        } else this._dispatchEvent(a, 2);
        return a.defaultPrevented
    }, b.hasEventListener = function(a) {
        var b = this._listeners,
            c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }, b.toString = function() {
        return "[EventDispatcher]"
    }, b._dispatchEvent = function(a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length)) return;
            a.currentTarget = this, a.eventPhase = b, a.removed = !1, e = e.slice();
            for (var f = 0; c > f && !a.immediatePropagationStopped; f++) {
                var g = e[f];
                g.handleEvent ? g.handleEvent(a) : g(a), a.removed && (this.off(a.type, g, 1 == b), a.removed = !1)
            }
        }
    }, createjs.EventDispatcher = a
}(), this.createjs = this.createjs || {}, function() {
    var a = function(a, b, c) {
            this.initialize(a, b, c)
        },
        b = a.prototype;
    b.type = null, b.target = null, b.currentTarget = null, b.eventPhase = 0, b.bubbles = !1, b.cancelable = !1, b.timeStamp = 0, b.defaultPrevented = !1, b.propagationStopped = !1, b.immediatePropagationStopped = !1, b.removed = !1, b.initialize = function(a, b, c) {
        this.type = a, this.bubbles = b, this.cancelable = c, this.timeStamp = (new Date).getTime()
    }, b.preventDefault = function() {
        this.defaultPrevented = !0
    }, b.stopPropagation = function() {
        this.propagationStopped = !0
    }, b.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }, b.remove = function() {
        this.removed = !0
    }, b.clone = function() {
        return new a(this.type, this.bubbles, this.cancelable)
    }, b.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }, createjs.Event = a
}(), this.createjs = this.createjs || {}, function() {
    createjs.indexOf = function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (b === a[c]) return c;
        return -1
    }
}(), this.createjs = this.createjs || {}, function() {
    createjs.proxy = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return function() {
            return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c))
        }
    }
}(), this.createjs = this.createjs || {}, function() {
    function a() {
        throw "Sound cannot be instantiated";
    }
    function b(a, b) {
        this.init(a, b)
    }
    function c() {
        this.isDefault = !0, this.addEventListener = this.removeEventListener = this.removeAllEventListener = this.dispatchEvent = this.hasEventListener = this._listeners = this.interrupt = this.playFailed = this.pause = this.resume = this.play = this.beginPlaying = this.cleanUp = this.stop = this.setMasterVolume = this.setVolume = this.mute = this.setMute = this.getMute = this.setPan = this.getPosition = this.setPosition = function() {
            return !1
        }, this.getVolume = this.getPan = this.getDuration = function() {
            return 0
        }, this.playState = a.PLAY_FAILED, this.toString = function() {
            return "[Sound Default Sound Instance]"
        }
    }
    function d() {}
    var e = a;
    e.DELIMITER = "|", e.AUDIO_TIMEOUT = 8E3, e.INTERRUPT_ANY = "any", e.INTERRUPT_EARLY = "early", e.INTERRUPT_LATE = "late", e.INTERRUPT_NONE = "none", e.PLAY_INITED = "playInited", e.PLAY_SUCCEEDED = "playSucceeded", e.PLAY_INTERRUPTED = "playInterrupted", e.PLAY_FINISHED = "playFinished", e.PLAY_FAILED = "playFailed", e.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"], e.EXTENSION_MAP = {
        m4a: "mp4"
    }, e.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/, e.defaultInterruptBehavior = e.INTERRUPT_NONE, e.lastId = 0, e.activePlugin = null, e.pluginsRegistered = !1, e.masterVolume = 1, e.masterMute = !1, e.instances = [], e.idHash = {}, e.preloadHash = {}, e.defaultSoundInstance = null, e.addEventListener = null, e.removeEventListener = null, e.removeAllEventListeners = null, e.dispatchEvent = null, e.hasEventListener = null, e._listeners = null, createjs.EventDispatcher.initialize(e), e.sendFileLoadEvent = function(a) {
        if (e.preloadHash[a]) for (var b = 0, c = e.preloadHash[a].length; c > b; b++) {
            var d = e.preloadHash[a][b];
            if (e.preloadHash[a][b] = !0, e.hasEventListener("fileload")) {
                var f = new createjs.Event("fileload");
                f.src = d.src, f.id = d.id, f.data = d.data, e.dispatchEvent(f)
            }
        }
    }, e.getPreloadHandlers = function() {
        return {
            callback: createjs.proxy(e.initLoad, e),
            types: ["sound"],
            extensions: e.SUPPORTED_EXTENSIONS
        }
    }, e.registerPlugin = function(a) {
        return e.pluginsRegistered = !0, null == a ? !1 : a.isSupported() ? (e.activePlugin = new a, !0) : !1
    }, e.registerPlugins = function(a) {
        for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            if (e.registerPlugin(d)) return !0
        }
        return !1
    }, e.initializeDefaultPlugins = function() {
        return null != e.activePlugin ? !0 : e.pluginsRegistered ? !1 : e.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1
    }, e.isReady = function() {
        return null != e.activePlugin
    }, e.getCapabilities = function() {
        return null == e.activePlugin ? null : e.activePlugin.capabilities
    }, e.getCapability = function(a) {
        return null == e.activePlugin ? null : e.activePlugin.capabilities[a]
    }, e.initLoad = function(a, b, c, d, f) {
        var g = e.registerSound(a, c, d, !1, f);
        return null == g ? !1 : g
    }, e.registerSound = function(a, c, d, f, g) {
        if (!e.initializeDefaultPlugins()) return !1;
        a instanceof Object && (g = c, c = a.id, d = a.data, a = a.src);
        var h = e.parsePath(a, "sound", c, d);
        if (null == h) return !1;
        null != c && (e.idHash[c] = h.src);
        var i = null;
        null != d && (isNaN(d.channels) ? isNaN(d) || (i = parseInt(d)) : i = parseInt(d.channels));
        var j = e.activePlugin.register(h.src, i);
        if (null != j && (null != j.numChannels && (i = j.numChannels), b.create(h.src, i), null != d && isNaN(d) ? d.channels = h.data.channels = i || b.maxPerChannel() : d = h.data = i || b.maxPerChannel(), null != j.tag ? h.tag = j.tag : j.src && (h.src = j.src), null != j.completeHandler && (h.completeHandler = j.completeHandler), j.type && (h.type = j.type)), 0 != f) if (e.preloadHash[h.src] || (e.preloadHash[h.src] = []), e.preloadHash[h.src].push({
            src: a,
            id: c,
            data: d
        }), 1 == e.preloadHash[h.src].length) null == g && (g = ""), e.activePlugin.preload(h.src, j, g);
        else if (1 == e.preloadHash[h.src][0]) return !0;
        return h
    }, e.registerManifest = function(a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++) c[d] = createjs.Sound.registerSound(a[d].src, a[d].id, a[d].data, a[d].preload, b);
        return c
    }, e.removeSound = function(a) {
        if (null == e.activePlugin) return !1;
        a instanceof Object && (a = a.src), a = e.getSrcById(a);
        var c = e.parsePath(a);
        if (null == c) return !1;
        a = c.src;
        for (var d in e.idHash) e.idHash[d] == a && delete e.idHash[d];
        return b.removeSrc(a), delete e.preloadHash[a], e.activePlugin.removeSound(a), !0
    }, e.removeManifest = function(a) {
        for (var b = [], c = 0, d = a.length; d > c; c++) b[c] = createjs.Sound.removeSound(a[c].src);
        return b
    }, e.removeAllSounds = function() {
        e.idHash = {}, e.preloadHash = {}, b.removeAll(), e.activePlugin.removeAllSounds()
    }, e.loadComplete = function(a) {
        var b = e.parsePath(a, "sound");
        return a = b ? e.getSrcById(b.src) : e.getSrcById(a), 1 == e.preloadHash[a][0]
    }, e.parsePath = function(a, b, c, d) {
        "string" != typeof a && (a = a.toString());
        for (var f = a.split(e.DELIMITER), g = {
            type: b || "sound",
            id: c,
            data: d
        }, h = e.getCapabilities(), i = 0, j = f.length; j > i; i++) {
            var k = f[i],
                l = k.match(e.FILE_PATTERN);
            if (null == l) return !1;
            var m = l[4],
                n = l[5];
            if (h[n] && createjs.indexOf(e.SUPPORTED_EXTENSIONS, n) > -1) return g.name = m, g.src = k, g.extension = n, g
        }
        return null
    }, e.play = function(a, b, c, d, f, g, h) {
        var i = e.createInstance(a),
            j = e.playInstance(i, b, c, d, f, g, h);
        return j || i.playFailed(), i
    }, e.createInstance = function(c) {
        if (!e.initializeDefaultPlugins()) return e.defaultSoundInstance;
        c = e.getSrcById(c);
        var d = e.parsePath(c, "sound"),
            f = null;
        return null != d && null != d.src ? (b.create(d.src), f = e.activePlugin.create(d.src)) : f = a.defaultSoundInstance, f.uniqueId = e.lastId++, f
    }, e.setVolume = function(a) {
        if (null == Number(a)) return !1;
        if (a = Math.max(0, Math.min(1, a)), e.masterVolume = a, !this.activePlugin || (!this.activePlugin.setVolume || !this.activePlugin.setVolume(a))) for (var b = this.instances, c = 0, d = b.length; d > c; c++) b[c].setMasterVolume(a)
    }, e.getVolume = function() {
        return e.masterVolume
    }, e.setMute = function(a) {
        if (null == a || void 0 == a) return !1;
        if (this.masterMute = a, !this.activePlugin || (!this.activePlugin.setMute || !this.activePlugin.setMute(a))) for (var b = this.instances, c = 0, d = b.length; d > c; c++) b[c].setMasterMute(a);
        return !0
    }, e.getMute = function() {
        return this.masterMute
    }, e.stop = function() {
        for (var a = this.instances, b = a.length; b--;) a[b].stop()
    }, e.playInstance = function(a, b, c, d, f, g, h) {
        if (b instanceof Object && (c = b.delay, d = b.offset, f = b.loop, g = b.volume, h = b.pan), b = b || e.defaultInterruptBehavior, null == c && (c = 0), null == d && (d = a.getPosition()), null == f && (f = 0), null == g && (g = a.volume), null == h && (h = a.pan), 0 == c) {
            var i = e.beginPlaying(a, b, d, f, g, h);
            if (!i) return !1
        } else {
            var j = setTimeout(function() {
                e.beginPlaying(a, b, d, f, g, h)
            }, c);
            a.delayTimeoutId = j
        }
        return this.instances.push(a), !0
    }, e.beginPlaying = function(a, c, d, e, f, g) {
        if (!b.add(a, c)) return !1;
        var h = a.beginPlaying(d, e, f, g);
        if (!h) {
            var i = createjs.indexOf(this.instances, a);
            return i > -1 && this.instances.splice(i, 1), !1
        }
        return !0
    }, e.getSrcById = function(a) {
        return null == e.idHash || null == e.idHash[a] ? a : e.idHash[a]
    }, e.playFinished = function(a) {
        b.remove(a);
        var c = createjs.indexOf(this.instances, a);
        c > -1 && this.instances.splice(c, 1)
    }, createjs.Sound = a, b.channels = {}, b.create = function(a, c) {
        var d = b.get(a);
        return null == d ? (b.channels[a] = new b(a, c), !0) : !1
    }, b.removeSrc = function(a) {
        var c = b.get(a);
        return null == c ? !1 : (c.removeAll(), delete b.channels[a], !0)
    }, b.removeAll = function() {
        for (var a in b.channels) b.channels[a].removeAll();
        b.channels = {}
    }, b.add = function(a, c) {
        var d = b.get(a.src);
        return null == d ? !1 : d.add(a, c)
    }, b.remove = function(a) {
        var c = b.get(a.src);
        return null == c ? !1 : (c.remove(a), !0)
    }, b.maxPerChannel = function() {
        return f.maxDefault
    }, b.get = function(a) {
        return b.channels[a]
    };
    var f = b.prototype;
    f.src = null, f.max = null, f.maxDefault = 100, f.length = 0, f.init = function(a, b) {
        this.src = a, this.max = b || this.maxDefault, -1 == this.max && this.max == this.maxDefault, this.instances = []
    }, f.get = function(a) {
        return this.instances[a]
    }, f.add = function(a, b) {
        return this.getSlot(b, a) ? (this.instances.push(a), this.length++, !0) : !1
    }, f.remove = function(a) {
        var b = createjs.indexOf(this.instances, a);
        return -1 == b ? !1 : (this.instances.splice(b, 1), this.length--, !0)
    }, f.removeAll = function() {
        for (var a = this.length - 1; a >= 0; a--) this.instances[a].stop()
    }, f.getSlot = function(b) {
        for (var c, d, e = 0, f = this.max; f > e; e++) {
            if (c = this.get(e), null == c) return !0;
            (b != a.INTERRUPT_NONE || c.playState == a.PLAY_FINISHED) && (0 != e ? c.playState == a.PLAY_FINISHED || (c.playState == a.PLAY_INTERRUPTED || c.playState == a.PLAY_FAILED) ? d = c : (b == a.INTERRUPT_EARLY && c.getPosition() < d.getPosition() || b == a.INTERRUPT_LATE && c.getPosition() > d.getPosition()) && (d = c) : d = c)
        }
        return null != d ? (d.interrupt(), this.remove(d), !0) : !1
    }, f.toString = function() {
        return "[Sound SoundChannel]"
    }, a.defaultSoundInstance = new c, null == createjs.proxy && (createjs.proxy = function() {
        throw "Proxy has been moved to an external file, and must be included separately.";
    }), d.init = function() {
        var a = window.navigator.userAgent;
        d.isFirefox = a.indexOf("Firefox") > -1, d.isOpera = null != window.opera, d.isChrome = a.indexOf("Chrome") > -1, d.isIOS = a.indexOf("iPod") > -1 || (a.indexOf("iPhone") > -1 || a.indexOf("iPad") > -1), d.isAndroid = a.indexOf("Android") > -1, d.isBlackberry = a.indexOf("Blackberry") > -1
    }, d.init(), createjs.Sound.BrowserDetect = d
}(), this.createjs = this.createjs || {}, function() {
    function a() {
        this.init()
    }
    var b = a;
    b.capabilities = null, b.isSupported = function() {
        var a = createjs.Sound.BrowserDetect.isIOS || (createjs.Sound.BrowserDetect.isAndroid || createjs.Sound.BrowserDetect.isBlackberry);
        return "file:" != location.protocol || (a || this.isFileXHRSupported()) ? (b.generateCapabilities(), null == b.context ? !1 : !0) : !1
    }, b.isFileXHRSupported = function() {
        var a = !0,
            b = new XMLHttpRequest;
        try {
            b.open("GET", "fail.fail", !1)
        } catch (c) {
            return a = !1
        }
        b.onerror = function() {
            a = !1
        }, b.onload = function() {
            a = 404 == this.status || (200 == this.status || 0 == this.status && "" != this.response)
        };
        try {
            b.send()
        } catch (c) {
            a = !1
        }
        return a
    }, b.generateCapabilities = function() {
        if (null == b.capabilities) {
            var a = document.createElement("audio");
            if (null == a.canPlayType) return null;
            if (window.webkitAudioContext) b.context = new webkitAudioContext;
            else {
                if (!window.AudioContext) return null;
                b.context = new AudioContext
            }
            b.compatibilitySetUp(), b.playEmptySound(), b.capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var c = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = c.length; f > e; e++) {
                var g = c[e],
                    h = d[g] || g;
                b.capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h)
            }
            b.context.destination.numberOfChannels < 2 && (b.capabilities.panning = !1), b.dynamicsCompressorNode = b.context.createDynamicsCompressor(), b.dynamicsCompressorNode.connect(b.context.destination), b.gainNode = b.context.createGain(), b.gainNode.connect(b.dynamicsCompressorNode)
        }
    }, b.compatibilitySetUp = function() {
        if (!b.context.createGain) {
            b.context.createGain = b.context.createGainNode;
            var a = b.context.createBufferSource();
            a.__proto__.start = a.__proto__.noteGrainOn, a.__proto__.stop = a.__proto__.noteOff, this.panningModel = 0
        }
    }, b.playEmptySound = function() {
        var a = this.context.createBuffer(1, 1, 22050),
            b = this.context.createBufferSource();
        b.buffer = a, b.connect(this.context.destination), b.start(0, 0, 0)
    };
    var c = a.prototype;
    c.capabilities = null, c.volume = 1, c.context = null, c.panningModel = "equalpower", c.dynamicsCompressorNode = null, c.gainNode = null, c.arrayBuffers = null, c.init = function() {
        this.capabilities = b.capabilities, this.arrayBuffers = {}, this.context = b.context, this.gainNode = b.gainNode, this.dynamicsCompressorNode = b.dynamicsCompressorNode
    }, c.register = function(a) {
        this.arrayBuffers[a] = !0;
        var b = new createjs.WebAudioPlugin.Loader(a, this);
        return {
            tag: b
        }
    }, c.isPreloadStarted = function(a) {
        return null != this.arrayBuffers[a]
    }, c.isPreloadComplete = function(a) {
        return !(null == this.arrayBuffers[a] || 1 == this.arrayBuffers[a])
    }, c.removeFromPreload = function(a) {
        delete this.arrayBuffers[a]
    }, c.removeSound = function(a) {
        delete this.arrayBuffers[a]
    }, c.removeAllSounds = function() {
        this.arrayBuffers = {}
    }, c.addPreloadResults = function(a, b) {
        this.arrayBuffers[a] = b
    }, c.handlePreloadComplete = function() {
        createjs.Sound.sendFileLoadEvent(this.src)
    }, c.preload = function(a, b, c) {
        this.arrayBuffers[a] = !0;
        var d = new createjs.WebAudioPlugin.Loader(a, this);
        d.onload = this.handlePreloadComplete, null != c && (d.src = c + d.src), d.load()
    }, c.create = function(a) {
        return this.isPreloadStarted(a) || this.preload(a), new createjs.WebAudioPlugin.SoundInstance(a, this)
    }, c.setVolume = function(a) {
        return this.volume = a, this.updateVolume(), !0
    }, c.updateVolume = function() {
        var a = createjs.Sound.masterMute ? 0 : this.volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    }, c.getVolume = function() {
        return this.volume
    }, c.setMute = function() {
        return this.updateVolume(), !0
    }, c.toString = function() {
        return "[WebAudioPlugin]"
    }, createjs.WebAudioPlugin = a
}(), function() {
    function a(a, b) {
        this.init(a, b)
    }
    var b = a.prototype;
    b.src = null, b.uniqueId = -1, b.playState = null, b.owner = null, b.offset = 0, b.delay = 0, b._volume = 1, Object.defineProperty(b, "volume", {
        get: function() {
            return this._volume
        },
        set: function(a) {
            return null == Number(a) ? !1 : (a = Math.max(0, Math.min(1, a)), this._volume = a, this.updateVolume(), void 0)
        }
    }), b._pan = 0, Object.defineProperty(b, "pan", {
        get: function() {
            return this._pan
        },
        set: function(a) {
            return this.owner.capabilities.panning && null != Number(a) ? (a = Math.max(-1, Math.min(1, a)), this._pan = a, this.panNode.setPosition(a, 0, -0.5), void 0) : !1
        }
    }), b.duration = 0, b.remainingLoops = 0, b.delayTimeoutId = null, b.soundCompleteTimeout = null, b.panNode = null, b.gainNode = null, b.sourceNode = null, b.sourceNodeNext = null, b.muted = !1, b.paused = !1, b.startTime = 0, b.addEventListener = null, b.removeEventListener = null, b.removeAllEventListeners = null, b.dispatchEvent = null, b.hasEventListener = null, b._listeners = null, b.endedHandler = null, b.readyHandler = null, b.stalledHandler = null, b.sendEvent = function(a) {
        var b = new createjs.Event(a);
        this.dispatchEvent(b)
    }, b.init = function(a, b) {
        this.owner = b, this.src = a, this.panNode = this.owner.context.createPanner(), this.panNode.panningModel = this.owner.panningModel, this.gainNode = this.owner.context.createGain(), this.gainNode.connect(this.panNode), this.owner.isPreloadComplete(this.src) && (this.duration = 1E3 * this.owner.arrayBuffers[this.src].duration), this.endedHandler = createjs.proxy(this.handleSoundComplete, this), this.readyHandler = createjs.proxy(this.handleSoundReady, this), this.stalledHandler = createjs.proxy(this.handleSoundStalled, this)
    }, b.cleanUp = function() {
        this.sourceNode && (this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.sourceNode = this.cleanUpAudioNode(this.sourceNode), this.sourceNodeNext = this.cleanUpAudioNode(this.sourceNodeNext))), 0 != this.panNode.numberOfOutputs && this.panNode.disconnect(0), clearTimeout(this.delayTimeoutId), clearTimeout(this.soundCompleteTimeout), this.startTime = 0, null != window.createjs && createjs.Sound.playFinished(this)
    }, b.cleanUpAudioNode = function(a) {
        return a && (a.stop(0), a.disconnect(this.gainNode), a = null), a
    }, b.interrupt = function() {
        this.playState = createjs.Sound.PLAY_INTERRUPTED, this.cleanUp(), this.paused = !1, this.sendEvent("interrupted")
    }, b.handleSoundStalled = function() {
        this.sendEvent("failed")
    }, b.handleSoundReady = function() {
        if (null != window.createjs) {
            if (1E3 * this.offset > this.getDuration()) return this.playFailed(), void 0;
            this.offset < 0 && (this.offset = 0), this.playState = createjs.Sound.PLAY_SUCCEEDED, this.paused = !1, this.panNode.connect(this.owner.gainNode);
            var a = this.owner.arrayBuffers[this.src].duration;
            this.sourceNode = this.createAndPlayAudioNode(this.owner.context.currentTime - a, this.offset), this.duration = 1E3 * a, this.startTime = this.sourceNode.startTime - this.offset, this.soundCompleteTimeout = setTimeout(this.endedHandler, 1E3 * (a - this.offset)), 0 != this.remainingLoops && (this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0))
        }
    }, b.createAndPlayAudioNode = function(a, b) {
        var c = this.owner.context.createBufferSource();
        return c.buffer = this.owner.arrayBuffers[this.src], c.connect(this.gainNode), this.owner.context.currentTime, c.startTime = a + c.buffer.duration, c.start(c.startTime, b, c.buffer.duration - b), c
    }, b.play = function(a, b, c, d, e, f) {
        this.cleanUp(), createjs.Sound.playInstance(this, a, b, c, d, e, f)
    }, b.beginPlaying = function(a, b, c, d) {
        return null != window.createjs && this.src ? (this.offset = a / 1E3, this.remainingLoops = b, this.volume = c, this.pan = d, this.owner.isPreloadComplete(this.src) ? (this.handleSoundReady(null), this.sendEvent("succeeded"), 1) : (this.playFailed(), void 0)) : void 0
    }, b.pause = function() {
        return this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED ? !1 : (this.paused = !0, this.offset = this.owner.context.currentTime - this.startTime, this.cleanUpAudioNode(this.sourceNode), this.cleanUpAudioNode(this.sourceNodeNext), 0 != this.panNode.numberOfOutputs && this.panNode.disconnect(), clearTimeout(this.delayTimeoutId), clearTimeout(this.soundCompleteTimeout), !0)
    }, b.resume = function() {
        return this.paused ? (this.handleSoundReady(null), !0) : !1
    }, b.stop = function() {
        return this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.offset = 0, !0
    }, b.setVolume = function(a) {
        return this.volume = a, !0
    }, b.updateVolume = function() {
        var a = this.muted ? 0 : this._volume;
        return a != this.gainNode.gain.value ? (this.gainNode.gain.value = a, !0) : !1
    }, b.getVolume = function() {
        return this.volume
    }, b.setMute = function(a) {
        return null == a || void 0 == a ? !1 : (this.muted = a, this.updateVolume(), !0)
    }, b.getMute = function() {
        return this.muted
    }, b.setPan = function(a) {
        return this.pan = a, this.pan != a ? !1 : void 0
    }, b.getPan = function() {
        return this.pan
    }, b.getPosition = function() {
        if (this.paused || null == this.sourceNode) var a = this.offset;
        else var a = this.owner.context.currentTime - this.startTime;
        return 1E3 * a
    }, b.setPosition = function(a) {
        return this.offset = a / 1E3, this.sourceNode && (this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.cleanUpAudioNode(this.sourceNode), this.cleanUpAudioNode(this.sourceNodeNext), clearTimeout(this.soundCompleteTimeout))), this.paused || (this.playState != createjs.Sound.PLAY_SUCCEEDED || this.handleSoundReady(null)), !0
    }, b.getDuration = function() {
        return this.duration
    }, b.handleSoundComplete = function() {
        return this.offset = 0, 0 != this.remainingLoops ? (this.remainingLoops--, this.sourceNodeNext ? (this.cleanUpAudioNode(this.sourceNode), this.sourceNode = this.sourceNodeNext, this.startTime = this.sourceNode.startTime, this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0), this.soundCompleteTimeout = setTimeout(this.endedHandler, this.duration)) : this.handleSoundReady(null), this.sendEvent("loop"), void 0) : (null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.sendEvent("complete")), void 0)
    }, b.playFailed = function() {
        null != window.createjs && (this.playState = createjs.Sound.PLAY_FAILED, this.cleanUp(), this.sendEvent("failed"))
    }, b.toString = function() {
        return "[WebAudioPlugin SoundInstance]"
    }, createjs.EventDispatcher.initialize(a.prototype), createjs.WebAudioPlugin.SoundInstance = a
}(), function() {
    function a(a, b) {
        this.init(a, b)
    }
    var b = a.prototype;
    b.request = null, b.owner = null, b.progress = -1, b.src = null, b.originalSrc = null, b.result = null, b.onload = null, b.onprogress = null, b.onError = null, b.init = function(a, b) {
        this.src = a, this.originalSrc = a, this.owner = b
    }, b.load = function(a) {
        null != a && (this.src = a), this.request = new XMLHttpRequest, this.request.open("GET", this.src, !0), this.request.responseType = "arraybuffer", this.request.onload = createjs.proxy(this.handleLoad, this), this.request.onError = createjs.proxy(this.handleError, this), this.request.onprogress = createjs.proxy(this.handleProgress, this), this.request.send()
    }, b.handleProgress = function(a, b) {
        this.progress = a / b, null != this.onprogress && this.onprogress({
            loaded: a,
            total: b,
            progress: this.progress
        })
    }, b.handleLoad = function() {
        this.owner.context.decodeAudioData(this.request.response, createjs.proxy(this.handleAudioDecoded, this), createjs.proxy(this.handleError, this))
    }, b.handleAudioDecoded = function(a) {
        this.progress = 1, this.result = a, this.src = this.originalSrc, this.owner.addPreloadResults(this.src, this.result), this.onload && this.onload()
    }, b.handleError = function(a) {
        this.owner.removeSound(this.src), this.onerror && this.onerror(a)
    }, b.toString = function() {
        return "[WebAudioPlugin Loader]"
    }, createjs.WebAudioPlugin.Loader = a
}(), this.createjs = this.createjs || {}, function() {
    function a() {
        this.init()
    }
    var b = a;
    b.MAX_INSTANCES = 30, b.capabilities = null, b.AUDIO_READY = "canplaythrough", b.AUDIO_ENDED = "ended", b.AUDIO_SEEKED = "seeked", b.AUDIO_ERROR = "error", b.AUDIO_STALLED = "stalled", b.enableIOS = !1, b.isSupported = function() {
        if (createjs.Sound.BrowserDetect.isIOS && !b.enableIOS) return !1;
        b.generateCapabilities();
        var a = b.tag;
        return null == a || null == b.capabilities ? !1 : !0
    }, b.generateCapabilities = function() {
        if (null == b.capabilities) {
            var a = b.tag = document.createElement("audio");
            if (null == a.canPlayType) return null;
            b.capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var c = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = c.length; f > e; e++) {
                var g = c[e],
                    h = d[g] || g;
                b.capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h)
            }
        }
    };
    var c = a.prototype;
    c.capabilities = null, c.audioSources = null, c.defaultNumChannels = 2, c.loadedHandler = null, c.init = function() {
        this.capabilities = b.capabilities, this.audioSources = {}
    }, c.register = function(a, b) {
        this.audioSources[a] = !0;
        for (var c = createjs.HTMLAudioPlugin.TagPool.get(a), d = null, e = b || this.defaultNumChannels, f = 0; e > f; f++) d = this.createTag(a), c.add(d);
        if (d.id = a, this.loadedHandler = createjs.proxy(this.handleTagLoad, this), d.addEventListener && d.addEventListener("canplaythrough", this.loadedHandler), null == d.onreadystatechange) d.onreadystatechange = this.loadedHandler;
        else {
            var g = d.onreadystatechange;
            d.onreadystatechange = function() {
                g(), this.loadedHandler()
            }
        }
        return {
            tag: d,
            numChannels: e
        }
    }, c.handleTagLoad = function(a) {
        a.target.removeEventListener && a.target.removeEventListener("canplaythrough", this.loadedHandler), a.target.onreadystatechange = null, a.target.src != a.target.id && createjs.HTMLAudioPlugin.TagPool.checkSrc(a.target.id)
    }, c.createTag = function(a) {
        var b = document.createElement("audio");
        return b.autoplay = !1, b.preload = "none", b.src = a, b
    }, c.removeSound = function(a) {
        delete this.audioSources[a], createjs.HTMLAudioPlugin.TagPool.remove(a)
    }, c.removeAllSounds = function() {
        this.audioSources = {}, createjs.HTMLAudioPlugin.TagPool.removeAll()
    }, c.create = function(a) {
        if (!this.isPreloadStarted(a)) {
            var b = createjs.HTMLAudioPlugin.TagPool.get(a),
                c = this.createTag(a);
            c.id = a, b.add(c), this.preload(a, {
                tag: c
            })
        }
        return new createjs.HTMLAudioPlugin.SoundInstance(a, this)
    }, c.isPreloadStarted = function(a) {
        return null != this.audioSources[a]
    }, c.preload = function(a, b, c) {
        this.audioSources[a] = !0, null != c && (b.tag.src = c + a), new createjs.HTMLAudioPlugin.Loader(a, b.tag)
    }, c.toString = function() {
        return "[HTMLAudioPlugin]"
    }, createjs.HTMLAudioPlugin = a
}(), function() {
    function a(a, b) {
        this.init(a, b)
    }
    var b = a.prototype;
    b.src = null, b.uniqueId = -1, b.playState = null, b.owner = null, b.loaded = !1, b.offset = 0, b.delay = 0, b._volume = 1, Object.defineProperty(b, "volume", {
        get: function() {
            return this._volume
        },
        set: function(a) {
            null != Number(a) && (a = Math.max(0, Math.min(1, a)), this._volume = a, this.updateVolume())
        }
    }), b.pan = 0, b.duration = 0, b.remainingLoops = 0, b.delayTimeoutId = null, b.tag = null, b.muted = !1, b.paused = !1, b.addEventListener = null, b.removeEventListener = null, b.removeAllEventListeners = null, b.dispatchEvent = null, b.hasEventListener = null, b._listeners = null, b.endedHandler = null, b.readyHandler = null, b.stalledHandler = null, b.loopHandler = null, b.init = function(a, b) {
        this.src = a, this.owner = b, this.endedHandler = createjs.proxy(this.handleSoundComplete, this), this.readyHandler = createjs.proxy(this.handleSoundReady, this), this.stalledHandler = createjs.proxy(this.handleSoundStalled, this), this.loopHandler = createjs.proxy(this.handleSoundLoop, this)
    }, b.sendEvent = function(a) {
        var b = new createjs.Event(a);
        this.dispatchEvent(b)
    }, b.cleanUp = function() {
        var a = this.tag;
        if (null != a) {
            a.pause(), a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
            try {
                a.currentTime = 0
            } catch (b) {}
            createjs.HTMLAudioPlugin.TagPool.setInstance(this.src, a), this.tag = null
        }
        clearTimeout(this.delayTimeoutId), null != window.createjs && createjs.Sound.playFinished(this)
    }, b.interrupt = function() {
        null != this.tag && (this.playState = createjs.Sound.PLAY_INTERRUPTED, this.cleanUp(), this.paused = !1, this.sendEvent("interrupted"))
    }, b.play = function(a, b, c, d, e, f) {
        this.cleanUp(), createjs.Sound.playInstance(this, a, b, c, d, e, f)
    }, b.beginPlaying = function(a, b, c, d) {
        if (null == window.createjs) return -1;
        var e = this.tag = createjs.HTMLAudioPlugin.TagPool.getInstance(this.src);
        return null == e ? (this.playFailed(), -1) : (e.addEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1), this.offset = a, this.volume = c, this.pan = d, this.updateVolume(), this.remainingLoops = b, 4 !== e.readyState ? (e.addEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), e.addEventListener(createjs.HTMLAudioPlugin.AUDIO_STALLED, this.stalledHandler, !1), e.preload = "auto", e.load()) : this.handleSoundReady(null), this.sendEvent("succeeded"), 1)
    }, b.handleSoundStalled = function() {
        this.cleanUp(), this.sendEvent("failed")
    }, b.handleSoundReady = function() {
        if (null != window.createjs) {
            if (this.duration = 1E3 * this.tag.duration, this.playState = createjs.Sound.PLAY_SUCCEEDED, this.paused = !1, this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), this.offset >= this.getDuration()) return this.playFailed(), void 0;
            this.offset > 0 && (this.tag.currentTime = 0.001 * this.offset), -1 == this.remainingLoops && (this.tag.loop = !0), 0 != this.remainingLoops && (this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1), this.tag.loop = !0), this.tag.play()
        }
    }, b.pause = function() {
        return this.paused || (this.playState != createjs.Sound.PLAY_SUCCEEDED || null == this.tag) ? !1 : (this.paused = !0, this.tag.pause(), clearTimeout(this.delayTimeoutId), !0)
    }, b.resume = function() {
        return this.paused && null != this.tag ? (this.paused = !1, this.tag.play(), !0) : !1
    }, b.stop = function() {
        return this.offset = 0, this.pause(), this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), !0
    }, b.setMasterVolume = function() {
        return this.updateVolume(), !0
    }, b.setVolume = function(a) {
        return this.volume = a, !0
    }, b.updateVolume = function() {
        if (null != this.tag) {
            var a = this.muted || createjs.Sound.masterMute ? 0 : this._volume * createjs.Sound.masterVolume;
            return a != this.tag.volume && (this.tag.volume = a), !0
        }
        return !1
    }, b.getVolume = function() {
        return this.volume
    }, b.setMasterMute = function() {
        return this.updateVolume(), !0
    }, b.setMute = function(a) {
        return null == a || void 0 == a ? !1 : (this.muted = a, this.updateVolume(), !0)
    }, b.getMute = function() {
        return this.muted
    }, b.setPan = function() {
        return !1
    }, b.getPan = function() {
        return 0
    }, b.getPosition = function() {
        return null == this.tag ? this.offset : 1E3 * this.tag.currentTime
    }, b.setPosition = function(a) {
        if (null == this.tag) this.offset = a;
        else {
            this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
            try {
                this.tag.currentTime = 0.001 * a
            } catch (b) {
                return !1
            }
            this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1)
        }
        return !0
    }, b.getDuration = function() {
        return this.duration
    }, b.handleSoundComplete = function() {
        this.offset = 0, null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.sendEvent("complete"))
    }, b.handleSoundLoop = function() {
        this.offset = 0, this.remainingLoops--, 0 == this.remainingLoops && (this.tag.loop = !1, this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1)), this.sendEvent("loop")
    }, b.playFailed = function() {
        null != window.createjs && (this.playState = createjs.Sound.PLAY_FAILED, this.cleanUp(), this.sendEvent("failed"))
    }, b.toString = function() {
        return "[HTMLAudioPlugin SoundInstance]"
    }, createjs.EventDispatcher.initialize(a.prototype), createjs.HTMLAudioPlugin.SoundInstance = a
}(), function() {
    function a(a, b) {
        this.init(a, b)
    }
    var b = a.prototype;
    b.src = null, b.tag = null, b.preloadTimer = null, b.loadedHandler = null, b.init = function(a, b) {
        if (this.src = a, this.tag = b, this.preloadTimer = setInterval(createjs.proxy(this.preloadTick, this), 200), this.loadedHandler = createjs.proxy(this.sendLoadedEvent, this), this.tag.addEventListener && this.tag.addEventListener("canplaythrough", this.loadedHandler), null == this.tag.onreadystatechange) this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this);
        else {
            var c = this.tag.onreadystatechange;
            this.tag.onreadystatechange = function() {
                c(), this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this)
            }
        }
        this.tag.preload = "auto", this.tag.load()
    }, b.preloadTick = function() {
        var a = this.tag.buffered,
            b = this.tag.duration;
        a.length > 0 && (a.end(0) >= b - 1 && this.handleTagLoaded())
    }, b.handleTagLoaded = function() {
        clearInterval(this.preloadTimer)
    }, b.sendLoadedEvent = function() {
        this.tag.removeEventListener && this.tag.removeEventListener("canplaythrough", this.loadedHandler), this.tag.onreadystatechange = null, createjs.Sound.sendFileLoadEvent(this.src)
    }, b.toString = function() {
        return "[HTMLAudioPlugin Loader]"
    }, createjs.HTMLAudioPlugin.Loader = a
}(), function() {
    function a(a) {
        this.init(a)
    }
    var b = a;
    b.tags = {}, b.get = function(c) {
        var d = b.tags[c];
        return null == d && (d = b.tags[c] = new a(c)), d
    }, b.remove = function(a) {
        var c = b.tags[a];
        return null == c ? !1 : (c.removeAll(), delete b.tags[a], !0)
    }, b.removeAll = function() {
        for (var a in b.tags) b.tags[a].removeAll();
        b.tags = {}
    }, b.getInstance = function(a) {
        var c = b.tags[a];
        return null == c ? null : c.get()
    }, b.setInstance = function(a, c) {
        var d = b.tags[a];
        return null == d ? null : d.set(c)
    }, b.checkSrc = function(a) {
        var c = b.tags[a];
        return null == c ? null : (c.checkSrcChange(), void 0)
    };
    var c = a.prototype;
    c.src = null, c.length = 0, c.available = 0, c.tags = null, c.init = function(a) {
        this.src = a, this.tags = []
    }, c.add = function(a) {
        this.tags.push(a), this.length++, this.available++
    }, c.removeAll = function() {
        for (; this.length--;) delete this.tags[this.length];
        this.src = null, this.tags.length = 0
    }, c.get = function() {
        if (0 == this.tags.length) return null;
        this.available = this.tags.length;
        var a = this.tags.pop();
        return null == a.parentNode && document.body.appendChild(a), a
    }, c.set = function(a) {
        var b = createjs.indexOf(this.tags, a); - 1 == b && this.tags.push(a), this.available = this.tags.length
    }, c.checkSrcChange = function() {
        for (var a = this.tags.length - 1, b = this.tags[a].src; a--;) this.tags[a].src = b
    }, c.toString = function() {
        return "[HTMLAudioPlugin TagPool]"
    }, createjs.HTMLAudioPlugin.TagPool = a
}();
(function(window) {
    window.hideAddressbar = function(elem) {
        elem = typeof elem === "string" ? document.querySelector(elem) : elem;
        var ua = navigator.userAgent,
            iphone = ~ua.indexOf("iPhone") || ~ua.indexOf("iPod"),
            ipad = ~ua.indexOf("iPad"),
            ios = iphone || ipad,
            android = ~ua.indexOf("Android"),
            fullscreen = window.navigator.standalone,
            lastWidth = 0;
        if (!(ios || android) || !elem) return;
        if (android) window.addEventListener("scroll", function() {
            elem.style.height = window.innerHeight + "px"
        }, false);
        var setupScroll = function() {
            var height = 0;
            if (ios) {
                height = document.documentElement.clientHeight;
                if (iphone && !fullscreen) height += 60
            } else if (android) height = window.innerHeight + 56;
            elem.style.height = height + "px";
            setTimeout(scrollTo, 0, 0, 1)
        };
        (function resize() {
            var pageWidth = elem.offsetWidth;
            if (lastWidth === pageWidth) return;
            lastWidth = pageWidth;
            setupScroll();
            window.addEventListener("resize", resize, false);
            console.log("resizefunt")
        })()
    }
})(this);

function isArrayContains(arr, obj) {
    return arr.indexOf(obj) > -1
}

function addToArray(arr, obj) {
    if (!isArrayContains(arr, obj)) arr.push(obj)
}
function removeFromArray(arr, obj) {
    if (isArrayContains(arr, obj)) arr.splice(arr.indexOf(obj, 0), 1)
}
function setCacheFromOther(objTo, objFrom) {
    objTo.cacheCanvas = objFrom.cacheCanvas;
    objTo.cacheID = objFrom.cacheID;
    objTo._cacheWidth = objFrom._cacheWidth;
    objTo._cacheHeight = objFrom._cacheHeight;
    objTo._cacheOffsetX = objFrom._cacheOffsetX;
    objTo._cacheOffsetY = objFrom._cacheOffsetY;
    objTo._cacheScale = objFrom._cacheScale
}

function deleteCache(obj) {
    obj.cacheCanvas = null;
    obj.cacheID = 0
}
function trace(obj) {
    if (isLevelEditor) console.log(obj)
}
function onHoverScale(target) {
    target.scaleX = target.scaleY = spriteScale * 1.2 * (target.defaultScale ? target.defaultScale : 1)
}
function onOutScale(target) {
    target.scaleX = target.scaleY = spriteScale * (target.defaultScale ? target.defaultScale : 1)
}
function removeFromParent(obj) {
    if (obj.parent) obj.parent.removeChild(obj)
}

function addToParent(obj, parent) {
    removeFromParent(obj);
    if (parent) parent.addChild(obj)
}
function setSpriteScale(obj, scale) {
    obj.scaleX = obj.scaleY = scale
}
function setTextAndCenter(x, y, text, field) {
    if (field.text == text) return;
    field.text = text;
    var bounds = field.getBounds();
    field.x = x - (bounds.width >> 1) * field.scaleX;
    if (y) field.y = y - (bounds.height >> 1) * field.scaleY
}
function setAnimationSpeed(vision, speed) {
    vision._animation.speed = speed
}(function(context, factory) {
    [].indexOf || (Array.prototype.indexOf = function(a, b, c) {
        for (c = this.length, b = (c + ~~b) % c; b < c && (!(b in this) || this[b] !== a); b++);
        return b ^ c ? b : -1
    });
    if (typeof define === "function" && define.amd) define(constructAMD);
    else constructGlobal();

    function constructAMD() {
        return init();

        function init() {
            var library;
            library = factory("amd");
            library.fork = init;
            return library
        }
    }
    function constructGlobal() {
        var library;
        library = init();
        library.noConflict("KeyboardJS", "k");

        function init() {
            var library, namespaces = [],
                previousValues = {};
            library = factory("global");
            library.fork = init;
            library.noConflict = noConflict;
            return library;

            function noConflict() {
                var args, nI, newNamespaces;
                newNamespaces = Array.prototype.slice.apply(arguments);
                for (nI = 0; nI < namespaces.length; nI += 1) if (typeof previousValues[namespaces[nI]] === "undefined") delete context[namespaces[nI]];
                else context[namespaces[nI]] = previousValues[namespaces[nI]];
                previousValues = {};
                for (nI = 0; nI < newNamespaces.length; nI += 1) {
                    if (typeof newNamespaces[nI] !== "string") throw new Error("Cannot replace namespaces. All new namespaces must be strings.");
                    previousValues[newNamespaces[nI]] = context[newNamespaces[nI]];
                    context[newNamespaces[nI]] = library
                }
                namespaces = newNamespaces;
                return namespaces
            }
        }
    }
})(this, function(env) {
    var KeyboardJS = {},
        locales = {},
        locale, map, macros, activeKeys = [],
        bindings = [],
        activeBindings = [],
        activeMacros = [],
        aI, usLocale;
    usLocale = {
        "map": {
            3: ["cancel"],
            8: ["backspace"],
            9: ["tab"],
            12: ["clear"],
            13: ["enter"],
            16: ["shift"],
            17: ["ctrl"],
            18: ["alt", "menu"],
            19: ["pause", "break"],
            20: ["capslock"],
            27: ["escape", "esc"],
            32: ["space", "spacebar"],
            33: ["pageup"],
            34: ["pagedown"],
            35: ["end"],
            36: ["home"],
            37: ["left"],
            38: ["up"],
            39: ["right"],
            40: ["down"],
            41: ["select"],
            42: ["printscreen"],
            43: ["execute"],
            44: ["snapshot"],
            45: ["insert", "ins"],
            46: ["delete", "del"],
            47: ["help"],
            91: ["command", "windows", "win", "super", "leftcommand", "leftwindows", "leftwin", "leftsuper"],
            92: ["command", "windows", "win", "super", "rightcommand", "rightwindows", "rightwin", "rightsuper"],
            145: ["scrolllock", "scroll"],
            186: ["semicolon", ";"],
            187: ["equal", "equalsign", "="],
            188: ["comma", ","],
            189: ["dash", "-"],
            190: ["period", "."],
            191: ["slash", "forwardslash", "/"],
            192: ["graveaccent", "`"],
            219: ["openbracket", "["],
            220: ["backslash", "\\"],
            221: ["closebracket", "]"],
            222: ["apostrophe", "'"],
            48: ["zero", "0"],
            49: ["one", "1"],
            50: ["two", "2"],
            51: ["three", "3"],
            52: ["four", "4"],
            53: ["five", "5"],
            54: ["six", "6"],
            55: ["seven", "7"],
            56: ["eight", "8"],
            57: ["nine", "9"],
            96: ["numzero", "num0"],
            97: ["numone", "num1"],
            98: ["numtwo", "num2"],
            99: ["numthree", "num3"],
            100: ["numfour", "num4"],
            101: ["numfive", "num5"],
            102: ["numsix", "num6"],
            103: ["numseven", "num7"],
            104: ["numeight", "num8"],
            105: ["numnine", "num9"],
            106: ["nummultiply", "num*"],
            107: ["numadd", "num+"],
            108: ["numenter"],
            109: ["numsubtract", "num-"],
            110: ["numdecimal", "num."],
            111: ["numdevide", "num/"],
            144: ["numlock", "num"],
            112: ["f1"],
            113: ["f2"],
            114: ["f3"],
            115: ["f4"],
            116: ["f5"],
            117: ["f6"],
            118: ["f7"],
            119: ["f8"],
            120: ["f9"],
            121: ["f10"],
            122: ["f11"],
            123: ["f12"]
        },
        "macros": [
            ["shift + `", ["tilde", "~"]],
            ["shift + 1", ["exclamation", "exclamationpoint", "!"]],
            ["shift + 2", ["at", "@"]],
            ["shift + 3", ["number", "#"]],
            ["shift + 4", ["dollar", "dollars", "dollarsign", "$"]],
            ["shift + 5", ["percent", "%"]],
            ["shift + 6", ["caret", "^"]],
            ["shift + 7", ["ampersand", "and", "&"]],
            ["shift + 8", ["asterisk", "*"]],
            ["shift + 9", ["openparen", "("]],
            ["shift + 0", ["closeparen", ")"]],
            ["shift + -", ["underscore", "_"]],
            ["shift + =", ["plus", "+"]],
            ["shift + (", ["opencurlybrace", "opencurlybracket", "{"]],
            ["shift + )", ["closecurlybrace", "closecurlybracket", "}"]],
            ["shift + \\", ["verticalbar", "|"]],
            ["shift + ;", ["colon", ":"]],
            ["shift + '", ["quotationmark", '"']],
            ["shift + !,", ["openanglebracket", "<"]],
            ["shift + .", ["closeanglebracket", ">"]],
            ["shift + /", ["questionmark", "?"]]
        ]
    };
    for (aI = 65; aI <= 90; aI += 1) {
        usLocale.map[aI] = String.fromCharCode(aI + 32);
        usLocale.macros.push(["shift + " + String.fromCharCode(aI + 32) + ", capslock + " + String.fromCharCode(aI + 32), [String.fromCharCode(aI)]])
    }
    registerLocale("us", usLocale);
    getSetLocale("us");
    enable();
    KeyboardJS.enable = enable;
    KeyboardJS.disable = disable;
    KeyboardJS.activeKeys = getActiveKeys;
    KeyboardJS.isPressed = isPressed;
    KeyboardJS.on = createBinding;
    KeyboardJS.clear = removeBindingByKeyCombo;
    KeyboardJS.clear.key = removeBindingByKeyName;
    KeyboardJS.locale = getSetLocale;
    KeyboardJS.locale.register = registerLocale;
    KeyboardJS.macro = createMacro;
    KeyboardJS.macro.remove = removeMacro;
    KeyboardJS.key = {};
    KeyboardJS.key.name = getKeyName;
    KeyboardJS.key.code = getKeyCode;
    KeyboardJS.combo = {};
    KeyboardJS.combo.active = isSatisfiedCombo;
    KeyboardJS.combo.parse = parseKeyCombo;
    KeyboardJS.combo.stringify = stringifyKeyCombo;
    return KeyboardJS;

    function enable() {
        if (window.addEventListener) {
            document.addEventListener("keydown", keydown, false);
            document.addEventListener("keyup", keyup, false);
            window.addEventListener("blur", reset, false);
            window.addEventListener("webkitfullscreenchange", reset, false);
            window.addEventListener("mozfullscreenchange", reset, false)
        } else if (window.attachEvent) {
            document.attachEvent("onkeydown", keydown);
            document.attachEvent("onkeyup", keyup);
            window.attachEvent("onblur", reset)
        }
    }
    function disable() {
        reset();
        if (window.removeEventListener) {
            document.removeEventListener("keydown", keydown, false);
            document.removeEventListener("keyup", keyup, false);
            window.removeEventListener("blur", reset, false);
            window.removeEventListener("webkitfullscreenchange", reset, false);
            window.removeEventListener("mozfullscreenchange", reset, false)
        } else if (window.detachEvent) {
            document.detachEvent("onkeydown", keydown);
            document.detachEvent("onkeyup", keyup);
            window.detachEvent("onblur", reset)
        }
    }
    function reset(event) {
        activeKeys = [];
        pruneMacros();
        pruneBindings(event)
    }
    function keydown(event) {
        var keyNames, kI;
        keyNames = getKeyName(event.keyCode);
        if (keyNames.length < 1) return;
        for (kI = 0; kI < keyNames.length; kI += 1) addActiveKey(keyNames[kI]);
        executeMacros();
        executeBindings(event)
    }
    function keyup(event) {
        var keyNames, kI;
        keyNames = getKeyName(event.keyCode);
        if (keyNames.length < 1) return;
        for (kI = 0; kI < keyNames.length; kI += 1) removeActiveKey(keyNames[kI]);
        pruneMacros();
        pruneBindings(event)
    }
    function getKeyName(keyCode) {
        return map[keyCode] || []
    }
    function getKeyCode(keyName) {
        var keyCode;
        for (keyCode in map) {
            if (!map.hasOwnProperty(keyCode)) continue;
            if (map[keyCode].indexOf(keyName) > -1) return keyCode
        }
        return false
    }

    function createMacro(combo, injectedKeys) {
        if (typeof combo !== "string" && (typeof combo !== "object" || typeof combo.push !== "function")) throw new Error("Cannot create macro. The combo must be a string or array.");
        if (typeof injectedKeys !== "object" || typeof injectedKeys.push !== "function") throw new Error("Cannot create macro. The injectedKeys must be an array.");
        macros.push([combo, injectedKeys])
    }
    function removeMacro(combo) {
        var macro;
        if (typeof combo !== "string" && (typeof combo !== "object" || typeof combo.push !== "function")) throw new Error("Cannot remove macro. The combo must be a string or array.");
        for (mI = 0; mI < macros.length; mI += 1) {
            macro = macros[mI];
            if (compareCombos(combo, macro[0])) {
                removeActiveKey(macro[1]);
                macros.splice(mI, 1);
                break
            }
        }
    }
    function executeMacros() {
        var mI, combo, kI;
        for (mI = 0; mI < macros.length; mI += 1) {
            combo = parseKeyCombo(macros[mI][0]);
            if (activeMacros.indexOf(macros[mI]) === -1 && isSatisfiedCombo(combo)) {
                activeMacros.push(macros[mI]);
                for (kI = 0; kI < macros[mI][1].length; kI += 1) addActiveKey(macros[mI][1][kI])
            }
        }
    }
    function pruneMacros() {
        var mI, combo, kI;
        for (mI = 0; mI < activeMacros.length; mI += 1) {
            combo = parseKeyCombo(activeMacros[mI][0]);
            if (isSatisfiedCombo(combo) === false) {
                for (kI = 0; kI < activeMacros[mI][1].length; kI += 1) removeActiveKey(activeMacros[mI][1][kI]);
                activeMacros.splice(mI, 1);
                mI -= 1
            }
        }
    }
    function createBinding(keyCombo, keyDownCallback, keyUpCallback) {
        var api = {},
            binding, subBindings = [],
            bindingApi = {},
            kI, subCombo;
        if (typeof keyCombo === "string") keyCombo = parseKeyCombo(keyCombo);
        for (kI = 0; kI < keyCombo.length; kI += 1) {
            binding = {};
            subCombo = stringifyKeyCombo([keyCombo[kI]]);
            if (typeof subCombo !== "string") throw new Error("Failed to bind key combo. The key combo must be string.");
            binding.keyCombo = subCombo;
            binding.keyDownCallback = [];
            binding.keyUpCallback = [];
            if (keyDownCallback) binding.keyDownCallback.push(keyDownCallback);
            if (keyUpCallback) binding.keyUpCallback.push(keyUpCallback);
            bindings.push(binding);
            subBindings.push(binding)
        }
        api.clear = clear;
        api.on = on;
        return api;

        function clear() {
            var bI;
            for (bI = 0; bI < subBindings.length; bI += 1) bindings.splice(bindings.indexOf(subBindings[bI]), 1)
        }
        function on(eventName) {
            var api = {},
                callbacks, cI, bI;
            if (typeof eventName !== "string") throw new Error("Cannot bind callback. The event name must be a string.");
            if (eventName !== "keyup" && eventName !== "keydown") throw new Error('Cannot bind callback. The event name must be a "keyup" or "keydown".');
            callbacks = Array.prototype.slice.apply(arguments, [1]);
            for (cI = 0; cI < callbacks.length; cI += 1) if (typeof callbacks[cI] === "function") if (eventName === "keyup") for (bI = 0; bI < subBindings.length; bI += 1) subBindings[bI].keyUpCallback.push(callbacks[cI]);
            else if (eventName === "keydown") for (bI = 0; bI < subBindings.length; bI += 1) subBindings[bI].keyDownCallback.push(callbacks[cI]);
            api.clear = clear;
            return api;

            function clear() {
                var cI, bI;
                for (cI = 0; cI < callbacks.length; cI += 1) if (typeof callbacks[cI] === "function") if (eventName === "keyup") for (bI = 0; bI < subBindings.length; bI += 1) subBindings[bI].keyUpCallback.splice(subBindings[bI].keyUpCallback.indexOf(callbacks[cI]), 1);
                else for (bI = 0; bI < subBindings.length; bI += 1) subBindings[bI].keyDownCallback.splice(subBindings[bI].keyDownCallback.indexOf(callbacks[cI]), 1)
            }
        }
    }
    function removeBindingByKeyCombo(keyCombo) {
        var bI, binding, keyName;
        for (bI = 0; bI < bindings.length; bI += 1) {
            binding = bindings[bI];
            if (compareCombos(keyCombo, binding.keyCombo)) {
                bindings.splice(bI, 1);
                bI -= 1
            }
        }
    }
    function removeBindingByKeyName(keyName) {
        var bI, kI, binding;
        if (keyName) for (bI = 0; bI < bindings.length; bI += 1) {
            binding = bindings[bI];
            for (kI = 0; kI < binding.keyCombo.length; kI += 1) if (binding.keyCombo[kI].indexOf(keyName) > -1) {
                bindings.splice(bI, 1);
                bI -= 1;
                break
            }
        } else bindings = []
    }
    function executeBindings(event) {
        var bI, sBI, binding, bindingKeys, remainingKeys, cI, killEventBubble, kI, bindingKeysSatisfied, index, sortedBindings = [],
            bindingWeight;
        remainingKeys = [].concat(activeKeys);
        for (bI = 0; bI < bindings.length; bI += 1) {
            bindingWeight = extractComboKeys(bindings[bI].keyCombo).length;
            if (!sortedBindings[bindingWeight]) sortedBindings[bindingWeight] = [];
            sortedBindings[bindingWeight].push(bindings[bI])
        }
        for (sBI = sortedBindings.length - 1; sBI >= 0; sBI -= 1) {
            if (!sortedBindings[sBI]) continue;
            for (bI = 0; bI < sortedBindings[sBI].length; bI += 1) {
                binding = sortedBindings[sBI][bI];
                bindingKeys = extractComboKeys(binding.keyCombo);
                bindingKeysSatisfied = true;
                for (kI = 0; kI < bindingKeys.length; kI += 1) if (remainingKeys.indexOf(bindingKeys[kI]) === -1) {
                    bindingKeysSatisfied = false;
                    break
                }
                if (bindingKeysSatisfied && isSatisfiedCombo(binding.keyCombo)) {
                    activeBindings.push(binding);
                    for (kI = 0; kI < bindingKeys.length; kI += 1) {
                        index = remainingKeys.indexOf(bindingKeys[kI]);
                        if (index > -1) {
                            remainingKeys.splice(index, 1);
                            kI -= 1
                        }
                    }
                    for (cI = 0; cI < binding.keyDownCallback.length; cI += 1) if (binding.keyDownCallback[cI](event, getActiveKeys(), binding.keyCombo) === false) killEventBubble = true;
                    if (killEventBubble === true) {
                        event.preventDefault();
                        event.stopPropagation()
                    }
                }
            }
        }
    }
    function pruneBindings(event) {
        var bI, cI, binding, killEventBubble;
        for (bI = 0; bI < activeBindings.length; bI += 1) {
            binding = activeBindings[bI];
            if (isSatisfiedCombo(binding.keyCombo) === false) {
                for (cI = 0; cI < binding.keyUpCallback.length; cI += 1) if (binding.keyUpCallback[cI](event, getActiveKeys(), binding.keyCombo) === false) killEventBubble = true;
                if (killEventBubble === true) {
                    event.preventDefault();
                    event.stopPropagation()
                }
                activeBindings.splice(bI, 1);
                bI -= 1
            }
        }
    }
    function compareCombos(keyComboArrayA, keyComboArrayB) {
        var cI, sI, kI;
        keyComboArrayA = parseKeyCombo(keyComboArrayA);
        keyComboArrayB = parseKeyCombo(keyComboArrayB);
        if (keyComboArrayA.length !== keyComboArrayB.length) return false;
        for (cI = 0; cI < keyComboArrayA.length; cI += 1) {
            if (keyComboArrayA[cI].length !== keyComboArrayB[cI].length) return false;
            for (sI = 0; sI < keyComboArrayA[cI].length; sI += 1) {
                if (keyComboArrayA[cI][sI].length !== keyComboArrayB[cI][sI].length) return false;
                for (kI = 0; kI < keyComboArrayA[cI][sI].length; kI += 1) if (keyComboArrayB[cI][sI].indexOf(keyComboArrayA[cI][sI][kI]) === -1) return false
            }
        }
        return true
    }
    function isSatisfiedCombo(keyCombo) {
        var cI, sI, stage, kI, stageOffset = 0,
            index, comboMatches;
        keyCombo = parseKeyCombo(keyCombo);
        for (cI = 0; cI < keyCombo.length; cI += 1) {
            comboMatches = true;
            stageOffset = 0;
            for (sI = 0; sI < keyCombo[cI].length; sI += 1) {
                stage = [].concat(keyCombo[cI][sI]);
                for (kI = stageOffset; kI < activeKeys.length; kI += 1) {
                    index = stage.indexOf(activeKeys[kI]);
                    if (index > -1) {
                        stage.splice(index, 1);
                        stageOffset = kI
                    }
                }
                if (stage.length !== 0) {
                    comboMatches = false;
                    break
                }
            }
            if (comboMatches) return true
        }
        return false
    }

    function extractComboKeys(keyCombo) {
        var cI, sI, kI, keys = [];
        keyCombo = parseKeyCombo(keyCombo);
        for (cI = 0; cI < keyCombo.length; cI += 1) for (sI = 0; sI < keyCombo[cI].length; sI += 1) keys = keys.concat(keyCombo[cI][sI]);
        return keys
    }
    function parseKeyCombo(keyCombo) {
        var s = keyCombo,
            i = 0,
            op = 0,
            ws = false,
            nc = false,
            combos = [],
            combo = [],
            stage = [],
            key = "";
        if (typeof keyCombo === "object" && typeof keyCombo.push === "function") return keyCombo;
        if (typeof keyCombo !== "string") throw new Error('Cannot parse "keyCombo" because its type is "' + typeof keyCombo + '". It must be a "string".');
        while (s.charAt(i) === " ") i += 1;
        while (true) {
            if (s.charAt(i) === " ") {
                while (s.charAt(i) === " ") i += 1;
                ws = true
            } else if (s.charAt(i) === ",") {
                if (op || nc) throw new Error("Failed to parse key combo. Unexpected , at character index " + i + ".");
                nc = true;
                i += 1
            } else if (s.charAt(i) === "+") {
                if (key.length) {
                    stage.push(key);
                    key = ""
                }
                if (op || nc) throw new Error("Failed to parse key combo. Unexpected + at character index " + i + ".");
                op = true;
                i += 1
            } else if (s.charAt(i) === ">") {
                if (key.length) {
                    stage.push(key);
                    key = ""
                }
                if (stage.length) {
                    combo.push(stage);
                    stage = []
                }
                if (op || nc) throw new Error("Failed to parse key combo. Unexpected > at character index " + i + ".");
                op = true;
                i += 1
            } else if (i < s.length - 1 && (s.charAt(i) === "!" && (s.charAt(i + 1) === ">" || (s.charAt(i + 1) === "," || s.charAt(i + 1) === "+")))) {
                key += s.charAt(i + 1);
                op = false;
                ws = false;
                nc = false;
                i += 2
            } else if (i < s.length && (s.charAt(i) !== "+" && (s.charAt(i) !== ">" && (s.charAt(i) !== "," && s.charAt(i) !== " ")))) {
                if (op === false && ws === true || nc === true) {
                    if (key.length) {
                        stage.push(key);
                        key = ""
                    }
                    if (stage.length) {
                        combo.push(stage);
                        stage = []
                    }
                    if (combo.length) {
                        combos.push(combo);
                        combo = []
                    }
                }
                op = false;
                ws = false;
                nc = false;
                while (i < s.length && (s.charAt(i) !== "+" && (s.charAt(i) !== ">" && (s.charAt(i) !== "," && s.charAt(i) !== " ")))) {
                    key += s.charAt(i);
                    i += 1
                }
            } else {
                i += 1;
                continue
            }
            if (i >= s.length) {
                if (key.length) {
                    stage.push(key);
                    key = ""
                }
                if (stage.length) {
                    combo.push(stage);
                    stage = []
                }
                if (combo.length) {
                    combos.push(combo);
                    combo = []
                }
                break
            }
        }
        return combos
    }
    function stringifyKeyCombo(keyComboArray) {
        var cI, ccI, output = [];
        if (typeof keyComboArray === "string") return keyComboArray;
        if (typeof keyComboArray !== "object" || typeof keyComboArray.push !== "function") throw new Error("Cannot stringify key combo.");
        for (cI = 0; cI < keyComboArray.length; cI += 1) {
            output[cI] = [];
            for (ccI = 0; ccI < keyComboArray[cI].length; ccI += 1) output[cI][ccI] = keyComboArray[cI][ccI].join(" + ");
            output[cI] = output[cI].join(" > ")
        }
        return output.join(" ")
    }
    function getActiveKeys(keyName) {
        return [].concat(activeKeys)
    }
    function isPressed(keyName) {
        return activeKeys.indexOf(keyName) > -1
    }
    function addActiveKey(keyName) {
        if (keyName.match(/\s/)) throw new Error("Cannot add key name " + keyName + " to active keys because it contains whitespace.");
        if (activeKeys.indexOf(keyName) > -1) return;
        activeKeys.push(keyName)
    }
    function removeActiveKey(keyName) {
        var keyCode = getKeyCode(keyName);
        if (keyCode === "91" || keyCode === "92") activeKeys = [];
        else activeKeys.splice(activeKeys.indexOf(keyName), 1)
    }
    function registerLocale(localeName, localeMap) {
        if (typeof localeName !== "string") throw new Error("Cannot register new locale. The locale name must be a string.");
        if (typeof localeMap !== "object") throw new Error("Cannot register " + localeName + " locale. The locale map must be an object.");
        if (typeof localeMap.map !== "object") throw new Error("Cannot register " + localeName + " locale. The locale map is invalid.");
        if (!localeMap.macros) localeMap.macros = [];
        locales[localeName] = localeMap
    }
    function getSetLocale(localeName) {
        if (localeName) {
            if (typeof localeName !== "string") throw new Error("Cannot set locale. The locale name must be a string.");
            if (!locales[localeName]) throw new Error("Cannot set locale to " + localeName + " because it does not exist. If you would like to submit a " + localeName + " locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.");
            map = locales[localeName].map;
            macros = locales[localeName].macros;
            locale = localeName
        }
        return locale
    }
});
var allLevels = [
    [
        ["DECOR_CLOUD_3_TYPE", 501.35, 180.4, 1, 1, 0, 262, 89, [""]],
        ["DECOR_CLOUD_2_TYPE", 191.25, 185.9, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_1_TYPE", 347.3, 652.5, 1, 1, 0, 239, 106, [""]],
        ["HERO_TYPE", 341.35, 112.1, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 349.25, 200.4, 1, 1, 0, 89, 80, [""]],
        ["AIM_TYPE", 343.55, 604.5, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 341.85, 275.95, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 341.85, 351.95, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 341.85, 417.95, 1, 1, 0, 57, 55, [""]],
        ["PHYSICS_RECT_TYPE", 187.55, 155.5, 2.3, 0.28, 0, 207, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 499.45, 153.5, 2.3, 0.28, 0, 207, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 318.65, 711.85, 7.316, 0.28, 0, 658.4, 25.8, [""]],
        ["PHYSICS_RECT_TYPE", 346.65, 618.1, 2.47, 0.28, 0, 222.3, 25.2, [""]]
    ],
    [
        ["DECOR_CLOUD_3_TYPE", 473.3, 497.95, 1, 1, 0, 262, 89, [""]],
        ["DECOR_CLOUD_1_TYPE", 103, 223.95, 1, 1, 23, 261.4, 192.5, [""]],
        ["HERO_TYPE", 107.05, 129.4, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 178.5, 185.9, 1, 1, 25, 114.8, 110.5, [""]],
        ["AIM_TYPE", 546.5, 465.3, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 358.9, 306, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 252.1, 215.5, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 438.7, 409.45, 1, 1, 0, 57, 55, [""]],
        ["PHYSICS_RECT_TYPE", 117.75, 202.9, 2.326, 0.28, 25, 200.4, 111.2, [""]],
        ["PHYSICS_RECT_TYPE", 473.35, 479.9, 2.546, 0.28, 0, 229.1, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 600.5, 469.6, 0.509, 0.28, -90, 25.2, 45.8, [""]]
    ],
    [
        ["DECOR_CLOUD_4_TYPE", 162.45, 565.6, 1, 1, 31, 276.6, 225.1, [""]],
        ["DECOR_CLOUD_3_TYPE", 481.25, 333.7, 1, 1, -25, 275, 192.1, [""]],
        ["DECOR_CLOUD_2_TYPE", 136.95, 168.75, 1, 1, 26, 249.7, 190, [""]],
        ["DECOR_CLOUD_1_TYPE", 381.3, 615, 1, 1, 0, 239, 106, [""]],
        ["HERO_TYPE", 132.05, 65, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 203.5, 127.5, 1, 1, 25, 114.8, 110.5, [""]],
        ["AIM_TYPE", 422.3, 571.55, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 472.3, 248.6, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 210.55, 453.9, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 319.85, 161.7, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 371.35, 321.5, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 154.85, 145.5, 2.319, 0.28, 25, 199.8, 110.9, [""]],
        ["PHYSICS_RECT_TYPE", 458.1, 320.35, 2.32, 0.28, -25, 199.4, 112.4, [""]],
        ["PHYSICS_RECT_TYPE", 318.65, 711.85, 7.316, 0.28, 0, 658.4, 25.8, [""]],
        ["PHYSICS_RECT_TYPE", 171.55, 533.9, 2.47, 0.28, 30, 205.7, 131.7, [""]],
        ["PHYSICS_RECT_TYPE", 380.4, 587.15, 2.47, 0.28, 0, 222.3, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 503.2, 576.85, 0.509, 0.28, -90, 25.2, 45.8, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 112.05, 192.15, 1, 1, 26, 249.7, 190.1, [""]],
        ["DECOR_CLOUD_3_TYPE", 340.95, 242.7, 1, 1, 0, 262, 89, [""]],
        ["DECOR_CLOUD_4_TYPE", 228.8, 553.5, 1, 1, 26, 278.6, 212.2, [""]],
        ["DECOR_CLOUD_2_TYPE", 456.9, 609.6, 1, 1, 0, 229, 100, [""]],
        ["TELEPORT_TYPE", 468.4, 170.8, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 220.65, 375.45, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 123, 98.05, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 202.95, 153.05, 1, 1, 0, 89, 80, [""]],
        ["BONUS_STAR_TYPE", 321.95, 156.8, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 516.75, 566.4, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 265.4, 450, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 388.05, 510, 1, 1, 0, 57, 55, [""]],
        ["PHYSICS_RECT_TYPE", 127.65, 170.75, 2.297, 0.28, 29, 192.9, 122.5, [""]],
        ["PHYSICS_RECT_TYPE", 327.55, 222.9, 2.3, 0.28, 0, 207, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 257.85, 526.65, 2.297, 0.28, 29, 192.9, 122.5, [""]],
        ["PHYSICS_RECT_TYPE", 457.75, 578.8, 2.3, 0.28, 0, 207, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 575.85, 568.5, 0.509, 0.28, -90, 25.2, 45.8, [""]]
    ],
    [
        ["DECOR_CLOUD_3_TYPE", 157.95, 541.5, 1, 1, 19, 276.7, 169.4, [""]],
        ["DECOR_CLOUD_1_TYPE", 124, 178.1, 1, 1, 23, 261.4, 192.5, [""]],
        ["DECOR_CLOUD_2_TYPE", 503, 350.15, 1, 1, -35, 245, 213.2, [""]],
        ["DECOR_CLOUD_2_TYPE", 420.75, 650.9, 1, 1, 0, 229, 100, [""]],
        ["TELEPORT_TYPE", 503.1, 252.5, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 94.7, 375, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 128.05, 83.55, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 199.5, 140.05, 1, 1, 25, 114.8, 110.5, [""]],
        ["AIM_TYPE", 415.05, 611, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 260.55, 507.65, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 277.75, 190.1, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 440.75, 221.65, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 258.3, 513.4, 1, 1, 0, 89.3, 80.3, [""]],
        ["CLOUD_TYPE", 287.6, 266.4, 1, 1, 5, 95.3, 87.1, [""]],
        ["CLOUD_TYPE", 381.8, 288.45, 1, 1, 5, 95.3, 87.1, [""]],
        ["PHYSICS_RECT_TYPE", 138.75, 157.05, 2.326, 0.28, 25, 200.4, 111.2, [""]],
        ["PHYSICS_RECT_TYPE", 163.55, 525.35, 2.546, 0.28, 19, 224.4, 100.2, [""]],
        ["PHYSICS_RECT_TYPE", 485.2, 335.15, 2.326, 0.28, -36, 183.7, 144.1, [""]],
        ["PHYSICS_RECT_TYPE", 415.65, 625.85, 2.3, 0.28, 0, 207, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 495.95, 615.55, 0.509, 0.28, -90, 25.2, 45.8, [""]]
    ],
    [
        ["DECOR_CLOUD_1_TYPE", 80, 328.95, 1, 1, 42, 248.9, 238.2, [""]],
        ["DECOR_CLOUD_2_TYPE", 520.5, 434.4, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_2_TYPE", 292.55, 435.4, 1, 1, 0, 229, 100, [""]],
        ["HERO_TYPE", 73.05, 202.5, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 134.5, 274.15, 1, 1, 0, 89, 80, [""]],
        ["AIM_TYPE", 546.5, 394.75, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 198.4, 316.15, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 294.5, 351.95, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 418.55, 351.95, 1, 1, 0, 57, 55, [""]],
        ["MOVER_CLOUD_DANGER_TYPE", 394.55, 254, 1, 1, 0, 135, 141, ["V", "2", "60", "500"]],
        ["PHYSICS_RECT_TYPE", 100.55, 313.55, 2.326, 0.28, 43, 169.8, 161.6, [""]],
        ["PHYSICS_RECT_TYPE", 402.35, 406.05, 4.842, 0.28, 0, 435.8, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 607.65, 383.85, 0.509, 0.28, -90, 25.2, 45.8, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 38.6, 206.8, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_1_TYPE", 332.55, 203.8, 1, 1, 0, 239, 106, [""]],
        ["DECOR_CLOUD_2_TYPE", 637.55, 206.8, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_3_TYPE", 523.95, 628.4, 1, 1, 0, 262, 89, [""]],
        ["TELEPORT_TYPE", 190.45, 619.05, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 489.4, 50.15, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 186.65, 127, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 192, 220.3, 1, 1, 0, 89, 80, [""]],
        ["BONUS_STAR_TYPE", 488.1, 214.5, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 488.1, 220.3, 1, 1, 0, 89, 80, [""]],
        ["MOVER_CLOUD_DANGER_TYPE", 53, 404, 1, 1, 0, 135, 141, ["G", "2", "40", "200"]],
        ["MOVER_CLOUD_DANGER_TYPE", 340.6, 404, 1, 1, 0, 135, 141, ["G", "2", "300", "450"]],
        ["BONUS_STAR_TYPE", 189.6, 313, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 189.6, 528.95, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 497.6, 586.05, 1, 1, 0, 183, 183, [""]],
        ["PHYSICS_RECT_TYPE", 71.15, 169.4, 1.301, 0.28, 0, 117, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 336.5, 169.4, 2.245, 0.28, 0, 202, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 362.25, 711.85, 7.316, 0.28, 0, 658.4, 25.8, [""]],
        ["PHYSICS_RECT_TYPE", 519.25, 601.15, 2.47, 0.28, 0, 222.3, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 582.45, 169.4, 0.952, 0.28, 0, 85.7, 25.2, [""]]
    ],
    [
        ["DECOR_CLOUD_3_TYPE", 336.35, 655.95, 1, 1, 0, 262, 89, [""]],
        ["HERO_TYPE", 467.6, 56.7, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 130.65, 94.1, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 195.9, 154.95, 1, 1, 0, 89, 80, [""]],
        ["BONUS_STAR_TYPE", 325.85, 428.55, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 387, 120, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 330, 296.95, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 324.1, 627, 1, 1, 0, 183, 183, [""]],
        ["CLOUD_TYPE", 300.35, 189.95, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 334.25, 298, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 563, 122.5, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 480.6, 173.5, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 112.05, 208.5, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 211.7, 289.95, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 387.35, 189.95, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 432.15, 277.95, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 563, 241.9, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 200.7, 441.05, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 260.35, 375.05, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 107.35, 312.5, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 403, 379.05, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 451.15, 441.05, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 524.05, 341.4, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 335.4, 640.2, 2.47, 0.28, 0, 222.3, 25.2, [""]]
    ],
    [
        ["DECOR_CLOUD_3_TYPE", 137.45, 179.95, 1, 1, 0, 262, 89, [""]],
        ["DECOR_CLOUD_2_TYPE", 513.45, 652.4, 1, 1, 0, 229, 100, [""]],
        ["TELEPORT_TYPE", 512.8, 71.55, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["TELEPORT_TYPE", 91.15, 326.1, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["BOMB_TYPE", 42.35, 104.5, 1, 1, 0, 100, 92, ["50"]],
        ["HERO_TYPE", 134, 97.5, 1, 1, 0, 100, 100, [""]],
        ["MOVER_1_TYPE", 90, 390.45, 1, 1, 0, 167, 81, ["G", "2", "90", "540"]],
        ["AIM_TYPE", 517.45, 604.5, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 510.95, 162.95, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 254.95, 318.45, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 510.95, 318.45, 1, 1, 0, 57, 55, [""]],
        ["PHYSICS_RECT_TYPE", 136.1, 159.8, 2.728, 0.28, 0, 245.5, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 514.4, 627.1, 2.481, 0.28, 0, 223.3, 25.2, [""]]
    ],
    [
        ["DECOR_CLOUD_3_TYPE", 130.65, 312.65, 1, 1, 0, 262, 89, [""]],
        ["DECOR_CLOUD_1_TYPE", 496.95, 621.9, 1, 1, 0, 239, 106, [""]],
        ["DECOR_CLOUD_3_TYPE", 504.05, 64.25, 1, 1, -151, 271.9, 206.4, [""]],
        ["DECOR_CLOUD_2_TYPE", 344.95, 289.9, 0.9, 0.9, -17, 223.4, 146.3, [""]],
        ["HERO_TYPE", 174.65, 409.4, 1, 1, 0, 100, 100, [""]],
        ["BONUS_STAR_TYPE", 478.9, 128.5, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 494.5, 381.4, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 322.9, 204.5, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 124.4, 283.2, 1, 1, 0, 183, 183, [""]],
        ["CLOUD_TYPE", 506.4, 267.1, 1, 1, 0, 89, 80, [""]],
        ["MOVER_1_TYPE", 177.65, 478.85, 1, 1, 0, 167, 81, ["G", "2", "100", "500"]],
        ["BOMB_TYPE", 496, 538.45, 1, 1, 0, 100, 92, ["200"]],
        ["CLOUD_TYPE", 427.4, 181.7, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 135.7, 294.85, 2.47, 0.28, 0, 222.3, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 494.7, 595.05, 2.239, 0.28, 0, 201.5, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 35.4, 275.3, 0.713, 0.28, -90, 25.2, 64.2, [""]],
        ["PHYSICS_RECT_TYPE", 331.75, 266.7, 2.12, 0.28, -18, 189.2, 82.9, [""]],
        ["PHYSICS_RECT_TYPE", 504.45, 84.85, 2.5, 0.28, 28, 210.5, 127.9, [""]]
    ],
    [
        ["DECOR_CLOUD_3_TYPE", 577, 166.45, 1, 1, 0, 262, 89, [""]],
        ["DECOR_CLOUD_1_TYPE", 230.9, 596.8, 1, 1, 38, 253.7, 230.5, [""]],
        ["DECOR_CLOUD_2_TYPE", 435.95, 657.45, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_3_TYPE", 634, 646.4, 1, 1, 0, 262, 89, [""]],
        ["TELEPORT_TYPE", 552.55, 308.55, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 90, 77.05, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 498.9, 82.4, 1, 1, 0, 100, 100, [""]],
        ["BOMB_TYPE", 593.95, 87.4, 1, 1, 0, 100, 92, ["70"]],
        ["MOVER_1_TYPE", 90.5, 580, 1, 1, 0, 167, 81, ["V", "2", "160", "580"]],
        ["CLOUD_TYPE", 385.65, 173.5, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 94.5, 318.4, 1, 1, 0, 89, 80, [""]],
        ["BONUS_STAR_TYPE", 318.2, 96.5, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 91.15, 194.7, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 548.5, 395, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 546.5, 604.5, 1, 1, 0, 183, 183, [""]],
        ["CLOUD_TYPE", 297.7, 208.5, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 550.35, 145, 1.994, 0.28, 0, 179.4, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 250.6, 568.4, 1.993, 0.28, 37, 158.2, 128.5, [""]],
        ["PHYSICS_RECT_TYPE", 477.65, 620.05, 3.608, 0.28, 0, 324.7, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 627.4, 574.55, 0.713, 0.28, -90, 25.2, 64.2, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 352.45, 244.8, 0.729, 0.729, 53, 158, 177.5, [""]],
        ["DECOR_CLOUD_1_TYPE", 282.05, 245.45, 0.7, 0.7, -42, 174.4, 166.5, [""]],
        ["DECOR_CLOUD_1_TYPE", 56.9, 381.15, 0.799, 0.799, 50, 187.4, 200.8, [""]],
        ["DECOR_CLOUD_4_TYPE", 242, 691.65, 0.8, 0.8, 0, 205.6, 87.2, [""]],
        ["DECOR_CLOUD_3_TYPE", 478.8, 553.6, 0.731, 0.731, 0, 191.4, 65, [""]],
        ["DECOR_CLOUD_2_TYPE", 616.55, 501.7, 0.729, 0.729, -51, 161.2, 175.8, [""]],
        ["TELEPORT_TYPE", 187.95, 398.6, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 573.3, 59.85, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 333.1, 82.95, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 388.95, 154.95, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 283.9, 154.95, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 542.5, 489.55, 1, 1, 0, 89, 80, [""]],
        ["BONUS_STAR_TYPE", 564.45, 142.5, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 122.1, 288.05, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 453.95, 474.75, 1, 1, 0, 57, 55, [""]],
        ["MOVER_CLOUD_DANGER_TYPE", 362.95, 326.3, 0.8, 0.8, 0, 108, 112.8, ["V", "2", "326", "668"]],
        ["AIM_TYPE", 244.95, 653.9, 1, 1, 0, 183, 183, [""]],
        ["PHYSICS_RECT_TYPE", 367.2, 228.35, 1.677, 0.28, 50, 116.4, 131.7, [""]],
        ["PHYSICS_RECT_TYPE", 272.05, 226.25, 1.877, 0.28, 140, 145.5, 128, [""]],
        ["PHYSICS_RECT_TYPE", 81.65, 374.1, 1.697, 0.279, 49, 118.8, 132.1, [""]],
        ["PHYSICS_RECT_TYPE", 602.35, 487.35, 1.697, 0.28, 129, 115.6, 134.6, [""]],
        ["PHYSICS_RECT_TYPE", 478.1, 538.95, 1.697, 0.279, 0, 152.7, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 242.4, 673, 1.697, 0.279, 0, 152.7, 25.1, [""]]
    ],
    [
        ["DECOR_CLOUD_1_TYPE", 84.15, 173.4, 0.799, 0.799, 23, 208.8, 152.7, [""]],
        ["DECOR_CLOUD_4_TYPE", 242, 691.65, 0.8, 0.8, 0, 205.6, 87.2, [""]],
        ["DECOR_CLOUD_2_TYPE", 386.35, 510.7, 0.729, 0.729, -1, 167.6, 74.6, [""]],
        ["DECOR_CLOUD_2_TYPE", 507.9, 595.4, 0.729, 0.729, -1, 167.6, 74.6, [""]],
        ["PHYSICS_RECT_TYPE", 509.3, 583.35, 1.715, 0.28, 0, 154.3, 25.2, [""]],
        ["TELEPORT_TYPE", 317.8, 246.85, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 528.8, 448.9, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 414.9, 433.25, 1, 1, 0, 100, 100, [""]],
        ["CLOUD_TYPE", 187.5, 137.5, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 157.95, 285.5, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 114.05, 542.9, 1, 1, 0, 89, 80, [""]],
        ["BONUS_STAR_TYPE", 194.05, 416.55, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 324.15, 405.75, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 234.6, 327.5, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 244.95, 653.9, 1, 1, 0, 183, 183, [""]],
        ["BOMB_TYPE", 101.4, 93.25, 1, 1, 23, 128.4, 124.2, ["150"]],
        ["CLOUD_TYPE", 610.45, 542.9, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 108.55, 403.9, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 102.35, 157.5, 1.697, 0.279, 23, 150.1, 83.8, [""]],
        ["PHYSICS_RECT_TYPE", 387.75, 498.65, 1.715, 0.28, 0, 154.3, 25.2, [""]],
        ["PHYSICS_RECT_TYPE", 242.4, 673, 1.697, 0.279, 0, 152.7, 25.1, [""]]
    ],
    [
        ["DECOR_CLOUD_1_TYPE", 230, 647, 1, 1, 0, 239, 106, [""]],
        ["MOVER_2_TYPE", 90, 156.65, 1, 1, 0, 166, 70, ["G", "2", "90", "540"]],
        ["HERO_TYPE", 86, 88, 1, 1, 0, 100, 100, [""]],
        ["MOVER_2_TYPE", 528.5, 436.45, 1, 1, 0, 166, 70, ["G", "2", "90", "540"]],
        ["BONUS_STAR_TYPE", 302.05, 196.95, 1, 1, 0, 57, 55, [""]],
        ["MOVER_CLOUD_DANGER_TYPE", 336.25, 254, 0.84, 0.84, 0, 113.4, 118.4, ["G", "2", "90", "540"]],
        ["BONUS_STAR_TYPE", 270.75, 361.95, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 335.75, 59.5, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 225.5, 604.5, 1, 1, 0, 183, 183, [""]],
        ["PHYSICS_RECT_TYPE", 231.65, 625, 1.874, 0.279, 0, 168.7, 25.1, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 114.5, 183, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_3_TYPE", 54.4, 527.95, 1, 1, 0, 262, 89, [""]],
        ["DECOR_CLOUD_2_TYPE", 531.05, 612, 1, 1, 0, 229, 100, [""]],
        ["DECOR_OWL_TYPE", 578, 112.1, 1, 1, 0, 46, 61, [""]],
        ["DECOR_CLOUD_4_TYPE", 523.95, 216.05, 1, 1, -46, 257.6, 259.9, [""]],
        ["DECOR_CLOUD_2_TYPE", 183.95, 529.75, 1, 1, 0, 229, 100, [""]],
        ["HERO_TYPE", 145.95, 88.6, 1, 1, 0, 100, 100, [""]],
        ["BOMB_TYPE", 50, 92.6, 1, 1, 0, 100, 92, ["70"]],
        ["BONUS_STAR_TYPE", 372.95, 225.7, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 377.95, 233.2, 1, 1, 0, 89, 80, [""]],
        ["BOMB_TYPE", 68, 375.5, 1, 1, 0, 100, 92, ["70"]],
        ["BONUS_STAR_TYPE", 257.5, 318.5, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 261.7, 327.25, 1, 1, 0, 89, 80, [""]],
        ["MOVER_CLOUD_DANGER_TYPE", 377.95, 316, 0.8, 0.8, 0, 108, 112.8, ["V", "3", "316", "640"]],
        ["AIM_TYPE", 532.95, 567.75, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 366.65, 425.5, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 113.95, 450, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 24.95, 450, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 107.6, 151.15, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 495.05, 199.25, 2.54, 0.28, -43, 184.5, 174.2, [""]],
        ["PHYSICS_RECT_TYPE", 145.55, 502.55, 3.214, 0.279, 0, 289.3, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 528.9, 583.05, 2.38, 0.279, 0, 214.2, 25.1, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 114.5, 183, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_3_TYPE", 131, 467.5, 1, 1, 16, 276.4, 158.7, [""]],
        ["DECOR_CLOUD_2_TYPE", 531.05, 612, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_4_TYPE", 189.05, 601.35, 1, 1, 0, 257, 109, [""]],
        ["HERO_TYPE", 129.95, 378.6, 1, 1, 0, 100, 100, [""]],
        ["BOMB_TYPE", 50, 92.6, 1, 1, 0, 100, 92, ["70"]],
        ["BONUS_STAR_TYPE", 214.65, 415.65, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 418.15, 116.1, 1, 1, 0, 89, 80, [""]],
        ["BOMB_TYPE", 164.7, 100.05, 1, 1, 0, 100, 92, ["70"]],
        ["BONUS_STAR_TYPE", 309.65, 464.5, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 219.95, 415.2, 1, 1, 0, 89, 80, [""]],
        ["AIM_TYPE", 532.95, 567.75, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 414.95, 519.5, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 418.15, 322.7, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 72.8, 535.1, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 107.6, 151.15, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 136.8, 442.7, 2.38, 0.279, 16, 212.7, 84, [""]],
        ["PHYSICS_RECT_TYPE", 528.9, 583.05, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 201, 577.05, 2.38, 0.279, 0, 214.2, 25.1, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 521.5, 288, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_2_TYPE", 119.05, 598, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_4_TYPE", 95.05, 177.1, 1, 1, 0, 257, 109, [""]],
        ["DECOR_CLOUD_2_TYPE", 86.4, 325.75, 1, 1, 0, 229, 100, [""]],
        ["PHYSICS_RECT_TYPE", 523.65, 265.75, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["DECOR_CLOUD_2_TYPE", 572.65, 425.75, 1, 1, 0, 229, 100, [""]],
        ["PHYSICS_RECT_TYPE", 574.8, 403.5, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["TELEPORT_TYPE", 337.35, 359.6, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 460.8, 73.45, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 153.55, 237.4, 1, 1, 0, 100, 100, [""]],
        ["BOMB_TYPE", 54.55, 241.4, 1, 1, 0, 100, 92, ["70"]],
        ["BONUS_STAR_TYPE", 243.2, 503.25, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 578.15, 53.1, 1, 1, 0, 89, 80, [""]],
        ["BOMB_TYPE", 164.7, 100.05, 1, 1, 0, 100, 92, ["70"]],
        ["BONUS_STAR_TYPE", 469.65, 173.55, 1, 1, 0, 57, 55, [""]],
        ["AIM_TYPE", 120.95, 553.75, 1, 1, 0, 183, 183, [""]],
        ["BONUS_STAR_TYPE", 271.5, 289.25, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 257.55, 615.25, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 335.7, 674.35, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 607.15, 209.75, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 417.55, 615.25, 1, 1, 0, 89, 80, [""]],
        ["BOMB_TYPE", 548.15, 344.95, 1, 1, 0, 100, 92, ["70"]],
        ["CLOUD_TYPE", 635.2, 345.25, 1, 1, 0, 89, 80, [""]],
        ["PHYSICS_RECT_TYPE", 83.65, 299.95, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 116.45, 578.3, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 107, 152.8, 2.38, 0.279, 0, 214.2, 25.1, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 135.05, 242, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_4_TYPE", 138.15, 530.85, 1, 1, -33, 275, 231.1, [""]],
        ["DECOR_CLOUD_2_TYPE", 512.65, 593.55, 1, 1, 31, 247.5, 204.8, [""]],
        ["DECOR_CLOUD_2_TYPE", 520.65, 386.65, 1, 1, 25, 249.8, 187.3, [""]],
        ["PHYSICS_RECT_TYPE", 532.55, 361.5, 2.38, 0.279, 27, 202, 120.3, [""]],
        ["DECOR_CLOUD_2_TYPE", 531.05, 44.3, 1, 1, 0, 229, 100, [""]],
        ["PHYSICS_RECT_TYPE", 532.9, 12.55, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["DECOR_CLOUD_2_TYPE", 286.05, 44.3, 1, 1, 0, 229, 100, [""]],
        ["PHYSICS_RECT_TYPE", 288.05, 12.55, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["HERO_TYPE", 463.15, 457.3, 1, 1, 0, 100, 100, [""]],
        ["BOMB_TYPE", 98.9, 461.3, 1, 1, 0, 100, 92, ["120"]],
        ["BONUS_STAR_TYPE", 306.2, 415.7, 1, 1, 0, 57, 55, [""]],
        ["BOMB_TYPE", 527.1, 296, 1, 1, 0, 100, 92, ["120"]],
        ["BONUS_STAR_TYPE", 278.05, 152.3, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 35.95, 512.7, 1, 1, 0, 89, 80, [""]],
        ["BOMB_TYPE", 527.1, 504.3, 1, 1, 0, 100, 92, ["120"]],
        ["CLOUD_TYPE", 614.3, 342.9, 1, 1, 9, 100.4, 92.9, [""]],
        ["CLOUD_TYPE", 604.45, 560.65, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 35.95, 354.5, 1, 1, 0, 89, 80, [""]],
        ["BONUS_STAR_TYPE", 456.65, 264.5, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 397.1, 512.7, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 254.7, 457.7, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 35.95, 434.3, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 603, 260.9, 1, 1, 9, 100.4, 92.9, [""]],
        ["CLOUD_TYPE", 462.15, 264.7, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 604.45, 476.8, 1, 1, 0, 89, 80, [""]],
        ["AIM_TYPE", 136.95, 197.75, 1, 1, 0, 183, 183, [""]],
        ["PHYSICS_RECT_TYPE", 526.35, 570.35, 2.38, 0.279, 31, 195.9, 133.2, [""]],
        ["PHYSICS_RECT_TYPE", 132.45, 222.3, 2.38, 0.279, 0, 214.2, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 120.9, 509.6, 2.38, 0.279, -36, 188.7, 145.2, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 316, 337, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_3_TYPE", 542.55, 428, 1, 1, -40, 257.1, 237.7, [""]],
        ["DECOR_CLOUD_2_TYPE", 341.5, 615.9, 1, 1, -14, 246.1, 151.3, [""]],
        ["DECOR_CLOUD_2_TYPE", 157.55, 625, 1, 1, 1, 230.7, 104, [""]],
        ["TELEPORT_TYPE", 51.65, 501.9, 1, 1, 0, 74.75, 70.25, ["IN"]],
        ["TELEPORT_TYPE", 305.95, 73.95, 1, 1, 0, 74.75, 70.25, ["OUT"]],
        ["HERO_TYPE", 546.9, 314.7, 1, 1, -10, 116.1, 116.1, [""]],
        ["BONUS_STAR_TYPE", 338.6, 469.35, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 153, 536.5, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 258.55, 496.6, 1, 1, 0, 57, 55, [""]],
        ["CLOUD_TYPE", 415, 435.9, 1, 1, -10, 101.8, 94.5, [""]],
        ["CLOUD_TYPE", 384, 533, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 250.55, 569.1, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 68, 545, 1, 1, 0, 89, 80, [""]],
        ["BOMB_TYPE", 473.35, 378.9, 1, 1, -10, 114.7, 108.3, ["150"]],
        ["AIM_TYPE", 305.9, 288, 1, 1, 0, 183, 183, [""]],
        ["PHYSICS_RECT_TYPE", 310.85, 305.25, 2.226, 0.279, 0, 200.3, 25.1, [""]],
        ["PHYSICS_RECT_TYPE", 547.65, 398.65, 2.881, 0.279, -43, 205.6, 196.5, [""]],
        ["PHYSICS_RECT_TYPE", 149, 607, 2.03, 0.279, 4, 184.1, 38.5, [""]],
        ["PHYSICS_RECT_TYPE", 335.6, 590.9, 2.037, 0.279, -15, 183.7, 70.7, [""]]
    ],
    [
        ["DECOR_CLOUD_2_TYPE", 328.95, 301, 1, 1, 0, 229, 100, [""]],
        ["DECOR_CLOUD_3_TYPE", 371.65, 67.7, 1, 1, 6, 269.8, 115.8, [""]],
        ["DECOR_OWL_TYPE", 575.45, 58.95, 1, 1, 21, 64.6, 73.35, [""]],
        ["DECOR_CLOUD_1_TYPE", 545, 100.25, 1, 1, -142, 253.3, 231.2, [""]],
        ["HERO_TYPE", 508.55, 320.85, 1, 1, 0, 100, 100, [""]],
        ["BONUS_STAR_TYPE", 440.85, 166.5, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 522.15, 461, 1, 1, 0, 57, 55, [""]],
        ["BONUS_STAR_TYPE", 516.5, 243.35, 1, 1, 0, 57, 55, [""]],
        ["MOVER_2_TYPE", 512.65, 398.45, 1, 1, 0, 166, 70, ["V", "2", "220", "500"]],
        ["MOVER_2_TYPE", 106.85, 431.95, 1, 1, 0, 166, 70, ["V", "2", "300", "500"]],
        ["BOMB_TYPE", 113.85, 118.2, 1, 1, 0, 100, 92, ["150"]],
        ["CLOUD_TYPE", 77, 192.75, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 157, 192.75, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 44.5, 124.2, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 186.35, 121, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 633.5, 224, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 633.5, 335, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 633.5, 428.85, 1, 1, 0, 89, 80, [""]],
        ["CLOUD_TYPE", 633.5, 535.2, 1, 1, 0, 89, 80, [""]],
        ["MOVER_2_TYPE", 250.45, 594.4, 1, 1, 0, 166, 70, ["G", "2", "90", "530"]],
        ["AIM_TYPE", 318.85, 252, 1, 1, 0, 183, 183, [""]],
        ["PHYSICS_RECT_TYPE", 324.75, 273.25, 2.226, 0.279, -2, 201.1, 32, [""]],
        ["PHYSICS_RECT_TYPE", 356.4, 48.1, 2.226, 0.279, 6, 201.8, 45.9, [""]],
        ["PHYSICS_RECT_TYPE", 530.15, 117.3, 2.226, 0.279, 38, 173.4, 143, [""]]
    ]
];
var manifest = [{
    src: PRELOADER_BAR,
    id: "preloaderbar"
}, {
    src: PRELOADER_BG,
    id: "preloaderbg"
}, {
    src: PRELOADER_BUT,
    id: "preloaderbut"
}, {
    src: MAIN_BG,
    id: "mainbg"
}, {
    src: "sunAssets.png",
    id: "sunspritesheet"
}, {
    src: "assWin.png",
    id: "winspritesheet"
}];
sunCFG = {
    "framerate": 24,
    "images": ["assets/sunAssets.png"],
    "frames": [
        [1233, 2, 184, 184, 0, 92, 170],
        [1612, 876, 167, 81, 0, 83, 54],
        [790, 1051, 91, 26, 0, 0, 0],
        [252, 1051, 56, 55, 0, 28, 27],
        [542, 2, 212, 214, 0, 106, 107],
        [478, 414, 120, 121, 0, 57, 60],
        [1091, 546, 226, 107, 0, 113, 54],
        [1726, 664, 230, 101, 0, 115, 51],
        [1166, 876, 246, 89, 0, 123, 45],
        [210, 771, 258, 101, 0, 129, 51],
        [1062, 876, 100, 92, 0, 50, 46],
        [362, 1051, 51, 51, 0, 25, 23],
        [1775, 980, 60, 60, 0, 29, 26],
        [2, 980, 69, 67, 0, 35, 29],
        [1783, 876, 76, 76, 0, 40, 35],
        [1959, 414, 86, 84, 0, 44, 41],
        [965, 876, 93, 94, 0, 47, 46],
        [683, 664, 103, 102, 0, 53, 49],
        [400, 546, 110, 111, 0, 58, 55],
        [858, 414, 121, 119, 0, 62, 61],
        [1901, 245, 126, 128, 0, 63, 65],
        [1627, 245, 136, 135, 0, 69, 68],
        [1339, 245, 143, 144, 0, 74, 74],
        [870, 245, 152, 151, 0, 76, 79],
        [543, 245, 159, 160, 0, 78, 82],
        [1824, 2, 168, 165, 0, 84, 83],
        [1310, 664, 100, 101, 0, 50, 50],
        [1414, 664, 100, 101, 0, 50, 50],
        [1102, 664, 100, 101, 0, 50, 50],
        [106, 771, 100, 101, 0, 50, 50],
        [472, 771, 100, 101, 0, 50, 50],
        [1622, 664, 100, 101, 0, 50, 50],
        [790, 664, 100, 101, 0, 50, 50],
        [894, 664, 100, 101, 0, 50, 50],
        [998, 664, 100, 101, 0, 50, 50],
        [1518, 664, 100, 101, 0, 50, 50],
        [1206, 664, 100, 101, 0, 50, 50],
        [576, 771, 100, 101, 0, 50, 50],
        [2, 771, 100, 101, 0, 50, 50],
        [1304, 771, 100, 101, 0, 50, 50],
        [1616, 771, 100, 101, 0, 50, 50],
        [784, 771, 100, 101, 0, 50, 50],
        [888, 771, 100, 101, 0, 50, 50],
        [992, 771, 100, 101, 0, 50, 50],
        [1512, 771, 100, 101, 0, 50, 50],
        [680, 771, 100, 101, 0, 50, 50],
        [1720, 771, 100, 101, 0, 50, 50],
        [1096, 771, 100, 101, 0, 50, 50],
        [1200, 771, 100, 101, 0, 50, 50],
        [1408, 771, 100, 101, 0, 50, 50],
        [693, 1051, 30, 33, 0, -4, -4],
        [636, 1051, 23, 33, 0, -7, -4],
        [543, 1051, 26, 34, 0, -6, -3],
        [481, 1051, 27, 35, 0, -6, -3],
        [512, 1051, 27, 34, 0, -5, -3],
        [605, 1051, 27, 33, 0, -5, -4],
        [2018, 546, 28, 35, 0, -5, -3],
        [663, 1051, 26, 33, 0, -6, -4],
        [573, 1051, 28, 33, 0, -5, -4],
        [727, 1051, 28, 33, 0, -5, -4],
        [1518, 876, 90, 81, 0, 45, 40],
        [106, 876, 106, 100, 0, 61, 46],
        [1321, 546, 109, 105, 0, 61, 49],
        [514, 546, 113, 111, 0, 61, 52],
        [1111, 414, 118, 117, 0, 62, 55],
        [352, 414, 122, 122, 0, 62, 58],
        [2, 414, 126, 128, 0, 62, 61],
        [1767, 245, 130, 133, 0, 63, 63],
        [1486, 245, 137, 138, 0, 67, 64],
        [1191, 245, 144, 145, 0, 69, 68],
        [706, 245, 160, 153, 0, 84, 73],
        [373, 245, 166, 160, 0, 84, 77],
        [190, 245, 179, 164, 0, 90, 79],
        [1622, 2, 198, 177, 0, 99, 94],
        [2046, 2, 0, 0, 0, 285, 178],
        [569, 664, 110, 103, 0, 57, 52],
        [127, 546, 121, 114, 0, 60, 52],
        [1584, 414, 125, 116, 0, 65, 52],
        [2, 664, 106, 103, 0, 57, 52],
        [1785, 546, 118, 103, 0, 68, 52],
        [344, 664, 107, 103, 0, 53, 52],
        [977, 546, 110, 108, 0, 54, 52],
        [1434, 546, 108, 104, 0, 54, 52],
        [747, 546, 112, 110, 0, 57, 52],
        [1836, 414, 119, 115, 0, 61, 52],
        [132, 414, 106, 123, 0, 53, 52],
        [1233, 414, 107, 116, 0, 56, 52],
        [1658, 546, 123, 104, 0, 58, 52],
        [1344, 414, 107, 116, 0, 56, 52],
        [242, 414, 106, 123, 0, 53, 52],
        [1713, 414, 119, 115, 0, 61, 52],
        [631, 546, 112, 110, 0, 57, 52],
        [1546, 546, 108, 104, 0, 54, 52],
        [863, 546, 110, 108, 0, 54, 52],
        [1907, 546, 107, 103, 0, 53, 52],
        [112, 664, 118, 103, 0, 68, 52],
        [234, 664, 106, 103, 0, 57, 52],
        [1455, 414, 125, 116, 0, 65, 52],
        [2, 546, 121, 114, 0, 60, 52],
        [455, 664, 110, 103, 0, 57, 52],
        [759, 1051, 27, 27, 0, 14, 15],
        [417, 1051, 60, 49, 0, 32, 23],
        [1960, 664, 85, 81, 0, 43, 45],
        [1416, 876, 98, 89, 0, 50, 51],
        [632, 876, 121, 100, 0, 55, 59],
        [252, 546, 144, 113, 0, 65, 61],
        [1026, 245, 161, 146, 0, 74, 78],
        [2, 245, 184, 165, 0, 86, 89],
        [1421, 2, 197, 181, 0, 91, 97],
        [1006, 2, 223, 189, 0, 101, 101],
        [758, 2, 244, 206, 0, 108, 108],
        [278, 2, 260, 223, 0, 117, 118],
        [2, 2, 272, 239, 0, 122, 127],
        [2031, 245, 0, 0, 0, 271, 186],
        [528, 876, 100, 100, 0, 50, 50],
        [424, 876, 100, 100, 0, 50, 50],
        [320, 876, 100, 100, 0, 50, 50],
        [216, 876, 100, 100, 0, 50, 50],
        [1824, 771, 100, 100, 0, 50, 50],
        [1928, 771, 100, 100, 0, 50, 50],
        [757, 876, 100, 100, 0, 50, 50],
        [861, 876, 100, 100, 0, 50, 50],
        [2, 876, 100, 100, 0, 50, 50],
        [602, 414, 124, 120, 0, 62, 60],
        [730, 414, 124, 120, 0, 62, 60],
        [983, 414, 124, 118, 0, 62, 59],
        [1863, 876, 166, 71, 0, 83, 49],
        [1275, 980, 46, 61, 0, 23, 31],
        [725, 980, 46, 61, 0, 23, 31],
        [1025, 980, 46, 61, 0, 23, 31],
        [675, 980, 46, 61, 0, 23, 31],
        [625, 980, 46, 61, 0, 23, 31],
        [575, 980, 46, 61, 0, 23, 31],
        [475, 980, 46, 61, 0, 23, 31],
        [425, 980, 46, 61, 0, 23, 31],
        [375, 980, 46, 61, 0, 23, 31],
        [325, 980, 46, 61, 0, 23, 31],
        [275, 980, 46, 61, 0, 23, 31],
        [1525, 980, 46, 61, 0, 23, 31],
        [775, 980, 46, 61, 0, 23, 31],
        [1675, 980, 46, 61, 0, 23, 31],
        [1625, 980, 46, 61, 0, 23, 31],
        [1575, 980, 46, 61, 0, 23, 31],
        [225, 980, 46, 61, 0, 23, 31],
        [175, 980, 46, 61, 0, 23, 31],
        [1225, 980, 46, 61, 0, 23, 31],
        [1475, 980, 46, 61, 0, 23, 31],
        [1425, 980, 46, 61, 0, 23, 31],
        [1375, 980, 46, 61, 0, 23, 31],
        [1075, 980, 46, 61, 0, 23, 31],
        [1175, 980, 46, 61, 0, 23, 31],
        [1125, 980, 46, 61, 0, 23, 31],
        [525, 980, 46, 61, 0, 23, 31],
        [975, 980, 46, 61, 0, 23, 31],
        [925, 980, 46, 61, 0, 23, 31],
        [875, 980, 46, 61, 0, 23, 31],
        [825, 980, 46, 61, 0, 23, 31],
        [1996, 2, 46, 62, 0, 23, 31],
        [1939, 980, 46, 59, 0, 23, 28],
        [102, 1051, 46, 57, 0, 23, 26],
        [312, 1051, 46, 54, 0, 23, 23],
        [202, 1051, 46, 56, 0, 23, 25],
        [1989, 980, 46, 58, 0, 23, 27],
        [1839, 980, 46, 60, 0, 23, 29],
        [125, 980, 46, 62, 0, 23, 31],
        [1725, 980, 46, 60, 0, 23, 29],
        [2, 1051, 46, 58, 0, 23, 27],
        [152, 1051, 46, 56, 0, 23, 25],
        [52, 1051, 46, 58, 0, 23, 27],
        [1889, 980, 46, 59, 0, 23, 28],
        [1325, 980, 46, 61, 0, 23, 30],
        [75, 980, 46, 62, 0, 23, 31]
    ],
    "animations": {
        0: {
            "speed": 1,
            "frames": [50]
        },
        1: {
            "speed": 1,
            "frames": [51]
        },
        2: {
            "speed": 1,
            "frames": [52]
        },
        3: {
            "speed": 1,
            "frames": [53]
        },
        4: {
            "speed": 1,
            "frames": [54]
        },
        5: {
            "speed": 1,
            "frames": [55]
        },
        6: {
            "speed": 1,
            "frames": [56]
        },
        7: {
            "speed": 1,
            "frames": [57]
        },
        8: {
            "speed": 1,
            "frames": [58]
        },
        9: {
            "speed": 1,
            "frames": [59]
        },
        "MOVER_1_TYPE": {
            "speed": 1,
            "frames": [1]
        },
        "DECOR_OWL_UHU": {
            "speed": 1,
            "frames": [157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171]
        },
        "DECOR_CLOUD_2_TYPE": {
            "speed": 1,
            "frames": [7]
        },
        "help1": {
            "speed": 1,
            "frames": [123]
        },
        "TELEPORT_TYPE": {
            "speed": 1,
            "frames": [5]
        },
        "AIM_TYPE": {
            "speed": 1,
            "frames": [0]
        },
        "HERO_VICTORY": {
            "speed": 1,
            "frames": [4]
        },
        "BONUS_STAR_TYPE": {
            "speed": 1,
            "frames": [3]
        },
        "DECOR_CLOUD_4_TYPE": {
            "speed": 1,
            "frames": [9]
        },
        "DECOR_OWL_TYPE": {
            "speed": 1,
            "frames": [127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156]
        },
        "CLOUD_TYPE": {
            "speed": 1,
            "frames": [60]
        },
        "DECOR_CLOUD_1_TYPE": {
            "speed": 1,
            "frames": [6]
        },
        "BOMB_BREAK": {
            "speed": 1,
            "frames": [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113]
        },
        "MOVER_2_TYPE": {
            "speed": 1,
            "frames": [126]
        },
        "help3": {
            "speed": 1,
            "frames": [125]
        },
        "HERO_TYPE": {
            "speed": 1,
            "frames": [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
        },
        "DECOR_CLOUD_3_TYPE": {
            "speed": 1,
            "frames": [8]
        },
        "help2": {
            "speed": 1,
            "frames": [124]
        },
        "HERODIED": {
            "speed": 1,
            "frames": [114, 115, 116, 117, 118, 119, 120, 121, 122]
        },
        "CLOUD_BREAK": {
            "speed": 1,
            "frames": [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74]
        },
        "starEffect": {
            "speed": 1,
            "frames": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
        },
        "MOVER_CLOUD_DANGER_TYPE": {
            "speed": 1,
            "frames": [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
        },
        "PHYSICS_RECT_TYPE": {
            "speed": 1,
            "frames": [2]
        },
        "BOMB_TYPE": {
            "speed": 1,
            "frames": [10]
        }
    }
};
var winCFG = {
    "framerate": 24,
    "images": ["assets/assWin.png"],
    "frames": [
        [646, 2, 584, 426, 0, 292, 213],
        [1234, 2, 571, 360, 0, 284, 178],
        [224, 1057, 70, 70, 0, 35, 35],
        [1960, 2, 70, 70, 0, 35, 35],
        [1849, 937, 70, 70, 0, 35, 35],
        [747, 937, 103, 103, 0, 51, 52],
        [76, 1057, 70, 70, 0, 35, 35],
        [1888, 1057, 152, 50, 0, 76, 25],
        [1809, 2, 147, 147, 0, 73, 74],
        [1923, 937, 70, 70, 0, 35, 35],
        [150, 1057, 70, 70, 0, 35, 35],
        [961, 937, 90, 90, 0, 45, 45],
        [298, 1057, 70, 70, 0, 35, 35],
        [2, 1057, 70, 70, 0, 35, 35],
        [1823, 670, 107, 105, 0, 53, 53],
        [418, 937, 107, 105, 0, 53, 53],
        [1934, 670, 107, 105, 0, 53, 53],
        [529, 937, 107, 105, 0, 53, 53],
        [703, 1131, 120, 28, 0, 0, 0],
        [1116, 1057, 51, 59, 0, -7, -6],
        [1270, 1057, 35, 58, 0, -13, -6],
        [971, 1057, 42, 60, 0, -11, -4],
        [1997, 937, 44, 62, 0, -10, -3],
        [1221, 1057, 45, 59, 0, -9, -5],
        [1017, 1057, 44, 60, 0, -10, -5],
        [1065, 1057, 47, 60, 0, -9, -5],
        [1358, 1057, 43, 58, 0, -10, -6],
        [1171, 1057, 46, 59, 0, -9, -5],
        [1309, 1057, 45, 58, 0, -10, -6],
        [1270, 937, 229, 72, 0, -1, 0],
        [2, 2, 640, 664, 0, 320, 332],
        [763, 670, 298, 226, 0, 0, 0],
        [2, 670, 299, 263, 0, 0, 0],
        [305, 670, 454, 239, 0, 0, 0],
        [640, 937, 103, 103, 0, 52, 52],
        [854, 937, 103, 98, 0, 52, 52],
        [2, 937, 412, 116, 0, 0, 0],
        [1491, 670, 328, 116, 0, 0, 0],
        [1254, 670, 233, 128, 0, 0, 0],
        [604, 1131, 95, 34, 0, 0, 0],
        [1065, 670, 185, 128, 0, 0, 0],
        [1503, 937, 342, 72, 0, 0, 0],
        [2, 1131, 310, 54, 0, 0, 0],
        [316, 1131, 284, 52, 0, 0, 0],
        [1055, 937, 211, 85, 0, 0, 0],
        [372, 1057, 595, 70, 0, 0, 0],
        [1405, 1057, 479, 54, 0, 0, 0]
    ],
    "animations": {
        0: {
            "speed": 1,
            "frames": [19]
        },
        2: {
            "speed": 1,
            "frames": [21]
        },
        3: {
            "speed": 1,
            "frames": [22]
        },
        4: {
            "speed": 1,
            "frames": [23]
        },
        5: {
            "speed": 1,
            "frames": [24]
        },
        6: {
            "speed": 1,
            "frames": [25]
        },
        7: {
            "speed": 1,
            "frames": [26]
        },
        8: {
            "speed": 1,
            "frames": [27]
        },
        1: {
            "speed": 1,
            "frames": [20]
        },
        9: {
            "speed": 1,
            "frames": [28]
        },
        "levelbuttonlocked": {
            "speed": 1,
            "frames": [5]
        },
        "menuCloud1": {
            "speed": 1,
            "frames": [31]
        },
        "starBlack": {
            "speed": 1,
            "frames": [34]
        },
        "butRestart": {
            "speed": 1,
            "frames": [4]
        },
        "splashlogo": {
            "speed": 1,
            "frames": [29]
        },
        "menuCloud2": {
            "speed": 1,
            "frames": [32]
        },
        "butNext": {
            "speed": 1,
            "frames": [9]
        },
        "smallWin": {
            "speed": 1,
            "frames": [0]
        },
        "lvlLabelStar0": {
            "speed": 1,
            "frames": [14]
        },
        "menuStar": {
            "speed": 1,
            "frames": [35]
        },
        "labelKedi": {
            "speed": 1,
            "frames": [41]
        },
        "butCredits": {
            "speed": 1,
            "frames": [6]
        },
        "butBack": {
            "speed": 1,
            "frames": [10]
        },
        "butMusic": {
            "speed": 1,
            "frames": [13]
        },
        "butMenu": {
            "speed": 1,
            "frames": [3]
        },
        "labelPaul": {
            "speed": 1,
            "frames": [42]
        },
        "levelFailedLabel": {
            "speed": 1,
            "frames": [37]
        },
        "pauseLabel": {
            "speed": 1,
            "frames": [40]
        },
        "butPause": {
            "speed": 1,
            "frames": [2]
        },
        "labelAhura": {
            "speed": 1,
            "frames": [43]
        },
        "levelLabel": {
            "speed": 1,
            "frames": [39]
        },
        "lvlLabelStar3": {
            "speed": 1,
            "frames": [17]
        },
        "butGo": {
            "speed": 1,
            "frames": [11]
        },
        "butGames": {
            "speed": 1,
            "frames": [7]
        },
        "spelelogo": {
            "speed": 1,
            "frames": [18]
        },
        "tint2": {
            "speed": 1,
            "frames": [1]
        },
        "labelCongratulation": {
            "speed": 1,
            "frames": [45]
        },
        "butMusicNo": {
            "speed": 1,
            "frames": [12]
        },
        "lvlLabelStar2": {
            "speed": 1,
            "frames": [16]
        },
        "butStart": {
            "speed": 1,
            "frames": [8]
        },
        "lvlLabelStar1": {
            "speed": 1,
            "frames": [15]
        },
        "labelAwesome": {
            "speed": 1,
            "frames": [46]
        },
        "levelCompleteLabel": {
            "speed": 1,
            "frames": [36]
        },
        "labelOwl": {
            "speed": 1,
            "frames": [44]
        },
        "menuSun": {
            "speed": 1,
            "frames": [30]
        },
        "creditsLabel": {
            "speed": 1,
            "frames": [38]
        },
        "menuLabel": {
            "speed": 1,
            "frames": [33]
        }
    }
};
var allHelps = [];
var disposedHelps = [];

function createHelp(type, x, y, scale, container) {
    var help;
    if (y < topVisionLine) return null;
    help = gePartFromPool(type, container, scale);
    if (!help) help.reset(type, container, scale);
    help.setPos(x, y);
    if (!isArrayContains(allHelps, help)) allHelps.push(help);
    return help
}
function addToDisposedHelps(help) {
    if (!isArrayContains(disposedHelps, help)) disposedHelps.push(help)
}

function gePartFromPool(type, container, scale) {
    if (disposedHelps.length > 0) {
        var db = disposedHelps.pop();
        db.reset(type, container, scale);
        return db
    } else return new HelpBase(type, container, scale)
}
var helpLength = 0;
var currHelp = null;
var disposeNeededHelps = [];

function updateHelpManager() {
    helpLength = allHelps.length;
    for (var i = 0; i < helpLength; i++) {
        currHelp = allHelps[i];
        currHelp.tick();
        if (currHelp.isNeedDispose) disposeNeededHelps.push(currHelp)
    }
    while (disposeNeededHelps.length > 0) disposeNeededHelps.pop().dispose()
}(function(window) {
    function HelpBase(type, parent, scale) {
        this.initialize(type, parent, scale)
    }
    var p = HelpBase.prototype;
    p.initialize = function(type, parent, scale) {
        var bmpAnimation = new createjs.Sprite(sunSS);
        bmpAnimation.snapToPixel = true;
        bmpAnimation.baseBlock = this;
        this.vis = bmpAnimation;
        this.reset(type, parent, scale)
    };
    p.reset = function(type, parent, scale) {
        this.type = type;
        if (this.vis.parent != parent) removeFromParent(this.vis);
        createjs.Tween.removeTweens(this.vis);
        this.parent = parent;
        this.vis.alpha = 1;
        this.vis.mouseEnabled = false;
        this.animMargin = Math.random() * 30;
        this.isNeedDispose = false;
        this.vis.spriteSheet = sunSS;
        deleteCache(this.vis);
        this.scale = scale;
        this.updateVisionScale();
        parent.addChild(this.vis)
    };
    p.setPos = function(x, y) {
        this.vis.x = x;
        this.vis.y = y
    };
    p.setFrame = function(frame, isPlay) {
        if (isPlay) this.vis.gotoAndPlay(frame);
        else this.vis.gotoAndStop(frame)
    };
    p.tick = function() {
        if (this.isNeedDispose) return;
        if (isGamePaused) return;
        this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 30;
        this.vis.scaleY = this.vis.scaleX
    };
    p.updateVisionScale = function() {
        this.vis.scaleX = this.vis.scaleY = this.scale
    };
    p.dispose = function() {
        if (isArrayContains(allHelps, this)) allHelps.splice(allHelps.indexOf(this, 0), 1);
        addToDisposedHelps(this);
        this.vis.removeAllEventListeners();
        this.vis.stop();
        removeFromParent(this.vis)
    };
    window.HelpBase = HelpBase
})(window);
var Box2D = {};
(function(a2j, undefined) {
    if (!(Object.prototype.defineProperty instanceof Function) && (Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function)) Object.defineProperty = function(obj, p, cfg) {
        if (cfg.get instanceof Function) obj.__defineGetter__(p, cfg.get);
        if (cfg.set instanceof Function) obj.__defineSetter__(p, cfg.set)
    };

    function emptyFn() {}
    a2j.inherit = function(cls, base) {
        var tmpCtr = cls;
        emptyFn.prototype = base.prototype;
        cls.prototype = new emptyFn;
        cls.prototype.constructor = tmpCtr
    };
    a2j.generateCallback = function generateCallback(context, cb) {
        return function() {
            cb.apply(context, arguments)
        }
    };
    a2j.NVector = function NVector(length) {
        if (length === undefined) length = 0;
        var tmp = new Array(length || 0);
        for (var i = 0; i < length; ++i) tmp[i] = 0;
        return tmp
    };
    a2j.is = function is(o1, o2) {
        if (o1 === null) return false;
        if (o2 instanceof Function && o1 instanceof o2) return true;
        if (o1.constructor.__implements != undefined && o1.constructor.__implements[o2]) return true;
        return false
    };
    a2j.parseUInt = function(v) {
        return Math.abs(parseInt(v))
    }
})(Box2D);
var Vector = Array;
var Vector_a2j_Number = Box2D.NVector;
if (typeof Box2D === "undefined") Box2D = {};
if (typeof Box2D.Collision === "undefined") Box2D.Collision = {};
if (typeof Box2D.Collision.Shapes === "undefined") Box2D.Collision.Shapes = {};
if (typeof Box2D.Common === "undefined") Box2D.Common = {};
if (typeof Box2D.Common.Math === "undefined") Box2D.Common.Math = {};
if (typeof Box2D.Dynamics === "undefined") Box2D.Dynamics = {};
if (typeof Box2D.Dynamics.Contacts === "undefined") Box2D.Dynamics.Contacts = {};
if (typeof Box2D.Dynamics.Controllers === "undefined") Box2D.Dynamics.Controllers = {};
if (typeof Box2D.Dynamics.Joints === "undefined") Box2D.Dynamics.Joints = {};
(function() {
    Box2D.Collision.IBroadPhase = "Box2D.Collision.IBroadPhase";

    function b2AABB() {
        b2AABB.b2AABB.apply(this, arguments)
    }
    Box2D.Collision.b2AABB = b2AABB;

    function b2Bound() {
        b2Bound.b2Bound.apply(this, arguments)
    }
    Box2D.Collision.b2Bound = b2Bound;

    function b2BoundValues() {
        b2BoundValues.b2BoundValues.apply(this, arguments);
        if (this.constructor === b2BoundValues) this.b2BoundValues.apply(this, arguments)
    }
    Box2D.Collision.b2BoundValues = b2BoundValues;

    function b2Collision() {
        b2Collision.b2Collision.apply(this, arguments)
    }
    Box2D.Collision.b2Collision = b2Collision;

    function b2ContactID() {
        b2ContactID.b2ContactID.apply(this, arguments);
        if (this.constructor === b2ContactID) this.b2ContactID.apply(this, arguments)
    }
    Box2D.Collision.b2ContactID = b2ContactID;

    function b2ContactPoint() {
        b2ContactPoint.b2ContactPoint.apply(this, arguments)
    }
    Box2D.Collision.b2ContactPoint = b2ContactPoint;

    function b2Distance() {
        b2Distance.b2Distance.apply(this, arguments)
    }
    Box2D.Collision.b2Distance = b2Distance;

    function b2DistanceInput() {
        b2DistanceInput.b2DistanceInput.apply(this, arguments)
    }
    Box2D.Collision.b2DistanceInput = b2DistanceInput;

    function b2DistanceOutput() {
        b2DistanceOutput.b2DistanceOutput.apply(this, arguments)
    }
    Box2D.Collision.b2DistanceOutput = b2DistanceOutput;

    function b2DistanceProxy() {
        b2DistanceProxy.b2DistanceProxy.apply(this, arguments)
    }
    Box2D.Collision.b2DistanceProxy = b2DistanceProxy;

    function b2DynamicTree() {
        b2DynamicTree.b2DynamicTree.apply(this, arguments);
        if (this.constructor === b2DynamicTree) this.b2DynamicTree.apply(this, arguments)
    }
    Box2D.Collision.b2DynamicTree = b2DynamicTree;

    function b2DynamicTreeBroadPhase() {
        b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase.apply(this, arguments)
    }
    Box2D.Collision.b2DynamicTreeBroadPhase = b2DynamicTreeBroadPhase;

    function b2DynamicTreeNode() {
        b2DynamicTreeNode.b2DynamicTreeNode.apply(this, arguments)
    }
    Box2D.Collision.b2DynamicTreeNode = b2DynamicTreeNode;

    function b2DynamicTreePair() {
        b2DynamicTreePair.b2DynamicTreePair.apply(this, arguments)
    }
    Box2D.Collision.b2DynamicTreePair = b2DynamicTreePair;

    function b2Manifold() {
        b2Manifold.b2Manifold.apply(this, arguments);
        if (this.constructor === b2Manifold) this.b2Manifold.apply(this, arguments)
    }
    Box2D.Collision.b2Manifold = b2Manifold;

    function b2ManifoldPoint() {
        b2ManifoldPoint.b2ManifoldPoint.apply(this, arguments);
        if (this.constructor === b2ManifoldPoint) this.b2ManifoldPoint.apply(this, arguments)
    }
    Box2D.Collision.b2ManifoldPoint = b2ManifoldPoint;

    function b2Point() {
        b2Point.b2Point.apply(this, arguments)
    }
    Box2D.Collision.b2Point = b2Point;

    function b2RayCastInput() {
        b2RayCastInput.b2RayCastInput.apply(this, arguments);
        if (this.constructor === b2RayCastInput) this.b2RayCastInput.apply(this, arguments)
    }
    Box2D.Collision.b2RayCastInput = b2RayCastInput;

    function b2RayCastOutput() {
        b2RayCastOutput.b2RayCastOutput.apply(this, arguments)
    }
    Box2D.Collision.b2RayCastOutput = b2RayCastOutput;

    function b2Segment() {
        b2Segment.b2Segment.apply(this, arguments)
    }
    Box2D.Collision.b2Segment = b2Segment;

    function b2SeparationFunction() {
        b2SeparationFunction.b2SeparationFunction.apply(this, arguments)
    }
    Box2D.Collision.b2SeparationFunction = b2SeparationFunction;

    function b2Simplex() {
        b2Simplex.b2Simplex.apply(this, arguments);
        if (this.constructor === b2Simplex) this.b2Simplex.apply(this, arguments)
    }
    Box2D.Collision.b2Simplex = b2Simplex;

    function b2SimplexCache() {
        b2SimplexCache.b2SimplexCache.apply(this, arguments)
    }
    Box2D.Collision.b2SimplexCache = b2SimplexCache;

    function b2SimplexVertex() {
        b2SimplexVertex.b2SimplexVertex.apply(this, arguments)
    }
    Box2D.Collision.b2SimplexVertex = b2SimplexVertex;

    function b2TimeOfImpact() {
        b2TimeOfImpact.b2TimeOfImpact.apply(this, arguments)
    }
    Box2D.Collision.b2TimeOfImpact = b2TimeOfImpact;

    function b2TOIInput() {
        b2TOIInput.b2TOIInput.apply(this, arguments)
    }
    Box2D.Collision.b2TOIInput = b2TOIInput;

    function b2WorldManifold() {
        b2WorldManifold.b2WorldManifold.apply(this, arguments);
        if (this.constructor === b2WorldManifold) this.b2WorldManifold.apply(this, arguments)
    }
    Box2D.Collision.b2WorldManifold = b2WorldManifold;

    function ClipVertex() {
        ClipVertex.ClipVertex.apply(this, arguments)
    }
    Box2D.Collision.ClipVertex = ClipVertex;

    function Features() {
        Features.Features.apply(this, arguments)
    }
    Box2D.Collision.Features = Features;

    function b2CircleShape() {
        b2CircleShape.b2CircleShape.apply(this, arguments);
        if (this.constructor === b2CircleShape) this.b2CircleShape.apply(this, arguments)
    }
    Box2D.Collision.Shapes.b2CircleShape = b2CircleShape;

    function b2EdgeChainDef() {
        b2EdgeChainDef.b2EdgeChainDef.apply(this, arguments);
        if (this.constructor === b2EdgeChainDef) this.b2EdgeChainDef.apply(this, arguments)
    }
    Box2D.Collision.Shapes.b2EdgeChainDef = b2EdgeChainDef;

    function b2EdgeShape() {
        b2EdgeShape.b2EdgeShape.apply(this, arguments);
        if (this.constructor === b2EdgeShape) this.b2EdgeShape.apply(this, arguments)
    }
    Box2D.Collision.Shapes.b2EdgeShape = b2EdgeShape;

    function b2MassData() {
        b2MassData.b2MassData.apply(this, arguments)
    }
    Box2D.Collision.Shapes.b2MassData = b2MassData;

    function b2PolygonShape() {
        b2PolygonShape.b2PolygonShape.apply(this, arguments);
        if (this.constructor === b2PolygonShape) this.b2PolygonShape.apply(this, arguments)
    }
    Box2D.Collision.Shapes.b2PolygonShape = b2PolygonShape;

    function b2Shape() {
        b2Shape.b2Shape.apply(this, arguments);
        if (this.constructor === b2Shape) this.b2Shape.apply(this, arguments)
    }
    Box2D.Collision.Shapes.b2Shape = b2Shape;
    Box2D.Common.b2internal = "Box2D.Common.b2internal";

    function b2Color() {
        b2Color.b2Color.apply(this, arguments);
        if (this.constructor === b2Color) this.b2Color.apply(this, arguments)
    }
    Box2D.Common.b2Color = b2Color;

    function b2Settings() {
        b2Settings.b2Settings.apply(this, arguments)
    }
    Box2D.Common.b2Settings = b2Settings;

    function b2Mat22() {
        b2Mat22.b2Mat22.apply(this, arguments);
        if (this.constructor === b2Mat22) this.b2Mat22.apply(this, arguments)
    }
    Box2D.Common.Math.b2Mat22 = b2Mat22;

    function b2Mat33() {
        b2Mat33.b2Mat33.apply(this, arguments);
        if (this.constructor === b2Mat33) this.b2Mat33.apply(this, arguments)
    }
    Box2D.Common.Math.b2Mat33 = b2Mat33;

    function b2Math() {
        b2Math.b2Math.apply(this, arguments)
    }
    Box2D.Common.Math.b2Math = b2Math;

    function b2Sweep() {
        b2Sweep.b2Sweep.apply(this, arguments)
    }
    Box2D.Common.Math.b2Sweep = b2Sweep;

    function b2Transform() {
        b2Transform.b2Transform.apply(this, arguments);
        if (this.constructor === b2Transform) this.b2Transform.apply(this, arguments)
    }
    Box2D.Common.Math.b2Transform = b2Transform;

    function b2Vec2() {
        b2Vec2.b2Vec2.apply(this, arguments);
        if (this.constructor === b2Vec2) this.b2Vec2.apply(this, arguments)
    }
    Box2D.Common.Math.b2Vec2 = b2Vec2;

    function b2Vec3() {
        b2Vec3.b2Vec3.apply(this, arguments);
        if (this.constructor === b2Vec3) this.b2Vec3.apply(this, arguments)
    }
    Box2D.Common.Math.b2Vec3 = b2Vec3;

    function b2Body() {
        b2Body.b2Body.apply(this, arguments);
        if (this.constructor === b2Body) this.b2Body.apply(this, arguments)
    }
    Box2D.Dynamics.b2Body = b2Body;

    function b2BodyDef() {
        b2BodyDef.b2BodyDef.apply(this, arguments);
        if (this.constructor === b2BodyDef) this.b2BodyDef.apply(this, arguments)
    }
    Box2D.Dynamics.b2BodyDef = b2BodyDef;

    function b2ContactFilter() {
        b2ContactFilter.b2ContactFilter.apply(this, arguments)
    }
    Box2D.Dynamics.b2ContactFilter = b2ContactFilter;

    function b2ContactImpulse() {
        b2ContactImpulse.b2ContactImpulse.apply(this, arguments)
    }
    Box2D.Dynamics.b2ContactImpulse = b2ContactImpulse;

    function b2ContactListener() {
        b2ContactListener.b2ContactListener.apply(this, arguments)
    }
    Box2D.Dynamics.b2ContactListener = b2ContactListener;

    function b2ContactManager() {
        b2ContactManager.b2ContactManager.apply(this, arguments);
        if (this.constructor === b2ContactManager) this.b2ContactManager.apply(this, arguments)
    }
    Box2D.Dynamics.b2ContactManager = b2ContactManager;

    function b2DebugDraw() {
        b2DebugDraw.b2DebugDraw.apply(this, arguments);
        if (this.constructor === b2DebugDraw) this.b2DebugDraw.apply(this, arguments)
    }
    Box2D.Dynamics.b2DebugDraw = b2DebugDraw;

    function b2DestructionListener() {
        b2DestructionListener.b2DestructionListener.apply(this, arguments)
    }
    Box2D.Dynamics.b2DestructionListener = b2DestructionListener;

    function b2FilterData() {
        b2FilterData.b2FilterData.apply(this, arguments)
    }
    Box2D.Dynamics.b2FilterData = b2FilterData;

    function b2Fixture() {
        b2Fixture.b2Fixture.apply(this, arguments);
        if (this.constructor === b2Fixture) this.b2Fixture.apply(this, arguments)
    }
    Box2D.Dynamics.b2Fixture = b2Fixture;

    function b2FixtureDef() {
        b2FixtureDef.b2FixtureDef.apply(this, arguments);
        if (this.constructor === b2FixtureDef) this.b2FixtureDef.apply(this, arguments)
    }
    Box2D.Dynamics.b2FixtureDef = b2FixtureDef;

    function b2Island() {
        b2Island.b2Island.apply(this, arguments);
        if (this.constructor === b2Island) this.b2Island.apply(this, arguments)
    }
    Box2D.Dynamics.b2Island = b2Island;

    function b2TimeStep() {
        b2TimeStep.b2TimeStep.apply(this, arguments)
    }
    Box2D.Dynamics.b2TimeStep = b2TimeStep;

    function b2World() {
        b2World.b2World.apply(this, arguments);
        if (this.constructor === b2World) this.b2World.apply(this, arguments)
    }
    Box2D.Dynamics.b2World = b2World;

    function b2CircleContact() {
        b2CircleContact.b2CircleContact.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2CircleContact = b2CircleContact;

    function b2Contact() {
        b2Contact.b2Contact.apply(this, arguments);
        if (this.constructor === b2Contact) this.b2Contact.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2Contact = b2Contact;

    function b2ContactConstraint() {
        b2ContactConstraint.b2ContactConstraint.apply(this, arguments);
        if (this.constructor === b2ContactConstraint) this.b2ContactConstraint.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2ContactConstraint = b2ContactConstraint;

    function b2ContactConstraintPoint() {
        b2ContactConstraintPoint.b2ContactConstraintPoint.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2ContactConstraintPoint = b2ContactConstraintPoint;

    function b2ContactEdge() {
        b2ContactEdge.b2ContactEdge.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2ContactEdge = b2ContactEdge;

    function b2ContactFactory() {
        b2ContactFactory.b2ContactFactory.apply(this, arguments);
        if (this.constructor === b2ContactFactory) this.b2ContactFactory.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2ContactFactory = b2ContactFactory;

    function b2ContactRegister() {
        b2ContactRegister.b2ContactRegister.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2ContactRegister = b2ContactRegister;

    function b2ContactResult() {
        b2ContactResult.b2ContactResult.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2ContactResult = b2ContactResult;

    function b2ContactSolver() {
        b2ContactSolver.b2ContactSolver.apply(this, arguments);
        if (this.constructor === b2ContactSolver) this.b2ContactSolver.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2ContactSolver = b2ContactSolver;

    function b2EdgeAndCircleContact() {
        b2EdgeAndCircleContact.b2EdgeAndCircleContact.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = b2EdgeAndCircleContact;

    function b2NullContact() {
        b2NullContact.b2NullContact.apply(this, arguments);
        if (this.constructor === b2NullContact) this.b2NullContact.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2NullContact = b2NullContact;

    function b2PolyAndCircleContact() {
        b2PolyAndCircleContact.b2PolyAndCircleContact.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2PolyAndCircleContact = b2PolyAndCircleContact;

    function b2PolyAndEdgeContact() {
        b2PolyAndEdgeContact.b2PolyAndEdgeContact.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = b2PolyAndEdgeContact;

    function b2PolygonContact() {
        b2PolygonContact.b2PolygonContact.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2PolygonContact = b2PolygonContact;

    function b2PositionSolverManifold() {
        b2PositionSolverManifold.b2PositionSolverManifold.apply(this, arguments);
        if (this.constructor === b2PositionSolverManifold) this.b2PositionSolverManifold.apply(this, arguments)
    }
    Box2D.Dynamics.Contacts.b2PositionSolverManifold = b2PositionSolverManifold;

    function b2BuoyancyController() {
        b2BuoyancyController.b2BuoyancyController.apply(this, arguments)
    }
    Box2D.Dynamics.Controllers.b2BuoyancyController = b2BuoyancyController;

    function b2ConstantAccelController() {
        b2ConstantAccelController.b2ConstantAccelController.apply(this, arguments)
    }
    Box2D.Dynamics.Controllers.b2ConstantAccelController = b2ConstantAccelController;

    function b2ConstantForceController() {
        b2ConstantForceController.b2ConstantForceController.apply(this, arguments)
    }
    Box2D.Dynamics.Controllers.b2ConstantForceController = b2ConstantForceController;

    function b2Controller() {
        b2Controller.b2Controller.apply(this, arguments)
    }
    Box2D.Dynamics.Controllers.b2Controller = b2Controller;

    function b2ControllerEdge() {
        b2ControllerEdge.b2ControllerEdge.apply(this, arguments)
    }
    Box2D.Dynamics.Controllers.b2ControllerEdge = b2ControllerEdge;

    function b2GravityController() {
        b2GravityController.b2GravityController.apply(this, arguments)
    }
    Box2D.Dynamics.Controllers.b2GravityController = b2GravityController;

    function b2TensorDampingController() {
        b2TensorDampingController.b2TensorDampingController.apply(this, arguments)
    }
    Box2D.Dynamics.Controllers.b2TensorDampingController = b2TensorDampingController;

    function b2DistanceJoint() {
        b2DistanceJoint.b2DistanceJoint.apply(this, arguments);
        if (this.constructor === b2DistanceJoint) this.b2DistanceJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2DistanceJoint = b2DistanceJoint;

    function b2DistanceJointDef() {
        b2DistanceJointDef.b2DistanceJointDef.apply(this, arguments);
        if (this.constructor === b2DistanceJointDef) this.b2DistanceJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2DistanceJointDef = b2DistanceJointDef;

    function b2FrictionJoint() {
        b2FrictionJoint.b2FrictionJoint.apply(this, arguments);
        if (this.constructor === b2FrictionJoint) this.b2FrictionJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2FrictionJoint = b2FrictionJoint;

    function b2FrictionJointDef() {
        b2FrictionJointDef.b2FrictionJointDef.apply(this, arguments);
        if (this.constructor === b2FrictionJointDef) this.b2FrictionJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2FrictionJointDef = b2FrictionJointDef;

    function b2GearJoint() {
        b2GearJoint.b2GearJoint.apply(this, arguments);
        if (this.constructor === b2GearJoint) this.b2GearJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2GearJoint = b2GearJoint;

    function b2GearJointDef() {
        b2GearJointDef.b2GearJointDef.apply(this, arguments);
        if (this.constructor === b2GearJointDef) this.b2GearJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2GearJointDef = b2GearJointDef;

    function b2Jacobian() {
        b2Jacobian.b2Jacobian.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2Jacobian = b2Jacobian;

    function b2Joint() {
        b2Joint.b2Joint.apply(this, arguments);
        if (this.constructor === b2Joint) this.b2Joint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2Joint = b2Joint;

    function b2JointDef() {
        b2JointDef.b2JointDef.apply(this, arguments);
        if (this.constructor === b2JointDef) this.b2JointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2JointDef = b2JointDef;

    function b2JointEdge() {
        b2JointEdge.b2JointEdge.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2JointEdge = b2JointEdge;

    function b2LineJoint() {
        b2LineJoint.b2LineJoint.apply(this, arguments);
        if (this.constructor === b2LineJoint) this.b2LineJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2LineJoint = b2LineJoint;

    function b2LineJointDef() {
        b2LineJointDef.b2LineJointDef.apply(this, arguments);
        if (this.constructor === b2LineJointDef) this.b2LineJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2LineJointDef = b2LineJointDef;

    function b2MouseJoint() {
        b2MouseJoint.b2MouseJoint.apply(this, arguments);
        if (this.constructor === b2MouseJoint) this.b2MouseJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2MouseJoint = b2MouseJoint;

    function b2MouseJointDef() {
        b2MouseJointDef.b2MouseJointDef.apply(this, arguments);
        if (this.constructor === b2MouseJointDef) this.b2MouseJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2MouseJointDef = b2MouseJointDef;

    function b2PrismaticJoint() {
        b2PrismaticJoint.b2PrismaticJoint.apply(this, arguments);
        if (this.constructor === b2PrismaticJoint) this.b2PrismaticJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2PrismaticJoint = b2PrismaticJoint;

    function b2PrismaticJointDef() {
        b2PrismaticJointDef.b2PrismaticJointDef.apply(this, arguments);
        if (this.constructor === b2PrismaticJointDef) this.b2PrismaticJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2PrismaticJointDef = b2PrismaticJointDef;

    function b2PulleyJoint() {
        b2PulleyJoint.b2PulleyJoint.apply(this, arguments);
        if (this.constructor === b2PulleyJoint) this.b2PulleyJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2PulleyJoint = b2PulleyJoint;

    function b2PulleyJointDef() {
        b2PulleyJointDef.b2PulleyJointDef.apply(this, arguments);
        if (this.constructor === b2PulleyJointDef) this.b2PulleyJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2PulleyJointDef = b2PulleyJointDef;

    function b2RevoluteJoint() {
        b2RevoluteJoint.b2RevoluteJoint.apply(this, arguments);
        if (this.constructor === b2RevoluteJoint) this.b2RevoluteJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2RevoluteJoint = b2RevoluteJoint;

    function b2RevoluteJointDef() {
        b2RevoluteJointDef.b2RevoluteJointDef.apply(this, arguments);
        if (this.constructor === b2RevoluteJointDef) this.b2RevoluteJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2RevoluteJointDef = b2RevoluteJointDef;

    function b2WeldJoint() {
        b2WeldJoint.b2WeldJoint.apply(this, arguments);
        if (this.constructor === b2WeldJoint) this.b2WeldJoint.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2WeldJoint = b2WeldJoint;

    function b2WeldJointDef() {
        b2WeldJointDef.b2WeldJointDef.apply(this, arguments);
        if (this.constructor === b2WeldJointDef) this.b2WeldJointDef.apply(this, arguments)
    }
    Box2D.Dynamics.Joints.b2WeldJointDef = b2WeldJointDef
})();
Box2D.postDefs = [];
(function() {
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
        b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2Shape = Box2D.Collision.Shapes.b2Shape,
        b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3,
        b2AABB = Box2D.Collision.b2AABB,
        b2Bound = Box2D.Collision.b2Bound,
        b2BoundValues = Box2D.Collision.b2BoundValues,
        b2Collision = Box2D.Collision.b2Collision,
        b2ContactID = Box2D.Collision.b2ContactID,
        b2ContactPoint = Box2D.Collision.b2ContactPoint,
        b2Distance = Box2D.Collision.b2Distance,
        b2DistanceInput = Box2D.Collision.b2DistanceInput,
        b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
        b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
        b2DynamicTree = Box2D.Collision.b2DynamicTree,
        b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
        b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
        b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
        b2Manifold = Box2D.Collision.b2Manifold,
        b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
        b2Point = Box2D.Collision.b2Point,
        b2RayCastInput = Box2D.Collision.b2RayCastInput,
        b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
        b2Segment = Box2D.Collision.b2Segment,
        b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
        b2Simplex = Box2D.Collision.b2Simplex,
        b2SimplexCache = Box2D.Collision.b2SimplexCache,
        b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
        b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
        b2TOIInput = Box2D.Collision.b2TOIInput,
        b2WorldManifold = Box2D.Collision.b2WorldManifold,
        ClipVertex = Box2D.Collision.ClipVertex,
        Features = Box2D.Collision.Features,
        IBroadPhase = Box2D.Collision.IBroadPhase;
    b2AABB.b2AABB = function() {
        this.lowerBound = new b2Vec2;
        this.upperBound = new b2Vec2
    };
    b2AABB.prototype.IsValid = function() {
        var dX = this.upperBound.x - this.lowerBound.x;
        var dY = this.upperBound.y - this.lowerBound.y;
        var valid = dX >= 0 && dY >= 0;
        valid = valid && (this.lowerBound.IsValid() && this.upperBound.IsValid());
        return valid
    };
    b2AABB.prototype.GetCenter = function() {
        return new b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2)
    };
    b2AABB.prototype.GetExtents = function() {
        return new b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
    };
    b2AABB.prototype.Contains = function(aabb) {
        var result = true;
        result = result && this.lowerBound.x <= aabb.lowerBound.x;
        result = result && this.lowerBound.y <= aabb.lowerBound.y;
        result = result && aabb.upperBound.x <= this.upperBound.x;
        result = result && aabb.upperBound.y <= this.upperBound.y;
        return result
    };
    b2AABB.prototype.RayCast = function(output, input) {
        var tmin = -Number.MAX_VALUE;
        var tmax = Number.MAX_VALUE;
        var pX = input.p1.x;
        var pY = input.p1.y;
        var dX = input.p2.x - input.p1.x;
        var dY = input.p2.y - input.p1.y;
        var absDX = Math.abs(dX);
        var absDY = Math.abs(dY);
        var normal = output.normal;
        var inv_d = 0;
        var t1 = 0;
        var t2 = 0;
        var t3 = 0;
        var s = 0;
        if (absDX < Number.MIN_VALUE) {
            if (pX < this.lowerBound.x || this.upperBound.x < pX) return false
        } else {
            inv_d = 1 / dX;
            t1 = (this.lowerBound.x - pX) * inv_d;
            t2 = (this.upperBound.x - pX) * inv_d;
            s = -1;
            if (t1 > t2) {
                t3 = t1;
                t1 = t2;
                t2 = t3;
                s = 1
            }
            if (t1 > tmin) {
                normal.x = s;
                normal.y = 0;
                tmin = t1
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) return false
        }
        if (absDY < Number.MIN_VALUE) {
            if (pY < this.lowerBound.y || this.upperBound.y < pY) return false
        } else {
            inv_d = 1 / dY;
            t1 = (this.lowerBound.y - pY) * inv_d;
            t2 = (this.upperBound.y - pY) * inv_d;
            s = -1;
            if (t1 > t2) {
                t3 = t1;
                t1 = t2;
                t2 = t3;
                s = 1
            }
            if (t1 > tmin) {
                normal.y = s;
                normal.x = 0;
                tmin = t1
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) return false
        }
        output.fraction = tmin;
        return true
    };
    b2AABB.prototype.TestOverlap = function(other) {
        var d1X = other.lowerBound.x - this.upperBound.x;
        var d1Y = other.lowerBound.y - this.upperBound.y;
        var d2X = this.lowerBound.x - other.upperBound.x;
        var d2Y = this.lowerBound.y - other.upperBound.y;
        if (d1X > 0 || d1Y > 0) return false;
        if (d2X > 0 || d2Y > 0) return false;
        return true
    };
    b2AABB.Combine = function(aabb1, aabb2) {
        var aabb = new b2AABB;
        aabb.Combine(aabb1, aabb2);
        return aabb
    };
    b2AABB.prototype.Combine = function(aabb1, aabb2) {
        this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
        this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
        this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
        this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y)
    };
    b2Bound.b2Bound = function() {};
    b2Bound.prototype.IsLower = function() {
        return (this.value & 1) == 0
    };
    b2Bound.prototype.IsUpper = function() {
        return (this.value & 1) == 1
    };
    b2Bound.prototype.Swap = function(b) {
        var tempValue = this.value;
        var tempProxy = this.proxy;
        var tempStabbingCount = this.stabbingCount;
        this.value = b.value;
        this.proxy = b.proxy;
        this.stabbingCount = b.stabbingCount;
        b.value = tempValue;
        b.proxy = tempProxy;
        b.stabbingCount = tempStabbingCount
    };
    b2BoundValues.b2BoundValues = function() {};
    b2BoundValues.prototype.b2BoundValues = function() {
        this.lowerValues = new Vector_a2j_Number;
        this.lowerValues[0] = 0;
        this.lowerValues[1] = 0;
        this.upperValues = new Vector_a2j_Number;
        this.upperValues[0] = 0;
        this.upperValues[1] = 0
    };
    b2Collision.b2Collision = function() {};
    b2Collision.ClipSegmentToLine = function(vOut, vIn, normal, offset) {
        if (offset === undefined) offset = 0;
        var cv;
        var numOut = 0;
        cv = vIn[0];
        var vIn0 = cv.v;
        cv = vIn[1];
        var vIn1 = cv.v;
        var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
        var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
        if (distance0 <= 0) vOut[numOut++].Set(vIn[0]);
        if (distance1 <= 0) vOut[numOut++].Set(vIn[1]);
        if (distance0 * distance1 < 0) {
            var interp = distance0 / (distance0 - distance1);
            cv = vOut[numOut];
            var tVec = cv.v;
            tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
            tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
            cv = vOut[numOut];
            var cv2;
            if (distance0 > 0) {
                cv2 = vIn[0];
                cv.id = cv2.id
            } else {
                cv2 = vIn[1];
                cv.id = cv2.id
            }++numOut
        }
        return numOut
    };
    b2Collision.EdgeSeparation = function(poly1, xf1, edge1, poly2, xf2) {
        if (edge1 === undefined) edge1 = 0;
        var count1 = parseInt(poly1.m_vertexCount);
        var vertices1 = poly1.m_vertices;
        var normals1 = poly1.m_normals;
        var count2 = parseInt(poly2.m_vertexCount);
        var vertices2 = poly2.m_vertices;
        var tMat;
        var tVec;
        tMat = xf1.R;
        tVec = normals1[edge1];
        var normal1WorldX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        var normal1WorldY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        tMat = xf2.R;
        var normal1X = tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY;
        var normal1Y = tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY;
        var index = 0;
        var minDot = Number.MAX_VALUE;
        for (var i = 0; i < count2; ++i) {
            tVec = vertices2[i];
            var dot = tVec.x * normal1X + tVec.y * normal1Y;
            if (dot < minDot) {
                minDot = dot;
                index = i
            }
        }
        tVec = vertices1[edge1];
        tMat = xf1.R;
        var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        tVec = vertices2[index];
        tMat = xf2.R;
        var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        v2X -= v1X;
        v2Y -= v1Y;
        var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
        return separation
    };
    b2Collision.FindMaxSeparation = function(edgeIndex, poly1, xf1, poly2, xf2) {
        var count1 = parseInt(poly1.m_vertexCount);
        var normals1 = poly1.m_normals;
        var tVec;
        var tMat;
        tMat = xf2.R;
        tVec = poly2.m_centroid;
        var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        tMat = xf1.R;
        tVec = poly1.m_centroid;
        dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        var dLocal1X = dX * xf1.R.col1.x + dY * xf1.R.col1.y;
        var dLocal1Y = dX * xf1.R.col2.x + dY * xf1.R.col2.y;
        var edge = 0;
        var maxDot = -Number.MAX_VALUE;
        for (var i = 0; i < count1; ++i) {
            tVec = normals1[i];
            var dot = tVec.x * dLocal1X + tVec.y * dLocal1Y;
            if (dot > maxDot) {
                maxDot = dot;
                edge = i
            }
        }
        var s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
        var prevEdge = parseInt(edge - 1 >= 0 ? edge - 1 : count1 - 1);
        var sPrev = b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
        var nextEdge = parseInt(edge + 1 < count1 ? edge + 1 : 0);
        var sNext = b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
        var bestEdge = 0;
        var bestSeparation = 0;
        var increment = 0;
        if (sPrev > s && sPrev > sNext) {
            increment = -1;
            bestEdge = prevEdge;
            bestSeparation = sPrev
        } else if (sNext > s) {
            increment = 1;
            bestEdge = nextEdge;
            bestSeparation = sNext
        } else {
            edgeIndex[0] = edge;
            return s
        }
        while (true) {
            if (increment == -1) edge = bestEdge - 1 >= 0 ? bestEdge - 1 : count1 - 1;
            else edge = bestEdge + 1 < count1 ? bestEdge + 1 : 0;
            s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
            if (s > bestSeparation) {
                bestEdge = edge;
                bestSeparation = s
            } else break
        }
        edgeIndex[0] = bestEdge;
        return bestSeparation
    };
    b2Collision.FindIncidentEdge = function(c, poly1, xf1, edge1, poly2, xf2) {
        if (edge1 === undefined) edge1 = 0;
        var count1 = parseInt(poly1.m_vertexCount);
        var normals1 = poly1.m_normals;
        var count2 = parseInt(poly2.m_vertexCount);
        var vertices2 = poly2.m_vertices;
        var normals2 = poly2.m_normals;
        var tMat;
        var tVec;
        tMat = xf1.R;
        tVec = normals1[edge1];
        var normal1X = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        var normal1Y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        tMat = xf2.R;
        var tX = tMat.col1.x * normal1X + tMat.col1.y * normal1Y;
        normal1Y = tMat.col2.x * normal1X + tMat.col2.y * normal1Y;
        normal1X = tX;
        var index = 0;
        var minDot = Number.MAX_VALUE;
        for (var i = 0; i < count2; ++i) {
            tVec = normals2[i];
            var dot = normal1X * tVec.x + normal1Y * tVec.y;
            if (dot < minDot) {
                minDot = dot;
                index = i
            }
        }
        var tClip;
        var i1 = parseInt(index);
        var i2 = parseInt(i1 + 1 < count2 ? i1 + 1 : 0);
        tClip = c[0];
        tVec = vertices2[i1];
        tMat = xf2.R;
        tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        tClip.id.features.referenceEdge = edge1;
        tClip.id.features.incidentEdge = i1;
        tClip.id.features.incidentVertex = 0;
        tClip = c[1];
        tVec = vertices2[i2];
        tMat = xf2.R;
        tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        tClip.id.features.referenceEdge = edge1;
        tClip.id.features.incidentEdge = i2;
        tClip.id.features.incidentVertex = 1
    };
    b2Collision.MakeClipPointVector = function() {
        var r = new Vector(2);
        r[0] = new ClipVertex;
        r[1] = new ClipVertex;
        return r
    };
    b2Collision.CollidePolygons = function(manifold, polyA, xfA, polyB, xfB) {
        var cv;
        manifold.m_pointCount = 0;
        var totalRadius = polyA.m_radius + polyB.m_radius;
        var edgeA = 0;
        b2Collision.s_edgeAO[0] = edgeA;
        var separationA = b2Collision.FindMaxSeparation(b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
        edgeA = b2Collision.s_edgeAO[0];
        if (separationA > totalRadius) return;
        var edgeB = 0;
        b2Collision.s_edgeBO[0] = edgeB;
        var separationB = b2Collision.FindMaxSeparation(b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
        edgeB = b2Collision.s_edgeBO[0];
        if (separationB > totalRadius) return;
        var poly1;
        var poly2;
        var xf1;
        var xf2;
        var edge1 = 0;
        var flip = 0;
        var k_relativeTol = 0.98;
        var k_absoluteTol = 0.001;
        var tMat;
        if (separationB > k_relativeTol * separationA + k_absoluteTol) {
            poly1 = polyB;
            poly2 = polyA;
            xf1 = xfB;
            xf2 = xfA;
            edge1 = edgeB;
            manifold.m_type = b2Manifold.e_faceB;
            flip = 1
        } else {
            poly1 = polyA;
            poly2 = polyB;
            xf1 = xfA;
            xf2 = xfB;
            edge1 = edgeA;
            manifold.m_type = b2Manifold.e_faceA;
            flip = 0
        }
        var incidentEdge = b2Collision.s_incidentEdge;
        b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
        var count1 = parseInt(poly1.m_vertexCount);
        var vertices1 = poly1.m_vertices;
        var local_v11 = vertices1[edge1];
        var local_v12;
        if (edge1 + 1 < count1) local_v12 = vertices1[parseInt(edge1 + 1)];
        else local_v12 = vertices1[0];
        var localTangent = b2Collision.s_localTangent;
        localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
        localTangent.Normalize();
        var localNormal = b2Collision.s_localNormal;
        localNormal.x = localTangent.y;
        localNormal.y = -localTangent.x;
        var planePoint = b2Collision.s_planePoint;
        planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
        var tangent = b2Collision.s_tangent;
        tMat = xf1.R;
        tangent.x = tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y;
        tangent.y = tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y;
        var tangent2 = b2Collision.s_tangent2;
        tangent2.x = -tangent.x;
        tangent2.y = -tangent.y;
        var normal = b2Collision.s_normal;
        normal.x = tangent.y;
        normal.y = -tangent.x;
        var v11 = b2Collision.s_v11;
        var v12 = b2Collision.s_v12;
        v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
        v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
        v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
        v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
        var frontOffset = normal.x * v11.x + normal.y * v11.y;
        var sideOffset1 = -tangent.x * v11.x - tangent.y * v11.y + totalRadius;
        var sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
        var clipPoints1 = b2Collision.s_clipPoints1;
        var clipPoints2 = b2Collision.s_clipPoints2;
        var np = 0;
        np = b2Collision.ClipSegmentToLine(clipPoints1, incidentEdge, tangent2, sideOffset1);
        if (np < 2) return;
        np = b2Collision.ClipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);
        if (np < 2) return;
        manifold.m_localPlaneNormal.SetV(localNormal);
        manifold.m_localPoint.SetV(planePoint);
        var pointCount = 0;
        for (var i = 0; i < b2Settings.b2_maxManifoldPoints; ++i) {
            cv = clipPoints2[i];
            var separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
            if (separation <= totalRadius) {
                var cp = manifold.m_points[pointCount];
                tMat = xf2.R;
                var tX = cv.v.x - xf2.position.x;
                var tY = cv.v.y - xf2.position.y;
                cp.m_localPoint.x = tX * tMat.col1.x + tY * tMat.col1.y;
                cp.m_localPoint.y = tX * tMat.col2.x + tY * tMat.col2.y;
                cp.m_id.Set(cv.id);
                cp.m_id.features.flip = flip;
                ++pointCount
            }
        }
        manifold.m_pointCount = pointCount
    };
    b2Collision.CollideCircles = function(manifold, circle1, xf1, circle2, xf2) {
        manifold.m_pointCount = 0;
        var tMat;
        var tVec;
        tMat = xf1.R;
        tVec = circle1.m_p;
        var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        tMat = xf2.R;
        tVec = circle2.m_p;
        var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        var dX = p2X - p1X;
        var dY = p2Y - p1Y;
        var distSqr = dX * dX + dY * dY;
        var radius = circle1.m_radius + circle2.m_radius;
        if (distSqr > radius * radius) return;
        manifold.m_type = b2Manifold.e_circles;
        manifold.m_localPoint.SetV(circle1.m_p);
        manifold.m_localPlaneNormal.SetZero();
        manifold.m_pointCount = 1;
        manifold.m_points[0].m_localPoint.SetV(circle2.m_p);
        manifold.m_points[0].m_id.key = 0
    };
    b2Collision.CollidePolygonAndCircle = function(manifold, polygon, xf1, circle, xf2) {
        manifold.m_pointCount = 0;
        var tPoint;
        var dX = 0;
        var dY = 0;
        var positionX = 0;
        var positionY = 0;
        var tVec;
        var tMat;
        tMat = xf2.R;
        tVec = circle.m_p;
        var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        dX = cX - xf1.position.x;
        dY = cY - xf1.position.y;
        tMat = xf1.R;
        var cLocalX = dX * tMat.col1.x + dY * tMat.col1.y;
        var cLocalY = dX * tMat.col2.x + dY * tMat.col2.y;
        var dist = 0;
        var normalIndex = 0;
        var separation = -Number.MAX_VALUE;
        var radius = polygon.m_radius + circle.m_radius;
        var vertexCount = parseInt(polygon.m_vertexCount);
        var vertices = polygon.m_vertices;
        var normals = polygon.m_normals;
        for (var i = 0; i < vertexCount; ++i) {
            tVec = vertices[i];
            dX = cLocalX - tVec.x;
            dY = cLocalY - tVec.y;
            tVec = normals[i];
            var s = tVec.x * dX + tVec.y * dY;
            if (s > radius) return;
            if (s > separation) {
                separation = s;
                normalIndex = i
            }
        }
        var vertIndex1 = parseInt(normalIndex);
        var vertIndex2 = parseInt(vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0);
        var v1 = vertices[vertIndex1];
        var v2 = vertices[vertIndex2];
        if (separation < Number.MIN_VALUE) {
            manifold.m_pointCount = 1;
            manifold.m_type = b2Manifold.e_faceA;
            manifold.m_localPlaneNormal.SetV(normals[normalIndex]);
            manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
            manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
            manifold.m_points[0].m_localPoint.SetV(circle.m_p);
            manifold.m_points[0].m_id.key = 0;
            return
        }
        var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
        var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
        if (u1 <= 0) {
            if ((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) return;
            manifold.m_pointCount = 1;
            manifold.m_type = b2Manifold.e_faceA;
            manifold.m_localPlaneNormal.x = cLocalX - v1.x;
            manifold.m_localPlaneNormal.y = cLocalY - v1.y;
            manifold.m_localPlaneNormal.Normalize();
            manifold.m_localPoint.SetV(v1);
            manifold.m_points[0].m_localPoint.SetV(circle.m_p);
            manifold.m_points[0].m_id.key = 0
        } else if (u2 <= 0) {
            if ((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) return;
            manifold.m_pointCount = 1;
            manifold.m_type = b2Manifold.e_faceA;
            manifold.m_localPlaneNormal.x = cLocalX - v2.x;
            manifold.m_localPlaneNormal.y = cLocalY - v2.y;
            manifold.m_localPlaneNormal.Normalize();
            manifold.m_localPoint.SetV(v2);
            manifold.m_points[0].m_localPoint.SetV(circle.m_p);
            manifold.m_points[0].m_id.key = 0
        } else {
            var faceCenterX = 0.5 * (v1.x + v2.x);
            var faceCenterY = 0.5 * (v1.y + v2.y);
            separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
            if (separation > radius) return;
            manifold.m_pointCount = 1;
            manifold.m_type = b2Manifold.e_faceA;
            manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
            manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
            manifold.m_localPlaneNormal.Normalize();
            manifold.m_localPoint.Set(faceCenterX, faceCenterY);
            manifold.m_points[0].m_localPoint.SetV(circle.m_p);
            manifold.m_points[0].m_id.key = 0
        }
    };
    b2Collision.TestOverlap = function(a, b) {
        var t1 = b.lowerBound;
        var t2 = a.upperBound;
        var d1X = t1.x - t2.x;
        var d1Y = t1.y - t2.y;
        t1 = a.lowerBound;
        t2 = b.upperBound;
        var d2X = t1.x - t2.x;
        var d2Y = t1.y - t2.y;
        if (d1X > 0 || d1Y > 0) return false;
        if (d2X > 0 || d2Y > 0) return false;
        return true
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Collision.s_incidentEdge = b2Collision.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints1 = b2Collision.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints2 = b2Collision.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_localTangent = new b2Vec2;
        Box2D.Collision.b2Collision.s_localNormal = new b2Vec2;
        Box2D.Collision.b2Collision.s_planePoint = new b2Vec2;
        Box2D.Collision.b2Collision.s_normal = new b2Vec2;
        Box2D.Collision.b2Collision.s_tangent = new b2Vec2;
        Box2D.Collision.b2Collision.s_tangent2 = new b2Vec2;
        Box2D.Collision.b2Collision.s_v11 = new b2Vec2;
        Box2D.Collision.b2Collision.s_v12 = new b2Vec2;
        Box2D.Collision.b2Collision.b2CollidePolyTempVec = new b2Vec2;
        Box2D.Collision.b2Collision.b2_nullFeature = 255
    });
    b2ContactID.b2ContactID = function() {
        this.features = new Features
    };
    b2ContactID.prototype.b2ContactID = function() {
        this.features._m_id = this
    };
    b2ContactID.prototype.Set = function(id) {
        this.key = id._key
    };
    b2ContactID.prototype.Copy = function() {
        var id = new b2ContactID;
        id.key = this.key;
        return id
    };
    Object.defineProperty(b2ContactID.prototype, "key", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this._key
        }
    });
    Object.defineProperty(b2ContactID.prototype, "key", {
        enumerable: false,
        configurable: true,
        set: function(value) {
            if (value === undefined) value = 0;
            this._key = value;
            this.features._referenceEdge = this._key & 255;
            this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
            this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
            this.features._flip = (this._key & 4278190080) >> 24 & 255
        }
    });
    b2ContactPoint.b2ContactPoint = function() {
        this.position = new b2Vec2;
        this.velocity = new b2Vec2;
        this.normal = new b2Vec2;
        this.id = new b2ContactID
    };
    b2Distance.b2Distance = function() {};
    b2Distance.Distance = function(output, cache, input) {
        ++b2Distance.b2_gjkCalls;
        var proxyA = input.proxyA;
        var proxyB = input.proxyB;
        var transformA = input.transformA;
        var transformB = input.transformB;
        var simplex = b2Distance.s_simplex;
        simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
        var vertices = simplex.m_vertices;
        var k_maxIters = 20;
        var saveA = b2Distance.s_saveA;
        var saveB = b2Distance.s_saveB;
        var saveCount = 0;
        var closestPoint = simplex.GetClosestPoint();
        var distanceSqr1 = closestPoint.LengthSquared();
        var distanceSqr2 = distanceSqr1;
        var i = 0;
        var p;
        var iter = 0;
        while (iter < k_maxIters) {
            saveCount = simplex.m_count;
            for (i = 0; i < saveCount; i++) {
                saveA[i] = vertices[i].indexA;
                saveB[i] = vertices[i].indexB
            }
            switch (simplex.m_count) {
                case 1:
                    break;
                case 2:
                    simplex.Solve2();
                    break;
                case 3:
                    simplex.Solve3();
                    break;
                default:
                    b2Settings.b2Assert(false)
            }
            if (simplex.m_count == 3) break;
            p = simplex.GetClosestPoint();
            distanceSqr2 = p.LengthSquared();
            if (distanceSqr2 > distanceSqr1);
            distanceSqr1 = distanceSqr2;
            var d = simplex.GetSearchDirection();
            if (d.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
            var vertex = vertices[simplex.m_count];
            vertex.indexA = proxyA.GetSupport(b2Math.MulTMV(transformA.R, d.GetNegative()));
            vertex.wA = b2Math.MulX(transformA, proxyA.GetVertex(vertex.indexA));
            vertex.indexB = proxyB.GetSupport(b2Math.MulTMV(transformB.R, d));
            vertex.wB = b2Math.MulX(transformB, proxyB.GetVertex(vertex.indexB));
            vertex.w = b2Math.SubtractVV(vertex.wB, vertex.wA);
            ++iter;
            ++b2Distance.b2_gjkIters;
            var duplicate = false;
            for (i = 0; i < saveCount; i++) if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
                duplicate = true;
                break
            }
            if (duplicate) break;
            ++simplex.m_count
        }
        b2Distance.b2_gjkMaxIters = b2Math.Max(b2Distance.b2_gjkMaxIters, iter);
        simplex.GetWitnessPoints(output.pointA, output.pointB);
        output.distance = b2Math.SubtractVV(output.pointA, output.pointB).Length();
        output.iterations = iter;
        simplex.WriteCache(cache);
        if (input.useRadii) {
            var rA = proxyA.m_radius;
            var rB = proxyB.m_radius;
            if (output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
                output.distance -= rA + rB;
                var normal = b2Math.SubtractVV(output.pointB, output.pointA);
                normal.Normalize();
                output.pointA.x += rA * normal.x;
                output.pointA.y += rA * normal.y;
                output.pointB.x -= rB * normal.x;
                output.pointB.y -= rB * normal.y
            } else {
                p = new b2Vec2;
                p.x = 0.5 * (output.pointA.x + output.pointB.x);
                p.y = 0.5 * (output.pointA.y + output.pointB.y);
                output.pointA.x = output.pointB.x = p.x;
                output.pointA.y = output.pointB.y = p.y;
                output.distance = 0
            }
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Distance.s_simplex = new b2Simplex;
        Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
        Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3)
    });
    b2DistanceInput.b2DistanceInput = function() {};
    b2DistanceOutput.b2DistanceOutput = function() {
        this.pointA = new b2Vec2;
        this.pointB = new b2Vec2
    };
    b2DistanceProxy.b2DistanceProxy = function() {};
    b2DistanceProxy.prototype.Set = function(shape) {
        switch (shape.GetType()) {
            case b2Shape.e_circleShape:
                var circle = shape instanceof b2CircleShape ? shape : null;
                this.m_vertices = new Vector(1, true);
                this.m_vertices[0] = circle.m_p;
                this.m_count = 1;
                this.m_radius = circle.m_radius;
                break;
            case b2Shape.e_polygonShape:
                var polygon = shape instanceof b2PolygonShape ? shape : null;
                this.m_vertices = polygon.m_vertices;
                this.m_count = polygon.m_vertexCount;
                this.m_radius = polygon.m_radius;
                break;
            default:
                b2Settings.b2Assert(false)
        }
    };
    b2DistanceProxy.prototype.GetSupport = function(d) {
        var bestIndex = 0;
        var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (var i = 1; i < this.m_count; ++i) {
            var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
            if (value > bestValue) {
                bestIndex = i;
                bestValue = value
            }
        }
        return bestIndex
    };
    b2DistanceProxy.prototype.GetSupportVertex = function(d) {
        var bestIndex = 0;
        var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (var i = 1; i < this.m_count; ++i) {
            var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
            if (value > bestValue) {
                bestIndex = i;
                bestValue = value
            }
        }
        return this.m_vertices[bestIndex]
    };
    b2DistanceProxy.prototype.GetVertexCount = function() {
        return this.m_count
    };
    b2DistanceProxy.prototype.GetVertex = function(index) {
        if (index === undefined) index = 0;
        b2Settings.b2Assert(0 <= index && index < this.m_count);
        return this.m_vertices[index]
    };
    b2DynamicTree.b2DynamicTree = function() {};
    b2DynamicTree.prototype.b2DynamicTree = function() {
        this.m_root = null;
        this.m_freeList = null;
        this.m_path = 0;
        this.m_insertionCount = 0
    };
    b2DynamicTree.prototype.CreateProxy = function(aabb, userData) {
        var node = this.AllocateNode();
        var extendX = b2Settings.b2_aabbExtension;
        var extendY = b2Settings.b2_aabbExtension;
        node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
        node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
        node.aabb.upperBound.x = aabb.upperBound.x + extendX;
        node.aabb.upperBound.y = aabb.upperBound.y + extendY;
        node.userData = userData;
        this.InsertLeaf(node);
        return node
    };
    b2DynamicTree.prototype.DestroyProxy = function(proxy) {
        this.RemoveLeaf(proxy);
        this.FreeNode(proxy)
    };
    b2DynamicTree.prototype.MoveProxy = function(proxy, aabb, displacement) {
        b2Settings.b2Assert(proxy.IsLeaf());
        if (proxy.aabb.Contains(aabb)) return false;
        this.RemoveLeaf(proxy);
        var extendX = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.x > 0 ? displacement.x : -displacement.x);
        var extendY = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.y > 0 ? displacement.y : -displacement.y);
        proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
        proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
        proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
        proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
        this.InsertLeaf(proxy);
        return true
    };
    b2DynamicTree.prototype.Rebalance = function(iterations) {
        if (iterations === undefined) iterations = 0;
        if (this.m_root == null) return;
        for (var i = 0; i < iterations; i++) {
            var node = this.m_root;
            var bit = 0;
            while (node.IsLeaf() == false) {
                node = this.m_path >> bit & 1 ? node.child2 : node.child1;
                bit = bit + 1 & 31
            }++this.m_path;
            this.RemoveLeaf(node);
            this.InsertLeaf(node)
        }
    };
    b2DynamicTree.prototype.GetFatAABB = function(proxy) {
        return proxy.aabb
    };
    b2DynamicTree.prototype.GetUserData = function(proxy) {
        return proxy.userData
    };
    b2DynamicTree.prototype.Query = function(callback, aabb) {
        if (this.m_root == null) return;
        var stack = new Vector;
        var count = 0;
        stack[count++] = this.m_root;
        while (count > 0) {
            var node = stack[--count];
            if (node.aabb.TestOverlap(aabb)) if (node.IsLeaf()) {
                var proceed = callback(node);
                if (!proceed) return
            } else {
                stack[count++] = node.child1;
                stack[count++] = node.child2
            }
        }
    };
    b2DynamicTree.prototype.RayCast = function(callback, input) {
        if (this.m_root == null) return;
        var p1 = input.p1;
        var p2 = input.p2;
        var r = b2Math.SubtractVV(p1, p2);
        r.Normalize();
        var v = b2Math.CrossFV(1, r);
        var abs_v = b2Math.AbsV(v);
        var maxFraction = input.maxFraction;
        var segmentAABB = new b2AABB;
        var tX = 0;
        var tY = 0;
        tX = p1.x + maxFraction * (p2.x - p1.x);
        tY = p1.y + maxFraction * (p2.y - p1.y);
        segmentAABB.lowerBound.x = Math.min(p1.x, tX);
        segmentAABB.lowerBound.y = Math.min(p1.y, tY);
        segmentAABB.upperBound.x = Math.max(p1.x, tX);
        segmentAABB.upperBound.y = Math.max(p1.y, tY);
        var stack = new Vector;
        var count = 0;
        stack[count++] = this.m_root;
        while (count > 0) {
            var node = stack[--count];
            if (node.aabb.TestOverlap(segmentAABB) == false) continue;
            var c = node.aabb.GetCenter();
            var h = node.aabb.GetExtents();
            var separation = Math.abs(v.x * (p1.x - c.x) + v.y * (p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
            if (separation > 0) continue;
            if (node.IsLeaf()) {
                var subInput = new b2RayCastInput;
                subInput.p1 = input.p1;
                subInput.p2 = input.p2;
                subInput.maxFraction = input.maxFraction;
                maxFraction = callback(subInput, node);
                if (maxFraction == 0) return;
                if (maxFraction > 0) {
                    tX = p1.x + maxFraction * (p2.x - p1.x);
                    tY = p1.y + maxFraction * (p2.y - p1.y);
                    segmentAABB.lowerBound.x = Math.min(p1.x, tX);
                    segmentAABB.lowerBound.y = Math.min(p1.y, tY);
                    segmentAABB.upperBound.x = Math.max(p1.x, tX);
                    segmentAABB.upperBound.y = Math.max(p1.y, tY)
                }
            } else {
                stack[count++] = node.child1;
                stack[count++] = node.child2
            }
        }
    };
    b2DynamicTree.prototype.AllocateNode = function() {
        if (this.m_freeList) {
            var node = this.m_freeList;
            this.m_freeList = node.parent;
            node.parent = null;
            node.child1 = null;
            node.child2 = null;
            return node
        }
        return new b2DynamicTreeNode
    };
    b2DynamicTree.prototype.FreeNode = function(node) {
        node.parent = this.m_freeList;
        this.m_freeList = node
    };
    b2DynamicTree.prototype.InsertLeaf = function(leaf) {
        ++this.m_insertionCount;
        if (this.m_root == null) {
            this.m_root = leaf;
            this.m_root.parent = null;
            return
        }
        var center = leaf.aabb.GetCenter();
        var sibling = this.m_root;
        if (sibling.IsLeaf() == false) {
            do {
                var child1 = sibling.child1;
                var child2 = sibling.child2;
                var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
                var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
                if (norm1 < norm2) sibling = child1;
                else sibling = child2
            } while (sibling.IsLeaf() == false)
        }
        var node1 = sibling.parent;
        var node2 = this.AllocateNode();
        node2.parent = node1;
        node2.userData = null;
        node2.aabb.Combine(leaf.aabb, sibling.aabb);
        if (node1) {
            if (sibling.parent.child1 == sibling) node1.child1 = node2;
            else node1.child2 = node2;
            node2.child1 = sibling;
            node2.child2 = leaf;
            sibling.parent = node2;
            leaf.parent = node2;
            do {
                if (node1.aabb.Contains(node2.aabb)) break;
                node1.aabb.Combine(node1.child1.aabb, node1.child2.aabb);
                node2 = node1;
                node1 = node1.parent
            } while (node1)
        } else {
            node2.child1 = sibling;
            node2.child2 = leaf;
            sibling.parent = node2;
            leaf.parent = node2;
            this.m_root = node2
        }
    };
    b2DynamicTree.prototype.RemoveLeaf = function(leaf) {
        if (leaf == this.m_root) {
            this.m_root = null;
            return
        }
        var node2 = leaf.parent;
        var node1 = node2.parent;
        var sibling;
        if (node2.child1 == leaf) sibling = node2.child2;
        else sibling = node2.child1;
        if (node1) {
            if (node1.child1 == node2) node1.child1 = sibling;
            else node1.child2 = sibling;
            sibling.parent = node1;
            this.FreeNode(node2);
            while (node1) {
                var oldAABB = node1.aabb;
                node1.aabb = b2AABB.Combine(node1.child1.aabb, node1.child2.aabb);
                if (oldAABB.Contains(node1.aabb)) break;
                node1 = node1.parent
            }
        } else {
            this.m_root = sibling;
            sibling.parent = null;
            this.FreeNode(node2)
        }
    };
    b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase = function() {
        this.m_tree = new b2DynamicTree;
        this.m_moveBuffer = new Vector;
        this.m_pairBuffer = new Vector;
        this.m_pairCount = 0
    };
    b2DynamicTreeBroadPhase.prototype.CreateProxy = function(aabb, userData) {
        var proxy = this.m_tree.CreateProxy(aabb, userData);
        ++this.m_proxyCount;
        this.BufferMove(proxy);
        return proxy
    };
    b2DynamicTreeBroadPhase.prototype.DestroyProxy = function(proxy) {
        this.UnBufferMove(proxy);
        --this.m_proxyCount;
        this.m_tree.DestroyProxy(proxy)
    };
    b2DynamicTreeBroadPhase.prototype.MoveProxy = function(proxy, aabb, displacement) {
        var buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
        if (buffer) this.BufferMove(proxy)
    };
    b2DynamicTreeBroadPhase.prototype.TestOverlap = function(proxyA, proxyB) {
        var aabbA = this.m_tree.GetFatAABB(proxyA);
        var aabbB = this.m_tree.GetFatAABB(proxyB);
        return aabbA.TestOverlap(aabbB)
    };
    b2DynamicTreeBroadPhase.prototype.GetUserData = function(proxy) {
        return this.m_tree.GetUserData(proxy)
    };
    b2DynamicTreeBroadPhase.prototype.GetFatAABB = function(proxy) {
        return this.m_tree.GetFatAABB(proxy)
    };
    b2DynamicTreeBroadPhase.prototype.GetProxyCount = function() {
        return this.m_proxyCount
    };
    b2DynamicTreeBroadPhase.prototype.UpdatePairs = function(callback) {
        var __this = this;
        __this.m_pairCount = 0;
        var i = 0,
            queryProxy;
        for (i = 0; i < __this.m_moveBuffer.length; ++i) {
            queryProxy = __this.m_moveBuffer[i];

            function QueryCallback(proxy) {
                if (proxy == queryProxy) return true;
                if (__this.m_pairCount == __this.m_pairBuffer.length) __this.m_pairBuffer[__this.m_pairCount] = new b2DynamicTreePair;
                var pair = __this.m_pairBuffer[__this.m_pairCount];
                pair.proxyA = proxy < queryProxy ? proxy : queryProxy;
                pair.proxyB = proxy >= queryProxy ? proxy : queryProxy;
                ++__this.m_pairCount;
                return true
            }
            var fatAABB = __this.m_tree.GetFatAABB(queryProxy);
            __this.m_tree.Query(QueryCallback, fatAABB)
        }
        __this.m_moveBuffer.length = 0;
        for (var i = 0; i < __this.m_pairCount;) {
            var primaryPair = __this.m_pairBuffer[i];
            var userDataA = __this.m_tree.GetUserData(primaryPair.proxyA);
            var userDataB = __this.m_tree.GetUserData(primaryPair.proxyB);
            callback(userDataA, userDataB);
            ++i;
            while (i < __this.m_pairCount) {
                var pair = __this.m_pairBuffer[i];
                if (pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) break;
                ++i
            }
        }
    };
    b2DynamicTreeBroadPhase.prototype.Query = function(callback, aabb) {
        this.m_tree.Query(callback, aabb)
    };
    b2DynamicTreeBroadPhase.prototype.RayCast = function(callback, input) {
        this.m_tree.RayCast(callback, input)
    };
    b2DynamicTreeBroadPhase.prototype.Validate = function() {};
    b2DynamicTreeBroadPhase.prototype.Rebalance = function(iterations) {
        if (iterations === undefined) iterations = 0;
        this.m_tree.Rebalance(iterations)
    };
    b2DynamicTreeBroadPhase.prototype.BufferMove = function(proxy) {
        this.m_moveBuffer[this.m_moveBuffer.length] = proxy
    };
    b2DynamicTreeBroadPhase.prototype.UnBufferMove = function(proxy) {
        var i = parseInt(this.m_moveBuffer.indexOf(proxy));
        this.m_moveBuffer.splice(i, 1)
    };
    b2DynamicTreeBroadPhase.prototype.ComparePairs = function(pair1, pair2) {
        return 0
    };
    b2DynamicTreeBroadPhase.__implements = {};
    b2DynamicTreeBroadPhase.__implements[IBroadPhase] = true;
    b2DynamicTreeNode.b2DynamicTreeNode = function() {
        this.aabb = new b2AABB
    };
    b2DynamicTreeNode.prototype.IsLeaf = function() {
        return this.child1 == null
    };
    b2DynamicTreePair.b2DynamicTreePair = function() {};
    b2Manifold.b2Manifold = function() {
        this.m_pointCount = 0
    };
    b2Manifold.prototype.b2Manifold = function() {
        this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) this.m_points[i] = new b2ManifoldPoint;
        this.m_localPlaneNormal = new b2Vec2;
        this.m_localPoint = new b2Vec2
    };
    b2Manifold.prototype.Reset = function() {
        for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++)(this.m_points[i] instanceof
            b2ManifoldPoint ? this.m_points[i] : null).Reset();
        this.m_localPlaneNormal.SetZero();
        this.m_localPoint.SetZero();
        this.m_type = 0;
        this.m_pointCount = 0
    };
    b2Manifold.prototype.Set = function(m) {
        this.m_pointCount = m.m_pointCount;
        for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++)(this.m_points[i] instanceof b2ManifoldPoint ? this.m_points[i] : null).Set(m.m_points[i]);
        this.m_localPlaneNormal.SetV(m.m_localPlaneNormal);
        this.m_localPoint.SetV(m.m_localPoint);
        this.m_type = m.m_type
    };
    b2Manifold.prototype.Copy = function() {
        var copy = new b2Manifold;
        copy.Set(this);
        return copy
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Manifold.e_circles = 1;
        Box2D.Collision.b2Manifold.e_faceA = 2;
        Box2D.Collision.b2Manifold.e_faceB = 4
    });
    b2ManifoldPoint.b2ManifoldPoint = function() {
        this.m_localPoint = new b2Vec2;
        this.m_id = new b2ContactID
    };
    b2ManifoldPoint.prototype.b2ManifoldPoint = function() {
        this.Reset()
    };
    b2ManifoldPoint.prototype.Reset = function() {
        this.m_localPoint.SetZero();
        this.m_normalImpulse = 0;
        this.m_tangentImpulse = 0;
        this.m_id.key = 0
    };
    b2ManifoldPoint.prototype.Set = function(m) {
        this.m_localPoint.SetV(m.m_localPoint);
        this.m_normalImpulse = m.m_normalImpulse;
        this.m_tangentImpulse = m.m_tangentImpulse;
        this.m_id.Set(m.m_id)
    };
    b2Point.b2Point = function() {
        this.p = new b2Vec2
    };
    b2Point.prototype.Support = function(xf, vX, vY) {
        if (vX === undefined) vX = 0;
        if (vY === undefined) vY = 0;
        return this.p
    };
    b2Point.prototype.GetFirstVertex = function(xf) {
        return this.p
    };
    b2RayCastInput.b2RayCastInput = function() {
        this.p1 = new b2Vec2;
        this.p2 = new b2Vec2
    };
    b2RayCastInput.prototype.b2RayCastInput = function(p1, p2, maxFraction) {
        if (p1 === undefined) p1 = null;
        if (p2 === undefined) p2 = null;
        if (maxFraction === undefined) maxFraction = 1;
        if (p1) this.p1.SetV(p1);
        if (p2) this.p2.SetV(p2);
        this.maxFraction = maxFraction
    };
    b2RayCastOutput.b2RayCastOutput = function() {
        this.normal = new b2Vec2
    };
    b2Segment.b2Segment = function() {
        this.p1 = new b2Vec2;
        this.p2 = new b2Vec2
    };
    b2Segment.prototype.TestSegment = function(lambda, normal, segment, maxLambda) {
        if (maxLambda === undefined) maxLambda = 0;
        var s = segment.p1;
        var rX = segment.p2.x - s.x;
        var rY = segment.p2.y - s.y;
        var dX = this.p2.x - this.p1.x;
        var dY = this.p2.y - this.p1.y;
        var nX = dY;
        var nY = -dX;
        var k_slop = 100 * Number.MIN_VALUE;
        var denom = -(rX * nX + rY * nY);
        if (denom > k_slop) {
            var bX = s.x - this.p1.x;
            var bY = s.y - this.p1.y;
            var a = bX * nX + bY * nY;
            if (0 <= a && a <= maxLambda * denom) {
                var mu2 = -rX * bY + rY * bX;
                if (-k_slop * denom <= mu2 && mu2 <= denom * (1 + k_slop)) {
                    a /= denom;
                    var nLen = Math.sqrt(nX * nX + nY * nY);
                    nX /= nLen;
                    nY /= nLen;
                    lambda[0] = a;
                    normal.Set(nX, nY);
                    return true
                }
            }
        }
        return false
    };
    b2Segment.prototype.Extend = function(aabb) {
        this.ExtendForward(aabb);
        this.ExtendBackward(aabb)
    };
    b2Segment.prototype.ExtendForward = function(aabb) {
        var dX = this.p2.x - this.p1.x;
        var dY = this.p2.y - this.p1.y;
        var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p1.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p1.x) / dX : Number.POSITIVE_INFINITY, dY > 0 ? (aabb.upperBound.y - this.p1.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p1.y) / dY : Number.POSITIVE_INFINITY);
        this.p2.x = this.p1.x + dX * lambda;
        this.p2.y = this.p1.y + dY * lambda
    };
    b2Segment.prototype.ExtendBackward = function(aabb) {
        var dX = -this.p2.x + this.p1.x;
        var dY = -this.p2.y + this.p1.y;
        var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p2.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p2.x) / dX : Number.POSITIVE_INFINITY, dY > 0 ? (aabb.upperBound.y - this.p2.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p2.y) / dY : Number.POSITIVE_INFINITY);
        this.p1.x = this.p2.x + dX * lambda;
        this.p1.y = this.p2.y + dY * lambda
    };
    b2SeparationFunction.b2SeparationFunction = function() {
        this.m_localPoint = new b2Vec2;
        this.m_axis = new b2Vec2
    };
    b2SeparationFunction.prototype.Initialize = function(cache, proxyA, transformA, proxyB, transformB) {
        this.m_proxyA = proxyA;
        this.m_proxyB = proxyB;
        var count = parseInt(cache.count);
        b2Settings.b2Assert(0 < count && count < 3);
        var localPointA;
        var localPointA1;
        var localPointA2;
        var localPointB;
        var localPointB1;
        var localPointB2;
        var pointAX = 0;
        var pointAY = 0;
        var pointBX = 0;
        var pointBY = 0;
        var normalX = 0;
        var normalY = 0;
        var tMat;
        var tVec;
        var s = 0;
        var sgn = 0;
        if (count == 1) {
            this.m_type = b2SeparationFunction.e_points;
            localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
            localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
            tVec = localPointA;
            tMat = transformA.R;
            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tVec = localPointB;
            tMat = transformB.R;
            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            this.m_axis.x = pointBX - pointAX;
            this.m_axis.y = pointBY - pointAY;
            this.m_axis.Normalize()
        } else if (cache.indexB[0] == cache.indexB[1]) {
            this.m_type = b2SeparationFunction.e_faceA;
            localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
            localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
            localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
            this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
            this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1);
            this.m_axis.Normalize();
            tVec = this.m_axis;
            tMat = transformA.R;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tVec = this.m_localPoint;
            tMat = transformA.R;
            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tVec = localPointB;
            tMat = transformB.R;
            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
            if (s < 0) this.m_axis.NegativeSelf()
        } else if (cache.indexA[0] == cache.indexA[0]) {
            this.m_type = b2SeparationFunction.e_faceB;
            localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
            localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
            localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
            this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
            this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1);
            this.m_axis.Normalize();
            tVec = this.m_axis;
            tMat = transformB.R;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tVec = this.m_localPoint;
            tMat = transformB.R;
            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tVec = localPointA;
            tMat = transformA.R;
            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
            if (s < 0) this.m_axis.NegativeSelf()
        } else {
            localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
            localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
            localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
            localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
            var pA = b2Math.MulX(transformA, localPointA);
            var dA = b2Math.MulMV(transformA.R, b2Math.SubtractVV(localPointA2, localPointA1));
            var pB = b2Math.MulX(transformB, localPointB);
            var dB = b2Math.MulMV(transformB.R, b2Math.SubtractVV(localPointB2, localPointB1));
            var a = dA.x * dA.x + dA.y * dA.y;
            var e = dB.x * dB.x + dB.y * dB.y;
            var r = b2Math.SubtractVV(dB, dA);
            var c = dA.x * r.x + dA.y * r.y;
            var f = dB.x * r.x + dB.y * r.y;
            var b = dA.x * dB.x + dA.y * dB.y;
            var denom = a * e - b * b;
            s = 0;
            if (denom != 0) s = b2Math.Clamp((b * f - c * e) / denom, 0, 1);
            var t = (b * s + f) / e;
            if (t < 0) {
                t = 0;
                s = b2Math.Clamp((b - c) / a, 0, 1)
            }
            localPointA = new b2Vec2;
            localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
            localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
            localPointB = new b2Vec2;
            localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
            localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
            if (s == 0 || s == 1) {
                this.m_type = b2SeparationFunction.e_faceB;
                this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1);
                this.m_axis.Normalize();
                this.m_localPoint = localPointB;
                tVec = this.m_axis;
                tMat = transformB.R;
                normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                tVec = this.m_localPoint;
                tMat = transformB.R;
                pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                tVec = localPointA;
                tMat = transformA.R;
                pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
                if (s < 0) this.m_axis.NegativeSelf()
            } else {
                this.m_type = b2SeparationFunction.e_faceA;
                this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1);
                this.m_localPoint = localPointA;
                tVec = this.m_axis;
                tMat = transformA.R;
                normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                tVec = this.m_localPoint;
                tMat = transformA.R;
                pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                tVec = localPointB;
                tMat = transformB.R;
                pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
                if (s < 0) this.m_axis.NegativeSelf()
            }
        }
    };
    b2SeparationFunction.prototype.Evaluate = function(transformA, transformB) {
        var axisA;
        var axisB;
        var localPointA;
        var localPointB;
        var pointA;
        var pointB;
        var seperation = 0;
        var normal;
        switch (this.m_type) {
            case b2SeparationFunction.e_points:
                axisA = b2Math.MulTMV(transformA.R, this.m_axis);
                axisB = b2Math.MulTMV(transformB.R, this.m_axis.GetNegative());
                localPointA = this.m_proxyA.GetSupportVertex(axisA);
                localPointB = this.m_proxyB.GetSupportVertex(axisB);
                pointA = b2Math.MulX(transformA, localPointA);
                pointB = b2Math.MulX(transformB, localPointB);
                seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
                return seperation;
            case b2SeparationFunction.e_faceA:
                normal = b2Math.MulMV(transformA.R, this.m_axis);
                pointA = b2Math.MulX(transformA, this.m_localPoint);
                axisB = b2Math.MulTMV(transformB.R, normal.GetNegative());
                localPointB = this.m_proxyB.GetSupportVertex(axisB);
                pointB = b2Math.MulX(transformB, localPointB);
                seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
                return seperation;
            case b2SeparationFunction.e_faceB:
                normal = b2Math.MulMV(transformB.R, this.m_axis);
                pointB = b2Math.MulX(transformB, this.m_localPoint);
                axisA = b2Math.MulTMV(transformA.R, normal.GetNegative());
                localPointA = this.m_proxyA.GetSupportVertex(axisA);
                pointA = b2Math.MulX(transformA, localPointA);
                seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
                return seperation;
            default:
                b2Settings.b2Assert(false);
                return 0
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2SeparationFunction.e_points = 1;
        Box2D.Collision.b2SeparationFunction.e_faceA = 2;
        Box2D.Collision.b2SeparationFunction.e_faceB = 4
    });
    b2Simplex.b2Simplex = function() {
        this.m_v1 = new b2SimplexVertex;
        this.m_v2 = new b2SimplexVertex;
        this.m_v3 = new b2SimplexVertex;
        this.m_vertices = new Vector(3)
    };
    b2Simplex.prototype.b2Simplex = function() {
        this.m_vertices[0] = this.m_v1;
        this.m_vertices[1] = this.m_v2;
        this.m_vertices[2] = this.m_v3
    };
    b2Simplex.prototype.ReadCache = function(cache, proxyA, transformA, proxyB, transformB) {
        b2Settings.b2Assert(0 <= cache.count && cache.count <= 3);
        var wALocal;
        var wBLocal;
        this.m_count = cache.count;
        var vertices = this.m_vertices;
        for (var i = 0; i < this.m_count; i++) {
            var v = vertices[i];
            v.indexA = cache.indexA[i];
            v.indexB = cache.indexB[i];
            wALocal = proxyA.GetVertex(v.indexA);
            wBLocal = proxyB.GetVertex(v.indexB);
            v.wA = b2Math.MulX(transformA, wALocal);
            v.wB = b2Math.MulX(transformB, wBLocal);
            v.w = b2Math.SubtractVV(v.wB, v.wA);
            v.a = 0
        }
        if (this.m_count > 1) {
            var metric1 = cache.metric;
            var metric2 = this.GetMetric();
            if (metric2 < 0.5 * metric1 || (2 * metric1 < metric2 || metric2 < Number.MIN_VALUE)) this.m_count = 0
        }
        if (this.m_count == 0) {
            v = vertices[0];
            v.indexA = 0;
            v.indexB = 0;
            wALocal = proxyA.GetVertex(0);
            wBLocal = proxyB.GetVertex(0);
            v.wA = b2Math.MulX(transformA, wALocal);
            v.wB = b2Math.MulX(transformB, wBLocal);
            v.w = b2Math.SubtractVV(v.wB, v.wA);
            this.m_count = 1
        }
    };
    b2Simplex.prototype.WriteCache = function(cache) {
        cache.metric = this.GetMetric();
        cache.count = Box2D.parseUInt(this.m_count);
        var vertices = this.m_vertices;
        for (var i = 0; i < this.m_count; i++) {
            cache.indexA[i] = Box2D.parseUInt(vertices[i].indexA);
            cache.indexB[i] = Box2D.parseUInt(vertices[i].indexB)
        }
    };
    b2Simplex.prototype.GetSearchDirection = function() {
        switch (this.m_count) {
            case 1:
                return this.m_v1.w.GetNegative();
            case 2:
                var e12 = b2Math.SubtractVV(this.m_v2.w, this.m_v1.w);
                var sgn = b2Math.CrossVV(e12, this.m_v1.w.GetNegative());
                if (sgn > 0) return b2Math.CrossFV(1, e12);
                else return b2Math.CrossVF(e12, 1);
            default:
                b2Settings.b2Assert(false);
                return new b2Vec2
        }
    };
    b2Simplex.prototype.GetClosestPoint = function() {
        switch (this.m_count) {
            case 0:
                b2Settings.b2Assert(false);
                return new b2Vec2;
            case 1:
                return this.m_v1.w;
            case 2:
                return new b2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
            default:
                b2Settings.b2Assert(false);
                return new b2Vec2
        }
    };
    b2Simplex.prototype.GetWitnessPoints = function(pA, pB) {
        switch (this.m_count) {
            case 0:
                b2Settings.b2Assert(false);
                break;
            case 1:
                pA.SetV(this.m_v1.wA);
                pB.SetV(this.m_v1.wB);
                break;
            case 2:
                pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
                pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
                pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
                pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                break;
            case 3:
                pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
                pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                break;
            default:
                b2Settings.b2Assert(false);
                break
        }
    };
    b2Simplex.prototype.GetMetric = function() {
        switch (this.m_count) {
            case 0:
                b2Settings.b2Assert(false);
                return 0;
            case 1:
                return 0;
            case 2:
                return b2Math.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
            case 3:
                return b2Math.CrossVV(b2Math.SubtractVV(this.m_v2.w, this.m_v1.w), b2Math.SubtractVV(this.m_v3.w, this.m_v1.w));
            default:
                b2Settings.b2Assert(false);
                return 0
        }
    };
    b2Simplex.prototype.Solve2 = function() {
        var w1 = this.m_v1.w;
        var w2 = this.m_v2.w;
        var e12 = b2Math.SubtractVV(w2, w1);
        var d12_2 = -(w1.x * e12.x + w1.y * e12.y);
        if (d12_2 <= 0) {
            this.m_v1.a = 1;
            this.m_count = 1;
            return
        }
        var d12_1 = w2.x * e12.x + w2.y * e12.y;
        if (d12_1 <= 0) {
            this.m_v2.a = 1;
            this.m_count = 1;
            this.m_v1.Set(this.m_v2);
            return
        }
        var inv_d12 = 1 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2
    };
    b2Simplex.prototype.Solve3 = function() {
        var w1 = this.m_v1.w;
        var w2 = this.m_v2.w;
        var w3 = this.m_v3.w;
        var e12 = b2Math.SubtractVV(w2, w1);
        var w1e12 = b2Math.Dot(w1, e12);
        var w2e12 = b2Math.Dot(w2, e12);
        var d12_1 = w2e12;
        var d12_2 = -w1e12;
        var e13 = b2Math.SubtractVV(w3, w1);
        var w1e13 = b2Math.Dot(w1, e13);
        var w3e13 = b2Math.Dot(w3, e13);
        var d13_1 = w3e13;
        var d13_2 = -w1e13;
        var e23 = b2Math.SubtractVV(w3, w2);
        var w2e23 = b2Math.Dot(w2, e23);
        var w3e23 = b2Math.Dot(w3, e23);
        var d23_1 = w3e23;
        var d23_2 = -w2e23;
        var n123 = b2Math.CrossVV(e12, e13);
        var d123_1 = n123 * b2Math.CrossVV(w2, w3);
        var d123_2 = n123 * b2Math.CrossVV(w3, w1);
        var d123_3 = n123 * b2Math.CrossVV(w1, w2);
        if (d12_2 <= 0 && d13_2 <= 0) {
            this.m_v1.a = 1;
            this.m_count = 1;
            return
        }
        if (d12_1 > 0 && (d12_2 > 0 && d123_3 <= 0)) {
            var inv_d12 = 1 / (d12_1 + d12_2);
            this.m_v1.a = d12_1 * inv_d12;
            this.m_v2.a = d12_2 * inv_d12;
            this.m_count = 2;
            return
        }
        if (d13_1 > 0 && (d13_2 > 0 && d123_2 <= 0)) {
            var inv_d13 = 1 / (d13_1 + d13_2);
            this.m_v1.a = d13_1 * inv_d13;
            this.m_v3.a = d13_2 * inv_d13;
            this.m_count = 2;
            this.m_v2.Set(this.m_v3);
            return
        }
        if (d12_1 <= 0 && d23_2 <= 0) {
            this.m_v2.a = 1;
            this.m_count = 1;
            this.m_v1.Set(this.m_v2);
            return
        }
        if (d13_1 <= 0 && d23_1 <= 0) {
            this.m_v3.a = 1;
            this.m_count = 1;
            this.m_v1.Set(this.m_v3);
            return
        }
        if (d23_1 > 0 && (d23_2 > 0 && d123_1 <= 0)) {
            var inv_d23 = 1 / (d23_1 + d23_2);
            this.m_v2.a = d23_1 * inv_d23;
            this.m_v3.a = d23_2 * inv_d23;
            this.m_count = 2;
            this.m_v1.Set(this.m_v3);
            return
        }
        var inv_d123 = 1 / (d123_1 + d123_2 + d123_3);
        this.m_v1.a = d123_1 * inv_d123;
        this.m_v2.a = d123_2 * inv_d123;
        this.m_v3.a = d123_3 * inv_d123;
        this.m_count = 3
    };
    b2SimplexCache.b2SimplexCache = function() {
        this.indexA = new Vector_a2j_Number(3);
        this.indexB = new Vector_a2j_Number(3)
    };
    b2SimplexVertex.b2SimplexVertex = function() {};
    b2SimplexVertex.prototype.Set = function(other) {
        this.wA.SetV(other.wA);
        this.wB.SetV(other.wB);
        this.w.SetV(other.w);
        this.a = other.a;
        this.indexA = other.indexA;
        this.indexB = other.indexB
    };
    b2TimeOfImpact.b2TimeOfImpact = function() {};
    b2TimeOfImpact.TimeOfImpact = function(input) {
        ++b2TimeOfImpact.b2_toiCalls;
        var proxyA = input.proxyA;
        var proxyB = input.proxyB;
        var sweepA = input.sweepA;
        var sweepB = input.sweepB;
        b2Settings.b2Assert(sweepA.t0 == sweepB.t0);
        b2Settings.b2Assert(1 - sweepA.t0 > Number.MIN_VALUE);
        var radius = proxyA.m_radius + proxyB.m_radius;
        var tolerance = input.tolerance;
        var alpha = 0;
        var k_maxIterations = 1E3;
        var iter = 0;
        var target = 0;
        b2TimeOfImpact.s_cache.count = 0;
        b2TimeOfImpact.s_distanceInput.useRadii = false;
        for (;;) {
            sweepA.GetTransform(b2TimeOfImpact.s_xfA, alpha);
            sweepB.GetTransform(b2TimeOfImpact.s_xfB, alpha);
            b2TimeOfImpact.s_distanceInput.proxyA = proxyA;
            b2TimeOfImpact.s_distanceInput.proxyB = proxyB;
            b2TimeOfImpact.s_distanceInput.transformA = b2TimeOfImpact.s_xfA;
            b2TimeOfImpact.s_distanceInput.transformB = b2TimeOfImpact.s_xfB;
            b2Distance.Distance(b2TimeOfImpact.s_distanceOutput, b2TimeOfImpact.s_cache, b2TimeOfImpact.s_distanceInput);
            if (b2TimeOfImpact.s_distanceOutput.distance <= 0) {
                alpha = 1;
                break
            }
            b2TimeOfImpact.s_fcn.Initialize(b2TimeOfImpact.s_cache, proxyA, b2TimeOfImpact.s_xfA, proxyB, b2TimeOfImpact.s_xfB);
            var separation = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
            if (separation <= 0) {
                alpha = 1;
                break
            }
            if (iter == 0) if (separation > radius) target = b2Math.Max(radius - tolerance, 0.75 * radius);
            else target = b2Math.Max(separation - tolerance, 0.02 * radius);
            if (separation - target < 0.5 * tolerance) {
                if (iter == 0) {
                    alpha = 1;
                    break
                }
                break
            }
            var newAlpha = alpha;
            var x1 = alpha;
            var x2 = 1;
            var f1 = separation;
            sweepA.GetTransform(b2TimeOfImpact.s_xfA, x2);
            sweepB.GetTransform(b2TimeOfImpact.s_xfB, x2);
            var f2 = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
            if (f2 >= target) {
                alpha = 1;
                break
            }
            var rootIterCount = 0;
            for (;;) {
                var x = 0;
                if (rootIterCount & 1) x = x1 + (target - f1) * (x2 - x1) / (f2 - f1);
                else x = 0.5 * (x1 + x2);
                sweepA.GetTransform(b2TimeOfImpact.s_xfA, x);
                sweepB.GetTransform(b2TimeOfImpact.s_xfB, x);
                var f = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
                if (b2Math.Abs(f - target) < 0.025 * tolerance) {
                    newAlpha = x;
                    break
                }
                if (f > target) {
                    x1 = x;
                    f1 = f
                } else {
                    x2 = x;
                    f2 = f
                }++rootIterCount;
                ++b2TimeOfImpact.b2_toiRootIters;
                if (rootIterCount == 50) break
            }
            b2TimeOfImpact.b2_toiMaxRootIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxRootIters, rootIterCount);
            if (newAlpha < (1 + 100 * Number.MIN_VALUE) * alpha) break;
            alpha = newAlpha;
            iter++;
            ++b2TimeOfImpact.b2_toiIters;
            if (iter == k_maxIterations) break
        }
        b2TimeOfImpact.b2_toiMaxIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxIters, iter);
        return alpha
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.s_cache = new b2SimplexCache;
        Box2D.Collision.b2TimeOfImpact.s_distanceInput = new b2DistanceInput;
        Box2D.Collision.b2TimeOfImpact.s_xfA = new b2Transform;
        Box2D.Collision.b2TimeOfImpact.s_xfB = new b2Transform;
        Box2D.Collision.b2TimeOfImpact.s_fcn = new b2SeparationFunction;
        Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new b2DistanceOutput
    });
    b2TOIInput.b2TOIInput = function() {
        this.proxyA = new b2DistanceProxy;
        this.proxyB = new b2DistanceProxy;
        this.sweepA = new b2Sweep;
        this.sweepB = new b2Sweep
    };
    b2WorldManifold.b2WorldManifold = function() {
        this.m_normal = new b2Vec2
    };
    b2WorldManifold.prototype.b2WorldManifold = function() {
        this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) this.m_points[i] = new b2Vec2
    };
    b2WorldManifold.prototype.Initialize = function(manifold, xfA, radiusA, xfB, radiusB) {
        if (radiusA === undefined) radiusA = 0;
        if (radiusB === undefined) radiusB = 0;
        if (manifold.m_pointCount == 0) return;
        var i = 0;
        var tVec;
        var tMat;
        var normalX = 0;
        var normalY = 0;
        var planePointX = 0;
        var planePointY = 0;
        var clipPointX = 0;
        var clipPointY = 0;
        switch (manifold.m_type) {
            case b2Manifold.e_circles:
                tMat = xfA.R;
                tVec = manifold.m_localPoint;
                var pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                var pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                tMat = xfB.R;
                tVec = manifold.m_points[0].m_localPoint;
                var pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                var pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                var dX = pointBX - pointAX;
                var dY = pointBY - pointAY;
                var d2 = dX * dX + dY * dY;
                if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
                    var d = Math.sqrt(d2);
                    this.m_normal.x = dX / d;
                    this.m_normal.y = dY / d
                } else {
                    this.m_normal.x = 1;
                    this.m_normal.y = 0
                }
                var cAX = pointAX + radiusA * this.m_normal.x;
                var cAY = pointAY + radiusA * this.m_normal.y;
                var cBX = pointBX - radiusB * this.m_normal.x;
                var cBY = pointBY - radiusB * this.m_normal.y;
                this.m_points[0].x = 0.5 * (cAX + cBX);
                this.m_points[0].y = 0.5 * (cAY + cBY);
                break;
            case b2Manifold.e_faceA:
                tMat = xfA.R;
                tVec = manifold.m_localPlaneNormal;
                normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                tMat = xfA.R;
                tVec = manifold.m_localPoint;
                planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                this.m_normal.x = normalX;
                this.m_normal.y = normalY;
                for (i = 0; i < manifold.m_pointCount; i++) {
                    tMat = xfB.R;
                    tVec = manifold.m_points[i].m_localPoint;
                    clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                    clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                    this.m_points[i].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
                    this.m_points[i].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY
                }
                break;
            case b2Manifold.e_faceB:
                tMat = xfB.R;
                tVec = manifold.m_localPlaneNormal;
                normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                tMat = xfB.R;
                tVec = manifold.m_localPoint;
                planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                this.m_normal.x = -normalX;
                this.m_normal.y = -normalY;
                for (i = 0; i < manifold.m_pointCount; i++) {
                    tMat = xfA.R;
                    tVec = manifold.m_points[i].m_localPoint;
                    clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                    clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                    this.m_points[i].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
                    this.m_points[i].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY
                }
                break
        }
    };
    ClipVertex.ClipVertex = function() {
        this.v = new b2Vec2;
        this.id = new b2ContactID
    };
    ClipVertex.prototype.Set = function(other) {
        this.v.SetV(other.v);
        this.id.Set(other.id)
    };
    Features.Features = function() {};
    Object.defineProperty(Features.prototype, "referenceEdge", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this._referenceEdge
        }
    });
    Object.defineProperty(Features.prototype, "referenceEdge", {
        enumerable: false,
        configurable: true,
        set: function(value) {
            if (value === undefined) value = 0;
            this._referenceEdge = value;
            this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
        }
    });
    Object.defineProperty(Features.prototype, "incidentEdge", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this._incidentEdge
        }
    });
    Object.defineProperty(Features.prototype, "incidentEdge", {
        enumerable: false,
        configurable: true,
        set: function(value) {
            if (value === undefined) value = 0;
            this._incidentEdge = value;
            this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
        }
    });
    Object.defineProperty(Features.prototype, "incidentVertex", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this._incidentVertex
        }
    });
    Object.defineProperty(Features.prototype, "incidentVertex", {
        enumerable: false,
        configurable: true,
        set: function(value) {
            if (value === undefined) value = 0;
            this._incidentVertex = value;
            this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
        }
    });
    Object.defineProperty(Features.prototype, "flip", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this._flip
        }
    });
    Object.defineProperty(Features.prototype, "flip", {
        enumerable: false,
        configurable: true,
        set: function(value) {
            if (value === undefined) value = 0;
            this._flip = value;
            this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
        }
    })
})();
(function() {
    var b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
        b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2Shape = Box2D.Collision.Shapes.b2Shape,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3,
        b2Body = Box2D.Dynamics.b2Body,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
        b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
        b2ContactListener = Box2D.Dynamics.b2ContactListener,
        b2ContactManager = Box2D.Dynamics.b2ContactManager,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
        b2FilterData = Box2D.Dynamics.b2FilterData,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Island = Box2D.Dynamics.b2Island,
        b2TimeStep = Box2D.Dynamics.b2TimeStep,
        b2World = Box2D.Dynamics.b2World,
        b2AABB = Box2D.Collision.b2AABB,
        b2Bound = Box2D.Collision.b2Bound,
        b2BoundValues = Box2D.Collision.b2BoundValues,
        b2Collision = Box2D.Collision.b2Collision,
        b2ContactID = Box2D.Collision.b2ContactID,
        b2ContactPoint = Box2D.Collision.b2ContactPoint,
        b2Distance = Box2D.Collision.b2Distance,
        b2DistanceInput = Box2D.Collision.b2DistanceInput,
        b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
        b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
        b2DynamicTree = Box2D.Collision.b2DynamicTree,
        b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
        b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
        b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
        b2Manifold = Box2D.Collision.b2Manifold,
        b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
        b2Point = Box2D.Collision.b2Point,
        b2RayCastInput = Box2D.Collision.b2RayCastInput,
        b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
        b2Segment = Box2D.Collision.b2Segment,
        b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
        b2Simplex = Box2D.Collision.b2Simplex,
        b2SimplexCache = Box2D.Collision.b2SimplexCache,
        b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
        b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
        b2TOIInput = Box2D.Collision.b2TOIInput,
        b2WorldManifold = Box2D.Collision.b2WorldManifold,
        ClipVertex = Box2D.Collision.ClipVertex,
        Features = Box2D.Collision.Features,
        IBroadPhase = Box2D.Collision.IBroadPhase;
    Box2D.inherit(b2CircleShape, Box2D.Collision.Shapes.b2Shape);
    b2CircleShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    b2CircleShape.b2CircleShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.m_p = new b2Vec2
    };
    b2CircleShape.prototype.Copy = function() {
        var s = new b2CircleShape;
        s.Set(this);
        return s
    };
    b2CircleShape.prototype.Set = function(other) {
        this.__super.Set.call(this, other);
        if (Box2D.is(other, b2CircleShape)) {
            var other2 = other instanceof b2CircleShape ? other : null;
            this.m_p.SetV(other2.m_p)
        }
    };
    b2CircleShape.prototype.TestPoint = function(transform, p) {
        var tMat = transform.R;
        var dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
        var dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
        dX = p.x - dX;
        dY = p.y - dY;
        return dX * dX + dY * dY <= this.m_radius * this.m_radius
    };
    b2CircleShape.prototype.RayCast = function(output, input, transform) {
        var tMat = transform.R;
        var positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
        var positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
        var sX = input.p1.x - positionX;
        var sY = input.p1.y - positionY;
        var b = sX * sX + sY * sY - this.m_radius * this.m_radius;
        var rX = input.p2.x - input.p1.x;
        var rY = input.p2.y - input.p1.y;
        var c = sX * rX + sY * rY;
        var rr = rX * rX + rY * rY;
        var sigma = c * c - rr * b;
        if (sigma < 0 || rr < Number.MIN_VALUE) return false;
        var a = -(c + Math.sqrt(sigma));
        if (0 <= a && a <= input.maxFraction * rr) {
            a /= rr;
            output.fraction = a;
            output.normal.x = sX + a * rX;
            output.normal.y = sY + a * rY;
            output.normal.Normalize();
            return true
        }
        return false
    };
    b2CircleShape.prototype.ComputeAABB = function(aabb, transform) {
        var tMat = transform.R;
        var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
        var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
        aabb.lowerBound.Set(pX - this.m_radius, pY - this.m_radius);
        aabb.upperBound.Set(pX + this.m_radius, pY + this.m_radius)
    };
    b2CircleShape.prototype.ComputeMass = function(massData, density) {
        if (density === undefined) density = 0;
        massData.mass = density * b2Settings.b2_pi * this.m_radius * this.m_radius;
        massData.center.SetV(this.m_p);
        massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y))
    };
    b2CircleShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        var p = b2Math.MulX(xf, this.m_p);
        var l = -(b2Math.Dot(normal, p) - offset);
        if (l < -this.m_radius + Number.MIN_VALUE) return 0;
        if (l > this.m_radius) {
            c.SetV(p);
            return Math.PI * this.m_radius * this.m_radius
        }
        var r2 = this.m_radius * this.m_radius;
        var l2 = l * l;
        var area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
        var com = -2 / 3 * Math.pow(r2 - l2, 1.5) / area;
        c.x = p.x + normal.x * com;
        c.y = p.y + normal.y * com;
        return area
    };
    b2CircleShape.prototype.GetLocalPosition = function() {
        return this.m_p
    };
    b2CircleShape.prototype.SetLocalPosition = function(position) {
        this.m_p.SetV(position)
    };
    b2CircleShape.prototype.GetRadius = function() {
        return this.m_radius
    };
    b2CircleShape.prototype.SetRadius = function(radius) {
        if (radius === undefined) radius = 0;
        this.m_radius = radius
    };
    b2CircleShape.prototype.b2CircleShape = function(radius) {
        if (radius === undefined) radius = 0;
        this.__super.b2Shape.call(this);
        this.m_type = b2Shape.e_circleShape;
        this.m_radius = radius
    };
    b2EdgeChainDef.b2EdgeChainDef = function() {};
    b2EdgeChainDef.prototype.b2EdgeChainDef = function() {
        this.vertexCount = 0;
        this.isALoop = true;
        this.vertices = []
    };
    Box2D.inherit(b2EdgeShape, Box2D.Collision.Shapes.b2Shape);
    b2EdgeShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    b2EdgeShape.b2EdgeShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.s_supportVec = new b2Vec2;
        this.m_v1 = new b2Vec2;
        this.m_v2 = new b2Vec2;
        this.m_coreV1 = new b2Vec2;
        this.m_coreV2 = new b2Vec2;
        this.m_normal = new b2Vec2;
        this.m_direction = new b2Vec2;
        this.m_cornerDir1 = new b2Vec2;
        this.m_cornerDir2 = new b2Vec2
    };
    b2EdgeShape.prototype.TestPoint = function(transform, p) {
        return false
    };
    b2EdgeShape.prototype.RayCast = function(output, input, transform) {
        var tMat;
        var rX = input.p2.x - input.p1.x;
        var rY = input.p2.y - input.p1.y;
        tMat = transform.R;
        var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
        var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
        var nX = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y) - v1Y;
        var nY = -(transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y) - v1X);
        var k_slop = 100 * Number.MIN_VALUE;
        var denom = -(rX * nX + rY * nY);
        if (denom > k_slop) {
            var bX = input.p1.x - v1X;
            var bY = input.p1.y - v1Y;
            var a = bX * nX + bY * nY;
            if (0 <= a && a <= input.maxFraction * denom) {
                var mu2 = -rX * bY + rY * bX;
                if (-k_slop * denom <= mu2 && mu2 <= denom * (1 + k_slop)) {
                    a /= denom;
                    output.fraction = a;
                    var nLen = Math.sqrt(nX * nX + nY * nY);
                    output.normal.x = nX / nLen;
                    output.normal.y = nY / nLen;
                    return true
                }
            }
        }
        return false
    };
    b2EdgeShape.prototype.ComputeAABB = function(aabb, transform) {
        var tMat = transform.R;
        var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
        var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
        var v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
        var v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
        if (v1X < v2X) {
            aabb.lowerBound.x = v1X;
            aabb.upperBound.x = v2X
        } else {
            aabb.lowerBound.x = v2X;
            aabb.upperBound.x = v1X
        }
        if (v1Y < v2Y) {
            aabb.lowerBound.y = v1Y;
            aabb.upperBound.y = v2Y
        } else {
            aabb.lowerBound.y = v2Y;
            aabb.upperBound.y = v1Y
        }
    };
    b2EdgeShape.prototype.ComputeMass = function(massData, density) {
        if (density === undefined) density = 0;
        massData.mass = 0;
        massData.center.SetV(this.m_v1);
        massData.I = 0
    };
    b2EdgeShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        var v0 = new b2Vec2(normal.x * offset, normal.y * offset);
        var v1 = b2Math.MulX(xf, this.m_v1);
        var v2 = b2Math.MulX(xf, this.m_v2);
        var d1 = b2Math.Dot(normal, v1) - offset;
        var d2 = b2Math.Dot(normal, v2) - offset;
        if (d1 > 0) if (d2 > 0) return 0;
        else {
            v1.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
            v1.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y
        } else if (d2 > 0) {
            v2.x = -d2 / (d1 - d2) * v1.x + d1 / (d1 - d2) * v2.x;
            v2.y = -d2 / (d1 - d2) * v1.y + d1 / (d1 - d2) * v2.y
        } else;
        c.x = (v0.x + v1.x + v2.x) / 3;
        c.y = (v0.y + v1.y + v2.y) / 3;
        return 0.5 * ((v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x))
    };
    b2EdgeShape.prototype.GetLength = function() {
        return this.m_length
    };
    b2EdgeShape.prototype.GetVertex1 = function() {
        return this.m_v1
    };
    b2EdgeShape.prototype.GetVertex2 = function() {
        return this.m_v2
    };
    b2EdgeShape.prototype.GetCoreVertex1 = function() {
        return this.m_coreV1
    };
    b2EdgeShape.prototype.GetCoreVertex2 = function() {
        return this.m_coreV2
    };
    b2EdgeShape.prototype.GetNormalVector = function() {
        return this.m_normal
    };
    b2EdgeShape.prototype.GetDirectionVector = function() {
        return this.m_direction
    };
    b2EdgeShape.prototype.GetCorner1Vector = function() {
        return this.m_cornerDir1
    };
    b2EdgeShape.prototype.GetCorner2Vector = function() {
        return this.m_cornerDir2
    };
    b2EdgeShape.prototype.Corner1IsConvex = function() {
        return this.m_cornerConvex1
    };
    b2EdgeShape.prototype.Corner2IsConvex = function() {
        return this.m_cornerConvex2
    };
    b2EdgeShape.prototype.GetFirstVertex = function(xf) {
        var tMat = xf.R;
        return new b2Vec2(xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y), xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y))
    };
    b2EdgeShape.prototype.GetNextEdge = function() {
        return this.m_nextEdge
    };
    b2EdgeShape.prototype.GetPrevEdge = function() {
        return this.m_prevEdge
    };
    b2EdgeShape.prototype.Support = function(xf, dX, dY) {
        if (dX === undefined) dX = 0;
        if (dY === undefined) dY = 0;
        var tMat = xf.R;
        var v1X = xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y);
        var v1Y = xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y);
        var v2X = xf.position.x + (tMat.col1.x * this.m_coreV2.x + tMat.col2.x * this.m_coreV2.y);
        var v2Y = xf.position.y + (tMat.col1.y * this.m_coreV2.x + tMat.col2.y * this.m_coreV2.y);
        if (v1X * dX + v1Y * dY > v2X * dX + v2Y * dY) {
            this.s_supportVec.x = v1X;
            this.s_supportVec.y = v1Y
        } else {
            this.s_supportVec.x = v2X;
            this.s_supportVec.y = v2Y
        }
        return this.s_supportVec
    };
    b2EdgeShape.prototype.b2EdgeShape = function(v1, v2) {
        this.__super.b2Shape.call(this);
        this.m_type = b2Shape.e_edgeShape;
        this.m_prevEdge = null;
        this.m_nextEdge = null;
        this.m_v1 = v1;
        this.m_v2 = v2;
        this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
        this.m_length = this.m_direction.Normalize();
        this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
        this.m_coreV1.Set(-b2Settings.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -b2Settings.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
        this.m_coreV2.Set(-b2Settings.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -b2Settings.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
        this.m_cornerDir1 = this.m_normal;
        this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
    };
    b2EdgeShape.prototype.SetPrevEdge = function(edge, core, cornerDir, convex) {
        this.m_prevEdge = edge;
        this.m_coreV1 = core;
        this.m_cornerDir1 = cornerDir;
        this.m_cornerConvex1 = convex
    };
    b2EdgeShape.prototype.SetNextEdge = function(edge, core, cornerDir, convex) {
        this.m_nextEdge = edge;
        this.m_coreV2 = core;
        this.m_cornerDir2 = cornerDir;
        this.m_cornerConvex2 = convex
    };
    b2MassData.b2MassData = function() {
        this.mass = 0;
        this.center = new b2Vec2(0, 0);
        this.I = 0
    };
    Box2D.inherit(b2PolygonShape, Box2D.Collision.Shapes.b2Shape);
    b2PolygonShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    b2PolygonShape.b2PolygonShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
    };
    b2PolygonShape.prototype.Copy = function() {
        var s = new b2PolygonShape;
        s.Set(this);
        return s
    };
    b2PolygonShape.prototype.Set = function(other) {
        this.__super.Set.call(this, other);
        if (Box2D.is(other, b2PolygonShape)) {
            var other2 = other instanceof b2PolygonShape ? other : null;
            this.m_centroid.SetV(other2.m_centroid);
            this.m_vertexCount = other2.m_vertexCount;
            this.Reserve(this.m_vertexCount);
            for (var i = 0; i < this.m_vertexCount; i++) {
                this.m_vertices[i].SetV(other2.m_vertices[i]);
                this.m_normals[i].SetV(other2.m_normals[i])
            }
        }
    };
    b2PolygonShape.prototype.SetAsArray = function(vertices, vertexCount) {
        if (vertexCount === undefined) vertexCount = 0;
        var v = new Vector;
        var i = 0,
            tVec;
        for (i = 0; i < vertices.length; ++i) {
            tVec = vertices[i];
            v.push(tVec)
        }
        this.SetAsVector(v, vertexCount)
    };
    b2PolygonShape.AsArray = function(vertices, vertexCount) {
        if (vertexCount === undefined) vertexCount = 0;
        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsArray(vertices, vertexCount);
        return polygonShape
    };
    b2PolygonShape.prototype.SetAsVector = function(vertices, vertexCount) {
        if (vertexCount === undefined) vertexCount = 0;
        if (vertexCount == 0) vertexCount = vertices.length;
        b2Settings.b2Assert(2 <= vertexCount);
        this.m_vertexCount = vertexCount;
        this.Reserve(vertexCount);
        var i = 0;
        for (i = 0; i < this.m_vertexCount; i++) this.m_vertices[i].SetV(vertices[i]);
        for (i = 0; i < this.m_vertexCount; ++i) {
            var i1 = parseInt(i);
            var i2 = parseInt(i + 1 < this.m_vertexCount ? i + 1 : 0);
            var edge = b2Math.SubtractVV(this.m_vertices[i2], this.m_vertices[i1]);
            b2Settings.b2Assert(edge.LengthSquared() > Number.MIN_VALUE);
            this.m_normals[i].SetV(b2Math.CrossVF(edge, 1));
            this.m_normals[i].Normalize()
        }
        this.m_centroid = b2PolygonShape.ComputeCentroid(this.m_vertices, this.m_vertexCount)
    };
    b2PolygonShape.AsVector = function(vertices, vertexCount) {
        if (vertexCount === undefined) vertexCount = 0;
        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsVector(vertices, vertexCount);
        return polygonShape
    };
    b2PolygonShape.prototype.SetAsBox = function(hx, hy) {
        if (hx === undefined) hx = 0;
        if (hy === undefined) hy = 0;
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-hx, -hy);
        this.m_vertices[1].Set(hx, -hy);
        this.m_vertices[2].Set(hx, hy);
        this.m_vertices[3].Set(-hx, hy);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1, 0);
        this.m_centroid.SetZero()
    };
    b2PolygonShape.AsBox = function(hx, hy) {
        if (hx === undefined) hx = 0;
        if (hy === undefined) hy = 0;
        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsBox(hx, hy);
        return polygonShape
    };
    b2PolygonShape.prototype.SetAsOrientedBox = function(hx, hy, center, angle) {
        if (hx === undefined) hx = 0;
        if (hy === undefined) hy = 0;
        if (center === undefined) center = null;
        if (angle === undefined) angle = 0;
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-hx, -hy);
        this.m_vertices[1].Set(hx, -hy);
        this.m_vertices[2].Set(hx, hy);
        this.m_vertices[3].Set(-hx, hy);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1, 0);
        this.m_centroid = center;
        var xf = new b2Transform;
        xf.position = center;
        xf.R.Set(angle);
        for (var i = 0; i < this.m_vertexCount; ++i) {
            this.m_vertices[i] = b2Math.MulX(xf, this.m_vertices[i]);
            this.m_normals[i] = b2Math.MulMV(xf.R, this.m_normals[i])
        }
    };
    b2PolygonShape.AsOrientedBox = function(hx, hy, center, angle) {
        if (hx === undefined) hx = 0;
        if (hy === undefined) hy = 0;
        if (center === undefined) center = null;
        if (angle === undefined) angle = 0;
        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsOrientedBox(hx, hy, center, angle);
        return polygonShape
    };
    b2PolygonShape.prototype.SetAsEdge = function(v1, v2) {
        this.m_vertexCount = 2;
        this.Reserve(2);
        this.m_vertices[0].SetV(v1);
        this.m_vertices[1].SetV(v2);
        this.m_centroid.x = 0.5 * (v1.x + v2.x);
        this.m_centroid.y = 0.5 * (v1.y + v2.y);
        this.m_normals[0] = b2Math.CrossVF(b2Math.SubtractVV(v2, v1), 1);
        this.m_normals[0].Normalize();
        this.m_normals[1].x = -this.m_normals[0].x;
        this.m_normals[1].y = -this.m_normals[0].y
    };
    b2PolygonShape.AsEdge = function(v1, v2) {
        var polygonShape = new b2PolygonShape;
        polygonShape.SetAsEdge(v1, v2);
        return polygonShape
    };
    b2PolygonShape.prototype.TestPoint = function(xf, p) {
        var tVec;
        var tMat = xf.R;
        var tX = p.x - xf.position.x;
        var tY = p.y - xf.position.y;
        var pLocalX = tX * tMat.col1.x + tY * tMat.col1.y;
        var pLocalY = tX * tMat.col2.x + tY * tMat.col2.y;
        for (var i = 0; i < this.m_vertexCount; ++i) {
            tVec = this.m_vertices[i];
            tX = pLocalX - tVec.x;
            tY = pLocalY - tVec.y;
            tVec = this.m_normals[i];
            var dot = tVec.x * tX + tVec.y * tY;
            if (dot > 0) return false
        }
        return true
    };
    b2PolygonShape.prototype.RayCast = function(output, input, transform) {
        var lower = 0;
        var upper = input.maxFraction;
        var tX = 0;
        var tY = 0;
        var tMat;
        var tVec;
        tX = input.p1.x - transform.position.x;
        tY = input.p1.y - transform.position.y;
        tMat = transform.R;
        var p1X = tX * tMat.col1.x + tY * tMat.col1.y;
        var p1Y = tX * tMat.col2.x + tY * tMat.col2.y;
        tX = input.p2.x - transform.position.x;
        tY = input.p2.y - transform.position.y;
        tMat = transform.R;
        var p2X = tX * tMat.col1.x + tY * tMat.col1.y;
        var p2Y = tX * tMat.col2.x + tY * tMat.col2.y;
        var dX = p2X - p1X;
        var dY = p2Y - p1Y;
        var index = parseInt(-1);
        for (var i = 0; i < this.m_vertexCount; ++i) {
            tVec = this.m_vertices[i];
            tX = tVec.x - p1X;
            tY = tVec.y - p1Y;
            tVec = this.m_normals[i];
            var numerator = tVec.x * tX + tVec.y * tY;
            var denominator = tVec.x * dX + tVec.y * dY;
            if (denominator == 0) {
                if (numerator < 0) return false
            } else if (denominator < 0 && numerator < lower * denominator) {
                lower = numerator / denominator;
                index = i
            } else if (denominator > 0 && numerator < upper * denominator) upper = numerator / denominator;
            if (upper < lower - Number.MIN_VALUE) return false
        }
        if (index >= 0) {
            output.fraction = lower;
            tMat = transform.R;
            tVec = this.m_normals[index];
            output.normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            output.normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            return true
        }
        return false
    };
    b2PolygonShape.prototype.ComputeAABB = function(aabb, xf) {
        var tMat = xf.R;
        var tVec = this.m_vertices[0];
        var lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        var lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        var upperX = lowerX;
        var upperY = lowerY;
        for (var i = 1; i < this.m_vertexCount; ++i) {
            tVec = this.m_vertices[i];
            var vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            var vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            lowerX = lowerX < vX ? lowerX : vX;
            lowerY = lowerY < vY ? lowerY : vY;
            upperX = upperX > vX ? upperX : vX;
            upperY = upperY > vY ? upperY : vY
        }
        aabb.lowerBound.x = lowerX - this.m_radius;
        aabb.lowerBound.y = lowerY - this.m_radius;
        aabb.upperBound.x = upperX + this.m_radius;
        aabb.upperBound.y = upperY + this.m_radius
    };
    b2PolygonShape.prototype.ComputeMass = function(massData, density) {
        if (density === undefined) density = 0;
        if (this.m_vertexCount == 2) {
            massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
            massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
            massData.mass = 0;
            massData.I = 0;
            return
        }
        var centerX = 0;
        var centerY = 0;
        var area = 0;
        var I = 0;
        var p1X = 0;
        var p1Y = 0;
        var k_inv3 = 1 / 3;
        for (var i = 0; i < this.m_vertexCount; ++i) {
            var p2 = this.m_vertices[i];
            var p3 = i + 1 < this.m_vertexCount ? this.m_vertices[parseInt(i + 1)] : this.m_vertices[0];
            var e1X = p2.x - p1X;
            var e1Y = p2.y - p1Y;
            var e2X = p3.x - p1X;
            var e2Y = p3.y - p1Y;
            var D = e1X * e2Y - e1Y * e2X;
            var triangleArea = 0.5 * D;
            area += triangleArea;
            centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
            centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
            var px = p1X;
            var py = p1Y;
            var ex1 = e1X;
            var ey1 = e1Y;
            var ex2 = e2X;
            var ey2 = e2Y;
            var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
            var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;
            I += D * (intx2 + inty2)
        }
        massData.mass = density * area;
        centerX *= 1 / area;
        centerY *= 1 / area;
        massData.center.Set(centerX, centerY);
        massData.I = density * I
    };
    b2PolygonShape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        var normalL = b2Math.MulTMV(xf.R, normal);
        var offsetL = offset - b2Math.Dot(normal, xf.position);
        var depths = new Vector_a2j_Number;
        var diveCount = 0;
        var intoIndex = parseInt(-1);
        var outoIndex = parseInt(-1);
        var lastSubmerged = false;
        var i = 0;
        for (i = 0; i < this.m_vertexCount; ++i) {
            depths[i] = b2Math.Dot(normalL, this.m_vertices[i]) - offsetL;
            var isSubmerged = depths[i] < -Number.MIN_VALUE;
            if (i > 0) if (isSubmerged) {
                if (!lastSubmerged) {
                    intoIndex = i - 1;
                    diveCount++
                }
            } else if (lastSubmerged) {
                outoIndex = i - 1;
                diveCount++
            }
            lastSubmerged = isSubmerged
        }
        switch (diveCount) {
            case 0:
                if (lastSubmerged) {
                    var md = new b2MassData;
                    this.ComputeMass(md, 1);
                    c.SetV(b2Math.MulX(xf, md.center));
                    return md.mass
                } else return 0;
                break;
            case 1:
                if (intoIndex == -1) intoIndex = this.m_vertexCount - 1;
                else outoIndex = this.m_vertexCount - 1;
                break
        }
        var intoIndex2 = parseInt((intoIndex + 1) % this.m_vertexCount);
        var outoIndex2 = parseInt((outoIndex + 1) % this.m_vertexCount);
        var intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
        var outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
        var intoVec = new b2Vec2(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda, this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
        var outoVec = new b2Vec2(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda, this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
        var area = 0;
        var center = new b2Vec2;
        var p2 = this.m_vertices[intoIndex2];
        var p3;
        i = intoIndex2;
        while (i != outoIndex2) {
            i = (i + 1) % this.m_vertexCount;
            if (i == outoIndex2) p3 = outoVec;
            else p3 = this.m_vertices[i];
            var triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
            area += triangleArea;
            center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
            center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
            p2 = p3
        }
        center.Multiply(1 / area);
        c.SetV(b2Math.MulX(xf, center));
        return area
    };
    b2PolygonShape.prototype.GetVertexCount = function() {
        return this.m_vertexCount
    };
    b2PolygonShape.prototype.GetVertices = function() {
        return this.m_vertices
    };
    b2PolygonShape.prototype.GetNormals = function() {
        return this.m_normals
    };
    b2PolygonShape.prototype.GetSupport = function(d) {
        var bestIndex = 0;
        var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (var i = 1; i < this.m_vertexCount; ++i) {
            var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
            if (value > bestValue) {
                bestIndex = i;
                bestValue = value
            }
        }
        return bestIndex
    };
    b2PolygonShape.prototype.GetSupportVertex = function(d) {
        var bestIndex = 0;
        var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (var i = 1; i < this.m_vertexCount; ++i) {
            var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
            if (value > bestValue) {
                bestIndex = i;
                bestValue = value
            }
        }
        return this.m_vertices[bestIndex]
    };
    b2PolygonShape.prototype.Validate = function() {
        return false
    };
    b2PolygonShape.prototype.b2PolygonShape = function() {
        this.__super.b2Shape.call(this);
        this.m_type = b2Shape.e_polygonShape;
        this.m_centroid = new b2Vec2;
        this.m_vertices = new Vector;
        this.m_normals = new Vector
    };
    b2PolygonShape.prototype.Reserve = function(count) {
        if (count === undefined) count = 0;
        for (var i = parseInt(this.m_vertices.length); i < count; i++) {
            this.m_vertices[i] = new b2Vec2;
            this.m_normals[i] = new b2Vec2
        }
    };
    b2PolygonShape.ComputeCentroid = function(vs, count) {
        if (count === undefined) count = 0;
        var c = new b2Vec2;
        var area = 0;
        var p1X = 0;
        var p1Y = 0;
        var inv3 = 1 / 3;
        for (var i = 0; i < count; ++i) {
            var p2 = vs[i];
            var p3 = i + 1 < count ? vs[parseInt(i + 1)] : vs[0];
            var e1X = p2.x - p1X;
            var e1Y = p2.y - p1Y;
            var e2X = p3.x - p1X;
            var e2Y = p3.y - p1Y;
            var D = e1X * e2Y - e1Y * e2X;
            var triangleArea = 0.5 * D;
            area += triangleArea;
            c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
            c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y)
        }
        c.x *= 1 / area;
        c.y *= 1 / area;
        return c
    };
    b2PolygonShape.ComputeOBB = function(obb, vs, count) {
        if (count === undefined) count = 0;
        var i = 0;
        var p = new Vector(count + 1);
        for (i = 0; i < count; ++i) p[i] = vs[i];
        p[count] = p[0];
        var minArea = Number.MAX_VALUE;
        for (i = 1; i <= count; ++i) {
            var root = p[parseInt(i - 1)];
            var uxX = p[i].x - root.x;
            var uxY = p[i].y - root.y;
            var length = Math.sqrt(uxX * uxX + uxY * uxY);
            uxX /= length;
            uxY /= length;
            var uyX = -uxY;
            var uyY = uxX;
            var lowerX = Number.MAX_VALUE;
            var lowerY = Number.MAX_VALUE;
            var upperX = -Number.MAX_VALUE;
            var upperY = -Number.MAX_VALUE;
            for (var j = 0; j < count; ++j) {
                var dX = p[j].x - root.x;
                var dY = p[j].y - root.y;
                var rX = uxX * dX + uxY * dY;
                var rY = uyX * dX + uyY * dY;
                if (rX < lowerX) lowerX = rX;
                if (rY < lowerY) lowerY = rY;
                if (rX > upperX) upperX = rX;
                if (rY > upperY) upperY = rY
            }
            var area = (upperX - lowerX) * (upperY - lowerY);
            if (area < 0.95 * minArea) {
                minArea = area;
                obb.R.col1.x = uxX;
                obb.R.col1.y = uxY;
                obb.R.col2.x = uyX;
                obb.R.col2.y = uyY;
                var centerX = 0.5 * (lowerX + upperX);
                var centerY = 0.5 * (lowerY + upperY);
                var tMat = obb.R;
                obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
                obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
                obb.extents.x = 0.5 * (upperX - lowerX);
                obb.extents.y = 0.5 * (upperY - lowerY)
            }
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.b2PolygonShape.s_mat = new b2Mat22
    });
    b2Shape.b2Shape = function() {};
    b2Shape.prototype.Copy = function() {
        return null
    };
    b2Shape.prototype.Set = function(other) {
        this.m_radius = other.m_radius
    };
    b2Shape.prototype.GetType = function() {
        return this.m_type
    };
    b2Shape.prototype.TestPoint = function(xf, p) {
        return false
    };
    b2Shape.prototype.RayCast = function(output, input, transform) {
        return false
    };
    b2Shape.prototype.ComputeAABB = function(aabb, xf) {};
    b2Shape.prototype.ComputeMass = function(massData, density) {
        if (density === undefined) density = 0
    };
    b2Shape.prototype.ComputeSubmergedArea = function(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        return 0
    };
    b2Shape.TestOverlap = function(shape1, transform1, shape2, transform2) {
        var input = new b2DistanceInput;
        input.proxyA = new b2DistanceProxy;
        input.proxyA.Set(shape1);
        input.proxyB = new b2DistanceProxy;
        input.proxyB.Set(shape2);
        input.transformA = transform1;
        input.transformB = transform2;
        input.useRadii = true;
        var simplexCache = new b2SimplexCache;
        simplexCache.count = 0;
        var output = new b2DistanceOutput;
        b2Distance.Distance(output, simplexCache, input);
        return output.distance < 10 * Number.MIN_VALUE
    };
    b2Shape.prototype.b2Shape = function() {
        this.m_type = b2Shape.e_unknownShape;
        this.m_radius = b2Settings.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.b2Shape.e_unknownShape = parseInt(-1);
        Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
        Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
        Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
        Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
        Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
        Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
        Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = parseInt(-1)
    })
})();
(function() {
    var b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3;
    b2Color.b2Color = function() {
        this._r = 0;
        this._g = 0;
        this._b = 0
    };
    b2Color.prototype.b2Color = function(rr, gg, bb) {
        if (rr === undefined) rr = 0;
        if (gg === undefined) gg = 0;
        if (bb === undefined) bb = 0;
        this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0, 1));
        this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0, 1));
        this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0, 1))
    };
    b2Color.prototype.Set = function(rr, gg, bb) {
        if (rr === undefined) rr = 0;
        if (gg === undefined) gg = 0;
        if (bb === undefined) bb = 0;
        this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0, 1));
        this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0, 1));
        this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0, 1))
    };
    Object.defineProperty(b2Color.prototype, "r", {
        enumerable: false,
        configurable: true,
        set: function(rr) {
            if (rr === undefined) rr = 0;
            this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0, 1))
        }
    });
    Object.defineProperty(b2Color.prototype, "g", {
        enumerable: false,
        configurable: true,
        set: function(gg) {
            if (gg === undefined) gg = 0;
            this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0, 1))
        }
    });
    Object.defineProperty(b2Color.prototype, "b", {
        enumerable: false,
        configurable: true,
        set: function(bb) {
            if (bb === undefined) bb = 0;
            this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0, 1))
        }
    });
    Object.defineProperty(b2Color.prototype, "color", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this._r << 16 | this._g << 8 | this._b
        }
    });
    b2Settings.b2Settings = function() {};
    b2Settings.b2MixFriction = function(friction1, friction2) {
        if (friction1 === undefined) friction1 = 0;
        if (friction2 === undefined) friction2 = 0;
        return Math.sqrt(friction1 * friction2)
    };
    b2Settings.b2MixRestitution = function(restitution1, restitution2) {
        if (restitution1 === undefined) restitution1 = 0;
        if (restitution2 === undefined) restitution2 = 0;
        return restitution1 > restitution2 ? restitution1 : restitution2
    };
    b2Settings.b2Assert = function(a) {
        if (!a) throw "Assertion Failed";
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.b2Settings.VERSION = "2.1alpha";
        Box2D.Common.b2Settings.USHRT_MAX = 65535;
        Box2D.Common.b2Settings.b2_pi = Math.PI;
        Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
        Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
        Box2D.Common.b2Settings.b2_aabbMultiplier = 2;
        Box2D.Common.b2Settings.b2_polygonRadius = 2 * b2Settings.b2_linearSlop;
        Box2D.Common.b2Settings.b2_linearSlop = 0.005;
        Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * b2Settings.b2_pi;
        Box2D.Common.b2Settings.b2_toiSlop = 8 * b2Settings.b2_linearSlop;
        Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
        Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
        Box2D.Common.b2Settings.b2_velocityThreshold = 1;
        Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
        Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * b2Settings.b2_pi;
        Box2D.Common.b2Settings.b2_maxTranslation = 2;
        Box2D.Common.b2Settings.b2_maxTranslationSquared = b2Settings.b2_maxTranslation * b2Settings.b2_maxTranslation;
        Box2D.Common.b2Settings.b2_maxRotation = 0.5 * b2Settings.b2_pi;
        Box2D.Common.b2Settings.b2_maxRotationSquared = b2Settings.b2_maxRotation * b2Settings.b2_maxRotation;
        Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
        Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
        Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
        Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * b2Settings.b2_pi
    })
})();
(function() {
    var b2AABB = Box2D.Collision.b2AABB,
        b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3;
    b2Mat22.b2Mat22 = function() {
        this.col1 = new b2Vec2;
        this.col2 = new b2Vec2
    };
    b2Mat22.prototype.b2Mat22 = function() {
        this.SetIdentity()
    };
    b2Mat22.FromAngle = function(angle) {
        if (angle === undefined) angle = 0;
        var mat = new b2Mat22;
        mat.Set(angle);
        return mat
    };
    b2Mat22.FromVV = function(c1, c2) {
        var mat = new b2Mat22;
        mat.SetVV(c1, c2);
        return mat
    };
    b2Mat22.prototype.Set = function(angle) {
        if (angle === undefined) angle = 0;
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        this.col1.x = c;
        this.col2.x = -s;
        this.col1.y = s;
        this.col2.y = c
    };
    b2Mat22.prototype.SetVV = function(c1, c2) {
        this.col1.SetV(c1);
        this.col2.SetV(c2)
    };
    b2Mat22.prototype.Copy = function() {
        var mat = new b2Mat22;
        mat.SetM(this);
        return mat
    };
    b2Mat22.prototype.SetM = function(m) {
        this.col1.SetV(m.col1);
        this.col2.SetV(m.col2)
    };
    b2Mat22.prototype.AddM = function(m) {
        this.col1.x += m.col1.x;
        this.col1.y += m.col1.y;
        this.col2.x += m.col2.x;
        this.col2.y += m.col2.y
    };
    b2Mat22.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 1
    };
    b2Mat22.prototype.SetZero = function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 0
    };
    b2Mat22.prototype.GetAngle = function() {
        return Math.atan2(this.col1.y, this.col1.x)
    };
    b2Mat22.prototype.GetInverse = function(out) {
        var a = this.col1.x;
        var b = this.col2.x;
        var c = this.col1.y;
        var d = this.col2.y;
        var det = a * d - b * c;
        if (det != 0) det = 1 / det;
        out.col1.x = det * d;
        out.col2.x = -det * b;
        out.col1.y = -det * c;
        out.col2.y = det * a;
        return out
    };
    b2Mat22.prototype.Solve = function(out, bX, bY) {
        if (bX === undefined) bX = 0;
        if (bY === undefined) bY = 0;
        var a11 = this.col1.x;
        var a12 = this.col2.x;
        var a21 = this.col1.y;
        var a22 = this.col2.y;
        var det = a11 * a22 - a12 * a21;
        if (det != 0) det = 1 / det;
        out.x = det * (a22 * bX - a12 * bY);
        out.y = det * (a11 * bY - a21 * bX);
        return out
    };
    b2Mat22.prototype.Abs = function() {
        this.col1.Abs();
        this.col2.Abs()
    };
    b2Mat33.b2Mat33 = function() {
        this.col1 = new b2Vec3;
        this.col2 = new b2Vec3;
        this.col3 = new b2Vec3
    };
    b2Mat33.prototype.b2Mat33 = function(c1, c2, c3) {
        if (c1 === undefined) c1 = null;
        if (c2 === undefined) c2 = null;
        if (c3 === undefined) c3 = null;
        if (!c1 && (!c2 && !c3)) {
            this.col1.SetZero();
            this.col2.SetZero();
            this.col3.SetZero()
        } else {
            this.col1.SetV(c1);
            this.col2.SetV(c2);
            this.col3.SetV(c3)
        }
    };
    b2Mat33.prototype.SetVVV = function(c1, c2, c3) {
        this.col1.SetV(c1);
        this.col2.SetV(c2);
        this.col3.SetV(c3)
    };
    b2Mat33.prototype.Copy = function() {
        return new b2Mat33(this.col1, this.col2, this.col3)
    };
    b2Mat33.prototype.SetM = function(m) {
        this.col1.SetV(m.col1);
        this.col2.SetV(m.col2);
        this.col3.SetV(m.col3)
    };
    b2Mat33.prototype.AddM = function(m) {
        this.col1.x += m.col1.x;
        this.col1.y += m.col1.y;
        this.col1.z += m.col1.z;
        this.col2.x += m.col2.x;
        this.col2.y += m.col2.y;
        this.col2.z += m.col2.z;
        this.col3.x += m.col3.x;
        this.col3.y += m.col3.y;
        this.col3.z += m.col3.z
    };
    b2Mat33.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 1;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z = 1
    };
    b2Mat33.prototype.SetZero = function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 0;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z = 0
    };
    b2Mat33.prototype.Solve22 = function(out, bX, bY) {
        if (bX === undefined) bX = 0;
        if (bY === undefined) bY = 0;
        var a11 = this.col1.x;
        var a12 = this.col2.x;
        var a21 = this.col1.y;
        var a22 = this.col2.y;
        var det = a11 * a22 - a12 * a21;
        if (det != 0) det = 1 / det;
        out.x = det * (a22 * bX - a12 * bY);
        out.y = det * (a11 * bY - a21 * bX);
        return out
    };
    b2Mat33.prototype.Solve33 = function(out, bX, bY, bZ) {
        if (bX === undefined) bX = 0;
        if (bY === undefined) bY = 0;
        if (bZ === undefined) bZ = 0;
        var a11 = this.col1.x;
        var a21 = this.col1.y;
        var a31 = this.col1.z;
        var a12 = this.col2.x;
        var a22 = this.col2.y;
        var a32 = this.col2.z;
        var a13 = this.col3.x;
        var a23 = this.col3.y;
        var a33 = this.col3.z;
        var det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
        if (det != 0) det = 1 / det;
        out.x = det * (bX * (a22 * a33 - a32 * a23) + bY * (a32 * a13 - a12 * a33) + bZ * (a12 * a23 - a22 * a13));
        out.y = det * (a11 * (bY * a33 - bZ * a23) + a21 * (bZ * a13 - bX * a33) + a31 * (bX * a23 - bY * a13));
        out.z = det * (a11 * (a22 * bZ - a32 * bY) + a21 * (a32 * bX - a12 * bZ) + a31 * (a12 * bY - a22 * bX));
        return out
    };
    b2Math.b2Math = function() {};
    b2Math.IsValid = function(x) {
        if (x === undefined) x = 0;
        return isFinite(x)
    };
    b2Math.Dot = function(a, b) {
        return a.x * b.x + a.y * b.y
    };
    b2Math.CrossVV = function(a, b) {
        return a.x * b.y - a.y * b.x
    };
    b2Math.CrossVF = function(a, s) {
        if (s === undefined) s = 0;
        var v = new b2Vec2(s * a.y, -s * a.x);
        return v
    };
    b2Math.CrossFV = function(s, a) {
        if (s === undefined) s = 0;
        var v = new b2Vec2(-s * a.y, s * a.x);
        return v
    };
    b2Math.MulMV = function(A, v) {
        var u = new b2Vec2(A.col1.x * v.x + A.col2.x * v.y, A.col1.y * v.x + A.col2.y * v.y);
        return u
    };
    b2Math.MulTMV = function(A, v) {
        var u = new b2Vec2(b2Math.Dot(v, A.col1), b2Math.Dot(v, A.col2));
        return u
    };
    b2Math.MulX = function(T, v) {
        var a = b2Math.MulMV(T.R, v);
        a.x += T.position.x;
        a.y += T.position.y;
        return a
    };
    b2Math.MulXT = function(T, v) {
        var a = b2Math.SubtractVV(v, T.position);
        var tX = a.x * T.R.col1.x + a.y * T.R.col1.y;
        a.y = a.x * T.R.col2.x + a.y * T.R.col2.y;
        a.x = tX;
        return a
    };
    b2Math.AddVV = function(a, b) {
        var v = new b2Vec2(a.x + b.x, a.y + b.y);
        return v
    };
    b2Math.SubtractVV = function(a, b) {
        var v = new b2Vec2(a.x - b.x, a.y - b.y);
        return v
    };
    b2Math.Distance = function(a, b) {
        var cX = a.x - b.x;
        var cY = a.y - b.y;
        return Math.sqrt(cX * cX + cY * cY)
    };
    b2Math.DistanceSquared = function(a, b) {
        var cX = a.x - b.x;
        var cY = a.y - b.y;
        return cX * cX + cY * cY
    };
    b2Math.MulFV = function(s, a) {
        if (s === undefined) s = 0;
        var v = new b2Vec2(s * a.x, s * a.y);
        return v
    };
    b2Math.AddMM = function(A, B) {
        var C = b2Mat22.FromVV(b2Math.AddVV(A.col1, B.col1), b2Math.AddVV(A.col2, B.col2));
        return C
    };
    b2Math.MulMM = function(A, B) {
        var C = b2Mat22.FromVV(b2Math.MulMV(A, B.col1), b2Math.MulMV(A, B.col2));
        return C
    };
    b2Math.MulTMM = function(A, B) {
        var c1 = new b2Vec2(b2Math.Dot(A.col1, B.col1), b2Math.Dot(A.col2, B.col1));
        var c2 = new b2Vec2(b2Math.Dot(A.col1, B.col2), b2Math.Dot(A.col2, B.col2));
        var C = b2Mat22.FromVV(c1, c2);
        return C
    };
    b2Math.Abs = function(a) {
        if (a === undefined) a = 0;
        return a > 0 ? a : -a
    };
    b2Math.AbsV = function(a) {
        var b = new b2Vec2(b2Math.Abs(a.x), b2Math.Abs(a.y));
        return b
    };
    b2Math.AbsM = function(A) {
        var B = b2Mat22.FromVV(b2Math.AbsV(A.col1), b2Math.AbsV(A.col2));
        return B
    };
    b2Math.Min = function(a, b) {
        if (a === undefined) a = 0;
        if (b === undefined) b = 0;
        return a < b ? a : b
    };
    b2Math.MinV = function(a, b) {
        var c = new b2Vec2(b2Math.Min(a.x, b.x), b2Math.Min(a.y, b.y));
        return c
    };
    b2Math.Max = function(a, b) {
        if (a === undefined) a = 0;
        if (b === undefined) b = 0;
        return a > b ? a : b
    };
    b2Math.MaxV = function(a, b) {
        var c = new b2Vec2(b2Math.Max(a.x, b.x), b2Math.Max(a.y, b.y));
        return c
    };
    b2Math.Clamp = function(a, low, high) {
        if (a === undefined) a = 0;
        if (low === undefined) low = 0;
        if (high === undefined) high = 0;
        return a < low ? low : a > high ? high : a
    };
    b2Math.ClampV = function(a, low, high) {
        return b2Math.MaxV(low, b2Math.MinV(a, high))
    };
    b2Math.Swap = function(a, b) {
        var tmp = a[0];
        a[0] = b[0];
        b[0] = tmp
    };
    b2Math.Random = function() {
        return Math.random() * 2 - 1
    };
    b2Math.RandomRange = function(lo, hi) {
        if (lo === undefined) lo = 0;
        if (hi === undefined) hi = 0;
        var r = Math.random();
        r = (hi - lo) * r + lo;
        return r
    };
    b2Math.NextPowerOfTwo = function(x) {
        if (x === undefined) x = 0;
        x |= x >> 1 & 2147483647;
        x |= x >> 2 & 1073741823;
        x |= x >> 4 & 268435455;
        x |= x >> 8 & 16777215;
        x |= x >> 16 & 65535;
        return x + 1
    };
    b2Math.IsPowerOfTwo = function(x) {
        if (x === undefined) x = 0;
        var result = x > 0 && (x & x - 1) == 0;
        return result
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.Math.b2Math.b2Vec2_zero = new b2Vec2(0, 0);
        Box2D.Common.Math.b2Math.b2Mat22_identity = b2Mat22.FromVV(new b2Vec2(1, 0), new b2Vec2(0, 1));
        Box2D.Common.Math.b2Math.b2Transform_identity = new b2Transform(b2Math.b2Vec2_zero, b2Math.b2Mat22_identity)
    });
    b2Sweep.b2Sweep = function() {
        this.localCenter = new b2Vec2;
        this.c0 = new b2Vec2;
        this.c = new b2Vec2
    };
    b2Sweep.prototype.Set = function(other) {
        this.localCenter.SetV(other.localCenter);
        this.c0.SetV(other.c0);
        this.c.SetV(other.c);
        this.a0 = other.a0;
        this.a = other.a;
        this.t0 = other.t0
    };
    b2Sweep.prototype.Copy = function() {
        var copy = new b2Sweep;
        copy.localCenter.SetV(this.localCenter);
        copy.c0.SetV(this.c0);
        copy.c.SetV(this.c);
        copy.a0 = this.a0;
        copy.a = this.a;
        copy.t0 = this.t0;
        return copy
    };
    b2Sweep.prototype.GetTransform = function(xf, alpha) {
        if (alpha === undefined) alpha = 0;
        xf.position.x = (1 - alpha) * this.c0.x + alpha * this.c.x;
        xf.position.y = (1 - alpha) * this.c0.y + alpha * this.c.y;
        var angle = (1 - alpha) * this.a0 + alpha * this.a;
        xf.R.Set(angle);
        var tMat = xf.R;
        xf.position.x -= tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y;
        xf.position.y -= tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y
    };
    b2Sweep.prototype.Advance = function(t) {
        if (t === undefined) t = 0;
        if (this.t0 < t && 1 - this.t0 > Number.MIN_VALUE) {
            var alpha = (t - this.t0) / (1 - this.t0);
            this.c0.x = (1 - alpha) * this.c0.x + alpha * this.c.x;
            this.c0.y = (1 - alpha) * this.c0.y + alpha * this.c.y;
            this.a0 = (1 - alpha) * this.a0 + alpha * this.a;
            this.t0 = t
        }
    };
    b2Transform.b2Transform = function() {
        this.position = new b2Vec2;
        this.R = new b2Mat22
    };
    b2Transform.prototype.b2Transform = function(pos, r) {
        if (pos === undefined) pos = null;
        if (r === undefined) r = null;
        if (pos) {
            this.position.SetV(pos);
            this.R.SetM(r)
        }
    };
    b2Transform.prototype.Initialize = function(pos, r) {
        this.position.SetV(pos);
        this.R.SetM(r)
    };
    b2Transform.prototype.SetIdentity = function() {
        this.position.SetZero();
        this.R.SetIdentity()
    };
    b2Transform.prototype.Set = function(x) {
        this.position.SetV(x.position);
        this.R.SetM(x.R)
    };
    b2Transform.prototype.GetAngle = function() {
        return Math.atan2(this.R.col1.y, this.R.col1.x)
    };
    b2Vec2.b2Vec2 = function() {};
    b2Vec2.prototype.b2Vec2 = function(x_, y_) {
        if (x_ === undefined) x_ = 0;
        if (y_ === undefined) y_ = 0;
        this.x = x_;
        this.y = y_
    };
    b2Vec2.prototype.SetZero = function() {
        this.x = 0;
        this.y = 0
    };
    b2Vec2.prototype.Set = function(x_, y_) {
        if (x_ === undefined) x_ = 0;
        if (y_ === undefined) y_ = 0;
        this.x = x_;
        this.y = y_
    };
    b2Vec2.prototype.SetV = function(v) {
        this.x = v.x;
        this.y = v.y
    };
    b2Vec2.prototype.GetNegative = function() {
        return new b2Vec2(-this.x, -this.y)
    };
    b2Vec2.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y
    };
    b2Vec2.Make = function(x_, y_) {
        if (x_ === undefined) x_ = 0;
        if (y_ === undefined) y_ = 0;
        return new b2Vec2(x_, y_)
    };
    b2Vec2.prototype.Copy = function() {
        return new b2Vec2(this.x, this.y)
    };
    b2Vec2.prototype.Add = function(v) {
        this.x += v.x;
        this.y += v.y
    };
    b2Vec2.prototype.Subtract = function(v) {
        this.x -= v.x;
        this.y -= v.y
    };
    b2Vec2.prototype.Multiply = function(a) {
        if (a === undefined) a = 0;
        this.x *= a;
        this.y *= a
    };
    b2Vec2.prototype.MulM = function(A) {
        var tX = this.x;
        this.x = A.col1.x * tX + A.col2.x * this.y;
        this.y = A.col1.y * tX + A.col2.y * this.y
    };
    b2Vec2.prototype.MulTM = function(A) {
        var tX = b2Math.Dot(this, A.col1);
        this.y = b2Math.Dot(this, A.col2);
        this.x = tX
    };
    b2Vec2.prototype.CrossVF = function(s) {
        if (s === undefined) s = 0;
        var tX = this.x;
        this.x = s * this.y;
        this.y = -s * tX
    };
    b2Vec2.prototype.CrossFV = function(s) {
        if (s === undefined) s = 0;
        var tX = this.x;
        this.x = -s * this.y;
        this.y = s * tX
    };
    b2Vec2.prototype.MinV = function(b) {
        this.x = this.x < b.x ? this.x : b.x;
        this.y = this.y < b.y ? this.y : b.y
    };
    b2Vec2.prototype.MaxV = function(b) {
        this.x = this.x > b.x ? this.x : b.x;
        this.y = this.y > b.y ? this.y : b.y
    };
    b2Vec2.prototype.Abs = function() {
        if (this.x < 0) this.x = -this.x;
        if (this.y < 0) this.y = -this.y
    };
    b2Vec2.prototype.Length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    b2Vec2.prototype.LengthSquared = function() {
        return this.x * this.x + this.y * this.y
    };
    b2Vec2.prototype.Normalize = function() {
        var length = Math.sqrt(this.x * this.x + this.y * this.y);
        if (length < Number.MIN_VALUE) return 0;
        var invLength = 1 / length;
        this.x *= invLength;
        this.y *= invLength;
        return length
    };
    b2Vec2.prototype.IsValid = function() {
        return b2Math.IsValid(this.x) && b2Math.IsValid(this.y)
    };
    b2Vec3.b2Vec3 = function() {};
    b2Vec3.prototype.b2Vec3 = function(x, y, z) {
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;
        if (z === undefined) z = 0;
        this.x = x;
        this.y = y;
        this.z = z
    };
    b2Vec3.prototype.SetZero = function() {
        this.x = this.y = this.z = 0
    };
    b2Vec3.prototype.Set = function(x, y, z) {
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;
        if (z === undefined) z = 0;
        this.x = x;
        this.y = y;
        this.z = z
    };
    b2Vec3.prototype.SetV = function(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z
    };
    b2Vec3.prototype.GetNegative = function() {
        return new b2Vec3(-this.x, -this.y, -this.z)
    };
    b2Vec3.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z
    };
    b2Vec3.prototype.Copy = function() {
        return new b2Vec3(this.x, this.y, this.z)
    };
    b2Vec3.prototype.Add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z
    };
    b2Vec3.prototype.Subtract = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z
    };
    b2Vec3.prototype.Multiply = function(a) {
        if (a === undefined) a = 0;
        this.x *= a;
        this.y *= a;
        this.z *= a
    }
})();
(function() {
    var b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3,
        b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2AABB = Box2D.Collision.b2AABB,
        b2Bound = Box2D.Collision.b2Bound,
        b2BoundValues = Box2D.Collision.b2BoundValues,
        b2Collision = Box2D.Collision.b2Collision,
        b2ContactID = Box2D.Collision.b2ContactID,
        b2ContactPoint = Box2D.Collision.b2ContactPoint,
        b2Distance = Box2D.Collision.b2Distance,
        b2DistanceInput = Box2D.Collision.b2DistanceInput,
        b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
        b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
        b2DynamicTree = Box2D.Collision.b2DynamicTree,
        b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
        b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
        b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
        b2Manifold = Box2D.Collision.b2Manifold,
        b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
        b2Point = Box2D.Collision.b2Point,
        b2RayCastInput = Box2D.Collision.b2RayCastInput,
        b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
        b2Segment = Box2D.Collision.b2Segment,
        b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
        b2Simplex = Box2D.Collision.b2Simplex,
        b2SimplexCache = Box2D.Collision.b2SimplexCache,
        b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
        b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
        b2TOIInput = Box2D.Collision.b2TOIInput,
        b2WorldManifold = Box2D.Collision.b2WorldManifold,
        ClipVertex = Box2D.Collision.ClipVertex,
        Features = Box2D.Collision.Features,
        IBroadPhase = Box2D.Collision.IBroadPhase,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
        b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2Shape = Box2D.Collision.Shapes.b2Shape,
        b2Body = Box2D.Dynamics.b2Body,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
        b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
        b2ContactListener = Box2D.Dynamics.b2ContactListener,
        b2ContactManager = Box2D.Dynamics.b2ContactManager,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
        b2FilterData = Box2D.Dynamics.b2FilterData,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Island = Box2D.Dynamics.b2Island,
        b2TimeStep = Box2D.Dynamics.b2TimeStep,
        b2World = Box2D.Dynamics.b2World,
        b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
        b2Contact = Box2D.Dynamics.Contacts.b2Contact,
        b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
        b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
        b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
        b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
        b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
        b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
        b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
        b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
        b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
        b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
        b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
        b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
        b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
        b2Controller = Box2D.Dynamics.Controllers.b2Controller,
        b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
        b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
        b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
        b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
        b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
        b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
        b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
        b2Joint = Box2D.Dynamics.Joints.b2Joint,
        b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
        b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
        b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
        b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
        b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
        b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
        b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
        b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
        b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
        b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
        b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
        b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
    b2Body.b2Body = function() {
        this.m_xf = new b2Transform;
        this.m_sweep = new b2Sweep;
        this.m_linearVelocity = new b2Vec2;
        this.m_force = new b2Vec2
    };
    b2Body.prototype.connectEdges = function(s1, s2, angle1) {
        if (angle1 === undefined) angle1 = 0;
        var angle2 = Math.atan2(s2.GetDirectionVector().y, s2.GetDirectionVector().x);
        var coreOffset = Math.tan((angle2 - angle1) * 0.5);
        var core = b2Math.MulFV(coreOffset, s2.GetDirectionVector());
        core = b2Math.SubtractVV(core, s2.GetNormalVector());
        core = b2Math.MulFV(b2Settings.b2_toiSlop, core);
        core = b2Math.AddVV(core, s2.GetVertex1());
        var cornerDir = b2Math.AddVV(s1.GetDirectionVector(), s2.GetDirectionVector());
        cornerDir.Normalize();
        var convex = b2Math.Dot(s1.GetDirectionVector(), s2.GetNormalVector()) > 0;
        s1.SetNextEdge(s2, core, cornerDir, convex);
        s2.SetPrevEdge(s1, core, cornerDir, convex);
        return angle2
    };
    b2Body.prototype.CreateFixture = function(def) {
        if (this.m_world.IsLocked() == true) return null;
        var fixture = new b2Fixture;
        fixture.Create(this, this.m_xf, def);
        if (this.m_flags & b2Body.e_activeFlag) {
            var broadPhase = this.m_world.m_contactManager.m_broadPhase;
            fixture.CreateProxy(broadPhase, this.m_xf)
        }
        fixture.m_next = this.m_fixtureList;
        this.m_fixtureList = fixture;
        ++this.m_fixtureCount;
        fixture.m_body = this;
        if (fixture.m_density > 0) this.ResetMassData();
        this.m_world.m_flags |= b2World.e_newFixture;
        return fixture
    };
    b2Body.prototype.CreateFixture2 = function(shape, density) {
        if (density === undefined) density = 0;
        var def = new b2FixtureDef;
        def.shape = shape;
        def.density = density;
        return this.CreateFixture(def)
    };
    b2Body.prototype.DestroyFixture = function(fixture) {
        if (this.m_world.IsLocked() == true) return;
        var node = this.m_fixtureList;
        var ppF = null;
        var found = false;
        while (node != null) {
            if (node == fixture) {
                if (ppF) ppF.m_next = fixture.m_next;
                else this.m_fixtureList = fixture.m_next;
                found = true;
                break
            }
            ppF = node;
            node = node.m_next
        }
        var edge = this.m_contactList;
        while (edge) {
            var c = edge.contact;
            edge = edge.next;
            var fixtureA = c.GetFixtureA();
            var fixtureB = c.GetFixtureB();
            if (fixture == fixtureA || fixture == fixtureB) this.m_world.m_contactManager.Destroy(c)
        }
        if (this.m_flags & b2Body.e_activeFlag) {
            var broadPhase = this.m_world.m_contactManager.m_broadPhase;
            fixture.DestroyProxy(broadPhase)
        } else;
        fixture.Destroy();
        fixture.m_body = null;
        fixture.m_next = null;
        --this.m_fixtureCount;
        this.ResetMassData()
    };
    b2Body.prototype.SetPositionAndAngle = function(position, angle) {
        if (angle === undefined) angle = 0;
        var f;
        if (this.m_world.IsLocked() == true) return;
        this.m_xf.R.Set(angle);
        this.m_xf.position.SetV(position);
        var tMat = this.m_xf.R;
        var tVec = this.m_sweep.localCenter;
        this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        this.m_sweep.c.x += this.m_xf.position.x;
        this.m_sweep.c.y += this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_sweep.a0 = this.m_sweep.a = angle;
        var broadPhase = this.m_world.m_contactManager.m_broadPhase;
        for (f = this.m_fixtureList; f; f = f.m_next) f.Synchronize(broadPhase, this.m_xf, this.m_xf);
        this.m_world.m_contactManager.FindNewContacts()
    };
    b2Body.prototype.SetTransform = function(xf) {
        this.SetPositionAndAngle(xf.position, xf.GetAngle())
    };
    b2Body.prototype.GetTransform = function() {
        return this.m_xf
    };
    b2Body.prototype.GetPosition = function() {
        return this.m_xf.position
    };
    b2Body.prototype.SetPosition = function(position) {
        this.SetPositionAndAngle(position, this.GetAngle())
    };
    b2Body.prototype.GetAngle = function() {
        return this.m_sweep.a
    };
    b2Body.prototype.SetAngle = function(angle) {
        if (angle === undefined) angle = 0;
        this.SetPositionAndAngle(this.GetPosition(), angle)
    };
    b2Body.prototype.GetWorldCenter = function() {
        return this.m_sweep.c
    };
    b2Body.prototype.GetLocalCenter = function() {
        return this.m_sweep.localCenter
    };
    b2Body.prototype.SetLinearVelocity = function(v) {
        if (this.m_type == b2Body.b2_staticBody) return;
        this.m_linearVelocity.SetV(v)
    };
    b2Body.prototype.GetLinearVelocity = function() {
        return this.m_linearVelocity
    };
    b2Body.prototype.SetAngularVelocity = function(omega) {
        if (omega === undefined) omega = 0;
        if (this.m_type == b2Body.b2_staticBody) return;
        this.m_angularVelocity = omega
    };
    b2Body.prototype.GetAngularVelocity = function() {
        return this.m_angularVelocity
    };
    b2Body.prototype.GetDefinition = function() {
        var bd = new b2BodyDef;
        bd.type = this.GetType();
        bd.allowSleep = (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
        bd.angle = this.GetAngle();
        bd.angularDamping = this.m_angularDamping;
        bd.angularVelocity = this.m_angularVelocity;
        bd.fixedRotation = (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
        bd.bullet = (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
        bd.awake = (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
        bd.linearDamping = this.m_linearDamping;
        bd.linearVelocity.SetV(this.GetLinearVelocity());
        bd.position = this.GetPosition();
        bd.userData = this.GetUserData();
        return bd
    };
    b2Body.prototype.ApplyForce = function(force, point) {
        if (this.m_type != b2Body.b2_dynamicBody) return;
        if (this.IsAwake() == false) this.SetAwake(true);
        this.m_force.x += force.x;
        this.m_force.y += force.y;
        this.m_torque += (point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x
    };
    b2Body.prototype.ApplyTorque = function(torque) {
        if (torque === undefined) torque = 0;
        if (this.m_type != b2Body.b2_dynamicBody) return;
        if (this.IsAwake() == false) this.SetAwake(true);
        this.m_torque += torque
    };
    b2Body.prototype.ApplyImpulse = function(impulse, point) {
        if (this.m_type != b2Body.b2_dynamicBody) return;
        if (this.IsAwake() == false) this.SetAwake(true);
        this.m_linearVelocity.x += this.m_invMass * impulse.x;
        this.m_linearVelocity.y += this.m_invMass * impulse.y;
        this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x)
    };
    b2Body.prototype.Split = function(callback) {
        var linearVelocity = this.GetLinearVelocity().Copy();
        var angularVelocity = this.GetAngularVelocity();
        var center = this.GetWorldCenter();
        var body1 = this;
        var body2 = this.m_world.CreateBody(this.GetDefinition());
        var prev;
        for (var f = body1.m_fixtureList; f;) if (callback(f)) {
            var next = f.m_next;
            if (prev) prev.m_next = next;
            else body1.m_fixtureList = next;
            body1.m_fixtureCount--;
            f.m_next = body2.m_fixtureList;
            body2.m_fixtureList = f;
            body2.m_fixtureCount++;
            f.m_body = body2;
            f = next
        } else {
            prev = f;
            f = f.m_next
        }
        body1.ResetMassData();
        body2.ResetMassData();
        var center1 = body1.GetWorldCenter();
        var center2 = body2.GetWorldCenter();
        var velocity1 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center1, center)));
        var velocity2 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center2, center)));
        body1.SetLinearVelocity(velocity1);
        body2.SetLinearVelocity(velocity2);
        body1.SetAngularVelocity(angularVelocity);
        body2.SetAngularVelocity(angularVelocity);
        body1.SynchronizeFixtures();
        body2.SynchronizeFixtures();
        return body2
    };
    b2Body.prototype.Merge = function(other) {
        var f;
        for (f = other.m_fixtureList; f;) {
            var next = f.m_next;
            other.m_fixtureCount--;
            f.m_next = this.m_fixtureList;
            this.m_fixtureList = f;
            this.m_fixtureCount++;
            f.m_body = body2;
            f = next
        }
        body1.m_fixtureCount = 0;
        var body1 = this;
        var body2 = other;
        var center1 = body1.GetWorldCenter();
        var center2 = body2.GetWorldCenter();
        var velocity1 = body1.GetLinearVelocity().Copy();
        var velocity2 = body2.GetLinearVelocity().Copy();
        var angular1 = body1.GetAngularVelocity();
        var angular = body2.GetAngularVelocity();
        body1.ResetMassData();
        this.SynchronizeFixtures()
    };
    b2Body.prototype.GetMass = function() {
        return this.m_mass
    };
    b2Body.prototype.GetInertia = function() {
        return this.m_I
    };
    b2Body.prototype.GetMassData = function(data) {
        data.mass = this.m_mass;
        data.I = this.m_I;
        data.center.SetV(this.m_sweep.localCenter)
    };
    b2Body.prototype.SetMassData = function(massData) {
        b2Settings.b2Assert(this.m_world.IsLocked() == false);
        if (this.m_world.IsLocked() == true) return;
        if (this.m_type != b2Body.b2_dynamicBody) return;
        this.m_invMass = 0;
        this.m_I = 0;
        this.m_invI = 0;
        this.m_mass = massData.mass;
        if (this.m_mass <= 0) this.m_mass = 1;
        this.m_invMass = 1 / this.m_mass;
        if (massData.I > 0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
            this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
            this.m_invI = 1 / this.m_I
        }
        var oldCenter = this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(massData.center);
        this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
        this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - oldCenter.x)
    };
    b2Body.prototype.ResetMassData = function() {
        this.m_mass = 0;
        this.m_invMass = 0;
        this.m_I = 0;
        this.m_invI = 0;
        this.m_sweep.localCenter.SetZero();
        if (this.m_type == b2Body.b2_staticBody || this.m_type == b2Body.b2_kinematicBody) return;
        var center = b2Vec2.Make(0, 0);
        for (var f = this.m_fixtureList; f; f = f.m_next) {
            if (f.m_density == 0) continue;
            var massData = f.GetMassData();
            this.m_mass += massData.mass;
            center.x += massData.center.x * massData.mass;
            center.y += massData.center.y * massData.mass;
            this.m_I += massData.I
        }
        if (this.m_mass > 0) {
            this.m_invMass = 1 / this.m_mass;
            center.x *= this.m_invMass;
            center.y *= this.m_invMass
        } else {
            this.m_mass = 1;
            this.m_invMass = 1
        }
        if (this.m_I > 0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
            this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
            this.m_I *= this.m_inertiaScale;
            b2Settings.b2Assert(this.m_I > 0);
            this.m_invI = 1 / this.m_I
        } else {
            this.m_I = 0;
            this.m_invI = 0
        }
        var oldCenter = this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(center);
        this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - oldCenter.y);
        this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - oldCenter.x)
    };
    b2Body.prototype.GetWorldPoint = function(localPoint) {
        var A = this.m_xf.R;
        var u = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
        u.x += this.m_xf.position.x;
        u.y += this.m_xf.position.y;
        return u
    };
    b2Body.prototype.GetWorldVector = function(localVector) {
        return b2Math.MulMV(this.m_xf.R, localVector)
    };
    b2Body.prototype.GetLocalPoint = function(worldPoint) {
        return b2Math.MulXT(this.m_xf, worldPoint)
    };
    b2Body.prototype.GetLocalVector = function(worldVector) {
        return b2Math.MulTMV(this.m_xf.R, worldVector)
    };
    b2Body.prototype.GetLinearVelocityFromWorldPoint = function(worldPoint) {
        return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x))
    };
    b2Body.prototype.GetLinearVelocityFromLocalPoint = function(localPoint) {
        var A = this.m_xf.R;
        var worldPoint = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
        worldPoint.x += this.m_xf.position.x;
        worldPoint.y += this.m_xf.position.y;
        return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x))
    };
    b2Body.prototype.GetLinearDamping = function() {
        return this.m_linearDamping
    };
    b2Body.prototype.SetLinearDamping = function(linearDamping) {
        if (linearDamping === undefined) linearDamping = 0;
        this.m_linearDamping = linearDamping
    };
    b2Body.prototype.GetAngularDamping = function() {
        return this.m_angularDamping
    };
    b2Body.prototype.SetAngularDamping = function(angularDamping) {
        if (angularDamping === undefined) angularDamping = 0;
        this.m_angularDamping = angularDamping
    };
    b2Body.prototype.SetType = function(type) {
        if (type === undefined) type = 0;
        if (this.m_type == type) return;
        this.m_type = type;
        this.ResetMassData();
        if (this.m_type == b2Body.b2_staticBody) {
            this.m_linearVelocity.SetZero();
            this.m_angularVelocity = 0
        }
        this.SetAwake(true);
        this.m_force.SetZero();
        this.m_torque = 0;
        for (var ce = this.m_contactList; ce; ce = ce.next) ce.contact.FlagForFiltering()
    };
    b2Body.prototype.GetType = function() {
        return this.m_type
    };
    b2Body.prototype.SetBullet = function(flag) {
        if (flag) this.m_flags |= b2Body.e_bulletFlag;
        else this.m_flags &= ~b2Body.e_bulletFlag
    };
    b2Body.prototype.IsBullet = function() {
        return (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag
    };
    b2Body.prototype.SetSleepingAllowed = function(flag) {
        if (flag) this.m_flags |= b2Body.e_allowSleepFlag;
        else {
            this.m_flags &= ~b2Body.e_allowSleepFlag;
            this.SetAwake(true)
        }
    };
    b2Body.prototype.SetAwake = function(flag) {
        if (flag) {
            this.m_flags |= b2Body.e_awakeFlag;
            this.m_sleepTime = 0
        } else {
            this.m_flags &= ~b2Body.e_awakeFlag;
            this.m_sleepTime = 0;
            this.m_linearVelocity.SetZero();
            this.m_angularVelocity = 0;
            this.m_force.SetZero();
            this.m_torque = 0
        }
    };
    b2Body.prototype.IsAwake = function() {
        return (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag
    };
    b2Body.prototype.SetFixedRotation = function(fixed) {
        if (fixed) this.m_flags |= b2Body.e_fixedRotationFlag;
        else this.m_flags &= ~b2Body.e_fixedRotationFlag;
        this.ResetMassData()
    };
    b2Body.prototype.IsFixedRotation = function() {
        return (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag
    };
    b2Body.prototype.SetActive = function(flag) {
        if (flag == this.IsActive()) return;
        var broadPhase;
        var f;
        if (flag) {
            this.m_flags |= b2Body.e_activeFlag;
            broadPhase = this.m_world.m_contactManager.m_broadPhase;
            for (f = this.m_fixtureList; f; f = f.m_next) f.CreateProxy(broadPhase, this.m_xf)
        } else {
            this.m_flags &= ~b2Body.e_activeFlag;
            broadPhase = this.m_world.m_contactManager.m_broadPhase;
            for (f = this.m_fixtureList; f; f = f.m_next) f.DestroyProxy(broadPhase);
            var ce = this.m_contactList;
            while (ce) {
                var ce0 = ce;
                ce = ce.next;
                this.m_world.m_contactManager.Destroy(ce0.contact)
            }
            this.m_contactList = null
        }
    };
    b2Body.prototype.IsActive = function() {
        return (this.m_flags & b2Body.e_activeFlag) == b2Body.e_activeFlag
    };
    b2Body.prototype.IsSleepingAllowed = function() {
        return (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag
    };
    b2Body.prototype.GetFixtureList = function() {
        return this.m_fixtureList
    };
    b2Body.prototype.GetJointList = function() {
        return this.m_jointList
    };
    b2Body.prototype.GetControllerList = function() {
        return this.m_controllerList
    };
    b2Body.prototype.GetContactList = function() {
        return this.m_contactList
    };
    b2Body.prototype.GetNext = function() {
        return this.m_next
    };
    b2Body.prototype.GetUserData = function() {
        return this.m_userData
    };
    b2Body.prototype.SetUserData = function(data) {
        this.m_userData = data
    };
    b2Body.prototype.GetWorld = function() {
        return this.m_world
    };
    b2Body.prototype.b2Body = function(bd, world) {
        this.m_flags = 0;
        if (bd.bullet) this.m_flags |= b2Body.e_bulletFlag;
        if (bd.fixedRotation) this.m_flags |= b2Body.e_fixedRotationFlag;
        if (bd.allowSleep) this.m_flags |= b2Body.e_allowSleepFlag;
        if (bd.awake) this.m_flags |= b2Body.e_awakeFlag;
        if (bd.active) this.m_flags |= b2Body.e_activeFlag;
        this.m_world = world;
        this.m_xf.position.SetV(bd.position);
        this.m_xf.R.Set(bd.angle);
        this.m_sweep.localCenter.SetZero();
        this.m_sweep.t0 = 1;
        this.m_sweep.a0 = this.m_sweep.a = bd.angle;
        var tMat = this.m_xf.R;
        var tVec = this.m_sweep.localCenter;
        this.m_sweep.c.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
        this.m_sweep.c.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
        this.m_sweep.c.x += this.m_xf.position.x;
        this.m_sweep.c.y += this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_jointList = null;
        this.m_controllerList = null;
        this.m_contactList = null;
        this.m_controllerCount = 0;
        this.m_prev = null;
        this.m_next = null;
        this.m_linearVelocity.SetV(bd.linearVelocity);
        this.m_angularVelocity = bd.angularVelocity;
        this.m_linearDamping = bd.linearDamping;
        this.m_angularDamping = bd.angularDamping;
        this.m_force.Set(0, 0);
        this.m_torque = 0;
        this.m_sleepTime = 0;
        this.m_type = bd.type;
        if (this.m_type == b2Body.b2_dynamicBody) {
            this.m_mass = 1;
            this.m_invMass = 1
        } else {
            this.m_mass = 0;
            this.m_invMass = 0
        }
        this.m_I = 0;
        this.m_invI = 0;
        this.m_inertiaScale = bd.inertiaScale;
        this.m_userData = bd.userData;
        this.m_fixtureList = null;
        this.m_fixtureCount = 0
    };
    b2Body.prototype.SynchronizeFixtures = function() {
        var xf1 = b2Body.s_xf1;
        xf1.R.Set(this.m_sweep.a0);
        var tMat = xf1.R;
        var tVec = this.m_sweep.localCenter;
        xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        var f;
        var broadPhase = this.m_world.m_contactManager.m_broadPhase;
        for (f = this.m_fixtureList; f; f = f.m_next) f.Synchronize(broadPhase, xf1, this.m_xf)
    };
    b2Body.prototype.SynchronizeTransform = function() {
        this.m_xf.R.Set(this.m_sweep.a);
        var tMat = this.m_xf.R;
        var tVec = this.m_sweep.localCenter;
        this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y)
    };
    b2Body.prototype.ShouldCollide = function(other) {
        if (this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) return false;
        for (var jn = this.m_jointList; jn; jn = jn.next) if (jn.other == other) if (jn.joint.m_collideConnected == false) return false;
        return true
    };
    b2Body.prototype.Advance = function(t) {
        if (t === undefined) t = 0;
        this.m_sweep.Advance(t);
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.SynchronizeTransform()
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2Body.s_xf1 = new b2Transform;
        Box2D.Dynamics.b2Body.e_islandFlag = 1;
        Box2D.Dynamics.b2Body.e_awakeFlag = 2;
        Box2D.Dynamics.b2Body.e_allowSleepFlag = 4;
        Box2D.Dynamics.b2Body.e_bulletFlag = 8;
        Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
        Box2D.Dynamics.b2Body.e_activeFlag = 32;
        Box2D.Dynamics.b2Body.b2_staticBody = 0;
        Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
        Box2D.Dynamics.b2Body.b2_dynamicBody = 2
    });
    b2BodyDef.b2BodyDef = function() {
        this.position = new b2Vec2;
        this.linearVelocity = new b2Vec2
    };
    b2BodyDef.prototype.b2BodyDef = function() {
        this.userData = null;
        this.position.Set(0, 0);
        this.angle = 0;
        this.linearVelocity.Set(0, 0);
        this.angularVelocity = 0;
        this.linearDamping = 0;
        this.angularDamping = 0;
        this.allowSleep = true;
        this.awake = true;
        this.fixedRotation = false;
        this.bullet = false;
        this.type = b2Body.b2_staticBody;
        this.active = true;
        this.inertiaScale = 1
    };
    b2ContactFilter.b2ContactFilter = function() {};
    b2ContactFilter.prototype.ShouldCollide = function(fixtureA, fixtureB) {
        var filter1 = fixtureA.GetFilterData();
        var filter2 = fixtureB.GetFilterData();
        if (filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) return filter1.groupIndex > 0;
        var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
        return collide
    };
    b2ContactFilter.prototype.RayCollide = function(userData, fixture) {
        if (!userData) return true;
        return this.ShouldCollide(userData instanceof b2Fixture ? userData : null, fixture)
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new b2ContactFilter
    });
    b2ContactImpulse.b2ContactImpulse = function() {
        this.normalImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
        this.tangentImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints)
    };
    b2ContactListener.b2ContactListener = function() {};
    b2ContactListener.prototype.BeginContact = function(contact) {};
    b2ContactListener.prototype.EndContact = function(contact) {};
    b2ContactListener.prototype.PreSolve = function(contact, oldManifold) {};
    b2ContactListener.prototype.PostSolve = function(contact, impulse) {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactListener.b2_defaultListener = new b2ContactListener
    });
    b2ContactManager.b2ContactManager = function() {};
    b2ContactManager.prototype.b2ContactManager = function() {
        this.m_world = null;
        this.m_contactCount = 0;
        this.m_contactFilter = b2ContactFilter.b2_defaultFilter;
        this.m_contactListener = b2ContactListener.b2_defaultListener;
        this.m_contactFactory = new b2ContactFactory(this.m_allocator);
        this.m_broadPhase = new b2DynamicTreeBroadPhase
    };
    b2ContactManager.prototype.AddPair = function(proxyUserDataA, proxyUserDataB) {
        var fixtureA = proxyUserDataA instanceof b2Fixture ? proxyUserDataA : null;
        var fixtureB = proxyUserDataB instanceof
            b2Fixture ? proxyUserDataB : null;
        var bodyA = fixtureA.GetBody();
        var bodyB = fixtureB.GetBody();
        if (bodyA == bodyB) return;
        var edge = bodyB.GetContactList();
        while (edge) {
            if (edge.other == bodyA) {
                var fA = edge.contact.GetFixtureA();
                var fB = edge.contact.GetFixtureB();
                if (fA == fixtureA && fB == fixtureB) return;
                if (fA == fixtureB && fB == fixtureA) return
            }
            edge = edge.next
        }
        if (bodyB.ShouldCollide(bodyA) == false) return;
        if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) return;
        var c = this.m_contactFactory.Create(fixtureA, fixtureB);
        fixtureA = c.GetFixtureA();
        fixtureB = c.GetFixtureB();
        bodyA = fixtureA.m_body;
        bodyB = fixtureB.m_body;
        c.m_prev = null;
        c.m_next = this.m_world.m_contactList;
        if (this.m_world.m_contactList != null) this.m_world.m_contactList.m_prev = c;
        this.m_world.m_contactList = c;
        c.m_nodeA.contact = c;
        c.m_nodeA.other = bodyB;
        c.m_nodeA.prev = null;
        c.m_nodeA.next = bodyA.m_contactList;
        if (bodyA.m_contactList != null) bodyA.m_contactList.prev = c.m_nodeA;
        bodyA.m_contactList = c.m_nodeA;
        c.m_nodeB.contact = c;
        c.m_nodeB.other = bodyA;
        c.m_nodeB.prev = null;
        c.m_nodeB.next = bodyB.m_contactList;
        if (bodyB.m_contactList != null) bodyB.m_contactList.prev = c.m_nodeB;
        bodyB.m_contactList = c.m_nodeB;
        ++this.m_world.m_contactCount;
        return
    };
    b2ContactManager.prototype.FindNewContacts = function() {
        this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
    };
    b2ContactManager.prototype.Destroy = function(c) {
        var fixtureA = c.GetFixtureA();
        var fixtureB = c.GetFixtureB();
        var bodyA = fixtureA.GetBody();
        var bodyB = fixtureB.GetBody();
        if (c.IsTouching()) this.m_contactListener.EndContact(c);
        if (c.m_prev) c.m_prev.m_next = c.m_next;
        if (c.m_next) c.m_next.m_prev = c.m_prev;
        if (c == this.m_world.m_contactList) this.m_world.m_contactList = c.m_next;
        if (c.m_nodeA.prev) c.m_nodeA.prev.next = c.m_nodeA.next;
        if (c.m_nodeA.next) c.m_nodeA.next.prev = c.m_nodeA.prev;
        if (c.m_nodeA == bodyA.m_contactList) bodyA.m_contactList = c.m_nodeA.next;
        if (c.m_nodeB.prev) c.m_nodeB.prev.next = c.m_nodeB.next;
        if (c.m_nodeB.next) c.m_nodeB.next.prev = c.m_nodeB.prev;
        if (c.m_nodeB == bodyB.m_contactList) bodyB.m_contactList = c.m_nodeB.next;
        this.m_contactFactory.Destroy(c);
        --this.m_contactCount
    };
    b2ContactManager.prototype.Collide = function() {
        var c = this.m_world.m_contactList;
        while (c) {
            var fixtureA = c.GetFixtureA();
            var fixtureB = c.GetFixtureB();
            var bodyA = fixtureA.GetBody();
            var bodyB = fixtureB.GetBody();
            if (bodyA.IsAwake() == false && bodyB.IsAwake() == false) {
                c = c.GetNext();
                continue
            }
            if (c.m_flags & b2Contact.e_filterFlag) {
                if (bodyB.ShouldCollide(bodyA) == false) {
                    var cNuke = c;
                    c = cNuke.GetNext();
                    this.Destroy(cNuke);
                    continue
                }
                if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
                    cNuke = c;
                    c = cNuke.GetNext();
                    this.Destroy(cNuke);
                    continue
                }
                c.m_flags &= ~b2Contact.e_filterFlag
            }
            var proxyA = fixtureA.m_proxy;
            var proxyB = fixtureB.m_proxy;
            var overlap = this.m_broadPhase.TestOverlap(proxyA, proxyB);
            if (overlap == false) {
                cNuke = c;
                c = cNuke.GetNext();
                this.Destroy(cNuke);
                continue
            }
            c.Update(this.m_contactListener);
            c = c.GetNext()
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactManager.s_evalCP = new b2ContactPoint
    });
    b2DebugDraw.b2DebugDraw = function() {};
    b2DebugDraw.prototype.b2DebugDraw = function() {};
    b2DebugDraw.prototype.SetFlags = function(flags) {
        if (flags === undefined) flags = 0
    };
    b2DebugDraw.prototype.GetFlags = function() {};
    b2DebugDraw.prototype.AppendFlags = function(flags) {
        if (flags === undefined) flags = 0
    };
    b2DebugDraw.prototype.ClearFlags = function(flags) {
        if (flags === undefined) flags = 0
    };
    b2DebugDraw.prototype.SetSprite = function(sprite) {};
    b2DebugDraw.prototype.GetSprite = function() {};
    b2DebugDraw.prototype.SetDrawScale = function(drawScale) {
        if (drawScale === undefined) drawScale = 0
    };
    b2DebugDraw.prototype.GetDrawScale = function() {};
    b2DebugDraw.prototype.SetLineThickness = function(lineThickness) {
        if (lineThickness === undefined) lineThickness = 0
    };
    b2DebugDraw.prototype.GetLineThickness = function() {};
    b2DebugDraw.prototype.SetAlpha = function(alpha) {
        if (alpha === undefined) alpha = 0
    };
    b2DebugDraw.prototype.GetAlpha = function() {};
    b2DebugDraw.prototype.SetFillAlpha = function(alpha) {
        if (alpha === undefined) alpha = 0
    };
    b2DebugDraw.prototype.GetFillAlpha = function() {};
    b2DebugDraw.prototype.SetXFormScale = function(xformScale) {
        if (xformScale === undefined) xformScale = 0
    };
    b2DebugDraw.prototype.GetXFormScale = function() {};
    b2DebugDraw.prototype.DrawPolygon = function(vertices, vertexCount, color) {
        if (vertexCount === undefined) vertexCount = 0
    };
    b2DebugDraw.prototype.DrawSolidPolygon = function(vertices, vertexCount, color) {
        if (vertexCount === undefined) vertexCount = 0
    };
    b2DebugDraw.prototype.DrawCircle = function(center, radius, color) {
        if (radius === undefined) radius = 0
    };
    b2DebugDraw.prototype.DrawSolidCircle = function(center, radius, axis, color) {
        if (radius === undefined) radius = 0
    };
    b2DebugDraw.prototype.DrawSegment = function(p1, p2, color) {};
    b2DebugDraw.prototype.DrawTransform = function(xf) {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1;
        Box2D.Dynamics.b2DebugDraw.e_jointBit = 2;
        Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4;
        Box2D.Dynamics.b2DebugDraw.e_pairBit = 8;
        Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16;
        Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32
    });
    b2DestructionListener.b2DestructionListener = function() {};
    b2DestructionListener.prototype.SayGoodbyeJoint = function(joint) {};
    b2DestructionListener.prototype.SayGoodbyeFixture = function(fixture) {};
    b2FilterData.b2FilterData = function() {
        this.categoryBits = 1;
        this.maskBits = 65535;
        this.groupIndex = 0
    };
    b2FilterData.prototype.Copy = function() {
        var copy = new b2FilterData;
        copy.categoryBits = this.categoryBits;
        copy.maskBits = this.maskBits;
        copy.groupIndex = this.groupIndex;
        return copy
    };
    b2Fixture.b2Fixture = function() {
        this.m_filter = new b2FilterData
    };
    b2Fixture.prototype.GetType = function() {
        return this.m_shape.GetType()
    };
    b2Fixture.prototype.GetShape = function() {
        return this.m_shape
    };
    b2Fixture.prototype.SetSensor = function(sensor) {
        if (this.m_isSensor == sensor) return;
        this.m_isSensor = sensor;
        if (this.m_body == null) return;
        var edge = this.m_body.GetContactList();
        while (edge) {
            var contact = edge.contact;
            var fixtureA = contact.GetFixtureA();
            var fixtureB = contact.GetFixtureB();
            if (fixtureA == this || fixtureB == this) contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor());
            edge = edge.next
        }
    };
    b2Fixture.prototype.IsSensor = function() {
        return this.m_isSensor
    };
    b2Fixture.prototype.SetFilterData = function(filter) {
        this.m_filter = filter.Copy();
        if (this.m_body) return;
        var edge = this.m_body.GetContactList();
        while (edge) {
            var contact = edge.contact;
            var fixtureA = contact.GetFixtureA();
            var fixtureB = contact.GetFixtureB();
            if (fixtureA == this || fixtureB == this) contact.FlagForFiltering();
            edge = edge.next
        }
    };
    b2Fixture.prototype.GetFilterData = function() {
        return this.m_filter.Copy()
    };
    b2Fixture.prototype.GetBody = function() {
        return this.m_body
    };
    b2Fixture.prototype.GetNext = function() {
        return this.m_next
    };
    b2Fixture.prototype.GetUserData = function() {
        return this.m_userData
    };
    b2Fixture.prototype.SetUserData = function(data) {
        this.m_userData = data
    };
    b2Fixture.prototype.TestPoint = function(p) {
        return this.m_shape.TestPoint(this.m_body.GetTransform(), p)
    };
    b2Fixture.prototype.RayCast = function(output, input) {
        return this.m_shape.RayCast(output, input, this.m_body.GetTransform())
    };
    b2Fixture.prototype.GetMassData = function(massData) {
        if (massData === undefined) massData = null;
        if (massData == null) massData = new b2MassData;
        this.m_shape.ComputeMass(massData, this.m_density);
        return massData
    };
    b2Fixture.prototype.SetDensity = function(density) {
        if (density === undefined) density = 0;
        this.m_density = density
    };
    b2Fixture.prototype.GetDensity = function() {
        return this.m_density
    };
    b2Fixture.prototype.GetFriction = function() {
        return this.m_friction
    };
    b2Fixture.prototype.SetFriction = function(friction) {
        if (friction === undefined) friction = 0;
        this.m_friction = friction
    };
    b2Fixture.prototype.GetRestitution = function() {
        return this.m_restitution
    };
    b2Fixture.prototype.SetRestitution = function(restitution) {
        if (restitution === undefined) restitution = 0;
        this.m_restitution = restitution
    };
    b2Fixture.prototype.GetAABB = function() {
        return this.m_aabb
    };
    b2Fixture.prototype.b2Fixture = function() {
        this.m_aabb = new b2AABB;
        this.m_userData = null;
        this.m_body = null;
        this.m_next = null;
        this.m_shape = null;
        this.m_density = 0;
        this.m_friction = 0;
        this.m_restitution = 0
    };
    b2Fixture.prototype.Create = function(body, xf, def) {
        this.m_userData = def.userData;
        this.m_friction = def.friction;
        this.m_restitution = def.restitution;
        this.m_body = body;
        this.m_next = null;
        this.m_filter = def.filter.Copy();
        this.m_isSensor = def.isSensor;
        this.m_shape = def.shape.Copy();
        this.m_density = def.density
    };
    b2Fixture.prototype.Destroy = function() {
        this.m_shape = null
    };
    b2Fixture.prototype.CreateProxy = function(broadPhase, xf) {
        this.m_shape.ComputeAABB(this.m_aabb, xf);
        this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this)
    };
    b2Fixture.prototype.DestroyProxy = function(broadPhase) {
        if (this.m_proxy == null) return;
        broadPhase.DestroyProxy(this.m_proxy);
        this.m_proxy = null
    };
    b2Fixture.prototype.Synchronize = function(broadPhase, transform1, transform2) {
        if (!this.m_proxy) return;
        var aabb1 = new b2AABB;
        var aabb2 = new b2AABB;
        this.m_shape.ComputeAABB(aabb1, transform1);
        this.m_shape.ComputeAABB(aabb2, transform2);
        this.m_aabb.Combine(aabb1, aabb2);
        var displacement = b2Math.SubtractVV(transform2.position, transform1.position);
        broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement)
    };
    b2FixtureDef.b2FixtureDef = function() {
        this.filter = new b2FilterData
    };
    b2FixtureDef.prototype.b2FixtureDef = function() {
        this.shape = null;
        this.userData = null;
        this.friction = 0.2;
        this.restitution = 0;
        this.density = 0;
        this.filter.categoryBits = 1;
        this.filter.maskBits = 65535;
        this.filter.groupIndex = 0;
        this.isSensor = false
    };
    b2Island.b2Island = function() {};
    b2Island.prototype.b2Island = function() {
        this.m_bodies = new Vector;
        this.m_contacts = new Vector;
        this.m_joints = new Vector
    };
    b2Island.prototype.Initialize = function(bodyCapacity, contactCapacity, jointCapacity, allocator, listener, contactSolver) {
        if (bodyCapacity === undefined) bodyCapacity = 0;
        if (contactCapacity === undefined) contactCapacity = 0;
        if (jointCapacity === undefined) jointCapacity = 0;
        var i = 0;
        this.m_bodyCapacity = bodyCapacity;
        this.m_contactCapacity = contactCapacity;
        this.m_jointCapacity = jointCapacity;
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0;
        this.m_allocator = allocator;
        this.m_listener = listener;
        this.m_contactSolver = contactSolver;
        for (i = this.m_bodies.length; i < bodyCapacity; i++) this.m_bodies[i] = null;
        for (i = this.m_contacts.length; i < contactCapacity; i++) this.m_contacts[i] = null;
        for (i = this.m_joints.length; i < jointCapacity; i++) this.m_joints[i] = null
    };
    b2Island.prototype.Clear = function() {
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0
    };
    b2Island.prototype.Solve = function(step, gravity, allowSleep) {
        var i = 0;
        var j = 0;
        var b;
        var joint;
        for (i = 0; i < this.m_bodyCount; ++i) {
            b = this.m_bodies[i];
            if (b.GetType() != b2Body.b2_dynamicBody) continue;
            b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
            b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
            b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
            b.m_linearVelocity.Multiply(b2Math.Clamp(1 - step.dt * b.m_linearDamping, 0, 1));
            b.m_angularVelocity *= b2Math.Clamp(1 - step.dt * b.m_angularDamping, 0, 1)
        }
        this.m_contactSolver.Initialize(step, this.m_contacts, this.m_contactCount, this.m_allocator);
        var contactSolver = this.m_contactSolver;
        contactSolver.InitVelocityConstraints(step);
        for (i = 0; i < this.m_jointCount; ++i) {
            joint = this.m_joints[i];
            joint.InitVelocityConstraints(step)
        }
        for (i = 0; i < step.velocityIterations; ++i) {
            for (j = 0; j < this.m_jointCount; ++j) {
                joint = this.m_joints[j];
                joint.SolveVelocityConstraints(step)
            }
            contactSolver.SolveVelocityConstraints()
        }
        for (i = 0; i < this.m_jointCount; ++i) {
            joint = this.m_joints[i];
            joint.FinalizeVelocityConstraints()
        }
        contactSolver.FinalizeVelocityConstraints();
        for (i = 0; i < this.m_bodyCount; ++i) {
            b = this.m_bodies[i];
            if (b.GetType() == b2Body.b2_staticBody) continue;
            var translationX = step.dt * b.m_linearVelocity.x;
            var translationY = step.dt * b.m_linearVelocity.y;
            if (translationX * translationX + translationY * translationY > b2Settings.b2_maxTranslationSquared) {
                b.m_linearVelocity.Normalize();
                b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * step.inv_dt;
                b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * step.inv_dt
            }
            var rotation = step.dt * b.m_angularVelocity;
            if (rotation * rotation > b2Settings.b2_maxRotationSquared) if (b.m_angularVelocity < 0) b.m_angularVelocity = -b2Settings.b2_maxRotation * step.inv_dt;
            else b.m_angularVelocity = b2Settings.b2_maxRotation * step.inv_dt;
            b.m_sweep.c0.SetV(b.m_sweep.c);
            b.m_sweep.a0 = b.m_sweep.a;
            b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
            b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
            b.m_sweep.a += step.dt * b.m_angularVelocity;
            b.SynchronizeTransform()
        }
        for (i = 0; i < step.positionIterations; ++i) {
            var contactsOkay = contactSolver.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            var jointsOkay = true;
            for (j = 0; j < this.m_jointCount; ++j) {
                joint = this.m_joints[j];
                var jointOkay = joint.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
                jointsOkay = jointsOkay && jointOkay
            }
            if (contactsOkay && jointsOkay) break
        }
        this.Report(contactSolver.m_constraints);
        if (allowSleep) {
            var minSleepTime = Number.MAX_VALUE;
            var linTolSqr = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
            var angTolSqr = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
            for (i = 0; i < this.m_bodyCount; ++i) {
                b = this.m_bodies[i];
                if (b.GetType() == b2Body.b2_staticBody) continue;
                if ((b.m_flags & b2Body.e_allowSleepFlag) == 0) {
                    b.m_sleepTime = 0;
                    minSleepTime = 0
                }
                if ((b.m_flags & b2Body.e_allowSleepFlag) == 0 || (b.m_angularVelocity * b.m_angularVelocity > angTolSqr || b2Math.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr)) {
                    b.m_sleepTime = 0;
                    minSleepTime = 0
                } else {
                    b.m_sleepTime += step.dt;
                    minSleepTime = b2Math.Min(minSleepTime, b.m_sleepTime)
                }
            }
            if (minSleepTime >= b2Settings.b2_timeToSleep) for (i = 0; i < this.m_bodyCount; ++i) {
                b = this.m_bodies[i];
                b.SetAwake(false)
            }
        }
    };
    b2Island.prototype.SolveTOI = function(subStep) {
        var i = 0;
        var j = 0;
        this.m_contactSolver.Initialize(subStep, this.m_contacts, this.m_contactCount, this.m_allocator);
        var contactSolver = this.m_contactSolver;
        for (i = 0; i < this.m_jointCount; ++i) this.m_joints[i].InitVelocityConstraints(subStep);
        for (i = 0; i < subStep.velocityIterations; ++i) {
            contactSolver.SolveVelocityConstraints();
            for (j = 0; j < this.m_jointCount; ++j) this.m_joints[j].SolveVelocityConstraints(subStep)
        }
        for (i = 0; i < this.m_bodyCount; ++i) {
            var b = this.m_bodies[i];
            if (b.GetType() == b2Body.b2_staticBody) continue;
            var translationX = subStep.dt * b.m_linearVelocity.x;
            var translationY = subStep.dt * b.m_linearVelocity.y;
            if (translationX * translationX + translationY * translationY > b2Settings.b2_maxTranslationSquared) {
                b.m_linearVelocity.Normalize();
                b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * subStep.inv_dt;
                b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * subStep.inv_dt
            }
            var rotation = subStep.dt * b.m_angularVelocity;
            if (rotation * rotation > b2Settings.b2_maxRotationSquared) if (b.m_angularVelocity < 0) b.m_angularVelocity = -b2Settings.b2_maxRotation * subStep.inv_dt;
            else b.m_angularVelocity = b2Settings.b2_maxRotation * subStep.inv_dt;
            b.m_sweep.c0.SetV(b.m_sweep.c);
            b.m_sweep.a0 = b.m_sweep.a;
            b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
            b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
            b.m_sweep.a += subStep.dt * b.m_angularVelocity;
            b.SynchronizeTransform()
        }
        var k_toiBaumgarte = 0.75;
        for (i = 0; i < subStep.positionIterations; ++i) {
            var contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
            var jointsOkay = true;
            for (j = 0; j < this.m_jointCount; ++j) {
                var jointOkay = this.m_joints[j].SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
                jointsOkay = jointsOkay && jointOkay
            }
            if (contactsOkay && jointsOkay) break
        }
        this.Report(contactSolver.m_constraints)
    };
    b2Island.prototype.Report = function(constraints) {
        if (this.m_listener == null) return;
        for (var i = 0; i < this.m_contactCount; ++i) {
            var c = this.m_contacts[i];
            var cc = constraints[i];
            for (var j = 0; j < cc.pointCount; ++j) {
                b2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
                b2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse
            }
            this.m_listener.PostSolve(c, b2Island.s_impulse)
        }
    };
    b2Island.prototype.AddBody = function(body) {
        body.m_islandIndex = this.m_bodyCount;
        this.m_bodies[this.m_bodyCount++] = body
    };
    b2Island.prototype.AddContact = function(contact) {
        this.m_contacts[this.m_contactCount++] = contact
    };
    b2Island.prototype.AddJoint = function(joint) {
        this.m_joints[this.m_jointCount++] = joint
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2Island.s_impulse = new b2ContactImpulse
    });
    b2TimeStep.b2TimeStep = function() {};
    b2TimeStep.prototype.Set = function(step) {
        this.dt = step.dt;
        this.inv_dt = step.inv_dt;
        this.positionIterations = step.positionIterations;
        this.velocityIterations = step.velocityIterations;
        this.warmStarting = step.warmStarting
    };
    b2World.b2World = function() {
        this.s_stack = new Vector;
        this.m_contactManager = new b2ContactManager;
        this.m_contactSolver = new b2ContactSolver;
        this.m_island = new b2Island
    };
    b2World.prototype.b2World = function(gravity, doSleep) {
        this.m_destructionListener = null;
        this.m_debugDraw = null;
        this.m_bodyList = null;
        this.m_contactList = null;
        this.m_jointList = null;
        this.m_controllerList = null;
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0;
        this.m_controllerCount = 0;
        b2World.m_warmStarting = true;
        b2World.m_continuousPhysics = true;
        this.m_allowSleep = doSleep;
        this.m_gravity = gravity;
        this.m_inv_dt0 = 0;
        this.m_contactManager.m_world = this;
        var bd = new b2BodyDef;
        this.m_groundBody = this.CreateBody(bd)
    };
    b2World.prototype.SetDestructionListener = function(listener) {
        this.m_destructionListener = listener
    };
    b2World.prototype.SetContactFilter = function(filter) {
        this.m_contactManager.m_contactFilter = filter
    };
    b2World.prototype.SetContactListener = function(listener) {
        this.m_contactManager.m_contactListener = listener
    };
    b2World.prototype.SetDebugDraw = function(debugDraw) {
        this.m_debugDraw = debugDraw
    };
    b2World.prototype.SetBroadPhase = function(broadPhase) {
        var oldBroadPhase = this.m_contactManager.m_broadPhase;
        this.m_contactManager.m_broadPhase = broadPhase;
        for (var b = this.m_bodyList; b; b = b.m_next) for (var f = b.m_fixtureList; f; f = f.m_next) f.m_proxy = broadPhase.CreateProxy(oldBroadPhase.GetFatAABB(f.m_proxy), f)
    };
    b2World.prototype.Validate = function() {
        this.m_contactManager.m_broadPhase.Validate()
    };
    b2World.prototype.GetProxyCount = function() {
        return this.m_contactManager.m_broadPhase.GetProxyCount()
    };
    b2World.prototype.CreateBody = function(def) {
        if (this.IsLocked() == true) return null;
        var b = new b2Body(def, this);
        b.m_prev = null;
        b.m_next = this.m_bodyList;
        if (this.m_bodyList) this.m_bodyList.m_prev = b;
        this.m_bodyList = b;
        ++this.m_bodyCount;
        return b
    };
    b2World.prototype.DestroyBody = function(b) {
        if (this.IsLocked() == true) return;
        var jn = b.m_jointList;
        while (jn) {
            var jn0 = jn;
            jn = jn.next;
            if (this.m_destructionListener) this.m_destructionListener.SayGoodbyeJoint(jn0.joint);
            this.DestroyJoint(jn0.joint)
        }
        var coe = b.m_controllerList;
        while (coe) {
            var coe0 = coe;
            coe = coe.nextController;
            coe0.controller.RemoveBody(b)
        }
        var ce = b.m_contactList;
        while (ce) {
            var ce0 = ce;
            ce = ce.next;
            this.m_contactManager.Destroy(ce0.contact)
        }
        b.m_contactList = null;
        var f = b.m_fixtureList;
        while (f) {
            var f0 = f;
            f = f.m_next;
            if (this.m_destructionListener) this.m_destructionListener.SayGoodbyeFixture(f0);
            f0.DestroyProxy(this.m_contactManager.m_broadPhase);
            f0.Destroy()
        }
        b.m_fixtureList = null;
        b.m_fixtureCount = 0;
        if (b.m_prev) b.m_prev.m_next = b.m_next;
        if (b.m_next) b.m_next.m_prev = b.m_prev;
        if (b == this.m_bodyList) this.m_bodyList = b.m_next;
        --this.m_bodyCount
    };
    b2World.prototype.CreateJoint = function(def) {
        var j = b2Joint.Create(def, null);
        j.m_prev = null;
        j.m_next = this.m_jointList;
        if (this.m_jointList) this.m_jointList.m_prev = j;
        this.m_jointList = j;
        ++this.m_jointCount;
        j.m_edgeA.joint = j;
        j.m_edgeA.other = j.m_bodyB;
        j.m_edgeA.prev = null;
        j.m_edgeA.next = j.m_bodyA.m_jointList;
        if (j.m_bodyA.m_jointList) j.m_bodyA.m_jointList.prev = j.m_edgeA;
        j.m_bodyA.m_jointList = j.m_edgeA;
        j.m_edgeB.joint = j;
        j.m_edgeB.other = j.m_bodyA;
        j.m_edgeB.prev = null;
        j.m_edgeB.next = j.m_bodyB.m_jointList;
        if (j.m_bodyB.m_jointList) j.m_bodyB.m_jointList.prev = j.m_edgeB;
        j.m_bodyB.m_jointList = j.m_edgeB;
        var bodyA = def.bodyA;
        var bodyB = def.bodyB;
        if (def.collideConnected == false) {
            var edge = bodyB.GetContactList();
            while (edge) {
                if (edge.other == bodyA) edge.contact.FlagForFiltering();
                edge = edge.next
            }
        }
        return j
    };
    b2World.prototype.DestroyJoint = function(j) {
        var collideConnected = j.m_collideConnected;
        if (j.m_prev) j.m_prev.m_next = j.m_next;
        if (j.m_next) j.m_next.m_prev = j.m_prev;
        if (j == this.m_jointList) this.m_jointList = j.m_next;
        var bodyA = j.m_bodyA;
        var bodyB = j.m_bodyB;
        bodyA.SetAwake(true);
        bodyB.SetAwake(true);
        if (j.m_edgeA.prev) j.m_edgeA.prev.next = j.m_edgeA.next;
        if (j.m_edgeA.next) j.m_edgeA.next.prev = j.m_edgeA.prev;
        if (j.m_edgeA == bodyA.m_jointList) bodyA.m_jointList = j.m_edgeA.next;
        j.m_edgeA.prev = null;
        j.m_edgeA.next = null;
        if (j.m_edgeB.prev) j.m_edgeB.prev.next = j.m_edgeB.next;
        if (j.m_edgeB.next) j.m_edgeB.next.prev = j.m_edgeB.prev;
        if (j.m_edgeB == bodyB.m_jointList) bodyB.m_jointList = j.m_edgeB.next;
        j.m_edgeB.prev = null;
        j.m_edgeB.next = null;
        b2Joint.Destroy(j, null);
        --this.m_jointCount;
        if (collideConnected == false) {
            var edge = bodyB.GetContactList();
            while (edge) {
                if (edge.other == bodyA) edge.contact.FlagForFiltering();
                edge = edge.next
            }
        }
    };
    b2World.prototype.AddController = function(c) {
        c.m_next = this.m_controllerList;
        c.m_prev = null;
        this.m_controllerList = c;
        c.m_world = this;
        this.m_controllerCount++;
        return c
    };
    b2World.prototype.RemoveController = function(c) {
        if (c.m_prev) c.m_prev.m_next = c.m_next;
        if (c.m_next) c.m_next.m_prev = c.m_prev;
        if (this.m_controllerList == c) this.m_controllerList = c.m_next;
        this.m_controllerCount--
    };
    b2World.prototype.CreateController = function(controller) {
        if (controller.m_world != this) throw new Error("Controller can only be a member of one world");
        controller.m_next = this.m_controllerList;
        controller.m_prev = null;
        if (this.m_controllerList) this.m_controllerList.m_prev = controller;
        this.m_controllerList = controller;
        ++this.m_controllerCount;
        controller.m_world = this;
        return controller
    };
    b2World.prototype.DestroyController = function(controller) {
        controller.Clear();
        if (controller.m_next) controller.m_next.m_prev = controller.m_prev;
        if (controller.m_prev) controller.m_prev.m_next = controller.m_next;
        if (controller == this.m_controllerList) this.m_controllerList = controller.m_next;
        --this.m_controllerCount
    };
    b2World.prototype.SetWarmStarting = function(flag) {
        b2World.m_warmStarting = flag
    };
    b2World.prototype.SetContinuousPhysics = function(flag) {
        b2World.m_continuousPhysics = flag
    };
    b2World.prototype.GetBodyCount = function() {
        return this.m_bodyCount
    };
    b2World.prototype.GetJointCount = function() {
        return this.m_jointCount
    };
    b2World.prototype.GetContactCount = function() {
        return this.m_contactCount
    };
    b2World.prototype.SetGravity = function(gravity) {
        this.m_gravity = gravity
    };
    b2World.prototype.GetGravity = function() {
        return this.m_gravity
    };
    b2World.prototype.GetGroundBody = function() {
        return this.m_groundBody
    };
    b2World.prototype.Step = function(dt, velocityIterations, positionIterations) {
        if (dt === undefined) dt = 0;
        if (velocityIterations === undefined) velocityIterations = 0;
        if (positionIterations === undefined) positionIterations = 0;
        if (this.m_flags & b2World.e_newFixture) {
            this.m_contactManager.FindNewContacts();
            this.m_flags &= ~b2World.e_newFixture
        }
        this.m_flags |= b2World.e_locked;
        var step = b2World.s_timestep2;
        step.dt = dt;
        step.velocityIterations = velocityIterations;
        step.positionIterations = positionIterations;
        if (dt > 0) step.inv_dt = 1 / dt;
        else step.inv_dt = 0;
        step.dtRatio = this.m_inv_dt0 * dt;
        step.warmStarting = b2World.m_warmStarting;
        this.m_contactManager.Collide();
        if (step.dt > 0) this.Solve(step);
        if (b2World.m_continuousPhysics && step.dt > 0) this.SolveTOI(step);
        if (step.dt > 0) this.m_inv_dt0 = step.inv_dt;
        this.m_flags &= ~b2World.e_locked
    };
    b2World.prototype.ClearForces = function() {
        for (var body = this.m_bodyList; body; body = body.m_next) {
            body.m_force.SetZero();
            body.m_torque = 0
        }
    };
    b2World.prototype.DrawDebugData = function() {
        if (this.m_debugDraw == null) return;
        this.m_debugDraw.m_sprite.graphics.clear();
        var flags = this.m_debugDraw.GetFlags();
        var i = 0;
        var b;
        var f;
        var s;
        var j;
        var bp;
        var invQ = new b2Vec2;
        var x1 = new b2Vec2;
        var x2 = new b2Vec2;
        var xf;
        var b1 = new b2AABB;
        var b2 = new b2AABB;
        var vs = [new b2Vec2, new b2Vec2, new b2Vec2, new b2Vec2];
        var color = new b2Color(0, 0, 0);
        if (flags & b2DebugDraw.e_shapeBit) for (b = this.m_bodyList; b; b = b.m_next) {
            xf = b.m_xf;
            for (f = b.GetFixtureList(); f; f = f.m_next) {
                s = f.GetShape();
                if (b.IsActive() == false) {
                    color.Set(0.5, 0.5, 0.3);
                    this.DrawShape(s, xf, color)
                } else if (b.GetType() == b2Body.b2_staticBody) {
                    color.Set(0.5, 0.9, 0.5);
                    this.DrawShape(s, xf, color)
                } else if (b.GetType() == b2Body.b2_kinematicBody) {
                    color.Set(0.5, 0.5, 0.9);
                    this.DrawShape(s, xf, color)
                } else if (b.IsAwake() == false) {
                    color.Set(0.6, 0.6, 0.6);
                    this.DrawShape(s, xf, color)
                } else {
                    color.Set(0.9, 0.7, 0.7);
                    this.DrawShape(s, xf, color)
                }
            }
        }
        if (flags & b2DebugDraw.e_jointBit) for (j = this.m_jointList; j; j = j.m_next) this.DrawJoint(j);
        if (flags & b2DebugDraw.e_controllerBit) for (var c = this.m_controllerList; c; c = c.m_next) c.Draw(this.m_debugDraw);
        if (flags & b2DebugDraw.e_pairBit) {
            color.Set(0.3, 0.9, 0.9);
            for (var contact = this.m_contactManager.m_contactList; contact; contact = contact.GetNext()) {
                var fixtureA = contact.GetFixtureA();
                var fixtureB = contact.GetFixtureB();
                var cA = fixtureA.GetAABB().GetCenter();
                var cB = fixtureB.GetAABB().GetCenter();
                this.m_debugDraw.DrawSegment(cA, cB, color)
            }
        }
        if (flags & b2DebugDraw.e_aabbBit) {
            bp = this.m_contactManager.m_broadPhase;
            vs = [new b2Vec2, new b2Vec2, new b2Vec2, new b2Vec2];
            for (b = this.m_bodyList; b; b = b.GetNext()) {
                if (b.IsActive() == false) continue;
                for (f = b.GetFixtureList(); f; f = f.GetNext()) {
                    var aabb = bp.GetFatAABB(f.m_proxy);
                    vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
                    vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
                    vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
                    vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
                    this.m_debugDraw.DrawPolygon(vs, 4, color)
                }
            }
        }
        if (flags & b2DebugDraw.e_centerOfMassBit) for (b = this.m_bodyList; b; b = b.m_next) {
            xf = b2World.s_xf;
            xf.R = b.m_xf.R;
            xf.position = b.GetWorldCenter();
            this.m_debugDraw.DrawTransform(xf)
        }
    };
    b2World.prototype.QueryAABB = function(callback, aabb) {
        var __this = this;
        var broadPhase = __this.m_contactManager.m_broadPhase;

        function WorldQueryWrapper(proxy) {
            return callback(broadPhase.GetUserData(proxy))
        }
        broadPhase.Query(WorldQueryWrapper, aabb)
    };
    b2World.prototype.QueryShape = function(callback, shape, transform) {
        var __this = this;
        if (transform === undefined) transform = null;
        if (transform == null) {
            transform = new b2Transform;
            transform.SetIdentity()
        }
        var broadPhase = __this.m_contactManager.m_broadPhase;

        function WorldQueryWrapper(proxy) {
            var fixture = broadPhase.GetUserData(proxy) instanceof b2Fixture ? broadPhase.GetUserData(proxy) : null;
            if (b2Shape.TestOverlap(shape, transform, fixture.GetShape(), fixture.GetBody().GetTransform())) return callback(fixture);
            return true
        }
        var aabb = new b2AABB;
        shape.ComputeAABB(aabb, transform);
        broadPhase.Query(WorldQueryWrapper, aabb)
    };
    b2World.prototype.QueryPoint = function(callback, p) {
        var __this = this;
        var broadPhase = __this.m_contactManager.m_broadPhase;

        function WorldQueryWrapper(proxy) {
            var fixture = broadPhase.GetUserData(proxy) instanceof
                b2Fixture ? broadPhase.GetUserData(proxy) : null;
            if (fixture.TestPoint(p)) return callback(fixture);
            return true
        }
        var aabb = new b2AABB;
        aabb.lowerBound.Set(p.x - b2Settings.b2_linearSlop, p.y - b2Settings.b2_linearSlop);
        aabb.upperBound.Set(p.x + b2Settings.b2_linearSlop, p.y + b2Settings.b2_linearSlop);
        broadPhase.Query(WorldQueryWrapper, aabb)
    };
    b2World.prototype.RayCast = function(callback, point1, point2) {
        var __this = this;
        var broadPhase = __this.m_contactManager.m_broadPhase;
        var output = new b2RayCastOutput;

        function RayCastWrapper(input, proxy) {
            var userData = broadPhase.GetUserData(proxy);
            var fixture = userData instanceof b2Fixture ? userData : null;
            var hit = fixture.RayCast(output, input);
            if (hit) {
                var fraction = output.fraction;
                var point = new b2Vec2((1 - fraction) * point1.x + fraction * point2.x, (1 - fraction) * point1.y + fraction * point2.y);
                return callback(fixture, point, output.normal, fraction)
            }
            return input.maxFraction
        }
        var input = new b2RayCastInput(point1, point2);
        broadPhase.RayCast(RayCastWrapper, input)
    };
    b2World.prototype.RayCastOne = function(point1, point2) {
        var __this = this;
        var result;

        function RayCastOneWrapper(fixture, point, normal, fraction) {
            if (fraction === undefined) fraction = 0;
            result = fixture;
            return fraction
        }
        __this.RayCast(RayCastOneWrapper, point1, point2);
        return result
    };
    b2World.prototype.RayCastAll = function(point1, point2) {
        var __this = this;
        var result = new Vector;

        function RayCastAllWrapper(fixture, point, normal, fraction) {
            if (fraction === undefined) fraction = 0;
            result[result.length] = fixture;
            return 1
        }
        __this.RayCast(RayCastAllWrapper, point1, point2);
        return result
    };
    b2World.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    b2World.prototype.GetJointList = function() {
        return this.m_jointList
    };
    b2World.prototype.GetContactList = function() {
        return this.m_contactList
    };
    b2World.prototype.IsLocked = function() {
        return (this.m_flags & b2World.e_locked) > 0
    };
    b2World.prototype.Solve = function(step) {
        var b;
        for (var controller = this.m_controllerList; controller; controller = controller.m_next) controller.Step(step);
        var island = this.m_island;
        island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        for (b = this.m_bodyList; b; b = b.m_next) b.m_flags &= ~b2Body.e_islandFlag;
        for (var c = this.m_contactList; c; c = c.m_next) c.m_flags &= ~b2Contact.e_islandFlag;
        for (var j = this.m_jointList; j; j = j.m_next) j.m_islandFlag = false;
        var stackSize = parseInt(this.m_bodyCount);
        var stack = this.s_stack;
        for (var seed = this.m_bodyList; seed; seed = seed.m_next) {
            if (seed.m_flags & b2Body.e_islandFlag) continue;
            if (seed.IsAwake() == false || seed.IsActive() == false) continue;
            if (seed.GetType() == b2Body.b2_staticBody) continue;
            island.Clear();
            var stackCount = 0;
            stack[stackCount++] = seed;
            seed.m_flags |= b2Body.e_islandFlag;
            while (stackCount > 0) {
                b = stack[--stackCount];
                island.AddBody(b);
                if (b.IsAwake() == false) b.SetAwake(true);
                if (b.GetType() == b2Body.b2_staticBody) continue;
                var other;
                for (var ce = b.m_contactList; ce; ce = ce.next) {
                    if (ce.contact.m_flags & b2Contact.e_islandFlag) continue;
                    if (ce.contact.IsSensor() == true || (ce.contact.IsEnabled() == false || ce.contact.IsTouching() == false)) continue;
                    island.AddContact(ce.contact);
                    ce.contact.m_flags |= b2Contact.e_islandFlag;
                    other = ce.other;
                    if (other.m_flags & b2Body.e_islandFlag) continue;
                    stack[stackCount++] = other;
                    other.m_flags |= b2Body.e_islandFlag
                }
                for (var jn = b.m_jointList; jn; jn = jn.next) {
                    if (jn.joint.m_islandFlag == true) continue;
                    other = jn.other;
                    if (other.IsActive() == false) continue;
                    island.AddJoint(jn.joint);
                    jn.joint.m_islandFlag = true;
                    if (other.m_flags & b2Body.e_islandFlag) continue;
                    stack[stackCount++] = other;
                    other.m_flags |= b2Body.e_islandFlag
                }
            }
            island.Solve(step, this.m_gravity, this.m_allowSleep);
            for (var i = 0; i < island.m_bodyCount; ++i) {
                b = island.m_bodies[i];
                if (b.GetType() == b2Body.b2_staticBody) b.m_flags &= ~b2Body.e_islandFlag
            }
        }
        for (i = 0; i < stack.length; ++i) {
            if (!stack[i]) break;
            stack[i] = null
        }
        for (b = this.m_bodyList; b; b = b.m_next) {
            if (b.IsAwake() == false || b.IsActive() == false) continue;
            if (b.GetType() == b2Body.b2_staticBody) continue;
            b.SynchronizeFixtures()
        }
        this.m_contactManager.FindNewContacts()
    };
    b2World.prototype.SolveTOI = function(step) {
        var b;
        var fA;
        var fB;
        var bA;
        var bB;
        var cEdge;
        var j;
        var island = this.m_island;
        island.Initialize(this.m_bodyCount, b2Settings.b2_maxTOIContactsPerIsland, b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        var queue = b2World.s_queue;
        for (b = this.m_bodyList; b; b = b.m_next) {
            b.m_flags &= ~b2Body.e_islandFlag;
            b.m_sweep.t0 = 0
        }
        var c;
        for (c = this.m_contactList; c; c = c.m_next) c.m_flags &= ~ (b2Contact.e_toiFlag | b2Contact.e_islandFlag);
        for (j = this.m_jointList; j; j = j.m_next) j.m_islandFlag = false;
        for (;;) {
            var minContact = null;
            var minTOI = 1;
            for (c = this.m_contactList; c; c = c.m_next) {
                if (c.IsSensor() == true || (c.IsEnabled() == false || c.IsContinuous() == false)) continue;
                var toi = 1;
                if (c.m_flags & b2Contact.e_toiFlag) toi = c.m_toi;
                else {
                    fA = c.m_fixtureA;
                    fB = c.m_fixtureB;
                    bA = fA.m_body;
                    bB = fB.m_body;
                    if ((bA.GetType() != b2Body.b2_dynamicBody || bA.IsAwake() == false) && (bB.GetType() != b2Body.b2_dynamicBody || bB.IsAwake() == false)) continue;
                    var t0 = bA.m_sweep.t0;
                    if (bA.m_sweep.t0 < bB.m_sweep.t0) {
                        t0 = bB.m_sweep.t0;
                        bA.m_sweep.Advance(t0)
                    } else if (bB.m_sweep.t0 < bA.m_sweep.t0) {
                        t0 = bA.m_sweep.t0;
                        bB.m_sweep.Advance(t0)
                    }
                    toi = c.ComputeTOI(bA.m_sweep, bB.m_sweep);
                    b2Settings.b2Assert(0 <= toi && toi <= 1);
                    if (toi > 0 && toi < 1) {
                        toi = (1 - toi) * t0 + toi;
                        if (toi > 1) toi = 1
                    }
                    c.m_toi = toi;
                    c.m_flags |= b2Contact.e_toiFlag
                }
                if (Number.MIN_VALUE < toi && toi < minTOI) {
                    minContact = c;
                    minTOI = toi
                }
            }
            if (minContact == null || 1 - 100 * Number.MIN_VALUE < minTOI) break;
            fA = minContact.m_fixtureA;
            fB = minContact.m_fixtureB;
            bA = fA.m_body;
            bB = fB.m_body;
            b2World.s_backupA.Set(bA.m_sweep);
            b2World.s_backupB.Set(bB.m_sweep);
            bA.Advance(minTOI);
            bB.Advance(minTOI);
            minContact.Update(this.m_contactManager.m_contactListener);
            minContact.m_flags &= ~b2Contact.e_toiFlag;
            if (minContact.IsSensor() == true || minContact.IsEnabled() == false) {
                bA.m_sweep.Set(b2World.s_backupA);
                bB.m_sweep.Set(b2World.s_backupB);
                bA.SynchronizeTransform();
                bB.SynchronizeTransform();
                continue
            }
            if (minContact.IsTouching() == false) continue;
            var seed = bA;
            if (seed.GetType() != b2Body.b2_dynamicBody) seed = bB;
            island.Clear();
            var queueStart = 0;
            var queueSize = 0;
            queue[queueStart + queueSize++] = seed;
            seed.m_flags |= b2Body.e_islandFlag;
            while (queueSize > 0) {
                b = queue[queueStart++];
                --queueSize;
                island.AddBody(b);
                if (b.IsAwake() == false) b.SetAwake(true);
                if (b.GetType() != b2Body.b2_dynamicBody) continue;
                for (cEdge = b.m_contactList; cEdge; cEdge = cEdge.next) {
                    if (island.m_contactCount == island.m_contactCapacity) break;
                    if (cEdge.contact.m_flags & b2Contact.e_islandFlag) continue;
                    if (cEdge.contact.IsSensor() == true || (cEdge.contact.IsEnabled() == false || cEdge.contact.IsTouching() == false)) continue;
                    island.AddContact(cEdge.contact);
                    cEdge.contact.m_flags |= b2Contact.e_islandFlag;
                    var other = cEdge.other;
                    if (other.m_flags & b2Body.e_islandFlag) continue;
                    if (other.GetType() != b2Body.b2_staticBody) {
                        other.Advance(minTOI);
                        other.SetAwake(true)
                    }
                    queue[queueStart + queueSize] = other;
                    ++queueSize;
                    other.m_flags |= b2Body.e_islandFlag
                }
                for (var jEdge = b.m_jointList; jEdge; jEdge = jEdge.next) {
                    if (island.m_jointCount == island.m_jointCapacity) continue;
                    if (jEdge.joint.m_islandFlag == true) continue;
                    other = jEdge.other;
                    if (other.IsActive() == false) continue;
                    island.AddJoint(jEdge.joint);
                    jEdge.joint.m_islandFlag = true;
                    if (other.m_flags & b2Body.e_islandFlag) continue;
                    if (other.GetType() != b2Body.b2_staticBody) {
                        other.Advance(minTOI);
                        other.SetAwake(true)
                    }
                    queue[queueStart + queueSize] = other;
                    ++queueSize;
                    other.m_flags |= b2Body.e_islandFlag
                }
            }
            var subStep = b2World.s_timestep;
            subStep.warmStarting = false;
            subStep.dt = (1 - minTOI) * step.dt;
            subStep.inv_dt = 1 / subStep.dt;
            subStep.dtRatio = 0;
            subStep.velocityIterations = step.velocityIterations;
            subStep.positionIterations = step.positionIterations;
            island.SolveTOI(subStep);
            var i = 0;
            for (i = 0; i < island.m_bodyCount; ++i) {
                b = island.m_bodies[i];
                b.m_flags &= ~b2Body.e_islandFlag;
                if (b.IsAwake() == false) continue;
                if (b.GetType() != b2Body.b2_dynamicBody) continue;
                b.SynchronizeFixtures();
                for (cEdge = b.m_contactList; cEdge; cEdge = cEdge.next) cEdge.contact.m_flags &= ~b2Contact.e_toiFlag
            }
            for (i = 0; i < island.m_contactCount; ++i) {
                c = island.m_contacts[i];
                c.m_flags &= ~ (b2Contact.e_toiFlag | b2Contact.e_islandFlag)
            }
            for (i = 0; i < island.m_jointCount; ++i) {
                j = island.m_joints[i];
                j.m_islandFlag = false
            }
            this.m_contactManager.FindNewContacts()
        }
    };
    b2World.prototype.DrawJoint = function(joint) {
        var b1 = joint.GetBodyA();
        var b2 = joint.GetBodyB();
        var xf1 = b1.m_xf;
        var xf2 = b2.m_xf;
        var x1 = xf1.position;
        var x2 = xf2.position;
        var p1 = joint.GetAnchorA();
        var p2 = joint.GetAnchorB();
        var color = b2World.s_jointColor;
        switch (joint.m_type) {
            case b2Joint.e_distanceJoint:
                this.m_debugDraw.DrawSegment(p1, p2, color);
                break;
            case b2Joint.e_pulleyJoint:
                var pulley = joint instanceof b2PulleyJoint ? joint : null;
                var s1 = pulley.GetGroundAnchorA();
                var s2 = pulley.GetGroundAnchorB();
                this.m_debugDraw.DrawSegment(s1, p1, color);
                this.m_debugDraw.DrawSegment(s2, p2, color);
                this.m_debugDraw.DrawSegment(s1, s2, color);
                break;
            case b2Joint.e_mouseJoint:
                this.m_debugDraw.DrawSegment(p1, p2, color);
                break;
            default:
                if (b1 != this.m_groundBody) this.m_debugDraw.DrawSegment(x1, p1, color);
                this.m_debugDraw.DrawSegment(p1, p2, color);
                if (b2 != this.m_groundBody) this.m_debugDraw.DrawSegment(x2, p2, color)
        }
    };
    b2World.prototype.DrawShape = function(shape, xf, color) {
        switch (shape.m_type) {
            case b2Shape.e_circleShape:
                var circle = shape instanceof b2CircleShape ? shape : null;
                var center = b2Math.MulX(xf, circle.m_p);
                var radius = circle.m_radius;
                var axis = xf.R.col1;
                this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
                break;
            case b2Shape.e_polygonShape:
                var i = 0;
                var poly = shape instanceof b2PolygonShape ? shape : null;
                var vertexCount = parseInt(poly.GetVertexCount());
                var localVertices = poly.GetVertices();
                var vertices = new Vector(vertexCount);
                for (i = 0; i < vertexCount; ++i) vertices[i] = b2Math.MulX(xf, localVertices[i]);
                this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
                break;
            case b2Shape.e_edgeShape:
                var edge = shape instanceof b2EdgeShape ? shape : null;
                this.m_debugDraw.DrawSegment(b2Math.MulX(xf, edge.GetVertex1()), b2Math.MulX(xf, edge.GetVertex2()), color);
                break
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2World.s_timestep2 = new b2TimeStep;
        Box2D.Dynamics.b2World.s_xf = new b2Transform;
        Box2D.Dynamics.b2World.s_backupA = new b2Sweep;
        Box2D.Dynamics.b2World.s_backupB = new b2Sweep;
        Box2D.Dynamics.b2World.s_timestep = new b2TimeStep;
        Box2D.Dynamics.b2World.s_queue = new Vector;
        Box2D.Dynamics.b2World.s_jointColor = new b2Color(0.5, 0.8, 0.8);
        Box2D.Dynamics.b2World.e_newFixture = 1;
        Box2D.Dynamics.b2World.e_locked = 2
    })
})();
(function() {
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
        b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2Shape = Box2D.Collision.Shapes.b2Shape,
        b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
        b2Contact = Box2D.Dynamics.Contacts.b2Contact,
        b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
        b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
        b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
        b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
        b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
        b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
        b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
        b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
        b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
        b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
        b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
        b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
        b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
        b2Body = Box2D.Dynamics.b2Body,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
        b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
        b2ContactListener = Box2D.Dynamics.b2ContactListener,
        b2ContactManager = Box2D.Dynamics.b2ContactManager,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
        b2FilterData = Box2D.Dynamics.b2FilterData,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Island = Box2D.Dynamics.b2Island,
        b2TimeStep = Box2D.Dynamics.b2TimeStep,
        b2World = Box2D.Dynamics.b2World,
        b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3,
        b2AABB = Box2D.Collision.b2AABB,
        b2Bound = Box2D.Collision.b2Bound,
        b2BoundValues = Box2D.Collision.b2BoundValues,
        b2Collision = Box2D.Collision.b2Collision,
        b2ContactID = Box2D.Collision.b2ContactID,
        b2ContactPoint = Box2D.Collision.b2ContactPoint,
        b2Distance = Box2D.Collision.b2Distance,
        b2DistanceInput = Box2D.Collision.b2DistanceInput,
        b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
        b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
        b2DynamicTree = Box2D.Collision.b2DynamicTree,
        b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
        b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
        b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
        b2Manifold = Box2D.Collision.b2Manifold,
        b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
        b2Point = Box2D.Collision.b2Point,
        b2RayCastInput = Box2D.Collision.b2RayCastInput,
        b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
        b2Segment = Box2D.Collision.b2Segment,
        b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
        b2Simplex = Box2D.Collision.b2Simplex,
        b2SimplexCache = Box2D.Collision.b2SimplexCache,
        b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
        b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
        b2TOIInput = Box2D.Collision.b2TOIInput,
        b2WorldManifold = Box2D.Collision.b2WorldManifold,
        ClipVertex = Box2D.Collision.ClipVertex,
        Features = Box2D.Collision.Features,
        IBroadPhase = Box2D.Collision.IBroadPhase;
    Box2D.inherit(b2CircleContact, Box2D.Dynamics.Contacts.b2Contact);
    b2CircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2CircleContact.b2CircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    b2CircleContact.Create = function(allocator) {
        return new b2CircleContact
    };
    b2CircleContact.Destroy = function(contact, allocator) {};
    b2CircleContact.prototype.Reset = function(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB)
    };
    b2CircleContact.prototype.Evaluate = function() {
        var bA = this.m_fixtureA.GetBody();
        var bB = this.m_fixtureB.GetBody();
        b2Collision.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof b2CircleShape ? this.m_fixtureA.GetShape() : null, bA.m_xf, this.m_fixtureB.GetShape() instanceof
            b2CircleShape ? this.m_fixtureB.GetShape() : null, bB.m_xf)
    };
    b2Contact.b2Contact = function() {
        this.m_nodeA = new b2ContactEdge;
        this.m_nodeB = new b2ContactEdge;
        this.m_manifold = new b2Manifold;
        this.m_oldManifold = new b2Manifold
    };
    b2Contact.prototype.GetManifold = function() {
        return this.m_manifold
    };
    b2Contact.prototype.GetWorldManifold = function(worldManifold) {
        var bodyA = this.m_fixtureA.GetBody();
        var bodyB = this.m_fixtureB.GetBody();
        var shapeA = this.m_fixtureA.GetShape();
        var shapeB = this.m_fixtureB.GetShape();
        worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius)
    };
    b2Contact.prototype.IsTouching = function() {
        return (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag
    };
    b2Contact.prototype.IsContinuous = function() {
        return (this.m_flags & b2Contact.e_continuousFlag) == b2Contact.e_continuousFlag
    };
    b2Contact.prototype.SetSensor = function(sensor) {
        if (sensor) this.m_flags |= b2Contact.e_sensorFlag;
        else this.m_flags &= ~b2Contact.e_sensorFlag
    };
    b2Contact.prototype.IsSensor = function() {
        return (this.m_flags & b2Contact.e_sensorFlag) == b2Contact.e_sensorFlag
    };
    b2Contact.prototype.SetEnabled = function(flag) {
        if (flag) this.m_flags |= b2Contact.e_enabledFlag;
        else this.m_flags &= ~b2Contact.e_enabledFlag
    };
    b2Contact.prototype.IsEnabled = function() {
        return (this.m_flags & b2Contact.e_enabledFlag) == b2Contact.e_enabledFlag
    };
    b2Contact.prototype.GetNext = function() {
        return this.m_next
    };
    b2Contact.prototype.GetFixtureA = function() {
        return this.m_fixtureA
    };
    b2Contact.prototype.GetFixtureB = function() {
        return this.m_fixtureB
    };
    b2Contact.prototype.FlagForFiltering = function() {
        this.m_flags |= b2Contact.e_filterFlag
    };
    b2Contact.prototype.b2Contact = function() {};
    b2Contact.prototype.Reset = function(fixtureA, fixtureB) {
        if (fixtureA === undefined) fixtureA = null;
        if (fixtureB === undefined) fixtureB = null;
        this.m_flags = b2Contact.e_enabledFlag;
        if (!fixtureA || !fixtureB) {
            this.m_fixtureA = null;
            this.m_fixtureB = null;
            return
        }
        if (fixtureA.IsSensor() || fixtureB.IsSensor()) this.m_flags |= b2Contact.e_sensorFlag;
        var bodyA = fixtureA.GetBody();
        var bodyB = fixtureB.GetBody();
        if (bodyA.GetType() != b2Body.b2_dynamicBody || (bodyA.IsBullet() || (bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()))) this.m_flags |= b2Contact.e_continuousFlag;
        this.m_fixtureA = fixtureA;
        this.m_fixtureB = fixtureB;
        this.m_manifold.m_pointCount = 0;
        this.m_prev = null;
        this.m_next = null;
        this.m_nodeA.contact = null;
        this.m_nodeA.prev = null;
        this.m_nodeA.next = null;
        this.m_nodeA.other = null;
        this.m_nodeB.contact = null;
        this.m_nodeB.prev = null;
        this.m_nodeB.next = null;
        this.m_nodeB.other = null
    };
    b2Contact.prototype.Update = function(listener) {
        var tManifold = this.m_oldManifold;
        this.m_oldManifold = this.m_manifold;
        this.m_manifold = tManifold;
        this.m_flags |= b2Contact.e_enabledFlag;
        var touching = false;
        var wasTouching = (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
        var bodyA = this.m_fixtureA.m_body;
        var bodyB = this.m_fixtureB.m_body;
        var aabbOverlap = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
        if (this.m_flags & b2Contact.e_sensorFlag) {
            if (aabbOverlap) {
                var shapeA = this.m_fixtureA.GetShape();
                var shapeB = this.m_fixtureB.GetShape();
                var xfA = bodyA.GetTransform();
                var xfB = bodyB.GetTransform();
                touching = b2Shape.TestOverlap(shapeA, xfA, shapeB, xfB)
            }
            this.m_manifold.m_pointCount = 0
        } else {
            if (bodyA.GetType() != b2Body.b2_dynamicBody || (bodyA.IsBullet() || (bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()))) this.m_flags |= b2Contact.e_continuousFlag;
            else this.m_flags &= ~b2Contact.e_continuousFlag;
            if (aabbOverlap) {
                this.Evaluate();
                touching = this.m_manifold.m_pointCount > 0;
                for (var i = 0; i < this.m_manifold.m_pointCount; ++i) {
                    var mp2 = this.m_manifold.m_points[i];
                    mp2.m_normalImpulse = 0;
                    mp2.m_tangentImpulse = 0;
                    var id2 = mp2.m_id;
                    for (var j = 0; j < this.m_oldManifold.m_pointCount; ++j) {
                        var mp1 = this.m_oldManifold.m_points[j];
                        if (mp1.m_id.key == id2.key) {
                            mp2.m_normalImpulse = mp1.m_normalImpulse;
                            mp2.m_tangentImpulse = mp1.m_tangentImpulse;
                            break
                        }
                    }
                }
            } else this.m_manifold.m_pointCount = 0;
            if (touching != wasTouching) {
                bodyA.SetAwake(true);
                bodyB.SetAwake(true)
            }
        }
        if (touching) this.m_flags |= b2Contact.e_touchingFlag;
        else this.m_flags &= ~b2Contact.e_touchingFlag;
        if (wasTouching == false && touching == true) listener.BeginContact(this);
        if (wasTouching == true && touching == false) listener.EndContact(this);
        if ((this.m_flags & b2Contact.e_sensorFlag) == 0) listener.PreSolve(this, this.m_oldManifold)
    };
    b2Contact.prototype.Evaluate = function() {};
    b2Contact.prototype.ComputeTOI = function(sweepA, sweepB) {
        b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
        b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
        b2Contact.s_input.sweepA = sweepA;
        b2Contact.s_input.sweepB = sweepB;
        b2Contact.s_input.tolerance = b2Settings.b2_linearSlop;
        return b2TimeOfImpact.TimeOfImpact(b2Contact.s_input)
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1;
        Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2;
        Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4;
        Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8;
        Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16;
        Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32;
        Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 64;
        Box2D.Dynamics.Contacts.b2Contact.s_input = new b2TOIInput
    });
    b2ContactConstraint.b2ContactConstraint = function() {
        this.localPlaneNormal = new b2Vec2;
        this.localPoint = new b2Vec2;
        this.normal = new b2Vec2;
        this.normalMass = new b2Mat22;
        this.K = new b2Mat22
    };
    b2ContactConstraint.prototype.b2ContactConstraint = function() {
        this.points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) this.points[i] = new b2ContactConstraintPoint
    };
    b2ContactConstraintPoint.b2ContactConstraintPoint = function() {
        this.localPoint = new b2Vec2;
        this.rA = new b2Vec2;
        this.rB = new b2Vec2
    };
    b2ContactEdge.b2ContactEdge = function() {};
    b2ContactFactory.b2ContactFactory = function() {};
    b2ContactFactory.prototype.b2ContactFactory = function(allocator) {
        this.m_allocator = allocator;
        this.InitializeRegisters()
    };
    b2ContactFactory.prototype.AddType = function(createFcn, destroyFcn, type1, type2) {
        if (type1 === undefined) type1 = 0;
        if (type2 === undefined) type2 = 0;
        this.m_registers[type1][type2].createFcn = createFcn;
        this.m_registers[type1][type2].destroyFcn = destroyFcn;
        this.m_registers[type1][type2].primary = true;
        if (type1 != type2) {
            this.m_registers[type2][type1].createFcn = createFcn;
            this.m_registers[type2][type1].destroyFcn = destroyFcn;
            this.m_registers[type2][type1].primary = false
        }
    };
    b2ContactFactory.prototype.InitializeRegisters = function() {
        this.m_registers = new Vector(b2Shape.e_shapeTypeCount);
        for (var i = 0; i < b2Shape.e_shapeTypeCount; i++) {
            this.m_registers[i] = new Vector(b2Shape.e_shapeTypeCount);
            for (var j = 0; j < b2Shape.e_shapeTypeCount; j++) this.m_registers[i][j] = new b2ContactRegister
        }
        this.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
        this.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_circleShape);
        this.AddType(b2PolygonContact.Create, b2PolygonContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_polygonShape);
        this.AddType(b2EdgeAndCircleContact.Create, b2EdgeAndCircleContact.Destroy, b2Shape.e_edgeShape, b2Shape.e_circleShape);
        this.AddType(b2PolyAndEdgeContact.Create, b2PolyAndEdgeContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_edgeShape)
    };
    b2ContactFactory.prototype.Create = function(fixtureA, fixtureB) {
        var type1 = parseInt(fixtureA.GetType());
        var type2 = parseInt(fixtureB.GetType());
        var reg = this.m_registers[type1][type2];
        var c;
        if (reg.pool) {
            c = reg.pool;
            reg.pool = c.m_next;
            reg.poolCount--;
            c.Reset(fixtureA, fixtureB);
            return c
        }
        var createFcn = reg.createFcn;
        if (createFcn != null) if (reg.primary) {
            c = createFcn(this.m_allocator);
            c.Reset(fixtureA, fixtureB);
            return c
        } else {
            c = createFcn(this.m_allocator);
            c.Reset(fixtureB, fixtureA);
            return c
        } else return null
    };
    b2ContactFactory.prototype.Destroy = function(contact) {
        if (contact.m_manifold.m_pointCount > 0) {
            contact.m_fixtureA.m_body.SetAwake(true);
            contact.m_fixtureB.m_body.SetAwake(true)
        }
        var type1 = parseInt(contact.m_fixtureA.GetType());
        var type2 = parseInt(contact.m_fixtureB.GetType());
        var reg = this.m_registers[type1][type2];
        if (true) {
            reg.poolCount++;
            contact.m_next = reg.pool;
            reg.pool = contact
        }
        var destroyFcn = reg.destroyFcn;
        destroyFcn(contact, this.m_allocator)
    };
    b2ContactRegister.b2ContactRegister = function() {};
    b2ContactResult.b2ContactResult = function() {
        this.position = new b2Vec2;
        this.normal = new b2Vec2;
        this.id = new b2ContactID
    };
    b2ContactSolver.b2ContactSolver = function() {
        this.m_step = new b2TimeStep;
        this.m_constraints = new Vector
    };
    b2ContactSolver.prototype.b2ContactSolver = function() {};
    b2ContactSolver.prototype.Initialize = function(step, contacts, contactCount, allocator) {
        if (contactCount === undefined) contactCount = 0;
        var contact;
        this.m_step.Set(step);
        this.m_allocator = allocator;
        var i = 0;
        var tVec;
        var tMat;
        this.m_constraintCount = contactCount;
        while (this.m_constraints.length < this.m_constraintCount) this.m_constraints[this.m_constraints.length] = new b2ContactConstraint;
        for (i = 0; i < contactCount; ++i) {
            contact = contacts[i];
            var fixtureA = contact.m_fixtureA;
            var fixtureB = contact.m_fixtureB;
            var shapeA = fixtureA.m_shape;
            var shapeB = fixtureB.m_shape;
            var radiusA = shapeA.m_radius;
            var radiusB = shapeB.m_radius;
            var bodyA = fixtureA.m_body;
            var bodyB = fixtureB.m_body;
            var manifold = contact.GetManifold();
            var friction = b2Settings.b2MixFriction(fixtureA.GetFriction(), fixtureB.GetFriction());
            var restitution = b2Settings.b2MixRestitution(fixtureA.GetRestitution(), fixtureB.GetRestitution());
            var vAX = bodyA.m_linearVelocity.x;
            var vAY = bodyA.m_linearVelocity.y;
            var vBX = bodyB.m_linearVelocity.x;
            var vBY = bodyB.m_linearVelocity.y;
            var wA = bodyA.m_angularVelocity;
            var wB = bodyB.m_angularVelocity;
            b2Settings.b2Assert(manifold.m_pointCount > 0);
            b2ContactSolver.s_worldManifold.Initialize(manifold, bodyA.m_xf, radiusA, bodyB.m_xf, radiusB);
            var normalX = b2ContactSolver.s_worldManifold.m_normal.x;
            var normalY = b2ContactSolver.s_worldManifold.m_normal.y;
            var cc = this.m_constraints[i];
            cc.bodyA = bodyA;
            cc.bodyB = bodyB;
            cc.manifold = manifold;
            cc.normal.x = normalX;
            cc.normal.y = normalY;
            cc.pointCount = manifold.m_pointCount;
            cc.friction = friction;
            cc.restitution = restitution;
            cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
            cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
            cc.localPoint.x = manifold.m_localPoint.x;
            cc.localPoint.y = manifold.m_localPoint.y;
            cc.radius = radiusA + radiusB;
            cc.type = manifold.m_type;
            for (var k = 0; k < cc.pointCount; ++k) {
                var cp = manifold.m_points[k];
                var ccp = cc.points[k];
                ccp.normalImpulse = cp.m_normalImpulse;
                ccp.tangentImpulse = cp.m_tangentImpulse;
                ccp.localPoint.SetV(cp.m_localPoint);
                var rAX = ccp.rA.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
                var rAY = ccp.rA.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
                var rBX = ccp.rB.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
                var rBY = ccp.rB.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
                var rnA = rAX * normalY - rAY * normalX;
                var rnB = rBX * normalY - rBY * normalX;
                rnA *= rnA;
                rnB *= rnB;
                var kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
                ccp.normalMass = 1 / kNormal;
                var kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
                kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
                ccp.equalizedMass = 1 / kEqualized;
                var tangentX = normalY;
                var tangentY = -normalX;
                var rtA = rAX * tangentY - rAY * tangentX;
                var rtB = rBX * tangentY - rBY * tangentX;
                rtA *= rtA;
                rtB *= rtB;
                var kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
                ccp.tangentMass = 1 / kTangent;
                ccp.velocityBias = 0;
                var tX = vBX + -wB * rBY - vAX - -wA * rAY;
                var tY = vBY + wB * rBX - vAY - wA * rAX;
                var vRel = cc.normal.x * tX + cc.normal.y * tY;
                if (vRel < -b2Settings.b2_velocityThreshold) ccp.velocityBias += -cc.restitution * vRel
            }
            if (cc.pointCount == 2) {
                var ccp1 = cc.points[0];
                var ccp2 = cc.points[1];
                var invMassA = bodyA.m_invMass;
                var invIA = bodyA.m_invI;
                var invMassB = bodyB.m_invMass;
                var invIB = bodyB.m_invI;
                var rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
                var rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
                var rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
                var rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
                var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
                var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
                var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
                var k_maxConditionNumber = 100;
                if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
                    cc.K.col1.Set(k11, k12);
                    cc.K.col2.Set(k12, k22);
                    cc.K.GetInverse(cc.normalMass)
                } else cc.pointCount = 1
            }
        }
    };
    b2ContactSolver.prototype.InitVelocityConstraints = function(step) {
        var tVec;
        var tVec2;
        var tMat;
        for (var i = 0; i < this.m_constraintCount; ++i) {
            var c = this.m_constraints[i];
            var bodyA = c.bodyA;
            var bodyB = c.bodyB;
            var invMassA = bodyA.m_invMass;
            var invIA = bodyA.m_invI;
            var invMassB = bodyB.m_invMass;
            var invIB = bodyB.m_invI;
            var normalX = c.normal.x;
            var normalY = c.normal.y;
            var tangentX = normalY;
            var tangentY = -normalX;
            var tX = 0;
            var j = 0;
            var tCount = 0;
            if (step.warmStarting) {
                tCount = c.pointCount;
                for (j = 0; j < tCount; ++j) {
                    var ccp = c.points[j];
                    ccp.normalImpulse *= step.dtRatio;
                    ccp.tangentImpulse *= step.dtRatio;
                    var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
                    var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
                    bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
                    bodyA.m_linearVelocity.x -= invMassA * PX;
                    bodyA.m_linearVelocity.y -= invMassA * PY;
                    bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
                    bodyB.m_linearVelocity.x += invMassB * PX;
                    bodyB.m_linearVelocity.y += invMassB * PY
                }
            } else {
                tCount = c.pointCount;
                for (j = 0; j < tCount; ++j) {
                    var ccp2 = c.points[j];
                    ccp2.normalImpulse = 0;
                    ccp2.tangentImpulse = 0
                }
            }
        }
    };
    b2ContactSolver.prototype.SolveVelocityConstraints = function() {
        var j = 0;
        var ccp;
        var rAX = 0;
        var rAY = 0;
        var rBX = 0;
        var rBY = 0;
        var dvX = 0;
        var dvY = 0;
        var vn = 0;
        var vt = 0;
        var lambda = 0;
        var maxFriction = 0;
        var newImpulse = 0;
        var PX = 0;
        var PY = 0;
        var dX = 0;
        var dY = 0;
        var P1X = 0;
        var P1Y = 0;
        var P2X = 0;
        var P2Y = 0;
        var tMat;
        var tVec;
        for (var i = 0; i < this.m_constraintCount; ++i) {
            var c = this.m_constraints[i];
            var bodyA = c.bodyA;
            var bodyB = c.bodyB;
            var wA = bodyA.m_angularVelocity;
            var wB = bodyB.m_angularVelocity;
            var vA = bodyA.m_linearVelocity;
            var vB = bodyB.m_linearVelocity;
            var invMassA = bodyA.m_invMass;
            var invIA = bodyA.m_invI;
            var invMassB = bodyB.m_invMass;
            var invIB = bodyB.m_invI;
            var normalX = c.normal.x;
            var normalY = c.normal.y;
            var tangentX = normalY;
            var tangentY = -normalX;
            var friction = c.friction;
            var tX = 0;
            for (j = 0; j < c.pointCount; j++) {
                ccp = c.points[j];
                dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
                dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
                vt = dvX * tangentX + dvY * tangentY;
                lambda = ccp.tangentMass * -vt;
                maxFriction = friction * ccp.normalImpulse;
                newImpulse = b2Math.Clamp(ccp.tangentImpulse + lambda, -maxFriction, maxFriction);
                lambda = newImpulse - ccp.tangentImpulse;
                PX = lambda * tangentX;
                PY = lambda * tangentY;
                vA.x -= invMassA * PX;
                vA.y -= invMassA * PY;
                wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
                vB.x += invMassB * PX;
                vB.y += invMassB * PY;
                wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
                ccp.tangentImpulse = newImpulse
            }
            var tCount = parseInt(c.pointCount);
            if (c.pointCount == 1) {
                ccp = c.points[0];
                dvX = vB.x + -wB * ccp.rB.y - vA.x - -wA * ccp.rA.y;
                dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
                vn = dvX * normalX + dvY * normalY;
                lambda = -ccp.normalMass * (vn - ccp.velocityBias);
                newImpulse = ccp.normalImpulse + lambda;
                newImpulse = newImpulse > 0 ? newImpulse : 0;
                lambda = newImpulse - ccp.normalImpulse;
                PX = lambda * normalX;
                PY = lambda * normalY;
                vA.x -= invMassA * PX;
                vA.y -= invMassA * PY;
                wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
                vB.x += invMassB * PX;
                vB.y += invMassB * PY;
                wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
                ccp.normalImpulse = newImpulse
            } else {
                var cp1 = c.points[0];
                var cp2 = c.points[1];
                var aX = cp1.normalImpulse;
                var aY = cp2.normalImpulse;
                var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
                var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
                var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
                var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
                var vn1 = dv1X * normalX + dv1Y * normalY;
                var vn2 = dv2X * normalX + dv2Y * normalY;
                var bX = vn1 - cp1.velocityBias;
                var bY = vn2 - cp2.velocityBias;
                tMat = c.K;
                bX -= tMat.col1.x * aX + tMat.col2.x * aY;
                bY -= tMat.col1.y * aX + tMat.col2.y * aY;
                var k_errorTol = 0.001;
                for (;;) {
                    tMat = c.normalMass;
                    var xX = -(tMat.col1.x * bX + tMat.col2.x * bY);
                    var xY = -(tMat.col1.y * bX + tMat.col2.y * bY);
                    if (xX >= 0 && xY >= 0) {
                        dX = xX - aX;
                        dY = xY - aY;
                        P1X = dX * normalX;
                        P1Y = dX * normalY;
                        P2X = dY * normalX;
                        P2Y = dY * normalY;
                        vA.x -= invMassA * (P1X + P2X);
                        vA.y -= invMassA * (P1Y + P2Y);
                        wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                        vB.x += invMassB * (P1X + P2X);
                        vB.y += invMassB * (P1Y + P2Y);
                        wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                        cp1.normalImpulse = xX;
                        cp2.normalImpulse = xY;
                        break
                    }
                    xX = -cp1.normalMass * bX;
                    xY = 0;
                    vn1 = 0;
                    vn2 = c.K.col1.y * xX + bY;
                    if (xX >= 0 && vn2 >= 0) {
                        dX = xX - aX;
                        dY = xY - aY;
                        P1X = dX * normalX;
                        P1Y = dX * normalY;
                        P2X = dY * normalX;
                        P2Y = dY * normalY;
                        vA.x -= invMassA * (P1X + P2X);
                        vA.y -= invMassA * (P1Y + P2Y);
                        wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                        vB.x += invMassB * (P1X + P2X);
                        vB.y += invMassB * (P1Y + P2Y);
                        wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                        cp1.normalImpulse = xX;
                        cp2.normalImpulse = xY;
                        break
                    }
                    xX = 0;
                    xY = -cp2.normalMass * bY;
                    vn1 = c.K.col2.x * xY + bX;
                    vn2 = 0;
                    if (xY >= 0 && vn1 >= 0) {
                        dX = xX - aX;
                        dY = xY - aY;
                        P1X = dX * normalX;
                        P1Y = dX * normalY;
                        P2X = dY * normalX;
                        P2Y = dY * normalY;
                        vA.x -= invMassA * (P1X + P2X);
                        vA.y -= invMassA * (P1Y + P2Y);
                        wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                        vB.x += invMassB * (P1X + P2X);
                        vB.y += invMassB * (P1Y + P2Y);
                        wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                        cp1.normalImpulse = xX;
                        cp2.normalImpulse = xY;
                        break
                    }
                    xX = 0;
                    xY = 0;
                    vn1 = bX;
                    vn2 = bY;
                    if (vn1 >= 0 && vn2 >= 0) {
                        dX = xX - aX;
                        dY = xY - aY;
                        P1X = dX * normalX;
                        P1Y = dX * normalY;
                        P2X = dY * normalX;
                        P2Y = dY * normalY;
                        vA.x -= invMassA * (P1X + P2X);
                        vA.y -= invMassA * (P1Y + P2Y);
                        wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                        vB.x += invMassB * (P1X + P2X);
                        vB.y += invMassB * (P1Y + P2Y);
                        wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                        cp1.normalImpulse = xX;
                        cp2.normalImpulse = xY;
                        break
                    }
                    break
                }
            }
            bodyA.m_angularVelocity = wA;
            bodyB.m_angularVelocity = wB
        }
    };
    b2ContactSolver.prototype.FinalizeVelocityConstraints = function() {
        for (var i = 0; i < this.m_constraintCount; ++i) {
            var c = this.m_constraints[i];
            var m = c.manifold;
            for (var j = 0; j < c.pointCount; ++j) {
                var point1 = m.m_points[j];
                var point2 = c.points[j];
                point1.m_normalImpulse = point2.normalImpulse;
                point1.m_tangentImpulse = point2.tangentImpulse
            }
        }
    };
    b2ContactSolver.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var minSeparation = 0;
        for (var i = 0; i < this.m_constraintCount; i++) {
            var c = this.m_constraints[i];
            var bodyA = c.bodyA;
            var bodyB = c.bodyB;
            var invMassA = bodyA.m_mass * bodyA.m_invMass;
            var invIA = bodyA.m_mass * bodyA.m_invI;
            var invMassB = bodyB.m_mass * bodyB.m_invMass;
            var invIB = bodyB.m_mass * bodyB.m_invI;
            b2ContactSolver.s_psm.Initialize(c);
            var normal = b2ContactSolver.s_psm.m_normal;
            for (var j = 0; j < c.pointCount; j++) {
                var ccp = c.points[j];
                var point = b2ContactSolver.s_psm.m_points[j];
                var separation = b2ContactSolver.s_psm.m_separations[j];
                var rAX = point.x - bodyA.m_sweep.c.x;
                var rAY = point.y - bodyA.m_sweep.c.y;
                var rBX = point.x - bodyB.m_sweep.c.x;
                var rBY = point.y - bodyB.m_sweep.c.y;
                minSeparation = minSeparation < separation ? minSeparation : separation;
                var C = b2Math.Clamp(baumgarte * (separation + b2Settings.b2_linearSlop), -b2Settings.b2_maxLinearCorrection, 0);
                var impulse = -ccp.equalizedMass * C;
                var PX = impulse * normal.x;
                var PY = impulse * normal.y;
                bodyA.m_sweep.c.x -= invMassA * PX;
                bodyA.m_sweep.c.y -= invMassA * PY;
                bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
                bodyA.SynchronizeTransform();
                bodyB.m_sweep.c.x += invMassB * PX;
                bodyB.m_sweep.c.y += invMassB * PY;
                bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
                bodyB.SynchronizeTransform()
            }
        }
        return minSeparation > -1.5 * b2Settings.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new b2WorldManifold;
        Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new b2PositionSolverManifold
    });
    Box2D.inherit(b2EdgeAndCircleContact, Box2D.Dynamics.Contacts.b2Contact);
    b2EdgeAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2EdgeAndCircleContact.b2EdgeAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    b2EdgeAndCircleContact.Create = function(allocator) {
        return new b2EdgeAndCircleContact
    };
    b2EdgeAndCircleContact.Destroy = function(contact, allocator) {};
    b2EdgeAndCircleContact.prototype.Reset = function(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB)
    };
    b2EdgeAndCircleContact.prototype.Evaluate = function() {
        var bA = this.m_fixtureA.GetBody();
        var bB = this.m_fixtureB.GetBody();
        this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof b2EdgeShape ? this.m_fixtureA.GetShape() : null, bA.m_xf, this.m_fixtureB.GetShape() instanceof
            b2CircleShape ? this.m_fixtureB.GetShape() : null, bB.m_xf)
    };
    b2EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle = function(manifold, edge, xf1, circle, xf2) {};
    Box2D.inherit(b2NullContact, Box2D.Dynamics.Contacts.b2Contact);
    b2NullContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2NullContact.b2NullContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    b2NullContact.prototype.b2NullContact = function() {
        this.__super.b2Contact.call(this)
    };
    b2NullContact.prototype.Evaluate = function() {};
    Box2D.inherit(b2PolyAndCircleContact, Box2D.Dynamics.Contacts.b2Contact);
    b2PolyAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2PolyAndCircleContact.b2PolyAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    b2PolyAndCircleContact.Create = function(allocator) {
        return new b2PolyAndCircleContact
    };
    b2PolyAndCircleContact.Destroy = function(contact, allocator) {};
    b2PolyAndCircleContact.prototype.Reset = function(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB);
        b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
        b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_circleShape)
    };
    b2PolyAndCircleContact.prototype.Evaluate = function() {
        var bA = this.m_fixtureA.m_body;
        var bB = this.m_fixtureB.m_body;
        b2Collision.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null, bA.m_xf, this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null, bB.m_xf)
    };
    Box2D.inherit(b2PolyAndEdgeContact, Box2D.Dynamics.Contacts.b2Contact);
    b2PolyAndEdgeContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2PolyAndEdgeContact.b2PolyAndEdgeContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    b2PolyAndEdgeContact.Create = function(allocator) {
        return new b2PolyAndEdgeContact
    };
    b2PolyAndEdgeContact.Destroy = function(contact, allocator) {};
    b2PolyAndEdgeContact.prototype.Reset = function(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB);
        b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
        b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_edgeShape)
    };
    b2PolyAndEdgeContact.prototype.Evaluate = function() {
        var bA = this.m_fixtureA.GetBody();
        var bB = this.m_fixtureB.GetBody();
        this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null, bA.m_xf, this.m_fixtureB.GetShape() instanceof b2EdgeShape ? this.m_fixtureB.GetShape() : null, bB.m_xf)
    };
    b2PolyAndEdgeContact.prototype.b2CollidePolyAndEdge = function(manifold, polygon, xf1, edge, xf2) {};
    Box2D.inherit(b2PolygonContact, Box2D.Dynamics.Contacts.b2Contact);
    b2PolygonContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2PolygonContact.b2PolygonContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    b2PolygonContact.Create = function(allocator) {
        return new b2PolygonContact
    };
    b2PolygonContact.Destroy = function(contact, allocator) {};
    b2PolygonContact.prototype.Reset = function(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB)
    };
    b2PolygonContact.prototype.Evaluate = function() {
        var bA = this.m_fixtureA.GetBody();
        var bB = this.m_fixtureB.GetBody();
        b2Collision.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null, bA.m_xf, this.m_fixtureB.GetShape() instanceof b2PolygonShape ? this.m_fixtureB.GetShape() : null, bB.m_xf)
    };
    b2PositionSolverManifold.b2PositionSolverManifold = function() {};
    b2PositionSolverManifold.prototype.b2PositionSolverManifold = function() {
        this.m_normal = new b2Vec2;
        this.m_separations = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
        this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) this.m_points[i] = new b2Vec2
    };
    b2PositionSolverManifold.prototype.Initialize = function(cc) {
        b2Settings.b2Assert(cc.pointCount > 0);
        var i = 0;
        var clipPointX = 0;
        var clipPointY = 0;
        var tMat;
        var tVec;
        var planePointX = 0;
        var planePointY = 0;
        switch (cc.type) {
            case b2Manifold.e_circles:
                tMat = cc.bodyA.m_xf.R;
                tVec = cc.localPoint;
                var pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                var pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                tMat = cc.bodyB.m_xf.R;
                tVec = cc.points[0].localPoint;
                var pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                var pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                var dX = pointBX - pointAX;
                var dY = pointBY - pointAY;
                var d2 = dX * dX + dY * dY;
                if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
                    var d = Math.sqrt(d2);
                    this.m_normal.x = dX / d;
                    this.m_normal.y = dY / d
                } else {
                    this.m_normal.x = 1;
                    this.m_normal.y = 0
                }
                this.m_points[0].x = 0.5 * (pointAX + pointBX);
                this.m_points[0].y = 0.5 * (pointAY + pointBY);
                this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
                break;
            case b2Manifold.e_faceA:
                tMat = cc.bodyA.m_xf.R;
                tVec = cc.localPlaneNormal;
                this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                tMat = cc.bodyA.m_xf.R;
                tVec = cc.localPoint;
                planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                tMat = cc.bodyB.m_xf.R;
                for (i = 0; i < cc.pointCount; ++i) {
                    tVec = cc.points[i].localPoint;
                    clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                    clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                    this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
                    this.m_points[i].x = clipPointX;
                    this.m_points[i].y = clipPointY
                }
                break;
            case b2Manifold.e_faceB:
                tMat = cc.bodyB.m_xf.R;
                tVec = cc.localPlaneNormal;
                this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                tMat = cc.bodyB.m_xf.R;
                tVec = cc.localPoint;
                planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                tMat = cc.bodyA.m_xf.R;
                for (i = 0; i < cc.pointCount; ++i) {
                    tVec = cc.points[i].localPoint;
                    clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                    clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                    this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
                    this.m_points[i].Set(clipPointX, clipPointY)
                }
                this.m_normal.x *= -1;
                this.m_normal.y *= -1;
                break
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new b2Vec2;
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new b2Vec2
    })
})();
(function() {
    var b2Body = Box2D.Dynamics.b2Body,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
        b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
        b2ContactListener = Box2D.Dynamics.b2ContactListener,
        b2ContactManager = Box2D.Dynamics.b2ContactManager,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
        b2FilterData = Box2D.Dynamics.b2FilterData,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Island = Box2D.Dynamics.b2Island,
        b2TimeStep = Box2D.Dynamics.b2TimeStep,
        b2World = Box2D.Dynamics.b2World,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3,
        b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
        b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
        b2MassData = Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2Shape = Box2D.Collision.Shapes.b2Shape,
        b2BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController,
        b2ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController,
        b2ConstantForceController = Box2D.Dynamics.Controllers.b2ConstantForceController,
        b2Controller = Box2D.Dynamics.Controllers.b2Controller,
        b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
        b2GravityController = Box2D.Dynamics.Controllers.b2GravityController,
        b2TensorDampingController = Box2D.Dynamics.Controllers.b2TensorDampingController;
    Box2D.inherit(b2BuoyancyController, Box2D.Dynamics.Controllers.b2Controller);
    b2BuoyancyController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2BuoyancyController.b2BuoyancyController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.normal = new b2Vec2(0, -1);
        this.offset = 0;
        this.density = 0;
        this.velocity = new b2Vec2(0, 0);
        this.linearDrag = 2;
        this.angularDrag = 1;
        this.useDensity = false;
        this.useWorldGravity = true;
        this.gravity = null
    };
    b2BuoyancyController.prototype.Step = function(step) {
        if (!this.m_bodyList) return;
        if (this.useWorldGravity) this.gravity = this.GetWorld().GetGravity().Copy();
        for (var i = this.m_bodyList; i; i = i.nextBody) {
            var body = i.body;
            if (body.IsAwake() == false) continue;
            var areac = new b2Vec2;
            var massc = new b2Vec2;
            var area = 0;
            var mass = 0;
            for (var fixture = body.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
                var sc = new b2Vec2;
                var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
                area += sarea;
                areac.x += sarea * sc.x;
                areac.y += sarea * sc.y;
                var shapeDensity = 0;
                if (this.useDensity) shapeDensity = 1;
                else shapeDensity = 1;
                mass += sarea * shapeDensity;
                massc.x += sarea * sc.x * shapeDensity;
                massc.y += sarea * sc.y * shapeDensity
            }
            areac.x /= area;
            areac.y /= area;
            massc.x /= mass;
            massc.y /= mass;
            if (area < Number.MIN_VALUE) continue;
            var buoyancyForce = this.gravity.GetNegative();
            buoyancyForce.Multiply(this.density * area);
            body.ApplyForce(buoyancyForce, massc);
            var dragForce = body.GetLinearVelocityFromWorldPoint(areac);
            dragForce.Subtract(this.velocity);
            dragForce.Multiply(-this.linearDrag * area);
            body.ApplyForce(dragForce, areac);
            body.ApplyTorque(-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag)
        }
    };
    b2BuoyancyController.prototype.Draw = function(debugDraw) {
        var r = 1E3;
        var p1 = new b2Vec2;
        var p2 = new b2Vec2;
        p1.x = this.normal.x * this.offset + this.normal.y * r;
        p1.y = this.normal.y * this.offset - this.normal.x * r;
        p2.x = this.normal.x * this.offset - this.normal.y * r;
        p2.y = this.normal.y * this.offset + this.normal.x * r;
        var color = new b2Color(0, 0, 1);
        debugDraw.DrawSegment(p1, p2, color)
    };
    Box2D.inherit(b2ConstantAccelController, Box2D.Dynamics.Controllers.b2Controller);
    b2ConstantAccelController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2ConstantAccelController.b2ConstantAccelController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.A = new b2Vec2(0, 0)
    };
    b2ConstantAccelController.prototype.Step = function(step) {
        var smallA = new b2Vec2(this.A.x * step.dt, this.A.y * step.dt);
        for (var i = this.m_bodyList; i; i = i.nextBody) {
            var body = i.body;
            if (!body.IsAwake()) continue;
            body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + smallA.x, body.GetLinearVelocity().y + smallA.y))
        }
    };
    Box2D.inherit(b2ConstantForceController, Box2D.Dynamics.Controllers.b2Controller);
    b2ConstantForceController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2ConstantForceController.b2ConstantForceController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.F = new b2Vec2(0, 0)
    };
    b2ConstantForceController.prototype.Step = function(step) {
        for (var i = this.m_bodyList; i; i = i.nextBody) {
            var body = i.body;
            if (!body.IsAwake()) continue;
            body.ApplyForce(this.F, body.GetWorldCenter())
        }
    };
    b2Controller.b2Controller = function() {};
    b2Controller.prototype.Step = function(step) {};
    b2Controller.prototype.Draw = function(debugDraw) {};
    b2Controller.prototype.AddBody = function(body) {
        var edge = new b2ControllerEdge;
        edge.controller = this;
        edge.body = body;
        edge.nextBody = this.m_bodyList;
        edge.prevBody = null;
        this.m_bodyList = edge;
        if (edge.nextBody) edge.nextBody.prevBody = edge;
        this.m_bodyCount++;
        edge.nextController = body.m_controllerList;
        edge.prevController = null;
        body.m_controllerList = edge;
        if (edge.nextController) edge.nextController.prevController = edge;
        body.m_controllerCount++
    };
    b2Controller.prototype.RemoveBody = function(body) {
        var edge = body.m_controllerList;
        while (edge && edge.controller != this) edge = edge.nextController;
        if (edge.prevBody) edge.prevBody.nextBody = edge.nextBody;
        if (edge.nextBody) edge.nextBody.prevBody = edge.prevBody;
        if (edge.nextController) edge.nextController.prevController = edge.prevController;
        if (edge.prevController) edge.prevController.nextController = edge.nextController;
        if (this.m_bodyList == edge) this.m_bodyList = edge.nextBody;
        if (body.m_controllerList == edge) body.m_controllerList = edge.nextController;
        body.m_controllerCount--;
        this.m_bodyCount--
    };
    b2Controller.prototype.Clear = function() {
        while (this.m_bodyList) this.RemoveBody(this.m_bodyList.body)
    };
    b2Controller.prototype.GetNext = function() {
        return this.m_next
    };
    b2Controller.prototype.GetWorld = function() {
        return this.m_world
    };
    b2Controller.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    b2ControllerEdge.b2ControllerEdge = function() {};
    Box2D.inherit(b2GravityController, Box2D.Dynamics.Controllers.b2Controller);
    b2GravityController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2GravityController.b2GravityController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.G = 1;
        this.invSqr = true
    };
    b2GravityController.prototype.Step = function(step) {
        var i = null;
        var body1 = null;
        var p1 = null;
        var mass1 = 0;
        var j = null;
        var body2 = null;
        var p2 = null;
        var dx = 0;
        var dy = 0;
        var r2 = 0;
        var f = null;
        if (this.invSqr) for (i = this.m_bodyList; i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList; j != i; j = j.nextBody) {
                body2 = j.body;
                p2 = body2.GetWorldCenter();
                dx = p2.x - p1.x;
                dy = p2.y - p1.y;
                r2 = dx * dx + dy * dy;
                if (r2 < Number.MIN_VALUE) continue;
                f = new b2Vec2(dx, dy);
                f.Multiply(this.G / r2 / Math.sqrt(r2) * mass1 * body2.GetMass());
                if (body1.IsAwake()) body1.ApplyForce(f, p1);
                f.Multiply(-1);
                if (body2.IsAwake()) body2.ApplyForce(f, p2)
            }
        } else for (i = this.m_bodyList; i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList; j != i; j = j.nextBody) {
                body2 = j.body;
                p2 = body2.GetWorldCenter();
                dx = p2.x - p1.x;
                dy = p2.y - p1.y;
                r2 = dx * dx + dy * dy;
                if (r2 < Number.MIN_VALUE) continue;
                f = new b2Vec2(dx, dy);
                f.Multiply(this.G / r2 * mass1 * body2.GetMass());
                if (body1.IsAwake()) body1.ApplyForce(f, p1);
                f.Multiply(-1);
                if (body2.IsAwake()) body2.ApplyForce(f, p2)
            }
        }
    };
    Box2D.inherit(b2TensorDampingController, Box2D.Dynamics.Controllers.b2Controller);
    b2TensorDampingController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2TensorDampingController.b2TensorDampingController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.T = new b2Mat22;
        this.maxTimestep = 0
    };
    b2TensorDampingController.prototype.SetAxisAligned = function(xDamping, yDamping) {
        if (xDamping === undefined) xDamping = 0;
        if (yDamping === undefined) yDamping = 0;
        this.T.col1.x = -xDamping;
        this.T.col1.y = 0;
        this.T.col2.x = 0;
        this.T.col2.y = -yDamping;
        if (xDamping > 0 || yDamping > 0) this.maxTimestep = 1 / Math.max(xDamping, yDamping);
        else this.maxTimestep = 0
    };
    b2TensorDampingController.prototype.Step = function(step) {
        var timestep = step.dt;
        if (timestep <= Number.MIN_VALUE) return;
        if (timestep > this.maxTimestep && this.maxTimestep > 0) timestep = this.maxTimestep;
        for (var i = this.m_bodyList; i; i = i.nextBody) {
            var body = i.body;
            if (!body.IsAwake()) continue;
            var damping = body.GetWorldVector(b2Math.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity())));
            body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + damping.x * timestep, body.GetLinearVelocity().y + damping.y * timestep))
        }
    }
})();
(function() {
    var b2Color = Box2D.Common.b2Color,
        b2internal = Box2D.Common.b2internal,
        b2Settings = Box2D.Common.b2Settings,
        b2Mat22 = Box2D.Common.Math.b2Mat22,
        b2Mat33 = Box2D.Common.Math.b2Mat33,
        b2Math = Box2D.Common.Math.b2Math,
        b2Sweep = Box2D.Common.Math.b2Sweep,
        b2Transform = Box2D.Common.Math.b2Transform,
        b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2Vec3 = Box2D.Common.Math.b2Vec3,
        b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
        b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
        b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
        b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
        b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
        b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
        b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
        b2Joint = Box2D.Dynamics.Joints.b2Joint,
        b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
        b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
        b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
        b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
        b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
        b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
        b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
        b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
        b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
        b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
        b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
        b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
        b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
        b2ContactListener = Box2D.Dynamics.b2ContactListener,
        b2ContactManager = Box2D.Dynamics.b2ContactManager,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
        b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
        b2FilterData = Box2D.Dynamics.b2FilterData,
        b2Fixture = Box2D.Dynamics.b2Fixture,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2Island = Box2D.Dynamics.b2Island,
        b2TimeStep = Box2D.Dynamics.b2TimeStep,
        b2World = Box2D.Dynamics.b2World;
    Box2D.inherit(b2DistanceJoint, Box2D.Dynamics.Joints.b2Joint);
    b2DistanceJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2DistanceJoint.b2DistanceJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_u = new b2Vec2
    };
    b2DistanceJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2DistanceJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2DistanceJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse * this.m_u.x, inv_dt * this.m_impulse * this.m_u.y)
    };
    b2DistanceJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0
    };
    b2DistanceJoint.prototype.GetLength = function() {
        return this.m_length
    };
    b2DistanceJoint.prototype.SetLength = function(length) {
        if (length === undefined) length = 0;
        this.m_length = length
    };
    b2DistanceJoint.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    b2DistanceJoint.prototype.SetFrequency = function(hz) {
        if (hz === undefined) hz = 0;
        this.m_frequencyHz = hz
    };
    b2DistanceJoint.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    b2DistanceJoint.prototype.SetDampingRatio = function(ratio) {
        if (ratio === undefined) ratio = 0;
        this.m_dampingRatio = ratio
    };
    b2DistanceJoint.prototype.b2DistanceJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        var tMat;
        var tX = 0;
        var tY = 0;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_length = def.length;
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_impulse = 0;
        this.m_gamma = 0;
        this.m_bias = 0
    };
    b2DistanceJoint.prototype.InitVelocityConstraints = function(step) {
        var tMat;
        var tX = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
        if (length > b2Settings.b2_linearSlop) this.m_u.Multiply(1 / length);
        else this.m_u.SetZero();
        var cr1u = r1X * this.m_u.y - r1Y * this.m_u.x;
        var cr2u = r2X * this.m_u.y - r2Y * this.m_u.x;
        var invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
        this.m_mass = invMass != 0 ? 1 / invMass : 0;
        if (this.m_frequencyHz > 0) {
            var C = length - this.m_length;
            var omega = 2 * Math.PI * this.m_frequencyHz;
            var d = 2 * this.m_mass * this.m_dampingRatio * omega;
            var k = this.m_mass * omega * omega;
            this.m_gamma = step.dt * (d + step.dt * k);
            this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
            this.m_bias = C * step.dt * k * this.m_gamma;
            this.m_mass = invMass + this.m_gamma;
            this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0
        }
        if (step.warmStarting) {
            this.m_impulse *= step.dtRatio;
            var PX = this.m_impulse * this.m_u.x;
            var PY = this.m_impulse * this.m_u.y;
            bA.m_linearVelocity.x -= bA.m_invMass * PX;
            bA.m_linearVelocity.y -= bA.m_invMass * PY;
            bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
            bB.m_linearVelocity.x += bB.m_invMass * PX;
            bB.m_linearVelocity.y += bB.m_invMass * PY;
            bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX)
        } else this.m_impulse = 0
    };
    b2DistanceJoint.prototype.SolveVelocityConstraints = function(step) {
        var tMat;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
        var v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
        var v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
        var v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
        var Cdot = this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y);
        var impulse = -this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
        this.m_impulse += impulse;
        var PX = impulse * this.m_u.x;
        var PY = impulse * this.m_u.y;
        bA.m_linearVelocity.x -= bA.m_invMass * PX;
        bA.m_linearVelocity.y -= bA.m_invMass * PY;
        bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
        bB.m_linearVelocity.x += bB.m_invMass * PX;
        bB.m_linearVelocity.y += bB.m_invMass * PY;
        bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX)
    };
    b2DistanceJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var tMat;
        if (this.m_frequencyHz > 0) return true;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        var length = Math.sqrt(dX * dX + dY * dY);
        dX /= length;
        dY /= length;
        var C = length - this.m_length;
        C = b2Math.Clamp(C, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
        var impulse = -this.m_mass * C;
        this.m_u.Set(dX, dY);
        var PX = impulse * this.m_u.x;
        var PY = impulse * this.m_u.y;
        bA.m_sweep.c.x -= bA.m_invMass * PX;
        bA.m_sweep.c.y -= bA.m_invMass * PY;
        bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
        bB.m_sweep.c.x += bB.m_invMass * PX;
        bB.m_sweep.c.y += bB.m_invMass * PY;
        bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return b2Math.Abs(C) < b2Settings.b2_linearSlop
    };
    Box2D.inherit(b2DistanceJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2DistanceJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2DistanceJointDef.b2DistanceJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2;
        this.localAnchorB = new b2Vec2
    };
    b2DistanceJointDef.prototype.b2DistanceJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_distanceJoint;
        this.length = 1;
        this.frequencyHz = 0;
        this.dampingRatio = 0
    };
    b2DistanceJointDef.prototype.Initialize = function(bA, bB, anchorA, anchorB) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchorA));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchorB));
        var dX = anchorB.x - anchorA.x;
        var dY = anchorB.y - anchorA.y;
        this.length = Math.sqrt(dX * dX + dY * dY);
        this.frequencyHz = 0;
        this.dampingRatio = 0
    };
    Box2D.inherit(b2FrictionJoint, Box2D.Dynamics.Joints.b2Joint);
    b2FrictionJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2FrictionJoint.b2FrictionJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new b2Vec2;
        this.m_localAnchorB = new b2Vec2;
        this.m_linearMass = new b2Mat22;
        this.m_linearImpulse = new b2Vec2
    };
    b2FrictionJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2FrictionJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    b2FrictionJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_linearImpulse.x, inv_dt * this.m_linearImpulse.y)
    };
    b2FrictionJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_angularImpulse
    };
    b2FrictionJoint.prototype.SetMaxForce = function(force) {
        if (force === undefined) force = 0;
        this.m_maxForce = force
    };
    b2FrictionJoint.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    b2FrictionJoint.prototype.SetMaxTorque = function(torque) {
        if (torque === undefined) torque = 0;
        this.m_maxTorque = torque
    };
    b2FrictionJoint.prototype.GetMaxTorque = function() {
        return this.m_maxTorque
    };
    b2FrictionJoint.prototype.b2FrictionJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        this.m_localAnchorA.SetV(def.localAnchorA);
        this.m_localAnchorB.SetV(def.localAnchorB);
        this.m_linearMass.SetZero();
        this.m_angularMass = 0;
        this.m_linearImpulse.SetZero();
        this.m_angularImpulse = 0;
        this.m_maxForce = def.maxForce;
        this.m_maxTorque = def.maxTorque
    };
    b2FrictionJoint.prototype.InitVelocityConstraints = function(step) {
        var tMat;
        var tX = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
        rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
        rAX = tX;
        tMat = bB.m_xf.R;
        var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
        rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
        rBX = tX;
        var mA = bA.m_invMass;
        var mB = bB.m_invMass;
        var iA = bA.m_invI;
        var iB = bB.m_invI;
        var K = new b2Mat22;
        K.col1.x = mA + mB;
        K.col2.x = 0;
        K.col1.y = 0;
        K.col2.y = mA + mB;
        K.col1.x += iA * rAY * rAY;
        K.col2.x += -iA * rAX * rAY;
        K.col1.y += -iA * rAX * rAY;
        K.col2.y += iA * rAX * rAX;
        K.col1.x += iB * rBY * rBY;
        K.col2.x += -iB * rBX * rBY;
        K.col1.y += -iB * rBX * rBY;
        K.col2.y += iB * rBX * rBX;
        K.GetInverse(this.m_linearMass);
        this.m_angularMass = iA + iB;
        if (this.m_angularMass > 0) this.m_angularMass = 1 / this.m_angularMass;
        if (step.warmStarting) {
            this.m_linearImpulse.x *= step.dtRatio;
            this.m_linearImpulse.y *= step.dtRatio;
            this.m_angularImpulse *= step.dtRatio;
            var P = this.m_linearImpulse;
            bA.m_linearVelocity.x -= mA * P.x;
            bA.m_linearVelocity.y -= mA * P.y;
            bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
            bB.m_linearVelocity.x += mB * P.x;
            bB.m_linearVelocity.y += mB * P.y;
            bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse)
        } else {
            this.m_linearImpulse.SetZero();
            this.m_angularImpulse = 0
        }
    };
    b2FrictionJoint.prototype.SolveVelocityConstraints = function(step) {
        var tMat;
        var tX = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var vA = bA.m_linearVelocity;
        var wA = bA.m_angularVelocity;
        var vB = bB.m_linearVelocity;
        var wB = bB.m_angularVelocity;
        var mA = bA.m_invMass;
        var mB = bB.m_invMass;
        var iA = bA.m_invI;
        var iB = bB.m_invI;
        tMat = bA.m_xf.R;
        var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
        rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
        rAX = tX;
        tMat = bB.m_xf.R;
        var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
        rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
        rBX = tX;
        var maxImpulse = 0;
        var Cdot = wB - wA;
        var impulse = -this.m_angularMass * Cdot;
        var oldImpulse = this.m_angularImpulse;
        maxImpulse = step.dt * this.m_maxTorque;
        this.m_angularImpulse = b2Math.Clamp(this.m_angularImpulse + impulse, -maxImpulse, maxImpulse);
        impulse = this.m_angularImpulse - oldImpulse;
        wA -= iA * impulse;
        wB += iB * impulse;
        var CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
        var CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
        var impulseV = b2Math.MulMV(this.m_linearMass, new b2Vec2(-CdotX, -CdotY));
        var oldImpulseV = this.m_linearImpulse.Copy();
        this.m_linearImpulse.Add(impulseV);
        maxImpulse = step.dt * this.m_maxForce;
        if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
            this.m_linearImpulse.Normalize();
            this.m_linearImpulse.Multiply(maxImpulse)
        }
        impulseV = b2Math.SubtractVV(this.m_linearImpulse, oldImpulseV);
        vA.x -= mA * impulseV.x;
        vA.y -= mA * impulseV.y;
        wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
        vB.x += mB * impulseV.x;
        vB.y += mB * impulseV.y;
        wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
        bA.m_angularVelocity = wA;
        bB.m_angularVelocity = wB
    };
    b2FrictionJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        return true
    };
    Box2D.inherit(b2FrictionJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2FrictionJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2FrictionJointDef.b2FrictionJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2;
        this.localAnchorB = new b2Vec2
    };
    b2FrictionJointDef.prototype.b2FrictionJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_frictionJoint;
        this.maxForce = 0;
        this.maxTorque = 0
    };
    b2FrictionJointDef.prototype.Initialize = function(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor))
    };
    Box2D.inherit(b2GearJoint, Box2D.Dynamics.Joints.b2Joint);
    b2GearJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2GearJoint.b2GearJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_groundAnchor1 = new b2Vec2;
        this.m_groundAnchor2 = new b2Vec2;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_J = new b2Jacobian
    };
    b2GearJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2GearJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2GearJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x, inv_dt * this.m_impulse * this.m_J.linearB.y)
    };
    b2GearJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        var tMat = this.m_bodyB.m_xf.R;
        var rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
        var rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
        var tX = tMat.col1.x * rX + tMat.col2.x * rY;
        rY = tMat.col1.y * rX + tMat.col2.y * rY;
        rX = tX;
        var PX = this.m_impulse * this.m_J.linearB.x;
        var PY = this.m_impulse * this.m_J.linearB.y;
        return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX)
    };
    b2GearJoint.prototype.GetRatio = function() {
        return this.m_ratio
    };
    b2GearJoint.prototype.SetRatio = function(ratio) {
        if (ratio === undefined) ratio = 0;
        this.m_ratio = ratio
    };
    b2GearJoint.prototype.b2GearJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        var type1 = parseInt(def.joint1.m_type);
        var type2 = parseInt(def.joint2.m_type);
        this.m_revolute1 = null;
        this.m_prismatic1 = null;
        this.m_revolute2 = null;
        this.m_prismatic2 = null;
        var coordinate1 = 0;
        var coordinate2 = 0;
        this.m_ground1 = def.joint1.GetBodyA();
        this.m_bodyA = def.joint1.GetBodyB();
        if (type1 == b2Joint.e_revoluteJoint) {
            this.m_revolute1 = def.joint1 instanceof b2RevoluteJoint ? def.joint1 : null;
            this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
            this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
            coordinate1 = this.m_revolute1.GetJointAngle()
        } else {
            this.m_prismatic1 = def.joint1 instanceof b2PrismaticJoint ? def.joint1 : null;
            this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
            this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
            coordinate1 = this.m_prismatic1.GetJointTranslation()
        }
        this.m_ground2 = def.joint2.GetBodyA();
        this.m_bodyB = def.joint2.GetBodyB();
        if (type2 == b2Joint.e_revoluteJoint) {
            this.m_revolute2 = def.joint2 instanceof b2RevoluteJoint ? def.joint2 : null;
            this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
            this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
            coordinate2 = this.m_revolute2.GetJointAngle()
        } else {
            this.m_prismatic2 = def.joint2 instanceof b2PrismaticJoint ? def.joint2 : null;
            this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
            this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
            coordinate2 = this.m_prismatic2.GetJointTranslation()
        }
        this.m_ratio = def.ratio;
        this.m_constant = coordinate1 + this.m_ratio * coordinate2;
        this.m_impulse = 0
    };
    b2GearJoint.prototype.InitVelocityConstraints = function(step) {
        var g1 = this.m_ground1;
        var g2 = this.m_ground2;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var ugX = 0;
        var ugY = 0;
        var rX = 0;
        var rY = 0;
        var tMat;
        var tVec;
        var crug = 0;
        var tX = 0;
        var K = 0;
        this.m_J.SetZero();
        if (this.m_revolute1) {
            this.m_J.angularA = -1;
            K += bA.m_invI
        } else {
            tMat = g1.m_xf.R;
            tVec = this.m_prismatic1.m_localXAxis1;
            ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tMat = bA.m_xf.R;
            rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
            rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
            tX = tMat.col1.x * rX + tMat.col2.x * rY;
            rY = tMat.col1.y * rX + tMat.col2.y * rY;
            rX = tX;
            crug = rX * ugY - rY * ugX;
            this.m_J.linearA.Set(-ugX, -ugY);
            this.m_J.angularA = -crug;
            K += bA.m_invMass + bA.m_invI * crug * crug
        }
        if (this.m_revolute2) {
            this.m_J.angularB = -this.m_ratio;
            K += this.m_ratio * this.m_ratio * bB.m_invI
        } else {
            tMat = g2.m_xf.R;
            tVec = this.m_prismatic2.m_localXAxis1;
            ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tMat = bB.m_xf.R;
            rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
            rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
            tX = tMat.col1.x * rX + tMat.col2.x * rY;
            rY = tMat.col1.y * rX + tMat.col2.y * rY;
            rX = tX;
            crug = rX * ugY - rY * ugX;
            this.m_J.linearB.Set(-this.m_ratio * ugX, -this.m_ratio * ugY);
            this.m_J.angularB = -this.m_ratio * crug;
            K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug)
        }
        this.m_mass = K > 0 ? 1 / K : 0;
        if (step.warmStarting) {
            bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
            bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
            bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
            bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
            bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
            bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB
        } else this.m_impulse = 0
    };
    b2GearJoint.prototype.SolveVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var Cdot = this.m_J.Compute(bA.m_linearVelocity, bA.m_angularVelocity, bB.m_linearVelocity, bB.m_angularVelocity);
        var impulse = -this.m_mass * Cdot;
        this.m_impulse += impulse;
        bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
        bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
        bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
        bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
        bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
        bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB
    };
    b2GearJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var linearError = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var coordinate1 = 0;
        var coordinate2 = 0;
        if (this.m_revolute1) coordinate1 = this.m_revolute1.GetJointAngle();
        else coordinate1 = this.m_prismatic1.GetJointTranslation();
        if (this.m_revolute2) coordinate2 = this.m_revolute2.GetJointAngle();
        else coordinate2 = this.m_prismatic2.GetJointTranslation();
        var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
        var impulse = -this.m_mass * C;
        bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
        bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
        bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
        bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
        bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
        bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return linearError < b2Settings.b2_linearSlop
    };
    Box2D.inherit(b2GearJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2GearJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2GearJointDef.b2GearJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
    };
    b2GearJointDef.prototype.b2GearJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_gearJoint;
        this.joint1 = null;
        this.joint2 = null;
        this.ratio = 1
    };
    b2Jacobian.b2Jacobian = function() {
        this.linearA = new b2Vec2;
        this.linearB = new b2Vec2
    };
    b2Jacobian.prototype.SetZero = function() {
        this.linearA.SetZero();
        this.angularA = 0;
        this.linearB.SetZero();
        this.angularB = 0
    };
    b2Jacobian.prototype.Set = function(x1, a1, x2, a2) {
        if (a1 === undefined) a1 = 0;
        if (a2 === undefined) a2 = 0;
        this.linearA.SetV(x1);
        this.angularA = a1;
        this.linearB.SetV(x2);
        this.angularB = a2
    };
    b2Jacobian.prototype.Compute = function(x1, a1, x2, a2) {
        if (a1 === undefined) a1 = 0;
        if (a2 === undefined) a2 = 0;
        return this.linearA.x * x1.x + this.linearA.y * x1.y + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2
    };
    b2Joint.b2Joint = function() {
        this.m_edgeA = new b2JointEdge;
        this.m_edgeB = new b2JointEdge;
        this.m_localCenterA = new b2Vec2;
        this.m_localCenterB = new b2Vec2
    };
    b2Joint.prototype.GetType = function() {
        return this.m_type
    };
    b2Joint.prototype.GetAnchorA = function() {
        return null
    };
    b2Joint.prototype.GetAnchorB = function() {
        return null
    };
    b2Joint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return null
    };
    b2Joint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0
    };
    b2Joint.prototype.GetBodyA = function() {
        return this.m_bodyA
    };
    b2Joint.prototype.GetBodyB = function() {
        return this.m_bodyB
    };
    b2Joint.prototype.GetNext = function() {
        return this.m_next
    };
    b2Joint.prototype.GetUserData = function() {
        return this.m_userData
    };
    b2Joint.prototype.SetUserData = function(data) {
        this.m_userData = data
    };
    b2Joint.prototype.IsActive = function() {
        return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
    };
    b2Joint.Create = function(def, allocator) {
        var joint = null;
        switch (def.type) {
            case b2Joint.e_distanceJoint:
                joint = new b2DistanceJoint(def instanceof b2DistanceJointDef ? def : null);
                break;
            case b2Joint.e_mouseJoint:
                joint = new b2MouseJoint(def instanceof b2MouseJointDef ? def : null);
                break;
            case b2Joint.e_prismaticJoint:
                joint = new b2PrismaticJoint(def instanceof b2PrismaticJointDef ? def : null);
                break;
            case b2Joint.e_revoluteJoint:
                joint = new b2RevoluteJoint(def instanceof b2RevoluteJointDef ? def : null);
                break;
            case b2Joint.e_pulleyJoint:
                joint = new b2PulleyJoint(def instanceof b2PulleyJointDef ? def : null);
                break;
            case b2Joint.e_gearJoint:
                joint = new b2GearJoint(def instanceof b2GearJointDef ? def : null);
                break;
            case b2Joint.e_lineJoint:
                joint = new b2LineJoint(def instanceof b2LineJointDef ? def : null);
                break;
            case b2Joint.e_weldJoint:
                joint = new b2WeldJoint(def instanceof b2WeldJointDef ? def : null);
                break;
            case b2Joint.e_frictionJoint:
                joint = new b2FrictionJoint(def instanceof b2FrictionJointDef ? def : null);
                break;
            default:
                break
        }
        return joint
    };
    b2Joint.Destroy = function(joint, allocator) {};
    b2Joint.prototype.b2Joint = function(def) {
        b2Settings.b2Assert(def.bodyA != def.bodyB);
        this.m_type = def.type;
        this.m_prev = null;
        this.m_next = null;
        this.m_bodyA = def.bodyA;
        this.m_bodyB = def.bodyB;
        this.m_collideConnected = def.collideConnected;
        this.m_islandFlag = false;
        this.m_userData = def.userData
    };
    b2Joint.prototype.InitVelocityConstraints = function(step) {};
    b2Joint.prototype.SolveVelocityConstraints = function(step) {};
    b2Joint.prototype.FinalizeVelocityConstraints = function() {};
    b2Joint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        return false
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
        Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
        Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
        Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
        Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
        Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
        Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
        Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
        Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
        Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
        Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
        Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
        Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
        Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
    });
    b2JointDef.b2JointDef = function() {};
    b2JointDef.prototype.b2JointDef = function() {
        this.type = b2Joint.e_unknownJoint;
        this.userData = null;
        this.bodyA = null;
        this.bodyB = null;
        this.collideConnected = false
    };
    b2JointEdge.b2JointEdge = function() {};
    Box2D.inherit(b2LineJoint, Box2D.Dynamics.Joints.b2Joint);
    b2LineJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2LineJoint.b2LineJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_localXAxis1 = new b2Vec2;
        this.m_localYAxis1 = new b2Vec2;
        this.m_axis = new b2Vec2;
        this.m_perp = new b2Vec2;
        this.m_K = new b2Mat22;
        this.m_impulse = new b2Vec2
    };
    b2LineJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2LineJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2LineJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
    };
    b2LineJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.y
    };
    b2LineJoint.prototype.GetJointTranslation = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        var p1 = bA.GetWorldPoint(this.m_localAnchor1);
        var p2 = bB.GetWorldPoint(this.m_localAnchor2);
        var dX = p2.x - p1.x;
        var dY = p2.y - p1.y;
        var axis = bA.GetWorldVector(this.m_localXAxis1);
        var translation = axis.x * dX + axis.y * dY;
        return translation
    };
    b2LineJoint.prototype.GetJointSpeed = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var p1X = bA.m_sweep.c.x + r1X;
        var p1Y = bA.m_sweep.c.y + r1Y;
        var p2X = bB.m_sweep.c.x + r2X;
        var p2Y = bB.m_sweep.c.y + r2Y;
        var dX = p2X - p1X;
        var dY = p2Y - p1Y;
        var axis = bA.GetWorldVector(this.m_localXAxis1);
        var v1 = bA.m_linearVelocity;
        var v2 = bB.m_linearVelocity;
        var w1 = bA.m_angularVelocity;
        var w2 = bB.m_angularVelocity;
        var speed = dX * (-w1 * axis.y) + dY * (w1 * axis.x) + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
        return speed
    };
    b2LineJoint.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    b2LineJoint.prototype.EnableLimit = function(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableLimit = flag
    };
    b2LineJoint.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    b2LineJoint.prototype.GetUpperLimit = function() {
        return this.m_upperTranslation
    };
    b2LineJoint.prototype.SetLimits = function(lower, upper) {
        if (lower === undefined) lower = 0;
        if (upper === undefined) upper = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_lowerTranslation = lower;
        this.m_upperTranslation = upper
    };
    b2LineJoint.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    b2LineJoint.prototype.EnableMotor = function(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableMotor = flag
    };
    b2LineJoint.prototype.SetMotorSpeed = function(speed) {
        if (speed === undefined) speed = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_motorSpeed = speed
    };
    b2LineJoint.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    b2LineJoint.prototype.SetMaxMotorForce = function(force) {
        if (force === undefined) force = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_maxMotorForce = force
    };
    b2LineJoint.prototype.GetMaxMotorForce = function() {
        return this.m_maxMotorForce
    };
    b2LineJoint.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    b2LineJoint.prototype.b2LineJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        var tMat;
        var tX = 0;
        var tY = 0;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_localXAxis1.SetV(def.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_impulse.SetZero();
        this.m_motorMass = 0;
        this.m_motorImpulse = 0;
        this.m_lowerTranslation = def.lowerTranslation;
        this.m_upperTranslation = def.upperTranslation;
        this.m_maxMotorForce = def.maxMotorForce;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
        this.m_limitState = b2Joint.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    b2LineJoint.prototype.InitVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        var tX = 0;
        this.m_localCenterA.SetV(bA.GetLocalCenter());
        this.m_localCenterB.SetV(bB.GetLocalCenter());
        var xf1 = bA.GetTransform();
        var xf2 = bB.GetTransform();
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        this.m_invMassA = bA.m_invMass;
        this.m_invMassB = bB.m_invMass;
        this.m_invIA = bA.m_invI;
        this.m_invIB = bB.m_invI;
        this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
        this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
        this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
        this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
        this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
        this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
        var m1 = this.m_invMassA;
        var m2 = this.m_invMassB;
        var i1 = this.m_invIA;
        var i2 = this.m_invIB;
        this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
        this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
        if (this.m_enableLimit) {
            var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
            if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) this.m_limitState = b2Joint.e_equalLimits;
            else if (jointTransition <= this.m_lowerTranslation) {
                if (this.m_limitState != b2Joint.e_atLowerLimit) {
                    this.m_limitState = b2Joint.e_atLowerLimit;
                    this.m_impulse.y = 0
                }
            } else if (jointTransition >= this.m_upperTranslation) {
                if (this.m_limitState != b2Joint.e_atUpperLimit) {
                    this.m_limitState = b2Joint.e_atUpperLimit;
                    this.m_impulse.y = 0
                }
            } else {
                this.m_limitState = b2Joint.e_inactiveLimit;
                this.m_impulse.y = 0
            }
        } else this.m_limitState = b2Joint.e_inactiveLimit;
        if (this.m_enableMotor == false) this.m_motorImpulse = 0;
        if (step.warmStarting) {
            this.m_impulse.x *= step.dtRatio;
            this.m_impulse.y *= step.dtRatio;
            this.m_motorImpulse *= step.dtRatio;
            var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
            var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
            var L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
            var L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
            bA.m_linearVelocity.x -= this.m_invMassA * PX;
            bA.m_linearVelocity.y -= this.m_invMassA * PY;
            bA.m_angularVelocity -= this.m_invIA * L1;
            bB.m_linearVelocity.x += this.m_invMassB * PX;
            bB.m_linearVelocity.y += this.m_invMassB * PY;
            bB.m_angularVelocity += this.m_invIB * L2
        } else {
            this.m_impulse.SetZero();
            this.m_motorImpulse = 0
        }
    };
    b2LineJoint.prototype.SolveVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var v1 = bA.m_linearVelocity;
        var w1 = bA.m_angularVelocity;
        var v2 = bB.m_linearVelocity;
        var w2 = bB.m_angularVelocity;
        var PX = 0;
        var PY = 0;
        var L1 = 0;
        var L2 = 0;
        if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
            var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
            var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
            var oldImpulse = this.m_motorImpulse;
            var maxImpulse = step.dt * this.m_maxMotorForce;
            this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            PX = impulse * this.m_axis.x;
            PY = impulse * this.m_axis.y;
            L1 = impulse * this.m_a1;
            L2 = impulse * this.m_a2;
            v1.x -= this.m_invMassA * PX;
            v1.y -= this.m_invMassA * PY;
            w1 -= this.m_invIA * L1;
            v2.x += this.m_invMassB * PX;
            v2.y += this.m_invMassB * PY;
            w2 += this.m_invIB * L2
        }
        var Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
            var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
            var f1 = this.m_impulse.Copy();
            var df = this.m_K.Solve(new b2Vec2, -Cdot1, -Cdot2);
            this.m_impulse.Add(df);
            if (this.m_limitState == b2Joint.e_atLowerLimit) this.m_impulse.y = b2Math.Max(this.m_impulse.y, 0);
            else if (this.m_limitState == b2Joint.e_atUpperLimit) this.m_impulse.y = b2Math.Min(this.m_impulse.y, 0);
            var b = -Cdot1 - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
            var f2r = 0;
            if (this.m_K.col1.x != 0) f2r = b / this.m_K.col1.x + f1.x;
            else f2r = f1.x;
            this.m_impulse.x = f2r;
            df.x = this.m_impulse.x - f1.x;
            df.y = this.m_impulse.y - f1.y;
            PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
            PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
            L1 = df.x * this.m_s1 + df.y * this.m_a1;
            L2 = df.x * this.m_s2 + df.y * this.m_a2;
            v1.x -= this.m_invMassA * PX;
            v1.y -= this.m_invMassA * PY;
            w1 -= this.m_invIA * L1;
            v2.x += this.m_invMassB * PX;
            v2.y += this.m_invMassB * PY;
            w2 += this.m_invIB * L2
        } else {
            var df2 = 0;
            if (this.m_K.col1.x != 0) df2 = -Cdot1 / this.m_K.col1.x;
            else df2 = 0;
            this.m_impulse.x += df2;
            PX = df2 * this.m_perp.x;
            PY = df2 * this.m_perp.y;
            L1 = df2 * this.m_s1;
            L2 = df2 * this.m_s2;
            v1.x -= this.m_invMassA * PX;
            v1.y -= this.m_invMassA * PY;
            w1 -= this.m_invIA * L1;
            v2.x += this.m_invMassB * PX;
            v2.y += this.m_invMassB * PY;
            w2 += this.m_invIB * L2
        }
        bA.m_linearVelocity.SetV(v1);
        bA.m_angularVelocity = w1;
        bB.m_linearVelocity.SetV(v2);
        bB.m_angularVelocity = w2
    };
    b2LineJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var limitC = 0;
        var oldLimitImpulse = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var c1 = bA.m_sweep.c;
        var a1 = bA.m_sweep.a;
        var c2 = bB.m_sweep.c;
        var a2 = bB.m_sweep.a;
        var tMat;
        var tX = 0;
        var m1 = 0;
        var m2 = 0;
        var i1 = 0;
        var i2 = 0;
        var linearError = 0;
        var angularError = 0;
        var active = false;
        var C2 = 0;
        var R1 = b2Mat22.FromAngle(a1);
        var R2 = b2Mat22.FromAngle(a2);
        tMat = R1;
        var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = R2;
        var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var dX = c2.x + r2X - c1.x - r1X;
        var dY = c2.y + r2Y - c1.y - r1Y;
        if (this.m_enableLimit) {
            this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
            this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
            this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
            var translation = this.m_axis.x * dX + this.m_axis.y * dY;
            if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
                C2 = b2Math.Clamp(translation, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
                linearError = b2Math.Abs(translation);
                active = true
            } else if (translation <= this.m_lowerTranslation) {
                C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                linearError = this.m_lowerTranslation - translation;
                active = true
            } else if (translation >= this.m_upperTranslation) {
                C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
                linearError = translation - this.m_upperTranslation;
                active = true
            }
        }
        this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
        this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
        this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
        var impulse = new b2Vec2;
        var C1 = this.m_perp.x * dX + this.m_perp.y * dY;
        linearError = b2Math.Max(linearError, b2Math.Abs(C1));
        angularError = 0;
        if (active) {
            m1 = this.m_invMassA;
            m2 = this.m_invMassB;
            i1 = this.m_invIA;
            i2 = this.m_invIB;
            this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
            this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
            this.m_K.col2.x = this.m_K.col1.y;
            this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
            this.m_K.Solve(impulse, -C1, -C2)
        } else {
            m1 = this.m_invMassA;
            m2 = this.m_invMassB;
            i1 = this.m_invIA;
            i2 = this.m_invIB;
            var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
            var impulse1 = 0;
            if (k11 != 0) impulse1 = -C1 / k11;
            else impulse1 = 0;
            impulse.x = impulse1;
            impulse.y = 0
        }
        var PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
        var PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
        var L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
        var L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
        c1.x -= this.m_invMassA * PX;
        c1.y -= this.m_invMassA * PY;
        a1 -= this.m_invIA * L1;
        c2.x += this.m_invMassB * PX;
        c2.y += this.m_invMassB * PY;
        a2 += this.m_invIB * L2;
        bA.m_sweep.a = a1;
        bB.m_sweep.a = a2;
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
    };
    Box2D.inherit(b2LineJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2LineJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2LineJointDef.b2LineJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2;
        this.localAnchorB = new b2Vec2;
        this.localAxisA = new b2Vec2
    };
    b2LineJointDef.prototype.b2LineJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_lineJoint;
        this.localAxisA.Set(1, 0);
        this.enableLimit = false;
        this.lowerTranslation = 0;
        this.upperTranslation = 0;
        this.enableMotor = false;
        this.maxMotorForce = 0;
        this.motorSpeed = 0
    };
    b2LineJointDef.prototype.Initialize = function(bA, bB, anchor, axis) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
        this.localAxisA = this.bodyA.GetLocalVector(axis)
    };
    Box2D.inherit(b2MouseJoint, Box2D.Dynamics.Joints.b2Joint);
    b2MouseJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2MouseJoint.b2MouseJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new b2Mat22;
        this.K1 = new b2Mat22;
        this.K2 = new b2Mat22;
        this.m_localAnchor = new b2Vec2;
        this.m_target = new b2Vec2;
        this.m_impulse = new b2Vec2;
        this.m_mass = new b2Mat22;
        this.m_C = new b2Vec2
    };
    b2MouseJoint.prototype.GetAnchorA = function() {
        return this.m_target
    };
    b2MouseJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    };
    b2MouseJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
    };
    b2MouseJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0
    };
    b2MouseJoint.prototype.GetTarget = function() {
        return this.m_target
    };
    b2MouseJoint.prototype.SetTarget = function(target) {
        if (this.m_bodyB.IsAwake() == false) this.m_bodyB.SetAwake(true);
        this.m_target = target
    };
    b2MouseJoint.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    b2MouseJoint.prototype.SetMaxForce = function(maxForce) {
        if (maxForce === undefined) maxForce = 0;
        this.m_maxForce = maxForce
    };
    b2MouseJoint.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    b2MouseJoint.prototype.SetFrequency = function(hz) {
        if (hz === undefined) hz = 0;
        this.m_frequencyHz = hz
    };
    b2MouseJoint.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    b2MouseJoint.prototype.SetDampingRatio = function(ratio) {
        if (ratio === undefined) ratio = 0;
        this.m_dampingRatio = ratio
    };
    b2MouseJoint.prototype.b2MouseJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        this.m_target.SetV(def.target);
        var tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
        var tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
        var tMat = this.m_bodyB.m_xf.R;
        this.m_localAnchor.x = tX * tMat.col1.x + tY * tMat.col1.y;
        this.m_localAnchor.y = tX * tMat.col2.x + tY * tMat.col2.y;
        this.m_maxForce = def.maxForce;
        this.m_impulse.SetZero();
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_beta = 0;
        this.m_gamma = 0
    };
    b2MouseJoint.prototype.InitVelocityConstraints = function(step) {
        var b = this.m_bodyB;
        var mass = b.GetMass();
        var omega = 2 * Math.PI * this.m_frequencyHz;
        var d = 2 * mass * this.m_dampingRatio * omega;
        var k = mass * omega * omega;
        this.m_gamma = step.dt * (d + step.dt * k);
        this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
        this.m_beta = step.dt * k * this.m_gamma;
        var tMat;
        tMat = b.m_xf.R;
        var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
        var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
        var tX = tMat.col1.x * rX + tMat.col2.x * rY;
        rY = tMat.col1.y * rX + tMat.col2.y * rY;
        rX = tX;
        var invMass = b.m_invMass;
        var invI = b.m_invI;
        this.K1.col1.x = invMass;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = invMass;
        this.K2.col1.x = invI * rY * rY;
        this.K2.col2.x = -invI * rX * rY;
        this.K2.col1.y = -invI * rX * rY;
        this.K2.col2.y = invI * rX * rX;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.col1.x += this.m_gamma;
        this.K.col2.y += this.m_gamma;
        this.K.GetInverse(this.m_mass);
        this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
        this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
        b.m_angularVelocity *= 0.98;
        this.m_impulse.x *= step.dtRatio;
        this.m_impulse.y *= step.dtRatio;
        b.m_linearVelocity.x += invMass * this.m_impulse.x;
        b.m_linearVelocity.y += invMass * this.m_impulse.y;
        b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x)
    };
    b2MouseJoint.prototype.SolveVelocityConstraints = function(step) {
        var b = this.m_bodyB;
        var tMat;
        var tX = 0;
        var tY = 0;
        tMat = b.m_xf.R;
        var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
        var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
        tX = tMat.col1.x * rX + tMat.col2.x * rY;
        rY = tMat.col1.y * rX + tMat.col2.y * rY;
        rX = tX;
        var CdotX = b.m_linearVelocity.x + -b.m_angularVelocity * rY;
        var CdotY = b.m_linearVelocity.y + b.m_angularVelocity * rX;
        tMat = this.m_mass;
        tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
        tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
        var impulseX = -(tMat.col1.x * tX + tMat.col2.x * tY);
        var impulseY = -(tMat.col1.y * tX + tMat.col2.y * tY);
        var oldImpulseX = this.m_impulse.x;
        var oldImpulseY = this.m_impulse.y;
        this.m_impulse.x += impulseX;
        this.m_impulse.y += impulseY;
        var maxImpulse = step.dt * this.m_maxForce;
        if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length());
        impulseX = this.m_impulse.x - oldImpulseX;
        impulseY = this.m_impulse.y - oldImpulseY;
        b.m_linearVelocity.x += b.m_invMass * impulseX;
        b.m_linearVelocity.y += b.m_invMass * impulseY;
        b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX)
    };
    b2MouseJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        return true
    };
    Box2D.inherit(b2MouseJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2MouseJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2MouseJointDef.b2MouseJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.target = new b2Vec2
    };
    b2MouseJointDef.prototype.b2MouseJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_mouseJoint;
        this.maxForce = 0;
        this.frequencyHz = 5;
        this.dampingRatio = 0.7
    };
    Box2D.inherit(b2PrismaticJoint, Box2D.Dynamics.Joints.b2Joint);
    b2PrismaticJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2PrismaticJoint.b2PrismaticJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_localXAxis1 = new b2Vec2;
        this.m_localYAxis1 = new b2Vec2;
        this.m_axis = new b2Vec2;
        this.m_perp = new b2Vec2;
        this.m_K = new b2Mat33;
        this.m_impulse = new b2Vec3
    };
    b2PrismaticJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2PrismaticJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2PrismaticJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
    };
    b2PrismaticJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.y
    };
    b2PrismaticJoint.prototype.GetJointTranslation = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        var p1 = bA.GetWorldPoint(this.m_localAnchor1);
        var p2 = bB.GetWorldPoint(this.m_localAnchor2);
        var dX = p2.x - p1.x;
        var dY = p2.y - p1.y;
        var axis = bA.GetWorldVector(this.m_localXAxis1);
        var translation = axis.x * dX + axis.y * dY;
        return translation
    };
    b2PrismaticJoint.prototype.GetJointSpeed = function() {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var p1X = bA.m_sweep.c.x + r1X;
        var p1Y = bA.m_sweep.c.y + r1Y;
        var p2X = bB.m_sweep.c.x + r2X;
        var p2Y = bB.m_sweep.c.y + r2Y;
        var dX = p2X - p1X;
        var dY = p2Y - p1Y;
        var axis = bA.GetWorldVector(this.m_localXAxis1);
        var v1 = bA.m_linearVelocity;
        var v2 = bB.m_linearVelocity;
        var w1 = bA.m_angularVelocity;
        var w2 = bB.m_angularVelocity;
        var speed = dX * (-w1 * axis.y) + dY * (w1 * axis.x) + (axis.x * (v2.x + -w2 * r2Y - v1.x - -w1 * r1Y) + axis.y * (v2.y + w2 * r2X - v1.y - w1 * r1X));
        return speed
    };
    b2PrismaticJoint.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    b2PrismaticJoint.prototype.EnableLimit = function(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableLimit = flag
    };
    b2PrismaticJoint.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    b2PrismaticJoint.prototype.GetUpperLimit = function() {
        return this.m_upperTranslation
    };
    b2PrismaticJoint.prototype.SetLimits = function(lower, upper) {
        if (lower === undefined) lower = 0;
        if (upper === undefined) upper = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_lowerTranslation = lower;
        this.m_upperTranslation = upper
    };
    b2PrismaticJoint.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    b2PrismaticJoint.prototype.EnableMotor = function(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableMotor = flag
    };
    b2PrismaticJoint.prototype.SetMotorSpeed = function(speed) {
        if (speed === undefined) speed = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_motorSpeed = speed
    };
    b2PrismaticJoint.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    b2PrismaticJoint.prototype.SetMaxMotorForce = function(force) {
        if (force === undefined) force = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_maxMotorForce = force
    };
    b2PrismaticJoint.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    b2PrismaticJoint.prototype.b2PrismaticJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        var tMat;
        var tX = 0;
        var tY = 0;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_localXAxis1.SetV(def.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_refAngle = def.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorMass = 0;
        this.m_motorImpulse = 0;
        this.m_lowerTranslation = def.lowerTranslation;
        this.m_upperTranslation = def.upperTranslation;
        this.m_maxMotorForce = def.maxMotorForce;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
        this.m_limitState = b2Joint.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    b2PrismaticJoint.prototype.InitVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        var tX = 0;
        this.m_localCenterA.SetV(bA.GetLocalCenter());
        this.m_localCenterB.SetV(bB.GetLocalCenter());
        var xf1 = bA.GetTransform();
        var xf2 = bB.GetTransform();
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        this.m_invMassA = bA.m_invMass;
        this.m_invMassB = bB.m_invMass;
        this.m_invIA = bA.m_invI;
        this.m_invIB = bB.m_invI;
        this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
        this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
        this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        if (this.m_motorMass > Number.MIN_VALUE) this.m_motorMass = 1 / this.m_motorMass;
        this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
        this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
        this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
        var m1 = this.m_invMassA;
        var m2 = this.m_invMassB;
        var i1 = this.m_invIA;
        var i2 = this.m_invIB;
        this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
        this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
        this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = i1 + i2;
        this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
        this.m_K.col3.x = this.m_K.col1.z;
        this.m_K.col3.y = this.m_K.col2.z;
        this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
        if (this.m_enableLimit) {
            var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
            if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) this.m_limitState = b2Joint.e_equalLimits;
            else if (jointTransition <= this.m_lowerTranslation) {
                if (this.m_limitState != b2Joint.e_atLowerLimit) {
                    this.m_limitState = b2Joint.e_atLowerLimit;
                    this.m_impulse.z = 0
                }
            } else if (jointTransition >= this.m_upperTranslation) {
                if (this.m_limitState != b2Joint.e_atUpperLimit) {
                    this.m_limitState = b2Joint.e_atUpperLimit;
                    this.m_impulse.z = 0
                }
            } else {
                this.m_limitState = b2Joint.e_inactiveLimit;
                this.m_impulse.z = 0
            }
        } else this.m_limitState = b2Joint.e_inactiveLimit;
        if (this.m_enableMotor == false) this.m_motorImpulse = 0;
        if (step.warmStarting) {
            this.m_impulse.x *= step.dtRatio;
            this.m_impulse.y *= step.dtRatio;
            this.m_motorImpulse *= step.dtRatio;
            var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
            var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
            var L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
            var L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
            bA.m_linearVelocity.x -= this.m_invMassA * PX;
            bA.m_linearVelocity.y -= this.m_invMassA * PY;
            bA.m_angularVelocity -= this.m_invIA * L1;
            bB.m_linearVelocity.x += this.m_invMassB * PX;
            bB.m_linearVelocity.y += this.m_invMassB * PY;
            bB.m_angularVelocity += this.m_invIB * L2
        } else {
            this.m_impulse.SetZero();
            this.m_motorImpulse = 0
        }
    };
    b2PrismaticJoint.prototype.SolveVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var v1 = bA.m_linearVelocity;
        var w1 = bA.m_angularVelocity;
        var v2 = bB.m_linearVelocity;
        var w2 = bB.m_angularVelocity;
        var PX = 0;
        var PY = 0;
        var L1 = 0;
        var L2 = 0;
        if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
            var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
            var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
            var oldImpulse = this.m_motorImpulse;
            var maxImpulse = step.dt * this.m_maxMotorForce;
            this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            PX = impulse * this.m_axis.x;
            PY = impulse * this.m_axis.y;
            L1 = impulse * this.m_a1;
            L2 = impulse * this.m_a2;
            v1.x -= this.m_invMassA * PX;
            v1.y -= this.m_invMassA * PY;
            w1 -= this.m_invIA * L1;
            v2.x += this.m_invMassB * PX;
            v2.y += this.m_invMassB * PY;
            w2 += this.m_invIB * L2
        }
        var Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
        var Cdot1Y = w2 - w1;
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
            var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
            var f1 = this.m_impulse.Copy();
            var df = this.m_K.Solve33(new b2Vec3, -Cdot1X, -Cdot1Y, -Cdot2);
            this.m_impulse.Add(df);
            if (this.m_limitState == b2Joint.e_atLowerLimit) this.m_impulse.z = b2Math.Max(this.m_impulse.z, 0);
            else if (this.m_limitState == b2Joint.e_atUpperLimit) this.m_impulse.z = b2Math.Min(this.m_impulse.z, 0);
            var bX = -Cdot1X - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
            var bY = -Cdot1Y - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
            var f2r = this.m_K.Solve22(new b2Vec2, bX, bY);
            f2r.x += f1.x;
            f2r.y += f1.y;
            this.m_impulse.x = f2r.x;
            this.m_impulse.y = f2r.y;
            df.x = this.m_impulse.x - f1.x;
            df.y = this.m_impulse.y - f1.y;
            df.z = this.m_impulse.z - f1.z;
            PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
            PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
            L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
            L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
            v1.x -= this.m_invMassA * PX;
            v1.y -= this.m_invMassA * PY;
            w1 -= this.m_invIA * L1;
            v2.x += this.m_invMassB * PX;
            v2.y += this.m_invMassB * PY;
            w2 += this.m_invIB * L2
        } else {
            var df2 = this.m_K.Solve22(new b2Vec2, -Cdot1X, -Cdot1Y);
            this.m_impulse.x += df2.x;
            this.m_impulse.y += df2.y;
            PX = df2.x * this.m_perp.x;
            PY = df2.x * this.m_perp.y;
            L1 = df2.x * this.m_s1 + df2.y;
            L2 = df2.x * this.m_s2 + df2.y;
            v1.x -= this.m_invMassA * PX;
            v1.y -= this.m_invMassA * PY;
            w1 -= this.m_invIA * L1;
            v2.x += this.m_invMassB * PX;
            v2.y += this.m_invMassB * PY;
            w2 += this.m_invIB * L2
        }
        bA.m_linearVelocity.SetV(v1);
        bA.m_angularVelocity = w1;
        bB.m_linearVelocity.SetV(v2);
        bB.m_angularVelocity = w2
    };
    b2PrismaticJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var limitC = 0;
        var oldLimitImpulse = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var c1 = bA.m_sweep.c;
        var a1 = bA.m_sweep.a;
        var c2 = bB.m_sweep.c;
        var a2 = bB.m_sweep.a;
        var tMat;
        var tX = 0;
        var m1 = 0;
        var m2 = 0;
        var i1 = 0;
        var i2 = 0;
        var linearError = 0;
        var angularError = 0;
        var active = false;
        var C2 = 0;
        var R1 = b2Mat22.FromAngle(a1);
        var R2 = b2Mat22.FromAngle(a2);
        tMat = R1;
        var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = R2;
        var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var dX = c2.x + r2X - c1.x - r1X;
        var dY = c2.y + r2Y - c1.y - r1Y;
        if (this.m_enableLimit) {
            this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
            this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
            this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
            var translation = this.m_axis.x * dX + this.m_axis.y * dY;
            if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
                C2 = b2Math.Clamp(translation, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
                linearError = b2Math.Abs(translation);
                active = true
            } else if (translation <= this.m_lowerTranslation) {
                C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                linearError = this.m_lowerTranslation - translation;
                active = true
            } else if (translation >= this.m_upperTranslation) {
                C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
                linearError = translation - this.m_upperTranslation;
                active = true
            }
        }
        this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
        this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
        this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
        var impulse = new b2Vec3;
        var C1X = this.m_perp.x * dX + this.m_perp.y * dY;
        var C1Y = a2 - a1 - this.m_refAngle;
        linearError = b2Math.Max(linearError, b2Math.Abs(C1X));
        angularError = b2Math.Abs(C1Y);
        if (active) {
            m1 = this.m_invMassA;
            m2 = this.m_invMassB;
            i1 = this.m_invIA;
            i2 = this.m_invIB;
            this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
            this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
            this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
            this.m_K.col2.x = this.m_K.col1.y;
            this.m_K.col2.y = i1 + i2;
            this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
            this.m_K.col3.x = this.m_K.col1.z;
            this.m_K.col3.y = this.m_K.col2.z;
            this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
            this.m_K.Solve33(impulse, -C1X, -C1Y, -C2)
        } else {
            m1 = this.m_invMassA;
            m2 = this.m_invMassB;
            i1 = this.m_invIA;
            i2 = this.m_invIB;
            var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
            var k12 = i1 * this.m_s1 + i2 * this.m_s2;
            var k22 = i1 + i2;
            this.m_K.col1.Set(k11, k12, 0);
            this.m_K.col2.Set(k12, k22, 0);
            var impulse1 = this.m_K.Solve22(new b2Vec2, -C1X, -C1Y);
            impulse.x = impulse1.x;
            impulse.y = impulse1.y;
            impulse.z = 0
        }
        var PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
        var PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
        var L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
        var L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
        c1.x -= this.m_invMassA * PX;
        c1.y -= this.m_invMassA * PY;
        a1 -= this.m_invIA * L1;
        c2.x += this.m_invMassB * PX;
        c2.y += this.m_invMassB * PY;
        a2 += this.m_invIB * L2;
        bA.m_sweep.a = a1;
        bB.m_sweep.a = a2;
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
    };
    Box2D.inherit(b2PrismaticJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2PrismaticJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2PrismaticJointDef.b2PrismaticJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2;
        this.localAnchorB = new b2Vec2;
        this.localAxisA = new b2Vec2
    };
    b2PrismaticJointDef.prototype.b2PrismaticJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_prismaticJoint;
        this.localAxisA.Set(1, 0);
        this.referenceAngle = 0;
        this.enableLimit = false;
        this.lowerTranslation = 0;
        this.upperTranslation = 0;
        this.enableMotor = false;
        this.maxMotorForce = 0;
        this.motorSpeed = 0
    };
    b2PrismaticJointDef.prototype.Initialize = function(bA, bB, anchor, axis) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
        this.localAxisA = this.bodyA.GetLocalVector(axis);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(b2PulleyJoint, Box2D.Dynamics.Joints.b2Joint);
    b2PulleyJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2PulleyJoint.b2PulleyJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_groundAnchor1 = new b2Vec2;
        this.m_groundAnchor2 = new b2Vec2;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_u1 = new b2Vec2;
        this.m_u2 = new b2Vec2
    };
    b2PulleyJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2PulleyJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2PulleyJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse * this.m_u2.x, inv_dt * this.m_impulse * this.m_u2.y)
    };
    b2PulleyJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0
    };
    b2PulleyJoint.prototype.GetGroundAnchorA = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor1);
        return a
    };
    b2PulleyJoint.prototype.GetGroundAnchorB = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor2);
        return a
    };
    b2PulleyJoint.prototype.GetLength1 = function() {
        var p = this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
        var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
        var dX = p.x - sX;
        var dY = p.y - sY;
        return Math.sqrt(dX * dX + dY * dY)
    };
    b2PulleyJoint.prototype.GetLength2 = function() {
        var p = this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
        var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        var dX = p.x - sX;
        var dY = p.y - sY;
        return Math.sqrt(dX * dX + dY * dY)
    };
    b2PulleyJoint.prototype.GetRatio = function() {
        return this.m_ratio
    };
    b2PulleyJoint.prototype.b2PulleyJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        var tMat;
        var tX = 0;
        var tY = 0;
        this.m_ground = this.m_bodyA.m_world.m_groundBody;
        this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
        this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_ratio = def.ratio;
        this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
        this.m_maxLength1 = b2Math.Min(def.maxLengthA, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
        this.m_maxLength2 = b2Math.Min(def.maxLengthB, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
        this.m_impulse = 0;
        this.m_limitImpulse1 = 0;
        this.m_limitImpulse2 = 0
    };
    b2PulleyJoint.prototype.InitVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var p1X = bA.m_sweep.c.x + r1X;
        var p1Y = bA.m_sweep.c.y + r1Y;
        var p2X = bB.m_sweep.c.x + r2X;
        var p2Y = bB.m_sweep.c.y + r2Y;
        var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
        var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
        var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
        var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        this.m_u1.Set(p1X - s1X, p1Y - s1Y);
        this.m_u2.Set(p2X - s2X, p2Y - s2Y);
        var length1 = this.m_u1.Length();
        var length2 = this.m_u2.Length();
        if (length1 > b2Settings.b2_linearSlop) this.m_u1.Multiply(1 / length1);
        else this.m_u1.SetZero();
        if (length2 > b2Settings.b2_linearSlop) this.m_u2.Multiply(1 / length2);
        else this.m_u2.SetZero();
        var C = this.m_constant - length1 - this.m_ratio * length2;
        if (C > 0) {
            this.m_state = b2Joint.e_inactiveLimit;
            this.m_impulse = 0
        } else this.m_state = b2Joint.e_atUpperLimit;
        if (length1 < this.m_maxLength1) {
            this.m_limitState1 = b2Joint.e_inactiveLimit;
            this.m_limitImpulse1 = 0
        } else this.m_limitState1 = b2Joint.e_atUpperLimit;
        if (length2 < this.m_maxLength2) {
            this.m_limitState2 = b2Joint.e_inactiveLimit;
            this.m_limitImpulse2 = 0
        } else this.m_limitState2 = b2Joint.e_atUpperLimit;
        var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
        var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
        this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
        this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
        this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
        this.m_limitMass1 = 1 / this.m_limitMass1;
        this.m_limitMass2 = 1 / this.m_limitMass2;
        this.m_pulleyMass = 1 / this.m_pulleyMass;
        if (step.warmStarting) {
            this.m_impulse *= step.dtRatio;
            this.m_limitImpulse1 *= step.dtRatio;
            this.m_limitImpulse2 *= step.dtRatio;
            var P1X = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x;
            var P1Y = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y;
            var P2X = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x;
            var P2Y = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
            bA.m_linearVelocity.x += bA.m_invMass * P1X;
            bA.m_linearVelocity.y += bA.m_invMass * P1Y;
            bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
            bB.m_linearVelocity.x += bB.m_invMass * P2X;
            bB.m_linearVelocity.y += bB.m_invMass * P2Y;
            bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
        } else {
            this.m_impulse = 0;
            this.m_limitImpulse1 = 0;
            this.m_limitImpulse2 = 0
        }
    };
    b2PulleyJoint.prototype.SolveVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        var tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var v1X = 0;
        var v1Y = 0;
        var v2X = 0;
        var v2Y = 0;
        var P1X = 0;
        var P1Y = 0;
        var P2X = 0;
        var P2Y = 0;
        var Cdot = 0;
        var impulse = 0;
        var oldImpulse = 0;
        if (this.m_state == b2Joint.e_atUpperLimit) {
            v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
            v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
            v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
            v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
            Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
            impulse = this.m_pulleyMass * -Cdot;
            oldImpulse = this.m_impulse;
            this.m_impulse = b2Math.Max(0, this.m_impulse + impulse);
            impulse = this.m_impulse - oldImpulse;
            P1X = -impulse * this.m_u1.x;
            P1Y = -impulse * this.m_u1.y;
            P2X = -this.m_ratio * impulse * this.m_u2.x;
            P2Y = -this.m_ratio * impulse * this.m_u2.y;
            bA.m_linearVelocity.x += bA.m_invMass * P1X;
            bA.m_linearVelocity.y += bA.m_invMass * P1Y;
            bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
            bB.m_linearVelocity.x += bB.m_invMass * P2X;
            bB.m_linearVelocity.y += bB.m_invMass * P2Y;
            bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
        }
        if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
            v1X = bA.m_linearVelocity.x + -bA.m_angularVelocity * r1Y;
            v1Y = bA.m_linearVelocity.y + bA.m_angularVelocity * r1X;
            Cdot = -(this.m_u1.x * v1X + this.m_u1.y * v1Y);
            impulse = -this.m_limitMass1 * Cdot;
            oldImpulse = this.m_limitImpulse1;
            this.m_limitImpulse1 = b2Math.Max(0, this.m_limitImpulse1 + impulse);
            impulse = this.m_limitImpulse1 - oldImpulse;
            P1X = -impulse * this.m_u1.x;
            P1Y = -impulse * this.m_u1.y;
            bA.m_linearVelocity.x += bA.m_invMass * P1X;
            bA.m_linearVelocity.y += bA.m_invMass * P1Y;
            bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X)
        }
        if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
            v2X = bB.m_linearVelocity.x + -bB.m_angularVelocity * r2Y;
            v2Y = bB.m_linearVelocity.y + bB.m_angularVelocity * r2X;
            Cdot = -(this.m_u2.x * v2X + this.m_u2.y * v2Y);
            impulse = -this.m_limitMass2 * Cdot;
            oldImpulse = this.m_limitImpulse2;
            this.m_limitImpulse2 = b2Math.Max(0, this.m_limitImpulse2 + impulse);
            impulse = this.m_limitImpulse2 - oldImpulse;
            P2X = -impulse * this.m_u2.x;
            P2Y = -impulse * this.m_u2.y;
            bB.m_linearVelocity.x += bB.m_invMass * P2X;
            bB.m_linearVelocity.y += bB.m_invMass * P2Y;
            bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X)
        }
    };
    b2PulleyJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
        var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
        var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
        var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        var r1X = 0;
        var r1Y = 0;
        var r2X = 0;
        var r2Y = 0;
        var p1X = 0;
        var p1Y = 0;
        var p2X = 0;
        var p2Y = 0;
        var length1 = 0;
        var length2 = 0;
        var C = 0;
        var impulse = 0;
        var oldImpulse = 0;
        var oldLimitPositionImpulse = 0;
        var tX = 0;
        var linearError = 0;
        if (this.m_state == b2Joint.e_atUpperLimit) {
            tMat = bA.m_xf.R;
            r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
            r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
            tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
            r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
            r1X = tX;
            tMat = bB.m_xf.R;
            r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
            r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
            tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
            r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
            r2X = tX;
            p1X = bA.m_sweep.c.x + r1X;
            p1Y = bA.m_sweep.c.y + r1Y;
            p2X = bB.m_sweep.c.x + r2X;
            p2Y = bB.m_sweep.c.y + r2Y;
            this.m_u1.Set(p1X - s1X, p1Y - s1Y);
            this.m_u2.Set(p2X - s2X, p2Y - s2Y);
            length1 = this.m_u1.Length();
            length2 = this.m_u2.Length();
            if (length1 > b2Settings.b2_linearSlop) this.m_u1.Multiply(1 / length1);
            else this.m_u1.SetZero();
            if (length2 > b2Settings.b2_linearSlop) this.m_u2.Multiply(1 / length2);
            else this.m_u2.SetZero();
            C = this.m_constant - length1 - this.m_ratio * length2;
            linearError = b2Math.Max(linearError, -C);
            C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
            impulse = -this.m_pulleyMass * C;
            p1X = -impulse * this.m_u1.x;
            p1Y = -impulse * this.m_u1.y;
            p2X = -this.m_ratio * impulse * this.m_u2.x;
            p2Y = -this.m_ratio * impulse * this.m_u2.y;
            bA.m_sweep.c.x += bA.m_invMass * p1X;
            bA.m_sweep.c.y += bA.m_invMass * p1Y;
            bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
            bB.m_sweep.c.x += bB.m_invMass * p2X;
            bB.m_sweep.c.y += bB.m_invMass * p2Y;
            bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
            bA.SynchronizeTransform();
            bB.SynchronizeTransform()
        }
        if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
            tMat = bA.m_xf.R;
            r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
            r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
            tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
            r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
            r1X = tX;
            p1X = bA.m_sweep.c.x + r1X;
            p1Y = bA.m_sweep.c.y + r1Y;
            this.m_u1.Set(p1X - s1X, p1Y - s1Y);
            length1 = this.m_u1.Length();
            if (length1 > b2Settings.b2_linearSlop) {
                this.m_u1.x *= 1 / length1;
                this.m_u1.y *= 1 / length1
            } else this.m_u1.SetZero();
            C = this.m_maxLength1 - length1;
            linearError = b2Math.Max(linearError, -C);
            C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
            impulse = -this.m_limitMass1 * C;
            p1X = -impulse * this.m_u1.x;
            p1Y = -impulse * this.m_u1.y;
            bA.m_sweep.c.x += bA.m_invMass * p1X;
            bA.m_sweep.c.y += bA.m_invMass * p1Y;
            bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
            bA.SynchronizeTransform()
        }
        if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
            tMat = bB.m_xf.R;
            r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
            r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
            tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
            r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
            r2X = tX;
            p2X = bB.m_sweep.c.x + r2X;
            p2Y = bB.m_sweep.c.y + r2Y;
            this.m_u2.Set(p2X - s2X, p2Y - s2Y);
            length2 = this.m_u2.Length();
            if (length2 > b2Settings.b2_linearSlop) {
                this.m_u2.x *= 1 / length2;
                this.m_u2.y *= 1 / length2
            } else this.m_u2.SetZero();
            C = this.m_maxLength2 - length2;
            linearError = b2Math.Max(linearError, -C);
            C = b2Math.Clamp(C + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
            impulse = -this.m_limitMass2 * C;
            p2X = -impulse * this.m_u2.x;
            p2Y = -impulse * this.m_u2.y;
            bB.m_sweep.c.x += bB.m_invMass * p2X;
            bB.m_sweep.c.y += bB.m_invMass * p2Y;
            bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
            bB.SynchronizeTransform()
        }
        return linearError < b2Settings.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
    });
    Box2D.inherit(b2PulleyJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2PulleyJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2PulleyJointDef.b2PulleyJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.groundAnchorA = new b2Vec2;
        this.groundAnchorB = new b2Vec2;
        this.localAnchorA = new b2Vec2;
        this.localAnchorB = new b2Vec2
    };
    b2PulleyJointDef.prototype.b2PulleyJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_pulleyJoint;
        this.groundAnchorA.Set(-1, 1);
        this.groundAnchorB.Set(1, 1);
        this.localAnchorA.Set(-1, 0);
        this.localAnchorB.Set(1, 0);
        this.lengthA = 0;
        this.maxLengthA = 0;
        this.lengthB = 0;
        this.maxLengthB = 0;
        this.ratio = 1;
        this.collideConnected = true
    };
    b2PulleyJointDef.prototype.Initialize = function(bA, bB, gaA, gaB, anchorA, anchorB, r) {
        if (r === undefined) r = 0;
        this.bodyA = bA;
        this.bodyB = bB;
        this.groundAnchorA.SetV(gaA);
        this.groundAnchorB.SetV(gaB);
        this.localAnchorA = this.bodyA.GetLocalPoint(anchorA);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchorB);
        var d1X = anchorA.x - gaA.x;
        var d1Y = anchorA.y - gaA.y;
        this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
        var d2X = anchorB.x - gaB.x;
        var d2Y = anchorB.y - gaB.y;
        this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
        this.ratio = r;
        var C = this.lengthA + this.ratio * this.lengthB;
        this.maxLengthA = C - this.ratio * b2PulleyJoint.b2_minPulleyLength;
        this.maxLengthB = (C - b2PulleyJoint.b2_minPulleyLength) / this.ratio
    };
    Box2D.inherit(b2RevoluteJoint, Box2D.Dynamics.Joints.b2Joint);
    b2RevoluteJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2RevoluteJoint.b2RevoluteJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new b2Mat22;
        this.K1 = new b2Mat22;
        this.K2 = new b2Mat22;
        this.K3 = new b2Mat22;
        this.impulse3 = new b2Vec3;
        this.impulse2 = new b2Vec2;
        this.reduced = new b2Vec2;
        this.m_localAnchor1 = new b2Vec2;
        this.m_localAnchor2 = new b2Vec2;
        this.m_impulse = new b2Vec3;
        this.m_mass = new b2Mat33
    };
    b2RevoluteJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    b2RevoluteJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    b2RevoluteJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
    };
    b2RevoluteJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.z
    };
    b2RevoluteJoint.prototype.GetJointAngle = function() {
        return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
    };
    b2RevoluteJoint.prototype.GetJointSpeed = function() {
        return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
    };
    b2RevoluteJoint.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    b2RevoluteJoint.prototype.EnableLimit = function(flag) {
        this.m_enableLimit = flag
    };
    b2RevoluteJoint.prototype.GetLowerLimit = function() {
        return this.m_lowerAngle
    };
    b2RevoluteJoint.prototype.GetUpperLimit = function() {
        return this.m_upperAngle
    };
    b2RevoluteJoint.prototype.SetLimits = function(lower, upper) {
        if (lower === undefined) lower = 0;
        if (upper === undefined) upper = 0;
        this.m_lowerAngle = lower;
        this.m_upperAngle = upper
    };
    b2RevoluteJoint.prototype.IsMotorEnabled = function() {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        return this.m_enableMotor
    };
    b2RevoluteJoint.prototype.EnableMotor = function(flag) {
        this.m_enableMotor = flag
    };
    b2RevoluteJoint.prototype.SetMotorSpeed = function(speed) {
        if (speed === undefined) speed = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_motorSpeed = speed
    };
    b2RevoluteJoint.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    b2RevoluteJoint.prototype.SetMaxMotorTorque = function(torque) {
        if (torque === undefined) torque = 0;
        this.m_maxMotorTorque = torque
    };
    b2RevoluteJoint.prototype.GetMotorTorque = function() {
        return this.m_maxMotorTorque
    };
    b2RevoluteJoint.prototype.b2RevoluteJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_referenceAngle = def.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = 0;
        this.m_lowerAngle = def.lowerAngle;
        this.m_upperAngle = def.upperAngle;
        this.m_maxMotorTorque = def.maxMotorTorque;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
        this.m_limitState = b2Joint.e_inactiveLimit
    };
    b2RevoluteJoint.prototype.InitVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        var tX = 0;
        if (this.m_enableMotor || this.m_enableLimit);
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var m1 = bA.m_invMass;
        var m2 = bB.m_invMass;
        var i1 = bA.m_invI;
        var i2 = bB.m_invI;
        this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
        this.m_mass.col2.x = -r1Y * r1X * i1 - r2Y * r2X * i2;
        this.m_mass.col3.x = -r1Y * i1 - r2Y * i2;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
        this.m_mass.col3.y = r1X * i1 + r2X * i2;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = i1 + i2;
        this.m_motorMass = 1 / (i1 + i2);
        if (this.m_enableMotor == false) this.m_motorImpulse = 0;
        if (this.m_enableLimit) {
            var jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
            if (b2Math.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2Settings.b2_angularSlop) this.m_limitState = b2Joint.e_equalLimits;
            else if (jointAngle <= this.m_lowerAngle) {
                if (this.m_limitState != b2Joint.e_atLowerLimit) this.m_impulse.z = 0;
                this.m_limitState = b2Joint.e_atLowerLimit
            } else if (jointAngle >= this.m_upperAngle) {
                if (this.m_limitState != b2Joint.e_atUpperLimit) this.m_impulse.z = 0;
                this.m_limitState = b2Joint.e_atUpperLimit
            } else {
                this.m_limitState = b2Joint.e_inactiveLimit;
                this.m_impulse.z = 0
            }
        } else this.m_limitState = b2Joint.e_inactiveLimit;
        if (step.warmStarting) {
            this.m_impulse.x *= step.dtRatio;
            this.m_impulse.y *= step.dtRatio;
            this.m_motorImpulse *= step.dtRatio;
            var PX = this.m_impulse.x;
            var PY = this.m_impulse.y;
            bA.m_linearVelocity.x -= m1 * PX;
            bA.m_linearVelocity.y -= m1 * PY;
            bA.m_angularVelocity -= i1 * (r1X * PY - r1Y * PX + this.m_motorImpulse + this.m_impulse.z);
            bB.m_linearVelocity.x += m2 * PX;
            bB.m_linearVelocity.y += m2 * PY;
            bB.m_angularVelocity += i2 * (r2X * PY - r2Y * PX + this.m_motorImpulse + this.m_impulse.z)
        } else {
            this.m_impulse.SetZero();
            this.m_motorImpulse = 0
        }
    };
    b2RevoluteJoint.prototype.SolveVelocityConstraints = function(step) {
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var tMat;
        var tX = 0;
        var newImpulse = 0;
        var r1X = 0;
        var r1Y = 0;
        var r2X = 0;
        var r2Y = 0;
        var v1 = bA.m_linearVelocity;
        var w1 = bA.m_angularVelocity;
        var v2 = bB.m_linearVelocity;
        var w2 = bB.m_angularVelocity;
        var m1 = bA.m_invMass;
        var m2 = bB.m_invMass;
        var i1 = bA.m_invI;
        var i2 = bB.m_invI;
        if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
            var Cdot = w2 - w1 - this.m_motorSpeed;
            var impulse = this.m_motorMass * -Cdot;
            var oldImpulse = this.m_motorImpulse;
            var maxImpulse = step.dt * this.m_maxMotorTorque;
            this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, -maxImpulse, maxImpulse);
            impulse = this.m_motorImpulse - oldImpulse;
            w1 -= i1 * impulse;
            w2 += i2 * impulse
        }
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
            tMat = bA.m_xf.R;
            r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
            r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
            tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
            r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
            r1X = tX;
            tMat = bB.m_xf.R;
            r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
            r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
            tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
            r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
            r2X = tX;
            var Cdot1X = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
            var Cdot1Y = v2.y + w2 * r2X - v1.y - w1 * r1X;
            var Cdot2 = w2 - w1;
            this.m_mass.Solve33(this.impulse3, -Cdot1X, -Cdot1Y, -Cdot2);
            if (this.m_limitState == b2Joint.e_equalLimits) this.m_impulse.Add(this.impulse3);
            else if (this.m_limitState == b2Joint.e_atLowerLimit) {
                newImpulse = this.m_impulse.z + this.impulse3.z;
                if (newImpulse < 0) {
                    this.m_mass.Solve22(this.reduced, -Cdot1X, -Cdot1Y);
                    this.impulse3.x = this.reduced.x;
                    this.impulse3.y = this.reduced.y;
                    this.impulse3.z = -this.m_impulse.z;
                    this.m_impulse.x += this.reduced.x;
                    this.m_impulse.y += this.reduced.y;
                    this.m_impulse.z = 0
                }
            } else if (this.m_limitState == b2Joint.e_atUpperLimit) {
                newImpulse = this.m_impulse.z + this.impulse3.z;
                if (newImpulse > 0) {
                    this.m_mass.Solve22(this.reduced, -Cdot1X, -Cdot1Y);
                    this.impulse3.x = this.reduced.x;
                    this.impulse3.y = this.reduced.y;
                    this.impulse3.z = -this.m_impulse.z;
                    this.m_impulse.x += this.reduced.x;
                    this.m_impulse.y += this.reduced.y;
                    this.m_impulse.z = 0
                }
            }
            v1.x -= m1 * this.impulse3.x;
            v1.y -= m1 * this.impulse3.y;
            w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
            v2.x += m2 * this.impulse3.x;
            v2.y += m2 * this.impulse3.y;
            w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z)
        } else {
            tMat = bA.m_xf.R;
            r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
            r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
            tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
            r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
            r1X = tX;
            tMat = bB.m_xf.R;
            r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
            r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
            tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
            r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
            r2X = tX;
            var CdotX = v2.x + -w2 * r2Y - v1.x - -w1 * r1Y;
            var CdotY = v2.y + w2 * r2X - v1.y - w1 * r1X;
            this.m_mass.Solve22(this.impulse2, -CdotX, -CdotY);
            this.m_impulse.x += this.impulse2.x;
            this.m_impulse.y += this.impulse2.y;
            v1.x -= m1 * this.impulse2.x;
            v1.y -= m1 * this.impulse2.y;
            w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
            v2.x += m2 * this.impulse2.x;
            v2.y += m2 * this.impulse2.y;
            w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x)
        }
        bA.m_linearVelocity.SetV(v1);
        bA.m_angularVelocity = w1;
        bB.m_linearVelocity.SetV(v2);
        bB.m_angularVelocity = w2
    };
    b2RevoluteJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var oldLimitImpulse = 0;
        var C = 0;
        var tMat;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var angularError = 0;
        var positionError = 0;
        var tX = 0;
        var impulseX = 0;
        var impulseY = 0;
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
            var angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
            var limitImpulse = 0;
            if (this.m_limitState == b2Joint.e_equalLimits) {
                C = b2Math.Clamp(angle - this.m_lowerAngle, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
                limitImpulse = -this.m_motorMass * C;
                angularError = b2Math.Abs(C)
            } else if (this.m_limitState == b2Joint.e_atLowerLimit) {
                C = angle - this.m_lowerAngle;
                angularError = -C;
                C = b2Math.Clamp(C + b2Settings.b2_angularSlop, -b2Settings.b2_maxAngularCorrection, 0);
                limitImpulse = -this.m_motorMass * C
            } else if (this.m_limitState == b2Joint.e_atUpperLimit) {
                C = angle - this.m_upperAngle;
                angularError = C;
                C = b2Math.Clamp(C - b2Settings.b2_angularSlop, 0, b2Settings.b2_maxAngularCorrection);
                limitImpulse = -this.m_motorMass * C
            }
            bA.m_sweep.a -= bA.m_invI * limitImpulse;
            bB.m_sweep.a += bB.m_invI * limitImpulse;
            bA.SynchronizeTransform();
            bB.SynchronizeTransform()
        }
        tMat = bA.m_xf.R;
        var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * r1X + tMat.col2.x * r1Y;
        r1Y = tMat.col1.y * r1X + tMat.col2.y * r1Y;
        r1X = tX;
        tMat = bB.m_xf.R;
        var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * r2X + tMat.col2.x * r2Y;
        r2Y = tMat.col1.y * r2X + tMat.col2.y * r2Y;
        r2X = tX;
        var CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        var CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        var CLengthSquared = CX * CX + CY * CY;
        var CLength = Math.sqrt(CLengthSquared);
        positionError = CLength;
        var invMass1 = bA.m_invMass;
        var invMass2 = bB.m_invMass;
        var invI1 = bA.m_invI;
        var invI2 = bB.m_invI;
        var k_allowedStretch = 10 * b2Settings.b2_linearSlop;
        if (CLengthSquared > k_allowedStretch * k_allowedStretch) {
            var uX = CX / CLength;
            var uY = CY / CLength;
            var k = invMass1 + invMass2;
            var m = 1 / k;
            impulseX = m * -CX;
            impulseY = m * -CY;
            var k_beta = 0.5;
            bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
            bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
            bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
            bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
            CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
            CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y
        }
        this.K1.col1.x = invMass1 + invMass2;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = invMass1 + invMass2;
        this.K2.col1.x = invI1 * r1Y * r1Y;
        this.K2.col2.x = -invI1 * r1X * r1Y;
        this.K2.col1.y = -invI1 * r1X * r1Y;
        this.K2.col2.y = invI1 * r1X * r1X;
        this.K3.col1.x = invI2 * r2Y * r2Y;
        this.K3.col2.x = -invI2 * r2X * r2Y;
        this.K3.col1.y = -invI2 * r2X * r2Y;
        this.K3.col2.y = invI2 * r2X * r2X;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.AddM(this.K3);
        this.K.Solve(b2RevoluteJoint.tImpulse, -CX, -CY);
        impulseX = b2RevoluteJoint.tImpulse.x;
        impulseY = b2RevoluteJoint.tImpulse.y;
        bA.m_sweep.c.x -= bA.m_invMass * impulseX;
        bA.m_sweep.c.y -= bA.m_invMass * impulseY;
        bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
        bB.m_sweep.c.x += bB.m_invMass * impulseX;
        bB.m_sweep.c.y += bB.m_invMass * impulseY;
        bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new b2Vec2
    });
    Box2D.inherit(b2RevoluteJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2RevoluteJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2RevoluteJointDef.b2RevoluteJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2;
        this.localAnchorB = new b2Vec2
    };
    b2RevoluteJointDef.prototype.b2RevoluteJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_revoluteJoint;
        this.localAnchorA.Set(0, 0);
        this.localAnchorB.Set(0, 0);
        this.referenceAngle = 0;
        this.lowerAngle = 0;
        this.upperAngle = 0;
        this.maxMotorTorque = 0;
        this.motorSpeed = 0;
        this.enableLimit = false;
        this.enableMotor = false
    };
    b2RevoluteJointDef.prototype.Initialize = function(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(b2WeldJoint, Box2D.Dynamics.Joints.b2Joint);
    b2WeldJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2WeldJoint.b2WeldJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new b2Vec2;
        this.m_localAnchorB = new b2Vec2;
        this.m_impulse = new b2Vec3;
        this.m_mass = new b2Mat33
    };
    b2WeldJoint.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    b2WeldJoint.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    b2WeldJoint.prototype.GetReactionForce = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y)
    };
    b2WeldJoint.prototype.GetReactionTorque = function(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.z
    };
    b2WeldJoint.prototype.b2WeldJoint = function(def) {
        this.__super.b2Joint.call(this, def);
        this.m_localAnchorA.SetV(def.localAnchorA);
        this.m_localAnchorB.SetV(def.localAnchorB);
        this.m_referenceAngle = def.referenceAngle;
        this.m_impulse.SetZero();
        this.m_mass = new b2Mat33
    };
    b2WeldJoint.prototype.InitVelocityConstraints = function(step) {
        var tMat;
        var tX = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
        rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
        rAX = tX;
        tMat = bB.m_xf.R;
        var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
        rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
        rBX = tX;
        var mA = bA.m_invMass;
        var mB = bB.m_invMass;
        var iA = bA.m_invI;
        var iB = bB.m_invI;
        this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
        this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
        this.m_mass.col3.x = -rAY * iA - rBY * iB;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
        this.m_mass.col3.y = rAX * iA + rBX * iB;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = iA + iB;
        if (step.warmStarting) {
            this.m_impulse.x *= step.dtRatio;
            this.m_impulse.y *= step.dtRatio;
            this.m_impulse.z *= step.dtRatio;
            bA.m_linearVelocity.x -= mA * this.m_impulse.x;
            bA.m_linearVelocity.y -= mA * this.m_impulse.y;
            bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
            bB.m_linearVelocity.x += mB * this.m_impulse.x;
            bB.m_linearVelocity.y += mB * this.m_impulse.y;
            bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z)
        } else this.m_impulse.SetZero()
    };
    b2WeldJoint.prototype.SolveVelocityConstraints = function(step) {
        var tMat;
        var tX = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        var vA = bA.m_linearVelocity;
        var wA = bA.m_angularVelocity;
        var vB = bB.m_linearVelocity;
        var wB = bB.m_angularVelocity;
        var mA = bA.m_invMass;
        var mB = bB.m_invMass;
        var iA = bA.m_invI;
        var iB = bB.m_invI;
        tMat = bA.m_xf.R;
        var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
        rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
        rAX = tX;
        tMat = bB.m_xf.R;
        var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
        rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
        rBX = tX;
        var Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
        var Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
        var Cdot2 = wB - wA;
        var impulse = new b2Vec3;
        this.m_mass.Solve33(impulse, -Cdot1X, -Cdot1Y, -Cdot2);
        this.m_impulse.Add(impulse);
        vA.x -= mA * impulse.x;
        vA.y -= mA * impulse.y;
        wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
        vB.x += mB * impulse.x;
        vB.y += mB * impulse.y;
        wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
        bA.m_angularVelocity = wA;
        bB.m_angularVelocity = wB
    };
    b2WeldJoint.prototype.SolvePositionConstraints = function(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        var tMat;
        var tX = 0;
        var bA = this.m_bodyA;
        var bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = tMat.col1.x * rAX + tMat.col2.x * rAY;
        rAY = tMat.col1.y * rAX + tMat.col2.y * rAY;
        rAX = tX;
        tMat = bB.m_xf.R;
        var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = tMat.col1.x * rBX + tMat.col2.x * rBY;
        rBY = tMat.col1.y * rBX + tMat.col2.y * rBY;
        rBX = tX;
        var mA = bA.m_invMass;
        var mB = bB.m_invMass;
        var iA = bA.m_invI;
        var iB = bB.m_invI;
        var C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
        var C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
        var C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
        var k_allowedStretch = 10 * b2Settings.b2_linearSlop;
        var positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
        var angularError = b2Math.Abs(C2);
        if (positionError > k_allowedStretch) {
            iA *= 1;
            iB *= 1
        }
        this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
        this.m_mass.col2.x = -rAY * rAX * iA - rBY * rBX * iB;
        this.m_mass.col3.x = -rAY * iA - rBY * iB;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
        this.m_mass.col3.y = rAX * iA + rBX * iB;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = iA + iB;
        var impulse = new b2Vec3;
        this.m_mass.Solve33(impulse, -C1X, -C1Y, -C2);
        bA.m_sweep.c.x -= mA * impulse.x;
        bA.m_sweep.c.y -= mA * impulse.y;
        bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
        bB.m_sweep.c.x += mB * impulse.x;
        bB.m_sweep.c.y += mB * impulse.y;
        bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop
    };
    Box2D.inherit(b2WeldJointDef, Box2D.Dynamics.Joints.b2JointDef);
    b2WeldJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2WeldJointDef.b2WeldJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2;
        this.localAnchorB = new b2Vec2
    };
    b2WeldJointDef.prototype.b2WeldJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_weldJoint;
        this.referenceAngle = 0
    };
    b2WeldJointDef.prototype.Initialize = function(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    }
})();
(function() {
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    b2DebugDraw.b2DebugDraw = function() {
        this.m_drawScale = 1;
        this.m_lineThickness = 1;
        this.m_alpha = 1;
        this.m_fillAlpha = 1;
        this.m_xformScale = 1;
        var __this = this;
        this.m_sprite = {
            graphics: {
                clear: function() {
                    __this.m_ctx.clearRect(0, 0, __this.m_ctx.canvas.width, __this.m_ctx.canvas.height)
                }
            }
        }
    };
    b2DebugDraw.prototype._color = function(color, alpha) {
        return "rgba(" + ((color & 16711680) >> 16) + "," + ((color & 65280) >> 8) + "," + (color & 255) + "," + alpha + ")"
    };
    b2DebugDraw.prototype.b2DebugDraw = function() {
        this.m_drawFlags = 0
    };
    b2DebugDraw.prototype.SetFlags = function(flags) {
        if (flags === undefined) flags = 0;
        this.m_drawFlags = flags
    };
    b2DebugDraw.prototype.GetFlags = function() {
        return this.m_drawFlags
    };
    b2DebugDraw.prototype.AppendFlags = function(flags) {
        if (flags === undefined) flags = 0;
        this.m_drawFlags |= flags
    };
    b2DebugDraw.prototype.ClearFlags = function(flags) {
        if (flags === undefined) flags = 0;
        this.m_drawFlags &= ~flags
    };
    b2DebugDraw.prototype.SetSprite = function(sprite) {
        this.m_ctx = sprite
    };
    b2DebugDraw.prototype.GetSprite = function() {
        return this.m_ctx
    };
    b2DebugDraw.prototype.SetDrawScale = function(drawScale) {
        if (drawScale === undefined) drawScale = 0;
        this.m_drawScale = drawScale
    };
    b2DebugDraw.prototype.GetDrawScale = function() {
        return this.m_drawScale
    };
    b2DebugDraw.prototype.SetLineThickness = function(lineThickness) {
        if (lineThickness === undefined) lineThickness = 0;
        this.m_lineThickness = lineThickness;
        this.m_ctx.strokeWidth = lineThickness
    };
    b2DebugDraw.prototype.GetLineThickness = function() {
        return this.m_lineThickness
    };
    b2DebugDraw.prototype.SetAlpha = function(alpha) {
        if (alpha === undefined) alpha = 0;
        this.m_alpha = alpha
    };
    b2DebugDraw.prototype.GetAlpha = function() {
        return this.m_alpha
    };
    b2DebugDraw.prototype.SetFillAlpha = function(alpha) {
        if (alpha === undefined) alpha = 0;
        this.m_fillAlpha = alpha
    };
    b2DebugDraw.prototype.GetFillAlpha = function() {
        return this.m_fillAlpha
    };
    b2DebugDraw.prototype.SetXFormScale = function(xformScale) {
        if (xformScale === undefined) xformScale = 0;
        this.m_xformScale = xformScale
    };
    b2DebugDraw.prototype.GetXFormScale = function() {
        return this.m_xformScale
    };
    b2DebugDraw.prototype.DrawPolygon = function(vertices, vertexCount, color) {
        if (!vertexCount) return;
        var s = this.m_ctx;
        var drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        for (var i = 1; i < vertexCount; i++) s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
        s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        s.closePath();
        s.stroke()
    };
    b2DebugDraw.prototype.DrawSolidPolygon = function(vertices, vertexCount, color) {
        if (!vertexCount) return;
        var s = this.m_ctx;
        var drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.fillStyle = this._color(color.color, this.m_fillAlpha);
        s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        for (var i = 1; i < vertexCount; i++) s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
        s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        s.closePath();
        s.fill();
        s.stroke()
    };
    b2DebugDraw.prototype.DrawCircle = function(center, radius, color) {
        if (!radius) return;
        var s = this.m_ctx;
        var drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.arc(center.x * drawScale, center.y * drawScale, radius * drawScale, 0, Math.PI * 2, true);
        s.closePath();
        s.stroke()
    };
    b2DebugDraw.prototype.DrawSolidCircle = function(center, radius, axis, color) {
        if (!radius) return;
        var s = this.m_ctx,
            drawScale = this.m_drawScale,
            cx = center.x * drawScale,
            cy = center.y * drawScale;
        s.moveTo(0, 0);
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.fillStyle = this._color(color.color, this.m_fillAlpha);
        s.arc(cx, cy, radius * drawScale, 0, Math.PI * 2, true);
        s.moveTo(cx, cy);
        s.lineTo((center.x + axis.x * radius) * drawScale, (center.y + axis.y * radius) * drawScale);
        s.closePath();
        s.fill();
        s.stroke()
    };
    b2DebugDraw.prototype.DrawSegment = function(p1, p2, color) {
        var s = this.m_ctx,
            drawScale = this.m_drawScale;
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.beginPath();
        s.moveTo(p1.x * drawScale, p1.y * drawScale);
        s.lineTo(p2.x * drawScale, p2.y * drawScale);
        s.closePath();
        s.stroke()
    };
    b2DebugDraw.prototype.DrawTransform = function(xf) {
        var s = this.m_ctx,
            drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(16711680, this.m_alpha);
        s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
        s.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col1.y) * drawScale);
        s.strokeStyle = this._color(65280, this.m_alpha);
        s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
        s.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col2.y) * drawScale);
        s.closePath();
        s.stroke()
    }
})();
var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;
var world;
var PHYS_SCALE = 30;
var RAD_TO_DEGREES = 180 / Math.PI;
var DEGREES_TO_RAD = Math.PI / 180;
var b2Color = Box2D.Common.b2Color,
    b2internal = Box2D.Common.b2internal,
    b2Settings = Box2D.Common.b2Settings,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
    b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Shape = Box2D.Collision.Shapes.b2Shape,
    b2Mat22 = Box2D.Common.Math.b2Mat22,
    b2Mat33 = Box2D.Common.Math.b2Mat33,
    b2Math = Box2D.Common.Math.b2Math,
    b2Sweep = Box2D.Common.Math.b2Sweep,
    b2Transform = Box2D.Common.Math.b2Transform,
    b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2Vec3 = Box2D.Common.Math.b2Vec3,
    b2Body = Box2D.Dynamics.b2Body,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
    b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
    b2ContactListener = Box2D.Dynamics.b2ContactListener,
    b2ContactManager = Box2D.Dynamics.b2ContactManager,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
    b2FilterData = Box2D.Dynamics.b2FilterData,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Island = Box2D.Dynamics.b2Island,
    b2TimeStep = Box2D.Dynamics.b2TimeStep,
    b2World = Box2D.Dynamics.b2World,
    b2AABB = Box2D.Collision.b2AABB,
    b2Bound = Box2D.Collision.b2Bound,
    b2BoundValues = Box2D.Collision.b2BoundValues,
    b2Collision = Box2D.Collision.b2Collision,
    b2ContactID = Box2D.Collision.b2ContactID,
    b2ContactPoint = Box2D.Collision.b2ContactPoint,
    b2Distance = Box2D.Collision.b2Distance,
    b2DistanceInput = Box2D.Collision.b2DistanceInput,
    b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
    b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
    b2DynamicTree = Box2D.Collision.b2DynamicTree,
    b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
    b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
    b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
    b2Manifold = Box2D.Collision.b2Manifold,
    b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
    b2Point = Box2D.Collision.b2Point,
    b2RayCastInput = Box2D.Collision.b2RayCastInput,
    b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
    b2Segment = Box2D.Collision.b2Segment,
    b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
    b2Simplex = Box2D.Collision.b2Simplex,
    b2SimplexCache = Box2D.Collision.b2SimplexCache,
    b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
    b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
    b2TOIInput = Box2D.Collision.b2TOIInput,
    b2WorldManifold = Box2D.Collision.b2WorldManifold,
    ClipVertex = Box2D.Collision.ClipVertex,
    Features = Box2D.Collision.Features,
    IBroadPhase = Box2D.Collision.IBroadPhase;
b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
var objA;
var objB;
var debugCanvas;
var debugDraw;

function initPhysics() {
    world = new b2World(new b2Vec2(0, 10), false);
    if (isPhysicsDebugDraw) {
        debugCanvas = document.createElement("canvas");
        debugCanvas.id = "debugCanvas";
        debugCanvas.width = 320 * 4;
        debugCanvas.height = 356 * 4;
        debugCanvas.style.position = "absolute";
        debugCanvas.style.left = "50%";
        debugCanvas.style.top = "10%";
        debugCanvas.style.zIndex = "100";
        debugCanvas.style.pointerEvents = "none";
        document.body.appendChild(debugCanvas);
        debugDraw = new b2DebugDraw;
        debugDraw.SetSprite(debugCanvas.getContext("2d"));
        debugDraw.SetDrawScale(30 * scaleFactor);
        debugDraw.SetFillAlpha(0.6);
        debugDraw.SetLineThickness(1);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
        onWindowResize(null)
    }
    worldManifold = new Box2D.Collision.b2WorldManifold;
    fixDef = new b2FixtureDef;
    bodyDef = new b2BodyDef;
    var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = beginContactListener;
    listener.EndContact = endContactListener;
    this.world.SetContactListener(listener)
}
var worldManifold;
var isCollideParticlesNeed = true;
var collidedHero, collidedAim, collidedTeleport, currObjPort = null;

function beginContactListener(contact) {
    if (isLevelCompleted || isLevelFailed) return;
    objA = contact.m_fixtureA.m_body.m_userData;
    objB = contact.m_fixtureB.m_body.m_userData;
    isCollideParticlesNeed = true;
    collidedHero = collidedAim = collidedTeleport = currObjPort = null;
    if (objA && objB) {
        if (objA.isTeleport) {
            currObjPort = objB;
            collidedTeleport = objA
        } else if (objB.isTeleport) {
            currObjPort = objA;
            collidedTeleport = objB
        }
        if (objB.isHero && objB.teleportationStatus < 0) {
            collidedAim = objA;
            collidedHero = objB
        } else if (objA.isHero && objA.teleportationStatus < 0) {
            collidedAim = objB;
            collidedHero = objA
        }
    }
    if (collidedTeleport) if (currObjPort.isBomb && (!isLevelCompleted && !isLevelFailed)) currObjPort.teleportTo(collidedTeleport);
    if (collidedHero) {
        if (collidedAim.isAim && (!isLevelCompleted && !isLevelFailed)) {
            collidedHero.isByPhysPosUpdate = false;
            collidedHero.physBody.active = false;
            collidedHero.physBody.SetAwake(false);
            randomSound = sounds[Math.floor(sounds.length * Math.random())];
            playSound(randomSound);
            collidedHero.heroVictory(collidedAim.vis.x)
        }
        if (collidedAim.isTeleport) collidedHero.teleportTo(collidedAim);
        if (collidedAim.isDanger) collidedHero.die();
        if (!collidedAim.isPhysStatic) {
            collidedHero.collideWithDyn(collidedAim);
            if (collidedAim.isHero) collidedAim.collideWithDyn(collidedHero)
        }
    }
}

function endContactListener(contact) {
    if (isLevelCompleted || isLevelFailed) return;
    objA = contact.m_fixtureA.m_body.m_userData;
    objB = contact.m_fixtureB.m_body.m_userData;
    isCollideParticlesNeed = true;
    collidedHero = collidedAim = collidedTeleport = currObjPort = null;
    if (objA && objB) {
        if (objB.isHero || objB.isBomb) {
            collidedAim = objA;
            collidedHero = objB
        } else if (objA.isHero || objA.isBomb) {
            collidedAim = objB;
            collidedHero = objA
        }
        if (collidedHero) if (collidedAim.isTeleport) collidedHero.teleportContactEnd(collidedAim)
    }
}
var fixDef;
var bodyDef;
var revJointDef;

function createPhysicsWalls() {
    fixDef.density = 1;
    fixDef.restitution = 0;
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape;
    var border = 2;
    fixDef.shape.SetAsBox(14, 2);
    bodyDef.position.Set(7, oh / PHYS_SCALE + border);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(7, -border);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    fixDef.shape.SetAsBox(2, 8);
    bodyDef.position.Set(-border, 8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(ow / PHYS_SCALE + border, 8);
    world.CreateBody(bodyDef).CreateFixture(fixDef)
}

function createCircleShape(x, y, radius, type) {
    fixDef.density = 1;
    fixDef.friction = 0.2;
    fixDef.restitution = 0;
    fixDef.isSensor = false;
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.filter.maskBits = 255;
    fixDef.filter.categoryBits = STATIC_CATEGORY;
    if (type == TELEPORT_TYPE) {
        fixDef.isSensor = true;
        bodyDef.type = b2Body.b2_staticBody
    }
    if (type === CLOUD_TYPE) bodyDef.type = b2Body.b2_staticBody;
    if (type === MOVER_CLOUD_DANGER_TYPE) bodyDef.type = b2Body.b2_kinematicBody;
    if (type === HERO_TYPE) {
        fixDef.filter.categoryBits = MAN_CATEGORY;
        fixDef.filter.maskBits = DOC_CATEGORY + STATIC_CATEGORY
    }
    fixDef.shape = new b2CircleShape(radius);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixDef);
    return body
}
var DEFAULT_RECT_SIZE = 90 / PHYS_SCALE;
var DEFAULT_BOX_SIZE = 52 / PHYS_SCALE;

function createPolyPhysics(x, y, scaleX, scaleY, type, ww, hh) {
    fixDef.isSensor = false;
    fixDef.friction = 0.2;
    fixDef.restitution = 0;
    fixDef.density = 0.5;
    fixDef.filter.categoryBits = STATIC_CATEGORY;
    fixDef.filter.maskBits = 255;
    if (type === MOVER_1_TYPE || type === MOVER_2_TYPE) {
        bodyDef.type = b2Body.b2_kinematicBody;
        bodyDef.position.x = x;
        bodyDef.position.y = y;
        var body = world.CreateBody(bodyDef);
        if (type === MOVER_1_TYPE || type === MOVER_2_TYPE) {
            fixDef.shape = new b2PolygonShape.AsOrientedBox(40 / 60, 50 / 60, new b2Vec2(ww / 30 / 2 - 40 / 60, -32 / 60), 0 * Math.PI / 180);
            body.CreateFixture2(fixDef.shape, 1);
            fixDef.shape = new b2PolygonShape.AsOrientedBox(40 / 60, 50 / 60, new b2Vec2(-ww / 30 / 2 + 40 / 60, -32 / 60), 0 * Math.PI / 180);
            body.CreateFixture2(fixDef.shape, 1)
        }
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsOrientedBox(ww / 60, 32 / 60, new b2Vec2(0, 0), 0 * Math.PI / 180);
        body.CreateFixture2(fixDef.shape, 1)
    }
    return body
}

function createRectPhysics(x, y, scaleX, scaleY, type, ww, hh) {
    var defWidth = DEFAULT_RECT_SIZE;
    var defHeight = DEFAULT_RECT_SIZE;
    fixDef.isSensor = false;
    fixDef.friction = 0.2;
    fixDef.restitution = 0;
    fixDef.density = 1;
    fixDef.filter.categoryBits = STATIC_CATEGORY;
    fixDef.filter.maskBits = 255;
    if (type == PHYSICS_RECT_TYPE) bodyDef.type = b2Body.b2_staticBody;
    else if (type === DYNAMIC_BOX_TYPE) {
        defWidth = DEFAULT_BOX_SIZE;
        defHeight = DEFAULT_BOX_SIZE;
        bodyDef.type = b2Body.b2_dynamicBody
    } else if (type === AIM_TYPE) {
        defWidth = 60 / PHYS_SCALE;
        defHeight = 2 / PHYS_SCALE;
        bodyDef.type = b2Body.b2_dynamicBody
    }
    var width = defWidth * scaleX;
    var height = defHeight * scaleY;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(width / 2, height / 2);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixDef);
    return body
}
var MINIMUM_SPEED = 3;
var MAX_SPEED = 6;
var IS_NITRO = false;
var DEFAULT_STATE = 0;
var COLLIDED_STATE = 1;
var MORE_EASY_MULT = 1;
(function(window) {
    function CharBase(typeId, parent, scaleX, scaleY, ww, hh, additParams) {
        var bmpAnimation = new createjs.Sprite(sunSS);
        bmpAnimation.baseBlock = this;
        this.vis = bmpAnimation;
        this.reset(typeId, parent, scaleX, scaleY, ww, hh, additParams)
    }
    var p = CharBase.prototype;
    p.reset = function(typeId, parent, scaleX, scaleY, ww, hh, additParams) {
        this.typeId = typeId;
        this.type = window[typeId];
        createjs.Tween.removeTweens(this.vis);
        this.parent = parent;
        this.vis.isOnTop = false;
        this.vis.isOnBottom = true;
        this.isBreaked = false;
        this.isNeedDispose = false;
        this.teleportationStatus = -1;
        this.vis.alpha = 1;
        this.vis.mouseEnabled = false;
        this.physBody = null;
        this.scale = scaleX;
        this.scaleY = scaleY;
        this.ww = ww;
        this.hh = hh;
        this.additParams = additParams;
        this.startTeleport = null;
        this.aimTeleport = null;
        this.isAim = false;
        this.isDanger = false;
        this.isTeleport = false;
        this.isFirstCollided = false;
        this.shape = null;
        this.animMargin = Math.random() * 30;
        this.currSpeed = 0;
        this.state = DEFAULT_STATE;
        this.charRadius = 0;
        this.collideTimer = 0;
        this.isExploded = false;
        this.isBomb = false;
        this.factor = 50;
        this.lastColliderType = -1;
        this.vis.rotation = 0;
        this.raduis = 0;
        this.isDied = false;
        this.vel = null;
        this.isByPhysPosUpdate = true;
        this.vis.cursor = null;
        this.isHero = false;
        this.lastVelocity = new b2Vec2(0, 0);
        this.lastAngularVelocity = 0;
        this.isMover = false;
        this.direct = null;
        this.isDecor = typeId.indexOf("DECOR") > -1;
        this.isMover = typeId.indexOf("MOVER") > -1;
        this.isDanger = typeId.indexOf("DANGER") > -1;
        this.isDynamicDecor = this.isDecor ? this.isDynDecor() : true;
        this.isPhysStatic = typeId.indexOf("PHYSICS") > -1;
        this.vis.visible = !this.isPhysStatic;
        this.setVisionByType();
        this.updateVisionScale();
        if (!this.isDynamicDecor && isWithCache) this.parent = allBgContainer;
        this.parent.addChild(this.vis)
    };
    p.isDynDecor = function() {
        return this.type === DECOR_OWL_TYPE
    };
    p.setupMouseEventListeners = function() {
        this.vis.cursor = "pointer"
    };
    p.setVisionByType = function() {
        this.vis.gotoAndStop(this.typeId);
        if (this.type === HERO_TYPE) {
            this.isHero = true;
            this.vis._animation.speed = 0.3;
            this.vis.play()
        }
        if (this.type === DECOR_OWL_TYPE) this.vis.play();
        else if (this.type === MOVER_CLOUD_DANGER_TYPE) {
            this.vis.play();
            playElectricSound()
        } else if (this.type === BOMB_TYPE) {
            if (isDesktop()) {
                this.vis.cursor = "pointer";
                this.vis.mouseEnabled = true
            }
            this.isBomb = true;
            this.factor = this.additParams[0];
            addToArray(allBombs, this)
        } else if (this.type === CLOUD_TYPE) {
            if (isDesktop()) {
                this.vis.cursor = "pointer";
                this.vis.mouseEnabled = true
            }
            addToArray(allClouds, this)
        }
        if (this.isHero) {
            if (isDesktop()) this.vis.mouseEnabled = true;
            this.isByPhysPosUpdate = true;
            addToArray(allHeroes, this)
        }
        if (this.type === AIM_TYPE) this.isAim = true;
        if (this.type === DECOR_CLOUD_1_TYPE || (this.type === DECOR_CLOUD_2_TYPE || (this.type === DECOR_CLOUD_3_TYPE || this.type === DECOR_CLOUD_4_TYPE))) this.isDynamicDecor = true;
        if (this.isMover) {
            this.direct = this.additParams[0];
            this.speed = this.additParams[1];
            this.minCoord = this.additParams[2];
            this.maxCoord = this.additParams[3];
            if (this.type == MOVER_2_TYPE) {
                if (isDesktop()) {
                    this.vis.cursor = "pointer";
                    this.vis.mouseEnabled = true
                }
                addToArray(allClouds, this)
            }
        }
        if (this.type === TELEPORT_TYPE) {
            this.isByPhysPosUpdate = false;
            this.isTeleport = true;
            if (!teleportIn) teleportIn = this;
            else if (!teleportOut) teleportOut = this
        }
        if (!this.vis.paused) this.vis.currentAnimationFrame = Math.floor(Math.random() * 20)
    };

    function cloudClick1(event) {
        if (isLevelCompleted || (isLevelFailed || isGamePaused)) return;
        var b = event.target;
        if (b.baseBlock.isBreaked) return;
        b.removeEventListener("mousedown", cloudClick1);
        b.mouseEnabled = false;
        b.gotoAndPlay("CLOUD_BREAK");
        playSound("blueSound");
        b.baseBlock.isBreaked = true
    }
    p.cloudClick = function(event) {
        if (isLevelCompleted || (isLevelFailed || isGamePaused)) return;
        var b = this;
        if (b.isBreaked) return;
        b.vis.removeAllEventListeners();
        b.vis.mouseEnabled = false;
        b.vis.play();
        playSound("blueSound");
        b.isBreaked = true
    };
    p.moverClick = function(event) {
        if (isLevelCompleted || (isLevelFailed || isGamePaused)) return;
        var b = this;
        if (b.isBreaked) return;
        b.vis.removeAllEventListeners();
        b.vis.mouseEnabled = false;
        playSound("blueSound");
        b.isBreaked = true
    };
    p.bombClick = function(event) {
        if (isLevelCompleted || (isLevelFailed || isGamePaused)) return;
        var b = this;
        if (b.isExploded) return;
        createExplosion(b);
        b.vis.removeAllEventListeners();
        b.vis.mouseEnabled = false;
        b.vis.play();
        b.isExploded = true;
        playSound("bubbleSound")
    };
    p.shootClick = function(event) {
        if (isLevelCompleted || (isLevelFailed || isGamePaused)) return;
        var b = this;
        if (b.isExploded) return;
        createShootExplosion(b)
    };
    p.calculateBoundingBox = function() {
        var margin = 1;
        var data = this.vis._animation;
        if (data && (data.frames && data.frames.length > 0)) {
            this.bounds = sunSS.getFrameBounds(data.frames[0]);
            this.bounds.width *= this.scale * margin;
            this.bounds.height *= this.scale * margin;
            this.bounds.x *= this.scale * margin;
            this.bounds.y *= this.scale * margin;
            this.charRadius = this.bounds.width / 2
        }
    };
    p.setPos = function(x, y, rotation) {
        this.vis.x = x;
        this.vis.y = y;
        if (rotation) this.vis.rotation = rotation
    };
    p.initPhysics = function() {
        if (this.physBody) world.DestroyBody(this.physBody);
        if (this.isDecor) return;
        var body;
        var posX = this.vis.x / PHYS_SCALE;
        var posY = this.vis.y / PHYS_SCALE;
        if (this.isPhysStatic || (this.type === DYNAMIC_BOX_TYPE || this.type === AIM_TYPE)) body = createRectPhysics(posX, posY, this.scale, this.scaleY, this.type, this.ww, this.hh);
        else if (this.type === MOVER_1_TYPE || this.type === MOVER_2_TYPE) body = createPolyPhysics(posX, posY, this.scale, this.scaleY, this.type, this.ww, this.hh);
        else {
            var r = this.getRadiusByType();
            body = createCircleShape(posX, posY, this.scale * this.getRadiusByType() / PHYS_SCALE, this.type)
        }
        if (!body) return;
        body.SetUserData(this);
        body.SetAngle(this.vis.rotation * DEGREES_TO_RAD);
        this.physBody = body;
        this.shape = body.GetFixtureList().GetShape()
    };
    p.getRadiusByType = function() {
        switch (this.type) {
            case HERO_TYPE:
                return 50;
                break;
            case TELEPORT_TYPE:
                return 25;
                break;
            case BOMB_TYPE:
                return 40;
                break;
            case CLOUD_TYPE:
                return 30;
                break;
            case MOVER_CLOUD_DANGER_TYPE:
                return 30;
                break
        }
        return 0
    };
    p.setFrame = function(frame, isPlay) {
        if (isPlay) this.vis.gotoAndPlay(frame);
        else this.vis.gotoAndStop(frame)
    };
    p.setVisionState = function(state) {};
    p.tick = function() {
        if (this.isNeedDispose) {
            this.dispose();
            return
        }
        if (isGamePaused) {
            stopElectricSound();
            return
        }
        if (this.isDecor && !this.isDynamicDecor) return;
        if (this.physBody && (!this.isPhysStatic && this.isByPhysPosUpdate)) {
            this.raduis = this.shape.m_radius;
            this.vel = this.physBody.m_linearVelocity;
            this.currSpeed = Math.abs(this.vel.x) + Math.abs(this.vel.y);
            this.vis.x = this.physBody.m_xf.position.x * PHYS_SCALE;
            this.vis.y = this.physBody.m_xf.position.y * PHYS_SCALE;
            this.vis.rotation = this.physBody.m_sweep.a * RAD_TO_DEGREES
        }
        if (this.type === DECOR_OWL_TYPE) if (owlXAXA) if (this.vis.currentAnimationFrame > 13) {
            this.vis.gotoAndPlay("DECOR_OWL_TYPE");
            owlXAXA = false
        }
        if (this.isMover && !this.isBreaked) {
            if (this.direct === "G") {
                this.physBody.SetLinearVelocity(new b2Vec2(this.speed, 0));
                if (this.vis.x > this.maxCoord || this.vis.x < this.minCoord) {
                    this.speed *= -1;
                    this.physBody.SetLinearVelocity(new b2Vec2(this.speed, 0))
                }
            }
            if (this.direct === "V") {
                this.physBody.SetLinearVelocity(new b2Vec2(0, this.speed));
                if (this.vis.y > this.maxCoord || this.vis.y < this.minCoord) {
                    this.speed *= -1;
                    this.physBody.SetLinearVelocity(new b2Vec2(0, this.speed))
                }
            }
        }
        if (this.type === CLOUD_TYPE) {
            this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 30;
            this.vis.scaleY = this.scale - Math.cos((counter + this.animMargin) / 5) / 30;
            if (this.isBreaked && this.vis.currentAnimationFrame >= 12) this.isNeedDispose = true
        }
        if (this.type === MOVER_2_TYPE) if (this.isBreaked && this.vis.currentAnimationFrame >= 12) this.isNeedDispose = true;
        if (this.type === AIM_TYPE) {
            this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 60;
            this.vis.scaleY = this.scale - Math.cos((counter + this.animMargin) / 5) / 60
        } else if (this.type === BOMB_TYPE && this.teleportationStatus == -1) {
            this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 60;
            this.vis.scaleY = this.scale - Math.cos((counter + this.animMargin) / 5) / 60;
            if (this.isExploded && this.vis.currentAnimationFrame >= 12) this.isNeedDispose = true
        } else if (this.type === TELEPORT_TYPE) {
            this.vis.rotation += 4 * dtScale;
            this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 30;
            this.vis.scaleY = this.vis.scaleX
        }
        if (this.type === DECOR_CLOUD_1_TYPE || (this.type === DECOR_CLOUD_2_TYPE || (this.type === DECOR_CLOUD_3_TYPE || this.type === DECOR_CLOUD_4_TYPE))) {
            this.vis.scaleX = this.scale + Math.cos((counter + this.animMargin) / 5) / 80;
            this.vis.scaleY = this.scale - Math.cos((counter + this.animMargin) / 5) / 80
        }
        if (this.isHero || this.isBomb) {
            this.updateTeleportation();
            if (this.isHero) {
                if (this.vis.x < -50 || (this.vis.x > 750 || (this.vis.y > 960 || this.vis.y < -50))) this.dieByWorldOut();
                if (this.isDied && this.vis.currentAnimationFrame >= 8) this.isNeedDispose = true
            }
        }
    };
    p.updateTeleportation = function() {
        if (!this.physBody) return;
        if (this.teleportationStatus === 0) {
            this.isByPhysPosUpdate = false;
            this.teleportationStatus = 1;
            this.physBody.SetPosition(new b2Vec2(0, 0));
            this.physBody.SetActive(false);
            playSound("teleportSound");
            var b = this;
            createjs.Tween.get(this.vis, {
                override: true
            }).to({
                    rotation: 1800,
                    scaleX: 0.05,
                    scaleY: 0.05,
                    x: this.startTeleport.vis.x,
                    y: this.startTeleport.vis.y
                }, 700).to({
                    x: this.aimTeleport.vis.x,
                    y: this.aimTeleport.vis.y
                }, 0).to({
                    rotation: 0,
                    scaleX: this.scale,
                    scaleY: this.scale
                }, 700).call(function() {
                    b.teleportationStatus = 2
                })
        } else if (this.teleportationStatus == 2) {
            this.physBody.SetPositionAndAngle(new b2Vec2(this.aimTeleport.vis.x / PHYS_SCALE, this.aimTeleport.vis.y / PHYS_SCALE), 0);
            this.physBody.m_linearVelocity.x = 0;
            this.physBody.m_linearVelocity.y = 0;
            this.physBody.m_angularVelocity = 0;
            this.physBody.SetAwake(true);
            this.physBody.SetActive(true);
            this.teleportationStatus = -1;
            this.isByPhysPosUpdate = true
        }
    };
    p.updateVisionScale = function() {
        if (this.isDecor) {
            this.vis.scaleX = this.scale;
            this.vis.scaleY = this.scaleY
        } else this.vis.scaleX = this.vis.scaleY = this.scale
    };
    p.dispose = function() {
        removeFromArray(allChars, this);
        if (this.isHero) removeFromArray(allHeroes, this);
        if (this.isBomb) removeFromArray(allBombs, this);
        if (this.type === CLOUD_TYPE || this.type === MOVER_2_TYPE) removeFromArray(allClouds, this);
        this.lastColliderType = -1;
        addToDisposed(this);
        this.vis.removeAllEventListeners();
        if (this.physBody) toDisposePhysicsBodies.push(this.physBody);
        this.physBody = null;
        this.shape = null;
        this.vis.stop();
        removeFromParent(this.vis)
    };
    p.collideWithOtherDynamic = function() {
        if (this.teleportationStatus > -1) return;
        this.isByPhysPosUpdate = true
    };
    p.heroVictory = function(xx) {
        if (isLevelCompleted || isLevelFailed) return;
        isLevelCompleted = true;
        hideGameInterface();
        createjs.Tween.get(this.vis, {
            override: true
        }).to({
                x: xx,
                rotation: 720
            }, 1E3);
        createHeroVictory(this.vis.x, xx, this.vis.y, 1, blockContainer)
    };
    p.aimCollected = function() {};
    p.teleportTo = function(teleport) {
        if (this.aimTeleport) return;
        this.startTeleport = teleport;
        this.aimTeleport = teleport === teleportIn ? teleportOut : teleportIn;
        this.teleportationStatus = 0
    };
    p.teleportContactEnd = function(teleport) {
        if (this.aimTeleport !== teleport) return;
        this.startTeleport = null;
        this.aimTeleport = null
    };
    p.die = function() {
        if (isLevelCompleted || isLevelFailed) return;
        isLevelFailed = true;
        this.isDied = true;
        this.isByPhysPosUpdate = false;
        hideGameInterface();
        playSound("deathSound");
        this.vis.gotoAndPlay("HERODIED");
        this.vis._animation.speed = 0.3;
        createjs.Tween.get(this.vis, {
            override: true
        }).to({
                scaleX: 0.5,
                scaleY: 0.5,
                rotation: 720
            }, 800).to({
                alpha: 0,
                rotation: 720
            }, 200).wait(400).call(showRestartWin)
    };
    p.dieByWorldOut = function() {
        if (isLevelCompleted || isLevelFailed) return;
        isLevelFailed = true;
        this.isDied = true;
        this.isByPhysPosUpdate = false;
        hideGameInterface();
        createjs.Tween.get(this.vis).wait(400).call(showRestartWin)
    };
    p.collideWithDyn = function(other) {
        if (this.isFirstCollided) return;
        this.isFirstCollided = true;
        this.isByPhysPosUpdate = true
    };
    window.CharBase = CharBase
})(window);
var allChars = [];
var allHeroes = [];
var disposedChars = [];
var allBombs = [];
var allClouds = [];
var allStars = [];
var blockContainer;
var currentLevel = 0;
var isLevelCompleted = false;
var isLevelFailed = false;
var isInflateReason = false;
var countStarsLevel = 0;

function initLevelManager() {
    container.addChild(blockContainer);
    initPhysics();
    stage.addEventListener("stagemousedown", onCharContainerMouseDown)
}
function createChar(type, x, y, scaleX, scaleY, rotation, ww, hh, additParams) {
    var bon = geCharFromPool(type, blockContainer, scaleX, scaleY, rotation, ww, hh, additParams);
    bon.setPos(x, y, rotation);
    bon.initPhysics();
    if (!isArrayContains(allChars, bon)) allChars.push(bon);
    return bon
}

function loadLevel(levelNum) {
    if (currentLevel != levelNum) MORE_EASY_MULT = 1;
    currentLevel = levelNum;
    if (currentLevel >= allLevels.length) currentLevel = currentLevel % allLevels.length;
    loadLevelByCode(allLevels[currentLevel]);
    isGamePaused = false;
    isLevelRestarted = false;
    isNeedCacheSizeUpdate = true
}
var totalEnemies = 0;
var teleportIn = null,
    teleportOut = null;

function loadLevelByCode(code) {
    isGamePaused = true;
    disposeLevel();
    addInstructions();
    if (!code) return;
    totalEnemies = 0;
    for (var i = 0; i < code.length; i++) {
        var bonCode = code[i];
        if (isBonus(bonCode[0])) createBonus(bonCode[0], bonCode[1], bonCode[2], bonCode[3], bonCode[4], bonCode[5]);
        else createChar(bonCode[0], bonCode[1], bonCode[2], bonCode[3], bonCode[4], bonCode[5], bonCode[6], bonCode[7], bonCode[8])
    }
}
function isBonus(typeId) {
    return typeId.indexOf("BONUS") > -1
}
var isLevelRestarted = false;

function restartLevel() {
    isLevelRestarted = true;
    loadLevel(currentLevel)
}
function loadNextLevel() {
    loadLevel(currentLevel + 1)
}
function disposeLevel() {
    stopElectricSound();
    disposeInstructions();
    isLevelFailed = isLevelCompleted = isInflateReason = false;
    teleportIn = teleportOut = null;
    var length = allChars.length;
    var i;
    for (i = 0; i < length; i++) {
        var ch = allChars.pop();
        ch.dispose()
    }
    disposeBonuses();
    allBombs = [];
    allClouds = [];
    allStars = []
}

function addToDisposed(bonus) {
    if (!isArrayContains(disposedChars, bonus)) disposedChars.push(bonus)
}
function geCharFromPool(type, blockContainer, scaleX, scaleY, rotation, ww, hh, additParams) {
    if (disposedChars.length > 0) {
        var db = disposedChars.pop();
        db.reset(type, blockContainer, scaleX, scaleY, ww, hh, additParams);
        return db
    } else return new CharBase(type, blockContainer, scaleX, scaleY, ww, hh, additParams)
}
var BIG_DISTANCE = 1E8;

function onCharContainerMouseDown(event) {
    if (splashContainer && splashContainer.parent) sponsorClick(event);
    if (isPageLeaved) {
        isPageLeaved = false;
        isTimerUpdateMode = false;
        setUpdateFrameMode()
    }
    if (isGamePaused || (isLevelCompleted || isLevelFailed)) return;
    var posX = (event.stageX - container.x) / scaleFactor;
    var posY = (event.stageY - container.y) / scaleFactor;
    var ch;
    var minDist = BIG_DISTANCE;
    var distSq = 0;
    var dx = 0;
    var dy = 0;
    var i = 0;
    for (i = 0; i < allBombs.length; i++) {
        ch = allBombs[i];
        if (ch.isExploded) continue;
        dx = ch.vis.x - posX;
        dy = ch.vis.y - posY;
        distSq = dx * dx + dy * dy;
        if (distSq < 30 * 30) {
            ch.bombClick();
            return
        }
    }
    for (i = 0; i < allClouds.length; i++) {
        ch = allClouds[i];
        if (ch.isBreaked) continue;
        dx = ch.vis.x - posX;
        dy = ch.vis.y - posY;
        distSq = dx * dx + dy * dy;
        if (distSq < 40 * 40 * ch.scale) {
            ch.cloudClick();
            return
        }
    }
}
function onCharContainerMouseUp(event) {}
var lastopenedlvl = 0;
var levelstates = [];
var LEVELS_NUM = 20;
var ZERO_STAR = 0;
var ONE_STAR = 1;
var TWO_STAR = 2;
var THREE_STAR = 3;
var ACHIEVS_NUM = 9;
var NOT_ACHIEVED = 0;
var ACHIEVED = 1;
var allachievs = [];
var GREAT_START_ACHIEV = 0;
var FRIENDS_ACHIEV = 1;
var RESTARTS_ACHIEV = 2;
var HALF_GAME_ACHIEV = 3;
var STRONGER_ACHIEV = 4;
var SICK_ACHIEV = 5;
var ALL_STARS_ACHIEV = 6;
var SPEED_ACHIEV = 8;
var PSYCO_ACHIEV = 7;
var PREFIX = "SUN";
var isStorageSupported = false;

function loadSaves() {
    lastopenedlvl = 0;
    totalScore = 0;
    isStorageSupported = isSupportshtml5storage();
    if (!isStorageSupported) {
        trace("storage not supported");
        for (var i = 0; i < LEVELS_NUM; i++) levelstates.push(ZERO_STAR);
        for (var i = 0; i < ACHIEVS_NUM; i++) allachievs.push(NOT_ACHIEVED);
        return
    }
    var stored = localStorage[PREFIX + "lastopenedlvl"];
    if (stored) {
        lastopenedlvl = parseInt(localStorage[PREFIX + "lastopenedlvl"]);
        for (var i = 0; i < LEVELS_NUM; i++) {
            var lvlState = localStorage[PREFIX + "levelstate" + i];
            levelstates.push(parseInt(lvlState))
        }
        for (var i = 0; i < ACHIEVS_NUM; i++) {
            var achievState = localStorage[PREFIX + "achiev" + i];
            allachievs.push(parseInt(achievState))
        }
        isMute = localStorage[PREFIX + "ismute"] == "1"
    } else {
        trace("saves not found!");
        for (var i = 0; i < LEVELS_NUM; i++) levelstates.push(ZERO_STAR);
        for (var i = 0; i < ACHIEVS_NUM; i++) allachievs.push(NOT_ACHIEVED);
        updateSaves()
    }
}
function getStarsForLevel(lvlNum) {
    return levelstates[lvlNum]
}

function saveGame(stars) {
    if (lastopenedlvl <= currentLevel) lastopenedlvl = currentLevel + 1;
    if (levelstates[currentLevel] < stars) levelstates[currentLevel] = stars;
    updateSaves()
}
function updateSaves() {
    if (!isStorageSupported) return;
    localStorage[PREFIX + "lastopenedlvl"] = lastopenedlvl;
    for (var i = 0; i < LEVELS_NUM; i++) localStorage[PREFIX + "levelstate" + i] = levelstates[i];
    for (var i = 0; i < ACHIEVS_NUM; i++) localStorage[PREFIX + "achiev" + i] = allachievs[i];
    saveMuteState()
}

function saveMuteState() {
    if (!isStorageSupported) return;
    localStorage[PREFIX + "ismute"] = isMute ? "1" : "0"
}
function isSupportshtml5storage() {
    try {
        var isSupported = "localStorage" in window && window["localStorage"] !== null;
        if (isSupported) {
            localStorage.setItem("storage", "");
            localStorage.removeItem("storage")
        }
        return isSupported
    } catch (e) {
        return false
    }
}
var allInstructions = [];

function createInstruction(x, y, frame, isDynamic) {
    var container = isDynamic ? blockContainer : allBgContainer;
    var instr = createHelp(frame, x, y, 1, container);
    instr.setFrame(frame);
    allInstructions.push(instr);
    return instr
}
function addInstructions() {
    if (currentLevel == 0) createInstruction(ow / 2 + 100, oh / 2, "help1");
    if (currentLevel == 8) createInstruction(50, 250, "help2");
    if (currentLevel == 13) createInstruction(520, 200, "help3")
}
function disposeInstructions() {
    while (allInstructions.length > 0) allInstructions.pop().dispose()
}

function getCollectedStarsNum() {
    var num = 0;
    for (var i = 0; i < LEVELS_NUM; i++) num += levelstates[i];
    return num
}
function createExplosion(bomb) {
    var ch;
    for (var i = 0; i < allChars.length; i++) {
        ch = allChars[i];
        if (ch === bomb) continue;
        if (ch.isTeleport) continue;
        if (!ch.physBody) continue;
        if (ch.isPhysStatic) continue;
        if (ch.teleportationStatus > -1) continue;
        if (ch.isDied) continue;
        if (ch.isAim) continue;
        CreateExplode(bomb, ch)
    }
}

function createShootExplosion(bomb) {
    var ch;
    for (var i = 0; i < allHeroes.length; i++) {
        ch = allHeroes[i];
        CreateShoot(bomb, ch);
        break
    }
}

function CreateShoot(bomb, ch) {
    var charBody = ch.physBody;
    var bombBody = bomb.physBody;
    var diffX = ch.vis.x - bomb.vis.x;
    var diffY = ch.vis.y - bomb.vis.y;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance < 200) {
        var normalizedX = diffX;
        var normalizedY = diffY;
        bomb.vis.scaleX = bomb.vis.scaleY = bomb.scale = 1.2;
        bomb.vis.gotoAndPlay("bombexplosionv");
        var factor = 50;
        var force = new b2Vec2(normalizedX * factor, normalizedY * factor);
        bombBody.ApplyImpulse(force, bombBody.GetWorldCenter());
        charBody.ApplyTorque(Math.random() * 40 - 20)
    } else;
}
function CreateExplode(bomb, ch) {
    var charBody = ch.physBody;
    var diffX = ch.vis.x - bomb.vis.x;
    var diffY = ch.vis.y - bomb.vis.y;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    var normalizedX = diffX / distance;
    var normalizedY = diffY / distance;
    var factor = bomb.factor;
    var force = new b2Vec2(normalizedX * factor, normalizedY * factor);
    charBody.ApplyImpulse(force, charBody.GetWorldCenter());
    charBody.ApplyTorque(Math.random() * 40 - 20);
    ch.isByPhysPosUpdate = true
}
var allBonuses = [];
var disposedBonuses = [];
var currentBon;

function initBonusManager() {}
function createBonus(type, x, y, scaleX, scaleY, rotation) {
    var bon = getBonusFromPool(type, blockContainer, scaleX, scaleY);
    bon.setPos(x, y, rotation);
    addToArray(allBonuses, bon)
}
function disposeBonuses() {
    var length = allBonuses.length;
    var i;
    for (i = 0; i < length; i++) {
        var bon = allBonuses.pop();
        bon.dispose()
    }
}
function addToDisposedBonuses(bonus) {
    if (!isArrayContains(disposedBonuses, bonus)) disposedBonuses.push(bonus)
}

function getBonusFromPool(type, blockContainer, scaleX, scaleY) {
    if (disposedBonuses.length > 0) {
        var db = disposedBonuses.pop();
        db.reset(type, blockContainer, scaleX, scaleY);
        return db
    } else return new BonusBase(type, blockContainer, scaleX, scaleY)
}
var toDisposeBonuses = [];

function updateBonusManager() {
    for (var i = 0; i < allBonuses.length; i++) {
        allBonuses[i].tick();
        if (allBonuses[i].isCollected) addToArray(toDisposeBonuses, allBonuses[i])
    }
    while (toDisposeBonuses.length > 0) toDisposeBonuses.pop().dispose()
}(function(window) {
    function BonusBase(typeId, parent, scaleX, scaleY) {
        var bmpAnimation = new createjs.Sprite(sunSS);
        bmpAnimation.mouseEnabled = false;
        bmpAnimation.baseBlock = this;
        this.vis = bmpAnimation;
        this.reset(typeId, parent, scaleX, scaleY)
    }
    var p = BonusBase.prototype;
    p.reset = function(typeId, parent, scaleX, scaleY) {
        this.typeId = typeId;
        this.type = window[typeId];
        createjs.Tween.removeTweens(this.vis);
        this.tweenMaxSteps = 0;
        this.isNeedCollect = false;
        this.parent = parent;
        this.vis.isOnTop = false;
        this.vis.isOnBottom = true;
        this.vis.alpha = 1;
        this.isCollected = false;
        this.animMargin = Math.random() * 30;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.moveTarget = null;
        this.setVisionByType();
        this.sensorRadiusSq = 60 * 60;
        this.collectRadiusSq = 10 * 10;
        this.updateVisionScale();
        this.dx = 0;
        this.dy = 0;
        this.speed = 0;
        this.distanceSq = 0;
        this.hero = null;
        parent.addChild(this.vis)
    };
    p.setPos = function(x, y, rotation) {
        this.vis.x = x;
        this.vis.y = y;
        if (rotation) this.vis.rotation = rotation
    };
    p.updateVisionScale = function() {
        this.vis.scaleX = this.scaleX;
        this.vis.scaleY = this.scaleY
    };
    p.setVisionByType = function() {
        this.vis.gotoAndStop(this.typeId);
        if (!this.vis.paused) this.vis.currentAnimationFrame = Math.floor(Math.random() * 20)
    };
    p.tick = function() {
        if (this.isCollected || isGamePaused) return;
        this.vis.scaleX = this.scaleX + Math.cos((counter + this.animMargin) / 10) / 12;
        this.vis.scaleY = this.vis.scaleX;
        if (this.moveTarget) {
            this.speed += 0.2;
            this.dx = this.moveTarget.vis.x - this.vis.x;
            this.dy = this.moveTarget.vis.y - this.vis.y;
            this.distanceSq = this.dx * this.dx + this.dy * this.dy;
            this.vis.x += this.dx / 3 * this.speed;
            this.vis.y += this.dy / 3 * this.speed;
            if (this.distanceSq < this.collectRadiusSq) {
                this.isCollected = true;
                createStarEffect(this.moveTarget.vis.x, this.moveTarget.vis.y, 1, blockContainer);
                this.moveTarget = null
            }
        } else checkHeroesBonus(this)
    };

    function checkHeroesBonus(b) {
        for (var i = 0; i < allHeroes.length; i++) {
            b.hero = allHeroes[i];
            b.dx = b.hero.vis.x - b.vis.x;
            b.dy = b.hero.vis.y - b.vis.y;
            b.distanceSq = b.dx * b.dx + b.dy * b.dy;
            if (b.distanceSq < b.sensorRadiusSq) {
                b.moveTarget = b.hero;
                countStarsLevel++;
                if (countStarsLevel == 1) playSound("star1Sound");
                if (countStarsLevel == 2) playSound("star2Sound");
                if (countStarsLevel == 3) playSound("star3Sound")
            }
        }
    }
    p.dispose = function() {
        removeFromArray(allBonuses, this);
        addToDisposedBonuses(this);
        this.vis.removeAllEventListeners();
        this.vis.stop();
        this.parent.removeChild(this.vis)
    };
    window.BonusBase = BonusBase
})(window);
var isAudioSupported = false;
var isMute = false;
var sounds = ["sun1Sound", "sun2Sound", "sun3Sound", "sun4Sound", "sun5Sound"];
var randomSound;

function initSoundManager() {
    if (!isDesktop()) createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
    isAudioSupported = createjs.Sound.initializeDefaultPlugins();
    if (isAudioSupported) manifest.push({
        src: "sounds/owl.ogg|sounds/owl.m4a",
        id: "owlSound",
        data: 1
    }, {
        src: "sounds/buttonClick.ogg|sounds/buttonClick.m4a",
        id: "clickSound",
        data: 1
    }, {
        src: "sounds/explodeSound.ogg|sounds/explodeSound.m4a",
        id: "bubbleSound",
        data: 1
    }, {
        src: "sounds/teleport.ogg|sounds/teleport.m4a",
        id: "teleportSound",
        data: 1
    }, {
        src: "sounds/final_star1.ogg|sounds/final_star1.m4a",
        id: "note1Sound",
        data: 1
    }, {
        src: "sounds/final_star2.ogg|sounds/final_star2.m4a",
        id: "note2Sound",
        data: 1
    }, {
        src: "sounds/final_star3.ogg|sounds/final_star3.m4a",
        id: "note3Sound",
        data: 1
    }, {
        src: "sounds/get_star1.ogg|sounds/get_star1.m4a",
        id: "star1Sound",
        data: 1
    }, {
        src: "sounds/get_star2.ogg|sounds/get_star2.m4a",
        id: "star2Sound",
        data: 1
    }, {
        src: "sounds/get_star3.ogg|sounds/get_star3.m4a",
        id: "star3Sound",
        data: 1
    }, {
        src: "sounds/sun_voice1.ogg|sounds/sun_voice1.m4a",
        id: "sun1Sound",
        data: 1
    }, {
        src: "sounds/sun_voice2.ogg|sounds/sun_voice2.m4a",
        id: "sun2Sound",
        data: 1
    }, {
        src: "sounds/sun_voice3.ogg|sounds/sun_voice3.m4a",
        id: "sun3Sound",
        data: 1
    }, {
        src: "sounds/sun_voice4.ogg|sounds/sun_voice4.m4a",
        id: "sun4Sound",
        data: 1
    }, {
        src: "sounds/sun_voice5.ogg|sounds/sun_voice5.m4a",
        id: "sun5Sound",
        data: 1
    }, {
        src: "sounds/winSound.ogg|sounds/winSound.m4a",
        id: "winSound",
        data: 1
    }, {
        src: "sounds/restartSound.ogg|sounds/restartSound.m4a",
        id: "restartSound",
        data: 1
    }, {
        src: "sounds/blue-cloud_pop.ogg|sounds/blue-cloud_pop.m4a",
        id: "blueSound",
        data: 1
    }, {
        src: "sounds/death_by_evil-cloud.ogg|sounds/death_by_evil-cloud.m4a",
        id: "deathSound",
        data: 1
    }, {
        src: "sounds/electric-clud_cracle.ogg|sounds/electric-clud_cracle.m4a",
        id: "electricSound",
        data: 1
    }, {
        src: "sounds/FonSound.ogg|sounds/FonSound.m4a",
        id: "FonSound",
        data: 1
    })
}
function playSound(soundLabel, isLooped) {
    if (isMute || !isAudioSupported) return;
    var loopNum = isLooped ? -1 : 0;
    return createjs.Sound.play(soundLabel, {
        interrupt: createjs.Sound.INTERRUPT_EARLY,
        loop: loopNum
    })
}
var FonSound;
var electricSound;

function playElectricSound() {
    if (isMute || !isAudioSupported) return;
    electricSound = playSound("electricSound", true)
}
function playFonSound() {
    if (isMute || !isAudioSupported) return;
    if (FonSound) FonSound.play();
    else FonSound = playSound("FonSound", true)
}
function stopElectricSound() {
    if (!isAudioSupported) return;
    if (electricSound) electricSound.stop()
}
function stopFonSound() {
    if (!isAudioSupported) return;
    if (FonSound) FonSound.stop();
    createjs.Sound.stop()
}
function toggleMute() {
    isMute = !isMute;
    saveMuteState()
}
var pauseBtnV, playMenuBtn, creditsBtn, logoImg, levelSelectContainer, heroVictory;
var isGamePaused;
var menuEase;
var smallWindow, sunContainer;
var owl;
var owlXAXA = false;

function initInterface() {
    pauseBtnV = createButtonWin(winSS, 40, 35, 1, "butPause", onPausePress, null, onPauseUp);
    restartPlayBtn = createButtonWin(winSS, 40, 35, 1, "butRestart", onRestartPress, null, onRestartUp);
    menuEase = createjs.Ease.getElasticOut(1, 0.35);
    createMainMenu();
    createLevelSelectMenu();
    createLevelCompleteWin();
    createPauseWin();
    createLevelNum();
    createRestartWin();
    createCreditsWin();
    creategameCompleteWin();
    createBlinkWin();
    createSunContainer();
    isGamePaused = true;
    if (!isSkipMenus) if (isLevelSelectShow) showLevelsMenu();
    else showMainMenu(false);
    else showGameInterface()
}
var blinkWin;

function createBlinkWin() {
    blinkWin = createButtonWin(winSS, ow / 2, oh / 2, 2, "tint2");
    blinkWin.scaleY = 3
}
function startBlink(animTime, frame) {
    addToParent(blinkWin, container);
    blinkWin.alpha = 1;
    blinkWin.gotoAndStop(frame);
    createjs.Tween.get(blinkWin, {
        override: true
    }).to({
            alpha: 0
        }, animTime).call(removeChildOnTweenComplete)
}
function showFPSMeter() {
    if (isNeedFpsMeter) addToParent(fpsText, container)
}

function showGameInterface() {
    if (!pauseBtnV.parent) blockContainer.addChild(pauseBtnV);
    pauseBtnV.y = 670;
    pauseBtnV.x = 40;
    blockContainer.addChild(restartPlayBtn);
    restartPlayBtn.y = 670;
    restartPlayBtn.x = 115;
    showSpilLogo(ow / 2 - 50, 10, 1, container);
    showFPSMeter()
}
function hideGameInterface() {
    if (pauseBtnV.parent) blockContainer.removeChild(pauseBtnV);
    if (restartPlayBtn.parent) blockContainer.removeChild(restartPlayBtn)
}

function onPausePress(event) {
    if (isGamePaused || (isLevelFailed || isLevelCompleted)) return;
    onHoverScale(event.target)
}
function onPauseUp(event) {
    onOutScale(event.target);
    if (isGamePaused || (isLevelFailed || (isLevelCompleted || levelPauseContainer.parent))) return;
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    showPauseWin()
}
var readyLevelNum, levelLabel;

function createLevelNum() {
    levelLabel = createButtonWin(winSS, ow / 2, oh / 2, 1, "levelLabel", null, null, null);
    readyLevelNum = new createjs.BitmapText("1", sunSS);
    readyLevelNum.letterSpacing = -2;
    readyLevelNum.x = 188;
    readyLevelNum.y = 52;
    readyLevelNum.mouseEnabled = false
}
var restartContainer, restartTitle, restartMessage, restartPlayBtn, moreEasyBtn, restartMuteBtn, butMoreGames;

function createRestartWin() {
    restartContainer = new createjs.Container;
    smallWindow = createButtonWin(winSS, ow / 2, oh / 2, 1, "smallWin", null, restartContainer);
    createButtonWin(winSS, 160, oh / 2 - 150, 1, "levelFailedLabel", null, restartContainer);
    createButtonWin(winSS, ow / 2 - 50, oh / 2 + 120, 1, "butRestart", onRestartPress, restartContainer, onRestartUp);
    restartMuteBtn = createButtonWin(winSS, ow / 2 + 50, oh / 2 + 120, 1, "butMusic", onPauseMutePress, restartContainer, OnOffMute);
    butMoreGames = createButtonWin(winSS, ow / 2, oh / 2 + 50, 1, "butGames", SPIL_API.Branding.getLink("more_games").action, restartContainer, null)
}
function onMoreEasyPress(event) {
    event.target.scaleX = event.target.scaleY = 1.1
}
function onMoreEasyUp(event) {
    event.target.scaleX = event.target.scaleY = 1;
    if (isCursorOutMoved(event)) return;
    MORE_EASY_MULT += 0.5;
    hideRestartWin();
    restartLevel();
    playSound("clickSound")
}
function onRestartPress(event) {
    event.target.scaleX = event.target.scaleY = 1.1
}

function onRestartUp(event) {
    event.target.scaleX = event.target.scaleY = 1;
    if (isCursorOutMoved(event)) return;
    hideRestartWin();
    restartLevel();
    playSound("clickSound");
    countStarsLevel = 0
}

function showRestartWin() {
    if (!isLevelFailed) return;
    playSound("restartSound");
    isGamePaused = true;
    hideGameInterface();
    updateMusicIconFrame(restartMuteBtn);
    container.addChild(restartContainer);
    restartContainer.x = -ow;
    restartContainer.alpha = 0;
    createjs.Tween.get(restartContainer).to({
        alpha: 1,
        x: 0
    }, 1300, menuEase);
    counrStarsLevel = 0
}

function hideRestartWin() {
    createjs.Tween.removeTweens(restartContainer);
    createjs.Tween.get(restartContainer, {
        override: true
    }).to({
            alpha: 0,
            x: ow
        }, 200).call(removeChildOnTweenComplete);
    showGameInterface()
}
var menuContainer, mainMenuMuteBtn, menuSun, menuCloud1, menuCloud2;
var spilLogo;

function createSunContainer() {
    sunContainer = new createjs.Container;
    menuSun = createButtonWin(winSS, ow / 2, oh / 2 - 100, 1, "menuSun", null, sunContainer, null);
    menuCloud1 = createButtonWin(winSS, 342, 330 - 113, 1, "menuCloud1", null, sunContainer, null);
    menuCloud2 = createButtonWin(winSS, 0, 304 - 130, 1, "menuCloud2", null, sunContainer, null)
}

function createMainMenu() {
    menuContainer = new createjs.Container;
    createButtonWin(winSS, 110, 450 - 236 / 2, 1, "menuLabel", null, menuContainer, null);
    playMenuBtn = createButtonWin(winSS, ow / 2, oh / 2 + 275, 1, "butStart", onPlayPress, menuContainer, onPlayUp);
    creditsBtn = createButtonWin(winSS, ow / 2 + 250, 640, 1, "butCredits", onCreditsPress, menuContainer, onCreditsUp);
    mainMenuMuteBtn = createButtonWin(winSS, ow / 2 - 250, 640, 1, "butMusic", onMainMenuMutePress, menuContainer, OnOffMute);
    spilLogo = createSponsorButton(0, 0, 1, null);
    if (!isShowLogo) spilLogo.visible = false;
    if (!isAudioSupported) mainMenuMuteBtn.visible = false
}
var MUTED_FRAME = "butMusicNo";
var UNMUTED_FRAME = "butMusic";

function onMainMenuMutePress(event) {
    onHoverScale(event.target)
}
function updateMusicIconFrame(btn) {
    var frame = isMute ? MUTED_FRAME : UNMUTED_FRAME;
    btn.gotoAndStop(frame)
}

function showMainMenu(isWithAnimation) {
    menuContainer.addChildAt(sunContainer, 0);
    container.addChild(menuContainer);
    showSpilLogo(0, 0, 1, menuContainer);
    updateMusicIconFrame(mainMenuMuteBtn);
    showFPSMeter();
    if (!isWithAnimation) {
        createMainMenuTweens();
        createSunTweens();
        return
    }
    startBlink(700, "tint2");
    createMainMenuTweens();
    createSunTweens();
    isNeedCacheSizeUpdate = true
}

function showSpilLogo(x, y, scale, parent, alpha) {
    addToParent(spilLogo, parent);
    spilLogo.x = x;
    spilLogo.y = y;
    spilLogo.scaleX = spilLogo.scaleY = scale;
    spilLogo.alpha = alpha ? alpha : 1
}
function showMainMenuTweenComplete(event) {
    createMainMenuTweens()
}
function hideMainMenu() {
    disposeMainMenuTweens();
    disposeSunTweens();
    removeFromParent(menuContainer)
}
function hideMainMenuTweenComplete(event) {
    var cont = event.target;
    cont.alpha = 1;
    playMenuBtn.scaleX = playMenuBtn.scaleY = 1;
    if (cont.parent) container.removeChild(cont)
}

function createSunTweens() {
    var ease = createjs.Ease.bounceOut;
    menuCloud1.scaleX = menuCloud1.scaleY = 1.05;
    menuCloud2.scaleX = menuCloud2.scaleY = 1.05;
    menuSun.rotation = -5;
    createjs.Tween.get(menuSun, {
        override: true,
        loop: true
    }).to({
            rotation: 5
        }, 2E3).to({
            rotation: -5
        }, 2E3);
    createjs.Tween.get(menuCloud1, {
        override: true,
        loop: true
    }).to({
            scaleX: 1,
            scaleY: 1
        }, 1800).to({
            scaleX: 1.05,
            scaleY: 1.05
        }, 1500);
    createjs.Tween.get(menuCloud2, {
        override: true,
        loop: true
    }).to({
            scaleX: 1,
            scaleY: 1
        }, 2E3).to({
            scaleX: 1.05,
            scaleY: 1.05
        }, 1900)
}

function createMainMenuTweens() {
    var ease = createjs.Ease.bounceOut;
    playMenuBtn.scaleX = playMenuBtn.scaleY = 0.8;
    createjs.Tween.get(playMenuBtn, {
        override: true,
        loop: true
    }).to({
            scaleX: 1,
            scaleY: 1
        }, 3E3, ease).wait(1E3).to({
            scaleX: 0.8,
            scaleY: 0.8
        }, 3E3, ease)
}
function disposeMainMenuTweens() {
    createjs.Tween.removeTweens(playMenuBtn)
}
function disposeSunTweens() {
    createjs.Tween.removeTweens(menuSun);
    createjs.Tween.removeTweens(menuCloud1);
    createjs.Tween.removeTweens(menuCloud2)
}

function onPlayPress(event) {
    onHoverScale(event.target)
}
function onPlayUp(event) {
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    hideMainMenu();
    showLevelsMenu()
}
function onAchievGalleryPress(event) {
    onHoverScale(event.target)
}
function onAchievGalleryUp(event) {
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound")
}
function onCreditsPress(event) {
    onHoverScale(event.target)
}

function onCreditsUp(event) {
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    hideMainMenu();
    showCreditsWin()
}

function createButtonMouse(spriteSheet, x, y, scale, visionLabel, mouseDownFunc, parent, mouseUpFunc) {
    var b = new createjs.Sprite(spriteSheet);
    b.snapToPixel = true;
    b.x = x;
    b.y = y;
    b.scaleX = b.scaleY = scale;
    b.gotoAndStop(visionLabel);
    b.defaultScale = scale;
    if (mouseUpFunc) b.addEventListener("pressup", mouseUpFunc, false);
    if (mouseDownFunc) {
        b.addEventListener("mousedown", mouseDownFunc, false);
        b.cursor = "pointer"
    } else b.mouseEnabled = false;
    if (mouseDownFunc || mouseUpFunc) {
        var data = sunSS.getAnimation(visionLabel);
        if (data && (data.frames && data.frames.length > 0)) {
            var rect = sunSS.getFrameBounds(data.frames[0]);
            b.setBoundingBox(rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale)
        }
    }
    if (parent) parent.addChild(b);
    return b
}

function createButtonWin(spriteSheet, x, y, scale, visionLabel, mouseDownFunc, parent, mouseUpFunc) {
    var b = new createjs.Sprite(spriteSheet);
    b.snapToPixel = true;
    b.x = x;
    b.y = y;
    b.scaleX = b.scaleY = scale;
    b.gotoAndStop(visionLabel);
    b.defaultScale = scale;
    if (mouseUpFunc) b.addEventListener("pressup", mouseUpFunc, false);
    if (mouseDownFunc) {
        b.addEventListener("mousedown", mouseDownFunc, false);
        b.cursor = "pointer"
    } else b.mouseEnabled = false;
    if (mouseDownFunc || mouseUpFunc) {
        var data = spriteSheet.getAnimation(visionLabel);
        if (data && (data.frames && data.frames.length > 0)) {
            var rect = spriteSheet.getFrameBounds(data.frames[0]);
            b.setBoundingBox(rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale)
        }
    }
    if (parent) parent.addChild(b);
    return b
}

function createSponsorButton(x, y, scale, parent) {
    var w = SPIL_LOGO.width;
    var h = SPIL_LOGO.height;
    var b = new createjs.Bitmap(SPIL_LOGO);
    b.snapToPixel = true;
    b.x = x;
    b.y = y;
    b.scaleX = b.scaleY = scale;
    b.cursor = "pointer";
    b.defaultScale = scale;
    b.addEventListener("mousedown", SPIL_API.Branding.getLogo().action);
    b.setBoundingBox(-w / 2, -h / 2, w, h);
    if (parent) parent.addChild(b);
    return b
}
var selectMenuBackBtn, selectMenuNextBtn, selectMenuPreviousBtn;
var allLevelBtns = [];
var levelsScreen1;

function createLevelSelectMenu() {
    levelSelectContainer = new createjs.Container;
    levelSelectContainer.name = "levelselcont";
    levelsScreen1 = new createjs.Container;
    levelsScreen1.name = "levelsScreen1";
    selectMenuBackBtn = createButtonWin(winSS, 40, 650, 1, "butBack", onBackToMenuPress, levelsScreen1, onBackToMenuUp);
    createLevelsButtons();
    levelSelectContainer.addChild(levelsScreen1)
}
function cacheWin(win) {
    var margin = 10;
    win.cache(-margin, -margin, ow + margin * 2, oh + margin * 2)
}
function uncacheWin(win) {
    win.uncache()
}

function createLevelsButtons() {
    for (var i = 0; i < LEVELS_NUM; i++) {
        var cell = i % 5;
        var row = Math.floor(i / 5);
        var margin = 100;
        var margin2 = 115;
        var btn = createButtonWin(winSS, margin + cell * margin2, 120 + row * 130, 1, "lvlLabelStar0", onLevelBtnPress, levelsScreen1, onLevelBtnUp);
        btn.levelNum = i;
        allLevelBtns.push(btn);
        var txtNum = new createjs.BitmapText("0", winSS);
        txtNum.x = btn.x;
        setTextAndCenter(btn.x - 3, 0, (i + 1).toString(), txtNum);
        txtNum.y = btn.y - 65;
        txtNum.mouseEnabled = false;
        btn.txtNum = txtNum
    }
}

function updateLevelsButtons() {
    for (var i = 0; i < LEVELS_NUM; i++) {
        var isOpened = i <= lastopenedlvl;
        if (isOpenAllLevels) isOpened = i < openedLevels;
        var frame;
        if (isOpened) {
            var stars = getStarsForLevel(i);
            frame = "lvlLabelStar" + stars
        } else frame = "levelbuttonlocked";
        var btn = allLevelBtns[i];
        btn.gotoAndStop(frame);
        btn.isOpened = isOpened;
        if (isOpened) {
            if (!btn.txtNum.parent) btn.parent.addChild(btn.txtNum)
        } else if (btn.txtNum.parent) btn.parent.removeChild(btn.txtNum)
    }
}

function onLevelBtnPress(event) {
    var b = event.target;
    onHoverScale(b)
}
function onLevelBtnUp(event) {
    var b = event.target;
    onOutScale(b);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    if (b.isOpened) {
        countStarsLevel = 0;
        showGameInterface();
        loadLevel(b.levelNum);
        startBlink(400, "tint2");
        showGameField();
        hideLevelsMenu()
    }
}
function onBackToMenuPress(event) {
    var b = event.target;
    onHoverScale(event.target)
}

function onBackToMenuUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    hideLevelsMenu();
    showMainMenu(true);
    playSound("clickSound")
}
function showLevelsMenu() {
    container.addChild(levelSelectContainer);
    updateLevelsButtons();
    if (!levelsScreen1.parent) levelSelectContainer.addChild(levelsScreen1);
    levelsScreen1.x = 0;
    levelsScreen1.alpha = 1;
    startBlink(700, "tint2");
    showSpilLogo(ow / 2 - 50, 640, 1, levelSelectContainer);
    isNeedCacheSizeUpdate = true
}

function hideLevelsMenu() {
    createjs.Tween.removeTweens(levelSelectContainer);
    removeFromParent(levelSelectContainer)
}

function showGameField() {
    createjs.Tween.removeTweens(blockContainer);
    if (!blockContainer.parent) container.addChild(blockContainer);
    blockContainer.alpha = 0;
    blockContainer.visible = true;
    createjs.Tween.get(blockContainer, {
        override: true
    }).to({
            alpha: 1
        }, 400);
    readyLevelNum.text = (currentLevel + 1).toString();
    blockContainer.addChild(levelLabel);
    blockContainer.addChild(readyLevelNum);
    levelLabel.x = 8;
    levelLabel.y = 12;
    readyLevelNum.x = 100;
    readyLevelNum.y = 8;
    if (heroVictory) {
        createjs.Tween.removeTweens(heroVictory);
        blockContainer.removeChild(heroVictory)
    }
}

function hideGameField(isNeedLevelDispose, time) {
    isGamePaused = true;
    createjs.Tween.removeTweens(blockContainer);
    var tween = createjs.Tween.get(blockContainer, {
        override: true
    }).to({
            alpha: 0,
            visible: false
        }, time ? time : 400).call(removeFromParent);
    if (isNeedLevelDispose);
}
var levelCompleteContainer, completeWinNextBtn, star1, star2, star3;

function createLevelCompleteWin() {
    levelCompleteContainer = new createjs.Container;
    smallWindow = createButtonWin(winSS, ow / 2, oh / 2 + 20, 1, "smallWin", null, levelCompleteContainer);
    createButtonWin(winSS, ow / 2 - 200, oh / 2 - 160, 1, "levelCompleteLabel", null, levelCompleteContainer, null);
    completeWinNextBtn = createButtonWin(winSS, ow / 2 + 80, oh / 2 + 160, 1, "butNext", onPressStandartHandler, levelCompleteContainer, onNextLevelUp);
    createButtonWin(winSS, ow / 2 - 80, oh / 2 + 160, 1, "butRestart", onPressStandartHandler, levelCompleteContainer, onCompleteRestartUp);
    createButtonWin(winSS, ow / 2, oh / 2 + 160, 1, "butMenu", onPressStandartHandler, levelCompleteContainer, onCompleteQuitUp);
    butMoreGames = createButtonWin(winSS, ow / 2, oh / 2 + 90, 1, "butGames", SPIL_API.Branding.getLink("more_games").action, levelCompleteContainer, onPressMoreGames);
    createButtonWin(winSS, ow / 2 - 120, oh / 2 + 10, 1, "starBlack", null, levelCompleteContainer, null);
    createButtonWin(winSS, ow / 2, oh / 2, 1, "starBlack", null, levelCompleteContainer, null);
    createButtonWin(winSS, ow / 2 + 120, oh / 2 + 10, 1, "starBlack", null, levelCompleteContainer, null);
    star1 = createButtonWin(winSS, ow / 2 - 120, oh / 2 + 10, 1, "menuStar", null, null, null);
    star2 = createButtonWin(winSS, ow / 2, oh / 2, 1, "menuStar", null, null, null);
    star3 = createButtonWin(winSS, ow / 2 + 120, oh / 2 + 10, 1, "menuStar", null, null, null)
}
function onCompleteQuitUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    hideGameField(true);
    disposeLevel();
    hideLevelCompleteWin();
    showLevelsMenu();
    playSound("clickSound")
}

function onCompleteRestartUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    restartLevel();
    showGameField();
    hideLevelCompleteWin()
}
function onPressMoreGames(event) {
    onHoverScale(event.target)
}
function onPressStandartHandler(event) {
    onHoverScale(event.target)
}

function onNextLevelUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    hideLevelCompleteWin();
    var achievId = -1;
    if (achievId > -1) showAchievWin(achievId);
    else if (currentLevel >= LEVELS_NUM - 1) {
        hideGameInterface();
        disposeLevel();
        showGameCompleteWin()
    } else {
        loadNextLevel();
        showGameField();
        SPIL_API.GameBreak.request(pauseGame, resumeGame)
    }
}

function pauseGame() {
    console.log("The advertisement is about to show, you should pause your game");
    isGamePaused = true;
    stopFonSound()
}
function resumeGame() {
    console.log("The advertisment is shown and your game can now be resumed");
    if (!isMute) playSound("FonSound", true);
    isGamePaused = false
}
var currentLevelStarsNum = 0;

function showLevelCompleteWin() {
    if (!isLevelCompleted) return;
    hideGameInterface();
    createjs.Tween.removeTweens(levelCompleteContainer);
    removeFromParent(star1);
    removeFromParent(star2);
    removeFromParent(star3);
    for (var i = 0; i < allStars.length; i++) {
        var b = allStars[i];
        b.stop();
        removeFromParent(b)
    }
    allStars = [];
    container.addChild(levelCompleteContainer);
    levelCompleteContainer.x = 400;
    levelCompleteContainer.y = -22;
    levelCompleteContainer.alpha = 0;
    createjs.Tween.get(blockContainer).wait(400).call(hideGameField);
    createjs.Tween.get(levelCompleteContainer, {
        override: true
    }).wait(500).to({
            alpha: 1,
            x: 0
        }, 1300, menuEase).call(showStars);
    currentLevelStarsNum = ZERO_STAR;
    if (countStarsLevel == 1) currentLevelStarsNum = ONE_STAR;
    if (countStarsLevel == 2) currentLevelStarsNum = TWO_STAR;
    if (countStarsLevel == 3) currentLevelStarsNum = THREE_STAR;
    saveGame(currentLevelStarsNum);
    countStarsLevel = 0;
    playSound("winSound")
}

function showStars(event) {
    if (currentLevelStarsNum >= ONE_STAR) animateStarEffect(star1, 20, 1, "note1Sound");
    if (currentLevelStarsNum >= TWO_STAR) animateStarEffect(star2, 800, 1, "note2Sound");
    if (currentLevelStarsNum >= THREE_STAR) animateStarEffect(star3, 1600, 1, "note3Sound")
}

function animateStarEffect(star, delay, scale, soundName) {
    levelCompleteContainer.addChild(star);
    star.alpha = 0;
    star.scaleX = star.scaleY = 2;
    star.rotation = 0;
    createjs.Tween.get(star, {
        override: true
    }).wait(delay).call(function() {
            playSound(soundName)
        }).to({
            alpha: 1,
            scaleX: scale,
            scaleY: scale
        }, 700, createjs.Ease.bounceOut).wait(50).call(function() {
            createStarEffect(star.x, star.y, 1.5, levelCompleteContainer)
        })
}
function removeFromParent(obj) {
    if (obj.parent) obj.parent.removeChild(obj)
}

function hideLevelCompleteWin() {
    createjs.Tween.removeTweens(star1);
    createjs.Tween.removeTweens(star2);
    createjs.Tween.removeTweens(star3);
    createjs.Tween.removeTweens(levelCompleteContainer);
    createjs.Tween.get(levelCompleteContainer).to({
        alpha: 0,
        x: -400
    }, 200).call(removeChildOnTweenComplete);
    showGameInterface()
}
var levelPauseContainer, pauseContinueBtn, pauseMuteBtn, pauseTitle;

function createPauseWin() {
    levelPauseContainer = new createjs.Container;
    smallWindow = createButtonWin(winSS, ow / 2, oh / 2, 1, "smallWin", null, levelPauseContainer);
    createButtonWin(winSS, ow / 2 - 100, oh / 2 - 170, 1, "pauseLabel", null, levelPauseContainer, null);
    createButtonWin(winSS, ow / 2 + 80, oh / 2 + 150, 1, "butMenu", onPauseQuitPress, levelPauseContainer, onPauseQuitUp);
    createButtonWin(winSS, ow / 2 - 80, oh / 2 + 150, 1, "butRestart", onPauseRestartPress, levelPauseContainer, onPauseRestartUp);
    butMoreGames = createButtonWin(winSS, ow / 2, oh / 2 + 90, 1, "butGames", SPIL_API.Branding.getLink("more_games").action, levelPauseContainer, onPressMoreGames);
    pauseMuteBtn = createButtonWin(winSS, ow / 2, oh / 2 + 150, 1, "butMusic", onPauseMutePress, levelPauseContainer, OnOffMute);
    if (!isAudioSupported) pauseMuteBtn.visible = false;
    pauseContinueBtn = createButtonWin(winSS, ow / 2, oh / 2 + 10, 1, "butGo", onPauseContinuePress, levelPauseContainer, onPauseContinueUp)
}
function onPauseMutePress(event) {
    onHoverScale(event.target)
}

function onPauseRestartPress(event) {
    var b = event.target;
    onHoverScale(event.target)
}
function onPauseRestartUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    hidePauseWin(false, false);
    showGameField();
    restartLevel()
}
function onPauseQuitPress(event) {
    onHoverScale(event.target)
}

function onPauseQuitUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    isGamePaused = true;
    disposeLevel();
    hidePauseWin(false, true);
    hideGameField(true, 100);
    showLevelsMenu()
}
function onPauseContinuePress(event) {
    onHoverScale(event.target)
}
function onPauseContinueUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    hidePauseWin(false, false)
}

function showPauseWin() {
    isGamePaused = true;
    hideGameInterface();
    updateMusicIconFrame(pauseMuteBtn);
    container.addChild(levelPauseContainer);
    pauseContinueBtn.visible = true;
    levelPauseContainer.x = -ow;
    levelPauseContainer.y = -20;
    levelPauseContainer.alpha = 0;
    createjs.Tween.get(levelPauseContainer).to({
        alpha: 1,
        x: 0
    }, 1300, menuEase);
    countStarsLevel = 0
}

function hidePauseWin(isRightDir, isHideInterface) {
    isGamePaused = false;
    createjs.Tween.removeTweens(levelPauseContainer);
    createjs.Tween.get(levelPauseContainer).to({
        alpha: 0,
        x: 400
    }, 300).call(removeChildOnTweenComplete);
    if (!isHideInterface) showGameInterface()
}
function OnOffMute(event) {
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    toggleMute();
    updateMusicIconFrame(event.target);
    if (!isMute) playSound("clickSound");
    if (!isMute) playSound("FonSound", true);
    else stopFonSound()
}
var creditsContainer;

function createCreditsWin() {
    creditsContainer = new createjs.Container;
    smallWindow = createButtonWin(winSS, ow / 2, oh / 2, 1, "smallWin", null, creditsContainer);
    createButtonWin(winSS, ow / 2 - 130, oh / 2 - 185, 1, "creditsLabel", null, creditsContainer, null);
    createButtonWin(winSS, ow / 2 - 240, oh / 2 + 160, 1, "butBack", onCreditsQuitPress, creditsContainer, onCreditsQuitUp);
    createButtonWin(winSS, 90, oh / 2 - 50, 1, "labelPaul", null, creditsContainer, null);
    createButtonWin(winSS, 90, oh / 2 + 10, 1, "labelKedi", null, creditsContainer, null);
    createButtonWin(winSS, 95, oh / 2 + 100, 1, "labelAhura", null, creditsContainer, null);
    createButtonWin(winSS, 390, oh / 2 + 90, 1, "labelOwl", null, creditsContainer, null);
    owl = createButtonWin(sunSS, 505, oh / 2 + 106, 1, "DECOR_OWL_TYPE", null, creditsContainer, owlClick);
    owl.mouseEnabled = true;
    owl.cursor = "pointer";
    owl.play()
}
function owlClick(event) {
    var obj = event.target;
    owlXAXA = true;
    obj.gotoAndPlay("DECOR_OWL_UHU");
    playSound("owlSound")
}
function onSiteLinkPress(event) {}

function onCreditsLinkPress(event) {
    window.location = "mailto:seddas@gmail.com?subject=BattleFish"
}
function onCreditsQuitPress(event) {
    var b = event.target;
    onHoverScale(b)
}
function onCreditsQuitUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    hideCreditsWin();
    showMainMenu(true)
}

function showCreditsWin() {
    container.addChild(creditsContainer);
    creditsContainer.alpha = 0;
    createjs.Tween.get(creditsContainer, {
        override: true
    }).to({
            alpha: 1
        }, 1300, menuEase);
    startBlink(700, "tint2");
    showSpilLogo(ow / 2 - 50, 550, 1, creditsContainer)
}
function hideCreditsWin() {
    createjs.Tween.removeTweens(creditsContainer);
    createjs.Tween.get(creditsContainer, {
        override: true
    }).to({
            alpha: 0
        }, 200).call(removeChildOnTweenComplete)
}
var gameCompleteContainer, collectedStarsTxt;

function creategameCompleteWin() {
    gameCompleteContainer = new createjs.Container;
    createButtonWin(winSS, 30, oh / 2 + 120, 1, "labelCongratulation", null, gameCompleteContainer, null);
    createButtonWin(winSS, 80, oh / 2 + 50, 1, "labelAwesome", null, gameCompleteContainer, null);
    butMoreGames = createButtonWin(winSS, ow / 2, 580, 1, "butGames", SPIL_API.Branding.getLink("more_games").action, gameCompleteContainer, onPressMoreGames);
    createButtonWin(winSS, ow / 2, 660, 1, "butGo", ongameCompleteQuitPress, gameCompleteContainer, ongameCompleteQuitUp)
}

function ongameCompleteQuitPress(event) {
    var b = event.target;
    b.scaleX = b.scaleY = 1.2
}
function ongameCompleteQuitUp(event) {
    var b = event.target;
    onOutScale(event.target);
    if (isCursorOutMoved(event)) return;
    playSound("clickSound");
    hidegameCompleteWin();
    showMainMenu(true)
}
var isGameCompleteScreenShow = false;

function showGameCompleteWin() {
    isGameCompleteScreenShow = true;
    gameCompleteContainer.addChildAt(sunContainer, 0);
    createSunTweens();
    container.addChild(gameCompleteContainer);
    gameCompleteContainer.x = 0;
    gameCompleteContainer.y = 0;
    gameCompleteContainer.alpha = 0;
    createjs.Tween.get(gameCompleteContainer, {
        override: true
    }).to({
            alpha: 1
        }, 1300, createjs.Ease.elasticOut)
}

function hidegameCompleteWin() {
    isGameCompleteScreenShow = false;
    updateMobileBrowserParams();
    createjs.Tween.removeTweens(gameCompleteContainer);
    disposeSunTweens();
    createjs.Tween.get(gameCompleteContainer, {
        override: true
    }).to({
            alpha: 0
        }, 200).call(removeChildOnTweenComplete)
}

function createStarEffect(x, y, scale, parent) {
    var b = createButtonMouse(sunSS, x, y, scale, "starEffect", null, parent, null);
    b.play();
    createjs.Tween.get(b, {
        override: true
    }).wait(240).call(removeChildOnTweenComplete);
    if (parent) parent.addChild(b);
    return b
}

function createHeroVictory(xHero, x, y, scale, parent) {
    heroVictory = createButtonWin(sunSS, xHero, y, scale, "HERO_VICTORY", null, parent, null);
    heroVictory.scaleX = 0.3;
    heroVictory.scaleY = 0.3;
    heroVictory.rotation = 0;
    createjs.Tween.get(heroVictory, {
        override: true
    }).to({
            x: x,
            scaleX: 1.5,
            scaleY: 1.5,
            rotation: 720
        }, 1E3).call(removeChildOnTweenComplete).call(showLevelCompleteWin);
    if (parent) parent.addChildAt(heroVictory, 0);
    return heroVictory
}

function uncacheAndRemove(event) {
    var screen = event.target;
    uncacheWin(screen);
    if (screen.parent) screen.parent.removeChild(screen)
}
function removeChildOnTweenComplete(event) {
    var screen = event.target;
    if (screen.parent) screen.parent.removeChild(screen)
}
function isTweened(obj) {
    return createjs.Tween.hasActiveTweens(obj)
}
var hitPoint;

function isCursorOutMoved(event) {
    if (!isDesktop()) return false;
    hitPoint = event.target.globalToLocal(event.stageX, event.stageY);
    return !event.target.hitTest(hitPoint.x, hitPoint.y)
}
var rotatedDecors = [];

function interfaceTick() {
    if (owlXAXA) if (owl.currentAnimationFrame > 13) {
        owl.gotoAndPlay("DECOR_OWL_TYPE");
        owlXAXA = false
    }
    for (var i = allStars.length - 1; i > -1; i--) {
        var b = allStars[i];
        if (b.currentAnimationFrame > 13) b.stop()
    }
}

function isMobileDetected(a) {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|android|ipad|playbook|silk|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
}
var stage, exportRoot, canvas;
var rect;
var container, preload, rotationContainer, particleContainer, containerBar;
var winWidth;
var winHeight;
var scaleFactor = 1;
var minW = 640;
var minH = 712;
var ow = minW;
var oh = minH;
var maxW = 640;
var maxH = 960;
var desctopMaxW = maxW;
var desctopMaxH = maxH;
var viewportW = minW;
var viewportH = minH;
var pixelDensity = 1;

function initResizeManager() {
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("touchstart", PreventScrollTouch);
    window.onorientationchange = orientChange;
    onGameResize();
    setTimeout(hideAdressBar, 100);
    hideAddressbar(document.getElementById("gamediv"))
}
var isWasPaused = null;
var topVisionLine;

function onGameResize() {
    hideAdressBar();
    try {
        var w = window.innerWidth;
        var h = window.innerHeight;
        scaleFactor = Math.min(w / minW, h / minH);
        stage.scaleX = 1;
        stage.scaleY = 1;
        stage.canvas.width = Math.min(w, maxW * scaleFactor);
        stage.canvas.height = Math.min(h, maxH * scaleFactor);
        if (isDesktop()) {
            var maxScale = 1.5;
            var scaleParam = getURLParameter("scale");
            if (scaleParam) maxScale = parseFloat(scaleParam);
            scaleFactor = Math.min(scaleFactor, maxScale);
            stage.canvas.width = Math.min(w, desctopMaxW * scaleFactor);
            stage.canvas.height = Math.min(h, desctopMaxH * scaleFactor)
        } else;
        stage.canvas.style.left = Math.floor((w - stage.canvas.width) / 2) + "px";
        stage.canvas.style.top = Math.floor((h - stage.canvas.height) / 2) + "px";
        viewportH = stage.canvas.height / scaleFactor;
        viewportW = stage.canvas.width / scaleFactor;
        topVisionLine = -(viewportH - oh);
        stage.autoClear = false;
        container.scaleX = scaleFactor;
        container.scaleY = scaleFactor;
        container.x = Math.round((stage.canvas.width - ow * scaleFactor) / 2);
        container.y = Math.round((stage.canvas.height - oh * scaleFactor) / 2);
        if (splashContainer) {
            splashContainer.scaleX = container.scaleX;
            splashContainer.scaleY = container.scaleY;
            splashContainer.x = container.x;
            splashContainer.y = container.y
        }
        winWidth = w;
        winHeight = h;
        timer = null;
        var yy = (oh - barHeight) / 2 + deltaForVCenter();
        if (loaderBar) loaderBar.y = yy;
        if (myBarbg) myBarbg.y = yy - 27;
        if (containerBar) containerBar.y = yy;
        if (myMask) myMask.y = yy;
        stage.update();
        isNeedCacheSizeUpdate = true;
        if (isPhysicsDebugDraw && debugDraw) {
            debugCanvas.width = stage.canvas.width;
            debugCanvas.height = stage.canvas.height;
            debugCanvas.style.left = stage.canvas.style.left;
            debugCanvas.style.top = stage.canvas.style.top;
            debugCanvas.style.marginLeft = container.x + "px";
            debugCanvas.style.marginTop = container.y + "px";
            debugDraw.SetDrawScale(30 * scaleFactor)
        }
    } catch (e) {
        window.alert(e.name + ":" + e.message)
    }
}
function sizeHandler() {}
function deltaForVCenter() {
    return -(viewportH - oh) / 2
}
function deltaForVTop() {
    return -(viewportH - oh)
}
function deltaForHLeft() {
    return -(viewportW - ow) / 2
}
function getMaxLeft() {
    return -(maxW - ow) / 2
}
function getMaxRight() {
    return maxW + getMaxLeft()
}

function getMaxTop() {
    return -(maxH - oh)
}
function orientChange(event) {
    setTimeout(hideAdressBar, 50);
    onWindowResize(null)
}
function hideAdressBar() {
    window.scrollTo(0, 1)
}
function PreventScrollTouch(e) {
    window.scrollTo(0, 1);
    if (window.innerHeight != winHeight) onWindowResize(null);
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false
}
var timer;

function onWindowResize(event) {
    setTimeout(hideAdressBar, 1);
    clearTimeout(timer);
    setTimeout(onGameResize, 1)
}

function setPixelRatio() {
    if (isHiDPI()) {
        var meta = document.createElement("meta");
        meta.name = "viewport";
        var content = "target-densitydpi=device-dpi, user-scalable=0";
        content += ", initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5";
        meta.content = content;
        document.getElementsByTagName("head")[0].appendChild(meta)
    }
}

function isHiDPI() {
    if (window.hasOwnProperty("devicePixelRatio")) if ((navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("iPad") != -1) && window.devicePixelRatio == 2) return true;
    return false
}
function getURLParameter(name) {
    return decodeURIComponent(((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)")).exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}
var prefixes = ["canvas", "onMouseDown", "onMouseUp", "MyGame", "scale", "position", "reset", "name", "type", "dispose", "parent", "onorientationchange"];
var anyPorInWord = ["webkit", "Event", "setPos", "CSS", "tick", "initialize", "Vector"];
var counterGlobal = 0;

function getAllFunctions(object, onlyProps, onlyFunc) {
    var functionNames = [];
    for (var f in object) {
        var isNeedAdd = true;
        var i;
        for (i = 0; i < prefixes.length; i++) {
            var pref = prefixes[i];
            if (f.indexOf(pref) == 0) isNeedAdd = false
        }
        for (i = 0; i < globalPrefixes.length; i++) {
            var glpref = globalPrefixes[i];
            if (f.indexOf(glpref) == 0) isNeedAdd = false
        }
        for (i = 0; i < anyPorInWord.length; i++) {
            var chars = anyPorInWord[i];
            if (f.indexOf(chars) > -1) isNeedAdd = false
        }
        if (f.length <= 4) isNeedAdd = false;
        if (onlyProps && !object.hasOwnProperty(f)) isNeedAdd = false;
        if (onlyFunc && !(typeof object[f] === "function")) isNeedAdd = false;
        if (isNeedAdd) {
            counterGlobal++;
            functionNames.push(f + "\t" + "y" + counterGlobal + "\n")
        }
    }
    return functionNames.join("")
}
function getAllProperties() {
    var props = [];
    props.push(getAllFunctions(new CharBase(0, container, 1)));
    props.push(getAllFunctions(new ParticleBase(0, container, 1)));
    props.push(getAllFunctions(window));
    console.log(props.join(""))
}

function getDefaultFunctions(object) {
    var functionNames = [];
    for (var f in object) functionNames.push('"' + f + '",');
    return functionNames.join("")
}

function initCleanEasel() {
    var stage = new createjs.Stage("canvas");
    var container = new createjs.Container;
    container.snapToPixel = true;
    stage.addChild(container);
    createjs.Touch.enable(stage, true);
    stage.update();
    var world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 0), false);
    var code = "var globalPrefixes = [" + getDefaultFunctions(window) + "]";
    console.log(code)
}
var globalPrefixes = ["prefixes", "LANDSCAPE_MODE", "Vector_a2j_Number", "Box2D", "document", "getAllFunctions", "getAllProperties", "Utils", "window", "getDefaultFunctions", "globalPrefixes", "Vector", "counterGlobal", "initCleanEasel", "anyPorInWord", "i", "hideTimer", "frameElement", "clientInformation", "onhashchange", "ondragstart", "onmouseleave", "onkeydown", "ondblclick", "outerHeight", "history", "top", "parent", "onpagehide", "oninvalid", "onmouseout", "pageYOffset", "screenLeft", "onkeyup", "onclick", "onvolumechange", "onmouseover", "innerHeight", "offscreenBuffering", "onratechange", "ontransitionend", "ondragover", "onsubmit", "onprogress", "onwaiting", "ontimeupdate", "outerWidth", "onplay", "ondurationchange", "event", "screen", "sessionStorage", "ononline", "oncontextmenu", "onoffline", "onsearch", "onseeked", "ondragenter", "ondrop", "personalbar", "oncanplaythrough", "status", "onpause", "devicePixelRatio", "onloadeddata", "scrollX", "onwebkittransitionend", "screenY", "screenTop", "defaultstatus", "onchange", "frames", "onpageshow", "onseeking", "menubar", "onended", "onsuspend", "pageXOffset", "length", "onreset", "onwebkitanimationiteration", "statusbar", "ondragleave", "oninput", "localStorage", "onloadedmetadata", "name", "onwebkitanimationstart", "onmousemove", "styleMedia", "ondragend", "onunload", "scrollY", "ondrag", "self", "onmousewheel", "onstorage", "onplaying", "onmouseup", "locationbar", "webkitNotifications", "location", "onstalled", "scrollbars", "opener", "onfocus", "oncanplay", "onemptied", "closed", "navigator", "onmouseenter", "onresize", "innerWidth", "speechSynthesis", "onloadstart", "onmessage", "onblur", "onselect", "onkeypress", "toolbar", "crypto", "defaultStatus", "onwebkitanimationend", "screenX", "applicationCache", "onload", "onerror", "console", "onabort", "onbeforeunload", "onmousedown", "onpopstate", "onscroll", "doNotTrack", "safari", "createjs", "hideAddressbar", "moveBy", "find", "cancelAnimationFrame", "resizeTo", "clearTimeout", "btoa", "getComputedStyle", "setTimeout", "scrollBy", "print", "resizeBy", "atob", "openDatabase", "moveTo", "scroll", "confirm", "getMatchedCSSRules", "showModalDialog", "close", "clearInterval", "webkitConvertPointFromNodeToPage", "open", "matchMedia", "webkitRequestAnimationFrame", "prompt", "focus", "blur", "scrollTo", "requestAnimationFrame", "removeEventListener", "postMessage", "setInterval", "getSelection", "alert", "stop", "webkitConvertPointFromPageToNode", "webkitCancelAnimationFrame", "webkitCancelRequestAnimationFrame", "addEventListener", "dispatchEvent", "captureEvents", "releaseEvents"];
var MyGame = {};
var images, files;
var myBar;
var loaderWidth = 409;
var loaderBar;
var barHeight = 33;
var myMask, myBarbg;
var SPIL_API;
var SPIL_LOGO;
var SPIL_SPLASH;
var SPLASH_SCREEN, SPLASH_IMG;
MyGame.init = function() {
    try {
        canvas = document.getElementById("canvas");
        images = images || {};
        files = files || {};
        stage = new createjs.Stage("canvas");
        GameAPI.loadAPI(function(API) {
            var logoData = API.Branding.getLogo();
            var splashData = API.Branding.getSplashScreen();
            SPIL_API = API;
            if (logoData.image) {
                SPIL_LOGO = document.createElement("img");
                SPIL_LOGO.crossOrigin = "Anonymous";
                SPIL_LOGO.src = API.Branding.getLogo().image;
                var links = API.Branding.getLinks();
                for (var linkName in links) switch (linkName) {
                    case "more_games":
                        break;
                    default:
                        if (window.console && console.log) console.log("This game does not handle the link: " + linkName);
                        break
                }
            }
            if (splashData.show && splashData.action) SPIL_SPLASH = splashData
        });
        containerBar = new createjs.Container;
        containerBar.width = loaderWidth;
        containerBar.height = barHeight;
        container = new createjs.Container;
        container.isRoot = true;
        container.width = ow;
        container.height = oh;
        stage.addChild(container);
        detectBrowser();
        blockContainer = new createjs.Container;
        splashContainer = new createjs.Container;
        splashContainer.width = ow;
        splashContainer.height = oh;
        particleContainer = new createjs.Container;
        rotationContainer = new createjs.Container;
        rotationContainer.width = ow;
        rotationContainer.height = oh;
        initResizeManager();
        createjs.Touch.enable(stage, true);
        if (isDesktop()) stage.enableMouseOver(20);
        stage.mouseMoveOutside = true;
        initLoaders();
        stage.update();
        var loader = document.getElementById("loader");
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader)
    } catch (e) {
        window.alert(e.name + ":" + e.message);
        trace(e.name + ":" + e.message)
    }
};

function isDesktop() {
    return isDesktopBrowser
}
function updateMobileBrowserParams() {
    MAX_PARTICLES_ON_SCREEN = isDesktopBrowser ? 30 : 12
}
function detectBrowser() {
    isDesktopBrowser = !isMobileDetected(navigator.userAgent || (navigator.vendor || window.opera));
    var isMobileParam = getURLParameter("mobile");
    if (isMobileParam) {
        if (parseInt(isMobileParam) == 1) isDesktopBrowser = false
    } else;
    updateMobileBrowserParams()
}

function initLoaders() {
    borderPadding = 10;
    loaderColor = createjs.Graphics.getRGB(247, 247, 247);
    loaderBar = new createjs.Container;
    loaderBar.x = container.width - loaderWidth >> 1;
    loaderBar.y = container.height - barHeight >> 1;
    container.addChild(loaderBar);
    initSoundManager();
    preload = new createjs.LoadQueue(true, "assets/");
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("progress", handleOverallProgress);
    preload.addEventListener("complete", handleComplete);
    preload.addEventListener("fileload", handleFileLoad);
    if (isLoadAnimFromJSON) {
        manifest.push({
            src: "sunAssets.json",
            id: "sunassets_json"
        });
        manifest.push({
            src: "assWin.json",
            id: "winassets_json"
        })
    }
    preload.loadManifest(manifest);
    setUpdateFrameMode();
    createjs.Ticker.setFPS(FPS)
}
var tickerEventAdded = false;

function setUpdateFrameMode() {
    createjs.Ticker.reset();
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    if (isTimerUpdateMode) createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
    if (isAllFilesLoaded) {
        if (tickerEventAdded) createjs.Ticker.init();
        else createjs.Ticker.addEventListener("tick", tick);
        tickerEventAdded = true
    }
}
function handleOverallProgress(event) {
    if (isPreloaderBarReady) if (event.total != 0) {
        var progress = event.loaded / event.total;
        myMask.scaleX = progress;
        stage.update()
    }
}
var fpsText;
var sunSS, winSS;
var isPreloaderLogoReady = false;
var isPreloaderBarReady = false;
var butGame;

function handleFileLoad(event) {
    console.log("00");
    console.log(event);
    if (event.item.type == "image") images[event.item.id] = event.result;
    files[event.item.id] = event.result;
    if (!isPreloaderLogoReady) {
        isPreloaderLogoReady = true;
        var w = SPIL_LOGO.width;
        var h = SPIL_LOGO.height;
        var bmp = (new createjs.Bitmap(SPIL_LOGO)).set({
            scaleX: 1,
            scaleY: 1,
            regX: w / 2,
            regY: h / 2,
            cursor: "pointer",
            x: ow / 2 - 100,
            y: 50 + h
        });
        bmp.setBoundingBox(-w / 2, -h / 2, w, h);
        bmp.addEventListener("mousedown", SPIL_API.Branding.getLogo().action);
        if (isShowLogo) loaderBar.addChild(bmp)
    }
    if (event.item.id == "preloaderbut") {
        var image = event.result;
        var w = image.width;
        var h = image.height;
        console.log("xx" + image);
        butGame = (new createjs.Bitmap(image)).set({
            scaleX: 1,
            scaleY: 1,
            regX: w / 2,
            regY: h / 2,
            cursor: "pointer",
            visible: false,
            x: ow / 2 - 100,
            y: 100 + h
        });
        butGame.setBoundingBox(-w / 2, -h / 2, w, h);
        butGame.addEventListener("mousedown", goClick);
        loaderBar.addChild(butGame)
    }
    if (event.item.id == "preloaderbg") {
        var imagebg = event.result;
        myBarbg = (new createjs.Bitmap(imagebg)).set({
            scaleX: 1,
            regX: 0,
            regY: 0
        });
        myBarbg.x = loaderBar.x - 16;
        myBarbg.y = loaderBar.y - 27;
        container.addChildAt(myBarbg, 1)
    }
    if (event.item.id == "mainbg") {
        var bg = event.result;
        mainBg = (new createjs.Bitmap(bg)).set({
            scaleX: 1,
            scaleY: 1,
            regX: 0,
            regY: 124
        });
        container.addChildAt(mainBg, 0)
    }
    if (!isPreloaderBarReady && event.item.id == "preloaderbar") {
        isPreloaderBarReady = true;
        var image = event.result;
        myBar = (new createjs.Bitmap(image)).set({
            scaleX: 1,
            regX: 0,
            regY: 0
        });
        container.addChild(containerBar);
        containerBar.x = loaderBar.x;
        containerBar.y = loaderBar.y;
        containerBar.addChild(myBar);
        myMask = new createjs.Shape;
        myMask.x = containerBar.x;
        myMask.y = containerBar.y;
        myMask.graphics.beginFill("#000").drawRect(0, 0, loaderWidth, barHeight).endFill();
        myMask.scaleX = 0;
        containerBar.mask = myMask
    }
}
function sponsorClick(event) {
    isTimerUpdateMode = true;
    setUpdateFrameMode();
    isPageLeaved = true
}
function moreClick(event) {
    isTimerUpdateMode = true;
    setUpdateFrameMode();
    isPageLeaved = true
}
function goClick(event) {
    initGame()
}
function createRotationScreen() {}
var isAllFilesLoaded = false;

function handleComplete(event) {

    console.log(1111);

    butGame.visible = true;
    stage.update()
}

function initGame() {
    try {
        isAllFilesLoaded = true;
        removeFromParent(loaderBar);
        removeFromParent(containerBar);
        removeFromParent(myBarbg);
        loaderBar = null;
        containerBar = null;
        myBarbg = null;
        configureSpritesheets();
        createSplashScreen();
        createRotationScreen();
        onGameResize();
        startSplash();
        createBG();
        loadSaves();
        initLevelManager();
        initBonusManager();
        if (isNeedFpsMeter) {
            fpsText = new createjs.BitmapText("1", sunSS);
            fpsText.scaleX = fpsText.scaleY = 0.6;
            fpsText.letterSpacing = -7;
            fpsText.x = ow - 37;
            container.addChild(fpsText)
        }
        initInterface();
        if (isSkipMenus) if (isLastLevelLoad) loadLevel(allLevels.length - 1);
        else loadLevel(editLevelToLoad);
        setUpdateFrameMode();
        playFonSound();
        initEditorHandlers();
        if (isGetAllProperties) getAllProperties()
    } catch (e) {
        trace(e.name + ":" + e.message)
    }
}
var splashContainer;

function startSplash() {
    if (isSkipSplash) return;
    if (!splashContainer) return;
    if (splashContainer.parent) return;
    if (!rotationContainer.parent) {
        removeFromParent(container);
        stage.addChild(splashContainer);
        createjs.Tween.get(splashContainer).wait(2E3).call(addContainer).to({
            alpha: 0
        }, 200).call(disposeSplash);
        stage.autoClear = true
    }
}
function addContainer(event) {
    stage.addChildAt(container, 0)
}

function disposeSplash(event) {
    removeFromParent(splashContainer);
    splashContainer = null;
    stage.autoClear = winWidth > maxW * scaleFactor || winHeight > maxH * scaleFactor
}
function createSplashScreen() {
    var splashimg = new createjs.Sprite(winSS);
    splashimg.gotoAndStop("splashlogo");
    splashimg.x = ow / 2;
    splashimg.y = oh / 2;
    splashimg.scaleX = splashimg.scaleY = 1;
    splashimg.cursor = "pointer";
    splashimg.addEventListener("mousedown", SPIL_SPLASH.action);
    splashContainer.addChild(splashimg)
}

function initEditorHandlers() {
    if (isLevelEditor) stage.addEventListener("stagemousedown", handlePress)
}
var mainBg, allBgContainer;
var isNeedCacheSizeUpdate = false;

function createBG() {
    allBgContainer = new createjs.Container;
    container.addChild(allBgContainer);
    allBgContainer.addChild(mainBg);
    allBgContainer.mouseEnabled = false
}

function handlePress(event) {
    if (!isLevelEditor) return;
    var type = -1;
    if (KeyboardJS.isPressed("n")) loadNextLevel();
    if (KeyboardJS.isPressed("l")) showLevelCompleteWin();
    if (KeyboardJS.isPressed("a")) setUpdateFrameMode();
    if (KeyboardJS.isPressed("u"));
    if (KeyboardJS.isPressed("g")) showGameCompleteWin()
}

function configureSpritesheets() {
    if (isLoadAnimFromJSON) {
        sunCFG = eval(files["sunassets_json"]);
        winCFG = eval(files["winassets_json"])
    }
    sunSS = new createjs.SpriteSheet(sunCFG);
    winSS = new createjs.SpriteSheet(winCFG)
}
var counter = 0;
var toDisposePhysicsBodies = [];
var dtScale = 1;
var lastDelta = 0;
var FPS = 30;
var WORLD_STEP = 1 / FPS;
var allHeroesLen = 0;

function tick(event) {
    var d = new Date;
    var n = d.getTime();
    dtScale = event.delta / FPS;
    if (!dtScale || dtScale <= 0) dtScale = 1;
    if (dtScale > 2) dtScale = 2;
    lastDelta = event.delta;
    counter++;
    if (!isGamePaused) {
        while (toDisposePhysicsBodies.length > 0) world.DestroyBody(toDisposePhysicsBodies.pop());
        world.Step(WORLD_STEP * (dtScale > 1.2 ? 1.2 : dtScale), 6, 6);
        if (isPhysicsDebugDraw) world.DrawDebugData();
        world.ClearForces()
    }
    allHeroesLen = allHeroes.length;
    for (var i = 0; i < allChars.length; i++) allChars[i].tick();
    updateBonusManager();
    updateHelpManager();
    interfaceTick();
    stage.update();
    if (isNeedFpsMeter) if (counter % FPS == 0) fpsText.text = Math.floor(createjs.Ticker.getMeasuredFPS()).toString();
    if (counter > 30 && isNeedCacheSizeUpdate) {
        isNeedCacheSizeUpdate = false;
        if (isWithCache) allBgContainer.cache(0, 0, ow + 1, oh + 1, 2)
    }
}
function trace(obj) {
    if (isLevelEditor) console.log(obj)
}
var currentBgIndex = 0;
var allBgIndexes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function showBgByLevelNum(levelNum, forceIndex) {
    if (forceIndex > -1);
    else;
}(function(t) {
    function e() {}
    function n(t) {
        if (t = t || {}, !t.isMaster) throw "The DataStore can only be instantiated by the Master";
        this.dataStore = {}
    }
    function i(t, e) {
        if (this.IS_MASTER = t && t.isMaster ? t.isMaster : !1, this.IS_SLAVE = !this.IS_MASTER, this.messenger = null, this.subscribers = {}, this.moduleReady = e ? e : !1, this.gameState = "resume", !t || !t.messenger) throw Error("No messenger passed to the Game module instance");
        this.messenger = t.messenger, window.addEventListener ? window.addEventListener("message", this._performAction.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._performAction.bind(this))
    }
    function r(t, e) {
        t = t || {}, this.isMaster = t.isMaster, this.messenger = t.messenger, this.moduleReady = e ? e : !1, this.timeoutAfter = 500, this.timeout = !1, this._callbacks = {
            pause: !1,
            resume: !1
        }
    }
    function o(t, e) {
        t = t || {}, this.IS_MASTER = t.isMaster, this.IS_SLAVE = !this.IS_MASTER, this.data = t.data, this.messenger = t.messenger, this.moduleReady = e ? e : !1, this.gamePlayTracking = {
            started: !1,
            appid: null,
            host: null,
            timestamp: null
        }, this.timeInGameTracking = {
            started: !1,
            appid: null,
            timestamp: null
        }
    }
    function a(t, e) {
        t = t || {}, this.IS_MASTER = t.isMaster, this.IS_SLAVE = !this.IS_MASTER, this.moduleReady = e ? e : !1, this.messenger = t.messenger, this.components = t.components, this.data = t.data || null
    }
    function s(t) {
        var e = "string" == typeof t ? u(t) : t;
        e && (this.type = e.type, this.callbackId = e.callbackId, this.data = e.data)
    }
    function u(t) {
        var e, n, i, r = !1,
            o = [];
        if ("string" == typeof t && (o = t.split("|"), "gameapi" === o[0])) {
            o.shift(), e = o.shift(), i = parseInt(o.shift(), 10), n = o.join("|");
            try {
                r = {
                    type: e,
                    callbackId: i,
                    data: "" !== n ? JSON.parse(n) : ""
                }
            } catch (a) {}
        }
        return r
    }
    function c(t) {
        t = t || {}, this.IS_MASTER = "boolean" == typeof t.isMaster ? t.isMaster : !1, this.IS_SLAVE = !this.IS_MASTER, this._target = t.target, this._callbacks = [], this._channels = [], this.IS_MASTER && (t.dataStore && (this.dataStore = t.dataStore)), this._setupEventListener()
    }
    function p(t, n, r, o, a) {
        this.version = "0.9.5", this.isReady = !1, this._setRole(), this.__ = {}, this.__.dataStore = this.IS_MASTER ? new t({
            isMaster: !0
        }) : null, this.__.messenger = new n({
            isMaster: this.IS_MASTER,
            target: this._getTarget(),
            dataStore: this.__.dataStore
        }), this.__.components = new e, this.Branding = new r({
            isMaster: this.IS_MASTER,
            messenger: this.__.messenger,
            components: this.__.components
        }, !1), this.__.EventTracking = new o({
            isMaster: this.IS_MASTER,
            data: null,
            messenger: this.__.messenger
        }, !1), this.GameBreak = new a({
            isMaster: this.IS_MASTER,
            messenger: this.__.messenger
        }, !1), this.Game = new i({
            isMaster: this.IS_MASTER,
            messenger: this.__.messenger
        }, !1)
    }
    var l;
    (function(t) {
        if ("function" == typeof bootstrap) bootstrap("promise", t);
        else if ("object" == typeof exports) module.exports = t();
        else if ("function" == typeof define && define.amd) define(t);
        else if ("undefined" != typeof ses) {
            if (!ses.ok()) return;
            ses.makeQ = t
        } else l = t()
    })(function() {
        function t(t) {
            return function() {
                return X.apply(t, arguments)
            }
        }
        function e(t) {
            return t === Object(t)
        }
        function n(t) {
            return "[object StopIteration]" === ee(t) || t instanceof W
        }
        function i(t, e) {
            if (B && (e.stack && ("object" == typeof t && (null !== t && (t.stack && -1 === t.stack.indexOf(ne)))))) {
                for (var n = [], i = e; i; i = i.source) i.stack && n.unshift(i.stack);
                n.unshift(t.stack);
                var o = n.join("\n" + ne + "\n");
                t.stack = r(o)
            }
        }
        function r(t) {
            for (var e = t.split("\n"), n = [], i = 0; e.length > i; ++i) {
                var r = e[i];
                s(r) || (o(r) || (!r || n.push(r)))
            }
            return n.join("\n")
        }
        function o(t) {
            return -1 !== t.indexOf("(module.js:") || -1 !== t.indexOf("(node.js:")
        }
        function a(t) {
            var e = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);
            if (e) return [e[1], Number(e[2])];
            var n = /at ([^ ]+):(\d+):(?:\d+)$/.exec(t);
            if (n) return [n[1], Number(n[2])];
            var i = /.*@(.+):(\d+)$/.exec(t);
            return i ? [i[1], Number(i[2])] : void 0
        }
        function s(t) {
            var e = a(t);
            if (!e) return !1;
            var n = e[0],
                i = e[1];
            return n === J && (i >= U && ae >= i)
        }
        function u() {
            if (B) try {
                throw Error();
            } catch (t) {
                var e = t.stack.split("\n"),
                    n = e[0].indexOf("@") > 0 ? e[1] : e[2],
                    i = a(n);
                if (!i) return;
                return J = i[0], i[1]
            }
        }
        function c(t, e, n) {
            return function() {
                return "undefined" != typeof console && ("function" == typeof console.warn && console.warn(e + " is deprecated, use " + n + " instead.", Error("").stack)), t.apply(t, arguments)
            }
        }
        function p(t) {
            return y(t) ? t : v(t) ? T(t) : E(t)
        }
        function l() {
            function t(t) {
                e = t, o.source = t, Q(n, function(e, n) {
                    F(function() {
                        t.promiseDispatch.apply(t, n)
                    })
                }, void 0), n = void 0, i = void 0
            }
            var e, n = [],
                i = [],
                r = K(l.prototype),
                o = K(d.prototype);
            if (o.promiseDispatch = function(t, r, o) {
                var a = $(arguments);
                n ? (n.push(a), "when" === r && (o[1] && i.push(o[1]))) : F(function() {
                    e.promiseDispatch.apply(e, a)
                })
            }, o.valueOf = function() {
                if (n) return o;
                var t = m(e);
                return y(t) && (e = t), t
            }, o.inspect = function() {
                return e ? e.inspect() : {
                    state: "pending"
                }
            }, p.longStackSupport && B) try {
                throw Error();
            } catch (a) {
                o.stack = a.stack.substring(a.stack.indexOf("\n") + 1)
            }
            return r.promise = o, r.resolve = function(n) {
                e || t(p(n))
            }, r.fulfill = function(n) {
                e || t(E(n))
            }, r.reject = function(n) {
                e || t(A(n))
            }, r.notify = function(t) {
                e || Q(i, function(e, n) {
                    F(function() {
                        n(t)
                    })
                }, void 0)
            }, r
        }
        function f(t) {
            if ("function" != typeof t) throw new TypeError("resolver must be a function.");
            var e = l();
            try {
                t(e.resolve, e.reject, e.notify)
            } catch (n) {
                e.reject(n)
            }
            return e.promise
        }
        function h(t) {
            return f(function(e, n) {
                for (var i = 0, r = t.length; r > i; i++) p(t[i]).then(e, n)
            })
        }
        function d(t, e, n) {
            void 0 === e && (e = function(t) {
                return A(Error("Promise does not support operation: " + t))
            }), void 0 === n && (n = function() {
                return {
                    state: "unknown"
                }
            });
            var i = K(d.prototype);
            if (i.promiseDispatch = function(n, r, o) {
                var a;
                try {
                    a = t[r] ? t[r].apply(i, o) : e.call(i, r, o)
                } catch (s) {
                    a = A(s)
                }
                n && n(a)
            }, i.inspect = n, n) {
                var r = n();
                "rejected" === r.state && (i.exception = r.reason), i.valueOf = function() {
                    var t = n();
                    return "pending" === t.state || "rejected" === t.state ? i : t.value
                }
            }
            return i
        }
        function g(t, e, n, i) {
            return p(t).then(e, n, i)
        }
        function m(t) {
            if (y(t)) {
                var e = t.inspect();
                if ("fulfilled" === e.state) return e.value
            }
            return t
        }
        function y(t) {
            return e(t) && ("function" == typeof t.promiseDispatch && "function" == typeof t.inspect)
        }
        function v(t) {
            return e(t) && "function" == typeof t.then
        }
        function _(t) {
            return y(t) && "pending" === t.inspect().state
        }
        function b(t) {
            return !y(t) || "fulfilled" === t.inspect().state
        }
        function S(t) {
            return y(t) && "rejected" === t.inspect().state
        }
        function w() {
            ie.length = 0, re.length = 0, oe || (oe = !0)
        }
        function k(t, e) {
            oe && (re.push(t), e && e.stack !== void 0 ? ie.push(e.stack) : ie.push("(no stack) " + e))
        }
        function I(t) {
            if (oe) {
                var e = Y(re, t); - 1 !== e && (re.splice(e, 1), ie.splice(e, 1))
            }
        }
        function A(t) {
            var e = d({
                when: function(e) {
                    return e && I(this), e ? e(t) : this
                }
            }, function() {
                return this
            }, function() {
                return {
                    state: "rejected",
                    reason: t
                }
            });
            return k(e, t), e
        }
        function E(t) {
            return d({
                when: function() {
                    return t
                },
                get: function(e) {
                    return t[e]
                },
                set: function(e, n) {
                    t[e] = n
                },
                "delete": function(e) {
                    delete t[e]
                },
                post: function(e, n) {
                    return null === e || void 0 === e ? t.apply(void 0, n) : t[e].apply(t, n)
                },
                apply: function(e, n) {
                    return t.apply(e, n)
                },
                keys: function() {
                    return te(t)
                }
            }, void 0, function() {
                return {
                    state: "fulfilled",
                    value: t
                }
            })
        }

        function T(t) {
            var e = l();
            return F(function() {
                try {
                    t.then(e.resolve, e.reject, e.notify)
                } catch (n) {
                    e.reject(n)
                }
            }), e.promise
        }
        function M(t) {
            return d({
                isDef: function() {}
            }, function(e, n) {
                return G(t, e, n)
            }, function() {
                return p(t).inspect()
            })
        }
        function R(t, e, n) {
            return p(t).spread(e, n)
        }
        function j(t) {
            return function() {
                function e(t, e) {
                    var a;
                    if ("undefined" == typeof StopIteration) {
                        try {
                            a = i[t](e)
                        } catch (s) {
                            return A(s)
                        }
                        return a.done ? a.value : g(a.value, r, o)
                    }
                    try {
                        a = i[t](e)
                    } catch (s) {
                        return n(s) ? s.value : A(s)
                    }
                    return g(a, r, o)
                }
                var i = t.apply(this, arguments),
                    r = e.bind(e, "next"),
                    o = e.bind(e, "throw");
                return r()
            }
        }
        function L(t) {
            p.done(p.async(t)())
        }
        function P(t) {
            throw new W(t);
        }
        function N(t) {
            return function() {
                return R([this, O(arguments)], function(e, n) {
                    return t.apply(e, n)
                })
            }
        }
        function G(t, e, n) {
            return p(t).dispatch(e, n)
        }
        function O(t) {
            return g(t, function(t) {
                var e = 0,
                    n = l();
                return Q(t, function(i, r, o) {
                    var a;
                    y(r) && "fulfilled" === (a = r.inspect()).state ? t[o] = a.value : (++e, g(r, function(i) {
                        t[o] = i, 0 === --e && n.resolve(t)
                    }, n.reject, function(t) {
                        n.notify({
                            index: o,
                            value: t
                        })
                    }))
                }, void 0), 0 === e && n.resolve(t), n.promise
            })
        }
        function x(t) {
            return g(t, function(t) {
                return t = z(t, p), g(O(z(t, function(t) {
                    return g(t, H, H)
                })), function() {
                    return t
                })
            })
        }
        function C(t) {
            return p(t).allSettled()
        }
        function D(t, e) {
            return p(t).then(void 0, void 0, e)
        }
        function V(t, e) {
            return p(t).nodeify(e)
        }
        var B = !1;
        try {
            throw Error();
        } catch (q) {
            B = !! q.stack
        }
        var J, W, U = u(),
            H = function() {},
            F = function() {
                function t() {
                    for (; e.next;) {
                        e = e.next;
                        var n = e.task;
                        e.task = void 0;
                        var r = e.domain;
                        r && (e.domain = void 0, r.enter());
                        try {
                            n()
                        } catch (a) {
                            if (o) throw r && r.exit(), setTimeout(t, 0), r && r.enter(), a;
                            setTimeout(function() {
                                throw a;
                            }, 0)
                        }
                        r && r.exit()
                    }
                    i = !1
                }
                var e = {
                        task: void 0,
                        next: null
                    },
                    n = e,
                    i = !1,
                    r = void 0,
                    o = !1;
                if (F = function(t) {
                    n = n.next = {
                        task: t,
                        domain: o && process.domain,
                        next: null
                    }, i || (i = !0, r())
                }, "undefined" != typeof process && process.nextTick) o = !0, r = function() {
                    process.nextTick(t)
                };
                else if ("function" == typeof setImmediate) r = "undefined" != typeof window ? setImmediate.bind(window, t) : function() {
                    setImmediate(t)
                };
                else if ("undefined" != typeof MessageChannel) {
                    var a = new MessageChannel;
                    a.port1.onmessage = function() {
                        r = s, a.port1.onmessage = t, t()
                    };
                    var s = function() {
                        a.port2.postMessage(0)
                    };
                    r = function() {
                        setTimeout(t, 0), s()
                    }
                } else r = function() {
                    setTimeout(t, 0)
                };
                return F
            }(),
            X = Function.call,
            $ = t(Array.prototype.slice),
            Q = t(Array.prototype.reduce ||
                function(t, e) {
                    var n = 0,
                        i = this.length;
                    if (1 === arguments.length) for (;;) {
                        if (n in this) {
                            e = this[n++];
                            break
                        }
                        if (++n >= i) throw new TypeError;
                    }
                    for (; i > n; n++) n in this && (e = t(e, this[n], n));
                    return e
                }),
            Y = t(Array.prototype.indexOf ||
                function(t) {
                    for (var e = 0; this.length > e; e++) if (this[e] === t) return e;
                    return -1
                }),
            z = t(Array.prototype.map ||
                function(t, e) {
                    var n = this,
                        i = [];
                    return Q(n, function(r, o, a) {
                        i.push(t.call(e, o, a, n))
                    }, void 0), i
                }),
            K = Object.create ||
                function(t) {
                    function e() {}
                    return e.prototype = t, new e
                }, Z = t(Object.prototype.hasOwnProperty), te = Object.keys ||
                function(t) {
                    var e = [];
                    for (var n in t) Z(t, n) && e.push(n);
                    return e
                }, ee = t(Object.prototype.toString);
        W = "undefined" != typeof ReturnValue ? ReturnValue : function(t) {
            this.value = t
        };
        var ne = "From previous event:";
        p.resolve = p, p.nextTick = F, p.longStackSupport = !1, p.defer = l, l.prototype.makeNodeResolver = function() {
            var t = this;
            return function(e, n) {
                e ? t.reject(e) : arguments.length > 2 ? t.resolve($(arguments, 1)) : t.resolve(n)
            }
        }, p.Promise = f, p.promise = f, f.race = h, f.all = O, f.reject = A, f.resolve = p, p.passByCopy = function(t) {
            return t
        }, d.prototype.passByCopy = function() {
            return this
        }, p.join = function(t, e) {
            return p(t).join(e)
        }, d.prototype.join = function(t) {
            return p([this, t]).spread(function(t, e) {
                if (t === e) return t;
                throw Error("Can't join: not the same: " + t + " " + e);
            })
        }, p.race = h, d.prototype.race = function() {
            return this.then(p.race)
        }, p.makePromise = d, d.prototype.toString = function() {
            return "[object Promise]"
        }, d.prototype.then = function(t, e, n) {
            function r(e) {
                try {
                    return "function" == typeof t ? t(e) : e
                } catch (n) {
                    return A(n)
                }
            }
            function o(t) {
                if ("function" == typeof e) {
                    i(t, s);
                    try {
                        return e(t)
                    } catch (n) {
                        return A(n)
                    }
                }
                return A(t)
            }
            function a(t) {
                return "function" == typeof n ? n(t) : t
            }
            var s = this,
                u = l(),
                c = !1;
            return F(function() {
                s.promiseDispatch(function(t) {
                    c || (c = !0, u.resolve(r(t)))
                }, "when", [function(t) {
                    c || (c = !0, u.resolve(o(t)))
                }])
            }), s.promiseDispatch(void 0, "when", [void 0, function(t) {
                var e, n = !1;
                try {
                    e = a(t)
                } catch (i) {
                    if (n = !0, !p.onerror) throw i;
                    p.onerror(i)
                }
                n || u.notify(e)
            }]), u.promise
        }, p.when = g, d.prototype.thenResolve = function(t) {
            return this.then(function() {
                return t
            })
        }, p.thenResolve = function(t, e) {
            return p(t).thenResolve(e)
        }, d.prototype.thenReject = function(t) {
            return this.then(function() {
                throw t;
            })
        }, p.thenReject = function(t, e) {
            return p(t).thenReject(e)
        }, p.nearer = m, p.isPromise = y, p.isPromiseAlike = v, p.isPending = _, d.prototype.isPending = function() {
            return "pending" === this.inspect().state
        }, p.isFulfilled = b, d.prototype.isFulfilled = function() {
            return "fulfilled" === this.inspect().state
        }, p.isRejected = S, d.prototype.isRejected = function() {
            return "rejected" === this.inspect().state
        };
        var ie = [],
            re = [],
            oe = !0;
        p.resetUnhandledRejections = w, p.getUnhandledReasons = function() {
            return ie.slice()
        }, p.stopUnhandledRejectionTracking = function() {
            w(), oe = !1
        }, w(), p.reject = A, p.fulfill = E, p.master = M, p.spread = R, d.prototype.spread = function(t, e) {
            return this.all().then(function(e) {
                return t.apply(void 0, e)
            }, e)
        }, p.async = j, p.spawn = L, p["return"] = P, p.promised = N, p.dispatch = G, d.prototype.dispatch = function(t, e) {
            var n = this,
                i = l();
            return F(function() {
                n.promiseDispatch(i.resolve, t, e)
            }), i.promise
        }, p.get = function(t, e) {
            return p(t).dispatch("get", [e])
        }, d.prototype.get = function(t) {
            return this.dispatch("get", [t])
        }, p.set = function(t, e, n) {
            return p(t).dispatch("set", [e, n])
        }, d.prototype.set = function(t, e) {
            return this.dispatch("set", [t, e])
        }, p.del = p["delete"] = function(t, e) {
            return p(t).dispatch("delete", [e])
        }, d.prototype.del = d.prototype["delete"] = function(t) {
            return this.dispatch("delete", [t])
        }, p.mapply = p.post = function(t, e, n) {
            return p(t).dispatch("post", [e, n])
        }, d.prototype.mapply = d.prototype.post = function(t, e) {
            return this.dispatch("post", [t, e])
        }, p.send = p.mcall = p.invoke = function(t, e) {
            return p(t).dispatch("post", [e, $(arguments, 2)])
        }, d.prototype.send = d.prototype.mcall = d.prototype.invoke = function(t) {
            return this.dispatch("post", [t, $(arguments, 1)])
        }, p.fapply = function(t, e) {
            return p(t).dispatch("apply", [void 0, e])
        }, d.prototype.fapply = function(t) {
            return this.dispatch("apply", [void 0, t])
        }, p["try"] = p.fcall = function(t) {
            return p(t).dispatch("apply", [void 0, $(arguments, 1)])
        }, d.prototype.fcall = function() {
            return this.dispatch("apply", [void 0, $(arguments)])
        }, p.fbind = function(t) {
            var e = p(t),
                n = $(arguments, 1);
            return function() {
                return e.dispatch("apply", [this, n.concat($(arguments))])
            }
        }, d.prototype.fbind = function() {
            var t = this,
                e = $(arguments);
            return function() {
                return t.dispatch("apply", [this, e.concat($(arguments))])
            }
        }, p.keys = function(t) {
            return p(t).dispatch("keys", [])
        }, d.prototype.keys = function() {
            return this.dispatch("keys", [])
        }, p.all = O, d.prototype.all = function() {
            return O(this)
        }, p.allResolved = c(x, "allResolved", "allSettled"), d.prototype.allResolved = function() {
            return x(this)
        }, p.allSettled = C, d.prototype.allSettled = function() {
            return this.then(function(t) {
                return O(z(t, function(t) {
                    function e() {
                        return t.inspect()
                    }
                    return t = p(t), t.then(e, e)
                }))
            })
        }, p.fail = p["catch"] = function(t, e) {
            return p(t).then(void 0, e)
        }, d.prototype.fail = d.prototype["catch"] = function(t) {
            return this.then(void 0, t)
        }, p.progress = D, d.prototype.progress = function(t) {
            return this.then(void 0, void 0, t)
        }, p.fin = p["finally"] = function(t, e) {
            return p(t)["finally"](e)
        }, d.prototype.fin = d.prototype["finally"] = function(t) {
            return t = p(t), this.then(function(e) {
                return t.fcall().then(function() {
                    return e
                })
            }, function(e) {
                return t.fcall().then(function() {
                    throw e;
                })
            })
        }, p.done = function(t, e, n, i) {
            return p(t).done(e, n, i)
        }, d.prototype.done = function(t, e, n) {
            var r = function(t) {
                    F(function() {
                        if (i(t, o), !p.onerror) throw t;
                        p.onerror(t)
                    })
                },
                o = t || (e || n) ? this.then(t, e, n) : this;
            "object" == typeof process && (process && (process.domain && (r = process.domain.bind(r)))), o.then(void 0, r)
        }, p.timeout = function(t, e, n) {
            return p(t).timeout(e, n)
        }, d.prototype.timeout = function(t, e) {
            var n = l(),
                i = setTimeout(function() {
                    n.reject(Error(e || "Timed out after " + t + " ms"))
                }, t);
            return this.then(function(t) {
                clearTimeout(i), n.resolve(t)
            }, function(t) {
                clearTimeout(i), n.reject(t)
            }, n.notify), n.promise
        }, p.delay = function(t, e) {
            return void 0 === e && (e = t, t = void 0), p(t).delay(e)
        }, d.prototype.delay = function(t) {
            return this.then(function(e) {
                var n = l();
                return setTimeout(function() {
                    n.resolve(e)
                }, t), n.promise
            })
        }, p.nfapply = function(t, e) {
            return p(t).nfapply(e)
        }, d.prototype.nfapply = function(t) {
            var e = l(),
                n = $(t);
            return n.push(e.makeNodeResolver()), this.fapply(n).fail(e.reject), e.promise
        }, p.nfcall = function(t) {
            var e = $(arguments, 1);
            return p(t).nfapply(e)
        }, d.prototype.nfcall = function() {
            var t = $(arguments),
                e = l();
            return t.push(e.makeNodeResolver()), this.fapply(t).fail(e.reject), e.promise
        }, p.nfbind = p.denodeify = function(t) {
            var e = $(arguments, 1);
            return function() {
                var n = e.concat($(arguments)),
                    i = l();
                return n.push(i.makeNodeResolver()), p(t).fapply(n).fail(i.reject), i.promise
            }
        }, d.prototype.nfbind = d.prototype.denodeify = function() {
            var t = $(arguments);
            return t.unshift(this), p.denodeify.apply(void 0, t)
        }, p.nbind = function(t, e) {
            var n = $(arguments, 2);
            return function() {
                function i() {
                    return t.apply(e, arguments)
                }
                var r = n.concat($(arguments)),
                    o = l();
                return r.push(o.makeNodeResolver()), p(i).fapply(r).fail(o.reject), o.promise
            }
        }, d.prototype.nbind = function() {
            var t = $(arguments, 0);
            return t.unshift(this), p.nbind.apply(void 0, t)
        }, p.nmapply = p.npost = function(t, e, n) {
            return p(t).npost(e, n)
        }, d.prototype.nmapply = d.prototype.npost = function(t, e) {
            var n = $(e || []),
                i = l();
            return n.push(i.makeNodeResolver()), this.dispatch("post", [t, n]).fail(i.reject), i.promise
        }, p.nsend = p.nmcall = p.ninvoke = function(t, e) {
            var n = $(arguments, 2),
                i = l();
            return n.push(i.makeNodeResolver()), p(t).dispatch("post", [e, n]).fail(i.reject), i.promise
        }, d.prototype.nsend = d.prototype.nmcall = d.prototype.ninvoke = function(t) {
            var e = $(arguments, 1),
                n = l();
            return e.push(n.makeNodeResolver()), this.dispatch("post", [t, e]).fail(n.reject), n.promise
        }, p.nodeify = V, d.prototype.nodeify = function(t) {
            return t ? (this.then(function(e) {
                F(function() {
                    t(null, e)
                })
            }, function(e) {
                F(function() {
                    t(e)
                })
            }), void 0) : this
        };
        var ae = u();
        return p
    }), function(t) {
        var e = "Promise" in t && ("cast" in t.Promise && ("resolve" in t.Promise && ("reject" in t.Promise && ("all" in t.Promise && ("race" in t.Promise && "spread" in t.Promise)))));
        e || (t.Promise = l.promise, t.Promise.all = l.all, t.Promise.timeout = l.timeout, l.stopUnhandledRejectionTracking())
    }(t !== void 0 ? t : this);
    var f = {
        timeout: 3E3
    };
    f.getGameConfig = function() {
        var t = l.defer();
        return SpilGames(["JSLib"], function(e) {
            var n = e.get("current.game.integration.info");
            n ? t.resolve(n) : t.reject(Error("No data retrieved from JSLib"))
        }), t.promise.timeout(this.timeout)
    }, f.getBrandingConfig = function(t) {
        var e = l.defer(),
            n = "http://api.configar.org/cf/pb/1/configs",
            i = t.portal.siteId,
            r = t.portal.channelId,
            o = t.portal.applicationId;
        return SpilGames(["Net", "JSLib"], function(t, a) {
            t.send({
                url: [n, r, i, o].join("/"),
                type: "GET",
                dataType: "JSON"
            }, function(t) {
                if (t && t.configar) window.postMessage(new s({
                    type: "success",
                    callbackId: null,
                    data: "log.configar.getBranding.success"
                }), "*"), e.resolve(t.configar);
                else {
                    var n = {};
                    try {
                        n = a.get("configar.data.cached") || n
                    } catch (i) {}
                    e.reject(n)
                }
            })
        }), e.promise.timeout(this.timeout)
    };
    var h = {};
    h.argsToArray = function(t) {
        return t ? Array.prototype.slice.apply(t) : []
    }, h.isA10 = function() {
        return /4399.com/.test(window.location.host)
    }, h.getRole = function() {
        var t = "function" == typeof window.SpilGames,
            e = window.self !== window.top,
            n = null;
        if (h.isA10()) return {
            IS_MASTER: !0,
            IS_SLAVE: !0,
            IS_STANDALONE: !0
        };
        if (t) {
            var i = document.getElementById("#iframegame");
            switch (i) {
                case "null":
                    n = {
                        IS_MASTER: !0,
                        IS_SLAVE: !0,
                        IS_STANDALONE: !1
                    };
                    break;
                default:
                    n = {
                        IS_MASTER: !0,
                        IS_SLAVE: !1,
                        IS_STANDALONE: !1
                    }
            }
        } else n = e ? {
            IS_MASTER: !1,
            IS_SLAVE: !0,
            IS_STANDALONE: !1
        } : {
            IS_MASTER: !0,
            IS_SLAVE: !0,
            IS_STANDALONE: !0
        };
        return n
    }, h.callConfigar = function(t, e) {
        var n, i, r = t.site || 500,
            o = t.channel || 100,
            a = t.id || null;
        window.XMLHttpRequest ? n = new XMLHttpRequest : window.ActiveXObject && (n = new ActiveXObject("Microsoft.XMLHTTP")), n.onreadystatechange = function() {
            4 === n.readyState && e(n.status, n.responseText)
        }, a && (i = ["http://api.configar.org/cf/pb/1/configs", o, r, a].join("/"), n.open("GET", i, !0), n.timeout = 3E3, n.ontimeout = function() {
            e(404, null)
        }, n.send())
    }, h.isWrapped = function() {
        return void 0 !== (window.PhoneGap || (window.cordova || window.Cordova))
    }, h.isArray = Array.isArray ||
        function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }, h._getQueryString = function() {
        return window.location.search
    }, h._getPortalHost = function() {
        return window && (window.location && window.location.hostname) ? window.location.hostname : "unknown"
    }, h.validateSchema = function(t, e) {
        for (var n in e) if (e.hasOwnProperty(n)) {
            if (!t.hasOwnProperty(n)) return {
                error: "Wrong argument passed: " + n
            };
            if (t.hasOwnProperty(n)) {
                var i = "object" == typeof t[n] ? t[n].type : t[n];
                if (e[n].constructor.name !== i) return {
                    error: "Wrong value type for " + n + ": expected " + t[n] + ", got " + e[n].constructor.name
                };
                var r = t[n] && t[n].values || [];
                if (-1 === r.indexOf(e[n])) return {
                    error: "Wrong value for " + n + ": expected " + r.join(" or ") + ", got " + e[n]
                }
            }
        }
        return {
            error: !1
        }
    };
    var d = {};
    d.getGameConfig = function() {
        return f.getGameConfig()["catch"](function() {
            return d.getLocalConfig()
        })
    }, d.getBrandingConfig = function(t) {
        return new Promise(function(e) {
            return f.getBrandingConfig(t).then(e, function(t) {
                e(t), window.postMessage(new s({
                    type: "warning",
                    callbackId: null,
                    data: "log.configar.getBranding.failure"
                }), "*")
            })
        })
    }, d.getLocalConfig = function(t) {
        t = t && Object.keys(t).length ? t : {
            portal: {},
            game: {},
            branding: {}
        };
        var e = {
            game: {
                applicationId: t.portal.applicationId || "0",
                contentarId: t.portal.contentarId || "0",
                info: t.game.info || {},
                settings: t.game.objectSettings || {},
                features: {
                    achievements: t.game.achievements || !1,
                    gameSidePanel: t.game.gameSidePanel || !1,
                    highscores: t.game.highscores || !1,
                    recommendedGames: t.game.recommendedGames || !1
                }
            },
            user: {
                authenticated: t.portal.authenticated || !1,
                username: t.portal.username || ""
            },
            portal: {
                host: h._getPortalHost(),
                siteId: t.portal.siteId || 0,
                channelId: t.portal.channelId || 0,
                applicationId: t.portal.applicationId || "0"
            },
            branding: t.branding || {}
        };
        return e.branding.logo = e.branding.logo || {}, e.branding.logo.url = e.branding.logo.url || !1, e.branding.logo.image = e.branding.logo.image || !1, e
    }, d.setupStandaloneMode = function(t, e) {
        var n = {},
            i = {
                configar: {
                    branding: {
                        main: {
                            label: "main",
                            image: "./logo_A10_202x50.png",
                            url: "http://www.a10.com",
                            style: "",
                            width: "202",
                            height: "50",
                            mime: "image/png",
                            type: "png",
                            handler: "newTab",
                            blacklisted: !0
                        },
                        logo: {
                            label: "logo",
                            image: "./logo_A10_202x50.png",
                            url: "http://www.a10.com",
                            style: "",
                            width: "202",
                            height: "50",
                            mime: "image/png",
                            type: "png",
                            handler: "newTab",
                            blacklisted: !1
                        },
                        more_games: {
                            label: "more_games",
                            image: null,
                            url: "http://www.a10.com",
                            style: "",
                            width: null,
                            height: null,
                            mime: null,
                            type: null,
                            handler: "newTab",
                            blacklisted: !1
                        },
                        splash_screen: {
                            label: "splash_screen",
                            image: "place_holder_string",
                            url: "http://www.a10.com",
                            style: "",
                            width: "0",
                            height: "0",
                            mime: "image/png",
                            type: "png",
                            handler: "newTab",
                            blacklisted: !1
                        }
                    }
                }
            };
        n.JSLib = {
            memory: {},
            _channels: {},
            get: function(t) {
                return this.memory[t] ? this.memory[t] : !1
            },
            set: function(t, e) {
                return this.memory[t] = e, e
            },
            publish: function(t, e) {
                this._channels[t] && this._channels[t].forEach(function(t) {
                    try {
                        t.fn.call(this, e)
                    } catch (n) {}
                })
            },
            subscribe: function(t, e) {
                if ("function" != typeof e) throw Error("Callback has to be a function");
                if ("string" != typeof t) throw Error("Channel name has to be a string");
                this._channels[t] || (this._channels[t] = []), this._channels[t].push({
                    fn: e
                })
            }
        }, n.Net = {
            send: function(t, e) {
                e.call(this, {})
            }
        }, window.SpilGamesBootstrap = [], window.SpilGames = function() {
            var t = arguments;
            if (t[0] && "string" == typeof t[0]) n.JSLib.publish(t[0], t[1] || null);
            else if (t[0] && t[0] instanceof Array) {
                var e, i, r = [];
                for (e = 0, i = t[0].length; i > e; e++) r.push(n[t[0][e]]);
                t[1].apply(this, r)
            }
        }, t && t.id ? h.callConfigar(t, function(n, r) {
            if ((200 === n || 0 === n) && ("string" == typeof r && JSON.parse(r))) {
                var o = JSON.parse(r);
                e.call(this, {
                    branding: o.configar && o.configar.branding ? o.configar.branding : i.configar.branding,
                    portal: {
                        applicationId: t.id,
                        siteId: t.site ? t.site : 500,
                        channelId: t.channel ? t.channel : 100
                    }
                })
            } else e.call(this, {
                branding: i.configar.branding
            })
        }) : e.call(this, {
            branding: i.configar.branding
        })
    }, d.getCachedConfig = function() {}, e.prototype.newTab = function(t) {
        var e = t.url,
            n = window.open(e, "_blank");
        return n.focus(), n
    }, n.prototype.get = function(t) {
        return this.dataStore[t] ? this.dataStore[t] : {
            error: 'Property: "' + t + '" is not set'
        }
    }, n.prototype.set = function(t, e) {
        return this.dataStore[t] = e, this.dataStore[t]
    }, n.prototype._setCache = function(t) {
        this.dataStore = t
    }, n.prototype._getCache = function() {
        return this.dataStore
    }, i.prototype._performAction = function(t) {
        var e = new s(t.data || {}),
            n = this.messenger,
            i = this.subscribers || {};
        if (e && (e.type && e.data)) switch (e.type) {
            case "gameEvent":
                e.data[0] && (i[e.data[0]] && (i[e.data[0]].length > 0 && i[e.data[0]].forEach(function(t) {
                    t.call(this), n._postMessage([e.data[0],
                        {
                            origin: "slave"
                        },
                        null], null, "gameState")
                })));
                break;
            case "gameState":
                e.data[0] && (e.data[1] && ("slave" === e.data[1].origin && (this.gameState = e.data[0])))
        }
    }, i.prototype.on = function(t, e) {
        this.IS_SLAVE && (this.subscribers[t] || (this.subscribers[t] = []), this.subscribers[t].push(e))
    }, i.prototype.emit = function(t) {
        if (!this.IS_MASTER) throw Error("Only the master environment can emit game events");
        if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
        if (t === this.gameState) throw Error("The game is already in state: `" + t + "`");
        this.messenger._postMessage([t,
            {
                origin: "master"
            },
            null], null, "gameEvent")
    }, r.prototype.init = function() {
        this._setupEvents()
    }, r.prototype._setupEvents = function() {
        var t = this.messenger;
        this.isMaster ? (SpilGames(["JSLib"], function(e) {
            e.subscribe("ad.request.accepted", function(e) {
                !0 === e && (SpilGames("game.ad.accepted", !0), t._postMessage(!0, void 0, "ad.request.accepted"))
            }), e.subscribe("ad.complete", function() {
                t._postMessage("", "", "ad.complete")
            })
        }), this.messenger.subscribe("game.ad.request", this._triggerAd, this)) : (this.messenger.subscribe("ad.request.accepted", this._onAdAccepted, this), this.messenger.subscribe("ad.complete", this._onAdCompleted, this))
    }, r.prototype._triggerAd = function() {
        SpilGames("game.ad.request")
    }, r.prototype._runCallback = function(t) {
        this._callbacks[t] && (this._callbacks[t](), this._callbacks[t] = !1)
    }, r.prototype.request = function(t, e) {
        var n = this;
        if ("function" != typeof t) throw Error("pauseGame argument should be a function");
        if ("function" != typeof e) throw Error("resumeGame argument should be a function");
        if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
        this._callbacks.pause = t, this._callbacks.resume = e, this.messenger._postMessage(void 0, void 0, "game.ad.request"), this.isMaster || this.messenger._postMessage(["log.gameapi.ad.requested",
            {
                origin: "slave"
            },
            null], null, "log"), this.timeout = setTimeout(function() {
            n._requestTimeout()
        }, this.timeoutAfter)
    }, r.prototype._onAdAccepted = function(t) {
        var e = this.messenger;
        this.timeout && clearTimeout(this.timeout), !this.isMaster && (t && (e._postMessage(["log.gameapi.ad.start",
            {
                origin: "slave"
            },
            null], null, "log"), this._runCallback("pause")))
    }, r.prototype._onAdCompleted = function() {
        var t = this.messenger;
        this.isMaster || (t._postMessage(["log.gameapi.ad.complete",
            {
                origin: "slave"
            },
            null], null, "log"), this._runCallback("resume"))
    }, r.prototype._requestTimeout = function() {
        this._onAdCompleted()
    }, o.prototype.init = function(t) {
        t = t || {}, this.data = t.data || this.data;
        var e = this.data && (this.data.game && this.data.game.applicationId) ? this.data.game.applicationId : null,
            n = new Date,
            i = window.location.hostname;
        (this.IS_SLAVE || h.isWrapped()) && this.startInternalTracking(e, n, i)
    }, o.prototype._createEventObject = function(t, e, n) {
        return {
            eventCategory: t,
            eventAction: e,
            properties: n
        }
    }, o.prototype._sendSETEvent = function(t, e, n) {
        return this.messenger && ((this.IS_SLAVE || h.isWrapped()) && this.messenger.post("tracker.event." + t, e, n)), e
    }, o.prototype.trackGamePlay = function(t) {
        if (!this.gamePlayTracking.started) return !1;
        var e = this.gamePlayTracking.gid,
            n = this.gamePlayTracking.timestamp,
            i = this.gamePlayTracking.host,
            r = this._createEventObject("game", "gameplay", {
                applicationId: e,
                start: n,
                host: i
            });
        return this._sendSETEvent("express", r, t), r
    }, o.prototype.trackTimeInGame = function(t) {
        if (!this.timeInGameTracking.started) return !1;
        var e = this.timeInGameTracking.gid,
            n = this.timeInGameTracking.timestamp,
            i = this._createEventObject("game", "heartbeat", {
                applicationId: e,
                start: n
            });
        return this._sendSETEvent("express", i, t), i
    }, o.prototype.startInternalTracking = function(t, e, n) {
        var i = this,
            r = 6E4,
            o = function(t) {
                if (!t) throw "Could not save the time in game";
            };
        return this.moduleReady ? t ? (this.gamePlayTracking.gid = t, this.gamePlayTracking.timestamp = Date.parse(e), this.gamePlayTracking.host = n, this.gamePlayTracking.started = !0, this.timeInGameTracking.gid = t, this.timeInGameTracking.timestamp = Date.parse(e), this.timeInGameTracking.started = !0, this.trackGamePlay(function(t) {
            if (!t) throw "Could not save the game play";
        }), this.trackTimeInGame(o), setInterval(function() {
            i.trackTimeInGame(o)
        }, r), this.gamePlayTracking.started && this.timeInGameTracking.started) : {
            error: "No application ID defined for this game"
        } : {
            error: "This method cannot be called before the API is loaded"
        }
    }, a.prototype.init = function(t) {
        t = t || {}, this.data = t.data || this.data
    }, a.prototype.getLogo = function(t) {
        if (!this.moduleReady) return {
            error: "This method cannot be called before the API is loaded"
        };
        var e = this.IS_MASTER ? "master" : "slave";
        this.messenger._postMessage(["log.branding.getlogo",
            {
                origin: e
            },
            null], null, "log");
        var n, i, r = {
            type: {
                type: "String",
                values: ["png"]
            },
            width: "Number",
            height: "Number"
        };
        return n = this._getLink("logo"), t && ("object" == typeof t && (i = h.validateSchema(r, t), i.error && (n.error = i.error))), n
    }, a.prototype.getLink = function(t) {
        if (!t) return {
            error: "No link identifier provided"
        };
        var e = this.listLinks();
        if (-1 !== e.indexOf(t)) {
            var n = this.IS_MASTER ? "master" : "slave";
            return this.messenger._postMessage(["log.branding.getlink",
                {
                    origin: n,
                    linkName: t
                },
                null], null, "log"), this._getLink(t)
        }
        return {
            error: "Invalid option: '" + t + "'",
            action: function() {}
        }
    }, a.prototype._getLink = function(t) {
        if (!t) return {
            error: "No link identifier provided"
        };
        var e = this.data && this.data.branding ? this.data.branding : {};
        return e && e[t] ? {
            linkName: t,
            image: e[t].image || !1,
            action: this._executeHandler.bind(this, t)
        } : {
            error: "Invalid option: '" + t + "'",
            action: function() {}
        }
    }, a.prototype.getLinks = function() {
        var t = {},
            e = this.listLinks();
        if (0 === e.length) t = {
            more_games: {
                action: function() {}
            }
        };
        else for (var n = 0; e.length > n; n++) {
            var i = e[n];
            t[i] = this._getLink(i)
        }
        return t
    }, a.prototype._executeHandler = function(t) {
        var e = this.data && this.data.branding ? this.data.branding : {},
            n = e[t],
            i = n.handler,
            r = this._tagUrl(n.url, t);
        if (n.url && (n.url.length > 0 && (i && this.components[i]))) {
            var o = this.IS_MASTER ? "master" : "slave";
            return this.messenger._postMessage(["log.branding.linkAction",
                {
                    origin: o,
                    linkName: t
                },
                null], null, "log"), this.components[i]({
                url: r
            })
        }
        return function() {}
    }, a.prototype.listLinks = function() {
        var t = [],
            e = this.data && this.data.branding ? this.data.branding : {},
            n = Object.keys(e);
        return t = n.filter(function(t) {
            return !e[t].blacklisted
        })
    }, a.prototype.getSplashScreen = function() {
        var t, e = this.IS_MASTER ? "master" : "slave";
        if (this.data && (this.data.branding && this.data.branding.splash_screen)) {
            var n = !0;
            this.data.branding.splash_screen.image || (this.data.branding.splash_screen.url || (n = !1)), t = {
                show: n,
                action: this._getLink("splash_screen").action ||
                    function() {}
            }
        } else t = {
            show: !0,
            action: function() {}
        };
        return this.messenger._postMessage(["log.branding.splashScreen",
            {
                origin: e
            },
            null], null, "log"), t
    }, a.prototype._tagUrl = function(t, e) {
        var n, i, r, o = this.data && this.data.portal ? this.data.portal : {},
            a = this.data && this.data.game ? this.data.game : {},
            s = parseInt(o.siteId, 10);
        if ("string" != typeof t) throw Error("No url specified");
        return n = "string" == typeof e ? e : "logo", i = "brandedgames_" + (s > 0 && 500 > s ? "internal" : "external"), r = ["utm_medium=" + i, "utm_campaign=" + a.applicationId, "utm_source=" + o.host, "utm_content=" + n].join("&"), t += t.indexOf("?") > -1 ? "&" : "?", t + r
    }, s.prototype.encode = function() {
        var t = ["gameapi", this.type, this.callbackId, this.data ? JSON.stringify(this.data) : ""].join("|");
        return t
    }, c.prototype._postMessage = function(t, e, n) {
        var i, r;
        i = h.isArray(t) && "function" == typeof t[t.length - 1] ? this._callbacks.push(t.pop()) - 1 : e, r = (new s({
            type: n || "jslib",
            callbackId: i,
            data: t
        })).encode(), this._target.postMessage(r, "*")
    }, c.prototype._callJSLib = function() {
        SpilGames.apply(SpilGames, h.argsToArray(arguments))
    }, c.prototype._setupEventListener = function() {
        window.addEventListener ? window.addEventListener("message", this._handleMessage.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._handleMessage.bind(this))
    }, c.prototype._handleMessage = function(t) {
        var e, n, i, r, o = this,
            a = new s(t.data);
        return a && (e = a.type, n = a.callbackId, i = a.data, r = this._callbacks[n] || !1, this.IS_MASTER ? "jslib" === e ? ("Array" === i.constructor.name && i.push(function(t) {
            o._postMessage(t, n)
        }), this._callJSLib.apply(this, i)) : "ugapi" === e ? this._handleUGARequest(t) : this.publish(e, i) : this.IS_SLAVE && ("function" == typeof r ? (delete this._callbacks[n], r(i)) : "jslib" !== e && this.publish(e, i))), !1
    }, c.prototype._handleUGARequest = function(t) {
        var e, n, i, r = this,
            o = new s(t.data);
        if (o) switch (e = o.data[0], n = o.callbackId, i = o.data[1] ? o.data[1] : null, e) {
            case "GameAPI.data":
                r._postMessage(this.dataStore._getCache(), n, "ugapi")
        }
    }, c.prototype.post = function() {
        var t = h.argsToArray(arguments);
        return this.IS_SLAVE ? this._postMessage(t) : this._callJSLib.apply(this, t), this
    }, c.prototype.publish = function(t, e) {
        return this._channels[t] && this._channels[t].forEach(function(t) {
            try {
                t.fn.call(t.ctx, e)
            } catch (n) {}
        }), this
    }, c.prototype.subscribe = function(t, e, n) {
        if ("function" != typeof e) throw Error("Callback has to be a function");
        if ("string" != typeof t) throw Error("Channel name has to be a string");
        return this._channels[t] || (this._channels[t] = []), this._channels[t].push({
            fn: e,
            ctx: n
        }), this
    }, c.prototype.unsubscribe = function(t, e) {
        return this._channels[t] && ("function" == typeof e && (this._channels[t] = this._channels[t].filter(function(t) {
            return t.fn !== e
        }))), this
    }, c.prototype.subscribeOnce = function(t, e, n) {
        function i(n) {
            r.unsubscribe(t, i), e.call(this, n)
        }
        var r = this;
        return this.subscribe(t, i, n)
    }, c.prototype.requestFromParent = function(t, e, n) {
        if (!this.IS_SLAVE) throw "You are the parent, stop talking to yourself";
        e = e || {}, this._postMessage([t, e, n], null, "ugapi")
    }, p.prototype._setRole = function() {
        var t = h.getRole();
        this.IS_MASTER = t.IS_MASTER, this.IS_SLAVE = t.IS_SLAVE, this.IS_STANDALONE = t.IS_STANDALONE
    }, p.prototype._getTarget = function() {
        if (this.IS_STANDALONE) return window;
        var t = document.getElementById("iframegame"),
            e = t && t.contentWindow ? t.contentWindow : window.parent;
        return this.IS_MASTER ? e : window.parent
    }, p.prototype.loadAPI = function(t, e) {
        function n(e) {
            return r.IS_MASTER && (e = i(e)), r.isReady = !0, r.Branding.moduleReady = !0, r.__.EventTracking.moduleReady = !0, r.GameBreak.moduleReady = !0, r.Game.moduleReady = !0, r.Branding.init({
                data: e
            }), r.__.EventTracking.init({
                data: e
            }), r.GameBreak.init(), r.__.messenger._postMessage(["log.gameapi.loadapi.finish",
                {
                    origin: o,
                    version: r.version
                },
                null], null, "log"), t(r)
        }
        function i(t) {
            var e = t.game || {},
                n = t.user || {},
                i = t.portal || {},
                r = t.branding || {};
            return d.getLocalConfig({
                game: e,
                user: n,
                portal: i,
                branding: r
            })
        }
        var r = this,
            o = this.IS_MASTER ? "master" : "slave";
        return !0 === this.isReady ? (window.console && (window.console.log && console.log("WARNING: Detected multiple executions of GameAPI.loadAPI(). This method should only be executed once per page load!")), t(r)) : (this.__.messenger._postMessage(["log.gameapi.loadapi.start",
            {
                origin: o,
                version: r.version
            },
            null], null, "log"), this.IS_STANDALONE ? (e = e || null, d.setupStandaloneMode(e, function(t) {
            r.__.dataStore._setCache(i(t)), n(t)
        })) : this.IS_MASTER ? d.getGameConfig().then(function(t) {
            d.getBrandingConfig(t).then(function(e) {
                t && (!t.isError && (t.branding = e.branding, r.__.dataStore._setCache(i(t)))), n(t)
            })
        }) : this.__.messenger.requestFromParent("GameAPI.data", {}, function(t) {
            n(t)
        }), void 0)
    };
    var g = new p(n, c, a, o, r);
    "function" == typeof define && (define.amd && define("GameAPI", g)), t.GameAPI = g
})(window);
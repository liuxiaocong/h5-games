/*! Built with IMPACT - impactjs.com */
(function (window) {
    "use strict";
    Number.prototype.map = function (istart, istop, ostart, ostop) {
        return ostart + (ostop - ostart) * ((this - istart) / (istop - istart));
    };
    Number.prototype.limit = function (min, max) {
        return Math.min(max, Math.max(min, this));
    };
    Number.prototype.round = function (precision) {
        precision = Math.pow(10, precision || 0);
        return Math.round(this * precision) / precision;
    };
    Number.prototype.floor = function () {
        return Math.floor(this);
    };
    Number.prototype.ceil = function () {
        return Math.ceil(this);
    };
    Number.prototype.toInt = function () {
        return (this | 0);
    };
    Number.prototype.toRad = function () {
        return (this / 180) * Math.PI;
    };
    Number.prototype.toDeg = function () {
        return (this * 180) / Math.PI;
    };
    Array.prototype.erase = function (item) {
        for (var i = this.length; i--;) {
            if (this[i] === item) {
                this.splice(i, 1);
            }
        }
        return this;
    };
    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
    };
    Function.prototype.bind = Function.prototype.bind || function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply((this instanceof fNOP && oThis ? this : oThis), aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
    window.ig = {
        game: null,
        debug: null,
        version: '1.23',
        global: window,
        modules: {},
        resources: [],
        ready: false,
        baked: false,
        nocache: '',
        ua: {},
        prefix: (window.ImpactPrefix || ''),
        lib: 'lib/',
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function (selector) {
            return selector.charAt(0) == '#' ? document.getElementById(selector.substr(1)) : document.getElementsByTagName(selector);
        },
        $new: function (name) {
            return document.createElement(name);
        },
        copy: function (object) {
            if (!object || typeof (object) != 'object' || object instanceof HTMLElement || object instanceof ig.Class) {
                return object;
            } else if (object instanceof Array) {
                var c = [];
                for (var i = 0, l = object.length; i < l; i++) {
                    c[i] = ig.copy(object[i]);
                }
                return c;
            } else {
                var c = {};
                for (var i in object) {
                    c[i] = ig.copy(object[i]);
                }
                return c;
            }
        },
        merge: function (original, extended) {
            for (var key in extended) {
                var ext = extended[key];
                if (typeof (ext) != 'object' || ext instanceof HTMLElement || ext instanceof ig.Class || ext === null) {
                    original[key] = ext;
                } else {
                    if (!original[key] || typeof (original[key]) != 'object') {
                        original[key] = (ext instanceof Array) ? [] : {};
                    }
                    ig.merge(original[key], ext);
                }
            }
            return original;
        },
        ksort: function (obj) {
            if (!obj || typeof (obj) != 'object') {
                return [];
            }
            var keys = [],
                values = [];
            for (var i in obj) {
                keys.push(i);
            }
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        },
        setVendorAttribute: function (el, attr, val) {
            var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
            el[attr] = el['ms' + uc] = el['moz' + uc] = el['webkit' + uc] = el['o' + uc] = val;
        },
        getVendorAttribute: function (el, attr) {
            var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
            return el[attr] || el['ms' + uc] || el['moz' + uc] || el['webkit' + uc] || el['o' + uc];
        },
        normalizeVendorAttribute: function (el, attr) {
            var prefixedVal = ig.getVendorAttribute(el, attr);
            if (!el[attr] && prefixedVal) {
                el[attr] = prefixedVal;
            }
        },
        getImagePixels: function (image, x, y, width, height) {
            var canvas = ig.$new('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext('2d');
            ig.System.SCALE.CRISP(canvas, ctx);
            var ratio = ig.getVendorAttribute(ctx, 'backingStorePixelRatio') || 1;
            ig.normalizeVendorAttribute(ctx, 'getImageDataHD');
            var realWidth = image.width / ratio,
                realHeight = image.height / ratio;
            canvas.width = Math.ceil(realWidth);
            canvas.height = Math.ceil(realHeight);
            ctx.drawImage(image, 0, 0, realWidth, realHeight);
            return (ratio === 1) ? ctx.getImageData(x, y, width, height) : ctx.getImageDataHD(x, y, width, height);
        },
        module: function (name) {
            if (ig._current) {
                throw ("Module '" + ig._current.name + "' defines nothing");
            }
            if (ig.modules[name] && ig.modules[name].body) {
                throw ("Module '" + name + "' is already defined");
            }
            ig._current = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            ig.modules[name] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig;
        },
        requires: function () {
            ig._current.requires = Array.prototype.slice.call(arguments);
            return ig;
        },
        defines: function (body) {
            ig._current.body = body;
            ig._current = null;
            ig._initDOMReady();
        },
        addResource: function (resource) {
            ig.resources.push(resource);
        },
        setNocache: function (set) {
            ig.nocache = set ? '?' + Date.now() : '';
        },
        log: function () {},
        assert: function (condition, msg) {},
        show: function (name, number) {},
        mark: function (msg, color) {},
        _loadScript: function (name, requiredFrom) {
            ig.modules[name] = {
                name: name,
                requires: [],
                loaded: false,
                body: null
            };
            ig._waitForOnload++;
            var path = ig.prefix + ig.lib + name.replace(/\./g, '/') + '.js' + ig.nocache;
            var script = ig.$new('script');
            script.type = 'text/javascript';
            script.src = path;
            script.onload = function () {
                ig._waitForOnload--;
                ig._execModules();
            };
            script.onerror = function () {
                throw ('Failed to load module ' + name + ' at ' + path + ' ' + 'required from ' + requiredFrom);
            };
            ig.$('head')[0].appendChild(script);
        },
        _execModules: function () {
            var modulesLoaded = false;
            for (var i = 0; i < ig._loadQueue.length; i++) {
                var m = ig._loadQueue[i];
                var dependenciesLoaded = true;
                for (var j = 0; j < m.requires.length; j++) {
                    var name = m.requires[j];
                    if (!ig.modules[name]) {
                        dependenciesLoaded = false;
                        ig._loadScript(name, m.name);
                    } else if (!ig.modules[name].loaded) {
                        dependenciesLoaded = false;
                    }
                }
                if (dependenciesLoaded && m.body) {
                    ig._loadQueue.splice(i, 1);
                    m.loaded = true;
                    m.body();
                    modulesLoaded = true;
                    i--;
                }
            }
            if (modulesLoaded) {
                ig._execModules();
            } else if (!ig.baked && ig._waitForOnload == 0 && ig._loadQueue.length != 0) {
                var unresolved = [];
                for (var i = 0; i < ig._loadQueue.length; i++) {
                    var unloaded = [];
                    var requires = ig._loadQueue[i].requires;
                    for (var j = 0; j < requires.length; j++) {
                        var m = ig.modules[requires[j]];
                        if (!m || !m.loaded) {
                            unloaded.push(requires[j]);
                        }
                    }
                    unresolved.push(ig._loadQueue[i].name + ' (requires: ' + unloaded.join(', ') + ')');
                }
                throw ("Unresolved (or circular?) dependencies. " + "Most likely there's a name/path mismatch for one of the listed modules " + "or a previous syntax error prevents a module from loading:\n" +
                    unresolved.join('\n'));
            }
        },
        _DOMReady: function () {
            if (!ig.modules['dom.ready'].loaded) {
                if (!document.body) {
                    return setTimeout(ig._DOMReady, 13);
                }
                ig.modules['dom.ready'].loaded = true;
                ig._waitForOnload--;
                ig._execModules();
            }
            return 0;
        },
        _boot: function () {
            if (document.location.href.match(/\?nocache/)) {
                ig.setNocache(true);
            }
            ig.ua.pixelRatio = window.devicePixelRatio || 1;
            ig.ua.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            ig.ua.screen = {
                width: window.screen.availWidth * ig.ua.pixelRatio,
                height: window.screen.availHeight * ig.ua.pixelRatio
            };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = (ig.ua.iPhone && ig.ua.pixelRatio == 2);
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.winPhone || /mobile/i.test(navigator.userAgent);
            ig.ua.touchDevice = (('ontouchstart' in window) || (window.navigator.msMaxTouchPoints));
        },
        _initDOMReady: function () {
            if (ig.modules['dom.ready']) {
                ig._execModules();
                return;
            }
            ig._boot();
            ig.modules['dom.ready'] = {
                requires: [],
                loaded: false,
                body: null
            };
            ig._waitForOnload++;
            if (document.readyState === 'complete') {
                ig._DOMReady();
            } else {
                document.addEventListener('DOMContentLoaded', ig._DOMReady, false);
                window.addEventListener('load', ig._DOMReady, false);
            }
        }
    };
    ig.normalizeVendorAttribute(window, 'requestAnimationFrame');
    if (window.requestAnimationFrame) {
        var next = 1,
            anims = {};
        window.ig.setAnimation = function (callback, element) {
            var current = next++;
            anims[current] = true;
            var animate = function () {
                if (!anims[current]) {
                    return;
                }
                window.requestAnimationFrame(animate, element);
                callback();
            };
            window.requestAnimationFrame(animate, element);
            return current;
        };
        window.ig.clearAnimation = function (id) {
            delete anims[id];
        };
    } else {
        window.ig.setAnimation = function (callback, element) {
            return window.setInterval(callback, 1000 / 60);
        };
        window.ig.clearAnimation = function (id) {
            window.clearInterval(id);
        };
    }
    var initializing = false,
        fnTest = /xyz/.test(function () {
            xyz;
        }) ? /\bparent\b/ : /.*/;
    var lastClassId = 0;
    window.ig.Class = function () {};
    var inject = function (prop) {
        var proto = this.prototype;
        var parent = {};
        for (var name in prop) {
            if (typeof (prop[name]) == "function" && typeof (proto[name]) == "function" && fnTest.test(prop[name])) {
                parent[name] = proto[name];
                proto[name] = (function (name, fn) {
                    return function () {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            } else {
                proto[name] = prop[name];
            }
        }
    };
    window.ig.Class.extend = function (prop) {
        var parent = this.prototype;
        initializing = true;
        var prototype = new this();
        initializing = false;
        for (var name in prop) {
            if (typeof (prop[name]) == "function" && typeof (parent[name]) == "function" && fnTest.test(prop[name])) {
                prototype[name] = (function (name, fn) {
                    return function () {
                        var tmp = this.parent;
                        this.parent = parent[name];
                        var ret = fn.apply(this, arguments);
                        this.parent = tmp;
                        return ret;
                    };
                })(name, prop[name]);
            } else {
                prototype[name] = prop[name];
            }
        }

        function Class() {
            if (!initializing) {
                if (this.staticInstantiate) {
                    var obj = this.staticInstantiate.apply(this, arguments);
                    if (obj) {
                        return obj;
                    }
                }
                for (var p in this) {
                    if (typeof (this[p]) == 'object') {
                        this[p] = ig.copy(this[p]);
                    }
                }
                if (this.init) {
                    this.init.apply(this, arguments);
                }
            }
            return this;
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = window.ig.Class.extend;
        Class.inject = inject;
        Class.classId = prototype.classId = ++lastClassId;
        return Class;
    };
    if (window.ImpactMixin) {
        ig.merge(ig, window.ImpactMixin);
    }
})(window);

// lib/impact/image.js
ig.baked = true;
ig.module('impact.image').defines(function () {
    "use strict";
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: false,
        failed: false,
        loadCallback: null,
        path: '',
        staticInstantiate: function (path) {
            return ig.Image.cache[path] || null;
        },
        init: function (path) {
            this.path = path;
            this.load();
        },
        load: function (loadCallback) {
            if (this.loaded) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            } else if (!this.loaded && ig.ready) {
                this.loadCallback = loadCallback || null;
                this.data = new Image();
                this.data.onload = this.onload.bind(this);
                this.data.onerror = this.onerror.bind(this);
                this.data.src = ig.prefix + this.path + ig.nocache;
            } else {
                ig.addResource(this);
            }
            ig.Image.cache[this.path] = this;
        },
        reload: function () {
            this.loaded = false;
            this.data = new Image();
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + '?' + Date.now();
        },
        onload: function (event) {
            this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = true;
            if (ig.system.scale != 1) {
                this.resize(ig.system.scale);
            }
            if (this.loadCallback) {
                this.loadCallback(this.path, true);
            }
        },
        onerror: function (event) {
            this.failed = true;
            if (this.loadCallback) {
                this.loadCallback(this.path, false);
            }
        },
        resize: function (scale) {
            var origPixels = ig.getImagePixels(this.data, 0, 0, this.width, this.height);
            var widthScaled = this.width * scale;
            var heightScaled = this.height * scale;
            var scaled = ig.$new('canvas');
            scaled.width = widthScaled;
            scaled.height = heightScaled;
            var scaledCtx = scaled.getContext('2d');
            var scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled);
            for (var y = 0; y < heightScaled; y++) {
                for (var x = 0; x < widthScaled; x++) {
                    var index = (Math.floor(y / scale) * this.width + Math.floor(x / scale)) * 4;
                    var indexScaled = (y * widthScaled + x) * 4;
                    scaledPixels.data[indexScaled] = origPixels.data[index];
                    scaledPixels.data[indexScaled + 1] = origPixels.data[index + 1];
                    scaledPixels.data[indexScaled + 2] = origPixels.data[index + 2];
                    scaledPixels.data[indexScaled + 3] = origPixels.data[index + 3];
                }
            }
            scaledCtx.putImageData(scaledPixels, 0, 0);
            this.data = scaled;
        },
        draw: function (targetX, targetY, sourceX, sourceY, width, height) {
            if (!this.loaded) {
                return;
            }
            var scale = ig.system.scale;
            sourceX = sourceX ? sourceX * scale : 0;
            sourceY = sourceY ? sourceY * scale : 0;
            width = (width ? width : this.width) * scale;
            height = (height ? height : this.height) * scale;
            ig.system.context.drawImage(this.data, sourceX, sourceY, width, height, ig.system.getDrawPos(targetX), ig.system.getDrawPos(targetY), width, height);
            ig.Image.drawCount++;
        },
        drawTile: function (targetX, targetY, tile, tileWidth, tileHeight, flipX, flipY) {
            tileHeight = tileHeight ? tileHeight : tileWidth;
            if (!this.loaded || tileWidth > this.width || tileHeight > this.height) {
                return;
            }
            var scale = ig.system.scale;
            var tileWidthScaled = Math.floor(tileWidth * scale);
            var tileHeightScaled = Math.floor(tileHeight * scale);
            var scaleX = flipX ? -1 : 1;
            var scaleY = flipY ? -1 : 1;
            if (flipX || flipY) {
                ig.system.context.save();
                ig.system.context.scale(scaleX, scaleY);
            }
            ig.system.context.drawImage(this.data, (Math.floor(tile * tileWidth) % this.width) * scale, (Math.floor(tile * tileWidth / this.width) * tileHeight) * scale, tileWidthScaled, tileHeightScaled, ig.system.getDrawPos(targetX) * scaleX - (flipX ? tileWidthScaled : 0), ig.system.getDrawPos(targetY) * scaleY - (flipY ? tileHeightScaled : 0), tileWidthScaled, tileHeightScaled);
            if (flipX || flipY) {
                ig.system.context.restore();
            }
            ig.Image.drawCount++;
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function () {
        for (var path in ig.Image.cache) {
            ig.Image.cache[path].reload();
        }
    };
}); // lib/impact/font.js
ig.baked = true;
ig.module('impact.font').requires('impact.image').defines(function () {
    "use strict";
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function (ev) {
            this._loadMetrics(this.data);
            this.parent(ev);
        },
        widthForString: function (text) {
            if (text.indexOf('\n') !== -1) {
                var lines = text.split('\n');
                var width = 0;
                for (var i = 0; i < lines.length; i++) {
                    width = Math.max(width, this._widthForLine(lines[i]));
                }
                return width;
            } else {
                return this._widthForLine(text);
            }
        },
        _widthForLine: function (text) {
            var width = 0;
            for (var i = 0; i < text.length; i++) {
                width += this.widthMap[text.charCodeAt(i) - this.firstChar] + this.letterSpacing;
            }
            return width;
        },
        heightForString: function (text) {
            return text.split('\n').length * (this.height + this.lineSpacing);
        },
        draw: function (text, x, y, align) {
            if (typeof (text) != 'string') {
                text = text.toString();
            }
            if (text.indexOf('\n') !== -1) {
                var lines = text.split('\n');
                var lineHeight = this.height + this.lineSpacing;
                for (var i = 0; i < lines.length; i++) {
                    this.draw(lines[i], x, y + i * lineHeight, align);
                }
                return;
            }
            if (align == ig.Font.ALIGN.RIGHT || align == ig.Font.ALIGN.CENTER) {
                var width = this._widthForLine(text);
                x -= align == ig.Font.ALIGN.CENTER ? width / 2 : width;
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            for (var i = 0; i < text.length; i++) {
                var c = text.charCodeAt(i);
                x += this._drawChar(c - this.firstChar, x, y);
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = 1;
            }
            ig.Image.drawCount += text.length;
        },
        _drawChar: function (c, targetX, targetY) {
            if (!this.loaded || c < 0 || c >= this.indices.length) {
                return 0;
            }
            var scale = ig.system.scale;
            var charX = this.indices[c] * scale;
            var charY = 0;
            var charWidth = this.widthMap[c] * scale;
            var charHeight = (this.height - 2) * scale;
            ig.system.context.drawImage(this.data, charX, charY, charWidth, charHeight, ig.system.getDrawPos(targetX), ig.system.getDrawPos(targetY), charWidth, charHeight);
            return this.widthMap[c] + this.letterSpacing;
        },
        _loadMetrics: function (image) {
            this.height = image.height - 1;
            this.widthMap = [];
            this.indices = [];
            var px = ig.getImagePixels(image, 0, image.height - 1, image.width, 1);
            var currentChar = 0;
            var currentWidth = 0;
            for (var x = 0; x < image.width; x++) {
                var index = x * 4 + 3;
                if (px.data[index] > 127) {
                    currentWidth++;
                } else if (px.data[index] < 128 && currentWidth) {
                    this.widthMap.push(currentWidth);
                    this.indices.push(x - currentWidth);
                    currentChar++;
                    currentWidth = 0;
                }
            }
            this.widthMap.push(currentWidth);
            this.indices.push(x - currentWidth);
        }
    });
    ig.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    };
});

// lib/impact/sound.js
ig.baked = true;
ig.module('impact.sound').defines(function () {
    "use strict";
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function () {
            if (!ig.Sound.enabled || !window.Audio) {
                ig.Sound.enabled = false;
                return;
            }
            var probe = new Audio();
            for (var i = 0; i < ig.Sound.use.length; i++) {
                var format = ig.Sound.use[i];
                if (probe.canPlayType(format.mime)) {
                    this.format = format;
                    break;
                }
            }
            if (!this.format) {
                ig.Sound.enabled = false;
            }
        },
        load: function (path, multiChannel, loadCallback) {
            var realPath = ig.prefix + path.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[path]) {
                if (multiChannel && this.clips[path].length < ig.Sound.channels) {
                    for (var i = this.clips[path].length; i < ig.Sound.channels; i++) {
                        var a = new Audio(realPath);
                        a.load();
                        this.clips[path].push(a);
                    }
                }
                return this.clips[path][0];
            }
            var clip = new Audio(realPath);
            if (loadCallback) {
                clip.addEventListener('canplaythrough', function cb(ev) {
                    clip.removeEventListener('canplaythrough', cb, false);
                    loadCallback(path, true, ev);
                }, false);
                clip.addEventListener('error', function (ev) {
                    loadCallback(path, false, ev);
                }, false);
            }
            clip.preload = 'auto';
            clip.load();
            this.clips[path] = [clip];
            if (multiChannel) {
                for (var i = 1; i < ig.Sound.channels; i++) {
                    var a = new Audio(realPath);
                    a.load();
                    this.clips[path].push(a);
                }
            }
            return clip;
        },
        get: function (path) {
            var channels = this.clips[path];
            for (var i = 0, clip; clip = channels[i++];) {
                if (clip.paused || clip.ended) {
                    if (clip.ended) {
                        clip.currentTime = 0;
                    }
                    return clip;
                }
            }
            channels[0].pause();
            channels[0].currentTime = 0;
            return channels[0];
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: false,
        _volume: 1,
        _loop: false,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function () {
            this._endedCallbackBound = this._endedCallback.bind(this);
            if (Object.defineProperty) {
                Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                });
                Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                });
            } else if (this.__defineGetter__) {
                this.__defineGetter__('volume', this.getVolume.bind(this));
                this.__defineSetter__('volume', this.setVolume.bind(this));
                this.__defineGetter__('loop', this.getLooping.bind(this));
                this.__defineSetter__('loop', this.setLooping.bind(this));
            }
        },
        add: function (music, name) {
            if (!ig.Sound.enabled) {
                return;
            }
            var path = music instanceof ig.Sound ? music.path : music;
            var track = ig.soundManager.load(path, false);
            track.loop = this._loop;
            track.volume = this._volume;
            track.addEventListener('ended', this._endedCallbackBound, false);
            this.tracks.push(track);
            if (name) {
                this.namedTracks[name] = track;
            }
            if (!this.currentTrack) {
                this.currentTrack = track;
            }
        },
        next: function () {
            if (!this.tracks.length) {
                return;
            }
            this.stop();
            this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length;
            this.currentTrack = this.tracks[this.currentIndex];
            this.play();
        },
        pause: function () {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
        },
        stop: function () {
            if (!this.currentTrack) {
                return;
            }
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
        },
        play: function (name) {
            if (name && this.namedTracks[name]) {
                var newTrack = this.namedTracks[name];
                if (newTrack != this.currentTrack) {
                    this.stop();
                    this.currentTrack = newTrack;
                }
            } else if (!this.currentTrack) {
                return;
            }
            this.currentTrack.play();
        },
        getLooping: function () {
            return this._loop;
        },
        setLooping: function (l) {
            this._loop = l;
            for (var i in this.tracks) {
                this.tracks[i].loop = l;
            }
        },
        getVolume: function () {
            return this._volume;
        },
        setVolume: function (v) {
            this._volume = v.limit(0, 1);
            for (var i in this.tracks) {
                this.tracks[i].volume = this._volume;
            }
        },
        fadeOut: function (time) {
            if (!this.currentTrack) {
                return;
            }
            clearInterval(this._fadeInterval);
            this.fadeTimer = new ig.Timer(time);
            this._fadeInterval = setInterval(this._fadeStep.bind(this), 50);
        },
        _fadeStep: function () {
            var v = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            if (v <= 0.01) {
                this.stop();
                this.currentTrack.volume = this._volume;
                clearInterval(this._fadeInterval);
            } else {
                this.currentTrack.volume = v;
            }
        },
        _endedCallback: function () {
            if (this._loop) {
                this.play();
            } else {
                this.next();
            }
        }
    });
    ig.Sound = ig.Class.extend({
        path: '',
        volume: 1,
        currentClip: null,
        multiChannel: true,
        init: function (path, multiChannel) {
            this.path = path;
            this.multiChannel = (multiChannel !== false);
            this.load();
        },
        load: function (loadCallback) {
            if (!ig.Sound.enabled) {
                if (loadCallback) {
                    loadCallback(this.path, true);
                }
                return;
            }
            if (ig.ready) {
                ig.soundManager.load(this.path, this.multiChannel, loadCallback);
            } else {
                ig.addResource(this);
            }
        },
        play: function () {
            if (!ig.Sound.enabled) {
                return;
            }
            this.currentClip = ig.soundManager.get(this.path);
            this.currentClip.volume = ig.soundManager.volume * this.volume;
            this.currentClip.play();
        },
        stop: function () {
            if (this.currentClip) {
                this.currentClip.pause();
                this.currentClip.currentTime = 0;
            }
        }
    });
    ig.Sound.FORMAT = {
        MP3: {
            ext: 'mp3',
            mime: 'audio/mpeg'
        },
        M4A: {
            ext: 'm4a',
            mime: 'audio/mp4; codecs=mp4a'
        },
        OGG: {
            ext: 'ogg',
            mime: 'audio/ogg; codecs=vorbis'
        },
        WEBM: {
            ext: 'webm',
            mime: 'audio/webm; codecs=vorbis'
        },
        CAF: {
            ext: 'caf',
            mime: 'audio/x-caf'
        }
    };
    ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
    ig.Sound.channels = 4;
    ig.Sound.enabled = true;
});

// lib/impact/loader.js
ig.baked = true;
ig.module('impact.loader').requires('impact.image', 'impact.font', 'impact.sound').defines(function () {
    "use strict";
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: false,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function (gameClass, resources) {
            this.gameClass = gameClass;
            this.resources = resources;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var i = 0; i < this.resources.length; i++) {
                this._unloaded.push(this.resources[i].path);
            }
        },
        load: function () {
            ig.system.clear('#000');
            if (!this.resources.length) {
                this.end();
                return;
            }
            for (var i = 0; i < this.resources.length; i++) {
                this.loadResource(this.resources[i]);
            }
            this._intervalId = setInterval(this.draw.bind(this), 16);
        },
        loadResource: function (res) {
            res.load(this._loadCallbackBound);
        },
        end: function () {
            if (this.done) {
                return;
            }
            this.done = true;
            clearInterval(this._intervalId);
            ig.system.setGame(this.gameClass);
        },
        draw: function () {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var s = ig.system.scale;
            var w = ig.system.width * 0.6;
            var h = ig.system.height * 0.1;
            var x = ig.system.width * 0.5 - w / 2;
            var y = ig.system.height * 0.5 - h / 2;
            ig.system.context.fillStyle = '#000';
            ig.system.context.fillRect(0, 0, 480, 320);
            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect(x * s, y * s, w * s, h * s);
            ig.system.context.fillStyle = '#000';
            ig.system.context.fillRect(x * s + s, y * s + s, w * s - s - s, h * s - s - s);
            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect(x * s, y * s, w * s * this._drawStatus, h * s);
        },
        _loadCallback: function (path, status) {
            if (status) {
                this._unloaded.erase(path);
            } else {
                throw ('Failed to load resource: ' + path);
            }
            this.status = 1 - (this._unloaded.length / this.resources.length);
            if (this._unloaded.length == 0) {
                setTimeout(this.end.bind(this), 250);
            }
        }
    });
});

// lib/impact/timer.js
ig.baked = true;
ig.module('impact.timer').defines(function () {
    "use strict";
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function (seconds) {
            this.base = ig.Timer.time;
            this.last = ig.Timer.time;
            this.target = seconds || 0;
        },
        set: function (seconds) {
            this.target = seconds || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0;
        },
        reset: function () {
            this.base = ig.Timer.time;
            this.pausedAt = 0;
        },
        tick: function () {
            var delta = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return (this.pausedAt ? 0 : delta);
        },
        delta: function () {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target;
        },
        pause: function () {
            if (!this.pausedAt) {
                this.pausedAt = ig.Timer.time;
            }
        },
        unpause: function () {
            if (this.pausedAt) {
                this.base += ig.Timer.time - this.pausedAt;
                this.pausedAt = 0;
            }
        }
    });
    ig.Timer._last = 0;
    ig.Timer.time = Number.MIN_VALUE;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function () {
        var current = Date.now();
        var delta = (current - ig.Timer._last) / 1000;
        ig.Timer.time += Math.min(delta, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = current;
    };
});

// lib/impact/system.js
ig.baked = true;
ig.module('impact.system').requires('impact.timer', 'impact.image').defines(function () {
    "use strict";
    ig.System = ig.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        animationId: 0,
        newGameClass: null,
        running: false,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function (canvasId, fps, width, height, scale) {
            this.fps = fps;
            this.clock = new ig.Timer();
            this.canvas = ig.$(canvasId);
            this.resize(width, height, scale);
            this.context = this.canvas.getContext('2d');
            this.getDrawPos = ig.System.drawMode;
            if (this.scale != 1) {
                ig.System.scaleMode = ig.System.SCALE.CRISP;
            }
            ig.System.scaleMode(this.canvas, this.context);
        },
        resize: function (width, height, scale) {
            this.width = width;
            this.height = height;
            this.scale = scale || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight;
        },
        setGame: function (gameClass) {
            if (this.running) {
                this.newGameClass = gameClass;
            } else {
                this.setGameNow(gameClass);
            }
        },
        setGameNow: function (gameClass) {
            ig.game = new(gameClass)();
            ig.system.setDelegate(ig.game);
        },
        setDelegate: function (object) {
            if (typeof (object.run) == 'function') {
                this.delegate = object;
                this.startRunLoop();
            } else {
                throw ('System.setDelegate: No run() function in object');
            }
        },
        stopRunLoop: function () {
            ig.clearAnimation(this.animationId);
            this.running = false;
        },
        startRunLoop: function () {
            this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = true;
        },
        clear: function (color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight);
        },
        run: function () {
            ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            if (this.newGameClass) {
                this.setGameNow(this.newGameClass);
                this.newGameClass = null;
            }
        },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function (p) {
            return Math.round(p) * this.scale;
        },
        SMOOTH: function (p) {
            return Math.round(p * this.scale);
        },
        SUBPIXEL: function (p) {
            return p * this.scale;
        }
    };
    ig.System.drawMode = ig.System.DRAW.AUTHENTIC;
    ig.System.SCALE = {
        CRISP: function (canvas, context) {
            ig.setVendorAttribute(context, 'imageSmoothingEnabled', false);
            canvas.style.imageRendering = '-moz-crisp-edges';
            canvas.style.imageRendering = '-o-crisp-edges';
            canvas.style.imageRendering = '-webkit-optimize-contrast';
            canvas.style.imageRendering = 'crisp-edges';
            canvas.style.msInterpolationMode = 'nearest-neighbor';
        },
        SMOOTH: function (canvas, context) {
            ig.setVendorAttribute(context, 'imageSmoothingEnabled', true);
            canvas.style.imageRendering = '';
            canvas.style.msInterpolationMode = '';
        }
    };
    ig.System.scaleMode = ig.System.SCALE.CRISP;
});

// lib/impact/input.js
ig.baked = true;
ig.module('impact.input').defines(function () {
    "use strict";
    ig.KEY = {
        'MOUSE1': -1,
        'MOUSE2': -3,
        'MWHEEL_UP': -4,
        'MWHEEL_DOWN': -5,
        'BACKSPACE': 8,
        'TAB': 9,
        'ENTER': 13,
        'PAUSE': 19,
        'CAPS': 20,
        'ESC': 27,
        'SPACE': 32,
        'PAGE_UP': 33,
        'PAGE_DOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT_ARROW': 37,
        'UP_ARROW': 38,
        'RIGHT_ARROW': 39,
        'DOWN_ARROW': 40,
        'INSERT': 45,
        'DELETE': 46,
        '_0': 48,
        '_1': 49,
        '_2': 50,
        '_3': 51,
        '_4': 52,
        '_5': 53,
        '_6': 54,
        '_7': 55,
        '_8': 56,
        '_9': 57,
        'A': 65,
        'B': 66,
        'C': 67,
        'D': 68,
        'E': 69,
        'F': 70,
        'G': 71,
        'H': 72,
        'I': 73,
        'J': 74,
        'K': 75,
        'L': 76,
        'M': 77,
        'N': 78,
        'O': 79,
        'P': 80,
        'Q': 81,
        'R': 82,
        'S': 83,
        'T': 84,
        'U': 85,
        'V': 86,
        'W': 87,
        'X': 88,
        'Y': 89,
        'Z': 90,
        'NUMPAD_0': 96,
        'NUMPAD_1': 97,
        'NUMPAD_2': 98,
        'NUMPAD_3': 99,
        'NUMPAD_4': 100,
        'NUMPAD_5': 101,
        'NUMPAD_6': 102,
        'NUMPAD_7': 103,
        'NUMPAD_8': 104,
        'NUMPAD_9': 105,
        'MULTIPLY': 106,
        'ADD': 107,
        'SUBSTRACT': 109,
        'DECIMAL': 110,
        'DIVIDE': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'SHIFT': 16,
        'CTRL': 17,
        'ALT': 18,
        'PLUS': 187,
        'COMMA': 188,
        'MINUS': 189,
        'PERIOD': 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: false,
        isUsingKeyboard: false,
        isUsingAccelerometer: false,
        mouse: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0,
            z: 0
        },
        initMouse: function () {
            if (this.isUsingMouse) {
                return;
            }
            this.isUsingMouse = true;
            var mouseWheelBound = this.mousewheel.bind(this);
            ig.system.canvas.addEventListener('mousewheel', mouseWheelBound, false);
            ig.system.canvas.addEventListener('DOMMouseScroll', mouseWheelBound, false);
            ig.system.canvas.addEventListener('contextmenu', this.contextmenu.bind(this), false);
            ig.system.canvas.addEventListener('mousedown', this.keydown.bind(this), false);
            ig.system.canvas.addEventListener('mouseup', this.keyup.bind(this), false);
            ig.system.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
            if (ig.ua.touchDevice) {
                ig.system.canvas.addEventListener('touchstart', this.keydown.bind(this), false);
                ig.system.canvas.addEventListener('touchend', this.keyup.bind(this), false);
                ig.system.canvas.addEventListener('touchmove', this.mousemove.bind(this), false);
                ig.system.canvas.addEventListener('MSPointerDown', this.keydown.bind(this), false);
                ig.system.canvas.addEventListener('MSPointerUp', this.keyup.bind(this), false);
                ig.system.canvas.addEventListener('MSPointerMove', this.mousemove.bind(this), false);
                ig.system.canvas.style.msTouchAction = 'none';
            }
        },
        initKeyboard: function () {
            if (this.isUsingKeyboard) {
                return;
            }
            this.isUsingKeyboard = true;
            window.addEventListener('keydown', this.keydown.bind(this), false);
            window.addEventListener('keyup', this.keyup.bind(this), false);
        },
        initAccelerometer: function () {
            if (this.isUsingAccelerometer) {
                return;
            }
            window.addEventListener('devicemotion', this.devicemotion.bind(this), false);
        },
        mousewheel: function (event) {
            var delta = event.wheelDelta ? event.wheelDelta : (event.detail * -1);
            var code = delta > 0 ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN;
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                this.presses[action] = true;
                this.delayedKeyup[action] = true;
                event.stopPropagation();
                event.preventDefault();
            }
        },
        mousemove: function (event) {
			
            var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
            var scale = ig.system.scale * (internalWidth / ig.system.realWidth);
            var pos = {
                left: 0,
                top: 0
            };
            if (ig.system.canvas.getBoundingClientRect) {
                pos = ig.system.canvas.getBoundingClientRect();
            }
            var ev = event.touches ? event.touches[0] : event;
            this.mouse.x = (ev.clientX - pos.left) / scale;
            this.mouse.y = (ev.clientY - pos.top) / scale;
			
        },
        contextmenu: function (event) {
            if (this.bindings[ig.KEY.MOUSE2]) {
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keydown: function (event) {
		
            var tag = event.target.tagName;
            if (tag == 'INPUT' || tag == 'TEXTAREA') {
                return;
            }
            var code = event.type == 'keydown' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
            if (event.type == 'touchstart' || event.type == 'mousedown') {
				this.mousemove(event);
				gameScreenResized();
            }
            var action = this.bindings[code];
            if (action) {
                this.actions[action] = true;
                if (!this.locks[action]) {
                    this.presses[action] = true;
                    this.locks[action] = true;
                }
                event.stopPropagation();
                event.preventDefault();
            }
        },
        keyup: function (event) {
            var tag = event.target.tagName;
            if (tag == 'INPUT' || tag == 'TEXTAREA') {
                return;
            }
            var code = event.type == 'keyup' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
            var action = this.bindings[code];
            if (action) {
                this.delayedKeyup[action] = true;
                event.stopPropagation();
                event.preventDefault();
            }
        },
        devicemotion: function (event) {
            this.accel = event.accelerationIncludingGravity;
        },
        bind: function (key, action) {
            if (key < 0) {
                this.initMouse();
            } else if (key > 0) {
                this.initKeyboard();
            }
            this.bindings[key] = action;
        },
        bindTouch: function (selector, action) {
            var element = ig.$(selector);
            var that = this;
            element.addEventListener('touchstart', function (ev) {
                that.touchStart(ev, action);
            }, false);
            element.addEventListener('touchend', function (ev) {
                that.touchEnd(ev, action);
            }, false);
            element.addEventListener('MSPointerDown', function (ev) {
                that.touchStart(ev, action);
            }, false);
            element.addEventListener('MSPointerUp', function (ev) {
                that.touchEnd(ev, action);
            }, false);
        },
        unbind: function (key) {
            var action = this.bindings[key];
            this.delayedKeyup[action] = true;
            this.bindings[key] = null;
        },
        unbindAll: function () {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {};
        },
        state: function (action) {
            return this.actions[action];
        },
        pressed: function (action) {
            return this.presses[action];
        },
        released: function (action) {
            return !!this.delayedKeyup[action];
        },
        clearPressed: function () {
            for (var action in this.delayedKeyup) {
                this.actions[action] = false;
                this.locks[action] = false;
            }
            this.delayedKeyup = {};
            this.presses = {};
        },
        touchStart: function (event, action) {
            this.actions[action] = true;
            this.presses[action] = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
        },
        touchEnd: function (event, action) {
            this.delayedKeyup[action] = true;
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    });
});

// lib/impact/impact.js
ig.baked = true;
ig.module('impact.impact').requires('dom.ready', 'impact.loader', 'impact.system', 'impact.input', 'impact.sound').defines(function () {
    "use strict";
    ig.main = function (canvasId, gameClass, fps, width, height, scale, loaderClass) {
        ig.system = new ig.System(canvasId, fps, width, height, scale || 1);
        ig.input = new ig.Input();
        ig.soundManager = new ig.SoundManager();
        ig.music = new ig.Music();
        ig.ready = true;
        var loader = new(loaderClass || ig.Loader)(gameClass, ig.resources);
        loader.load();
    };
});
var curScale;

function startGame() {
    window.addEventListener('orientationchange', gameOrientationFunction);
    window.addEventListener('resize', gameScreenResized);
    SG_Hooks.setOrientationHandler(gameOrientationFunction);
    SG_Hooks.setResizeHandler(gameScreenResized);
    var lang = SG.lang; //SG_Hooks.getLanguage(['en', 'de', 'es', 'pt', 'ru', 'tr']);
    userLang = lang.toString();
    var scale = {
        x: 1,
        y: 1
    };
    scale.x = (window.innerWidth) / canvas.width;
    scale.y = (window.innerHeight) / canvas.height;
    curScale = (window.innerHeight) / canvas.height;
    if (scale.x < 1 || scale.y < 1) {
        scale = '1, 1';
        curScale = 1;
    } else if (scale.x < scale.y) {
        scale = scale.x + ', ' + scale.x;
    } else {
        scale = scale.y + ', ' + scale.y;
    }
    canvas.setAttribute('style', 'transform: scale(' + scale + '); -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); ');
    window.scrollTo(0, 1);
}


// lib/impact/animation.js
ig.baked = true;
ig.module('impact.animation').requires('impact.timer', 'impact.image').defines(function () {
    "use strict";
    ig.AnimationSheet = ig.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function (path, width, height) {
            this.width = width;
            this.height = height;
            this.image = new ig.Image(path);
        }
    });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: false,
            y: false
        },
        pivot: {
            x: 0,
            y: 0
        },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        init: function (sheet, frameTime, sequence, stop) {
            this.sheet = sheet;
            this.pivot = {
                x: sheet.width / 2,
                y: sheet.height / 2
            };
            this.timer = new ig.Timer();
            this.frameTime = frameTime;
            this.sequence = sequence;
            this.stop = !!stop;
            this.tile = this.sequence[0];
        },
        rewind: function () {
            this.timer.set();
            this.loopCount = 0;
            this.frame = 0;
            this.tile = this.sequence[0];
            return this;
        },
        gotoFrame: function (f) {
            this.timer.set(this.frameTime * -f - 0.0001);
            this.update();
        },
        gotoRandomFrame: function () {
            this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
        },
        update: function () {
            var frameTotal = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(frameTotal / this.sequence.length);
            if (this.stop && this.loopCount > 0) {
                this.frame = this.sequence.length - 1;
            } else {
                this.frame = frameTotal % this.sequence.length;
            }
            this.tile = this.sequence[this.frame];
        },
        draw: function (targetX, targetY) {
            var bbsize = Math.max(this.sheet.width, this.sheet.height);
            if (targetX > ig.system.width || targetY > ig.system.height || targetX + bbsize < 0 || targetY + bbsize < 0) {
                return;
            }
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            if (this.angle == 0) {
                this.sheet.image.drawTile(targetX, targetY, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
            } else {
                ig.system.context.save();
                ig.system.context.translate(ig.system.getDrawPos(targetX + this.pivot.x), ig.system.getDrawPos(targetY + this.pivot.y));
                ig.system.context.rotate(this.angle);
                this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y);
                ig.system.context.restore();
            }
            if (this.alpha != 1) {
                ig.system.context.globalAlpha = 1;
            }
        }
    });
});

// lib/impact/entity.js
ig.baked = true;
ig.module('impact.entity').requires('impact.animation', 'impact.impact').defines(function () {
    "use strict";
    ig.Entity = ig.Class.extend({
        id: 0,
        settings: {},
        size: {
            x: 16,
            y: 16
        },
        offset: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        last: {
            x: 0,
            y: 0
        },
        vel: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 100,
            y: 100
        },
        zIndex: 0,
        gravityFactor: 1,
        standing: false,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: false,
        slopeStanding: {
            min: (44).toRad(),
            max: (136).toRad()
        },
        init: function (x, y, settings) {
            this.id = ++ig.Entity._lastId;
            this.pos.x = this.last.x = x;
            this.pos.y = this.last.y = y;
            ig.merge(this, settings);
        },
        reset: function (x, y, settings) {
            var proto = this.constructor.prototype;
            this.pos.x = x;
            this.pos.y = y;
            this.last.x = x;
            this.last.y = y;
            this.vel.x = proto.vel.x;
            this.vel.y = proto.vel.y;
            this.accel.x = proto.accel.x;
            this.accel.y = proto.accel.y;
            this.health = proto.health;
            this._killed = proto._killed;
            this.standing = proto.standing;
            this.type = proto.type;
            this.checkAgainst = proto.checkAgainst;
            this.collides = proto.collides;
            ig.merge(this, settings);
        },
        addAnim: function (name, frameTime, sequence, stop) {
            if (!this.animSheet) {
                throw ('No animSheet to add the animation ' + name + ' to.');
            }
            var a = new ig.Animation(this.animSheet, frameTime, sequence, stop);
            this.anims[name] = a;
            if (!this.currentAnim) {
                this.currentAnim = a;
            }
            return a;
        },
        update: function () {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var mx = this.vel.x * ig.system.tick;
            var my = this.vel.y * ig.system.tick;
            var res = ig.game.collisionMap.trace(this.pos.x, this.pos.y, mx, my, this.size.x, this.size.y);
            this.handleMovementTrace(res);
            if (this.currentAnim) {
                this.currentAnim.update();
            }
        },
        getNewVelocity: function (vel, accel, friction, max) {
            if (accel) {
                return (vel + accel * ig.system.tick).limit(-max, max);
            } else if (friction) {
                var delta = friction * ig.system.tick;
                if (vel - delta > 0) {
                    return vel - delta;
                } else if (vel + delta < 0) {
                    return vel + delta;
                } else {
                    return 0;
                }
            }
            return vel.limit(-max, max);
        },
        handleMovementTrace: function (res) {
            this.standing = false;
            if (res.collision.y) {
                if (this.bounciness > 0 && Math.abs(this.vel.y) > this.minBounceVelocity) {
                    this.vel.y *= -this.bounciness;
                } else {
                    if (this.vel.y > 0) {
                        this.standing = true;
                    }
                    this.vel.y = 0;
                }
            }
            if (res.collision.x) {
                if (this.bounciness > 0 && Math.abs(this.vel.x) > this.minBounceVelocity) {
                    this.vel.x *= -this.bounciness;
                } else {
                    this.vel.x = 0;
                }
            }
            if (res.collision.slope) {
                var s = res.collision.slope;
                if (this.bounciness > 0) {
                    var proj = this.vel.x * s.nx + this.vel.y * s.ny;
                    this.vel.x = (this.vel.x - s.nx * proj * 2) * this.bounciness;
                    this.vel.y = (this.vel.y - s.ny * proj * 2) * this.bounciness;
                } else {
                    var lengthSquared = s.x * s.x + s.y * s.y;
                    var dot = (this.vel.x * s.x + this.vel.y * s.y) / lengthSquared;
                    this.vel.x = s.x * dot;
                    this.vel.y = s.y * dot;
                    var angle = Math.atan2(s.x, s.y);
                    if (angle > this.slopeStanding.min && angle < this.slopeStanding.max) {
                        this.standing = true;
                    }
                }
            }
            this.pos = res.pos;
        },
        draw: function () {
            if (this.currentAnim) {
                this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y);
            }
        },
        kill: function () {
            ig.game.removeEntity(this);
        },
        receiveDamage: function (amount, from) {
            this.health -= amount;
            if (this.health <= 0) {
                this.kill();
            }
        },
        touches: function (other) {
            return !(this.pos.x >= other.pos.x + other.size.x || this.pos.x + this.size.x <= other.pos.x || this.pos.y >= other.pos.y + other.size.y || this.pos.y + this.size.y <= other.pos.y);
        },
        distanceTo: function (other) {
            var xd = (this.pos.x + this.size.x / 2) - (other.pos.x + other.size.x / 2);
            var yd = (this.pos.y + this.size.y / 2) - (other.pos.y + other.size.y / 2);
            return Math.sqrt(xd * xd + yd * yd);
        },
        angleTo: function (other) {
            return Math.atan2((other.pos.y + other.size.y / 2) - (this.pos.y + this.size.y / 2), (other.pos.x + other.size.x / 2) - (this.pos.x + this.size.x / 2));
        },
        check: function (other) {},
        collideWith: function (other, axis) {},
        ready: function () {},
        erase: function () {}
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = {
        NEVER: 0,
        LITE: 1,
        PASSIVE: 2,
        ACTIVE: 4,
        FIXED: 8
    };
    ig.Entity.TYPE = {
        NONE: 0,
        A: 1,
        B: 2,
        BOTH: 3
    };
    ig.Entity.checkPair = function (a, b) {
        if (a.checkAgainst & b.type) {
            a.check(b);
        }
        if (b.checkAgainst & a.type) {
            b.check(a);
        }
        if (a.collides && b.collides && a.collides + b.collides > ig.Entity.COLLIDES.ACTIVE) {
            ig.Entity.solveCollision(a, b);
        }
    };
    ig.Entity.solveCollision = function (a, b) {
        var weak = null;
        if (a.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) {
            weak = a;
        } else if (b.collides == ig.Entity.COLLIDES.LITE || a.collides == ig.Entity.COLLIDES.FIXED) {
            weak = b;
        }
        if (a.last.x + a.size.x > b.last.x && a.last.x < b.last.x + b.size.x) {
            if (a.last.y < b.last.y) {
                ig.Entity.seperateOnYAxis(a, b, weak);
            } else {
                ig.Entity.seperateOnYAxis(b, a, weak);
            }
            a.collideWith(b, 'y');
            b.collideWith(a, 'y');
        } else if (a.last.y + a.size.y > b.last.y && a.last.y < b.last.y + b.size.y) {
            if (a.last.x < b.last.x) {
                ig.Entity.seperateOnXAxis(a, b, weak);
            } else {
                ig.Entity.seperateOnXAxis(b, a, weak);
            }
            a.collideWith(b, 'x');
            b.collideWith(a, 'x');
        }
    };
    ig.Entity.seperateOnXAxis = function (left, right, weak) {
        var nudge = (left.pos.x + left.size.x - right.pos.x);
        if (weak) {
            var strong = left === weak ? right : left;
            weak.vel.x = -weak.vel.x * weak.bounciness + strong.vel.x;
            var resWeak = ig.game.collisionMap.trace(weak.pos.x, weak.pos.y, weak == left ? -nudge : nudge, 0, weak.size.x, weak.size.y);
            weak.pos.x = resWeak.pos.x;
        } else {
            var v2 = (left.vel.x - right.vel.x) / 2;
            left.vel.x = -v2;
            right.vel.x = v2;
            var resLeft = ig.game.collisionMap.trace(left.pos.x, left.pos.y, -nudge / 2, 0, left.size.x, left.size.y);
            left.pos.x = Math.floor(resLeft.pos.x);
            var resRight = ig.game.collisionMap.trace(right.pos.x, right.pos.y, nudge / 2, 0, right.size.x, right.size.y);
            right.pos.x = Math.ceil(resRight.pos.x);
        }
    };
    ig.Entity.seperateOnYAxis = function (top, bottom, weak) {
        var nudge = (top.pos.y + top.size.y - bottom.pos.y);
        if (weak) {
            var strong = top === weak ? bottom : top;
            weak.vel.y = -weak.vel.y * weak.bounciness + strong.vel.y;
            var nudgeX = 0;
            if (weak == top && Math.abs(weak.vel.y - strong.vel.y) < weak.minBounceVelocity) {
                weak.standing = true;
                nudgeX = strong.vel.x * ig.system.tick;
            }
            var resWeak = ig.game.collisionMap.trace(weak.pos.x, weak.pos.y, nudgeX, weak == top ? -nudge : nudge, weak.size.x, weak.size.y);
            weak.pos.y = resWeak.pos.y;
            weak.pos.x = resWeak.pos.x;
        } else if (ig.game.gravity && (bottom.standing || top.vel.y > 0)) {
            var resTop = ig.game.collisionMap.trace(top.pos.x, top.pos.y, 0, -(top.pos.y + top.size.y - bottom.pos.y), top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            if (top.bounciness > 0 && top.vel.y > top.minBounceVelocity) {
                top.vel.y *= -top.bounciness;
            } else {
                top.standing = true;
                top.vel.y = 0;
            }
        } else {
            var v2 = (top.vel.y - bottom.vel.y) / 2;
            top.vel.y = -v2;
            bottom.vel.y = v2;
            var nudgeX = bottom.vel.x * ig.system.tick;
            var resTop = ig.game.collisionMap.trace(top.pos.x, top.pos.y, nudgeX, -nudge / 2, top.size.x, top.size.y);
            top.pos.y = resTop.pos.y;
            var resBottom = ig.game.collisionMap.trace(bottom.pos.x, bottom.pos.y, 0, nudge / 2, bottom.size.x, bottom.size.y);
            bottom.pos.y = resBottom.pos.y;
        }
    };
});

// lib/impact/map.js
ig.baked = true;
ig.module('impact.map').defines(function () {
    "use strict";
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function (tilesize, data) {
            this.tilesize = tilesize;
            this.data = data;
            this.height = data.length;
            this.width = data[0].length;
            this.pxWidth = this.width * this.tilesize;
            this.pxHeight = this.height * this.tilesize;
        },
        getTile: function (x, y) {
            var tx = Math.floor(x / this.tilesize);
            var ty = Math.floor(y / this.tilesize);
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                return this.data[ty][tx];
            } else {
                return 0;
            }
        },
        setTile: function (x, y, tile) {
            var tx = Math.floor(x / this.tilesize);
            var ty = Math.floor(y / this.tilesize);
            if ((tx >= 0 && tx < this.width) && (ty >= 0 && ty < this.height)) {
                this.data[ty][tx] = tile;
            }
        }
    });
});

// lib/impact/collision-map.js
ig.baked = true;
ig.module('impact.collision-map').requires('impact.map').defines(function () {
    "use strict";
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function (tilesize, data, tiledef) {
            this.parent(tilesize, data);
            this.tiledef = tiledef || ig.CollisionMap.defaultTileDef;
            for (var t in this.tiledef) {
                if (t | 0 > this.lastSlope) {
                    this.lastSlope = t | 0;
                }
            }
        },
        trace: function (x, y, vx, vy, objectWidth, objectHeight) {
            var res = {
                collision: {
                    x: false,
                    y: false,
                    slope: false
                },
                pos: {
                    x: x,
                    y: y
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
            var steps = Math.ceil(Math.max(Math.abs(vx), Math.abs(vy)) / this.tilesize);
            if (steps > 1) {
                var sx = vx / steps;
                var sy = vy / steps;
                for (var i = 0; i < steps && (sx || sy); i++) {
                    this._traceStep(res, x, y, sx, sy, objectWidth, objectHeight, vx, vy, i);
                    x = res.pos.x;
                    y = res.pos.y;
                    if (res.collision.x) {
                        sx = 0;
                        vx = 0;
                    }
                    if (res.collision.y) {
                        sy = 0;
                        vy = 0;
                    }
                    if (res.collision.slope) {
                        break;
                    }
                }
            } else {
                this._traceStep(res, x, y, vx, vy, objectWidth, objectHeight, vx, vy, 0);
            }
            return res;
        },
        _traceStep: function (res, x, y, vx, vy, width, height, rvx, rvy, step) {
            res.pos.x += vx;
            res.pos.y += vy;
            var t = 0;
            if (vx) {
                var pxOffsetX = (vx > 0 ? width : 0);
                var tileOffsetX = (vx < 0 ? this.tilesize : 0);
                var firstTileY = Math.max(Math.floor(y / this.tilesize), 0);
                var lastTileY = Math.min(Math.ceil((y + height) / this.tilesize), this.height);
                var tileX = Math.floor((res.pos.x + pxOffsetX) / this.tilesize);
                var prevTileX = Math.floor((x + pxOffsetX) / this.tilesize);
                if (step > 0 || tileX == prevTileX || prevTileX < 0 || prevTileX >= this.width) {
                    prevTileX = -1;
                }
                if (tileX >= 0 && tileX < this.width) {
                    for (var tileY = firstTileY; tileY < lastTileY; tileY++) {
                        if (prevTileX != -1) {
                            t = this.data[tileY][prevTileX];
                            if (t > 1 && t <= this.lastSlope && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, prevTileX, tileY)) {
                                break;
                            }
                        }
                        t = this.data[tileY][tileX];
                        if (t == 1 || t > this.lastSlope || (t > 1 && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, tileY))) {
                            if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                                break;
                            }
                            res.collision.x = true;
                            res.tile.x = t;
                            x = res.pos.x = tileX * this.tilesize - pxOffsetX + tileOffsetX;
                            rvx = 0;
                            break;
                        }
                    }
                }
            }
            if (vy) {
                var pxOffsetY = (vy > 0 ? height : 0);
                var tileOffsetY = (vy < 0 ? this.tilesize : 0);
                var firstTileX = Math.max(Math.floor(res.pos.x / this.tilesize), 0);
                var lastTileX = Math.min(Math.ceil((res.pos.x + width) / this.tilesize), this.width);
                var tileY = Math.floor((res.pos.y + pxOffsetY) / this.tilesize);
                var prevTileY = Math.floor((y + pxOffsetY) / this.tilesize);
                if (step > 0 || tileY == prevTileY || prevTileY < 0 || prevTileY >= this.height) {
                    prevTileY = -1;
                }
                if (tileY >= 0 && tileY < this.height) {
                    for (var tileX = firstTileX; tileX < lastTileX; tileX++) {
                        if (prevTileY != -1) {
                            t = this.data[prevTileY][tileX];
                            if (t > 1 && t <= this.lastSlope && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, prevTileY)) {
                                break;
                            }
                        }
                        t = this.data[tileY][tileX];
                        if (t == 1 || t > this.lastSlope || (t > 1 && this._checkTileDef(res, t, x, y, rvx, rvy, width, height, tileX, tileY))) {
                            if (t > 1 && t <= this.lastSlope && res.collision.slope) {
                                break;
                            }
                            res.collision.y = true;
                            res.tile.y = t;
                            res.pos.y = tileY * this.tilesize - pxOffsetY + tileOffsetY;
                            break;
                        }
                    }
                }
            }
        },
        _checkTileDef: function (res, t, x, y, vx, vy, width, height, tileX, tileY) {
            var def = this.tiledef[t];
            if (!def) {
                return false;
            }
            var lx = (tileX + def[0]) * this.tilesize,
                ly = (tileY + def[1]) * this.tilesize,
                lvx = (def[2] - def[0]) * this.tilesize,
                lvy = (def[3] - def[1]) * this.tilesize,
                solid = def[4];
            var tx = x + vx + (lvy < 0 ? width : 0) - lx,
                ty = y + vy + (lvx > 0 ? height : 0) - ly;
            if (lvx * ty - lvy * tx > 0) {
                if (vx * -lvy + vy * lvx < 0) {
                    return solid;
                }
                var length = Math.sqrt(lvx * lvx + lvy * lvy);
                var nx = lvy / length,
                    ny = -lvx / length;
                var proj = tx * nx + ty * ny;
                var px = nx * proj,
                    py = ny * proj;
                if (px * px + py * py >= vx * vx + vy * vy) {
                    return solid || (lvx * (ty - vy) - lvy * (tx - vx) < 0.5);
                }
                res.pos.x = x + vx - px;
                res.pos.y = y + vy - py;
                res.collision.slope = {
                    x: lvx,
                    y: lvy,
                    nx: nx,
                    ny: ny
                };
                return true;
            }
            return false;
        }
    });
    var H = 1 / 2,
        N = 1 / 3,
        M = 2 / 3,
        SOLID = true,
        NON_SOLID = false;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, M, SOLID],
        6: [0, M, 1, N, SOLID],
        7: [0, N, 1, 0, SOLID],
        3: [0, 1, 1, H, SOLID],
        4: [0, H, 1, 0, SOLID],
        2: [0, 1, 1, 0, SOLID],
        10: [H, 1, 1, 0, SOLID],
        21: [0, 1, H, 0, SOLID],
        32: [M, 1, 1, 0, SOLID],
        43: [N, 1, M, 0, SOLID],
        54: [0, 1, N, 0, SOLID],
        27: [0, 0, 1, N, SOLID],
        28: [0, N, 1, M, SOLID],
        29: [0, M, 1, 1, SOLID],
        25: [0, 0, 1, H, SOLID],
        26: [0, H, 1, 1, SOLID],
        24: [0, 0, 1, 1, SOLID],
        11: [0, 0, H, 1, SOLID],
        22: [H, 0, 1, 1, SOLID],
        33: [0, 0, N, 1, SOLID],
        44: [N, 0, M, 1, SOLID],
        55: [M, 0, 1, 1, SOLID],
        16: [1, N, 0, 0, SOLID],
        17: [1, M, 0, N, SOLID],
        18: [1, 1, 0, M, SOLID],
        14: [1, H, 0, 0, SOLID],
        15: [1, 1, 0, H, SOLID],
        13: [1, 1, 0, 0, SOLID],
        8: [H, 1, 0, 0, SOLID],
        19: [1, 1, H, 0, SOLID],
        30: [N, 1, 0, 0, SOLID],
        41: [M, 1, N, 0, SOLID],
        52: [1, 1, M, 0, SOLID],
        38: [1, M, 0, 1, SOLID],
        39: [1, N, 0, M, SOLID],
        40: [1, 0, 0, N, SOLID],
        36: [1, H, 0, 1, SOLID],
        37: [1, 0, 0, H, SOLID],
        35: [1, 0, 0, 1, SOLID],
        9: [1, 0, H, 1, SOLID],
        20: [H, 0, 0, 1, SOLID],
        31: [1, 0, M, 1, SOLID],
        42: [M, 0, N, 1, SOLID],
        53: [N, 0, 0, 1, SOLID],
        12: [0, 0, 1, 0, NON_SOLID],
        23: [1, 1, 0, 1, NON_SOLID],
        34: [1, 0, 1, 1, NON_SOLID],
        45: [0, 1, 0, 0, NON_SOLID]
    };
    ig.CollisionMap.staticNoCollision = {
        trace: function (x, y, vx, vy) {
            return {
                collision: {
                    x: false,
                    y: false,
                    slope: false
                },
                pos: {
                    x: x + vx,
                    y: y + vy
                },
                tile: {
                    x: 0,
                    y: 0
                }
            };
        }
    };
});

// lib/impact/background-map.js
ig.baked = true;
ig.module('impact.background-map').requires('impact.map', 'impact.image').defines(function () {
    "use strict";
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: false,
        tilesetName: '',
        foreground: false,
        enabled: true,
        preRender: false,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: false,
        anims: {},
        init: function (tilesize, data, tileset) {
            this.parent(tilesize, data);
            this.setTileset(tileset);
        },
        setTileset: function (tileset) {
            this.tilesetName = tileset instanceof ig.Image ? tileset.path : tileset;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null;
        },
        setScreenPos: function (x, y) {
            this.scroll.x = x / this.distance;
            this.scroll.y = y / this.distance;
        },
        preRenderMapToChunks: function () {
            var totalWidth = this.width * this.tilesize * ig.system.scale,
                totalHeight = this.height * this.tilesize * ig.system.scale;
            this.chunkSize = Math.min(Math.max(totalWidth, totalHeight), this.chunkSize);
            var chunkCols = Math.ceil(totalWidth / this.chunkSize),
                chunkRows = Math.ceil(totalHeight / this.chunkSize);
            this.preRenderedChunks = [];
            for (var y = 0; y < chunkRows; y++) {
                this.preRenderedChunks[y] = [];
                for (var x = 0; x < chunkCols; x++) {
                    var chunkWidth = (x == chunkCols - 1) ? totalWidth - x * this.chunkSize : this.chunkSize;
                    var chunkHeight = (y == chunkRows - 1) ? totalHeight - y * this.chunkSize : this.chunkSize;
                    this.preRenderedChunks[y][x] = this.preRenderChunk(x, y, chunkWidth, chunkHeight);
                }
            }
        },
        preRenderChunk: function (cx, cy, w, h) {
            var tw = w / this.tilesize / ig.system.scale + 1,
                th = h / this.tilesize / ig.system.scale + 1;
            var nx = (cx * this.chunkSize / ig.system.scale) % this.tilesize,
                ny = (cy * this.chunkSize / ig.system.scale) % this.tilesize;
            var tx = Math.floor(cx * this.chunkSize / this.tilesize / ig.system.scale),
                ty = Math.floor(cy * this.chunkSize / this.tilesize / ig.system.scale);
            var chunk = ig.$new('canvas');
            chunk.width = w;
            chunk.height = h;
            chunk.retinaResolutionEnabled = false;
            var chunkContext = chunk.getContext('2d');
            ig.System.scaleMode(chunk, chunkContext);
            var screenContext = ig.system.context;
            ig.system.context = chunkContext;
            for (var x = 0; x < tw; x++) {
                for (var y = 0; y < th; y++) {
                    if (x + tx < this.width && y + ty < this.height) {
                        var tile = this.data[y + ty][x + tx];
                        if (tile) {
                            this.tiles.drawTile(x * this.tilesize - nx, y * this.tilesize - ny, tile - 1, this.tilesize);
                        }
                    }
                }
            }
            ig.system.context = screenContext;
            return chunk;
        },
        draw: function () {
            if (!this.tiles.loaded || !this.enabled) {
                return;
            }
            if (this.preRender) {
                this.drawPreRendered();
            } else {
                this.drawTiled();
            }
        },
        drawPreRendered: function () {
            if (!this.preRenderedChunks) {
                this.preRenderMapToChunks();
            }
            var dx = ig.system.getDrawPos(this.scroll.x),
                dy = ig.system.getDrawPos(this.scroll.y);
            if (this.repeat) {
                var w = this.width * this.tilesize * ig.system.scale;
                dx = (dx % w + w) % w;
                var h = this.height * this.tilesize * ig.system.scale;
                dy = (dy % h + h) % h;
            }
            var minChunkX = Math.max(Math.floor(dx / this.chunkSize), 0),
                minChunkY = Math.max(Math.floor(dy / this.chunkSize), 0),
                maxChunkX = Math.ceil((dx + ig.system.realWidth) / this.chunkSize),
                maxChunkY = Math.ceil((dy + ig.system.realHeight) / this.chunkSize),
                maxRealChunkX = this.preRenderedChunks[0].length,
                maxRealChunkY = this.preRenderedChunks.length;
            if (!this.repeat) {
                maxChunkX = Math.min(maxChunkX, maxRealChunkX);
                maxChunkY = Math.min(maxChunkY, maxRealChunkY);
            }
            var nudgeY = 0;
            for (var cy = minChunkY; cy < maxChunkY; cy++) {
                var nudgeX = 0;
                for (var cx = minChunkX; cx < maxChunkX; cx++) {
                    var chunk = this.preRenderedChunks[cy % maxRealChunkY][cx % maxRealChunkX];
                    var x = -dx + cx * this.chunkSize - nudgeX;
                    var y = -dy + cy * this.chunkSize - nudgeY;
                    ig.system.context.drawImage(chunk, x, y);
                    ig.Image.drawCount++;
                    if (this.debugChunks) {
                        ig.system.context.strokeStyle = '#f0f';
                        ig.system.context.strokeRect(x, y, this.chunkSize, this.chunkSize);
                    }
                    if (this.repeat && chunk.width < this.chunkSize && x + chunk.width < ig.system.realWidth) {
                        nudgeX += this.chunkSize - chunk.width;
                        maxChunkX++;
                    }
                }
                if (this.repeat && chunk.height < this.chunkSize && y + chunk.height < ig.system.realHeight) {
                    nudgeY += this.chunkSize - chunk.height;
                    maxChunkY++;
                }
            }
        },
        drawTiled: function () {
            var tile = 0,
                anim = null,
                tileOffsetX = (this.scroll.x / this.tilesize).toInt(),
                tileOffsetY = (this.scroll.y / this.tilesize).toInt(),
                pxOffsetX = this.scroll.x % this.tilesize,
                pxOffsetY = this.scroll.y % this.tilesize,
                pxMinX = -pxOffsetX - this.tilesize,
                pxMinY = -pxOffsetY - this.tilesize,
                pxMaxX = ig.system.width + this.tilesize - pxOffsetX,
                pxMaxY = ig.system.height + this.tilesize - pxOffsetY;
            for (var mapY = -1, pxY = pxMinY; pxY < pxMaxY; mapY++, pxY += this.tilesize) {
                var tileY = mapY + tileOffsetY;
                if (tileY >= this.height || tileY < 0) {
                    if (!this.repeat) {
                        continue;
                    }
                    tileY = (tileY % this.height + this.height) % this.height;
                }
                for (var mapX = -1, pxX = pxMinX; pxX < pxMaxX; mapX++, pxX += this.tilesize) {
                    var tileX = mapX + tileOffsetX;
                    if (tileX >= this.width || tileX < 0) {
                        if (!this.repeat) {
                            continue;
                        }
                        tileX = (tileX % this.width + this.width) % this.width;
                    }
                    if ((tile = this.data[tileY][tileX])) {
                        if ((anim = this.anims[tile - 1])) {
                            anim.draw(pxX, pxY);
                        } else {
                            this.tiles.drawTile(pxX, pxY, tile - 1, this.tilesize);
                        }
                    }
                }
            }
        }
    });
});

// lib/impact/game.js
ig.baked = true;
ig.module('impact.game').requires('impact.impact', 'impact.entity', 'impact.collision-map', 'impact.background-map').defines(function () {
    "use strict";
    ig.Game = ig.Class.extend({
        clearColor: '#000000',
        gravity: 0,
        screen: {
            x: 0,
            y: 0
        },
        _rscreen: {
            x: 0,
            y: 0
        },
        entities: [],
        namedEntities: {},
        collisionMap: ig.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        autoSort: false,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: false,
        staticInstantiate: function () {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null;
        },
        loadLevel: function (data) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var i = 0; i < data.entities.length; i++) {
                var ent = data.entities[i];
                this.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
            }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (var i = 0; i < data.layer.length; i++) {
                var ld = data.layer[i];
                if (ld.name == 'collision') {
                    this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
                } else {
                    var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
                    newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                    newMap.repeat = ld.repeat;
                    newMap.distance = ld.distance;
                    newMap.foreground = !!ld.foreground;
                    newMap.preRender = !!ld.preRender;
                    newMap.name = ld.name;
                    this.backgroundMaps.push(newMap);
                }
            }
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].ready();
            }
        },
        loadLevelDeferred: function (data) {
            this._levelToLoad = data;
        },
        getMapByName: function (name) {
            if (name == 'collision') {
                return this.collisionMap;
            }
            for (var i = 0; i < this.backgroundMaps.length; i++) {
                if (this.backgroundMaps[i].name == name) {
                    return this.backgroundMaps[i];
                }
            }
            return null;
        },
        getEntityByName: function (name) {
            return this.namedEntities[name];
        },
        getEntitiesByType: function (type) {
            var entityClass = typeof (type) === 'string' ? ig.global[type] : type;
            var a = [];
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (ent instanceof entityClass && !ent._killed) {
                    a.push(ent);
                }
            }
            return a;
        },
        spawnEntity: function (type, x, y, settings) {
            var entityClass = typeof (type) === 'string' ? ig.global[type] : type;
            if (!entityClass) {
                throw ("Can't spawn entity of type " + type);
            }
            var ent = new(entityClass)(x, y, settings || {});
            this.entities.push(ent);
            if (ent.name) {
                this.namedEntities[ent.name] = ent;
            }
            return ent;
        },
        sortEntities: function () {
            this.entities.sort(this.sortBy);
        },
        sortEntitiesDeferred: function () {
            this._doSortEntities = true;
        },
        removeEntity: function (ent) {
            if (ent.name) {
                delete this.namedEntities[ent.name];
            }
            ent._killed = true;
            ent.type = ig.Entity.TYPE.NONE;
            ent.checkAgainst = ig.Entity.TYPE.NONE;
            ent.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(ent);
        },
        run: function () {
            this.update();
            this.draw();
        },
        update: function () {
            if (this._levelToLoad) {
                this.loadLevel(this._levelToLoad);
                this._levelToLoad = null;
            }
            this.updateEntities();
            this.checkEntities();
            for (var i = 0; i < this._deferredKill.length; i++) {
                try {
                    this._deferredKill[i].erase();
                } catch (e) {
                    this._deferredKill[i].remove();
                }
                this.entities.erase(this._deferredKill[i]);
            }
            this._deferredKill = [];
            if (this._doSortEntities || this.autoSort) {
                this.sortEntities();
                this._doSortEntities = false;
            }
            for (var tileset in this.backgroundAnims) {
                var anims = this.backgroundAnims[tileset];
                for (var a in anims) {
                    anims[a].update();
                }
            }
        },
        updateEntities: function () {
            for (var i = 0; i < this.entities.length; i++) {
                var ent = this.entities[i];
                if (!ent._killed) {
                    ent.update();
                }
            }
        },
        draw: function () {
            if (this.clearColor) {
                ig.system.clear(this.clearColor);
            }
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            this.drawEntities();
            var mapIndex;
            for (mapIndex = 0; mapIndex < this.backgroundMaps.length; mapIndex++) {
                var map = this.backgroundMaps[mapIndex];
                if (map.name && map.name == "parallax") {
                    if (ig.game && ig.game.parallax) {
                        ig.game.parallax.draw();
                    }
                }
                if (map.foreground) {
                    break;
                }
                map.setScreenPos(this.screen.x, this.screen.y);
                map.draw();
            }
            for (mapIndex; mapIndex < this.backgroundMaps.length; mapIndex++) {
                var map = this.backgroundMaps[mapIndex];
                map.setScreenPos(this.screen.x, this.screen.y);
                map.draw();
            }
        },
        drawEntities: function () {
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].draw();
            }
        },
        checkEntities: function () {
            var hash = {};
            for (var e = 0; e < this.entities.length; e++) {
                var entity = this.entities[e];
                if (entity.type == ig.Entity.TYPE.NONE && entity.checkAgainst == ig.Entity.TYPE.NONE && entity.collides == ig.Entity.COLLIDES.NEVER) {
                    continue;
                }
                var checked = {},
                    xmin = Math.floor(entity.pos.x / this.cellSize),
                    ymin = Math.floor(entity.pos.y / this.cellSize),
                    xmax = Math.floor((entity.pos.x + entity.size.x) / this.cellSize) + 1,
                    ymax = Math.floor((entity.pos.y + entity.size.y) / this.cellSize) + 1;
                for (var x = xmin; x < xmax; x++) {
                    for (var y = ymin; y < ymax; y++) {
                        if (!hash[x]) {
                            hash[x] = {};
                            hash[x][y] = [entity];
                        } else if (!hash[x][y]) {
                            hash[x][y] = [entity];
                        } else {
                            var cell = hash[x][y];
                            for (var c = 0; c < cell.length; c++) {
                                if (entity.touches(cell[c]) && !checked[cell[c].id]) {
                                    checked[cell[c].id] = true;
                                    ig.Entity.checkPair(entity, cell[c]);
                                }
                            }
                            cell.push(entity);
                        }
                    }
                }
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function (a, b) {
            return a.zIndex - b.zIndex;
        },
        POS_X: function (a, b) {
            return (a.pos.x + a.size.x) - (b.pos.x + b.size.x);
        },
        POS_Y: function (a, b) {
            return (a.pos.y + a.size.y) - (b.pos.y + b.size.y);
        }
    };
});﻿

// lib/plugins/impact-splash-loader.js
ig.baked = true;
ig.module('plugins.impact-splash-loader').requires('impact.loader').defines(function () {
    ig.ImpactSplashLoader = ig.Loader.extend({
        endTime: 0,
        fadeToWhiteTime: 200,
        fadeToGameTime: 800,
        logoWidth: 340,
        logoHeight: 120,
        end: function () {
            this.parent();
            this.endTime = Date.now();
            ig.system.setDelegate(this);
        },
        run: function () {
            var t = Date.now() - this.endTime;
            var alpha = 1;
            if (t < this.fadeToWhiteTime) {
                this.draw();
                alpha = t.map(0, this.fadeToWhiteTime, 0, 1);
            } else if (t < this.fadeToGameTime) {
                ig.game.run();
                alpha = t.map(this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
            } else {
                ig.system.setDelegate(ig.game);
                return;
            }
            ig.system.context.fillStyle = 'rgba(0,0,0,' + alpha + ')';
            ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
        },
        draw: function () {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            var ctx = ig.system.context;
            var w = ig.system.realWidth;
            var h = ig.system.realHeight;
            var scale = w / this.logoWidth / 3;
            var center = (w - this.logoWidth * scale) / 2;
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.fillRect(0, 0, w, h);
            ctx.translate(center, h / 2.5);
            ctx.scale(scale, scale);
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'rgb(255,255,255)';
            ctx.strokeRect(0, ig.system.realHeight / 2, 480, 20);
            ctx.fillStyle = 'rgb(255,255,255)';
            ctx.fillRect(0, ig.system.realHeight / 2, 100 * this._drawStatus, 10);
        }
    });
});﻿

// lib/plugins/screen-fader.js
ig.baked = true;
ig.module('plugins.screen-fader').requires('impact.timer', 'impact.animation').defines(function () {
    ig.ScreenFader = ig.Class.extend({
        defaultOptions: {
            color: {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            },
            fade: 'in',
            speed: 1,
            screenWidth: 0,
            screenHeight: 0,
            waitUntilLoaded: true,
            visible: true
        },
        init: function (options) {
            this._setOptions(options);
            var isFadingIn = this.options.fade != 'out';
            this._alpha = isFadingIn ? 0 : 1;
            this._alphaChange = isFadingIn ? 1 : -1;
            if (this.options.tileImagePath) {
                if (isNaN(this.options.tileWidth)) {
                    throw new Error("ScreenFader option for tileWidth is invalid");
                } else if (isNaN(this.options.tileHeight)) {
                    throw new Error("ScreenFader option for tileHeight is invalid");
                }
                this._sheet = new ig.AnimationSheet(this.options.tileImagePath, this.options.tileWidth, this.options.tileHeight);
                this._anim = new ig.Animation(this._sheet, 1.0, [0]);
                this._anim.alpha = this._alpha;
            }
            if (!isNaN(this.options.delayBefore)) {
                var delayTime = this.options.delayBefore <= 0 ? 0 : this.options.delayBefore;
                if (delayTime > 0) {
                    this.timerDelayBefore = new ig.Timer(delayTime);
                }
            }
        },
        draw: function () {
            if (this.timerDelayAfter && this.timerDelayAfter.delta() > 0) {
                delete this.timerDelayAfter;
                this._callUserCallback();
            }
            if (this.timerDelayBefore) {
                if (this.timerDelayBefore.delta() < 0) {
                    return;
                } else {
                    delete this.timerDelayBefore;
                }
            }
            if (!this.options.visible) {
                return;
            }
            if (!this.isFinished && (!this._sheet || (this._sheet.image.loaded || !this.options.waitUntilLoaded))) {
                this._fadeAlphaValue();
            }
            if (this._alpha <= 0) {
                return;
            }
            if (this._anim) {
                this.drawImageTiledOnScreen();
            } else {
                this.drawColorOnScreen();
            }
        },
        drawImageTiledOnScreen: function () {
            var tileX = 0,
                tileY = 0,
                totalWidth = this.options.screenWidth,
                totalHeight = this.options.screenHeight;
            var tileWidth = this.options.tileWidth,
                tileHeight = this.options.tileHeight;
            while (tileY < totalHeight) {
                tileX = 0;
                while (tileX < totalWidth) {
                    this._anim.draw(tileX, tileY);
                    tileX += tileWidth;
                }
                tileY += tileHeight;
            }
        },
        drawColorOnScreen: function () {
            ig.system.clear(this.getColorCssValue());
        },
        getColorCssValue: function (rgbaObject) {
            var color = rgbaObject || this.options.color;
            var a = ((typeof color.a != 'undefined') ? color.a : 1) * this._alpha;
            if (a < 0) {
                a = 0;
            } else if (a > 1) {
                a = 1;
            }
            return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + a + ')';
        },
        finish: function () {
            if (this.isFinished) {
                return;
            }
            if (this._alphaChange > 0) {
                this._alpha = 1;
            } else {
                this._alpha = 0;
            }
            if (this._anim) {
                this._anim.alpha = this._alpha;
            }
            this.isFinished = true;
            if (typeof this.options.callback == 'function') {
                var delayTime = isNaN(this.options.delayAfter) ? 0 : this.options.delayAfter;
                if (delayTime > 0) {
                    this.timerDelayAfter = new ig.Timer(delayTime);
                } else {
                    this._callUserCallback();
                }
            }
        },
        _callUserCallback: function () {
            this.options.callback.call(this.options.context || (ig.ScreenFader.globalGameIsContext ? ig.game : this));
        },
        _fadeAlphaValue: function () {
            this._alpha += (this._alphaChange * this.options.speed * ig.system.tick * ig.ScreenFader.globalSpeedFactor);
            if ((this._alphaChange > 0 && this._alpha >= 1) || (this._alphaChange < 0 && this._alpha <= 0)) {
                this.finish();
            }
            if (this._anim) {
                this._anim.alpha = this._alpha;
            }
        },
        _setOptions: function (userOptions) {
            this.options = ig.copy(this.defaultOptions);
            if (isNaN(this.options.screenWidth) || this.options.screenWidth <= 0) {
                this.options.screenWidth = ig.system.width;
            }
            if (isNaN(this.options.screenHeight) || this.options.screenHeight <= 0) {
                this.options.screenHeight = ig.system.height;
            }
            if (userOptions) {
                ig.merge(this.options, userOptions);
            }
        },
    });
    ig.ScreenFader.globalSpeedFactor = 2 / 3;
    ig.ScreenFader.globalGameIsContext = true;
});﻿


// lib/plugins/impact-infinite.js
ig.baked = true;
ig.module('plugins.impact-infinite').requires('impact.system', 'impact.game').defines(function () {
    ig.InfiniteLevel = ig.Class.extend({
        levels: null,
        start: null,
        init: function (levels, start) {
            this.levels = levels;
            this.start = start;
            var allLevels = this.levels;
            if (this.start != null) {
                allLevels = allLevels.concat([this.start]);
            }
            var layerNames = [];
            for (var i = 0; i < allLevels.length; i++) {
                var level = allLevels[i];
                for (var j = 0; j < level.layer.length; j++) {
                    var layer = level.layer[j];
                    if (layerNames.indexOf(layer.name) === -1) {
                        layerNames.push(layer.name);
                    }
                }
            }
            var LevelGameData = JSON.parse(JSON.stringify(this.start));
            ig.game.loadLevel(LevelGameData);
            for (var i = 0; i < layerNames.length; i++) {
                var map = this.getMap(layerNames[i]);
                if (map === false) {
                    var existingMap = ig.game.backgroundMaps[0],
                        data = this.getEmptyMapData(existingMap.height, existingMap.width);
                    var backgroundMap = new ig.BackgroundMap(existingMap.tilesize, data, existingMap.tilesetName);
                    backgroundMap.anims = {};
                    backgroundMap.repeat = false;
                    backgroundMap.distance = existingMap.distance;
                    backgroundMap.foreground = false;
                    backgroundMap.preRender = false;
                    backgroundMap.name = layerNames[i];
                    ig.game.backgroundMaps.push(backgroundMap);
                }
            }
            ig.game.collisionMap.name = 'collision';
        },
        getMap: function (layerName) {
            for (var i = 0; i < ig.game.backgroundMaps.length; i++) {
                if (layerName === ig.game.backgroundMaps[i].name) {
                    return ig.game.backgroundMaps[i];
                } else if (layerName === 'collision') {
                    return ig.game.collisionMap;
                }
            }
            return false;
        },
        getEmptyMapData: function (height, width) {
            var data = [];
            for (var j = 0; j < height; j++) {
                var row = [];
                for (var k = 0; k < width; k++) {
                    row.push(0);
                }
                data.push(row);
            }
            return data;
        },
        update: function () {
            if (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.game.screen.x <= ig.system.width) {
                var nextLevel = this.getNextLevel();
                for (var i = 0; i < nextLevel.entities.length; i++) {
                    var entity = nextLevel.entities[i];
                    if (entity.y > ig.game.screen.y && entity.y < ig.game.screen.y + ig.system.height * 2 || entity.type == "EntityJumper") {
                        ig.game.spawnEntity(entity.type, entity.x + (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize), entity.y, entity.settings);
                    }
                }
                for (var i = 0; i < ig.game.backgroundMaps.length; i++) {
                    this.extendMap(ig.game.backgroundMaps[i], nextLevel);
                }
                if (ig.game.collisionMap.data) {
                    this.extendMap(ig.game.collisionMap, nextLevel);
                }
            }
            if (ig.game.screen.x >= ig.game.backgroundMaps[0].tilesize) {
                for (var i = 0; i < ig.game.backgroundMaps.length; i++) {
                    var data = ig.game.backgroundMaps[i].data;
                    for (var j = 0; j < data.length; j++) {
                        data[j].shift();
                    }
                    ig.game.backgroundMaps[i].width--;
                }
                if (ig.game.collisionMap.data) {
                    for (var i = 0; i < ig.game.collisionMap.data.length; i++) {
                        ig.game.collisionMap.data[i].shift();
                    }
                    ig.game.collisionMap.width--;
                }
                for (var i = 0; i < ig.game.entities.length; i++) {
                    ig.game.entities[i].pos.x -= ig.game.backgroundMaps[0].tilesize;
                }
                ig.game.screen.x -= ig.game.backgroundMaps[0].tilesize;
            }
            for (var i = 0; i < ig.game.entities.length; i++) {
                var entity = ig.game.entities[i];
                if (entity.name != "butcher" && entity.name != "player" && entity.name != "parallax" && entity.subtype != 'bonus' && entity.name != "knife") {
                    if ((entity.pos.x + entity.size.x) - ig.game.screen.x < 0 || entity.pos.y > ig.game.screen.y + ig.system.height && (entity.pos.x + entity.size.x) < ig.game.screen.x) {
                        entity.kill();
                    }
                }
            }
        },
        getNextLevel: function () {
            var nextIdx = Math.floor(Math.random() * this.levels.length);
            return this.levels[nextIdx];
        },
        extendMap: function (map, level) {
            var layer = this.getLayer(map.name, level);
            if (!layer) {
                layer = {
                    data: this.getEmptyMapData(level.layer[0].data.length, level.layer[0].data[0].length),
                    width: level.layer[0].data[0].length
                };
            }
            var data = map.data;
            for (var j = 0; j < data.length; j++) {
                data[j].push.apply(data[j], layer.data[j]);
            }
            map.width += layer.width;
        },
        getLayer: function (layerName, level) {
            for (var i = 0; i < level.layer.length; i++) {
                if (layerName === level.layer[i].name) {
                    return level.layer[i];
                }
            }
            return false;
        }
    });
});

// lib/plugins/joncom/font-sugar/font.js
ig.baked = true;
ig.module('plugins.joncom.font-sugar.font').requires('impact.font').defines(function () {
    "use strict";
    ig.Font.inject({
        fontColor: null,
        borderColor: null,
        borderSize: 1,
        fillCorners: true,
        fontCanvas: null,
        borderCanvas: null,
        lineCanvas: null,
        reversionCanvas: null,
        alternateFont: null,
        staticInstantiate: function (path, settings) {
            if (typeof settings === 'object') ig.merge(this, settings);
            return this.parent(this._getNewPath(path));
        },
        init: function (path) {
            this.parent(this._getNewPath(path));
        },
        onload: function (event) {
            this.parent(event);
            if (this.widthMap[this.widthMap.length - 1] === 0) {
                this.widthMap.pop();
                this.indices.pop();
            }
            if (this.fontColor || (this.borderColor && this.borderSize >= 1)) {
                this._ensureDataIsCanvas();
            }
            if (this.fontColor) {
                var canvas = this.data;
                this._convertNonAlphaPixelsInCanvasToColor(canvas, this.fontColor);
            }
            if (this.borderColor && this.borderSize >= 1) {
                this.fontLayer = this._createFontLayer();
                this.borderLayer = this._createBorderLayer();
                this.lineLayer = this._createLineLayer();
                var canvas = ig.$new('canvas');
                canvas.width = this.borderLayer.data.width;
                canvas.height = this.borderLayer.data.height;
                var context = canvas.getContext('2d');
                context.drawImage(this.borderLayer.data, 0, 0);
                context.drawImage(this.lineLayer.data, 0, 0);
                context.drawImage(this.fontLayer.data, 0, 0);
                this.data = canvas;
            }
            this.reversionCanvas = this.data;
        },
        draw: function (text, x, y, align) {
            if (typeof (text) != 'string') {
                text = text.toString();
            }
            if (text.indexOf('\n') !== -1) {
                var lines = text.split('\n');
                var lineHeight = this.height + this.lineSpacing;
                for (var i = 0; i < lines.length; i++) {
                    this.draw(lines[i], x, y + i * lineHeight, align);
                }
                return;
            }
            if (align == ig.Font.ALIGN.RIGHT || align == ig.Font.ALIGN.CENTER) {
                var width = this._widthForLine(text);
                x -= align == ig.Font.ALIGN.CENTER ? width / 2 : width;
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = this.alpha;
            }
            var skipCount = 0;
            for (var i = 0; i < text.length; i++) {
                var c = text.charCodeAt(i);
                if (c === 91) {
                    var color = this.getColorAtStartOfString(text.substr(i + 1));
                    if (color) {
                        var skip = ('[' + color + ' ').length;
                        this.setFontColor(color);
                        skipCount += skip;
                        i += skip - 1;
                        continue;
                    }
                }
                if (c === 93) {
                    this.revertFontColor();
                    skipCount += (']').length;
                    continue;
                }
                x += this._drawChar(c - this.firstChar, x, y);
            }
            if (this.alpha !== 1) {
                ig.system.context.globalAlpha = 1;
            }
            ig.Image.drawCount += text.length - skipCount;
        },
        getBasePath: function () {
            var stop = this.path.indexOf('?');
            var path = (stop === -1 ? this.path : this.path.substr(0, stop));
            return path;
        },
        setFontColor: function (color) {
            var path = this.getBasePath();
            var settings = {
                fontColor: color
            };
            if (this.borderSize) settings.borderSize = this.borderSize;
            if (this.borderColor) settings.borderColor = this.borderColor;
            this.alternateFont = new ig.Font(path, settings);
            this.data = this.alternateFont.data;
        },
        revertFontColor: function () {
            this.data = this.reversionCanvas;
        },
        getColorAtStartOfString: function (string) {
            var regExp = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/;
            var match = string.match(regExp);
            if (match && match.index === 0) {
                var color = match[0];
                return color;
            } else {
                return null;
            }
        },
        _widthForLine: function (text) {
            var width = 0;
            for (var i = 0; i < text.length; i++) {
                var c = text.charCodeAt(i);
                if (c === 91) {
                    var subText = text.substr(i + 1);
                    var color = this.getColorAtStartOfString(subText);
                    if (color) {
                        var skip = ('[' + color + ' ').length;
                        i += skip - 1;
                        continue;
                    }
                }
                if (c === 93) {
                    continue;
                }
                width += this.widthMap[c - this.firstChar] + this.letterSpacing;
            }
            return width;
        },
        _addSpaceForBorders: function () {
            var canvas = ig.$new('canvas');
            canvas.width = this._getNewFontWidth();
            canvas.height = this._getNewFontHeight();
            var newContext = canvas.getContext('2d');
            var oldContext = this.data.getContext('2d');
            for (var c = 0; c < this.widthMap.length; c++) {
                var x = this.indices[c] * ig.system.scale;
                var y = 0;
                var width = this.widthMap[c] * ig.system.scale;
                var height = (this.height - 2) * ig.system.scale;
                var offsetX = ((c + 1) * this.borderSize * ig.system.scale) + (c * this.borderSize * ig.system.scale);
                var offsetY = this.borderSize * ig.system.scale;
                var charData = oldContext.getImageData(x, y, width, height);
                newContext.putImageData(charData, x + offsetX, y + offsetY);
            }
            this.data = canvas;
        },
        _rebuildMetrics: function () {
            for (var i = 0; i < this.indices.length; i++) {
                this.indices[i] += (i * this.borderSize * 2);
            }
            for (var w = 0; w < this.widthMap.length; w++) {
                this.widthMap[w] += (this.borderSize * 2);
            }
            this.width += (this.widthMap.length * this.borderSize * 2);
            this.height += (this.borderSize * 2);
        },
        _createFontLayer: function () {
            var path = this.getBasePath() + '?layer=font' + '&size=' + this.borderSize;
            if (this.fontColor) {
                path += '&color=' + this._makeHexSafe(this.fontColor);
            }
            if (ig.Image.cache[path]) {
                var image = ig.Image.cache[path];
                this.data = image.data;
                this._rebuildMetrics();
                return image;
            } else {
                this._addSpaceForBorders();
                this._rebuildMetrics();
                return new ig.ImageFromCanvas(path, this.data);
            }
        },
        _createLineLayer: function () {
            var path = this.getBasePath() + '?layer=line&size=' + this.borderSize;
            if (ig.Image.cache[path]) {
                return ig.Image.cache[path];
            }
            var canvas = ig.$new('canvas');
            canvas.width = this.data.width;
            canvas.height = this.data.height
            var context = canvas.getContext('2d');
            var newData = context.getImageData(0, 0, canvas.width, canvas.height);
            for (var c = 0; c < this.widthMap.length; c++) {
                var x = this.indices[c] * ig.system.scale;
                var y = 0;
                var width = this.widthMap[c] * ig.system.scale;
                var offsetX = ((c + 1) * this.borderSize * ig.system.scale) + (c * this.borderSize * ig.system.scale);
                var first = x + offsetX - (this.borderSize * ig.system.scale);
                var last = x + offsetX + width + (this.borderSize * ig.system.scale);
                for (var i = first; i < last; i++) {
                    newData.data[((newData.width * (newData.height - 1)) + i) * 4] = 255;
                    newData.data[((newData.width * (newData.height - 1)) + i) * 4 + 1] = 0;
                    newData.data[((newData.width * (newData.height - 1)) + i) * 4 + 2] = 0;
                    newData.data[((newData.width * (newData.height - 1)) + i) * 4 + 3] = 255;
                }
            }
            context.putImageData(newData, 0, 0);
            var image = new ig.ImageFromCanvas(path, canvas);
            return image;
        },
        _createBorderLayer: function () {
            var path = this.getBasePath() + '?layer=border&size=' + this.borderSize + '&color=' + this._makeHexSafe(this.borderColor);
            if (ig.Image.cache[path]) {
                return ig.Image.cache[path];
            }
            var canvas = ig.$new('canvas');
            canvas.width = this.data.width;
            canvas.height = this.data.height;
            var newContext = canvas.getContext('2d');
            var oldContext = this.data.getContext('2d');
            var thickness = this.borderSize * ig.system.scale;
            for (var x = 1; x <= thickness; x++) {
                newContext.drawImage(oldContext.canvas, -x, 0);
                newContext.drawImage(oldContext.canvas, x, 0);
            }
            for (var y = 1; y <= thickness; y++) {
                newContext.drawImage(oldContext.canvas, 0, -y);
                newContext.drawImage(oldContext.canvas, 0, y);
            }
            if (this.fillCorners) {
                for (var y = 1; y <= thickness; y++) {
                    for (var x = 1; x <= thickness; x++) {
                        newContext.drawImage(oldContext.canvas, -x, y);
                        newContext.drawImage(oldContext.canvas, -x, -y);
                        newContext.drawImage(oldContext.canvas, x, y);
                        newContext.drawImage(oldContext.canvas, x, -y);
                    }
                }
            }
            this._convertNonAlphaPixelsInCanvasToColor(canvas, this.borderColor);
            var image = new ig.ImageFromCanvas(path, canvas);
            return image;
        },
        _ensureDataIsCanvas: function () {
            if (ig.system.scale === 1) {
                this.resize(ig.system.scale);
            }
        },
        _convertNonAlphaPixelsInCanvasToColor: function (canvas, color) {
            var context = canvas.getContext('2d');
            context.globalCompositeOperation = 'source-in';
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, canvas.height);
        },
        _getNewPath: function (path) {
            var newPath = path;
            if (this.fontColor) {
                newPath += '?color=' + this._makeHexSafe(this.fontColor);
            }
            if (this.borderColor && this.borderSize >= 1) {
                newPath += (!this.fontColor ? '?' : '&');
                newPath += 'border=' + this._makeHexSafe(this.borderColor) + '&size=' + this.borderSize;
            }
            return newPath;
        },
        _makeHexSafe: function (hex) {
            if (hex.charAt(0) === '#') hex = hex.substring(1);
            if (hex.length === 3) hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
            hex = '#' + hex;
            return hex;
        },
        _getRGBFromHex: function (hex) {
            hex = this._makeHexSafe(hex);
            if (hex.charAt(0) === '#') hex = hex.substring(1);
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            return {
                r: r,
                g: g,
                b: b
            };
        },
        _getNewFontWidth: function () {
            var widthFromBorders = this.widthMap.length * (this.borderSize * 2);
            var widthFromSpacing = (this.widthMap.length - 1);
            var widthFromFont = 0;
            for (var i = 0; i < this.widthMap.length; i++) widthFromFont += this.widthMap[i];
            return (widthFromBorders + widthFromFont + widthFromSpacing) * ig.system.scale;
        },
        _getNewFontHeight: function () {
            return (this.height + this.borderSize * 2) * ig.system.scale;
        }
    });
    ig.ImageFromCanvas = ig.Image.extend({
        init: function (path, canvas) {
            this.loaded = true;
            this.path = path;
            this.data = canvas;
            this.width = this.data.width / ig.system.scale;
            this.height = this.data.height / ig.system.scale;
            ig.Image.cache[this.path] = this;
        }
    });
});

// lib/plugins/button.js
ig.baked = true;
ig.module('plugins.button').requires('impact.entity').defines(function () {
    Button = ig.Entity.extend({
        size: {
            x: 80,
            y: 40
        },
        text: [],
        textPos: {
            x: 5,
            y: 5
        },
        textAlign: ig.Font.ALIGN.LEFT,
        oldPosScreenX: 0,
        name: null,
        font: null,
        animSheet: null,
        state: 'idle',
        _oldPressed: false,
        _startedIn: false,
        _actionName: 'click',
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('active', 1, [1]);
            this.addAnim('deactive', 1, [2]);
            this.addAnim('pressed', 1, [3]);
            if (this.text.length > 0 && this.font === null) {
                if (ig.game.buttonFont !== null) this.font = ig.game.buttonFont;
                else console.error('If you want to display text, you should provide a font for the button.');
            }
        },
        update: function () {
            if (this.state !== 'hidden') {
                var _clicked = ig.input.state(this._actionName);
                if (!this._oldPressed && _clicked && this._inButton()) {
                    this._startedIn = true;
                }
                if (this._startedIn && this.state !== 'deactive' && this._inButton()) {
                    ig.game.blockJump = true;
                    if (_clicked && !this._oldPressed) {
                        this.setState('active');
                        this.pressedDown();
                    } else if (_clicked) {
                        this.setState('active');
                        this.pressed();
                    } else if (this._oldPressed) {
                        this.setState('idle');
                        this.pressedUp();
                    }
                } else if (this.state === 'active') {
                    this.setState('idle');
                }
                if (this._oldPressed && !_clicked) {
                    this._startedIn = false;
                }
                this._oldPressed = _clicked;
            }
        },
        draw: function () {
            if (this.state !== 'hidden') {
                this.parent(this);
                if (this.font !== null) {
                    for (var i = 0; i < this.text.length; i++) {
                        this.font.draw(this.text[i], this.pos.x + this.textPos.x - ig.game.screen.x, this.pos.y + ((this.font.height + 2) * i) + this.textPos.y - ig.game.screen.y, this.textAlign);
                    }
                }
            }
        },
        setState: function (s) {
            this.state = s;
            if (this.state !== 'hidden') {
                this.currentAnim = this.anims[this.state];
            }
        },
        pressedDown: function () {},
        pressed: function () {},
        pressedUp: function () {},
        _inButton: function () {
			return ig.input.mouse.x / ig.game.curScale + ig.game.screen.x > this.pos.x && 
				   ig.input.mouse.x / ig.game.curScale + ig.game.screen.x < this.pos.x + this.size.x && 
				   ig.input.mouse.y / ig.game.curScale + ig.game.screen.y > this.pos.y && 
				   ig.input.mouse.y / ig.game.curScale + ig.game.screen.y < this.pos.y + this.size.y;
        }
    });
});﻿

// lib/game/entities/parallax/near.js
ig.baked = true;
ig.module('game.entities.parallax.near').requires('impact.entity').defines(function () {
    EntityNear = ig.Entity.extend({
        size: {
            x: 500,
            y: 50
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.NONE,
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.NONE,
        disolve: 0,
        name: 'parallax',
        distance: 1.3,
        zIndex: -10,
        animSheet: new ig.AnimationSheet('media/parallax1.png', 500, 50),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {},
        draw: function () {
            if (ig.game.pause != 1 || ig.game.gameOver != 1) {
                if (this.currentAnim) {
                    this.currentAnim.draw((this.pos.x - this.offset.x - ig.game.screen.x) / this.distance, (this.pos.y - this.offset.y - ig.game.screen.y) / this.distance);
                }
            }
        }
    });
});﻿

// lib/game/entities/parallax/middle.js
ig.baked = true;
ig.module('game.entities.parallax.middle').requires('impact.entity').defines(function () {
    EntityMiddle = ig.Entity.extend({
        size: {
            x: 500,
            y: 100
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.NONE,
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.NONE,
        disolve: 0,
        name: 'parallax',
        distance: 2,
        zIndex: -11,
        animSheet: new ig.AnimationSheet('media/parallax2.png', 500, 100),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {},
        draw: function () {
            if (ig.game.pause != 1 || ig.game.gameOver != 1) {
                if (this.currentAnim) {
                    this.currentAnim.draw((Math.round(this.pos.x) - ig.game.screen.x) / this.distance, (Math.round(this.pos.y) - ig.game.screen.y) / this.distance * 1.3);
                }
            }
        }
    });
});﻿

// lib/game/entities/parallax/far.js
ig.baked = true;
ig.module('game.entities.parallax.far').requires('impact.entity').defines(function () {
    EntityFar = ig.Entity.extend({
        size: {
            x: 500,
            y: 150
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.NONE,
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.NONE,
        disolve: 0,
        name: 'parallax',
        distance: 4,
        zIndex: -12,
        animSheet: new ig.AnimationSheet('media/parallax3.png', 500, 150),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {},
        draw: function () {
            if (ig.game.pause != 1 || ig.game.gameOver != 1) {
                if (this.currentAnim) {
                    this.currentAnim.draw((Math.round(this.pos.x) - this.offset.x - ig.game.screen.x) / this.distance, (Math.round(this.pos.y) - this.offset.y - ig.game.screen.y) / this.distance * 2);
                }
            }
        }
    });
});﻿

// lib/game/entities/cards.js
ig.baked = true;
ig.module('game.entities.cards').requires('impact.entity').defines(function () {
    EntityCards = ig.Entity.extend({
        size: {
            x: 70,
            y: 70
        },
        offset: {
            x: 0,
            y: 0
        },
        type: ig.Entity.TYPE.BOTH,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.NONE,
        name: 'card',
        current: 1,
        iterFrame: 0,
        wait: 0,
        zIndex: 5,
        start: 0,
        selected: null,
        prevVariation: null,
        someVariation: null,
        animSheet: new ig.AnimationSheet('media/powerups.png', 70, 70),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('back', 5, [0], 1);
            this.addAnim('rocket', 5, [1], 1);
            this.addAnim('clever', 5, [2], 1);
            this.addAnim('shield', 5, [3], 1);
            this.addAnim('wings', 5, [4], 1);
            this.addAnim('magnet', 5, [5], 1);
            this.addAnim('coins50', 5, [6], 1);
            this.addAnim('coins100', 5, [7], 1);
            this.addAnim('coins150', 5, [8], 1);
            this.addAnim('anvil', 5, [9], 1);
            this.addAnim('coffee', 5, [10], 1);
            this.addAnim('hijump', 5, [11], 1);
        },
        someRandom: function () {
            var someNumber = Math.floor(Math.random() * (13 - 2) + 2);
            return someNumber;
        },
        update: function () {
            if (this.start == 1) {
                switch (this.current) {
                case 1:
                    this.currentAnim = this.anims.back;
                    break;
                case 2:
                    this.currentAnim = this.anims.rocket;
                    break;
                case 3:
                    this.currentAnim = this.anims.clever;
                    break;
                case 4:
                    this.currentAnim = this.anims.shield;
                    break;
                case 5:
                    this.currentAnim = this.anims.wings;
                    break;
                case 6:
                    this.currentAnim = this.anims.magnet;
                    break;
                case 7:
                    this.currentAnim = this.anims.coins50;
                    break;
                case 8:
                    this.currentAnim = this.anims.coins100;
                    break;
                case 9:
                    this.currentAnim = this.anims.coins150;
                    break;
                case 10:
                    this.currentAnim = this.anims.anvil;
                    break;
                case 11:
                    this.currentAnim = this.anims.coffee;
                    break;
                case 12:
                    this.currentAnim = this.anims.hijump;
                    break;
                default:
                    this.currentAnim = this.anims.back;
                    break;
                }
            } else {
                this.currentAnim = this.anims.back;
            }
            if (this.iterFrame >= this.wait && this.selected == null) {
                if (this.current == 1) {
                    this.someVariation = this.someRandom();
                    if (this.prevVariation != this.someVariation) {
                        this.current = this.someVariation;
                        this.prevVariation = this.someVariation;
                    } else {
                        while (this.prevVariation == this.someVariation) {
                            this.someVariation = this.someRandom();
                        }
                    }
                } else {
                    this.current = 1;
                }
                this.iterFrame = 0;
            } else if (this.current == 1 && this.selected != null) {
                this.current = Math.floor(Math.random() * (6 - 2) + 2);
            }
            this.parent();
            this.iterFrame++;
        }
    });
});﻿

// lib/game/entities/bonus.js
ig.baked = true;
ig.module('game.entities.bonus').requires('impact.entity').defines(function () {
    EntityBonus = ig.Entity.extend({
        size: {
            x: 1,
            y: 1
        },
        name: '',
        timeAlive: 0,
        timeInWork: 0,
        bonusTimer: null,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NONE,
        subtype: 'bonus',
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.bonusTimer = new ig.Timer(this.timeAlive);
        },
        update: function () {
            if (this.bonusTimer != null) {
                this.timeInWork = this.bonusTimer.delta();
            }
            if (this.bonusTimer != null && this.bonusTimer.delta() >= 0) {
                this.kill();
            }
            this.parent();
        },
    });
});﻿

// lib/game/entities/knife.js
ig.baked = true;
ig.module('game.entities.knife').requires('impact.entity').defines(function () {
    EntityKnife = ig.Entity.extend({
        size: {
            x: 15,
            y: 15
        },
        offset: {
            x: 0,
            y: 15
        },
        collides: ig.Entity.COLLIDES.PASSIVE,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        name: "knife",
        gravityFactor: 0,
        firstTime: true,
        stop: false,
        animSheet: new ig.AnimationSheet('media/knife.png', 25, 45),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
        },
        update: function () {
            if (this.pos.y < ig.game.screen.y) this.kill();
            if (this.pos.y > ig.game.screen.y + 320) this.kill();
            if (this.stop == false && ig.game.player) {
                this.pos.x += (ig.game.player.speed + 250) * ig.system.tick;
                this.currentAnim.angle += Math.PI * 4 * ig.system.tick;
                this.parent();
                if (this.pos.x - ig.game.screen.x > 600) this.kill();
            } else if (this.stop == true) {
                if (this.pos.x - ig.game.screen.x < 200) this.kill();
            }
        },
        check: function (other) {
            if (other.name == "player") {
                other.hitKnife();
                this.kill();
            } else {
                this.stop = true;
            }
        }
    });
});﻿

// lib/game/entities/coin.js
ig.baked = true;
ig.module('game.entities.coin').requires('impact.entity').defines(function () {
    EntityCoin = ig.Entity.extend({
        size: {
            x: 15,
            y: 15
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.B,
        name: "coin",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        velX: 0,
        velY: 0,
        curPalyerVelX: null,
        curPalyerPosY: null,
        animSheet: new ig.AnimationSheet('media/coin.png', 15, 15),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('fast', 0.05, [0, 1, 2, 3, 4, 5]);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5]);
            this.currentAnim = this.anims.idle;
            this.currentAnim.gotoRandomFrame();
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
            if (this.velX > 0) {
                this.bounciness = 0.5;
                this.vel.x = this.velX;
                this.vel.y = this.velY;
                this.friction.x = 100;
            }
        },
        update: function () {
            if (this.disolve == 1) {
                this.currentAnim = this.anims.fast;
                this.kill();
            }
            this.parent();
        },
        check: function (other) {
            if (other.name == "player") {
                this.curPalyerVelX = other.vel.x;
                this.curPalyerPosY = this.pos.y - 300;
                ig.game.addCoin(1);
                this.checkAgainst = ig.Entity.TYPE.NONE;
                this.TYPE = ig.Entity.TYPE.NONE;
                this.disolve = 1;
            }
        }
    });
});﻿

// lib/game/entities/anvil.js
ig.baked = true;
ig.module('game.entities.anvil').requires('impact.entity').defines(function () {
    EntityAnvil = ig.Entity.extend({
        size: {
            x: 50,
            y: 50
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.B,
        name: "anvil",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        velX: 0,
        velY: 0,
        curPalyerVelX: null,
        curPalyerPosY: null,
        subtype: 'bonus',
        zIndex: 5,
        droped: false,
        animSheet: new ig.AnimationSheet('media/anvil.png', 100, 49),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            if (this.pos.y < 830) {
                this.pos.y += 20;
                this.currentAnim.angle += Math.PI * 4 * ig.system.tick;
                if (ig.game.butcher != null) this.pos.x = ig.game.butcher.pos.x;
            } else if (this.droped == false) {
                ig.game.shakeAmplitude = 30;
                ig.game.butcher.stopButcher();
                if (this.pos.x + 100 < ig.game.screen.x) this.kill();
                this.droped = true;
            }
        },
        check: function (other) {
            if (other.name == "butcher") {}
        }
    });
});﻿

// lib/game/entities/shield.js
ig.baked = true;
ig.module('game.entities.shield').requires('impact.entity').defines(function () {
    EntityShield = ig.Entity.extend({
        size: {
            x: 96,
            y: 96
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.B,
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        velX: 0,
        velY: 0,
        curPalyerVelX: null,
        curPalyerPosY: null,
        subtype: 'bonus',
        zIndex: 15,
        droped: false,
        haveChild: false,
        animSheet: new ig.AnimationSheet('media/shield.png', 96, 96),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            this.pos.x = ig.game.player.pos.x - 10;
            this.pos.y = ig.game.player.pos.y - 25;
            if (this.haveChild == false) {
                ig.game.spawnEntity(EntityParticles, this.pos.x, this.pos.y, {
                    target: this
                });
                ig.game.spawnEntity(EntityParticlesCCW, this.pos.x, this.pos.y, {
                    target: this
                });
                this.haveChild = true;
            }
        },
        check: function (other) {
            if (other.name == "butcher") {}
        }
    });
    EntityParticles = ig.Entity.extend({
        size: {
            x: 80,
            y: 80
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "shield",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 260,
        zIndex: 20,
        haveChild: false,
        animSheet: new ig.AnimationSheet('media/sheiled_particles.png', 80, 80),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
        },
        update: function () {
            if (this.target._killed == true) this.kill();
            this.parent();
            this.pos.x = this.target.pos.x + 8;
            this.pos.y = this.target.pos.y + 8;
            this.currentAnim.angle += Math.PI * 4 * ig.system.tick;
        },
    });
    EntityParticlesCCW = ig.Entity.extend({
        size: {
            x: 80,
            y: 80
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "shield",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 260,
        zIndex: 20,
        haveChild: false,
        animSheet: new ig.AnimationSheet('media/sheiled_particles.png', 80, 80),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.currentAnim = this.anims.idle;
        },
        update: function () {
            if (this.target._killed == true) this.kill();
            this.parent();
            this.pos.x = this.target.pos.x + 8;
            this.pos.y = this.target.pos.y + 8;
            this.currentAnim.angle -= Math.PI * 3 * ig.system.tick;
        },
    });
});﻿

// lib/game/entities/pigintro.js
ig.baked = true;
ig.module('game.entities.pigintro').requires('impact.entity').defines(function () {
    EntityPigintro = ig.Entity.extend({
        size: {
            x: 80,
            y: 50
        },
        offset: {
            x: 13,
            y: 16
        },
        type: ig.Entity.TYPE.BOTH,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,
        name: 'pigintro',
        thrust: 0.2,
        score: 0,
        jump: 470,
        speed: 250,
        state: 'walk',
        zIndex: 5,
        timerBoost: null,
        numberOfAnimation: 1,
        subtype: 'bonus',
        magnet: false,
        rocket: false,
        wings: false,
        shield: false,
        highJump: false,
        anvil: false,
        cofe: false,
        animSheet: new ig.AnimationSheet('media/pig.png', 96, 70),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('walk', 0.03, [12, 13, 14, 15, 16, 17, 18, 19]);
            this.addAnim('jump', 0.4, [9, 10], 1);
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            this.vel.x = this.speed;
            this.currentAnim = this.anims.walk;
            this.parent();
        }
    });
});﻿

// lib/game/entities/butchintro.js
ig.baked = true;
ig.module('game.entities.butchintro').requires('impact.entity').defines(function () {
    EntityButchintro = ig.Entity.extend({
        size: {
            x: 50,
            y: 114
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "butcher",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 250,
        zIndex: 2,
        haveChild: false,
        attack: false,
        stopTimer: null,
        subtype: 'bonus',
        animSheet: new ig.AnimationSheet('media/butcher/body.png', 144, 114),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('run', 30, [0]);
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            this.currentAnim = this.anims.run;
            this.vel.x = this.speedRun;
            this.parent();
            if (this.haveChild == false) {
                ig.game.spawnEntity(EntityLegs, this.pos.x, this.pos.y, {
                    target: this
                });
                ig.game.spawnEntity(EntityHand, this.pos.x, this.pos.y, {
                    target: this
                });
                this.haveChild = true;
            }
        }
    });
    EntityHand = ig.Entity.extend({
        size: {
            x: 148,
            y: 90
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "butcher",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 260,
        zIndex: 4,
        haveChild: false,
        animSheet: new ig.AnimationSheet('media/butcher/hand.png', 148, 90),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 3, [0, 1]);
            this.addAnim('kill', 0.1, [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4]);
            this.currentAnim = this.anims.run;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            this.parent();
            this.pos.x = this.target.pos.x - 25;
            this.pos.y = this.target.pos.y + 40;
        },
    });
    EntityLegs = ig.Entity.extend({
        size: {
            x: 83,
            y: 63
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "butcher",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 260,
        zIndex: 1,
        haveChild: false,
        animSheet: new ig.AnimationSheet('media/butcher/legs.png', 83, 63),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('run', 0.1, [0, 1, 2, 1]);
            this.addAnim('idle', 10, [1]);
            this.currentAnim = this.anims.run;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            this.parent();
            this.pos.x = this.target.pos.x - 10;
            this.pos.y = this.target.pos.y + 75;
        },
    });
});﻿

// lib/game/entities/bonusstripe.js
ig.baked = true;
ig.module('game.entities.bonusstripe').requires('impact.entity').defines(function () {
    EntityBonusstripe = ig.Entity.extend({
        size: {
            x: 73,
            y: 1095
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.B,
        name: "bonusstripe",
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        haveChild: false,
        curChild: null,
        needToStart: true,
        needToStop: false,
        posToStop: 0,
        YOffset: 0,
        frameSize: 73,
        current: -1,
        currentPos: -1,
        selected: 1,
        start: 0,
        hold: false,
        animSheet: new ig.AnimationSheet('media/bonus_stripe.png', 73, 1095),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 15, [0]);
            this.addAnim('fast', 15, [1]);
            this.currentAnim = this.anims.idle;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
            this.friction.y = 1000;
        },
        randomizer: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        isInteger: function (num) {
            var d = num ^ 0;
            if (d == num) return true;
        },
        someRandom: function () {
            var someNumber = Math.floor(Math.random() * (13 - 2) + 2);
            return someNumber;
        },
        update: function () {
            this.parent();
            if (this.start == 1 && this.hold == false) {
                if (this.needToStart == true) {
                    this.vel.y = this.randomizer(3000, 3500);
                    this.needToStart = false;
                    this.currentPos = this.someRandom();
                    this.current = this.currentPos;
                    this.selected = null;
                }
                if (this.vel.y > 850) this.currentAnim = this.anims.fast;
                else {
                    this.currentAnim = this.anims.idle;
                    if (this.current > -1) {
                        this.posToStop = ((this.currentPos * 73) * -1) - 23;
                        this.needToStop = true;
                    }
                    if (this.needToStop == true) {
                        this.vel.y = 0;
                        this.pos.y = this.posToStop;
                        this.selected = 1;
                        this.start = 0;
                        this.needToStart = true;
                    }
                }
            }
            if (this.pos.y >= -11) this.pos.y = -813;
        },
    });
});﻿

// lib/game/entities/jumper.js
ig.baked = true;
ig.module('game.entities.jumper').requires('impact.entity').defines(function () {
    EntityJumper = ig.Entity.extend({
        size: {
            x: 100,
            y: 25
        },
        offset: {
            x: 15,
            y: 25
        },
        collides: ig.Entity.COLLIDES.LITE,
        type: ig.Entity.TYPE.B,
        name: "jumper",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        curPalyerVelX: null,
        curPalyerPosY: null,
        firstTime: true,
        animSheet: new ig.AnimationSheet('media/jumper.png', 130, 50),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 10, [0]);
            this.addAnim('start', 0.4, [0, 1, 2], 1);
            this.currentAnim = this.anims.idle;
        },
        update: function () {
            this.parent();
        },
        check: function (other) {
            if (other.name == "player" & this.firstTime == true) {
                this.collides = ig.Entity.COLLIDES.NONE;
                this.vel.x = this.vel.y = 0;
                if (other.vel.y > 0) {
                    other.vel.y -= other.vel.y * 1.8;
                    this.currentAnim = this.anims.start;
                }
                this.firstTime = false;
            }
        }
    });
});﻿

// lib/game/entities/bigcoin.js
ig.baked = true;
ig.module('game.entities.bigcoin').requires('impact.entity').defines(function () {
    EntityBigcoin = ig.Entity.extend({
        size: {
            x: 65,
            y: 65
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.B,
        name: "bigcoin",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        curPalyerVelX: null,
        curPalyerPosY: null,
        timer: null,
        maxCoinsBorn: 0,
        period: 0,
        animSheet: new ig.AnimationSheet('media/big_coin.png', 65, 65),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('fast', 0.05, [0, 1, 2, 3, 4, 5]);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5]);
            this.currentAnim = this.anims.idle;
            this.currentAnim.gotoRandomFrame();
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        randomizer: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        update: function () {
            if (this.disolve == 1) {
                randomBorn = this.randomizer(7, 4);
                if (this.period > randomBorn && this.maxCoinsBorn < 20) {
                    var maxBornCoins = this.randomizer(10, 1);
                    for (var i = 0; i < maxBornCoins; i++) {
                        ig.game.spawnEntity(EntityCoin, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, {
                            gravityFactor: 1,
                            velX: this.vel.x / 2 + this.randomizer(25, -5),
                            velY: this.randomizer(-200, -500)
                        });
                        this.maxCoinsBorn++;
                    }
                    this.period = 0;
                }
                if (this.maxCoinsBorn >= 20) {
                    this.kill();
                }
                this.currentAnim = this.anims.fast;
                this.pos.y += (this.curPalyerPosY - this.pos.y) / 30;
                this.curPalyerVelX = this.curPalyerVelX * 1.03;
                this.vel.x = this.curPalyerVelX;
                this.period++;
            }
            this.parent();
        },
        check: function (other) {
            if (other.name == "player") {
                this.curPalyerVelX = other.vel.x;
                this.curPalyerPosY = this.pos.y - 300;
                this.checkAgainst = ig.Entity.TYPE.NONE;
                this.TYPE = ig.Entity.TYPE.NONE;
                this.disolve = 1;
            }
        }
    });
});

// lib/game/levels/next.js
ig.baked = true;
ig.module('game.levels.next').requires('impact.image', 'game.entities.jumper', 'game.entities.coin', 'game.entities.bigcoin').defines(function () {
    LevelNext = {
        "entities": [{
            "type": "EntityJumper",
            "x": 911,
            "y": 585
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 360
        }, {
            "type": "EntityCoin",
            "x": 128,
            "y": 400
        }, {
            "type": "EntityCoin",
            "x": 240,
            "y": 368
        }, {
            "type": "EntityCoin",
            "x": 224,
            "y": 384
        }, {
            "type": "EntityCoin",
            "x": 144,
            "y": 384
        }, {
            "type": "EntityBigcoin",
            "x": 820,
            "y": 788
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 328
        }, {
            "type": "EntityCoin",
            "x": 208,
            "y": 400
        }, {
            "type": "EntityCoin",
            "x": 644,
            "y": 328
        }, {
            "type": "EntityCoin",
            "x": 192,
            "y": 416
        }, {
            "type": "EntityCoin",
            "x": 644,
            "y": 360
        }, {
            "type": "EntityCoin",
            "x": 160,
            "y": 368
        }, {
            "type": "EntityCoin",
            "x": 112,
            "y": 416
        }, {
            "type": "EntityCoin",
            "x": 720,
            "y": 328
        }, {
            "type": "EntityCoin",
            "x": 720,
            "y": 360
        }, {
            "type": "EntityCoin",
            "x": 644,
            "y": 296
        }, {
            "type": "EntityCoin",
            "x": 720,
            "y": 296
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 296
        }, {
            "type": "EntityJumper",
            "x": 603,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 772,
            "y": 508
        }, {
            "type": "EntityCoin",
            "x": 788,
            "y": 504
        }, {
            "type": "EntityCoin",
            "x": 804,
            "y": 508
        }, {
            "type": "EntityCoin",
            "x": 788,
            "y": 524
        }, {
            "type": "EntityCoin",
            "x": 808,
            "y": 524
        }, {
            "type": "EntityCoin",
            "x": 768,
            "y": 524
        }, {
            "type": "EntityCoin",
            "x": 772,
            "y": 540
        }, {
            "type": "EntityCoin",
            "x": 788,
            "y": 544
        }, {
            "type": "EntityCoin",
            "x": 804,
            "y": 540
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 1, 1, 1, 1, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [1, 2, 3, 4, 5, 6, 44, 45, 85, 86, 96, 97, 122, 123, 124, 125, 79, 80, 81, 82, 53, 54, 55, 56, 20, 21, 79, 80, 81, 82, 92, 93, 94, 95, 0, 0],
                [14, 15, 16, 17, 18, 19, 0, 13, 98, 99, 0, 0, 0, 13, 0, 0, 92, 93, 94, 95, 66, 67, 68, 69, 13, 13, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 13, 0, 51, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 13, 13, 13, 0, 13, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 39, 0, 0, 0, 0, 13, 0, 13, 0, 13, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 13, 0, 0, 39, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 13, 0, 39, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 39, 0, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 90, 31, 32, 35, 36, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 101, 102, 103, 44, 45, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 83, 84, 79, 80, 81, 82, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 96, 97, 92, 93, 94, 95, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 39, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79, 80, 81, 82, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 93, 94, 95, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 156, 13, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 13, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 13, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 61, 62, 63, 64, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 74, 75, 76, 77, 44, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0],
                [0, 61, 62, 63, 64, 79, 80, 81, 82, 33, 34, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0],
                [0, 74, 75, 76, 77, 92, 93, 94, 95, 46, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 168, 0, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136],
                [146, 147, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149]
            ]
        }]
    };
    LevelNextResources = [new ig.Image('media/main_spritesheet.png')];
});﻿

// lib/game/entities/trap.js
ig.baked = true;
ig.module('game.entities.trap').requires('impact.entity').defines(function () {
    EntityTrap = ig.Entity.extend({
        size: {
            x: 30,
            y: 15
        },
        offset: {
            x: 50,
            y: 40
        },
        collides: ig.Entity.COLLIDES.PASSIVE,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        name: "trap",
        gravityFactor: 0,
        firstTime: true,
        stop: false,
        zIndex: 100,
        animSheet: new ig.AnimationSheet('media/trap.png', 102, 55),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('open', 10, [0]);
            this.addAnim('closed', 10, [1]);
            this.currentAnim = this.anims.open;
        },
        update: function () {
            this.parent();
        },
        check: function (other) {
            if (other.name == "player") {
                this.currentAnim = this.anims.closed;
                this.vel.y = 0;
                this.vel.x = 0;
                other.hitKnife();
            } else {
                this.stop = true;
            }
        }
    });
});

// lib/game/levels/next1.js
ig.baked = true;
ig.module('game.levels.next1').requires('impact.image', 'game.entities.coin', 'game.entities.bigcoin', 'game.entities.jumper', 'game.entities.trap').defines(function () {
    LevelNext1 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 404,
            "y": 696
        }, {
            "type": "EntityCoin",
            "x": 164,
            "y": 372
        }, {
            "type": "EntityCoin",
            "x": 284,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 612,
            "y": 788
        }, {
            "type": "EntityCoin",
            "x": 320,
            "y": 756
        }, {
            "type": "EntityBigcoin",
            "x": 496,
            "y": 76
        }, {
            "type": "EntityCoin",
            "x": 288,
            "y": 372
        }, {
            "type": "EntityCoin",
            "x": 196,
            "y": 408
        }, {
            "type": "EntityJumper",
            "x": 247,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 456,
            "y": 680
        }, {
            "type": "EntityCoin",
            "x": 584,
            "y": 752
        }, {
            "type": "EntityCoin",
            "x": 360,
            "y": 728
        }, {
            "type": "EntityCoin",
            "x": 260,
            "y": 408
        }, {
            "type": "EntityCoin",
            "x": 512,
            "y": 692
        }, {
            "type": "EntityCoin",
            "x": 552,
            "y": 720
        }, {
            "type": "EntityCoin",
            "x": 228,
            "y": 372
        }, {
            "type": "EntityJumper",
            "x": 575,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 68,
            "y": 408
        }, {
            "type": "EntityCoin",
            "x": 96,
            "y": 372
        }, {
            "type": "EntityCoin",
            "x": 132,
            "y": 408
        }, {
            "type": "EntityCoin",
            "x": 904,
            "y": 564
        }, {
            "type": "EntityCoin",
            "x": 1008,
            "y": 612
        }, {
            "type": "EntityCoin",
            "x": 1008,
            "y": 588
        }, {
            "type": "EntityCoin",
            "x": 1008,
            "y": 564
        }, {
            "type": "EntityCoin",
            "x": 904,
            "y": 612
        }, {
            "type": "EntityCoin",
            "x": 904,
            "y": 588
        }, {
            "type": "EntityBigcoin",
            "x": 932,
            "y": 564
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 264
        }, {
            "type": "EntityCoin",
            "x": 328,
            "y": 136
        }, {
            "type": "EntityBigcoin",
            "x": 816,
            "y": 236
        }, {
            "type": "EntityCoin",
            "x": 648,
            "y": 520
        }, {
            "type": "EntityTrap",
            "x": 436,
            "y": 883
        }, {
            "type": "EntityTrap",
            "x": 656,
            "y": 368
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 1, 1, 1, 1, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 117, 0, 92, 93, 94, 95, 53, 54, 55, 56, 35, 36, 37, 38, 0, 13, 101, 102, 103, 44, 45, 85, 86, 92, 93, 94, 95, 48, 49, 50, 51, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 66, 67, 68, 69, 48, 49, 50, 51, 0, 13, 0, 0, 0, 13, 0, 98, 99, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 13, 13, 0, 13, 0, 0, 0, 0, 0, 39, 0, 0, 0, 13, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 13, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 39, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 90, 31, 32, 35, 36, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 26, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 100, 101, 102, 103, 44, 45, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 83, 84, 105, 106, 107, 108, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 96, 97, 118, 119, 120, 121, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 84, 5, 6, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 18, 19, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 189, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 133, 134, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 133, 134, 135, 136],
                [146, 147, 148, 149, 146, 147, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 146, 147, 148, 149]
            ]
        }]
    };
    LevelNext1Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next2.js
ig.baked = true;
ig.module('game.levels.next2').requires('impact.image', 'game.entities.coin', 'game.entities.jumper', 'game.entities.bigcoin', 'game.entities.trap').defines(function () {
    LevelNext2 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 224,
            "y": 480
        }, {
            "type": "EntityCoin",
            "x": 644,
            "y": 540
        }, {
            "type": "EntityCoin",
            "x": 552,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 520,
            "y": 828
        }, {
            "type": "EntityJumper",
            "x": 1007,
            "y": 873
        }, {
            "type": "EntityBigcoin",
            "x": 452,
            "y": 140
        }, {
            "type": "EntityCoin",
            "x": 616,
            "y": 828
        }, {
            "type": "EntityCoin",
            "x": 612,
            "y": 540
        }, {
            "type": "EntityCoin",
            "x": 616,
            "y": 808
        }, {
            "type": "EntityCoin",
            "x": 532,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 600,
            "y": 844
        }, {
            "type": "EntityCoin",
            "x": 552,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 568,
            "y": 868
        }, {
            "type": "EntityCoin",
            "x": 536,
            "y": 844
        }, {
            "type": "EntityCoin",
            "x": 584,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 520,
            "y": 808
        }, {
            "type": "EntityCoin",
            "x": 584,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 80,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 256,
            "y": 480
        }, {
            "type": "EntityCoin",
            "x": 760,
            "y": 472
        }, {
            "type": "EntityCoin",
            "x": 568,
            "y": 808
        }, {
            "type": "EntityCoin",
            "x": 372,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 604,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 112,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 272,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 96,
            "y": 480
        }, {
            "type": "EntityCoin",
            "x": 316,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 256,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 792,
            "y": 472
        }, {
            "type": "EntityCoin",
            "x": 728,
            "y": 472
        }, {
            "type": "EntityCoin",
            "x": 284,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 208,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 344,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 192,
            "y": 480
        }, {
            "type": "EntityCoin",
            "x": 128,
            "y": 480
        }, {
            "type": "EntityCoin",
            "x": 144,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 176,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 240,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 676,
            "y": 540
        }, {
            "type": "EntityCoin",
            "x": 160,
            "y": 480
        }, {
            "type": "EntityBigcoin",
            "x": 988,
            "y": 384
        }, {
            "type": "EntityCoin",
            "x": 648,
            "y": 72
        }, {
            "type": "EntityCoin",
            "x": 776,
            "y": 200
        }, {
            "type": "EntityCoin",
            "x": 136,
            "y": 360
        }, {
            "type": "EntityTrap",
            "x": 892,
            "y": 880
        }, {
            "type": "EntityTrap",
            "x": 100,
            "y": 880
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 14, 15, 0, 0, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 25, 26, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 105, 106, 107, 108, 5, 6, 118, 119, 120, 121, 48, 49, 50, 51, 0, 0, 0, 0, 122, 123, 124, 125, 31, 32, 35, 36, 37, 38, 0, 0, 0, 0, 0, 0],
                [0, 0, 118, 119, 120, 121, 18, 19, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 65, 44, 45, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 13, 0, 0, 78, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 65, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 13, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 13, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 26, 26, 0, 0, 0, 0, 0, 0, 83, 84, 79, 80, 81, 82, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 31, 32, 0, 0, 0, 0, 0, 0, 96, 97, 92, 93, 94, 95, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 44, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 26, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 0, 0, 31, 32, 33, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 83, 84, 79, 80, 81, 82, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 78, 0, 44, 45, 46, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 96, 97, 92, 93, 94, 95, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79, 80, 81, 82, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 172, 189, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 93, 94, 95, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 172, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 39, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 172, 0, 0, 79, 80, 81, 82, 9, 10, 11, 12, 0, 0, 0, 0, 61, 62, 63, 64, 33, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 172, 0, 0, 92, 93, 94, 95, 22, 23, 24, 25, 0, 0, 0, 0, 74, 75, 76, 77, 46, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 133, 134, 135, 136, 133, 134, 135, 136],
                [146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 146, 147, 148, 149, 146, 147, 148, 149]
            ]
        }]
    };
    LevelNext2Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next3.js
ig.baked = true;
ig.module('game.levels.next3').requires('impact.image', 'game.entities.coin', 'game.entities.jumper', 'game.entities.bigcoin').defines(function () {
    LevelNext3 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 424,
            "y": 784
        }, {
            "type": "EntityCoin",
            "x": 412,
            "y": 776
        }, {
            "type": "EntityCoin",
            "x": 692,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 848
        }, {
            "type": "EntityCoin",
            "x": 412,
            "y": 760
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 816
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 784
        }, {
            "type": "EntityCoin",
            "x": 668,
            "y": 808
        }, {
            "type": "EntityCoin",
            "x": 424,
            "y": 816
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 800
        }, {
            "type": "EntityCoin",
            "x": 424,
            "y": 752
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 784
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 848
        }, {
            "type": "EntityCoin",
            "x": 212,
            "y": 808
        }, {
            "type": "EntityCoin",
            "x": 188,
            "y": 808
        }, {
            "type": "EntityCoin",
            "x": 436,
            "y": 760
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 816
        }, {
            "type": "EntityCoin",
            "x": 212,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 692,
            "y": 808
        }, {
            "type": "EntityCoin",
            "x": 188,
            "y": 792
        }, {
            "type": "EntityJumper",
            "x": 859,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 424,
            "y": 800
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 436,
            "y": 776
        }, {
            "type": "EntityCoin",
            "x": 556,
            "y": 840
        }, {
            "type": "EntityCoin",
            "x": 612,
            "y": 840
        }, {
            "type": "EntityCoin",
            "x": 240,
            "y": 872
        }, {
            "type": "EntityCoin",
            "x": 524,
            "y": 868
        }, {
            "type": "EntityCoin",
            "x": 680,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 640,
            "y": 868
        }, {
            "type": "EntityCoin",
            "x": 312,
            "y": 872
        }, {
            "type": "EntityCoin",
            "x": 276,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 384,
            "y": 872
        }, {
            "type": "EntityCoin",
            "x": 348,
            "y": 856
        }, {
            "type": "EntityBigcoin",
            "x": 928,
            "y": 604
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 800
        }, {
            "type": "EntityCoin",
            "x": 424,
            "y": 768
        }, {
            "type": "EntityCoin",
            "x": 668,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 584,
            "y": 868
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 141, 0, 0, 0, 0, 0, 0, 46, 47, 141, 0, 0, 0, 0, 0, 141, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 133, 134, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136],
                [146, 147, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 146, 147, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149]
            ]
        }]
    };
    LevelNext3Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next4.js
ig.baked = true;
ig.module('game.levels.next4').requires('impact.image', 'game.entities.coin', 'game.entities.jumper', 'game.entities.bigcoin').defines(function () {
    LevelNext4 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 484,
            "y": 472
        }, {
            "type": "EntityCoin",
            "x": 128,
            "y": 560
        }, {
            "type": "EntityCoin",
            "x": 128,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 504,
            "y": 472
        }, {
            "type": "EntityCoin",
            "x": 500,
            "y": 488
        }, {
            "type": "EntityJumper",
            "x": 571,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 176,
            "y": 512
        }, {
            "type": "EntityBigcoin",
            "x": 844,
            "y": 216
        }, {
            "type": "EntityCoin",
            "x": 424,
            "y": 712
        }, {
            "type": "EntityCoin",
            "x": 128,
            "y": 544
        }, {
            "type": "EntityCoin",
            "x": 484,
            "y": 452
        }, {
            "type": "EntityCoin",
            "x": 144,
            "y": 528
        }, {
            "type": "EntityCoin",
            "x": 144,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 144,
            "y": 560
        }, {
            "type": "EntityCoin",
            "x": 128,
            "y": 528
        }, {
            "type": "EntityBigcoin",
            "x": 836,
            "y": 496
        }, {
            "type": "EntityCoin",
            "x": 936,
            "y": 712
        }, {
            "type": "EntityCoin",
            "x": 144,
            "y": 544
        }, {
            "type": "EntityCoin",
            "x": 464,
            "y": 472
        }, {
            "type": "EntityCoin",
            "x": 160,
            "y": 512
        }, {
            "type": "EntityCoin",
            "x": 176,
            "y": 544
        }, {
            "type": "EntityCoin",
            "x": 176,
            "y": 528
        }, {
            "type": "EntityCoin",
            "x": 160,
            "y": 528
        }, {
            "type": "EntityCoin",
            "x": 176,
            "y": 560
        }, {
            "type": "EntityCoin",
            "x": 160,
            "y": 560
        }, {
            "type": "EntityCoin",
            "x": 160,
            "y": 544
        }, {
            "type": "EntityCoin",
            "x": 232,
            "y": 744
        }, {
            "type": "EntityCoin",
            "x": 468,
            "y": 456
        }, {
            "type": "EntityCoin",
            "x": 136,
            "y": 776
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 712
        }, {
            "type": "EntityCoin",
            "x": 360,
            "y": 776
        }, {
            "type": "EntityCoin",
            "x": 264,
            "y": 744
        }, {
            "type": "EntityCoin",
            "x": 484,
            "y": 492
        }, {
            "type": "EntityCoin",
            "x": 328,
            "y": 744
        }, {
            "type": "EntityCoin",
            "x": 168,
            "y": 744
        }, {
            "type": "EntityCoin",
            "x": 500,
            "y": 456
        }, {
            "type": "EntityCoin",
            "x": 468,
            "y": 488
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [14, 15, 1, 1, 1, 1, 1, 1, 1, 1, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [92, 93, 94, 95, 92, 93, 94, 95, 98, 99, 0, 0, 109, 110, 111, 112, 44, 45, 20, 21, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0, 92, 93, 94, 95, 44, 45],
                [0, 0, 0, 13, 13, 39, 13, 13, 0, 0, 0, 0, 122, 123, 124, 125, 105, 106, 107, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 39, 0, 13],
                [0, 0, 0, 13, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 118, 119, 120, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13],
                [0, 0, 0, 13, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 39, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
                [0, 0, 0, 13, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 26, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 113, 114, 115, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 126, 127, 128, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 65, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 65, 0, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [87, 88, 89, 90, 109, 110, 111, 112, 31, 32, 9, 10, 11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 84, 79, 80, 81, 82, 0, 0, 0, 0, 0, 0],
                [100, 101, 102, 103, 122, 123, 124, 125, 44, 45, 22, 23, 24, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 13, 13, 13, 13, 0, 13, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 187, 188, 189, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 13, 13, 13, 13, 0, 13, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 13, 39, 13, 13, 0, 13, 13, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 39, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 13, 39, 0, 39, 39, 0, 39, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 133, 134, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 133, 134, 135, 136],
                [146, 147, 146, 147, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 146, 147, 148, 149]
            ]
        }]
    };
    LevelNext4Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next5.js
ig.baked = true;
ig.module('game.levels.next5').requires('impact.image', 'game.entities.coin', 'game.entities.bigcoin', 'game.entities.jumper').defines(function () {
    LevelNext5 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 892,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 816,
            "y": 532
        }, {
            "type": "EntityCoin",
            "x": 776,
            "y": 564
        }, {
            "type": "EntityCoin",
            "x": 740,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 808,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 764,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 928,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 256,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 916,
            "y": 500
        }, {
            "type": "EntityCoin",
            "x": 292,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 864,
            "y": 508
        }, {
            "type": "EntityCoin",
            "x": 912,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 224,
            "y": 812
        }, {
            "type": "EntityBigcoin",
            "x": 1088,
            "y": 412
        }, {
            "type": "EntityCoin",
            "x": 852,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 872,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 832,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 788,
            "y": 832
        }, {
            "type": "EntityJumper",
            "x": 215,
            "y": 873
        }, {
            "type": "EntityJumper",
            "x": 399,
            "y": 809
        }, {
            "type": "EntityCoin",
            "x": 440,
            "y": 756
        }, {
            "type": "EntityCoin",
            "x": 404,
            "y": 756
        }, {
            "type": "EntityCoin",
            "x": 472,
            "y": 756
        }, {
            "type": "EntityBigcoin",
            "x": 544,
            "y": 260
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 14, 15, 1, 1, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 31, 32, 92, 93, 94, 95, 44, 45, 48, 49, 50, 51, 87, 88, 89, 90, 79, 80, 81, 82, 109, 110, 111, 112, 35, 36, 37, 38, 0, 0, 0, 0, 0, 0],
                [0, 0, 44, 45, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 100, 101, 102, 103, 92, 93, 94, 95, 122, 123, 124, 125, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 83, 84, 79, 80, 81, 82, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 96, 97, 92, 93, 94, 95, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 32, 79, 80, 81, 82, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 92, 93, 94, 95, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 187, 188, 189, 39, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 32, 85, 86, 0, 0, 0, 0, 0, 13, 0, 172, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 98, 99, 0, 0, 0, 0, 0, 13, 0, 172, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0],
                [0, 0, 33, 34, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 33, 34, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0],
                [0, 0, 46, 47, 0, 0, 0, 0, 0, 0, 0, 0, 46, 47, 46, 47, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172, 0, 0, 0, 0],
                [133, 134, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136],
                [146, 147, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149]
            ]
        }]
    };
    LevelNext5Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next6.js
ig.baked = true;
ig.module('game.levels.next6').requires('impact.image', 'game.entities.coin', 'game.entities.jumper', 'game.entities.bigcoin').defines(function () {
    LevelNext6 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 440,
            "y": 760
        }, {
            "type": "EntityJumper",
            "x": 651,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 464,
            "y": 760
        }, {
            "type": "EntityCoin",
            "x": 416,
            "y": 816
        }, {
            "type": "EntityBigcoin",
            "x": 928,
            "y": 604
        }, {
            "type": "EntityCoin",
            "x": 440,
            "y": 708
        }, {
            "type": "EntityCoin",
            "x": 464,
            "y": 708
        }, {
            "type": "EntityCoin",
            "x": 416,
            "y": 708
        }, {
            "type": "EntityCoin",
            "x": 136,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 104,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 72,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 464,
            "y": 816
        }, {
            "type": "EntityCoin",
            "x": 440,
            "y": 816
        }, {
            "type": "EntityCoin",
            "x": 416,
            "y": 760
        }, {
            "type": "EntityJumper",
            "x": 395,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 424,
            "y": 584
        }, {
            "type": "EntityCoin",
            "x": 392,
            "y": 584
        }, {
            "type": "EntityCoin",
            "x": 456,
            "y": 568
        }, {
            "type": "EntityCoin",
            "x": 328,
            "y": 552
        }, {
            "type": "EntityCoin",
            "x": 168,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 844,
            "y": 376
        }, {
            "type": "EntityCoin",
            "x": 892,
            "y": 404
        }, {
            "type": "EntityCoin",
            "x": 844,
            "y": 412
        }, {
            "type": "EntityCoin",
            "x": 860,
            "y": 416
        }, {
            "type": "EntityCoin",
            "x": 876,
            "y": 412
        }, {
            "type": "EntityCoin",
            "x": 828,
            "y": 404
        }, {
            "type": "EntityCoin",
            "x": 876,
            "y": 376
        }, {
            "type": "EntityCoin",
            "x": 488,
            "y": 552
        }, {
            "type": "EntityCoin",
            "x": 520,
            "y": 536
        }, {
            "type": "EntityCoin",
            "x": 264,
            "y": 568
        }, {
            "type": "EntityCoin",
            "x": 360,
            "y": 568
        }, {
            "type": "EntityCoin",
            "x": 296,
            "y": 552
        }, {
            "type": "EntityCoin",
            "x": 548,
            "y": 536
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 14, 15, 1, 1, 1, 1, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 14, 15, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 36, 37, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 1, 1, 36, 37, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [66, 67, 68, 69, 92, 93, 94, 95, 18, 19, 0, 0, 0, 101, 102, 103, 85, 86, 18, 19, 0, 13, 118, 119, 120, 121, 118, 119, 120, 121, 5, 6, 92, 93, 94, 95],
                [0, 0, 0, 13, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 98, 99, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 13, 18, 19, 13, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 26, 0, 0, 26, 0, 0, 0],
                [0, 0, 0, 13, 0, 0, 65, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 79, 80, 81, 82, 0, 0, 0],
                [0, 0, 0, 26, 0, 65, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 92, 93, 94, 95, 0, 0, 0],
                [0, 0, 0, 87, 88, 89, 90, 31, 32, 35, 36, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 100, 101, 102, 103, 44, 45, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 39, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 78, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 78, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 53, 54, 55, 56, 85, 86, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 47, 66, 67, 68, 69, 98, 99, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 36, 37, 38, 13, 13, 13, 39, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 49, 50, 51, 13, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 31, 32, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 26, 0, 0, 0],
                [0, 0, 44, 45, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 84, 31, 32, 85, 86, 0, 0, 0],
                [0, 0, 13, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 44, 45, 98, 99, 0, 0, 0],
                [0, 0, 13, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0],
                [0, 0, 13, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0],
                [0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136],
                [148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149]
            ]
        }]
    };
    LevelNext6Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next7.js
ig.baked = true;
ig.module('game.levels.next7').requires('impact.image', 'game.entities.coin', 'game.entities.bigcoin', 'game.entities.jumper').defines(function () {
    LevelNext7 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 120,
            "y": 760
        }, {
            "type": "EntityCoin",
            "x": 532,
            "y": 688
        }, {
            "type": "EntityCoin",
            "x": 320,
            "y": 668
        }, {
            "type": "EntityCoin",
            "x": 340,
            "y": 636
        }, {
            "type": "EntityCoin",
            "x": 564,
            "y": 672
        }, {
            "type": "EntityCoin",
            "x": 368,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 396,
            "y": 584
        }, {
            "type": "EntityCoin",
            "x": 156,
            "y": 756
        }, {
            "type": "EntityCoin",
            "x": 428,
            "y": 572
        }, {
            "type": "EntityCoin",
            "x": 192,
            "y": 760
        }, {
            "type": "EntityCoin",
            "x": 660,
            "y": 624
        }, {
            "type": "EntityCoin",
            "x": 756,
            "y": 576
        }, {
            "type": "EntityBigcoin",
            "x": 924,
            "y": 388
        }, {
            "type": "EntityCoin",
            "x": 280,
            "y": 812
        }, {
            "type": "EntityCoin",
            "x": 252,
            "y": 792
        }, {
            "type": "EntityCoin",
            "x": 224,
            "y": 772
        }, {
            "type": "EntityJumper",
            "x": 1039,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 628,
            "y": 640
        }, {
            "type": "EntityCoin",
            "x": 596,
            "y": 656
        }, {
            "type": "EntityCoin",
            "x": 692,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 724,
            "y": 592
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 14, 15, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 14, 15, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [87, 88, 89, 90, 92, 93, 94, 95, 79, 80, 81, 82, 31, 32, 122, 123, 124, 125, 0, 0, 70, 71, 0, 92, 93, 94, 95, 105, 106, 107, 108, 85, 86, 0, 0, 0],
                [100, 101, 102, 103, 13, 0, 13, 0, 92, 93, 94, 95, 44, 45, 13, 0, 0, 0, 0, 0, 13, 13, 0, 0, 13, 0, 13, 118, 119, 120, 121, 98, 99, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 13, 0, 0, 13, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 13, 0, 0, 13, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 26, 26, 0, 0, 0, 0, 0, 26, 26, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 31, 32, 0, 0, 0, 0, 0, 31, 32, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 44, 45, 0, 0, 0, 0, 0, 44, 45, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 13, 39, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 79, 80, 81, 82, 31, 32, 109, 110, 111, 112, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 92, 93, 94, 95, 44, 45, 122, 123, 124, 125, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 13, 0, 13, 13, 13, 0, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 13, 0, 0, 13, 13, 0, 0, 0, 13, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 13, 0, 0, 13, 13, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 0, 0, 0, 13, 39, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 0, 0, 0, 13, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 13, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 26, 0, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 87, 88, 89, 90, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 36, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 100, 101, 102, 103, 98, 99, 0, 0, 0, 0, 0, 0, 0, 61, 62, 63, 64, 85, 86, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 75, 76, 77, 98, 99, 0, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 154, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 142, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 61, 62, 63, 64, 31, 32, 33, 34, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0, 61, 62, 63, 64, 33, 34, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 74, 75, 76, 77, 44, 45, 46, 47, 0, 0, 0, 0, 0, 168, 0, 0, 0, 0, 74, 75, 76, 77, 46, 47, 141, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 135, 135, 136, 134, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136],
                [146, 147, 148, 149, 148, 148, 149, 147, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149]
            ]
        }]
    };
    LevelNext7Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next8.js
ig.baked = true;
ig.module('game.levels.next8').requires('impact.image', 'game.entities.coin', 'game.entities.jumper').defines(function () {
    LevelNext8 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 260,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 624,
            "y": 880
        }, {
            "type": "EntityCoin",
            "x": 792,
            "y": 728
        }, {
            "type": "EntityCoin",
            "x": 612,
            "y": 868
        }, {
            "type": "EntityCoin",
            "x": 580,
            "y": 880
        }, {
            "type": "EntityCoin",
            "x": 240,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 580,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 768,
            "y": 764
        }, {
            "type": "EntityCoin",
            "x": 756,
            "y": 800
        }, {
            "type": "EntityCoin",
            "x": 320,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 568,
            "y": 868
        }, {
            "type": "EntityCoin",
            "x": 592,
            "y": 868
        }, {
            "type": "EntityJumper",
            "x": 699,
            "y": 873
        }, {
            "type": "EntityCoin",
            "x": 280,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 300,
            "y": 856
        }, {
            "type": "EntityCoin",
            "x": 636,
            "y": 868
        }, {
            "type": "EntityCoin",
            "x": 624,
            "y": 856
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 0, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 87, 88, 89, 90, 31, 32, 79, 80, 81, 82, 18, 19, 0, 20, 21, 118, 119, 120, 121, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 100, 101, 102, 103, 44, 45, 92, 93, 94, 95, 0, 0, 0, 0, 13, 0, 13, 39, 39, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 13, 13, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 13, 13, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 31, 32, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 26, 0, 0, 44, 45, 141, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 90, 109, 110, 111, 112, 31, 32, 35, 36, 37, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 101, 102, 103, 122, 123, 124, 125, 44, 45, 48, 49, 50, 51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 39, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 33, 34, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 47, 46, 47, 0, 0, 0, 0, 0],
                [0, 0, 79, 80, 81, 82, 0, 0, 0, 0, 0, 0, 0, 53, 54, 55, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 79, 80, 81, 82, 0, 0, 0],
                [0, 0, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 66, 67, 68, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 47, 92, 93, 94, 95, 0, 0, 0],
                [133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136],
                [146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149]
            ]
        }]
    };
    LevelNext8Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next9.js
ig.baked = true;
ig.module('game.levels.next9').requires('impact.image', 'game.entities.coin', 'game.entities.bigcoin').defines(function () {
    LevelNext9 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 916,
            "y": 500
        }, {
            "type": "EntityCoin",
            "x": 160,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 776,
            "y": 564
        }, {
            "type": "EntityCoin",
            "x": 740,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 708,
            "y": 820
        }, {
            "type": "EntityCoin",
            "x": 240,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 810,
            "y": 820
        }, {
            "type": "EntityCoin",
            "x": 860,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 864,
            "y": 508
        }, {
            "type": "EntityCoin",
            "x": 816,
            "y": 532
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 660,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 760,
            "y": 860
        }, {
            "type": "EntityBigcoin",
            "x": 1016,
            "y": 476
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 90, 122, 123, 124, 125, 48, 49, 50, 51, 18, 19, 27, 28, 29, 30, 118, 119, 120, 121, 31, 32, 126, 127, 128, 129],
                [0, 0, 0, 0, 0, 0, 0, 0, 100, 101, 102, 103, 31, 32, 59, 60, 0, 0, 0, 0, 13, 0, 40, 41, 42, 43, 13, 0, 0, 13, 44, 45, 13, 13, 13, 13],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 72, 73, 0, 0, 0, 0, 13, 0, 13, 13, 13, 0, 13, 0, 0, 13, 0, 0, 13, 13, 0, 13],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 13, 13, 0, 0, 0, 0, 13, 0, 0, 13, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 39],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 13, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 13, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 26, 0, 0, 26, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 13, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 105, 106, 107, 108, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 39, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 118, 119, 120, 121, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 26, 0, 0, 26, 0, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 109, 110, 111, 112, 0, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 122, 123, 124, 125, 0, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 26, 0, 0, 0, 0, 13, 13, 0, 13, 0, 0, 0, 0, 0, 0, 13, 0, 39, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53, 54, 55, 56, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 67, 68, 69, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109, 110, 111, 112, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 122, 123, 124, 125, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 39, 13, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 156, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 34, 31, 32, 9, 10, 11, 12, 0, 0, 0, 0, 142, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 47, 44, 45, 22, 23, 24, 25, 0, 0, 0, 0, 142, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 31, 32, 0, 0, 0, 0, 0, 33, 34, 53, 54, 55, 56, 33, 34, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 44, 45, 0, 0, 0, 0, 0, 46, 47, 66, 67, 68, 69, 46, 47, 0, 0, 0, 0, 168, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 133, 134, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 133, 134, 135, 136, 135, 136, 133, 134, 135, 136],
                [146, 147, 148, 149, 146, 147, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 146, 147, 148, 149, 148, 149, 146, 147, 148, 149]
            ]
        }]
    };
    LevelNext9Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/next10.js
ig.baked = true;
ig.module('game.levels.next10').requires('impact.image', 'game.entities.coin', 'game.entities.bigcoin', 'game.entities.trap').defines(function () {
    LevelNext10 = {
        "entities": [{
            "type": "EntityCoin",
            "x": 760,
            "y": 804
        }, {
            "type": "EntityCoin",
            "x": 660,
            "y": 804
        }, {
            "type": "EntityCoin",
            "x": 780,
            "y": 580
        }, {
            "type": "EntityCoin",
            "x": 756,
            "y": 608
        }, {
            "type": "EntityCoin",
            "x": 736,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 812,
            "y": 804
        }, {
            "type": "EntityCoin",
            "x": 760,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 810,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 788,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 710,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 216,
            "y": 840
        }, {
            "type": "EntityCoin",
            "x": 660,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 952,
            "y": 548
        }, {
            "type": "EntityCoin",
            "x": 916,
            "y": 536
        }, {
            "type": "EntityCoin",
            "x": 836,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 808,
            "y": 556
        }, {
            "type": "EntityCoin",
            "x": 120,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 152,
            "y": 840
        }, {
            "type": "EntityBigcoin",
            "x": 856,
            "y": 636
        }, {
            "type": "EntityCoin",
            "x": 684,
            "y": 832
        }, {
            "type": "EntityCoin",
            "x": 708,
            "y": 804
        }, {
            "type": "EntityCoin",
            "x": 684,
            "y": 772
        }, {
            "type": "EntityCoin",
            "x": 832,
            "y": 772
        }, {
            "type": "EntityCoin",
            "x": 784,
            "y": 772
        }, {
            "type": "EntityCoin",
            "x": 732,
            "y": 772
        }, {
            "type": "EntityCoin",
            "x": 740,
            "y": 636
        }, {
            "type": "EntityCoin",
            "x": 844,
            "y": 540
        }, {
            "type": "EntityCoin",
            "x": 880,
            "y": 536
        }, {
            "type": "EntityCoin",
            "x": 184,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 248,
            "y": 860
        }, {
            "type": "EntityCoin",
            "x": 184,
            "y": 816
        }, {
            "type": "EntityCoin",
            "x": 488,
            "y": 168
        }, {
            "type": "EntityCoin",
            "x": 200,
            "y": 584
        }, {
            "type": "EntityCoin",
            "x": 528,
            "y": 184
        }, {
            "type": "EntityCoin",
            "x": 556,
            "y": 212
        }, {
            "type": "EntityCoin",
            "x": 580,
            "y": 248
        }, {
            "type": "EntityCoin",
            "x": 424,
            "y": 216
        }, {
            "type": "EntityCoin",
            "x": 448,
            "y": 184
        }, {
            "type": "EntityCoin",
            "x": 408,
            "y": 248
        }, {
            "type": "EntityTrap",
            "x": 880,
            "y": 880
        }, {
            "type": "EntityTrap",
            "x": 1024,
            "y": 240
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 36, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": true,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 92, 93, 94, 95, 27, 28, 29, 30, 0, 31, 32, 92, 93, 94, 95, 98, 99, 13, 0, 0, 13, 101, 102, 103, 44, 45, 79, 80, 81, 82, 5, 6, 0],
                [0, 0, 0, 0, 13, 13, 13, 40, 41, 42, 43, 0, 44, 45, 0, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 13, 92, 93, 94, 95, 18, 19, 0],
                [0, 0, 0, 0, 13, 13, 13, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 13, 13, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0],
                [0, 0, 0, 0, 13, 0, 13, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 39, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 26, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 65, 0, 78, 0, 0, 0, 0, 0, 0, 79, 80, 81, 82, 5, 6, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 87, 88, 89, 90, 85, 86, 0, 0, 0, 0, 0, 92, 93, 94, 95, 18, 19, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 0, 100, 101, 102, 103, 98, 99, 0, 0, 0, 0, 0, 0, 0, 13, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 53, 54, 55, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 66, 67, 68, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 0, 26, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 79, 80, 81, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0],
                [0, 0, 0, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 78, 0, 0],
                [0, 0, 0, 0, 0, 0, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 84, 31, 32, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 44, 45, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 32, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44, 45, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 189, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 28, 29, 30, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 41, 42, 43, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 33, 34, 0, 0, 0, 0, 0, 0, 31, 32, 33, 34, 33, 34, 31, 32, 0, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 46, 47, 0, 0, 0, 0, 0, 0, 44, 45, 46, 47, 46, 47, 44, 45, 0, 0, 0, 0, 168, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 133, 134, 133, 134, 135, 136, 135, 136, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136],
                [146, 147, 146, 147, 146, 147, 148, 149, 148, 149, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149]
            ]
        }]
    };
    LevelNext10Resources = [new ig.Image('media/main_spritesheet.png')];
});﻿

// lib/game/entities/butcher.js
ig.baked = true;
ig.module('game.entities.butcher').requires('impact.entity').defines(function () {
    EntityButcher = ig.Entity.extend({
        size: {
            x: 50,
            y: 114
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "butcher",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 260,
        zIndex: 2,
        haveChild: false,
        attack: false,
        stopTimer: null,
        animSheet: new ig.AnimationSheet('media/butcher/body.png', 144, 114),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('run', 30, [0]);
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        stopButcher: function () {
            this.stopTimer = new ig.Timer(15);
        },
        handleMovementTrace: function (res) {
            if (ig.game.gameOver == 0) {
                this.pos.x += this.speedRun * ig.system.tick;
            }
        },
        update: function () {
            if (this.stopTimer != null && this.stopTimer.delta() <= 0) {
                this.speedRun = 0;
            } else this.stopTimer = null; if (ig.game.player != null) {
                distX = ig.game.player.pos.x - this.pos.x;
                if (distX < 50) {
                    this.speedRun = 0;
                }
                if (ig.game.player != null && ig.game.player.pos.y + ig.game.screen.y < 1420 && this.speedRun > -10) {
                    this.speedRun = this.speedRun - 2;
                }
                this.currentAnim = this.anims.run;
                this.parent();
                if (this.haveChild == false) {
                    ig.game.spawnEntity(EntityLegs, this.pos.x, this.pos.y, {
                        target: this
                    });
                    ig.game.spawnEntity(EntityHand, this.pos.x, this.pos.y, {
                        target: this
                    });
                    this.haveChild = true;
                }
                var dist = this.distanceTo(ig.game.player);
                if (distX < 150) ig.game.jumpShow = true;
                if (distX < 70 && ig.game.player.pos.y + ig.game.screen.y > 1420) {
                    this.speedRun = 150 + (ig.game.distanceCoefficient * 10), this.disolve = 1;
                    this.attack = true;
                } else if (distX > 200 && ig.game.player.pos.y + ig.game.screen.y > 1420) {
                    this.speedRun = 300 + (ig.game.distanceCoefficient * 10);
                    this.attack = false;
                }
            }
            if (this.pos.x < -350) {
                this.pos.x = -350;
            }
        }
    });
    EntityHand = ig.Entity.extend({
        size: {
            x: 148,
            y: 90
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "butcher",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 260,
        zIndex: 4,
        haveChild: false,
        animSheet: new ig.AnimationSheet('media/butcher/hand.png', 148, 90),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 3, [0, 1]);
            this.addAnim('kill', 0.1, [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4]);
            this.currentAnim = this.anims.run;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            this.parent();
            this.pos.x = this.target.pos.x - 25;
            this.pos.y = this.target.pos.y + 40;
            if (this.target.attack == true) {
                this.currentAnim = this.anims.kill;
                var dist = this.distanceTo(ig.game.player);
                if (this.currentAnim.frame >= 3 && ig.game.player != null) {
                    if ((ig.game.player.pos.y + ig.game.screen.y) > 1412 && ig.game.player.standing && dist < 100) {
                        ig.game.player.hitKnife();
                    }
                }
            } else {
                this.currentAnim = this.anims.idle;
            }
        },
    });
    EntityLegs = ig.Entity.extend({
        size: {
            x: 83,
            y: 63
        },
        collides: ig.Entity.COLLIDES.NONE,
        type: ig.Entity.TYPE.A,
        name: "butcher",
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        disolve: 0,
        speedRun: 260,
        zIndex: 1,
        haveChild: false,
        animSheet: new ig.AnimationSheet('media/butcher/legs.png', 83, 63),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('run', 0.1, [0, 1, 2, 1]);
            this.addAnim('idle', 10, [1]);
            this.currentAnim = this.anims.run;
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        update: function () {
            this.parent();
            this.pos.x = this.target.pos.x - 10;
            this.pos.y = this.target.pos.y + 75;
            if (this.target.speedRun == 0) {
                this.currentAnim = this.anims.idle;
            } else {
                this.currentAnim = this.anims.run;
            }
        },
    });
});﻿

// lib/game/entities/piggy.js
ig.baked = true;
ig.module('game.entities.piggy').requires('impact.entity').defines(function () {
    EntityPiggy = ig.Entity.extend({
        size: {
            x: 80,
            y: 50
        },
        offset: {
            x: 13,
            y: 16
        },
        type: ig.Entity.TYPE.BOTH,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,
        name: 'player',
        thrust: 0.2,
        score: 0,
        jump: 470,
        speed: 250,
        state: 'walk',
        zIndex: 5,
        timerBoost: null,
        numberOfAnimation: 1,
        magnet: false,
        rocket: false,
        wings: false,
        shield: false,
        highJump: false,
        anvil: false,
        cofe: false,
        animSheet: new ig.AnimationSheet('media/pig.png', 96, 70),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.03, [0, 1, 2, 3]);
            this.addAnim('walk', 0.03, [12, 13, 14, 15, 16, 17, 18, 19]);
            this.addAnim('fast', 0.02, [12, 13, 14, 15, 16, 17, 18, 19]);
            this.addAnim('jump', 0.4, [9, 10], 1);
            this.addAnim('fall', 0.4, [10, 9, 18], 1);
            this.addAnim('rocket', 0.04, [4, 5, 6, 7]);
            this.addAnim('wings', 0.01, [20, 21, 22, 23]);
            this.maxVel.x = 5000;
            this.maxVel.y = 15000;
        },
        hitKnife: function () {
            if (ig.game.shieldActivated == true || this.rocket == true) {
                this.vel.y = -this.jump;
            } else{
                ig.game.gameOver = 1;
                SG_Hooks.gameOver(1, ig.game.score);
            }
        },
        analizePowerUps: function () {
            var activeBonusArray = ig.game.getActiveBonuses();
            this.magnet = false;
            this.rocket = false;
            this.wings = false;
            this.shield = false;
            this.hijump = false;
            this.anvil = false;
            this.coffee = false;
            if (activeBonusArray.length > 0) {
                for (var i = 0; i < activeBonusArray.length; i++) {
                    switch (activeBonusArray[i].name) {
                    case 'magnet':
                        this.magnet = true;
                        break;
                    case 'rocket':
                        this.rocket = true;
                        break;
                    case 'wings':
                        this.wings = true;
                        break;
                    case 'shield':
                        this.shield = true;
                        break;
                    case 'hijump':
                        this.hijump = true;
                        break;
                    case 'anvil':
                        this.anvil = true;
                        break;
                    case 'coffee':
                        this.coffee = true;
                        break;
                    default:
                    }
                }
            }
        },
        update: function () {
            if (ig.game.gameOver == 0) {
                if ((this.pos.x.toFixed(0) - this.last.x.toFixed(0)) > 0) {
                    ig.game.addScore(Math.floor((this.pos.x.toFixed(0) - this.last.x.toFixed(0)) * 2));
                }
                this.analizePowerUps();
                if (this.coffee == true) {
                    this.speed = 350;
                } else {
                    this.speed = 250;
                }
                if (this.hijump == true) {
                    this.jump = 600;
                } else {
                    this.jump = 470;
                }
                if (this.rocket == true) {
                    this.currentAnim = this.anims.rocket;
                    this.pos.x += 900 * ig.system.tick;
                    ig.game.addScore(Math.floor((this.pos.x.toFixed(0) * 1.88 - this.last.x.toFixed(0))));
                    if (this.standing && ig.input.pressed('click') && ig.game.blockJump == false) {
                        this.vel.y = -this.jump;
                    }
                } else if (this.wings == true) {
                    if (this.vel.x < this.speed) {
                        this.vel.x = this.speed;
                    }
                    this.currentAnim = this.anims.wings;
                    if (ig.input.pressed('click') && ig.game.blockJump == false && this.pos.y > 0) {
                        this.vel.y = -this.jump;
                    }
                } else {
                    if (this.vel.y < 0 && this.standing != true) {
                        this.currentAnim = this.anims.jump;
                    } else if (this.vel.y < 0 && this.standing == true)
                        this.currentAnim = this.anims.walk;
                    else if (this.vel.y > 0) {
                        this.currentAnim = this.anims.fall;
                        this.currentAnim.gotoFrame(0);
                    } else if (this.vel.x != 0) {
                        switch (this.numberOfAnimation) {
                        case 1:
                            this.currentAnim = this.anims.walk;
                            break;
                        case 2:
                            this.currentAnim = this.anims.rocket;
                            break;
                        case 3:
                            this.currentAnim = this.anims.wings;
                            break;
                        default:
                            this.currentAnim = this.anims.walk;
                            break;
                        }
                    } else if (this.vel.x == 0 && this.vel.y == 0) {
                        this.currentAnim = this.anims.idle;
                    }
                    if (this.standing && ig.input.pressed('click') && ig.game.blockJump == false && this.pos.y > 0) {
                        this.vel.y = -this.jump;
                    }
                    if (this.vel.x < this.speed) {
                        this.vel.x = this.speed;
                    }
                    if (this.pos.y > 2500) {
                        ig.game.gameOver = 1;
                        SG_Hooks.gameOver(1, ig.game.score);
                    }
                }
                if (this.vel.y > 0) {
                    this.vel.y += 20;
                }
                if (this.magnet == true) {
                    var allCoins = ig.game.getEntitiesByType(EntityCoin);
                    for (var i = 0; i < allCoins.length; i++) {
                        var dist = this.distanceTo(allCoins[i]);
                        if (dist < 300) {
                            var angle = this.angleTo(allCoins[i]);
                            allCoins[i].vel.x += (Math.cos(angle) * -1) * 20;
                            allCoins[i].vel.y += (Math.sin(angle) * -1) * 20;
                        }
                    }
                }
            }
            this.parent();
        }
    });
});

// lib/game/levels/Start.js
ig.baked = true;
ig.module('game.levels.Start').requires('impact.image', 'game.entities.butcher', 'game.entities.piggy').defines(function () {
    LevelStart = {
        "entities": [{
            "type": "EntityButcher",
            "x": -220,
            "y": 764
        }, {
            "type": "EntityPiggy",
            "x": 549,
            "y": 572
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 133, 133, 134, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136],
                [146, 147, 148, 149, 146, 146, 147, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149]
            ]
        }]
    };
    LevelStartResources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/intro.js
ig.baked = true;
ig.module('game.levels.intro').requires('impact.image', 'game.entities.butchintro', 'game.entities.pigintro').defines(function () {
    LevelIntro = {
        "entities": [{
            "type": "EntityButchintro",
            "x": 568,
            "y": 696
        }, {
            "type": "EntityPigintro",
            "x": 789,
            "y": 776
        }],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 133, 133, 134, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136],
                [146, 147, 148, 149, 146, 146, 147, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149],
                [159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159],
                [159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159]
            ]
        }]
    };
    LevelIntroResources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/levels/intro1.js
ig.baked = true;
ig.module('game.levels.intro1').requires('impact.image').defines(function () {
    LevelIntro1 = {
        "entities": [],
        "layer": [{
            "name": "collision",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "",
            "repeat": false,
            "preRender": false,
            "distance": 1,
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }, {
            "name": "level",
            "width": 36,
            "height": 30,
            "linkWithCollision": false,
            "visible": 1,
            "tilesetName": "media/main_spritesheet.png",
            "repeat": false,
            "preRender": false,
            "distance": "1",
            "tilesize": 32,
            "foreground": false,
            "data": [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [133, 134, 135, 136, 133, 133, 134, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136, 133, 134, 135, 136, 135, 136, 135, 136],
                [146, 147, 148, 149, 146, 146, 147, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149, 146, 147, 148, 149, 148, 149, 148, 149],
                [159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159],
                [159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159, 159]
            ]
        }]
    };
    LevelIntro1Resources = [new ig.Image('media/main_spritesheet.png')];
});

// lib/game/main.js
ig.baked = true;
ig.module('game.main').requires('impact.game', 'impact.font', 'impact.background-map', 'plugins.impact-splash-loader', 'plugins.screen-fader', 'plugins.impact-infinite', 'plugins.joncom.font-sugar.font', 'plugins.button', 'game.entities.parallax.near', 'game.entities.parallax.middle', 'game.entities.parallax.far', 'game.entities.cards', 'game.entities.bonus', 'game.entities.knife', 'game.entities.coin', 'game.entities.anvil', 'game.entities.shield', 'game.entities.pigintro', 'game.entities.butchintro', 'game.entities.bonusstripe', 'game.levels.next', 'game.levels.next1', 'game.levels.next2', 'game.levels.next3', 'game.levels.next4', 'game.levels.next5', 'game.levels.next6', 'game.levels.next7', 'game.levels.next8', 'game.levels.next9', 'game.levels.next10', 'game.levels.Start', 'game.levels.intro', 'game.levels.intro1').defines(function () {
    var myGameMode = 1;
    var bestScore = 0;
    var money = 0;
    var curScore = 0;
    var bestDistance = 0;
    var changeOrient = 0;
    var igmOrient = new ig.Image('media/plsrotate.png');
    var bonusBank = new Array();
    var activeBonuses = new Array();
    var casinoButton = null;
    var refreshButton = null;
    var selectBonusButton = null;
    var pauseButton = null;
    var casinoInGameButton = null;
    var resumeButton = null;
    var restartButton = null;
    var mainMenuButton = null;
    var moreGamesButton = null;
    var casinoRunButton = null;
    var playIntroButton = null;
    var moreIntroButton = null;
    var casinoInIntroButton = null;
    var hold1Button = null;
    var hold2Button = null;
    var hold3Button = null;
    var bonusCursor = -1;
    var bonusQuantity = -1;
    var tutorCasino = 0;
    var userLang = navigator.language || navigator.userLanguage;
    var gameLangs = ['en', 'de', 'es', 'pt', 'ru', 'tr'];
    var iFound = 0;
    for (var i = 0; i < gameLangs.length; i++) {
        if (userLang == gameLangs[i]) {
            iFound = 1;
            break;
        }
    }
    if (iFound == 0) {
        userLang = 'en';
    }
    fullscreen = function () {
        gameScreenResized();
    }, gameScreenResized = function () {
        var scale = {
            x: 1,
            y: 1
        };
        scale.x = (window.innerWidth) / canvas.width;
        scale.y = (window.innerHeight) / canvas.height;
        curScale = (window.innerHeight) / canvas.height;
		var curScale2 = (window.innerWidth) / canvas.width;
		curScale = curScale < curScale2 ? curScale : curScale2;
		//tom
        if (scale.x < 1 || scale.y < 1) {
            scale = '1, 1';
            curScale = 1;
        } else if (scale.x < scale.y) {
            scale = scale.x + ', ' + scale.x;
        } else {
            scale = scale.y + ', ' + scale.y;
        }
        canvas.setAttribute('style', 'transform: scale(' + scale + '); -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); ');
    };
    gameOrientationFunction = function () {
        var orientation = window.orientation;
        switch (orientation) {
        case 0:
            changeOrient = 1;
            break;
        case 90:
            changeOrient = 0;
            break;
        case -90:
            changeOrient = 0;
            break;
        }
    };
    addBonus = function (bonusName, time) {
        var wasFound = false;
        var newBonus = {
            name: bonusName,
            bonustime: time,
            quantity: 1
        };
        if (bonusBank.length > 0) {
            for (var i = 0; i < bonusBank.length; i++) {
                if (bonusBank[i].name == bonusName) {
                    bonusBank[i].quantity++;
                    wasFound = true;
                    break;
                }
            }
        }
        if (wasFound == false) {
            bonusBank.push(newBonus);
        }
    };
    activateBonus = function () {
        var wasFound = false;
        if (bonusCursor >= 0) {
            for (var i = 0; i < activeBonuses.length; i++) {
                if (activeBonuses[i].name == bonusBank[bonusCursor].name) {
                    wasFound = true;
                }
            }
            if (wasFound == false) {
                var activateBonus = ig.game.spawnEntity(EntityBonus, 10, 10, {
                    name: bonusBank[bonusCursor].name,
                    timeAlive: bonusBank[bonusCursor].bonustime
                });
                activeBonuses.push(activateBonus);
                if (activateBonus.name == "anvil") ig.game.dropAnvil = true;
                if (activateBonus.name == "shield") ig.game.shieldActivated = true;
            }
        }
    };
    activeBonusController = function () {
        var wasFound = false;
        if (bonusCursor >= 0) {
            for (var i = 0; i < activeBonuses.length; i++) {
                if (activeBonuses[i]._killed == true) {
                    if (activeBonuses[i].name == "shield") ig.game.shieldActivated = false;
                    for (var iter = 0; iter < bonusBank.length; iter++) {
                        if (bonusBank[iter].quantity > 1 && bonusBank[iter].name == activeBonuses[i].name) {
                            bonusBank[iter].quantity--;
                            break;
                        } else if (bonusBank[iter].quantity == 1 && bonusBank[iter].name == activeBonuses[i].name) {
                            bonusBank.splice(iter, 1);
                            break;
                        }
                    }
                    activeBonuses.splice(i, 1);
                }
            }
        }
    };
    refreshQuantitySign = function () {
        try {
            if (selectBonusButton != null) selectBonusButton.text[0] = bonusBank[bonusCursor].quantity;
        } catch (e) {
            selectBonusButton.text[0] = 0;
        }
    };
    selectBonusButtonAdd = function () {
        selectBonusButton = ig.game.spawnEntity(Button, 0, 0, {
            size: {
                x: 60,
                y: 60
            },
            animSheet: new ig.AnimationSheet('media/bonus_button.png', 60, 60),
            text: [bonusQuantity],
            textPos: {
                x: 55,
                y: 40
            },
            textAlign: ig.Font.ALIGN.LEFT,
            font: new ig.Font('media/04b03.font.png', {
                borderColor: '#49000B',
                borderSize: 1
            }),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                activateBonus();
            }
        });
    };
    refreshButtonAdd = function () {
        refreshButton = ig.game.spawnEntity(Button, 0, 0, {
            size: {
                x: 60,
                y: 60
            },
            animSheet: new ig.AnimationSheet('media/refresh.png', 60, 60),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                if (bonusBank.length > 0) {
                    bonusCursor++;
                    if (bonusCursor >= bonusBank.length) bonusCursor = 0;
                }
            }
        });
    };
    pauseButtonAdd = function () {
        pauseButton = ig.game.spawnEntity(Button, 2000, 2000, {
            size: {
                x: 34,
                y: 34
            },
            animSheet: new ig.AnimationSheet('media/pause_button.png', 34, 34),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                ig.game.gamePause = 1;
            }
        });
    };
    casinoInGameButtonAdd = function () {
        casinoInGameButton = ig.game.spawnEntity(Button, 2000, 2000, {
            size: {
                x: 126,
                y: 72
            },
            animSheet: new ig.AnimationSheet('media/casino_intro.png', 126, 72),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                tutorCasino = 1;
                SaveTutorSolution();
                ig.system.setGame(Casino);
            }
        });
    };
    resumeButtonAdd = function () {
        resumeButton = ig.game.spawnEntity(Button, 2000, 2000, {
            size: {
                x: 126,
                y: 72
            },
            animSheet: new ig.AnimationSheet('media/resume_button.png', 126, 72),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                ig.game.inGameMenuY = 350;
                this.pos.y = 5000;
                ig.game.gamePause = 0;
            }
        });
    };
    restartButtonAdd = function () {
        restartButton = ig.game.spawnEntity(Button, 2000, 2000, {
            size: {
                x: 126,
                y: 72
            },
            animSheet: new ig.AnimationSheet('media/restart_button.png', 126, 72),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                myGameMode = 1;
                ig.game.killActivatedBonuses();
                activeBonusController();
                ig.system.setGame(MyGame);
            }
        });
    };
    mainMenuButtonAdd = function () {
        mainMenuButton = ig.game.spawnEntity(Button, 2000, 2000, {
            size: {
                x: 126,
                y: 47
            },
            animSheet: new ig.AnimationSheet('media/mainmenu_in_game.png', 126, 47),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                ig.system.setGame(Intro);
            }
        });
    };
    moreGamesButtonAdd = function () {
        moreGamesButton = ig.game.spawnEntity(Button, 2000, 2000, {
            size: {
                x: 126,
                y: 47
            },
            animSheet: new ig.AnimationSheet('media/moregames_in_game.png', 126, 47),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                //window.location.href = "http://m.softgames.de";
                SG.redirectToPortal();
            }
        });
    };
    SaveMoney = function () {
        localStorage.setItem('runpigmoney', money);
    };
    SaveBestDistance = function () {
        localStorage.setItem('runpigdistance', bestDistance);
    };
    SaveBonuses = function () {
        localStorage.setItem('runpigBonuses', JSON.stringify(bonusBank));
    };
    SaveTutorSolution = function () {
        localStorage.setItem('tutorCasino', tutorCasino);
    };
    LoadStartPoint = function () {
        money = parseInt(localStorage.getItem('runpigmoney'));
		if (isNaN(money)) money = 0;
        bestDistance = parseInt(localStorage.getItem('runpigdistance'));
        bonusBank = localStorage.runpigBonuses ? JSON.parse(localStorage.runpigBonuses) : [];
        tutorCasino = parseInt(localStorage.getItem('tutorCasino'));
    };
    MyGame = ig.Game.extend({
        clearColor: null,
        player: null,
        butcher: null,
        font: new ig.Font('media/04b03.font.png', {
            borderColor: '#49000B',
            borderSize: 1
        }),
        tutorOverlay: new ig.Image('media/titles/' + userLang + '/casino_tutor.png'),
        gamerBack: new ig.Image('media/bg480_3201.png'),
        bonusIcons: new ig.Image('media/button_icons.png'),
        dangerSign: new ig.Image('media/danger.png'),
        menuSprite: new ig.Image('media/menu_spritesheet.png'),
        bestDistanceFont: new ig.Font('media/font_big.png'),
        curScale: 0,
        boostActivated: 0,
        gravity: 800,
        coins: 0,
        score: 0,
        boost: 0,
        gameOver: 0,
        gamePause: 0,
        activated: 0,
        distance: 0,
        distanceSign: 0,
        distanceInPixels: 0,
        bonusIconOffsetX: 0,
        bonusIconOffsetY: 0,
        bonusButtonY: 350,
        bonusButton1X: -80,
        bonusButton2X: 480,
        blockJump: false,
        dropAnvil: false,
        shieldActivated: false,
        shieldEntity: null,
        sectorX: 40,
        sectorY: 280,
        sectorStep: 0,
        dangerCounter: 0,
        dangerCounterThrow: 0,
        dangerY: 0,
        dangerScreenY: 0,
        needThrowKnife: false,
        throwKnife: false,
        targetFixed: false,
        shakeAmplitude: 0,
        infiniteLevel: null,
        inGameMenuY: 350,
        distanceCoefficient: 1,
        coeffStep: 300,
        activatedFader: 0,
        init: function () {
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.UP_ARROW, 'click');
            ig.input.bind(ig.KEY.SPACE, 'click');
            ig.input.bind(ig.KEY.NUMPAD_1, 'runner');
            ig.input.bind(ig.KEY.NUMPAD_2, 'rocketman');
            ig.input.bind(ig.KEY.NUMPAD_3, 'wings');
            if (myGameMode == 1) {
                this.activated = 0;
                this.infiniteLevel = new ig.InfiniteLevel([LevelNext, LevelNext1, LevelNext2, LevelNext3, LevelNext4, LevelNext5, LevelNext6, LevelNext7, LevelNext8, LevelNext9, LevelNext10], LevelStart);
                ig.game.screenFader = new ig.ScreenFader({
                    fade: 'out',
                    speed: 4.0
                });
            }
            SG_Hooks.start();
            //console.log("starts");
        },
        reloadLevel: function () {
            this.loadLevelDeferred(this.currentLevel);
        },
        addCoin: function (coins) {
            money += coins;
            SaveMoney();
        },
        getActiveBonuses: function () {
            return activeBonuses;
        },
        addScore: function (stepScore) {
            this.distanceInPixels += stepScore / 100;
            ig.game.score = Math.round(this.distanceInPixels);
            this.distance = ig.game.score;
        },
        recognizeBonusIcon: function () {
            if (bonusCursor > bonusBank.length - 1) bonusCursor = bonusBank.length - 1;
            if (bonusCursor > -1) var curBonusName = bonusBank[bonusCursor].name;
            else curBonusName = 'empty';
            switch (curBonusName) {
            case 'rocket':
                this.bonusIconOffsetX = 0;
                this.bonusIconOffsetY = 0;
                break;
            case 'shield':
                this.bonusIconOffsetX = 45;
                this.bonusIconOffsetY = 0;
                break;
            case 'wings':
                this.bonusIconOffsetX = 90;
                this.bonusIconOffsetY = 0;
                break;
            case 'magnet':
                this.bonusIconOffsetX = 135;
                this.bonusIconOffsetY = 0;
                break;
            case 'anvil':
                this.bonusIconOffsetX = 180;
                this.bonusIconOffsetY = 0;
                break;
            case 'coffee':
                this.bonusIconOffsetX = 0;
                this.bonusIconOffsetY = 45;
                break;
            case 'hijump':
                this.bonusIconOffsetX = 45;
                this.bonusIconOffsetY = 45;
                break;
            case 'empty':
                this.bonusIconOffsetX = 180;
                this.bonusIconOffsetY = 180;
                break;
            default:
                this.bonusIconOffsetX = 180;
                this.bonusIconOffsetY = 180;
                break;
            }
        },
        getTimingBonus: function () {
            var indexActiveBonus = null;
            if (bonusBank.length > 0) {
                if (bonusCursor == -1) bonusCursor = 1;
                var curNameBonusSelection = bonusBank[bonusCursor].name;
                if (activeBonuses.length > 0) {
                    for (var i = 0; i < activeBonuses.length; i++) {
                        if (activeBonuses[i].name == curNameBonusSelection) {
                            indexActiveBonus = i;
                        }
                    }
                }
                if (indexActiveBonus != null) {
                    this.sectorStep = (360 / (activeBonuses[indexActiveBonus].timeAlive * 1000)) * ((activeBonuses[indexActiveBonus].timeInWork * -1) * 1000);
                    this.sectorStep -= 90;
                } else {
                    this.sectorStep = null;
                }
            }
        },
        killActivatedBonuses: function () {
            for (var i = 0; i < activeBonuses.length; i++) {
                activeBonuses[i].kill();
            }
        },
        killActivatedBonusByName: function (bonusName) {
            for (var i = 0; i < activeBonuses.length; i++) {
                if (activeBonuses[i].name == bonusName) {
                    activeBonuses[i].kill();
                }
            }
        },
        updateDistanceCoefficient: function () {
            if (this.score < this.coeffStep) {
                this.distanceCoefficient = 1;
            } else {
                var curCoeff = this.score / this.coeffStep;
                if (curCoeff < 7) {
                    this.distanceCoefficient = curCoeff;
                } else this.distanceCoefficient = 7;
            }
        },
        goToCasino: function () {
            ig.system.setGame(Casino);
        },
        update: function () {
            this.curScale = curScale;
            if (ig.game.gamePause == 1 || ig.game.gameOver == 1) {
                this.inGameMenuY = 30;
                if (ig.game.gameOver == 1) {
                    if (casinoInGameButton == null) casinoInGameButtonAdd();
                    casinoInGameButton.pos.x = 95 + ig.game.screen.x;
                    casinoInGameButton.pos.y = this.inGameMenuY + 105 + ig.game.screen.y;
                    casinoInGameButton.update();
                    this.killActivatedBonuses();
                    activeBonusController();
                    SaveBonuses();
                    curScore = this.score;
                    
                    if (bestDistance < this.score) {
                        bestDistance = this.score;
                        SaveBestDistance();
                    }
                }
                if (ig.game.gamePause == 1) {
                    if (resumeButton == null) resumeButtonAdd();
                    resumeButton.pos.x = 95 + ig.game.screen.x;
                    resumeButton.pos.y = this.inGameMenuY + 105 + ig.game.screen.y;
                    resumeButton.update();
                }
                if (restartButton == null) restartButtonAdd();
                restartButton.pos.x = 255 + ig.game.screen.x;
                restartButton.pos.y = this.inGameMenuY + 105 + ig.game.screen.y;
                restartButton.update();
                if (mainMenuButton == null) mainMenuButtonAdd();
                mainMenuButton.pos.x = 95 + ig.game.screen.x;
                mainMenuButton.pos.y = this.inGameMenuY + 202 + ig.game.screen.y;
                mainMenuButton.update();
                if (moreGamesButton == null) moreGamesButtonAdd();
                moreGamesButton.pos.x = 255 + ig.game.screen.x;
                moreGamesButton.pos.y = this.inGameMenuY + 202 + ig.game.screen.y;
                moreGamesButton.update();
            } else {
                this.updateDistanceCoefficient();
                activeBonusController();
                refreshQuantitySign();
                this.recognizeBonusIcon();
                this.getTimingBonus();
                SaveBonuses();
                if (bonusCursor < 0) {
                    this.bonusButtonY += (350 - this.bonusButtonY) / 15;
                    this.bonusButton1X += (-80 - this.bonusButton1X) / 10;
                    this.bonusButton2X += (480 - this.bonusButton2X) / 10;
                } else {
                    this.bonusButton1X += (15 - this.bonusButton1X) / 10;
                    this.bonusButton2X += (400 - this.bonusButton2X) / 10;
                    this.bonusButtonY += (250 - this.bonusButtonY) / 15;
                }
                if (changeOrient == 0) {
                    this.parent();
                    this.player = this.getEntitiesByType(EntityPiggy)[0];
                    this.butcher = this.getEntitiesByType(EntityButcher)[0];
                    if (this.player != null) {
                        this.screen.x += ((this.player.pos.x - ig.system.width / 5) - this.screen.x) / 5;
                        this.screen.y += ((this.player.pos.y - ig.system.height / 3) - this.screen.y) / 5;
                        if (this.screen.y < 0) {
                            this.screen.y = 0;
                        }
                        if (this.screen.y > 630) {
                            this.screen.y = 630;
                        }
                    }
                    this.infiniteLevel.update();
                    var back1 = this.getEntitiesByType(EntityNear);
                    if (back1.length < 1) {
                        ig.game.spawnEntity(EntityNear, 0, 950);
                        ig.game.spawnEntity(EntityNear, 500 * 1.3, 950);
                    } else if (back1.length >= 1) {
                        for (i = 0; i < back1.length; i++) {
                            if ((back1[i].pos.x + back1[i].size.x) * back1[i].distance < -200) {
                                back1[i].pos.x += (back1[i].size.x * 2) * back1[i].distance;
                            }
                        }
                    }
                    var back2 = this.getEntitiesByType(EntityMiddle);
                    if (back2.length < 1) {
                        ig.game.spawnEntity(EntityMiddle, 0, 900);
                        ig.game.spawnEntity(EntityMiddle, 500 * 2, 900);
                    } else if (back2.length >= 1) {
                        for (i = 0; i < back2.length; i++) {
                            if ((back2[i].pos.x + back2[i].size.x) * back2[i].distance < -1000) {
                                back2[i].pos.x += (back2[i].size.x * 2) * back2[i].distance;
                            }
                        }
                    }
                    var back3 = this.getEntitiesByType(EntityFar);
                    if (back3.length < 1) {
                        ig.game.spawnEntity(EntityFar, 0, 870);
                        ig.game.spawnEntity(EntityFar, 500 * 4, 870);
                    } else if (back3.length >= 1) {
                        for (i = 0; i < back3.length; i++) {
                            if ((back3[i].pos.x + back3[i].size.x) * back3[i].distance < -6000) {
                                back3[i].pos.x += (back3[i].size.x * 2) * back3[i].distance;
                            }
                        }
                    }
                    if (bestDistance < this.score) {
                        bestDistance = this.score;
                        SaveBestDistance();
                    }
                    if (this.player != null && this.player.pos.y < 800) {
                        if (this.targetFixed == false) {
                            this.dangerScreenY = ig.game.screen.y;
                            this.dangerY = (this.player.pos.y + 25) - this.dangerScreenY;
                        } else {
                            ig.game.spawnEntity(EntityKnife, ig.game.screen.x, this.dangerY + this.dangerScreenY);
                            this.dangerCounter = 0;
                            this.dangerCounterThrow = 0;
                            this.throwKnife = false;
                            this.targetFixed = false;
                        }
                        this.dangerCounter++;
                        this.throwKnife = false;
                        this.needThrowKnife = true;
                    } else {
                        this.needThrowKnife = false;
                        this.dangerCounter = 0;
                    }
                    if (this.dropAnvil == true) {
                        if (this.butcher != null) {
                            ig.game.spawnEntity(EntityAnvil, ig.game.screen.x + this.butcher.pos.x, 300);
                            this.dropAnvil = false;
                        }
                    }
                    if (this.shieldActivated == true) {
                        if (this.shieldEntity == null) this.shieldEntity = ig.game.spawnEntity(EntityShield, this.player.pos.x, this.player.pos.y);
                    } else if (this.shieldEntity != null) {
                        this.shieldEntity.kill();
                        this.shieldEntity = null;
                    }
                    if (refreshButton == null) refreshButtonAdd();
                    refreshButton.pos.x = 410 + this.screen.x;
                    refreshButton.pos.y = this.bonusButtonY + this.screen.y;
                    refreshButton.update();
                    if (selectBonusButton == null) selectBonusButtonAdd();
                    selectBonusButton.pos.x = 10 + this.screen.x;
                    selectBonusButton.pos.y = this.bonusButtonY + this.screen.y;
                    selectBonusButton.update();
                    if (pauseButton == null) pauseButtonAdd();
                    pauseButton.pos.x = 223 + this.screen.x;
                    pauseButton.pos.y = 5 + this.screen.y;
                    pauseButton.update();
                    if (this.shakeAmplitude > 0) {
                        this.shakeAmplitude -= 0.2;
                        if (this.shakeAmplitude < 1) this.shakeAmplitude = 0;
                    }
                }
                this.blockJump = false;
            }
        },
        gameOverInit: function () {
            myGameMode = 0;
            ig.system.setGame(GameOver);
        },
        pad: function (number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        },
        draw: function () {
            if (changeOrient == 1) {
                igmOrient.draw(0, 0);
            } else {
                if (ig.game.gamePause == 1 || ig.game.gameOver == 1) {
                    this.parent();
                    this.menuSprite.draw(52, this.inGameMenuY);
                    if (ig.game.gameOver == 1 && casinoInGameButton != null) {
                        casinoInGameButton.draw();
                    }
                    if (ig.game.gamePause == 1 && resumeButton != null) {
                        resumeButton.draw();
                    }
                    if (restartButton != null) restartButton.draw();
                    if (mainMenuButton != null) mainMenuButton.draw();
                    if (moreGamesButton != null) moreGamesButton.draw();
                    this.bestDistanceFont.draw(this.pad(bestDistance, 6) + 'm', 163, this.inGameMenuY + 30, ig.Font.ALIGN.LEFT);
                    this.font.draw('Score: ' + this.pad(ig.game.score, 6) + 'm', 285, 3, ig.Font.ALIGN.LEFT);
                    this.font.draw('Best: ' + this.pad(bestDistance, 6) + 'm', 296, 22, ig.Font.ALIGN.LEFT);
                    this.font.draw('$' + this.pad(money, 6), 20, 5, ig.Font.ALIGN.LEFT);
                    if (tutorCasino == 0 && ig.game.gameOver == 1) {
                        this.tutorOverlay.draw(0, 0);
                    }
                } else {
                    ig.game.sortEntitiesDeferred();
                    this.gamerBack.draw(0, 0, 0, ig.game.screen.y, 480, 320);
                    var ctx = ig.system.context;
                    if (this.shakeAmplitude) {
                        ctx.save();
                        ctx.translate(this.shakeAmplitude * (Math.random() - 0.5), this.shakeAmplitude * (Math.random() - 0.5));
                    }
                    this.parent();
                    if (this.shakeAmplitude) {
                        ctx.restore();
                    }
                    if (this.needThrowKnife == true && this.dangerCounter > 175 / this.distanceCoefficient) {
                        this.dangerSign.draw(5, this.dangerY, 0, 0, 40, 35);
                        if (this.needThrowKnife == true && this.dangerCounter >= 195 / this.distanceCoefficient && this.player.standing && this.dangerCounterThrow <= 15 / this.distanceCoefficient) {
                            this.dangerSign.draw(5, this.dangerY, 40, 0, 40, 35);
                            this.dangerCounterThrow++;
                            if (this.dangerCounterThrow >= 15 / this.distanceCoefficient) this.targetFixed = true;
                        }
                    }
                    this.font.draw('Score: ' + this.pad(ig.game.score, 6) + 'm', 285, 3, ig.Font.ALIGN.LEFT);
                    this.font.draw('Best: ' + this.pad(bestDistance, 6) + 'm', 296, 22, ig.Font.ALIGN.LEFT);
                    this.font.draw('$' + this.pad(money, 6), 20, 5, ig.Font.ALIGN.LEFT);
                    if (refreshButton != null) refreshButton.draw();
                    if (selectBonusButton != null) selectBonusButton.draw();
                    if (pauseButton != null) pauseButton.draw();
                    if (bonusBank.length > 0) this.bonusIcons.draw(18, this.bonusButtonY + 7, this.bonusIconOffsetX, this.bonusIconOffsetY, 45, 45);
                    if (this.sectorStep != null && bonusCursor >= 0) {
                        var canvas = document.getElementById('canvas');
                        if (canvas.getContext) {
                            var ctx = canvas.getContext('2d');
                            ctx.beginPath();
                            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                            ctx.moveTo(this.sectorX, this.sectorY);
                            ctx.arc(this.sectorX, this.sectorY, 30, -(Math.PI / 180) * 90, this.sectorStep.toRad(), false);
                            ctx.lineTo(this.sectorX, this.sectorY);
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            }
            if (this.screenFader) {
                this.screenFader.draw();
            }
        },
        run: function () {
            this.update();
            this.draw();
        }
    });
    casinoButtonAdd = function () {
        casinoButton = ig.game.spawnEntity(Button, 117, 232, {
            size: {
                x: 150,
                y: 100
            },
            animSheet: new ig.AnimationSheet('media/casino_buttons.png', 150, 100),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {}
        });
    };
    casinoRunButtonAdd = function () {
        casinoRunButton = ig.game.spawnEntity(Button, 406, 69, {
            size: {
                x: 62,
                y: 173
            },
            animSheet: new ig.AnimationSheet('media/run_button.png', 62, 173),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                ig.system.setGame(MyGame);
            }
        });
    };
    HoldButtonAdd = function () {
        hold1Button = ig.game.spawnEntity(Button, 75, 165, {
            size: {
                x: 75,
                y: 20
            },
            animSheet: new ig.AnimationSheet('media/hold_button.png', 75, 20),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                if (ig.game.spine1.hold == true) {
                    money += 5;
                    ig.game.spine1.hold = false;
                } else {
                    money -= 5;
                    ig.game.spine1.hold = true;
                }
            }
        });
        hold2Button = ig.game.spawnEntity(Button, 157, 165, {
            size: {
                x: 75,
                y: 20
            },
            animSheet: new ig.AnimationSheet('media/hold_button.png', 75, 20),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                if (ig.game.spine2.hold == true) {
                    money += 5;
                    ig.game.spine2.hold = false;
                } else {
                    money -= 5;
                    ig.game.spine2.hold = true;
                }
            }
        });
        hold3Button = ig.game.spawnEntity(Button, 240, 165, {
            size: {
                x: 75,
                y: 20
            },
            animSheet: new ig.AnimationSheet('media/hold_button.png', 75, 20),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                if (ig.game.spine3.hold == true) {
                    money += 5;
                    ig.game.spine3.hold = false;
                } else {
                    money -= 5;
                    ig.game.spine3.hold = true;
                }
            }
        });
    };
    Casino = ig.Game.extend({
        clearColor: '#fff',
        bigCards: new ig.Image('media/titles/' + userLang + '/win_cards.png'),
        font: new ig.Font('media/led.font.png', {
            fontColor: '#F00'
        }),
        overlay: new ig.Image('media/powerups.png'),
        casinoInterface: new ig.Image('media/casino1.png'),
        curScale: 0,
        card1: null,
        card2: null,
        card3: null,
        spine1: null,
        spine2: null,
        spine3: null,
        bet: 25,
        startWin: false,
        startLoose: false,
        period: 0,
        periodOff: 0,
        oneTime: true,
        winCardOffset: [],
        bigCardPosXStart: -300,
        bigCardPosXStop: -300,
        tryCounter: 0,
        init: function () {
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.SPACE, 'click');
            this.card1 = ig.game.spawnEntity(EntityCards, 75, 75, {
                wait: 30
            });
            this.card2 = ig.game.spawnEntity(EntityCards, 160, 75, {
                wait: 20
            });
            this.card3 = ig.game.spawnEntity(EntityCards, 245, 75, {
                wait: 10
            });
            this.spine1 = ig.game.spawnEntity(EntityBonusstripe, 75, -813);
            this.spine2 = ig.game.spawnEntity(EntityBonusstripe, 158, -813);
            this.spine3 = ig.game.spawnEntity(EntityBonusstripe, 240, -813);
            this.card1.start = 1;
            SaveMoney();
            gameScreenResized();
            ig.game.screenFader = new ig.ScreenFader({
                fade: 'out',
                speed: 4.0
            });
        },
        showBigCard: function (numberPowerup) {
            switch (numberPowerup) {
            case 2:
                this.winCardOffset = [0, 0];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 3:
                this.winCardOffset = [250, 0];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 4:
                this.winCardOffset = [500, 0];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 5:
                this.winCardOffset = [0, 150];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 6:
                this.winCardOffset = [250, 150];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 7:
                this.winCardOffset = [500, 150];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 8:
                this.winCardOffset = [0, 300];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 9:
                this.winCardOffset = [250, 300];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 10:
                this.winCardOffset = [500, 300];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 11:
                this.winCardOffset = [0, 450];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            case 12:
                this.winCardOffset = [250, 450];
                this.bigCardPosXStart = 400;
                this.bigCardPosXStop = 72;
                break;
            }
        },
        wintest: function () {
            var curCard1 = this.spine1.current;
            var curCard2 = this.spine2.current;
            var curCard3 = this.spine3.current;
            var cratnost = 1;
            var someResult = 0;
            if (curCard1 == 2) curCard1 = 0;
            if (curCard2 == 2) curCard2 = 0;
            if (curCard3 == 2) curCard3 = 0;
            if (curCard1 == 0 && curCard2 == 0 && curCard3 == 0) return 2;
            if (curCard1 == 0 && curCard2 == 0 && curCard3 > 0) return curCard3;
            if (curCard1 > 0 && curCard2 == 0 || curCard1 == 0 && curCard2 > 0) {
                if (curCard1 > 0) someResult = curCard1;
                else someResult = curCard2; if (curCard3 > 0 && curCard3 == someResult || curCard3 == 0) {
                    return someResult;
                }
            }
            if (curCard1 > 0 && curCard2 > 0 && curCard1 == curCard2) {
                someResult = curCard1;
                if (curCard3 == 0 || curCard3 == someResult) return someResult;
            }
            return false;
        },
        controlHoldButtons: function () {
            var count = 0;
            if (this.spine1.vel.y != 0 || this.spine2.vel.y != 0 || this.spine3.vel.y != 0) {
                hold1Button.setState('deactive');
                hold2Button.setState('deactive');
                hold3Button.setState('deactive');
            } else {
                if (this.spine1.hold == true) {
                    hold1Button.setState('pressed');
                    count++;
                }
                if (this.spine2.hold == true) {
                    hold2Button.setState('pressed');
                    count++;
                }
                if (this.spine3.hold == true) {
                    hold3Button.setState('pressed');
                    count++;
                }
                if (count == 2 && hold1Button != null) {
                    if (this.spine1.hold == false) hold1Button.setState('deactive');
                    if (this.spine2.hold == false) hold2Button.setState('deactive');
                    if (this.spine3.hold == false) hold3Button.setState('deactive');
                } else if (hold1Button != null) {
                    if (this.spine1.hold == true) hold1Button.setState('pressed');
                    else hold1Button.setState('idle'); if (this.spine2.hold == true) hold2Button.setState('pressed');
                    else hold2Button.setState('idle'); if (this.spine3.hold == true) hold3Button.setState('pressed');
                    else hold3Button.setState('idle');
                }
                if (this.startWin == true || this.tryCounter == 0 && hold1Button != null) {
                    hold1Button.setState('deactive');
                    hold2Button.setState('deactive');
                    hold3Button.setState('deactive');
                }
            }
        },
        update: function () {
            this.controlHoldButtons();
            this.curScale = curScale;
            this.parent();
            if (casinoButton == null) {
                casinoButtonAdd();
            }
            casinoButton.update();
            if (casinoRunButton == null) {
                casinoRunButtonAdd();
            }
            casinoRunButton.update();
            if (hold1Button == null) {
                HoldButtonAdd();
            }
            hold1Button.update();
            hold2Button.update();
            hold3Button.update();
            this.bigCardPosXStart += (this.bigCardPosXStop - this.bigCardPosXStart) / 10;
            if (this.spine1.selected == 1 && this.spine2.selected == 1 && this.spine3.selected == 1) {
                switch (this.wintest()) {
                case 1:
                    if (this.oneTime == true) {
                        this.showBigCard(2);
                        this.oneTime = false;
                        addBonus('rocket', 10);
                    }
                    break;
                case 12:
                    if (this.oneTime == true) {
                        this.showBigCard(2);
                        this.oneTime = false;
                        addBonus('rocket', 10);
                    }
                    break;
                case 2:
                    if (this.oneTime == true) {
                        this.showBigCard(3);
                        money += this.bet;
                        this.oneTime = false;
                    }
                    break;
                case 3:
                    if (this.oneTime == true) {
                        this.showBigCard(4);
                        this.startWin = true;
                        this.oneTime = false;
                        addBonus('shield', 20);
                    }
                    break;
                case 4:
                    if (this.oneTime == true) {
                        this.showBigCard(5);
                        this.startWin = true;
                        this.oneTime = false;
                        addBonus('wings', 30);
                    }
                    break;
                case 5:
                    if (this.oneTime == true) {
                        this.showBigCard(6);
                        this.card1.current = this.card2.current = this.card3.current = 6;
                        this.startWin = true;
                        this.oneTime = false;
                        addBonus('magnet', 60);
                    }
                    break;
                case 6:
                    if (this.oneTime == true) {
                        this.showBigCard(7);
                        this.startWin = true;
                        money += 50;
                        this.oneTime = false;
                    }
                    break;
                case 7:
                    if (this.oneTime == true) {
                        this.showBigCard(8);
                        this.startWin = true;
                        money += 100;
                        this.oneTime = false;
                    }
                    break;
                case 8:
                    if (this.oneTime == true) {
                        this.showBigCard(9);
                        this.startWin = true;
                        money += 150;
                        this.oneTime = false;
                    }
                    break;
                case 9:
                    if (this.oneTime == true) {
                        this.showBigCard(10);
                        this.startWin = true;
                        addBonus('anvil', 1);
                        this.oneTime = false;
                    }
                    break;
                case 10:
                    if (this.oneTime == true) {
                        this.showBigCard(11);
                        this.startWin = true;
                        addBonus('coffee', 40);
                        this.oneTime = false;
                    }
                    break;
                case 11:
                    if (this.oneTime == true) {
                        this.showBigCard(12);
                        this.startWin = true;
                        addBonus('hijump', 40);
                        this.oneTime = false;
                    }
                    break;
                default:
                    if (this.oneTime == true) {
                        this.startLoose = true;
                        this.oneTime = false;
                    }
                    break;
                }
            }
            if (ig.input.pressed('click') && casinoButton._inButton() && money - this.bet >= 0 && this.spine1.selected == 1 && this.spine2.selected == 1 && this.spine3.selected == 1) {
                if (this.spine1.selected == 1 && this.spine2.selected == 1 && this.spine3.selected == 1) {
                    if (this.bigCardPosXStop != 400) this.bigCardPosXStop = -300;
                    if (this.spine1.hold == false) {
                        this.spine1.selected = null;
                        this.spine1.start = 1;
                    }
                    if (this.spine2.hold == false) {
                        this.spine2.selected = null;
                        this.spine2.start = 1;
                    }
                    if (this.spine3.hold == false) {
                        this.spine3.selected = null;
                        this.spine3.start = 1;
                    }
                    this.startLoose = false;
                    this.startWin = false;
                    money = money - this.bet;
                    SaveMoney();
                    SaveBonuses();
                    this.oneTime = true;
                    if (this.spine1.hold == true) this.spine1.hold = false;
                    if (this.spine2.hold == true) this.spine2.hold = false;
                    if (this.spine3.hold == true) this.spine3.hold = false;
                    this.tryCounter++;
                } else {
                    this.spine1.start = 1;
                    this.spine2.start = 1;
                    this.spine3.start = 1;
                }
            }
        },
        draw: function () {
            this.parent();
            this.casinoInterface.draw(0, 0);
            this.bigCards.draw(this.bigCardPosXStart, 12, this.winCardOffset[0], this.winCardOffset[1], 250, 150);
            this.font.draw('$' + this.pad(money, 6), 45, 199, ig.Font.ALIGN.LEFT);
            casinoButton.draw();
            casinoRunButton.draw();
            if (this.screenFader) {
                this.screenFader.draw();
            }
            hold1Button.draw();
            hold2Button.draw();
            hold3Button.draw();
        },
        pad: function (number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        },
        run: function () {
            this.update();
            this.draw();
        }
    });
    casinoInIntroButtonAdd = function () {
        casinoInIntroButton = ig.game.spawnEntity(Button, 181, 248, {
            size: {
                x: 126,
                y: 72
            },
            animSheet: new ig.AnimationSheet('media/casino_intro.png', 126, 72),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                ig.system.setGame(Casino);
            }
        });
    };
    playIntroButtonAdd = function () {
        playIntroButton = ig.game.spawnEntity(Button, 25, 248, {
            size: {
                x: 126,
                y: 72
            },
            animSheet: new ig.AnimationSheet('media/play_intro.png', 126, 72),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                ig.system.setGame(MyGame);
            }
        });
    };
    moreIntroButtonAdd = function () {
        moreIntroButton = ig.game.spawnEntity(Button, 248, 248, {
            size: {
                x: 126,
                y: 72
            },
            animSheet: new ig.AnimationSheet('media/more_games.png', 126, 72),
            pressedDown: function () {},
            pressed: function () {},
            pressedUp: function () {
                //window.location.href = "http://m.softgames.de";
                SG.redirectToPortal();
            }
        });
    };
    Intro = ig.Game.extend({
        clearColor: null,
        introTimer: null,
        title1: new ig.Image('media/titles/' + userLang + '/firstTitle.png'),
        title2: new ig.Image('media/titles/' + userLang + '/secondTitle.png'),
        title3: new ig.Image('media/titles/' + userLang + '/thirdTitle.png'),
        gamerBack: new ig.Image('media/bg480_3201.png'),
        gameLogo: new ig.Image('media/game_logo.png'),
        font: new ig.Font('media/04b03.font.png', {
            borderColor: '#49000B',
            borderSize: 1
        }),
        curTitle: 1,
        maxTitle: 3,
        activated: 0,
        gravity: 800,
        noNeedIntro: false,
        infiniteLevel: null,
        playerIntro: null,
        butcherIntro: null,
        init: function () {
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
            ig.input.bind(ig.KEY.SPACE, 'click');
            LoadStartPoint();
            if (money > 0 || bestDistance > 0) {
                this.noNeedIntro = true;
                this.infiniteLevel = new ig.InfiniteLevel([LevelIntro1], LevelIntro);
            } else {
                money = 0;
                bestDistance = 0;
            }
        },
        reloadLevel: function () {
            this.loadLevelDeferred(this.currentLevel);
        },
        update: function () {
            if (this.noNeedIntro == true) {
                this.curScale = curScale;
                this.playerIntro = this.getEntityByName("pigintro");
                if (this.playerIntro != null) {
                    this.screen.x += ((this.playerIntro.pos.x - ig.system.width / 1.8) - this.screen.x) / 5;
                    this.screen.y = 600;
                }
                this.infiniteLevel.update();
                this.parent();
                if (playIntroButton == null) playIntroButtonAdd();
                else {
                    playIntroButton.pos.x = ig.game.screen.x + 25;
                    playIntroButton.pos.y = ig.game.screen.y + 248;
                    playIntroButton.update();
                }
                if (casinoInIntroButton == null) casinoInIntroButtonAdd();
                else {
                    casinoInIntroButton.pos.x = ig.game.screen.x + 181;
                    casinoInIntroButton.pos.y = ig.game.screen.y + 248;
                    casinoInIntroButton.update();
                }
                if (moreIntroButton == null) moreIntroButtonAdd();
                else {
                    moreIntroButton.pos.x = ig.game.screen.x + 334;
                    moreIntroButton.pos.y = ig.game.screen.y + 248;
                    moreIntroButton.update();
                }
                var back1 = this.getEntitiesByType(EntityNear);
                if (back1.length < 1) {
                    ig.game.spawnEntity(EntityNear, 0, 950);
                    ig.game.spawnEntity(EntityNear, 500 * 1.3, 950);
                } else if (back1.length >= 1) {
                    for (i = 0; i < back1.length; i++) {
                        if ((back1[i].pos.x + back1[i].size.x) * back1[i].distance < -200) {
                            back1[i].pos.x += (back1[i].size.x * 2) * back1[i].distance;
                        }
                    }
                }
                var back2 = this.getEntitiesByType(EntityMiddle);
                if (back2.length < 1) {
                    ig.game.spawnEntity(EntityMiddle, 0, 900);
                    ig.game.spawnEntity(EntityMiddle, 500 * 2, 900);
                } else if (back2.length >= 1) {
                    for (i = 0; i < back2.length; i++) {
                        if ((back2[i].pos.x + back2[i].size.x) * back2[i].distance < -1000) {
                            back2[i].pos.x += (back2[i].size.x * 2) * back2[i].distance;
                        }
                    }
                }
                var back3 = this.getEntitiesByType(EntityFar);
                if (back3.length < 1) {
                    ig.game.spawnEntity(EntityFar, 0, 870);
                    ig.game.spawnEntity(EntityFar, 500 * 4, 870);
                } else if (back3.length >= 1) {
                    for (i = 0; i < back3.length; i++) {
                        if ((back3[i].pos.x + back3[i].size.x) * back3[i].distance < -6000) {
                            back3[i].pos.x += (back3[i].size.x * 2) * back3[i].distance;
                        }
                    }
                }
            } else if (ig.input.pressed('click') && this.activated == 0) {
                this.activated = 1;
                ig.game.screenFader = new ig.ScreenFader({
                    fade: 'in',
                    speed: 4.0,
                    callback: this.goToNextTitle
                });
            }
        },
        goToNextTitle: function () {
            if (this.curTitle > this.maxTitle) {
                myGameMode = 1;
                ig.system.setGame(MyGame);
            } else {
                ig.game.screenFader = new ig.ScreenFader({
                    fade: 'out',
                    speed: 6.0
                });
                this.curTitle++;
                this.activated = 0;
            }
        },
        pad: function (number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        },
        draw: function () {
            if (changeOrient == 1) {
                igmOrient.draw(0, 0);
            } else {
                if (this.noNeedIntro == true) {
                    ig.game.sortEntitiesDeferred();
                    this.gamerBack.draw(0, 0, 0, ig.game.screen.y, 480, 320);
                    this.parent();
                    this.gameLogo.draw(80, 20);
                    if (playIntroButton != null) playIntroButton.draw();
                    if (casinoInIntroButton != null) casinoInIntroButton.draw();
                    if (moreIntroButton != null) moreIntroButton.draw();
                    this.font.draw('$' + this.pad(money, 6), 20, 5, ig.Font.ALIGN.LEFT);
                    this.font.draw('Best: ' + this.pad(bestDistance, 6) + 'm', 300, 5, ig.Font.ALIGN.LEFT);
                } else {
                    switch (this.curTitle) {
                    case 1:
                        this.title1.draw(0, 0);
                        break;
                    case 2:
                        this.title2.draw(0, 0);
                        break;
                    case 3:
                        this.title3.draw(0, 0);
                        break;
                    default:
                        this.title1.draw(0, 0);
                        break;
                    }
                    if (this.screenFader) {
                        this.screenFader.draw();
                    }
                }
            }
        },
        run: function () {
            if (this.curTitle < 4) {
                this.update();
                this.draw();
            } else {
                myGameMode = 1;
                ig.system.setGame(MyGame);
            }
        }
    });
    GameOver = ig.Game.extend({
        titleGameOver: null,
        font: new ig.Font('media/04b03.font.png'),
        fontGold: new ig.Font('media/04b03.font.gold.png'),
        activated: 0,
        init: function () {
      
            ig.input.bind(ig.KEY.MOUSE1, 'next');
            ig.input.bind(ig.KEY.SPACE, 'next');
            SG_Hooks.gameOver(1, curScore);
            SG_Hooks.levelUp(1, curScore);
        },
        pad: function (number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        },
        update: function () {
            
            if (this.activated == 0) {
                this.activated = 1;
                ig.game.screenFader = new ig.ScreenFader({
                    fade: 'out',
                    speed: 4.0
                });
            }
            if (ig.input.pressed('next')) {
                ig.game.screenFader = new ig.ScreenFader({
                    fade: 'in',
                    speed: 4.0,
                    callback: this.playAgain
                });
            }
        },
        playAgain: function () {
            myGameMode = 1;
            ig.system.setGame(MyGame);
        },
        draw: function () {
            if (changeOrient == 1) {
                igmOrient.draw(0, 0);
            } else {
                this.titleGameOver.draw(0, 0);
                scoreLogo.draw(280, 150, 0, 0, 33, 33);
                scoreLogo.draw(280, 185, 33, 0, 33, 33);
                this.font.draw(this.pad(curScore, 8), 320, 150, ig.Font.ALIGN.LEFT);
                this.fontGold.draw(this.pad(bestScore, 8), 320, 185, ig.Font.ALIGN.LEFT);
                if (this.screenFader) {
                    this.screenFader.draw();
                }
            }
        },
        run: function () {
            this.update();
            this.draw();
        }
    });
    if (ig.ua.iPad || ig.ua.iPhone4) {
        ig.Sound.enabled = false;
        if (window.orientation == 0) changeOrient = 1;
        ig.main('#canvas', Intro, 60, 480, 320, 1, ig.loader);
    } else if (ig.ua.mobile) {
        ig.Sound.enabled = false;
        var width = window.innerWidth / 2;
        var height = window.innerHeight / 2;
        if (window.orientation == 0) changeOrient = 1;
        ig.main('#canvas', Intro, 60, 480, 320, 1, ig.loader);
    } else {
        ig.main('#canvas', Intro, 60, 480, 320, 1, ig.loader);
    }
});
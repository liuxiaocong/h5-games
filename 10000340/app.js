var cc = cc || {},
    ClassManager = {
        id: 0 | 998 * Math.random(),
        instanceId: 0 | 998 * Math.random(),
        compileSuper: function(a, b, c) {
            a = a.toString();
            var d = a.indexOf("("),
                e = a.indexOf(")"),
                d = a.substring(d + 1, e),
                d = d.trim(),
                e = a.indexOf("{"),
                f = a.lastIndexOf("}");
            for (a = a.substring(e + 1, f); - 1 != a.indexOf("this._super");) {
                var e = a.indexOf("this._super"),
                    f = a.indexOf("(", e),
                    g = a.indexOf(")", f),
                    g = a.substring(f + 1, g),
                    g = (g = g.trim()) ? "," : "";
                a = a.substring(0, e) + "ClassManager[" + c + "]." + b + ".call(this" + g + a.substring(f + 1)
            }
            return Function(d, a)
        },
        getNewID: function() {
            return this.id++
        },
        getNewInstanceId: function() {
            return this.instanceId++
        }
    };
ClassManager.compileSuper.ClassManager = ClassManager;
(function() {
    var a = /\b_super\b/,
        b = document.ccConfig && document.ccConfig.CLASS_RELEASE_MODE ? document.ccConfig.CLASS_RELEASE_MODE : null;
    b && console.log("release Mode");
    cc.Class = function() {};
    cc.Class.extend = function(c) {
        function d() {
            this.__instanceId = ClassManager.getNewInstanceId();
            this.ctor && this.ctor.apply(this, arguments)
        }
        var e = this.prototype,
            f = Object.create(e),
            g = ClassManager.getNewID();
        ClassManager[g] = e;
        var h = {
                writable: !0,
                enumerable: !1,
                configurable: !0
            },
            k;
        for (k in c) b && "function" == typeof c[k] && "function" ==
            typeof e[k] && a.test(c[k]) ? (h.value = ClassManager.compileSuper(c[k], k, g), Object.defineProperty(f, k, h)) : "function" == typeof c[k] && "function" == typeof e[k] && a.test(c[k]) ? (h.value = function(a, b) {
                return function() {
                    var c = this._super;
                    this._super = e[a];
                    var d = b.apply(this, arguments);
                    this._super = c;
                    return d
                }
            }(k, c[k]), Object.defineProperty(f, k, h)) : "function" == typeof c[k] ? (h.value = c[k], Object.defineProperty(f, k, h)) : f[k] = c[k];
        f.__instanceId = null;
        d.id = g;
        h.value = g;
        Object.defineProperty(f, "__pid", h);
        d.prototype = f;
        h.value =
            d;
        Object.defineProperty(d.prototype, "constructor", h);
        d.extend = cc.Class.extend;
        d.implement = function(a) {
            for (var b in a) f[b] = a[b]
        };
        return d
    };
    Function.prototype.bind = Function.prototype.bind || function(a) {
        var b = this;
        return function() {
            var e = Array.prototype.slice.call(arguments);
            return b.apply(a || null, e)
        }
    }
})();
cc.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a
};
cc.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (d.superClass_) return ret = d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
    for (var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor)
        if (g.prototype[b] === d) f = !0;
        else if (f) return g.prototype[b].apply(a, e);
    if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
    throw Error("cc.base called from a method of one name to a method of a different name");
};
cc.concatObjectProperties = function(a, b) {
    a || (a = {});
    for (var c in b) a[c] = b[c];
    return a
};
cc.Point = function(a, b) {
    1 === arguments.length ? (this.x = a.x, this.y = a.y) : (this.x = a || 0, this.y = b || 0)
};
cc._PointConst = function(a, b) {
    this._x = a || 0;
    this._y = b || 0;
    this.setX = function(a) {
        this._x = a
    };
    this.setY = function(a) {
        this._y = a
    }
};
cc._pConst = function(a, b) {
    return new cc._PointConst(a, b)
};
Object.defineProperties(cc._PointConst.prototype, {
    x: {
        get: function() {
            return this._x
        },
        set: function() {
            console.warn("Warning of _PointConst: Modification to const or private property is forbidden")
        },
        enumerable: !0
    },
    y: {
        get: function() {
            return this._y
        },
        set: function() {
            console.warn("Warning of _PointConst: Modification to const or private property is forbidden")
        },
        enumerable: !0
    }
});
cc.PointMake = function(a, b) {
    cc.log("cc.PointMake will be deprecated sooner or later. Use cc.p instead.");
    return new cc.Point(a, b)
};
cc.p = function(a, b) {
    return 1 === arguments.length ? {
        x: a.x,
        y: a.y
    } : {
        x: a || 0,
        y: b || 0
    }
};
cc._p = cc.p;
cc.PointZero = function() {
    return cc.p(0, 0)
};
cc.pointEqualToPoint = function(a, b) {
    return a && b ? a.x === b.x && a.y === b.y : !1
};
cc.Size = function(a, b) {
    1 === arguments.length ? (this.width = a.width, this.height = a.height) : (this.width = a || 0, this.height = b || 0)
};
cc._SizeConst = function(a, b) {
    this._width = a || 0;
    this._height = b || 0;
    this.setWidth = function(a) {
        this._width = a
    };
    this.setHeight = function(a) {
        this._height = a
    }
};
cc._sizeConst = function(a, b) {
    return new cc._SizeConst(a, b)
};
Object.defineProperties(cc._SizeConst.prototype, {
    width: {
        get: function() {
            return this._width
        },
        set: function() {
            console.warn("Warning of _SizeConst: Modification to const or private property is forbidden")
        },
        enumerable: !0
    },
    height: {
        get: function() {
            return this._height
        },
        set: function() {
            console.warn("Warning of _SizeConst: Modification to const or private property is forbidden")
        },
        enumerable: !0
    }
});
cc.SizeMake = function(a, b) {
    cc.log("cc.SizeMake will be deprecated sooner or later. Use cc.size instead.");
    return cc.size(a, b)
};
cc.size = function(a, b) {
    return 1 === arguments.length ? {
        width: a.width,
        height: a.height
    } : {
        width: a || 0,
        height: b || 0
    }
};
cc._size = cc.size;
cc.SizeZero = function() {
    return cc.size(0, 0)
};
cc._zeroConsts = {
    pointZero: cc._pConst(0, 0),
    sizeZero: cc._sizeConst(0, 0)
};
Object.defineProperties(cc, {
    POINT_ZERO: {
        get: function() {
            return cc._zeroConsts.pointZero
        }
    },
    SIZE_ZERO: {
        get: function() {
            return cc._zeroConsts.sizeZero
        }
    },
    RECT_ZERO: {
        get: function() {
            return cc.rect(0, 0, 0, 0)
        }
    }
});
cc.sizeEqualToSize = function(a, b) {
    return a && b ? a.width == b.width && a.height == b.height : !1
};
cc.Rect = function(a, b, c, d) {
    var e = arguments.length;
    if (4 === e) this._origin = new cc.Point(a || 0, b || 0), this._size = new cc.Size(c || 0, d || 0);
    else if (1 === e) this._origin = new cc.Point(a._origin.x, a._origin.y), this._size = new cc.Size(a._size.width, a._size.height);
    else if (0 === e) this._origin = new cc.Point(0, 0), this._size = new cc.Size(0, 0);
    else if (2 === e) this._origin = new cc.Point(a.x, a.y), this._size = new cc.Size(b.width, b.height);
    else throw "unknown argument type";
};
cc.RectMake = function(a, b, c, d) {
    cc.log("cc.RectMake will be deprecated sooner or later. Use cc.rect instead.");
    return cc.rect(a, b, c, d)
};
cc.rect = function(a, b, c, d) {
    var e = arguments.length;
    if (0 === e) return new cc.Rect(0, 0, 0, 0);
    if (1 === e) return new cc.Rect(a.x, a.y, a.width, a.height);
    if (2 === e) return new cc.Rect(a.x, a.y, b.width, b.height);
    if (4 === e) return new cc.Rect(a, b, c, d);
    throw "unknown argument type";
};
cc._rect = cc.rect;
cc.RectZero = function() {
    return cc.rect(0, 0, 0, 0)
};
cc.rectEqualToRect = function(a, b) {
    return a && b ? cc.pointEqualToPoint(a._origin, b._origin) && cc.sizeEqualToSize(a._size, b._size) : !1
};
cc._rectEqualToZero = function(a) {
    return a ? 0 === a.x && 0 === a.y && 0 === a.width && 0 === a.height : !1
};
cc.rectContainsRect = function(a, b) {
    return a && b ? !(a.x >= b.x || a.y >= b.y || a.x + a.width <= b.x + b.width || a.y + a.height <= b.y + b.height) : !1
};
cc.rectGetMaxX = function(a) {
    return a.x + a.width
};
cc.rectGetMidX = function(a) {
    return a.x + a.width / 2
};
cc.rectGetMinX = function(a) {
    return a.x
};
cc.rectGetMaxY = function(a) {
    return a.y + a.height
};
cc.rectGetMidY = function(a) {
    return a.y + a.height / 2
};
cc.rectGetMinY = function(a) {
    return a.y
};
cc.rectContainsPoint = function(a, b) {
    return b.x >= cc.rectGetMinX(a) && b.x <= cc.rectGetMaxX(a) && b.y >= cc.rectGetMinY(a) && b.y <= cc.rectGetMaxY(a)
};
cc.rectIntersectsRect = function(a, b) {
    return !(cc.rectGetMaxX(a) < cc.rectGetMinX(b) || cc.rectGetMaxX(b) < cc.rectGetMinX(a) || cc.rectGetMaxY(a) < cc.rectGetMinY(b) || cc.rectGetMaxY(b) < cc.rectGetMinY(a))
};
cc.rectOverlapsRect = function(a, b) {
    return !(a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y)
};
cc.rectUnion = function(a, b) {
    var c = cc.rect(0, 0, 0, 0);
    c.x = Math.min(a.x, b.x);
    c.y = Math.min(a.y, b.y);
    c.width = Math.max(a.x + a.width, b.x + b.width) - c.x;
    c.height = Math.max(a.y + a.height, b.y + b.height) - c.y;
    return c
};
cc.rectIntersection = function(a, b) {
    var c = cc.rect(Math.max(cc.rectGetMinX(a), cc.rectGetMinX(b)), Math.max(cc.rectGetMinY(a), cc.rectGetMinY(b)), 0, 0);
    c.width = Math.min(cc.rectGetMaxX(a), cc.rectGetMaxX(b)) - cc.rectGetMinX(c);
    c.height = Math.min(cc.rectGetMaxY(a), cc.rectGetMaxY(b)) - cc.rectGetMinY(c);
    return c
};
cc.Rect.prototype.getX = function() {
    return this._origin.x
};
cc.Rect.prototype.setX = function(a) {
    this._origin.x = a
};
cc.Rect.prototype.getY = function() {
    return this._origin.y
};
cc.Rect.prototype.setY = function(a) {
    this._origin.y = a
};
cc.Rect.prototype.getWidth = function() {
    return this._size.width
};
cc.Rect.prototype.setWidth = function(a) {
    this._size.width = a
};
cc.Rect.prototype.getHeight = function() {
    return this._size.height
};
cc.Rect.prototype.setHeight = function(a) {
    this._size.height = a
};
Object.defineProperties(cc.Rect.prototype, {
    x: {
        get: function() {
            return this.getX()
        },
        set: function(a) {
            this.setX(a)
        },
        enumerable: !0,
        configurable: !0
    },
    y: {
        get: function() {
            return this.getY()
        },
        set: function(a) {
            this.setY(a)
        },
        enumerable: !0,
        configurable: !0
    },
    width: {
        get: function() {
            return this.getWidth()
        },
        set: function(a) {
            this.setWidth(a)
        },
        enumerable: !0,
        configurable: !0
    },
    height: {
        get: function() {
            return this.getHeight()
        },
        set: function(a) {
            this.setHeight(a)
        },
        enumerable: !0,
        configurable: !0
    }
});
var sys = sys || {};
try {
    sys.localStorage = window.localStorage, window.localStorage.setItem("storage", ""), window.localStorage.removeItem("storage")
} catch (e$$12) {
    "SECURITY_ERR" !== e$$12.name && "QuotaExceededError" !== e$$12.name || console.log("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option"), sys.localStorage = function() {}
}
Object.defineProperties(sys, {
    capabilities: {
        get: function() {
            var a = {
                canvas: !0
            };
            cc.Browser.supportWebGL && (a.opengl = !0);
            void 0 !== document.documentElement.ontouchstart || window.navigator.msPointerEnabled ? a.touches = !0 : void 0 !== document.documentElement.onmouseup && (a.mouse = !0);
            void 0 !== document.documentElement.onkeyup && (a.keyboard = !0);
            if (window.DeviceMotionEvent || window.DeviceOrientationEvent) a.accelerometer = !0;
            return a
        },
        enumerable: !0,
        configurable: !0
    },
    os: {
        get: function() {
            var a = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ?
                !0 : !1,
                b = navigator.userAgent.match(/android/i) || navigator.platform.match(/android/i) ? !0 : !1,
                c = navigator.appVersion; - 1 != navigator.appVersion.indexOf("Win") ? c = "Windows" : a ? c = "iOS" : -1 != navigator.appVersion.indexOf("Mac") ? c = "OS X" : -1 != navigator.appVersion.indexOf("X11") ? c = "UNIX" : -1 != navigator.appVersion.indexOf("Linux") ? c = "Linux" : b && (c = "Android");
            return c
        },
        enumerable: !0,
        configurable: !0
    },
    platform: {
        get: function() {
            return "browser"
        },
        enumerable: !0,
        configurable: !0
    },
    version: {
        get: function() {
            return cc.ENGINE_VERSION
        },
        enumerable: !0,
        configurable: !0
    }
});
sys.garbageCollect = function() {};
sys.dumpRoot = function() {};
sys.restartVM = function() {};
cc.ENGINE_VERSION = "Cocos2d-html5-v2.2.2";
cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL = 0;
cc.DIRECTOR_STATS_POSITION = cc.p(0, 0);
cc.DIRECTOR_FPS_INTERVAL = 0.5;
cc.COCOSNODE_RENDER_SUBPIXEL = 1;
cc.SPRITEBATCHNODE_RENDER_SUBPIXEL = 1;
cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA = 0;
cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP = 0;
cc.TEXTURE_ATLAS_USE_VAO = 0;
cc.TEXTURE_NPOT_SUPPORT = 0;
cc.RETINA_DISPLAY_SUPPORT = 1;
cc.RETINA_DISPLAY_FILENAME_SUFFIX = "-hd";
cc.USE_LA88_LABELS = 1;
cc.SPRITE_DEBUG_DRAW = 0;
cc.SPRITEBATCHNODE_DEBUG_DRAW = 0;
cc.LABELBMFONT_DEBUG_DRAW = 0;
cc.LABELATLAS_DEBUG_DRAW = 0;
cc.IS_RETINA_DISPLAY_SUPPORTED = 1;
cc.DEFAULT_ENGINE = cc.ENGINE_VERSION + "-canvas";
cc.config = {
    platform: sys.platform
};
cc.dumpConfig = function() {
    for (var a in sys) cc.log(a + " \x3d " + sys[a])
};
cc.ENABLE_STACKABLE_ACTIONS = 1;
cc.ENABLE_GL_STATE_CACHE = 1;
cc.create3DContext = function(a, b) {
    for (var c = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], d = null, e = 0; e < c.length; ++e) {
        try {
            d = a.getContext(c[e], b)
        } catch (f) {}
        if (d) break
    }
    return d
};
cc.Browser = {};
cc.Browser.webglWhiteList = ["baidubrowser", "opera", "firefox", "chrome", "safari"];
cc.Browser.multipleAudioWhiteList = "baidubrowser opera firefox chrome safari ucbrowser qqbrowser mqqbrowser".split(" ");
(function() {
    cc.Browser.ua = navigator.userAgent.toLowerCase();
    cc.Browser.platform = navigator.platform.toLowerCase();
    cc.Browser.isMobile = -1 != cc.Browser.ua.indexOf("mobile") || -1 != cc.Browser.ua.indexOf("android");
    cc.Browser.type = function() {
        var a = cc.Browser.ua.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baiduboxapp|baidubrowser|maxthon|ie|opera|miuibrowser|firefox/) || cc.Browser.ua.match(/chrome|safari/);
        return a && 0 < a.length ? (a = a[0], "micromessenger" == a ? "wechat" : "safari" === a && null != cc.Browser.ua.match(/android.*applewebkit/) ?
            "androidbrowser" : a) : "unknow"
    }();
    cc.Browser.mode = "ie" == cc.Browser.type && document.documentMode;
    document.ccConfig || (document.ccConfig = {});
    cc._userRenderMode = parseInt(document.ccConfig.renderMode) || 0;
    var a = -1 == cc.Browser.webglWhiteList.indexOf(cc.Browser.type);
    1 === cc._userRenderMode || 0 === cc._userRenderMode && (cc.Browser.isMobile || a) ? cc.Browser.supportWebGL = !1 : (cc.Browser.supportWebGL = null != window.WebGLRenderingContext, a = document.createElement("Canvas"), a = cc.create3DContext(a, {
            stencil: !0,
            preserveDrawingBuffer: !0
        }),
        cc.Browser.supportWebGL = null != a);
    2 !== cc._userRenderMode || cc.Browser.supportWebGL || (cc.__renderDoesnotSupport = !0);
    var a = cc.Browser,
        b;
    try {
        b = new(window.AudioContext || window.webkitAudioContext || window.mozAudioContext) ? !0 : !1
    } catch (c) {
        b = !1
    }
    a.supportWebAudio = b;
    cc.Browser.openURL = function(a) {
        if (this.isMobile) {
            var b = cc.Director.getInstance().getWinSize(),
                c = b.width + "px",
                b = b.height + "px",
                g = cc.$new("div");
            g.style.backgroundColor = "#ffffff";
            g.style.width = c;
            g.style.height = b;
            g.style.zindex = 1E3;
            g.style.position = "absolute";
            g.style.top = "0px";
            g.style.left = "0px";
            g.id = "cocos2d-browser";
            var h = cc.$new("iframe");
            h.src = a;
            h.style.width = c;
            h.style.height = b;
            h.setAttribute("frameborder", "no");
            h.setAttribute("scrolling", "no");
            g.appendChild(h);
            h.onload = function() {
                var a = document.createElement("img");
                a.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5OERBMEM3OUQzRTMxMUUyODg2Q0RFNjU1QkU1RjlFQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5OERBMEM3QUQzRTMxMUUyODg2Q0RFNjU1QkU1RjlFQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4REEwQzc3RDNFMzExRTI4ODZDREU2NTVCRTVGOUVBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk4REEwQzc4RDNFMzExRTI4ODZDREU2NTVCRTVGOUVBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NwBuoAAAA/tJREFUeNrEWF0sW3EUb6+28zFhbGadsBaNhazV+kpDYhFWKRGWbHvwFV5IvPiIFw9evElEPEiWSUgsIWoIglhmUomPxj6aKC0zKVJjtPU5o9j5J7dLdbf33jKc5Jfc3v+v5/+755x7/j1lMoiNBRDh4AO88HvO2m+ACbAC+AJQAyz2JCbBFyMBWQA/xv+3DUAXLuivudhcY4BMwCuAB+NqDPmNAnAAOsCZvQgk4BnjeiwEwAbM2YoQA14yrteQEANgDcML7gXjZgw9OAuJkADu3JAIb7Q/hr+GtCwuLs6LDq+iooLvhBAREhFEl11ZWRne0tIiIeNIpVKv4uJi4dTUVApNt0EY3ohILSIiwqO7u1sql8vD8vLyJJ2dnXH2HDabzczPz3/Y1taWzOfz78XExDxSq9Vyd3d3jMK9F2pWr6lEtLa2RmVnZ4tt7w0NDWlTU1OVtkK7urqSQ0NDzzW5hYWFjcTExAGDwXDkyD+VSkZ7e3tsWlpamP19mUwWplQqk9B1UlKST3NzczxE4K49D4mCiDwn24PyPMjIyHjs6urKIVpLSEgInp6eZsM6Kzw8nEvEMZvNBxC1BbI9KCMhkUgUy8vLRpL1QIFA4EcSyZmcnJzpS4mYnZ3dj46O7p2fn193xIGi/CeiFovlFIp5pqGhYZ5qD1qFiQxCjk1OTsqEQmEAFReloL+/X0sVAadFWE2n02VA+O+TcVZXV01QkO8ODw9P6fjEnO2zvb2936g4XC7XG4rWm65P2iL8/f05kN8nBQUFQkqnGMYcGBjIys3N5dLxjY7ydDrE6urqsNLSUqmbmxuH1tOBkMzMTIHRaNxSqVTmS4soKyvjFRUViTw9PV2dTR901WAOh7M/MjKyeeHCbGpqEhcWFkY5Wl9aWtpUKBRaONziSbsii/Xm5OTk7EIdU6/X7zpaW1xc/Al5HxkfH9/e2dk5rqmpeUrE6+vr06ADzpEIlI5kMjFwPhh5PB5DJBKdK7KDg4Oj2tpaVUdHxw/0eWxszIjyj8Jvy4N60FdVVX2Grnt4dkaowYJESAG3yaLR09Oz5uvrexwbGxuAR2erpKTkI6RqxW5DM6RnLT09PQQV5vDwsDYlJWUU+I4EIDMhEQLAA6q0DA4OrqMCg/c/qL6+XtXY2Kgn4sGJuavRaFbFYrFPeXn5FIj6ReFa64KnIpJOpaMK39vbM9XV1X13lF9kc3Nz+xMTEwZo89s03A4ycRE1N/RjF/WPKgyfDRU39Gu7w1qYyNYAtwDB1yhgGPDBfgzU4bMi7xoEjAI6iWZRdGMGH80Cr2goRlP5W8B7qwBHfw1YO6kEH4yC8EnJ5QKbnuDFh17nr4BPRP9P/BFgAHo7ZNgI9EbHAAAAAElFTkSuQmCC";
                g.appendChild(a);
                a.style.zindex = 1E3;
                a.style.position = "absolute";
                a.style.bottom = "10px";
                a.style.right = "10px";
                a.onclick = function() {
                    g.remove()
                }
            };
            (a = document.getElementById(document.ccConfig.tag).parentNode) && a.appendChild(g)
        } else window.open(a)
    }
})();
cc.RenderDoesnotSupport = function() {
    return "undefined" === cc.__renderDoesnotSupport ? !1 : cc.__renderDoesnotSupport
};
cc.$ = function(a) {
    var b = this == cc ? document : this;
    if (a = a instanceof HTMLElement ? a : b.querySelector(a)) a.find = a.find || cc.$, a.hasClass = a.hasClass || function(a) {
            return this.className.match(RegExp("(\\s|^)" + a + "(\\s|$)"))
        }, a.addClass = a.addClass || function(a) {
            this.hasClass(a) || (this.className && (this.className += " "), this.className += a);
            return this
        }, a.removeClass = a.removeClass || function(a) {
            this.hasClass(a) && (this.className = this.className.replace(a, ""));
            return this
        }, a.remove = a.remove || function() {
            this.parentNode &&
                this.parentNode.removeChild(this);
            return this
        }, a.appendTo = a.appendTo || function(a) {
            a.appendChild(this);
            return this
        }, a.prependTo = a.prependTo || function(a) {
            a.childNodes[0] ? a.insertBefore(this, a.childNodes[0]) : a.appendChild(this);
            return this
        }, a.transforms = a.transforms || function() {
            this.style[cc.$.trans] = cc.$.translate(this.position) + cc.$.rotate(this.rotation) + cc.$.scale(this.scale) + cc.$.skew(this.skew);
            return this
        }, a.position = a.position || {
            x: 0,
            y: 0
        }, a.rotation = a.rotation || 0, a.scale = a.scale || {
            x: 1,
            y: 1
        }, a.skew =
        a.skew || {
            x: 0,
            y: 0
        }, a.translates = function(a, b) {
            this.position.x = a;
            this.position.y = b;
            this.transforms();
            return this
        }, a.rotate = function(a) {
            this.rotation = a;
            this.transforms();
            return this
        }, a.resize = function(a, b) {
            this.scale.x = a;
            this.scale.y = b;
            this.transforms();
            return this
        }, a.setSkew = function(a, b) {
            this.skew.x = a;
            this.skew.y = b;
            this.transforms();
            return this
        };
    return a
};
switch (cc.Browser.type) {
    case "firefox":
        cc.$.pfx = "Moz";
        cc.$.hd = !0;
        break;
    case "chrome":
    case "safari":
        cc.$.pfx = "webkit";
        cc.$.hd = !0;
        break;
    case "opera":
        cc.$.pfx = "O";
        cc.$.hd = !1;
        break;
    case "ie":
        cc.$.pfx = "ms";
        cc.$.hd = !1;
        break;
    default:
        cc.$.pfx = "webkit", cc.$.hd = !0
}
cc.$.trans = cc.$.pfx + "Transform";
cc.$.translate = cc.$.hd ? function(a) {
    return "translate3d(" + a.x + "px, " + a.y + "px, 0) "
} : function(a) {
    return "translate(" + a.x + "px, " + a.y + "px) "
};
cc.$.rotate = cc.$.hd ? function(a) {
    return "rotateZ(" + a + "deg) "
} : function(a) {
    return "rotate(" + a + "deg) "
};
cc.$.scale = function(a) {
    return "scale(" + a.x + ", " + a.y + ") "
};
cc.$.skew = function(a) {
    return "skewX(" + -a.x + "deg) skewY(" + a.y + "deg)"
};
cc.$new = function(a) {
    return cc.$(document.createElement(a))
};
cc.$.findpos = function(a) {
    var b = 0,
        c = 0;
    do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
    return {
        x: b,
        y: c
    }
};
cc.clone = function(a) {
    var b = a.constructor ? new a.constructor : {},
        c;
    for (c in a) {
        var d = a[c];
        b[c] = "object" != typeof d || !d || d instanceof cc.Node || d instanceof HTMLElement ? d : cc.clone(d)
    }
    return b
};
cc.associateWithNative = function(a, b) {};
cc.IS_SHOW_DEBUG_ON_PAGE = cc.IS_SHOW_DEBUG_ON_PAGE || !1;
cc._logToWebPage = function(a) {
    var b = document.getElementById("logInfoList");
    if (!b) {
        var c = document.createElement("Div");
        c.setAttribute("id", "logInfoDiv");
        cc.canvas.parentNode.appendChild(c);
        c.setAttribute("width", "200");
        c.setAttribute("height", cc.canvas.height);
        c.style.zIndex = "99999";
        c.style.position = "absolute";
        c.style.top = "0";
        c.style.left = "0";
        b = document.createElement("ul");
        c.appendChild(b);
        b.setAttribute("id", "logInfoList");
        b.style.height = cc.canvas.height + "px";
        b.style.color = "#fff";
        b.style.textAlign =
            "left";
        b.style.listStyle = "disc outside";
        b.style.fontSize = "12px";
        b.style.fontFamily = "arial";
        b.style.padding = "0 0 0 20px";
        b.style.margin = "0";
        b.style.textShadow = "0 0 3px #000";
        b.style.zIndex = "99998";
        b.style.position = "absolute";
        b.style.top = "0";
        b.style.left = "0";
        b.style.overflowY = "hidden";
        var d = document.createElement("Div");
        c.appendChild(d);
        d.style.width = "200px";
        d.style.height = cc.canvas.height + "px";
        d.style.opacity = "0.1";
        d.style.background = "#fff";
        d.style.border = "1px solid #dfdfdf";
        d.style.borderRadius = "8px"
    }
    c =
        document.createElement("li");
    c.innerHTML = a;
    0 == b.childNodes.length ? b.appendChild(c) : b.insertBefore(c, b.childNodes[0])
};
cc.log = function(a) {
    cc.IS_SHOW_DEBUG_ON_PAGE ? cc._logToWebPage(a) : console.log.apply(console, arguments)
};
cc.MessageBox = function(a) {
    console.log(a)
};
cc.Assert = function(a, b) {
    console.assert ? console.assert(a, b) : a || b && alert(b)
};
cc.initDebugSetting = function() {
    0 == cc.COCOS2D_DEBUG ? (cc.log = function() {}, cc.logINFO = function() {}, cc.logERROR = function() {}, cc.Assert = function() {}) : 1 == cc.COCOS2D_DEBUG ? (cc.logINFO = cc.log, cc.logERROR = function() {}) : 1 < cc.COCOS2D_DEBUG && (cc.logINFO = cc.log, cc.logERROR = cc.log)
};
cc.LANGUAGE_ENGLISH = 0;
cc.LANGUAGE_CHINESE = 1;
cc.LANGUAGE_FRENCH = 2;
cc.LANGUAGE_ITALIAN = 3;
cc.LANGUAGE_GERMAN = 4;
cc.LANGUAGE_SPANISH = 5;
cc.LANGUAGE_RUSSIAN = 6;
cc.LANGUAGE_KOREAN = 7;
cc.LANGUAGE_JAPANESE = 8;
cc.LANGUAGE_HUNGARIAN = 9;
cc.LANGUAGE_PORTUGUESE = 10;
cc.LANGUAGE_ARABIC = 11;
cc.LANGUAGE_NORWEGIAN = 12;
cc.LANGUAGE_POLISH = 13;
cc.KEY = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    pause: 19,
    capslock: 20,
    escape: 27,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    insert: 45,
    Delete: 46,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    num0: 96,
    num1: 97,
    num2: 98,
    num3: 99,
    num4: 100,
    num5: 101,
    num6: 102,
    num7: 103,
    num8: 104,
    num9: 105,
    "*": 106,
    "+": 107,
    "-": 109,
    numdel: 110,
    "/": 111,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    numlock: 144,
    scrolllock: 145,
    semicolon: 186,
    ",": 186,
    equal: 187,
    "\x3d": 187,
    ";": 188,
    comma: 188,
    dash: 189,
    ".": 190,
    period: 190,
    forwardslash: 191,
    grave: 192,
    "[": 219,
    openbracket: 219,
    "]": 221,
    closebracket: 221,
    backslash: 220,
    quote: 222,
    space: 32
};
cc.FMT_JPG = 0;
cc.FMT_PNG = 1;
cc.FMT_TIFF = 2;
cc.FMT_RAWDATA = 3;
cc.FMT_WEBP = 4;
cc.FMT_UNKNOWN = 5;
cc.getImageFormatByData = function(a) {
    return 8 < a.length && 137 == a[0] && 80 == a[1] && 78 == a[2] && 71 == a[3] && 13 == a[4] && 10 == a[5] && 26 == a[6] && 10 == a[7] ? cc.FMT_PNG : 2 < a.length && (73 == a[0] && 73 == a[1] || 77 == a[0] && 77 == a[1] || 255 == a[0] && 216 == a[1]) ? cc.FMT_TIFF : cc.FMT_UNKNOWN
};
var CCNS_REG1 = /^\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*$/,
    CCNS_REG2 = /^\s*\{\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*,\s*\{\s*([\-]?\d+[.]?\d*)\s*,\s*([\-]?\d+[.]?\d*)\s*\}\s*\}\s*$/;
cc.RectFromString = function(a) {
    return (a = CCNS_REG2.exec(a)) ? cc.rect(parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]), parseFloat(a[4])) : cc.RectZero()
};
cc.PointFromString = function(a) {
    return (a = CCNS_REG1.exec(a)) ? cc.p(parseFloat(a[1]), parseFloat(a[2])) : cc.PointZero()
};
cc.SizeFromString = function(a) {
    return (a = CCNS_REG1.exec(a)) ? cc.size(parseFloat(a[1]), parseFloat(a[2])) : cc.SizeZero()
};
cc.INVALID_INDEX = -1;
cc.PI = Math.PI;
cc.FLT_MAX = parseFloat("3.402823466e+38F");
cc.RAD = cc.PI / 180;
cc.DEG = 180 / cc.PI;
cc.UINT_MAX = 4294967295;
cc.SWAP = function(a, b, c) {
    if ("object" == typeof c && "undefined" != typeof c.x && "undefined" != typeof c.y) {
        var d = c[a];
        c[a] = c[b];
        c[b] = d
    } else cc.log("cc.SWAP is being modified from original macro, please check usage")
};
cc.lerp = function(a, b, c) {
    return a + (b - a) * c
};
cc.RANDOM_MINUS1_1 = function() {
    return 2 * (Math.random() - 0.5)
};
cc.RANDOM_0_1 = function() {
    return Math.random()
};
cc.DEGREES_TO_RADIANS = function(a) {
    return a * cc.RAD
};
cc.RADIANS_TO_DEGREES = function(a) {
    return a * cc.DEG
};
cc.REPEAT_FOREVER = Number.MAX_VALUE - 1;
cc.BLEND_SRC = cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? 1 : 770;
cc.BLEND_DST = 771;
cc.NODE_DRAW_SETUP = function(a) {
    a._shaderProgram && (a._shaderProgram.use(), a._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4())
};
cc.ENABLE_DEFAULT_GL_STATES = function() {};
cc.DISABLE_DEFAULT_GL_STATES = function() {};
cc.INCREMENT_GL_DRAWS = function(a) {
    cc.g_NumberOfDraws += a
};
cc.FLT_EPSILON = 1.192092896E-7;
cc.CONTENT_SCALE_FACTOR = cc.IS_RETINA_DISPLAY_SUPPORTED ? function() {
    return cc.Director.getInstance().getContentScaleFactor()
} : function() {
    return 1
};
cc.POINT_POINTS_TO_PIXELS = function(a) {
    var b = cc.CONTENT_SCALE_FACTOR();
    return cc.p(a.x * b, a.y * b)
};
cc._POINT_POINTS_TO_PIXELS_OUT = function(a, b) {
    var c = cc.CONTENT_SCALE_FACTOR();
    b._x = a.x * c;
    b._y = a.y * c
};
cc.SIZE_POINTS_TO_PIXELS = function(a) {
    var b = cc.CONTENT_SCALE_FACTOR();
    return cc.size(a.width * b, a.height * b)
};
cc.SIZE_PIXELS_TO_POINTS = function(a) {
    var b = cc.CONTENT_SCALE_FACTOR();
    return cc.size(a.width / b, a.height / b)
};
cc._SIZE_PIXELS_TO_POINTS_OUT = function(a, b) {
    var c = cc.CONTENT_SCALE_FACTOR();
    b._width = a.width / c;
    b._height = a.height / c
};
cc.POINT_PIXELS_TO_POINTS = function(a) {
    var b = cc.CONTENT_SCALE_FACTOR();
    return cc.p(a.x / b, a.y / b)
};
cc._POINT_PIXELS_TO_POINTS_OUT = function(a, b) {
    var c = cc.CONTENT_SCALE_FACTOR();
    b._x = a.x / c;
    b._y = a.y / c
};
cc.RECT_PIXELS_TO_POINTS = cc.IS_RETINA_DISPLAY_SUPPORTED ? function(a) {
    var b = cc.CONTENT_SCALE_FACTOR();
    return cc.rect(a.x / b, a.y / b, a.width / b, a.height / b)
} : function(a) {
    return a
};
cc.RECT_POINTS_TO_PIXELS = cc.IS_RETINA_DISPLAY_SUPPORTED ? function(a) {
    var b = cc.CONTENT_SCALE_FACTOR();
    return cc.rect(a.x * b, a.y * b, a.width * b, a.height * b)
} : function(a) {
    return a
};
if (!cc.Browser.supportWebGL) {
    var gl = gl || {};
    gl.ONE = 1;
    gl.ZERO = 0;
    gl.SRC_ALPHA = 770;
    gl.ONE_MINUS_SRC_ALPHA = 771;
    gl.ONE_MINUS_DST_COLOR = 775
}
cc.CHECK_GL_ERROR_DEBUG = function() {
    if (cc.renderMode == cc.WEBGL) {
        var a = cc.renderContext.getError();
        a && cc.log("WebGL error " + a)
    }
};
cc.SAX_NONE = 0;
cc.SAX_KEY = 1;
cc.SAX_DICT = 2;
cc.SAX_INT = 3;
cc.SAX_REAL = 4;
cc.SAX_STRING = 5;
cc.SAX_ARRAY = 6;
var Uint8Array = Uint8Array || Array;
if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
    var IEBinaryToArray_ByteStr_Script = '\x3c!-- IEBinaryToArray_ByteStr --\x3e\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr \x3d CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex \x3d LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n       IEBinaryToArray_ByteStr_Last \x3d Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n       IEBinaryToArray_ByteStr_Last \x3d ""\r\n   End If\r\nEnd Function\r\n',
        myVBScript =
        document.createElement("script");
    myVBScript.type = "text/vbscript";
    myVBScript.textContent = IEBinaryToArray_ByteStr_Script;
    document.body.appendChild(myVBScript);
    cc._convertResponseBodyToText = function(a) {
        for (var b = {}, c = 0; 256 > c; c++)
            for (var d = 0; 256 > d; d++) b[String.fromCharCode(c + 256 * d)] = String.fromCharCode(c) + String.fromCharCode(d);
        c = IEBinaryToArray_ByteStr(a);
        a = IEBinaryToArray_ByteStr_Last(a);
        return c.replace(/[\s\S]/g, function(a) {
            return b[a]
        }) + a
    }
}
cc.FileUtils = cc.Class.extend({
    _fileDataCache: null,
    _textFileCache: null,
    _directory: null,
    _filenameLookupDict: null,
    _searchResolutionsOrderArray: null,
    _searchPathArray: null,
    _defaultResRootPath: "",
    ctor: function() {
        this._fileDataCache = {};
        this._textFileCache = {};
        this._searchPathArray = [];
        this._searchPathArray.push(this._defaultResRootPath);
        this._searchResolutionsOrderArray = [];
        this._searchResolutionsOrderArray.push("")
    },
    purgeCachedEntries: function() {
        this._searchPathArray.length = 0
    },
    getByteArrayFromFile: function(a,
        b, c) {
        a = this.fullPathForFilename(a);
        return this._fileDataCache[a] ? this._fileDataCache[a] : this._loadBinaryFileData(a)
    },
    _getXMLHttpRequest: function() {
        return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
    },
    unloadBinaryFileData: function(a) {
        this._fileDataCache[a] && delete this._fileDataCache[a]
    },
    preloadBinaryFileData: function(a) {
        a = this.fullPathForFilename(a);
        var b = this,
            c = this._getXMLHttpRequest();
        c.open("GET", a, !0);
        /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ?
            (c.setRequestHeader("Accept-Charset", "x-user-defined"), c.onreadystatechange = function(d) {
            if (4 == c.readyState) {
                if (200 == c.status)(d = cc._convertResponseBodyToText(c.responseBody)) && (b._fileDataCache[a] = b._stringConvertToArray(d));
                else cc.Loader.getInstance().onResLoadingErr(a);
                cc.Loader.getInstance().onResLoaded()
            }
        }) : (c.overrideMimeType && c.overrideMimeType("text/plain; charset\x3dx-user-defined"), c.onload = function(d) {
            if (d = c.responseText) b._fileDataCache[a] = b._stringConvertToArray(d);
            else cc.Loader.getInstance().onResLoadingErr(a);
            cc.Loader.getInstance().onResLoaded()
        });
        c.send(null)
    },
    _loadBinaryFileData: function(a) {
        var b = this._getXMLHttpRequest();
        b.open("GET", a, !1);
        var c = null;
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            b.setRequestHeader("Accept-Charset", "x-user-defined");
            b.send(null);
            if (200 != b.status) return null;
            if (b = cc._convertResponseBodyToText(b.responseBody)) c = this._stringConvertToArray(b), this._fileDataCache[a] = c
        } else {
            b.overrideMimeType && b.overrideMimeType("text/plain; charset\x3dx-user-defined");
            b.send(null);
            if (200 != b.status) return null;
            c = this._stringConvertToArray(b.responseText);
            this._fileDataCache[a] = c
        }
        return c
    },
    _stringConvertToArray: function(a) {
        if (!a) return null;
        for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) b[c] = a.charCodeAt(c) & 255;
        return b
    },
    unloadTextFileData: function(a) {
        a = this.fullPathForFilename(a);
        this._textFileCache[a] && delete this._textFileCache[a]
    },
    preloadTextFileData: function(a) {
        a = this.fullPathForFilename(a);
        var b = this,
            c = this._getXMLHttpRequest();
        c.open("GET", a, !0);
        /msie/i.test(navigator.userAgent) &&
            !/opera/i.test(navigator.userAgent) ? (c.setRequestHeader("Accept-Charset", "utf-8"), c.onreadystatechange = function(d) {
                if (4 == c.readyState) {
                    if (200 == c.status)(d = c.responseText) && (b._textFileCache[a] = d);
                    else cc.Loader.getInstance().onResLoadingErr(a);
                    cc.Loader.getInstance().onResLoaded()
                }
            }) : (c.overrideMimeType && c.overrideMimeType("text/plain; charset\x3dutf-8"), c.onload = function(d) {
                if (c.responseText) b._textFileCache[a] = c.responseText;
                else cc.Loader.getInstance().onResLoadingErr(a);
                cc.Loader.getInstance().onResLoaded()
            });
        c.send(null)
    },
    _loadTextFileData: function(a) {
        var b = this._getXMLHttpRequest();
        b.open("GET", a, !1);
        var c = null;
        /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? b.setRequestHeader("Accept-Charset", "utf-8") : b.overrideMimeType && b.overrideMimeType("text/plain; charset\x3dutf-8");
        b.send(null);
        if (200 != b.status) return null;
        (c = b.responseText) && (this._textFileCache[a] = c);
        return c
    },
    getTextFileData: function(a) {
        a = this.fullPathForFilename(a);
        return this._textFileCache[a] ? this._textFileCache[a] :
            this._loadTextFileData(a)
    },
    getFileDataFromZip: function(a, b, c) {},
    removeSuffixFromFile: function(a) {},
    popupNotify: !0,
    fullPathFromRelativePath: function(a) {
        return a
    },
    fullPathForFilename: function(a) {
        var b = !1;
        a = this._getNewFilename(a);
        for (var c, d = 0; d < this._searchPathArray.length; d++) {
            for (var e = this._searchPathArray[d], f = 0; f < this._searchResolutionsOrderArray.length; f++)
                if (c = this._getPathForFilename(a, this._searchResolutionsOrderArray[f], e)) {
                    b = !0;
                    break
                }
            if (b) break
        }
        return b ? c : a
    },
    loadFilenameLookup: function(a) {
        var b =
            this.fullPathForFilename(a);
        if (0 < b.length) {
            var b = cc.SAXParser.getInstance().parse(b),
                c = parseInt(b.metadata.version);
            1 != c ? cc.log("cocos2d: ERROR: Invalid filenameLookup dictionary version: " + c + ". Filename: " + a) : this.setFilenameLookupDictionary(b.filenames)
        }
    },
    setFilenameLookupDictionary: function(a) {
        this._filenameLookupDict = a
    },
    fullPathFromRelativeFile: function(a, b) {
        var c;
        if (a) return c = b.substring(0, b.lastIndexOf("/") + 1), c + a;
        c = b.substring(0, b.lastIndexOf("."));
        return c + ".png"
    },
    setSearchResolutionsOrder: function(a) {
        this._searchResolutionsOrderArray =
            a
    },
    getSearchResolutionsOrder: function() {
        return this._searchResolutionsOrderArray
    },
    setSearchPath: function(a) {
        this._searchPathArray = a
    },
    getSearchPath: function() {
        return this._searchPathArray
    },
    getResourceDirectory: function() {
        return this._directory
    },
    setResourcePath: function(a) {},
    dictionaryWithContentsOfFile: function(a) {
        cc.log("dictionaryWithContentsOfFile is deprecated. Use createDictionaryWithContentsOfFile instead");
        return this.createDictionaryWithContentsOfFile(a)
    },
    createDictionaryWithContentsOfFile: function(a) {
        return cc.SAXParser.getInstance().parse(a)
    },
    getStringFromFile: function(a) {
        return this.getTextFileData(a)
    },
    dictionaryWithContentsOfFileThreadSafe: function(a) {
        return cc.SAXParser.getInstance().parse(a)
    },
    getWritablePath: function() {
        return ""
    },
    setPopupNotify: function(a) {
        cc.popupNotify = a
    },
    isPopupNotify: function() {
        return cc.popupNotify
    },
    _resourceRootPath: "",
    getResourceRootPath: function() {
        return this._resourceRootPath
    },
    setResourceRootPath: function(a) {
        this._resourceRootPath = a
    },
    _getNewFilename: function(a) {
        var b = null;
        (b = this._filenameLookupDict ? this._filenameLookupDict[a] :
            null) && 0 !== b.length ? cc.log("FOUND NEW FILE NAME: " + b) : b = a;
        return b
    },
    _getPathForFilename: function(a, b, c) {
        var d;
        d = this.getResourceRootPath();
        a && 0 < a.length && (0 === a.indexOf("/") || 0 === a.indexOf("\\")) ? d = "" : 0 < d.length && "\\" != d[d.length - 1] && "/" != d[d.length - 1] && (d += "/");
        var e = a,
            f = "",
            g = a.lastIndexOf("/"); - 1 != g && (f = a.substr(0, g + 1), e = a.substr(g + 1));
        a = c;
        0 < a.length && a.lastIndexOf("/") !== a.length - 1 && (a += "/");
        a = a + f + b;
        0 < a.length && a.lastIndexOf("/") !== a.length - 1 && (a += "/");
        a += e;
        return d += a
    },
    _getFullPathForDirectoryAndFilename: function(a,
        b) {},
    setSearchPaths: function(a) {
        for (var b = !1, c = this._searchPathArray, d = c.length = 0; d < a.length; d++) {
            var e = a[d],
                f;
            this.isAbsolutePath(e) || (f = this._defaultResRootPath);
            e = f + e;
            0 < e.length && "/" != e[e.length - 1] && (e += "/");
            b || e != this._defaultResRootPath || (b = !0);
            c.push(e)
        }
        b || c.push(this._defaultResRootPath)
    },
    addSearchPath: function(a) {
        var b;
        this.isAbsolutePath(a) || (b = this._defaultResRootPath);
        a = b + a;
        0 < a.length && "/" != a[a.length - 1] && (a += "/");
        this._searchPathArray.push(a)
    },
    getSearchPaths: function() {},
    isAbsolutePath: function(a) {
        return "/" ==
            a[0]
    }
});
cc.s_SharedFileUtils = null;
cc.FileUtils.getInstance = function() {
    null == cc.s_SharedFileUtils && (cc.s_SharedFileUtils = new cc.FileUtils);
    return cc.s_SharedFileUtils
};
cc.Color3B = function(a, b, c) {
    switch (arguments.length) {
        case 0:
            this.b = this.g = this.r = 0;
            break;
        case 1:
            a && a instanceof cc.Color3B ? (this.r = 0 | a.r || 0, this.g = 0 | a.g || 0, this.b = 0 | a.b || 0) : this.b = this.g = this.r = 0;
            break;
        case 3:
            this.r = 0 | a || 0;
            this.g = 0 | b || 0;
            this.b = 0 | c || 0;
            break;
        default:
            throw "unknown argument type";
    }
};
cc.c3b = function(a, b, c) {
    return new cc.Color3B(a, b, c)
};
cc.integerToColor3B = function(a) {
    a = a || 0;
    var b = new cc.Color3B;
    b.r = a & 255;
    b.g = a >> 8 & 255;
    b.b = a >> 16 & 255;
    return b
};
cc.c3 = cc.c3b;
cc.c3BEqual = function(a, b) {
    return a.r === b.r && a.g === b.g && a.b === b.b
};
Object.defineProperties(cc, {
    WHITE: {
        get: function() {
            return cc.c3b(255, 255, 255)
        }
    },
    YELLOW: {
        get: function() {
            return cc.c3b(255, 255, 0)
        }
    },
    BLUE: {
        get: function() {
            return cc.c3b(0, 0, 255)
        }
    },
    GREEN: {
        get: function() {
            return cc.c3b(0, 255, 0)
        }
    },
    RED: {
        get: function() {
            return cc.c3b(255, 0, 0)
        }
    },
    MAGENTA: {
        get: function() {
            return cc.c3b(255, 0, 255)
        }
    },
    BLACK: {
        get: function() {
            return cc.c3b(0, 0, 0)
        }
    },
    ORANGE: {
        get: function() {
            return cc.c3b(255, 127, 0)
        }
    },
    GRAY: {
        get: function() {
            return cc.c3b(166, 166, 166)
        }
    }
});
cc.white = function() {
    return new cc.Color3B(255, 255, 255)
};
cc.yellow = function() {
    return new cc.Color3B(255, 255, 0)
};
cc.blue = function() {
    return new cc.Color3B(0, 0, 255)
};
cc.green = function() {
    return new cc.Color3B(0, 255, 0)
};
cc.red = function() {
    return new cc.Color3B(255, 0, 0)
};
cc.magenta = function() {
    return new cc.Color3B(255, 0, 255)
};
cc.black = function() {
    return new cc.Color3B(0, 0, 0)
};
cc.orange = function() {
    return new cc.Color3B(255, 127, 0)
};
cc.gray = function() {
    return new cc.Color3B(166, 166, 166)
};
cc.Color4B = function(a, b, c, d) {
    this.r = 0 | a;
    this.g = 0 | b;
    this.b = 0 | c;
    this.a = 0 | d
};
cc.c4b = function(a, b, c, d) {
    return new cc.Color4B(a, b, c, d)
};
cc.c4 = cc.c4b;
cc.Color4F = function(a, b, c, d) {
    this.r = a;
    this.g = b;
    this.b = c;
    this.a = d
};
cc.c4f = function(a, b, c, d) {
    return new cc.Color4F(a, b, c, d)
};
cc.c4FFromccc3B = function(a) {
    return new cc.Color4F(a.r / 255, a.g / 255, a.b / 255, 1)
};
cc.c4FFromccc4B = function(a) {
    return new cc.Color4F(a.r / 255, a.g / 255, a.b / 255, a.a / 255)
};
cc.c4BFromccc4F = function(a) {
    return new cc.Color4B(0 | 255 * a.r, 0 | 255 * a.g, 0 | 255 * a.b, 0 | 255 * a.a)
};
cc.c4FEqual = function(a, b) {
    return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a
};
cc.Vertex2F = function(a, b) {
    this.x = a || 0;
    this.y = b || 0
};
cc.Vertex2 = function(a, b) {
    return new cc.Vertex2F(a, b)
};
cc.Vertex3F = function(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0
};
cc.vertex3 = function(a, b, c) {
    return new cc.Vertex3F(a, b, c)
};
cc.Tex2F = function(a, b) {
    this.u = a || 0;
    this.v = b || 0
};
cc.tex2 = function(a, b) {
    return new cc.Tex2F(a, b)
};
cc.PointSprite = function(a, b, c) {
    this.pos = a || new cc.Vertex2F(0, 0);
    this.color = b || new cc.Color4B(0, 0, 0, 0);
    this.size = c || 0
};
cc.Quad2 = function(a, b, c, d) {
    this.tl = a || new cc.Vertex2F(0, 0);
    this.tr = b || new cc.Vertex2F(0, 0);
    this.bl = c || new cc.Vertex2F(0, 0);
    this.br = d || new cc.Vertex2F(0, 0)
};
cc.Quad3 = function(a, b, c, d) {
    this.bl = a || new cc.Vertex3F(0, 0, 0);
    this.br = b || new cc.Vertex3F(0, 0, 0);
    this.tl = c || new cc.Vertex3F(0, 0, 0);
    this.tr = d || new cc.Vertex3F(0, 0, 0)
};
cc.GridSize = function(a, b) {
    this.x = a;
    this.y = b
};
cc.g = function(a, b) {
    return new cc.GridSize(a, b)
};
cc.V2F_C4B_T2F = function(a, b, c) {
    this.vertices = a || new cc.Vertex2F(0, 0);
    this.colors = b || new cc.Color4B(0, 0, 0, 0);
    this.texCoords = c || new cc.Tex2F(0, 0)
};
cc.V2F_C4F_T2F = function(a, b, c) {
    this.vertices = a || new cc.Vertex2F(0, 0);
    this.colors = b || new cc.Color4F(0, 0, 0, 0);
    this.texCoords = c || new cc.Tex2F(0, 0)
};
cc.V3F_C4B_T2F = function(a, b, c) {
    this.vertices = a || new cc.Vertex3F(0, 0, 0);
    this.colors = b || new cc.Color4B(0, 0, 0, 0);
    this.texCoords = c || new cc.Tex2F(0, 0)
};
cc.V2F_C4B_T2F_Triangle = function(a, b, c) {
    this.a = a || new cc.V2F_C4B_T2F;
    this.b = b || new cc.V2F_C4B_T2F;
    this.c = c || new cc.V2F_C4B_T2F
};
cc.V2F_C4B_T2F_Quad = function(a, b, c, d) {
    this.bl = a || new cc.V2F_C4B_T2F;
    this.br = b || new cc.V2F_C4B_T2F;
    this.tl = c || new cc.V2F_C4B_T2F;
    this.tr = d || new cc.V2F_C4B_T2F
};
cc.V2F_C4B_T2F_QuadZero = function() {
    return new cc.V2F_C4B_T2F_Quad(new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V2F_C4B_T2F(new cc.Vertex2F(0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)))
};
cc.V3F_C4B_T2F_Quad = function(a, b, c, d) {
    this.tl = a || new cc.V3F_C4B_T2F;
    this.bl = b || new cc.V3F_C4B_T2F;
    this.tr = c || new cc.V3F_C4B_T2F;
    this.br = d || new cc.V3F_C4B_T2F
};
cc.V3F_C4B_T2F_QuadZero = function() {
    return new cc.V3F_C4B_T2F_Quad(new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)), new cc.V3F_C4B_T2F(new cc.Vertex3F(0, 0, 0), new cc.Color4B(0, 0, 0, 255), new cc.Tex2F(0, 0)))
};
cc.V3F_C4B_T2F_QuadCopy = function(a) {
    return a ? new cc.V3F_C4B_T2F_Quad(new cc.V3F_C4B_T2F(new cc.Vertex3F(a.tl.vertices.x, a.tl.vertices.y, a.tl.vertices.z), new cc.Color4B(a.tl.colors.r, a.tl.colors.g, a.tl.colors.b, a.tl.colors.a), new cc.Tex2F(a.tl.texCoords.u, a.tl.texCoords.v)), new cc.V3F_C4B_T2F(new cc.Vertex3F(a.bl.vertices.x, a.bl.vertices.y, a.bl.vertices.z), new cc.Color4B(a.bl.colors.r, a.bl.colors.g, a.bl.colors.b, a.bl.colors.a), new cc.Tex2F(a.bl.texCoords.u, a.bl.texCoords.v)), new cc.V3F_C4B_T2F(new cc.Vertex3F(a.tr.vertices.x,
        a.tr.vertices.y, a.tr.vertices.z), new cc.Color4B(a.tr.colors.r, a.tr.colors.g, a.tr.colors.b, a.tr.colors.a), new cc.Tex2F(a.tr.texCoords.u, a.tr.texCoords.v)), new cc.V3F_C4B_T2F(new cc.Vertex3F(a.br.vertices.x, a.br.vertices.y, a.br.vertices.z), new cc.Color4B(a.br.colors.r, a.br.colors.g, a.br.colors.b, a.br.colors.a), new cc.Tex2F(a.br.texCoords.u, a.br.texCoords.v))) : cc.V3F_C4B_T2F_QuadZero()
};
cc.V3F_C4B_T2F_QuadsCopy = function(a) {
    if (!a) return [];
    for (var b = [], c = 0; c < a.length; c++) b.push(cc.V3F_C4B_T2F_QuadCopy(a[c]));
    return b
};
cc.V2F_C4F_T2F_Quad = function(a, b, c, d) {
    this.bl = a || new cc.V2F_C4F_T2F;
    this.br = b || new cc.V2F_C4F_T2F;
    this.tl = c || new cc.V2F_C4F_T2F;
    this.tr = d || new cc.V2F_C4F_T2F
};
cc.BlendFunc = function(a, b) {
    this.src = a;
    this.dst = b
};
cc.BlendFuncDisable = function() {
    return new cc.BlendFunc(gl.ONE, gl.ZERO)
};
cc.T2F_Quad = function(a, b, c, d) {
    this.bl = a;
    this.br = b;
    this.tl = c;
    this.tr = d
};
cc.AnimationFrameData = function(a, b, c) {
    this.texCoords = a;
    this.delay = b;
    this.size = c
};
cc.convertColor3BtoHexString = function(a) {
    var b = a.r.toString(16),
        c = a.g.toString(16),
        d = a.b.toString(16);
    return "#" + (16 > a.r ? "0" + b : b) + (16 > a.g ? "0" + c : c) + (16 > a.b ? "0" + d : d)
};
cc.Browser.supportWebGL && (cc.Color4B = function(a, b, c, d, e, f) {
    this._arrayBuffer = e || new ArrayBuffer(cc.Color4B.BYTES_PER_ELEMENT);
    this._offset = f || 0;
    e = this._arrayBuffer;
    f = this._offset;
    var g = Uint8Array.BYTES_PER_ELEMENT;
    this._rU8 = new Uint8Array(e, f, 1);
    this._gU8 = new Uint8Array(e, f + g, 1);
    this._bU8 = new Uint8Array(e, f + 2 * g, 1);
    this._aU8 = new Uint8Array(e, f + 3 * g, 1);
    this._rU8[0] = a || 0;
    this._gU8[0] = b || 0;
    this._bU8[0] = c || 0;
    this._aU8[0] = d || 0
}, cc.Color4B.BYTES_PER_ELEMENT = 4, Object.defineProperties(cc.Color4B.prototype, {
    r: {
        get: function() {
            return this._rU8[0]
        },
        set: function(a) {
            this._rU8[0] = a
        },
        enumerable: !0
    },
    g: {
        get: function() {
            return this._gU8[0]
        },
        set: function(a) {
            this._gU8[0] = a
        },
        enumerable: !0
    },
    b: {
        get: function() {
            return this._bU8[0]
        },
        set: function(a) {
            this._bU8[0] = a
        },
        enumerable: !0
    },
    a: {
        get: function() {
            return this._aU8[0]
        },
        set: function(a) {
            this._aU8[0] = a
        },
        enumerable: !0
    }
}), cc.Color4F = function(a, b, c, d, e, f) {
    this._arrayBuffer = e || new ArrayBuffer(cc.Color4F.BYTES_PER_ELEMENT);
    this._offset = f || 0;
    e = this._arrayBuffer;
    f = this._offset;
    var g =
        Float32Array.BYTES_PER_ELEMENT;
    this._rF32 = new Float32Array(e, f, 1);
    this._rF32[0] = a || 0;
    this._gF32 = new Float32Array(e, f + g, 1);
    this._gF32[0] = b || 0;
    this._bF32 = new Float32Array(e, f + 2 * g, 1);
    this._bF32[0] = c || 0;
    this._aF32 = new Float32Array(e, f + 3 * g, 1);
    this._aF32[0] = d || 0
}, cc.Color4F.BYTES_PER_ELEMENT = 16, Object.defineProperties(cc.Color4F.prototype, {
    r: {
        get: function() {
            return this._rF32[0]
        },
        set: function(a) {
            this._rF32[0] = a
        },
        enumerable: !0
    },
    g: {
        get: function() {
            return this._gF32[0]
        },
        set: function(a) {
            this._gF32[0] = a
        },
        enumerable: !0
    },
    b: {
        get: function() {
            return this._bF32[0]
        },
        set: function(a) {
            this._bF32[0] = a
        },
        enumerable: !0
    },
    a: {
        get: function() {
            return this._aF32[0]
        },
        set: function(a) {
            this._aF32[0] = a
        },
        enumerable: !0
    }
}), cc.Vertex2F = function(a, b, c, d) {
    this._arrayBuffer = c || new ArrayBuffer(cc.Vertex2F.BYTES_PER_ELEMENT);
    this._offset = d || 0;
    this._xF32 = new Float32Array(this._arrayBuffer, this._offset, 1);
    this._yF32 = new Float32Array(this._arrayBuffer, this._offset + 4, 1);
    this._xF32[0] = a || 0;
    this._yF32[0] = b || 0
}, cc.Vertex2F.BYTES_PER_ELEMENT = 8, Object.defineProperties(cc.Vertex2F.prototype, {
    x: {
        get: function() {
            return this._xF32[0]
        },
        set: function(a) {
            this._xF32[0] = a
        },
        enumerable: !0
    },
    y: {
        get: function() {
            return this._yF32[0]
        },
        set: function(a) {
            this._yF32[0] = a
        },
        enumerable: !0
    }
}), cc.Vertex3F = function(a, b, c, d, e) {
    this._arrayBuffer = d || new ArrayBuffer(cc.Vertex3F.BYTES_PER_ELEMENT);
    this._offset = e || 0;
    d = this._arrayBuffer;
    e = this._offset;
    this._xF32 = new Float32Array(d, e, 1);
    this._xF32[0] = a || 0;
    this._yF32 = new Float32Array(d, e + Float32Array.BYTES_PER_ELEMENT, 1);
    this._yF32[0] = b || 0;
    this._zF32 = new Float32Array(d,
        e + 2 * Float32Array.BYTES_PER_ELEMENT, 1);
    this._zF32[0] = c || 0
}, cc.Vertex3F.BYTES_PER_ELEMENT = 12, Object.defineProperties(cc.Vertex3F.prototype, {
    x: {
        get: function() {
            return this._xF32[0]
        },
        set: function(a) {
            this._xF32[0] = a
        },
        enumerable: !0
    },
    y: {
        get: function() {
            return this._yF32[0]
        },
        set: function(a) {
            this._yF32[0] = a
        },
        enumerable: !0
    },
    z: {
        get: function() {
            return this._zF32[0]
        },
        set: function(a) {
            this._zF32[0] = a
        },
        enumerable: !0
    }
}), cc.Tex2F = function(a, b, c, d) {
    this._arrayBuffer = c || new ArrayBuffer(cc.Tex2F.BYTES_PER_ELEMENT);
    this._offset =
        d || 0;
    this._uF32 = new Float32Array(this._arrayBuffer, this._offset, 1);
    this._vF32 = new Float32Array(this._arrayBuffer, this._offset + 4, 1);
    this._uF32[0] = a || 0;
    this._vF32[0] = b || 0
}, cc.Tex2F.BYTES_PER_ELEMENT = 8, Object.defineProperties(cc.Tex2F.prototype, {
    u: {
        get: function() {
            return this._uF32[0]
        },
        set: function(a) {
            this._uF32[0] = a
        },
        enumerable: !0
    },
    v: {
        get: function() {
            return this._vF32[0]
        },
        set: function(a) {
            this._vF32[0] = a
        },
        enumerable: !0
    }
}), cc.Quad2 = function(a, b, c, d, e, f) {
    this._arrayBuffer = e || new ArrayBuffer(cc.Quad2.BYTES_PER_ELEMENT);
    this._offset = f || 0;
    e = this._arrayBuffer;
    f = cc.Vertex2F.BYTES_PER_ELEMENT;
    this._tl = a ? new cc.Vertex2F(a.x, a.y, e, 0) : new cc.Vertex2F(0, 0, e, 0);
    this._tr = b ? new cc.Vertex2F(b.x, b.y, e, f) : new cc.Vertex2F(0, 0, e, f);
    this._bl = c ? new cc.Vertex2F(c.x, c.y, e, 2 * f) : new cc.Vertex2F(0, 0, e, 2 * f);
    this._br = d ? new cc.Vertex2F(d.x, d.y, e, 3 * f) : new cc.Vertex2F(0, 0, e, 3 * f)
}, cc.Quad2.BYTES_PER_ELEMENT = 32, Object.defineProperties(cc.Quad2.prototype, {
    tl: {
        get: function() {
            return this._tl
        },
        set: function(a) {
            this._tl.x = a.x;
            this._tl.y = a.y
        },
        enumerable: !0
    },
    tr: {
        get: function() {
            return this._tr
        },
        set: function(a) {
            this._tr.x = a.x;
            this._tr.y = a.y
        },
        enumerable: !0
    },
    bl: {
        get: function() {
            return this._bl
        },
        set: function(a) {
            this._bl.x = a.x;
            this._bl.y = a.y
        },
        enumerable: !0
    },
    br: {
        get: function() {
            return this._br
        },
        set: function(a) {
            this._br.x = a.x;
            this._br.y = a.y
        },
        enumerable: !0
    }
}), cc.V3F_C4B_T2F = function(a, b, c, d, e) {
    this._arrayBuffer = d || new ArrayBuffer(cc.V3F_C4B_T2F.BYTES_PER_ELEMENT);
    this._offset = e || 0;
    d = this._arrayBuffer;
    e = this._offset;
    var f = cc.Vertex3F.BYTES_PER_ELEMENT;
    this._vertices =
        a ? new cc.Vertex3F(a.x, a.y, a.z, d, e) : new cc.Vertex3F(0, 0, 0, d, e);
    this._colors = b ? new cc.Color4B(b.r, b.g, b.b, b.a, d, e + f) : new cc.Color4B(0, 0, 0, 0, d, e + f);
    this._texCoords = c ? new cc.Tex2F(c.u, c.v, d, e + f + cc.Color4B.BYTES_PER_ELEMENT) : new cc.Tex2F(0, 0, d, e + f + cc.Color4B.BYTES_PER_ELEMENT)
}, cc.V3F_C4B_T2F.BYTES_PER_ELEMENT = 24, Object.defineProperties(cc.V3F_C4B_T2F.prototype, {
    vertices: {
        get: function() {
            return this._vertices
        },
        set: function(a) {
            var b = this._vertices;
            b.x = a.x;
            b.y = a.y;
            b.z = a.z
        },
        enumerable: !0
    },
    colors: {
        get: function() {
            return this._colors
        },
        set: function(a) {
            var b = this._colors;
            b.r = a.r;
            b.g = a.g;
            b.b = a.b;
            b.a = a.a
        },
        enumerable: !0
    },
    texCoords: {
        get: function() {
            return this._texCoords
        },
        set: function(a) {
            this._texCoords.u = a.u;
            this._texCoords.v = a.v
        },
        enumerable: !0
    }
}), cc.V3F_C4B_T2F_Quad = function(a, b, c, d, e, f) {
    this._arrayBuffer = e || new ArrayBuffer(cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT);
    this._offset = f || 0;
    e = this._arrayBuffer;
    f = this._offset;
    var g = cc.V3F_C4B_T2F.BYTES_PER_ELEMENT;
    this._tl = a ? new cc.V3F_C4B_T2F(a.vertices, a.colors, a.texCoords, e, f) : new cc.V3F_C4B_T2F(null,
        null, null, e, f);
    this._bl = b ? new cc.V3F_C4B_T2F(b.vertices, b.colors, b.texCoords, e, f + g) : new cc.V3F_C4B_T2F(null, null, null, e, f + g);
    this._tr = c ? new cc.V3F_C4B_T2F(c.vertices, c.colors, c.texCoords, e, f + 2 * g) : new cc.V3F_C4B_T2F(null, null, null, e, f + 2 * g);
    this._br = d ? new cc.V3F_C4B_T2F(d.vertices, d.colors, d.texCoords, e, f + 3 * g) : new cc.V3F_C4B_T2F(null, null, null, e, f + 3 * g)
}, cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT = 96, Object.defineProperties(cc.V3F_C4B_T2F_Quad.prototype, {
    tl: {
        get: function() {
            return this._tl
        },
        set: function(a) {
            var b =
                this._tl;
            b.vertices = a.vertices;
            b.colors = a.colors;
            b.texCoords = a.texCoords
        },
        enumerable: !0
    },
    bl: {
        get: function() {
            return this._bl
        },
        set: function(a) {
            var b = this._bl;
            b.vertices = a.vertices;
            b.colors = a.colors;
            b.texCoords = a.texCoords
        },
        enumerable: !0
    },
    tr: {
        get: function() {
            return this._tr
        },
        set: function(a) {
            var b = this._tr;
            b.vertices = a.vertices;
            b.colors = a.colors;
            b.texCoords = a.texCoords
        },
        enumerable: !0
    },
    br: {
        get: function() {
            return this._br
        },
        set: function(a) {
            var b = this._br;
            b.vertices = a.vertices;
            b.colors = a.colors;
            b.texCoords =
                a.texCoords
        },
        enumerable: !0
    },
    arrayBuffer: {
        get: function() {
            return this._arrayBuffer
        },
        enumerable: !0
    }
}), cc.V3F_C4B_T2F_QuadZero = function() {
    return new cc.V3F_C4B_T2F_Quad
}, cc.V3F_C4B_T2F_QuadCopy = function(a) {
    if (!a) return cc.V3F_C4B_T2F_QuadZero();
    var b = a.tl,
        c = a.bl,
        d = a.tr;
    a = a.br;
    return {
        tl: {
            vertices: {
                x: b.vertices.x,
                y: b.vertices.y,
                z: b.vertices.z
            },
            colors: {
                r: b.colors.r,
                g: b.colors.g,
                b: b.colors.b,
                a: b.colors.a
            },
            texCoords: {
                u: b.texCoords.u,
                v: b.texCoords.v
            }
        },
        bl: {
            vertices: {
                x: c.vertices.x,
                y: c.vertices.y,
                z: c.vertices.z
            },
            colors: {
                r: c.colors.r,
                g: c.colors.g,
                b: c.colors.b,
                a: c.colors.a
            },
            texCoords: {
                u: c.texCoords.u,
                v: c.texCoords.v
            }
        },
        tr: {
            vertices: {
                x: d.vertices.x,
                y: d.vertices.y,
                z: d.vertices.z
            },
            colors: {
                r: d.colors.r,
                g: d.colors.g,
                b: d.colors.b,
                a: d.colors.a
            },
            texCoords: {
                u: d.texCoords.u,
                v: d.texCoords.v
            }
        },
        br: {
            vertices: {
                x: a.vertices.x,
                y: a.vertices.y,
                z: a.vertices.z
            },
            colors: {
                r: a.colors.r,
                g: a.colors.g,
                b: a.colors.b,
                a: a.colors.a
            },
            texCoords: {
                u: a.texCoords.u,
                v: a.texCoords.v
            }
        }
    }
}, cc.V2F_C4B_T2F = function(a, b, c, d, e) {
    this._arrayBuffer = d || new ArrayBuffer(cc.V2F_C4B_T2F.BYTES_PER_ELEMENT);
    this._offset = e || 0;
    d = this._arrayBuffer;
    e = this._offset;
    var f = cc.Vertex2F.BYTES_PER_ELEMENT;
    this._vertices = a ? new cc.Vertex2F(a.x, a.y, d, e) : new cc.Vertex2F(0, 0, d, e);
    this._colors = b ? new cc.Color4B(b.r, b.g, b.b, b.a, d, e + f) : new cc.Color4B(0, 0, 0, 0, d, e + f);
    this._texCoords = c ? new cc.Tex2F(c.u, c.v, d, e + f + cc.Color4B.BYTES_PER_ELEMENT) : new cc.Tex2F(0, 0, d, e + f + cc.Color4B.BYTES_PER_ELEMENT)
}, cc.V2F_C4B_T2F.BYTES_PER_ELEMENT = 20, Object.defineProperties(cc.V2F_C4B_T2F.prototype, {
    vertices: {
        get: function() {
            return this._vertices
        },
        set: function(a) {
            this._vertices.x = a.x;
            this._vertices.y = a.y
        },
        enumerable: !0
    },
    colors: {
        get: function() {
            return this._colors
        },
        set: function(a) {
            var b = this._colors;
            b.r = a.r;
            b.g = a.g;
            b.b = a.b;
            b.a = a.a
        },
        enumerable: !0
    },
    texCoords: {
        get: function() {
            return this._texCoords
        },
        set: function(a) {
            this._texCoords.u = a.u;
            this._texCoords.v = a.v
        },
        enumerable: !0
    }
}), cc.V2F_C4B_T2F_Triangle = function(a, b, c, d, e) {
    this._arrayBuffer = d || new ArrayBuffer(cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT);
    this._offset = e || 0;
    d = this._arrayBuffer;
    e = this._offset;
    var f = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
    this._a = a ? new cc.V2F_C4B_T2F(a.vertices, a.colors, a.texCoords, d, e) : new cc.V2F_C4B_T2F(null, null, null, d, e);
    this._b = b ? new cc.V2F_C4B_T2F(b.vertices, b.colors, b.texCoords, d, e + f) : new cc.V2F_C4B_T2F(null, null, null, d, e + f);
    this._c = c ? new cc.V2F_C4B_T2F(c.vertices, c.colors, c.texCoords, d, e + 2 * f) : new cc.V2F_C4B_T2F(null, null, null, d, e + 2 * f)
}, cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT = 60, Object.defineProperties(cc.V2F_C4B_T2F_Triangle.prototype, {
    a: {
        get: function() {
            return this._a
        },
        set: function(a) {
            var b = this._a;
            b.vertices = a.vertices;
            b.colors = a.colors;
            b.texCoords = a.texCoords
        },
        enumerable: !0
    },
    b: {
        get: function() {
            return this._b
        },
        set: function(a) {
            var b = this._b;
            b.vertices = a.vertices;
            b.colors = a.colors;
            b.texCoords = a.texCoords
        },
        enumerable: !0
    },
    c: {
        get: function() {
            return this._c
        },
        set: function(a) {
            var b = this._c;
            b.vertices = a.vertices;
            b.colors = a.colors;
            b.texCoords = a.texCoords
        },
        enumerable: !0
    }
}));
cc.convertHexNumToColor3B = function(a) {
    var b = a.substr(1).split("");
    a = parseInt("0x" + b[0] + b[1]);
    var c = parseInt("0x" + b[2] + b[3]),
        b = parseInt("0x" + b[4] + b[5]);
    return new cc.Color3B(a, c, b)
};
cc.TEXT_ALIGNMENT_LEFT = 0;
cc.TEXT_ALIGNMENT_CENTER = 1;
cc.TEXT_ALIGNMENT_RIGHT = 2;
cc.VERTICAL_TEXT_ALIGNMENT_TOP = 0;
cc.VERTICAL_TEXT_ALIGNMENT_CENTER = 1;
cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM = 2;
cc._Dictionary = cc.Class.extend({
    _keyMapTb: null,
    _valueMapTb: null,
    __currId: 0,
    ctor: function() {
        this._keyMapTb = {};
        this._valueMapTb = {};
        this.__currId = 2 << (0 | 10 * Math.random())
    },
    __getKey: function() {
        this.__currId++;
        return "key_" + this.__currId
    },
    setObject: function(a, b) {
        if (null != b) {
            var c = this.__getKey();
            this._keyMapTb[c] = b;
            this._valueMapTb[c] = a
        }
    },
    objectForKey: function(a) {
        if (null == a) return null;
        var b = this._keyMapTb,
            c;
        for (c in b)
            if (b[c] === a) return this._valueMapTb[c];
        return null
    },
    valueForKey: function(a) {
        return this.objectForKey(a)
    },
    removeObjectForKey: function(a) {
        if (null != a) {
            var b = this._keyMapTb,
                c;
            for (c in b)
                if (b[c] === a) {
                    delete this._valueMapTb[c];
                    delete b[c];
                    break
                }
        }
    },
    removeObjectsForKeys: function(a) {
        if (null != a)
            for (var b = 0; b < a.length; b++) this.removeObjectForKey(a[b])
    },
    allKeys: function() {
        var a = [],
            b = this._keyMapTb,
            c;
        for (c in b) a.push(b[c]);
        return a
    },
    removeAllObjects: function() {
        this._keyMapTb = {};
        this._valueMapTb = {}
    },
    count: function() {
        return this.allKeys().length
    }
});
cc.FontDefinition = function() {
    this.fontName = "Arial";
    this.fontSize = 12;
    this.fontAlignmentH = cc.TEXT_ALIGNMENT_CENTER;
    this.fontAlignmentV = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
    this.fontFillColor = cc.white();
    this.fontDimensions = cc.size(0, 0);
    this.strokeEnabled = !1;
    this.strokeColor = cc.white();
    this.strokeSize = 1;
    this.shadowEnabled = !1;
    this.shadowOffset = cc.size(0, 0);
    this.shadowBlur = 0;
    this.shadowOpacity = 1
};
cc.RESOLUTION_POLICY = {
    EXACT_FIT: 0,
    NO_BORDER: 1,
    SHOW_ALL: 2,
    FIXED_HEIGHT: 3,
    FIXED_WIDTH: 4,
    UNKNOWN: 5
};
cc.Touches = [];
cc.TouchesIntergerDict = {};
cc.EGLView = cc.Class.extend({
    _delegate: null,
    _frameSize: null,
    _designResolutionSize: null,
    _originalDesignResolutionSize: null,
    _viewPortRect: null,
    _visibleRect: null,
    _devicePixelRatio: 1,
    _viewName: "",
    _resizeCallback: null,
    _scaleX: 1,
    _originalScaleX: 1,
    _scaleY: 1,
    _originalScaleY: 1,
    _indexBitsUsed: 0,
    _maxTouches: 5,
    _resolutionPolicy: null,
    _rpExactFit: null,
    _rpShowAll: null,
    _rpNoBorder: null,
    _rpFixedHeight: null,
    _rpFixedWidth: null,
    _initialized: !1,
    _captured: !1,
    _wnd: null,
    _hDC: null,
    _hRC: null,
    _accelerometerKeyHook: null,
    _supportTouch: !1,
    _contentTranslateLeftTop: null,
    _menu: null,
    _frame: null,
    _frameZoomFactor: 1,
    __resizeWithBrowserSize: !1,
    _isAdjustViewPort: !1,
    ctor: function() {
        this._frame = cc.container.parentNode === document.body ? document.documentElement : cc.container.parentNode;
        this._frameSize = cc.size(0, 0);
        this._initFrameSize();
        var a = cc.canvas.width,
            b = cc.canvas.height;
        this._designResolutionSize = cc.size(a, b);
        this._originalDesignResolutionSize = cc.size(a, b);
        this._viewPortRect = cc.rect(0, 0, a, b);
        this._visibleRect = cc.rect(0, 0, a, b);
        this._delegate =
            cc.Director.getInstance().getTouchDispatcher();
        this._contentTranslateLeftTop = {
            left: 0,
            top: 0
        };
        this._viewName = "Cocos2dHTML5";
        cc.VisibleRect.init(this._designResolutionSize);
        this._rpExactFit = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.EXACT_FIT);
        this._rpShowAll = new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME, cc.ContentStrategy.SHOW_ALL);
        this._rpNoBorder = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.NO_BORDER);
        this._rpFixedHeight =
            new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.FIXED_HEIGHT);
        this._rpFixedWidth = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.FIXED_WIDTH);
        this._hDC = cc.canvas;
        this._hRC = cc.renderContext
    },
    _resizeEvent: function() {
        var a = this._originalDesignResolutionSize.width,
            b = this._originalDesignResolutionSize.height;
        this._resizeCallback && (this._initFrameSize(), this._resizeCallback.call());
        0 < a && this.setDesignResolutionSize(a, b, this._resolutionPolicy)
    },
    resizeWithBrowserSize: function(a) {
        a ? this.__resizeWithBrowserSize || (this.__resizeWithBrowserSize = !0, a = this._resizeEvent.bind(this), window.addEventListener("resize", a, !1)) : this.__resizeWithBrowserSize && (this.__resizeWithBrowserSize = !0, a = this._resizeEvent.bind(this), window.removeEventListener("resize", a, !1))
    },
    setResizeCallback: function(a) {
        if ("function" == typeof a || null == a) this._resizeCallback = a
    },
    _initFrameSize: function() {
        var a = this._frameSize;
        a.width = this._frame.clientWidth;
        a.height = this._frame.clientHeight
    },
    _adjustSizeKeepCanvasSize: function(a, b) {
        var c = this._originalDesignResolutionSize.width,
            d = this._originalDesignResolutionSize.height;
        0 < c && this.setDesignResolutionSize(c, d, this._resolutionPolicy)
    },
    _setViewPortMeta: function(a, b) {
        if (this._isAdjustViewPort) {
            var c = {
                    "user-scalable": "no",
                    "maximum-scale": "1.0",
                    "initial-scale": "1.0"
                },
                d = document.getElementsByName("viewport"),
                e;
            0 == d.length ? (d = document.createElement("meta"), d.name = "viewport", d.content = "", document.head.appendChild(d)) : d = d[0];
            e = d.content;
            for (var f in c) RegExp(f).test(e) ||
                (e += ("" == e ? "" : ",") + f + "\x3d" + c[f]);
            d.content = e
        }
    },
    _setScaleXYForRenderTexture: function() {
        var a = cc.CONTENT_SCALE_FACTOR();
        this._scaleY = this._scaleX = a
    },
    _resetScale: function() {
        this._scaleX = this._originalScaleX;
        this._scaleY = this._originalScaleY
    },
    _getUnUsedIndex: function() {
        var a, b = this._indexBitsUsed;
        for (a = 0; a < this._maxTouches; a++) {
            if (!(b & 1)) return this._indexBitsUsed |= 1 << a, a;
            b >>= 1
        }
        return -1
    },
    _removeUsedIndexBit: function(a) {
        0 > a || a >= this._maxTouches || (a = ~ (1 << a), this._indexBitsUsed &= a)
    },
    _adjustSizeToBrowser: function() {},
    initialize: function() {
        this._initialized = !0
    },
    adjustViewPort: function(a) {
        this._isAdjustViewPort = a
    },
    end: function() {},
    isOpenGLReady: function() {
        return null != this._hDC && null != this._hRC
    },
    setFrameZoomFactor: function(a) {
        this._frameZoomFactor = a;
        this.centerWindow();
        cc.Director.getInstance().setProjection(cc.Director.getInstance().getProjection())
    },
    swapBuffers: function() {},
    setIMEKeyboardState: function(a) {},
    setContentTranslateLeftTop: function(a, b) {
        this._contentTranslateLeftTop = {
            left: a,
            top: b
        }
    },
    getContentTranslateLeftTop: function() {
        return this._contentTranslateLeftTop
    },
    getFrameSize: function() {
        return cc.size(this._frameSize.width, this._frameSize.height)
    },
    setFrameSize: function(a, b) {
        this._frameSize.width = a;
        this._frameSize.height = b;
        this._frame.style.width = a + "px";
        this._frame.style.height = b + "px";
        this._resizeEvent();
        cc.Director.getInstance().setProjection(cc.Director.getInstance().getProjection())
    },
    centerWindow: function() {},
    setAccelerometerKeyHook: function(a) {
        this._accelerometerKeyHook = a
    },
    getVisibleSize: function() {
        return this._visibleRect._size
    },
    getVisibleOrigin: function() {
        return this._visibleRect._origin
    },
    canSetContentScaleFactor: function() {
        return !0
    },
    getResolutionPolicy: function() {
        return this._resolutionPolicy
    },
    setResolutionPolicy: function(a) {
        if (a instanceof cc.ResolutionPolicy) this._resolutionPolicy = a;
        else switch (a) {
            case cc.RESOLUTION_POLICY.EXACT_FIT:
                this._resolutionPolicy = this._rpExactFit;
                break;
            case cc.RESOLUTION_POLICY.SHOW_ALL:
                this._resolutionPolicy = this._rpShowAll;
                break;
            case cc.RESOLUTION_POLICY.NO_BORDER:
                this._resolutionPolicy = this._rpNoBorder;
                break;
            case cc.RESOLUTION_POLICY.FIXED_HEIGHT:
                this._resolutionPolicy =
                    this._rpFixedHeight;
                break;
            case cc.RESOLUTION_POLICY.FIXED_WIDTH:
                this._resolutionPolicy = this._rpFixedWidth
        }
    },
    setDesignResolutionSize: function(a, b, c) {
        if (isNaN(a) || 0 == a || isNaN(b) || 0 == b) cc.log("Resolution not valid");
        else {
            this.setResolutionPolicy(c);
            var d = this._resolutionPolicy;
            if (d) {
                d.preApply(this);
                var e = this._frameSize.width,
                    f = this._frameSize.height;
                cc.Browser.isMobile && this._setViewPortMeta(this._frameSize.width, this._frameSize.height);
                this._initFrameSize();
                if (c != this._resolutionPolicy || a != this._originalDesignResolutionSize.width ||
                    b != this._originalDesignResolutionSize.height || e != this._frameSize.width || f != this._frameSize.height) this._designResolutionSize = cc.size(a, b), this._originalDesignResolutionSize = cc.size(a, b), a = d.apply(this, this._designResolutionSize), a.scale && 2 == a.scale.length && (this._scaleX = a.scale[0], this._scaleY = a.scale[1]), a.viewport instanceof cc.Rect && (a = this._viewPortRect = a.viewport, b = this._visibleRect, b._size.width = cc.canvas.width / this._scaleX, b._size.height = cc.canvas.height / this._scaleY, b._origin.x = -a.x / this._scaleX,
                    b._origin.y = -a.y / this._scaleY), a = cc.Director.getInstance(), a._winSizeInPoints = this.getDesignResolutionSize(), d.postApply(this), cc.renderContextType == cc.WEBGL && (a._createStatsLabel(), a.setGLDefaultValues()), this._originalScaleX = this._scaleX, this._originalScaleY = this._scaleY, cc.DOM && cc.DOM._resetEGLViewDiv(), cc.VisibleRect.init(this.getVisibleSize())
            } else cc.log("should set resolutionPolicy")
        }
    },
    getDesignResolutionSize: function() {
        return cc.size(this._designResolutionSize.width, this._designResolutionSize.height)
    },
    setTouchDelegate: function(a) {
        this._delegate = a
    },
    setViewPortInPoints: function(a, b, c, d) {
        var e = this._frameZoomFactor,
            f = this._scaleX,
            g = this._scaleY;
        cc.renderContext.viewport(a * f * e + this._viewPortRect.x * e, b * g * e + this._viewPortRect.y * e, c * f * e, d * g * e)
    },
    setScissorInPoints: function(a, b, c, d) {
        var e = this._frameZoomFactor,
            f = this._scaleX,
            g = this._scaleY;
        cc.renderContext.scissor(a * f * e + this._viewPortRect.x * e, b * g * e + this._viewPortRect.y * e, c * f * e, d * g * e)
    },
    isScissorEnabled: function() {
        var a = cc.renderContext;
        return a.isEnabled(a.SCISSOR_TEST)
    },
    getScissorRect: function() {
        var a = cc.renderContext,
            b = this._scaleX,
            c = this._scaleY,
            a = a.getParameter(a.SCISSOR_BOX);
        return cc.rect((a[0] - this._viewPortRect.x) / b, (a[1] - this._viewPortRect.y) / c, a[2] / b, a[3] / c)
    },
    setViewName: function(a) {
        null != a && 0 < a.length && (this._viewName = a)
    },
    getViewName: function() {
        return this._viewName
    },
    getViewPortRect: function() {
        return this._viewPortRect
    },
    getScaleX: function() {
        return this._scaleX
    },
    getScaleY: function() {
        return this._scaleY
    },
    getDevicePixelRatio: function() {
        return this._devicePixelRatio
    },
    convertToLocationInView: function(a, b, c) {
        return {
            x: this._devicePixelRatio * (a - c.left),
            y: this._devicePixelRatio * (c.top + c.height - b)
        }
    },
    handleTouchesBegin: function(a, b, c, d) {
        for (var e = [], f = this._viewPortRect, g = this._scaleX, h = this._scaleY, k = 0; k < a; ++k) {
            var m = b[k],
                n = c[k],
                p = d[k],
                q = 0;
            if (null == cc.TouchesIntergerDict[m])
                if (q = this._getUnUsedIndex(), -1 == q) cc.log("The touches is more than MAX_TOUCHES, nUnusedIndex \x3d " + q);
                else {
                    var r = cc.Touches[q] = new cc.Touch;
                    r.setTouchInfo(q, (n - f.x) / g, (p - f.y) / h);
                    cc.TouchesIntergerDict[m] =
                        0 | q;
                    e.push(r)
                }
        }
        0 !== e.length && this._delegate.touchesBegan(e, null)
    },
    handleTouchesMove: function(a, b, c, d) {
        for (var e = [], f = this._scaleX, g = this._scaleY, h = this._viewPortRect.x, k = this._viewPortRect.y, m = 0; m < a; ++m) {
            var n = c[m],
                p = d[m],
                q = cc.TouchesIntergerDict[b[m]];
            if (null != q) {
                var r = cc.Touches[q];
                if (r) r.setTouchInfo(q, (n - h) / f, (p - k) / g), e.push(r);
                else return
            }
        }
        0 != e.length && this._delegate.touchesMoved(e, null)
    },
    handleTouchesEnd: function(a, b, c, d) {
        var e = [];
        this.getSetOfTouchesEndOrCancel(e, a, b, c, d);
        this._delegate.touchesEnded(e,
            null)
    },
    handleTouchesCancel: function(a, b, c, d) {
        var e = [];
        this.getSetOfTouchesEndOrCancel(e, a, b, c, d);
        this._delegate.touchesCancelled(e, null)
    },
    getSetOfTouchesEndOrCancel: function(a, b, c, d, e) {
        for (var f = this._scaleX, g = this._scaleY, h = this._viewPortRect, k = 0; k < b; ++k) {
            var m = c[k],
                n = d[k],
                p = e[k],
                q = cc.TouchesIntergerDict[m];
            if (null != q) {
                var r = cc.Touches[q];
                if (r) r.setTouchInfo(q, (n - h.x) / f, (p - h.y) / g), a.push(r), cc.Touches[q] = null, this._removeUsedIndexBit(q), delete cc.TouchesIntergerDict[m];
                else break
            }
        }
    },
    touchesBegan: function(a,
        b) {
        for (var c = [], d = [], e = [], f = 0, g, h = 0; h < a.length; h++) g = a[h], c[f] = g.getId() || h, d[f] = g.getLocation().x, e[f] = g.getLocation().y, ++f;
        this.handleTouchesBegin(f, c, d, e)
    },
    touchesMoved: function(a, b) {
        for (var c = [], d = [], e = [], f = 0, g, h = 0; h < a.length; h++) g = a[h], c[f] = g.getId() || h, d[f] = g.getLocation().x, e[f] = g.getLocation().y, ++f;
        this.handleTouchesMove(f, c, d, e)
    },
    touchesEnded: function(a, b) {
        for (var c = [], d = [], e = [], f = 0, g, h = 0; h < a.length; h++) g = a[h], c[f] = g.getId() || h, d[f] = g.getLocation().x, e[f] = g.getLocation().y, ++f;
        this.handleTouchesEnd(f,
            c, d, e)
    },
    touchesCancelled: function(a, b) {
        for (var c = [], d = [], e = [], f = 0, g, h = 0; h < a.length; h++) g = a[h], c[f] = g.getId() || h, d[f] = g.getLocation().x, e[f] = g.getLocation().y, ++f;
        this.handleTouchesCancel(f, c, d, e)
    }
});
cc.EGLView.getInstance = function() {
    this._instance || (cc.Director.getInstance(), this._instance = this._instance || new cc.EGLView, this._instance.initialize());
    return this._instance
};
cc.ContainerStrategy = cc.Class.extend({
    _adjustRetina: !1,
    preApply: function(a) {
        if ("iOS" == sys.os || "OS X" == sys.os) this._adjustRetina = !0
    },
    apply: function(a, b) {},
    postApply: function(a) {},
    _setupContainer: function(a, b, c) {
        var d = a._frame;
        cc.Browser.isMobile && d == document.documentElement && cc.Screen.getInstance().autoFullScreen(d);
        var d = cc.canvas,
            e = cc.container;
        e.style.width = d.style.width = b + "px";
        e.style.height = d.style.height = c + "px";
        e = a._devicePixelRatio = 1;
        this._adjustRetina && (e = a._devicePixelRatio = window.devicePixelRatio ||
            1);
        d.width = b * e;
        d.height = c * e;
        a = document.body;
        var f;
        a && (f = a.style) && (f.paddingTop = f.paddingTop || "0px", f.paddingRight = f.paddingRight || "0px", f.paddingBottom = f.paddingBottom || "0px", f.paddingLeft = f.paddingLeft || "0px", f.borderTop = f.borderTop || "0px", f.borderRight = f.borderRight || "0px", f.borderBottom = f.borderBottom || "0px", f.borderLeft = f.borderLeft || "0px", f.marginTop = f.marginTop || "0px", f.marginRight = f.marginRight || "0px", f.marginBottom = f.marginBottom || "0px", f.marginLeft = f.marginLeft || "0px")
    },
    _fixContainer: function() {
        document.body.insertBefore(cc.container,
            document.body.firstChild);
        var a = document.body.style;
        a.width = window.innerWidth + "px";
        a.height = window.innerHeight + "px";
        a.overflow = "hidden";
        a = cc.container.style;
        a.position = "fixed";
        a.left = a.top = "0px";
        document.body.scrollTop = 0
    }
});
cc.ContentStrategy = cc.Class.extend({
    _result: {
        scale: [1, 1],
        viewport: null
    },
    _buildResult: function(a, b, c, d, e, f) {
        2 > Math.abs(a - c) && (c = a);
        2 > Math.abs(b - d) && (d = b);
        a = cc.rect(Math.round((a - c) / 2), Math.round((b - d) / 2), c, d);
        cc.renderContextType == cc.CANVAS && cc.renderContext.translate(a.x, a.y + d);
        this._result.scale = [e, f];
        this._result.viewport = a;
        return this._result
    },
    preApply: function(a) {},
    apply: function(a, b) {
        return {
            scale: [1, 1]
        }
    },
    postApply: function(a) {}
});
(function() {
    var a = cc.ContainerStrategy.extend({
            apply: function(a) {
                this._setupContainer(a, a._frameSize.width, a._frameSize.height)
            }
        }),
        b = cc.ContainerStrategy.extend({
            apply: function(a, b) {
                var c = a._frameSize.width,
                    d = a._frameSize.height,
                    e = cc.container.style,
                    n = b.width,
                    p = b.height,
                    q = c / n,
                    r = d / p,
                    s, t;
                q < r ? (s = c, t = p * q) : (s = n * r, t = d);
                n = Math.round((c - s) / 2);
                t = Math.round((d - t) / 2);
                this._setupContainer(a, c - 2 * n, d - 2 * t);
                e.marginLeft = n + "px";
                e.marginRight = n + "px";
                e.marginTop = t + "px";
                e.marginBottom = t + "px"
            }
        });
    a.extend({
        preApply: function(a) {
            this._super(a);
            a._frame = document.documentElement
        },
        apply: function(a) {
            this._super(a);
            this._fixContainer()
        }
    });
    b.extend({
        preApply: function(a) {
            this._super(a);
            a._frame = document.documentElement
        },
        apply: function(a, b) {
            this._super(a, b);
            this._fixContainer()
        }
    });
    var c = cc.ContainerStrategy.extend({
        apply: function(a) {
            this._setupContainer(a, cc.canvas.width, cc.canvas.height)
        }
    });
    cc.ContainerStrategy.EQUAL_TO_FRAME = new a;
    cc.ContainerStrategy.PROPORTION_TO_FRAME = new b;
    cc.ContainerStrategy.ORIGINAL_CONTAINER = new c;
    var a = cc.ContentStrategy.extend({
            apply: function(a,
                b) {
                var c = cc.canvas.width,
                    d = cc.canvas.height;
                return this._buildResult(c, d, c, d, c / b.width, d / b.height)
            }
        }),
        b = cc.ContentStrategy.extend({
            apply: function(a, b) {
                var c = cc.canvas.width,
                    d = cc.canvas.height,
                    e = b.width,
                    n = b.height,
                    p = c / e,
                    q = d / n,
                    r = 0,
                    s, t;
                p < q ? (r = p, s = c, t = n * r) : (r = q, s = e * r, t = d);
                return this._buildResult(c, d, s, t, r, r)
            }
        }),
        c = cc.ContentStrategy.extend({
            apply: function(a, b) {
                var c = cc.canvas.width,
                    d = cc.canvas.height,
                    e = b.width,
                    n = b.height,
                    p = c / e,
                    q = d / n,
                    r, s, t;
                p < q ? (r = q, s = e * r, t = d) : (r = p, s = c, t = n * r);
                return this._buildResult(c,
                    d, s, t, r, r)
            }
        }),
        d = cc.ContentStrategy.extend({
            apply: function(a, b) {
                var c = cc.canvas.width,
                    d = cc.canvas.height,
                    e = d / b.height;
                return this._buildResult(c, d, c, d, e, e)
            },
            postApply: function(a) {
                cc.Director.getInstance()._winSizeInPoints = a.getVisibleSize()
            }
        }),
        e = cc.ContentStrategy.extend({
            apply: function(a, b) {
                var c = cc.canvas.width,
                    d = cc.canvas.height,
                    e = c / b.width;
                return this._buildResult(c, d, c, d, e, e)
            },
            postApply: function(a) {
                cc.Director.getInstance()._winSizeInPoints = a.getVisibleSize()
            }
        });
    cc.ContentStrategy.EXACT_FIT = new a;
    cc.ContentStrategy.SHOW_ALL = new b;
    cc.ContentStrategy.NO_BORDER = new c;
    cc.ContentStrategy.FIXED_HEIGHT = new d;
    cc.ContentStrategy.FIXED_WIDTH = new e
})();
cc.ResolutionPolicy = cc.Class.extend({
    _containerStrategy: null,
    _contentStrategy: null,
    ctor: function(a, b) {
        this.setContainerStrategy(a);
        this.setContentStrategy(b)
    },
    preApply: function(a) {
        this._containerStrategy.preApply(a);
        this._contentStrategy.preApply(a)
    },
    apply: function(a, b) {
        this._containerStrategy.apply(a, b);
        return this._contentStrategy.apply(a, b)
    },
    postApply: function(a) {
        this._containerStrategy.postApply(a);
        this._contentStrategy.postApply(a)
    },
    setContainerStrategy: function(a) {
        a instanceof cc.ContainerStrategy &&
            (this._containerStrategy = a)
    },
    setContentStrategy: function(a) {
        a instanceof cc.ContentStrategy && (this._contentStrategy = a)
    }
});
cc.Screen = cc.Class.extend({
    _supportsFullScreen: !1,
    _preOnFullScreenChange: null,
    _touchEvent: "",
    _fn: null,
    _fnMap: [
        ["requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenEnabled", "fullscreenElement"],
        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement"],
        ["mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen", "mozFullScreenElement"],
        ["msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange",
            "msFullscreenEnabled", "msFullscreenElement"
        ]
    ],
    init: function() {
        this._fn = {};
        var a, b, c = this._fnMap,
            d;
        a = 0;
        for (l = c.length; a < l; a++)
            if ((b = c[a]) && b[1] in document) {
                a = 0;
                for (d = b.length; a < d; a++) this._fn[c[0][a]] = b[a];
                break
            }
        this._supportsFullScreen = void 0 != this._fn.requestFullscreen;
        this._touchEvent = "ontouchstart" in window ? "touchstart" : "mousedown"
    },
    fullScreen: function() {
        return this._supportsFullScreen && document[this._fn.fullscreenEnabled]
    },
    requestFullScreen: function(a, b) {
        if (this._supportsFullScreen) {
            a = a || document.documentElement;
            a[this._fn.requestFullscreen]();
            if (b) {
                var c = this._fn.fullscreenchange;
                this._preOnFullScreenChange && document.removeEventListener(c, this._preOnFullScreenChange);
                this._preOnFullScreenChange = b;
                document.addEventListener(c, b, !1)
            }
            return a[this._fn.requestFullscreen]()
        }
    },
    exitFullScreen: function() {
        return this._supportsFullScreen ? document[this._fn.exitFullscreen]() : !0
    },
    autoFullScreen: function(a, b) {
        function c() {
            e.requestFullScreen(a, b);
            d.removeEventListener(e._touchEvent, c)
        }
        a = a || document.body;
        var d = cc.canvas ||
            a,
            e = this;
        this.requestFullScreen(a, b);
        d.addEventListener(this._touchEvent, c)
    }
});
cc.Screen.getInstance = function() {
    if (!this._instance) {
        var a = new cc.Screen;
        a.init();
        this._instance = a
    }
    return this._instance
};
cc.VisibleRect = {
    _topLeft: cc._pConst(0, 0),
    _topRight: cc._pConst(0, 0),
    _top: cc._pConst(0, 0),
    _bottomLeft: cc._pConst(0, 0),
    _bottomRight: cc._pConst(0, 0),
    _bottom: cc._pConst(0, 0),
    _center: cc._pConst(0, 0),
    _left: cc._pConst(0, 0),
    _right: cc._pConst(0, 0),
    _width: 0,
    _height: 0,
    init: function(a) {
        this._width = a.width;
        this._height = a.height;
        a = this._width;
        var b = this._height;
        this._topLeft._y = b;
        this._topRight._x = a;
        this._topRight._y = b;
        this._top._x = a / 2;
        this._top._y = b;
        this._bottomRight._x = a;
        this._bottom._x = a / 2;
        this._center._x = a /
            2;
        this._center._y = b / 2;
        this._left._y = b / 2;
        this._right._x = a;
        this._right._y = b / 2
    },
    getWidth: function() {
        return this._width
    },
    getHeight: function() {
        return this._height
    },
    topLeft: function() {
        return this._topLeft
    },
    topRight: function() {
        return this._topRight
    },
    top: function() {
        return this._top
    },
    bottomLeft: function() {
        return this._bottomLeft
    },
    bottomRight: function() {
        return this._bottomRight
    },
    bottom: function() {
        return this._bottom
    },
    center: function() {
        return this._center
    },
    left: function() {
        return this._left
    },
    right: function() {
        return this._right
    }
};
cc.AffineTransform = function(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = e;
    this.ty = f
};
cc.__AffineTransformMake = function(a, b, c, d, e, f) {
    return {
        a: a,
        b: b,
        c: c,
        d: d,
        tx: e,
        ty: f
    }
};
cc.AffineTransformMake = function(a, b, c, d, e, f) {
    return {
        a: a,
        b: b,
        c: c,
        d: d,
        tx: e,
        ty: f
    }
};
cc.__PointApplyAffineTransform = function(a, b) {
    return {
        x: b.a * a.x + b.c * a.y + b.tx,
        y: b.b * a.x + b.d * a.y + b.ty
    }
};
cc.PointApplyAffineTransform = function(a, b) {
    return {
        x: b.a * a.x + b.c * a.y + b.tx,
        y: b.b * a.x + b.d * a.y + b.ty
    }
};
cc._PointApplyAffineTransform = function(a, b, c) {
    return {
        x: c.a * a + c.c * b + c.tx,
        y: c.b * a + c.d * b + c.ty
    }
};
cc.__SizeApplyAffineTransform = function(a, b) {
    return {
        width: b.a * a.width + b.c * a.height,
        height: b.b * a.width + b.d * a.height
    }
};
cc.SizeApplyAffineTransform = function(a, b) {
    return {
        width: b.a * a.width + b.c * a.height,
        height: b.b * a.width + b.d * a.height
    }
};
cc.AffineTransformMakeIdentity = function() {
    return {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 0,
        ty: 0
    }
};
cc.AffineTransformIdentity = function() {
    return {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 0,
        ty: 0
    }
};
cc.RectApplyAffineTransform = function(a, b) {
    var c = cc.rectGetMinY(a),
        d = cc.rectGetMinX(a),
        e = cc.rectGetMaxX(a),
        f = cc.rectGetMaxY(a),
        g = cc._PointApplyAffineTransform(d, c, b),
        c = cc._PointApplyAffineTransform(e, c, b),
        d = cc._PointApplyAffineTransform(d, f, b),
        h = cc._PointApplyAffineTransform(e, f, b),
        e = Math.min(g.x, c.x, d.x, h.x),
        f = Math.max(g.x, c.x, d.x, h.x),
        k = Math.min(g.y, c.y, d.y, h.y),
        g = Math.max(g.y, c.y, d.y, h.y);
    return cc.rect(e, k, f - e, g - k)
};
cc._RectApplyAffineTransformIn = function(a, b) {
    var c = cc.rectGetMinY(a),
        d = cc.rectGetMinX(a),
        e = cc.rectGetMaxX(a),
        f = cc.rectGetMaxY(a),
        g = cc._PointApplyAffineTransform(d, c, b),
        c = cc._PointApplyAffineTransform(e, c, b),
        d = cc._PointApplyAffineTransform(d, f, b),
        h = cc._PointApplyAffineTransform(e, f, b),
        e = Math.min(g.x, c.x, d.x, h.x),
        f = Math.max(g.x, c.x, d.x, h.x),
        k = Math.min(g.y, c.y, d.y, h.y),
        g = Math.max(g.y, c.y, d.y, h.y);
    a.x = e;
    a.y = k;
    a.width = f - e;
    a.height = g - k;
    return a
};
cc.AffineTransformTranslate = function(a, b, c) {
    return {
        a: a.a,
        b: a.b,
        c: a.c,
        d: a.d,
        tx: a.tx + a.a * b + a.c * c,
        ty: a.ty + a.b * b + a.d * c
    }
};
cc.AffineTransformScale = function(a, b, c) {
    return {
        a: a.a * b,
        b: a.b * b,
        c: a.c * c,
        d: a.d * c,
        tx: a.tx,
        ty: a.ty
    }
};
cc.AffineTransformRotate = function(a, b) {
    var c = Math.sin(b),
        d = Math.cos(b);
    return {
        a: a.a * d + a.c * c,
        b: a.b * d + a.d * c,
        c: a.c * d - a.a * c,
        d: a.d * d - a.b * c,
        tx: a.tx,
        ty: a.ty
    }
};
cc.AffineTransformConcat = function(a, b) {
    return {
        a: a.a * b.a + a.b * b.c,
        b: a.a * b.b + a.b * b.d,
        c: a.c * b.a + a.d * b.c,
        d: a.c * b.b + a.d * b.d,
        tx: a.tx * b.a + a.ty * b.c + b.tx,
        ty: a.tx * b.b + a.ty * b.d + b.ty
    }
};
cc.AffineTransformEqualToTransform = function(a, b) {
    return a.a === b.a && a.b === b.b && a.c === b.c && a.d === b.d && a.tx === b.tx && a.ty === b.ty
};
cc.AffineTransformInvert = function(a) {
    var b = 1 / (a.a * a.d - a.b * a.c);
    return {
        a: b * a.d,
        b: -b * a.b,
        c: -b * a.c,
        d: b * a.a,
        tx: b * (a.c * a.ty - a.d * a.tx),
        ty: b * (a.b * a.tx - a.a * a.ty)
    }
};
cc.POINT_EPSILON = parseFloat("1.192092896e-07F");
cc.pNeg = function(a) {
    return cc.p(-a.x, -a.y)
};
cc.pAdd = function(a, b) {
    return cc.p(a.x + b.x, a.y + b.y)
};
cc.pSub = function(a, b) {
    return cc.p(a.x - b.x, a.y - b.y)
};
cc.pMult = function(a, b) {
    return cc.p(a.x * b, a.y * b)
};
cc.pMidpoint = function(a, b) {
    return cc.pMult(cc.pAdd(a, b), 0.5)
};
cc.pDot = function(a, b) {
    return a.x * b.x + a.y * b.y
};
cc.pCross = function(a, b) {
    return a.x * b.y - a.y * b.x
};
cc.pPerp = function(a) {
    return cc.p(-a.y, a.x)
};
cc.pRPerp = function(a) {
    return cc.p(a.y, -a.x)
};
cc.pProject = function(a, b) {
    return cc.pMult(b, cc.pDot(a, b) / cc.pDot(b, b))
};
cc.pRotate = function(a, b) {
    return cc.p(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x)
};
cc.pUnrotate = function(a, b) {
    return cc.p(a.x * b.x + a.y * b.y, a.y * b.x - a.x * b.y)
};
cc.pLengthSQ = function(a) {
    return cc.pDot(a, a)
};
cc.pDistanceSQ = function(a, b) {
    return cc.pLengthSQ(cc.pSub(a, b))
};
cc.pLength = function(a) {
    return Math.sqrt(cc.pLengthSQ(a))
};
cc.pDistance = function(a, b) {
    return cc.pLength(cc.pSub(a, b))
};
cc.pNormalize = function(a) {
    return cc.pMult(a, 1 / cc.pLength(a))
};
cc.pForAngle = function(a) {
    return cc.p(Math.cos(a), Math.sin(a))
};
cc.pToAngle = function(a) {
    return Math.atan2(a.y, a.x)
};
cc.clampf = function(a, b, c) {
    if (b > c) {
        var d = b;
        b = c;
        c = d
    }
    return a < b ? b : a < c ? a : c
};
cc.pClamp = function(a, b, c) {
    return cc.p(cc.clampf(a.x, b.x, c.x), cc.clampf(a.y, b.y, c.y))
};
cc.pFromSize = function(a) {
    return cc.p(a.width, a.height)
};
cc.pCompOp = function(a, b) {
    return cc.p(b(a.x), b(a.y))
};
cc.pLerp = function(a, b, c) {
    return cc.pAdd(cc.pMult(a, 1 - c), cc.pMult(b, c))
};
cc.pFuzzyEqual = function(a, b, c) {
    return a.x - c <= b.x && b.x <= a.x + c && a.y - c <= b.y && b.y <= a.y + c ? !0 : !1
};
cc.pCompMult = function(a, b) {
    return cc.p(a.x * b.x, a.y * b.y)
};
cc.pAngleSigned = function(a, b) {
    var c = cc.pNormalize(a),
        d = cc.pNormalize(b),
        c = Math.atan2(c.x * d.y - c.y * d.x, cc.pDot(c, d));
    return Math.abs(c) < cc.POINT_EPSILON ? 0 : c
};
cc.pAngle = function(a, b) {
    var c = Math.acos(cc.pDot(cc.pNormalize(a), cc.pNormalize(b)));
    return Math.abs(c) < cc.POINT_EPSILON ? 0 : c
};
cc.pRotateByAngle = function(a, b, c) {
    a = cc.pSub(a, b);
    var d = Math.cos(c);
    c = Math.sin(c);
    var e = a.x;
    a.x = e * d - a.y * c + b.x;
    a.y = e * c + a.y * d + b.y;
    return a
};
cc.pLineIntersect = function(a, b, c, d, e) {
    if (a.x == b.x && a.y == b.y || c.x == d.x && c.y == d.y) return !1;
    var f = b.x - a.x;
    b = b.y - a.y;
    var g = d.x - c.x;
    d = d.y - c.y;
    var h = a.x - c.x;
    a = a.y - c.y;
    c = d * f - g * b;
    e.x = g * a - d * h;
    e.y = f * a - b * h;
    if (0 == c) return 0 == e.x || 0 == e.y ? !0 : !1;
    e.x /= c;
    e.y /= c;
    return !0
};
cc.pSegmentIntersect = function(a, b, c, d) {
    var e = cc.p(0, 0);
    return cc.pLineIntersect(a, b, c, d, e) && 0 <= e.x && 1 >= e.x && 0 <= e.y && 1 >= e.y ? !0 : !1
};
cc.pIntersectPoint = function(a, b, c, d) {
    var e = cc.p(0, 0);
    return cc.pLineIntersect(a, b, c, d, e) ? (c = cc.p(0, 0), c.x = a.x + e.x * (b.x - a.x), c.y = a.y + e.x * (b.y - a.y), c) : cc.PointZero()
};
cc.pSameAs = function(a, b) {
    return null != a && null != b ? a.x == b.x && a.y == b.y : !1
};
cc.pZeroIn = function(a) {
    a.x = 0;
    a.y = 0
};
cc.pIn = function(a, b) {
    a.x = b.x;
    a.y = b.y
};
cc.pMultIn = function(a, b) {
    a.x *= b;
    a.y *= b
};
cc.pSubIn = function(a, b) {
    a.x -= b.x;
    a.y -= b.y
};
cc.pAddIn = function(a, b) {
    a.x += b.x;
    a.y += b.y
};
cc.pNormalizeIn = function(a) {
    cc.pMultIn(a, 1 / Math.sqrt(a.x * a.x + a.y * a.y))
};
cc.vertexLineToPolygon = function(a, b, c, d, e) {
    e += d;
    if (!(1 >= e)) {
        b *= 0.5;
        for (var f, g = e - 1, h = d; h < e; h++) {
            f = 2 * h;
            var k = cc.p(a[2 * h], a[2 * h + 1]),
                m;
            if (0 === h) m = cc.pPerp(cc.pNormalize(cc.pSub(k, cc.p(a[2 * (h + 1)], a[2 * (h + 1) + 1]))));
            else if (h === g) m = cc.pPerp(cc.pNormalize(cc.pSub(cc.p(a[2 * (h - 1)], a[2 * (h - 1) + 1]), k)));
            else {
                m = cc.p(a[2 * (h - 1)], a[2 * (h - 1) + 1]);
                var n = cc.p(a[2 * (h + 1)], a[2 * (h + 1) + 1]),
                    p = cc.pNormalize(cc.pSub(n, k)),
                    q = cc.pNormalize(cc.pSub(m, k)),
                    r = Math.acos(cc.pDot(p, q));
                m = r < cc.DEGREES_TO_RADIANS(70) ? cc.pPerp(cc.pNormalize(cc.pMidpoint(p,
                    q))) : r < cc.DEGREES_TO_RADIANS(170) ? cc.pNormalize(cc.pMidpoint(p, q)) : cc.pPerp(cc.pNormalize(cc.pSub(n, m)))
            }
            m = cc.pMult(m, b);
            c[2 * f] = k.x + m.x;
            c[2 * f + 1] = k.y + m.y;
            c[2 * (f + 1)] = k.x - m.x;
            c[2 * (f + 1) + 1] = k.y - m.y
        }
        for (h = 0 == d ? 0 : d - 1; h < g; h++) f = 2 * h, a = f + 2, b = cc.Vertex2(c[2 * f], c[2 * f + 1]), e = cc.Vertex2(c[2 * (f + 1)], c[2 * (f + 1) + 1]), f = cc.Vertex2(c[2 * a], c[2 * a]), d = cc.Vertex2(c[2 * (a + 1)], c[2 * (a + 1) + 1]), b = !cc.vertexLineIntersect(b.x, b.y, d.x, d.y, e.x, e.y, f.x, f.y), !b.isSuccess && (0 > b.value || 1 < b.value) && (b.isSuccess = !0), b.isSuccess && (c[2 * a] = d.x,
            c[2 * a + 1] = d.y, c[2 * (a + 1)] = f.x, c[2 * (a + 1) + 1] = f.y)
    }
};
cc.vertexLineIntersect = function(a, b, c, d, e, f, g, h) {
    if (a == c && b == d || e == g && f == h) return {
        isSuccess: !1,
        value: 0
    };
    c -= a;
    d -= b;
    e -= a;
    f -= b;
    g -= a;
    h -= b;
    a = Math.sqrt(c * c + d * d);
    c /= a;
    d /= a;
    b = e * c + f * d;
    f = f * c - e * d;
    e = b;
    b = g * c + h * d;
    h = h * c - g * d;
    g = b;
    return f == h ? {
        isSuccess: !1,
        value: 0
    } : {
        isSuccess: !0,
        value: (g + (e - g) * h / (h - f)) / a
    }
};
cc.CGAffineToGL = function(a, b) {
    b[2] = b[3] = b[6] = b[7] = b[8] = b[9] = b[11] = b[14] = 0;
    b[10] = b[15] = 1;
    b[0] = a.a;
    b[4] = a.c;
    b[12] = a.tx;
    b[1] = a.b;
    b[5] = a.d;
    b[13] = a.ty
};
cc.GLToCGAffine = function(a, b) {
    b.a = a[0];
    b.c = a[4];
    b.tx = a[12];
    b.b = a[1];
    b.d = a[5];
    b.ty = a[13]
};
cc.NODE_TAG_INVALID = -1;
cc.NODE_ON_ENTER = null;
cc.NODE_ON_EXIT = null;
cc.s_globalOrderOfArrival = 1;
cc.Node = cc.Class.extend({
    _zOrder: 0,
    _vertexZ: 0,
    _rotationX: 0,
    _rotationY: 0,
    _scaleX: 1,
    _scaleY: 1,
    _position: null,
    _skewX: 0,
    _skewY: 0,
    _children: null,
    _visible: !0,
    _anchorPoint: null,
    _anchorPointInPoints: null,
    _contentSize: null,
    _running: !1,
    _parent: null,
    _ignoreAnchorPointForPosition: !1,
    _tag: cc.NODE_TAG_INVALID,
    _userData: null,
    _userObject: null,
    _transformDirty: !0,
    _inverseDirty: !0,
    _cacheDirty: !0,
    _transformGLDirty: null,
    _transform: null,
    _inverse: null,
    _reorderChildDirty: !1,
    _shaderProgram: null,
    _orderOfArrival: 0,
    _actionManager: null,
    _scheduler: null,
    _initializedNode: !1,
    _additionalTransformDirty: !1,
    _additionalTransform: null,
    _componentContainer: null,
    _isTransitionFinished: !1,
    _rotationRadiansX: 0,
    _rotationRadiansY: 0,
    _initNode: function() {
        this._anchorPoint = cc._pConst(0, 0);
        this._anchorPointInPoints = cc._pConst(0, 0);
        this._contentSize = cc._sizeConst(0, 0);
        this._position = cc._pConst(0, 0);
        this._children = [];
        this._transform = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            tx: 0,
            ty: 0
        };
        var a = cc.Director.getInstance();
        this._actionManager = a.getActionManager();
        this._scheduler = a.getScheduler();
        this._initializedNode = !0;
        this._additionalTransform = cc.AffineTransformMakeIdentity();
        cc.ComponentContainer && (this._componentContainer = new cc.ComponentContainer(this))
    },
    init: function() {
        !1 === this._initializedNode && this._initNode();
        return !0
    },
    _arrayMakeObjectsPerformSelector: function(a, b) {
        if (a && 0 !== a.length) {
            var c, d = a.length,
                e;
            c = cc.Node.StateCallbackType;
            switch (b) {
                case c.onEnter:
                    for (c = 0; c < d; c++)
                        if (e = a[c]) e.onEnter();
                    break;
                case c.onExit:
                    for (c = 0; c < d; c++)
                        if (e = a[c]) e.onExit();
                    break;
                case c.onEnterTransitionDidFinish:
                    for (c =
                        0; c < d; c++)
                        if (e = a[c]) e.onEnterTransitionDidFinish();
                    break;
                case c.cleanup:
                    for (c = 0; c < d; c++)(e = a[c]) && e.cleanup();
                    break;
                case c.updateTransform:
                    for (c = 0; c < d; c++)(e = a[c]) && e.updateTransform();
                    break;
                case c.onExitTransitionDidStart:
                    for (c = 0; c < d; c++)
                        if (e = a[c]) e.onExitTransitionDidStart();
                    break;
                case c.sortAllChildren:
                    for (c = 0; c < d; c++)(e = a[c]) && e.sortAllChildren();
                    break;
                default:
                    throw "Unknown callback function";
            }
        }
    },
    setNodeDirty: null,
    _setNodeDirtyForCanvas: function() {
        this._setNodeDirtyForCache();
        !1 === this._transformDirty &&
            (this._transformDirty = this._inverseDirty = !0)
    },
    _setNodeDirtyForWebGL: function() {
        !1 === this._transformDirty && (this._transformDirty = this._inverseDirty = !0)
    },
    getSkewX: function() {
        return this._skewX
    },
    setSkewX: function(a) {
        this._skewX = a;
        this.setNodeDirty()
    },
    getSkewY: function() {
        return this._skewY
    },
    setSkewY: function(a) {
        this._skewY = a;
        this.setNodeDirty()
    },
    getZOrder: function() {
        return this._zOrder
    },
    _setZOrder: function(a) {
        this._zOrder = a
    },
    setZOrder: function(a) {
        this._setZOrder(a);
        this._parent && this._parent.reorderChild(this,
            a)
    },
    getVertexZ: function() {
        return this._vertexZ
    },
    setVertexZ: function(a) {
        this._vertexZ = a
    },
    getRotation: function() {
        this._rotationX !== this._rotationY && cc.log("cc.Node.rotation(): RotationX !\x3d RotationY. Don't know which one to return");
        return this._rotationX
    },
    setRotation: function(a) {
        this._rotationX = this._rotationY = a;
        this._rotationRadiansX = 0.017453292519943295 * this._rotationX;
        this._rotationRadiansY = 0.017453292519943295 * this._rotationY;
        this.setNodeDirty()
    },
    getRotationX: function() {
        return this._rotationX
    },
    setRotationX: function(a) {
        this._rotationX = a;
        this._rotationRadiansX = 0.017453292519943295 * this._rotationX;
        this.setNodeDirty()
    },
    getRotationY: function() {
        return this._rotationY
    },
    setRotationY: function(a) {
        this._rotationY = a;
        this._rotationRadiansY = 0.017453292519943295 * this._rotationY;
        this.setNodeDirty()
    },
    getScale: function() {
        this._scaleX !== this._scaleY && cc.log("cc.Node.getScale(): ScaleX !\x3d ScaleY. Don't know which one to return");
        return this._scaleX
    },
    setScale: function(a, b) {
        this._scaleX = a;
        this._scaleY = b ||
            0 === b ? b : a;
        this.setNodeDirty()
    },
    getScaleX: function() {
        return this._scaleX
    },
    setScaleX: function(a) {
        this._scaleX = a;
        this.setNodeDirty()
    },
    getScaleY: function() {
        return this._scaleY
    },
    setScaleY: function(a) {
        this._scaleY = a;
        this.setNodeDirty()
    },
    setPosition: function(a, b) {
        var c = this._position;
        2 == arguments.length ? (c._x = a, c._y = b) : 1 == arguments.length && (c._x = a.x, c._y = a.y);
        this.setNodeDirty()
    },
    getPosition: function() {
        return this._position
    },
    getPositionX: function() {
        return this._position._x
    },
    setPositionX: function(a) {
        this._position._x =
            a;
        this.setNodeDirty()
    },
    getPositionY: function() {
        return this._position._y
    },
    setPositionY: function(a) {
        this._position._y = a;
        this.setNodeDirty()
    },
    getChildrenCount: function() {
        return this._children.length
    },
    getChildren: function() {
        return this._children
    },
    isVisible: function() {
        return this._visible
    },
    setVisible: function(a) {
        this._visible = a;
        this.setNodeDirty()
    },
    getAnchorPoint: function() {
        return this._anchorPoint
    },
    setAnchorPoint: function(a, b) {
        var c = this._anchorPoint;
        if (2 === arguments.length) {
            if (a === c._x && b === c._y) return;
            c._x = a;
            c._y = b
        } else {
            if (a.x === c._x && a.y === c._y) return;
            c._x = a.x;
            c._y = a.y
        }
        var d = this._anchorPointInPoints,
            e = this._contentSize;
        d._x = e._width * c._x;
        d._y = e._height * c._y;
        this.setNodeDirty()
    },
    getAnchorPointInPoints: function() {
        return this._anchorPointInPoints
    },
    getContentSize: function() {
        return this._contentSize
    },
    setContentSize: function(a, b) {
        var c = this._contentSize;
        if (2 === arguments.length) {
            if (a === c._width && b === c._height) return;
            c._width = a;
            c._height = b
        } else {
            if (a.width === c._width && a.height === c._height) return;
            c._width =
                a.width;
            c._height = a.height
        }
        var d = this._anchorPointInPoints,
            e = this._anchorPoint;
        d._x = c._width * e._x;
        d._y = c._height * e._y;
        this.setNodeDirty()
    },
    isRunning: function() {
        return this._running
    },
    getParent: function() {
        return this._parent
    },
    setParent: function(a) {
        this._parent = a
    },
    isIgnoreAnchorPointForPosition: function() {
        return this._ignoreAnchorPointForPosition
    },
    ignoreAnchorPointForPosition: function(a) {
        a != this._ignoreAnchorPointForPosition && (this._ignoreAnchorPointForPosition = a, this.setNodeDirty())
    },
    getTag: function() {
        return this._tag
    },
    setTag: function(a) {
        this._tag = a
    },
    getUserData: function() {
        return this._userData
    },
    setUserData: function(a) {
        this._userData = a
    },
    getUserObject: function() {
        return this._userObject
    },
    setUserObject: function(a) {
        this._userObject != a && (this._userObject = a)
    },
    getOrderOfArrival: function() {
        return this._orderOfArrival
    },
    setOrderOfArrival: function(a) {
        this._orderOfArrival = a
    },
    getActionManager: function() {
        this._actionManager || (this._actionManager = cc.Director.getInstance().getActionManager());
        return this._actionManager
    },
    setActionManager: function(a) {
        this._actionManager !=
            a && (this.stopAllActions(), this._actionManager = a)
    },
    getScheduler: function() {
        this._scheduler || (this._scheduler = cc.Director.getInstance().getScheduler());
        return this._scheduler
    },
    setScheduler: function(a) {
        this._scheduler != a && (this.unscheduleAllCallbacks(), this._scheduler = a)
    },
    getBoundingBox: function() {
        var a = cc.rect(0, 0, this._contentSize._width, this._contentSize._height);
        return cc._RectApplyAffineTransformIn(a, this.nodeToParentTransform())
    },
    cleanup: function() {
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.cleanup)
    },
    description: function() {
        return "\x3ccc.Node | Tag \x3d" + this._tag + "\x3e"
    },
    getChildByTag: function(a) {
        var b = this._children;
        if (null != b)
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                if (d && d._tag == a) return d
            }
        return null
    },
    addChild: function(a, b, c) {
        if (!a) throw "cc.Node.addChild(): child must be non-null";
        if (a === this) cc.log("cc.Node.addChild(): An Node can't be added as a child of itself.");
        else if (null !== a._parent) cc.log("cc.Node.addChild(): child already added. It can't be added again");
        else if (b = null != b ? b : a._zOrder, a._tag = null != c ? c : a._tag, this._insertChild(a, b), a._parent = this, this._running && (a.onEnter(), this._isTransitionFinished)) a.onEnterTransitionDidFinish()
    },
    removeFromParent: function(a) {
        this._parent && (null == a && (a = !0), this._parent.removeChild(this, a))
    },
    removeFromParentAndCleanup: function(a) {
        cc.log("removeFromParentAndCleanup is deprecated. Use removeFromParent instead");
        this.removeFromParent(a)
    },
    removeChild: function(a, b) {
        0 !== this._children.length && (null == b && (b = !0), -1 < this._children.indexOf(a) &&
            this._detachChild(a, b), this.setNodeDirty())
    },
    removeChildByTag: function(a, b) {
        a === cc.NODE_TAG_INVALID && cc.log("cc.Node.removeChildByTag(): argument tag is an invalid tag");
        var c = this.getChildByTag(a);
        null == c ? cc.log("cocos2d: removeChildByTag(tag \x3d " + a + "): child not found!") : this.removeChild(c, b)
    },
    removeAllChildrenWithCleanup: function(a) {
        cc.log("removeAllChildrenWithCleanup is deprecated. Use removeAllChildren instead");
        this.removeAllChildren(a)
    },
    removeAllChildren: function(a) {
        var b = this._children;
        if (null != b) {
            null == a && (a = !0);
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d && (this._running && (d.onExitTransitionDidStart(), d.onExit()), a && d.cleanup(), d.setParent(null))
            }
            this._children.length = 0
        }
    },
    _detachChild: function(a, b) {
        this._running && (a.onExitTransitionDidStart(), a.onExit());
        b && a.cleanup();
        a.setParent(null);
        cc.ArrayRemoveObject(this._children, a)
    },
    _insertChild: function(a, b) {
        this._reorderChildDirty = !0;
        this._children.push(a);
        a._setZOrder(b)
    },
    reorderChild: function(a, b) {
        if (!a) throw "cc.Node.reorderChild(): child must be non-null";
        this._reorderChildDirty = !0;
        a.setOrderOfArrival(cc.s_globalOrderOfArrival++);
        a._setZOrder(b);
        this.setNodeDirty()
    },
    sortAllChildren: function() {
        if (this._reorderChildDirty) {
            var a = this._children,
                b, c, d = a.length,
                e;
            for (b = 0; b < d; b++) {
                var f = a[b];
                c = b - 1;
                for (e = a[c]; 0 <= c && (f._zOrder < e._zOrder || f._zOrder == e._zOrder && f._orderOfArrival < e._orderOfArrival);) a[c + 1] = e, c -= 1, e = a[c];
                a[c + 1] = f
            }
            this._reorderChildDirty = !1
        }
    },
    draw: function(a) {},
    transformAncestors: function() {
        null != this._parent && (this._parent.transformAncestors(),
            this._parent.transform())
    },
    onEnter: function() {
        this._isTransitionFinished = !1;
        this._running = !0;
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onEnter);
        this.resumeSchedulerAndActions()
    },
    onEnterTransitionDidFinish: function() {
        this._isTransitionFinished = !0;
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onEnterTransitionDidFinish)
    },
    onExitTransitionDidStart: function() {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onExitTransitionDidStart)
    },
    onExit: function() {
        this._running = !1;
        this.pauseSchedulerAndActions();
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onExit);
        this._componentContainer && this._componentContainer.removeAll()
    },
    runAction: function(a) {
        if (!a) throw "cc.Node.runAction(): action must be non-null";
        this.getActionManager().addAction(a, this, !this._running);
        return a
    },
    stopAllActions: function() {
        this.getActionManager().removeAllActionsFromTarget(this)
    },
    stopAction: function(a) {
        this.getActionManager().removeAction(a)
    },
    stopActionByTag: function(a) {
        a === cc.ACTION_TAG_INVALID ? cc.log("cc.Node.stopActionBy(): argument tag an invalid tag") : this.getActionManager().removeActionByTag(a, this)
    },
    getActionByTag: function(a) {
        return a === cc.ACTION_TAG_INVALID ? (cc.log("cc.Node.getActionByTag(): argument tag is an invalid tag"), null) : this.getActionManager().getActionByTag(a, this)
    },
    getNumberOfRunningActions: function() {
        return this.getActionManager().numberOfRunningActionsInTarget(this)
    },
    scheduleUpdate: function() {
        this.scheduleUpdateWithPriority(0)
    },
    scheduleUpdateWithPriority: function(a) {
        this.getScheduler().scheduleUpdateForTarget(this, a, !this._running)
    },
    unscheduleUpdate: function() {
        this.getScheduler().unscheduleUpdateForTarget(this)
    },
    schedule: function(a, b, c, d) {
        b = b || 0;
        if (!a) throw "cc.Node.schedule(): callback function must be non-null";
        if (0 > b) throw "cc.Node.schedule(): interval must be positive";
        c = null == c ? cc.REPEAT_FOREVER : c;
        d = d || 0;
        this.getScheduler().scheduleCallbackForTarget(this, a, b, c, d, !this._running)
    },
    scheduleOnce: function(a, b) {
        this.schedule(a,
            0, 0, b)
    },
    unschedule: function(a) {
        a && this.getScheduler().unscheduleCallbackForTarget(this, a)
    },
    unscheduleAllCallbacks: function() {
        this.getScheduler().unscheduleAllCallbacksForTarget(this)
    },
    resumeSchedulerAndActions: function() {
        this.getScheduler().resumeTarget(this);
        this.getActionManager().resumeTarget(this)
    },
    pauseSchedulerAndActions: function() {
        this.getScheduler().pauseTarget(this);
        this.getActionManager().pauseTarget(this)
    },
    setAdditionalTransform: function(a) {
        this._additionalTransform = a;
        this._additionalTransformDirty =
            this._transformDirty = !0
    },
    parentToNodeTransform: function() {
        this._inverseDirty && (this._inverse = cc.AffineTransformInvert(this.nodeToParentTransform()), this._inverseDirty = !1);
        return this._inverse
    },
    nodeToWorldTransform: function() {
        for (var a = this.nodeToParentTransform(), b = this._parent; null != b; b = b.getParent()) a = cc.AffineTransformConcat(a, b.nodeToParentTransform());
        return a
    },
    worldToNodeTransform: function() {
        return cc.AffineTransformInvert(this.nodeToWorldTransform())
    },
    convertToNodeSpace: function(a) {
        return cc.PointApplyAffineTransform(a,
            this.worldToNodeTransform())
    },
    convertToWorldSpace: function(a) {
        return cc.PointApplyAffineTransform(a, this.nodeToWorldTransform())
    },
    convertToNodeSpaceAR: function(a) {
        return cc.pSub(this.convertToNodeSpace(a), this._anchorPointInPoints)
    },
    convertToWorldSpaceAR: function(a) {
        a = cc.pAdd(a, this._anchorPointInPoints);
        return this.convertToWorldSpace(a)
    },
    _convertToWindowSpace: function(a) {
        a = this.convertToWorldSpace(a);
        return cc.Director.getInstance().convertToUI(a)
    },
    convertTouchToNodeSpace: function(a) {
        a = a.getLocation();
        return this.convertToNodeSpace(a)
    },
    convertTouchToNodeSpaceAR: function(a) {
        a = a.getLocation();
        a = cc.Director.getInstance().convertToGL(a);
        return this.convertToNodeSpaceAR(a)
    },
    update: function(a) {
        this._componentContainer && !this._componentContainer.isEmpty() && this._componentContainer.visit(a)
    },
    updateTransform: function() {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform)
    },
    retain: function() {},
    release: function() {},
    getComponent: function(a) {
        return this._componentContainer.getComponent(a)
    },
    addComponent: function(a) {
        this._componentContainer.add(a)
    },
    removeComponent: function(a) {
        return this._componentContainer.remove(a)
    },
    removeAllComponents: function() {
        this._componentContainer.removeAll()
    },
    _transform4x4: null,
    _stackMatrix: null,
    _glServerState: null,
    _camera: null,
    _grid: null,
    ctor: null,
    _ctorForCanvas: function() {
        this._initNode()
    },
    _ctorForWebGL: function() {
        this._initNode();
        var a = new cc.kmMat4;
        a.mat[2] = a.mat[3] = a.mat[6] = a.mat[7] = a.mat[8] = a.mat[9] = a.mat[11] = a.mat[14] = 0;
        a.mat[10] = a.mat[15] = 1;
        this._transform4x4 =
            a;
        this._glServerState = 0;
        this._stackMatrix = new cc.kmMat4
    },
    visit: null,
    _visitForCanvas: function(a) {
        if (this._visible) {
            a = a || cc.renderContext;
            var b, c = this._children,
                d;
            a.save();
            this.transform(a);
            var e = c.length;
            if (0 < e) {
                this.sortAllChildren();
                for (b = 0; b < e; b++)
                    if (d = c[b], 0 > d._zOrder) d.visit(a);
                    else break;
                for (this.draw(a); b < e; b++) c[b].visit(a)
            } else this.draw(a);
            this._orderOfArrival = 0;
            a.restore()
        }
    },
    _visitForWebGL: function() {
        if (this._visible) {
            var a = cc.renderContext,
                b, c = cc.current_stack;
            c.stack.push(c.top);
            cc.kmMat4Assign(this._stackMatrix,
                c.top);
            c.top = this._stackMatrix;
            var d = this._grid;
            d && d._active && d.beforeDraw();
            this.transform();
            var e = this._children;
            if (e && 0 < e.length) {
                var f = e.length;
                this.sortAllChildren();
                for (b = 0; b < f; b++)
                    if (e[b] && 0 > e[b]._zOrder) e[b].visit();
                    else break;
                for (this.draw(a); b < f; b++) e[b] && e[b].visit()
            } else this.draw(a);
            this._orderOfArrival = 0;
            d && d._active && d.afterDraw(this);
            c.top = c.stack.pop()
        }
    },
    transform: null,
    _transformForCanvas: function(a) {
        a = a || cc.renderContext;
        var b = cc.EGLView.getInstance(),
            c = this.nodeToParentTransform();
        a.transform(c.a, c.c, c.b, c.d, c.tx * b.getScaleX(), -c.ty * b.getScaleY())
    },
    _transformForWebGL: function() {
        var a = this._transform4x4,
            b = cc.current_stack.top,
            c = this.nodeToParentTransform(),
            d = a.mat;
        d[0] = c.a;
        d[4] = c.c;
        d[12] = c.tx;
        d[1] = c.b;
        d[5] = c.d;
        d[13] = c.ty;
        d[14] = this._vertexZ;
        cc.kmMat4Multiply(b, b, a);
        null == this._camera || null != this._grid && this._grid.isActive() || (a = this._anchorPointInPoints._x, b = this._anchorPointInPoints._y, 0 !== a || 0 !== b ? (cc.kmGLTranslatef(cc.RENDER_IN_SUBPIXEL(a), cc.RENDER_IN_SUBPIXEL(b), 0), this._camera.locate(),
            cc.kmGLTranslatef(cc.RENDER_IN_SUBPIXEL(-a), cc.RENDER_IN_SUBPIXEL(-b), 0)) : this._camera.locate())
    },
    nodeToParentTransform: null,
    _nodeToParentTransformForCanvas: function() {
        if (this._transformDirty) {
            var a = this._transform;
            a.tx = this._position._x;
            a.ty = this._position._y;
            var b = 1,
                c = 0;
            this._rotationX && (b = Math.cos(this._rotationRadiansX), c = Math.sin(this._rotationRadiansX));
            a.a = a.d = b;
            a.b = -c;
            a.c = c;
            var d = this._scaleX,
                e = this._scaleY,
                f = this._anchorPointInPoints._x,
                g = this._anchorPointInPoints._y,
                h = 1E-6 > d && -1E-6 < d ? 1E-6 :
                d,
                k = 1E-6 > e && -1E-6 < e ? 1E-6 : e;
            if (this._skewX || this._skewY) {
                var m = Math.tan(-this._skewX * Math.PI / 180),
                    n = Math.tan(-this._skewY * Math.PI / 180),
                    p = g * m * h,
                    q = f * n * k;
                a.a = b + -c * n;
                a.b = b * m + -c;
                a.c = c + b * n;
                a.d = c * m + b;
                a.tx += b * p + -c * q;
                a.ty += c * p + b * q
            }
            if (1 !== d || 1 !== e) a.a *= h, a.c *= h, a.b *= k, a.d *= k;
            a.tx += b * -f * h + -c * g * k;
            a.ty -= c * -f * h + b * g * k;
            this._ignoreAnchorPointForPosition && (a.tx += f, a.ty += g);
            this._additionalTransformDirty && (this._transform = cc.AffineTransformConcat(a, this._additionalTransform), this._additionalTransformDirty = !1);
            this._transformDirty = !1
        }
        return this._transform
    },
    _nodeToParentTransformForWebGL: function() {
        if (this._transformDirty) {
            var a = this._position._x,
                b = this._position._y,
                c = this._anchorPointInPoints._x,
                d = -c,
                e = this._anchorPointInPoints._y,
                f = -e,
                g = this._scaleX,
                h = this._scaleY;
            this._ignoreAnchorPointForPosition && (a += c, b += e);
            var k = 1,
                m = 0,
                n = 1,
                p = 0;
            if (0 !== this._rotationX || 0 !== this._rotationY) k = Math.cos(-this._rotationRadiansX), m = Math.sin(-this._rotationRadiansX), n = Math.cos(-this._rotationRadiansY), p = Math.sin(-this._rotationRadiansY);
            var q =
                this._skewX || this._skewY;
            q || 0 === c && 0 === e || (a += n * d * g + -m * f * h, b += p * d * g + k * f * h);
            var r = this._transform;
            r.a = n * g;
            r.b = p * g;
            r.c = -m * h;
            r.d = k * h;
            r.tx = a;
            r.ty = b;
            q && (r = cc.AffineTransformConcat({
                a: 1,
                b: Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)),
                c: Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)),
                d: 1,
                tx: 0,
                ty: 0
            }, r), 0 !== c || 0 !== e) && (r = cc.AffineTransformTranslate(r, d, f));
            this._additionalTransformDirty && (r = cc.AffineTransformConcat(r, this._additionalTransform), this._additionalTransformDirty = !1);
            this._transform = r;
            this._transformDirty = !1
        }
        return this._transform
    },
    _setNodeDirtyForCache: function() {
        this._cacheDirty = !0;
        this._parent && this._parent._setNodeDirtyForCache()
    },
    getCamera: function() {
        this._camera || (this._camera = new cc.Camera);
        return this._camera
    },
    getGrid: function() {
        return this._grid
    },
    setGrid: function(a) {
        this._grid = a
    },
    getShaderProgram: function() {
        return this._shaderProgram
    },
    setShaderProgram: function(a) {
        this._shaderProgram = a
    },
    getGLServerState: function() {
        return this._glServerState
    },
    setGLServerState: function(a) {
        this._glServerState =
            a
    },
    getBoundingBoxToWorld: function() {
        var a = cc.rect(0, 0, this._contentSize._width, this._contentSize._height),
            b = this.nodeToWorldTransform(),
            a = cc.RectApplyAffineTransform(a, this.nodeToWorldTransform());
        if (!this._children) return a;
        for (var c = this._children, d = 0; d < c.length; d++) {
            var e = c[d];
            e && e._visible && (e = e._getBoundingBoxToCurrentNode(b)) && (a = cc.rectUnion(a, e))
        }
        return a
    },
    _getBoundingBoxToCurrentNode: function(a) {
        var b = cc.rect(0, 0, this._contentSize._width, this._contentSize._height);
        a = null == a ? this.nodeToParentTransform() :
            cc.AffineTransformConcat(this.nodeToParentTransform(), a);
        b = cc.RectApplyAffineTransform(b, a);
        if (!this._children) return b;
        for (var c = this._children, d = 0; d < c.length; d++) {
            var e = c[d];
            e && e._visible && (e = e._getBoundingBoxToCurrentNode(a)) && (b = cc.rectUnion(b, e))
        }
        return b
    }
});
cc.Browser.supportWebGL ? (cc.Node.prototype.ctor = cc.Node.prototype._ctorForWebGL, cc.Node.prototype.setNodeDirty = cc.Node.prototype._setNodeDirtyForWebGL, cc.Node.prototype.visit = cc.Node.prototype._visitForWebGL, cc.Node.prototype.transform = cc.Node.prototype._transformForWebGL, cc.Node.prototype.nodeToParentTransform = cc.Node.prototype._nodeToParentTransformForWebGL) : (cc.Node.prototype.ctor = cc.Node.prototype._ctorForCanvas, cc.Node.prototype.setNodeDirty = cc.Node.prototype._setNodeDirtyForCanvas, cc.Node.prototype.visit =
    cc.Node.prototype._visitForCanvas, cc.Node.prototype.transform = cc.Node.prototype._transformForCanvas, cc.Node.prototype.nodeToParentTransform = cc.Node.prototype._nodeToParentTransformForCanvas);
cc.Node.create = function() {
    return new cc.Node
};
cc.Node.StateCallbackType = {
    onEnter: 1,
    onExit: 2,
    cleanup: 3,
    onEnterTransitionDidFinish: 4,
    updateTransform: 5,
    onExitTransitionDidStart: 6,
    sortAllChildren: 7
};
cc.NodeRGBA = cc.Node.extend({
    RGBAProtocol: !0,
    _displayedOpacity: 255,
    _realOpacity: 255,
    _displayedColor: null,
    _realColor: null,
    _cascadeColorEnabled: !1,
    _cascadeOpacityEnabled: !1,
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        this._realOpacity = this._displayedOpacity = 255;
        this._displayedColor = cc.white();
        this._realColor = cc.white();
        this._cascadeOpacityEnabled = this._cascadeColorEnabled = !1
    },
    getOpacity: function() {
        return this._realOpacity
    },
    getDisplayedOpacity: function() {
        return this._displayedOpacity
    },
    setOpacity: function(a) {
        this._displayedOpacity =
            this._realOpacity = a;
        a = 255;
        var b = this._parent;
        b && b.RGBAProtocol && b.isCascadeOpacityEnabled() && (a = b.getDisplayedOpacity());
        this.updateDisplayedOpacity(a)
    },
    updateDisplayedOpacity: function(a) {
        this._displayedOpacity = this._realOpacity * a / 255;
        if (this._cascadeOpacityEnabled) {
            a = this._children;
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                c && c.RGBAProtocol && c.updateDisplayedOpacity(this._displayedOpacity)
            }
        }
    },
    isCascadeOpacityEnabled: function() {
        return this._cascadeOpacityEnabled
    },
    setCascadeOpacityEnabled: function(a) {
        this._cascadeOpacityEnabled !==
            a && ((this._cascadeOpacityEnabled = a) ? this._enableCascadeOpacity() : this._disableCascadeOpacity())
    },
    _enableCascadeOpacity: function() {
        var a = 255,
            b = this._parent;
        b && b.RGBAProtocol && b.isCascadeOpacityEnabled() && (a = b.getDisplayedOpacity());
        this.updateDisplayedOpacity(a)
    },
    _disableCascadeOpacity: function() {
        this._displayedOpacity = this._realOpacity;
        for (var a = this._children, b = 0; b < a.length; b++) {
            var c = a[b];
            c && c.RGBAProtocol && c.updateDisplayedOpacity(255)
        }
    },
    getColor: function() {
        var a = this._realColor;
        return new cc.Color3B(a.r,
            a.g, a.b)
    },
    getDisplayedColor: function() {
        return this._displayedColor
    },
    setColor: function(a) {
        var b = this._displayedColor,
            c = this._realColor;
        b.r = c.r = a.r;
        b.g = c.g = a.g;
        b.b = c.b = a.b;
        a = (a = this._parent) && a.RGBAProtocol && a.isCascadeColorEnabled() ? a.getDisplayedColor() : cc.white();
        this.updateDisplayedColor(a)
    },
    updateDisplayedColor: function(a) {
        var b = this._displayedColor,
            c = this._realColor;
        b.r = 0 | c.r * a.r / 255;
        b.g = 0 | c.g * a.g / 255;
        b.b = 0 | c.b * a.b / 255;
        if (this._cascadeColorEnabled)
            for (a = this._children, c = 0; c < a.length; c++) {
                var d =
                    a[c];
                d && d.RGBAProtocol && d.updateDisplayedColor(b)
            }
    },
    isCascadeColorEnabled: function() {
        return this._cascadeColorEnabled
    },
    setCascadeColorEnabled: function(a) {
        this._cascadeColorEnabled !== a && ((this._cascadeColorEnabled = a) ? this._enableCascadeColor() : this._disableCascadeColor())
    },
    _enableCascadeColor: function() {
        var a;
        a = (a = this._parent) && a.RGBAProtocol && a.isCascadeColorEnabled() ? a.getDisplayedColor() : cc.white();
        this.updateDisplayedColor(a)
    },
    _disableCascadeColor: function() {
        var a = this._displayedColor,
            b = this._realColor;
        a.r = b.r;
        a.g = b.g;
        a.b = b.b;
        for (var a = this._children, b = cc.white(), c = 0; c < a.length; c++) {
            var d = a[c];
            d && d.RGBAProtocol && d.updateDisplayedColor(b)
        }
    },
    addChild: function(a, b, c) {
        cc.Node.prototype.addChild.call(this, a, b, c);
        this._cascadeColorEnabled && this._enableCascadeColor();
        this._cascadeOpacityEnabled && this._enableCascadeOpacity()
    },
    setOpacityModifyRGB: function(a) {},
    isOpacityModifyRGB: function() {
        return !1
    }
});
cc.NodeRGBA.create = function() {
    var a = new cc.NodeRGBA;
    a.init();
    return a
};
cc.AtlasNode = cc.NodeRGBA.extend({
    RGBAProtocol: !0,
    _itemsPerRow: 0,
    _itemsPerColumn: 0,
    _itemWidth: 0,
    _itemHeight: 0,
    _colorUnmodified: null,
    _textureAtlas: null,
    _opacityModifyRGB: !1,
    _blendFunc: null,
    _quadsToDraw: 0,
    _ignoreContentScaleFactor: !1,
    ctor: function() {
        cc.NodeRGBA.prototype.ctor.call(this);
        this._colorUnmodified = cc.white();
        this._blendFunc = {
            src: cc.BLEND_SRC,
            dst: cc.BLEND_DST
        };
        this._ignoreContentScaleFactor = !1
    },
    updateAtlasValues: function() {
        cc.log("cc.AtlasNode.updateAtlasValues(): Shall be overridden in subclasses")
    },
    getColor: function() {
        return this._opacityModifyRGB ? this._colorUnmodified : cc.NodeRGBA.prototype.getColor.call(this)
    },
    setOpacityModifyRGB: function(a) {
        var b = this.getColor();
        this._opacityModifyRGB = a;
        this.setColor(b)
    },
    isOpacityModifyRGB: function() {
        return this._opacityModifyRGB
    },
    getBlendFunc: function() {
        return this._blendFunc
    },
    setBlendFunc: function(a, b) {
        this._blendFunc = 1 == arguments.length ? a : {
            src: a,
            dst: b
        }
    },
    setTextureAtlas: function(a) {
        this._textureAtlas = a
    },
    getTextureAtlas: function() {
        return this._textureAtlas
    },
    getQuadsToDraw: function() {
        return this._quadsToDraw
    },
    setQuadsToDraw: function(a) {
        this._quadsToDraw = a
    },
    _textureForCanvas: null,
    _originalTexture: null,
    _uniformColor: null,
    _colorF32Array: null,
    initWithTileFile: function(a, b, c, d) {
        if (!a) throw "cc.AtlasNode.initWithTileFile(): title should not be null";
        a = cc.TextureCache.getInstance().addImage(a);
        return this.initWithTexture(a, b, c, d)
    },
    initWithTexture: null,
    _initWithTextureForCanvas: function(a, b, c, d) {
        this._itemWidth = b;
        this._itemHeight = c;
        this._opacityModifyRGB = !0;
        this._originalTexture =
            a;
        if (!this._originalTexture) return cc.log("cocos2d: Could not initialize cc.AtlasNode. Invalid Texture."), !1;
        this._textureForCanvas = this._originalTexture;
        this._calculateMaxItems();
        this._quadsToDraw = d;
        return !0
    },
    _initWithTextureForWebGL: function(a, b, c, d) {
        this._itemWidth = b;
        this._itemHeight = c;
        this._colorUnmodified = cc.white();
        this._opacityModifyRGB = !0;
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        b = this._realColor;
        this._colorF32Array = new Float32Array([b.r / 255, b.g / 255, b.b / 255, this._realOpacity /
            255
        ]);
        this._textureAtlas = new cc.TextureAtlas;
        this._textureAtlas.initWithTexture(a, d);
        if (!this._textureAtlas) return cc.log("cocos2d: Could not initialize cc.AtlasNode. Invalid Texture."), !1;
        this._updateBlendFunc();
        this._updateOpacityModifyRGB();
        this._calculateMaxItems();
        this._quadsToDraw = d;
        this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURE_UCOLOR));
        this._uniformColor = cc.renderContext.getUniformLocation(this.getShaderProgram().getProgram(), "u_color");
        return !0
    },
    draw: null,
    _drawForWebGL: function(a) {
        a = a || cc.renderContext;
        cc.NODE_DRAW_SETUP(this);
        cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
        a.uniform4fv(this._uniformColor, this._colorF32Array);
        this._textureAtlas.drawNumberOfQuads(this._quadsToDraw, 0)
    },
    setColor: null,
    _setColorForCanvas: function(a) {
        var b = this._realColor;
        if (b.r != a.r || b.g != a.g || b.b != a.b) {
            b = new cc.Color3B(a.r, a.g, a.b);
            this._colorUnmodified = a;
            if (this._opacityModifyRGB) {
                var c = this._displayedOpacity;
                b.r = b.r * c / 255;
                b.g = b.g * c / 255;
                b.b = b.b * c / 255
            }
            cc.NodeRGBA.prototype.setColor.call(this,
                a);
            this.getTexture() && (a = this._originalTexture.getHtmlElementObj()) && (b = cc.TextureCache.getInstance().getTextureColors(a)) && (c = cc.rect(0, 0, a.width, a.height), a = cc.generateTintImage(a, b, this._realColor, c), b = new cc.Texture2D, b.initWithElement(a), b.handleLoadedTexture(), this.setTexture(b))
        }
    },
    _setColorForWebGL: function(a) {
        var b = cc.Color3B(a.r, a.g, a.b);
        this._colorUnmodified = a;
        var c = this._displayedOpacity;
        this._opacityModifyRGB && (b.r = b.r * c / 255, b.g = b.g * c / 255, b.b = b.b * c / 255);
        cc.NodeRGBA.prototype.setColor.call(this,
            a);
        a = this._displayedColor;
        this._colorF32Array = new Float32Array([a.r / 255, a.g / 255, a.b / 255, c / 255])
    },
    setOpacity: null,
    _setOpacityForCanvas: function(a) {
        cc.NodeRGBA.prototype.setOpacity.call(this, a);
        this._opacityModifyRGB && this.setColor(this._colorUnmodified)
    },
    _setOpacityForWebGL: function(a) {
        cc.NodeRGBA.prototype.setOpacity.call(this, a);
        this._opacityModifyRGB ? this.setColor(this._colorUnmodified) : (a = this._displayedColor, this._colorF32Array = new Float32Array([a.r / 255, a.g / 255, a.b / 255, this._displayedOpacity /
            255
        ]))
    },
    getTexture: null,
    _getTextureForCanvas: function() {
        return this._textureForCanvas
    },
    _getTextureForWebGL: function() {
        return this._textureAtlas.getTexture()
    },
    setTexture: null,
    _setTextureForCanvas: function(a) {
        this._textureForCanvas = a
    },
    _setTextureForWebGL: function(a) {
        this._textureAtlas.setTexture(a);
        this._updateBlendFunc();
        this._updateOpacityModifyRGB()
    },
    _calculateMaxItems: null,
    _calculateMaxItemsForCanvas: function() {
        var a = this.getTexture().getContentSize();
        this._itemsPerColumn = 0 | a.height / this._itemHeight;
        this._itemsPerRow = 0 | a.width / this._itemWidth
    },
    _calculateMaxItemsForWebGL: function() {
        var a = this.getTexture(),
            b = a.getContentSize();
        this._ignoreContentScaleFactor && (b = a.getContentSizeInPixels());
        this._itemsPerColumn = 0 | b.height / this._itemHeight;
        this._itemsPerRow = 0 | b.width / this._itemWidth
    },
    _updateBlendFunc: function() {
        this._textureAtlas.getTexture().hasPremultipliedAlpha() || (this._blendFunc.src = gl.SRC_ALPHA, this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA)
    },
    _updateOpacityModifyRGB: function() {
        this._opacityModifyRGB =
            this._textureAtlas.getTexture().hasPremultipliedAlpha()
    },
    _setIgnoreContentScaleFactor: function(a) {
        this._ignoreContentScaleFactor = a
    }
});
cc.Browser.supportWebGL ? (cc.AtlasNode.prototype.initWithTexture = cc.AtlasNode.prototype._initWithTextureForWebGL, cc.AtlasNode.prototype.draw = cc.AtlasNode.prototype._drawForWebGL, cc.AtlasNode.prototype.setColor = cc.AtlasNode.prototype._setColorForWebGL, cc.AtlasNode.prototype.setOpacity = cc.AtlasNode.prototype._setOpacityForWebGL, cc.AtlasNode.prototype.getTexture = cc.AtlasNode.prototype._getTextureForWebGL, cc.AtlasNode.prototype.setTexture = cc.AtlasNode.prototype._setTextureForWebGL, cc.AtlasNode.prototype._calculateMaxItems =
    cc.AtlasNode.prototype._calculateMaxItemsForWebGL) : (cc.AtlasNode.prototype.initWithTexture = cc.AtlasNode.prototype._initWithTextureForCanvas, cc.AtlasNode.prototype.draw = cc.Node.prototype.draw, cc.AtlasNode.prototype.setColor = cc.AtlasNode.prototype._setColorForCanvas, cc.AtlasNode.prototype.setOpacity = cc.AtlasNode.prototype._setOpacityForCanvas, cc.AtlasNode.prototype.getTexture = cc.AtlasNode.prototype._getTextureForCanvas, cc.AtlasNode.prototype.setTexture = cc.AtlasNode.prototype._setTextureForCanvas, cc.AtlasNode.prototype._calculateMaxItems =
    cc.AtlasNode.prototype._calculateMaxItemsForCanvas);
cc.AtlasNode.create = function(a, b, c, d) {
    var e = new cc.AtlasNode;
    return e.initWithTileFile(a, b, c, d) ? e : null
};
cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888 = 0;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB888 = 1;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB565 = 2;
cc.TEXTURE_2D_PIXEL_FORMAT_A8 = 3;
cc.TEXTURE_2D_PIXEL_FORMAT_I8 = 4;
cc.TEXTURE_2D_PIXEL_FORMAT_AI88 = 5;
cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444 = 6;
cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1 = 7;
cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC4 = 8;
cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC2 = 9;
cc.TEXTURE_2D_PIXEL_FORMAT_DEFAULT = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888;
cc._defaultAlphaPixelFormat = cc.TEXTURE_2D_PIXEL_FORMAT_DEFAULT;
cc.PVRHaveAlphaPremultiplied_ = !1;
cc._texParams = function(a, b, c, d) {
    this.minFilter = a || 0;
    this.magFilter = b || 0;
    this.wrapS = c || 0;
    this.wrapT = d || 0
};
cc.Texture2DWebGL = cc.Class.extend({
    _pVRHaveAlphaPremultiplied: null,
    _pixelFormat: null,
    _pixelsWide: null,
    _pixelsHigh: null,
    _name: null,
    _contentSize: null,
    _maxS: null,
    _maxT: null,
    _hasPremultipliedAlpha: null,
    _hasMipmaps: !1,
    _shaderProgram: null,
    _isLoaded: !1,
    _htmlElementObj: null,
    _webTextureObj: null,
    _loadedEventListeners: null,
    ctor: function() {
        this._pixelsHigh = this._pixelsWide = 0;
        this._name = "";
        this._maxT = this._maxS = 0;
        this._hasPremultipliedAlpha = !1;
        this._contentSize = cc._sizeConst(0, 0);
        this._hasMipmaps = !1;
        this._pVRHaveAlphaPremultiplied = !0;
        this._pixelFormat = cc.Texture2D.defaultAlphaPixelFormat();
        this._shaderProgram = null;
        this._isLoaded = !1;
        this._webTextureObj = this._htmlElementObj = null
    },
    releaseTexture: function() {
        this._webTextureObj && cc.renderContext.deleteTexture(this._webTextureObj)
    },
    getPixelFormat: function() {
        return this._pixelFormat
    },
    getPixelsWide: function() {
        return this._pixelsWide
    },
    getPixelsHigh: function() {
        return this._pixelsHigh
    },
    getName: function() {
        return this._webTextureObj
    },
    getContentSize: function() {
        return cc.size(this._contentSize.width /
            cc.CONTENT_SCALE_FACTOR(), this._contentSize.height / cc.CONTENT_SCALE_FACTOR())
    },
    getContentSizeInPixels: function() {
        return this._contentSize
    },
    getMaxS: function() {
        return this._maxS
    },
    setMaxS: function(a) {
        this._maxS = a
    },
    getMaxT: function() {
        return this._maxT
    },
    setMaxT: function(a) {
        this._maxT = a
    },
    getShaderProgram: function() {
        return this._shaderProgram
    },
    setShaderProgram: function(a) {
        this._shaderProgram = a
    },
    hasPremultipliedAlpha: function() {
        return this._hasPremultipliedAlpha
    },
    hasMipmaps: function() {
        return this._hasMipmaps
    },
    description: function() {
        return "\x3ccc.Texture2D | Name \x3d " + this._name + " | Dimensions \x3d " + this._pixelsWide + " x " + this._pixelsHigh + " | Coordinates \x3d (" + this._maxS + ", " + this._maxT + ")\x3e"
    },
    releaseData: function(a) {},
    keepData: function(a, b) {
        return a
    },
    initWithData: function(a, b, c, d, e) {
        var f = cc.renderContext,
            g = 0,
            g = b === cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888 ? 24 : this.bitsPerPixelForFormat(b),
            g = c * g / 8;
        0 === g % 8 ? f.pixelStorei(f.UNPACK_ALIGNMENT, 8) : 0 === g % 4 ? f.pixelStorei(f.UNPACK_ALIGNMENT, 4) : 0 === g % 2 ? f.pixelStorei(f.UNPACK_ALIGNMENT,
            2) : f.pixelStorei(f.UNPACK_ALIGNMENT, 1);
        this._webTextureObj = f.createTexture();
        cc.glBindTexture2D(this);
        f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.LINEAR);
        f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.LINEAR);
        f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE);
        f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE);
        switch (b) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
                f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, c, d, 0, f.RGBA, f.UNSIGNED_BYTE, a);
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                f.texImage2D(f.TEXTURE_2D,
                    0, f.RGB, c, d, 0, f.RGB, f.UNSIGNED_BYTE, a);
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
                f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, c, d, 0, f.RGBA, f.UNSIGNED_SHORT_4_4_4_4, a);
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
                f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, c, d, 0, f.RGBA, f.UNSIGNED_SHORT_5_5_5_1, a);
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
                f.texImage2D(f.TEXTURE_2D, 0, f.RGB, c, d, 0, f.RGB, f.UNSIGNED_SHORT_5_6_5, a);
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_AI88:
                f.texImage2D(f.TEXTURE_2D, 0, f.LUMINANCE_ALPHA, c, d, 0, f.LUMINANCE_ALPHA,
                    f.UNSIGNED_BYTE, a);
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                f.texImage2D(f.TEXTURE_2D, 0, f.ALPHA, c, d, 0, f.ALPHA, f.UNSIGNED_BYTE, a);
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_I8:
                f.texImage2D(f.TEXTURE_2D, 0, f.LUMINANCE, c, d, 0, f.LUMINANCE, f.UNSIGNED_BYTE, a);
                break;
            default:
                throw "NSInternalInconsistencyException";
        }
        this._contentSize._width = e.width;
        this._contentSize._height = e.height;
        this._pixelsWide = c;
        this._pixelsHigh = d;
        this._pixelFormat = b;
        this._maxS = e.width / c;
        this._maxT = e.height / d;
        this._hasMipmaps = this._hasPremultipliedAlpha = !1;
        this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURE));
        return this._isLoaded = !0
    },
    drawAtPoint: function(a) {
        var b = [0, this._maxT, this._maxS, this._maxT, 0, 0, this._maxS, 0],
            c = this._pixelsWide * this._maxS,
            d = this._pixelsHigh * this._maxT;
        a = [a.x, a.y, 0, c + a.x, a.y, 0, a.x, d + a.y, 0, c + a.x, d + a.y, 0];
        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_TEXCOORDS);
        this._shaderProgram.use();
        this._shaderProgram.setUniformsForBuiltins();
        cc.glBindTexture2D(this);
        c = cc.renderContext;
        c.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, c.FLOAT, !1, 0, a);
        c.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, c.FLOAT, !1, 0, b);
        c.drawArrays(c.TRIANGLE_STRIP, 0, 4)
    },
    drawInRect: function(a) {
        var b = [0, this._maxT, this._maxS, this._maxT, 0, 0, this._maxS, 0];
        a = [a.x, a.y, a.x + a.width, a.y, a.x, a.y + a.height, a.x + a.width, a.y + a.height];
        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_TEXCOORDS);
        this._shaderProgram.use();
        this._shaderProgram.setUniformsForBuiltins();
        cc.glBindTexture2D(this);
        var c = cc.renderContext;
        c.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, c.FLOAT, !1, 0, a);
        c.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, c.FLOAT, !1, 0, b);
        c.drawArrays(c.TRIANGLE_STRIP, 0, 4)
    },
    initWithImage: function(a) {
        if (null == a) return cc.log("cocos2d: cc.Texture2D. Can't create Texture. UIImage is nil"), !1;
        var b = a.getWidth(),
            c = a.getHeight(),
            d = cc.Configuration.getInstance().getMaxTextureSize();
        if (b > d || c > d) return cc.log("cocos2d: WARNING: Image (" + b + " x " + c + ") is bigger than the supported " +
            d + " x " + d), !1;
        this._isLoaded = !0;
        return this._initPremultipliedATextureWithImage(a, b, c)
    },
    initWithElement: function(a) {
        a && (this._webTextureObj = cc.renderContext.createTexture(), this._htmlElementObj = a)
    },
    getHtmlElementObj: function() {
        return this._htmlElementObj
    },
    isLoaded: function() {
        return this._isLoaded
    },
    handleLoadedTexture: function() {
        this._isLoaded = !0;
        var a = cc.renderContext;
        cc.glBindTexture2D(this);
        a.pixelStorei(a.UNPACK_ALIGNMENT, 4);
        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, this._htmlElementObj);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
        this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURE));
        cc.glBindTexture2D(null);
        a = this._htmlElementObj.height;
        this._pixelsWide = this._contentSize._width = this._htmlElementObj.width;
        this._pixelsHigh = this._contentSize._height =
            a;
        this._pixelFormat = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888;
        this._maxT = this._maxS = 1;
        this._hasMipmaps = this._hasPremultipliedAlpha = !1;
        this._callLoadedEventCallbacks()
    },
    initWithString: function(a, b, c, d, e, f) {
        3 == arguments.length && (b = arguments[1], c = arguments[2], d = cc.size(0, 0), e = cc.TEXT_ALIGNMENT_CENTER, f = cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        var g = new cc.Image,
            h;
        if (cc.VERTICAL_TEXT_ALIGNMENT_TOP === f) h = cc.TEXT_ALIGNMENT_CENTER === e ? cc.ALIGN_TOP : cc.TEXT_ALIGNMENT_LEFT === e ? cc.ALIGN_TOP_LEFT : cc.ALIGN_TOP_RIGHT;
        else if (cc.VERTICAL_TEXT_ALIGNMENT_CENTER ===
            f) h = cc.TEXT_ALIGNMENT_CENTER === e ? cc.ALIGN_CENTER : cc.TEXT_ALIGNMENT_LEFT === e ? cc.ALIGN_LEFT : cc.ALIGN_RIGHT;
        else if (cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM === f) h = cc.TEXT_ALIGNMENT_CENTER === e ? cc.ALIGN_BOTTOM : cc.TEXT_ALIGNMENT_LEFT === e ? cc.ALIGN_BOTTOM_LEFT : cc.ALIGN_BOTTOM_RIGHT;
        else return cc.log("Not supported alignment format!"), !1;
        return g.initWithString(a, d.width, d.height, h, b, c) ? this.initWithImage(g) : !1
    },
    initWithETCFile: function(a) {
        return !1
    },
    initWithPVRFile: function(a) {
        var b = !1,
            c = new cc.TexturePVR;
        (b = c.initWithContentsOfFile(a)) ?
            (c.setRetainName(!0), this._name = c.getName(), this._maxT = this._maxS = 1, this._pixelsWide = c.getWidth(), this._pixelsHigh = c.getHeight(), this._contentSize._width = this._pixelsWide, this._contentSize._height = this._pixelsHigh, this._hasPremultipliedAlpha = cc.PVRHaveAlphaPremultiplied_, this._pixelFormat = c.getFormat(), this.setAntiAliasTexParameters()) : cc.log("cocos2d: Couldn't load PVR image " + a);
        return b
    },
    initWithPVRTCData: function(a, b, c, d, e, f) {
        return cc.Configuration.getInstance().supportsPVRTC() ? !0 : (cc.log("cocos2d: WARNING: PVRTC images is not supported."), !1)
    },
    setTexParameters: function(a) {
        var b = cc.renderContext;
        cc.Assert(this._pixelsWide == cc.NextPOT(this._pixelsWide) && this._pixelsHigh == cc.NextPOT(this._pixelsHigh) || a.wrapS == b.CLAMP_TO_EDGE && a.wrapT == b.CLAMP_TO_EDGE, "WebGLRenderingContext.CLAMP_TO_EDGE should be used in NPOT textures");
        cc.glBindTexture2D(this);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, a.minFilter);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, a.magFilter);
        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, a.wrapS);
        b.texParameteri(b.TEXTURE_2D,
            b.TEXTURE_WRAP_T, a.wrapT)
    },
    setAntiAliasTexParameters: function() {
        var a = cc.renderContext;
        cc.glBindTexture2D(this);
        this._hasMipmaps ? a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR_MIPMAP_NEAREST) : a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST)
    },
    setAliasTexParameters: function() {
        var a = cc.renderContext;
        cc.glBindTexture2D(this);
        this._hasMipmaps ? a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST_MIPMAP_NEAREST) : a.texParameteri(a.TEXTURE_2D,
            a.TEXTURE_MIN_FILTER, a.NEAREST);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST)
    },
    generateMipmap: function() {
        cc.Assert(this._pixelsWide == cc.NextPOT(this._pixelsWide) && this._pixelsHigh == cc.NextPOT(this._pixelsHigh), "Mimpap texture only works in POT textures");
        cc.glBindTexture2D(this);
        cc.renderContext.generateMipmap(cc.renderContext.TEXTURE_2D);
        this._hasMipmaps = !0
    },
    stringForFormat: function() {
        switch (this._pixelFormat) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
                return "RGBA8888";
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                return "RGB888";
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
                return "RGB565";
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
                return "RGBA4444";
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
                return "RGB5A1";
            case cc.TEXTURE_2D_PIXEL_FORMAT_AI88:
                return "AI88";
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                return "A8";
            case cc.TEXTURE_2D_PIXEL_FORMAT_I8:
                return "I8";
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC4:
                return "PVRTC4";
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC2:
                return "PVRTC2";
            default:
                cc.log("stringForFormat: " + this._pixelFormat + ", cannot give useful result, it's a unrecognized pixel format")
        }
        return ""
    },
    bitsPerPixelForFormat: function(a) {
        a = a || this._pixelFormat;
        switch (a) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
                return 32;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                return 32;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
                return 16;
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                return 8;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
                return 16;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
                return 16;
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC4:
                return 4;
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC2:
                return 2;
            case cc.TEXTURE_2D_PIXEL_FORMAT_I8:
                return 8;
            case cc.TEXTURE_2D_PIXEL_FORMAT_AI88:
                return 16;
            default:
                return cc.log("bitsPerPixelForFormat: " + this._pixelFormat + ", cannot give useful result, it's a illegal pixel format"), -1
        }
    },
    _initPremultipliedATextureWithImage: function(a, b, c) {
        var d = a.getData(),
            e = null,
            e = null,
            f = a.hasAlpha(),
            g = cc.size(a.getWidth(), a.getHeight()),
            h = cc.TEXTURE_2D_PIXEL_FORMAT_DEFAULT,
            k = a.getBitsPerComponent();
        f || (8 <= k ? h = cc.TEXTURE_2D_PIXEL_FORMAT_RGB888 : (cc.log("cocos2d: cc.Texture2D: Using RGB565 texture since image has no alpha"), h = cc.TEXTURE_2D_PIXEL_FORMAT_RGB565));
        var m = b *
            c;
        if (h == cc.TEXTURE_2D_PIXEL_FORMAT_RGB565)
            if (f)
                for (d = new Uint16Array(b * c), e = a.getData(), k = 0; k < m; ++k) d[k] = (e[k] >> 0 & 255) >> 3 << 11 | (e[k] >> 8 & 255) >> 2 << 5 | (e[k] >> 16 & 255) >> 3 << 0;
            else
                for (d = new Uint16Array(b * c), e = a.getData(), k = 0; k < m; ++k) d[k] = (e[k] & 255) >> 3 << 11 | (e[k] & 255) >> 2 << 5 | (e[k] & 255) >> 3 << 0;
        else if (h == cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444)
            for (d = new Uint16Array(b * c), e = a.getData(), k = 0; k < m; ++k) d[k] = (e[k] >> 0 & 255) >> 4 << 12 | (e[k] >> 8 & 255) >> 4 << 8 | (e[k] >> 16 & 255) >> 4 << 4 | (e[k] >> 24 & 255) >> 4 << 0;
        else if (h == cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1)
            for (d =
                new Uint16Array(b * c), e = a.getData(), k = 0; k < m; ++k) d[k] = (e[k] >> 0 & 255) >> 3 << 11 | (e[k] >> 8 & 255) >> 3 << 6 | (e[k] >> 16 & 255) >> 3 << 1 | (e[k] >> 24 & 255) >> 7 << 0;
        else if (h == cc.TEXTURE_2D_PIXEL_FORMAT_A8)
            for (d = new Uint8Array(b * c), e = a.getData(), k = 0; k < m; ++k) d[k] = e >> 24 & 255;
        if (f && h == cc.TEXTURE_2D_PIXEL_FORMAT_RGB888)
            for (e = a.getData(), d = new Uint8Array(b * c * 3), k = 0; k < m; ++k) d[3 * k] = e >> 0 & 255, d[3 * k + 1] = e >> 8 & 255, d[3 * k + 2] = e >> 16 & 255;
        this.initWithData(d, h, b, c, g);
        a.getData();
        this._hasPremultipliedAlpha = a.isPremultipliedAlpha();
        return !0
    },
    addLoadedEventListener: function(a,
        b) {
        this._loadedEventListeners || (this._loadedEventListeners = []);
        this._loadedEventListeners.push({
            eventCallback: a,
            eventTarget: b
        })
    },
    removeLoadedEventListener: function(a) {
        if (this._loadedEventListeners)
            for (var b = this._loadedEventListeners, c = 0; c < b.length; c++) b[c].eventTarget == a && b.splice(c, 1)
    },
    _callLoadedEventCallbacks: function() {
        if (this._loadedEventListeners) {
            for (var a = this._loadedEventListeners, b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                d.eventCallback.call(d.eventTarget, this)
            }
            a.length = 0
        }
    }
});
cc.Texture2DCanvas = cc.Class.extend({
    _contentSize: null,
    _isLoaded: !1,
    _htmlElementObj: null,
    _loadedEventListeners: null,
    ctor: function() {
        this._contentSize = cc._sizeConst(0, 0);
        this._isLoaded = !1;
        this._htmlElementObj = null
    },
    getPixelsWide: function() {
        return this._contentSize._width
    },
    getPixelsHigh: function() {
        return this._contentSize._height
    },
    getContentSize: function() {
        var a = cc.CONTENT_SCALE_FACTOR();
        return cc.size(this._contentSize._width / a, this._contentSize._height / a)
    },
    getContentSizeInPixels: function() {
        return this._contentSize
    },
    initWithElement: function(a) {
        a && (this._htmlElementObj = a)
    },
    getHtmlElementObj: function() {
        return this._htmlElementObj
    },
    isLoaded: function() {
        return this._isLoaded
    },
    handleLoadedTexture: function() {
        this._isLoaded = !0;
        var a = this._htmlElementObj;
        this._contentSize._width = a.width;
        this._contentSize._height = a.height;
        this._callLoadedEventCallbacks()
    },
    description: function() {
        return "\x3ccc.Texture2D | width \x3d " + this._contentSize._width + " height " + this._contentSize._height + "\x3e"
    },
    initWithData: function(a, b, c, d, e) {
        return !1
    },
    initWithImage: function(a) {
        return !1
    },
    initWithString: function(a, b, c, d, e, f) {
        return !1
    },
    releaseTexture: function() {},
    getName: function() {
        return null
    },
    getMaxS: function() {
        return 1
    },
    setMaxS: function(a) {},
    getMaxT: function() {
        return 1
    },
    setMaxT: function(a) {},
    getShaderProgram: function() {
        return null
    },
    setShaderProgram: function(a) {},
    hasPremultipliedAlpha: function() {
        return !1
    },
    hasMipmaps: function() {
        return !1
    },
    releaseData: function(a) {},
    keepData: function(a, b) {
        return a
    },
    drawAtPoint: function(a) {},
    drawInRect: function(a) {},
    initWithETCFile: function(a) {
        return !1
    },
    initWithPVRFile: function(a) {
        return !1
    },
    initWithPVRTCData: function(a, b, c, d, e, f) {
        return !0
    },
    setTexParameters: function(a) {},
    setAntiAliasTexParameters: function() {},
    setAliasTexParameters: function() {},
    generateMipmap: function() {},
    stringForFormat: function() {
        return ""
    },
    bitsPerPixelForFormat: function(a) {
        return -1
    },
    addLoadedEventListener: function(a, b) {
        this._loadedEventListeners || (this._loadedEventListeners = []);
        this._loadedEventListeners.push({
            eventCallback: a,
            eventTarget: b
        })
    },
    removeLoadedEventListener: function(a) {
        if (this._loadedEventListeners)
            for (var b = this._loadedEventListeners, c = 0; c < b.length; c++) b[c].eventTarget == a && b.splice(c, 1)
    },
    _callLoadedEventCallbacks: function() {
        if (this._loadedEventListeners) {
            for (var a = this._loadedEventListeners, b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                d.eventCallback.call(d.eventTarget, this)
            }
            a.length = 0
        }
    }
});
cc.Texture2D = cc.Browser.supportWebGL ? cc.Texture2DWebGL : cc.Texture2DCanvas;
cc.Texture2D.setDefaultAlphaPixelFormat = function(a) {
    cc._defaultAlphaPixelFormat = a
};
cc.Texture2D.defaultAlphaPixelFormat = function() {
    return cc._defaultAlphaPixelFormat
};
cc.Texture2D.getDefaultAlphaPixelFormat = function() {
    return cc._defaultAlphaPixelFormat
};
cc.Texture2D.PVRImagesHavePremultipliedAlpha = function(a) {
    cc.PVRHaveAlphaPremultiplied_ = a
};
cc.g_sharedTextureCache = null;
cc.loadImage = function(a) {
    if (cc.computeImageFormatType(a) == cc.FMT_UNKNOWN) cc.log("unsupported format:" + a);
    else {
        var b = new Image;
        b.src = a;
        b.addEventListener("load", cc.loadImage.handler, !1)
    }
};
cc.loadImage.handler = function() {
    cc.TextureCache.getInstance().cacheImage(this.src, this);
    this.removeEventListener("load", cc.loadImage.handler, !1)
};
cc.computeImageFormatType = function(a) {
    return 0 < a.toLowerCase().indexOf(".jpg") || 0 < a.toLowerCase().indexOf(".jpeg") ? cc.FMT_JPG : 0 < a.toLowerCase().indexOf(".png") ? cc.FMT_PNG : 0 < a.toLowerCase().indexOf(".webp") ? cc.FMT_WEBP : cc.FMT_UNKNOWN
};
cc.TextureCache = cc.Class.extend({
    _textures: null,
    _textureColorsCache: null,
    _textureKeySeq: null,
    _rendererInitialized: !1,
    _loadedTexturesBefore: null,
    _loadingTexturesBefore: null,
    ctor: function() {
        if (cc.g_sharedTextureCache) throw "Attempted to allocate a second instance of a singleton.";
        this._textureKeySeq += 0 | 1E3 * Math.random();
        this._textures = {};
        this._textureColorsCache = {};
        cc.renderContextType === cc.WEBGL && (this._loadedTexturesBefore = {}, this._loadingTexturesBefore = {})
    },
    _addImageAsyncCallBack: function(a, b) {
        if (a &&
            "string" === typeof b) a[b]();
        else a && "function" === typeof b && b.call(a)
    },
    _initializingRenderer: function() {
        this._rendererInitialized = !0;
        var a, b = this._loadedTexturesBefore,
            c = this._textures;
        for (a in b) {
            var d = b[a],
                e = new cc.Texture2D;
            e.initWithElement(d);
            e.handleLoadedTexture();
            c[a] = e
        }
        this._loadedTexturesBefore = {}
    },
    addPVRTCImage: function(a) {
        cc.log("TextureCache:addPVRTCImage does not support on HTML5")
    },
    addETCImage: function(a) {
        cc.log("TextureCache:addPVRTCImage does not support on HTML5")
    },
    description: function() {
        return "\x3cTextureCache | Number of textures \x3d " +
            this._textures.length + "\x3e"
    },
    textureForKey: function(a) {
        a = cc.FileUtils.getInstance().fullPathForFilename(a);
        return this._textures[a] ? this._textures[a] : null
    },
    getKeyByTexture: function(a) {
        for (var b in this._textures)
            if (this._textures[b] == a) return b;
        return null
    },
    _generalTextureKey: function() {
        this._textureKeySeq++;
        return "_textureKey_" + this._textureKeySeq
    },
    getTextureColors: function(a) {
        var b = this.getKeyByTexture(a);
        b || (b = a instanceof HTMLImageElement ? a.src : this._generalTextureKey());
        this._textureColorsCache[b] ||
            (this._textureColorsCache[b] = cc.generateTextureCacheForColor(a));
        return this._textureColorsCache[b]
    },
    addPVRImage: function(a) {
        if (!a) throw "cc.TextureCache.addPVRImage(): path should be non-null";
        a = cc.FileUtils.getInstance().fullPathForFilename(a);
        if (null != this._textures[a]) return this._textures[a];
        var b = new cc.Texture2D;
        b.initWithPVRFile(a) ? this._textures[a] = b : cc.log("cocos2d: Couldn't add PVRImage:" + a + " in TextureCache");
        return b
    },
    removeAllTextures: function() {
        var a = this._textures,
            b;
        for (b in a) a[b] &&
            a[b].releaseTexture();
        this._textures = {}
    },
    removeTexture: function(a) {
        if (a) {
            var b = this._textures,
                c;
            for (c in b) b[c] == a && (b[c].releaseTexture(), delete b[c])
        }
    },
    removeTextureForKey: function(a) {
        null != a && (a = cc.FileUtils.getInstance().fullPathForFilename(a), this._textures[a] && delete this._textures[a])
    },
    _loadErrorHandler: function(a, b, c) {
        cc.Loader.getInstance().onResLoadingErr(a);
        c[a] && delete c[a];
        this.removeEventListener("error", b._loadErrorHandler, !1)
    },
    _clientLoadHandler: function(a, b, c, d) {
        a instanceof cc.Texture2D ?
            a.handleLoadedTexture() : b._textures[a] && b._textures[a].handleLoadedTexture();
        b._addImageAsyncCallBack(d, c);
        this.removeEventListener("load", b._addAsyncLoadHandler, !1)
    },
    _preloadHandler: function(a, b) {
        a instanceof cc.Texture2D ? a.handleLoadedTexture() : b._textures[a] && b._textures[a].handleLoadedTexture();
        cc.Loader.getInstance().onResLoaded();
        this.removeEventListener("load", b._addAsyncLoadHandler, !1)
    },
    _beforeRendererLoadHandler: function(a, b) {
        cc.Loader.getInstance().onResLoaded();
        var c = b._loadingTexturesBefore;
        c[a] && (b._loadedTexturesBefore[a] = c[a], delete c[a]);
        this.removeEventListener("load", b._beforeRendererLoadHandler, !1)
    },
    addImageAsync: function(a, b, c) {
        if (!a) throw "cc.TextureCache.addImageAsync(): path should be non-null";
        a = cc.FileUtils.getInstance().fullPathForFilename(a);
        var d = this._textures[a],
            e;
        d ? d.isLoaded() ? this._addImageAsyncCallBack(b, c) : (e = d.getHtmlElementObj(), e.addEventListener("load", this._clientLoadHandler.bind(e, d, this, c, b))) : (e = new Image, e.crossOrigin = "Anonymous", e.addEventListener("load",
            this._clientLoadHandler.bind(e, a, this, c, b)), e.addEventListener("error", this._loadErrorHandler.bind(e, a, this, this._textures)), e.src = a, b = new cc.Texture2D, b.initWithElement(e), this._textures[a] = b);
        return this._textures[a]
    },
    _addImageBeforeRenderer: function(a) {
        var b = new Image;
        b.crossOrigin = "Anonymous";
        b.addEventListener("load", this._beforeRendererLoadHandler.bind(b, a, this));
        b.addEventListener("error", this._loadErrorHandler.bind(b, a, this, this._loadingTexturesBefore));
        b.src = a;
        this._loadingTexturesBefore[a] =
            b
    },
    addImage: function(a) {
        if (!a) throw "cc.Texture.addImage(): path should be non-null";
        if (cc.renderContextType === cc.WEBGL && !this._rendererInitialized) return this._addImageBeforeRenderer(a);
        a = cc.FileUtils.getInstance().fullPathForFilename(a);
        var b = this._textures[a],
            c;
        if (b)
            if (b.isLoaded()) cc.Loader.getInstance().onResLoaded();
            else c = b.getHtmlElementObj(), c.addEventListener("load", this._preloadHandler.bind(c, b, this));
        else c = new Image, c.crossOrigin = "Anonymous", c.addEventListener("load", this._preloadHandler.bind(c,
            a, this)), c.addEventListener("error", this._loadErrorHandler.bind(c, a, this, this._textures)), c.src = a, b = new cc.Texture2D, b.initWithElement(c), this._textures[a] = b;
        return this._textures[a]
    },
    cacheImage: function(a, b) {
        if (b instanceof cc.Texture2D) this._textures[a] = b;
        else {
            var c = new cc.Texture2D;
            c.initWithElement(b);
            c.handleLoadedTexture();
            this._textures[a] = c
        }
    },
    addUIImage: function(a, b) {
        if (!a) throw "cc.Texture.addUIImage(): image should be non-null";
        if (b && this._textures[b]) return this._textures[b];
        var c = new cc.Texture2D;
        c.initWithImage(a);
        null != b && null != c ? this._textures[b] = c : cc.log("cocos2d: Couldn't add UIImage in TextureCache");
        return c
    },
    dumpCachedTextureInfo: function() {
        var a = 0,
            b = 0,
            c = this._textures,
            d;
        for (d in c) {
            var e = c[d];
            a++;
            e.getHtmlElementObj() instanceof HTMLImageElement ? cc.log("cocos2d: '" + d + "' id\x3d" + e.getHtmlElementObj().src + " " + e.getPixelsWide() + " x " + e.getPixelsHigh()) : cc.log("cocos2d: '" + d + "' id\x3d HTMLCanvasElement " + e.getPixelsWide() + " x " + e.getPixelsHigh());
            b += e.getPixelsWide() * e.getPixelsHigh() *
                4
        }
        c = this._textureColorsCache;
        for (d in c) {
            var e = c[d],
                f;
            for (f in e) {
                var g = e[f];
                a++;
                cc.log("cocos2d: '" + d + "' id\x3d HTMLCanvasElement " + g.width + " x " + g.height);
                b += g.width * g.height * 4
            }
        }
        cc.log("cocos2d: TextureCache dumpDebugInfo: " + a + " textures, HTMLCanvasElement for " + b / 1024 + " KB (" + (b / 1048576).toFixed(2) + " MB)")
    }
});
cc.TextureCache.getInstance = function() {
    cc.g_sharedTextureCache || (cc.g_sharedTextureCache = new cc.TextureCache);
    return cc.g_sharedTextureCache
};
cc.TextureCache.purgeSharedTextureCache = function() {
    cc.g_sharedTextureCache = null
};
cc.TextureAtlas = cc.Class.extend({
    _indices: null,
    _buffersVBO: null,
    _dirty: !1,
    _capacity: 0,
    _texture: null,
    _quads: null,
    _quadsArrayBuffer: null,
    _quadsWebBuffer: null,
    _quadsReader: null,
    ctor: function() {
        this._buffersVBO = []
    },
    getTotalQuads: function() {
        return this._totalQuads
    },
    getCapacity: function() {
        return this._capacity
    },
    getTexture: function() {
        return this._texture
    },
    setTexture: function(a) {
        this._texture = a
    },
    setDirty: function(a) {
        this._dirty = a
    },
    isDirty: function() {
        return this._dirty
    },
    getQuads: function() {
        return this._quads
    },
    setQuads: function(a) {
        this._quads = a
    },
    _copyQuadsToTextureAtlas: function(a, b) {
        if (a)
            for (var c = 0; c < a.length; c++) this._setQuadToArray(a[c], b + c)
    },
    _setQuadToArray: function(a, b) {
        var c = this._quads;
        c[b] ? (c[b].bl = a.bl, c[b].br = a.br, c[b].tl = a.tl, c[b].tr = a.tr) : c[b] = new cc.V3F_C4B_T2F_Quad(a.tl, a.bl, a.tr, a.br, this._quadsArrayBuffer, b * cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT)
    },
    description: function() {
        return "\x3ccc.TextureAtlas | totalQuads \x3d" + this._totalQuads + "\x3e"
    },
    _setupIndices: function() {
        if (0 !== this._capacity)
            for (var a =
                this._indices, b = this._capacity, c = 0; c < b; c++) cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP ? (a[6 * c + 0] = 4 * c + 0, a[6 * c + 1] = 4 * c + 0, a[6 * c + 2] = 4 * c + 2, a[6 * c + 3] = 4 * c + 1, a[6 * c + 4] = 4 * c + 3, a[6 * c + 5] = 4 * c + 3) : (a[6 * c + 0] = 4 * c + 0, a[6 * c + 1] = 4 * c + 1, a[6 * c + 2] = 4 * c + 2, a[6 * c + 3] = 4 * c + 3, a[6 * c + 4] = 4 * c + 2, a[6 * c + 5] = 4 * c + 1)
    },
    _setupVBO: function() {
        var a = cc.renderContext;
        this._buffersVBO[0] = a.createBuffer();
        this._buffersVBO[1] = a.createBuffer();
        this._quadsWebBuffer = a.createBuffer();
        this._mapBuffers()
    },
    _mapBuffers: function() {
        var a = cc.renderContext;
        a.bindBuffer(a.ARRAY_BUFFER,
            this._quadsWebBuffer);
        a.bufferData(a.ARRAY_BUFFER, this._quadsArrayBuffer, a.DYNAMIC_DRAW);
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);
        a.bufferData(a.ELEMENT_ARRAY_BUFFER, this._indices, a.STATIC_DRAW)
    },
    initWithFile: function(a, b) {
        var c = cc.TextureCache.getInstance().addImage(a);
        if (c) return this.initWithTexture(c, b);
        cc.log("cocos2d: Could not open file: " + a);
        return !1
    },
    initWithTexture: function(a, b) {
        if (!a) throw "cc.TextureAtlas.initWithTexture():texture should be non-null";
        this._capacity = b |= 0;
        this._totalQuads = 0;
        this._texture = a;
        this._quads = [];
        this._indices = new Uint16Array(6 * b);
        var c = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        this._quadsArrayBuffer = new ArrayBuffer(c * b);
        this._quadsReader = new Uint8Array(this._quadsArrayBuffer);
        if ((!this._quads || !this._indices) && 0 < b) return !1;
        for (var d = this._quads, e = 0; e < b; e++) d[e] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, this._quadsArrayBuffer, e * c);
        this._setupIndices();
        this._setupVBO();
        return this._dirty = !0
    },
    updateQuad: function(a, b) {
        if (!a) throw "cc.TextureAtlas.updateQuad(): quad should be non-null";
        if (0 > b || b >= this._capacity) throw "cc.TextureAtlas.updateQuad(): Invalid index";
        this._totalQuads = Math.max(b + 1, this._totalQuads);
        this._setQuadToArray(a, b);
        this._dirty = !0
    },
    insertQuad: function(a, b) {
        if (b >= this._capacity) throw "cc.TextureAtlas.insertQuad(): Invalid index";
        this._totalQuads++;
        if (this._totalQuads > this._capacity) cc.log("cc.TextureAtlas.insertQuad(): invalid totalQuads");
        else {
            var c = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT,
                d = b * c,
                e = (this._totalQuads - 1 - b) * c;
            this._quads[this._totalQuads - 1] = new cc.V3F_C4B_T2F_Quad(null,
                null, null, null, this._quadsArrayBuffer, (this._totalQuads - 1) * c);
            this._quadsReader.set(this._quadsReader.subarray(d, d + e), d + c);
            this._setQuadToArray(a, b);
            this._dirty = !0
        }
    },
    insertQuads: function(a, b, c) {
        c = c || a.length;
        if (b + c > this._capacity) throw "cc.TextureAtlas.insertQuad(): Invalid index + amount";
        var d = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        this._totalQuads += c;
        if (this._totalQuads > this._capacity) cc.log("cc.TextureAtlas.insertQuad(): invalid totalQuads");
        else {
            var e = b * d,
                f = (this._totalQuads - 1 - b - c) * d,
                g = this._totalQuads -
                1 - c,
                h;
            for (h = 0; h < c; h++) this._quads[g + h] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, this._quadsArrayBuffer, (this._totalQuads - 1) * d);
            this._quadsReader.set(this._quadsReader.subarray(e, e + f), e + d * c);
            for (h = 0; h < c; h++) this._setQuadToArray(a[h], b + h);
            this._dirty = !0
        }
    },
    insertQuadFromIndex: function(a, b) {
        if (a !== b) {
            if (0 > b && b >= this._totalQuads) throw "cc.TextureAtlas.insertQuadFromIndex(): Invalid newIndex";
            if (0 > a && a >= this._totalQuads) throw "cc.TextureAtlas.insertQuadFromIndex(): Invalid fromIndex";
            var c = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT,
                d = this._quadsReader,
                e = d.subarray(a * c, c),
                f;
            a > b ? (f = b * c, d.set(d.subarray(f, f + (a - b) * c), f + c), d.set(e, f)) : (f = (a + 1) * c, d.set(d.subarray(f, f + (b - a) * c), f - c), d.set(e, b * c));
            this._dirty = !0
        }
    },
    removeQuadAtIndex: function(a) {
        if (a >= this._totalQuads) throw "cc.TextureAtlas.removeQuadAtIndex(): Invalid index";
        var b = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT;
        this._totalQuads--;
        this._quads.length = this._totalQuads;
        if (a !== this._totalQuads) {
            var c = (a + 1) * b;
            this._quadsReader.set(this._quadsReader.subarray(c, c + (this._totalQuads - a) * b),
                c - b)
        }
        this._dirty = !0
    },
    removeQuadsAtIndex: function(a, b) {
        if (a + b > this._totalQuads) throw "cc.TextureAtlas.removeQuadsAtIndex(): index + amount out of bounds";
        this._totalQuads -= b;
        if (a !== this._totalQuads) {
            var c = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT,
                d = (a + b) * c,
                e = a * c;
            this._quadsReader.set(this._quadsReader.subarray(d, d + (this._totalQuads - a) * c), e)
        }
        this._dirty = !0
    },
    removeAllQuads: function() {
        this._totalQuads = this._quads.length = 0
    },
    _setDirty: function(a) {
        this._dirty = a
    },
    resizeCapacity: function(a) {
        if (a == this._capacity) return !0;
        var b = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT,
            c = this._capacity;
        this._totalQuads = Math.min(this._totalQuads, a);
        var d = this._capacity = 0 | a,
            e = this._totalQuads;
        if (null == this._quads)
            for (this._quads = [], this._quadsArrayBuffer = new ArrayBuffer(b * d), this._quadsReader = new Uint8Array(this._quadsArrayBuffer), a = 0; a < d; a++) this._quads = new cc.V3F_C4B_T2F_Quad(null, null, null, null, this._quadsArrayBuffer, a * b);
        else {
            var f, g, h = this._quads;
            if (d > c) {
                f = [];
                g = new ArrayBuffer(b * d);
                for (a = 0; a < e; a++) f[a] = new cc.V3F_C4B_T2F_Quad(h[a].tl,
                    h[a].bl, h[a].tr, h[a].br, g, a * b);
                for (; a < d; a++) f[a] = new cc.V3F_C4B_T2F_Quad(null, null, null, null, g, a * b)
            } else
                for (e = Math.max(e, d), f = [], g = new ArrayBuffer(b * d), a = 0; a < e; a++) f[a] = new cc.V3F_C4B_T2F_Quad(h[a].tl, h[a].bl, h[a].tr, h[a].br, g, a * b);
            this._quadsReader = new Uint8Array(g);
            this._quads = f;
            this._quadsArrayBuffer = g
        }
        null == this._indices ? this._indices = new Uint16Array(6 * d) : d > c ? (b = new Uint16Array(6 * d), b.set(this._indices, 0), this._indices = b) : this._indices = this._indices.subarray(0, 6 * d);
        this._setupIndices();
        this._mapBuffers();
        return this._dirty = !0
    },
    increaseTotalQuadsWith: function(a) {
        this._totalQuads += a
    },
    moveQuadsFromIndex: function(a, b, c) {
        if (2 == arguments.length) {
            c = b;
            b = this._totalQuads - a;
            if (c + (this._totalQuads - a) > this._capacity) throw "cc.TextureAtlas.moveQuadsFromIndex(): move is out of bounds";
            if (0 === b) return
        } else {
            if (c + b > this._totalQuads) throw "cc.TextureAtlas.moveQuadsFromIndex(): Invalid newIndex";
            if (a >= this._totalQuads) throw "cc.TextureAtlas.moveQuadsFromIndex(): Invalid oldIndex";
            if (a == c) return
        }
        var d = cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT,
            e = a * d,
            f = b * d,
            g = this._quadsReader,
            h = g.subarray(e, e + f),
            k = c * d,
            m;
        c < a ? (m = c * d, g.set(g.subarray(m, m + (a - c) * d), m + f)) : (m = (a + b) * d, g.set(g.subarray(m, m + (c - a) * d), e));
        g.set(h, k);
        this._dirty = !0
    },
    fillWithEmptyQuadsFromIndex: function(a, b) {
        for (var c = b * cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT, d = new Uint8Array(this._quadsArrayBuffer, a * cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT, c), e = 0; e < c; e++) d[e] = 0
    },
    drawNumberOfQuads: function(a, b) {
        b = b || 0;
        if (0 !== a && this._texture && this._texture.isLoaded()) {
            var c = cc.renderContext;
            cc.glBindTexture2D(this._texture);
            cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSCOLORTEX);
            c.bindBuffer(c.ARRAY_BUFFER, this._quadsWebBuffer);
            this._dirty && c.bufferData(c.ARRAY_BUFFER, this._quadsArrayBuffer, c.DYNAMIC_DRAW);
            c.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 3, c.FLOAT, !1, 24, 0);
            c.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, c.UNSIGNED_BYTE, !0, 24, 12);
            c.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, c.FLOAT, !1, 24, 16);
            this._dirty && (this._dirty = !1);
            c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);
            cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP ?
                c.drawElements(c.TRIANGLE_STRIP, 6 * a, c.UNSIGNED_SHORT, 6 * b * this._indices.BYTES_PER_ELEMENT) : c.drawElements(c.TRIANGLES, 6 * a, c.UNSIGNED_SHORT, 6 * b * this._indices.BYTES_PER_ELEMENT);
            cc.g_NumberOfDraws++
        }
    },
    drawQuads: function() {
        this.drawNumberOfQuads(this._totalQuads, 0)
    },
    _releaseBuffer: function() {
        var a = cc.renderContext;
        this._buffersVBO && (this._buffersVBO[0] && a.deleteBuffer(this._buffersVBO[0]), this._buffersVBO[1] && a.deleteBuffer(this._buffersVBO[1]));
        this._quadsWebBuffer && a.deleteBuffer(this._quadsWebBuffer)
    }
});
cc.TextureAtlas.create = function(a, b) {
    var c = new cc.TextureAtlas;
    return c && c.initWithFile(a, b) ? c : null
};
cc.TextureAtlas.createWithTexture = function(a, b) {
    var c = new cc.TextureAtlas;
    return c && c.initWithTexture(a, b) ? c : null
};
cc.Scene = cc.Node.extend({
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        this._ignoreAnchorPointForPosition = !0;
        this.setAnchorPoint(0.5, 0.5);
        this.setContentSize(cc.Director.getInstance().getWinSize())
    }
});
cc.Scene.create = function() {
    return new cc.Scene
};
cc.TOUCH_ALL_AT_ONCE = 0;
cc.TOUCH_ONE_BY_ONE = 1;
cc.Layer = cc.Node.extend({
    _isTouchEnabled: !1,
    _isAccelerometerEnabled: !1,
    _isKeyboardEnabled: !1,
    _touchPriority: 0,
    _touchMode: cc.TOUCH_ALL_AT_ONCE,
    _isMouseEnabled: !1,
    _mousePriority: 0,
    _swallowTouch: !0,
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        this._isKeyboardEnabled = this._isAccelerometerEnabled = this._isTouchEnabled = !1;
        this._touchPriority = 0;
        this._touchMode = cc.TOUCH_ALL_AT_ONCE;
        this._isMouseEnabled = !1;
        this._mousePriority = 0
    },
    _initLayer: function() {
        this.setAnchorPoint(0.5, 0.5);
        this._ignoreAnchorPointForPosition = !0;
        var a = cc.Director.getInstance();
        this.setContentSize(a.getWinSize())
    },
    init: function() {
        cc.Node.prototype.init.call(this);
        this._initLayer();
        return !0
    },
    registerWithTouchDispatcher: function() {
        this._touchMode === cc.TOUCH_ALL_AT_ONCE ? cc.registerStandardDelegate(this, this._touchPriority) : cc.registerTargetedDelegate(this._touchPriority, this._swallowTouch, this)
    },
    isMouseEnabled: function() {
        return this._isMouseEnabled
    },
    setMouseEnabled: function(a) {
        if (!cc.MouseDispatcher) throw "cc.MouseDispatcher is undefined, maybe it has been removed from js loading list.";
        this._isMouseEnabled != a && (this._isMouseEnabled = a, this._running && (a ? cc.Director.getInstance().getMouseDispatcher().addMouseDelegate(this, this._mousePriority) : cc.Director.getInstance().getMouseDispatcher().removeMouseDelegate(this)))
    },
    setMousePriority: function(a) {
        if (!cc.MouseDispatcher) throw "cc.MouseDispatcher is undefined, maybe it has been removed from js loading list.";
        this._mousePriority !== a && (this._mousePriority = a, this._isMouseEnabled && (this.setMouseEnabled(!1), this.setMouseEnabled(!0)))
    },
    getMousePriority: function() {
        return this._mousePriority
    },
    isTouchEnabled: function() {
        return this._isTouchEnabled
    },
    setTouchEnabled: function(a, b) {
        this._isTouchEnabled !== a && (this._isTouchEnabled = a, this._swallowTouch = !1 === b ? !1 : !0, this._running && (a ? this.registerWithTouchDispatcher() : cc.unregisterTouchDelegate(this)))
    },
    getTouchPriority: function() {
        return this._touchPriority
    },
    setTouchPriority: function(a) {
        this._touchPriority !== a && (this._touchPriority = a, this._isTouchEnabled && (this.setTouchEnabled(!1), this.setTouchEnabled(!0)))
    },
    getTouchMode: function() {
        return this._touchMode
    },
    setTouchMode: function(a) {
        this._touchMode !== a && (this._touchMode = a, this._isTouchEnabled && (this.setTouchEnabled(!1), this.setTouchEnabled(!0)))
    },
    isAccelerometerEnabled: function() {
        return this._isAccelerometerEnabled
    },
    setAccelerometerEnabled: function(a) {
        if (!cc.Accelerometer) throw "cc.Accelerometer is undefined, maybe it has been removed from js loading list.";
        if (a !== this._isAccelerometerEnabled && (this._isAccelerometerEnabled = a, this._running)) {
            var b = cc.Director.getInstance();
            a ? b.getAccelerometer().setDelegate(this) :
                b.getAccelerometer().setDelegate(null)
        }
    },
    setAccelerometerInterval: function(a) {
        this._isAccelerometerEnabled && cc.Accelerometer && cc.Director.getInstance().getAccelerometer().setAccelerometerInterval(a)
    },
    onAccelerometer: function(a) {
        cc.log("onAccelerometer event should be handled.")
    },
    isKeyboardEnabled: function() {
        return this._isKeyboardEnabled
    },
    setKeyboardEnabled: function(a) {
        if (!cc.KeyboardDispatcher) throw "cc.KeyboardDispatcher is undefined, maybe it has been removed from js loading list.";
        if (a !== this._isKeyboardEnabled &&
            (this._isKeyboardEnabled = a, this._running)) {
            var b = cc.Director.getInstance();
            a ? b.getKeyboardDispatcher().addDelegate(this) : b.getKeyboardDispatcher().removeDelegate(this)
        }
    },
    onEnter: function() {
        var a = cc.Director.getInstance();
        this._isTouchEnabled && this.registerWithTouchDispatcher();
        cc.Node.prototype.onEnter.call(this);
        this._isAccelerometerEnabled && cc.Accelerometer && a.getAccelerometer().setDelegate(this);
        this._isKeyboardEnabled && cc.KeyboardDispatcher && a.getKeyboardDispatcher().addDelegate(this);
        this._isMouseEnabled &&
            cc.MouseDispatcher && a.getMouseDispatcher().addMouseDelegate(this, this._mousePriority)
    },
    onExit: function() {
        var a = cc.Director.getInstance();
        this._isTouchEnabled && cc.unregisterTouchDelegate(this);
        this._isAccelerometerEnabled && cc.Accelerometer && a.getAccelerometer().setDelegate(null);
        this._isKeyboardEnabled && cc.KeyboardDispatcher && a.getKeyboardDispatcher().removeDelegate(this);
        this._isMouseEnabled && cc.MouseDispatcher && a.getMouseDispatcher().removeMouseDelegate(this);
        cc.Node.prototype.onExit.call(this)
    },
    onEnterTransitionDidFinish: function() {
        this._isAccelerometerEnabled && cc.Accelerometer && cc.Director.getInstance().getAccelerometer().setDelegate(this);
        cc.Node.prototype.onEnterTransitionDidFinish.call(this)
    },
    onTouchBegan: function(a, b) {
        cc.log("onTouchBegan event should be handled.");
        return !0
    },
    onTouchMoved: function(a, b) {},
    onTouchEnded: function(a, b) {},
    onTouchCancelled: function(a, b) {},
    onTouchesBegan: function(a, b) {},
    onTouchesMoved: function(a, b) {},
    onTouchesEnded: function(a, b) {},
    onTouchesCancelled: function(a,
        b) {},
    onMouseDown: function(a) {
        return !1
    },
    onMouseDragged: function(a) {
        return !1
    },
    onMouseMoved: function(a) {
        return !1
    },
    onMouseUp: function(a) {
        return !1
    },
    onRightMouseDown: function(a) {
        return !1
    },
    onRightMouseDragged: function(a) {
        return !1
    },
    onRightMouseUp: function(a) {
        return !1
    },
    onOtherMouseDown: function(a) {
        return !1
    },
    onOtherMouseDragged: function(a) {
        return !1
    },
    onOtherMouseUp: function(a) {
        return !1
    },
    onScrollWheel: function(a) {
        return !1
    },
    onMouseEntered: function(a) {
        return !1
    },
    onMouseExited: function(a) {
        return !1
    },
    onKeyDown: function(a) {},
    onKeyUp: function(a) {}
});
cc.Layer.create = function() {
    var a = new cc.Layer;
    return a && a.init() ? a : null
};
cc.LayerRGBA = cc.Layer.extend({
    RGBAProtocol: !0,
    _displayedOpacity: 0,
    _realOpacity: 0,
    _displayedColor: null,
    _realColor: null,
    _cascadeOpacityEnabled: !1,
    _cascadeColorEnabled: !1,
    ctor: function() {
        cc.Layer.prototype.ctor.call(this);
        this.RGBAProtocol = !0;
        this._realOpacity = this._displayedOpacity = 255;
        this._displayedColor = cc.white();
        this._realColor = cc.white();
        this._cascadeColorEnabled = this._cascadeOpacityEnabled = !1
    },
    init: function() {
        return cc.Layer.prototype.init.call(this) ? (this.setCascadeOpacityEnabled(!1), this.setCascadeColorEnabled(!1), !0) : !1
    },
    getOpacity: function() {
        return this._realOpacity
    },
    getDisplayedOpacity: function() {
        return this._displayedOpacity
    },
    setOpacity: function(a) {
        this._displayedOpacity = this._realOpacity = a;
        a = 255;
        var b = this._parent;
        b && b.RGBAProtocol && b.isCascadeOpacityEnabled() && (a = b.getDisplayedOpacity());
        this.updateDisplayedOpacity(a)
    },
    updateDisplayedOpacity: function(a) {
        this._displayedOpacity = 0 | this._realOpacity * a / 255;
        if (this._cascadeOpacityEnabled) {
            a = this._children;
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                c && c.RGBAProtocol &&
                    c.updateDisplayedOpacity(this._displayedOpacity)
            }
        }
    },
    isCascadeOpacityEnabled: function() {
        return this._cascadeOpacityEnabled
    },
    setCascadeOpacityEnabled: function(a) {
        this._cascadeOpacityEnabled !== a && ((this._cascadeOpacityEnabled = a) ? this._enableCascadeOpacity() : this._disableCascadeOpacity())
    },
    _enableCascadeOpacity: function() {
        var a = 255,
            b = this._parent;
        b && b.RGBAProtocol && b.isCascadeOpacityEnabled() && (a = b.getDisplayedOpacity());
        this.updateDisplayedOpacity(a)
    },
    _disableCascadeOpacity: function() {
        this._displayedOpacity =
            this._realOpacity;
        for (var a = this._children, b = 0; b < a.length; b++) {
            var c = a[b];
            c && c.RGBAProtocol && c.updateDisplayedOpacity(255)
        }
    },
    getColor: function() {
        var a = this._realColor;
        return cc.c3b(a.r, a.g, a.b)
    },
    getDisplayedColor: function() {
        var a = this._displayedColor;
        return cc.c3b(a.r, a.g, a.b)
    },
    setColor: function(a) {
        var b = this._displayedColor,
            c = this._realColor;
        b.r = c.r = a.r;
        b.g = c.g = a.g;
        b.b = c.b = a.b;
        a = (a = this._parent) && a.RGBAProtocol && a.isCascadeColorEnabled() ? a.getDisplayedColor() : cc.white();
        this.updateDisplayedColor(a)
    },
    updateDisplayedColor: function(a) {
        var b = this._displayedColor,
            c = this._realColor;
        b.r = 0 | c.r * a.r / 255;
        b.g = 0 | c.g * a.g / 255;
        b.b = 0 | c.b * a.b / 255;
        if (this._cascadeColorEnabled)
            for (a = this._children, c = 0; c < a.length; c++) {
                var d = a[c];
                d && d.RGBAProtocol && d.updateDisplayedColor(b)
            }
    },
    isCascadeColorEnabled: function() {
        return this._cascadeColorEnabled
    },
    setCascadeColorEnabled: function(a) {
        this._cascadeColorEnabled !== a && ((this._cascadeColorEnabled = a) ? this._enableCascadeColor() : this._disableCascadeColor())
    },
    _enableCascadeColor: function() {
        var a;
        a = (a = this._parent) && a.RGBAProtocol && a.isCascadeColorEnabled() ? a.getDisplayedColor() : cc.white();
        this.updateDisplayedColor(a)
    },
    _disableCascadeColor: function() {
        var a = this._displayedColor,
            b = this._realColor;
        a.r = b.r;
        a.g = b.g;
        a.b = b.b;
        for (var a = this._children, b = cc.white(), c = 0; c < a.length; c++) {
            var d = a[c];
            d && d.RGBAProtocol && d.updateDisplayedColor(b)
        }
    },
    addChild: function(a, b, c) {
        cc.Node.prototype.addChild.call(this, a, b, c);
        this._cascadeColorEnabled && this._enableCascadeColor();
        this._cascadeOpacityEnabled && this._enableCascadeOpacity()
    },
    setOpacityModifyRGB: function(a) {},
    isOpacityModifyRGB: function() {
        return !1
    }
});
cc.LayerColor = cc.LayerRGBA.extend({
    _blendFunc: null,
    getBlendFunc: function() {
        return this._blendFunc
    },
    changeWidthAndHeight: function(a, b) {
        this.setContentSize(a, b)
    },
    changeWidth: function(a) {
        this.setContentSize(a, this._contentSize._height)
    },
    changeHeight: function(a) {
        this.setContentSize(this._contentSize._width, a)
    },
    setOpacityModifyRGB: function(a) {},
    isOpacityModifyRGB: function() {
        return !1
    },
    setColor: function(a) {
        cc.LayerRGBA.prototype.setColor.call(this, a);
        this._updateColor()
    },
    setOpacity: function(a) {
        cc.LayerRGBA.prototype.setOpacity.call(this,
            a);
        this._updateColor()
    },
    _isLighterMode: !1,
    _squareVertices: null,
    _squareColors: null,
    _verticesFloat32Buffer: null,
    _colorsUint8Buffer: null,
    _squareVerticesAB: null,
    _squareColorsAB: null,
    _ctorForCanvas: function() {
        cc.LayerRGBA.prototype.ctor.call(this);
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST)
    },
    _ctorForWebGL: function() {
        cc.LayerRGBA.prototype.ctor.call(this);
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
        this._squareVerticesAB = new ArrayBuffer(32);
        this._squareColorsAB = new ArrayBuffer(64);
        var a = this._squareVerticesAB,
            b = this._squareColorsAB,
            c = cc.Vertex2F.BYTES_PER_ELEMENT,
            d = cc.Color4F.BYTES_PER_ELEMENT;
        this._squareVertices = [new cc.Vertex2F(0, 0, a, 0), new cc.Vertex2F(0, 0, a, c), new cc.Vertex2F(0, 0, a, 2 * c), new cc.Vertex2F(0, 0, a, 3 * c)];
        this._squareColors = [new cc.Color4F(0, 0, 0, 1, b, 0), new cc.Color4F(0, 0, 0, 1, b, d), new cc.Color4F(0, 0, 0, 1, b, 2 * d), new cc.Color4F(0, 0, 0, 1, b, 3 * d)];
        this._verticesFloat32Buffer = cc.renderContext.createBuffer();
        this._colorsUint8Buffer = cc.renderContext.createBuffer()
    },
    setBlendFunc: function(a,
        b) {
        this._blendFunc = 1 == arguments.length ? a : {
            src: a,
            dst: b
        };
        cc.renderContextType === cc.CANVAS && (this._isLighterMode = this._blendFunc && 1 == this._blendFunc.src && 771 == this._blendFunc.dst)
    },
    init: function(a, b, c) {
        if (!cc.Layer.prototype.init.call(this)) return !1;
        cc.renderContextType !== cc.CANVAS && this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_COLOR));
        var d = cc.Director.getInstance().getWinSize();
        a = a || new cc.Color4B(0, 0, 0, 255);
        b = b || d.width;
        c = c || d.height;
        d = this._displayedColor;
        d.r =
            a.r;
        d.g = a.g;
        d.b = a.b;
        d = this._realColor;
        d.r = a.r;
        d.g = a.g;
        d.b = a.b;
        this._realOpacity = this._displayedOpacity = a.a;
        this.setContentSize(b, c);
        this._updateColor();
        return !0
    },
    setContentSize: null,
    _setContentSizeForWebGL: function(a, b) {
        var c = this._squareVertices;
        2 === arguments.length ? (c[1].x = a, c[2].y = b, c[3].x = a, c[3].y = b, this._bindLayerVerticesBufferData(), cc.Layer.prototype.setContentSize.call(this, a, b)) : (c[1].x = a.width, c[2].y = a.height, c[3].x = a.width, c[3].y = a.height, this._bindLayerVerticesBufferData(), cc.Layer.prototype.setContentSize.call(this,
            a))
    },
    _updateColor: null,
    _updateColorForCanvas: function() {},
    _updateColorForWebGL: function() {
        for (var a = this._displayedColor, b = this._displayedOpacity, c = this._squareColors, d = 0; 4 > d; d++) c[d].r = a.r / 255, c[d].g = a.g / 255, c[d].b = a.b / 255, c[d].a = b / 255;
        this._bindLayerColorsBufferData()
    },
    updateDisplayedColor: function(a) {
        cc.LayerRGBA.prototype.updateDisplayedColor.call(this, a);
        this._updateColor()
    },
    updateDisplayedOpacity: function(a) {
        cc.LayerRGBA.prototype.updateDisplayedOpacity.call(this, a);
        this._updateColor()
    },
    _bindLayerVerticesBufferData: function() {
        var a =
            cc.renderContext;
        a.bindBuffer(a.ARRAY_BUFFER, this._verticesFloat32Buffer);
        a.bufferData(a.ARRAY_BUFFER, this._squareVerticesAB, a.STATIC_DRAW)
    },
    _bindLayerColorsBufferData: function() {
        var a = cc.renderContext;
        a.bindBuffer(a.ARRAY_BUFFER, this._colorsUint8Buffer);
        a.bufferData(a.ARRAY_BUFFER, this._squareColorsAB, a.STATIC_DRAW)
    },
    draw: null,
    _drawForCanvas: function(a) {
        a = a || cc.renderContext;
        var b = this.getContentSize(),
            c = cc.EGLView.getInstance(),
            d = this._displayedColor;
        a.fillStyle = "rgba(" + (0 | d.r) + "," + (0 | d.g) + "," +
            (0 | d.b) + "," + this._displayedOpacity / 255 + ")";
        a.fillRect(0, 0, b.width * c.getScaleX(), -b.height * c.getScaleY());
        cc.g_NumberOfDraws++
    },
    _drawForWebGL: function(a) {
        a = a || cc.renderContext;
        cc.NODE_DRAW_SETUP(this);
        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_COLOR);
        a.bindBuffer(a.ARRAY_BUFFER, this._verticesFloat32Buffer);
        a.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, a.FLOAT, !1, 0, 0);
        a.bindBuffer(a.ARRAY_BUFFER, this._colorsUint8Buffer);
        a.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR,
            4, a.FLOAT, !1, 0, 0);
        cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
        a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    }
});
cc.Browser.supportWebGL ? (cc.LayerColor.prototype.ctor = cc.LayerColor.prototype._ctorForWebGL, cc.LayerColor.prototype.setContentSize = cc.LayerColor.prototype._setContentSizeForWebGL, cc.LayerColor.prototype._updateColor = cc.LayerColor.prototype._updateColorForWebGL, cc.LayerColor.prototype.draw = cc.LayerColor.prototype._drawForWebGL) : (cc.LayerColor.prototype.ctor = cc.LayerColor.prototype._ctorForCanvas, cc.LayerColor.prototype.setContentSize = cc.LayerRGBA.prototype.setContentSize, cc.LayerColor.prototype._updateColor =
    cc.LayerColor.prototype._updateColorForCanvas, cc.LayerColor.prototype.draw = cc.LayerColor.prototype._drawForCanvas);
cc.LayerColor.create = function(a, b, c) {
    var d = new cc.LayerColor;
    switch (arguments.length) {
        case 0:
            d.init();
            break;
        case 1:
            d.init(a);
            break;
        case 3:
            d.init(a, b, c);
            break;
        default:
            d.init()
    }
    return d
};
cc.LayerGradient = cc.LayerColor.extend({
    _startColor: null,
    _endColor: null,
    _startOpacity: null,
    _endOpacity: null,
    _alongVector: null,
    _compressedInterpolation: !1,
    _gradientStartPoint: null,
    _gradientEndPoint: null,
    ctor: function() {
        cc.LayerColor.prototype.ctor.call(this);
        this._startColor = new cc.Color3B(0, 0, 0);
        this._endColor = new cc.Color3B(0, 0, 0);
        this._alongVector = cc.p(0, -1);
        this._endOpacity = this._startOpacity = 255;
        this._gradientStartPoint = cc.p(0, 0);
        this._gradientEndPoint = cc.p(0, 0)
    },
    setContentSize: function(a, b) {
        2 ===
            arguments.length ? cc.LayerColor.prototype.setContentSize.call(this, a, b) : cc.LayerColor.prototype.setContentSize.call(this, a);
        this._updateColor()
    },
    getStartColor: function() {
        return this._realColor
    },
    setStartColor: function(a) {
        this.setColor(a)
    },
    setEndColor: function(a) {
        this._endColor = a;
        this._updateColor()
    },
    getEndColor: function() {
        return this._endColor
    },
    setStartOpacity: function(a) {
        this._startOpacity = a;
        this._updateColor()
    },
    getStartOpacity: function() {
        return this._startOpacity
    },
    setEndOpacity: function(a) {
        this._endOpacity =
            a;
        this._updateColor()
    },
    getEndOpacity: function() {
        return this._endOpacity
    },
    setVector: function(a) {
        this._alongVector.x = a.x;
        this._alongVector.y = a.y;
        this._updateColor()
    },
    getVector: function() {
        return cc.p(this._alongVector.x, this._alongVector.y)
    },
    isCompressedInterpolation: function() {
        return this._compressedInterpolation
    },
    setCompressedInterpolation: function(a) {
        this._compressedInterpolation = a;
        this._updateColor()
    },
    init: function(a, b, c) {
        a = a || cc.c4(0, 0, 0, 255);
        b = b || cc.c4(0, 0, 0, 255);
        c = c || cc.p(0, -1);
        var d = this._startColor,
            e = this._endColor;
        d.r = a.r;
        d.g = a.g;
        d.b = a.b;
        this._startOpacity = a.a;
        e.r = b.r;
        e.g = b.g;
        e.b = b.b;
        this._endOpacity = b.a;
        this._alongVector = c;
        this._compressedInterpolation = !0;
        cc.LayerColor.prototype.init.call(this, cc.c4b(a.r, a.g, a.b, 255));
        return !0
    },
    draw: function(a) {
        if (cc.renderContextType === cc.WEBGL) cc.LayerColor.prototype.draw.call(this, a);
        else {
            a = a || cc.renderContext;
            this._isLighterMode && (a.globalCompositeOperation = "lighter");
            a.save();
            var b = cc.EGLView.getInstance(),
                c = this._displayedOpacity / 255,
                d = this.getContentSize().width *
                b.getScaleX(),
                b = this.getContentSize().height * b.getScaleY(),
                e = a.createLinearGradient(this._gradientStartPoint.x, this._gradientStartPoint.y, this._gradientEndPoint.x, this._gradientEndPoint.y),
                f = this._displayedColor,
                g = this._endColor;
            e.addColorStop(0, "rgba(" + Math.round(f.r) + "," + Math.round(f.g) + "," + Math.round(f.b) + "," + (this._startOpacity / 255 * c).toFixed(4) + ")");
            e.addColorStop(1, "rgba(" + Math.round(g.r) + "," + Math.round(g.g) + "," + Math.round(g.b) + "," + (this._endOpacity / 255 * c).toFixed(4) + ")");
            a.fillStyle = e;
            a.fillRect(0,
                0, d, -b);
            0 != this._rotation && a.rotate(this._rotationRadians);
            a.restore()
        }
    },
    _updateColor: function() {
        var a = this._alongVector;
        if (cc.renderContextType === cc.CANVAS) {
            var b = 0.5 * this.getContentSize().width,
                c = 0.5 * this.getContentSize().height;
            this._gradientStartPoint.x = b * -a.x + b;
            this._gradientStartPoint.y = c * a.y - c;
            this._gradientEndPoint.x = b * a.x + b;
            this._gradientEndPoint.y = c * -a.y - c
        } else if (c = cc.pLength(a), 0 !== c) {
            b = Math.sqrt(2);
            a = cc.p(a.x / c, a.y / c);
            this._compressedInterpolation && (c = 1 / (Math.abs(a.x) + Math.abs(a.y)),
                a = cc.pMult(a, c * b));
            var d = this._displayedOpacity / 255,
                e = this._displayedColor,
                f = this._endColor,
                c = e.r / 255,
                g = e.g / 255,
                e = e.b / 255,
                h = this._startOpacity * d / 255,
                k = f.r / 255,
                m = f.g / 255,
                f = f.b / 255,
                d = this._endOpacity * d / 255,
                n = this._squareColors,
                p = n[0],
                q = n[1],
                r = n[2],
                n = n[3];
            p.r = k + (b + a.x + a.y) / (2 * b) * (c - k);
            p.g = m + (b + a.x + a.y) / (2 * b) * (g - m);
            p.b = f + (b + a.x + a.y) / (2 * b) * (e - f);
            p.a = d + (b + a.x + a.y) / (2 * b) * (h - d);
            q.r = k + (b - a.x + a.y) / (2 * b) * (c - k);
            q.g = m + (b - a.x + a.y) / (2 * b) * (g - m);
            q.b = f + (b - a.x + a.y) / (2 * b) * (e - f);
            q.a = d + (b - a.x + a.y) / (2 * b) * (h - d);
            r.r = k + (b +
                a.x - a.y) / (2 * b) * (c - k);
            r.g = m + (b + a.x - a.y) / (2 * b) * (g - m);
            r.b = f + (b + a.x - a.y) / (2 * b) * (e - f);
            r.a = d + (b + a.x - a.y) / (2 * b) * (h - d);
            n.r = k + (b - a.x - a.y) / (2 * b) * (c - k);
            n.g = m + (b - a.x - a.y) / (2 * b) * (g - m);
            n.b = f + (b - a.x - a.y) / (2 * b) * (e - f);
            n.a = d + (b - a.x - a.y) / (2 * b) * (h - d);
            this._bindLayerColorsBufferData()
        }
    }
});
cc.LayerGradient.create = function(a, b, c) {
    var d = new cc.LayerGradient;
    switch (arguments.length) {
        case 2:
            if (d && d.init(a, b)) return d;
            break;
        case 3:
            if (d && d.init(a, b, c)) return d;
            break;
        case 0:
            if (d && d.init()) return d;
            break;
        default:
            throw "Arguments error ";
    }
    return null
};
cc.LayerMultiplex = cc.Layer.extend({
    _enabledLayer: 0,
    _layers: null,
    initWithLayer: function(a) {
        this._layers = [];
        this._layers.push(a);
        this._enabledLayer = 0;
        this.addChild(a);
        return !0
    },
    initWithLayers: function(a) {
        this._layers = a;
        this._enabledLayer = 0;
        this.addChild(this._layers[this._enabledLayer]);
        return !0
    },
    switchTo: function(a) {
        a >= this._layers.length ? cc.log("cc.LayerMultiplex.switchTo():Invalid index in MultiplexLayer switchTo message") : (this.removeChild(this._layers[this._enabledLayer], !0), this._enabledLayer =
            a, this.addChild(this._layers[a]))
    },
    switchToAndReleaseMe: function(a) {
        a >= this._layers.length ? cc.log("cc.LayerMultiplex.switchToAndReleaseMe():Invalid index in MultiplexLayer switchTo message") : (this.removeChild(this._layers[this._enabledLayer], !0), this._layers[this._enabledLayer] = null, this._enabledLayer = a, this.addChild(this._layers[a]))
    },
    addLayer: function(a) {
        a ? this._layers.push(a) : cc.log("cc.Layer.addLayer(): layer should be non-null")
    }
});
cc.LayerMultiplex.create = function() {
    0 < arguments.length && null == arguments[arguments.length - 1] && cc.log("parameters should not be ending with null in Javascript");
    var a = new cc.LayerMultiplex;
    return a.initWithLayers(arguments) ? a : null
};
cc.SPRITE_INDEX_NOT_INITIALIZED = -1;
cc.generateTextureCacheForColor = function(a) {
    function b() {
        var b = cc.generateTextureCacheForColor,
            d = a.width,
            g = a.height;
        c[0].width = d;
        c[0].height = g;
        c[1].width = d;
        c[1].height = g;
        c[2].width = d;
        c[2].height = g;
        c[3].width = d;
        c[3].height = g;
        b.canvas.width = d;
        b.canvas.height = g;
        var h = b.canvas.getContext("2d");
        h.drawImage(a, 0, 0);
        b.tempCanvas.width = d;
        b.tempCanvas.height = g;
        for (var h = h.getImageData(0, 0, d, g).data, k = 0; 4 > k; k++) {
            var m = c[k].getContext("2d");
            m.getImageData(0, 0, d, g).data;
            b.tempCtx.drawImage(a, 0, 0);
            for (var n = b.tempCtx.getImageData(0,
                0, d, g), p = n.data, q = 0; q < h.length; q += 4) p[q] = 0 === k ? h[q] : 0, p[q + 1] = 1 === k ? h[q + 1] : 0, p[q + 2] = 2 === k ? h[q + 2] : 0, p[q + 3] = h[q + 3];
            m.putImageData(n, 0, 0)
        }
        a.onload = null
    }
    if (a.channelCache) return a.channelCache;
    var c = [document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas")];
    try {
        b()
    } catch (d) {
        a.onload = b
    }
    return a.channelCache = c
};
cc.generateTextureCacheForColor.canvas = document.createElement("canvas");
cc.generateTextureCacheForColor.tempCanvas = document.createElement("canvas");
cc.generateTextureCacheForColor.tempCtx = cc.generateTextureCacheForColor.tempCanvas.getContext("2d");
cc.generateTintImage2 = function(a, b, c) {
    c || (c = cc.rect(0, 0, a.width, a.height), c = cc.RECT_PIXELS_TO_POINTS(c));
    b = b instanceof cc.Color4F ? cc.c4b(255 * b.r, 255 * b.g, 255 * b.b, 255 * b.a) : cc.c4b(b.r, b.g, b.b, 50);
    var d = document.createElement("canvas"),
        e = d.getContext("2d");
    d.width != c.width && (d.width = c.width);
    d.height != c.height && (d.height = c.height);
    e.save();
    e.drawImage(a, c.x, c.y, c.width, c.height, 0, 0, c.width, c.height);
    e.globalCompositeOperation = "source-in";
    e.globalAlpha = b.a / 255;
    e.fillStyle = "rgb(" + b.r + "," + b.g + "," + b.b + ")";
    e.fillRect(0, 0, c.width, c.height);
    e.restore();
    return d
};
cc.generateTintImage = function(a, b, c, d, e) {
    d || (d = cc.rect(0, 0, a.width, a.height));
    a = null == c.a ? cc.c4f(c.r / 255, c.g / 255, c.b / 255, 1) : c;
    c = Math.min(d.width, b[0].width);
    var f = Math.min(d.height, b[0].height),
        g;
    e ? (g = e.getContext("2d"), g.clearRect(0, 0, c, f)) : (e = document.createElement("canvas"), e.width = c, e.height = f, g = e.getContext("2d"));
    g.save();
    g.globalCompositeOperation = "lighter";
    var h = g.globalAlpha;
    0 < a.r && (g.globalAlpha = a.r * h, g.drawImage(b[0], d.x, d.y, c, f, 0, 0, c, f));
    0 < a.g && (g.globalAlpha = a.g * h, g.drawImage(b[1], d.x,
        d.y, c, f, 0, 0, c, f));
    0 < a.b && (g.globalAlpha = a.b * h, g.drawImage(b[2], d.x, d.y, c, f, 0, 0, c, f));
    1 > a.r + a.g + a.b && (g.globalAlpha = h, g.drawImage(b[3], d.x, d.y, c, f, 0, 0, c, f));
    g.restore();
    return e
};
cc.cutRotateImageToCanvas = function(a, b) {
    if (!a) return null;
    if (!b) return a;
    var c = document.createElement("canvas");
    c.width = b.width;
    c.height = b.height;
    var d = c.getContext("2d");
    d.translate(c.width / 2, c.height / 2);
    d.rotate(-1.5707963267948966);
    d.drawImage(a, b.x, b.y, b.height, b.width, -b.height / 2, -b.width / 2, b.height, b.width);
    return c
};
cc.TransformValues = function(a, b, c, d, e, f) {
    this.pos = a;
    this.scale = b;
    this.rotation = c;
    this.skew = d;
    this.ap = e;
    this.visible = f
};
cc.RENDER_IN_SUBPIXEL = function(a) {
    return 0 | a
};
cc.SPRITEBATCHNODE_RENDER_SUBPIXEL && (cc.RENDER_IN_SUBPIXEL = function(a) {
    return a
});
cc.Sprite = cc.NodeRGBA.extend({
    RGBAProtocol: !0,
    _textureAtlas: null,
    _atlasIndex: 0,
    _batchNode: null,
    _dirty: !1,
    _recursiveDirty: null,
    _hasChildren: null,
    _shouldBeHidden: !1,
    _transformToBatch: null,
    _blendFunc: null,
    _texture: null,
    _rect: null,
    _rectRotated: !1,
    _offsetPosition: null,
    _unflippedOffsetPositionFromCenter: null,
    _opacityModifyRGB: !1,
    _flippedX: !1,
    _flippedY: !1,
    _textureLoaded: !1,
    _loadedEventListeners: null,
    _newTextureWhenChangeColor: null,
    textureLoaded: function() {
        return this._textureLoaded
    },
    addLoadedEventListener: function(a,
        b) {
        this._loadedEventListeners || (this._loadedEventListeners = []);
        this._loadedEventListeners.push({
            eventCallback: a,
            eventTarget: b
        })
    },
    _callLoadedEventCallbacks: function() {
        if (this._loadedEventListeners) {
            for (var a = this._loadedEventListeners, b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                d.eventCallback.call(d.eventTarget, this)
            }
            a.length = 0
        }
    },
    isDirty: function() {
        return this._dirty
    },
    setDirty: function(a) {
        this._dirty = a
    },
    isTextureRectRotated: function() {
        return this._rectRotated
    },
    getAtlasIndex: function() {
        return this._atlasIndex
    },
    setAtlasIndex: function(a) {
        this._atlasIndex = a
    },
    getTextureRect: function() {
        return cc.rect(this._rect.x, this._rect.y, this._rect.width, this._rect.height)
    },
    getTextureAtlas: function() {
        return this._textureAtlas
    },
    setTextureAtlas: function(a) {
        this._textureAtlas = a
    },
    getSpriteBatchNode: function() {
        return this._batchNode
    },
    setSpriteBatchNode: function(a) {
        this._batchNode = a
    },
    getOffsetPosition: function() {
        return this._offsetPosition
    },
    getBlendFunc: function() {
        return this._blendFunc
    },
    initWithSpriteFrame: function(a) {
        if (!a) throw "cc.Sprite.initWithSpriteFrame(): spriteFrame should be non-null";
        a.textureLoaded() || (this._textureLoaded = !1, a.addLoadedEventListener(this._spriteFrameLoadedCallback, this));
        var b = this.initWithTexture(a.getTexture(), a.getRect());
        this.setDisplayFrame(a);
        return b
    },
    _spriteFrameLoadedCallback: null,
    _spriteFrameLoadedCallbackForWebGL: function(a) {
        this.setNodeDirty();
        this.setTextureRect(a.getRect(), a.isRotated(), a.getOriginalSize());
        this._callLoadedEventCallbacks()
    },
    _spriteFrameLoadedCallbackForCanvas: function(a) {
        this.setNodeDirty();
        this.setTextureRect(a.getRect(), a.isRotated(),
            a.getOriginalSize());
        a = this.getColor();
        255 === a.r && 255 === a.g && 255 === a.b || this._changeTextureColor();
        this._callLoadedEventCallbacks()
    },
    initWithSpriteFrameName: function(a) {
        if (!a) throw "cc.Sprite.initWithSpriteFrameName(): spriteFrameName should be non-null";
        a = cc.SpriteFrameCache.getInstance().getSpriteFrame(a);
        return this.initWithSpriteFrame(a)
    },
    useBatchNode: function(a) {
        this._textureAtlas = a.getTextureAtlas();
        this._batchNode = a
    },
    setVertexRect: function(a) {
        this._rect.x = a.x;
        this._rect.y = a.y;
        this._rect.width =
            a.width;
        this._rect.height = a.height
    },
    sortAllChildren: function() {
        if (this._reorderChildDirty) {
            for (var a, b, c = this._children, d, e = 1; e < c.length; e++) {
                b = c[e];
                a = e - 1;
                for (d = c[a]; 0 <= a && (b._zOrder < d._zOrder || b._zOrder == d._zOrder && b._orderOfArrival < d._orderOfArrival);) c[a + 1] = d, a -= 1, d = c[a];
                c[a + 1] = b
            }
            this._batchNode && this._arrayMakeObjectsPerformSelector(c, cc.Node.StateCallbackType.sortAllChildren);
            this._reorderChildDirty = !1
        }
    },
    reorderChild: function(a, b) {
        if (!a) throw "cc.Sprite.reorderChild(): child should be non-null"; - 1 === this._children.indexOf(a) ? cc.log("cc.Sprite.reorderChild(): this child is not in children list") : b !== a.getZOrder() && (this._batchNode && !this._reorderChildDirty && (this._setReorderChildDirtyRecursively(), this._batchNode.reorderBatch(!0)), cc.Node.prototype.reorderChild.call(this, a, b))
    },
    removeChild: function(a, b) {
        this._batchNode && this._batchNode.removeSpriteFromAtlas(a);
        cc.Node.prototype.removeChild.call(this, a, b)
    },
    removeAllChildren: function(a) {
        var b = this._children,
            c = this._batchNode;
        if (c && null != b)
            for (var d =
                0, e = b.length; d < e; d++) c.removeSpriteFromAtlas(b[d]);
        cc.Node.prototype.removeAllChildren.call(this, a);
        this._hasChildren = !1
    },
    setDirtyRecursively: function(a) {
        this._recursiveDirty = a;
        this.setDirty(a);
        a = this._children;
        if (null != a)
            for (var b = 0; b < a.length; b++) a[b] instanceof cc.Sprite && a[b].setDirtyRecursively(!0)
    },
    SET_DIRTY_RECURSIVELY: function() {
        this._batchNode && !this._recursiveDirty && (this._dirty = this._recursiveDirty = !0, this._hasChildren && this.setDirtyRecursively(!0))
    },
    setPosition: function(a, b) {
        2 <= arguments.length ?
            cc.Node.prototype.setPosition.call(this, a, arguments[1]) : cc.Node.prototype.setPosition.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setRotation: function(a) {
        cc.Node.prototype.setRotation.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setRotationX: function(a) {
        cc.Node.prototype.setRotationX.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setRotationY: function(a) {
        cc.Node.prototype.setRotationY.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setSkewX: function(a) {
        cc.Node.prototype.setSkewX.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setSkewY: function(a) {
        cc.Node.prototype.setSkewY.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setScaleX: function(a) {
        cc.Node.prototype.setScaleX.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setScaleY: function(a) {
        cc.Node.prototype.setScaleY.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setScale: function(a, b) {
        cc.Node.prototype.setScale.call(this, a, b);
        this.SET_DIRTY_RECURSIVELY()
    },
    setVertexZ: function(a) {
        cc.Node.prototype.setVertexZ.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setAnchorPoint: function(a, b) {
        2 === arguments.length ?
            cc.Node.prototype.setAnchorPoint.call(this, a, b) : cc.Node.prototype.setAnchorPoint.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    setVisible: function(a) {
        cc.Node.prototype.setVisible.call(this, a);
        this.SET_DIRTY_RECURSIVELY()
    },
    ignoreAnchorPointForPosition: function(a) {
        this._batchNode ? cc.log("cc.Sprite.ignoreAnchorPointForPosition(): it is invalid in cc.Sprite when using SpriteBatchNode") : cc.Node.prototype.ignoreAnchorPointForPosition.call(this, a)
    },
    setFlippedX: function(a) {
        this._flippedX != a && (this._flippedX =
            a, this.setTextureRect(this._rect, this._rectRotated, this._contentSize), this.setNodeDirty())
    },
    setFlippedY: function(a) {
        this._flippedY != a && (this._flippedY = a, this.setTextureRect(this._rect, this._rectRotated, this._contentSize), this.setNodeDirty())
    },
    isFlippedX: function() {
        return this._flippedX
    },
    isFlippedY: function() {
        return this._flippedY
    },
    setOpacityModifyRGB: null,
    _setOpacityModifyRGBForWebGL: function(a) {
        this._opacityModifyRGB !== a && (this._opacityModifyRGB = a, this.updateColor())
    },
    _setOpacityModifyRGBForCanvas: function(a) {
        this._opacityModifyRGB !==
            a && (this._opacityModifyRGB = a, this.setNodeDirty())
    },
    isOpacityModifyRGB: function() {
        return this._opacityModifyRGB
    },
    updateDisplayedOpacity: null,
    _updateDisplayedOpacityForWebGL: function(a) {
        cc.NodeRGBA.prototype.updateDisplayedOpacity.call(this, a);
        this.updateColor()
    },
    _updateDisplayedOpacityForCanvas: function(a) {
        cc.NodeRGBA.prototype.updateDisplayedOpacity.call(this, a);
        this._setNodeDirtyForCache()
    },
    setDisplayFrameWithAnimationName: function(a, b) {
        if (!a) throw "cc.Sprite.setDisplayFrameWithAnimationName(): animationName must be non-null";
        var c = cc.AnimationCache.getInstance().getAnimation(a);
        c ? (c = c.getFrames()[b]) ? this.setDisplayFrame(c.getSpriteFrame()) : cc.log("cc.Sprite.setDisplayFrameWithAnimationName(): Invalid frame index") : cc.log("cc.Sprite.setDisplayFrameWithAnimationName(): Frame not found")
    },
    getBatchNode: function() {
        return this._batchNode
    },
    _setReorderChildDirtyRecursively: function() {
        if (!this._reorderChildDirty) {
            this._reorderChildDirty = !0;
            for (var a = this._parent; a && a != this._batchNode;) a._setReorderChildDirtyRecursively(), a = a.getParent()
        }
    },
    getTexture: function() {
        return this._texture
    },
    _quad: null,
    _quadWebBuffer: null,
    _quadDirty: !1,
    _colorized: !1,
    _isLighterMode: !1,
    _originalTexture: null,
    _textureRect_Canvas: null,
    _drawSize_Canvas: null,
    ctor: null,
    _ctorForWebGL: function(a) {
        cc.NodeRGBA.prototype.ctor.call(this);
        this._shouldBeHidden = !1;
        this._offsetPosition = cc._pConst(0, 0);
        this._unflippedOffsetPositionFromCenter = cc._pConst(0, 0);
        this._blendFunc = {
            src: cc.BLEND_SRC,
            dst: cc.BLEND_DST
        };
        this._rect = cc.rect(0, 0, 0, 0);
        this._quad = new cc.V3F_C4B_T2F_Quad;
        this._quadWebBuffer =
            cc.renderContext.createBuffer();
        this._textureLoaded = this._quadDirty = !0;
        if (a)
            if ("string" === typeof a) a = cc.SpriteFrameCache.getInstance().getSpriteFrame(a), this.initWithSpriteFrame(a);
            else if ("object" === typeof a)
            if (a instanceof cc.SpriteFrame) this.initWithSpriteFrame(a);
            else if (a instanceof HTMLImageElement || a instanceof HTMLCanvasElement) {
            var b = new cc.Texture2D;
            b.initWithElement(a);
            b.handleLoadedTexture();
            this.initWithTexture(b)
        } else a instanceof cc.Texture2D && this.initWithTexture(a)
    },
    _ctorForCanvas: function(a) {
        cc.NodeRGBA.prototype.ctor.call(this);
        this._shouldBeHidden = !1;
        this._offsetPosition = cc._pConst(0, 0);
        this._unflippedOffsetPositionFromCenter = cc._pConst(0, 0);
        this._blendFunc = {
            src: cc.BLEND_SRC,
            dst: cc.BLEND_DST
        };
        this._rect = cc.rect(0, 0, 0, 0);
        this._newTextureWhenChangeColor = !1;
        this._textureLoaded = !0;
        this._textureRect_Canvas = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            validRect: !1
        };
        this._drawSize_Canvas = cc.size(0, 0);
        if (a)
            if ("string" === typeof a) a = cc.SpriteFrameCache.getInstance().getSpriteFrame(a), this.initWithSpriteFrame(a);
            else if ("object" === typeof a)
            if (a instanceof cc.SpriteFrame) this.initWithSpriteFrame(a);
            else if (a instanceof HTMLImageElement || a instanceof HTMLCanvasElement) {
            var b = new cc.Texture2D;
            b.initWithElement(a);
            b.handleLoadedTexture();
            this.initWithTexture(b)
        } else a instanceof cc.Texture2D && this.initWithTexture(a)
    },
    getQuad: function() {
        return this._quad
    },
    setBlendFunc: null,
    _setBlendFuncForWebGL: function(a, b) {
        var c = this._blendFunc;
        1 === arguments.length ? (c.src = a.src, c.dst = a.dst) : (c.src = a, c.dst = b)
    },
    _setBlendFuncForCanvas: function(a, b) {
        var c = this._blendFunc;
        1 === arguments.length ? (c.src = a.src, c.dst = a.dst) : (c.src = a, c.dst = b);
        this._isLighterMode = c && (c.src == gl.SRC_ALPHA && c.dst == gl.ONE || c.src == gl.ONE && c.dst == gl.ONE)
    },
    init: null,
    _initForWebGL: function() {
        if (0 < arguments.length) return this.initWithFile(arguments[0], arguments[1]);
        cc.NodeRGBA.prototype.init.call(this);
        this._dirty = this._recursiveDirty = !1;
        this._opacityModifyRGB = !0;
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this.setTexture(null);
        this._textureLoaded = !0;
        this._flippedX = this._flippedY = !1;
        this.setAnchorPoint(0.5, 0.5);
        this._offsetPosition._x = 0;
        this._offsetPosition._y = 0;
        this._hasChildren = !1;
        var a = {
            r: 255,
            g: 255,
            b: 255,
            a: 255
        };
        this._quad.bl.colors = a;
        this._quad.br.colors = a;
        this._quad.tl.colors = a;
        this._quad.tr.colors = a;
        this._quadDirty = !0;
        this.setTextureRect(cc.RectZero(), !1, cc.SizeZero());
        return !0
    },
    _initForCanvas: function() {
        if (0 < arguments.length) return this.initWithFile(arguments[0], arguments[1]);
        cc.NodeRGBA.prototype.init.call(this);
        this._dirty = this._recursiveDirty = !1;
        this._opacityModifyRGB = !0;
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this.setTexture(null);
        this._textureLoaded = !0;
        this._flippedX = this._flippedY = !1;
        this.setAnchorPoint(0.5, 0.5);
        this._offsetPosition._x = 0;
        this._offsetPosition._y = 0;
        this._hasChildren = !1;
        this.setTextureRect(cc.RectZero(), !1, cc.SizeZero());
        return !0
    },
    initWithFile: function(a, b) {
        if (!a) throw "cc.Sprite.initWithFile(): filename should be non-null";
        var c = cc.TextureCache.getInstance().textureForKey(a);
        if (!c) c = cc.TextureCache.getInstance().addImage(a);
        else if (!b) {
            var d = c.getContentSize();
            b = cc.rect(0, 0, d.width, d.height)
        }
        return this.initWithTexture(c, b)
    },
    initWithTexture: null,
    _initWithTextureForWebGL: function(a, b, c) {
        if (0 == arguments.length) throw "Sprite.initWithTexture(): Argument must be non-nil ";
        c = c || !1;
        if (!cc.NodeRGBA.prototype.init.call(this)) return !1;
        this._batchNode = null;
        this._dirty = this._recursiveDirty = !1;
        this._opacityModifyRGB = !0;
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this._flippedX = this._flippedY = !1;
        this.setAnchorPoint(0.5,
            0.5);
        this._offsetPosition._x = 0;
        this._offsetPosition._y = 0;
        this._hasChildren = !1;
        var d = new cc.Color4B(255, 255, 255, 255),
            e = this._quad;
        e.bl.colors = d;
        e.br.colors = d;
        e.tl.colors = d;
        e.tr.colors = d;
        this._textureLoaded = d = a.isLoaded();
        if (!d) return this._rectRotated = c || !1, b && (d = this._rect, d.x = b.x, d.y = b.y, d.width = b.width, d.height = b.height), a.addLoadedEventListener(this._textureLoadedCallback, this), !0;
        b || (d = a.getContentSize(), b = cc.rect(0, 0, d.width, d.height));
        this.setTexture(a);
        this.setTextureRect(b, c, b._size);
        this.setBatchNode(null);
        return this._quadDirty = !0
    },
    _initWithTextureForCanvas: function(a, b, c) {
        if (0 == arguments.length) throw "Sprite.initWithTexture(): Argument must be non-nil ";
        c = c || !1;
        if (!cc.NodeRGBA.prototype.init.call(this)) return !1;
        this._batchNode = null;
        this._dirty = this._recursiveDirty = !1;
        this._opacityModifyRGB = !0;
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this._flippedX = this._flippedY = !1;
        this.setAnchorPoint(0.5, 0.5);
        this._offsetPosition._x = 0;
        this._offsetPosition._y = 0;
        this._hasChildren = !1;
        var d = a.isLoaded();
        this._textureLoaded = d;
        if (!d) return this._rectRotated = c || !1, b && (this._rect.x = b.x, this._rect.y = b.y, this._rect.width = b.width, this._rect.height = b.height), a.addLoadedEventListener(this._textureLoadedCallback, this), !0;
        b || (d = a.getContentSize(), b = cc.rect(0, 0, d.width, d.height));
        this._originalTexture = a;
        this.setTexture(a);
        this.setTextureRect(b, c, b._size);
        this.setBatchNode(null);
        return !0
    },
    _textureLoadedCallback: null,
    _textureLoadedCallbackForWebGL: function(a) {
        if (!this._textureLoaded) {
            this._textureLoaded = !0;
            var b =
                this._rect;
            if (!b) b = a.getContentSize(), b = cc.rect(0, 0, b.width, b.height);
            else if (cc._rectEqualToZero(b)) {
                var c = a.getContentSize();
                b.width = c.width;
                b.height = c.height
            }
            this.setTexture(a);
            this.setTextureRect(b, this._rectRotated, b._size);
            this.setBatchNode(null);
            this._quadDirty = !0;
            this._callLoadedEventCallbacks()
        }
    },
    _textureLoadedCallbackForCanvas: function(a) {
        if (!this._textureLoaded) {
            this._textureLoaded = !0;
            var b = this._rect;
            if (!b) b = a.getContentSize(), b = cc.rect(0, 0, b.width, b.height);
            else if (cc._rectEqualToZero(b)) {
                var c =
                    a.getContentSize();
                b.width = c.width;
                b.height = c.height
            }
            this._originalTexture = a;
            this.setTexture(a);
            this.setTextureRect(b, this._rectRotated, b._size);
            this.setBatchNode(null);
            this._callLoadedEventCallbacks()
        }
    },
    setTextureRect: null,
    _setTextureRectForWebGL: function(a, b, c) {
        this._rectRotated = b || !1;
        c = c || a._size;
        this.setContentSize(c);
        this.setVertexRect(a);
        this._setTextureCoords(a);
        a = this._unflippedOffsetPositionFromCenter;
        this._flippedX && (a._x = -a._x);
        this._flippedY && (a._y = -a._y);
        var d = this._rect;
        this._offsetPosition._x =
            a._x + (this._contentSize._width - d.width) / 2;
        this._offsetPosition._y = a._y + (this._contentSize._height - d.height) / 2;
        if (this._batchNode) this._dirty = !0;
        else {
            a = 0 + this._offsetPosition._x;
            b = 0 + this._offsetPosition._y;
            c = a + d.width;
            var d = b + d.height,
                e = this._quad;
            e.bl.vertices = {
                x: a,
                y: b,
                z: 0
            };
            e.br.vertices = {
                x: c,
                y: b,
                z: 0
            };
            e.tl.vertices = {
                x: a,
                y: d,
                z: 0
            };
            e.tr.vertices = {
                x: c,
                y: d,
                z: 0
            };
            this._quadDirty = !0
        }
    },
    _setTextureRectForCanvas: function(a, b, c) {
        this._rectRotated = b || !1;
        c = c || a._size;
        this.setContentSize(c);
        this.setVertexRect(a);
        b = this._textureRect_Canvas;
        c = cc.CONTENT_SCALE_FACTOR();
        b.x = 0 | a.x * c;
        b.y = 0 | a.y * c;
        b.width = 0 | a.width * c;
        b.height = 0 | a.height * c;
        b.validRect = !(0 === b.width || 0 === b.height || 0 > b.x || 0 > b.y);
        a = this._unflippedOffsetPositionFromCenter;
        this._flippedX && (a._x = -a._x);
        this._flippedY && (a._y = -a._y);
        this._offsetPosition._x = a._x + (this._contentSize._width - this._rect.width) / 2;
        this._offsetPosition._y = a._y + (this._contentSize._height - this._rect.height) / 2;
        this._batchNode && (this._dirty = !0)
    },
    updateTransform: null,
    _updateTransformForWebGL: function() {
        if (this.isDirty()) {
            var a =
                this._quad,
                b = this._parent;
            if (!this._visible || b && b != this._batchNode && b._shouldBeHidden) a.br.vertices = {
                x: 0,
                y: 0,
                z: 0
            }, a.tl.vertices = {
                x: 0,
                y: 0,
                z: 0
            }, a.tr.vertices = {
                x: 0,
                y: 0,
                z: 0
            }, a.bl.vertices = {
                x: 0,
                y: 0,
                z: 0
            }, this._shouldBeHidden = !0;
            else {
                this._shouldBeHidden = !1;
                var c = this._transformToBatch = b && b != this._batchNode ? cc.AffineTransformConcat(this.nodeToParentTransform(), b._transformToBatch) : this.nodeToParentTransform(),
                    d = this._rect._size,
                    b = this._offsetPosition._x,
                    e = this._offsetPosition._y,
                    f = b + d.width,
                    g = e + d.height,
                    d = c.tx,
                    h = c.ty,
                    k = c.a,
                    m = c.b,
                    n = c.d,
                    c = -c.c,
                    p = b * m + e * n + h,
                    q = f * k - e * c + d,
                    r = f * m + e * n + h,
                    s = f * k - g * c + d,
                    f = f * m + g * n + h,
                    t = b * k - g * c + d,
                    g = b * m + g * n + h,
                    h = this._vertexZ;
                a.bl.vertices = {
                    x: cc.RENDER_IN_SUBPIXEL(b * k - e * c + d),
                    y: cc.RENDER_IN_SUBPIXEL(p),
                    z: h
                };
                a.br.vertices = {
                    x: cc.RENDER_IN_SUBPIXEL(q),
                    y: cc.RENDER_IN_SUBPIXEL(r),
                    z: h
                };
                a.tl.vertices = {
                    x: cc.RENDER_IN_SUBPIXEL(t),
                    y: cc.RENDER_IN_SUBPIXEL(g),
                    z: h
                };
                a.tr.vertices = {
                    x: cc.RENDER_IN_SUBPIXEL(s),
                    y: cc.RENDER_IN_SUBPIXEL(f),
                    z: h
                }
            }
            this._textureAtlas.updateQuad(a, this._atlasIndex);
            this._recursiveDirty = !1;
            this.setDirty(!1)
        }
        this._hasChildren && this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform);
        cc.SPRITE_DEBUG_DRAW && (a = [cc.p(this._quad.bl.vertices.x, this._quad.bl.vertices.y), cc.p(this._quad.br.vertices.x, this._quad.br.vertices.y), cc.p(this._quad.tr.vertices.x, this._quad.tr.vertices.y), cc.p(this._quad.tl.vertices.x, this._quad.tl.vertices.y)], cc.drawingUtil.drawPoly(a, 4, !0))
    },
    _updateTransformForCanvas: function() {
        if (this._dirty) {
            var a = this._parent;
            !this._visible ||
                a && a != this._batchNode && a._shouldBeHidden ? this._shouldBeHidden = !0 : (this._shouldBeHidden = !1, this._transformToBatch = a && a != this._batchNode ? cc.AffineTransformConcat(this.nodeToParentTransform(), a._transformToBatch) : this.nodeToParentTransform());
            this._dirty = this._recursiveDirty = !1
        }
        this._hasChildren && this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform)
    },
    addChild: null,
    _addChildForWebGL: function(a, b, c) {
        if (!a) throw "cc.Sprite.addChild(): child should be non-null";
        null ==
            b && (b = a._zOrder);
        null == c && (c = a._tag);
        if (this._batchNode) {
            if (!(a instanceof cc.Sprite)) {
                cc.log("cc.Sprite.addChild(): cc.Sprite only supports cc.Sprites as children when using cc.SpriteBatchNode");
                return
            }
            a.getTexture()._webTextureObj !== this._textureAtlas.getTexture()._webTextureObj && cc.log("cc.Sprite.addChild(): cc.Sprite only supports a sprite using same texture as children when using cc.SpriteBatchNode");
            this._batchNode.appendChild(a);
            this._reorderChildDirty || this._setReorderChildDirtyRecursively()
        }
        cc.NodeRGBA.prototype.addChild.call(this,
            a, b, c);
        this._hasChildren = !0
    },
    _addChildForCanvas: function(a, b, c) {
        if (!a) throw "cc.Sprite.addChild(): child should be non-null";
        null == b && (b = a._zOrder);
        null == c && (c = a._tag);
        cc.NodeRGBA.prototype.addChild.call(this, a, b, c);
        this._hasChildren = !0
    },
    updateColor: function() {
        var a = this._displayedColor,
            b = this._displayedOpacity,
            a = {
                r: a.r,
                g: a.g,
                b: a.b,
                a: b
            };
        this._opacityModifyRGB && (a.r *= b / 255, a.g *= b / 255, a.b *= b / 255);
        b = this._quad;
        b.bl.colors = a;
        b.br.colors = a;
        b.tl.colors = a;
        b.tr.colors = a;
        this._batchNode && (this._atlasIndex !=
            cc.SPRITE_INDEX_NOT_INITIALIZED ? this._textureAtlas.updateQuad(b, this._atlasIndex) : this._dirty = !0);
        this._quadDirty = !0
    },
    setOpacity: null,
    _setOpacityForWebGL: function(a) {
        cc.NodeRGBA.prototype.setOpacity.call(this, a);
        this.updateColor()
    },
    _setOpacityForCanvas: function(a) {
        cc.NodeRGBA.prototype.setOpacity.call(this, a);
        this._setNodeDirtyForCache()
    },
    setColor: null,
    _setColorForWebGL: function(a) {
        cc.NodeRGBA.prototype.setColor.call(this, a);
        this.updateColor()
    },
    _setColorForCanvas: function(a) {
        var b = this.getColor();
        if (b.r !== a.r || b.g !== a.g || b.b !== a.b) cc.NodeRGBA.prototype.setColor.call(this, a), this._changeTextureColor(), this._setNodeDirtyForCache()
    },
    updateDisplayedColor: null,
    _updateDisplayedColorForWebGL: function(a) {
        cc.NodeRGBA.prototype.updateDisplayedColor.call(this, a);
        this.updateColor()
    },
    _updateDisplayedColorForCanvas: function(a) {
        var b = this.getColor();
        cc.NodeRGBA.prototype.updateDisplayedColor.call(this, a);
        a = this._displayedColor;
        if (b.r !== a.r || b.g !== a.g || b.b !== a.b) this._changeTextureColor(), this._setNodeDirtyForCache()
    },
    setDisplayFrame: null,
    _setDisplayFrameForWebGL: function(a) {
        this.setNodeDirty();
        var b = a.getOffset();
        this._unflippedOffsetPositionFromCenter._x = b.x;
        this._unflippedOffsetPositionFromCenter._y = b.y;
        b = a.getTexture();
        a.textureLoaded() || (this._textureLoaded = !1, a.addLoadedEventListener(function(a) {
            this._textureLoaded = !0;
            var b = a.getTexture();
            b != this._texture && this.setTexture(b);
            this.setTextureRect(a.getRect(), a.isRotated(), a.getOriginalSize());
            this._callLoadedEventCallbacks()
        }, this));
        b != this._texture && this.setTexture(b);
        this._rectRotated = a.isRotated();
        this.setTextureRect(a.getRect(), this._rectRotated, a.getOriginalSize())
    },
    _setDisplayFrameForCanvas: function(a) {
        this.setNodeDirty();
        var b = a.getOffset();
        this._unflippedOffsetPositionFromCenter._x = b.x;
        this._unflippedOffsetPositionFromCenter._y = b.y;
        this._rectRotated = a.isRotated();
        var b = a.getTexture(),
            c = a.textureLoaded();
        c || (this._textureLoaded = !1, a.addLoadedEventListener(function(a) {
            this._textureLoaded = !0;
            var b = a.getTexture();
            b != this._texture && this.setTexture(b);
            this.setTextureRect(a.getRect(),
                a.isRotated(), a.getOriginalSize());
            this._callLoadedEventCallbacks()
        }, this));
        b != this._texture && this.setTexture(b);
        this._rectRotated && (this._originalTexture = b);
        this.setTextureRect(a.getRect(), this._rectRotated, a.getOriginalSize());
        this._colorized = !1;
        c && (a = this.getColor(), 255 === a.r && 255 === a.g && 255 === a.b || this._changeTextureColor())
    },
    isFrameDisplayed: null,
    _isFrameDisplayedForWebGL: function(a) {
        return cc.rectEqualToRect(a.getRect(), this._rect) && a.getTexture().getName() == this._texture.getName() && cc.pointEqualToPoint(a.getOffset(),
            this._unflippedOffsetPositionFromCenter)
    },
    _isFrameDisplayedForCanvas: function(a) {
        return a.getTexture() != this._texture ? !1 : cc.rectEqualToRect(a.getRect(), this._rect)
    },
    displayFrame: function() {
        return cc.SpriteFrame.createWithTexture(this._texture, cc.RECT_POINTS_TO_PIXELS(this._rect), this._rectRotated, cc.POINT_POINTS_TO_PIXELS(this._unflippedOffsetPositionFromCenter), cc.SIZE_POINTS_TO_PIXELS(this._contentSize))
    },
    setBatchNode: null,
    _setBatchNodeForWebGL: function(a) {
        if (this._batchNode = a) this._transformToBatch =
            cc.AffineTransformIdentity(), this.setTextureAtlas(this._batchNode.getTextureAtlas());
        else {
            this._atlasIndex = cc.SPRITE_INDEX_NOT_INITIALIZED;
            this.setTextureAtlas(null);
            this._recursiveDirty = !1;
            this.setDirty(!1);
            a = this._offsetPosition._x;
            var b = this._offsetPosition._y,
                c = a + this._rect.width,
                d = b + this._rect.height,
                e = this._quad;
            e.bl.vertices = {
                x: a,
                y: b,
                z: 0
            };
            e.br.vertices = {
                x: c,
                y: b,
                z: 0
            };
            e.tl.vertices = {
                x: a,
                y: d,
                z: 0
            };
            e.tr.vertices = {
                x: c,
                y: d,
                z: 0
            };
            this._quadDirty = !0
        }
    },
    _setBatchNodeForCanvas: function(a) {
        (this._batchNode =
            a) ? (this._transformToBatch = cc.AffineTransformIdentity(), this.setTextureAtlas(this._batchNode.getTextureAtlas())) : (this._atlasIndex = cc.SPRITE_INDEX_NOT_INITIALIZED, this.setTextureAtlas(null), this._recursiveDirty = !1, this.setDirty(!1))
    },
    setTexture: null,
    _setTextureForWebGL: function(a) {
        if (a && !(a instanceof cc.Texture2D)) throw "cc.Sprite.setTexture(): setTexture expects a CCTexture2D. Invalid argument";
        this._batchNode && this._batchNode.getTexture() != a ? cc.log("cc.Sprite.setTexture(): Batched sprites should use the same texture as the batchnode") :
            (a ? this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURECOLOR)) : this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_COLOR)), this._batchNode || this._texture == a || (this._texture = a, this._updateBlendFunc()))
    },
    _setTextureForCanvas: function(a) {
        if (a && !(a instanceof cc.Texture2D)) throw "cc.Sprite.setTexture(): setTexture expects a CCTexture2D. Invalid argument";
        this._texture != a && (a && a.getHtmlElementObj() instanceof HTMLImageElement && (this._originalTexture =
            a), this._texture = a)
    },
    _updateBlendFunc: function() {
        this._batchNode ? cc.log("cc.Sprite._updateBlendFunc(): _updateBlendFunc doesn't work when the sprite is rendered using a cc.CCSpriteBatchNode") : this._texture && this._texture.hasPremultipliedAlpha() ? (this._blendFunc.src = cc.BLEND_SRC, this._blendFunc.dst = cc.BLEND_DST, this.setOpacityModifyRGB(!0)) : (this._blendFunc.src = gl.SRC_ALPHA, this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA, this.setOpacityModifyRGB(!1))
    },
    _changeTextureColor: function() {
        var a, b = this._texture,
            c = this._textureRect_Canvas;
        b && c.validRect && this._originalTexture && (a = b.getHtmlElementObj()) && (b = cc.TextureCache.getInstance().getTextureColors(this._originalTexture.getHtmlElementObj())) && (this._colorized = !0, a instanceof HTMLCanvasElement && !this._rectRotated && !this._newTextureWhenChangeColor ? cc.generateTintImage(a, b, this._displayedColor, c, a) : (a = cc.generateTintImage(a, b, this._displayedColor, c), b = new cc.Texture2D, b.initWithElement(a), b.handleLoadedTexture(), this.setTexture(b)))
    },
    _setTextureCoords: function(a) {
        a =
            cc.RECT_POINTS_TO_PIXELS(a);
        var b = this._batchNode ? this._textureAtlas.getTexture() : this._texture;
        if (b) {
            var c = b.getPixelsWide(),
                d = b.getPixelsHigh(),
                e, f = this._quad;
            this._rectRotated ? (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (b = (2 * a.x + 1) / (2 * c), c = b + (2 * a.height - 2) / (2 * c), e = (2 * a.y + 1) / (2 * d), a = e + (2 * a.width - 2) / (2 * d)) : (b = a.x / c, c = (a.x + a.height) / c, e = a.y / d, a = (a.y + a.width) / d), this._flippedX && (d = e, e = a, a = d), this._flippedY && (d = b, b = c, c = d), f.bl.texCoords.u = b, f.bl.texCoords.v = e, f.br.texCoords.u = b, f.br.texCoords.v = a, f.tl.texCoords.u =
                c, f.tl.texCoords.v = e, f.tr.texCoords.u = c, f.tr.texCoords.v = a) : (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (b = (2 * a.x + 1) / (2 * c), c = b + (2 * a.width - 2) / (2 * c), e = (2 * a.y + 1) / (2 * d), a = e + (2 * a.height - 2) / (2 * d)) : (b = a.x / c, c = (a.x + a.width) / c, e = a.y / d, a = (a.y + a.height) / d), this._flippedX && (d = b, b = c, c = d), this._flippedY && (d = e, e = a, a = d), f.bl.texCoords.u = b, f.bl.texCoords.v = a, f.br.texCoords.u = c, f.br.texCoords.v = a, f.tl.texCoords.u = b, f.tl.texCoords.v = e, f.tr.texCoords.u = c, f.tr.texCoords.v = e);
            this._quadDirty = !0
        }
    },
    draw: null,
    _drawForWebGL: function() {
        if (this._textureLoaded) {
            var a =
                cc.renderContext,
                b = this._texture;
            b ? b._isLoaded && (this._shaderProgram.use(), this._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4(), cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst), cc.glBindTexture2DN(0, b), cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSCOLORTEX), a.bindBuffer(a.ARRAY_BUFFER, this._quadWebBuffer), this._quadDirty && (a.bufferData(a.ARRAY_BUFFER, this._quad.arrayBuffer, a.DYNAMIC_DRAW), this._quadDirty = !1), a.vertexAttribPointer(0, 3, a.FLOAT, !1, 24, 0), a.vertexAttribPointer(1,
                4, a.UNSIGNED_BYTE, !0, 24, 12), a.vertexAttribPointer(2, 2, a.FLOAT, !1, 24, 16), a.drawArrays(a.TRIANGLE_STRIP, 0, 4)) : (this._shaderProgram.use(), this._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4(), cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst), cc.glBindTexture2D(null), cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_COLOR), a.bindBuffer(a.ARRAY_BUFFER, this._quadWebBuffer), this._quadDirty && (cc.renderContext.bufferData(cc.renderContext.ARRAY_BUFFER, this._quad.arrayBuffer,
                cc.renderContext.STATIC_DRAW), this._quadDirty = !1), a.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 3, a.FLOAT, !1, 24, 0), a.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, a.UNSIGNED_BYTE, !0, 24, 12), a.drawArrays(a.TRIANGLE_STRIP, 0, 4));
            cc.g_NumberOfDraws++;
            0 !== cc.SPRITE_DEBUG_DRAW && (1 === cc.SPRITE_DEBUG_DRAW ? (a = this._quad, a = [cc.p(a.tl.vertices.x, a.tl.vertices.y), cc.p(a.bl.vertices.x, a.bl.vertices.y), cc.p(a.br.vertices.x, a.br.vertices.y), cc.p(a.tr.vertices.x, a.tr.vertices.y)], cc.drawingUtil.drawPoly(a, 4, !0)) :
                2 === cc.SPRITE_DEBUG_DRAW && (a = this.getTextureRect()._size, b = this.getOffsetPosition(), a = [cc.p(b.x, b.y), cc.p(b.x + a.width, b.y), cc.p(b.x + a.width, b.y + a.height), cc.p(b.x, b.y + a.height)], cc.drawingUtil.drawPoly(a, 4, !0)))
        }
    },
    _drawForCanvas: function(a) {
        if (this._textureLoaded) {
            a = a || cc.renderContext;
            this._isLighterMode && (a.globalCompositeOperation = "lighter");
            var b = cc.EGLView.getInstance().getScaleX(),
                c = cc.EGLView.getInstance().getScaleY();
            a.globalAlpha = this._displayedOpacity / 255;
            var d = this._rect,
                e = this._contentSize,
                f = this._offsetPosition,
                g = this._drawSize_Canvas,
                h = 0 | f._x,
                k = -f._y - d.height,
                m = this._textureRect_Canvas;
            g.width = d.width * b;
            g.height = d.height * c;
            if (this._flippedX || this._flippedY) a.save(), this._flippedX && (h = -f._x - d.width, a.scale(-1, 1)), this._flippedY && (k = f._y, a.scale(1, -1));
            h *= b;
            k *= c;
            this._texture && m.validRect ? (e = this._texture.getHtmlElementObj(), this._colorized ? a.drawImage(e, 0, 0, m.width, m.height, h, k, g.width, g.height) : a.drawImage(e, m.x, m.y, m.width, m.height, h, k, g.width, g.height)) : 0 !== e._width && (g = this.getColor(),
                a.fillStyle = "rgba(" + g.r + "," + g.g + "," + g.b + ",1)", a.fillRect(h, k, e._width * b, e._height * c));
            1 === cc.SPRITE_DEBUG_DRAW ? (a.strokeStyle = "rgba(0,255,0,1)", h /= b, k = -(k / c), h = [cc.p(h, k), cc.p(h + d.width, k), cc.p(h + d.width, k - d.height), cc.p(h, k - d.height)], cc.drawingUtil.drawPoly(h, 4, !0)) : 2 === cc.SPRITE_DEBUG_DRAW && (a.strokeStyle = "rgba(0,255,0,1)", b = this._rect._size, k = -k, h = [cc.p(h, k), cc.p(h + b.width, k), cc.p(h + b.width, k - b.height), cc.p(h, k - b.height)], cc.drawingUtil.drawPoly(h, 4, !0));
            (this._flippedX || this._flippedY) && a.restore();
            cc.g_NumberOfDraws++
        }
    }
});
cc.Browser.supportWebGL ? (cc.Sprite.prototype._spriteFrameLoadedCallback = cc.Sprite.prototype._spriteFrameLoadedCallbackForWebGL, cc.Sprite.prototype.setOpacityModifyRGB = cc.Sprite.prototype._setOpacityModifyRGBForWebGL, cc.Sprite.prototype.updateDisplayedOpacity = cc.Sprite.prototype._updateDisplayedOpacityForWebGL, cc.Sprite.prototype.ctor = cc.Sprite.prototype._ctorForWebGL, cc.Sprite.prototype.setBlendFunc = cc.Sprite.prototype._setBlendFuncForWebGL, cc.Sprite.prototype.init = cc.Sprite.prototype._initForWebGL, cc.Sprite.prototype.initWithTexture =
    cc.Sprite.prototype._initWithTextureForWebGL, cc.Sprite.prototype._textureLoadedCallback = cc.Sprite.prototype._textureLoadedCallbackForWebGL, cc.Sprite.prototype.setTextureRect = cc.Sprite.prototype._setTextureRectForWebGL, cc.Sprite.prototype.updateTransform = cc.Sprite.prototype._updateTransformForWebGL, cc.Sprite.prototype.addChild = cc.Sprite.prototype._addChildForWebGL, cc.Sprite.prototype.setOpacity = cc.Sprite.prototype._setOpacityForWebGL, cc.Sprite.prototype.setColor = cc.Sprite.prototype._setColorForWebGL,
    cc.Sprite.prototype.updateDisplayedColor = cc.Sprite.prototype._updateDisplayedColorForWebGL, cc.Sprite.prototype.setDisplayFrame = cc.Sprite.prototype._setDisplayFrameForWebGL, cc.Sprite.prototype.isFrameDisplayed = cc.Sprite.prototype._isFrameDisplayedForWebGL, cc.Sprite.prototype.setBatchNode = cc.Sprite.prototype._setBatchNodeForWebGL, cc.Sprite.prototype.setTexture = cc.Sprite.prototype._setTextureForWebGL, cc.Sprite.prototype.draw = cc.Sprite.prototype._drawForWebGL) : (cc.Sprite.prototype._spriteFrameLoadedCallback =
    cc.Sprite.prototype._spriteFrameLoadedCallbackForCanvas, cc.Sprite.prototype.setOpacityModifyRGB = cc.Sprite.prototype._setOpacityModifyRGBForCanvas, cc.Sprite.prototype.updateDisplayedOpacity = cc.Sprite.prototype._updateDisplayedOpacityForCanvas, cc.Sprite.prototype.ctor = cc.Sprite.prototype._ctorForCanvas, cc.Sprite.prototype.setBlendFunc = cc.Sprite.prototype._setBlendFuncForCanvas, cc.Sprite.prototype.init = cc.Sprite.prototype._initForCanvas, cc.Sprite.prototype.initWithTexture = cc.Sprite.prototype._initWithTextureForCanvas,
    cc.Sprite.prototype._textureLoadedCallback = cc.Sprite.prototype._textureLoadedCallbackForCanvas, cc.Sprite.prototype.setTextureRect = cc.Sprite.prototype._setTextureRectForCanvas, cc.Sprite.prototype.updateTransform = cc.Sprite.prototype._updateTransformForCanvas, cc.Sprite.prototype.addChild = cc.Sprite.prototype._addChildForCanvas, cc.Sprite.prototype.setOpacity = cc.Sprite.prototype._setOpacityForCanvas, cc.Sprite.prototype.setColor = cc.Sprite.prototype._setColorForCanvas, cc.Sprite.prototype.updateDisplayedColor =
    cc.Sprite.prototype._updateDisplayedColorForCanvas, cc.Sprite.prototype.setDisplayFrame = cc.Sprite.prototype._setDisplayFrameForCanvas, cc.Sprite.prototype.isFrameDisplayed = cc.Sprite.prototype._isFrameDisplayedForCanvas, cc.Sprite.prototype.setBatchNode = cc.Sprite.prototype._setBatchNodeForCanvas, cc.Sprite.prototype.setTexture = cc.Sprite.prototype._setTextureForCanvas, cc.Sprite.prototype.draw = cc.Sprite.prototype._drawForCanvas);
cc.Sprite.createWithTexture = function(a, b) {
    var c = arguments.length,
        d = new cc.Sprite;
    switch (c) {
        case 1:
            return d && d.initWithTexture(a) ? d : null;
        case 2:
            return d && d.initWithTexture(a, b) ? d : null;
        default:
            throw "Sprite.createWithTexture(): Argument must be non-nil ";
    }
};
cc.Sprite.create = function(a, b) {
    var c = arguments.length,
        d = new cc.Sprite;
    if (0 === c) {
        if (d.init()) return d
    } else if (d && d.init(a, b)) return d;
    return null
};
cc.Sprite.createWithSpriteFrameName = function(a) {
    var b = null;
    if ("string" == typeof a) {
        if (b = cc.SpriteFrameCache.getInstance().getSpriteFrame(a), !b) return cc.log("Invalid spriteFrameName: " + a), null
    } else return cc.log("Invalid argument. Expecting string."), null;
    return (a = new cc.Sprite) && a.initWithSpriteFrame(b) ? a : null
};
cc.Sprite.createWithSpriteFrame = function(a) {
    var b = new cc.Sprite;
    return b && b.initWithSpriteFrame(a) ? b : null
};
cc.AnimationFrame = cc.Class.extend({
    _spriteFrame: null,
    _delayPerUnit: 0,
    _userInfo: null,
    ctor: function() {
        this._delayPerUnit = 0
    },
    clone: function() {
        var a = new cc.AnimationFrame;
        a.initWithSpriteFrame(this._spriteFrame.clone(), this._delayPerUnit, this._userInfo);
        return a
    },
    copyWithZone: function(a) {
        return cc.clone(this)
    },
    copy: function(a) {
        a = new cc.AnimationFrame;
        a.initWithSpriteFrame(this._spriteFrame.clone(), this._delayPerUnit, this._userInfo);
        return a
    },
    initWithSpriteFrame: function(a, b, c) {
        this._spriteFrame = a;
        this._delayPerUnit =
            b;
        this._userInfo = c;
        return !0
    },
    getSpriteFrame: function() {
        return this._spriteFrame
    },
    setSpriteFrame: function(a) {
        this._spriteFrame = a
    },
    getDelayUnits: function() {
        return this._delayPerUnit
    },
    setDelayUnits: function(a) {
        this._delayPerUnit = a
    },
    getUserInfo: function() {
        return this._userInfo
    },
    setUserInfo: function(a) {
        this._userInfo = a
    }
});
cc.Animation = cc.Class.extend({
    _frames: null,
    _loops: 0,
    _restoreOriginalFrame: !1,
    _duration: 0,
    _delayPerUnit: 0,
    _totalDelayUnits: 0,
    ctor: function() {
        this._frames = []
    },
    getFrames: function() {
        return this._frames
    },
    setFrames: function(a) {
        this._frames = a
    },
    addSpriteFrame: function(a) {
        var b = new cc.AnimationFrame;
        b.initWithSpriteFrame(a, 1, null);
        this._frames.push(b);
        this._totalDelayUnits++
    },
    addSpriteFrameWithFile: function(a) {
        a = cc.TextureCache.getInstance().addImage(a);
        var b = cc.RectZero();
        b._size = a.getContentSize();
        a = cc.SpriteFrame.createWithTexture(a,
            b);
        this.addSpriteFrame(a)
    },
    addSpriteFrameWithTexture: function(a, b) {
        var c = cc.SpriteFrame.createWithTexture(a, b);
        this.addSpriteFrame(c)
    },
    initWithAnimationFrames: function(a, b, c) {
        cc.ArrayVerifyType(a, cc.AnimationFrame);
        this._delayPerUnit = b;
        this._loops = c;
        this._totalDelayUnits = 0;
        b = this._frames;
        for (c = b.length = 0; c < a.length; c++) {
            var d = a[c];
            b.push(d);
            this._totalDelayUnits += d.getDelayUnits()
        }
        return !0
    },
    clone: function() {
        var a = new cc.Animation;
        a.initWithAnimationFrames(this._copyFrames(), this._delayPerUnit, this._loops);
        a.setRestoreOriginalFrame(this._restoreOriginalFrame);
        return a
    },
    copyWithZone: function(a) {
        a = new cc.Animation;
        a.initWithAnimationFrames(this._copyFrames(), this._delayPerUnit, this._loops);
        a.setRestoreOriginalFrame(this._restoreOriginalFrame);
        return a
    },
    _copyFrames: function() {
        for (var a = [], b = 0; b < this._frames.length; b++) a.push(this._frames[b].clone());
        return a
    },
    copy: function(a) {
        return this.copyWithZone(null)
    },
    getLoops: function() {
        return this._loops
    },
    setLoops: function(a) {
        this._loops = a
    },
    setRestoreOriginalFrame: function(a) {
        this._restoreOriginalFrame =
            a
    },
    getRestoreOriginalFrame: function() {
        return this._restoreOriginalFrame
    },
    getDuration: function() {
        return this._totalDelayUnits * this._delayPerUnit
    },
    getDelayPerUnit: function() {
        return this._delayPerUnit
    },
    setDelayPerUnit: function(a) {
        this._delayPerUnit = a
    },
    getTotalDelayUnits: function() {
        return this._totalDelayUnits
    },
    initWithSpriteFrames: function(a, b) {
        cc.ArrayVerifyType(a, cc.SpriteFrame);
        this._loops = 1;
        this._delayPerUnit = b || 0;
        this._totalDelayUnits = 0;
        var c = this._frames;
        c.length = 0;
        if (a) {
            for (var d = 0; d < a.length; d++) {
                var e =
                    a[d],
                    f = new cc.AnimationFrame;
                f.initWithSpriteFrame(e, 1, null);
                c.push(f)
            }
            this._totalDelayUnits += a.length
        }
        return !0
    },
    retain: function() {},
    release: function() {}
});
cc.Animation.create = function(a, b, c) {
    var d = arguments.length,
        e = new cc.Animation;
    0 == d ? e.initWithSpriteFrames(null, 0) : 2 == d ? e.initWithSpriteFrames(a, b || 0) : 3 == d && e.initWithAnimationFrames(a, b, c);
    return e
};
cc.Animation.createWithAnimationFrames = function(a, b, c) {
    var d = new cc.Animation;
    d.initWithAnimationFrames(a, b, c);
    return d
};
cc.AnimationCache = cc.Class.extend({
    addAnimation: function(a, b) {
        this._animations[b] = a
    },
    removeAnimation: function(a) {
        a && this._animations[a] && delete this._animations[a]
    },
    getAnimation: function(a) {
        return this._animations[a] ? this._animations[a] : null
    },
    _addAnimationsWithDictionary: function(a, b) {
        var c = a.animations;
        if (c) {
            var d = 1,
                e = a.properties;
            if (e)
                for (var d = null != e.format ? parseInt(e.format) : d, e = e.spritesheets, f = cc.SpriteFrameCache.getInstance(), g = cc.FileUtils.getInstance(), h, k = 0; k < e.length; k++) h = g.fullPathFromRelativeFile(e[k],
                    b), f.addSpriteFrames(h);
            switch (d) {
                case 1:
                    this._parseVersion1(c);
                    break;
                case 2:
                    this._parseVersion2(c);
                    break;
                default:
                    cc.log("cc.AnimationCache. Invalid animation format")
            }
        } else cc.log("cocos2d: cc.AnimationCache: No animations were found in provided dictionary.")
    },
    addAnimations: function(a) {
        if (!a) throw "cc.AnimationCache.addAnimations(): Invalid texture file name";
        var b = cc.FileUtils.getInstance(),
            c = b.fullPathForFilename(a);
        (b = b.dictionaryWithContentsOfFileThreadSafe(c)) ? this._addAnimationsWithDictionary(b,
            a) : cc.log("cc.AnimationCache.addAnimations(): File could not be found")
    },
    _parseVersion1: function(a) {
        var b = cc.SpriteFrameCache.getInstance(),
            c;
        for (c in a) {
            var d = a[c],
                e = d.frames,
                d = parseFloat(d.delay) || 0,
                f = null;
            if (e) {
                for (var f = [], g = 0; g < e.length; g++) {
                    var h = b.getSpriteFrame(e[g]);
                    if (h) {
                        var k = new cc.AnimationFrame;
                        k.initWithSpriteFrame(h, 1, null);
                        f.push(k)
                    } else cc.log("cocos2d: cc.AnimationCache: Animation '" + c + "' refers to frame '" + e[g] + "' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.")
                }
                0 ===
                    f.length ? cc.log("cocos2d: cc.AnimationCache: None of the frames for animation '" + c + "' were found in the cc.SpriteFrameCache. Animation is not being added to the Animation Cache.") : (f.length != e.length && cc.log("cocos2d: cc.AnimationCache: An animation in your dictionary refers to a frame which is not in the cc.SpriteFrameCache. Some or all of the frames for the animation '" + c + "' may be missing."), f = cc.Animation.createWithAnimationFrames(f, d, 1), cc.AnimationCache.getInstance().addAnimation(f, c))
            } else cc.log("cocos2d: cc.AnimationCache: Animation '" +
                c + "' found in dictionary without any frames - cannot add to animation cache.")
        }
    },
    _parseVersion2: function(a) {
        var b = cc.SpriteFrameCache.getInstance(),
            c;
        for (c in a) {
            var d = a[c],
                e = d.loop,
                f = parseInt(d.loops),
                e = e ? cc.REPEAT_FOREVER : isNaN(f) ? 1 : f,
                f = d.restoreOriginalFrame && !0 == d.restoreOriginalFrame ? !0 : !1,
                g = d.frames;
            if (g) {
                for (var h = [], k = 0; k < g.length; k++) {
                    var m = g[k],
                        n = m.spriteframe,
                        p = b.getSpriteFrame(n);
                    if (p) {
                        var n = parseFloat(m.delayUnits) || 0,
                            m = m.notification,
                            q = new cc.AnimationFrame;
                        q.initWithSpriteFrame(p, n,
                            m);
                        h.push(q)
                    } else cc.log("cocos2d: cc.AnimationCache: Animation '" + c + "' refers to frame '" + n + "' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.")
                }
                d = parseFloat(d.delayPerUnit) || 0;
                g = new cc.Animation;
                g.initWithAnimationFrames(h, d, e);
                g.setRestoreOriginalFrame(f);
                cc.AnimationCache.getInstance().addAnimation(g, c)
            } else cc.log("cocos2d: CCAnimationCache: Animation '" + c + "' found in dictionary without any frames - cannot add to animation cache.")
        }
    },
    init: function() {
        this._animations = {};
        return !0
    },
    _animations: null
});
cc.AnimationCache.purgeSharedAnimationCache = function() {
    cc.s_sharedAnimationCache && (cc.s_sharedAnimationCache._animations = null, cc.s_sharedAnimationCache = null)
};
cc.AnimationCache.getInstance = function() {
    null === cc.s_sharedAnimationCache && (cc.s_sharedAnimationCache = new cc.AnimationCache, cc.s_sharedAnimationCache.init());
    return cc.s_sharedAnimationCache
};
cc.s_sharedAnimationCache = null;
cc.SpriteFrame = cc.Class.extend({
    _offset: null,
    _originalSize: null,
    _rectInPixels: null,
    _rotated: !1,
    _rect: null,
    _offsetInPixels: null,
    _originalSizeInPixels: null,
    _texture: null,
    _textureFilename: "",
    _textureLoaded: !1,
    _eventListeners: null,
    ctor: function() {
        this._offset = cc._pConst(0, 0);
        this._offsetInPixels = cc._pConst(0, 0);
        this._originalSize = cc._sizeConst(0, 0);
        this._rotated = !1;
        this._originalSizeInPixels = cc._sizeConst(0, 0);
        this._textureFilename = "";
        this._texture = null;
        this._textureLoaded = !1
    },
    textureLoaded: function() {
        return this._textureLoaded
    },
    addLoadedEventListener: function(a, b) {
        null == this._eventListeners && (this._eventListeners = []);
        this._eventListeners.push({
            eventCallback: a,
            eventTarget: b
        })
    },
    _callLoadedEventCallbacks: function() {
        var a = this._eventListeners;
        if (a) {
            for (var b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                d.eventCallback.call(d.eventTarget, this)
            }
            a.length = 0
        }
    },
    getRectInPixels: function() {
        var a = this._rectInPixels;
        return cc.rect(a.x, a.y, a.width, a.height)
    },
    setRectInPixels: function(a) {
        this._rectInPixels || (this._rectInPixels = cc.rect(0, 0, 0, 0));
        this._rectInPixels.x =
            a.x;
        this._rectInPixels.y = a.y;
        this._rectInPixels.width = a.width;
        this._rectInPixels.height = a.height;
        this._rect = cc.RECT_PIXELS_TO_POINTS(a)
    },
    isRotated: function() {
        return this._rotated
    },
    setRotated: function(a) {
        this._rotated = a
    },
    getRect: function() {
        var a = this._rect;
        return cc.rect(a.x, a.y, a.width, a.height)
    },
    setRect: function(a) {
        this._rect || (this._rect = cc.rect(0, 0, 0, 0));
        this._rect.x = a.x;
        this._rect.y = a.y;
        this._rect.width = a.width;
        this._rect.height = a.height;
        this._rectInPixels = cc.RECT_POINTS_TO_PIXELS(this._rect)
    },
    getOffsetInPixels: function() {
        return this._offsetInPixels
    },
    setOffsetInPixels: function(a) {
        this._offsetInPixels._x = a.x;
        this._offsetInPixels._y = a.y;
        cc._POINT_PIXELS_TO_POINTS_OUT(this._offsetInPixels, this._offset)
    },
    getOriginalSizeInPixels: function() {
        return this._originalSizeInPixels
    },
    setOriginalSizeInPixels: function(a) {
        this._originalSizeInPixels._width = a.width;
        this._originalSizeInPixels._height = a.height
    },
    getOriginalSize: function() {
        return this._originalSize
    },
    setOriginalSize: function(a) {
        this._originalSize._width =
            a.width;
        this._originalSize._height = a.height
    },
    getTexture: function() {
        if (this._texture) return this._texture;
        if ("" !== this._textureFilename) {
            var a = cc.TextureCache.getInstance().addImage(this._textureFilename);
            a && (this._textureLoaded = a.isLoaded());
            return a
        }
        return null
    },
    setTexture: function(a) {
        if (this._texture != a) {
            var b = a.isLoaded();
            this._textureLoaded = b;
            this._texture = a;
            b || a.addLoadedEventListener(function(a) {
                this._textureLoaded = !0;
                if (this._rotated && cc.renderContextType === cc.CANVAS) {
                    var b = a.getHtmlElementObj(),
                        b = cc.cutRotateImageToCanvas(b, this.getRect()),
                        e = new cc.Texture2D;
                    e.initWithElement(b);
                    e.handleLoadedTexture();
                    this.setTexture(e);
                    b = this.getRect();
                    this.setRect(cc.rect(0, 0, b.width, b.height))
                }
                b = this._rect;
                0 === b.width && 0 === b.height && (a = a.getContentSize(), this._rect.width = a.width, this._rect.height = a.height, this._rectInPixels = cc.RECT_POINTS_TO_PIXELS(this._rect), this._originalSizeInPixels._width = this._rectInPixels.width, this._originalSizeInPixels._height = this._rectInPixels.height, this._originalSize._width =
                    a.width, this._originalSize._height = a.height);
                this._callLoadedEventCallbacks()
            }, this)
        }
    },
    getOffset: function() {
        return this._offset
    },
    setOffset: function(a) {
        this._offset._x = a.x;
        this._offset._y = a.y
    },
    clone: function() {
        var a = new cc.SpriteFrame;
        a.initWithTextureFilename(this._textureFilename, this._rectInPixels, this._rotated, this._offsetInPixels, this._originalSizeInPixels);
        a.setTexture(this._texture);
        return a
    },
    copyWithZone: function() {
        var a = new cc.SpriteFrame;
        a.initWithTextureFilename(this._textureFilename, this._rectInPixels,
            this._rotated, this._offsetInPixels, this._originalSizeInPixels);
        a.setTexture(this._texture);
        return a
    },
    copy: function() {
        return this.copyWithZone()
    },
    initWithTexture: function(a, b, c, d, e) {
        2 === arguments.length && (b = cc.RECT_POINTS_TO_PIXELS(b));
        d = d || cc.p(0, 0);
        e = e || b._size;
        this.setTexture(a);
        this._rectInPixels = b;
        this._rect = cc.RECT_PIXELS_TO_POINTS(b);
        this._offsetInPixels._x = d.x;
        this._offsetInPixels._y = d.y;
        cc._POINT_PIXELS_TO_POINTS_OUT(d, this._offset);
        this._originalSizeInPixels._width = e.width;
        this._originalSizeInPixels._height =
            e.height;
        cc._SIZE_PIXELS_TO_POINTS_OUT(e, this._originalSize);
        this._rotated = c || !1;
        return !0
    },
    initWithTextureFilename: function(a, b, c, d, e) {
        2 === arguments.length && (b = cc.RECT_POINTS_TO_PIXELS(b));
        d = d || cc.p(0, 0);
        e = e || b._size;
        this._texture = null;
        this._textureFilename = a;
        this._rectInPixels = b;
        this._rect = cc.RECT_PIXELS_TO_POINTS(b);
        this._rotated = c || !1;
        this._offsetInPixels._x = d.x;
        this._offsetInPixels._y = d.y;
        cc._POINT_PIXELS_TO_POINTS_OUT(d, this._offset);
        this._originalSizeInPixels._width = e.width;
        this._originalSizeInPixels._height =
            e.height;
        cc._SIZE_PIXELS_TO_POINTS_OUT(e, this._originalSize);
        return !0
    }
});
cc.SpriteFrame.create = function(a, b, c, d, e) {
    var f = new cc.SpriteFrame;
    switch (arguments.length) {
        case 2:
            f.initWithTextureFilename(a, b);
            break;
        case 5:
            f.initWithTextureFilename(a, b, c, d, e);
            break;
        default:
            throw "Argument must be non-nil ";
    }
    return f
};
cc.SpriteFrame.createWithTexture = function(a, b, c, d, e) {
    var f = new cc.SpriteFrame;
    switch (arguments.length) {
        case 2:
            f.initWithTexture(a, b);
            break;
        case 5:
            f.initWithTexture(a, b, c, d, e);
            break;
        default:
            throw "Argument must be non-nil ";
    }
    return f
};
cc.SpriteFrame._frameWithTextureForCanvas = function(a, b, c, d, e) {
    var f = new cc.SpriteFrame;
    f._texture = a;
    f._rectInPixels = b;
    f._rect = cc.RECT_PIXELS_TO_POINTS(b);
    f._offsetInPixels._x = d.x;
    f._offsetInPixels._y = d.y;
    cc._POINT_PIXELS_TO_POINTS_OUT(f._offsetInPixels, f._offset);
    f._originalSizeInPixels._width = e.width;
    f._originalSizeInPixels._height = e.height;
    cc._SIZE_PIXELS_TO_POINTS_OUT(f._originalSizeInPixels, f._originalSize);
    f._rotated = c;
    return f
};
cc.SpriteFrameCache = cc.Class.extend({
    _spriteFrames: null,
    _spriteFramesAliases: null,
    _loadedFileNames: null,
    ctor: function() {
        this._spriteFrames = {};
        this._spriteFramesAliases = {};
        this._loadedFileNames = []
    },
    _addSpriteFramesWithDictionary: function(a, b) {
        var c = a.metadata || a.meta,
            d = a.frames,
            e = 0;
        c && (e = c.format, e = 1 >= e.length ? parseInt(e) : e);
        if (0 > e || 3 < e) cc.log("format is not supported for cc.SpriteFrameCache.addSpriteFramesWithDictionary");
        else
            for (var f in d)
                if (c = d[f]) {
                    var g = this._spriteFrames[f];
                    if (!g) {
                        if (0 == e) {
                            var g =
                                parseFloat(c.x),
                                h = parseFloat(c.y),
                                k = parseFloat(c.width),
                                m = parseFloat(c.height),
                                n = parseFloat(c.offsetX),
                                p = parseFloat(c.offsetY),
                                q = parseInt(c.originalWidth),
                                c = parseInt(c.originalHeight);
                            q && c || cc.log("cocos2d: WARNING: originalWidth/Height not found on the cc.SpriteFrame. AnchorPoint won't work as expected. Regenrate the .plist");
                            q = Math.abs(q);
                            c = Math.abs(c);
                            g = cc.SpriteFrame.createWithTexture(b, cc.rect(g, h, k, m), !1, cc.p(n, p), cc.size(q, c))
                        } else if (1 == e || 2 == e) g = cc.RectFromString(c.frame), h = !1, 2 == e && (h = c.rotated),
                            k = cc.PointFromString(c.offset), c = cc.SizeFromString(c.sourceSize), g = cc.SpriteFrame.createWithTexture(b, g, h, k, c);
                        else if (3 == e) {
                            var g = cc.SizeFromString(c.spriteSize),
                                h = cc.PointFromString(c.spriteOffset),
                                k = cc.SizeFromString(c.spriteSourceSize),
                                m = cc.RectFromString(c.textureRect),
                                n = c.textureRotated,
                                p = c.aliases,
                                q = f.toString(),
                                r;
                            for (r in p) {
                                var s = p[r];
                                this._spriteFramesAliases[s] && cc.log("cocos2d: WARNING: an alias with name " + r + " already exists");
                                this._spriteFramesAliases[s] = q
                            }
                            void 0 !== c.spriteSize && (m =
                                cc.rect(m.x, m.y, g.width, g.height));
                            g = cc.SpriteFrame.createWithTexture(b, m, n, h, k)
                        } else var t = c.filename,
                            h = c.frame,
                            g = c.sourceSize,
                            h = cc.rect(h.x, h.y, h.w, h.h),
                            c = c.rotated,
                            k = cc.p(0, 0),
                            g = cc.size(g.w, g.h),
                            g = cc.SpriteFrame.createWithTexture(b, h, c, k, g);
                        cc.renderContextType === cc.CANVAS && g.isRotated() && g.getTexture().isLoaded() && (c = g.getTexture().getHtmlElementObj(), c = cc.cutRotateImageToCanvas(c, g.getRectInPixels()), h = new cc.Texture2D, h.initWithElement(c), h.handleLoadedTexture(), g.setTexture(h), c = g._rect, g.setRect(cc.rect(0,
                            0, c.width, c.height)));
                        this._spriteFrames[null != t ? t : f] = g
                    }
                }
    },
    addSpriteFrames: function(a, b) {
        if (!a) throw "cc.SpriteFrameCache.addSpriteFrames(): plist should be non-null";
        var c = cc.FileUtils.getInstance(),
            d;
        "plist" == a.substr(a.lastIndexOf(".", a.length) + 1, a.length) ? (d = c.fullPathForFilename(a), d = c.dictionaryWithContentsOfFileThreadSafe(d)) : d = JSON.parse(c.getTextFileData(a));
        switch (arguments.length) {
            case 1:
                if (!cc.ArrayContainsObject(this._loadedFileNames, a)) {
                    var e = "",
                        f = d.metadata || d.meta;
                    f && (e = f.textureFileName ||
                        f.image);
                    "" != e ? e = c.fullPathFromRelativeFile(e, a) : (e = a, c = e.lastIndexOf(".", e.length), e = e.substr(0, c), e += ".png");
                    (c = cc.TextureCache.getInstance().addImage(e)) ? (this._addSpriteFramesWithDictionary(d, c), this._loadedFileNames.push(a)) : cc.log("cocos2d: cc.SpriteFrameCache: Couldn't load texture")
                }
                break;
            case 2:
                if (b instanceof cc.Texture2D) - 1 === this._loadedFileNames.indexOf(a) && this._checkConflict(d), this._addSpriteFramesWithDictionary(d, b);
                else {
                    if (!b) throw "cc.SpriteFrameCache.addSpriteFrames(): texture name should not be null";
                    (c = cc.TextureCache.getInstance().addImage(b)) ? (-1 === this._loadedFileNames.indexOf(a) && (this._checkConflict(d), this._loadedFileNames.push(a)), this._addSpriteFramesWithDictionary(d, c)) : cc.log("cocos2d: cc.SpriteFrameCache: couldn't load texture file. File not found " + b)
                }
                break;
            default:
                throw "Argument must be non-nil ";
        }
    },
    _checkConflict: function(a) {
        a = a.frames;
        for (var b in a) this._spriteFrames[b] && cc.log("cocos2d: WARNING: Sprite frame: " + b + " has already been added by another source, please fix name conflit")
    },
    addSpriteFrame: function(a, b) {
        this._spriteFrames[b] = a
    },
    removeSpriteFrames: function() {
        this._spriteFrames = {};
        this._spriteFramesAliases = {};
        this._loadedFileNames.length = 0
    },
    removeSpriteFrameByName: function(a) {
        a && (this._spriteFramesAliases[a] && delete this._spriteFramesAliases[a], this._spriteFrames[a] && delete this._spriteFrames[a], this._loadedFileNames.length = 0)
    },
    removeSpriteFramesFromFile: function(a) {
        var b = cc.FileUtils.getInstance(),
            c = b.fullPathForFilename(a),
            b = b.dictionaryWithContentsOfFileThreadSafe(c);
        this._removeSpriteFramesFromDictionary(b);
        cc.ArrayContainsObject(this._loadedFileNames, a) && cc.ArrayRemoveObject(this._loadedFileNames, a)
    },
    _removeSpriteFramesFromDictionary: function(a) {
        a = a.frames;
        for (var b in a) this._spriteFrames[b] && delete this._spriteFrames[b]
    },
    removeSpriteFramesFromTexture: function(a) {
        for (var b in this._spriteFrames) {
            var c = this._spriteFrames[b];
            c && c.getTexture() == a && delete this._spriteFrames[b]
        }
    },
    getSpriteFrame: function(a) {
        var b;
        this._spriteFrames[a] && (b = this._spriteFrames[a]);
        if (!b) {
            var c;
            this._spriteFramesAliases[a] && (c = this._spriteFramesAliases[a]);
            c && (c = c.toString(), this._spriteFrames[c] && (b = this._spriteFrames[c]), b || cc.log("cocos2d: cc.SpriteFrameCahce: Frame " + a + " not found"))
        }
        return b
    }
});
cc.s_sharedSpriteFrameCache = null;
cc.SpriteFrameCache.getInstance = function() {
    cc.s_sharedSpriteFrameCache || (cc.s_sharedSpriteFrameCache = new cc.SpriteFrameCache);
    return cc.s_sharedSpriteFrameCache
};
cc.SpriteFrameCache.purgeSharedSpriteFrameCache = function() {
    cc.s_sharedSpriteFrameCache = null
};
cc.DEFAULT_SPRITE_BATCH_CAPACITY = 29;
cc.SpriteBatchNode = cc.Node.extend({
    _textureAtlas: null,
    _blendFunc: null,
    _descendants: null,
    addSpriteWithoutQuad: function(a, b, c) {
        if (!a) throw "cc.SpriteBatchNode.addQuadFromSprite(): child should be non-null";
        if (!(a instanceof cc.Sprite)) return cc.log("cc.SpriteBatchNode.addQuadFromSprite(): SpriteBatchNode only supports cc.Sprites as children"), null;
        a.setAtlasIndex(b);
        var d = 0,
            e = this._descendants;
        if (e && 0 < e.length)
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                g && g.getAtlasIndex() >= b && ++d
            }
        this._descendants = cc.ArrayAppendObjectToIndex(e,
            a, d);
        cc.Node.prototype.addChild.call(this, a, b, c);
        this.reorderBatch(!1);
        return this
    },
    getTextureAtlas: function() {
        return this._textureAtlas
    },
    setTextureAtlas: function(a) {
        a != this._textureAtlas && (this._textureAtlas = a)
    },
    getDescendants: function() {
        return this._descendants
    },
    initWithFile: function(a, b) {
        var c = cc.TextureCache.getInstance().textureForKey(a);
        c || (c = cc.TextureCache.getInstance().addImage(a));
        return this.initWithTexture(c, b)
    },
    _setNodeDirtyForCache: function() {
        this._cacheDirty = !0
    },
    init: function(a, b) {
        var c =
            cc.TextureCache.getInstance().textureForKey(a);
        c || (c = cc.TextureCache.getInstance().addImage(a));
        return this.initWithTexture(c, b)
    },
    increaseAtlasCapacity: function() {
        var a = this._textureAtlas.getCapacity(),
            b = Math.floor(4 * (a + 1) / 3);
        cc.log("cocos2d: CCSpriteBatchNode: resizing TextureAtlas capacity from " + a + " to " + b + ".");
        this._textureAtlas.resizeCapacity(b) || cc.log("cocos2d: WARNING: Not enough memory to resize the atlas")
    },
    removeChildAtIndex: function(a, b) {
        this.removeChild(this._children[a], b)
    },
    rebuildIndexInOrder: function(a,
        b) {
        var c = a.getChildren();
        if (c && 0 < c.length)
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                e && 0 > e.getZOrder() && (b = this.rebuildIndexInOrder(e, b))
            }!a == this && (a.setAtlasIndex(b), b++);
        if (c && 0 < c.length)
            for (d = 0; d < c.length; d++)(e = c[d]) && 0 <= e.getZOrder() && (b = this.rebuildIndexInOrder(e, b));
        return b
    },
    highestAtlasIndexInChild: function(a) {
        var b = a.getChildren();
        return b && 0 != b.length ? this.highestAtlasIndexInChild(b[b.length - 1]) : a.getAtlasIndex()
    },
    lowestAtlasIndexInChild: function(a) {
        var b = a.getChildren();
        return b && 0 != b.length ?
            this.lowestAtlasIndexInChild(b[b.length - 1]) : a.getAtlasIndex()
    },
    atlasIndexForChild: function(a, b) {
        var c = a.getParent().getChildren(),
            d = cc.ArrayGetIndexOfObject(c, a),
            e = a.getParent() == this,
            f = null;
        0 < d && d < cc.UINT_MAX && (f = c[d - 1]);
        if (e) return 0 == d ? 0 : this.highestAtlasIndexInChild(f) + 1;
        if (0 == d) return c = a.getParent(), 0 > b ? c.getAtlasIndex() : c.getAtlasIndex() + 1;
        if (0 > f.getZOrder() && 0 > b || 0 <= f.getZOrder() && 0 <= b) return this.highestAtlasIndexInChild(f) + 1;
        c = a.getParent();
        return c.getAtlasIndex() + 1
    },
    reorderBatch: function(a) {
        this._reorderChildDirty =
            a
    },
    setBlendFunc: function(a, b) {
        this._blendFunc = 1 == arguments.length ? a : {
            src: a,
            dst: b
        }
    },
    getBlendFunc: function() {
        return this._blendFunc
    },
    reorderChild: function(a, b) {
        if (!a) throw "cc.SpriteBatchNode.addChild():child should be non-null"; - 1 === this._children.indexOf(a) ? cc.log("cc.SpriteBatchNode.addChild(): Child doesn't belong to Sprite") : b !== a.getZOrder() && (cc.Node.prototype.reorderChild.call(this, a, b), this.setNodeDirty())
    },
    removeChild: function(a, b) {
        null != a && (-1 === this._children.indexOf(a) ? cc.log("cc.SpriteBatchNode.addChild(): sprite batch node should contain the child") :
            (this.removeSpriteFromAtlas(a), cc.Node.prototype.removeChild.call(this, a, b)))
    },
    _mvpMatrix: null,
    _textureForCanvas: null,
    _useCache: !1,
    _originalTexture: null,
    ctor: null,
    _ctorForCanvas: function(a) {
        cc.Node.prototype.ctor.call(this);
        a && this.init(a, cc.DEFAULT_SPRITE_BATCH_CAPACITY)
    },
    _ctorForWebGL: function(a) {
        cc.Node.prototype.ctor.call(this);
        this._mvpMatrix = new cc.kmMat4;
        a && this.init(a, cc.DEFAULT_SPRITE_BATCH_CAPACITY)
    },
    updateQuadFromSprite: null,
    _updateQuadFromSpriteForCanvas: function(a, b) {
        if (!a) throw "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null";
        a instanceof cc.Sprite ? (a.setBatchNode(this), a.setAtlasIndex(b), a.setDirty(!0), a.updateTransform()) : cc.log("cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children")
    },
    _updateQuadFromSpriteForWebGL: function(a, b) {
        if (!a) throw "cc.SpriteBatchNode.updateQuadFromSprite(): sprite should be non-null";
        if (a instanceof cc.Sprite) {
            for (var c = this._textureAtlas.getCapacity(); b >= c || c == this._textureAtlas.getTotalQuads();) this.increaseAtlasCapacity();
            a.setBatchNode(this);
            a.setAtlasIndex(b);
            a.setDirty(!0);
            a.updateTransform()
        } else cc.log("cc.SpriteBatchNode.updateQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children")
    },
    _swap: function(a, b) {
        var c = this._descendants,
            d = this._textureAtlas,
            e = d.getQuads(),
            f = c[a],
            g = cc.V3F_C4B_T2F_QuadCopy(e[a]);
        c[b].setAtlasIndex(a);
        c[a] = c[b];
        d.updateQuad(e[b], a);
        c[b] = f;
        d.updateQuad(g, b)
    },
    insertQuadFromSprite: null,
    _insertQuadFromSpriteForCanvas: function(a, b) {
        if (!a) throw "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null";
        a instanceof cc.Sprite ? (a.setBatchNode(this), a.setAtlasIndex(b), a.setDirty(!0), a.updateTransform(), this._children = cc.ArrayAppendObjectToIndex(this._children, a, b)) : cc.log("cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children")
    },
    _insertQuadFromSpriteForWebGL: function(a, b) {
        if (!a) throw "cc.SpriteBatchNode.insertQuadFromSprite(): sprite should be non-null";
        if (a instanceof cc.Sprite) {
            for (var c = this._textureAtlas; b >= c.getCapacity() || c.getCapacity() === c.getTotalQuads();) this.increaseAtlasCapacity();
            a.setBatchNode(this);
            a.setAtlasIndex(b);
            c.insertQuad(a.getQuad(), b);
            a.setDirty(!0);
            a.updateTransform()
        } else cc.log("cc.SpriteBatchNode.insertQuadFromSprite(): cc.SpriteBatchNode only supports cc.Sprites as children")
    },
    _updateAtlasIndex: function(a, b) {
        var c = 0,
            d = a.getChildren();
        d && (c = d.length);
        var e = 0;
        if (0 === c) e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0), e != b && this._swap(e, b), b++;
        else {
            e = !0;
            0 <= d[0].getZOrder() && (e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0), e != b && this._swap(e,
                b), b++, e = !1);
            for (c = 0; c < d.length; c++) {
                var f = d[c];
                e && 0 <= f.getZOrder() && (e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0), e != b && this._swap(e, b), b++, e = !1);
                b = this._updateAtlasIndex(f, b)
            }
            e && (e = a.getAtlasIndex(), a.setAtlasIndex(b), a.setOrderOfArrival(0), e != b && this._swap(e, b), b++)
        }
        return b
    },
    _updateBlendFunc: function() {
        this._textureAtlas.getTexture().hasPremultipliedAlpha() || (this._blendFunc.src = gl.SRC_ALPHA, this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA)
    },
    initWithTexture: null,
    _initWithTextureForCanvas: function(a,
        b) {
        this._children = [];
        this._descendants = [];
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
        this._textureForCanvas = this._originalTexture = a;
        return !0
    },
    _initWithTextureForWebGL: function(a, b) {
        this._children = [];
        this._descendants = [];
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
        b = b || cc.DEFAULT_SPRITE_BATCH_CAPACITY;
        this._textureAtlas = new cc.TextureAtlas;
        this._textureAtlas.initWithTexture(a, b);
        this._updateBlendFunc();
        this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURECOLOR));
        return !0
    },
    insertChild: function(a, b) {
        a.setBatchNode(this);
        a.setAtlasIndex(b);
        a.setDirty(!0);
        var c = this._textureAtlas;
        c.getTotalQuads() >= c.getCapacity() && this.increaseAtlasCapacity();
        c.insertQuad(a.getQuad(), b);
        this._descendants = cc.ArrayAppendObjectToIndex(this._descendants, a, b);
        var c = b + 1,
            d = this._descendants;
        if (d && 0 < d.length)
            for (; c < d.length; c++) d[c].setAtlasIndex(d[c].getAtlasIndex() + 1);
        if ((d = a.getChildren()) && 0 < d.length)
            for (c = 0; c < d.length; c++)
                if (d[c]) {
                    var e = this.atlasIndexForChild(d[c], d[c].getZOrder());
                    this.insertChild(d[c], e)
                }
    },
    appendChild: null,
    _appendChildForCanvas: function(a) {
        this._reorderChildDirty = !0;
        a.setBatchNode(this);
        a.setDirty(!0);
        this._descendants.push(a);
        a.setAtlasIndex(this._descendants.length - 1);
        a = a.getChildren();
        for (var b = 0; b < a.length; b++) this.appendChild(a[b])
    },
    _appendChildForWebGL: function(a) {
        this._reorderChildDirty = !0;
        a.setBatchNode(this);
        a.setDirty(!0);
        this._descendants.push(a);
        var b = this._descendants.length - 1;
        a.setAtlasIndex(b);
        var c = this._textureAtlas;
        c.getTotalQuads() == c.getCapacity() &&
            this.increaseAtlasCapacity();
        c.insertQuad(a.getQuad(), b);
        a = a.getChildren();
        for (b = 0; b < a.length; b++) this.appendChild(a[b])
    },
    removeSpriteFromAtlas: null,
    _removeSpriteFromAtlasForCanvas: function(a) {
        a.setBatchNode(null);
        var b = this._descendants,
            c = cc.ArrayGetIndexOfObject(b, a);
        if (-1 != c) {
            cc.ArrayRemoveObjectAtIndex(b, c);
            for (var d = b.length; c < d; ++c) {
                var e = b[c];
                e.setAtlasIndex(e.getAtlasIndex() - 1)
            }
        }
        if ((a = a.getChildren()) && 0 < a.length)
            for (b = 0; b < a.length; b++) a[b] && this.removeSpriteFromAtlas(a[b])
    },
    _removeSpriteFromAtlasForWebGL: function(a) {
        this._textureAtlas.removeQuadAtIndex(a.getAtlasIndex());
        a.setBatchNode(null);
        var b = this._descendants,
            c = cc.ArrayGetIndexOfObject(b, a);
        if (-1 != c) {
            cc.ArrayRemoveObjectAtIndex(b, c);
            for (var d = b.length; c < d; ++c) {
                var e = b[c];
                e.setAtlasIndex(e.getAtlasIndex() - 1)
            }
        }
        if ((a = a.getChildren()) && 0 < a.length)
            for (b = 0; b < a.length; b++) a[b] && this.removeSpriteFromAtlas(a[b])
    },
    getTexture: null,
    _getTextureForCanvas: function() {
        return this._textureForCanvas
    },
    _getTextureForWebGL: function() {
        return this._textureAtlas.getTexture()
    },
    setTexture: null,
    _setTextureForCanvas: function(a) {
        this._textureForCanvas =
            a;
        for (var b = this._children, c = 0; c < b.length; c++) b[c].setTexture(a)
    },
    _setTextureForWebGL: function(a) {
        this._textureAtlas.setTexture(a);
        this._updateBlendFunc()
    },
    visit: null,
    _visitForCanvas: function(a) {
        var b = a || cc.renderContext;
        if (this._visible) {
            b.save();
            this.transform(a);
            var c = this._children;
            if (c)
                for (this.sortAllChildren(), a = 0; a < c.length; a++) c[a] && c[a].visit(b);
            b.restore()
        }
    },
    _visitForWebGL: function(a) {
        a = a || cc.renderContext;
        if (this._visible) {
            cc.kmGLPushMatrix();
            var b = this._grid;
            b && b.isActive() && (b.beforeDraw(),
                this.transformAncestors());
            this.sortAllChildren();
            this.transform(a);
            this.draw(a);
            b && b.isActive() && b.afterDraw(this);
            cc.kmGLPopMatrix();
            this.setOrderOfArrival(0)
        }
    },
    addChild: null,
    _addChildForCanvas: function(a, b, c) {
        if (null == a) throw "cc.SpriteBatchNode.addChild(): child should be non-null";
        a instanceof cc.Sprite ? (b = null == b ? a.getZOrder() : b, c = null == c ? a.getTag() : c, cc.Node.prototype.addChild.call(this, a, b, c), this.appendChild(a), this.setNodeDirty()) : cc.log("cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children")
    },
    _addChildForWebGL: function(a, b, c) {
        if (null == a) throw "cc.SpriteBatchNode.addChild(): child should be non-null";
        a instanceof cc.Sprite ? a.getTexture() != this._textureAtlas.getTexture() ? cc.log("cc.SpriteBatchNode.addChild(): cc.Sprite is not using the same texture") : (b = null == b ? a.getZOrder() : b, c = null == c ? a.getTag() : c, cc.Node.prototype.addChild.call(this, a, b, c), this.appendChild(a), this.setNodeDirty()) : cc.log("cc.SpriteBatchNode.addChild(): cc.SpriteBatchNode only supports cc.Sprites as children")
    },
    removeAllChildren: null,
    _removeAllChildrenForCanvas: function(a) {
        var b = this._descendants;
        if (b && 0 < b.length)
            for (var c = 0, d = b.length; c < d; c++) b[c] && b[c].setBatchNode(null);
        cc.Node.prototype.removeAllChildren.call(this, a);
        this._descendants.length = 0
    },
    _removeAllChildrenForWebGL: function(a) {
        var b = this._descendants;
        if (b && 0 < b.length)
            for (var c = 0, d = b.length; c < d; c++) b[c] && b[c].setBatchNode(null);
        cc.Node.prototype.removeAllChildren.call(this, a);
        this._descendants.length = 0;
        this._textureAtlas.removeAllQuads()
    },
    sortAllChildren: null,
    _sortAllChildrenForCanvas: function() {
        if (this._reorderChildDirty) {
            var a,
                b = 0,
                c = this._children,
                d = c.length,
                e;
            for (a = 1; a < d; a++) {
                var f = c[a],
                    b = a - 1;
                for (e = c[b]; 0 <= b && (f._zOrder < e._zOrder || f._zOrder == e._zOrder && f._orderOfArrival < e._orderOfArrival);) c[b + 1] = e, b -= 1, e = c[b];
                c[b + 1] = f
            }
            0 < c.length && this._arrayMakeObjectsPerformSelector(c, cc.Node.StateCallbackType.sortAllChildren);
            this._reorderChildDirty = !1
        }
    },
    _sortAllChildrenForWebGL: function() {
        if (this._reorderChildDirty) {
            var a = this._children,
                b, c = 0,
                d = a.length,
                e;
            for (b = 1; b < d; b++) {
                var f = a[b],
                    c = b - 1;
                for (e = a[c]; 0 <= c && (f._zOrder < e._zOrder || f._zOrder ==
                    e._zOrder && f._orderOfArrival < e._orderOfArrival);) a[c + 1] = e, c -= 1, e = a[c];
                a[c + 1] = f
            }
            if (0 < a.length)
                for (this._arrayMakeObjectsPerformSelector(a, cc.Node.StateCallbackType.sortAllChildren), b = c = 0; b < a.length; b++) c = this._updateAtlasIndex(a[b], c);
            this._reorderChildDirty = !1
        }
    },
    draw: null,
    _drawForWebGL: function() {
        0 !== this._textureAtlas.getTotalQuads() && (this._shaderProgram.use(), this._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4(), this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.updateTransform),
            cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst), this._textureAtlas.drawQuads())
    }
});
cc.Browser.supportWebGL ? (cc.SpriteBatchNode.prototype.ctor = cc.SpriteBatchNode.prototype._ctorForWebGL, cc.SpriteBatchNode.prototype.updateQuadFromSprite = cc.SpriteBatchNode.prototype._updateQuadFromSpriteForWebGL, cc.SpriteBatchNode.prototype.insertQuadFromSprite = cc.SpriteBatchNode.prototype._insertQuadFromSpriteForWebGL, cc.SpriteBatchNode.prototype.initWithTexture = cc.SpriteBatchNode.prototype._initWithTextureForWebGL, cc.SpriteBatchNode.prototype.appendChild = cc.SpriteBatchNode.prototype._appendChildForWebGL,
    cc.SpriteBatchNode.prototype.removeSpriteFromAtlas = cc.SpriteBatchNode.prototype._removeSpriteFromAtlasForWebGL, cc.SpriteBatchNode.prototype.getTexture = cc.SpriteBatchNode.prototype._getTextureForWebGL, cc.SpriteBatchNode.prototype.setTexture = cc.SpriteBatchNode.prototype._setTextureForWebGL, cc.SpriteBatchNode.prototype.visit = cc.SpriteBatchNode.prototype._visitForWebGL, cc.SpriteBatchNode.prototype.addChild = cc.SpriteBatchNode.prototype._addChildForWebGL, cc.SpriteBatchNode.prototype.removeAllChildren = cc.SpriteBatchNode.prototype._removeAllChildrenForWebGL,
    cc.SpriteBatchNode.prototype.sortAllChildren = cc.SpriteBatchNode.prototype._sortAllChildrenForWebGL, cc.SpriteBatchNode.prototype.draw = cc.SpriteBatchNode.prototype._drawForWebGL) : (cc.SpriteBatchNode.prototype.ctor = cc.SpriteBatchNode.prototype._ctorForCanvas, cc.SpriteBatchNode.prototype.updateQuadFromSprite = cc.SpriteBatchNode.prototype._updateQuadFromSpriteForCanvas, cc.SpriteBatchNode.prototype.insertQuadFromSprite = cc.SpriteBatchNode.prototype._insertQuadFromSpriteForCanvas, cc.SpriteBatchNode.prototype.initWithTexture =
    cc.SpriteBatchNode.prototype._initWithTextureForCanvas, cc.SpriteBatchNode.prototype.appendChild = cc.SpriteBatchNode.prototype._appendChildForCanvas, cc.SpriteBatchNode.prototype.removeSpriteFromAtlas = cc.SpriteBatchNode.prototype._removeSpriteFromAtlasForCanvas, cc.SpriteBatchNode.prototype.getTexture = cc.SpriteBatchNode.prototype._getTextureForCanvas, cc.SpriteBatchNode.prototype.setTexture = cc.SpriteBatchNode.prototype._setTextureForCanvas, cc.SpriteBatchNode.prototype.visit = cc.SpriteBatchNode.prototype._visitForCanvas,
    cc.SpriteBatchNode.prototype.removeAllChildren = cc.SpriteBatchNode.prototype._removeAllChildrenForCanvas, cc.SpriteBatchNode.prototype.addChild = cc.SpriteBatchNode.prototype._addChildForCanvas, cc.SpriteBatchNode.prototype.sortAllChildren = cc.SpriteBatchNode.prototype._sortAllChildrenForCanvas, cc.SpriteBatchNode.prototype.draw = cc.Node.prototype.draw);
cc.SpriteBatchNode.create = function(a, b) {
    b = b || cc.DEFAULT_SPRITE_BATCH_CAPACITY;
    var c = new cc.SpriteBatchNode;
    c.init(a, b);
    return c
};
cc.SpriteBatchNode.createWithTexture = function(a, b) {
    b = b || cc.DEFAULT_SPRITE_BATCH_CAPACITY;
    var c = new cc.SpriteBatchNode;
    c.initWithTexture(a, b);
    return c
};
cc.ConfigurationType = {
    ConfigurationError: 0,
    ConfigurationString: 1,
    ConfigurationInt: 2,
    ConfigurationDouble: 3,
    ConfigurationBoolean: 4
};
cc.Configuration = cc.Class.extend({
    _maxTextureSize: 0,
    _maxModelviewStackDepth: 0,
    _supportsPVRTC: !1,
    _supportsNPOT: !1,
    _supportsBGRA8888: !1,
    _supportsDiscardFramebuffer: !1,
    _supportsShareableVAO: !1,
    _maxSamplesAllowed: 0,
    _maxTextureUnits: 0,
    _GlExtensions: "",
    _valueDict: null,
    ctor: function() {
        this._maxModelviewStackDepth = this._maxTextureSize = 0;
        this._supportsShareableVAO = this._supportsDiscardFramebuffer = this._supportsBGRA8888 = this._supportsNPOT = this._supportsPVRTC = !1;
        this._maxTextureUnits = this._maxSamplesAllowed =
            0;
        this._GlExtensions = "";
        this._valueDict = {}
    },
    getMaxTextureSize: function() {
        return this._maxTextureSize
    },
    getMaxModelviewStackDepth: function() {
        return this._maxModelviewStackDepth
    },
    getMaxTextureUnits: function() {
        return this._maxTextureUnits
    },
    supportsNPOT: function() {
        return this._supportsNPOT
    },
    supportsPVRTC: function() {
        return this._supportsPVRTC
    },
    supportsBGRA8888: function() {
        return this._supportsBGRA8888
    },
    supportsDiscardFramebuffer: function() {
        return this._supportsDiscardFramebuffer
    },
    supportsShareableVAO: function() {
        return this._supportsShareableVAO
    },
    checkForGLExtension: function(a) {
        return -1 < this._GlExtensions.indexOf(a)
    },
    init: function() {
        var a = this._valueDict;
        a["cocos2d.x.version"] = cc.ENGINE_VERSION;
        a["cocos2d.x.compiled_with_profiler"] = !1;
        a["cocos2d.x.compiled_with_gl_state_cache"] = cc.ENABLE_GL_STATE_CACHE;
        return !0
    },
    getCString: function(a, b) {
        var c = this._valueDict;
        return c[a] ? c[a] : b
    },
    getBool: function(a, b) {
        null == b && (b = !1);
        var c = this._valueDict;
        return c[a] ? c[a] : b
    },
    getNumber: function(a, b) {
        null == b && (b = 0);
        var c = this._valueDict;
        return c[a] ? c[a] : b
    },
    getObject: function(a) {
        var b =
            this._valueDict;
        return b[a] ? b[a] : null
    },
    setObject: function(a, b) {
        this._valueDict[a] = b
    },
    dumpInfo: function() {
        0 === cc.ENABLE_GL_STATE_CACHE && (cc.log(""), cc.log("cocos2d: **** WARNING **** CC_ENABLE_PROFILERS is defined. Disable it when you finish profiling (from ccConfig.js)"), cc.log(""))
    },
    gatherGPUInfo: function() {
        if (cc.renderContextType !== cc.CANVAS) {
            var a = cc.renderContext,
                b = this._valueDict;
            b["gl.vendor"] = a.getParameter(a.VENDOR);
            b["gl.renderer"] = a.getParameter(a.RENDERER);
            b["gl.version"] = a.getParameter(a.VERSION);
            this._GlExtensions = "";
            for (var c = a.getSupportedExtensions(), d = 0; d < c.length; d++) this._GlExtensions += c[d] + " ";
            this._maxTextureSize = a.getParameter(a.MAX_TEXTURE_SIZE);
            b["gl.max_texture_size"] = this._maxTextureSize;
            this._maxTextureUnits = a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
            b["gl.max_texture_units"] = this._maxTextureUnits;
            this._supportsPVRTC = this.checkForGLExtension("GL_IMG_texture_compression_pvrtc");
            b["gl.supports_PVRTC"] = this._supportsPVRTC;
            this._supportsNPOT = !1;
            b["gl.supports_NPOT"] = this._supportsNPOT;
            this._supportsBGRA8888 = this.checkForGLExtension("GL_IMG_texture_format_BGRA888");
            b["gl.supports_BGRA8888"] = this._supportsBGRA8888;
            this._supportsDiscardFramebuffer = this.checkForGLExtension("GL_EXT_discard_framebuffer");
            b["gl.supports_discard_framebuffer"] = this._supportsDiscardFramebuffer;
            this._supportsShareableVAO = this.checkForGLExtension("vertex_array_object");
            b["gl.supports_vertex_array_object"] = this._supportsShareableVAO;
            cc.CHECK_GL_ERROR_DEBUG()
        }
    },
    loadConfigFile: function(a) {
        var b = cc.FileUtils.getInstance(),
            c = b.fullPathForFilename(a),
            b = b.dictionaryWithContentsOfFileThreadSafe(c);
        if (null != b)
            if (b = b.data)
                for (var d in b) this._valueDict[d] = b[d];
            else cc.log("Expected 'data' dict, but not found. Config file: " + a)
    }
});
cc.Configuration._sharedConfiguration = null;
cc.Configuration.getInstance = function() {
    cc.Configuration._sharedConfiguration || (cc.Configuration._sharedConfiguration = new cc.Configuration, cc.Configuration._sharedConfiguration.init());
    return cc.Configuration._sharedConfiguration
};
cc.Configuration.purgeConfiguration = function() {
    cc.Configuration._sharedConfiguration = null
};
cc.g_NumberOfDraws = 0;
cc.DIRECTOR_PROJECTION_2D = 0;
cc.DIRECTOR_PROJECTION_3D = 1;
cc.DIRECTOR_PROJECTION_CUSTOM = 3;
cc.DIRECTOR_PROJECTION_DEFAULT = cc.DIRECTOR_PROJECTION_3D;
cc.DEVICE_ORIENTATION_PORTRAIT = 0;
cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT = 1;
cc.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN = 2;
cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT = 3;
cc.DEVICE_MAX_ORIENTATIONS = 2;
cc.DirectorDelegate = cc.Class.extend({
    updateProjection: function() {}
});
cc.GLToClipTransform = function(a) {
    var b = new cc.kmMat4;
    cc.kmGLGetMatrix(cc.KM_GL_PROJECTION, b);
    var c = new cc.kmMat4;
    cc.kmGLGetMatrix(cc.KM_GL_MODELVIEW, c);
    cc.kmMat4Multiply(a, b, c)
};
cc.Director = cc.Class.extend({
    _landscape: !1,
    _nextDeltaTimeZero: !1,
    _paused: !1,
    _purgeDirecotorInNextLoop: !1,
    _sendCleanupToScene: !1,
    _animationInterval: 0,
    _oldAnimationInterval: 0,
    _projection: 0,
    _accumDt: 0,
    _contentScaleFactor: 1,
    _displayStats: !1,
    _deltaTime: 0,
    _frameRate: 0,
    _FPSLabel: null,
    _SPFLabel: null,
    _drawsLabel: null,
    _winSizeInPoints: null,
    _lastUpdate: null,
    _nextScene: null,
    _notificationNode: null,
    _openGLView: null,
    _scenesStack: null,
    _projectionDelegate: null,
    _runningScene: null,
    _frames: 0,
    _totalFrames: 0,
    _secondsPerFrame: 0,
    _dirtyRegion: null,
    _scheduler: null,
    _actionManager: null,
    _touchDispatcher: null,
    _keyboardDispatcher: null,
    _accelerometer: null,
    _mouseDispatcher: null,
    _isBlur: !1,
    ctor: function() {
        this._lastUpdate = Date.now();
        if (!cc.isAddedHiddenEvent) {
            var a = this;
            window.addEventListener("focus", function() {
                a._lastUpdate = Date.now()
            }, !1)
        }
    },
    _resetLastUpdate: function() {
        this._lastUpdate = Date.now()
    },
    init: function() {
        this._oldAnimationInterval = this._animationInterval = 1 / cc.defaultFPS;
        this._scenesStack = [];
        this._projection = cc.DIRECTOR_PROJECTION_DEFAULT;
        this._projectionDelegate = null;
        this._frameRate = this._accumDt = 0;
        this._displayStats = !1;
        this._totalFrames = this._frames = 0;
        this._lastUpdate = Date.now();
        this._purgeDirecotorInNextLoop = this._paused = !1;
        this._winSizeInPoints = cc._sizeConst(0, 0);
        this._openGLView = null;
        this._contentScaleFactor = 1;
        this._scheduler = new cc.Scheduler;
        this._actionManager = new cc.ActionManager;
        this._scheduler.scheduleUpdateForTarget(this._actionManager, cc.PRIORITY_SYSTEM, !1);
        cc.TouchDispatcher && (this._touchDispatcher = new cc.TouchDispatcher,
            this._touchDispatcher.init());
        cc.KeyboardDispatcher && (this._keyboardDispatcher = cc.KeyboardDispatcher.getInstance());
        cc.Accelerometer && (this._accelerometer = new cc.Accelerometer);
        cc.MouseDispatcher && (this._mouseDispatcher = new cc.MouseDispatcher, this._mouseDispatcher.init());
        return !0
    },
    calculateDeltaTime: function() {
        var a = Date.now();
        this._nextDeltaTimeZero ? (this._deltaTime = 0, this._nextDeltaTimeZero = !1) : this._deltaTime = (a - this._lastUpdate) / 1E3;
        0 < cc.COCOS2D_DEBUG && 0.2 < this._deltaTime && (this._deltaTime = 1 /
            60);
        this._lastUpdate = a
    },
    convertToGL: function(a) {
        var b = new cc.kmMat4;
        cc.GLToClipTransform(b);
        var c = new cc.kmMat4;
        cc.kmMat4Inverse(c, b);
        var b = b.mat[14] / b.mat[15],
            d = this._openGLView.getDesignResolutionSize();
        a = new cc.kmVec3(2 * a.x / d.width - 1, 1 - 2 * a.y / d.height, b);
        b = new cc.kmVec3;
        cc.kmVec3TransformCoord(b, a, c);
        return cc.p(b.x, b.y)
    },
    convertToUI: function(a) {
        var b = new cc.kmMat4;
        cc.GLToClipTransform(b);
        var c = new cc.kmVec3;
        a = new cc.kmVec3(a.x, a.y, 0);
        cc.kmVec3TransformCoord(c, a, b);
        b = this._openGLView.getDesignResolutionSize();
        return cc.p(b.width * (0.5 * c.x + 0.5), b.height * (0.5 * -c.y + 0.5))
    },
    drawScene: function() {
        this.calculateDeltaTime();
        this._paused || this._scheduler.update(this._deltaTime);
        this._clear();
        this._nextScene && this.setNextScene();
        this._beforeVisitScene && this._beforeVisitScene();
        this._runningScene && this._runningScene.visit();
        this._notificationNode && this._notificationNode.visit();
        this._displayStats && this._showStats();
        this._afterVisitScene && this._afterVisitScene();
        this._totalFrames++;
        this._displayStats && this._calculateMPF()
    },
    _clearCanvas: function() {
        var a = this._openGLView.getViewPortRect();
        cc.renderContext.clearRect(-a.x, a.y, a.width, -a.height)
    },
    _clearWebGL: function() {
        var a = cc.renderContext;
        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
    },
    _beforeVisitScene: null,
    _afterVisitScene: null,
    _beforeVisitSceneWebGL: function() {
        cc.kmGLPushMatrix()
    },
    _afterVisitSceneWebGL: function() {
        cc.kmGLPopMatrix()
    },
    end: function() {
        this._purgeDirecotorInNextLoop = !0
    },
    getContentScaleFactor: function() {
        return this._contentScaleFactor
    },
    getNotificationNode: function() {
        return this._notificationNode
    },
    getWinSize: function() {
        return this._winSizeInPoints
    },
    getWinSizeInPixels: function() {
        return cc.size(this._winSizeInPoints.width * this._contentScaleFactor, this._winSizeInPoints.height * this._contentScaleFactor)
    },
    getVisibleSize: function() {
        return this._openGLView ? this._openGLView.getVisibleSize() : this.getWinSize()
    },
    getVisibleOrigin: function() {
        return this._openGLView ? this._openGLView.getVisibleOrigin() : cc.POINT_ZERO
    },
    getZEye: function() {
        return this._winSizeInPoints.height / 1.1566
    },
    pause: function() {
        this._paused ||
            (this._oldAnimationInterval = this._animationInterval, this.setAnimationInterval(0.25), this._paused = !0)
    },
    popScene: function() {
        if (!this._runningScene) throw "running scene should not null";
        this._scenesStack.pop();
        var a = this._scenesStack.length;
        0 == a ? this.end() : (this._sendCleanupToScene = !0, this._nextScene = this._scenesStack[a - 1])
    },
    purgeCachedData: function() {
        cc.LabelBMFont.purgeCachedData()
    },
    purgeDirector: function() {
        this.getScheduler().unscheduleAllCallbacks();
        this._touchDispatcher && this._touchDispatcher.removeAllDelegates();
        this._runningScene && (this._runningScene.onExitTransitionDidStart(), this._runningScene.onExit(), this._runningScene.cleanup());
        this._nextScene = this._runningScene = null;
        this._scenesStack.length = 0;
        this.stopAnimation();
        cc.LabelBMFont.purgeCachedData();
        cc.AnimationCache.purgeSharedAnimationCache();
        cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        cc.TextureCache.purgeSharedTextureCache();
        cc.CHECK_GL_ERROR_DEBUG()
    },
    pushScene: function(a) {
        if (!a) throw "the scene should not null";
        this._sendCleanupToScene = !1;
        this._scenesStack.push(a);
        this._nextScene = a
    },
    replaceScene: function(a) {
        if (!this._runningScene) throw "Use runWithScene: instead to start the director";
        if (!a) throw "the scene should not be null";
        var b = this._scenesStack.length;
        0 === b ? (this._sendCleanupToScene = !0, this._scenesStack[b] = a) : (this._sendCleanupToScene = !0, this._scenesStack[b - 1] = a);
        this._nextScene = a
    },
    resume: function() {
        this._paused && (this.setAnimationInterval(this._oldAnimationInterval), (this._lastUpdate = Date.now()) || cc.log("cocos2d: Director: Error in gettimeofday"), this._paused = !1, this._deltaTime = 0)
    },
    runWithScene: function(a) {
        if (!a) throw "This command can only be used to start the CCDirector. There is already a scene present.";
        if (this._runningScene) throw "_runningScene should be null";
        this.pushScene(a);
        this.startAnimation()
    },
    setAlphaBlending: function(a) {
        a ? cc.glBlendFunc(cc.BLEND_SRC, cc.BLEND_DST) : cc.glBlendFunc(cc.renderContext.ONE, cc.renderContext.ZERO)
    },
    setContentScaleFactor: function(a) {
        a != this._contentScaleFactor && (this._contentScaleFactor = a, this._createStatsLabel())
    },
    setDepthTest: function(a) {
        if (cc.renderContextType !==
            cc.CANVAS) {
            var b = cc.renderContext;
            a ? (b.clearDepth(1), b.enable(b.DEPTH_TEST), b.depthFunc(b.LEQUAL)) : b.disable(b.DEPTH_TEST)
        }
    },
    setDefaultValues: function() {},
    setGLDefaultValues: function() {
        this.setAlphaBlending(!0);
        this.setDepthTest(!1);
        this.setProjection(this._projection);
        cc.renderContext.clearColor(0, 0, 0, 1)
    },
    setNextDeltaTimeZero: function(a) {
        this._nextDeltaTimeZero = a
    },
    setNextScene: function() {
        var a = !1,
            b = !1;
        cc.TransitionScene && (a = this._runningScene ? this._runningScene instanceof cc.TransitionScene : !1, b =
            this._nextScene ? this._nextScene instanceof cc.TransitionScene : !1);
        if (!b) {
            if (b = this._runningScene) b.onExitTransitionDidStart(), b.onExit();
            this._sendCleanupToScene && b && b.cleanup()
        }
        this._runningScene = this._nextScene;
        this._nextScene = null;
        a || null == this._runningScene || (this._runningScene.onEnter(), this._runningScene.onEnterTransitionDidFinish())
    },
    setNotificationNode: function(a) {
        this._notificationNode = a
    },
    getDelegate: function() {
        return this._projectionDelegate
    },
    setDelegate: function(a) {
        this._projectionDelegate =
            a
    },
    setOpenGLView: function(a) {
        this._winSizeInPoints.setWidth(cc.canvas.width);
        this._winSizeInPoints.setHeight(cc.canvas.height);
        this._openGLView = a || cc.EGLView.getInstance();
        cc.renderContextType !== cc.CANVAS && (a = cc.Configuration.getInstance(), a.gatherGPUInfo(), a.dumpInfo(), this._createStatsLabel(), this.setGLDefaultValues(), this._touchDispatcher && this._touchDispatcher.setDispatchEvents(!0))
    },
    setViewport: function() {
        if (this._openGLView) {
            var a = this._winSizeInPoints;
            this._openGLView.setViewPortInPoints(0,
                0, a.width, a.height)
        }
    },
    setProjection: function(a) {
        var b = this._winSizeInPoints;
        if (cc.renderContextType === cc.WEBGL) {
            this.setViewport();
            switch (a) {
                case cc.DIRECTOR_PROJECTION_2D:
                    cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
                    cc.kmGLLoadIdentity();
                    var c = new cc.kmMat4;
                    cc.kmMat4OrthographicProjection(c, 0, b.width, 0, b.height, -1024, 1024);
                    cc.kmGLMultMatrix(c);
                    cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
                    cc.kmGLLoadIdentity();
                    break;
                case cc.DIRECTOR_PROJECTION_3D:
                    var d = this.getZEye(),
                        e = new cc.kmMat4,
                        c = new cc.kmMat4;
                    cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
                    cc.kmGLLoadIdentity();
                    cc.kmMat4PerspectiveProjection(e, 60, b.width / b.height, 0.1, 2 * d);
                    cc.kmGLMultMatrix(e);
                    cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
                    cc.kmGLLoadIdentity();
                    d = cc.kmVec3Fill(null, b.width / 2, b.height / 2, d);
                    b = cc.kmVec3Fill(null, b.width / 2, b.height / 2, 0);
                    e = cc.kmVec3Fill(null, 0, 1, 0);
                    cc.kmMat4LookAt(c, d, b, e);
                    cc.kmGLMultMatrix(c);
                    break;
                case cc.DIRECTOR_PROJECTION_CUSTOM:
                    this._projectionDelegate && this._projectionDelegate.updateProjection();
                    break;
                default:
                    cc.log("cocos2d: Director: unrecognized projection")
            }
            this._projection =
                a;
            cc.setProjectionMatrixDirty()
        } else this._projection = a
    },
    _showStats: function() {
        this._frames++;
        this._accumDt += this._deltaTime;
        this._FPSLabel && this._SPFLabel && this._drawsLabel ? (this._accumDt > cc.DIRECTOR_FPS_INTERVAL && (this._SPFLabel.setString(this._secondsPerFrame.toFixed(3)), this._frameRate = this._frames / this._accumDt, this._accumDt = this._frames = 0, this._FPSLabel.setString(this._frameRate.toFixed(1)), this._drawsLabel.setString((0 | cc.g_NumberOfDraws).toString())), this._FPSLabel.visit(), this._SPFLabel.visit(),
            this._drawsLabel.visit()) : this._createStatsLabel();
        cc.g_NumberOfDraws = 0
    },
    isSendCleanupToScene: function() {
        return this._sendCleanupToScene
    },
    getRunningScene: function() {
        return this._runningScene
    },
    getAnimationInterval: function() {
        return this._animationInterval
    },
    isDisplayStats: function() {
        return this._displayStats
    },
    setDisplayStats: function(a) {
        this._displayStats = a
    },
    getSecondsPerFrame: function() {
        return this._secondsPerFrame
    },
    getOpenGLView: function() {
        return this._openGLView
    },
    isNextDeltaTimeZero: function() {
        return this._nextDeltaTimeZero
    },
    isPaused: function() {
        return this._paused
    },
    getTotalFrames: function() {
        return this._totalFrames
    },
    getProjection: function() {
        return this._projection
    },
    popToRootScene: function() {
        this.popToSceneStackLevel(1)
    },
    popToSceneStackLevel: function(a) {
        if (!this._runningScene) throw "A running Scene is needed";
        var b = this._scenesStack,
            c = b.length;
        if (0 == c) this.end();
        else if (!(a > c)) {
            for (; c > a;) {
                var d = b.pop();
                d.isRunning() && (d.onExitTransitionDidStart(), d.onExit());
                d.cleanup();
                c--
            }
            this._nextScene = b[b.length - 1];
            this._sendCleanupToScene = !1
        }
    },
    getScheduler: function() {
        return this._scheduler
    },
    setScheduler: function(a) {
        this._scheduler != a && (this._scheduler = a)
    },
    getActionManager: function() {
        return this._actionManager
    },
    setActionManager: function(a) {
        this._actionManager != a && (this._actionManager = a)
    },
    getTouchDispatcher: function() {
        return this._touchDispatcher
    },
    setTouchDispatcher: function(a) {
        this._touchDispatcher != a && (this._touchDispatcher = a)
    },
    getKeyboardDispatcher: function() {
        if (!cc.KeyboardDispatcher) throw "cc.KeyboardDispatcher is undefined, maybe it has been removed from js loading list.";
        return this._keyboardDispatcher
    },
    setKeyboardDispatcher: function(a) {
        if (!cc.KeyboardDispatcher) throw "cc.KeyboardDispatcher is undefined, maybe it has been removed from js loading list.";
        this._keyboardDispatcher = a
    },
    getAccelerometer: function() {
        if (!cc.Accelerometer) throw "cc.Accelerometer is undefined, maybe it has been removed from js loading list.";
        return this._accelerometer
    },
    setAccelerometer: function(a) {
        if (!cc.Accelerometer) throw "cc.Accelerometer is undefined, maybe it has been removed from js loading list.";
        this._accelerometer != a && (this._accelerometer = a)
    },
    getDeltaTime: function() {
        return this._deltaTime
    },
    getMouseDispatcher: function() {
        if (!cc.MouseDispatcher) throw "cc.MouseDispatcher is undefined, maybe it has been removed from js loading list.";
        return this._mouseDispatcher
    },
    setMouseDispatcher: function(a) {
        if (!cc.MouseDispatcher) throw "cc.MouseDispatcher is undefined, maybe it has been removed from js loading list.";
        this._mouseDispatcher != a && (this._mouseDispatcher = a)
    },
    _createStatsLabel: null,
    _createStatsLabelForWebGL: function() {
        if (!cc.LabelAtlas) return this._createStatsLabelForCanvas();
        if (null != cc.Director._fpsImageLoaded && !1 != cc.Director._fpsImageLoaded) {
            var a = new cc.Texture2D;
            a.initWithElement(cc.Director._fpsImage);
            a.handleLoadedTexture();
            var b = cc.EGLView.getInstance().getDesignResolutionSize().height / 320;
            0 === b && (b = this._winSizeInPoints.height / 320);
            var c = new cc.LabelAtlas;
            c._setIgnoreContentScaleFactor(!0);
            c.initWithString("00.0", a, 12, 32, ".");
            c.setScale(b);
            this._FPSLabel = c;
            c = new cc.LabelAtlas;
            c._setIgnoreContentScaleFactor(!0);
            c.initWithString("0.000", a, 12, 32, ".");
            c.setScale(b);
            this._SPFLabel = c;
            c = new cc.LabelAtlas;
            c._setIgnoreContentScaleFactor(!0);
            c.initWithString("000", a, 12, 32, ".");
            c.setScale(b);
            this._drawsLabel = c;
            a = cc.DIRECTOR_STATS_POSITION;
            this._drawsLabel.setPosition(cc.pAdd(cc.p(0, 34 * b), a));
            this._SPFLabel.setPosition(cc.pAdd(cc.p(0, 17 * b), a));
            this._FPSLabel.setPosition(a)
        }
    },
    _createStatsLabelForCanvas: function() {
        var a = 0,
            a = this._winSizeInPoints.width > this._winSizeInPoints.height ? 0 | this._winSizeInPoints.height / 320 * 24 : 0 | this._winSizeInPoints.width / 320 * 24;
        this._FPSLabel =
            cc.LabelTTF.create("000.0", "Arial", a);
        this._SPFLabel = cc.LabelTTF.create("0.000", "Arial", a);
        this._drawsLabel = cc.LabelTTF.create("0000", "Arial", a);
        var a = cc.DIRECTOR_STATS_POSITION,
            b = this._drawsLabel.getContentSize();
        this._drawsLabel.setPosition(cc.pAdd(cc.p(b.width / 2, 5 * b.height / 2), a));
        b = this._SPFLabel.getContentSize();
        this._SPFLabel.setPosition(cc.pAdd(cc.p(b.width / 2, 3 * b.height / 2), a));
        b = this._FPSLabel.getContentSize();
        this._FPSLabel.setPosition(cc.pAdd(cc.p(b.width / 2, b.height / 2), a))
    },
    _calculateMPF: function() {
        this._secondsPerFrame =
            (Date.now() - this._lastUpdate) / 1E3
    }
});
cc.Browser.supportWebGL ? (cc.Director.prototype._clear = cc.Director.prototype._clearWebGL, cc.Director.prototype._beforeVisitScene = cc.Director.prototype._beforeVisitSceneWebGL, cc.Director.prototype._afterVisitScene = cc.Director.prototype._afterVisitSceneWebGL, cc.Director.prototype._createStatsLabel = cc.Director.prototype._createStatsLabelForWebGL) : (cc.Director.prototype._clear = cc.Director.prototype._clearCanvas, cc.Director.prototype._createStatsLabel = cc.Director.prototype._createStatsLabelForCanvas);
cc.DisplayLinkDirector = cc.Director.extend({
    invalid: !1,
    startAnimation: function() {
        this._nextDeltaTimeZero = !0;
        this.invalid = !1;
        cc.Application.getInstance().setAnimationInterval(this._animationInterval)
    },
    mainLoop: function() {
        this._purgeDirecotorInNextLoop ? (this._purgeDirecotorInNextLoop = !1, this.purgeDirector()) : this.invalid || this.drawScene()
    },
    stopAnimation: function() {
        this.invalid = !0
    },
    setAnimationInterval: function(a) {
        this._animationInterval = a;
        this.invalid || (this.stopAnimation(), this.startAnimation())
    }
});
cc.s_SharedDirector = null;
cc.firstUseDirector = !0;
cc.Director.getInstance = function() {
    cc.firstUseDirector && (cc.firstUseDirector = !1, cc.s_SharedDirector = new cc.DisplayLinkDirector, cc.s_SharedDirector.init(), cc.s_SharedDirector.setOpenGLView(cc.EGLView.getInstance()));
    return cc.s_SharedDirector
};
Object.defineProperties(cc, {
    windowSize: {
        get: function() {
            return cc.director.getWinSize()
        },
        enumerable: !0
    }
});
cc.firstRun = !0;
cc.defaultFPS = 60;
cc.Director._fpsImage = new Image;
cc.Director._fpsImage.addEventListener("load", function() {
    cc.Director._fpsImageLoaded = !0
});
cc.Director._fpsImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAgCAYAAAD9qabkAAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+4A5JREAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcAgcQLxxUBNp/AAAQZ0lEQVR42u2be3QVVZbGv1N17829eRLyIKAEOiISEtPhJTJAYuyBDmhWjAEx4iAGBhxA4wABbVAMWUAeykMCM+HRTcBRWkNH2l5moS0LCCrQTkYeQWBQSCAIgYRXEpKbW/XNH5zS4noR7faPEeu31l0h4dSpvc+t/Z199jkFWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhY/H9D/MR9qfKnLj/00U71aqfJn9+HCkCR/Wk36ddsgyJ/1wF4fkDfqqm9/gPsUeTnVr6a2xlQfnxdI7zs0W7irzD17Ytb2WT7EeNv/r4ox1O3Quf2QP2pgt9utwfout4FQE8AVBSlnaRmfvAURQkg2RlAbwB9AThlW5L0GaiKojhJhgOIBqDa7XaPrusdPtr5kQwF0BVAAoBIABRCKDd5aFUhRDAAw57eAOwAhKIoupft3zoqhB1AqLwuHIBut9uFt02qqvqRDJR2dAEQJj/BAOjn56dqmma+xiaECAEQAWAggLsB6A6HQ2iaZggBhBAqgEAAnQB0kzaEmT4hAITT6VQ8Ho/HJAKKECJQtr8LwD1y/A1/vcdfEUIEyfZ9AcQbYvZ942Px88L2UwlJR0dH0EMPPbRj5syZPUeNGrXR7Xb/641xIwJ1XY9NSUlZm52dfW+XLl1w8uRJzJ8//+OGhoYJqqqe1TSt1Wsm9NN1PSIqKmr12rVrR5WUlHy1bdu2AQCumWc3IYRD1/UwVVXnFRQUTIuNjUVzczN2797dWFJSkq8oymZd15sAGAEnFEUJ1nX9nzIzM1dnZmZGh4SE4OTJk5g5c+Zf29vbp9pstrMej6fVOyhIhgAYU1hY+B+hoaGoqKg4XVlZea+XTULTNFdCQsLGiRMnPuR2u3UhBOV9eeDAAWXTpk095DUe6WsoyRE5OTlr0tLSAux2O/bs2cO5c+e+pijKUpIXSHaQVAGkvPLKK++6XK4OksJLCFlXV2cvKSlJBFAjhU+x2WwhHo9nUHp6+urMzMy7wsLCUF9fjxdffPHjxsbGiTab7WuPx9NiEutOuq4PyMjI+M+srKyYqKgoHD58GDNmzNjq8XhyVFU9b/q+LH7hBAEYu3PnTlZVVRFAGgCX6f/tAHoOHDjwa0p27txp/JO9e/f+QM7cipw9nfL3kQBKt2zZQpJ87rnn6mQmoHilw2EACs+cOUOSrK+vZ1NTE0nyo48+IoBpxswoBcMJ4Ndjx471kOTFixe5d+9ekqTH42H//v13A4jyzpAURfEH0H/OnDnthu1z5sw558MmFUCPWbNmnaMP3nrrLZoyDmP8Hl68eDFJ8siRI9/Yc+zYMQKYKdtAztrTrl27xptRXV1NAKMAOAyBBBA/Y8aMdpLs6Ojgxx9//E37+++//29yvFXppwvAwMcee8xjtDHsuXLlCqOjo//ia3wsfpkoALqFhoZuIckJEyackimm3dQmEMDUmpoakmRISMhhAHOHDx/eQJIbN24kgKEyMAHAFRMTs2XXrl1saWkhSZ0kp0+ffhrAr3wEW/S8efOukORLL72kA1gKYMPWrVtJkk899dRJAHeYrgsEsIQkjx8/TgDvAPjd448/3kaSb7zxBmUa7vC6z53BwcFbSHL9+vU6Sc6aNes8gF5ewWAH0PfVV18lSQL4DMBGIcQ6AKtcLleBFC2jXtFt8ODBe0iyoqKCAJYByC8qKmJDQwOzsrK+MAmqo1OnTveHhoa+GRkZ+XZkZOSWiIiIvzgcjk9mzpypkWRmZuZpmbYbGV4AgPnNzc1sa2sjgN0A5iQmJtaSZHl5OQHcb/K3s81mW0uSTU1NBFAFYFbfvn1Pk+Tbb79NAA8IIVzW42/hByA+Pz/fLR/2ZXIda05NI/z9/TeR5J49ewhgqlxTrtI0jY2NjQQw3zTLuWJiYjaUlJToS5Ys6fjkk080kwDEeAmADcA9GzZsIElGRUW9CyAWwLApU6Y0kOSKFSsog9QICGdERMTGsrIyZmVlEcC9AB4IDw/fTpLbtm0jgN94CUAnAJmVlZVcs2aNZ/LkyRdJcvbs2b4EwAkgZfPmzTxw4AABFAN4BkC6vFeUSewcAO5duXIlSTIhIaEawGMAxgKYAmAGgCS73e5vrKVk/yGythANYEhCQsIhkly+fDkBpKqqGmL6DgIALDKN/3yZpVWQZGVlJQE8aPI3KiMjo5okV61aRQAjAPQBMPfIkSN0u90EUCBtsPiFEwpgbn19PdetW2fM5N4zQ9ekpKQqkty0aRMBpMjiWM6JEydIkoqirJUFJ6iq6pAPVy8A6cZMehMBUACEuVyuFwG8HBwcPEIWx367ZMkSjSQXLVrUJouTRorrkAHdA8BdQogsAOsKCwtJkmPGjDkvMw2bDDo/ADEjRoz4XylyFbm5uY0mAbjLyyZ/AOOrq6tZVlbWsWDBgo69e/eyoqKCgwcPPg4gSQaoIRbp27dvN7KF+tLSUr28vJwFBQXtMpvpYRIM7+wrAkDeqVOnePbsWQIoNKfzpiXPg8uXLydJJicnNwF4f+nSpW6STEtLq5fjYwhk1wkTJtSQ5Ouvv04AqTKj+N2xY8dIkgEBAW/Ie1v8wncRegwZMmQvSfbr12+3Ua33WqPfOWbMmP0kWVpaSgCDZAqcfejQIWNZsEGKgvnh9gfQb9myZd8nAEJVVZtMkUNk8CcNHTq0liR1XWdYWNhmH1mJIme80OnTp18x1rp5eXkEsNJms92Fb7e/IgEsvHz5Mp999tkmAI/l5uZeMC0B7vEqqAYAyL106RJJsra2lpWVld+sucePH38ZQG+5NncBeOrgwYMkqbe3t/Po0aOsra011wAWyl0H7x0JJ4DE+fPnu0kyPT29DsDdUrBuyNKEEAkAdpw/f/6GeoEM8GUmfwEgPCIiopwkGxsbabPZPgOw6L777vvm4p49e26VGYjFLxUhhD+ApLKyMp44ccIoVnXybgbgzkcfffRzklyzZg0BDJYCMMmoCwQFBXkLgLGWvvcWAgBToSsKwNPTp09vMR7UuLi4rwH0lgU8c/Db5ezbeeTIkRWzZ8++aMxu+fn5BPCADBwHgP4LFy701NXVEUAJgAnPP/98kyxMNgHo53A4zH77BQQETMvPz7+Um5vbBuAlAFMSExPPmdbVL0qh8Acw8fDhw5SCchVAEYAVb775JknyhRdeaJYztHfxMwLAaqNwCGC2FArv8x0hAHKNLGPKlCme5OTk/Zs3bzb7O0wKiiG8KXl5ed8IxenTp0mSR48e1UmyW7duWywBuD2xyQcgFECgoih+8H1gyJgZV5Lkyy+/3CbTRIePtl2HDBmyw1QBHyGDdXZdXR1JUghRKkXBjOMHCoBdpr0L3nvvPZLkF198wejo6O0A4lVVDTb74HQ6AwD8Wq7Jh8rgGgDgQ13XjVR8qaxJuADMbmlpYXl5uV5UVNRWUFDgfv/993Vj/ZydnU1c37eHXML4S3viAcQqitJD2l104cIFY8lTKsXSBWBMVVWVcd9yed2A1NTUQ6Zl00CvLMMOoHdubm6zFIlWOf5+PsY/Kj09vdrU11QAwwGsv3jxIk21m2DZr10I0RXAuAcffPBgaWkpV69eTYfDcdiwUxY0w6xw+flX8L1xApjevXv3lREREaW6rofB93aPDUDQpEmTMgHgtddeqwBwEd/utZvpqK6uPgEAcXFxkA94NwB9unfvjrNnz4LklwDcf08iIqv66Zs2bXrl4YcfxooVKxAbG7uqrq5uAYA2TdOEqqpGYIi2tjbl6aeffu/YsWPv5uTk7JaC1wHg4Pnz542MwoVvTx+21dbWYvjw4WLixIl+2dnZ9lGjRgmSTE1NRUpKCkwFTGiaxtTU1OXTpk3707Bhw/6g67pDipnT4biuj7qut+Lbk3Vf1tTUXI9qu91Pjq1QFEUBgJaWFgBo8yGOQ8eNGxcAAOvXr/8QwBUfYygAKL169eoCABcuXACAWtn2hOGv0+kMNO1KiPDw8F4A4rZv3/7R1KlTR0+bNu1ht9u9r1+/fqitrQXJgwDarRC6/QjPzs4+QJIffPCB9/aQmSAA43ft2mW0e1QGoi8CAPyLsZccExNTC2BlRkbGRdOyYJCP2csBIN6UAZzCd7cBbQCijYp/dXU1ExMTz6SmptaMHj36f9LS0vYlJCRsl6mxIWSdu3fv/g5J7t+/nwC2AShMTk6+SJKff/45AWRLYbD7+fndAeDf5BJnLoCCyZMnt5JkdnZ2C4B/F0KEm1Pu+Pj4rST55ZdfEsBWAK+mpaVdMo3raDn7KwDuSEpK+m+S3LBhAwG8DuCtHTt2UBbpjgC408vvcFVV15HkuXPnjMp+p5uMf0RcXNyHJNnQ0EBVVfcCWBQXF3fG+Jv0yxABPwB5LS0tRmFxN4BlTzzxxGWSXLx4sS5F3GGFy+1Hp5SUlJq6ujoWFxdTpsZ2H+0iIyMj/0iSWVlZX5mr5jfJFroPGzasxlhTnjp1iiTZ3NxMl8tlrCd9pfa9SkpKSJI5OTmnZOageLUZZqxvfVFWVkZcPwdgNwnSCKPqb17jkmR8fPzfZMDZ5CRsFBmNI7h95s2b1yhT7/MAYmStwCx4vy0uLqa3v5qmEcCfvSr1QQAeXb16NY3Cm3HQ55133iGAp+SxZTNhKSkpfzUddkrFjYevzAQCeGjp0qXfsYckY2NjTwD4leGDLCL2HTdunNtoY+zWSHFcIHdsFCtcfuZ1vO9Eqs3m7/F47sb1k2qX/f3997W2tl7BjWfpBYDOzzzzzIVJkyZh0KBBCwEsB3AJvl9AETabLcDj8dwRFRW1ctasWb8JCgpSzp07d62wsPC/Wltb8xRFadR1/ZqPXYbgAQMGbI2Pjw/+6quv9ldVVT0r01ezuPRJSUn5Y9euXXVd11WzDaqq6kePHm3+7LPPRgO4KlNuxWazhXo8nuTk5OSXMjIyEl0uFxoaGtqKior+dPXq1VdUVT0jj7r68ieoT58+vx8yZMjdx48fP1JVVTVF9m20VW02WyfZf97YsWPjXS4X6urqWvPy8jYCWCyEuEDS8FdVFKWzruv//OSTTy5OTk7uqWkaPv3007qysrJ8RVH+LI8ym8/rB3Tu3HnRI488knLo0KG2ffv2ZQI4C98vP6mqqoZqmpaclpa2cOTIkX39/f3R0NDQUVxc/G5TU9PLqqrWa5rWLH1QVFUN0TStX1JSUvH48eP7BwYG4uDBg1cKCgpeBbBe2u+2Qug2EwD5N5sMPuNtMe8XP4TT6Qxoa2sbIGeXvUKIK7d4IISiKC5d1wPljOfA9bPwzYqiXNV13dd6Uqiq6qdpml2mpe02m63d4/G4vcTF5fF47LJf71nJA6BZVVW3pmntuPHlmAD5wk6Q9NnbHp9vHaqq6tA0zU/64PZhk1FfCZB9G/23ALiqKEqzD39tpvbGUqoFwFUhRLP3yzpCCDtJpxyXDulfG27+pqRR3DXsUWVd4Yq0x/taVQjhIhksC8L+ABpM9ljBf5sKwI8pIBr75L5E4vvu+UNeG/a+hv+AL7yFH8qPtOfHjtOP6V/Bja8D6z/B2Nys/1u9Xv33tLf4GfF/LC4GCJwByWIAAAAASUVORK5CYII\x3d";
cc.Camera = cc.Class.extend({
    _eyeX: null,
    _eyeY: null,
    _eyeZ: null,
    _centerX: null,
    _centerY: null,
    _centerZ: null,
    _upX: null,
    _upY: null,
    _upZ: null,
    _dirty: null,
    _lookupMatrix: null,
    ctor: function() {
        this._lookupMatrix = new cc.kmMat4;
        this.restore()
    },
    description: function() {
        return "\x3cCCCamera | center \x3d(" + this._centerX + "," + this._centerY + "," + this._centerZ + ")\x3e"
    },
    setDirty: function(a) {
        this._dirty = a
    },
    isDirty: function() {
        return this._dirty
    },
    restore: function() {
        this._eyeX = this._eyeY = 0;
        this._eyeZ = cc.Camera.getZEye();
        this._upX =
            this._centerX = this._centerY = this._centerZ = 0;
        this._upY = 1;
        this._upZ = 0;
        cc.kmMat4Identity(this._lookupMatrix);
        this._dirty = !1
    },
    locate: function() {
        if (this._dirty) {
            var a = new cc.kmVec3,
                b = new cc.kmVec3,
                c = new cc.kmVec3;
            cc.kmVec3Fill(a, this._eyeX, this._eyeY, this._eyeZ);
            cc.kmVec3Fill(b, this._centerX, this._centerY, this._centerZ);
            cc.kmVec3Fill(c, this._upX, this._upY, this._upZ);
            cc.kmMat4LookAt(this._lookupMatrix, a, b, c);
            this._dirty = !1
        }
        cc.kmGLMultMatrix(this._lookupMatrix)
    },
    setEyeXYZ: function(a, b, c) {
        this.setEye(a, b,
            c)
    },
    setEye: function(a, b, c) {
        this._eyeX = a;
        this._eyeY = b;
        this._eyeZ = c;
        this._dirty = !0
    },
    setCenterXYZ: function(a, b, c) {
        this.setCenter(a, b, c)
    },
    setCenter: function(a, b, c) {
        this._centerX = a;
        this._centerY = b;
        this._centerZ = c;
        this._dirty = !0
    },
    setUpXYZ: function(a, b, c) {
        this.setUp(a, b, c)
    },
    setUp: function(a, b, c) {
        this._upX = a;
        this._upY = b;
        this._upZ = c;
        this._dirty = !0
    },
    getEyeXYZ: function(a, b, c) {
        return {
            x: this._eyeX,
            y: this._eyeY,
            z: this._eyeZ
        }
    },
    getEye: function() {
        return {
            x: this._eyeX,
            y: this._eyeY,
            z: this._eyeZ
        }
    },
    getCenterXYZ: function(a,
        b, c) {
        return {
            x: this._centerX,
            y: this._centerY,
            z: this._centerZ
        }
    },
    getCenter: function() {
        return {
            x: this._centerX,
            y: this._centerY,
            z: this._centerZ
        }
    },
    getUpXYZ: function(a, b, c) {
        return {
            x: this._upX,
            y: this._upY,
            z: this._upZ
        }
    },
    getUp: function() {
        return {
            x: this._upX,
            y: this._upY,
            z: this._upZ
        }
    },
    _DISALLOW_COPY_AND_ASSIGN: function(a) {}
});
cc.Camera.getZEye = function() {
    return cc.FLT_EPSILON
};
cc.PRIORITY_SYSTEM = -2147483648;
cc.PRIORITY_NON_SYSTEM = cc.PRIORITY_SYSTEM + 1;
cc.ArrayVerifyType = function(a, b) {
    if (a && 0 < a.length)
        for (var c = 0; c < a.length; c++)
            if (!(a[c] instanceof b)) return cc.log("element type is wrong!"), !1;
    return !0
};
cc.ArrayRemoveObjectAtIndex = function(a, b) {
    a.splice(b, 1)
};
cc.ArrayRemoveObject = function(a, b) {
    for (var c = 0, d = a.length; c < d; c++)
        if (a[c] == b) {
            a.splice(c, 1);
            break
        }
};
cc.ArrayRemoveArray = function(a, b) {
    for (var c = 0, d = b.length; c < d; c++) cc.ArrayRemoveObject(a, b[c])
};
cc.ArrayGetIndexOfValue = function(a, b) {
    return a.indexOf(b)
};
cc.ArrayAppendObject = function(a, b) {
    a.push(b)
};
cc.ArrayAppendObjectToIndex = function(a, b, c) {
    a.splice(c, 0, b);
    return a
};
cc.ArrayAppendObjectsToIndex = function(a, b, c) {
    a.splice.apply(a, [c, 0].concat(b));
    return a
};
cc.ArrayGetIndexOfObject = function(a, b) {
    for (var c = 0, d = a.length; c < d; c++)
        if (a[c] == b) return c;
    return -1
};
cc.ArrayContainsObject = function(a, b) {
    return -1 != a.indexOf(b)
};
cc.HASH_FIND_INT = function(a, b) {
    if (null == a) return null;
    for (var c = 0; c < a.length; c++)
        if (a[c].target === b) return a[c];
    return null
};
cc.ListEntry = function(a, b, c, d, e, f) {
    this.prev = a;
    this.next = b;
    this.target = c;
    this.priority = d;
    this.paused = e;
    this.markedForDeletion = f
};
cc.HashUpdateEntry = function(a, b, c, d) {
    this.list = a;
    this.entry = b;
    this.target = c;
    this.hh = d
};
cc.HashTimerEntry = function(a, b, c, d, e, f, g) {
    this.timers = a;
    this.target = b;
    this.timerIndex = c;
    this.currentTimer = d;
    this.currentTimerSalvaged = e;
    this.paused = f;
    this.hh = g
};
cc.Timer = cc.Class.extend({
    _interval: 0,
    _selector: null,
    _target: null,
    _elapsed: 0,
    _runForever: !1,
    _useDelay: !1,
    _timesExecuted: 0,
    _repeat: 0,
    _delay: 0,
    ctor: function() {},
    getInterval: function() {
        return this._interval
    },
    setInterval: function(a) {},
    getSelector: function() {
        return this._selector
    },
    initWithTarget: function(a, b, c, d, e) {
        this._target = a;
        this._selector = b;
        this._elapsed = -1;
        this._interval = c || 0;
        this._delay = e || 0;
        this._useDelay = 0 < this._delay;
        this._repeat = null == d ? cc.REPEAT_FOREVER : d;
        this._runForever = this._repeat == cc.REPEAT_FOREVER;
        return !0
    },
    _callSelector: function() {
        if ("string" == typeof this._selector) this._target[this._selector](this._elapsed);
        else this._selector.call(this._target, this._elapsed)
    },
    update: function(a) {
        if (-1 == this._elapsed) this._timesExecuted = this._elapsed = 0;
        else {
            var b = this._target,
                c = this._selector;
            this._runForever && !this._useDelay ? (this._elapsed += a, this._elapsed >= this._interval && (b && c && this._callSelector(), this._elapsed = 0)) : (this._elapsed += a, this._useDelay ? this._elapsed >= this._delay && (b && c && this._callSelector(),
                this._elapsed -= this._delay, this._timesExecuted += 1, this._useDelay = !1) : this._elapsed >= this._interval && (b && c && this._callSelector(), this._elapsed = 0, this._timesExecuted += 1), this._timesExecuted > this._repeat && cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(b, c))
        }
    }
});
cc.Timer.timerWithTarget = function(a, b, c) {
    if (2 > arguments.length) throw Error("timerWithTarget'argument can't is null");
    var d = new cc.Timer;
    d.initWithTarget(a, b, c || 0, cc.REPEAT_FOREVER, 0);
    return d
};
cc._sharedScheduler = null;
cc.Scheduler = cc.Class.extend({
    _timeScale: 1,
    _updatesNegList: null,
    _updates0List: null,
    _updatesPosList: null,
    _hashForUpdates: null,
    _arrayForUpdates: null,
    _hashForTimers: null,
    _arrayForTimes: null,
    _currentTarget: null,
    _currentTargetSalvaged: !1,
    _updateHashLocked: !1,
    ctor: function() {
        this._timeScale = 1;
        this._updatesNegList = [];
        this._updates0List = [];
        this._updatesPosList = [];
        this._hashForUpdates = {};
        this._arrayForUpdates = [];
        this._hashForTimers = {};
        this._arrayForTimers = [];
        this._currentTarget = null;
        this._updateHashLocked =
            this._currentTargetSalvaged = !1
    },
    _removeHashElement: function(a) {
        delete this._hashForTimers[a.target.__instanceId];
        cc.ArrayRemoveObject(this._arrayForTimers, a);
        a.Timer = null;
        a.target = null
    },
    _findElementFromArray: function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c].target == b) return a[c];
        return null
    },
    _removeUpdateFromHash: function(a) {
        if (a = this._hashForUpdates[a.target.__instanceId]) cc.ArrayRemoveObject(a.list, a.entry), delete this._hashForUpdates[a.target.__instanceId], cc.ArrayRemoveObject(this._arrayForUpdates,
            a), a.entry = null, a.target = null
    },
    _priorityIn: function(a, b, c, d) {
        d = new cc.ListEntry(null, null, b, c, d, !1);
        if (a) {
            for (var e = !1, f = 0; f < a.length; f++)
                if (c < a[f].priority) {
                    a = cc.ArrayAppendObjectToIndex(a, d, f);
                    e = !0;
                    break
                }
            e || a.push(d)
        } else a = [], a.push(d);
        c = new cc.HashUpdateEntry(a, d, b, null);
        this._arrayForUpdates.push(c);
        this._hashForUpdates[b.__instanceId] = c;
        return a
    },
    _appendIn: function(a, b, c) {
        c = new cc.ListEntry(null, null, b, 0, c, !1);
        a.push(c);
        a = new cc.HashUpdateEntry(a, c, b, null);
        this._arrayForUpdates.push(a);
        this._hashForUpdates[b.__instanceId] =
            a
    },
    setTimeScale: function(a) {
        this._timeScale = a
    },
    getTimeScale: function() {
        return this._timeScale
    },
    update: function(a) {
        this._updateHashLocked = !0;
        1 != this._timeScale && (a *= this._timeScale);
        var b, c;
        for (c = 0; c < this._updatesNegList.length; c++) b = this._updatesNegList[c], b.paused || b.markedForDeletion || b.target.update(a);
        for (c = 0; c < this._updates0List.length; c++) b = this._updates0List[c], b.paused || b.markedForDeletion || b.target.update(a);
        for (c = 0; c < this._updatesPosList.length; c++) b = this._updatesPosList[c], b.paused || b.markedForDeletion ||
            b.target.update(a);
        for (c = 0; c < this._arrayForTimers.length; c++) {
            b = this._currentTarget = this._arrayForTimers[c];
            this._currentTargetSalvaged = !1;
            if (!this._currentTarget.paused)
                for (b.timerIndex = 0; b.timerIndex < b.timers.length; b.timerIndex++) b.currentTimer = b.timers[b.timerIndex], b.currentTimerSalvaged = !1, b.currentTimer.update(a), b.currentTimer = null;
            this._currentTargetSalvaged && 0 == this._currentTarget.timers.length && this._removeHashElement(this._currentTarget)
        }
        for (c = 0; c < this._updatesNegList.length; c++) this._updatesNegList[c].markedForDeletion &&
            this._removeUpdateFromHash(this._updatesNegList[c]);
        for (c = 0; c < this._updates0List.length; c++) this._updates0List[c].markedForDeletion && this._removeUpdateFromHash(this._updates0List[c]);
        for (c = 0; c < this._updatesPosList.length; c++) this._updatesPosList[c].markedForDeletion && this._removeUpdateFromHash(this._updatesPosList[c]);
        this._updateHashLocked = !1;
        this._currentTarget = null
    },
    scheduleCallbackForTarget: function(a, b, c, d, e, f) {
        if (!b) throw "cc.scheduler.scheduleCallbackForTarget(): callback_fn should be non-null.";
        if (!a) throw "cc.scheduler.scheduleCallbackForTarget(): target should be non-null.";
        c = c || 0;
        d = null == d ? cc.REPEAT_FOREVER : d;
        e = e || 0;
        f = f || !1;
        var g = this._hashForTimers[a.__instanceId];
        g || (g = new cc.HashTimerEntry(null, a, 0, null, null, f, null), this._arrayForTimers.push(g), this._hashForTimers[a.__instanceId] = g);
        if (null == g.timers) g.timers = [];
        else
            for (var h = 0; h < g.timers.length; h++)
                if (f = g.timers[h], b == f._selector) {
                    cc.log("CCSheduler#scheduleCallback. Callback already scheduled. Updating interval from:" + f.getInterval().toFixed(4) +
                        " to " + c.toFixed(4));
                    f._interval = c;
                    return
                }
        f = new cc.Timer;
        f.initWithTarget(a, b, c, d, e);
        g.timers.push(f)
    },
    scheduleUpdateForTarget: function(a, b, c) {
        var d = this._hashForUpdates[a.__instanceId];
        d ? d.entry.markedForDeletion = !1 : 0 == b ? this._appendIn(this._updates0List, a, c) : 0 > b ? this._updatesNegList = this._priorityIn(this._updatesNegList, a, b, c) : this._updatesPosList = this._priorityIn(this._updatesPosList, a, b, c)
    },
    unscheduleCallbackForTarget: function(a, b) {
        if (null != a && null != b) {
            var c = this._hashForTimers[a.__instanceId];
            if (null != c)
                for (var d = 0; d < c.timers.length; d++) {
                    var e = c.timers[d];
                    if (b == e._selector) {
                        e != c.currentTimer || c.currentTimerSalvaged || (c.currentTimerSalvaged = !0);
                        cc.ArrayRemoveObjectAtIndex(c.timers, d);
                        c.timerIndex >= d && c.timerIndex--;
                        0 == c.timers.length && (this._currentTarget == c ? this._currentTargetSalvaged = !0 : this._removeHashElement(c));
                        break
                    }
                }
        }
    },
    unscheduleUpdateForTarget: function(a) {
        null != a && (a = this._hashForUpdates[a.__instanceId], null != a && (this._updateHashLocked ? a.entry.markedForDeletion = !0 : this._removeUpdateFromHash(a.entry)))
    },
    unscheduleAllCallbacksForTarget: function(a) {
        if (null != a) {
            var b = this._hashForTimers[a.__instanceId];
            b && (!b.currentTimerSalvaged && cc.ArrayContainsObject(b.timers, b.currentTimer) && (b.currentTimerSalvaged = !0), b.timers.length = 0, this._currentTarget == b ? this._currentTargetSalvaged = !0 : this._removeHashElement(b));
            this.unscheduleUpdateForTarget(a)
        }
    },
    unscheduleAllCallbacks: function() {
        this.unscheduleAllCallbacksWithMinPriority(cc.PRIORITY_SYSTEM)
    },
    unscheduleAllCallbacksWithMinPriority: function(a) {
        var b;
        for (b = 0; b <
            this._arrayForTimers.length; b++) this.unscheduleAllCallbacksForTarget(this._arrayForTimers[b].target);
        if (0 > a)
            for (b = 0; b < this._updatesNegList.length; b++) this.unscheduleUpdateForTarget(this._updatesNegList[b].target);
        if (0 >= a)
            for (b = 0; b < this._updates0List.length; b++) this.unscheduleUpdateForTarget(this._updates0List[b].target);
        for (b = 0; b < this._updatesPosList.length; b++) this._updatesPosList[b].priority >= a && this.unscheduleUpdateForTarget(this._updatesPosList[b].target)
    },
    pauseAllTargets: function() {
        return this.pauseAllTargetsWithMinPriority(cc.PRIORITY_SYSTEM)
    },
    pauseAllTargetsWithMinPriority: function(a) {
        var b = [],
            c, d;
        for (c = 0; c < this._arrayForTimers.length; c++)
            if (d = this._arrayForTimers[c]) d.paused = !0, b.push(d.target);
        if (0 > a)
            for (c = 0; c < this._updatesNegList.length; c++)
                if (d = this._updatesNegList[c]) d.paused = !0, b.push(d.target);
        if (0 >= a)
            for (c = 0; c < this._updates0List.length; c++)
                if (d = this._updates0List[c]) d.paused = !0, b.push(d.target);
        for (c = 0; c < this._updatesPosList.length; c++)
            if (d = this._updatesPosList[c]) d.paused = !0, b.push(d.target);
        return b
    },
    resumeTargets: function(a) {
        if (a)
            for (var b =
                0; b < a.length; b++) this.resumeTarget(a[b])
    },
    pauseTarget: function(a) {
        if (!a) throw "cc.Scheduler.pauseTarget():target should be non-null";
        var b = this._hashForTimers[a.__instanceId];
        b && (b.paused = !0);
        if (a = this._hashForUpdates[a.__instanceId]) a.entry.paused = !0
    },
    resumeTarget: function(a) {
        if (!a) throw "cc.Scheduler.resumeTarget():target should be non-null";
        var b = this._hashForTimers[a.__instanceId];
        b && (b.paused = !1);
        if (a = this._hashForUpdates[a.__instanceId]) a.entry.paused = !1
    },
    isTargetPaused: function(a) {
        if (!a) throw "cc.Scheduler.isTargetPaused():target should be non-null";
        return (a = this._hashForTimers[a.__instanceId]) ? a.paused : !1
    }
});
cc.RESOURCE_TYPE = {
    IMAGE: ["png", "jpg", "bmp", "jpeg", "gif"],
    SOUND: ["mp3", "ogg", "wav", "mp4", "m4a"],
    XML: ["plist", "xml", "fnt", "tmx", "tsx"],
    BINARY: ["ccbi"],
    FONT: "FONT",
    TEXT: ["txt", "vsh", "fsh", "json", "ExportJson"],
    UNKNOW: []
};
cc.Loader = cc.Class.extend({
    _curNumber: 0,
    _totalNumber: 0,
    _loadedNumber: 0,
    _resouces: null,
    _animationInterval: 1 / 60,
    _interval: null,
    _isAsync: !1,
    ctor: function() {
        this._resouces = []
    },
    initWithResources: function(a, b, c) {
        if (a) {
            b && (this._selector = b, this._target = c);
            if (a != this._resouces || 0 == this._curNumber) {
                this._loadedNumber = this._curNumber = 0;
                if (a[0] instanceof Array)
                    for (b = 0; b < a.length; b++) this._resouces = this._resouces.concat(a[b]);
                else this._resouces = a;
                this._totalNumber = this._resouces.length
            }
            this._schedulePreload()
        } else console.log("resources should not null")
    },
    setAsync: function(a) {
        this._isAsync = a
    },
    onResLoadingErr: function(a) {
        this._loadedNumber++;
        cc.log("cocos2d:Failed loading resource: " + a)
    },
    onResLoaded: function() {
        this._loadedNumber++
    },
    getPercentage: function() {
        var a = 0;
        return a = 0 == this._totalNumber ? 100 : 0 | this._loadedNumber / this._totalNumber * 100
    },
    releaseResources: function(a) {
        if (a && 0 < a.length)
            for (var b = cc.TextureCache.getInstance(), c = cc.AudioEngine ? cc.AudioEngine.getInstance() : null, d = cc.SAXParser.getInstance(), e = cc.FileUtils.getInstance(), f, g = 0; g < a.length; g++) {
                f =
                    a[g];
                var h = this._getResType(f);
                switch (h) {
                    case "IMAGE":
                        b.removeTextureForKey(f.src);
                        break;
                    case "SOUND":
                        if (!c) throw "Can not find AudioEngine! Install it, please.";
                        c.unloadEffect(f.src);
                        break;
                    case "XML":
                        d.unloadPlist(f.src);
                        break;
                    case "BINARY":
                        e.unloadBinaryFileData(f.src);
                        break;
                    case "TEXT":
                        e.unloadTextFileData(f.src);
                        break;
                    case "FONT":
                        this._unregisterFaceFont(f);
                        break;
                    default:
                        throw "cocos2d:unknown filename extension: " + h;
                }
            }
    },
    _preload: function() {
        this._updatePercent();
        if (this._isAsync) {
            var a = cc.Director.getInstance()._frameRate;
            if (null != a && 20 > a) {
                cc.log("cocos2d: frame rate less than 20 fps, skip frame.");
                return
            }
        }
        this._curNumber < this._totalNumber && (this._loadOneResource(), this._curNumber++)
    },
    _loadOneResource: function() {
        var a = cc.TextureCache.getInstance(),
            b = cc.AudioEngine ? cc.AudioEngine.getInstance() : null,
            c = cc.SAXParser.getInstance(),
            d = cc.FileUtils.getInstance(),
            e = this._resouces[this._curNumber],
            f = this._getResType(e);
        switch (f) {
            case "IMAGE":
                a.addImage(e.src);
                break;
            case "SOUND":
                if (!b) throw "Can not find AudioEngine! Install it, please.";
                b.preloadSound(e.src);
                break;
            case "XML":
                c.preloadPlist(e.src);
                break;
            case "BINARY":
                d.preloadBinaryFileData(e.src);
                break;
            case "TEXT":
                d.preloadTextFileData(e.src);
                break;
            case "FONT":
                this._registerFaceFont(e);
                break;
            default:
                throw "cocos2d:unknown filename extension: " + f;
        }
    },
    _schedulePreload: function() {
        var a = this;
        this._interval = setInterval(function() {
            a._preload()
        }, 1E3 * this._animationInterval)
    },
    _unschedulePreload: function() {
        clearInterval(this._interval)
    },
    _getResType: function(a) {
        if (null != a.fontName) return cc.RESOURCE_TYPE.FONT;
        a = a.src;
        a = a.substring(a.lastIndexOf(".") + 1, a.length);
        var b = a.indexOf("?");
        0 < b && (a = a.substring(0, b));
        for (var c in cc.RESOURCE_TYPE)
            if (-1 != cc.RESOURCE_TYPE[c].indexOf(a)) return c;
        return a
    },
    _updatePercent: function() {
        100 <= this.getPercentage() && (this._unschedulePreload(), this._complete())
    },
    _complete: function() {
        if (this._target && "string" == typeof this._selector) this._target[this._selector](this);
        else this._target && "function" == typeof this._selector ? this._selector.call(this._target, this) : this._selector(this);
        this._totalNumber = this._loadedNumber = this._curNumber = 0
    },
    _registerFaceFont: function(a) {
        var b = a.src,
            c = cc.FileUtils.getInstance();
        if (b && 0 < b.length) {
            var d = document.createElement("style");
            d.type = "text/css";
            document.body.appendChild(d);
            for (var e = "@font-face { font-family:" + a.fontName + "; src:", f = 0; f < b.length; f++) e += "url('" + c.fullPathForFilename(encodeURI(b[f].src)) + "') format('" + b[f].type + "')", e += f == b.length - 1 ? ";" : ",";
            d.textContent += e + "};";
            b = document.createElement("div");
            b.style.fontFamily = a.fontName;
            b.innerHTML =
                ".";
            b.style.position = "absolute";
            b.style.left = "-100px";
            b.style.top = "-100px";
            document.body.appendChild(b)
        }
        cc.Loader.getInstance().onResLoaded()
    },
    _unregisterFaceFont: function(a) {}
});
cc.Loader.preload = function(a, b, c) {
    this._instance || (this._instance = new cc.Loader);
    this._instance.initWithResources(a, b, c);
    return this._instance
};
cc.Loader.preloadAsync = function(a, b, c) {
    this._instance || (this._instance = new cc.Loader);
    this._instance.setAsync(!0);
    this._instance.initWithResources(a, b, c);
    return this._instance
};
cc.Loader.purgeCachedData = function(a) {
    this._instance && this._instance.releaseResources(a)
};
cc.Loader.getInstance = function() {
    this._instance || (this._instance = new cc.Loader);
    return this._instance
};
cc.Loader._instance = null;
cc.LoaderScene = cc.Scene.extend({
    _logo: null,
    _logoTexture: null,
    _texture2d: null,
    _bgLayer: null,
    _label: null,
    _winSize: null,
    ctor: function() {
        cc.Scene.prototype.ctor.call(this);
        this._winSize = cc.Director.getInstance().getWinSize()
    },
    init: function() {
        cc.Scene.prototype.init.call(this);
        var a = cc.p(this._winSize.width / 2, this._winSize.height / 2);
        this._logoTexture = new Image;
        var b = this,
            c;
        this._logoTexture.addEventListener("load", c = function() {
            b._initStage(a);
            this.removeEventListener("load", c, !1)
        });
        this._logoTexture.src =
            "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAlAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4MDBEMDY2QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4MDBEMDY1QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2RTk0OEM4OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2RTk0OEM5OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQADQkJCQoJDQoKDRMMCwwTFhENDREWGhUVFhUVGhkUFhUVFhQZGR0fIB8dGScnKionJzk4ODg5QEBAQEBAQEBAQAEODAwOEA4RDw8RFA4RDhQVERISERUfFRUXFRUfKB0ZGRkZHSgjJiAgICYjLCwoKCwsNzc1NzdAQEBAQEBAQEBA/8AAEQgAyACgAwEiAAIRAQMRAf/EALAAAAEFAQEAAAAAAAAAAAAAAAQAAgMFBgcBAQEAAwEBAAAAAAAAAAAAAAAAAQMEAgUQAAIBAgIEBwoLBgQGAwAAAAECAwAEEQUhMRIGQVFxsTITFGGBwdEiQlKSMzWRoeFicqKyI1NzFYJjJDQWB9KjVCbxwkNkJWXik3QRAAIBAgMFBQcDBQEAAAAAAAABAhEDIRIEMUFRcTJhwVIUBZGhsSJyEzOB0ULhYpIjUxX/2gAMAwEAAhEDEQA/AMJSpUqAVKlXuFAeUq9wpUB5XuFe4V6ooDzZHDox0CnGMinzwl7Z8NajaHeoO3vmTBZBtp9YUIqTEV5ROxHKnWRnaU8VRMhFBUjpV7hSoSeUq9pUB5Sr2lhQHlKvcK8oBV7hSFSRrtaKAZs07YNPM1pG2xJIAw1jSeandry/8X4m8VCKkWwaWwam7Xl/4v1W8VLtmX/i/VbxUoKkWwakSM407tmX/i/VbxUmzGwjQsjdY41IARie/U0IbZO0kNtCXnOCkEBeFu4KI3Bs7DNb27ya+jDx3kJeEnpJJEcQVbWDsk17u5urd591ucZkWhym2Vnd9RkCDEpFxDRpbw0bunu5mlp2De2FMLYXOD2wB2xbOeraUcYGJ72mlSUiqzzdzMd3Z3mixltA2yzcK/NlHM1DQyRXce1HocdNOEfJXZ88y9ZojOqhiBszIRiHQ8Y4cK5TvHuzLljHNMqxNoDjLFraHHnjPxcNCGVbxEUzYNTx5jZSxhpW6qTzlwJ+DCvO2Zf+L9VvFSgqyHYNLYNTdssPxfibxUu15f8Ai/VPiqCakOwa82DU/a8v/F+JvFTDdWPBL8R8VKCvYRYV5UzoMAy6QdIIqI0B4KJtxiRQwou16QoGUkntH5Tz0RbZbmF2hktraSVBo2lUkY8tDye0flPPXTslVUyiyVRsjqUOA4yMT8dW2ram2m6UVTNq9S7EIyUVJydMTn/6DnP+im9Wl+g5z/opvVrpteEhQWY4AaSTwAVf5WPiZh/9S5/zj7zltzlmYWkfWXNvJDGTgGcYDHirR7i7mSbwXParsFMrgb7w6jKw/wCmnc9I14kF3vpvCljbMyWMOJL4aEiB8qU/ObUK7HYWVrl1pFZWiCOCBQqKOLjPGTrNZZqKbUXVHq2nNwTuJRk1VpbgXN8s7Rk5ym0UQQzhIG2NAjhxHWbI+gCBVjBBFbwxwQqEiiUJGg1BVGAFe7dV28WYLYZFmF2Th1UD7JGjymGyn1iK5OyzIBGB1HgrLZhamzumQAGJwSqnSCh1q3GOCodxt4cxurdcpzuN4cyhiWaF5Bg09udUmnWw1H/jV9nFuJ7Quo+8h8peThFA+047vduyMtk7fYqTl07YFdfUufMPzT5p71UdtlmYXaGS2t3mQHAsgxANdadYJopLe4QS2867EsZ4QfCNYrCFbjdDPmgkYyWFxgVf04ifJf6ScNdRUW1XBb6FU5TjF5EpSSrGu/s5lN+g5z/opvVpfoOc/wCim9WtdHnatvObJXDW7xLGhB8nrPaY9/HCr+tEdPCVaSeDoYLnqF63lzW4/PFSW3ecxbI84VSzWUwUaSdg0DXXK5nvAipnd6qgKvWnQO7pri9ZUEmm3Vl2j1kr8pRlFRyquBNZjGxQ/S56Y1S2fu9OVueon11Szahoou06QoQUXadIVCD2FJJ7R+U89dMydv8Axdn+TH9muZye0flPPXQstlK5Tbka1gUjlC1q0vVLkeb6r+O3Tx9xcY1nt8c0NrZCyiOE1108NYjGv1joo7Js1jzKyScYLIvkzL6LDwHXVJksH9Sb49dKNq0tj1jA6uriOCL+02FWX7iVtZX1/AzaHTyeoauKn2MX9W79zebiZCuR5MjSrhfXuEtwTrUeZH+yNfdrRNcxI6IzhXlJEak6WIGJ2Rw4ChWnChndtlVBLMdQA0k1gbXNMzzDfDLs6mjaPKppJbWwJ1bOwwxw43OnHh71YT3DpfWUJmFlb5jHHDdeXBHIsrRea5TSqvxqG04cNN62vetoCS4tre5mgnkGE9q+3DKOkuI2WX6LDQRRHWDh1UCtwj7QRg2wdl8Djgw1qe7XvW0BQ3kfZ7mSLgU+T9E6RVbnuVrnWVSWqj+Lt8ZbRuHEdKPkYVcZ2MJY5fSGyeVar45+rkWQHAqccalPE5km1htWK5nK4Wnt5FuUBUwOMG4nGkA/BXUrW4S6torlOjMgcd/xVn7rLo7zKs0uEjCNeSvdwoBhgsZxX1l2j36k3Lu+uyprdj5Vs5A+i/lD48a0aaVJOPi7jB6lbzWozpjB48pf1NDXNN4vfl7+Z4BXS65pvF78vfzPAK71XTHmZ/S/yT+jvJ7L3fHytz1E+upbL+Qj5W56jfXWRnsIYKLtekKEFGWvSFQgyjk9o/Keet3YthlMP/5x9msJJ7R+U89biyb/AMXEv7gD6tadL1T+kwepRrC39ZkLDMbiwMvUHRPG0bjlGg8ore/23sxBldxfMPLupNhT8yL/AORNZbdzJ484scytxgLqJY5LZj6Q2sV5G1Vud1mjjyG0ij0NEGSZToKyhjtqw4waztuiXA3qKTbSxltfGhbZlE95ZtZqxVbgiOZhrER9ph3Svk9+pJILZ4Y4DGBFCUMKjRsGPobPFhUfW0NJmljE2xJcIrcI2vFUEln1lRXd6lrazXT9GCNpD+yNqoI7mOVduNw6nzlOIoPOUa6yye1XXcbMR5GdQ3xY0BSbj31/FcTQZirJ+q431q7anbHCTZ72Bw7lbPrKBMcBWNNgbMBBh+bsjBdni0VJ1lARZs6yWiupxCuMDy6KpS2IwOo6DTr3Mre3e5tZZVUM4ZBjqOOJoWO4jkXajcOOMHGgDISvWIrdAkKR80+TzVl908bPPL3LzxOuHdifxVfiTAg92qI/w+/8gGgSyN/mR7XPVlp0lF/3L3mbVKtu5Hjbk/8AHE2Fc03i9+Xv5ngFdKNc13i9+Xv5ngFaNV0x5nn+l/kn9HeEWXu+PlbnqJ9dS2Xu9OVueon11kZ7CGCjLXpCgxRlr0hUIPYUcntH5Tz1s8vb+Bt1/dqPirGSe0flPPWusG/g4Py15q06XqlyMWvVYQ+ruI9xJOqzO9hOto/sP8tbGOFIrmWeM7IuMDMnAXXQJOUjQeOsJk0nY96ip0CYunrjaHx1t+srPJUbXBm2LrFPikwTOb+T+VhbZxGMrDXp83x1QSy2tucJpUjPETp+Cn5/ftaRvKvtp3Kx48HG3erHMzOxZiWZtLMdJNQSbbL71Vk6yynViOkqnEEfOWtPbXi3EQkGg6mXiNckjeSJxJGxR10qw0GtxuxmvbImD4CZMFlA4fRfv0BqesqqzTMZNMEDbIHtHH2QeCiZJSqMQdOGiue53mz3czQwsRbIcNHnkec3c4qAMuriz68gTIToxwOOnlp0MjxMJYW741Gs3RVldtbygE/dMcHX/moDaxTiWNZB53B3arb8/wC+4SOF4sf/AKxU9kcBsfOGHfoUHtG/RbzY5Die5HHhXdvavqiZ9Q8Jdlq4/gbKua7xe/L38zwCuhpf2Uk/Zo50kmwJKIdogDjw1VzzeL35e/meAVp1LTgqY4nn+mRauzqmqwrjzCLL3fHytz1E+upLL+Qj5W56jfXWRnroYKLtekKEFF2vSFQg9hSSe0flPPWosm/hIfoLzVl5PaPynnrRWb/w0X0F5q06XqlyM2sVYx5gmbFre/t71NY2T+0h8VbSO5SWNJUOKSAMp7jDGspmMPaLRlXS6eWve1/FRO7WYdbZm1Y/eW/R7qHxHRXGojlm3ulid6aVbaW+OALvgCLq2Hm9WxHKWqjhj6xsK1e8dm15l4niG1LZkswGsxtrPeOmsvayBJA1VItlWjptLuTdPMo7LtjRDq9naK4+WF9IrUW7BaHOljGqVHB7w2hzVoZt87d8vaNYSLl02CcRsDEbJbj71Uu7UBkvJ7/D7q2QoDxySaAO8MTXdxRVMpRp5XZOWdF/ms7R5XdyKfKWJsO/5PhrG5XlNxmEywW6bTnTxAAcJNbGSMXkM1pjgbiNo1PziPJ+Os7u7m/6ReM00ZOgxSpqYYHT3wRXMKN4ll9zUG4bQfNshu8sZVuEA2hirA4qe/VOwwrVbzbww5mI44UKRRYkbWG0S3JWctbd7u5WFfOOLHiUdJqmaipfLsIsObhWe001lMkMVvJNjhghIALMcBxCs7fxXQmkupx1bXDswGPlaTidVaEyKNXkoo4eBV+Sq7L7Vs9zcBgeyQ4GQ/MB1crmoim2orezqcowTuSeEY48jQ7oZX2PLzdyLhNd6RjrEY6I7+uspvH78vfzPAK6UAAAFGAGgAcArmu8Xvy9/M8ArTfio24RW5nnaG67uou3H/KPuqT2X8hHytz1G+upLL3enK3PUb66ys9RDBRdr0hQgou06QqEGUkntH5Tz1e238vF9BeaqKT2j8p56vbb+Xi+gvNWjTdUuRn1XTHmTh8KrJTJlt8t1CPIY44cGnpJVjTJYkmjaN9Ib4u7V923njTethRauZJV3PaW1rfLIiXEDYg6R4VYc9CXW7thfOZbKdbGZtLW8uPVY/u3GrkNUkM9zlcxUjbhfWOA90cRq4gv4LhdqN+VToNYWmnRm9NNVWNTyHc6VWBv8wt4YeHqm6xyPmroq1Z7WGFLSxTq7WLSuPSdjrkfumq5yHXDUeA92oO2SKpVumNAaoJLMXH3myp0rpJ4uKhc3tbDM5BMri1zAj79j7KTiY8TcdBpcsith0286o+sPCagEX9Pzg4zXUCp6QYse8oouCG3tk6m1BYv05W6T+IdyolxbHDAAa2OgDlNCz3ryN2WxBd5PJMg1t81eId2ukqnLlTBbfcuY+9uJLiRcvtPvHdsHK+cfRHcHDWsyawjyy0WBcDI3lTP6TeIcFV+S5OmXx9bJg1048o8Cj0V8Jq2DVu09nL80up7OxHi+oal3P8AXB/IsZS8T/YOV65zvCcc7vfzPAK3ivWCz445zeH954BXOr6I8yfSfyz+jvCLP3fHytz1G+upLP3fHytz1E+usbPaQ0UXadIUIKLtekKhB7Ckk9o/Keer22/l4/oLzVRSe0flPPV7b/y8X0F5q0abqlyM+q6Y8yQsBTDMor1o8aiaE1pbluMqS3sbLLHIhSRQyngqukhaJ9uBjo+H5aOa3ao2t34qouRlLajTalGP8v0IY8ylXQ+PKPFU/bYXOLPge6CKia0LaxTOxHu1Q7cuBd9yPEJ7TbjXKO8CajbMIF6CNIeNvJHjqIWJ7tSpYkalqVblwIdyG+RGXur0hXYJFxal+Dhq5y3slkv3Y2pD0pTr+QUClpJRUdo9XW4OLrTHtM16cZLLWkeC7y4jvlNEpcRtw1Ux27Ci448NZrTFy3nn3IQWxlgGrDZ3pza7/M8ArZo+ArF5171uvp+CqdV0R5l/psUrs2vB3hdl7vTlbnqJ9dS2Xu+PlbnqJ9dY2eshooq16QoQUXa9IVCD2FLJ7RuU89WNtmUSQqkgYMgw0accKrpPaPynnrZWG4Vi+VWmY5tnMWXG+XrIYnA0rhj0mdcTgdNdwnKDqjmduM1SRR/qlr8/4KX6pa8T/BVzDuLZXudRZblmbxXcPUNPc3KqCIwrbOzgrHEnHjoyD+3eSXkht7DeKG4umDGOJVUklfouThXfmbnZ7Cvy1vt9pmv1W1+d8FL9VteJvgq5yrcOGfLmzHN80iyyETPbptAEFo2ZG8pmUa1OFNn3Ky6W/sbDKM5hv5bx2WTZA+7RF2y52WOPJTzE+z2Dy1vt9pT/AKpacTerS/U7Tib1a04/t7kDXPY03jhN0W6sQ7K7W3q2dnrMccaDy/8At80kuZfqWYxWNtlcvUPPhiGYhWDeUy7IwYU8xPs9g8tb7faUn6pacTerTxm9oOBvVq3v9z927aynuId44LiWKNnjhAXF2UYhRg516qpsryjLr21665zFLSTaK9U2GOA87SwqY37knRU+BzOzags0s1Oyr+BKM6sxwP6tSDPLMen6vy0rvdm3Sxlu7K/S7WDDrFUDUTxgnTU826eXW7KlxmqQuwDBXUKcD+1Xee/wXuKX5XDGWLapSVcOyhEM/seJ/V+WnjeGx4pPV+Wkm6kKZlFay3Jlt7iFpYZY8ASVK6DjtDDA0f8A0Tl340/1f8Ndx8xJVWXB0KbktFFpNzdVXAC/qOwA0CQni2flrO3Vwbm5lnI2TKxbDirX/wBE5d+NcfV/wVR7xZPa5U9utvI8nWhmbbw0YEAYYAVxfhfy5rlKR4Fulu6X7mW1mzT8S4Yis/5CPlbnqJ9dSWfu9OVueon11mZvQ2i7XpChKKtekKhBlNJ7R+U89bDfGTb3a3ZX0Lcj6kdY+T2j8p560288m1kWQr6MJ+ylSAr+2cnV5renjs3H1loX+3j9XvbbtxLN9lqW4UnV5jdnjtXHxihtyZNjeSBu5J9k1BJe7xy7W5CJ/wCzuD/mTVTf2+fq97LJuLrPsNRueS7W6aJ/38x+vLVXuY+xvHaNxbf2GoCezf8A36j/APsSf8w1sLnqczTefJluYoLm5uo5F61sBshItP1cNFYe1f8A3ir/APfE/wCZUe9bB94r5jwuPsrQFhmG4l/Z2M17HdW90tuu3IkTHaCjWdIw0VVZdks9/C06yJFEp2dp+E1bbqybGTZ8vpQD7L1XRv8A7blT96Oda7tpNuuNE37Cq9KSisjyuUoxrStKllHbLlWTXsMs8chuSuwEPDqwoLe5y+YRE/gLzmqRekvKKtd4327yM/ulHxmrHJStySWVRyrjxKI2XC/CTlnlPPKTpTdFbP0L1bgrf5Lp0G3dPhQHwV0S1lzBsns3sESR8Crh9WAJGjSOKuU3E+zdZQ3oJh8IArdZXFDmOTpHa3i2+YrI2KtKy4ricBsBuHHgFXSo440+Wa2qqxjvM9uMoy+WvzWpLCWWWE28HxL6e43ojgkeSCBY1Ri5BGIUDT51cl3vm276BBqSEH4WbxV0tlkyXJcxTMb+OW6uY9mGHrCzDQwwAbTp2uKuTZ9N1uYsfRRR8WPhrm419mSSjRyiqxVK7y23B/ftuTm2oSdJyzNVw3BFn7vTlbnqF9dS2fu9OVueon11lZuQ2iLdsGFD05H2dNQGV0ntG5Tz1dWm9N1b2kVq8EVwsI2UaQaQOKhmitZGLOmk68DhSFvY+gfWNSAg7z3Qvo7yKCKIohiaNR5LKxx8qpxvjcqS0VpbxvwOAcRQPZ7D0G9Y0uz2HoH1jUCpLY7zXlpbm3eKO5QuzjrBqZji3x17PvNcyT288VvDBJbMWUovS2hslW7mFQ9nsPQPrGl2ew9A+saCod/WNxtbYsrfb17WBxx5ddD2281xC88klvDcSXEnWuzrqOGGC9zRUPZ7D0G9Y0uzWHoH1jQVCLreq6ntZbaO3it1mGy7RjTs1X2mYy20ZiCq8ZOODcdEdmsPQb1jS7PYegfWNdJuLqnQiSUlRqpFLmryxtH1Ma7Qw2gNNPOdSt0oI27p007s9h6B9Y0uz2HoH1jXX3Z+I4+1b8IJdX89xLHKQFMXQUahpxoiPN5P+onfU+A0/s9h6DesaXZ7D0D6xpG7OLbUtu0StW5JJx2bBsmbtiSiEk+cxoCWWSaVpZOk2vDVo0VYdnsPQb1jSNvZcCH1jSd2c+p1XAmFqEOmOPEfaH+BQd1ueo211IzrgFUYKNAAqI1WztCpUqVCRUqVKgFSpUqAVKlSoBUqVKgFSpUqAVKlSoBUqVKgFSpUqAVKlSoD/9k\x3d";
        this._logoTexture.width = 160;
        this._logoTexture.height = 200;
        this._bgLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 255));
        this._bgLayer.setPosition(0, 0);
        this.addChild(this._bgLayer, 0);
        this._label = cc.LabelTTF.create("Loading... 0%", "Arial", 14);
        this._label.setColor(cc.c3(180, 180, 180));
        this._label.setPosition(cc.pAdd(a, cc.p(0, -110)));
        this._bgLayer.addChild(this._label, 10)
    },
    _initStage: function(a) {
        this._texture2d = new cc.Texture2D;
        this._texture2d.initWithElement(this._logoTexture);
        this._texture2d.handleLoadedTexture();
        this._logo = cc.Sprite.createWithTexture(this._texture2d);
        this._logo.setScale(cc.CONTENT_SCALE_FACTOR());
        this._logo.setPosition(a);
        this._bgLayer.addChild(this._logo, 10)
    },
    onEnter: function() {
        cc.Node.prototype.onEnter.call(this);
        this.schedule(this._startLoading, 0.3)
    },
    onExit: function() {
        cc.Node.prototype.onExit.call(this);
        this._label.setString("Loading... 0%")
    },
    initWithResources: function(a, b, c) {
        this.resources = a;
        this.selector = b;
        this.target = c
    },
    _startLoading: function() {
        this.unschedule(this._startLoading);
        cc.Loader.preload(this.resources,
            this.selector, this.target);
        this.schedule(this._updatePercent)
    },
    _updatePercent: function() {
        var a = cc.Loader.getInstance().getPercentage();
        this._label.setString("Loading... " + a + "%");
        100 <= a && this.unschedule(this._updatePercent)
    }
});
cc.LoaderScene.preload = function(a, b, c) {
    this._instance || (this._instance = new cc.LoaderScene, this._instance.init());
    this._instance.initWithResources(a, b, c);
    a = cc.Director.getInstance();
    a.getRunningScene() ? a.replaceScene(this._instance) : a.runWithScene(this._instance);
    return this._instance
};
cc.TARGET_PLATFORM = {
    WINDOWS: 0,
    LINUX: 1,
    MACOS: 2,
    ANDROID: 3,
    IPHONE: 4,
    IPAD: 5,
    BLACKBERRY: 6,
    NACL: 7,
    EMSCRIPTEN: 8,
    MOBILE_BROWSER: 100,
    PC_BROWSER: 101
};
cc.ORIENTATION_PORTRAIT = 0;
cc.ORIENTATION_PORTRAIT_UPSIDE_DOWN = 1;
cc.ORIENTATION_LANDSCAPE_LEFT = 2;
cc.ORIENTATION_LANDSCAPE_RIGHT = 3;
cc.CANVAS = 0;
cc.WEBGL = 1;
cc.drawingUtil = null;
cc.renderContext = null;
cc.canvas = null;
cc.gameDiv = null;
cc.renderContextType = cc.CANVAS;
cc.originalCanvasSize = cc.size(0, 0);
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
}();
window.console || (window.console = {}, window.console.log = function() {}, window.console.assert = function() {});
cc.isAddedHiddenEvent = !1;
cc.setup = function(a, b, c) {
    function d() {
        if (cc.AudioEngine) {
            var a = cc.AudioEngine.getInstance();
            document[h] ? a._pausePlaying() : (cc.Director.getInstance()._resetLastUpdate(), a._resumePlaying())
        }
    }
    a = cc.$(a) || cc.$("#" + a);
    var e, f, g;
    "CANVAS" == a.tagName ? (b = b || a.width, c = c || a.height, f = cc.container = cc.$new("DIV"), g = f.style, e = cc.canvas = a, e.parentNode.insertBefore(f, e), e.appendTo(f), g.width = (b || 480) + "px", g.height = (c || 320) + "px", f.setAttribute("id", "Cocos2dGameContainer"), g.margin = "0 auto", e.setAttribute("width", b ||
        480), e.setAttribute("height", c || 320)) : ("DIV" != a.tagName && cc.log("Warning: target element is not a DIV or CANVAS"), b = b || a.clientWidth, c = c || a.clientHeight, e = cc.canvas = cc.$new("CANVAS"), e.addClass("gameCanvas"), e.setAttribute("width", b || 480), e.setAttribute("height", c || 320), f = cc.container = a, g = f.style, a.appendChild(e), g.width = (b || 480) + "px", g.height = (c || 320) + "px", g.margin = "0 auto");
    g.position = "relative";
    g.overflow = "hidden";
    f.top = "100%";
    if (!cc.__renderDoesnotSupport) {
        cc.Browser.supportWebGL && (cc.renderContext =
            cc.webglContext = cc.create3DContext(e, {
                stencil: !0,
                preserveDrawingBuffer: !0,
                antialias: !cc.Browser.isMobile,
                alpha: !1
            }));
        cc.renderContext ? (cc.renderContextType = cc.WEBGL, window.gl = cc.renderContext, cc.drawingUtil = new cc.DrawingPrimitiveWebGL(cc.renderContext), cc.TextureCache.getInstance()._initializingRenderer()) : (cc.renderContext = e.getContext("2d"), cc.mainRenderContextBackup = cc.renderContext, cc.renderContextType = cc.CANVAS, cc.renderContext.translate(0, e.height), cc.drawingUtil = cc.DrawingPrimitiveCanvas ?
            new cc.DrawingPrimitiveCanvas(cc.renderContext) : null);
        cc.originalCanvasSize = cc.size(e.width, e.height);
        cc.gameDiv = f;
        cc.log(cc.ENGINE_VERSION);
        cc.Configuration.getInstance();
        cc.setContextMenuEnable(!1);
        cc.Browser.isMobile && cc._addUserSelectStatus();
        var h, k;
        "undefined" !== typeof document.hidden ? (h = "hidden", k = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (h = "mozHidden", k = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (h = "msHidden", k = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden &&
            (h = "webkitHidden", k = "webkitvisibilitychange");
        "undefined" === typeof document.addEventListener || "undefined" === typeof h ? (cc.isAddedHiddenEvent = !1, window.addEventListener("focus", function() {
            cc.AudioEngine && cc.AudioEngine.getInstance()._resumePlaying()
        }, !1), window.addEventListener("blur", function() {
            cc.AudioEngine && cc.AudioEngine.getInstance()._pausePlaying()
        }, !1)) : (cc.isAddedHiddenEvent = !0, document.addEventListener(k, d, !1))
    }
};
cc._addUserSelectStatus = function() {
    var a = document.createElement("style");
    a.type = "text/css";
    document.body.appendChild(a);
    a.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}"
};
cc._isContextMenuEnable = !1;
cc.setContextMenuEnable = function(a) {
    cc._isContextMenuEnable = a;
    cc.canvas.oncontextmenu = cc._isContextMenuEnable ? function() {} : function() {
        return !1
    }
};
cc.Application = cc.Class.extend({
    _animationInterval: null,
    ctor: function() {
        this._animationInterval = 0;
        if (cc._sharedApplication) throw "Application has been initialized";
        cc._sharedApplication = this
    },
    setAnimationInterval: function(a) {
        this._animationInterval = a
    },
    statusBarFrame: function(a) {
        a && cc.rect(0, 0, 0, 0)
    },
    getTargetPlatform: function() {
        return cc.Browser.isMobile ? cc.TARGET_PLATFORM.MOBILE_BROWSER : cc.TARGET_PLATFORM.PC_BROWSER
    },
    run: function() {
        if (!this.applicationDidFinishLaunching()) return 0;
        var a, b = cc.Director.getInstance(),
            c = window;
        cc.director = b;
        c.requestAnimFrame && this._animationInterval == 1 / 60 ? (a = function() {
            b.mainLoop();
            c.requestAnimFrame(a)
        }, c.requestAnimFrame(a)) : (a = function() {
            b.mainLoop()
        }, setInterval(a, 1E3 * this._animationInterval));
        return 0
    }
});
cc.Application.getInstance = function() {
    return cc._sharedApplication
};
cc.Application.getCurrentLanguage = function() {
    var a = cc.LANGUAGE_ENGLISH,
        b = navigator.language;
    b || (b = navigator.browserLanguage || navigator.userLanguage);
    if (!b) return a;
    b = b.toLowerCase();
    switch (b) {
        case "zh-cn":
            a = cc.LANGUAGE_CHINESE;
            break;
        case "fr":
            a = cc.LANGUAGE_FRENCH;
            break;
        case "it":
            a = cc.LANGUAGE_ITALIAN;
            break;
        case "de":
            a = cc.LANGUAGE_GERMAN;
            break;
        case "es":
            a = cc.LANGUAGE_SPANISH;
            break;
        case "ru":
            a = cc.LANGUAGE_RUSSIAN;
            break;
        case "ko":
            a = cc.LANGUAGE_KOREAN;
            break;
        case "ja":
            a = cc.LANGUAGE_JAPANESE;
            break;
        case "hu":
            a =
                cc.LANGUAGE_HUNGARIAN;
            break;
        case "pt":
            a = cc.LANGUAGE_PORTUGUESE;
            break;
        case "ar":
            a = cc.LANGUAGE_ARABIC;
            break;
        case "no":
            a = cc.LANGUAGE_NORWEGIAN;
            break;
        case "pl":
            a = cc.LANGUAGE_POLISH
    }
    return a
};
cc._sharedApplication = null;
cc.SAXParser = cc.Class.extend({
    xmlDoc: null,
    _parser: null,
    _xmlDict: null,
    _isSupportDOMParser: null,
    ctor: function() {
        this._xmlDict = {};
        window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
    },
    parse: function(a) {
        var b = a;
        a = this.getList(a);
        a = this._parserXML(a, b).documentElement;
        if ("plist" != a.tagName) throw "cocos2d: " + b + " is not a plist file or you forgot to preload the plist file";
        for (var b = null, c = 0, d = a.childNodes.length; c < d && (b = a.childNodes[c], 1 != b.nodeType); c++);
        return this._parseNode(b)
    },
    tmxParse: function(a, b) {
        if (null == b || !1 === b) a = this.getList(a);
        return this._parserXML(a)
    },
    _parserXML: function(a, b) {
        var c;
        this._isSupportDOMParser ? c = this._parser.parseFromString(a, "text/xml") : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a));
        null == c && cc.log("cocos2d:xml " + b + " not found!");
        return c
    },
    _parseNode: function(a) {
        var b = null;
        switch (a.tagName) {
            case "dict":
                b = this._parseDict(a);
                break;
            case "array":
                b = this._parseArray(a);
                break;
            case "string":
                if (1 == a.childNodes.length) b =
                    a.firstChild.nodeValue;
                else
                    for (var b = "", c = 0; c < a.childNodes.length; c++) b += a.childNodes[c].nodeValue;
                break;
            case "false":
                b = !1;
                break;
            case "true":
                b = !0;
                break;
            case "real":
                b = parseFloat(a.firstChild.nodeValue);
                break;
            case "integer":
                b = parseInt(a.firstChild.nodeValue, 10)
        }
        return b
    },
    _parseArray: function(a) {
        for (var b = [], c = 0, d = a.childNodes.length; c < d; c++) {
            var e = a.childNodes[c];
            1 == e.nodeType && b.push(this._parseNode(e))
        }
        return b
    },
    _parseDict: function(a) {
        for (var b = {}, c = null, d = 0, e = a.childNodes.length; d < e; d++) {
            var f =
                a.childNodes[d];
            1 == f.nodeType && ("key" == f.tagName ? c = f.firstChild.nodeValue : b[c] = this._parseNode(f))
        }
        return b
    },
    preloadPlist: function(a) {
        a = cc.FileUtils.getInstance().fullPathForFilename(a);
        if (window.XMLHttpRequest) {
            var b = new XMLHttpRequest;
            b.overrideMimeType && b.overrideMimeType("text/xml")
        }
        if (null != b) {
            var c = this;
            b.onreadystatechange = function() {
                4 == b.readyState && (b.responseText ? (cc.Loader.getInstance().onResLoaded(), c._xmlDict[a] = b.responseText, b = null) : (cc.Loader.getInstance().onResLoaded(), cc.log("cocos2d:There was a problem retrieving the xml data:" +
                    b.statusText)))
            };
            b.open("GET", a, !0);
            b.send(null)
        } else throw "cocos2d:Your browser does not support XMLHTTP.";
    },
    unloadPlist: function(a) {
        this._xmlDict[a] && delete this._xmlDict[a]
    },
    getName: function(a) {
        var b = a.lastIndexOf("/", a.length) + 1,
            c = a.lastIndexOf(".", a.length);
        return a.substring(b, c)
    },
    getExt: function(a) {
        var b = a.lastIndexOf(".", a.length) + 1;
        return a.substring(b, a.length)
    },
    getList: function(a) {
        return null != this._xmlDict ? this._xmlDict[a] : null
    }
});
cc.SAXParser.getInstance = function() {
    this._instance || (this._instance = new cc.SAXParser);
    return this._instance
};
cc.SAXParser._instance = null;
cc.AppController = cc.Class.extend({
    didFinishLaunchingWithOptions: function() {
        cc.Application.getInstance().run();
        return !0
    },
    applicationWillResignActive: function() {
        cc.Director.getInstance().pause()
    },
    applicationDidBecomeActive: function() {
        cc.Director.getInstance().resume()
    },
    applicationDidEnterBackground: function() {
        cc.Application.getInstance().applicationDidEnterBackground()
    },
    applicationWillEnterForeground: function() {
        cc.Application.getInstance().applicationWillEnterForeground()
    },
    applicationWillTerminate: function() {}
});
cc.AppController.shareAppController = function() {
    null == cc.sharedAppController && (cc.sharedAppController = new cc.AppController);
    if (!cc.sharedAppController) throw "Application initialize failure";
    return cc.sharedAppController
};
cc.sharedAppController = null;
cc.LabelTTF = cc.Sprite.extend({
    _dimensions: null,
    _hAlignment: cc.TEXT_ALIGNMENT_CENTER,
    _vAlignment: cc.VERTICAL_TEXT_ALIGNMENT_TOP,
    _fontName: null,
    _fontSize: 0,
    _string: "",
    _originalText: null,
    _isMultiLine: !1,
    _fontStyleStr: null,
    _shadowEnabled: !1,
    _shadowOffset: null,
    _shadowOpacity: 0,
    _shadowBlur: 0,
    _shadowColorStr: null,
    _strokeEnabled: !1,
    _strokeColor: null,
    _strokeSize: 0,
    _strokeColorStr: null,
    _textFillColor: null,
    _fillColorStr: null,
    _strokeShadowOffsetX: 0,
    _strokeShadowOffsetY: 0,
    _needUpdateTexture: !1,
    _labelCanvas: null,
    _labelContext: null,
    _lineWidths: null,
    ctor: function() {
        cc.Sprite.prototype.ctor.call(this);
        this._dimensions = cc.SizeZero();
        this._hAlignment = cc.TEXT_ALIGNMENT_LEFT;
        this._vAlignment = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
        this._opacityModifyRGB = !1;
        this._fontStyleStr = "";
        this._fontName = "Arial";
        this._shadowEnabled = this._isMultiLine = !1;
        this._shadowOffset = cc.SizeZero();
        this._shadowBlur = this._shadowOpacity = 0;
        this._shadowColorStr = "rgba(128, 128, 128, 0.5)";
        this._strokeEnabled = !1;
        this._strokeColor = cc.white();
        this._strokeSize =
            0;
        this._strokeColorStr = "";
        this._textFillColor = cc.white();
        this._fillColorStr = "rgba(255,255,255,1)";
        this._strokeShadowOffsetY = this._strokeShadowOffsetX = 0;
        this._needUpdateTexture = !1;
        this._lineWidths = [];
        this._setColorsString()
    },
    init: function() {
        return this.initWithString(" ", this._fontName, this._fontSize)
    },
    _measureConfig: function() {
        this._getLabelContext().font = this._fontStyleStr
    },
    _measure: function(a) {
        return this._getLabelContext().measureText(a).width
    },
    _checkNextline: function(a, b) {
        var c = this._measure(a),
            d = Math.floor(a.length * b / c),
            e = a.indexOf("\n");
        if (0.8 * d >= e && 0 < e) return e + 1;
        if (c < b) return a.length;
        for (var c = !1, f = b + 1, e = -1, g = d, h, k = cc.LabelTTF._checkRegEx, m = cc.LabelTTF._reverseCheckRegEx, n = cc.LabelTTF._checkEnRegEx, p = a.substr(d); h = k.exec(p);) {
            g += h[0].length;
            f = a.substr(0, g);
            f = this._measure(f);
            if ("\n" == h[2] && f < b) {
                c = !0;
                e = g;
                break
            }
            if (f > b) {
                -1 != e && (c = !0);
                break
            }
            e = g;
            p = a.substr(g)
        }
        if (c) return e;
        p = a.substr(0, d);
        for (e = d; h = m.exec(p);)
            if (e = h[1].length, p = h[1], f = this._measure(p), f < b) {
                n.test(h[2]) && e++;
                break
            }
        return e ||
            1
    },
    description: function() {
        return "\x3ccc.LabelTTF | FontName \x3d" + this._fontName + " FontSize \x3d " + this._fontSize.toFixed(1) + "\x3e"
    },
    setColor: null,
    _setColorForCanvas: function(a) {
        cc.NodeRGBA.prototype.setColor.call(this, a);
        this._setColorsStringForCanvas()
    },
    _setColorsString: null,
    _setColorsStringForCanvas: function() {
        this._needUpdateTexture = !0;
        var a = this._displayedColor,
            b = this._displayedOpacity,
            c = this._strokeColor,
            d = this._textFillColor;
        this._shadowColorStr = "rgba(" + (0 | 0.5 * a.r) + "," + (0 | 0.5 * a.g) + "," + (0 | 0.5 *
            a.b) + "," + this._shadowOpacity + ")";
        this._fillColorStr = "rgba(" + (0 | a.r / 255 * d.r) + "," + (0 | a.g / 255 * d.g) + "," + (0 | a.b / 255 * d.b) + ", " + b / 255 + ")";
        this._strokeColorStr = "rgba(" + (0 | a.r / 255 * c.r) + "," + (0 | a.g / 255 * c.g) + "," + (0 | a.b / 255 * c.b) + ", " + b / 255 + ")"
    },
    _setColorsStringForWebGL: function() {
        this._needUpdateTexture = !0;
        var a = this._strokeColor,
            b = this._textFillColor;
        this._shadowColorStr = "rgba(128,128,128," + this._shadowOpacity + ")";
        this._fillColorStr = "rgba(" + (0 | b.r) + "," + (0 | b.g) + "," + (0 | b.b) + ", 1)";
        this._strokeColorStr = "rgba(" +
            (0 | a.r) + "," + (0 | a.g) + "," + (0 | a.b) + ", 1)"
    },
    updateDisplayedColor: null,
    _updateDisplayedColorForCanvas: function(a) {
        cc.NodeRGBA.prototype.updateDisplayedColor.call(this, a);
        this._setColorsString()
    },
    setOpacity: null,
    _setOpacityForCanvas: function(a) {
        this._opacity !== a && (cc.Sprite.prototype.setOpacity.call(this, a), this._setColorsString(), this._needUpdateTexture = !0)
    },
    updateDisplayedOpacity: null,
    updateDisplayedOpacityForCanvas: function(a) {
        cc.NodeRGBA.prototype.updateDisplayedOpacity.call(this, a);
        this._setColorsString()
    },
    getString: function() {
        return this._string
    },
    getHorizontalAlignment: function() {
        return this._hAlignment
    },
    getVerticalAlignment: function() {
        return this._vAlignment
    },
    getDimensions: function() {
        return cc.size(this._dimensions.width, this._dimensions.height)
    },
    getFontSize: function() {
        return this._fontSize
    },
    getFontName: function() {
        return this._fontName
    },
    initWithString: function(a, b, c, d, e, f) {
        a = a ? a + "" : "";
        c = c || 16;
        d = d || cc.size(0, c);
        e = e || cc.TEXT_ALIGNMENT_LEFT;
        f = f || cc.VERTICAL_TEXT_ALIGNMENT_TOP;
        return cc.Sprite.prototype.init.call(this) ?
            (this._opacityModifyRGB = !1, this._dimensions = cc.size(d.width, d.height), this._fontName = b || "Arial", this._hAlignment = e, this._vAlignment = f, this._fontSize = c, this._fontStyleStr = this._fontSize + "px '" + b + "'", this._fontClientHeight = cc.LabelTTF.__getFontHeightByDiv(b, this._fontSize), this.setString(a), this._setColorsString(), this._updateTexture(), this._needUpdateTexture = !1, !0) : !1
    },
    initWithStringAndTextDefinition: null,
    _initWithStringAndTextDefinitionForCanvas: function(a, b) {
        if (!cc.Sprite.prototype.init.call(this)) return !1;
        this._updateWithTextDefinition(b, !1);
        this.setString(a);
        return !0
    },
    _initWithStringAndTextDefinitionForWebGL: function(a, b) {
        if (!cc.Sprite.prototype.init.call(this)) return !1;
        this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.LabelTTF._SHADER_PROGRAM));
        this._updateWithTextDefinition(b, !1);
        this.setString(a);
        return !0
    },
    setTextDefinition: function(a) {
        a && this._updateWithTextDefinition(a, !0)
    },
    getTextDefinition: function() {
        return this._prepareTextDefinition(!1)
    },
    enableShadow: function(a, b, c, d) {
        b =
            b || 0.5;
        !1 === this._shadowEnabled && (this._shadowEnabled = !0);
        if ((d = this._shadowOffset) && d.width != a.width || d.height != a.height) d.width = a.width, d.height = a.height;
        this._shadowOpacity != b && (this._shadowOpacity = b);
        this._setColorsString();
        this._shadowBlur != c && (this._shadowBlur = c);
        this._needUpdateTexture = !0
    },
    disableShadow: function(a) {
        this._shadowEnabled && (this._shadowEnabled = !1, this._needUpdateTexture = !0)
    },
    enableStroke: function(a, b, c) {
        !1 === this._strokeEnabled && (this._strokeEnabled = !0);
        c = this._strokeColor;
        if (c.r !==
            a.r || c.g !== a.g || c.b !== a.b) c.r = a.r, c.g = a.g, c.b = a.b, this._setColorsString();
        this._strokeSize !== b && (this._strokeSize = b || 0);
        this._needUpdateTexture = !0
    },
    disableStroke: function(a) {
        this._strokeEnabled && (this._strokeEnabled = !1, this._needUpdateTexture = !0)
    },
    setFontFillColor: null,
    _setFontFillColorForCanvas: function(a, b) {
        var c = this._textFillColor;
        if (c.r != a.r || c.g != a.g || c.b != a.b) c.r = a.r, c.g = a.g, c.b = a.b, this._setColorsString(), this._needUpdateTexture = !0
    },
    _setFontFillColorForWebGL: function(a, b) {
        var c = this._textFillColor;
        if (c.r != a.r || c.g != a.g || c.b != a.b) c.r = a.r, c.g = a.g, c.b = a.b, this._setColorsString(), this._needUpdateTexture = !0
    },
    _updateWithTextDefinition: function(a, b) {
        a.fontDimensions ? (this._dimensions.width = a.fontDimensions.width, this._dimensions.height = a.fontDimensions.height) : (this._dimensions.width = 0, this._dimensions.height = 0);
        this._hAlignment = a.fontAlignmentH;
        this._vAlignment = a.fontAlignmentV;
        this._fontName = a.fontName;
        this._fontSize = a.fontSize || 12;
        this._fontStyleStr = this._fontSize + "px '" + this._fontName + "'";
        this._fontClientHeight =
            cc.LabelTTF.__getFontHeightByDiv(this._fontName, this._fontSize);
        a.shadowEnabled && this.enableShadow(a.shadowOffset, a.shadowOpacity, a.shadowBlur, !1);
        a.strokeEnabled && this.enableStroke(a.strokeColor, a.strokeSize, !1);
        this.setFontFillColor(a.fontFillColor, !1);
        b && this._updateTexture()
    },
    _prepareTextDefinition: function(a) {
        var b = new cc.FontDefinition;
        a ? (b.fontSize = this._fontSize, b.fontDimensions = cc.SIZE_POINTS_TO_PIXELS(this._dimensions)) : (b.fontSize = this._fontSize, b.fontDimensions = cc.size(this._dimensions.width,
            this._dimensions.height));
        b.fontName = this._fontName;
        b.fontAlignmentH = this._hAlignment;
        b.fontAlignmentV = this._vAlignment;
        if (this._strokeEnabled) {
            b.strokeEnabled = !0;
            var c = this._strokeColor;
            b.strokeColor = new cc.Color3B(c.r, c.g, c.b);
            b.strokeSize = this._strokeSize
        } else b.strokeEnabled = !1;
        this._shadowEnabled ? (b.shadowEnabled = !0, b.shadowBlur = this._shadowBlur, b.shadowOpacity = this._shadowOpacity, b.shadowOffset = a ? cc.SIZE_POINTS_TO_PIXELS(this._shadowOffset) : cc.size(this._shadowOffset.width, this._shadowOffset.height)) :
            b._shadowEnabled = !1;
        a = this._textFillColor;
        b.fontFillColor = new cc.Color3B(a.r, a.g, a.b);
        return b
    },
    _fontClientHeight: 18,
    setString: function(a) {
        a = String(a);
        this._originalText != a && (this._originalText = a + "", this._updateString(), this._needUpdateTexture = !0)
    },
    _updateString: function() {
        this._string = this._originalText
    },
    setHorizontalAlignment: function(a) {
        a !== this._hAlignment && (this._hAlignment = a, this._needUpdateTexture = !0)
    },
    setVerticalAlignment: function(a) {
        a != this._vAlignment && (this._vAlignment = a, this._needUpdateTexture = !0)
    },
    setDimensions: function(a) {
        if (a.width != this._dimensions.width || a.height != this._dimensions.height) this._dimensions = a, this._updateString(), this._needUpdateTexture = !0
    },
    setFontSize: function(a) {
        this._fontSize !== a && (this._fontSize = a, this._fontStyleStr = a + "px '" + this._fontName + "'", this._fontClientHeight = cc.LabelTTF.__getFontHeightByDiv(this._fontName, a), this._needUpdateTexture = !0)
    },
    setFontName: function(a) {
        this._fontName && this._fontName != a && (this._fontName = a, this._fontStyleStr = this._fontSize + "px '" + a +
            "'", this._fontClientHeight = cc.LabelTTF.__getFontHeightByDiv(a, this._fontSize), this._needUpdateTexture = !0)
    },
    _drawTTFInCanvas: function(a) {
        if (a) {
            var b = this._strokeShadowOffsetX,
                c = this._strokeShadowOffsetY,
                d = this._contentSize._height - c,
                e = this._vAlignment,
                f = this._hAlignment,
                g = this._fontClientHeight,
                h = this._strokeSize;
            a.setTransform(1, 0, 0, 1, 0 + 0.5 * b, d + 0.5 * c);
            a.font != this._fontStyleStr && (a.font = this._fontStyleStr);
            a.fillStyle = this._fillColorStr;
            var k = c = 0,
                m = this._strokeEnabled;
            m && (a.lineWidth = 2 * h, a.strokeStyle =
                this._strokeColorStr);
            this._shadowEnabled && (h = this._shadowOffset, a.shadowColor = this._shadowColorStr, a.shadowOffsetX = h.width, a.shadowOffsetY = -h.height, a.shadowBlur = this._shadowBlur);
            a.textBaseline = cc.LabelTTF._textBaseline[e];
            a.textAlign = cc.LabelTTF._textAlign[f];
            b = this._contentSize._width - b;
            c = f === cc.TEXT_ALIGNMENT_RIGHT ? c + b : f === cc.TEXT_ALIGNMENT_CENTER ? c + b / 2 : c + 0;
            if (this._isMultiLine)
                for (f = this._strings.length, e === cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM ? k = g + d - g * f : e === cc.VERTICAL_TEXT_ALIGNMENT_CENTER && (k =
                    g / 2 + (d - g * f) / 2), e = 0; e < f; e++) b = this._strings[e], h = -d + g * e + k, m && a.strokeText(b, c, h), a.fillText(b, c, h);
            else e !== cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM && (k = e === cc.VERTICAL_TEXT_ALIGNMENT_TOP ? k - d : k - 0.5 * d), m && a.strokeText(this._string, c, k), a.fillText(this._string, c, k)
        }
    },
    _getLabelContext: function() {
        if (this._labelContext) return this._labelContext;
        if (!this._labelCanvas) {
            var a = document.createElement("canvas"),
                b = new cc.Texture2D;
            b.initWithElement(a);
            this.setTexture(b);
            this._labelCanvas = a
        }
        return this._labelContext =
            this._labelCanvas.getContext("2d")
    },
    _updateTTF: function() {
        var a = this._dimensions.width,
            b, c, d = this._lineWidths;
        d.length = 0;
        this._isMultiLine = !1;
        this._measureConfig();
        if (0 !== a) {
            var e = this._string;
            this._strings = [];
            b = 0;
            for (c = this._string.length; b < c;) {
                var f = this._checkNextline(e.substr(b), a),
                    g = e.substr(b, f);
                this._strings.push(g);
                b += f
            }
        } else
            for (this._strings = this._string.split("\n"), b = 0, c = this._strings.length; b < c; b++) d.push(this._measure(this._strings[b]));
        0 < this._strings.length && (this._isMultiLine = !0);
        c = b = 0;
        this._strokeEnabled && (b = c = 2 * this._strokeSize);
        this._shadowEnabled && (e = this._shadowOffset, b += 2 * Math.abs(e.width), c += 2 * Math.abs(e.height));
        a = 0 === a ? this._isMultiLine ? cc.size(0 | Math.max.apply(Math, d) + b, 0 | this._fontClientHeight * this._strings.length + c) : cc.size(0 | this._measure(this._string) + b, 0 | this._fontClientHeight + c) : 0 === this._dimensions.height ? this._isMultiLine ? cc.size(0 | a + b, 0 | this._fontClientHeight * this._strings.length + c) : cc.size(0 | a + b, 0 | this._fontClientHeight + c) : cc.size(0 | a + b, 0 | this._dimensions.height +
            c);
        this.setContentSize(a);
        this._strokeShadowOffsetX = b;
        this._strokeShadowOffsetY = c;
        d = this._anchorPoint;
        this._anchorPointInPoints._x = 0.5 * b + (a.width - b) * d._x;
        this._anchorPointInPoints._y = 0.5 * c + (a.height - c) * d._y
    },
    getContentSize: function() {
        this._needUpdateTexture && this._updateTTF();
        return cc.Sprite.prototype.getContentSize.call(this)
    },
    _updateTexture: function() {
        var a = this._getLabelContext(),
            b = this._labelCanvas,
            c = this._contentSize;
        if (0 === this._string.length) return b.width = 1, b.height = c._height, this.setTextureRect(cc.rect(0,
            0, 1, c._height)), !0;
        a.font = this._fontStyleStr;
        this._updateTTF();
        var d = c._width,
            c = c._height,
            e = b.width == d && b.height == c;
        b.width = d;
        b.height = c;
        e && a.clearRect(0, 0, d, c);
        this._drawTTFInCanvas(a);
        this._texture.handleLoadedTexture();
        this.setTextureRect(cc.rect(0, 0, d, c));
        return !0
    },
    visit: function(a) {
        this._string && "" != this._string && (this._needUpdateTexture && (this._needUpdateTexture = !1, this._updateTexture()), cc.Sprite.prototype.visit.call(this, a || cc.renderContext))
    },
    draw: null,
    _drawForWebGL: function(a) {
        if (this._string &&
            "" != this._string) {
            a = a || cc.renderContext;
            var b = this._texture;
            b && b._isLoaded && (this._shaderProgram.use(), this._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4(), cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst), cc.glBindTexture2D(b), cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSCOLORTEX), a.bindBuffer(a.ARRAY_BUFFER, this._quadWebBuffer), this._quadDirty && (a.bufferData(a.ARRAY_BUFFER, this._quad.arrayBuffer, a.STATIC_DRAW), this._quadDirty = !1), a.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION,
                3, a.FLOAT, !1, 24, 0), a.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, a.FLOAT, !1, 24, 16), a.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, a.UNSIGNED_BYTE, !0, 24, 12), a.drawArrays(a.TRIANGLE_STRIP, 0, 4));
            1 === cc.SPRITE_DEBUG_DRAW ? (a = this._quad, a = [cc.p(a.tl.vertices.x, a.tl.vertices.y), cc.p(a.bl.vertices.x, a.bl.vertices.y), cc.p(a.br.vertices.x, a.br.vertices.y), cc.p(a.tr.vertices.x, a.tr.vertices.y)], cc.drawingUtil.drawPoly(a, 4, !0)) : 2 === cc.SPRITE_DEBUG_DRAW && (a = this.getTextureRect()._size, b = this.getOffsetPosition(),
                a = [cc.p(b.x, b.y), cc.p(b.x + a.width, b.y), cc.p(b.x + a.width, b.y + a.height), cc.p(b.x, b.y + a.height)], cc.drawingUtil.drawPoly(a, 4, !0));
            cc.g_NumberOfDraws++
        }
    },
    _setTextureRectForCanvas: function(a, b, c) {
        this._rectRotated = b || !1;
        c = c || a._size;
        this.setContentSize(c);
        this.setVertexRect(a);
        b = this._textureRect_Canvas;
        b.x = a.x;
        b.y = a.y;
        b.width = a.width;
        b.height = a.height;
        b.validRect = !(0 === b.width || 0 === b.height || 0 > b.x || 0 > b.y);
        a = this._unflippedOffsetPositionFromCenter;
        this._flippedX && (a._x = -a._x);
        this._flippedY && (a._y = -a._y);
        this._offsetPosition._x = a.x + (this._contentSize._width - this._rect.width) / 2;
        this._offsetPosition._y = a.y + (this._contentSize._height - this._rect.height) / 2;
        this._batchNode && (this._dirty = !0)
    },
    _setTextureCoords: function(a) {
        var b = this._batchNode ? this._textureAtlas.getTexture() : this._texture;
        if (b) {
            var c = b.getPixelsWide(),
                d = b.getPixelsHigh(),
                e, f = this._quad;
            this._rectRotated ? (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (b = (2 * a.x + 1) / (2 * c), c = b + (2 * a.height - 2) / (2 * c), e = (2 * a.y + 1) / (2 * d), a = e + (2 * a.width - 2) / (2 * d)) : (b = a.x / c, c =
                (a.x + a.height) / c, e = a.y / d, a = (a.y + a.width) / d), this._flippedX && (d = e, e = a, a = d), this._flippedY && (d = b, b = c, c = d), f.bl.texCoords.u = b, f.bl.texCoords.v = e, f.br.texCoords.u = b, f.br.texCoords.v = a, f.tl.texCoords.u = c, f.tl.texCoords.v = e, f.tr.texCoords.u = c, f.tr.texCoords.v = a) : (cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (b = (2 * a.x + 1) / (2 * c), c = b + (2 * a.width - 2) / (2 * c), e = (2 * a.y + 1) / (2 * d), a = e + (2 * a.height - 2) / (2 * d)) : (b = a.x / c, c = (a.x + a.width) / c, e = a.y / d, a = (a.y + a.height) / d), this._flippedX && (d = b, b = c, c = d), this._flippedY && (d = e, e = a, a = d), f.bl.texCoords.u =
                b, f.bl.texCoords.v = a, f.br.texCoords.u = c, f.br.texCoords.v = a, f.tl.texCoords.u = b, f.tl.texCoords.v = e, f.tr.texCoords.u = c, f.tr.texCoords.v = e);
            this._quadDirty = !0
        }
    }
});
cc.Browser.supportWebGL ? (cc.LabelTTF.prototype.setColor = cc.Sprite.prototype.setColor, cc.LabelTTF.prototype._setColorsString = cc.LabelTTF.prototype._setColorsStringForWebGL, cc.LabelTTF.prototype.updateDisplayedColor = cc.Sprite.prototype.updateDisplayedColor, cc.LabelTTF.prototype.setOpacity = cc.Sprite.prototype.setOpacity, cc.LabelTTF.prototype.updateDisplayedOpacity = cc.Sprite.prototype.updateDisplayedOpacity, cc.LabelTTF.prototype.initWithStringAndTextDefinition = cc.LabelTTF.prototype._initWithStringAndTextDefinitionForWebGL,
    cc.LabelTTF.prototype.setFontFillColor = cc.LabelTTF.prototype._setFontFillColorForWebGL, cc.LabelTTF.prototype.draw = cc.LabelTTF.prototype._drawForWebGL, cc.LabelTTF.prototype.setTextureRect = cc.Sprite.prototype._setTextureRectForWebGL) : (cc.LabelTTF.prototype.setColor = cc.LabelTTF.prototype._setColorForCanvas, cc.LabelTTF.prototype._setColorsString = cc.LabelTTF.prototype._setColorsStringForCanvas, cc.LabelTTF.prototype.updateDisplayedColor = cc.LabelTTF.prototype._updateDisplayedColorForCanvas, cc.LabelTTF.prototype.setOpacity =
    cc.LabelTTF.prototype._setOpacityForCanvas, cc.LabelTTF.prototype.updateDisplayedOpacity = cc.LabelTTF.prototype._updateDisplayedOpacityForCanvas, cc.LabelTTF.prototype.initWithStringAndTextDefinition = cc.LabelTTF.prototype._initWithStringAndTextDefinitionForCanvas, cc.LabelTTF.prototype.setFontFillColor = cc.LabelTTF.prototype._setFontFillColorForCanvas, cc.LabelTTF.prototype.draw = cc.Sprite.prototype.draw, cc.LabelTTF.prototype.setTextureRect = cc.LabelTTF.prototype._setTextureRectForCanvas);
cc.LabelTTF._textAlign = ["left", "center", "right"];
cc.LabelTTF._textBaseline = ["top", "middle", "bottom"];
cc.LabelTTF._checkRegEx = /(.+?)([\s\n\r\-\/\\\:]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0])/;
cc.LabelTTF._reverseCheckRegEx = /(.*)([\s\n\r\-\/\\\:]|[\u4E00-\u9FA5]|[\uFE30-\uFFA0])/;
cc.LabelTTF._checkEnRegEx = /[\s\-\/\\\:]/;
cc.LabelTTF.create = function(a, b, c, d, e, f) {
    var g = new cc.LabelTTF;
    return g.initWithString(a, b, c, d, e, f) ? g : null
};
cc.LabelTTF.createWithFontDefinition = function(a, b) {
    var c = new cc.LabelTTF;
    return c && c.initWithStringAndTextDefinition(a, b) ? c : null
};
cc.LabelTTF._SHADER_PROGRAM = cc.USE_LA88_LABELS ? cc.SHADER_POSITION_TEXTURECOLOR : cc.SHADER_POSITION_TEXTUREA8COLOR;
cc.LabelTTF.__labelHeightDiv = document.createElement("div");
cc.LabelTTF.__labelHeightDiv.style.fontFamily = "Arial";
cc.LabelTTF.__labelHeightDiv.style.position = "absolute";
cc.LabelTTF.__labelHeightDiv.style.left = "-100px";
cc.LabelTTF.__labelHeightDiv.style.top = "-100px";
cc.LabelTTF.__labelHeightDiv.style.lineHeight = "normal";
document.body.appendChild(cc.LabelTTF.__labelHeightDiv);
cc.LabelTTF.__getFontHeightByDiv = function(a, b) {
    var c = cc.LabelTTF.__fontHeightCache[a + "." + b];
    if (0 < c) return c;
    var d = cc.LabelTTF.__labelHeightDiv;
    d.innerHTML = "ajghl~!";
    d.style.fontFamily = a;
    d.style.fontSize = b + "px";
    c = d.clientHeight;
    cc.LabelTTF.__fontHeightCache[a + "." + b] = c;
    d.innerHTML = "";
    return c
};
cc.LabelTTF.__fontHeightCache = {};
cc.HashElement = cc.Class.extend({
    actions: null,
    target: null,
    actionIndex: 0,
    currentAction: null,
    currentActionSalvaged: !1,
    paused: !1,
    hh: null,
    ctor: function() {
        this.actions = [];
        this._target = null;
        this.actionIndex = 0;
        this.currentAction = null;
        this.paused = this.currentActionSalvaged = !1;
        this.hh = null
    }
});
cc.ActionManager = cc.Class.extend({
    _hashTargets: null,
    _arrayTargets: null,
    _currentTarget: null,
    _currentTargetSalvaged: !1,
    _searchElementByTarget: function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (b == a[c].target) return a[c];
        return null
    },
    ctor: function() {
        this._hashTargets = {};
        this._arrayTargets = [];
        this._currentTarget = null;
        this._currentTargetSalvaged = !1
    },
    addAction: function(a, b, c) {
        if (!a) throw "cc.ActionManager.addAction(): action must be non-null";
        if (!b) throw "cc.ActionManager.addAction(): action must be non-null";
        var d =
            this._hashTargets[b.__instanceId];
        d || (d = new cc.HashElement, d.paused = c, d.target = b, this._hashTargets[b.__instanceId] = d, this._arrayTargets.push(d));
        this._actionAllocWithHashElement(d);
        d.actions.push(a);
        a.startWithTarget(b)
    },
    removeAllActions: function() {
        for (var a = this._arrayTargets, b = 0; b < a.length; b++) {
            var c = a[b];
            c && this.removeAllActionsFromTarget(c.target, !0)
        }
    },
    removeAllActionsFromTarget: function(a, b) {
        if (null != a) {
            var c = this._hashTargets[a.__instanceId];
            c && (-1 === c.actions.indexOf(c.currentAction) || c.currentActionSalvaged ||
                (c.currentActionSalvaged = !0), c.actions.length = 0, this._currentTarget != c || b ? this._deleteHashElement(c) : this._currentTargetSalvaged = !0)
        }
    },
    removeAction: function(a) {
        if (null != a) {
            var b = a.getOriginalTarget();
            if (b = this._hashTargets[b.__instanceId])
                for (var c = 0; c < b.actions.length; c++) {
                    if (b.actions[c] == a) {
                        b.actions.splice(c, 1);
                        break
                    }
                } else cc.log("cocos2d: removeAction: Target not found")
        }
    },
    removeActionByTag: function(a, b) {
        a == cc.ACTION_TAG_INVALID && cc.log("cc.ActionManager.removeActionByTag(): an invalid tag");
        if (!b) throw "cc.ActionManager.removeActionByTag(): target must be non-null";
        var c = this._hashTargets[b.__instanceId];
        if (c)
            for (var d = c.actions.length, e = 0; e < d; ++e) {
                var f = c.actions[e];
                if (f && f.getTag() === a && f.getOriginalTarget() == b) {
                    this._removeActionAtIndex(e, c);
                    break
                }
            }
    },
    getActionByTag: function(a, b) {
        a == cc.ACTION_TAG_INVALID && cc.log("cc.ActionManager.getActionByTag(): an invalid tag");
        var c = this._hashTargets[b.__instanceId];
        if (c) {
            if (null != c.actions)
                for (var d = 0; d < c.actions.length; ++d) {
                    var e = c.actions[d];
                    if (e && e.getTag() === a) return e
                }
            cc.log("cocos2d : getActionByTag(tag \x3d" + a + "): Action not found")
        }
        return null
    },
    numberOfRunningActionsInTarget: function(a) {
        return (a = this._hashTargets[a.__instanceId]) ? a.actions ? a.actions.length : 0 : 0
    },
    pauseTarget: function(a) {
        if (a = this._hashTargets[a.__instanceId]) a.paused = !0
    },
    resumeTarget: function(a) {
        if (a = this._hashTargets[a.__instanceId]) a.paused = !1
    },
    pauseAllRunningActions: function() {
        for (var a = [], b = this._arrayTargets, c = 0; c < b.length; c++) {
            var d = b[c];
            d && !d.paused && (d.paused = !0, a.push(d.target))
        }
        return a
    },
    resumeTargets: function(a) {
        if (a)
            for (var b = 0; b < a.length; b++) a[b] && this.resumeTarget(a[b])
    },
    purgeSharedManager: function() {
        cc.Director.getInstance().getScheduler().unscheduleUpdateForTarget(this)
    },
    _removeActionAtIndex: function(a, b) {
        b.actions[a] != b.currentAction || b.currentActionSalvaged || (b.currentActionSalvaged = !0);
        cc.ArrayRemoveObjectAtIndex(b.actions, a);
        b.actionIndex >= a && b.actionIndex--;
        0 == b.actions.length && (this._currentTarget == b ? this._currentTargetSalvaged = !0 : this._deleteHashElement(b))
    },
    _deleteHashElement: function(a) {
        a && (delete this._hashTargets[a.target.__instanceId], cc.ArrayRemoveObject(this._arrayTargets, a), a.actions = null, a.target = null)
    },
    _actionAllocWithHashElement: function(a) {
        null == a.actions && (a.actions = [])
    },
    update: function(a) {
        for (var b = this._arrayTargets, c, d = 0; d < b.length; d++) {
            c = this._currentTarget = b[d];
            if (!c.paused)
                for (c.actionIndex = 0; c.actionIndex < c.actions.length; c.actionIndex++)
                    if (c.currentAction = c.actions[c.actionIndex], c.currentAction) {
                        c.currentActionSalvaged = !1;
                        c.currentAction.step(a);
                        if (c.currentActionSalvaged) c.currentAction = null;
                        else if (c.currentAction.isDone()) {
                            c.currentAction.stop();
                            var e = c.currentAction;
                            c.currentAction = null;
                            this.removeAction(e)
                        }
                        c.currentAction = null
                    }
            this._currentTargetSalvaged && 0 === c.actions.length && this._deleteHashElement(c)
        }
    }
});
cc.IMAGE_FORMAT_JPEG = 0;
cc.IMAGE_FORMAT_PNG = 1;
cc.IMAGE_FORMAT_RAWDATA = 2;
cc.NextPOT = function(a) {
    a -= 1;
    a |= a >> 1;
    a |= a >> 2;
    a |= a >> 4;
    a |= a >> 8;
    return (a | a >> 16) + 1
};
cc.RenderTexture = cc.Node.extend({
    _cacheCanvas: null,
    _cacheContext: null,
    _fBO: 0,
    _depthRenderBuffer: 0,
    _oldFBO: 0,
    _texture: null,
    _textureCopy: null,
    _uITextureImage: null,
    _pixelFormat: cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888,
    _sprite: null,
    _clearFlags: 0,
    _clearColor: null,
    _clearDepth: 0,
    _clearStencil: 0,
    _autoDraw: !1,
    _clearColorStr: null,
    ctor: null,
    _ctorForCanvas: function() {
        cc.Node.prototype.ctor.call(this);
        this._clearColor = cc.c4f(1, 1, 1, 1);
        this._clearColorStr = "rgba(255,255,255,1)";
        this._cacheCanvas = document.createElement("canvas");
        this._cacheContext = this._cacheCanvas.getContext("2d");
        this.setAnchorPoint(0, 0)
    },
    _ctorForWebGL: function() {
        cc.Node.prototype.ctor.call(this);
        this._clearColor = cc.c4f(0, 0, 0, 0)
    },
    cleanup: null,
    _cleanupForCanvas: function() {
        cc.Node.prototype.onExit.call(this);
        this._cacheCanvas = this._cacheContext = null
    },
    _cleanupForWebGL: function() {
        cc.Node.prototype.onExit.call(this);
        this._textureCopy = null;
        var a = cc.renderContext;
        a.deleteFramebuffer(this._fBO);
        this._depthRenderBuffer && a.deleteRenderbuffer(this._depthRenderBuffer);
        this._uITextureImage = null
    },
    getSprite: function() {
        return this._sprite
    },
    setSprite: function(a) {
        this._sprite = a
    },
    initWithWidthAndHeight: null,
    _initWithWidthAndHeightForCanvas: function(a, b, c, d) {
        c = this._cacheCanvas;
        d = cc.CONTENT_SCALE_FACTOR();
        c.width = 0 | a * d;
        c.height = 0 | b * d;
        this._cacheContext.translate(0, c.height);
        a = new cc.Texture2D;
        a.initWithElement(c);
        a.handleLoadedTexture();
        this._sprite = cc.Sprite.createWithTexture(a);
        return !0
    },
    _initWithWidthAndHeightForWebGL: function(a, b, c, d) {
        c == cc.TEXTURE_2D_PIXEL_FORMAT_A8 &&
            cc.log("cc.RenderTexture._initWithWidthAndHeightForWebGL() : only RGB and RGBA formats are valid for a render texture;");
        var e = cc.renderContext,
            f = cc.CONTENT_SCALE_FACTOR();
        a = 0 | a * f;
        b = 0 | b * f;
        this._oldFBO = e.getParameter(e.FRAMEBUFFER_BINDING);
        var g;
        cc.Configuration.getInstance().supportsNPOT() ? (f = a, g = b) : (f = cc.NextPOT(a), g = cc.NextPOT(b));
        for (var h = new Uint8Array(f * g * 4), k = 0; k < f * g * 4; k++) h[k] = 0;
        this._pixelFormat = c;
        this._texture = new cc.Texture2D;
        if (!this._texture) return !1;
        k = this._texture;
        k.initWithData(h,
            this._pixelFormat, f, g, cc.size(a, b));
        c = e.getParameter(e.RENDERBUFFER_BINDING);
        if (cc.Configuration.getInstance().checkForGLExtension("GL_QCOM")) {
            this._textureCopy = new cc.Texture2D;
            if (!this._textureCopy) return !1;
            this._textureCopy.initWithData(h, this._pixelFormat, f, g, cc.size(a, b))
        }
        this._fBO = e.createFramebuffer();
        e.bindFramebuffer(e.FRAMEBUFFER, this._fBO);
        e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, k._webTextureObj, 0);
        0 != d && (this._depthRenderBuffer = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER,
            this._depthRenderBuffer), e.renderbufferStorage(e.RENDERBUFFER, d, f, g), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, this._depthRenderBuffer));
        e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE && cc.log("Could not attach texture to the framebuffer");
        k.setAliasTexParameters();
        a = this._sprite = cc.Sprite.createWithTexture(k);
        a.setScaleY(-1);
        a.setBlendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA);
        e.bindRenderbuffer(e.RENDERBUFFER, c);
        e.bindFramebuffer(e.FRAMEBUFFER, this._oldFBO);
        this._autoDraw = !1;
        this.addChild(a);
        return !0
    },
    begin: null,
    _beginForCanvas: function() {
        cc.renderContext = this._cacheContext;
        cc.EGLView.getInstance()._setScaleXYForRenderTexture()
    },
    _beginForWebGL: function() {
        cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
        cc.kmGLPushMatrix();
        cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
        cc.kmGLPushMatrix();
        var a = cc.Director.getInstance();
        a.setProjection(a.getProjection());
        var b = this._texture.getContentSizeInPixels(),
            c = cc.Director.getInstance().getWinSizeInPixels(),
            a = c.width / b.width,
            c = c.height /
            b.height,
            d = cc.renderContext;
        d.viewport(0, 0, b.width, b.height);
        b = new cc.kmMat4;
        cc.kmMat4OrthographicProjection(b, -1 / a, 1 / a, -1 / c, 1 / c, -1, 1);
        cc.kmGLMultMatrix(b);
        this._oldFBO = d.getParameter(d.FRAMEBUFFER_BINDING);
        d.bindFramebuffer(d.FRAMEBUFFER, this._fBO);
        cc.Configuration.getInstance().checkForGLExtension("GL_QCOM") && (d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_2D, this._textureCopy._webTextureObj, 0), d.clear(d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT), d.framebufferTexture2D(d.FRAMEBUFFER,
            d.COLOR_ATTACHMENT0, d.TEXTURE_2D, this._texture._webTextureObj, 0))
    },
    beginWithClear: function(a, b, c, d, e, f) {
        var g = cc.renderContext;
        e = e || g.COLOR_BUFFER_BIT;
        f = f || g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT;
        this._beginWithClear(a, b, c, d, e, f, g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT | g.STENCIL_BUFFER_BIT)
    },
    _beginWithClear: null,
    _beginWithClearForCanvas: function(a, b, c, d, e, f, g) {
        this.begin();
        a = a || 0;
        b = b || 0;
        c = c || 0;
        d = isNaN(d) ? 1 : d;
        e = this._cacheContext;
        f = this._cacheCanvas;
        e.save();
        e.fillStyle = "rgba(" + (0 | 255 * a) + "," + (0 | 255 * b) +
            "," + (0 | 255 * c) + "," + d + ")";
        e.clearRect(0, 0, f.width, -f.height);
        e.fillRect(0, 0, f.width, -f.height);
        e.restore()
    },
    _beginWithClearForWebGL: function(a, b, c, d, e, f, g) {
        this.begin();
        var h = cc.renderContext,
            k = [0, 0, 0, 0],
            m = 0,
            n = 0;
        g & h.COLOR_BUFFER_BIT && (k = h.getParameter(h.COLOR_CLEAR_VALUE), h.clearColor(a, b, c, d));
        g & h.DEPTH_BUFFER_BIT && (m = h.getParameter(h.DEPTH_CLEAR_VALUE), h.clearDepth(e));
        g & h.STENCIL_BUFFER_BIT && (n = h.getParameter(h.STENCIL_CLEAR_VALUE), h.clearStencil(f));
        h.clear(g);
        g & h.COLOR_BUFFER_BIT && h.clearColor(k[0],
            k[1], k[2], k[3]);
        g & h.DEPTH_BUFFER_BIT && h.clearDepth(m);
        g & h.STENCIL_BUFFER_BIT && h.clearStencil(n)
    },
    end: null,
    _endForCanvas: function() {
        cc.renderContext = cc.mainRenderContextBackup;
        cc.EGLView.getInstance()._resetScale()
    },
    _endForWebGL: function() {
        var a = cc.renderContext,
            b = cc.Director.getInstance();
        a.bindFramebuffer(a.FRAMEBUFFER, this._oldFBO);
        b.setViewport();
        cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
        cc.kmGLPopMatrix();
        cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
        cc.kmGLPopMatrix()
    },
    clear: function(a, b, c, d) {
        this.beginWithClear(a,
            b, c, d);
        this.end()
    },
    clearRect: null,
    _clearRectForCanvas: function(a, b, c, d) {
        this._cacheContext.clearRect(a, b, c, -d)
    },
    _clearRectForWebGL: function(a, b, c, d) {},
    clearDepth: null,
    _clearDepthForCanvas: function(a) {
        cc.log("clearDepth isn't supported on Cocos2d-Html5")
    },
    _clearDepthForWebGL: function(a) {
        this.begin();
        var b = cc.renderContext,
            c = b.getParameter(b.DEPTH_CLEAR_VALUE);
        b.clearDepth(a);
        b.clear(b.DEPTH_BUFFER_BIT);
        b.clearDepth(c);
        this.end()
    },
    clearStencil: null,
    _clearStencilForCanvas: function(a) {
        cc.log("clearDepth isn't supported on Cocos2d-Html5")
    },
    _clearStencilForWebGL: function(a) {
        var b = cc.renderContext,
            c = b.getParameter(b.STENCIL_CLEAR_VALUE);
        b.clearStencil(a);
        b.clear(b.STENCIL_BUFFER_BIT);
        b.clearStencil(c)
    },
    visit: null,
    _visitForCanvas: function(a) {
        this._visible && (a = a || cc.renderContext, a.save(), this.draw(a), this.transform(a), this._sprite.visit(), a.restore(), this._orderOfArrival = 0)
    },
    _visitForWebGL: function(a) {
        if (this._visible) {
            cc.kmGLPushMatrix();
            var b = this._grid;
            b && b.isActive() && (b.beforeDraw(), this.transformAncestors());
            this.transform(a);
            this._sprite.visit();
            this.draw(a);
            b && b.isActive() && b.afterDraw(this);
            cc.kmGLPopMatrix();
            this._orderOfArrival = 0
        }
    },
    draw: null,
    _drawForCanvas: function(a) {
        a = a || cc.renderContext;
        if (this._autoDraw) {
            this.begin();
            if (this._clearFlags) {
                var b = this._cacheCanvas;
                a.save();
                a.fillStyle = this._clearColorStr;
                a.clearRect(0, 0, b.width, -b.height);
                a.fillRect(0, 0, b.width, -b.height);
                a.restore()
            }
            this.sortAllChildren();
            a = this._children;
            for (var b = a.length, c = this._sprite, d = 0; d < b; d++) {
                var e = a[d];
                e != c && e.visit()
            }
            this.end()
        }
    },
    _drawForWebGL: function(a) {
        a =
            cc.renderContext;
        if (this._autoDraw) {
            this.begin();
            var b = this._clearFlags;
            if (b) {
                var c = [0, 0, 0, 0],
                    d = 0,
                    e = 0;
                b & a.COLOR_BUFFER_BIT && (c = a.getParameter(a.COLOR_CLEAR_VALUE), a.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a));
                b & a.DEPTH_BUFFER_BIT && (d = a.getParameter(a.DEPTH_CLEAR_VALUE), a.clearDepth(this._clearDepth));
                b & a.STENCIL_BUFFER_BIT && (e = a.getParameter(a.STENCIL_CLEAR_VALUE), a.clearStencil(this._clearStencil));
                a.clear(b);
                b & a.COLOR_BUFFER_BIT && a.clearColor(c[0], c[1],
                    c[2], c[3]);
                b & a.DEPTH_BUFFER_BIT && a.clearDepth(d);
                b & a.STENCIL_BUFFER_BIT && a.clearStencil(e)
            }
            this.sortAllChildren();
            a = this._children;
            for (b = 0; b < a.length; b++) c = a[b], c != this._sprite && c.visit();
            this.end()
        }
    },
    newCCImage: null,
    _newCCImageForCanvas: function(a) {
        cc.log("saveToFile isn't supported on Cocos2d-Html5");
        return null
    },
    _newCCImageForWebGL: function(a) {
        cc.log("saveToFile isn't supported on Cocos2d-Html5");
        cc.Assert(this._pixelFormat == cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, "only RGBA8888 can be saved as image");
        if (!this._texture) return null;
        var b = this._texture.getContentSizeInPixels();
        a = b.width;
        var b = b.height,
            c = new cc.Image,
            d = cc.renderContext,
            e = new Uint8Array(a * b * 4);
        if (!e) return c;
        var f = new Uint8Array(a * b * 4);
        if (!f) return null;
        this.begin();
        d.pixelStorei(d.PACK_ALIGNMENT, 1);
        d.readPixels(0, 0, a, b, d.RGBA, d.UNSIGNED_BYTE, f);
        this.end();
        for (d = 0; d < b; ++d) this._memcpy(e, d * a * 4, f, (b - d - 1) * a * 4, 4 * a);
        c.initWithImageData(e, a * b * 4, cc.FMT_RAWDATA, a, b, 8);
        return c
    },
    _memcpy: function(a, b, c, d, e) {
        for (var f = 0; f < e; f++) a[b + f] = c[d + f]
    },
    saveToFile: function(a, b) {
        cc.log("saveToFile isn't supported on Cocos2d-Html5")
    },
    listenToBackground: function(a) {
        cc.log("listenToBackground isn't supported on Cocos2d-Html5")
    },
    listenToForeground: function(a) {
        cc.log("listenToForeground isn't supported on Cocos2d-Html5")
    },
    getClearFlags: function() {
        return this._clearFlags
    },
    setClearFlags: function(a) {
        this._clearFlags = a
    },
    getClearColor: function() {
        return this._clearColor
    },
    setClearColor: null,
    _setClearColorForCanvas: function(a) {
        var b = this._clearColor;
        b.r = a.r;
        b.g =
            a.g;
        b.b = a.b;
        b.a = a.a;
        this._clearColorStr = "rgba(" + (0 | 255 * a.r) + "," + (0 | 255 * a.g) + "," + (0 | 255 * a.b) + "," + a.a + ")"
    },
    _setClearColorForWebGL: function(a) {
        var b = this._clearColor;
        b.r = a.r;
        b.g = a.g;
        b.b = a.b;
        b.a = a.a
    },
    getClearDepth: function() {
        return this._clearDepth
    },
    setClearDepth: function(a) {
        this._clearDepth = a
    },
    getClearStencil: function() {
        return this._clearStencil
    },
    setClearStencil: function(a) {
        this._clearStencil = a
    },
    isAutoDraw: function() {
        return this._autoDraw
    },
    setAutoDraw: function(a) {
        this._autoDraw = a
    }
});
cc.Browser.supportWebGL ? (cc.RenderTexture.prototype.ctor = cc.RenderTexture.prototype._ctorForWebGL, cc.RenderTexture.prototype.cleanup = cc.RenderTexture.prototype._cleanupForWebGL, cc.RenderTexture.prototype.initWithWidthAndHeight = cc.RenderTexture.prototype._initWithWidthAndHeightForWebGL, cc.RenderTexture.prototype.begin = cc.RenderTexture.prototype._beginForWebGL, cc.RenderTexture.prototype._beginWithClear = cc.RenderTexture.prototype._beginWithClearForWebGL, cc.RenderTexture.prototype.end = cc.RenderTexture.prototype._endForWebGL,
    cc.RenderTexture.prototype.clearRect = cc.RenderTexture.prototype._clearRectForWebGL, cc.RenderTexture.prototype.clearDepth = cc.RenderTexture.prototype._clearDepthForWebGL, cc.RenderTexture.prototype.clearStencil = cc.RenderTexture.prototype._clearStencilForWebGL, cc.RenderTexture.prototype.visit = cc.RenderTexture.prototype._visitForWebGL, cc.RenderTexture.prototype.draw = cc.RenderTexture.prototype._drawForWebGL, cc.RenderTexture.prototype.newCCImage = cc.RenderTexture.prototype._newCCImageForWebGL, cc.RenderTexture.prototype.setClearColor =
    cc.RenderTexture.prototype._setClearColorForWebGL) : (cc.RenderTexture.prototype.ctor = cc.RenderTexture.prototype._ctorForCanvas, cc.RenderTexture.prototype.cleanup = cc.RenderTexture.prototype._cleanupForCanvas, cc.RenderTexture.prototype.initWithWidthAndHeight = cc.RenderTexture.prototype._initWithWidthAndHeightForCanvas, cc.RenderTexture.prototype.begin = cc.RenderTexture.prototype._beginForCanvas, cc.RenderTexture.prototype._beginWithClear = cc.RenderTexture.prototype._beginWithClearForCanvas, cc.RenderTexture.prototype.end =
    cc.RenderTexture.prototype._endForCanvas, cc.RenderTexture.prototype.clearRect = cc.RenderTexture.prototype._clearRectForCanvas, cc.RenderTexture.prototype.clearDepth = cc.RenderTexture.prototype._clearDepthForCanvas, cc.RenderTexture.prototype.clearStencil = cc.RenderTexture.prototype._clearStencilForCanvas, cc.RenderTexture.prototype.visit = cc.RenderTexture.prototype._visitForCanvas, cc.RenderTexture.prototype.draw = cc.RenderTexture.prototype._drawForCanvas, cc.RenderTexture.prototype.newCCImage = cc.RenderTexture.prototype._newCCImageForCanvas,
    cc.RenderTexture.prototype.setClearColor = cc.RenderTexture.prototype._setClearColorForCanvas);
cc.RenderTexture.create = function(a, b, c, d) {
    c = c || cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888;
    d = d || 0;
    var e = new cc.RenderTexture;
    return e && e.initWithWidthAndHeight(a, b, c, d) ? e : null
};
cc.MotionStreak = cc.NodeRGBA.extend({
    _fastMode: !1,
    _startingPositionInitialized: !1,
    _texture: null,
    _blendFunc: null,
    _positionR: null,
    _stroke: 0,
    _fadeDelta: 0,
    _minSeg: 0,
    _maxPoints: 0,
    _nuPoints: 0,
    _previousNuPoints: 0,
    _pointVertexes: null,
    _pointState: null,
    _vertices: null,
    _colorPointer: null,
    _texCoords: null,
    _verticesBuffer: null,
    _colorPointerBuffer: null,
    _texCoordsBuffer: null,
    ctor: function() {
        cc.NodeRGBA.prototype.ctor.call(this);
        this._positionR = cc._pConst(0, 0);
        this._blendFunc = new cc.BlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this._vertexWebGLBuffer = cc.renderContext.createBuffer();
        this._startingPositionInitialized = this._fastMode = !1;
        this._texture = null;
        this._previousNuPoints = this._nuPoints = this._maxPoints = this._minSeg = this._fadeDelta = this._stroke = 0;
        this._texCoordsBuffer = this._colorPointerBuffer = this._verticesBuffer = this._texCoords = this._colorPointer = this._vertices = this._pointState = this._pointVertexes = null
    },
    getTexture: function() {
        return this._texture
    },
    setTexture: function(a) {
        this._texture != a && (this._texture = a)
    },
    getBlendFunc: function() {
        return this._blendFunc
    },
    setBlendFunc: function(a, b) {
        1 == arguments.length ? this._blendFunc = a : 2 == arguments.length && (this._blendFunc.src = a, this._blendFunc.dst = b)
    },
    getOpacity: function() {
        cc.log("cc.MotionStreak.getOpacity has not been supported.");
        return 0
    },
    setOpacity: function(a) {
        cc.log("cc.MotionStreak.setOpacity has not been supported.")
    },
    setOpacityModifyRGB: function(a) {},
    isOpacityModifyRGB: function() {
        return !1
    },
    onExit: function() {
        cc.Node.prototype.onExit.call(this);
        this._verticesBuffer && cc.renderContext.deleteBuffer(this._verticesBuffer);
        this._texCoordsBuffer && cc.renderContext.deleteBuffer(this._texCoordsBuffer);
        this._colorPointerBuffer && cc.renderContext.deleteBuffer(this._colorPointerBuffer)
    },
    isFastMode: function() {
        return this._fastMode
    },
    setFastMode: function(a) {
        this._fastMode = a
    },
    isStartingPositionInitialized: function() {
        return this._startingPositionInitialized
    },
    setStartingPositionInitialized: function(a) {
        this._startingPositionInitialized = a
    },
    initWithFade: function(a, b, c, d, e) {
        if (!e) throw "cc.MotionStreak.initWithFade(): Invalid filename or texture";
        "string" === typeof e && (e = cc.TextureCache.getInstance().addImage(e));
        cc.Node.prototype.setPosition.call(this, cc.PointZero());
        this.setAnchorPoint(0, 0);
        this.ignoreAnchorPointForPosition(!0);
        this._startingPositionInitialized = !1;
        this._fastMode = !0;
        this._minSeg = -1 == b ? c / 5 : b;
        this._minSeg *= this._minSeg;
        this._stroke = c;
        this._fadeDelta = 1 / a;
        a = (0 | 60 * a) + 2;
        this._nuPoints = 0;
        this._pointState = new Float32Array(a);
        this._pointVertexes = new Float32Array(2 * a);
        this._vertices = new Float32Array(4 * a);
        this._texCoords = new Float32Array(4 *
            a);
        this._colorPointer = new Uint8Array(8 * a);
        this._maxPoints = a;
        a = cc.renderContext;
        this._verticesBuffer = a.createBuffer();
        this._texCoordsBuffer = a.createBuffer();
        this._colorPointerBuffer = a.createBuffer();
        this._blendFunc.src = a.SRC_ALPHA;
        this._blendFunc.dst = a.ONE_MINUS_SRC_ALPHA;
        this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURECOLOR));
        this.setTexture(e);
        this.setColor(d);
        this.scheduleUpdate();
        a.bindBuffer(a.ARRAY_BUFFER, this._verticesBuffer);
        a.bufferData(a.ARRAY_BUFFER,
            this._vertices, a.DYNAMIC_DRAW);
        a.bindBuffer(a.ARRAY_BUFFER, this._texCoordsBuffer);
        a.bufferData(a.ARRAY_BUFFER, this._texCoords, a.DYNAMIC_DRAW);
        a.bindBuffer(a.ARRAY_BUFFER, this._colorPointerBuffer);
        a.bufferData(a.ARRAY_BUFFER, this._colorPointer, a.DYNAMIC_DRAW);
        return !0
    },
    tintWithColor: function(a) {
        this.setColor(a);
        for (var b = this._colorPointer, c = 0, d = 2 * this._nuPoints; c < d; c++) b[4 * c] = a.r, b[4 * c + 1] = a.g, b[4 * c + 2] = a.b
    },
    reset: function() {
        this._nuPoints = 0
    },
    setPosition: function(a, b) {
        this._startingPositionInitialized = !0;
        1 === arguments.length ? (this._positionR._x = a.x, this._positionR._y = a.y) : (this._positionR._x = a, this._positionR._y = b)
    },
    draw: function(a) {
        1 >= this._nuPoints || !this._texture || !this._texture.isLoaded() || (a = a || cc.renderContext, cc.NODE_DRAW_SETUP(this), cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSCOLORTEX), cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst), cc.glBindTexture2D(this._texture), a.bindBuffer(a.ARRAY_BUFFER, this._verticesBuffer), a.bufferData(a.ARRAY_BUFFER, this._vertices, a.DYNAMIC_DRAW),
            a.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, a.FLOAT, !1, 0, 0), a.bindBuffer(a.ARRAY_BUFFER, this._texCoordsBuffer), a.bufferData(a.ARRAY_BUFFER, this._texCoords, a.DYNAMIC_DRAW), a.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, a.FLOAT, !1, 0, 0), a.bindBuffer(a.ARRAY_BUFFER, this._colorPointerBuffer), a.bufferData(a.ARRAY_BUFFER, this._colorPointer, a.DYNAMIC_DRAW), a.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, a.UNSIGNED_BYTE, !0, 0, 0), a.drawArrays(a.TRIANGLE_STRIP, 0, 2 * this._nuPoints), cc.g_NumberOfDraws++)
    },
    update: function(a) {
        if (this._startingPositionInitialized) {
            a *= this._fadeDelta;
            var b, c, d, e, f = 0,
                g = this._nuPoints,
                h = this._pointState,
                k = this._pointVertexes,
                m = this._vertices,
                n = this._colorPointer;
            for (d = 0; d < g; d++) h[d] -= a, 0 >= h[d] ? f++ : (b = d - f, 0 < f ? (h[b] = h[d], k[2 * b] = k[2 * d], k[2 * b + 1] = k[2 * d + 1], e = 2 * d, c = 2 * b, m[2 * c] = m[2 * e], m[2 * c + 1] = m[2 * e + 1], m[2 * (c + 1)] = m[2 * (e + 1)], m[2 * (c + 1) + 1] = m[2 * (e + 1) + 1], e *= 4, c *= 4, n[c + 0] = n[e + 0], n[c + 1] = n[e + 1], n[c + 2] = n[e + 2], n[c + 4] = n[e + 4], n[c + 5] = n[e + 5], n[c + 6] = n[e + 6]) : c = 8 * b, b = 255 * h[b], n[c + 3] = b, n[c + 7] = b);
            g -= f;
            d = !0;
            g >= this._maxPoints ? d = !1 : 0 < g && (a = cc.pDistanceSQ(cc.p(k[2 * (g - 1)], k[2 * (g - 1) + 1]), this._positionR) < this._minSeg, c = 1 == g ? !1 : cc.pDistanceSQ(cc.p(k[2 * (g - 2)], k[2 * (g - 2) + 1]), this._positionR) < 2 * this._minSeg, a || c) && (d = !1);
            d && (k[2 * g] = this._positionR._x, k[2 * g + 1] = this._positionR._y, h[g] = 1, h = 8 * g, d = this._displayedColor, n[h] = d.r, n[h + 1] = d.g, n[h + 2] = d.b, n[h + 4] = d.r, n[h + 5] = d.g, n[h + 6] = d.b, n[h + 3] = 255, n[h + 7] = 255, 0 < g && this._fastMode && (1 < g ? cc.vertexLineToPolygon(k, this._stroke, this._vertices, g, 1) : cc.vertexLineToPolygon(k,
                this._stroke, this._vertices, 0, 2)), g++);
            this._fastMode || cc.vertexLineToPolygon(k, this._stroke, this._vertices, 0, g);
            if (g && this._previousNuPoints != g) {
                k = 1 / g;
                n = this._texCoords;
                for (d = 0; d < g; d++) n[4 * d] = 0, n[4 * d + 1] = k * d, n[2 * (2 * d + 1)] = 1, n[2 * (2 * d + 1) + 1] = k * d;
                this._previousNuPoints = g
            }
            this._nuPoints = g
        }
    }
});
cc.MotionStreak.create = function(a, b, c, d, e) {
    var f = new cc.MotionStreak;
    return f && f.initWithFade(a, b, c, d, e) ? f : null
};
cc.stencilBits = -1;
cc.setProgram = function(a, b) {
    a.setShaderProgram(b);
    var c = a.getChildren();
    if (c)
        for (var d = 0; d < c.length; d++) cc.setProgram(c[d], b)
};
cc.ClippingNode = cc.Node.extend({
    _stencil: null,
    _alphaThreshold: 0,
    _inverted: !1,
    _godhelpme: !1,
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        this._stencil = null;
        this._alphaThreshold = 0;
        this._inverted = !1
    },
    init: null,
    _initForWebGL: function(a) {
        this._stencil = a;
        this._alphaThreshold = 1;
        this._inverted = !1;
        cc.ClippingNode._init_once = !0;
        cc.ClippingNode._init_once && (cc.stencilBits = cc.renderContext.getParameter(cc.renderContext.STENCIL_BITS), 0 >= cc.stencilBits && cc.log("Stencil buffer is not enabled."), cc.ClippingNode._init_once = !1);
        return !0
    },
    _initForCanvas: function(a) {
        this._stencil = a;
        this._alphaThreshold = 1;
        this._inverted = !1
    },
    onEnter: function() {
        cc.Node.prototype.onEnter.call(this);
        this._stencil.onEnter()
    },
    onEnterTransitionDidFinish: function() {
        cc.Node.prototype.onEnterTransitionDidFinish.call(this);
        this._stencil.onEnterTransitionDidFinish()
    },
    onExitTransitionDidStart: function() {
        this._stencil.onExitTransitionDidStart();
        cc.Node.prototype.onExitTransitionDidStart.call(this)
    },
    onExit: function() {
        this._stencil.onExit();
        cc.Node.prototype.onExit.call(this)
    },
    visit: null,
    _visitForWebGL: function(a) {
        var b = a || cc.renderContext;
        if (1 > cc.stencilBits) cc.Node.prototype.visit.call(this, a);
        else if (this._stencil && this._stencil.isVisible())
            if (cc.ClippingNode._layer = -1, cc.ClippingNode._layer + 1 == cc.stencilBits) cc.ClippingNode._visit_once = !0, cc.ClippingNode._visit_once && (cc.log("Nesting more than " + cc.stencilBits + "stencils is not supported. Everything will be drawn without stencil for this node and its childs."), cc.ClippingNode._visit_once = !1), cc.Node.prototype.visit.call(this,
                a);
            else {
                cc.ClippingNode._layer++;
                var c = 1 << cc.ClippingNode._layer,
                    d = c | c - 1,
                    e = b.isEnabled(b.STENCIL_TEST),
                    f = b.getParameter(b.STENCIL_WRITEMASK),
                    g = b.getParameter(b.STENCIL_FUNC),
                    h = b.getParameter(b.STENCIL_REF),
                    k = b.getParameter(b.STENCIL_VALUE_MASK),
                    m = b.getParameter(b.STENCIL_FAIL),
                    n = b.getParameter(b.STENCIL_PASS_DEPTH_FAIL),
                    p = b.getParameter(b.STENCIL_PASS_DEPTH_PASS);
                b.enable(b.STENCIL_TEST);
                b.stencilMask(c);
                var q = b.getParameter(b.DEPTH_WRITEMASK);
                b.depthMask(!1);
                b.stencilFunc(b.NEVER, c, c);
                b.stencilOp(this._inverted ?
                    b.REPLACE : b.ZERO, b.KEEP, b.KEEP);
                cc.drawingUtil.drawSolidRect(cc.PointZero(), cc.pFromSize(cc.Director.getInstance().getWinSize()), cc.c4f(1, 1, 1, 1));
                b.stencilFunc(b.NEVER, c, c);
                b.stencilOp(this._inverted ? b.ZERO : b.REPLACE, b.KEEP, b.KEEP);
                if (1 > this._alphaThreshold) {
                    var c = cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURECOLORALPHATEST),
                        r = b.getUniformLocation(c.getProgram(), cc.UNIFORM_ALPHA_TEST_VALUE_S);
                    cc.glUseProgram(c.getProgram());
                    c.setUniformLocationWith1f(r, this._alphaThreshold);
                    cc.setProgram(this._stencil, c)
                }
                cc.kmGLPushMatrix();
                this.transform();
                this._stencil.visit();
                cc.kmGLPopMatrix();
                b.depthMask(q);
                b.stencilFunc(b.EQUAL, d, d);
                b.stencilOp(b.KEEP, b.KEEP, b.KEEP);
                cc.Node.prototype.visit.call(this, a);
                b.stencilFunc(g, h, k);
                b.stencilOp(m, n, p);
                b.stencilMask(f);
                e || b.disable(b.STENCIL_TEST);
                cc.ClippingNode._layer--
            } else this._inverted && cc.Node.prototype.visit.call(this, a)
    },
    _visitForCanvas: function(a) {
        if (this._stencil && this._stencil.isVisible()) {
            if (this._cangodhelpme() || this._stencil instanceof cc.Sprite) {
                a = a || cc.renderContext;
                var b = a.canvas,
                    c = cc.ClippingNode._getSharedCache();
                c.width = b.width;
                c.height = b.height;
                c.getContext("2d").drawImage(b, 0, 0);
                a.save();
                this._super(a);
                a.globalCompositeOperation = this._inverted ? "destination-out" : "destination-in";
                this.transform(a);
                this._stencil.visit();
                a.restore();
                a.save();
                a.setTransform(1, 0, 0, 1, 0, 0);
                a.globalCompositeOperation = "destination-over";
                a.drawImage(c, 0, 0)
            } else {
                a = a || cc.renderContext;
                var c = this._children,
                    d;
                a.save();
                this.transform(a);
                this._stencil.visit(a);
                a.clip();
                this._cangodhelpme(!0);
                var e = c.length;
                if (0 < e) {
                    this.sortAllChildren();
                    for (b = 0; b < e; b++)
                        if (d = c[b], 0 > d._zOrder) d.visit(a);
                        else break;
                    for (this.draw(a); b < e; b++) c[b].visit(a)
                } else this.draw(a);
                this._cangodhelpme(!1)
            }
            a.restore()
        } else this._inverted && cc.Node.prototype.visit.call(this, a)
    },
    getStencil: function() {
        return this._stencil
    },
    setStencil: null,
    _setStencilForWebGL: function(a) {
        this._stencil = a
    },
    _setStencilForCanvas: function(a) {
        this._stencil = a;
        var b = cc.EGLView.getInstance().getScaleX(),
            c = cc.EGLView.getInstance().getScaleY(),
            d = cc.renderContext;
        !(a instanceof cc.Sprite) && a instanceof cc.DrawNode && (a.draw = function() {
            for (var e = 0; e < a._buffer.length; e++) {
                var f = a._buffer[e].verts,
                    g = f[0];
                d.beginPath();
                d.moveTo(g.x * b, -g.y * c);
                for (var g = 1, h = f.length; g < h; g++) d.lineTo(f[g].x * b, -f[g].y * c)
            }
        })
    },
    getAlphaThreshold: function() {
        return this._alphaThreshold
    },
    setAlphaThreshold: function(a) {
        this._alphaThreshold = a
    },
    isInverted: function() {
        return this._inverted
    },
    setInverted: function(a) {
        this._inverted = a
    },
    _cangodhelpme: function(a) {
        if (!0 === a || !1 ===
            a) cc.ClippingNode.prototype._godhelpme = a;
        return cc.ClippingNode.prototype._godhelpme
    }
});
cc.Browser.supportWebGL ? (cc.ClippingNode.prototype.init = cc.ClippingNode.prototype._initForWebGL, cc.ClippingNode.prototype.visit = cc.ClippingNode.prototype._visitForWebGL, cc.ClippingNode.prototype.setStencil = cc.ClippingNode.prototype._setStencilForWebGL) : (cc.ClippingNode.prototype.init = cc.ClippingNode.prototype._initForCanvas, cc.ClippingNode.prototype.visit = cc.ClippingNode.prototype._visitForCanvas, cc.ClippingNode.prototype.setStencil = cc.ClippingNode.prototype._setStencilForCanvas);
cc.ClippingNode._init_once = null;
cc.ClippingNode._visit_once = null;
cc.ClippingNode._layer = null;
cc.ClippingNode._sharedCache = null;
cc.ClippingNode._getSharedCache = function() {
    return cc.ClippingNode._sharedCache || (cc.ClippingNode._sharedCache = document.createElement("canvas"))
};
cc.ClippingNode.create = function(a) {
    var b = new cc.ClippingNode;
    b.init(a);
    return b
};
cc.GridBase = cc.Class.extend({
    _active: !1,
    _reuseGrid: 0,
    _gridSize: null,
    _texture: null,
    _step: null,
    _grabber: null,
    _isTextureFlipped: !1,
    _shaderProgram: null,
    _directorProjection: 0,
    _dirty: !1,
    ctor: function() {
        this._active = !1;
        this._reuseGrid = 0;
        this._texture = this._gridSize = null;
        this._step = cc.p(0, 0);
        this._grabber = null;
        this._isTextureFlipped = !1;
        this._shaderProgram = null;
        this._directorProjection = 0;
        this._dirty = !1
    },
    isActive: function() {
        return this._active
    },
    setActive: function(a) {
        this._active = a;
        if (!a) {
            a = cc.Director.getInstance();
            var b = a.getProjection();
            a.setProjection(b)
        }
    },
    getReuseGrid: function() {
        return this._reuseGrid
    },
    setReuseGrid: function(a) {
        this._reuseGrid = a
    },
    getGridSize: function() {
        return cc.size(this._gridSize.width, this._gridSize.height)
    },
    setGridSize: function(a) {
        this._gridSize.width = parseInt(a.width);
        this._gridSize.height = parseInt(a.height)
    },
    getStep: function() {
        return cc.p(this._step.x, this._step.y)
    },
    setStep: function(a) {
        this._step.x = a.x;
        this._step.y = a.y
    },
    isTextureFlipped: function() {
        return this._isTextureFlipped
    },
    setTextureFlipped: function(a) {
        this._isTextureFlipped !=
            a && (this._isTextureFlipped = a, this.calculateVertexPoints())
    },
    initWithSize: function(a, b, c) {
        if (!b) {
            var d = cc.Director.getInstance().getWinSizeInPixels(),
                e = cc.NextPOT(d.width),
                f = cc.NextPOT(d.height),
                g = new Uint8Array(e * f * 4);
            if (!g) return cc.log("cocos2d: CCGrid: not enough memory."), !1;
            b = new cc.Texture2D;
            b.initWithData(g, cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, e, f, d);
            if (!b) return cc.log("cocos2d: CCGrid: error creating texture"), !1
        }
        this._active = !1;
        this._reuseGrid = 0;
        this._gridSize = a;
        this._texture = b;
        this._isTextureFlipped =
            c || !1;
        b = this._texture.getContentSize();
        this._step.x = b.width / a.width;
        this._step.y = b.height / a.height;
        this._grabber = new cc.Grabber;
        if (!this._grabber) return !1;
        this._grabber.grab(this._texture);
        this._shaderProgram = cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURE);
        this.calculateVertexPoints();
        return !0
    },
    beforeDraw: function() {
        this._directorProjection = cc.Director.getInstance().getProjection();
        this.set2DProjection();
        this._grabber.beforeRender(this._texture)
    },
    afterDraw: function(a) {
        this._grabber.afterRender(this._texture);
        cc.Director.getInstance().setProjection(this._directorProjection);
        if (a.getCamera().isDirty()) {
            var b = a.getAnchorPointInPoints();
            cc.kmGLTranslatef(b.x, b.y, 0);
            a.getCamera().locate();
            cc.kmGLTranslatef(-b.x, -b.y, 0)
        }
        cc.glBindTexture2D(this._texture);
        this.blit()
    },
    blit: function() {
        cc.log("cc.GridBase.blit(): Shall be overridden in subclass.")
    },
    reuse: function() {
        cc.log("cc.GridBase.reuse(): Shall be overridden in subclass.")
    },
    calculateVertexPoints: function() {
        cc.log("cc.GridBase.calculateVertexPoints(): Shall be overridden in subclass.")
    },
    set2DProjection: function() {
        var a = cc.Director.getInstance().getWinSizeInPixels();
        cc.renderContext.viewport(0, 0, a.width, a.height);
        cc.kmGLMatrixMode(cc.KM_GL_PROJECTION);
        cc.kmGLLoadIdentity();
        var b = new cc.kmMat4;
        cc.kmMat4OrthographicProjection(b, 0, a.width, 0, a.height, -1, 1);
        cc.kmGLMultMatrix(b);
        cc.kmGLMatrixMode(cc.KM_GL_MODELVIEW);
        cc.kmGLLoadIdentity();
        cc.setProjectionMatrixDirty()
    }
});
cc.GridBase.create = function(a, b, c) {
    var d = new cc.GridBase;
    return d && d.initWithSize(a, b, c) ? d : null
};
cc.Grid3D = cc.GridBase.extend({
    _texCoordinates: null,
    _vertices: null,
    _originalVertices: null,
    _indices: null,
    _texCoordinateBuffer: null,
    _verticesBuffer: null,
    _indicesBuffer: null,
    ctor: function() {
        cc.GridBase.prototype.ctor.call(this);
        this._indicesBuffer = this._verticesBuffer = this._texCoordinateBuffer = this._indices = this._originalVertices = this._vertices = this._texCoordinates = null
    },
    vertex: function(a) {
        a.x === (0 | a.x) && a.y === (0 | a.y) || cc.log("cc.Grid3D.vertex() : Numbers must be integers");
        a = 0 | 3 * (a.x * (this._gridSize.height +
            1) + a.y);
        var b = this._vertices;
        return new cc.Vertex3F(b[a], b[a + 1], b[a + 2])
    },
    originalVertex: function(a) {
        a.x === (0 | a.x) && a.y === (0 | a.y) || cc.log("cc.Grid3D.originalVertex() : Numbers must be integers");
        a = 0 | 3 * (a.x * (this._gridSize.height + 1) + a.y);
        var b = this._originalVertices;
        return new cc.Vertex3F(b[a], b[a + 1], b[a + 2])
    },
    setVertex: function(a, b) {
        a.x === (0 | a.x) && a.y === (0 | a.y) || cc.log("cc.Grid3D.setVertex() : Numbers must be integers");
        var c = 0 | 3 * (a.x * (this._gridSize.height + 1) + a.y),
            d = this._vertices;
        d[c] = b.x;
        d[c + 1] =
            b.y;
        d[c + 2] = b.z;
        this._dirty = !0
    },
    blit: function() {
        var a = this._gridSize.width * this._gridSize.height;
        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_TEXCOORDS);
        this._shaderProgram.use();
        this._shaderProgram.setUniformsForBuiltins();
        var b = cc.renderContext,
            c = this._dirty;
        b.bindBuffer(b.ARRAY_BUFFER, this._verticesBuffer);
        c && b.bufferData(b.ARRAY_BUFFER, this._vertices, b.DYNAMIC_DRAW);
        b.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 3, b.FLOAT, !1, 0, 0);
        b.bindBuffer(b.ARRAY_BUFFER, this._texCoordinateBuffer);
        c && b.bufferData(b.ARRAY_BUFFER, this._texCoordinates, b.DYNAMIC_DRAW);
        b.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, b.FLOAT, !1, 0, 0);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
        c && b.bufferData(b.ELEMENT_ARRAY_BUFFER, this._indices, b.STATIC_DRAW);
        b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0);
        c && (this._dirty = !1);
        cc.INCREMENT_GL_DRAWS(1)
    },
    reuse: function() {
        if (0 < this._reuseGrid) {
            for (var a = this._originalVertices, b = this._vertices, c = 0, d = this._vertices.length; c < d; c++) a[c] = b[c];
            --this._reuseGrid
        }
    },
    calculateVertexPoints: function() {
        var a = cc.renderContext,
            b = this._texture.getPixelsWide(),
            c = this._texture.getPixelsHigh(),
            d = this._texture.getContentSizeInPixels().height,
            e = this._gridSize,
            f = (e.width + 1) * (e.height + 1);
        this._vertices = new Float32Array(3 * f);
        this._texCoordinates = new Float32Array(2 * f);
        this._indices = new Uint16Array(e.width * e.height * 6);
        this._verticesBuffer && a.deleteBuffer(this._verticesBuffer);
        this._verticesBuffer = a.createBuffer();
        this._texCoordinateBuffer && a.deleteBuffer(this._texCoordinateBuffer);
        this._texCoordinateBuffer = a.createBuffer();
        this._indicesBuffer && a.deleteBuffer(this._indicesBuffer);
        this._indicesBuffer = a.createBuffer();
        for (var g, h, k = this._indices, m = this._texCoordinates, n = this._isTextureFlipped, p = this._vertices, f = 0; f < e.width; ++f)
            for (g = 0; g < e.height; ++g) {
                var q = g * e.width + f;
                h = f * this._step.x;
                var r = h + this._step.x,
                    s = g * this._step.y,
                    t = s + this._step.y,
                    u = f * (e.height + 1) + g,
                    v = (f + 1) * (e.height + 1) + g,
                    w = (f + 1) * (e.height + 1) + (g + 1),
                    x = f * (e.height + 1) + (g + 1);
                k[6 * q] = u;
                k[6 * q + 1] = v;
                k[6 * q + 2] = x;
                k[6 * q + 3] = v;
                k[6 * q +
                    4] = w;
                k[6 * q + 5] = x;
                var q = [3 * u, 3 * v, 3 * w, 3 * x],
                    y = [{
                        x: h,
                        y: s,
                        z: 0
                    }, {
                        x: r,
                        y: s,
                        z: 0
                    }, {
                        x: r,
                        y: t,
                        z: 0
                    }, {
                        x: h,
                        y: t,
                        z: 0
                    }],
                    u = [2 * u, 2 * v, 2 * w, 2 * x],
                    r = [cc.p(h, s), cc.p(r, s), cc.p(r, t), cc.p(h, t)];
                for (h = 0; 4 > h; ++h) p[q[h]] = y[h].x, p[q[h] + 1] = y[h].y, p[q[h] + 2] = y[h].z, m[u[h]] = r[h].x / b, m[u[h] + 1] = n ? (d - r[h].y) / c : r[h].y / c
            }
        this._originalVertices = new Float32Array(this._vertices);
        a.bindBuffer(a.ARRAY_BUFFER, this._verticesBuffer);
        a.bufferData(a.ARRAY_BUFFER, this._vertices, a.DYNAMIC_DRAW);
        a.bindBuffer(a.ARRAY_BUFFER, this._texCoordinateBuffer);
        a.bufferData(a.ARRAY_BUFFER,
            this._texCoordinates, a.DYNAMIC_DRAW);
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
        a.bufferData(a.ELEMENT_ARRAY_BUFFER, this._indices, a.STATIC_DRAW);
        this._dirty = !0
    }
});
cc.Grid3D.create = function(a, b, c) {
    var d = new cc.Grid3D;
    return d && d.initWithSize(a, b, c) ? d : null
};
cc.TiledGrid3D = cc.GridBase.extend({
    _texCoordinates: null,
    _vertices: null,
    _originalVertices: null,
    _indices: null,
    _texCoordinateBuffer: null,
    _verticesBuffer: null,
    _indicesBuffer: null,
    ctor: function() {
        cc.GridBase.prototype.ctor.call(this);
        this._indicesBuffer = this._verticesBuffer = this._texCoordinateBuffer = this._indices = this._originalVertices = this._vertices = this._texCoordinates = null
    },
    tile: function(a) {
        a.x === (0 | a.x) && a.y === (0 | a.y) || cc.log("cc.TiledGrid3D.tile() : Numbers must be integers");
        a = 12 * (this._gridSize.height *
            a.x + a.y);
        var b = this._vertices;
        return new cc.Quad3(new cc.Vertex3F(b[a], b[a + 1], b[a + 2]), new cc.Vertex3F(b[a + 3], b[a + 4], b[a + 5]), new cc.Vertex3F(b[a + 6], b[a + 7], b[a + 8]), new cc.Vertex3F(b[a + 9], b[a + 10], b[a + 11]))
    },
    originalTile: function(a) {
        a.x === (0 | a.x) && a.y === (0 | a.y) || cc.log("cc.TiledGrid3D.originalTile() : Numbers must be integers");
        a = 12 * (this._gridSize.height * a.x + a.y);
        var b = this._originalVertices;
        return new cc.Quad3(new cc.Vertex3F(b[a], b[a + 1], b[a + 2]), new cc.Vertex3F(b[a + 3], b[a + 4], b[a + 5]), new cc.Vertex3F(b[a +
            6], b[a + 7], b[a + 8]), new cc.Vertex3F(b[a + 9], b[a + 10], b[a + 11]))
    },
    setTile: function(a, b) {
        a.x === (0 | a.x) && a.y === (0 | a.y) || cc.log("cc.TiledGrid3D.setTile() : Numbers must be integers");
        var c = 12 * (this._gridSize.height * a.x + a.y),
            d = this._vertices;
        d[c] = b.bl.x;
        d[c + 1] = b.bl.y;
        d[c + 2] = b.bl.z;
        d[c + 3] = b.br.x;
        d[c + 4] = b.br.y;
        d[c + 5] = b.br.z;
        d[c + 6] = b.tl.x;
        d[c + 7] = b.tl.y;
        d[c + 8] = b.tl.z;
        d[c + 9] = b.tr.x;
        d[c + 10] = b.tr.y;
        d[c + 11] = b.tr.z;
        this._dirty = !0
    },
    blit: function() {
        var a = this._gridSize.width * this._gridSize.height;
        this._shaderProgram.use();
        this._shaderProgram.setUniformsForBuiltins();
        var b = cc.renderContext,
            c = this._dirty;
        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_TEXCOORDS);
        b.bindBuffer(b.ARRAY_BUFFER, this._verticesBuffer);
        c && b.bufferData(b.ARRAY_BUFFER, this._vertices, b.DYNAMIC_DRAW);
        b.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 3, b.FLOAT, !1, 0, this._vertices);
        b.bindBuffer(b.ARRAY_BUFFER, this._texCoordinateBuffer);
        c && b.bufferData(b.ARRAY_BUFFER, this._texCoordinates, b.DYNAMIC_DRAW);
        b.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS,
            2, b.FLOAT, !1, 0, this._texCoordinates);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
        c && b.bufferData(b.ELEMENT_ARRAY_BUFFER, this._indices, b.STATIC_DRAW);
        b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0);
        c && (this._dirty = !1);
        cc.INCREMENT_GL_DRAWS(1)
    },
    reuse: function() {
        if (0 < this._reuseGrid) {
            for (var a = this._vertices, b = this._originalVertices, c = 0; c < a.length; c++) b[c] = a[c];
            --this._reuseGrid
        }
    },
    calculateVertexPoints: function() {
        var a = this._texture.getPixelsWide(),
            b = this._texture.getPixelsHigh(),
            c = this._texture.getContentSizeInPixels().height,
            d = this._gridSize,
            e = d.width * d.height;
        this._vertices = new Float32Array(12 * e);
        this._texCoordinates = new Float32Array(8 * e);
        this._indices = new Uint16Array(6 * e);
        var f = cc.renderContext;
        this._verticesBuffer && f.deleteBuffer(this._verticesBuffer);
        this._verticesBuffer = f.createBuffer();
        this._texCoordinateBuffer && f.deleteBuffer(this._texCoordinateBuffer);
        this._texCoordinateBuffer = f.createBuffer();
        this._indicesBuffer && f.deleteBuffer(this._indicesBuffer);
        this._indicesBuffer = f.createBuffer();
        var g, h, k = 0,
            m = this._step,
            n = this._vertices,
            p = this._texCoordinates,
            q = this._isTextureFlipped;
        for (g = 0; g < d.width; g++)
            for (h = 0; h < d.height; h++) {
                var r = g * m.x,
                    s = r + m.x,
                    t = h * m.y,
                    u = t + m.y;
                n[12 * k] = r;
                n[12 * k + 1] = t;
                n[12 * k + 2] = 0;
                n[12 * k + 3] = s;
                n[12 * k + 4] = t;
                n[12 * k + 5] = 0;
                n[12 * k + 6] = r;
                n[12 * k + 7] = u;
                n[12 * k + 8] = 0;
                n[12 * k + 9] = s;
                n[12 * k + 10] = u;
                n[12 * k + 11] = 0;
                var v = t,
                    w = u;
                q && (v = c - t, w = c - u);
                p[8 * k] = r / a;
                p[8 * k + 1] = v / b;
                p[8 * k + 2] = s / a;
                p[8 * k + 3] = v / b;
                p[8 * k + 4] = r / a;
                p[8 * k + 5] = w / b;
                p[8 * k + 6] = s / a;
                p[8 * k + 7] = w / b;
                k++
            }
        a = this._indices;
        for (g = 0; g < e; g++) a[6 * g + 0] = 4 * g + 0, a[6 * g + 1] = 4 * g + 1, a[6 * g + 2] = 4 * g +
            2, a[6 * g + 3] = 4 * g + 1, a[6 * g + 4] = 4 * g + 2, a[6 * g + 5] = 4 * g + 3;
        this._originalVertices = new Float32Array(this._vertices);
        f.bindBuffer(f.ARRAY_BUFFER, this._verticesBuffer);
        f.bufferData(f.ARRAY_BUFFER, this._vertices, f.DYNAMIC_DRAW);
        f.bindBuffer(f.ARRAY_BUFFER, this._texCoordinateBuffer);
        f.bufferData(f.ARRAY_BUFFER, this._texCoordinates, f.DYNAMIC_DRAW);
        f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
        f.bufferData(f.ELEMENT_ARRAY_BUFFER, this._indices, f.DYNAMIC_DRAW);
        this._dirty = !0
    }
});
cc.TiledGrid3D.create = function(a, b, c) {
    var d = new cc.TiledGrid3D;
    d.initWithSize(a, b, c);
    return d
};
cc.Grabber = cc.Class.extend({
    _FBO: null,
    _oldFBO: null,
    _oldClearColor: null,
    _gl: null,
    ctor: function() {
        this._gl = cc.renderContext;
        this._oldClearColor = [0, 0, 0, 0];
        this._oldFBO = null;
        this._FBO = this._gl.createFramebuffer()
    },
    grab: function(a) {
        var b = this._gl;
        this._oldFBO = b.getParameter(b.FRAMEBUFFER_BINDING);
        b.bindFramebuffer(b.FRAMEBUFFER, this._FBO);
        b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, a._webTextureObj, 0);
        b.checkFramebufferStatus(b.FRAMEBUFFER) != b.FRAMEBUFFER_COMPLETE && cc.log("Frame Grabber: could not attach texture to frmaebuffer");
        b.bindFramebuffer(b.FRAMEBUFFER, this._oldFBO)
    },
    beforeRender: function(a) {
        a = this._gl;
        this._oldFBO = a.getParameter(a.FRAMEBUFFER_BINDING);
        a.bindFramebuffer(a.FRAMEBUFFER, this._FBO);
        this._oldClearColor = a.getParameter(a.COLOR_CLEAR_VALUE);
        a.clearColor(0, 0, 0, 0);
        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
    },
    afterRender: function(a) {
        a = this._gl;
        a.bindFramebuffer(a.FRAMEBUFFER, this._oldFBO);
        a.colorMask(!0, !0, !0, !0)
    },
    destroy: function() {
        this._gl.deleteFramebuffer(this._FBO)
    }
});
cc.v2fzero = function() {
    return {
        x: 0,
        y: 0
    }
};
cc.v2f = function(a, b) {
    return {
        x: a,
        y: b
    }
};
cc.v2fadd = function(a, b) {
    return cc.v2f(a.x + b.x, a.y + b.y)
};
cc.v2fsub = function(a, b) {
    return cc.v2f(a.x - b.x, a.y - b.y)
};
cc.v2fmult = function(a, b) {
    return cc.v2f(a.x * b, a.y * b)
};
cc.v2fperp = function(a) {
    return cc.v2f(-a.y, a.x)
};
cc.v2fneg = function(a) {
    return cc.v2f(-a.x, -a.y)
};
cc.v2fdot = function(a, b) {
    return a.x * b.x + a.y * b.y
};
cc.v2fforangle = function(a) {
    return cc.v2f(Math.cos(a), Math.sin(a))
};
cc.v2fnormalize = function(a) {
    a = cc.pNormalize(cc.p(a.x, a.y));
    return cc.v2f(a.x, a.y)
};
cc.__v2f = function(a) {
    return cc.v2f(a.x, a.y)
};
cc.__t = function(a) {
    return {
        u: a.x,
        v: a.y
    }
};
cc.DrawNodeCanvas = cc.Node.extend({
    _buffer: null,
    _blendFunc: null,
    _lineWidth: 0,
    _drawColor: null,
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        this._buffer = [];
        this._lineWidth = 1;
        this._drawColor = new cc.Color4F(255, 255, 255, 255);
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST)
    },
    getBlendFunc: function() {
        return this._blendFunc
    },
    setBlendFunc: function(a) {
        this._blendFunc = a
    },
    setLineWidth: function(a) {
        this._lineWidth = a
    },
    getLineWidth: function() {
        return this._lineWidth
    },
    setDrawColor: function(a) {
        this._drawColor.r =
            a.r;
        this._drawColor.g = a.g;
        this._drawColor.b = a.b;
        this._drawColor.a = a.a
    },
    getDrawColor: function() {
        return new cc.Color4F(this._drawColor.r, this._drawColor.g, this._drawColor.b, this._drawColor.a)
    },
    drawRect: function(a, b, c, d, e) {
        d = d || this._lineWidth;
        e = e || this.getDrawColor();
        a = [a, cc.p(b.x, a.y), b, cc.p(a.x, b.y)];
        b = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
        b.verts = a;
        b.lineWidth = d;
        b.lineColor = e;
        b.isClosePolygon = !0;
        b.isStroke = !0;
        b.lineCap = "butt";
        if (b.fillColor = c) b.isFill = !0;
        this._buffer.push(b)
    },
    drawCircle: function(a,
        b, c, d, e, f, g) {
        f = f || this._lineWidth;
        g = g || this.getDrawColor();
        for (var h = 2 * Math.PI / d, k = [], m = 0; m <= d; m++) {
            var n = m * h,
                p = b * Math.cos(n + c) + a.x,
                n = b * Math.sin(n + c) + a.y;
            k.push(cc.p(p, n))
        }
        e && k.push(cc.p(a.x, a.y));
        a = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
        a.verts = k;
        a.lineWidth = f;
        a.lineColor = g;
        a.isClosePolygon = !0;
        a.isStroke = !0;
        this._buffer.push(a)
    },
    drawQuadBezier: function(a, b, c, d, e, f) {
        e = e || this._lineWidth;
        f = f || this.getDrawColor();
        for (var g = [], h = 0, k = 0; k < d; k++) {
            var m = Math.pow(1 - h, 2) * a.x + 2 * (1 - h) * h * b.x + h * h * c.x,
                n = Math.pow(1 - h, 2) * a.y + 2 * (1 - h) * h * b.y + h * h * c.y;
            g.push(cc.p(m, n));
            h += 1 / d
        }
        g.push(cc.p(c.x, c.y));
        a = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
        a.verts = g;
        a.lineWidth = e;
        a.lineColor = f;
        a.isStroke = !0;
        a.lineCap = "round";
        this._buffer.push(a)
    },
    drawCubicBezier: function(a, b, c, d, e, f, g) {
        f = f || this._lineWidth;
        g = g || this.getDrawColor();
        for (var h = [], k = 0, m = 0; m < e; m++) {
            var n = Math.pow(1 - k, 3) * a.x + 3 * Math.pow(1 - k, 2) * k * b.x + 3 * (1 - k) * k * k * c.x + k * k * k * d.x,
                p = Math.pow(1 - k, 3) * a.y + 3 * Math.pow(1 - k, 2) * k * b.y + 3 * (1 - k) * k * k * c.y + k * k * k * d.y;
            h.push(cc.p(n,
                p));
            k += 1 / e
        }
        h.push(cc.p(d.x, d.y));
        a = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
        a.verts = h;
        a.lineWidth = f;
        a.lineColor = g;
        a.isStroke = !0;
        a.lineCap = "round";
        this._buffer.push(a)
    },
    drawCatmullRom: function(a, b, c, d) {
        this.drawCardinalSpline(a, 0.5, b, c, d)
    },
    drawCardinalSpline: function(a, b, c, d, e) {
        d = d || this._lineWidth;
        e = e || this.getDrawColor();
        for (var f = [], g, h, k = 1 / a.length, m = 0; m < c + 1; m++) h = m / c, 1 == h ? (g = a.length - 1, h = 1) : (g = 0 | h / k, h = (h - k * g) / k), g = cc.CardinalSplineAt(cc.getControlPointAt(a, g - 1), cc.getControlPointAt(a, g -
            0), cc.getControlPointAt(a, g + 1), cc.getControlPointAt(a, g + 2), b, h), f.push(g);
        a = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
        a.verts = f;
        a.lineWidth = d;
        a.lineColor = e;
        a.isStroke = !0;
        a.lineCap = "round";
        this._buffer.push(a)
    },
    drawDot: function(a, b, c) {
        c = c || this.getDrawColor();
        var d = new cc._DrawNodeElement(cc.DrawNode.TYPE_DOT);
        d.verts = [a];
        d.lineWidth = b;
        d.fillColor = c;
        this._buffer.push(d)
    },
    drawSegment: function(a, b, c, d) {
        c = c || this._lineWidth;
        d = d || this.getDrawColor();
        var e = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
        e.verts = [a, b];
        e.lineWidth = c;
        e.lineColor = d;
        e.isStroke = !0;
        e.lineCap = "round";
        this._buffer.push(e)
    },
    drawPoly: function(a, b, c, d) {
        c = c || this._lineWidth;
        d = d || this.getDrawColor();
        var e = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
        e.verts = a;
        e.fillColor = b;
        e.lineWidth = c;
        e.lineColor = d;
        e.isClosePolygon = !0;
        e.isStroke = !0;
        e.lineCap = "round";
        b && (e.isFill = !0);
        this._buffer.push(e)
    },
    draw: function(a) {
        a = a || cc.renderContext;
        this._blendFunc && this._blendFunc.src == gl.SRC_ALPHA && this._blendFunc.dst == gl.ONE && (a.globalCompositeOperation =
            "lighter");
        for (var b = 0; b < this._buffer.length; b++) {
            var c = this._buffer[b];
            switch (c.type) {
                case cc.DrawNode.TYPE_DOT:
                    this._drawDot(a, c);
                    break;
                case cc.DrawNode.TYPE_SEGMENT:
                    this._drawSegment(a, c);
                    break;
                case cc.DrawNode.TYPE_POLY:
                    this._drawPoly(a, c)
            }
        }
    },
    _drawDot: function(a, b) {
        var c = b.fillColor,
            d = b.verts[0],
            e = b.lineWidth,
            f = cc.EGLView.getInstance().getScaleX(),
            g = cc.EGLView.getInstance().getScaleY();
        a.fillStyle = "rgba(" + (0 | 255 * c.r) + "," + (0 | 255 * c.g) + "," + (0 | 255 * c.b) + "," + c.a + ")";
        a.beginPath();
        a.arc(d.x * f, -d.y * g,
            e * f, 0, 2 * Math.PI, !1);
        a.closePath();
        a.fill()
    },
    _drawSegment: function(a, b) {
        var c = b.lineColor,
            d = b.verts[0],
            e = b.verts[1],
            f = b.lineWidth,
            g = b.lineCap,
            h = cc.EGLView.getInstance().getScaleX(),
            k = cc.EGLView.getInstance().getScaleY();
        a.strokeStyle = "rgba(" + (0 | 255 * c.r) + "," + (0 | 255 * c.g) + "," + (0 | 255 * c.b) + "," + c.a + ")";
        a.lineWidth = f * h;
        a.beginPath();
        a.lineCap = g;
        a.moveTo(d.x * h, -d.y * k);
        a.lineTo(e.x * h, -e.y * k);
        a.stroke()
    },
    _drawPoly: function(a, b) {
        var c = b.verts,
            d = b.lineCap,
            e = b.fillColor,
            f = b.lineWidth,
            g = b.lineColor,
            h = b.isClosePolygon,
            k = b.isFill,
            m = b.isStroke;
        if (null != c) {
            var n = c[0],
                p = cc.EGLView.getInstance().getScaleX(),
                q = cc.EGLView.getInstance().getScaleY();
            a.lineCap = d;
            e && (a.fillStyle = "rgba(" + (0 | 255 * e.r) + "," + (0 | 255 * e.g) + "," + (0 | 255 * e.b) + "," + e.a + ")");
            f && (a.lineWidth = f * p);
            g && (a.strokeStyle = "rgba(" + (0 | 255 * g.r) + "," + (0 | 255 * g.g) + "," + (0 | 255 * g.b) + "," + g.a + ")");
            a.beginPath();
            a.moveTo(n.x * p, -n.y * q);
            d = 1;
            for (e = c.length; d < e; d++) a.lineTo(c[d].x * p, -c[d].y * q);
            h && a.closePath();
            k && a.fill();
            m && a.stroke()
        }
    },
    clear: function() {
        this._buffer.length = 0
    }
});
cc.DrawNodeWebGL = cc.Node.extend({
    _bufferCapacity: 0,
    _buffer: null,
    _trianglesArrayBuffer: null,
    _trianglesWebBuffer: null,
    _trianglesReader: null,
    _blendFunc: null,
    _dirty: !1,
    getBlendFunc: function() {
        return this._blendFunc
    },
    setBlendFunc: function(a) {
        this._blendFunc = a
    },
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        this._buffer = [];
        this._blendFunc = new cc.BlendFunc(cc.BLEND_SRC, cc.BLEND_DST)
    },
    init: function() {
        return cc.Node.prototype.init.call(this) ? (this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_LENGTHTEXTURECOLOR)),
            this._ensureCapacity(512), this._trianglesWebBuffer = cc.renderContext.createBuffer(), this._dirty = !0) : !1
    },
    _render: function() {
        var a = cc.renderContext;
        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSCOLORTEX);
        a.bindBuffer(a.ARRAY_BUFFER, this._trianglesWebBuffer);
        this._dirty && (a.bufferData(a.ARRAY_BUFFER, this._trianglesArrayBuffer, a.STREAM_DRAW), this._dirty = !1);
        var b = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
        a.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, a.FLOAT, !1, b, 0);
        a.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR,
            4, a.UNSIGNED_BYTE, !0, b, 8);
        a.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, a.FLOAT, !1, b, 12);
        a.drawArrays(a.TRIANGLES, 0, 3 * this._buffer.length);
        cc.INCREMENT_GL_DRAWS(1)
    },
    _ensureCapacity: function(a) {
        if (this._buffer.length + a > this._bufferCapacity) {
            var b = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT;
            this._bufferCapacity += Math.max(this._bufferCapacity, a);
            if (null == this._buffer || 0 === this._buffer.length) this._buffer = [], this._trianglesArrayBuffer = new ArrayBuffer(b * this._bufferCapacity), this._trianglesReader =
                new Uint8Array(this._trianglesArrayBuffer);
            else {
                a = this._buffer;
                a.length = 0;
                for (var c = new ArrayBuffer(b * this._bufferCapacity), d = 0; d < this._buffer.length; d++) a[d] = new cc.V2F_C4B_T2F_Triangle(this._buffer[d].a, this._buffer[d].b, this._buffer[d].c, c, d * b);
                this._trianglesReader = new Uint8Array(c);
                this._trianglesArrayBuffer = c
            }
        }
    },
    draw: function() {
        cc.glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
        this._shaderProgram.use();
        this._shaderProgram.setUniformsForBuiltins();
        this._render()
    },
    drawDot: function(a, b, c) {
        c = {
            r: 0 | 255 * c.r,
            g: 0 | 255 * c.g,
            b: 0 | 255 * c.b,
            a: 0 | 255 * c.a
        };
        var d = {
                vertices: {
                    x: a.x - b,
                    y: a.y - b
                },
                colors: c,
                texCoords: {
                    u: -1,
                    v: -1
                }
            },
            e = {
                vertices: {
                    x: a.x + b,
                    y: a.y + b
                },
                colors: c,
                texCoords: {
                    u: 1,
                    v: 1
                }
            },
            f = {
                vertices: {
                    x: a.x + b,
                    y: a.y - b
                },
                colors: c,
                texCoords: {
                    u: 1,
                    v: -1
                }
            };
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle(d, {
            vertices: {
                x: a.x - b,
                y: a.y + b
            },
            colors: c,
            texCoords: {
                u: -1,
                v: 1
            }
        }, e, this._trianglesArrayBuffer, this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT));
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle(d, e, f, this._trianglesArrayBuffer,
            this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT));
        this._dirty = !0
    },
    drawSegment: function(a, b, c, d) {
        this._ensureCapacity(18);
        d = {
            r: 0 | 255 * d.r,
            g: 0 | 255 * d.g,
            b: 0 | 255 * d.b,
            a: 0 | 255 * d.a
        };
        var e = cc.__v2f(a),
            f = cc.__v2f(b);
        b = cc.v2fnormalize(cc.v2fperp(cc.v2fsub(f, e)));
        a = cc.v2fperp(b);
        var g = cc.v2fmult(b, c),
            h = cc.v2fmult(a, c);
        c = cc.v2fsub(f, cc.v2fadd(g, h));
        var k = cc.v2fadd(f, cc.v2fsub(g, h)),
            m = cc.v2fsub(f, g),
            f = cc.v2fadd(f, g),
            n = cc.v2fsub(e, g),
            p = cc.v2fadd(e, g),
            q = cc.v2fsub(e, cc.v2fsub(g, h)),
            e = cc.v2fadd(e, cc.v2fadd(g,
                h)),
            g = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT,
            h = this._trianglesArrayBuffer;
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle({
            vertices: c,
            colors: d,
            texCoords: cc.__t(cc.v2fneg(cc.v2fadd(b, a)))
        }, {
            vertices: k,
            colors: d,
            texCoords: cc.__t(cc.v2fsub(b, a))
        }, {
            vertices: m,
            colors: d,
            texCoords: cc.__t(cc.v2fneg(b))
        }, h, this._buffer.length * g));
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle({
                vertices: f,
                colors: d,
                texCoords: cc.__t(b)
            }, {
                vertices: k,
                colors: d,
                texCoords: cc.__t(cc.v2fsub(b, a))
            }, {
                vertices: m,
                colors: d,
                texCoords: cc.__t(cc.v2fneg(b))
            },
            h, this._buffer.length * g));
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle({
            vertices: f,
            colors: d,
            texCoords: cc.__t(b)
        }, {
            vertices: n,
            colors: d,
            texCoords: cc.__t(cc.v2fneg(b))
        }, {
            vertices: m,
            colors: d,
            texCoords: cc.__t(cc.v2fneg(b))
        }, h, this._buffer.length * g));
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle({
            vertices: f,
            colors: d,
            texCoords: cc.__t(b)
        }, {
            vertices: n,
            colors: d,
            texCoords: cc.__t(cc.v2fneg(b))
        }, {
            vertices: p,
            colors: d,
            texCoords: cc.__t(b)
        }, h, this._buffer.length * g));
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle({
            vertices: q,
            colors: d,
            texCoords: cc.__t(cc.v2fsub(a, b))
        }, {
            vertices: n,
            colors: d,
            texCoords: cc.__t(cc.v2fneg(b))
        }, {
            vertices: p,
            colors: d,
            texCoords: cc.__t(b)
        }, h, this._buffer.length * g));
        this._buffer.push(new cc.V2F_C4B_T2F_Triangle({
            vertices: q,
            colors: d,
            texCoords: cc.__t(cc.v2fsub(a, b))
        }, {
            vertices: e,
            colors: d,
            texCoords: cc.__t(cc.v2fadd(b, a))
        }, {
            vertices: p,
            colors: d,
            texCoords: cc.__t(b)
        }, h, this._buffer.length * g));
        this._dirty = !0
    },
    drawPoly: function(a, b, c, d) {
        b = {
            r: 0 | 255 * b.r,
            g: 0 | 255 * b.g,
            b: 0 | 255 * b.b,
            a: 0 | 255 * b.a
        };
        d = {
            r: 0 | 255 * d.r,
            g: 0 |
                255 * d.g,
            b: 0 | 255 * d.b,
            a: 0 | 255 * d.a
        };
        var e = [],
            f, g, h, k, m = a.length;
        for (f = 0; f < m; f++) {
            g = cc.__v2f(a[(f - 1 + m) % m]);
            h = cc.__v2f(a[f]);
            k = cc.__v2f(a[(f + 1) % m]);
            var n = cc.v2fnormalize(cc.v2fperp(cc.v2fsub(h, g)));
            h = cc.v2fnormalize(cc.v2fperp(cc.v2fsub(k, h)));
            n = cc.v2fmult(cc.v2fadd(n, h), 1 / (cc.v2fdot(n, h) + 1));
            e[f] = {
                offset: n,
                n: h
            }
        }
        n = 0 < c;
        this._ensureCapacity(3 * (3 * m - 2));
        var p = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT,
            q = this._trianglesArrayBuffer,
            r = this._buffer,
            s = !1 == n ? 0.5 : 0;
        for (f = 0; f < m - 2; f++) g = cc.v2fsub(cc.__v2f(a[0]), cc.v2fmult(e[0].offset,
            s)), h = cc.v2fsub(cc.__v2f(a[f + 1]), cc.v2fmult(e[f + 1].offset, s)), k = cc.v2fsub(cc.__v2f(a[f + 2]), cc.v2fmult(e[f + 2].offset, s)), r.push(new cc.V2F_C4B_T2F_Triangle({
            vertices: g,
            colors: b,
            texCoords: cc.__t(cc.v2fzero())
        }, {
            vertices: h,
            colors: b,
            texCoords: cc.__t(cc.v2fzero())
        }, {
            vertices: k,
            colors: b,
            texCoords: cc.__t(cc.v2fzero())
        }, q, r.length * p));
        for (f = 0; f < m; f++) {
            s = (f + 1) % m;
            g = cc.__v2f(a[f]);
            h = cc.__v2f(a[s]);
            k = e[f].n;
            var t = e[f].offset,
                u = e[s].offset,
                s = n ? cc.v2fsub(g, cc.v2fmult(t, c)) : cc.v2fsub(g, cc.v2fmult(t, 0.5)),
                v = n ? cc.v2fsub(h,
                    cc.v2fmult(u, c)) : cc.v2fsub(h, cc.v2fmult(u, 0.5));
            g = n ? cc.v2fadd(g, cc.v2fmult(t, c)) : cc.v2fadd(g, cc.v2fmult(t, 0.5));
            h = n ? cc.v2fadd(h, cc.v2fmult(u, c)) : cc.v2fadd(h, cc.v2fmult(u, 0.5));
            n ? (r.push(new cc.V2F_C4B_T2F_Triangle({
                vertices: s,
                colors: d,
                texCoords: cc.__t(cc.v2fneg(k))
            }, {
                vertices: v,
                colors: d,
                texCoords: cc.__t(cc.v2fneg(k))
            }, {
                vertices: h,
                colors: d,
                texCoords: cc.__t(k)
            }, q, r.length * p)), r.push(new cc.V2F_C4B_T2F_Triangle({
                vertices: s,
                colors: d,
                texCoords: cc.__t(cc.v2fneg(k))
            }, {
                vertices: g,
                colors: d,
                texCoords: cc.__t(k)
            }, {
                vertices: h,
                colors: d,
                texCoords: cc.__t(k)
            }, q, r.length * p))) : (r.push(new cc.V2F_C4B_T2F_Triangle({
                vertices: s,
                colors: b,
                texCoords: cc.__t(cc.v2fzero())
            }, {
                vertices: v,
                colors: b,
                texCoords: cc.__t(cc.v2fzero())
            }, {
                vertices: h,
                colors: b,
                texCoords: cc.__t(k)
            }, q, r.length * p)), r.push(new cc.V2F_C4B_T2F_Triangle({
                vertices: s,
                colors: b,
                texCoords: cc.__t(cc.v2fzero())
            }, {
                vertices: g,
                colors: b,
                texCoords: cc.__t(k)
            }, {
                vertices: h,
                colors: b,
                texCoords: cc.__t(k)
            }, q, r.length * p)))
        }
        this._dirty = !0
    },
    clear: function() {
        this._buffer.length = 0;
        this._dirty = !0
    }
});
cc.DrawNode = cc.Browser.supportWebGL ? cc.DrawNodeWebGL : cc.DrawNodeCanvas;
cc.DrawNode.create = function() {
    var a = new cc.DrawNode;
    return a && a.init() ? a : null
};
cc._DrawNodeElement = function(a, b, c, d, e, f, g, h, k) {
    this.type = a;
    this.verts = b || null;
    this.fillColor = c || null;
    this.lineWidth = d || 0;
    this.lineColor = e || null;
    this.lineCap = f || "butt";
    this.isClosePolygon = g || !1;
    this.isFill = h || !1;
    this.isStroke = k || !1
};
cc.DrawNode.TYPE_DOT = 0;
cc.DrawNode.TYPE_SEGMENT = 1;
cc.DrawNode.TYPE_POLY = 2;
cc.ACTION_TAG_INVALID = -1;
cc.Action = cc.Class.extend({
    _originalTarget: null,
    _target: null,
    _tag: cc.ACTION_TAG_INVALID,
    ctor: function() {
        this._target = this._originalTarget = null;
        this._tag = cc.ACTION_TAG_INVALID
    },
    description: function() {
        return "\x3ccc.Action | Tag \x3d " + this._tag + "\x3e"
    },
    copy: function() {
        return this.clone()
    },
    clone: function() {
        var a = new cc.Action;
        a._originalTarget = null;
        a._target = null;
        a._tag = this._tag;
        return a
    },
    isDone: function() {
        return !0
    },
    startWithTarget: function(a) {
        this._target = this._originalTarget = a
    },
    stop: function() {
        this._target =
            null
    },
    step: function(a) {
        cc.log("[Action step]. override me")
    },
    update: function(a) {
        cc.log("[Action update]. override me")
    },
    getTarget: function() {
        return this._target
    },
    setTarget: function(a) {
        this._target = a
    },
    getOriginalTarget: function() {
        return this._originalTarget
    },
    setOriginalTarget: function(a) {
        this._originalTarget = a
    },
    getTag: function() {
        return this._tag
    },
    setTag: function(a) {
        this._tag = a
    },
    retain: function() {},
    release: function() {}
});
cc.Action.create = function() {
    return new cc.Action
};
cc.FiniteTimeAction = cc.Action.extend({
    _duration: 0,
    ctor: function() {
        cc.Action.prototype.ctor.call(this);
        this._duration = 0
    },
    getDuration: function() {
        return this._duration
    },
    setDuration: function(a) {
        this._duration = a
    },
    reverse: function() {
        cc.log("cocos2d: FiniteTimeAction#reverse: Implement me");
        return null
    },
    clone: function() {
        return new cc.FiniteTimeAction
    }
});
cc.Speed = cc.Action.extend({
    _speed: 0,
    _innerAction: null,
    ctor: function() {
        cc.Action.prototype.ctor.call(this);
        this._speed = 0;
        this._innerAction = null
    },
    getSpeed: function() {
        return this._speed
    },
    setSpeed: function(a) {
        this._speed = a
    },
    initWithAction: function(a, b) {
        if (!a) throw "cc.Speed.initWithAction(): action must be non nil";
        this._innerAction = a;
        this._speed = b;
        return !0
    },
    clone: function() {
        var a = new cc.Speed;
        a.initWithAction(this._innerAction.clone(), this._speed);
        return a
    },
    startWithTarget: function(a) {
        cc.Action.prototype.startWithTarget.call(this,
            a);
        this._innerAction.startWithTarget(a)
    },
    stop: function() {
        this._innerAction.stop();
        cc.Action.prototype.stop.call(this)
    },
    step: function(a) {
        this._innerAction.step(a * this._speed)
    },
    isDone: function() {
        return this._innerAction.isDone()
    },
    reverse: function() {
        return cc.Speed.create(this._innerAction.reverse(), this._speed)
    },
    setInnerAction: function(a) {
        this._innerAction != a && (this._innerAction = a)
    },
    getInnerAction: function() {
        return this._innerAction
    }
});
cc.Speed.create = function(a, b) {
    var c = new cc.Speed;
    return c && c.initWithAction(a, b) ? c : null
};
cc.Follow = cc.Action.extend({
    _followedNode: null,
    _boundarySet: !1,
    _boundaryFullyCovered: !1,
    _halfScreenSize: null,
    _fullScreenSize: null,
    leftBoundary: 0,
    rightBoundary: 0,
    topBoundary: 0,
    bottomBoundary: 0,
    _worldRect: null,
    ctor: function() {
        cc.Action.prototype.ctor.call(this);
        this._followedNode = null;
        this._boundaryFullyCovered = this._boundarySet = !1;
        this._fullScreenSize = this._halfScreenSize = null;
        this.bottomBoundary = this.topBoundary = this.rightBoundary = this.leftBoundary = 0;
        this._worldRect = cc.RectZero()
    },
    clone: function() {
        var a =
            new cc.Follow,
            b = this._worldRect,
            b = new cc.Rect(b.x, b.y, b.width, b.height);
        a.initWithTarget(this._followedNode, b);
        return a
    },
    isBoundarySet: function() {
        return this._boundarySet
    },
    setBoudarySet: function(a) {
        this._boundarySet = a
    },
    initWithTarget: function(a, b) {
        if (!a) throw "cc.Follow.initWithAction(): followedNode must be non nil";
        b = b || cc.RectZero();
        this._followedNode = a;
        this._worldRect = b;
        this._boundarySet = !cc._rectEqualToZero(b);
        this._boundaryFullyCovered = !1;
        var c = cc.Director.getInstance().getWinSize();
        this._fullScreenSize =
            cc.p(c.width, c.height);
        this._halfScreenSize = cc.pMult(this._fullScreenSize, 0.5);
        this._boundarySet && (this.leftBoundary = -(b.x + b.width - this._fullScreenSize.x), this.rightBoundary = -b.x, this.topBoundary = -b.y, this.bottomBoundary = -(b.y + b.height - this._fullScreenSize.y), this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2), this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2), this.topBoundary ==
            this.bottomBoundary && this.leftBoundary == this.rightBoundary && (this._boundaryFullyCovered = !0));
        return !0
    },
    step: function(a) {
        a = this._followedNode.getPositionX();
        var b = this._followedNode.getPositionY();
        a = this._halfScreenSize.x - a;
        b = this._halfScreenSize.y - b;
        this._boundarySet ? this._boundaryFullyCovered || this._target.setPosition(cc.clampf(a, this.leftBoundary, this.rightBoundary), cc.clampf(b, this.bottomBoundary, this.topBoundary)) : this._target.setPosition(a, b)
    },
    isDone: function() {
        return !this._followedNode.isRunning()
    },
    stop: function() {
        this._target = null;
        cc.Action.prototype.stop.call(this)
    }
});
cc.Follow.create = function(a, b) {
    b = b || new cc.RectZero;
    var c = new cc.Follow;
    return null != b && c && c.initWithTarget(a, b) || c && c.initWithTarget(a) ? c : null
};
cc.ActionInterval = cc.FiniteTimeAction.extend({
    _elapsed: 0,
    _firstTick: !1,
    ctor: function() {
        cc.FiniteTimeAction.prototype.ctor.call(this);
        this._elapsed = 0;
        this._firstTick = !1
    },
    getElapsed: function() {
        return this._elapsed
    },
    initWithDuration: function(a) {
        this._duration = 0 === a ? cc.FLT_EPSILON : a;
        this._elapsed = 0;
        return this._firstTick = !0
    },
    isDone: function() {
        return this._elapsed >= this._duration
    },
    clone: function() {
        var a = new cc.ActionInterval;
        a.initWithDuration(this._duration);
        return a
    },
    step: function(a) {
        this._firstTick ?
            (this._firstTick = !1, this._elapsed = 0) : this._elapsed += a;
        a = this._elapsed / (1.192092896E-7 < this._duration ? this._duration : 1.192092896E-7);
        a = 1 > a ? a : 1;
        this.update(0 < a ? a : 0)
    },
    startWithTarget: function(a) {
        cc.Action.prototype.startWithTarget.call(this, a);
        this._elapsed = 0;
        this._firstTick = !0
    },
    reverse: function() {
        cc.log("cc.IntervalAction: reverse not implemented.");
        return null
    },
    setAmplitudeRate: function(a) {
        cc.log("cc.ActionInterval.setAmplitudeRate(): it should be overridden in subclass.")
    },
    getAmplitudeRate: function() {
        cc.log("cc.ActionInterval.getAmplitudeRate(): it should be overridden in subclass.")
    }
});
cc.ActionInterval.create = function(a) {
    var b = new cc.ActionInterval;
    b.initWithDuration(a);
    return b
};
cc.Sequence = cc.ActionInterval.extend({
    _actions: null,
    _split: null,
    _last: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._actions = [];
        this._split = null;
        this._last = 0
    },
    initWithTwoActions: function(a, b) {
        if (!a || !b) throw "cc.Sequence.initWithTwoActions(): arguments must all be non nil";
        var c = a.getDuration() + b.getDuration();
        this.initWithDuration(c);
        this._actions[0] = a;
        this._actions[1] = b;
        return !0
    },
    clone: function() {
        var a = new cc.Sequence;
        a.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._split = this._actions[0].getDuration() / this._duration;
        this._last = -1
    },
    stop: function() {
        -1 !== this._last && this._actions[this._last].stop();
        cc.Action.prototype.stop.call(this)
    },
    update: function(a) {
        var b = 0,
            c = this._split,
            d = this._actions,
            e = this._last;
        a < c ? (a = 0 !== c ? a / c : 1, 0 === b && 1 === e && (d[1].update(0), d[1].stop())) : (b = 1, a = 1 === c ? 1 : (a - c) / (1 - c), -1 === e && (d[0].startWithTarget(this._target), d[0].update(1), d[0].stop()),
            e || (d[0].update(1), d[0].stop()));
        e === b && d[b].isDone() || (e !== b && d[b].startWithTarget(this._target), d[b].update(a), this._last = b)
    },
    reverse: function() {
        return cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse())
    },
    copy: function() {
        return this.clone()
    }
});
cc.Sequence.create = function(a) {
    var b = a instanceof Array ? a : arguments;
    0 < b.length && null == b[b.length - 1] && cc.log("parameters should not be ending with null in Javascript");
    for (var c = b[0], d = 1; d < b.length; d++) b[d] && (c = cc.Sequence._actionOneTwo(c, b[d]));
    return c
};
cc.Sequence._actionOneTwo = function(a, b) {
    var c = new cc.Sequence;
    c.initWithTwoActions(a, b);
    return c
};
cc.Repeat = cc.ActionInterval.extend({
    _times: 0,
    _total: 0,
    _nextDt: 0,
    _actionInstant: !1,
    _innerAction: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._nextDt = this._total = this._times = 0;
        this._actionInstant = !1;
        this._innerAction = null
    },
    initWithAction: function(a, b) {
        var c = a.getDuration() * b;
        return this.initWithDuration(c) ? (this._times = b, this._innerAction = a, a instanceof cc.ActionInstant && (this._times -= 1), this._total = 0, !0) : !1
    },
    clone: function() {
        var a = new cc.Repeat;
        a.initWithAction(this._innerAction.clone(),
            this._times);
        return a
    },
    startWithTarget: function(a) {
        this._total = 0;
        this._nextDt = this._innerAction.getDuration() / this._duration;
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._innerAction.startWithTarget(a)
    },
    stop: function() {
        this._innerAction.stop();
        cc.Action.prototype.stop.call(this)
    },
    update: function(a) {
        var b = this._innerAction,
            c = this._duration,
            d = this._times,
            e = this._nextDt;
        if (a >= e) {
            for (; a > e && this._total < d;) b.update(1), this._total++, b.stop(), b.startWithTarget(this._target), this._nextDt =
                e += b.getDuration() / c;
            1 <= a && this._total < d && this._total++;
            this._actionInstant && (this._total == d ? (b.update(1), b.stop()) : b.update(a - (e - b.getDuration() / c)))
        } else b.update(a * d % 1)
    },
    isDone: function() {
        return this._total == this._times
    },
    reverse: function() {
        return cc.Repeat.create(this._innerAction.reverse(), this._times)
    },
    setInnerAction: function(a) {
        this._innerAction != a && (this._innerAction = a)
    },
    getInnerAction: function() {
        return this._innerAction
    }
});
cc.Repeat.create = function(a, b) {
    var c = new cc.Repeat;
    c.initWithAction(a, b);
    return c
};
cc.RepeatForever = cc.ActionInterval.extend({
    _innerAction: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._innerAction = null
    },
    initWithAction: function(a) {
        if (!a) throw "cc.RepeatForever.initWithAction(): action must be non null";
        this._innerAction = a;
        return !0
    },
    clone: function() {
        var a = new cc.RepeatForever;
        a.initWithAction(this._innerAction.clone());
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._innerAction.startWithTarget(a)
    },
    step: function(a) {
        var b =
            this._innerAction;
        b.step(a);
        b.isDone() && (b.startWithTarget(this._target), b.step(b.getElapsed() - b.getDuration()))
    },
    isDone: function() {
        return !1
    },
    reverse: function() {
        return cc.RepeatForever.create(this._innerAction.reverse())
    },
    setInnerAction: function(a) {
        this._innerAction != a && (this._innerAction = a)
    },
    getInnerAction: function() {
        return this._innerAction
    }
});
cc.RepeatForever.create = function(a) {
    var b = new cc.RepeatForever;
    return b && b.initWithAction(a) ? b : null
};
cc.Spawn = cc.ActionInterval.extend({
    _one: null,
    _two: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._two = this._one = null
    },
    initWithTwoActions: function(a, b) {
        if (!a || !b) throw "cc.Spawn.initWithTwoActions(): arguments must all be non null";
        var c = !1,
            d = a.getDuration(),
            e = b.getDuration();
        this.initWithDuration(Math.max(d, e)) && (this._one = a, this._two = b, d > e ? this._two = cc.Sequence._actionOneTwo(b, cc.DelayTime.create(d - e)) : d < e && (this._one = cc.Sequence._actionOneTwo(a, cc.DelayTime.create(e - d))), c = !0);
        return c
    },
    clone: function() {
        var a = new cc.Spawn;
        a.initWithTwoActions(this._one.clone(), this._two.clone());
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._one.startWithTarget(a);
        this._two.startWithTarget(a)
    },
    stop: function() {
        this._one.stop();
        this._two.stop();
        cc.Action.prototype.stop.call(this)
    },
    update: function(a) {
        this._one && this._one.update(a);
        this._two && this._two.update(a)
    },
    reverse: function() {
        return cc.Spawn._actionOneTwo(this._one.reverse(), this._two.reverse())
    }
});
cc.Spawn.create = function(a) {
    var b = a instanceof Array ? a : arguments;
    0 < b.length && null == b[b.length - 1] && cc.log("parameters should not be ending with null in Javascript");
    for (var c = b[0], d = 1; d < b.length; d++) null != b[d] && (c = this._actionOneTwo(c, b[d]));
    return c
};
cc.Spawn._actionOneTwo = function(a, b) {
    var c = new cc.Spawn;
    c.initWithTwoActions(a, b);
    return c
};
cc.RotateTo = cc.ActionInterval.extend({
    _dstAngleX: 0,
    _startAngleX: 0,
    _diffAngleX: 0,
    _dstAngleY: 0,
    _startAngleY: 0,
    _diffAngleY: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._diffAngleY = this._startAngleY = this._dstAngleY = this._diffAngleX = this._startAngleX = this._dstAngleX = 0
    },
    initWithDuration: function(a, b, c) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._dstAngleX = b || 0, this._dstAngleY = c || this._dstAngleX, !0) : !1
    },
    clone: function() {
        var a = new cc.RotateTo;
        a.initWithDuration(this._duration,
            this._dstAngleX, this._dstAngleY);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        var b = a.getRotationX() % 360,
            c = this._dstAngleX - b;
        180 < c && (c -= 360); - 180 > c && (c += 360);
        this._startAngleX = b;
        this._diffAngleX = c;
        this._startAngleY = a.getRotationY() % 360;
        a = this._dstAngleY - this._startAngleY;
        180 < a && (a -= 360); - 180 > a && (a += 360);
        this._diffAngleY = a
    },
    reverse: function() {
        cc.log("cc.RotateTo.reverse(): it should be overridden in subclass.")
    },
    update: function(a) {
        this._target && (this._target.setRotationX(this._startAngleX +
            this._diffAngleX * a), this._target.setRotationY(this._startAngleY + this._diffAngleY * a))
    }
});
cc.RotateTo.create = function(a, b, c) {
    var d = new cc.RotateTo;
    d.initWithDuration(a, b, c);
    return d
};
cc.RotateBy = cc.ActionInterval.extend({
    _angleX: 0,
    _startAngleX: 0,
    _angleY: 0,
    _startAngleY: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._startAngleY = this._angleY = this._startAngleX = this._angleX = 0
    },
    initWithDuration: function(a, b, c) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._angleX = b || 0, this._angleY = c || this._angleX, !0) : !1
    },
    clone: function() {
        var a = new cc.RotateBy;
        a.initWithDuration(this._duration, this._angleX, this._angleY);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this,
            a);
        this._startAngleX = a.getRotationX();
        this._startAngleY = a.getRotationY()
    },
    update: function(a) {
        this._target && (this._target.setRotationX(this._startAngleX + this._angleX * a), this._target.setRotationY(this._startAngleY + this._angleY * a))
    },
    reverse: function() {
        return cc.RotateBy.create(this._duration, -this._angleX, -this._angleY)
    }
});
cc.RotateBy.create = function(a, b, c) {
    var d = new cc.RotateBy;
    d.initWithDuration(a, b, c);
    return d
};
cc.MoveBy = cc.ActionInterval.extend({
    _positionDelta: null,
    _startPosition: null,
    _previousPosition: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._positionDelta = cc.p(0, 0);
        this._startPosition = cc.p(0, 0);
        this._previousPosition = cc.p(0, 0)
    },
    initWithDuration: function(a, b) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._positionDelta.x = b.x, this._positionDelta.y = b.y, !0) : !1
    },
    clone: function() {
        var a = new cc.MoveBy;
        a.initWithDuration(this._duration, this._positionDelta);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        var b = a.getPositionX();
        a = a.getPositionY();
        this._previousPosition.x = b;
        this._previousPosition.y = a;
        this._startPosition.x = b;
        this._startPosition.y = a
    },
    update: function(a) {
        if (this._target) {
            var b = this._positionDelta.x * a;
            a *= this._positionDelta.y;
            var c = this._startPosition;
            if (cc.ENABLE_STACKABLE_ACTIONS) {
                var d = this._target.getPositionX(),
                    e = this._target.getPositionY(),
                    f = this._previousPosition;
                c.x = c.x + d - f.x;
                c.y = c.y + e -
                    f.y;
                b += c.x;
                a += c.y;
                this._target.setPosition(b, a);
                f.x = b;
                f.y = a
            } else this._target.setPosition(c.x + b, c.y + a)
        }
    },
    reverse: function() {
        return cc.MoveBy.create(this._duration, cc.p(-this._positionDelta.x, -this._positionDelta.y))
    }
});
cc.MoveBy.create = function(a, b) {
    var c = new cc.MoveBy;
    c.initWithDuration(a, b);
    return c
};
cc.MoveTo = cc.MoveBy.extend({
    _endPosition: null,
    ctor: function() {
        cc.MoveBy.prototype.ctor.call(this);
        this._endPosition = cc.p(0, 0)
    },
    initWithDuration: function(a, b) {
        return cc.MoveBy.prototype.initWithDuration.call(this, a, b) ? (this._endPosition.x = b.x, this._endPosition.y = b.y, !0) : !1
    },
    clone: function() {
        var a = new cc.MoveTo;
        a.initWithDuration(this._duration, this._endPosition);
        return a
    },
    startWithTarget: function(a) {
        cc.MoveBy.prototype.startWithTarget.call(this, a);
        this._positionDelta.x = this._endPosition.x - a.getPositionX();
        this._positionDelta.y = this._endPosition.y - a.getPositionY()
    }
});
cc.MoveTo.create = function(a, b) {
    var c = new cc.MoveTo;
    c.initWithDuration(a, b);
    return c
};
cc.SkewTo = cc.ActionInterval.extend({
    _skewX: 0,
    _skewY: 0,
    _startSkewX: 0,
    _startSkewY: 0,
    _endSkewX: 0,
    _endSkewY: 0,
    _deltaX: 0,
    _deltaY: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._deltaY = this._deltaX = this._endSkewY = this._endSkewX = this._startSkewY = this._startSkewX = this._skewY = this._skewX = 0
    },
    initWithDuration: function(a, b, c) {
        var d = !1;
        cc.ActionInterval.prototype.initWithDuration.call(this, a) && (this._endSkewX = b, this._endSkewY = c, d = !0);
        return d
    },
    clone: function() {
        var a = new cc.SkewTo;
        a.initWithDuration(this._duration,
            this._endSkewX, this._endSkewY);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._startSkewX = a.getSkewX() % 180;
        this._deltaX = this._endSkewX - this._startSkewX;
        180 < this._deltaX && (this._deltaX -= 360); - 180 > this._deltaX && (this._deltaX += 360);
        this._startSkewY = a.getSkewY() % 360;
        this._deltaY = this._endSkewY - this._startSkewY;
        180 < this._deltaY && (this._deltaY -= 360); - 180 > this._deltaY && (this._deltaY += 360)
    },
    update: function(a) {
        this._target.setSkewX(this._startSkewX + this._deltaX *
            a);
        this._target.setSkewY(this._startSkewY + this._deltaY * a)
    }
});
cc.SkewTo.create = function(a, b, c) {
    var d = new cc.SkewTo;
    d && d.initWithDuration(a, b, c);
    return d
};
cc.SkewBy = cc.SkewTo.extend({
    initWithDuration: function(a, b, c) {
        var d = !1;
        cc.SkewTo.prototype.initWithDuration.call(this, a, b, c) && (this._skewX = b, this._skewY = c, d = !0);
        return d
    },
    clone: function() {
        var a = new cc.SkewBy;
        a.initWithDuration(this._duration, this._skewX, this._skewY);
        return a
    },
    startWithTarget: function(a) {
        cc.SkewTo.prototype.startWithTarget.call(this, a);
        this._deltaX = this._skewX;
        this._deltaY = this._skewY;
        this._endSkewX = this._startSkewX + this._deltaX;
        this._endSkewY = this._startSkewY + this._deltaY
    },
    reverse: function() {
        return cc.SkewBy.create(this._duration, -this._skewX, -this._skewY)
    }
});
cc.SkewBy.create = function(a, b, c) {
    var d = new cc.SkewBy;
    d && d.initWithDuration(a, b, c);
    return d
};
cc.JumpBy = cc.ActionInterval.extend({
    _startPosition: null,
    _delta: null,
    _height: 0,
    _jumps: 0,
    _previousPosition: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._startPosition = cc.p(0, 0);
        this._previousPosition = cc.p(0, 0);
        this._delta = cc.p(0, 0);
        this._jumps = this._height = 0
    },
    initWithDuration: function(a, b, c, d) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._delta.x = b.x, this._delta.y = b.y, this._height = c, this._jumps = d, !0) : !1
    },
    clone: function() {
        var a = new cc.JumpBy;
        a.initWithDuration(this._duration,
            this._delta, this._height, this._jumps);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        var b = a.getPositionX();
        a = a.getPositionY();
        this._previousPosition.x = b;
        this._previousPosition.y = a;
        this._startPosition.x = b;
        this._startPosition.y = a
    },
    update: function(a) {
        if (this._target) {
            var b = a * this._jumps % 1,
                b = 4 * this._height * b * (1 - b),
                b = b + this._delta.y * a;
            a *= this._delta.x;
            var c = this._startPosition;
            if (cc.ENABLE_STACKABLE_ACTIONS) {
                var d = this._target.getPositionX(),
                    e = this._target.getPositionY(),
                    f = this._previousPosition;
                c.x = c.x + d - f.x;
                c.y = c.y + e - f.y;
                a += c.x;
                b += c.y;
                this._target.setPosition(a, b);
                f.x = a;
                f.y = b
            } else this._target.setPosition(c.x + a, c.y + b)
        }
    },
    reverse: function() {
        return cc.JumpBy.create(this._duration, cc.p(-this._delta.x, -this._delta.y), this._height, this._jumps)
    }
});
cc.JumpBy.create = function(a, b, c, d) {
    var e = new cc.JumpBy;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.JumpTo = cc.JumpBy.extend({
    startWithTarget: function(a) {
        cc.JumpBy.prototype.startWithTarget.call(this, a);
        this._delta.x -= this._startPosition.x;
        this._delta.y -= this._startPosition.y
    },
    clone: function() {
        var a = new cc.JumpTo;
        a.initWithDuration(this._duration, this._delta, this._height, this._jumps);
        return a
    }
});
cc.JumpTo.create = function(a, b, c, d) {
    var e = new cc.JumpTo;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.bezierAt = function(a, b, c, d, e) {
    return Math.pow(1 - e, 3) * a + 3 * e * Math.pow(1 - e, 2) * b + 3 * Math.pow(e, 2) * (1 - e) * c + Math.pow(e, 3) * d
};
cc.BezierBy = cc.ActionInterval.extend({
    _config: null,
    _startPosition: null,
    _previousPosition: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._config = [];
        this._startPosition = cc.p(0, 0);
        this._previousPosition = cc.p(0, 0)
    },
    initWithDuration: function(a, b) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._config = b, !0) : !1
    },
    clone: function() {
        for (var a = new cc.BezierBy, b = [], c = 0; c < this._config.length; c++) {
            var d = this._config[c];
            b.push(cc.p(d.x, d.y))
        }
        a.initWithDuration(this._duration,
            b);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        var b = a.getPositionX();
        a = a.getPositionY();
        this._previousPosition.x = b;
        this._previousPosition.y = a;
        this._startPosition.x = b;
        this._startPosition.y = a
    },
    update: function(a) {
        if (this._target) {
            var b = this._config,
                c = b[0].y,
                d = b[1].y,
                e = b[2].y,
                b = cc.bezierAt(0, b[0].x, b[1].x, b[2].x, a);
            a = cc.bezierAt(0, c, d, e, a);
            c = this._startPosition;
            if (cc.ENABLE_STACKABLE_ACTIONS) {
                var d = this._target.getPositionX(),
                    e = this._target.getPositionY(),
                    f = this._previousPosition;
                c.x = c.x + d - f.x;
                c.y = c.y + e - f.y;
                b += c.x;
                a += c.y;
                this._target.setPosition(b, a);
                f.x = b;
                f.y = a
            } else this._target.setPosition(c.x + b, c.y + a)
        }
    },
    reverse: function() {
        var a = this._config,
            a = [cc.pAdd(a[1], cc.pNeg(a[2])), cc.pAdd(a[0], cc.pNeg(a[2])), cc.pNeg(a[2])];
        return cc.BezierBy.create(this._duration, a)
    }
});
cc.BezierBy.create = function(a, b) {
    var c = new cc.BezierBy;
    c.initWithDuration(a, b);
    return c
};
cc.BezierTo = cc.BezierBy.extend({
    _toConfig: null,
    ctor: function() {
        cc.BezierBy.prototype.ctor.call(this);
        this._toConfig = []
    },
    initWithDuration: function(a, b) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._toConfig = b, !0) : !1
    },
    clone: function() {
        var a = new cc.BezierTo;
        a.initWithDuration(this._duration, this._toConfig);
        return a
    },
    startWithTarget: function(a) {
        cc.BezierBy.prototype.startWithTarget.call(this, a);
        a = this._startPosition;
        var b = this._toConfig,
            c = this._config;
        c[0] = cc.pSub(b[0], a);
        c[1] =
            cc.pSub(b[1], a);
        c[2] = cc.pSub(b[2], a)
    }
});
cc.BezierTo.create = function(a, b) {
    var c = new cc.BezierTo;
    c.initWithDuration(a, b);
    return c
};
cc.ScaleTo = cc.ActionInterval.extend({
    _scaleX: 1,
    _scaleY: 1,
    _startScaleX: 1,
    _startScaleY: 1,
    _endScaleX: 0,
    _endScaleY: 0,
    _deltaX: 0,
    _deltaY: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._startScaleY = this._startScaleX = this._scaleY = this._scaleX = 1;
        this._deltaY = this._deltaX = this._endScaleY = this._endScaleX = 0
    },
    initWithDuration: function(a, b, c) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._endScaleX = b, this._endScaleY = null != c ? c : b, !0) : !1
    },
    clone: function() {
        var a = new cc.ScaleTo;
        a.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._startScaleX = a.getScaleX();
        this._startScaleY = a.getScaleY();
        this._deltaX = this._endScaleX - this._startScaleX;
        this._deltaY = this._endScaleY - this._startScaleY
    },
    update: function(a) {
        this._target && this._target.setScale(this._startScaleX + this._deltaX * a, this._startScaleY + this._deltaY * a)
    }
});
cc.ScaleTo.create = function(a, b, c) {
    var d = new cc.ScaleTo;
    d.initWithDuration(a, b, c);
    return d
};
cc.ScaleBy = cc.ScaleTo.extend({
    startWithTarget: function(a) {
        cc.ScaleTo.prototype.startWithTarget.call(this, a);
        this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
        this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY
    },
    reverse: function() {
        return cc.ScaleBy.create(this._duration, 1 / this._endScaleX, 1 / this._endScaleY)
    },
    clone: function() {
        var a = new cc.ScaleBy;
        a.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
        return a
    }
});
cc.ScaleBy.create = function(a, b, c) {
    var d = new cc.ScaleBy;
    d.initWithDuration(a, b, c);
    return d
};
cc.Blink = cc.ActionInterval.extend({
    _times: 0,
    _originalState: !1,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._times = 0;
        this._originalState = !1
    },
    initWithDuration: function(a, b) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._times = b, !0) : !1
    },
    clone: function() {
        var a = new cc.Blink;
        a.initWithDuration(this._duration, this._times);
        return a
    },
    update: function(a) {
        if (this._target && !this.isDone()) {
            var b = 1 / this._times;
            this._target.setVisible(a % b > b / 2)
        }
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this,
            a);
        this._originalState = a.isVisible()
    },
    stop: function() {
        this._target.setVisible(this._originalState);
        cc.ActionInterval.prototype.stop.call(this)
    },
    reverse: function() {
        return cc.Blink.create(this._duration, this._times)
    }
});
cc.Blink.create = function(a, b) {
    var c = new cc.Blink;
    c.initWithDuration(a, b);
    return c
};
cc.FadeIn = cc.ActionInterval.extend({
    update: function(a) {
        this._target.RGBAProtocol && this._target.setOpacity(255 * a)
    },
    reverse: function() {
        return cc.FadeOut.create(this._duration)
    },
    clone: function() {
        var a = new cc.FadeIn;
        a.initWithDuration(this._duration);
        return a
    }
});
cc.FadeIn.create = function(a) {
    var b = new cc.FadeIn;
    b.initWithDuration(a);
    return b
};
cc.FadeOut = cc.ActionInterval.extend({
    update: function(a) {
        this._target.RGBAProtocol && this._target.setOpacity(255 * (1 - a))
    },
    reverse: function() {
        return cc.FadeIn.create(this._duration)
    },
    clone: function() {
        var a = new cc.FadeOut;
        a.initWithDuration(this._duration);
        return a
    }
});
cc.FadeOut.create = function(a) {
    var b = new cc.FadeOut;
    b.initWithDuration(a);
    return b
};
cc.FadeTo = cc.ActionInterval.extend({
    _toOpacity: null,
    _fromOpacity: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._fromOpacity = this._toOpacity = 0
    },
    initWithDuration: function(a, b) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._toOpacity = b, !0) : !1
    },
    clone: function() {
        var a = new cc.FadeTo;
        a.initWithDuration(this._duration, this._toOpacity);
        return a
    },
    update: function(a) {
        this._target.RGBAProtocol && this._target.setOpacity(this._fromOpacity + (this._toOpacity - this._fromOpacity) *
            a)
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._target.RGBAProtocol && (this._fromOpacity = a.getOpacity())
    }
});
cc.FadeTo.create = function(a, b) {
    var c = new cc.FadeTo;
    c.initWithDuration(a, b);
    return c
};
cc.TintTo = cc.ActionInterval.extend({
    _to: null,
    _from: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._to = cc.c3b(0, 0, 0);
        this._from = cc.c3b(0, 0, 0)
    },
    initWithDuration: function(a, b, c, d) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._to = cc.c3b(b, c, d), !0) : !1
    },
    clone: function() {
        var a = new cc.TintTo,
            b = this._to;
        a.initWithDuration(this._duration, b.r, b.g, b.b);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._target.RGBAProtocol &&
            (this._from = this._target.getColor())
    },
    update: function(a) {
        var b = this._from,
            c = this._to;
        this._target.RGBAProtocol && this._target.setColor(cc.c3b(b.r + (c.r - b.r) * a, b.g + (c.g - b.g) * a, b.b + (c.b - b.b) * a))
    }
});
cc.TintTo.create = function(a, b, c, d) {
    var e = new cc.TintTo;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.TintBy = cc.ActionInterval.extend({
    _deltaR: 0,
    _deltaG: 0,
    _deltaB: 0,
    _fromR: 0,
    _fromG: 0,
    _fromB: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._fromB = this._fromG = this._fromR = this._deltaB = this._deltaG = this._deltaR = 0
    },
    initWithDuration: function(a, b, c, d) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._deltaR = b, this._deltaG = c, this._deltaB = d, !0) : !1
    },
    clone: function() {
        var a = new cc.TintBy;
        a.initWithDuration(this._duration, this._deltaR, this._deltaG, this._deltaB);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        a.RGBAProtocol && (a = a.getColor(), this._fromR = a.r, this._fromG = a.g, this._fromB = a.b)
    },
    update: function(a) {
        this._target.RGBAProtocol && this._target.setColor(cc.c3b(this._fromR + this._deltaR * a, this._fromG + this._deltaG * a, this._fromB + this._deltaB * a))
    },
    reverse: function() {
        return cc.TintBy.create(this._duration, -this._deltaR, -this._deltaG, -this._deltaB)
    }
});
cc.TintBy.create = function(a, b, c, d) {
    var e = new cc.TintBy;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.DelayTime = cc.ActionInterval.extend({
    update: function(a) {},
    reverse: function() {
        return cc.DelayTime.create(this._duration)
    },
    clone: function() {
        var a = new cc.DelayTime;
        a.initWithDuration(this._duration);
        return a
    }
});
cc.DelayTime.create = function(a) {
    var b = new cc.DelayTime;
    b.initWithDuration(a);
    return b
};
cc.ReverseTime = cc.ActionInterval.extend({
    _other: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._other = null
    },
    initWithAction: function(a) {
        if (!a) throw "cc.ReverseTime.initWithAction(): action must be non null";
        if (a == this._other) throw "cc.ReverseTime.initWithAction(): the action was already passed in.";
        return cc.ActionInterval.prototype.initWithDuration.call(this, a.getDuration()) ? (this._other = a, !0) : !1
    },
    clone: function() {
        var a = new cc.ReverseTime;
        a.initWithAction(this._other.clone());
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._other.startWithTarget(a)
    },
    update: function(a) {
        this._other && this._other.update(1 - a)
    },
    reverse: function() {
        return this._other.clone()
    },
    stop: function() {
        this._other.stop();
        cc.Action.prototype.stop.call(this)
    }
});
cc.ReverseTime.create = function(a) {
    var b = new cc.ReverseTime;
    b.initWithAction(a);
    return b
};
cc.Animate = cc.ActionInterval.extend({
    _animation: null,
    _nextFrame: 0,
    _origFrame: null,
    _executedLoops: 0,
    _splitTimes: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._animation = null;
        this._nextFrame = 0;
        this._origFrame = null;
        this._executedLoops = 0;
        this._splitTimes = []
    },
    getAnimation: function() {
        return this._animation
    },
    setAnimation: function(a) {
        this._animation = a
    },
    initWithAnimation: function(a) {
        if (!a) throw "cc.Animate.initWithAnimation(): animation must be non-NULL";
        var b = a.getDuration();
        if (this.initWithDuration(b *
            a.getLoops())) {
            this._nextFrame = 0;
            this.setAnimation(a);
            this._origFrame = null;
            this._executedLoops = 0;
            var c = this._splitTimes,
                d = c.length = 0,
                e = b / a.getTotalDelayUnits();
            a = a.getFrames();
            cc.ArrayVerifyType(a, cc.AnimationFrame);
            for (var f = 0; f < a.length; f++) {
                var g = d * e / b,
                    d = d + a[f].getDelayUnits();
                c.push(g)
            }
            return !0
        }
        return !1
    },
    clone: function() {
        var a = new cc.Animate;
        a.initWithAnimation(this._animation.clone());
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._animation.getRestoreOriginalFrame() &&
            (this._origFrame = a.displayFrame());
        this._executedLoops = this._nextFrame = 0
    },
    update: function(a) {
        1 > a && (a *= this._animation.getLoops(), (0 | a) > this._executedLoops && (this._nextFrame = 0, this._executedLoops++), a %= 1);
        for (var b = this._animation.getFrames(), c = b.length, d = this._splitTimes, e = this._nextFrame; e < c; e++)
            if (d[e] <= a) this._target.setDisplayFrame(b[e].getSpriteFrame()), this._nextFrame = e + 1;
            else break
    },
    reverse: function() {
        var a = this._animation,
            b = a.getFrames(),
            c = [];
        cc.ArrayVerifyType(b, cc.AnimationFrame);
        if (0 < b.length)
            for (var d =
                b.length - 1; 0 <= d; d--) {
                var e = b[d];
                if (!e) break;
                c.push(e.clone())
            }
        b = cc.Animation.createWithAnimationFrames(c, a.getDelayPerUnit(), a.getLoops());
        b.setRestoreOriginalFrame(a.getRestoreOriginalFrame());
        return cc.Animate.create(b)
    },
    stop: function() {
        this._animation.getRestoreOriginalFrame() && this._target && this._target.setDisplayFrame(this._origFrame);
        cc.Action.prototype.stop.call(this)
    }
});
cc.Animate.create = function(a) {
    var b = new cc.Animate;
    b.initWithAnimation(a);
    return b
};
cc.TargetedAction = cc.ActionInterval.extend({
    _action: null,
    _forcedTarget: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._forcedTarget = this._action = null
    },
    initWithTarget: function(a, b) {
        return this.initWithDuration(b.getDuration()) ? (this._forcedTarget = a, this._action = b, !0) : !1
    },
    clone: function() {
        var a = new cc.TargetedAction;
        a.initWithTarget(this._forcedTarget, this._action.clone());
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._action.startWithTarget(this._forcedTarget)
    },
    stop: function() {
        this._action.stop()
    },
    update: function(a) {
        this._action.update(a)
    },
    getForcedTarget: function() {
        return this._forcedTarget
    },
    setForcedTarget: function(a) {
        this._forcedTarget != a && (this._forcedTarget = a)
    }
});
cc.TargetedAction.create = function(a, b) {
    var c = new cc.TargetedAction;
    c.initWithTarget(a, b);
    return c
};
cc.ActionInstant = cc.FiniteTimeAction.extend({
    isDone: function() {
        return !0
    },
    step: function(a) {
        this.update(1)
    },
    update: function(a) {},
    reverse: function() {
        return this.clone()
    },
    clone: function() {
        return new cc.ActionInstant
    }
});
cc.Show = cc.ActionInstant.extend({
    update: function(a) {
        this._target.setVisible(!0)
    },
    reverse: function() {
        return cc.Hide.create()
    },
    clone: function() {
        return new cc.Show
    }
});
cc.Show.create = function() {
    return new cc.Show
};
cc.Hide = cc.ActionInstant.extend({
    update: function(a) {
        this._target.setVisible(!1)
    },
    reverse: function() {
        return cc.Show.create()
    },
    clone: function() {
        return new cc.Hide
    }
});
cc.Hide.create = function() {
    return new cc.Hide
};
cc.ToggleVisibility = cc.ActionInstant.extend({
    update: function(a) {
        this._target.setVisible(!this._target.isVisible())
    },
    reverse: function() {
        return new cc.ToggleVisibility
    },
    clone: function() {
        return new cc.ToggleVisibility
    }
});
cc.ToggleVisibility.create = function() {
    return new cc.ToggleVisibility
};
cc.RemoveSelf = cc.ActionInstant.extend({
    _isNeedCleanUp: !0,
    ctor: function() {
        cc.FiniteTimeAction.prototype.ctor.call(this);
        this._isNeedCleanUp = !0
    },
    update: function(a) {
        this._target.removeFromParent(this._isNeedCleanUp)
    },
    init: function(a) {
        this._isNeedCleanUp = a;
        return !0
    },
    reverse: function() {
        return new cc.RemoveSelf(this._isNeedCleanUp)
    },
    clone: function() {
        return new cc.RemoveSelf(this._isNeedCleanUp)
    }
});
cc.RemoveSelf.create = function(a) {
    null == a && (a = !0);
    var b = new cc.RemoveSelf;
    b && b.init(a);
    return b
};
cc.FlipX = cc.ActionInstant.extend({
    _flippedX: !1,
    ctor: function() {
        cc.FiniteTimeAction.prototype.ctor.call(this);
        this._flippedX = !1
    },
    initWithFlipX: function(a) {
        this._flippedX = a;
        return !0
    },
    update: function(a) {
        this._target.setFlippedX(this._flippedX)
    },
    reverse: function() {
        return cc.FlipX.create(!this._flippedX)
    },
    clone: function() {
        var a = new cc.FlipX;
        a.initWithFlipX(this._flippedX);
        return a
    }
});
cc.FlipX.create = function(a) {
    var b = new cc.FlipX;
    return b.initWithFlipX(a) ? b : null
};
cc.FlipY = cc.ActionInstant.extend({
    _flippedY: !1,
    ctor: function() {
        cc.FiniteTimeAction.prototype.ctor.call(this);
        this._flippedY = !1
    },
    initWithFlipY: function(a) {
        this._flippedY = a;
        return !0
    },
    update: function(a) {
        this._target.setFlippedY(this._flippedY)
    },
    reverse: function() {
        return cc.FlipY.create(!this._flippedY)
    },
    clone: function() {
        var a = new cc.FlipY;
        a.initWithFlipY(this._flippedY);
        return a
    }
});
cc.FlipY.create = function(a) {
    var b = new cc.FlipY;
    return b.initWithFlipY(a) ? b : null
};
cc.Place = cc.ActionInstant.extend({
    _position: null,
    ctor: function() {
        cc.FiniteTimeAction.prototype.ctor.call(this);
        this._position = cc.p(0, 0)
    },
    initWithPosition: function(a) {
        this._position.x = a.x;
        this._position.y = a.y;
        return !0
    },
    update: function(a) {
        this._target.setPosition(this._position)
    },
    clone: function() {
        var a = new cc.Place;
        a.initWithPosition(this._position);
        return a
    }
});
cc.Place.create = function(a) {
    var b = new cc.Place;
    b.initWithPosition(a);
    return b
};
cc.CallFunc = cc.ActionInstant.extend({
    _selectorTarget: null,
    _callFunc: null,
    _function: null,
    _data: null,
    ctor: function() {
        cc.FiniteTimeAction.prototype.ctor.call(this);
        this._data = this._function = this._callFunc = this._selectorTarget = null
    },
    initWithTarget: function(a, b, c) {
        this._data = c;
        this._callFunc = a;
        this._selectorTarget = b;
        return !0
    },
    initWithFunction: function(a) {
        this._function = a;
        return !0
    },
    execute: function() {
        null != this._callFunc ? this._callFunc.call(this._selectorTarget, this._target, this._data) : this._function &&
            this._function.call(null, this._target)
    },
    update: function(a) {
        this.execute()
    },
    getTargetCallback: function() {
        return this._selectorTarget
    },
    setTargetCallback: function(a) {
        a != this._selectorTarget && (this._selectorTarget && (this._selectorTarget = null), this._selectorTarget = a)
    },
    copy: function() {
        var a = new cc.CallFunc;
        this._selectorTarget ? a.initWithTarget(this._callFunc, this._selectorTarget, this._data) : this._function && a.initWithFunction(this._function);
        return a
    },
    clone: function() {
        var a = new cc.CallFunc;
        this._selectorTarget ?
            a.initWithTarget(this._callFunc, this._selectorTarget, this._data) : this._function && a.initWithFunction(this._function);
        return a
    }
});
cc.CallFunc.create = function(a, b, c) {
    var d = new cc.CallFunc;
    if (1 == arguments.length) {
        if (d && d.initWithFunction(a)) return d
    } else if (d && d.initWithTarget(a, b, c)) return d._callFunc = a, d;
    return null
};
cc.ActionCamera = cc.ActionInterval.extend({
    _centerXOrig: 0,
    _centerYOrig: 0,
    _centerZOrig: 0,
    _eyeXOrig: 0,
    _eyeYOrig: 0,
    _eyeZOrig: 0,
    _upXOrig: 0,
    _upYOrig: 0,
    _upZOrig: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._upZOrig = this._upYOrig = this._upXOrig = this._eyeZOrig = this._eyeYOrig = this._eyeXOrig = this._centerZOrig = this._centerYOrig = this._centerXOrig = 0
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        a = a.getCamera();
        var b = a.getCenter();
        this._centerXOrig = b.x;
        this._centerYOrig = b.y;
        this._centerZOrig = b.z;
        b = a.getEye();
        this._eyeXOrig = b.x;
        this._eyeYOrig = b.y;
        this._eyeZOrig = b.z;
        a = a.getUp();
        this._upXOrig = a.x;
        this._upYOrig = a.y;
        this._upZOrig = a.z
    },
    clone: function() {
        return new cc.ActionCamera
    },
    reverse: function() {
        return cc.ReverseTime.create(this)
    }
});
cc.OrbitCamera = cc.ActionCamera.extend({
    _radius: 0,
    _deltaRadius: 0,
    _angleZ: 0,
    _deltaAngleZ: 0,
    _angleX: 0,
    _deltaAngleX: 0,
    _radZ: 0,
    _radDeltaZ: 0,
    _radX: 0,
    _radDeltaX: 0,
    ctor: function() {
        cc.ActionCamera.prototype.ctor.call(this);
        this._radDeltaX = this._radX = this._radDeltaZ = this._radZ = this._deltaAngleX = this._angleX = this._deltaAngleZ = this._angleZ = this._deltaRadius = this._radius = 0
    },
    initWithDuration: function(a, b, c, d, e, f, g) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._radius = b, this._deltaRadius =
            c, this._angleZ = d, this._deltaAngleZ = e, this._angleX = f, this._deltaAngleX = g, this._radDeltaZ = cc.DEGREES_TO_RADIANS(e), this._radDeltaX = cc.DEGREES_TO_RADIANS(g), !0) : !1
    },
    sphericalRadius: function() {
        var a, b;
        b = this._target.getCamera();
        var c = b.getEye();
        a = b.getCenter();
        b = c.x - a.x;
        var d = c.y - a.y;
        a = c.z - a.z;
        var c = Math.sqrt(Math.pow(b, 2) + Math.pow(d, 2) + Math.pow(a, 2)),
            e = Math.sqrt(Math.pow(b, 2) + Math.pow(d, 2));
        0 === e && (e = cc.FLT_EPSILON);
        0 === c && (c = cc.FLT_EPSILON);
        a = Math.acos(a / c);
        b = 0 > b ? Math.PI - Math.asin(d / e) : Math.asin(d /
            e);
        return {
            newRadius: c / cc.Camera.getZEye(),
            zenith: a,
            azimuth: b
        }
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        a = this.sphericalRadius();
        isNaN(this._radius) && (this._radius = a.newRadius);
        isNaN(this._angleZ) && (this._angleZ = cc.RADIANS_TO_DEGREES(a.zenith));
        isNaN(this._angleX) && (this._angleX = cc.RADIANS_TO_DEGREES(a.azimuth));
        this._radZ = cc.DEGREES_TO_RADIANS(this._angleZ);
        this._radX = cc.DEGREES_TO_RADIANS(this._angleX)
    },
    clone: function() {
        var a = new cc.OrbitCamera;
        a.initWithDuration(this._duration,
            this._radius, this._deltaRadius, this._angleZ, this._deltaAngleZ, this._angleX, this._deltaAngleX);
        return a
    },
    update: function(a) {
        var b = (this._radius + this._deltaRadius * a) * cc.Camera.getZEye(),
            c = this._radZ + this._radDeltaZ * a,
            d = this._radX + this._radDeltaX * a;
        a = Math.sin(c) * Math.cos(d) * b + this._centerXOrig;
        d = Math.sin(c) * Math.sin(d) * b + this._centerYOrig;
        b = Math.cos(c) * b + this._centerZOrig;
        this._target.getCamera().setEye(a, d, b)
    }
});
cc.OrbitCamera.create = function(a, b, c, d, e, f, g) {
    var h = new cc.OrbitCamera;
    return h.initWithDuration(a, b, c, d, e, f, g) ? h : null
};
cc.ActionEase = cc.ActionInterval.extend({
    _inner: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._inner = null
    },
    initWithAction: function(a) {
        if (!a) throw "cc.ActionEase.initWithAction(): action must be non nil";
        return this.initWithDuration(a.getDuration()) ? (this._inner = a, !0) : !1
    },
    clone: function() {
        var a = new cc.ActionEase;
        a.initWithAction(this._inner.clone());
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._inner.startWithTarget(this._target)
    },
    stop: function() {
        this._inner.stop();
        cc.ActionInterval.prototype.stop.call(this)
    },
    update: function(a) {
        this._inner.update(a)
    },
    reverse: function() {
        return cc.ActionEase.create(this._inner.reverse())
    },
    getInnerAction: function() {
        return this._inner
    }
});
cc.ActionEase.create = function(a) {
    var b = new cc.ActionEase;
    b && b.initWithAction(a);
    return b
};
cc.EaseRateAction = cc.ActionEase.extend({
    _rate: 0,
    ctor: function() {
        cc.ActionEase.prototype.ctor.call(this);
        this._rate = 0
    },
    setRate: function(a) {
        this._rate = a
    },
    getRate: function() {
        return this._rate
    },
    initWithAction: function(a, b) {
        return cc.ActionEase.prototype.initWithAction.call(this, a) ? (this._rate = b, !0) : !1
    },
    clone: function() {
        var a = new cc.EaseRateAction;
        a.initWithAction(this._inner.clone(), this._rate);
        return a
    },
    reverse: function() {
        return cc.EaseRateAction.create(this._inner.reverse(), 1 / this._rate)
    }
});
cc.EaseRateAction.create = function(a, b) {
    var c = new cc.EaseRateAction;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseIn = cc.EaseRateAction.extend({
    update: function(a) {
        this._inner.update(Math.pow(a, this._rate))
    },
    reverse: function() {
        return cc.EaseIn.create(this._inner.reverse(), 1 / this._rate)
    },
    clone: function() {
        var a = new cc.EaseIn;
        a.initWithAction(this._inner.clone(), this._rate);
        return a
    }
});
cc.EaseIn.create = function(a, b) {
    var c = new cc.EaseIn;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseOut = cc.EaseRateAction.extend({
    update: function(a) {
        this._inner.update(Math.pow(a, 1 / this._rate))
    },
    reverse: function() {
        return cc.EaseOut.create(this._inner.reverse(), 1 / this._rate)
    },
    clone: function() {
        var a = new cc.EaseOut;
        a.initWithAction(this._inner.clone(), this._rate);
        return a
    }
});
cc.EaseOut.create = function(a, b) {
    var c = new cc.EaseOut;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseInOut = cc.EaseRateAction.extend({
    update: function(a) {
        a *= 2;
        1 > a ? this._inner.update(0.5 * Math.pow(a, this._rate)) : this._inner.update(1 - 0.5 * Math.pow(2 - a, this._rate))
    },
    clone: function() {
        var a = new cc.EaseInOut;
        a.initWithAction(this._inner.clone(), this._rate);
        return a
    },
    reverse: function() {
        return cc.EaseInOut.create(this._inner.reverse(), this._rate)
    }
});
cc.EaseInOut.create = function(a, b) {
    var c = new cc.EaseInOut;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseExponentialIn = cc.ActionEase.extend({
    update: function(a) {
        this._inner.update(0 === a ? 0 : Math.pow(2, 10 * (a - 1)))
    },
    reverse: function() {
        return cc.EaseExponentialOut.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseExponentialIn;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseExponentialIn.create = function(a) {
    var b = new cc.EaseExponentialIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseExponentialOut = cc.ActionEase.extend({
    update: function(a) {
        this._inner.update(1 == a ? 1 : -Math.pow(2, -10 * a) + 1)
    },
    reverse: function() {
        return cc.EaseExponentialIn.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseExponentialOut;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseExponentialOut.create = function(a) {
    var b = new cc.EaseExponentialOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseExponentialInOut = cc.ActionEase.extend({
    update: function(a) {
        1 != a && 0 !== a && (a *= 2, a = 1 > a ? 0.5 * Math.pow(2, 10 * (a - 1)) : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2));
        this._inner.update(a)
    },
    reverse: function() {
        return cc.EaseExponentialInOut.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseExponentialInOut;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseExponentialInOut.create = function(a) {
    var b = new cc.EaseExponentialInOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseSineIn = cc.ActionEase.extend({
    update: function(a) {
        a = 0 === a || 1 == a ? a : -1 * Math.cos(a * Math.PI / 2) + 1;
        this._inner.update(a)
    },
    reverse: function() {
        return cc.EaseSineOut.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseSineIn;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseSineIn.create = function(a) {
    var b = new cc.EaseSineIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseSineOut = cc.ActionEase.extend({
    update: function(a) {
        a = 0 === a || 1 == a ? a : Math.sin(a * Math.PI / 2);
        this._inner.update(a)
    },
    reverse: function() {
        return cc.EaseSineIn.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseSineOut;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseSineOut.create = function(a) {
    var b = new cc.EaseSineOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseSineInOut = cc.ActionEase.extend({
    update: function(a) {
        a = 0 === a || 1 == a ? a : -0.5 * (Math.cos(Math.PI * a) - 1);
        this._inner.update(a)
    },
    clone: function() {
        var a = new cc.EaseSineInOut;
        a.initWithAction(this._inner.clone());
        return a
    },
    reverse: function() {
        return cc.EaseSineInOut.create(this._inner.reverse())
    }
});
cc.EaseSineInOut.create = function(a) {
    var b = new cc.EaseSineInOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseElastic = cc.ActionEase.extend({
    _period: null,
    ctor: function() {
        cc.ActionEase.prototype.ctor.call(this);
        this._period = 0.3
    },
    getPeriod: function() {
        return this._period
    },
    setPeriod: function(a) {
        this._period = a
    },
    initWithAction: function(a, b) {
        cc.ActionEase.prototype.initWithAction.call(this, a);
        this._period = null == b ? 0.3 : b;
        return !0
    },
    reverse: function() {
        cc.log("cc.EaseElastic.reverse(): it should be overridden in subclass.")
    },
    clone: function() {
        var a = new cc.EaseElastic;
        a.initWithAction(this._inner.clone(), this._period);
        return a
    }
});
cc.EaseElastic.create = function(a, b) {
    var c = new cc.EaseElastic;
    return c && c.initWithAction(a, b) ? c : null
};
cc.EaseElasticIn = cc.EaseElastic.extend({
    update: function(a) {
        var b = 0;
        0 === a || 1 === a ? b = a : (b = this._period / 4, a -= 1, b = -Math.pow(2, 10 * a) * Math.sin((a - b) * Math.PI * 2 / this._period));
        this._inner.update(b)
    },
    reverse: function() {
        return cc.EaseElasticOut.create(this._inner.reverse(), this._period)
    },
    clone: function() {
        var a = new cc.EaseElasticIn;
        a.initWithAction(this._inner.clone(), this._period);
        return a
    }
});
cc.EaseElasticIn.create = function(a, b) {
    var c = new cc.EaseElasticIn;
    return c && c.initWithAction(a, b) ? c : null
};
cc.EaseElasticOut = cc.EaseElastic.extend({
    update: function(a) {
        var b = 0;
        0 === a || 1 == a ? b = a : (b = this._period / 4, b = Math.pow(2, -10 * a) * Math.sin((a - b) * Math.PI * 2 / this._period) + 1);
        this._inner.update(b)
    },
    reverse: function() {
        return cc.EaseElasticIn.create(this._inner.reverse(), this._period)
    },
    clone: function() {
        var a = new cc.EaseElasticOut;
        a.initWithAction(this._inner.clone(), this._period);
        return a
    }
});
cc.EaseElasticOut.create = function(a, b) {
    var c = new cc.EaseElasticOut;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseElasticInOut = cc.EaseElastic.extend({
    update: function(a) {
        var b = 0,
            b = this._period;
        if (0 === a || 1 == a) b = a;
        else {
            b || (b = this._period = 0.3 * 1.5);
            var c = b / 4;
            a = 2 * a - 1;
            b = 0 > a ? -0.5 * Math.pow(2, 10 * a) * Math.sin((a - c) * Math.PI * 2 / b) : Math.pow(2, -10 * a) * Math.sin((a - c) * Math.PI * 2 / b) * 0.5 + 1
        }
        this._inner.update(b)
    },
    reverse: function() {
        return cc.EaseElasticInOut.create(this._inner.reverse(), this._period)
    },
    clone: function() {
        var a = new cc.EaseElasticInOut;
        a.initWithAction(this._inner.clone(), this._period);
        return a
    }
});
cc.EaseElasticInOut.create = function(a, b) {
    var c = new cc.EaseElasticInOut;
    c && c.initWithAction(a, b);
    return c
};
cc.EaseBounce = cc.ActionEase.extend({
    bounceTime: function(a) {
        if (a < 1 / 2.75) return 7.5625 * a * a;
        if (a < 2 / 2.75) return a -= 1.5 / 2.75, 7.5625 * a * a + 0.75;
        if (a < 2.5 / 2.75) return a -= 2.25 / 2.75, 7.5625 * a * a + 0.9375;
        a -= 2.625 / 2.75;
        return 7.5625 * a * a + 0.984375
    },
    clone: function() {
        var a = new cc.EaseBounce;
        a.initWithAction(this._inner.clone());
        return a
    },
    reverse: function() {
        return cc.EaseBounce.create(this._inner.reverse())
    }
});
cc.EaseBounce.create = function(a) {
    var b = new cc.EaseBounce;
    b && b.initWithAction(a);
    return b
};
cc.EaseBounceIn = cc.EaseBounce.extend({
    update: function(a) {
        a = 1 - this.bounceTime(1 - a);
        this._inner.update(a)
    },
    reverse: function() {
        return cc.EaseBounceOut.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseBounceIn;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseBounceIn.create = function(a) {
    var b = new cc.EaseBounceIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseBounceOut = cc.EaseBounce.extend({
    update: function(a) {
        a = this.bounceTime(a);
        this._inner.update(a)
    },
    reverse: function() {
        return cc.EaseBounceIn.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseBounceOut;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseBounceOut.create = function(a) {
    var b = new cc.EaseBounceOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseBounceInOut = cc.EaseBounce.extend({
    update: function(a) {
        var b = 0,
            b = 0.5 > a ? 0.5 * (1 - this.bounceTime(1 - 2 * a)) : 0.5 * this.bounceTime(2 * a - 1) + 0.5;
        this._inner.update(b)
    },
    clone: function() {
        var a = new cc.EaseBounceInOut;
        a.initWithAction(this._inner.clone());
        return a
    },
    reverse: function() {
        return cc.EaseBounceInOut.create(this._inner.reverse())
    }
});
cc.EaseBounceInOut.create = function(a) {
    var b = new cc.EaseBounceInOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseBackIn = cc.ActionEase.extend({
    update: function(a) {
        this._inner.update(0 === a || 1 == a ? a : a * a * (2.70158 * a - 1.70158))
    },
    reverse: function() {
        return cc.EaseBackOut.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseBackIn;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseBackIn.create = function(a) {
    var b = new cc.EaseBackIn;
    b && b.initWithAction(a);
    return b
};
cc.EaseBackOut = cc.ActionEase.extend({
    update: function(a) {
        a -= 1;
        this._inner.update(a * a * (2.70158 * a + 1.70158) + 1)
    },
    reverse: function() {
        return cc.EaseBackIn.create(this._inner.reverse())
    },
    clone: function() {
        var a = new cc.EaseBackOut;
        a.initWithAction(this._inner.clone());
        return a
    }
});
cc.EaseBackOut.create = function(a) {
    var b = new cc.EaseBackOut;
    b && b.initWithAction(a);
    return b
};
cc.EaseBackInOut = cc.ActionEase.extend({
    update: function(a) {
        a *= 2;
        1 > a ? this._inner.update(a * a * (3.5949095 * a - 2.5949095) / 2) : (a -= 2, this._inner.update(a * a * (3.5949095 * a + 2.5949095) / 2 + 1))
    },
    clone: function() {
        var a = new cc.EaseBackInOut;
        a.initWithAction(this._inner.clone());
        return a
    },
    reverse: function() {
        return cc.EaseBackInOut.create(this._inner.reverse())
    }
});
cc.EaseBackInOut.create = function(a) {
    var b = new cc.EaseBackInOut;
    b && b.initWithAction(a);
    return b
};
cc.CardinalSplineAt = function(a, b, c, d, e, f) {
    var g = f * f,
        h = g * f,
        k = (1 - e) / 2;
    e = k * (-h + 2 * g - f);
    var m = k * (-h + g) + (2 * h - 3 * g + 1);
    f = k * (h - 2 * g + f) + (-2 * h + 3 * g);
    g = k * (h - g);
    return cc.p(a.x * e + b.x * m + c.x * f + d.x * g, a.y * e + b.y * m + c.y * f + d.y * g)
};
cc.reverseControlPoints = function(a) {
    for (var b = [], c = a.length - 1; 0 <= c; c--) b.push(cc.p(a[c].x, a[c].y));
    return b
};
cc.copyControlPoints = function(a) {
    for (var b = [], c = 0; c < a.length; c++) b.push(cc.p(a[c].x, a[c].y));
    return b
};
cc.getControlPointAt = function(a, b) {
    var c = Math.min(a.length - 1, Math.max(b, 0));
    return a[c]
};
cc.reverseControlPointsInline = function(a) {
    for (var b = a.length, c = 0 | b / 2, d = 0; d < c; ++d) {
        var e = a[d];
        a[d] = a[b - d - 1];
        a[b - d - 1] = e
    }
};
cc.CardinalSplineTo = cc.ActionInterval.extend({
    _points: null,
    _deltaT: 0,
    _tension: 0,
    _previousPosition: null,
    _accumulatedDiff: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._points = [];
        this._tension = this._deltaT = 0;
        this._accumulatedDiff = this._previousPosition = null
    },
    initWithDuration: function(a, b, c) {
        if (!b || 0 == b.length) throw "Invalid configuration. It must at least have one control point";
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this.setPoints(b), this._tension =
            c, !0) : !1
    },
    clone: function() {
        var a = new cc.CardinalSplineTo;
        a.initWithDuration(this._duration, cc.copyControlPoints(this._points), this._tension);
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        this._deltaT = 1 / (this._points.length - 1);
        a = this._target.getPosition();
        this._previousPosition = cc.p(a.x, a.y);
        this._accumulatedDiff = cc.p(0, 0)
    },
    update: function(a) {
        var b, c = this._points;
        if (1 == a) b = c.length - 1, a = 1;
        else {
            var d = this._deltaT;
            b = 0 | a / d;
            a = (a - d * b) / d
        }
        b = cc.CardinalSplineAt(cc.getControlPointAt(c,
            b - 1), cc.getControlPointAt(c, b - 0), cc.getControlPointAt(c, b + 1), cc.getControlPointAt(c, b + 2), this._tension, a);
        cc.ENABLE_STACKABLE_ACTIONS && (c = this._target.getPositionX() - this._previousPosition.x, a = this._target.getPositionY() - this._previousPosition.y, 0 != c || 0 != a) && (d = this._accumulatedDiff, c = d.x + c, a = d.y + a, d.x = c, d.y = a, b.x += c, b.y += a);
        this.updatePosition(b)
    },
    reverse: function() {
        var a = cc.reverseControlPoints(this._points);
        return cc.CardinalSplineTo.create(this._duration, a, this._tension)
    },
    updatePosition: function(a) {
        this._target.setPosition(a);
        this._previousPosition = a
    },
    getPoints: function() {
        return this._points
    },
    setPoints: function(a) {
        this._points = a
    }
});
cc.CardinalSplineTo.create = function(a, b, c) {
    var d = new cc.CardinalSplineTo;
    return d.initWithDuration(a, b, c) ? d : null
};
cc.CardinalSplineBy = cc.CardinalSplineTo.extend({
    _startPosition: null,
    ctor: function() {
        cc.CardinalSplineTo.prototype.ctor.call(this);
        this._startPosition = cc.p(0, 0)
    },
    startWithTarget: function(a) {
        cc.CardinalSplineTo.prototype.startWithTarget.call(this, a);
        a = a.getPosition();
        this._startPosition.x = a.x;
        this._startPosition.y = a.y
    },
    reverse: function() {
        for (var a = this._points.slice(), b, c = a[0], d = 1; d < a.length; ++d) b = a[d], a[d] = cc.pSub(b, c), c = b;
        a = cc.reverseControlPoints(a);
        c = a[a.length - 1];
        a.pop();
        c.x = -c.x;
        c.y = -c.y;
        a.unshift(c);
        for (d = 1; d < a.length; ++d) b = a[d], b.x = -b.x, b.y = -b.y, b.x += c.x, b.y += c.y, c = a[d] = b;
        return cc.CardinalSplineBy.create(this._duration, a, this._tension)
    },
    updatePosition: function(a) {
        var b = this._startPosition,
            c = a.x + b.x;
        a = a.y + b.y;
        this._target.setPosition(c, a);
        this._previousPosition.x = c;
        this._previousPosition.y = a
    },
    clone: function() {
        var a = new cc.CardinalSplineBy;
        a.initWithDuration(this._duration, cc.copyControlPoints(this._points), this._tension);
        return a
    }
});
cc.CardinalSplineBy.create = function(a, b, c) {
    var d = new cc.CardinalSplineBy;
    return d.initWithDuration(a, b, c) ? d : null
};
cc.CatmullRomTo = cc.CardinalSplineTo.extend({
    initWithDuration: function(a, b) {
        return cc.CardinalSplineTo.prototype.initWithDuration.call(this, a, b, 0.5)
    },
    clone: function() {
        var a = new cc.CatmullRomTo;
        a.initWithDuration(this._duration, cc.copyControlPoints(this._points));
        return a
    }
});
cc.CatmullRomTo.create = function(a, b) {
    var c = new cc.CatmullRomTo;
    return c.initWithDuration(a, b) ? c : null
};
cc.CatmullRomBy = cc.CardinalSplineBy.extend({
    initWithDuration: function(a, b) {
        return cc.CardinalSplineTo.prototype.initWithDuration.call(this, a, b, 0.5)
    },
    clone: function() {
        var a = new cc.CatmullRomBy;
        a.initWithDuration(this._duration, cc.copyControlPoints(this._points));
        return a
    }
});
cc.CatmullRomBy.create = function(a, b) {
    var c = new cc.CatmullRomBy;
    return c.initWithDuration(a, b) ? c : null
};
cc.ActionTweenDelegate = cc.Class.extend({
    updateTweenAction: function(a, b) {}
});
cc.ActionTween = cc.ActionInterval.extend({
    key: "",
    from: 0,
    to: 0,
    delta: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this.key = "";
        this.delta = this.to = this.from = 0
    },
    initWithDuration: function(a, b, c, d) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this.key = b, this.to = d, this.from = c, !0) : !1
    },
    startWithTarget: function(a) {
        if (!a || !a.updateTweenAction) throw "cc.ActionTween.startWithTarget(): target must be non-null, and target must implement updateTweenAction function";
        cc.ActionInterval.prototype.startWithTarget.call(this,
            a);
        this.delta = this.to - this.from
    },
    update: function(a) {
        this._target.updateTweenAction(this.to - this.delta * (1 - a), this.key)
    },
    reverse: function() {
        return cc.ActionTween.create(this.duration, this.key, this.to, this.from)
    },
    clone: function() {
        var a = new cc.ActionTween;
        a.initWithDuration(this._duration, this.key, this.from, this.to);
        return a
    }
});
cc.ActionTween.create = function(a, b, c, d) {
    var e = new cc.ActionTween;
    return e.initWithDuration(a, b, c, d) ? e : null
};
cc.GridAction = cc.ActionInterval.extend({
    _gridSize: null,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._gridSize = cc.size(0, 0)
    },
    clone: function() {
        var a = new cc.GridAction,
            b = this._gridSize;
        a.initWithDuration(this._duration, cc.size(b.width, b.height));
        return a
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this, a);
        var b = this.getGrid(),
            c = this._target;
        (a = c.getGrid()) && 0 < a.getReuseGrid() ? (b = a.getGridSize(), a.isActive() && b.width == this._gridSize.width && b.height ==
            this._gridSize.height && a.reuse()) : (a && a.isActive() && a.setActive(!1), c.setGrid(b), c.getGrid().setActive(!0))
    },
    reverse: function() {
        return cc.ReverseTime.create(this)
    },
    initWithDuration: function(a, b) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._gridSize.width = b.width, this._gridSize.height = b.height, !0) : !1
    },
    getGrid: function() {
        cc.log("cc.GridAction.getGrid(): it should be overridden in subclass.")
    }
});
cc.GridAction.create = function(a, b) {
    var c = new cc.GridAction;
    c.initWithDuration(a, b);
    return c
};
cc.Grid3DAction = cc.GridAction.extend({
    getGrid: function() {
        return cc.Grid3D.create(this._gridSize)
    },
    vertex: function(a) {
        return this._target.getGrid().vertex(a)
    },
    originalVertex: function(a) {
        return this._target.getGrid().originalVertex(a)
    },
    setVertex: function(a, b) {
        this._target.getGrid().setVertex(a, b)
    }
});
cc.Grid3DAction.create = function(a, b) {
    var c = new cc.Grid3DAction;
    c.initWithDuration(a, b);
    return c
};
cc.TiledGrid3DAction = cc.GridAction.extend({
    tile: function(a) {
        return this._target.getGrid().tile(a)
    },
    originalTile: function(a) {
        return this._target.getGrid().originalTile(a)
    },
    setTile: function(a, b) {
        this._target.getGrid().setTile(a, b)
    },
    getGrid: function() {
        return cc.TiledGrid3D.create(this._gridSize)
    }
});
cc.TiledGrid3DAction.create = function(a, b) {
    var c = new cc.TiledGrid3DAction;
    c.initWithDuration(a, b);
    return c
};
cc.StopGrid = cc.ActionInstant.extend({
    startWithTarget: function(a) {
        cc.ActionInstant.prototype.startWithTarget.call(this, a);
        (a = this._target.getGrid()) && a.isActive() && a.setActive(!1)
    }
});
cc.StopGrid.create = function() {
    return new cc.StopGrid
};
cc.ReuseGrid = cc.ActionInstant.extend({
    _times: null,
    initWithTimes: function(a) {
        this._times = a;
        return !0
    },
    startWithTarget: function(a) {
        cc.ActionInstant.prototype.startWithTarget.call(this, a);
        this._target.getGrid() && this._target.getGrid().isActive() && this._target.getGrid().setReuseGrid(this._target.getGrid().getReuseGrid() + this._times)
    }
});
cc.ReuseGrid.create = function(a) {
    return new cc.ReuseGrid
};
cc.RAND_MAX = 16777215;
cc.rand = function() {
    return Math.random() * cc.RAND_MAX
};
cc.Waves3D = cc.Grid3DAction.extend({
    _waves: null,
    _amplitude: null,
    _amplitudeRate: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._amplitudeRate = this._amplitude = this._waves = 0
    },
    getAmplitude: function() {
        return this._amplitude
    },
    setAmplitude: function(a) {
        this._amplitude = a
    },
    getAmplitudeRate: function() {
        return this._amplitudeRate
    },
    setAmplitudeRate: function(a) {
        this._amplitudeRate = a
    },
    initWithDuration: function(a, b, c, d) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._waves =
            c, this._amplitude = d, this._amplitudeRate = 1, !0) : !1
    },
    update: function(a) {
        for (var b = this._gridSize, c = this._amplitude, d = cc.p(0, 0), e = this._amplitudeRate, f = this._waves, g = 0; g < b.width + 1; ++g)
            for (var h = 0; h < b.height + 1; ++h) {
                d.x = g;
                d.y = h;
                var k = this.originalVertex(d);
                k.z += Math.sin(Math.PI * a * f * 2 + 0.01 * (k.y + k.x)) * c * e;
                this.setVertex(d, k)
            }
    }
});
cc.Waves3D.create = function(a, b, c, d) {
    var e = new cc.Waves3D;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.FlipX3D = cc.Grid3DAction.extend({
    initWithDuration: function(a) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this, a, cc.size(1, 1))
    },
    initWithSize: function(a, b) {
        return 1 != a.width || 1 != a.height ? (cc.log("Grid size must be (1,1)"), !1) : cc.Grid3DAction.prototype.initWithDuration.call(this, b, a)
    },
    update: function(a) {
        var b = Math.PI * a;
        a = Math.sin(b);
        var c = Math.cos(b / 2),
            b = new cc.Vertex3F,
            d = cc.p(0, 0);
        d.x = d.y = 1;
        var e = this.originalVertex(d);
        d.x = d.y = 0;
        var d = this.originalVertex(d),
            f = e.x,
            g = d.x,
            h, k;
        f > g ? (e = cc.p(0,
            0), d = cc.p(0, 1), h = cc.p(1, 0), k = cc.p(1, 1)) : (h = cc.p(0, 0), k = cc.p(0, 1), e = cc.p(1, 0), d = cc.p(1, 1), f = g);
        b.x = f - f * c;
        b.z = Math.abs(parseFloat(f * a / 4));
        a = this.originalVertex(e);
        a.x = b.x;
        a.z += b.z;
        this.setVertex(e, a);
        a = this.originalVertex(d);
        a.x = b.x;
        a.z += b.z;
        this.setVertex(d, a);
        a = this.originalVertex(h);
        a.x -= b.x;
        a.z -= b.z;
        this.setVertex(h, a);
        a = this.originalVertex(k);
        a.x -= b.x;
        a.z -= b.z;
        this.setVertex(k, a)
    }
});
cc.FlipX3D.create = function(a) {
    var b = new cc.FlipX3D;
    b.initWithDuration(a);
    return b
};
cc.FlipY3D = cc.FlipX3D.extend({
    update: function(a) {
        var b = Math.PI * a;
        a = Math.sin(b);
        var c = Math.cos(b / 2),
            b = new cc.Vertex3F,
            d = cc.p(0, 0);
        d.x = d.y = 1;
        var e = this.originalVertex(d);
        d.x = d.y = 0;
        var d = this.originalVertex(d),
            f = e.y,
            g = d.y,
            h, k;
        f > g ? (e = cc.p(0, 0), d = cc.p(0, 1), h = cc.p(1, 0), k = cc.p(1, 1)) : (d = cc.p(0, 0), e = cc.p(0, 1), k = cc.p(1, 0), h = cc.p(1, 1), f = g);
        b.y = f - f * c;
        b.z = Math.abs(parseFloat(f * a) / 4);
        a = this.originalVertex(e);
        a.y = b.y;
        a.z += b.z;
        this.setVertex(e, a);
        a = this.originalVertex(d);
        a.y -= b.y;
        a.z -= b.z;
        this.setVertex(d, a);
        a = this.originalVertex(h);
        a.y = b.y;
        a.z += b.z;
        this.setVertex(h, a);
        a = this.originalVertex(k);
        a.y -= b.y;
        a.z -= b.z;
        this.setVertex(k, a)
    }
});
cc.FlipY3D.create = function(a) {
    var b = new cc.FlipY3D;
    b.initWithDuration(a);
    return b
};
cc.Lens3D = cc.Grid3DAction.extend({
    _position: null,
    _radius: 0,
    _lensEffect: 0,
    _concave: !1,
    _dirty: !1,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._position = cc._pConst(0, 0);
        this._lensEffect = this._radius = 0;
        this._dirty = this._concave = !1
    },
    getLensEffect: function() {
        return this._lensEffect
    },
    setLensEffect: function(a) {
        this._lensEffect = a
    },
    setConcave: function(a) {
        this._concave = a
    },
    getPosition: function() {
        return this._position
    },
    setPosition: function(a) {
        cc.pointEqualToPoint(a, this._position) || (this._position._x =
            a.x, this._position._y = a.y, this._dirty = !0)
    },
    initWithDuration: function(a, b, c, d) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this, a, b) ? (this.setPosition(c), this._radius = d, this._lensEffect = 0.7, this._dirty = !0) : !1
    },
    update: function(a) {
        if (this._dirty) {
            a = this._gridSize.width;
            for (var b = this._gridSize.height, c = this._radius, d = this._lensEffect, e = cc.p(0, 0), f = cc.p(0, 0), g, h, k, m = 0; m < a + 1; ++m)
                for (var n = 0; n < b + 1; ++n) e.x = m, e.y = n, g = this.originalVertex(e), f.x = this._position.x - g.x, f.y = this._position.y - g.y, h = cc.pLength(f),
                    h < c && (h = c - h, h /= c, 0 == h && (h = 0.001), h = Math.log(h) * d, k = Math.exp(h) * c, h = cc.pLength(f), 0 < h && (f.x /= h, f.y /= h, f.x *= k, f.y *= k, g.z += cc.pLength(f) * d)), this.setVertex(e, g);
            this._dirty = !1
        }
    }
});
cc.Lens3D.create = function(a, b, c, d) {
    var e = new cc.Lens3D;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.Ripple3D = cc.Grid3DAction.extend({
    _position: null,
    _radius: null,
    _waves: null,
    _amplitude: null,
    _amplitudeRate: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._position = cc._pConst(0, 0);
        this._amplitudeRate = this._amplitude = this._waves = this._radius = 0
    },
    getPosition: function() {
        return this._position
    },
    setPosition: function(a) {
        this._position._x = a.x;
        this._position._y = a.y
    },
    getAmplitude: function() {
        return this._amplitude
    },
    setAmplitude: function(a) {
        this._amplitude = a
    },
    getAmplitudeRate: function() {
        return this._amplitudeRate
    },
    setAmplitudeRate: function(a) {
        this._amplitudeRate = a
    },
    initWithDuration: function(a, b, c, d, e, f) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this, a, b) ? (this.setPosition(c), this._radius = d, this._waves = e, this._amplitude = f, this._amplitudeRate = 1, !0) : !1
    },
    update: function(a) {
        for (var b = this._gridSize.width, c = this._gridSize.height, d = cc.p(0, 0), e = this._radius, f = this._waves, g = this._amplitude, h = this._amplitudeRate, k, m, n = cc.p(0, 0), p = 0; p < b + 1; ++p)
            for (var q = 0; q < c + 1; ++q) {
                d.x = p;
                d.y = q;
                k = this.originalVertex(d);
                n.x =
                    this._position.x - k.x;
                n.y = this._position.y - k.y;
                m = cc.pLength(n);
                if (m < e) {
                    m = e - m;
                    var r = Math.pow(m / e, 2);
                    k.z += Math.sin(a * Math.PI * f * 2 + 0.1 * m) * g * h * r
                }
                this.setVertex(d, k)
            }
    }
});
cc.Ripple3D.create = function(a, b, c, d, e, f) {
    var g = new cc.Ripple3D;
    g.initWithDuration(a, b, c, d, e, f);
    return g
};
cc.Shaky3D = cc.Grid3DAction.extend({
    _randRange: null,
    _shakeZ: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._randRange = 0;
        this._shakeZ = !1
    },
    initWithDuration: function(a, b, c, d) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._randRange = c, this._shakeZ = d, !0) : !1
    },
    update: function(a) {
        a = this._gridSize.width;
        for (var b = this._gridSize.height, c = this._randRange, d = this._shakeZ, e = cc.p(0, 0), f, g = 0; g < a + 1; ++g)
            for (var h = 0; h < b + 1; ++h) e.x = g, e.y = h, f = this.originalVertex(e), f.x += cc.rand() %
                (2 * c) - c, f.y += cc.rand() % (2 * c) - c, d && (f.z += cc.rand() % (2 * c) - c), this.setVertex(e, f)
    }
});
cc.Shaky3D.create = function(a, b, c, d) {
    var e = new cc.Shaky3D;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.Liquid = cc.Grid3DAction.extend({
    _waves: null,
    _amplitude: null,
    _amplitudeRate: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._amplitudeRate = this._amplitude = this._waves = 0
    },
    getAmplitude: function() {
        return this._amplitude
    },
    setAmplitude: function(a) {
        this._amplitude = a
    },
    getAmplitudeRate: function() {
        return this._amplitudeRate
    },
    setAmplitudeRate: function(a) {
        this._amplitudeRate = a
    },
    initWithDuration: function(a, b, c, d) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._waves =
            c, this._amplitude = d, this._amplitudeRate = 1, !0) : !1
    },
    update: function(a) {
        for (var b = this._gridSize.width, c = this._gridSize.height, d = cc.p(0, 0), e = this._waves, f = this._amplitude, g = this._amplitudeRate, h, k = 1; k < b; ++k)
            for (var m = 1; m < c; ++m) d.x = k, d.y = m, h = this.originalVertex(d), h.x += Math.sin(a * Math.PI * e * 2 + 0.01 * h.x) * f * g, h.y += Math.sin(a * Math.PI * e * 2 + 0.01 * h.y) * f * g, this.setVertex(d, h)
    }
});
cc.Liquid.create = function(a, b, c, d) {
    var e = new cc.Liquid;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.Waves = cc.Grid3DAction.extend({
    _waves: null,
    _amplitude: null,
    _amplitudeRate: null,
    _vertical: null,
    _horizontal: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._amplitudeRate = this._amplitude = this._waves = 0;
        this._horizontal = this._vertical = !1
    },
    getAmplitude: function() {
        return this._amplitude
    },
    setAmplitude: function(a) {
        this._amplitude = a
    },
    getAmplitudeRate: function() {
        return this._amplitudeRate
    },
    setAmplitudeRate: function(a) {
        this._amplitudeRate = a
    },
    initWithDuration: function(a, b, c, d, e, f) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this,
            a, b) ? (this._waves = c, this._amplitude = d, this._amplitudeRate = 1, this._horizontal = e, this._vertical = f, !0) : !1
    },
    update: function(a) {
        for (var b = this._gridSize.width, c = this._gridSize.height, d = cc.p(0, 0), e = this._vertical, f = this._horizontal, g = this._waves, h = this._amplitude, k = this._amplitudeRate, m, n = 0; n < b + 1; ++n)
            for (var p = 0; p < c + 1; ++p) d.x = n, d.y = p, m = this.originalVertex(d), e && (m.x += Math.sin(a * Math.PI * g * 2 + 0.01 * m.y) * h * k), f && (m.y += Math.sin(a * Math.PI * g * 2 + 0.01 * m.x) * h * k), this.setVertex(d, m)
    }
});
cc.Waves.create = function(a, b, c, d, e, f) {
    var g = new cc.Waves;
    g.initWithDuration(a, b, c, d, e, f);
    return g
};
cc.Twirl = cc.Grid3DAction.extend({
    _position: null,
    _twirls: null,
    _amplitude: null,
    _amplitudeRate: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._position = cc._pConst(0, 0);
        this._amplitudeRate = this._amplitude = this._twirls = 0
    },
    getPosition: function() {
        return this._position
    },
    setPosition: function(a) {
        this._position._x = a.x;
        this._position._y = a.y
    },
    getAmplitude: function() {
        return this._amplitude
    },
    setAmplitude: function(a) {
        this._amplitude = a
    },
    getAmplitudeRate: function() {
        return this._amplitudeRate
    },
    setAmplitudeRate: function(a) {
        this._amplitudeRate =
            a
    },
    initWithDuration: function(a, b, c, d, e) {
        return cc.Grid3DAction.prototype.initWithDuration.call(this, a, b) ? (this.setPosition(c), this._twirls = d, this._amplitude = e, this._amplitudeRate = 1, !0) : !1
    },
    update: function(a) {
        for (var b = this._position, c = this._gridSize.width, d = this._gridSize.height, e = cc.p(0, 0), f = 0.1 * this._amplitude * this._amplitudeRate, g = this._twirls, h, k, m, n = cc.p(0, 0), p = 0; p < c + 1; ++p)
            for (var q = 0; q < d + 1; ++q) e.x = p, e.y = q, h = this.originalVertex(e), n.x = p - c / 2, n.y = q - d / 2, k = cc.pLength(n) * Math.cos(Math.PI / 2 + a * Math.PI *
                g * 2) * f, m = Math.sin(k) * (h.y - b.y) + Math.cos(k) * (h.x - b.x), k = Math.cos(k) * (h.y - b.y) - Math.sin(k) * (h.x - b.x), h.x = b.x + m, h.y = b.y + k, this.setVertex(e, h)
    }
});
cc.Twirl.create = function(a, b, c, d, e) {
    var f = new cc.Twirl;
    f.initWithDuration(a, b, c, d, e);
    return f
};
cc.ShakyTiles3D = cc.TiledGrid3DAction.extend({
    _randRange: 0,
    _shakeZ: !1,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._randRange = 0;
        this._shakeZ = !1
    },
    initWithDuration: function(a, b, c, d) {
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._randRange = c, this._shakeZ = d, !0) : !1
    },
    update: function(a) {
        a = this._gridSize;
        for (var b = this._randRange, c = cc.p(0, 0), d = 0; d < a.width; ++d)
            for (var e = 0; e < a.height; ++e) {
                c.x = d;
                c.y = e;
                var f = this.originalTile(c);
                f.bl.x += cc.rand() % (2 * b) - b;
                f.br.x += cc.rand() %
                    (2 * b) - b;
                f.tl.x += cc.rand() % (2 * b) - b;
                f.tr.x += cc.rand() % (2 * b) - b;
                f.bl.y += cc.rand() % (2 * b) - b;
                f.br.y += cc.rand() % (2 * b) - b;
                f.tl.y += cc.rand() % (2 * b) - b;
                f.tr.y += cc.rand() % (2 * b) - b;
                this._shakeZ && (f.bl.z += cc.rand() % (2 * b) - b, f.br.z += cc.rand() % (2 * b) - b, f.tl.z += cc.rand() % (2 * b) - b, f.tr.z += cc.rand() % (2 * b) - b);
                this.setTile(c, f)
            }
    }
});
cc.ShakyTiles3D.create = function(a, b, c, d) {
    var e = new cc.ShakyTiles3D;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.ShatteredTiles3D = cc.TiledGrid3DAction.extend({
    _randRange: 0,
    _once: !1,
    _shatterZ: !1,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._randRange = 0;
        this._once = this._shakeZ = !1
    },
    initWithDuration: function(a, b, c, d) {
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._once = !1, this._randRange = c, this._shatterZ = d, !0) : !1
    },
    update: function(a) {
        if (!1 === this._once) {
            a = this._gridSize;
            for (var b = this._randRange, c, d = cc.p(0, 0), e = 0; e < a.width; ++e)
                for (var f = 0; f < a.height; ++f) d.x = e, d.y = f,
                    c = this.originalTile(d), c.bl.x += cc.rand() % (2 * b) - b, c.br.x += cc.rand() % (2 * b) - b, c.tl.x += cc.rand() % (2 * b) - b, c.tr.x += cc.rand() % (2 * b) - b, c.bl.y += cc.rand() % (2 * b) - b, c.br.y += cc.rand() % (2 * b) - b, c.tl.y += cc.rand() % (2 * b) - b, c.tr.y += cc.rand() % (2 * b) - b, this._shatterZ && (c.bl.z += cc.rand() % (2 * b) - b, c.br.z += cc.rand() % (2 * b) - b, c.tl.z += cc.rand() % (2 * b) - b, c.tr.z += cc.rand() % (2 * b) - b), this.setTile(d, c);
            this._once = !0
        }
    }
});
cc.ShatteredTiles3D.create = function(a, b, c, d) {
    var e = new cc.ShatteredTiles3D;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.Tile = function(a, b, c) {
    this.position = a || cc.POINT_ZERO;
    this.startPosition = b || cc.POINT_ZERO;
    this.delta = c || cc.POINT_ZERO
};
cc.ShuffleTiles = cc.TiledGrid3DAction.extend({
    _seed: 0,
    _tilesCount: 0,
    _tilesOrder: null,
    _tiles: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._tilesOrder = [];
        this._tiles = [];
        this._tilesCount = this._seed = 0
    },
    initWithDuration: function(a, b, c) {
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._seed = c, this._tilesOrder.length = 0, this._tiles.length = 0, !0) : !1
    },
    shuffle: function(a, b) {
        for (var c = b - 1; 0 <= c; c--) {
            var d = 0 | cc.rand() % (c + 1),
                e = a[c];
            a[c] = a[d];
            a[d] = e
        }
    },
    getDelta: function(a) {
        var b =
            this._gridSize,
            c = a.width * b.height + a.height;
        return cc.size(this._tilesOrder[c] / b.height - a.width, this._tilesOrder[c] % b.height - a.height)
    },
    placeTile: function(a, b) {
        var c = this.originalTile(a),
            d = this._target.getGrid().getStep(),
            e = b.position;
        c.bl.x += e.x * d.x;
        c.bl.y += e.y * d.y;
        c.br.x += e.x * d.x;
        c.br.y += e.y * d.y;
        c.tl.x += e.x * d.x;
        c.tl.y += e.y * d.y;
        c.tr.x += e.x * d.x;
        c.tr.y += e.y * d.y;
        this.setTile(a, c)
    },
    startWithTarget: function(a) {
        cc.TiledGrid3DAction.prototype.startWithTarget.call(this, a);
        a = this._gridSize;
        this._tilesCount =
            a.width * a.height;
        for (var b = this._tilesOrder, c = b.length = 0; c < this._tilesCount; ++c) b[c] = c;
        this.shuffle(b, this._tilesCount);
        for (var b = this._tiles, c = b.length = 0, d = cc.size(0, 0), e = 0; e < a.width; ++e)
            for (var f = 0; f < a.height; ++f) b[c] = new cc.Tile, b[c].position = cc.p(e, f), b[c].startPosition = cc.p(e, f), d.width = e, d.height = f, b[c].delta = this.getDelta(d), ++c
    },
    update: function(a) {
        for (var b = 0, c = this._gridSize, d = this._tiles, e, f = cc.p(0, 0), g = 0; g < c.width; ++g)
            for (var h = 0; h < c.height; ++h) f.x = g, f.y = h, e = d[b], e.position.x = e.delta.width *
                a, e.position.y = e.delta.height * a, this.placeTile(f, e), ++b
    }
});
cc.ShuffleTiles.create = function(a, b, c) {
    var d = new cc.ShuffleTiles;
    d.initWithDuration(a, b, c);
    return d
};
cc.FadeOutTRTiles = cc.TiledGrid3DAction.extend({
    testFunc: function(a, b) {
        var c = this._gridSize.width * b,
            d = this._gridSize.height * b;
        return 0 == c + d ? 1 : Math.pow((a.width + a.height) / (c + d), 6)
    },
    turnOnTile: function(a) {
        this.setTile(a, this.originalTile(a))
    },
    turnOffTile: function(a) {
        this.setTile(a, new cc.Quad3)
    },
    transformTile: function(a, b) {
        var c = this.originalTile(a),
            d = this._target.getGrid().getStep();
        c.bl.x += d.x / 2 * (1 - b);
        c.bl.y += d.y / 2 * (1 - b);
        c.br.x -= d.x / 2 * (1 - b);
        c.br.y += d.y / 2 * (1 - b);
        c.tl.x += d.x / 2 * (1 - b);
        c.tl.y -= d.y / 2 * (1 -
            b);
        c.tr.x -= d.x / 2 * (1 - b);
        c.tr.y -= d.y / 2 * (1 - b);
        this.setTile(a, c)
    },
    update: function(a) {
        for (var b = this._gridSize, c = cc.p(0, 0), d = cc.size(0, 0), e, f = 0; f < b.width; ++f)
            for (var g = 0; g < b.height; ++g) c.x = f, c.y = g, d.width = f, d.height = g, e = this.testFunc(d, a), 0 == e ? this.turnOffTile(c) : 1 > e ? this.transformTile(c, e) : this.turnOnTile(c)
    }
});
cc.FadeOutTRTiles.create = function(a, b) {
    var c = new cc.FadeOutTRTiles;
    c.initWithDuration(a, b);
    return c
};
cc.FadeOutBLTiles = cc.FadeOutTRTiles.extend({
    testFunc: function(a, b) {
        return 0 == a.width + a.height ? 1 : Math.pow((this._gridSize.width * (1 - b) + this._gridSize.height * (1 - b)) / (a.width + a.height), 6)
    }
});
cc.FadeOutBLTiles.create = function(a, b) {
    var c = new cc.FadeOutBLTiles;
    c.initWithDuration(a, b);
    return c
};
cc.FadeOutUpTiles = cc.FadeOutTRTiles.extend({
    testFunc: function(a, b) {
        var c = this._gridSize.height * b;
        return 0 == c ? 1 : Math.pow(a.height / c, 6)
    },
    transformTile: function(a, b) {
        var c = this.originalTile(a),
            d = this._target.getGrid().getStep();
        c.bl.y += d.y / 2 * (1 - b);
        c.br.y += d.y / 2 * (1 - b);
        c.tl.y -= d.y / 2 * (1 - b);
        c.tr.y -= d.y / 2 * (1 - b);
        this.setTile(a, c)
    }
});
cc.FadeOutUpTiles.create = function(a, b) {
    var c = new cc.FadeOutUpTiles;
    c.initWithDuration(a, b);
    return c
};
cc.FadeOutDownTiles = cc.FadeOutUpTiles.extend({
    testFunc: function(a, b) {
        return 0 == a.height ? 1 : Math.pow(this._gridSize.height * (1 - b) / a.height, 6)
    }
});
cc.FadeOutDownTiles.create = function(a, b) {
    var c = new cc.FadeOutDownTiles;
    c.initWithDuration(a, b);
    return c
};
cc.TurnOffTiles = cc.TiledGrid3DAction.extend({
    _seed: null,
    _tilesCount: 0,
    _tilesOrder: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._tilesOrder = [];
        this._seed = null;
        this._tilesCount = 0
    },
    initWithDuration: function(a, b, c) {
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._seed = c, this._tilesOrder.length = 0, !0) : !1
    },
    shuffle: function(a, b) {
        for (var c = b - 1; 0 <= c; c--) {
            var d = 0 | cc.rand() % (c + 1),
                e = a[c];
            a[c] = a[d];
            a[d] = e
        }
    },
    turnOnTile: function(a) {
        this.setTile(a, this.originalTile(a))
    },
    turnOffTile: function(a) {
        this.setTile(a, new cc.Quad3)
    },
    startWithTarget: function(a) {
        cc.TiledGrid3DAction.prototype.startWithTarget.call(this, a);
        this._tilesCount = this._gridSize.width * this._gridSize.height;
        a = this._tilesOrder;
        for (var b = a.length = 0; b < this._tilesCount; ++b) a[b] = b;
        this.shuffle(a, this._tilesCount)
    },
    update: function(a) {
        a = 0 | a * this._tilesCount;
        for (var b = this._gridSize, c, d = cc.p(0, 0), e = this._tilesOrder, f = 0; f < this._tilesCount; f++) c = e[f], d.x = 0 | c / b.height, d.y = c % (0 | b.height), f < a ? this.turnOffTile(d) : this.turnOnTile(d)
    }
});
cc.TurnOffTiles.create = function(a, b, c) {
    c = c || 0;
    var d = new cc.TurnOffTiles;
    d.initWithDuration(a, b, c);
    return d
};
cc.WavesTiles3D = cc.TiledGrid3DAction.extend({
    _waves: 0,
    _amplitude: 0,
    _amplitudeRate: 0,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._amplitudeRate = this._amplitude = this._waves = 0
    },
    getAmplitude: function() {
        return this._amplitude
    },
    setAmplitude: function(a) {
        this._amplitude = a
    },
    getAmplitudeRate: function() {
        return this._amplitudeRate
    },
    setAmplitudeRate: function(a) {
        this._amplitudeRate = a
    },
    initWithDuration: function(a, b, c, d) {
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._waves =
            c, this._amplitude = d, this._amplitudeRate = 1, !0) : !1
    },
    update: function(a) {
        for (var b = this._gridSize, c = this._waves, d = this._amplitude, e = this._amplitudeRate, f = cc.p(0, 0), g, h = 0; h < b.width; h++)
            for (var k = 0; k < b.height; k++) f.x = h, f.y = k, g = this.originalTile(f), g.bl.z = Math.sin(a * Math.PI * c * 2 + 0.01 * (g.bl.y + g.bl.x)) * d * e, g.br.z = g.bl.z, g.tl.z = g.bl.z, g.tr.z = g.bl.z, this.setTile(f, g)
    }
});
cc.WavesTiles3D.create = function(a, b, c, d) {
    var e = new cc.WavesTiles3D;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.JumpTiles3D = cc.TiledGrid3DAction.extend({
    _jumps: 0,
    _amplitude: 0,
    _amplitudeRate: 0,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._amplitudeRate = this._amplitude = this._jumps = 0
    },
    getAmplitude: function() {
        return this._amplitude
    },
    setAmplitude: function(a) {
        this._amplitude = a
    },
    getAmplitudeRate: function() {
        return this._amplitudeRate
    },
    setAmplitudeRate: function(a) {
        this._amplitudeRate = a
    },
    initWithDuration: function(a, b, c, d) {
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, b) ? (this._jumps =
            c, this._amplitude = d, this._amplitudeRate = 1, !0) : !1
    },
    update: function(a) {
        var b = Math.sin(Math.PI * a * this._jumps * 2) * this._amplitude * this._amplitudeRate;
        a = Math.sin(Math.PI * (a * this._jumps * 2 + 1)) * this._amplitude * this._amplitudeRate;
        for (var c = this._gridSize, d = this._target.getGrid(), e, f = cc.p(0, 0), g = 0; g < c.width; g++)
            for (var h = 0; h < c.height; h++) f.x = g, f.y = h, e = d.originalTile(f), 0 == (g + h) % 2 ? (e.bl.z += b, e.br.z += b, e.tl.z += b, e.tr.z += b) : (e.bl.z += a, e.br.z += a, e.tl.z += a, e.tr.z += a), d.setTile(f, e)
    }
});
cc.JumpTiles3D.create = function(a, b, c, d) {
    var e = new cc.JumpTiles3D;
    e.initWithDuration(a, b, c, d);
    return e
};
cc.SplitRows = cc.TiledGrid3DAction.extend({
    _rows: 0,
    _winSize: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._rows = 0;
        this._winSize = null
    },
    initWithDuration: function(a, b) {
        this._rows = b;
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, cc.size(1, b))
    },
    update: function(a) {
        for (var b = this._gridSize, c = this._winSize.width, d, e, f = cc.p(0, 0), g = 0; g < b.height; ++g) f.y = g, d = this.originalTile(f), e = 1, 0 == g % 2 && (e = -1), d.bl.x += e * c * a, d.br.x += e * c * a, d.tl.x += e * c * a, d.tr.x += e * c * a, this.setTile(f, d)
    },
    startWithTarget: function(a) {
        cc.TiledGrid3DAction.prototype.startWithTarget.call(this, a);
        this._winSize = cc.Director.getInstance().getWinSizeInPixels()
    }
});
cc.SplitRows.create = function(a, b) {
    var c = new cc.SplitRows;
    c.initWithDuration(a, b);
    return c
};
cc.SplitCols = cc.TiledGrid3DAction.extend({
    _cols: 0,
    _winSize: null,
    ctor: function() {
        cc.GridAction.prototype.ctor.call(this);
        this._cols = 0;
        this._winSize = null
    },
    initWithDuration: function(a, b) {
        this._cols = b;
        return cc.TiledGrid3DAction.prototype.initWithDuration.call(this, a, cc.size(b, 1))
    },
    update: function(a) {
        for (var b = this._gridSize.width, c = this._winSize.height, d, e, f = cc.p(0, 0), g = 0; g < b; ++g) f.x = g, d = this.originalTile(f), e = 1, 0 == g % 2 && (e = -1), d.bl.y += e * c * a, d.br.y += e * c * a, d.tl.y += e * c * a, d.tr.y += e * c * a, this.setTile(f, d)
    },
    startWithTarget: function(a) {
        cc.TiledGrid3DAction.prototype.startWithTarget.call(this, a);
        this._winSize = cc.Director.getInstance().getWinSizeInPixels()
    }
});
cc.SplitCols.create = function(a, b) {
    var c = new cc.SplitCols;
    c.initWithDuration(a, b);
    return c
};
cc.PageTurn3D = cc.Grid3DAction.extend({
    update: function(a) {
        var b = Math.max(0, a - 0.25),
            b = -100 - b * b * 500;
        a = -Math.PI / 2 * Math.sqrt(a);
        var c = +Math.PI / 2 + a;
        a = Math.sin(c);
        for (var c = Math.cos(c), d = this._gridSize, e = cc.p(0, 0), f = 0; f <= d.width; ++f)
            for (var g = 0; g <= d.height; ++g) {
                e.x = f;
                e.y = g;
                var h = this.originalVertex(e),
                    k = Math.sqrt(h.x * h.x + (h.y - b) * (h.y - b)),
                    m = k * a,
                    n = Math.asin(h.x / k) / a,
                    p = Math.cos(n);
                h.x = n <= Math.PI ? m * Math.sin(n) : 0;
                h.y = k + b - m * (1 - p) * a;
                h.z = m * (1 - p) * c / 7;
                0.5 > h.z && (h.z = 0.5);
                this.setVertex(e, h)
            }
    }
});
cc.PageTurn3D.create = function(a, b) {
    var c = new cc.PageTurn3D;
    c.initWithDuration(a, b);
    return c
};
cc.PROGRESS_TIMER_TYPE_RADIAL = 0;
cc.PROGRESS_TIMER_TYPE_BAR = 1;
cc.PROGRESS_TEXTURE_COORDS_COUNT = 4;
cc.PROGRESS_TEXTURE_COORDS = 75;
cc.ProgressTimer = cc.NodeRGBA.extend({
    _type: null,
    _percentage: 0,
    _sprite: null,
    _midPoint: null,
    _barChangeRate: null,
    _reverseDirection: !1,
    getMidpoint: function() {
        return cc.p(this._midPoint.x, this._midPoint)
    },
    setMidpoint: function(a) {
        this._midPoint = cc.pClamp(a, cc.p(0, 0), cc.p(1, 1))
    },
    getBarChangeRate: function() {
        return cc.p(this._barChangeRate.x, this._barChangeRate.y)
    },
    setBarChangeRate: function(a) {
        this._barChangeRate = cc.pClamp(a, cc.p(0, 0), cc.p(1, 1))
    },
    getType: function() {
        return this._type
    },
    getPercentage: function() {
        return this._percentage
    },
    getSprite: function() {
        return this._sprite
    },
    setPercentage: function(a) {
        this._percentage != a && (this._percentage = cc.clampf(a, 0, 100), this._updateProgress())
    },
    setOpacityModifyRGB: function(a) {},
    isOpacityModifyRGB: function() {
        return !1
    },
    isReverseDirection: function() {
        return this._reverseDirection
    },
    _boundaryTexCoord: function(a) {
        if (a < cc.PROGRESS_TEXTURE_COORDS_COUNT) {
            var b = cc.PROGRESS_TEXTURE_COORDS;
            return this._reverseDirection ? cc.p(b >> 7 - (a << 1) & 1, b >> 7 - ((a << 1) + 1) & 1) : cc.p(b >> (a << 1) + 1 & 1, b >> (a << 1) & 1)
        }
        return cc.PointZero()
    },
    _origin: null,
    _startAngle: 270,
    _endAngle: 270,
    _radius: 0,
    _counterClockWise: !1,
    _barRect: null,
    _vertexDataCount: 0,
    _vertexData: null,
    _vertexArrayBuffer: null,
    _vertexWebGLBuffer: null,
    _vertexDataDirty: !1,
    ctor: null,
    _ctorForCanvas: function() {
        cc.NodeRGBA.prototype.ctor.call(this);
        this._type = cc.PROGRESS_TIMER_TYPE_RADIAL;
        this._percentage = 0;
        this._midPoint = cc.p(0, 0);
        this._barChangeRate = cc.p(0, 0);
        this._reverseDirection = !1;
        this._sprite = null;
        this._origin = cc.PointZero();
        this._endAngle = this._startAngle = 270;
        this._radius =
            0;
        this._counterClockWise = !1;
        this._barRect = cc.RectZero()
    },
    _ctorForWebGL: function() {
        cc.NodeRGBA.prototype.ctor.call(this);
        this._type = cc.PROGRESS_TIMER_TYPE_RADIAL;
        this._percentage = 0;
        this._midPoint = cc.p(0, 0);
        this._barChangeRate = cc.p(0, 0);
        this._reverseDirection = !1;
        this._sprite = null;
        this._vertexWebGLBuffer = cc.renderContext.createBuffer();
        this._vertexDataCount = 0;
        this._vertexArrayBuffer = this._vertexData = null;
        this._vertexDataDirty = !1
    },
    setColor: function(a) {
        this._sprite.setColor(a);
        this._updateColor()
    },
    setOpacity: function(a) {
        this._sprite.setOpacity(a);
        this._updateColor()
    },
    getColor: function() {
        return this._sprite.getColor()
    },
    getOpacity: function() {
        return this._sprite.getOpacity()
    },
    setReverseProgress: null,
    _setReverseProgressForCanvas: function(a) {
        this._reverseDirection !== a && (this._reverseDirection = a)
    },
    _setReverseProgressForWebGL: function(a) {
        this._reverseDirection !== a && (this._reverseDirection = a, this._vertexArrayBuffer = this._vertexData = null, this._vertexDataCount = 0)
    },
    setSprite: null,
    _setSpriteForCanvas: function(a) {
        this._sprite != a && (this._sprite = a, this.setContentSize(this._sprite.getContentSize()))
    },
    _setSpriteForWebGL: function(a) {
        a && this._sprite != a && (this._sprite = a, this.setContentSize(a.getContentSize()), this._vertexData && (this._vertexArrayBuffer = this._vertexData = null, this._vertexDataCount = 0))
    },
    setType: null,
    _setTypeForCanvas: function(a) {
        a !== this._type && (this._type = a)
    },
    _setTypeForWebGL: function(a) {
        a !== this._type && (this._vertexData && (this._vertexArrayBuffer = this._vertexData = null, this._vertexDataCount = 0), this._type = a)
    },
    setReverseDirection: null,
    _setReverseDirectionForCanvas: function(a) {
        this._reverseDirection !==
            a && (this._reverseDirection = a)
    },
    _setReverseDirectionForWebGL: function(a) {
        this._reverseDirection !== a && (this._reverseDirection = a, this._vertexArrayBuffer = this._vertexData = null, this._vertexDataCount = 0)
    },
    _textureCoordFromAlphaPoint: function(a) {
        var b = this._sprite;
        if (!b) return {
            u: 0,
            v: 0
        };
        var c = b.getQuad(),
            d = cc.p(c.bl.texCoords.u, c.bl.texCoords.v),
            c = cc.p(c.tr.texCoords.u, c.tr.texCoords.v);
        b.isTextureRectRotated() && (b = a.x, a.x = a.y, a.y = b);
        return {
            u: d.x * (1 - a.x) + c.x * a.x,
            v: d.y * (1 - a.y) + c.y * a.y
        }
    },
    _vertexFromAlphaPoint: function(a) {
        if (!this._sprite) return {
            x: 0,
            y: 0
        };
        var b = this._sprite.getQuad(),
            c = cc.p(b.bl.vertices.x, b.bl.vertices.y),
            b = cc.p(b.tr.vertices.x, b.tr.vertices.y);
        return {
            x: c.x * (1 - a.x) + b.x * a.x,
            y: c.y * (1 - a.y) + b.y * a.y
        }
    },
    initWithSprite: null,
    _initWithSpriteForCanvas: function(a) {
        this.setPercentage(0);
        this.setAnchorPoint(0.5, 0.5);
        this._type = cc.PROGRESS_TIMER_TYPE_RADIAL;
        this._reverseDirection = !1;
        this.setMidpoint(cc.p(0.5, 0.5));
        this.setBarChangeRate(cc.p(1, 1));
        this.setSprite(a);
        return !0
    },
    _initWithSpriteForWebGL: function(a) {
        this.setPercentage(0);
        this._vertexArrayBuffer =
            this._vertexData = null;
        this._vertexDataCount = 0;
        this.setAnchorPoint(0.5, 0.5);
        this._type = cc.PROGRESS_TIMER_TYPE_RADIAL;
        this._reverseDirection = !1;
        this.setMidpoint(cc.p(0.5, 0.5));
        this.setBarChangeRate(cc.p(1, 1));
        this.setSprite(a);
        this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(cc.SHADER_POSITION_TEXTURECOLOR));
        return !0
    },
    draw: null,
    _drawForCanvas: function(a) {
        a = a || cc.renderContext;
        var b = this._sprite;
        b._isLighterMode && (a.globalCompositeOperation = "lighter");
        var c = cc.EGLView.getInstance().getScaleX(),
            d = cc.EGLView.getInstance().getScaleY();
        a.globalAlpha = b._displayedOpacity / 255;
        var e = b._rect,
            f = b._contentSize,
            g = b._offsetPosition,
            h = b._drawSize_Canvas,
            k = 0 | g.x,
            m = -g.y - e.height,
            n = b._textureRect_Canvas;
        h.width = e.width * c;
        h.height = e.height * d;
        a.save();
        b._flippedX && (k = -g.x - e.width, a.scale(-1, 1));
        b._flippedY && (m = g.y, a.scale(1, -1));
        k *= c;
        m *= d;
        this._type == cc.PROGRESS_TIMER_TYPE_BAR ? (e = this._barRect, a.beginPath(), a.rect(e.x * c, e.y * d, e.width * c, e.height * d), a.clip(), a.closePath()) : this._type == cc.PROGRESS_TIMER_TYPE_RADIAL &&
            (e = this._origin.x * c, g = this._origin.y * d, a.beginPath(), a.arc(e, g, this._radius * d, Math.PI / 180 * this._startAngle, Math.PI / 180 * this._endAngle, this._counterClockWise), a.lineTo(e, g), a.clip(), a.closePath());
        b._texture && n.validRect ? (c = b._texture.getHtmlElementObj(), this._colorized ? a.drawImage(c, 0, 0, n.width, n.height, k, m, h.width, h.height) : a.drawImage(c, n.x, n.y, n.width, n.height, k, m, h.width, h.height)) : 0 !== f.width && (h = this.getColor(), a.fillStyle = "rgba(" + h.r + "," + h.g + "," + h.b + ",1)", a.fillRect(k, m, f.width * c, f.height *
            d));
        a.restore();
        cc.INCREMENT_GL_DRAWS(1)
    },
    _drawForWebGL: function(a) {
        a = a || cc.renderContext;
        if (this._vertexData && this._sprite) {
            cc.NODE_DRAW_SETUP(this);
            var b = this._sprite.getBlendFunc();
            cc.glBlendFunc(b.src, b.dst);
            cc.glEnableVertexAttribs(cc.VERTEX_ATTRIB_FLAG_POSCOLORTEX);
            this._sprite.getTexture() ? cc.glBindTexture2D(this._sprite.getTexture()) : cc.glBindTexture2D(null);
            a.bindBuffer(a.ARRAY_BUFFER, this._vertexWebGLBuffer);
            this._vertexDataDirty && (a.bufferData(a.ARRAY_BUFFER, this._vertexArrayBuffer, a.DYNAMIC_DRAW),
                this._vertexDataDirty = !1);
            b = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
            a.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, a.FLOAT, !1, b, 0);
            a.vertexAttribPointer(cc.VERTEX_ATTRIB_COLOR, 4, a.UNSIGNED_BYTE, !0, b, 8);
            a.vertexAttribPointer(cc.VERTEX_ATTRIB_TEX_COORDS, 2, a.FLOAT, !1, b, 12);
            this._type === cc.PROGRESS_TIMER_TYPE_RADIAL ? a.drawArrays(a.TRIANGLE_FAN, 0, this._vertexDataCount) : this._type == cc.PROGRESS_TIMER_TYPE_BAR && (this._reverseDirection ? (a.drawArrays(a.TRIANGLE_STRIP, 0, this._vertexDataCount / 2), a.drawArrays(a.TRIANGLE_STRIP,
                4, this._vertexDataCount / 2), cc.g_NumberOfDraws++) : a.drawArrays(a.TRIANGLE_STRIP, 0, this._vertexDataCount));
            cc.g_NumberOfDraws++
        }
    },
    _updateRadial: function() {
        if (this._sprite) {
            var a, b = this._midPoint;
            a = this._percentage / 100;
            var c = 2 * cc.PI * (this._reverseDirection ? a : 1 - a),
                d = cc.p(b.x, 1),
                e = cc.pRotateByAngle(d, b, c),
                c = 0;
            if (0 == a) e = d, c = 0;
            else if (1 == a) e = d, c = 4;
            else {
                var f = cc.FLT_MAX,
                    g = cc.PROGRESS_TEXTURE_COORDS_COUNT;
                for (a = 0; a <= g; ++a) {
                    var h = (a + (g - 1)) % g,
                        k = this._boundaryTexCoord(a % g),
                        h = this._boundaryTexCoord(h);
                    0 == a ? h =
                        cc.pLerp(k, h, 1 - b.x) : 4 == a && (k = cc.pLerp(k, h, 1 - b.x));
                    var m = cc.p(0, 0);
                    cc.pLineIntersect(k, h, b, e, m) && (0 != a && 4 != a || 0 <= m.x && 1 >= m.x) && 0 <= m.y && m.y < f && (f = m.y, c = a)
                }
                e = cc.pAdd(b, cc.pMult(cc.pSub(e, b), f))
            }
            f = !0;
            this._vertexDataCount != c + 3 && (f = !1, this._vertexArrayBuffer = this._vertexData = null, this._vertexDataCount = 0);
            if (!this._vertexData) {
                g = this._vertexDataCount = c + 3;
                k = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
                this._vertexArrayBuffer = new ArrayBuffer(g * k);
                h = [];
                for (a = 0; a < g; a++) h[a] = new cc.V2F_C4B_T2F(null, null, null, this._vertexArrayBuffer,
                    a * k);
                this._vertexData = h;
                if (!this._vertexData) {
                    cc.log("cc.ProgressTimer._updateRadial() : Not enough memory");
                    return
                }
            }
            this._updateColor();
            g = this._vertexData;
            if (!f)
                for (g[0].texCoords = this._textureCoordFromAlphaPoint(b), g[0].vertices = this._vertexFromAlphaPoint(b), g[1].texCoords = this._textureCoordFromAlphaPoint(d), g[1].vertices = this._vertexFromAlphaPoint(d), a = 0; a < c; a++) b = this._boundaryTexCoord(a), g[a + 2].texCoords = this._textureCoordFromAlphaPoint(b), g[a + 2].vertices = this._vertexFromAlphaPoint(b);
            g[this._vertexDataCount -
                1].texCoords = this._textureCoordFromAlphaPoint(e);
            g[this._vertexDataCount - 1].vertices = this._vertexFromAlphaPoint(e)
        }
    },
    _updateBar: function() {
        if (this._sprite) {
            var a, b = this._percentage / 100,
                c = this._barChangeRate,
                c = cc.pMult(cc.p(1 - c.x + b * c.x, 1 - c.y + b * c.y), 0.5),
                b = cc.pSub(this._midPoint, c),
                c = cc.pAdd(this._midPoint, c);
            0 > b.x && (c.x += -b.x, b.x = 0);
            1 < c.x && (b.x -= c.x - 1, c.x = 1);
            0 > b.y && (c.y += -b.y, b.y = 0);
            1 < c.y && (b.y -= c.y - 1, c.y = 1);
            if (this._reverseDirection) {
                if (!this._vertexData) {
                    this._vertexDataCount = 8;
                    var d = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
                    this._vertexArrayBuffer = new ArrayBuffer(8 * d);
                    var e = [];
                    for (a = 0; 8 > a; a++) e[a] = new cc.V2F_C4B_T2F(null, null, null, this._vertexArrayBuffer, a * d);
                    e[0].texCoords = this._textureCoordFromAlphaPoint(cc.p(0, 1));
                    e[0].vertices = this._vertexFromAlphaPoint(cc.p(0, 1));
                    e[1].texCoords = this._textureCoordFromAlphaPoint(cc.p(0, 0));
                    e[1].vertices = this._vertexFromAlphaPoint(cc.p(0, 0));
                    e[6].texCoords = this._textureCoordFromAlphaPoint(cc.p(1, 1));
                    e[6].vertices = this._vertexFromAlphaPoint(cc.p(1, 1));
                    e[7].texCoords = this._textureCoordFromAlphaPoint(cc.p(1,
                        0));
                    e[7].vertices = this._vertexFromAlphaPoint(cc.p(1, 0));
                    this._vertexData = e
                }
                a = this._vertexData;
                a[2].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x, c.y));
                a[2].vertices = this._vertexFromAlphaPoint(cc.p(b.x, c.y));
                a[3].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x, b.y));
                a[3].vertices = this._vertexFromAlphaPoint(cc.p(b.x, b.y));
                a[4].texCoords = this._textureCoordFromAlphaPoint(cc.p(c.x, c.y));
                a[4].vertices = this._vertexFromAlphaPoint(cc.p(c.x, c.y));
                a[5].texCoords = this._textureCoordFromAlphaPoint(cc.p(c.x,
                    b.y));
                a[5].vertices = this._vertexFromAlphaPoint(cc.p(c.x, b.y))
            } else {
                if (!this._vertexData)
                    for (this._vertexDataCount = 4, d = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT, this._vertexArrayBuffer = new ArrayBuffer(4 * d), this._vertexData = [], a = 0; 4 > a; a++) this._vertexData[a] = new cc.V2F_C4B_T2F(null, null, null, this._vertexArrayBuffer, a * d);
                a = this._vertexData;
                a[0].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x, c.y));
                a[0].vertices = this._vertexFromAlphaPoint(cc.p(b.x, c.y));
                a[1].texCoords = this._textureCoordFromAlphaPoint(cc.p(b.x,
                    b.y));
                a[1].vertices = this._vertexFromAlphaPoint(cc.p(b.x, b.y));
                a[2].texCoords = this._textureCoordFromAlphaPoint(cc.p(c.x, c.y));
                a[2].vertices = this._vertexFromAlphaPoint(cc.p(c.x, c.y));
                a[3].texCoords = this._textureCoordFromAlphaPoint(cc.p(c.x, b.y));
                a[3].vertices = this._vertexFromAlphaPoint(cc.p(c.x, b.y))
            }
            this._updateColor()
        }
    },
    _updateColor: function() {
        if (this._sprite && this._vertexData) {
            for (var a = this._sprite.getQuad().tl.colors, b = this._vertexData, c = 0, d = this._vertexDataCount; c < d; ++c) b[c].colors = a;
            this._vertexDataDirty = !0
        }
    },
    _updateProgress: null,
    _updateProgressForCanvas: function() {
        var a = this._sprite,
            b = a.getContentSize(),
            c = this._midPoint;
        if (this._type == cc.PROGRESS_TIMER_TYPE_RADIAL) {
            this._radius = Math.round(Math.sqrt(b.width * b.width + b.height * b.height));
            var d, e = !1,
                f = this._origin;
            f.x = b.width * c.x;
            f.y = -b.height * c.y;
            this._reverseDirection ? (d = 270, c = 270 - 3.6 * this._percentage) : (c = -90, d = -90 + 3.6 * this._percentage);
            a._flippedX && (f.x -= 2 * b.width * this._midPoint.x, c = -c - 180, d = -d - 180, e = !e);
            a._flippedY && (f.y += 2 * b.height * this._midPoint.y,
                e = !e, c = -c, d = -d);
            this._startAngle = c;
            this._endAngle = d;
            this._counterClockWise = e
        } else {
            d = this._barChangeRate;
            f = this._percentage / 100;
            e = this._barRect;
            d = cc.size(b.width * (1 - d.x), b.height * (1 - d.y));
            var f = cc.size((b.width - d.width) * f, (b.height - d.height) * f),
                f = cc.size(d.width + f.width, d.height + f.height),
                g = cc.p(b.width * c.x, b.height * c.y),
                h = g.x - f.width / 2;
            0.5 < c.x && f.width / 2 >= b.width - g.x && (h = b.width - f.width);
            d = g.y - f.height / 2;
            0.5 < c.y && f.height / 2 >= b.height - g.y && (d = b.height - f.height);
            e.x = 0;
            b = 1;
            a._flippedX && (e.x -= f.width,
                b = -1);
            0 < h && (e.x += h * b);
            e.y = 0;
            b = 1;
            a._flippedY && (e.y += f.height, b = -1);
            0 < d && (e.y -= d * b);
            e.width = f.width;
            e.height = -f.height
        }
    },
    _updateProgressForWebGL: function() {
        var a = this._type;
        a === cc.PROGRESS_TIMER_TYPE_RADIAL ? this._updateRadial() : a === cc.PROGRESS_TIMER_TYPE_BAR && this._updateBar();
        this._vertexDataDirty = !0
    }
});
cc.Browser.supportWebGL ? (cc.ProgressTimer.prototype.ctor = cc.ProgressTimer.prototype._ctorForWebGL, cc.ProgressTimer.prototype.setReverseProgress = cc.ProgressTimer.prototype._setReverseProgressForWebGL, cc.ProgressTimer.prototype.setSprite = cc.ProgressTimer.prototype._setSpriteForWebGL, cc.ProgressTimer.prototype.setType = cc.ProgressTimer.prototype._setTypeForWebGL, cc.ProgressTimer.prototype.setReverseDirection = cc.ProgressTimer.prototype._setReverseDirectionForWebGL, cc.ProgressTimer.prototype.initWithSprite =
    cc.ProgressTimer.prototype._initWithSpriteForWebGL, cc.ProgressTimer.prototype.draw = cc.ProgressTimer.prototype._drawForWebGL, cc.ProgressTimer.prototype._updateProgress = cc.ProgressTimer.prototype._updateProgressForWebGL) : (cc.ProgressTimer.prototype.ctor = cc.ProgressTimer.prototype._ctorForCanvas, cc.ProgressTimer.prototype.setReverseProgress = cc.ProgressTimer.prototype._setReverseProgressForCanvas, cc.ProgressTimer.prototype.setSprite = cc.ProgressTimer.prototype._setSpriteForCanvas, cc.ProgressTimer.prototype.setType =
    cc.ProgressTimer.prototype._setTypeForCanvas, cc.ProgressTimer.prototype.setReverseDirection = cc.ProgressTimer.prototype._setReverseDirectionForCanvas, cc.ProgressTimer.prototype.initWithSprite = cc.ProgressTimer.prototype._initWithSpriteForCanvas, cc.ProgressTimer.prototype.draw = cc.ProgressTimer.prototype._drawForCanvas, cc.ProgressTimer.prototype._updateProgress = cc.ProgressTimer.prototype._updateProgressForCanvas);
cc.ProgressTimer.create = function(a) {
    var b = new cc.ProgressTimer;
    return b.initWithSprite(a) ? b : null
};
cc.ProgressTo = cc.ActionInterval.extend({
    _to: 0,
    _from: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._from = this._to = 0
    },
    initWithDuration: function(a, b) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._to = b, !0) : !1
    },
    clone: function() {
        var a = new cc.ProgressTo;
        a.initWithDuration(this._duration, this._to);
        return a
    },
    reverse: function() {
        cc.log("cc.ProgressTo.reverse(): reverse hasn't been supported.");
        return null
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this,
            a);
        this._from = a.getPercentage();
        100 == this._from && (this._from = 0)
    },
    update: function(a) {
        this._target instanceof cc.ProgressTimer && this._target.setPercentage(this._from + (this._to - this._from) * a)
    }
});
cc.ProgressTo.create = function(a, b) {
    var c = new cc.ProgressTo;
    c.initWithDuration(a, b);
    return c
};
cc.ProgressFromTo = cc.ActionInterval.extend({
    _to: 0,
    _from: 0,
    ctor: function() {
        cc.ActionInterval.prototype.ctor.call(this);
        this._from = this._to = 0
    },
    initWithDuration: function(a, b, c) {
        return cc.ActionInterval.prototype.initWithDuration.call(this, a) ? (this._to = c, this._from = b, !0) : !1
    },
    clone: function() {
        var a = new cc.ProgressFromTo;
        a.initWithDuration(this._duration, this._from, this._to);
        return a
    },
    reverse: function() {
        return cc.ProgressFromTo.create(this._duration, this._to, this._from)
    },
    startWithTarget: function(a) {
        cc.ActionInterval.prototype.startWithTarget.call(this,
            a)
    },
    update: function(a) {
        this._target instanceof cc.ProgressTimer && this._target.setPercentage(this._from + (this._to - this._from) * a)
    }
});
cc.ProgressFromTo.create = function(a, b, c) {
    var d = new cc.ProgressFromTo;
    d.initWithDuration(a, b, c);
    return d
};
cc.SCENE_FADE = 4208917214;
cc.TransitionEaseScene = cc.Class.extend({
    easeActionWithAction: function() {}
});
cc.TRANSITION_ORIENTATION_LEFT_OVER = 0;
cc.TRANSITION_ORIENTATION_RIGHT_OVER = 1;
cc.TRANSITION_ORIENTATION_UP_OVER = 0;
cc.TRANSITION_ORIENTATION_DOWN_OVER = 1;
cc.TransitionScene = cc.Scene.extend({
    _inScene: null,
    _outScene: null,
    _duration: null,
    _isInSceneOnTop: !1,
    _isSendCleanupToScene: !1,
    _setNewScene: function(a) {
        this.unschedule(this._setNewScene);
        a = cc.Director.getInstance();
        this._isSendCleanupToScene = a.isSendCleanupToScene();
        a.replaceScene(this._inScene);
        cc.TouchDispatcher && a.getTouchDispatcher().setDispatchEvents(!0);
        this._outScene.setVisible(!0)
    },
    _sceneOrder: function() {
        this._isInSceneOnTop = !0
    },
    draw: function() {
        this._isInSceneOnTop ? (this._outScene.visit(), this._inScene.visit()) :
            (this._inScene.visit(), this._outScene.visit())
    },
    onEnter: function() {
        cc.Node.prototype.onEnter.call(this);
        cc.TouchDispatcher && cc.Director.getInstance().getTouchDispatcher().setDispatchEvents(!1);
        this._outScene.onExitTransitionDidStart();
        this._inScene.onEnter()
    },
    onExit: function() {
        cc.Node.prototype.onExit.call(this);
        cc.TouchDispatcher && cc.Director.getInstance().getTouchDispatcher().setDispatchEvents(!0);
        this._outScene.onExit();
        this._inScene.onEnterTransitionDidFinish()
    },
    cleanup: function() {
        cc.Node.prototype.cleanup.call(this);
        this._isSendCleanupToScene && this._outScene.cleanup()
    },
    initWithDuration: function(a, b) {
        if (!b) throw "cc.TransitionScene.initWithDuration(): Argument scene must be non-nil";
        if (this.init()) {
            this._duration = a;
            this.setAnchorPoint(0, 0);
            this.setPosition(0, 0);
            this._inScene = b;
            this._outScene = cc.Director.getInstance().getRunningScene();
            this._outScene || (this._outScene = cc.Scene.create(), this._outScene.init());
            if (this._inScene == this._outScene) throw "cc.TransitionScene.initWithDuration(): Incoming scene must be different from the outgoing scene";
            this._sceneOrder();
            return !0
        }
        return !1
    },
    finish: function() {
        this._inScene.setVisible(!0);
        this._inScene.setPosition(0, 0);
        this._inScene.setScale(1);
        this._inScene.setRotation(0);
        cc.renderContextType === cc.WEBGL && this._inScene.getCamera().restore();
        this._outScene.setVisible(!1);
        this._outScene.setPosition(0, 0);
        this._outScene.setScale(1);
        this._outScene.setRotation(0);
        cc.renderContextType === cc.WEBGL && this._outScene.getCamera().restore();
        this.schedule(this._setNewScene, 0)
    },
    hideOutShowIn: function() {
        this._inScene.setVisible(!0);
        this._outScene.setVisible(!1)
    }
});
cc.TransitionScene.create = function(a, b) {
    var c = new cc.TransitionScene;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSceneOriented = cc.TransitionScene.extend({
    _orientation: 0,
    initWithDuration: function(a, b, c) {
        cc.TransitionScene.prototype.initWithDuration.call(this, a, b) && (this._orientation = c);
        return !0
    }
});
cc.TransitionSceneOriented.create = function(a, b, c) {
    var d = new cc.TransitionSceneOriented;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionRotoZoom = cc.TransitionScene.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        this._inScene.setScale(0.001);
        this._outScene.setScale(1);
        this._inScene.setAnchorPoint(0.5, 0.5);
        this._outScene.setAnchorPoint(0.5, 0.5);
        var a = cc.Sequence.create(cc.Spawn.create(cc.ScaleBy.create(this._duration / 2, 0.001), cc.RotateBy.create(this._duration / 2, 720)), cc.DelayTime.create(this._duration / 2));
        this._outScene.runAction(a);
        this._inScene.runAction(cc.Sequence.create(a.reverse(), cc.CallFunc.create(this.finish,
            this)))
    }
});
cc.TransitionRotoZoom.create = function(a, b) {
    var c = new cc.TransitionRotoZoom;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionJumpZoom = cc.TransitionScene.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a = cc.Director.getInstance().getWinSize();
        this._inScene.setScale(0.5);
        this._inScene.setPosition(a.width, 0);
        this._inScene.setAnchorPoint(0.5, 0.5);
        this._outScene.setAnchorPoint(0.5, 0.5);
        var b = cc.JumpBy.create(this._duration / 4, cc.p(-a.width, 0), a.width / 4, 2),
            c = cc.ScaleTo.create(this._duration / 4, 1),
            a = cc.ScaleTo.create(this._duration / 4, 0.5),
            a = cc.Sequence.create(a, b),
            b = cc.Sequence.create(b,
                c),
            c = cc.DelayTime.create(this._duration / 2);
        this._outScene.runAction(a);
        this._inScene.runAction(cc.Sequence.create(c, b, cc.CallFunc.create(this.finish, this)))
    }
});
cc.TransitionJumpZoom.create = function(a, b) {
    var c = new cc.TransitionJumpZoom;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInL = cc.TransitionScene.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        this.initScenes();
        var a = this.action();
        this._inScene.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this)))
    },
    initScenes: function() {
        this._inScene.setPosition(-cc.Director.getInstance().getWinSize().width, 0)
    },
    action: function() {
        return cc.MoveTo.create(this._duration, cc.p(0, 0))
    },
    easeActionWithAction: function(a) {
        return cc.EaseOut.create(a, 2)
    }
});
cc.TransitionMoveInL.create = function(a, b) {
    var c = new cc.TransitionMoveInL;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInR = cc.TransitionMoveInL.extend({
    initScenes: function() {
        this._inScene.setPosition(cc.Director.getInstance().getWinSize().width, 0)
    }
});
cc.TransitionMoveInR.create = function(a, b) {
    var c = new cc.TransitionMoveInR;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInT = cc.TransitionMoveInL.extend({
    initScenes: function() {
        this._inScene.setPosition(0, cc.Director.getInstance().getWinSize().height)
    }
});
cc.TransitionMoveInT.create = function(a, b) {
    var c = new cc.TransitionMoveInT;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionMoveInB = cc.TransitionMoveInL.extend({
    initScenes: function() {
        this._inScene.setPosition(0, -cc.Director.getInstance().getWinSize().height)
    }
});
cc.TransitionMoveInB.create = function(a, b) {
    var c = new cc.TransitionMoveInB;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.ADJUST_FACTOR = 0.5;
cc.TransitionSlideInL = cc.TransitionScene.extend({
    _sceneOrder: function() {
        this._isInSceneOnTop = !1
    },
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        this.initScenes();
        var a = this.action(),
            b = this.action(),
            a = this.easeActionWithAction(a),
            b = cc.Sequence.create(this.easeActionWithAction(b), cc.CallFunc.create(this.finish, this));
        this._inScene.runAction(a);
        this._outScene.runAction(b)
    },
    initScenes: function() {
        this._inScene.setPosition(-(cc.Director.getInstance().getWinSize().width - cc.ADJUST_FACTOR),
            0)
    },
    action: function() {
        return cc.MoveBy.create(this._duration, cc.p(cc.Director.getInstance().getWinSize().width - cc.ADJUST_FACTOR, 0))
    },
    easeActionWithAction: function(a) {
        return cc.EaseOut.create(a, 2)
    }
});
cc.TransitionSlideInL.create = function(a, b) {
    var c = new cc.TransitionSlideInL;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSlideInR = cc.TransitionSlideInL.extend({
    _sceneOrder: function() {
        this._isInSceneOnTop = !0
    },
    initScenes: function() {
        this._inScene.setPosition(cc.Director.getInstance().getWinSize().width - cc.ADJUST_FACTOR, 0)
    },
    action: function() {
        return cc.MoveBy.create(this._duration, cc.p(-(cc.Director.getInstance().getWinSize().width - cc.ADJUST_FACTOR), 0))
    }
});
cc.TransitionSlideInR.create = function(a, b) {
    var c = new cc.TransitionSlideInR;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSlideInB = cc.TransitionSlideInL.extend({
    _sceneOrder: function() {
        this._isInSceneOnTop = !1
    },
    initScenes: function() {
        this._inScene.setPosition(0, cc.Director.getInstance().getWinSize().height - cc.ADJUST_FACTOR)
    },
    action: function() {
        return cc.MoveBy.create(this._duration, cc.p(0, -(cc.Director.getInstance().getWinSize().height - cc.ADJUST_FACTOR)))
    }
});
cc.TransitionSlideInB.create = function(a, b) {
    var c = new cc.TransitionSlideInB;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSlideInT = cc.TransitionSlideInL.extend({
    _sceneOrder: function() {
        this._isInSceneOnTop = !0
    },
    initScenes: function() {
        this._inScene.setPosition(0, -(cc.Director.getInstance().getWinSize().height - cc.ADJUST_FACTOR))
    },
    action: function() {
        return cc.MoveBy.create(this._duration, cc.p(0, cc.Director.getInstance().getWinSize().height - cc.ADJUST_FACTOR))
    }
});
cc.TransitionSlideInT.create = function(a, b) {
    var c = new cc.TransitionSlideInT;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionShrinkGrow = cc.TransitionScene.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        this._inScene.setScale(0.001);
        this._outScene.setScale(1);
        this._inScene.setAnchorPoint(2 / 3, 0.5);
        this._outScene.setAnchorPoint(1 / 3, 0.5);
        var a = cc.ScaleTo.create(this._duration, 0.01),
            b = cc.ScaleTo.create(this._duration, 1);
        this._inScene.runAction(this.easeActionWithAction(b));
        this._outScene.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this)))
    },
    easeActionWithAction: function(a) {
        return cc.EaseOut.create(a, 2)
    }
});
cc.TransitionShrinkGrow.create = function(a, b) {
    var c = new cc.TransitionShrinkGrow;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFlipX = cc.TransitionSceneOriented.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a, b;
        this._inScene.setVisible(!1);
        var c;
        this._orientation === cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
        a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Show.create(), cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 0, 0), cc.CallFunc.create(this.finish, this));
        b = cc.Sequence.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, 0, b, 0, 0), cc.Hide.create(),
            cc.DelayTime.create(this._duration / 2));
        this._inScene.runAction(a);
        this._outScene.runAction(b)
    }
});
cc.TransitionFlipX.create = function(a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionFlipX;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionFlipY = cc.TransitionSceneOriented.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a, b;
        this._inScene.setVisible(!1);
        var c;
        this._orientation == cc.TRANSITION_ORIENTATION_UP_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
        a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Show.create(), cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 90, 0), cc.CallFunc.create(this.finish, this));
        b = cc.Sequence.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, 0, b, 90, 0), cc.Hide.create(),
            cc.DelayTime.create(this._duration / 2));
        this._inScene.runAction(a);
        this._outScene.runAction(b)
    }
});
cc.TransitionFlipY.create = function(a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_UP_OVER);
    var d = new cc.TransitionFlipY;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionFlipAngular = cc.TransitionSceneOriented.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a, b;
        this._inScene.setVisible(!1);
        var c;
        this._orientation === cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
        a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Show.create(), cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, -45, 0), cc.CallFunc.create(this.finish, this));
        b = cc.Sequence.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, 0, b, 45,
            0), cc.Hide.create(), cc.DelayTime.create(this._duration / 2));
        this._inScene.runAction(a);
        this._outScene.runAction(b)
    }
});
cc.TransitionFlipAngular.create = function(a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionFlipAngular;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionZoomFlipX = cc.TransitionSceneOriented.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a, b;
        this._inScene.setVisible(!1);
        var c;
        this._orientation === cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
        a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Spawn.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 0, 0), cc.ScaleTo.create(this._duration / 2, 1), cc.Show.create()), cc.CallFunc.create(this.finish, this));
        b = cc.Sequence.create(cc.Spawn.create(cc.OrbitCamera.create(this._duration /
            2, 1, 0, 0, b, 0, 0), cc.ScaleTo.create(this._duration / 2, 0.5)), cc.Hide.create(), cc.DelayTime.create(this._duration / 2));
        this._inScene.setScale(0.5);
        this._inScene.runAction(a);
        this._outScene.runAction(b)
    }
});
cc.TransitionZoomFlipX.create = function(a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionZoomFlipX;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionZoomFlipY = cc.TransitionSceneOriented.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a, b;
        this._inScene.setVisible(!1);
        var c;
        this._orientation === cc.TRANSITION_ORIENTATION_UP_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
        a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Spawn.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, 90, 0), cc.ScaleTo.create(this._duration / 2, 1), cc.Show.create()), cc.CallFunc.create(this.finish, this));
        b = cc.Sequence.create(cc.Spawn.create(cc.OrbitCamera.create(this._duration /
            2, 1, 0, 0, b, 90, 0), cc.ScaleTo.create(this._duration / 2, 0.5)), cc.Hide.create(), cc.DelayTime.create(this._duration / 2));
        this._inScene.setScale(0.5);
        this._inScene.runAction(a);
        this._outScene.runAction(b)
    }
});
cc.TransitionZoomFlipY.create = function(a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_UP_OVER);
    var d = new cc.TransitionZoomFlipY;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionZoomFlipAngular = cc.TransitionSceneOriented.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a, b;
        this._inScene.setVisible(!1);
        var c;
        this._orientation === cc.TRANSITION_ORIENTATION_RIGHT_OVER ? (a = 90, c = 270, b = 90) : (a = -90, c = 90, b = -90);
        a = cc.Sequence.create(cc.DelayTime.create(this._duration / 2), cc.Spawn.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, c, a, -45, 0), cc.ScaleTo.create(this._duration / 2, 1), cc.Show.create()), cc.Show.create(), cc.CallFunc.create(this.finish,
            this));
        b = cc.Sequence.create(cc.Spawn.create(cc.OrbitCamera.create(this._duration / 2, 1, 0, 0, b, 45, 0), cc.ScaleTo.create(this._duration / 2, 0.5)), cc.Hide.create(), cc.DelayTime.create(this._duration / 2));
        this._inScene.setScale(0.5);
        this._inScene.runAction(a);
        this._outScene.runAction(b)
    }
});
cc.TransitionZoomFlipAngular.create = function(a, b, c) {
    null == c && (c = cc.TRANSITION_ORIENTATION_RIGHT_OVER);
    var d = new cc.TransitionZoomFlipAngular;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionFade = cc.TransitionScene.extend({
    _color: null,
    ctor: function() {
        cc.TransitionScene.prototype.ctor.call(this);
        this._color = new cc.Color4B
    },
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a = cc.LayerColor.create(this._color);
        this._inScene.setVisible(!1);
        this.addChild(a, 2, cc.SCENE_FADE);
        var a = this.getChildByTag(cc.SCENE_FADE),
            b = cc.Sequence.create(cc.FadeIn.create(this._duration / 2), cc.CallFunc.create(this.hideOutShowIn, this), cc.FadeOut.create(this._duration / 2), cc.CallFunc.create(this.finish,
                this));
        a.runAction(b)
    },
    onExit: function() {
        cc.TransitionScene.prototype.onExit.call(this);
        this.removeChildByTag(cc.SCENE_FADE, !1)
    },
    initWithDuration: function(a, b, c) {
        c = c || cc.black();
        cc.TransitionScene.prototype.initWithDuration.call(this, a, b) && (this._color.r = c.r, this._color.g = c.g, this._color.b = c.b, this._color.a = 0);
        return !0
    }
});
cc.TransitionFade.create = function(a, b, c) {
    var d = new cc.TransitionFade;
    d.initWithDuration(a, b, c);
    return d
};
cc.TransitionCrossFade = cc.TransitionScene.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a = new cc.Color4B(0, 0, 0, 0),
            b = cc.Director.getInstance().getWinSize(),
            a = cc.LayerColor.create(a),
            c = cc.RenderTexture.create(b.width, b.height);
        if (null != c) {
            c.getSprite().setAnchorPoint(0.5, 0.5);
            c.setPosition(b.width / 2, b.height / 2);
            c.setAnchorPoint(0.5, 0.5);
            c.begin();
            this._inScene.visit();
            c.end();
            var d = cc.RenderTexture.create(b.width, b.height);
            d.getSprite().setAnchorPoint(0.5, 0.5);
            d.setPosition(b.width /
                2, b.height / 2);
            d.setAnchorPoint(0.5, 0.5);
            d.begin();
            this._outScene.visit();
            d.end();
            c.getSprite().setBlendFunc(gl.ONE, gl.ONE);
            d.getSprite().setBlendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            a.addChild(c);
            a.addChild(d);
            c.getSprite().setOpacity(255);
            d.getSprite().setOpacity(255);
            b = cc.Sequence.create(cc.FadeTo.create(this._duration, 0), cc.CallFunc.create(this.hideOutShowIn, this), cc.CallFunc.create(this.finish, this));
            d.getSprite().runAction(b);
            this.addChild(a, 2, cc.SCENE_FADE)
        }
    },
    onExit: function() {
        this.removeChildByTag(cc.SCENE_FADE, !1);
        cc.TransitionScene.prototype.onExit.call(this)
    },
    draw: function() {}
});
cc.TransitionCrossFade.create = function(a, b) {
    var c = new cc.TransitionCrossFade;
    c.initWithDuration(a, b);
    return c
};
cc.TransitionTurnOffTiles = cc.TransitionScene.extend({
    _sceneOrder: function() {
        this._isInSceneOnTop = !1
    },
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a = cc.Director.getInstance().getWinSize(),
            a = cc.TurnOffTiles.create(this._duration, cc.size(0 | a.width / a.height * 12, 12)),
            a = this.easeActionWithAction(a);
        this._outScene.runAction(cc.Sequence.create(a, cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))
    },
    easeActionWithAction: function(a) {
        return a
    }
});
cc.TransitionTurnOffTiles.create = function(a, b) {
    var c = new cc.TransitionTurnOffTiles;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSplitCols = cc.TransitionScene.extend({
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        this._inScene.setVisible(!1);
        var a = this.action(),
            a = cc.Sequence.create(a, cc.CallFunc.create(this.hideOutShowIn, this), a.reverse());
        this.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))
    },
    easeActionWithAction: function(a) {
        return cc.EaseInOut.create(a, 3)
    },
    action: function() {
        return cc.SplitCols.create(this._duration / 2, 3)
    }
});
cc.TransitionSplitCols.create = function(a, b) {
    var c = new cc.TransitionSplitCols;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionSplitRows = cc.TransitionSplitCols.extend({
    action: function() {
        return cc.SplitRows.create(this._duration / 2, 3)
    }
});
cc.TransitionSplitRows.create = function(a, b) {
    var c = new cc.TransitionSplitRows;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeTR = cc.TransitionScene.extend({
    _sceneOrder: function() {
        this._isInSceneOnTop = !1
    },
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a = cc.Director.getInstance().getWinSize(),
            a = this.actionWithSize(cc.size(0 | a.width / a.height * 12, 12));
        this._outScene.runAction(cc.Sequence.create(this.easeActionWithAction(a), cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))
    },
    easeActionWithAction: function(a) {
        return a
    },
    actionWithSize: function(a) {
        return cc.FadeOutTRTiles.create(this._duration,
            a)
    }
});
cc.TransitionFadeTR.create = function(a, b) {
    var c = new cc.TransitionFadeTR;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeBL = cc.TransitionFadeTR.extend({
    actionWithSize: function(a) {
        return cc.FadeOutBLTiles.create(this._duration, a)
    }
});
cc.TransitionFadeBL.create = function(a, b) {
    var c = new cc.TransitionFadeBL;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeUp = cc.TransitionFadeTR.extend({
    actionWithSize: function(a) {
        return cc.FadeOutUpTiles.create(this._duration, a)
    }
});
cc.TransitionFadeUp.create = function(a, b) {
    var c = new cc.TransitionFadeUp;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionFadeDown = cc.TransitionFadeTR.extend({
    actionWithSize: function(a) {
        return cc.FadeOutDownTiles.create(this._duration, a)
    }
});
cc.TransitionFadeDown.create = function(a, b) {
    var c = new cc.TransitionFadeDown;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.SCENE_RADIAL = 49153;
cc.TransitionProgress = cc.TransitionScene.extend({
    _to: 0,
    _from: 0,
    _sceneToBeModified: null,
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        this._setupTransition();
        var a = cc.Director.getInstance().getWinSize(),
            b = cc.RenderTexture.create(a.width, a.height);
        b.getSprite().setAnchorPoint(0.5, 0.5);
        b.setPosition(a.width / 2, a.height / 2);
        b.setAnchorPoint(0.5, 0.5);
        b.clear(0, 0, 0, 1);
        b.begin();
        this._sceneToBeModified.visit();
        b.end();
        this._sceneToBeModified == this._outScene && this.hideOutShowIn();
        a = this._progressTimerNodeWithRenderTexture(b);
        b = cc.Sequence.create(cc.ProgressFromTo.create(this._duration, this._from, this._to), cc.CallFunc.create(this.finish, this));
        a.runAction(b);
        this.addChild(a, 2, cc.SCENE_RADIAL)
    },
    onExit: function() {
        this.removeChildByTag(cc.SCENE_RADIAL, !0);
        cc.TransitionScene.prototype.onExit.call(this)
    },
    _setupTransition: function() {
        this._sceneToBeModified = this._outScene;
        this._from = 100;
        this._to = 0
    },
    _progressTimerNodeWithRenderTexture: function(a) {
        cc.log("cc.TransitionProgress._progressTimerNodeWithRenderTexture(): should be overridden in subclass");
        return null
    },
    _sceneOrder: function() {
        this._isInSceneOnTop = !1
    }
});
cc.TransitionProgress.create = function(a, b) {
    var c = new cc.TransitionProgress;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressRadialCCW = cc.TransitionProgress.extend({
    _progressTimerNodeWithRenderTexture: function(a) {
        var b = cc.Director.getInstance().getWinSize();
        a = cc.ProgressTimer.create(a.getSprite());
        cc.renderContextType === cc.WEBGL && a.getSprite().setFlippedY(!0);
        a.setType(cc.PROGRESS_TIMER_TYPE_RADIAL);
        a.setReverseDirection(!1);
        a.setPercentage(100);
        a.setPosition(b.width / 2, b.height / 2);
        a.setAnchorPoint(0.5, 0.5);
        return a
    }
});
cc.TransitionProgressRadialCCW.create = function(a, b) {
    var c = new cc.TransitionProgressRadialCCW;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressRadialCW = cc.TransitionProgress.extend({
    _progressTimerNodeWithRenderTexture: function(a) {
        var b = cc.Director.getInstance().getWinSize();
        a = cc.ProgressTimer.create(a.getSprite());
        cc.renderContextType === cc.WEBGL && a.getSprite().setFlippedY(!0);
        a.setType(cc.PROGRESS_TIMER_TYPE_RADIAL);
        a.setReverseDirection(!0);
        a.setPercentage(100);
        a.setPosition(b.width / 2, b.height / 2);
        a.setAnchorPoint(0.5, 0.5);
        return a
    }
});
cc.TransitionProgressRadialCW.create = function(a, b) {
    var c = new cc.TransitionProgressRadialCW;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressHorizontal = cc.TransitionProgress.extend({
    _progressTimerNodeWithRenderTexture: function(a) {
        var b = cc.Director.getInstance().getWinSize();
        a = cc.ProgressTimer.create(a.getSprite());
        cc.renderContextType === cc.WEBGL && a.getSprite().setFlippedY(!0);
        a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        a.setMidpoint(cc.p(1, 0));
        a.setBarChangeRate(cc.p(1, 0));
        a.setPercentage(100);
        a.setPosition(b.width / 2, b.height / 2);
        a.setAnchorPoint(0.5, 0.5);
        return a
    }
});
cc.TransitionProgressHorizontal.create = function(a, b) {
    var c = new cc.TransitionProgressHorizontal;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressVertical = cc.TransitionProgress.extend({
    _progressTimerNodeWithRenderTexture: function(a) {
        var b = cc.Director.getInstance().getWinSize();
        a = cc.ProgressTimer.create(a.getSprite());
        cc.renderContextType === cc.WEBGL && a.getSprite().setFlippedY(!0);
        a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        a.setMidpoint(cc.p(0, 0));
        a.setBarChangeRate(cc.p(0, 1));
        a.setPercentage(100);
        a.setPosition(b.width / 2, b.height / 2);
        a.setAnchorPoint(0.5, 0.5);
        return a
    }
});
cc.TransitionProgressVertical.create = function(a, b) {
    var c = new cc.TransitionProgressVertical;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressInOut = cc.TransitionProgress.extend({
    _progressTimerNodeWithRenderTexture: function(a) {
        var b = cc.Director.getInstance().getWinSize();
        a = cc.ProgressTimer.create(a.getSprite());
        cc.renderContextType === cc.WEBGL && a.getSprite().setFlippedY(!0);
        a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        a.setMidpoint(cc.p(0.5, 0.5));
        a.setBarChangeRate(cc.p(1, 1));
        a.setPercentage(0);
        a.setPosition(b.width / 2, b.height / 2);
        a.setAnchorPoint(0.5, 0.5);
        return a
    },
    _sceneOrder: function() {
        this._isInSceneOnTop = !1
    },
    _setupTransition: function() {
        this._sceneToBeModified =
            this._inScene;
        this._from = 0;
        this._to = 100
    }
});
cc.TransitionProgressInOut.create = function(a, b) {
    var c = new cc.TransitionProgressInOut;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionProgressOutIn = cc.TransitionProgress.extend({
    _progressTimerNodeWithRenderTexture: function(a) {
        var b = cc.Director.getInstance().getWinSize();
        a = cc.ProgressTimer.create(a.getSprite());
        cc.renderContextType === cc.WEBGL && a.getSprite().setFlippedY(!0);
        a.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        a.setMidpoint(cc.p(0.5, 0.5));
        a.setBarChangeRate(cc.p(1, 1));
        a.setPercentage(100);
        a.setPosition(b.width / 2, b.height / 2);
        a.setAnchorPoint(0.5, 0.5);
        return a
    }
});
cc.TransitionProgressOutIn.create = function(a, b) {
    var c = new cc.TransitionProgressOutIn;
    return null != c && c.initWithDuration(a, b) ? c : null
};
cc.TransitionPageTurn = cc.TransitionScene.extend({
    _back: !0,
    initWithDuration: function(a, b, c) {
        this._back = c;
        cc.TransitionScene.prototype.initWithDuration.call(this, a, b);
        return !0
    },
    actionWithSize: function(a) {
        return this._back ? cc.ReverseTime.create(cc.PageTurn3D.create(this._duration, a)) : cc.PageTurn3D.create(this._duration, a)
    },
    onEnter: function() {
        cc.TransitionScene.prototype.onEnter.call(this);
        var a = cc.Director.getInstance().getWinSize(),
            b;
        a.width > a.height ? (a = 16, b = 12) : (a = 12, b = 16);
        a = this.actionWithSize(cc.size(a,
            b));
        this._back ? (this._inScene.setVisible(!1), this._inScene.runAction(cc.Sequence.create(cc.Show.create(), a, cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))) : this._outScene.runAction(cc.Sequence.create(a, cc.CallFunc.create(this.finish, this), cc.StopGrid.create()))
    },
    _sceneOrder: function() {
        this._isInSceneOnTop = this._back
    }
});
cc.TransitionPageTurn.create = function(a, b, c) {
    var d = new cc.TransitionPageTurn;
    d.initWithDuration(a, b, c);
    return d
};
cc.LabelAtlas = cc.AtlasNode.extend({
    _string: null,
    _mapStartChar: null,
    _textureLoaded: !1,
    _loadedEventListeners: null,
    ctor: function() {
        cc.AtlasNode.prototype.ctor.call(this)
    },
    textureLoaded: function() {
        return this._textureLoaded
    },
    addLoadedEventListener: function(a, b) {
        this._loadedEventListeners || (this._loadedEventListeners = []);
        this._loadedEventListeners.push({
            eventCallback: a,
            eventTarget: b
        })
    },
    _callLoadedEventCallbacks: function() {
        if (this._loadedEventListeners) {
            this._textureLoaded = !0;
            for (var a = this._loadedEventListeners,
                b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                d.eventCallback.call(d.eventTarget, this)
            }
            a.length = 0
        }
    },
    initWithString: function(a, b, c, d, e) {
        var f = a + "",
            g, h, k, m;
        if (2 === arguments.length) {
            m = cc.FileUtils.getInstance();
            var n = m.fullPathForFilename(b);
            g = n.substr(0, n.lastIndexOf("/")) + "/";
            m = m.dictionaryWithContentsOfFileThreadSafe(n);
            if (1 !== parseInt(m.version, 10)) return cc.log("cc.LabelAtlas.initWithString(): Unsupported version. Upgrade cocos2d version"), !1;
            g += m.textureFilename;
            n = cc.CONTENT_SCALE_FACTOR();
            h = parseInt(m.itemWidth,
                10) / n;
            k = parseInt(m.itemHeight, 10) / n;
            m = String.fromCharCode(parseInt(m.firstChar, 10))
        } else g = b, h = c || 0, k = d || 0, m = e || " ";
        var p = null,
            p = g instanceof cc.Texture2D ? g : cc.TextureCache.getInstance().addImage(g);
        (this._textureLoaded = g = p.isLoaded()) || p.addLoadedEventListener(function(a) {
            this.initWithTexture(p, h, k, f.length);
            this.setString(f);
            this._callLoadedEventCallbacks()
        }, this);
        return this.initWithTexture(p, h, k, f.length) ? (this._mapStartChar = m, this.setString(f), !0) : !1
    },
    setColor: function(a) {
        cc.AtlasNode.prototype.setColor.call(this,
            a);
        this.updateAtlasValues()
    },
    getString: function() {
        return this._string
    },
    draw: function(a) {
        cc.AtlasNode.prototype.draw.call(this, a);
        cc.LABELATLAS_DEBUG_DRAW && (a = this.getContentSize(), a = [cc.p(0, 0), cc.p(a.width, 0), cc.p(a.width, a.height), cc.p(0, a.height)], cc.drawingUtil.drawPoly(a, 4, !0))
    },
    updateAtlasValues: null,
    _updateAtlasValuesForCanvas: function() {
        for (var a = this._string, b = a.length, c = this.getTexture(), d = this._itemWidth, e = this._itemHeight, f = 0; f < b; f++) {
            var g = a.charCodeAt(f) - this._mapStartChar.charCodeAt(0),
                h = parseInt(g % this._itemsPerRow, 10),
                g = parseInt(g / this._itemsPerRow, 10),
                h = cc.rect(h * d, g * e, d, e),
                g = a.charCodeAt(f),
                k = this.getChildByTag(f);
            k ? 32 == g ? (k.init(), k.setTextureRect(cc.rect(0, 0, 10, 10), !1, cc.SizeZero())) : (k.initWithTexture(c, h), k.setVisible(!0), k.setOpacity(this._displayedOpacity)) : (k = new cc.Sprite, 32 == g ? (k.init(), k.setTextureRect(cc.rect(0, 0, 10, 10), !1, cc.SizeZero())) : k.initWithTexture(c, h), this.addChild(k, 0, f));
            k.setPosition(f * d + d / 2, e / 2)
        }
    },
    _updateAtlasValuesForWebGL: function() {
        var a = this._string,
            b = a.length,
            c = this._textureAtlas,
            d = c.getTexture(),
            e = d.getPixelsWide(),
            d = d.getPixelsHigh(),
            f = this._itemWidth,
            g = this._itemHeight;
        this._ignoreContentScaleFactor || (f = this._itemWidth * cc.CONTENT_SCALE_FACTOR(), g = this._itemHeight * cc.CONTENT_SCALE_FACTOR());
        b > c.getCapacity() && cc.log("cc.LabelAtlas._updateAtlasValues(): Invalid String length");
        for (var h = c.getQuads(), k = this._displayedColor, k = {
            r: k.r,
            g: k.g,
            b: k.b,
            a: this._displayedOpacity
        }, m = this._itemWidth, n = 0; n < b; n++) {
            var p = a.charCodeAt(n) - this._mapStartChar.charCodeAt(0),
                q = p % this._itemsPerRow,
                r = 0 | p / this._itemsPerRow,
                s;
            cc.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (q = (2 * q * f + 1) / (2 * e), p = q + (2 * f - 2) / (2 * e), r = (2 * r * g + 1) / (2 * d), s = r + (2 * g - 2) / (2 * d)) : (q = q * f / e, p = q + f / e, r = r * g / d, s = r + g / d);
            var t = h[n],
                u = t.tl,
                v = t.tr,
                w = t.bl,
                t = t.br;
            u.texCoords.u = q;
            u.texCoords.v = r;
            v.texCoords.u = p;
            v.texCoords.v = r;
            w.texCoords.u = q;
            w.texCoords.v = s;
            t.texCoords.u = p;
            t.texCoords.v = s;
            w.vertices.x = n * m;
            w.vertices.y = 0;
            w.vertices.z = 0;
            t.vertices.x = n * m + m;
            t.vertices.y = 0;
            t.vertices.z = 0;
            u.vertices.x = n * m;
            u.vertices.y = this._itemHeight;
            u.vertices.z = 0;
            v.vertices.x = n * m + m;
            v.vertices.y = this._itemHeight;
            v.vertices.z = 0;
            u.colors = k;
            v.colors = k;
            w.colors = k;
            t.colors = k
        }
        0 < b && (c.setDirty(!0), a = c.getTotalQuads(), b > a && c.increaseTotalQuadsWith(b - a))
    },
    setString: null,
    _setStringForCanvas: function(a) {
        a = String(a);
        var b = a.length;
        this._string = a;
        this.setContentSize(b * this._itemWidth, this._itemHeight);
        if (this._children) {
            a = this._children;
            for (var b = a.length, c = 0; c < b; c++) {
                var d = a[c];
                d && d.setVisible(!1)
            }
        }
        this.updateAtlasValues();
        this._quadsToDraw = b
    },
    _setStringForWebGL: function(a) {
        a =
            String(a);
        var b = a.length;
        b > this._textureAtlas.getTotalQuads() && this._textureAtlas.resizeCapacity(b);
        this._string = a;
        this.setContentSize(b * this._itemWidth, this._itemHeight);
        this.updateAtlasValues();
        this._quadsToDraw = b
    },
    setOpacity: null,
    _setOpacityForCanvas: function(a) {
        if (this._displayedOpacity !== a) {
            cc.AtlasNode.prototype.setOpacity.call(this, a);
            for (var b = this._children, c = 0, d = b.length; c < d; c++) b[c] && b[c].setOpacity(a)
        }
    },
    _setOpacityForWebGL: function(a) {
        this._opacity !== a && cc.AtlasNode.prototype.setOpacity.call(this,
            a)
    }
});
cc.Browser.supportWebGL ? (cc.LabelAtlas.prototype.updateAtlasValues = cc.LabelAtlas.prototype._updateAtlasValuesForWebGL, cc.LabelAtlas.prototype.setString = cc.LabelAtlas.prototype._setStringForWebGL, cc.LabelAtlas.prototype.setOpacity = cc.LabelAtlas.prototype._setOpacityForWebGL) : (cc.LabelAtlas.prototype.updateAtlasValues = cc.LabelAtlas.prototype._updateAtlasValuesForCanvas, cc.LabelAtlas.prototype.setString = cc.LabelAtlas.prototype._setStringForCanvas, cc.LabelAtlas.prototype.setOpacity = cc.LabelAtlas.prototype._setOpacityForCanvas);
cc.LabelAtlas.create = function(a, b, c, d, e) {
    var f = new cc.LabelAtlas;
    return f && cc.LabelAtlas.prototype.initWithString.apply(f, arguments) ? f : null
};
cc.LABEL_AUTOMATIC_WIDTH = -1;
cc.KerningHashElement = function(a, b) {
    this.key = a || 0;
    this.amount = b || 0
};
cc.FontDefHashElement = function(a, b) {
    this.key = a || 0;
    this.fontDef = b || new cc.BMFontDef
};
cc.BMFontDef = function(a, b, c, d, e) {
    this.charID = a || 0;
    this.rect = b || cc.rect(0, 0, 0.1, 0.1);
    this.xOffset = c || 0;
    this.yOffset = d || 0;
    this.xAdvance = e || 0
};
cc.BMFontPadding = function(a, b, c, d) {
    this.left = a || 0;
    this.top = b || 0;
    this.right = c || 0;
    this.bottom = d || 0
};
cc.BMFontConfiguration = cc.Class.extend({
    commonHeight: 0,
    padding: null,
    atlasName: null,
    kerningDictionary: null,
    fontDefDictionary: null,
    characterSet: null,
    ctor: function() {
        this.padding = new cc.BMFontPadding;
        this.atlasName = "";
        this.kerningDictionary = new cc.KerningHashElement;
        this.fontDefDictionary = {};
        this.characterSet = []
    },
    description: function() {
        return "\x3ccc.BMFontConfiguration | Kernings:" + this.kerningDictionary.amount + " | Image \x3d " + this.atlasName.toString() + "\x3e"
    },
    getAtlasName: function() {
        return this.atlasName
    },
    setAtlasName: function(a) {
        this.atlasName = a
    },
    getCharacterSet: function() {
        return this.characterSet
    },
    initWithFNTfile: function(a) {
        if (!a || 0 == a.length) throw "cc.BMFontConfiguration.initWithFNTfile(): FNTfile must be non-null and must not be a empty string";
        this.characterSet = this._parseConfigFile(a);
        return null != this.characterSet
    },
    _parseConfigFile: function(a) {
        var b = cc.FileUtils.getInstance().fullPathForFilename(a),
            b = cc.SAXParser.getInstance().getList(b);
        if (!b) return cc.log("cc.BMFontConfiguration._parseConfigFile)(: Error parsing FNTfile " +
            a), null;
        var c = [],
            d;
        d = /padding+[a-z0-9\-= ",]+/gi;
        (d = d.exec(b)[0]) && this._parseInfoArguments(d);
        d = /common lineHeight+[a-z0-9\-= ",]+/gi;
        (d = d.exec(b)[0]) && this._parseCommonArguments(d);
        d = /page id=[0-9]+ file="[\w\-\.]+/gi;
        (d = d.exec(b)[0]) && this._parseImageFileName(d, a);
        d = /chars c+[a-z0-9\-= ",]+/gi;
        d.exec(b);
        d = /char id=\w[a-z0-9\-= ]+/gi;
        if (d = b.match(d))
            for (a = 0; a < d.length; a++) {
                var e = new cc.FontDefHashElement;
                this._parseCharacterDefinition(d[a], e.fontDef);
                e.key = e.fontDef.charID;
                this.fontDefDictionary[e.key] =
                    e;
                c.push(e.fontDef.charID)
            }
        d = /kerning first=\w[a-z0-9\-= ]+/gi;
        if (d = b.match(d))
            for (a = 0; a < d.length; a++) this._parseKerningEntry(d[a]);
        return c
    },
    _parseCharacterDefinition: function(a, b) {
        var c = /id=(\d+)/gi.exec(a)[1];
        b.charID = c.toString();
        c = /x=([\-\d]+)/gi.exec(a)[1];
        b.rect.x = parseInt(c);
        c = /y=([\-\d]+)/gi.exec(a)[1];
        b.rect.y = parseInt(c);
        c = /width=([\-\d]+)/gi.exec(a)[1];
        b.rect.width = parseInt(c);
        c = /height=([\-\d]+)/gi.exec(a)[1];
        b.rect.height = parseInt(c);
        c = /xoffset=([\-\d]+)/gi.exec(a)[1];
        b.xOffset = parseInt(c);
        c = /yoffset=([\-\d]+)/gi.exec(a)[1];
        b.yOffset = parseInt(c);
        c = /xadvance=([\-\d]+)/gi.exec(a)[1];
        b.xAdvance = parseInt(c)
    },
    _parseInfoArguments: function(a) {
        a = /padding=(\d+)[,](\d+)[,](\d+)[,](\d+)/gi.exec(a);
        this.padding.left = a[1];
        this.padding.top = a[2];
        this.padding.right = a[3];
        this.padding.bottom = a[4];
        cc.log("cocos2d: padding: " + this.padding.left + "," + this.padding.top + "," + this.padding.right + "," + this.padding.bottom)
    },
    _parseCommonArguments: function(a) {
        this.commonHeight = parseInt(/lineHeight=(\d+)/gi.exec(a)[1]);
        cc.renderContextType === cc.WEBGL && (parseInt(/scaleW=(\d+)/gi.exec(a)[1]) > cc.Configuration.getInstance().getMaxTextureSize() && cc.log("cc.LabelBMFont._parseCommonArguments(): page can't be larger than supported"), parseInt(/scaleH=(\d+)/gi.exec(a)[1]) > cc.Configuration.getInstance().getMaxTextureSize() && cc.log("cc.LabelBMFont._parseCommonArguments(): page can't be larger than supported"));
        a = /pages=(\d+)/gi.exec(a)[1];
        1 !== parseInt(a) && cc.log("cc.LabelBMFont._parseCommonArguments(): only supports 1 page")
    },
    _parseImageFileName: function(a, b) {
        var c;
        c = /id=(\d+)/gi.exec(a)[1];
        0 !== parseInt(c) && cc.log("cc.LabelBMFont._parseImageFileName() : file could not be found");
        c = /file="([a-zA-Z0-9\-\._]+)/gi.exec(a)[1];
        this.atlasName = cc.FileUtils.getInstance().fullPathFromRelativeFile(c, b)
    },
    _parseKerningCapacity: function(a) {},
    _parseKerningEntry: function(a) {
        var b = /first=([\-\d]+)/gi.exec(a)[1],
            c = parseInt(b),
            b = /second=([\-\d]+)/gi.exec(a)[1],
            d = parseInt(b),
            b = /amount=([\-\d]+)/gi.exec(a)[1];
        a = parseInt(b);
        b = new cc.KerningHashElement;
        b.amount = a;
        b.key = c << 16 | d & 65535;
        this.kerningDictionary[b.key] = b
    },
    _purgeKerningDictionary: function() {
        this.kerningDictionary = null
    },
    _purgeFontDefDictionary: function() {
        this.fontDefDictionary = null
    }
});
cc.BMFontConfiguration.create = function(a) {
    var b = new cc.BMFontConfiguration;
    return b.initWithFNTfile(a) ? b : null
};
cc.LabelBMFont = cc.SpriteBatchNode.extend({
    RGBAProtocol: !0,
    _opacityModifyRGB: !1,
    _string: null,
    _configuration: null,
    _fntFile: null,
    _initialString: "",
    _alignment: null,
    _width: 0,
    _lineBreakWithoutSpaces: !1,
    _imageOffset: null,
    _reusedChar: null,
    _displayedOpacity: 255,
    _realOpacity: 255,
    _displayedColor: null,
    _realColor: null,
    _cascadeColorEnabled: !1,
    _cascadeOpacityEnabled: !1,
    _textureLoaded: !1,
    _loadedEventListeners: null,
    _setString: function(a, b) {
        b ? this._initialString = a : this._string = a;
        var c = this._children;
        if (c)
            for (var d =
                0; d < c.length; d++) {
                var e = c[d];
                e && e.setVisible(!1)
            }
        this._textureLoaded && (this.createFontChars(), b && this.updateLabel())
    },
    ctor: function() {
        cc.SpriteBatchNode.prototype.ctor.call(this);
        this._imageOffset = cc.PointZero();
        this._initialString = this._string = "";
        this._alignment = cc.TEXT_ALIGNMENT_CENTER;
        this._width = -1;
        this._configuration = null;
        this._lineBreakWithoutSpaces = !1;
        this._realOpacity = this._displayedOpacity = 255;
        this._displayedColor = cc.white();
        this._realColor = cc.white();
        this._cascadeOpacityEnabled = this._cascadeColorEnabled = !0;
        this._opacityModifyRGB = !1;
        this._fntFile = "";
        this._reusedChar = []
    },
    textureLoaded: function() {
        return this._textureLoaded
    },
    addLoadedEventListener: function(a, b) {
        this._loadedEventListeners || (this._loadedEventListeners = []);
        this._loadedEventListeners.push({
            eventCallback: a,
            eventTarget: b
        })
    },
    _callLoadedEventCallbacks: function() {
        if (this._loadedEventListeners) {
            for (var a = this._loadedEventListeners, b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                d.eventCallback.call(d.eventTarget, this)
            }
            a.length = 0
        }
    },
    draw: function(a) {
        cc.SpriteBatchNode.prototype.draw.call(this,
            a);
        if (cc.LABELBMFONT_DEBUG_DRAW) {
            a = this.getContentSize();
            var b = cc.p(0 | -this._anchorPointInPoints._x, 0 | -this._anchorPointInPoints._y);
            a = [cc.p(b.x, b.y), cc.p(b.x + a.width, b.y), cc.p(b.x + a.width, b.y + a.height), cc.p(b.x, b.y + a.height)];
            cc.drawingUtil.setDrawColor4B(0, 255, 0, 255);
            cc.drawingUtil.drawPoly(a, 4, !0)
        }
    },
    setColor: function(a) {
        if (this._realColor.r != a.r || this._realColor.g != a.g || this._realColor.b != a.b)
            if (this._displayedColor = {
                r: a.r,
                g: a.g,
                b: a.b
            }, this._realColor = {
                r: a.r,
                g: a.g,
                b: a.b
            }, this._textureLoaded && this._cascadeColorEnabled) {
                a =
                    cc.white();
                var b = this._parent;
                b && b.RGBAProtocol && b.isCascadeColorEnabled() && (a = b.getDisplayedColor());
                this.updateDisplayedColor(a)
            }
    },
    isOpacityModifyRGB: function() {
        return this._opacityModifyRGB
    },
    setOpacityModifyRGB: function(a) {
        this._opacityModifyRGB = a;
        if (a = this._children)
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                c && c.RGBAProtocol && c.setOpacityModifyRGB(this._opacityModifyRGB)
            }
    },
    getOpacity: function() {
        return this._realOpacity
    },
    getDisplayedOpacity: function() {
        return this._displayedOpacity
    },
    setOpacity: function(a) {
        this._displayedOpacity =
            this._realOpacity = a;
        if (this._cascadeOpacityEnabled) {
            a = 255;
            var b = this._parent;
            b && b.RGBAProtocol && b.isCascadeOpacityEnabled() && (a = b.getDisplayedOpacity());
            this.updateDisplayedOpacity(a)
        }
    },
    updateDisplayedOpacity: function(a) {
        this._displayedOpacity = this._realOpacity * a / 255;
        a = this._children;
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            cc.Browser.supportWebGL ? c.updateDisplayedOpacity(this._displayedOpacity) : (cc.NodeRGBA.prototype.updateDisplayedOpacity.call(c, this._displayedOpacity), c.setNodeDirty())
        }
        this._changeTextureColor()
    },
    isCascadeOpacityEnabled: function() {
        return !1
    },
    setCascadeOpacityEnabled: function(a) {
        this._cascadeOpacityEnabled = a
    },
    getColor: function() {
        return this._realColor
    },
    getDisplayedColor: function() {
        return this._displayedColor
    },
    updateDisplayedColor: function(a) {
        var b = this._displayedColor,
            c = this._realColor;
        b.r = c.r * a.r / 255;
        b.g = c.g * a.g / 255;
        b.b = c.b * a.b / 255;
        a = this._children;
        for (b = 0; b < a.length; b++) c = a[b], cc.Browser.supportWebGL ? c.updateDisplayedColor(this._displayedColor) : (cc.NodeRGBA.prototype.updateDisplayedColor.call(c,
            this._displayedColor), c.setNodeDirty());
        this._changeTextureColor()
    },
    _changeTextureColor: function() {
        if (!cc.Browser.supportWebGL) {
            var a, b = this.getTexture();
            b && 0 < b.getContentSize().width && (a = b.getHtmlElementObj()) && (b = cc.TextureCache.getInstance().getTextureColors(this._originalTexture.getHtmlElementObj())) && (a instanceof HTMLCanvasElement && !this._rectRotated ? cc.generateTintImage(a, b, this._displayedColor, null, a) : (a = cc.generateTintImage(a, b, this._displayedColor), b = new cc.Texture2D, b.initWithElement(a),
                b.handleLoadedTexture(), this.setTexture(b)))
        }
    },
    isCascadeColorEnabled: function() {
        return !1
    },
    setCascadeColorEnabled: function(a) {
        this._cascadeColorEnabled = a
    },
    init: function() {
        return this.initWithString(null, null, null, null, null)
    },
    initWithString: function(a, b, c, d, e) {
        a = a || "";
        this._configuration && cc.log("cc.LabelBMFont.initWithString(): re-init is no longer supported");
        if (b) {
            var f = cc.FNTConfigLoadFile(b);
            if (!f) return cc.log("cc.LabelBMFont.initWithString(): Impossible to create font. Please check file"), !1;
            this._configuration = f;
            this._fntFile = b;
            b = cc.TextureCache.getInstance().addImage(this._configuration.getAtlasName());
            (this._textureLoaded = f = b.isLoaded()) || b.addLoadedEventListener(function(a) {
                this._textureLoaded = !0;
                this.initWithTexture(a, this._initialString.length);
                this.setString(this._initialString, !0);
                this._callLoadedEventCallbacks()
            }, this)
        } else b = new cc.Texture2D, f = new Image, b.initWithElement(f), this._textureLoaded = !1;
        return this.initWithTexture(b, a.length) ? (this._alignment = d || cc.TEXT_ALIGNMENT_LEFT,
            this._imageOffset = e || cc.PointZero(), this._width = null == c ? -1 : c, this._displayedOpacity = this._realOpacity = 255, this._displayedColor = cc.white(), this._realColor = cc.white(), this._cascadeColorEnabled = this._cascadeOpacityEnabled = !0, this._contentSize._width = 0, this._contentSize._height = 0, this.setAnchorPoint(0.5, 0.5), cc.renderContextType === cc.WEBGL && (c = this._textureAtlas.getTexture(), this._opacityModifyRGB = c.hasPremultipliedAlpha(), this._reusedChar = new cc.Sprite, this._reusedChar.initWithTexture(c, cc.rect(0, 0,
                0, 0), !1), this._reusedChar.setBatchNode(this)), this.setString(a, !0), !0) : !1
    },
    createFontChars: function() {
        var a = cc.renderContextType,
            b = a === cc.CANVAS ? this.getTexture() : this._textureAtlas.getTexture(),
            c = 0,
            d = -1,
            e = 0,
            f = cc.SizeZero(),
            g = 0,
            e = 1,
            h = this._string ? this._string.length : 0;
        if (0 !== h) {
            var k, m = this._configuration.getCharacterSet();
            for (k = 0; k < h - 1; k++) 10 == this._string.charCodeAt(k) && e++;
            var n = this._configuration.commonHeight * e,
                p = -(this._configuration.commonHeight - this._configuration.commonHeight * e);
            for (k = 0; k <
                h; k++) {
                var q = this._string.charCodeAt(k);
                if (10 === q) c = 0, p -= this._configuration.commonHeight;
                else if (null === m[q]) cc.log("cc.LabelBMFont: Attempted to use character not defined in this bitmap: " + this._string[k]);
                else {
                    var e = this._kerningAmountForFirst(d, q),
                        r = this._configuration.fontDefDictionary[q];
                    if (r) {
                        var d = r.fontDef,
                            s = cc.rect(d.rect.x, d.rect.y, d.rect.width, d.rect.height),
                            s = cc.RECT_PIXELS_TO_POINTS(s);
                        s.x += this._imageOffset.x;
                        s.y += this._imageOffset.y;
                        (r = this.getChildByTag(k)) ? 32 === q && a === cc.CANVAS ?
                            r.setTextureRect(s, !1, cc.SizeZero()) : (r.setTextureRect(s, !1, s._size), r.setVisible(!0)) : (r = new cc.Sprite, 32 === q && a === cc.CANVAS ? r.initWithTexture(b, cc.RectZero(), !1) : r.initWithTexture(b, s, !1), r._newTextureWhenChangeColor = !0, this.addChild(r, 0, k));
                        r.setOpacityModifyRGB(this._opacityModifyRGB);
                        cc.Browser.supportWebGL ? (r.updateDisplayedColor(this._displayedColor), r.updateDisplayedOpacity(this._displayedOpacity)) : (cc.NodeRGBA.prototype.updateDisplayedColor.call(r, this._displayedColor), cc.NodeRGBA.prototype.updateDisplayedOpacity.call(r,
                            this._displayedOpacity), r.setNodeDirty());
                        s = cc.p(c + d.xOffset + 0.5 * d.rect.width + e, p + (this._configuration.commonHeight - d.yOffset) - 0.5 * s.height * cc.CONTENT_SCALE_FACTOR());
                        r.setPosition(cc.POINT_PIXELS_TO_POINTS(s));
                        c += d.xAdvance + e;
                        d = q;
                        g < c && (g = c)
                    } else 0 !== q && 10 !== q && cc.log("cocos2d: LabelBMFont: character not found " + this._string[k])
                }
            }
            f.width = g;
            f.height = n;
            this.setContentSize(cc.SIZE_PIXELS_TO_POINTS(f))
        }
    },
    updateString: function(a) {
        var b = this._children;
        if (b)
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d && d.setVisible(!1)
            }
        this._configuration &&
            this.createFontChars();
        a || this.updateLabel()
    },
    getString: function() {
        return this._initialString
    },
    setString: function(a, b) {
        a = String(a);
        null == b && (b = !0);
        if (null == a || "string" != typeof a) a += "";
        this._initialString = a;
        this._setString(a, b)
    },
    setCString: function(a) {
        this.setString(a, !0)
    },
    updateLabel: function() {
        this.setString(this._initialString, !1);
        if (0 < this._width) {
            var a = this._string.length,
                b = [],
                c = [],
                d = 1,
                e = 0,
                f = !1,
                g = !1,
                h = -1,
                k = -1,
                m = 0,
                n, p;
            for (n = 0; n < this._children.length; n++) {
                for (var q = 0; !(p = this.getChildByTag(n + m +
                    q));) q++;
                m += q;
                if (e >= a) break;
                var r = this._string[e];
                g || (k = this._getLetterPosXLeft(p), g = !0);
                f || (h = k, f = !0);
                if (10 == r.charCodeAt(0)) {
                    c.push("\n");
                    b = b.concat(c);
                    c.length = 0;
                    f = g = !1;
                    h = k = -1;
                    e += q;
                    d++;
                    if (e >= a) break;
                    k || (k = this._getLetterPosXLeft(p), g = !0);
                    h || (h = k, f = !0);
                    e++
                } else if (cc.isspace_unicode(r)) c.push(r), b = b.concat(c), c.length = 0, g = !1, k = -1, e++;
                else if (this._getLetterPosXRight(p) - h > this._width)
                    if (this._lineBreakWithoutSpaces) {
                        cc.utf8_trim_ws(c);
                        c.push("\n");
                        b = b.concat(c);
                        c.length = 0;
                        f = g = !1;
                        h = k = -1;
                        d++;
                        if (e >=
                            a) break;
                        k || (k = this._getLetterPosXLeft(p), g = !0);
                        h || (h = k, f = !0);
                        n--
                    } else c.push(r), -1 != b.lastIndexOf(" ") ? cc.utf8_trim_ws(b) : b = [], 0 < b.length && b.push("\n"), d++, f = !1, h = -1, e++;
                else c.push(r), e++
            }
            b = b.concat(c);
            n = b.length;
            p = "";
            for (e = 0; e < n; ++e) p += b[e];
            p += String.fromCharCode(0);
            this._setString(p, !1)
        }
        if (this._alignment != cc.TEXT_ALIGNMENT_LEFT)
            for (b = e = 0, a = this._string.length, c = [], d = 0; d < a; d++)
                if (10 == this._string[d].charCodeAt(0) || 0 == this._string[d].charCodeAt(0)) {
                    if (n = 0, f = c.length, p = e + f - 1 + b, !(0 > p) && (n = this.getChildByTag(p),
                        null != n)) {
                        n = n.getPositionX() + n.getContentSize().width / 2;
                        g = 0;
                        switch (this._alignment) {
                            case cc.TEXT_ALIGNMENT_CENTER:
                                g = this.getContentSize().width / 2 - n / 2;
                                break;
                            case cc.TEXT_ALIGNMENT_RIGHT:
                                g = this.getContentSize().width - n
                        }
                        if (0 != g)
                            for (n = 0; n < f; n++) p = e + n + b, 0 > p || (p = this.getChildByTag(p)) && p.setPosition(cc.pAdd(p.getPosition(), cc.p(g, 0)));
                        e += f;
                        b++;
                        c.length = 0
                    }
                } else c.push(this._string[e])
    },
    setAlignment: function(a) {
        this._alignment = a;
        this.updateLabel()
    },
    setWidth: function(a) {
        this._width = a;
        this.updateLabel()
    },
    setLineBreakWithoutSpace: function(a) {
        this._lineBreakWithoutSpaces =
            a;
        this.updateLabel()
    },
    setScale: function(a, b) {
        cc.Node.prototype.setScale.call(this, a, b);
        this.updateLabel()
    },
    setScaleX: function(a) {
        cc.Node.prototype.setScaleX.call(this, a);
        this.updateLabel()
    },
    setScaleY: function(a) {
        cc.Node.prototype.setScaleY.call(this, a);
        this.updateLabel()
    },
    setFntFile: function(a) {
        if (null != a && a != this._fntFile) {
            var b = cc.FNTConfigLoadFile(a);
            b ? (this._fntFile = a, this._configuration = b, a = cc.TextureCache.getInstance().addImage(this._configuration.getAtlasName()), this._textureLoaded = b = a.isLoaded(),
                this.setTexture(a), cc.renderContextType === cc.CANVAS && (this._originalTexture = this.getTexture()), b ? this.createFontChars() : a.addLoadedEventListener(function(a) {
                    this._textureLoaded = !0;
                    this.setTexture(a);
                    this.createFontChars();
                    this._changeTextureColor();
                    this.updateLabel();
                    this._callLoadedEventCallbacks()
                }, this)) : cc.log("cc.LabelBMFont.setFntFile() : Impossible to create font. Please check file")
        }
    },
    getFntFile: function() {
        return this._fntFile
    },
    setAnchorPoint: function(a, b) {
        var c = this._anchorPoint;
        if (2 === arguments.length) {
            if (a ===
                c._x && b === c._y) return;
            cc.Node.prototype.setAnchorPoint.call(this, a, b)
        } else {
            if (a.x === c._x && a.y === c._y) return;
            cc.Node.prototype.setAnchorPoint.call(this, a)
        }
        this.updateLabel()
    },
    _atlasNameFromFntFile: function(a) {},
    _kerningAmountForFirst: function(a, b) {
        var c = 0;
        if (this._configuration.kerningDictionary) {
            var d = this._configuration.kerningDictionary[(a << 16 | b & 65535).toString()];
            d && (c = d.amount)
        }
        return c
    },
    _getLetterPosXLeft: function(a) {
        return a.getPositionX() * this._scaleX + a.getContentSize().width * this._scaleX *
            a.getAnchorPoint().x
    },
    _getLetterPosXRight: function(a) {
        return a.getPositionX() * this._scaleX - a.getContentSize().width * this._scaleX * a.getAnchorPoint().x
    }
});
cc.LabelBMFont.create = function(a, b, c, d, e) {
    var f = new cc.LabelBMFont;
    return 0 == arguments.length ? f && f.init() ? f : null : f && f.initWithString(a, b, c, d, e) ? f : null
};
cc.LabelBMFont._configurations = null;
cc.FNTConfigLoadFile = function(a) {
    cc.LabelBMFont._configurations || (cc.LabelBMFont._configurations = {});
    var b = cc.LabelBMFont._configurations[a];
    b || (b = cc.BMFontConfiguration.create(a), cc.LabelBMFont._configurations[a] = b);
    return b
};
cc.LabelBMFont.purgeCachedData = function() {
    cc.FNTConfigRemoveCache()
};
cc.FNTConfigRemoveCache = function() {
    cc.LabelBMFont._configurations && (cc.LabelBMFont._configurations = null)
};
cc.isspace_unicode = function(a) {
    a = a.charCodeAt(0);
    return 9 <= a && 13 >= a || 32 == a || 133 == a || 160 == a || 5760 == a || 8192 <= a && 8202 >= a || 8232 == a || 8233 == a || 8239 == a || 8287 == a || 12288 == a
};
cc.utf8_trim_ws = function(a) {
    var b = a.length;
    if (!(0 >= b) && (b -= 1, cc.isspace_unicode(a[b]))) {
        for (var c = b - 1; 0 <= c; --c)
            if (cc.isspace_unicode(a[c])) b = c;
            else break;
        cc.utf8_trim_from(a, b)
    }
};
cc.utf8_trim_from = function(a, b) {
    var c = a.length;
    b >= c || 0 > b || a.splice(b, c)
};
cc.Touch = cc.Class.extend({
    _point: null,
    _prevPoint: cc.PointZero(),
    _id: 0,
    ctor: function(a, b, c) {
        this._point = cc.p(a || 0, b || 0);
        this._id = c || 0
    },
    getLocation: function() {
        return this._point
    },
    getPreviousLocation: function() {
        return this._prevPoint
    },
    getDelta: function() {
        return cc.pSub(this._point, this._prevPoint)
    },
    getID: function() {
        return this._id
    },
    getId: function() {
        return this._id
    },
    setTouchInfo: function(a, b, c) {
        this._prevPoint = this._point;
        this._point = cc.p(b || 0, c || 0);
        this._id = a
    },
    _setPrevPoint: function(a, b) {
        this._prevPoint =
            cc.p(a || 0, b || 0)
    }
});
cc.TouchDelegate = cc.Class.extend({
    _eventTypeFuncMap: null,
    onTouchBegan: function(a, b) {
        return !1
    },
    onTouchMoved: function(a, b) {},
    onTouchEnded: function(a, b) {},
    onTouchCancelled: function(a, b) {},
    onTouchesBegan: function(a, b) {},
    onTouchesMoved: function(a, b) {},
    onTouchesEnded: function(a, b) {},
    onTouchesCancelled: function(a, b) {},
    touchDelegateRetain: function() {},
    touchDelegateRelease: function() {}
});
cc.TargetedTouchDelegate = cc.TouchDelegate.extend({
    onTouchBegan: function(a, b) {
        return !1
    },
    onTouchMoved: function(a, b) {},
    onTouchEnded: function(a, b) {},
    onTouchCancelled: function(a, b) {}
});
cc.StandardTouchDelegate = cc.TouchDelegate.extend({
    onTouchesBegan: function(a, b) {},
    onTouchesMoved: function(a, b) {},
    onTouchesEnded: function(a, b) {},
    onTouchesCancelled: function(a, b) {}
});
cc.TouchHandler = cc.Class.extend({
    _delegate: null,
    _priority: 0,
    _enabledSelectors: 0,
    getDelegate: function() {
        return this._delegate
    },
    setDelegate: function(a) {
        this._delegate = a
    },
    getPriority: function() {
        return this._priority
    },
    setPriority: function(a) {
        this._priority = a
    },
    getEnabledSelectors: function() {
        return this._enabledSelectors
    },
    setEnalbedSelectors: function(a) {
        this._enabledSelectors = a
    },
    initWithDelegate: function(a, b) {
        if (!a) throw "cc.TouchHandler.initWithDelegate(): touch delegate should not be null";
        this._delegate =
            a;
        this._priority = b;
        this._enabledSelectors = 0;
        return !0
    }
});
cc.TouchHandler.create = function(a, b) {
    var c = new cc.TouchHandler;
    c && c.initWithDelegate(a, b);
    return c
};
cc.StandardTouchHandler = cc.TouchHandler.extend({
    initWithDelegate: function(a, b) {
        return cc.TouchHandler.prototype.initWithDelegate.call(this, a, b)
    }
});
cc.StandardTouchHandler.create = function(a, b) {
    var c = new cc.StandardTouchHandler;
    c && c.initWithDelegate(a, b);
    return c
};
cc.TargetedTouchHandler = cc.TouchHandler.extend({
    _swallowsTouches: !1,
    _claimedTouches: null,
    isSwallowsTouches: function() {
        return this._swallowsTouches
    },
    setSwallowsTouches: function(a) {
        this._swallowsTouches = a
    },
    getClaimedTouches: function() {
        return this._claimedTouches
    },
    initWithDelegate: function(a, b, c) {
        return cc.TouchHandler.prototype.initWithDelegate.call(this, a, b) ? (this._claimedTouches = [], this._swallowsTouches = c, !0) : !1
    }
});
cc.TargetedTouchHandler.create = function(a, b, c) {
    var d = new cc.TargetedTouchHandler;
    d && d.initWithDelegate(a, b, c);
    return d
};
cc.TouchSelectorBeganBit = 1;
cc.TouchSelectorMovedBit = 2;
cc.TouchSelectorEndedBit = 4;
cc.TouchSelectorCancelledBit = 8;
cc.TouchSelectorAllBits = cc.TouchSelectorBeganBit | cc.TouchSelectorMovedBit | cc.TouchSelectorEndedBit | cc.TouchSelectorCancelledBit;
cc.TOUCH_BEGAN = 0;
cc.TOUCH_MOVED = 1;
cc.TOUCH_ENDED = 2;
cc.TOUCH_CANCELLED = 3;
cc.TouchMax = 4;
cc.less = function(a, b) {
    return a.getPriority() > b.getPriority()
};
cc.TouchHandlerHelperData = function(a) {
    this.type = a
};
cc.TouchDispatcher = cc.Class.extend({
    _mousePressed: !1,
    _targetedHandlers: null,
    _standardHandlers: null,
    _locked: !1,
    _toAdd: !1,
    _toRemove: !1,
    _handlersToAdd: null,
    _handlersToRemove: null,
    _toQuit: !1,
    _dispatchEvents: !1,
    _handlerHelperData: [new cc.TouchHandlerHelperData(cc.TOUCH_BEGAN), new cc.TouchHandlerHelperData(cc.TOUCH_MOVED), new cc.TouchHandlerHelperData(cc.TOUCH_ENDED), new cc.TouchHandlerHelperData(cc.TOUCH_CANCELLED)],
    init: function() {
        this._dispatchEvents = !0;
        this._targetedHandlers = [];
        this._standardHandlers = [];
        this._handlersToAdd = [];
        this._handlersToRemove = [];
        this._mousePressed = this._locked = this._toQuit = this._toAdd = this._toRemove = !1;
        cc.TouchDispatcher.registerHtmlElementEvent(cc.canvas);
        return !0
    },
    _setMousePressed: function(a) {
        this._mousePressed = a
    },
    _getMousePressed: function() {
        return this._mousePressed
    },
    isDispatchEvents: function() {
        return this._dispatchEvents
    },
    setDispatchEvents: function(a) {
        this._dispatchEvents = a
    },
    _addStandardDelegate: function(a, b) {
        var c = cc.StandardTouchHandler.create(a, b || 0);
        this._locked ?
            -1 != this._handlersToRemove.indexOf(a) ? cc.ArrayRemoveObject(this._handlersToRemove, a) : (this._handlersToAdd.push(c), this._toAdd = !0) : this._standardHandlers = this.forceAddHandler(c, this._standardHandlers)
    },
    _addTargetedDelegate: function(a, b, c) {
        b = cc.TargetedTouchHandler.create(a, b, c);
        this._locked ? -1 != this._handlersToRemove.indexOf(a) ? cc.ArrayRemoveObject(this._handlersToRemove, a) : (this._handlersToAdd.push(b), this._toAdd = !0) : this._targetedHandlers = this.forceAddHandler(b, this._targetedHandlers)
    },
    forceAddHandler: function(a,
        b) {
        for (var c = 0, d, e = 0; e < b.length; e++)
            if (d = b[e])
                if (d.getPriority() < a.getPriority() && ++c, d.getDelegate() == a.getDelegate()) return cc.log("cc.TouchDispatcher.forceAddHandler(): The handler has been added."), b;
        return cc.ArrayAppendObjectToIndex(b, a, c)
    },
    forceRemoveAllDelegates: function() {
        this._standardHandlers.length = 0;
        this._targetedHandlers.length = 0
    },
    _removeDelegate: function(a) {
        if (null != a)
            if (this._locked) {
                var b = this.findHandler(this._handlersToAdd, a);
                b ? cc.ArrayRemoveObject(this._handlersToAdd, b) : (this._handlersToRemove.push(a),
                    this._toRemove = !0)
            } else this.forceRemoveDelegate(a)
    },
    removeAllDelegates: function() {
        this._locked ? this._toQuit = !0 : this.forceRemoveAllDelegates()
    },
    setPriority: function(a, b) {
        if (!b) throw "cc.TouchDispatcher.setPriority(): delegate should be non-null.";
        var c = this.findHandler(b);
        c ? c.getPriority() != a && (c.setPriority(a), this.rearrangeHandlers(this._targetedHandlers), this.rearrangeHandlers(this._standardHandlers)) : cc.log("cc.TouchDispatcher.setPriority(): Can't find TouchHandler.")
    },
    touches: function(a, b, c) {
        if (0 >
            c || 4 <= c) throw "cc.TouchDispatcher.touches(): invalid index";
        this._locked = !0;
        var d = this._targetedHandlers.length,
            e = this._standardHandlers.length,
            f = d && e,
            g = f ? a.slice() : a,
            h = this._handlerHelperData[c];
        if (0 < d)
            for (var k, m, n = 0; n < a.length; n++)
                for (var d = a[n], p = 0; p < this._targetedHandlers.length; p++) {
                    k = this._targetedHandlers[p];
                    if (!k) break;
                    m = !1;
                    if (c == cc.TOUCH_BEGAN) k.getDelegate().onTouchBegan && (m = k.getDelegate().onTouchBegan(d, b)) && k.getClaimedTouches().push(d);
                    else if (0 < k.getClaimedTouches().length) switch (m = !0, h.type) {
                        case cc.TOUCH_MOVED:
                            if (cc.Browser.isMobile) {
                                if (k.getDelegate().onTouchMoved) k.getDelegate().onTouchMoved(d, b)
                            } else if (this._mousePressed && k.getDelegate().onTouchMoved) k.getDelegate().onTouchMoved(d, b);
                            break;
                        case cc.TOUCH_ENDED:
                            if (k.getDelegate().onTouchEnded) k.getDelegate().onTouchEnded(d, b);
                            k.getClaimedTouches().length = 0;
                            break;
                        case cc.TOUCH_CANCELLED:
                            if (k.getDelegate().onTouchCancelled) k.getDelegate().onTouchCancelled(d, b);
                            k.getClaimedTouches().length = 0
                    }
                    if (m && k.isSwallowsTouches()) {
                        f &&
                            cc.ArrayRemoveObject(g, d);
                        break
                    }
                }
        if (0 < e)
            for (n = 0; n < this._standardHandlers.length; n++) {
                k = this._standardHandlers[n];
                if (!k) break;
                switch (h.type) {
                    case cc.TOUCH_BEGAN:
                        if (0 < g.length && k.getDelegate().onTouchesBegan) k.getDelegate().onTouchesBegan(g, b);
                        break;
                    case cc.TOUCH_MOVED:
                        if (0 < g.length)
                            if (cc.Browser.isMobile) {
                                if (k.getDelegate().onTouchesMoved) k.getDelegate().onTouchesMoved(g, b)
                            } else if (this._mousePressed && k.getDelegate().onTouchesMoved) k.getDelegate().onTouchesMoved(g, b);
                        break;
                    case cc.TOUCH_ENDED:
                        if (k.getDelegate().onTouchesEnded) k.getDelegate().onTouchesEnded(g,
                            b);
                        break;
                    case cc.TOUCH_CANCELLED:
                        if (k.getDelegate().onTouchesCancelled) k.getDelegate().onTouchesCancelled(g, b)
                }
            }
        this._locked = !1;
        if (this._toRemove) {
            this._toRemove = !1;
            for (n = 0; n < this._handlersToRemove.length; n++) this.forceRemoveDelegate(this._handlersToRemove[n]);
            this._handlersToRemove.length = 0
        }
        if (this._toAdd) {
            this._toAdd = !1;
            for (n = 0; n < this._handlersToAdd.length; n++) {
                k = this._handlersToAdd[n];
                if (!k) break;
                k instanceof cc.TargetedTouchHandler ? this._targetedHandlers = this.forceAddHandler(k, this._targetedHandlers) :
                    this._standardHandlers = this.forceAddHandler(k, this._standardHandlers)
            }
            this._handlersToAdd.length = 0
        }
        this._toQuit && (this._toQuit = !1, this.forceRemoveAllDelegates())
    },
    touchesBegan: function(a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_BEGAN)
    },
    touchesMoved: function(a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_MOVED)
    },
    touchesEnded: function(a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_ENDED)
    },
    touchesCancelled: function(a, b) {
        this._dispatchEvents && this.touches(a, b, cc.TOUCH_CANCELLED)
    },
    findHandler: function(a, b) {
        switch (arguments.length) {
            case 1:
                b = arguments[0];
                if (!b) throw "cc.TouchDispatcher.findHandler(): delegate should be non-null.";
                for (var c = 0; c < this._targetedHandlers.length; c++)
                    if (this._targetedHandlers[c].getDelegate() == b) return this._targetedHandlers[c];
                for (c = 0; c < this._standardHandlers.length; c++)
                    if (this._standardHandlers[c].getDelegate() == b) return this._standardHandlers[c];
                return null;
            case 2:
                if (!a) throw "cc.TouchDispatcher.findHandler(): array should be non-null.";
                if (!b) throw "cc.TouchDispatcher.findHandler(): delegate should be non-null.";
                for (c = 0; c < a.length; c++)
                    if (a[c].getDelegate() == b) return a[c];
                return null;
            default:
                throw "Argument must be non-nil ";
        }
    },
    forceRemoveDelegate: function(a) {
        for (var b, c = 0; c < this._standardHandlers.length; c++)
            if ((b = this._standardHandlers[c]) && b.getDelegate() == a) {
                cc.ArrayRemoveObject(this._standardHandlers, b);
                break
            }
        for (c = 0; c < this._targetedHandlers.length; c++)
            if ((b = this._targetedHandlers[c]) && b.getDelegate() == a) {
                cc.ArrayRemoveObject(this._targetedHandlers, b);
                break
            }
    },
    rearrangeHandlers: function(a) {
        a.sort(cc.less)
    }
});
cc.TouchDispatcher.preTouchPoint = cc.p(0, 0);
cc.TouchDispatcher.isRegisterEvent = !1;
cc.getHTMLElementPosition = function(a) {
    var b = document.documentElement,
        c = window,
        d = null,
        d = "function" === typeof a.getBoundingClientRect ? a.getBoundingClientRect() : a instanceof HTMLCanvasElement ? {
            left: 0,
            top: 0,
            width: a.width,
            height: a.height
        } : {
            left: 0,
            top: 0,
            width: parseInt(a.style.width),
            height: parseInt(a.style.height)
        };
    return {
        left: d.left + c.pageXOffset - b.clientLeft,
        top: d.top + c.pageYOffset - b.clientTop,
        width: d.width,
        height: d.height
    }
};
cc.ProcessMouseupEvent = function(a, b) {
    var c = cc.getHTMLElementPosition(a),
        d, e;
    null != b.pageX ? (d = b.pageX, e = b.pageY) : (c.left -= document.body.scrollLeft, c.top -= document.body.scrollTop, d = b.clientX, e = b.clientY);
    d = cc.EGLView.getInstance().convertToLocationInView(d, e, c);
    c = new cc.Touch(d.x, d.y);
    c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
    cc.TouchDispatcher.preTouchPoint.x = d.x;
    cc.TouchDispatcher.preTouchPoint.y = d.y;
    d = [];
    d.push(c);
    cc.EGLView.getInstance().touchesEnded(d,
        null)
};
cc.TouchDispatcher.registerHtmlElementEvent = function(a) {
    if (!cc.TouchDispatcher.isRegisterEvent) {
        if (cc.Browser.isMobile)
            if (window.navigator.msPointerEnabled) {
                var b = {
                        MSPointerDown: "touchesBegan",
                        MSPointerMove: "touchesMoved",
                        MSPointerUp: "touchesEnded",
                        MSPointerCancel: "touchesCancelled"
                    },
                    c;
                for (c in b)(function(b, c) {
                    a.addEventListener(b, function(b) {
                        var d = cc.getHTMLElementPosition(a);
                        d.left -= document.body.scrollLeft;
                        d.top -= document.body.scrollTop;
                        var h, k;
                        h = b.clientX;
                        k = b.clientY;
                        h = cc.EGLView.getInstance().convertToLocationInView(h, k,
                            d);
                        d = new cc.Touch(h.x, h.y);
                        d._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
                        cc.TouchDispatcher.preTouchPoint.x = h.x;
                        cc.TouchDispatcher.preTouchPoint.y = h.y;
                        cc.Director.getInstance().getTouchDispatcher()[c]([d], null);
                        b.stopPropagation();
                        b.preventDefault()
                    }, !1)
                })(c, b[c])
            } else a.addEventListener("touchstart", function(b) {
                if (b.changedTouches) {
                    var c = [],
                        f = cc.getHTMLElementPosition(a);
                    f.left -= document.body.scrollLeft;
                    f.top -= document.body.scrollTop;
                    for (var g, h, k, m = b.changedTouches.length,
                        n = 0; n < m; n++)
                        if (g = b.changedTouches[n]) h = g.clientX, k = g.clientY, h = cc.EGLView.getInstance().convertToLocationInView(h, k, f), g.identifier ? (g = new cc.Touch(h.x, h.y, g.identifier), k = cc.TouchDispatcher._getPreTouch(g).getLocation(), g._setPrevPoint(k.x, k.y), cc.TouchDispatcher._setPreTouch(g)) : (g = new cc.Touch(h.x, h.y), g._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y)), cc.TouchDispatcher.preTouchPoint.x = h.x, cc.TouchDispatcher.preTouchPoint.y = h.y, c.push(g);
                    cc.EGLView.getInstance().touchesBegan(c,
                        null);
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, !1), a.addEventListener("touchmove", function(b) {
                if (b.changedTouches) {
                    var c = [],
                        f = cc.getHTMLElementPosition(a);
                    f.left -= document.body.scrollLeft;
                    f.top -= document.body.scrollTop;
                    for (var g, h, k, m = b.changedTouches.length, n = 0; n < m; n++)
                        if (g = b.changedTouches[n]) h = g.clientX, k = g.clientY, h = cc.EGLView.getInstance().convertToLocationInView(h, k, f), g.identifier ? (g = new cc.Touch(h.x, h.y, g.identifier), k = cc.TouchDispatcher._getPreTouch(g).getLocation(), g._setPrevPoint(k.x, k.y),
                            cc.TouchDispatcher._setPreTouch(g)) : (g = new cc.Touch(h.x, h.y), g._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y)), cc.TouchDispatcher.preTouchPoint.x = h.x, cc.TouchDispatcher.preTouchPoint.y = h.y, c.push(g);
                    cc.EGLView.getInstance().touchesMoved(c, null);
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, !1), a.addEventListener("touchend", function(b) {
                if (b.changedTouches) {
                    var c = [],
                        f = cc.getHTMLElementPosition(a);
                    f.left -= document.body.scrollLeft;
                    f.top -= document.body.scrollTop;
                    for (var g,
                        h, k, m = b.changedTouches.length, n = 0; n < m; n++)
                        if (g = b.changedTouches[n]) h = g.clientX, k = g.clientY, h = cc.EGLView.getInstance().convertToLocationInView(h, k, f), g.identifier ? (g = new cc.Touch(h.x, h.y, g.identifier), k = cc.TouchDispatcher._getPreTouch(g).getLocation(), g._setPrevPoint(k.x, k.y), cc.TouchDispatcher._deletePreTouchWithSameId(g)) : (g = new cc.Touch(h.x, h.y), g._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y)), cc.TouchDispatcher.preTouchPoint.x = h.x, cc.TouchDispatcher.preTouchPoint.y =
                            h.y, c.push(g);
                    cc.EGLView.getInstance().touchesEnded(c, null);
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, !1), a.addEventListener("touchcancel", function(b) {
                if (b.changedTouches) {
                    var c = [],
                        f = cc.getHTMLElementPosition(a);
                    f.left -= document.body.scrollLeft;
                    f.top -= document.body.scrollTop;
                    for (var g, h, k, m = b.changedTouches.length, n = 0; n < m; n++)
                        if (g = b.changedTouches[n]) h = g.clientX, k = g.clientY, h = cc.EGLView.getInstance().convertToLocationInView(h, k, f), g.identifier ? (g = new cc.Touch(h.x, h.y, g.identifier), k = cc.TouchDispatcher._getPreTouch(g).getLocation(),
                            g._setPrevPoint(k.x, k.y), cc.TouchDispatcher._deletePreTouchWithSameId(g)) : (g = new cc.Touch(h.x, h.y), g._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y)), cc.TouchDispatcher.preTouchPoint.x = h.x, cc.TouchDispatcher.preTouchPoint.y = h.y, c.push(g);
                    cc.EGLView.getInstance().touchesCancelled(c, null);
                    b.stopPropagation();
                    b.preventDefault()
                }
            }, !1);
        else window.addEventListener("mousedown", function(a) {
            cc.Director.getInstance().getTouchDispatcher()._setMousePressed(!0)
        }), window.addEventListener("mouseup",
            function(b) {
                cc.Director.getInstance().getTouchDispatcher()._setMousePressed(!1);
                var c = cc.getHTMLElementPosition(a),
                    f;
                null != b.pageX ? (f = b.pageX, b = b.pageY) : (c.left -= document.body.scrollLeft, c.top -= document.body.scrollTop, f = b.clientX, b = b.clientY);
                cc.rectContainsPoint(new cc.Rect(c.left, c.top, c.width, c.height), cc.p(f, b)) || (f = cc.EGLView.getInstance().convertToLocationInView(f, b, c), c = new cc.Touch(f.x, f.y), c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y), cc.TouchDispatcher.preTouchPoint.x =
                    f.x, cc.TouchDispatcher.preTouchPoint.y = f.y, f = [], f.push(c), cc.EGLView.getInstance().touchesEnded(f, null))
            }), a.addEventListener("mousedown", function(b) {
            var c = cc.getHTMLElementPosition(a),
                f;
            null != b.pageX ? (f = b.pageX, b = b.pageY) : (c.left -= document.body.scrollLeft, c.top -= document.body.scrollTop, f = b.clientX, b = b.clientY);
            f = cc.EGLView.getInstance().convertToLocationInView(f, b, c);
            c = new cc.Touch(f.x, f.y);
            c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x, cc.TouchDispatcher.preTouchPoint.y);
            cc.TouchDispatcher.preTouchPoint.x =
                f.x;
            cc.TouchDispatcher.preTouchPoint.y = f.y;
            f = [];
            f.push(c);
            cc.EGLView.getInstance().touchesBegan(f, null)
        }), a.addEventListener("mouseup", function(b) {
            cc.ProcessMouseupEvent(a, b)
        }), a.addEventListener("mousemove", function(b) {
            var c = cc.getHTMLElementPosition(a),
                f;
            null != b.pageX ? (f = b.pageX, b = b.pageY) : (c.left -= document.body.scrollLeft, c.top -= document.body.scrollTop, f = b.clientX, b = b.clientY);
            f = cc.EGLView.getInstance().convertToLocationInView(f, b, c);
            c = new cc.Touch(f.x, f.y);
            c._setPrevPoint(cc.TouchDispatcher.preTouchPoint.x,
                cc.TouchDispatcher.preTouchPoint.y);
            cc.TouchDispatcher.preTouchPoint.x = f.x;
            cc.TouchDispatcher.preTouchPoint.y = f.y;
            f = [];
            f.push(c);
            cc.EGLView.getInstance().touchesMoved(f, null)
        });
        cc.TouchDispatcher.isRegisterEvent = !0
    }
};
cc.TouchDispatcher._getPreTouch = function(a) {
    for (var b = null, c = cc.TouchDispatcher._preTouchPool, d = a.getId(), e = c.length - 1; 0 <= e; e--)
        if (c[e].getId() == d) {
            b = c[e];
            break
        }
    b || (b = a);
    return b
};
cc.TouchDispatcher._setPreTouch = function(a) {
    for (var b = !1, c = cc.TouchDispatcher._preTouchPool, d = a.getId(), e = c.length - 1; 0 <= e; e--)
        if (c[e].getId() == d) {
            c[e] = a;
            b = !0;
            break
        }
    b || (50 >= c.length ? c.push(a) : (c[cc.TouchDispatcher._preTouchPoolPointer] = a, cc.TouchDispatcher._preTouchPoolPointer = (cc.TouchDispatcher._preTouchPoolPointer + 1) % 50))
};
cc.TouchDispatcher._deletePreTouchWithSameId = function(a) {
    var b, c = cc.TouchDispatcher._preTouchPool;
    b = a.getId();
    for (a = c.length - 1; 0 <= a; a--)
        if (c[a].getId() == b) {
            b = c.pop();
            a != c.length && (c[a] = b);
            break
        }
};
cc.TouchDispatcher._preTouchPool = [];
cc.TouchDispatcher._preTouchPoolPointer = 0;
cc.registerTargetedDelegate = function(a, b, c) {
    cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(c, a, b)
};
cc.registerStandardDelegate = function(a, b) {
    cc.Director.getInstance().getTouchDispatcher()._addStandardDelegate(a, b)
};
cc.unregisterTouchDelegate = function(a) {
    cc.Director.getInstance().getTouchDispatcher()._removeDelegate(a)
};
cc.MOUSE_DOWN = 1;
cc.MOUSE_MOVED = 2;
cc.MOUSE_DRAGGED = 4;
cc.MOUSE_UP = 8;
cc.RIGHT_MOUSE_DOWN = 16;
cc.RIGHT_MOUSE_DRAGGED = 32;
cc.RIGHT_MOUSE_UP = 64;
cc.OTHER_MOUSE_DOWN = 128;
cc.OTHER_MOUSE_DRAGGED = 256;
cc.OTHER_MOUSE_UP = 512;
cc.SCROLL_WHEEL = 1024;
cc.MOUSE_ENTERED = 2048;
cc.MOUSE_EXITED = 4096;
cc.MOUSE_LEFTBUTTON = 0;
cc.MOUSE_MIDDLEBUTTON = 1;
cc.MOUSE_RIGHTBUTTON = 2;
cc.MouseEventDelegate = cc.Class.extend({
    onMouseDown: function(a) {
        return !1
    },
    onMouseDragged: function(a) {
        return !1
    },
    onMouseMoved: function(a) {
        return !1
    },
    onMouseUp: function(a) {
        return !1
    },
    onRightMouseDown: function(a) {
        return !1
    },
    onRightMouseDragged: function(a) {
        return !1
    },
    onRightMouseUp: function(a) {
        return !1
    },
    onOtherMouseDown: function(a) {
        return !1
    },
    onOtherMouseDragged: function(a) {
        return !1
    },
    onOtherMouseUp: function(a) {
        return !1
    },
    onScrollWheel: function(a) {
        return !1
    },
    onMouseEntered: function(a) {
        return !1
    },
    onMouseExited: function(a) {
        return !1
    }
});
cc.Mouse = cc.Touch.extend({
    _wheelDelta: 0,
    _button: cc.MOUSE_LEFTBUTTON,
    getWheelDelta: function() {
        return this._wheelDelta
    },
    setWheelDelta: function(a) {
        this._wheelDelta = a
    },
    getButton: function() {
        return this._button
    },
    setButton: function(a) {
        this._button = a
    }
});
cc.MouseHandler = cc.Class.extend({
    _delegate: null,
    _priority: 0,
    _enabledSelectors: 0,
    getDelegate: function() {
        return this._delegate
    },
    setDelegate: function(a) {
        this._delegate = a
    },
    getPriority: function() {
        return this._priority
    },
    setPriority: function(a) {
        this._priority = a
    },
    getEnabledSelectors: function() {
        return this._enabledSelectors
    },
    setEnalbedSelectors: function(a) {
        this._enabledSelectors = a
    },
    initWithDelegate: function(a, b) {
        this._delegate = a;
        this._priority = b
    }
});
cc.MouseHandler.create = function(a, b) {
    var c = new cc.MouseHandler;
    c.initWithDelegate(a, b);
    return c
};
cc.MouseDispatcher = cc.Class.extend({
    _mousePressed: !1,
    _rightMousePressed: !1,
    _mouseDelegateHandlers: null,
    _dispatchEvents: !1,
    init: function() {
        this._dispatchEvents = !0;
        this._mouseDelegateHandlers = [];
        this._rightMousePressed = this._mousePressed = !1;
        cc.MouseDispatcher._registerHtmlElementEvent(cc.canvas);
        return !0
    },
    _setMousePressed: function(a) {
        this._mousePressed = a
    },
    _getMousePressed: function() {
        return this._mousePressed
    },
    _setRightMousePressed: function(a) {
        this._rightMousePressed = a
    },
    _getRightMousePressed: function() {
        return this._rightMousePressed
    },
    addMouseDelegate: function(a, b) {
        var c = cc.MouseHandler.create(a, b);
        this._mouseDelegateHandlers = this.forceAddHandler(c, this._mouseDelegateHandlers)
    },
    forceAddHandler: function(a, b) {
        for (var c = 0, d = 0; d < b.length; d++) {
            var e = b[d];
            if (e && (e.getPriority() < a.getPriority() && ++c, e.getDelegate() == a.getDelegate())) return cc.log("cc.MouseDispatcher.forceAddHandler(): handler has been added."), b
        }
        return cc.ArrayAppendObjectToIndex(b, a, c)
    },
    removeMouseDelegate: function(a) {
        if (null != a)
            for (var b = 0; b < this._mouseDelegateHandlers.length; b++) {
                var c =
                    this._mouseDelegateHandlers[b];
                if (c && c.getDelegate() == a) {
                    cc.ArrayRemoveObject(this._mouseDelegateHandlers, c);
                    break
                }
            }
    },
    _findHandler: function(a) {
        for (var b = 0; b < this._mouseDelegateHandlers.length; b++)
            if (this._mouseDelegateHandlers[b] && this._mouseDelegateHandlers[b].getDelegate() == a) return this._mouseDelegateHandlers[b];
        return null
    },
    setPriority: function(a, b) {
        if (!b) throw "cc.MouseDispatcher.setPriority(): delegate should be non-null";
        var c = this._findHandler(b);
        c ? c.getPriority() != a && (c.setPriority(a), this._mouseDelegateHandlers.sort(cc.less)) :
            cc.log("cc.MouseDispatcher.setPriority(): Can't find MouseHandler in array")
    },
    removeAllMouseDelegates: function() {
        this._mouseDelegateHandlers.length = 0
    },
    mouseHandle: function(a, b, c) {
        for (b = 0; b < this._mouseDelegateHandlers.length; b++) {
            var d = this._mouseDelegateHandlers[b];
            switch (c) {
                case cc.MOUSE_DOWN:
                    if (a.getButton() == cc.MOUSE_RIGHTBUTTON) {
                        if (d.getDelegate().onRightMouseDown) d.getDelegate().onRightMouseDown(a)
                    } else if (d.getDelegate().onMouseDown) d.getDelegate().onMouseDown(a);
                    break;
                case cc.MOUSE_UP:
                    if (a.getButton() ==
                        cc.MOUSE_RIGHTBUTTON) {
                        if (d.getDelegate().onRightMouseUp) d.getDelegate().onRightMouseUp(a)
                    } else if (d.getDelegate().onMouseUp) d.getDelegate().onMouseUp(a);
                    break;
                case cc.MOUSE_MOVED:
                    if (this._mousePressed) {
                        if (d.getDelegate().onMouseDragged) d.getDelegate().onMouseDragged(a)
                    } else if (this._rightMousePressed) {
                        if (d.getDelegate().onRightMouseDragged) d.getDelegate().onRightMouseDragged(a)
                    } else if (d.getDelegate().onMouseMoved) d.getDelegate().onMouseMoved(a);
                    break;
                case cc.MOUSE_ENTERED:
                    if (d.getDelegate().onMouseEntered) d.getDelegate().onMouseEntered(a);
                    break;
                case cc.MOUSE_EXITED:
                    if (d.getDelegate().onMouseExited) d.getDelegate().onMouseExited(a);
                    break;
                case cc.SCROLL_WHEEL:
                    if (d.getDelegate().onScrollWheel) d.getDelegate().onScrollWheel(a)
            }
        }
    }
});
cc.MouseDispatcher._preMousePoint = cc.p(0, 0);
cc.MouseDispatcher._isRegisterEvent = !1;
cc.MouseDispatcher._registerHtmlElementEvent = function(a) {
    function b(b) {
        var d = cc.getHTMLElementPosition(a),
            e = b.pageX,
            f = b.pageY,
            g = cc.EGLView.getInstance(),
            h = g.getDevicePixelRatio(),
            e = (e - d.left) * h / g.getScaleX(),
            d = (d.height - (f - d.top)) * h / g.getScaleY(),
            f = new cc.Mouse(e, d);
        f._setPrevPoint(cc.MouseDispatcher._preMousePoint.x, cc.MouseDispatcher._preMousePoint.y);
        f.setButton(b.button);
        cc.MouseDispatcher._preMousePoint.x = e;
        cc.MouseDispatcher._preMousePoint.y = d;
        return f
    }
    cc.MouseDispatcher._isRegisterEvent || (window.addEventListener("mousedown",
        function(a) {
            a.button == cc.MOUSE_RIGHTBUTTON ? cc.Director.getInstance().getMouseDispatcher()._setRightMousePressed(!0) : cc.Director.getInstance().getMouseDispatcher()._setMousePressed(!0)
        }), window.addEventListener("mouseup", function(a) {
        a.button == cc.MOUSE_RIGHTBUTTON ? cc.Director.getInstance().getMouseDispatcher()._setRightMousePressed(!1) : cc.Director.getInstance().getMouseDispatcher()._setMousePressed(!1)
    }), a.addEventListener("mousedown", function(a) {
        cc.Director.getInstance().getMouseDispatcher().mouseHandle(b(a),
            a, cc.MOUSE_DOWN)
    }), a.addEventListener("mouseup", function(a) {
        cc.Director.getInstance().getMouseDispatcher().mouseHandle(b(a), a, cc.MOUSE_UP)
    }), a.addEventListener("mousemove", function(a) {
        cc.Director.getInstance().getMouseDispatcher().mouseHandle(b(a), a, cc.MOUSE_MOVED)
    }), a.addEventListener("mousewheel", function(a) {
        var d = b(a);
        d.setWheelDelta(a.wheelDelta);
        cc.Director.getInstance().getMouseDispatcher().mouseHandle(d, a, cc.SCROLL_WHEEL)
    }, !1), a.addEventListener("DOMMouseScroll", function(a) {
        var d = b(a);
        d.setWheelDelta(-120 *
            a.detail);
        cc.Director.getInstance().getMouseDispatcher().mouseHandle(d, a, cc.SCROLL_WHEEL)
    }), a.addEventListener("mouseout", function(a) {
        cc.Director.getInstance().getMouseDispatcher().mouseHandle(b(a), a, cc.MOUSE_EXITED)
    }, !1), a.addEventListener("mouseover", function(a) {
        cc.Director.getInstance().getMouseDispatcher().mouseHandle(b(a), a, cc.MOUSE_ENTERED)
    }, !1))
};
cc.KeyboardDelegate = cc.Class.extend({
    onKeyDown: function(a) {},
    onKeyUp: function(a) {}
});
cc.KeyboardHandler = cc.Class.extend({
    getDelegate: function() {
        return this._delegate
    },
    setDelegate: function(a) {
        this._delegate = a
    },
    initWithDelegate: function(a) {
        if (!a) throw "cc.KeyboardHandler.initWithDelegate(): delegate must be non-null";
        this._delegate = a;
        return !0
    },
    _delegate: null
});
cc.KeyboardHandler.create = function(a) {
    var b = new cc.KeyboardHandler;
    b.initWithDelegate(a);
    return b
};
cc.TYPE_BACK_CLICKED = 1;
cc.TYPE_MENU_CLICKED = 2;
cc.KeyboardDispatcher = cc.Class.extend({
    addDelegate: function(a) {
        a && (this._locked ? (this._handlersToAdd.push(a), this._toAdd = !0) : this.forceAddDelegate(a))
    },
    removeDelegate: function(a) {
        a && (this._locked ? (this._handlersToRemove.push(a), this._toRemove = !0) : this.forceRemoveDelegate(a))
    },
    forceAddDelegate: function(a) {
        if (a = cc.KeyboardHandler.create(a)) {
            for (var b = this._delegates, c = 0, d = b.length; c < d; c++)
                if (b[c].getDelegate() == a.getDelegate()) {
                    cc.log("cc.KeyboardDispatcher.forceAddDelegate(): the delegate has been added.");
                    return
                }
            this._delegates.push(a)
        }
    },
    forceRemoveDelegate: function(a) {
        for (var b = this._delegates, c = 0, d = b.length; c < d; c++)
            if (b[c].getDelegate() == a) {
                b.splice(c, 1);
                break
            }
    },
    dispatchKeyboardMSG: function(a, b) {
        this._locked = !0;
        a.stopPropagation();
        a.preventDefault();
        var c = 0;
        if (b && a)
            for (c = 0; c < this._delegates.length; c++) {
                if (this._delegates[c].getDelegate() && this._delegates[c].getDelegate().onKeyDown) this._delegates[c].getDelegate().onKeyDown(a.keyCode)
            } else if (!b && a)
                for (c = 0; c < this._delegates.length; c++)
                    if (this._delegates[c].getDelegate() && this._delegates[c].getDelegate().onKeyUp) this._delegates[c].getDelegate().onKeyUp(a.keyCode);
        this._locked = !1;
        if (this._toRemove) {
            this._toRemove = !1;
            for (var d = this._handlersToRemove, c = 0; c < d.length; ++c) this.forceRemoveDelegate(d[c]);
            d.length = 0
        }
        if (this._toAdd) {
            this._toAdd = !1;
            d = this._handlersToAdd;
            for (c = 0; c < d.length; ++c) this.forceAddDelegate(d[c]);
            d.length = 0
        }
        return !0
    },
    _delegates: [],
    _locked: !1,
    _toAdd: !1,
    _toRemove: !1,
    _handlersToAdd: [],
    _handlersToRemove: []
});
cc.KeyboardDispatcher.getInstance = function() {
    cc.keyboardDispatcher || (cc.keyboardDispatcher = new cc.KeyboardDispatcher, cc.canvas.setAttribute("tabindex", 1), cc.canvas.style.outline = "none", cc.canvas.style.cursor = "default", cc.canvas.addEventListener("keydown", function(a) {
        cc.keyboardDispatcher.dispatchKeyboardMSG(a, !0)
    }), cc.canvas.addEventListener("keyup", function(a) {
        cc.keyboardDispatcher.dispatchKeyboardMSG(a, !1)
    }));
    return cc.keyboardDispatcher
};
cc.KeyboardDispatcher.purgeSharedDispatcher = function() {
    cc.keyboardDispatcher && (delete cc.keyboardDispatcher, cc.keyboardDispatcher = null)
};
cc.ITEM_SIZE = 32;
cc._globalFontSize = cc.ITEM_SIZE;
cc._globalFontName = "Arial";
cc._globalFontNameRelease = !1;
cc.CURRENT_ITEM = 3233828865;
cc.ZOOM_ACTION_TAG = 3233828866;
cc.NORMAL_TAG = 8801;
cc.SELECTED_TAG = 8802;
cc.DISABLE_TAG = 8803;
cc.MenuItem = cc.NodeRGBA.extend({
    _target: null,
    _callback: null,
    _isSelected: !1,
    _isEnabled: !1,
    ctor: function() {
        cc.NodeRGBA.prototype.ctor.call(this);
        this._callback = this._target = null;
        this._isEnabled = this._isSelected = !1
    },
    isSelected: function() {
        return this._isSelected
    },
    setOpacityModifyRGB: function(a) {},
    isOpacityModifyRGB: function() {
        return !1
    },
    setTarget: function(a, b) {
        this._target = b;
        this._callback = a
    },
    isEnabled: function() {
        return this._isEnabled
    },
    setEnabled: function(a) {
        this._isEnabled = a
    },
    initWithCallback: function(a,
        b) {
        this.setAnchorPoint(0.5, 0.5);
        this._target = b;
        this._callback = a;
        this._isEnabled = !0;
        this._isSelected = !1;
        return !0
    },
    rect: function() {
        var a = this._position,
            b = this._contentSize,
            c = this._anchorPoint;
        return cc.rect(a._x - b._width * c._x, a._y - b._height * c._y, b._width, b._height)
    },
    selected: function() {
        this._isSelected = !0
    },
    unselected: function() {
        this._isSelected = !1
    },
    setCallback: function(a, b) {
        this._target = b;
        this._callback = a
    },
    activate: function() {
        if (this._isEnabled) {
            var a = this._target,
                b = this._callback;
            if (b)
                if (a && "string" ==
                    typeof b) a[b](this);
                else a && "function" == typeof b ? b.call(a, this) : b(this)
        }
    }
});
cc.MenuItem.create = function(a, b) {
    var c = new cc.MenuItem;
    c.initWithCallback(a, b);
    return c
};
cc.MenuItemLabel = cc.MenuItem.extend({
    _disabledColor: null,
    _label: null,
    _orginalScale: 0,
    _colorBackup: null,
    ctor: function() {
        cc.MenuItem.prototype.ctor.call(this);
        this._label = this._disabledColor = null;
        this._orginalScale = 0;
        this._colorBackup = null
    },
    getDisabledColor: function() {
        return this._disabledColor
    },
    setDisabledColor: function(a) {
        this._disabledColor = a
    },
    getLabel: function() {
        return this._label
    },
    setLabel: function(a) {
        a && (this.addChild(a), a.setAnchorPoint(0, 0), this.setContentSize(a.getContentSize()));
        this._label &&
            this.removeChild(this._label, !0);
        this._label = a
    },
    setEnabled: function(a) {
        if (this._isEnabled != a) {
            var b = this._label;
            a ? b.setColor(this._colorBackup) : (this._colorBackup = b.getColor(), b.setColor(this._disabledColor))
        }
        cc.MenuItem.prototype.setEnabled.call(this, a)
    },
    setOpacity: function(a) {
        this._label.setOpacity(a)
    },
    getOpacity: function() {
        return this._label.getOpacity()
    },
    setColor: function(a) {
        this._label.setColor(a)
    },
    getColor: function() {
        return this._label.getColor()
    },
    initWithLabel: function(a, b, c) {
        this.initWithCallback(b,
            c);
        this._originalScale = 1;
        this._colorBackup = cc.white();
        this._disabledColor = cc.c3b(126, 126, 126);
        this.setLabel(a);
        this.setCascadeColorEnabled(!0);
        this.setCascadeOpacityEnabled(!0);
        return !0
    },
    setString: function(a) {
        this._label.setString(a);
        this.setContentSize(this._label.getContentSize())
    },
    activate: function() {
        this._isEnabled && (this.stopAllActions(), this.setScale(this._originalScale), cc.MenuItem.prototype.activate.call(this))
    },
    selected: function() {
        if (this._isEnabled) {
            cc.MenuItem.prototype.selected.call(this);
            var a = this.getActionByTag(cc.ZOOM_ACTION_TAG);
            a ? this.stopAction(a) : this._originalScale = this.getScale();
            a = cc.ScaleTo.create(0.1, 1.2 * this._originalScale);
            a.setTag(cc.ZOOM_ACTION_TAG);
            this.runAction(a)
        }
    },
    unselected: function() {
        if (this._isEnabled) {
            cc.MenuItem.prototype.unselected.call(this);
            this.stopActionByTag(cc.ZOOM_ACTION_TAG);
            var a = cc.ScaleTo.create(0.1, this._originalScale);
            a.setTag(cc.ZOOM_ACTION_TAG);
            this.runAction(a)
        }
    }
});
cc.MenuItemLabel.create = function(a, b, c) {
    var d = new cc.MenuItemLabel;
    d.initWithLabel(a, b, c);
    return d
};
cc.MenuItemAtlasFont = cc.MenuItemLabel.extend({
    initWithString: function(a, b, c, d, e, f, g) {
        if (!a || 0 == a.length) throw "cc.MenuItemAtlasFont.initWithString(): value should be non-null and its length should be greater than 0";
        var h = new cc.LabelAtlas;
        h.initWithString(a, b, c, d, e);
        this.initWithLabel(h, f, g);
        return !0
    }
});
cc.MenuItemAtlasFont.create = function(a, b, c, d, e, f, g) {
    var h = new cc.MenuItemAtlasFont;
    h.initWithString(a, b, c, d, e, f, g);
    return h
};
cc.MenuItemFont = cc.MenuItemLabel.extend({
    _fontSize: null,
    _fontName: null,
    ctor: function() {
        cc.MenuItemLabel.prototype.ctor.call(this);
        this._fontSize = 0;
        this._fontName = ""
    },
    initWithString: function(a, b, c) {
        if (!a || 0 == a.length) throw "Value should be non-null and its length should be greater than 0";
        this._fontName = cc._globalFontName;
        this._fontSize = cc._globalFontSize;
        a = cc.LabelTTF.create(a, this._fontName, this._fontSize);
        this.initWithLabel(a, b, c);
        return !0
    },
    setFontSize: function(a) {
        this._fontSize = a;
        this._recreateLabel()
    },
    fontSize: function() {
        return this._fontSize
    },
    setFontName: function(a) {
        this._fontName = a;
        this._recreateLabel()
    },
    fontName: function() {
        return this._fontName
    },
    _recreateLabel: function() {
        var a = cc.LabelTTF.create(this._label.getString(), this._fontName, this._fontSize);
        this.setLabel(a)
    }
});
cc.MenuItemFont.setFontSize = function(a) {
    cc._globalFontSize = a
};
cc.MenuItemFont.fontSize = function() {
    return cc._globalFontSize
};
cc.MenuItemFont.setFontName = function(a) {
    cc._globalFontNameRelease && (cc._globalFontName = "");
    cc._globalFontName = a;
    cc._globalFontNameRelease = !0
};
cc.MenuItemFont.fontName = function() {
    return cc._globalFontName
};
cc.MenuItemFont.create = function(a, b, c) {
    var d = new cc.MenuItemFont;
    d.initWithString(a, b, c);
    return d
};
cc.MenuItemSprite = cc.MenuItem.extend({
    _normalImage: null,
    _selectedImage: null,
    _disabledImage: null,
    ctor: function() {
        cc.MenuItem.prototype.ctor.call(this);
        this._disabledImage = this._selectedImage = this._normalImage = null
    },
    getNormalImage: function() {
        return this._normalImage
    },
    setNormalImage: function(a) {
        this._normalImage != a && (a && (this.addChild(a, 0, cc.NORMAL_TAG), a.setAnchorPoint(0, 0)), this._normalImage && this.removeChild(this._normalImage, !0), this._normalImage = a, this.setContentSize(this._normalImage.getContentSize()),
            this._updateImagesVisibility(), a.textureLoaded && !a.textureLoaded() && a.addLoadedEventListener(function(a) {
                this.setContentSize(a.getContentSize())
            }, this))
    },
    getSelectedImage: function() {
        return this._selectedImage
    },
    setSelectedImage: function(a) {
        this._selectedImage != a && (a && (this.addChild(a, 0, cc.SELECTED_TAG), a.setAnchorPoint(0, 0)), this._selectedImage && this.removeChild(this._selectedImage, !0), this._selectedImage = a, this._updateImagesVisibility())
    },
    getDisabledImage: function() {
        return this._disabledImage
    },
    setDisabledImage: function(a) {
        this._disabledImage !=
            a && (a && (this.addChild(a, 0, cc.DISABLE_TAG), a.setAnchorPoint(0, 0)), this._disabledImage && this.removeChild(this._disabledImage, !0), this._disabledImage = a, this._updateImagesVisibility())
    },
    initWithNormalSprite: function(a, b, c, d, e) {
        this.initWithCallback(d, e);
        this.setNormalImage(a);
        this.setSelectedImage(b);
        this.setDisabledImage(c);
        if (a = this._normalImage) this.setContentSize(a.getContentSize()), a.textureLoaded && !a.textureLoaded() && a.addLoadedEventListener(function(a) {
            this.setContentSize(a.getContentSize());
            this.setCascadeColorEnabled(!0);
            this.setCascadeOpacityEnabled(!0)
        }, this);
        this.setCascadeColorEnabled(!0);
        this.setCascadeOpacityEnabled(!0);
        return !0
    },
    setColor: function(a) {
        this._normalImage.setColor(a);
        this._selectedImage && this._selectedImage.setColor(a);
        this._disabledImage && this._disabledImage.setColor(a)
    },
    getColor: function() {
        return this._normalImage.getColor()
    },
    setOpacity: function(a) {
        this._normalImage.setOpacity(a);
        this._selectedImage && this._selectedImage.setOpacity(a);
        this._disabledImage && this._disabledImage.setOpacity(a)
    },
    getOpacity: function() {
        return this._normalImage.getOpacity()
    },
    selected: function() {
        cc.MenuItem.prototype.selected.call(this);
        this._normalImage && (this._disabledImage && this._disabledImage.setVisible(!1), this._selectedImage ? (this._normalImage.setVisible(!1), this._selectedImage.setVisible(!0)) : this._normalImage.setVisible(!0))
    },
    unselected: function() {
        cc.MenuItem.prototype.unselected.call(this);
        this._normalImage && (this._normalImage.setVisible(!0), this._selectedImage && this._selectedImage.setVisible(!1), this._disabledImage && this._disabledImage.setVisible(!1))
    },
    setEnabled: function(a) {
        this._isEnabled !=
            a && (cc.MenuItem.prototype.setEnabled.call(this, a), this._updateImagesVisibility())
    },
    _updateImagesVisibility: function() {
        var a = this._normalImage,
            b = this._selectedImage,
            c = this._disabledImage;
        this._isEnabled ? (a && a.setVisible(!0), b && b.setVisible(!1), c && c.setVisible(!1)) : c ? (a && a.setVisible(!1), b && b.setVisible(!1), c && c.setVisible(!0)) : (a && a.setVisible(!0), b && b.setVisible(!1))
    }
});
cc.MenuItemSprite.create = function(a, b, c, d, e) {
    var f = arguments.length;
    a = arguments[0];
    b = arguments[1];
    var g, h, k, m = new cc.MenuItemSprite;
    5 == f ? (g = arguments[2], k = arguments[3], h = arguments[4]) : 4 == f && "function" === typeof arguments[3] ? (g = arguments[2], k = arguments[3]) : 4 == f && "function" === typeof arguments[2] ? (h = arguments[3], k = arguments[2]) : 2 >= f && (g = arguments[2]);
    m.initWithNormalSprite(a, b, g, k, h);
    return m
};
cc.MenuItemImage = cc.MenuItemSprite.extend({
    setNormalSpriteFrame: function(a) {
        this.setNormalImage(cc.Sprite.createWithSpriteFrame(a))
    },
    setSelectedSpriteFrame: function(a) {
        this.setSelectedImage(cc.Sprite.createWithSpriteFrame(a))
    },
    setDisabledSpriteFrame: function(a) {
        this.setDisabledImage(cc.Sprite.createWithSpriteFrame(a))
    },
    initWithNormalImage: function(a, b, c, d, e) {
        var f = null,
            g = null,
            h = null;
        a && (f = cc.Sprite.create(a));
        b && (g = cc.Sprite.create(b));
        c && (h = cc.Sprite.create(c));
        return this.initWithNormalSprite(f,
            g, h, d, e)
    }
});
cc.MenuItemImage.create = function(a, b, c, d, e) {
    if (0 == arguments.length) return cc.MenuItemImage.create(null, null, null, null, null);
    if (3 == arguments.length) return cc.MenuItemImage.create(a, b, null, c, null);
    if (4 == arguments.length) return cc.MenuItemImage.create(a, b, null, c, d);
    var f = new cc.MenuItemImage;
    return f.initWithNormalImage(a, b, c, d, e) ? f : null
};
cc.MenuItemToggle = cc.MenuItem.extend({
    _selectedIndex: 0,
    _subItems: null,
    _opacity: null,
    _color: null,
    ctor: function() {
        cc.MenuItem.prototype.ctor.call(this);
        this._selectedIndex = 0;
        this._subItems = [];
        this._opacity = 0;
        this._color = cc.white()
    },
    getOpacity: function() {
        return this._opacity
    },
    setOpacity: function(a) {
        this._opacity = a;
        if (this._subItems && 0 < this._subItems.length)
            for (var b = 0; b < this._subItems.length; b++) this._subItems[b].setOpacity(a)
    },
    getColor: function() {
        return this._color
    },
    setColor: function(a) {
        this._color =
            a;
        if (this._subItems && 0 < this._subItems.length)
            for (var b = 0; b < this._subItems.length; b++) this._subItems[b].setColor(a)
    },
    getSelectedIndex: function() {
        return this._selectedIndex
    },
    setSelectedIndex: function(a) {
        if (a != this._selectedIndex) {
            this._selectedIndex = a;
            (a = this.getChildByTag(cc.CURRENT_ITEM)) && a.removeFromParent(!1);
            a = this._subItems[this._selectedIndex];
            this.addChild(a, 0, cc.CURRENT_ITEM);
            var b = a.getContentSize();
            this.setContentSize(b);
            a.setPosition(b.width / 2, b.height / 2)
        }
    },
    getSubItems: function() {
        return this._subItems
    },
    setSubItems: function(a) {
        this._subItems = a
    },
    initWithItems: function(a) {
        var b = a.length;
        "function" === typeof a[a.length - 2] ? (this.initWithCallback(a[a.length - 2], a[a.length - 1]), b -= 2) : "function" === typeof a[a.length - 1] ? (this.initWithCallback(a[a.length - 1], null), b -= 1) : this.initWithCallback(null, null);
        for (var c = this._subItems, d = c.length = 0; d < b; d++) a[d] && c.push(a[d]);
        this._selectedIndex = cc.UINT_MAX;
        this.setSelectedIndex(0);
        this.setCascadeColorEnabled(!0);
        this.setCascadeOpacityEnabled(!0);
        return !0
    },
    addSubItem: function(a) {
        this._subItems.push(a)
    },
    activate: function() {
        this._isEnabled && this.setSelectedIndex((this._selectedIndex + 1) % this._subItems.length);
        cc.MenuItem.prototype.activate.call(this)
    },
    selected: function() {
        cc.MenuItem.prototype.selected.call(this);
        this._subItems[this._selectedIndex].selected()
    },
    unselected: function() {
        cc.MenuItem.prototype.unselected.call(this);
        this._subItems[this._selectedIndex].unselected()
    },
    setEnabled: function(a) {
        if (this._isEnabled != a) {
            cc.MenuItem.prototype.setEnabled.call(this, a);
            var b = this._subItems;
            if (b && 0 < b.length)
                for (var c =
                    0; c < b.length; c++) b[c].setEnabled(a)
        }
    },
    selectedItem: function() {
        return this._subItems[this._selectedIndex]
    },
    onEnter: function() {
        cc.Node.prototype.onEnter.call(this);
        this.setSelectedIndex(this._selectedIndex)
    }
});
cc.MenuItemToggle.create = function() {
    0 < arguments.length && null == arguments[arguments.length - 1] && cc.log("parameters should not be ending with null in Javascript");
    var a = new cc.MenuItemToggle;
    a.initWithItems(arguments);
    return a
};
cc.MENU_STATE_WAITING = 0;
cc.MENU_STATE_TRACKING_TOUCH = 1;
cc.MENU_HANDLER_PRIORITY = -128;
cc.DEFAULT_PADDING = 5;
cc.Menu = cc.LayerRGBA.extend({
    _color: null,
    _enabled: !1,
    _opacity: 0,
    _selectedItem: null,
    _state: -1,
    ctor: function() {
        cc.LayerRGBA.prototype.ctor.call(this);
        this._color = cc.white();
        this._enabled = !1;
        this._opacity = 255;
        this._selectedItem = null;
        this._state = -1
    },
    getColor: function() {
        return this._color
    },
    setColor: function(a) {
        this._color = a;
        var b = this._children;
        if (b && 0 < b.length)
            for (var c = 0; c < b.length; c++) b[c].setColor(a)
    },
    getOpacity: function() {
        return this._opacity
    },
    setOpacity: function(a) {
        this._opacity = a;
        var b = this._children;
        if (b && 0 < b.length)
            for (var c = 0; c < b.length; c++) b[c].setOpacity(a)
    },
    isEnabled: function() {
        return this._enabled
    },
    setEnabled: function(a) {
        this._enabled = a
    },
    initWithItems: function(a) {
        var b = [];
        if (a)
            for (var c = 0; c < a.length; c++) a[c] && b.push(a[c]);
        return this.initWithArray(b)
    },
    initWithArray: function(a) {
        if (this.init()) {
            this.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
            this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
            this.setTouchEnabled(!0);
            this._enabled = !0;
            var b = cc.Director.getInstance().getWinSize();
            this.ignoreAnchorPointForPosition(!0);
            this.setAnchorPoint(0.5, 0.5);
            this.setContentSize(b);
            this.setPosition(b.width / 2, b.height / 2);
            if (a)
                for (b = 0; b < a.length; b++) this.addChild(a[b], b);
            this._selectedItem = null;
            this._state = cc.MENU_STATE_WAITING;
            this.setCascadeColorEnabled(!0);
            this.setCascadeOpacityEnabled(!0);
            return !0
        }
        return !1
    },
    addChild: function(a, b, c) {
        if (!(a instanceof cc.MenuItem)) throw "cc.Menu.addChild() : Menu only supports MenuItem objects as children";
        cc.Layer.prototype.addChild.call(this, a, b, c)
    },
    alignItemsVertically: function() {
        this.alignItemsVerticallyWithPadding(cc.DEFAULT_PADDING)
    },
    alignItemsVerticallyWithPadding: function(a) {
        var b = -a,
            c = this._children,
            d, e, f, g;
        if (c && 0 < c.length) {
            e = 0;
            for (d = c.length; e < d; e++) b += c[e].getContentSize().height * c[e].getScaleY() + a;
            var h = b / 2;
            e = 0;
            for (d = c.length; e < d; e++) g = c[e], f = g.getContentSize().height, b = g.getScaleY(), g.setPosition(0, h - f * b / 2), h -= f * b + a
        }
    },
    alignItemsHorizontally: function() {
        this.alignItemsHorizontallyWithPadding(cc.DEFAULT_PADDING)
    },
    alignItemsHorizontallyWithPadding: function(a) {
        var b = -a,
            c = this._children,
            d, e, f, g;
        if (c && 0 < c.length) {
            d = 0;
            for (e = c.length; d <
                e; d++) b += c[d].getContentSize().width * c[d].getScaleX() + a;
            var h = -b / 2;
            d = 0;
            for (e = c.length; d < e; d++) g = c[d], b = g.getScaleX(), f = c[d].getContentSize().width, g.setPosition(h + f * b / 2, 0), h += f * b + a
        }
    },
    alignItemsInColumns: function() {
        0 < arguments.length && null == arguments[arguments.length - 1] && cc.log("parameters should not be ending with null in Javascript");
        for (var a = [], b = 0; b < arguments.length; b++) a.push(arguments[b]);
        var c = -5,
            d = 0,
            e = 0,
            f = 0,
            g, h, k, m = this._children;
        if (m && 0 < m.length)
            for (b = 0, k = m.length; b < k; b++) d >= a.length || !(g =
                a[d]) || (h = m[b].getContentSize().height, e = e >= h || isNaN(h) ? e : h, ++f, f >= g && (c += e + 5, e = f = 0, ++d));
        var n = cc.Director.getInstance().getWinSize(),
            p = g = e = d = 0,
            q = 0,
            c = c / 2;
        if (m && 0 < m.length)
            for (b = 0, k = m.length; b < k; b++) {
                var r = m[b];
                0 == g && (g = a[d], q = p = n.width / (1 + g));
                h = r.getContentSize().height;
                e = e >= h || isNaN(h) ? e : h;
                r.setPosition(q - n.width / 2, c - h / 2);
                q += p;
                ++f;
                f >= g && (c -= e + 5, e = g = f = 0, ++d)
            }
    },
    alignItemsInRows: function() {
        0 < arguments.length && null == arguments[arguments.length - 1] && cc.log("parameters should not be ending with null in Javascript");
        var a = [],
            b;
        for (b = 0; b < arguments.length; b++) a.push(arguments[b]);
        var c = [],
            d = [],
            e = -10,
            f = -5,
            g = 0,
            h = 0,
            k = 0,
            m, n, p, q, r, s = this._children;
        if (s && 0 < s.length)
            for (b = 0, p = s.length; b < p; b++)(n = s[b], g >= a.length || !(m = a[g])) || (r = n.getContentSize(), q = r.width, h = h >= q || isNaN(q) ? h : q, f += r.height + 5, ++k, k >= m && (c.push(h), d.push(f), e += h + 10, h = k = 0, f = -5, ++g));
        f = cc.Director.getInstance().getWinSize();
        m = h = g = 0;
        var e = -e / 2,
            t = 0;
        if (s && 0 < s.length)
            for (b = 0, p = s.length; b < p; b++) n = s[b], 0 == m && (m = a[g], t = d[g]), r = n.getContentSize(), q = r.width, h = h >= q ||
                isNaN(q) ? h : q, n.setPosition(e + c[g] / 2, t - f.height / 2), t -= r.height + 10, ++k, k >= m && (e += h + 5, h = m = k = 0, ++g)
    },
    registerWithTouchDispatcher: function() {
        cc.registerTargetedDelegate(this.getTouchPriority(), !0, this)
    },
    removeChild: function(a, b) {
        null != a && (a instanceof cc.MenuItem ? (this._selectedItem == a && (this._selectedItem = null), cc.Node.prototype.removeChild.call(this, a, b)) : cc.log("cc.Menu.removeChild():Menu only supports MenuItem objects as children"))
    },
    onTouchBegan: function(a, b) {
        if (this._state != cc.MENU_STATE_WAITING ||
            !this._visible || !this._enabled) return !1;
        for (var c = this._parent; null != c; c = c.getParent())
            if (!c.isVisible()) return !1;
        return (this._selectedItem = this._itemForTouch(a)) ? (this._state = cc.MENU_STATE_TRACKING_TOUCH, this._selectedItem.selected(), !0) : !1
    },
    onTouchEnded: function(a, b) {
        this._state !== cc.MENU_STATE_TRACKING_TOUCH ? cc.log("cc.Menu.onTouchEnded(): invalid state") : (this._selectedItem && (this._selectedItem.unselected(), this._selectedItem.activate()), this._state = cc.MENU_STATE_WAITING)
    },
    onTouchCancelled: function(a,
        b) {
        this._state !== cc.MENU_STATE_TRACKING_TOUCH ? cc.log("cc.Menu.onTouchCancelled(): invalid state") : (this._selectedItem && this._selectedItem.unselected(), this._state = cc.MENU_STATE_WAITING)
    },
    onTouchMoved: function(a, b) {
        if (this._state !== cc.MENU_STATE_TRACKING_TOUCH) cc.log("cc.Menu.onTouchMoved(): invalid state");
        else {
            var c = this._itemForTouch(a);
            c != this._selectedItem && (this._selectedItem && this._selectedItem.unselected(), (this._selectedItem = c) && this._selectedItem.selected())
        }
    },
    onExit: function() {
        this._state ==
            cc.MENU_STATE_TRACKING_TOUCH && (this._selectedItem && (this._selectedItem.unselected(), this._selectedItem = null), this._state = cc.MENU_STATE_WAITING);
        cc.Layer.prototype.onExit.call(this)
    },
    setOpacityModifyRGB: function(a) {},
    isOpacityModifyRGB: function() {
        return !1
    },
    _itemForTouch: function(a) {
        a = a.getLocation();
        var b = this._children,
            c;
        if (b && 0 < b.length)
            for (var d = 0; d < b.length; d++)
                if (c = b[d], c.isVisible() && c.isEnabled()) {
                    var e = c.convertToNodeSpace(a),
                        f = c.rect();
                    f.x = 0;
                    f.y = 0;
                    if (cc.rectContainsPoint(f, e)) return c
                }
        return null
    },
    setHandlerPriority: function(a) {
        cc.Director.getInstance().getTouchDispatcher().setPriority(a, this)
    }
});
cc.Menu.create = function(a) {
    0 < arguments.length && null == arguments[arguments.length - 1] && cc.log("parameters should not be ending with null in Javascript");
    var b = new cc.Menu;
    if (0 == arguments.length) b.initWithItems(null, null);
    else if (1 == arguments.length && arguments[0] instanceof Array) return b.initWithArray(arguments[0]), b;
    b.initWithItems(arguments);
    return b
};
cc = cc || {};
cc.AudioEngine = cc.Class.extend({
    _audioID: 0,
    _audioIDList: null,
    _supportedFormat: null,
    _soundSupported: !1,
    _effectsVolume: 1,
    _playingMusic: null,
    _resPath: "",
    _pausedPlayings: null,
    ctor: function() {
        this._audioIDList = {};
        this._supportedFormat = [];
        this._pausedPlayings = []
    },
    setResPath: function(a) {
        a && 0 != a.length && (this._resPath = "/" == a.substring(a.length - 1) ? a : a + "/")
    },
    _checkCanPlay: function(a) {
        var b = document.createElement("audio");
        if (b.canPlayType) {
            var c = function(a) {
                a = b.canPlayType(a);
                return "no" != a && "" != a
            };
            a.mp3 = c("audio/mpeg");
            a.mp4 = c("audio/mp4");
            a.m4a = c("audio/x-m4a") || c("audio/aac");
            a.ogg = c('audio/ogg; codecs\x3d"vorbis"');
            a.wav = c('audio/wav; codecs\x3d"1"')
        } else {
            var c = ["mp3", "mp4", "m4a", "ogg", "wav"],
                d;
            for (d in c) a[c[d]] = !1
        }
    },
    _getPathWithoutExt: function(a) {
        if ("string" != typeof a) return null;
        var b = a.lastIndexOf(".");
        return -1 !== b ? a.substring(0, b) : a
    },
    _getExtFromFullPath: function(a) {
        var b = a.lastIndexOf(".");
        return -1 !== b ? a.substring(b + 1, a.length) : -1
    },
    willPlayMusic: function() {
        return !1
    },
    preloadMusic: function(a) {
        this.preloadSound(a)
    },
    preloadEffect: function(a) {
        this.preloadSound(a)
    },
    isFormatSupported: function(a) {
        for (var b = this._supportedFormat, c = 0, d = b.length; c < d; c++)
            if (b[c] == a) return !0;
        return !1
    },
    getEffectsVolume: function() {
        return this._effectsVolume
    }
});
cc.SimpleSFX = function(a, b) {
    this.audio = a;
    this.ext = b || ".ogg"
};
cc.SimpleAudioEngine = cc.AudioEngine.extend({
    _effectList: null,
    _soundList: null,
    _maxAudioInstance: 5,
    _canPlay: !0,
    _musicListenerBound: null,
    _musicIsStopped: !1,
    ctor: function() {
        cc.AudioEngine.prototype.ctor.call(this);
        this._effectList = {};
        this._soundList = {};
        this._musicListenerBound = this._musicListener.bind(this);
        var a = navigator.userAgent;
        if (/Mobile/.test(a) && (/iPhone OS/.test(a) || /iPad/.test(a) || /Firefox/.test(a)) || /MSIE/.test(a)) this._canPlay = !1
    },
    init: function() {
        var a = {};
        this._checkCanPlay(a);
        var b = ["ogg",
                "mp3", "wav", "mp4", "m4a"
            ],
            c = this._supportedFormat,
            d;
        for (d in b) {
            var e = b[d];
            a[e] && c.push(e)
        }
        return this._soundSupported = 0 < c.length
    },
    preloadSound: function(a) {
        if (this._soundSupported) {
            var b = this._resPath + a,
                c = this._getExtFromFullPath(a);
            a = this._getPathWithoutExt(a);
            if (!this._soundList[a] && this.isFormatSupported(c) && this._canPlay) {
                var d = new cc.SimpleSFX;
                d.ext = c;
                d.audio = new Audio(b);
                d.audio.preload = "auto";
                var e = function() {
                        cc.Loader.getInstance().onResLoaded();
                        this.removeEventListener("canplaythrough", e, !1);
                        this.removeEventListener("error", f, !1)
                    },
                    f = function(a) {
                        cc.Loader.getInstance().onResLoadingErr(a.srcElement.src);
                        this.removeEventListener("canplaythrough", e, !1);
                        this.removeEventListener("error", f, !1)
                    };
                d.audio.addEventListener("canplaythrough", e, !1);
                d.audio.addEventListener("error", f, !1);
                this._soundList[a] = d;
                d.audio.load();
                return
            }
        }
        cc.Loader.getInstance().onResLoaded()
    },
    playMusic: function(a, b) {
        if (this._soundSupported) {
            var c = this._getPathWithoutExt(a),
                d = this._getExtFromFullPath(a),
                e = this._soundList;
            e[this._playingMusic] && e[this._playingMusic].audio.pause();
            this._playingMusic = c;
            if (e[this._playingMusic]) d = e[this._playingMusic].audio;
            else {
                var f = new cc.SimpleSFX;
                f.ext = d;
                d = f.audio = new Audio(a);
                f.audio.preload = "auto";
                e[c] = f;
                f.audio.load()
            }
            d.addEventListener("pause", this._musicListenerBound, !1);
            d.loop = b || !1;
            d.play();
            cc.AudioEngine.isMusicPlaying = !0;
            this._musicIsStopped = !1
        }
    },
    _musicListener: function(a) {
        cc.AudioEngine.isMusicPlaying = !1;
        this._soundList[this._playingMusic] && this._soundList[this._playingMusic].audio.removeEventListener("pause",
            this._musicListener, !1)
    },
    stopMusic: function(a) {
        var b = this._soundList,
            c = this._playingMusic;
        if (b[c]) {
            var d = b[c].audio;
            d.pause();
            d.duration && (d.currentTime = d.duration);
            a && delete b[c];
            cc.AudioEngine.isMusicPlaying = !1;
            this._musicIsStopped = !0
        }
    },
    pauseMusic: function() {
        !this._musicIsStopped && this._soundList[this._playingMusic] && (this._soundList[this._playingMusic].audio.pause(), cc.AudioEngine.isMusicPlaying = !1)
    },
    resumeMusic: function() {
        if (!this._musicIsStopped && this._soundList[this._playingMusic]) {
            var a = this._soundList[this._playingMusic].audio;
            a.play();
            a.addEventListener("pause", this._musicListenerBound, !1);
            cc.AudioEngine.isMusicPlaying = !0
        }
    },
    rewindMusic: function() {
        if (this._soundList[this._playingMusic]) {
            var a = this._soundList[this._playingMusic].audio;
            a.currentTime = 0;
            a.play();
            a.addEventListener("pause", this._musicListenerBound, !1);
            cc.AudioEngine.isMusicPlaying = !0;
            this._musicIsStopped = !1
        }
    },
    getMusicVolume: function() {
        return this._soundList[this._playingMusic] ? this._soundList[this._playingMusic].audio.volume : 0
    },
    setMusicVolume: function(a) {
        this._soundList[this._playingMusic] &&
            (this._soundList[this._playingMusic].audio.volume = 1 < a ? 1 : 0 > a ? 0 : a)
    },
    isMusicPlaying: function() {
        return cc.AudioEngine.isMusicPlaying
    },
    playEffect: function(a, b) {
        if (!this._soundSupported) return null;
        var c = this._getPathWithoutExt(a),
            d;
        d = this._soundList[c] ? this._soundList[c].ext : this._getExtFromFullPath(a);
        var e = this._getEffectList(c),
            f;
        if (0 < e.length)
            for (var g = 0; g < e.length; g++)
                if (e[g].ended) {
                    f = e[g];
                    f.currentTime = 0;
                    window.chrome && f.load();
                    break
                }
        if (!f) {
            if (e.length >= this._maxAudioInstance) return cc.log("Error: " +
                a + " greater than " + this._maxAudioInstance), null;
            f = new Audio(c + "." + d);
            f.volume = this._effectsVolume;
            e.push(f)
        }
        b && (f.loop = b);
        f.play();
        c = this._audioID++;
        this._audioIDList[c] = f;
        return c
    },
    setEffectsVolume: function(a) {
        this._effectsVolume = 1 < a ? 1 : 0 > a ? 0 : a;
        var b, c = this._effectList,
            d;
        for (d in c)
            if (a = c[d], 0 < a.length)
                for (var e = 0; e < a.length; e++) b = a[e], b.volume = this._effectsVolume
    },
    pauseEffect: function(a) {
        null != a && this._audioIDList[a] && (a = this._audioIDList[a], a.ended || a.pause())
    },
    pauseAllEffects: function() {
        var a,
            b, c = this._effectList,
            d;
        for (d in c) {
            a = c[d];
            for (var e = 0; e < a.length; e++) b = a[e], b.ended || b.pause()
        }
    },
    resumeEffect: function(a) {
        null != a && this._audioIDList[a] && (a = this._audioIDList[a], a.ended || a.play())
    },
    resumeAllEffects: function() {
        var a, b, c = this._effectList,
            d;
        for (d in c)
            if (a = c[d], 0 < a.length)
                for (var e = 0; e < a.length; e++) b = a[e], b.ended || b.play()
    },
    stopEffect: function(a) {
        null != a && this._audioIDList[a] && (a = this._audioIDList[a], a.ended || (a.loop = !1, a.duration && (a.currentTime = a.duration)))
    },
    stopAllEffects: function() {
        var a,
            b, c = this._effectList,
            d;
        for (d in c) {
            a = c[d];
            for (var e = 0; e < a.length; e++) b = a[e], b.ended || (b.loop = !1, b.duration && (b.currentTime = b.duration))
        }
    },
    unloadEffect: function(a) {
        if (a) {
            a = this._getPathWithoutExt(a);
            this._effectList[a] && delete this._effectList[a];
            var b, c = this._audioIDList,
                d;
            for (d in c) b = c[d], b = this._getPathWithoutExt(b.src), -1 < b.indexOf(a) && (this.stopEffect(d), delete c[d])
        }
    },
    _getEffectList: function(a) {
        var b = this._effectList;
        b[a] || (b[a] = []);
        return b[a]
    },
    _pausePlaying: function() {
        var a = this._pausedPlayings,
            b = this._soundList,
            c;
        !this._musicIsStopped && b[this._playingMusic] && (c = b[this._playingMusic].audio, c.paused || (c.pause(), cc.AudioEngine.isMusicPlaying = !1, a.push(c)));
        var d = this._effectList,
            e;
        for (e in d)
            for (var b = d[e], f = 0; f < b.length; f++) c = b[f], c.ended || c.paused || (c.pause(), a.push(c))
    },
    _resumePlaying: function() {
        var a = this._pausedPlayings,
            b = this._soundList,
            c;
        !this._musicIsStopped && b[this._playingMusic] && (c = b[this._playingMusic].audio, -1 !== a.indexOf(c) && (c.play(), c.addEventListener("pause", this._musicListenerBound, !1), cc.AudioEngine.isMusicPlaying = !0));
        var d = this._effectList,
            e;
        for (e in d)
            for (var b = d[e], f = 0; f < b.length; f++) c = b[f], c.ended || -1 === a.indexOf(c) || c.play();
        a.length = 0
    }
});
cc.PlayingTask = function(a, b, c, d) {
    this.id = a;
    this.audio = b;
    this.isLoop = c || !1;
    this.status = d || cc.PlayingTaskStatus.stop
};
cc.PlayingTaskStatus = {
    playing: 1,
    pause: 2,
    stop: 3,
    waiting: 4
};
cc.SimpleAudioEngineForMobile = cc.SimpleAudioEngine.extend({
    _playingList: null,
    _currentTask: null,
    _isPauseForList: !1,
    _checkFlag: !0,
    _audioEndedCallbackBound: null,
    ctor: function() {
        cc.SimpleAudioEngine.prototype.ctor.call(this);
        this._maxAudioInstance = 2;
        this._playingList = [];
        this._isPauseForList = !1;
        this._checkFlag = !0;
        this._audioEndedCallbackBound = this._audioEndCallback.bind(this)
    },
    _stopAllEffectsForList: function() {
        var a, b, c = this._effectList,
            d;
        for (d in c) {
            a = c[d];
            for (var e = 0; e < a.length; e++) b = a[e], b.ended || (b.removeEventListener("ended",
                this._audioEndedCallbackBound, !1), b.loop = !1, b.duration && (b.currentTime = b.duration))
        }
        this._playingList.length = 0;
        this._currentTask = null
    },
    playMusic: function(a, b) {
        if (this._soundSupported) {
            this._stopAllEffectsForList();
            var c = this._getPathWithoutExt(a),
                d = this._getExtFromFullPath(a),
                e = this._soundList;
            if (e[this._playingMusic]) {
                var f = e[this._playingMusic];
                f.audio.removeEventListener("pause", this._musicListenerBound, !1);
                f.audio.pause()
            }
            this._playingMusic = c;
            e[this._playingMusic] ? d = e[this._playingMusic].audio :
                (f = new cc.SimpleSFX, f.ext = d, d = f.audio = new Audio(a), f.audio.preload = "auto", e[c] = f, f.audio.load());
            d.addEventListener("pause", this._musicListenerBound, !1);
            d.loop = b || !1;
            d.play();
            cc.AudioEngine.isMusicPlaying = !0;
            this._musicIsStopped = !1
        }
    },
    isMusicPlaying: function() {
        var a = this._soundList,
            b = this._playingMusic;
        return a[b] ? (a = a[b].audio, !a.paused && !a.ended) : !1
    },
    _musicListener: function() {
        cc.AudioEngine.isMusicPlaying = !1;
        this._soundList[this._playingMusic] && this._soundList[this._playingMusic].audio.removeEventListener("pause",
            this._musicListener, !1);
        this._checkFlag ? this._isPauseForList = !1 : this._checkFlag = !0
    },
    _stopExpiredTask: function(a) {
        for (var b = this._playingList, c = this._audioIDList, d = 0; d < b.length;) {
            var e = b[d];
            if (e.status === cc.PlayingTaskStatus.waiting)
                if (e.audio.currentTime + a >= e.audio.duration) {
                    b.splice(d, 1);
                    c[e.id] && (e = c[e.id], e.ended || (e.removeEventListener("ended", this._audioEndedCallbackBound, !1), e.loop = !1, e.duration && (e.currentTime = e.duration)));
                    continue
                } else e.audio.currentTime += a;
            d++
        }
    },
    _audioEndCallback: function() {
        var a =
            this._currentTask;
        this._stopExpiredTask(a.audio.currentTime);
        a.isLoop ? a.audio.play() : (a.audio.removeEventListener("ended", this._audioEndedCallbackBound, !1), cc.ArrayRemoveObject(this._playingList, a), (a = this._getNextTaskToPlay()) ? (this._currentTask = a, a.status = cc.PlayingTaskStatus.playing, a.audio.play()) : (this._currentTask = null, this._isPauseForList && (this._isPauseForList = !1, this.resumeMusic())))
    },
    _pushingPlayingTask: function(a) {
        if (!a) throw "cc.SimpleAudioEngineForMobile._pushingPlayingTask(): playingTask should be non-null.";
        var b = this._playingList;
        this._currentTask ? (this._currentTask.status = cc.PlayingTaskStatus.waiting, this._currentTask.audio.pause()) : this.isMusicPlaying() && (this._checkFlag = !1, this.pauseMusic(), this._isPauseForList = !0);
        b.push(a);
        this._currentTask = a;
        this._playingAudioTask(a)
    },
    _playingAudioTask: function(a) {
        a.audio.addEventListener("ended", this._audioEndedCallbackBound, !1);
        a.audio.play();
        a.status = cc.PlayingTaskStatus.playing
    },
    _getPlayingTaskFromList: function(a) {
        for (var b = this._playingList, c = 0, d = b.length; c <
            d; c++)
            if (b[c].id === a) return b[c];
        return null
    },
    _getNextTaskToPlay: function() {
        for (var a = this._playingList, b = a.length - 1; 0 <= b; b--) {
            var c = a[b];
            if (c.status === cc.PlayingTaskStatus.waiting) return c
        }
        return null
    },
    _playingNextTask: function() {
        var a = this._currentTask = this._getNextTaskToPlay();
        a ? (a.status = cc.PlayingTaskStatus.playing, a.audio.play()) : this._isPauseForList && (this._isPauseForList = !1, this.resumeMusic())
    },
    _deletePlayingTaskFromList: function(a) {
        for (var b = this._playingList, c = 0, d = b.length; c < d; c++) {
            var e =
                b[c];
            if (e.id === a) {
                b.splice(c, 1);
                e == this._currentTask && this._playingNextTask();
                break
            }
        }
    },
    _pausePlayingTaskFromList: function(a) {
        for (var b = this._playingList, c = 0, d = b.length; c < d; c++) {
            var e = b[c];
            if (e.id === a) {
                e.status = cc.PlayingTaskStatus.pause;
                e == this._currentTask && this._playingNextTask();
                break
            }
        }
    },
    _resumePlayingTaskFromList: function(a) {
        for (var b = this._playingList, c = 0, d = b.length; c < d; c++) {
            var e = b[c];
            if (e.id === a) {
                e.status = cc.PlayingTaskStatus.waiting;
                !this._currentTask && (a = this._getNextTaskToPlay()) && (this.isMusicPlaying() &&
                    (this._checkFlag = !1, this.pauseMusic(), this._isPauseForList = !0), a.status = cc.PlayingTaskStatus.playing, a.audio.play());
                break
            }
        }
    },
    playEffect: function(a, b) {
        if (!this._soundSupported) return null;
        var c = this._getPathWithoutExt(a),
            d;
        d = this._soundList[c] ? this._soundList[c].ext : this._getExtFromFullPath(a);
        var e = this._getEffectList(c),
            f;
        if (0 < e.length)
            for (var g = 0; g < e.length; g++)
                if (e[g].ended) {
                    f = e[g];
                    f.currentTime = 0;
                    window.chrome && f.load();
                    break
                }
        if (!f) {
            if (e.length >= this._maxAudioInstance) return cc.log("Error: " +
                a + " greater than " + this._maxAudioInstance), null;
            f = new Audio(c + "." + d);
            f.volume = this._effectsVolume;
            e.push(f)
        }
        c = new cc.PlayingTask(this._audioID++, f, b);
        this._pushingPlayingTask(c);
        this._audioIDList[c.id] = f;
        return c.id
    },
    pauseEffect: function(a) {
        if (null != a) {
            var b = a.toString();
            this._audioIDList[b] && (b = this._audioIDList[b], b.ended || b.pause());
            this._pausePlayingTaskFromList(a)
        }
    },
    pauseAllEffects: function() {
        var a, b, c = this._effectList,
            d;
        for (d in c) {
            a = c[d];
            for (var e = 0; e < a.length; e++) b = a[e], b.ended || b.pause()
        }
        a =
            this._playingList;
        b = 0;
        for (c = a.length; b < c; b++) a[b].status = cc.PlayingTaskStatus.pause;
        this._currentTask = null;
        this._isPauseForList && (this._isPauseForList = !1, this.resumeMusic())
    },
    resumeEffect: function(a) {
        if (null != a) {
            if (this._audioIDList[a]) {
                var b = this._audioIDList[a];
                b.ended || b.play()
            }
            this._resumePlayingTaskFromList(a)
        }
    },
    resumeAllEffects: function() {
        var a, b, c = this._effectList,
            d;
        for (d in c)
            if (a = c[d], 0 < a.length)
                for (var e = 0; e < a.length; e++) b = a[e], b.ended || b.play();
        a = this._playingList;
        b = 0;
        for (c = a.length; b <
            c; b++) d = a[b], d.status === cc.PlayingTaskStatus.pause && (d.status = cc.PlayingTaskStatus.waiting);
        null == this._currentTask && (a = this._getNextTaskToPlay()) && (this.isMusicPlaying() && (this._checkFlag = !1, this.pauseMusic(), this._isPauseForList = !0), a.status = cc.PlayingTaskStatus.playing, a.audio.play())
    },
    stopEffect: function(a) {
        if (null != a) {
            if (this._audioIDList[a]) {
                var b = this._audioIDList[a];
                b.ended || (b.removeEventListener("ended", this._audioEndedCallbackBound, !1), b.loop = !1, b.duration && (b.currentTime = b.duration))
            }
            this._deletePlayingTaskFromList(a)
        }
    },
    stopAllEffects: function() {
        var a, b, c = this._effectList,
            d;
        for (d in c) {
            a = c[d];
            for (var e = 0; e < a.length; e++) b = a[e], b.ended || (b.removeEventListener("ended", this._audioEndedCallbackBound, !1), b.loop = !1, b.duration && (b.currentTime = b.duration))
        }
        this._playingList.length = 0;
        this._currentTask = null;
        this._isPauseForList && (this._isPauseForList = !1, this.resumeMusic())
    },
    _pausePlaying: function() {
        var a = this._pausedPlayings,
            b = this._soundList;
        !this._musicIsStopped && b[this._playingMusic] && (b = b[this._playingMusic].audio, b.paused ||
            (b.pause(), cc.AudioEngine.isMusicPlaying = !1, a.push(b)));
        this.stopAllEffects()
    },
    _resumePlaying: function() {
        var a = this._pausedPlayings,
            b = this._soundList;
        !this._musicIsStopped && b[this._playingMusic] && (b = b[this._playingMusic].audio, -1 !== a.indexOf(b) && (b.play(), b.addEventListener("pause", this._musicListenerBound, !1), cc.AudioEngine.isMusicPlaying = !0));
        a.length = 0
    }
});
cc.WebAudioSFX = function(a, b, c, d, e) {
    this.key = a;
    this.sourceNode = b;
    this.volumeNode = c;
    this.startTime = d || 0;
    this.pauseTime = e || 0;
    this.isPaused = !1
};
cc.WebAudioEngine = cc.AudioEngine.extend({
    _ctx: null,
    _audioData: null,
    _audiosLoading: null,
    _musicVolume: 1,
    _effects: null,
    ctor: function() {
        cc.AudioEngine.prototype.ctor.call(this);
        this._audioData = {};
        this._audiosLoading = {};
        this._effects = {}
    },
    init: function() {
        this._ctx = new(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
        var a = {};
        this._checkCanPlay(a);
        var b = ["ogg", "mp3", "wav", "mp4", "m4a"],
            c = this._supportedFormat,
            d;
        for (d in b) {
            var e = b[d];
            a[e] && c.push(e)
        }
        return this._soundSupported = 0 < c.length
    },
    _fetchData: function(a, b, c) {
        var d = new window.XMLHttpRequest;
        d.open("GET", this._resPath + a, !0);
        d.responseType = "arraybuffer";
        var e = this;
        d.onload = function() {
            e._ctx.decodeAudioData(d.response, b, c)
        };
        d.onerror = c;
        d.send()
    },
    preloadSound: function(a) {
        if (this._soundSupported) {
            var b = this._getExtFromFullPath(a),
                c = this._getPathWithoutExt(a);
            if (this._audioData[c] || this._audiosLoading[c] || !this.isFormatSupported(b)) cc.Loader.getInstance().onResLoaded();
            else {
                this._audiosLoading[c] = !0;
                var d = this;
                this._fetchData(a, function(a) {
                    d._audioData[c] =
                        a;
                    delete d._audiosLoading[c];
                    cc.Loader.getInstance().onResLoaded()
                }, function() {
                    delete d._audiosLoading[c];
                    cc.Loader.getInstance().onResLoadingErr(a)
                })
            }
        }
    },
    _beginSound: function(a, b, c, d) {
        var e = new cc.WebAudioSFX;
        b = null == b ? !1 : b;
        c = null == c ? 1 : c;
        d = d || 0;
        var f = this._ctx;
        e.key = a;
        e.sourceNode = this._ctx.createBufferSource();
        e.sourceNode.buffer = this._audioData[a];
        e.sourceNode.loop = b;
        e.volumeNode = f.createGain ? this._ctx.createGain() : this._ctx.createGainNode();
        e.volumeNode.gain.value = c;
        e.sourceNode.connect(e.volumeNode);
        e.volumeNode.connect(this._ctx.destination);
        e.sourceNode.start ? e.sourceNode.start(0, d) : e.sourceNode.noteGrainOn ? (a = e.sourceNode.buffer.duration, b ? e.sourceNode.noteGrainOn(0, d, a) : e.sourceNode.noteGrainOn(0, d, a - d)) : e.sourceNode.noteOn(0);
        e.startTime = this._ctx.currentTime - d;
        e.pauseTime = e.startTime;
        e.isPaused = !1;
        return e
    },
    _isSoundPlaying: function(a) {
        return 2 == a.sourceNode.playbackState
    },
    _isSoundPaused: function(a) {
        return this._isSoundPlaying(a) ? !1 : a.isPaused
    },
    isMusicPlaying: function() {
        return this._playingMusic ?
            this._isSoundPlaying(this._playingMusic) : !1
    },
    playMusic: function(a, b) {
        var c = this._getPathWithoutExt(a),
            d = this._getExtFromFullPath(a);
        b = b || !1;
        this._playingMusic && this.stopMusic();
        if (this._audioData[c]) this._playingMusic = this._beginSound(c, b, this._musicVolume);
        else if (!this._audiosLoading[c] && this.isFormatSupported(d)) {
            this._audiosLoading[c] = !0;
            var e = this;
            this._fetchData(a, function(d) {
                e._audioData[c] = d;
                delete e._audiosLoading[c];
                e.playMusic(a, b)
            }, function() {
                delete e._audiosLoading[c]
            })
        }
    },
    _endSound: function(a) {
        a.sourceNode.playbackState &&
            3 == a.sourceNode.playbackState || (a.sourceNode.stop ? a.sourceNode.stop(0) : a.sourceNode.noteOff(0))
    },
    stopMusic: function(a) {
        var b = this._playingMusic;
        if (b) {
            var c = b.key;
            this._endSound(b);
            this._playingMusic = null;
            a && delete this._audioData[c]
        }
    },
    _pauseSound: function(a) {
        a.pauseTime = this._ctx.currentTime;
        a.isPaused = !0;
        this._endSound(a)
    },
    pauseMusic: function() {
        this.isMusicPlaying() && this._pauseSound(this._playingMusic)
    },
    _resumeSound: function(a, b) {
        return this._beginSound(a.key, a.sourceNode.loop, b, (a.pauseTime - a.startTime) %
            a.sourceNode.buffer.duration)
    },
    resumeMusic: function() {
        var a = this._playingMusic;
        a && this._isSoundPaused(a) && (this._playingMusic = this._resumeSound(a, this.getMusicVolume()))
    },
    rewindMusic: function() {
        var a = this._playingMusic;
        if (a) {
            var b = a.key,
                c = a.sourceNode.loop,
                d = this.getMusicVolume();
            this._endSound(a);
            this._playingMusic = this._beginSound(b, c, d)
        }
    },
    getMusicVolume: function() {
        return this._musicVolume
    },
    _setSoundVolume: function(a, b) {
        a.volumeNode.gain.value = b
    },
    setMusicVolume: function(a) {
        1 < a ? a = 1 : 0 > a && (a = 0);
        this.getMusicVolume() !=
            a && (this._musicVolume = a, this._playingMusic && this._setSoundVolume(this._playingMusic, a))
    },
    playEffect: function(a, b) {
        var c = this._getPathWithoutExt(a),
            d = this._getExtFromFullPath(a),
            e;
        b = b || !1;
        if (this._audioData[c]) {
            d = this._effects;
            d[c] || (d[c] = []);
            for (var d = d[c], f = 0, g = d.length; f < g; f++) {
                var h = d[f];
                if (!this._isSoundPlaying(h) && !this._isSoundPaused(h)) return d[f] = this._beginSound(c, b, this.getEffectsVolume()), e = this._audioID++, this._audioIDList[e] = d[f], e
            }
            f = this._beginSound(c, b, this.getEffectsVolume());
            d.push(f);
            e = this._audioID++;
            this._audioIDList[e] = f;
            return e
        }
        if (!this._audiosLoading[c] && this.isFormatSupported(d)) {
            this._audiosLoading[c] = !0;
            var k = this;
            e = this._audioID++;
            this._audioIDList[e] = null;
            this._fetchData(a, function(a) {
                k._audioData[c] = a;
                delete k._audiosLoading[c];
                a = k._beginSound(c, b, k.getEffectsVolume());
                k._audioIDList[e] = a;
                var d = k._effects;
                d[c] || (d[c] = []);
                d[c].push(a)
            }, function() {
                delete k._audiosLoading[c];
                delete k._audioIDList[e]
            });
            return e
        }
        return null
    },
    setEffectsVolume: function(a) {
        1 < a ? a = 1 : 0 > a && (a =
            0);
        if (this._effectsVolume != a) {
            this._effectsVolume = a;
            var b = this._effects,
                c;
            for (c in b)
                for (var d = b[c], e = 0, f = d.length; e < f; e++) this._setSoundVolume(d[e], a)
        }
    },
    _pauseSoundList: function(a) {
        for (var b = 0, c = a.length; b < c; b++) {
            var d = a[b];
            d && this._isSoundPlaying(d) && this._pauseSound(d)
        }
    },
    pauseEffect: function(a) {
        null != a && this._audioIDList[a] && (a = this._audioIDList[a]) && this._isSoundPlaying(a) && this._pauseSound(a)
    },
    pauseAllEffects: function() {
        for (var a in this._effects) this._pauseSoundList(this._effects[a])
    },
    _resumeSoundList: function(a,
        b) {
        for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c];
            this._isSoundPaused(e) && (a[c] = this._resumeSound(e, b), this._updateEffectsList(e, a[c]))
        }
    },
    resumeEffect: function(a) {
        if (null != a && this._audioIDList[a]) {
            var b = this._audioIDList[a];
            b && this._isSoundPaused(b) && (this._audioIDList[a] = this._resumeSound(b, this.getEffectsVolume()), this._updateEffectsList(b, this._audioIDList[a]))
        }
    },
    _updateEffectsList: function(a, b) {
        var c = this._effects,
            d, e;
        for (e in c) {
            d = c[e];
            for (var f = 0; f < d.length; f++) d[f] == a && (d[f] = b)
        }
    },
    resumeAllEffects: function() {
        var a =
            this._effects,
            b;
        for (b in a) this._resumeSoundList(a[b], this.getEffectsVolume())
    },
    stopEffect: function(a) {
        if (null != a) {
            var b = this._audioIDList;
            b[a] && this._endSound(b[a])
        }
    },
    stopAllEffects: function() {
        var a = this._effects,
            b;
        for (b in a) {
            for (var c = a[b], d = 0, e = c.length; d < e; d++) this._endSound(c[d]);
            delete a[b]
        }
    },
    unloadEffect: function(a) {
        if (a) {
            a = this._getPathWithoutExt(a);
            if (this._effects[a]) {
                var b = this._effects[a];
                delete this._effects[a];
                var c = this._audioIDList,
                    d;
                for (d in c) - 1 < b.indexOf(c[d]) && (this.stopEffect(d),
                    delete c[d])
            }
            this._audioData[a] && delete this._audioData[a]
        }
    },
    _pausePlaying: function() {
        var a = this._pausedPlayings;
        this.isMusicPlaying() && (a.push(this._playingMusic), this._pauseSound(this._playingMusic));
        var b = this._effects,
            c;
        for (c in b)
            for (var d = b[c], e = 0, f = d.length; e < f; e++) {
                var g = d[e];
                g && this._isSoundPlaying(g) && (a.push(g), this._pauseSound(g))
            }
    },
    _resumePlaying: function() {
        var a = this._pausedPlayings,
            b = this.getMusicVolume(),
            c = this._playingMusic;
        c && this._isSoundPaused(c) && -1 != a.indexOf(c) && (this._playingMusic =
            this._resumeSound(c, b));
        var c = this._effects,
            d;
        for (d in c)
            for (var e = c[d], f = 0, g = e.length; f < g; f++) {
                var h = e[f];
                this._isSoundPaused(h) && -1 != a.indexOf(h) && (e[f] = this._resumeSound(h, b), this._updateEffectsList(h, e[f]))
            }
        a.length = 0
    }
});
cc.AudioEngine._instance = null;
cc.AudioEngine.isMusicPlaying = !1;
cc.AudioEngine.getInstance = function() {
    this._instance || (cc.Browser.supportWebAudio ? this._instance = new cc.WebAudioEngine : -1 !== cc.Browser.multipleAudioWhiteList.indexOf(cc.Browser.type) ? this._instance = new cc.SimpleAudioEngine : this._instance = new cc.SimpleAudioEngineForMobile, this._instance.init());
    return this._instance
};
cc.AudioEngine.end = function() {
    this._instance && (this._instance.stopMusic(), this._instance.stopAllEffects());
    this._instance = null
};
cc.UserDefault = cc.Class.extend({
    _db: null,
    init: function() {
        this._db = this._getLocalStorage();
        return !0
    },
    _getLocalStorage: function() {
        try {
            if (sys.localStorage) return sys.localStorage
        } catch (a) {}
    },
    _getWebSqlDatabase: function() {},
    getBoolForKey: function(a, b) {
        cc.log("getBoolForKey is deprecated. Use sys.localStorage.getItem instead.");
        var c = this._getValueForKey(a);
        return "true" == c ? !0 : "false" == c ? !1 : c ? Boolean(c) : b || !1
    },
    getIntegerForKey: function(a, b) {
        cc.log("getIntegerForKey is deprecated. Use sys.localStorage.getItem instead.");
        var c = this._getValueForKey(a),
            d = b || 0;
        return c ? parseInt(c) : d
    },
    getFloatForKey: function(a, b) {
        cc.log("getFloatForKey is deprecated. Use sys.localStorage.getItem instead.");
        var c = this._getValueForKey(a),
            d = b || 0;
        return c ? parseFloat(c) : d
    },
    getDoubleForKey: function(a, b) {
        cc.log("getDoubleForKey is deprecated. Use sys.localStorage.getItem instead.");
        return this.getFloatForKey(a, b)
    },
    getStringForKey: function(a, b) {
        cc.log("getStringForKey is deprecated. Use sys.localStorage.getItem instead.");
        var c = this._getValueForKey(a);
        return c ? String(c) : b || ""
    },
    _getValueForKey: function(a) {
        var b;
        this._db && (b = this._db.getItem(a));
        return b
    },
    setBoolForKey: function(a, b) {
        cc.log("setBoolForKey is deprecated. Use sys.localStorage.setItem instead.");
        this.setStringForKey(a, String(b))
    },
    setIntegerForKey: function(a, b) {
        cc.log("setIntegerForKey is deprecated. Use sys.localStorage.setItem instead.");
        a && this._setValueForKey(a, parseInt(b))
    },
    setFloatForKey: function(a, b) {
        cc.log("setFloatForKey is deprecated. Use sys.localStorage.setItem instead.");
        a && this._setValueForKey(a, parseFloat(b))
    },
    setDoubleForKey: function(a, b) {
        cc.log("setDoubleForKey is deprecated. Use sys.localStorage.setItem instead.");
        return this.setFloatForKey(a, b)
    },
    setStringForKey: function(a, b) {
        cc.log("setStringForKey is deprecated. Use sys.localStorage.setItem instead.");
        a && this._setValueForKey(a, String(b))
    },
    _setValueForKey: function(a, b) {
        this._db && this._db.setItem(a, b)
    }
});
cc.UserDefault.getInstance = function() {
    cc.log("cc.UserDefault is deprecated. Use sys.localStorage instead.");
    this._sUserDefault || (this._sUserDefault = new cc.UserDefault, this._sUserDefault.init());
    return this._sUserDefault
};
cc.UserDefault.purgeInstanceUserDefault = function() {
    cc.Browser && this._db && this._db.clear()
};
cc.UserDefault._sUserDefault = null;
cc.UserDefault._isFilePathInitialized = !1;
cc.ALIGN_CENTER = 51;
cc.ALIGN_TOP = 19;
cc.ALIGN_TOP_RIGHT = 18;
cc.ALIGN_RIGHT = 50;
cc.ALIGN_BOTTOM_RIGHT = 34;
cc.ALIGN_BOTTOM = 35;
cc.ALIGN_BOTTOM_LEFT = 33;
cc.ALIGN_LEFT = 49;
cc.ALIGN_TOP_LEFT = 17;
cc.RGB_PREMULTIPLY_APLHA = function(a, b, c, d) {
    return a * (d + 1) >> 8 | b * (d + 1) >> 8 << 8 | c * (d + 1) >> 8 << 16 | d << 24
};
cc.tImageSource = function(a, b, c) {
    this.data = a;
    this.size = b || 0;
    this.offset = c || 0
};
cc.pngReadCallback = function(a, b, c) {
    var d = new cc.tImageSource,
        d = cc.png_get_io_ptr(a);
    d.offset + c <= d.size ? (cc.memcpy(b, d.data + d.offset, c), d.offset += c) : cc.png_error(a, "pngReaderCallback failed")
};
cc.Image = cc.Class.extend({
    _width: 0,
    _height: 0,
    _bitsPerComponent: 0,
    _data: 0,
    _hasAlpha: !1,
    _preMulti: !1,
    initWithImageFile: function(a, b) {
        var c = cc.FileUtils.getInstance().getFileData(a, "rb");
        return null != c && 0 < c.length ? this.initWithImageData(c, c.length, b) : !1
    },
    initWithImageFileThreadSafe: function(a, b) {
        return this.initWithImageFile(a, b)
    },
    initWithImageData: function(a, b, c, d, e, f) {
        f = f || 8;
        d = d || 0;
        e = e || 0;
        c = c || cc.FMT_UNKNOWN;
        return !a || 0 >= b ? !1 : cc.FMT_PNG == c ? this._initWithPngData(a, b) : cc.FMT_JPG == c ? this._initWithJpgData(a,
            b) : cc.FMT_TIFF == c ? this._initWithTiffData(a, b) : cc.FMT_RAWDATA == c ? this._initWithRawData(a, b, d, e, f) : 8 < b && 137 == a[0] && 80 == a[1] && 78 == a[2] && 71 == a[3] && 13 == a[4] && 10 == a[5] && 26 == a[6] && 10 == a[7] ? this._initWithPngData(a, b) : 2 < b && (73 == a[0] && 73 == a[1] || 77 == a[0] && 77 == a[1] || 255 == a[0] && 216 == a[1]) ? this._initWithTiffData(a, b) : !1
    },
    getData: function() {
        return this._data
    },
    getDataLen: function() {
        return this._width * this._height
    },
    hasAlpha: function() {
        return this._hasAlpha
    },
    isPremultipliedAlpha: function() {
        return this._preMulti
    },
    getWidth: function() {
        return this._width
    },
    getHeight: function() {
        return this._height
    },
    getBitsPerComponent: function() {
        return this._bitsPerComponent
    },
    saveToFile: function(a, b) {
        cc.log("doesn't support saveToFile on Cocos2d-Html5");
        return !1
    },
    _initWithJpgData: function(a, b) {
        return !1
    },
    _initWithPngData: function(a, b) {
        return !1
    },
    _initWithTiffData: function(a, b) {
        return !1
    },
    _initWithRawData: function(a, b, c, d, e) {
        return !1
    },
    _saveImageToPNG: function(a, b) {
        return !1
    },
    _saveImageToJPG: function(a) {
        return !1
    },
    initWithString: function(a, b, c, d, e, f) {
        return !1
    }
});

function SignalBinding(a, b, c, d, e) {
    this._listener = b;
    this._isOnce = c;
    this.context = d;
    this._signal = a;
    this._priority = e || 0
}
SignalBinding.prototype = {
    active: !0,
    params: null,
    execute: function(a) {
        var b;
        this.active && this._listener && (a = this.params ? this.params.concat(a) : a, b = this._listener.apply(this.context, a), this._isOnce && this.detach());
        return b
    },
    detach: function() {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null
    },
    isBound: function() {
        return !!this._signal && !!this._listener
    },
    isOnce: function() {
        return this._isOnce
    },
    getListener: function() {
        return this._listener
    },
    getSignal: function() {
        return this._signal
    },
    _destroy: function() {
        delete this._signal;
        delete this._listener;
        delete this.context
    },
    toString: function() {
        return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
    }
};

function validateListener(a, b) {
    if ("function" !== typeof a) throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", b));
}

function Signal() {
    this._bindings = [];
    this._prevParams = null;
    var a = this;
    this.dispatch = function() {
        Signal.prototype.dispatch.apply(a, arguments)
    }
}
Signal.prototype = {
    VERSION: "::VERSION_NUMBER::",
    memorize: !1,
    _shouldPropagate: !0,
    active: !0,
    _registerListener: function(a, b, c, d) {
        var e = this._indexOfListener(a, c);
        if (-1 !== e) {
            if (a = this._bindings[e], a.isOnce() !== b) throw Error("You cannot add" + (b ? "" : "Once") + "() then add" + (b ? "Once" : "") + "() the same listener without removing the relationship first.");
        } else a = new SignalBinding(this, a, b, c, d), this._addBinding(a);
        this.memorize && this._prevParams && a.execute(this._prevParams);
        return a
    },
    _addBinding: function(a) {
        var b =
            this._bindings.length;
        do --
        b;
        while (this._bindings[b] && a._priority <= this._bindings[b]._priority);
        this._bindings.splice(b + 1, 0, a)
    },
    _indexOfListener: function(a, b) {
        for (var c = this._bindings.length, d; c--;)
            if (d = this._bindings[c], d._listener === a && d.context === b) return c;
        return -1
    },
    has: function(a, b) {
        return -1 !== this._indexOfListener(a, b)
    },
    add: function(a, b, c) {
        validateListener(a, "add");
        return this._registerListener(a, !1, b, c)
    },
    addOnce: function(a, b, c) {
        validateListener(a, "addOnce");
        return this._registerListener(a, !0,
            b, c)
    },
    remove: function(a, b) {
        validateListener(a, "remove");
        var c = this._indexOfListener(a, b); - 1 !== c && (this._bindings[c]._destroy(), this._bindings.splice(c, 1));
        return a
    },
    removeAll: function() {
        for (var a = this._bindings.length; a--;) this._bindings[a]._destroy();
        this._bindings.length = 0
    },
    getNumListeners: function() {
        return this._bindings.length
    },
    halt: function() {
        this._shouldPropagate = !1
    },
    dispatch: function(a) {
        if (this.active) {
            var b = Array.prototype.slice.call(arguments),
                c = this._bindings.length,
                d;
            this.memorize && (this._prevParams =
                b);
            if (c) {
                d = this._bindings.slice();
                this._shouldPropagate = !0;
                do c--; while (d[c] && this._shouldPropagate && !1 !== d[c].execute(b))
            }
        }
    },
    forget: function() {
        this._prevParams = null
    },
    dispose: function() {
        this.removeAll();
        delete this._bindings;
        delete this._prevParams
    },
    toString: function() {
        return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
    }
};
var signals = Signal;
signals.Signal = Signal;
(function(a) {
    "function" === typeof define && define.amd ? define(function() {
        return signals
    }) : "undefined" !== typeof module && module.exports ? module.exports = signals : a.signals = signals
})(this);
cc.RESOURCE_TYPE = {
    IMAGE: ["png", "jpg", "bmp", "jpeg", "gif"],
    SOUND: ["mp3", "ogg", "wav", "mp4", "m4a"],
    XML: ["plist", "xml", "fnt", "tmx", "tsx"],
    BINARY: ["ccbi"],
    FONT: "FONT",
    TEXT: ["txt", "vsh", "fsh", "json", "ExportJson"],
    UNKNOW: []
};
cc.Loader = cc.Class.extend({
    _curNumber: 0,
    _totalNumber: 0,
    _loadedNumber: 0,
    _resouces: null,
    _animationInterval: 1 / 60,
    _interval: null,
    _isAsync: !1,
    ctor: function() {
        this._resouces = []
    },
    initWithResources: function(a, b, c) {
        if (a) {
            b && (this._selector = b, this._target = c);
            if (a != this._resouces || 0 == this._curNumber) {
                this._loadedNumber = this._curNumber = 0;
                if (a[0] instanceof Array)
                    for (b = 0; b < a.length; b++) this._resouces = this._resouces.concat(a[b]);
                else this._resouces = a;
                this._totalNumber = this._resouces.length
            }
            this._schedulePreload()
        } else console.log("resources should not null")
    },
    setAsync: function(a) {
        this._isAsync = a
    },
    onResLoadingErr: function(a) {
        this._loadedNumber++;
        cc.log("cocos2d:Failed loading resource: " + a)
    },
    onResLoaded: function() {
        this._loadedNumber++
    },
    getPercentage: function() {
        var a = 0;
        return a = 0 == this._totalNumber ? 100 : 0 | this._loadedNumber / this._totalNumber * 100
    },
    releaseResources: function(a) {
        if (a && 0 < a.length)
            for (var b = cc.TextureCache.getInstance(), c = cc.AudioEngine ? cc.AudioEngine.getInstance() : null, d = cc.SAXParser.getInstance(), e = cc.FileUtils.getInstance(), f, g = 0; g < a.length; g++) {
                f =
                    a[g];
                var h = this._getResType(f);
                switch (h) {
                    case "IMAGE":
                        b.removeTextureForKey(f.src);
                        break;
                    case "SOUND":
                        if (!c) throw "Can not find AudioEngine! Install it, please.";
                        c.unloadEffect(f.src);
                        break;
                    case "XML":
                        d.unloadPlist(f.src);
                        break;
                    case "BINARY":
                        e.unloadBinaryFileData(f.src);
                        break;
                    case "TEXT":
                        e.unloadTextFileData(f.src);
                        break;
                    case "FONT":
                        this._unregisterFaceFont(f);
                        break;
                    default:
                        throw "cocos2d:unknown filename extension: " + h;
                }
            }
    },
    _preload: function() {
        this._updatePercent();
        if (this._isAsync) {
            var a = cc.Director.getInstance()._frameRate;
            if (null != a && 20 > a) {
                cc.log("cocos2d: frame rate less than 20 fps, skip frame.");
                return
            }
        }
        this._curNumber < this._totalNumber && (this._loadOneResource(), this._curNumber++)
    },
    _loadOneResource: function() {
        var a = cc.TextureCache.getInstance(),
            b = cc.AudioEngine ? cc.AudioEngine.getInstance() : null,
            c = cc.SAXParser.getInstance(),
            d = cc.FileUtils.getInstance(),
            e = this._resouces[this._curNumber],
            f = this._getResType(e);
        switch (f) {
            case "IMAGE":
                a.addImage(e.src);
                break;
            case "SOUND":
                if (!b) throw "Can not find AudioEngine! Install it, please.";
                b.preloadSound(e.src);
                break;
            case "XML":
                c.preloadPlist(e.src);
                break;
            case "BINARY":
                d.preloadBinaryFileData(e.src);
                break;
            case "TEXT":
                d.preloadTextFileData(e.src);
                break;
            case "FONT":
                this._registerFaceFont(e);
                break;
            default:
                throw "cocos2d:unknown filename extension: " + f;
        }
    },
    _schedulePreload: function() {
        var a = this;
        this._interval = setInterval(function() {
            a._preload()
        }, 1E3 * this._animationInterval)
    },
    _unschedulePreload: function() {
        clearInterval(this._interval)
    },
    _getResType: function(a) {
        if (null != a.fontName) return cc.RESOURCE_TYPE.FONT;
        a = a.src;
        a = a.substring(a.lastIndexOf(".") + 1, a.length);
        var b = a.indexOf("?");
        0 < b && (a = a.substring(0, b));
        for (var c in cc.RESOURCE_TYPE)
            if (-1 != cc.RESOURCE_TYPE[c].indexOf(a)) return c;
        return a
    },
    _updatePercent: function() {
        100 <= this.getPercentage() && (this._unschedulePreload(), this._complete())
    },
    _complete: function() {
        if (this._target && "string" == typeof this._selector) this._target[this._selector](this);
        else this._target && "function" == typeof this._selector ? this._selector.call(this._target, this) : this._selector(this);
        this._totalNumber = this._loadedNumber = this._curNumber = 0
    },
    _registerFaceFont: function(a) {
        var b = a.src,
            c = cc.FileUtils.getInstance();
        if (b && 0 < b.length) {
            var d = document.createElement("style");
            d.type = "text/css";
            document.body.appendChild(d);
            for (var e = "@font-face { font-family:" + a.fontName + "; src:", f = 0; f < b.length; f++) e += "url('" + c.fullPathForFilename(encodeURI(b[f].src)) + "') format('" + b[f].id + "')", e += f == b.length - 1 ? ";" : ",";
            d.textContent += e + "};";
            b = document.createElement("div");
            b.style.fontFamily = a.fontName;
            b.innerHTML =
                ".";
            b.style.position = "absolute";
            b.style.left = "-100px";
            b.style.top = "-100px";
            document.body.appendChild(b)
        }
        cc.Loader.getInstance().onResLoaded()
    },
    _unregisterFaceFont: function(a) {}
});
cc.Loader.preload = function(a, b, c) {
    this._instance || (this._instance = new cc.Loader);
    this._instance.initWithResources(a, b, c);
    return this._instance
};
cc.Loader.preloadAsync = function(a, b, c) {
    this._instance || (this._instance = new cc.Loader);
    this._instance.setAsync(!0);
    this._instance.initWithResources(a, b, c);
    return this._instance
};
cc.Loader.purgeCachedData = function(a) {
    this._instance && this._instance.releaseResources(a)
};
cc.Loader.getInstance = function() {
    this._instance || (this._instance = new cc.Loader);
    return this._instance
};
cc.Loader._instance = null;
Preloader = cc.Scene.extend({
    _logo: null,
    _bgLayer: null,
    _label: null,
    _winSize: null,
    ctor: function() {
        cc.Scene.prototype.ctor.call(this);
        this._winSize = cc.Director.getInstance().getWinSize()
    },
    init: function() {
        cc.Scene.prototype.init.call(this);
        var a = logoH,
            b = cc.p(this._winSize.width / 2, this._winSize.height / 2);
        this._bgLayer = cc.LayerColor.create(cc.c4(backgroundColor[0], backgroundColor[1], backgroundColor[2], 255));
        this._bgLayer.setPosition(0, 0);
        this.addChild(this._bgLayer, 0);
        this._logo = cc.Sprite.create(logoSrc);
        this._logo.setPosition(b);
        this._bgLayer.addChild(this._logo, 10);
        this._label = cc.LabelTTF.create("Loading... 0%", "Arial", 28);
        this._label.setColor(cc.c3(38, 192, 216));
        this._label.setPosition(cc.pAdd(b, cc.p(0, logoOnCenter ? 0 : -a / 2 - 10)));
        this._bgLayer.addChild(this._label, 100)
    },
    onEnter: function() {
        cc.Node.prototype.onEnter.call(this);
        this.schedule(this._startLoading, 0.3)
    },
    onExit: function() {
        cc.Node.prototype.onExit.call(this);
        this._label.setString("Loading... 0%")
    },
    initWithResources: function(a, b, c) {
        this.resources =
            a;
        this.selector = b;
        this.target = c
    },
    _startLoading: function() {
        this.unschedule(this._startLoading);
        cc.Loader.preload(this.resources, this.selector, this.target);
        this.schedule(this._updatePercent)
    },
    _updatePercent: function() {
        var a = cc.Loader.getInstance().getPercentage();
        this._label.setString("Loading... " + a + "%");
        100 <= a && this.unschedule(this._updatePercent)
    }
});
Preloader.load = function(a, b, c) {
    this._instance || (this._instance = new Preloader, this._instance.init());
    this._instance.initWithResources(a, b, c);
    a = cc.Director.getInstance();
    a.getRunningScene() ? a.replaceScene(this._instance) : a.runWithScene(this._instance);
    return this._instance
};
var lg = lg || {};
EIGHT_DIRECTIONS = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1]
];
MAX_IN_TILE = 10;
var TileValue = TileValue || {
    WALKABLE: 0,
    BLOCK1: 1,
    BLOCK2: 2,
    BLOCK3: 3,
    BLOCK4: 4,
    BLOCK5: 5
};
lg.TileMap = cc.Class.extend({
    id: "default",
    offsetX: 0,
    offsetY: 0,
    autoLayout: !1,
    _tileWidth: 0,
    _tileHeight: 0,
    _mapWidth: 0,
    _mapHeight: 0,
    _objectsMap: null,
    _objectsArr: null,
    setTileSize: function(a, b) {
        if (this._tileWidth != a || this._tileHeight != b) this._tileWidth = a, this._tileHeight = b
    },
    setMapSizePixel: function(a, b) {
        null == a && (a = lg.stage.width());
        null == b && (b = lg.stage.height());
        return this.setMapSize(Math.ceil(a / this._tileWidth), Math.ceil(b / this._tileHeight))
    },
    setMapSize: function(a, b) {
        var c = [
            [],
            []
        ];
        if (this._mapWidth ==
            a && this._mapHeight == b) return c;
        null == this._objectsArr && (this._objectsArr = []);
        null == this._objectsMap && (this._objectsMap = []);
        for (var d = this._mapWidth, e = this._mapHeight, f = -1, g = -1, h = Math.max(a, d), k = Math.max(b, e); ++f < h;) {
            null == this._objectsMap[f] && (this._objectsMap[f] = []);
            for (g = -1; ++g < k;) f >= a || g >= b ? (c[0] = c[0].concat(this._objectsMap[f][g]), this.removeObjects(f, g), delete this._objectsMap[f][g]) : f < d && g < e || (this._objectsMap[f][g] = [], c[1].push([f, g]));
            0 == this._objectsMap[f].length && delete this._objectsMap[f]
        }
        this._mapWidth =
            a;
        this._mapHeight = b;
        return c
    },
    clear: function(a) {
        if (0 != this._objectsArr.length) {
            void 0 === a && (a = !0);
            for (var b, c = 0; c < this._mapWidth; c++)
                for (var d = 0; d < this._mapHeight; d++) {
                    if (a) {
                        b = this._objectsMap[c][d];
                        for (var e in b) {
                            var f = b[e];
                            f instanceof cc.Node && f.destroy()
                        }
                    }
                    this._objectsMap[c][d] = []
                }
            this._objectsArr.length = 0
        }
    },
    getPixelSize: function() {
        return cc.size(this._tileWidth * this._mapWidth, this._tileHeight * this._mapHeight)
    },
    getTileIndexX: function(a) {
        return Math.floor((a - this.offsetX) / this._tileWidth)
    },
    getTileIndexY: function(a) {
        return Math.floor((a -
            this.offsetY) / this._tileHeight)
    },
    getTiledPositionX: function(a) {
        return (a + 0.5) * this._tileWidth + this.offsetX
    },
    getTiledPositionY: function(a) {
        return (a + 0.5) * this._tileHeight + this.offsetY
    },
    getCoveredTiles: function(a, b) {
        var c = lg.getRect(a, !0);
        return this.getCoveredTiles1(c, b)
    },
    getCoveredTiles1: function(a, b) {
        b = !0 === b;
        for (var c = this.getTileIndexX(a.x), d = this.getTileIndexY(a.y), e = this.getTileIndexX(a.x + a.width), f = this.getTileIndexY(a.y + a.height), g = [], c = c - 1, h = 0; ++c <= e;)
            for (h = d - 1; ++h <= f;) b ? g = g.concat(this.getObjects(c,
                h)) : g.push(cc.p(c, h));
        return g
    },
    isValideTile: function(a, b) {
        return 0 <= a && a < this._mapWidth && 0 <= b && b < this._mapHeight
    },
    snapToTile: function(a, b, c, d) {
        a instanceof cc.Node && (void 0 === b && (b = this.getTileIndexX(a.getPositionX())), void 0 === c && (c = this.getTileIndexY(a.getPositionY())), a.setPosition(this.getTiledPositionX(b), this.getTiledPositionY(c)), !0 === d && a.setTileMap(this))
    },
    snapAll: function() {
        for (var a = this._objectsArr.length, b = -1, c = null; ++b < a;) c = this._objectsArr[b], this.snapToTile(c)
    },
    addObject: function(a,
        b, c) {
        void 0 === b && (b = a.tx);
        void 0 === c && (c = a.ty);
        a.tx = b;
        a.ty = c;
        if (this.isValideTile(b, c) && !(-1 < this._objectsArr.indexOf(a))) {
            this._objectsArr.push(a);
            var d = this._objectsMap[b][c];
            if (a instanceof cc.Node && this.autoLayout) {
                b = (b + (this._mapHeight - 1 - c) * this._mapWidth) * MAX_IN_TILE;
                c = null;
                for (var e = 0, f = !1, g = 0; g < d.length; g++) c = d[g], c instanceof cc.Node && (!f && c.getPositionY() <= a.getPositionY() && (d.splice(g, 0, a), a.setZOrder(Math.min(e, MAX_IN_TILE) + b), f = !0, e++, g++), c.setZOrder(Math.min(e, MAX_IN_TILE) + b), e++);
                f || (d.push(a), a.setZOrder(Math.min(e, MAX_IN_TILE) + b))
            } else d.push(a)
        }
    },
    updateLayout: function(a, b) {
        if (this.isValideTile(a, b)) {
            var c = this._objectsMap[a][b];
            if (0 != c.length) {
                c.sort(this._sortByY);
                for (var d = (a + (this._mapHeight - 1 - b) * this._mapWidth) * MAX_IN_TILE, e = null, f = 0, g = 0; g < c.length; g++) e = c[g], e instanceof cc.Node && (e.setZOrder(Math.min(f, MAX_IN_TILE) + d), f++)
            }
        }
    },
    removeObject: function(a, b, c) {
        void 0 === b && (b = a.tx);
        void 0 === c && (c = a.ty);
        this.isValideTile(b, c) && (b = this._objectsMap[b][c], c = b.indexOf(a), -1 <
            c && b.splice(c, 1), c = this._objectsArr.indexOf(a), -1 < c && this._objectsArr.splice(c, 1))
    },
    removeObjects: function(a, b) {
        if (this.isValideTile(a, b))
            for (var c = this._objectsMap[a][b], d = null, d = -1; c.length;) d = c[0], d.tx = d.ty = -1, d = this._objectsArr.indexOf(d), -1 < d && this._objectsArr.splice(d, 1), c.splice(0, 1)
    },
    getObjects: function(a, b) {
        return this.isValideTile(a, b) ? this._objectsMap[a][b] : []
    },
    getObjects1: function(a, b) {
        var c = this.getTileIndexX(a),
            d = this.getTileIndexY(b);
        return this.getObjects(c, d)
    },
    getAllObjects: function() {
        return this._objectsArr
    },
    getTiles: function(a) {
        for (var b = [], c = -1, d = -1; ++c < this._mapWidth;)
            for (d = -1; ++d < this._mapHeight;) null != a && !1 === a(this, c, d) || b.push(cc.p(c, d));
        return b
    },
    getRow: function(a, b) {
        for (var c = -1, d = []; ++c < this._mapHeight;) d = !0 === b ? d.concat(this.getObjects(a, c)) : d.push(cc.p(a, c));
        return d
    },
    getCol: function(a, b) {
        for (var c = -1, d = []; ++c < this._mapWidth;) d = !0 === b ? d.concat(this.getObjects(c, a)) : d.push(cc.p(c, a));
        return d
    },
    isEmptyTile: function(a, b) {
        if (!this.isValideTile(a, b)) return !1;
        var c = this.getObjects(a, b);
        return c ?
            0 == c.length : !1
    },
    _sortByY: function(a, b) {
        if (a.getPositionY() > b.getPositionY()) return -1;
        if (a.getPositionY() < b.getPositionY()) return 1
    }
});
lg.TileMap.create = function(a) {
    var b = new lg.TileMap;
    b.id = a;
    return b
};
var buckets = {};
(function() {
    buckets.defaultCompare = function(a, b) {
        return a < b ? -1 : a === b ? 0 : 1
    };
    buckets.defaultEquals = function(a, b) {
        return a === b
    };
    buckets.defaultToString = function(a) {
        return null === a ? "BUCKETS_NULL" : buckets.isUndefined(a) ? "BUCKETS_UNDEFINED" : buckets.isString(a) ? a : a.toString()
    };
    buckets.isFunction = function(a) {
        return "function" === typeof a
    };
    buckets.isUndefined = function(a) {
        return "undefined" === typeof a
    };
    buckets.isString = function(a) {
        return "[object String]" === Object.prototype.toString.call(a)
    };
    buckets.reverseCompareFunction = function(a) {
        return buckets.isFunction(a) ?
            function(b, c) {
                return -1 * a(b, c)
            } : function(a, c) {
                return a < c ? 1 : a === c ? 0 : -1
            }
    };
    buckets.compareToEquals = function(a) {
        return function(b, c) {
            return 0 === a(b, c)
        }
    };
    buckets.arrays = {};
    buckets.arrays.indexOf = function(a, b, c) {
        c = c || buckets.defaultEquals;
        for (var d = a.length, e = 0; e < d; e++)
            if (c(a[e], b)) return e;
        return -1
    };
    buckets.arrays.lastIndexOf = function(a, b, c) {
        c = c || buckets.defaultEquals;
        for (var d = a.length - 1; 0 <= d; d--)
            if (c(a[d], b)) return d;
        return -1
    };
    buckets.arrays.contains = function(a, b, c) {
        return 0 <= buckets.arrays.indexOf(a,
            b, c)
    };
    buckets.arrays.remove = function(a, b, c) {
        b = buckets.arrays.indexOf(a, b, c);
        if (0 > b) return !1;
        a.splice(b, 1);
        return !0
    };
    buckets.arrays.frequency = function(a, b, c) {
        c = c || buckets.defaultEquals;
        for (var d = a.length, e = 0, f = 0; f < d; f++) c(a[f], b) && e++;
        return e
    };
    buckets.arrays.equals = function(a, b, c) {
        c = c || buckets.defaultEquals;
        if (a.length !== b.length) return !1;
        for (var d = a.length, e = 0; e < d; e++)
            if (!c(a[e], b[e])) return !1;
        return !0
    };
    buckets.arrays.copy = function(a) {
        return a.concat()
    };
    buckets.arrays.swap = function(a, b, c) {
        if (0 > b ||
            b >= a.length || 0 > c || c >= a.length) return !1;
        var d = a[b];
        a[b] = a[c];
        a[c] = d;
        return !0
    };
    buckets.arrays.forEach = function(a, b) {
        for (var c = a.length, d = 0; d < c && !1 !== b(a[d]); d++);
    };
    buckets.LinkedList = function() {
        this.lastNode = this.firstNode = null;
        this.nElements = 0
    };
    buckets.LinkedList.prototype.add = function(a, b) {
        buckets.isUndefined(b) && (b = this.nElements);
        if (0 > b || b > this.nElements || buckets.isUndefined(a)) return !1;
        var c = this.createNode(a);
        if (0 === this.nElements) this.lastNode = this.firstNode = c;
        else if (b === this.nElements) this.lastNode =
            this.lastNode.next = c;
        else if (0 === b) c.next = this.firstNode, this.firstNode = c;
        else {
            var d = this.nodeAtIndex(b - 1);
            c.next = d.next;
            d.next = c
        }
        this.nElements++;
        return !0
    };
    buckets.LinkedList.prototype.first = function() {
        if (null !== this.firstNode) return this.firstNode.element
    };
    buckets.LinkedList.prototype.last = function() {
        if (null !== this.lastNode) return this.lastNode.element
    };
    buckets.LinkedList.prototype.elementAtIndex = function(a) {
        a = this.nodeAtIndex(a);
        return null === a ? void 0 : a.element
    };
    buckets.LinkedList.prototype.indexOf =
        function(a, b) {
            var c = b || buckets.defaultEquals;
            if (buckets.isUndefined(a)) return -1;
            for (var d = this.firstNode, e = 0; null !== d;) {
                if (c(d.element, a)) return e;
                e++;
                d = d.next
            }
            return -1
    };
    buckets.LinkedList.prototype.contains = function(a, b) {
        return 0 <= this.indexOf(a, b)
    };
    buckets.LinkedList.prototype.remove = function(a, b) {
        var c = b || buckets.defaultEquals;
        if (1 > this.nElements || buckets.isUndefined(a)) return !1;
        for (var d = null, e = this.firstNode; null !== e;) {
            if (c(e.element, a)) return e === this.firstNode ? (this.firstNode = this.firstNode.next,
                e === this.lastNode && (this.lastNode = null)) : (e === this.lastNode && (this.lastNode = d), d.next = e.next, e.next = null), this.nElements--, !0;
            d = e;
            e = e.next
        }
        return !1
    };
    buckets.LinkedList.prototype.clear = function() {
        this.lastNode = this.firstNode = null;
        this.nElements = 0
    };
    buckets.LinkedList.prototype.equals = function(a, b) {
        var c = b || buckets.defaultEquals;
        return a instanceof buckets.LinkedList && this.size() === a.size() ? this.equalsAux(this.firstNode, a.firstNode, c) : !1
    };
    buckets.LinkedList.prototype.equalsAux = function(a, b, c) {
        for (; null !==
            a;) {
            if (!c(a.element, b.element)) return !1;
            a = a.next;
            b = b.next
        }
        return !0
    };
    buckets.LinkedList.prototype.removeElementAtIndex = function(a) {
        if (!(0 > a || a >= this.nElements)) {
            var b;
            1 === this.nElements ? (b = this.firstNode.element, this.lastNode = this.firstNode = null) : (a = this.nodeAtIndex(a - 1), null === a ? (b = this.firstNode.element, this.firstNode = this.firstNode.next) : a.next === this.lastNode && (b = this.lastNode.element, this.lastNode = a), null !== a && (b = a.next.element, a.next = a.next.next));
            this.nElements--;
            return b
        }
    };
    buckets.LinkedList.prototype.forEach =
        function(a) {
            for (var b = this.firstNode; null !== b && !1 !== a(b.element);) b = b.next
    };
    buckets.LinkedList.prototype.reverse = function() {
        for (var a = null, b = this.firstNode, c = null; null !== b;) c = b.next, b.next = a, a = b, b = c;
        c = this.firstNode;
        this.firstNode = this.lastNode;
        this.lastNode = c
    };
    buckets.LinkedList.prototype.toArray = function() {
        for (var a = [], b = this.firstNode; null !== b;) a.push(b.element), b = b.next;
        return a
    };
    buckets.LinkedList.prototype.size = function() {
        return this.nElements
    };
    buckets.LinkedList.prototype.isEmpty = function() {
        return 0 >=
            this.nElements
    };
    buckets.LinkedList.prototype.nodeAtIndex = function(a) {
        if (0 > a || a >= this.nElements) return null;
        if (a === this.nElements - 1) return this.lastNode;
        for (var b = this.firstNode, c = 0; c < a; c++) b = b.next;
        return b
    };
    buckets.LinkedList.prototype.createNode = function(a) {
        return {
            element: a,
            next: null
        }
    };
    buckets.Dictionary = function(a) {
        this.table = {};
        this.nElements = 0;
        this.toStr = a || buckets.defaultToString
    };
    buckets.Dictionary.prototype.get = function(a) {
        a = this.table[this.toStr(a)];
        return buckets.isUndefined(a) ? void 0 : a.value
    };
    buckets.Dictionary.prototype.set = function(a, b) {
        if (!buckets.isUndefined(a) && !buckets.isUndefined(b)) {
            var c, d = this.toStr(a);
            c = this.table[d];
            buckets.isUndefined(c) ? (this.nElements++, c = void 0) : c = c.value;
            this.table[d] = {
                key: a,
                value: b
            };
            return c
        }
    };
    buckets.Dictionary.prototype.remove = function(a) {
        a = this.toStr(a);
        var b = this.table[a];
        if (!buckets.isUndefined(b)) return delete this.table[a], this.nElements--, b.value
    };
    buckets.Dictionary.prototype.keys = function() {
        var a = [],
            b;
        for (b in this.table) this.table.hasOwnProperty(b) &&
            a.push(this.table[b].key);
        return a
    };
    buckets.Dictionary.prototype.values = function() {
        var a = [],
            b;
        for (b in this.table) this.table.hasOwnProperty(b) && a.push(this.table[b].value);
        return a
    };
    buckets.Dictionary.prototype.forEach = function(a) {
        for (var b in this.table)
            if (this.table.hasOwnProperty(b)) {
                var c = this.table[b];
                if (!1 === a(c.key, c.value)) break
            }
    };
    buckets.Dictionary.prototype.containsKey = function(a) {
        return !buckets.isUndefined(this.get(a))
    };
    buckets.Dictionary.prototype.clear = function() {
        this.table = {};
        this.nElements =
            0
    };
    buckets.Dictionary.prototype.size = function() {
        return this.nElements
    };
    buckets.Dictionary.prototype.isEmpty = function() {
        return 0 >= this.nElements
    };
    buckets.MultiDictionary = function(a, b) {
        this.parent = new buckets.Dictionary(a);
        this.equalsF = b || buckets.defaultEquals
    };
    buckets.MultiDictionary.prototype.get = function(a) {
        a = this.parent.get(a);
        return buckets.isUndefined(a) ? [] : buckets.arrays.copy(a)
    };
    buckets.MultiDictionary.prototype.set = function(a, b) {
        if (buckets.isUndefined(a) || buckets.isUndefined(b)) return !1;
        if (!this.containsKey(a)) return this.parent.set(a, [b]), !0;
        var c = this.parent.get(a);
        if (buckets.arrays.contains(c, b, this.equalsF)) return !1;
        c.push(b);
        return !0
    };
    buckets.MultiDictionary.prototype.remove = function(a, b) {
        if (buckets.isUndefined(b)) {
            var c = this.parent.remove(a);
            return buckets.isUndefined(c) ? !1 : !0
        }
        c = this.parent.get(a);
        return buckets.arrays.remove(c, b, this.equalsF) ? (0 === c.length && this.parent.remove(a), !0) : !1
    };
    buckets.MultiDictionary.prototype.keys = function() {
        return this.parent.keys()
    };
    buckets.MultiDictionary.prototype.values = function() {
        for (var a =
            this.parent.values(), b = [], c = 0; c < a.length; c++)
            for (var d = a[c], e = 0; e < d.length; e++) b.push(d[e]);
        return b
    };
    buckets.MultiDictionary.prototype.containsKey = function(a) {
        return this.parent.containsKey(a)
    };
    buckets.MultiDictionary.prototype.clear = function() {
        return this.parent.clear()
    };
    buckets.MultiDictionary.prototype.size = function() {
        return this.parent.size()
    };
    buckets.MultiDictionary.prototype.isEmpty = function() {
        return this.parent.isEmpty()
    };
    buckets.Heap = function(a) {
        this.data = [];
        this.compare = a || buckets.defaultCompare
    };
    buckets.Heap.prototype.leftChildIndex = function(a) {
        return 2 * a + 1
    };
    buckets.Heap.prototype.rightChildIndex = function(a) {
        return 2 * a + 2
    };
    buckets.Heap.prototype.parentIndex = function(a) {
        return Math.floor((a - 1) / 2)
    };
    buckets.Heap.prototype.minIndex = function(a, b) {
        return b >= this.data.length ? a >= this.data.length ? -1 : a : 0 >= this.compare(this.data[a], this.data[b]) ? a : b
    };
    buckets.Heap.prototype.siftUp = function(a) {
        for (var b = this.parentIndex(a); 0 < a && 0 < this.compare(this.data[b], this.data[a]);) buckets.arrays.swap(this.data, b,
            a), a = b, b = this.parentIndex(a)
    };
    buckets.Heap.prototype.siftDown = function(a) {
        for (var b = this.minIndex(this.leftChildIndex(a), this.rightChildIndex(a)); 0 <= b && 0 < this.compare(this.data[a], this.data[b]);) buckets.arrays.swap(this.data, b, a), a = b, b = this.minIndex(this.leftChildIndex(a), this.rightChildIndex(a))
    };
    buckets.Heap.prototype.peek = function() {
        if (0 < this.data.length) return this.data[0]
    };
    buckets.Heap.prototype.add = function(a) {
        if (!buckets.isUndefined(a)) return this.data.push(a), this.siftUp(this.data.length -
            1), !0
    };
    buckets.Heap.prototype.removeRoot = function() {
        if (0 < this.data.length) {
            var a = this.data[0];
            this.data[0] = this.data[this.data.length - 1];
            this.data.splice(this.data.length - 1, 1);
            0 < this.data.length && this.siftDown(0);
            return a
        }
    };
    buckets.Heap.prototype.contains = function(a) {
        var b = buckets.compareToEquals(this.compare);
        return buckets.arrays.contains(this.data, a, b)
    };
    buckets.Heap.prototype.size = function() {
        return this.data.length
    };
    buckets.Heap.prototype.isEmpty = function() {
        return 0 >= this.data.length
    };
    buckets.Heap.prototype.clear =
        function() {
            this.data.length = 0
    };
    buckets.Heap.prototype.forEach = function(a) {
        buckets.arrays.forEach(this.data, a)
    };
    buckets.Stack = function() {
        this.list = new buckets.LinkedList
    };
    buckets.Stack.prototype.push = function(a) {
        return this.list.add(a, 0)
    };
    buckets.Stack.prototype.add = function(a) {
        return this.list.add(a, 0)
    };
    buckets.Stack.prototype.pop = function() {
        return this.list.removeElementAtIndex(0)
    };
    buckets.Stack.prototype.peek = function() {
        return this.list.first()
    };
    buckets.Stack.prototype.size = function() {
        return this.list.size()
    };
    buckets.Stack.prototype.contains = function(a, b) {
        return this.list.contains(a, b)
    };
    buckets.Stack.prototype.isEmpty = function() {
        return this.list.isEmpty()
    };
    buckets.Stack.prototype.clear = function() {
        this.list.clear()
    };
    buckets.Stack.prototype.forEach = function(a) {
        this.list.forEach(a)
    };
    buckets.Queue = function() {
        this.list = new buckets.LinkedList
    };
    buckets.Queue.prototype.enqueue = function(a) {
        return this.list.add(a)
    };
    buckets.Queue.prototype.add = function(a) {
        return this.list.add(a)
    };
    buckets.Queue.prototype.dequeue =
        function() {
            if (0 !== this.list.size()) {
                var a = this.list.first();
                this.list.removeElementAtIndex(0);
                return a
            }
    };
    buckets.Queue.prototype.peek = function() {
        if (0 !== this.list.size()) return this.list.first()
    };
    buckets.Queue.prototype.size = function() {
        return this.list.size()
    };
    buckets.Queue.prototype.contains = function(a, b) {
        return this.list.contains(a, b)
    };
    buckets.Queue.prototype.isEmpty = function() {
        return 0 >= this.list.size()
    };
    buckets.Queue.prototype.clear = function() {
        this.list.clear()
    };
    buckets.Queue.prototype.forEach =
        function(a) {
            this.list.forEach(a)
    };
    buckets.PriorityQueue = function(a) {
        this.heap = new buckets.Heap(buckets.reverseCompareFunction(a))
    };
    buckets.PriorityQueue.prototype.enqueue = function(a) {
        return this.heap.add(a)
    };
    buckets.PriorityQueue.prototype.add = function(a) {
        return this.heap.add(a)
    };
    buckets.PriorityQueue.prototype.dequeue = function() {
        if (0 !== this.heap.size()) {
            var a = this.heap.peek();
            this.heap.removeRoot();
            return a
        }
    };
    buckets.PriorityQueue.prototype.peek = function() {
        return this.heap.peek()
    };
    buckets.PriorityQueue.prototype.contains =
        function(a) {
            return this.heap.contains(a)
    };
    buckets.PriorityQueue.prototype.isEmpty = function() {
        return this.heap.isEmpty()
    };
    buckets.PriorityQueue.prototype.size = function() {
        return this.heap.size()
    };
    buckets.PriorityQueue.prototype.clear = function() {
        this.heap.clear()
    };
    buckets.PriorityQueue.prototype.forEach = function(a) {
        this.heap.forEach(a)
    };
    buckets.Set = function(a) {
        this.dictionary = new buckets.Dictionary(a)
    };
    buckets.Set.prototype.contains = function(a) {
        return this.dictionary.containsKey(a)
    };
    buckets.Set.prototype.add =
        function(a) {
            if (this.contains(a) || buckets.isUndefined(a)) return !1;
            this.dictionary.set(a, a);
            return !0
    };
    buckets.Set.prototype.intersection = function(a) {
        var b = this;
        this.forEach(function(c) {
            a.contains(c) || b.remove(c)
        })
    };
    buckets.Set.prototype.union = function(a) {
        var b = this;
        a.forEach(function(a) {
            b.add(a)
        })
    };
    buckets.Set.prototype.difference = function(a) {
        var b = this;
        a.forEach(function(a) {
            b.remove(a)
        })
    };
    buckets.Set.prototype.isSubsetOf = function(a) {
        if (this.size() > a.size()) return !1;
        var b = !0;
        this.forEach(function(c) {
            if (!a.contains(c)) return b = !1
        });
        return b
    };
    buckets.Set.prototype.remove = function(a) {
        return this.contains(a) ? (this.dictionary.remove(a), !0) : !1
    };
    buckets.Set.prototype.forEach = function(a) {
        this.dictionary.forEach(function(b, c) {
            return a(c)
        })
    };
    buckets.Set.prototype.toArray = function() {
        return this.dictionary.values()
    };
    buckets.Set.prototype.isEmpty = function() {
        return this.dictionary.isEmpty()
    };
    buckets.Set.prototype.size = function() {
        return this.dictionary.size()
    };
    buckets.Set.prototype.clear = function() {
        this.dictionary.clear()
    };
    buckets.Bag =
        function(a) {
            this.toStrF = a || buckets.defaultToString;
            this.dictionary = new buckets.Dictionary(this.toStrF);
            this.nElements = 0
    };
    buckets.Bag.prototype.add = function(a, b) {
        if (isNaN(b) || buckets.isUndefined(b)) b = 1;
        if (buckets.isUndefined(a) || 0 >= b) return !1;
        this.contains(a) ? this.dictionary.get(a).copies += b : this.dictionary.set(a, {
            value: a,
            copies: b
        });
        this.nElements += b;
        return !0
    };
    buckets.Bag.prototype.count = function(a) {
        return this.contains(a) ? this.dictionary.get(a).copies : 0
    };
    buckets.Bag.prototype.contains = function(a) {
        return this.dictionary.containsKey(a)
    };
    buckets.Bag.prototype.remove = function(a, b) {
        if (isNaN(b) || buckets.isUndefined(b)) b = 1;
        if (buckets.isUndefined(a) || 0 >= b || !this.contains(a)) return !1;
        var c = this.dictionary.get(a);
        this.nElements = b > c.copies ? this.nElements - c.copies : this.nElements - b;
        c.copies -= b;
        0 >= c.copies && this.dictionary.remove(a);
        return !0
    };
    buckets.Bag.prototype.toArray = function() {
        for (var a = [], b = this.dictionary.values(), c = b.length, d = 0; d < c; d++)
            for (var e = b[d], f = e.value, e = e.copies, g = 0; g < e; g++) a.push(f);
        return a
    };
    buckets.Bag.prototype.toSet = function() {
        for (var a =
            new buckets.Set(this.toStrF), b = this.dictionary.values(), c = b.length, d = 0; d < c; d++) a.add(b[d].value);
        return a
    };
    buckets.Bag.prototype.forEach = function(a) {
        this.dictionary.forEach(function(b, c) {
            for (var d = c.value, e = c.copies, f = 0; f < e; f++)
                if (!1 === a(d)) return !1;
            return !0
        })
    };
    buckets.Bag.prototype.size = function() {
        return this.nElements
    };
    buckets.Bag.prototype.isEmpty = function() {
        return 0 === this.nElements
    };
    buckets.Bag.prototype.clear = function() {
        this.nElements = 0;
        this.dictionary.clear()
    };
    buckets.BSTree = function(a) {
        this.root =
            null;
        this.compare = a || buckets.defaultCompare;
        this.nElements = 0
    };
    buckets.BSTree.prototype.add = function(a) {
        return buckets.isUndefined(a) ? !1 : null !== this.insertNode(this.createNode(a)) ? (this.nElements++, !0) : !1
    };
    buckets.BSTree.prototype.clear = function() {
        this.root = null;
        this.nElements = 0
    };
    buckets.BSTree.prototype.isEmpty = function() {
        return 0 === this.nElements
    };
    buckets.BSTree.prototype.size = function() {
        return this.nElements
    };
    buckets.BSTree.prototype.contains = function(a) {
        return buckets.isUndefined(a) ? !1 : null !==
            this.searchNode(this.root, a)
    };
    buckets.BSTree.prototype.remove = function(a) {
        a = this.searchNode(this.root, a);
        if (null === a) return !1;
        this.removeNode(a);
        this.nElements--;
        return !0
    };
    buckets.BSTree.prototype.inorderTraversal = function(a) {
        this.inorderTraversalAux(this.root, a, {
            stop: !1
        })
    };
    buckets.BSTree.prototype.preorderTraversal = function(a) {
        this.preorderTraversalAux(this.root, a, {
            stop: !1
        })
    };
    buckets.BSTree.prototype.postorderTraversal = function(a) {
        this.postorderTraversalAux(this.root, a, {
            stop: !1
        })
    };
    buckets.BSTree.prototype.levelTraversal =
        function(a) {
            this.levelTraversalAux(this.root, a)
    };
    buckets.BSTree.prototype.minimum = function() {
        return this.isEmpty() ? void 0 : this.minimumAux(this.root).element
    };
    buckets.BSTree.prototype.maximum = function() {
        return this.isEmpty() ? void 0 : this.maximumAux(this.root).element
    };
    buckets.BSTree.prototype.forEach = function(a) {
        this.inorderTraversal(a)
    };
    buckets.BSTree.prototype.toArray = function() {
        var a = [];
        this.inorderTraversal(function(b) {
            a.push(b)
        });
        return a
    };
    buckets.BSTree.prototype.height = function() {
        return this.heightAux(this.root)
    };
    buckets.BSTree.prototype.searchNode = function(a, b) {
        for (var c = null; null !== a && 0 !== c;) c = this.compare(b, a.element), 0 > c ? a = a.leftCh : 0 < c && (a = a.rightCh);
        return a
    };
    buckets.BSTree.prototype.transplant = function(a, b) {
        null === a.parent ? this.root = b : a === a.parent.leftCh ? a.parent.leftCh = b : a.parent.rightCh = b;
        null !== b && (b.parent = a.parent)
    };
    buckets.BSTree.prototype.removeNode = function(a) {
        if (null === a.leftCh) this.transplant(a, a.rightCh);
        else if (null === a.rightCh) this.transplant(a, a.leftCh);
        else {
            var b = this.minimumAux(a.rightCh);
            b.parent !== a && (this.transplant(b, b.rightCh), b.rightCh = a.rightCh, b.rightCh.parent = b);
            this.transplant(a, b);
            b.leftCh = a.leftCh;
            b.leftCh.parent = b
        }
    };
    buckets.BSTree.prototype.inorderTraversalAux = function(a, b, c) {
        null === a || c.stop || (this.inorderTraversalAux(a.leftCh, b, c), c.stop || (c.stop = !1 === b(a.element), c.stop || this.inorderTraversalAux(a.rightCh, b, c)))
    };
    buckets.BSTree.prototype.levelTraversalAux = function(a, b) {
        var c = new buckets.Queue;
        for (null !== a && c.enqueue(a); !c.isEmpty();) {
            a = c.dequeue();
            if (!1 === b(a.element)) break;
            null !== a.leftCh && c.enqueue(a.leftCh);
            null !== a.rightCh && c.enqueue(a.rightCh)
        }
    };
    buckets.BSTree.prototype.preorderTraversalAux = function(a, b, c) {
        null === a || c.stop || (c.stop = !1 === b(a.element), c.stop || (this.preorderTraversalAux(a.leftCh, b, c), c.stop || this.preorderTraversalAux(a.rightCh, b, c)))
    };
    buckets.BSTree.prototype.postorderTraversalAux = function(a, b, c) {
        null === a || c.stop || (this.postorderTraversalAux(a.leftCh, b, c), c.stop || (this.postorderTraversalAux(a.rightCh, b, c), c.stop || (c.stop = !1 === b(a.element))))
    };
    buckets.BSTree.prototype.minimumAux =
        function(a) {
            for (; null !== a.leftCh;) a = a.leftCh;
            return a
    };
    buckets.BSTree.prototype.maximumAux = function(a) {
        for (; null !== a.rightCh;) a = a.rightCh;
        return a
    };
    buckets.BSTree.prototype.successorNode = function(a) {
        if (null !== a.rightCh) return this.minimumAux(a.rightCh);
        for (var b = a.parent; null !== b && a === b.rightCh;) a = b, b = a.parent;
        return b
    };
    buckets.BSTree.prototype.heightAux = function(a) {
        return null === a ? -1 : Math.max(this.heightAux(a.leftCh), this.heightAux(a.rightCh)) + 1
    };
    buckets.BSTree.prototype.insertNode = function(a) {
        for (var b =
            null, c = this.root, d = null; null !== c;) {
            d = this.compare(a.element, c.element);
            if (0 === d) return null;
            0 > d ? (b = c, c = c.leftCh) : (b = c, c = c.rightCh)
        }
        a.parent = b;
        null === b ? this.root = a : 0 > this.compare(a.element, b.element) ? b.leftCh = a : b.rightCh = a;
        return a
    };
    buckets.BSTree.prototype.createNode = function(a) {
        return {
            element: a,
            leftCh: null,
            rightCh: null,
            parent: null
        }
    };
    "undefined" !== typeof module && (module.exports = buckets)
})();
RADIAN_TO_DEGREE = 180 / Math.PI;
DEGREE_TO_RADIAN = Math.PI / 180;
lg = lg || {};
lg.version = 1.3;
lg.assetsManager = null;
lg.inputManager = null;
lg.currentSceneName = "";
lg.currentScene = null;
lg._scenesDict = {};
lg._resourcesLoaded = [];
lg._soundEnabled = !0;
lg._soundBugFixed = !1;
lg._inited = !1;
lg.startGame = function(a) {
    lg.init();
    lg.preload(allResource, function() {
        var b = !1;
        if (a10Enabled)
            if (a10Remote) {
                var c = GameAPI.Branding.getSplashScreen();
                c.show && (showSplash(c.action, a), b = !0)
            } else showSplash(goMoreGame, a), b = !0;
        b || lg.replaceScene(a)
    })
};
lg.init = function() {
    lg._inited || (lg._inited = !0, lg.assetsManager = lg.AssetsManager.create(), lg.inputManager = lg.InputManager.create())
};
lg.registerScene = function(a, b, c) {
    lg.init();
    lg._scenesDict[a] = {
        scene: b,
        res: c
    }
};
lg.preload = function(a, b) {
    if (null == a || 0 == a.length) b();
    else {
        for (var c = !0, d = -1; ++d < a.length;) - 1 == lg._resourcesLoaded.indexOf(a[d].src) && (lg._resourcesLoaded.push(a[d].src), c = !1);
        c ? b() : Preloader.load(a, function() {
            b()
        }, this);
        lg._fixSoundBug()
    }
};
lg.replaceScene = function(a) {
    if (lg.currentSceneName != a) {
        var b = lg._scenesDict[a];
        if (null == b) throw "Please register the scene: " + a + " firstly!";
        lg.ObjectPool.release();
        lg.currentSceneName = a;
        lg.currentScene = new b.scene;
        lg.preload(b.res, function() {
            lg.inputManager.getParent() && lg.inputManager.removeFromParent(!1);
            lg.currentScene.addChild(lg.inputManager, 999999);
            cc.Director.getInstance()._runningScene ? cc.Director.getInstance().replaceScene(lg.currentScene) : cc.Director.getInstance().runWithScene(lg.currentScene)
        })
    }
};
lg._tileMaps = {};
lg.getTileMap = function(a) {
    null == a && (a = "default");
    if (lg._tileMaps.hasOwnProperty(a)) return lg._tileMaps[a];
    cc.log("The tileMap: " + a + " hasn't been defined, pls use lg.registerTileMap to define it firstly!");
    return null
};
lg.registerTileMap = function(a) {
    lg._tileMaps[a.id] = a
};
lg.setSoundEnabled = function(a) {
    if (lg._soundEnabled != a) {
        lg._soundEnabled = a;
        var b = cc.AudioEngine.getInstance();
        a ? b.resumeMusic() : (b.pauseMusic(), b.stopAllEffects())
    }
};
lg.getSoundEnabled = function() {
    return lg._soundEnabled
};
lg.playMusic = function(a, b) {
    if (lg._soundEnabled) {
        var c = cc.AudioEngine.getInstance();
        c.stopMusic(!0);
        c.playMusic(a, b)
    }
};
lg.playSound = function(a) {
    lg._soundEnabled && cc.AudioEngine.getInstance().playEffect(a)
};
lg._fixSoundBug = function() {
    function a() {
        cc.AudioEngine && (document.hidden ? setTimeout(function() {
            c._pausePlaying();
            lg._soundEnabled = !1
        }, 0.1) : (cc.Director.getInstance()._resetLastUpdate(), c._resumePlaying(), lg._soundEnabled = !0))
    }
    if (!lg._soundBugFixed) {
        lg._soundBugFixed = !0;
        var b;
        "undefined" !== typeof document.hidden ? b = "visibilitychange" : "undefined" !== typeof document.mozHidden ? b = "mozvisibilitychange" : "undefined" !== typeof document.msHidden ? b = "msvisibilitychange" : "undefined" !== typeof document.webkitHidden &&
            (b = "webkitvisibilitychange");
        var c = cc.AudioEngine.getInstance();
        window.addEventListener("focus", function() {
            cc.AudioEngine && (c._resumePlaying(), lg._soundEnabled = !0)
        }, !1);
        window.addEventListener("blur", function() {
            cc.AudioEngine && setTimeout(function() {
                c._pausePlaying();
                lg._soundEnabled = !1
            }, 0.1)
        }, !1);
        document.addEventListener(b, a, !1)
    }
};
lg.getAngle = function(a, b, c) {
    return lg.getAngle1(b.x - a.x, b.y - a.y, c)
};
lg.getAngle1 = function(a, b, c) {
    void 0 === c && (c = !0);
    a = Math.PI / 2 - Math.atan2(b, a);
    c && (a *= RADIAN_TO_DEGREE);
    return a
};
lg.getPointOnCircle = function(a, b) {
    b = (90 - b) * DEGREE_TO_RADIAN;
    return new cc.Point(a * Math.cos(b), a * Math.sin(b))
};
lg.getPosition = function(a, b) {
    var c = a.getPosition();
    !0 === b && a.getParent() && (c = a.getParent().convertToWorldSpace(c));
    return c
};
lg.getRotation = function(a, b) {
    if (!0 !== b) return a.getRotation();
    for (var c = 0, d = a; d;) c += d.getRotation(), d = d.getParent();
    return c
};
lg.getRect = function(a, b) {
    var c;
    if (a instanceof lg.MovieClip && (c = a.getRect(b))) return c;
    b = !0 === b;
    c = a.getPosition();
    b && a.getParent() && (c = a.getParent().convertToWorldSpace(c));
    var d = a.getContentSize(),
        e = a.getAnchorPoint();
    return c = cc.rect(c.x - d.width * e.x, c.y - d.height * e.y, d.width, d.height)
};
lg.rectClone = function(a) {
    return null == a ? null : cc.rect(a._origin.x, a._origin.y, a._size.width, a._size.height)
};
lg.drawRect = function(a, b, c, d, e) {
    null == b && (b = cc.DrawNode.create(), lg.currentScene && lg.currentScene.addChild(b, 99999));
    null == c && (c = 1);
    null == d && (d = cc.c4f(255, 0, 0, 255));
    var f = cc.pAdd(a._origin, cc.p(a._size.width, a._size.height));
    b.drawRect(a._origin, f, e, c, d)
};
lg.ifTouched = function(a, b) {
    if (null == a || !(a instanceof cc.Node)) return !1;
    var c = b.getLocation(),
        c = a.convertToNodeSpace(c),
        d = lg.getRect(a);
    d._origin.x = d._origin.y = 0;
    return cc.rectContainsPoint(d, c)
};
lg.ifCollide = function(a, b) {
    var c = lg.getRect(a, !0),
        d = lg.getRect(b, !0);
    return cc.rectIntersectsRect(c, d)
};
lg.isChildOf = function(a, b) {
    if (null == a || null == b || a == b) return !1;
    for (var c = a.getParent(); c;) {
        if (c == b) return !0;
        c = c.getParent()
    }
    return !1
};
lg.nameToObject = function(a, b) {
    if (void 0 == a || "" == a) return null;
    b = b || "function";
    for (var c = a.split("."), d = window || this, e = 0, f = c.length; e < f; e++) try {
        d = d[c[e]]
    } catch (g) {
        break
    }
    return typeof d !== b ? null : d
};
lg.createBGLayer = function(a, b) {
    null == b && (b = cc.c4b(255, 255, 255, 255));
    var c = cc.LayerColor.create(b, lg.stage.width(), lg.stage.height());
    a.addChild(c, 0);
    return c
};
Array.prototype.shuffle = function(a) {
    if (void 0 === a || 0 >= a || a > this.length) a = this.length;
    for (a -= 1; 0 <= a; a--) {
        var b = 0 | cc.rand() % (a + 1),
            c = this[a];
        this[a] = this[b];
        this[b] = c
    }
};
lg.randInt = function(a, b) {
    return a + Math.floor(Math.random() * (b - a))
};
lg.getRandomInArray = function(a) {
    if (null == a) return null;
    var b = lg.randInt(0, a.length);
    return a[b]
};
lg.getFileExtension = function(a) {
    a = a.substring(a.lastIndexOf(".") + 1, a.length);
    var b = a.indexOf("?");
    0 < b && (a = a.substring(0, b));
    return a
};
lg.isImageFile = function(a) {
    a = lg.getFileExtension(a);
    return -1 < cc.RESOURCE_TYPE.IMAGE.indexOf(a)
};
lg.copyProperties = function(a, b) {
    if (null != a && null != b)
        for (var c in a) try {
            b[c] = a[c]
        } catch (d) {}
};
lg.createDInts = function(a, b) {
    isNaN(b) && (b = 0);
    for (var c = [], d = -1, e = b - 1, f = b; ++d < a;) 0 == d % 2 ? c.push(++e) : c.push(--f);
    return c
};
lg.anchorCenter = cc.p(0.5, 0.5);
lg.anchorTop = cc.p(0.5, 1);
lg.anchorTopRight = cc.p(1, 1);
lg.anchorRight = cc.p(1, 0.5);
lg.anchorBottomRight = cc.p(1, 0);
lg.anchorBottom = cc.p(0.5, 0);
lg.anchorBottomLeft = cc.p(0, 0);
lg.anchorLeft = cc.p(0, 0.5);
lg.anchorTopLeft = cc.p(0, 1);
lg.stage = {
    _rcVisible: cc.RectZero(),
    _ptCenter: cc.PointZero(),
    _ptTop: cc.PointZero(),
    _ptTopRight: cc.PointZero(),
    _ptRight: cc.PointZero(),
    _ptBottomRight: cc.PointZero(),
    _ptBottom: cc.PointZero(),
    _ptLeft: cc.PointZero(),
    _ptTopLeft: cc.PointZero(),
    _ptBottomLeft: cc.PointZero(),
    _width: 0,
    _height: 0,
    rect: function() {
        if (0 == this._rcVisible.width) {
            var a = cc.Director.getInstance().getWinSize();
            this._rcVisible = cc.rect(0, 0, a.width, a.height)
        }
        return this._rcVisible
    },
    width: function() {
        0 == this._width && (this._width = this.rect().width);
        return this._width
    },
    height: function() {
        0 == this._height && (this._height = this.rect().height);
        return this._height
    },
    center: function() {
        if (0 == this._ptCenter.x) {
            var a = this.rect();
            this._ptCenter.x = a.x + a.width / 2;
            this._ptCenter.y = a.y + a.height / 2
        }
        return this._ptCenter
    },
    top: function() {
        if (0 == this._ptTop.x) {
            var a = this.rect();
            this._ptTop.x = a.x + a.width / 2;
            this._ptTop.y = a.y + a.height
        }
        return this._ptTop
    },
    topRight: function() {
        if (0 == this._ptTopRight.x) {
            var a = this.rect();
            this._ptTopRight.x = a.x + a.width;
            this._ptTopRight.y = a.y +
                a.height
        }
        return this._ptTopRight
    },
    right: function() {
        if (0 == this._ptRight.x) {
            var a = this.rect();
            this._ptRight.x = a.x + a.width;
            this._ptRight.y = a.y + a.height / 2
        }
        return this._ptRight
    },
    bottomRight: function() {
        if (0 == this._ptBottomRight.x) {
            var a = this.rect();
            this._ptBottomRight.x = a.x + a.width;
            this._ptBottomRight.y = a.y
        }
        return this._ptBottomRight
    },
    bottom: function() {
        if (0 == this._ptBottom.x) {
            var a = this.rect();
            this._ptBottom.x = a.x + a.width / 2;
            this._ptBottom.y = a.y
        }
        return this._ptBottom
    },
    bottomLeft: function() {
        return this._ptBottomLeft
    },
    left: function() {
        if (0 == this._ptLeft.y) {
            var a = this.rect();
            this._ptLeft.x = a.x;
            this._ptLeft.y = a.y + a.height / 2
        }
        return this._ptLeft
    },
    topLeft: function() {
        if (0 == this._ptTopLeft.y) {
            var a = this.rect();
            this._ptTopLeft.x = a.x;
            this._ptTopLeft.y = a.y + a.height
        }
        return this._ptTopLeft
    }
};
var lg = lg || {},
    InputType = {
        press: "onPress",
        click: "onClick",
        move: "onMouseMove"
    };
lg.InputManager = cc.Layer.extend({
    checkMouseMove: !0,
    enabled: !0,
    _callbacks: {},
    _ignoreChildren: [],
    _itemTouched: null,
    _doTouched: !1,
    _inTouching: !1,
    _targets: [],
    _tempResult: null,
    addListener: function(a, b, c, d) {
        if (null != a && null != b) {
            c = null == c ? InputType.click : c;
            var e = this._callbacks[c];
            null == e && (e = [], this._callbacks[c] = e);
            e.push({
                target: a,
                func: b
            }); - 1 == this._targets.indexOf(a) && (this._targets.push(a), a.__input__priority = void 0 === d ? 0 : parseInt(d))
        }
    },
    removeListener: function(a, b, c) {
        var d = this._targets.indexOf(a),
            e = -1 < d;
        null == b && e && (this._targets.splice(d, 1), delete a.__input__priority);
        if (e)
            if (d = null, null != c) d = this._callbacks[c], this._removeCallback(d, a, b);
            else
                for (var f in InputType) d = this._callbacks[InputType[f]], this._removeCallback(d, a, b)
    },
    _removeCallback: function(a, b, c) {
        if (null != a)
            for (var d = -1, e = null; ++d < a.length;)
                if (e = a[d], e.target == b && (null == c || e.func == c)) {
                    a.splice(d, 1);
                    break
                }
    },
    onEnter: function() {
        this._super();
        sys.capabilities.hasOwnProperty("keyboard") && this.setKeyboardEnabled(!0);
        sys.capabilities.hasOwnProperty("mouse") &&
            (this.setMousePriority(-255), this.setMouseEnabled(!0));
        sys.capabilities.hasOwnProperty("touches") && (this.setTouchMode(cc.TOUCH_ONE_BY_ONE), this.setTouchPriority(-255), this.setTouchEnabled(!0, !0))
    },
    onExit: function() {
        this._super();
        this._targets = [];
        this._ignoreChildren = [];
        this._callbacks = {}
    },
    findTouchedItem: function(a) {
        if (!this.isVisible()) return null;
        this._targets.sort(this._sortTargets);
        return this._searchChildren(this._targets, a)
    },
    _searchChildren: function(a, b) {
        for (var c = null, d = null, d = null, e = b.getLocation(),
            f = a.length; 0 <= --f;)
            if (c = a[f], !this.ifTargetIgnore(c)) {
                if (0 < c._children.length) {
                    if (d = c._tileMap)
                        if (d = d.getObjects1(e.x, e.y), d.length) return this._doTouched = !0, d[d.length - 1];
                    if (this._tempResult = this._searchChildren(c._children, b)) return this._doTouched = !0, this._tempResult
                }
                if (lg.ifTouched(c, b)) return this._doTouched = !0, c
            }
        return null
    },
    ifTargetIgnore: function(a) {
        if (null == a || !a.isRunning() || !a.isVisible() || !a.isRunning() || !a._tileMap && a.isMouseEnabled && !1 === a.isMouseEnabled()) return !0;
        for (var b = -1, c = null; ++b <
            this._ignoreChildren.length;)
            if (c = this._ignoreChildren[b], a.name == c) return !0;
        return !1
    },
    handleTouchBegan: function(a) {
        if (!this.enabled || !this.isVisible()) return !1;
        this._inTouching = !0;
        this._doTouched = !1;
        (this._itemTouched = this.findTouchedItem(a)) && this._itemTouched instanceof lg.SimpleButton && this._setButtonState(this._itemTouched, ButtonState.DOWN);
        this._dispatch(a, InputType.press);
        return this._doTouched
    },
    handleTouchEnded: function(a) {
        if (this.enabled && this.isVisible()) {
            this._inTouching = !1;
            if (this._itemTouched &&
                this._itemTouched instanceof lg.SimpleButton) {
                var b = ButtonState.UP;
                this._itemTouched.isSelectable() && !this._itemTouched.isSelected() && (b = ButtonState.SELECTED);
                this._itemTouched.setState(b)
            }
            this._dispatch(a, InputType.click);
            this._itemTouched = null
        }
    },
    handleTouchMoved: function(a) {
        if (this.enabled && this.isVisible() && this.checkMouseMove) {
            var b = this.findTouchedItem(a);
            if (b != this._itemTouched) {
                if (this._itemTouched) {
                    if (this._itemTouched instanceof lg.SimpleButton) {
                        var c = this._itemTouched.isSelectable() && this._itemTouched.isSelected() ?
                            ButtonState.SELECTED : ButtonState.UP;
                        this._itemTouched.setState(c)
                    }
                    this._itemTouched = null
                }
                b && (this._itemTouched = b, this._itemTouched instanceof lg.SimpleButton && (c = this._inTouching ? ButtonState.DOWN : ButtonState.OVER, this._setButtonState(this._itemTouched, c)))
            }
            this._dispatch(a, InputType.move)
        }
    },
    handleToucheCanceled: function(a, b) {
        this._inTouching = !1;
        if (this._itemTouched) {
            if (this._itemTouched instanceof lg.SimpleButton) {
                var c = this._itemTouched.isSelectable() && this._itemTouched.isSelected() ? ButtonState.SELECTED :
                    ButtonState.UP;
                this._itemTouched.setState(c)
            }
            this._itemTouched = null
        }
    },
    _dispatch: function(a, b) {
        if (this._itemTouched && (!this._itemTouched.isMouseEnabled || !1 !== this._itemTouched.isMouseEnabled())) {
            var c = this._callbacks[b],
                d = null,
                e = null;
            if (c)
                for (var f = -1, g = c.length; ++f < g;) d = c[f], e = d.target, e.isVisible() && e.isRunning() && (e == this._itemTouched || lg.isChildOf(this._itemTouched, e)) && d.func.apply(e, [a, this._itemTouched])
        }
    },
    _setButtonState: function(a, b) {
        a.isSelectable() && a.isSelected() && (b = "selected_" + b);
        a.setState(b)
    },
    _sortTargets: function(a, b) {
        return a.getZOrder() == b.getZOrder() ? a.__input__priority > b.__input__priority ? 1 : -1 : a.getZOrder() > b.getZOrder() ? 1 : -1
    },
    onKeyDown: function(a) {},
    onKeyUp: function(a) {},
    onTouchBegan: function(a, b) {
        return this.handleTouchBegan(a)
    },
    onTouchEnded: function(a, b) {
        this.handleTouchEnded(a)
    },
    onTouchMoved: function(a, b) {
        this.handleTouchMoved(a)
    },
    onTouchCancelled: function(a, b) {
        this.handleToucheCanceled(a, b)
    },
    onMouseDown: function(a) {
        this.handleTouchBegan(a)
    },
    onMouseUp: function(a) {
        this.handleTouchEnded(a)
    },
    onMouseMoved: function(a) {
        this.handleTouchMoved(a)
    },
    onMouseDragged: function(a) {
        return !1
    }
});
lg.InputManager.create = function() {
    var a = new lg.InputManager;
    a.init();
    a.checkMouseMove = !0;
    return a
};
lg = lg || {};
F2C_ALIAS = {
    mc: "lg.MovieClip",
    button: "lg.SimpleButton",
    progress: "lg.ProgressBar"
};
lg.AssetsManager = cc.Class.extend({
    framesCache: null,
    displaysCache: null,
    displayDefineCache: null,
    mcsCache: null,
    subAnimsCache: null,
    fontsCache: null,
    init: function() {
        this.framesCache = new buckets.Dictionary;
        this.displaysCache = new buckets.Dictionary;
        this.displayDefineCache = new buckets.Dictionary;
        this.mcsCache = new buckets.Dictionary;
        this.subAnimsCache = new buckets.Dictionary;
        this.fontsCache = new buckets.Dictionary
    },
    createDisplay: function(a, b) {
        this.addPlist(a);
        var c = null,
            d = b,
            e = lg.nameToObject(d);
        if (e) return this._checkCreateFunc(e,
            d), c = e.create(a, b), c.clsName = d, c;
        if (d = this.getDisplayDefine(a, b)) {
            d = d.type;
            if ("null" != d)
                if (e = lg.nameToObject(d)) this._checkCreateFunc(e, d), c = e.create(a, b);
                else if (d = F2C_ALIAS[d], e = lg.nameToObject(d)) this._checkCreateFunc(e, d), c = e.create(a, b);
            null == c && (d = "lg.Animator", c = lg.Animator.create(a, b));
            c.clsName = d
        } else if (d = this.getMc(a, b)) c = lg.MovieClip.create(a, b), c.clsName = "lg.MovieClip";
        else if (c = this.getSubAnims(a, b), c.length) c = lg.MovieClip.create(a, b + "$" + c[0]), c.clsName = "lg.MovieClip";
        else return cc.log("There is no display with assetID: " +
            b + " in plist: " + a), null;
        return c
    },
    _checkCreateFunc: function(a, b) {
        if (null == a.create) throw "Please implement  a create(plistFile, assetID) method for the target class: " + b;
    },
    addPlist: function(a) {
        if (null == a) cc.log("Plist File can't be null!");
        else {
            if (this.framesCache.containsKey(a)) return !1;
            var b = lg.getFileExtension(a);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(a, a.replace("." + b, ".png"));
            var c = [],
                d = cc.FileUtils.getInstance();
            "plist" == b ? (b = d.fullPathForFilename(a), d = d.dictionaryWithContentsOfFileThreadSafe(b)) :
                d = JSON.parse(d.getTextFileData(a));
            var b = d.frames,
                e;
            for (e in b) c.push(e);
            c.sort();
            this.framesCache.set(a, c);
            if (d.hasOwnProperty("displays")) {
                c = d.displays;
                e = [];
                b = null;
                if (c)
                    for (var f in c) e.push(f), b = c[f], b.hasOwnProperty("anchors") && (b.anchors = this._parseAnchors(b.anchors)), this.displayDefineCache.set(a + f, b), this._parseSubAnims(a, f);
                this.displaysCache.set(a, e)
            }
            if (d.hasOwnProperty("mcs")) {
                f = d.mcs;
                for (var g in f) {
                    e = f[g];
                    c = {};
                    c.totalFrames = e.totalFrames;
                    c.labels = e.labels;
                    c.anchorX = e.anchorX;
                    c.anchorY =
                        e.anchorY;
                    c.rect = this._strToRect(e.rect);
                    e.hasOwnProperty("anchors") && (c.anchors = this._parseAnchors(e.anchors));
                    c.children = {};
                    var b = e.children,
                        h;
                    for (h in b) e = b[h], c.children[h] = {}, c.children[h].frames = this._strToArray(e.frames), c.children[h]["class"] = e["class"], c.children[h].zOrder = parseInt(e.zOrder), e.hasOwnProperty("text") && (c.children[h].text = e.text);
                    this.mcsCache.set(a + g, c);
                    this._parseSubAnims(a, g)
                }
            }
            if (d.hasOwnProperty("fonts")) {
                g = d.fonts;
                for (var k in g) this.fontsCache.set(a + k, g[k])
            }
            return !0
        }
    },
    getFrameNames: function(a, b, c) {
        this.framesCache.containsKey(a) || this.addPlist(a);
        a = this.framesCache.get(a);
        if (null == a) return []; - 1 == b && (b = 0); - 1 == c && (c = a.length - 1);
        return a.slice(parseInt(b), parseInt(c) + 1)
    },
    getDisplayDefine: function(a, b) {
        var c = a + b;
        this.displayDefineCache.containsKey(c) || this.addPlist(a);
        return this.displayDefineCache.get(c)
    },
    getDisplayNames: function(a) {
        this.displaysCache.containsKey(a) || this.addPlist(a);
        return this.displaysCache.get(a) || []
    },
    getRandomDisplayName: function(a) {
        a = this.getDisplayNames(a);
        var b = Math.floor(Math.random() * a.length);
        return a[b]
    },
    getMc: function(a, b) {
        var c = a + b;
        this.mcsCache.containsKey(c) || this.addPlist(a);
        return this.mcsCache.get(c)
    },
    getSubAnims: function(a, b) {
        return this.subAnimsCache.get(a + b) || []
    },
    getFont: function(a, b) {
        var c = a + b;
        this.fontsCache.containsKey(c) || this.addPlist(a);
        return this.fontsCache.get(c)
    },
    _parseSubAnims: function(a, b) {
        var c = b.split("$"),
            d = c[0],
            c = c[1];
        if (d && c && "" != d && "" != c) {
            var d = a + d,
                e = this.subAnimsCache.get(d);
            null == e && (e = [], this.subAnimsCache.set(d,
                e));
            e.push(c)
        }
    },
    _parseAnchors: function(a) {
        var b = {},
            c;
        for (c in a) b[c] = this._strToArray(a[c]);
        return b
    },
    _strToArray: function(a) {
        a = a.split("|");
        for (var b = -1, c = []; ++b < a.length;) {
            var d = a[b];
            "null" === d ? c.push(null) : "" === d ? c.push(c[b - 1]) : c.push(this._strToArray2(d))
        }
        return c
    },
    _strToArray2: function(a) {
        a = a.split(",");
        for (var b = 0; b < a.length; b++) a[b] = parseFloat(a[b]);
        return a
    },
    _strToRect: function(a) {
        a = a.split(",");
        return cc.rect(parseFloat(a[0]), parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]))
    }
});
lg.AssetsManager.create = function() {
    var a = new lg.AssetsManager;
    a.init();
    return a
};
lg = lg || {};
lg.TimeLine = cc.Sprite.extend({
    onAnimationOver: null,
    autoDestroyWhenOver: !1,
    autoStopWhenOver: !1,
    autoHideWhenOver: !1,
    autoRecycle: !1,
    plistFile: null,
    currentFrame: 0,
    prevFrame: -1,
    totalFrames: 0,
    frameInterval: 0,
    loopStart: 0,
    loopEnd: 0,
    define: null,
    name: null,
    assetID: null,
    clsName: "lg.TimeLine",
    fps: 30,
    playing: !1,
    inRecycle: !1,
    collider: null,
    collidCenter: null,
    _anchorBindings: null,
    _inited: !1,
    tx: 0,
    ty: 0,
    autoUpdateTileWhenMove: !0,
    tileValue: TileValue.WALKABLE,
    _tileMap: null,
    _tileInited: !1,
    _mouseEnabled: !0,
    _baseAssetID: null,
    _currentSubAnim: null,
    _subAnims: null,
    _animSequence: null,
    init: function() {
        return this._inited ? !1 : this._super() ? (this.doInit(), this._inited = !0, this._anchorBindings = [], this._animSequence = [], this.collidCenter = cc.p(), this.onAnimationOver = new signals.Signal, !0) : !1
    },
    setPlist: function(a, b) {
        if (null == a || null == b) throw "plistFile and assetID can not be null!";
        if (this.plistFile != a || this.assetID != b && this._baseAssetID != b) {
            this.plistFile = a;
            lg.assetsManager.addPlist(a);
            var c = b.split("$");
            this._baseAssetID = c[0];
            this._subAnims = lg.assetsManager.getSubAnims(a,
                this._baseAssetID);
            c = c[1];
            null == c && this._subAnims && (c = this._subAnims[0]);
            b = this._baseAssetID;
            c && (b = this._baseAssetID + "$" + c, this._currentSubAnim = c);
            this.assetID = b;
            if (this.define = this.getDefine()) {
                this.init();
                var c = this.define.anchorX,
                    d = this.define.anchorY;
                isNaN(c) || isNaN(d) || this.setAnchorPoint(c, d);
                this.onNewSheet();
                this.renderFrame(0, !0)
            } else this.init(), cc.log("There is no display named: " + b + " in plist: " + a)
        }
    },
    setParams: function(a) {
        lg.copyProperties(a, this)
    },
    getLabels: function(a) {
        return this.define.labels ?
            this.define.labels[a] : null
    },
    hasLabel: function(a) {
        return null != this.getLabels(a)
    },
    _getAnchor: function(a) {
        return this.define.anchors && (a = this.define.anchors[a], null != a) ? a = a[this.currentFrame] : null
    },
    bindAchor: function(a, b) {
        if (!this.define.anchors || null == this.define.anchors[a] || -1 < this._anchorBindings.indexOf(b)) return !1;
        this._anchorBindings.push(b);
        b.__anchor__ = a;
        b.getParent() != this && (b.removeFromParent(!1), this.addChild(b));
        this._handleAnchorBindings();
        return !0
    },
    getCurrentLabel: function() {
        if (!this.define.labels) return null;
        var a = this.define.labels,
            b = null,
            c;
        for (c in a)
            if (b = a[c], this.currentFrame >= b.start && this.currentFrame <= b.end) return c;
        return null
    },
    play: function() {
        this.loopStart = 0;
        this.loopEnd = this.totalFrames - 1;
        this.updatePlaying(!0);
        this._animSequence.length = 0
    },
    playSequence: function(a) {
        null != a && (a instanceof Array || (a = Array.prototype.slice.call(arguments)), 0 != a.length && (this.gotoAndPlay(a.shift()), this._animSequence = a))
    },
    setSubAnim: function(a, b) {
        if (!a || 0 == a.length || null == this._subAnims || -1 == this._subAnims.indexOf(a)) return !1;
        this._currentSubAnim = a;
        this.setPlist(this.plistFile, this._baseAssetID + "$" + a);
        !1 === b ? this.gotoAndStop(0) : this.gotoAndPlay1(0);
        this._animSequence.length = 0;
        return !0
    },
    gotoAndPlay: function(a) {
        var b = this.getLabels(a);
        if (null == b) {
            if (this.setSubAnim(a, !0)) return !0;
            this.play();
            return !1
        }
        this.loopStart = b.start;
        this.loopEnd = b.end;
        this.updatePlaying(!0);
        this.currentFrame = this.loopStart;
        this._animSequence.length = 0;
        return !0
    },
    gotoAndPlay1: function(a) {
        if (!this.isValideFrame(a)) return cc.log("The frame: " + a + " is out of range!"), !1;
        this.loopStart = 0;
        this.loopEnd = this.totalFrames - 1;
        this.updatePlaying(!0);
        this.currentFrame = a;
        this._animSequence.length = 0;
        return !0
    },
    stop: function() {
        this.updatePlaying(!1)
    },
    gotoAndStop: function(a) {
        if (!this.isValideFrame(a)) return cc.log("The frame: " + a + " is out of range!"), !1;
        this.updatePlaying(!1);
        this.currentFrame = a;
        this.renderFrame(a);
        this._animSequence.length = 0;
        return !0
    },
    gotoAndStop1: function(a) {
        var b = this.getLabels(a);
        return null == b ? this.setSubAnim(a, !1) : this.gotoAndStop(b.start)
    },
    setFPS: function(a) {
        this.fps !=
            a && (this.fps = a, this.updateSchedule())
    },
    updatePlaying: function(a) {
        this.playing != a && (this.playing = a, this.updateSchedule())
    },
    updateSchedule: function() {
        this.playing ? this.schedule(this.onFrame, 1 / this.fps, cc.REPEAT_FOREVER, 0) : this.unschedule(this.onFrame)
    },
    onFrame: function(a) {
        !this.playing || 1 >= this.totalFrames || !this._visible || this.inRecycle || (this.renderFrame(this.currentFrame), this.currentFrame++, this.currentFrame > this.loopEnd && (this.onAnimationOver.getNumListeners() && this.onAnimationOver.dispatch(this),
            this.autoDestroyWhenOver ? (this.updatePlaying(!1), this.destroy()) : this.autoStopWhenOver ? (this.currentFrame = this.loopEnd, this.updatePlaying(!1)) : this.autoHideWhenOver ? (this.currentFrame = this.loopEnd, this.updatePlaying(!1), this.setVisible(!1)) : this._animSequence.length ? (a = this._animSequence.concat(), this.gotoAndPlay(a.shift()), this._animSequence = a) : this.currentFrame = this.loopStart))
    },
    isValideFrame: function(a) {
        return 0 <= a && a < this.totalFrames
    },
    renderFrame: function(a, b) {
        if (this.prevFrame != a || !0 == b) this.prevFrame !=
            a && (this.prevFrame = a), this._handleAnchorBindings(), this.doRenderFrame(a)
    },
    doRenderFrame: function(a) {},
    _handleAnchorBindings: function() {
        for (var a = null, b = null, c = -1, d = this._anchorBindings.length; ++c < d;) a = this._anchorBindings[c], a.isVisible() && (b = this._getAnchor(a.__anchor__), null != b && this._updateAnchorNode(a, b))
    },
    _updateAnchorNode: function(a, b) {
        a.setPosition(b[0], b[1])
    },
    onEnter: function() {
        this._super();
        this.onReset(!0)
    },
    onExit: function() {
        this._super();
        this._tileMap && this._tileMap.removeObject(this);
        lg.inputManager.removeListener(this);
        this.onAnimationOver.removeAll()
    },
    getTileMap: function() {
        return this._tileMap
    },
    setTileMap: function(a) {
        !a || a instanceof lg.TileMap || (a = lg.getTileMap(a));
        if (this._tileMap != a && (this._tileMap && this._tileMap.removeObject(this), this._tileMap = a, null != this._tileMap)) {
            a = this._tileMap.getTileIndexX(this.getPositionX());
            var b = this._tileMap.getTileIndexY(this.getPositionY());
            this.setTile(a, b, !0)
        }
    },
    setPosition: function(a, b) {
        var c = !1;
        void 0 === b ? (c = a.x != this._position._x || a.y !=
            this._position._y) && this._super(a) : (c = a != this._position._x || b != this._position._y) && this._super(a, b);
        if (c && !this.inRecycle) {
            if (this.autoUpdateTileWhenMove && this._tileMap) {
                var c = this._tileMap.getTileIndexX(this.getPositionX()),
                    d = this._tileMap.getTileIndexY(this.getPositionY());
                this.setTile(c, d)
            }
            this.collider = lg.getRect(this, !0);
            this.collidCenter.x = this.collider.x + this.collider.width / 2;
            this.collidCenter.y = this.collider.y + this.collider.height / 2
        }
    },
    setTile: function(a, b, c) {
        if (!0 === c || a != this.tx || b != this.ty) {
            c =
                this.tx;
            var d = this.ty;
            this.tx = a;
            this.ty = b;
            this._tileMap && this._parent && (this._tileMap.removeObject(this, c, d), this.inRecycle || (this._tileMap.addObject(this), this._tileInited = !0))
        }
    },
    destroy: function() {
        this.autoRecycle ? this.inRecycle || lg.ObjectPool.get(this.plistFile, this.clsName, this.__pool__id__ || "").recycle(this) : this.removeFromParent()
    },
    onReset: function(a) {
        this._running && (this.inRecycle = !1, this.setVisible(!0), this._tileMap && !this._tileInited && (this._tileMap.addObject(this), this._tileInited = !0))
    },
    onRecycle: function() {
        this.inRecycle = !0;
        this.autoRecycle = !1;
        this.setZOrder(0);
        this.setScale(1);
        this.setOpacity(255);
        this.setRotation(0);
        this.autoHideWhenOver = this.autoStopWhenOver = this.autoDestroyWhenOver = !1;
        this.setVisible(!1);
        this.stop();
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        this._tileMap && this._tileMap.removeObject(this);
        this._tileInited = !1;
        this.setPosition(-1E3, -1E3);
        this._animSequence.length = 0;
        for (var a = null, b = -1, c = this._anchorBindings.length; ++b < c;) a = this._anchorBindings[b], a.destroy ?
            a.destroy() : a.removeFromParent(!0), delete a.__anchor__;
        this._anchorBindings.length = 0
    },
    isMouseEnabled: function() {
        return this._mouseEnabled
    },
    setMouseEnabled: function(a) {
        this._mouseEnabled = a
    },
    doInit: function() {},
    getDefine: function() {
        return null
    },
    onNewSheet: function() {}
});
lg.TimeLine.create = function(a, b) {
    var c = new lg.TimeLine;
    c.setPlist(a, b);
    c.clsName = "lg.TimeLine";
    return c
};
lg = lg || {};
lg.Animator = lg.TimeLine.extend({
    frameName: null,
    frameNames: null,
    onNewSheet: function() {
        this.frameNames = lg.assetsManager.getFrameNames(this.plistFile, this.define.start, this.define.end);
        this.totalFrames = this.frameNames.length;
        0 == this.totalFrames && cc.log("There is no frame for display: " + this.assetID)
    },
    onEnter: function() {
        this._super()
    },
    doRenderFrame: function(a) {
        (a = cc.SpriteFrameCache.getInstance().getSpriteFrame(this.frameNames[a])) && this.setDisplayFrame(a)
    },
    getDefine: function() {
        return lg.assetsManager.getDisplayDefine(this.plistFile, this.assetID)
    }
});
lg.Animator.create = function(a, b) {
    var c = new lg.Animator;
    c.setPlist(a, b);
    c.clsName = "lg.Animator";
    return c
};
lg = lg || {};
lg.MovieClip = lg.TimeLine.extend({
    autoPlayChildren: !1,
    _namedChildren: null,
    _theRect: null,
    replaceChild: function(a, b) {
        var c = this.define.children[a];
        if (null == c) cc.log("There is no child with named: " + a + "  in MovieClip: " + this.assetID);
        else {
            var d = this._namedChildren[a];
            d ? d.setPlist(this.plistFile, b) : c["class"] = b
        }
    },
    onNewSheet: function() {
        this.removeAllChildren();
        this.totalFrames = this.define.totalFrames;
        this._namedChildren = {};
        this._theRect = lg.rectClone(this.define.rect);
        this.setContentSize(this._theRect.width, this._theRect.height)
    },
    onReset: function(a) {
        this._super(a);
        this._theRect && this.setContentSize(this._theRect._size);
        this.setOpacity(0)
    },
    doRenderFrame: function(a) {
        var b, c, d, e;
        for (e in this.define.children)
            if (c = this.define.children[e], d = c.frames[a], b = this._namedChildren[e], null == d) b && b.setVisible(!1);
            else {
                null == b && (null != c.text ? (b = lg.Label.create(this.plistFile, c["class"], 1), b.setString(c.text)) : b = lg.assetsManager.createDisplay(this.plistFile, c["class"]), b.name = e, this.addChild(b, c.zOrder), this._namedChildren[e] = b, this.autoPlayChildren &&
                    (this.playing ? b.gotoAndPlay1(0) : b.gotoAndStop(0)), this.onNewChild(b));
                c = d[0];
                var f = d[1],
                    g = d[2],
                    h = d[3],
                    k = d[4];
                d = Math.round(255 * d[5]);
                c == b._position._x && f == b._position._y || b.setPosition(c, f);
                g != b._rotationX && b.setRotation(g);
                h == b._scaleX && k == b._scaleY || b.setScale(h, k);
                b instanceof lg.MovieClip || !b.setOpacity || d == b.getOpacity() || b.setOpacity(d);
                b.setVisible(!0);
                this.autoPlayChildren && (this.playing ? b.play() : b.stop())
            }
    },
    stop: function() {
        this._super();
        if (this.autoPlayChildren)
            for (var a in this._namedChildren) {
                var b =
                    this._namedChildren[a];
                b instanceof lg.TimeLine && b.stop()
            }
    },
    play: function() {
        this._super();
        if (this.autoPlayChildren)
            for (var a in this._namedChildren) {
                var b = this._namedChildren[a];
                b instanceof lg.TimeLine && b.play()
            }
    },
    onNewChild: function(a) {},
    getDefine: function() {
        return lg.assetsManager.getMc(this.plistFile, this.assetID)
    },
    getChildByName: function(a, b) {
        void 0 === b && (b = !0);
        var c = this._namedChildren[a];
        if (c) return c;
        if (!b) return null;
        for (var d in this._namedChildren)
            if (c = this._namedChildren[d], c.getChildByName &&
                (c = c.getChildByName(a, b))) return c
    },
    getChildByAssetID: function(a) {
        var b = null,
            c;
        for (c in this._namedChildren)
            if (b = this._namedChildren[c], b.assetID == a) return b;
        return null
    },
    getRect: function(a) {
        if (null == this._theRect) return null;
        if (!0 !== a) return this._theRect;
        a = this._theRect._size.width;
        var b = this._theRect._size.height,
            c = cc.p(this._theRect._origin);
        0 > this._scaleX && (c.x += a);
        0 > this._scaleY && (c.y += b);
        c = this.convertToWorldSpace(c);
        return cc.rect(c.x, c.y, a * Math.abs(this._scaleX), b * Math.abs(this._scaleY))
    },
    getLabelText: function(a, b) {
        var c = this.getChildByName(a, void 0 === b ? !0 : b);
        return c && c instanceof lg.Label ? c.getString() : null
    },
    setLabelText: function(a, b, c) {
        return (a = this.getChildByName(a, void 0 === c ? !0 : c)) && a instanceof lg.Label ? (a.setString(b), !0) : !1
    },
    onRecycle: function() {
        this._super();
        this.autoPlayChildren = !1
    }
});
lg.MovieClip.create = function(a, b) {
    var c = new lg.MovieClip;
    c.setPlist(a, b);
    c.clsName = "lg.MovieClip";
    return c
};
lg = lg || {};
lg.ProgressBar = cc.ClippingNode.extend({
    tweenSpeed: 1E3,
    _bar: null,
    _progress: 1,
    _tempPos: null,
    init: function(a) {
        this._tempPos = new cc.Point;
        this._super(a);
        a = this._bar.getContentSize();
        this.setContentSize(a);
        this.setAnchorPoint(this._bar.getAnchorPoint());
        this._bar.setAnchorPoint(0, 0);
        this._bar.setPosition(cc.POINT_ZERO);
        this._stencil = cc.DrawNode.create();
        a = [cc.p(0, 0), cc.p(a.width, 0), cc.p(a.width, a.height), cc.p(0, a.height)];
        var b = cc.c4f(1, 1, 1, 0);
        this._stencil.drawPoly(a, b, 1, b);
        this.addChild(this._bar);
        this._updateProgress()
    },
    setProgress: function(a) {
        this._progress != a && (this._progress = a, this._updateProgress())
    },
    getProgress: function() {
        return this._progress
    },
    _updateProgress: function() {
        this._tempPos.x = -(1 - this._progress) * this.getContentSize().width;
        this._tempPos.y = this._stencil.getPositionY();
        if (0 < this.tweenSpeed) {
            this._stencil.stopAllActions();
            var a = Math.abs(this._tempPos.x - this.getPositionX()) / this.tweenSpeed;
            this._stencil.runAction(cc.MoveTo.create(a, this._tempPos))
        } else this._stencil.setPosition(this._tempPos)
    }
});
lg.ProgressBar.create = function(a, b) {
    var c = new lg.ProgressBar;
    c._bar = lg.Animator.create(a, b);
    c.init();
    return c
};
SPACE_CHAR_GAP = 10;
lg = lg || {};
lg.Label = cc.SpriteBatchNode.extend({
    mlWidth: 0,
    mlHeight: 0,
    gapScale: 1,
    str: null,
    fontName: null,
    fontSize: 20,
    frames: [],
    chars: [],
    plistFile: null,
    name: null,
    getString: function() {
        return this.str
    },
    setString: function(a) {
        this.str = "" + a;
        this._setString(a)
    },
    getGapScale: function() {
        return this.gapScale
    },
    setGapScale: function(a) {
        a != this.gapScale && (this.gapScale = a, this.str && this._setString(str))
    },
    setFontName: function(a) {
        if (null != a && (null == this.fontName || this.fontName != a)) {
            this.fontName = a;
            a = lg.assetsManager;
            var b = a.getFont(this.plistFile,
                this.fontName);
            this.frames = a.getFrameNames(this.plistFile, parseInt(b.start), parseInt(b.end));
            this.chars = b.chars;
            this.fontSize = parseInt(b.size)
        }
    },
    _setString: function(a) {
        this.removeAllChildren();
        for (a = this.mlHeight = this.mlWidth = 0; a < this.str.length; a++) {
            var b = this.str[a];
            if ("\n" != b)
                if (" " == b) this.mlWidth += SPACE_CHAR_GAP;
                else {
                    for (var c = -1, d = 0; d < this.chars.length; d++)
                        if (this.chars[d] == b) {
                            c = d;
                            break
                        } - 1 == c ? cc.log("Not found the char: " + b + " in the fonts: " + this.fontName) : (b = cc.Sprite.createWithSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame(this.frames[c])),
                        c = b.getContentSize(), b.setPosition(this.mlWidth, 0), this.mlWidth += c.width * this.gapScale, this.mlHeight = c.height > this.mlHeight ? c.height : this.mlHeight, b.setAnchorPoint(0, 1), this.addChild(b))
                }
        }
        this.setContentSize(this.mlWidth, this.mlHeight)
    }
});
lg.Label.create = function(a, b, c) {
    var d = new lg.Label;
    d.plistFile = a;
    d.gapScale = void 0 === c ? 1 : c;
    c = a.replace("." + lg.getFileExtension(a), ".png");
    return d.initWithFile(c, 10) ? (lg.assetsManager.addPlist(a), d.setFontName(b), d) : null
};
var lg = lg || {},
    ButtonState = {
        UP: "up",
        OVER: "over",
        DOWN: "down",
        SELECTED: "selected",
        SELECTED_OVER: "selected_over",
        SELECTED_DOWN: "selected_down",
        DISABLED: "disabled"
    };
lg.SimpleButton = lg.Animator.extend({
    name: null,
    _state: null,
    setState: function(a) {
        this._state != ButtonState.DISABLED && this._state != a && (this._state = a, this.enabled = this._state != ButtonState.DISABLED, this.gotoAndStop1(this._state) || (a = this.isSelected() ? ButtonState.SELECTED : ButtonState.UP, this.gotoAndStop1(a) || this.gotoAndStop(1)))
    },
    getState: function() {
        return this._state
    },
    isSelected: function() {
        return this._state == ButtonState.SELECTED || this._state == ButtonState.SELECTED_OVER || this._state == ButtonState.SELECTED_DOWN
    },
    isSelectable: function() {
        return this.hasLabel(ButtonState.SELECTED)
    },
    setMouseEnabled: function(a) {
        this.isMouseEnabled() != a && this.setState(a ? ButtonState.UP : ButtonState.DISABLED)
    },
    isMouseEnabled: function() {
        return this._state != ButtonState.DISABLED
    }
});
lg.SimpleButton.create = function(a, b) {
    var c = new lg.SimpleButton;
    c.init();
    c.setPlist(a, b);
    c.setState(ButtonState.UP);
    return c
};
lg = lg || {};
lg.TiledImage = cc.SpriteBatchNode.extend({
    tileMap: null,
    tileWidthOffset: -1,
    tileHeightOffset: -1,
    _plistFile: null,
    _taID: null,
    _minWidth: 0,
    _minHeight: 0,
    _pool: null,
    initWithFile: function(a, b) {
        this._super(a, b);
        this.tileMap = lg.TileMap.create("tile_image_" + lg.randInt(0, 1E3));
        return !0
    },
    setTileSource: function(a, b) {
        if (this._plistFile != a || this._taID != b) {
            this._plistFile = a;
            this._taID = b;
            this._pool = lg.ObjectPool.get(a, "lg.Animator");
            var c = lg.assetsManager.createDisplay(this._plistFile, this._taID).getContentSize();
            this.tileMap.setTileSize(c.width +
                this.tileWidthOffset, c.height + this.tileHeightOffset);
            0 < this._minWidth * this._minHeight && (0 < this._children.length ? this._updateTileImg() : this._updateSize())
        }
    },
    setMinSize: function(a, b) {
        0 != (a - this._minWidth) * (b - this._minHeight) && (this._minWidth = a, this._minHeight = b, this._plistFile && this._updateSize())
    },
    _updateTileImg: function() {
        for (var a = null, b = this._children.length, c = -1; ++c < b;) a = this._children[c], a.setPlist(this._plistFile, this._taID)
    },
    _updateSize: function() {
        var a = this.tileMap.setMapSizePixel(this._minWidth,
                this._minHeight),
            b, c = a[0].length;
        if (0 < c) {
            var d;
            for (b = -1; ++b < c;) d = a[0][b], d.destroy()
        }
        c = a[1].length;
        if (0 < c)
            for (b = -1; ++b < c;) this._createTile(a[1][b][0], a[1][b][1]);
        this.setContentSize(this.tileMap.getPixelSize())
    },
    _createTile: function(a, b) {
        var c = this._pool.fetch(this._taID, this);
        c.setAnchorPoint(0.5, 0.5);
        this.tileMap.addObject(c, a, b);
        this.tileMap.snapToTile(c, a, b);
        return c
    }
});
lg.TiledImage.create = function(a, b, c, d) {
    var e = new lg.TiledImage,
        f = a.replace("." + lg.getFileExtension(a), ".png");
    return e.initWithFile(f, 10) ? (e.setTileSource(a, b), isNaN(c) || (c = lg.stage.width()), isNaN(d) || (d = lg.stage.height()), e.setMinSize(c, d), e) : null
};
lg = lg || {};
lg.ScrollingBG = cc.Node.extend({
    source: null,
    assetID: null,
    bg0: null,
    bg1: null,
    _isTiled: null,
    _scrolling: !1,
    _paused: !1,
    _speedX: 0,
    _speedY: 0,
    _d: 1,
    _size: null,
    init: function() {
        if (this._super()) {
            if (null == this.source) return cc.log("Please give a source!"), !1;
            if (null != this.assetID)!0 !== this._isTiled ? (this.bg0 = lg.assetsManager.createDisplay(this.source, this.assetID), this.bg1 = lg.assetsManager.createDisplay(this.source, this.assetID)) : (this.bg0 = lg.TiledImage.create(this.source, this.assetID), this.bg1 = lg.TiledImage.create(this.source, this.assetID));
            else if (this.source)
                if (lg.isImageFile(this.source)) this.bg0 = cc.Sprite.create(this.source), this.bg1 = cc.Sprite.create(this.source);
                else return cc.log("Not support source type!"), !1;
            this.bg0.setAnchorPoint(0, 0);
            this.bg1.setAnchorPoint(0, 0);
            this.addChild(this.bg0);
            this.addChild(this.bg1);
            this._size = this.bg0.getContentSize();
            return !0
        }
        return !1
    },
    startXScroll: function(a) {
        0 == a || this._scrolling || (this._scrolling = !0, this._speedX = a, this._speedY = 0, this._d = 0 < this._speedX ? 1 : -1, this._resetScroll(), this._doScroll())
    },
    startYScroll: function(a) {
        0 == a || this._scrolling || (this._scrolling = !0, this._speedY = a, this._speedX = 0, this._d = 0 < this._speedY ? 1 : -1, this._resetScroll(), this._doScroll())
    },
    pauseScroll: function() {
        this._scrolling && !this._paused && (this._paused = !0, this.bg0.stopAllActions(), this.bg1.stopAllActions(), this.unscheduleAllCallbacks())
    },
    resumeScroll: function() {
        this._scrolling && this._paused && (this._paused = !1, 0 != this._speedX ? this._doScroll(this._size.width - Math.abs(this.bg0.getPositionX())) : 0 != this._speedY && this._doScroll(this._size.height -
            Math.abs(this.bg0.getPositionY())))
    },
    _resetScroll: function() {
        this.bg0.setPosition(0, 0);
        0 != this._speedX ? this.bg1.setPositionX(-this._d * (this._size.width - 1)) : this.bg1.setPositionY(-this._d * (this._size.height - 1))
    },
    _doScroll: function(a) {
        if (0 != a) {
            null == a && (a = 0 != this._speedX ? this._size.width : this._size.height);
            var b = a / Math.abs(this._speedY);
            this.bg0.runAction(cc.MoveBy.create(b, cc.p(0, a * this._d)));
            this.bg1.runAction(cc.MoveBy.create(b, cc.p(0, a * this._d)));
            this.scheduleOnce(function() {
                if (this._scrolling &&
                    !this._paused) {
                    var a = this.bg0;
                    this.bg0 = this.bg1;
                    this.bg1 = a;
                    this._resetScroll();
                    this._doScroll()
                }
            }, b)
        }
    }
});
lg.ScrollingBG.create = function(a, b, c) {
    var d = new lg.ScrollingBG;
    d.source = a;
    d.assetID = b;
    d._isTiled = c;
    return d.init() ? d : null
};
lg = lg || {};
lg.ObjectPool = cc.Class.extend({
    maxCount: 100,
    _clsName: null,
    _cls: null,
    _plistFile: null,
    _pool: null,
    _extraID: "",
    init: function(a, b, c) {
        if (this._plistFile && this._cls) return cc.log("The pool has been inited with cls: " + this._cls), !1;
        this._clsName = b;
        this._cls = lg.nameToObject(b);
        if (null == this._cls) return cc.log("There is no class named: " + b), !1;
        this._plistFile = a;
        this._pool = [];
        void 0 !== c && (this.maxCount = c);
        return !0
    },
    fetch: function(a, b, c) {
        if (null == a) return cc.log("Please give me a assetID to fetch a object!"), null;
        var d = null;
        0 < this._pool.length ? (d = this._pool.shift(), d.setPlist(this._plistFile, a)) : d = this._cls.create(this._plistFile, a);
        d.__pool__id__ = this._extraID;
        d.clsName = this._clsName;
        d.autoRecycle = !0;
        d.setVisible(!0);
        c && lg.copyProperties(c, d);
        a = null;
        c && (a = c.zOrder);
        if (b && d.getParent() != b) d.removeFromParent(!1), b.addChild(d, a);
        else if (isNaN(a) || d.getZOrder() == a || d.setZOrder(a), d.onReset) d.onReset();
        return d
    },
    recycle: function(a) {
        if (a instanceof this._cls)
            if (this._pool.length > this.maxCount) a.removeFromParent();
            else {
                a.setVisible(!1);
                if (a.onRecycle) a.onRecycle();
                this._pool.push(a)
            } else cc.log("The object to recycle is not the same type with this pool: " + this._cls)
    },
    release: function() {
        this._pool.length = 0
    }
});
lg.ObjectPool.all = {};
lg.ObjectPool.create = function(a, b, c) {
    var d = new lg.ObjectPool;
    return d.init(a, b, c) ? d : null
};
lg.ObjectPool.get = function(a, b, c) {
    null == b && (b = "lg.Animator");
    null == c && (c = "");
    var d = a + b + c,
        e = lg.ObjectPool.all[d];
    null == e && (e = lg.ObjectPool.create(a, b), e._extraID = c, lg.ObjectPool.all[d] = e);
    return e
};
lg.ObjectPool.release = function() {
    for (var a in lg.ObjectPool.all) lg.ObjectPool.all[a].release(), delete lg.ObjectPool.all[a]
};
lg = lg || {};
lg.Gun = cc.Node.extend({
    damage: 1,
    speed: 500,
    interval: 0.2,
    count: 1,
    angleGap: 5,
    waveInterval: 1,
    countInWave: 6,
    collideSize: 20,
    isMissle: !1,
    owner: null,
    fireSound: null,
    _plistFile: null,
    _bulletID: null,
    _firing: !1,
    _pool: null,
    _waveTime: 0,
    _fireEffect: null,
    _hitEffect: null,
    _maxShootDistance: 0,
    _bullets: null,
    _targetMap: null,
    onEnter: function() {
        this._super();
        this._pool = lg.ObjectPool.get(this._plistFile, "lg.Animator");
        this._waveTime = this.interval * this.countInWave + this.waveInterval;
        this._maxShootDistance = 1.5 * Math.max(lg.stage.width(), lg.stage.height());
        this._bullets = []
    },
    start: function() {
        this._firing || (this._firing = !0, 0 >= this.waveInterval || 1 >= this.countInWave ? this.schedule(this._createBullet, this.interval) : this._waveFire(), this.scheduleUpdate(), this.schedule(this.update, 0.1, cc.REPEAT_FOREVER))
    },
    end: function() {
        this._firing && (this._firing = !1, this.unschedule(this._createBullet), this.unschedule(this._createWave), this.unschedule(this.update))
    },
    update: function(a) {
        a = this._bullets.length;
        if (0 != a)
            for (var b = null, c = null, d = null, e = -1, f = null, g = !1, h = null, k = null; a--;) {
                b =
                    this._bullets[a];
                f = b.collider;
                g = !1;
                if (!cc.rectIntersectsRect(lg.stage.rect(), f)) g = !0;
                else if (this._targetMap)
                    for (c = this._targetMap.getCoveredTiles1(f, !0), e = -1, h = lg.getPosition(b, !0), k = lg.getRotation(b, !0); ++e < c.length;)
                        if (d = c[e], d != this.owner && !0 !== d.dead && (!this.owner || d.camp != this.owner.camp) && (cc.rectIntersection(d.collider, f), cc.pDistance(h, d.collidCenter) < this.collideSize)) {
                            d.onHit && (d.dead = d.onHit(b));
                            this._showHitEffect(h, k);
                            g = !0;
                            break
                        }
                g && (b.destroy(), this._bullets.splice(a, 1))
            }
    },
    setParams: function(a) {
        null !=
            a && (lg.copyProperties(a, this), this.end(), this.start())
    },
    setTargetMap: function(a) {
        this._targetMap = lg.getTileMap(a)
    },
    setFireEffect: function(a, b) {
        this._fireEffect = lg.assetsManager.createDisplay(a, b);
        this._fireEffect.autoHideWhenOver = !0
    },
    setHitEffect: function(a, b) {
        this._hitEffect = lg.assetsManager.createDisplay(a, b);
        this._hitEffect.autoHideWhenOver = !0
    },
    isFiring: function() {
        return this._firing
    },
    _waveFire: function() {
        this._firing && (this._createWave(), this.schedule(this._createWave, this._waveTime, cc.REPEAT_FOREVER))
    },
    _createBullet: function() {
        if (null == lg.Gun.batchCanvas) cc.log("Pls set batch canvas for me to show the bullet: lg.Gun.batchCanvas!");
        else {
            for (var a = this._maxShootDistance / this.speed, b = this.getParent().convertToWorldSpace(this.getPosition()), c = lg.getRotation(this), d = null, e = -1, f = 0, d = 0, g = lg.createDInts(this.count); ++e < this.count;) d = g[e], f = c + d * this.angleGap, d = this._pool.fetch(this._bulletID, lg.Gun.batchCanvas), d.damage = this.damage, d.play(), d.setPosition(b), d.setRotation(f), d.runAction(cc.MoveBy.create(a,
                lg.getPointOnCircle(this._maxShootDistance, f))), this._bullets.push(d);
            this._showFireEffect(b, c);
            this.fireSound && lg.playSound(this.fireSound)
        }
    },
    _createWave: function() {
        this.schedule(this._createBullet, this.interval, this.countInWave - 1)
    },
    _showFireEffect: function(a, b) {
        this._fireEffect && (null == this._fireEffect.getParent() && lg.Gun.batchCanvas.addChild(this._fireEffect, 100), this._fireEffect.setVisible(!0), this._fireEffect.setPosition(a), this._fireEffect.setRotation(b), this._fireEffect.gotoAndPlay1(1))
    },
    _showHitEffect: function(a,
        b) {
        this._hitEffect && (null == this._hitEffect.getParent() && lg.Gun.batchCanvas.addChild(this._hitEffect, 100), this._hitEffect.setVisible(!0), this._hitEffect.setPosition(a), this._hitEffect.setRotation(b), this._hitEffect.gotoAndPlay1(1))
    }
});
lg.Gun.batchCanvas = null;
lg.Gun.create = function(a, b) {
    var c = new lg.Gun;
    return c.init() ? (c._plistFile = a, c._bulletID = b, c) : null
};

function showSplash(a, b) {
    SplashScene.action = a;
    SplashScene.startScene = b;
    lg.registerScene("splash", SplashScene.scene);
    lg.replaceScene("splash")
}
var SplashScene = cc.Layer.extend({
    onEnter: function() {
        this._super();
        var a = cc.Sprite.create("res/a10/Splash_Image.png");
        a.setScale(0.8);
        a.setPosition(lg.stage.center());
        this.addChild(a);
        a.runAction(cc.FadeIn.create(0.5));
        this.scheduleOnce(function() {
            lg.replaceScene(SplashScene.startScene)
        }, 3);
        this.scheduleOnce(function() {
            a.runAction(cc.FadeOut.create(0.5))
        }, 2.5);
        lg.inputManager.addListener(a, SplashScene.action)
    }
});
SplashScene.action = null;
SplashScene.startScene = null;
SplashScene.create = function() {
    var a = new SplashScene;
    a.init();
    return a
};
SplashScene.scene = function() {
    var a = cc.Scene.create();
    a.addChild(SplashScene.create());
    return a
};

function goMoreGame() {
    if (a10Enabled)
        if (a10Remote) {
            var a = GameAPI.Branding.getLink("more_games");
            !a.error && a.action && a.action()
        } else window.open("undefined" != typeof inZibbo ? "http://zibbo.com" : "http://a10.com");
    else window.open("http://longames.com")
}

function _fetchLogo(a, b, c) {
    var d = GameAPI.Branding.getLogo();
    if (d.error) cc.log("API error: " + d.error);
    else if (d.image) {
        var e = new Image;
        e.src = d.image;
        if (null == d.width) {
            var f = d.image.split("_"),
                f = f[f.length - 1],
                f = f.split(".png"),
                f = f[0],
                f = f.split("x");
            d.width = parseInt(f[0]);
            d.height = parseInt(f[1])
        }
        e.width = d.width;
        e.height = d.height;
        var g;
        e.addEventListener("load", g = function() {
            var f = new cc.Texture2D;
            f.initWithElement(e);
            f.handleLoadedTexture();
            f = cc.Sprite.createWithTexture(f);
            f.setScale(cc.CONTENT_SCALE_FACTOR());
            this.removeEventListener("load", g, !1);
            b.addChild(f, 9999999);
            f.setAnchorPoint(0, 0);
            f.setPosition(a);
            c && c.apply(b, [f, d.action]);
            lg.inputManager.addListener(f, function() {
                d.action()
            })
        })
    } else cc.log("API does not return a logo image!")
}
var LogoButton = lg.SimpleButton.extend({
    onEnter: function() {
        this._super();
        //this.setVisible(a10Enabled);
        //a10Enabled && a10Remote ? (this.setVisible(!1), _fetchLogo(cc.pAdd(this.getPosition(), cc.p(-20, 0)), this.getParent())) : lg.inputManager.addListener(this, goMoreGame)
    }
});
LogoButton.create = function(a, b) {
    var c = new LogoButton;
    c.setPlist(a, b);
    return c
};
// var MoreGameButton = lg.SimpleButton.extend({
//     onEnter: function() {
//         this._super();
//         lg.inputManager.addListener(this, goMoreGame)
//     }
// });
// MoreGameButton.create = function(a, b) {
//     var c = new MoreGameButton;
//     c.setPlist(a, b);
//     return c
// };
Global = Global || {};
Global.score = 0;
Global.gameOver = !1;
Global.gamePause = !1;
Global.scrollSpeed = -40;
Global.signals = {
    gamePause: new signals.Signal,
    gameResume: new signals.Signal,
    gameOver: new signals.Signal
};
Global.gun0 = {
    damage: 1,
    speed: 600,
    interval: 0.15,
    count: 1,
    angleGap: 5,
    waveInterval: 0.3,
    countInWave: 6,
    collideSize: 20,
    isMissle: !1
};
Global.gun1 = {
    damage: 1,
    speed: 350,
    interval: 2,
    count: 1,
    angleGap: 5,
    waveInterval: 0,
    countInWave: 6,
    collideSize: 20,
    isMissle: !1
};
Global.gun2 = {
    damage: 3,
    speed: 300,
    interval: 3,
    count: 2,
    angleGap: 5,
    waveInterval: 0,
    countInWave: 6,
    collideSize: 20,
    isMissle: !1
};
Global.gun3 = {
    damage: 3,
    speed: 250,
    interval: 4,
    count: 1,
    angleGap: 5,
    waveInterval: 0,
    countInWave: 6,
    collideSize: 20,
    isMissle: !1
};
var music = {
        menu: "res/music/menu.mp3",
        prop: "res/music/prop.mp3",
        scream: "res/music/scream.wav",
        shot: "res/music/shot.wav"
    },
    res = {
        soldiers_plist: "res/Soldiers.json",
        soldiers_png: "res/Soldiers.png",
        prop_plist: "res/Props.json",
        prop_png: "res/Props.png",
        ui_plist: "res/ui.json",
        ui_png: "res/ui.png",
        logo: "res/logo.png",
        bg: "res/bg.jpg"
    },
    res_mainmenu = [{
        src: music.menu
    }, {
        src: music.prop
    }, {
        src: music.scream
    }, {
        src: music.shot
    }],
    res_maingame = [{
        src: res.bg
    }, {
        src: res.soldiers_plist
    }, {
        src: res.soldiers_png
    }, {
        src: res.ui_plist
    }, {
        src: res.ui_png
    }, {
        src: res.prop_plist
    }, {
        src: res.prop_png
    }],
    allResource = res_maingame.concat(res_mainmenu);
var HeroCamp = {
        player: "Player",
        enemy: "Enemy",
        neutral: "Neutral"
    },
    ShootAngles = [0, 45, 90, 135, 180, 225, 270, 315],
    Hero = lg.Animator.extend({
        camp: "Player",
        maxHealth: 5,
        health: 5,
        dead: !1,
        gunParam: null,
        _guns: null,
        _numId: 1,
        _bulletID: Number,
        _shooting: !1,
        _target: null,
        _prevAngle: 0,
        _score: null,
        _hp: null,
        _inArmor: !1,
        _moveRate: 1,
        _moving: !1,
        onReset: function(a) {
            if (this._running) {
                this._super(a);
                this._numId = this.assetID.slice(this.camp.length);
                this._bulletID = this.camp + "Bullet" + this._numId;
                a && null == lg.Gun.batchCanvas && (lg.Gun.batchCanvas =
                    cc.SpriteBatchNode.create(res.prop_plist, 100), null == lg.Gun.batchCanvas.getParent() && this.getParent().addChild(lg.Gun.batchCanvas, 10));
                this._guns = [];
                a = ["wepon", "wepon0", "wepon1"];
                for (var b = -1, c = a.length, d = null, e = null; ++b < c;) d = a[b], e = lg.Gun.create(res.prop_plist, this._bulletID), this.bindAchor(d, e) && (e.owner = this, e.setTargetMap("heros"), this._guns.push(e), this.camp == HeroCamp.player && (e.fireSound = music.shot), e._bulletID = this._bulletID, e.setFireEffect(res.prop_plist, "FireEffect3"), e.setHitEffect(res.prop_plist,
                    "HitEffect"), this.gunParam && e.setParams(this.gunParam));
                this.camp == HeroCamp.player ? Hero.players.push(this) : Hero.enemies.push(this);
                this.camp == HeroCamp.enemy && this.schedule(this._updateShootAngle, 0.5, cc.REPEAT_FOREVER);
                this.health = this.maxHealth;
                this._inArmor = this.dead = !1;
                this.beginShoot();
                this.camp == HeroCamp.enemy && this._updateShootAngle()
            }
        },
        onRecycle: function() {
            this._super();
            this.stopShoot();
            this.gotoAndStop1("attack");
            var a = this.camp == HeroCamp.player ? Hero.players : Hero.enemies,
                b = a.indexOf(this); - 1 < b && a.splice(b, 1)
        },
        doInit: function() {
            this._super();
            this.setTileMap("heros")
        },
        beginShoot: function() {
            this._shooting = !0;
            for (var a = -1, b = this._guns.length; ++a < b;) this._guns[a].start()
        },
        stopShoot: function() {
            this.stop();
            this._shooting = !1;
            for (var a = -1, b = this._guns.length; ++a < b;) this._guns[a].end()
        },
        setGunParam: function(a, b) {
            var c = this._deltaGunParam(a);
            this.scheduleOnce(function() {
                this._deltaGunParam(c)
            }, b)
        },
        _deltaGunParam: function(a) {
            var b = {},
                c = 0,
                d;
            for (d in a) c = a[d] + this._guns[0][d], 0 >= c ? delete a[d] : (b[d] = -a[d], a[d] = c);
            c = this._guns.length;
            for (d = null; c--;) d = this._guns[c], d.setParams(a);
            return b
        },
        onHeal: function(a) {
            this.health += a;
            this.health > this.maxHealth && (this.health = this.maxHealth);
            this.camp == HeroCamp.player && this._hp && this._hp.setProgress(this.health / this.maxHealth);
            a = lg.ObjectPool.get(res.prop_plist).fetch("HealEffect", this.getParent(), {
                zOrder: this.getZOrder() + 1
            });
            a.autoDestroyWhenOver = !0;
            a.gotoAndPlay1(0);
            a.setPosition(this.getPosition())
        },
        onArmor: function(a) {
            var b = lg.assetsManager.createDisplay(res.prop_plist,
                "HealCircle");
            b.play();
            b.setPosition(this.getAnchorPointInPoints());
            this.addChild(b, 2);
            this._inArmor = !0;
            this.scheduleOnce(function() {
                this._inArmor = !1;
                b.removeFromParent()
            }, a)
        },
        onHit: function(a) {
            if (!Global.gamePause && !this._inArmor) {
                this.health -= a.damage;
                if (0 >= this.health) return this.stopShoot(), this.autoStopWhenOver = !0, this.gotoAndPlay("death"), this.scheduleOnce(this.destroy, 1.8), this.stopAllActions(), this.runAction(cc.MoveBy.create(this.getPositionY() / Math.abs(Global.scrollSpeed), cc.p(0, -this.getPositionY()))),
                    this.health = 0, this.camp == HeroCamp.enemy ? (Global.score += 10 * this.maxHealth, this._score.setString(Global.score), lg.playSound(music.scream)) : (Global.gameOver = !0, Global.signals.gameOver.dispatch()), !0;
                this.camp == HeroCamp.player && this._hp && this._hp.setProgress(this.health / this.maxHealth);
                return !1
            }
        },
        _getEniemies: function() {
            return this.camp == HeroCamp.player ? Hero.enemies : Hero.players
        },
        _updateShootAngle: function() {
            if (!(this.dead || Global.gamePause || Global.gameOver) && 0 != Hero.players.length) {
                null == this._target &&
                    (this._target = lg.getRandomInArray(Hero.players));
                for (var a = -1, b = this._guns.length, c = null; this._target && ++a < b;) {
                    var c = this._guns[a],
                        d = lg.getAngle(c.getParent().convertToWorldSpace(c.getPosition()), this._target.collidCenter);
                    0 > d && (d += 360);
                    c.setRotation(d);
                    c = this._findShootAngle(d);
                    this.gotoAndPlay("" + c)
                }
            }
        },
        _findShootAngle: function(a) {
            0 > a && (a += 360);
            return ShootAngles[328.25 <= a || 31.75 > a ? 0 : 76.75 > a ? 1 : 103.25 > a ? 2 : 148.25 > a ? 3 : 211.75 > a ? 4 : 256.75 > a ? 5 : 283.25 > a ? 6 : 7]
        }
    });
Hero.players = [];
Hero.enemies = [];
Hero.create = function(a, b, c) {
    var d = new Hero;
    d.camp = c;
    d.setPlist(a, b);
    return d
};
var ControlBar = lg.MovieClip.extend({
    soundBtn: null,
    pauseBtn: null,
    lastActionTime: -1,
    inIdle: !1,
    _intstacne: null,
    onEnter: function() {
        this._super();
        this.soundBtn = this.getChildByName("soundBtn");
        this.pauseBtn = this.getChildByName("pauseBtn");
        lg.inputManager.addListener(this, this.onItemTouched);
        lg.getSoundEnabled() || this.soundBtn.setState(ButtonState.SELECTED);
        this.pauseBtn.setVisible("mainGame" == lg.currentSceneName);
        "mainGame" == lg.currentSceneName && this.pauseBtn.setState(ButtonState.SELECTED)
    },
    onExit: function() {
        this._super();
        this._instance = null
    },
    onItemTouched: function(a, b) {
			console.log(!this.pauseBtn.isSelected());
        if (b == this.pauseBtn) {
            var c = !this.pauseBtn.isSelected();
            if (c == true) {
                //PKplay: pause
                pkGame.reportStatus('pause');
            };
            lg.setSoundEnabled(!c);
            lg.getSoundEnabled() ? this.soundBtn.setState(ButtonState.UP) : this.soundBtn.setState(ButtonState.SELECTED);
            c ? (Global.signals.gamePause.dispatch(), a10Enabled && GameAPI.GameBreak.request(function() {
                cc.log("start ad")
            }, function() {
                cc.log("end ad")
            })) : Global.signals.gameResume.dispatch()
            
        } else b == this.soundBtn && lg.setSoundEnabled(!b.isSelected())
    }
});
ControlBar.create = function(a, b) {
    var c = new ControlBar;
    c.setPlist(a, b);
    return this._instance = c
};
ControlBar.getInstance = function() {
    return this._instance
};
var MainMenu = lg.MovieClip.extend({
    onReset: function(a) {
        this._super(a);
        a = this.getChildByName("startBtn");
        this.getChildByName("moreBtn");
        lg.inputManager.addListener(a, function() {
            lg.playMusic(music.menu, !0);
            lg.replaceScene("mainGame")
        })
        //PKplay: Starting
        pkGame.reportStatus('start');
    }
});
MainMenu.create = function(a, b) {
    var c = new MainMenu;
    c.setPlist(a, b);
    return c
};
MainMenu.scene = function() {
    var a = cc.Scene.create(),
        b = lg.assetsManager.createDisplay(res.ui_plist, "MainMenu");
    a.addChild(b);
    return a
};
var GameResult = lg.MovieClip.extend({
    onEnter: function() {
        //PK: Game Over
        updateShareScore(Global.score);
        //PK: console.log('score: '+Global.score);
        this._super();
        var a = this.getChildByName("replayBtn");
        this.getChildByName("moreBtn");
        lg.inputManager.addListener(a, function(a, c) {
            //PK: Click Pause
            lg.replaceScene("mainMenu")
        });
        this.getChildByName("scoreTxt").setString(Global.score)
    },
    onClick: function() {}
});
GameResult.create = function(a, b) {
    var c = new GameResult;
    c.setPlist(a, b);
    return c
};
PROP_NAMES = "SpeedProp SpeedProp SpeedProp MultiProp MultiProp MultiProp HealProp HealProp ArmorProp ArmorProp".split(" ");
var BattleScene = cc.Layer.extend({
    _bgLayer: null,
    _heroLayer: null,
    _player: null,
    _tiles: null,
    _heroMap: null,
    _totalTime: 0,
    _lastHTime: -1,
    _hpBar: null,
    _scoreTxt: null,
    _props: [],
    _topBar: null,
    onEnter: function() {
        this._super();
        this.createBg();
        Global.score = 0;
        Global.gameOver = Global.gamePause = !1;
        Hero.players = [];
        Hero.enemies = [];
        lg.Gun.batchCanvas = null;
        this._totalTime = 0;
        this._heroLayer = cc.Node.create();
        this.addChild(this._heroLayer);
        this._topBar = lg.assetsManager.createDisplay(res.ui_plist, "TopBar");
        this.getParent().addChild(this._topBar);
        this._topBar.getChildByName("moreBtn").setVisible(!1);
        this._hpBar = this._topBar.getChildByName("hp");
        this._hpBar.setProgress(1);
        this._scoreTxt = this._topBar.getChildByName("scoreTxt");
        this._scoreTxt.setString(Global.score);
        this._heroMap = lg.getTileMap("heros");
        this._player = lg.ObjectPool.get(res.soldiers_plist, "Hero").fetch("Player1", this._heroLayer, {
            gunParam: Global.gun0,
            camp: HeroCamp.player,
            maxHealth: 50
        });
        this._player.setPosition(lg.stage.bottom());
        this._player.gotoAndPlay("attack");
        this._player._hp =
            this._hpBar;
        for (var a = -1; 3 > ++a;) this.createEnemy();
        this.schedule(function() {
            this.createEnemy()
        }, 1, cc.REPEAT_FOREVER);
        this.setMouseEnabled(!0);
        lg.inputManager.addListener(this, this.onMouseMove, InputType.move);
        lg.inputManager.addListener(this, this.onItemTouched, InputType.press);
        this.scheduleUpdate();
        Global.signals.gamePause.add(this.pause, this);
        Global.signals.gameResume.add(this.resume, this);
        Global.signals.gameOver.add(this.over, this)
    },
    pause: function() {
        Global.gamePause || (Global.gamePause = !0, cc.Director.getInstance().pause(),
            this._topBar.getChildByName("moreBtn").setVisible(!0))
    },
    resume: function() {
        Global.gamePause && (Global.gamePause = !1, cc.Director.getInstance().resume(), this._topBar.getChildByName("moreBtn").setVisible(!1))
    },
    over: function() {
        ControlBar.getInstance().setMouseEnabled(!1);
        for (var a = Hero.enemies.length, b = null; a--;) b = Hero.enemies[a], b.stopShoot(), b.stop(), this._stopMoveWithBG(b);
        for (a = this._props.length; a--;) b = this._props[a], this._stopMoveWithBG(b);
        this._bgLayer.pauseScroll();
        this._player.gotoAndPlay("death");
        this.scheduleOnce(function() {
            var a = lg.assetsManager.createDisplay(res.ui_plist, "GameResult");
            this.addChild(a, 1E3)
        }, 1.8)
    },
    onExit: function() {
        this._super();
        lg.inputManager.removeListener(this);
        Global.signals.gamePause.remove(this.pause, this);
        Global.signals.gameResume.remove(this.resume, this);
        Global.signals.gameOver.remove(this.over, this)
    },
    createBg: function() {
        this._bgLayer = lg.ScrollingBG.create(res.bg);
        this.addChild(this._bgLayer);
        this._bgLayer.startYScroll(Global.scrollSpeed)
    },
    createEnemy: function(a,
        b, c, d) {
        if (!(Global.gamePause || Global.gameOver || (this._totalTime += 1, Hero.enemies.length > 5 + this._totalTime / 15 && !0 !== d))) {
            if (void 0 === a || isNaN(a)) a = lg.randInt(1, 4);
            d = "Enemy" + a;
            d = lg.ObjectPool.get(res.soldiers_plist, "Hero").fetch(d, this._heroLayer, {
                gunParam: Global["gun" + a],
                camp: HeroCamp.enemy,
                maxHealth: [0, 3, 5, 5][a],
                __moving__: !1
            });
            d._score = this._scoreTxt;
            void 0 === b && (c = this._getRandomEmptyTile(), b = c.x, c = c.y);
            this._heroMap.snapToTile(d, b, c);
            d.getPositionY();
            d.gotoAndPlay("180");
            d.beginShoot();
            d._moveRate =
                1 == a ? 1.4 : 1;
            this._moveWithBG(d)
        }
    },
    _getRandomEmptyTile: function() {
        this._tiles = this._heroMap.getTiles(this._tilesCanSporn);
        return lg.getRandomInArray(this._tiles)
    },
    _hHormation: function(a) {
        var b = [1, 3, 5, 7];
        0.5 > Math.random() && (b = [2, 4, 6]);
        for (var c = -1, d, e = lg.randInt(1, 4); ++c < b.length;) d = b[c], this._heroMap.isEmptyTile(d, a) && this.createEnemy(e, b[c], a, !0)
    },
    _tHormation: function(a) {
        for (var b = 0.5 > Math.random() ? -1 : 1, c = lg.getRandomInArray([3, 5, 7]), d = lg.createDInts(c, Math.floor(this._heroMap._mapWidth / 2)), e = -1, f,
            g = lg.randInt(1, 4); ++e < c;) f = d[e], 0 != e % 2 && (a += b), this._heroMap.isEmptyTile(f, a) && this.createEnemy(g, f, a, !0)
    },
    _tilesCanSporn: function(a, b, c) {
        return 0 == b || b == a._mapWidth - 1 || c < a._mapHeight / 2 ? !1 : a.isEmptyTile(b, c)
    },
    createProp: function() {
        if (!(Global.gamePause || Global.gameOver || 0 < this._props.length)) {
            var a = Math.floor(this._totalTime / 10),
                a = Math.min(a, PROP_NAMES.length),
                a = PROP_NAMES[lg.randInt(0, a)],
                a = lg.ObjectPool.get(res.prop_plist).fetch(a, this._heroLayer, {
                    __moving__: !1
                }),
                b = this._getRandomEmptyTile();
            this._heroMap.snapToTile(a,
                b.x, b.y);
            this._props.push(a);
            this._moveWithBG(a);
            a.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(0.2, 1.2, 1.2), cc.ScaleTo.create(0.2, 1, 1))))
        }
    },
    _moveWithBG: function(a) {
        if (!0 != a.__moving__) {
            a.__moving__ = !0;
            var b = a._moveRate;
            void 0 === b && (a._moveRate = 1);
            var c = a.getPositionY(),
                b = c / (Math.abs(Global.scrollSpeed) * a._moveRate);
            a.runAction(cc.MoveBy.create(b, cc.p(0, -c)));
            a.scheduleOnce(function() {
                a.__moving__ && (c = a.getPositionY(), 5 < c || a.destroy())
            }, b)
        }
    },
    _stopMoveWithBG: function(a) {
        !1 !=
            a.__moving__ && (a.__moving__ = !1, a.stopAllActions())
    },
    update: function(a) {
        if (!Global.gamePause) {
            a = null;
            for (var b = this._props.length; b--;)
                if (a = this._props[b], a.inRecycle) this._props.splice(b, 1);
                else if (lg.ifCollide(a, this._player)) {
                a.destroy();
                this._props.splice(b, 1);
                if ("SpeedProp" == a.assetID) this._player.setGunParam({
                    interval: -0.05,
                    waveInterval: -0.1
                }, 10);
                else if ("MultiProp" == a.assetID) this._player.setGunParam({
                    count: 1
                }, 10);
                else if ("HealProp" == a.assetID) this._player.onHeal(10);
                else if ("ArmorProp" == a.assetID) this._player.onArmor(10);
                lg.playSound(music.prop)
            }
            this._lastHTime != this._totalTime && (20 < this._totalTime && 0 == this._totalTime % 10 && 0.8 > Math.random() && this.createProp(), 20 < this._totalTime && 0 == this._totalTime % 10 && (0.5 > Math.random() ? this._tHormation(12) : this._hHormation(12), this._lastHTime = this._totalTime))
        }
    },
    onItemTouched: function(a, b) {},
    onPress: function(a) {},
    onClick: function(a) {},
    onMouseMove: function(a, b) {
        if (!Global.gamePause) {
            var c = a.getLocation();
            this._player && this._player.setPosition(Math.min(lg.stage.width() - 70, Math.max(70,
                c.x)), c.y)
        }
    }
});
BattleScene.create = function() {
    var a = new BattleScene;
    a.init();
    return a
};
BattleScene.scene = function() {
    var a = cc.Scene.create(),
        b = BattleScene.create();
    a.addChild(b);
    return a
};
var cocos2dApp = cc.Application.extend({
        config: document.ccConfig,
        ctor: function(a) {
            this._super();
            this.startScene = a;
            cc.COCOS2D_DEBUG = this.config.COCOS2D_DEBUG;
            cc.setup(this.config.tag);
            cc.AppController.shareAppController().didFinishLaunchingWithOptions()
        },
        applicationDidFinishLaunching: function() {
            var a = cc.Director.getInstance();
            cc.EGLView.getInstance().adjustViewPort(!0);
            cc.EGLView.getInstance().setDesignResolutionSize(cc.canvas.width, cc.canvas.height, cc.RESOLUTION_POLICY.SHOW_ALL);
            cc.EGLView.getInstance().resizeWithBrowserSize(!0);
            a.setDisplayStats(this.config.showFPS);
            cc.Browser.isMobile ? a.setAnimationInterval(0.02) : a.setAnimationInterval(1 / this.config.frameRate);
            initGame();
            return !0
        }
    }),
    myApp = new cocos2dApp;

function initGame() {
    lg.registerScene("mainMenu", MainMenu.scene, res_mainmenu);
    lg.registerScene("mainGame", BattleScene.scene, res_maingame);
    var a = lg.TileMap.create("heros");
    a.autoLayout = !0;
    a.setTileSize(74, 74);
    a.setMapSizePixel(lg.stage.width(), lg.stage.height());
    lg.registerTileMap(a);
    lg.startGame("mainMenu")
};
/*! Quacky McFly - Game by Alectora v1.1.2.5738 Copyright (c) 2014 Alectora. Designed and developed by Arly Rampen. */
;

function convertSlash(e, t) {
    return t ? e.replace(/\//g, "\\") : e.replace(/\/|\\|\\\\/g, "/")
}

function fileName(e, t, n) {
    var r = n ? convertSlash(e, !0).split("\\") : convertSlash(e).split("/");
    return t ? r[r.length - 1] : r[r.length - 1].split(".")[0]
}

function fnName(e) {
    return e.toString().match(/^function ([^(]+)/)[1]
}

function literalToArray(e) {
    var t = [];
    for (var n in e) t.push(e[n]);
    return t
}

function isEmpty(e) {
    return e === null || e === "" || e === undefined || e === {} || e === 0
}

function isArray(e) {
    return typeof e != "undefined" ? e.constructor == Array : !1
}

function isFunction(e) {
    return typeof e == "function"
}

function isLiteral(e) {
    var t = e;
    return typeof e != "object" || e === null ? !1 : function () {
        for (; ;)
            if (Object.getPrototypeOf(t = Object.getPrototypeOf(t)) === null) break;
        return Object.getPrototypeOf(e) === t
    }()
}

function inArray(e, t, n) {
    if (t) {
        if (Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e, n);
        for (n ? n < 0 ? Math.max(0, t.length + n) : n : 0; n < t.length; n++)
            if (n in t && t[n] === e) return n
    }
    return -1
}

function prefixArray(e, t) {
    if (e)
        for (var n = 0; n < e.length; n++) e[n] = t + e[n];
    return e
}

function count(e) {
    var t = 0;
    for (var n in e) e.hasOwnProperty(n) && ++t;
    return t
}

function merge(e, t) {
    if (e instanceof Array || t instanceof Array) {
        var n = e.length,
            r = 0;
        if (typeof t.length == "number")
            for (var i = t.length; r < i; r++) e[n++] = t[r];
        else
            while (t[r] !== undefined) e[n++] = t[r++];
        return e.length = n, e
    }
    if (e && t)
        for (var s in t) e[s] = t[s];
    return e
}

function proxy(e, t) {
    return function () {
        return e.apply(t, arguments)
    }
}

function clone(e, t) {
    if (e === null || typeof e != "object") return e;
    if (!t) {
        var n = (function () {
        }) || e.constructor;
        for (var r in e) e.hasOwnProperty(r) && (n.prototype[r] = e[r]);
        return t ? n : new n
    }
    return null
}

function param(e, t) {
    var n = e ? e.indexOf("?") === -1 ? "?" : e.indexOf("=") === -1 ? "" : "&" : "";
    for (var r in t) t.hasOwnProperty(r) && (n += r + "=" + t[r] + "&");
    return n.replace(/&$/g, "")
}
var APP_NAME = "Quacky McFly - Game by Alectora",
    APP_VERSION = "1.1.2.5738",
    ASSET_URL = "asset/",
    ENV = {
        release: 1
    },
    LOG_TYPE = {
        engine: 0
    },
    Tile = {
        REPEAT: "repeat",
        REPEAT_X: "repeat-x",
        REPEAT_Y: "repeat-y",
        NO_REPEAT: "no-repeat"
    },
    CompositeOperation = {
        DESTINATION_OVER: "destination-over",
        SOURCE_OVER: "source-over"
    },
    Direction = {
        UP: -1,
        DOWN: 1,
        LEFT: -1,
        RIGHT: 1
    },
    TEXTURE_URL = ASSET_URL + "texture/",
    MUSIC_URL = ASSET_URL + "sound/music/",
    FX_URL = ASSET_URL + "sound/fx/",
    HALF = .5,
    at;
(function (e) {
    function t(t, n) {
        (t ? window.innerHeight < window.innerWidth : window.innerWidth < window.innerHeight) ? e.onOrientationChangedCallback() : e.onOrientationReturnedCallback()
    }

    function n(t, n, r) {
        e.orientationChecker(!0, t);
        var i = window.innerWidth / window.innerHeight;
        r ? (t.height = e.ADAPTIVE_SCREEN_RESOLUTION, t.style.width = window.innerWidth + "px", window.innerWidth / n < window.innerHeight ? (t.width = t.height * n, t.style.height = window.innerWidth / n + "px", t.style.marginTop = window.innerHeight / 2 - window.innerWidth / n / 2 + "px") : (t.width = t.height * i, t.style.height = "100%", t.style.marginTop = "0px")) : (t.width = e.ADAPTIVE_SCREEN_RESOLUTION, t.style.height = window.innerHeight + "px", window.innerWidth / n < window.innerHeight ? (t.height = t.width / i, t.style.width = window.innerHeight * i + "px", t.style.marginLeft = "0px") : (t.height = t.width * n, t.style.width = window.innerHeight / n + "px", t.style.marginLeft = window.innerWidth / 2 - window.innerHeight / n / 2 + "px"));
        for (var s = 0; s < e.onAdjustScreenCallbacks.length; ++s) e.onAdjustScreenCallbacks[s]()
    }

    e.FUTURE_TIMEOUT = 4, e.ADAPTIVE_SCREEN_RESOLUTION = 640, e.images = [], e.isPaused = !1, e.onAdjustScreenCallbacks = [], e.onOrientationChangedCallback = function () {
    }, e.onOrientationReturnedCallback = function () {
    }, e.orientationChecker = t, e.adjustScreen = n
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function e() {
        }

        return e.start = 0, e.last = 0, e.time = 0, e.delta = 0, e.scale = 1, e
    }();
    e.Time = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function e(t) {
            this.id = e.releasedIdList.length ? e.releasedIdList.pop() : ++e._lastCreatedId, this.name = t || ""
        }

        return e._lastCreatedId = -1, e.releasedIdList = [], e
    }();
    e.ObjectInfo = t
})(at || (at = {}));
var __extends = this.__extends || function (e, t) {
        function r() {
            this.constructor = e
        }

        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        r.prototype = t.prototype, e.prototype = new r
    },
    at;
(function (e) {
    var t = function (t) {
        function n(e) {
            t.call(this, e), this.isActive = !0, this.parent = null, this.tags = [], this.children = [], this.inactiveChildren = {}
        }

        return __extends(n, t), n.prototype._performChildRemove = function (t) {
            this.children[t].removeChildren(), e.ObjectInfo.releasedIdList.push(this.children[t].id), this.children.splice(t, 1)
        }, n.prototype.reset = function () {
        }, n.prototype.addTag = function (e) {
            this.tags.push(e)
        }, n.prototype.addTags = function (e) {
            for (var t = 0; t < e.length; ++t) this.tags.push(e[t])
        }, n.prototype.countTag = function () {
            return this.tags.length
        }, n.prototype.activate = function () {
            return this.isActive || (this.parent && (this.parent.children.push(this.parent.inactiveChildren[this.id]), delete this.parent.inactiveChildren[this.id]), this.isActive = !0), this
        }, n.prototype.deactivate = function () {
            if (this.isActive) {
                if (this.parent)
                    for (var e = 0; e < this.parent.children.length; ++e) this.parent.children[e] === this && (this.parent.inactiveChildren[this.id] = this.parent.children.splice(e, 1)[0]);
                this.isActive = !1
            }
        }, n.prototype.deactivateAllChildren = function () {
            for (var e = 0; e < this.children.length; e++) this.inactiveChildren[this.children[e].id] = this.children.splice(e, 1)[0], e--
        }, n.prototype.activateAllChildren = function () {
            for (var e in this.inactiveChildren) this.inactiveChildren[e].activate()
        }, n.prototype.hasTag = function (e) {
            for (var t = 0; t < this.tags.length; ++t)
                if (e === this.tags[t]) return !0;
            return !1
        }, n.prototype.setParent = function (e) {
            this.removeFromParent(), this.parent = e
        }, n.prototype.addChild = function (e) {
            this.children.push(e), e.setParent(this)
        }, n.prototype.getChildAt = function (e) {
            return e < this.children.length || e >= 0 ? this.children[e] : null
        }, n.prototype.findChild = function (e) {
            for (var t = 0, n = this.children.length; t < n; ++t)
                if (this.children[t] === e) return this.children[t];
            return null
        }, n.prototype.findChildById = function (e) {
            for (var t = 0, n = this.children.length; t < n; ++t)
                if (this.children[t].id === e) return this.children[t];
            return null
        }, n.prototype.findChildByName = function (e) {
            for (var t = 0, n = this.children.length; t <
                n; ++t)
                if (this.children[t].name === e) return this.children[t];
            return null
        }, n.prototype.findChildByTag = function (e) {
            for (var t = 0, n = this.children.length; t < n; ++t)
                if (this.children[t].hasTag(e)) return this.children[t];
            return null
        }, n.prototype.findChildrenByTag = function (e) {
            var t = [];
            for (var n = 0, r = this.children.length; n < r; ++n) this.children[n].hasTag(e) && t.push(this.children[n]);
            return t
        }, n.prototype.countChildren = function (e) {
            if (!e) return this.children.length;
            var t = 0,
                n = function (e) {
                    for (var r = 0, i = e.length; r < i; ++r) t++, n(e[r].children)
                };
            return n(this.children), t
        }, n.prototype.forEachChild = function (e, t) {
            var n = this;
            if (!t) {
                for (var r = 0; r < this.children.length; ++r) e(this.children[r]);
                return
            }
            var i = function (t) {
                for (var r = 0; r < n.children.length; ++r) e(t[r]), i(t[r].children)
            };
            i(this.children)
        }, n.prototype.removeFromParent = function () {
            this.parent && (this.parent.removeChild(this), this.parent = null)
        }, n.prototype.remove = function () {
            this.parent && (this.parent.removeChild(this), this.parent = null)
        }, n.prototype.removeChild = function (e) {
            for (var t = 0, n = this.children.length; t < n; ++t) this.children[t] === e && this._performChildRemove(t)
        }, n.prototype.removeChildById = function (e) {
            for (var t = 0, n = this.children.length; t < n; ++t) this.children[t].id === e && this._performChildRemove(t)
        }, n.prototype.removeChildByIndex = function (e) {
            e < this.children.length && this._performChildRemove(e)
        }, n.prototype.removeChildren = function () {
            for (var e = 0, t = this.children.length; e < t; ++e) this.children[e].removeChildren();
            for (var n in this.inactiveChildren) this.inactiveChildren[n].removeChildren();
            this.inactiveChildren = null, this.children.length = 0
        }, n.prototype.start = function () {
            for (var e = 0; e < this.children.length; ++e) this.children[e].start()
        }, n.prototype.init = function () {
            for (var e = 0; e < this.children.length; ++e) this.children[e].init()
        }, n.prototype.update = function () {
            for (var e = 0; e < this.children.length; ++e) this.children[e].update()
        }, n.prototype.lateUpdate = function () {
            for (var e = 0; e < this.children.length; ++e) this.children[e].lateUpdate()
        }, n.count = 0, n
    }(e.ObjectInfo);
    e.XNode = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (t) {
        function n(n) {
            t.call(this, n), this.scene = e.Director.scene, this.camera = e.Director.camera, this.entity = null
        }

        return __extends(n, t), n.prototype.reset = function () {
        }, n.prototype.start = function () {
        }, n.prototype.init = function () {
        }, n.prototype.fixedUpdate = function () {
        }, n.prototype.update = function () {
        }, n
    }(e.ObjectInfo);
    e.Component = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function e() {
        }

        return e.prototype.render = function () {
        }, e
    }();
    e.DisplayObject = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function e(e) {
            this.matrix = [0, 0, 0, 0, 0, 0], this._matrixStack = [], e && this.copyByArray(e)
        }

        return e.FromIdentity = function () {
            return new e([1, 0, 0, 1, 0, 0])
        }, e.prototype.push = function () {
            var e = this.matrix;
            this._matrixStack.push([e[0], e[1], e[2], e[3], e[4], e[5]])
        }, e.prototype.pop = function () {
            this.copyByArray(this._matrixStack.pop())
        }, e.prototype.setIdentity = function () {
            this.matrix[0] = 1, this.matrix[1] = 0, this.matrix[2] = 0, this.matrix[3] = 1, this.matrix[4] = 0, this.matrix[5] = 0
        }, e.prototype.copy = function (e) {
            this.matrix[0] = e.matrix[0], this.matrix[1] = e.matrix[1], this.matrix[2] = e.matrix[2], this.matrix[3] = e.matrix[3], this.matrix[4] = e.matrix[4], this.matrix[5] = e.matrix[5]
        }, e.prototype.copyByArray = function (e) {
            this.matrix[0] = e[0], this.matrix[1] = e[1], this.matrix[2] = e[2], this.matrix[3] = e[3], this.matrix[4] = e[4], this.matrix[5] = e[5]
        }, e.prototype.clone = function () {
            return new e(this.matrix)
        }, e.prototype.invert = function () {
            var e = this.matrix[0],
                t = this.matrix[1],
                n = this.matrix[2],
                r = this.matrix[3],
                i = this.matrix[4],
                s = this.matrix[5],
                o = e * r - t * n;
            if (!o) return;
            o = 1 / o, this.matrix[0] = r * o, this.matrix[1] = -t * o, this.matrix[2] = -n * o, this.matrix[3] = e * o, this.matrix[4] = (n * s - r * i) * o, this.matrix[5] = (t * i - e * s) * o
        }, e.prototype.multiply = function (e) {
            var t = this.matrix[0],
                n = this.matrix[1],
                r = this.matrix[2],
                i = this.matrix[3],
                s = this.matrix[4],
                o = this.matrix[5],
                u = e.matrix[0],
                a = e.matrix[1],
                f = e.matrix[2],
                l = e.matrix[3],
                c = e.matrix[4],
                h = e.matrix[5];
            this.matrix[0] = t * u + n * f, this.matrix[1] = t * a + n * l, this.matrix[2] = r * u + i * f, this.matrix[3] = r * a + i * l, this.matrix[4] = u * s + f * o + c, this.matrix[5] = a * s + l * o + h
        }, e.prototype.setTRS = function (e, t, n) {
            var r, i, s = this.matrix[0],
                o = this.matrix[1],
                u = this.matrix[2],
                a = this.matrix[3];
            t !== this._rotationCache || this._rotationCache ? (this._rotationCache = t, r = this._s = Math.sin(t), i = this._c = Math.cos(t)) : (r = this._s, i = this._c), this.matrix[0] = (i * s + r * u) * n.x, this.matrix[1] = (i * o + r * a) * n.x, this.matrix[2] = (-r * s + i * u) * n.y, this.matrix[3] = (-r * o + i * a) * n.y, this.matrix[4] = e.x, this.matrix[5] = e.y
        }, e.prototype.translate = function (e) {
            this.matrix[4] = e.x, this.matrix[5] = e.y
        }, e.prototype.rotate = function (e) {
            var t, n, r = this.matrix[0],
                i = this.matrix[1],
                s = this.matrix[2],
                o = this.matrix[3];
            t = Math.sin(e), n = Math.cos(e), this.matrix[0] = n * r + t * s, this.matrix[1] = n * i + t * o, this.matrix[2] = -t * r + n * s, this.matrix[3] = -t * i + n * o
        }, e.prototype.scale = function (e) {
            this.matrix[0] *= e.x, this.matrix[1] *= e.x, this.matrix[2] *= e.y, this.matrix[3] *= e.y
        }, e.prototype.toString = function () {
            return "(" + this.matrix[0] + ", " + this.matrix[1] + ", " + this.matrix[2] + ", " + this.matrix[3] + ", " + this.matrix[4] + ", " + this.matrix[5] + ")"
        }, e
    }();
    e.Matrix2x3 = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function e(e, t) {
            typeof e == "undefined" && (e = 0), typeof t == "undefined" && (t = 0), this.x = e, this.y = t
        }

        return e.prototype.zero = function () {
            this.x = 0, this.y = 0
        }, e.prototype.set = function (e, t) {
            this.x = e, this.y = t
        }, e.prototype.copy = function (e) {
            this.x = e.x, this.y = e.y
        }, e.prototype.clone = function () {
            return new e(this.x, this.y)
        }, e.prototype.distance = function (e) {
            var t = e.x - this.x,
                n = e.y - this.y;
            return Math.sqrt(t * t + n * n)
        }, e.prototype.squaredDistance = function (e) {
            var t = e.x - this.x,
                n = e.y - this.y;
            return t * t + n * n
        }, e.prototype.magnitude = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }, e.prototype.squaredMagnitude = function () {
            return this.x * this.x + this.y + this.y
        }, e.prototype.normalize = function () {
            var e = this.x * this.x + this.y * this.y;
            e > 0 && (e = 1 / Math.sqrt(e), this.x *= e, this.y *= e)
        }, e.prototype.dot = function (e) {
            return this.x * e.x + this.y * e.y
        }, e.prototype.negate = function () {
            this.x = -this.x, this.y = -this.y
        }, e.prototype
            .lerp = function (e, t) {
            this.x = this.x + t * (e.x - this.x), this.y = this.y + t * (e.y - this.y)
        }, e.prototype.scale = function (e) {
            this.x = this.x * e, this.y = this.y * e
        }, e.prototype.add = function (e) {
            this.x += e.x, this.y += e.y
        }, e.prototype.subtract = function (e) {
            this.x -= e.x, this.y -= e.y
        }, e.prototype.multiply = function (e) {
            this.x *= e.x, this.y *= e.y
        }, e.prototype.divide = function (e) {
            this.x /= e.x, this.y /= e.y
        }, e.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ")"
        }, e
    }();
    e.Vector2 = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function e() {
        }

        return e.lerp = function (e, t, n) {
            return e + n * (t - e)
        }, e.lerpAngle = function (e, t, n) {
            Math.abs(t - e) > 180 && (t > e ? e += 360 : t += 360);
            var r = e + (t - e) * n;
            return r >= 0 && r <= 360 ? r : r % 360
        }, e.random = function (e, t, n) {
            return e + (n ? Math.random() * (t - e + 1) : Math.floor(Math.random() * (t - e + 1)))
        }, e.toRadian = function (e) {
            return e * Math.PI / 180
        }, e.toDegree = function (e) {
            return e * 180 / Math.PI
        }, e.precision = function (t, n) {
            var r = Math.pow(10, n);
            return e.round(t * r) / r
        }, e.round = function (e) {
            return .5 + e | 0
        }, e.MAX_ANGLE = 360, e.EPSILON = 1e-6, e
    }();
    e.Mathf = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function t() {
        }

        return t.prototype._onMouseDown = function (e) {
            e.preventDefault(), this._toggleListener(e, !0)
        }, t.prototype._onMouseUp = function (e) {
            e.preventDefault(), this._toggleListener(e, !1)
        }, t.prototype._onMouseMove = function (n) {
            var r = e.Director.context.canvas,
                i = r.getBoundingClientRect();
            t.Mouse.x = n.clientX - i.left * (r.width / i.width), t.Mouse.y = n.clientY - i.top * (r.height / i.height)
        }, t.prototype._onKeyDown = function (e) {
            e.which !== 122 && e.which !== 223 && e.which !== 116 && !ENV.debug && e.preventDefault(), this._toggleListener(e, !0)
        }, t.prototype._onKeyUp = function (e) {
            e.which !== 122 && e.which !== 223 && e.which !== 116 && !ENV.debug && e.preventDefault(), this._toggleListener(e, !1)
        }, t.prototype._toggleListener = function (e, n) {
            var r = t._listeners;
            for (var i in r)
                if (r.hasOwnProperty(i) && e.which === r[i].key) {
                    var s = r[i];
                    n ? (s.isOnHold = !0, s.isTriggered = s.isKeyboardRepeat ? !1 : !0) : (s.isReleased = !0, delete s.isOnHold, delete s.isTriggered, s.isKeyboardRepeat && delete s.isKeyboardRepeat)
                }
        }, t.prototype._onRetrieveTouches = function (e) {
            e.preventDefault(), e.stopPropagation(), t.touches = e.touches
        }, t.trigger = function (e) {
            var t = this._listeners[e];
            return t && t.isTriggered ? (t.isTriggered = !1, t.isKeyboardRepeat = !0, !0) : !1
        }, t.hold = function (e) {
            return this._listeners[e] ? this._listeners[e].isOnHold ? !0 : !1 : !1
        }, t.release = function (e) {
            var t = this._listeners[e];
            return t && !t.isOnHold && t.isReleased ? (delete t.isReleased, !0) : !1
        }, t.bind = function (e, t) {
            this._listeners[t] = {
                key: e,
                isTriggered: !1,
                isKeyboardRepeat: !1,
                isOnHold: !1,
                isReleased: !1
            }
        }, t.unbind = function (e) {
            this._listeners[e] && delete this._listeners[e]
        }, t.prototype.init = function () {
            var e = this;
            window.addEventListener("mousedown", function (n) {
                e._onMouseDown(n)
            }), window.addEventListener("mouseup", function (n) {
                e._onMouseUp(n)
            }), window.addEventListener("keydown", function (n) {
                e._onKeyDown(n)
            }), window.addEventListener("keyup", function (n) {
                e._onKeyUp(n)
            }), window.addEventListener("mousemove", function (n) {
                e._onMouseMove(n)
            }), document.getElementsByTagName("body")[0].addEventListener("contextmenu", function () {
                return !1
            }), window.addEventListener("mousewheel", function () {
                return !1
            }), window.addEventListener("touchstart", function (n) {
                e._onRetrieveTouches(n)
            }), window.addEventListener("touchmove", function (n) {
                e._onRetrieveTouches(n)
            }), window.addEventListener("touchend", function (n) {
                e._onRetrieveTouches(n)
            })
        }, t.Key = {
            MOUSE_LEFT: 1,
            MOUSE_MIDDLE: 2,
            MOUSE_RIGHT: 3,
            A: 65,
            S: 83,
            W: 87,
            D: 68,
            H: 72,
            Q: 81,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            SHIFT: 16,
            COMMA: 188,
            PERIOD: 190,
            CTRL: 17,
            TAB: 9,
            SPACE_BAR: 32,
            TILDE: 223,
            F11: 122
        }, t.Mouse = {
            x: 0,
            y: 0
        }, t.touches = [], t._listeners = {}, t
    }();
    e.Input = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (t) {
        function n(n) {
            t.call(this, n), this.components = [], this.displayObject = new e.DisplayObject, this.position = new e.Vector2(0, 0), this.rotation = 0, this.localRotation = 0, this.scale = new e.Vector2(1, 1), this.localScale = new e.Vector2(1, 1), this.pivot = new e.Vector2(0, 0), this.alpha = 1, this.localAlpha = 1, this.boundingCircleRadius = 0, this.compositeOperation = CompositeOperation.SOURCE_OVER
        }

        return __extends(n, t), n.prototype.reset = function () {
            this.name = "", this.removeFromParent();
            for (var e = 0; e < this.components.length; ++e) this.components[e].reset();
            for (var e = 0; e < this.children.length; ++e) this.children[e].reset()
        }, n.prototype.setDisplayObject = function (e) {
            this.displayObject = e
        }, n.prototype.addComponent = function (e) {
            e.entity = this, this.components.push(e)
        }, n.prototype.getComponent = function (e) {
            for (var t = 0, n = this.components.length; t < n; t++)
                if (this.components[t] instanceof e) return this.components[t];
            return null
        }, n.prototype.getComponents = function (e) {
            if (this.components.length) {
                var t = [];
                for (var n = 0, r = this.components.length; n < r; n++) this.components[n] instanceof e && t.push(this.components[n]);
                return t
            }
            return null
        }, n.prototype.getComponentById = function (e) {
            for (var t = 0, n = this.components.length; t < n; t++)
                if (this.components[t].id === e) return this.components[t];
            return null
        }, n.prototype.getComponentsById = function (e) {
            if (this.components.length) {
                var t = [];
                for (var n = 0, r = this.components.length; n < r; n++) this.components[n].id === e && t.push(this.components[n]);
                return t
            }
            return null
        }, n.prototype.getComponentAt = function (e) {
            return e >= 0 && e < this.components.length ? this.components[e] : null
        }, n.prototype.getComponentsAt = function (e) {
            if (this.components.length) {
                var t = [];
                for (var n = 0; n < e.length; ++n) e[n] >= 0 && e[n] < this.components.length && t.push(this.components[e[n]]);
                return t
            }
            return null
        }, n.prototype.getComponentByName = function (e) {
            for (var t = 0, n = this.components.length; t < n; ++t)
                if (this.components[t].name === e) return this.components[t];
            return null
        }, n.prototype.getComponentsByName = function (e) {
            if (this.components.length) {
                var t = [];
                for (var n = 0, r = this.components.length; n < r; ++n) this.components[n].name === e && t.push(this.components[n]);
                return t
            }
            return null
        }, n.prototype.removeComponent = function (e, t) {
            for (var n, r = this.components.length; n < r; ++n)
                if (this.components[n] instanceof e) {
                    this.components.splice(n, 1);
                    if (!t) break
                }
        }, n.prototype.removeComponentById = function (e) {
            for (var t, n = this.components.length; t < n; ++t)
                if (this.components[t].id === e) {
                    this.components.splice(t, 1);
                    break
                }
        }, n.prototype.removeComponentAt = function (e) {
            e < this.components.length && this.components.splice(e, 1)
        }, n.prototype.removeComponentByName = function (e) {
            for (var t, n = this.components.length; t < n; ++t)
                if (this.components[t].name === e) {
                    this.components.splice(t, 1);
                    break
                }
        }, n.prototype.removeAllComponents = function () {
            this.components.length = 0
        }, n.prototype.start = function () {
            for (var e = 0; e < this.components.length; ++e) this.components[e].start();
            for (var e = 0, t = this.children; e < t.length; ++e) t[e].start()
        }, n.prototype.init = function () {
            for (var e = 0; e < this.components.length; ++e) this.components[e].init();
            for (var e = 0, t = this.children; e < t.length; ++e) t[e].init()
        }, n.prototype.fixedUpdate = function () {
            for (var e = 0; e < this.components.length; ++e) this.components[e].fixedUpdate();
            for (var e = 0, t = this.children; e < t.length; ++e) t[e].fixedUpdate()
        }, n.prototype.update = function () {
            for (var e = 0; e < this.components.length; ++e) this.components[e].update();
            for (var e = 0, t = this.children; e < t.length; ++e) t[e].update()
        }, n.prototype.render = function () {
            e.Director.context.save(), e.Director.context.globalCompositeOperation = this.compositeOperation, e.Director.context.globalAlpha = this.alpha, e.Director.context.translate(this.position.x, this.position.y), e.Director.context.rotate(this.rotation), e.Director.context.scale(this.scale.x, this.scale.y), e.Director.context.translate(-this.pivot.x, -this.pivot.y);
            for (var t = 0, n = this.children; t < n.length; ++t) n[t].render();
            e.Director.context.rotate(this.localRotation), e.Director.context.scale(this.localScale.x, this.localScale.y), this.displayObject.render(), e.Director.context.restore(), ENV.debug && (e.Director.context.beginPath(), e.Director.context.strokeStyle = "#f00", e.Director.context.arc(this.position.x, this.position.y, this.boundingCircleRadius, 0, Math.PI * 2), e.Director.context.stroke())
        }, n
    }(e.XNode);
    e.Entity = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (t) {
        function n(e) {
            t.call(this, e)
        }

        return __extends(n, t), n.prototype._renderGUI = function () {
            for (var e = 0, t = this.children; e < t.length; ++e) t[e].render()
        }, n.prototype.render = function () {
            var t = e.Director.context;
            t.save(), t.translate(this.pivot.x, this.pivot.y), t.rotate(this.rotation), t.scale(this.scale.x, this.scale.y), t.translate(-this.pivot.x - this.position.x, -this.pivot.y - this.position.y), e.Director.scene.render(), t.restore(), this._renderGUI()
        }, n
    }(e.Entity);
    e.Camera = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (e) {
        function t(t) {
            e.call(this, t)
        }

        return __extends(t, e), t.prototype.render = function () {
            for (var e = 0, t = this.children; e < t.length; ++e) t[e].render()
        }, t
    }(e.Entity);
    e.Scene = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function t(e, n, r) {
            this.canvas = e, e.width = n || window.innerWidth, e.height = r || window.innerHeight, t.context = e.getContext("2d"), this._createRaf()
        }

        return t.prototype._createRaf = function () {
            var e, t, n = 0;
            window.raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (r) {
                window.setTimeout(function () {

                    e = Date.now() - pktimedrop, r(e), t = Date.now() - pktimedrop, n = 1e3 / 60 - (t - e);
                }, n)
            }
        }, t.prototype._tick = function (n) {
            t.fps = e.Time.last ? 1e3 / (n - e.Time.last) : t.fps, e.Time.delta = 1 / t.fps * e.Time.scale, e.Time.time = Date.now() - pktimedrop - e.Time.start, e.Time.last = n
        }, t.prototype.init = function (n, r) {
            t.scene = n, t.camera = r, t.scene.start(), t.scene.init(), e.Time.start = Date.now()
        }, t.prototype.update = function () {
            this._tick(Date.now() - pktimedrop), e.isPaused || (t.scene.update(), t.context.clearRect(0, 0, this.canvas.width, this.canvas.height), t.camera.render())
        }, t.fps = 60, t
    }();
    e.Director = t
})(at || (at = {}));
var pktimedrop = 0;
var pktimeStart = 0;
//window.addEventListener("blur", function () {
//    console.log("blur");
//    pktimeStart = Date.now();
//    at.isPaused = true;
//})
//window.addEventListener("focus", function () {
//    console.log("confus");
//    pktimedrop = pktimedrop + ((Date.now()) - pktimeStart);
//    at.isPaused = false;
//})
document.addEventListener('webkitvisibilitychange', function () {
    if (pkmodel == 0 || pkmodel ==1) {
        pkmodel = 1;
        if (document.webkitVisibilityState == 'hidden') {
            console.log("blur");
            pktimeStart = Date.now();
            at.isPaused = true;

        } else {
            console.log("confus");
            pktimedrop = pktimedrop + ((Date.now()) - pktimeStart);
            at.isPaused = false;
        }
    }
})
//document.addEventListener('mozvisibilitychange', function () {
//    if (document.mozVisibilityState == 'hidden') {
//        console.log("blur");
//        pktimeStart = Date.now();
//        at.isPaused = true;
//    } else {
//        console.log("confus");
//        pktimedrop = pktimedrop + ((Date.now()) - pktimeStart);
//        at.isPaused = false;
//    }
//})
//document.addEventListener('visibilityChange', function () {
//    if (document.visibilityState == 'hidden') {
//        console.log("blur");
//        pktimeStart = Date.now();
//        at.isPaused = true;
//    } else {
//        console.log("confus");
//        pktimedrop = pktimedrop + ((Date.now()) - pktimeStart);
//        at.isPaused = false;
//    }
//})
var at;
(function (e) {
    var t = function () {
        function e() {
            this._totalToLoad = 0, this._totalLoaded = 0, this._totalFailed = 0, this._onProgress = function () {
            }, this._onComplete = function () {
            }
        }

        return e.prototype._onLoad = function (e) {
            ENV.debug && console.log("ImageManager: Image " + this._totalLoaded + "/" + this._totalToLoad + " loaded."), this._totalLoaded++, this._checkCompletion()
        }, e.prototype._onError = function (e) {
            this._totalFailed++, this._checkCompletion()
        }, e.prototype._checkCompletion = function () {
            this._onProgress && this._onProgress(), this._totalLoaded >= this._totalToLoad && this._onComplete()
        }, e.prototype.load = function (t, n, r) {
            if (count(t) > 0) {
                var i = this;
                this._totalToLoad = count(t), this._totalLoaded = 0, this._totalFailed = 0, this._onProgress = function () {
                    n(i._totalToLoad, i._totalLoaded, i._totalFailed)
                }, this._onComplete = function () {
                    r()
                };
                for (var s in t)
                    if (t.hasOwnProperty(s)) {
                        var o = new Image;
                        o.src = t[s], o.onload = function (e) {
                            i._onLoad(e)
                        }, o.onerror = function (e) {
                            i._onError(e)
                        }, e.images[s] = o, ENV.debug && console.log("ImageManager: Loading image '" + s + "'...")
                    }
            } else r()
        }, e.images = {}, e
    }();
    e.ImageManager = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (t) {
        function n(n) {
            t.call(this), this.offsetX = 0, this.offsetY = 0, this.flipY = !1, this.texture = e.ImageManager.images[n]
        }

        return __extends(n, t), n.prototype.getWidth = function () {
            return this.texture.width
        }, n.prototype.getHeight = function () {
            return this.texture.height
        }, n.prototype.render = function () {
            this.flipY ? (e.Director.context.translate(this.offsetX, 0), e.Director.context.scale(-1, 1), e.Director.context.drawImage(this.texture, this.offsetX, this.offsetY), e.Director.context.scale(1, 1), e.Director.context.translate(-this.offsetX, 0)) : e.Director.context.drawImage(this.texture, this.offsetX, this.offsetY)
        }, n
    }(e.DisplayObject);
    e.Sprite = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (t) {
        function n(n, r, i, s) {
            t.call(this, n), this.width = 0, this.height = 0, this.pattern = e.Director.context.createPattern(this.texture, r), this.width = i || this.texture.width, this.height = s || this.texture.height
        }

        return __extends(n, t), n.prototype.setHeight = function (e) {
            this.height = e
        }, n.prototype.render = function () {
            e.Director.context.fillStyle = this.pattern, this.flipY ? (e.Director.context.translate(this.texture.width, 0), e.Director.context.scale(-1, 1), e.Director.context.translate(-this.offsetX, -this.offsetY), e.Director.context.fillRect(this.offsetX, this.offsetY, this.width, this.height), e.Director.context.scale(1, 1), e.Director.context.translate(-this.texture.width, 0)) :
                (e.Director.context.translate(-this.offsetX, -this.offsetY), e.Director.context.fillRect(this.offsetX, this.offsetY, this.width, this.height))
        }, n
    }(e.Sprite);
    e.TileSprite = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (t) {
        function n(e, n, r, i, s, o) {
            t.call(this), this.width = 150, this.height = 150, this.text = e, this.font = n, this.fill = r, this.align = i, this.width = s || this.width, this.height = o || this.height
        }

        return __extends(n, t), n.prototype.render = function () {
            e.Director.context.font = this.font, e.Director.context.textAlign = this.align, e.Director.context.fillStyle = this.fill, e.Director.context.fillText(this.text, this.width, this.height)
        }, n
    }(e.DisplayObject);
    e.Font = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function () {
        function e() {
            this._totalToLoad = 0, this._totalLoaded = 0, this._totalFailed = 0, this._onProgress = function () {
            }, this._onComplete = function () {
            }
        }

        return e.Get = function (t) {
            return e._sounds[t]
        }, e.prototype._onLoad = function (e) {
            ENV.debug && console.log("SoundManager: Sound " + e._src + " loaded."), this._totalLoaded++, this._checkCompletion()
        }, e.prototype._onError = function (e) {
            this._totalFailed++, this._checkCompletion()
        }, e.prototype._checkCompletion = function () {
            this._onProgress && this._onProgress(), this._totalLoaded >= this._totalToLoad && this._onComplete()
        }, e.prototype.load = function (t, n, r) {
            this._totalToLoad = count(t);
            if (this._totalToLoad > 0) {
                var i = this;
                this._totalLoaded = 0, this._totalFailed = 0, this._onProgress = function () {
                    n(i._totalToLoad, i._totalLoaded, i._totalFailed)
                }, this._onComplete = function () {
                    r()
                };
                for (var s in t) t.hasOwnProperty(s) && (t[s].onload = function () {
                    i._onLoad(this)
                }, t[s].onloadend = function () {
                    i._onError()
                }, e._sounds[s] = new Howl(t[s]), ENV.debug && console.log("SoundManager: Loading sound '" + s + "'..."))
            } else r()
        }, e._sounds = {}, e
    }();
    e.SoundManager = t
})(at || (at = {}));
var at;
(function (e) {
    var t = function (t) {
        function n(e, n, r, i, s, o) {
            t.call(this, e), this._index = 0, this._currentFrame = 0, this._clipPositions = [], this._callback = function () {
            }, this.currentAnimationId = "", this.clipWidth = 0, this.clipHeight = 0, this.currentAnimationId = i, this.clipWidth = this.texture.width / r, this.clipHeight = this.texture.height / n, this._animations = s, this._currentAnimation = this._animations[this.currentAnimationId], this._callback = o || this._callback, this._createClipPositionList()
        }

        return __extends(n, t), n.prototype._createClipPositionList = function () {
            for (var e = 0; e < this.texture.height; e += this.clipHeight)
                for (var t = 0; t < this.texture.width; t += this.clipWidth) this._clipPositions.push({
                    x: t,
                    y: e
                })
        }, n.prototype.getWidth = function () {
            return this.clipWidth
        }, n.prototype.getHeight = function () {
            return this.clipHeight
        }, n.prototype.play = function (e) {
            this.currentAnimationId = e, this._currentAnimation = this._animations[this.currentAnimationId], this._index = 0
        }, n.prototype.getAnimationData = function (e) {
            return this._animations[e]
        }, n.prototype.render = function () {
            var t = this._currentAnimation;
            this._index += t.fps * e.Time.delta, e.Mathf.precision(this._index, 1) >= t.frames.length && (t.isOnce ? this._index = t.frames.length - 1 : this._index = 0, this._callback && this._callback()), this._currentFrame = Math.floor(this._index), this.flipY ? (e.Director.context.translate(this.clipWidth, 0), e.Director.context.scale(-1, 1), e.Director.context.drawImage(this.texture, this._clipPositions[t.frames[this._currentFrame]].x, this._clipPositions[t.frames[this._currentFrame]].y, this.clipWidth, this.clipHeight, this.offsetX, this.offsetY, this.clipWidth, this.clipHeight), e.Director.context.scale(1, 1), e.Director.context.translate(-this.clipWidth, 0)) : e.Director.context.drawImage(this.texture, this._clipPositions[t.frames[this._currentFrame]].x, this._clipPositions[t.frames[this._currentFrame]].y, this.clipWidth, this.clipHeight, this.offsetX, this.offsetY, this.clipWidth, this.clipHeight)
        }, n
    }(e.Sprite);
    e.AnimationSprite = t
})(at || (at = {}));
var GameState = {
        INTRO: "intro",
        TUTORIAL: "tutorial",
        PLAY: "play",
        GAME_OVER: "game_over"
    },
    currentGameState = GameState.INTRO,
    obstacles = [],
    obstacleStartTime = 0,
    distance = 0,
    spilGamesAPI = null,
    spilGamesAPILogo = null,
    DEFAULT_QUACKY_SPEED = 280,
    DEFAULT_MAX_JUMPSPEED = 1600,
    QUACKY_TRANCE_TIME = 6500,
    QUACKY_TRANCE_SPEED_BONUS = 460,
    QUACKY_TRANCE_NOTICE_MAX_TOGGLE = 17,
    OBSTACLE_SPAWN_Y_DISTANCE = 480,
    OBSTACLE_SPAWN_DELAY_TIME = 1500,
    DEFAULT_HARD_DISTANCE = 25,
    STAR_CHANCE_PER_WAVE = .35,
    DISTANCE_CHECKPOINT_THRESHOLD = 20,
    game;
(function (e) {
    var t = at.Time,
        n = at.XNode,
        r = at.Component,
        i = at.Sprite,
        s = at.Director,
        o = function (e) {
            function n() {
                e.apply(this, arguments), this.isBreakAway = !1, this.scaleSpeed = 20
            }

            return __extends(n, e), n.prototype._removeObstacle = function () {
                for (var e = 0; e < obstacles.length; ++e) obstacles[e] === this.entity && obstacles.splice(e, 1);
                this.entity.parent.removeChild(this.entity)
            }, n.prototype.init = function () {
            }, n.prototype.update = function () {
                this.isBreakAway && (this.entity.scale.x += this.scaleSpeed * t.delta, this.entity.scale.y += this.scaleSpeed * t.delta, this.entity.rotation += 360 * t.delta, this.entity.scale.x >= 4 && this._removeObstacle())
            }, n
        }(at.Component);
    e.BreakAway = o
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Time,
        n = at.Entity,
        r = at.Component,
        i = at.Sprite,
        s = function (n) {
            function r(e) {
                n.call(this, e), this._wobbleRate = 0, this._breakAwayComponent = null, this.speed = 9, this.wobbleSizeStart = .8, this.wobbleSize = .8
            }

            return __extends(r, n), r.prototype.init = function () {
                this._breakAwayComponent = this.entity.getComponent(e.BreakAway)
            }, r.prototype.update = function () {
                this._breakAwayComponent.isBreakAway || (this._wobbleRate += this.speed * t.delta, this._wobbleRate > 360 && (this._wobbleRate = 0), this.entity.scale.x = this.wobbleSizeStart + Math.sin(this._wobbleRate) * this.wobbleSize * t.delta, this.entity.scale.y = this.wobbleSizeStart + Math.sin(this._wobbleRate) * this.wobbleSize * t.delta)
            }, r
        }(at.Component);
    e.Wobble = s
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Time,
        n = at.XNode,
        r = at.Component,
        i = at.Sprite,
        s = at.Director,
        o = function (e) {
            function t() {
                e.apply(this, arguments)
            }

            return __extends(t, e), t.prototype._removeObstacle = function () {
                for (var e = 0; e < obstacles.length; ++e) obstacles[e] === this.entity && obstacles.splice(e, 1);
                this.entity.parent.removeChild(this.entity)
            }, t.prototype.init = function () {
            }, t.prototype.update = function () {
                this.entity.position.y - this.entity
                    .displayObject.getHeight() > s.context.canvas.height && this._removeObstacle()
            }, t
        }(at.Component);
    e.ObstacleRemover = o
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Time,
        n = at.Entity,
        r = at.Component,
        i = at.Sprite,
        s = function (n) {
            function r(e) {
                n.call(this, e), this.direction = Direction.DOWN
            }

            return __extends(r, n), r.prototype.init = function () {
                this.quacky = this.entity.parent.findChildByName("quacky"), this._quackyComponent = this.quacky.getComponent(e.Quacky)
            }, r.prototype.update = function () {
                this.entity.position.y += this.direction * this._quackyComponent.speed * t.delta
            }, r
        }(at.Component);
    e.Scroller = s
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Entity,
        n = at.Sprite,
        r = function (t) {
            function r(r) {
                t.call(this, r);
                var i = new n("star"),
                    s = new e.Wobble;
                this.setDisplayObject(i), this.pivot.set(i.getWidth() * HALF, i.getHeight() * HALF), this.boundingCircleRadius = i.getHeight() * HALF, s.wobbleSize = 2, s.speed = 18, this.addComponent(new e.Scroller), this.addComponent(s), this.addComponent(new e.ObstacleRemover), this.addComponent(new e.BreakAway)
            }

            return __extends(r, t), r
        }(at.Entity);
    e.Star = r
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Director,
        n = at.Time,
        r = at.Component,
        i = at.Sprite,
        s = at.AnimationSprite,
        o = at.Input,
        u = at.Mathf,
        a = at.SoundManager,
        f = function (r) {
            function i() {
                r.apply(this, arguments), this.speed = DEFAULT_QUACKY_SPEED, this.speedIncreaseAmount = 30, this.defaultAnimationFPS = 15, this.maxAnimationFPS = 40, this.animationFPSIncreaseAmount = 2, this.speedChangeDelayTime = 4e3, this.speedChangeRate = 4, this.jumpSpeedRate = 3.2, this.jumpSpeed = 0, this.tranceScaleSize = 1.75, this.defaultYPosition = 0, this.defaultStartingYPosition = 0, this.bounceSpeed = 480, this.fallSpeedIncreaseAmount = 1200, this.fallRotationSpeed = 480, this.mileageTreshold = 120, this.isJumping = !1, this.isFalling = !1, this.isTrance = !1, this.currentBuildingPosition = i.BuildingPosition.RIGHT, this.leftPosition = 150, this.nextJumpingDirection = Direction.LEFT, this.tranceNoticeDelayTime = 2500, this._motionSpeed = 30, this._frequency = 0, this._amplitude = 3, this._tranceNoticeToggle = 0, this._tranceNoticeMaxToggle = QUACKY_TRANCE_NOTICE_MAX_TOGGLE, this._speedChangeTimeout = 0, this._tranceTimeout = 0, this._fallPressure = 0, this._jumpTouchId = -1, this._currentRunningAnimationId = "run", this._totalSpeed = 0, this._collisionStep = 0, this._distanceCheckPoint = DISTANCE_CHECKPOINT_THRESHOLD, this._isFinishingTrancing = !1
            }

            return __extends(i, r), i.prototype._adjustYPosition = function () {
                this.defaultYPosition = t.context.canvas.height * .75, this.defaultStartingYPosition = t.context.canvas.height + this._displayObject.getHeight(), this.entity.position.y = this.defaultYPosition
            }, i.prototype._checkCurrentBuildingPosition = function () {
                this.currentBuildingPosition === i.BuildingPosition.RIGHT ? this.entity.position.x <= this.leftPosition && (this.currentBuildingPosition = i.BuildingPosition.LEFT, this.nextJumpingDirection = Direction.RIGHT, this.entity.rotation = u.toRadian(90), this.isJumping = !1, this._displayObject.play(this._currentRunningAnimationId), this.entity.position.set(this.leftPosition, this.entity.position.y)) : this.entity.position.x >= this.rightPosition && (this.currentBuildingPosition = i.BuildingPosition.RIGHT, this.nextJumpingDirection = Direction.LEFT, this.entity.rotation = u.toRadian(-90), this.isJumping = !1, this._displayObject.play(this._currentRunningAnimationId), this.entity.position.set(this.rightPosition, this.entity.position.y))
            }, i.prototype._performJump = function () {
                this.isJumping = !0, this._displayObject.play("jump"), this.currentBuildingPosition === i.BuildingPosition.RIGHT ? (this._displayObject.flipY = !0, this.entity.rotation = 0) : (this._displayObject.flipY = !1, this.entity.rotation = 0)
            }, i.prototype._stayMiddle = function () {
                Math.round(this.entity.position.y) !== this.defaultYPosition && (this.entity.position.y += (this.defaultYPosition - this.entity.position.y) * n.delta)
            }, i.prototype._checkSpeed = function () {
                distance > this._distanceCheckPoint ? (this.speed += this.speedIncreaseAmount, this._distanceCheckPoint += DISTANCE_CHECKPOINT_THRESHOLD, this._runAnimation.fps <= this.maxAnimationFPS && (this._runAnimation.fps = this.defaultAnimationFPS + this.animationFPSIncreaseAmount), this._jumpAnimation.fps <= this.maxAnimationFPS && (this._jumpAnimation.fps = this.defaultAnimationFPS + this.animationFPSIncreaseAmount)) : (this.jumpSpeed = this.speed * this.jumpSpeedRate, this.jumpSpeed = this.jumpSpeed > DEFAULT_MAX_JUMPSPEED ? DEFAULT_MAX_JUMPSPEED : this.jumpSpeed)
            }, i.prototype._performFall = function () {
                this._fallPressure += this.fallSpeedIncreaseAmount * n.delta, this.entity.position.y -= this.bounceSpeed * n.delta, this.entity.position.y += this._fallPressure * n.delta, this.entity.position.x += (this._canvas.width / 2 - this.entity.position.x) * n.delta, this.entity.rotation += u.toRadian(this.fallRotationSpeed) * n.delta;
                if (this.entity.position.y > this._canvas.height + this._displayObject.getHeight()) {
                    var e = this;
                    spilGamesAPI.GameBreak.request(function () {
                        at.isPaused = !0, a.Get("game").mute()
                    }, function () {
                        at.isPaused = !1;
                        //pk: ending
                        updateShareScore(distance);
                        var t = document.getElementById("gameOver");
                        t.getElementsByTagName("h1")[0].innerHTML = distance <= localStorage.longestDistance245 ? "游戏结束" : "恭喜你", currentGameState = GameState.GAME_OVER, document.getElementById("inGameHud").style.display = "none", t.style.display = "block", localStorage.longestDistance245 = !localStorage.longestDistance245 || distance > parseInt(localStorage.longestDistance245) ? distance : localStorage.longestDistance245, document.getElementsByClassName("longestDistance")[0].innerHTML = localStorage.longestDistance245, document.getElementsByClassName("distance")[0].innerHTML = distance.toString(), document.getElementById("bestDistance").innerHTML = localStorage.longestDistance245, t.ontouchstart = t.onmouseup = function (t) {
                            e._onRestart(t)
                        }
                    })
                }
            }, i.prototype._onRestart = function (e) {
                distance = 0, currentGameState = GameState.PLAY, obstacleStartTime = Date.now(), this._displayObject.play("run"), this._totalSpeed = 0, this._distanceCheckPoint = 0, this.speed = DEFAULT_QUACKY_SPEED, this.currentBuildingPosition = i.BuildingPosition.RIGHT, this.nextJumpingDirection = Direction.LEFT, this._displayObject.flipY = !1, this.entity.rotation = Math.PI * -90 / 180, this.defaultYPosition = t.context.canvas.height * .75, this.jumpSpeed = this.
                    jumpSpeedRate * DEFAULT_QUACKY_SPEED, this._fallPressure = 0, this.entity.position.set(this.rightPosition, t.context.canvas.height + this._displayObject.getHeight()), this.isJumping = !1, this.isFalling = !1, e.currentTarget.style.display = "none", document.getElementById("inGameHud").style.display = "block";
                for (var n = 0; n < obstacles.length; ++n) t.scene.removeChild(obstacles[n]);
                obstacles.length = 0
            }, i.prototype._startTrance = function () {
                this.isTrance || (this._currentRunningAnimationId = "trance", this._displayObject.play(this._currentRunningAnimationId), this.speed += QUACKY_TRANCE_SPEED_BONUS, this.isTrance = !0), this.entity.scale.set(this.tranceScaleSize, this.tranceScaleSize), this._tranceTimeout = Date.now() - pktimedrop + QUACKY_TRANCE_TIME, this._tranceNoticeMaxToggle = QUACKY_TRANCE_NOTICE_MAX_TOGGLE, this._tranceNoticeToggle = 0
            }, i.prototype._checkTranceStatus = function () {
                this.isTrance && ((Date.now() - pktimedrop) > this._tranceTimeout ? (this.speed -= QUACKY_TRANCE_SPEED_BONUS / 2, this.isTrance = !1, this._currentRunningAnimationId = "run", this._displayObject.play(this._currentRunningAnimationId), this.entity.scale.set(1, 1), this.defaultYPosition = t.context.canvas.height * .75, t.camera.position.x = 0, this._isFinishingTrancing = !1) : (Date.now() - pktimedrop) > this._tranceTimeout - this.tranceNoticeDelayTime ? (this._isFinishingTrancing || (this.speed -= QUACKY_TRANCE_SPEED_BONUS / 2, this._isFinishingTrancing = !0), this._tranceNoticeToggle++, this._tranceNoticeToggle > Math.ceil(this._tranceNoticeMaxToggle) / 2 ? (this.entity.scale.set(1, 1), this._tranceNoticeToggle > this._tranceNoticeMaxToggle && (this._tranceNoticeToggle = 0, this._tranceNoticeMaxToggle--)) : this.entity.scale.set(this.tranceScaleSize, this.tranceScaleSize)) : (this.defaultYPosition = t.context.canvas.height * .6, this._frequency += this._motionSpeed * n.delta, t.camera.position.x = Math.sin(this._frequency) * this._amplitude))
            }, i.prototype._checkObstacleCollision = function () {
                this._collisionStep++;
                if (this._collisionStep >= 2) {
                    var t, n, r, i, s = this.entity;
                    for (var o = 0; o < obstacles.length; ++o) i = obstacles[o], t = i.position.x - s.position.x, n = i.position.y - s.position.y, r = Math.sqrt(t * t + n * n), s.boundingCircleRadius + i.boundingCircleRadius > r && (i instanceof e.Star ? (i.getComponent(e.BreakAway).isBreakAway
                        // || a.Get("star_retrieved").play()
                        , this._startTrance(), i.getComponent(e.BreakAway).isBreakAway = !0) : this.isTrance ? i.getComponent(e.BreakAway).isBreakAway = !0 : (this.speed = 0, this.isFalling = !0, this.isJumping = !1, this._tranceTimeout = 0, this._displayObject.play("fall")
                        // , a.Get("game_over").play()
                        ));
                    this._collisionStep = 0
                }
            }, i.prototype._trackDistance = function () {
                this._totalSpeed += this.speed * n.delta, document.getElementById("distance").innerHTML = (distance = Math.floor(this._totalSpeed / this.mileageTreshold)).toString(), parseInt(localStorage.longestDistance245) < distance && (document.getElementById("bestDistance").innerHTML = distance.toString())
            }, i.prototype.jump = function () {
                this.entity.position.x += this.nextJumpingDirection * this.jumpSpeed * n.delta, this._checkCurrentBuildingPosition()
            }, i.prototype._updateOnGameStatePlay = function () {
                if (!this.isFalling) {
                    if (!this.isJumping) {
                        for (var e = 0; e < at.Input.touches.length; ++e) {
                            var t = at.Input.touches[e];
                            if (this._jumpTouchId < 0) {
                                this._jumpTouchId = t.identifier, this._performJump();
                                break
                            }
                            if (t === this._jumpTouchId) {
                                this._performJump();
                                break
                            }
                            e === at.Input.touches.length - 1 && (this._jumpTouchId = -1)
                        }
                        (o.trigger("jump") || o.hold("jump")) && this._performJump(), this._checkSpeed()
                    } else this.jump();
                    this._stayMiddle(), this._checkObstacleCollision(), this._trackDistance(), this._checkTranceStatus()
                } else this._performFall()
            }, i.prototype.init = function () {
                var e = this;
                this._canvas = t.context.canvas, this._displayObject = this.entity.displayObject, this._runAnimation = this._displayObject.getAnimationData("run"), this._jumpAnimation = this._displayObject.getAnimationData("jump"), this._tranceAnimation = this._displayObject.getAnimationData("trance"), this.rightPosition = t.context.canvas.width - 150, this.entity.rotation = Math.PI * -90 / 180, this.jumpSpeed = this.jumpSpeedRate * DEFAULT_QUACKY_SPEED, this._adjustYPosition(), this.entity.position.set(this.rightPosition, this.defaultStartingYPosition), document.getElementById("bestDistance").innerHTML = localStorage.longestDistance245 || 0, at.onAdjustScreenCallbacks.push(function () {
                    e._adjustYPosition()
                })
            }, i.prototype.update = function () {
                switch (currentGameState) {
                    case GameState.INTRO:
                    case GameState.TUTORIAL:
                        this.entity.position.y = this.defaultStartingYPosition;
                        break;
                    case GameState.PLAY:
                        this._updateOnGameStatePlay();
                        break;
                    case GameState.GAME_OVER:
                        this.entity.position.y = this.defaultStartingYPosition
                }
            }, i.BuildingPosition = {
                LEFT: "left",
                RIGHT: "right"
            }, i
        }(at.Component);
    e.Quacky = f
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Time,
        n = at.Entity,
        r = at.Component,
        i = at.TileSprite,
        s = function (n) {
            function r() {
                n.apply(this, arguments), this.direction = Direction.DOWN
            }

            return __extends(r, n), r.prototype.init = function () {
                this._tileSprite = this.entity.displayObject, this.quacky = this.entity.parent.findChildByName("quacky"), this._quackyComponent = this.quacky.getComponent(e.Quacky)
            }, r.prototype.update = function () {
                this._tileSprite.offsetY -= this.direction * this._quackyComponent.speed * t.delta
            }, r
        }(at.Component);
    e.TileSpriteScroller = s
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Director,
        n = at.Entity,
        r = at.AnimationSprite,
        i = function (t) {
            function n(n) {
                t.call(this, n);
                var i = new r("quacky", 3, 3, "run", {
                    run: {
                        fps: 15,
                        frames: [0, 1, 2],
                        isOnce: !1
                    },
                    jump: {
                        fps: 15,
                        frames: [3, 4, 5],
                        isOnce: !1
                    },
                    fall: {
                        fps: 15,
                        frames: [3, 4, 5],
                        isOnce: !1
                    },
                    trance: {
                        fps: 35,
                        frames: [6, 7, 8],
                        isOnce: !1
                    }
                });
                this.setDisplayObject(i), this.pivot.set(i.getWidth() * HALF, i.getHeight() * HALF), this.boundingCircleRadius = i.getHeight() * HALF, this.addComponent(new e.Quacky)
            }

            return __extends(n, t), n
        }(at.Entity);
    e.QuackyPrefab = i
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Time,
        n = at.Component,
        r = at.Sprite,
        i = function (e) {
            function n() {
                e.apply(this, arguments), this.rotationSpeed = .1, this.direction = Direction.RIGHT
            }

            return __extends(n, e), n.prototype.init = function () {
            }, n.prototype.update = function () {
                this.entity.rotation += this.direction * this.rotationSpeed * t.delta
            }, n
        }(at.Component);
    e.Rotator = i
})(game || (game = {}));
var game;
(function (e) {
    var t =
            at.Director,
        n = at.Entity,
        r = at.Sprite,
        i = function (n) {
            function i(i) {
                n.call(this, i);
                var s = new r("sun_rays");
                this.setDisplayObject(s), this.pivot.set(s.getWidth() * HALF, s.getHeight() * HALF), this.position.set(t.context.canvas.width * HALF, t.context.canvas.height * HALF), this.alpha = .3, this.addComponent(new e.Rotator)
            }

            return __extends(i, n), i
        }(at.Entity);
    e.SunRays = i
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Component,
        n = at.Time,
        r = function (e) {
            function t(t) {
                e.call(this, t), this.gravity = 9.81, this.mass = 1
            }

            return __extends(t, e), t.prototype.init = function () {
            }, t.prototype.update = function () {
                this.entity.position.y += this.gravity * this.mass * n.delta
            }, t
        }(at.Component);
    e.RigidBody = r
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Director,
        n = at.Entity,
        r = at.Sprite,
        i = function (n) {
            function i(i, s) {
                n.call(this, s);
                var o = new r("step_ladder" + (i ? "_flipped" : ""));
                this.setDisplayObject(o), this.pivot.set(o.getWidth() * HALF, o.getHeight() * HALF), this.position.set(t.context.canvas.width - 120, -120), this.compositeOperation = CompositeOperation.DESTINATION_OVER, this.boundingCircleRadius = o.getHeight() * HALF, this.addComponent(new e.Scroller), this.addComponent(new e.ObstacleRemover), this.addComponent(new e.BreakAway)
            }

            return __extends(i, n), i
        }(at.Entity);
    e.StepLadder = i
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Entity,
        n = at.Sprite,
        r = function (t) {
            function r(r) {
                t.call(this, r);
                var i = new n("tv"),
                    s = new e.RigidBody;
                s.mass = 15, this.setDisplayObject(i), this.pivot.set(i.getWidth() * HALF, i.getHeight() * HALF), this.compositeOperation = CompositeOperation.SOURCE_OVER, this.rotation = Math.PI * 30 / 180, this.boundingCircleRadius = i.getHeight() * HALF, this.addComponent(s), this.addComponent(new e.Scroller), this.addComponent(new e.ObstacleRemover), this.addComponent(new e.BreakAway)
            }

            return __extends(r, t), r
        }(at.Entity);
    e.TV = r
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Entity,
        n = at.Sprite,
        r = function (t) {
            function r(r) {
                t.call(this, r);
                var i = new n("chair"),
                    s = new e.RigidBody,
                    o = new e.Rotator;
                s.mass = 30, o.rotationSpeed = Math.PI * 360 / 180, this.setDisplayObject(i), this.pivot.set(i.getWidth() * HALF, i.getHeight() * HALF), this.compositeOperation = CompositeOperation.SOURCE_OVER, this.rotation = Math.PI * 30 / 180, this.boundingCircleRadius = i.getHeight() * HALF, this.addComponent(s), this.addComponent(o), this.addComponent(new e.Scroller), this.addComponent(new e.ObstacleRemover), this.addComponent(new e.BreakAway)
            }

            return __extends(r, t), r
        }(at.Entity);
    e.Chair = r
})(game || (game = {}));
var game;
(function (e) {
    function r() {
        return {
            easy: [
                [
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(t.context.canvas.width - 150, 0)
                    }
                ],
                [
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(150, 0)
                    }
                ]
            ],
            medium: [
                [
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, 0)
                    },
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.Star,
                        position: new n(150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    }
                ],
                [
                    {
                        type: e.TV,
                        position: new n(t.context.canvas.width - 150, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(t.context.canvas.width - 150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, -OBSTACLE_SPAWN_Y_DISTANCE)
                    }
                ],
                [
                    {
                        type: e.TV,
                        position: new n(150, 0)
                    },
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.Star,
                        position: new n(t.context.canvas.width - 150, 0)
                    }
                ],
                [
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, 0)
                    },
                    {
                        type: e.Chair,
                        position: new n(t.context.canvas.width - 150, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(t.context.canvas.width - 150, 0)
                    }
                ],
                [
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, 0)
                    },
                    {
                        type: e.Chair,
                        position: new n(150, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(150, 0)
                    }
                ],
                [
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, 0)
                    },
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, -(OBSTACLE_SPAWN_Y_DISTANCE * 2))
                    },
                    {
                        type: e.Star,
                        position: new n(t.context.canvas.width - 150, 0)
                    }
                ],
                [
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, 0)
                    },
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, -(OBSTACLE_SPAWN_Y_DISTANCE * 2))
                    },
                    {
                        type: e.Star,
                        position: new n(150, -(OBSTACLE_SPAWN_Y_DISTANCE * 2))
                    }
                ]
            ],
            hard: [
                [
                    {
                        type: e.TV,
                        flipY: !0,
                        position: new n(120, 0)
                    },
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, -OBSTACLE_SPAWN_Y_DISTANCE * 2)
                    },
                    {
                        type: e.StepLadder,
                        position: new n(t.context.canvas.width - 120, -(OBSTACLE_SPAWN_Y_DISTANCE * 3))
                    },
                    {
                        type: e.Star,
                        position: new n(150, -(OBSTACLE_SPAWN_Y_DISTANCE * 3))
                    },
                    {
                        type: e.StepLadder,
                        flipY: !0,
                        position: new n(120, -(OBSTACLE_SPAWN_Y_DISTANCE * 4))
                    }
                ],
                [
                    {
                        type: e.TV,
                        position: new n(t.context.canvas.width - 150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.Chair,
                        position: new n(150, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(150, 0)
                    }
                ],
                [
                    {
                        type: e.TV,
                        position: new n(150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.Chair,
                        position: new n(t.context.canvas.width - 150, 0)
                    }
                ],
                [
                    {
                        type: e.TV,
                        position: new n(150, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(t.context.canvas.width - 150, -(OBSTACLE_SPAWN_Y_DISTANCE * 2))
                    },
                    {
                        type: e.Chair,
                        position: new n(t.context.canvas.width - 150, -(OBSTACLE_SPAWN_Y_DISTANCE * 2))
                    }
                ],
                [
                    {
                        type: e.Chair,
                        position: new n(150, 0)
                    },
                    {
                        type: e.Star,
                        position: new n(150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.Chair,
                        position: new n(t.context.canvas.width - 150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    }
                ],
                [
                    {
                        type: e.Chair,
                        position: new n(150, 0)
                    },
                    {
                        type: e.Chair,
                        position: new n(t.context.canvas.width - 150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.Chair,
                        position: new n(150, -(OBSTACLE_SPAWN_Y_DISTANCE * 2))
                    },
                    {
                        type: e.Star,
                        position: new n(150, 0)
                    }
                ],
                [
                    {
                        type: e.Chair,
                        position: new n(t.context.canvas.width - 150, 0)
                    },
                    {
                        type: e.Chair,
                        position: new n(150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    },
                    {
                        type: e.Chair,
                        position: new n(t.context.canvas.width - 150, -(OBSTACLE_SPAWN_Y_DISTANCE * 2))
                    },
                    {
                        type: e.Star,
                        position: new n(150, -OBSTACLE_SPAWN_Y_DISTANCE)
                    }
                ]
            ]
        }
    }

    var t = at.Director,
        n = at.Vector2;
    e.getObstacleData = r
})(game || (game = {}));
var game;
(function (e) {
    var t = at.Component,
        n = at.Input,
        r = at.Vector2,
        i = function (e) {
            function t() {
                e.apply(this, arguments), this.area = new
                    r, this.onClickCallback = function () {
                }, this._touchId = -1
            }

            return __extends(t, e), t.prototype.init = function () {
            }, t.prototype.update = function () {
                for (var e = 0; e < at.Input.touches.length; ++e) {
                    var t = at.Input.touches[e];
                    if (this._touchId < 0) {
                        this._touchId = t.identifier;
                        break
                    }
                    e === at.Input.touches.length - 1 && (this._touchId = -1, this.onClickCallback())
                }
                n.trigger("play") && this.onClickCallback()
            }, t
        }(at.Component);
    e.Clickable = i
})(game || (game = {}));
var game;
(function (e) {
    function l() {
        var t = new at.Input,
            n = document.getElementById("canvas"),
            u = new at.Director(n),
            l = new at.Scene,
            c = new at.Camera,
            h = new at.ImageManager,
            p = new f,
            d = 1,
            v = document.getElementById("loadingText");
        GameAPI.loadAPI(function (m) {
            spilGamesAPI = m;
            var g = m.Branding.getLogo(),
                y = m.Branding.getSplashScreen();
            //pk: remove logo
            // b = m.Branding.getLink("more_games");

            // w = document.getElementById("spilGamesAPILogoLink"),
            // E = document.getElementById("spilGamesAPILogo"),
            // S = document.getElementById("spilGamesAPILogoLinkHud"),
            // x = document.getElementById("spilGamesAPILogoHud"),
            // T = document.getElementById("spilGamesAPIMoreGamesLink");
            // E.src = g.image, w.onclick = function(e) {
            //     g.action(e)
            // }, x.src = g.image, S.onclick = function(e) {
            //     g.action(e)
            // }, T.onclick = function(e) {
            //     b.action(e)
            // };

            if (y.show && y.action) {
                // document.getElementById("spilGamesSplashScreenContainer").style.display = "block";
                // var N = document.getElementById("spilGamesAPISplashScreenLink");
                // console.log(N);
                // N.onclick = function(e) {
                //     y.action(e)
                // }
            }
            p.load({
                // game: {
                //     urls: [MUSIC_URL + "game.mp3", MUSIC_URL + "game.ogg"]
                //     // loop: !0
                // },
                // star_retrieved: {
                //     urls: [FX_URL + "star_retrieved.mp3", FX_URL + "star_retrieved.ogg"]
                // },
                // game_over: {
                //     urls: [MUSIC_URL + "game_over.mp3", MUSIC_URL + "game_over.ogg"]
                // }
            }, function (e, t) {
                v.innerHTML = "Loading sounds...<br /><br />" + t + "/" + e
            }, function () {
                h.load({
                    logo_intro: TEXTURE_URL + "logo_intro.png",
                    tutorial: TEXTURE_URL + "tutorial.png",
                    building: TEXTURE_URL + "building.png",
                    atmosphere: TEXTURE_URL + "atmosphere.jpg",
                    quacky: TEXTURE_URL + "quacky.png",
                    star: TEXTURE_URL + "star.png",
                    tv: TEXTURE_URL + "tv.png",
                    chair: TEXTURE_URL + "chair.png",
                    step_ladder: TEXTURE_URL + "step_ladder.png",
                    step_ladder_flipped: TEXTURE_URL + "step_ladder_flipped.png",
                    ui_button_pause: TEXTURE_URL + "ui_button_pause.png"
                }, function (e, t) {
                    v.innerHTML = "Loading images...<br /><br />" + t + "/" + e
                }, function () {
                    var h = 4,
                        p;
                    //remove splash

                    // p = setInterval(function() {
                    //     h--,
                    //     v.innerHTML = "Game will be ready in " + h + "...", 
                    //     h <= 0 && 
                    //     (clearInterval(p), p = null, v.innerHTML = "Tap Here to Continue", v.style.cursor = "pointer"
                    //        )
                    // }, 1e3)

                    function O() {
                        if ((Date.now() - pktimedrop) > obstacleStartTime + OBSTACLE_SPAWN_DELAY_TIME) {
                            var t = ["medium"];
                            if (!obstacles.length) {
                                distance > DEFAULT_HARD_DISTANCE && t.length < 3 && (t = ["medium", "hard"]);
                                var n = Math.floor(Math.random() * t.length),
                                    r = e.getObstacleData()[t[n]],
                                    i = Math.floor(Math.random() * r.length),
                                    s;
                                for (var o = 0, u = r[i]; o < u.length; ++o) {
                                    if (u[o].type === e.Star && Math.random() > STAR_CHANCE_PER_WAVE) continue;
                                    s = new u[o].type(u[o].flipY), s.position.copy(u[o].position), s.position.y -= s.displayObject.getHeight(), l.addChild(s), obstacles.push(s), s.init()
                                }
                            }
                        }
                    }

                    // document.getElementById("spilGamesAPILogoContainerHud").style.display = "block",
                    // f.Get("game").play(),
                    v.parentNode.parentNode.removeChild(v.parentNode);
                    var h = new i,
                        p = new i,
                        m, g = new i,
                        y = new i,
                        b = new e.QuackyPrefab("quacky"),
                        w = new s("logo_intro"),
                        E = new s("tutorial"),
                        S = new o("building", Tile.REPEAT, null, n.height),
                        x = new o("building", Tile.REPEAT, null, n.height),
                        T = new e.TileSpriteScroller,
                        N = new e.TileSpriteScroller,
                        C = new e.Clickable,
                        k = new e.Clickable,
                        L = at.ImageManager.images.atmosphere,
                        A = L.width / L.height;
                    at.onAdjustScreenCallbacks.push(function () {
                        S.setHeight(n.height + 200), x.setHeight(n.height + 200), c.pivot.set(n.width * HALF, n.height * HALF), n.style.backgroundSize = window.innerWidth + "px " + window.innerWidth / A + "px"
                    }), at.onOrientationChangedCallback = function () {
                        "ontouchstart" in window && (document.getElementById("orientationUI").style.display = "block", at.isPaused = !0)
                    }, at.onOrientationReturnedCallback = function () {
                        document.getElementById("orientationUI").style.display = "none", at.isPaused = !1
                    }, window.onresize = function (e) {
                        at.adjustScreen(n, d)
                    }, at.adjustScreen(n, d), p.setDisplayObject(w), h.position.set(n.width * HALF - w.getWidth() * HALF, -w.getHeight()), g.setDisplayObject(S), g.position.set(-248, -100), x.flipY = !0, y.setDisplayObject(x), y.position.set(n.width - 108, -100), C.onClickCallback = function () {
                        currentGameState === GameState.INTRO && (l.removeChild(this.entity), m = new i, m.setDisplayObject(E), m.addComponent(k), m.position.y = -E.getHeight(), k.onClickCallback = function () {
                            currentGameState === GameState.TUTORIAL && (a.unbind("play"), a.bind(a.Key.MOUSE_LEFT, "jump"), l.removeChild(this.entity), document.getElementById("inGameHud").style.display = "block", obstacleStartTime = Date.now(), currentGameState = GameState.PLAY)
                        }, l.addChild(m), m.init(), currentGameState = GameState.TUTORIAL)
                    }, g.addComponent(T), y.addComponent(N), h.addComponent(C), l.addChild(g), l.addChild(y), l.addChild(b), h.addChild(p), l.addChild(h), u.init(l, c), t.init(), a.bind(a.Key.MOUSE_LEFT, "play"),
                        function M() {
                            u.update();
                            switch (currentGameState) {
                                case GameState.INTRO:
                                    h.position.y < 125 && (h.position.y += 600 * r.delta);
                                    break;
                                case GameState.TUTORIAL:
                                    m.position.y < 0 && (m.position.y += 600 * r.delta);
                                    break;
                                case GameState.PLAY:
                                    O();
                                    break;
                                case GameState.GAME_OVER:
                            }
                            window.raf(M)
                        }()


                })
            })
        })
    }

    var t = at.Mathf,
        n = at.Director,
        r = at.Time,
        i = at.Entity,
        s = at.Sprite,
        o = at.TileSprite,
        u = at.Font,
        a = at.Input,
        f = at.SoundManager;
    e.main = l
})(game || (game = {})), window.addEventListener("load", game.main);

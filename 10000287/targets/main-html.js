/** Cooked with Flambe, https://getflambe.com */
'use strict';
(function() {
    function m(a, b) {
        function c() {}
        c.prototype = a;
        var d = new c,
            e;
        for (e in b) d[e] = b[e];
        b.toString !== Object.prototype.toString && (d.toString = b.toString);
        return d
    }

    function Vh(a) {
        return a instanceof Array ? function() {
            return P.iter(a)
        } : "function" == typeof a.iterator ? E(a, a.iterator) : a.iterator
    }

    function E(a, b) {
        if (null == b) return null;
        null == b.__id__ && (b.__id__ = di++);
        var c;
        null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
        null == c && (c = function() {
            return c.method.apply(c.scope,
                arguments)
        }, c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
        return c
    }
    var g = {},
        A = function() {
            return aa.__string_rec(this, "")
        },
        tb = function(a, b) {
            b = b.split("u").join("");
            this.r = RegExp(a, b)
        };
    g.EReg = tb;
    tb.__name__ = ["EReg"];
    tb.prototype = {
        match: function(a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        matched: function(a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) return this.r.m[a];
            throw "EReg::matched";
        },
        matchedPos: function() {
            if (null == this.r.m) throw "No string matched";
            return {
                pos: this.r.m.index,
                len: this.r.m[0].length
            }
        },
        split: function(a) {
            return a.replace(this.r, "#__delim__#").split("#__delim__#")
        },
        __class__: tb
    };
    var P = function() {};
    g.HxOverrides = P;
    P.__name__ = ["HxOverrides"];
    P.dateStr = function(a) {
        var b = a.getMonth() + 1,
            c = a.getDate(),
            d = a.getHours(),
            e = a.getMinutes(),
            h = a.getSeconds();
        return a.getFullYear() + "-" + (10 > b ? "0" + b : "" + b) + "-" + (10 > c ? "0" + c : "" + c) + " " + (10 > d ? "0" + d : "" + d) + ":" + (10 > e ? "0" + e : "" + e) + ":" + (10 > h ? "0" + h : "" + h)
    };
    P.strDate = function(a) {
        switch (a.length) {
            case 8:
                var a = a.split(":"),
                    b = new Date;
                b.setTime(0);
                b.setUTCHours(a[0]);
                b.setUTCMinutes(a[1]);
                b.setUTCSeconds(a[2]);
                return b;
            case 10:
                return a = a.split("-"), new Date(a[0], a[1] - 1, a[2], 0, 0, 0);
            case 19:
                return b = a.split(" "), a = b[0].split("-"), b = b[1].split(":"), new Date(a[0], a[1] - 1, a[2], b[0], b[1], b[2]);
            default:
                throw "Invalid date format : " + a;
        }
    };
    P.cca = function(a, b) {
        var c = a.charCodeAt(b);
        return c != c ? void 0 : c
    };
    P.substr = function(a, b, c) {
        if (null != b && 0 != b && null != c && 0 > c) return "";
        null == c && (c = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > c && (c = a.length +
            c - b);
        return a.substr(b, c)
    };
    P.remove = function(a, b) {
        var c = a.indexOf(b);
        if (-1 == c) return !1;
        a.splice(c, 1);
        return !0
    };
    P.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur < this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    };
    var ve = function() {};
    g.Lambda = ve;
    ve.__name__ = ["Lambda"];
    ve.array = function(a) {
        for (var b = [], a = Vh(a)(); a.hasNext();) {
            var c = a.next();
            b.push(c)
        }
        return b
    };
    ve.count = function(a, b) {
        var c = 0;
        if (null == b)
            for (var d = Vh(a)(); d.hasNext();) d.next(), c++;
        else
            for (d = Vh(a)(); d.hasNext();) {
                var e =
                    d.next();
                b(e) && c++
            }
        return c
    };
    var we = function() {
        this.length = 0
    };
    g.List = we;
    we.__name__ = ["List"];
    we.prototype = {
        add: function(a) {
            a = [a];
            null == this.h ? this.h = a : this.q[1] = a;
            this.q = a;
            this.length++
        },
        iterator: function() {
            return {
                h: this.h,
                hasNext: function() {
                    return null != this.h
                },
                next: function() {
                    if (null == this.h) return null;
                    var a = this.h[0];
                    this.h = this.h[1];
                    return a
                }
            }
        },
        __class__: we
    };
    var Vf = function() {};
    g.IMap = Vf;
    Vf.__name__ = ["IMap"];
    Math.__name__ = ["Math"];
    var Q = function() {};
    g.Reflect = Q;
    Q.__name__ = ["Reflect"];
    Q.field =
        function(a, b) {
            try {
                return a[b]
            } catch (c) {
                return null
            }
    };
    Q.getProperty = function(a, b) {
        var c;
        return null == a ? null : a.__properties__ && (c = a.__properties__["get_" + b]) ? a[c]() : a[b]
    };
    Q.fields = function(a) {
        var b = [];
        if (null != a) {
            var c = Object.prototype.hasOwnProperty,
                d;
            for (d in a) "__id__" != d && "hx__closures__" != d && c.call(a, d) && b.push(d)
        }
        return b
    };
    Q.isFunction = function(a) {
        return "function" == typeof a && !(a.__name__ || a.__ename__)
    };
    Q.deleteField = function(a, b) {
        if (!Object.prototype.hasOwnProperty.call(a, b)) return !1;
        delete a[b];
        return !0
    };
    var B = function() {};
    g.Std = B;
    B.__name__ = ["Std"];
    B.is = function(a, b) {
        return aa.__instanceof(a, b)
    };
    B.string = function(a) {
        return aa.__string_rec(a, "")
    };
    B["int"] = function(a) {
        return a | 0
    };
    B.parseInt = function(a) {
        var b = parseInt(a, 10);
        if (0 == b && (120 == P.cca(a, 1) || 88 == P.cca(a, 1))) b = parseInt(a);
        return isNaN(b) ? null : b
    };
    B.parseFloat = function(a) {
        return parseFloat(a)
    };
    B.random = function(a) {
        return 0 >= a ? 0 : Math.floor(Math.random() * a)
    };
    var xe = function() {
        this.b = ""
    };
    g.StringBuf = xe;
    xe.__name__ = ["StringBuf"];
    xe.prototype = {
        add: function(a) {
            this.b += B.string(a)
        },
        __class__: xe
    };
    var W = function() {};
    g.StringTools = W;
    W.__name__ = ["StringTools"];
    W.startsWith = function(a, b) {
        return a.length >= b.length && P.substr(a, 0, b.length) == b
    };
    W.replace = function(a, b, c) {
        return a.split(b).join(c)
    };
    W.fastCodeAt = function(a, b) {
        return a.charCodeAt(b)
    };
    var G = g.ValueType = {
        __ename__: ["ValueType"],
        __constructs__: "TNull,TInt,TFloat,TBool,TObject,TFunction,TClass,TEnum,TUnknown".split(",")
    };
    G.TNull = ["TNull", 0];
    G.TNull.toString = A;
    G.TNull.__enum__ = G;
    G.TInt = ["TInt",
        1
    ];
    G.TInt.toString = A;
    G.TInt.__enum__ = G;
    G.TFloat = ["TFloat", 2];
    G.TFloat.toString = A;
    G.TFloat.__enum__ = G;
    G.TBool = ["TBool", 3];
    G.TBool.toString = A;
    G.TBool.__enum__ = G;
    G.TObject = ["TObject", 4];
    G.TObject.toString = A;
    G.TObject.__enum__ = G;
    G.TFunction = ["TFunction", 5];
    G.TFunction.toString = A;
    G.TFunction.__enum__ = G;
    G.TClass = function(a) {
        a = ["TClass", 6, a];
        a.__enum__ = G;
        a.toString = A;
        return a
    };
    G.TEnum = function(a) {
        a = ["TEnum", 7, a];
        a.__enum__ = G;
        a.toString = A;
        return a
    };
    G.TUnknown = ["TUnknown", 8];
    G.TUnknown.toString = A;
    G.TUnknown.__enum__ =
        G;
    var oa = function() {};
    g.Type = oa;
    oa.__name__ = ["Type"];
    oa.getClass = function(a) {
        return null == a ? null : a instanceof Array && null == a.__enum__ ? Array : a.__class__
    };
    oa.getClassName = function(a) {
        return a.__name__.join(".")
    };
    oa.getEnumName = function(a) {
        return a.__ename__.join(".")
    };
    oa.resolveClass = function(a) {
        a = g[a];
        return null == a || !a.__name__ ? null : a
    };
    oa.resolveEnum = function(a) {
        a = g[a];
        return null == a || !a.__ename__ ? null : a
    };
    oa.createEmptyInstance = function(a) {
        function b() {}
        b.prototype = a.prototype;
        return new b
    };
    oa.createEnum =
        function(a, b, c) {
            var d = Q.field(a, b);
            if (null == d) throw "No such constructor " + b;
            if (Q.isFunction(d)) {
                if (null == c) throw "Constructor " + b + " need parameters";
                return d.apply(a, c)
            }
            if (null != c && 0 != c.length) throw "Constructor " + b + " does not need parameters";
            return d
    };
    oa.getEnumConstructs = function(a) {
        return a.__constructs__.slice()
    };
    oa["typeof"] = function(a) {
        switch (typeof a) {
            case "boolean":
                return G.TBool;
            case "string":
                return G.TClass(String);
            case "number":
                return Math.ceil(a) == a % 2147483648 ? G.TInt : G.TFloat;
            case "object":
                if (null ==
                    a) return G.TNull;
                var b = a.__enum__;
                if (null != b) return G.TEnum(b);
                a = a instanceof Array && null == a.__enum__ ? Array : a.__class__;
                return null != a ? G.TClass(a) : G.TObject;
            case "function":
                return a.__name__ || a.__ename__ ? G.TObject : G.TFunction;
            case "undefined":
                return G.TNull;
            default:
                return G.TUnknown
        }
    };
    var F = function() {};
    g["chicken.GameContext"] = F;
    F.__name__ = ["chicken", "GameContext"];
    F.get_instance = function() {
        null == F.__instance && (F.__instance = new F);
        return F.__instance
    };
    F.prototype = {
        init: function(a, b, c) {
            this.pack =
                a;
            this.director = c;
            this.messages = pe.parse(b.getFile("messages.ini").toString());
            this.arial = new rd(this.pack, "fonts/Arial");
            this.yellowFont = new rd(this.pack, "fonts/yellow");
            this.spritesheets = new Wf;
            this.spritesheets.add("ui");
            this.spritesheets.add("game");
            Ia.spriteSheet = this.spritesheets;
            this.sound = new Xf(this);
            this.sound.setSoundState(ra.soundEnabled());
            this.gameManager = new Yf;
            this.animation = new sd;
            z._platform.getStage().resize.connect(E(this, this.checkOrientation));
            this.checkOrientation();
            this.lib =
                Rc.fromFlipbooks([(new bd("exp_glass", this.pack.getTexture("exp_glass").split(3, 2))).setDuration(0.5).setAnchor(123, 83), (new bd("exp_tnt", this.pack.getTexture("exp_tnt").split(8))).setDuration(0.5).setAnchor(56, 56), (new bd("exp_wood_dark", this.pack.getTexture("exp_wood_dark").split(3, 2))).setDuration(0.5).setAnchor(123, 83), (new bd("exp_wood_light", this.pack.getTexture("exp_wood_light").split(3, 2))).setDuration(0.5).setAnchor(123, 83), (new bd("clock", this.pack.getTexture("clock").split(7, 2))).setDuration(2.5).setAnchor(35,
                    35), (new bd("firework", this.pack.getTexture("firework").split(5, 3))).setDuration(0.5).setAnchor(74, 70)])
        },
        pauseGame: function() {
            wa.trace(["The advertisement is about to show, you should pause your game"]);
            this.sound.muteForAds()
        },
        resumeGame: function() {
            wa.trace(["The advertisment is shown and your game can now be resumed"]);
            this.sound.unmuteForAds()
        },
        enterHomeScene: function(a) {
            null == a && (a = !0);
            this.director.unwindToScene(ah.create(this), a ? new Cd(0.5, X.quadOut) : null)
        },
        enterLevelSelectScene: function(a) {
            null ==
                a && (a = !0);
            var b = Dd.create(this);
            this.director.unwindToScene(b.owner, a ? new Cd(0.5, X.quadOut) : null);
            b.shown.connect(E(b, b.startAnimation)).once()
        },
        enterPlayingScene: function(a, b) {
            null == b && (b = !0);
            if (48 < a) this.showDemo();
            else {
                var c = Ed.create(this, a);
                this.director.unwindToScene(c.owner, b ? new Cd(0.5, X.quadOut) : null);
                c.shown.connect(function() {
                    Ba.get_instance().startLevel.emit(a)
                }).once()
            }
        },
        showCredits: function(a) {
            this.director.pushScene(bh.create(this, a))
        },
        showDemo: function() {
            this.director.pushScene(ch.create(this))
        },
        checkOrientation: function() {
            s.CANVAS_HEIGHT = I.STAGE_HEIGHT;
            s.CANVAS_WIDTH = I.STAGE_WIDTH;
            wa.trace([z._platform.getStage().orientation, B.string(z._platform.getStage().orientation) == B.string(Kb.Landscape)]);
            wa.trace([z._platform.getStage().get_debugInfo()]);
            B.string(z._platform.getStage().orientation) == B.string(Kb.Landscape) ? (z._platform.getExternal().call("enableWarning"), wa.trace(["need rotate"])) : B.string(z._platform.getStage().orientation) == B.string(Kb.Portrait) && (z._platform.getExternal().call("disableWarning"),
                wa.trace(["normal"]))
        },
        __class__: F
    };
    var dh = function() {};
    g["chicken.Main"] = dh;
    dh.__name__ = ["chicken", "Main"];
    dh.main = function() {
        s.STAGE_WIDTH = 640;
        s.STAGE_HEIGHT = 960;
        s.MAX_STAGE_WIDTH = 800;
        I.BASE_WIDTH = s.STAGE_WIDTH | 0;
        I.BASE_HEIGHT = s.STAGE_HEIGHT | 0;
        I.MAX_WIDTH = s.MAX_STAGE_WIDTH | 0;
        z.init();
        z._platform.getStage().lockOrientation(Kb.Portrait);
        var a = new ye;
        z.root.add(a);
        var b = xa.fromAssets("bootstrap");
        z._platform.loadAssetPack(b).get(function(b) {
            z.loadAssetPack(xa.fromAssetsLocalized("locale")).get(function(d) {
                var e =
                    z.loadAssetPack(xa.fromAssets("main"));
                e.get(function(e) {
                    var n = F.get_instance();
                    n.init(e, d, a);
                    n.enterHomeScene(!1);
                    b.dispose()
                });
                e = eh.create(b, e);
                a.unwindToScene(e)
            })
        });
        s.CANVAS_HEIGHT = I.STAGE_HEIGHT;
        s.CANVAS_WIDTH = I.STAGE_WIDTH
    };
    var sd = function() {};
    g["chicken.control.AnimationControl"] = sd;
    sd.__name__ = ["chicken", "control", "AnimationControl"];
    sd.prototype = {
        showDestroy: function(a, b) {
            var c = F.get_instance(),
                d = "exp_glass",
                e = "glass";
            "tnt" == a.material ? (d = "exp_tnt", e = "tnt") : "wood" == a.material && (d = "linedark" ==
                a.type || "cross" == a.type ? "exp_wood_dark" : "exp_wood_light", e = "wood");
            c.sound.play(e);
            var h = c.lib.createSprite(d, !0);
            this.layer.addChild((new q).add(h));
            h.setXY(function() {
                b.zpp_inner.validate();
                return b.zpp_inner.x
            }(this), function() {
                b.zpp_inner.validate();
                return b.zpp_inner.y
            }(this));
            h.get_looped().connect(function() {
                h.owner.dispose()
            })
        },
        showFirework: function(a, b) {
            var c = F.get_instance().lib.createSprite("firework", !0);
            this.layer.addChild((new q).add(c));
            c.setXY(a, b);
            c.setScale(Math.random() + 1.4);
            c.get_looped().connect(function() {
                c.owner.dispose()
            })
        },
        showEndlessFirework: function() {
            var a = this,
                b = F.get_instance().lib.createSprite("firework", !0);
            this.layer.addChild((new q).add(b));
            this.setRandomView(b);
            b.get_looped().connect(function() {
                a.setRandomView(b)
            })
        },
        setRandomView: function(a) {
            a.setXY(B.random(500) + 200, B.random(300) + 200);
            a.setScale(Math.random() + 1.4)
        },
        __class__: sd
    };
    var fh = function() {};
    g["chicken.control.BodyFactory"] = fh;
    fh.__name__ = ["chicken", "control", "BodyFactory"];
    fh.createBody = function(a, b) {
        var c = null;
        switch (a.type) {
            case "box":
                c = new Sc(a);
                break;
            case "chicken":
                c = new ze(a);
                break;
            case "brick":
                c = new Ae(a);
                break;
            case "cross":
                c = new Be(a);
                break;
            case "circle":
                c = new Ce(a);
                break;
            case "line":
                c = new Sc(a);
                break;
            case "linedark":
                c = new Sc(a);
                break;
            case "linelight":
                c = new Sc(a);
                break;
            case "corner":
                c = new De(a);
                break;
            case "tshape":
                c = new Ee(a);
                break;
            case "trapeze":
                c = new Fe(a);
                break;
            case "triangle":
                c = new Ge(a)
        }
        null != c && c.setSpace(b);
        return aa.__cast(c, C)
    };
    var Yf = function() {};
    g["chicken.control.GameManager"] = Yf;
    Yf.__name__ = ["chicken", "control", "GameManager"];
    Yf.prototype = {
        getSurfaceTexture: function(a, b) {
            var c = "grass";
            32 < a ? c = "snow" : 16 < a && (c = "sand");
            var d = c + "20000";
            310 > b && (d = c + "10000");
            return d
        },
        getGroundTexture: function() {
            var a = "";
            32 < this.level ? a = "_snow" : 16 < this.level && (a = "_sand");
            return a
        },
        getBgTexture: function(a) {
            var b = "bg/bg0";
            32 < a ? b = "bg/bg2" : 16 < a && (b = "bg/bg1");
            return b
        },
        getKoefficient: function() {
            var a = 1;
            10 > this.level ? a = 1 : 20 > this.level ? a = 1 : 30 > this.level ? a = 2 : 40 > this.level ? a = 3 : 50 > this.level && (a = 4);
            return a
        },
        __class__: Yf
    };
    var Ba = function() {
        this.winLevel =
            new Ab;
        this.levelLose = new Ab;
        this.restartLevel = new Ab;
        this.startLevel = new Ca;
        this.nextLevel = new Ab
    };
    g["chicken.control.Notification"] = Ba;
    Ba.__name__ = ["chicken", "control", "Notification"];
    Ba.get_instance = function() {
        null == Ba.__instance && (Ba.__instance = new Ba);
        return Ba.__instance
    };
    Ba.prototype = {
        __class__: Ba
    };
    var Xf = function(a) {
        this.__play = !1;
        this.__ctx = a
    };
    g["chicken.control.SoundControl"] = Xf;
    Xf.__name__ = ["chicken", "control", "SoundControl"];
    Xf.prototype = {
        play: function(a, b, c) {
            null == b && (b = 0);
            var d = this,
                a = "sounds/" + a;
            if (this.__play)
                if (0 == b) this.__ctx.pack.getSound(a).play();
                else {
                    var e = new cd;
                    e.run(new Fd([new dd(b), new Gd(function() {
                        d.__ctx.pack.getSound(a).play()
                    })]));
                    null == c ? z.root.add(e) : c.add(e)
                }
        },
        playLoop: function(a, b) {
            null == b && (b = 1);
            a = "sounds/" + a;
            null == this.__bgSound && (this.__bgSound = this.__ctx.pack.getSound(a).loop(b));
            this.__play || this.__bgSound.set_paused(!0)
        },
        changeVolume: function() {
            this.__play = !this.__play;
            this.__bgSound.set_paused(!this.__play);
            ra.setSoundState(this.__play)
        },
        setSoundState: function(a) {
            this.__play =
                a
        },
        muteForAds: function() {
            this.__curentState = this.__play;
            this.__play = !1;
            this.__bgSound.set_paused(!0)
        },
        unmuteForAds: function() {
            this.__curentState && (this.__play = !0, this.__bgSound.set_paused(!1))
        },
        __class__: Xf
    };
    var Bb = function() {};
    g["flambe.util.Disposable"] = Bb;
    Bb.__name__ = ["flambe", "util", "Disposable"];
    Bb.prototype = {
        __class__: Bb
    };
    var D = function() {};
    g["flambe.Component"] = D;
    D.__name__ = ["flambe", "Component"];
    D.__interfaces__ = [Bb];
    D.prototype = {
        onAdded: function() {},
        onRemoved: function() {},
        onUpdate: function() {},
        dispose: function() {
            null != this.owner && this.owner.remove(this)
        },
        get_name: function() {
            return null
        },
        init: function(a, b) {
            this.owner = a;
            this.next = b
        },
        __class__: D,
        __properties__: {
            get_name: "get_name"
        }
    };
    var tc = function() {
        this.zpp_inner = null;
        this.zpp_inner = new ya;
        this.zpp_inner.outer = this
    };
    g["nape.callbacks.CbType"] = tc;
    tc.__name__ = ["nape", "callbacks", "CbType"];
    tc.prototype = {
        toString: function() {
            return this == ya.ANY_BODY ? "ANY_BODY" : this == ya.ANY_SHAPE ? "ANY_SHAPE" : this == ya.ANY_COMPOUND ? "ANY_COMPOUND" : this == ya.ANY_CONSTRAINT ?
                "ANY_CONSTRAINT" : "CbType#" + this.zpp_inner.id
        },
        __class__: tc
    };
    var ya = function() {
        this.cbsets = this.listeners = this.bodylisteners = this.conlisteners = null;
        this.id = 0;
        this.outer = null;
        this.id = Da.CbType();
        this.listeners = new Hd;
        this.bodylisteners = new He;
        this.conlisteners = new Ie;
        this.constraints = new ed;
        this.interactors = new fd;
        this.cbsets = new gd
    };
    g["zpp_nape.callbacks.ZPP_CbType"] = ya;
    ya.__name__ = ["zpp_nape", "callbacks", "ZPP_CbType"];
    ya.prototype = {
        addint: function(a) {
            for (var b = null, c = this.listeners.head; null != c;) {
                var d =
                    c.elt;
                if (a.precedence > d.precedence || a.precedence == d.precedence && a.id > d.id) break;
                b = c;
                c = c.next
            }
            this.listeners.inlined_insert(b, a);
            this.invalidateint()
        },
        invalidateint: function() {
            for (var a = this.cbsets.head; null != a;) {
                var b = a.elt;
                b.zip_listeners = !0;
                b.invalidate_pairs();
                a = a.next
            }
        },
        addbody: function(a) {
            for (var b = null, c = this.bodylisteners.head; null != c;) {
                var d = c.elt;
                if (a.precedence > d.precedence || a.precedence == d.precedence && a.id > d.id) break;
                b = c;
                c = c.next
            }
            this.bodylisteners.inlined_insert(b, a);
            this.invalidatebody()
        },
        invalidatebody: function() {
            for (var a = this.cbsets.head; null != a;) a.elt.zip_bodylisteners = !0, a = a.next
        },
        addconstraint: function(a) {
            for (var b = null, c = this.conlisteners.head; null != c;) {
                var d = c.elt;
                if (a.precedence > d.precedence || a.precedence == d.precedence && a.id > d.id) break;
                b = c;
                c = c.next
            }
            this.conlisteners.inlined_insert(b, a);
            this.invalidateconstraint()
        },
        invalidateconstraint: function() {
            for (var a = this.cbsets.head; null != a;) a.elt.zip_conlisteners = !0, a = a.next
        },
        __class__: ya
    };
    var Da = function() {};
    g["zpp_nape.ZPP_ID"] = Da;
    Da.__name__ = ["zpp_nape", "ZPP_ID"];
    Da.Interactor = function() {
        return Da._Interactor++
    };
    Da.CbType = function() {
        return Da._CbType++
    };
    Da.CbSet = function() {
        return Da._CbSet++
    };
    Da.Listener = function() {
        return Da._Listener++
    };
    var Hd = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_InteractionListener"] = Hd;
    Hd.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_InteractionListener"];
    Hd.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null ==
                Ra.zpp_pool ? b = new Ra : (b = Ra.zpp_pool, Ra.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        inlined_insert: function(a, b) {
            var c;
            null == Ra.zpp_pool ? c = new Ra : (c = Ra.zpp_pool, Ra.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = Ra.zpp_pool;
            Ra.zpp_pool = a;
            null == this.head &&
                (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = Ra.zpp_pool;
            Ra.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        inlined_clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        __class__: Hd
    };
    var He = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_BodyListener"] = He;
    He.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_BodyListener"];
    He.prototype = {
        inlined_insert: function(a, b) {
            var c;
            null == Tc.zpp_pool ? c = new Tc : (c = Tc.zpp_pool, Tc.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next =
                this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = Tc.zpp_pool;
            Tc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b =
                this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = Tc.zpp_pool;
            Tc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        __class__: He
    };
    var Ie = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_ConstraintListener"] = Ie;
    Ie.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_ConstraintListener"];
    Ie.prototype = {
        inlined_insert: function(a, b) {
            var c;
            null == uc.zpp_pool ? c = new uc : (c = uc.zpp_pool, uc.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = uc.zpp_pool;
            uc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b =
                null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = uc.zpp_pool;
            uc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        __class__: Ie
    };
    var ed = function() {
        this.length = 0;
        this.modified =
            this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Constraint"] = ed;
    ed.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Constraint"];
    ed.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == Ja.zpp_pool ? b = new Ja : (b = Ja.zpp_pool, Ja.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = Ja.zpp_pool;
            Ja.zpp_pool =
                a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        erase: function(a) {
            return this.inlined_erase(a)
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next,
                null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = Ja.zpp_pool;
            Ja.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: ed
    };
    var fd = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Interactor"] = fd;
    fd.__name__ = ["zpp_nape",
        "util", "ZNPList_ZPP_Interactor"
    ];
    fd.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == ja.zpp_pool ? b = new ja : (b = ja.zpp_pool, ja.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = ja.zpp_pool;
            ja.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = ja.zpp_pool;
            ja.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        inlined_clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: fd
    };
    var gd = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_CbSet"] = gd;
    gd.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_CbSet"];
    gd.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == bb.zpp_pool ? b = new bb : (b = bb.zpp_pool, bb.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = bb.zpp_pool;
            bb.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = bb.zpp_pool;
            bb.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: gd
    };
    var cb = function() {
        this.__space =
            new Zf(new K(0, 250));
        this.__animation = new sd
    };
    g["chicken.control.SpaceControl"] = cb;
    cb.__name__ = ["chicken", "control", "SpaceControl"];
    cb.__super__ = D;
    cb.prototype = m(D.prototype, {
        get_name: function() {
            return "SpaceControl_9"
        },
        glassDetect: function(a) {
            for (var b = a.zpp_inner.int1.outer_i.get_castBody(), c = a.zpp_inner.int2.outer_i.get_castBody(), a = a.zpp_inner.wrap_arbiters.iterator(); a.hasNext();) a.zpp_critical = !1, 500 < a.zpp_inner.at(a.zpp_i++).totalImpulse().get_y() && (null != b && this.checkGlass(b), null != c && this.checkGlass(c))
        },
        checkGlass: function(a) {
            null == a.zpp_inner_i.userData && (a.zpp_inner_i.userData = {});
            var b = a.zpp_inner_i.userData.data.item();
            if (null != b && "glass" == b.material) {
                this.__animation.showDestroy(b, function() {
                    null == a.zpp_inner.wrap_pos && a.zpp_inner.setupPosition();
                    return a.zpp_inner.wrap_pos
                }(this));
                a.zpp_inner.immutable_midstep("Body::space");
                if (null != (null == a.zpp_inner.space ? null : a.zpp_inner.space.outer)) {
                    if (null != (null == a.zpp_inner.space ? null : a.zpp_inner.space.outer)) a.zpp_inner.component.woken = !1;
                    if (null !=
                        (null == a.zpp_inner.space ? null : a.zpp_inner.space.outer))(null == a.zpp_inner.space ? null : a.zpp_inner.space.outer).zpp_inner.wrap_bodies.remove(a)
                }
                null == a.zpp_inner.space ? null : a.zpp_inner.space.outer
            }
        },
        collisionDetect: function() {
            this.checkWinCounter = 0;
            this.checkWin = !0
        },
        createLevel: function(a, b) {
            this.scoreTimer = 1E4;
            this.__level = a;
            var c = JSON.parse(F.get_instance().pack.getFile("levels/level" + a + ".json").toString());
            this.__layer = b;
            this.__animation.layer = this.__layer;
            this.gameWin = this.checkWin = !1;
            for (var d =
                0, c = c.level; d < c.length;) {
                var e = c[d];
                ++d;
                var h = fh.createBody(e, this.__space),
                    n = !0;
                "box" == e.type && "ground" == e.material && (this.createGrass(e), n = !1);
                b.addChild((new q).add(h), n);
                "chicken" == e.type && (this.chickenBody = h)
            }
            this.chicken = (new q).add((new Id(new Rc(F.get_instance().pack, "chicken"))).loop("normal")).add((new v).setXY(-200, -200));
            this.__layer.addChild(this.chicken);
            this.chickenBody.addAnim(this.chicken);
            for (d = 0; 100 > d;) d++, this.__space.step(0.01);
            d = Xd;
            null == f.CbEvent_BEGIN && (f.internal = !0, f.CbEvent_BEGIN =
                new Sa, f.internal = !1);
            c = f.CbEvent_BEGIN;
            null == f.InteractionType_COLLISION && (f.internal = !0, f.InteractionType_COLLISION = new fb, f.internal = !1);
            d = new d(c, f.InteractionType_COLLISION, cb.chickenCollision, cb.groundCollision, E(this, this.collisionDetect));
            c = Xd;
            null == f.CbEvent_BEGIN && (f.internal = !0, f.CbEvent_BEGIN = new Sa, f.internal = !1);
            e = f.CbEvent_BEGIN;
            null == f.InteractionType_COLLISION && (f.internal = !0, f.InteractionType_COLLISION = new fb, f.internal = !1);
            c = new c(e, f.InteractionType_COLLISION, cb.glassCollision,
                ya.ANY_BODY, E(this, this.glassDetect));
            this.__space.zpp_inner.wrap_listeners.add(d);
            this.__space.zpp_inner.wrap_listeners.add(c);
            this.pause = !1;
            this.clock = new Je;
            this.__layer.addChild((new q).add(this.clock))
        },
        createGrass: function(a) {
            var b = 10;
            16 < this.__level && 33 > this.__level && (b = 20);
            var c = F.get_instance().gameManager.getSurfaceTexture(this.__level, a.width);
            Ia.sprite(c, this.__layer, !1).setXY(a.x, a.y - a.height / 2 + b)
        },
        onUpdate: function(a) {
            if (!this.pause && (this.__space.step(a), this.checkWin && !this.gameWin))
                if (null ==
                    this.chickenBody.body().get_space()) this.checkWin = !1, this.clock.hide();
                else if (0.1 > this.chickenBody.body().get_velocity().get_y() && 0.1 > this.chickenBody.body().get_velocity().get_x() ? (this.checkWinCounter++, 10 < this.checkWinCounter && this.clock.show()) : (this.checkWinCounter = 0, this.clock.hide()), 130 < this.checkWinCounter) {
                F.get_instance().sound.play("chicken_win");
                this.clock.hide();
                this.gameWin = !0;
                this.chickenBody.addAnim(null);
                this.pause = !0;
                var a = this.chicken._compMap.Sprite_15,
                    b = this.chicken._compMap.MoviePlayer_10;
                b.loop("final");
                a.rotation.animateTo(0, 0.1);
                Z.to(a, 0.5, {
                    y: a.y._value - 100
                }, 0, null, X.expoOut);
                Z.to(a, 0.5, {
                    y: a.y._value
                }, 0.5, null, X.expoIn);
                Z.to(a, 0, {}, 1, function() {
                    b.loop("normal");
                    Ba.get_instance().winLevel.emit()
                })
            }
        },
        handleTouch: function(a) {
            if (!this.pause) {
                a = this.__space.bodiesUnderPoint(new K(a.x, a.y));
                a.zpp_inner.valmod();
                for (a = gb.get(a); a.hasNext();) {
                    var b;
                    a.zpp_critical = !1;
                    b = a.zpp_inner.at(a.zpp_i++);
                    var c;
                    c = aa.__cast(function() {
                            null == b.zpp_inner_i.userData && (b.zpp_inner_i.userData = {});
                            return b.zpp_inner_i.userData
                        }(this).data,
                        C);
                    var d = c.item().material;
                    if (null != c && ("wood" == d || "glass" == d || "tnt" == d)) {
                        b.zpp_inner.immutable_midstep("Body::space");
                        if (null != (null == b.zpp_inner.space ? null : b.zpp_inner.space.outer)) {
                            if (null != (null == b.zpp_inner.space ? null : b.zpp_inner.space.outer)) b.zpp_inner.component.woken = !1;
                            if (null != (null == b.zpp_inner.space ? null : b.zpp_inner.space.outer))(null == b.zpp_inner.space ? null : b.zpp_inner.space.outer).zpp_inner.wrap_bodies.remove(b)
                        }
                        null == b.zpp_inner.space ? null : b.zpp_inner.space.outer;
                        "tnt" == d && gh.createExplosion(function() {
                            null ==
                                b.zpp_inner.wrap_pos && b.zpp_inner.setupPosition();
                            return b.zpp_inner.wrap_pos
                        }(this), this.__space);
                        this.__animation.showDestroy(c.item(), function() {
                            null == b.zpp_inner.wrap_pos && b.zpp_inner.setupPosition();
                            return b.zpp_inner.wrap_pos
                        }(this))
                    }
                }
            }
        },
        restartLevel: function() {
            this.clearLevel();
            this.createLevel(this.__level, this.__layer)
        },
        clearLevel: function() {
            this.pause = !0;
            this.__layer.disposeChildren();
            this.__space.clear()
        },
        __class__: cb
    });
    var ob = function() {};
    g["chicken.control.SponsorControl"] = ob;
    ob.__name__ = ["chicken", "control", "SponsorControl"];
    // ob.addLogo = function(a) {
    //     var b = new ba(F.get_instance().pack.getTexture("zibbo"));
    //     b.centerAnchor();
    //     b.get_pointerDown().connect(function() {
    //         z._platform.getExternal().call("clickLogo")
    //     });
    //     a.addChild((new q).add(b));
    //     w.bottomLeft(b, 20, -20);
    //     b.alpha.animate(0, 1, 0.5);
    //     return b
    // };
    // ob.addMoreGames = function(a) {
    //     var b = new ba(F.get_instance().spritesheets.get("button_moregames0000"));
    //     b.centerAnchor();
    //     w.bottomCenterSprite(b, 0, -100);
    //     b.scaleX.animate(0.5, 1, 0.5, X.backOut);
    //     b.scaleY.animate(0.5,
    //         1, 0.5, X.backOut);
    //     b.get_pointerDown().connect(function() {
    //         z._platform.getExternal().call("clickMoreGames")
    //     });
    //     a.addChild((new q).add(b));
    //     return b
    // };
    var ra = function() {};
    g["chicken.control.StorageController"] = ra;
    ra.__name__ = ["chicken", "control", "StorageController"];
    ra.saveLevel = function(a, b, c) {
        //pk: ending
        //a: stars b: score: c: levels
        updateShareScore(c);
        
        ra.getLevelStars(c) < a && (ra.set(null == c ? "null" : "" + c, a), null); - 1 == ra.getLevelStars(c + 1) && ra.set(B.string(c + 1), 0);
        ra.getLevelScore(c) < b && (z._platform.getStorage().set("score" + (null == c ? "null" : "" + c), b), null)
    };
    ra.soundEnabled =
        function() {
            return ra.get("sound", !0)
    };
    ra.setSoundState = function(a) {
        return ra.set("sound", a)
    };
    ra.getLevelStars = function(a) {
        return ra.get(null == a ? "null" : "" + a, -1)
    };
    ra.getLevelScore = function(a) {
        return z._platform.getStorage().get("score" + (null == a ? "null" : "" + a), 0)
    };
    ra.set = function(a, b) {
        return z._platform.getStorage().set(ra.prefix + a, b)
    };
    ra.get = function(a, b) {
        return z._platform.getStorage().get(ra.prefix + a, b)
    };
    var s = function() {};
    g["chicken.model.Options"] = s;
    s.__name__ = ["chicken", "model", "Options"];
    s.offsetX =
        function() {
            return 0.5 * (s.CANVAS_WIDTH - s.STAGE_WIDTH)
    };
    var bh = function() {};
    g["chicken.scene.CreditsScene"] = bh;
    bh.__name__ = ["chicken", "scene", "CreditsScene"];
    bh.create = function(a, b) {
        var c = new q;
        c.add(new Cb(!1));
        var d = new ec(0, s.CANVAS_WIDTH, s.CANVAS_HEIGHT);
        d.alpha.animate(0, 0.5, 0.5);
        c.addChild((new q).add(d));
        d = new R(a.yellowFont, a.messages.get("credit"));
        d.setWrapWidth(s.CANVAS_WIDTH).setAlign(ka.Center);
        d.x.animate(-s.STAGE_WIDTH, 0, 0.5, X.backOut);
        d.y.set__(s.STAGE_HEIGHT / 2 - 150);
        var e = new ec(0, s.CANVAS_WIDTH,
            d.getNaturalHeight() + 5);
        e.alpha.animate(0, 0.5, 0.5);
        e.y.set__(d.y._value);
        c.addChild((new q).add(e));
        c.addChild((new q).add(d));
        d = new ba(a.spritesheets.get("play_red0000"));
        d.centerAnchor();
        d.get_pointerDown().connect(function() {
            a.sound.play("click");
            a.director.unwindToScene(b)
        });
        c.addChild((new q).add(d));
        w.centerSprite(d);
        return c
    };
    var Cb = function(a) {
        null == a && (a = !0);
        this.opaque = a;
        this.shown = new Ab;
        this.hidden = new Ab
    };
    g["flambe.scene.Scene"] = Cb;
    Cb.__name__ = ["flambe", "scene", "Scene"];
    Cb.__super__ =
        D;
    Cb.prototype = m(D.prototype, {
        get_name: function() {
            return "Scene_0"
        },
        __class__: Cb
    });
    var Ed = function(a) {
        Cb.call(this, a)
    };
    g["chicken.scene.GameScene"] = Ed;
    Ed.__name__ = ["chicken", "scene", "GameScene"];
    Ed.create = function(a, b) {
        var c = new Ed,
            d = new q;
        d.add(c);
        var e = new Ke;
        e.setLevel(b);
        d.add(e);
        return c
    };
    Ed.__super__ = Cb;
    Ed.prototype = m(Cb.prototype, {
        __class__: Ed
    });
    var Dd = function(a) {
        this.page = 1;
        Cb.call(this, a)
    };
    g["chicken.scene.LevelSelectScene"] = Dd;
    Dd.__name__ = ["chicken", "scene", "LevelSelectScene"];
    Dd.create =
        function() {
            var a = new Dd,
                b = new q;
            b.add(a);
            a.bgsprite1 = Ia.imagesprite("bg/bg0", b).centerAnchor();
            w.topCenter(a.bgsprite1);
            a.bgsprite2 = Ia.imagesprite("bg/bg1", b).setAlpha(0).centerAnchor();
            w.topCenter(a.bgsprite2);
            a.bgsprite3 = Ia.imagesprite("bg/bg2", b).setAlpha(0).centerAnchor();
            w.topCenter(a.bgsprite3);
            // ob.addLogo(b);
            return a
    };
    Dd.__super__ = Cb;
    Dd.prototype = m(Cb.prototype, {
        startAnimation: function() {
            var a = this,
                b = F.get_instance();
            b.sound.play("slide2");
            this.bgLevelPopup = new v;
            this.buttonContainer = (new q).add(this.bgLevelPopup);
            this.owner.addChild(this.buttonContainer);
            this.bgLevelPopup.x.set__(s.offsetX());
            for (var c = 0; 3 > c;)
                for (var d = c++, e = 0; 4 > e;)
                    for (var h = e++, n = 0; 4 > n;) {
                        var f = n++,
                            f = new Le(h, f, d);
                        this.buttonContainer.addChild((new q).add(f))
                    }
            c = new td;
            this.owner.addChild((new q).add(c));
            w.topRight(c.get_body(), -10, 10);
            this.leftButton = new Ea("button_left0000", 1);
            this.owner.addChild((new q).add(this.leftButton));
            w.bottomCenterSprite(this.leftButton.get_body(), -100, -150);
            this.leftButton.get_body().get_pointerDown().connect(function() {
                a.swapPages(a.page -
                    1)
            });
            this.rightButton = new Ea("button_right0000", 1);
            this.owner.addChild((new q).add(this.rightButton));
            w.bottomCenterSprite(this.rightButton.get_body(), 100, -150);
            this.rightButton.get_body().get_pointerDown().connect(function() {
                a.swapPages(a.page + 1)
            });
            c = new Ea("home_button0000", 1);
            this.owner.addChild((new q).add(c));
            w.bottomCenterSprite(c.get_body(), 0, -150);
            c.get_body().get_pointerDown().connect(function() {
                b.director.unwindToScene(a.owner);
                b.enterHomeScene()
            });
            // c = ob.addMoreGames(this.owner);
            // w.bottomRight(c, -10, -20);
            this.buttonvisible()
        },
        swapPages: function(a) {
            1 == this.page && this.bgsprite1.alpha.animateTo(0, 1);
            2 == this.page && this.bgsprite2.alpha.animateTo(0, 1);
            3 == this.page && this.bgsprite3.alpha.animateTo(0, 1);
            this.page = a;
            Z.to(this.bgLevelPopup, 1, {
                x: -s.CANVAS_WIDTH * (this.page - 1) + s.offsetX()
            });
            1 == this.page && this.bgsprite1.alpha.animateTo(1, 1);
            2 == this.page && this.bgsprite2.alpha.animateTo(1, 1);
            3 == this.page && this.bgsprite3.alpha.animateTo(1, 1);
            this.buttonvisible()
        },
        buttonvisible: function() {
            this.leftButton.get_body().set_visible(1 <
                this.page);
            this.rightButton.get_body().set_visible(3 > this.page)
        },
        __class__: Dd
    });
    var ah = function() {};
    g["chicken.scene.MainMenuScene"] = ah;
    ah.__name__ = ["chicken", "scene", "MainMenuScene"];
    ah.create = function(a) {
        var b = new q,
            c = new ba(F.get_instance().pack.getTexture("bg/main"));
        b.addChild((new q).add(c));
        c.centerAnchor();
        w.topCenter(c);
        c = new ba(a.spritesheets.get("play_big0000"));
        c.centerAnchor();
        w.bottomCenterSprite(c, 0, -200);
        c.scaleX.animate(0.5, 1, 0.5, X.backOut);
        c.scaleY.animate(0.5, 1, 0.5, X.backOut);
        c.get_pointerDown().connect(function() {
            a.sound.play("click");
            a.enterLevelSelectScene()
        });
        b.addChild((new q).add(c));
        // ob.addMoreGames(b);
        a.sound.playLoop("loop", 0.2);
        c = new td;
        b.addChild((new q).add(c));
        w.topRight(c.get_body(), -10, 10);
        c = new ba(a.spritesheets.get("credits_button0000"));
        c.centerAnchor();
        c.get_pointerDown().connect(function() {
            a.showCredits(b)
        });
        b.addChild((new q).add(c));
        w.bottomRight(c, -20, -20);
        c.scaleX.animate(0.5, 1, 0.5, X.backOut);
        c.scaleY.animate(0.5, 1, 0.5, X.backOut);
        // ob.addLogo(b);
        return b
    };
    var eh = function() {};
    g["chicken.scene.PreloaderScene"] =
        eh;
    eh.__name__ = ["chicken", "scene", "PreloaderScene"];
    eh.create = function(a, b) {
        var c = new q,
            d = new ec(16777215, s.CANVAS_WIDTH, s.CANVAS_HEIGHT);
        c.addChild((new q).add(d));
        d = new ba(a.getTexture("progress/zibbo"));
        d.centerAnchor();
        var e = (new q).add(d);
        w.topCenter(d, 0, 100);
        c.addChild(e);
        d = new ba(a.getTexture("progress/loader_back"));
        d.centerAnchor();
        e = (new q).add(d);
        w.centerSprite(d, 0, 200);
        c.addChild(e);
        var h = new ba(a.getTexture("progress/loader_progress"));
        h.centerAnchor();
        e.addChild((new q).add(h));
        w.centerInTheParent(h,
            0, 0);
        h.scissor = new Lb(0, 0, 0, h.getNaturalHeight());
        e = (s.CANVAS_WIDTH - 20) / d.getNaturalWidth();
        d.setScale(Math.min(1, e));
        b.progressChanged.connect(function() {
            var a = b._progress / b._total;
            h.scissor = new Lb(0, 0, h.getNaturalWidth() * a, h.getNaturalHeight())
        });
        return c
    };
    var ch = function() {};
    g["chicken.scene.WinGameScene"] = ch;
    ch.__name__ = ["chicken", "scene", "WinGameScene"];
    ch.create = function(a) {
        var b = new q;
        b.add(new Cb(!1));
        var c = new ec(0, s.CANVAS_WIDTH, s.CANVAS_HEIGHT);
        c.alpha.animate(0, 0.5, 0.5);
        c = (new q).add(c);
        b.addChild(c);
        var d = new R(a.yellowFont, a.messages.get("win"));
        d.setWrapWidth(s.CANVAS_WIDTH).setAlign(ka.Center);
        d.x.animate(-s.CANVAS_WIDTH, 0, 0.5, X.backOut);
        d.y.set__(s.CANVAS_HEIGHT / 2 - 150);
        var e = new ec(0, s.CANVAS_WIDTH, d.getNaturalHeight() + 50);
        e.alpha.animate(0, 0.5, 0.5);
        e.y.set__(d.y._value - 25);
        b.addChild((new q).add(e));
        b.addChild((new q).add(d));
        e = new sd;
        e.layer = c;
        e.showEndlessFirework();
        Z.to(d, 0.25, {
            alpha: 1
        }, 0, E(e, e.showEndlessFirework));
        Z.to(d, 0.45, {
            alpha: 1
        }, 0, E(e, e.showEndlessFirework));
        c =
            new ba(a.spritesheets.get("play_red0000"));
        c.centerAnchor();
        c.get_pointerDown().connect(function() {
            a.sound.play("click");
            a.enterHomeScene()
        });
        b.addChild((new q).add(c));
        w.bottomCenterSprite(c, 0, -200);
        // ob.addMoreGames(b);
        // ob.addLogo(b);
        return b
    };
    var Me = function() {};
    g["chicken.view.BackgroundView"] = Me;
    Me.__name__ = ["chicken", "view", "BackgroundView"];
    Me.__super__ = D;
    Me.prototype = m(D.prototype, {
        get_name: function() {
            return "BackgroundView_4"
        },
        onAdded: function() {
            this._layer = new q;
            this.owner.addChild(this._layer);
            this.bgsprite = this.create();
            this.back = this.create();
            this.back.set_visible(!1)
        },
        update: function(a) {
            var b = F.get_instance(),
                a = b.gameManager.getBgTexture(a);
            this.back.texture = b.pack.getTexture(a);
            this.bgsprite.texture = b.pack.getTexture(a)
        },
        hide: function() {
            var a = this;
            this.back.set_visible(!0);
            Z.to(this.bgsprite, 0.5, {
                x: -s.CANVAS_WIDTH
            }, 0, function() {
                a.bgsprite.x.set__(0);
                a.back.set_visible(!1)
            })
        },
        create: function() {
            var a = new ba(F.get_instance().pack.getTexture("bg/bg0"));
            a.getNaturalWidth();
            a.getNaturalHeight();
            this.owner.addChild((new q).add(a), !1);
            return a
        },
        __class__: Me
    });
    var $ = function() {
        this.spritesheet = F.get_instance().spritesheets;
        this.ctx = F.get_instance()
    };
    g["framework.view.AbstractComponent"] = $;
    $.__name__ = ["framework", "view", "AbstractComponent"];
    $.__super__ = D;
    $.prototype = m(D.prototype, {
        get_name: function() {
            return "AbstractComponent_3"
        },
        __class__: $
    });
    var Je = function() {
        this.playSound = !1;
        $.call(this);
        this.soundInterval = 20
    };
    g["chicken.view.Clock"] = Je;
    Je.__name__ = ["chicken", "view", "Clock"];
    Je.__super__ =
        $;
    Je.prototype = m($.prototype, {
        show: function() {
            var a = this;
            null == this.movie && (this.movie = this.ctx.lib.createSprite("clock", !0), this.owner.addChild((new q).add(this.movie)), w.topCenter(this.movie, -s.offsetX(), 0), Z.to(this.movie, 0.5, {
                y: 200
            }, 0, null, X.backOut), this.movie.get_looped().connect(function() {
                a.movie.set_paused(!0)
            }));
            this.playSound = !0
        },
        onUpdate: function(a) {
            $.prototype.onUpdate.call(this, a);
            this.playSound && 0 > --this.soundInterval && (this.soundInterval = 20, this.ctx.sound.play("clock"), null)
        },
        hide: function() {
            this.playSound = !1;
            null != this.movie && (this.movie.owner.dispose(), this.movie = null)
        },
        __class__: Je
    });
    var Ke = function() {
        this.notification = Ba.get_instance()
    };
    g["chicken.view.GameView"] = Ke;
    Ke.__name__ = ["chicken", "view", "GameView"];
    Ke.__super__ = D;
    Ke.prototype = m(D.prototype, {
        get_name: function() {
            return "GameView_5"
        },
        setLevel: function(a) {
            this.__level = a;
            F.get_instance().gameManager.level = this.__level;
            this.koefficient = F.get_instance().gameManager.getKoefficient()
        },
        onAdded: function() {
            F.get_instance();
            this.space = new cb;
            this.world =
                (new q).add(this.space);
            this.owner.addChild(this.world);
            this.bg = new Me;
            this.world.add(this.bg);
            this.bg.update(this.__level);
            this.gameLayer = new q;
            this.gameLayer.add((new v).centerAnchor());
            this.world.addChild(this.gameLayer);
            this.gameLayer._compMap.Sprite_15.x.set__(s.offsetX());
            this.ui = new Ne(this.space);
            this.owner.addChild((new q).add(this.ui));
            this.addListeners()
        },
        addListeners: function() {
            this.__disposer = this.owner._compMap.Disposer_7;
            null == this.__disposer && this.owner.add(this.__disposer = new Oe);
            this.__disposer.connect0(this.notification.nextLevel, E(this, this.onNextLevel));
            this.__disposer.connect1(this.notification.startLevel, E(this, this.onStartLevel));
            this.__disposer.connect0(this.notification.winLevel, E(this, this.onLevelWin));
            this.__disposer.connect0(this.notification.levelLose, E(this, this.onLevelLose));
            this.__disposer.connect0(this.notification.restartLevel, E(this, this.onGameRestart));
            this.__disposer.connect1(z._platform.getPointer().down, E(this, this.onDown));
            this.__disposer.connect1(z._platform.getPointer().move,
                E(this, this.onMove))
        },
        onNextLevel: function() {
            this.space.clearLevel();
            if (48 < this.__level + 1) F.get_instance().showDemo();
            else this.onStartLevel(this.__level + 1)
        },
        onStartLevel: function(a) {
            this.bg.update(a);
            this.gameLayer._compMap.Sprite_15.scissor = new Lb(-s.offsetX(), 0, s.CANVAS_WIDTH, 0);
            this.setLevel(a);
            this.showLevelStart()
        },
        onLevelWin: function() {
            this.ui.out();
            this.world.addChild((new q).add(new Pe(Math.ceil(this.space.scoreTimer / 10), this.__level)))
        },
        onLevelLose: function() {
            this.space.pause = !0;
            this.world.addChild((new q).add(new Qe))
        },
        onGameRestart: function() {
            var a = this;
            this.space.pause = !0;
            this.ui.updateScore(999);
            this.bg.hide();
            var b = this.gameLayer._compMap.Sprite_15;
            Z.to(b, 0.5, {
                x: -s.CANVAS_WIDTH
            }, 0, function() {
                b.x.set__(s.offsetX());
                a.space.restartLevel();
                a.gameLayer._compMap.Sprite_15.scissor = new Lb(-s.offsetX(), 0, s.CANVAS_WIDTH, 0);
                a.prepareLevel = !0
            });
            this.clearTutorial()
        },
        onMove: function() {},
        onDown: function(a) {
            this.__startedPoint = new Re(a.viewX - s.offsetX(), a.viewY);
            this.space.handleTouch(this.__startedPoint)
        },
        showLevelStart: function() {
            var a =
                this;
            if (s.SHOW_ANIMATION) {
                var b = F.get_instance(),
                    c = (new ec(0, s.CANVAS_WIDTH, 100)).setAlpha(0.6).setScaleXY(1, 0).centerAnchor();
                this.world.addChild((new q).add(c));
                w.centerSprite(c);
                Z.to(c, 0.3, {
                    scaleY: 1
                }, 0.2, function() {
                    var d = (new R(b.yellowFont, b.messages.get("level") + " " + a.__level)).centerAnchor();
                    a.world.addChild((new q).add(d));
                    w.centerSprite(d);
                    Z.to(d, 0.5, {
                        x: d.x._value
                    }, 0, null, X.backOut);
                    var e = d.x;
                    e.set__(e._value - s.CANVAS_WIDTH);
                    Z.to(d, 0.5, {
                        x: 2 * s.CANVAS_WIDTH
                    }, 1, function() {
                        Z.to(c, 0.1, {
                                scaleY: 0
                            },
                            0, function() {
                                a.space.createLevel(a.__level, a.gameLayer);
                                a.prepareLevel = !0;
                                d.dispose();
                                c.dispose();
                                a.ui.showIn()
                            })
                    }, X.backIn)
                })
            } else this.space.createLevel(this.__level, this.gameLayer), this.prepareLevel = !0
        },
        clearTutorial: function() {
            if (1 == this.__level) {
                var a = this.world._compMap.AbstractComponent_3;
                null != a && a.remove()
            } else 4 == this.__level && (a = this.world._compMap.AbstractComponent_3, null != a && a.remove())
        },
        onUpdate: function(a) {
            D.prototype.onUpdate.call(this, a);
            if (this.prepareLevel) {
                var a = this.gameLayer._compMap.Sprite_15,
                    b = a.scissor;
                b.height += 20;
                a.scissor = b;
                b.height >= s.CANVAS_HEIGHT && (this.prepareLevel = !1, a.scissor = null, 1 == this.__level ? this.world.add(new Se) : 4 == this.__level && this.world.add(new Te))
            } else !this.space.pause && 0 <= this.space.scoreTimer && (this.space.scoreTimer -= this.koefficient, 0 == this.space.scoreTimer % 10 && this.ui.updateScore(this.space.scoreTimer / 10 | 0)), this.space.checkWin && this.clearTutorial()
        },
        __class__: Ke
    });
    var Le = function(a, b, c) {
        this.__col = a;
        this.__row = b;
        this.__level = 4 * this.__col + this.__row + 1 + 16 * c;
        this.__page =
            c
    };
    g["chicken.view.LevelButton"] = Le;
    Le.__name__ = ["chicken", "view", "LevelButton"];
    Le.__super__ = D;
    Le.prototype = m(D.prototype, {
        get_name: function() {
            return "LevelButton_1"
        },
        onAdded: function() {
            var a = ra.getLevelStars(this.__level); - 1 == a && 1 == this.__level && (a = 0);
            var b = new ba(F.get_instance().spritesheets.get(-1 < a ? "level_button0000" : "level_button_disable0000"));
            b.alpha.set__(0);
            var c = (new q).add(b);
            this.owner.addChild(c);
            b.setXY(120 * this.__row + 90 + s.CANVAS_WIDTH * this.__page, 130 * this.__col + 160);
            if (-1 < a) {
                this.__levelLabel =
                    new R(F.get_instance().yellowFont);
                this.__levelLabel.set_text(B.string(this.__level));
                this.__levelLabel.centerAnchor();
                c.addChild((new q).add(this.__levelLabel));
                w.centerInTheParent(this.__levelLabel, -4);
                b.get_pointerDown().connect(E(this, this.selectLevel));
                for (var d = 0; d < a;) {
                    var e = d++,
                        h = new ba(F.get_instance().spritesheets.get("small_star0000"));
                    c.addChild((new q).add(h));
                    1 == e ? h.setXY(25 * e - 5, 80) : h.setXY(25 * e - 5, 70)
                }
            }
            a = new cd;
            a.run(new Fd([new dd(0.05 * this.__level + 0.3), new Ue(b.alpha, 1, 0.25)]));
            this.owner.add(a)
        },
        selectLevel: function() {
            F.get_instance().sound.play("click");
            F.get_instance().enterPlayingScene(this.__level)
        },
        __class__: Le
    });
    var Pe = function(a, b) {
        this.__score = a;
        this.__stars = 0 >= a ? 0 : 330 > a ? 1 : 660 > a ? 2 : 3;
        ra.saveLevel(this.__stars, this.__score, b);
        if (2 == b || 0 == (b + 2) % 3) z._platform.getExternal().call("adsRequest", [(Ve = F.get_instance(), E(Ve, Ve.pauseGame)), (Ve = F.get_instance(), E(Ve, Ve.resumeGame))])
    };
    g["chicken.view.LevelCompleteView"] = Pe;
    Pe.__name__ = ["chicken", "view", "LevelCompleteView"];
    Pe.__super__ = D;
    Pe.prototype =
        m(D.prototype, {
            get_name: function() {
                return "LevelCompleteView_8"
            },
            onAdded: function() {
                var a = new q;
                this.owner.addChild(a);
                Ia.fillBG(a);
                var b = new sd;
                b.layer = a;
                a = F.get_instance();
                a.sound.play("level_win");
                var c = new R(a.yellowFont, a.messages.get("level_complete"));
                this.owner.addChild((new q).add(c));
                c.centerAnchor();
                w.centerSprite(c, 0, -50);
                c = new R(a.yellowFont, a.messages.get("score"));
                c.centerAnchor();
                this.owner.addChild((new q).add(c));
                w.centerSprite(c, 0, 50);
                c = new R(a.yellowFont, B.string(this.__score));
                c.centerAnchor();
                this.owner.addChild((new q).add(c));
                w.centerSprite(c, 0, 80);
                for (var c = [0, 1, 3, 2], d, e = 1; 4 > e;) {
                    d = e++;
                    d = c[d];
                    var h = new ba(a.spritesheets.get("star" + d + "_grey0000"));
                    this.owner.addChild((new q).add(h));
                    h.centerAnchor();
                    w.centerSprite(h, 140 * d - 280, -250);
                    h.alpha.animate(0, 1, 0.5)
                }
                e = 1;
                for (h = this.__stars + 1; e < h;) {
                    var n = [e++];
                    d = c[n[0]];
                    var f = [new ba(a.spritesheets.get("star" + d + "0000"))];
                    this.owner.addChild((new q).add(f[0]));
                    f[0].centerAnchor();
                    w.centerSprite(f[0], 140 * d - 280, -250);
                    Z.to(f[0], 0.3, {
                        y: f[0].y._value
                    }, 0.8 + 0.2 * n[0], function(a, c) {
                        return function() {
                            for (var d = 0; 3 > d;) d++, Z.to(a[0], 0.25 * c[0], {
                                alpha: 1
                            }, 0, function(a) {
                                return function() {
                                    b.showFirework(a[0].x._value + B.random(200) - 100, a[0].y._value + B.random(200) - 100)
                                }
                            }(a))
                        }
                    }(f, n), X.backOut);
                    var j = f[0].y;
                    j.set__(j._value - 1E3);
                    a.sound.play("star" + d, 0.8 + 0.2 * n[0], f[0].owner)
                }
                a = new Ea("play_red0000", 1.5);
                this.owner.addChild((new q).add(a));
                w.bottomCenterSprite(a.get_body(), 0, -150);
                a.get_body().get_pointerDown().connect(E(this, this.onClickStart));
                a = new Ea("select_level0000", 1.5);
                this.owner.addChild((new q).add(a));
                w.bottomCenterSprite(a.get_body(), 100, -150);
                a.get_body().get_pointerDown().connect(E(this, this.onClickSelectLevel));
                // a = ob.addMoreGames(this.owner);
                // w.bottomCenterSprite(a, -100, -150);
                // a.scaleX.set__(a.scaleY.set__(0));
                // Z.to(a, 0.5, {
                //     scaleX: 1,
                //     scaleY: 1
                // }, 1.5, null, X.backOut);
                // ob.addLogo(this.owner)
            },
            onClickSelectLevel: function() {
                F.get_instance().sound.play("click");
                F.get_instance().enterLevelSelectScene()
            },
            onClickStart: function() {
                F.get_instance().sound.play("click");
                Ba.get_instance().nextLevel.emit();
                this.owner.dispose()
            },
            __class__: Pe
        });
    var Qe = function() {};
    g["chicken.view.LevelLoseView"] = Qe;
    Qe.__name__ = ["chicken", "view", "LevelLoseView"];
    Qe.__super__ = D;
    Qe.prototype = m(D.prototype, {
        get_name: function() {
            return "LevelLoseView_18"
        },
        onAdded: function() {
            Ia.fillBG(this.owner);
            var a = F.get_instance();
            this.popup = new ba(a.spritesheets.get("textpopup0000"));
            this.popup.centerAnchor();
            w.centerSprite(this.popup);
            var b = new q;
            this.owner.addChild(b);
            var c = new R(a.yellowFont, a.messages.get("lose1"));
            c.setAlign(ka.Center);
            b.addChild((new q).add(c));
            w.centerSprite(c, 0, 0);
            c.setScale(0);
            Z.to(c, 0.5, {
                scaleX: 1,
                scaleY: 1
            }, 2, null, X.backOut);
            c = new Ea("restart_button0000", 2);
            b.addChild((new q).add(c));
            w.centerSprite(c.get_body(), 0, 0.25 * s.CANVAS_HEIGHT);
            c.get_body().get_pointerDown().connect(E(this, this.onClickStart));
            c = new Ea("select_level0000", 2);
            b.addChild((new q).add(c));
            w.centerSprite(c.get_body(), 100, 0.25 * s.CANVAS_HEIGHT);
            c.get_body().get_pointerDown().connect(E(this, this.onClickSelectLevel));
            // c = ob.addMoreGames(b);
            // w.centerSprite(c, -100, 0.25 * s.CANVAS_HEIGHT);
            // c.scaleX.set__(c.scaleY.set__(0));
            // Z.to(c, 0.5, {
            //     scaleX: 1,
            //     scaleY: 1
            // }, 2, null, X.backOut);
            a = (new q).add((new Id(new Rc(a.pack, "chicken"))).loop("down")).add(new v);
            b.addChild(a);
            b = a._compMap.Sprite_15;
            w.bottomCenterSprite(b, 0, 0);
            Z.to(b, 2, {
                y: s.CANVAS_WIDTH / 2
            });
            // ob.addLogo(this.owner)
        },
        onClickSelectLevel: function() {
            F.get_instance().sound.play("click");
            F.get_instance().enterLevelSelectScene()
        },
        onClickStart: function() {
            F.get_instance().sound.play("click");
            Ba.get_instance().restartLevel.emit();
            this.owner.dispose()
        },
        __class__: Qe
    });
    var Ea = function(a, b) {
        null == b && (b = 0);
        $.call(this);
        this.__texture = a;
        this.__delay = b
    };
    g["framework.view.AnimatedButton"] = Ea;
    Ea.__name__ = ["framework", "view", "AnimatedButton"];
    Ea.__super__ = $;
    Ea.prototype = m($.prototype, {
        onAdded: function() {
            $.prototype.onAdded.call(this);
            this.__body = aa.__cast(Ia.sprite(this.__texture, this.owner), ba);
            this.show()
        },
        get_body: function() {
            return this.__body
        },
        show: function() {
            this.__body.set_visible(!0);
            this.__body.setScale(0);
            Z.to(this.__body,
                0.5, {
                    scaleX: 1,
                    scaleY: 1
                }, this.__delay, null, X.backOut)
        },
        __class__: Ea,
        __properties__: m($.prototype.__properties__, {
            get_body: "get_body"
        })
    });
    var hd = function(a, b, c) {
        null == c && (c = 0);
        Ea.call(this, a, c);
        this.__texture2 = b;
        this.currentState = 1
    };
    g["framework.view.StateButton"] = hd;
    hd.__name__ = ["framework", "view", "StateButton"];
    hd.__super__ = Ea;
    hd.prototype = m(Ea.prototype, {
        changeState: function() {
            1 == this.currentState ? this.currentState = 2 : 2 == this.currentState && (this.currentState = 1);
            this.setState()
        },
        setState: function() {
            1 ==
                this.currentState ? this.__body.texture = this.spritesheet.get(this.__texture) : 2 == this.currentState && (this.__body.texture = this.spritesheet.get(this.__texture2))
        },
        __class__: hd
    });
    var td = function(a) {
        null == a && (a = 0);
        hd.call(this, "sound_button0000", "sound_disabled0000", a);
        this.currentState = ra.soundEnabled() ? 1 : 2
    };
    g["chicken.view.SoundButton"] = td;
    td.__name__ = ["chicken", "view", "SoundButton"];
    td.__super__ = hd;
    td.prototype = m(hd.prototype, {
        onAdded: function() {
            hd.prototype.onAdded.call(this);
            this.setState();
            this.__body.get_pointerDown().connect(E(this,
                this.changeSound))
        },
        changeSound: function() {
            this.ctx.sound.changeVolume();
            this.changeState()
        },
        __class__: td
    });
    var Se = function() {
        $.call(this)
    };
    g["chicken.view.Tutorial1View"] = Se;
    Se.__name__ = ["chicken", "view", "Tutorial1View"];
    Se.__super__ = $;
    Se.prototype = m($.prototype, {
        onAdded: function() {
            $.prototype.onAdded.call(this);
            var a = s.offsetX();
            this.container = (new q).add(new v);
            this.owner.addChild(this.container);
            Ia.sprite("tutorial_arrow10000", this.container).setXY(330 + a, 600);
            Ia.sprite("tutorial_arrow20000", this.container).setXY(220 +
                a, 440);
            var b = (new R(this.ctx.yellowFont, this.ctx.messages.get("tutorial1"))).setAlign(ka.Center);
            this.container.addChild((new q).add(b));
            b.setXY(140 + a, 300);
            b = (new R(this.ctx.yellowFont, this.ctx.messages.get("tutorial2"))).setAlign(ka.Center);
            this.container.addChild((new q).add(b));
            b.setXY(480 + a, 430)
        },
        remove: function() {
            this.container.disposeChildren();
            this.dispose()
        },
        __class__: Se
    });
    var Te = function() {
        $.call(this)
    };
    g["chicken.view.Tutorial2View"] = Te;
    Te.__name__ = ["chicken", "view", "Tutorial2View"];
    Te.__super__ =
        $;
    Te.prototype = m($.prototype, {
        onAdded: function() {
            $.prototype.onAdded.call(this);
            var a = s.offsetX();
            this.container = (new q).add(new v);
            this.owner.addChild(this.container);
            Ia.sprite("tutorial_arrow20000", this.container).setXY(200 + a, 520);
            var b = (new R(this.ctx.yellowFont, this.ctx.messages.get("tutorial3"))).setAlign(ka.Center);
            this.container.addChild((new q).add(b));
            b.setXY(140 + a, 300)
        },
        remove: function() {
            this.container.disposeChildren();
            this.dispose()
        },
        __class__: Te
    });
    var Ne = function(a) {
        this.__space = a
    };
    g["chicken.view.UIView"] =
        Ne;
    Ne.__name__ = ["chicken", "view", "UIView"];
    Ne.__super__ = D;
    Ne.prototype = m(D.prototype, {
        get_name: function() {
            return "UIView_6"
        },
        onAdded: function() {
            var a = this,
                b = F.get_instance();
            this.uiContainer = new v;
            var c = (new q).add(this.uiContainer);
            this.owner.addChild(c);
            this.scoreText = new R(b.yellowFont, "999");
            c.addChild((new q).add(this.scoreText));
            this.scoreText.setAlign(ka.Left);
            w.topLeft(this.scoreText, 50, 75);
            var d = Ia.sprite("grey_stars0000", c);
            w.topLeft(d);
            this.starContainer = Ia.sprite("stars_bar0000", c);
            this.starContainer.setXY(d.x._value -
                2, d.y._value - 2);
            this.bg = Ia.fillBG(c);
            this.bg.set_visible(!1);
            s.SHOW_ANIMATION && (d = this.uiContainer.y, d.set__(d._value - 300));
            this.pause = new hd("pause_button0000", "play_red0000");
            c.addChild((new q).add(this.pause));
            w.topRight(this.pause.get_body(), -20, 20);
            this.pause.get_body().get_pointerDown().connect(E(this, this.onClickPause));
            this.restart = new Ea("restart_button0000", 0.2);
            c.addChild((new q).add(this.restart));
            w.topRight(this.restart.get_body(), -100, 20);
            this.restart.get_body().get_pointerDown().connect(function(b) {
                if (0 !=
                    (a.bg._flags & 1)) a.onClickPause(b);
                Ba.get_instance().restartLevel.emit()
            });
            this.exit = new Ea("home_button0000", 0.2);
            c.addChild((new q).add(this.exit));
            w.topRight(this.exit.get_body(), -180, 20);
            this.exit.get_body().get_pointerDown().connect(function() {
                b.enterHomeScene()
            });
            // this.logo = ob.addLogo(c);
            // this.logo.set_visible(!1);
            // this.moregames = ob.addMoreGames(c);
            // w.topRight(this.moregames, -340, 20);
            this.sound = new td(0.2);
            c.addChild((new q).add(this.sound));
            w.topRight(this.sound.get_body(), -260, 20);
            s.SHOW_ANIMATION &&
                (this.restart.get_body().set_visible(!1), this.pause.get_body().set_visible(!1), this.sound.get_body().set_visible(!1), this.exit.get_body().set_visible(!1)
                    // , this.moregames.set_visible(!1)
                    )
        },
        onClickPause: function() {
            this.__space.pause = !this.__space.pause;
            this.pause.changeState();
            0 == (this.bg._flags & 1) 
            ? (this.bg.set_visible(!0), 
                // this.logo.set_visible(!0), 
                this.bg.alpha.animate(0, 0.5, 0.2), this.exit.show(), this.sound.show()
                // , this.moregames.set_visible(!0), this.moregames.scaleX.set__(this.moregames.scaleY.set__(0))
                // ,
                // Z.to(this.moregames, 0.5, {
                //     scaleX: 1,
                //     scaleY: 1
                // }, 0.2, null, X.backOut)
                ) 
            : (this.bg.set_visible(!1), this.sound.get_body().set_visible(!1), this.exit.get_body().set_visible(!1)
                // , this.logo.set_visible(!1)
                // , this.moregames.set_visible(!1)
                )
        },
        updateScore: function(a) {
            this.scoreText.set_text(null == a ? "null" : "" + a);
            this.starContainer.scissor = new Lb(0, 0, this.starContainer.getNaturalWidth() * (a / 1E3), 100)
        },
        out: function() {
            s.SHOW_ANIMATION && Z.to(this.uiContainer, 0.5, {
                y: -300
            }, 0, null, X.backIn)
        },
        showIn: function() {
            Z.to(this.uiContainer,
                0.5, {
                    y: 0
                }, 0.5, null, X.backOut);
            this.pause.show();
            this.restart.show()
        },
        __class__: Ne
    });
    var $f = function() {};
    g["chicken.view.bodies.BodyInterface"] = $f;
    $f.__name__ = ["chicken", "view", "bodies", "BodyInterface"];
    $f.prototype = {
        __class__: $f
    };
    var C = function(a) {
        this.needRotate = !1;
        this.__item = a;
        this.material = Mb.sand();
        "glass" == this.__item.material && (this.material = Mb.ice());
        this.createPhys()
    };
    g["chicken.view.bodies.BodyComponent"] = C;
    C.__name__ = ["chicken", "view", "bodies", "BodyComponent"];
    C.__interfaces__ = [$f];
    C.__super__ =
        D;
    C.prototype = m(D.prototype, {
        get_name: function() {
            return "BodyComponent_12"
        },
        createPhys: function() {},
        onUpdate: function() {
            var a = this._body.get_position(),
                b;
            a.zpp_inner.validate();
            if (!(b = -100 > a.zpp_inner.x))
                if (a.zpp_inner.validate(), !(b = a.zpp_inner.x > s.CANVAS_WIDTH + 100)) a.zpp_inner.validate(), b = a.zpp_inner.y > s.CANVAS_HEIGHT + 100 || null == this._body.get_space();
            b ? this.owner.dispose() : (this.sprite.x.set__(function() {
                a.zpp_inner.validate();
                return a.zpp_inner.x
            }(this)), this.sprite.y.set__(function() {
                a.zpp_inner.validate();
                return a.zpp_inner.y
            }(this)), this.sprite.rotation.set__(180 * this._body.zpp_inner.rot / 3.141592653589793))
        },
        onRemoved: function() {
            this._body.set_space(null)
        },
        initBody: function() {
            this._body.set_position(new K(this.__item.x, this.__item.y));
            this._body.set_rotation(3.141592653589793 * this.__item.rotation / 180);
            this._body.get_userData().data = this;
            "glass" == this.__item.material && this._body.get_cbTypes().add(cb.glassCollision)
        },
        onAdded: function() {
            D.prototype.onAdded.call(this);
            this.sprite.setScaleXY(this.__item.width /
                this.sprite.getNaturalWidth(), this.__item.height / this.sprite.getNaturalHeight());
            this.sprite.setXY(-1E3, 0);
            this.owner.add(this.sprite)
        },
        setSpace: function(a) {
            this._body.set_space(a)
        },
        item: function() {
            return this.__item
        },
        body: function() {
            return this._body
        },
        addAnim: function(a) {
            this.anim = a;
            null != this.anim && this.anim._compMap.Sprite_15.setScaleXY(this.sprite.scaleX._value, this.sprite.scaleY._value)
        },
        __class__: C
    });
    var Ce = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Ball"] = Ce;
    Ce.__name__ = ["chicken",
        "view", "bodies", "Ball"
    ];
    Ce.__super__ = C;
    Ce.prototype = m(C.prototype, {
        createPhys: function() {
            this._body = new ca;
            this._body.zpp_inner.wrap_shapes.add(new fc(this.__item.width / 2, null, this.material));
            this.initBody()
        },
        onAdded: function() {
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: Ce
    });
    var Sc = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Box"] = Sc;
    Sc.__name__ = ["chicken", "view", "bodies",
        "Box"
    ];
    Sc.__super__ = C;
    Sc.prototype = m(C.prototype, {
        createPhys: function() {
            var a;
            "ground" == this.__item.material ? (null == f.BodyType_STATIC && (f.internal = !0, f.BodyType_STATIC = new Ka, f.internal = !1), a = f.BodyType_STATIC) : (null == f.BodyType_DYNAMIC && (f.internal = !0, f.BodyType_DYNAMIC = new Ka, f.internal = !1), a = f.BodyType_DYNAMIC);
            this._body = new ca(a);
            this._body.zpp_inner.wrap_shapes.add(new T(T.box(this.__item.width, this.__item.height), this.material));
            this.initBody();
            "ground" == this.__item.material && "box" == this.__item.type &&
                this._body.get_cbTypes().add(cb.groundCollision)
        },
        onAdded: function() {
            var a = "";
            if ("ground" == this.__item.material && ("box" == this.__item.type || "line" == this.__item.type)) a = F.get_instance().gameManager.getGroundTexture();
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + a + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: Sc
    });
    var Ae = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Brick"] = Ae;
    Ae.__name__ = ["chicken", "view", "bodies", "Brick"];
    Ae.__super__ = C;
    Ae.prototype = m(C.prototype, {
        createPhys: function() {
            this._body = new ca;
            var a = 0.5 * this.__item.width;
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(-a, -(0.5 * this.__item.height), a, 0.7 * this.__item.height), this.material));
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(0, 0.2 * -this.__item.height, a, 0.7 * this.__item.height), this.material));
            this.initBody()
        },
        onAdded: function() {
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: Ae
    });
    var ze = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Chicken"] = ze;
    ze.__name__ = ["chicken", "view", "bodies", "Chicken"];
    ze.__super__ = C;
    ze.prototype = m(C.prototype, {
        createPhys: function() {
            this._body = new ca;
            var a = [],
                b = 0.4 * this.__item.height,
                c = 0.4 * this.__item.width;
            a[0] = new K(0, -b);
            a[1] = new K(c, 0.22 * -b);
            a[2] = new K(0.61 * c, b);
            a[3] = new K(0.61 * -c, b);
            a[4] = new K(-c, 0.22 * -b);
            this._body.zpp_inner.wrap_shapes.add(new T(a, Mb.ice()));
            this.initBody();
            this._body.get_cbTypes().add(cb.chickenCollision)
        },
        onAdded: function() {
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "0000"))).centerAnchor();
            this.sprite.alpha.set__(0);
            C.prototype.onAdded.call(this);
            this.sprite.centerAnchor();
            this.nextAnimation = B.random(100) + 100
        },
        onUpdate: function(a) {
            C.prototype.onUpdate.call(this, a);
            if (null != this.anim && null != this._body) {
                var b = this.anim._compMap.Sprite_15;
                b.setXY(this.sprite.x._value, this.sprite.y._value);
                b.setRotation(this.sprite.rotation._value);
                var a = this._body.get_position(),
                    c;
                a.zpp_inner.validate();
                if (!(c = 0 > a.zpp_inner.x + s.offsetX()))
                    if (a.zpp_inner.validate(), !(c = a.zpp_inner.x + s.offsetX() > s.CANVAS_WIDTH)) a.zpp_inner.validate(), c = a.zpp_inner.y > s.CANVAS_HEIGHT || null == this._body.get_space();
                c && (a = this.anim._compMap.MoviePlayer_10, a.play("feathers", !1), F.get_instance().sound.play("loselevel"), a.get_looped().connect(function() {
                    b.set_visible(!1);
                    Ba.get_instance().levelLose.emit()
                }), this.owner.dispose());
                0 == this.nextAnimation-- && (a = this.anim._compMap.MoviePlayer_10, 5 > B.random(10) ? a.play("blink", !0) :
                    a.play("loud", !0), a = "chicken" + (B.random(4) + 1), F.get_instance().sound.play(a), this.nextAnimation = B.random(400) + 200)
            }
        },
        __class__: ze
    });
    var De = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Corner"] = De;
    De.__name__ = ["chicken", "view", "bodies", "Corner"];
    De.__super__ = C;
    De.prototype = m(C.prototype, {
        createPhys: function() {
            this._body = new ca;
            var a = this.__item.width,
                b = this.__item.height;
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(0.5 * -a, 0.5 * -b, a, 0.35 * b), this.material));
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(0.3 *
                a, 0.5 * -b, 0.2 * a, b), this.material));
            this.initBody()
        },
        onAdded: function() {
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: De
    });
    var Be = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Cross"] = Be;
    Be.__name__ = ["chicken", "view", "bodies", "Cross"];
    Be.__super__ = C;
    Be.prototype = m(C.prototype, {
        createPhys: function() {
            this._body = new ca;
            var a = this.__item.width,
                b = this.__item.height;
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(-0.1 *
                a, 0.5 * -b, 0.2 * a, b), this.material));
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(0.5 * -a, 0.1 * -b, a, 0.2 * b), this.material));
            this.initBody()
        },
        onAdded: function() {
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: Be
    });
    var Fe = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Trapeze"] = Fe;
    Fe.__name__ = ["chicken", "view", "bodies", "Trapeze"];
    Fe.__super__ = C;
    Fe.prototype = m(C.prototype, {
        createPhys: function() {
            this._body =
                new ca;
            var a = [],
                b = this.__item.width,
                c = this.__item.height;
            a[0] = new K(0.5 * -b, 0.5 * -c);
            a[1] = new K(0.5 * b, 0.5 * -c);
            a[2] = new K(0.25 * b, 0.5 * c);
            a[3] = new K(0.25 * -b, 0.5 * c);
            this._body.zpp_inner.wrap_shapes.add(new T(a, this.material));
            this.initBody()
        },
        onAdded: function() {
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: Fe
    });
    var Ge = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Triangle"] = Ge;
    Ge.__name__ = ["chicken", "view", "bodies", "Triangle"];
    Ge.__super__ = C;
    Ge.prototype = m(C.prototype, {
        createPhys: function() {
            this._body = new ca;
            var a = [],
                b = this.__item.width,
                c = this.__item.height;
            "wood" == this.__item.material ? (a[0] = new K(0, 0.5 * -c), a[1] = new K(0.5 * b, 0.25 * c), a[2] = new K(0.5 * b, 0.5 * c), a[3] = new K(0.5 * -b, 0.5 * c), a[4] = new K(0.5 * -b, 0.25 * c)) : (a[0] = new K(0, 0.5 * -c), a[1] = new K(0.5 * b, 0.5 * c), a[2] = new K(0.5 * -b, 0.5 * c));
            this._body.zpp_inner.wrap_shapes.add(new T(a, this.material));
            this.initBody()
        },
        onAdded: function() {
            this.sprite =
                (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: Ge
    });
    var Ee = function(a) {
        C.call(this, a)
    };
    g["chicken.view.bodies.Tshape"] = Ee;
    Ee.__name__ = ["chicken", "view", "bodies", "Tshape"];
    Ee.__super__ = C;
    Ee.prototype = m(C.prototype, {
        createPhys: function() {
            this._body = new ca;
            var a = this.__item.width,
                b = this.__item.height;
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(0.5 * -a, 0.5 * -b, a, 0.35 * b), this.material));
            this._body.zpp_inner.wrap_shapes.add(new T(T.rect(0.1 *
                -a, 0.5 * -b, 0.2 * a, b), this.material));
            this.initBody()
        },
        onAdded: function() {
            this.sprite = (new ba(F.get_instance().spritesheets.get(this.__item.type + "_" + this.__item.material + "0000"))).centerAnchor();
            C.prototype.onAdded.call(this)
        },
        __class__: Ee
    });
    var Oe = function() {
        this._disposables = []
    };
    g["flambe.Disposer"] = Oe;
    Oe.__name__ = ["flambe", "Disposer"];
    Oe.__super__ = D;
    Oe.prototype = m(D.prototype, {
        get_name: function() {
            return "Disposer_7"
        },
        add: function(a) {
            this._disposables.push(a);
            return this
        },
        connect0: function(a, b) {
            this.add(a.connect(b));
            return this
        },
        connect1: function(a, b) {
            this.add(a.connect(b));
            return this
        },
        onRemoved: function() {
            this.freeDisposables()
        },
        dispose: function() {
            D.prototype.dispose.call(this);
            this.freeDisposables()
        },
        freeDisposables: function() {
            var a = this._disposables;
            this._disposables = [];
            for (var b = 0; b < a.length;) {
                var c = a[b];
                ++b;
                c.dispose()
            }
        },
        __class__: Oe
    });
    var q = function() {
        this.parent = this.firstChild = this.next = this.firstComponent = null;
        this._compMap = {}
    };
    g["flambe.Entity"] = q;
    q.__name__ = ["flambe", "Entity"];
    q.__interfaces__ = [Bb];
    q.prototype = {
        add: function(a) {
            null != a.owner && a.owner.remove(a);
            var b = a.get_name(),
                c = this._compMap[b];
            null != c && this.remove(c);
            this._compMap[b] = a;
            b = null;
            for (c = this.firstComponent; null != c;) b = c, c = c.next;
            null != b ? b.next = a : this.firstComponent = a;
            a.init(this, null);
            a.onAdded();
            return this
        },
        remove: function(a) {
            for (var b = null, c = this.firstComponent; null != c;) {
                var d = c.next;
                if (c == a) return null == b ? this.firstComponent = d : b.init(this, d), delete this._compMap[c.get_name()], c.onRemoved(), c.init(null, null), !0;
                b = c;
                c = d
            }
            return !1
        },
        addChild: function(a, b) {
            null == b && (b = !0);
            null != a.parent && a.parent.removeChild(a);
            a.parent = this;
            if (b) {
                for (var c = null, d = this.firstChild; null != d;) c = d, d = d.next;
                null != c ? c.next = a : this.firstChild = a
            } else a.next = this.firstChild, this.firstChild = a;
            return this
        },
        removeChild: function(a) {
            for (var b = null, c = this.firstChild; null != c;) {
                var d = c.next;
                if (c == a) {
                    null == b ? this.firstChild = d : b.next = d;
                    c.parent = null;
                    c.next = null;
                    break
                }
                b = c;
                c = d
            }
        },
        disposeChildren: function() {
            for (; null != this.firstChild;) this.firstChild.dispose()
        },
        dispose: function() {
            for (null !=
                this.parent && this.parent.removeChild(this); null != this.firstComponent;) this.firstComponent.dispose();
            this.disposeChildren()
        },
        __class__: q
    };
    var hh = function() {};
    g["flambe.util.PackageLog"] = hh;
    hh.__name__ = ["flambe", "util", "PackageLog"];
    var ag = function() {};
    g["flambe.platform.Platform"] = ag;
    ag.__name__ = ["flambe", "platform", "Platform"];
    ag.prototype = {
        __class__: ag
    };
    var Nb = function() {};
    g["flambe.platform.html.HtmlPlatform"] = Nb;
    Nb.__name__ = ["flambe", "platform", "html", "HtmlPlatform"];
    Nb.__interfaces__ = [ag];
    Nb.prototype = {
        init: function() {
            var a = this;
            L.fixAndroidMath();
            var b = null;
            try {
                b = window.flambe.canvas
            } catch (c) {}
            b.setAttribute("tabindex", "0");
            b.style.outlineStyle = "none";
            b.style.webkitTapHighlightColor = "transparent";
            b.setAttribute("moz-opaque", "true");
            this._stage = new I(b);
            this._pointer = new La;
            this._mouse = new We(this._pointer, b);
            this._renderer = this.createRenderer(b);
            this.mainLoop = new gc;
            this.musicPlaying = !1;
            this._canvas = b;
            this._container = b.parentElement;
            this._container.style.msTouchAction = "none";
            var d = 0,
                e = function(c) {
                    if (!(1E3 >
                        c.timeStamp - d)) {
                        var e = b.getBoundingClientRect(),
                            h = a.getX(c, e),
                            e = a.getY(c, e);
                        switch (c.type) {
                            case "mousedown":
                                c.target == b && (c.preventDefault(), a._mouse.submitDown(h, e, c.button), b.focus());
                                break;
                            case "mousemove":
                                a._mouse.submitMove(h, e);
                                break;
                            case "mouseup":
                                a._mouse.submitUp(h, e, c.button);
                                break;
                            case "mousewheel":
                            case "DOMMouseScroll":
                                a._mouse.submitScroll(h, e, "mousewheel" == c.type ? c.wheelDelta / 40 : -c.detail) && c.preventDefault()
                        }
                    }
                };
            window.addEventListener("mousedown", e, !1);
            window.addEventListener("mousemove",
                e, !1);
            window.addEventListener("mouseup", e, !1);
            b.addEventListener("mousewheel", e, !1);
            b.addEventListener("DOMMouseScroll", e, !1);
            b.addEventListener("contextmenu", function(a) {
                a.preventDefault()
            }, !1);
            var h = "undefined" != typeof window.ontouchstart,
                e = "msMaxTouchPoints" in window.navigator && 1 < window.navigator.msMaxTouchPoints;
            if (h || e) {
                var n = new Xe(this._pointer, h ? 4 : window.navigator.msMaxTouchPoints);
                this._touch = n;
                e = function(b) {
                    var c;
                    c = h ? b.changedTouches : [b];
                    var e = b.target.getBoundingClientRect();
                    d = b.timeStamp;
                    switch (b.type) {
                        case "touchstart":
                        case "MSPointerDown":
                        case "pointerdown":
                            b.preventDefault();
                            L.SHOULD_HIDE_MOBILE_BROWSER && L.hideMobileBrowser();
                            for (b = 0; b < c.length;) {
                                var f = c[b];
                                ++b;
                                var i = a.getX(f, e),
                                    j = a.getY(f, e);
                                n.submitDown((h ? f.identifier : f.pointerId) | 0, i, j)
                            }
                            break;
                        case "touchmove":
                        case "MSPointerMove":
                        case "pointermove":
                            b.preventDefault();
                            for (b = 0; b < c.length;) f = c[b], ++b, i = a.getX(f, e), j = a.getY(f, e), n.submitMove((h ? f.identifier : f.pointerId) | 0, i, j);
                            break;
                        case "touchend":
                        case "touchcancel":
                        case "MSPointerUp":
                        case "pointerup":
                            for (b =
                                0; b < c.length;) f = c[b], ++b, i = a.getX(f, e), j = a.getY(f, e), n.submitUp((h ? f.identifier : f.pointerId) | 0, i, j)
                    }
                };
                h ? (b.addEventListener("touchstart", e, !1), b.addEventListener("touchmove", e, !1), b.addEventListener("touchend", e, !1), b.addEventListener("touchcancel", e, !1)) : (b.addEventListener("MSPointerDown", e, !1), b.addEventListener("MSPointerMove", e, !1), b.addEventListener("MSPointerUp", e, !1))
            } else this._touch = new Ye;
            var f = window.onerror;
            window.onerror = function(a, b, c) {
                z.uncaughtError.emit(a);
                return null != f ? f(a, b, c) :
                    !1
            };
            var j = L.loadExtension("hidden", window.document);
            null != j.value ? (e = function() {
                z.hidden.set__(Q.field(window.document, j.field))
            }, e(null), window.document.addEventListener(j.prefix + "visibilitychange", e, !1)) : (e = function(a) {
                z.hidden.set__("pagehide" == a.type)
            }, window.addEventListener("pageshow", e, !1), window.addEventListener("pagehide", e, !1));
            z.hidden.get_changed().connect(function(b) {
                b || (a._skipFrame = !0)
            });
            this._skipFrame = !1;
            this._lastUpdate = Date.now();
            var g = L.loadExtension("requestAnimationFrame").value;
            if (null != g) {
                var k = window.performance,
                    p = null != k && L.polyfill("now", k);
                p ? this._lastUpdate = k.now() : null;
                var l = null,
                    l = function(c) {
                        a.update(p ? k.now() : c);
                        g(l, b)
                    };
                g(l, b)
            } else window.setInterval(function() {
                a.update(Date.now())
            }, 16);
            Yd.info("Initialized HTML platform", ["renderer", this._renderer.get_type()])
        },
        loadAssetPack: function(a) {
            return (new V(this, a)).promise
        },
        getStage: function() {
            return this._stage
        },
        getStorage: function() {
            if (null == this._storage) {
                var a = ih.getLocalStorage();
                this._storage = null != a ? new Ze(a) :
                    new $e
            }
            return this._storage
        },
        getLocale: function() {
            var a = window.navigator.language;
            null == a && (a = window.navigator.userLanguage);
            return a
        },
        update: function(a) {
            var b = (a - this._lastUpdate) / 1E3;
            this._lastUpdate = a;
            z.hidden._value || (this._skipFrame ? this._skipFrame = !1 : (this.mainLoop.update(b), this.mainLoop.render(this._renderer)))
        },
        getPointer: function() {
            return this._pointer
        },
        getExternal: function() {
            null == this._external && (this._external = new af);
            return this._external
        },
        getRenderer: function() {
            return this._renderer
        },
        getX: function(a, b) {
            return (a.clientX - b.left) * this._stage.get_width() / b.width
        },
        getY: function(a, b) {
            return (a.clientY - b.top) * this._stage.get_height() / b.height
        },
        createRenderer: function(a) {
            try {
                var b = jh.getContextWebGL(a, {
                    alpha: !1,
                    depth: !1,
                    failIfMajorPerformanceCaveat: !0
                });
                if (null != b)
                    if (L.detectSlowDriver(b)) null;
                    else return new bf(this._stage, b)
            } catch (c) {}
            return new vc(a)
        },
        __class__: Nb
    };
    var Ta = function(a, b) {
        this._value = a;
        this._changed = null != b ? new ud(b) : null
    };
    g["flambe.util.Value"] = Ta;
    Ta.__name__ = ["flambe",
        "util", "Value"
    ];
    Ta.prototype = {
        watch: function(a) {
            a(this._value, this._value);
            return this.get_changed().connect(a)
        },
        set__: function(a) {
            var b = this._value;
            a != b && (this._value = a, null != this._changed && this._changed.emit(a, b));
            return a
        },
        get_changed: function() {
            null == this._changed && (this._changed = new ud);
            return this._changed
        },
        toString: function() {
            return this._value
        },
        __class__: Ta,
        __properties__: {
            get_changed: "get_changed",
            set__: "set__"
        }
    };
    var Uc = function(a, b) {
        this._next = null;
        this._signal = a;
        this._listener = b;
        this.stayInList = !0
    };
    g["flambe.util.SignalConnection"] = Uc;
    Uc.__name__ = ["flambe", "util", "SignalConnection"];
    Uc.__interfaces__ = [Bb];
    Uc.prototype = {
        once: function() {
            this.stayInList = !1;
            return this
        },
        dispose: function() {
            null != this._signal && (this._signal.disconnect(this), this._signal = null)
        },
        __class__: Uc
    };
    var za = function(a) {
        this._head = null != a ? new Uc(this, a) : null;
        this._deferredTasks = null
    };
    g["flambe.util.SignalBase"] = za;
    za.__name__ = ["flambe", "util", "SignalBase"];
    za.prototype = {
        connectImpl: function(a, b) {
            var c = this,
                d = new Uc(this,
                    a);
            this._head == za.DISPATCHING_SENTINEL ? this.defer(function() {
                c.listAdd(d, b)
            }) : this.listAdd(d, b);
            return d
        },
        disconnect: function(a) {
            var b = this;
            this._head == za.DISPATCHING_SENTINEL ? this.defer(function() {
                b.listRemove(a)
            }) : this.listRemove(a)
        },
        defer: function(a) {
            for (var b = null, c = this._deferredTasks; null != c;) b = c, c = c.next;
            a = new bg(a);
            null != b ? b.next = a : this._deferredTasks = a
        },
        willEmit: function() {
            var a = this._head;
            this._head = za.DISPATCHING_SENTINEL;
            return a
        },
        didEmit: function(a) {
            this._head = a;
            a = this._deferredTasks;
            for (this._deferredTasks = null; null != a;) a.fn(), a = a.next
        },
        listAdd: function(a, b) {
            if (b) a._next = this._head, this._head = a;
            else {
                for (var c = null, d = this._head; null != d;) c = d, d = d._next;
                null != c ? c._next = a : this._head = a
            }
        },
        listRemove: function(a) {
            for (var b = null, c = this._head; null != c;) {
                if (c == a) {
                    a = c._next;
                    null == b ? this._head = a : b._next = a;
                    break
                }
                b = c;
                c = c._next
            }
        },
        __class__: za
    };
    var ud = function(a) {
        za.call(this, a)
    };
    g["flambe.util.Signal2"] = ud;
    ud.__name__ = ["flambe", "util", "Signal2"];
    ud.__super__ = za;
    ud.prototype = m(za.prototype, {
        connect: function(a,
            b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function(a, b) {
            var c = this;
            this._head == za.DISPATCHING_SENTINEL ? this.defer(function() {
                c.emitImpl(a, b)
            }) : this.emitImpl(a, b)
        },
        emitImpl: function(a, b) {
            for (var c = this.willEmit(), d = c; null != d;) d._listener(a, b), d.stayInList || d.dispose(), d = d._next;
            this.didEmit(c)
        },
        __class__: ud
    });
    var Ca = function(a) {
        za.call(this, a)
    };
    g["flambe.util.Signal1"] = Ca;
    Ca.__name__ = ["flambe", "util", "Signal1"];
    Ca.__super__ = za;
    Ca.prototype = m(za.prototype, {
        connect: function(a, b) {
            null == b &&
                (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function(a) {
            var b = this;
            this._head == za.DISPATCHING_SENTINEL ? this.defer(function() {
                b.emitImpl(a)
            }) : this.emitImpl(a)
        },
        emitImpl: function(a) {
            for (var b = this.willEmit(), c = b; null != c;) c._listener(a), c.stayInList || c.dispose(), c = c._next;
            this.didEmit(b)
        },
        __class__: Ca
    });
    var ga = function(a, b) {
        this._behavior = null;
        Ta.call(this, a, b)
    };
    g["flambe.animation.AnimatedFloat"] = ga;
    ga.__name__ = ["flambe", "animation", "AnimatedFloat"];
    ga.__super__ = Ta;
    ga.prototype = m(Ta.prototype, {
        set__: function(a) {
            this._behavior =
                null;
            return Ta.prototype.set__.call(this, a)
        },
        update: function(a) {
            null != this._behavior && (Ta.prototype.set__.call(this, this._behavior.update(a)), this._behavior.isComplete() && (this._behavior = null))
        },
        animate: function(a, b, c, d) {
            this.set__(a);
            this.animateTo(b, c, d)
        },
        animateTo: function(a, b, c) {
            this.set_behavior(new wc(this._value, a, b, c))
        },
        set_behavior: function(a) {
            this._behavior = a;
            this.update(0);
            return a
        },
        __class__: ga,
        __properties__: m(Ta.prototype.__properties__, {
            set_behavior: "set_behavior"
        })
    });
    var z = function() {};
    g["flambe.System"] = z;
    z.__name__ = ["flambe", "System"];
    z.init = function() {
        z._calledInit || (z._platform.init(), z._calledInit = !0)
    };
    z.loadAssetPack = function(a) {
        return z._platform.loadAssetPack(a)
    };
    var Yd = function() {};
    g["flambe.Log"] = Yd;
    Yd.__name__ = ["flambe", "Log"];
    Yd.info = function() {
        null
    };
    Yd.__super__ = hh;
    Yd.prototype = m(hh.prototype, {
        __class__: Yd
    });
    var cg = function() {
        this._realDt = 0
    };
    g["flambe.SpeedAdjuster"] = cg;
    cg.__name__ = ["flambe", "SpeedAdjuster"];
    cg.__super__ = D;
    cg.prototype = m(D.prototype, {
        get_name: function() {
            return "SpeedAdjuster_17"
        },
        onUpdate: function(a) {
            0 < this._realDt && (a = this._realDt, this._realDt = 0);
            this.scale.update(a)
        },
        __class__: cg
    });
    var dg = function() {};
    g["flambe.animation.Behavior"] = dg;
    dg.__name__ = ["flambe", "animation", "Behavior"];
    dg.prototype = {
        __class__: dg
    };
    var X = function() {};
    g["flambe.animation.Ease"] = X;
    X.__name__ = ["flambe", "animation", "Ease"];
    X.linear = function(a) {
        return a
    };
    X.quadOut = function(a) {
        return a * (2 - a)
    };
    X.expoIn = function(a) {
        return Math.pow(2, 10 * (a - 1))
    };
    X.expoOut = function(a) {
        return -Math.pow(2, -10 * a) + 1
    };
    X.backIn =
        function(a) {
            return a * a * (2.70158 * a - 1.70158)
    };
    X.backOut = function(a) {
        return 1 - --a * a * (-2.70158 * a - 1.70158)
    };
    var wc = function(a, b, c, d) {
        this._from = a;
        this._to = b;
        this._duration = c;
        this.elapsed = 0;
        this._easing = null != d ? d : X.linear
    };
    g["flambe.animation.Tween"] = wc;
    wc.__name__ = ["flambe", "animation", "Tween"];
    wc.__interfaces__ = [dg];
    wc.prototype = {
        update: function(a) {
            this.elapsed += a;
            return this.elapsed >= this._duration ? this._to : this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration)
        },
        isComplete: function() {
            return this.elapsed >=
                this._duration
        },
        __class__: wc
    };
    var Vc = function() {};
    g["flambe.asset.Asset"] = Vc;
    Vc.__name__ = ["flambe", "asset", "Asset"];
    Vc.__interfaces__ = [Bb];
    Vc.prototype = {
        __class__: Vc
    };
    var u = g["flambe.asset.AssetFormat"] = {
        __ename__: ["flambe", "asset", "AssetFormat"],
        __constructs__: "WEBP,JXR,PNG,JPG,GIF,DDS,PVR,PKM,MP3,M4A,OPUS,OGG,WAV,Data".split(",")
    };
    u.WEBP = ["WEBP", 0];
    u.WEBP.toString = A;
    u.WEBP.__enum__ = u;
    u.JXR = ["JXR", 1];
    u.JXR.toString = A;
    u.JXR.__enum__ = u;
    u.PNG = ["PNG", 2];
    u.PNG.toString = A;
    u.PNG.__enum__ = u;
    u.JPG = ["JPG",
        3
    ];
    u.JPG.toString = A;
    u.JPG.__enum__ = u;
    u.GIF = ["GIF", 4];
    u.GIF.toString = A;
    u.GIF.__enum__ = u;
    u.DDS = ["DDS", 5];
    u.DDS.toString = A;
    u.DDS.__enum__ = u;
    u.PVR = ["PVR", 6];
    u.PVR.toString = A;
    u.PVR.__enum__ = u;
    u.PKM = ["PKM", 7];
    u.PKM.toString = A;
    u.PKM.__enum__ = u;
    u.MP3 = ["MP3", 8];
    u.MP3.toString = A;
    u.MP3.__enum__ = u;
    u.M4A = ["M4A", 9];
    u.M4A.toString = A;
    u.M4A.__enum__ = u;
    u.OPUS = ["OPUS", 10];
    u.OPUS.toString = A;
    u.OPUS.__enum__ = u;
    u.OGG = ["OGG", 11];
    u.OGG.toString = A;
    u.OGG.__enum__ = u;
    u.WAV = ["WAV", 12];
    u.WAV.toString = A;
    u.WAV.__enum__ = u;
    u.Data = ["Data", 13];
    u.Data.toString = A;
    u.Data.__enum__ = u;
    var eg = function(a, b, c, d) {
        this.name = a;
        this.url = b;
        this.format = c;
        this.bytes = d
    };
    g["flambe.asset.AssetEntry"] = eg;
    eg.__name__ = ["flambe", "asset", "AssetEntry"];
    eg.prototype = {
        __class__: eg
    };
    var cf = function() {};
    g["flambe.asset.AssetPack"] = cf;
    cf.__name__ = ["flambe", "asset", "AssetPack"];
    cf.__interfaces__ = [Bb];
    cf.prototype = {
        __class__: cf
    };
    var df = function() {};
    g["flambe.asset.File"] = df;
    df.__name__ = ["flambe", "asset", "File"];
    df.__interfaces__ = [Vc];
    df.prototype = {
        __class__: df
    };
    var xa = function() {
        this._localBase = this._remoteBase = null;
        this._entries = []
    };
    g["flambe.asset.Manifest"] = xa;
    xa.__name__ = ["flambe", "asset", "Manifest"];
    xa.fromAssets = function(a, b) {
        null == b && (b = !0);
        var c = Q.field(kh.getType(xa).assets[0], a);
        if (null == c) {
            if (b) throw pa.withFields("Missing asset pack", ["name", a]);
            return null
        }
        var d = new xa;
        d.set_localBase("assets");
        for (var e = 0; e < c.length;) {
            var h = c[e];
            ++e;
            var n = h.name,
                f = a + "/" + n + "?v=" + B.string(h.md5),
                j = xa.inferFormat(n);
            j != u.Data && (n = pa.removeFileExtension(n));
            d.add(n,
                f, h.bytes, j)
        }
        return d
    };
    xa.fromAssetsLocalized = function(a, b, c) {
        null == c && (c = !0);
        null == b && (b = z._platform.getLocale());
        if (null != b)
            for (b = b.split("-"); 0 < b.length;) {
                var d = xa.fromAssets(a + "_" + b.join("-"), !1);
                if (null != d) return d;
                b.pop()
            }
        return xa.fromAssets(a, c)
    };
    xa.inferFormat = function(a) {
        a = pa.getUrlExtension(a);
        if (null != a) switch (a.toLowerCase()) {
            case "gif":
                return u.GIF;
            case "jpg":
            case "jpeg":
                return u.JPG;
            case "jxr":
            case "wdp":
                return u.JXR;
            case "png":
                return u.PNG;
            case "webp":
                return u.WEBP;
            case "dds":
                return u.DDS;
            case "pvr":
                return u.PVR;
            case "pkm":
                return u.PKM;
            case "m4a":
                return u.M4A;
            case "mp3":
                return u.MP3;
            case "ogg":
                return u.OGG;
            case "opus":
                return u.OPUS;
            case "wav":
                return u.WAV
        } else null;
        return u.Data
    };
    xa.prototype = {
        add: function(a, b, c, d) {
            null == c && (c = 0);
            null == d && (d = xa.inferFormat(b));
            a = new eg(a, b, d, c);
            this._entries.push(a);
            return a
        },
        iterator: function() {
            return P.iter(this._entries)
        },
        getFullURL: function(a) {
            var b;
            b = null != this.get_remoteBase() && xa._supportsCrossOrigin ? this.get_remoteBase() : this.get_localBase();
            return null != b ? pa.joinPath(b, a.url) : a.url
        },
        get_localBase: function() {
            return this._localBase
        },
        set_localBase: function(a) {
            null != a && lh.that(!W.startsWith(a, "http://") && !W.startsWith(a, "https://"), "localBase must be a path on the same domain, NOT starting with http(s)://", null);
            return this._localBase = a
        },
        get_remoteBase: function() {
            return this._remoteBase
        },
        __class__: xa,
        __properties__: {
            get_remoteBase: "get_remoteBase",
            set_localBase: "set_localBase",
            get_localBase: "get_localBase"
        }
    };
    var la = g["flambe.display.BlendMode"] = {
        __ename__: ["flambe", "display", "BlendMode"],
        __constructs__: ["Normal", "Add", "Mask", "Copy"]
    };
    la.Normal = ["Normal", 0];
    la.Normal.toString = A;
    la.Normal.__enum__ = la;
    la.Add = ["Add", 1];
    la.Add.toString = A;
    la.Add.__enum__ = la;
    la.Mask = ["Mask", 2];
    la.Mask.toString = A;
    la.Mask.__enum__ = la;
    la.Copy = ["Copy", 3];
    la.Copy.toString = A;
    la.Copy.__enum__ = la;
    var Re = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b
    };
    g["flambe.math.Point"] = Re;
    Re.__name__ = ["flambe", "math", "Point"];
    Re.prototype = {
        __class__: Re
    };
    var v = function() {
        this.blendMode =
            this.scissor = null;
        var a = this;
        this._flags = 139;
        this._localMatrix = new Ob;
        var b = function() {
            a._flags |= 12
        };
        this.x = new ga(0, b);
        this.y = new ga(0, b);
        this.rotation = new ga(0, b);
        this.scaleX = new ga(1, b);
        this.scaleY = new ga(1, b);
        this.anchorX = new ga(0, b);
        this.anchorY = new ga(0, b);
        this.alpha = new ga(1)
    };
    g["flambe.display.Sprite"] = v;
    v.__name__ = ["flambe", "display", "Sprite"];
    v.hitTest = function(a, b, c) {
        var d = a._compMap.Sprite_15;
        if (null != d) {
            if (3 != (d._flags & 3)) return null;
            d.getLocalMatrix().inverseTransform(b, c, v._scratchPoint) &&
                (b = v._scratchPoint.x, c = v._scratchPoint.y);
            var e = d.scissor;
            if (null != e && !e.contains(b, c)) return null
        }
        a = v.hitTestBackwards(a.firstChild, b, c);
        return null != a ? a : null != d && d.containsLocal(b, c) ? d : null
    };
    v.render = function(a, b) {
        var c = a._compMap.Sprite_15;
        if (null != c) {
            var d = c.alpha._value;
            if (0 == (c._flags & 1) || 0 >= d) return;
            b.save();
            1 > d && b.multiplyAlpha(d);
            null != c.blendMode && b.setBlendMode(c.blendMode);
            var d = c.getLocalMatrix(),
                e = d.m02,
                h = d.m12;
            0 != (c._flags & 128) && (e = Math.round(e), h = Math.round(h));
            b.transform(d.m00, d.m10,
                d.m01, d.m11, e, h);
            d = c.scissor;
            null != d && b.applyScissor(d.x, d.y, d.width, d.height);
            c.draw(b)
        }
        d = a._compMap.Director_16;
        if (null != d) {
            d = d.occludedScenes;
            for (e = 0; e < d.length;) h = d[e], ++e, v.render(h, b)
        }
        for (d = a.firstChild; null != d;) e = d.next, v.render(d, b), d = e;
        null != c && b.restore()
    };
    v.hitTestBackwards = function(a, b, c) {
        if (null != a) {
            var d = v.hitTestBackwards(a.next, b, c);
            return null != d ? d : v.hitTest(a, b, c)
        }
        return null
    };
    v.__super__ = D;
    v.prototype = m(D.prototype, {
        get_name: function() {
            return "Sprite_15"
        },
        getNaturalWidth: function() {
            return 0
        },
        getNaturalHeight: function() {
            return 0
        },
        containsLocal: function(a, b) {
            return 0 <= a && a < this.getNaturalWidth() && 0 <= b && b < this.getNaturalHeight()
        },
        getLocalMatrix: function() {
            0 != (this._flags & 4) && (this._flags &= -5, this._localMatrix.compose(this.x._value, this.y._value, this.scaleX._value, this.scaleY._value, 3.141592653589793 * this.rotation._value / 180), this._localMatrix.translate(-this.anchorX._value, -this.anchorY._value));
            return this._localMatrix
        },
        setAnchor: function(a, b) {
            this.anchorX.set__(a);
            this.anchorY.set__(b);
            return this
        },
        centerAnchor: function() {
            this.anchorX.set__(this.getNaturalWidth() / 2);
            this.anchorY.set__(this.getNaturalHeight() / 2);
            return this
        },
        setXY: function(a, b) {
            this.x.set__(a);
            this.y.set__(b);
            return this
        },
        setAlpha: function(a) {
            this.alpha.set__(a);
            return this
        },
        setRotation: function(a) {
            this.rotation.set__(a);
            return this
        },
        setScale: function(a) {
            this.scaleX.set__(a);
            this.scaleY.set__(a);
            return this
        },
        setScaleXY: function(a, b) {
            this.scaleX.set__(a);
            this.scaleY.set__(b);
            return this
        },
        onAdded: function() {
            0 != (this._flags &
                256) && this.connectHover()
        },
        onRemoved: function() {
            null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection = null)
        },
        onUpdate: function(a) {
            this.x.update(a);
            this.y.update(a);
            this.rotation.update(a);
            this.scaleX.update(a);
            this.scaleY.update(a);
            this.alpha.update(a);
            this.anchorX.update(a);
            this.anchorY.update(a)
        },
        draw: function() {},
        getParentSprite: function() {
            if (null == this.owner) return null;
            for (var a = this.owner.parent; null != a;) {
                var b = a._compMap.Sprite_15;
                if (null != b) return b;
                a = a.parent
            }
            return null
        },
        get_pointerDown: function() {
            null == this._pointerDown && (this._pointerDown = new Ca);
            return this._pointerDown
        },
        connectHover: function() {
            var a = this;
            null == this._hoverConnection && (this._hoverConnection = z._platform.getPointer().move.connect(function(b) {
                for (var c = b.hit; null != c;) {
                    if (c == a) return;
                    c = c.getParentSprite()
                }
                null != a._pointerOut && 0 != (a._flags & 256) && a._pointerOut.emit(b);
                a._flags &= -257;
                a._hoverConnection.dispose();
                a._hoverConnection = null
            }))
        },
        set_visible: function(a) {
            this._flags = fg.set(this._flags, 1, a);
            return a
        },
        onPointerDown: function(a) {
            this.onHover(a);
            null != this._pointerDown && this._pointerDown.emit(a)
        },
        onPointerMove: function(a) {
            this.onHover(a);
            null != this._pointerMove && this._pointerMove.emit(a)
        },
        onHover: function(a) {
            if (0 == (this._flags & 256) && (this._flags |= 256, null != this._pointerIn || null != this._pointerOut)) null != this._pointerIn && this._pointerIn.emit(a), this.connectHover()
        },
        onPointerUp: function(a) {
            switch (a.source[1]) {
                case 1:
                    null != this._pointerOut && 0 != (this._flags & 256) && this._pointerOut.emit(a), this._flags &=
                        -257, null != this._hoverConnection && (this._hoverConnection.dispose(), this._hoverConnection = null)
            }
            null != this._pointerUp && this._pointerUp.emit(a)
        },
        __class__: v,
        __properties__: m(D.prototype.__properties__, {
            set_visible: "set_visible",
            get_pointerDown: "get_pointerDown"
        })
    });
    var ec = function(a, b, c) {
        v.call(this);
        this.color = a;
        this.width = new ga(b);
        this.height = new ga(c)
    };
    g["flambe.display.FillSprite"] = ec;
    ec.__name__ = ["flambe", "display", "FillSprite"];
    ec.__super__ = v;
    ec.prototype = m(v.prototype, {
        draw: function(a) {
            a.fillRect(this.color,
                0, 0, this.width._value, this.height._value)
        },
        getNaturalWidth: function() {
            return this.width._value
        },
        getNaturalHeight: function() {
            return this.height._value
        },
        onUpdate: function(a) {
            v.prototype.onUpdate.call(this, a);
            this.width.update(a);
            this.height.update(a)
        },
        __class__: ec
    });
    var ef = function(a) {
        this._kernings = null;
        this.xOffset = this.yOffset = this.xAdvance = 0;
        this.page = null;
        this.x = this.y = this.width = this.height = 0;
        this.charCode = a
    };
    g["flambe.display.Glyph"] = ef;
    ef.__name__ = ["flambe", "display", "Glyph"];
    ef.prototype = {
        draw: function(a,
            b, c) {
            0 < this.width && a.drawSubTexture(this.page, b + this.xOffset, c + this.yOffset, this.x, this.y, this.width, this.height)
        },
        getKerning: function(a) {
            return null != this._kernings ? B["int"](this._kernings.get(a)) : 0
        },
        setKerning: function(a, b) {
            null == this._kernings && (this._kernings = new Db);
            this._kernings.set(a, b)
        },
        __class__: ef
    };
    var rd = function(a, b) {
        this.name = b;
        this._pack = a;
        this.reload()
    };
    g["flambe.display.Font"] = rd;
    rd.__name__ = ["flambe", "display", "Font"];
    rd.prototype = {
        layoutText: function(a, b, c, d, e) {
            null == e && (e = 0);
            null ==
                d && (d = 0);
            null == c && (c = 0);
            null == b && (b = ka.Left);
            return new Wc(this, a, b, c, d, e)
        },
        reload: function() {
            this._glyphs = new Db;
            this._glyphs.set(rd.NEWLINE.charCode, rd.NEWLINE);
            for (var a = new Jd(this._pack.getFile(this.name + ".fnt").toString()), b = new Db, c = this.name.lastIndexOf("/"), c = 0 <= c ? P.substr(this.name, 0, c + 1) : "", d = a.keywords(); d.hasNext();) switch (d.next()) {
                case "info":
                    for (var e = a.pairs(); e.hasNext();) {
                        var h = e.next();
                        switch (h.key) {
                            case "size":
                                this.size = h.getInt()
                        }
                    }
                    break;
                case "common":
                    for (e = a.pairs(); e.hasNext();) switch (h =
                        e.next(), h.key) {
                        case "lineHeight":
                            this.lineHeight = h.getInt()
                    }
                    break;
                case "page":
                    for (var e = 0, h = null, n = a.pairs(); n.hasNext();) {
                        var f = n.next();
                        switch (f.key) {
                            case "id":
                                e = f.getInt();
                                break;
                            case "file":
                                h = f.getString()
                        }
                    }
                    h = this._pack.getTexture(c + pa.removeFileExtension(h));
                    b.set(e, h);
                    break;
                case "char":
                    e = null;
                    for (h = a.pairs(); h.hasNext();) switch (n = h.next(), n.key) {
                        case "id":
                            e = new ef(n.getInt());
                            break;
                        case "x":
                            e.x = n.getInt();
                            break;
                        case "y":
                            e.y = n.getInt();
                            break;
                        case "width":
                            e.width = n.getInt();
                            break;
                        case "height":
                            e.height =
                                n.getInt();
                            break;
                        case "page":
                            n = n.getInt();
                            e.page = b.get(n);
                            break;
                        case "xoffset":
                            e.xOffset = n.getInt();
                            break;
                        case "yoffset":
                            e.yOffset = n.getInt();
                            break;
                        case "xadvance":
                            e.xAdvance = n.getInt()
                    }
                    this._glyphs.set(e.charCode, e);
                    break;
                case "kerning":
                    e = null;
                    n = h = 0;
                    for (f = a.pairs(); f.hasNext();) {
                        var j = f.next();
                        switch (j.key) {
                            case "first":
                                e = this._glyphs.get(j.getInt());
                                break;
                            case "second":
                                h = j.getInt();
                                break;
                            case "amount":
                                n = j.getInt()
                        }
                    }
                    null != e && 0 != n && e.setKerning(h, n)
            }
        },
        __class__: rd
    };
    var ka = g["flambe.display.TextAlign"] = {
        __ename__: ["flambe", "display", "TextAlign"],
        __constructs__: ["Left", "Center", "Right"]
    };
    ka.Left = ["Left", 0];
    ka.Left.toString = A;
    ka.Left.__enum__ = ka;
    ka.Center = ["Center", 1];
    ka.Center.toString = A;
    ka.Center.__enum__ = ka;
    ka.Right = ["Right", 2];
    ka.Right.toString = A;
    ka.Right.__enum__ = ka;
    var Wc = function(a, b, c, d, e, h) {
        this.lines = 0;
        var f = this;
        this._font = a;
        this._glyphs = [];
        this._offsets = [];
        this._lineOffset = Math.round(a.lineHeight + h);
        this.bounds = new Lb;
        for (var i = [], h = b.length, j = 0; j < h;) {
            var g = j++,
                g = b.charCodeAt(g),
                g = a._glyphs.get(g);
            null != g ? this._glyphs.push(g) : null
        }
        for (var b = -1, k = 0, l = 0, a = a._glyphs.get(10), h = function() {
            f.bounds.width = sa.max(f.bounds.width, k);
            f.bounds.height += l;
            i[f.lines] = k;
            l = k = 0;
            ++f.lines
        }, j = 0; j < this._glyphs.length;) {
            g = this._glyphs[j];
            this._offsets[j] = Math.round(k);
            var x = 0 < d && k + g.width > d;
            x || g == a ? (x && (0 <= b ? (this._glyphs[b] = a, k = this._offsets[b], j = b) : this._glyphs.splice(j, 0, a)), b = -1, l = this._lineOffset, h()) : (32 == g.charCode && (b = j), k += g.xAdvance + e, l = sa.max(l, g.height + g.yOffset), j + 1 < this._glyphs.length && (k += g.getKerning(this._glyphs[j +
                1].charCode)));
            ++j
        }
        h();
        e = 0;
        a = Wc.getAlignOffset(c, i[0], d);
        b = 1.79769313486231E308;
        h = -1.79769313486231E308;
        g = j = 0;
        for (x = this._glyphs.length; g < x;) {
            var Wh = this._glyphs[g];
            10 == Wh.charCode && (e += this._lineOffset, ++j, a = Wc.getAlignOffset(c, i[j], d));
            this._offsets[g] += a;
            var m = e + Wh.yOffset;
            b < m || (b = m);
            h = sa.max(h, m + Wh.height);
            ++g
        }
        this.bounds.x = Wc.getAlignOffset(c, this.bounds.width, d);
        this.bounds.y = b;
        this.bounds.height = h - b
    };
    g["flambe.display.TextLayout"] = Wc;
    Wc.__name__ = ["flambe", "display", "TextLayout"];
    Wc.getAlignOffset =
        function(a, b, c) {
            switch (a[1]) {
                case 0:
                    return 0;
                case 2:
                    return c - b;
                case 1:
                    return Math.round((c - b) / 2)
            }
    };
    Wc.prototype = {
        draw: function(a) {
            for (var b = 0, c = 0, d = this._glyphs.length; c < d;) {
                var e = this._glyphs[c];
                10 == e.charCode ? b += this._lineOffset : e.draw(a, this._offsets[c], b);
                ++c
            }
        },
        __class__: Wc
    };
    var Jd = function(a) {
        this._configText = a;
        this._keywordPattern = new tb("([A-Za-z]+)(.*)", "");
        this._pairPattern = new tb('([A-Za-z]+)=("[^"]*"|[^\\s]+)', "")
    };
    g["flambe.display._Font.ConfigParser"] = Jd;
    Jd.__name__ = ["flambe", "display",
        "_Font", "ConfigParser"
    ];
    Jd.advance = function(a, b) {
        var c = b.matchedPos();
        return P.substr(a, c.pos + c.len, a.length)
    };
    Jd.prototype = {
        keywords: function() {
            var a = this,
                b = this._configText;
            return {
                next: function() {
                    b = Jd.advance(b, a._keywordPattern);
                    a._pairText = a._keywordPattern.matched(2);
                    return a._keywordPattern.matched(1)
                },
                hasNext: function() {
                    return a._keywordPattern.match(b)
                }
            }
        },
        pairs: function() {
            var a = this,
                b = this._pairText;
            return {
                next: function() {
                    b = Jd.advance(b, a._pairPattern);
                    return new gg(a._pairPattern.matched(1),
                        a._pairPattern.matched(2))
                },
                hasNext: function() {
                    return a._pairPattern.match(b)
                }
            }
        },
        __class__: Jd
    };
    var gg = function(a, b) {
        this.key = a;
        this._value = b
    };
    g["flambe.display._Font.ConfigPair"] = gg;
    gg.__name__ = ["flambe", "display", "_Font", "ConfigPair"];
    gg.prototype = {
        getInt: function() {
            return B.parseInt(this._value)
        },
        getString: function() {
            return 34 != this._value.charCodeAt(0) ? null : P.substr(this._value, 1, this._value.length - 2)
        },
        __class__: gg
    };
    var hg = function() {};
    g["flambe.display.Graphics"] = hg;
    hg.__name__ = ["flambe", "display",
        "Graphics"
    ];
    hg.prototype = {
        __class__: hg
    };
    var ba = function(a) {
        v.call(this);
        this.texture = a
    };
    g["flambe.display.ImageSprite"] = ba;
    ba.__name__ = ["flambe", "display", "ImageSprite"];
    ba.__super__ = v;
    ba.prototype = m(v.prototype, {
        draw: function(a) {
            null != this.texture && a.drawTexture(this.texture, 0, 0)
        },
        getNaturalWidth: function() {
            return null != this.texture ? this.texture.get_width() : 0
        },
        getNaturalHeight: function() {
            return null != this.texture ? this.texture.get_height() : 0
        },
        __class__: ba
    });
    var Kb = g["flambe.display.Orientation"] = {
        __ename__: ["flambe", "display", "Orientation"],
        __constructs__: ["Portrait", "Landscape"]
    };
    Kb.Portrait = ["Portrait", 0];
    Kb.Portrait.toString = A;
    Kb.Portrait.__enum__ = Kb;
    Kb.Landscape = ["Landscape", 1];
    Kb.Landscape.toString = A;
    Kb.Landscape.__enum__ = Kb;
    var ff = function() {};
    g["flambe.display.Texture"] = ff;
    ff.__name__ = ["flambe", "display", "Texture"];
    ff.__interfaces__ = [Vc];
    ff.prototype = {
        __class__: ff
    };
    var mh = function() {};
    g["flambe.display.SubTexture"] = mh;
    mh.__name__ = ["flambe", "display", "SubTexture"];
    mh.__interfaces__ = [ff];
    var R = function(a, b) {
        null == b && (b = "");
        this._layout = null;
        var c = this;
        v.call(this);
        this._font = a;
        this._text = b;
        this._align = ka.Left;
        this._flags |= 64;
        var d = function() {
            c._flags |= 64
        };
        this.wrapWidth = new ga(0, d);
        this.letterSpacing = new ga(0, d);
        this.lineSpacing = new ga(0, d)
    };
    g["flambe.display.TextSprite"] = R;
    R.__name__ = ["flambe", "display", "TextSprite"];
    R.__super__ = v;
    R.prototype = m(v.prototype, {
        draw: function(a) {
            this.updateLayout();
            this._layout.draw(a)
        },
        getNaturalWidth: function() {
            this.updateLayout();
            return 0 < this.wrapWidth._value ?
                this.wrapWidth._value : this._layout.bounds.width
        },
        getNaturalHeight: function() {
            this.updateLayout();
            var a = this._layout.lines * (this._font.lineHeight + this.lineSpacing._value),
                b = this._layout.bounds.height;
            return a > b ? a : b
        },
        containsLocal: function(a, b) {
            this.updateLayout();
            return this._layout.bounds.contains(a, b)
        },
        setWrapWidth: function(a) {
            this.wrapWidth.set__(a);
            return this
        },
        setAlign: function(a) {
            this.set_align(a);
            return this
        },
        set_text: function(a) {
            a != this._text && (this._text = a, this._flags |= 64);
            return a
        },
        set_align: function(a) {
            a !=
                this._align && (this._align = a, this._flags |= 64);
            return a
        },
        updateLayout: function() {
            0 != (this._flags & 64) && (this._flags &= -65, this._layout = this._font.layoutText(this._text, this._align, this.wrapWidth._value, this.letterSpacing._value, this.lineSpacing._value))
        },
        onUpdate: function(a) {
            v.prototype.onUpdate.call(this, a);
            this.wrapWidth.update(a);
            this.letterSpacing.update(a);
            this.lineSpacing.update(a)
        },
        __class__: R,
        __properties__: m(v.prototype.__properties__, {
            set_align: "set_align",
            set_text: "set_text"
        })
    });
    var fa = g["flambe.input.MouseButton"] = {
        __ename__: ["flambe", "input", "MouseButton"],
        __constructs__: ["Left", "Middle", "Right", "Unknown"]
    };
    fa.Left = ["Left", 0];
    fa.Left.toString = A;
    fa.Left.__enum__ = fa;
    fa.Middle = ["Middle", 1];
    fa.Middle.toString = A;
    fa.Middle.__enum__ = fa;
    fa.Right = ["Right", 2];
    fa.Right.toString = A;
    fa.Right.__enum__ = fa;
    fa.Unknown = function(a) {
        a = ["Unknown", 3, a];
        a.__enum__ = fa;
        a.toString = A;
        return a
    };
    var Pb = g["flambe.input.MouseCursor"] = {
        __ename__: ["flambe", "input", "MouseCursor"],
        __constructs__: ["Default", "Button", "None"]
    };
    Pb.Default = ["Default",
        0
    ];
    Pb.Default.toString = A;
    Pb.Default.__enum__ = Pb;
    Pb.Button = ["Button", 1];
    Pb.Button.toString = A;
    Pb.Button.__enum__ = Pb;
    Pb.None = ["None", 2];
    Pb.None.toString = A;
    Pb.None.__enum__ = Pb;
    var ig = function() {
        this.init(0, 0, 0, null)
    };
    g["flambe.input.MouseEvent"] = ig;
    ig.__name__ = ["flambe", "input", "MouseEvent"];
    ig.prototype = {
        init: function(a, b, c, d) {
            this.id = a;
            this.viewX = b;
            this.viewY = c;
            this.button = d
        },
        __class__: ig
    };
    var gf = g["flambe.input.EventSource"] = {
        __ename__: ["flambe", "input", "EventSource"],
        __constructs__: ["Mouse", "Touch"]
    };
    gf.Mouse = function(a) {
        a = ["Mouse", 0, a];
        a.__enum__ = gf;
        a.toString = A;
        return a
    };
    gf.Touch = function(a) {
        a = ["Touch", 1, a];
        a.__enum__ = gf;
        a.toString = A;
        return a
    };
    var jg = function() {
        this.init(0, 0, 0, null, null)
    };
    g["flambe.input.PointerEvent"] = jg;
    jg.__name__ = ["flambe", "input", "PointerEvent"];
    jg.prototype = {
        init: function(a, b, c, d, e) {
            this.id = a;
            this.viewX = b;
            this.viewY = c;
            this.hit = d;
            this.source = e;
            this._stopped = !1
        },
        __class__: jg
    };
    var kg = function(a) {
        this.id = a;
        this._source = gf.Touch(this)
    };
    g["flambe.input.TouchPoint"] = kg;
    kg.__name__ = ["flambe", "input", "TouchPoint"];
    kg.prototype = {
        init: function(a, b) {
            this.viewX = a;
            this.viewY = b
        },
        __class__: kg
    };
    var sa = function() {};
    g["flambe.math.FMath"] = sa;
    sa.__name__ = ["flambe", "math", "FMath"];
    sa.max = function(a, b) {
        return a > b ? a : b
    };
    sa.min = function(a, b) {
        return a < b ? a : b
    };
    sa.clamp = function(a, b, c) {
        return a < b ? b : a > c ? c : a
    };
    var Ob = function() {
        this.identity()
    };
    g["flambe.math.Matrix"] = Ob;
    Ob.__name__ = ["flambe", "math", "Matrix"];
    Ob.multiply = function(a, b, c) {
        null == c && (c = new Ob);
        var d = a.m00 * b.m00 + a.m01 * b.m10,
            e = a.m00 * b.m01 +
            a.m01 * b.m11,
            h = a.m00 * b.m02 + a.m01 * b.m12 + a.m02;
        c.m00 = d;
        c.m01 = e;
        c.m02 = h;
        d = a.m10 * b.m00 + a.m11 * b.m10;
        e = a.m10 * b.m01 + a.m11 * b.m11;
        h = a.m10 * b.m02 + a.m11 * b.m12 + a.m12;
        c.m10 = d;
        c.m11 = e;
        c.m12 = h;
        return c
    };
    Ob.prototype = {
        set: function(a, b, c, d, e, h) {
            this.m00 = a;
            this.m01 = c;
            this.m02 = e;
            this.m10 = b;
            this.m11 = d;
            this.m12 = h
        },
        identity: function() {
            this.set(1, 0, 0, 1, 0, 0)
        },
        compose: function(a, b, c, d, e) {
            var h = Math.sin(e),
                e = Math.cos(e);
            this.set(e * c, h * c, -h * d, e * d, a, b)
        },
        translate: function(a, b) {
            this.m02 += this.m00 * a + this.m01 * b;
            this.m12 += this.m11 *
                b + this.m10 * a
        },
        invert: function() {
            var a = this.determinant();
            if (0 == a) return !1;
            this.set(this.m11 / a, -this.m01 / a, -this.m10 / a, this.m00 / a, (this.m01 * this.m12 - this.m11 * this.m02) / a, (this.m10 * this.m02 - this.m00 * this.m12) / a);
            return !0
        },
        transformArray: function(a, b, c) {
            for (var d = 0; d < b;) {
                var e = a[d],
                    h = a[d + 1];
                c[d++] = e * this.m00 + h * this.m01 + this.m02;
                c[d++] = e * this.m10 + h * this.m11 + this.m12
            }
        },
        determinant: function() {
            return this.m00 * this.m11 - this.m01 * this.m10
        },
        inverseTransform: function(a, b, c) {
            var d = this.determinant();
            if (0 == d) return !1;
            a -= this.m02;
            b -= this.m12;
            c.x = (a * this.m11 - b * this.m01) / d;
            c.y = (b * this.m00 - a * this.m10) / d;
            return !0
        },
        clone: function(a) {
            null == a && (a = new Ob);
            a.set(this.m00, this.m10, this.m01, this.m11, this.m02, this.m12);
            return a
        },
        __class__: Ob
    };
    var Lb = function(a, b, c, d) {
        null == d && (d = 0);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.set(a, b, c, d)
    };
    g["flambe.math.Rectangle"] = Lb;
    Lb.__name__ = ["flambe", "math", "Rectangle"];
    Lb.prototype = {
        set: function(a, b, c, d) {
            this.x = a;
            this.y = b;
            this.width = c;
            this.height = d
        },
        contains: function(a, b) {
            a -=
                this.x;
            if (0 <= this.width) {
                if (0 > a || a > this.width) return !1
            } else if (0 < a || a < this.width) return !1;
            b -= this.y;
            if (0 <= this.height) {
                if (0 > b || b > this.height) return !1
            } else if (0 < b || b < this.height) return !1;
            return !0
        },
        clone: function(a) {
            null == a && (a = new Lb);
            a.set(this.x, this.y, this.width, this.height);
            return a
        },
        equals: function(a) {
            return this.x == a.x && this.y == a.y && this.width == a.width && this.height == a.height
        },
        __class__: Lb
    };
    var ma = function() {
        this._disposed = !1
    };
    g["flambe.platform.BasicAsset"] = ma;
    ma.__name__ = ["flambe", "platform",
        "BasicAsset"
    ];
    ma.__interfaces__ = [Vc];
    ma.prototype = {
        dispose: function() {
            this._disposed || (this._disposed = !0, this.onDisposed())
        },
        onDisposed: function() {
            null
        },
        __class__: ma
    };
    var Xc = function(a, b) {
        var c = this;
        this.manifest = b;
        this._platform = a;
        this.promise = new hf;
        this._bytesLoaded = new ta;
        this._pack = new jf(b, this);
        var d = ve.array(b);
        if (0 == d.length) this.handleSuccess();
        else {
            for (var e = new ta, h = 0; h < d.length;) {
                var f = d[h];
                ++h;
                var i = e.get(f.name);
                null == i && (i = [], e.set(f.name, i));
                i.push(f)
            }
            this._assetsRemaining = ve.count(e);
            for (d = e.iterator(); d.hasNext();) e = [d.next()], this.pickBestEntry(e[0], function(a) {
                return function(d) {
                    if (null != d) {
                        var e = b.getFullURL(d);
                        try {
                            c.loadEntry(e, d)
                        } catch (h) {
                            c.handleError(d, "Unexpected error: " + B.string(h))
                        }
                        e = c.promise;
                        e.set_total(e._total + d.bytes)
                    } else d = a[0][0], Xc.isAudio(d.format) ? c.handleLoad(d, qb.getInstance()) : c.handleError(d, "Could not find a supported format to load")
                }
            }(e))
        }
    };
    g["flambe.platform.BasicAssetPackLoader"] = Xc;
    Xc.__name__ = ["flambe", "platform", "BasicAssetPackLoader"];
    Xc.isAudio =
        function(a) {
            switch (a[1]) {
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    return !0;
                default:
                    return !1
            }
    };
    Xc.prototype = {
        onDisposed: function() {},
        pickBestEntry: function(a, b) {
            this.getAssetFormats(function(c) {
                for (var d = 0; d < c.length;) {
                    var e = c[d];
                    ++d;
                    for (var h = 0; h < a.length;) {
                        var f = a[h];
                        ++h;
                        if (f.format == e) {
                            b(f);
                            return
                        }
                    }
                }
                b(null)
            })
        },
        loadEntry: function() {
            null
        },
        getAssetFormats: function() {
            null
        },
        handleLoad: function(a, b) {
            if (!this._pack.disposed) {
                this.handleProgress(a, a.bytes);
                var c;
                switch (a.format[1]) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        c =
                            this._pack.textures;
                        break;
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        c = this._pack.sounds;
                        break;
                    case 13:
                        c = this._pack.files
                }
                c.set(a.name, b);
                this._assetsRemaining -= 1;
                0 == this._assetsRemaining && this.handleSuccess()
            }
        },
        handleProgress: function(a, b) {
            this._bytesLoaded.set(a.name, b);
            for (var c = 0, d = this._bytesLoaded.iterator(); d.hasNext();) var e = d.next(),
                c = c + e;
            this.promise.set_progress(c)
        },
        handleSuccess: function() {
            this.promise.set_result(this._pack)
        },
        handleError: function(a, b) {
            this.promise.error.emit(pa.withFields(b, ["url", a.url]))
        },
        handleTextureError: function(a) {
            this.handleError(a, "Failed to create texture. Is the GPU context unavailable?")
        },
        __class__: Xc
    };
    var jf = function(a, b) {
        this.disposed = !1;
        this._manifest = a;
        this.loader = b;
        this.textures = new ta;
        this.sounds = new ta;
        this.files = new ta
    };
    g["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = jf;
    jf.__name__ = ["flambe", "platform", "_BasicAssetPackLoader", "BasicAssetPack"];
    jf.__interfaces__ = [cf];
    jf.prototype = {
        getTexture: function(a, b) {
            null == b && (b = !0);
            var c = this.textures.get(a);
            if (null == c && b) throw pa.withFields("Missing texture", ["name", a]);
            return c
        },
        getSound: function(a, b) {
            null == b && (b = !0);
            var c = this.sounds.get(a);
            if (null == c && b) throw pa.withFields("Missing sound", ["name", a]);
            return c
        },
        getFile: function(a, b) {
            null == b && (b = !0);
            var c = this.files.get(a);
            if (null == c && b) throw pa.withFields("Missing file", ["name", a]);
            return c
        },
        dispose: function() {
            if (!this.disposed) {
                this.disposed = !0;
                for (var a = this.textures.iterator(); a.hasNext();) a.next().dispose();
                this.textures = null;
                for (a = this.sounds.iterator(); a.hasNext();) a.next().dispose();
                this.sounds = null;
                for (a = this.files.iterator(); a.hasNext();) a.next().dispose();
                this.files = null;
                this.loader.onDisposed()
            }
        },
        __class__: jf
    };
    var id = function(a) {
        this._disposed = !1;
        this._content = a
    };
    g["flambe.platform.BasicFile"] = id;
    id.__name__ = ["flambe", "platform", "BasicFile"];
    id.__interfaces__ = [df];
    id.__super__ = ma;
    id.prototype = m(ma.prototype, {
        toString: function() {
            return this._content
        },
        onDisposed: function() {
            this._content = null
        },
        __class__: id
    });
    var Xh = function() {};
    g["flambe.subsystem.MouseSystem"] = Xh;
    Xh.__name__ = ["flambe", "subsystem", "MouseSystem"];
    var db = function(a) {
        this._pointer = a;
        this._source = gf.Mouse(db._sharedEvent);
        this.down = new Ca;
        this.move = new Ca;
        this.up = new Ca;
        this.scroll = new Ca;
        this._y = this._x = 0;
        this._cursor = Pb.Default;
        this._buttonStates = new Db
    };
    g["flambe.platform.BasicMouse"] = db;
    db.__name__ = ["flambe", "platform", "BasicMouse"];
    db.__interfaces__ = [Xh];
    db.prototype = {
        submitDown: function(a, b, c) {
            this._buttonStates.exists(c) || (this._buttonStates.set(c, !0), this.prepare(a, b, lg.toButton(c)), this._pointer.submitDown(a,
                b, this._source), this.down.emit(db._sharedEvent))
        },
        submitMove: function(a, b) {
            this.prepare(a, b, null);
            this._pointer.submitMove(a, b, this._source);
            this.move.emit(db._sharedEvent)
        },
        submitUp: function(a, b, c) {
            this._buttonStates.exists(c) && (this._buttonStates.remove(c), this.prepare(a, b, lg.toButton(c)), this._pointer.submitUp(a, b, this._source), this.up.emit(db._sharedEvent))
        },
        submitScroll: function(a, b, c) {
            this._x = a;
            this._y = b;
            if (null == this.scroll._head) return !1;
            this.scroll.emit(c);
            return !0
        },
        prepare: function(a, b,
            c) {
            this._x = a;
            this._y = b;
            db._sharedEvent.init(db._sharedEvent.id + 1, a, b, c)
        },
        __class__: db
    };
    var mg = function() {};
    g["flambe.subsystem.PointerSystem"] = mg;
    mg.__name__ = ["flambe", "subsystem", "PointerSystem"];
    mg.prototype = {
        __class__: mg
    };
    var La = function(a, b, c) {
        null == c && (c = !1);
        null == b && (b = 0);
        null == a && (a = 0);
        this.down = new Ca;
        this.move = new Ca;
        this.up = new Ca;
        this._x = a;
        this._y = b;
        this._isDown = c
    };
    g["flambe.platform.BasicPointer"] = La;
    La.__name__ = ["flambe", "platform", "BasicPointer"];
    La.__interfaces__ = [mg];
    La.prototype = {
        submitDown: function(a, b, c) {
            if (!this._isDown) {
                this.submitMove(a, b, c);
                this._isDown = !0;
                var d = [],
                    e = v.hitTest(z.root, a, b);
                if (null != e) {
                    var h = e.owner;
                    do {
                        var f = h._compMap.Sprite_15;
                        null != f && d.push(f);
                        h = h.parent
                    } while (null != h)
                }
                this.prepare(a, b, e, c);
                for (a = 0; a < d.length;)
                    if (b = d[a], ++a, b.onPointerDown(La._sharedEvent), La._sharedEvent._stopped) return;
                this.down.emit(La._sharedEvent)
            }
        },
        submitMove: function(a, b, c) {
            if (!(a == this._x && b == this._y)) {
                var d = [],
                    e = v.hitTest(z.root, a, b);
                if (null != e) {
                    var h = e.owner;
                    do {
                        var f = h._compMap.Sprite_15;
                        null != f && d.push(f);
                        h = h.parent
                    } while (null != h)
                }
                this.prepare(a, b, e, c);
                for (a = 0; a < d.length;)
                    if (b = d[a], ++a, b.onPointerMove(La._sharedEvent), La._sharedEvent._stopped) return;
                this.move.emit(La._sharedEvent)
            }
        },
        submitUp: function(a, b, c) {
            if (this._isDown) {
                this.submitMove(a, b, c);
                this._isDown = !1;
                var d = [],
                    e = v.hitTest(z.root, a, b);
                if (null != e) {
                    var h = e.owner;
                    do {
                        var f = h._compMap.Sprite_15;
                        null != f && d.push(f);
                        h = h.parent
                    } while (null != h)
                }
                this.prepare(a, b, e, c);
                for (a = 0; a < d.length;)
                    if (b = d[a], ++a, b.onPointerUp(La._sharedEvent),
                        La._sharedEvent._stopped) return;
                this.up.emit(La._sharedEvent)
            }
        },
        prepare: function(a, b, c, d) {
            this._x = a;
            this._y = b;
            La._sharedEvent.init(La._sharedEvent.id + 1, a, b, c, d)
        },
        __class__: La
    };
    var Qb = function(a, b, c) {
        this._x = this._y = 0;
        this._parent = null;
        this.rootX = this.rootY = 0;
        this._disposed = !1;
        this.root = a;
        this._width = b;
        this._height = c
    };
    g["flambe.platform.BasicTexture"] = Qb;
    Qb.__name__ = ["flambe", "platform", "BasicTexture"];
    Qb.__interfaces__ = [mh];
    Qb.__super__ = ma;
    Qb.prototype = m(ma.prototype, {
        subTexture: function(a, b, c, d) {
            c =
                this.root.createTexture(c, d);
            c._parent = this;
            c._x = a;
            c._y = b;
            c.rootX = this.rootX + a;
            c.rootY = this.rootY + b;
            return c
        },
        split: function(a, b) {
            null == b && (b = 1);
            for (var c = [], d = this._width / a | 0, e = this._height / b | 0, h = 0; h < b;)
                for (var f = h++, i = 0; i < a;) {
                    var j = i++;
                    c.push(this.subTexture(j * d, f * e, d, e))
                }
            return c
        },
        onDisposed: function() {
            null == this._parent && this.root.dispose()
        },
        get_width: function() {
            return this._width
        },
        get_height: function() {
            return this._height
        },
        __class__: Qb,
        __properties__: {
            get_height: "get_height",
            get_width: "get_width"
        }
    });
    var nh = function() {};
    g["flambe.subsystem.TouchSystem"] = nh;
    nh.__name__ = ["flambe", "subsystem", "TouchSystem"];
    var Xe = function(a, b) {
        null == b && (b = 4);
        this._pointer = a;
        this._maxPoints = b;
        this._pointMap = new Db;
        this._points = [];
        this.down = new Ca;
        this.move = new Ca;
        this.up = new Ca
    };
    g["flambe.platform.BasicTouch"] = Xe;
    Xe.__name__ = ["flambe", "platform", "BasicTouch"];
    Xe.__interfaces__ = [nh];
    Xe.prototype = {
        submitDown: function(a, b, c) {
            if (!this._pointMap.exists(a)) {
                var d = new kg(a);
                d.init(b, c);
                this._pointMap.set(a, d);
                this._points.push(d);
                null == this._pointerTouch && (this._pointerTouch = d, this._pointer.submitDown(b, c, d._source));
                this.down.emit(d)
            }
        },
        submitMove: function(a, b, c) {
            a = this._pointMap.get(a);
            null != a && (a.init(b, c), this._pointerTouch == a && this._pointer.submitMove(b, c, a._source), this.move.emit(a))
        },
        submitUp: function(a, b, c) {
            var d = this._pointMap.get(a);
            null != d && (d.init(b, c), this._pointMap.remove(a), P.remove(this._points, d), this._pointerTouch == d && (this._pointerTouch = null, this._pointer.submitUp(b, c, d._source)), this.up.emit(d))
        },
        __class__: Xe
    };
    var xc = function() {};
    g["flambe.sound.Sound"] = xc;
    xc.__name__ = ["flambe", "sound", "Sound"];
    xc.__interfaces__ = [Vc];
    xc.prototype = {
        __class__: xc
    };
    var qb = function() {
        this._disposed = !1;
        this._playback = new kf(this)
    };
    g["flambe.platform.DummySound"] = qb;
    qb.__name__ = ["flambe", "platform", "DummySound"];
    qb.__interfaces__ = [xc];
    qb.getInstance = function() {
        null == qb._instance && (qb._instance = new qb);
        return qb._instance
    };
    qb.__super__ = ma;
    qb.prototype = m(ma.prototype, {
        play: function() {
            return this._playback
        },
        loop: function() {
            return this._playback
        },
        onDisposed: function() {},
        __class__: qb
    });
    var Kd = function() {};
    g["flambe.sound.Playback"] = Kd;
    Kd.__name__ = ["flambe", "sound", "Playback"];
    Kd.__interfaces__ = [Bb];
    Kd.prototype = {
        __class__: Kd
    };
    var kf = function(a) {
        this._sound = a;
        this.volume = new ga(0);
        this._complete = new Ta(!0)
    };
    g["flambe.platform.DummyPlayback"] = kf;
    kf.__name__ = ["flambe", "platform", "DummyPlayback"];
    kf.__interfaces__ = [Kd];
    kf.prototype = {
        set_paused: function() {
            return !0
        },
        dispose: function() {},
        __class__: kf,
        __properties__: {
            set_paused: "set_paused"
        }
    };
    var lf =
        function() {};
    g["flambe.subsystem.StorageSystem"] = lf;
    lf.__name__ = ["flambe", "subsystem", "StorageSystem"];
    lf.prototype = {
        __class__: lf
    };
    var $e = function() {
        this.clear()
    };
    g["flambe.platform.DummyStorage"] = $e;
    $e.__name__ = ["flambe", "platform", "DummyStorage"];
    $e.__interfaces__ = [lf];
    $e.prototype = {
        set: function(a, b) {
            this._hash.set(a, b);
            return !0
        },
        get: function(a, b) {
            return this._hash.exists(a) ? this._hash.get(a) : b
        },
        clear: function() {
            this._hash = new ta
        },
        __class__: $e
    };
    var Ye = function() {
        this.down = new Ca;
        this.move = new Ca;
        this.up = new Ca
    };
    g["flambe.platform.DummyTouch"] = Ye;
    Ye.__name__ = ["flambe", "platform", "DummyTouch"];
    Ye.__interfaces__ = [nh];
    Ye.prototype = {
        __class__: Ye
    };
    var Zd = function() {
        this._entries = []
    };
    g["flambe.platform.EventGroup"] = Zd;
    Zd.__name__ = ["flambe", "platform", "EventGroup"];
    Zd.__interfaces__ = [Bb];
    Zd.prototype = {
        addListener: function(a, b, c) {
            a.addEventListener(b, c, !1);
            this._entries.push(new ng(a, b, c))
        },
        addDisposingListener: function(a, b, c) {
            var d = this;
            this.addListener(a, b, function(a) {
                d.dispose();
                c(a)
            })
        },
        dispose: function() {
            for (var a =
                0, b = this._entries; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispatcher.removeEventListener(c.type, c.listener, !1)
            }
            this._entries = []
        },
        __class__: Zd
    };
    var ng = function(a, b, c) {
        this.dispatcher = a;
        this.type = b;
        this.listener = c
    };
    g["flambe.platform._EventGroup.Entry"] = ng;
    ng.__name__ = ["flambe", "platform", "_EventGroup", "Entry"];
    ng.prototype = {
        __class__: ng
    };
    var $d = function() {};
    g["flambe.platform.InternalGraphics"] = $d;
    $d.__name__ = ["flambe", "platform", "InternalGraphics"];
    $d.__interfaces__ = [hg];
    $d.prototype = {
        __class__: $d
    };
    var og =
        function() {};
    g["flambe.subsystem.RendererSystem"] = og;
    og.__name__ = ["flambe", "subsystem", "RendererSystem"];
    og.prototype = {
        __class__: og
    };
    var ae = function() {};
    g["flambe.platform.InternalRenderer"] = ae;
    ae.__name__ = ["flambe", "platform", "InternalRenderer"];
    ae.__interfaces__ = [og];
    ae.prototype = {
        __class__: ae
    };
    var gc = function() {
        this._tickables = []
    };
    g["flambe.platform.MainLoop"] = gc;
    gc.__name__ = ["flambe", "platform", "MainLoop"];
    gc.updateEntity = function(a, b) {
        var c = a._compMap.SpeedAdjuster_17;
        if (null != c && (c._realDt =
            b, b *= c.scale._value, 0 >= b)) {
            c.onUpdate(b);
            return
        }
        for (c = a.firstComponent; null != c;) {
            var d = c.next;
            c.onUpdate(b);
            c = d
        }
        for (c = a.firstChild; null != c;) d = c.next, gc.updateEntity(c, b), c = d
    };
    gc.prototype = {
        update: function(a) {
            if (!(0 >= a)) {
                1 < a && (a = 1);
                for (var b = 0; b < this._tickables.length;) {
                    var c = this._tickables[b];
                    null == c || c.update(a) ? this._tickables.splice(b, 1) : ++b
                }
                z.volume.update(a);
                gc.updateEntity(z.root, a)
            }
        },
        render: function(a) {
            var b = a.graphics;
            null != b && (a.willRender(), v.render(z.root, b), a.didRender())
        },
        addTickable: function(a) {
            this._tickables.push(a)
        },
        __class__: gc
    };
    var pg = function() {};
    g["flambe.platform.MathUtil"] = pg;
    pg.__name__ = ["flambe", "platform", "MathUtil"];
    pg.nextPowerOfTwo = function(a) {
        for (var b = 1; b < a;) b <<= 1;
        return b
    };
    var lg = function() {};
    g["flambe.platform.MouseCodes"] = lg;
    lg.__name__ = ["flambe", "platform", "MouseCodes"];
    lg.toButton = function(a) {
        switch (a) {
            case 0:
                return fa.Left;
            case 1:
                return fa.Middle;
            case 2:
                return fa.Right
        }
        return fa.Unknown(a)
    };
    var mf = function() {};
    g["flambe.platform.TextureRoot"] = mf;
    mf.__name__ = ["flambe", "platform", "TextureRoot"];
    mf.prototype = {
        __class__: mf
    };
    var nf = function() {};
    g["flambe.platform.Tickable"] = nf;
    nf.__name__ = ["flambe", "platform", "Tickable"];
    nf.prototype = {
        __class__: nf
    };
    var of = function(a) {
        this._firstDraw = !1;
        this._canvasCtx = a.getContext("2d")
    };
    g["flambe.platform.html.CanvasGraphics"] = of;
    of.__name__ = ["flambe", "platform", "html", "CanvasGraphics"];
    of.__interfaces__ = [$d];
    of.prototype = {
        save: function() {
            this._canvasCtx.save()
        },
        transform: function(a, b, c, d, e, h) {
            this._canvasCtx.transform(a, b, c, d, e, h)
        },
        restore: function() {
            this._canvasCtx.restore()
        },
        drawTexture: function(a, b, c) {
            this.drawSubTexture(a, b, c, 0, 0, a.get_width(), a.get_height())
        },
        drawSubTexture: function(a, b, c, d, e, h, f) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawSubTexture(a, b, c, d, e, h, f), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.root.image, a.rootX + d | 0, a.rootY + e | 0, h | 0, f | 0, b | 0, c | 0, h | 0, f | 0)
        },
        fillRect: function(a, b, c, d, e) {
            if (this._firstDraw) this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy",
                this.fillRect(a, b, c, d, e), this._canvasCtx.globalCompositeOperation = "source-over";
            else {
                for (a = (16777215 & a).toString(16); 6 > a.length;) a = "0" + B.string(a);
                this._canvasCtx.fillStyle = "#" + B.string(a);
                this._canvasCtx.fillRect(b | 0, c | 0, d | 0, e | 0)
            }
        },
        multiplyAlpha: function(a) {
            this._canvasCtx.globalAlpha *= a
        },
        setBlendMode: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "source-over";
                    break;
                case 1:
                    b = "lighter";
                    break;
                case 2:
                    b = "destination-in";
                    break;
                case 3:
                    b = "copy"
            }
            this._canvasCtx.globalCompositeOperation = b
        },
        applyScissor: function(a,
            b, c, d) {
            this._canvasCtx.beginPath();
            this._canvasCtx.rect(a | 0, b | 0, c | 0, d | 0);
            this._canvasCtx.clip()
        },
        willRender: function() {
            this._firstDraw = !0
        },
        didRender: function() {},
        onResize: function() {},
        __class__: of
    };
    var vc = function(a) {
        this.graphics = new of(a);
        this._hasGPU = new Ta(!0)
    };
    g["flambe.platform.html.CanvasRenderer"] = vc;
    vc.__name__ = ["flambe", "platform", "html", "CanvasRenderer"];
    vc.__interfaces__ = [ae];
    vc.prototype = {
        get_type: function() {
            return Ua.Canvas
        },
        createTextureFromImage: function(a) {
            a = new be(vc.CANVAS_TEXTURES ?
                L.createCanvas(a) : a);
            return a.createTexture(a.width, a.height)
        },
        getCompressedTextureFormats: function() {
            return []
        },
        createCompressedTexture: function() {
            return null
        },
        willRender: function() {
            this.graphics.willRender()
        },
        didRender: function() {
            this.graphics.didRender()
        },
        __class__: vc,
        __properties__: {
            get_type: "get_type"
        }
    };
    var pf = function(a, b, c) {
        Qb.call(this, a, b, c)
    };
    g["flambe.platform.html.CanvasTexture"] = pf;
    pf.__name__ = ["flambe", "platform", "html", "CanvasTexture"];
    pf.__super__ = Qb;
    pf.prototype = m(Qb.prototype, {
        __class__: pf
    });
    var be = function(a) {
        this._graphics = null;
        this._disposed = !1;
        this.image = a;
        this.width = a.width;
        this.height = a.height
    };
    g["flambe.platform.html.CanvasTextureRoot"] = be;
    be.__name__ = ["flambe", "platform", "html", "CanvasTextureRoot"];
    be.__interfaces__ = [mf];
    be.__super__ = ma;
    be.prototype = m(ma.prototype, {
        createTexture: function(a, b) {
            return new pf(this, a, b)
        },
        onDisposed: function() {
            this._graphics = this.image = null
        },
        __class__: be
    });
    var V = function(a, b) {
        Xc.call(this, a, b)
    };
    g["flambe.platform.html.HtmlAssetPackLoader"] = V;
    V.__name__ = ["flambe", "platform", "html", "HtmlAssetPackLoader"];
    V.detectImageFormats = function(a) {
        var b = [u.PNG, u.JPG, u.GIF],
            c = 2,
            d;
        d = window.document.createElement("img");
        d.onload = d.onerror = function() {
            1 == d.width && b.unshift(u.WEBP);
            --c;
            0 == c && a(b)
        };
        d.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
        var e;
        e = window.document.createElement("img");
        e.onload = e.onerror = function() {
            1 == e.width && b.unshift(u.JXR);
            --c;
            0 == c && a(b)
        };
        e.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA=="
    };
    V.detectAudioFormats = function() {
        var a;
        a = window.document.createElement("audio");
        if (null == a || null == E(a, a.canPlayType)) return [];
        var b = new tb("\\b(iPhone|iPod|iPad|Windows Phone)\\b", ""),
            c = window.navigator.userAgent;
        if (!U.get_supported() && b.match(c)) return [];
        for (var b = [{
                format: u.M4A,
                mimeType: "audio/mp4; codecs=mp4a"
            }, {
                format: u.MP3,
                mimeType: "audio/mpeg"
            }, {
                format: u.OPUS,
                mimeType: "audio/ogg; codecs=opus"
            }, {
                format: u.OGG,
                mimeType: "audio/ogg; codecs=vorbis"
            }, {
                format: u.WAV,
                mimeType: "audio/wav"
            }], c = [], d = 0; d <
            b.length;) {
            var e = b[d];
            ++d;
            var h = "";
            try {
                h = a.canPlayType(e.mimeType)
            } catch (f) {}
            "" != h && c.push(e.format)
        }
        return c
    };
    V.supportsBlob = function() {
        if (V._detectBlobSupport) {
            V._detectBlobSupport = !1;
            if ((new tb("\\bSilk\\b", "")).match(window.navigator.userAgent) || (new tb("\\bAndroid\\b", "")).match(window.navigator.userAgent) || null == window.Blob) return !1;
            var a = new XMLHttpRequest;
            a.open("GET", ".", !0);
            if ("" != a.responseType) return !1;
            a.responseType = "blob";
            if ("blob" != a.responseType) return !1;
            V._URL = L.loadExtension("URL").value
        }
        return null !=
            V._URL && null != V._URL.createObjectURL
    };
    V.__super__ = Xc;
    V.prototype = m(Xc.prototype, {
        loadEntry: function(a, b) {
            var c = this;
            switch (b.format[1]) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    var d;
                    d = window.document.createElement("img");
                    var e = new Zd;
                    e.addDisposingListener(d, "load", function() {
                        V.supportsBlob() && V._URL.revokeObjectURL(d.src);
                        var a = c._platform.getRenderer().createTextureFromImage(d);
                        null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
                    });
                    e.addDisposingListener(d, "error", function() {
                        c.handleError(b, "Failed to load image")
                    });
                    V.supportsBlob() ? this.download(a, b, "blob", function(a) {
                        d.src = V._URL.createObjectURL(a)
                    }) : (d.src = a, d.complete && null);
                    break;
                case 5:
                case 6:
                case 7:
                    this.download(a, b, "arraybuffer", function() {
                        var a = c._platform.getRenderer().createCompressedTexture(b.format, null);
                        null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
                    });
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    if (U.get_supported()) this.download(a, b, "arraybuffer", function(a) {
                        U.ctx.decodeAudioData(a, function(a) {
                            c.handleLoad(b, new U(a))
                        }, function() {
                            c.handleLoad(b,
                                qb.getInstance())
                        })
                    });
                    else {
                        var h;
                        h = window.document.createElement("audio");
                        h.preload = "auto";
                        var f = ++V._mediaRefCount;
                        null == V._mediaElements && (V._mediaElements = new Db);
                        V._mediaElements.set(f, h);
                        e = new Zd;
                        e.addDisposingListener(h, "canplaythrough", function() {
                            V._mediaElements.remove(f);
                            c.handleLoad(b, new vd(h))
                        });
                        e.addDisposingListener(h, "error", function() {
                            V._mediaElements.remove(f);
                            var a = h.error.code;
                            3 == a || 4 == a ? c.handleLoad(b, qb.getInstance()) : c.handleError(b, "Failed to load audio: " + h.error.code)
                        });
                        e.addListener(h,
                            "progress", function() {
                                if (0 < h.buffered.length && 0 < h.duration) {
                                    var a = h.buffered.end(0) / h.duration;
                                    c.handleProgress(b, a * b.bytes | 0)
                                }
                            });
                        h.src = a;
                        h.load()
                    }
                    break;
                case 13:
                    this.download(a, b, "text", function(a) {
                        c.handleLoad(b, new id(a))
                    })
            }
        },
        getAssetFormats: function(a) {
            var b = this;
            null == V._supportedFormats && (V._supportedFormats = new hf, V.detectImageFormats(function(a) {
                V._supportedFormats.set_result(b._platform.getRenderer().getCompressedTextureFormats().concat(a).concat(V.detectAudioFormats()).concat([u.Data]))
            }));
            V._supportedFormats.get(a)
        },
        download: function(a, b, c, d) {
            var e = this,
                h = null,
                f = null,
                i = 0,
                j = !1,
                g = function() {
                    j && (j = !1, window.clearInterval(i))
                },
                k = 3,
                l = function() {
                    --k;
                    return 0 <= k ? (f(), !0) : !1
                },
                f = function() {
                    g();
                    null != h && h.abort();
                    h = new XMLHttpRequest;
                    h.open("GET", a, !0);
                    h.responseType = c;
                    var f = 0;
                    h.onprogress = function(a) {
                        j || (j = !0, i = window.setInterval(function() {
                            4 != h.readyState && 5E3 < Date.now() - f && !l() && (g(), e.handleError(b, "Download stalled"))
                        }, 1E3));
                        f = Date.now();
                        e.handleProgress(b, a.loaded)
                    };
                    h.onerror = function() {
                        if (0 !=
                            h.status || !l()) g(), e.handleError(b, "HTTP error " + h.status)
                    };
                    h.onload = function() {
                        var a = h.response;
                        null == a && (a = h.responseText);
                        g();
                        d(a)
                    };
                    h.send()
                };
            f()
        },
        __class__: V
    });
    var qg = function() {};
    g["flambe.subsystem.ExternalSystem"] = qg;
    qg.__name__ = ["flambe", "subsystem", "ExternalSystem"];
    qg.prototype = {
        __class__: qg
    };
    var af = function() {};
    g["flambe.platform.html.HtmlExternal"] = af;
    af.__name__ = ["flambe", "platform", "html", "HtmlExternal"];
    af.__interfaces__ = [qg];
    af.prototype = {
        call: function(a, b) {
            null == b && (b = []);
            for (var c =
                window, d = c, e = 0, h = a.split("."); e < h.length;) {
                var f = h[e];
                ++e;
                c = d;
                d = Q.field(c, f)
            }
            return d.apply(c, b)
        },
        __class__: af
    };
    var We = function(a, b) {
        db.call(this, a);
        this._canvas = b
    };
    g["flambe.platform.html.HtmlMouse"] = We;
    We.__name__ = ["flambe", "platform", "html", "HtmlMouse"];
    We.__super__ = db;
    We.prototype = m(db.prototype, {
        __class__: We
    });
    var vd = function(a) {
        this._disposed = !1;
        this.audioElement = a
    };
    g["flambe.platform.html.HtmlSound"] = vd;
    vd.__name__ = ["flambe", "platform", "html", "HtmlSound"];
    vd.__interfaces__ = [xc];
    vd.__super__ =
        ma;
    vd.prototype = m(ma.prototype, {
        play: function(a) {
            null == a && (a = 1);
            return new wd(this, a, !1)
        },
        loop: function(a) {
            null == a && (a = 1);
            return new wd(this, a, !0)
        },
        onDisposed: function() {
            this.audioElement = null
        },
        __class__: vd
    });
    var wd = function(a, b, c) {
        var d = this;
        this._sound = a;
        this._tickableAdded = !1;
        this._clonedElement = window.document.createElement("audio");
        this._clonedElement.loop = c;
        this._clonedElement.src = a.audioElement.src;
        this.volume = new ga(b, function() {
            d.updateVolume()
        });
        this.updateVolume();
        this._complete = new Ta(!1);
        this.playAudio();
        z.hidden._value && this.set_paused(!0)
    };
    g["flambe.platform.html._HtmlSound.HtmlPlayback"] = wd;
    wd.__name__ = ["flambe", "platform", "html", "_HtmlSound", "HtmlPlayback"];
    wd.__interfaces__ = [nf, Kd];
    wd.prototype = {
        set_paused: function(a) {
            this._clonedElement.paused != a && (a ? this._clonedElement.pause() : this.playAudio());
            return a
        },
        update: function(a) {
            this.volume.update(a);
            this._complete.set__(this._clonedElement.ended);
            return this._complete._value || this._clonedElement.paused ? (this._tickableAdded = !1, this._volumeBinding.dispose(),
                this._hideBinding.dispose(), !0) : !1
        },
        dispose: function() {
            this.set_paused(!0);
            this._complete.set__(!0)
        },
        playAudio: function() {
            var a = this;
            this._clonedElement.loop && !Nb.instance.musicPlaying && (Nb.instance.musicPlaying = !0, this._clonedElement.play(), this._tickableAdded || (Nb.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._volumeBinding = z.volume.get_changed().connect(function() {
                a.updateVolume()
            }), this._hideBinding = z.hidden.get_changed().connect(function(b) {
                b ? (a._wasPaused = a._clonedElement.paused,
                    a.set_paused(!0)) : a.set_paused(a._wasPaused)
            })))
        },
        updateVolume: function() {
            this._clonedElement.volume = z.volume._value * this.volume._value
        },
        __class__: wd,
        __properties__: {
            set_paused: "set_paused"
        }
    };
    var rg = function() {};
    g["flambe.subsystem.StageSystem"] = rg;
    rg.__name__ = ["flambe", "subsystem", "StageSystem"];
    rg.prototype = {
        __class__: rg
    };
    var I = function(a) {
        this._debugInfo = "";
        var b = this;
        this._canvas = a;
        this.resize = new Ab;
        this.scaleFactor = 1;
        L.SHOULD_HIDE_MOBILE_BROWSER && (window.addEventListener("orientationchange",
            function() {
                L.callLater(E(b, b.hideMobileBrowser), 200)
            }, !1), this.hideMobileBrowser());
        window.addEventListener("resize", E(this, this.onWindowResize), !1);
        this.onWindowResize(null);
        this.orientation = new Ta(null);
        null != window.orientation && (window.addEventListener("orientationchange", E(this, this.onOrientationChange), !1), this.onOrientationChange(null));
        this.fullscreen = new Ta(!1);
        L.addVendorListener(window.document, "fullscreenchange", function() {
            b.updateFullscreen()
        }, !1);
        this.updateFullscreen()
    };
    g["flambe.platform.html.HtmlStage"] =
        I;
    I.__name__ = ["flambe", "platform", "html", "HtmlStage"];
    I.__interfaces__ = [rg];
    I.prototype = {
        get_width: function() {
            return this._canvas.width
        },
        get_height: function() {
            return this._canvas.height
        },
        get_debugInfo: function() {
            return this._debugInfo
        },
        lockOrientation: function(a) {
            var b = L.loadExtension("lockOrientation", window.screen).value;
            if (null != b) {
                var c;
                switch (a[1]) {
                    case 0:
                        c = "portrait";
                        break;
                    case 1:
                        c = "landscape"
                }
                b.apply(window.screen, [c]) || null
            }
        },
        onWindowResize: function() {
            this._canvas.parentElement.getBoundingClientRect();
            this.resizeCanvas(window.innerWidth, window.innerHeight)
        },
        resizeCanvas: function(a, b) {
            var c = I.BASE_HEIGHT / b;
            I.STAGE_WIDTH = c * a | 0;
            I.STAGE_WIDTH < I.BASE_WIDTH ? (I.STAGE_WIDTH = I.BASE_WIDTH, c = I.BASE_WIDTH / a, I.STAGE_HEIGHT = c * b | 0) : I.STAGE_HEIGHT = I.BASE_HEIGHT;
            I.STAGE_HEIGHT == I.BASE_HEIGHT && I.STAGE_WIDTH > I.MAX_WIDTH && (I.STAGE_WIDTH = I.MAX_WIDTH);
            this._screenheight = b | 0;
            this._screenwidth = a | 0;
            this.scaleFactor = Math.min(a / I.STAGE_WIDTH, b / I.STAGE_HEIGHT);
            var c = this.scaleFactor * I.STAGE_WIDTH,
                d = this.scaleFactor * I.STAGE_HEIGHT;
            this._canvas.width = I.STAGE_WIDTH;
            this._canvas.height = I.STAGE_HEIGHT;
            this._canvas.style.width = c + "px";
            this._canvas.style.height = d + "px";
            this.scaleFactor = 1 / this.scaleFactor;
            this.resize.emit();
            this._debugInfo = "Screen: w-" + this._screenwidth + " h-" + this._screenheight + ", stage: w-" + I.STAGE_WIDTH + " h-" + I.STAGE_HEIGHT + "\ncanvas: w- " + this._canvas.style.width + " h-" + this._canvas.style.height;
            return !0
        },
        hideMobileBrowser: function() {
            var a = this,
                b = window.document.documentElement.style;
            b.height = window.innerHeight + 100 +
                "px";
            b.width = window.innerWidth + "px";
            b.overflow = "visible";
            L.callLater(function() {
                L.hideMobileBrowser();
                L.callLater(function() {
                    b.height = window.innerHeight + "px";
                    a.onWindowResize(null)
                }, 100)
            })
        },
        onOrientationChange: function() {
            this.orientation.set__(L.orientation(window.orientation));
            this.onWindowResize(null)
        },
        updateFullscreen: function() {
            this.fullscreen.set__(!0 == L.loadFirstExtension(["fullscreen", "fullScreen", "isFullScreen"], window.document).value)
        },
        __class__: I,
        __properties__: {
            get_debugInfo: "get_debugInfo",
            get_height: "get_height",
            get_width: "get_width"
        }
    };
    var Ze = function(a) {
        this._storage = a
    };
    g["flambe.platform.html.HtmlStorage"] = Ze;
    Ze.__name__ = ["flambe", "platform", "html", "HtmlStorage"];
    Ze.__interfaces__ = [lf];
    Ze.prototype = {
        set: function(a, b) {
            var c;
            try {
                var d = new hc;
                d.useCache = !0;
                d.useEnumIndex = !1;
                d.serialize(b);
                c = d.toString()
            } catch (e) {
                return !1
            }
            try {
                this._storage.setItem("flambe:" + a, c)
            } catch (h) {
                return !1
            }
            return !0
        },
        get: function(a, b) {
            var c = null;
            try {
                c = this._storage.getItem("flambe:" + a)
            } catch (d) {
                null
            }
            if (null != c) try {
                return Va.run(c)
            } catch (e) {
                null
            }
            return b
        },
        __class__: Ze
    };
    var L = function() {};
    g["flambe.platform.html.HtmlUtil"] = L;
    L.__name__ = ["flambe", "platform", "html", "HtmlUtil"];
    L.callLater = function(a, b) {
        null == b && (b = 0);
        window.setTimeout(a, b)
    };
    L.hideMobileBrowser = function() {
        window.scrollTo(1, 0)
    };
    L.loadExtension = function(a, b) {
        null == b && (b = window);
        var c = Q.field(b, a);
        if (null != c) return {
            prefix: "",
            field: a,
            value: c
        };
        for (var c = a.charAt(0).toUpperCase() + P.substr(a, 1, null), d = 0, e = L.VENDOR_PREFIXES; d < e.length;) {
            var h = e[d];
            ++d;
            var f = h + c,
                i = Q.field(b, f);
            if (null != i) return {
                prefix: h,
                field: f,
                value: i
            }
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    L.loadFirstExtension = function(a, b) {
        for (var c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            d = L.loadExtension(d, b);
            if (null != d.field) return d
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    L.polyfill = function(a, b) {
        null == b && (b = window);
        var c = L.loadExtension(a, b).value;
        if (null == c) return !1;
        b[a] = c;
        return !0
    };
    L.addVendorListener = function(a, b, c, d) {
        for (var e = 0, h = L.VENDOR_PREFIXES; e < h.length;) {
            var f = h[e];
            ++e;
            a.addEventListener(f + b, c, d)
        }
        a.addEventListener(b, c, d)
    };
    L.orientation =
        function(a) {
            switch (a) {
                case -90:
                case 90:
                    return Kb.Landscape;
                default:
                    return Kb.Portrait
            }
    };
    L.createEmptyCanvas = function(a, b) {
        var c;
        c = window.document.createElement("canvas");
        c.width = a;
        c.height = b;
        return c
    };
    L.createCanvas = function(a) {
        var b = L.createEmptyCanvas(a.width, a.height),
            c = b.getContext("2d");
        c.save();
        c.globalCompositeOperation = "copy";
        c.drawImage(a, 0, 0);
        c.restore();
        return b
    };
    L.detectSlowDriver = function(a) {
        if (0 <= window.navigator.platform.indexOf("Win") && null != window.chrome) {
            for (var b = 0, a = a.getSupportedExtensions(); b <
                a.length;) {
                var c = a[b];
                ++b;
                if (0 <= c.indexOf("WEBGL_compressed_texture")) return !1
            }
            return !0
        }
        return !1
    };
    L.fixAndroidMath = function() {
        if (0 <= window.navigator.userAgent.indexOf("Linux; U; Android 4")) {
            var a = Math.sin,
                b = Math.cos;
            Math.sin = function(b) {
                return 0 == b ? 0 : a(b)
            };
            Math.cos = function(a) {
                return 0 == a ? 1 : b(a)
            }
        }
    };
    var U = function(a) {
        this._disposed = !1;
        this.buffer = a
    };
    g["flambe.platform.html.WebAudioSound"] = U;
    U.__name__ = ["flambe", "platform", "html", "WebAudioSound"];
    U.__interfaces__ = [xc];
    U.__properties__ = {
        get_supported: "get_supported"
    };
    U.get_supported = function() {
        if (U._detectSupport) {
            U._detectSupport = !1;
            var a = L.loadExtension("AudioContext").value;
            null != a && (U.ctx = new a, U.gain = U.createGain(), U.gain.connect(U.ctx.destination), z.volume.watch(function(a) {
                U.gain.gain.value = a
            }))
        }
        return null != U.ctx
    };
    U.createGain = function() {
        return null != U.ctx.createGain ? U.ctx.createGain() : U.ctx.createGainNode()
    };
    U.start = function(a, b) {
        null != a.start ? a.start(b) : a.noteOn(b)
    };
    U.__super__ = ma;
    U.prototype = m(ma.prototype, {
        play: function(a) {
            null == a && (a = 1);
            return new ce(this,
                a, !1)
        },
        loop: function(a) {
            null == a && (a = 1);
            return new ce(this, a, !0)
        },
        get_duration: function() {
            return this.buffer.duration
        },
        onDisposed: function() {
            this.buffer = null
        },
        __class__: U,
        __properties__: {
            get_duration: "get_duration"
        }
    });
    var ce = function(a, b, c) {
        var d = this;
        this._sound = a;
        this._head = U.gain;
        this._complete = new Ta(!1);
        this._sourceNode = U.ctx.createBufferSource();
        this._sourceNode.buffer = a.buffer;
        this._sourceNode.loop = c;
        this._sourceNode.onended = function() {
            d._complete.set__(!0)
        };
        U.start(this._sourceNode, 0);
        this.playAudio();
        this.volume = new ga(b, function(a) {
            d.setVolume(a)
        });
        1 != b && this.setVolume(b);
        z.hidden._value && this.set_paused(!0)
    };
    g["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = ce;
    ce.__name__ = ["flambe", "platform", "html", "_WebAudioSound", "WebAudioPlayback"];
    ce.__interfaces__ = [nf, Kd];
    ce.prototype = {
        set_paused: function(a) {
            a != 0 <= this._pausedAt && (a ? (this._sourceNode.disconnect(), this._pausedAt = this.get_position()) : this.playAudio());
            return a
        },
        get_position: function() {
            return this._complete._value ? this._sound.get_duration() :
                0 <= this._pausedAt ? this._pausedAt : (U.ctx.currentTime - this._startedAt) % this._sound.get_duration()
        },
        update: function(a) {
            this.volume.update(a);
            3 == this._sourceNode.playbackState && this._complete.set__(!0);
            return this._complete._value || 0 <= this._pausedAt ? (this._tickableAdded = !1, this._hideBinding.dispose(), !0) : !1
        },
        dispose: function() {
            this.set_paused(!0);
            this._complete.set__(!0)
        },
        setVolume: function(a) {
            null == this._gainNode && (this._gainNode = U.createGain(), this.insertNode(this._gainNode));
            this._gainNode.gain.value =
                a
        },
        insertNode: function(a) {
            0 <= this._pausedAt || (this._sourceNode.disconnect(), this._sourceNode.connect(a));
            a.connect(this._head);
            this._head = a
        },
        playAudio: function() {
            var a = this;
            this._sourceNode.connect(this._head);
            this._startedAt = U.ctx.currentTime;
            this._pausedAt = -1;
            this._tickableAdded || (Nb.instance.mainLoop.addTickable(this), this._tickableAdded = !0, this._hideBinding = z.hidden.get_changed().connect(function(b) {
                b ? (a._wasPaused = 0 <= a._pausedAt, a.set_paused(!0)) : a.set_paused(a._wasPaused)
            }))
        },
        __class__: ce,
        __properties__: {
            get_position: "get_position",
            set_paused: "set_paused"
        }
    };
    var sg = function(a) {
        this._quads = this._maxQuads = this._dataOffset = this._backbufferWidth = this._backbufferHeight = 0;
        this._pendingSetScissor = !1;
        this._lastBlendMode = this._lastRenderTarget = this._lastShader = this._lastTexture = this._lastScissor = this._currentBlendMode = this._currentShader = this._currentTexture = this._currentRenderTarget = null;
        this._gl = a;
        a.clearColor(0, 0, 0, 0);
        a.enable(3042);
        a.pixelStorei(37441, 1);
        this._vertexBuffer = a.createBuffer();
        a.bindBuffer(34962, this._vertexBuffer);
        this._quadIndexBuffer =
            a.createBuffer();
        a.bindBuffer(34963, this._quadIndexBuffer);
        this._drawTextureShader = new qf(a);
        this._drawPatternShader = new rf(a);
        this._fillRectShader = new sf(a);
        this.resize(16)
    };
    g["flambe.platform.html.WebGLBatcher"] = sg;
    sg.__name__ = ["flambe", "platform", "html", "WebGLBatcher"];
    sg.prototype = {
        resizeBackbuffer: function(a, b) {
            this._gl.viewport(0, 0, a, b);
            this._backbufferWidth = a;
            this._backbufferHeight = b
        },
        willRender: function() {},
        didRender: function() {
            this.flush()
        },
        bindTexture: function(a) {
            this.flush();
            this._currentTexture =
                this._lastTexture = null;
            this._gl.bindTexture(3553, a)
        },
        deleteTexture: function(a) {
            null != this._lastTexture && this._lastTexture.root == a && (this.flush(), this._currentTexture = this._lastTexture = null);
            this._gl.deleteTexture(a.nativeTexture)
        },
        deleteFramebuffer: function(a) {
            a == this._lastRenderTarget && (this.flush(), this._currentRenderTarget = this._lastRenderTarget = null);
            this._gl.deleteFramebuffer(a.framebuffer)
        },
        prepareDrawTexture: function(a, b, c, d) {
            d != this._lastTexture && (this.flush(), this._lastTexture = d);
            return this.prepareQuad(5,
                a, b, c, this._drawTextureShader)
        },
        prepareFillRect: function(a, b, c) {
            return this.prepareQuad(6, a, b, c, this._fillRectShader)
        },
        prepareQuad: function(a, b, c, d, e) {
            b != this._lastRenderTarget && (this.flush(), this._lastRenderTarget = b);
            c != this._lastBlendMode && (this.flush(), this._lastBlendMode = c);
            e != this._lastShader && (this.flush(), this._lastShader = e);
            if (null != d || null != this._lastScissor)
                if (null == d || null == this._lastScissor || !this._lastScissor.equals(d)) this.flush(), this._lastScissor = null != d ? d.clone(this._lastScissor) :
                    null, this._pendingSetScissor = !0;
            this._quads >= this._maxQuads && this.resize(2 * this._maxQuads);
            ++this._quads;
            b = this._dataOffset;
            this._dataOffset += 4 * a;
            return b
        },
        flush: function() {
            if (!(1 > this._quads)) {
                this._lastRenderTarget != this._currentRenderTarget && this.bindRenderTarget(this._lastRenderTarget);
                if (this._lastBlendMode != this._currentBlendMode) {
                    switch (this._lastBlendMode[1]) {
                        case 0:
                            this._gl.blendFunc(1, 771);
                            break;
                        case 1:
                            this._gl.blendFunc(1, 1);
                            break;
                        case 2:
                            this._gl.blendFunc(0, 770);
                            break;
                        case 3:
                            this._gl.blendFunc(1,
                                0)
                    }
                    this._currentBlendMode = this._lastBlendMode
                }
                this._pendingSetScissor && (null != this._lastScissor ? (this._gl.enable(3089), this._gl.scissor(this._lastScissor.x | 0, this._lastScissor.y | 0, this._lastScissor.width | 0, this._lastScissor.height | 0)) : this._gl.disable(3089), this._pendingSetScissor = !1);
                this._lastTexture != this._currentTexture && (this._gl.bindTexture(3553, this._lastTexture.root.nativeTexture), this._currentTexture = this._lastTexture);
                this._lastShader != this._currentShader && (this._lastShader.useProgram(),
                    this._lastShader.prepare(), this._currentShader = this._lastShader);
                if (this._lastShader == this._drawPatternShader) {
                    var a = this._lastTexture,
                        b = a.root;
                    this._drawPatternShader.setRegion(a.rootX / b.width, a.rootY / b.height, a._width / b.width, a._height / b.height)
                }
                this._gl.bufferData(34962, this.data.subarray(0, this._dataOffset), 35040);
                this._gl.drawElements(4, 6 * this._quads, 5123, 0);
                this._dataOffset = this._quads = 0
            }
        },
        resize: function(a) {
            this.flush();
            if (!(1024 < a)) {
                this._maxQuads = a;
                this.data = new Float32Array(24 * a);
                this._gl.bufferData(34962,
                    4 * this.data.length, 35040);
                for (var b = new Uint16Array(6 * a), c = 0; c < a;) {
                    var d = c++;
                    b[6 * d] = 4 * d;
                    b[6 * d + 1] = 4 * d + 1;
                    b[6 * d + 2] = 4 * d + 2;
                    b[6 * d + 3] = 4 * d + 2;
                    b[6 * d + 4] = 4 * d + 3;
                    b[6 * d + 5] = 4 * d
                }
                this._gl.bufferData(34963, b, 35044)
            }
        },
        bindRenderTarget: function(a) {
            null != a ? (this._gl.bindFramebuffer(36160, a.framebuffer), this._gl.viewport(0, 0, a.width, a.height)) : (this._gl.bindFramebuffer(36160, null), this._gl.viewport(0, 0, this._backbufferWidth, this._backbufferHeight));
            this._lastRenderTarget = this._currentRenderTarget = a
        },
        __class__: sg
    };
    var ic =
        function(a, b) {
            this._inverseProjection = this._stateList = null;
            null == ic._scratchQuadArray && (ic._scratchQuadArray = new Float32Array(8));
            this._batcher = a;
            this._renderTarget = b
        };
    g["flambe.platform.html.WebGLGraphics"] = ic;
    ic.__name__ = ["flambe", "platform", "html", "WebGLGraphics"];
    ic.__interfaces__ = [$d];
    ic.prototype = {
        save: function() {
            var a = this._stateList,
                b = this._stateList.next;
            null == b && (b = new tf, b.prev = a, a.next = b);
            a.matrix.clone(b.matrix);
            b.alpha = a.alpha;
            b.blendMode = a.blendMode;
            b.scissor = null != a.scissor ? a.scissor.clone(b.scissor) :
                null;
            this._stateList = b
        },
        transform: function(a, b, c, d, e, h) {
            var f = this._stateList;
            ic._scratchMatrix.set(a, b, c, d, e, h);
            Ob.multiply(f.matrix, ic._scratchMatrix, f.matrix)
        },
        restore: function() {
            this._stateList = this._stateList.prev
        },
        drawTexture: function(a, b, c) {
            this.drawSubTexture(a, b, c, 0, 0, a.get_width(), a.get_height())
        },
        drawSubTexture: function(a, b, c, d, e, h, f) {
            var i = this._stateList,
                j = a.root,
                b = this.transformQuad(b, c, h, f),
                c = j.width,
                j = j.height,
                d = (a.rootX + d) / c,
                e = (a.rootY + e) / j,
                h = d + h / c,
                f = e + f / j,
                c = i.alpha,
                a = this._batcher.prepareDrawTexture(this._renderTarget,
                    i.blendMode, i.scissor, a),
                i = this._batcher.data;
            i[a] = b[0];
            i[++a] = b[1];
            i[++a] = d;
            i[++a] = e;
            i[++a] = c;
            i[++a] = b[2];
            i[++a] = b[3];
            i[++a] = h;
            i[++a] = e;
            i[++a] = c;
            i[++a] = b[4];
            i[++a] = b[5];
            i[++a] = h;
            i[++a] = f;
            i[++a] = c;
            i[++a] = b[6];
            i[++a] = b[7];
            i[++a] = d;
            i[++a] = f;
            i[++a] = c
        },
        fillRect: function(a, b, c, d, e) {
            var h = this._stateList,
                b = this.transformQuad(b, c, d, e),
                c = (a & 16711680) / 16711680,
                d = (a & 65280) / 65280,
                a = (a & 255) / 255,
                e = h.alpha,
                h = this._batcher.prepareFillRect(this._renderTarget, h.blendMode, h.scissor),
                f = this._batcher.data;
            f[h] = b[0];
            f[++h] = b[1];
            f[++h] = c;
            f[++h] = d;
            f[++h] = a;
            f[++h] = e;
            f[++h] = b[2];
            f[++h] = b[3];
            f[++h] = c;
            f[++h] = d;
            f[++h] = a;
            f[++h] = e;
            f[++h] = b[4];
            f[++h] = b[5];
            f[++h] = c;
            f[++h] = d;
            f[++h] = a;
            f[++h] = e;
            f[++h] = b[6];
            f[++h] = b[7];
            f[++h] = c;
            f[++h] = d;
            f[++h] = a;
            f[++h] = e
        },
        multiplyAlpha: function(a) {
            this._stateList.alpha *= a
        },
        setBlendMode: function(a) {
            this._stateList.blendMode = a
        },
        applyScissor: function(a, b, c, d) {
            var e = this._stateList,
                h = ic._scratchQuadArray;
            h[0] = a;
            h[1] = b;
            h[2] = a + c;
            h[3] = b + d;
            e.matrix.transformArray(h, 4, h);
            this._inverseProjection.transformArray(h,
                4, h);
            a = h[0];
            b = h[1];
            c = h[2] - a;
            d = h[3] - b;
            0 > c && (a += c, c = -c);
            0 > d && (b += d, d = -d);
            e.applyScissor(a, b, c, d)
        },
        willRender: function() {
            this._batcher.willRender()
        },
        didRender: function() {
            this._batcher.didRender()
        },
        onResize: function(a, b) {
            this._stateList = new tf;
            var c;
            c = null != this._renderTarget ? -1 : 1;
            this._stateList.matrix.set(2 / a, 0, 0, -2 * c / b, -1, c);
            this._inverseProjection = new Ob;
            this._inverseProjection.set(2 / a, 0, 0, 2 / b, -1, -1);
            this._inverseProjection.invert()
        },
        transformQuad: function(a, b, c, d) {
            var c = a + c,
                d = b + d,
                e = ic._scratchQuadArray;
            e[0] = a;
            e[1] = b;
            e[2] = c;
            e[3] = b;
            e[4] = c;
            e[5] = d;
            e[6] = a;
            e[7] = d;
            this._stateList.matrix.transformArray(e, 8, e);
            return e
        },
        __class__: ic
    };
    var tf = function() {
        this.scissor = this.prev = this.next = null;
        this.matrix = new Ob;
        this.alpha = 1;
        this.blendMode = la.Normal
    };
    g["flambe.platform.html._WebGLGraphics.DrawingState"] = tf;
    tf.__name__ = ["flambe", "platform", "html", "_WebGLGraphics", "DrawingState"];
    tf.prototype = {
        applyScissor: function(a, b, c, d) {
            if (null != this.scissor) var e = sa.max(this.scissor.x, a),
                h = sa.max(this.scissor.y, b),
                c = sa.min(this.scissor.x +
                    this.scissor.width, a + c),
                d = sa.min(this.scissor.y + this.scissor.height, b + d),
                a = e,
                b = h,
                c = c - e,
                d = d - h;
            else this.scissor = new Lb;
            this.scissor.set(Math.round(a), Math.round(b), Math.round(c), Math.round(d))
        },
        __class__: tf
    };
    var bf = function(a, b) {
        var c = this;
        this._hasGPU = new Ta(!0);
        this.gl = b;
        b.canvas.addEventListener("webglcontextlost", function(a) {
            a.preventDefault();
            c._hasGPU.set__(!1)
        }, !1);
        b.canvas.addEventListener("webglcontextrestore", function() {
            c.init();
            c._hasGPU.set__(!0)
        }, !1);
        a.resize.connect(E(this, this.onResize));
        this.init()
    };
    g["flambe.platform.html.WebGLRenderer"] = bf;
    bf.__name__ = ["flambe", "platform", "html", "WebGLRenderer"];
    bf.__interfaces__ = [ae];
    bf.prototype = {
        get_type: function() {
            return Ua.WebGL
        },
        createTextureFromImage: function(a) {
            if (this.gl.isContextLost()) return null;
            var b = new Yc(this, a.width, a.height);
            b.uploadImageData(a);
            return b.createTexture(a.width, a.height)
        },
        getCompressedTextureFormats: function() {
            return []
        },
        createCompressedTexture: function() {
            this.gl.isContextLost();
            return null
        },
        willRender: function() {
            this.graphics.willRender()
        },
        didRender: function() {
            this.graphics.didRender()
        },
        onResize: function() {
            var a = this.gl.canvas.width,
                b = this.gl.canvas.height;
            this.batcher.resizeBackbuffer(a, b);
            this.graphics.onResize(a, b)
        },
        init: function() {
            this.batcher = new sg(this.gl);
            this.graphics = new ic(this.batcher, null);
            this.onResize()
        },
        __class__: bf,
        __properties__: {
            get_type: "get_type"
        }
    };
    var uf = function(a, b, c) {
        Qb.call(this, a, b, c)
    };
    g["flambe.platform.html.WebGLTexture"] = uf;
    uf.__name__ = ["flambe", "platform", "html", "WebGLTexture"];
    uf.__super__ = Qb;
    uf.prototype =
        m(Qb.prototype, {
            __class__: uf
        });
    var Yc = function(a, b, c) {
        this.framebuffer = this._graphics = null;
        this._disposed = !1;
        this._renderer = a;
        this.width = sa.max(2, pg.nextPowerOfTwo(b));
        this.height = sa.max(2, pg.nextPowerOfTwo(c));
        b = a.gl;
        this.nativeTexture = b.createTexture();
        a.batcher.bindTexture(this.nativeTexture);
        b.texParameteri(3553, 10242, 33071);
        b.texParameteri(3553, 10243, 33071);
        b.texParameteri(3553, 10240, 9729);
        b.texParameteri(3553, 10241, 9728)
    };
    g["flambe.platform.html.WebGLTextureRoot"] = Yc;
    Yc.__name__ = ["flambe", "platform",
        "html", "WebGLTextureRoot"
    ];
    Yc.__interfaces__ = [mf];
    Yc.drawBorder = function(a, b, c) {
        var d = a.getContext("2d");
        d.drawImage(a, b - 1, 0, 1, c, b, 0, 1, c);
        d.drawImage(a, 0, c - 1, b, 1, 0, c, b, 1)
    };
    Yc.__super__ = ma;
    Yc.prototype = m(ma.prototype, {
        createTexture: function(a, b) {
            return new uf(this, a, b)
        },
        uploadImageData: function(a) {
            if (this.width != a.width || this.height != a.height) {
                var b = L.createEmptyCanvas(this.width, this.height);
                b.getContext("2d").drawImage(a, 0, 0);
                Yc.drawBorder(b, a.width, a.height);
                a = b
            }
            this._renderer.batcher.bindTexture(this.nativeTexture);
            this._renderer.gl.texImage2D(3553, 0, 6408, 6408, 5121, a)
        },
        onDisposed: function() {
            var a = this._renderer.batcher;
            a.deleteTexture(this);
            null != this.framebuffer && a.deleteFramebuffer(this);
            this._graphics = this.framebuffer = this.nativeTexture = null
        },
        __class__: Yc
    });
    var mb = function(a, b, c) {
        c = "#ifdef GL_ES\nprecision mediump float;\n#endif\n" + c;
        this._gl = a;
        this._program = a.createProgram();
        a.attachShader(this._program, mb.createShader(a, 35633, b));
        a.attachShader(this._program, mb.createShader(a, 35632, c));
        a.linkProgram(this._program);
        a.useProgram(this._program)
    };
    g["flambe.platform.shader.ShaderGL"] = mb;
    mb.__name__ = ["flambe", "platform", "shader", "ShaderGL"];
    mb.createShader = function(a, b, c) {
        b = a.createShader(b);
        a.shaderSource(b, c);
        a.compileShader(b);
        return b
    };
    mb.prototype = {
        useProgram: function() {
            this._gl.useProgram(this._program)
        },
        prepare: function() {
            null
        },
        getAttribLocation: function(a) {
            return this._gl.getAttribLocation(this._program, a)
        },
        getUniformLocation: function(a) {
            return this._gl.getUniformLocation(this._program, a)
        },
        __class__: mb
    };
    var rf = function(a) {
        mb.call(this, a, "attribute highp vec2 a_pos;\nattribute mediump vec2 a_uv;\nattribute lowp float a_alpha;\nvarying mediump vec2 v_uv;\nvarying lowp float v_alpha;\nvoid main (void) {\nv_uv = a_uv;\nv_alpha = a_alpha;\ngl_Position = vec4(a_pos, 0, 1);\n}", "varying mediump vec2 v_uv;\nvarying lowp float v_alpha;\nuniform lowp sampler2D u_texture;\nuniform mediump vec4 u_region;\nvoid main (void) {\ngl_FragColor = texture2D(u_texture, u_region.xy + mod(v_uv, u_region.zw)) * v_alpha;\n}");
        this.a_pos = this.getAttribLocation("a_pos");
        this.a_uv = this.getAttribLocation("a_uv");
        this.a_alpha = this.getAttribLocation("a_alpha");
        this.u_texture = this.getUniformLocation("u_texture");
        this.u_region = this.getUniformLocation("u_region");
        this.setTexture(0)
    };
    g["flambe.platform.shader.DrawPatternGL"] = rf;
    rf.__name__ = ["flambe", "platform", "shader", "DrawPatternGL"];
    rf.__super__ = mb;
    rf.prototype = m(mb.prototype, {
        setTexture: function(a) {
            this._gl.uniform1i(this.u_texture, a)
        },
        setRegion: function(a, b, c, d) {
            this._gl.uniform4f(this.u_region,
                a, b, c, d)
        },
        prepare: function() {
            this._gl.enableVertexAttribArray(this.a_pos);
            this._gl.enableVertexAttribArray(this.a_uv);
            this._gl.enableVertexAttribArray(this.a_alpha);
            this._gl.vertexAttribPointer(this.a_pos, 2, 5126, !1, 20, 0);
            this._gl.vertexAttribPointer(this.a_uv, 2, 5126, !1, 20, 8);
            this._gl.vertexAttribPointer(this.a_alpha, 1, 5126, !1, 20, 16)
        },
        __class__: rf
    });
    var qf = function(a) {
        mb.call(this, a, "attribute highp vec2 a_pos;\nattribute mediump vec2 a_uv;\nattribute lowp float a_alpha;\nvarying mediump vec2 v_uv;\nvarying lowp float v_alpha;\nvoid main (void) {\nv_uv = a_uv;\nv_alpha = a_alpha;\ngl_Position = vec4(a_pos, 0, 1);\n}",
            "varying mediump vec2 v_uv;\nvarying lowp float v_alpha;\nuniform lowp sampler2D u_texture;\nvoid main (void) {\ngl_FragColor = texture2D(u_texture, v_uv) * v_alpha;\n}");
        this.a_pos = this.getAttribLocation("a_pos");
        this.a_uv = this.getAttribLocation("a_uv");
        this.a_alpha = this.getAttribLocation("a_alpha");
        this.u_texture = this.getUniformLocation("u_texture");
        this.setTexture(0)
    };
    g["flambe.platform.shader.DrawTextureGL"] = qf;
    qf.__name__ = ["flambe", "platform", "shader", "DrawTextureGL"];
    qf.__super__ = mb;
    qf.prototype =
        m(mb.prototype, {
            setTexture: function(a) {
                this._gl.uniform1i(this.u_texture, a)
            },
            prepare: function() {
                this._gl.enableVertexAttribArray(this.a_pos);
                this._gl.enableVertexAttribArray(this.a_uv);
                this._gl.enableVertexAttribArray(this.a_alpha);
                this._gl.vertexAttribPointer(this.a_pos, 2, 5126, !1, 20, 0);
                this._gl.vertexAttribPointer(this.a_uv, 2, 5126, !1, 20, 8);
                this._gl.vertexAttribPointer(this.a_alpha, 1, 5126, !1, 20, 16)
            },
            __class__: qf
        });
    var sf = function(a) {
        mb.call(this, a, "attribute highp vec2 a_pos;\nattribute lowp vec3 a_rgb;\nattribute lowp float a_alpha;\nvarying lowp vec4 v_color;\nvoid main (void) {\nv_color = vec4(a_rgb*a_alpha, a_alpha);\ngl_Position = vec4(a_pos, 0, 1);\n}",
            "varying lowp vec4 v_color;\nvoid main (void) {\ngl_FragColor = v_color;\n}");
        this.a_pos = this.getAttribLocation("a_pos");
        this.a_rgb = this.getAttribLocation("a_rgb");
        this.a_alpha = this.getAttribLocation("a_alpha")
    };
    g["flambe.platform.shader.FillRectGL"] = sf;
    sf.__name__ = ["flambe", "platform", "shader", "FillRectGL"];
    sf.__super__ = mb;
    sf.prototype = m(mb.prototype, {
        prepare: function() {
            this._gl.enableVertexAttribArray(this.a_pos);
            this._gl.enableVertexAttribArray(this.a_rgb);
            this._gl.enableVertexAttribArray(this.a_alpha);
            this._gl.vertexAttribPointer(this.a_pos, 2, 5126, !1, 24, 0);
            this._gl.vertexAttribPointer(this.a_rgb, 3, 5126, !1, 24, 8);
            this._gl.vertexAttribPointer(this.a_alpha, 1, 5126, !1, 24, 20)
        },
        __class__: sf
    });
    var ye = function() {
        this._width = this._height = -1;
        this._transitor = null;
        this.scenes = [];
        this.occludedScenes = [];
        this._root = new q
    };
    g["flambe.scene.Director"] = ye;
    ye.__name__ = ["flambe", "scene", "Director"];
    ye.__super__ = D;
    ye.prototype = m(D.prototype, {
        get_name: function() {
            return "Director_16"
        },
        pushScene: function(a, b) {
            var c = this;
            this.completeTransition();
            var d = this.get_topScene();
            null != d ? this.playTransition(d, a, b, function() {
                c.hide(d)
            }) : (this.add(a), this.invalidateVisibility())
        },
        unwindToScene: function(a, b) {
            var c = this;
            this.completeTransition();
            var d = this.get_topScene();
            if (null != d) {
                if (d != a) {
                    for (this.scenes.pop(); 0 < this.scenes.length && this.scenes[this.scenes.length - 1] != a;) this.scenes.pop().dispose();
                    this.playTransition(d, a, b, function() {
                        c.hideAndDispose(d)
                    })
                }
            } else this.pushScene(a, b)
        },
        onAdded: function() {
            this.owner.addChild(this._root)
        },
        onRemoved: function() {
            this.completeTransition();
            for (var a = 0, b = this.scenes; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispose()
            }
            this.scenes = [];
            this.occludedScenes = [];
            this._root.dispose()
        },
        onUpdate: function(a) {
            null != this._transitor && this._transitor.update(a) && this.completeTransition()
        },
        get_topScene: function() {
            var a = this.scenes.length;
            return 0 < a ? this.scenes[a - 1] : null
        },
        add: function(a) {
            var b = this.get_topScene();
            null != b && this._root.removeChild(b);
            P.remove(this.scenes, a);
            this.scenes.push(a);
            this._root.addChild(a)
        },
        hide: function(a) {
            a =
                a._compMap.Scene_0;
            null != a && a.hidden.emit()
        },
        hideAndDispose: function(a) {
            this.hide(a);
            a.dispose()
        },
        show: function(a) {
            a = a._compMap.Scene_0;
            null != a && a.shown.emit()
        },
        invalidateVisibility: function() {
            for (var a = this.scenes.length; 0 < a;) {
                var b = this.scenes[--a]._compMap.Scene_0;
                if (null == b || b.opaque) break
            }
            this.occludedScenes = 0 < this.scenes.length ? this.scenes.slice(a, this.scenes.length - 1) : [];
            a = this.get_topScene();
            null != a && this.show(a)
        },
        completeTransition: function() {
            null != this._transitor && (this._transitor.complete(),
                this._transitor = null, this.invalidateVisibility())
        },
        playTransition: function(a, b, c, d) {
            this.completeTransition();
            this.add(b);
            null != c ? (this.occludedScenes.push(a), this._transitor = new tg(a, b, c, d), this._transitor.init(this)) : (d(), this.invalidateVisibility())
        },
        get_width: function() {
            return 0 > this._width ? z._platform.getStage().get_width() : this._width
        },
        get_height: function() {
            return 0 > this._height ? z._platform.getStage().get_height() : this._height
        },
        __class__: ye,
        __properties__: m(D.prototype.__properties__, {
            get_height: "get_height",
            get_width: "get_width",
            get_topScene: "get_topScene"
        })
    });
    var tg = function(a, b, c, d) {
        this._from = a;
        this._to = b;
        this._transition = c;
        this._onComplete = d
    };
    g["flambe.scene._Director.Transitor"] = tg;
    tg.__name__ = ["flambe", "scene", "_Director", "Transitor"];
    tg.prototype = {
        init: function(a) {
            this._transition.init(a, this._from, this._to)
        },
        update: function(a) {
            return this._transition.update(a)
        },
        complete: function() {
            this._transition.complete();
            this._onComplete()
        },
        __class__: tg
    };
    var Ld = function() {};
    g["flambe.scene.Transition"] = Ld;
    Ld.__name__ = ["flambe", "scene", "Transition"];
    Ld.prototype = {
        init: function(a, b, c) {
            this._director = a;
            this._from = b;
            this._to = c
        },
        update: function() {
            return !0
        },
        complete: function() {},
        __class__: Ld
    };
    var yc = function(a, b) {
        this._duration = a;
        this._ease = null != b ? b : X.linear
    };
    g["flambe.scene.TweenTransition"] = yc;
    yc.__name__ = ["flambe", "scene", "TweenTransition"];
    yc.__super__ = Ld;
    yc.prototype = m(Ld.prototype, {
        init: function(a, b, c) {
            Ld.prototype.init.call(this, a, b, c);
            this._elapsed = 0
        },
        update: function(a) {
            this._elapsed += a;
            return this._elapsed >=
                this._duration
        },
        interp: function(a, b) {
            return a + (b - a) * this._ease(this._elapsed / this._duration)
        },
        __class__: yc
    });
    var Cd = function(a, b) {
        this._direction = 2;
        yc.call(this, a, b)
    };
    g["flambe.scene.SlideTransition"] = Cd;
    Cd.__name__ = ["flambe", "scene", "SlideTransition"];
    Cd.__super__ = yc;
    Cd.prototype = m(yc.prototype, {
        init: function(a, b, c) {
            yc.prototype.init.call(this, a, b, c);
            switch (this._direction) {
                case 0:
                    this._x = 0;
                    this._y = -this._director.get_height();
                    break;
                case 1:
                    this._x = 0;
                    this._y = this._director.get_height();
                    break;
                case 2:
                    this._x = -this._director.get_width();
                    this._y = 0;
                    break;
                case 3:
                    this._x = this._director.get_width(), this._y = 0
            }
            a = this._from._compMap.Sprite_15;
            null == a && this._from.add(a = new v);
            a.setXY(0, 0);
            a = this._to._compMap.Sprite_15;
            null == a && this._to.add(a = new v);
            a.setXY(-this._x, -this._y)
        },
        update: function(a) {
            a = yc.prototype.update.call(this, a);
            this._from._compMap.Sprite_15.setXY(this.interp(0, this._x), this.interp(0, this._y));
            this._to._compMap.Sprite_15.setXY(this.interp(-this._x, 0), this.interp(-this._y, 0));
            return a
        },
        complete: function() {
            this._from._compMap.Sprite_15.setXY(0,
                0);
            this._to._compMap.Sprite_15.setXY(0, 0)
        },
        __class__: Cd
    });
    var zc = function() {};
    g["flambe.script.Action"] = zc;
    zc.__name__ = ["flambe", "script", "Action"];
    zc.prototype = {
        __class__: zc
    };
    var Ue = function(a, b, c, d) {
        this._value = a;
        this._by = b;
        this._seconds = c;
        this._easing = d
    };
    g["flambe.script.AnimateBy"] = Ue;
    Ue.__name__ = ["flambe", "script", "AnimateBy"];
    Ue.__interfaces__ = [zc];
    Ue.prototype = {
        update: function(a) {
            null == this._tween && (this._tween = new wc(this._value._value, this._value._value + this._by, this._seconds, this._easing),
                this._value.set_behavior(this._tween), this._value.update(a));
            if (this._value._behavior != this._tween) {
                var b = this._tween.elapsed - this._seconds;
                this._tween = null;
                return 0 < b ? a - b : 0
            }
            return -1
        },
        __class__: Ue
    };
    var vf = function(a, b, c, d) {
        this._value = a;
        this._to = b;
        this._seconds = c;
        this._easing = d
    };
    g["flambe.script.AnimateTo"] = vf;
    vf.__name__ = ["flambe", "script", "AnimateTo"];
    vf.__interfaces__ = [zc];
    vf.prototype = {
        update: function(a) {
            null == this._tween && (this._tween = new wc(this._value._value, this._to, this._seconds, this._easing),
                this._value.set_behavior(this._tween), this._value.update(a));
            if (this._value._behavior != this._tween) {
                var b = this._tween.elapsed - this._seconds;
                this._tween = null;
                return 0 < b ? a - b : 0
            }
            return -1
        },
        __class__: vf
    };
    var Gd = function(a) {
        this._fn = a
    };
    g["flambe.script.CallFunction"] = Gd;
    Gd.__name__ = ["flambe", "script", "CallFunction"];
    Gd.__interfaces__ = [zc];
    Gd.prototype = {
        update: function() {
            this._fn();
            return 0
        },
        __class__: Gd
    };
    var dd = function(a) {
        this._duration = a;
        this._elapsed = 0
    };
    g["flambe.script.Delay"] = dd;
    dd.__name__ = ["flambe",
        "script", "Delay"
    ];
    dd.__interfaces__ = [zc];
    dd.prototype = {
        update: function(a) {
            this._elapsed += a;
            if (this._elapsed >= this._duration) {
                var b = this._elapsed - this._duration;
                this._elapsed = 0;
                return a - b
            }
            return -1
        },
        __class__: dd
    };
    var wf = function(a) {
        this._completedActions = [];
        this._runningActions = null != a ? a.slice() : []
    };
    g["flambe.script.Parallel"] = wf;
    wf.__name__ = ["flambe", "script", "Parallel"];
    wf.__interfaces__ = [zc];
    wf.prototype = {
        update: function(a, b) {
            for (var c = !0, d = 0, e = 0, h = this._runningActions.length; e < h;) {
                var f = e++,
                    i = this._runningActions[f];
                if (null != i) {
                    var j = i.update(a, b);
                    0 <= j ? (this._runningActions[f] = null, this._completedActions.push(i), j > d && (d = j)) : c = !1
                }
            }
            return c ? (this._runningActions = this._completedActions, this._completedActions = [], d) : -1
        },
        __class__: wf
    };
    var cd = function() {
        this.stopAll()
    };
    g["flambe.script.Script"] = cd;
    cd.__name__ = ["flambe", "script", "Script"];
    cd.__super__ = D;
    cd.prototype = m(D.prototype, {
        get_name: function() {
            return "Script_14"
        },
        run: function(a) {
            a = new xf(a);
            this._handles.push(a);
            return a
        },
        stopAll: function() {
            this._handles = []
        },
        onUpdate: function(a) {
            for (var b =
                0; b < this._handles.length;) {
                var c = this._handles[b];
                c.removed || 0 <= c.action.update(a, this.owner) ? this._handles.splice(b, 1) : ++b
            }
        },
        __class__: cd
    });
    var xf = function(a) {
        this.removed = !1;
        this.action = a
    };
    g["flambe.script._Script.Handle"] = xf;
    xf.__name__ = ["flambe", "script", "_Script", "Handle"];
    xf.__interfaces__ = [Bb];
    xf.prototype = {
        dispose: function() {
            this.removed = !0;
            this.action = null
        },
        __class__: xf
    };
    var Fd = function(a) {
        this._idx = 0;
        this._runningActions = null != a ? a.slice() : []
    };
    g["flambe.script.Sequence"] = Fd;
    Fd.__name__ = ["flambe",
        "script", "Sequence"
    ];
    Fd.__interfaces__ = [zc];
    Fd.prototype = {
        add: function(a) {
            this._runningActions.push(a)
        },
        update: function(a, b) {
            for (var c = 0;;) {
                var d = this._runningActions[this._idx];
                if (null != d)
                    if (d = d.update(a - c, b), 0 <= d) c += d;
                    else return -1;
                    ++this._idx;
                if (this._idx >= this._runningActions.length) {
                    this._idx = 0;
                    break
                } else if (c > a) return -1
            }
            return c
        },
        __class__: Fd
    };
    var Ua = g["flambe.subsystem.RendererType"] = {
        __ename__: ["flambe", "subsystem", "RendererType"],
        __constructs__: ["Stage3D", "WebGL", "Canvas"]
    };
    Ua.Stage3D = ["Stage3D",
        0
    ];
    Ua.Stage3D.toString = A;
    Ua.Stage3D.__enum__ = Ua;
    Ua.WebGL = ["WebGL", 1];
    Ua.WebGL.toString = A;
    Ua.WebGL.__enum__ = Ua;
    Ua.Canvas = ["Canvas", 2];
    Ua.Canvas.toString = A;
    Ua.Canvas.__enum__ = Ua;
    var xd = function() {};
    g["flambe.swf.Symbol"] = xd;
    xd.__name__ = ["flambe", "swf", "Symbol"];
    xd.prototype = {
        __class__: xd
    };
    var yf = function(a, b) {
        this._name = a.symbol;
        var c = a.rect;
        this.texture = b.subTexture(c[0], c[1], c[2], c[3]);
        c = a.origin;
        null != c ? (this.anchorX = c[0], this.anchorY = c[1]) : this.anchorY = this.anchorX = 0
    };
    g["flambe.swf.BitmapSymbol"] =
        yf;
    yf.__name__ = ["flambe", "swf", "BitmapSymbol"];
    yf.__interfaces__ = [xd];
    yf.prototype = {
        createSprite: function() {
            var a = new ba(this.texture);
            a.setAnchor(this.anchorX, this.anchorY);
            return a
        },
        __class__: yf
    };
    var bd = function(a, b) {
        this.name = a;
        var c = 1 / b.length;
        this.frames = [];
        for (var d = 0; d < b.length;) {
            var e = b[d];
            ++d;
            this.frames.push(new ug(e, c))
        }
    };
    g["flambe.swf.Flipbook"] = bd;
    bd.__name__ = ["flambe", "swf", "Flipbook"];
    bd.prototype = {
        setDuration: function(a) {
            for (var a = a / this.frames.length, b = 0, c = this.frames; b < c.length;) {
                var d =
                    c[b];
                ++b;
                d.duration = a
            }
            return this
        },
        setAnchor: function(a, b) {
            for (var c = 0, d = this.frames; c < d.length;) {
                var e = d[c];
                ++c;
                e.anchorX = a;
                e.anchorY = b
            }
            return this
        },
        __class__: bd
    };
    var ug = function(a, b) {
        this.label = null;
        this.anchorX = this.anchorY = 0;
        this.texture = a;
        this.duration = b
    };
    g["flambe.swf.FlipbookFrame"] = ug;
    ug.__name__ = ["flambe", "swf", "FlipbookFrame"];
    ug.prototype = {
        toSymbol: function() {
            return new zf(this)
        },
        __class__: ug
    };
    var zf = function(a) {
        this._texture = a.texture;
        this._anchorX = a.anchorX;
        this._anchorY = a.anchorY
    };
    g["flambe.swf._Flipbook.FrameSymbol"] =
        zf;
    zf.__name__ = ["flambe", "swf", "_Flipbook", "FrameSymbol"];
    zf.__interfaces__ = [xd];
    zf.prototype = {
        createSprite: function() {
            var a = new ba(this._texture);
            a.setAnchor(this._anchorX, this._anchorY);
            return a
        },
        __class__: zf
    };
    var Rc = function(a, b) {
        this._symbols = new ta;
        var c = JSON.parse(a.getFile(b + "/library.json").toString());
        this.frameRate = c.frameRate;
        for (var d = [], e = 0, h = c.movies; e < h.length;) {
            var f = h[e];
            ++e;
            f = new de(this, f);
            d.push(f);
            this._symbols.set(f._name, f)
        }
        c = c.textureGroups;
        (1 != c[0].scaleFactor || 1 < c.length) &&
            null;
        c = c[0].atlases;
        for (e = 0; e < c.length;) {
            var i = c[e];
            ++e;
            h = a.getTexture(b + "/" + pa.removeFileExtension(i.file));
            f = 0;
            for (i = i.textures; f < i.length;) {
                var j = i[f];
                ++f;
                j = new yf(j, h);
                this._symbols.set(j._name, j)
            }
        }
        for (c = 0; c < d.length;) {
            h = d[c];
            ++c;
            e = 0;
            for (h = h.layers; e < h.length;) {
                f = h[e];
                ++e;
                f = f.keyframes;
                i = f.length;
                for (j = 0; j < i;) {
                    var g = j++,
                        k = f[g];
                    if (null != k.symbolName) {
                        var l = this._symbols.get(k.symbolName);
                        k.symbol = l
                    }
                    if (k.tweened && 1 == k.duration && g + 1 < i && (g = f[g + 1], !g.visible || null == g.symbolName)) k.visible = !1
                }
            }
        }
    };
    g["flambe.swf.Library"] =
        Rc;
    Rc.__name__ = ["flambe", "swf", "Library"];
    Rc.fromFlipbooks = function(a) {
        var b = oa.createEmptyInstance(Rc);
        b._symbols = new ta;
        b.frameRate = 60;
        for (var c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            for (var e = [], h = 0, f = d.frames; h < f.length;) {
                var i = f[h];
                ++h;
                e.push({
                    duration: i.duration * b.frameRate,
                    label: i.label,
                    pivot: [i.anchorX, i.anchorY],
                    ref: ""
                })
            }
            e = new de(b, {
                id: d.name,
                layers: [{
                    name: "flipbook",
                    flipbook: !0,
                    keyframes: e
                }]
            });
            b._symbols.set(d.name, e);
            e = e.layers[0].keyframes;
            h = 0;
            for (f = d.frames.length; h < f;) i = h++, e[i].setSymbol(d.frames[i].toSymbol())
        }
        return b
    };
    Rc.prototype = {
        createSprite: function(a, b) {
            null == b && (b = !0);
            var c = this._symbols.get(a);
            if (null == c) {
                if (b) throw pa.withFields("Missing symbol", ["name", a]);
                return null
            }
            return c.createSprite()
        },
        __class__: Rc
    };
    var Id = function(a) {
        this._oneshotSprite = this._loopingSprite = this._looped = null;
        this._lib = a;
        this._root = new q;
        this.movie = new Ta(null);
        this.setCache(!0)
    };
    g["flambe.swf.MoviePlayer"] = Id;
    Id.__name__ = ["flambe", "swf", "MoviePlayer"];
    Id.__super__ = D;
    Id.prototype = m(D.prototype, {
        get_name: function() {
            return "MoviePlayer_10"
        },
        setCache: function(a) {
            this._cache = a ? new ta : null;
            return this
        },
        play: function(a, b) {
            null == b && (b = !0);
            if (b || null == this._oneshotSprite || this._oneshotSprite.symbol._name != a) this._oneshotSprite = this.playFromCache(a);
            return this
        },
        loop: function(a, b) {
            null == b && (b = !0);
            if (b || null == this._loopingSprite || this._loopingSprite.symbol._name != a) this._oneshotSprite = null, this._loopingSprite = this.playFromCache(a);
            return this
        },
        onAdded: function() {
            this.owner.addChild(this._root)
        },
        onRemoved: function() {
            this._root.dispose();
            this._oneshotSprite =
                this._loopingSprite = null;
            this.movie.set__(null)
        },
        onUpdate: function(a) {
            null != this._oneshotSprite && this._oneshotSprite._position + a > this._oneshotSprite.symbol.duration && (this._oneshotSprite = null, this.setCurrent(this._loopingSprite), this.get_looped().emit())
        },
        playFromCache: function(a) {
            var b;
            null != this._cache ? (b = this._cache.get(a), null != b ? b.set_position(0) : (b = this.createMovie(a), this._cache.set(a, b))) : b = this.createMovie(a);
            return this.setCurrent(b)
        },
        createMovie: function(a) {
            a = this._lib.createSprite(a, !0);
            null != this._decorator && this._decorator(a);
            return a
        },
        setCurrent: function(a) {
            this._root.add(a);
            return this.movie.set__(a)
        },
        get_looped: function() {
            null == this._looped && (this._looped = new Ab);
            return this._looped
        },
        __class__: Id,
        __properties__: m(D.prototype.__properties__, {
            get_looped: "get_looped"
        })
    });
    var yd = function(a) {
        this._looped = null;
        v.call(this);
        this.symbol = a;
        this.speed = new ga(1);
        this._animators = Array(a.layers.length);
        for (var b = 0, c = this._animators.length; b < c;) {
            var d = b++;
            this._animators[d] = new vg(a.layers[d])
        }
        this._position =
            this._frame = 0;
        this["goto"](1)
    };
    g["flambe.swf.MovieSprite"] = yd;
    yd.__name__ = ["flambe", "swf", "MovieSprite"];
    yd.__super__ = v;
    yd.prototype = m(v.prototype, {
        onAdded: function() {
            v.prototype.onAdded.call(this);
            for (var a = 0, b = this._animators; a < b.length;) {
                var c = b[a];
                ++a;
                this.owner.addChild(c.content)
            }
        },
        onRemoved: function() {
            v.prototype.onRemoved.call(this);
            for (var a = 0, b = this._animators; a < b.length;) {
                var c = b[a];
                ++a;
                this.owner.removeChild(c.content)
            }
        },
        onUpdate: function(a) {
            v.prototype.onUpdate.call(this, a);
            this.speed.update(a);
            switch (this._flags & 48) {
                case 0:
                    this._position += this.speed._value * a;
                    this._position > this.symbol.duration && (this._position %= this.symbol.duration, null != this._looped && this._looped.emit());
                    break;
                case 32:
                    this._flags &= -33
            }
            this["goto"](this._position * this.symbol.frameRate)
        },
        "goto": function(a) {
            if (this._frame != a) {
                if (a < this._frame)
                    for (var b = 0, c = this._animators; b < c.length;) {
                        var d = c[b];
                        ++b;
                        d.needsKeyframeUpdate = !0;
                        d.keyframeIdx = 0
                    }
                b = 0;
                for (c = this._animators; b < c.length;) d = c[b], ++b, d.composeFrame(a);
                this._frame = a
            }
        },
        set_position: function(a) {
            return this._position = sa.clamp(a, 0, this.symbol.duration)
        },
        set_paused: function(a) {
            this._flags = fg.set(this._flags, 16, a);
            return a
        },
        get_looped: function() {
            null == this._looped && (this._looped = new Ab);
            return this._looped
        },
        rewind: function() {
            this._position = 0;
            this._flags |= 32
        },
        __class__: yd,
        __properties__: m(v.prototype.__properties__, {
            get_looped: "get_looped",
            set_paused: "set_paused",
            set_position: "set_position"
        })
    });
    var vg = function(a) {
        this.keyframeIdx = 0;
        this.needsKeyframeUpdate = !1;
        this.layer =
            a;
        this.content = new q;
        if (a.empty) this._sprites = null;
        else {
            this._sprites = Array(a.keyframes.length);
            for (var b = 0, c = this._sprites.length; b < c;) {
                var d = b++,
                    e = a.keyframes[d];
                this._sprites[d] = 0 < d && a.keyframes[d - 1].symbol == e.symbol ? this._sprites[d - 1] : null == e.symbol ? new v : e.symbol.createSprite()
            }
            this.content.add(this._sprites[0])
        }
    };
    g["flambe.swf._MovieSprite.LayerAnimator"] = vg;
    vg.__name__ = ["flambe", "swf", "_MovieSprite", "LayerAnimator"];
    vg.prototype = {
        composeFrame: function(a) {
            if (null != this._sprites) {
                var b = this.layer.keyframes,
                    c = b.length - 1;
                if (a > this.layer.frames) this.content._compMap.Sprite_15.set_visible(!1), this.keyframeIdx = c, this.needsKeyframeUpdate = !0;
                else {
                    for (; this.keyframeIdx < c && b[this.keyframeIdx + 1].index <= a;)++this.keyframeIdx, this.needsKeyframeUpdate = !0;
                    var d;
                    this.needsKeyframeUpdate ? (this.needsKeyframeUpdate = !1, d = this._sprites[this.keyframeIdx], d != this.content._compMap.Sprite_15 && (oa.getClass(d) == yd && d.rewind(), this.content.add(d))) : d = this.content._compMap.Sprite_15;
                    var e = b[this.keyframeIdx],
                        h = e.visible && null !=
                        e.symbol;
                    d.set_visible(h);
                    if (h) {
                        var h = e.x,
                            f = e.y,
                            i = e.scaleX,
                            j = e.scaleY,
                            g = e.skewX,
                            k = e.skewY,
                            l = e.alpha;
                        if (e.tweened && this.keyframeIdx < c) {
                            a = (a - e.index) / e.duration;
                            c = e.ease;
                            if (0 != c) {
                                var x;
                                0 > c ? (x = 1 - a, x = 1 - x * x, c = -c) : x = a * a;
                                a = c * x + (1 - c) * a
                            }
                            b = b[this.keyframeIdx + 1];
                            h += (b.x - h) * a;
                            f += (b.y - f) * a;
                            i += (b.scaleX - i) * a;
                            j += (b.scaleY - j) * a;
                            g += (b.skewX - g) * a;
                            k += (b.skewY - k) * a;
                            l += (b.alpha - l) * a
                        }
                        b = d.getLocalMatrix();
                        a = Math.sin(g);
                        g = Math.cos(g);
                        c = Math.sin(k);
                        k = Math.cos(k);
                        b.set(k * i, c * i, -a * j, g * j, h, f);
                        b.translate(-e.pivotX, -e.pivotY);
                        d.alpha.set__(l)
                    }
                }
            }
        },
        __class__: vg
    };
    var de = function(a, b) {
        this._name = b.id;
        this.frameRate = a.frameRate;
        this.frames = 0;
        this.layers = Array(b.layers.length);
        for (var c = 0, d = this.layers.length; c < d;) {
            var e = c++,
                h = new wg(b.layers[e]);
            this.frames = Math.max(h.frames, this.frames);
            this.layers[e] = h
        }
        this.duration = this.frames / this.frameRate
    };
    g["flambe.swf.MovieSymbol"] = de;
    de.__name__ = ["flambe", "swf", "MovieSymbol"];
    de.__interfaces__ = [xd];
    de.prototype = {
        createSprite: function() {
            return new yd(this)
        },
        __class__: de
    };
    var wg = function(a) {
        this.empty = !0;
        this.name = a.name;
        var b = null;
        this.keyframes = Array(a.keyframes.length);
        for (var c = 0, d = this.keyframes.length; c < d;) {
            var e = c++,
                b = new xg(a.keyframes[e], b);
            this.keyframes[e] = b;
            this.empty = this.empty && null == b.symbolName
        }
        this.frames = null != b ? b.index + b.duration : 0
    };
    g["flambe.swf.MovieLayer"] = wg;
    wg.__name__ = ["flambe", "swf", "MovieLayer"];
    wg.prototype = {
        __class__: wg
    };
    var xg = function(a, b) {
        this.ease = 0;
        this.visible = this.tweened = !0;
        this.alpha = 1;
        this.skewX = this.skewY = this.pivotX = this.pivotY = 0;
        this.scaleX = this.scaleY =
            1;
        this.x = this.y = 0;
        this.symbol = null;
        this.index = null != b ? b.index + b.duration : 0;
        this.duration = a.duration;
        this.label = a.label;
        this.symbolName = a.ref;
        var c = a.loc;
        null != c && (this.x = c[0], this.y = c[1]);
        c = a.scale;
        null != c && (this.scaleX = c[0], this.scaleY = c[1]);
        c = a.skew;
        null != c && (this.skewX = c[0], this.skewY = c[1]);
        c = a.pivot;
        null != c && (this.pivotX = c[0], this.pivotY = c[1]);
        null != a.alpha && (this.alpha = a.alpha);
        null != a.visible && (this.visible = a.visible);
        null != a.tweened && (this.tweened = a.tweened);
        null != a.ease && (this.ease = a.ease)
    };
    g["flambe.swf.MovieKeyframe"] = xg;
    xg.__name__ = ["flambe", "swf", "MovieKeyframe"];
    xg.prototype = {
        setSymbol: function(a) {
            this.symbol = a
        },
        __class__: xg
    };
    var lh = function() {};
    g["flambe.util.Assert"] = lh;
    lh.__name__ = ["flambe", "util", "Assert"];
    lh.that = function() {};
    var fg = function() {};
    g["flambe.util.BitSets"] = fg;
    fg.__name__ = ["flambe", "util", "BitSets"];
    fg.set = function(a, b, c) {
        return c ? a | b : a & ~b
    };
    var Md = function() {
        this.mainSection = new ta;
        this.sections = new ta
    };
    g["flambe.util.Config"] = Md;
    Md.__name__ = ["flambe", "util", "Config"];
    Md.parse = function(a) {
        for (var b = new Md, c = new tb("^\\s*;", ""), d = new tb("^\\s*\\[\\s*([^\\]]*)\\s*\\]", ""), e = new tb("^\\s*([\\w\\.\\-_]+)\\s*=\\s*(.*)", ""), h = b.mainSection, f = 0, a = (new tb("\r\n|\r|\n", "g")).split(a); f < a.length;) {
            var i = a[f];
            ++f;
            if (!c.match(i))
                if (d.match(i)) i = d.matched(1), b.sections.exists(i) ? h = b.sections.get(i) : (h = new ta, b.sections.set(i, h));
                else if (e.match(i)) {
                var i = e.matched(1),
                    j = e.matched(2),
                    g = j.charCodeAt(0);
                if ((34 == g || 39 == g) && j.charCodeAt(j.length - 1) == g) j = P.substr(j, 1, j.length - 2);
                j = W.replace(W.replace(W.replace(W.replace(W.replace(W.replace(j, "\\n", "\n"), "\\r", "\r"), "\\t", "\t"), "\\'", "'"), '\\"', '"'), "\\\\", "\\");
                h.set(i, j)
            }
        }
        return b
    };
    Md.prototype = {
        get: function(a) {
            var b = a.indexOf(".");
            if (0 > b) return this.mainSection.get(a);
            var c;
            c = this.sections.get(P.substr(a, 0, b));
            return null != c ? (a = P.substr(a, b + 1, null), c.get(a)) : null
        },
        __class__: Md
    };
    var pe = function(a) {
        this.config = a;
        this.missingTranslation = new Ca
    };
    g["flambe.util.MessageBundle"] = pe;
    pe.__name__ = ["flambe", "util", "MessageBundle"];
    pe.parse = function(a) {
        return new pe(Md.parse(a))
    };
    pe.prototype = {
        get: function(a, b) {
            var c = this.config.get(a);
            return null == c ? (this.missingTranslation.emit(a), a) : null != b ? pa.substitute(c, b) : c
        },
        __class__: pe
    };
    var hf = function() {
        this.success = new Ca;
        this.error = new Ca;
        this.progressChanged = new Ab;
        this.hasResult = !1;
        this._total = this._progress = 0
    };
    g["flambe.util.Promise"] = hf;
    hf.__name__ = ["flambe", "util", "Promise"];
    hf.prototype = {
        set_result: function(a) {
            if (this.hasResult) throw "Promise result already assigned";
            this._result =
                a;
            this.hasResult = !0;
            this.success.emit(a);
            return a
        },
        get: function(a) {
            return this.hasResult ? (a(this._result), null) : this.success.connect(a).once()
        },
        set_progress: function(a) {
            this._progress != a && (this._progress = a, this.progressChanged.emit());
            return a
        },
        set_total: function(a) {
            this._total != a && (this._total = a, this.progressChanged.emit());
            return a
        },
        __class__: hf,
        __properties__: {
            set_total: "set_total",
            set_progress: "set_progress",
            set_result: "set_result"
        }
    };
    var Ab = function(a) {
        za.call(this, a)
    };
    g["flambe.util.Signal0"] =
        Ab;
    Ab.__name__ = ["flambe", "util", "Signal0"];
    Ab.__super__ = za;
    Ab.prototype = m(za.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        emit: function() {
            var a = this;
            this._head == za.DISPATCHING_SENTINEL ? this.defer(function() {
                a.emitImpl()
            }) : this.emitImpl()
        },
        emitImpl: function() {
            for (var a = this.willEmit(), b = a; null != b;) b._listener(), b.stayInList || b.dispose(), b = b._next;
            this.didEmit(a)
        },
        __class__: Ab
    });
    var bg = function(a) {
        this.next = null;
        this.fn = a
    };
    g["flambe.util._SignalBase.Task"] = bg;
    bg.__name__ = ["flambe", "util", "_SignalBase", "Task"];
    bg.prototype = {
        __class__: bg
    };
    var pa = function() {};
    g["flambe.util.Strings"] = pa;
    pa.__name__ = ["flambe", "util", "Strings"];
    pa.getFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? P.substr(a, b + 1, null) : null
    };
    pa.removeFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? P.substr(a, 0, b) : a
    };
    pa.getUrlExtension = function(a) {
        var b = a.lastIndexOf("?");
        0 <= b && (a = P.substr(a, 0, b));
        b = a.lastIndexOf("/");
        0 <= b && (a = P.substr(a, b + 1, null));
        return pa.getFileExtension(a)
    };
    pa.joinPath = function(a, b) {
        0 < a.length && 47 != a.charCodeAt(a.length - 1) && (a += "/");
        return a + b
    };
    pa.substitute = function(a, b) {
        for (var c = 0, d = b.length; c < d;) var e = c++,
            a = W.replace(a, "{" + e + "}", b[e]);
        return a
    };
    pa.withFields = function(a, b) {
        var c = b.length;
        if (0 < c) {
            for (var a = 0 < a.length ? a + " [" : a + "[", d = 0; d < c;) {
                0 < d && (a += ", ");
                var e = b[d],
                    h = b[d + 1];
                if (B.is(h, Error)) {
                    var f = h.stack;
                    null != f && (h = f)
                }
                a += e + "=" + B.string(h);
                d += 2
            }
            a += "]"
        }
        return a
    };
    var Wf = function() {
        this.__sprites = {}
    };
    g["framework.engine.SpriteSheet"] = Wf;
    Wf.__name__ = ["framework", "engine", "SpriteSheet"];
    Wf.prototype = {
        add: function(a) {
            for (var b = F.get_instance().pack.getTexture(a), c = 0, a = JSON.parse(F.get_instance().pack.getFile(a + ".json").toString()).frames; c < a.length;) {
                var d = a[c];
                ++c;
                var e = b.subTexture(d.frame.x, d.frame.y, d.frame.w, d.frame.h);
                this.__sprites[d.filename] = e
            }
        },
        get: function(a) {
            null == this.__sprites[a] && null;
            return this.__sprites[a]
        },
        __class__: Wf
    };
    var wa = function() {
        this.active = !1
    };
    g["framework.util.Console"] = wa;
    wa.__name__ = ["framework", "util", "Console"];
    wa.trace = function(a) {
        if (null != wa.instanse && wa.instanse.active) {
            for (var b = 0; b < a.length;) {
                var c = a[b];
                ++b;
                wa.instanse.text = B.string(c) + " " + wa.instanse.text
            }
            wa.instanse.text = "\n" + wa.instanse.text;
            wa.instanse.label.set_text(wa.instanse.text)
        }
    };
    wa.__super__ = Cb;
    wa.prototype = m(Cb.prototype, {
        onAdded: function() {
            var a = this,
                b = F.get_instance(),
                c = new ec(16777215, s.STAGE_WIDTH, s.STAGE_HEIGHT);
            this.owner.addChild((new q).add(c));
            this.label = new R(b.arial, "");
            this.label.setWrapWidth(s.STAGE_WIDTH).setAlign(ka.Left);
            this.label.y.set__(50);
            this.text = "";
            this.owner.addChild((new q).add(this.label));
            c = new R(b.arial, "close");
            c.centerAnchor();
            c.get_pointerDown().connect(function() {
                b.director.unwindToScene(a.back)
            });
            this.owner.addChild((new q).add(c));
            w.bottomCenterSprite(c);
            c = new R(b.arial, "clear");
            c.centerAnchor();
            c.get_pointerDown().connect(function() {
                a.text = "";
                a.label.set_text("")
            });
            w.bottomCenterSprite(c, 50);
            this.active = !0
        },
        __class__: wa
    });
    var gh = function() {};
    g["framework.util.PhysUtil"] = gh;
    gh.__name__ = ["framework",
        "util", "PhysUtil"
    ];
    gh.createExplosion = function(a, b) {
        var c = b.bodiesInCircle(a, 128, !1),
            d = c.get_length();
        if (0 < d) {
            var e = new fc(1),
                h = ca;
            null == f.BodyType_DYNAMIC && (f.internal = !0, f.BodyType_DYNAMIC = new Ka, f.internal = !1);
            h = new h(f.BodyType_DYNAMIC, a);
            h.zpp_inner.wrap_shapes.add(e);
            for (var e = K.get(null, null, null), n = K.get(null, null, null), i = 0; i < d;) {
                var j = i++,
                    j = c.at(j);
                if (j.zpp_inner.type == f.id_BodyType_DYNAMIC) {
                    var g = oh.distanceBody(h, j, e, n);
                    0 >= g && (g = 1, null == j.zpp_inner.wrap_pos && j.zpp_inner.setupPosition(),
                        n = j.zpp_inner.wrap_pos);
                    var k = n.sub(a),
                        l = Math.sqrt(function() {
                            k.zpp_inner.validate();
                            return k.zpp_inner.x
                        }(this) * function() {
                            k.zpp_inner.validate();
                            return k.zpp_inner.x
                        }(this) + function() {
                            k.zpp_inner.validate();
                            return k.zpp_inner.y
                        }(this) * function() {
                            k.zpp_inner.validate();
                            return k.zpp_inner.y
                        }(this));
                    if (1 >= l) {
                        k.zpp_inner.validate();
                        if (l = 1 == k.zpp_inner.x) k.zpp_inner.validate(), l = 0 == k.zpp_inner.y;
                        l || (k.zpp_inner.x = 1, k.zpp_inner.y = 0, k.zpp_inner.invalidate());
                        k;
                        l = 1
                    }
                    k.muleq(1 / l);
                    k.muleq(1E4 * ((128 - g) / 128));
                    j.applyImpulse(k, n)
                }
            }
            c.clear()
        }
    };
    var w = function() {};
    g["framework.util.ScreenUtils"] = w;
    w.__name__ = ["framework", "util", "ScreenUtils"];
    w.centerX = function() {
        return s.STAGE_WIDTH / 2 + (s.CANVAS_WIDTH - s.STAGE_WIDTH) / 2
    };
    w.centerY = function() {
        return s.STAGE_HEIGHT / 2
    };
    w.rightX = function() {
        return s.STAGE_WIDTH + (s.CANVAS_WIDTH - s.STAGE_WIDTH) / 2
    };
    w.bottomY = function() {
        return s.STAGE_HEIGHT
    };
    w.centerSprite = function(a, b, c, d) {
        null == d && (d = !0);
        null == c && (c = 0);
        null == b && (b = 0);
        b = d ? b : a.getNaturalWidth() / 2 + b;
        c = d ? c : a.getNaturalHeight() /
            2 + c;
        a.setXY(w.centerX() + b, w.centerY() + c)
    };
    w.bottomCenterSprite = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        a.setXY(w.centerX() + b, s.STAGE_HEIGHT - a.getNaturalHeight() / 2 + c)
    };
    w.topRight = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        a.setXY(w.rightX() - a.getNaturalWidth() / 2 + b, a.getNaturalHeight() / 2 + c)
    };
    w.topLeft = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        a.setXY(a.getNaturalWidth() / 2 + b, a.getNaturalHeight() / 2 + c)
    };
    w.topCenter = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        a.setXY(w.centerX() + b, a.getNaturalHeight() /
            2 + c)
    };
    w.bottomRight = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        a.setXY(w.rightX() - a.getNaturalWidth() / 2 + b, w.bottomY() - a.getNaturalHeight() / 2 + c)
    };
    w.bottomLeft = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        a.setXY(a.getNaturalWidth() / 2 + b, w.bottomY() - a.getNaturalHeight() / 2 + c)
    };
    w.centerInTheParent = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        w.centerInTheContainer(a, a.owner.parent, b, c)
    };
    w.centerInTheContainer = function(a, b, c, d, e) {
        null == e && (e = !0);
        null == d && (d = 0);
        null == c && (c = 0);
        b = b._compMap.Sprite_15;
        c = e ? 0 - c : a.getNaturalWidth() / 2 - c;
        d = e ? 0 - d : a.getNaturalHeight() / 2 - d;
        null != b && a.setXY(b.getNaturalWidth() / 2 - c, b.getNaturalHeight() / 2 - d)
    };
    var Ia = function() {};
    g["framework.util.SpriteUtil"] = Ia;
    Ia.__name__ = ["framework", "util", "SpriteUtil"];
    Ia.sprite = function(a, b, c) {
        null == c && (c = !0);
        a = (new ba(Ia.spriteSheet.get(a))).centerAnchor();
        b.addChild((new q).add(a), c);
        return a
    };
    Ia.imagesprite = function(a, b, c) {
        null == c && (c = !0);
        a = new ba(F.get_instance().pack.getTexture(a));
        b.addChild((new q).add(a), c);
        return a
    };
    Ia.fillBG =
        function(a) {
            var b = new ec(0, s.CANVAS_WIDTH, s.CANVAS_HEIGHT);
            b.alpha.animate(0, 0.5, 0.5);
            a.addChild((new q).add(b));
            return b
    };
    var Z = function() {};
    g["framework.util.Tweener"] = Z;
    Z.__name__ = ["framework", "util", "Tweener"];
    Z.to = function(a, b, c, d, e, h) {
        null == d && (d = 0);
        X;
        var f = new Fd;
        0 > d && (d = 0);
        if (0 == b && 0 == d) Z.apply(a, c, e);
        else {
            if (0 == b && 0 < d) {
                var i = new q;
                0 != d && f.add(new dd(d));
                f.add(new Gd(function() {
                    Z.apply(a, c, e);
                    i.dispose()
                }));
                b = new cd;
                z.root.addChild(i.add(b))
            } else {
                0 < d && f.add(new dd(d));
                for (var d = [], j = 0, g = Q.fields(c); j <
                    g.length;) {
                    var k = g[j];
                    ++j;
                    var l = Q.getProperty(a, k);
                    d.push(new vf(l, Q.field(c, k), b, h))
                }
                h = new wf(d);
                f.add(h);
                var x = new q;
                f.add(new dd(b));
                f.add(new Gd(function() {
                    null != e && e();
                    x.dispose()
                }));
                b = new cd;
                z.root.addChild(x.add(b))
            }
            b.run(f)
        }
    };
    Z.apply = function(a, b, c) {
        for (var d = 0, e = Q.fields(b); d < e.length;) {
            var h = e[d];
            ++d;
            var f = Q.getProperty(a, h);
            aa.__cast(f, ga).set__(Q.field(b, h))
        }
        null != c && c()
    };
    var hc = function() {
        this.buf = new xe;
        this.cache = [];
        this.useCache = hc.USE_CACHE;
        this.useEnumIndex = hc.USE_ENUM_INDEX;
        this.shash =
            new ta;
        this.scount = 0
    };
    g["haxe.Serializer"] = hc;
    hc.__name__ = ["haxe", "Serializer"];
    hc.prototype = {
        toString: function() {
            return this.buf.b
        },
        serializeString: function(a) {
            var b = this.shash.get(a);
            null != b ? (this.buf.b += "R", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)) : (this.shash.set(a, this.scount++), this.buf.b += "y", a = encodeURIComponent(a), this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length), this.buf.b += ":", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a))
        },
        serializeRef: function(a) {
            for (var b =
                typeof a, c = 0, d = this.cache.length; c < d;) {
                var e = c++,
                    h = this.cache[e];
                if (typeof h == b && h == a) return this.buf.b += "r", this.buf.b = null == e ? this.buf.b + "null" : this.buf.b + ("" + e), !0
            }
            this.cache.push(a);
            return !1
        },
        serializeFields: function(a) {
            for (var b = 0, c = Q.fields(a); b < c.length;) {
                var d = c[b];
                ++b;
                this.serializeString(d);
                this.serialize(Q.field(a, d))
            }
            this.buf.b += "g"
        },
        serialize: function(a) {
            var b = oa["typeof"](a);
            switch (b[1]) {
                case 0:
                    this.buf.b += "n";
                    break;
                case 1:
                    if (0 == a) {
                        this.buf.b += "z";
                        break
                    }
                    this.buf.b += "i";
                    this.buf.b = null ==
                        a ? this.buf.b + "null" : this.buf.b + ("" + a);
                    break;
                case 2:
                    Math.isNaN(a) ? this.buf.b += "k" : Math.isFinite(a) ? (this.buf.b += "d", this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a)) : this.buf.b = 0 > a ? this.buf.b + "m" : this.buf.b + "p";
                    break;
                case 3:
                    this.buf.b = a ? this.buf.b + "t" : this.buf.b + "f";
                    break;
                case 6:
                    b = b[2];
                    if (b == String) {
                        this.serializeString(a);
                        break
                    }
                    if (this.useCache && this.serializeRef(a)) break;
                    switch (b) {
                        case Array:
                            b = 0;
                            this.buf.b += "a";
                            for (var c = a.length, d = 0; d < c;) {
                                var e = d++;
                                null == a[e] ? b++ : (0 < b && (1 == b ? this.buf.b += "n" :
                                    (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)), b = 0), this.serialize(a[e]))
                            }
                            0 < b && (1 == b ? this.buf.b += "n" : (this.buf.b += "u", this.buf.b = null == b ? this.buf.b + "null" : this.buf.b + ("" + b)));
                            this.buf.b += "h";
                            break;
                        case we:
                            this.buf.b += "l";
                            for (a = a.iterator(); a.hasNext();) this.serialize(a.next());
                            this.buf.b += "h";
                            break;
                        case Date:
                            this.buf.b += "v";
                            this.buf.add(P.dateStr(a));
                            break;
                        case ta:
                            this.buf.b += "b";
                            for (b = a.keys(); b.hasNext();) c = b.next(), this.serializeString(c), this.serialize(a.get(c));
                            this.buf.b +=
                                "h";
                            break;
                        case Db:
                            this.buf.b += "q";
                            for (b = a.keys(); b.hasNext();) c = b.next(), this.buf.b += ":", this.buf.b = null == c ? this.buf.b + "null" : this.buf.b + ("" + c), this.serialize(a.get(c));
                            this.buf.b += "h";
                            break;
                        case jc:
                            this.buf.b += "M";
                            for (b = a.keys(); b.hasNext();) c = b.next(), d = Q.field(c, "__id__"), Q.deleteField(c, "__id__"), this.serialize(c), c.__id__ = d, this.serialize(a.h[c.__id__]);
                            this.buf.b += "h";
                            break;
                        case Zc:
                            d = 0;
                            e = a.length - 2;
                            b = new xe;
                            for (c = hc.BASE64; d < e;) {
                                var h = a.get(d++),
                                    f = a.get(d++),
                                    i = a.get(d++);
                                b.add(c.charAt(h >> 2));
                                b.add(c.charAt((h << 4 | f >> 4) & 63));
                                b.add(c.charAt((f << 2 | i >> 6) & 63));
                                b.add(c.charAt(i & 63))
                            }
                            d == e ? (e = a.get(d++), a = a.get(d++), b.add(c.charAt(e >> 2)), b.add(c.charAt((e << 4 | a >> 4) & 63)), b.add(c.charAt(a << 2 & 63))) : d == e + 1 && (a = a.get(d++), b.add(c.charAt(a >> 2)), b.add(c.charAt(a << 4 & 63)));
                            a = b.b;
                            this.buf.b += "s";
                            this.buf.b = null == a.length ? this.buf.b + "null" : this.buf.b + ("" + a.length);
                            this.buf.b += ":";
                            this.buf.b = null == a ? this.buf.b + "null" : this.buf.b + ("" + a);
                            break;
                        default:
                            this.useCache && this.cache.pop(), null != a.hxSerialize ? (this.buf.b +=
                                "C", this.serializeString(oa.getClassName(b)), this.useCache && this.cache.push(a), a.hxSerialize(this), this.buf.b += "g") : (this.buf.b += "c", this.serializeString(oa.getClassName(b)), this.useCache && this.cache.push(a), this.serializeFields(a))
                    }
                    break;
                case 4:
                    if (this.useCache && this.serializeRef(a)) break;
                    this.buf.b += "o";
                    this.serializeFields(a);
                    break;
                case 7:
                    b = b[2];
                    if (this.useCache) {
                        if (this.serializeRef(a)) break;
                        this.cache.pop()
                    }
                    this.buf.b = this.useEnumIndex ? this.buf.b + "j" : this.buf.b + "w";
                    this.serializeString(oa.getEnumName(b));
                    this.useEnumIndex ? (this.buf.b += ":", this.buf.b += B.string(a[1])) : this.serializeString(a[0]);
                    this.buf.b += ":";
                    b = a.length;
                    this.buf.b += B.string(b - 2);
                    for (c = 2; c < b;) d = c++, this.serialize(a[d]);
                    this.useCache && this.cache.push(a);
                    break;
                case 5:
                    throw "Cannot serialize function";
                default:
                    throw "Cannot serialize " + B.string(a);
            }
        },
        __class__: hc
    };
    var Va = function(a) {
        this.buf = a;
        this.length = a.length;
        this.pos = 0;
        this.scache = [];
        this.cache = [];
        a = Va.DEFAULT_RESOLVER;
        null == a && (a = oa, Va.DEFAULT_RESOLVER = a);
        this.setResolver(a)
    };
    g["haxe.Unserializer"] =
        Va;
    Va.__name__ = ["haxe", "Unserializer"];
    Va.initCodes = function() {
        for (var a = [], b = 0, c = Va.BASE64.length; b < c;) {
            var d = b++;
            a[Va.BASE64.charCodeAt(d)] = d
        }
        return a
    };
    Va.run = function(a) {
        return (new Va(a)).unserialize()
    };
    Va.prototype = {
        setResolver: function(a) {
            this.resolver = null == a ? {
                resolveClass: function() {
                    return null
                },
                resolveEnum: function() {
                    return null
                }
            } : a
        },
        get: function(a) {
            return this.buf.charCodeAt(a)
        },
        readDigits: function() {
            for (var a = 0, b = !1, c = this.pos;;) {
                var d = this.buf.charCodeAt(this.pos);
                if (d != d) break;
                if (45 ==
                    d) {
                    if (this.pos != c) break;
                    b = !0
                } else {
                    if (48 > d || 57 < d) break;
                    a = 10 * a + (d - 48)
                }
                this.pos++
            }
            b && (a *= -1);
            return a
        },
        unserializeObject: function(a) {
            for (;;) {
                if (this.pos >= this.length) throw "Invalid object";
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var b = this.unserialize();
                if ("string" != typeof b) throw "Invalid object key";
                var c = this.unserialize();
                a[b] = c
            }
            this.pos++
        },
        unserializeEnum: function(a, b) {
            if (58 != this.get(this.pos++)) throw "Invalid enum format";
            var c = this.readDigits();
            if (0 == c) return oa.createEnum(a, b);
            for (var d = []; 0 <
                c--;) d.push(this.unserialize());
            return oa.createEnum(a, b, d)
        },
        unserialize: function() {
            switch (this.get(this.pos++)) {
                case 110:
                    return null;
                case 116:
                    return !0;
                case 102:
                    return !1;
                case 122:
                    return 0;
                case 105:
                    return this.readDigits();
                case 100:
                    for (var a = this.pos;;) {
                        var b = this.buf.charCodeAt(this.pos);
                        if (43 <= b && 58 > b || 101 == b || 69 == b) this.pos++;
                        else break
                    }
                    return B.parseFloat(P.substr(this.buf, a, this.pos - a));
                case 121:
                    a = this.readDigits();
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw "Invalid string length";
                    b = P.substr(this.buf, this.pos, a);
                    this.pos += a;
                    b = decodeURIComponent(b.split("+").join(" "));
                    this.scache.push(b);
                    return b;
                case 107:
                    return Math.NaN;
                case 109:
                    return Math.NEGATIVE_INFINITY;
                case 112:
                    return Math.POSITIVE_INFINITY;
                case 97:
                    a = [];
                    for (this.cache.push(a);;) {
                        b = this.buf.charCodeAt(this.pos);
                        if (104 == b) {
                            this.pos++;
                            break
                        }
                        117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] = null) : a.push(this.unserialize())
                    }
                    return a;
                case 111:
                    return a = {}, this.cache.push(a), this.unserializeObject(a), a;
                case 114:
                    a = this.readDigits();
                    if (0 > a || a >= this.cache.length) throw "Invalid reference";
                    return this.cache[a];
                case 82:
                    a = this.readDigits();
                    if (0 > a || a >= this.scache.length) throw "Invalid string reference";
                    return this.scache[a];
                case 120:
                    throw this.unserialize();
                case 99:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw "Class not found " + a;
                    a = oa.createEmptyInstance(b);
                    this.cache.push(a);
                    this.unserializeObject(a);
                    return a;
                case 119:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw "Enum not found " + a;
                    a = this.unserializeEnum(b,
                        this.unserialize());
                    this.cache.push(a);
                    return a;
                case 106:
                    a = this.unserialize();
                    b = this.resolver.resolveEnum(a);
                    if (null == b) throw "Enum not found " + a;
                    this.pos++;
                    var c = this.readDigits(),
                        d = oa.getEnumConstructs(b)[c];
                    if (null == d) throw "Unknown enum index " + a + "@" + c;
                    a = this.unserializeEnum(b, d);
                    this.cache.push(a);
                    return a;
                case 108:
                    a = new we;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) a.add(this.unserialize());
                    this.pos++;
                    return a;
                case 98:
                    a = new ta;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b =
                        this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 113:
                    a = new Db;
                    this.cache.push(a);
                    for (b = this.get(this.pos++); 58 == b;) b = this.readDigits(), a.set(b, this.unserialize()), b = this.get(this.pos++);
                    if (104 != b) throw "Invalid IntMap format";
                    return a;
                case 77:
                    a = new jc;
                    for (this.cache.push(a); 104 != this.buf.charCodeAt(this.pos);) b = this.unserialize(), a.set(b, this.unserialize());
                    this.pos++;
                    return a;
                case 118:
                    return a = P.substr(this.buf, this.pos, 19), a = P.strDate(a), this.cache.push(a), this.pos += 19, a;
                case 115:
                    a =
                        this.readDigits();
                    d = this.buf;
                    if (58 != this.get(this.pos++) || this.length - this.pos < a) throw "Invalid bytes length";
                    var e = Va.CODES;
                    null == e && (e = Va.initCodes(), Va.CODES = e);
                    for (var h = this.pos, f = a & 3, i = h + (a - f), b = Zc.alloc(3 * (a >> 2) + (2 <= f ? f - 1 : 0)), c = 0; h < i;) {
                        var j = e[W.fastCodeAt(d, h++)],
                            g = e[W.fastCodeAt(d, h++)];
                        b.set(c++, j << 2 | g >> 4);
                        j = e[W.fastCodeAt(d, h++)];
                        b.set(c++, g << 4 | j >> 2);
                        g = e[W.fastCodeAt(d, h++)];
                        b.set(c++, j << 6 | g)
                    }
                    2 <= f && (g = e[W.fastCodeAt(d, h++)], i = e[W.fastCodeAt(d, h++)], b.set(c++, g << 2 | i >> 4), 3 == f && (d = e[W.fastCodeAt(d,
                        h++)], b.set(c++, i << 4 | d >> 2)));
                    this.pos += a;
                    this.cache.push(b);
                    return b;
                case 67:
                    a = this.unserialize();
                    b = this.resolver.resolveClass(a);
                    if (null == b) throw "Class not found " + a;
                    a = oa.createEmptyInstance(b);
                    this.cache.push(a);
                    a.hxUnserialize(this);
                    if (103 != this.get(this.pos++)) throw "Invalid custom data";
                    return a
            }
            this.pos--;
            throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
        },
        __class__: Va
    };
    var Db = function() {
        this.h = {}
    };
    g["haxe.ds.IntMap"] = Db;
    Db.__name__ = ["haxe", "ds", "IntMap"];
    Db.__interfaces__ = [Vf];
    Db.prototype = {
        set: function(a, b) {
            this.h[a] = b
        },
        get: function(a) {
            return this.h[a]
        },
        exists: function(a) {
            return this.h.hasOwnProperty(a)
        },
        remove: function(a) {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b | 0);
            return P.iter(a)
        },
        __class__: Db
    };
    var jc = function() {
        this.h = {};
        this.h.__keys__ = {}
    };
    g["haxe.ds.ObjectMap"] = jc;
    jc.__name__ = ["haxe", "ds", "ObjectMap"];
    jc.__interfaces__ = [Vf];
    jc.prototype = {
        set: function(a, b) {
            var c =
                a.__id__ || (a.__id__ = ++jc.count);
            this.h[c] = b;
            this.h.__keys__[c] = a
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h.__keys__) this.h.hasOwnProperty(b) && a.push(this.h.__keys__[b]);
            return P.iter(a)
        },
        __class__: jc
    };
    var ta = function() {
        this.h = {}
    };
    g["haxe.ds.StringMap"] = ta;
    ta.__name__ = ["haxe", "ds", "StringMap"];
    ta.__interfaces__ = [Vf];
    ta.prototype = {
        set: function(a, b) {
            this.h["$" + a] = b
        },
        get: function(a) {
            return this.h["$" + a]
        },
        exists: function(a) {
            return this.h.hasOwnProperty("$" + a)
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) &&
                a.push(b.substr(1));
            return P.iter(a)
        },
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext()
                },
                next: function() {
                    return this.ref["$" + this.it.next()]
                }
            }
        },
        __class__: ta
    };
    var Zc = function(a, b) {
        this.length = a;
        this.b = b
    };
    g["haxe.io.Bytes"] = Zc;
    Zc.__name__ = ["haxe", "io", "Bytes"];
    Zc.alloc = function(a) {
        for (var b = [], c = 0; c < a;) c++, b.push(0);
        return new Zc(a, b)
    };
    Zc.prototype = {
        get: function(a) {
            return this.b[a]
        },
        set: function(a, b) {
            this.b[a] = b & 255
        },
        __class__: Zc
    };
    var ph = function() {};
    g["haxe.io.Eof"] =
        ph;
    ph.__name__ = ["haxe", "io", "Eof"];
    ph.prototype = {
        toString: function() {
            return "Eof"
        },
        __class__: ph
    };
    var kh = function() {};
    g["haxe.rtti.Meta"] = kh;
    kh.__name__ = ["haxe", "rtti", "Meta"];
    kh.getType = function(a) {
        a = a.__meta__;
        return null == a || null == a.obj ? {} : a.obj
    };
    var aa = function() {};
    g["js.Boot"] = aa;
    aa.__name__ = ["js", "Boot"];
    aa.getClass = function(a) {
        return a instanceof Array && null == a.__enum__ ? Array : a.__class__
    };
    aa.__string_rec = function(a, b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var c = typeof a;
        if ("function" ==
            c && (a.__name__ || a.__ename__)) c = "object";
        switch (c) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        for (var c = a[0] + "(", b = b + "\t", d = 2, e = a.length; d < e;) var h = d++,
                            c = 2 != h ? c + ("," + aa.__string_rec(a[h], b)) : c + aa.__string_rec(a[h], b);
                        return c + ")"
                    }
                    c = a.length;
                    d = "[";
                    b += "\t";
                    for (e = 0; e < c;) h = e++, d += (0 < h ? "," : "") + aa.__string_rec(a[h], b);
                    return d + "]"
                }
                try {
                    d = a.toString
                } catch (f) {
                    return "???"
                }
                if (null != d && d != Object.toString && (c = a.toString(), "[object Object]" != c)) return c;
                c = null;
                d = "{\n";
                b += "\t";
                e = null != a.hasOwnProperty;
                for (c in a)
                    if (!e || a.hasOwnProperty(c)) "prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c || (2 != d.length && (d += ", \n"), d += b + c + " : " + aa.__string_rec(a[c], b));
                b = b.substring(1);
                return d + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return "" + a
        }
    };
    aa.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var c = a.__interfaces__;
        if (null != c)
            for (var d = 0, e = c.length; d < e;) {
                var h = d++,
                    h = c[h];
                if (h == b || aa.__interfLoop(h,
                    b)) return !0
            }
        return aa.__interfLoop(a.__super__, b)
    };
    aa.__instanceof = function(a, b) {
        if (null == b) return !1;
        switch (b) {
            case ei:
                return (a | 0) === a;
            case Zh:
                return "number" == typeof a;
            case $h:
                return "boolean" == typeof a;
            case String:
                return "string" == typeof a;
            case Array:
                return a instanceof Array && null == a.__enum__;
            case fi:
                return !0;
            default:
                if (null != a) {
                    if ("function" == typeof b && (a instanceof b || aa.__interfLoop(aa.getClass(a), b))) return !0
                } else return !1;
                return b == gi && null != a.__name__ || b == hi && null != a.__ename__ ? !0 : a.__enum__ ==
                    b
        }
    };
    aa.__cast = function(a, b) {
        if (aa.__instanceof(a, b)) return a;
        throw "Cannot cast " + B.string(a) + " to " + B.string(b);
    };
    var ih = function() {};
    g["js.Browser"] = ih;
    ih.__name__ = ["js", "Browser"];
    ih.getLocalStorage = function() {
        try {
            var a = window.localStorage;
            a.getItem("");
            return a
        } catch (b) {
            return null
        }
    };
    var jh = function() {};
    g["js.html._CanvasElement.CanvasUtil"] = jh;
    jh.__name__ = ["js", "html", "_CanvasElement", "CanvasUtil"];
    jh.getContextWebGL = function(a, b) {
        for (var c = 0, d = ["webgl", "experimental-webgl"]; c < d.length;) {
            var e =
                d[c];
            ++c;
            e = a.getContext(e, b);
            if (null != e) return e
        }
        return null
    };
    var l = function() {};
    g["nape.Config"] = l;
    l.__name__ = ["nape", "Config"];
    var Eb = function() {
        this.zpp_inner = null
    };
    g["nape.callbacks.Callback"] = Eb;
    Eb.__name__ = ["nape", "callbacks", "Callback"];
    Eb.prototype = {
        toString: function() {
            return ""
        },
        __class__: Eb
    };
    var Af = function() {
        this.zpp_inner = null
    };
    g["nape.callbacks.BodyCallback"] = Af;
    Af.__name__ = ["nape", "callbacks", "BodyCallback"];
    Af.__super__ = Eb;
    Af.prototype = m(Eb.prototype, {
        toString: function() {
            var a;
            a = "Cb:" + ["WAKE", "SLEEP"][this.zpp_inner.event - f.id_CbEvent_WAKE];
            a += ":" + this.zpp_inner.body.outer.toString();
            return a += " : listener: " + B.string(this.zpp_inner.listener.outer)
        },
        __class__: Af
    });
    var Rb = function() {
        this.zpp_inner = null
    };
    g["nape.callbacks.Listener"] = Rb;
    Rb.__name__ = ["nape", "callbacks", "Listener"];
    Rb.prototype = {
        toString: function() {
            var a = "BEGIN,END,WAKE,SLEEP,BREAK,PRE,ONGOING".split(",")[this.zpp_inner.event];
            if (this.zpp_inner.type == f.id_ListenerType_BODY) return "BodyListener{" + a + "::" + B.string(this.zpp_inner.body.outer_zn.zpp_inner_zn.options.outer) +
                "}";
            if (this.zpp_inner.type == f.id_ListenerType_CONSTRAINT) return "ConstraintListener{" + a + "::" + B.string(this.zpp_inner.constraint.outer_zn.zpp_inner_zn.options.outer) + "}";
            var b = this.zpp_inner.interaction,
                c;
            switch (b.itype) {
                case f.id_InteractionType_COLLISION:
                    c = "COLLISION";
                    break;
                case f.id_InteractionType_SENSOR:
                    c = "SENSOR";
                    break;
                case f.id_InteractionType_FLUID:
                    c = "FLUID";
                    break;
                default:
                    c = "ALL"
            }
            return (this.zpp_inner.type == f.id_ListenerType_INTERACTION ? "InteractionListener{" + a + "#" + c + "::" + B.string(b.outer_zni.zpp_inner_zn.options1.outer) +
                ":" + B.string(b.outer_zni.zpp_inner_zn.options2.outer) + "}" : "PreListener{" + c + "::" + B.string(b.outer_znp.zpp_inner_zn.options1.outer) + ":" + B.string(b.outer_znp.zpp_inner_zn.options2.outer) + "}") + " precedence=" + this.zpp_inner.precedence
        },
        __class__: Rb
    };
    var yg = function() {
        this.zpp_inner_zn = null
    };
    g["nape.callbacks.BodyListener"] = yg;
    yg.__name__ = ["nape", "callbacks", "BodyListener"];
    yg.__super__ = Rb;
    yg.prototype = m(Rb.prototype, {
        __class__: yg
    });
    var Sa = function() {};
    g["nape.callbacks.CbEvent"] = Sa;
    Sa.__name__ = ["nape",
        "callbacks", "CbEvent"
    ];
    Sa.prototype = {
        toString: function() {
            var a;
            null == f.CbEvent_PRE && (f.internal = !0, f.CbEvent_PRE = new Sa, f.internal = !1);
            this == f.CbEvent_PRE ? a = "PRE" : (null == f.CbEvent_BEGIN && (f.internal = !0, f.CbEvent_BEGIN = new Sa, f.internal = !1), this == f.CbEvent_BEGIN ? a = "BEGIN" : (null == f.CbEvent_ONGOING && (f.internal = !0, f.CbEvent_ONGOING = new Sa, f.internal = !1), this == f.CbEvent_ONGOING ? a = "ONGOING" : (null == f.CbEvent_END && (f.internal = !0, f.CbEvent_END = new Sa, f.internal = !1), this == f.CbEvent_END ? a = "END" : (null == f.CbEvent_WAKE &&
                (f.internal = !0, f.CbEvent_WAKE = new Sa, f.internal = !1), this == f.CbEvent_WAKE ? a = "WAKE" : (null == f.CbEvent_SLEEP && (f.internal = !0, f.CbEvent_SLEEP = new Sa, f.internal = !1), this == f.CbEvent_SLEEP ? a = "SLEEP" : (null == f.CbEvent_BREAK && (f.internal = !0, f.CbEvent_BREAK = new Sa, f.internal = !1), a = this == f.CbEvent_BREAK ? "BREAK" : ""))))));
            return a
        },
        __class__: Sa
    };
    var ha = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.callbacks.CbTypeIterator"] = ha;
    ha.__name__ = ["nape", "callbacks", "CbTypeIterator"];
    ha.get = function(a) {
        var b;
        null == ha.zpp_pool ? (Ac.internal = !0, b = new ha, Ac.internal = !1) : (b = ha.zpp_pool, ha.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    ha.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = ha.zpp_pool;
            ha.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: ha
    };
    var Bf = function() {
        this.zpp_inner =
            null;
        this.zpp_inner = new Ac;
        this.zpp_inner.outer = this
    };
    g["nape.callbacks.CbTypeList"] = Bf;
    Bf.__name__ = ["nape", "callbacks", "CbTypeList"];
    Bf.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index =
                a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        push: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ?
                null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        unshift: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ?
                null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        add: function(a) {
            return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = ha.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Bf,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Cf = function() {
        this.zpp_inner = null
    };
    g["nape.callbacks.ConstraintCallback"] = Cf;
    Cf.__name__ = ["nape", "callbacks", "ConstraintCallback"];
    Cf.__super__ = Eb;
    Cf.prototype = m(Eb.prototype, {
        toString: function() {
            var a;
            a = "Cb:" + ["WAKE", "SLEEP", "BREAK"][this.zpp_inner.event - f.id_CbEvent_WAKE];
            a += ":" + this.zpp_inner.constraint.outer.toString();
            return a += " : listener: " + B.string(this.zpp_inner.listener.outer)
        },
        __class__: Cf
    });
    var zg = function() {
        this.zpp_inner_zn = null
    };
    g["nape.callbacks.ConstraintListener"] = zg;
    zg.__name__ = ["nape", "callbacks", "ConstraintListener"];
    zg.__super__ = Rb;
    zg.prototype = m(Rb.prototype, {
        __class__: zg
    });
    var Df = function() {
        this.zpp_inner = null
    };
    g["nape.callbacks.InteractionCallback"] = Df;
    Df.__name__ = ["nape", "callbacks", "InteractionCallback"];
    Df.__super__ = Eb;
    Df.prototype = m(Eb.prototype, {
        toString: function() {
            var a;
            a = "Cb:" + "BEGIN,END,,,,,ONGOING".split(",")[this.zpp_inner.event];
            a += ":" + this.zpp_inner.int1.outer_i.toString() +
                "/" + this.zpp_inner.int2.outer_i.toString();
            a += " : " + this.zpp_inner.wrap_arbiters.toString();
            return a += " : listener: " + B.string(this.zpp_inner.listener.outer)
        },
        __class__: Df
    });
    var Xd = function(a, b, c, d, e, h) {
        null == h && (h = 0);
        this.zpp_inner = this.zpp_inner_zn = null;
        var n = -1;
        null == f.CbEvent_BEGIN && (f.internal = !0, f.CbEvent_BEGIN = new Sa, f.internal = !1);
        a == f.CbEvent_BEGIN ? n = f.id_CbEvent_BEGIN : (null == f.CbEvent_END && (f.internal = !0, f.CbEvent_END = new Sa, f.internal = !1), a == f.CbEvent_END ? n = f.id_CbEvent_END : (null == f.CbEvent_ONGOING &&
            (f.internal = !0, f.CbEvent_ONGOING = new Sa, f.internal = !1), a == f.CbEvent_ONGOING && (n = f.id_CbEvent_ONGOING)));
        this.zpp_inner = this.zpp_inner_zn = new Wa(Nd.argument(c), Nd.argument(d), n, f.id_ListenerType_INTERACTION);
        this.zpp_inner.outer = this;
        this.zpp_inner_zn.outer_zni = this;
        this.zpp_inner.precedence = h;
        this.zpp_inner_zn.handleri = e;
        this.set_interactionType(b)
    };
    g["nape.callbacks.InteractionListener"] = Xd;
    Xd.__name__ = ["nape", "callbacks", "InteractionListener"];
    Xd.__super__ = Rb;
    Xd.prototype = m(Rb.prototype, {
        get_interactionType: function() {
            var a =
                this.zpp_inner_zn.itype;
            if (a == f.id_InteractionType_COLLISION) return null == f.InteractionType_COLLISION && (f.internal = !0, f.InteractionType_COLLISION = new fb, f.internal = !1), f.InteractionType_COLLISION;
            if (a == f.id_InteractionType_SENSOR) return null == f.InteractionType_SENSOR && (f.internal = !0, f.InteractionType_SENSOR = new fb, f.internal = !1), f.InteractionType_SENSOR;
            if (a == f.id_InteractionType_FLUID) return null == f.InteractionType_FLUID && (f.internal = !0, f.InteractionType_FLUID = new fb, f.internal = !1), f.InteractionType_FLUID;
            return a == f.id_InteractionType_ANY ? (null == f.InteractionType_ANY && (f.internal = !0, f.InteractionType_ANY = new fb, f.internal = !1), f.InteractionType_ANY) : null
        },
        set_interactionType: function(a) {
            if (this.get_interactionType() != a) {
                var b = this.zpp_inner_zn;
                null == f.InteractionType_COLLISION && (f.internal = !0, f.InteractionType_COLLISION = new fb, f.internal = !1);
                a == f.InteractionType_COLLISION ? a = f.id_InteractionType_COLLISION : (null == f.InteractionType_SENSOR && (f.internal = !0, f.InteractionType_SENSOR = new fb, f.internal = !1),
                    a == f.InteractionType_SENSOR ? a = f.id_InteractionType_SENSOR : (null == f.InteractionType_FLUID && (f.internal = !0, f.InteractionType_FLUID = new fb, f.internal = !1), a = a == f.InteractionType_FLUID ? f.id_InteractionType_FLUID : f.id_InteractionType_ANY));
                b.itype = a
            }
            return this.get_interactionType()
        },
        __class__: Xd,
        __properties__: {
            set_interactionType: "set_interactionType",
            get_interactionType: "get_interactionType"
        }
    });
    var fb = function() {};
    g["nape.callbacks.InteractionType"] = fb;
    fb.__name__ = ["nape", "callbacks", "InteractionType"];
    fb.prototype = {
        toString: function() {
            var a;
            null == f.InteractionType_COLLISION && (f.internal = !0, f.InteractionType_COLLISION = new fb, f.internal = !1);
            this == f.InteractionType_COLLISION ? a = "COLLISION" : (null == f.InteractionType_SENSOR && (f.internal = !0, f.InteractionType_SENSOR = new fb, f.internal = !1), this == f.InteractionType_SENSOR ? a = "SENSOR" : (null == f.InteractionType_FLUID && (f.internal = !0, f.InteractionType_FLUID = new fb, f.internal = !1), this == f.InteractionType_FLUID ? a = "FLUID" : (null == f.InteractionType_ANY && (f.internal = !0,
                f.InteractionType_ANY = new fb, f.internal = !1), a = this == f.InteractionType_ANY ? "ANY" : "")));
            return a
        },
        __class__: fb
    };
    var Bc = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.callbacks.ListenerIterator"] = Bc;
    Bc.__name__ = ["nape", "callbacks", "ListenerIterator"];
    Bc.get = function(a) {
        var b;
        null == Bc.zpp_pool ? (Cc.internal = !0, b = new Bc, Cc.internal = !1) : (b = Bc.zpp_pool, Bc.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Bc.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Bc.zpp_pool;
            Bc.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Bc
    };
    var Ag = function() {
        this.zpp_inner = null;
        this.zpp_inner = new Cc;
        this.zpp_inner.outer = this
    };
    g["nape.callbacks.ListenerList"] = Ag;
    Ag.__name__ = ["nape", "callbacks", "ListenerList"];
    Ag.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length &&
                (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        push: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder &&
                this.zpp_inner.post_adder(a);
            return b
        },
        unshift: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(),
                null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        add: function(a) {
            return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
        },
        remove: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            b = !1;
            for (var c = this.zpp_inner.inner.head; null != c;) {
                if (c.elt == a.zpp_inner) {
                    b = !0;
                    break
                }
                c = c.next
            }
            b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
            return b
        },
        toString: function() {
            var a =
                "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Bc.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Ag,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Od = function() {};
    g["nape.callbacks.ListenerType"] = Od;
    Od.__name__ = ["nape", "callbacks", "ListenerType"];
    Od.prototype = {
        toString: function() {
            var a;
            null == f.ListenerType_BODY && (f.internal = !0, f.ListenerType_BODY = new Od, f.internal = !1);
            this == f.ListenerType_BODY ? a = "BODY" :
                (null == f.ListenerType_CONSTRAINT && (f.internal = !0, f.ListenerType_CONSTRAINT = new Od, f.internal = !1), this == f.ListenerType_CONSTRAINT ? a = "CONSTRAINT" : (null == f.ListenerType_INTERACTION && (f.internal = !0, f.ListenerType_INTERACTION = new Od, f.internal = !1), this == f.ListenerType_INTERACTION ? a = "INTERACTION" : (null == f.ListenerType_PRE && (f.internal = !0, f.ListenerType_PRE = new Od, f.internal = !1), a = this == f.ListenerType_PRE ? "PRE" : "")));
            return a
        },
        __class__: Od
    };
    var Pd = function(a, b) {
        this.zpp_inner = null;
        this.zpp_inner = new Nd;
        this.zpp_inner.outer = this;
        null != a && this.including(a);
        null != b && this.excluding(b)
    };
    g["nape.callbacks.OptionType"] = Pd;
    Pd.__name__ = ["nape", "callbacks", "OptionType"];
    Pd.prototype = {
        including: function(a) {
            this.zpp_inner.append(this.zpp_inner.includes, a);
            return this
        },
        excluding: function(a) {
            this.zpp_inner.append(this.zpp_inner.excludes, a);
            return this
        },
        toString: function() {
            null == this.zpp_inner.wrap_includes && this.zpp_inner.setup_includes();
            var a = this.zpp_inner.wrap_includes.toString();
            null == this.zpp_inner.wrap_excludes &&
                this.zpp_inner.setup_excludes();
            return "@{" + a + " excluding " + this.zpp_inner.wrap_excludes.toString() + "}"
        },
        __class__: Pd
    };
    var Ef = function() {
        this.zpp_inner = null
    };
    g["nape.callbacks.PreCallback"] = Ef;
    Ef.__name__ = ["nape", "callbacks", "PreCallback"];
    Ef.__super__ = Eb;
    Ef.prototype = m(Eb.prototype, {
        toString: function() {
            var a;
            a = "Cb:PRE:" + (":" + this.zpp_inner.int1.outer_i.toString() + "/" + this.zpp_inner.int2.outer_i.toString());
            a += " : " + this.zpp_inner.pre_arbiter.wrapper().toString();
            return a += " : listnener: " + B.string(this.zpp_inner.listener.outer)
        },
        __class__: Ef
    });
    var Fa = function() {};
    g["nape.callbacks.PreFlag"] = Fa;
    Fa.__name__ = ["nape", "callbacks", "PreFlag"];
    Fa.prototype = {
        toString: function() {
            var a;
            null == f.PreFlag_ACCEPT && (f.internal = !0, f.PreFlag_ACCEPT = new Fa, f.internal = !1);
            this == f.PreFlag_ACCEPT ? a = "ACCEPT" : (null == f.PreFlag_IGNORE && (f.internal = !0, f.PreFlag_IGNORE = new Fa, f.internal = !1), this == f.PreFlag_IGNORE ? a = "IGNORE" : (null == f.PreFlag_ACCEPT_ONCE && (f.internal = !0, f.PreFlag_ACCEPT_ONCE = new Fa, f.internal = !1), this == f.PreFlag_ACCEPT_ONCE ? a = "ACCEPT_ONCE" :
                (null == f.PreFlag_IGNORE_ONCE && (f.internal = !0, f.PreFlag_IGNORE_ONCE = new Fa, f.internal = !1), a = this == f.PreFlag_IGNORE_ONCE ? "IGNORE_ONCE" : "")));
            return a
        },
        __class__: Fa
    };
    var Bg = function() {
        this.zpp_inner_zn = null
    };
    g["nape.callbacks.PreListener"] = Bg;
    Bg.__name__ = ["nape", "callbacks", "PreListener"];
    Bg.__super__ = Rb;
    Bg.prototype = m(Rb.prototype, {
        __class__: Bg
    });
    var qh = function() {};
    g["nape.constraint.Constraint"] = qh;
    qh.__name__ = ["nape", "constraint", "Constraint"];
    qh.prototype = {
        toString: function() {
            return "{Constraint}"
        },
        __class__: qh
    };
    var kc = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.constraint.ConstraintIterator"] = kc;
    kc.__name__ = ["nape", "constraint", "ConstraintIterator"];
    kc.get = function(a) {
        var b;
        null == kc.zpp_pool ? (lc.internal = !0, b = new kc, lc.internal = !1) : (b = kc.zpp_pool, kc.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    kc.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = kc.zpp_pool;
            kc.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: kc
    };
    var Cg = function() {
        this.zpp_inner = null;
        this.zpp_inner = new lc;
        this.zpp_inner.outer = this
    };
    g["nape.constraint.ConstraintList"] = Cg;
    Cg.__name__ = ["nape", "constraint", "ConstraintList"];
    Cg.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length =
                this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        remove: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            b = !1;
            for (var c = this.zpp_inner.inner.head; null != c;) {
                if (c.elt == a.zpp_inner) {
                    b = !0;
                    break
                }
                c = c.next
            }
            b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
            return b
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = kc.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Cg,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Dc = function() {
        this.zpp_inner = null
    };
    g["nape.dynamics.Arbiter"] = Dc;
    Dc.__name__ = ["nape", "dynamics", "Arbiter"];
    Dc.prototype = {
        get_state: function() {
            var a = this.zpp_inner.immState;
            if (a == (f.id_ImmState_ACCEPT | f.id_ImmState_ALWAYS)) return null == f.PreFlag_ACCEPT && (f.internal = !0, f.PreFlag_ACCEPT = new Fa, f.internal = !1), f.PreFlag_ACCEPT;
            switch (a) {
                case f.id_ImmState_ACCEPT:
                    return null == f.PreFlag_ACCEPT_ONCE && (f.internal = !0, f.PreFlag_ACCEPT_ONCE = new Fa, f.internal = !1),
                        f.PreFlag_ACCEPT_ONCE;
                default:
                    if (a == (f.id_ImmState_IGNORE | f.id_ImmState_ALWAYS)) return null == f.PreFlag_IGNORE && (f.internal = !0, f.PreFlag_IGNORE = new Fa, f.internal = !1), f.PreFlag_IGNORE;
                    null == f.PreFlag_IGNORE_ONCE && (f.internal = !0, f.PreFlag_IGNORE_ONCE = new Fa, f.internal = !1);
                    return f.PreFlag_IGNORE_ONCE
            }
        },
        totalImpulse: function() {
            return Fb.get(0, 0, 0)
        },
        toString: function() {
            var a;
            a = this.zpp_inner.type == O.COL ? "CollisionArbiter" : this.zpp_inner.type == O.FLUID ? "FluidArbiter" : "SensorArbiter";
            return this.zpp_inner.cleared ?
                a + "(object-pooled)" : a + "(" + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws2.outer : this.zpp_inner.ws1.outer).toString() + "|" + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws1.outer : this.zpp_inner.ws2.outer).toString() + ")" + (this.zpp_inner.type == O.COL ? "[" + ["SD", "DD"][this.zpp_inner.colarb.stat ? 0 : 1] + "]" : "") + "<-" + this.get_state().toString()
        },
        __class__: Dc,
        __properties__: {
            get_state: "get_state"
        }
    };
    var mc = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner =
            null
    };
    g["nape.dynamics.ArbiterIterator"] = mc;
    mc.__name__ = ["nape", "dynamics", "ArbiterIterator"];
    mc.get = function(a) {
        var b;
        null == mc.zpp_pool ? (Ec.internal = !0, b = new mc, Ec.internal = !1) : (b = mc.zpp_pool, mc.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    mc.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.zpp_gl();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = mc.zpp_pool;
            mc.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: mc
    };
    var Dg = function() {
        this.zpp_inner = null;
        this.zpp_inner = new Ec;
        this.zpp_inner.outer = this
    };
    g["nape.dynamics.ArbiterList"] = Dg;
    Dg.__name__ = ["nape", "dynamics", "ArbiterList"];
    Dg.prototype = {
        zpp_gl: function() {
            this.zpp_inner.valmod();
            if (this.zpp_inner.zip_length) {
                this.zpp_inner.zip_length = !1;
                this.zpp_inner.user_length = 0;
                for (var a = this.zpp_inner.inner.head; null != a;) a.elt.active && this.zpp_inner.user_length++, a = a.next
            }
            return this.zpp_inner.user_length
        },
        zpp_vm: function() {
            this.zpp_inner.valmod()
        },
        at: function(a) {
            this.zpp_vm();
            this.zpp_inner.reverse_flag && (a = this.zpp_gl() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) {
                this.zpp_inner.at_index = 0;
                for (this.zpp_inner.at_ite = this.zpp_inner.inner.head; !this.zpp_inner.at_ite.elt.active;) this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
            }
            for (; this.zpp_inner.at_index != a;) {
                this.zpp_inner.at_index++;
                for (this.zpp_inner.at_ite = this.zpp_inner.at_ite.next; !this.zpp_inner.at_ite.elt.active;) this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
            }
            return this.zpp_inner.at_ite.elt.wrapper()
        },
        iterator: function() {
            this.zpp_vm();
            return mc.get(this)
        },
        toString: function() {
            for (var a = "[", b = !0, c = this.iterator(); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Dg
    };
    var ee = function() {};
    g["nape.dynamics.ArbiterType"] = ee;
    ee.__name__ = ["nape", "dynamics", "ArbiterType"];
    ee.prototype = {
        toString: function() {
            var a;
            null == f.ArbiterType_COLLISION && (f.internal = !0, f.ArbiterType_COLLISION = new ee, f.internal = !1);
            this == f.ArbiterType_COLLISION ?
                a = "COLLISION" : (null == f.ArbiterType_SENSOR && (f.internal = !0, f.ArbiterType_SENSOR = new ee, f.internal = !1), this == f.ArbiterType_SENSOR ? a = "SENSOR" : (null == f.ArbiterType_FLUID && (f.internal = !0, f.ArbiterType_FLUID = new ee, f.internal = !1), a = this == f.ArbiterType_FLUID ? "FLUID" : ""));
            return a
        },
        __class__: ee
    };
    var Ff = function() {
        this.zpp_inner = null
    };
    g["nape.dynamics.CollisionArbiter"] = Ff;
    Ff.__name__ = ["nape", "dynamics", "CollisionArbiter"];
    Ff.__super__ = Dc;
    Ff.prototype = m(Dc.prototype, {
        totalImpulse: function(a, b) {
            null == b && (b = !1);
            var c = 0,
                d = 0,
                e = 0,
                h = this.zpp_inner.colarb;
            if (!b || h.oc1.fresh) {
                var f = h.oc1.wrapper().totalImpulse(a);
                f.zpp_inner.validate();
                c += 1 * f.zpp_inner.x;
                f.zpp_inner.validate();
                d += 1 * f.zpp_inner.y;
                f.zpp_inner.validate();
                e += 1 * f.zpp_inner.z;
                f.dispose()
            }
            if (h.hc2 && (!b || h.oc2.fresh)) h = h.oc2.wrapper().totalImpulse(a), h.zpp_inner.validate(), c += 1 * h.zpp_inner.x, h.zpp_inner.validate(), d += 1 * h.zpp_inner.y, h.zpp_inner.validate(), e += 1 * h.zpp_inner.z, h.dispose();
            return Fb.get(c, d, e)
        },
        __class__: Ff
    });
    var Eg = function() {
        this.zpp_inner =
            null
    };
    g["nape.dynamics.Contact"] = Eg;
    Eg.__name__ = ["nape", "dynamics", "Contact"];
    Eg.prototype = {
        totalImpulse: function(a) {
            var b = this.zpp_inner.arbiter.colarb,
                c = this.zpp_inner.inner,
                d = c.jnAcc,
                e = c.jtAcc,
                h = b.jrAcc;
            if (null == a) return Fb.get(b.nx * d - b.ny * e, b.ny * d + b.nx * e, h);
            var f = b.nx * d - b.ny * e,
                d = b.ny * d + b.nx * e;
            return a == b.b1.outer ? Fb.get(-f, -d, -(d * c.r1x - f * c.r1y) - h) : Fb.get(f, d, d * c.r2x - f * c.r2y + h)
        },
        toString: function() {
            return null == this.zpp_inner.arbiter || this.zpp_inner.arbiter.cleared ? "{object-pooled}" : "{Contact}"
        },
        __class__: Eg
    };
    var Fc = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.dynamics.ContactIterator"] = Fc;
    Fc.__name__ = ["nape", "dynamics", "ContactIterator"];
    Fc.get = function(a) {
        var b;
        null == Fc.zpp_pool ? (Qd.internal = !0, b = new Fc, Qd.internal = !1) : (b = Fc.zpp_pool, Fc.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Fc.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i <
                a) return !0;
            this.zpp_next = Fc.zpp_pool;
            Fc.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Fc
    };
    var rh = function() {
        this.zpp_inner = null
    };
    g["nape.dynamics.ContactList"] = rh;
    rh.__name__ = ["nape", "dynamics", "ContactList"];
    rh.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            if (this.zpp_inner.zip_length) {
                this.zpp_inner.zip_length = !1;
                this.zpp_inner.user_length = 0;
                for (var a = this.zpp_inner.inner.next; null != a;) {
                    var b = a;
                    b.active &&
                        b.arbiter.active && this.zpp_inner.user_length++;
                    a = a.next
                }
            }
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) {
                this.zpp_inner.at_index = 0;
                for (this.zpp_inner.at_ite = this.zpp_inner.inner.next;;) {
                    var b = this.zpp_inner.at_ite;
                    if (b.active && b.arbiter.active) break;
                    this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
                }
            }
            for (; this.zpp_inner.at_index != a;) {
                this.zpp_inner.at_index++;
                for (this.zpp_inner.at_ite =
                    this.zpp_inner.at_ite.next;;) {
                    b = this.zpp_inner.at_ite;
                    if (b.active && b.arbiter.active) break;
                    this.zpp_inner.at_ite = this.zpp_inner.at_ite.next
                }
            }
            return this.zpp_inner.at_ite.wrapper()
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Fc.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: rh,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Gf = function() {
        this.zpp_inner = null
    };
    g["nape.dynamics.FluidArbiter"] =
        Gf;
    Gf.__name__ = ["nape", "dynamics", "FluidArbiter"];
    Gf.__super__ = Dc;
    Gf.prototype = m(Dc.prototype, {
        buoyancyImpulse: function(a) {
            var b = this.zpp_inner.fluidarb;
            return null == a ? Fb.get(b.buoyx, b.buoyy, 0) : a.zpp_inner == this.zpp_inner.b2 ? Fb.get(b.buoyx, b.buoyy, b.buoyy * b.r2x - b.buoyx * b.r2y) : Fb.get(-b.buoyx, -b.buoyy, -(b.buoyy * b.r1x - b.buoyx * b.r1y))
        },
        dragImpulse: function(a) {
            var b = this.zpp_inner.fluidarb,
                a = null == a || a.zpp_inner == this.zpp_inner.b2 ? 1 : -1;
            return Fb.get(b.dampx * a, b.dampy * a, b.adamp * a)
        },
        totalImpulse: function(a,
            b) {
            null == b && (b = !1);
            var c = this.buoyancyImpulse(a),
                d = this.dragImpulse(a);
            d.set_x(function() {
                d.zpp_inner.validate();
                return d.zpp_inner.x
            }(this) + function() {
                c.zpp_inner.validate();
                return c.zpp_inner.x
            }(this));
            d.set_y(function() {
                d.zpp_inner.validate();
                return d.zpp_inner.y
            }(this) + function() {
                c.zpp_inner.validate();
                return c.zpp_inner.y
            }(this));
            d.set_z(function() {
                d.zpp_inner.validate();
                return d.zpp_inner.z
            }(this) + function() {
                c.zpp_inner.validate();
                return c.zpp_inner.z
            }(this));
            c.dispose();
            return d
        },
        __class__: Gf
    });
    var Fg = function(a, b, c, d, e, h) {
        null == h && (h = -1);
        null == e && (e = 1);
        null == d && (d = -1);
        null == c && (c = 1);
        null == b && (b = -1);
        null == a && (a = 1);
        this.zpp_inner = null;
        null == Ma.zpp_pool ? this.zpp_inner = new Ma : (this.zpp_inner = Ma.zpp_pool, Ma.zpp_pool = this.zpp_inner.next, this.zpp_inner.next = null);
        null;
        this.zpp_inner.outer = this;
        this.zpp_inner.collisionGroup != a && (this.zpp_inner.collisionGroup = a, this.zpp_inner.invalidate());
        this.zpp_inner.collisionGroup;
        this.zpp_inner.collisionMask != b && (this.zpp_inner.collisionMask = b, this.zpp_inner.invalidate());
        this.zpp_inner.collisionMask;
        this.zpp_inner.sensorGroup != c && (this.zpp_inner.sensorGroup = c, this.zpp_inner.invalidate());
        this.zpp_inner.sensorGroup;
        this.zpp_inner.sensorMask != d && (this.zpp_inner.sensorMask = d, this.zpp_inner.invalidate());
        this.zpp_inner.sensorMask;
        this.zpp_inner.fluidGroup != e && (this.zpp_inner.fluidGroup = e, this.zpp_inner.invalidate());
        this.zpp_inner.fluidGroup;
        this.zpp_inner.fluidMask != h && (this.zpp_inner.fluidMask = h, this.zpp_inner.invalidate());
        this.zpp_inner.fluidMask
    };
    g["nape.dynamics.InteractionFilter"] =
        Fg;
    Fg.__name__ = ["nape", "dynamics", "InteractionFilter"];
    Fg.prototype = {
        __class__: Fg
    };
    var sh = function() {
        this.zpp_inner = null
    };
    g["nape.dynamics.InteractionGroup"] = sh;
    sh.__name__ = ["nape", "dynamics", "InteractionGroup"];
    sh.prototype = {
        toString: function() {
            var a = "InteractionGroup";
            this.zpp_inner.ignore && (a += ":ignore");
            return a
        },
        __class__: sh
    };
    var Sb = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.dynamics.InteractionGroupIterator"] = Sb;
    Sb.__name__ = ["nape", "dynamics",
        "InteractionGroupIterator"
    ];
    Sb.get = function(a) {
        var b;
        null == Sb.zpp_pool ? (fe.internal = !0, b = new Sb, fe.internal = !1) : (b = Sb.zpp_pool, Sb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Sb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Sb.zpp_pool;
            Sb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Sb
    };
    var th = function() {
        this.zpp_inner = null
    };
    g["nape.dynamics.InteractionGroupList"] = th;
    th.__name__ = ["nape", "dynamics", "InteractionGroupList"];
    th.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index =
                a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Sb.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: th,
        __properties__: {
            get_length: "get_length"
        }
    };
    var uh = function() {
        this.zpp_inner =
            null
    };
    g["nape.geom.AABB"] = uh;
    uh.__name__ = ["nape", "geom", "AABB"];
    uh.prototype = {
        toString: function() {
            this.zpp_inner.validate();
            return this.zpp_inner.toString()
        },
        __class__: uh
    };
    var vh = function() {
        this.zpp_inner = null
    };
    g["nape.geom.ConvexResult"] = vh;
    vh.__name__ = ["nape", "geom", "ConvexResult"];
    vh.prototype = {
        toString: function() {
            return "{ shape: " + B.string(this.zpp_inner.shape) + " toi: " + this.zpp_inner.toiDistance + " }"
        },
        __class__: vh
    };
    var eb = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner =
            null
    };
    g["nape.geom.ConvexResultIterator"] = eb;
    eb.__name__ = ["nape", "geom", "ConvexResultIterator"];
    eb.get = function(a) {
        var b;
        null == eb.zpp_pool ? (zd.internal = !0, b = new eb, zd.internal = !1) : (b = eb.zpp_pool, eb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    eb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = eb.zpp_pool;
            eb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: eb
    };
    var wh = function() {
        this.zpp_inner = null
    };
    g["nape.geom.ConvexResultList"] = wh;
    wh.__name__ = ["nape", "geom", "ConvexResultList"];
    wh.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index ||
                null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = eb.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: wh,
        __properties__: {
            get_length: "get_length"
        }
    };
    var oh = function() {};
    g["nape.geom.Geom"] = oh;
    oh.__name__ = ["nape", "geom", "Geom"];
    oh.distanceBody = function(a, b, c, d) {
        for (var e = a.zpp_inner.shapes.head; null != e;) Gg.validateShape(e.elt), e = e.next;
        for (e = b.zpp_inner.shapes.head; null != e;) Gg.validateShape(e.elt), e = e.next;
        return hb.distanceBody(a.zpp_inner, b.zpp_inner, c.zpp_inner, d.zpp_inner)
    };
    var Hg = function() {
        this.zpp_inner = null
    };
    g["nape.geom.GeomPoly"] = Hg;
    Hg.__name__ = ["nape", "geom", "GeomPoly"];
    Hg.prototype = {
        toString: function() {
            var a = "GeomPoly[",
                b = this.zpp_inner.vertices,
                c = this.zpp_inner.vertices;
            if (null != b) {
                do {
                    var d = b;
                    d != this.zpp_inner.vertices && (a += ",");
                    a += "{" + d.x + "," + d.y + "}";
                    b = b.next
                } while (b != c)
            }
            return a + "]"
        },
        __class__: Hg
    };
    var Xa = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.geom.GeomPolyIterator"] = Xa;
    Xa.__name__ = ["nape", "geom", "GeomPolyIterator"];
    Xa.get = function(a) {
        var b;
        null == Xa.zpp_pool ? (jd.internal = !0, b = new Xa, jd.internal = !1) : (b = Xa.zpp_pool, Xa.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Xa.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Xa.zpp_pool;
            Xa.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Xa
    };
    var xh = function() {
        this.zpp_inner = null
    };
    g["nape.geom.GeomPolyList"] = xh;
    xh.__name__ = ["nape", "geom", "GeomPolyList"];
    xh.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length &&
                (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Xa.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: xh,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Ig = function(a, b, c, d, e, h) {
        null == h && (h = 0);
        null == e && (e = 0);
        null == d && (d = 1);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 1);
        this.zpp_inner = null;
        this.zpp_inner = Gc.get();
        this.zpp_inner.outer = this;
        this.zpp_inner.a = a;
        this.zpp_inner.invalidate();
        this.zpp_inner.a;
        this.zpp_inner.b = b;
        this.zpp_inner.invalidate();
        this.zpp_inner.b;
        this.zpp_inner.tx = e;
        this.zpp_inner.invalidate();
        this.zpp_inner.tx;
        this.zpp_inner.c = c;
        this.zpp_inner.invalidate();
        this.zpp_inner.c;
        this.zpp_inner.d = d;
        this.zpp_inner.invalidate();
        this.zpp_inner.d;
        this.zpp_inner.ty = h;
        this.zpp_inner.invalidate();
        this.zpp_inner.ty
    };
    g["nape.geom.Mat23"] = Ig;
    Ig.__name__ = ["nape", "geom", "Mat23"];
    Ig.prototype = {
        set_a: function(a) {
            this.zpp_inner.a = a;
            this.zpp_inner.invalidate();
            return this.zpp_inner.a
        },
        set_b: function(a) {
            this.zpp_inner.b = a;
            this.zpp_inner.invalidate();
            return this.zpp_inner.b
        },
        set_c: function(a) {
            this.zpp_inner.c = a;
            this.zpp_inner.invalidate();
            return this.zpp_inner.c
        },
        set_d: function(a) {
            this.zpp_inner.d = a;
            this.zpp_inner.invalidate();
            return this.zpp_inner.d
        },
        set_tx: function(a) {
            this.zpp_inner.tx = a;
            this.zpp_inner.invalidate();
            return this.zpp_inner.tx
        },
        set_ty: function(a) {
            this.zpp_inner.ty = a;
            this.zpp_inner.invalidate();
            return this.zpp_inner.ty
        },
        singular: function() {
            var a = this.zpp_inner.a * this.zpp_inner.a +
                this.zpp_inner.b * this.zpp_inner.b + this.zpp_inner.c * this.zpp_inner.c + this.zpp_inner.d * this.zpp_inner.d,
                b = this.zpp_inner.a * this.zpp_inner.d - this.zpp_inner.b * this.zpp_inner.c;
            0 > b && (b = -b);
            return a > l.illConditionedThreshold * b
        },
        toString: function() {
            return "{ a: " + this.zpp_inner.a + " b: " + this.zpp_inner.b + " c: " + this.zpp_inner.c + " d: " + this.zpp_inner.d + " tx: " + this.zpp_inner.tx + " ty: " + this.zpp_inner.ty + " }"
        },
        equiorthogonal: function() {
            if (this.singular()) return !1;
            var a = this.zpp_inner.a * this.zpp_inner.b + this.zpp_inner.c *
                this.zpp_inner.d;
            return a * a < l.epsilon ? (a = this.zpp_inner.a * this.zpp_inner.a + this.zpp_inner.b * this.zpp_inner.b - this.zpp_inner.c * this.zpp_inner.c - this.zpp_inner.d * this.zpp_inner.d, a * a < l.epsilon) : !1
        },
        __class__: Ig,
        __properties__: {
            set_ty: "set_ty",
            set_tx: "set_tx",
            set_d: "set_d",
            set_c: "set_c",
            set_b: "set_b",
            set_a: "set_a"
        }
    };
    var yh = function() {
        this.zpp_inner = null
    };
    g["nape.geom.MatMN"] = yh;
    yh.__name__ = ["nape", "geom", "MatMN"];
    yh.prototype = {
        toString: function() {
            for (var a = "{ ", b = !0, c = 0, d = this.zpp_inner.m; c < d;) {
                var e =
                    c++;
                b || (a += "; ");
                for (var b = !1, h = 0, f = this.zpp_inner.n; h < f;) var i = h++,
                    a = a + (this.zpp_inner.x[e * this.zpp_inner.n + i] + " ")
            }
            return a + "}"
        },
        __class__: yh
    };
    var zh = function() {
        this.zpp_inner = null
    };
    g["nape.geom.RayResult"] = zh;
    zh.__name__ = ["nape", "geom", "RayResult"];
    zh.prototype = {
        toString: function() {
            return "{ shape: " + B.string(this.zpp_inner.shape) + " distance: " + this.zpp_inner.toiDistance + " ?inner: " + B.string(this.zpp_inner.inner) + " }"
        },
        __class__: zh
    };
    var Tb = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i =
            0;
        this.zpp_inner = null
    };
    g["nape.geom.RayResultIterator"] = Tb;
    Tb.__name__ = ["nape", "geom", "RayResultIterator"];
    Tb.get = function(a) {
        var b;
        null == Tb.zpp_pool ? (ge.internal = !0, b = new Tb, ge.internal = !1) : (b = Tb.zpp_pool, Tb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Tb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Tb.zpp_pool;
            Tb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Tb
    };
    var Ah = function() {
        this.zpp_inner = null
    };
    g["nape.geom.RayResultList"] = Ah;
    Ah.__name__ = ["nape", "geom", "RayResultList"];
    Ah.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() -
                1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Tb.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Ah,
        __properties__: {
            get_length: "get_length"
        }
    };
    var K = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.zpp_inner = this.zpp_pool = null;
        this.zpp_inner = H.get(a, b, null);
        this.zpp_inner.outer = this
    };
    g["nape.geom.Vec2"] = K;
    K.__name__ = ["nape", "geom", "Vec2"];
    K.get = function(a, b, c) {
        null == c && (c = !1);
        null == b && (b = 0);
        null == a && (a = 0);
        var d;
        null == Ub.poolVec2 ? d = new K : (d = Ub.poolVec2, Ub.poolVec2 = d.zpp_pool, d.zpp_pool = null);
        if (null == d.zpp_inner) d.zpp_inner = H.get(a, b, null), d.zpp_inner.outer = d;
        else {
            var e;
            d.zpp_inner.validate();
            if (e = d.zpp_inner.x == a) d.zpp_inner.validate(), e = d.zpp_inner.y == b;
            e || (d.zpp_inner.x = a, d.zpp_inner.y = b, d.zpp_inner.invalidate());
            d
        }
        d.zpp_inner.weak = c;
        return d
    };
    K.prototype = {
        dispose: function() {
            var a = this.zpp_inner;
            this.zpp_inner = this.zpp_inner.outer = null;
            this.zpp_pool = Ub.poolVec2;
            Ub.poolVec2 = this;
            null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
            a._isimmutable = null;
            a._validate = null;
            a._invalidate = null;
            a.next = H.zpp_pool;
            H.zpp_pool = a
        },
        get_x: function() {
            this.zpp_inner.validate();
            return this.zpp_inner.x
        },
        get_y: function() {
            this.zpp_inner.validate();
            return this.zpp_inner.y
        },
        set: function(a) {
            var b = this.setxy(function() {
                a.zpp_inner.validate();
                return a.zpp_inner.x
            }(this), function() {
                a.zpp_inner.validate();
                return a.zpp_inner.y
            }(this));
            a.zpp_inner.weak ? (a.dispose(), !0) : !1;
            return b
        },
        setxy: function(a, b) {
            var c;
            this.zpp_inner.validate();
            if (c = this.zpp_inner.x == a) this.zpp_inner.validate(), c = this.zpp_inner.y == b;
            c || (this.zpp_inner.x = a, this.zpp_inner.y = b, this.zpp_inner.invalidate());
            return this
        },
        sub: function(a, b) {
            null ==
                b && (b = !1);
            var c = K.get(function(a) {
                a.zpp_inner.validate();
                return a.zpp_inner.x
            }(this) - function() {
                a.zpp_inner.validate();
                return a.zpp_inner.x
            }(this), function(a) {
                a.zpp_inner.validate();
                return a.zpp_inner.y
            }(this) - function() {
                a.zpp_inner.validate();
                return a.zpp_inner.y
            }(this), b);
            a.zpp_inner.weak ? (a.dispose(), !0) : !1;
            return c
        },
        muleq: function(a) {
            return this.setxy(function(a) {
                a.zpp_inner.validate();
                return a.zpp_inner.x
            }(this) * a, function(a) {
                a.zpp_inner.validate();
                return a.zpp_inner.y
            }(this) * a)
        },
        toString: function() {
            this.zpp_inner.validate();
            return this.zpp_inner.toString()
        },
        __class__: K,
        __properties__: {
            get_y: "get_y",
            get_x: "get_x"
        }
    };
    var Vb = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.geom.Vec2Iterator"] = Vb;
    Vb.__name__ = ["nape", "geom", "Vec2Iterator"];
    Vb.get = function(a) {
        var b;
        null == Vb.zpp_pool ? (Rd.internal = !0, b = new Vb, Rd.internal = !1) : (b = Vb.zpp_pool, Vb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Vb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a =
                this.zpp_inner.zpp_gl();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Vb.zpp_pool;
            Vb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Vb
    };
    var Wb = function() {
        this.zpp_inner = null;
        this.zpp_inner = new Rd;
        this.zpp_inner.outer = this
    };
    g["nape.geom.Vec2List"] = Wb;
    Wb.__name__ = ["nape", "geom", "Vec2List"];
    Wb.prototype = {
        zpp_gl: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length =
                this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        zpp_vm: function() {
            this.zpp_inner.valmod()
        },
        at: function(a) {
            this.zpp_vm();
            this.zpp_inner.reverse_flag && (a = this.zpp_gl() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.wrapper()
        },
        push: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_vm();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = this.empty() ? null : this.zpp_inner.inner.iterator_at(this.zpp_gl() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        empty: function() {
            return 0 == this.zpp_gl()
        },
        iterator: function() {
            this.zpp_vm();
            return Vb.get(this)
        },
        toString: function() {
            for (var a = "[", b = !0, c = this.iterator(); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Wb
    };
    var Fb = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.zpp_inner = this.zpp_pool = null;
        this.zpp_inner = new Jg;
        this.zpp_inner.outer = this;
        this.zpp_inner.x = a;
        this.zpp_inner.validate();
        this.zpp_inner.x;
        this.zpp_inner.y = b;
        this.zpp_inner.validate();
        this.zpp_inner.y;
        this.zpp_inner.z = c;
        this.zpp_inner.validate();
        this.zpp_inner.z
    };
    g["nape.geom.Vec3"] = Fb;
    Fb.__name__ = ["nape", "geom", "Vec3"];
    Fb.get = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        var d;
        null == Ub.poolVec3 ? d = new Fb : (d = Ub.poolVec3, Ub.poolVec3 = d.zpp_pool, d.zpp_pool = null);
        d.setxyz(a, b, c);
        d.zpp_inner.immutable = !1;
        d.zpp_inner._validate = null;
        return d
    };
    Fb.prototype = {
        set_x: function(a) {
            this.zpp_inner.x = a;
            this.zpp_inner.validate();
            return this.zpp_inner.x
        },
        get_y: function() {
            this.zpp_inner.validate();
            return this.zpp_inner.y
        },
        set_y: function(a) {
            this.zpp_inner.y = a;
            this.zpp_inner.validate();
            return this.zpp_inner.y
        },
        set_z: function(a) {
            this.zpp_inner.z = a;
            this.zpp_inner.validate();
            return this.zpp_inner.z
        },
        dispose: function() {
            this.zpp_pool = Ub.poolVec3;
            Ub.poolVec3 = this
        },
        setxyz: function(a, b, c) {
            this.zpp_inner.x = a;
            this.zpp_inner.validate();
            this.zpp_inner.x;
            this.zpp_inner.y = b;
            this.zpp_inner.validate();
            this.zpp_inner.y;
            this.zpp_inner.z = c;
            this.zpp_inner.validate();
            this.zpp_inner.z;
            return this
        },
        toString: function() {
            this.zpp_inner.validate();
            var a = "{ x: " + this.zpp_inner.x + " y: ";
            this.zpp_inner.validate();
            a = a + this.zpp_inner.y + " z: ";
            this.zpp_inner.validate();
            return a + this.zpp_inner.z + " }"
        },
        __class__: Fb,
        __properties__: {
            set_z: "set_z",
            set_y: "set_y",
            get_y: "get_y",
            set_x: "set_x"
        }
    };
    var Ad = function() {};
    g["nape.geom.Winding"] = Ad;
    Ad.__name__ = ["nape", "geom", "Winding"];
    Ad.prototype = {
        toString: function() {
            var a;
            null == f.Winding_UNDEFINED && (f.internal = !0, f.Winding_UNDEFINED = new Ad, f.internal = !1);
            this == f.Winding_UNDEFINED ? a = "UNDEFINED" : (null == f.Winding_CLOCKWISE &&
                (f.internal = !0, f.Winding_CLOCKWISE = new Ad, f.internal = !1), this == f.Winding_CLOCKWISE ? a = "CLOCKWISE" : (null == f.Winding_ANTICLOCKWISE && (f.internal = !0, f.Winding_ANTICLOCKWISE = new Ad, f.internal = !1), a = this == f.Winding_ANTICLOCKWISE ? "ANTICLOCKWISE" : ""));
            return a
        },
        __class__: Ad
    };
    var nc = function() {
        this.zpp_inner_i = null
    };
    g["nape.phys.Interactor"] = nc;
    nc.__name__ = ["nape", "phys", "Interactor"];
    nc.prototype = {
        get_userData: function() {
            null == this.zpp_inner_i.userData && (this.zpp_inner_i.userData = {});
            return this.zpp_inner_i.userData
        },
        get_castBody: function() {
            return null != this.zpp_inner_i.ibody ? this.zpp_inner_i.ibody.outer : null
        },
        get_cbTypes: function() {
            null == this.zpp_inner_i.wrap_cbTypes && this.zpp_inner_i.setupcbTypes();
            return this.zpp_inner_i.wrap_cbTypes
        },
        toString: function() {
            return ""
        },
        __class__: nc,
        __properties__: {
            get_cbTypes: "get_cbTypes",
            get_castBody: "get_castBody",
            get_userData: "get_userData"
        }
    };
    var ca = function(a, b) {
        this.zpp_inner_i = this.zpp_inner = null;
        this.zpp_inner = new Gb;
        this.zpp_inner.outer = this;
        this.zpp_inner.outer_i = this;
        this.zpp_inner_i = this.zpp_inner;
        null != b ? (b.zpp_inner.validate(), this.zpp_inner.posx = b.zpp_inner.x, b.zpp_inner.validate(), this.zpp_inner.posy = b.zpp_inner.y) : (this.zpp_inner.posx = 0, this.zpp_inner.posy = 0);
        this.set_type(null == a ? function() {
            null == f.BodyType_DYNAMIC && (f.internal = !0, f.BodyType_DYNAMIC = new Ka, f.internal = !1);
            return f.BodyType_DYNAMIC
        }(this) : a);
        null != b && (b.zpp_inner.weak ? (b.dispose(), !0) : !1);
        this.zpp_inner_i.insert_cbtype(ya.ANY_BODY.zpp_inner)
    };
    g["nape.phys.Body"] = ca;
    ca.__name__ = ["nape", "phys",
        "Body"
    ];
    ca.__super__ = nc;
    ca.prototype = m(nc.prototype, {
        set_type: function(a) {
            this.zpp_inner.immutable_midstep("Body::type");
            Gb.types[this.zpp_inner.type] != a && (null == f.BodyType_DYNAMIC && (f.internal = !0, f.BodyType_DYNAMIC = new Ka, f.internal = !1), a == f.BodyType_DYNAMIC ? a = f.id_BodyType_DYNAMIC : (null == f.BodyType_KINEMATIC && (f.internal = !0, f.BodyType_KINEMATIC = new Ka, f.internal = !1), a = a == f.BodyType_KINEMATIC ? f.id_BodyType_KINEMATIC : f.id_BodyType_STATIC), a == f.id_BodyType_STATIC && null != this.zpp_inner.space && (this.zpp_inner.velx =
                0, this.zpp_inner.vely = 0, this.zpp_inner.angvel = 0), this.zpp_inner.invalidate_type(), null != this.zpp_inner.space ? this.zpp_inner.space.transmitType(this.zpp_inner, a) : this.zpp_inner.type = a);
            return Gb.types[this.zpp_inner.type]
        },
        get_space: function() {
            return null == this.zpp_inner.space ? null : this.zpp_inner.space.outer
        },
        set_space: function(a) {
            this.zpp_inner.immutable_midstep("Body::space");
            if ((null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) != a) {
                if (null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer)) this.zpp_inner.component.woken = !1;
                if (null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer))(null == this.zpp_inner.space ? null : this.zpp_inner.space.outer).zpp_inner.wrap_bodies.remove(this);
                null != a && a.zpp_inner.wrap_bodies.add(this)
            }
            return null == this.zpp_inner.space ? null : this.zpp_inner.space.outer
        },
        get_position: function() {
            null == this.zpp_inner.wrap_pos && this.zpp_inner.setupPosition();
            return this.zpp_inner.wrap_pos
        },
        set_position: function(a) {
            null == this.zpp_inner.wrap_pos && this.zpp_inner.setupPosition();
            this.zpp_inner.wrap_pos.set(a);
            null == this.zpp_inner.wrap_pos && this.zpp_inner.setupPosition();
            return this.zpp_inner.wrap_pos
        },
        get_velocity: function() {
            null == this.zpp_inner.wrap_vel && this.zpp_inner.setupVelocity();
            return this.zpp_inner.wrap_vel
        },
        set_rotation: function(a) {
            this.zpp_inner.immutable_midstep("Body::rotation");
            this.zpp_inner.rot != a && (this.zpp_inner.rot = a, this.zpp_inner.invalidate_rot(), this.zpp_inner.wake());
            return this.zpp_inner.rot
        },
        applyImpulse: function(a, b, c) {
            null == c && (c = !1);
            if (c && this.zpp_inner.component.sleeping) return a.zpp_inner.weak ?
                (a.dispose(), !0) : !1, null != b && (b.zpp_inner.weak ? (b.dispose(), !0) : !1), this;
            this.zpp_inner.validate_mass();
            var d = this.zpp_inner.imass,
                e = this.zpp_inner,
                h = this.zpp_inner.velx;
            a.zpp_inner.validate();
            e.velx = h + a.zpp_inner.x * d;
            e = this.zpp_inner;
            h = this.zpp_inner.vely;
            a.zpp_inner.validate();
            e.vely = h + a.zpp_inner.y * d;
            if (null != b) {
                var n = 0,
                    d = 0;
                b.zpp_inner.validate();
                n = b.zpp_inner.x - this.zpp_inner.posx;
                b.zpp_inner.validate();
                d = b.zpp_inner.y - this.zpp_inner.posy;
                this.zpp_inner.validate_inertia();
                e = this.zpp_inner;
                h = this.zpp_inner.angvel;
                a.zpp_inner.validate();
                n *= a.zpp_inner.y;
                a.zpp_inner.validate();
                e.angvel = h + (n - a.zpp_inner.x * d) * this.zpp_inner.iinertia;
                b.zpp_inner.weak ? (b.dispose(), !0) : !1
            }
            c || this.zpp_inner.type == f.id_BodyType_DYNAMIC && this.zpp_inner.wake();
            a.zpp_inner.weak ? (a.dispose(), !0) : !1;
            return this
        },
        toString: function() {
            return (this.zpp_inner.world ? "(space::world" : "(" + (this.zpp_inner.type == f.id_BodyType_DYNAMIC ? "dynamic" : this.zpp_inner.type == f.id_BodyType_STATIC ? "static" : "kinematic")) + ")#" + this.zpp_inner_i.id
        },
        __class__: ca,
        __properties__: m(nc.prototype.__properties__, {
            set_rotation: "set_rotation",
            get_velocity: "get_velocity",
            set_position: "set_position",
            get_position: "get_position",
            set_space: "set_space",
            get_space: "get_space",
            set_type: "set_type"
        })
    });
    var gb = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.phys.BodyIterator"] = gb;
    gb.__name__ = ["nape", "phys", "BodyIterator"];
    gb.get = function(a) {
        var b;
        null == gb.zpp_pool ? (Xb.internal = !0, b = new gb, Xb.internal = !1) : (b = gb.zpp_pool, gb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    gb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = gb.zpp_pool;
            gb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: gb
    };
    var ub = function() {
        this.zpp_inner = null;
        this.zpp_inner = new Xb;
        this.zpp_inner.outer = this
    };
    g["nape.phys.BodyList"] = ub;
    ub.__name__ = ["nape", "phys", "BodyList"];
    ub.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        has: function(a) {
            this.zpp_inner.valmod();
            return this.zpp_inner.inner.has(a.zpp_inner)
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index !=
                    a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        push: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite,
                a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        unshift: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite,
                a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        pop: function() {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var a = null;
            if (this.zpp_inner.reverse_flag) {
                var a = this.zpp_inner.inner.head.elt,
                    b = a.outer;
                null != this.zpp_inner.subber && this.zpp_inner.subber(b);
                this.zpp_inner.dontremove || this.zpp_inner.inner.pop()
            } else {
                null != this.zpp_inner.at_ite && null == this.zpp_inner.at_ite.next && (this.zpp_inner.at_ite =
                    null);
                var b = 1 == this.get_length() ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 2),
                    a = null == b ? this.zpp_inner.inner.head.elt : b.next.elt,
                    c = a.outer;
                null != this.zpp_inner.subber && this.zpp_inner.subber(c);
                this.zpp_inner.dontremove || this.zpp_inner.inner.erase(b)
            }
            this.zpp_inner.invalidate();
            return a.outer
        },
        shift: function() {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var a = null;
            if (this.zpp_inner.reverse_flag) {
                null != this.zpp_inner.at_ite && null == this.zpp_inner.at_ite.next && (this.zpp_inner.at_ite =
                    null);
                var b;
                b = 1 == this.get_length() ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 2);
                var a = null == b ? this.zpp_inner.inner.head.elt : b.next.elt,
                    c = a.outer;
                null != this.zpp_inner.subber && this.zpp_inner.subber(c);
                this.zpp_inner.dontremove || this.zpp_inner.inner.erase(b)
            } else a = this.zpp_inner.inner.head.elt, b = a.outer, null != this.zpp_inner.subber && this.zpp_inner.subber(b), this.zpp_inner.dontremove || this.zpp_inner.inner.pop();
            this.zpp_inner.invalidate();
            return a.outer
        },
        add: function(a) {
            return this.zpp_inner.reverse_flag ?
                this.push(a) : this.unshift(a)
        },
        remove: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            b = !1;
            for (var c = this.zpp_inner.inner.head; null != c;) {
                if (c.elt == a.zpp_inner) {
                    b = !0;
                    break
                }
                c = c.next
            }
            b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
            return b
        },
        clear: function() {
            if (this.zpp_inner.reverse_flag)
                for (; null != this.zpp_inner.inner.head;) this.pop();
            else
                for (; null != this.zpp_inner.inner.head;) this.shift()
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = gb.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: ub,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Ka = function() {};
    g["nape.phys.BodyType"] = Ka;
    Ka.__name__ = ["nape", "phys", "BodyType"];
    Ka.prototype = {
        toString: function() {
            var a;
            null == f.BodyType_STATIC && (f.internal = !0, f.BodyType_STATIC = new Ka, f.internal = !1);
            this == f.BodyType_STATIC ? a = "STATIC" :
                (null == f.BodyType_DYNAMIC && (f.internal = !0, f.BodyType_DYNAMIC = new Ka, f.internal = !1), this == f.BodyType_DYNAMIC ? a = "DYNAMIC" : (null == f.BodyType_KINEMATIC && (f.internal = !0, f.BodyType_KINEMATIC = new Ka, f.internal = !1), a = this == f.BodyType_KINEMATIC ? "KINEMATIC" : ""));
            return a
        },
        __class__: Ka
    };
    var Kg = function() {
        this.zpp_inner = null
    };
    g["nape.phys.Compound"] = Kg;
    Kg.__name__ = ["nape", "phys", "Compound"];
    Kg.__super__ = nc;
    Kg.prototype = m(nc.prototype, {
        toString: function() {
            return "Compound" + this.zpp_inner_i.id
        },
        __class__: Kg
    });
    var Yb =
        function() {
            this.zpp_next = null;
            this.zpp_critical = !1;
            this.zpp_i = 0;
            this.zpp_inner = null
        };
    g["nape.phys.CompoundIterator"] = Yb;
    Yb.__name__ = ["nape", "phys", "CompoundIterator"];
    Yb.get = function(a) {
        var b;
        null == Yb.zpp_pool ? (oc.internal = !0, b = new Yb, oc.internal = !1) : (b = Yb.zpp_pool, Yb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Yb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next =
                Yb.zpp_pool;
            Yb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Yb
    };
    var Lg = function() {
        this.zpp_inner = null;
        this.zpp_inner = new oc;
        this.zpp_inner.outer = this
    };
    g["nape.phys.CompoundList"] = Lg;
    Lg.__name__ = ["nape", "phys", "CompoundList"];
    Lg.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        remove: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            b = !1;
            for (var c = this.zpp_inner.inner.head; null !=
                c;) {
                if (c.elt == a.zpp_inner) {
                    b = !0;
                    break
                }
                c = c.next
            }
            b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
            return b
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Yb.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Lg,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Bh = function() {
        this.zpp_inner =
            null
    };
    g["nape.phys.FluidProperties"] = Bh;
    Bh.__name__ = ["nape", "phys", "FluidProperties"];
    Bh.prototype = {
        toString: function() {
            return "{ density: " + 1E3 * this.zpp_inner.density + " viscosity: " + this.zpp_inner.viscosity + " gravity: " + B.string(this.zpp_inner.wrap_gravity) + " }"
        },
        __class__: Bh
    };
    var kd = function() {};
    g["nape.phys.GravMassMode"] = kd;
    kd.__name__ = ["nape", "phys", "GravMassMode"];
    kd.prototype = {
        toString: function() {
            var a;
            null == f.GravMassMode_DEFAULT && (f.internal = !0, f.GravMassMode_DEFAULT = new kd, f.internal = !1);
            this == f.GravMassMode_DEFAULT ? a = "DEFAULT" : (null == f.GravMassMode_FIXED && (f.internal = !0, f.GravMassMode_FIXED = new kd, f.internal = !1), this == f.GravMassMode_FIXED ? a = "FIXED" : (null == f.GravMassMode_SCALED && (f.internal = !0, f.GravMassMode_SCALED = new kd, f.internal = !1), a = this == f.GravMassMode_SCALED ? "SCALED" : ""));
            return a
        },
        __class__: kd
    };
    var Hf = function() {};
    g["nape.phys.InertiaMode"] = Hf;
    Hf.__name__ = ["nape", "phys", "InertiaMode"];
    Hf.prototype = {
        toString: function() {
            var a;
            null == f.InertiaMode_DEFAULT && (f.internal = !0, f.InertiaMode_DEFAULT =
                new Hf, f.internal = !1);
            this == f.InertiaMode_DEFAULT ? a = "DEFAULT" : (null == f.InertiaMode_FIXED && (f.internal = !0, f.InertiaMode_FIXED = new Hf, f.internal = !1), a = this == f.InertiaMode_FIXED ? "FIXED" : "");
            return a
        },
        __class__: Hf
    };
    var Zb = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.phys.InteractorIterator"] = Zb;
    Zb.__name__ = ["nape", "phys", "InteractorIterator"];
    Zb.get = function(a) {
        var b;
        null == Zb.zpp_pool ? (he.internal = !0, b = new Zb, he.internal = !1) : (b = Zb.zpp_pool, Zb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Zb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Zb.zpp_pool;
            Zb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Zb
    };
    var Ch = function() {
        this.zpp_inner = null
    };
    g["nape.phys.InteractorList"] = Ch;
    Ch.__name__ = ["nape", "phys", "InteractorList"];
    Ch.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer_i
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Zb.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Ch,
        __properties__: {
            get_length: "get_length"
        }
    };
    var If = function() {};
    g["nape.phys.MassMode"] = If;
    If.__name__ = ["nape", "phys", "MassMode"];
    If.prototype = {
        toString: function() {
            var a;
            null == f.MassMode_DEFAULT && (f.internal = !0, f.MassMode_DEFAULT = new If, f.internal = !1);
            this == f.MassMode_DEFAULT ? a =
                "DEFAULT" : (null == f.MassMode_FIXED && (f.internal = !0, f.MassMode_FIXED = new If, f.internal = !1), a = this == f.MassMode_FIXED ? "FIXED" : "");
            return a
        },
        __class__: If
    };
    var Mb = function(a, b, c, d, e) {
        null == e && (e = 0.001);
        null == d && (d = 1);
        null == c && (c = 2);
        null == b && (b = 1);
        null == a && (a = 0);
        this.zpp_inner = null;
        null == S.zpp_pool ? this.zpp_inner = new S : (this.zpp_inner = S.zpp_pool, S.zpp_pool = this.zpp_inner.next, this.zpp_inner.next = null);
        null;
        this.zpp_inner.outer = this;
        a != this.zpp_inner.elasticity && (this.zpp_inner.elasticity = a / 1, this.zpp_inner.invalidate(S.WAKE |
            S.ARBITERS));
        this.zpp_inner.elasticity;
        b != this.zpp_inner.dynamicFriction && (this.zpp_inner.dynamicFriction = b / 1, this.zpp_inner.invalidate(S.WAKE | S.ANGDRAG | S.ARBITERS));
        this.zpp_inner.dynamicFriction;
        c != this.zpp_inner.staticFriction && (this.zpp_inner.staticFriction = c / 1, this.zpp_inner.invalidate(S.WAKE | S.ARBITERS));
        this.zpp_inner.staticFriction;
        d != 1E3 * this.zpp_inner.density && (this.zpp_inner.density = d / 1E3, this.zpp_inner.invalidate(S.WAKE | S.PROPS));
        1E3 * this.zpp_inner.density;
        e != this.zpp_inner.rollingFriction &&
            (this.zpp_inner.rollingFriction = e / 1, this.zpp_inner.invalidate(S.WAKE | S.ARBITERS));
        this.zpp_inner.rollingFriction
    };
    g["nape.phys.Material"] = Mb;
    Mb.__name__ = ["nape", "phys", "Material"];
    Mb.ice = function() {
        return new Mb(0.3, 0.03, 0.1, 0.9, 1.0E-4)
    };
    Mb.sand = function() {
        return new Mb(-1, 0.45, 0.6, 1.6, 16)
    };
    Mb.prototype = {
        toString: function() {
            return "{ elasticity: " + this.zpp_inner.elasticity + " dynamicFriction: " + this.zpp_inner.dynamicFriction + " staticFriction: " + this.zpp_inner.staticFriction + " density: " + 1E3 * this.zpp_inner.density +
                " rollingFriction: " + this.zpp_inner.rollingFriction + " }"
        },
        __class__: Mb
    };
    var Hc = function() {
        this.zpp_inner_i = this.zpp_inner = null
    };
    g["nape.shape.Shape"] = Hc;
    Hc.__name__ = ["nape", "shape", "Shape"];
    Hc.__super__ = nc;
    Hc.prototype = m(nc.prototype, {
        transform: function(a) {
            this.zpp_inner.immutable_midstep("Shape::transform()");
            this.zpp_inner.type == f.id_ShapeType_CIRCLE ? a.equiorthogonal() && this.zpp_inner.circle.__transform(a) : this.zpp_inner.polygon.__transform(a);
            return this
        },
        toString: function() {
            return (this.zpp_inner.type ==
                f.id_ShapeType_CIRCLE ? "Circle" : "Polygon") + "#" + this.zpp_inner_i.id
        },
        __class__: Hc
    });
    var fc = function(a, b, c, d) {
        this.zpp_inner_zn = null;
        Hc.call(this);
        this.zpp_inner_zn = new Jf;
        this.zpp_inner_zn.outer = this;
        this.zpp_inner_zn.outer_zn = this;
        this.zpp_inner_i = this.zpp_inner = this.zpp_inner_zn;
        this.zpp_inner_i.outer_i = this;
        this.zpp_inner.immutable_midstep("Circle::radius");
        a != this.zpp_inner_zn.radius && (this.zpp_inner_zn.radius = a, this.zpp_inner_zn.invalidate_radius());
        this.zpp_inner_zn.radius;
        null == b ? (this.zpp_inner.localCOMx =
            0, this.zpp_inner.localCOMy = 0) : (b.zpp_inner.validate(), this.zpp_inner.localCOMx = b.zpp_inner.x, b.zpp_inner.validate(), this.zpp_inner.localCOMy = b.zpp_inner.y, b.zpp_inner.weak ? (b.dispose(), !0) : !1);
        null == c ? (null == S.zpp_pool ? this.zpp_inner.material = new S : (this.zpp_inner.material = S.zpp_pool, S.zpp_pool = this.zpp_inner.material.next, this.zpp_inner.material.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::material"), this.zpp_inner.setMaterial(c.zpp_inner), this.zpp_inner.material.wrapper());
        null == d ?
            (null == Ma.zpp_pool ? this.zpp_inner.filter = new Ma : (this.zpp_inner.filter = Ma.zpp_pool, Ma.zpp_pool = this.zpp_inner.filter.next, this.zpp_inner.filter.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::filter"), this.zpp_inner.setFilter(d.zpp_inner), this.zpp_inner.filter.wrapper());
        this.zpp_inner_i.insert_cbtype(ya.ANY_SHAPE.zpp_inner)
    };
    g["nape.shape.Circle"] = fc;
    fc.__name__ = ["nape", "shape", "Circle"];
    fc.__super__ = Hc;
    fc.prototype = m(Hc.prototype, {
        __class__: fc
    });
    var Mg = function() {
        this.zpp_inner = null
    };
    g["nape.shape.Edge"] = Mg;
    Mg.__name__ = ["nape", "shape", "Edge"];
    Mg.prototype = {
        toString: function() {
            if (null == this.zpp_inner.polygon) return "Edge(object-pooled)";
            if (null == this.zpp_inner.polygon.body) return this.zpp_inner.polygon.validate_laxi(), "{ localNormal : " + ("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " }";
            this.zpp_inner.polygon.validate_gaxi();
            return "{ localNormal : " + ("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " worldNormal : " + ("{ x: " + this.zpp_inner.gnormx +
                " y: " + this.zpp_inner.gnormy + " }") + " }"
        },
        __class__: Mg
    };
    var Hb = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.shape.EdgeIterator"] = Hb;
    Hb.__name__ = ["nape", "shape", "EdgeIterator"];
    Hb.get = function(a) {
        var b;
        null == Hb.zpp_pool ? (ie.internal = !0, b = new Hb, ie.internal = !1) : (b = Hb.zpp_pool, Hb.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    Hb.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = Hb.zpp_pool;
            Hb.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: Hb
    };
    var Dh = function() {
        this.zpp_inner = null
    };
    g["nape.shape.EdgeList"] = Dh;
    Dh.__name__ = ["nape", "shape", "EdgeList"];
    Dh.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && a != this.get_length() - 1 && (a = this.get_length() - 2 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.wrapper()
        },
        toString: function() {
            var a = "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = Hb.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Dh,
        __properties__: {
            get_length: "get_length"
        }
    };
    var T = function(a, b, c) {
        this.zpp_inner_zn = null;
        Hc.call(this);
        this.zpp_inner_zn = new Kf;
        this.zpp_inner_zn.outer = this;
        this.zpp_inner_zn.outer_zn = this;
        this.zpp_inner_i = this.zpp_inner = this.zpp_inner_zn;
        this.zpp_inner_i.outer_i = this;
        if (a instanceof Array && null == a.__enum__)
            for (var d = 0; d < a.length;) {
                var e = a[d];
                ++d;
                var h = e;
                null == this.zpp_inner_zn.wrap_lverts &&
                    this.zpp_inner_zn.getlverts();
                this.zpp_inner_zn.wrap_lverts.push(K.get(function() {
                    h.zpp_inner.validate();
                    return h.zpp_inner.x
                }(this), function() {
                    h.zpp_inner.validate();
                    return h.zpp_inner.y
                }(this), !1))
            } else if (aa.__instanceof(a, Wb))
                for (d = a.iterator(); d.hasNext();) {
                    var f;
                    d.zpp_critical = !1;
                    f = d.zpp_inner.at(d.zpp_i++);
                    null == this.zpp_inner_zn.wrap_lverts && this.zpp_inner_zn.getlverts();
                    this.zpp_inner_zn.wrap_lverts.push(K.get(function() {
                        f.zpp_inner.validate();
                        return f.zpp_inner.x
                    }(this), function() {
                        f.zpp_inner.validate();
                        return f.zpp_inner.y
                    }(this), !1))
                } else if (aa.__instanceof(a, Hg) && (d = a.zpp_inner.vertices, null != d)) {
                    e = d;
                    do {
                        var i = K.get(e.x, e.y, null),
                            e = e.next;
                        null == this.zpp_inner_zn.wrap_lverts && this.zpp_inner_zn.getlverts();
                        this.zpp_inner_zn.wrap_lverts.push(K.get(function() {
                            i.zpp_inner.validate();
                            return i.zpp_inner.x
                        }(this), function() {
                            i.zpp_inner.validate();
                            return i.zpp_inner.y
                        }(this), !1));
                        i.dispose()
                    } while (e != d)
                }
        if (a instanceof Array && null == a.__enum__)
            for (d = 0; d < a.length;) {
                var e = a[d],
                    j;
                if (j = e.zpp_inner.weak) e.dispose(),
                    j = !0;
                j ? a.splice(d, 1) : d++
            } else if (aa.__instanceof(a, Wb)) {
                null != a.zpp_inner._validate && a.zpp_inner._validate();
                a = a.zpp_inner.inner;
                d = null;
                for (e = a.head; null != e;) j = e.elt, j.outer.zpp_inner.weak ? (e = a.erase(d), j.outer.zpp_inner.weak ? (j.outer.dispose(), !0) : !1) : (d = e, e = e.next)
            }
        null == b ? (null == S.zpp_pool ? this.zpp_inner.material = new S : (this.zpp_inner.material = S.zpp_pool, S.zpp_pool = this.zpp_inner.material.next, this.zpp_inner.material.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::material"), this.zpp_inner.setMaterial(b.zpp_inner),
            this.zpp_inner.material.wrapper());
        null == c ? (null == Ma.zpp_pool ? this.zpp_inner.filter = new Ma : (this.zpp_inner.filter = Ma.zpp_pool, Ma.zpp_pool = this.zpp_inner.filter.next, this.zpp_inner.filter.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::filter"), this.zpp_inner.setFilter(c.zpp_inner), this.zpp_inner.filter.wrapper());
        this.zpp_inner_i.insert_cbtype(ya.ANY_SHAPE.zpp_inner)
    };
    g["nape.shape.Polygon"] = T;
    T.__name__ = ["nape", "shape", "Polygon"];
    T.rect = function(a, b, c, d, e) {
        null == e && (e = !1);
        return [K.get(a,
            b, e), K.get(a + c, b, e), K.get(a + c, b + d, e), K.get(a, b + d, e)]
    };
    T.box = function(a, b, c) {
        null == c && (c = !1);
        return T.rect(-a / 2, -b / 2, a, b, c)
    };
    T.__super__ = Hc;
    T.prototype = m(Hc.prototype, {
        __class__: T
    });
    var $b = function() {
        this.zpp_next = null;
        this.zpp_critical = !1;
        this.zpp_i = 0;
        this.zpp_inner = null
    };
    g["nape.shape.ShapeIterator"] = $b;
    $b.__name__ = ["nape", "shape", "ShapeIterator"];
    $b.get = function(a) {
        var b;
        null == $b.zpp_pool ? (Ic.internal = !0, b = new $b, Ic.internal = !1) : (b = $b.zpp_pool, $b.zpp_pool = b.zpp_next);
        b.zpp_i = 0;
        b.zpp_inner = a;
        b.zpp_critical = !1;
        return b
    };
    $b.prototype = {
        hasNext: function() {
            this.zpp_inner.zpp_inner.valmod();
            var a = this.zpp_inner.get_length();
            this.zpp_critical = !0;
            if (this.zpp_i < a) return !0;
            this.zpp_next = $b.zpp_pool;
            $b.zpp_pool = this;
            this.zpp_inner = null;
            return !1
        },
        next: function() {
            this.zpp_critical = !1;
            return this.zpp_inner.at(this.zpp_i++)
        },
        __class__: $b
    };
    var Ng = function() {
        this.zpp_inner = null;
        this.zpp_inner = new Ic;
        this.zpp_inner.outer = this
    };
    g["nape.shape.ShapeList"] = Ng;
    Ng.__name__ = ["nape", "shape", "ShapeList"];
    Ng.prototype = {
        get_length: function() {
            this.zpp_inner.valmod();
            this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
            return this.zpp_inner.user_length
        },
        at: function(a) {
            this.zpp_inner.valmod();
            this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
            if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
            else
                for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
            return this.zpp_inner.at_ite.elt.outer
        },
        push: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder &&
                this.zpp_inner.post_adder(a);
            return b
        },
        unshift: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(),
                null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        add: function(a) {
            return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
        },
        remove: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_inner.valmod();
            var b;
            b = !1;
            for (var c = this.zpp_inner.inner.head; null != c;) {
                if (c.elt == a.zpp_inner) {
                    b = !0;
                    break
                }
                c = c.next
            }
            b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
            return b
        },
        toString: function() {
            var a =
                "[",
                b = !0,
                c;
            this.zpp_inner.valmod();
            for (c = $b.get(this); c.hasNext();) {
                var d;
                c.zpp_critical = !1;
                d = c.zpp_inner.at(c.zpp_i++);
                b || (a += ",");
                a = null == d ? a + "NULL" : a + d.toString();
                b = !1
            }
            return a + "]"
        },
        __class__: Ng,
        __properties__: {
            get_length: "get_length"
        }
    };
    var Lf = function() {};
    g["nape.shape.ShapeType"] = Lf;
    Lf.__name__ = ["nape", "shape", "ShapeType"];
    Lf.prototype = {
        toString: function() {
            var a;
            null == f.ShapeType_CIRCLE && (f.internal = !0, f.ShapeType_CIRCLE = new Lf, f.internal = !1);
            this == f.ShapeType_CIRCLE ? a = "CIRCLE" : (null == f.ShapeType_POLYGON &&
                (f.internal = !0, f.ShapeType_POLYGON = new Lf, f.internal = !1), a = this == f.ShapeType_POLYGON ? "POLYGON" : "");
            return a
        },
        __class__: Lf
    };
    var ld = function() {};
    g["nape.shape.ValidationResult"] = ld;
    ld.__name__ = ["nape", "shape", "ValidationResult"];
    ld.prototype = {
        toString: function() {
            var a;
            null == f.ValidationResult_VALID && (f.internal = !0, f.ValidationResult_VALID = new ld, f.internal = !1);
            this == f.ValidationResult_VALID ? a = "VALID" : (null == f.ValidationResult_DEGENERATE && (f.internal = !0, f.ValidationResult_DEGENERATE = new ld, f.internal = !1), this == f.ValidationResult_DEGENERATE ? a = "DEGENERATE" : (null == f.ValidationResult_CONCAVE && (f.internal = !0, f.ValidationResult_CONCAVE = new ld, f.internal = !1), this == f.ValidationResult_CONCAVE ? a = "CONCAVE" : (null == f.ValidationResult_SELF_INTERSECTING && (f.internal = !0, f.ValidationResult_SELF_INTERSECTING = new ld, f.internal = !1), a = this == f.ValidationResult_SELF_INTERSECTING ? "SELF_INTERSECTING" : "")));
            return a
        },
        __class__: ld
    };
    var md = function() {};
    g["nape.space.Broadphase"] = md;
    md.__name__ = ["nape", "space", "Broadphase"];
    md.prototype = {
        toString: function() {
            var a;
            null == f.Broadphase_DYNAMIC_AABB_TREE && (f.internal = !0, f.Broadphase_DYNAMIC_AABB_TREE = new md, f.internal = !1);
            this == f.Broadphase_DYNAMIC_AABB_TREE ? a = "DYNAMIC_AABB_TREE" : (null == f.Broadphase_SWEEP_AND_PRUNE && (f.internal = !0, f.Broadphase_SWEEP_AND_PRUNE = new md, f.internal = !1), a = this == f.Broadphase_SWEEP_AND_PRUNE ? "SWEEP_AND_PRUNE" : "");
            return a
        },
        __class__: md
    };
    var Zf = function(a, b) {
        this.zpp_inner = null;
        this.zpp_inner = new Og(null == a ? null : a.zpp_inner, b);
        this.zpp_inner.outer =
            this;
        null != a && (a.zpp_inner.weak ? (a.dispose(), !0) : !1)
    };
    g["nape.space.Space"] = Zf;
    Zf.__name__ = ["nape", "space", "Space"];
    Zf.prototype = {
        clear: function() {
            this.zpp_inner.clear()
        },
        step: function(a, b, c) {
            null == c && (c = 10);
            null == b && (b = 10);
            this.zpp_inner.step(a, b, c)
        },
        bodiesUnderPoint: function(a, b, c) {
            b = this.zpp_inner.bodiesUnderPoint(function() {
                a.zpp_inner.validate();
                return a.zpp_inner.x
            }(this), function() {
                a.zpp_inner.validate();
                return a.zpp_inner.y
            }(this), null == b ? null : b.zpp_inner, c);
            a.zpp_inner.weak ? (a.dispose(), !0) : !1;
            return b
        },
        bodiesInCircle: function(a, b, c, d, e) {
            null == c && (c = !1);
            b = this.zpp_inner.bodiesInCircle(a, b, c, null == d ? null : d.zpp_inner, e);
            a.zpp_inner.weak ? (a.dispose(), !0) : !1;
            return b
        },
        __class__: Zf
    };
    var Jc = function() {
        this.body = this.constraint = null;
        this.pre_swapped = !1;
        this.int1 = this.int2 = this.set = this.wrap_arbiters = this.pre_arbiter = null;
        this.length = 0;
        this.listener = this.next = this.prev = null;
        this.event = 0;
        this.outer_body = this.outer_con = this.outer_int = null;
        this.length = 0
    };
    g["zpp_nape.callbacks.ZPP_Callback"] =
        Jc;
    Jc.__name__ = ["zpp_nape", "callbacks", "ZPP_Callback"];
    Jc.prototype = {
        wrapper_body: function() {
            null == this.outer_body && (this.outer_body = new Af, this.outer_body.zpp_inner = this);
            return this.outer_body
        },
        wrapper_con: function() {
            null == this.outer_con && (this.outer_con = new Cf, this.outer_con.zpp_inner = this);
            return this.outer_con
        },
        wrapper_int: function() {
            null == this.outer_int && (this.outer_int = new Df, this.outer_int.zpp_inner = this);
            null == this.wrap_arbiters ? this.wrap_arbiters = Ec.get(this.set.arbiters, !0) : this.wrap_arbiters.zpp_inner.inner =
                this.set.arbiters;
            this.wrap_arbiters.zpp_inner.zip_length = !0;
            this.wrap_arbiters.zpp_inner.at_ite = null;
            return this.outer_int
        },
        push: function(a) {
            null != this.prev ? this.prev.next = a : this.next = a;
            a.prev = this.prev;
            a.next = null;
            this.prev = a;
            this.length++
        },
        pop: function() {
            var a = this.next;
            this.next = a.next;
            null == this.next ? this.prev = null : this.next.prev = null;
            this.length--;
            return a
        },
        empty: function() {
            return null == this.next
        },
        __class__: Jc
    };
    var J = function() {
        this.interactors = this.constraints = null;
        this.zip_conlisteners = !1;
        this.conlisteners = null;
        this.zip_bodylisteners = !1;
        this.bodylisteners = null;
        this.zip_listeners = !1;
        this.manager = this.cbpairs = this.listeners = null;
        this.id = 0;
        this.next = null;
        this.count = 0;
        this.cbTypes = null;
        this.cbTypes = new Kc;
        this.listeners = new Hd;
        this.zip_listeners = !0;
        this.bodylisteners = new He;
        this.zip_bodylisteners = !0;
        this.conlisteners = new Ie;
        this.zip_conlisteners = !0;
        this.constraints = new ed;
        this.interactors = new fd;
        this.id = Da.CbSet();
        this.cbpairs = new Pg
    };
    g["zpp_nape.callbacks.ZPP_CbSet"] = J;
    J.__name__ = ["zpp_nape",
        "callbacks", "ZPP_CbSet"
    ];
    J.setlt = function(a, b) {
        for (var c = a.cbTypes.head, d = b.cbTypes.head; null != c && null != d;) {
            var e = c.elt,
                h = d.elt;
            if (e.id < h.id) return !0;
            if (h.id < e.id) return !1;
            c = c.next;
            d = d.next
        }
        return null != d && null == c
    };
    J.get = function(a) {
        var b;
        null == J.zpp_pool ? b = new J : (b = J.zpp_pool, J.zpp_pool = b.next, b.next = null);
        null;
        for (var c = null, a = a.head; null != a;) {
            var d = a.elt,
                c = b.cbTypes.insert(c, d);
            d.cbsets.add(b);
            a = a.next
        }
        return b
    };
    J.single_intersection = function(a, b, c) {
        return a.manager.pair(a, b).single_intersection(c)
    };
    J.find_all = function(a, b, c, d) {
        a.manager.pair(a, b).forall(c, d)
    };
    J.prototype = {
        invalidate_pairs: function() {
            for (var a = this.cbpairs.head; null != a;) a.elt.zip_listeners = !0, a = a.next
        },
        realvalidate_listeners: function() {
            this.listeners.clear();
            for (var a = this.cbTypes.head; null != a;) {
                for (var b = null, c = this.listeners.head, d = a.elt.listeners.head; null != d;) {
                    var e = d.elt;
                    null != c && c.elt == e ? (d = d.next, b = c, c = c.next) : null == c || Ib.setlt(e, c.elt) ? (e.space == this.manager.space && (b = this.listeners.inlined_insert(b, e)), d = d.next) : (b =
                        c, c = c.next)
                }
                a = a.next
            }
        },
        realvalidate_bodylisteners: function() {
            this.bodylisteners.clear();
            for (var a = this.cbTypes.head; null != a;) {
                for (var b = null, c = this.bodylisteners.head, d = a.elt.bodylisteners.head; null != d;) {
                    var e = d.elt;
                    null != c && c.elt == e ? (d = d.next, b = c, c = c.next) : null == c || Ib.setlt(e, c.elt) ? (!e.options.excluded(this.cbTypes) && e.space == this.manager.space && (b = this.bodylisteners.inlined_insert(b, e)), d = d.next) : (b = c, c = c.next)
                }
                a = a.next
            }
        },
        realvalidate_conlisteners: function() {
            this.conlisteners.clear();
            for (var a =
                this.cbTypes.head; null != a;) {
                for (var b = null, c = this.conlisteners.head, d = a.elt.conlisteners.head; null != d;) {
                    var e = d.elt;
                    null != c && c.elt == e ? (d = d.next, b = c, c = c.next) : null == c || Ib.setlt(e, c.elt) ? (!e.options.excluded(this.cbTypes) && e.space == this.manager.space && (b = this.conlisteners.inlined_insert(b, e)), d = d.next) : (b = c, c = c.next)
                }
                a = a.next
            }
        },
        validate: function() {
            this.zip_listeners && (this.zip_listeners = !1, this.realvalidate_listeners());
            this.zip_bodylisteners && (this.zip_bodylisteners = !1, this.realvalidate_bodylisteners());
            this.zip_conlisteners && (this.zip_conlisteners = !1, this.realvalidate_conlisteners())
        },
        free: function() {
            this.listeners.clear();
            this.zip_listeners = !0;
            this.bodylisteners.clear();
            this.zip_bodylisteners = !0;
            this.conlisteners.clear();
            for (this.zip_conlisteners = !0; null != this.cbTypes.head;) this.cbTypes.pop_unsafe().cbsets.remove(this)
        },
        __class__: J
    };
    var ib = function() {
        this.listeners = null;
        this.zip_listeners = !1;
        this.a = this.b = this.next = null;
        this.listeners = new Hd
    };
    g["zpp_nape.callbacks.ZPP_CbSetPair"] = ib;
    ib.__name__ = ["zpp_nape", "callbacks", "ZPP_CbSetPair"];
    ib.get = function(a, b) {
        var c;
        null == ib.zpp_pool ? c = new ib : (c = ib.zpp_pool, ib.zpp_pool = c.next, c.next = null);
        c.zip_listeners = !0;
        J.setlt(a, b) ? (c.a = a, c.b = b) : (c.a = b, c.b = a);
        return c
    };
    ib.setlt = function(a, b) {
        return J.setlt(a.a, b.a) || a.a == b.a && J.setlt(a.b, b.b)
    };
    ib.prototype = {
        __validate: function() {
            this.listeners.clear();
            for (var a = this.a.listeners.head, b = this.b.listeners.head; null != a && null != b;) {
                var c = a.elt,
                    d = b.elt;
                c == d ? ((c.options1.compatible(this.a.cbTypes) && c.options2.compatible(this.b.cbTypes) ||
                    c.options2.compatible(this.a.cbTypes) && c.options1.compatible(this.b.cbTypes)) && this.listeners.add(c), a = a.next, b = b.next) : c.precedence > d.precedence || c.precedence == d.precedence && c.id > d.id ? a = a.next : b = b.next
            }
        },
        empty_intersection: function() {
            return null == this.listeners.head
        },
        single_intersection: function(a) {
            var b = this.listeners.head;
            return null != b && b.elt == a && null == b.next
        },
        forall: function(a, b) {
            for (var c = this.listeners.head; null != c;) {
                var d = c.elt;
                d.event == a && b(d);
                c = c.next
            }
        },
        __class__: ib
    };
    var f = function() {};
    g["zpp_nape.util.ZPP_Flags"] = f;
    f.__name__ = ["zpp_nape", "util", "ZPP_Flags"];
    var Ib = function() {
        this.body = this.constraint = this.interaction = this.space = null;
        this.id = this.type = this.event = this.precedence = 0;
        this.outer = null;
        this.id = Da.Listener()
    };
    g["zpp_nape.callbacks.ZPP_Listener"] = Ib;
    Ib.__name__ = ["zpp_nape", "callbacks", "ZPP_Listener"];
    Ib.setlt = function(a, b) {
        return a.precedence > b.precedence || a.precedence == b.precedence && a.id > b.id
    };
    Ib.prototype = {
        addedToSpace: function() {},
        removedFromSpace: function() {},
        __class__: Ib
    };
    var Qg = function() {
        this.outer_zn = this.options = this.handler = null
    };
    g["zpp_nape.callbacks.ZPP_BodyListener"] = Qg;
    Qg.__name__ = ["zpp_nape", "callbacks", "ZPP_BodyListener"];
    Qg.__super__ = Ib;
    Qg.prototype = m(Ib.prototype, {
        addedToSpace: function() {
            this.options.handler = E(this, this.cbtype_change);
            for (var a = this.options.includes.head; null != a;) a.elt.addbody(this), a = a.next
        },
        removedFromSpace: function() {
            for (var a = this.options.includes.head; null != a;) {
                var b = a.elt;
                b.bodylisteners.remove(this);
                b.invalidatebody();
                a = a.next
            }
            this.options.handler =
                null
        },
        cbtype_change: function(a, b, c) {
            this.removedFromSpace();
            this.options.effect_change(a, b, c);
            this.addedToSpace()
        },
        __class__: Qg
    });
    var Rg = function() {
        this.outer_zn = this.options = this.handler = null
    };
    g["zpp_nape.callbacks.ZPP_ConstraintListener"] = Rg;
    Rg.__name__ = ["zpp_nape", "callbacks", "ZPP_ConstraintListener"];
    Rg.__super__ = Ib;
    Rg.prototype = m(Ib.prototype, {
        addedToSpace: function() {
            this.options.handler = E(this, this.cbtype_change);
            for (var a = this.options.includes.head; null != a;) a.elt.addconstraint(this), a = a.next
        },
        removedFromSpace: function() {
            for (var a = this.options.includes.head; null != a;) {
                var b = a.elt;
                b.conlisteners.remove(this);
                b.invalidateconstraint();
                a = a.next
            }
            this.options.handler = null
        },
        cbtype_change: function(a, b, c) {
            this.removedFromSpace();
            this.options.effect_change(a, b, c);
            this.addedToSpace()
        },
        __class__: Rg
    });
    var Kc = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_CbType"] = Kc;
    Kc.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_CbType"];
    Kc.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == rb.zpp_pool ? b = new rb : (b = rb.zpp_pool, rb.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            var c;
            null == rb.zpp_pool ? c = new rb : (c = rb.zpp_pool, rb.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = rb.zpp_pool;
            rb.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b,
                c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = rb.zpp_pool;
            rb.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        has: function(a) {
            return this.inlined_has(a)
        },
        inlined_has: function(a) {
            var b;
            b = !1;
            for (var c = this.head; null != c;) {
                if (c.elt == a) {
                    b = !0;
                    break
                }
                c = c.next
            }
            return b
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 <
                a-- && null != b;) b = b.next;
            return b
        },
        __class__: Kc
    };
    var Wa = function(a, b, c, d) {
        this.handlerp = null;
        this.allowSleepingCallbacks = this.pure = !1;
        this.options1 = this.options2 = this.handleri = null;
        this.itype = 0;
        this.outer_zni = this.outer_znp = null;
        Ib.call(this);
        this.type = d;
        this.interaction = this;
        this.event = c;
        this.options1 = a.zpp_inner;
        this.options2 = b.zpp_inner;
        this.allowSleepingCallbacks = !1
    };
    g["zpp_nape.callbacks.ZPP_InteractionListener"] = Wa;
    Wa.__name__ = ["zpp_nape", "callbacks", "ZPP_InteractionListener"];
    Wa.__super__ = Ib;
    Wa.prototype = m(Ib.prototype, {
        CbSetset: function(a, b, c) {
            for (var d = Wa.UCbSet, e = Wa.VCbSet, h = Wa.WCbSet, a = a.head, f = b.head; null != a && null != f;) {
                var i = a.elt,
                    j = f.elt;
                i == j ? (h.inlined_add(i), a = a.next, f = f.next) : J.setlt(i, j) ? (d.inlined_add(i), a = a.next) : (e.inlined_add(j), f = f.next)
            }
            for (; null != a;) d.inlined_add(a.elt), a = a.next;
            for (; null != f;) e.inlined_add(f.elt), f = f.next;
            for (; null != d.head;) {
                a = d.pop_unsafe();
                for (f = b.head; null != f;) c(a, f.elt), f = f.next
            }
            for (; null != e.head;) {
                b = e.pop_unsafe();
                for (d = h.head; null != d;) c(b, d.elt),
                    d = d.next
            }
            for (; null != h.head;) {
                e = h.pop_unsafe();
                c(e, e);
                for (b = h.head; null != b;) c(e, b.elt), b = b.next
            }
        },
        CbTypeset: function(a, b, c) {
            for (var d = Wa.UCbType, e = Wa.VCbType, h = Wa.WCbType, a = a.head, f = b.head; null != a && null != f;) {
                var i = a.elt,
                    j = f.elt;
                i == j ? (h.inlined_add(i), a = a.next, f = f.next) : i.id < j.id ? (d.inlined_add(i), a = a.next) : (e.inlined_add(j), f = f.next)
            }
            for (; null != a;) d.inlined_add(a.elt), a = a.next;
            for (; null != f;) e.inlined_add(f.elt), f = f.next;
            for (; null != d.head;) {
                a = d.pop_unsafe();
                for (f = b.head; null != f;) c(a, f.elt), f = f.next
            }
            for (; null !=
                e.head;) {
                b = e.pop_unsafe();
                for (d = h.head; null != d;) c(b, d.elt), d = d.next
            }
            for (; null != h.head;) {
                e = h.pop_unsafe();
                c(e, e);
                for (b = h.head; null != b;) c(e, b.elt), b = b.next
            }
        },
        with_uniquesets: function(a) {
            var b = this,
                c;
            null == ia.zpp_pool ? c = new ia : (c = ia.zpp_pool, ia.zpp_pool = c.next, c.next = null);
            null;
            c.lt = ib.setlt;
            this.CbTypeset(this.options1.includes, this.options2.includes, function(a, d) {
                b.CbSetset(a.cbsets, d.cbsets, function(a, d) {
                    a.validate();
                    d.validate();
                    J.single_intersection(a, d, b) && c.try_insert(ib.get(a, d))
                })
            });
            c.clear_with(function(c) {
                a ?
                    b.space.freshListenerType(c.a, c.b) : b.space.nullListenerType(c.a, c.b);
                c.a = c.b = null;
                c.listeners.clear();
                c.next = ib.zpp_pool;
                ib.zpp_pool = c
            });
            var d = c;
            d.data = null;
            d.lt = null;
            d.swapped = null;
            d.next = ia.zpp_pool;
            ia.zpp_pool = d
        },
        with_union: function(a) {
            for (var b = this.options1.includes.head, c = this.options2.includes.head; null != b && null != c;) {
                var d = b.elt,
                    e = c.elt;
                d == e ? (a(d), b = b.next, c = c.next) : d.id < e.id ? (a(d), b = b.next) : (a(e), c = c.next)
            }
            for (; null != b;) a(b.elt), b = b.next;
            for (; null != c;) a(c.elt), c = c.next
        },
        addedToSpace: function() {
            var a =
                this,
                b = this.type == f.id_ListenerType_PRE;
            this.with_union(function(c) {
                c.addint(a);
                if (b)
                    for (c = c.interactors.head; null != c;) c.elt.wake(), c = c.next
            });
            this.options1.handler = E(this, this.cbtype_change1);
            this.options2.handler = E(this, this.cbtype_change2);
            this.with_uniquesets(!0)
        },
        removedFromSpace: function() {
            var a = this;
            this.with_uniquesets(!1);
            var b = this.type == f.id_ListenerType_PRE;
            this.with_union(function(c) {
                c.listeners.remove(a);
                c.invalidateint();
                if (b)
                    for (c = c.interactors.head; null != c;) c.elt.wake(), c = c.next
            });
            this.options1.handler = null;
            this.options2.handler = null
        },
        cbtype_change1: function(a, b, c) {
            this.cbtype_change(this.options1, a, b, c)
        },
        cbtype_change2: function(a, b, c) {
            this.cbtype_change(this.options2, a, b, c)
        },
        cbtype_change: function(a, b, c, d) {
            this.removedFromSpace();
            a.effect_change(b, c, d);
            this.addedToSpace();
            null
        },
        __class__: Wa
    });
    var Nd = function() {
        this.outer = this.handler = this.includes = this.excludes = this.wrap_includes = this.wrap_excludes = null;
        this.includes = new Kc;
        this.excludes = new Kc
    };
    g["zpp_nape.callbacks.ZPP_OptionType"] =
        Nd;
    Nd.__name__ = ["zpp_nape", "callbacks", "ZPP_OptionType"];
    Nd.argument = function(a) {
        return null == a ? new Pd : aa.__instanceof(a, Pd) ? a : (new Pd).including(a)
    };
    Nd.prototype = {
        setup_includes: function() {
            this.wrap_includes = Ac.get(this.includes, !0)
        },
        setup_excludes: function() {
            this.wrap_excludes = Ac.get(this.excludes, !0)
        },
        excluded: function(a) {
            return this.nonemptyintersection(a, this.excludes)
        },
        compatible: function(a) {
            return this.nonemptyintersection(a, this.includes) && !this.nonemptyintersection(a, this.excludes)
        },
        nonemptyintersection: function(a,
            b) {
            for (var c = !1, d = a.head, e = b.head; null != e && null != d;) {
                var h = e.elt,
                    f = d.elt;
                if (h == f) {
                    c = !0;
                    break
                } else h.id < f.id ? e = e.next : d = d.next
            }
            return c
        },
        effect_change: function(a, b, c) {
            if (b)
                if (c) {
                    b = null;
                    for (c = this.includes.head; null != c && !(a.id < c.elt.id);) {
                        b = c;
                        c = c.next
                    }
                    this.includes.inlined_insert(b, a)
                } else this.includes.remove(a);
            else if (c) {
                b = null;
                for (c = this.excludes.head; null != c && !(a.id < c.elt.id);) {
                    b = c;
                    c = c.next
                }
                this.excludes.inlined_insert(b, a)
            } else this.excludes.remove(a)
        },
        append_type: function(a, b) {
            a == this.includes ?
                this.includes.has(b) || (this.excludes.has(b) ? null != this.handler ? this.handler(b, !1, !1) : this.effect_change(b, !1, !1) : null != this.handler ? this.handler(b, !0, !0) : this.effect_change(b, !0, !0)) : this.excludes.has(b) || (this.includes.has(b) ? null != this.handler ? this.handler(b, !0, !1) : this.effect_change(b, !0, !1) : null != this.handler ? this.handler(b, !1, !0) : this.effect_change(b, !1, !0))
        },
        append: function(a, b) {
            if (aa.__instanceof(b, tc)) this.append_type(a, b.zpp_inner);
            else if (aa.__instanceof(b, Bf)) {
                var c;
                b.zpp_inner.valmod();
                for (c = ha.get(b); c.hasNext();) {
                    var d;
                    c.zpp_critical = !1;
                    d = c.zpp_inner.at(c.zpp_i++);
                    this.append_type(a, d.zpp_inner)
                }
            } else if (b instanceof Array && null == b.__enum__)
                for (c = 0; c < b.length;) d = b[c], ++c, this.append_type(a, d.zpp_inner)
        },
        __class__: Nd
    };
    var Eh = function() {
        this.cbTypes = this.cbSet = null;
        this.ignore = this.__velocity = !1;
        this.component = null;
        this.active = this.stiff = this.removeOnBreak = !1;
        this.outer = this.compound = this.space = null
    };
    g["zpp_nape.constraint.ZPP_Constraint"] = Eh;
    Eh.__name__ = ["zpp_nape", "constraint",
        "ZPP_Constraint"
    ];
    Eh.prototype = {
        alloc_cbSet: function() {
            if (null != (this.cbSet = this.space.cbsets.get(this.cbTypes))) this.cbSet.count++, this.cbSet.constraints.add(this)
        },
        dealloc_cbSet: function() {
            if (null != this.cbSet) {
                this.cbSet.constraints.remove(this);
                if (0 == --this.cbSet.count) {
                    this.space.cbsets.remove(this.cbSet);
                    var a = this.cbSet;
                    a.free();
                    a.next = J.zpp_pool;
                    J.zpp_pool = a
                }
                this.cbSet = null
            }
        },
        addedToSpace: function() {
            this.active && this.activeInSpace();
            this.activeBodies();
            for (var a = this.cbTypes.head; null != a;) a.elt.constraints.add(this),
                a = a.next
        },
        removedFromSpace: function() {
            this.active && this.inactiveOrOutSpace();
            this.inactiveBodies();
            for (var a = this.cbTypes.head; null != a;) a.elt.constraints.remove(this), a = a.next
        },
        activeInSpace: function() {
            this.alloc_cbSet();
            null == Ya.zpp_pool ? this.component = new Ya : (this.component = Ya.zpp_pool, Ya.zpp_pool = this.component.next, this.component.next = null);
            null;
            this.component.isBody = !1;
            this.component.constraint = this
        },
        inactiveOrOutSpace: function() {
            this.dealloc_cbSet();
            var a = this.component;
            a.body = null;
            a.constraint =
                null;
            null;
            a.next = Ya.zpp_pool;
            Ya.zpp_pool = a;
            this.component = null
        },
        activeBodies: function() {},
        inactiveBodies: function() {},
        clearcache: function() {},
        wake_connected: function() {},
        forest: function() {},
        pair_exists: function() {
            return !1
        },
        broken: function() {},
        warmStart: function() {},
        preStep: function() {
            return !1
        },
        applyImpulseVel: function() {
            return !1
        },
        applyImpulsePos: function() {
            return !1
        },
        __class__: Eh
    };
    var O = function() {
        this.colarb = this.fluidarb = this.sensorarb = null;
        this.type = 0;
        this.b1 = this.b2 = this.ws1 = this.ws2 = this.pair =
            null;
        this.invalidated = !1;
        this.immState = 0;
        this.intchange = this.presentable = this.continuous = this.fresh = !1;
        this.present = 0;
        this.active = this.cleared = this.sleeping = !1;
        this.id = this.di = this.stamp = this.up_stamp = this.sleep_stamp = this.endGenerated = 0;
        this.outer = null
    };
    g["zpp_nape.dynamics.ZPP_Arbiter"] = O;
    O.__name__ = ["zpp_nape", "dynamics", "ZPP_Arbiter"];
    O.prototype = {
        wrapper: function() {
            null == this.outer && (O.internal = !0, this.type == O.COL ? (this.colarb.outer_zn = new Ff, this.outer = this.colarb.outer_zn) : this.type == O.FLUID ?
                (this.fluidarb.outer_zn = new Gf, this.outer = this.fluidarb.outer_zn) : this.outer = new Dc, this.outer.zpp_inner = this, O.internal = !1);
            return this.outer
        },
        __class__: O
    };
    var Za = function() {
        this.next = null;
        O.call(this);
        this.type = O.SENSOR;
        this.sensorarb = this
    };
    g["zpp_nape.dynamics.ZPP_SensorArbiter"] = Za;
    Za.__name__ = ["zpp_nape", "dynamics", "ZPP_SensorArbiter"];
    Za.__super__ = O;
    Za.prototype = m(O.prototype, {
        retire: function() {
            this.cleared || (this.b1.arbiters.inlined_try_remove(this), this.b2.arbiters.inlined_try_remove(this),
                null != this.pair && (this.pair = this.pair.arb = null));
            this.b1 = this.b2 = null;
            this.intchange = this.active = !1;
            this.next = Za.zpp_pool;
            Za.zpp_pool = this
        },
        __class__: Za
    });
    var $a = function() {
        this.wMass = this.adamp = this.agamma = this.vMassa = this.vMassb = this.vMassc = this.dampx = this.dampy = this.lgamma = this.nx = this.ny = this.buoyx = this.buoyy = this.pre_dt = 0;
        this.nodrag = !1;
        this.centroidx = this.centroidy = this.overlap = this.r1x = this.r1y = this.r2x = this.r2y = 0;
        this.outer_zn = this.next = null;
        O.call(this);
        this.type = O.FLUID;
        this.fluidarb = this;
        this.buoyy = this.buoyx = 0;
        this.pre_dt = -1
    };
    g["zpp_nape.dynamics.ZPP_FluidArbiter"] = $a;
    $a.__name__ = ["zpp_nape", "dynamics", "ZPP_FluidArbiter"];
    $a.__super__ = O;
    $a.prototype = m(O.prototype, {
        retire: function() {
            this.cleared || (this.b1.arbiters.inlined_try_remove(this), this.b2.arbiters.inlined_try_remove(this), null != this.pair && (this.pair = this.pair.arb = null));
            this.b1 = this.b2 = null;
            this.intchange = this.active = !1;
            this.next = $a.zpp_pool;
            $a.zpp_pool = this;
            this.pre_dt = -1
        },
        preStep: function(a, b) {
            -1 == this.pre_dt && (this.pre_dt =
                b);
            var c = b / this.pre_dt;
            this.pre_dt = b;
            this.r1x = this.centroidx - this.b1.posx;
            this.r1y = this.centroidy - this.b1.posy;
            this.r2x = this.centroidx - this.b2.posx;
            this.r2y = this.centroidy - this.b2.posy;
            var d = 0,
                e = 0;
            this.ws1.fluidEnabled && null != this.ws1.fluidProperties.wrap_gravity ? (d = this.ws1.fluidProperties.gravityx, e = this.ws1.fluidProperties.gravityy) : (d = a.gravityx, e = a.gravityy);
            var h = 0,
                n = 0;
            this.ws2.fluidEnabled && null != this.ws2.fluidProperties.wrap_gravity ? (h = this.ws2.fluidProperties.gravityx, n = this.ws2.fluidProperties.gravityy) :
                (h = a.gravityx, n = a.gravityy);
            var i = 0,
                j = 0;
            if (this.ws1.fluidEnabled && this.ws2.fluidEnabled) {
                var g = this.overlap * this.ws1.fluidProperties.density,
                    k = this.overlap * this.ws2.fluidProperties.density;
                if (g > k) h = g + k, i -= d * h, j -= e * h;
                else if (g < k) d = g + k, i += h * d, j += n * d;
                else {
                    var p = 0,
                        x = 0,
                        p = 0.5 * (d + h),
                        x = 0.5 * (e + n);
                    this.ws1.worldCOMx * p + this.ws1.worldCOMy * x > this.ws2.worldCOMx * p + this.ws2.worldCOMy * x ? (d = g + k, i -= p * d, j -= x * d) : (d = g + k, i += p * d, j += x * d)
                }
            } else this.ws1.fluidEnabled ? (h = this.overlap * this.ws1.fluidProperties.density, i -= d * h,
                j -= e * h) : this.ws2.fluidEnabled && (d = this.overlap * this.ws2.fluidProperties.density, i += h * d, j += n * d);
            i *= b;
            j *= b;
            this.buoyx = i;
            this.buoyy = j;
            this.b1.type == f.id_BodyType_DYNAMIC && (d = this.b1.imass, this.b1.velx -= i * d, this.b1.vely -= j * d, this.b1.angvel -= (j * this.r1x - i * this.r1y) * this.b1.iinertia);
            this.b2.type == f.id_BodyType_DYNAMIC && (d = this.b2.imass, this.b2.velx += i * d, this.b2.vely += j * d, this.b2.angvel += (j * this.r2x - i * this.r2y) * this.b2.iinertia);
            if ((!this.ws1.fluidEnabled || 0 == this.ws1.fluidProperties.viscosity) && (!this.ws2.fluidEnabled ||
                0 == this.ws2.fluidProperties.viscosity)) this.nodrag = !0, this.adamp = this.dampy = this.dampx = 0;
            else {
                this.nodrag = !1;
                i = 0;
                this.ws1.fluidEnabled && (this.ws2.validate_angDrag(), i += this.ws1.fluidProperties.viscosity * this.ws2.angDrag * this.overlap / this.ws2.area);
                this.ws2.fluidEnabled && (this.ws1.validate_angDrag(), i += this.ws2.fluidProperties.viscosity * this.ws1.angDrag * this.overlap / this.ws1.area);
                0 != i ? (j = this.b1.sinertia + this.b2.sinertia, this.wMass = 0 != j ? 1 / j : 0, i = 2 * Math.PI * 4.0E-4 * i, this.agamma = 1 / (b * i * (2 + i * b)), i = 1 / (1 +
                    this.agamma), this.agamma *= i, this.wMass *= i) : this.agamma = this.wMass = 0;
                i = this.b2.velx + this.b2.kinvelx - this.r2y * (this.b2.angvel + this.b2.kinangvel) - (this.b1.velx + this.b1.kinvelx - this.r1y * (this.b2.angvel + this.b2.kinangvel));
                j = this.b2.vely + this.b2.kinvely + this.r2x * (this.b2.angvel + this.b2.kinangvel) - (this.b1.vely + this.b1.kinvely + this.r1x * (this.b1.angvel + this.b1.kinangvel));
                i * i + j * j < l.epsilon * l.epsilon || (d = 1 / Math.sqrt(i * i + j * j), this.nx = i * d, this.ny = j * d);
                i = 0;
                if (this.ws1.fluidEnabled)
                    if (j = -this.ws1.fluidProperties.viscosity *
                        this.overlap / this.ws2.area, this.ws2.type == f.id_ShapeType_CIRCLE) i -= j * this.ws2.circle.radius * l.fluidLinearDrag / (2 * this.ws2.circle.radius * Math.PI);
                    else {
                        e = d = 0;
                        for (h = this.ws2.polygon.edges.head; null != h;) n = h.elt, d += n.length, n = j * n.length * (n.gnormx * this.nx + n.gnormy * this.ny), 0 < n && (n = n *= -l.fluidVacuumDrag), e -= 0.5 * n * l.fluidLinearDrag, h = h.next;
                        i += e / d
                    }
                if (this.ws2.fluidEnabled)
                    if (j = -this.ws2.fluidProperties.viscosity * this.overlap / this.ws1.area, this.ws1.type == f.id_ShapeType_CIRCLE) i -= j * this.ws1.circle.radius * l.fluidLinearDrag /
                        (2 * this.ws1.circle.radius * Math.PI);
                    else {
                        e = d = 0;
                        for (h = this.ws1.polygon.edges.head; null != h;) n = h.elt, d += n.length, n = j * n.length * (n.gnormx * this.nx + n.gnormy * this.ny), 0 < n && (n = n *= -l.fluidVacuumDrag), e -= 0.5 * n * l.fluidLinearDrag, h = h.next;
                        i += e / d
                    }
                0 != i ? (h = this.b1.smass + this.b2.smass, e = d = j = 0, j = h, d = 0, e = h, 0 != this.b1.sinertia && (h = this.r1x * this.b1.sinertia, n = this.r1y * this.b1.sinertia, j += n * this.r1y, d += -n * this.r1x, e += h * this.r1x), 0 != this.b2.sinertia && (h = this.r2x * this.b2.sinertia, n = this.r2y * this.b2.sinertia, j += n * this.r2y,
                    d += -n * this.r2x, e += h * this.r2x), h = j * e - d * d, h != h ? (j = d = e = 0, 3) : 0 == h ? (h = 0, 0 != j ? j = 1 / j : (j = 0, h |= 1), 0 != e ? e = 1 / e : (e = 0, h |= 2), d = 0, h) : (h = 1 / h, n = e * h, e = j * h, j = n, d *= -h, 0), this.vMassa = j, this.vMassb = d, this.vMassc = e, i *= 2 * Math.PI, this.lgamma = 1 / (b * i * (2 + i * b)), i = 1 / (1 + this.lgamma), this.lgamma *= i, this.vMassa *= i, this.vMassb *= i, this.vMassc *= i) : this.lgamma = this.vMassc = this.vMassb = this.vMassa = 0
            }
            this.dampx *= c;
            this.dampy *= c;
            this.adamp *= c
        },
        warmStart: function() {
            var a = this.b1.imass;
            this.b1.velx -= this.dampx * a;
            this.b1.vely -= this.dampy * a;
            a = this.b2.imass;
            this.b2.velx += this.dampx * a;
            this.b2.vely += this.dampy * a;
            this.b1.angvel -= this.b1.iinertia * (this.dampy * this.r1x - this.dampx * this.r1y);
            this.b2.angvel += this.b2.iinertia * (this.dampy * this.r2x - this.dampx * this.r2y);
            this.b1.angvel -= this.adamp * this.b1.iinertia;
            this.b2.angvel += this.adamp * this.b2.iinertia
        },
        applyImpulseVel: function() {
            if (!this.nodrag) {
                var a = this.b1.angvel + this.b1.kinangvel,
                    b = this.b2.angvel + this.b2.kinangvel,
                    c = this.b1.velx + this.b1.kinvelx - this.r1y * a - (this.b2.velx + this.b2.kinvelx - this.r2y *
                        b),
                    d = this.b1.vely + this.b1.kinvely + this.r1x * a - (this.b2.vely + this.b2.kinvely + this.r2x * b),
                    e = this.vMassa * c + this.vMassb * d,
                    d = this.vMassb * c + this.vMassc * d,
                    h = this.lgamma,
                    c = e - this.dampx * h,
                    d = d - this.dampy * h;
                this.dampx += 1 * c;
                this.dampy += 1 * d;
                e = this.b1.imass;
                this.b1.velx -= c * e;
                this.b1.vely -= d * e;
                e = this.b2.imass;
                this.b2.velx += c * e;
                this.b2.vely += d * e;
                this.b1.angvel -= this.b1.iinertia * (d * this.r1x - c * this.r1y);
                this.b2.angvel += this.b2.iinertia * (d * this.r2x - c * this.r2y);
                a = (a - b) * this.wMass - this.adamp * this.agamma;
                this.adamp += a;
                this.b1.angvel -= a * this.b1.iinertia;
                this.b2.angvel += a * this.b2.iinertia
            }
        },
        __class__: $a
    });
    var kb = function() {
        this.pre_dt = 0;
        this.stat = !1;
        this.next = null;
        this.hc2 = this.hpc2 = !1;
        this.c1 = this.oc1 = this.c2 = this.oc2 = null;
        this.__ref_vertex = 0;
        this.__ref_edge1 = this.__ref_edge2 = null;
        this.biasCoef = 0;
        this.rev = !1;
        this.nx = this.ny = this.kMassa = this.kMassb = this.kMassc = this.Ka = this.Kb = this.Kc = this.rMass = this.jrAcc = this.rn1a = this.rt1a = this.rn1b = this.rt1b = this.rn2a = this.rt2a = this.rn2b = this.rt2b = this.k1x = this.k1y = this.k2x = this.k2y =
            this.surfacex = this.surfacey = this.lnormx = this.lnormy = this.lproj = this.radius = 0;
        this.s1 = this.s2 = this.contacts = this.innards = null;
        this.userdef_dyn_fric = this.userdef_stat_fric = this.userdef_restitution = this.userdef_rfric = !1;
        this.dyn_fric = this.stat_fric = this.restitution = this.rfric = 0;
        this.outer_zn = null;
        O.call(this);
        this.pre_dt = -1;
        this.contacts = new Ga;
        this.innards = new Mf;
        this.type = O.COL;
        this.colarb = this
    };
    g["zpp_nape.dynamics.ZPP_ColArbiter"] = kb;
    kb.__name__ = ["zpp_nape", "dynamics", "ZPP_ColArbiter"];
    kb.__super__ =
        O;
    kb.prototype = m(O.prototype, {
        injectContact: function(a, b, c, d, e, h, f) {
            null == f && (f = !1);
            for (var i = null, j = this.contacts.next; null != j;) {
                var g = j;
                if (h == g.hash) {
                    i = g;
                    break
                }
                j = j.next
            }
            null == i ? (null == Ga.zpp_pool ? i = new Ga : (i = Ga.zpp_pool, Ga.zpp_pool = i.next, i.next = null), null, j = i.inner, j.jnAcc = j.jtAcc = 0, i.hash = h, i.fresh = !0, i.arbiter = this, this.jrAcc = 0, this.contacts.inlined_add(i), this.innards.add(j)) : i.fresh = !1;
            i.px = a;
            i.py = b;
            this.nx = c;
            this.ny = d;
            i.dist = e;
            i.stamp = this.stamp;
            i.posOnly = f;
            return i
        },
        retire: function() {
            this.cleared ||
                (this.b1.arbiters.inlined_try_remove(this), this.b2.arbiters.inlined_try_remove(this), null != this.pair && (this.pair = this.pair.arb = null));
            this.b1 = this.b2 = null;
            for (this.intchange = this.active = !1; null != this.contacts.next;) {
                var a = this.contacts.inlined_pop_unsafe();
                a.arbiter = null;
                a.next = Ga.zpp_pool;
                Ga.zpp_pool = a;
                this.innards.inlined_pop()
            }
            this.userdef_rfric = this.userdef_restitution = this.userdef_stat_fric = this.userdef_dyn_fric = !1;
            this.__ref_edge1 = this.__ref_edge2 = null;
            this.next = kb.zpp_pool;
            kb.zpp_pool = this;
            this.pre_dt = -1
        },
        cleanupContacts: function() {
            var a = !0,
                b = null,
                c = null,
                d = this.innards.next;
            this.hc2 = !1;
            for (var e = this.contacts.next; null != e;) {
                var h = e;
                h.stamp + l.arbiterExpirationDelay < this.stamp ? (e = this.contacts.inlined_erase(b), d = this.innards.inlined_erase(c), h.arbiter = null, h.next = Ga.zpp_pool, Ga.zpp_pool = h) : (b = h.inner, c = h.active, h.active = h.stamp == this.stamp, h.active && (a ? (a = !1, this.c1 = b, this.oc1 = h) : (this.hc2 = !0, this.c2 = b, this.oc2 = h)), c != h.active && (this.contacts.modified = !0), b = e, c = d, d = d.next, e = e.next)
            }
            this.hc2 ?
                (this.hpc2 = !0, this.oc1.posOnly ? (d = this.c1, this.c1 = this.c2, this.c2 = d, d = this.oc1, this.oc1 = this.oc2, this.oc2 = d, this.hc2 = !1) : this.oc2.posOnly && (this.hc2 = !1), this.oc1.posOnly && (a = !0)) : this.hpc2 = !1;
            return a
        },
        preStep: function(a) {
            this.invalidated && (this.invalidated = !1, this.userdef_restitution || (this.restitution = this.s1.material.elasticity <= Math.NEGATIVE_INFINITY || this.s2.material.elasticity <= Math.NEGATIVE_INFINITY ? 0 : this.s1.material.elasticity >= Math.POSITIVE_INFINITY || this.s2.material.elasticity >= Math.POSITIVE_INFINITY ?
                1 : (this.s1.material.elasticity + this.s2.material.elasticity) / 2, 0 > this.restitution && (this.restitution = 0), 1 < this.restitution && (this.restitution = 1)), this.userdef_dyn_fric || (this.dyn_fric = Math.sqrt(this.s1.material.dynamicFriction * this.s2.material.dynamicFriction)), this.userdef_stat_fric || (this.stat_fric = Math.sqrt(this.s1.material.staticFriction * this.s2.material.staticFriction)), this.userdef_rfric || (this.rfric = Math.sqrt(this.s1.material.rollingFriction * this.s2.material.rollingFriction))); - 1 == this.pre_dt &&
                (this.pre_dt = a);
            var b = a / this.pre_dt;
            this.pre_dt = a;
            var c = this.b1.smass + this.b2.smass;
            this.hc2 = !1;
            a = !0;
            this.biasCoef = this.b1.type != f.id_BodyType_DYNAMIC || this.b2.type != f.id_BodyType_DYNAMIC ? this.continuous ? l.contactContinuousStaticBiasCoef : l.contactStaticBiasCoef : this.continuous ? l.contactContinuousBiasCoef : l.contactBiasCoef;
            this.continuous = !1;
            for (var d = null, e = null, h = this.innards.next, n = this.contacts.next; null != n;) {
                var i = n;
                if (i.stamp + l.arbiterExpirationDelay < this.stamp) n = this.contacts.inlined_erase(d),
                    h = this.innards.inlined_erase(e), i.arbiter = null, i.next = Ga.zpp_pool, Ga.zpp_pool = i;
                else {
                    d = i.inner;
                    e = i.active;
                    i.active = i.stamp == this.stamp;
                    if (i.active) {
                        a ? (a = !1, this.c1 = d, this.oc1 = i) : (this.hc2 = !0, this.c2 = d, this.oc2 = i);
                        d.r2x = i.px - this.b2.posx;
                        d.r2y = i.py - this.b2.posy;
                        d.r1x = i.px - this.b1.posx;
                        d.r1y = i.py - this.b1.posy;
                        var j = c + this.b2.sinertia * je.sqr(d.r2x * this.nx + d.r2y * this.ny),
                            j = j + this.b1.sinertia * je.sqr(d.r1x * this.nx + d.r1y * this.ny);
                        d.tMass = j < l.epsilon * l.epsilon ? 0 : 1 / j;
                        j = c + this.b2.sinertia * je.sqr(this.ny * d.r2x -
                            this.nx * d.r2y);
                        j += this.b1.sinertia * je.sqr(this.ny * d.r1x - this.nx * d.r1y);
                        d.nMass = j < l.epsilon * l.epsilon ? 0 : 1 / j;
                        var g = j = 0,
                            k = this.b2.angvel + this.b2.kinangvel,
                            j = this.b2.velx + this.b2.kinvelx - d.r2y * k,
                            g = this.b2.vely + this.b2.kinvely + d.r2x * k,
                            k = this.b1.angvel + this.b1.kinangvel,
                            j = j - (this.b1.velx + this.b1.kinvelx - d.r1y * k),
                            g = g - (this.b1.vely + this.b1.kinvely + d.r1x * k),
                            k = this.nx * j + this.ny * g;
                        i.elasticity = this.restitution;
                        d.bounce = k * i.elasticity;
                        d.bounce > -l.elasticThreshold && (d.bounce = 0);
                        k = g * this.nx - j * this.ny;
                        j = l.staticFrictionThreshold;
                        d.friction = k * k > j * j ? this.dyn_fric : this.stat_fric;
                        d.jnAcc *= b;
                        d.jtAcc *= b
                    }
                    e != i.active && (this.contacts.modified = !0);
                    d = n;
                    e = h;
                    h = h.next;
                    n = n.next
                }
            }
            this.hc2 ? (this.hpc2 = !0, this.oc1.posOnly ? (h = this.c1, this.c1 = this.c2, this.c2 = h, h = this.oc1, this.oc1 = this.oc2, this.oc2 = h, this.hc2 = !1) : this.oc2.posOnly && (this.hc2 = !1), this.oc1.posOnly && (a = !0)) : this.hpc2 = !1;
            this.jrAcc *= b;
            a || (this.rn1a = this.ny * this.c1.r1x - this.nx * this.c1.r1y, this.rt1a = this.c1.r1x * this.nx + this.c1.r1y * this.ny, this.rn1b = this.ny * this.c1.r2x - this.nx * this.c1.r2y,
                this.rt1b = this.c1.r2x * this.nx + this.c1.r2y * this.ny, this.k1x = this.b2.kinvelx - this.c1.r2y * this.b2.kinangvel - (this.b1.kinvelx - this.c1.r1y * this.b1.kinangvel), this.k1y = this.b2.kinvely + this.c1.r2x * this.b2.kinangvel - (this.b1.kinvely + this.c1.r1x * this.b1.kinangvel));
            this.hc2 && (this.rn2a = this.ny * this.c2.r1x - this.nx * this.c2.r1y, this.rt2a = this.c2.r1x * this.nx + this.c2.r1y * this.ny, this.rn2b = this.ny * this.c2.r2x - this.nx * this.c2.r2y, this.rt2b = this.c2.r2x * this.nx + this.c2.r2y * this.ny, this.k2x = this.b2.kinvelx - this.c2.r2y *
                this.b2.kinangvel - (this.b1.kinvelx - this.c2.r1y * this.b1.kinangvel), this.k2y = this.b2.kinvely + this.c2.r2x * this.b2.kinangvel - (this.b1.kinvely + this.c2.r1x * this.b1.kinangvel), this.kMassa = c + this.b1.sinertia * this.rn1a * this.rn1a + this.b2.sinertia * this.rn1b * this.rn1b, this.kMassb = c + this.b1.sinertia * this.rn1a * this.rn2a + this.b2.sinertia * this.rn1b * this.rn2b, this.kMassc = c + this.b1.sinertia * this.rn2a * this.rn2a + this.b2.sinertia * this.rn2b * this.rn2b, this.kMassa * this.kMassa + 2 * this.kMassb * this.kMassb + this.kMassc * this.kMassc <
                l.illConditionedThreshold * (this.kMassa * this.kMassc - this.kMassb * this.kMassb) ? (this.Ka = this.kMassa, this.Kb = this.kMassb, this.Kc = this.kMassc, b = this.kMassa * this.kMassc - this.kMassb * this.kMassb, b != b ? (this.kMassa = this.kMassb = this.kMassc = 0, 3) : 0 == b ? (b = 0, 0 != this.kMassa ? this.kMassa = 1 / this.kMassa : (this.kMassa = 0, b |= 1), 0 != this.kMassc ? this.kMassc = 1 / this.kMassc : (this.kMassc = 0, b |= 2), this.kMassb = 0, b) : (b = 1 / b, c = this.kMassc * b, this.kMassc = this.kMassa * b, this.kMassa = c, this.kMassb *= -b, 0)) : (this.hc2 = !1, this.oc2.dist < this.oc1.dist &&
                    (b = this.c1, this.c1 = this.c2, this.c2 = b), this.oc2.active = !1, this.contacts.modified = !0));
            this.surfacex = this.b2.svelx;
            this.surfacey = this.b2.svely;
            this.surfacex += 1 * this.b1.svelx;
            this.surfacey += 1 * this.b1.svely;
            this.surfacex = -this.surfacex;
            this.surfacey = -this.surfacey;
            this.rMass = this.b1.sinertia + this.b2.sinertia;
            0 != this.rMass && (this.rMass = 1 / this.rMass);
            return a
        },
        warmStart: function() {
            var a = this.nx * this.c1.jnAcc - this.ny * this.c1.jtAcc,
                b = this.ny * this.c1.jnAcc + this.nx * this.c1.jtAcc,
                c = this.b1.imass;
            this.b1.velx -=
                a * c;
            this.b1.vely -= b * c;
            this.b1.angvel -= this.b1.iinertia * (b * this.c1.r1x - a * this.c1.r1y);
            c = this.b2.imass;
            this.b2.velx += a * c;
            this.b2.vely += b * c;
            this.b2.angvel += this.b2.iinertia * (b * this.c1.r2x - a * this.c1.r2y);
            this.hc2 && (a = this.nx * this.c2.jnAcc - this.ny * this.c2.jtAcc, b = this.ny * this.c2.jnAcc + this.nx * this.c2.jtAcc, c = this.b1.imass, this.b1.velx -= a * c, this.b1.vely -= b * c, this.b1.angvel -= this.b1.iinertia * (b * this.c2.r1x - a * this.c2.r1y), c = this.b2.imass, this.b2.velx += a * c, this.b2.vely += b * c, this.b2.angvel += this.b2.iinertia *
                (b * this.c2.r2x - a * this.c2.r2y));
            this.b2.angvel += this.jrAcc * this.b2.iinertia;
            this.b1.angvel -= this.jrAcc * this.b1.iinertia
        },
        applyImpulseVel: function() {
            var a, b, c, d, e;
            d = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel);
            var h = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel);
            c = (h * this.nx - d * this.ny + this.surfacex) * this.c1.tMass;
            d = this.c1.friction * this.c1.jnAcc;
            a = this.c1.jtAcc;
            e = a - c;
            e > d ? e = d : e < -d && (e = -d);
            c = e - a;
            this.c1.jtAcc = e;
            a = -this.ny * c;
            b = this.nx * c;
            this.b2.velx += a * this.b2.imass;
            this.b2.vely += b * this.b2.imass;
            this.b1.velx -= a * this.b1.imass;
            this.b1.vely -= b * this.b1.imass;
            this.b2.angvel += this.rt1b * c * this.b2.iinertia;
            this.b1.angvel -= this.rt1a * c * this.b1.iinertia;
            this.hc2 ? (e = this.k2x + this.b2.velx - this.c2.r2y * this.b2.angvel - (this.b1.velx - this.c2.r1y * this.b1.angvel), b = this.k2y + this.b2.vely + this.c2.r2x * this.b2.angvel - (this.b1.vely + this.c2.r1x * this.b1.angvel), c = (b * this.nx - e * this.ny + this.surfacex) * this.c2.tMass, d = this.c2.friction *
                this.c2.jnAcc, a = this.c2.jtAcc, e = a - c, e > d ? e = d : e < -d && (e = -d), c = e - a, this.c2.jtAcc = e, a = -this.ny * c, b = this.nx * c, this.b2.velx += a * this.b2.imass, this.b2.vely += b * this.b2.imass, this.b1.velx -= a * this.b1.imass, this.b1.vely -= b * this.b1.imass, this.b2.angvel += this.rt2b * c * this.b2.iinertia, this.b1.angvel -= this.rt2a * c * this.b1.iinertia, d = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel), h = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel), e =
                this.k2x + this.b2.velx - this.c2.r2y * this.b2.angvel - (this.b1.velx - this.c2.r1y * this.b1.angvel), b = this.k2y + this.b2.vely + this.c2.r2x * this.b2.angvel - (this.b1.vely + this.c2.r1x * this.b1.angvel), c = this.c1.jnAcc, a = this.c2.jnAcc, d = d * this.nx + h * this.ny + this.surfacey + this.c1.bounce - (this.Ka * c + this.Kb * a), e = e * this.nx + b * this.ny + this.surfacey + this.c2.bounce - (this.Kb * c + this.Kc * a), b = -(this.kMassa * d + this.kMassb * e), h = -(this.kMassb * d + this.kMassc * e), 0 <= b && 0 <= h ? (d = b - c, e = h - a, this.c1.jnAcc = b, this.c2.jnAcc = h) : (b = -this.c1.nMass *
                    d, 0 <= b && 0 <= this.Kb * b + e ? (d = b - c, e = -a, this.c1.jnAcc = b, this.c2.jnAcc = 0) : (h = -this.c2.nMass * e, 0 <= h && 0 <= this.Kb * h + d ? (d = -c, e = h - a, this.c1.jnAcc = 0, this.c2.jnAcc = h) : 0 <= d && 0 <= e ? (d = -c, e = -a, this.c1.jnAcc = this.c2.jnAcc = 0) : e = d = 0)), c = d + e, a = this.nx * c, b = this.ny * c, this.b2.velx += a * this.b2.imass, this.b2.vely += b * this.b2.imass, this.b1.velx -= a * this.b1.imass, this.b1.vely -= b * this.b1.imass, this.b2.angvel += (this.rn1b * d + this.rn2b * e) * this.b2.iinertia, this.b1.angvel -= (this.rn1a * d + this.rn2a * e) * this.b1.iinertia) : (0 != this.radius &&
                (c = (this.b2.angvel - this.b1.angvel) * this.rMass, d = this.rfric * this.c1.jnAcc, a = this.jrAcc, this.jrAcc -= c, this.jrAcc > d ? this.jrAcc = d : this.jrAcc < -d && (this.jrAcc = -d), c = this.jrAcc - a, this.b2.angvel += c * this.b2.iinertia, this.b1.angvel -= c * this.b1.iinertia), d = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel), h = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel), c = (this.c1.bounce + (this.nx * d + this.ny * h) + this.surfacey) * this.c1.nMass, a = this.c1.jnAcc,
                e = a - c, 0 > e && (e = 0), c = e - a, this.c1.jnAcc = e, a = this.nx * c, b = this.ny * c, this.b2.velx += a * this.b2.imass, this.b2.vely += b * this.b2.imass, this.b1.velx -= a * this.b1.imass, this.b1.vely -= b * this.b1.imass, this.b2.angvel += this.rn1b * c * this.b2.iinertia, this.b1.angvel -= this.rn1a * c * this.b1.iinertia)
        },
        applyImpulsePos: function() {
            if (2 == this.ptype) {
                var a = this.c1,
                    b = 0,
                    c = 0,
                    b = this.b2.axisy * a.lr2x - this.b2.axisx * a.lr2y,
                    c = a.lr2x * this.b2.axisx + a.lr2y * this.b2.axisy,
                    b = b + 1 * this.b2.posx,
                    c = c + 1 * this.b2.posy,
                    d = 0,
                    e = 0,
                    d = this.b1.axisy * a.lr1x - this.b1.axisx *
                    a.lr1y,
                    e = a.lr1x * this.b1.axisx + a.lr1y * this.b1.axisy,
                    d = d + 1 * this.b1.posx,
                    e = e + 1 * this.b1.posy,
                    h = a = 0,
                    a = b - d,
                    h = c - e,
                    f = Math.sqrt(a * a + h * h),
                    i = this.radius - l.collisionSlop,
                    j = f - i;
                0 > a * this.nx + h * this.ny && (a = -a, h = -h, j -= this.radius);
                0 > j && (f < l.epsilon ? 0 != this.b1.smass ? this.b1.posx += 10 * l.epsilon : this.b2.posx += 10 * l.epsilon : (j = 1 / f, a *= j, h *= j, b = 0.5 * (d + b), c = 0.5 * (e + c), d = b - this.b1.posx, e = c - this.b1.posy, b -= this.b2.posx, c -= this.b2.posy, d = h * d - a * e, b = h * b - a * c, c = this.b2.smass + b * b * this.b2.sinertia + this.b1.smass + d * d * this.b1.sinertia,
                    0 != c && (f = -this.biasCoef * (f - i) / c, c = i = 0, i = a * f, c = h * f, a = this.b1.imass, this.b1.posx -= i * a, this.b1.posy -= c * a, this.b1.delta_rot(-d * this.b1.iinertia * f), a = this.b2.imass, this.b2.posx += i * a, this.b2.posy += c * a, this.b2.delta_rot(b * this.b2.iinertia * f))))
            } else {
                var g = j = h = a = 0,
                    e = b = 0;
                0 == this.ptype ? (a = this.b1.axisy * this.lnormx - this.b1.axisx * this.lnormy, h = this.lnormx * this.b1.axisx + this.lnormy * this.b1.axisy, i = this.lproj + (a * this.b1.posx + h * this.b1.posy), j = this.b2.axisy * this.c1.lr1x - this.b2.axisx * this.c1.lr1y, g = this.c1.lr1x *
                    this.b2.axisx + this.c1.lr1y * this.b2.axisy, j += 1 * this.b2.posx, g += 1 * this.b2.posy, this.hpc2 && (b = this.b2.axisy * this.c2.lr1x - this.b2.axisx * this.c2.lr1y, e = this.c2.lr1x * this.b2.axisx + this.c2.lr1y * this.b2.axisy, b += 1 * this.b2.posx, e += 1 * this.b2.posy)) : (a = this.b2.axisy * this.lnormx - this.b2.axisx * this.lnormy, h = this.lnormx * this.b2.axisx + this.lnormy * this.b2.axisy, i = this.lproj + (a * this.b2.posx + h * this.b2.posy), j = this.b1.axisy * this.c1.lr1x - this.b1.axisx * this.c1.lr1y, g = this.c1.lr1x * this.b1.axisx + this.c1.lr1y * this.b1.axisy,
                    j += 1 * this.b1.posx, g += 1 * this.b1.posy, this.hpc2 && (b = this.b1.axisy * this.c2.lr1x - this.b1.axisx * this.c2.lr1y, e = this.c2.lr1x * this.b1.axisx + this.c2.lr1y * this.b1.axisy, b += 1 * this.b1.posx, e += 1 * this.b1.posy));
                f = j * a + g * h - i - this.radius;
                f += l.collisionSlop;
                c = 0;
                this.hpc2 && (c = b * a + e * h - i - this.radius, c += l.collisionSlop);
                if (0 > f || 0 > c) {
                    this.rev && (a = -a, h = -h);
                    var k = 0,
                        p = 0,
                        k = j - this.b1.posx,
                        p = g - this.b1.posy,
                        d = i = 0,
                        i = j - this.b2.posx,
                        d = g - this.b2.posy,
                        x = 0,
                        m = 0,
                        g = j = 0;
                    if (this.hpc2) {
                        x = b - this.b1.posx;
                        m = e - this.b1.posy;
                        j = b - this.b2.posx;
                        g = e - this.b2.posy;
                        b = h * k - a * p;
                        i = h * i - a * d;
                        e = h * x - a * m;
                        d = h * j - a * g;
                        j = this.b1.smass + this.b2.smass;
                        this.kMassa = j + this.b1.sinertia * b * b + this.b2.sinertia * i * i;
                        this.kMassb = j + this.b1.sinertia * b * e + this.b2.sinertia * i * d;
                        this.kMassc = j + this.b1.sinertia * e * e + this.b2.sinertia * d * d;
                        k = g = j = 0;
                        j = this.kMassa;
                        g = this.kMassb;
                        k = this.kMassc;
                        p = f * this.biasCoef;
                        x = c * this.biasCoef;
                        c = f = 0;
                        f = -p;
                        c = -x;
                        m = this.kMassa * this.kMassc - this.kMassb * this.kMassb;
                        if (m != m) f = c = 0;
                        else if (0 == m) f = 0 != this.kMassa ? f / this.kMassa : 0, c = 0 != this.kMassc ? c / this.kMassc : 0;
                        else var m =
                            1 / m,
                            o = m * (this.kMassc * f - this.kMassb * c),
                            c = m * (this.kMassa * c - this.kMassb * f),
                            f = o;
                        0 <= f && 0 <= c ? (j = (f + c) * this.b1.imass, this.b1.posx -= a * j, this.b1.posy -= h * j, this.b1.delta_rot(-this.b1.iinertia * (b * f + e * c)), b = (f + c) * this.b2.imass, this.b2.posx += a * b, this.b2.posy += h * b, this.b2.delta_rot(this.b2.iinertia * (i * f + d * c))) : (f = -p / j, c = 0, 0 <= f && 0 <= g * f + x ? (j = (f + c) * this.b1.imass, this.b1.posx -= a * j, this.b1.posy -= h * j, this.b1.delta_rot(-this.b1.iinertia * (b * f + e * c)), b = (f + c) * this.b2.imass, this.b2.posx += a * b, this.b2.posy += h * b, this.b2.delta_rot(this.b2.iinertia *
                            (i * f + d * c))) : (f = 0, c = -x / k, 0 <= c && 0 <= g * c + p && (j = (f + c) * this.b1.imass, this.b1.posx -= a * j, this.b1.posy -= h * j, this.b1.delta_rot(-this.b1.iinertia * (b * f + e * c)), b = (f + c) * this.b2.imass, this.b2.posx += a * b, this.b2.posy += h * b, this.b2.delta_rot(this.b2.iinertia * (i * f + d * c)))))
                    } else b = h * k - a * p, i = h * i - a * d, c = this.b2.smass + i * i * this.b2.sinertia + this.b1.smass + b * b * this.b1.sinertia, 0 != c && (f = -this.biasCoef * f / c, d = c = 0, c = a * f, d = h * f, a = this.b1.imass, this.b1.posx -= c * a, this.b1.posy -= d * a, this.b1.delta_rot(-b * this.b1.iinertia * f), a = this.b2.imass,
                        this.b2.posx += c * a, this.b2.posy += d * a, this.b2.delta_rot(i * this.b2.iinertia * f))
                }
            }
        },
        __class__: kb
    });
    var Ga = function() {
        this.length = 0;
        this._inuse = this.modified = this.pushmod = !1;
        this.next = null;
        this.dist = this.elasticity = 0;
        this.fresh = !1;
        this.stamp = this.hash = 0;
        this.active = this.posOnly = !1;
        this.arbiter = this.inner = null;
        this.px = this.py = 0;
        this.outer = null;
        this.inner = new Mf
    };
    g["zpp_nape.dynamics.ZPP_Contact"] = Ga;
    Ga.__name__ = ["zpp_nape", "dynamics", "ZPP_Contact"];
    Ga.prototype = {
        wrapper: function() {
            null == this.outer && (Ga.internal = !0, this.outer = new Eg, Ga.internal = !1, this.outer.zpp_inner = this);
            return this.outer
        },
        inlined_add: function(a) {
            a._inuse = !0;
            a.next = this.next;
            this.next = a;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.next;
            this.next = a.next;
            a._inuse = !1;
            null == this.next && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        inlined_pop_unsafe: function() {
            var a = this.next;
            this.pop();
            return a
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.next, this.next = c = b.next, null ==
                this.next && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            b._inuse = !1;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Ga
    };
    var Mf = function() {
        this.length = 0;
        this._inuse = this.modified = this.pushmod = !1;
        this.next = null;
        this.r1x = this.r1y = this.r2x = this.r2y = this.nMass = this.tMass = this.bounce = this.friction = this.jnAcc = this.jtAcc = this.lr1x = this.lr1y = this.lr2x = this.lr2y = 0
    };
    g["zpp_nape.dynamics.ZPP_IContact"] = Mf;
    Mf.__name__ = ["zpp_nape", "dynamics", "ZPP_IContact"];
    Mf.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            a._inuse = !0;
            a.next = this.next;
            this.next = a;
            this.modified = !0;
            this.length++;
            return a
        },
        inlined_pop: function() {
            var a = this.next;
            this.next = a.next;
            a._inuse = !1;
            null == this.next && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.next, this.next = c = b.next, null == this.next && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            b._inuse = !1;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Mf
    };
    var Ma = function() {
        this.collisionGroup = this.collisionMask = this.sensorGroup = this.sensorMask = this.fluidGroup = this.fluidMask = 0;
        this.next = this.outer = this.shapes = null;
        this.shapes = new Sd;
        this.collisionGroup = this.sensorGroup = this.fluidGroup = 1;
        this.collisionMask = this.sensorMask = this.fluidMask = -1
    };
    g["zpp_nape.dynamics.ZPP_InteractionFilter"] = Ma;
    Ma.__name__ = ["zpp_nape", "dynamics", "ZPP_InteractionFilter"];
    Ma.prototype = {
        wrapper: function() {
            if (null == this.outer) {
                this.outer = new Fg;
                var a =
                    this.outer.zpp_inner;
                a.outer = null;
                a.next = Ma.zpp_pool;
                Ma.zpp_pool = a;
                this.outer.zpp_inner = this
            }
            return this.outer
        },
        shouldCollide: function(a) {
            return 0 != (this.collisionMask & a.collisionGroup) && 0 != (a.collisionMask & this.collisionGroup)
        },
        shouldSense: function(a) {
            return 0 != (this.sensorMask & a.sensorGroup) && 0 != (a.sensorMask & this.sensorGroup)
        },
        shouldFlow: function(a) {
            return 0 != (this.fluidMask & a.fluidGroup) && 0 != (a.fluidMask & this.fluidGroup)
        },
        invalidate: function() {
            for (var a = this.shapes.head; null != a;) a.elt.invalidate_filter(),
                a = a.next
        },
        __class__: Ma
    };
    var Fh = function() {
        this.depth = 0;
        this.group = this.interactors = null;
        this.ignore = !1;
        this.outer = null
    };
    g["zpp_nape.dynamics.ZPP_InteractionGroup"] = Fh;
    Fh.__name__ = ["zpp_nape", "dynamics", "ZPP_InteractionGroup"];
    Fh.prototype = {
        __class__: Fh
    };
    var na = function() {
        this.wrap_max = null;
        this.maxx = this.maxy = 0;
        this.wrap_min = null;
        this.minx = this.miny = 0;
        this.outer = this.next = null;
        this._immutable = !1;
        this._invalidate = this._validate = null
    };
    g["zpp_nape.geom.ZPP_AABB"] = na;
    na.__name__ = ["zpp_nape", "geom", "ZPP_AABB"];
    na.get = function(a, b, c, d) {
        var e;
        null == na.zpp_pool ? e = new na : (e = na.zpp_pool, na.zpp_pool = e.next, e.next = null);
        null;
        e.minx = a;
        e.miny = b;
        e.maxx = c;
        e.maxy = d;
        return e
    };
    na.prototype = {
        validate: function() {
            null != this._validate && this._validate()
        },
        perimeter: function() {
            return 2 * (this.maxx - this.minx + (this.maxy - this.miny))
        },
        intersectY: function(a) {
            return !(a.miny > this.maxy || this.miny > a.maxy)
        },
        intersect: function(a) {
            return a.miny <= this.maxy && this.miny <= a.maxy && a.minx <= this.maxx && this.minx <= a.maxx
        },
        combine: function(a) {
            a.minx <
                this.minx && (this.minx = a.minx);
            a.maxx > this.maxx && (this.maxx = a.maxx);
            a.miny < this.miny && (this.miny = a.miny);
            a.maxy > this.maxy && (this.maxy = a.maxy)
        },
        contains: function(a) {
            return a.minx >= this.minx && a.miny >= this.miny && a.maxx <= this.maxx && a.maxy <= this.maxy
        },
        containsPoint: function(a) {
            return a.x >= this.minx && a.x <= this.maxx && a.y >= this.miny && a.y <= this.maxy
        },
        setCombine: function(a, b) {
            this.minx = a.minx < b.minx ? a.minx : b.minx;
            this.miny = a.miny < b.miny ? a.miny : b.miny;
            this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
            this.maxy = a.maxy > b.maxy ?
                a.maxy : b.maxy
        },
        setExpand: function(a, b) {
            this.minx = a.minx - b;
            this.miny = a.miny - b;
            this.maxx = a.maxx + b;
            this.maxy = a.maxy + b
        },
        toString: function() {
            return "{ x: " + this.minx + " y: " + this.miny + " w: " + (this.maxx - this.minx) + " h: " + (this.maxy - this.miny) + " }"
        },
        __class__: na
    };
    var se = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Vec2"] = se;
    se.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Vec2"];
    se.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == qa.zpp_pool ? b = new qa : (b = qa.zpp_pool, qa.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            var c;
            null == qa.zpp_pool ? c = new qa : (c = qa.zpp_pool, qa.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a =
                this.head;
            this.head = a.next;
            a.elt = null;
            a.next = qa.zpp_pool;
            qa.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        erase: function(a) {
            return this.inlined_erase(a)
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next =
                qa.zpp_pool;
            qa.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: se
    };
    var o = function() {};
    g["zpp_nape.geom.ZPP_Collide"] = o;
    o.__name__ = ["zpp_nape", "geom", "ZPP_Collide"];
    o.circleContains = function(a, b) {
        var c = 0,
            d = 0,
            c = b.x - a.worldCOMx,
            d = b.y - a.worldCOMy;
        return c * c + d * d < a.radius * a.radius
    };
    o.polyContains = function(a, b) {
        var c;
        c = !0;
        for (var d = a.edges.head; null != d;) {
            var e = d.elt;
            if (e.gnormx * b.x + e.gnormy * b.y <= e.gprojection) d = d.next;
            else {
                c = !1;
                break
            }
        }
        return c
    };
    o.containTest = function(a, b) {
        if (a.aabb.contains(b.aabb)) {
            if (a.type == f.id_ShapeType_CIRCLE) {
                if (b.type == f.id_ShapeType_CIRCLE) {
                    var c = a.circle.radius + -b.circle.radius,
                        d = 0,
                        e = 0,
                        d = b.circle.worldCOMx - a.circle.worldCOMx,
                        e = b.circle.worldCOMy - a.circle.worldCOMy;
                    return d * d + e * e <= c * c
                }
                c = !0;
                for (d = b.polygon.gverts.next; null != d;) {
                    var h = d;
                    if (function() {
                        var b = a.circle.radius,
                            c = 0,
                            d = 0,
                            c = h.x - a.circle.worldCOMx,
                            d = h.y - a.circle.worldCOMy;
                        return c * c + d * d <= b * b
                    }(this)) d = d.next;
                    else {
                        c = !1;
                        break
                    }
                }
                return c
            }
            if (b.type == f.id_ShapeType_CIRCLE) {
                c = !0;
                for (d = a.polygon.edges.head; null != d;)
                    if (e = d.elt, e.gnormx * b.circle.worldCOMx + e.gnormy * b.circle.worldCOMy + b.circle.radius <= e.gprojection) d = d.next;
                    else {
                        c = !1;
                        break
                    }
                return c
            }
            c = !0;
            for (d = a.polygon.edges.head; null != d;) {
                var n = d.elt;
                if (function() {
                    for (var a = -1.0E100, c = b.polygon.gverts.next; null != c;) {
                        var d = c,
                            d = n.gnormx * d.x + n.gnormy * d.y;
                        d > a && (a = d);
                        c = c.next
                    }
                    return a <= n.gprojection
                }(this)) d =
                    d.next;
                else {
                    c = !1;
                    break
                }
            }
            return c
        }
        return !1
    };
    o.contactCollide = function(a, b, c, d) {
        if (b.type == f.id_ShapeType_POLYGON)
            if (a.type == f.id_ShapeType_POLYGON) {
                for (var e = !0, h = -1.0E100, n = -1, i = null, j = null, g = a.polygon.edges.head; null != g;) {
                    for (var k = g.elt, p = 1.0E100, x = b.polygon.gverts.next; null != x;) {
                        var m = x,
                            m = k.gnormx * m.x + k.gnormy * m.y;
                        m < p && (p = m);
                        if (p - k.gprojection <= h) break;
                        x = x.next
                    }
                    p -= k.gprojection;
                    if (0 <= p) {
                        e = !1;
                        break
                    }
                    p > h && (h = p, i = k, n = 1);
                    g = g.next
                }
                if (e) {
                    for (g = b.polygon.edges.head; null != g;) {
                        k = g.elt;
                        p = 1.0E100;
                        for (x = a.polygon.gverts.next; null !=
                            x;) {
                            m = x;
                            m = k.gnormx * m.x + k.gnormy * m.y;
                            m < p && (p = m);
                            if (p - k.gprojection <= h) break;
                            x = x.next
                        }
                        p -= k.gprojection;
                        if (0 <= p) {
                            e = !1;
                            break
                        }
                        p > h && (h = p, j = k, n = 2);
                        g = g.next
                    }
                    if (e) {
                        1 == n ? (a = b.polygon, b = i, j = 1) : (a = a.polygon, b = j, j = -1);
                        i = null;
                        e = 1.0E100;
                        for (h = a.edges.head; null != h;) g = h.elt, k = b.gnormx * g.gnormx + b.gnormy * g.gnormy, k < e && (e = k, i = g), h = h.next;
                        var h = e = 0,
                            e = i.gp0.x,
                            h = i.gp0.y,
                            k = g = 0,
                            g = i.gp1.x,
                            k = i.gp1.y,
                            x = p = 0,
                            p = g - e,
                            x = k - h,
                            o = b.gnormy * e - b.gnormx * h,
                            m = b.gnormy * g - b.gnormx * k,
                            q = 1 / (m - o),
                            o = (-b.tp1 - o) * q;
                        o > l.epsilon && (e += p * o, h += x * o);
                        m = (-b.tp0 -
                            m) * q;
                        m < -l.epsilon && (g += p * m, k += x * m);
                        x = p = 0;
                        x = j;
                        p = b.gnormx * x;
                        x *= b.gnormy;
                        c.lnormx = b.lnormx;
                        c.lnormy = b.lnormy;
                        c.lproj = b.lprojection;
                        c.radius = 0;
                        c.rev = d != (-1 == j);
                        c.ptype = c.rev ? 1 : 0;
                        m = e * b.gnormx + h * b.gnormy - b.gprojection;
                        j = g * b.gnormx + k * b.gnormy - b.gprojection;
                        if (0 < m && 0 < j) return !1;
                        d && (p = -p, x = -x);
                        d = c.injectContact(e - 0.5 * b.gnormx * m, h - 0.5 * b.gnormy * m, p, x, m, c.rev ? 1 : 0, 0 < m);
                        e -= 1 * a.body.posx;
                        h -= 1 * a.body.posy;
                        d.inner.lr1x = e * a.body.axisy + h * a.body.axisx;
                        d.inner.lr1y = h * a.body.axisy - e * a.body.axisx;
                        d = c.injectContact(g - 0.5 *
                            b.gnormx * j, k - 0.5 * b.gnormy * j, p, x, j, c.rev ? 0 : 1, 0 < j);
                        g -= 1 * a.body.posx;
                        k -= 1 * a.body.posy;
                        d.inner.lr1x = g * a.body.axisy + k * a.body.axisx;
                        d.inner.lr1y = k * a.body.axisy - g * a.body.axisx;
                        1 == n ? (c.__ref_edge1 = b, c.__ref_edge2 = i) : (c.__ref_edge2 = b, c.__ref_edge1 = i);
                        return !0
                    }
                }
            } else {
                j = -1.0E100;
                i = !0;
                e = n = null;
                h = b.polygon.gverts.next;
                for (g = b.polygon.edges.head; null != g;) {
                    k = g.elt;
                    p = k.gnormx * a.circle.worldCOMx + k.gnormy * a.circle.worldCOMy - k.gprojection - a.circle.radius;
                    if (0 < p) {
                        i = !1;
                        break
                    }
                    p > j && (j = p, n = k, e = h);
                    h = h.next;
                    g = g.next
                }
                if (i) {
                    i =
                        e;
                    e = null == e.next ? b.polygon.gverts.next : e.next;
                    h = a.circle.worldCOMy * n.gnormx - a.circle.worldCOMx * n.gnormy;
                    if (h <= i.y * n.gnormx - i.x * n.gnormy) return j = a.circle.radius, h = e = 0, e = i.x - a.circle.worldCOMx, h = i.y - a.circle.worldCOMy, g = e * e + h * h, g > j * j ? j = null : g < l.epsilon * l.epsilon ? j = c.injectContact(a.circle.worldCOMx, a.circle.worldCOMy, 1, 0, -j, 0, null) : (g = 1 / Math.sqrt(g), k = g < l.epsilon ? 1.0E100 : 1 / g, p = 0.5 + (a.circle.radius - 0.5 * j) * g, j = d ? c.injectContact(a.circle.worldCOMx + e * p, a.circle.worldCOMy + h * p, -e * g, -h * g, k - j, 0, null) : c.injectContact(a.circle.worldCOMx +
                        e * p, a.circle.worldCOMy + h * p, e * g, h * g, k - j, 0, null)), null != j && (e = j.inner, c.ptype = 2, g = h = 0, h = i.x - b.polygon.body.posx, g = i.y - b.polygon.body.posy, c.__ref_edge1 = n, c.__ref_vertex = -1, d ? (e.lr1x = h * b.polygon.body.axisy + g * b.polygon.body.axisx, e.lr1y = g * b.polygon.body.axisy - h * b.polygon.body.axisx, e.lr2x = a.circle.localCOMx, e.lr2y = a.circle.localCOMy) : (e.lr2x = h * b.polygon.body.axisy + g * b.polygon.body.axisx, e.lr2y = g * b.polygon.body.axisy - h * b.polygon.body.axisx, e.lr1x = a.circle.localCOMx, e.lr1y = a.circle.localCOMy), c.radius =
                        a.circle.radius), null != j;
                    if (h >= e.y * n.gnormx - e.x * n.gnormy) return i = a.circle.radius, h = j = 0, j = e.x - a.circle.worldCOMx, h = e.y - a.circle.worldCOMy, g = j * j + h * h, g > i * i ? i = null : g < l.epsilon * l.epsilon ? i = c.injectContact(a.circle.worldCOMx, a.circle.worldCOMy, 1, 0, -i, 0, null) : (g = 1 / Math.sqrt(g), k = g < l.epsilon ? 1.0E100 : 1 / g, p = 0.5 + (a.circle.radius - 0.5 * i) * g, i = d ? c.injectContact(a.circle.worldCOMx + j * p, a.circle.worldCOMy + h * p, -j * g, -h * g, k - i, 0, null) : c.injectContact(a.circle.worldCOMx + j * p, a.circle.worldCOMy + h * p, j * g, h * g, k - i, 0, null)),
                        null != i && (j = i.inner, c.ptype = 2, g = h = 0, h = e.x - b.polygon.body.posx, g = e.y - b.polygon.body.posy, c.__ref_edge1 = n, c.__ref_vertex = 1, d ? (j.lr1x = h * b.polygon.body.axisy + g * b.polygon.body.axisx, j.lr1y = g * b.polygon.body.axisy - h * b.polygon.body.axisx, j.lr2x = a.circle.localCOMx, j.lr2y = a.circle.localCOMy) : (j.lr2x = h * b.polygon.body.axisy + g * b.polygon.body.axisx, j.lr2y = g * b.polygon.body.axisy - h * b.polygon.body.axisx, j.lr1x = a.circle.localCOMx, j.lr1y = a.circle.localCOMy), c.radius = a.circle.radius), null != i;
                    i = b = 0;
                    i = a.circle.radius +
                        0.5 * j;
                    b = n.gnormx * i;
                    i *= n.gnormy;
                    h = e = 0;
                    e = a.circle.worldCOMx - b;
                    h = a.circle.worldCOMy - i;
                    b = d ? c.injectContact(e, h, n.gnormx, n.gnormy, j, 0, null) : c.injectContact(e, h, -n.gnormx, -n.gnormy, j, 0, null);
                    c.ptype = d ? 0 : 1;
                    c.lnormx = n.lnormx;
                    c.lnormy = n.lnormy;
                    c.rev = !d;
                    c.lproj = n.lprojection;
                    c.radius = a.circle.radius;
                    b.inner.lr1x = a.circle.localCOMx;
                    b.inner.lr1y = a.circle.localCOMy;
                    c.__ref_edge1 = n;
                    c.__ref_vertex = 0;
                    return !0
                }
            } else if (n = a.circle.radius + b.circle.radius, j = i = 0, i = b.circle.worldCOMx - a.circle.worldCOMx, j = b.circle.worldCOMy -
            a.circle.worldCOMy, e = i * i + j * j, e > n * n ? n = null : e < l.epsilon * l.epsilon ? n = c.injectContact(a.circle.worldCOMx, a.circle.worldCOMy, 1, 0, -n, 0, null) : (e = 1 / Math.sqrt(e), h = e < l.epsilon ? 1.0E100 : 1 / e, g = 0.5 + (a.circle.radius - 0.5 * n) * e, n = d ? c.injectContact(a.circle.worldCOMx + i * g, a.circle.worldCOMy + j * g, -i * e, -j * e, h - n, 0, null) : c.injectContact(a.circle.worldCOMx + i * g, a.circle.worldCOMy + j * g, i * e, j * e, h - n, 0, null)), null != n) return n = n.inner, d ? (n.lr1x = b.circle.localCOMx, n.lr1y = b.circle.localCOMy, n.lr2x = a.circle.localCOMx, n.lr2y = a.circle.localCOMy) :
            (n.lr1x = a.circle.localCOMx, n.lr1y = a.circle.localCOMy, n.lr2x = b.circle.localCOMx, n.lr2y = b.circle.localCOMy), c.radius = a.circle.radius + b.circle.radius, c.ptype = 2, !0;
        return !1
    };
    o.testCollide_safe = function(a, b) {
        if (b.type == f.id_ShapeType_CIRCLE) var c = a,
            a = b,
            b = c;
        return o.testCollide(a, b)
    };
    o.testCollide = function(a, b) {
        if (b.type == f.id_ShapeType_POLYGON) {
            if (a.type == f.id_ShapeType_POLYGON) {
                for (var c = !0, d = a.polygon.edges.head; null != d;) {
                    for (var e = d.elt, h = 1.0E100, g = b.polygon.gverts.next; null != g;) {
                        var i = g,
                            i = e.gnormx *
                            i.x + e.gnormy * i.y;
                        i < h && (h = i);
                        g = g.next
                    }
                    h -= e.gprojection;
                    if (0 < h) {
                        c = !1;
                        break
                    }
                    d = d.next
                }
                if (c) {
                    for (d = b.polygon.edges.head; null != d;) {
                        e = d.elt;
                        h = 1.0E100;
                        for (g = a.polygon.gverts.next; null != g;) i = g, i = e.gnormx * i.x + e.gnormy * i.y, i < h && (h = i), g = g.next;
                        h -= e.gprojection;
                        if (0 < h) {
                            c = !1;
                            break
                        }
                        d = d.next
                    }
                    return c
                }
            } else {
                d = c = null;
                e = !0;
                h = -1.0E100;
                g = b.polygon.gverts.next;
                for (i = b.polygon.edges.head; null != i;) {
                    var j = i.elt,
                        l = j.gnormx * a.circle.worldCOMx + j.gnormy * a.circle.worldCOMy - j.gprojection - a.circle.radius;
                    if (0 < l) {
                        e = !1;
                        break
                    }
                    l > h &&
                        (h = l, c = j, d = g);
                    g = g.next;
                    i = i.next
                }
                if (e) {
                    e = d;
                    d = null == d.next ? b.polygon.gverts.next : d.next;
                    h = a.circle.worldCOMy * c.gnormx - a.circle.worldCOMx * c.gnormy;
                    if (h <= e.y * c.gnormx - e.x * c.gnormy) return c = a.circle.radius, h = d = 0, d = e.x - a.circle.worldCOMx, h = e.y - a.circle.worldCOMy, d * d + h * h <= c * c;
                    return h >= d.y * c.gnormx - d.x * c.gnormy ? (c = a.circle.radius, h = e = 0, e = d.x - a.circle.worldCOMx, h = d.y - a.circle.worldCOMy, e * e + h * h <= c * c) : !0
                }
            }
            return !1
        }
        c = a.circle.radius + b.circle.radius;
        e = d = 0;
        d = b.circle.worldCOMx - a.circle.worldCOMx;
        e = b.circle.worldCOMy -
            a.circle.worldCOMy;
        return d * d + e * e <= c * c
    };
    o.flowCollide = function(a, b, c) {
        if (b.type == f.id_ShapeType_POLYGON) {
            if (a.type == f.id_ShapeType_POLYGON) {
                for (var d = [], e = [], h = !0, g = !0, i = a.polygon.edges.head; null != i;) {
                    for (var j = i.elt, M = 1.0E100, k = 0, p = b.polygon.gverts.next; null != p;) {
                        var x = p,
                            m = j.gnormx * x.x + j.gnormy * x.y;
                        m < M && (M = m);
                        m >= j.gprojection + l.epsilon && (e[k] = !0, g = !1);
                        k++;
                        p = p.next
                    }
                    M -= j.gprojection;
                    if (0 < M) {
                        h = !1;
                        break
                    }
                    i = i.next
                }
                if (g) return b.polygon.validate_worldCOM(), c.overlap = b.polygon.area, c.centroidx = b.polygon.worldCOMx,
                    c.centroidy = b.polygon.worldCOMy, null, !0;
                if (h) {
                    for (var g = !0, q = b.polygon.edges.head; null != q;) {
                        for (var u = q.elt, s = 1.0E100, w = 0, t = a.polygon.gverts.next; null != t;) {
                            var F = t,
                                z = u.gnormx * F.x + u.gnormy * F.y;
                            z < s && (s = z);
                            z >= u.gprojection + l.epsilon && (d[w] = !0, g = !1);
                            w++;
                            t = t.next
                        }
                        s -= u.gprojection;
                        if (0 < s) {
                            h = !1;
                            break
                        }
                        q = q.next
                    }
                    if (g) return a.polygon.validate_worldCOM(), c.overlap = a.polygon.area, c.centroidx = a.polygon.worldCOMx, c.centroidy = a.polygon.worldCOMy, null, !0;
                    if (h) {
                        for (; null != o.flowpoly.head;) {
                            var E = o.flowpoly.pop_unsafe();
                            if (!E._inuse) {
                                var B = E;
                                null != B.outer && (B.outer.zpp_inner = null, B.outer = null);
                                B._isimmutable = null;
                                B._validate = null;
                                B._invalidate = null;
                                B.next = H.zpp_pool;
                                H.zpp_pool = B
                            }
                        }
                        for (var v = null, C = !1, A = a.polygon.gverts.next, G = 0, D = b.polygon.gverts.next, I = 0, K = 0, L = b.polygon.edgeCnt; K < L;) {
                            var O = K++;
                            if (e[O]) D = D.next;
                            else {
                                I = O;
                                break
                            }
                        }
                        if (null == D) {
                            for (var D = b.polygon.gverts.next, C = !0, S = 0, X = a.polygon.edgeCnt; S < X;) {
                                var ba = S++;
                                if (d[ba]) A = A.next;
                                else {
                                    G = ba;
                                    break
                                }
                            }
                            null == A ? A = a.polygon.gverts.next : (o.flowpoly.add(A), v = o.flowpoly.head.elt)
                        } else o.flowpoly.add(D),
                            v = o.flowpoly.head.elt;
                        var P = 1;
                        if (null == o.flowpoly.head) {
                            for (var U = !0, V = a.polygon.gverts.next, nb = V, J = V.next; null != J;) {
                                for (var ea = J, Nf = 2, aa = b.polygon.gverts.next, Z = aa, T = aa.next; null != T;) {
                                    var Y = T,
                                        ra = 0;
                                    (function() {
                                        var a = 0,
                                            b = 0,
                                            a = nb.x - Z.x,
                                            b = nb.y - Z.y,
                                            c = 0,
                                            d = 0,
                                            c = ea.x - nb.x,
                                            d = ea.y - nb.y,
                                            e = 0,
                                            f = 0,
                                            e = Y.x - Z.x,
                                            f = Y.y - Z.y,
                                            h = d * e - c * f;
                                        h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (ra = e, a = !0) : a = !1) : a = !1) : a = !1;
                                        return a
                                    })(this) && ra < Nf && (Nf = ra, D = aa);
                                    aa = T;
                                    Z =
                                        Y;
                                    T = T.next
                                }
                                var N = T = b.polygon.gverts.next,
                                    Q = 0;
                                (function() {
                                    var a = 0,
                                        b = 0,
                                        a = nb.x - Z.x,
                                        b = nb.y - Z.y,
                                        c = 0,
                                        d = 0,
                                        c = ea.x - nb.x,
                                        d = ea.y - nb.y,
                                        e = 0,
                                        f = 0,
                                        e = N.x - Z.x,
                                        f = N.y - Z.y,
                                        h = d * e - c * f;
                                    h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (Q = e, a = !0) : a = !1) : a = !1) : a = !1;
                                    return a
                                })(this) && Q < Nf && (Nf = Q, D = aa);
                                if (2 != Nf) {
                                    var oa = 0,
                                        Ca = 0,
                                        ga = Nf,
                                        oa = nb.x + (ea.x - nb.x) * ga,
                                        Ca = nb.y + (ea.y - nb.y) * ga,
                                        v = H.get(oa, Ca, null);
                                    o.flowpoly.add(v);
                                    C = !0;
                                    A = V;
                                    U = !1;
                                    break
                                }
                                V = J;
                                nb = ea;
                                J = J.next
                            }
                            if (U) {
                                for (var ia =
                                    J = a.polygon.gverts.next, r = 2, ka = b.polygon.gverts.next, $ = ka, na = ka.next; null != na;) {
                                    var W = na,
                                        ua = 0;
                                    (function() {
                                        var a = 0,
                                            b = 0,
                                            a = nb.x - $.x,
                                            b = nb.y - $.y,
                                            c = 0,
                                            d = 0,
                                            c = ia.x - nb.x,
                                            d = ia.y - nb.y,
                                            e = 0,
                                            f = 0,
                                            e = W.x - $.x,
                                            f = W.y - $.y,
                                            h = d * e - c * f;
                                        h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (ua = e, a = !0) : a = !1) : a = !1) : a = !1;
                                        return a
                                    })(this) && ua < r && (r = ua, D = ka);
                                    ka = na;
                                    $ = W;
                                    na = na.next
                                }
                                var pa = na = b.polygon.gverts.next,
                                    Fa = 0;
                                (function() {
                                    var a = 0,
                                        b = 0,
                                        a = nb.x - $.x,
                                        b = nb.y - $.y,
                                        c = 0,
                                        d = 0,
                                        c = ia.x - nb.x,
                                        d = ia.y - nb.y,
                                        e = 0,
                                        f = 0,
                                        e = pa.x - $.x,
                                        f = pa.y - $.y,
                                        h = d * e - c * f;
                                    h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (Fa = e, a = !0) : a = !1) : a = !1) : a = !1;
                                    return a
                                })(this) && Fa < r && (r = Fa, D = ka);
                                if (2 != r) {
                                    var va = 0,
                                        Ia = 0,
                                        Of = r,
                                        va = nb.x + (ia.x - nb.x) * Of,
                                        Ia = nb.y + (ia.y - nb.y) * Of,
                                        v = H.get(va, Ia, null);
                                    o.flowpoly.add(v);
                                    C = !0;
                                    A = V
                                }
                            }
                            P = 2
                        }
                        for (;;)
                            if (C)
                                if (A = A.next, G++, null == A && (A = a.polygon.gverts.next, G = 0), d[G]) {
                                    var wa = o.flowpoly.head.elt,
                                        Gh = A,
                                        R = D,
                                        Hh = D.next;
                                    null == Hh && (Hh =
                                        b.polygon.gverts.next);
                                    var za = -1,
                                        ta = null,
                                        Ha = 0,
                                        jb = 0,
                                        xa = Hh,
                                        Lc = Hh;
                                    do {
                                        var Ta = Lc,
                                            ma = 0;
                                        if (function() {
                                            var a = 0,
                                                b = 0,
                                                a = R.x - wa.x,
                                                b = R.y - wa.y,
                                                c = 0,
                                                d = 0,
                                                c = Ta.x - R.x,
                                                d = Ta.y - R.y,
                                                e = 0,
                                                f = 0,
                                                e = Gh.x - wa.x,
                                                f = Gh.y - wa.y,
                                                h = d * e - c * f;
                                            h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (ma = e, a = !0) : a = !1) : a = !1) : a = !1;
                                            return a
                                        }(this) && ma >= za)
                                            if (ta = D, Ha = I, ++jb == P) {
                                                za = ma;
                                                Lc = xa;
                                                break
                                            } else za = ma;
                                        R = Ta;
                                        D = Lc;
                                        I++;
                                        I >= b.polygon.edgeCnt && (I = 0);
                                        Lc = Lc.next;
                                        null == Lc && (Lc = b.polygon.gverts.next)
                                    } while (0);
                                    for (; Lc != xa;) {
                                        var Da = Lc,
                                            Ka = 0;
                                        if (function() {
                                            var a = 0,
                                                b = 0,
                                                a = R.x - wa.x,
                                                b = R.y - wa.y,
                                                c = 0,
                                                d = 0,
                                                c = Da.x - R.x,
                                                d = Da.y - R.y,
                                                e = 0,
                                                f = 0,
                                                e = Gh.x - wa.x,
                                                f = Gh.y - wa.y,
                                                h = d * e - c * f;
                                            h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (Ka = e, a = !0) : a = !1) : a = !1) : a = !1;
                                            return a
                                        }(this) && Ka >= za)
                                            if (ta = D, Ha = I, ++jb == P) {
                                                za = Ka;
                                                Lc = xa;
                                                break
                                            } else za = Ka;
                                        R = Da;
                                        D = Lc;
                                        I++;
                                        I >= b.polygon.edgeCnt && (I = 0);
                                        Lc = Lc.next;
                                        null == Lc && (Lc = b.polygon.gverts.next)
                                    }
                                    if (null == ta) break;
                                    var La = ta,
                                        fa = ta.next;
                                    null ==
                                        fa && (fa = b.polygon.gverts.next);
                                    var Wa = fa,
                                        Ma = 0,
                                        Yh = 0,
                                        Ga = za,
                                        Ma = La.x + (Wa.x - La.x) * Ga,
                                        Yh = La.y + (Wa.y - La.y) * Ga;
                                    if (null != v && sb.vec_dsq(Ma, Yh, v.x, v.y) < l.epsilon) break;
                                    o.flowpoly.add(H.get(Ma, Yh, null));
                                    null == v && (v = o.flowpoly.head.elt);
                                    D = ta;
                                    I = Ha;
                                    C = !C;
                                    P = 2
                                } else {
                                    var Pa = A;
                                    if (null != v && sb.vec_dsq(Pa.x, Pa.y, v.x, v.y) < l.epsilon) break;
                                    o.flowpoly.add(Pa);
                                    null == v && (v = o.flowpoly.head.elt);
                                    P = 1
                                } else if (D = D.next, I++, null == D && (D = b.polygon.gverts.next, I = 0), e[I]) {
                            var ya = o.flowpoly.head.elt,
                                fb = D,
                                y = A,
                                Ea = A.next;
                            null == Ea && (Ea = a.polygon.gverts.next);
                            var ca = -1,
                                la = null,
                                Va = 0,
                                ib = 0,
                                Za = Ea,
                                Jb = Ea;
                            do {
                                var $a = Jb,
                                    kb = 0;
                                if (function() {
                                    var a = 0,
                                        b = 0,
                                        a = y.x - ya.x,
                                        b = y.y - ya.y,
                                        c = 0,
                                        d = 0,
                                        c = $a.x - y.x,
                                        d = $a.y - y.y,
                                        e = 0,
                                        f = 0,
                                        e = fb.x - ya.x,
                                        f = fb.y - ya.y,
                                        h = d * e - c * f;
                                    h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (kb = e, a = !0) : a = !1) : a = !1) : a = !1;
                                    return a
                                }(this) && kb >= ca)
                                    if (la = A, Va = G, ++ib == P) {
                                        ca = kb;
                                        Jb = Za;
                                        break
                                    } else ca = kb;
                                y = $a;
                                A = Jb;
                                G++;
                                G >= a.polygon.edgeCnt && (G = 0);
                                Jb = Jb.next;
                                null == Jb && (Jb = a.polygon.gverts.next)
                            } while (0);
                            for (; Jb !=
                                Za;) {
                                var ab = Jb,
                                    Ba = 0;
                                if (function() {
                                    var a = 0,
                                        b = 0,
                                        a = y.x - ya.x,
                                        b = y.y - ya.y,
                                        c = 0,
                                        d = 0,
                                        c = ab.x - y.x,
                                        d = ab.y - y.y,
                                        e = 0,
                                        f = 0,
                                        e = fb.x - ya.x,
                                        f = fb.y - ya.y,
                                        h = d * e - c * f;
                                    h * h > l.epsilon * l.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > l.epsilon && e < 1 - l.epsilon ? (a = (d * a - c * b) * h, a > l.epsilon && a < 1 - l.epsilon ? (Ba = e, a = !0) : a = !1) : a = !1) : a = !1;
                                    return a
                                }(this) && Ba >= ca)
                                    if (la = A, Va = G, ++ib == P) {
                                        ca = Ba;
                                        Jb = Za;
                                        break
                                    } else ca = Ba;
                                y = ab;
                                A = Jb;
                                G++;
                                G >= a.polygon.edgeCnt && (G = 0);
                                Jb = Jb.next;
                                null == Jb && (Jb = a.polygon.gverts.next)
                            }
                            if (null == la) break;
                            var Ra = la,
                                Sa = la.next;
                            null == Sa && (Sa =
                                a.polygon.gverts.next);
                            var ob = Sa,
                                mb = 0,
                                hb = 0,
                                rb = ca,
                                mb = Ra.x + (ob.x - Ra.x) * rb,
                                hb = Ra.y + (ob.y - Ra.y) * rb;
                            if (null != v && sb.vec_dsq(mb, hb, v.x, v.y) < l.epsilon) break;
                            o.flowpoly.add(H.get(mb, hb, null));
                            null == v && (v = o.flowpoly.head.elt);
                            A = la;
                            G = Va;
                            C = !C;
                            P = 2
                        } else {
                            var Ya = D;
                            if (null != v && sb.vec_dsq(Ya.x, Ya.y, v.x, v.y) < l.epsilon) break;
                            o.flowpoly.add(Ya);
                            null == v && (v = o.flowpoly.head.elt);
                            P = 1
                        } if (null != o.flowpoly.head && null != o.flowpoly.head.next && null != o.flowpoly.head.next.next) {
                            for (var Td = 0, qa = 0, ke = 0, Td = ke = qa = 0, Mc = o.flowpoly.head,
                                Aa = Mc.elt, Mc = Mc.next, Oa = Mc.elt, Mc = Mc.next; null != Mc;) var Pf = Mc.elt,
                                Td = Td + Oa.x * (Pf.y - Aa.y),
                                lb = Pf.y * Oa.x - Pf.x * Oa.y,
                                qa = qa + (Oa.x + Pf.x) * lb,
                                ke = ke + (Oa.y + Pf.y) * lb,
                                Aa = Oa,
                                Oa = Pf,
                                Mc = Mc.next;
                            var Mc = o.flowpoly.head,
                                Qf = Mc.elt,
                                Td = Td + Oa.x * (Qf.y - Aa.y),
                                ai = Qf.y * Oa.x - Qf.x * Oa.y,
                                qa = qa + (Oa.x + Qf.x) * ai,
                                ke = ke + (Oa.y + Qf.y) * ai,
                                Aa = Oa,
                                Oa = Qf,
                                Mc = Mc.next,
                                Qa = Mc.elt,
                                Td = Td + Oa.x * (Qa.y - Aa.y),
                                tb = Qa.y * Oa.x - Qa.x * Oa.y,
                                qa = qa + (Oa.x + Qa.x) * tb,
                                ke = ke + (Oa.y + Qa.y) * tb,
                                Td = 0.5 * Td,
                                Ab = 1 / (6 * Td),
                                qa = qa * Ab,
                                ke = ke * Ab;
                            c.overlap = -Td;
                            c.centroidx = qa;
                            c.centroidy = ke;
                            null;
                            return !0
                        }
                    }
                }
                return !1
            }
            for (var cb = [], Cb = !0, sa = null, db = null, Fb = -1.0E100, Ib = !0, vb = b.polygon.gverts.next, Kb = 0, qb = b.polygon.edges.head; null != qb;) {
                var Ua = qb.elt,
                    Na = Ua.gnormx * a.circle.worldCOMx + Ua.gnormy * a.circle.worldCOMy;
                if (Na > Ua.gprojection + a.circle.radius) {
                    Ib = !1;
                    break
                } else Na + a.circle.radius > Ua.gprojection + l.epsilon && (Cb = !1, cb[Kb] = !0);
                Na -= Ua.gprojection + a.circle.radius;
                Na > Fb && (Fb = Na, sa = Ua, db = vb);
                vb = vb.next;
                Kb++;
                qb = qb.next
            }
            if (Ib) {
                if (Cb) return c.overlap = a.circle.area, c.centroidx = a.circle.worldCOMx,
                    c.centroidy = a.circle.worldCOMy, null, !0;
                var pb = db,
                    gb;
                gb = null == db.next ? b.polygon.gverts.next : db.next;
                var ec = a.circle.worldCOMy * sa.gnormx - a.circle.worldCOMx * sa.gnormy;
                if (ec <= pb.y * sa.gnormx - pb.x * sa.gnormy ? function() {
                    var b = a.circle.radius,
                        c = 0,
                        d = 0,
                        c = pb.x - a.circle.worldCOMx,
                        d = pb.y - a.circle.worldCOMy;
                    return c * c + d * d <= b * b
                }(this) : ec >= gb.y * sa.gnormx - gb.x * sa.gnormy ? function() {
                    var b = a.circle.radius,
                        c = 0,
                        d = 0,
                        c = gb.x - a.circle.worldCOMx,
                        d = gb.y - a.circle.worldCOMy;
                    return c * c + d * d <= b * b
                }(this) : 1) {
                    for (var Db = [], Pb = 0, ic = !0,
                        pc = null, ha = 0, Bb = b.polygon.gverts.next; null != Bb;) {
                        var tc = Bb,
                            Tc = sb.vec_dsq(tc.x, tc.y, a.circle.worldCOMx, a.circle.worldCOMy);
                        (Db[Pb] = Tc <= a.circle.radius * a.circle.radius) ? (ha = Pb, pc = Bb) : ic = !1;
                        Pb++;
                        Bb = Bb.next
                    }
                    if (ic) return b.polygon.validate_worldCOM(), c.overlap = b.polygon.area, c.centroidx = b.polygon.worldCOMx, c.centroidy = b.polygon.worldCOMy, null, !0;
                    for (; null != o.flowpoly.head;) {
                        var uc = o.flowpoly.pop_unsafe();
                        if (!uc._inuse) {
                            var Ja = uc;
                            null != Ja.outer && (Ja.outer.zpp_inner = null, Ja.outer = null);
                            Ja._isimmutable = null;
                            Ja._validate = null;
                            Ja._invalidate = null;
                            Ja.next = H.zpp_pool;
                            H.zpp_pool = Ja
                        }
                    }
                    o.flowsegs.clear();
                    var wb = null,
                        ja = 1;
                    null == pc ? (pc = b.polygon.gverts.next, ja = 2) : o.flowpoly.add(wb = pc);
                    for (; 0 != ja;)
                        if (1 == ja)
                            if (pc = pc.next, null == pc && (pc = b.polygon.gverts.next), ha++, ha >= b.polygon.edgeCnt && (ha = 0), Db[ha]) {
                                if (sb.vec_dsq(wb.x, wb.y, pc.x, pc.y) < l.epsilon) break;
                                o.flowpoly.add(pc)
                            } else {
                                var bb = o.flowpoly.head.elt,
                                    Lb = pc,
                                    Mb = 0,
                                    Nb = 0,
                                    Mb = Lb.x - bb.x,
                                    Nb = Lb.y - bb.y,
                                    Ob = 0,
                                    Qb = 0,
                                    Ob = bb.x - a.circle.worldCOMx,
                                    Qb = bb.y - a.circle.worldCOMy,
                                    Eb = Mb * Mb +
                                    Nb * Nb,
                                    Rb = 2 * (Ob * Mb + Qb * Nb),
                                    Ac = Math.sqrt(Rb * Rb - 4 * Eb * (Ob * Ob + Qb * Qb - a.circle.radius * a.circle.radius)),
                                    Eb = 1 / (2 * Eb),
                                    Bc = (-Rb - Ac) * Eb,
                                    kc = 0,
                                    mc = 0,
                                    Fc = Bc < l.epsilon ? (-Rb + Ac) * Eb : Bc,
                                    kc = bb.x + (Lb.x - bb.x) * Fc,
                                    mc = bb.y + (Lb.y - bb.y) * Fc;
                                if (sb.vec_dsq(wb.x, wb.y, kc, mc) < l.epsilon) break;
                                o.flowpoly.add(H.get(kc, mc, null));
                                ja = 2
                            } else if (2 == ja) {
                        var Sb = pc.next;
                        null == Sb && (Sb = b.polygon.gverts.next);
                        var da = pc,
                            ja = 0,
                            eb = Sb,
                            xb = Sb;
                        do {
                            var Xa = xb,
                                Tb = ha + 1;
                            Tb == b.polygon.edgeCnt && (Tb = 0);
                            if (cb[ha])
                                if (Db[Tb]) {
                                    var Ub = 0,
                                        Vb = 0,
                                        Ub = Xa.x - da.x,
                                        Vb = Xa.y - da.y,
                                        Yb = 0,
                                        Zb = 0,
                                        Yb = da.x - a.circle.worldCOMx,
                                        Zb = da.y - a.circle.worldCOMy,
                                        Hb = Ub * Ub + Vb * Vb,
                                        $b = 2 * (Yb * Ub + Zb * Vb),
                                        Jc = Math.sqrt($b * $b - 4 * Hb * (Yb * Yb + Zb * Zb - a.circle.radius * a.circle.radius)),
                                        Hb = 1 / (2 * Hb),
                                        Kc = (-$b - Jc) * Hb,
                                        qc = 0,
                                        rc = 0,
                                        Pc = Kc < l.epsilon ? (-$b + Jc) * Hb : Kc,
                                        qc = da.x + (Xa.x - da.x) * Pc,
                                        rc = da.y + (Xa.y - da.y) * Pc;
                                    if (sb.vec_dsq(wb.x, wb.y, qc, rc) < l.epsilon) {
                                        ja = 0;
                                        xb = eb;
                                        break
                                    }
                                    var Qc = H.get(qc, rc, null);
                                    o.flowsegs.add(o.flowpoly.head.elt);
                                    o.flowsegs.add(Qc);
                                    o.flowpoly.add(Qc);
                                    ja = 1;
                                    xb = eb;
                                    break
                                } else {
                                    var bc = 0,
                                        cc = 0,
                                        sc, dc = 0,
                                        hc = 0,
                                        dc = Xa.x - da.x,
                                        hc = Xa.y - da.y,
                                        lc = 0,
                                        nc = 0,
                                        lc = da.x - a.circle.worldCOMx,
                                        nc = da.y - a.circle.worldCOMy,
                                        Gb = dc * dc + hc * hc,
                                        Xb = 2 * (lc * dc + nc * hc),
                                        ub = Xb * Xb - 4 * Gb * (lc * lc + nc * nc - a.circle.radius * a.circle.radius);
                                    ub * ub < l.epsilon ? (bc = 0 > ub ? 10 : cc = -Xb / (2 * Gb), sc = !1) : (ub = Math.sqrt(ub), Gb = 1 / (2 * Gb), bc = (-Xb - ub) * Gb, cc = (-Xb + ub) * Gb, sc = !0);
                                    if (bc < 1 - l.epsilon && cc > l.epsilon) {
                                        var Hc = 0,
                                            Oc = 0,
                                            bd = bc,
                                            Hc = da.x + (Xa.x - da.x) * bd,
                                            Oc = da.y + (Xa.y - da.y) * bd;
                                        if (null != wb && sb.vec_dsq(wb.x, wb.y, Hc, Oc) < l.epsilon) {
                                            ja = 0;
                                            xb = eb;
                                            break
                                        }
                                        var dd = H.get(Hc, Oc, null);
                                        null != o.flowpoly.head &&
                                            (o.flowsegs.add(o.flowpoly.head.elt), o.flowsegs.add(dd));
                                        o.flowpoly.add(dd);
                                        null == wb && (wb = o.flowpoly.head.elt);
                                        if (sc) {
                                            var ed = 0,
                                                fd = 0,
                                                hd = cc,
                                                ed = da.x + (Xa.x - da.x) * hd,
                                                fd = da.y + (Xa.y - da.y) * hd;
                                            o.flowpoly.add(H.get(ed, fd, null))
                                        }
                                    }
                                }
                            da = Xa;
                            pc = xb;
                            ha = Tb;
                            xb = xb.next;
                            null == xb && (xb = b.polygon.gverts.next)
                        } while (0);
                        for (; xb != eb;) {
                            var Ud = xb,
                                yc = ha + 1;
                            yc == b.polygon.edgeCnt && (yc = 0);
                            if (cb[ha])
                                if (Db[yc]) {
                                    var zc = 0,
                                        Cc = 0,
                                        zc = Ud.x - da.x,
                                        Cc = Ud.y - da.y,
                                        Ec = 0,
                                        Gc = 0,
                                        Ec = da.x - a.circle.worldCOMx,
                                        Gc = da.y - a.circle.worldCOMy,
                                        oc = zc * zc + Cc * Cc,
                                        Ic = 2 *
                                        (Ec * zc + Gc * Cc),
                                        nd = Math.sqrt(Ic * Ic - 4 * oc * (Ec * Ec + Gc * Gc - a.circle.radius * a.circle.radius)),
                                        oc = 1 / (2 * oc),
                                        pd = (-Ic - nd) * oc,
                                        $c = 0,
                                        ad = 0,
                                        qd = pd < l.epsilon ? (-Ic + nd) * oc : pd,
                                        $c = da.x + (Ud.x - da.x) * qd,
                                        ad = da.y + (Ud.y - da.y) * qd;
                                    if (sb.vec_dsq(wb.x, wb.y, $c, ad) < l.epsilon) {
                                        ja = 0;
                                        xb = eb;
                                        break
                                    }
                                    var rd = H.get($c, ad, null);
                                    o.flowsegs.add(o.flowpoly.head.elt);
                                    o.flowsegs.add(rd);
                                    o.flowpoly.add(rd);
                                    ja = 1;
                                    xb = eb;
                                    break
                                } else {
                                    var Rc = 0,
                                        Sc = 0,
                                        cd, Vc = 0,
                                        Wc = 0,
                                        Vc = Ud.x - da.x,
                                        Wc = Ud.y - da.y,
                                        Xc = 0,
                                        Yc = 0,
                                        Xc = da.x - a.circle.worldCOMx,
                                        Yc = da.y - a.circle.worldCOMy,
                                        jc = Vc *
                                        Vc + Wc * Wc,
                                        Dc = 2 * (Xc * Vc + Yc * Wc),
                                        Wb = Dc * Dc - 4 * jc * (Xc * Xc + Yc * Yc - a.circle.radius * a.circle.radius);
                                    Wb * Wb < l.epsilon ? (Rc = 0 > Wb ? 10 : Sc = -Dc / (2 * jc), cd = !1) : (Wb = Math.sqrt(Wb), jc = 1 / (2 * jc), Rc = (-Dc - Wb) * jc, Sc = (-Dc + Wb) * jc, cd = !0);
                                    if (Rc < 1 - l.epsilon && Sc > l.epsilon) {
                                        var od = 0,
                                            sd = 0,
                                            Cd = Rc,
                                            od = da.x + (Ud.x - da.x) * Cd,
                                            sd = da.y + (Ud.y - da.y) * Cd;
                                        if (null != wb && sb.vec_dsq(wb.x, wb.y, od, sd) < l.epsilon) {
                                            ja = 0;
                                            xb = eb;
                                            break
                                        }
                                        var Dd = H.get(od, sd, null);
                                        null != o.flowpoly.head && (o.flowsegs.add(o.flowpoly.head.elt), o.flowsegs.add(Dd));
                                        o.flowpoly.add(Dd);
                                        null ==
                                            wb && (wb = o.flowpoly.head.elt);
                                        if (cd) {
                                            var Ed = 0,
                                                Fd = 0,
                                                Gd = Sc,
                                                Ed = da.x + (Ud.x - da.x) * Gd,
                                                Fd = da.y + (Ud.y - da.y) * Gd;
                                            o.flowpoly.add(H.get(Ed, Fd, null))
                                        }
                                    }
                                }
                            da = Ud;
                            pc = xb;
                            ha = yc;
                            xb = xb.next;
                            null == xb && (xb = b.polygon.gverts.next)
                        }
                    }
                    if (null == o.flowpoly.head) return !1;
                    if (null == o.flowpoly.head.next) {
                        for (var Hd = !0, gd = b.polygon.edges.head; null != gd;) {
                            var td = gd.elt;
                            if (td.gnormx * a.circle.worldCOMx + td.gnormy * a.circle.worldCOMy > td.gprojection) {
                                Hd = !1;
                                break
                            }
                            gd = gd.next
                        }
                        return Hd ? (c.overlap = a.circle.area, c.centroidx = a.circle.worldCOMx, c.centroidy =
                            a.circle.worldCOMy, null, !0) : !1
                    }
                    var fc = 0,
                        gc = 0,
                        vc = 0;
                    if (null != o.flowpoly.head.next.next) {
                        for (var Bd = 0, le = 0, me = 0, Bd = me = le = 0, Nc = o.flowpoly.head, Uc = Nc.elt, Nc = Nc.next, yb = Nc.elt, Nc = Nc.next; null != Nc;) var wc = Nc.elt,
                            Bd = Bd + yb.x * (wc.y - Uc.y),
                            Jd = wc.y * yb.x - wc.x * yb.y,
                            le = le + (yb.x + wc.x) * Jd,
                            me = me + (yb.y + wc.y) * Jd,
                            Uc = yb,
                            yb = wc,
                            Nc = Nc.next;
                        var Nc = o.flowpoly.head,
                            xc = Nc.elt,
                            Bd = Bd + yb.x * (xc.y - Uc.y),
                            Kd = xc.y * yb.x - xc.x * yb.y,
                            le = le + (yb.x + xc.x) * Kd,
                            me = me + (yb.y + xc.y) * Kd,
                            Uc = yb,
                            yb = xc,
                            Nc = Nc.next,
                            Zc = Nc.elt,
                            Bd = Bd + yb.x * (Zc.y - Uc.y),
                            Nd = Zc.y *
                            yb.x - Zc.x * yb.y,
                            le = le + (yb.x + Zc.x) * Nd,
                            me = me + (yb.y + Zc.y) * Nd,
                            Bd = 0.5 * Bd,
                            Od = 1 / (6 * Bd),
                            le = le * Od,
                            me = me * Od,
                            Rd = -Bd,
                            fc = fc + le * Rd,
                            gc = gc + me * Rd,
                            vc = vc - Bd
                    } else o.flowsegs.add(o.flowpoly.head.elt), o.flowsegs.add(o.flowpoly.head.next.elt);
                    for (; null != o.flowsegs.head;) var ld = o.flowsegs.pop_unsafe(),
                        md = o.flowsegs.pop_unsafe(),
                        Sd = 0,
                        Vd = 0,
                        Sd = md.x - ld.x,
                        Vd = md.y - ld.y,
                        qe = 0,
                        re = 0,
                        qe = Sd,
                        re = Vd,
                        Wd = 1 / Math.sqrt(qe * qe + re * re),
                        qe = qe * Wd,
                        re = re * Wd,
                        pe = qe,
                        qe = -re,
                        re = pe,
                        ne = 0,
                        oe = 0,
                        ne = ld.x + md.x,
                        oe = ld.y + md.y,
                        ne = 0.5 * ne,
                        oe = 0.5 * oe,
                        ne = ne - 1 * a.circle.worldCOMx,
                        oe = oe - 1 * a.circle.worldCOMy,
                        Id = 0,
                        Xd = 0,
                        Yd = qe * ne + re * oe,
                        ud = Yd / a.circle.radius,
                        id = Math.sqrt(1 - ud * ud),
                        Zd = Math.acos(ud),
                        Id = a.circle.radius * (a.circle.radius * Zd - Yd * id),
                        Xd = 0.6666666666666666 * a.circle.radius * id * id * id / (Zd - ud * id),
                        ne = a.circle.worldCOMx,
                        oe = a.circle.worldCOMy,
                        $d = Xd,
                        ne = ne + qe * $d,
                        oe = oe + re * $d,
                        ae = Id,
                        fc = fc + ne * ae,
                        gc = gc + oe * ae,
                        vc = vc + Id;
                    var be = 1 / vc,
                        fc = fc * be,
                        gc = gc * be;
                    c.overlap = vc;
                    c.centroidx = fc;
                    c.centroidy = gc;
                    null;
                    return !0
                }
            }
            return !1
        }
        var zb = a.circle,
            ac = b.circle,
            vd = 0,
            wd = 0,
            vd = ac.worldCOMx - zb.worldCOMx,
            wd = ac.worldCOMy -
            zb.worldCOMy,
            ce = zb.radius + ac.radius,
            Ld = vd * vd + wd * wd;
        if (Ld > ce * ce) return !1;
        if (Ld < l.epsilon * l.epsilon) zb.radius < ac.radius ? (c.overlap = zb.area, c.centroidx = zb.worldCOMx, c.centroidy = zb.worldCOMy) : (c.overlap = ac.area, c.centroidx = ac.worldCOMx, c.centroidy = ac.worldCOMy);
        else {
            var xd = Math.sqrt(Ld),
                de = 1 / xd,
                yd = 0.5 * (xd - (ac.radius * ac.radius - zb.radius * zb.radius) * de);
            if (yd <= -zb.radius) c.overlap = zb.area, c.centroidx = zb.worldCOMx, c.centroidy = zb.worldCOMy;
            else {
                var Md = xd - yd;
                if (Md <= -ac.radius) c.overlap = ac.area, c.centroidx =
                    ac.worldCOMx, c.centroidy = ac.worldCOMy;
                else {
                    var Pd = 0,
                        ee = 0,
                        Qd = 0,
                        fe = 0,
                        zd = yd / zb.radius,
                        jd = Math.sqrt(1 - zd * zd),
                        ge = Math.acos(zd),
                        Pd = zb.radius * (zb.radius * ge - yd * jd),
                        ee = 0.6666666666666666 * zb.radius * jd * jd * jd / (ge - zd * jd),
                        Ad = Md / ac.radius,
                        kd = Math.sqrt(1 - Ad * Ad),
                        he = Math.acos(Ad),
                        Qd = ac.radius * (ac.radius * he - Md * kd),
                        fe = 0.6666666666666666 * ac.radius * kd * kd * kd / (he - Ad * kd),
                        ie = Pd + Qd,
                        je = (ee * Pd + (xd - fe) * Qd) / ie * de;
                    c.overlap = ie;
                    c.centroidx = zb.worldCOMx + vd * je;
                    c.centroidy = zb.worldCOMy + wd * je
                }
            }
        }
        null;
        return !0
    };
    var Ih = function() {
        this.toiDistance =
            0;
        this.inner = !1;
        this.shape = null
    };
    g["zpp_nape.geom.ZPP_ConvexRayResult"] = Ih;
    Ih.__name__ = ["zpp_nape", "geom", "ZPP_ConvexRayResult"];
    Ih.prototype = {
        __class__: Ih
    };
    var Gg = function() {};
    g["zpp_nape.geom.ZPP_Geom"] = Gg;
    Gg.__name__ = ["zpp_nape", "geom", "ZPP_Geom"];
    Gg.validateShape = function(a) {
        a.type == f.id_ShapeType_POLYGON && a.polygon.validate_gaxi();
        a.zip_aabb && null != a.body && (a.zip_aabb = !1, a.type == f.id_ShapeType_CIRCLE ? a.circle.__validate_aabb() : a.polygon.__validate_aabb());
        a.zip_worldCOM && null != a.body && (a.zip_worldCOM = !1, a.zip_localCOM && (a.zip_localCOM = !1, a.type == f.id_ShapeType_POLYGON && a.polygon.__validate_localCOM(), null != a.wrap_localCOM && (a.wrap_localCOM.zpp_inner.x = a.localCOMx, a.wrap_localCOM.zpp_inner.y = a.localCOMy)), a.body.validate_axis(), a.worldCOMx = a.body.posx + (a.body.axisy * a.localCOMx - a.body.axisx * a.localCOMy), a.worldCOMy = a.body.posy + (a.localCOMx * a.body.axisx + a.localCOMy * a.body.axisy))
    };
    var Jh = function() {
        this.next = null;
        this.x = this.y = 0
    };
    g["zpp_nape.geom.ZPP_GeomVert"] = Jh;
    Jh.__name__ = ["zpp_nape", "geom",
        "ZPP_GeomVert"
    ];
    Jh.prototype = {
        __class__: Jh
    };
    var Kh = function() {
        this.outer = this.vertices = null
    };
    g["zpp_nape.geom.ZPP_GeomPoly"] = Kh;
    Kh.__name__ = ["zpp_nape", "geom", "ZPP_GeomPoly"];
    Kh.prototype = {
        __class__: Kh
    };
    var Gc = function() {
        this._invalidate = this.next = null;
        this.a = this.b = this.c = this.d = this.tx = this.ty = 0;
        this.outer = null
    };
    g["zpp_nape.geom.ZPP_Mat23"] = Gc;
    Gc.__name__ = ["zpp_nape", "geom", "ZPP_Mat23"];
    Gc.get = function() {
        var a;
        null == Gc.zpp_pool ? a = new Gc : (a = Gc.zpp_pool, Gc.zpp_pool = a.next, a.next = null);
        null;
        return a
    };
    Gc.prototype = {
        invalidate: function() {
            null != this._invalidate && this._invalidate()
        },
        __class__: Gc
    };
    var Lh = function() {
        this.x = null;
        this.m = this.n = 0
    };
    g["zpp_nape.geom.ZPP_MatMN"] = Lh;
    Lh.__name__ = ["zpp_nape", "geom", "ZPP_MatMN"];
    Lh.prototype = {
        __class__: Lh
    };
    var Pa = function() {
        this.slipped = this.failed = this.kinematic = !1;
        this.c1 = this.c2 = this.axis = null;
        this.frozen1 = this.frozen2 = !1;
        this.s1 = this.s2 = this.arbiter = null;
        this.toi = 0;
        this.next = null;
        this.c1 = new H;
        this.c2 = new H;
        this.axis = new H
    };
    g["zpp_nape.geom.ZPP_ToiEvent"] =
        Pa;
    Pa.__name__ = ["zpp_nape", "geom", "ZPP_ToiEvent"];
    Pa.prototype = {
        __class__: Pa
    };
    var hb = function() {};
    g["zpp_nape.geom.ZPP_SweepDistance"] = hb;
    hb.__name__ = ["zpp_nape", "geom", "ZPP_SweepDistance"];
    hb.dynamicSweep = function(a, b, c, d, e) {
        null == e && (e = !1);
        var f = a.s1,
            g = a.s2,
            i = f.body,
            j = g.body,
            M = 0,
            k = 0,
            M = j.velx - i.velx,
            k = j.vely - i.vely,
            p = i.angvel;
        0 > p && (p = -p);
        var x = j.angvel;
        0 > x && (x = -x);
        var m = f.sweepCoef * p + g.sweepCoef * x;
        if (!e && !a.kinematic && M * M + k * k < l.dynamicSweepLinearThreshold * l.dynamicSweepLinearThreshold && m < l.dynamicSweepAngularThreshold) a.toi = -1, a.failed = !0;
        else {
            for (var o = a.c1, p = a.c2, x = a.axis, q = 0;;) {
                i.sweepIntegrate(c * b);
                i.sweepValidate(f);
                j.sweepIntegrate(c * b);
                j.sweepValidate(g);
                var u = hb.distance(f, g, o, p, x, null) + d,
                    s = M * x.x + k * x.y;
                if (u < l.distanceThresholdCCD) {
                    if (e) break;
                    var t = 0,
                        v = 0,
                        t = o.x - i.posx,
                        v = o.y - i.posy,
                        w = 0,
                        z = 0,
                        w = p.x - j.posx,
                        z = p.y - j.posy,
                        t = s - i.sweep_angvel * (x.y * t - x.x * v) + j.sweep_angvel * (x.y * w - x.x * z);
                    0 < t && (a.slipped = !0);
                    if (0 >= t || u < 0.5 * l.distanceThresholdCCD) break
                }
                s = (m - s) * b;
                if (0 >= s) {
                    c = -1;
                    break
                }
                s = u / s;
                1.0E-6 > s && (s = 1.0E-6);
                c += s;
                if (1 <= c) {
                    c =
                        1;
                    i.sweepIntegrate(c * b);
                    i.sweepValidate(f);
                    j.sweepIntegrate(c * b);
                    j.sweepValidate(g);
                    b = hb.distance(f, g, o, p, x, null) + d;
                    M = M * x.x + k * x.y;
                    if (b < l.distanceThresholdCCD) {
                        if (e) break;
                        k = e = 0;
                        e = o.x - i.posx;
                        k = o.y - i.posy;
                        d = o = 0;
                        o = p.x - j.posx;
                        d = p.y - j.posy;
                        i = M - i.sweep_angvel * (x.y * e - x.x * k) + j.sweep_angvel * (x.y * o - x.x * d);
                        0 < i && (a.slipped = !0);
                        if (0 >= i || b < 0.5 * l.distanceThresholdCCD) break
                    }
                    c = -1;
                    break
                }
                if (40 <= ++q) {
                    u > d && (a.failed = !0);
                    break
                }
            }
            a.toi = c
        }
    };
    hb.staticSweep = function(a, b, c, d) {
        var e = a.s1,
            f = a.s2,
            g = e.body,
            i = 0,
            j = 0,
            i = -g.velx,
            j = -g.vely,
            M = g.sweep_angvel;
        0 > M && (M = -M);
        for (var k = e.sweepCoef * M, M = a.c1, p = a.c2, x = a.axis, m = 0;;) {
            g.sweepIntegrate(c * b);
            g.sweepValidate(e);
            var o = hb.distance(e, f, M, p, x, null) + d,
                q = i * x.x + j * x.y;
            if (o < l.distanceThresholdCCD) {
                var s = 0,
                    u = 0,
                    s = M.x - g.posx,
                    u = M.y - g.posy,
                    s = q - g.sweep_angvel * (x.y * s - x.x * u);
                0 < s && (a.slipped = !0);
                if (0 >= s || o < 0.5 * l.distanceThresholdCCD) break
            }
            q = (k - q) * b;
            if (0 >= q) {
                c = -1;
                break
            }
            q = o / q;
            1.0E-6 > q && (q = 1.0E-6);
            c += q;
            if (1 <= c) {
                c = 1;
                g.sweepIntegrate(c * b);
                g.sweepValidate(e);
                b = hb.distance(e, f, M, p, x, null) + d;
                i = i * x.x + j * x.y;
                if (b <
                    l.distanceThresholdCCD && (d = j = 0, j = M.x - g.posx, d = M.y - g.posy, g = i - g.sweep_angvel * (x.y * j - x.x * d), 0 < g && (a.slipped = !0), 0 >= g || b < 0.5 * l.distanceThresholdCCD)) break;
                c = -1;
                break
            }
            if (40 <= ++m) {
                o > d && (a.failed = !0);
                break
            }
        }
        a.toi = c
    };
    hb.distanceBody = function(a, b, c, d) {
        var e;
        null == H.zpp_pool ? e = new H : (e = H.zpp_pool, H.zpp_pool = e.next, e.next = null);
        e.weak = !1;
        var f;
        null == H.zpp_pool ? f = new H : (f = H.zpp_pool, H.zpp_pool = f.next, f.next = null);
        f.weak = !1;
        var g;
        null == H.zpp_pool ? g = new H : (g = H.zpp_pool, H.zpp_pool = g.next, g.next = null);
        g.weak = !1;
        for (var i = 1.0E100, a = a.shapes.head; null != a;) {
            for (var j = a.elt, l = b.shapes.head; null != l;) {
                var k = hb.distance(j, l.elt, e, f, g, i);
                k < i && (i = k, c.x = e.x, c.y = e.y, d.x = f.x, d.y = f.y);
                l = l.next
            }
            a = a.next
        }
        b = e;
        null != b.outer && (b.outer.zpp_inner = null, b.outer = null);
        b._isimmutable = null;
        b._validate = null;
        b._invalidate = null;
        b.next = H.zpp_pool;
        H.zpp_pool = b;
        null != f.outer && (f.outer.zpp_inner = null, f.outer = null);
        f._isimmutable = null;
        f._validate = null;
        f._invalidate = null;
        f.next = H.zpp_pool;
        H.zpp_pool = f;
        null != g.outer && (g.outer.zpp_inner = null,
            g.outer = null);
        g._isimmutable = null;
        g._validate = null;
        g._invalidate = null;
        g.next = H.zpp_pool;
        H.zpp_pool = g;
        return i
    };
    hb.distance = function(a, b, c, d, e, h) {
        null == h && (h = 1.0E100);
        if (a.type == f.id_ShapeType_CIRCLE && b.type == f.id_ShapeType_CIRCLE) {
            var g = a.circle,
                i = b.circle,
                j, M = 0,
                k = 0,
                M = i.worldCOMx - g.worldCOMx,
                k = i.worldCOMy - g.worldCOMy,
                p = Math.sqrt(M * M + k * k);
            j = p - (g.radius + i.radius);
            if (j < h) {
                if (0 == p) M = 1, k = 0;
                else var x = 1 / p,
                    M = M * x,
                    k = k * x;
                var m = g.radius;
                c.x = g.worldCOMx + M * m;
                c.y = g.worldCOMy + k * m;
                var o = -i.radius;
                d.x = i.worldCOMx +
                    M * o;
                d.y = i.worldCOMy + k * o;
                e.x = M;
                e.y = k
            }
            return j
        }
        var q = !1;
        if (a.type == f.id_ShapeType_CIRCLE && b.type == f.id_ShapeType_POLYGON) var s = a,
            a = b,
            b = s,
            u = c,
            c = d,
            d = u,
            q = !0;
        if (a.type == f.id_ShapeType_POLYGON && b.type == f.id_ShapeType_CIRCLE) {
            for (var t = b.circle, v = -1.0E100, w = null, z = a.polygon.edges.head; null != z;) {
                var D = z.elt,
                    A = D.gnormx * t.worldCOMx + D.gnormy * t.worldCOMy - D.gprojection - t.radius;
                if (A > h) {
                    v = A;
                    break
                }
                0 < A ? A > v && (v = A, w = D) : 0 > v && A > v && (v = A, w = D);
                z = z.next
            }
            if (v < h) {
                var F = w.gp0,
                    B = w.gp1,
                    H = t.worldCOMy * w.gnormx - t.worldCOMx * w.gnormy;
                if (H <= F.y * w.gnormx - F.x * w.gnormy) {
                    var E = 0,
                        G = 0,
                        E = t.worldCOMx - F.x,
                        G = t.worldCOMy - F.y,
                        I = Math.sqrt(E * E + G * G),
                        v = I - t.radius;
                    if (v < h) {
                        if (0 == I) E = 1, G = 0;
                        else var C = 1 / I,
                            E = E * C,
                            G = G * C;
                        c.x = F.x + 0 * E;
                        c.y = F.y + 0 * G;
                        var P = -t.radius;
                        d.x = t.worldCOMx + E * P;
                        d.y = t.worldCOMy + G * P;
                        e.x = E;
                        e.y = G
                    }
                } else if (H >= B.y * w.gnormx - B.x * w.gnormy) {
                    var K = 0,
                        L = 0,
                        K = t.worldCOMx - B.x,
                        L = t.worldCOMy - B.y,
                        O = Math.sqrt(K * K + L * L),
                        v = O - t.radius;
                    if (v < h) {
                        if (0 == O) K = 1, L = 0;
                        else var S = 1 / O,
                            K = K * S,
                            L = L * S;
                        c.x = B.x + 0 * K;
                        c.y = B.y + 0 * L;
                        var Z = -t.radius;
                        d.x = t.worldCOMx + K * Z;
                        d.y = t.worldCOMy +
                            L * Z;
                        e.x = K;
                        e.y = L
                    }
                } else {
                    var ba = -t.radius;
                    d.x = t.worldCOMx + w.gnormx * ba;
                    d.y = t.worldCOMy + w.gnormy * ba;
                    var V = -v;
                    c.x = d.x + w.gnormx * V;
                    c.y = d.y + w.gnormy * V;
                    e.x = w.gnormx;
                    e.y = w.gnormy
                }
            }
            q && (e.x = -e.x, e.y = -e.y);
            return v
        }
        for (var ea = a.polygon, X = b.polygon, J = -1.0E100, T = null, U = null, aa = 0, $ = ea.edges.head; null != $;) {
            for (var Y = $.elt, R = 1.0E100, ia = X.gverts.next; null != ia;) {
                var ra = ia,
                    wa = Y.gnormx * ra.x + Y.gnormy * ra.y;
                wa < R && (R = wa);
                ia = ia.next
            }
            R -= Y.gprojection;
            if (R > h) {
                J = R;
                break
            }
            0 < R ? R > J && (J = R, T = Y, aa = 1) : 0 > J && R > J && (J = R, T = Y, aa = 1);
            $ = $.next
        }
        if (J <
            h) {
            for (var na = X.edges.head; null != na;) {
                for (var Q = na.elt, r = 1.0E100, ka = ea.gverts.next; null != ka;) {
                    var za = ka,
                        N = Q.gnormx * za.x + Q.gnormy * za.y;
                    N < r && (r = N);
                    ka = ka.next
                }
                r -= Q.gprojection;
                if (r > h) {
                    J = r;
                    break
                }
                0 < r ? r > J && (J = r, U = Q, aa = 2) : 0 > J && r > J && (J = r, U = Q, aa = 2);
                na = na.next
            }
            if (J < h) {
                var oa, ua;
                if (1 == aa) oa = X, ua = T;
                else {
                    oa = ea;
                    ua = U;
                    var Ca = c,
                        c = d,
                        d = Ca,
                        q = !q
                }
                for (var ga = null, ta = 1.0E100, qa = oa.edges.head; null != qa;) {
                    var Of = qa.elt,
                        ya = ua.gnormx * Of.gnormx + ua.gnormy * Of.gnormy;
                    ya < ta && (ta = ya, ga = Of);
                    qa = qa.next
                }
                q ? (e.x = -ua.gnormx, e.y = -ua.gnormy) :
                    (e.x = ua.gnormx, e.y = ua.gnormy);
                if (0 <= J) {
                    var W = ua.gp0,
                        ja = ua.gp1,
                        ca = ga.gp0,
                        ha = ga.gp1,
                        Fa = 0,
                        pa = 0,
                        la = 0,
                        ma = 0,
                        Fa = ja.x - W.x,
                        pa = ja.y - W.y,
                        la = ha.x - ca.x,
                        ma = ha.y - ca.y,
                        Xa = 1 / (Fa * Fa + pa * pa),
                        Ha = 1 / (la * la + ma * ma),
                        va = -(Fa * (W.x - ca.x) + pa * (W.y - ca.y)) * Xa,
                        Ia = -(Fa * (W.x - ha.x) + pa * (W.y - ha.y)) * Xa,
                        xa = -(la * (ca.x - W.x) + ma * (ca.y - W.y)) * Ha,
                        Ka = -(la * (ca.x - ja.x) + ma * (ca.y - ja.y)) * Ha;
                    0 > va ? va = 0 : 1 < va && (va = 1);
                    0 > Ia ? Ia = 0 : 1 < Ia && (Ia = 1);
                    0 > xa ? xa = 0 : 1 < xa && (xa = 1);
                    0 > Ka ? Ka = 0 : 1 < Ka && (Ka = 1);
                    var La = 0,
                        Ta = 0,
                        sa = va,
                        La = W.x + Fa * sa,
                        Ta = W.y + pa * sa,
                        jb = 0,
                        Da = 0,
                        fb = Ia,
                        jb = W.x +
                        Fa * fb,
                        Da = W.y + pa * fb,
                        Ea = 0,
                        fa = 0,
                        y = xa,
                        Ea = ca.x + la * y,
                        fa = ca.y + ma * y,
                        Ma = 0,
                        kb = 0,
                        Pa = Ka,
                        Ma = ca.x + la * Pa,
                        kb = ca.y + ma * Pa,
                        Aa = sb.vec_dsq(La, Ta, ca.x, ca.y),
                        Qa = sb.vec_dsq(jb, Da, ha.x, ha.y),
                        Ba = sb.vec_dsq(Ea, fa, W.x, W.y),
                        Jb = sb.vec_dsq(Ma, kb, ja.x, ja.y),
                        Ra = 0,
                        Ja = 0,
                        ab = null;
                    Aa < Qa ? (Ra = La, Ja = Ta, ab = ca) : (Ra = jb, Ja = Da, ab = ha, Aa = Qa);
                    var bb = 0,
                        Ua = 0,
                        Va = null;
                    Ba < Jb ? (bb = Ea, Ua = fa, Va = W) : (bb = Ma, Ua = kb, Va = ja, Ba = Jb);
                    Aa < Ba ? (c.x = Ra, c.y = Ja, d.x = ab.x, d.y = ab.y, J = Math.sqrt(Aa)) : (d.x = bb, d.y = Ua, c.x = Va.x, c.y = Va.y, J = Math.sqrt(Ba));
                    if (0 != J) {
                        e.x = d.x - c.x;
                        e.y = d.y -
                            c.y;
                        var Wa = 1 / J;
                        e.x *= Wa;
                        e.y *= Wa;
                        q && (e.x = -e.x, e.y = -e.y)
                    }
                    return J
                }
                var Za = 0,
                    $a = 0,
                    Za = ga.gp0.x,
                    $a = ga.gp0.y,
                    Ga = 0,
                    Na = 0,
                    Ga = ga.gp1.x,
                    Na = ga.gp1.y,
                    Sa = 0,
                    db = 0,
                    Sa = Ga - Za,
                    db = Na - $a,
                    mb = ua.gnormy * Za - ua.gnormx * $a,
                    eb = ua.gnormy * Ga - ua.gnormx * Na,
                    hb = 1 / (eb - mb),
                    Oa = (-ua.tp1 - mb) * hb;
                Oa > l.epsilon && (Za += Sa * Oa, $a += db * Oa);
                var ib = (-ua.tp0 - eb) * hb;
                ib < -l.epsilon && (Ga += Sa * ib, Na += db * ib);
                var Ya = Za * ua.gnormx + $a * ua.gnormy - ua.gprojection,
                    cb = Ga * ua.gnormx + Na * ua.gnormy - ua.gprojection;
                if (Ya < cb) {
                    d.x = Za;
                    d.y = $a;
                    var gb = -Ya;
                    c.x = d.x + ua.gnormx * gb;
                    c.y =
                        d.y + ua.gnormy * gb;
                    return Ya
                }
                d.x = Ga;
                d.y = Na;
                var ob = -cb;
                c.x = d.x + ua.gnormx * ob;
                c.y = d.y + ua.gnormy * ob;
                return cb
            }
        }
        return h
    };
    var H = function() {
        this.length = this.x = this.y = 0;
        this._inuse = this.modified = this.pushmod = !1;
        this.next = null;
        this.weak = !1;
        this._isimmutable = this.outer = null;
        this._immutable = !1;
        this._invalidate = this._validate = null
    };
    g["zpp_nape.geom.ZPP_Vec2"] = H;
    H.__name__ = ["zpp_nape", "geom", "ZPP_Vec2"];
    H.get = function(a, b, c) {
        null == c && (c = !1);
        var d;
        null == H.zpp_pool ? d = new H : (d = H.zpp_pool, H.zpp_pool = d.next, d.next =
            null);
        d.weak = !1;
        d._immutable = c;
        d.x = a;
        d.y = b;
        return d
    };
    H.prototype = {
        validate: function() {
            null != this._validate && this._validate()
        },
        invalidate: function() {
            null != this._invalidate && this._invalidate(this)
        },
        wrapper: function() {
            if (null == this.outer) {
                this.outer = new K;
                var a = this.outer.zpp_inner;
                null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
                a._isimmutable = null;
                a._validate = null;
                a._invalidate = null;
                a.next = H.zpp_pool;
                H.zpp_pool = a;
                this.outer.zpp_inner = this
            }
            return this.outer
        },
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            a._inuse = !0;
            a.next = this.next;
            this.next = a;
            this.modified = !0;
            this.length++;
            return a
        },
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            b._inuse = !0;
            null == a ? (b.next = this.next, this.next = b) : (b.next = a.next, a.next = b);
            this.pushmod = this.modified = !0;
            this.length++;
            return b
        },
        erase: function(a) {
            return this.inlined_erase(a)
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.next, this.next = c = b.next, null == this.next && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next =
                c, null == c && (this.pushmod = !0));
            b._inuse = !1;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        reverse: function() {
            for (var a = this.next, b = null; null != a;) {
                var c = a.next;
                a.next = b;
                b = this.next = a;
                a = c
            }
            this.pushmod = this.modified = !0
        },
        iterator_at: function(a) {
            for (var b = this.next; 0 < a-- && null != b;) b = b.next;
            return b
        },
        toString: function() {
            return "{ x: " + this.x + " y: " + this.y + " }"
        },
        __class__: H
    };
    var Jg = function() {
        this._validate = null;
        this.immutable = !1;
        this.x = this.y = this.z = 0;
        this.outer = null;
        this.immutable = !1;
        this._validate =
            null
    };
    g["zpp_nape.geom.ZPP_Vec3"] = Jg;
    Jg.__name__ = ["zpp_nape", "geom", "ZPP_Vec3"];
    Jg.prototype = {
        validate: function() {
            null != this._validate && this._validate()
        },
        __class__: Jg
    };
    var sb = function() {};
    g["zpp_nape.geom.ZPP_VecMath"] = sb;
    sb.__name__ = ["zpp_nape", "geom", "ZPP_VecMath"];
    sb.vec_dsq = function(a, b, c, d) {
        var e = 0,
            f = 0,
            e = a - c,
            f = b - d;
        return e * e + f * f
    };
    var ea = function() {
        this.userData = this.ishape = this.ibody = this.icompound = this.cbsets = this.group = this.cbTypes = this.cbSet = this.wrap_cbTypes = null;
        this.id = 0;
        this.outer_i = null;
        this.id = Da.Interactor();
        this.cbsets = new Sg;
        this.cbTypes = new Kc
    };
    g["zpp_nape.phys.ZPP_Interactor"] = ea;
    ea.__name__ = ["zpp_nape", "phys", "ZPP_Interactor"];
    ea.get = function(a, b) {
        var c;
        c = a.id < b.id ? a.id : b.id;
        var d;
        d = a.id < b.id ? b.id : a.id;
        for (var e = null, f = (a.cbsets.length < b.cbsets.length ? a.cbsets : b.cbsets).head; null != f;) {
            var g = f.elt;
            if (g.id == c && g.di == d) {
                e = g;
                break
            }
            f = f.next
        }
        return e
    };
    ea.int_callback = function(a, b, c) {
        var d = a.int1,
            a = a.int2;
        b.options1.compatible(d.cbTypes) && b.options2.compatible(a.cbTypes) ? (c.int1 =
            d, c.int2 = a) : (c.int1 = a, c.int2 = d)
    };
    ea.prototype = {
        __iaddedToSpace: function() {
            null != this.group && this.group.interactors.add(this);
            for (var a = this.cbTypes.head; null != a;) a.elt.interactors.add(this), a = a.next;
            this.alloc_cbSet()
        },
        __iremovedFromSpace: function() {
            null != this.group && this.group.interactors.remove(this);
            for (var a = this.cbTypes.head; null != a;) a.elt.interactors.remove(this), a = a.next;
            this.dealloc_cbSet()
        },
        wake: function() {
            if (null != this.ishape) {
                var a = this.ishape.body;
                null != a && null != a.space && a.space.non_inlined_wake(a);
                !0
            } else null != this.ibody ? null != this.ibody.space ? this.ibody.space.non_inlined_wake(this.ibody) : !1 : (null != this.icompound.space && this.icompound.space.wakeCompound(this.icompound), !0)
        },
        setupcbTypes: function() {
            this.wrap_cbTypes = Ac.get(this.cbTypes);
            this.wrap_cbTypes.zpp_inner.adder = E(this, this.wrap_cbTypes_adder);
            this.wrap_cbTypes.zpp_inner.subber = E(this, this.wrap_cbTypes_subber);
            this.wrap_cbTypes.zpp_inner.dontremove = !0
        },
        wrap_cbTypes_subber: function(a) {
            a = a.zpp_inner;
            if (this.cbTypes.has(a)) {
                var b;
                b = null !=
                    this.ishape ? null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
                null != b && (this.dealloc_cbSet(), a.interactors.remove(this));
                this.cbTypes.remove(a);
                null != b && (this.alloc_cbSet(), this.wake())
            }
        },
        wrap_cbTypes_adder: function(a) {
            this.insert_cbtype(a.zpp_inner);
            return !1
        },
        insert_cbtype: function(a) {
            if (!this.cbTypes.has(a)) {
                var b;
                b = null != this.ishape ? null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
                null !=
                    b && (this.dealloc_cbSet(), a.interactors.add(this));
                for (var c = null, d = this.cbTypes.head; null != d && !(a.id < d.elt.id);) {
                    c = d;
                    d = d.next
                }
                this.cbTypes.inlined_insert(c, a);
                null != b && (this.alloc_cbSet(), this.wake())
            }
        },
        alloc_cbSet: function() {
            var a;
            a = null != this.ishape ? null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
            if (null != (this.cbSet = a.cbsets.get(this.cbTypes))) this.cbSet.count++, this.cbSet.interactors.add(this), this.cbSet.validate(), a.freshInteractorType(this)
        },
        dealloc_cbSet: function() {
            var a;
            a = null != this.ishape ? null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
            null != this.cbSet && (this.cbSet.interactors.remove(this), a.nullInteractorType(this), 0 == --this.cbSet.count && (a.cbsets.remove(this.cbSet), a = this.cbSet, a.free(), a.next = J.zpp_pool, J.zpp_pool = a), this.cbSet = null)
        },
        immutable_midstep: function(a) {
            null != this.ibody ? null : null != this.ishape ? this.ishape.__immutable_midstep(a) : this.icompound.__imutable_midstep(a)
        },
        lookup_group: function() {
            for (var a = this; null != a && null == a.group;) a = null != a.ishape ? a.ishape.body : null != a.icompound ? a.icompound.compound : a.ibody.compound;
            return null == a ? null : a.group
        },
        __class__: ea
    };
    var Gb = function() {
        this.wrap_localCOM = this.wrap_worldCOM = null;
        this.zip_worldCOM = !1;
        this.worldCOMx = this.worldCOMy = 0;
        this.zip_localCOM = !1;
        this.localCOMx = this.localCOMy = 0;
        this.zip_aabb = !1;
        this.aabb = null;
        this.norotate = !1;
        this.cinertia = this.iinertia = this.sinertia = 0;
        this.zip_inertia = !1;
        this.inertiaMode = this.inertia =
            0;
        this.zip_gravMassScale = !1;
        this.gravMassMode = this.gravMassScale = 0;
        this.zip_gravMass = !1;
        this.gravMass = 0;
        this.nomove = !1;
        this.massMode = this.imass = this.smass = this.cmass = 0;
        this.zip_mass = !1;
        this.mass = 0;
        this.zip_axis = !1;
        this.forcex = this.forcey = this.kinvelx = this.kinvely = this.svelx = this.svely = this.angvel = this.torque = this.kinangvel = this.pre_rot = this.rot = this.axisx = this.axisy = 0;
        this.wrap_vel = null;
        this.velx = this.vely = 0;
        this.wrap_pos = null;
        this.pre_posx = this.pre_posy = this.posx = this.posy = 0;
        this.bullet = this.bulletEnabled =
            this.disableCCD = !1;
        this.sweepRadius = 0;
        this.sweepFrozen = !1;
        this.sweepTime = this.sweep_angvel = 0;
        this.compound = this.shapes = this.wrap_shapes = this.space = this.arbiters = this.constraints = this.component = null;
        this.type = 0;
        this.world = !1;
        this.outer = null;
        ea.call(this);
        this.ibody = this;
        this.bulletEnabled = this.world = !1;
        this.sweep_angvel = this.sweepTime = 0;
        this.disableCCD = this.norotate = this.nomove = !1;
        this.axisx = this.rot = this.posy = this.posx = 0;
        this.axisy = 1;
        this.torque = this.angvel = this.kinangvel = this.forcey = this.forcex =
            this.kinvely = this.kinvelx = this.vely = this.velx = this.svely = this.svelx = 0;
        this.pre_rot = this.pre_posy = this.pre_posx = Math.POSITIVE_INFINITY;
        this.worldCOMy = this.worldCOMx = this.localCOMy = this.localCOMx = 0;
        this.zip_aabb = !0;
        this.aabb = na.get(0, 0, 0, 0);
        this.aabb._immutable = !0;
        this.aabb._validate = E(this, this.aabb_validate);
        this.massMode = f.id_MassMode_DEFAULT;
        this.gravMassMode = f.id_GravMassMode_DEFAULT;
        this.gravMassScale = 1;
        this.inertiaMode = f.id_InertiaMode_DEFAULT;
        this.arbiters = new te;
        this.constraints = new ed;
        this.shapes =
            new Sd;
        this.wrap_shapes = Ic.get(this.shapes);
        this.wrap_shapes.zpp_inner.adder = E(this, this.shapes_adder);
        this.wrap_shapes.zpp_inner.subber = E(this, this.shapes_subber);
        this.wrap_shapes.zpp_inner._invalidate = E(this, this.shapes_invalidate);
        this.kinematicDelaySleep = !1
    };
    g["zpp_nape.phys.ZPP_Body"] = Gb;
    Gb.__name__ = ["zpp_nape", "phys", "ZPP_Body"];
    Gb.__static = function() {
        var a = ca;
        null == f.BodyType_STATIC && (f.internal = !0, f.BodyType_STATIC = new Ka, f.internal = !1);
        var a = new a(f.BodyType_STATIC),
            b = a.zpp_inner;
        b.world = !0;
        b.wrap_shapes.zpp_inner.immutable = !0;
        b.smass = b.imass = b.cmass = b.mass = b.gravMass = 0;
        b.sinertia = b.iinertia = b.cinertia = b.inertia = 0;
        b.cbTypes.clear();
        return a
    };
    Gb.__super__ = ea;
    Gb.prototype = m(ea.prototype, {
        invalidate_type: function() {
            this.invalidate_mass();
            this.invalidate_inertia()
        },
        invalidate_shapes: function() {
            this.zip_worldCOM = this.zip_localCOM = this.zip_aabb = !0;
            this.invalidate_mass();
            this.invalidate_inertia()
        },
        atRest: function(a) {
            if (this.type != f.id_BodyType_DYNAMIC) return this.component.sleeping;
            var b =
                l.linearSleepThreshold,
                b = b * b;
            if (this.velx * this.velx + this.vely * this.vely > b) a = !1;
            else if (sb.vec_dsq(this.posx, this.posy, this.pre_posx, this.pre_posy) > 0.25 * b * a * a) a = !1;
            else {
                var c = b = 0,
                    b = this.aabb.maxx - this.aabb.minx,
                    c = this.aabb.maxy - this.aabb.miny,
                    b = b * b + c * c,
                    c = l.angularSleepThreshold,
                    c = c * c;
                if (4 * this.angvel * this.angvel * b > c) a = !1;
                else var d = this.rot - this.pre_rot,
                    a = d * d * b > c * a * a ? !1 : !0
            }
            a || (this.component.waket = this.space.stamp);
            return this.component.waket + l.sleepDelay < this.space.stamp
        },
        refreshArbiters: function() {
            for (var a =
                this.arbiters.head; null != a;) a.elt.invalidated = !0, a = a.next
        },
        sweepIntegrate: function(a) {
            var b = a - this.sweepTime;
            0 != b && (this.sweepTime = a, this.posx += this.velx * b, this.posy += this.vely * b, 0 != this.angvel && this.delta_rot(this.sweep_angvel * b))
        },
        sweepValidate: function(a) {
            if (a.type == f.id_ShapeType_CIRCLE) a.worldCOMx = this.posx + (this.axisy * a.localCOMx - this.axisx * a.localCOMy), a.worldCOMy = this.posy + (a.localCOMx * this.axisx + a.localCOMy * this.axisy);
            else {
                for (var a = a.polygon, b = a.lverts.next, c = a.gverts.next; null != c;) {
                    var d =
                        c,
                        e = b,
                        b = b.next;
                    d.x = this.posx + (this.axisy * e.x - this.axisx * e.y);
                    d.y = this.posy + (e.x * this.axisx + e.y * this.axisy);
                    c = c.next
                }
                c = a.edges.head;
                b = d = a.gverts.next;
                for (d = d.next; null != d;) {
                    var e = d,
                        h = c.elt,
                        c = c.next;
                    h.gnormx = this.axisy * h.lnormx - this.axisx * h.lnormy;
                    h.gnormy = h.lnormx * this.axisx + h.lnormy * this.axisy;
                    h.gprojection = this.posx * h.gnormx + this.posy * h.gnormy + h.lprojection;
                    h.tp0 = b.y * h.gnormx - b.x * h.gnormy;
                    h.tp1 = e.y * h.gnormx - e.x * h.gnormy;
                    b = e;
                    d = d.next
                }
                a = a.gverts.next;
                c = c.elt;
                c.gnormx = this.axisy * c.lnormx - this.axisx *
                    c.lnormy;
                c.gnormy = c.lnormx * this.axisx + c.lnormy * this.axisy;
                c.gprojection = this.posx * c.gnormx + this.posy * c.gnormy + c.lprojection;
                c.tp0 = b.y * c.gnormx - b.x * c.gnormy;
                c.tp1 = a.y * c.gnormx - a.x * c.gnormy
            }
        },
        invalidate_pos: function() {
            for (var a = this.shapes.head; null != a;) {
                var b = a.elt;
                b.type == f.id_ShapeType_POLYGON && (b.polygon.invalidate_gverts(), b.polygon.invalidate_gaxi());
                b.invalidate_worldCOM();
                a = a.next
            }
            this.zip_worldCOM = !0
        },
        pos_invalidate: function(a) {
            this.immutable_midstep("Body::position");
            this.posx == a.x && this.posy ==
                a.y || (this.posx = a.x, this.posy = a.y, this.invalidate_pos(), this.wake())
        },
        pos_validate: function() {
            this.wrap_pos.zpp_inner.x = this.posx;
            this.wrap_pos.zpp_inner.y = this.posy
        },
        vel_invalidate: function(a) {
            this.velx = a.x;
            this.vely = a.y;
            this.wake()
        },
        vel_validate: function() {
            this.wrap_vel.zpp_inner.x = this.velx;
            this.wrap_vel.zpp_inner.y = this.vely
        },
        setupPosition: function() {
            this.wrap_pos = K.get(this.posx, this.posy, null);
            this.wrap_pos.zpp_inner._inuse = !0;
            this.world ? this.wrap_pos.zpp_inner._immutable = !0 : (this.wrap_pos.zpp_inner._invalidate =
                E(this, this.pos_invalidate), this.wrap_pos.zpp_inner._validate = E(this, this.pos_validate))
        },
        setupVelocity: function() {
            this.wrap_vel = K.get(this.velx, this.vely, null);
            this.wrap_vel.zpp_inner._inuse = !0;
            this.world ? this.wrap_vel.zpp_inner._immutable = !0 : (this.wrap_vel.zpp_inner._invalidate = E(this, this.vel_invalidate), this.wrap_vel.zpp_inner._validate = E(this, this.vel_validate))
        },
        invalidate_rot: function() {
            this.zip_axis = !0;
            for (var a = this.shapes.head; null != a;) {
                var b = a.elt;
                b.type == f.id_ShapeType_POLYGON && (b.polygon.invalidate_gverts(),
                    b.polygon.invalidate_gaxi());
                b.invalidate_worldCOM();
                a = a.next
            }
            this.zip_worldCOM = !0
        },
        validate_axis: function() {
            this.zip_axis && (this.zip_axis = !1, this.axisx = Math.sin(this.rot), this.axisy = Math.cos(this.rot), null)
        },
        delta_rot: function(a) {
            this.rot += a;
            if (1.0E-4 < a * a) this.axisx = Math.sin(this.rot), this.axisy = Math.cos(this.rot), null;
            else {
                var b = a * a,
                    c = 1 - 0.5 * b,
                    b = 1 - b * b / 8,
                    d = (c * this.axisx + a * this.axisy) * b;
                this.axisy = (c * this.axisy - a * this.axisx) * b;
                this.axisx = d
            }
        },
        invalidate_mass: function() {
            this.zip_mass = !0;
            this.invalidate_gravMass()
        },
        validate_mass: function() {
            if (this.zip_mass) {
                this.zip_mass = !1;
                if (this.massMode == f.id_MassMode_DEFAULT) {
                    this.cmass = 0;
                    for (var a = this.shapes.head; null != a;) {
                        var b = a.elt;
                        b.refmaterial.density = b.material.density;
                        b.validate_area_inertia();
                        this.cmass += b.area * b.material.density;
                        a = a.next
                    }
                }
                this.type == f.id_BodyType_DYNAMIC && !this.nomove ? (this.mass = this.cmass, this.imass = this.smass = 1 / this.mass) : (this.mass = Math.POSITIVE_INFINITY, this.imass = this.smass = 0)
            }
        },
        invalidate_gravMass: function() {
            this.gravMassMode != f.id_GravMassMode_FIXED &&
                (this.zip_gravMass = !0);
            this.gravMassMode != f.id_GravMassMode_SCALED && (this.zip_gravMassScale = !0);
            this.wake()
        },
        validate_gravMass: function() {
            this.zip_gravMass && (this.zip_gravMass = !1, this.validate_mass(), this.gravMassMode == f.id_GravMassMode_DEFAULT ? (this.validate_mass(), this.gravMass = this.cmass) : this.gravMassMode == f.id_GravMassMode_SCALED && (this.validate_mass(), this.gravMass = this.cmass * this.gravMassScale))
        },
        invalidate_inertia: function() {
            this.zip_inertia = !0;
            this.wake()
        },
        validate_inertia: function() {
            if (this.zip_inertia) {
                this.zip_inertia = !1;
                if (this.inertiaMode == f.id_InertiaMode_DEFAULT) {
                    this.cinertia = 0;
                    for (var a = this.shapes.head; null != a;) {
                        var b = a.elt;
                        b.refmaterial.density = b.material.density;
                        b.validate_area_inertia();
                        this.cinertia += b.inertia * b.area * b.material.density;
                        a = a.next
                    }
                }
                this.type == f.id_BodyType_DYNAMIC && !this.norotate ? (this.inertia = this.cinertia, this.sinertia = this.iinertia = 1 / this.inertia) : (this.inertia = Math.POSITIVE_INFINITY, this.sinertia = this.iinertia = 0)
            }
        },
        validate_aabb: function() {
            if (this.zip_aabb) {
                this.zip_aabb = !1;
                this.aabb.minx =
                    Math.POSITIVE_INFINITY;
                this.aabb.miny = Math.POSITIVE_INFINITY;
                this.aabb.maxx = Math.NEGATIVE_INFINITY;
                this.aabb.maxy = Math.NEGATIVE_INFINITY;
                for (var a = this.shapes.head; null != a;) {
                    var b = a.elt;
                    b.zip_aabb && null != b.body && (b.zip_aabb = !1, b.type == f.id_ShapeType_CIRCLE ? b.circle.__validate_aabb() : b.polygon.__validate_aabb());
                    this.aabb.combine(b.aabb);
                    a = a.next
                }
            }
        },
        invalidate_localCOM: function() {
            this.zip_worldCOM = this.zip_localCOM = !0
        },
        validate_localCOM: function() {
            if (this.zip_localCOM) {
                this.zip_localCOM = !1;
                for (var a =
                    0, b = 0, c = 0, d = this.shapes.head; null != d;) {
                    var e = d.elt;
                    e.zip_localCOM && (e.zip_localCOM = !1, e.type == f.id_ShapeType_POLYGON && e.polygon.__validate_localCOM(), null != e.wrap_localCOM && (e.wrap_localCOM.zpp_inner.x = e.localCOMx, e.wrap_localCOM.zpp_inner.y = e.localCOMy));
                    e.validate_area_inertia();
                    var h = e.area * e.material.density,
                        a = a + e.localCOMx * h,
                        b = b + e.localCOMy * h,
                        c = c + e.area * e.material.density,
                        d = d.next
                }
                0 != c && (d = 1 / c, this.localCOMx = a * d, this.localCOMy = b * d);
                null != this.wrap_localCOM && (this.wrap_localCOM.zpp_inner.x = this.localCOMx,
                    this.wrap_localCOM.zpp_inner.y = this.localCOMy);
                this.zip_mass && this.massMode == f.id_MassMode_DEFAULT && (this.zip_mass = !1, this.cmass = c, this.type == f.id_BodyType_DYNAMIC ? (this.mass = this.cmass, this.imass = this.smass = 1 / this.mass) : (this.mass = Math.POSITIVE_INFINITY, this.imass = this.smass = 0))
            }
        },
        validate_worldCOM: function() {
            this.zip_worldCOM && (this.zip_worldCOM = !1, this.validate_localCOM(), this.zip_axis && (this.zip_axis = !1, this.axisx = Math.sin(this.rot), this.axisy = Math.cos(this.rot), null), this.worldCOMx = this.posx +
                (this.axisy * this.localCOMx - this.axisx * this.localCOMy), this.worldCOMy = this.posy + (this.localCOMx * this.axisx + this.localCOMy * this.axisy), null != this.wrap_worldCOM && (this.wrap_worldCOM.zpp_inner.x = this.worldCOMx, this.wrap_worldCOM.zpp_inner.y = this.worldCOMy))
        },
        aabb_validate: function() {
            this.validate_aabb()
        },
        shapes_adder: function(a) {
            return a.zpp_inner.body != this ? (null != a.zpp_inner.body && a.zpp_inner.body.wrap_shapes.remove(a), a.zpp_inner.body = this, a.zpp_inner.addedToBody(), null != this.space && this.space.added_shape(a.zpp_inner,
                null), a.zpp_inner.type == f.id_ShapeType_POLYGON && (a.zpp_inner.polygon.invalidate_gaxi(), a.zpp_inner.polygon.invalidate_gverts()), !0) : !1
        },
        shapes_subber: function(a) {
            null != this.space && this.space.removed_shape(a.zpp_inner);
            a.zpp_inner.body = null;
            a.zpp_inner.removedFromBody()
        },
        shapes_invalidate: function() {
            this.invalidate_shapes()
        },
        addedToSpace: function() {
            null == Ya.zpp_pool ? this.component = new Ya : (this.component = Ya.zpp_pool, Ya.zpp_pool = this.component.next, this.component.next = null);
            null;
            this.component.isBody = !0;
            this.component.body = this;
            this.__iaddedToSpace()
        },
        removedFromSpace: function() {
            for (; null != this.arbiters.head;) {
                var a = this.arbiters.pop_unsafe();
                a.cleared = !0;
                a.b2 == this && a.b1.arbiters.inlined_try_remove(a);
                a.b1 == this && a.b2.arbiters.inlined_try_remove(a);
                null != a.pair && (a.pair.arb = null, a.pair = null);
                a.active = !1;
                this.space.f_arbiters.modified = !0
            }
            a = this.component;
            a.body = null;
            a.constraint = null;
            null;
            a.next = Ya.zpp_pool;
            Ya.zpp_pool = a;
            this.component = null;
            this.__iremovedFromSpace()
        },
        __class__: Gb
    });
    var Tg = function() {
        this.compound =
            this.space = null;
        this.depth = 0;
        this.outer = this.bodies = this.constraints = this.compounds = this.wrap_constraints = null
    };
    g["zpp_nape.phys.ZPP_Compound"] = Tg;
    Tg.__name__ = ["zpp_nape", "phys", "ZPP_Compound"];
    Tg.__super__ = ea;
    Tg.prototype = m(ea.prototype, {
        __imutable_midstep: function() {},
        addedToSpace: function() {
            this.__iaddedToSpace()
        },
        removedFromSpace: function() {
            this.__iremovedFromSpace()
        },
        __class__: Tg
    });
    var Mh = function() {
        this.wrap_gravity = null;
        this.viscosity = this.density = this.gravityx = this.gravityy = 0;
        this.shapes =
            null
    };
    g["zpp_nape.phys.ZPP_FluidProperties"] = Mh;
    Mh.__name__ = ["zpp_nape", "phys", "ZPP_FluidProperties"];
    Mh.prototype = {
        __class__: Mh
    };
    var S = function() {
        this.dynamicFriction = this.staticFriction = this.density = this.elasticity = this.rollingFriction = 0;
        this.next = this.outer = this.shapes = null;
        this.shapes = new Sd;
        this.elasticity = 0;
        this.dynamicFriction = 1;
        this.staticFriction = 2;
        this.density = 0.001;
        this.rollingFriction = 0.01
    };
    g["zpp_nape.phys.ZPP_Material"] = S;
    S.__name__ = ["zpp_nape", "phys", "ZPP_Material"];
    S.prototype = {
        wrapper: function() {
            if (null ==
                this.outer) {
                this.outer = new Mb;
                var a = this.outer.zpp_inner;
                a.outer = null;
                a.next = S.zpp_pool;
                S.zpp_pool = a;
                this.outer.zpp_inner = this
            }
            return this.outer
        },
        set: function(a) {
            this.dynamicFriction = a.dynamicFriction;
            this.staticFriction = a.staticFriction;
            this.density = a.density;
            this.elasticity = a.elasticity;
            this.rollingFriction = a.rollingFriction
        },
        invalidate: function(a) {
            for (var b = this.shapes.head; null != b;) b.elt.invalidate_material(a), b = b.next
        },
        __class__: S
    };
    var Oc = function(a) {
        this.zip_aabb = !1;
        this.sweep = this.node = this.pairs =
            this.aabb = null;
        this.fluidEnabled = this.sensorEnabled = !1;
        this.circle = this.polygon = this.refmaterial = this.material = this.filter = this.fluidProperties = null;
        this.sweepCoef = 0;
        this.zip_sweepRadius = !1;
        this.sweepRadius = 0;
        this.wrap_localCOM = null;
        this.zip_worldCOM = !1;
        this.worldCOMx = this.worldCOMy = 0;
        this.zip_localCOM = !1;
        this.localCOMx = this.localCOMy = 0;
        this.zip_angDrag = !1;
        this.inertia = this.angDrag = 0;
        this.zip_area_inertia = !1;
        this.type = this.area = 0;
        this.outer = this.body = null;
        ea.call(this);
        this.pairs = new Ug;
        this.ishape =
            this;
        this.type = a;
        this.aabb = na.get(0, 0, 0, 0);
        this.aabb._immutable = !0;
        this.aabb._validate = E(this, this.aabb_validate);
        this.zip_area_inertia = this.zip_angDrag = this.zip_localCOM = this.zip_sweepRadius = !0;
        this.worldCOMy = this.worldCOMx = this.localCOMy = this.localCOMx = 0;
        this.sensorEnabled = this.fluidEnabled = !1;
        this.body = this.fluidProperties = null;
        this.refmaterial = new S;
        this.sweepRadius = this.sweepCoef = 0
    };
    g["zpp_nape.shape.ZPP_Shape"] = Oc;
    Oc.__name__ = ["zpp_nape", "shape", "ZPP_Shape"];
    Oc.__super__ = ea;
    Oc.prototype = m(ea.prototype, {
        validate_sweepRadius: function() {
            this.zip_sweepRadius && (this.zip_sweepRadius = !1, this.type == f.id_ShapeType_CIRCLE ? this.circle.__validate_sweepRadius() : this.polygon.__validate_sweepRadius())
        },
        validate_aabb: function() {
            this.zip_aabb && null != this.body && (this.zip_aabb = !1, this.type == f.id_ShapeType_CIRCLE ? this.circle.__validate_aabb() : this.polygon.__validate_aabb())
        },
        validate_area_inertia: function() {
            this.zip_area_inertia && (this.zip_area_inertia = !1, this.type == f.id_ShapeType_CIRCLE ? this.circle.__validate_area_inertia() :
                this.polygon.__validate_area_inertia())
        },
        validate_angDrag: function() {
            if (this.zip_angDrag || this.refmaterial.dynamicFriction != this.material.dynamicFriction) this.zip_angDrag = !1, this.refmaterial.dynamicFriction = this.material.dynamicFriction, this.type == f.id_ShapeType_CIRCLE ? this.circle.__validate_angDrag() : this.polygon.__validate_angDrag()
        },
        validate_worldCOM: function() {
            this.zip_worldCOM && null != this.body && (this.zip_worldCOM = !1, this.zip_localCOM && (this.zip_localCOM = !1, this.type == f.id_ShapeType_POLYGON &&
                this.polygon.__validate_localCOM(), null != this.wrap_localCOM && (this.wrap_localCOM.zpp_inner.x = this.localCOMx, this.wrap_localCOM.zpp_inner.y = this.localCOMy)), this.body.validate_axis(), this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy), this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx + this.localCOMy * this.body.axisy))
        },
        invalidate_area_inertia: function() {
            this.zip_area_inertia = !0;
            null != this.body && (this.body.invalidate_localCOM(), this.body.invalidate_mass(),
                this.body.invalidate_inertia())
        },
        invalidate_angDrag: function() {
            this.zip_angDrag = !0
        },
        invalidate_localCOM: function() {
            this.zip_localCOM = !0;
            this.invalidate_area_inertia();
            this.type == f.id_ShapeType_CIRCLE && (this.zip_sweepRadius = !0);
            this.invalidate_angDrag();
            this.invalidate_worldCOM();
            null != this.body && this.body.invalidate_localCOM()
        },
        invalidate_worldCOM: function() {
            this.zip_aabb = this.zip_worldCOM = !0;
            null != this.body && (this.body.zip_aabb = !0)
        },
        invalidate_material: function(a) {
            0 != (a & S.WAKE) && this.wake();
            0 != (a &
                S.ARBITERS) && null != this.body && this.body.refreshArbiters();
            0 != (a & S.PROPS) && null != this.body && (this.body.invalidate_localCOM(), this.body.invalidate_mass(), this.body.invalidate_inertia());
            0 != (a & S.ANGDRAG) && this.invalidate_angDrag();
            this.refmaterial.set(this.material)
        },
        invalidate_filter: function() {
            this.wake()
        },
        aabb_validate: function() {
            this.zip_aabb && null != this.body && (this.zip_aabb = !1, this.type == f.id_ShapeType_CIRCLE ? this.circle.__validate_aabb() : this.polygon.__validate_aabb())
        },
        setMaterial: function(a) {
            this.material !=
                a && (null != this.body && null != this.body.space && null != this.material && this.material.shapes.remove(this), this.material = a, null != this.body && null != this.body.space && a.shapes.add(this), this.wake(), null != this.body && this.body.refreshArbiters())
        },
        setFilter: function(a) {
            this.filter != a && (null != this.body && null != this.body.space && null != this.filter && this.filter.shapes.remove(this), this.filter = a, null != this.body && null != this.body.space && a.shapes.add(this), this.wake())
        },
        __immutable_midstep: function() {},
        addedToBody: function() {
            this.invalidate_worldCOM();
            this.zip_aabb = !0;
            null != this.body && (this.body.zip_aabb = !0)
        },
        removedFromBody: function() {},
        addedToSpace: function() {
            this.__iaddedToSpace();
            this.material.shapes.add(this);
            this.filter.shapes.add(this);
            null != this.fluidProperties && this.fluidProperties.shapes.add(this)
        },
        removedFromSpace: function() {
            this.__iremovedFromSpace();
            this.material.shapes.remove(this);
            this.filter.shapes.remove(this);
            null != this.fluidProperties && this.fluidProperties.shapes.remove(this)
        },
        __class__: Oc
    });
    var Jf = function() {
        this.radius = 0;
        this.outer_zn =
            null;
        Oc.call(this, f.id_ShapeType_CIRCLE);
        this.circle = this;
        this.zip_localCOM = !1
    };
    g["zpp_nape.shape.ZPP_Circle"] = Jf;
    Jf.__name__ = ["zpp_nape", "shape", "ZPP_Circle"];
    Jf.__super__ = Oc;
    Jf.prototype = m(Oc.prototype, {
        invalidate_radius: function() {
            this.invalidate_area_inertia();
            this.invalidate_angDrag();
            this.zip_aabb = !0;
            null != this.body && (this.body.zip_aabb = !0);
            null != this.body && this.body.wake()
        },
        __validate_aabb: function() {
            this.zip_worldCOM && null != this.body && (this.zip_worldCOM = !1, this.zip_localCOM && (this.zip_localCOM = !1, this.type == f.id_ShapeType_POLYGON && this.polygon.__validate_localCOM(), null != this.wrap_localCOM && (this.wrap_localCOM.zpp_inner.x = this.localCOMx, this.wrap_localCOM.zpp_inner.y = this.localCOMy)), this.body.validate_axis(), this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy), this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx + this.localCOMy * this.body.axisy));
            var a = this.radius,
                b = this.radius;
            this.aabb.minx = this.worldCOMx - a;
            this.aabb.miny = this.worldCOMy -
                b;
            this.aabb.maxx = this.worldCOMx + a;
            this.aabb.maxy = this.worldCOMy + b
        },
        _force_validate_aabb: function() {
            this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy);
            this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx + this.localCOMy * this.body.axisy);
            this.aabb.minx = this.worldCOMx - this.radius;
            this.aabb.miny = this.worldCOMy - this.radius;
            this.aabb.maxx = this.worldCOMx + this.radius;
            this.aabb.maxy = this.worldCOMy + this.radius
        },
        __validate_sweepRadius: function() {
            this.sweepCoef =
                Math.sqrt(this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy);
            this.sweepRadius = this.sweepCoef + this.radius
        },
        __validate_area_inertia: function() {
            var a = this.radius * this.radius;
            this.area = a * Math.PI;
            this.inertia = 0.5 * a + (this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy)
        },
        __validate_angDrag: function() {
            var a = this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy,
                b = this.radius * this.radius;
            this.angDrag = (a + 2 * b) * this.material.dynamicFriction * l.fluidAngularDragFriction + 0.5 * l.fluidAngularDrag *
                (1 + l.fluidVacuumDrag) * a;
            this.angDrag /= 2 * (a + 0.5 * b)
        },
        __transform: function(a) {
            var b = a.zpp_inner.a * a.zpp_inner.d - a.zpp_inner.b * a.zpp_inner.c;
            0 > b && (b = -b);
            this.radius *= Math.sqrt(b);
            b = a.zpp_inner.a * this.localCOMx + a.zpp_inner.b * this.localCOMy + a.zpp_inner.tx;
            this.localCOMy = a.zpp_inner.c * this.localCOMx + a.zpp_inner.d * this.localCOMy + a.zpp_inner.ty;
            this.localCOMx = b;
            this.invalidate_radius();
            this.invalidate_localCOM()
        },
        __class__: Jf
    });
    var N = function() {
        this.tp0 = this.tp1 = 0;
        this.lp0 = this.gp0 = this.lp1 = this.gp1 = null;
        this.length = this.lprojection = this.gprojection = 0;
        this.wrap_gnorm = null;
        this.gnormx = this.gnormy = 0;
        this.wrap_lnorm = null;
        this.lnormx = this.lnormy = 0;
        this.next = this.polygon = this.outer = null;
        this.gprojection = this.lprojection = this.length = this.gnormy = this.gnormx = this.lnormy = this.lnormx = 0
    };
    g["zpp_nape.shape.ZPP_Edge"] = N;
    N.__name__ = ["zpp_nape", "shape", "ZPP_Edge"];
    N.prototype = {
        wrapper: function() {
            null == this.outer && (N.internal = !0, this.outer = new Mg, N.internal = !1, this.outer.zpp_inner = this);
            return this.outer
        },
        __class__: N
    };
    var Kf = function() {
        this.reverse_flag = this.zip_lverts = this.zip_laxi = this.zip_gverts = this.zip_gaxi = this.zip_valid = this.zip_sanitation = !1;
        this.edgeCnt = 0;
        this.outer_zn = this.lverts = this.wrap_lverts = this.gverts = this.wrap_gverts = this.edges = this.wrap_edges = null;
        Oc.call(this, f.id_ShapeType_POLYGON);
        this.polygon = this;
        this.lverts = new H;
        this.gverts = new H;
        this.edges = new Vg;
        this.edgeCnt = 0
    };
    g["zpp_nape.shape.ZPP_Polygon"] = Kf;
    Kf.__name__ = ["zpp_nape", "shape", "ZPP_Polygon"];
    Kf.__super__ = Oc;
    Kf.prototype = m(Oc.prototype, {
        lverts_pa_invalidate: function() {
            this.invalidate_lverts()
        },
        gverts_pa_validate: function() {
            this.validate_gverts()
        },
        lverts_post_adder: function(a) {
            a.zpp_inner._invalidate = E(this, this.lverts_pa_invalidate);
            for (var b = null, c = null, d = this.lverts.next; null != d && !(d == a.zpp_inner);) {
                b = null == b ? this.gverts.next : b.next, c = null == c ? this.edges.head : c.next;
                d = d.next
            }
            a = H.get(0, 0, !0);
            this.gverts.insert(b, a);
            null != this.lverts.next.next && (null == this.lverts.next.next.next ? (null == N.zpp_pool ? c = new N : (c = N.zpp_pool, N.zpp_pool =
                c.next, c.next = null), null, c.polygon = this, this.edges.add(c), null == N.zpp_pool ? c = new N : (c = N.zpp_pool, N.zpp_pool = c.next, c.next = null), null, c.polygon = this, this.edges.add(c), this.edgeCnt += 2) : (null == N.zpp_pool ? b = new N : (b = N.zpp_pool, N.zpp_pool = b.next, b.next = null), null, b.polygon = this, this.edges.insert(c, b), this.edgeCnt++));
            a._validate = E(this, this.gverts_pa_validate)
        },
        lverts_subber: function(a) {
            this.cleanup_lvert(a.zpp_inner)
        },
        lverts_invalidate: function() {
            this.invalidate_lverts()
        },
        lverts_validate: function() {
            this.validate_lverts()
        },
        getlverts: function() {
            this.wrap_lverts = Vd.get(this.lverts);
            this.wrap_lverts.zpp_inner.post_adder = E(this, this.lverts_post_adder);
            this.wrap_lverts.zpp_inner.subber = E(this, this.lverts_subber);
            this.wrap_lverts.zpp_inner._invalidate = E(this, this.lverts_invalidate);
            this.wrap_lverts.zpp_inner._validate = E(this, this.lverts_validate);
            this.wrap_lverts.zpp_inner.reverse_flag = this.reverse_flag
        },
        invalidate_lverts: function() {
            this.invalidate_laxi();
            this.invalidate_area_inertia();
            this.invalidate_angDrag();
            this.invalidate_localCOM();
            this.invalidate_gverts();
            this.zip_sanitation = this.zip_valid = this.zip_lverts = !0;
            null != this.body && this.body.wake()
        },
        invalidate_laxi: function() {
            this.invalidate_gaxi();
            this.zip_laxi = this.zip_sweepRadius = !0
        },
        invalidate_gverts: function() {
            this.zip_aabb = !0;
            null != this.body && (this.body.zip_aabb = !0);
            this.zip_gverts = !0
        },
        invalidate_gaxi: function() {
            this.zip_gaxi = !0
        },
        validate_lverts: function() {
            this.zip_lverts && (this.zip_lverts = !1, 2 < this.lverts.length && (this.validate_area_inertia(), 0 > this.area && (this.reverse_vertices(),
                this.area = -this.area)))
        },
        cleanup_lvert: function(a) {
            for (var b = null, c = null, d = this.lverts.next; null != d && !(d == a);) {
                b = null == b ? this.gverts.next : b.next, c = null == c ? this.edges.head : c.next;
                d = d.next
            }
            a = null == b ? this.gverts.next : b.next;
            this.gverts.erase(b);
            null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
            a._isimmutable = null;
            a._validate = null;
            a._invalidate = null;
            a.next = H.zpp_pool;
            H.zpp_pool = a;
            2 == this.edgeCnt ? (c = this.edges.pop_unsafe(), c.polygon = null, c.next = N.zpp_pool, N.zpp_pool = c, c = this.edges.pop_unsafe(), c.polygon =
                null, c.next = N.zpp_pool, N.zpp_pool = c, this.edgeCnt = 0) : 0 != this.edgeCnt && (b = null == c ? this.edges.head.elt : c.next.elt, this.edges.erase(c), b.polygon = null, b.next = N.zpp_pool, N.zpp_pool = b, this.edgeCnt--)
        },
        splice_collinear: function() {
            this.zip_sanitation && (this.zip_sanitation = !1, this.splice_collinear_real())
        },
        splice_collinear_real: function() {
            if (!(null == this.lverts.next || null == this.lverts.next.next) && null != this.lverts.next.next.next) {
                for (var a = null, b = this.lverts.next; null != b;) {
                    var c = b,
                        d = null == b.next ? this.lverts.next :
                        b.next;
                    sb.vec_dsq(c.x, c.y, d.x, d.y) < l.epsilon * l.epsilon ? (this.cleanup_lvert(b), b = this.lverts.erase(a)) : (a = b, b = b.next)
                }
                if (null != this.lverts.next) {
                    do {
                        a = !1;
                        for (b = this.lverts.next; null != b;) {
                            var c = null == b.next ? this.lverts.next : b.next,
                                e = b,
                                d = c,
                                f = null == c.next ? this.lverts.next : c.next,
                                g = 0,
                                i = 0,
                                g = d.x - e.x,
                                i = d.y - e.y,
                                j = e = 0,
                                e = f.x - d.x,
                                j = f.y - d.y,
                                d = j * g - e * i;
                            d * d >= l.epsilon * l.epsilon || (this.cleanup_lvert(c), this.lverts.erase(null == b.next ? null : b), a = !0);
                            b = b.next
                        }
                    } while (a)
                }
            }
        },
        reverse_vertices: function() {
            this.lverts.reverse();
            this.gverts.reverse();
            this.edges.reverse();
            var a = this.edges.iterator_at(this.edgeCnt - 1),
                b = this.edges.pop_unsafe();
            this.edges.insert(a, b);
            this.reverse_flag = !this.reverse_flag;
            null != this.wrap_lverts && (this.wrap_lverts.zpp_inner.reverse_flag = this.reverse_flag);
            null != this.wrap_gverts && (this.wrap_gverts.zpp_inner.reverse_flag = this.reverse_flag);
            null != this.wrap_edges && (this.wrap_edges.zpp_inner.reverse_flag = this.reverse_flag)
        },
        validate_laxi: function() {
            if (this.zip_laxi) {
                this.zip_laxi = !1;
                this.validate_lverts();
                for (var a = this.edges.head, b = this.lverts.next, c = b, b = b.next; null != b;) {
                    var d = b,
                        e = a.elt,
                        a = a.next;
                    e.lp0 = c;
                    e.lp1 = d;
                    var f = 0,
                        g = 0,
                        f = c.x - d.x,
                        g = c.y - d.y,
                        i = Math.sqrt(f * f + g * g);
                    e.length = i;
                    i = 1 / i;
                    f *= i;
                    g *= i;
                    i = f;
                    f = -g;
                    g = i;
                    e.lprojection = f * c.x + g * c.y;
                    e.lnormx = f;
                    e.lnormy = g;
                    null != e.wrap_lnorm && (e.wrap_lnorm.zpp_inner.x = f, e.wrap_lnorm.zpp_inner.y = g);
                    c = d;
                    b = b.next
                }
                e = this.lverts.next;
                a = a.elt;
                a.lp0 = c;
                a.lp1 = e;
                d = b = 0;
                b = c.x - e.x;
                d = c.y - e.y;
                e = Math.sqrt(b * b + d * d);
                a.length = e;
                e = 1 / e;
                f = b * e;
                b = -(d * e);
                d = f;
                a.lprojection = b * c.x + d * c.y;
                a.lnormx = b;
                a.lnormy = d;
                null != a.wrap_lnorm && (a.wrap_lnorm.zpp_inner.x = b, a.wrap_lnorm.zpp_inner.y = d)
            }
        },
        validate_gverts: function() {
            if (this.zip_gverts && null != this.body) {
                this.zip_gverts = !1;
                this.validate_lverts();
                this.body.validate_axis();
                for (var a = this.lverts.next, b = this.gverts.next; null != b;) {
                    var c = b,
                        d = a,
                        a = a.next;
                    c.x = this.body.posx + (this.body.axisy * d.x - this.body.axisx * d.y);
                    c.y = this.body.posy + (d.x * this.body.axisx + d.y * this.body.axisy);
                    b = b.next
                }
            }
        },
        validate_gaxi: function() {
            if (this.zip_gaxi && null != this.body) {
                this.zip_gaxi = !1;
                this.validate_laxi();
                this.body.validate_axis();
                this.validate_gverts();
                for (var a = this.edges.head, b = this.gverts.next, c = b, b = b.next; null != b;) {
                    var d = b,
                        e = a.elt,
                        a = a.next;
                    e.gp0 = c;
                    e.gp1 = d;
                    e.gnormx = this.body.axisy * e.lnormx - this.body.axisx * e.lnormy;
                    e.gnormy = e.lnormx * this.body.axisx + e.lnormy * this.body.axisy;
                    e.gprojection = this.body.posx * e.gnormx + this.body.posy * e.gnormy + e.lprojection;
                    null != e.wrap_gnorm && (e.wrap_gnorm.zpp_inner.x = e.gnormx, e.wrap_gnorm.zpp_inner.y = e.gnormy);
                    e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
                    e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
                    c = d;
                    b = b.next
                }
                b = this.gverts.next;
                a = a.elt;
                a.gp0 = c;
                a.gp1 = b;
                a.gnormx = this.body.axisy * a.lnormx - this.body.axisx * a.lnormy;
                a.gnormy = a.lnormx * this.body.axisx + a.lnormy * this.body.axisy;
                a.gprojection = this.body.posx * a.gnormx + this.body.posy * a.gnormy + a.lprojection;
                null != a.wrap_gnorm && (a.wrap_gnorm.zpp_inner.x = a.gnormx, a.wrap_gnorm.zpp_inner.y = a.gnormy);
                a.tp0 = a.gp0.y * a.gnormx - a.gp0.x * a.gnormy;
                a.tp1 = a.gp1.y * a.gnormx - a.gp1.x * a.gnormy
            }
        },
        __validate_aabb: function() {
            this.validate_gverts();
            var a = this.gverts.next;
            this.aabb.minx = a.x;
            this.aabb.miny = a.y;
            this.aabb.maxx = a.x;
            this.aabb.maxy = a.y;
            for (a = this.gverts.next.next; null != a;) {
                var b = a;
                b.x < this.aabb.minx && (this.aabb.minx = b.x);
                b.x > this.aabb.maxx && (this.aabb.maxx = b.x);
                b.y < this.aabb.miny && (this.aabb.miny = b.y);
                b.y > this.aabb.maxy && (this.aabb.maxy = b.y);
                a = a.next
            }
        },
        _force_validate_aabb: function() {
            var a = this.lverts.next,
                b = this.gverts.next,
                c = a,
                a = a.next;
            b.x = this.body.posx + (this.body.axisy * c.x - this.body.axisx * c.y);
            b.y = this.body.posy + (c.x * this.body.axisx +
                c.y * this.body.axisy);
            this.aabb.minx = b.x;
            this.aabb.miny = b.y;
            this.aabb.maxx = b.x;
            this.aabb.maxy = b.y;
            for (b = this.gverts.next.next; null != b;) {
                var c = b,
                    d = a,
                    a = a.next;
                c.x = this.body.posx + (this.body.axisy * d.x - this.body.axisx * d.y);
                c.y = this.body.posy + (d.x * this.body.axisx + d.y * this.body.axisy);
                c.x < this.aabb.minx && (this.aabb.minx = c.x);
                c.x > this.aabb.maxx && (this.aabb.maxx = c.x);
                c.y < this.aabb.miny && (this.aabb.miny = c.y);
                c.y > this.aabb.maxy && (this.aabb.maxy = c.y);
                b = b.next
            }
        },
        __validate_sweepRadius: function() {
            var a = 0,
                b = 0;
            this.validate_laxi();
            for (var c = this.lverts.next; null != c;) {
                var d = c,
                    d = d.x * d.x + d.y * d.y;
                d > a && (a = d);
                c = c.next
            }
            for (c = this.edges.head; null != c;) {
                d = c.elt;
                if (d.lprojection < b && (b = d.lprojection, 0 > b)) break;
                c = c.next
            }
            0 > b && (b = 0);
            this.sweepRadius = Math.sqrt(a);
            this.sweepCoef = this.sweepRadius - b
        },
        __validate_area_inertia: function() {
            if (null == this.lverts.next || null == this.lverts.next.next || null == this.lverts.next.next.next) this.inertia = this.area = 0;
            else {
                for (var a = this.area = 0, b = 0, c = this.lverts.next, d = c, e = c = c.next, c = c.next; null != c;) {
                    var f = c,
                        g = e.y *
                        d.x - e.x * d.y,
                        a = a + g * (e.x * e.x + e.y * e.y + (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y)),
                        b = b + g;
                    this.area += e.x * (f.y - d.y);
                    d = e;
                    e = f;
                    c = c.next
                }
                g = c = this.lverts.next;
                f = e.y * d.x - e.x * d.y;
                a += f * (e.x * e.x + e.y * e.y + (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y));
                this.area += e.x * (g.y - d.y);
                d = e;
                e = g;
                c = c.next;
                g = e.y * d.x - e.x * d.y;
                a += g * (e.x * e.x + e.y * e.y + (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y));
                this.area += e.x * (c.y - d.y);
                this.inertia = a / (6 * (b + f + g));
                this.area *= 0.5;
                0 > this.area && (this.area = -this.area, this.reverse_vertices())
            }
        },
        __validate_angDrag: function() {
            this.validate_area_inertia();
            this.validate_laxi();
            for (var a = 0, b = this.edges.head, c = 0, d = this.lverts.next, e = d, d = d.next; null != d;) {
                var f = d,
                    g = b.elt,
                    b = b.next,
                    c = c + g.length,
                    i = 0,
                    j = 0,
                    i = f.x - e.x,
                    j = f.y - e.y,
                    a = a + g.length * l.fluidAngularDragFriction * this.material.dynamicFriction * g.lprojection * g.lprojection,
                    M = -(e.y * g.lnormx - e.x * g.lnormy) / (j * g.lnormx - i * g.lnormy);
                if (0 < M) {
                    var k;
                    k = 1 < M ? 1 : M;
                    var p = 0,
                        m = 0,
                        p = e.x,
                        m = e.y,
                        o = k,
                        p = p + i * o,
                        m = m + j * o,
                        o = g.lnormy * e.x - g.lnormx * e.y,
                        p = g.lnormy * p - g.lnormx * m,
                        a = a + (p * p * p - o * o * o) / (3 * (p - o)) * k * g.length * l.fluidAngularDrag
                }
                1 > M && (M =
                    0 > M ? 0 : M, p = k = 0, k = e.x, p = e.y, e = M, k += i * e, p += j * e, e = g.lnormy * k - g.lnormx * p, i = g.lnormy * f.x - g.lnormx * f.y, a += (i * i * i - e * e * e) / (3 * (i - e)) * l.fluidVacuumDrag * (1 - M) * g.length * l.fluidAngularDrag);
                e = f;
                d = d.next
            }
            d = this.lverts.next;
            b = b.elt;
            c += b.length;
            g = f = 0;
            f = d.x - e.x;
            g = d.y - e.y;
            a += b.length * l.fluidAngularDragFriction * this.material.dynamicFriction * b.lprojection * b.lprojection;
            i = -(e.y * b.lnormx - e.x * b.lnormy) / (g * b.lnormx - f * b.lnormy);
            0 < i && (j = 1 < i ? 1 : i, p = k = 0, k = e.x, p = e.y, M = b.lnormy * e.x - b.lnormx * e.y, k = b.lnormy * (k + f * j) - b.lnormx * (p + g *
                j), a += (k * k * k - M * M * M) / (3 * (k - M)) * j * b.length * l.fluidAngularDrag);
            1 > i && (i = 0 > i ? 0 : i, M = j = 0, j = e.x, M = e.y, e = b.lnormy * (j + f * i) - b.lnormx * (M + g * i), d = b.lnormy * d.x - b.lnormx * d.y, a += (d * d * d - e * e * e) / (3 * (d - e)) * l.fluidVacuumDrag * (1 - i) * b.length * l.fluidAngularDrag);
            this.angDrag = a / (this.inertia * c)
        },
        __validate_localCOM: function() {
            if (null == this.lverts.next.next) this.localCOMx = this.lverts.next.x, this.localCOMy = this.lverts.next.y;
            else if (null == this.lverts.next.next.next) this.localCOMx = this.lverts.next.x, this.localCOMy = this.lverts.next.y,
                this.localCOMx += 1 * this.lverts.next.next.x, this.localCOMy += 1 * this.lverts.next.next.y, this.localCOMx *= 0.5, this.localCOMy *= 0.5;
            else {
                for (var a = this.localCOMy = this.localCOMx = 0, b = this.lverts.next, c = b, d = b = b.next, b = b.next; null != b;) {
                    var e = b,
                        a = a + d.x * (e.y - c.y),
                        c = e.y * d.x - e.x * d.y;
                    this.localCOMx += (d.x + e.x) * c;
                    this.localCOMy += (d.y + e.y) * c;
                    c = d;
                    d = e;
                    b = b.next
                }
                e = b = this.lverts.next;
                a += d.x * (e.y - c.y);
                c = e.y * d.x - e.x * d.y;
                this.localCOMx += (d.x + e.x) * c;
                this.localCOMy += (d.y + e.y) * c;
                c = d;
                d = e;
                b = b.next;
                a += d.x * (b.y - c.y);
                c = b.y * d.x - b.x *
                    d.y;
                this.localCOMx += (d.x + b.x) * c;
                this.localCOMy += (d.y + b.y) * c;
                a = 1 / (3 * a);
                this.localCOMx *= a;
                this.localCOMy *= a
            }
        },
        __transform: function(a) {
            for (var b = this.lverts.next; null != b;) {
                var c = b,
                    d = a.zpp_inner.a * c.x + a.zpp_inner.b * c.y + a.zpp_inner.tx;
                c.y = a.zpp_inner.c * c.x + a.zpp_inner.d * c.y + a.zpp_inner.ty;
                c.x = d;
                b = b.next
            }
            this.invalidate_lverts()
        },
        __class__: Kf
    });
    var nd = function() {
        this.sweep = this.dynab = this.matrix = this.circShape = null;
        this.is_sweep = !1;
        this.space = null
    };
    g["zpp_nape.space.ZPP_Broadphase"] = nd;
    nd.__name__ = ["zpp_nape",
        "space", "ZPP_Broadphase"
    ];
    nd.prototype = {
        insert: function(a) {
            this.is_sweep ? this.sweep.__insert(a) : this.dynab.__insert(a)
        },
        remove: function(a) {
            this.is_sweep ? this.sweep.__remove(a) : this.dynab.__remove(a)
        },
        sync: function(a) {
            this.is_sweep ? !this.sweep.space.continuous && a.zip_aabb && null != a.body && (a.zip_aabb = !1, a.type == f.id_ShapeType_CIRCLE ? a.circle.__validate_aabb() : a.polygon.__validate_aabb()) : this.dynab.__sync(a)
        },
        broadphase: function() {},
        clear: function() {},
        bodiesUnderPoint: function() {
            return null
        },
        updateCircShape: function(a,
            b, c) {
            if (null == this.circShape)(new ca(function() {
                null == f.BodyType_STATIC && (f.internal = !0, f.BodyType_STATIC = new Ka, f.internal = !1);
                return f.BodyType_STATIC
            }(this))).zpp_inner.wrap_shapes.add(this.circShape = new fc(c, K.get(a, b, null)));
            else {
                var d = this.circShape.zpp_inner.circle,
                    c = c / d.radius;
                null == this.matrix && (this.matrix = new Ig);
                this.matrix.set_a(this.matrix.set_d(c));
                this.matrix.set_b(this.matrix.set_c(0));
                this.matrix.set_tx(a - c * d.localCOMx);
                this.matrix.set_ty(b - c * d.localCOMy);
                this.circShape.transform(this.matrix)
            }
            this.circShape.zpp_inner.validate_aabb()
        },
        bodiesInCircle: function() {
            return null
        },
        __class__: nd
    };
    var Ha = function() {
        this.synced = this.first_sync = !1;
        this.snext = null;
        this.moved = !1;
        this.next = this.mnext = null;
        this.height = 0;
        this.parent = this.child1 = this.child2 = null;
        this.dyn = !1;
        this.aabb = this.shape = null;
        this.height = -1
    };
    g["zpp_nape.space.ZPP_AABBNode"] = Ha;
    Ha.__name__ = ["zpp_nape", "space", "ZPP_AABBNode"];
    Ha.prototype = {
        free: function() {
            this.height = -1;
            var a = this.aabb;
            null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
            a.wrap_min = a.wrap_max = null;
            a._invalidate =
                null;
            a._validate = null;
            a.next = na.zpp_pool;
            na.zpp_pool = a;
            this.mnext = this.snext = this.next = this.child1 = this.child2 = this.parent = null
        },
        __class__: Ha
    };
    var Y = function() {
        this.arb = this.next = null;
        this.id = this.di = 0;
        this.first = this.sleeping = !1;
        this.n1 = this.n2 = null
    };
    g["zpp_nape.space.ZPP_AABBPair"] = Y;
    Y.__name__ = ["zpp_nape", "space", "ZPP_AABBPair"];
    Y.prototype = {
        __class__: Y
    };
    var vb = function() {
        this.root = null
    };
    g["zpp_nape.space.ZPP_AABBTree"] = vb;
    vb.__name__ = ["zpp_nape", "space", "ZPP_AABBTree"];
    vb.prototype = {
        clear: function() {
            if (null !=
                this.root) {
                var a;
                this.root.next = null;
                for (a = this.root; null != a;) {
                    var b;
                    b = a;
                    a = b.next;
                    b.next = null;
                    null == b.child1 ? (b.shape.node = null, b.shape.removedFromSpace(), b.shape = null) : (null != b.child1 && (b.child1.next = a, a = b.child1), null != b.child2 && (b.child2.next = a, a = b.child2));
                    b.free();
                    b.next = Ha.zpp_pool;
                    Ha.zpp_pool = b
                }
                this.root = null
            }
        },
        inlined_insertLeaf: function(a) {
            if (null == this.root) this.root = a, this.root.parent = null;
            else {
                for (var b = a.aabb, c = this.root; null != c.child1;) {
                    var d = c.child1,
                        e = c.child2,
                        f = c.aabb.perimeter();
                    vb.tmpaabb.setCombine(c.aabb, b);
                    var g = vb.tmpaabb.perimeter(),
                        i = 2 * g,
                        f = 2 * (g - f);
                    vb.tmpaabb.setCombine(b, d.aabb);
                    null == d.child1 ? g = vb.tmpaabb.perimeter() + f : (g = d.aabb.perimeter(), g = vb.tmpaabb.perimeter() - g + f);
                    vb.tmpaabb.setCombine(b, e.aabb);
                    if (null == e.child1) f = vb.tmpaabb.perimeter() + f;
                    else var j = e.aabb.perimeter(),
                        f = vb.tmpaabb.perimeter() - j + f; if (i < g && i < f) break;
                    else c = g < f ? d : e
                }
                d = c.parent;
                null == Ha.zpp_pool ? e = new Ha : (e = Ha.zpp_pool, Ha.zpp_pool = e.next, e.next = null);
                null == na.zpp_pool ? e.aabb = new na : (e.aabb = na.zpp_pool,
                    na.zpp_pool = e.aabb.next, e.aabb.next = null);
                null;
                e.moved = !1;
                e.synced = !1;
                e.first_sync = !1;
                e.parent = d;
                e.aabb.setCombine(b, c.aabb);
                e.height = c.height + 1;
                null != d ? (d.child1 == c ? d.child1 = e : d.child2 = e, e.child1 = c, e.child2 = a, c.parent = e, a.parent = e) : (e.child1 = c, e.child2 = a, c.parent = e, this.root = a.parent = e);
                for (c = a.parent; null != c;) c = this.balance(c), a = c.child1, b = c.child2, d = a.height, e = b.height, c.height = 1 + (d > e ? d : e), c.aabb.setCombine(a.aabb, b.aabb), c = c.parent
            }
        },
        removeLeaf: function(a) {
            this.inlined_removeLeaf(a)
        },
        inlined_removeLeaf: function(a) {
            if (a ==
                this.root) this.root = null;
            else {
                var b = a.parent,
                    c = b.parent,
                    a = b.child1 == a ? b.child2 : b.child1;
                if (null != c) {
                    c.child1 == b ? c.child1 = a : c.child2 = a;
                    a.parent = c;
                    b.free();
                    b.next = Ha.zpp_pool;
                    Ha.zpp_pool = b;
                    for (b = c; null != b;) b = this.balance(b), a = b.child1, c = b.child2, b.aabb.setCombine(a.aabb, c.aabb), a = a.height, c = c.height, b.height = 1 + (a > c ? a : c), b = b.parent
                } else this.root = a, a.parent = null, b.free(), b.next = Ha.zpp_pool, Ha.zpp_pool = b
            }
        },
        balance: function(a) {
            if (null == a.child1 || 2 > a.height) return a;
            var b = a.child1,
                c = a.child2,
                d = c.height -
                b.height;
            if (1 < d) {
                var e = c.child1,
                    f = c.child2;
                c.child1 = a;
                c.parent = a.parent;
                a.parent = c;
                null != c.parent ? c.parent.child1 == a ? c.parent.child1 = c : c.parent.child2 = c : this.root = c;
                e.height > f.height ? (c.child2 = e, a.child2 = f, f.parent = a, a.aabb.setCombine(b.aabb, f.aabb), c.aabb.setCombine(a.aabb, e.aabb), a.height = 1 + function() {
                    var a = b.height,
                        c = f.height;
                    return a > c ? a : c
                }(this), c.height = 1 + function() {
                    var b = a.height,
                        c = e.height;
                    return b > c ? b : c
                }(this)) : (c.child2 = f, a.child2 = e, e.parent = a, a.aabb.setCombine(b.aabb, e.aabb), c.aabb.setCombine(a.aabb,
                    f.aabb), a.height = 1 + function() {
                    var a = b.height,
                        c = e.height;
                    return a > c ? a : c
                }(this), c.height = 1 + function() {
                    var b = a.height,
                        c = f.height;
                    return b > c ? b : c
                }(this));
                return c
            }
            if (-1 > d) {
                var g = b.child1,
                    i = b.child2;
                b.child1 = a;
                b.parent = a.parent;
                a.parent = b;
                null != b.parent ? b.parent.child1 == a ? b.parent.child1 = b : b.parent.child2 = b : this.root = b;
                g.height > i.height ? (b.child2 = g, a.child1 = i, i.parent = a, a.aabb.setCombine(c.aabb, i.aabb), b.aabb.setCombine(a.aabb, g.aabb), a.height = 1 + function() {
                        var a = c.height,
                            b = i.height;
                        return a > b ? a : b
                    }(this),
                    b.height = 1 + function() {
                        var b = a.height,
                            c = g.height;
                        return b > c ? b : c
                    }(this)) : (b.child2 = i, a.child1 = g, g.parent = a, a.aabb.setCombine(c.aabb, g.aabb), b.aabb.setCombine(a.aabb, i.aabb), a.height = 1 + function() {
                    var a = c.height,
                        b = g.height;
                    return a > b ? a : b
                }(this), b.height = 1 + function() {
                    var b = a.height,
                        c = i.height;
                    return b > c ? b : c
                }(this));
                return b
            }
            return a
        },
        __class__: vb
    };
    var Rf = function(a) {
        this.stree = this.dtree = this.pairs = this.syncs = this.moves = this.treeStack = this.failed = null;
        nd.call(this);
        this.space = a;
        this.is_sweep = !1;
        this.dynab =
            this;
        this.stree = new vb;
        this.dtree = new vb
    };
    g["zpp_nape.space.ZPP_DynAABBPhase"] = Rf;
    Rf.__name__ = ["zpp_nape", "space", "ZPP_DynAABBPhase"];
    Rf.__super__ = nd;
    Rf.prototype = m(nd.prototype, {
        __insert: function(a) {
            var b;
            null == Ha.zpp_pool ? b = new Ha : (b = Ha.zpp_pool, Ha.zpp_pool = b.next, b.next = null);
            null == na.zpp_pool ? b.aabb = new na : (b.aabb = na.zpp_pool, na.zpp_pool = b.aabb.next, b.aabb.next = null);
            null;
            b.moved = !1;
            b.synced = !1;
            b.first_sync = !1;
            b.shape = a;
            a.node = b;
            b.synced = !0;
            b.first_sync = !0;
            b.snext = this.syncs;
            this.syncs = b
        },
        __remove: function(a) {
            var b =
                a.node;
            b.first_sync || (b.dyn ? this.dtree.removeLeaf(b) : this.stree.removeLeaf(b));
            a.node = null;
            if (b.synced) {
                for (var c = null, d = this.syncs; null != d && !(d == b);) {
                    c = d;
                    d = d.snext
                }
                null == c ? this.syncs = d.snext : c.snext = d.snext;
                d.snext = null;
                b.synced = !1
            }
            if (b.moved) {
                c = null;
                for (d = this.moves; null != d && !(d == b);) {
                    c = d;
                    d = d.mnext
                }
                null == c ? this.moves = d.mnext : c.mnext = d.mnext;
                d.mnext = null;
                b.moved = !1
            }
            for (var c = null, e = this.pairs; null != e;) d = e.next, e.n1 == b || e.n2 == b ? (null == c ? this.pairs = d : c.next = d, null != e.arb && (e.arb.pair = null), e.arb = null,
                e.n1.shape.pairs.remove(e), e.n2.shape.pairs.remove(e), e.n1 = e.n2 = null, e.sleeping = !1, e.next = Y.zpp_pool, Y.zpp_pool = e) : c = e, e = d;
            for (; null != a.pairs.head;) c = a.pairs.pop_unsafe(), c.n1 == b ? c.n2.shape.pairs.remove(c) : c.n1.shape.pairs.remove(c), null != c.arb && (c.arb.pair = null), c.arb = null, c.n1 = c.n2 = null, c.sleeping = !1, c.next = Y.zpp_pool, Y.zpp_pool = c;
            b.free();
            b.next = Ha.zpp_pool;
            Ha.zpp_pool = b
        },
        __sync: function(a) {
            var b = a.node;
            if (!b.synced && (!this.space.continuous && a.zip_aabb && null != a.body && (a.zip_aabb = !1, a.type == f.id_ShapeType_CIRCLE ?
                a.circle.__validate_aabb() : a.polygon.__validate_aabb()), b.dyn != (a.body.type == f.id_BodyType_STATIC ? !1 : !a.body.component.sleeping) || !b.aabb.contains(a.aabb))) b.synced = !0, b.snext = this.syncs, this.syncs = b
        },
        sync_broadphase: function() {
            this.space.validation();
            if (null != this.syncs)
                if (null == this.moves) {
                    for (var a = this.syncs; null != a;) {
                        var b = a.shape;
                        a.first_sync ? a.first_sync = !1 : (a.dyn ? this.dtree : this.stree).inlined_removeLeaf(a);
                        var c = a.aabb;
                        !this.space.continuous && b.zip_aabb && null != b.body && (b.zip_aabb = !1, b.type ==
                            f.id_ShapeType_CIRCLE ? b.circle.__validate_aabb() : b.polygon.__validate_aabb());
                        c.setExpand(b.aabb, 3);
                        ((b.body.type == f.id_BodyType_STATIC ? a.dyn = !1 : a.dyn = !b.body.component.sleeping) ? this.dtree : this.stree).inlined_insertLeaf(a);
                        a.synced = !1;
                        a.moved = !0;
                        a.mnext = a.snext;
                        a.snext = null;
                        a = a.mnext
                    }
                    a = this.syncs;
                    this.syncs = this.moves;
                    this.moves = a
                } else
                    for (; null != this.syncs;) a = this.syncs, this.syncs = a.snext, a.snext = null, b = a.shape, a.first_sync ? a.first_sync = !1 : (a.dyn ? this.dtree : this.stree).inlined_removeLeaf(a), c = a.aabb, !this.space.continuous && b.zip_aabb && null != b.body && (b.zip_aabb = !1, b.type == f.id_ShapeType_CIRCLE ? b.circle.__validate_aabb() : b.polygon.__validate_aabb()), c.setExpand(b.aabb, 3), ((b.body.type == f.id_BodyType_STATIC ? a.dyn = !1 : a.dyn = !b.body.component.sleeping) ? this.dtree : this.stree).inlined_insertLeaf(a), a.synced = !1, a.moved || (a.moved = !0, a.mnext = this.moves, this.moves = a)
        },
        broadphase: function(a, b) {
            for (var c = this.syncs; null != c;) {
                var d = c.shape;
                c.first_sync ? c.first_sync = !1 : (c.dyn ? this.dtree : this.stree).inlined_removeLeaf(c);
                var e = c.aabb;
                !a.continuous && d.zip_aabb && null != d.body && (d.zip_aabb = !1, d.type == f.id_ShapeType_CIRCLE ? d.circle.__validate_aabb() : d.polygon.__validate_aabb());
                e.setExpand(d.aabb, 3);
                ((d.body.type == f.id_BodyType_STATIC ? c.dyn = !1 : c.dyn = !d.body.component.sleeping) ? this.dtree : this.stree).inlined_insertLeaf(c);
                c.synced = !1;
                c = c.snext
            }
            for (; null != this.syncs;)
                if (c = this.syncs, this.syncs = c.snext, c.snext = null, !c.moved && (c.moved = !1, d = c.shape, !d.body.component.sleeping)) {
                    var e = c.aabb,
                        h = null;
                    null != this.dtree.root && (this.dtree.root.next =
                        h, h = this.dtree.root);
                    for (; null != h;) {
                        var g;
                        g = h;
                        h = g.next;
                        g.next = null;
                        if (g != c)
                            if (null == g.child1) {
                                var i = g.shape;
                                if (i.body != d.body && !(i.body.type == f.id_BodyType_STATIC && d.body.type == f.id_BodyType_STATIC) && e.intersect(g.aabb)) {
                                    var j, l;
                                    d.id < i.id ? (j = d.id, l = i.id) : (j = i.id, l = d.id);
                                    for (var k = null, p = (d.pairs.length < i.pairs.length ? d : i).pairs.head; null != p;) {
                                        var m = p.elt;
                                        if (m.id == j && m.di == l) {
                                            k = m;
                                            break
                                        }
                                        p = p.next
                                    }
                                    null != k ? k.sleeping && (k.sleeping = !1, k.next = this.pairs, this.pairs = k, k.first = !0) : (null == Y.zpp_pool ? k = new Y :
                                        (k = Y.zpp_pool, Y.zpp_pool = k.next, k.next = null), null, k.n1 = c, k.n2 = g, k.id = j, k.di = l, k.next = this.pairs, this.pairs = k, k.first = !0, d.pairs.inlined_add(k), i.pairs.inlined_add(k))
                                }
                            } else e.intersect(g.aabb) && (null != g.child1 && (g.child1.next = h, h = g.child1), null != g.child2 && (g.child2.next = h, h = g.child2))
                    }
                    null != this.stree.root && (this.stree.root.next = h, h = this.stree.root);
                    for (; null != h;)
                        if (g = h, h = g.next, g.next = null, g != c)
                            if (null == g.child1) {
                                if (i = g.shape, i.body != d.body && !(i.body.type == f.id_BodyType_STATIC && d.body.type == f.id_BodyType_STATIC) &&
                                    e.intersect(g.aabb)) {
                                    d.id < i.id ? (j = d.id, l = i.id) : (j = i.id, l = d.id);
                                    k = null;
                                    for (p = (d.pairs.length < i.pairs.length ? d : i).pairs.head; null != p;) {
                                        m = p.elt;
                                        if (m.id == j && m.di == l) {
                                            k = m;
                                            break
                                        }
                                        p = p.next
                                    }
                                    null != k ? k.sleeping && (k.sleeping = !1, k.next = this.pairs, this.pairs = k, k.first = !0) : (null == Y.zpp_pool ? k = new Y : (k = Y.zpp_pool, Y.zpp_pool = k.next, k.next = null), null, k.n1 = c, k.n2 = g, k.id = j, k.di = l, k.next = this.pairs, this.pairs = k, k.first = !0, d.pairs.inlined_add(k), i.pairs.inlined_add(k))
                                }
                            } else e.intersect(g.aabb) && (null != g.child1 && (g.child1.next =
                                h, h = g.child1), null != g.child2 && (g.child2.next = h, h = g.child2))
                }
            for (; null != this.moves;)
                if (c = this.moves, this.moves = c.mnext, c.mnext = null, c.moved = !1, d = c.shape, !d.body.component.sleeping) {
                    e = c.aabb;
                    h = null;
                    null != this.dtree.root && (this.dtree.root.next = h, h = this.dtree.root);
                    for (; null != h;)
                        if (g = h, h = g.next, g.next = null, g != c)
                            if (null == g.child1) {
                                if (i = g.shape, i.body != d.body && !(i.body.type == f.id_BodyType_STATIC && d.body.type == f.id_BodyType_STATIC) && e.intersect(g.aabb)) {
                                    d.id < i.id ? (j = d.id, l = i.id) : (j = i.id, l = d.id);
                                    k = null;
                                    for (p =
                                        (d.pairs.length < i.pairs.length ? d : i).pairs.head; null != p;) {
                                        m = p.elt;
                                        if (m.id == j && m.di == l) {
                                            k = m;
                                            break
                                        }
                                        p = p.next
                                    }
                                    null != k ? k.sleeping && (k.sleeping = !1, k.next = this.pairs, this.pairs = k, k.first = !0) : (null == Y.zpp_pool ? k = new Y : (k = Y.zpp_pool, Y.zpp_pool = k.next, k.next = null), null, k.n1 = c, k.n2 = g, k.id = j, k.di = l, k.next = this.pairs, this.pairs = k, k.first = !0, d.pairs.inlined_add(k), i.pairs.inlined_add(k))
                                }
                            } else e.intersect(g.aabb) && (null != g.child1 && (g.child1.next = h, h = g.child1), null != g.child2 && (g.child2.next = h, h = g.child2));
                    null !=
                        this.stree.root && (this.stree.root.next = h, h = this.stree.root);
                    for (; null != h;)
                        if (g = h, h = g.next, g.next = null, g != c)
                            if (null == g.child1) {
                                if (i = g.shape, i.body != d.body && !(i.body.type == f.id_BodyType_STATIC && d.body.type == f.id_BodyType_STATIC) && e.intersect(g.aabb)) {
                                    d.id < i.id ? (j = d.id, l = i.id) : (j = i.id, l = d.id);
                                    k = null;
                                    for (p = (d.pairs.length < i.pairs.length ? d : i).pairs.head; null != p;) {
                                        m = p.elt;
                                        if (m.id == j && m.di == l) {
                                            k = m;
                                            break
                                        }
                                        p = p.next
                                    }
                                    null != k ? k.sleeping && (k.sleeping = !1, k.next = this.pairs, this.pairs = k, k.first = !0) : (null == Y.zpp_pool ?
                                        k = new Y : (k = Y.zpp_pool, Y.zpp_pool = k.next, k.next = null), null, k.n1 = c, k.n2 = g, k.id = j, k.di = l, k.next = this.pairs, this.pairs = k, k.first = !0, d.pairs.inlined_add(k), i.pairs.inlined_add(k))
                                }
                            } else e.intersect(g.aabb) && (null != g.child1 && (g.child1.next = h, h = g.child1), null != g.child2 && (g.child2.next = h, h = g.child2))
                }
            c = null;
            for (d = this.pairs; null != d;)!d.first && !d.n1.aabb.intersect(d.n2.aabb) ? (null == c ? this.pairs = d.next : c.next = d.next, d.n1.shape.pairs.inlined_try_remove(d), d.n2.shape.pairs.inlined_try_remove(d), e = d.next, null !=
                d.arb && (d.arb.pair = null), d.arb = null, d.n1 = d.n2 = null, d.sleeping = !1, d.next = Y.zpp_pool, Y.zpp_pool = d, d = e) : (e = d.n1.shape, h = e.body, g = d.n2.shape, i = g.body, !d.first && (h.component.sleeping || h.type == f.id_BodyType_STATIC) && (i.component.sleeping || i.type == f.id_BodyType_STATIC) ? (d.sleeping = !0, null == c ? this.pairs = d.next : c.next = d.next) : (d.first = !1, e.aabb.intersect(g.aabb) && (c = d.arb, d.arb = b ? a.narrowPhase(e, g, h.type != f.id_BodyType_DYNAMIC || i.type != f.id_BodyType_DYNAMIC, d.arb, !1) : a.continuousEvent(e, g, h.type != f.id_BodyType_DYNAMIC ||
                i.type != f.id_BodyType_DYNAMIC, d.arb, !1), null == d.arb ? null != c && (c.pair = null) : d.arb.pair = d), c = d), d = d.next)
        },
        clear: function() {
            for (; null != this.syncs;) {
                var a = this.syncs.snext;
                this.syncs.snext = null;
                this.syncs.first_sync && (this.syncs.shape.node = null, this.syncs.shape.removedFromSpace(), this.syncs.shape = null);
                this.syncs = a
            }
            for (; null != this.moves;) a = this.moves.mnext, this.moves.mnext = null, this.moves.first_sync && (this.moves.shape.node = null, this.moves.shape.removedFromSpace(), this.moves.shape = null), this.moves = a;
            for (; null != this.pairs;) {
                a = this.pairs.next;
                null != this.pairs.arb && (this.pairs.arb.pair = null);
                this.pairs.arb = null;
                this.pairs.n1.shape.pairs.inlined_try_remove(this.pairs);
                this.pairs.n2.shape.pairs.inlined_try_remove(this.pairs);
                var b = this.pairs;
                b.n1 = b.n2 = null;
                b.sleeping = !1;
                b.next = Y.zpp_pool;
                Y.zpp_pool = b;
                this.pairs = a
            }
            this.dtree.clear();
            this.stree.clear()
        },
        bodiesUnderPoint: function(a, b, c, d) {
            this.sync_broadphase();
            a = H.get(a, b, null);
            d = null == d ? new ub : d;
            if (null != this.stree.root) {
                null == this.treeStack && (this.treeStack =
                    new Wd);
                for (this.treeStack.add(this.stree.root); null != this.treeStack.head;)
                    if (b = this.treeStack.pop_unsafe(), b.aabb.containsPoint(a))
                        if (null == b.child1) {
                            var e = b.shape.body.outer;
                            if (!d.has(e) && (null == c || b.shape.filter.shouldCollide(c))) b.shape.type == f.id_ShapeType_CIRCLE ? o.circleContains(b.shape.circle, a) && d.push(e) : o.polyContains(b.shape.polygon, a) && d.push(e)
                        } else null != b.child1 && this.treeStack.add(b.child1), null != b.child2 && this.treeStack.add(b.child2)
            }
            if (null != this.dtree.root) {
                null == this.treeStack &&
                    (this.treeStack = new Wd);
                for (this.treeStack.add(this.dtree.root); null != this.treeStack.head;)
                    if (b = this.treeStack.pop_unsafe(), b.aabb.containsPoint(a))
                        if (null == b.child1) {
                            if (e = b.shape.body.outer, !d.has(e) && (null == c || b.shape.filter.shouldCollide(c))) b.shape.type == f.id_ShapeType_CIRCLE ? o.circleContains(b.shape.circle, a) && d.push(e) : o.polyContains(b.shape.polygon, a) && d.push(e)
                        } else null != b.child1 && this.treeStack.add(b.child1), null != b.child2 && this.treeStack.add(b.child2)
            }
            null != a.outer && (a.outer.zpp_inner =
                null, a.outer = null);
            a._isimmutable = null;
            a._validate = null;
            a._invalidate = null;
            a.next = H.zpp_pool;
            H.zpp_pool = a;
            return d
        },
        bodiesInCircle: function(a, b, c, d, e, f) {
            this.sync_broadphase();
            this.updateCircShape(a, b, c);
            a = this.circShape.zpp_inner.aabb;
            f = null == f ? new ub : f;
            null == this.failed && (this.failed = new ub);
            if (null != this.stree.root) {
                null == this.treeStack && (this.treeStack = new Wd);
                for (this.treeStack.add(this.stree.root); null != this.treeStack.head;)
                    if (c = this.treeStack.pop_unsafe(), c.aabb.intersect(a))
                        if (null == c.child1) {
                            if (b =
                                c.shape.body.outer, null == e || c.shape.filter.shouldCollide(e)) d ? this.failed.has(b) || (c = o.containTest(this.circShape.zpp_inner, c.shape), !f.has(b) && c ? f.push(b) : c || (f.remove(b), this.failed.push(b))) : !f.has(b) && o.testCollide_safe(c.shape, this.circShape.zpp_inner) && f.push(b)
                        } else null != c.child1 && this.treeStack.add(c.child1), null != c.child2 && this.treeStack.add(c.child2)
            }
            if (null != this.dtree.root) {
                null == this.treeStack && (this.treeStack = new Wd);
                for (this.treeStack.add(this.dtree.root); null != this.treeStack.head;)
                    if (c =
                        this.treeStack.pop_unsafe(), c.aabb.intersect(a))
                        if (null == c.child1) {
                            if (b = c.shape.body.outer, null == e || c.shape.filter.shouldCollide(e)) d ? this.failed.has(b) || (c = o.containTest(this.circShape.zpp_inner, c.shape), !f.has(b) && c ? f.push(b) : c || (f.remove(b), this.failed.push(b))) : !f.has(b) && o.testCollide_safe(c.shape, this.circShape.zpp_inner) && f.push(b)
                        } else null != c.child1 && this.treeStack.add(c.child1), null != c.child2 && this.treeStack.add(c.child2)
            }
            this.failed.clear();
            return f
        },
        __class__: Rf
    });
    var va = function() {
        this.waket =
            0;
        this.sleep = !1;
        this.comps = null;
        this.length = 0;
        this._inuse = this.modified = this.pushmod = !1;
        this.next = null;
        this.comps = new Wg
    };
    g["zpp_nape.space.ZPP_Island"] = va;
    va.__name__ = ["zpp_nape", "space", "ZPP_Island"];
    va.prototype = {
        inlined_add: function(a) {
            a._inuse = !0;
            a.next = this.next;
            this.next = a;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.next;
            this.next = a.next;
            a._inuse = !1;
            null == this.next && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        inlined_pop_unsafe: function() {
            var a =
                this.next;
            this.pop();
            return a
        },
        __class__: va
    };
    var Ya = function() {
        this.woken = !1;
        this.waket = 0;
        this.sleeping = !1;
        this.body = this.constraint = this.island = null;
        this.isBody = !1;
        this.rank = 0;
        this.next = this.parent = null;
        this.sleeping = !1;
        this.island = null;
        this.parent = this;
        this.rank = 0;
        this.woken = !1
    };
    g["zpp_nape.space.ZPP_Component"] = Ya;
    Ya.__name__ = ["zpp_nape", "space", "ZPP_Component"];
    Ya.prototype = {
        __class__: Ya
    };
    var jb = function() {
        this.freed = this.lazydel = !1;
        this.length = 0;
        this._inuse = this.modified = this.pushmod = !1;
        this.int1 =
            this.int2 = this.next = null;
        this.id = this.di = 0;
        this.arbiters = new te
    };
    g["zpp_nape.space.ZPP_CallbackSet"] = jb;
    jb.__name__ = ["zpp_nape", "space", "ZPP_CallbackSet"];
    jb.get = function(a, b) {
        var c;
        null == jb.zpp_pool ? c = new jb : (c = jb.zpp_pool, jb.zpp_pool = c.next, c.next = null);
        c.freed = !1;
        c.lazydel = !1;
        c.COLLISIONstate = f.id_PreFlag_ACCEPT;
        c.COLLISIONstamp = 0;
        c.SENSORstate = f.id_PreFlag_ACCEPT;
        c.SENSORstamp = 0;
        c.FLUIDstate = f.id_PreFlag_ACCEPT;
        c.FLUIDstamp = 0;
        a.id < b.id ? (c.int1 = a, c.int2 = b) : (c.int1 = b, c.int2 = a);
        c.id = c.int1.id;
        c.di =
            c.int2.id;
        return c
    };
    jb.prototype = {
        inlined_add: function(a) {
            a._inuse = !0;
            a.next = this.next;
            this.next = a;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.next;
            this.next = a.next;
            a._inuse = !1;
            null == this.next && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.next;
            this.pop();
            return a
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.next, this.next = c = b.next,
                null == this.next && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            b._inuse = !1;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        remove_arb: function(a) {
            this.arbiters.inlined_try_remove(a)
        },
        empty_arb: function(a) {
            var b;
            b = !0;
            for (var c = this.arbiters.head; null != c;)
                if (0 == (c.elt.type & a)) c = c.next;
                else {
                    b = !1;
                    break
                }
            return b
        },
        sleeping: function() {
            var a;
            a = !0;
            for (var b = this.arbiters.head; null != b;)
                if (b.elt.sleeping) b = b.next;
                else {
                    a = !1;
                    break
                }
            return a
        },
        __class__: jb
    };
    var Xg = function(a) {
        this.cbsets =
            this.space = null;
        null == Na.zpp_pool ? this.cbsets = new Na : (this.cbsets = Na.zpp_pool, Na.zpp_pool = this.cbsets.next, this.cbsets.next = null);
        null;
        this.cbsets.lt = J.setlt;
        this.space = a
    };
    g["zpp_nape.space.ZPP_CbSetManager"] = Xg;
    Xg.__name__ = ["zpp_nape", "space", "ZPP_CbSetManager"];
    Xg.prototype = {
        get: function(a) {
            if (null == a.head) return null;
            var b;
            null == J.zpp_pool ? b = new J : (b = J.zpp_pool, J.zpp_pool = b.next, b.next = null);
            null;
            var c = b.cbTypes;
            b.cbTypes = a;
            var d = this.cbsets.find_weak(b);
            null != d ? a = d.data : (a = J.get(a), this.cbsets.insert(a),
                a.manager = this);
            b.cbTypes = c;
            b.free();
            b.next = J.zpp_pool;
            J.zpp_pool = b;
            return a
        },
        remove: function(a) {
            for (this.cbsets.remove(a); null != a.cbpairs.head;) {
                var b = a.cbpairs.pop_unsafe();
                b.a != b.b && (a == b.a ? b.b.cbpairs.remove(b) : b.a.cbpairs.remove(b));
                b.a = b.b = null;
                b.listeners.clear();
                b.next = ib.zpp_pool;
                ib.zpp_pool = b
            }
            a.manager = null
        },
        clear: function() {},
        validate: function() {
            if (!this.cbsets.empty()) {
                for (var a = this.cbsets.parent; null != a.prev;) a = a.prev;
                for (; null != a;)
                    if (a.data.validate(), null != a.next)
                        for (a = a.next; null !=
                            a.prev;) a = a.prev;
                    else {
                        for (; null != a.parent && a == a.parent.next;) a = a.parent;
                        a = a.parent
                    }
            }
        },
        pair: function(a, b) {
            for (var c = null, d = (a.cbpairs.length < b.cbpairs.length ? a.cbpairs : b.cbpairs).head; null != d;) {
                var e = d.elt;
                if (e.a == a && e.b == b || e.a == b && e.b == a) {
                    c = e;
                    break
                }
                d = d.next
            }
            null == c && (c = ib.get(a, b), a.cbpairs.add(c), b != a && b.cbpairs.add(c));
            c.zip_listeners && (c.zip_listeners = !1, c.__validate());
            return c
        },
        __class__: Xg
    };
    var Og = function(a, b) {
        this.precb = this.prelisteners = null;
        this.continuous = !1;
        this.toiEvents = null;
        this.pre_dt =
            0;
        this.c_arbiters_true = this.c_arbiters_false = this.f_arbiters = this.s_arbiters = this.live = this.wrap_live = this.live_constraints = this.wrap_livecon = this.staticsleep = this.islands = this.listeners = this.wrap_listeners = this.callbacks = this.callbackset_list = this.cbsets = null;
        this.sortcontacts = !1;
        this.time = 0;
        this.midstep = !1;
        this.global_lin_drag = this.global_ang_drag = this.stamp = 0;
        this.bodies = this.wrap_bodies = this.compounds = this.wrap_compounds = this.constraints = this.wrap_constraints = this.kinematics = this.bphase = this.__static =
            null;
        this.gravityx = this.gravityy = 0;
        this.outer = null;
        this.toiEvents = new Yg;
        this.global_ang_drag = this.global_lin_drag = 0.015;
        this.precb = new Ef;
        this.precb.zpp_inner = new Jc;
        this.sortcontacts = !0;
        this.pre_dt = 0;
        var c;
        if (!(c = null == b)) null == f.Broadphase_DYNAMIC_AABB_TREE && (f.internal = !0, f.Broadphase_DYNAMIC_AABB_TREE = new md, f.internal = !1), c = b == f.Broadphase_DYNAMIC_AABB_TREE;
        c ? this.bphase = new Rf(this) : (null == f.Broadphase_SWEEP_AND_PRUNE && (f.internal = !0, f.Broadphase_SWEEP_AND_PRUNE = new md, f.internal = !1), b == f.Broadphase_SWEEP_AND_PRUNE &&
            (this.bphase = new Sf(this)));
        this.time = 0;
        null != a ? (this.gravityx = a.x, this.gravityy = a.y) : this.gravityy = this.gravityx = 0;
        this.bodies = new od;
        this.wrap_bodies = Xb.get(this.bodies);
        this.wrap_bodies.zpp_inner.adder = E(this, this.bodies_adder);
        this.wrap_bodies.zpp_inner.subber = E(this, this.bodies_subber);
        this.compounds = new ue;
        this.wrap_compounds = oc.get(this.compounds);
        this.wrap_compounds.zpp_inner.adder = E(this, this.compounds_adder);
        this.wrap_compounds.zpp_inner.subber = E(this, this.compounds_subber);
        this.kinematics =
            new od;
        this.c_arbiters_true = new Tf;
        this.c_arbiters_false = new Tf;
        this.f_arbiters = new Zg;
        this.s_arbiters = new $g;
        this.islands = new va;
        this.live = new od;
        this.wrap_live = Xb.get(this.live, !0);
        this.staticsleep = new od;
        this.constraints = new ed;
        this.wrap_constraints = lc.get(this.constraints);
        this.wrap_constraints.zpp_inner.adder = E(this, this.constraints_adder);
        this.wrap_constraints.zpp_inner.subber = E(this, this.constraints_subber);
        this.live_constraints = new ed;
        this.wrap_livecon = lc.get(this.live_constraints, !0);
        this.__static =
            Gb.__static();
        this.__static.zpp_inner.space = this;
        this.callbacks = new Jc;
        this.midstep = !1;
        this.listeners = new Uf;
        this.wrap_listeners = Cc.get(this.listeners);
        this.wrap_listeners.zpp_inner.adder = E(this, this.listeners_adder);
        this.wrap_listeners.zpp_inner.subber = E(this, this.listeners_subber);
        this.callbackset_list = new jb;
        this.mrca1 = new fd;
        this.mrca2 = new fd;
        this.prelisteners = new Hd;
        this.cbsets = new Xg(this)
    };
    g["zpp_nape.space.ZPP_Space"] = Og;
    Og.__name__ = ["zpp_nape", "space", "ZPP_Space"];
    Og.prototype = {
        clear: function() {
            for (; null !=
                this.listeners.head;) this.remListener(this.listeners.pop_unsafe());
            for (; null != this.callbackset_list.next;) {
                var a = this.callbackset_list.pop_unsafe();
                a.arbiters.clear();
                a.int1 = a.int2 = null;
                a.id = a.di = -1;
                a.freed = !0;
                null;
                a.next = jb.zpp_pool;
                jb.zpp_pool = a
            }
            for (; null != this.c_arbiters_true.head;) this.c_arbiters_true.pop_unsafe().retire();
            for (; null != this.c_arbiters_false.head;) this.c_arbiters_false.pop_unsafe().retire();
            for (; null != this.s_arbiters.head;) this.s_arbiters.pop_unsafe().retire();
            for (; null != this.f_arbiters.head;) this.f_arbiters.pop_unsafe().retire();
            for (this.bphase.clear(); null != this.bodies.head;) {
                a = this.bodies.pop_unsafe();
                if (null != a.component) {
                    var b = a.component.island;
                    if (null != b) {
                        for (; null != b.comps.head;) {
                            var c = b.comps.pop_unsafe();
                            c.sleeping = !1;
                            c.island = null;
                            c.parent = c;
                            c.rank = 0
                        }
                        b.next = va.zpp_pool;
                        va.zpp_pool = b
                    }
                }
                a.removedFromSpace();
                a.space = null
            }
            for (; null != this.constraints.head;) {
                a = this.constraints.pop_unsafe();
                if (null != a.component && (b = a.component.island, null != b)) {
                    for (; null != b.comps.head;) c = b.comps.pop_unsafe(), c.sleeping = !1, c.island = null,
                        c.parent = c, c.rank = 0;
                    b.next = va.zpp_pool;
                    va.zpp_pool = b
                }
                a.removedFromSpace();
                a.space = null
            }
            this.kinematics.clear();
            for (a = new ue; null != this.compounds.head;) b = this.compounds.pop_unsafe(), a.add(b);
            for (; null != a.head;) {
                b = a.pop_unsafe();
                b.removedFromSpace();
                b.space = null;
                for (c = b.bodies.head; null != c;) {
                    var d = c.elt;
                    if (null != d.component) {
                        var e = d.component.island;
                        if (null != e) {
                            for (; null != e.comps.head;) {
                                var f = e.comps.pop_unsafe();
                                f.sleeping = !1;
                                f.island = null;
                                f.parent = f;
                                f.rank = 0
                            }
                            e.next = va.zpp_pool;
                            va.zpp_pool = e
                        }
                    }
                    d.removedFromSpace();
                    d.space = null;
                    c = c.next
                }
                for (c = b.constraints.head; null != c;) {
                    d = c.elt;
                    if (null != d.component && (e = d.component.island, null != e)) {
                        for (; null != e.comps.head;) f = e.comps.pop_unsafe(), f.sleeping = !1, f.island = null, f.parent = f, f.rank = 0;
                        e.next = va.zpp_pool;
                        va.zpp_pool = e
                    }
                    d.removedFromSpace();
                    d.space = null;
                    c = c.next
                }
                for (b = b.compounds.head; null != b;) a.add(b.elt), b = b.next
            }
            this.staticsleep.clear();
            this.live.clear();
            this.live_constraints.clear();
            this.time = this.stamp = 0;
            this.mrca1.clear();
            this.mrca2.clear();
            this.prelisteners.clear();
            this.cbsets.clear()
        },
        bodies_adder: function(a) {
            return a.zpp_inner.space != this ? (null != a.zpp_inner.space && a.zpp_inner.space.outer.zpp_inner.wrap_bodies.remove(a), this.addBody(a.zpp_inner), !0) : !1
        },
        bodies_subber: function(a) {
            this.remBody(a.zpp_inner)
        },
        compounds_adder: function(a) {
            return a.zpp_inner.space != this ? (null != a.zpp_inner.space && a.zpp_inner.space.wrap_compounds.remove(a), this.addCompound(a.zpp_inner), !0) : !1
        },
        compounds_subber: function(a) {
            this.remCompound(a.zpp_inner)
        },
        constraints_adder: function(a) {
            return a.zpp_inner.space !=
                this ? (null != a.zpp_inner.space && a.zpp_inner.space.outer.zpp_inner.wrap_constraints.remove(a), this.addConstraint(a.zpp_inner), !0) : !1
        },
        constraints_subber: function(a) {
            this.remConstraint(a.zpp_inner)
        },
        listeners_adder: function(a) {
            return a.zpp_inner.space != this ? (null != a.zpp_inner.space && a.zpp_inner.space.outer.zpp_inner.wrap_listeners.remove(a), this.addListener(a.zpp_inner), !0) : !1
        },
        listeners_subber: function(a) {
            this.remListener(a.zpp_inner)
        },
        addListener: function(a) {
            a.space = this;
            a.addedToSpace();
            null != a.interaction &&
                null
        },
        remListener: function(a) {
            null != a.interaction && null;
            a.removedFromSpace();
            a.space = null
        },
        add_callbackset: function(a) {
            a.int1.cbsets.inlined_add(a);
            a.int2.cbsets.inlined_add(a);
            this.callbackset_list.inlined_add(a)
        },
        remove_callbackset: function(a) {
            a.lazydel = !0;
            a.int1.cbsets.inlined_try_remove(a);
            a.int2.cbsets.inlined_try_remove(a)
        },
        transmitType: function(a, b) {
            a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.type == f.id_BodyType_KINEMATIC && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !1));
            a.type == f.id_BodyType_DYNAMIC ? this.live.remove(a) : a.type == f.id_BodyType_KINEMATIC ? (this.kinematics.remove(a), this.staticsleep.remove(a)) : a.type == f.id_BodyType_STATIC && this.staticsleep.remove(a);
            a.type = b;
            a.type == f.id_BodyType_KINEMATIC && this.kinematics.add(a);
            a.type == f.id_BodyType_STATIC && this.static_validation(a);
            a.component.sleeping = !0;
            a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.type == f.id_BodyType_KINEMATIC && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0))
        },
        added_shape: function(a, b) {
            null == b && (b = !1);
            if (!b) {
                var c = a.body;
                c.world || (c.component.waket = this.stamp + (this.midstep ? 0 : 1), c.type == f.id_BodyType_KINEMATIC && (c.kinematicDelaySleep = !0), c.component.sleeping && this.really_wake(c, !1))
            }
            this.bphase.insert(a);
            a.addedToSpace()
        },
        removed_shape: function(a, b) {
            null == b && (b = !1);
            var c = this,
                d = a.body;
            b || d.wake();
            for (var e = null, h = d.arbiters.head; null != h;) {
                var g = [h.elt];
                if (g[0].ws1 == a || g[0].ws2 == a) {
                    if (0 != g[0].present) {
                        this.MRCA_chains(g[0].ws1, g[0].ws2);
                        for (h = this.mrca1.head; null !=
                            h;) {
                            for (var i = h.elt, j = this.mrca2.head; null != j;) {
                                var l = j.elt,
                                    k = i.cbSet,
                                    m = l.cbSet;
                                k.validate();
                                m.validate();
                                k.manager.pair(k, m).empty_intersection() || (l = [ea.get(i, l)], l[0].remove_arb(g[0]), g[0].present--, k.manager.pair(k, m).forall(f.id_CbEvent_END, function(a, b) {
                                    return function(d) {
                                        if (0 != (d.itype & b[0].type) && a[0].empty_arb(d.itype)) {
                                            var e = c.push_callback(d);
                                            e.event = f.id_CbEvent_END;
                                            ea.int_callback(a[0], d, e);
                                            e.set = a[0]
                                        }
                                    }
                                }(l, g)), null == l[0].arbiters.head && this.remove_callbackset(l[0]));
                                j = j.next
                            }
                            h = h.next
                        }
                    }
                    g[0].b1 !=
                        d && g[0].b1.type == f.id_BodyType_DYNAMIC && (h = g[0].b1, h.world || (h.component.waket = this.stamp + (this.midstep ? 0 : 1), h.type == f.id_BodyType_KINEMATIC && (h.kinematicDelaySleep = !0), h.component.sleeping && this.really_wake(h, !1)));
                    g[0].b2 != d && g[0].b2.type == f.id_BodyType_DYNAMIC && (h = g[0].b2, h.world || (h.component.waket = this.stamp + (this.midstep ? 0 : 1), h.type == f.id_BodyType_KINEMATIC && (h.kinematicDelaySleep = !0), h.component.sleeping && this.really_wake(h, !1)));
                    g[0].cleared = !0;
                    (null == d || g[0].b2 == d) && g[0].b1.arbiters.inlined_try_remove(g[0]);
                    (null == d || g[0].b1 == d) && g[0].b2.arbiters.inlined_try_remove(g[0]);
                    null != g[0].pair && (g[0].pair.arb = null, g[0].pair = null);
                    g[0].active = !1;
                    this.f_arbiters.modified = !0;
                    h = d.arbiters.erase(e)
                } else e = h, h = h.next
            }
            this.bphase.remove(a);
            a.removedFromSpace()
        },
        addConstraint: function(a) {
            a.space = this;
            a.addedToSpace();
            a.active && (a.component.sleeping = !0, this.wake_constraint(a, !0))
        },
        remConstraint: function(a) {
            a.active && (this.wake_constraint(a, !0), this.live_constraints.remove(a));
            a.removedFromSpace();
            a.space = null
        },
        addCompound: function(a) {
            a.space =
                this;
            a.addedToSpace();
            for (var b = a.bodies.head; null != b;) this.addBody(b.elt), b = b.next;
            for (b = a.constraints.head; null != b;) this.addConstraint(b.elt), b = b.next;
            for (a = a.compounds.head; null != a;) this.addCompound(a.elt), a = a.next
        },
        remCompound: function(a) {
            for (var b = a.bodies.head; null != b;) this.remBody(b.elt), b = b.next;
            for (b = a.constraints.head; null != b;) this.remConstraint(b.elt), b = b.next;
            for (b = a.compounds.head; null != b;) this.remCompound(b.elt), b = b.next;
            a.removedFromSpace();
            a.space = null
        },
        addBody: function(a, b) {
            null ==
                b && (b = -1);
            a.space = this;
            a.addedToSpace();
            a.component.sleeping = !0;
            a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.type == f.id_BodyType_KINEMATIC && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0));
            for (var c = a.shapes.head; null != c;) this.added_shape(c.elt, !0), c = c.next;
            a.type == f.id_BodyType_STATIC ? this.static_validation(a) : a.type != f.id_BodyType_DYNAMIC && b != f.id_BodyType_KINEMATIC && this.kinematics.add(a)
        },
        remBody: function(a, b) {
            null == b && (b = -1);
            a.type == f.id_BodyType_STATIC ?
                (a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.type == f.id_BodyType_KINEMATIC && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0)), this.staticsleep.remove(a)) : a.type == f.id_BodyType_DYNAMIC ? (a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.type == f.id_BodyType_KINEMATIC && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0)), this.live.remove(a)) : (b != f.id_BodyType_KINEMATIC && this.kinematics.remove(a), a.world || (a.component.waket = this.stamp +
                (this.midstep ? 0 : 1), a.type == f.id_BodyType_KINEMATIC && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0)), this.staticsleep.remove(a));
            for (var c = a.shapes.head; null != c;) this.removed_shape(c.elt, !0), c = c.next;
            a.removedFromSpace();
            a.space = null
        },
        bodiesUnderPoint: function(a, b, c, d) {
            return this.bphase.bodiesUnderPoint(a, b, c, d)
        },
        bodiesInCircle: function(a, b, c, d, e) {
            return this.bphase.bodiesInCircle(function() {
                a.zpp_inner.validate();
                return a.zpp_inner.x
            }(this), function() {
                a.zpp_inner.validate();
                return a.zpp_inner.y
            }(this), b, c, d, e)
        },
        push_callback: function(a) {
            var b;
            null == Jc.zpp_pool ? b = new Jc : (b = Jc.zpp_pool, Jc.zpp_pool = b.next, b.next = null);
            null;
            this.callbacks.push(b);
            b.listener = a;
            return b
        },
        step: function(a, b, c) {
            var d = this;
            this.time += a;
            this.pre_dt = a;
            this.midstep = !0;
            this.stamp++;
            this.validation();
            this.bphase.broadphase(this, !0);
            this.prestep(a);
            if (this.sortcontacts) {
                var e = this.c_arbiters_false;
                if (null != e.head && null != e.head.next) {
                    var h = e.head,
                        g = null,
                        i = null,
                        j = null,
                        l = null,
                        k = 1,
                        m, o, q;
                    do {
                        m = 0;
                        i = h;
                        for (g =
                            h = null; null != i;) {
                            m++;
                            j = i;
                            o = 0;
                            for (q = k; null != j && o < k;) o++, j = j.next;
                            for (; 0 < o || 0 < q && null != j;) 0 == o ? (l = j, j = j.next, q--) : 0 == q || null == j ? (l = i, i = i.next, o--) : (i.elt.active && j.elt.active ? i.elt.oc1.dist < j.elt.oc1.dist : 1) ? (l = i, i = i.next, o--) : (l = j, j = j.next, q--), null != g ? g.next = l : h = l, g = l;
                            i = j
                        }
                        g.next = null;
                        k <<= 1
                    } while (1 < m);
                    e.head = h;
                    e.modified = !0;
                    e.pushmod = !0
                }
            }
            this.updateVel(a);
            this.warmStart();
            this.iterateVel(b);
            for (b = this.kinematics.head; null != b;) e = b.elt, e.pre_posx = e.posx, e.pre_posy = e.posy, e.pre_rot = e.rot, b = b.next;
            for (b =
                this.live.head; null != b;) e = b.elt, e.pre_posx = e.posx, e.pre_posy = e.posy, e.pre_rot = e.rot, b = b.next;
            this.updatePos(a);
            this.continuous = !0;
            this.continuousCollisions(a);
            this.continuous = !1;
            this.iteratePos(c);
            for (c = this.kinematics.head; null != c;) b = c.elt, e = b.pre_rot != b.rot, !(b.posx == b.pre_posx && b.posy == b.pre_posy) && b.invalidate_pos(), e && b.invalidate_rot(), c = c.next;
            for (c = this.live.head; null != c;) b = c.elt, e = b.pre_rot != b.rot, !(b.posx == b.pre_posx && b.posy == b.pre_posy) && b.invalidate_pos(), e && b.invalidate_rot(), c = c.next;
            c = null;
            for (b = this.staticsleep.head; null != b;) e = b.elt, e.type != f.id_BodyType_KINEMATIC || 0 == e.velx && 0 == e.vely && 0 == e.angvel ? e.kinematicDelaySleep ? (e.kinematicDelaySleep = !1, b = b.next) : (e.component.sleeping = !0, b = this.staticsleep.inlined_erase(c)) : (c = b, b = b.next);
            this.doForests(a);
            this.sleepArbiters();
            this.midstep = !1;
            c = null;
            for (a = this.callbackset_list.next; null != a;) b = [a], null == b[0].arbiters.head ? (a = this.callbackset_list.inlined_erase(c), b = b[0], b.int1 = b.int2 = null, b.id = b.di = -1, b.freed = !0, null, b.next = jb.zpp_pool,
                jb.zpp_pool = b) : (c = [b[0].sleeping()], J.find_all(b[0].int1.cbSet, b[0].int2.cbSet, f.id_CbEvent_ONGOING, function(a, b) {
                return function(c) {
                    if ((!a[0] || c.allowSleepingCallbacks) && !b[0].empty_arb(c.itype)) {
                        var e = d.push_callback(c);
                        e.event = f.id_CbEvent_ONGOING;
                        ea.int_callback(b[0], c, e);
                        e.set = b[0]
                    }
                }
            }(c, b)), c = a, a = a.next);
            for (; !this.callbacks.empty();) a = this.callbacks.pop(), a.listener.type == f.id_ListenerType_BODY ? a.listener.body.handler(a.wrapper_body()) : a.listener.type == f.id_ListenerType_CONSTRAINT ? a.listener.constraint.handler(a.wrapper_con()) :
                a.listener.type == f.id_ListenerType_INTERACTION && a.listener.interaction.handleri(a.wrapper_int()), a.int1 = a.int2 = null, a.body = null, a.constraint = null, a.listener = null, null != a.wrap_arbiters && (a.wrap_arbiters.zpp_inner.inner = null), a.set = null, a.next = Jc.zpp_pool, Jc.zpp_pool = a
        },
        continuousCollisions: function(a) {
            var b = 2 * Math.PI / a;
            this.bphase.broadphase(this, !1);
            for (var c = 0; 1 > c && null != this.toiEvents.head;) {
                for (var d = null, c = 2, e = !1, h = null, g = null, i = this.toiEvents.head; null != i;) {
                    var j = i.elt,
                        m = j.s1.body,
                        k = j.s2.body;
                    if (m.sweepFrozen && k.sweepFrozen)
                        if (0 != j.toi && o.testCollide_safe(j.s1, j.s2)) j.toi = 0;
                        else {
                            i = this.toiEvents.erase(g);
                            j.next = Pa.zpp_pool;
                            Pa.zpp_pool = j;
                            continue
                        }
                    if (j.frozen1 != m.sweepFrozen || j.frozen2 != k.sweepFrozen)
                        if (j.kinematic) {
                            i = this.toiEvents.erase(g);
                            j.next = Pa.zpp_pool;
                            Pa.zpp_pool = j;
                            continue
                        } else if (j.frozen1 = m.sweepFrozen, j.frozen2 = k.sweepFrozen, j.frozen1 && (m = j.s1, j.s1 = j.s2, j.s2 = m, j.frozen1 = !1, j.frozen2 = !0), hb.staticSweep(j, a, 0, l.collisionSlopCCD), 0 > j.toi) {
                        i = this.toiEvents.erase(g);
                        j.next = Pa.zpp_pool;
                        Pa.zpp_pool = j;
                        continue
                    }
                    if (0 <= j.toi && (j.toi < c || !e && j.kinematic)) d = j, c = j.toi, e = j.kinematic, h = g;
                    g = i;
                    i = i.next
                }
                if (null == d) break;
                this.toiEvents.erase(h);
                c = d.toi;
                e = d.s1.body;
                h = d.s2.body;
                e.sweepFrozen || (e.sweepIntegrate(c * a), e.sweepValidate(d.s1));
                h.sweepFrozen || (h.sweepIntegrate(c * a), h.sweepValidate(d.s2));
                g = this.narrowPhase(d.s1, d.s2, !0, d.arbiter, !0);
                null == g ? null != d.arbiter && null != d.arbiter.pair && (d.arbiter.pair.arb = null, d.arbiter.pair = null) : !this.presteparb(g, a, !0) && g.type == O.COL && g.active && 0 != (g.immState &
                    f.id_ImmState_ACCEPT) && (g.colarb.warmStart(), g.colarb.applyImpulseVel(), g.colarb.applyImpulseVel(), g.colarb.applyImpulseVel(), g.colarb.applyImpulseVel(), e.sweep_angvel = e.angvel % b, h.sweep_angvel = h.angvel % b);
                null != g && g.active && 0 != (g.immState & f.id_ImmState_ACCEPT) && g.type == O.COL && (!e.sweepFrozen && e.type != f.id_BodyType_KINEMATIC && (e.sweepFrozen = !0, e.angvel = d.failed ? e.sweep_angvel = 0 : d.slipped ? e.sweep_angvel *= l.angularCCDSlipScale : e.sweep_angvel), !h.sweepFrozen && h.type != f.id_BodyType_KINEMATIC && (h.sweepFrozen = !0, h.angvel = d.failed ? h.sweep_angvel = 0 : d.slipped ? h.sweep_angvel *= l.angularCCDSlipScale : h.sweep_angvel))
            }
            for (; null != this.toiEvents.head;) b = this.toiEvents.pop_unsafe(), b.next = Pa.zpp_pool, Pa.zpp_pool = b;
            for (b = this.kinematics.head; null != b;) d = b.elt, d.sweepIntegrate(a), d.sweepTime = 0, b = b.next;
            for (b = this.live.head; null != b;) d = b.elt, d.sweepFrozen || d.sweepIntegrate(a), d.sweepTime = 0, b = b.next
        },
        continuousEvent: function(a, b, c, d) {
            if (a.body.sweepFrozen && b.body.sweepFrozen || a.body.disableCCD || b.body.disableCCD || null !=
                d && null == d.colarb || 0 >= this.interactionType(a, b, a.body, b.body)) return d;
            var e = a.body,
                h = b.body;
            if (c || e.bullet || h.bullet) {
                var g;
                null == Pa.zpp_pool ? g = new Pa : (g = Pa.zpp_pool, Pa.zpp_pool = g.next, g.next = null);
                g.failed = !1;
                g.s1 = g.s2 = null;
                g.arbiter = null;
                e = e.type == f.id_BodyType_KINEMATIC || h.type == f.id_BodyType_KINEMATIC;
                c && !e ? (a.body.type != f.id_BodyType_DYNAMIC ? (g.s2 = a, g.s1 = b) : (g.s1 = a, g.s2 = b), g.kinematic = !1, hb.staticSweep(g, this.pre_dt, 0, l.collisionSlopCCD)) : (g.s1 = a, g.s2 = b, g.kinematic = e, g.s1.body.sweepFrozen ||
                    g.s2.body.sweepFrozen ? (g.s1.body.sweepFrozen && (a = g.s1, g.s1 = g.s2, g.s2 = a, g.frozen1 = !1, g.frozen2 = !0), hb.staticSweep(g, this.pre_dt, 0, l.collisionSlopCCD)) : hb.dynamicSweep(g, this.pre_dt, 0, l.collisionSlopCCD));
                c && 0 > g.toi || g.failed ? (c = g, c.next = Pa.zpp_pool, Pa.zpp_pool = c) : (this.toiEvents.add(g), g.frozen1 = g.s1.body.sweepFrozen, g.frozen2 = g.s2.body.sweepFrozen, g.arbiter = null != d ? d.colarb : null)
            }
            return d
        },
        bodyCbWake: function(a) {
            if (a.type == f.id_BodyType_DYNAMIC && null != a.cbSet)
                if (this.midstep)
                    for (var b = a.cbSet.bodylisteners.head; null !=
                        b;) {
                        var c = b.elt;
                        c.event == f.id_CbEvent_WAKE && (c = this.push_callback(c), c.event = f.id_CbEvent_WAKE, c.body = a);
                        b = b.next
                    } else a.component.woken = !0
        },
        bodyCbSleep: function(a) {
            if (a.type == f.id_BodyType_DYNAMIC && null != a.cbSet)
                for (var b = a.cbSet.bodylisteners.head; null != b;) {
                    var c = b.elt;
                    c.event == f.id_CbEvent_SLEEP && (c = this.push_callback(c), c.event = f.id_CbEvent_SLEEP, c.body = a);
                    b = b.next
                }
        },
        constraintCbWake: function(a) {
            if (null != a.cbSet)
                if (this.midstep)
                    for (var b = a.cbSet.conlisteners.head; null != b;) {
                        var c = b.elt;
                        c.event ==
                            f.id_CbEvent_WAKE && (c = this.push_callback(c), c.event = f.id_CbEvent_WAKE, c.constraint = a);
                        b = b.next
                    } else a.component.woken = !0
        },
        constraintCbSleep: function(a) {
            if (null != a.cbSet)
                for (var b = a.cbSet.conlisteners.head; null != b;) {
                    var c = b.elt;
                    c.event == f.id_CbEvent_SLEEP && (c = this.push_callback(c), c.event = f.id_CbEvent_SLEEP, c.constraint = a);
                    b = b.next
                }
        },
        constraintCbBreak: function(a) {
            if (null != a.cbSet)
                for (var b = a.cbSet.conlisteners.head; null != b;) {
                    var c = b.elt;
                    c.event == f.id_CbEvent_BREAK && (c = this.push_callback(c), c.event =
                        f.id_CbEvent_BREAK, c.constraint = a);
                    b = b.next
                }
        },
        nullListenerType: function(a, b) {
            for (var c = new fd, d = a.interactors.head; null != d;) c.add(d.elt), d = d.next;
            if (a != b)
                for (d = b.interactors.head; null != d;) c.add(d.elt), d = d.next;
            for (; null != c.head;)
                if (d = c.pop_unsafe(), null != d.icompound) {
                    for (var d = d.icompound, e = d.bodies.head; null != e;) c.add(e.elt), e = e.next;
                    for (d = d.compounds.head; null != d;) c.add(d.elt), d = d.next
                } else {
                    e = null != d.ibody ? d.ibody : d.ishape.body;
                    d = null != d.ishape ? d.ishape : null;
                    for (e = e.arbiters.head; null != e;) {
                        var f =
                            e.elt;
                        if (0 != f.present && (null == d || f.ws1 == d || f.ws2 == d)) {
                            this.MRCA_chains(f.ws1, f.ws2);
                            for (f = this.mrca1.head; null != f;) {
                                var g = f.elt;
                                if (!(g.cbSet != a && g.cbSet != b))
                                    for (var i = this.mrca2.head; null != i;) {
                                        var j = i.elt;
                                        if (!(g.cbSet == a && j.cbSet != b || g.cbSet == b && j.cbSet != a))
                                            if (j = ea.get(g, j), null != j) {
                                                for (; null != j.arbiters.head;) j.arbiters.pop_unsafe().present--;
                                                this.remove_callbackset(j)
                                            }
                                        i = i.next
                                    }
                                f = f.next
                            }
                        }
                        e = e.next
                    }
                }
        },
        nullInteractorType: function(a, b) {
            null == b && (b = a);
            if (null != a.icompound) {
                for (var c = a.icompound, d = c.bodies.head; null !=
                    d;) this.nullInteractorType(d.elt, b), d = d.next;
                for (c = c.compounds.head; null != c;) this.nullInteractorType(c.elt, b), c = c.next
            } else {
                d = null != a.ibody ? a.ibody : a.ishape.body;
                c = null != a.ishape ? a.ishape : null;
                for (d = d.arbiters.head; null != d;) {
                    var e = d.elt;
                    if (0 != e.present && (null == c || e.ws1 == c || e.ws2 == c)) {
                        this.MRCA_chains(e.ws1, e.ws2);
                        for (var f = this.mrca1.head; null != f;) {
                            for (var g = f.elt, i = this.mrca2.head; null != i;) {
                                var j = i.elt;
                                g != b && j != b || (j = ea.get(g, j), null != j && (e.present--, j.remove_arb(e), null == j.arbiters.head && this.remove_callbackset(j)));
                                i = i.next
                            }
                            f = f.next
                        }
                    }
                    d = d.next
                }
            }
        },
        freshListenerType: function(a, b) {
            for (var c = new fd, d = a.interactors.head; null != d;) c.add(d.elt), d = d.next;
            if (a != b)
                for (d = b.interactors.head; null != d;) c.add(d.elt), d = d.next;
            for (; null != c.head;)
                if (d = c.pop_unsafe(), null != d.icompound) {
                    for (var d = d.icompound, e = d.bodies.head; null != e;) c.add(e.elt), e = e.next;
                    for (d = d.compounds.head; null != d;) c.add(d.elt), d = d.next
                } else {
                    e = null != d.ibody ? d.ibody : d.ishape.body;
                    d = null != d.ishape ? d.ishape : null;
                    for (e = e.arbiters.head; null != e;) {
                        var f = e.elt;
                        if (f.presentable &&
                            (null == d || f.ws1 == d || f.ws2 == d)) {
                            this.MRCA_chains(f.ws1, f.ws2);
                            for (var g = this.mrca1.head; null != g;) {
                                var i = g.elt;
                                if (!(i.cbSet != a && i.cbSet != b))
                                    for (var j = this.mrca2.head; null != j;) {
                                        var l = j.elt;
                                        if (!(i.cbSet == a && l.cbSet != b || i.cbSet == b && l.cbSet != a)) {
                                            var k = ea.get(i, l);
                                            null == k && (k = jb.get(i, l), this.add_callbackset(k));
                                            if (l = !k.arbiters.inlined_has(f)) k.arbiters.inlined_add(f), l = !0;
                                            l && f.present++
                                        }
                                        j = j.next
                                    }
                                g = g.next
                            }
                        }
                        e = e.next
                    }
                }
        },
        freshInteractorType: function(a, b) {
            null == b && (b = a);
            if (null != a.icompound) {
                for (var c = a.icompound,
                    d = c.bodies.head; null != d;) this.freshInteractorType(d.elt, b), d = d.next;
                for (c = c.compounds.head; null != c;) this.freshInteractorType(c.elt, b), c = c.next
            } else {
                d = null != a.ibody ? a.ibody : a.ishape.body;
                c = null != a.ishape ? a.ishape : null;
                for (d = d.arbiters.head; null != d;) {
                    var e = d.elt;
                    if (e.presentable && (null == c || e.ws1 == c || e.ws2 == c)) {
                        this.MRCA_chains(e.ws1, e.ws2);
                        for (var f = this.mrca1.head; null != f;) {
                            for (var g = f.elt, i = this.mrca2.head; null != i;) {
                                var j = i.elt;
                                if (!(g != b && j != b)) {
                                    var l = g.cbSet,
                                        k = j.cbSet;
                                    l.validate();
                                    k.validate();
                                    if (!l.manager.pair(l,
                                        k).empty_intersection()) {
                                        l = ea.get(g, j);
                                        null == l && (l = jb.get(g, j), this.add_callbackset(l));
                                        if (j = !l.arbiters.inlined_has(e)) l.arbiters.inlined_add(e), j = !0;
                                        j && e.present++
                                    }
                                }
                                i = i.next
                            }
                            f = f.next
                        }
                    }
                    d = d.next
                }
            }
        },
        wakeCompound: function(a) {
            for (var b = a.bodies.head; null != b;) {
                var c = b.elt;
                c.world || (c.component.waket = this.stamp + (this.midstep ? 0 : 1), c.type == f.id_BodyType_KINEMATIC && (c.kinematicDelaySleep = !0), c.component.sleeping && this.really_wake(c, !1));
                b = b.next
            }
            for (b = a.constraints.head; null != b;) this.wake_constraint(b.elt),
                b = b.next;
            for (a = a.compounds.head; null != a;) this.wakeCompound(a.elt), a = a.next
        },
        wakeIsland: function(a) {
            for (; null != a.comps.head;) {
                var b = a.comps.pop_unsafe();
                b.waket = this.stamp + (this.midstep ? 0 : 1);
                if (b.isBody) {
                    var c = b.body;
                    this.live.add(c);
                    for (var d = c.arbiters.head; null != d;) {
                        var e = d.elt;
                        e.sleeping && (e.sleeping = !1, e.up_stamp += this.stamp - e.sleep_stamp, e.type == O.COL ? (e = e.colarb, e.stat ? this.c_arbiters_true.inlined_add(e) : this.c_arbiters_false.inlined_add(e)) : e.type == O.FLUID ? this.f_arbiters.inlined_add(e.fluidarb) :
                            this.s_arbiters.inlined_add(e.sensorarb));
                        d = d.next
                    }
                    this.bodyCbWake(c);
                    b.sleeping = !1;
                    b.island = null;
                    b.parent = b;
                    b.rank = 0;
                    if (c.type != f.id_BodyType_STATIC)
                        for (b = c.shapes.head; null != b;) c = b.elt, null != c.node && this.bphase.sync(c), b = b.next
                } else c = b.constraint, this.live_constraints.inlined_add(c), this.constraintCbWake(c), b.sleeping = !1, b.island = null, b.parent = b, b.rank = 0
            }
            a.next = va.zpp_pool;
            va.zpp_pool = a
        },
        non_inlined_wake: function(a, b) {
            null == b && (b = !1);
            a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.type ==
                f.id_BodyType_KINEMATIC && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, b))
        },
        really_wake: function(a, b) {
            null == b && (b = !1);
            if (null == a.component.island) {
                a.component.sleeping = !1;
                a.type == f.id_BodyType_KINEMATIC || a.type == f.id_BodyType_STATIC ? this.staticsleep.inlined_add(a) : this.live.inlined_add(a);
                for (var c = a.constraints.head; null != c;) {
                    var d = c.elt;
                    d.space == this && this.wake_constraint(d);
                    c = c.next
                }
                for (c = a.arbiters.head; null != c;) {
                    d = c.elt;
                    if (d.sleeping)
                        if (d.sleeping = !1, d.up_stamp += this.stamp +
                            (this.midstep ? 0 : 1) - d.sleep_stamp, d.type == O.COL) {
                            var e = d.colarb;
                            e.stat ? this.c_arbiters_true.inlined_add(e) : this.c_arbiters_false.inlined_add(e)
                        } else d.type == O.FLUID ? this.f_arbiters.inlined_add(d.fluidarb) : this.s_arbiters.inlined_add(d.sensorarb);
                    d.type != O.SENSOR && !d.cleared && d.up_stamp >= this.stamp && 0 != (d.immState & f.id_ImmState_ACCEPT) && (d.b1.type == f.id_BodyType_DYNAMIC && d.b1.component.sleeping && (e = d.b1, e.world || (e.component.waket = this.stamp + (this.midstep ? 0 : 1), e.type == f.id_BodyType_KINEMATIC && (e.kinematicDelaySleep = !0), e.component.sleeping && this.really_wake(e, !1))), d.b2.type == f.id_BodyType_DYNAMIC && d.b2.component.sleeping && (d = d.b2, d.world || (d.component.waket = this.stamp + (this.midstep ? 0 : 1), d.type == f.id_BodyType_KINEMATIC && (d.kinematicDelaySleep = !0), d.component.sleeping && this.really_wake(d, !1))));
                    c = c.next
                }!b && a.type == f.id_BodyType_DYNAMIC && this.bodyCbWake(a);
                if (!b && !this.bphase.is_sweep && a.type != f.id_BodyType_STATIC)
                    for (c = a.shapes.head; null != c;) d = c.elt, null != d.node && this.bphase.sync(d), c = c.next
            } else this.wakeIsland(a.component.island)
        },
        wake_constraint: function(a, b) {
            null == b && (b = !1);
            return a.active && (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.component.sleeping) ? (null == a.component.island ? (a.component.sleeping = !1, this.live_constraints.inlined_add(a), a.wake_connected(), b || this.constraintCbWake(a)) : this.wakeIsland(a.component.island), !0) : !1
        },
        doForests: function(a) {
            for (var b = this.c_arbiters_false.head; null != b;) {
                var c = b.elt;
                if (!c.cleared && c.up_stamp == this.stamp && 0 != (c.immState & f.id_ImmState_ACCEPT) && c.b1.type == f.id_BodyType_DYNAMIC &&
                    c.b2.type == f.id_BodyType_DYNAMIC) {
                    var d;
                    if (c.b1.component == c.b1.component.parent) d = c.b1.component;
                    else {
                        d = c.b1.component;
                        for (var e = null; d != d.parent;) {
                            var g = d.parent;
                            d.parent = e;
                            e = d;
                            d = g
                        }
                        for (; null != e;) g = e.parent, e.parent = d, e = g
                    } if (c.b2.component == c.b2.component.parent) c = c.b2.component;
                    else {
                        c = c.b2.component;
                        for (e = null; c != c.parent;) g = c.parent, c.parent = e, e = c, c = g;
                        for (; null != e;) g = e.parent, e.parent = c, e = g
                    }
                    d != c && (d.rank < c.rank ? d.parent = c : d.rank > c.rank ? c.parent = d : (c.parent = d, d.rank++))
                }
                b = b.next
            }
            for (b = this.f_arbiters.head; null !=
                b;) {
                c = b.elt;
                if (!c.cleared && c.up_stamp == this.stamp && 0 != (c.immState & f.id_ImmState_ACCEPT) && c.b1.type == f.id_BodyType_DYNAMIC && c.b2.type == f.id_BodyType_DYNAMIC) {
                    if (c.b1.component == c.b1.component.parent) d = c.b1.component;
                    else {
                        d = c.b1.component;
                        for (e = null; d != d.parent;) g = d.parent, d.parent = e, e = d, d = g;
                        for (; null != e;) g = e.parent, e.parent = d, e = g
                    } if (c.b2.component == c.b2.component.parent) c = c.b2.component;
                    else {
                        c = c.b2.component;
                        for (e = null; c != c.parent;) g = c.parent, c.parent = e, e = c, c = g;
                        for (; null != e;) g = e.parent, e.parent = c,
                            e = g
                    }
                    d != c && (d.rank < c.rank ? d.parent = c : d.rank > c.rank ? c.parent = d : (c.parent = d, d.rank++))
                }
                b = b.next
            }
            for (b = this.live_constraints.head; null != b;) b.elt.forest(), b = b.next;
            for (; null != this.live.head;) {
                d = this.live.inlined_pop_unsafe();
                b = d.component;
                if (b == b.parent) c = b;
                else {
                    c = b;
                    for (e = null; c != c.parent;) g = c.parent, c.parent = e, e = c, c = g;
                    for (; null != e;) g = e.parent, e.parent = c, e = g
                }
                null == c.island && (null == va.zpp_pool ? c.island = new va : (c.island = va.zpp_pool, va.zpp_pool = c.island.next, c.island.next = null), c.island.waket = 0, this.islands.inlined_add(c.island),
                    c.island.sleep = !0);
                b.island = c.island;
                b.island.comps.inlined_add(b);
                d = d.atRest(a);
                b.island.sleep = b.island.sleep && d;
                b.waket > b.island.waket && (b.island.waket = b.waket)
            }
            for (; null != this.live_constraints.head;) {
                a = this.live_constraints.inlined_pop_unsafe().component;
                if (a == a.parent) b = a;
                else {
                    b = a;
                    for (d = null; b != b.parent;) c = b.parent, b.parent = d, d = b, b = c;
                    for (; null != d;) c = d.parent, d.parent = b, d = c
                }
                a.island = b.island;
                a.island.comps.inlined_add(a);
                a.waket > a.island.waket && (a.island.waket = a.waket)
            }
            for (; null != this.islands.next;)
                if (a =
                    this.islands.inlined_pop_unsafe(), a.sleep)
                    for (a = a.comps.head; null != a;) {
                        d = a.elt;
                        if (d.isBody) {
                            b = d.body;
                            b.velx = 0;
                            b.vely = 0;
                            b.angvel = 0;
                            d.sleeping = !0;
                            for (d = b.shapes.head; null != d;) this.bphase.sync(d.elt), d = d.next;
                            this.bodyCbSleep(b)
                        } else this.constraintCbSleep(d.constraint), d.sleeping = !0;
                        a = a.next
                    } else {
                        for (; null != a.comps.head;) b = a.comps.inlined_pop_unsafe(), b.waket = a.waket, b.isBody ? this.live.inlined_add(b.body) : this.live_constraints.inlined_add(b.constraint), b.sleeping = !1, b.island = null, b.parent = b, b.rank =
                            0;
                        a.next = va.zpp_pool;
                        va.zpp_pool = a
                    }
        },
        sleepArbiters: function() {
            var a = null,
                b = this.c_arbiters_true,
                c = b.head,
                d = null != this.c_arbiters_false;
            d && null == c && (d = !1, c = this.c_arbiters_false.head, b = this.c_arbiters_false, a = null);
            for (; null != c;) {
                var e = c.elt;
                e.b1.component.sleeping && e.b2.component.sleeping ? (e.sleep_stamp = this.stamp, e.sleeping = !0, c = b.inlined_erase(a)) : (a = c, c = c.next);
                d && null == c && (d = !1, c = this.c_arbiters_false.head, b = this.c_arbiters_false, a = null)
            }
            a = null;
            b = this.f_arbiters;
            c = b.head;
            d = !1;
            for (; null != c;) e =
                c.elt, e.b1.component.sleeping && e.b2.component.sleeping ? (e.sleep_stamp = this.stamp, e.sleeping = !0, c = b.inlined_erase(a)) : (a = c, c = c.next), d && null == c && (d = !1, c = null.begin(), a = b = null);
            a = null;
            b = this.s_arbiters;
            c = b.head;
            d = !1;
            for (; null != c;) e = c.elt, e.b1.component.sleeping && e.b2.component.sleeping ? (e.sleep_stamp = this.stamp, e.sleeping = !0, c = b.inlined_erase(a)) : (a = c, c = c.next), d && null == c && (d = !1, c = null.begin(), a = b = null)
        },
        static_validation: function(a) {
            null != a.shapes.head && a.validate_aabb();
            a.validate_mass();
            a.validate_inertia();
            for (var b = a.shapes.head; null != b;) {
                var c = b.elt;
                c.type == f.id_ShapeType_POLYGON && (c.polygon.splice_collinear(), c.polygon.validate_gaxi());
                b = b.next
            }
            a.sweepFrozen = !0
        },
        validation: function() {
            this.cbsets.validate();
            for (var a = this.live.head; null != a;) {
                var b = a.elt;
                b.sweepRadius = 0;
                for (var c = b.shapes.head; null != c;) {
                    var d = c.elt;
                    d.type == f.id_ShapeType_POLYGON && (d.polygon.splice_collinear(), d.polygon.validate_gaxi());
                    d.validate_sweepRadius();
                    d.sweepRadius > b.sweepRadius && (b.sweepRadius = d.sweepRadius);
                    c = c.next
                }
                b.validate_mass();
                b.validate_inertia();
                null != b.shapes.head && (b.validate_aabb(), b.validate_worldCOM());
                b.validate_gravMass();
                b.zip_axis && (b.zip_axis = !1, b.axisx = Math.sin(b.rot), b.axisy = Math.cos(b.rot), null);
                if (b.component.woken && null != b.cbSet)
                    for (c = b.cbSet.bodylisteners.head; null != c;) d = c.elt, d.event == f.id_CbEvent_WAKE && (d = this.push_callback(d), d.event = f.id_CbEvent_WAKE, d.body = b), c = c.next;
                b.component.woken = !1;
                for (b = b.shapes.head; null != b;) this.bphase.sync(b.elt), b = b.next;
                a = a.next
            }
            for (a = this.kinematics.head; null != a;) {
                b =
                    a.elt;
                b.sweepRadius = 0;
                for (c = b.shapes.head; null != c;) d = c.elt, d.type == f.id_ShapeType_POLYGON && (d.polygon.splice_collinear(), d.polygon.validate_gaxi()), d.validate_sweepRadius(), d.sweepRadius > b.sweepRadius && (b.sweepRadius = d.sweepRadius), c = c.next;
                b.validate_mass();
                b.validate_inertia();
                null != b.shapes.head && (b.validate_aabb(), b.validate_worldCOM());
                b.validate_gravMass();
                b.zip_axis && (b.zip_axis = !1, b.axisx = Math.sin(b.rot), b.axisy = Math.cos(b.rot), null);
                for (b = b.shapes.head; null != b;) this.bphase.sync(b.elt), b =
                    b.next;
                a = a.next
            }
            for (a = this.live_constraints.head; null != a;) {
                b = a.elt;
                if (b.active) {
                    if (b.component.woken && null != b.cbSet)
                        for (c = b.cbSet.conlisteners.head; null != c;) d = c.elt, d.event == f.id_CbEvent_WAKE && (d = this.push_callback(d), d.event = f.id_CbEvent_WAKE, d.constraint = b), c = c.next;
                    b.component.woken = !1
                }
                a = a.next
            }
        },
        updateVel: function(a) {
            for (var b = 1 - a * this.global_lin_drag, c = 1 - a * this.global_ang_drag, d = this.live.head; null != d;) {
                var e = d.elt;
                if (0 != e.smass) {
                    var f = a * e.imass;
                    e.velx = b * e.velx + (e.forcex + this.gravityx * e.gravMass) *
                        f;
                    e.vely = b * e.vely + (e.forcey + this.gravityy * e.gravMass) * f
                }
                if (0 != e.sinertia) {
                    var g = f = 0,
                        f = e.worldCOMx - e.posx,
                        g = e.worldCOMy - e.posy;
                    e.angvel = c * e.angvel + (e.torque + (this.gravityy * f - this.gravityx * g) * e.gravMass) * a * e.iinertia
                }
                d = d.next
            }
        },
        updatePos: function(a) {
            for (var b = 2 * Math.PI / a, c = this.live.head; null != c;) {
                var d = c.elt;
                d.pre_posx = d.posx;
                d.pre_posy = d.posy;
                d.pre_rot = d.rot;
                d.sweepTime = 0;
                d.sweep_angvel = d.angvel % b;
                d.sweepIntegrate(a);
                if (d.disableCCD) d.sweepFrozen = !0, d.bullet = !1;
                else {
                    var e = l.staticCCDLinearThreshold *
                        d.sweepRadius,
                        g = l.staticCCDAngularThreshold;
                    if ((d.velx * d.velx + d.vely * d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > g * g || d.type == f.id_BodyType_KINEMATIC) {
                        e = d.sweep_angvel;
                        0 > e && (e = -e);
                        for (var g = 1 / e, n = d.shapes.head; null != n;) {
                            var i = n.elt,
                                j = i.aabb,
                                m = j.minx,
                                k = j.miny,
                                p = j.maxx,
                                o = j.maxy,
                                q = 0.008333333333333333 * e * a * i.sweepCoef | 0;
                            8 < q && (q = 8);
                            var s = e * a / q;
                            d.sweepIntegrate(a);
                            i.type == f.id_ShapeType_CIRCLE ? i.circle._force_validate_aabb() : i.polygon._force_validate_aabb();
                            m < j.minx ? j.minx = m : m = j.minx;
                            k < j.miny ? j.miny = k : k = j.miny;
                            p > j.maxx ? j.maxx = p : p = j.maxx;
                            o > j.maxy ? j.maxy = o : o = j.maxy;
                            for (var u = 1; u < q;) {
                                var v = u++;
                                d.sweepIntegrate(s * v * g);
                                i.type == f.id_ShapeType_CIRCLE ? i.circle._force_validate_aabb() : i.polygon._force_validate_aabb();
                                m < j.minx ? j.minx = m : m = j.minx;
                                k < j.miny ? j.miny = k : k = j.miny;
                                p > j.maxx ? j.maxx = p : p = j.maxx;
                                o > j.maxy ? j.maxy = o : o = j.maxy
                            }
                            this.bphase.sync(i);
                            n = n.next
                        }
                        d.sweepFrozen = !1;
                        if (d.type == f.id_BodyType_DYNAMIC && d.bulletEnabled && (e = l.bulletCCDLinearThreshold * d.sweepRadius, g = l.bulletCCDAngularThreshold, (d.velx * d.velx + d.vely *
                            d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > g * g)) d.bullet = !0
                    } else d.sweepFrozen = !0, d.bullet = !1
                }
                c = c.next
            }
            for (c = this.kinematics.head; null != c;) {
                d = c.elt;
                d.pre_posx = d.posx;
                d.pre_posy = d.posy;
                d.pre_rot = d.rot;
                d.sweepTime = 0;
                d.sweep_angvel = d.angvel % b;
                d.sweepIntegrate(a);
                if (d.disableCCD) d.sweepFrozen = !0, d.bullet = !1;
                else if (e = l.staticCCDLinearThreshold * d.sweepRadius, g = l.staticCCDAngularThreshold, (d.velx * d.velx + d.vely * d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > g * g || d.type == f.id_BodyType_KINEMATIC) {
                    e = d.sweep_angvel;
                    0 > e &&
                        (e = -e);
                    g = 1 / e;
                    for (n = d.shapes.head; null != n;) {
                        i = n.elt;
                        j = i.aabb;
                        m = j.minx;
                        k = j.miny;
                        p = j.maxx;
                        o = j.maxy;
                        q = 0.008333333333333333 * e * a * i.sweepCoef | 0;
                        8 < q && (q = 8);
                        s = e * a / q;
                        d.sweepIntegrate(a);
                        i.type == f.id_ShapeType_CIRCLE ? i.circle._force_validate_aabb() : i.polygon._force_validate_aabb();
                        m < j.minx ? j.minx = m : m = j.minx;
                        k < j.miny ? j.miny = k : k = j.miny;
                        p > j.maxx ? j.maxx = p : p = j.maxx;
                        o > j.maxy ? j.maxy = o : o = j.maxy;
                        for (u = 1; u < q;) v = u++, d.sweepIntegrate(s * v * g), i.type == f.id_ShapeType_CIRCLE ? i.circle._force_validate_aabb() : i.polygon._force_validate_aabb(),
                            m < j.minx ? j.minx = m : m = j.minx, k < j.miny ? j.miny = k : k = j.miny, p > j.maxx ? j.maxx = p : p = j.maxx, o > j.maxy ? j.maxy = o : o = j.maxy;
                        this.bphase.sync(i);
                        n = n.next
                    }
                    d.sweepFrozen = !1;
                    if (d.type == f.id_BodyType_DYNAMIC && d.bulletEnabled && (e = l.bulletCCDLinearThreshold * d.sweepRadius, g = l.bulletCCDAngularThreshold, (d.velx * d.velx + d.vely * d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > g * g)) d.bullet = !0
                } else d.sweepFrozen = !0, d.bullet = !1;
                c = c.next
            }
        },
        presteparb: function(a, b, c) {
            null == c && (c = !1);
            var d = this;
            if (!a.cleared && a.b1.component.sleeping && a.b2.component.sleeping) return a.sleep_stamp =
                this.stamp, a.sleeping = !0;
            if (!a.cleared || 0 != a.present || a.intchange) {
                var e = !c && a.up_stamp == this.stamp - 1 && !a.cleared && !a.intchange,
                    c = a.fresh && !a.cleared && !a.intchange;
                e && (a.endGenerated = this.stamp);
                if (c || e || a.cleared || a.intchange) {
                    this.inlined_MRCA_chains(a.ws1, a.ws2);
                    for (e = this.mrca1.head; null != e;) {
                        for (var g = e.elt, n = this.mrca2.head; null != n;) {
                            var i = n.elt,
                                j = g.cbSet,
                                m = i.cbSet;
                            if (!j.manager.pair(j, m).empty_intersection()) {
                                var k = [ea.get(g, i)];
                                if (c || a.intchange) {
                                    null == k[0] && (k[0] = jb.get(g, i), this.add_callbackset(k[0]));
                                    j.manager.pair(j, m).forall(f.id_CbEvent_BEGIN, function(b) {
                                        return function(c) {
                                            if (0 != (c.itype & a.type) && b[0].empty_arb(c.itype)) {
                                                var e = d.push_callback(c);
                                                e.event = f.id_CbEvent_BEGIN;
                                                ea.int_callback(b[0], c, e);
                                                e.set = b[0]
                                            }
                                        }
                                    }(k));
                                    if (i = !k[0].arbiters.inlined_has(a)) k[0].arbiters.inlined_add(a), i = !0;
                                    i && a.present++
                                } else a.present--, k[0].remove_arb(a), j.manager.pair(j, m).forall(f.id_CbEvent_END, function(b) {
                                    return function(c) {
                                        if (0 != (c.itype & a.type) && b[0].empty_arb(c.itype)) {
                                            var e = d.push_callback(c);
                                            e.event = f.id_CbEvent_END;
                                            ea.int_callback(b[0], c, e);
                                            e.set = b[0]
                                        }
                                    }
                                }(k)), null == k[0].arbiters.head && this.remove_callbackset(k[0])
                            }
                            n = n.next
                        }
                        e = e.next
                    }
                }
                a.fresh = !1;
                a.intchange = !1
            }
            if (a.cleared || a.up_stamp + (a.type == O.COL ? l.arbiterExpirationDelay : 0) < this.stamp) return a.type == O.SENSOR ? a.sensorarb.retire() : a.type == O.FLUID ? a.fluidarb.retire() : a.colarb.retire(), !0;
            c = a.active;
            a.active = a.presentable = a.up_stamp == this.stamp;
            0 != (a.immState & f.id_ImmState_ACCEPT) ? a.active && a.type != O.SENSOR && (null != a.colarb ? a.colarb.preStep(b) && (a.active = !1) : a.fluidarb.preStep(this,
                b)) : null != a.colarb && a.colarb.cleanupContacts() && (a.active = !1);
            c != a.active && (a.b1.arbiters.modified = !0, a.b2.arbiters.modified = !0, this.c_arbiters_true.modified = this.c_arbiters_false.modified = !0, this.s_arbiters.modified = this.f_arbiters.modified = !0);
            return !1
        },
        prestep: function(a) {
            for (var b = null, c = this.live_constraints.head; null != c;) {
                var d = c.elt;
                d.preStep(a) ? (c = this.live_constraints.erase(b), d.broken(), this.constraintCbBreak(d), d.removeOnBreak ? (d.component.sleeping = !0, this.midstep = !1, null != d.compound ? d.compound.wrap_constraints.remove(d.outer) :
                    this.wrap_constraints.remove(d.outer), this.midstep = !0) : d.active = !1, d.clearcache()) : (b = c, c = c.next)
            }
            var b = null,
                c = this.c_arbiters_true,
                d = c.head,
                e = null != this.c_arbiters_false;
            e && null == d && (e = !1, d = this.c_arbiters_false.head, c = this.c_arbiters_false, b = null);
            for (; null != d;) this.presteparb(d.elt, a) ? d = c.inlined_erase(b) : (b = d, d = d.next), e && null == d && (e = !1, d = this.c_arbiters_false.head, c = this.c_arbiters_false, b = null);
            b = null;
            c = this.f_arbiters;
            d = c.head;
            e = !1;
            for (; null != d;) this.presteparb(d.elt, a) ? d = c.inlined_erase(b) :
                (b = d, d = d.next), e && null == d && (e = !1, d = null.begin(), b = c = null);
            b = null;
            c = this.s_arbiters;
            d = c.head;
            e = !1;
            for (; null != d;) this.presteparb(d.elt, a) ? d = c.inlined_erase(b) : (b = d, d = d.next), e && null == d && (e = !1, d = null.begin(), b = c = null)
        },
        warmStart: function() {
            for (var a = this.f_arbiters.head; null != a;) {
                var b = a.elt;
                b.active && 0 != (b.immState & f.id_ImmState_ACCEPT) && b.warmStart();
                a = a.next
            }
            a = this.c_arbiters_false.head;
            b = !0;
            null == a && (a = this.c_arbiters_true.head, b = !1);
            for (; null != a;) {
                var c = a.elt;
                c.active && 0 != (c.immState & f.id_ImmState_ACCEPT) &&
                    c.warmStart();
                a = a.next;
                b && null == a && (a = this.c_arbiters_true.head, b = !1)
            }
            for (a = this.live_constraints.head; null != a;) a.elt.warmStart(), a = a.next
        },
        iterateVel: function(a) {
            for (var b = 0; b < a;) {
                b++;
                for (var c = this.f_arbiters.head; null != c;) {
                    var d = c.elt;
                    d.active && 0 != (d.immState & f.id_ImmState_ACCEPT) && d.applyImpulseVel();
                    c = c.next
                }
                c = null;
                for (d = this.live_constraints.head; null != d;) {
                    var e = d.elt;
                    e.applyImpulseVel() ? (d = this.live_constraints.erase(c), e.broken(), this.constraintCbBreak(e), e.removeOnBreak ? (e.component.sleeping = !0, this.midstep = !1, null != e.compound ? e.compound.wrap_constraints.remove(e.outer) : this.wrap_constraints.remove(e.outer), this.midstep = !0) : e.active = !1, e.clearcache()) : (c = d, d = d.next)
                }
                c = this.c_arbiters_false.head;
                d = !0;
                null == c && (c = this.c_arbiters_true.head, d = !1);
                for (; null != c;) e = c.elt, e.active && 0 != (e.immState & f.id_ImmState_ACCEPT) && e.applyImpulseVel(), c = c.next, d && null == c && (c = this.c_arbiters_true.head, d = !1)
            }
        },
        iteratePos: function(a) {
            for (var b = 0; b < a;) {
                b++;
                for (var c = null, d = this.live_constraints.head; null != d;) {
                    var e =
                        d.elt;
                    !e.__velocity && e.stiff && e.applyImpulsePos() ? (d = this.live_constraints.erase(c), e.broken(), this.constraintCbBreak(e), e.removeOnBreak ? (e.component.sleeping = !0, this.midstep = !1, null != e.compound ? e.compound.wrap_constraints.remove(e.outer) : this.wrap_constraints.remove(e.outer), this.midstep = !0) : e.active = !1, e.clearcache()) : (c = d, d = d.next)
                }
                c = this.c_arbiters_false.head;
                d = !0;
                null == c && (c = this.c_arbiters_true.head, d = !1);
                for (; null != c;) e = c.elt, e.active && 0 != (e.immState & f.id_ImmState_ACCEPT) && e.applyImpulsePos(),
                    c = c.next, d && null == c && (c = this.c_arbiters_true.head, d = !1)
            }
        },
        group_ignore: function(a, b) {
            var c = a.lookup_group();
            if (null == c) return !1;
            var d = b.lookup_group();
            if (null == d) return !1;
            for (var e = !1; null != c && null != d;) {
                if (c == d) {
                    e = c.ignore;
                    break
                }
                c.depth < d.depth ? d = d.group : c = c.group
            }
            return e
        },
        interactionType: function(a, b, c, d) {
            var e;
            e = !1;
            for (var f = c.constraints.head; null != f;) {
                var g = f.elt;
                if (g.ignore && g.pair_exists(c.id, d.id)) {
                    e = !0;
                    break
                }
                f = f.next
            }
            return !e && !this.group_ignore(a, b) ? (a.sensorEnabled || b.sensorEnabled) && a.filter.shouldSense(b.filter) ?
                2 : (a.fluidEnabled || b.fluidEnabled) && a.filter.shouldFlow(b.filter) && !(0 == c.imass && 0 == d.imass && 0 == c.iinertia && 0 == d.iinertia) ? 0 : a.filter.shouldCollide(b.filter) && !(0 == c.imass && 0 == d.imass && 0 == c.iinertia && 0 == d.iinertia) ? 1 : -1 : -1
        },
        narrowPhase: function(a, b, c, d, e) {
            var g = this,
                l = null,
                i = a.body,
                j = b.body,
                m = this.interactionType(a, b, i, j);
            if (-1 != m) {
                var k, p;
                a.type > b.type ? (k = b, p = a) : a.type == b.type ? a.id < b.id ? (k = a, p = b) : (p = a, k = b) : (k = a, p = b);
                var q = k == b;
                if (0 == m) {
                    var s;
                    if (null == d) {
                        for (var u = null, v = (i.arbiters.length < j.arbiters.length ?
                            i : j).arbiters.head; null != v;) {
                            var w = v.elt;
                            if (w.id == k.id && w.di == p.id) {
                                u = w;
                                break
                            }
                            v = v.next
                        }
                        s = u
                    } else s = d;
                    var z = null == s,
                        t, A = !1;
                    z ? (null == $a.zpp_pool ? t = new $a : (t = $a.zpp_pool, $a.zpp_pool = t.next, t.next = null), null) : null == s.fluidarb ? (s.cleared = !0, s.b1.arbiters.inlined_try_remove(s), s.b2.arbiters.inlined_try_remove(s), null != s.pair && (s.pair.arb = null, s.pair = null), s.active = !1, this.f_arbiters.modified = !0, null == $a.zpp_pool ? t = new $a : (t = $a.zpp_pool, $a.zpp_pool = t.next, t.next = null), null, A = z = t.intchange = !0) : t = s.fluidarb;
                    var F = f.id_InteractionType_FLUID;
                    if (z || t.stamp != this.stamp || e)
                        if (t.stamp = this.stamp, o.flowCollide(k, p, t)) {
                            z ? (t.b1 = a.body, t.ws1 = a, t.b2 = b.body, t.ws2 = b, t.id = k.id, t.di = p.id, t.b1.arbiters.inlined_add(t), t.b2.arbiters.inlined_add(t), t.active = !0, t.present = 0, t.cleared = !1, t.sleeping = !1, t.fresh = !1, t.presentable = !1, t.nx = 0, t.ny = 1, t.dampx = 0, t.dampy = 0, t.adamp = 0, this.f_arbiters.inlined_add(t), t.fresh = !A) : t.fresh = t.up_stamp < this.stamp - 1 || t.endGenerated == this.stamp && e;
                            t.up_stamp = t.stamp;
                            if (t.fresh || 0 == (t.immState &
                                f.id_ImmState_ALWAYS)) {
                                t.immState = f.id_ImmState_ACCEPT;
                                var D = !1;
                                this.inlined_MRCA_chains(t.ws1.id > t.ws2.id ? t.ws2 : t.ws1, t.ws1.id > t.ws2.id ? t.ws1 : t.ws2);
                                for (var B = this.mrca1.head; null != B;) {
                                    for (var E = B.elt, G = this.mrca2.head; null != G;) {
                                        var H = G.elt,
                                            I = E.cbSet,
                                            J = H.cbSet;
                                        if (!I.manager.pair(I, J).empty_intersection()) {
                                            var C = null,
                                                K = null;
                                            this.prelisteners.inlined_clear();
                                            I.manager.pair(I, J).forall(f.id_CbEvent_PRE, function(a) {
                                                return function(b) {
                                                    0 != (b.itype & F) && (a[0] = g.prelisteners.inlined_insert(a[0], b), D = D || !b.pure)
                                                }
                                            }([null]));
                                            if (null != this.prelisteners.head)
                                                if (C = ea.get(E, H), null == C && (K = jb.get(E, H), this.add_callbackset(K)), null == C || (C.FLUIDstamp != this.stamp || e) && 0 == (C.FLUIDstate & f.id_ImmState_ALWAYS)) {
                                                    null != K && (C = K);
                                                    if (null != C)
                                                        for (var L = this.prelisteners.head; null != L;) L.elt.itype == f.id_InteractionType_ANY && (C.COLLISIONstamp = this.stamp, C.SENSORstamp = this.stamp), C.FLUIDstamp = this.stamp, L = L.next;
                                                    var P = t.active;
                                                    t.active = !0;
                                                    this.precb.zpp_inner.pre_arbiter = t;
                                                    this.precb.zpp_inner.set = C;
                                                    for (var O = this.prelisteners.head; null !=
                                                        O;) {
                                                        var S = O.elt;
                                                        this.precb.zpp_inner.listener = S;
                                                        ea.int_callback(C, S, this.precb.zpp_inner);
                                                        this.precb.zpp_inner.pre_swapped = E != this.precb.zpp_inner.int1;
                                                        var R = S.handlerp(this.precb);
                                                        if (null != R) {
                                                            var Z = t,
                                                                aa = R,
                                                                W;
                                                            null == f.PreFlag_ACCEPT && (f.internal = !0, f.PreFlag_ACCEPT = new Fa, f.internal = !1);
                                                            if (aa == f.PreFlag_ACCEPT) W = f.id_ImmState_ACCEPT | f.id_ImmState_ALWAYS;
                                                            else {
                                                                var X, ba = R;
                                                                null == f.PreFlag_ACCEPT_ONCE && (f.internal = !0, f.PreFlag_ACCEPT_ONCE = new Fa, f.internal = !1);
                                                                if (ba == f.PreFlag_ACCEPT_ONCE) X = f.id_ImmState_ACCEPT;
                                                                else {
                                                                    var ca = R;
                                                                    null == f.PreFlag_IGNORE && (f.internal = !0, f.PreFlag_IGNORE = new Fa, f.internal = !1);
                                                                    X = ca == f.PreFlag_IGNORE ? f.id_ImmState_IGNORE | f.id_ImmState_ALWAYS : f.id_ImmState_IGNORE
                                                                }
                                                                W = X
                                                            }
                                                            Z.immState = W
                                                        }
                                                        O = O.next
                                                    }
                                                    t.active = P;
                                                    if (null != C)
                                                        for (var V = this.prelisteners.head; null != V;) V.elt.itype == f.id_InteractionType_ANY && (C.COLLISIONstate = t.immState, C.SENSORstate = t.immState), C.FLUIDstate = t.immState, V = V.next
                                                } else null == C ? 0 == (t.immState & f.id_ImmState_ALWAYS) && (t.immState = f.id_ImmState_ACCEPT) : t.immState = C.FLUIDstate
                                        }
                                        G =
                                            G.next
                                    }
                                    B = B.next
                                }
                                if (D && 0 == (t.immState & f.id_ImmState_ALWAYS)) {
                                    if (t.b1.type == f.id_BodyType_DYNAMIC) {
                                        var T = t.b1;
                                        T.world || (T.component.waket = this.stamp + (this.midstep ? 0 : 1), T.type == f.id_BodyType_KINEMATIC && (T.kinematicDelaySleep = !0), T.component.sleeping && this.really_wake(T, !1))
                                    }
                                    if (t.b1.type == f.id_BodyType_DYNAMIC) {
                                        var U = t.b2;
                                        U.world || (U.component.waket = this.stamp + (this.midstep ? 0 : 1), U.type == f.id_BodyType_KINEMATIC && (U.kinematicDelaySleep = !0), U.component.sleeping && this.really_wake(U, !1))
                                    }
                                }
                            }
                            if (0 != (t.immState &
                                f.id_ImmState_ACCEPT)) {
                                if (t.b1.type == f.id_BodyType_DYNAMIC && t.b1.component.sleeping) {
                                    var Y = t.b1;
                                    Y.world || (Y.component.waket = this.stamp + (this.midstep ? 0 : 1), Y.type == f.id_BodyType_KINEMATIC && (Y.kinematicDelaySleep = !0), Y.component.sleeping && this.really_wake(Y, !1))
                                }
                                if (t.b2.type == f.id_BodyType_DYNAMIC && t.b2.component.sleeping) {
                                    var $ = t.b2;
                                    $.world || ($.component.waket = this.stamp + (this.midstep ? 0 : 1), $.type == f.id_BodyType_KINEMATIC && ($.kinematicDelaySleep = !0), $.component.sleeping && this.really_wake($, !1))
                                }
                            }
                            t.sleeping &&
                                (t.sleeping = !1, this.f_arbiters.inlined_add(t));
                            l = t
                        } else if (z) {
                        var ia = t;
                        ia.next = $a.zpp_pool;
                        $a.zpp_pool = ia;
                        l = null
                    } else l = t;
                    else l = t
                } else if (1 == m) {
                    var ga;
                    ga = c ? this.c_arbiters_true : this.c_arbiters_false;
                    var Q;
                    if (null == d) {
                        for (var na = null, ja = (i.arbiters.length < j.arbiters.length ? i : j).arbiters.head; null != ja;) {
                            var ka = ja.elt;
                            if (ka.id == k.id && ka.di == p.id) {
                                na = ka;
                                break
                            }
                            ja = ja.next
                        }
                        Q = na
                    } else Q = d;
                    var ha = null == Q,
                        r, ra = !1;
                    ha ? (null == kb.zpp_pool ? r = new kb : (r = kb.zpp_pool, kb.zpp_pool = r.next, r.next = null), null, r.stat = c) : null ==
                        Q.colarb ? (Q.cleared = !0, Q.b1.arbiters.inlined_try_remove(Q), Q.b2.arbiters.inlined_try_remove(Q), null != Q.pair && (Q.pair.arb = null, Q.pair = null), Q.active = !1, this.f_arbiters.modified = !0, null == kb.zpp_pool ? r = new kb : (r = kb.zpp_pool, kb.zpp_pool = r.next, r.next = null), null, r.intchange = !0, r.stat = c, ra = ha = !0) : (r = Q.colarb, q = k != r.s1, r.stat != c && (r.stat = c, r.sleeping || ((c ? this.c_arbiters_false : this.c_arbiters_true).remove(r), ga.add(r))));
                    var wa = f.id_InteractionType_COLLISION;
                    if (ha || r.stamp != this.stamp || e)
                        if (r.stamp = this.stamp,
                            o.contactCollide(k, p, r, q)) {
                            ha ? (r.b1 = a.body, r.ws1 = a, r.b2 = b.body, r.ws2 = b, r.id = k.id, r.di = p.id, r.b1.arbiters.inlined_add(r), r.b2.arbiters.inlined_add(r), r.active = !0, r.present = 0, r.cleared = !1, r.sleeping = !1, r.fresh = !1, r.presentable = !1, r.s1 = a, r.s2 = b, r.userdef_restitution || (r.restitution = r.s1.material.elasticity <= Math.NEGATIVE_INFINITY || r.s2.material.elasticity <= Math.NEGATIVE_INFINITY ? 0 : r.s1.material.elasticity >= Math.POSITIVE_INFINITY || r.s2.material.elasticity >= Math.POSITIVE_INFINITY ? 1 : (r.s1.material.elasticity +
                                r.s2.material.elasticity) / 2, 0 > r.restitution && (r.restitution = 0), 1 < r.restitution && (r.restitution = 1)), r.userdef_dyn_fric || (r.dyn_fric = Math.sqrt(r.s1.material.dynamicFriction * r.s2.material.dynamicFriction)), r.userdef_stat_fric || (r.stat_fric = Math.sqrt(r.s1.material.staticFriction * r.s2.material.staticFriction)), r.userdef_rfric || (r.rfric = Math.sqrt(r.s1.material.rollingFriction * r.s2.material.rollingFriction)), ga.inlined_add(r), r.fresh = !ra) : r.fresh = r.up_stamp < this.stamp - 1 || r.endGenerated == this.stamp && e;
                            r.up_stamp =
                                r.stamp;
                            if (r.fresh || 0 == (r.immState & f.id_ImmState_ALWAYS)) {
                                r.immState = f.id_ImmState_ACCEPT;
                                var pa = !1;
                                this.inlined_MRCA_chains(r.ws1.id > r.ws2.id ? r.ws2 : r.ws1, r.ws1.id > r.ws2.id ? r.ws1 : r.ws2);
                                for (var la = this.mrca1.head; null != la;) {
                                    for (var ua = la.elt, ma = this.mrca2.head; null != ma;) {
                                        var qa = ma.elt,
                                            oa = ua.cbSet,
                                            za = qa.cbSet;
                                        if (!oa.manager.pair(oa, za).empty_intersection()) {
                                            var N = null,
                                                ta = null;
                                            this.prelisteners.inlined_clear();
                                            oa.manager.pair(oa, za).forall(f.id_CbEvent_PRE, function(a) {
                                                return function(b) {
                                                    0 != (b.itype &
                                                        wa) && (a[0] = g.prelisteners.inlined_insert(a[0], b), pa = pa || !b.pure)
                                                }
                                            }([null]));
                                            if (null != this.prelisteners.head)
                                                if (N = ea.get(ua, qa), null == N && (ta = jb.get(ua, qa), this.add_callbackset(ta)), null == N || (N.COLLISIONstamp != this.stamp || e) && 0 == (N.COLLISIONstate & f.id_ImmState_ALWAYS)) {
                                                    null != ta && (N = ta);
                                                    if (null != N)
                                                        for (var va = this.prelisteners.head; null != va;) va.elt.itype == f.id_InteractionType_ANY ? (N.COLLISIONstamp = this.stamp, N.SENSORstamp = this.stamp, N.FLUIDstamp = this.stamp) : N.COLLISIONstamp = this.stamp, va = va.next;
                                                    var Ia =
                                                        r.active;
                                                    r.active = !0;
                                                    r.cleanupContacts();
                                                    this.precb.zpp_inner.pre_arbiter = r;
                                                    this.precb.zpp_inner.set = N;
                                                    for (var xa = this.prelisteners.head; null != xa;) {
                                                        var Ca = xa.elt;
                                                        this.precb.zpp_inner.listener = Ca;
                                                        ea.int_callback(N, Ca, this.precb.zpp_inner);
                                                        this.precb.zpp_inner.pre_swapped = ua != this.precb.zpp_inner.int1;
                                                        var ya = Ca.handlerp(this.precb);
                                                        if (null != ya) {
                                                            var Ka = r,
                                                                Ga, Na = ya;
                                                            null == f.PreFlag_ACCEPT && (f.internal = !0, f.PreFlag_ACCEPT = new Fa, f.internal = !1);
                                                            if (Na == f.PreFlag_ACCEPT) Ga = f.id_ImmState_ACCEPT | f.id_ImmState_ALWAYS;
                                                            else {
                                                                var La, Ta = ya;
                                                                null == f.PreFlag_ACCEPT_ONCE && (f.internal = !0, f.PreFlag_ACCEPT_ONCE = new Fa, f.internal = !1);
                                                                if (Ta == f.PreFlag_ACCEPT_ONCE) La = f.id_ImmState_ACCEPT;
                                                                else {
                                                                    var Xa = ya;
                                                                    null == f.PreFlag_IGNORE && (f.internal = !0, f.PreFlag_IGNORE = new Fa, f.internal = !1);
                                                                    La = Xa == f.PreFlag_IGNORE ? f.id_ImmState_IGNORE | f.id_ImmState_ALWAYS : f.id_ImmState_IGNORE
                                                                }
                                                                Ga = La
                                                            }
                                                            Ka.immState = Ga
                                                        }
                                                        xa = xa.next
                                                    }
                                                    r.active = Ia;
                                                    if (null != N)
                                                        for (var Ha = this.prelisteners.head; null != Ha;) Ha.elt.itype == f.id_InteractionType_ANY ? (N.COLLISIONstate = r.immState,
                                                            N.SENSORstate = r.immState, N.FLUIDstate = r.immState) : N.COLLISIONstate = r.immState, Ha = Ha.next
                                                } else null == N ? 0 == (r.immState & f.id_ImmState_ALWAYS) && (r.immState = f.id_ImmState_ACCEPT) : r.immState = N.COLLISIONstate
                                        }
                                        ma = ma.next
                                    }
                                    la = la.next
                                }
                                if (pa && 0 == (r.immState & f.id_ImmState_ALWAYS)) {
                                    if (r.b1.type == f.id_BodyType_DYNAMIC) {
                                        var Aa = r.b1;
                                        Aa.world || (Aa.component.waket = this.stamp + (this.midstep ? 0 : 1), Aa.type == f.id_BodyType_KINEMATIC && (Aa.kinematicDelaySleep = !0), Aa.component.sleeping && this.really_wake(Aa, !1))
                                    }
                                    if (r.b1.type ==
                                        f.id_BodyType_DYNAMIC) {
                                        var Ba = r.b2;
                                        Ba.world || (Ba.component.waket = this.stamp + (this.midstep ? 0 : 1), Ba.type == f.id_BodyType_KINEMATIC && (Ba.kinematicDelaySleep = !0), Ba.component.sleeping && this.really_wake(Ba, !1))
                                    }
                                }
                            }
                            if (0 != (r.immState & f.id_ImmState_ACCEPT)) {
                                if (r.b1.type == f.id_BodyType_DYNAMIC && r.b1.component.sleeping) {
                                    var Da = r.b1;
                                    Da.world || (Da.component.waket = this.stamp + (this.midstep ? 0 : 1), Da.type == f.id_BodyType_KINEMATIC && (Da.kinematicDelaySleep = !0), Da.component.sleeping && this.really_wake(Da, !1))
                                }
                                if (r.b2.type ==
                                    f.id_BodyType_DYNAMIC && r.b2.component.sleeping) {
                                    var Ea = r.b2;
                                    Ea.world || (Ea.component.waket = this.stamp + (this.midstep ? 0 : 1), Ea.type == f.id_BodyType_KINEMATIC && (Ea.kinematicDelaySleep = !0), Ea.component.sleeping && this.really_wake(Ea, !1))
                                }
                            }
                            r.sleeping && (r.sleeping = !1, ga.inlined_add(r));
                            l = r
                        } else if (ha) {
                        var sa = r;
                        sa.userdef_dyn_fric = !1;
                        sa.userdef_stat_fric = !1;
                        sa.userdef_restitution = !1;
                        sa.userdef_rfric = !1;
                        sa.__ref_edge1 = sa.__ref_edge2 = null;
                        sa.next = kb.zpp_pool;
                        kb.zpp_pool = sa;
                        l = null
                    } else l = r;
                    else l = r
                } else {
                    var fa;
                    if (null == d) {
                        for (var Va = null, Ma = (i.arbiters.length < j.arbiters.length ? i : j).arbiters.head; null != Ma;) {
                            var Ra = Ma.elt;
                            if (Ra.id == k.id && Ra.di == p.id) {
                                Va = Ra;
                                break
                            }
                            Ma = Ma.next
                        }
                        fa = Va
                    } else fa = d;
                    var Ja = null == fa,
                        y, bb = !1;
                    Ja ? (null == Za.zpp_pool ? y = new Za : (y = Za.zpp_pool, Za.zpp_pool = y.next, y.next = null), null) : null == fa.sensorarb ? (fa.cleared = !0, fa.b1.arbiters.inlined_try_remove(fa), fa.b2.arbiters.inlined_try_remove(fa), null != fa.pair && (fa.pair.arb = null, fa.pair = null), fa.active = !1, this.f_arbiters.modified = !0, null == Za.zpp_pool ?
                        y = new Za : (y = Za.zpp_pool, Za.zpp_pool = y.next, y.next = null), null, bb = Ja = y.intchange = !0) : y = fa.sensorarb;
                    var fb = f.id_InteractionType_SENSOR;
                    if (Ja || y.stamp != this.stamp || e)
                        if (y.stamp = this.stamp, o.testCollide(k, p)) {
                            Ja ? (y.b1 = a.body, y.ws1 = a, y.b2 = b.body, y.ws2 = b, y.id = k.id, y.di = p.id, y.b1.arbiters.inlined_add(y), y.b2.arbiters.inlined_add(y), y.active = !0, y.present = 0, y.cleared = !1, y.sleeping = !1, y.fresh = !1, y.presentable = !1, this.s_arbiters.inlined_add(y), y.fresh = !bb) : y.fresh = y.up_stamp < this.stamp - 1 || y.endGenerated == this.stamp &&
                                e;
                            y.up_stamp = y.stamp;
                            if (y.fresh || 0 == (y.immState & f.id_ImmState_ALWAYS)) {
                                y.immState = f.id_ImmState_ACCEPT;
                                var Ua = !1;
                                this.inlined_MRCA_chains(y.ws1.id > y.ws2.id ? y.ws2 : y.ws1, y.ws1.id > y.ws2.id ? y.ws1 : y.ws2);
                                for (var Pa = this.mrca1.head; null != Pa;) {
                                    for (var Qa = Pa.elt, Sa = this.mrca2.head; null != Sa;) {
                                        var db = Sa.elt,
                                            Wa = Qa.cbSet,
                                            ib = db.cbSet;
                                        if (!Wa.manager.pair(Wa, ib).empty_intersection()) {
                                            var ab = null,
                                                Ya = null;
                                            this.prelisteners.inlined_clear();
                                            Wa.manager.pair(Wa, ib).forall(f.id_CbEvent_PRE, function(a) {
                                                return function(b) {
                                                    0 !=
                                                        (b.itype & fb) && (a[0] = g.prelisteners.inlined_insert(a[0], b), Ua = Ua || !b.pure)
                                                }
                                            }([null]));
                                            if (null != this.prelisteners.head)
                                                if (ab = ea.get(Qa, db), null == ab && (Ya = jb.get(Qa, db), this.add_callbackset(Ya)), null == ab || (ab.SENSORstamp != this.stamp || e) && 0 == (ab.SENSORstate & f.id_ImmState_ALWAYS)) {
                                                    null != Ya && (ab = Ya);
                                                    if (null != ab)
                                                        for (var cb = this.prelisteners.head; null != cb;) cb.elt.itype == f.id_InteractionType_ANY ? (ab.COLLISIONstamp = this.stamp, ab.SENSORstamp = this.stamp, ab.FLUIDstamp = this.stamp) : ab.SENSORstamp = this.stamp, cb = cb.next;
                                                    var mb = y.active;
                                                    y.active = !0;
                                                    this.precb.zpp_inner.pre_arbiter = y;
                                                    this.precb.zpp_inner.set = ab;
                                                    for (var eb = this.prelisteners.head; null != eb;) {
                                                        var hb = eb.elt;
                                                        this.precb.zpp_inner.listener = hb;
                                                        ea.int_callback(ab, hb, this.precb.zpp_inner);
                                                        this.precb.zpp_inner.pre_swapped = Qa != this.precb.zpp_inner.int1;
                                                        var gb = hb.handlerp(this.precb);
                                                        if (null != gb) {
                                                            var ob = y,
                                                                sb = gb,
                                                                qb;
                                                            null == f.PreFlag_ACCEPT && (f.internal = !0, f.PreFlag_ACCEPT = new Fa, f.internal = !1);
                                                            if (sb == f.PreFlag_ACCEPT) qb = f.id_ImmState_ACCEPT | f.id_ImmState_ALWAYS;
                                                            else {
                                                                var ub =
                                                                    gb,
                                                                    rb;
                                                                null == f.PreFlag_ACCEPT_ONCE && (f.internal = !0, f.PreFlag_ACCEPT_ONCE = new Fa, f.internal = !1);
                                                                if (ub == f.PreFlag_ACCEPT_ONCE) rb = f.id_ImmState_ACCEPT;
                                                                else {
                                                                    var vb = gb;
                                                                    null == f.PreFlag_IGNORE && (f.internal = !0, f.PreFlag_IGNORE = new Fa, f.internal = !1);
                                                                    rb = vb == f.PreFlag_IGNORE ? f.id_ImmState_IGNORE | f.id_ImmState_ALWAYS : f.id_ImmState_IGNORE
                                                                }
                                                                qb = rb
                                                            }
                                                            ob.immState = qb
                                                        }
                                                        eb = eb.next
                                                    }
                                                    y.active = mb;
                                                    if (null != ab)
                                                        for (var pb = this.prelisteners.head; null != pb;) pb.elt.itype == f.id_InteractionType_ANY ? (ab.COLLISIONstate = y.immState, ab.SENSORstate =
                                                            y.immState, ab.FLUIDstate = y.immState) : ab.SENSORstate = y.immState, pb = pb.next
                                                } else null == ab ? 0 == (y.immState & f.id_ImmState_ALWAYS) && (y.immState = f.id_ImmState_ACCEPT) : y.immState = ab.SENSORstate
                                        }
                                        Sa = Sa.next
                                    }
                                    Pa = Pa.next
                                }
                                if (Ua && 0 == (y.immState & f.id_ImmState_ALWAYS)) {
                                    if (y.b1.type != f.id_BodyType_STATIC) {
                                        var Oa = y.b1;
                                        Oa.world || (Oa.component.waket = this.stamp + (this.midstep ? 0 : 1), Oa.type == f.id_BodyType_KINEMATIC && (Oa.kinematicDelaySleep = !0), Oa.component.sleeping && this.really_wake(Oa, !1))
                                    }
                                    if (y.b2.type != f.id_BodyType_STATIC) {
                                        var lb =
                                            y.b2;
                                        lb.world || (lb.component.waket = this.stamp + (this.midstep ? 0 : 1), lb.type == f.id_BodyType_KINEMATIC && (lb.kinematicDelaySleep = !0), lb.component.sleeping && this.really_wake(lb, !1))
                                    }
                                }
                            }
                            y.sleeping && (y.sleeping = !1, this.s_arbiters.inlined_add(y));
                            l = y
                        } else if (Ja) {
                        var tb = y;
                        tb.next = Za.zpp_pool;
                        Za.zpp_pool = tb;
                        l = null
                    } else l = y;
                    else l = y
                }
            }
            return l
        },
        MRCA_chains: function(a, b) {
            this.inlined_MRCA_chains(a, b)
        },
        inlined_MRCA_chains: function(a, b) {
            this.mrca1.inlined_clear();
            this.mrca2.inlined_clear();
            null != a.cbSet && this.mrca1.inlined_add(a);
            null != a.body.cbSet && this.mrca1.inlined_add(a.body);
            null != b.cbSet && this.mrca2.inlined_add(b);
            null != b.body.cbSet && this.mrca2.inlined_add(b.body);
            for (var c = a.body.compound, d = b.body.compound; c != d;)(null == c ? 0 : c.depth) < (null == d ? 0 : d.depth) ? (null != d.cbSet && this.mrca2.inlined_add(d), d = d.compound) : (null != c.cbSet && this.mrca1.inlined_add(c), c = c.compound)
        },
        __class__: Og
    };
    var pd = function() {
        this.next = this.prev = this.shape = this.aabb = null
    };
    g["zpp_nape.space.ZPP_SweepData"] = pd;
    pd.__name__ = ["zpp_nape", "space", "ZPP_SweepData"];
    pd.prototype = {
        __class__: pd
    };
    var Sf = function(a) {
        this.list = this.failed = null;
        nd.call(this);
        this.space = a;
        this.is_sweep = !0;
        this.sweep = this
    };
    g["zpp_nape.space.ZPP_SweepPhase"] = Sf;
    Sf.__name__ = ["zpp_nape", "space", "ZPP_SweepPhase"];
    Sf.__super__ = nd;
    Sf.prototype = m(nd.prototype, {
        __insert: function(a) {
            var b;
            null == pd.zpp_pool ? b = new pd : (b = pd.zpp_pool, pd.zpp_pool = b.next, b.next = null);
            null;
            a.sweep = b;
            b.shape = a;
            b.aabb = a.aabb;
            b.next = this.list;
            null != this.list && (this.list.prev = b);
            this.list = b
        },
        __remove: function(a) {
            var b =
                a.sweep;
            null == b.prev ? this.list = b.next : b.prev.next = b.next;
            null != b.next && (b.next.prev = b.prev);
            a.sweep = null;
            b.prev = null;
            b.shape = null;
            b.aabb = null;
            b.next = pd.zpp_pool;
            pd.zpp_pool = b
        },
        sync_broadphase: function() {
            this.space.validation();
            null != this.list && this.sync_broadphase_fast()
        },
        sync_broadphase_fast: function() {
            for (var a = this.list.next; null != a;) {
                var b = a.next,
                    c = a.prev;
                if (!(a.aabb.minx > c.aabb.minx)) {
                    for (; null != c.prev && c.prev.aabb.minx > a.aabb.minx;) c = c.prev;
                    var d = a.prev;
                    d.next = a.next;
                    null != a.next && (a.next.prev =
                        d);
                    null == c.prev ? (a.prev = null, this.list = a, a.next = c, c.prev = a) : (a.prev = c.prev, c.prev = a, a.prev.next = a, a.next = c)
                }
                a = b
            }
        },
        broadphase: function(a, b) {
            if (null != this.list) {
                this.sync_broadphase_fast();
                for (var c = this.list; null != c;) {
                    for (var d = c.next, e = c.shape, g = e.body, l = c.aabb.maxx; null != d && !(d.aabb.minx > l);) {
                        var i = d.shape,
                            j = i.body;
                        if (j != g && !(g.type == f.id_BodyType_STATIC && j.type == f.id_BodyType_STATIC) && (!g.component.sleeping || !j.component.sleeping)) e.aabb.intersectY(i.aabb) && (b ? a.narrowPhase(e, i, g.type != f.id_BodyType_DYNAMIC ||
                            j.type != f.id_BodyType_DYNAMIC, null, !1) : a.continuousEvent(e, i, g.type != f.id_BodyType_DYNAMIC || j.type != f.id_BodyType_DYNAMIC, null, !1));
                        d = d.next
                    }
                    c = c.next
                }
            }
        },
        clear: function() {
            for (; null != this.list;) this.list.shape.removedFromSpace(), this.__remove(this.list.shape)
        },
        bodiesUnderPoint: function(a, b, c, d) {
            this.sync_broadphase();
            for (var e = H.get(a, b, null), d = null == d ? new ub : d, g = this.list; null != g && g.aabb.minx > a;) g = g.next;
            for (; null != g && g.aabb.minx <= a;) {
                if (g.aabb.maxx >= a && g.aabb.miny <= b && g.aabb.maxy >= b) {
                    var l = g.shape,
                        i = l.body.outer;
                    if (!d.has(i) && (null == c || l.filter.shouldCollide(c))) l.type == f.id_ShapeType_CIRCLE ? o.circleContains(l.circle, e) && d.push(i) : o.polyContains(l.polygon, e) && d.push(i)
                }
                g = g.next
            }
            null != e.outer && (e.outer.zpp_inner = null, e.outer = null);
            e._isimmutable = null;
            e._validate = null;
            e._invalidate = null;
            e.next = H.zpp_pool;
            H.zpp_pool = e;
            return d
        },
        bodiesInCircle: function(a, b, c, d, e, f) {
            this.sync_broadphase();
            this.updateCircShape(a, b, c);
            a = this.circShape.zpp_inner.aabb;
            f = null == f ? new ub : f;
            null == this.failed && (this.failed =
                new ub);
            for (b = this.list; null != b && b.aabb.maxx < a.minx;) b = b.next;
            for (; null != b && b.aabb.minx <= a.maxx;) {
                if (b.aabb.intersect(a)) {
                    var g = b.shape,
                        c = g.body.outer;
                    if (null == e || g.filter.shouldCollide(e)) d ? this.failed.has(c) || (g = o.containTest(this.circShape.zpp_inner, g), !f.has(c) && g ? f.push(c) : g || (f.remove(c), this.failed.push(c))) : !f.has(c) && o.testCollide_safe(g, this.circShape.zpp_inner) && f.push(c)
                }
                b = b.next
            }
            this.failed.clear();
            return f
        },
        __class__: Sf
    });
    var Sg = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_CallbackSet"] = Sg;
    Sg.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_CallbackSet"];
    Sg.prototype = {
        inlined_add: function(a) {
            var b;
            null == $c.zpp_pool ? b = new $c : (b = $c.zpp_pool, $c.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null ==
                a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = $c.zpp_pool;
            $c.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Sg
    };
    var Sd = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Shape"] = Sd;
    Sd.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Shape"];
    Sd.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == pb.zpp_pool ? b = new pb : (b = pb.zpp_pool, pb.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            var c;
            null == pb.zpp_pool ? c = new pb : (c = pb.zpp_pool, pb.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b =
                null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = pb.zpp_pool;
            pb.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Sd
    };
    var od = function() {
        this.length = 0;
        this.modified =
            this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Body"] = od;
    od.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Body"];
    od.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == Aa.zpp_pool ? b = new Aa : (b = Aa.zpp_pool, Aa.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            var c;
            null == Aa.zpp_pool ? c = new Aa : (c = Aa.zpp_pool, Aa.zpp_pool =
                c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = Aa.zpp_pool;
            Aa.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        erase: function(a) {
            return this.inlined_erase(a)
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = Aa.zpp_pool;
            Aa.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        has: function(a) {
            return this.inlined_has(a)
        },
        inlined_has: function(a) {
            var b;
            b = !1;
            for (var c = this.head; null != c;) {
                if (c.elt == a) {
                    b = !0;
                    break
                }
                c = c.next
            }
            return b
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: od
    };
    var ue = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Compound"] = ue;
    ue.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Compound"];
    ue.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == qc.zpp_pool ? b = new qc : (b = qc.zpp_pool, qc.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = qc.zpp_pool;
            qc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = qc.zpp_pool;
            qc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: ue
    };
    var te = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Arbiter"] = te;
    te.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Arbiter"];
    te.prototype = {
        inlined_add: function(a) {
            var b;
            null == rc.zpp_pool ? b = new rc : (b = rc.zpp_pool, rc.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = rc.zpp_pool;
            rc.zpp_pool =
                a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        erase: function(a) {
            return this.inlined_erase(a)
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next,
                c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = rc.zpp_pool;
            rc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        clear: function() {
            for (; null != this.head;) this.inlined_pop();
            this.pushmod = !0
        },
        inlined_has: function(a) {
            var b;
            b = !1;
            for (var c = this.head; null != c;) {
                if (c.elt == a) {
                    b = !0;
                    break
                }
                c = c.next
            }
            return b
        },
        __class__: te
    };
    var Pg = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_CbSetPair"] = Pg;
    Pg.__name__ = ["zpp_nape", "util",
        "ZNPList_ZPP_CbSetPair"
    ];
    Pg.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == Pc.zpp_pool ? b = new Pc : (b = Pc.zpp_pool, Pc.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = Pc.zpp_pool;
            Pc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = Pc.zpp_pool;
            Pc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Pg
    };
    var Ug = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_AABBPair"] = Ug;
    Ug.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_AABBPair"];
    Ug.prototype = {
        inlined_add: function(a) {
            var b;
            null == Qc.zpp_pool ? b = new Qc : (b = Qc.zpp_pool, Qc.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head =
                a.next;
            a.elt = null;
            a.next = Qc.zpp_pool;
            Qc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c =
                b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = Qc.zpp_pool;
            Qc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Ug
    };
    var Vg = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Edge"] = Vg;
    Vg.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Edge"];
    Vg.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == lb.zpp_pool ? b = new lb :
                (b = lb.zpp_pool, lb.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            var c;
            null == lb.zpp_pool ? c = new lb : (c = lb.zpp_pool, lb.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head =
                a.next;
            a.elt = null;
            a.next = lb.zpp_pool;
            lb.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        erase: function(a) {
            return this.inlined_erase(a)
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = lb.zpp_pool;
            lb.zpp_pool =
                a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        reverse: function() {
            for (var a = this.head, b = null; null != a;) {
                var c = a.next;
                a.next = b;
                b = this.head = a;
                a = c
            }
            this.pushmod = this.modified = !0
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Vg
    };
    var Wd = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_AABBNode"] = Wd;
    Wd.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_AABBNode"];
    Wd.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == ad.zpp_pool ? b = new ad : (b = ad.zpp_pool, ad.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = ad.zpp_pool;
            ad.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        __class__: Wd
    };
    var Wg = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Component"] = Wg;
    Wg.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Component"];
    Wg.prototype = {
        inlined_add: function(a) {
            var b;
            null == qd.zpp_pool ? b = new qd : (b = qd.zpp_pool, qd.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = qd.zpp_pool;
            qd.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        __class__: Wg
    };
    var Nh = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_InteractionGroup"] = Nh;
    Nh.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_InteractionGroup"];
    Nh.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null !=
                b;) b = b.next;
            return b
        },
        __class__: Nh
    };
    var Tf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_ColArbiter"] = Tf;
    Tf.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_ColArbiter"];
    Tf.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == bc.zpp_pool ? b = new bc : (b = bc.zpp_pool, bc.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a =
                this.head;
            this.head = a.next;
            a.elt = null;
            a.next = bc.zpp_pool;
            bc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head,
                this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = bc.zpp_pool;
            bc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Tf
    };
    var Zg = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_FluidArbiter"] = Zg;
    Zg.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_FluidArbiter"];
    Zg.prototype = {
        inlined_add: function(a) {
            var b;
            null == cc.zpp_pool ? b = new cc : (b = cc.zpp_pool, cc.zpp_pool =
                b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = cc.zpp_pool;
            cc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next,
                null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = cc.zpp_pool;
            cc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Zg
    };
    var $g = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_SensorArbiter"] = $g;
    $g.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_SensorArbiter"];
    $g.prototype = {
        inlined_add: function(a) {
            var b;
            null == sc.zpp_pool ? b = new sc : (b = sc.zpp_pool, sc.zpp_pool = b.next,
                b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = sc.zpp_pool;
            sc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null ==
                this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = sc.zpp_pool;
            sc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: $g
    };
    var Uf = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_Listener"] = Uf;
    Uf.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_Listener"];
    Uf.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == Qa.zpp_pool ? b = new Qa : (b = Qa.zpp_pool,
                Qa.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        insert: function(a, b) {
            return this.inlined_insert(a, b)
        },
        inlined_insert: function(a, b) {
            var c;
            null == Qa.zpp_pool ? c = new Qa : (c = Qa.zpp_pool, Qa.zpp_pool = c.next, c.next = null);
            null;
            c.elt = b;
            null == a ? (c.next = this.head, this.head = c) : (c.next = a.next, a.next = c);
            this.pushmod = this.modified = !0;
            this.length++;
            return c
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt =
                null;
            a.next = Qa.zpp_pool;
            Qa.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        remove: function(a) {
            this.inlined_try_remove(a)
        },
        inlined_try_remove: function(a) {
            for (var b = null, c = this.head, d = !1; null != c;) {
                if (c.elt == a) {
                    this.inlined_erase(b);
                    d = !0;
                    break
                }
                b = c;
                c = c.next
            }
            return d
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null ==
                this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = Qa.zpp_pool;
            Qa.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Uf
    };
    var Yg = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_ToiEvent"] = Yg;
    Yg.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_ToiEvent"];
    Yg.prototype = {
        add: function(a) {
            return this.inlined_add(a)
        },
        inlined_add: function(a) {
            var b;
            null == dc.zpp_pool ? b = new dc : (b = dc.zpp_pool, dc.zpp_pool = b.next, b.next = null);
            null;
            b.elt = a;
            b.next = this.head;
            this.head = b;
            this.modified = !0;
            this.length++;
            return a
        },
        pop: function() {
            this.inlined_pop()
        },
        inlined_pop: function() {
            var a = this.head;
            this.head = a.next;
            a.elt = null;
            a.next = dc.zpp_pool;
            dc.zpp_pool = a;
            null == this.head && (this.pushmod = !0);
            this.modified = !0;
            this.length--
        },
        pop_unsafe: function() {
            return this.inlined_pop_unsafe()
        },
        inlined_pop_unsafe: function() {
            var a = this.head.elt;
            this.pop();
            return a
        },
        erase: function(a) {
            return this.inlined_erase(a)
        },
        inlined_erase: function(a) {
            var b, c;
            null == a ? (b = this.head, this.head = c = b.next, null == this.head && (this.pushmod = !0)) : (b = a.next, c = b.next, a.next = c, null == c && (this.pushmod = !0));
            a = b;
            a.elt = null;
            a.next = dc.zpp_pool;
            dc.zpp_pool = a;
            this.modified = !0;
            this.length--;
            this.pushmod = !0;
            return c
        },
        __class__: Yg
    };
    var Oh = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ConvexResult"] = Oh;
    Oh.__name__ = ["zpp_nape", "util", "ZNPList_ConvexResult"];
    Oh.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Oh
    };
    var Ph = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_ZPP_GeomPoly"] = Ph;
    Ph.__name__ = ["zpp_nape", "util", "ZNPList_ZPP_GeomPoly"];
    Ph.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Ph
    };
    var Qh = function() {
        this.length = 0;
        this.modified = this.pushmod = !1;
        this.head = null
    };
    g["zpp_nape.util.ZNPList_RayResult"] =
        Qh;
    Qh.__name__ = ["zpp_nape", "util", "ZNPList_RayResult"];
    Qh.prototype = {
        iterator_at: function(a) {
            for (var b = this.head; 0 < a-- && null != b;) b = b.next;
            return b
        },
        __class__: Qh
    };
    var rb = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_CbType"] = rb;
    rb.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_CbType"];
    rb.prototype = {
        __class__: rb
    };
    var $c = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_CallbackSet"] = $c;
    $c.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_CallbackSet"];
    $c.prototype = {
        __class__: $c
    };
    var pb = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Shape"] = pb;
    pb.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Shape"];
    pb.prototype = {
        __class__: pb
    };
    var Aa = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Body"] = Aa;
    Aa.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Body"];
    Aa.prototype = {
        __class__: Aa
    };
    var Ja = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Constraint"] = Ja;
    Ja.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Constraint"];
    Ja.prototype = {
        __class__: Ja
    };
    var qc =
        function() {
            this.next = this.elt = null
        };
    g["zpp_nape.util.ZNPNode_ZPP_Compound"] = qc;
    qc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Compound"];
    qc.prototype = {
        __class__: qc
    };
    var rc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Arbiter"] = rc;
    rc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Arbiter"];
    rc.prototype = {
        __class__: rc
    };
    var Ra = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_InteractionListener"] = Ra;
    Ra.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_InteractionListener"];
    Ra.prototype = {
        __class__: Ra
    };
    var bb = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_CbSet"] = bb;
    bb.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_CbSet"];
    bb.prototype = {
        __class__: bb
    };
    var ja = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Interactor"] = ja;
    ja.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Interactor"];
    ja.prototype = {
        __class__: ja
    };
    var Tc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_BodyListener"] = Tc;
    Tc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_BodyListener"];
    Tc.prototype = {
        __class__: Tc
    };
    var Pc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_CbSetPair"] = Pc;
    Pc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_CbSetPair"];
    Pc.prototype = {
        __class__: Pc
    };
    var uc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_ConstraintListener"] = uc;
    uc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_ConstraintListener"];
    uc.prototype = {
        __class__: uc
    };
    var Qc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_AABBPair"] = Qc;
    Qc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_AABBPair"];
    Qc.prototype = {
        __class__: Qc
    };
    var qa = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Vec2"] = qa;
    qa.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Vec2"];
    qa.prototype = {
        __class__: qa
    };
    var lb = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Edge"] = lb;
    lb.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Edge"];
    lb.prototype = {
        __class__: lb
    };
    var ad = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_AABBNode"] = ad;
    ad.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_AABBNode"];
    ad.prototype = {
        __class__: ad
    };
    var qd = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Component"] = qd;
    qd.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_Component"];
    qd.prototype = {
        __class__: qd
    };
    var Rh = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_InteractionGroup"] = Rh;
    Rh.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_InteractionGroup"];
    Rh.prototype = {
        __class__: Rh
    };
    var bc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_ColArbiter"] = bc;
    bc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_ColArbiter"];
    bc.prototype = {
        __class__: bc
    };
    var cc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_FluidArbiter"] = cc;
    cc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_FluidArbiter"];
    cc.prototype = {
        __class__: cc
    };
    var sc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_SensorArbiter"] = sc;
    sc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_SensorArbiter"];
    sc.prototype = {
        __class__: sc
    };
    var Qa = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_Listener"] = Qa;
    Qa.__name__ = ["zpp_nape", "util",
        "ZNPNode_ZPP_Listener"
    ];
    Qa.prototype = {
        __class__: Qa
    };
    var dc = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_ToiEvent"] = dc;
    dc.__name__ = ["zpp_nape", "util", "ZNPNode_ZPP_ToiEvent"];
    dc.prototype = {
        __class__: dc
    };
    var Sh = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ConvexResult"] = Sh;
    Sh.__name__ = ["zpp_nape", "util", "ZNPNode_ConvexResult"];
    Sh.prototype = {
        __class__: Sh
    };
    var Th = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_ZPP_GeomPoly"] = Th;
    Th.__name__ = ["zpp_nape", "util",
        "ZNPNode_ZPP_GeomPoly"
    ];
    Th.prototype = {
        __class__: Th
    };
    var Uh = function() {
        this.next = this.elt = null
    };
    g["zpp_nape.util.ZNPNode_RayResult"] = Uh;
    Uh.__name__ = ["zpp_nape", "util", "ZNPNode_RayResult"];
    Uh.prototype = {
        __class__: Uh
    };
    var Vd = function() {
        this.at_index = 0;
        this.at_ite = null;
        this.zip_length = !1;
        this._length = 0;
        this.inner = null;
        Wb.call(this);
        this.at_ite = null;
        this.at_index = 0;
        this.zip_length = !0;
        this._length = 0
    };
    g["zpp_nape.util.ZPP_MixVec2List"] = Vd;
    Vd.__name__ = ["zpp_nape", "util", "ZPP_MixVec2List"];
    Vd.get = function(a,
        b) {
        null == b && (b = !1);
        var c = new Vd;
        c.inner = a;
        c.zpp_inner.immutable = b;
        return c
    };
    Vd.__super__ = Wb;
    Vd.prototype = m(Wb.prototype, {
        zpp_gl: function() {
            this.zpp_vm();
            if (this.zip_length) {
                this._length = 0;
                for (var a = this.inner.next; null != a;) this._length++, a = a.next;
                this.zip_length = !1
            }
            return this._length
        },
        zpp_vm: function() {
            this.zpp_inner.validate();
            this.inner.modified && (this.zip_length = !0, this._length = 0, this.at_ite = null)
        },
        at: function(a) {
            this.zpp_vm();
            this.zpp_inner.reverse_flag && (a = this.zpp_gl() - 1 - a);
            if (a < this.at_index ||
                null == this.at_ite) {
                this.at_index = 0;
                for (this.at_ite = this.inner.next;;) break
            }
            for (; this.at_index != a;) {
                this.at_index++;
                for (this.at_ite = this.at_ite.next;;) break
            }
            return this.at_ite.wrapper()
        },
        push: function(a) {
            this.zpp_inner.modify_test();
            this.zpp_vm();
            var b;
            if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.inner.add(a.zpp_inner) : this.inner.insert(this.inner.iterator_at(this.zpp_gl() - 1), a.zpp_inner), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
            return b
        },
        __class__: Vd
    });
    var lc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.dontremove = this.reverse_flag = !1;
        this._invalidate = this._validate = this.adder = this.subber = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new ed;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_ConstraintList"] = lc;
    lc.__name__ = ["zpp_nape", "util", "ZPP_ConstraintList"];
    lc.get = function(a, b) {
        null == b && (b = !1);
        var c = new Cg;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    lc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        modify_test: function() {},
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        invalidate: function() {
            this._invalidated = !0;
            null != this._invalidate && this._invalidate(this)
        },
        __class__: lc
    };
    var Xb = function() {
        this.user_length =
            0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.dontremove = this.reverse_flag = !1;
        this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new od;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_BodyList"] = Xb;
    Xb.__name__ = ["zpp_nape", "util", "ZPP_BodyList"];
    Xb.get = function(a, b) {
        null == b && (b = !1);
        var c = new ub;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    Xb.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        modify_test: function() {},
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        invalidate: function() {
            this._invalidated = !0;
            null != this._invalidate && this._invalidate(this)
        },
        __class__: Xb
    };
    var he = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite =
            null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    g["zpp_nape.util.ZPP_InteractorList"] = he;
    he.__name__ = ["zpp_nape", "util", "ZPP_InteractorList"];
    he.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: he
    };
    var oc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.dontremove = this.reverse_flag = !1;
        this._invalidate = this._validate = this.adder = this.subber = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new ue;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_CompoundList"] = oc;
    oc.__name__ = ["zpp_nape", "util", "ZPP_CompoundList"];
    oc.get = function(a, b) {
        null == b && (b = !1);
        var c = new Lg;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    oc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        modify_test: function() {},
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        invalidate: function() {
            this._invalidated = !0;
            null != this._invalidate && this._invalidate(this)
        },
        __class__: oc
    };
    var Cc = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite =
            this.push_ite = null;
        this.at_index = 0;
        this.dontremove = this.reverse_flag = !1;
        this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new Uf;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_ListenerList"] = Cc;
    Cc.__name__ = ["zpp_nape", "util", "ZPP_ListenerList"];
    Cc.get = function(a, b) {
        null == b && (b = !1);
        var c = new Ag;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    Cc.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        modify_test: function() {},
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        invalidate: function() {
            this._invalidated = !0;
            null != this._invalidate && this._invalidate(this)
        },
        __class__: Cc
    };
    var Ac = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.dontremove = this.reverse_flag = !1;
        this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new Kc;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_CbTypeList"] = Ac;
    Ac.__name__ = ["zpp_nape", "util", "ZPP_CbTypeList"];
    Ac.get = function(a, b) {
        null == b && (b = !1);
        var c = new Bf;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    Ac.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite =
                null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        modify_test: function() {},
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        invalidate: function() {
            this._invalidated = !0;
            null != this._invalidate && this._invalidate(this)
        },
        __class__: Ac
    };
    var Rd = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._invalidate = this._validate = this.adder = this.post_adder =
            this.subber = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new se;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_Vec2List"] = Rd;
    Rd.__name__ = ["zpp_nape", "util", "ZPP_Vec2List"];
    Rd.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        modify_test: function() {},
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate &&
                this._validate())
        },
        invalidate: function() {
            this._invalidated = !0;
            null != this._invalidate && this._invalidate(this)
        },
        __class__: Rd
    };
    var jd = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    g["zpp_nape.util.ZPP_GeomPolyList"] = jd;
    jd.__name__ = ["zpp_nape", "util", "ZPP_GeomPolyList"];
    jd.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite =
                null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: jd
    };
    var ge = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    g["zpp_nape.util.ZPP_RayResultList"] = ge;
    ge.__name__ = ["zpp_nape", "util", "ZPP_RayResultList"];
    ge.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: ge
    };
    var zd = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    g["zpp_nape.util.ZPP_ConvexResultList"] = zd;
    zd.__name__ = ["zpp_nape",
        "util", "ZPP_ConvexResultList"
    ];
    zd.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: zd
    };
    var ie = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    g["zpp_nape.util.ZPP_EdgeList"] = ie;
    ie.__name__ = ["zpp_nape", "util", "ZPP_EdgeList"];
    ie.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: ie
    };
    var Ic = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index =
            0;
        this.dontremove = this.reverse_flag = !1;
        this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new Sd;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_ShapeList"] = Ic;
    Ic.__name__ = ["zpp_nape", "util", "ZPP_ShapeList"];
    Ic.get = function(a, b) {
        null == b && (b = !1);
        var c = new Ng;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    Ic.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified &&
                (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        modify_test: function() {},
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        invalidate: function() {
            this._invalidated = !0;
            null != this._invalidate && this._invalidate(this)
        },
        __class__: Ic
    };
    var fe = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    g["zpp_nape.util.ZPP_InteractionGroupList"] = fe;
    fe.__name__ = ["zpp_nape", "util", "ZPP_InteractionGroupList"];
    fe.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: fe
    };
    var Ec = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this.immutable = this._invalidated = !1;
        this.outer = this.inner = null;
        this.inner = new te;
        this._invalidated = !0
    };
    g["zpp_nape.util.ZPP_ArbiterList"] = Ec;
    Ec.__name__ = ["zpp_nape", "util", "ZPP_ArbiterList"];
    Ec.get = function(a, b) {
        null == b && (b = !1);
        var c = new Dg;
        c.zpp_inner.inner = a;
        b && (c.zpp_inner.immutable = !0);
        c.zpp_inner.zip_length = !0;
        return c
    };
    Ec.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod &&
                (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: Ec
    };
    var Qd = function() {
        this.user_length = 0;
        this.zip_length = !1;
        this.at_ite = this.push_ite = null;
        this.at_index = 0;
        this.reverse_flag = !1;
        this._validate = null;
        this._invalidated = !1;
        this.inner = null
    };
    g["zpp_nape.util.ZPP_ContactList"] = Qd;
    Qd.__name__ = ["zpp_nape", "util", "ZPP_ContactList"];
    Qd.prototype = {
        valmod: function() {
            this.validate();
            this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
        },
        validate: function() {
            this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
        },
        __class__: Qd
    };
    var je = function() {};
    g["zpp_nape.util.ZPP_Math"] = je;
    je.__name__ = ["zpp_nape", "util", "ZPP_Math"];
    je.sqr = function(a) {
        return a * a
    };
    var Ub = function() {};
    g["zpp_nape.util.ZPP_PubPool"] = Ub;
    Ub.__name__ = ["zpp_nape", "util",
        "ZPP_PubPool"
    ];
    var ia = function() {
        this.colour = 0;
        this.lt = this.swapped = this.data = this.prev = this.next = this.parent = null
    };
    g["zpp_nape.util.ZPP_Set_ZPP_CbSetPair"] = ia;
    ia.__name__ = ["zpp_nape", "util", "ZPP_Set_ZPP_CbSetPair"];
    ia.prototype = {
        clear_with: function(a) {
            if (null != this.parent) {
                for (var b = this.parent; null != b;) b = null != b.prev ? b.prev : null != b.next ? b.next : this.clear_node(b, a);
                this.parent = null
            }
        },
        clear_node: function(a, b) {
            b(a.data);
            var c = a.parent;
            null != c && (a == c.prev ? c.prev = null : c.next = null, a.parent = null);
            a.data =
                null;
            a.lt = null;
            a.swapped = null;
            a.next = ia.zpp_pool;
            ia.zpp_pool = a;
            return c
        },
        __fix_dbl_red: function(a) {
            for (;;) {
                var b = a.parent,
                    c = b.parent;
                if (null == c) {
                    b.colour = 1;
                    break
                }
                var d, e, f, g, i, j, l;
                b == c.prev ? (f = c, l = c.next, a == b.prev ? (d = a, e = b, g = a.prev, i = a.next, j = b.next) : (d = b, e = a, g = b.prev, i = a.prev, j = a.next)) : (d = c, g = c.prev, a == b.prev ? (e = a, f = b, i = a.prev, j = a.next, l = b.next) : (e = b, f = a, i = b.prev, j = a.prev, l = a.next));
                a = c.parent;
                null == a ? this.parent = e : a.prev == c ? a.prev = e : a.next = e;
                null != e && (e.parent = a);
                d.prev = g;
                null != g && (g.parent = d);
                d.next = i;
                null != i && (i.parent = d);
                e.prev = d;
                null != d && (d.parent = e);
                e.next = f;
                null != f && (f.parent = e);
                f.prev = j;
                null != j && (j.parent = f);
                f.next = l;
                null != l && (l.parent = f);
                e.colour = c.colour - 1;
                d.colour = 1;
                f.colour = 1;
                if (e == this.parent) this.parent.colour = 1;
                else if (0 == e.colour && 0 == e.parent.colour) {
                    a = e;
                    continue
                }
                break
            }
        },
        try_insert: function(a) {
            var b = null,
                c = null;
            if (null == this.parent) null == ia.zpp_pool ? b = new ia : (b = ia.zpp_pool, ia.zpp_pool = b.next, b.next = null), null, b.data = a, this.parent = b;
            else
                for (c = this.parent;;)
                    if (this.lt(a, c.data))
                        if (null ==
                            c.prev) {
                            null == ia.zpp_pool ? b = new ia : (b = ia.zpp_pool, ia.zpp_pool = b.next, b.next = null);
                            null;
                            b.data = a;
                            c.prev = b;
                            b.parent = c;
                            break
                        } else c = c.prev;
            else if (this.lt(c.data, a))
                if (null == c.next) {
                    null == ia.zpp_pool ? b = new ia : (b = ia.zpp_pool, ia.zpp_pool = b.next, b.next = null);
                    null;
                    b.data = a;
                    c.next = b;
                    b.parent = c;
                    break
                } else c = c.next;
            else break; if (null == b) return c;
            null == b.parent ? b.colour = 1 : (b.colour = 0, 0 == b.parent.colour && this.__fix_dbl_red(b));
            return b
        },
        __class__: ia
    };
    var Na = function() {
        this.colour = 0;
        this.lt = this.swapped = this.data =
            this.prev = this.next = this.parent = null
    };
    g["zpp_nape.util.ZPP_Set_ZPP_CbSet"] = Na;
    Na.__name__ = ["zpp_nape", "util", "ZPP_Set_ZPP_CbSet"];
    Na.prototype = {
        empty: function() {
            return null == this.parent
        },
        find: function(a) {
            for (var b = this.parent; null != b && b.data != a;) b = this.lt(a, b.data) ? b.prev : b.next;
            return b
        },
        find_weak: function(a) {
            for (var b = this.parent; null != b;)
                if (this.lt(a, b.data)) b = b.prev;
                else if (this.lt(b.data, a)) b = b.next;
            else break;
            return b
        },
        remove: function(a) {
            this.remove_node(this.find(a))
        },
        remove_node: function(a) {
            if (null !=
                a.next && null != a.prev) {
                for (var b = a.next; null != b.prev;) b = b.prev;
                var c = a.data;
                a.data = b.data;
                b.data = c;
                null != this.swapped && this.swapped(a.data, b.data);
                a = b
            }
            b = null == a.prev ? a.next : a.prev;
            if (1 == a.colour)
                if (null != a.prev || null != a.next) b.colour = 1;
                else if (null != a.parent)
                for (c = a.parent;;) {
                    c.colour++;
                    c.prev.colour--;
                    c.next.colour--;
                    var d = c.prev;
                    if (-1 == d.colour) {
                        this.__fix_neg_red(d);
                        break
                    } else if (0 == d.colour) {
                        if (null != d.prev && 0 == d.prev.colour) {
                            this.__fix_dbl_red(d.prev);
                            break
                        }
                        if (null != d.next && 0 == d.next.colour) {
                            this.__fix_dbl_red(d.next);
                            break
                        }
                    }
                    d = c.next;
                    if (-1 == d.colour) {
                        this.__fix_neg_red(d);
                        break
                    } else if (0 == d.colour) {
                        if (null != d.prev && 0 == d.prev.colour) {
                            this.__fix_dbl_red(d.prev);
                            break
                        }
                        if (null != d.next && 0 == d.next.colour) {
                            this.__fix_dbl_red(d.next);
                            break
                        }
                    }
                    if (2 == c.colour)
                        if (null == c.parent) c.colour = 1;
                        else {
                            c = c.parent;
                            continue
                        }
                    break
                }
            c = a.parent;
            null == c ? this.parent = b : c.prev == a ? c.prev = b : c.next = b;
            null != b && (b.parent = c);
            a.parent = a.prev = a.next = null;
            a.data = null;
            a.lt = null;
            a.swapped = null;
            a.next = Na.zpp_pool;
            Na.zpp_pool = a
        },
        __fix_neg_red: function(a) {
            var b =
                a.parent;
            if (b.prev == a) {
                var c = a.prev,
                    d = a.next,
                    e = d.prev,
                    f = d.next;
                c.colour = 0;
                a.colour = b.colour = 1;
                a.next = e;
                null != e && (e.parent = a);
                a = b.data;
                b.data = d.data;
                d.data = a;
                null != this.swapped && this.swapped(b.data, d.data);
                d.prev = f;
                null != f && (f.parent = d);
                d.next = b.next;
                null != b.next && (b.next.parent = d);
                b.next = d
            } else c = a.next, d = a.prev, e = d.next, f = d.prev, c.colour = 0, a.colour = b.colour = 1, a.prev = e, null != e && (e.parent = a), a = b.data, b.data = d.data, d.data = a, null != this.swapped && this.swapped(b.data, d.data), d.next = f, null != f && (f.parent =
                d), d.prev = b.prev, null != b.prev && (b.prev.parent = d), b.prev = d;
            null != d && (d.parent = b);
            b = c;
            null != b.prev && 0 == b.prev.colour ? this.__fix_dbl_red(b.prev) : null != b.next && 0 == b.next.colour && this.__fix_dbl_red(b.next)
        },
        __fix_dbl_red: function(a) {
            for (;;) {
                var b = a.parent,
                    c = b.parent;
                if (null == c) {
                    b.colour = 1;
                    break
                }
                var d, e, f, g, i, j, l;
                b == c.prev ? (f = c, l = c.next, a == b.prev ? (d = a, e = b, g = a.prev, i = a.next, j = b.next) : (d = b, e = a, g = b.prev, i = a.prev, j = a.next)) : (d = c, g = c.prev, a == b.prev ? (e = a, f = b, i = a.prev, j = a.next, l = b.next) : (e = b, f = a, i = b.prev, j = a.prev,
                    l = a.next));
                a = c.parent;
                null == a ? this.parent = e : a.prev == c ? a.prev = e : a.next = e;
                null != e && (e.parent = a);
                d.prev = g;
                null != g && (g.parent = d);
                d.next = i;
                null != i && (i.parent = d);
                e.prev = d;
                null != d && (d.parent = e);
                e.next = f;
                null != f && (f.parent = e);
                f.prev = j;
                null != j && (j.parent = f);
                f.next = l;
                null != l && (l.parent = f);
                e.colour = c.colour - 1;
                d.colour = 1;
                f.colour = 1;
                if (e == this.parent) this.parent.colour = 1;
                else if (0 == e.colour && 0 == e.parent.colour) {
                    a = e;
                    continue
                }
                break
            }
        },
        insert: function(a) {
            var b;
            null == Na.zpp_pool ? b = new Na : (b = Na.zpp_pool, Na.zpp_pool =
                b.next, b.next = null);
            null;
            b.data = a;
            if (null == this.parent) this.parent = b;
            else
                for (a = this.parent;;)
                    if (this.lt(b.data, a.data))
                        if (null == a.prev) {
                            a.prev = b;
                            b.parent = a;
                            break
                        } else a = a.prev;
            else if (null == a.next) {
                a.next = b;
                b.parent = a;
                break
            } else a = a.next;
            null == b.parent ? b.colour = 1 : (b.colour = 0, 0 == b.parent.colour && this.__fix_dbl_red(b));
            return b
        },
        __class__: Na
    };
    var Ve, di = 0;
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    g.Math = Math;
    Math.isFinite = function(a) {
        return isFinite(a)
    };
    Math.isNaN = function(a) {
        return isNaN(a)
    };
    String.prototype.__class__ = g.String = String;
    String.__name__ = ["String"];
    g.Array = Array;
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = g.Date = Date;
    Date.__name__ = ["Date"];
    var ei = g.Int = {
            __name__: ["Int"]
        },
        fi = g.Dynamic = {
            __name__: ["Dynamic"]
        },
        Zh = g.Float = Number;
    Zh.__name__ = ["Float"];
    var $h = g.Bool = Boolean;
    $h.__ename__ = ["Bool"];
    var gi = g.Class = {
            __name__: ["Class"]
        },
        hi = {};
    ya.ANY_SHAPE = new tc;
    ya.ANY_BODY = new tc;
    ya.ANY_COMPOUND = new tc;
    ya.ANY_CONSTRAINT = new tc;
    Da._Interactor =
        0;
    Da._CbType = 0;
    Da._CbSet = 0;
    Da._Listener = 0;
    cb.glassCollision = new tc;
    cb.groundCollision = new tc;
    cb.chickenCollision = new tc;
    ra.prefix = "chickensave";
    s.SHOW_ANIMATION = !0;
    Nb.instance = new Nb;
    za.DISPATCHING_SENTINEL = new Uc(null, null);
    z.root = new q;
    z.uncaughtError = new Ca;
    z.hidden = new Ta(!1);
    z.volume = new ga(1);
    z._platform = Nb.instance;
    z._calledInit = !1;
    xa.__meta__ = {
        obj: {
            assets: [{
                bootstrap: [{
                    bytes: 653,
                    md5: "21ca462fc819178aab400fa8290fa4d9",
                    name: "progress/loader_back.png"
                }, {
                    bytes: 487,
                    md5: "9a1c9eda6c7576c7c0e34012333ffaf1",
                    name: "progress/loader_progress.png"
                }, {
                    bytes: 14550,
                    md5: "2ecd2662bc4ddefdad6c82750ae74190",
                    name: "progress/zibbo.png"
                }],
                locale: [{
                    bytes: 435,
                    md5: "5eeab127339cc9d742956fdf901e14af",
                    name: "messages.ini"
                }],
                main: [{
                    bytes: 868133,
                    md5: "d901fcc56ce354161efbd35a6bd209ca",
                    name: "bg/bg0.png"
                }, {
                    bytes: 557764,
                    md5: "afdd336db7e192cda8801e6792907a05",
                    name: "bg/bg1.png"
                }, {
                    bytes: 563843,
                    md5: "3d5927d843c1f29c97768b565148af3f",
                    name: "bg/bg2.png"
                }, {
                    bytes: 318359,
                    md5: "e3ba9b81c62b0349ea8c43c0a9fd01a4",
                    name: "bg/main.png"
                }, {
                    bytes: 570211,
                    md5: "6b1c22588c43d5e543741b59cc782ae2",
                    name: "chicken/atlas0.png"
                }, {
                    bytes: 5216,
                    md5: "9208f81c9f628d8acbf1a99a814a9baf",
                    name: "chicken/library.json"
                }, {
                    bytes: 25247,
                    md5: "95d2998ca445bf89ddb40b79bdf5c19e",
                    name: "clock.png"
                }, {
                    bytes: 65051,
                    md5: "b890f932762dfd63ff28e2d8894b7af2",
                    name: "exp_glass.png"
                }, {
                    bytes: 56690,
                    md5: "bbd8c5e1975a230f5b77bec579d1f233",
                    name: "exp_tnt.png"
                }, {
                    bytes: 64240,
                    md5: "fea181a4090b3b3085b44f25ad9c4171",
                    name: "exp_wood_dark.png"
                }, {
                    bytes: 64430,
                    md5: "abd8ad86372725f2c014e659876391c8",
                    name: "exp_wood_light.png"
                }, {
                    bytes: 148605,
                    md5: "e8d9785bb45821dfa965d73259c1341f",
                    name: "firework.png"
                }, {
                    bytes: 62781,
                    md5: "ef5832d4d4ba9660648fa388a19e13f0",
                    name: "fonts/Arial.fnt"
                }, {
                    bytes: 73484,
                    md5: "e8ff06dd79e5fe3a2ed0d28f75c63350",
                    name: "fonts/Arial_0.png"
                }, {
                    bytes: 27177,
                    md5: "23c678c39941cdc481a8aa4a21877689",
                    name: "fonts/yellow.fnt"
                }, {
                    bytes: 82439,
                    md5: "57f6f404589b33fa5a017f6d8e098787",
                    name: "fonts/yellow.png"
                }, {
                    bytes: 7437,
                    md5: "eecd8d475ef9dc1fd0cffa7800e5ef2d",
                    name: "game.json"
                }, {
                    bytes: 1166476,
                    md5: "567656b31a1b93f6691f41513ae62937",
                    name: "game.png"
                }, {
                    bytes: 480,
                    md5: "e42310beef51794d4b53424cc3fd6d50",
                    name: "levels/level1.json"
                }, {
                    bytes: 1035,
                    md5: "fa377e071ddb3be6c48fd6fd108875a6",
                    name: "levels/level10.json"
                }, {
                    bytes: 1140,
                    md5: "c006b46e1f4e23722d46a72999b1cb2a",
                    name: "levels/level11.json"
                }, {
                    bytes: 1124,
                    md5: "b923a1d45fb06e235de05b6dd2b9a76f",
                    name: "levels/level12.json"
                }, {
                    bytes: 1322,
                    md5: "ac07d24d77113342536348240d56b010",
                    name: "levels/level13.json"
                }, {
                    bytes: 944,
                    md5: "3d75627e4d1e51ac9cf4cbb381187330",
                    name: "levels/level14.json"
                }, {
                    bytes: 664,
                    md5: "a2c8b8d2d5fca87f07b98320466c9ca9",
                    name: "levels/level15.json"
                }, {
                    bytes: 1325,
                    md5: "05a93ec27550f9deab0447cb32677254",
                    name: "levels/level16.json"
                }, {
                    bytes: 835,
                    md5: "29332e18072875fd1c21f911a4a0a8bb",
                    name: "levels/level17.json"
                }, {
                    bytes: 647,
                    md5: "f9b7a7ffaaccd65878879a04864c4bbd",
                    name: "levels/level18.json"
                }, {
                    bytes: 749,
                    md5: "8d211c42306064f46270f335704d7dab",
                    name: "levels/level19.json"
                }, {
                    bytes: 730,
                    md5: "e1805eeb37213815976ea87083839f50",
                    name: "levels/level2.json"
                }, {
                    bytes: 1110,
                    md5: "f4414e92d759554184303b719a65076e",
                    name: "levels/level20.json"
                }, {
                    bytes: 952,
                    md5: "7de6696c715f0c207fbc7253f9172642",
                    name: "levels/level21.json"
                }, {
                    bytes: 1061,
                    md5: "f3a499d49496830e19e4f4988f893bbb",
                    name: "levels/level22.json"
                }, {
                    bytes: 1628,
                    md5: "aaa42d772068b3a7642cd22ccdf59c3c",
                    name: "levels/level23.json"
                }, {
                    bytes: 1142,
                    md5: "ab039cdf7cd247d5c56100b62866935f",
                    name: "levels/level24.json"
                }, {
                    bytes: 1611,
                    md5: "a867fa418b200a2033c726e065f4cdee",
                    name: "levels/level25.json"
                }, {
                    bytes: 754,
                    md5: "5cca69bd63142b934f253005c1610771",
                    name: "levels/level26.json"
                }, {
                    bytes: 1752,
                    md5: "ead976f4dd938d0339232a2a963a10c1",
                    name: "levels/level27.json"
                }, {
                    bytes: 1583,
                    md5: "9c07d700c329d1dc153812225d99fe99",
                    name: "levels/level28.json"
                }, {
                    bytes: 1301,
                    md5: "53cb4ce777a279439ac6534d5ebd156a",
                    name: "levels/level29.json"
                }, {
                    bytes: 571,
                    md5: "c658e653097ed768cb9651ac570732d3",
                    name: "levels/level3.json"
                }, {
                    bytes: 844,
                    md5: "4ea6e211ce1c0186378656a4db70ce53",
                    name: "levels/level30.json"
                }, {
                    bytes: 1043,
                    md5: "4660f9758be63b6fbbd2773cf23853bb",
                    name: "levels/level31.json"
                }, {
                    bytes: 1504,
                    md5: "30717234c163251915aed609b77bf005",
                    name: "levels/level32.json"
                }, {
                    bytes: 1222,
                    md5: "c53b0d5202d4a60fbb4c301fba10df26",
                    name: "levels/level33.json"
                }, {
                    bytes: 1192,
                    md5: "5d17d3ff7eaf7d53652b78afc7364823",
                    name: "levels/level34.json"
                }, {
                    bytes: 1042,
                    md5: "19ed166d1e1b9a8517f7d3468d4c9f73",
                    name: "levels/level35.json"
                }, {
                    bytes: 1942,
                    md5: "64d9e57ab1e28d6fc7995f098bfbb3fa",
                    name: "levels/level36.json"
                }, {
                    bytes: 1040,
                    md5: "982baf2dbc3510e90bc0de1c77a47d23",
                    name: "levels/level37.json"
                }, {
                    bytes: 1109,
                    md5: "1488ddd6ca8605939bbd367b338df059",
                    name: "levels/level38.json"
                }, {
                    bytes: 1500,
                    md5: "efff751cd6b95f05d4a3a16faa1abdab",
                    name: "levels/level39.json"
                }, {
                    bytes: 839,
                    md5: "8a8179ffdcaf5cdb079d637715022974",
                    name: "levels/level4.json"
                }, {
                    bytes: 1363,
                    md5: "30c1c63bf73fd3827aa604cb66c9bc5a",
                    name: "levels/level40.json"
                }, {
                    bytes: 1031,
                    md5: "719dae3653c6c1e404d42f6fd10d0f90",
                    name: "levels/level41.json"
                }, {
                    bytes: 1600,
                    md5: "8c09612f1c03fe7d593f2beb2ec40a0c",
                    name: "levels/level42.json"
                }, {
                    bytes: 1086,
                    md5: "049e0fc82f87695832ff2d5a40bebb60",
                    name: "levels/level43.json"
                }, {
                    bytes: 1018,
                    md5: "c14cf62f6a178eac26742b872a2c145e",
                    name: "levels/level44.json"
                }, {
                    bytes: 1013,
                    md5: "ae356ad4c9b544f0244c40a099d087a8",
                    name: "levels/level45.json"
                }, {
                    bytes: 1125,
                    md5: "641f69c10f386a81d06a138f096e199a",
                    name: "levels/level46.json"
                }, {
                    bytes: 1489,
                    md5: "64f245d851df75e6c2544d5b236c36fb",
                    name: "levels/level47.json"
                }, {
                    bytes: 1380,
                    md5: "b84578f4555b2fc3404d020530db6a6a",
                    name: "levels/level48.json"
                }, {
                    bytes: 922,
                    md5: "5326b9fd67ec462b79a29e90cf19eb4f",
                    name: "levels/level5.json"
                }, {
                    bytes: 945,
                    md5: "ef5bf626fda864d9a703e1618f6687be",
                    name: "levels/level6.json"
                }, {
                    bytes: 1041,
                    md5: "227f89fd40a157f1e20bf417bebde968",
                    name: "levels/level7.json"
                }, {
                    bytes: 764,
                    md5: "3a867579b1bcd4ea66cc9794954e7473",
                    name: "levels/level8.json"
                }, {
                    bytes: 1035,
                    md5: "5ae65699f4720dff97bee9293366c140",
                    name: "levels/level9.json"
                }, {
                    bytes: 16645,
                    md5: "c2aa7243560dcbf680b52a18f552ba0c",
                    name: "sounds/chicken1.mp3"
                }, {
                    bytes: 16466,
                    md5: "85db22e87c734d56040ac22a84152388",
                    name: "sounds/chicken1.ogg"
                }, {
                    bytes: 16489,
                    md5: "2d73f279ae396967645260d2fc751308",
                    name: "sounds/chicken2.mp3"
                }, {
                    bytes: 16608,
                    md5: "cedc0e7e6edb059749312caea4f6dd3c",
                    name: "sounds/chicken2.ogg"
                }, {
                    bytes: 15865,
                    md5: "edfc188d13d9b4b9c26f2ede44557e0b",
                    name: "sounds/chicken3.mp3"
                }, {
                    bytes: 16017,
                    md5: "918d59b63d0f071932cb613333cfb3f0",
                    name: "sounds/chicken3.ogg"
                }, {
                    bytes: 18517,
                    md5: "a74e3674196a7fe3f169344b986b77d5",
                    name: "sounds/chicken4.mp3"
                }, {
                    bytes: 19404,
                    md5: "9831bbdb4bacd7a17fd6115d5a84c6c9",
                    name: "sounds/chicken4.ogg"
                }, {
                    bytes: 22105,
                    md5: "3d9cbb01ac5619fca9232b3116b5a006",
                    name: "sounds/chicken_win.mp3"
                }, {
                    bytes: 27426,
                    md5: "f0cdd086faf167ff9f4a30cff209346b",
                    name: "sounds/chicken_win.ogg"
                }, {
                    bytes: 10612,
                    md5: "285ffb8ff59489347e02d15d78f6c546",
                    name: "sounds/click.mp3"
                }, {
                    bytes: 7180,
                    md5: "b50ba3ef630d06e8159a961a64c26e22",
                    name: "sounds/click.ogg"
                }, {
                    bytes: 11082,
                    md5: "e3bdd7f4bf49108e6912a9dec368db77",
                    name: "sounds/clock.mp3"
                }, {
                    bytes: 13851,
                    md5: "96bae03e7dfa9552e1c9aa3e93c67b00",
                    name: "sounds/clock.ogg"
                }, {
                    bytes: 11709,
                    md5: "56e33b2e4ceebc2353dd891db9b95cec",
                    name: "sounds/glass.mp3"
                }, {
                    bytes: 9840,
                    md5: "afb0a34eec109d2981bb79503655c313",
                    name: "sounds/glass.ogg"
                }, {
                    bytes: 16909,
                    md5: "7bfb9fb546da0f65d37a21e3b518d3db",
                    name: "sounds/level_win.mp3"
                }, {
                    bytes: 15565,
                    md5: "21fea674cabfe48c43dc0e3dd0a5e8e7",
                    name: "sounds/level_win.ogg"
                }, {
                    bytes: 198442,
                    md5: "4e6515c1972b66efe1e20730b38d2f86",
                    name: "sounds/loop.mp3"
                }, {
                    bytes: 281575,
                    md5: "83e2b36d2aed6568d60e3aad871af30c",
                    name: "sounds/loop.ogg"
                }, {
                    bytes: 10929,
                    md5: "8b043ab6a9b5df6bd59c59ecdaa05577",
                    name: "sounds/loselevel.mp3"
                }, {
                    bytes: 8973,
                    md5: "6f99d58a287a32b2d00bdc552bc0ed86",
                    name: "sounds/loselevel.ogg"
                }, {
                    bytes: 13114,
                    md5: "83f128aa8e1f8f5b214579e3e4f5c6e3",
                    name: "sounds/slide2.mp3"
                }, {
                    bytes: 8119,
                    md5: "3dfa7c4eb5e03713ab2abaf9f12f5d8b",
                    name: "sounds/slide2.ogg"
                }, {
                    bytes: 13321,
                    md5: "615b7a4995f691830416161d1c828900",
                    name: "sounds/star1.mp3"
                }, {
                    bytes: 11134,
                    md5: "4a8cdb41b2c87f345ee2b870c72d99c3",
                    name: "sounds/star1.ogg"
                }, {
                    bytes: 13321,
                    md5: "39da64746847ec2fb33418d7d2f54be1",
                    name: "sounds/star2.mp3"
                }, {
                    bytes: 10809,
                    md5: "0b8cc1fa6af2ab9a53ddacce32d3db91",
                    name: "sounds/star2.ogg"
                }, {
                    bytes: 18001,
                    md5: "1b1eaf5d2f688bac486d8f5fe7fc6fce",
                    name: "sounds/star3.mp3"
                }, {
                    bytes: 18405,
                    md5: "c22397dac368030a3fdc7ab80fbd8540",
                    name: "sounds/star3.ogg"
                }, {
                    bytes: 17013,
                    md5: "c28db43df6fb75e0c7af37e474911c65",
                    name: "sounds/tnt.mp3"
                }, {
                    bytes: 16892,
                    md5: "ac91077b5e02ada008e5003fa5f9ca36",
                    name: "sounds/tnt.ogg"
                }, {
                    bytes: 12333,
                    md5: "30f704b0d9d66decf6bbee290c5b10e7",
                    name: "sounds/wood.mp3"
                }, {
                    bytes: 10048,
                    md5: "e44127e3e5623896603f01b2a383bb55",
                    name: "sounds/wood.ogg"
                }, {
                    bytes: 5395,
                    md5: "8e4498acd0e9b486d3f473b9f93e74ff",
                    name: "ui.json"
                }, {
                    bytes: 177199,
                    md5: "4921f08f45520b9d9e22055dadf49180",
                    name: "ui.png"
                }, {
                    bytes: 28997,
                    md5: "e0e94fd311faecb6e503e9635247a60c",
                    name: "zibbo.png"
                }]
            }]
        }
    };
    xa._supportsCrossOrigin =
        function() {
            var a;
            a = 0 <= window.navigator.userAgent.indexOf("Linux; U; Android") ? !1 : null != (new XMLHttpRequest).withCredentials;
            a || null;
            return a
    }();
    v._scratchPoint = new Re;
    rd.NEWLINE = new ef(10);
    db._sharedEvent = new ig;
    La._sharedEvent = new jg;
    vc.CANVAS_TEXTURES = (new tb("(iPhone|iPod|iPad)", "")).match(window.navigator.userAgent);
    V._mediaRefCount = 0;
    V._detectBlobSupport = !0;
    I.STAGE_WIDTH = 0;
    I.STAGE_HEIGHT = 0;
    I.BASE_WIDTH = 0;
    I.BASE_HEIGHT = 0;
    I.MAX_WIDTH = 0;
    L.VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
    L.SHOULD_HIDE_MOBILE_BROWSER =
        window.top == window && (new tb("Mobile(/.*)? Safari", "")).match(window.navigator.userAgent);
    U._detectSupport = !0;
    ic._scratchMatrix = new Ob;
    hc.USE_CACHE = !1;
    hc.USE_ENUM_INDEX = !1;
    hc.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    Va.DEFAULT_RESOLVER = oa;
    Va.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    jc.count = 0;
    l.epsilon = 1.0E-8;
    l.fluidAngularDragFriction = 2.5;
    l.fluidAngularDrag = 100;
    l.fluidVacuumDrag = 0.5;
    l.fluidLinearDrag = 0.5;
    l.collisionSlop = 0.2;
    l.collisionSlopCCD =
        0.5;
    l.distanceThresholdCCD = 0.05;
    l.staticCCDLinearThreshold = 0.05;
    l.staticCCDAngularThreshold = 0.005;
    l.bulletCCDLinearThreshold = 0.125;
    l.bulletCCDAngularThreshold = 0.0125;
    l.dynamicSweepLinearThreshold = 17;
    l.dynamicSweepAngularThreshold = 0.6;
    l.angularCCDSlipScale = 0.75;
    l.arbiterExpirationDelay = 6;
    l.staticFrictionThreshold = 2;
    l.elasticThreshold = 20;
    l.sleepDelay = 60;
    l.linearSleepThreshold = 0.2;
    l.angularSleepThreshold = 0.4;
    l.contactBiasCoef = 0.3;
    l.contactStaticBiasCoef = 0.6;
    l.contactContinuousBiasCoef = 0.4;
    l.contactContinuousStaticBiasCoef =
        0.5;
    l.illConditionedThreshold = 2E8;
    f.internal = !1;
    f.id_ImmState_ACCEPT = 1;
    f.id_ImmState_IGNORE = 2;
    f.id_ImmState_ALWAYS = 4;
    f.id_GravMassMode_DEFAULT = 0;
    f.id_GravMassMode_FIXED = 1;
    f.id_GravMassMode_SCALED = 2;
    f.id_InertiaMode_DEFAULT = 0;
    f.id_MassMode_DEFAULT = 0;
    f.id_BodyType_STATIC = 1;
    f.id_BodyType_DYNAMIC = 2;
    f.id_BodyType_KINEMATIC = 3;
    f.id_ListenerType_BODY = 0;
    f.id_PreFlag_ACCEPT = 1;
    f.id_ListenerType_CONSTRAINT = 1;
    f.id_ListenerType_INTERACTION = 2;
    f.id_ListenerType_PRE = 3;
    f.id_CbEvent_BEGIN = 0;
    f.id_InteractionType_COLLISION =
        1;
    f.id_CbEvent_ONGOING = 6;
    f.id_InteractionType_SENSOR = 2;
    f.id_CbEvent_END = 1;
    f.id_InteractionType_FLUID = 4;
    f.id_CbEvent_WAKE = 2;
    f.id_InteractionType_ANY = 7;
    f.id_CbEvent_SLEEP = 3;
    f.id_CbEvent_BREAK = 4;
    f.id_CbEvent_PRE = 5;
    f.id_ShapeType_CIRCLE = 0;
    f.id_ShapeType_POLYGON = 1;
    Wa.UCbSet = new gd;
    Wa.VCbSet = new gd;
    Wa.WCbSet = new gd;
    Wa.UCbType = new Kc;
    Wa.VCbType = new Kc;
    Wa.WCbType = new Kc;
    O.internal = !1;
    O.COL = 1;
    O.FLUID = 4;
    O.SENSOR = 2;
    Ga.internal = !1;
    o.flowpoly = new se;
    o.flowsegs = new se;
    var bi;
    null == f.BodyType_STATIC && (f.internal = !0, f.BodyType_STATIC = new Ka, f.internal = !1);
    bi = f.BodyType_STATIC;
    var ci;
    null == f.BodyType_DYNAMIC && (f.internal = !0, f.BodyType_DYNAMIC = new Ka, f.internal = !1);
    ci = f.BodyType_DYNAMIC;
    null == f.BodyType_KINEMATIC && (f.internal = !0, f.BodyType_KINEMATIC = new Ka, f.internal = !1);
    Gb.types = [null, bi, ci, f.BodyType_KINEMATIC];
    S.WAKE = 1;
    S.PROPS = 2;
    S.ANGDRAG = 4;
    S.ARBITERS = 8;
    N.internal = !1;
    vb.tmpaabb = new na;
    lc.internal = !1;
    Xb.internal = !1;
    he.internal = !1;
    oc.internal = !1;
    Cc.internal = !1;
    Ac.internal = !1;
    Rd.internal = !1;
    jd.internal = !1;
    ge.internal = !1;
    zd.internal = !1;
    ie.internal = !1;
    Ic.internal = !1;
    fe.internal = !1;
    Ec.internal = !1;
    Qd.internal = !1;
    dh.main()
})();
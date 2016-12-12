var _STRINGS = {
    Ad: {
        Mobile: {
            Preroll: {
                ReadyIn: "The game is ready in ",
                Loading: "Your game is loading...",
                Close: "Close"
            },
            Header: {
                ReadyIn: "The game is ready in ",
                Loading: "Your game is loading...",
                Close: "Close"
            },
            End: {
                ReadyIn: "Advertisement ends in ",
                Loading: "Please wait ...",
                Close: "Close"
            }
        }
    },
    Splash: {
        Loading: "Loading ...",
        LogoLine1: "Some text here",
        LogoLine2: "powered by MarketJS",
        LogoLine3: "none"
    },
    Game: {
        SelectPlayer: "Select Player",
        Win: "You win!",
        Lose: "You lose!",
        Score: "Score",
        Time: "Time"
    },
    Results: {
        Title: "High score"
    }
};
var _SETTINGS = {
    API: {
        Enabled: !0,
        Log: {
            Events: {
                InitializeGame: !0,
                EndGame: !0,
                Level: {
                    Begin: !0,
                    End: !0,
                    Win: !0,
                    Lose: !0,
                    Draw: !0
                }
            }
        }
    },
    Ad: {
        Mobile: {
            Preroll: {
                Enabled: !0,
                Duration: 5,
                Width: 300,
                Height: 250,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGamePreroll: 40,
                        MobileAdInGamePreroll2: 40,
                        MobileAdInGamePreroll3: 20
                    }
                }
            },
            Header: {
                Enabled: !1,
                Duration: 5,
                Width: 320,
                Height: 50,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGameHeader: 40,
                        MobileAdInGameHeader2: 40,
                        MobileAdInGameHeader3: 20
                    }
                }
            },
            Footer: {
                Enabled: !1,
                Duration: 5,
                Width: 320,
                Height: 50,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGameFooter: 40,
                        MobileAdInGameFooter2: 40,
                        MobileAdInGameFooter3: 20
                    }
                }
            },
            End: {
                Enabled: !1,
                Duration: 1,
                Width: 300,
                Height: 250,
                Rotation: {
                    Enabled: !1,
                    Weight: {
                        MobileAdInGameEnd: 40,
                        MobileAdInGameEnd2: 40,
                        MobileAdInGameEnd3: 20
                    }
                }
            }
        }
    },
    Language: {
        Default: "en"
    },
    Branding: {
        Splash: {
            Enabled: !1
        },
        Logo: {
            Enabled: !1,
            Link: "http://google.com",
            Width: 280,
            Height: 34
        }
    },
    MoreGames: {
        Enabled: !0,
        //PKPlay: Link: "http://www.marketjs.com/game/links/mobile"
        Link: ""
    },
    Gamecenter: {
        Enabled: !0
    }
};
var MobileAdInGamePreroll = {
    ad_duration: _SETTINGS.Ad.Mobile.Preroll.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Preroll.Width,
    ad_height: _SETTINGS.Ad.Mobile.Preroll.Height,
    ready_in: _STRINGS.Ad.Mobile.Preroll.ReadyIn,
    loading: _STRINGS.Ad.Mobile.Preroll.Loading,
    close: _STRINGS.Ad.Mobile.Preroll.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Preroll.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Preroll.Rotation.Weight,
                c = b.MobileAdInGamePreroll,
                d =
                c + b.MobileAdInGamePreroll2,
                b = d + b.MobileAdInGamePreroll3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGamePreroll" : e <= d ? this.selectedOverlayName = "MobileAdInGamePreroll2" : e <= b && (this.selectedOverlayName = "MobileAdInGamePreroll3");
            console.log("Ad rotating preroll enabled")
        } else this.selectedOverlayName = "MobileAdInGamePreroll", console.log("Ad rotating preroll disabled");
        console.log("selected:", this.selectedOverlayName);
        this.overlay = $("#" + this.selectedOverlayName);
        this.box = $("#" + this.selectedOverlayName + "-Box");
        this.game = $("#game");
        this.boxContents = {
            footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
            header: $("#" + this.selectedOverlayName + "-Box-Header"),
            close: $("#" + this.selectedOverlayName + "-Box-Close"),
            body: $("#" + this.selectedOverlayName + "-Box-Body")
        };
        this.box.width(this.ad_width);
        this.box.height(this.ad_height);
        this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
        this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() -
            this.boxContents.footer.height()) / 2);
        this.overlay.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = b,
            d = setInterval(function() {
                MobileAdInGamePreroll.boxContents.header.text(MobileAdInGamePreroll.ready_in + c + "...");
                MobileAdInGamePreroll.boxContents.footer.text(MobileAdInGamePreroll.loading);
                c--;
                0 > c && (clearInterval(d), MobileAdInGamePreroll.boxContents.close.css("left", MobileAdInGamePreroll.boxContents.body.width() - 23), MobileAdInGamePreroll.boxContents.close.show(), MobileAdInGamePreroll.boxContents.header.html(MobileAdInGamePreroll.close),
                    MobileAdInGamePreroll.boxContents.footer.text(""))
            }, 1E3)
    },
    Close: function() {
        this.boxContents.close.hide();
        this.overlay.hide()
    }
};
var MobileAdInGameHeader = {
    ad_duration: _SETTINGS.Ad.Mobile.Header.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Header.Width,
    ad_height: _SETTINGS.Ad.Mobile.Header.Height,
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Header.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Header.Rotation.Weight,
                c = b.MobileAdInGameHeader,
                d = c + b.MobileAdInGameHeader2,
                b = d + b.MobileAdInGameHeader3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGameHeader" : e <= d ? this.selectedOverlayName = "MobileAdInGameHeader2" :
                e <= b && (this.selectedOverlayName = "MobileAdInGameHeader3");
            console.log("Ad rotating header enabled")
        } else this.selectedOverlayName = "MobileAdInGameHeader", console.log("Ad rotating header disabled");
        this.div = $("#" + this.selectedOverlayName);
        this.game = $("#game");
        this.div.width(this.ad_width);
        this.div.height(this.ad_height);
        this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
        this.div.css("top", 0);
        this.div.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = setInterval(function() {
            b--;
            0 > b && (MobileAdInGameHeader.div.hide(), clearInterval(c))
        }, 1E3)
    }
};
var MobileAdInGameFooter = {
    ad_duration: _SETTINGS.Ad.Mobile.Footer.Duration,
    ad_width: _SETTINGS.Ad.Mobile.Footer.Width,
    ad_height: _SETTINGS.Ad.Mobile.Footer.Height,
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.Footer.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.Footer.Rotation.Weight,
                c = b.MobileAdInGameFooter,
                d = c + b.MobileAdInGameFooter2,
                b = d + b.MobileAdInGameFooter3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGameFooter" : e <= d ? this.selectedOverlayName = "MobileAdInGameFooter2" :
                e <= b && (this.selectedOverlayName = "MobileAdInGameFooter3");
            console.log("Ad rotating footer enabled")
        } else this.selectedOverlayName = "MobileAdInGameFooter", console.log("Ad rotating footer disabled");
        this.div = $("#" + this.selectedOverlayName);
        this.game = $("#game");
        this.div.width(this.ad_width);
        this.div.height(this.ad_height);
        this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2);
        this.div.css("top", this.game.height() - this.div.height() - 5);
        this.div.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = setInterval(function() {
            b--;
            0 > b && (MobileAdInGameFooter.div.hide(), clearInterval(c))
        }, 1E3)
    }
};
var MobileAdInGameEnd = {
    ad_duration: _SETTINGS.Ad.Mobile.End.Duration,
    ad_width: _SETTINGS.Ad.Mobile.End.Width,
    ad_height: _SETTINGS.Ad.Mobile.End.Height,
    ready_in: _STRINGS.Ad.Mobile.End.ReadyIn,
    loading: _STRINGS.Ad.Mobile.End.Loading,
    close: _STRINGS.Ad.Mobile.End.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    Initialize: function() {
        if (_SETTINGS.Ad.Mobile.End.Rotation.Enabled) {
            var b = _SETTINGS.Ad.Mobile.End.Rotation.Weight,
                c = b.MobileAdInGameEnd,
                d = c + b.MobileAdInGameEnd2,
                b = d + b.MobileAdInGameEnd3,
                e = Math.floor(100 * Math.random());
            console.log("seed: ", e);
            e <= c ? this.selectedOverlayName = "MobileAdInGameEnd" : e <= d ? this.selectedOverlayName = "MobileAdInGameEnd2" : e <= b && (this.selectedOverlayName = "MobileAdInGameEnd3");
            console.log("Ad rotating end enabled")
        } else this.selectedOverlayName = "MobileAdInGameEnd", console.log("Ad rotating end disabled");
        console.log("selected:", this.selectedOverlayName);
        this.overlay = $("#" + this.selectedOverlayName);
        this.box = $("#" + this.selectedOverlayName + "-Box");
        this.game = $("#game");
        this.boxContents = {
            footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
            header: $("#" + this.selectedOverlayName + "-Box-Header"),
            close: $("#" + this.selectedOverlayName + "-Box-Close"),
            body: $("#" + this.selectedOverlayName + "-Box-Body")
        };
        this.box.width(this.ad_width);
        this.box.height(this.ad_height);
        this.box.css("left", (this.overlay.width() - this.box.width()) / 2);
        this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() - this.boxContents.footer.height()) / 2);
        this.overlay.show(this.Timer(this.ad_duration))
    },
    Timer: function(b) {
        var c = b,
            d = setInterval(function() {
                MobileAdInGameEnd.boxContents.header.text(MobileAdInGameEnd.ready_in + c + "...");
                MobileAdInGameEnd.boxContents.footer.text(MobileAdInGameEnd.loading);
                c--;
                0 > c && (clearInterval(d), MobileAdInGameEnd.boxContents.close.css("left", MobileAdInGameEnd.boxContents.body.width() - 23), MobileAdInGameEnd.boxContents.close.show(), MobileAdInGameEnd.boxContents.header.html(MobileAdInGameEnd.close), MobileAdInGameEnd.boxContents.footer.text(""))
            }, 1E3)
    },
    Close: function() {
        this.boxContents.close.hide();
        this.overlay.hide()
    }
};
(function(b, c) {
    function d(b, j, z) {
        if (z === c && 1 === b.nodeType)
            if (z = "data-" + j.replace(sc, "-$1").toLowerCase(), z = b.getAttribute(z), "string" == typeof z) {
                try {
                    z = "true" === z ? !0 : "false" === z ? !1 : "null" === z ? null : +z + "" === z ? +z : tc.test(z) ? f.parseJSON(z) : z
                } catch (d) {}
                f.data(b, j, z)
            } else z = c;
        return z
    }

    function e(b) {
        for (var j in b)
            if (!("data" === j && f.isEmptyObject(b[j])) && "toJSON" !== j) return !1;
        return !0
    }

    function g() {
        return !1
    }

    function l() {
        return !0
    }

    function p(b) {
        return !b || !b.parentNode || 11 === b.parentNode.nodeType
    }

    function x(b,
        j) {
        do b = b[j]; while (b && 1 !== b.nodeType);
        return b
    }

    function q(b, j, c) {
        j = j || 0;
        if (f.isFunction(j)) return f.grep(b, function(b, s) {
            return !!j.call(b, s, b) === c
        });
        if (j.nodeType) return f.grep(b, function(b) {
            return b === j === c
        });
        if ("string" == typeof j) {
            var d = f.grep(b, function(b) {
                return 1 === b.nodeType
            });
            if (uc.test(j)) return f.filter(j, d, !c);
            j = f.filter(j, d)
        }
        return f.grep(b, function(b) {
            return 0 <= f.inArray(b, j) === c
        })
    }

    function u(b) {
        var j = wb.split("|");
        b = b.createDocumentFragment();
        if (b.createElement)
            for (; j.length;) b.createElement(j.pop());
        return b
    }

    function y(b, j) {
        if (1 === j.nodeType && f.hasData(b)) {
            var c, d, A;
            d = f._data(b);
            var e = f._data(j, d),
                t = d.events;
            if (t)
                for (c in delete e.handle, e.events = {}, t) {
                    d = 0;
                    for (A = t[c].length; d < A; d++) f.event.add(j, c, t[c][d])
                }
            e.data && (e.data = f.extend({}, e.data))
        }
    }

    function m(b, j) {
        var c;
        1 === j.nodeType && (j.clearAttributes && j.clearAttributes(), j.mergeAttributes && j.mergeAttributes(b), c = j.nodeName.toLowerCase(), "object" === c ? (j.parentNode && (j.outerHTML = b.outerHTML), f.support.html5Clone && b.innerHTML && !f.trim(j.innerHTML) &&
            (j.innerHTML = b.innerHTML)) : "input" === c && xb.test(b.type) ? (j.defaultChecked = j.checked = b.checked, j.value !== b.value && (j.value = b.value)) : "option" === c ? j.selected = b.defaultSelected : "input" === c || "textarea" === c ? j.defaultValue = b.defaultValue : "script" === c && j.text !== b.text && (j.text = b.text), j.removeAttribute(f.expando))
    }

    function n(b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : "undefined" != typeof b.querySelectorAll ? b.querySelectorAll("*") : []
    }

    function r(b) {
        xb.test(b.type) && (b.defaultChecked =
            b.checked)
    }

    function v(b, j) {
        if (j in b) return j;
        for (var c = j.charAt(0).toUpperCase() + j.slice(1), f = j, d = yb.length; d--;)
            if (j = yb[d] + c, j in b) return j;
        return f
    }

    function N(b, j) {
        return b = j || b, "none" === f.css(b, "display") || !f.contains(b.ownerDocument, b)
    }

    function D(b, j) {
        for (var c, d, A = [], e = 0, t = b.length; e < t; e++) c = b[e], c.style && (A[e] = f._data(c, "olddisplay"), j ? (!A[e] && "none" === c.style.display && (c.style.display = ""), "" === c.style.display && N(c) && (A[e] = f._data(c, "olddisplay", P(c.nodeName)))) : (d = Q(c, "display"), !A[e] && "none" !==
            d && f._data(c, "olddisplay", d)));
        for (e = 0; e < t; e++)
            if (c = b[e], c.style && (!j || "none" === c.style.display || "" === c.style.display)) c.style.display = j ? A[e] || "" : "none";
        return b
    }

    function C(b, j, c) {
        return (b = vc.exec(j)) ? Math.max(0, b[1] - (c || 0)) + (b[2] || "px") : j
    }

    function Xa(b, j, c, d) {
        j = c === (d ? "border" : "content") ? 4 : "width" === j ? 1 : 0;
        for (var A = 0; 4 > j; j += 2) "margin" === c && (A += f.css(b, c + ea[j], !0)), d ? ("content" === c && (A -= parseFloat(Q(b, "padding" + ea[j])) || 0), "margin" !== c && (A -= parseFloat(Q(b, "border" + ea[j] + "Width")) || 0)) : (A += parseFloat(Q(b,
            "padding" + ea[j])) || 0, "padding" !== c && (A += parseFloat(Q(b, "border" + ea[j] + "Width")) || 0));
        return A
    }

    function G(b, j, c) {
        var d = "width" === j ? b.offsetWidth : b.offsetHeight,
            A = !0,
            e = f.support.boxSizing && "border-box" === f.css(b, "boxSizing");
        if (0 >= d || null == d) {
            d = Q(b, j);
            if (0 > d || null == d) d = b.style[j];
            if (ya.test(d)) return d;
            A = e && (f.support.boxSizingReliable || d === b.style[j]);
            d = parseFloat(d) || 0
        }
        return d + Xa(b, j, c || (e ? "border" : "content"), A) + "px"
    }

    function P(b) {
        if (Ya[b]) return Ya[b];
        var j = f("<" + b + ">").appendTo(B.body),
            c = j.css("display");
        j.remove();
        if ("none" === c || "" === c) {
            la = B.body.appendChild(la || f.extend(B.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!ma || !la.createElement) ma = (la.contentWindow || la.contentDocument).document, ma.write("<!doctype html><html><body>"), ma.close();
            j = ma.body.appendChild(ma.createElement(b));
            c = Q(j, "display");
            B.body.removeChild(la)
        }
        return Ya[b] = c, c
    }

    function M(b, j, c, d) {
        var A;
        if (f.isArray(j)) f.each(j, function(j, f) {
            c || wc.test(b) ? d(b, f) : M(b + "[" + ("object" == typeof f ? j : "") + "]", f, c, d)
        });
        else if (!c &&
            "object" === f.type(j))
            for (A in j) M(b + "[" + A + "]", j[A], c, d);
        else d(b, j)
    }

    function za(b) {
        return function(j, c) {
            "string" != typeof j && (c = j, j = "*");
            var d, A, e = j.toLowerCase().split(fa),
                t = 0,
                m = e.length;
            if (f.isFunction(c))
                for (; t < m; t++) d = e[t], (A = /^\+/.test(d)) && (d = d.substr(1) || "*"), d = b[d] = b[d] || [], d[A ? "unshift" : "push"](c)
        }
    }

    function na(b, j, z, f, d, e) {
        d = d || j.dataTypes[0];
        e = e || {};
        e[d] = !0;
        var t;
        d = b[d];
        for (var m = 0, g = d ? d.length : 0, n = b === Za; m < g && (n || !t); m++) t = d[m](j, z, f), "string" == typeof t && (!n || e[t] ? t = c : (j.dataTypes.unshift(t),
            t = na(b, j, z, f, t, e)));
        return (n || !t) && !e["*"] && (t = na(b, j, z, f, "*", e)), t
    }

    function sa(b, j) {
        var z, d, A = f.ajaxSettings.flatOptions || {};
        for (z in j) j[z] !== c && ((A[z] ? b : d || (d = {}))[z] = j[z]);
        d && f.extend(!0, b, d)
    }

    function zb() {
        try {
            return new b.XMLHttpRequest
        } catch (s) {}
    }

    function Ab() {
        return setTimeout(function() {
            Aa = c
        }, 0), Aa = f.now()
    }

    function Bb(b, j, c) {
        var d, A = 0,
            e = Ba.length,
            t = f.Deferred().always(function() {
                delete m.elem
            }),
            m = function() {
                for (var j = Aa || Ab(), j = Math.max(0, g.startTime + g.duration - j), c = 1 - (j / g.duration || 0), z =
                    0, d = g.tweens.length; z < d; z++) g.tweens[z].run(c);
                return t.notifyWith(b, [g, c, j]), 1 > c && d ? j : (t.resolveWith(b, [g]), !1)
            },
            g = t.promise({
                elem: b,
                props: f.extend({}, j),
                opts: f.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: j,
                originalOptions: c,
                startTime: Aa || Ab(),
                duration: c.duration,
                tweens: [],
                createTween: function(j, c) {
                    var z = f.Tween(b, g.opts, j, c, g.opts.specialEasing[j] || g.opts.easing);
                    return g.tweens.push(z), z
                },
                stop: function(j) {
                    for (var c = 0, z = j ? g.tweens.length : 0; c < z; c++) g.tweens[c].run(1);
                    return j ? t.resolveWith(b, [g, j]) : t.rejectWith(b, [g, j]), this
                }
            });
        j = g.props;
        c = g.opts.specialEasing;
        var n, l, r, q;
        for (d in j)
            if (n = f.camelCase(d), l = c[n], r = j[d], f.isArray(r) && (l = r[1], r = j[d] = r[0]), d !== n && (j[n] = r, delete j[d]), (q = f.cssHooks[n]) && "expand" in q)
                for (d in r = q.expand(r), delete j[n], r) d in j || (j[d] = r[d], c[d] = l);
            else c[n] = l;
        for (; A < e; A++)
            if (d = Ba[A].call(g, b, j, g.opts)) return d;
        var p = g;
        f.each(j, function(b, s) {
            for (var j = (ta[b] || []).concat(ta["*"]), c = 0, z = j.length; c < z && !j[c].call(p, b, s); c++);
        });
        return f.isFunction(g.opts.start) && g.opts.start.call(b,
            g), f.fx.timer(f.extend(m, {
            anim: g,
            queue: g.opts.queue,
            elem: b
        })), g.progress(g.opts.progress).done(g.opts.done, g.opts.complete).fail(g.opts.fail).always(g.opts.always)
    }

    function S(b, j, c, d, f) {
        return new S.prototype.init(b, j, c, d, f)
    }

    function Ca(b, j) {
        var c, d = {
                height: b
            },
            f = 0;
        for (j = j ? 1 : 0; 4 > f; f += 2 - j) c = ea[f], d["margin" + c] = d["padding" + c] = b;
        return j && (d.opacity = d.width = b), d
    }

    function Cb(b) {
        return f.isWindow(b) ? b : 9 === b.nodeType ? b.defaultView || b.parentWindow : !1
    }
    var Db, Da, B = b.document,
        yc = b.location,
        zc = b.navigator,
        Ac =
        b.jQuery,
        Bc = b.$,
        Eb = Array.prototype.push,
        aa = Array.prototype.slice,
        Fb = Array.prototype.indexOf,
        Cc = Object.prototype.toString,
        $a = Object.prototype.hasOwnProperty,
        ab = String.prototype.trim,
        f = function(b, j) {
            return new f.fn.init(b, j, Db)
        },
        Ea = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        Dc = /\S/,
        fa = /\s+/,
        Ec = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Fc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Gb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Gc = /^[\],:{}\s]*$/,
        Hc = /(?:^|:|,)(?:\s*\[)+/g,
        Ic = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Jc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        Kc = /^-ms-/,
        Lc = /-([\da-z])/gi,
        Mc = function(b, j) {
            return (j + "").toUpperCase()
        },
        Fa = function() {
            B.addEventListener ? (B.removeEventListener("DOMContentLoaded", Fa, !1), f.ready()) : "complete" === B.readyState && (B.detachEvent("onreadystatechange", Fa), f.ready())
        },
        Hb = {};
    f.fn = f.prototype = {
        constructor: f,
        init: function(b, j, z) {
            var d, A;
            if (!b) return this;
            if (b.nodeType) return this.context = this[0] = b, this.length = 1, this;
            if ("string" == typeof b) {
                "<" === b.charAt(0) && ">" === b.charAt(b.length - 1) && 3 <= b.length ? d = [null, b, null] : d = Fc.exec(b);
                if (d && (d[1] || !j)) {
                    if (d[1]) return j = j instanceof f ? j[0] : j, A = j && j.nodeType ? j.ownerDocument || j : B, b = f.parseHTML(d[1], A, !0), Gb.test(d[1]) && f.isPlainObject(j) && this.attr.call(b, j, !0), f.merge(this, b);
                    if ((j = B.getElementById(d[2])) && j.parentNode) {
                        if (j.id !== d[2]) return z.find(b);
                        this.length = 1;
                        this[0] = j
                    }
                    return this.context = B, this.selector = b, this
                }
                return !j || j.jquery ? (j || z).find(b) : this.constructor(j).find(b)
            }
            return f.isFunction(b) ? z.ready(b) : (b.selector !== c && (this.selector = b.selector, this.context = b.context), f.makeArray(b,
                this))
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return aa.call(this)
        },
        get: function(b) {
            return null == b ? this.toArray() : 0 > b ? this[this.length + b] : this[b]
        },
        pushStack: function(b, j, c) {
            b = f.merge(this.constructor(), b);
            return b.prevObject = this, b.context = this.context, "find" === j ? b.selector = this.selector + (this.selector ? " " : "") + c : j && (b.selector = this.selector + "." + j + "(" + c + ")"), b
        },
        each: function(b, j) {
            return f.each(this, b, j)
        },
        ready: function(b) {
            return f.ready.promise().done(b),
                this
        },
        eq: function(b) {
            return b = +b, -1 === b ? this.slice(b) : this.slice(b, b + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(aa.apply(this, arguments), "slice", aa.call(arguments).join(","))
        },
        map: function(b) {
            return this.pushStack(f.map(this, function(j, c) {
                return b.call(j, c, j)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Eb,
        sort: [].sort,
        splice: [].splice
    };
    f.fn.init.prototype = f.fn;
    f.extend = f.fn.extend = function() {
        var b,
            j, z, d, A, e, t = arguments[0] || {},
            g = 1,
            m = arguments.length,
            n = !1;
        "boolean" == typeof t && (n = t, t = arguments[1] || {}, g = 2);
        "object" != typeof t && !f.isFunction(t) && (t = {});
        for (m === g && (t = this, --g); g < m; g++)
            if (null != (b = arguments[g]))
                for (j in b) z = t[j], d = b[j], t !== d && (n && d && (f.isPlainObject(d) || (A = f.isArray(d))) ? (A ? (A = !1, e = z && f.isArray(z) ? z : []) : e = z && f.isPlainObject(z) ? z : {}, t[j] = f.extend(n, e, d)) : d !== c && (t[j] = d));
        return t
    };
    f.extend({
        noConflict: function(s) {
            return b.$ === f && (b.$ = Bc), s && b.jQuery === f && (b.jQuery = Ac), f
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(b) {
            b ? f.readyWait++ : f.ready(!0)
        },
        ready: function(b) {
            if (!(!0 === b ? --f.readyWait : f.isReady)) {
                if (!B.body) return setTimeout(f.ready, 1);
                f.isReady = !0;
                !0 !== b && 0 < --f.readyWait || (Da.resolveWith(B, [f]), f.fn.trigger && f(B).trigger("ready").off("ready"))
            }
        },
        isFunction: function(b) {
            return "function" === f.type(b)
        },
        isArray: Array.isArray || function(b) {
            return "array" === f.type(b)
        },
        isWindow: function(b) {
            return null != b && b == b.window
        },
        isNumeric: function(b) {
            return !isNaN(parseFloat(b)) && isFinite(b)
        },
        type: function(b) {
            return null == b ? String(b) : Hb[Cc.call(b)] || "object"
        },
        isPlainObject: function(b) {
            if (!b || "object" !== f.type(b) || b.nodeType || f.isWindow(b)) return !1;
            try {
                if (b.constructor && !$a.call(b, "constructor") && !$a.call(b.constructor.prototype, "isPrototypeOf")) return !1
            } catch (j) {
                return !1
            }
            for (var d in b);
            return d === c || $a.call(b, d)
        },
        isEmptyObject: function(b) {
            for (var j in b) return !1;
            return !0
        },
        error: function(b) {
            throw Error(b);
        },
        parseHTML: function(b, j, c) {
            var d;
            return !b || "string" != typeof b ? null : ("boolean" ==
                typeof j && (c = j, j = 0), j = j || B, (d = Gb.exec(b)) ? [j.createElement(d[1])] : (d = f.buildFragment([b], j, c ? null : []), f.merge([], (d.cacheable ? f.clone(d.fragment) : d.fragment).childNodes)))
        },
        parseJSON: function(s) {
            if (!s || "string" != typeof s) return null;
            s = f.trim(s);
            if (b.JSON && b.JSON.parse) return b.JSON.parse(s);
            if (Gc.test(s.replace(Ic, "@").replace(Jc, "]").replace(Hc, ""))) return (new Function("return " + s))();
            f.error("Invalid JSON: " + s)
        },
        parseXML: function(s) {
            var j, d;
            if (!s || "string" != typeof s) return null;
            try {
                b.DOMParser ?
                    (d = new DOMParser, j = d.parseFromString(s, "text/xml")) : (j = new ActiveXObject("Microsoft.XMLDOM"), j.async = "false", j.loadXML(s))
            } catch (F) {
                j = c
            }
            return (!j || !j.documentElement || j.getElementsByTagName("parsererror").length) && f.error("Invalid XML: " + s), j
        },
        noop: function() {},
        globalEval: function(s) {
            s && Dc.test(s) && (b.execScript || function(s) {
                b.eval.call(b, s)
            })(s)
        },
        camelCase: function(b) {
            return b.replace(Kc, "ms-").replace(Lc, Mc)
        },
        nodeName: function(b, j) {
            return b.nodeName && b.nodeName.toLowerCase() === j.toLowerCase()
        },
        each: function(b, j, d) {
            var F, A = 0,
                e = b.length,
                t = e === c || f.isFunction(b);
            if (d)
                if (t)
                    for (F in b) {
                        if (!1 === j.apply(b[F], d)) break
                    } else
                        for (; A < e && !1 !== j.apply(b[A++], d););
                else if (t)
                for (F in b) {
                    if (!1 === j.call(b[F], F, b[F])) break
                } else
                    for (; A < e && !1 !== j.call(b[A], A, b[A++]););
            return b
        },
        trim: ab && !ab.call("\ufeff\u00a0") ? function(b) {
            return null == b ? "" : ab.call(b)
        } : function(b) {
            return null == b ? "" : (b + "").replace(Ec, "")
        },
        makeArray: function(b, j) {
            var c, d = j || [];
            return null != b && (c = f.type(b), null == b.length || "string" === c || "function" ===
                c || "regexp" === c || f.isWindow(b) ? Eb.call(d, b) : f.merge(d, b)), d
        },
        inArray: function(b, j, c) {
            var d;
            if (j) {
                if (Fb) return Fb.call(j, b, c);
                d = j.length;
                for (c = c ? 0 > c ? Math.max(0, d + c) : c : 0; c < d; c++)
                    if (c in j && j[c] === b) return c
            }
            return -1
        },
        merge: function(b, j) {
            var d = j.length,
                f = b.length,
                A = 0;
            if ("number" == typeof d)
                for (; A < d; A++) b[f++] = j[A];
            else
                for (; j[A] !== c;) b[f++] = j[A++];
            return b.length = f, b
        },
        grep: function(b, j, c) {
            var d, f = [],
                e = 0,
                t = b.length;
            for (c = !!c; e < t; e++) d = !!j(b[e], e), c !== d && f.push(b[e]);
            return f
        },
        map: function(b, j, d) {
            var F,
                A, e = [],
                t = 0,
                g = b.length;
            if (b instanceof f || g !== c && "number" == typeof g && (0 < g && b[0] && b[g - 1] || 0 === g || f.isArray(b)))
                for (; t < g; t++) F = j(b[t], t, d), null != F && (e[e.length] = F);
            else
                for (A in b) F = j(b[A], A, d), null != F && (e[e.length] = F);
            return e.concat.apply([], e)
        },
        guid: 1,
        proxy: function(b, j) {
            var d, F, A;
            return "string" == typeof j && (d = b[j], j = b, b = d), f.isFunction(b) ? (F = aa.call(arguments, 2), A = function() {
                return b.apply(j, F.concat(aa.call(arguments)))
            }, A.guid = b.guid = b.guid || f.guid++, A) : c
        },
        access: function(b, j, d, F, A, e, t) {
            var g, m =
                null == d,
                n = 0,
                l = b.length;
            if (d && "object" == typeof d) {
                for (n in d) f.access(b, j, n, d[n], 1, e, F);
                A = 1
            } else if (F !== c) {
                g = t === c && f.isFunction(F);
                m && (g ? (g = j, j = function(b, s, j) {
                    return g.call(f(b), j)
                }) : (j.call(b, F), j = null));
                if (j)
                    for (; n < l; n++) j(b[n], d, g ? F.call(b[n], n, j(b[n], d)) : F, t);
                A = 1
            }
            return A ? b : m ? j.call(b) : l ? j(b[0], d) : e
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    f.ready.promise = function(s) {
        if (!Da)
            if (Da = f.Deferred(), "complete" === B.readyState) setTimeout(f.ready, 1);
            else if (B.addEventListener) B.addEventListener("DOMContentLoaded",
            Fa, !1), b.addEventListener("load", f.ready, !1);
        else {
            B.attachEvent("onreadystatechange", Fa);
            b.attachEvent("onload", f.ready);
            var j = !1;
            try {
                j = null == b.frameElement && B.documentElement
            } catch (c) {}
            j && j.doScroll && function A() {
                if (!f.isReady) {
                    try {
                        j.doScroll("left")
                    } catch (b) {
                        return setTimeout(A, 50)
                    }
                    f.ready()
                }
            }()
        }
        return Da.promise(s)
    };
    f.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(b, j) {
        Hb["[object " + j + "]"] = j.toLowerCase()
    });
    Db = f(B);
    var Ib = {};
    f.Callbacks = function(b) {
        var j;
        if ("string" ==
            typeof b) {
            if (!(j = Ib[b])) {
                j = b;
                var d = Ib[j] = {};
                j = (f.each(j.split(fa), function(b, s) {
                    d[s] = !0
                }), d)
            }
        } else j = f.extend({}, b);
        b = j;
        var F, A, e, t, g, m, n = [],
            l = !b.once && [],
            r = function(j) {
                F = b.memory && j;
                A = !0;
                m = t || 0;
                t = 0;
                g = n.length;
                for (e = !0; n && m < g; m++)
                    if (!1 === n[m].apply(j[0], j[1]) && b.stopOnFalse) {
                        F = !1;
                        break
                    }
                e = !1;
                n && (l ? l.length && r(l.shift()) : F ? n = [] : q.disable())
            },
            q = {
                add: function() {
                    if (n) {
                        var j = n.length;
                        (function xc(j) {
                            f.each(j, function(j, c) {
                                var d = f.type(c);
                                "function" === d && (!b.unique || !q.has(c)) ? n.push(c) : c && c.length && "string" !==
                                    d && xc(c)
                            })
                        })(arguments);
                        e ? g = n.length : F && (t = j, r(F))
                    }
                    return this
                },
                remove: function() {
                    return n && f.each(arguments, function(b, s) {
                        for (var j; - 1 < (j = f.inArray(s, n, j));) n.splice(j, 1), e && (j <= g && g--, j <= m && m--)
                    }), this
                },
                has: function(b) {
                    return -1 < f.inArray(b, n)
                },
                empty: function() {
                    return n = [], this
                },
                disable: function() {
                    return n = l = F = c, this
                },
                disabled: function() {
                    return !n
                },
                lock: function() {
                    return l = c, F || q.disable(), this
                },
                locked: function() {
                    return !l
                },
                fireWith: function(b, s) {
                    return s = s || [], s = [b, s.slice ? s.slice() : s], n && (!A || l) &&
                        (e ? l.push(s) : r(s)), this
                },
                fire: function() {
                    return q.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!A
                }
            };
        return q
    };
    f.extend({
        Deferred: function(b) {
            var j = [
                    ["resolve", "done", f.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", f.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", f.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var b = arguments;
                        return f.Deferred(function(s) {
                            f.each(j, function(j,
                                c) {
                                var d = c[0],
                                    z = b[j];
                                e[c[1]](f.isFunction(z) ? function() {
                                    var b = z.apply(this, arguments);
                                    b && f.isFunction(b.promise) ? b.promise().done(s.resolve).fail(s.reject).progress(s.notify) : s[d + "With"](this === e ? s : this, [b])
                                } : s[d])
                            });
                            b = null
                        }).promise()
                    },
                    promise: function(b) {
                        return null != b ? f.extend(b, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, f.each(j, function(b, s) {
                var f = s[2],
                    g = s[3];
                d[s[1]] = f.add;
                g && f.add(function() {
                    c = g
                }, j[b ^ 1][2].disable, j[2][2].lock);
                e[s[0]] = f.fire;
                e[s[0] + "With"] = f.fireWith
            }), d.promise(e), b && b.call(e, e), e
        },
        when: function(b) {
            var j = 0,
                c = aa.call(arguments),
                d = c.length,
                e = 1 !== d || b && f.isFunction(b.promise) ? d : 0,
                g = 1 === e ? b : f.Deferred(),
                t = function(b, s, j) {
                    return function(c) {
                        s[b] = this;
                        j[b] = 1 < arguments.length ? aa.call(arguments) : c;
                        j === m ? g.notifyWith(s, j) : --e || g.resolveWith(s, j)
                    }
                },
                m, n, l;
            if (1 < d) {
                m = Array(d);
                n = Array(d);
                for (l = Array(d); j < d; j++) c[j] && f.isFunction(c[j].promise) ? c[j].promise().done(t(j, l, c)).fail(g.reject).progress(t(j, n, m)) : --e
            }
            return e || g.resolveWith(l, c), g.promise()
        }
    });
    var Nc = f,
        bb, O, Ga, ga, Ha, Ia, T, ha, Ja, cb,
        ua, Jb, J = B.createElement("div");
    J.setAttribute("className", "t");
    J.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    Ga = J.getElementsByTagName("*");
    ga = J.getElementsByTagName("a")[0];
    ga.style.cssText = "top:1px;float:left;opacity:.5";
    if (!Ga || !Ga.length) bb = {};
    else {
        Ha = B.createElement("select");
        Ia = Ha.appendChild(B.createElement("option"));
        T = J.getElementsByTagName("input")[0];
        O = {
            leadingWhitespace: 3 === J.firstChild.nodeType,
            tbody: !J.getElementsByTagName("tbody").length,
            htmlSerialize: !!J.getElementsByTagName("link").length,
            style: /top/.test(ga.getAttribute("style")),
            hrefNormalized: "/a" === ga.getAttribute("href"),
            opacity: /^0.5/.test(ga.style.opacity),
            cssFloat: !!ga.style.cssFloat,
            checkOn: "on" === T.value,
            optSelected: Ia.selected,
            getSetAttribute: "t" !== J.className,
            enctype: !!B.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== B.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === B.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        T.checked = !0;
        O.noCloneChecked = T.cloneNode(!0).checked;
        Ha.disabled = !0;
        O.optDisabled = !Ia.disabled;
        try {
            delete J.test
        } catch (Pd) {
            O.deleteExpando = !1
        }!J.addEventListener && J.attachEvent && J.fireEvent && (J.attachEvent("onclick", Jb = function() {
            O.noCloneEvent = !1
        }), J.cloneNode(!0).fireEvent("onclick"), J.detachEvent("onclick", Jb));
        T = B.createElement("input");
        T.value = "t";
        T.setAttribute("type", "radio");
        O.radioValue = "t" === T.value;
        T.setAttribute("checked",
            "checked");
        T.setAttribute("name", "t");
        J.appendChild(T);
        ha = B.createDocumentFragment();
        ha.appendChild(J.lastChild);
        O.checkClone = ha.cloneNode(!0).cloneNode(!0).lastChild.checked;
        O.appendChecked = T.checked;
        ha.removeChild(T);
        ha.appendChild(J);
        if (J.attachEvent)
            for (cb in {
                submit: !0,
                change: !0,
                focusin: !0
            }) Ja = "on" + cb, (ua = Ja in J) || (J.setAttribute(Ja, "return;"), ua = "function" == typeof J[Ja]), O[cb + "Bubbles"] = ua;
        bb = (f(function() {
            var s, j, c, d, f = B.getElementsByTagName("body")[0];
            f && (s = B.createElement("div"), s.style.cssText =
                "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", f.insertBefore(s, f.firstChild), j = B.createElement("div"), s.appendChild(j), j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c = j.getElementsByTagName("td"), c[0].style.cssText = "padding:0;margin:0;border:0;display:none", ua = 0 === c[0].offsetHeight, c[0].style.display = "", c[1].style.display = "none", O.reliableHiddenOffsets = ua && 0 === c[0].offsetHeight, j.innerHTML = "", j.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                O.boxSizing = 4 === j.offsetWidth, O.doesNotIncludeMarginInBodyOffset = 1 !== f.offsetTop, b.getComputedStyle && (O.pixelPosition = "1%" !== (b.getComputedStyle(j, null) || {}).top, O.boxSizingReliable = "4px" === (b.getComputedStyle(j, null) || {
                    width: "4px"
                }).width, d = B.createElement("div"), d.style.cssText = j.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;", d.style.marginRight = d.style.width = "0", j.style.width = "1px", j.appendChild(d), O.reliableMarginRight = !parseFloat((b.getComputedStyle(d, null) || {}).marginRight)),
                "undefined" != typeof j.style.zoom && (j.innerHTML = "", j.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", O.inlineBlockNeedsLayout = 3 === j.offsetWidth, j.style.display = "block", j.style.overflow = "visible", j.innerHTML = "<div></div>", j.firstChild.style.width = "5px", O.shrinkWrapBlocks = 3 !== j.offsetWidth, s.style.zoom = 1), f.removeChild(s))
        }), ha.removeChild(J), Ga = ga = Ha = Ia = T = ha = J = null, O)
    }
    Nc.support = bb;
    var tc = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        sc = /([A-Z])/g;
    f.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(b) {
            return b = b.nodeType ? f.cache[b[f.expando]] : b[f.expando], !!b && !e(b)
        },
        data: function(b, j, d, F) {
            if (f.acceptData(b)) {
                var e, g, t = f.expando,
                    m = "string" == typeof j,
                    n = b.nodeType,
                    l = n ? f.cache : b,
                    r = n ? b[t] : b[t] && t;
                if (r && l[r] && (F || l[r].data) || !(m && d === c)) {
                    r || (n ? b[t] = r = f.deletedIds.pop() || f.guid++ : r = t);
                    l[r] || (l[r] = {},
                        n || (l[r].toJSON = f.noop));
                    if ("object" == typeof j || "function" == typeof j) F ? l[r] = f.extend(l[r], j) : l[r].data = f.extend(l[r].data, j);
                    return e = l[r], F || (e.data || (e.data = {}), e = e.data), d !== c && (e[f.camelCase(j)] = d), m ? (g = e[j], null == g && (g = e[f.camelCase(j)])) : g = e, g
                }
            }
        },
        removeData: function(b, j, c) {
            if (f.acceptData(b)) {
                var d, A, g, t = b.nodeType,
                    m = t ? f.cache : b,
                    n = t ? b[f.expando] : f.expando;
                if (m[n]) {
                    if (j && (d = c ? m[n] : m[n].data)) {
                        f.isArray(j) || (j in d ? j = [j] : (j = f.camelCase(j), j in d ? j = [j] : j = j.split(" ")));
                        A = 0;
                        for (g = j.length; A < g; A++) delete d[j[A]];
                        if (!(c ? e : f.isEmptyObject)(d)) return
                    }
                    if (c || !(delete m[n].data, !e(m[n]))) t ? f.cleanData([b], !0) : f.support.deleteExpando || m != m.window ? delete m[n] : m[n] = null
                }
            }
        },
        _data: function(b, j, c) {
            return f.data(b, j, c, !0)
        },
        acceptData: function(b) {
            var j = b.nodeName && f.noData[b.nodeName.toLowerCase()];
            return !j || !0 !== j && b.getAttribute("classid") === j
        }
    });
    f.fn.extend({
        data: function(b, j) {
            var z, e, A, g, t, m = this[0],
                n = 0,
                l = null;
            if (b === c) {
                if (this.length && (l = f.data(m), 1 === m.nodeType && !f._data(m, "parsedAttrs"))) {
                    A = m.attributes;
                    for (t = A.length; n <
                        t; n++) g = A[n].name, g.indexOf("data-") || (g = f.camelCase(g.substring(5)), d(m, g, l[g]));
                    f._data(m, "parsedAttrs", !0)
                }
                return l
            }
            return "object" == typeof b ? this.each(function() {
                f.data(this, b)
            }) : (z = b.split(".", 2), z[1] = z[1] ? "." + z[1] : "", e = z[1] + "!", f.access(this, function(j) {
                if (j === c) return l = this.triggerHandler("getData" + e, [z[0]]), l === c && m && (l = f.data(m, b), l = d(m, b, l)), l === c && z[1] ? this.data(z[0]) : l;
                z[1] = j;
                this.each(function() {
                    var c = f(this);
                    c.triggerHandler("setData" + e, z);
                    f.data(this, b, j);
                    c.triggerHandler("changeData" +
                        e, z)
                })
            }, null, j, 1 < arguments.length, null, !1))
        },
        removeData: function(b) {
            return this.each(function() {
                f.removeData(this, b)
            })
        }
    });
    f.extend({
        queue: function(b, j, c) {
            var d;
            if (b) return j = (j || "fx") + "queue", d = f._data(b, j), c && (!d || f.isArray(c) ? d = f._data(b, j, f.makeArray(c)) : d.push(c)), d || []
        },
        dequeue: function(b, j) {
            j = j || "fx";
            var c = f.queue(b, j),
                d = c.length,
                e = c.shift(),
                g = f._queueHooks(b, j),
                t = function() {
                    f.dequeue(b, j)
                };
            "inprogress" === e && (e = c.shift(), d--);
            e && ("fx" === j && c.unshift("inprogress"), delete g.stop, e.call(b, t, g));
            !d && g && g.empty.fire()
        },
        _queueHooks: function(b, j) {
            var c = j + "queueHooks";
            return f._data(b, c) || f._data(b, c, {
                empty: f.Callbacks("once memory").add(function() {
                    f.removeData(b, j + "queue", !0);
                    f.removeData(b, c, !0)
                })
            })
        }
    });
    f.fn.extend({
        queue: function(b, j) {
            var d = 2;
            return "string" != typeof b && (j = b, b = "fx", d--), arguments.length < d ? f.queue(this[0], b) : j === c ? this : this.each(function() {
                var c = f.queue(this, b, j);
                f._queueHooks(this, b);
                "fx" === b && "inprogress" !== c[0] && f.dequeue(this, b)
            })
        },
        dequeue: function(b) {
            return this.each(function() {
                f.dequeue(this,
                    b)
            })
        },
        delay: function(b, j) {
            return b = f.fx ? f.fx.speeds[b] || b : b, j = j || "fx", this.queue(j, function(j, c) {
                var d = setTimeout(j, b);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(b) {
            return this.queue(b || "fx", [])
        },
        promise: function(b, j) {
            var d, e = 1,
                A = f.Deferred(),
                g = this,
                t = this.length,
                m = function() {
                    --e || A.resolveWith(g, [g])
                };
            "string" != typeof b && (j = b, b = c);
            for (b = b || "fx"; t--;)(d = f._data(g[t], b + "queueHooks")) && d.empty && (e++, d.empty.add(m));
            return m(), A.promise(j)
        }
    });
    var ba, Kb, Lb, Mb = /[\t\r\n]/g,
        Oc = /\r/g,
        Pc = /^(?:button|input)$/i,
        Qc = /^(?:button|input|object|select|textarea)$/i,
        Rc = /^a(?:rea|)$/i,
        Nb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Ob = f.support.getSetAttribute;
    f.fn.extend({
        attr: function(b, j) {
            return f.access(this, f.attr, b, j, 1 < arguments.length)
        },
        removeAttr: function(b) {
            return this.each(function() {
                f.removeAttr(this, b)
            })
        },
        prop: function(b, j) {
            return f.access(this, f.prop, b, j, 1 < arguments.length)
        },
        removeProp: function(b) {
            return b = f.propFix[b] ||
                b, this.each(function() {
                    try {
                        this[b] = c, delete this[b]
                    } catch (j) {}
                })
        },
        addClass: function(b) {
            var j, c, d, e, g, t, m;
            if (f.isFunction(b)) return this.each(function(j) {
                f(this).addClass(b.call(this, j, this.className))
            });
            if (b && "string" == typeof b) {
                j = b.split(fa);
                c = 0;
                for (d = this.length; c < d; c++)
                    if (e = this[c], 1 === e.nodeType)
                        if (!e.className && 1 === j.length) e.className = b;
                        else {
                            g = " " + e.className + " ";
                            t = 0;
                            for (m = j.length; t < m; t++) 0 > g.indexOf(" " + j[t] + " ") && (g += j[t] + " ");
                            e.className = f.trim(g)
                        }
            }
            return this
        },
        removeClass: function(b) {
            var j,
                d, e, A, g, t, m;
            if (f.isFunction(b)) return this.each(function(j) {
                f(this).removeClass(b.call(this, j, this.className))
            });
            if (b && "string" == typeof b || b === c) {
                j = (b || "").split(fa);
                t = 0;
                for (m = this.length; t < m; t++)
                    if (e = this[t], 1 === e.nodeType && e.className) {
                        d = (" " + e.className + " ").replace(Mb, " ");
                        A = 0;
                        for (g = j.length; A < g; A++)
                            for (; 0 <= d.indexOf(" " + j[A] + " ");) d = d.replace(" " + j[A] + " ", " ");
                        e.className = b ? f.trim(d) : ""
                    }
            }
            return this
        },
        toggleClass: function(b, j) {
            var c = typeof b,
                d = "boolean" == typeof j;
            return f.isFunction(b) ? this.each(function(c) {
                f(this).toggleClass(b.call(this,
                    c, this.className, j), j)
            }) : this.each(function() {
                if ("string" === c)
                    for (var e, g = 0, t = f(this), m = j, n = b.split(fa); e = n[g++];) m = d ? m : !t.hasClass(e), t[m ? "addClass" : "removeClass"](e);
                else if ("undefined" === c || "boolean" === c) this.className && f._data(this, "__className__", this.className), this.className = this.className || !1 === b ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function(b) {
            b = " " + b + " ";
            for (var j = 0, c = this.length; j < c; j++)
                if (1 === this[j].nodeType && 0 <= (" " + this[j].className + " ").replace(Mb, " ").indexOf(b)) return !0;
            return !1
        },
        val: function(b) {
            var j, d, e, g = this[0];
            if (arguments.length) return e = f.isFunction(b), this.each(function(d) {
                var z, g = f(this);
                if (1 === this.nodeType && (e ? z = b.call(this, d, g.val()) : z = b, null == z ? z = "" : "number" == typeof z ? z += "" : f.isArray(z) && (z = f.map(z, function(b) {
                    return null == b ? "" : b + ""
                })), j = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()], !j || !("set" in j) || j.set(this, z, "value") === c)) this.value = z
            });
            if (g) return j = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()], j && "get" in j && (d = j.get(g,
                "value")) !== c ? d : (d = g.value, "string" == typeof d ? d.replace(Oc, "") : null == d ? "" : d)
        }
    });
    f.extend({
        valHooks: {
            option: {
                get: function(b) {
                    var j = b.attributes.value;
                    return !j || j.specified ? b.value : b.text
                }
            },
            select: {
                get: function(b) {
                    var j, c, d = b.selectedIndex,
                        e = [],
                        g = b.options,
                        t = "select-one" === b.type;
                    if (0 > d) return null;
                    b = t ? d : 0;
                    for (c = t ? d + 1 : g.length; b < c; b++)
                        if (j = g[b], j.selected && (f.support.optDisabled ? !j.disabled : null === j.getAttribute("disabled")) && (!j.parentNode.disabled || !f.nodeName(j.parentNode, "optgroup"))) {
                            j = f(j).val();
                            if (t) return j;
                            e.push(j)
                        }
                    return t && !e.length && g.length ? f(g[d]).val() : e
                },
                set: function(b, j) {
                    var c = f.makeArray(j);
                    return f(b).find("option").each(function() {
                        this.selected = 0 <= f.inArray(f(this).val(), c)
                    }), c.length || (b.selectedIndex = -1), c
                }
            }
        },
        attrFn: {},
        attr: function(b, j, d, e) {
            var g, m, t = b.nodeType;
            if (b && !(3 === t || 8 === t || 2 === t)) {
                if (e && f.isFunction(f.fn[j])) return f(b)[j](d);
                if ("undefined" == typeof b.getAttribute) return f.prop(b, j, d);
                (e = 1 !== t || !f.isXMLDoc(b)) && (j = j.toLowerCase(), m = f.attrHooks[j] || (Nb.test(j) ? Kb :
                    ba));
                if (d !== c) {
                    if (null === d) {
                        f.removeAttr(b, j);
                        return
                    }
                    return m && "set" in m && e && (g = m.set(b, d, j)) !== c ? g : (b.setAttribute(j, d + ""), d)
                }
                return m && "get" in m && e && null !== (g = m.get(b, j)) ? g : (g = b.getAttribute(j), null === g ? c : g)
            }
        },
        removeAttr: function(b, j) {
            var c, d, e, g, t = 0;
            if (j && 1 === b.nodeType)
                for (d = j.split(fa); t < d.length; t++)(e = d[t]) && (c = f.propFix[e] || e, g = Nb.test(e), g || f.attr(b, e, ""), b.removeAttribute(Ob ? e : c), g && c in b && (b[c] = !1))
        },
        attrHooks: {
            type: {
                set: function(b, j) {
                    if (Pc.test(b.nodeName) && b.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && "radio" === j && f.nodeName(b, "input")) {
                        var c = b.value;
                        return b.setAttribute("type", j), c && (b.value = c), j
                    }
                }
            },
            value: {
                get: function(b, j) {
                    return ba && f.nodeName(b, "button") ? ba.get(b, j) : j in b ? b.value : null
                },
                set: function(b, j, c) {
                    if (ba && f.nodeName(b, "button")) return ba.set(b, j, c);
                    b.value = j
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(b, j, d) {
            var e, g, m, t = b.nodeType;
            if (b && !(3 === t || 8 === t || 2 === t)) return m = 1 !== t || !f.isXMLDoc(b), m && (j = f.propFix[j] || j, g = f.propHooks[j]), d !== c ? g && "set" in g && (e = g.set(b, d, j)) !== c ? e : b[j] = d : g && "get" in g && null !== (e = g.get(b, j)) ? e : b[j]
        },
        propHooks: {
            tabIndex: {
                get: function(b) {
                    var j = b.getAttributeNode("tabindex");
                    return j && j.specified ? parseInt(j.value, 10) : Qc.test(b.nodeName) || Rc.test(b.nodeName) && b.href ? 0 : c
                }
            }
        }
    });
    Kb = {
        get: function(b,
            j) {
            var d, e = f.prop(b, j);
            return !0 === e || "boolean" != typeof e && (d = b.getAttributeNode(j)) && !1 !== d.nodeValue ? j.toLowerCase() : c
        },
        set: function(b, j, c) {
            var d;
            return !1 === j ? f.removeAttr(b, c) : (d = f.propFix[c] || c, d in b && (b[d] = !0), b.setAttribute(c, c.toLowerCase())), c
        }
    };
    Ob || (Lb = {
        name: !0,
        id: !0,
        coords: !0
    }, ba = f.valHooks.button = {
        get: function(b, j) {
            var d;
            return d = b.getAttributeNode(j), d && (Lb[j] ? "" !== d.value : d.specified) ? d.value : c
        },
        set: function(b, c, d) {
            var f = b.getAttributeNode(d);
            return f || (f = B.createAttribute(d), b.setAttributeNode(f)),
                f.value = c + ""
        }
    }, f.each(["width", "height"], function(b, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            set: function(b, s) {
                if ("" === s) return b.setAttribute(c, "auto"), s
            }
        })
    }), f.attrHooks.contenteditable = {
        get: ba.get,
        set: function(b, c, d) {
            "" === c && (c = "false");
            ba.set(b, c, d)
        }
    });
    f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(b, j) {
        f.attrHooks[j] = f.extend(f.attrHooks[j], {
            get: function(b) {
                b = b.getAttribute(j, 2);
                return null === b ? c : b
            }
        })
    });
    f.support.style || (f.attrHooks.style = {
        get: function(b) {
            return b.style.cssText.toLowerCase() ||
                c
        },
        set: function(b, c) {
            return b.style.cssText = c + ""
        }
    });
    f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(b) {
            b = b.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }));
    f.support.enctype || (f.propFix.enctype = "encoding");
    f.support.checkOn || f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = {
            get: function(b) {
                return null === b.getAttribute("value") ? "on" : b.value
            }
        }
    });
    f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(b, c) {
                if (f.isArray(c)) return b.checked = 0 <= f.inArray(f(b).val(), c)
            }
        })
    });
    var db = /^(?:textarea|input|select)$/i,
        Pb = /^([^\.]*|)(?:\.(.+)|)$/,
        Sc = /(?:^|\s)hover(\.\S+|)\b/,
        Tc = /^key/,
        Uc = /^(?:mouse|contextmenu)|click/,
        Qb = /^(?:focusinfocus|focusoutblur)$/,
        Rb = function(b) {
            return f.event.special.hover ? b : b.replace(Sc, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function(b, j, d, e, g) {
            var m, t, n, l, r, q, p, u, v;
            if (!(3 === b.nodeType || 8 === b.nodeType || !j || !d || !(m = f._data(b)))) {
                d.handler && (p = d, d = p.handler, g = p.selector);
                d.guid || (d.guid = f.guid++);
                (n = m.events) || (m.events = n = {});
                (t = m.handle) || (m.handle = t = function(b) {
                    return "undefined" != typeof f && (!b || f.event.triggered !== b.type) ? f.event.dispatch.apply(t.elem, arguments) : c
                }, t.elem = b);
                j = f.trim(Rb(j)).split(" ");
                for (m = 0; m < j.length; m++) {
                    l = Pb.exec(j[m]) || [];
                    r = l[1];
                    q = (l[2] || "").split(".").sort();
                    v = f.event.special[r] || {};
                    r = (g ? v.delegateType : v.bindType) || r;
                    v = f.event.special[r] || {};
                    l = f.extend({
                        type: r,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        needsContext: g && f.expr.match.needsContext.test(g),
                        namespace: q.join(".")
                    }, p);
                    u = n[r];
                    if (!u && (u = n[r] = [], u.delegateCount = 0, !v.setup || !1 === v.setup.call(b, e, q, t))) b.addEventListener ? b.addEventListener(r, t, !1) : b.attachEvent && b.attachEvent("on" + r, t);
                    v.add && (v.add.call(b, l), l.handler.guid || (l.handler.guid = d.guid));
                    g ? u.splice(u.delegateCount++, 0, l) : u.push(l);
                    f.event.global[r] = !0
                }
                b = null
            }
        },
        global: {},
        remove: function(b, c, d, e, g) {
            var m, t, n, l, r, q, p, u, v, y, x = f.hasData(b) && f._data(b);
            if (x && (p = x.events)) {
                c = f.trim(Rb(c || "")).split(" ");
                for (m = 0; m < c.length; m++)
                    if (t = Pb.exec(c[m]) || [], n = l = t[1], t = t[2], n) {
                        u = f.event.special[n] || {};
                        n = (e ? u.delegateType : u.bindType) || n;
                        v = p[n] || [];
                        r = v.length;
                        t = t ? RegExp("(^|\\.)" + t.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (q = 0; q < v.length; q++) y = v[q], (g || l === y.origType) && (!d || d.guid === y.guid) && (!t || t.test(y.namespace)) && (!e || e === y.selector || "**" === e && y.selector) && (v.splice(q--, 1), y.selector && v.delegateCount--, u.remove && u.remove.call(b, y));
                        0 === v.length && r !== v.length && ((!u.teardown || !1 === u.teardown.call(b, t, x.handle)) && f.removeEvent(b,
                            n, x.handle), delete p[n])
                    } else
                        for (n in p) f.event.remove(b, n + c[m], d, e, !0);
                f.isEmptyObject(p) && (delete x.handle, f.removeData(b, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(s, j, d, e) {
            if (!d || 3 !== d.nodeType && 8 !== d.nodeType) {
                var g, m, t, n, l, r, q, p = s.type || s;
                n = [];
                if (!Qb.test(p + f.event.triggered) && (0 <= p.indexOf("!") && (p = p.slice(0, -1), g = !0), 0 <= p.indexOf(".") && (n = p.split("."), p = n.shift(), n.sort()), d && !f.event.customEvent[p] || f.event.global[p]))
                    if (s = "object" == typeof s ? s[f.expando] ?
                        s : new f.Event(p, s) : new f.Event(p), s.type = p, s.isTrigger = !0, s.exclusive = g, s.namespace = n.join("."), s.namespace_re = s.namespace ? RegExp("(^|\\.)" + n.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n = 0 > p.indexOf(":") ? "on" + p : "", d) {
                        if (s.result = c, s.target || (s.target = d), j = null != j ? f.makeArray(j) : [], j.unshift(s), l = f.event.special[p] || {}, !(l.trigger && !1 === l.trigger.apply(d, j))) {
                            q = [
                                [d, l.bindType || p]
                            ];
                            if (!e && !l.noBubble && !f.isWindow(d)) {
                                m = l.delegateType || p;
                                g = Qb.test(m + p) ? d : d.parentNode;
                                for (t = d; g; g = g.parentNode) q.push([g, m]),
                                    t = g;
                                t === (d.ownerDocument || B) && q.push([t.defaultView || t.parentWindow || b, m])
                            }
                            for (m = 0; m < q.length && !s.isPropagationStopped(); m++) g = q[m][0], s.type = q[m][1], (r = (f._data(g, "events") || {})[s.type] && f._data(g, "handle")) && r.apply(g, j), (r = n && g[n]) && f.acceptData(g) && r.apply && !1 === r.apply(g, j) && s.preventDefault();
                            return s.type = p, !e && !s.isDefaultPrevented() && (!l._default || !1 === l._default.apply(d.ownerDocument, j)) && ("click" !== p || !f.nodeName(d, "a")) && f.acceptData(d) && n && d[p] && ("focus" !== p && "blur" !== p || 0 !== s.target.offsetWidth) &&
                                !f.isWindow(d) && (t = d[n], t && (d[n] = null), f.event.triggered = p, d[p](), f.event.triggered = c, t && (d[n] = t)), s.result
                        }
                    } else
                        for (m in d = f.cache, d) d[m].events && d[m].events[p] && f.event.trigger(s, j, d[m].handle.elem, !0)
            }
        },
        dispatch: function(s) {
            s = f.event.fix(s || b.event);
            var j, d, e, g, m, t, n = (f._data(this, "events") || {})[s.type] || [],
                l = n.delegateCount,
                r = aa.call(arguments),
                p = !s.exclusive && !s.namespace,
                q = f.event.special[s.type] || {},
                u = [];
            r[0] = s;
            s.delegateTarget = this;
            if (!(q.preDispatch && !1 === q.preDispatch.call(this, s))) {
                if (l &&
                    (!s.button || "click" !== s.type))
                    for (d = s.target; d != this; d = d.parentNode || this)
                        if (!0 !== d.disabled || "click" !== s.type) {
                            g = {};
                            m = [];
                            for (j = 0; j < l; j++) e = n[j], t = e.selector, g[t] === c && (g[t] = e.needsContext ? 0 <= f(t, this).index(d) : f.find(t, this, null, [d]).length), g[t] && m.push(e);
                            m.length && u.push({
                                elem: d,
                                matches: m
                            })
                        }
                n.length > l && u.push({
                    elem: this,
                    matches: n.slice(l)
                });
                for (j = 0; j < u.length && !s.isPropagationStopped(); j++) {
                    g = u[j];
                    s.currentTarget = g.elem;
                    for (d = 0; d < g.matches.length && !s.isImmediatePropagationStopped(); d++)
                        if (e = g.matches[d],
                            p || !s.namespace && !e.namespace || s.namespace_re && s.namespace_re.test(e.namespace)) s.data = e.data, s.handleObj = e, e = ((f.event.special[e.origType] || {}).handle || e.handler).apply(g.elem, r), e !== c && (s.result = e, !1 === e && (s.preventDefault(), s.stopPropagation()))
                }
                return q.postDispatch && q.postDispatch.call(this, s), s.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(b, c) {
                return null == b.which && (b.which = null != c.charCode ? c.charCode : c.keyCode), b
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(b, j) {
                var d, f, e, g = j.button,
                    m = j.fromElement;
                return null == b.pageX && null != j.clientX && (d = b.target.ownerDocument || B, f = d.documentElement, e = d.body, b.pageX = j.clientX + (f && f.scrollLeft || e && e.scrollLeft || 0) - (f && f.clientLeft ||
                    e && e.clientLeft || 0), b.pageY = j.clientY + (f && f.scrollTop || e && e.scrollTop || 0) - (f && f.clientTop || e && e.clientTop || 0)), !b.relatedTarget && m && (b.relatedTarget = m === b.target ? j.toElement : m), !b.which && g !== c && (b.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), b
            }
        },
        fix: function(b) {
            if (b[f.expando]) return b;
            var c, d, e = b,
                g = f.event.fixHooks[b.type] || {},
                m = g.props ? this.props.concat(g.props) : this.props;
            b = f.Event(e);
            for (c = m.length; c;) d = m[--c], b[d] = e[d];
            return b.target || (b.target = e.srcElement || B), 3 === b.target.nodeType && (b.target = b.target.parentNode),
                b.metaKey = !!b.metaKey, g.filter ? g.filter(b, e) : b
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(b, c, d) {
                    f.isWindow(this) && (this.onbeforeunload = d)
                },
                teardown: function(b, c) {
                    this.onbeforeunload === c && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(b, c, d, e) {
            b = f.extend(new f.Event, d, {
                type: b,
                isSimulated: !0,
                originalEvent: {}
            });
            e ? f.event.trigger(b, null, c) : f.event.dispatch.call(c, b);
            b.isDefaultPrevented() && d.preventDefault()
        }
    };
    f.event.handle =
        f.event.dispatch;
    f.removeEvent = B.removeEventListener ? function(b, c, d) {
        b.removeEventListener && b.removeEventListener(c, d, !1)
    } : function(b, c, d) {
        c = "on" + c;
        b.detachEvent && ("undefined" == typeof b[c] && (b[c] = null), b.detachEvent(c, d))
    };
    f.Event = function(b, c) {
        if (this instanceof f.Event) b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented || !1 === b.returnValue || b.getPreventDefault && b.getPreventDefault() ? l : g) : this.type = b, c && f.extend(this, c), this.timeStamp = b && b.timeStamp || f.now(),
            this[f.expando] = !0;
        else return new f.Event(b, c)
    };
    f.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = l;
            var b = this.originalEvent;
            b && (b.preventDefault ? b.preventDefault() : b.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = l;
            var b = this.originalEvent;
            b && (b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = l;
            this.stopPropagation()
        },
        isDefaultPrevented: g,
        isPropagationStopped: g,
        isImmediatePropagationStopped: g
    };
    f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(b, c) {
        f.event.special[b] = {
            delegateType: c,
            bindType: c,
            handle: function(b) {
                var s, d = b.relatedTarget,
                    e = b.handleObj;
                if (!d || d !== this && !f.contains(this, d)) b.type = e.origType, s = e.handler.apply(this, arguments), b.type = c;
                return s
            }
        }
    });
    f.support.submitBubbles || (f.event.special.submit = {
        setup: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function(b) {
                b = b.target;
                (b = f.nodeName(b, "input") || f.nodeName(b, "button") ?
                    b.form : c) && !f._data(b, "_submit_attached") && (f.event.add(b, "submit._submit", function(b) {
                    b._submit_bubble = !0
                }), f._data(b, "_submit_attached", !0))
            })
        },
        postDispatch: function(b) {
            b._submit_bubble && (delete b._submit_bubble, this.parentNode && !b.isTrigger && f.event.simulate("submit", this.parentNode, b, !0))
        },
        teardown: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    });
    f.support.changeBubbles || (f.event.special.change = {
        setup: function() {
            if (db.test(this.nodeName)) {
                if ("checkbox" === this.type ||
                    "radio" === this.type) f.event.add(this, "propertychange._change", function(b) {
                    "checked" === b.originalEvent.propertyName && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function(b) {
                    this._just_changed && !b.isTrigger && (this._just_changed = !1);
                    f.event.simulate("change", this, b, !0)
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function(b) {
                b = b.target;
                db.test(b.nodeName) && !f._data(b, "_change_attached") && (f.event.add(b, "change._change", function(b) {
                    this.parentNode && !b.isSimulated && !b.isTrigger &&
                        f.event.simulate("change", this.parentNode, b, !0)
                }), f._data(b, "_change_attached", !0))
            })
        },
        handle: function(b) {
            var c = b.target;
            if (this !== c || b.isSimulated || b.isTrigger || "radio" !== c.type && "checkbox" !== c.type) return b.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return f.event.remove(this, "._change"), !db.test(this.nodeName)
        }
    });
    f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function(b, c) {
        var d = 0,
            e = function(b) {
                f.event.simulate(c, b.target, f.event.fix(b), !0)
            };
        f.event.special[c] = {
            setup: function() {
                0 === d++ && B.addEventListener(b, e, !0)
            },
            teardown: function() {
                0 === --d && B.removeEventListener(b, e, !0)
            }
        }
    });
    f.fn.extend({
        on: function(b, j, d, e, m) {
            var n, t;
            if ("object" == typeof b) {
                "string" != typeof j && (d = d || j, j = c);
                for (t in b) this.on(t, j, d, b[t], m);
                return this
            }
            null == d && null == e ? (e = j, d = j = c) : null == e && ("string" == typeof j ? (e = d, d = c) : (e = d, d = j, j = c));
            if (!1 === e) e = g;
            else if (!e) return this;
            return 1 === m && (n = e, e = function(b) {
                return f().off(b), n.apply(this, arguments)
            }, e.guid = n.guid || (n.guid = f.guid++)), this.each(function() {
                f.event.add(this,
                    b, e, d, j)
            })
        },
        one: function(b, c, d, f) {
            return this.on(b, c, d, f, 1)
        },
        off: function(b, j, d) {
            var e, m;
            if (b && b.preventDefault && b.handleObj) return e = b.handleObj, f(b.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof b) {
                for (m in b) this.off(m, j, b[m]);
                return this
            }
            if (!1 === j || "function" == typeof j) d = j, j = c;
            return !1 === d && (d = g), this.each(function() {
                f.event.remove(this, b, d, j)
            })
        },
        bind: function(b, c, d) {
            return this.on(b, null, c, d)
        },
        unbind: function(b, c) {
            return this.off(b,
                null, c)
        },
        live: function(b, c, d) {
            return f(this.context).on(b, this.selector, c, d), this
        },
        die: function(b, c) {
            return f(this.context).off(b, this.selector || "**", c), this
        },
        delegate: function(b, c, d, f) {
            return this.on(c, b, d, f)
        },
        undelegate: function(b, c, d) {
            return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", d)
        },
        trigger: function(b, c) {
            return this.each(function() {
                f.event.trigger(b, c, this)
            })
        },
        triggerHandler: function(b, c) {
            if (this[0]) return f.event.trigger(b, c, this[0], !0)
        },
        toggle: function(b) {
            var c = arguments,
                d =
                b.guid || f.guid++,
                e = 0,
                g = function(d) {
                    var z = (f._data(this, "lastToggle" + b.guid) || 0) % e;
                    return f._data(this, "lastToggle" + b.guid, z + 1), d.preventDefault(), c[z].apply(this, arguments) || !1
                };
            for (g.guid = d; e < c.length;) c[e++].guid = d;
            return this.click(g)
        },
        hover: function(b, c) {
            return this.mouseenter(b).mouseleave(c || b)
        }
    });
    f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function(b, c) {
            f.fn[c] = function(b, d) {
                return null == d && (d = b, b = null), 0 < arguments.length ? this.on(c, null, b, d) : this.trigger(c)
            };
            Tc.test(c) && (f.event.fixHooks[c] = f.event.keyHooks);
            Uc.test(c) && (f.event.fixHooks[c] = f.event.mouseHooks)
        });
    var Vc = b,
        E = function(b, c, d, f) {
            d = d || [];
            c = c || X;
            var e, g, m, n, l = c.nodeType;
            if (!b || "string" != typeof b) return d;
            if (1 !== l && 9 !== l) return [];
            m = Ka(c);
            if (!m && !f && (e = Wc.exec(b)))
                if (n = e[1])
                    if (9 === l) {
                        g = c.getElementById(n);
                        if (!g || !g.parentNode) return d;
                        if (g.id === n) return d.push(g), d
                    } else {
                        if (c.ownerDocument &&
                            (g = c.ownerDocument.getElementById(n)) && Sb(c, g) && g.id === n) return d.push(g), d
                    } else {
                if (e[2]) return oa.apply(d, pa.call(c.getElementsByTagName(b), 0)), d;
                if ((n = e[3]) && Tb && c.getElementsByClassName) return oa.apply(d, pa.call(c.getElementsByClassName(n), 0)), d
            }
            return eb(b.replace(La, "$1"), c, d, f, m)
        },
        va = function(b) {
            return function(c) {
                return "input" === c.nodeName.toLowerCase() && c.type === b
            }
        },
        Ub = function(b) {
            return function(c) {
                var d = c.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && c.type === b
            }
        },
        ia = function(b) {
            return Y(function(c) {
                return c = +c, Y(function(d, f) {
                    for (var e, g = b([], d.length, c), m = g.length; m--;) d[e = g[m]] && (d[e] = !(f[e] = d[e]))
                })
            })
        },
        Ma = function(b, c, d) {
            if (b === c) return d;
            for (b = b.nextSibling; b;) {
                if (b === c) return -1;
                b = b.nextSibling
            }
            return 1
        },
        Oa = function(b, c) {
            var d, f, e, g, m, n, l;
            if (m = Vb[H][b]) return c ? 0 : m.slice(0);
            m = b;
            n = [];
            for (l = K.preFilter; m;) {
                if (!d || (f = Xc.exec(m))) f && (m = m.slice(f[0].length)), n.push(e = []);
                d = !1;
                if (f = Yc.exec(m)) e.push(d = new Wb(f.shift())), m = m.slice(d.length), d.type = f[0].replace(La, " ");
                for (g in K.filter)(f = Na[g].exec(m)) &&
                    (!l[g] || (f = l[g](f, X, !0))) && (e.push(d = new Wb(f.shift())), m = m.slice(d.length), d.type = g, d.matches = f);
                if (!d) break
            }
            return c ? m.length : m ? E.error(b) : Vb(b, n).slice(0)
        },
        gb = function(b, c, d) {
            var f = c.dir,
                e = d && "parentNode" === c.dir,
                g = Zc++;
            return c.first ? function(c, d, j) {
                for (; c = c[f];)
                    if (e || 1 === c.nodeType) return b(c, d, j)
            } : function(c, d, j) {
                if (j)
                    for (; c = c[f];) {
                        if ((e || 1 === c.nodeType) && b(c, d, j)) return c
                    } else
                        for (var m, z = wa + " " + g + " ", n = z + fb; c = c[f];)
                            if (e || 1 === c.nodeType) {
                                if ((m = c[H]) === n) return c.sizset;
                                if ("string" == typeof m &&
                                    0 === m.indexOf(z)) {
                                    if (c.sizset) return c
                                } else {
                                    c[H] = n;
                                    if (b(c, d, j)) return c.sizset = !0, c;
                                    c.sizset = !1
                                }
                            }
            }
        },
        hb = function(b) {
            return 1 < b.length ? function(c, d, f) {
                for (var e = b.length; e--;)
                    if (!b[e](c, d, f)) return !1;
                return !0
            } : b[0]
        },
        Pa = function(b, c, d, f, e) {
            for (var g, m = [], n = 0, l = b.length, r = null != c; n < l; n++)
                if (g = b[n])
                    if (!d || d(g, f, e)) m.push(g), r && c.push(n);
            return m
        },
        ib = function(b, c, d, f, e, g) {
            return f && !f[H] && (f = ib(f)), e && !e[H] && (e = ib(e, g)), Y(function(g, m, n, l) {
                if (!g || !e) {
                    var r, L, p = [],
                        q = [],
                        u = m.length;
                    if (!(L = g)) {
                        L = c || "*";
                        var v =
                            n.nodeType ? [n] : n,
                            y = [];
                        r = 0;
                        for (var x = v.length; r < x; r++) E(L, v[r], y, g);
                        L = y
                    }
                    v = b && (g || !c) ? Pa(L, p, b, n, l) : L;
                    y = d ? e || (g ? b : u || f) ? [] : m : v;
                    d && d(v, y, n, l);
                    if (f) {
                        L = Pa(y, q);
                        f(L, [], n, l);
                        for (n = L.length; n--;)
                            if (r = L[n]) y[q[n]] = !(v[q[n]] = r)
                    }
                    if (g)
                        for (n = b && y.length; n--;) {
                            if (r = y[n]) g[p[n]] = !(m[p[n]] = r)
                        } else y = Pa(y === m ? y.splice(u, y.length) : y), e ? e(null, m, y, l) : oa.apply(m, y)
                }
            })
        },
        jb = function(b) {
            var c, d, f, e = b.length,
                g = K.relative[b[0].type];
            d = g || K.relative[" "];
            for (var m = g ? 1 : 0, n = gb(function(b) {
                return b === c
            }, d, !0), l = gb(function(b) {
                return -1 <
                    Xb.call(c, b)
            }, d, !0), r = [
                function(b, d, s) {
                    return !g && (s || d !== Qa) || ((c = d).nodeType ? n(b, d, s) : l(b, d, s))
                }
            ]; m < e; m++)
                if (d = K.relative[b[m].type]) r = [gb(hb(r), d)];
                else {
                    d = K.filter[b[m].type].apply(null, b[m].matches);
                    if (d[H]) {
                        for (f = ++m; f < e && !K.relative[b[f].type]; f++);
                        return ib(1 < m && hb(r), 1 < m && b.slice(0, m - 1).join("").replace(La, "$1"), d, m < f && jb(b.slice(m, f)), f < e && jb(b = b.slice(f)), f < e && b.join(""))
                    }
                    r.push(d)
                }
            return hb(r)
        },
        eb = function(b, c, d, f, e) {
            var g, m, n, l, r = Oa(b);
            if (!f && 1 === r.length) {
                m = r[0] = r[0].slice(0);
                if (2 < m.length &&
                    "ID" === (n = m[0]).type && 9 === c.nodeType && !e && K.relative[m[1].type]) {
                    c = K.find.ID(n.matches[0].replace(ja, ""), c, e)[0];
                    if (!c) return d;
                    b = b.slice(m.shift().length)
                }
                for (g = Na.POS.test(b) ? -1 : m.length - 1; 0 <= g; g--) {
                    n = m[g];
                    if (K.relative[l = n.type]) break;
                    if (l = K.find[l])
                        if (f = l(n.matches[0].replace(ja, ""), kb.test(m[0].type) && c.parentNode || c, e)) {
                            m.splice(g, 1);
                            b = f.length && m.join("");
                            if (!b) return oa.apply(d, pa.call(f, 0)), d;
                            break
                        }
                }
            }
            return lb(b, r)(f, c, e, d, kb.test(b)), d
        },
        Yb = function() {},
        fb, mb, K, Ra, Ka, Sb, lb, nb, xa, Qa, Zb = !0,
        H = ("sizcache" + Math.random()).replace(".", ""),
        Wb = String,
        X = Vc.document,
        W = X.documentElement,
        wa = 0,
        Zc = 0,
        $c = [].pop,
        oa = [].push,
        pa = [].slice,
        Xb = [].indexOf || function(b) {
            for (var c = 0, d = this.length; c < d; c++)
                if (this[c] === b) return c;
            return -1
        },
        Y = function(b, c) {
            return b[H] = null == c || c, b
        },
        ob = function() {
            var b = {},
                c = [];
            return Y(function(d, f) {
                return c.push(d) > K.cacheLength && delete b[c.shift()], b[d] = f
            }, b)
        },
        $b = ob(),
        Vb = ob(),
        ac = ob(),
        bc = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
        "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
        pb = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + bc + ")|[^:]|\\\\.)*|.*))\\)|)",
        La = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        Xc = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
        Yc = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
        ad = RegExp(pb),
        Wc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        kb = /[\x20\t\r\n\f]*[+~]/,
        bd = /h\d/i,
        cd = /input|select|textarea|button/i,
        ja = /\\(?!\\)/g,
        Na = {
            ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
            TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
            ATTR: RegExp("^" + bc),
            PSEUDO: RegExp("^" + pb),
            POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
            CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
                "i"),
            needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
        },
        ca = function(b) {
            var c = X.createElement("div");
            try {
                return b(c)
            } catch (d) {
                return !1
            } finally {}
        },
        dd = ca(function(b) {
            return b.appendChild(X.createComment("")), !b.getElementsByTagName("*").length
        }),
        ed = ca(function(b) {
            return b.innerHTML = "<a href='#'></a>", b.firstChild && "undefined" !== typeof b.firstChild.getAttribute && "#" === b.firstChild.getAttribute("href")
        }),
        fd = ca(function(b) {
            b.innerHTML = "<select></select>";
            b = typeof b.lastChild.getAttribute("multiple");
            return "boolean" !== b && "string" !== b
        }),
        Tb = ca(function(b) {
            return b.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !b.getElementsByClassName || !b.getElementsByClassName("e").length ? !1 : (b.lastChild.className = "e", 2 === b.getElementsByClassName("e").length)
        }),
        gd = ca(function(b) {
            b.id = H + 0;
            b.innerHTML = "<a name='" + H + "'></a><div name='" + H + "'></div>";
            W.insertBefore(b, W.firstChild);
            var c = X.getElementsByName &&
                X.getElementsByName(H).length === 2 + X.getElementsByName(H + 0).length;
            return mb = !X.getElementById(H), W.removeChild(b), c
        });
    try {
        pa.call(W.childNodes, 0)[0].nodeType
    } catch (Qd) {
        pa = function(b) {
            for (var c, d = []; c = this[b]; b++) d.push(c);
            return d
        }
    }
    E.matches = function(b, c) {
        return E(b, null, null, c)
    };
    E.matchesSelector = function(b, c) {
        return 0 < E(c, null, null, [b]).length
    };
    Ra = E.getText = function(b) {
        var c, d = "",
            f = 0;
        if (c = b.nodeType)
            if (1 === c || 9 === c || 11 === c) {
                if ("string" == typeof b.textContent) return b.textContent;
                for (b = b.firstChild; b; b =
                    b.nextSibling) d += Ra(b)
            } else {
                if (3 === c || 4 === c) return b.nodeValue
            } else
            for (; c = b[f]; f++) d += Ra(c);
        return d
    };
    Ka = E.isXML = function(b) {
        return (b = b && (b.ownerDocument || b).documentElement) ? "HTML" !== b.nodeName : !1
    };
    Sb = E.contains = W.contains ? function(b, c) {
        var d = 9 === b.nodeType ? b.documentElement : b,
            f = c && c.parentNode;
        return b === f || !(!f || !(1 === f.nodeType && d.contains && d.contains(f)))
    } : W.compareDocumentPosition ? function(b, c) {
        return c && !!(b.compareDocumentPosition(c) & 16)
    } : function(b, c) {
        for (; c = c.parentNode;)
            if (c === b) return !0;
        return !1
    };
    E.attr = function(b, c) {
        var d, f = Ka(b);
        return f || (c = c.toLowerCase()), (d = K.attrHandle[c]) ? d(b) : f || fd ? b.getAttribute(c) : (d = b.getAttributeNode(c), d ? "boolean" == typeof b[c] ? b[c] ? c : null : d.specified ? d.value : null : null)
    };
    K = E.selectors = {
        cacheLength: 50,
        createPseudo: Y,
        match: Na,
        attrHandle: ed ? {} : {
            href: function(b) {
                return b.getAttribute("href", 2)
            },
            type: function(b) {
                return b.getAttribute("type")
            }
        },
        find: {
            ID: mb ? function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (b = c.getElementById(b)) && b.parentNode ? [b] : []
            } : function(b, c, d) {
                if ("undefined" !== typeof c.getElementById && !d) return (c = c.getElementById(b)) ? c.id === b || "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id").value === b ? [c] : void 0 : []
            },
            TAG: dd ? function(b, c) {
                if ("undefined" !== typeof c.getElementsByTagName) return c.getElementsByTagName(b)
            } : function(b, c) {
                var d = c.getElementsByTagName(b);
                if ("*" === b) {
                    for (var f, e = [], g = 0; f = d[g]; g++) 1 === f.nodeType && e.push(f);
                    return e
                }
                return d
            },
            NAME: gd && function(b, c) {
                if ("undefined" !== typeof c.getElementsByName) return c.getElementsByName(name)
            },
            CLASS: Tb && function(b, c, d) {
                if ("undefined" !== typeof c.getElementsByClassName && !d) return c.getElementsByClassName(b)
            }
        },
        relative: {
            ">": {
                dir: "parentNode",
                first: !0
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: !0
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            ATTR: function(b) {
                return b[1] = b[1].replace(ja, ""), b[3] = (b[4] || b[5] || "").replace(ja, ""), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
            },
            CHILD: function(b) {
                return b[1] = b[1].toLowerCase(), "nth" === b[1] ? (b[2] || E.error(b[0]), b[3] = +(b[3] ? b[4] + (b[5] || 1) :
                    2 * ("even" === b[2] || "odd" === b[2])), b[4] = +(b[6] + b[7] || "odd" === b[2])) : b[2] && E.error(b[0]), b
            },
            PSEUDO: function(b) {
                var c, d;
                if (Na.CHILD.test(b[0])) return null;
                if (b[3]) b[2] = b[3];
                else if (c = b[4]) ad.test(c) && (d = Oa(c, !0)) && (d = c.indexOf(")", c.length - d) - c.length) && (c = c.slice(0, d), b[0] = b[0].slice(0, d)), b[2] = c;
                return b.slice(0, 3)
            }
        },
        filter: {
            ID: mb ? function(b) {
                return b = b.replace(ja, ""),
                    function(c) {
                        return c.getAttribute("id") === b
                    }
            } : function(b) {
                return b = b.replace(ja, ""),
                    function(c) {
                        return (c = "undefined" !== typeof c.getAttributeNode &&
                            c.getAttributeNode("id")) && c.value === b
                    }
            },
            TAG: function(b) {
                return "*" === b ? function() {
                    return !0
                } : (b = b.replace(ja, "").toLowerCase(), function(c) {
                    return c.nodeName && c.nodeName.toLowerCase() === b
                })
            },
            CLASS: function(b) {
                var c = $b[H][b];
                return c || (c = $b(b, RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)"))),
                    function(b) {
                        return c.test(b.className || "undefined" !== typeof b.getAttribute && b.getAttribute("class") || "")
                    }
            },
            ATTR: function(b, c, d) {
                return function(f) {
                    f = E.attr(f, b);
                    return null == f ? "!=" === c : c ? (f += "", "=" ===
                        c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && -1 < f.indexOf(d) : "$=" === c ? d && f.substr(f.length - d.length) === d : "~=" === c ? -1 < (" " + f + " ").indexOf(d) : "|=" === c ? f === d || f.substr(0, d.length + 1) === d + "-" : !1) : !0
                }
            },
            CHILD: function(b, c, d, f) {
                return "nth" === b ? function(b) {
                    var c, j;
                    c = b.parentNode;
                    if (1 === d && 0 === f) return !0;
                    if (c) {
                        j = 0;
                        for (c = c.firstChild; c && !(1 === c.nodeType && (j++, b === c)); c = c.nextSibling);
                    }
                    return j -= f, j === d || 0 === j % d && 0 <= j / d
                } : function(c) {
                    var d = c;
                    switch (b) {
                        case "only":
                        case "first":
                            for (; d = d.previousSibling;)
                                if (1 ===
                                    d.nodeType) return !1;
                            if ("first" === b) return !0;
                            d = c;
                        case "last":
                            for (; d = d.nextSibling;)
                                if (1 === d.nodeType) return !1;
                            return !0
                    }
                }
            },
            PSEUDO: function(b, c) {
                var d, f = K.pseudos[b] || K.setFilters[b.toLowerCase()] || E.error("unsupported pseudo: " + b);
                return f[H] ? f(c) : 1 < f.length ? (d = [b, b, "", c], K.setFilters.hasOwnProperty(b.toLowerCase()) ? Y(function(b, d) {
                    for (var s, e = f(b, c), g = e.length; g--;) s = Xb.call(b, e[g]), b[s] = !(d[s] = e[g])
                }) : function(b) {
                    return f(b, 0, d)
                }) : f
            }
        },
        pseudos: {
            not: Y(function(b) {
                var c = [],
                    d = [],
                    f = lb(b.replace(La, "$1"));
                return f[H] ? Y(function(b, c, d, j) {
                    j = f(b, null, j, []);
                    for (var s = b.length; s--;)
                        if (d = j[s]) b[s] = !(c[s] = d)
                }) : function(b, s, e) {
                    return c[0] = b, f(c, null, e, d), !d.pop()
                }
            }),
            has: Y(function(b) {
                return function(c) {
                    return 0 < E(b, c).length
                }
            }),
            contains: Y(function(b) {
                return function(c) {
                    return -1 < (c.textContent || c.innerText || Ra(c)).indexOf(b)
                }
            }),
            enabled: function(b) {
                return !1 === b.disabled
            },
            disabled: function(b) {
                return !0 === b.disabled
            },
            checked: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && !!b.checked || "option" ===
                    c && !!b.selected
            },
            selected: function(b) {
                return b.parentNode && b.parentNode.selectedIndex, !0 === b.selected
            },
            parent: function(b) {
                return !K.pseudos.empty(b)
            },
            empty: function(b) {
                var c;
                for (b = b.firstChild; b;) {
                    if ("@" < b.nodeName || 3 === (c = b.nodeType) || 4 === c) return !1;
                    b = b.nextSibling
                }
                return !0
            },
            header: function(b) {
                return bd.test(b.nodeName)
            },
            text: function(b) {
                var c, d;
                return "input" === b.nodeName.toLowerCase() && "text" === (c = b.type) && (null == (d = b.getAttribute("type")) || d.toLowerCase() === c)
            },
            radio: va("radio"),
            checkbox: va("checkbox"),
            file: va("file"),
            password: va("password"),
            image: va("image"),
            submit: Ub("submit"),
            reset: Ub("reset"),
            button: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && "button" === b.type || "button" === c
            },
            input: function(b) {
                return cd.test(b.nodeName)
            },
            focus: function(b) {
                var c = b.ownerDocument;
                return b === c.activeElement && (!c.hasFocus || c.hasFocus()) && (!!b.type || !!b.href)
            },
            active: function(b) {
                return b === b.ownerDocument.activeElement
            },
            first: ia(function() {
                return [0]
            }),
            last: ia(function(b, c) {
                return [c - 1]
            }),
            eq: ia(function(b,
                c, d) {
                return [0 > d ? d + c : d]
            }),
            even: ia(function(b, c) {
                for (var d = 0; d < c; d += 2) b.push(d);
                return b
            }),
            odd: ia(function(b, c) {
                for (var d = 1; d < c; d += 2) b.push(d);
                return b
            }),
            lt: ia(function(b, c, d) {
                for (c = 0 > d ? d + c : d; 0 <= --c;) b.push(c);
                return b
            }),
            gt: ia(function(b, c, d) {
                for (d = 0 > d ? d + c : d; ++d < c;) b.push(d);
                return b
            })
        }
    };
    nb = W.compareDocumentPosition ? function(b, c) {
        return b === c ? (xa = !0, 0) : (!b.compareDocumentPosition || !c.compareDocumentPosition ? b.compareDocumentPosition : b.compareDocumentPosition(c) & 4) ? -1 : 1
    } : function(b, c) {
        if (b === c) return xa = !0, 0;
        if (b.sourceIndex && c.sourceIndex) return b.sourceIndex - c.sourceIndex;
        var d, f, e = [],
            g = [];
        d = b.parentNode;
        f = c.parentNode;
        var m = d;
        if (d === f) return Ma(b, c);
        if (!d) return -1;
        if (!f) return 1;
        for (; m;) e.unshift(m), m = m.parentNode;
        for (m = f; m;) g.unshift(m), m = m.parentNode;
        d = e.length;
        f = g.length;
        for (m = 0; m < d && m < f; m++)
            if (e[m] !== g[m]) return Ma(e[m], g[m]);
        return m === d ? Ma(b, g[m], -1) : Ma(e[m], c, 1)
    };
    [0, 0].sort(nb);
    Zb = !xa;
    E.uniqueSort = function(b) {
        var c, d = 1;
        xa = Zb;
        b.sort(nb);
        if (xa)
            for (; c = b[d]; d++) c === b[d - 1] && b.splice(d--, 1);
        return b
    };
    E.error = function(b) {
        throw Error("Syntax error, unrecognized expression: " + b);
    };
    lb = E.compile = function(b, c) {
        var d, f = [],
            e = [],
            g = ac[H][b];
        if (!g) {
            c || (c = Oa(b));
            for (d = c.length; d--;) g = jb(c[d]), g[H] ? f.push(g) : e.push(g);
            var m = 0 < f.length,
                n = 0 < e.length,
                l = function(b, c, d, j, s) {
                    var g, z, r = [],
                        p = 0,
                        q = "0",
                        L = b && [],
                        u = null != s,
                        v = Qa,
                        y = b || n && K.find.TAG("*", s && c.parentNode || c),
                        x = wa += null == v ? 1 : Math.E;
                    for (u && (Qa = c !== X && c, fb = l.el); null != (s = y[q]); q++) {
                        if (n && s) {
                            for (g = 0; z = e[g]; g++)
                                if (z(s, c, d)) {
                                    j.push(s);
                                    break
                                }
                            u && (wa = x, fb =
                                ++l.el)
                        }
                        m && ((s = !z && s) && p--, b && L.push(s))
                    }
                    p += q;
                    if (m && q !== p) {
                        for (g = 0; z = f[g]; g++) z(L, r, c, d);
                        if (b) {
                            if (0 < p)
                                for (; q--;) !L[q] && !r[q] && (r[q] = $c.call(j));
                            r = Pa(r)
                        }
                        oa.apply(j, r);
                        u && !b && 0 < r.length && 1 < p + f.length && E.uniqueSort(j)
                    }
                    return u && (wa = x, Qa = v), L
                };
            d = (l.el = 0, m ? Y(l) : l);
            g = ac(b, d)
        }
        return g
    };
    if (X.querySelectorAll) {
        var cc, hd = eb,
            id = /'|\\/g,
            jd = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            Z = [":focus"],
            Sa = [":active", ":focus"],
            Ta = W.matchesSelector || W.mozMatchesSelector || W.webkitMatchesSelector || W.oMatchesSelector ||
            W.msMatchesSelector;
        ca(function(b) {
            b.innerHTML = "<select><option selected=''></option></select>";
            b.querySelectorAll("[selected]").length || Z.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
            b.querySelectorAll(":checked").length || Z.push(":checked")
        });
        ca(function(b) {
            b.innerHTML = "<p test=''></p>";
            b.querySelectorAll("[test^='']").length && Z.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
            b.innerHTML = "<input type='hidden'/>";
            b.querySelectorAll(":enabled").length || Z.push(":enabled",
                ":disabled")
        });
        Z = RegExp(Z.join("|"));
        eb = function(b, c, d, f, e) {
            if (!f && !e && (!Z || !Z.test(b))) {
                var g, m, n = !0,
                    l = H;
                m = c;
                g = 9 === c.nodeType && b;
                if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                    g = Oa(b);
                    (n = c.getAttribute("id")) ? l = n.replace(id, "\\$&"): c.setAttribute("id", l);
                    l = "[id='" + l + "'] ";
                    for (m = g.length; m--;) g[m] = l + g[m].join("");
                    m = kb.test(b) && c.parentNode || c;
                    g = g.join(",")
                }
                if (g) try {
                    return oa.apply(d, pa.call(m.querySelectorAll(g), 0)), d
                } catch (r) {} finally {
                    n || c.removeAttribute("id")
                }
            }
            return hd(b, c, d, f, e)
        };
        Ta &&
            (ca(function(b) {
                cc = Ta.call(b, "div");
                try {
                    Ta.call(b, "[test!='']:sizzle"), Sa.push("!=", pb)
                } catch (c) {}
            }), Sa = RegExp(Sa.join("|")), E.matchesSelector = function(b, c) {
                c = c.replace(jd, "='$1']");
                if (!Ka(b) && !Sa.test(c) && (!Z || !Z.test(c))) try {
                    var d = Ta.call(b, c);
                    if (d || cc || b.document && 11 !== b.document.nodeType) return d
                } catch (f) {}
                return 0 < E(c, null, null, [b]).length
            })
    }
    K.pseudos.nth = K.pseudos.eq;
    K.filters = Yb.prototype = K.pseudos;
    K.setFilters = new Yb;
    E.attr = f.attr;
    f.find = E;
    f.expr = E.selectors;
    f.expr[":"] = f.expr.pseudos;
    f.unique =
        E.uniqueSort;
    f.text = E.getText;
    f.isXMLDoc = E.isXML;
    f.contains = E.contains;
    var kd = /Until$/,
        ld = /^(?:parents|prev(?:Until|All))/,
        uc = /^.[^:#\[\.,]*$/,
        dc = f.expr.match.needsContext,
        md = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function(b) {
            var c, d, e, g, m, n, l = this;
            if ("string" != typeof b) return f(b).filter(function() {
                c = 0;
                for (d = l.length; c < d; c++)
                    if (f.contains(l[c], this)) return !0
            });
            n = this.pushStack("", "find", b);
            c = 0;
            for (d = this.length; c < d; c++)
                if (e = n.length, f.find(b, this[c], n), 0 < c)
                    for (g = e; g < n.length; g++)
                        for (m =
                            0; m < e; m++)
                            if (n[m] === n[g]) {
                                n.splice(g--, 1);
                                break
                            }
            return n
        },
        has: function(b) {
            var c, d = f(b, this),
                e = d.length;
            return this.filter(function() {
                for (c = 0; c < e; c++)
                    if (f.contains(this, d[c])) return !0
            })
        },
        not: function(b) {
            return this.pushStack(q(this, b, !1), "not", b)
        },
        filter: function(b) {
            return this.pushStack(q(this, b, !0), "filter", b)
        },
        is: function(b) {
            return !!b && ("string" == typeof b ? dc.test(b) ? 0 <= f(b, this.context).index(this[0]) : 0 < f.filter(b, this).length : 0 < this.filter(b).length)
        },
        closest: function(b, c) {
            for (var d, e = 0, g = this.length,
                m = [], n = dc.test(b) || "string" != typeof b ? f(b, c || this.context) : 0; e < g; e++)
                for (d = this[e]; d && d.ownerDocument && d !== c && 11 !== d.nodeType;) {
                    if (n ? -1 < n.index(d) : f.find.matchesSelector(d, b)) {
                        m.push(d);
                        break
                    }
                    d = d.parentNode
                }
            return m = 1 < m.length ? f.unique(m) : m, this.pushStack(m, "closest", b)
        },
        index: function(b) {
            return b ? "string" == typeof b ? f.inArray(this[0], f(b)) : f.inArray(b.jquery ? b[0] : b, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(b, c) {
            var d = "string" == typeof b ? f(b, c) : f.makeArray(b && b.nodeType ? [b] : b),
                e = f.merge(this.get(), d);
            return this.pushStack(p(d[0]) || p(e[0]) ? e : f.unique(e))
        },
        addBack: function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }
    });
    f.fn.andSelf = f.fn.addBack;
    f.each({
        parent: function(b) {
            return (b = b.parentNode) && 11 !== b.nodeType ? b : null
        },
        parents: function(b) {
            return f.dir(b, "parentNode")
        },
        parentsUntil: function(b, c, d) {
            return f.dir(b, "parentNode", d)
        },
        next: function(b) {
            return x(b, "nextSibling")
        },
        prev: function(b) {
            return x(b, "previousSibling")
        },
        nextAll: function(b) {
            return f.dir(b,
                "nextSibling")
        },
        prevAll: function(b) {
            return f.dir(b, "previousSibling")
        },
        nextUntil: function(b, c, d) {
            return f.dir(b, "nextSibling", d)
        },
        prevUntil: function(b, c, d) {
            return f.dir(b, "previousSibling", d)
        },
        siblings: function(b) {
            return f.sibling((b.parentNode || {}).firstChild, b)
        },
        children: function(b) {
            return f.sibling(b.firstChild)
        },
        contents: function(b) {
            return f.nodeName(b, "iframe") ? b.contentDocument || b.contentWindow.document : f.merge([], b.childNodes)
        }
    }, function(b, c) {
        f.fn[b] = function(d, e) {
            var g = f.map(this, c, d);
            return kd.test(b) ||
                (e = d), e && "string" == typeof e && (g = f.filter(e, g)), g = 1 < this.length && !md[b] ? f.unique(g) : g, 1 < this.length && ld.test(b) && (g = g.reverse()), this.pushStack(g, b, aa.call(arguments).join(","))
        }
    });
    f.extend({
        filter: function(b, c, d) {
            return d && (b = ":not(" + b + ")"), 1 === c.length ? f.find.matchesSelector(c[0], b) ? [c[0]] : [] : f.find.matches(b, c)
        },
        dir: function(b, d, e) {
            var g = [];
            for (b = b[d]; b && 9 !== b.nodeType && (e === c || 1 !== b.nodeType || !f(b).is(e));) 1 === b.nodeType && g.push(b), b = b[d];
            return g
        },
        sibling: function(b, c) {
            for (var d = []; b; b = b.nextSibling) 1 ===
                b.nodeType && b !== c && d.push(b);
            return d
        }
    });
    var wb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        nd = / jQuery\d+="(?:null|\d+)"/g,
        qb = /^\s+/,
        ec = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        fc = /<([\w:]+)/,
        od = /<tbody/i,
        pd = /<|&#?\w+;/,
        qd = /<(?:script|style|link)/i,
        rd = /<(?:script|object|embed|option|style)/i,
        rb = RegExp("<(?:" + wb + ")[\\s/>]", "i"),
        xb = /^(?:checkbox|radio)$/,
        gc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        sd = /\/(java|ecma)script/i,
        td = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        V = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        hc = u(B),
        sb = hc.appendChild(B.createElement("div"));
    V.optgroup =
        V.option;
    V.tbody = V.tfoot = V.colgroup = V.caption = V.thead;
    V.th = V.td;
    f.support.htmlSerialize || (V._default = [1, "X<div>", "</div>"]);
    f.fn.extend({
        text: function(b) {
            return f.access(this, function(b) {
                return b === c ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || B).createTextNode(b))
            }, null, b, arguments.length)
        },
        wrapAll: function(b) {
            if (f.isFunction(b)) return this.each(function(c) {
                f(this).wrapAll(b.call(this, c))
            });
            if (this[0]) {
                var c = f(b, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && c.insertBefore(this[0]);
                c.map(function() {
                    for (var b = this; b.firstChild && 1 === b.firstChild.nodeType;) b = b.firstChild;
                    return b
                }).append(this)
            }
            return this
        },
        wrapInner: function(b) {
            return f.isFunction(b) ? this.each(function(c) {
                f(this).wrapInner(b.call(this, c))
            }) : this.each(function() {
                var c = f(this),
                    d = c.contents();
                d.length ? d.wrapAll(b) : c.append(b)
            })
        },
        wrap: function(b) {
            var c = f.isFunction(b);
            return this.each(function(d) {
                f(this).wrapAll(c ? b.call(this, d) : b)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") ||
                    f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(b)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(b) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(b, this.firstChild)
            })
        },
        before: function() {
            if (!p(this[0])) return this.domManip(arguments, !1, function(b) {
                this.parentNode.insertBefore(b, this)
            });
            if (arguments.length) {
                var b = f.clean(arguments);
                return this.pushStack(f.merge(b,
                    this), "before", this.selector)
            }
        },
        after: function() {
            if (!p(this[0])) return this.domManip(arguments, !1, function(b) {
                this.parentNode.insertBefore(b, this.nextSibling)
            });
            if (arguments.length) {
                var b = f.clean(arguments);
                return this.pushStack(f.merge(this, b), "after", this.selector)
            }
        },
        remove: function(b, c) {
            for (var d, e = 0; null != (d = this[e]); e++)
                if (!b || f.filter(b, [d]).length) !c && 1 === d.nodeType && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var b,
                c = 0; null != (b = this[c]); c++)
                for (1 === b.nodeType && f.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function(b, c) {
            return b = null == b ? !1 : b, c = null == c ? b : c, this.map(function() {
                return f.clone(this, b, c)
            })
        },
        html: function(b) {
            return f.access(this, function(b) {
                var d = this[0] || {},
                    e = 0,
                    g = this.length;
                if (b === c) return 1 === d.nodeType ? d.innerHTML.replace(nd, "") : c;
                if ("string" == typeof b && !qd.test(b) && (f.support.htmlSerialize || !rb.test(b)) && (f.support.leadingWhitespace || !qb.test(b)) &&
                    !V[(fc.exec(b) || ["", ""])[1].toLowerCase()]) {
                    b = b.replace(ec, "<$1></$2>");
                    try {
                        for (; e < g; e++) d = this[e] || {}, 1 === d.nodeType && (f.cleanData(d.getElementsByTagName("*")), d.innerHTML = b);
                        d = 0
                    } catch (m) {}
                }
                d && this.empty().append(b)
            }, null, b, arguments.length)
        },
        replaceWith: function(b) {
            return p(this[0]) ? this.length ? this.pushStack(f(f.isFunction(b) ? b() : b), "replaceWith", b) : this : f.isFunction(b) ? this.each(function(c) {
                var d = f(this),
                    e = d.html();
                d.replaceWith(b.call(this, c, e))
            }) : ("string" != typeof b && (b = f(b).detach()), this.each(function() {
                var c =
                    this.nextSibling,
                    d = this.parentNode;
                f(this).remove();
                c ? f(c).before(b) : f(d).append(b)
            }))
        },
        detach: function(b) {
            return this.remove(b, !0)
        },
        domManip: function(b, d, e) {
            b = [].concat.apply([], b);
            var g, m, n, l = 0,
                r = b[0],
                p = [],
                q = this.length;
            if (!f.support.checkClone && 1 < q && "string" == typeof r && gc.test(r)) return this.each(function() {
                f(this).domManip(b, d, e)
            });
            if (f.isFunction(r)) return this.each(function(g) {
                var m = f(this);
                b[0] = r.call(this, g, d ? m.html() : c);
                m.domManip(b, d, e)
            });
            if (this[0]) {
                g = f.buildFragment(b, this, p);
                n = g.fragment;
                m = n.firstChild;
                1 === n.childNodes.length && (n = m);
                if (m) {
                    d = d && f.nodeName(m, "tr");
                    for (g = g.cacheable || q - 1; l < q; l++) e.call(d && f.nodeName(this[l], "table") ? this[l].getElementsByTagName("tbody")[0] || this[l].appendChild(this[l].ownerDocument.createElement("tbody")) : this[l], l === g ? n : f.clone(n, !0, !0))
                }
                n = m = null;
                p.length && f.each(p, function(b, c) {
                    c.src ? f.ajax ? f.ajax({
                        url: c.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : f.error("no ajax") : f.globalEval((c.text || c.textContent || c.innerHTML || "").replace(td,
                        ""));
                    c.parentNode && c.parentNode.removeChild(c)
                })
            }
            return this
        }
    });
    f.buildFragment = function(b, d, e) {
        var g, m, n, l = b[0];
        return d = d || B, d = !d.nodeType && d[0] || d, d = d.ownerDocument || d, 1 === b.length && "string" == typeof l && 512 > l.length && d === B && "<" === l.charAt(0) && !rd.test(l) && (f.support.checkClone || !gc.test(l)) && (f.support.html5Clone || !rb.test(l)) && (m = !0, g = f.fragments[l], n = g !== c), g || (g = d.createDocumentFragment(), f.clean(b, d, g, e), m && (f.fragments[l] = n && g)), {
            fragment: g,
            cacheable: m
        }
    };
    f.fragments = {};
    f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(b, c) {
        f.fn[b] = function(d) {
            var e, g = 0,
                m = [];
            d = f(d);
            var n = d.length;
            e = 1 === this.length && this[0].parentNode;
            if ((null == e || e && 11 === e.nodeType && 1 === e.childNodes.length) && 1 === n) return d[c](this[0]), this;
            for (; g < n; g++) e = (0 < g ? this.clone(!0) : this).get(), f(d[g])[c](e), m = m.concat(e);
            return this.pushStack(m, b, d.selector)
        }
    });
    f.extend({
        clone: function(b, c, d) {
            var e, g, l, r;
            f.support.html5Clone || f.isXMLDoc(b) || !rb.test("<" + b.nodeName +
                ">") ? r = b.cloneNode(!0) : (sb.innerHTML = b.outerHTML, sb.removeChild(r = sb.firstChild));
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (1 === b.nodeType || 11 === b.nodeType) && !f.isXMLDoc(b)) {
                m(b, r);
                e = n(b);
                g = n(r);
                for (l = 0; e[l]; ++l) g[l] && m(e[l], g[l])
            }
            if (c && (y(b, r), d)) {
                e = n(b);
                g = n(r);
                for (l = 0; e[l]; ++l) y(e[l], g[l])
            }
            return r
        },
        clean: function(b, c, d, e) {
            var g, m, n, l, p, q, v, y = c === B && hc,
                x = [];
            if (!c || "undefined" == typeof c.createDocumentFragment) c = B;
            for (g = 0; null != (n = b[g]); g++)
                if ("number" == typeof n && (n += ""), n) {
                    if ("string" ==
                        typeof n)
                        if (pd.test(n)) {
                            y = y || u(c);
                            q = c.createElement("div");
                            y.appendChild(q);
                            n = n.replace(ec, "<$1></$2>");
                            m = (fc.exec(n) || ["", ""])[1].toLowerCase();
                            l = V[m] || V._default;
                            p = l[0];
                            for (q.innerHTML = l[1] + n + l[2]; p--;) q = q.lastChild;
                            if (!f.support.tbody) {
                                p = od.test(n);
                                l = "table" === m && !p ? q.firstChild && q.firstChild.childNodes : "<table>" === l[1] && !p ? q.childNodes : [];
                                for (m = l.length - 1; 0 <= m; --m) f.nodeName(l[m], "tbody") && !l[m].childNodes.length && l[m].parentNode.removeChild(l[m])
                            }!f.support.leadingWhitespace && qb.test(n) && q.insertBefore(c.createTextNode(qb.exec(n)[0]),
                                q.firstChild);
                            n = q.childNodes;
                            q.parentNode.removeChild(q)
                        } else n = c.createTextNode(n);
                    n.nodeType ? x.push(n) : f.merge(x, n)
                }
            q && (n = q = y = null);
            if (!f.support.appendChecked)
                for (g = 0; null != (n = x[g]); g++) f.nodeName(n, "input") ? r(n) : "undefined" != typeof n.getElementsByTagName && f.grep(n.getElementsByTagName("input"), r);
            if (d) {
                b = function(b) {
                    if (!b.type || sd.test(b.type)) return e ? e.push(b.parentNode ? b.parentNode.removeChild(b) : b) : d.appendChild(b)
                };
                for (g = 0; null != (n = x[g]); g++)
                    if (!f.nodeName(n, "script") || !b(n)) d.appendChild(n),
                        "undefined" != typeof n.getElementsByTagName && (v = f.grep(f.merge([], n.getElementsByTagName("script")), b), x.splice.apply(x, [g + 1, 0].concat(v)), g += v.length)
            }
            return x
        },
        cleanData: function(b, c) {
            for (var d, e, g, m, n = 0, l = f.expando, r = f.cache, q = f.support.deleteExpando, p = f.event.special; null != (g = b[n]); n++)
                if (c || f.acceptData(g))
                    if (d = (e = g[l]) && r[e]) {
                        if (d.events)
                            for (m in d.events) p[m] ? f.event.remove(g, m) : f.removeEvent(g, m, d.handle);
                        r[e] && (delete r[e], q ? delete g[l] : g.removeAttribute ? g.removeAttribute(l) : g[l] = null, f.deletedIds.push(e))
                    }
        }
    });
    var Ua, da;
    f.uaMatch = function(b) {
        b = b.toLowerCase();
        b = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || 0 > b.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [];
        return {
            browser: b[1] || "",
            version: b[2] || "0"
        }
    };
    Ua = f.uaMatch(zc.userAgent);
    da = {};
    Ua.browser && (da[Ua.browser] = !0, da.version = Ua.version);
    da.chrome ? da.webkit = !0 : da.webkit && (da.safari = !0);
    f.browser = da;
    f.sub = function() {
        function b(c, d) {
            return new b.fn.init(c,
                d)
        }
        f.extend(!0, b, this);
        b.superclass = this;
        b.fn = b.prototype = this();
        b.fn.constructor = b;
        b.sub = this.sub;
        b.fn.init = function(d, e) {
            return e && e instanceof f && !(e instanceof b) && (e = b(e)), f.fn.init.call(this, d, e, c)
        };
        b.fn.init.prototype = b.fn;
        var c = b(B);
        return b
    };
    var Q, la, ma, tb = /alpha\([^)]*\)/i,
        ud = /opacity=([^)]*)/,
        vd = /^(top|right|bottom|left)$/,
        wd = /^(none|table(?!-c[ea]).+)/,
        ic = /^margin/,
        vc = RegExp("^(" + Ea + ")(.*)$", "i"),
        ya = RegExp("^(" + Ea + ")(?!px)[a-z%]+$", "i"),
        xd = RegExp("^([-+])=(" + Ea + ")", "i"),
        Ya = {},
        yd = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        jc = {
            letterSpacing: 0,
            fontWeight: 400
        },
        ea = ["Top", "Right", "Bottom", "Left"],
        yb = ["Webkit", "O", "Moz", "ms"],
        zd = f.fn.toggle;
    f.fn.extend({
        css: function(b, d) {
            return f.access(this, function(b, d, e) {
                return e !== c ? f.style(b, d, e) : f.css(b, d)
            }, b, d, 1 < arguments.length)
        },
        show: function() {
            return D(this, !0)
        },
        hide: function() {
            return D(this)
        },
        toggle: function(b, c) {
            var d = "boolean" == typeof b;
            return f.isFunction(b) && f.isFunction(c) ? zd.apply(this, arguments) : this.each(function() {
                (d ? b : N(this)) ? f(this).show():
                    f(this).hide()
            })
        }
    });
    f.extend({
        cssHooks: {
            opacity: {
                get: function(b, c) {
                    if (c) {
                        var d = Q(b, "opacity");
                        return "" === d ? "1" : d
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(b, d, e, g) {
            if (b && !(3 === b.nodeType || 8 === b.nodeType || !b.style)) {
                var m, n, l, r = f.camelCase(d),
                    q = b.style;
                d = f.cssProps[r] || (f.cssProps[r] = v(q, r));
                l = f.cssHooks[d] || f.cssHooks[r];
                if (e === c) return l && "get" in l && (m = l.get(b, !1, g)) !== c ? m : q[d];
                n = typeof e;
                "string" === n && (m = xd.exec(e)) && (e = (m[1] + 1) * m[2] + parseFloat(f.css(b, d)), n = "number");
                if (!(null == e || "number" === n && isNaN(e)))
                    if ("number" === n && !f.cssNumber[r] && (e += "px"), !l || !("set" in l) || (e = l.set(b, e, g)) !== c) try {
                        q[d] = e
                    } catch (p) {}
            }
        },
        css: function(b, d, e, g) {
            var m, n, l, r = f.camelCase(d);
            return d = f.cssProps[r] || (f.cssProps[r] = v(b.style, r)), l = f.cssHooks[d] || f.cssHooks[r], l && "get" in l && (m = l.get(b, !0, g)), m === c && (m = Q(b, d)), "normal" === m && d in jc && (m = jc[d]), e || g !== c ? (n = parseFloat(m), e ||
                f.isNumeric(n) ? n || 0 : m) : m
        },
        swap: function(b, c, d) {
            var f, e = {};
            for (f in c) e[f] = b.style[f], b.style[f] = c[f];
            d = d.call(b);
            for (f in c) b.style[f] = e[f];
            return d
        }
    });
    b.getComputedStyle ? Q = function(c, d) {
        var e, g, m, n, l = b.getComputedStyle(c, null),
            r = c.style;
        return l && (e = l[d], "" === e && !f.contains(c.ownerDocument, c) && (e = f.style(c, d)), ya.test(e) && ic.test(d) && (g = r.width, m = r.minWidth, n = r.maxWidth, r.minWidth = r.maxWidth = r.width = e, e = l.width, r.width = g, r.minWidth = m, r.maxWidth = n)), e
    } : B.documentElement.currentStyle && (Q = function(b,
        c) {
        var d, f, e = b.currentStyle && b.currentStyle[c],
            g = b.style;
        return null == e && g && g[c] && (e = g[c]), ya.test(e) && !vd.test(c) && (d = g.left, f = b.runtimeStyle && b.runtimeStyle.left, f && (b.runtimeStyle.left = b.currentStyle.left), g.left = "fontSize" === c ? "1em" : e, e = g.pixelLeft + "px", g.left = d, f && (b.runtimeStyle.left = f)), "" === e ? "auto" : e
    });
    f.each(["height", "width"], function(b, c) {
        f.cssHooks[c] = {
            get: function(b, d, e) {
                if (d) return 0 === b.offsetWidth && wd.test(Q(b, "display")) ? f.swap(b, yd, function() {
                    return G(b, c, e)
                }) : G(b, c, e)
            },
            set: function(b,
                d, e) {
                return C(b, d, e ? Xa(b, c, e, f.support.boxSizing && "border-box" === f.css(b, "boxSizing")) : 0)
            }
        }
    });
    f.support.opacity || (f.cssHooks.opacity = {
        get: function(b, c) {
            return ud.test((c && b.currentStyle ? b.currentStyle.filter : b.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : c ? "1" : ""
        },
        set: function(b, c) {
            var d = b.style,
                e = b.currentStyle,
                g = f.isNumeric(c) ? "alpha(opacity=" + 100 * c + ")" : "",
                m = e && e.filter || d.filter || "";
            d.zoom = 1;
            if (!(1 <= c && "" === f.trim(m.replace(tb, "")) && d.removeAttribute && (d.removeAttribute("filter"), e && !e.filter))) d.filter =
                tb.test(m) ? m.replace(tb, g) : m + " " + g
        }
    });
    f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(b, c) {
                return f.swap(b, {
                    display: "inline-block"
                }, function() {
                    if (c) return Q(b, "marginRight")
                })
            }
        });
        !f.support.pixelPosition && f.fn.position && f.each(["top", "left"], function(b, c) {
            f.cssHooks[c] = {
                get: function(b, d) {
                    if (d) {
                        var e = Q(b, c);
                        return ya.test(e) ? f(b).position()[c] + "px" : e
                    }
                }
            }
        })
    });
    f.expr && f.expr.filters && (f.expr.filters.hidden = function(b) {
        return 0 === b.offsetWidth && 0 === b.offsetHeight || !f.support.reliableHiddenOffsets &&
            "none" === (b.style && b.style.display || Q(b, "display"))
    }, f.expr.filters.visible = function(b) {
        return !f.expr.filters.hidden(b)
    });
    f.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(b, c) {
        f.cssHooks[b + c] = {
            expand: function(d) {
                var f = "string" == typeof d ? d.split(" ") : [d],
                    e = {};
                for (d = 0; 4 > d; d++) e[b + ea[d] + c] = f[d] || f[d - 2] || f[0];
                return e
            }
        };
        ic.test(b) || (f.cssHooks[b + c].set = C)
    });
    var Ad = /%20/g,
        wc = /\[\]$/,
        kc = /\r?\n/g,
        Bd = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Cd = /^(?:select|textarea)/i;
    f.fn.extend({
        serialize: function() {
            return f.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Cd.test(this.nodeName) || Bd.test(this.type))
            }).map(function(b, c) {
                var d = f(this).val();
                return null == d ? null : f.isArray(d) ? f.map(d, function(b) {
                    return {
                        name: c.name,
                        value: b.replace(kc, "\r\n")
                    }
                }) : {
                    name: c.name,
                    value: d.replace(kc, "\r\n")
                }
            }).get()
        }
    });
    f.param = function(b, d) {
        var e, g = [],
            m = function(b, c) {
                c = f.isFunction(c) ? c() : null == c ? "" : c;
                g[g.length] = encodeURIComponent(b) + "=" + encodeURIComponent(c)
            };
        d === c && (d = f.ajaxSettings && f.ajaxSettings.traditional);
        if (f.isArray(b) || b.jquery && !f.isPlainObject(b)) f.each(b, function() {
            m(this.name, this.value)
        });
        else
            for (e in b) M(e, b[e], d, m);
        return g.join("&").replace(Ad, "+")
    };
    var qa, ka, Dd = /#.*$/,
        Ed = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Fd = /^(?:GET|HEAD)$/,
        Gd = /^\/\//,
        lc = /\?/,
        Hd = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Id = /([?&])_=[^&]*/,
        mc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        nc = f.fn.load,
        Za = {},
        oc = {},
        pc = ["*/"] + ["*"];
    try {
        ka = yc.href
    } catch (Rd) {
        ka = B.createElement("a"), ka.href = "", ka = ka.href
    }
    qa = mc.exec(ka.toLowerCase()) || [];
    f.fn.load = function(b, d, e) {
        if ("string" != typeof b && nc) return nc.apply(this, arguments);
        if (!this.length) return this;
        var g, m, n, l = this,
            r = b.indexOf(" ");
        return 0 <= r && (g = b.slice(r, b.length), b = b.slice(0, r)), f.isFunction(d) ? (e = d, d = c) : d && "object" == typeof d && (m = "POST"), f.ajax({
            url: b,
            type: m,
            dataType: "html",
            data: d,
            complete: function(b, c) {
                e && l.each(e, n || [b.responseText, c, b])
            }
        }).done(function(b) {
            n = arguments;
            l.html(g ? f("<div>").append(b.replace(Hd, "")).find(g) : b)
        }), this
    };
    f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, c) {
        f.fn[c] = function(b) {
            return this.on(c, b)
        }
    });
    f.each(["get", "post"], function(b, d) {
        f[d] = function(b, e, g, m) {
            return f.isFunction(e) && (m = m || g, g = e, e = c), f.ajax({
                type: d,
                url: b,
                data: e,
                success: g,
                dataType: m
            })
        }
    });
    f.extend({
        getScript: function(b, d) {
            return f.get(b,
                c, d, "script")
        },
        getJSON: function(b, c, d) {
            return f.get(b, c, d, "json")
        },
        ajaxSetup: function(b, c) {
            return c ? sa(b, f.ajaxSettings) : (c = b, b = f.ajaxSettings), sa(b, c), b
        },
        ajaxSettings: {
            url: ka,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(qa[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": pc
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": b.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: za(Za),
        ajaxTransport: za(oc),
        ajax: function(b, d) {
            function e(b, d, j, n) {
                var s, q, u, z, L, D = d;
                if (2 !== G) {
                    G = 2;
                    r && clearTimeout(r);
                    l = c;
                    m = n || "";
                    I.readyState = 0 < b ? 4 : 0;
                    if (j) {
                        z = v;
                        n = I;
                        var U, R, E, J, K = z.contents,
                            M = z.dataTypes,
                            P = z.responseFields;
                        for (R in P) R in j && (n[P[R]] = j[R]);
                        for (;
                            "*" === M[0];) M.shift(),
                            U === c && (U = z.mimeType || n.getResponseHeader("content-type"));
                        if (U)
                            for (R in K)
                                if (K[R] && K[R].test(U)) {
                                    M.unshift(R);
                                    break
                                }
                        if (M[0] in j) E = M[0];
                        else {
                            for (R in j) {
                                if (!M[0] || z.converters[R + " " + M[0]]) {
                                    E = R;
                                    break
                                }
                                J || (J = R)
                            }
                            E = E || J
                        }
                        z = j = E ? (E !== M[0] && M.unshift(E), j[E]) : void 0
                    }
                    if (200 <= b && 300 > b || 304 === b)
                        if (v.ifModified && (L = I.getResponseHeader("Last-Modified"), L && (f.lastModified[g] = L), L = I.getResponseHeader("Etag"), L && (f.etag[g] = L)), 304 === b) D = "notmodified", s = !0;
                        else {
                            var H;
                            a: {
                                s = v;
                                q = z;
                                var O, D = s.dataTypes.slice();
                                j = D[0];
                                U = {};
                                R = 0;
                                s.dataFilter && (q = s.dataFilter(q, s.dataType));
                                if (D[1])
                                    for (H in s.converters) U[H.toLowerCase()] = s.converters[H];
                                for (; u = D[++R];)
                                    if ("*" !== u) {
                                        if ("*" !== j && j !== u) {
                                            H = U[j + " " + u] || U["* " + u];
                                            if (!H)
                                                for (O in U)
                                                    if (L = O.split(" "), L[1] === u && (H = U[j + " " + L[0]] || U["* " + L[0]])) {
                                                        !0 === H ? H = U[O] : !0 !== U[O] && (u = L[0], D.splice(R--, 0, u));
                                                        break
                                                    }
                                            if (!0 !== H)
                                                if (H && s["throws"]) q = H(q);
                                                else try {
                                                    q = H(q)
                                                } catch (Q) {
                                                    H = {
                                                        state: "parsererror",
                                                        error: H ? Q : "No conversion from " + j + " to " + u
                                                    };
                                                    break a
                                                }
                                        }
                                        j = u
                                    }
                                H = {
                                    state: "success",
                                    data: q
                                }
                            }
                            s = H;
                            D = s.state;
                            q = s.data;
                            u = s.error;
                            s = !u
                        } else if (u = D, !D || b) D = "error", 0 > b && (b = 0);
                    I.status = b;
                    I.statusText = (d || D) + "";
                    s ? N.resolveWith(y, [q, D, I]) : N.rejectWith(y, [I, D, u]);
                    I.statusCode(B);
                    B = c;
                    p && x.trigger("ajax" + (s ? "Success" : "Error"), [I, v, s ? q : u]);
                    C.fireWith(y, [I, D]);
                    p && (x.trigger("ajaxComplete", [I, v]), --f.active || f.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof b && (d = b, b = c);
            d = d || {};
            var g, m, n, l, r, q, p, u, v = f.ajaxSetup({}, d),
                y = v.context || v,
                x = y !== v && (y.nodeType || y instanceof f) ? f(y) : f.event,
                N = f.Deferred(),
                C = f.Callbacks("once memory"),
                B = v.statusCode || {},
                D = {},
                E = {},
                G = 0,
                J = "canceled",
                I = {
                    readyState: 0,
                    setRequestHeader: function(b, c) {
                        if (!G) {
                            var d = b.toLowerCase();
                            b = E[d] = E[d] || b;
                            D[b] = c
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === G ? m : null
                    },
                    getResponseHeader: function(b) {
                        var d;
                        if (2 === G) {
                            if (!n)
                                for (n = {}; d = Ed.exec(m);) n[d[1].toLowerCase()] = d[2];
                            d = n[b.toLowerCase()]
                        }
                        return d === c ? null : d
                    },
                    overrideMimeType: function(b) {
                        return G || (v.mimeType = b), this
                    },
                    abort: function(b) {
                        return b = b || J, l && l.abort(b), e(0, b), this
                    }
                };
            N.promise(I);
            I.success = I.done;
            I.error = I.fail;
            I.complete = C.add;
            I.statusCode = function(b) {
                if (b) {
                    var c;
                    if (2 > G)
                        for (c in b) B[c] = [B[c], b[c]];
                    else c = b[I.status], I.always(c)
                }
                return this
            };
            v.url = ((b || v.url) + "").replace(Dd, "").replace(Gd, qa[1] + "//");
            v.dataTypes = f.trim(v.dataType || "*").toLowerCase().split(fa);
            null == v.crossDomain && (q = mc.exec(v.url.toLowerCase()) || !1, v.crossDomain = q && q.join(":") + (q[3] ? "" : "http:" === q[1] ? 80 : 443) !== qa.join(":") + (qa[3] ? "" : "http:" === qa[1] ? 80 : 443));
            v.data && v.processData && "string" != typeof v.data && (v.data = f.param(v.data,
                v.traditional));
            na(Za, v, d, I);
            if (2 === G) return I;
            p = v.global;
            v.type = v.type.toUpperCase();
            v.hasContent = !Fd.test(v.type);
            p && 0 === f.active++ && f.event.trigger("ajaxStart");
            if (!v.hasContent && (v.data && (v.url += (lc.test(v.url) ? "&" : "?") + v.data, delete v.data), g = v.url, !1 === v.cache)) {
                q = f.now();
                var K = v.url.replace(Id, "$1_=" + q);
                v.url = K + (K === v.url ? (lc.test(v.url) ? "&" : "?") + "_=" + q : "")
            }(v.data && v.hasContent && !1 !== v.contentType || d.contentType) && I.setRequestHeader("Content-Type", v.contentType);
            v.ifModified && (g = g || v.url,
                f.lastModified[g] && I.setRequestHeader("If-Modified-Since", f.lastModified[g]), f.etag[g] && I.setRequestHeader("If-None-Match", f.etag[g]));
            I.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + pc + "; q=0.01" : "") : v.accepts["*"]);
            for (u in v.headers) I.setRequestHeader(u, v.headers[u]);
            if (!v.beforeSend || !1 !== v.beforeSend.call(y, I, v) && 2 !== G) {
                J = "abort";
                for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) I[u](v[u]);
                if (l = na(oc, v, d, I)) {
                    I.readyState = 1;
                    p && x.trigger("ajaxSend", [I, v]);
                    v.async && 0 < v.timeout && (r = setTimeout(function() {
                        I.abort("timeout")
                    }, v.timeout));
                    try {
                        G = 1, l.send(D, e)
                    } catch (M) {
                        if (2 > G) e(-1, M);
                        else throw M;
                    }
                } else e(-1, "No Transport");
                return I
            }
            return I.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var qc = [],
        Jd = /\?/,
        Va = /(=)\?(?=&|$)|\?\?/,
        Kd = f.now();
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var b = qc.pop() || f.expando + "_" + Kd++;
            return this[b] = !0, b
        }
    });
    f.ajaxPrefilter("json jsonp", function(d, e, g) {
        var m, n, l, r = d.data,
            q = d.url,
            p = !1 !== d.jsonp,
            v = p && Va.test(q),
            u = p && !v && "string" == typeof r && !(d.contentType || "").indexOf("application/x-www-form-urlencoded") && Va.test(r);
        if ("jsonp" === d.dataTypes[0] || v || u) return m = d.jsonpCallback = f.isFunction(d.jsonpCallback) ? d.jsonpCallback() : d.jsonpCallback, n = b[m], v ? d.url = q.replace(Va, "$1" + m) : u ? d.data = r.replace(Va, "$1" + m) : p && (d.url += (Jd.test(q) ? "&" : "?") + d.jsonp + "=" + m), d.converters["script json"] = function() {
            return l || f.error(m + " was not called"), l[0]
        }, d.dataTypes[0] = "json", b[m] = function() {
            l = arguments
        }, g.always(function() {
            b[m] =
                n;
            d[m] && (d.jsonpCallback = e.jsonpCallback, qc.push(m));
            l && f.isFunction(n) && n(l[0]);
            l = n = c
        }), "script"
    });
    f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(b) {
                return f.globalEval(b), b
            }
        }
    });
    f.ajaxPrefilter("script", function(b) {
        b.cache === c && (b.cache = !1);
        b.crossDomain && (b.type = "GET", b.global = !1)
    });
    f.ajaxTransport("script", function(b) {
        if (b.crossDomain) {
            var d, f =
                B.head || B.getElementsByTagName("head")[0] || B.documentElement;
            return {
                send: function(e, g) {
                    d = B.createElement("script");
                    d.async = "async";
                    b.scriptCharset && (d.charset = b.scriptCharset);
                    d.src = b.url;
                    d.onload = d.onreadystatechange = function(b, e) {
                        if (e || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, f && d.parentNode && f.removeChild(d), d = c, e || g(200, "success")
                    };
                    f.insertBefore(d, f.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ra, ub = b.ActiveXObject ? function() {
            for (var b in ra) ra[b](0,
                1)
        } : !1,
        Ld = 0;
    f.ajaxSettings.xhr = b.ActiveXObject ? function() {
        var c;
        if (!(c = !this.isLocal && zb())) a: {
            try {
                c = new b.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (d) {}
            c = void 0
        }
        return c
    } : zb;
    var vb = f.ajaxSettings.xhr();
    f.extend(f.support, {
        ajax: !!vb,
        cors: !!vb && "withCredentials" in vb
    });
    f.support.ajax && f.ajaxTransport(function(d) {
        if (!d.crossDomain || f.support.cors) {
            var e;
            return {
                send: function(g, m) {
                    var n, l, r = d.xhr();
                    d.username ? r.open(d.type, d.url, d.async, d.username, d.password) : r.open(d.type, d.url, d.async);
                    if (d.xhrFields)
                        for (l in d.xhrFields) r[l] =
                            d.xhrFields[l];
                    d.mimeType && r.overrideMimeType && r.overrideMimeType(d.mimeType);
                    !d.crossDomain && !g["X-Requested-With"] && (g["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (l in g) r.setRequestHeader(l, g[l])
                    } catch (q) {}
                    r.send(d.hasContent && d.data || null);
                    e = function(b, g) {
                        var l, q, p, v, u;
                        try {
                            if (e && (g || 4 === r.readyState))
                                if (e = c, n && (r.onreadystatechange = f.noop, ub && delete ra[n]), g) 4 !== r.readyState && r.abort();
                                else {
                                    l = r.status;
                                    p = r.getAllResponseHeaders();
                                    v = {};
                                    (u = r.responseXML) && u.documentElement && (v.xml = u);
                                    try {
                                        v.text =
                                            r.responseText
                                    } catch (z) {}
                                    try {
                                        q = r.statusText
                                    } catch (y) {
                                        q = ""
                                    }!l && d.isLocal && !d.crossDomain ? l = v.text ? 200 : 404 : 1223 === l && (l = 204)
                                }
                        } catch (x) {
                            g || m(-1, x)
                        }
                        v && m(l, q, v, p)
                    };
                    d.async ? 4 === r.readyState ? setTimeout(e, 0) : (n = ++Ld, ub && (ra || (ra = {}, f(b).unload(ub)), ra[n] = e), r.onreadystatechange = e) : e()
                },
                abort: function() {
                    e && e(0, 1)
                }
            }
        }
    });
    var Aa, Wa, Md = /^(?:toggle|show|hide)$/,
        Nd = RegExp("^(?:([-+])=|)(" + Ea + ")([a-z%]*)$", "i"),
        Od = /queueHooks$/,
        Ba = [
            function(b, c, d) {
                var e, g, m, n, l, r, q = this,
                    p = b.style,
                    v = {},
                    u = [],
                    y = b.nodeType && N(b);
                d.queue ||
                    (l = f._queueHooks(b, "fx"), null == l.unqueued && (l.unqueued = 0, r = l.empty.fire, l.empty.fire = function() {
                        l.unqueued || r()
                    }), l.unqueued++, q.always(function() {
                        q.always(function() {
                            l.unqueued--;
                            f.queue(b, "fx").length || l.empty.fire()
                        })
                    }));
                1 === b.nodeType && ("height" in c || "width" in c) && (d.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === f.css(b, "display") && "none" === f.css(b, "float") && (!f.support.inlineBlockNeedsLayout || "inline" === P(b.nodeName) ? p.display = "inline-block" : p.zoom = 1));
                d.overflow && (p.overflow = "hidden",
                    f.support.shrinkWrapBlocks || q.done(function() {
                        p.overflow = d.overflow[0];
                        p.overflowX = d.overflow[1];
                        p.overflowY = d.overflow[2]
                    }));
                for (e in c) g = c[e], Md.exec(g) && (delete c[e], g !== (y ? "hide" : "show") && u.push(e));
                if (g = u.length) {
                    m = f._data(b, "fxshow") || f._data(b, "fxshow", {});
                    y ? f(b).show() : q.done(function() {
                        f(b).hide()
                    });
                    q.done(function() {
                        var c;
                        f.removeData(b, "fxshow", !0);
                        for (c in v) f.style(b, c, v[c])
                    });
                    for (e = 0; e < g; e++) c = u[e], n = q.createTween(c, y ? m[c] : 0), v[c] = m[c] || f.style(b, c), c in m || (m[c] = n.start, y && (n.end = n.start,
                        n.start = "width" === c || "height" === c ? 1 : 0))
                }
            }
        ],
        ta = {
            "*": [
                function(b, c) {
                    var d, e, g = this.createTween(b, c),
                        m = Nd.exec(c),
                        n = g.cur(),
                        l = +n || 0,
                        r = 1,
                        q = 20;
                    if (m) {
                        d = +m[2];
                        e = m[3] || (f.cssNumber[b] ? "" : "px");
                        if ("px" !== e && l) {
                            l = f.css(g.elem, b, !0) || d || 1;
                            do r = r || ".5", l /= r, f.style(g.elem, b, l + e); while (r !== (r = g.cur() / n) && 1 !== r && --q)
                        }
                        g.unit = e;
                        g.start = l;
                        g.end = m[1] ? l + (m[1] + 1) * d : d
                    }
                    return g
                }
            ]
        };
    f.Animation = f.extend(Bb, {
        tweener: function(b, c) {
            f.isFunction(b) ? (c = b, b = ["*"]) : b = b.split(" ");
            for (var d, e = 0, g = b.length; e < g; e++) d = b[e], ta[d] = ta[d] || [], ta[d].unshift(c)
        },
        prefilter: function(b, c) {
            c ? Ba.unshift(b) : Ba.push(b)
        }
    });
    f.Tween = S;
    S.prototype = {
        constructor: S,
        init: function(b, c, d, e, g, m) {
            this.elem = b;
            this.prop = d;
            this.easing = g || "swing";
            this.options = c;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = m || (f.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var b = S.propHooks[this.prop];
            return b && b.get ? b.get(this) : S.propHooks._default.get(this)
        },
        run: function(b) {
            var c, d = S.propHooks[this.prop];
            return this.options.duration ? this.pos = c = f.easing[this.easing](b, this.options.duration *
                b, 0, 1, this.options.duration) : this.pos = c = b, this.now = (this.end - this.start) * c + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : S.propHooks._default.set(this), this
        }
    };
    S.prototype.init.prototype = S.prototype;
    S.propHooks = {
        _default: {
            get: function(b) {
                var c;
                return null == b.elem[b.prop] || b.elem.style && null != b.elem.style[b.prop] ? (c = f.css(b.elem, b.prop, !1, ""), !c || "auto" === c ? 0 : c) : b.elem[b.prop]
            },
            set: function(b) {
                f.fx.step[b.prop] ? f.fx.step[b.prop](b) : b.elem.style &&
                    (null != b.elem.style[f.cssProps[b.prop]] || f.cssHooks[b.prop]) ? f.style(b.elem, b.prop, b.now + b.unit) : b.elem[b.prop] = b.now
            }
        }
    };
    S.propHooks.scrollTop = S.propHooks.scrollLeft = {
        set: function(b) {
            b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
        }
    };
    f.each(["toggle", "show", "hide"], function(b, c) {
        var d = f.fn[c];
        f.fn[c] = function(e, g, m) {
            return null == e || "boolean" == typeof e || !b && f.isFunction(e) && f.isFunction(g) ? d.apply(this, arguments) : this.animate(Ca(c, !0), e, g, m)
        }
    });
    f.fn.extend({
        fadeTo: function(b, c, d, f) {
            return this.filter(N).css("opacity",
                0).show().end().animate({
                opacity: c
            }, b, d, f)
        },
        animate: function(b, c, d, e) {
            var g = f.isEmptyObject(b),
                m = f.speed(c, d, e);
            c = function() {
                var c = Bb(this, f.extend({}, b), m);
                g && c.stop(!0)
            };
            return g || !1 === m.queue ? this.each(c) : this.queue(m.queue, c)
        },
        stop: function(b, d, e) {
            var g = function(b) {
                var c = b.stop;
                delete b.stop;
                c(e)
            };
            return "string" != typeof b && (e = d, d = b, b = c), d && !1 !== b && this.queue(b || "fx", []), this.each(function() {
                var c = !0,
                    d = null != b && b + "queueHooks",
                    m = f.timers,
                    j = f._data(this);
                if (d) j[d] && j[d].stop && g(j[d]);
                else
                    for (d in j) j[d] &&
                        j[d].stop && Od.test(d) && g(j[d]);
                for (d = m.length; d--;) m[d].elem === this && (null == b || m[d].queue === b) && (m[d].anim.stop(e), c = !1, m.splice(d, 1));
                (c || !e) && f.dequeue(this, b)
            })
        }
    });
    f.each({
        slideDown: Ca("show"),
        slideUp: Ca("hide"),
        slideToggle: Ca("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(b, c) {
        f.fn[b] = function(b, d, f) {
            return this.animate(c, b, d, f)
        }
    });
    f.speed = function(b, c, d) {
        var e = b && "object" == typeof b ? f.extend({}, b) : {
            complete: d || !d && c || f.isFunction(b) && b,
            duration: b,
            easing: d && c || c && !f.isFunction(c) && c
        };
        e.duration = f.fx.off ? 0 : "number" == typeof e.duration ? e.duration : e.duration in f.fx.speeds ? f.fx.speeds[e.duration] : f.fx.speeds._default;
        if (null == e.queue || !0 === e.queue) e.queue = "fx";
        return e.old = e.complete, e.complete = function() {
            f.isFunction(e.old) && e.old.call(this);
            e.queue && f.dequeue(this, e.queue)
        }, e
    };
    f.easing = {
        linear: function(b) {
            return b
        },
        swing: function(b) {
            return 0.5 - Math.cos(b * Math.PI) / 2
        }
    };
    f.timers = [];
    f.fx = S.prototype.init;
    f.fx.tick = function() {
        for (var b, c = f.timers,
            d = 0; d < c.length; d++) b = c[d], !b() && c[d] === b && c.splice(d--, 1);
        c.length || f.fx.stop()
    };
    f.fx.timer = function(b) {
        b() && f.timers.push(b) && !Wa && (Wa = setInterval(f.fx.tick, f.fx.interval))
    };
    f.fx.interval = 13;
    f.fx.stop = function() {
        clearInterval(Wa);
        Wa = null
    };
    f.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    f.fx.step = {};
    f.expr && f.expr.filters && (f.expr.filters.animated = function(b) {
        return f.grep(f.timers, function(c) {
            return b === c.elem
        }).length
    });
    var rc = /^(?:body|html)$/i;
    f.fn.offset = function(b) {
        if (arguments.length) return b ===
            c ? this : this.each(function(c) {
                f.offset.setOffset(this, b, c)
            });
        var d, e, g, m, n, l, r, q = {
                top: 0,
                left: 0
            },
            p = this[0],
            v = p && p.ownerDocument;
        if (v) return (e = v.body) === p ? f.offset.bodyOffset(p) : (d = v.documentElement, f.contains(d, p) ? ("undefined" != typeof p.getBoundingClientRect && (q = p.getBoundingClientRect()), g = Cb(v), m = d.clientTop || e.clientTop || 0, n = d.clientLeft || e.clientLeft || 0, l = g.pageYOffset || d.scrollTop, r = g.pageXOffset || d.scrollLeft, {
            top: q.top + l - m,
            left: q.left + r - n
        }) : q)
    };
    f.offset = {
        bodyOffset: function(b) {
            var c = b.offsetTop,
                d = b.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (c += parseFloat(f.css(b, "marginTop")) || 0, d += parseFloat(f.css(b, "marginLeft")) || 0), {
                top: c,
                left: d
            }
        },
        setOffset: function(b, c, d) {
            var e = f.css(b, "position");
            "static" === e && (b.style.position = "relative");
            var g = f(b),
                m = g.offset(),
                n = f.css(b, "top"),
                l = f.css(b, "left"),
                r = {},
                q = {},
                p, v;
            ("absolute" === e || "fixed" === e) && -1 < f.inArray("auto", [n, l]) ? (q = g.position(), p = q.top, v = q.left) : (p = parseFloat(n) || 0, v = parseFloat(l) || 0);
            f.isFunction(c) && (c = c.call(b, d, m));
            null !=
                c.top && (r.top = c.top - m.top + p);
            null != c.left && (r.left = c.left - m.left + v);
            "using" in c ? c.using.call(b, r) : g.css(r)
        }
    };
    f.fn.extend({
        position: function() {
            if (this[0]) {
                var b = this[0],
                    c = this.offsetParent(),
                    d = this.offset(),
                    e = rc.test(c[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : c.offset();
                return d.top -= parseFloat(f.css(b, "marginTop")) || 0, d.left -= parseFloat(f.css(b, "marginLeft")) || 0, e.top += parseFloat(f.css(c[0], "borderTopWidth")) || 0, e.left += parseFloat(f.css(c[0], "borderLeftWidth")) || 0, {
                    top: d.top - e.top,
                    left: d.left - e.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var b =
                    this.offsetParent || B.body; b && !rc.test(b.nodeName) && "static" === f.css(b, "position");) b = b.offsetParent;
                return b || B.body
            })
        }
    });
    f.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, d) {
        var e = /Y/.test(d);
        f.fn[b] = function(g) {
            return f.access(this, function(b, g, m) {
                var n = Cb(b);
                if (m === c) return n ? d in n ? n[d] : n.document.documentElement[g] : b[g];
                n ? n.scrollTo(e ? f(n).scrollLeft() : m, e ? m : f(n).scrollTop()) : b[g] = m
            }, b, g, arguments.length, null)
        }
    });
    f.each({
        Height: "height",
        Width: "width"
    }, function(b, d) {
        f.each({
            padding: "inner" +
                b,
            content: d,
            "": "outer" + b
        }, function(e, g) {
            f.fn[g] = function(g, m) {
                var n = arguments.length && (e || "boolean" != typeof g),
                    l = e || (!0 === g || !0 === m ? "margin" : "border");
                return f.access(this, function(d, e, g) {
                    var m;
                    return f.isWindow(d) ? d.document.documentElement["client" + b] : 9 === d.nodeType ? (m = d.documentElement, Math.max(d.body["scroll" + b], m["scroll" + b], d.body["offset" + b], m["offset" + b], m["client" + b])) : g === c ? f.css(d, e, g, l) : f.style(d, e, g, l)
                }, d, n ? g : c, n, null)
            }
        })
    });
    b.jQuery = b.$ = f;
    "function" == typeof define && define.amd && define.amd.jQuery &&
        define("jquery", [], function() {
            return f
        })
})(window);
var portraitMode = !0,
    mobilePortraitWidth = 480,
    mobilePortraitHeight = 640,
    mobileLandscapeWidth = 640,
    mobileLandscapeHeight = 480,
    mobileWidth = portraitMode ? mobilePortraitWidth : mobileLandscapeWidth,
    mobileHeight = portraitMode ? mobilePortraitHeight : mobileLandscapeHeight,
    desktopWidth = 480,
    desktopHeight = 640,
    w, h, multiplier, destW, destH, dynamicClickableEntityDivs = {},
    coreDivsToResize = ["game", "orientate"],
    advancedDivsToResize = {
        MobileAdInGamePreroll: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height +
                20
        },
        MobileAdInGameEnd: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        },
        MobileAdInGamePreroll2: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd2: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        },
        MobileAdInGamePreroll3: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd3: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width +
                2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        }
    };

function adjustLayers(b) {
    for (i = 0; i < coreDivsToResize.length; i++) ig.ua.mobile ? ($("#" + coreDivsToResize[i]).width(w), $("#" + coreDivsToResize[i]).height(h)) : ($("#" + coreDivsToResize[i]).width(destW), $("#" + coreDivsToResize[i]).height(destH), $("#" + coreDivsToResize[i]).css("left", b ? 0 : w / 2 - destW / 2));
    for (key in advancedDivsToResize) try {
        $("#" + key).width(w), $("#" + key).height(h), $("#" + key + "-Box").css("left", (w - advancedDivsToResize[key]["box-width"]) / 2), $("#" + key + "-Box").css("top", (h - advancedDivsToResize[key]["box-height"]) /
            2)
    } catch (c) {
        console.log(c)
    }
    $("#ajaxbar").width(w);
    $("#ajaxbar").height(h)
}

function sizeHandler() {
    $("#game") && (w = window.innerWidth, h = window.innerHeight, ig.ua.mobile ? (multiplier = Math.min(h / mobileHeight, w / mobileWidth), destW = mobileWidth * multiplier, destH = mobileHeight * multiplier) : (multiplier = Math.min(h / desktopHeight, w / desktopWidth), destW = desktopWidth * multiplier, destH = desktopHeight * multiplier), widthRatio = window.innerWidth / mobileWidth, heightRatio = window.innerHeight / mobileHeight, adjustLayers(), window.scrollTo(0, 1))
}

function orientationHandler() {
    console.log("changing orientation ...");
    ig.ua.mobile && ((portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth) ? ($("#orientate").show(), $("#game").hide()) : ($("#orientate").hide(), $("#game").show()));
    sizeHandler()
}

function fixSamsungHandler() {
    ig.ua.android && !(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && (!(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox"))) && (document.addEventListener("touchstart", function(b) {
        b.preventDefault();
        return !1
    }, !1), document.addEventListener("touchmove", function(b) {
        b.preventDefault();
        return !1
    }, !1), document.addEventListener("touchend",
        function(b) {
            b.preventDefault();
            return !1
        }, !1))
}
window.addEventListener("resize", function() {
    orientationHandler()
}, !1);
window.addEventListener("orientationchange", function() {
    orientationHandler()
}, !1);
"true" === getQueryVariable("webview") ? ($(window).focus(function() {
    ig.game && ig.game.resumeGame();
    ig.game && ig.game.unmute(!0)
}), $(window).blur(function() {
    ig.game && ig.game.pauseGame();
    ig.game && ig.game.mute(!0)
})) : (window.onfocus = function() {
    ig.game && ig.game.resumeGame();
    ig.game && ig.game.unmute(!0)
}, window.onblur = function() {
    ig.game && ig.game.pauseGame();
    ig.game && ig.game.mute(!0)
});
document.ontouchmove = function() {
    window.scrollTo(0, 1)
};

function getInternetExplorerVersion() {
    var b = -1;
    "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
    return b
}
var ie = getInternetExplorerVersion();

function getQueryVariable(b) {
    for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (decodeURIComponent(e[0]) == b) return decodeURIComponent(e[1])
    }
}
this.jukebox = {};
jukebox.Player = function(b, c) {
    this.id = ++jukebox.__jukeboxId;
    this.origin = c || null;
    this.settings = {};
    for (var d in this.defaults) this.settings[d] = this.defaults[d];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var e in b) this.settings[e] = b[e];
    "[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager);
    this.resource = this.isPlaying = null;
    this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) :
        this.settings.resources[0] || null;
    if (null === this.resource) throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
    this.__init();
    return this
};
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
    defaults: {
        resources: [],
        autoplay: !1,
        spritemap: {},
        flashMediaElement: "./swf/FlashMediaElement.swf",
        timeout: 1E3
    },
    __addToManager: function() {
        !0 !== this.__wasAddedToManager && (jukebox.Manager.add(this), this.__wasAddedToManager = !0)
    },
    __init: function() {
        var b = this,
            c = this.settings,
            d = {},
            e;
        jukebox.Manager && void 0 !== jukebox.Manager.features && (d = jukebox.Manager.features);
        if (!0 === d.html5audio) {
            this.context = new Audio;
            this.context.src = this.resource;
            if (null === this.origin) {
                var g = function(c) {
                    b.__addToManager(c)
                };
                this.context.addEventListener("canplaythrough", g, !0);
                window.setTimeout(function() {
                    b.context.removeEventListener("canplaythrough", g, !0);
                    g("timeout")
                }, c.timeout)
            }
            this.context.autobuffer = !0;
            this.context.preload = !0;
            for (e in this.HTML5API) this[e] = this.HTML5API[e];
            1 < d.channels ? !0 === c.autoplay ? this.context.autoplay = !0 : void 0 !== c.spritemap[c.autoplay] && this.play(c.autoplay) : 1 === d.channels && void 0 !== c.spritemap[c.autoplay] && (this.backgroundMusic = c.spritemap[c.autoplay], this.backgroundMusic.started = Date.now ?
                Date.now() : +new Date, this.play(c.autoplay));
            1 == d.channels && !0 !== c.canPlayBackground && (window.addEventListener("pagehide", function() {
                null !== b.isPlaying && (b.pause(), b.__wasAutoPaused = !0)
            }), window.addEventListener("pageshow", function() {
                b.__wasAutoPaused && (b.resume(), delete b._wasAutoPaused)
            }))
        } else if (!0 === d.flashaudio) {
            for (e in this.FLASHAPI) this[e] = this.FLASHAPI[e];
            d = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
            this.__initFlashContext(d);
            !0 === c.autoplay ? this.play(0) : c.spritemap[c.autoplay] && this.play(c.autoplay)
        } else throw "Your Browser does not support Flash Audio or HTML5 Audio.";
    },
    __initFlashContext: function(b) {
        var c, d = this.settings.flashMediaElement,
            e, g = {
                flashvars: b.join("&"),
                quality: "high",
                bgcolor: "#000000",
                wmode: "transparent",
                allowscriptaccess: "always",
                allowfullscreen: "true"
            };
        if (navigator.userAgent.match(/MSIE/)) {
            c = document.createElement("div");
            document.getElementsByTagName("body")[0].appendChild(c);
            var l = document.createElement("object");
            l.id = "jukebox-flashstream-" + this.id;
            l.setAttribute("type", "application/x-shockwave-flash");
            l.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
            l.setAttribute("width", "0");
            l.setAttribute("height", "0");
            g.movie = d + "?x=" + (Date.now ? Date.now() : +new Date);
            g.flashvars = b.join("&amp;");
            for (e in g) b = document.createElement("param"), b.setAttribute("name", e), b.setAttribute("value", g[e]), l.appendChild(b);
            c.outerHTML = l.outerHTML;
            this.context = document.getElementById("jukebox-flashstream-" + this.id)
        } else {
            c =
                document.createElement("embed");
            c.id = "jukebox-flashstream-" + this.id;
            c.setAttribute("type", "application/x-shockwave-flash");
            c.setAttribute("width", "100");
            c.setAttribute("height", "100");
            g.play = !1;
            g.loop = !1;
            g.src = d + "?x=" + (Date.now ? Date.now() : +new Date);
            for (e in g) c.setAttribute(e, g[e]);
            document.getElementsByTagName("body")[0].appendChild(c);
            this.context = c
        }
    },
    backgroundHackForiOS: function() {
        if (void 0 !== this.backgroundMusic) {
            var b = Date.now ? Date.now() : +new Date;
            void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started =
                b, this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (b - this.backgroundMusic.started) / 1E3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start, this.play(this.backgroundMusic.lastPointer))
        }
    },
    play: function(b, c) {
        if (null !== this.isPlaying && !0 !== c) void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(b, this.id);
        else {
            var d = this.settings.spritemap,
                e;
            if (void 0 !== d[b]) e = d[b].start;
            else if ("number" === typeof b) {
                e = b;
                for (var g in d)
                    if (e >= d[g].start && e <=
                        d[g].end) {
                        b = g;
                        break
                    }
            }
            void 0 !== e && "[object Object]" === Object.prototype.toString.call(d[b]) && (this.isPlaying = this.settings.spritemap[b], this.context.play && this.context.play(), this.wasReady = this.setCurrentTime(e))
        }
    },
    stop: function() {
        this.__lastPosition = 0;
        this.isPlaying = null;
        this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause();
        return !0
    },
    pause: function() {
        this.isPlaying = null;
        this.__lastPosition = this.getCurrentTime();
        this.context.pause();
        return this.__lastPosition
    },
    resume: function(b) {
        b = "number" ===
            typeof b ? b : this.__lastPosition;
        if (null !== b) return this.play(b), this.__lastPosition = null, !0;
        this.context.play();
        return !1
    },
    HTML5API: {
        getVolume: function() {
            return this.context.volume || 1
        },
        setVolume: function(b) {
            this.context.volume = b;
            return 1E-4 > Math.abs(this.context.volume - b) ? !0 : !1
        },
        getCurrentTime: function() {
            return this.context.currentTime || 0
        },
        setCurrentTime: function(b) {
            try {
                return this.context.currentTime = b, !0
            } catch (c) {
                return !1
            }
        }
    },
    FLASHAPI: {
        getVolume: function() {
            return this.context && "function" === typeof this.context.getVolume ?
                this.context.getVolume() : 1
        },
        setVolume: function(b) {
            return this.context && "function" === typeof this.context.setVolume ? (this.context.setVolume(b), !0) : !1
        },
        getCurrentTime: function() {
            return this.context && "function" === typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0
        },
        setCurrentTime: function(b) {
            return this.context && "function" === typeof this.context.setCurrentTime ? this.context.setCurrentTime(b) : !1
        }
    }
};
if (void 0 === this.jukebox) throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(b) {
    this.features = {};
    this.codecs = {};
    this.__players = {};
    this.__playersLength = 0;
    this.__clones = {};
    this.__queue = [];
    this.settings = {};
    for (var c in this.defaults) this.settings[c] = this.defaults[c];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var d in b) this.settings[d] = b[d];
    this.__detectFeatures();
    jukebox.Manager.__initialized = !1 === this.settings.useGameLoop ? window.setInterval(function() {
        jukebox.Manager.loop()
    }, 20) : !0
};
jukebox.Manager.prototype = {
    defaults: {
        useFlash: !1,
        useGameLoop: !1
    },
    __detectFeatures: function() {
        var b = window.Audio && new Audio;
        if (b && b.canPlayType && !1 === this.settings.useFlash) {
            for (var c = [{
                    e: "3gp",
                    m: ["audio/3gpp", "audio/amr"]
                }, {
                    e: "aac",
                    m: ["audio/aac", "audio/aacp"]
                }, {
                    e: "amr",
                    m: ["audio/amr", "audio/3gpp"]
                }, {
                    e: "caf",
                    m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"']
                }, {
                    e: "m4a",
                    m: 'audio/mp4{audio/mp4; codecs="mp4a.40.2,avc1.42E01E"{audio/mpeg4{audio/mpeg4-generic{audio/mp4a-latm{audio/MP4A-LATM{audio/x-m4a'.split("{")
                }, {
                    e: "mp3",
                    m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"]
                }, {
                    e: "mpga",
                    m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"]
                }, {
                    e: "mp4",
                    m: ["audio/mp4", "video/mp4"]
                }, {
                    e: "ogg",
                    m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
                }, {
                    e: "wav",
                    m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"]
                }, {
                    e: "webm",
                    m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"]
                }],
                d, e, g = 0, l = c.length; g < l; g++)
                if (e = c[g].e, c[g].m.length && "object" === typeof c[g].m)
                    for (var p = 0, x = c[g].m.length; p < x; p++)
                        if (d = c[g].m[p], "" !== b.canPlayType(d)) {
                            this.codecs[e] = d;
                            break
                        } else this.codecs[e] || (this.codecs[e] = !1);
            this.features.html5audio = !(!this.codecs.mp3 && !this.codecs.ogg && !this.codecs.webm && !this.codecs.wav);
            this.features.channels = 8;
            b.volume = 0.1337;
            this.features.volume = !!(1E-4 > Math.abs(b.volume - 0.1337));
            navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
        }
        this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1;
        if (window.ActiveXObject) try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"), this.features.flashaudio = !0
        } catch (q) {}!0 === this.settings.useFlash && (this.features.flashaudio = !0);
        !0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "audio/mp3", this.codecs.mpga = "audio/mpeg", this.codecs.mp4 = "audio/mp4", this.codecs.m4a = "audio/mp4", this.codecs["3gp"] = "audio/3gpp", this.codecs.amr = "audio/amr",
            this.features.volume = !0, this.features.channels = 1)
    },
    __getPlayerById: function(b) {
        return this.__players && void 0 !== this.__players[b] ? this.__players[b] : null
    },
    __getClone: function(b, c) {
        for (var d in this.__clones) {
            var e = this.__clones[d];
            if (null === e.isPlaying && e.origin === b) return e
        }
        if ("[object Object]" === Object.prototype.toString.call(c)) {
            d = {};
            for (var g in c) d[g] = c[g];
            d.autoplay = !1;
            g = new jukebox.Player(d, b);
            g.isClone = !0;
            g.wasReady = !1;
            return this.__clones[g.id] = g
        }
        return null
    },
    loop: function() {
        if (0 !== this.__playersLength)
            if (this.__queue.length &&
                this.__playersLength < this.features.channels) {
                var b = this.__queue[0],
                    c = this.__getPlayerById(b.origin);
                if (null !== c) {
                    var d = this.__getClone(b.origin, c.settings);
                    null !== d && (!0 === this.features.volume && (c = this.__players[b.origin]) && d.setVolume(c.getVolume()), this.add(d), d.play(b.pointer, !0))
                }
                this.__queue.splice(0, 1)
            } else
                for (d in this.__queue.length && 1 === this.features.channels && (b = this.__queue[0], c = this.__getPlayerById(b.origin), null !== c && c.play(b.pointer, !0), this.__queue.splice(0, 1)), this.__players) b = this.__players[d],
                    c = b.getCurrentTime() || 0, b.isPlaying && !1 === b.wasReady ? b.wasReady = b.setCurrentTime(b.isPlaying.start) : b.isPlaying && !0 === b.wasReady ? c > b.isPlaying.end && (!0 === b.isPlaying.loop ? b.play(b.isPlaying.start, !0) : b.stop()) : b.isClone && null === b.isPlaying ? this.remove(b) : void 0 !== b.backgroundMusic && null === b.isPlaying && c > b.backgroundMusic.end && b.backgroundHackForiOS()
    },
    getPlayableResource: function(b) {
        "[object Array]" !== Object.prototype.toString.call(b) && (b = [b]);
        for (var c = 0, d = b.length; c < d; c++) {
            var e = b[c],
                g = e.match(/\.([^\.]*)$/)[1];
            if (g && this.codecs[g]) return e
        }
        return null
    },
    add: function(b) {
        return b instanceof jukebox.Player && void 0 === this.__players[b.id] ? (this.__playersLength++, this.__players[b.id] = b, !0) : !1
    },
    remove: function(b) {
        return b instanceof jukebox.Player && void 0 !== this.__players[b.id] ? (this.__playersLength--, delete this.__players[b.id], !0) : !1
    },
    addToQueue: function(b, c) {
        return ("string" === typeof b || "number" === typeof b) && void 0 !== this.__players[c] ? (this.__queue.push({
            pointer: b,
            origin: c
        }), !0) : !1
    }
};
var MarketJS = {};
(function() {
    function b(b, g, l, p) {
        try {
            var x = window.XDomainRequest ? new XDomainRequest : new XMLHttpRequest,
                q;
            switch (b) {
                case "single-metric-write":
                    q = c + "/metric/write/" + d + "/" + g + "/" + l;
                    break;
                case "single-metric-read":
                    q = c + "/metric/read/single/" + d + "/" + g;
                    break;
                case "multi-metric-write":
                    q = c + "/metric/write";
                    break;
                case "multi-metric-read":
                    q = c + "/metric/read/multi/" + d + "?" + g;
                    break;
                case "leaderboard-read":
                    q = c + "/leaderboard/read/" + d + "?" + g;
                    break;
                case "leaderboard-write":
                    break;
                default:
                    console.log("no mode found")
            }
            x.onerror =
                function() {
                    console.log(x.responseText)
                };
            x.onload = function() {
                var b = JSON.parse(x.responseText);
                p ? (console.log("passing to callback ..."), p(b)) : console.log(b)
            };
            window.XDomainRequest ? x.open("GET", q) : x.open("GET", q, !0);
            x.send()
        } catch (u) {
            console.log(u)
        }
    }
    var c = (9 < ie ? "http://" : "https://") + "marketjs-gamecenter.appspot.com",
        d = "";
    MarketJS.Initialize = function(b) {
        d = b;
        MarketJS.SingleMetric.Write("InitializeGame", "1")
    };
    MarketJS.SingleMetric = {
        Write: function(c, d) {
            b("single-metric-write", c, d)
        },
        Read: function(c) {
            b("single-metric-read",
                c)
        }
    };
    MarketJS.MultiMetric = {
        Write: function(b) {
            var g = {};
            g.data = JSON.stringify(b);
            g.game_key = d;
            try {
                $.post(c + "/metric/write", g, function(b) {
                    console.log("Response: " + b)
                })
            } catch (l) {
                console.log(l)
            }
        },
        Read: function(c, d, l) {
            var p = "";
            for (i = 0; i < c.length; i++) p += "metric_name=", p += c[i], i != c.length - 1 && (p += "&");
            p += l ? "&rank_ascending=yes" : "&rank_ascending=no";
            console.log(p);
            b("multi-metric-read", p, 0, d)
        }
    };
    MarketJS.Player = {};
    MarketJS.Player.Read = {
        Leaderboard: function(b, g, l) {
            b = c + "/read/player/game/leaderboard/" + b + "/" + g +
                "/" + d;
            g = {};
            try {
                $.get(b, g, l, "json")
            } catch (p) {
                console.log(p)
            }
        }
    };
    MarketJS.Login = {
        Basic: function(b, g) {
            var l = {};
            l.game_key = d;
            l.login_method = "basic";
            for (var p in b) l[p] = b[p];
            console.log("login payload:", l);
            try {
                $.post(c + "/login", l, g)
            } catch (x) {
                console.log(x)
            }
        }
    };
    MarketJS.Leaderboard = {
        Write: function(b, g, l, p) {
            var x = {};
            x.game_key = d;
            x.player_key = b;
            x.metric_name = g;
            x.metric_value = l;
            x.cumulative = p ? "true" : "false";
            try {
                $.post(c + "/write/leaderboard", x, function(b) {
                    console.log("Response: " + b)
                })
            } catch (q) {
                console.log(q)
            }
        },
        Read: function(c, d, l, p) {
            c = "metric_name=" + c + (d ? "&rank_ascending=yes" : "&rank_ascending=no");
            c += "&metric_count=";
            c += l;
            b("leaderboard-read", c, 0, p)
        }
    };
    MarketJS.Platform = {
        Read: function() {
            var b = /iPhone/i.test(navigator.userAgent),
                c = /iPad/i.test(navigator.userAgent),
                d = /android/i.test(navigator.userAgent),
                p = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
            return b ? "iPhone" : c ? "iPad" : d ? "Android" : p ? "WebView" : "Web"
        }
    }
})();

function localJsonpCallback(b) {
    b.Error ? console.log(b.Message) : console.log(b)
}
this.JSON || (this.JSON = {});
(function() {
    function b(b) {
        return 10 > b ? "0" + b : b
    }

    function c(b) {
        g.lastIndex = 0;
        return g.test(b) ? '"' + b.replace(g, function(b) {
            var c = x[b];
            return "string" === typeof c ? c : "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + b + '"'
    }

    function d(b, e) {
        var g, n, r, v, x = l,
            D, C = e[b];
        C && "object" === typeof C && "function" === typeof C.toJSON && (C = C.toJSON(b));
        "function" === typeof q && (C = q.call(e, b, C));
        switch (typeof C) {
            case "string":
                return c(C);
            case "number":
                return isFinite(C) ? String(C) : "null";
            case "boolean":
            case "null":
                return String(C);
            case "object":
                if (!C) return "null";
                l += p;
                D = [];
                if ("[object Array]" === Object.prototype.toString.apply(C)) {
                    v = C.length;
                    for (g = 0; g < v; g += 1) D[g] = d(g, C) || "null";
                    r = 0 === D.length ? "[]" : l ? "[\n" + l + D.join(",\n" + l) + "\n" + x + "]" : "[" + D.join(",") + "]";
                    l = x;
                    return r
                }
                if (q && "object" === typeof q) {
                    v = q.length;
                    for (g = 0; g < v; g += 1) n = q[g], "string" === typeof n && (r = d(n, C)) && D.push(c(n) + (l ? ": " : ":") + r)
                } else
                    for (n in C) Object.hasOwnProperty.call(C, n) && (r = d(n, C)) && D.push(c(n) + (l ? ": " : ":") + r);
                r = 0 === D.length ? "{}" : l ? "{\n" + l + D.join(",\n" + l) + "\n" +
                    x + "}" : "{" + D.join(",") + "}";
                l = x;
                return r
        }
    }
    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        g = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        l, p, x = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        q;
    "function" !== typeof JSON.stringify && (JSON.stringify = function(b, c, e) {
        var g;
        p = l = "";
        if ("number" === typeof e)
            for (g = 0; g < e; g += 1) p += " ";
        else "string" === typeof e && (p = e); if ((q = c) && "function" !== typeof c && ("object" !== typeof c || "number" !== typeof c.length)) throw Error("JSON.stringify");
        return d("", {
            "": b
        })
    });
    "function" !== typeof JSON.parse && (JSON.parse = function(b, c) {
        function d(b, e) {
            var g, n, l = b[e];
            if (l && "object" === typeof l)
                for (g in l) Object.hasOwnProperty.call(l, g) && (n = d(l, g), void 0 !== n ? l[g] = n : delete l[g]);
            return c.call(b, e, l)
        }
        var g;
        b = String(b);
        e.lastIndex = 0;
        e.test(b) && (b = b.replace(e, function(b) {
            return "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return g = eval("(" + b + ")"), "function" === typeof c ? d({
            "": g
        }, "") : g;
        throw new SyntaxError("JSON.parse");
    })
})();
(function() {
    var b = {},
        c = null,
        d = !0,
        e = !1;
    if ("undefined" !== typeof AudioContext) c = new AudioContext;
    else if ("undefined" !== typeof webkitAudioContext) c = new webkitAudioContext;
    else if ("undefined" !== typeof Audio) {
        d = !1;
        try {
            new Audio
        } catch (g) {
            e = !0
        }
    } else d = !1, e = !0; if (d) {
        var l = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
        l.gain.value = 1;
        l.connect(c.destination)
    }
    var p = function() {
        this._volume = 1;
        this._muted = !1;
        this.usingWebAudio = d;
        this.noAudio = e;
        this._howls = []
    };
    p.prototype = {
        volume: function(b) {
            b =
                parseFloat(b);
            if (0 <= b && 1 >= b) {
                this._volume = b;
                d && (l.gain.value = b);
                for (var c in this._howls)
                    if (this._howls.hasOwnProperty(c) && !1 === this._howls[c]._webAudio)
                        for (b = 0; b < this._howls[c]._audioNode.length; b++) this._howls[c]._audioNode[b].volume = this._howls[c]._volume * this._volume;
                return this
            }
            return d ? l.gain.value : this._volume
        },
        mute: function() {
            this._setMuted(!0);
            return this
        },
        unmute: function() {
            this._setMuted(!1);
            return this
        },
        _setMuted: function(b) {
            this._muted = b;
            d && (l.gain.value = b ? 0 : this._volume);
            for (var c in this._howls)
                if (this._howls.hasOwnProperty(c) &&
                    !1 === this._howls[c]._webAudio)
                    for (var e = 0; e < this._howls[c]._audioNode.length; e++) this._howls[c]._audioNode[e].muted = b
        }
    };
    var x = new p,
        p = null;
    if (!e) var p = new Audio,
        q = {
            mp3: !!p.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            opus: !!p.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!p.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!p.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            m4a: !!(p.canPlayType("audio/x-m4a;") || p.canPlayType("audio/aac;")).replace(/^no$/,
                ""),
            mp4: !!(p.canPlayType("audio/x-mp4;") || p.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!p.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
        };
    var u = function(b) {
        this._autoplay = b.autoplay || !1;
        this._buffer = b.buffer || !1;
        this._duration = b.duration || 0;
        this._format = b.format || null;
        this._loop = b.loop || !1;
        this._loaded = !1;
        this._sprite = b.sprite || {};
        this._src = b.src || "";
        this._pos3d = b.pos3d || [0, 0, -0.5];
        this._volume = void 0 !== b.volume ? b.volume : 1;
        this._urls = b.urls || [];
        this._rate = b.rate || 1;
        this._onload = [b.onload || function() {}];
        this._onloaderror = [b.onloaderror || function() {}];
        this._onend = [b.onend || function() {}];
        this._onpause = [b.onpause || function() {}];
        this._onplay = [b.onplay || function() {}];
        this._onendTimer = [];
        this._webAudio = d && !this._buffer;
        this._audioNode = [];
        this._webAudio && this._setupAudioNode();
        x._howls.push(this);
        this.load()
    };
    u.prototype = {
        load: function() {
            var d = this,
                g = null;
            if (!e) {
                for (var l = 0; l < d._urls.length; l++) {
                    var p, u;
                    if (d._format) p = d._format;
                    else if (u = d._urls[l].toLowerCase().split("?")[0], p =
                        (p = u.match(/.+\.([^?]+)(\?|$)/)) && 2 <= p.length ? p : u.match(/data\:audio\/([^?]+);/)) p = p[1];
                    else {
                        d.on("loaderror");
                        return
                    } if (q[p]) {
                        g = d._urls[l];
                        break
                    }
                }
                if (g) {
                    d._src = g;
                    if (d._webAudio) {
                        var D = g;
                        if (D in b) d._duration = b[D].duration, y(d);
                        else {
                            var C = new XMLHttpRequest;
                            C.open("GET", D, !0);
                            C.responseType = "arraybuffer";
                            C.onload = function() {
                                c.decodeAudioData(C.response, function(c) {
                                    c && (b[D] = c, y(d, c))
                                }, function() {
                                    d.on("loaderror")
                                })
                            };
                            C.onerror = function() {
                                d._webAudio && (d._buffer = !0, d._webAudio = !1, d._audioNode = [], delete d._gainNode,
                                    d.load())
                            };
                            try {
                                C.send()
                            } catch (Xa) {
                                C.onerror()
                            }
                        }
                    } else {
                        var G = new Audio;
                        d._audioNode.push(G);
                        G.src = g;
                        G._pos = 0;
                        G.preload = "auto";
                        G.volume = x._muted ? 0 : d._volume * x.volume();
                        b[g] = d;
                        var P = function() {
                            d._duration = Math.ceil(10 * G.duration) / 10;
                            0 === Object.getOwnPropertyNames(d._sprite).length && (d._sprite = {
                                _default: [0, 1E3 * d._duration]
                            });
                            d._loaded || (d._loaded = !0, d.on("load"));
                            d._autoplay && d.play();
                            G.removeEventListener("canplaythrough", P, !1)
                        };
                        G.addEventListener("canplaythrough", P, !1);
                        G.load()
                    }
                    return d
                }
            }
            d.on("loaderror")
        },
        urls: function(b) {
            return b ? (this.stop(), this._urls = "string" === typeof b ? [b] : b, this._loaded = !1, this.load(), this) : this._urls
        },
        play: function(d, e) {
            var g = this;
            "function" === typeof d && (e = d);
            if (!d || "function" === typeof d) d = "_default";
            if (!g._loaded) return g.on("load", function() {
                g.play(d, e)
            }), g;
            if (!g._sprite[d]) return "function" === typeof e && e(), g;
            g._inactiveNode(function(l) {
                l._sprite = d;
                var q = 0 < l._pos ? l._pos : g._sprite[d][0] / 1E3,
                    p = g._sprite[d][1] / 1E3 - l._pos,
                    u = !(!g._loop && !g._sprite[d][2]),
                    y = "string" === typeof e ? e :
                    Math.round(Date.now() * Math.random()) + "",
                    G, P = {
                        id: y,
                        sprite: d,
                        loop: u
                    };
                G = setTimeout(function() {
                    !g._webAudio && u && g.stop(P.id, P.timer).play(d, P.id);
                    g._webAudio && !u && (g._nodeById(P.id).paused = !0, g._nodeById(P.id)._pos = 0);
                    !g._webAudio && !u && g.stop(P.id, P.timer);
                    g.on("end", y)
                }, 1E3 * p);
                g._onendTimer.push(G);
                P.timer = g._onendTimer[g._onendTimer.length - 1];
                if (g._webAudio) {
                    G = g._sprite[d][0] / 1E3;
                    var M = g._sprite[d][1] / 1E3;
                    l.id = y;
                    l.paused = !1;
                    G = [u, G, M];
                    M = g._nodeById(y);
                    M.bufferSource = c.createBufferSource();
                    M.bufferSource.buffer =
                        b[g._src];
                    M.bufferSource.connect(M.panner);
                    M.bufferSource.loop = G[0];
                    G[0] && (M.bufferSource.loopStart = G[1], M.bufferSource.loopEnd = G[1] + G[2]);
                    M.bufferSource.playbackRate.value = g._rate;
                    g._playStart = c.currentTime;
                    l.gain.value = g._volume;
                    "undefined" === typeof l.bufferSource.start ? l.bufferSource.noteGrainOn(0, q, p) : l.bufferSource.start(0, q, p)
                } else if (4 === l.readyState) l.id = y, l.currentTime = q, l.muted = x._muted, l.volume = g._volume * x.volume(), setTimeout(function() {
                    l.play()
                }, 0);
                else {
                    g._clearEndTimer(G);
                    var za = d,
                        na =
                        e,
                        sa = function() {
                            g.play(za, na);
                            l.removeEventListener("canplaythrough", sa, !1)
                        };
                    l.addEventListener("canplaythrough", sa, !1);
                    return g
                }
                g.on("play");
                "function" === typeof e && e(y);
                return g
            });
            return g
        },
        pause: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() {
                d.pause(b)
            }), d;
            d._clearEndTimer(c || 0);
            var e = b ? d._nodeById(b) : d._activeNode();
            if (e)
                if (e._pos = d.pos(null, b), d._webAudio) {
                    if (!e.bufferSource || e.paused) return d;
                    e.paused = !0;
                    "undefined" === typeof e.bufferSource.stop ? e.bufferSource.noteOff(0) :
                        e.bufferSource.stop(0)
                } else e.pause();
            d.on("pause");
            return d
        },
        stop: function(b, c) {
            var d = this;
            if (!d._loaded) return d.on("play", function() {
                d.stop(b)
            }), d;
            d._clearEndTimer(c || 0);
            var e = b ? d._nodeById(b) : d._activeNode();
            if (e)
                if (e._pos = 0, d._webAudio) {
                    if (!e.bufferSource || e.paused) return d;
                    e.paused = !0;
                    "undefined" === typeof e.bufferSource.stop ? e.bufferSource.noteOff(0) : e.bufferSource.stop(0)
                } else e.pause(), e.currentTime = 0;
            return d
        },
        mute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() {
                    c.mute(b)
                }),
                c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = 0 : d.volume = 0);
            return c
        },
        unmute: function(b) {
            var c = this;
            if (!c._loaded) return c.on("play", function() {
                c.unmute(b)
            }), c;
            var d = b ? c._nodeById(b) : c._activeNode();
            d && (c._webAudio ? d.gain.value = c._volume : d.volume = c._volume);
            return c
        },
        volume: function(b, c) {
            var d = this;
            b = parseFloat(b);
            if (0 <= b && 1 >= b) {
                d._volume = b;
                if (!d._loaded) return d.on("play", function() {
                    d.volume(b, c)
                }), d;
                var e = c ? d._nodeById(c) : d._activeNode();
                e && (d._webAudio ? e.gain.value = b : e.volume =
                    b * x.volume());
                return d
            }
            return d._volume
        },
        loop: function(b) {
            return "boolean" === typeof b ? (this._loop = b, this) : this._loop
        },
        sprite: function(b) {
            return "object" === typeof b ? (this._sprite = b, this) : this._sprite
        },
        pos: function(b, d) {
            var e = this;
            if (!e._loaded) return e.on("load", function() {
                e.pos(b)
            }), "number" === typeof b ? e : e._pos || 0;
            b = parseFloat(b);
            var g = d ? e._nodeById(d) : e._activeNode();
            if (g) return 0 <= b ? (e.pause(d), g._pos = b, e.play(g._sprite, d), e) : e._webAudio ? g._pos + (c.currentTime - e._playStart) : g.currentTime;
            if (0 <= b) return e;
            for (g = 0; g < e._audioNode.length; g++)
                if (e._audioNode[g].paused && 4 === e._audioNode[g].readyState) return e._webAudio ? e._audioNode[g]._pos : e._audioNode[g].currentTime
        },
        pos3d: function(b, c, d, e) {
            var g = this;
            c = "undefined" === typeof c || !c ? 0 : c;
            d = "undefined" === typeof d || !d ? -0.5 : d;
            if (!g._loaded) return g.on("play", function() {
                g.pos3d(b, c, d, e)
            }), g;
            if (0 <= b || 0 > b) {
                if (g._webAudio) {
                    var l = e ? g._nodeById(e) : g._activeNode();
                    l && (g._pos3d = [b, c, d], l.panner.setPosition(b, c, d))
                }
            } else return g._pos3d;
            return g
        },
        fade: function(b, c, d,
            e, g) {
            var l = this,
                q = Math.abs(b - c),
                p = b > c ? "down" : "up",
                q = q / 0.01,
                u = d / q;
            if (!l._loaded) return l.on("load", function() {
                l.fade(b, c, d, e, g)
            }), l;
            l.volume(b, g);
            for (var y = 1; y <= q; y++)(function() {
                var b = Math.round(1E3 * (l._volume + ("up" === p ? 0.01 : -0.01) * y)) / 1E3;
                setTimeout(function() {
                    l.volume(b, g);
                    b === c && e && e()
                }, u * y)
            })()
        },
        fadeIn: function(b, c, d) {
            return this.volume(0).play().fade(0, b, c, d)
        },
        fadeOut: function(b, c, d, e) {
            var g = this;
            return g.fade(g._volume, b, c, function() {
                d && d();
                g.pause(e);
                g.on("end")
            }, e)
        },
        _nodeById: function(b) {
            for (var c =
                this._audioNode[0], d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].id === b) {
                    c = this._audioNode[d];
                    break
                }
            return c
        },
        _activeNode: function() {
            for (var b = null, c = 0; c < this._audioNode.length; c++)
                if (!this._audioNode[c].paused) {
                    b = this._audioNode[c];
                    break
                }
            this._drainPool();
            return b
        },
        _inactiveNode: function(b) {
            for (var c = null, d = 0; d < this._audioNode.length; d++)
                if (this._audioNode[d].paused && 4 === this._audioNode[d].readyState) {
                    b(this._audioNode[d]);
                    c = !0;
                    break
                }
            this._drainPool();
            if (!c) {
                var e;
                this._webAudio ? (e = this._setupAudioNode(),
                    b(e)) : (this.load(), e = this._audioNode[this._audioNode.length - 1], e.addEventListener("loadedmetadata", function() {
                    b(e)
                }))
            }
        },
        _drainPool: function() {
            var b = 0,
                c;
            for (c = 0; c < this._audioNode.length; c++) this._audioNode[c].paused && b++;
            for (c = this._audioNode.length - 1; 0 <= c && !(5 >= b); c--) this._audioNode[c].paused && (this._webAudio && this._audioNode[c].disconnect(0), b--, this._audioNode.splice(c, 1))
        },
        _clearEndTimer: function(b) {
            b = this._onendTimer.indexOf(b);
            b = 0 <= b ? b : 0;
            this._onendTimer[b] && (clearTimeout(this._onendTimer[b]),
                this._onendTimer.splice(b, 1))
        },
        _setupAudioNode: function() {
            var b = this._audioNode,
                d = this._audioNode.length;
            b[d] = "undefined" === typeof c.createGain ? c.createGainNode() : c.createGain();
            b[d].gain.value = this._volume;
            b[d].paused = !0;
            b[d]._pos = 0;
            b[d].readyState = 4;
            b[d].connect(l);
            b[d].panner = c.createPanner();
            b[d].panner.setPosition(this._pos3d[0], this._pos3d[1], this._pos3d[2]);
            b[d].panner.connect(b[d]);
            return b[d]
        },
        on: function(b, c) {
            var d = this["_on" + b];
            if ("function" === typeof c) d.push(c);
            else
                for (var e = 0; e < d.length; e++) c ?
                    d[e].call(this, c) : d[e].call(this);
            return this
        },
        off: function(b, c) {
            for (var d = this["_on" + b], e = c.toString(), g = 0; g < d.length; g++)
                if (e === d[g].toString()) {
                    d.splice(g, 1);
                    break
                }
            return this
        },
        unload: function() {
            for (var c = this._audioNode, d = 0; d < this._audioNode.length; d++) c[d].paused || this.stop(c[d].id), this._webAudio ? c[d].disconnect(0) : c[d].src = "";
            c = x._howls.indexOf(this);
            null !== c && 0 <= c && x._howls.splice(c, 1);
            delete b[this._src]
        }
    };
    if (d) var y = function(b, c) {
        b._duration = c ? c.duration : b._duration;
        0 === Object.getOwnPropertyNames(b._sprite).length &&
            (b._sprite = {
                _default: [0, 1E3 * b._duration]
            });
        b._loaded || (b._loaded = !0, b.on("load"));
        b._autoplay && b.play()
    };
    "function" === typeof define && define.amd && define(function() {
        return {
            Howler: x,
            Howl: u
        }
    });
    "undefined" !== typeof exports && (exports.Howler = x, exports.Howl = u);
    window.Howler = x;
    window.Howl = u
})();
(function(b) {
    Number.prototype.map = function(b, c, d, e) {
        return d + (e - d) * ((this - b) / (c - b))
    };
    Number.prototype.limit = function(b, c) {
        return Math.min(c, Math.max(b, this))
    };
    Number.prototype.round = function(b) {
        b = Math.pow(10, b || 0);
        return Math.round(this * b) / b
    };
    Number.prototype.floor = function() {
        return Math.floor(this)
    };
    Number.prototype.ceil = function() {
        return Math.ceil(this)
    };
    Number.prototype.toInt = function() {
        return this | 0
    };
    Number.prototype.toRad = function() {
        return this / 180 * Math.PI
    };
    Number.prototype.toDeg = function() {
        return 180 *
            this / Math.PI
    };
    Array.prototype.erase = function(b) {
        for (var c = this.length; c--;) this[c] === b && this.splice(c, 1);
        return this
    };
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)]
    };
    Function.prototype.bind = Function.prototype.bind || function(b) {
        var c = this;
        return function() {
            var d = Array.prototype.slice.call(arguments);
            return c.apply(b || null, d)
        }
    };
    b.ig = {
        game: null,
        debug: null,
        version: "1.20",
        global: b,
        modules: {},
        resources: [],
        ready: !1,
        baked: !1,
        nocache: "",
        ua: {},
        prefix: b.ImpactPrefix || "",
        lib: "lib/",
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function(b) {
            return "#" == b.charAt(0) ? document.getElementById(b.substr(1)) : document.getElementsByTagName(b)
        },
        $new: function(b) {
            return document.createElement(b)
        },
        copy: function(b) {
            if (!b || "object" != typeof b || b instanceof HTMLElement || b instanceof ig.Class) return b;
            if (b instanceof Array)
                for (var c = [], d = 0, e = b.length; d < e; d++) c[d] = ig.copy(b[d]);
            else
                for (d in c = {}, b) c[d] = ig.copy(b[d]);
            return c
        },
        merge: function(b, c) {
            for (var d in c) {
                var e = c[d];
                if ("object" !=
                    typeof e || e instanceof HTMLElement || e instanceof ig.Class) b[d] = e;
                else {
                    if (!b[d] || "object" != typeof b[d]) b[d] = e instanceof Array ? [] : {};
                    ig.merge(b[d], e)
                }
            }
            return b
        },
        ksort: function(b) {
            if (!b || "object" != typeof b) return [];
            var c = [],
                d = [],
                e;
            for (e in b) c.push(e);
            c.sort();
            for (e = 0; e < c.length; e++) d.push(b[c[e]]);
            return d
        },
        module: function(b) {
            if (ig._current) throw "Module '" + ig._current.name + "' defines nothing";
            if (ig.modules[b] && ig.modules[b].body) throw "Module '" + b + "' is already defined";
            ig._current = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig.modules[b] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig
        },
        requires: function() {
            ig._current.requires = Array.prototype.slice.call(arguments);
            return ig
        },
        defines: function(b) {
            ig._current.body = b;
            ig._current = null;
            ig._initDOMReady()
        },
        addResource: function(b) {
            ig.resources.push(b)
        },
        setNocache: function(b) {
            ig.nocache = b ? "?" + Date.now() : ""
        },
        log: function() {},
        assert: function() {},
        show: function() {},
        mark: function() {},
        _loadScript: function(b, c) {
            ig.modules[b] = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig._waitForOnload++;
            var d = ig.prefix + ig.lib + b.replace(/\./g, "/") + ".js" + ig.nocache,
                e = ig.$new("script");
            e.type = "text/javascript";
            e.src = d;
            e.onload = function() {
                ig._waitForOnload--;
                ig._execModules()
            };
            e.onerror = function() {
                throw "Failed to load module " + b + " at " + d + " required from " + c;
            };
            ig.$("head")[0].appendChild(e)
        },
        _execModules: function() {
            for (var b = !1, c = 0; c < ig._loadQueue.length; c++) {
                for (var d = ig._loadQueue[c], e = !0, g = 0; g < d.requires.length; g++) {
                    var l = d.requires[g];
                    ig.modules[l] ? ig.modules[l].loaded || (e = !1) :
                        (e = !1, ig._loadScript(l, d.name))
                }
                e && d.body && (ig._loadQueue.splice(c, 1), d.loaded = !0, d.body(), b = !0, c--)
            }
            if (b) ig._execModules();
            else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
                b = [];
                for (c = 0; c < ig._loadQueue.length; c++) {
                    e = [];
                    l = ig._loadQueue[c].requires;
                    for (g = 0; g < l.length; g++) d = ig.modules[l[g]], (!d || !d.loaded) && e.push(l[g]);
                    b.push(ig._loadQueue[c].name + " (requires: " + e.join(", ") + ")")
                }
                throw "Unresolved (circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules:\n" +
                b.join("\n");
            }
        },
        _DOMReady: function() {
            if (!ig.modules["dom.ready"].loaded) {
                if (!document.body) return setTimeout(ig._DOMReady, 13);
                ig.modules["dom.ready"].loaded = !0;
                ig._waitForOnload--;
                ig._execModules()
            }
            return 0
        },
        _boot: function() {
            document.location.href.match(/\?nocache/) && ig.setNocache(!0);
            ig.ua.pixelRatio = b.devicePixelRatio || 1;
            ig.ua.viewport = {
                width: b.innerWidth,
                height: b.innerHeight
            };
            ig.ua.screen = {
                width: b.screen.availWidth * ig.ua.pixelRatio,
                height: b.screen.availHeight * ig.ua.pixelRatio
            };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio;
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
            ig.ua.is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent);
            ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android ||
                ig.ua.iOS6
        },
        _initDOMReady: function() {
            ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(), ig.modules["dom.ready"] = {
                requires: [],
                loaded: !1,
                body: null
            }, ig._waitForOnload++, "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1), b.addEventListener("load", ig._DOMReady, !1)))
        }
    };
    for (var c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !b.requestAnimationFrame; d++) b.requestAnimationFrame = b[c[d] + "RequestAnimationFrame"];
    if (b.requestAnimationFrame) {
        var e = 1,
            g = {};
        b.ig.setAnimation = function(c, d) {
            var l = e++;
            g[l] = !0;
            var m = function() {
                g[l] && (b.requestAnimationFrame(m, d), c())
            };
            b.requestAnimationFrame(m, d);
            return l
        };
        b.ig.clearAnimation = function(b) {
            delete g[b]
        }
    } else b.ig.setAnimation = function(c) {
        return b.setInterval(c, 1E3 / 60)
    }, b.ig.clearAnimation = function(c) {
        b.clearInterval(c)
    };
    var l = !1,
        p = /xyz/.test(function() {
            xyz
        }) ? /\bparent\b/ : /.*/;
    b.ig.Class = function() {};
    var x = function(b) {
        var c = this.prototype,
            d = {},
            e;
        for (e in b) "function" == typeof b[e] && "function" == typeof c[e] &&
            p.test(b[e]) ? (d[e] = c[e], c[e] = function(b, c) {
                return function() {
                    var e = this.parent;
                    this.parent = d[b];
                    var g = c.apply(this, arguments);
                    this.parent = e;
                    return g
                }
            }(e, b[e])) : c[e] = b[e]
    };
    b.ig.Class.extend = function(c) {
        function d() {
            if (!l) {
                if (this.staticInstantiate) {
                    var b = this.staticInstantiate.apply(this, arguments);
                    if (b) return b
                }
                for (var c in this) "object" == typeof this[c] && (this[c] = ig.copy(this[c]));
                this.init && this.init.apply(this, arguments)
            }
            return this
        }
        var e = this.prototype;
        l = !0;
        var g = new this;
        l = !1;
        for (var n in c) g[n] =
            "function" == typeof c[n] && "function" == typeof e[n] && p.test(c[n]) ? function(b, c) {
                return function() {
                    var d = this.parent;
                    this.parent = e[b];
                    var g = c.apply(this, arguments);
                    this.parent = d;
                    return g
                }
            }(n, c[n]) : c[n];
        d.prototype = g;
        d.constructor = d;
        d.extend = b.ig.Class.extend;
        d.inject = x;
        return d
    }
})(window);
ig.baked = !0;
ig.module("impact.image").defines(function() {
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: !1,
        failed: !1,
        loadCallback: null,
        path: "",
        staticInstantiate: function(b) {
            return ig.Image.cache[b] || null
        },
        init: function(b) {
            this.path = b;
            this.load()
        },
        load: function(b) {
            this.loaded ? b && b(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = b || null, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.onerror = this.onerror.bind(this), this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this),
                ig.Image.cache[this.path] = this)
        },
        reload: function() {
            this.loaded = !1;
            this.data = new Image;
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + "?" + Date.now()
        },
        onload: function() {
            this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = !0;
            1 != ig.system.scale && this.resize(ig.system.scale);
            this.loadCallback && this.loadCallback(this.path, !0)
        },
        onerror: function() {
            this.failed = !0;
            this.loadCallback && this.loadCallback(this.path, !1)
        },
        resize: function(b) {
            var c = this.width * b,
                d = this.height * b,
                e = ig.$new("canvas");
            e.width = this.width;
            e.height = this.height;
            e = e.getContext("2d");
            e.drawImage(this.data, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
            var e = e.getImageData(0, 0, this.width, this.height),
                g = ig.$new("canvas");
            g.width = c;
            g.height = d;
            for (var l = g.getContext("2d"), p = l.getImageData(0, 0, c, d), x = 0; x < d; x++)
                for (var q = 0; q < c; q++) {
                    var u = 4 * (Math.floor(x / b) * this.width + Math.floor(q / b)),
                        y = 4 * (x * c + q);
                    p.data[y] = e.data[u];
                    p.data[y + 1] = e.data[u + 1];
                    p.data[y + 2] = e.data[u + 2];
                    p.data[y + 3] = e.data[u + 3]
                }
            l.putImageData(p, 0, 0);
            this.data =
                g
        },
        draw: function(b, c, d, e, g, l) {
            if (this.loaded) {
                var p = ig.system.scale;
                g = (g ? g : this.width) * p;
                l = (l ? l : this.height) * p;
                ig.system.context.drawImage(this.data, d ? d * p : 0, e ? e * p : 0, g, l, ig.system.getDrawPos(b), ig.system.getDrawPos(c), g, l);
                ig.Image.drawCount++
            }
        },
        drawTile: function(b, c, d, e, g, l, p) {
            g = g ? g : e;
            if (this.loaded && !(e > this.width || g > this.height)) {
                var x = ig.system.scale,
                    q = Math.floor(e * x),
                    u = Math.floor(g * x),
                    y = l ? -1 : 1,
                    m = p ? -1 : 1;
                if (l || p) ig.system.context.save(), ig.system.context.scale(y, m);
                ig.system.context.drawImage(this.data,
                    Math.floor(d * e) % this.width * x, Math.floor(d * e / this.width) * g * x, q, u, ig.system.getDrawPos(b) * y - (l ? q : 0), ig.system.getDrawPos(c) * m - (p ? u : 0), q, u);
                (l || p) && ig.system.context.restore();
                ig.Image.drawCount++
            }
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function() {
        for (var b in ig.Image.cache) ig.Image.cache[b].reload()
    }
});
ig.baked = !0;
ig.module("impact.font").requires("impact.image").defines(function() {
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function(b) {
            this._loadMetrics(this.data);
            this.parent(b)
        },
        widthForString: function(b) {
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var c = 0, d = 0; d < b.length; d++) c = Math.max(c, this._widthForLine(b[d]));
                return c
            }
            return this._widthForLine(b)
        },
        _widthForLine: function(b) {
            for (var c = 0, d = 0; d < b.length; d++) c += this.widthMap[b.charCodeAt(d) - this.firstChar] +
                this.letterSpacing;
            return c
        },
        heightForString: function(b) {
            return b.split("\n").length * (this.height + this.lineSpacing)
        },
        draw: function(b, c, d, e) {
            "string" != typeof b && (b = b.toString());
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var g = this.height + this.lineSpacing, l = 0; l < b.length; l++) this.draw(b[l], c, d + l * g, e)
            } else {
                if (e == ig.Font.ALIGN.RIGHT || e == ig.Font.ALIGN.CENTER) l = this._widthForLine(b), c -= e == ig.Font.ALIGN.CENTER ? l / 2 : l;
                1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha);
                for (l = 0; l < b.length; l++) e = b.charCodeAt(l),
                    c += this._drawChar(e - this.firstChar, c, d);
                1 !== this.alpha && (ig.system.context.globalAlpha = 1);
                ig.Image.drawCount += b.length
            }
        },
        _drawChar: function(b, c, d) {
            if (!this.loaded || 0 > b || b >= this.indices.length) return 0;
            var e = ig.system.scale,
                g = this.widthMap[b] * e,
                l = (this.height - 2) * e;
            ig.system.context.drawImage(this.data, this.indices[b] * e, 0, g, l, ig.system.getDrawPos(c), ig.system.getDrawPos(d), g, l);
            return this.widthMap[b] + this.letterSpacing
        },
        _loadMetrics: function(b) {
            this.height = b.height - 1;
            this.widthMap = [];
            this.indices = [];
            var c = ig.$new("canvas");
            c.width = b.width;
            c.height = b.height;
            c = c.getContext("2d");
            c.drawImage(b, 0, 0);
            for (var c = c.getImageData(0, b.height - 1, b.width, 1), d = 0, e = 0, g = 0; g < b.width; g++) {
                var l = 4 * g + 3;
                0 != c.data[l] ? e++ : 0 == c.data[l] && e && (this.widthMap.push(e), this.indices.push(g - e), d++, e = 0)
            }
            this.widthMap.push(e);
            this.indices.push(g - e)
        }
    });
    ig.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    }
});
ig.baked = !0;
ig.module("impact.sound").defines(function() {
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function() {
            for (var b = new Audio, c = 0; c < ig.Sound.use.length; c++) {
                var d = ig.Sound.use[c];
                if (b.canPlayType(d.mime)) {
                    this.format = d;
                    break
                }
            }
            this.format || (ig.Sound.enabled = !1)
        },
        load: function(b, c, d) {
            var e = ig.prefix + b.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[b]) {
                if (c && this.clips[b].length < ig.Sound.channels)
                    for (c = this.clips[b].length; c < ig.Sound.channels; c++) {
                        var g = new Audio(e);
                        g.load();
                        this.clips[b].push(g)
                    }
                return this.clips[b][0]
            }
            var l = new Audio(e);
            d && (l.addEventListener("canplaythrough", function x(c) {
                l.removeEventListener("canplaythrough", x, !1);
                d(b, !0, c)
            }, !1), l.addEventListener("error", function(c) {
                d(b, !0, c)
            }, !1));
            l.preload = "auto";
            l.load();
            this.clips[b] = [l];
            if (c)
                for (c = 1; c < ig.Sound.channels; c++) g = new Audio(e), g.load(), this.clips[b].push(g);
            return l
        },
        get: function(b) {
            b = this.clips[b];
            for (var c = 0, d; d = b[c++];)
                if (d.paused || d.ended) return d.ended && (d.currentTime = 0), d;
            b[0].pause();
            b[0].currentTime =
                0;
            return b[0]
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: !1,
        _volume: 1,
        _loop: !1,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function() {
            this._endedCallbackBound = this._endedCallback.bind(this);
            Object.defineProperty ? (Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                }), Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                })) : this.__defineGetter__ &&
                (this.__defineGetter__("volume", this.getVolume.bind(this)), this.__defineSetter__("volume", this.setVolume.bind(this)), this.__defineGetter__("loop", this.getLooping.bind(this)), this.__defineSetter__("loop", this.setLooping.bind(this)))
        },
        add: function(b, c) {
            if (ig.Sound.enabled) {
                var d = ig.soundManager.load(b instanceof ig.Sound ? b.path : b, !1);
                d.loop = this._loop;
                d.volume = this._volume;
                d.addEventListener("ended", this._endedCallbackBound, !1);
                this.tracks.push(d);
                c && (this.namedTracks[c] = d);
                this.currentTrack || (this.currentTrack =
                    d)
            }
        },
        next: function() {
            this.tracks.length && (this.stop(), this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length, this.currentTrack = this.tracks[this.currentIndex], this.play())
        },
        pause: function() {
            this.currentTrack && this.currentTrack.pause()
        },
        stop: function() {
            if (this.currentTrack) {
                this.currentTrack.pause();
                try {
                    this.currentTrack.currentTime = 0
                } catch (b) {
                    console.log(b)
                }
            }
        },
        play: function(b) {
            if (b && this.namedTracks[b]) b = this.namedTracks[b], b != this.currentTrack &&
                (this.stop(), this.currentTrack = b);
            else if (!this.currentTrack) return;
            this.currentTrack.play()
        },
        getLooping: function() {
            return this._loop
        },
        setLooping: function(b) {
            this._loop = b;
            for (var c in this.tracks) this.tracks[c].loop = b
        },
        getVolume: function() {
            return this._volume
        },
        setVolume: function(b) {
            this._volume = b.limit(0, 1);
            for (var c in this.tracks) this.tracks[c].volume = this._volume
        },
        fadeOut: function(b) {
            this.currentTrack && (clearInterval(this._fadeInterval), this.fadeTimer = new ig.Timer(b), this._fadeInterval = setInterval(this._fadeStep.bind(this),
                50))
        },
        _fadeStep: function() {
            var b = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            0.01 >= b ? (this.stop(), this.currentTrack.volume = this._volume, clearInterval(this._fadeInterval)) : this.currentTrack.volume = b
        },
        _endedCallback: function() {
            this._loop ? this.play() : this.next()
        }
    });
    ig.Sound = ig.Class.extend({
        path: "",
        volume: 1,
        currentClip: null,
        multiChannel: !0,
        init: function(b, c) {
            this.path = b;
            this.multiChannel = !1 !== c;
            this.load()
        },
        load: function(b) {
            ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path,
                this.multiChannel, b) : ig.addResource(this) : b && b(this.path, !0)
        },
        play: function() {
            ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path), this.currentClip.volume = ig.soundManager.volume * this.volume, this.currentClip.play())
        },
        stop: function() {
            this.currentClip && (this.currentClip.pause(), this.currentClip.currentTime = 0)
        }
    });
    ig.Sound.FORMAT = {
        MP3: {
            ext: "mp3",
            mime: "audio/mpeg"
        },
        M4A: {
            ext: "m4a",
            mime: "audio/mp4; codecs=mp4a"
        },
        OGG: {
            ext: "ogg",
            mime: "audio/ogg; codecs=vorbis"
        },
        WEBM: {
            ext: "webm",
            mime: "audio/webm; codecs=vorbis"
        },
        CAF: {
            ext: "caf",
            mime: "audio/x-caf"
        }
    };
    ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG];
    ig.Sound.channels = 4;
    ig.Sound.enabled = !0
});
ig.baked = !0;
ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: !1,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function(b, c) {
            this.gameClass = b;
            this.resources = c;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var d = 0; d < this.resources.length; d++) this._unloaded.push(this.resources[d].path)
        },
        load: function() {
            ig.system.clear("#000");
            if (this.resources.length) {
                for (var b =
                    0; b < this.resources.length; b++) this.loadResource(this.resources[b]);
                this._intervalId = setInterval(this.draw.bind(this), 16)
            } else this.end()
        },
        loadResource: function(b) {
            b.load(this._loadCallbackBound)
        },
        end: function() {
            this.done || (this.done = !0, clearInterval(this._intervalId))
        },
        draw: function() {},
        _loadCallback: function(b, c) {
            if (c) this._unloaded.erase(b);
            else throw "Failed to load resource: " + b;
            this.status = 1 - this._unloaded.length / this.resources.length;
            0 == this._unloaded.length && setTimeout(this.end.bind(this), 250)
        }
    })
});
ig.baked = !0;
ig.module("impact.timer").defines(function() {
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function(b) {
            this.last = this.base = ig.Timer.time;
            this.target = b || 0
        },
        set: function(b) {
            this.target = b || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        reset: function() {
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        tick: function() {
            var b = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return this.pausedAt ? 0 : b
        },
        delta: function() {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target
        },
        pause: function() {
            this.pausedAt || (this.pausedAt =
                ig.Timer.time)
        },
        unpause: function() {
            this.pausedAt && (this.base += ig.Timer.time - this.pausedAt, this.pausedAt = 0)
        }
    });
    ig.Timer._last = 0;
    ig.Timer.time = 0;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function() {
        var b = Date.now();
        ig.Timer.time += Math.min((b - ig.Timer._last) / 1E3, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = b
    }
});
ig.baked = !0;
ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
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
        running: !1,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function(b, c, d, e, g) {
            this.fps = c;
            this.clock = new ig.Timer;
            this.canvas = ig.$(b);
            this.resize(d, e, g);
            this.context = this.canvas.getContext("2d");
            this.getDrawPos = ig.System.drawMode
        },
        resize: function(b, c, d) {
            this.width = b;
            this.height =
                c;
            this.scale = d || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight
        },
        setGame: function(b) {
            this.running ? this.newGameClass = b : this.setGameNow(b)
        },
        setGameNow: function(b) {
            ig.game = new b;
            ig.system.setDelegate(ig.game)
        },
        setDelegate: function(b) {
            if ("function" == typeof b.run) this.delegate = b, this.startRunLoop();
            else throw "System.setDelegate: No run() function in object";
        },
        stopRunLoop: function() {
            ig.clearAnimation(this.animationId);
            this.running = !1
        },
        startRunLoop: function() {
            this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = !0
        },
        clear: function(b) {
            this.context.fillStyle = b;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight)
        },
        run: function() {
            ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            this.newGameClass && (this.setGameNow(this.newGameClass), this.newGameClass = null)
        },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function(b) {
            return Math.round(b) *
                this.scale
        },
        SMOOTH: function(b) {
            return Math.round(b * this.scale)
        },
        SUBPIXEL: function(b) {
            return b * this.scale
        }
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH
});
ig.baked = !0;
ig.module("impact.input").defines(function() {
    ig.KEY = {
        MOUSE1: -1,
        MOUSE2: -3,
        MWHEEL_UP: -4,
        MWHEEL_DOWN: -5,
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        PAUSE: 19,
        CAPS: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        _0: 48,
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        _6: 54,
        _7: 55,
        _8: 56,
        _9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: !1,
        isUsingKeyboard: !1,
        isUsingAccelerometer: !1,
        mouse: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0,
            z: 0
        },
        initMouse: function() {
            if (!this.isUsingMouse) {
                this.isUsingMouse = !0;
                var b = this.mousewheel.bind(this);
                ig.system.canvas.addEventListener("mousewheel", b, !1);
                ig.system.canvas.addEventListener("DOMMouseScroll", b, !1);
                ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1);
                ig.ua.mobile ? (ig.system.canvas.addEventListener("touchstart", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1)) : (ig.system.canvas.addEventListener("mousedown",
                    this.keydown.bind(this), !1), ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1))
            }
        },
        initKeyboard: function() {
            this.isUsingKeyboard || (this.isUsingKeyboard = !0, window.addEventListener("keydown", this.keydown.bind(this), !1), window.addEventListener("keyup", this.keyup.bind(this), !1))
        },
        initAccelerometer: function() {
            this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1)
        },
        mousewheel: function(b) {
            var c =
                this.bindings[0 < (b.wheelDelta ? b.wheelDelta : -1 * b.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
            c && (this.actions[c] = !0, this.presses[c] = !0, this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault())
        },
        mousemove: function(b) {
            for (var c = ig.system.canvas, d = 0, e = 0; null != c;) d += c.offsetLeft, e += c.offsetTop, c = c.offsetParent;
            var c = b.pageX,
                g = b.pageY;
            b.touches && (c = b.touches[0].clientX, g = b.touches[0].clientY);
            this.mouse.x = (c - d) / ig.system.scale;
            this.mouse.y = (g - e) / ig.system.scale
        },
        contextmenu: function(b) {
            this.bindings[ig.KEY.MOUSE2] &&
                (b.stopPropagation(), b.preventDefault())
        },
        keydown: function(b) {
            if ("text" != b.target.type) {
                var c = "keydown" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1;
                ("touchstart" == b.type || "mousedown" == b.type) && this.mousemove(b);
                if (c = this.bindings[c]) this.actions[c] = !0, this.locks[c] || (this.presses[c] = !0, this.locks[c] = !0), b.stopPropagation(), b.preventDefault()
            }
        },
        keyup: function(b) {
            if ("text" != b.target.type) {
                var c = this.bindings["keyup" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1];
                c && (this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault())
            }
        },
        devicemotion: function(b) {
            this.accel = b.accelerationIncludingGravity
        },
        bind: function(b, c) {
            0 > b ? this.initMouse() : 0 < b && this.initKeyboard();
            this.bindings[b] = c
        },
        bindTouch: function(b, c) {
            var d = ig.$(b),
                e = this;
            d.addEventListener("touchstart", function(b) {
                e.touchStart(b, c)
            }, !1);
            d.addEventListener("touchend", function(b) {
                e.touchEnd(b, c)
            }, !1)
        },
        unbind: function(b) {
            this.delayedKeyup[this.bindings[b]] = !0;
            this.bindings[b] = null
        },
        unbindAll: function() {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {}
        },
        state: function(b) {
            return this.actions[b]
        },
        pressed: function(b) {
            return this.presses[b]
        },
        released: function(b) {
            return this.delayedKeyup[b]
        },
        clearPressed: function() {
            for (var b in this.delayedKeyup) this.actions[b] = !1, this.locks[b] = !1;
            this.delayedKeyup = {};
            this.presses = {}
        },
        touchStart: function(b, c) {
            this.actions[c] = !0;
            this.presses[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        },
        touchEnd: function(b, c) {
            this.delayedKeyup[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        }
    })
});
ig.baked = !0;
ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound").defines(function() {
    ig.main = function(b, c, d, e, g, l, p) {
        ig.system = new ig.System(b, d, e, g, l || 1);
        ig.input = new ig.Input;
        ig.soundManager = new ig.SoundManager;
        ig.music = new ig.Music;
        ig.ready = !0;
        (new(p || ig.Loader)(c, ig.resources)).load()
    }
});
ig.baked = !0;
ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
    ig.AnimationSheet = ig.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function(b, c, d) {
            this.width = c;
            this.height = d;
            this.image = new ig.Image(b)
        }
    });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: !1,
            y: !1
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
        init: function(b, c, d, e) {
            this.sheet = b;
            this.pivot = {
                x: b.width / 2,
                y: b.height / 2
            };
            this.timer = new ig.Timer;
            this.frameTime = c;
            this.sequence = d;
            this.stop = !!e;
            this.tile = this.sequence[0]
        },
        rewind: function() {
            this.timer.reset();
            this.loopCount = 0;
            this.tile = this.sequence[0];
            return this
        },
        gotoFrame: function(b) {
            this.timer.set(this.frameTime * -b);
            this.update()
        },
        gotoRandomFrame: function() {
            this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
        },
        update: function() {
            var b = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(b / this.sequence.length);
            this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : b % this.sequence.length;
            this.tile = this.sequence[this.frame]
        },
        draw: function(b, c) {
            var d = Math.max(this.sheet.width, this.sheet.height);
            b > ig.system.width || c > ig.system.height || (0 > b + d || 0 > c + d) || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha), 0 == this.angle ? this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(), ig.system.context.translate(ig.system.getDrawPos(b + this.pivot.x), ig.system.getDrawPos(c + this.pivot.y)), ig.system.context.rotate(this.angle),
                this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y), ig.system.context.restore()), 1 != this.alpha && (ig.system.context.globalAlpha = 1))
        }
    })
});
ig.baked = !0;
ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
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
        posMP: {
            x: 0,
            y: 0
        },
        posML: {
            x: 0,
            y: 0
        },
        enableReposition: !1,
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
        standing: !1,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: !1,
        slopeStanding: {
            min: (44).toRad(),
            max: (136).toRad()
        },
        init: function(b, c, d) {
            this.id = ++ig.Entity._lastId;
            this.pos.x = b;
            this.pos.y = c;
            ig.merge(this, d)
        },
        addAnim: function(b, c, d, e) {
            if (!this.animSheet) throw "No animSheet to add the animation " + b + " to.";
            c = new ig.Animation(this.animSheet, c, d, e);
            this.anims[b] = c;
            this.currentAnim || (this.currentAnim = c);
            return c
        },
        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x,
                this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var b = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y * ig.system.tick, this.size.x, this.size.y);
            this.handleMovementTrace(b);
            this.currentAnim && this.currentAnim.update()
        },
        getNewVelocity: function(b, c, d, e) {
            return c ? (b + c * ig.system.tick).limit(-e, e) : d ? (c = d * ig.system.tick, 0 < b - c ? b - c : 0 > b + c ? b + c : 0) : b.limit(-e, e)
        },
        handleMovementTrace: function(b) {
            this.standing = !1;
            b.collision.y &&
                (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
            b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
            if (b.collision.slope) {
                var c = b.collision.slope;
                if (0 < this.bounciness) {
                    var d = this.vel.x * c.nx + this.vel.y * c.ny;
                    this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
                    this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
                } else d = (this.vel.x * c.x + this.vel.y *
                    c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
            }
            this.pos = b.pos
        },
        reposition: function() {
            ig.ua.mobile && this.enableReposition && (portraitMode ? (this.pos.x = this.posMP.x, this.pos.y = this.posMP.y) : (this.pos.x = this.posML.x, this.pos.y = this.posML.y))
        },
        draw: function() {
            this.currentAnim && this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
        },
        kill: function() {
            ig.game.removeEntity(this)
        },
        receiveDamage: function(b) {
            this.health -= b;
            0 >= this.health && this.kill()
        },
        touches: function(b) {
            return !(this.pos.x >= b.pos.x + b.size.x || this.pos.x + this.size.x <= b.pos.x || this.pos.y >= b.pos.y + b.size.y || this.pos.y + this.size.y <= b.pos.y)
        },
        distanceTo: function(b) {
            var c = this.pos.x + this.size.x / 2 - (b.pos.x + b.size.x / 2);
            b = this.pos.y + this.size.y / 2 - (b.pos.y + b.size.y / 2);
            return Math.sqrt(c * c + b * b)
        },
        angleTo: function(b) {
            return Math.atan2(b.pos.y + b.size.y / 2 - (this.pos.y + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x /
                2))
        },
        check: function() {},
        collideWith: function() {},
        ready: function() {}
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
    ig.Entity.checkPair = function(b, c) {
        b.checkAgainst & c.type && b.check(c);
        c.checkAgainst & b.type && c.check(b);
        b.collides && c.collides && b.collides + c.collides > ig.Entity.COLLIDES.ACTIVE && ig.Entity.solveCollision(b, c)
    };
    ig.Entity.solveCollision = function(b, c) {
        var d = null;
        if (b.collides == ig.Entity.COLLIDES.LITE || c.collides == ig.Entity.COLLIDES.FIXED) d =
            b;
        else if (c.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) d = c;
        b.last.x + b.size.x > c.last.x && b.last.x < c.last.x + c.size.x ? (b.last.y < c.last.y ? ig.Entity.seperateOnYAxis(b, c, d) : ig.Entity.seperateOnYAxis(c, b, d), b.collideWith(c, "y"), c.collideWith(b, "y")) : b.last.y + b.size.y > c.last.y && b.last.y < c.last.y + c.size.y && (b.last.x < c.last.x ? ig.Entity.seperateOnXAxis(b, c, d) : ig.Entity.seperateOnXAxis(c, b, d), b.collideWith(c, "x"), c.collideWith(b, "x"))
    };
    ig.Entity.seperateOnXAxis = function(b, c, d) {
        var e =
            b.pos.x + b.size.x - c.pos.x;
        d ? (d.vel.x = -d.vel.x * d.bounciness + (b === d ? c : b).vel.x, c = ig.game.collisionMap.trace(d.pos.x, d.pos.y, d == b ? -e : e, 0, d.size.x, d.size.y), d.pos.x = c.pos.x) : (d = (b.vel.x - c.vel.x) / 2, b.vel.x = -d, c.vel.x = d, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, -e / 2, 0, b.size.x, b.size.y), b.pos.x = Math.floor(d.pos.x), b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, e / 2, 0, c.size.x, c.size.y), c.pos.x = Math.ceil(b.pos.x))
    };
    ig.Entity.seperateOnYAxis = function(b, c, d) {
        var e = b.pos.y + b.size.y - c.pos.y;
        if (d) {
            c = b === d ? c : b;
            d.vel.y = -d.vel.y * d.bounciness + c.vel.y;
            var g = 0;
            d == b && Math.abs(d.vel.y - c.vel.y) < d.minBounceVelocity && (d.standing = !0, g = c.vel.x * ig.system.tick);
            b = ig.game.collisionMap.trace(d.pos.x, d.pos.y, g, d == b ? -e : e, d.size.x, d.size.y);
            d.pos.y = b.pos.y;
            d.pos.x = b.pos.x
        } else ig.game.gravity && (c.standing || 0 < b.vel.y) ? (d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, 0, -(b.pos.y + b.size.y - c.pos.y), b.size.x, b.size.y), b.pos.y = d.pos.y, 0 < b.bounciness && b.vel.y > b.minBounceVelocity ? b.vel.y *= -b.bounciness : (b.standing = !0, b.vel.y = 0)) : (d =
            (b.vel.y - c.vel.y) / 2, b.vel.y = -d, c.vel.y = d, g = c.vel.x * ig.system.tick, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, g, -e / 2, b.size.x, b.size.y), b.pos.y = d.pos.y, b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, 0, e / 2, c.size.x, c.size.y), c.pos.y = b.pos.y)
    }
});
ig.baked = !0;
ig.module("impact.map").defines(function() {
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function(b, c) {
            this.tilesize = b;
            this.data = c;
            this.height = c.length;
            this.width = c[0].length
        },
        getTile: function(b, c) {
            var d = Math.floor(b / this.tilesize),
                e = Math.floor(c / this.tilesize);
            return 0 <= d && d < this.width && 0 <= e && e < this.height ? this.data[e][d] : 0
        },
        setTile: function(b, c, d) {
            b = Math.floor(b / this.tilesize);
            c = Math.floor(c / this.tilesize);
            0 <= b && b < this.width && 0 <= c && c < this.height && (this.data[c][b] =
                d)
        }
    })
});
ig.baked = !0;
ig.module("impact.collision-map").requires("impact.map").defines(function() {
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function(b, c, g) {
            this.parent(b, c);
            this.tiledef = g || ig.CollisionMap.defaultTileDef;
            for (var l in this.tiledef) l | 0 > this.lastSlope && (this.lastSlope = l | 0)
        },
        trace: function(b, c, g, l, p, x) {
            var q = {
                    collision: {
                        x: !1,
                        y: !1,
                        slope: !1
                    },
                    pos: {
                        x: b,
                        y: c
                    },
                    tile: {
                        x: 0,
                        y: 0
                    }
                },
                u = Math.ceil(Math.max(Math.abs(g), Math.abs(l)) / this.tilesize);
            if (1 < u)
                for (var y = g / u, m = l / u, n = 0; n < u && (y || m) && !(this._traceStep(q,
                    b, c, y, m, p, x, g, l, n), b = q.pos.x, c = q.pos.y, q.collision.x && (g = y = 0), q.collision.y && (l = m = 0), q.collision.slope); n++);
            else this._traceStep(q, b, c, g, l, p, x, g, l, 0);
            return q
        },
        _traceStep: function(b, c, g, l, p, x, q, u, y, m) {
            b.pos.x += l;
            b.pos.y += p;
            var n = 0;
            if (l) {
                var r = 0 < l ? x : 0,
                    v = 0 > l ? this.tilesize : 0,
                    n = Math.max(Math.floor(g / this.tilesize), 0),
                    N = Math.min(Math.ceil((g + q) / this.tilesize), this.height);
                l = Math.floor((b.pos.x + r) / this.tilesize);
                var D = Math.floor((c + r) / this.tilesize);
                if (0 < m || l == D || 0 > D || D >= this.width) D = -1;
                if (0 <= l && l < this.width)
                    for (var C =
                        n; C < N && !(-1 != D && (n = this.data[C][D], 1 < n && n <= this.lastSlope && this._checkTileDef(b, n, c, g, u, y, x, q, D, C))); C++)
                        if (n = this.data[C][l], 1 == n || n > this.lastSlope || 1 < n && this._checkTileDef(b, n, c, g, u, y, x, q, l, C)) {
                            if (1 < n && n <= this.lastSlope && b.collision.slope) break;
                            b.collision.x = !0;
                            b.tile.x = n;
                            c = b.pos.x = l * this.tilesize - r + v;
                            u = 0;
                            break
                        }
            }
            if (p) {
                r = 0 < p ? q : 0;
                p = 0 > p ? this.tilesize : 0;
                n = Math.max(Math.floor(b.pos.x / this.tilesize), 0);
                v = Math.min(Math.ceil((b.pos.x + x) / this.tilesize), this.width);
                C = Math.floor((b.pos.y + r) / this.tilesize);
                N = Math.floor((g + r) / this.tilesize);
                if (0 < m || C == N || 0 > N || N >= this.height) N = -1;
                if (0 <= C && C < this.height)
                    for (l = n; l < v && !(-1 != N && (n = this.data[N][l], 1 < n && n <= this.lastSlope && this._checkTileDef(b, n, c, g, u, y, x, q, l, N))); l++)
                        if (n = this.data[C][l], 1 == n || n > this.lastSlope || 1 < n && this._checkTileDef(b, n, c, g, u, y, x, q, l, C)) {
                            if (1 < n && n <= this.lastSlope && b.collision.slope) break;
                            b.collision.y = !0;
                            b.tile.y = n;
                            b.pos.y = C * this.tilesize - r + p;
                            break
                        }
            }
        },
        _checkTileDef: function(b, c, g, l, p, x, q, u, y, m) {
            var n = this.tiledef[c];
            if (!n) return !1;
            c = (n[2] -
                n[0]) * this.tilesize;
            var r = (n[3] - n[1]) * this.tilesize,
                v = n[4];
            q = g + p + (0 > r ? q : 0) - (y + n[0]) * this.tilesize;
            u = l + x + (0 < c ? u : 0) - (m + n[1]) * this.tilesize;
            if (0 < c * u - r * q) {
                if (0 > p * -r + x * c) return v;
                y = Math.sqrt(c * c + r * r);
                m = r / y;
                y = -c / y;
                var N = q * m + u * y,
                    n = m * N,
                    N = y * N;
                if (n * n + N * N >= p * p + x * x) return v || 0.5 > c * (u - x) - r * (q - p);
                b.pos.x = g + p - n;
                b.pos.y = l + x - N;
                b.collision.slope = {
                    x: c,
                    y: r,
                    nx: m,
                    ny: y
                };
                return !0
            }
            return !1
        }
    });
    var b = 1 / 3,
        c = 2 / 3;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, c, !0],
        6: [0, c, 1, b, !0],
        7: [0, b, 1, 0, !0],
        3: [0, 1, 1, 0.5, !0],
        4: [0, 0.5, 1, 0, !0],
        2: [0,
            1, 1, 0, !0
        ],
        10: [0.5, 1, 1, 0, !0],
        21: [0, 1, 0.5, 0, !0],
        32: [c, 1, 1, 0, !0],
        43: [b, 1, c, 0, !0],
        54: [0, 1, b, 0, !0],
        27: [0, 0, 1, b, !0],
        28: [0, b, 1, c, !0],
        29: [0, c, 1, 1, !0],
        25: [0, 0, 1, 0.5, !0],
        26: [0, 0.5, 1, 1, !0],
        24: [0, 0, 1, 1, !0],
        11: [0, 0, 0.5, 1, !0],
        22: [0.5, 0, 1, 1, !0],
        33: [0, 0, b, 1, !0],
        44: [b, 0, c, 1, !0],
        55: [c, 0, 1, 1, !0],
        16: [1, b, 0, 0, !0],
        17: [1, c, 0, b, !0],
        18: [1, 1, 0, c, !0],
        14: [1, 0.5, 0, 0, !0],
        15: [1, 1, 0, 0.5, !0],
        13: [1, 1, 0, 0, !0],
        8: [0.5, 1, 0, 0, !0],
        19: [1, 1, 0.5, 0, !0],
        30: [b, 1, 0, 0, !0],
        41: [c, 1, b, 0, !0],
        52: [1, 1, c, 0, !0],
        38: [1, c, 0, 1, !0],
        39: [1, b, 0, c, !0],
        40: [1, 0,
            0, b, !0
        ],
        36: [1, 0.5, 0, 1, !0],
        37: [1, 0, 0, 0.5, !0],
        35: [1, 0, 0, 1, !0],
        9: [1, 0, 0.5, 1, !0],
        20: [0.5, 0, 0, 1, !0],
        31: [1, 0, c, 1, !0],
        42: [c, 0, b, 1, !0],
        53: [b, 0, 0, 1, !0],
        12: [0, 0, 1, 0, !1],
        23: [1, 1, 0, 1, !1],
        34: [1, 0, 1, 1, !1],
        45: [0, 1, 0, 0, !1]
    };
    ig.CollisionMap.staticNoCollision = {
        trace: function(b, c, g, l) {
            return {
                collision: {
                    x: !1,
                    y: !1,
                    slope: !1
                },
                pos: {
                    x: b + g,
                    y: c + l
                },
                tile: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
});
ig.baked = !0;
ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: !1,
        tilesetName: "",
        foreground: !1,
        enabled: !0,
        preRender: !1,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: !1,
        anims: {},
        init: function(b, c, d) {
            this.parent(b, c);
            this.setTileset(d)
        },
        setTileset: function(b) {
            this.tilesetName = b instanceof ig.Image ? b.path : b;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null
        },
        setScreenPos: function(b,
            c) {
            this.scroll.x = b / this.distance;
            this.scroll.y = c / this.distance
        },
        preRenderMapToChunks: function() {
            var b = this.width * this.tilesize * ig.system.scale,
                c = this.height * this.tilesize * ig.system.scale,
                d = Math.ceil(b / this.chunkSize),
                e = Math.ceil(c / this.chunkSize);
            this.preRenderedChunks = [];
            for (var g = 0; g < e; g++) {
                this.preRenderedChunks[g] = [];
                for (var l = 0; l < d; l++) this.preRenderedChunks[g][l] = this.preRenderChunk(l, g, l == d - 1 ? b - l * this.chunkSize : this.chunkSize, g == e - 1 ? c - g * this.chunkSize : this.chunkSize)
            }
        },
        preRenderChunk: function(b,
            c, d, e) {
            var g = d / this.tilesize / ig.system.scale + 1,
                l = e / this.tilesize / ig.system.scale + 1,
                p = b * this.chunkSize / ig.system.scale % this.tilesize,
                x = c * this.chunkSize / ig.system.scale % this.tilesize;
            b = Math.floor(b * this.chunkSize / this.tilesize / ig.system.scale);
            c = Math.floor(c * this.chunkSize / this.tilesize / ig.system.scale);
            var q = ig.$new("canvas");
            q.width = d;
            q.height = e;
            d = ig.system.context;
            ig.system.context = q.getContext("2d");
            for (e = 0; e < g; e++)
                for (var u = 0; u < l; u++)
                    if (e + b < this.width && u + c < this.height) {
                        var y = this.data[u + c][e + b];
                        y && this.tiles.drawTile(e * this.tilesize - p, u * this.tilesize - x, y - 1, this.tilesize)
                    }
            ig.system.context = d;
            return q
        },
        draw: function() {
            this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled())
        },
        drawPreRendered: function() {
            this.preRenderedChunks || this.preRenderMapToChunks();
            var b = ig.system.getDrawPos(this.scroll.x),
                c = ig.system.getDrawPos(this.scroll.y);
            this.repeat && (b %= this.width * this.tilesize * ig.system.scale, c %= this.height * this.tilesize * ig.system.scale);
            var d = Math.max(Math.floor(b /
                    this.chunkSize), 0),
                e = Math.max(Math.floor(c / this.chunkSize), 0),
                g = Math.ceil((b + ig.system.realWidth) / this.chunkSize),
                l = Math.ceil((c + ig.system.realHeight) / this.chunkSize),
                p = this.preRenderedChunks[0].length,
                x = this.preRenderedChunks.length;
            this.repeat || (g = Math.min(g, p), l = Math.min(l, x));
            for (var q = 0; e < l; e++) {
                for (var u = 0, y = d; y < g; y++) {
                    var m = this.preRenderedChunks[e % x][y % p],
                        n = -b + y * this.chunkSize - u,
                        r = -c + e * this.chunkSize - q;
                    ig.system.context.drawImage(m, n, r);
                    ig.Image.drawCount++;
                    this.debugChunks && (ig.system.context.strokeStyle =
                        "#f0f", ig.system.context.strokeRect(n, r, this.chunkSize, this.chunkSize));
                    this.repeat && m.width < this.chunkSize && n + m.width < ig.system.realWidth && (u = this.chunkSize - m.width, g++)
                }
                this.repeat && m.height < this.chunkSize && r + m.height < ig.system.realHeight && (q = this.chunkSize - m.height, l++)
            }
        },
        drawTiled: function() {
            for (var b = 0, c = null, d = (this.scroll.x / this.tilesize).toInt(), e = (this.scroll.y / this.tilesize).toInt(), g = this.scroll.x % this.tilesize, l = this.scroll.y % this.tilesize, p = -g - this.tilesize, g = ig.system.width + this.tilesize -
                g, x = ig.system.height + this.tilesize - l, q = -1, l = -l - this.tilesize; l < x; q++, l += this.tilesize) {
                var u = q + e;
                if (u >= this.height || 0 > u) {
                    if (!this.repeat) continue;
                    u = 0 < u ? u % this.height : (u + 1) % this.height + this.height - 1
                }
                for (var y = -1, m = p; m < g; y++, m += this.tilesize) {
                    b = y + d;
                    if (b >= this.width || 0 > b) {
                        if (!this.repeat) continue;
                        b = 0 < b ? b % this.width : (b + 1) % this.width + this.width - 1
                    }
                    if (b = this.data[u][b])(c = this.anims[b - 1]) ? c.draw(m, l) : this.tiles.drawTile(m, l, b - 1, this.tilesize)
                }
            }
        }
    })
});
ig.baked = !0;
ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
    ig.Game = ig.Class.extend({
        clearColor: "#000000",
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
        autoSort: !1,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: !1,
        staticInstantiate: function() {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null
        },
        loadLevelWithoutEntities: function(b) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (var c = 0; c < b.layer.length; c++) {
                var d = b.layer[c];
                if ("collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
                else {
                    var e = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
                    e.anims = this.backgroundAnims[d.tilesetName] || {};
                    e.repeat = d.repeat;
                    e.distance = d.distance;
                    e.foreground = !!d.foreground;
                    e.preRender = !!d.preRender;
                    e.name =
                        d.name;
                    this.backgroundMaps.push(e)
                }
            }
        },
        loadLevel: function(b) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var c = 0; c < b.entities.length; c++) {
                var d = b.entities[c];
                this.spawnEntity(d.type, d.x, d.y, d.settings)
            }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (c = 0; c < b.layer.length; c++)
                if (d = b.layer[c], "collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
                else {
                    var e = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
                    e.anims = this.backgroundAnims[d.tilesetName] || {};
                    e.repeat = d.repeat;
                    e.distance = d.distance;
                    e.foreground = !!d.foreground;
                    e.preRender = !!d.preRender;
                    e.name = d.name;
                    this.backgroundMaps.push(e)
                }
            for (c = 0; c < this.entities.length; c++) this.entities[c].ready()
        },
        loadLevelDeferred: function(b) {
            this._levelToLoad = b
        },
        getMapByName: function(b) {
            if ("collision" == b) return this.collisionMap;
            for (var c = 0; c < this.backgroundMaps.length; c++)
                if (this.backgroundMaps[c].name == b) return this.backgroundMaps[c];
            return null
        },
        getEntityByName: function(b) {
            return this.namedEntities[b]
        },
        getEntitiesByType: function(b) {
            b = "string" === typeof b ? ig.global[b] : b;
            for (var c = [], d = 0; d < this.entities.length; d++) {
                var e = this.entities[d];
                e instanceof b && !e._killed && c.push(e)
            }
            return c
        },
        spawnEntity: function(b, c, d, e) {
            var g = "string" === typeof b ? ig.global[b] : b;
            if (!g) throw "Can't spawn entity of type " + b;
            b = new g(c, d, e || {});
            this.entities.push(b);
            b.name && (this.namedEntities[b.name] = b);
            return b
        },
        sortEntities: function() {
            this.entities.sort(this.sortBy)
        },
        sortEntitiesDeferred: function() {
            this._doSortEntities = !0
        },
        removeEntity: function(b) {
            b.name && delete this.namedEntities[b.name];
            b._killed = !0;
            b.type = ig.Entity.TYPE.NONE;
            b.checkAgainst = ig.Entity.TYPE.NONE;
            b.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(b)
        },
        run: function() {
            this.update();
            this.draw()
        },
        update: function() {
            this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null);
            if (this._doSortEntities || this.autoSort) this.sortEntities(), this._doSortEntities = !1;
            this.updateEntities();
            this.checkEntities();
            for (var b = 0; b < this._deferredKill.length; b++) this.entities.erase(this._deferredKill[b]);
            this._deferredKill = [];
            for (var c in this.backgroundAnims) {
                var b = this.backgroundAnims[c],
                    d;
                for (d in b) b[d].update()
            }
        },
        updateEntities: function() {
            for (var b = 0; b < this.entities.length; b++) {
                var c = this.entities[b];
                c._killed || c.update()
            }
        },
        draw: function() {
            this.clearColor && ig.system.clear(this.clearColor);
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            var b;
            for (b = 0; b < this.backgroundMaps.length; b++) {
                var c = this.backgroundMaps[b];
                if (c.foreground) break;
                c.setScreenPos(this.screen.x, this.screen.y);
                c.draw()
            }
            this.drawEntities();
            for (b; b < this.backgroundMaps.length; b++) c = this.backgroundMaps[b], c.setScreenPos(this.screen.x, this.screen.y), c.draw()
        },
        drawEntities: function() {
            for (var b = 0; b < this.entities.length; b++) this.entities[b].draw()
        },
        checkEntities: function() {
            for (var b = {}, c = 0; c < this.entities.length; c++) {
                var d = this.entities[c];
                if (!(d.type == ig.Entity.TYPE.NONE && d.checkAgainst == ig.Entity.TYPE.NONE && d.collides == ig.Entity.COLLIDES.NEVER))
                    for (var e = {}, g = Math.floor(d.pos.y / this.cellSize), l = Math.floor((d.pos.x + d.size.x) / this.cellSize) + 1, p = Math.floor((d.pos.y + d.size.y) / this.cellSize) + 1, x = Math.floor(d.pos.x / this.cellSize); x < l; x++)
                        for (var q = g; q < p; q++)
                            if (b[x])
                                if (b[x][q]) {
                                    for (var u = b[x][q], y = 0; y < u.length; y++) d.touches(u[y]) && !e[u[y].id] && (e[u[y].id] = !0, ig.Entity.checkPair(d, u[y]));
                                    u.push(d)
                                } else b[x][q] = [d];
                else b[x] = {}, b[x][q] = [d]
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function(b, c) {
            return b.zIndex - c.zIndex
        },
        POS_X: function(b, c) {
            return b.pos.x + b.size.x - (c.pos.x +
                c.size.x)
        },
        POS_Y: function(b, c) {
            return b.pos.y + b.size.y - (c.pos.y + c.size.y)
        }
    }
});
ig.baked = !0;
ig.module("impact.debug.menu").requires("dom.ready", "impact.system").defines(function() {
    ig.System.inject({
        run: function() {
            ig.debug.beforeRun();
            this.parent();
            ig.debug.afterRun()
        },
        setGameNow: function(b) {
            this.parent(b);
            ig.debug.ready()
        }
    });
    ig.Debug = ig.Class.extend({
        options: {},
        panels: {},
        numbers: {},
        container: null,
        panelMenu: null,
        activePanel: null,
        debugTime: 0,
        debugTickAvg: 0.016,
        debugRealTime: Date.now(),
        init: function() {
            this.container = ig.$new("div");
            this.container.className = "ig_debug";
            ig.$("body")[0].appendChild(this.container);
            this.panelMenu = ig.$new("div");
            this.panelMenu.innerHTML = '<div class="ig_debug_head">Impact.Debug:</div>';
            this.panelMenu.className = "ig_debug_panel_menu";
            this.container.appendChild(this.panelMenu);
            this.numberContainer = ig.$new("div");
            this.numberContainer.className = "ig_debug_stats";
            this.panelMenu.appendChild(this.numberContainer);
            window.console && window.console.log && window.console.assert && (ig.log = console.log.bind ? console.log.bind(console) : console.log, ig.assert = console.assert.bind ? console.assert.bind(console) :
                console.assert);
            ig.show = this.showNumber.bind(this)
        },
        addNumber: function(b) {
            var c = ig.$new("span");
            this.numberContainer.appendChild(c);
            this.numberContainer.appendChild(document.createTextNode(b));
            this.numbers[b] = c
        },
        showNumber: function(b, c, d) {
            this.numbers[b] || this.addNumber(b, d);
            this.numbers[b].textContent = c
        },
        addPanel: function(b) {
            var c = new b.type(b.name, b.label);
            if (b.options)
                for (var d = 0; d < b.options.length; d++) {
                    var e = b.options[d];
                    c.addOption(new ig.DebugOption(e.name, e.object, e.property))
                }
            this.panels[c.name] =
                c;
            c.container.style.display = "none";
            this.container.appendChild(c.container);
            b = ig.$new("div");
            b.className = "ig_debug_menu_item";
            b.textContent = c.label;
            b.addEventListener("click", function() {
                this.togglePanel(c)
            }.bind(this), !1);
            c.menuItem = b;
            e = !1;
            for (d = 1; d < this.panelMenu.childNodes.length; d++) {
                var g = this.panelMenu.childNodes[d];
                if (g.textContent > c.label) {
                    this.panelMenu.insertBefore(b, g);
                    e = !0;
                    break
                }
            }
            e || this.panelMenu.appendChild(b)
        },
        showPanel: function(b) {
            this.togglePanel(this.panels[b])
        },
        togglePanel: function(b) {
            b !=
                this.activePanel && this.activePanel && (this.activePanel.toggle(!1), this.activePanel.menuItem.className = "ig_debug_menu_item", this.activePanel = null);
            var c = "block" != b.container.style.display;
            b.toggle(c);
            b.menuItem.className = "ig_debug_menu_item" + (c ? " active" : "");
            c && (this.activePanel = b)
        },
        ready: function() {
            for (var b in this.panels) this.panels[b].ready()
        },
        beforeRun: function() {
            var b = Date.now();
            this.debugTickAvg = 0.8 * this.debugTickAvg + 0.2 * (b - this.debugRealTime);
            this.debugRealTime = b;
            this.activePanel && this.activePanel.beforeRun()
        },
        afterRun: function() {
            var b = Date.now() - this.debugRealTime;
            this.debugTime = 0.8 * this.debugTime + 0.2 * b;
            this.activePanel && this.activePanel.afterRun();
            this.showNumber("ms", this.debugTime.toFixed(2));
            this.showNumber("fps", Math.round(1E3 / this.debugTickAvg));
            this.showNumber("draws", ig.Image.drawCount);
            ig.game && ig.game.entities && this.showNumber("entities", ig.game.entities.length);
            ig.Image.drawCount = 0
        }
    });
    ig.DebugPanel = ig.Class.extend({
        active: !1,
        container: null,
        options: [],
        panels: [],
        label: "",
        name: "",
        init: function(b,
            c) {
            this.name = b;
            this.label = c;
            this.container = ig.$new("div");
            this.container.className = "ig_debug_panel " + this.name
        },
        toggle: function(b) {
            this.active = b;
            this.container.style.display = b ? "block" : "none"
        },
        addPanel: function(b) {
            this.panels.push(b);
            this.container.appendChild(b.container)
        },
        addOption: function(b) {
            this.options.push(b);
            this.container.appendChild(b.container)
        },
        ready: function() {},
        beforeRun: function() {},
        afterRun: function() {}
    });
    ig.DebugOption = ig.Class.extend({
        name: "",
        labelName: "",
        className: "ig_debug_option",
        label: null,
        mark: null,
        container: null,
        active: !1,
        colors: {
            enabled: "#fff",
            disabled: "#444"
        },
        init: function(b, c, d) {
            this.name = b;
            this.object = c;
            this.property = d;
            this.active = this.object[this.property];
            this.container = ig.$new("div");
            this.container.className = "ig_debug_option";
            this.label = ig.$new("span");
            this.label.className = "ig_debug_label";
            this.label.textContent = this.name;
            this.mark = ig.$new("span");
            this.mark.className = "ig_debug_label_mark";
            this.container.appendChild(this.mark);
            this.container.appendChild(this.label);
            this.container.addEventListener("click", this.click.bind(this), !1);
            this.setLabel()
        },
        setLabel: function() {
            this.mark.style.backgroundColor = this.active ? this.colors.enabled : this.colors.disabled
        },
        click: function(b) {
            this.active = !this.active;
            this.object[this.property] = this.active;
            this.setLabel();
            b.stopPropagation();
            b.preventDefault();
            return !1
        }
    });
    ig.debug = new ig.Debug
});
ig.baked = !0;
ig.module("impact.debug.entities-panel").requires("impact.debug.menu", "impact.entity").defines(function() {
    ig.Entity.inject({
        colors: {
            names: "#fff",
            velocities: "#0f0",
            boxes: "#f00"
        },
        draw: function() {
            this.parent();
            ig.Entity._debugShowBoxes && (ig.system.context.strokeStyle = this.colors.boxes, ig.system.context.lineWidth = 1, ig.system.context.strokeRect(ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x) - 0.5, ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y) - 0.5, this.size.x * ig.system.scale, this.size.y *
                ig.system.scale));
            if (ig.Entity._debugShowVelocities) {
                var b = this.pos.x + this.size.x / 2,
                    c = this.pos.y + this.size.y / 2;
                this._debugDrawLine(this.colors.velocities, b, c, b + this.vel.x, c + this.vel.y)
            }
            if (ig.Entity._debugShowNames && (this.name && (ig.system.context.fillStyle = this.colors.names, ig.system.context.fillText(this.name, ig.system.getDrawPos(this.pos.x - ig.game.screen.x), ig.system.getDrawPos(this.pos.y - ig.game.screen.y))), "object" == typeof this.target))
                for (var d in this.target)(b = ig.game.getEntityByName(this.target[d])) &&
                    this._debugDrawLine(this.colors.names, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, b.pos.x + b.size.x / 2, b.pos.y + b.size.y / 2)
        },
        _debugDrawLine: function(b, c, d, e, g) {
            ig.system.context.strokeStyle = b;
            ig.system.context.lineWidth = 1;
            ig.system.context.beginPath();
            ig.system.context.moveTo(ig.system.getDrawPos(c - ig.game.screen.x), ig.system.getDrawPos(d - ig.game.screen.y));
            ig.system.context.lineTo(ig.system.getDrawPos(e - ig.game.screen.x), ig.system.getDrawPos(g - ig.game.screen.y));
            ig.system.context.stroke();
            ig.system.context.closePath()
        }
    });
    ig.Entity._debugEnableChecks = !0;
    ig.Entity._debugShowBoxes = !1;
    ig.Entity._debugShowVelocities = !1;
    ig.Entity._debugShowNames = !1;
    ig.Entity.oldCheckPair = ig.Entity.checkPair;
    ig.Entity.checkPair = function(b, c) {
        ig.Entity._debugEnableChecks && ig.Entity.oldCheckPair(b, c)
    };
    ig.debug.addPanel({
        type: ig.DebugPanel,
        name: "entities",
        label: "Entities",
        options: [{
            name: "Checks & Collisions",
            object: ig.Entity,
            property: "_debugEnableChecks"
        }, {
            name: "Show Collision Boxes",
            object: ig.Entity,
            property: "_debugShowBoxes"
        }, {
            name: "Show Velocities",
            object: ig.Entity,
            property: "_debugShowVelocities"
        }, {
            name: "Show Names & Targets",
            object: ig.Entity,
            property: "_debugShowNames"
        }]
    })
});
ig.baked = !0;
ig.module("impact.debug.maps-panel").requires("impact.debug.menu", "impact.game", "impact.background-map").defines(function() {
    ig.Game.inject({
        loadLevel: function(b) {
            this.parent(b);
            ig.debug.panels.maps.load(this)
        }
    });
    ig.DebugMapsPanel = ig.DebugPanel.extend({
        maps: [],
        mapScreens: [],
        init: function(b, c) {
            this.parent(b, c);
            this.load()
        },
        load: function(b) {
            this.options = [];
            this.panels = [];
            if (!b || !b.backgroundMaps.length) this.container.innerHTML = "<em>No Maps Loaded</em>";
            else {
                this.maps = b.backgroundMaps;
                this.mapScreens = [];
                this.container.innerHTML = "";
                for (b = 0; b < this.maps.length; b++) {
                    var c = this.maps[b],
                        d = new ig.DebugPanel(b, "Layer " + b),
                        e = new ig.$new("strong");
                    e.textContent = b + ": " + c.tiles.path;
                    d.container.appendChild(e);
                    d.addOption(new ig.DebugOption("Enabled", c, "enabled"));
                    d.addOption(new ig.DebugOption("Pre Rendered", c, "preRender"));
                    d.addOption(new ig.DebugOption("Show Chunks", c, "debugChunks"));
                    this.generateMiniMap(d, c, b);
                    this.addPanel(d)
                }
            }
        },
        generateMiniMap: function(b, c, d) {
            var e = ig.system.scale,
                g = ig.$new("canvas"),
                l = g.getContext("2d"),
                p = c.tiles.width * e,
                x = c.tiles.height * e,
                q = p / c.tilesize;
            l.drawImage(c.tiles.data, 0, 0, p, x, 0, 0, q, x / c.tilesize);
            l = ig.$new("canvas");
            l.width = c.width * e;
            l.height = c.height * e;
            var u = l.getContext("2d");
            ig.game.clearColor && (u.fillStyle = ig.game.clearColor, u.fillRect(0, 0, p, x));
            for (x = p = 0; x < c.width; x++)
                for (var y = 0; y < c.height; y++)(p = c.data[y][x]) && u.drawImage(g, Math.floor((p - 1) * e % q), Math.floor((p - 1) * e / q) * e, e, e, x * e, y * e, e, e);
            g = ig.$new("div");
            g.className = "ig_debug_map_container";
            g.style.width = c.width *
                e + "px";
            g.style.height = c.height * e + "px";
            q = ig.$new("div");
            q.className = "ig_debug_map_screen";
            q.style.width = ig.system.width / c.tilesize * e - 2 + "px";
            q.style.height = ig.system.height / c.tilesize * e - 2 + "px";
            this.mapScreens[d] = q;
            g.appendChild(l);
            g.appendChild(q);
            b.container.appendChild(g)
        },
        afterRun: function() {
            for (var b = ig.system.scale, c = 0; c < this.maps.length; c++) {
                var d = this.maps[c],
                    e = this.mapScreens[c];
                if (d && e) {
                    var g = d.scroll.x / d.tilesize,
                        l = d.scroll.y / d.tilesize;
                    d.repeat && (g %= d.width, l %= d.height);
                    e.style.left = g * b +
                        "px";
                    e.style.top = l * b + "px"
                }
            }
        }
    });
    ig.debug.addPanel({
        type: ig.DebugMapsPanel,
        name: "maps",
        label: "Background Maps"
    })
});
ig.baked = !0;
ig.module("impact.debug.graph-panel").requires("impact.debug.menu", "impact.system", "impact.game", "impact.image").defines(function() {
    ig.Game.inject({
        draw: function() {
            ig.graph.beginClock("draw");
            this.parent();
            ig.graph.endClock("draw")
        },
        update: function() {
            ig.graph.beginClock("update");
            this.parent();
            ig.graph.endClock("update")
        },
        checkEntities: function() {
            ig.graph.beginClock("checks");
            this.parent();
            ig.graph.endClock("checks")
        }
    });
    ig.DebugGraphPanel = ig.DebugPanel.extend({
        clocks: {},
        marks: [],
        textY: 0,
        height: 128,
        ms: 64,
        timeBeforeRun: 0,
        init: function(b, c) {
            this.parent(b, c);
            this.mark16ms = (this.height - 16 * (this.height / this.ms)).round();
            this.mark33ms = (this.height - 33 * (this.height / this.ms)).round();
            this.msHeight = this.height / this.ms;
            this.graph = ig.$new("canvas");
            this.graph.width = window.innerWidth;
            this.graph.height = this.height;
            this.container.appendChild(this.graph);
            this.ctx = this.graph.getContext("2d");
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(0, this.mark16ms, this.graph.width, 1);
            this.ctx.fillRect(0, this.mark33ms, this.graph.width,
                1);
            this.addGraphMark("16ms", this.mark16ms);
            this.addGraphMark("33ms", this.mark33ms);
            this.addClock("draw", "Draw", "#13baff");
            this.addClock("update", "Entity Update", "#bb0fff");
            this.addClock("checks", "Entity Checks & Collisions", "#a2e908");
            this.addClock("lag", "System Lag", "#f26900");
            ig.mark = this.mark.bind(this);
            ig.graph = this
        },
        addGraphMark: function(b, c) {
            var d = ig.$new("span");
            d.className = "ig_debug_graph_mark";
            d.textContent = b;
            d.style.top = c.round() + "px";
            this.container.appendChild(d)
        },
        addClock: function(b, c,
            d) {
            var e = ig.$new("span");
            e.className = "ig_debug_legend_color";
            e.style.backgroundColor = d;
            var g = ig.$new("span");
            g.className = "ig_debug_legend_number";
            g.appendChild(document.createTextNode("0"));
            var l = ig.$new("span");
            l.className = "ig_debug_legend";
            l.appendChild(e);
            l.appendChild(document.createTextNode(c + " ("));
            l.appendChild(g);
            l.appendChild(document.createTextNode("ms)"));
            this.container.appendChild(l);
            this.clocks[b] = {
                description: c,
                color: d,
                current: 0,
                start: Date.now(),
                avg: 0,
                html: g
            }
        },
        beginClock: function(b,
            c) {
            this.clocks[b].start = Date.now() + (c || 0)
        },
        endClock: function(b) {
            b = this.clocks[b];
            b.current = Math.round(Date.now() - b.start);
            b.avg = 0.8 * b.avg + 0.2 * b.current
        },
        mark: function(b, c) {
            this.active && this.marks.push({
                msg: b,
                color: c || "#fff"
            })
        },
        beforeRun: function() {
            this.endClock("lag");
            this.timeBeforeRun = Date.now()
        },
        afterRun: function() {
            var b = Date.now() - this.timeBeforeRun;
            this.beginClock("lag", Math.max(1E3 / ig.system.fps - b, 0));
            var b = this.graph.width - 1,
                c = this.height;
            this.ctx.drawImage(this.graph, -1, 0);
            this.ctx.fillStyle =
                "#000";
            this.ctx.fillRect(b, 0, 1, this.height);
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(b, this.mark16ms, 1, 1);
            this.ctx.fillStyle = "#444";
            this.ctx.fillRect(b, this.mark33ms, 1, 1);
            for (var d in this.clocks) {
                var e = this.clocks[d];
                e.html.textContent = e.avg.toFixed(2);
                if (e.color && 0 < e.current) {
                    this.ctx.fillStyle = e.color;
                    var g = e.current * this.msHeight,
                        c = c - g;
                    this.ctx.fillRect(b, c, 1, g);
                    e.current = 0
                }
            }
            this.ctx.textAlign = "right";
            this.ctx.textBaseline = "top";
            this.ctx.globalAlpha = 0.5;
            for (d = 0; d < this.marks.length; d++) c = this.marks[d],
                this.ctx.fillStyle = c.color, this.ctx.fillRect(b, 0, 1, this.height), c.msg && (this.ctx.fillText(c.msg, b - 1, this.textY), this.textY = (this.textY + 8) % 32);
            this.ctx.globalAlpha = 1;
            this.marks = []
        }
    });
    ig.debug.addPanel({
        type: ig.DebugGraphPanel,
        name: "graph",
        label: "Performance"
    })
});
ig.baked = !0;
ig.module("impact.debug.debug").requires("impact.debug.entities-panel", "impact.debug.maps-panel", "impact.debug.graph-panel").defines(function() {});
ig.baked = !0;
ig.module("plugins.splash-loader").requires("impact.loader", "impact.animation").defines(function() {
    ig.SplashLoader = ig.Loader.extend({
        splashDesktop: new ig.Image("media/graphics/splash/cover.jpg"),
        splashMobile: new ig.Image("media/graphics/splash/cover.jpg"),
        loadingbar: new ig.Image("media/graphics/splash/loading-bar.png"),
        init: function(b, c) {
            this.parent(b, c);
            ig.ua.mobile && _SETTINGS.Ad.Mobile.Preroll.Enabled && MobileAdInGamePreroll.Initialize()
        },
        end: function() {
            this.parent();
            var b = 0 <= document.URL.indexOf("localhost") ?
                500 : 3E3;
            window.setTimeout("ig.system.setGame(MyGame)", b)
        },
        setupCustomAnimation: function() {
            this.customAnim = new ig.Animation(this.customAnim, 0.05, [0, 1, 2, 3, 4, 5]);
            this.customAnim.currentFrame = 0;
            ig.loadingScreen = this;
            ig.loadingScreen.animationTimer = window.setInterval("ig.loadingScreen.animate()", 100)
        },
        animate: function() {
            this.customAnim.currentFrame < this.customAnim.sequence.length ? this.customAnim.currentFrame++ : this.customAnim.currentFrame = 0;
            this.customAnim.gotoFrame(this.customAnim.currentFrame)
        },
        draw: function() {
            this._drawStatus +=
                (this.status - this._drawStatus) / 5;
            ig.system.context.fillStyle = "#000";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            var b = ig.system.scale,
                c, d, e, g;
            ig.ua.mobile ? (c = 191, d = 33, e = 0.5 * ig.system.width - c / 2, g = 5 * ig.system.height / 6, this.splashMobile.draw(0, 0)) : (c = 191, d = 33, e = 0.5 * ig.system.width - c / 2, g = 5 * ig.system.height / 6, this.splashDesktop.draw(0, 0));
            this.loadingbar.draw(e * b, g * b, 0, 0, 191, 33);
            this.loadingbar.draw(e * b, g * b, 0, 33, c * b * this._drawStatus, d * b)
        }
    })
});
ig.baked = !0;
ig.module("plugins.tween").requires("impact.entity").defines(function() {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
        for (var c = 0; c < this.length; ++c)
            if (this[c] === b) return c;
        return -1
    });
    ig.Entity.prototype.tweens = [];
    ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update;
    ig.Entity.prototype.update = function() {
        this._preTweenUpdate();
        if (0 < this.tweens.length) {
            for (var b = [], c = 0; c < this.tweens.length; c++) this.tweens[c].update(), this.tweens[c].complete || b.push(this.tweens[c]);
            this.tweens =
                b
        }
    };
    ig.Entity.prototype.tween = function(b, c, d) {
        b = new ig.Tween(this, b, c, d);
        this.tweens.push(b);
        return b
    };
    ig.Entity.prototype.pauseTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].pause()
    };
    ig.Entity.prototype.resumeTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].resume()
    };
    ig.Entity.prototype.stopTweens = function(b) {
        for (var c = 0; c < this.tweens.length; c++) this.tweens[c].stop(b)
    };
    ig.Tween = function(b, c, d, e) {
        var g = {},
            l = {},
            p = {},
            x = 0,
            q = !1,
            u = !1,
            y = !1;
        this.duration = d;
        this.paused =
            this.complete = !1;
        this.easing = ig.Tween.Easing.Linear.EaseNone;
        this.onComplete = !1;
        this.loop = this.delay = 0;
        this.loopCount = -1;
        ig.merge(this, e);
        this.loopNum = this.loopCount;
        this.chain = function(b) {
            y = b
        };
        this.initEnd = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.initEnd(subprop, c[b], d[b])
        };
        this.initStart = function(b, c, d, e) {
            if ("object" !== typeof d[b]) "undefined" !== typeof c[b] && (e[b] = d[b]);
            else
                for (subprop in d[b]) e[b] || (e[b] = {}), "undefined" !== typeof c[b] && this.initStart(subprop,
                    c[b], d[b], e[b])
        };
        this.start = function() {
            this.paused = this.complete = !1;
            this.loopNum = this.loopCount;
            x = 0; - 1 == b.tweens.indexOf(this) && b.tweens.push(this);
            u = !0;
            q = new ig.Timer;
            for (var d in c) this.initEnd(d, c, l);
            for (d in l) this.initStart(d, l, b, g), this.initDelta(d, p, b, l)
        };
        this.initDelta = function(b, c, d, e) {
            if ("object" !== typeof e[b]) c[b] = e[b] - d[b];
            else
                for (subprop in e[b]) c[b] || (c[b] = {}), this.initDelta(subprop, c[b], d[b], e[b])
        };
        this.propUpdate = function(b, c, d, e, g) {
            if ("object" !== typeof d[b]) c[b] = "undefined" != typeof d[b] ?
                d[b] + e[b] * g : c[b];
            else
                for (subprop in d[b]) this.propUpdate(subprop, c[b], d[b], e[b], g)
        };
        this.propSet = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.propSet(subprop, c[b], d[b])
        };
        this.update = function() {
            if (!u) return !1;
            if (this.delay) {
                if (q.delta() < this.delay) return;
                this.delay = 0;
                q.reset()
            }
            if (this.paused || this.complete) return !1;
            var c = (q.delta() + x) / this.duration,
                c = 1 < c ? 1 : c,
                d = this.easing(c);
            for (property in p) this.propUpdate(property, b, g, p, d);
            if (1 <= c) {
                if (0 == this.loopNum ||
                    !this.loop) {
                    this.complete = !0;
                    if (this.onComplete) this.onComplete();
                    y && y.start();
                    return !1
                }
                if (this.loop == ig.Tween.Loop.Revert) {
                    for (property in g) this.propSet(property, g, b);
                    x = 0;
                    q.reset(); - 1 != this.loopNum && this.loopNum--
                } else if (this.loop == ig.Tween.Loop.Reverse) {
                    c = {};
                    d = {};
                    ig.merge(c, l);
                    ig.merge(d, g);
                    ig.merge(g, c);
                    ig.merge(l, d);
                    for (property in l) this.initDelta(property, p, b, l);
                    x = 0;
                    q.reset(); - 1 != this.loopNum && this.loopNum--
                }
            }
        };
        this.pause = function() {
            this.paused = !0;
            x += q.delta()
        };
        this.resume = function() {
            this.paused = !1;
            q.reset()
        };
        this.stop = function(b) {
            b && (this.loop = this.complete = this.paused = !1, x += d, this.update());
            this.complete = !0
        }
    };
    ig.Tween.Loop = {
        Revert: 1,
        Reverse: 2
    };
    ig.Tween.Easing = {
        Linear: {},
        Quadratic: {},
        Cubic: {},
        Quartic: {},
        Quintic: {},
        Sinusoidal: {},
        Exponential: {},
        Circular: {},
        Elastic: {},
        Back: {},
        Bounce: {}
    };
    ig.Tween.Easing.Linear.EaseNone = function(b) {
        return b
    };
    ig.Tween.Easing.Quadratic.EaseIn = function(b) {
        return b * b
    };
    ig.Tween.Easing.Quadratic.EaseOut = function(b) {
        return -b * (b - 2)
    };
    ig.Tween.Easing.Quadratic.EaseInOut =
        function(b) {
            return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1)
        };
    ig.Tween.Easing.Cubic.EaseIn = function(b) {
        return b * b * b
    };
    ig.Tween.Easing.Cubic.EaseOut = function(b) {
        return --b * b * b + 1
    };
    ig.Tween.Easing.Cubic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2)
    };
    ig.Tween.Easing.Quartic.EaseIn = function(b) {
        return b * b * b * b
    };
    ig.Tween.Easing.Quartic.EaseOut = function(b) {
        return -(--b * b * b * b - 1)
    };
    ig.Tween.Easing.Quartic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2)
    };
    ig.Tween.Easing.Quintic.EaseIn =
        function(b) {
            return b * b * b * b * b
        };
    ig.Tween.Easing.Quintic.EaseOut = function(b) {
        return (b -= 1) * b * b * b * b + 1
    };
    ig.Tween.Easing.Quintic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseIn = function(b) {
        return -Math.cos(b * Math.PI / 2) + 1
    };
    ig.Tween.Easing.Sinusoidal.EaseOut = function(b) {
        return Math.sin(b * Math.PI / 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseInOut = function(b) {
        return -0.5 * (Math.cos(Math.PI * b) - 1)
    };
    ig.Tween.Easing.Exponential.EaseIn = function(b) {
        return 0 == b ? 0 : Math.pow(2,
            10 * (b - 1))
    };
    ig.Tween.Easing.Exponential.EaseOut = function(b) {
        return 1 == b ? 1 : -Math.pow(2, -10 * b) + 1
    };
    ig.Tween.Easing.Exponential.EaseInOut = function(b) {
        return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2)
    };
    ig.Tween.Easing.Circular.EaseIn = function(b) {
        return -(Math.sqrt(1 - b * b) - 1)
    };
    ig.Tween.Easing.Circular.EaseOut = function(b) {
        return Math.sqrt(1 - --b * b)
    };
    ig.Tween.Easing.Circular.EaseInOut = function(b) {
        return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
    };
    ig.Tween.Easing.Elastic.EaseIn =
        function(b) {
            var c, d = 0.1,
                e = 0.4;
            if (0 == b) return 0;
            if (1 == b) return 1;
            e || (e = 0.3);
            !d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
            return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / e))
        };
    ig.Tween.Easing.Elastic.EaseOut = function(b) {
        var c, d = 0.1,
            e = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        e || (e = 0.3);
        !d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
        return d * Math.pow(2, -10 * b) * Math.sin(2 * (b - c) * Math.PI / e) + 1
    };
    ig.Tween.Easing.Elastic.EaseInOut = function(b) {
        var c, d = 0.1,
            e = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        e || (e = 0.3);
        !d || 1 > d ? (d = 1, c = e / 4) : c = e / (2 * Math.PI) * Math.asin(1 / d);
        return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / e) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / e) + 1
    };
    ig.Tween.Easing.Back.EaseIn = function(b) {
        return b * b * (2.70158 * b - 1.70158)
    };
    ig.Tween.Easing.Back.EaseOut = function(b) {
        return (b -= 1) * b * (2.70158 * b + 1.70158) + 1
    };
    ig.Tween.Easing.Back.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2)
    };
    ig.Tween.Easing.Bounce.EaseIn =
        function(b) {
            return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - b)
        };
    ig.Tween.Easing.Bounce.EaseOut = function(b) {
        return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375
    };
    ig.Tween.Easing.Bounce.EaseInOut = function(b) {
        return 0.5 > b ? 0.5 * ig.Tween.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tween.Easing.Bounce.EaseOut(2 * b - 1) + 0.5
    }
});
ig.baked = !0;
ig.module("plugins.url-parameters").defines(function() {
    ig.UrlParameters = ig.Class.extend({
        init: function() {
            switch (getQueryVariable("iphone")) {
                case "true":
                    ig.ua.iPhone = !0, console.log("iPhone mode")
            }
            var b = getQueryVariable("webview");
            if (b) switch (b) {
                case "true":
                    ig.ua.is_uiwebview = !0, console.log("webview mode")
            }
            if (b = getQueryVariable("debug")) switch (b) {
                case "true":
                    ig.game.showDebugMenu(), console.log("debug mode")
            }
            switch (getQueryVariable("view")) {
                case "stats":
                    ig.game.resetPlayerStats(), ig.game.endGame()
            }
            getQueryVariable("ad")
        }
    })
});
ig.baked = !0;
ig.module("plugins.jukebox").defines(function() {
    ig.Jukebox = ig.Class.extend({
        init: function() {
            
            this.player = new jukebox.Player({
                resources: ["media/audio/game/bgm.mp3", "media/audio/game/bgm.ogg"],
                autoplay: "music",
                spritemap: {
                    music: {
                        start: 5,
                        end: 32,
                        loop: !1
                    }
                }
            })
        }
    })
});
ig.baked = !0;
ig.module("plugins.director").requires("impact.impact").defines(function() {
    ig.Director = ig.Class.extend({
        init: function(b, c) {
            this.game = b;
            this.levels = [];
            this.currentLevel = 0;
            this.append(c)
        },
        loadLevel: function(b) {
            for (key in dynamicClickableEntityDivs) ig.game.hideOverlay([key]);
            this.currentLevel = b;
            this.game.loadLevel(this.levels[b]);
            return !0
        },
        loadLevelWithoutEntities: function(b) {
            this.currentLevel = b;
            this.game.loadLevelWithoutEntities(this.levels[b]);
            return !0
        },
        append: function(b) {
            newLevels = [];
            return "object" ===
                typeof b ? (b.constructor === [].constructor ? newLevels = b : newLevels[0] = b, this.levels = this.levels.concat(newLevels), !0) : !1
        },
        nextLevel: function() {
            return this.currentLevel + 1 < this.levels.length ? this.loadLevel(this.currentLevel + 1) : !1
        },
        previousLevel: function() {
            return 0 <= this.currentLevel - 1 ? this.loadLevel(this.currentLevel - 1) : !1
        },
        jumpTo: function(b) {
            var c = null;
            for (i = 0; i < this.levels.length; i++) this.levels[i] == b && (c = i);
            return 0 <= c ? this.loadLevel(c) : !1
        },
        firstLevel: function() {
            return this.loadLevel(0)
        },
        lastLevel: function() {
            return this.loadLevel(this.levels.length -
                1)
        },
        reloadLevel: function() {
            return this.loadLevel(this.currentLevel)
        }
    })
});
ig.baked = !0;
ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
    ig.Storage = ig.Class.extend({
        staticInstantiate: function() {
            return !ig.Storage.instance ? null : ig.Storage.instance
        },
        init: function() {
            ig.Storage.instance = this
        },
        isCapable: function() {
            return "undefined" !== typeof window.localStorage
        },
        isSet: function(b) {
            return null !== this.get(b)
        },
        initUnset: function(b, c) {
            null === this.get(b) && this.set(b, c)
        },
        get: function(b) {
            if (!this.isCapable()) return null;
            try {
                return JSON.parse(localStorage.getItem(b))
            } catch (c) {
                return window.localStorage.getItem(b)
            }
        },
        getInt: function(b) {
            return ~~this.get(b)
        },
        getFloat: function(b) {
            return parseFloat(this.get(b))
        },
        getBool: function(b) {
            return !!this.get(b)
        },
        key: function(b) {
            return this.isCapable() ? window.localStorage.key(b) : null
        },
        set: function(b, c) {
            if (!this.isCapable()) return null;
            try {
                window.localStorage.setItem(b, JSON.stringify(c))
            } catch (d) {
                d == QUOTA_EXCEEDED_ERR && console.log("localStorage quota exceeded")
            }
        },
        setHighest: function(b, c) {
            c > this.getFloat(b) && this.set(b, c)
        },
        remove: function(b) {
            if (!this.isCapable()) return null;
            window.localStorage.removeItem(b)
        },
        clear: function() {
            if (!this.isCapable()) return null;
            window.localStorage.clear()
        }
    })
});
this.START_BRANDING_SPLASH;
ig.baked = !0;
ig.module("plugins.branding.splash").requires("impact.impact", "impact.entity").defines(function() {
    ig.BrandingSplash = ig.Class.extend({
        init: function() {
            ig.game.spawnEntity(EntityBranding, 0, 0)
        }
    });
    EntityBranding = ig.Entity.extend({
        gravityFactor: 0,
        size: {
            x: 32,
            y: 32
        },
        splash_320x480: new ig.AnimationSheet("branding/splash_320x480.png", 320, 200),
        splash_480x640: new ig.AnimationSheet("branding/splash_480x640.png", 480, 240),
        init: function(b, c, d) {
            this.parent(b, c, d);
            320 >= ig.system.width ? (this.size.x = 320, this.size.y = 200,
                this.anims.idle = new ig.Animation(this.splash_320x480, 0, [0], !0)) : (this.size.x = 480, this.size.y = 240, this.anims.idle = new ig.Animation(this.splash_480x640, 0, [0], !0));
            this.pos.x = (ig.system.width - this.size.x) / 2;
            this.pos.y = -this.size.y - 200;
            this.endPosY = (ig.system.height - this.size.y) / 2;
            b = this.tween({
                pos: {
                    y: this.endPosY
                }
            }, 0.5, {
                easing: ig.Tween.Easing.Bounce.EaseIn
            });
            c = this.tween({}, 2.5, {
                onComplete: function() {
                    ig.game.director.loadLevel(ig.game.director.currentLevel)
                }
            });
            b.chain(c);
            b.start();
            this.currentAnim = this.anims.idle
        },
        createClickableLayer: function() {
            console.log("Build clickable layer");
            this.checkClickableLayer("branding-splash", _SETTINGS.Branding.Logo.Link, !0)
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "branding/invisible.png", d))
        },
        createClickableOutboundLayer: function(b,
            c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var l = window.innerHeight / mobileHeight,
                    p = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * p);
                $("#" + g.id).css("top", this.pos.y * l);
                $("#" + g.id).css("width", this.size.x * p);
                $("#" + g.id).css("height", this.size.y * l)
            } else l = w / 2 - destW / 2, p = h / 2 - destH / 2, console.log(l, p), $("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y *
                multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        draw: function() {
            ig.system.context.fillStyle = "#ffffff";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            this.parent()
        }
    })
});
this.END_BRANDING_SPLASH;
ig.baked = !0;
ig.module("game.entities.branding-logo-placeholder").requires("impact.entity").defines(function() {
    EntityBrandingLogoPlaceholder = ig.Entity.extend({
        gravityFactor: 0,
        size: {
            x: 32,
            y: 32
        },
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        init: function(b, c, d) {
            this.parent(b, c, d);
            if (d) switch (console.log("settings found ... using that div layer name"), b = d.div_layer_name, console.log("settings.centralize:", d.centralize), d.centralize) {
                case "true":
                    console.log("centralize true");
                    centralize = !0;
                    break;
                case "false":
                    console.log("centralize false");
                    centralize = !1;
                    break;
                default:
                    console.log("default ... centralize false"), centralize = !1
            } else b = "branding-logo", centralize = !1;
            if ("undefined" == typeof wm) {
                if (_SETTINGS.Branding.Logo.Enabled) try {
                    ig.game.spawnEntity(EntityBrandingLogo, this.pos.x, this.pos.y, {
                        div_layer_name: b,
                        centralize: centralize
                    })
                } catch (e) {
                    console.log(e)
                }
                this.kill()
            }
        }
    })
});
this.START_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.branding-logo").requires("impact.entity").defines(function() {
    EntityBrandingLogo = ig.Entity.extend({
        gravityFactor: 0,
        logo: new ig.AnimationSheet("branding/logo.png", _SETTINGS.Branding.Logo.Width, _SETTINGS.Branding.Logo.Height),
        size: {
            x: 32,
            y: 32
        },
        zIndex: 10001,
        init: function(b, c, d) {
            this.parent(b, c, d);
            "undefined" == typeof wm && (_SETTINGS.Branding.Logo.Enabled ? (this.size.x = _SETTINGS.Branding.Logo.Width, this.size.y = _SETTINGS.Branding.Logo.Height, d && d.centralize && (this.pos.x = ig.system.width /
                2 - this.size.x / 2, console.log("centralize true ... centering branded logo ..."))) : this.kill());
            this.anims.idle = new ig.Animation(this.logo, 0, [0], !0);
            this.currentAnim = this.anims.idle;
            d ? (console.log("branding settings found ... using that div layer name"), b = d.div_layer_name) : b = "branding-logo";
            this.checkClickableLayer(b, _SETTINGS.Branding.Logo.Link, !0);
            console.log("branding logo spawed ...")
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b,
            c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "branding/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var l = window.innerHeight / mobileHeight,
                    p = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * p);
                $("#" +
                    g.id).css("top", this.pos.y * l);
                $("#" + g.id).css("width", this.size.x * p);
                $("#" + g.id).css("height", this.size.y * l)
            } else l = w / 2 - destW / 2, p = h / 2 - destH / 2, console.log(l, p), $("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" +
                d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
this.END_BRANDING_LOGO;
ig.baked = !0;
ig.module("game.entities.button-more-games").requires("impact.entity").defines(function() {
    EntityButtonMoreGames = ig.Entity.extend({
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet("media/graphics/game/menu-button-moregame.png", 200, 52),
        size: {
            x: 200,
            y: 52
        },
        zIndex: 750,
        init: function(b, c, d) {
            this.parent(b, c, d);
            "undefined" == typeof wm && (_SETTINGS.MoreGames.Enabled ? this.checkClickableLayer(d ? d.div_layer_name : "more-games", _SETTINGS.MoreGames.Link, !0) : this.kill());
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            setTimeout(this.spawnDiv(),
                5)
        },
        spawnDiv: function() {
            this.canSpawnDiv || (this.canSpawnDiv = !0, _SETTINGS.MoreGames.Enabled ? this.checkClickableLayer(this.divLayerName ? this.divLayerName : "more-games", _SETTINGS.MoreGames.Link, !0) : this.kill())
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b,
                c, "media/graphics/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("position", "absolute");
            if (ig.ua.mobile) {
                var l = window.innerHeight / mobileHeight,
                    p = window.innerWidth / mobileWidth;
                $("#" + g.id).css("left", this.pos.x * p);
                $("#" + g.id).css("top", this.pos.y * l);
                $("#" + g.id).css("width", this.size.x * p);
                $("#" + g.id).css("height", this.size.y * l)
            } else l = document.getElementById("game").offsetLeft,
                p = document.getElementById("game").offsetTop, $("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y * multiplier), $("#" + g.id).css("width", this.size.x * multiplier), $("#" + g.id).css("height", this.size.y * multiplier);
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width =
                this.size.x * multiplier;
            dynamicClickableEntityDivs[b].height = this.size.y * multiplier;
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        }
    })
});
ig.baked = !0;
ig.module("game.entities.opening-shield").requires("impact.entity").defines(function() {
    EntityOpeningShield = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        move: 0,
        mIconAnim: 0,
        shieldAnim: 0,
        titleAnim: 0,
        shieldImage: new ig.Image("media/graphics/opening/shield.png"),
        mIconImage: new ig.Image("media/graphics/opening/m_icon.png"),
        titleImage: new ig.Image("media/graphics/opening/title.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            this.initTimer = new ig.Timer(0.1);
            try {
                ig.game.openingSound.play()
            } catch (b) {
                console.log(b)
            }
        },
        update: function() {
            this.parent();
            this.updateOriginalShieldOpening()
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawOriginalShieldOpening())
        },
        updateOriginalShieldOpening: function() {
            this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.sheildTimer = new ig.Timer(0.05));
            this.sheildTimer && 0 < this.sheildTimer.delta() && (3 > this.shieldAnim ? (this.shieldAnim++, this.sheildTimer.reset()) :
                (this.sheildTimer = null, this.moveTimer = new ig.Timer(0.0010), this.mIconTimer = new ig.Timer(0.05), this.titleTimer = new ig.Timer(0.15)));
            this.moveTimer && 0 < this.moveTimer.delta() && (this.move += 0.3, this.moveTimer.reset());
            this.mIconTimer && 0 < this.mIconTimer.delta() && (12 > this.mIconAnim ? (this.mIconAnim++, this.moveTimer.reset()) : this.mIconTimer = null);
            this.titleTimer && 0 < this.titleTimer.delta() && (11 > this.titleAnim ? (this.titleAnim++, this.titleTimer.reset()) : (this.titleTimer = null, this.nextLevelTimer = new ig.Timer(1)));
            this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
        },
        drawOriginalShieldOpening: function() {
            if (this.moveTimer) {
                var b = ig.system.context;
                b.save();
                var c = ig.system.width / 2,
                    d = ig.system.height / 2;
                b.translate(c, d);
                b.rotate(this.move * Math.PI / 180);
                b.beginPath();
                b.moveTo(0, 0);
                for (var e = 0, g = 1; 48 >= g; g += 1) b.lineTo(0 + 800 * Math.cos(2 * g * Math.PI / 48), 0 + 800 * Math.sin(2 * g * Math.PI / 48)), e++, 2 == e && (e = 0, b.lineTo(0, 0));
                b.translate(-c, -d);
                c =
                    b.createRadialGradient(c, d, 100, c, d, 250);
                c.addColorStop(0, "rgba(255,255,255,0.1)");
                c.addColorStop(1, "rgba(0,0,0,0)");
                b.fillStyle = c;
                b.fill();
                b.restore()
            }
            this.shieldImage.drawTile(ig.system.width / 2 - 91, 0 - (768 - ig.system.height) / 2, this.shieldAnim, 182, 768);
            this.moveTimer && (this.mIconImage.drawTile(ig.system.width / 2 - 96, ig.system.height / 2 - 70, this.mIconAnim, 166, 160), this.titleImage.drawTile(ig.system.width / 2 - 204, ig.system.height / 2 + 100, this.titleAnim, 409, 76));
            ig.system.context.globalAlpha = 1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.opening-kitty").requires("impact.entity").defines(function() {
    EntityOpeningKitty = ig.Entity.extend({
        size: {
            x: 48,
            y: 48
        },
        kittyAnim: -1,
        //kittyImage: new ig.Image("media/graphics/opening/kitty.png"),
        //kittyTitleImage: new ig.Image("media/graphics/opening/kittytitle.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            this.initTimer = new ig.Timer(0.1);
            try {
                ig.game.kittyopeningSound.play()
            } catch (b) {
                console.log(b)
            }
        },
        update: function() {
            this.parent();
            this.updateKittyOpening()
        },
        draw: function() {
            this.parent();
            ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawKittyOpening())
        },
        updateKittyOpening: function() {
            this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.kittyTimer = new ig.Timer(0.15));
            //PKPlay: this.kittyTimer && 0 < this.kittyTimer.delta() && (7 > this.kittyAnim ? (this.kittyAnim++, this.kittyTimer.reset()) : (this.kittyTimer = null, this.nextLevelTimer = new ig.Timer(2)));
            this.kittyTimer && 0 < this.kittyTimer.delta() && (0 > this.kittyAnim ? (this.kittyAnim++, this.kittyTimer.reset()) : (this.kittyTimer = null, this.nextLevelTimer = new ig.Timer(0)));
            this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
        },
        drawKittyOpening: function() {
            var b = ig.system.context.createLinearGradient(0, 0, 0, ig.system.height);
            b.addColorStop(0, "#ffed94");
            b.addColorStop(1, "#ffcd85");
            ig.system.context.fillStyle = b;
            //ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            //this.kittyImage.drawTile(ig.system.width / 2 - this.kittyImage.width / 8, ig.system.height / 2 - this.kittyImage.height / 4, this.kittyAnim, 218, 325);
            //this.kittyTitleImage.drawTile(ig.system.width / 2 - this.kittyTitleImage.width / 2, ig.system.height / 2 + this.kittyImage.height / 4 + 10, this.kittyAnim, 380, 37);
            ig.system.context.globalAlpha = 1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer").requires("impact.entity").defines(function() {
    EntityPointer = ig.Entity.extend({
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        isClicking: !1,
        selectedItem: null,
        firstClick: !1,
        isReleased: !1,
        hoveringItem: null,
        objectArray: [],
        ignorePause: !0,
        zIndex: 2E4,
        firstClickObject: null,
        check: function(b) {
            this.objectArray.push(b)
        },
        clickObject: function(b) {
            this.firstClick && !this.isReleased && (b == this.firstClickObject ? "function" == typeof b.clicking && b.clicking() : this.touches(this.firstClickObject) ?
                "function" == typeof this.firstClickObject.clicking && this.firstClickObject.clicking() : ("function" == typeof this.firstClickObject.released && this.firstClickObject.released(), this.firstClickObject = null, this.firstClick = !1));
            this.isClicking && !this.firstClick && ("function" == typeof b.clicked && b.clicked(), this.firstClick = !0, this.firstClickObject = b);
            this.firstClick && this.isReleased && ("function" == typeof b.released && b.released(), this.firstClickObject = null, this.firstClick = !1)
        },
        reset: function() {
            this.firstClickObject =
                null;
            this.firstClick = !1
        },
        refreshPos: function() {
            if (ig.ua.mobile) {
                var b = window.innerHeight / mobileHeight;
                this.pos.x = ig.input.mouse.x / (window.innerWidth / mobileWidth) - this.size.x / 2 + ig.game.screen.x;
                this.pos.y = ig.input.mouse.y / b - this.size.y / 2
            } else this.pos.x = ig.input.mouse.x / multiplier - this.size.x / 2 + ig.game.screen.x, this.pos.y = ig.input.mouse.y / multiplier - this.size.y / 2
        },
        update: function() {
            this.refreshPos();
            var b = null,
                c = -1;
            for (a = this.objectArray.length - 1; - 1 < a; a--) this.objectArray[a].zIndex > c && (c = this.objectArray[a].zIndex,
                b = this.objectArray[a]);
            null != b ? (null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && this.hoveringItem != b && this.hoveringItem.idle(), this.hoveringItem = b, this.clickObject(b), this.objectArray = []) : null != this.hoveringItem && "function" == typeof this.hoveringItem.idle && (this.hoveringItem.idle(), this.hoveringItem = null);
            this.isClicking = ig.input.pressed("click");
            this.isReleased = ig.input.released("click")
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pointer-selector").requires("game.entities.pointer").defines(function() {
    EntityPointerSelector = EntityPointer.extend({
        zIndex: 2E4,
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        size: {
            x: 20,
            y: 20
        },
        init: function(b, c, d) {
            this.parent(b, c, d)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.select").requires("impact.entity").defines(function() {
    EntitySelect = ig.Entity.extend({
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        canSelect: !1,
        canSelectTimerDuration: 0.35,
        zIndex: 99999,
        isHovering: !1,
        isSelected: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.canSelectTimer = new ig.Timer(this.canSelectTimerDuration)
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b,
            c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, e) {
            var g = ig.$new("div");
            g.id = b;
            document.body.appendChild(g);
            $("#" + g.id).css("float", "left");
            $("#" + g.id).css("width", this.size.x * multiplier);
            $("#" + g.id).css("height", this.size.y * multiplier);
            $("#" + g.id).css("position", "absolute");
            var l = w / 2 - destW / 2,
                p = h / 2 - destH / 2;
            w == mobileWidth ? ($("#" + g.id).css("left", this.pos.x), $("#" + g.id).css("top", this.pos.y)) : ($("#" + g.id).css("left", l + this.pos.x * multiplier), $("#" + g.id).css("top", p + this.pos.y * multiplier));
            e ? $("#" + g.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + g.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = $("#" + g.id).width();
            dynamicClickableEntityDivs[b].height =
                $("#" + g.id).height();
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        hovered: function() {
            this.isHovering = !0;
            this.dehoverOthers()
        },
        dehoverOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isHovering = !1)
        },
        deselectOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isSelected = !1)
        },
        update: function() {
            this.parent();
            this.canSelectTimer && 0 <
                this.canSelectTimer.delta() && (this.canSelect = !0, this.canSelectTimer = null)
        }
    })
});
ig.baked = !0;
ig.module("game.levels.opening").requires("impact.image", "game.entities.opening-kitty").defines(function() {
    LevelOpening = {
        entities: [{
            type: "EntityOpeningKitty",
            x: 448,
            y: 168
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.entities.home-button-start").requires("impact.entity").defines(function() {
    EntityHomeButtonStart = ig.Entity.extend({
        zIndex: 100,
        size: {
            x: 180,
            y: 32
        },
        offset: {
            x: 10,
            y: 10
        },
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet("media/graphics/game/menu-button-start.png", 200, 52),
        
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        
        ready: function() {},
        //PK: Start
        clicked: function() {

            ig.game.director.loadLevel(2);
            try {
                //update PK server here
                
                pkGame.reportStatus('start');
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.home-title").requires("impact.entity").defines(function() {
    EntityHomeTitle = ig.Entity.extend({
        zIndex: 100,
        size: {
            x: 411,
            y: 214
        },
        animSheet: new ig.AnimationSheet("media/graphics/game/menu-title.png", 411, 214),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            var b = {
                x: this.pos.x,
                y: this.pos.y
            };
            this.pos.y = -this.size.y;
            this.tween({
                pos: b
            }, 0.5, {
                easing: ig.Tween.Easing.Elastic.EaseOut
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-button-mute").requires("impact.entity").defines(function() {
    EntityGameButtonMute = ig.Entity.extend({
        zIndex: 962,
        size: {
            x: 33,
            y: 33
        },
        offset: {
            x: 5,
            y: 5
        },
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet("media/graphics/game/button-mute-on.png", 43, 43),
        offSheet: new ig.AnimationSheet("media/graphics/game/button-mute-off.png", 43, 43),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            "undefined" == typeof wm && Howler._muted && (this.currentAnim = new ig.Animation(this.offSheet,
                1, [0]))
        },
        clicked: function() {
            if (ig.game.playerMuted) {
                ig.game.playerMuted = !1;
                ig.game.unmute();
                console.log("ig.game.unmute");
                ig.Sound.enabled = !0;
                this.currentAnim = new ig.Animation(this.animSheet, 1, [0]);
                try {
                    ig.game.buttonSound.play()
                } catch (b) {
                    console.log(b)
                }
            } else ig.game.playerMuted = !0, ig.game.mute(), console.log("ig.game.mute"), ig.Sound.enabled = !1, this.currentAnim = new ig.Animation(this.offSheet, 1, [0])
        }
    })
});
ig.baked = !0;
ig.module("game.levels.home").requires("impact.image", "game.entities.home-button-start", "game.entities.home-title", "game.entities.button-more-games", "game.entities.game-button-mute", "game.entities.pointer-selector").defines(function() {
    LevelHome = {
        entities: [{
            type: "EntityHomeButtonStart",
            x: 152.5,
            y: 542
        }, {
            type: "EntityHomeTitle",
            x: 33,
            y: 101
        },
        //PKPlayer: remove more button
        //  {
        //     type: "EntityButtonMoreGames",
        //     x: 251,
        //     y: 532
        // },
         {
            type: "EntityGameButtonMute",
            x: 433,
            y: 17
        }, {
            type: "EntityPointerSelector",
            x: 16,
            y: 12
        }],
        layer: [{
            name: "bg",
            width: 3,
            height: 4,
            linkWithCollision: !1,
            visible: 1,
            tilesetName: "media/graphics/game/menu-bg.jpg",
            repeat: !1,
            preRender: !0,
            distance: "1",
            tilesize: 160,
            foreground: !1,
            data: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [10, 11, 12]
            ]
        }]
    };
    LevelHomeResources = [new ig.Image("media/graphics/game/menu-bg.jpg")]
});
ig.baked = !0;
ig.module("game.entities.game-damage-text").requires("impact.entity").defines(function() {
    EntityGameDamageText = ig.Entity.extend({
        zIndex: 910,
        size: {
            x: 0,
            y: 0
        },
        fontSize: "24",
        fontStyle: "Arial",
        fontWeight: "",
        fontColor: "#fff",
        text: "",
        fadeOutTime: 1.5,
        fadeTimer: new ig.Timer,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.startFadeOut()
        },
        draw: function() {
            this.parent();
            if ("undefined" == typeof wm) {
                var b = ig.system.context.globalAlpha,
                    c = 0;
                if (this.fadeTimer && 0 < this.fadeTimer.delta()) {
                    var d = 1 - this.fadeTimer.delta() / this.fadeOutTime;
                    ig.system.context.globalAlpha = d;
                    c = -18 * (1 - d)
                }
                d = this.pos.x - ig.system.context.measureText(this.text).width / 2;
                c = this.pos.y + ig.system.context.measureText("M").width / 2 + c;
                ig.system.context.fillStyle = this.fontColor;
                ig.system.context.font = this.fontWeight + " " + this.fontSize + "px " + this.fontStyle;
                ig.system.context.fillText(this.text, d, c);
                ig.system.context.globalAlpha = b
            }
        },
        update: function() {
            this.parent();
            this.fadeTimer && this.fadeTimer.delta() > this.fadeOutTime && this.kill()
        },
        startFadeOut: function() {
            this.fadeTimer.unpause();
            this.fadeTimer.set(0)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-transition-overlay").requires("impact.entity").defines(function() {
    EntityGameTransitionOverlay = ig.Entity.extend({
        zIndex: 970,
        size: {
            x: 480,
            y: 640
        },
        color: "#bfbfbf",
        alpha: 1,
        hidden: !1,
        countdownAnimSheet: new ig.AnimationSheet("media/graphics/game/count-down.png", 287, 136),
        countdownAnim: null,
        doCountdown: !1,
        timer: new ig.Timer,
        countdownTimer: new ig.Timer,
        duration: 0,
        startAlpha: 1,
        endAlpha: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.countdownAnim = new ig.Animation(this.countdownAnimSheet,
                1, [0, 1, 2, 3], !0)
        },
        draw: function() {
            if (!this.hidden) {
                this.parent();
                var b = ig.system.context.globalAlpha;
                ig.system.context.globalAlpha = this.alpha;
                var c = this.size.x,
                    d = this.size.y,
                    e = this.pos.x,
                    g = this.pos.y;
                ig.system.context.fillStyle = this.color;
                ig.system.context.fillRect(e, g, c, d);
                ig.system.context.globalAlpha = b;
                this.doCountdown && (e = (this.size.x - 287) / 2, this.countdownAnim.draw(e, 70))
            }
        },
        update: function() {
            this.parent();
            if (0 < this.duration && this.timer && 0 >= this.timer.delta()) {
                var b = 1 - -this.timer.delta() / this.duration;
                this.alpha = this.startAlpha + (this.endAlpha - this.startAlpha) * b
            }
            this.doCountdown && 0 < this.countdownTimer.delta() && (this.doCountdown = !1);
            this.hidden || this.countdownAnim && this.countdownAnim.update()
        },
        show: function() {
            this.hidden = !1
        },
        hide: function() {
            this.hidden = !0
        },
        pauseCountdown: function() {
            this.countdownTimer.pause();
            this.countdownAnim.timer.pause()
        },
        unpauseCountdown: function() {
            this.countdownTimer.unpause();
            this.countdownAnim.timer.unpause()
        },
        startCountdown: function(b) {
            this.doCountdown = !0;
            this.countdownTimer.set(b)
        },
        setAlpha: function(b) {
            this.alpha = this.startAlpha = b
        },
        easeInToAlpha: function(b, c) {
            this.endAlpha = b;
            this.duration = c;
            this.timer.set(c)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.howtoplay-overlay").requires("impact.entity").defines(function() {
    EntityHowtoplayOverlay = ig.Entity.extend({
        _wmDrawBox: !0,
        zIndex: 1100,
        size: {
            x: 480,
            y: 640
        },
        animSheet: new ig.AnimationSheet("media/graphics/game/howtoplay/howtoplay1.jpg", 480, 640),
        pageSheets: [new ig.AnimationSheet("media/graphics/game/howtoplay/howtoplay1.jpg", 480, 640), new ig.AnimationSheet("media/graphics/game/howtoplay/howtoplay2.jpg", 480, 640), new ig.AnimationSheet("media/graphics/game/howtoplay/howtoplay3.jpg",
            480, 640)],
        pageAnim: null,
        curPage: 0,
        childEntities: [],
        tweenDuration: 0.2,
        hidden: !0,
        pageIsTurning: !1,
        pageIsTurningLeft: !1,
        pageTurnTween: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        draw: function() {
            this.parent();
            this.pageIsTurning && (this.pageIsTurningLeft ? this.pageAnim && this.pageAnim.draw(this.pos.x + ig.system.width, this.pos.y) : this.pageAnim && this.pageAnim.draw(this.pos.x - ig.system.width, this.pos.y))
        },
        addChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.push(b)
        },
        removeChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.splice(this.childEntities.indexOf(b), 1)
        },
        show: function() {
            this.hidden && (this.hidden = !1, ig.game.getEntitiesByType(EntityPointer)[0].firstClick = !1, this.tweenIn())
        },
        hide: function() {
            this.hidden || (this.hidden = !0, this.tweenOut())
        },
        tweenIn: function() {
            this.pos.x = ig.system.width + 10;
            this.pos.y = 0;
            var b = {
                x: 0,
                y: 0
            };
            this.tween({
                pos: b
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseOut,
                entity: this,
                onComplete: this.tweenInEnd
            }).start();
            for (var c = 0; c < this.childEntities.length; c++) {
                var d = this.childEntities[c];
                d.tween({
                    pos: {
                        x: b.x + d.relPos.x,
                        y: b.y + d.relPos.y
                    }
                }, 2 * this.tweenDuration, {
                    easing: ig.Tween.Easing.Back.EaseOut
                }).start()
            }
        },
        tweenInEnd: function() {
            ig.game.sortEntitiesDeferred()
        },
        tweenOut: function() {
            this.pos.x = 0;
            this.pos.y = 0;
            var b = {
                x: ig.system.width + 10,
                y: 0
            };
            this.tween({
                pos: b
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseIn,
                entity: this,
                onComplete: this.tweenOutEnd
            }).start();
            for (var c = 0; c < this.childEntities.length; c++) {
                var d =
                    this.childEntities[c];
                d.tween({
                    pos: {
                        x: b.x + d.relPos.x,
                        y: b.y + d.relPos.y
                    }
                }, 2 * this.tweenDuration, {
                    easing: ig.Tween.Easing.Back.EaseIn
                }).start()
            }
        },
        tweenOutEnd: function() {
            ig.game.sortEntitiesDeferred()
        },
        pageLeft: function() {
            if (!this.pageIsTurning) {
                this.pageIsTurning = this.pageIsTurningLeft = !0;
                var b = {
                    x: 0,
                    y: 0
                };
                b.x = this.pos.x - ig.system.width;
                b.y = this.pos.y;
                this.pageTurnTween = this.tween({
                    pos: b
                }, this.tweenDuration, {
                    entity: this,
                    onComplete: this.pageLeftEnd
                });
                this.pageTurnTween.start();
                this.curPage--;
                0 > this.curPage &&
                    (this.curPage = this.pageSheets.length - 1);
                this.pageAnim = new ig.Animation(this.pageSheets[this.curPage], 1, [0])
            }
        },
        pageLeftEnd: function() {
            this.entity.pageIsTurning = !1;
            this.entity.currentAnim = this.entity.pageAnim;
            this.entity.pos.x += ig.system.width
        },
        pageRight: function() {
            if (!this.pageIsTurning) {
                this.pageIsTurningLeft = !1;
                this.pageIsTurning = !0;
                var b = {
                    x: 0,
                    y: 0
                };
                b.x = this.pos.x + ig.system.width;
                b.y = this.pos.y;
                this.pageTurnTween = this.tween({
                    pos: b
                }, this.tweenDuration, {
                    entity: this,
                    onComplete: this.pageRightEnd
                });
                this.pageTurnTween.start();
                this.curPage++;
                this.curPage >= this.pageSheets.length && (this.curPage = 0);
                this.pageAnim = new ig.Animation(this.pageSheets[this.curPage], 1, [0])
            }
        },
        pageRightEnd: function() {
            this.entity.pageIsTurning = !1;
            this.entity.currentAnim = this.entity.pageAnim;
            this.entity.pos.x -= ig.system.width
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gamemaster").requires("game.entities.game-damage-text", "game.entities.game-transition-overlay", "game.entities.howtoplay-overlay", "impact.entity").defines(function() {
    EntityGamemaster = ig.Entity.extend({
        _wmDrawBox: !0,
        _wmBoxColor: "rgba(0, 0, 255, 0.7)",
        size: {
            x: 20,
            y: 20
        },
        boardEntity: null,
        timerDisplayEntity: null,
        happinessDisplayEntity: null,
        bossDisplayEntity: null,
        bossEffectEntity: null,
        bgDisplayEntity: null,
        bubbleDisplayEntity: null,
        pointerEntity: null,
        transitionOverlayEntity: null,
        howtoplayOverlayEntity: null,
        pauseOverlay: null,
        successOverlay: null,
        failOverlay: null,
        gamePrepared: !1,
        gameTransiting: !1,
        gameStarted: !1,
        gamePaused: !1,
        gameInputFrozen: !0,
        gameChainingCombo: !1,
        gameShowingHowtoplay: !1,
        level: 0,
        maxLevel: 4,
        maxScore: 100,
        startScore: 50,
        score: 0,
        scoreRate: -1,
        scoreMods: [],
        gameTimer: new ig.Timer,
        bossAttackTimer: new ig.Timer,
        previousPieceTimer: new ig.Timer,
        transitTimer: new ig.Timer,
        transitFunction: null,
        transitUpdateFunction: null,
        previousRequestedPieceType: -1,
        bossRequestedPieceType: -1,
        savedCombo: [],
        comboHasRequestedPieceType: !1,
        comboHasPreviousRequestedPieceType: !1,
        requestedMatchScore: 6,
        comboBasicMatchScore: 3,
        countdownAudioTimer: new ig.Timer,
        bossEffectTimer: new ig.Timer,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            this.parent();
            this.prepareGame();
            this.startPregame()
        },
        update: function() {
            if (!this.gamePaused)
                if (this.gameTransiting) this.processTransitions();
                else if (this.gameStarted) {
                this.timerDisplayEntity && this.timerDisplayEntity.setValue(Math.floor(this.gameTimer.delta()));
                this.happinessDisplayEntity && this.happinessDisplayEntity.setValue(this.score);
                if (!this.gameChainingCombo) {
                    if (0 >= this.score) {
                        this.stopGame();
                        this.failOverlay && this.failOverlay.show();
                        try {
                            ig.game.failSound.play()
                        } catch (b) {
                            console.log(b)
                        }
                        return
                    }
                    if (this.score >= this.maxScore) {
                        this.score = this.startScore;
                        this.gotoNextLevel();
                        return
                    }!this.bossDisplayEntity.isTransiting && 0 < this.score && (this.score += this.scoreRate * ig.system.tick)
                }
                this.boardEntity && this.boardEntity.maintainBoard();
                this.resolveMatches();
                this.processBossAttackTimer();
                this.processScoreMods();
                this.bossDisplayEntity.isTransiting ||
                    this.bossEffectTimer && 0 <= this.bossEffectTimer.delta() && this.bubbleDisplayEntity.show()
            }
        },
        prepareGame: function() {
            this.boardEntity = ig.game.getEntitiesByType(EntityGameBoard)[0];
            this.timerDisplayEntity = ig.game.getEntitiesByType(EntityGameTimerDisplay)[0];
            this.happinessDisplayEntity = ig.game.getEntitiesByType(EntityGameHappinessDisplay)[0];
            this.bossDisplayEntity = ig.game.getEntitiesByType(EntityGameBossDisplay)[0];
            this.bossEffectEntity = ig.game.getEntitiesByType(EntityGameBossEffect)[0];
            this.bgDisplayEntity =
                ig.game.getEntitiesByType(EntityGameBgDisplay)[0];
            this.bubbleDisplayEntity = ig.game.getEntitiesByType(EntityGameBubble)[0];
            this.pointerEntity = ig.game.getEntitiesByType(EntityPointer)[0];
            null != this.boardEntity && (this.boardEntity.gamemaster = this);
            null != this.bubbleDisplayEntity && (this.bubbleDisplayEntity.gamemaster = this);
            null != this.bossDisplayEntity && (this.bossDisplayEntity.gamemaster = this);
            null != this.bossEffectEntity && (this.bossEffectEntity.gamemaster = this);
            this.pauseOverlay = ig.game.getEntitiesByType(EntityPauseOverlay)[0];
            this.successOverlay = ig.game.getEntitiesByType(EntitySuccessOverlay)[0];
            this.failOverlay = ig.game.getEntitiesByType(EntityFailOverlay)[0];
            this.howtoplayOverlayEntity = ig.game.getEntitiesByType(EntityHowtoplayOverlay)[0];
            this.boardEntity && (this.boardEntity.setup(5), this.boardEntity.hide(), this.happinessDisplayEntity.setMaxValue(this.maxScore), this.happinessDisplayEntity.setValue(0), this.happinessDisplayEntity.hideBar(), this.happinessDisplayEntity.hideIcon(), ig.game.clearColor = "#bfbfbf", this.transitionOverlayEntity =
                ig.game.spawnEntity(EntityGameTransitionOverlay, 0, 0), ig.game.sortEntitiesDeferred(), this.gamePrepared = !0)
        },
        startPregame: function() {
            this.bgDisplayEntity.setBgIndex(this.level);
            this.happinessDisplayEntity.showBar();
            this.happinessDisplayEntity.setValue(0);
            this.transitionOverlayEntity.setAlpha(1);
            this.transitionOverlayEntity.easeInToAlpha(0, 0.5);
            this.transitionOverlayEntity.startCountdown(3.5);
            this.boardEntity.show();
            this.boardEntity.setAlpha(0);
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            this.countdownAudioTimer.set(1);
            this.gameTransiting = !0;
            this.transitTimer.set(3.5);
            this.transitFunction = this.startGame;
            this.transitUpdateFunction = this.startingPreGame
        },
        startingPreGame: function() {
            var b = 3.5 - -this.transitTimer.delta();
            2 >= b ? this.happinessDisplayEntity.setValue(this.startScore * b / 2) : 3 >= b ? (this.happinessDisplayEntity.setValue(this.startScore), this.happinessDisplayEntity.showIcon(), this.bossDisplayEntity.bossEnter(this.level, 1.2)) : 3.5 >= b && this.boardEntity.setAlpha((b - 3) / 0.5);
            if (3 >= b) {
                if (0 <= this.countdownAudioTimer.delta()) {
                    try {
                        ig.game.buttonSound.play()
                    } catch (c) {
                        console.log(c)
                    }
                    this.countdownAudioTimer.set(1)
                }
            } else if (0 <=
                this.countdownAudioTimer.delta()) {
                try {
                    ig.game.successSound.play()
                } catch (d) {
                    console.log(d)
                }
                this.countdownAudioTimer.set(10)
            }
        },
        startGame: function() {
            this.gamePrepared && (this.transitionOverlayEntity.hide(), this.boardEntity.setAlpha(1), this.happinessDisplayEntity.setValue(this.startScore), this.score = this.startScore, this.gameTimer && this.gameTimer.set(0), this.bossAttackTimer && this.bossAttackTimer.set(0), 0 > this.bossRequestedPieceType && this.bossRequest(), this.gameInputFrozen = this.gameChainingCombo = !1, this.gameStarted = !0, this.unpauseGame())
        },
        pauseGame: function() {
            this.transitTimer.pause();
            this.gameTimer.pause();
            this.bossAttackTimer.pause();
            this.countdownAudioTimer.pause();
            this.previousPieceTimer.pause();
            this.transitionOverlayEntity && this.transitionOverlayEntity.pauseCountdown();
            this.bossDisplayEntity && this.bossDisplayEntity.pause();
            this.boardEntity && this.boardEntity.pauseTweens();
            this.bossEffectEntity && this.bossEffectEntity.pause();
            this.pauseScoreMods();
            this.pointerEntity.reset();
            this.boardEntity.releaseAllPieces();
            this.gamePaused = this.gameInputFrozen = !0;
            ig.game.playerPaused = !0
        },
        unpauseGame: function() {
            if (!this.gameShowingHowtoplay) {
                this.transitTimer.unpause();
                this.countdownAudioTimer.unpause();
                this.transitionOverlayEntity && this.transitionOverlayEntity.unpauseCountdown();
                this.bossDisplayEntity && this.bossDisplayEntity.unpause();
                this.boardEntity && this.boardEntity.resumeTweens();
                this.bossEffectEntity && this.bossEffectEntity.unpause();
                if (!this.gameChainingCombo || this.bossDisplayEntity.isTransiting) this.gameTimer.unpause(),
                    this.bossAttackTimer.unpause(), this.previousPieceTimer.unpause(), this.unpauseScoreMods();
                this.gamePaused = this.gameInputFrozen = !1;
                ig.game.playerPaused = !1
            }
        },
        stopGame: function() {
            this.gameTimer.pause();
            this.bossAttackTimer.pause();
            this.pauseScoreMods();
            this.pointerEntity.reset();
            this.boardEntity.releaseAllPieces();
            this.gameInputFrozen = !0;
            this.gameStarted = !1
        },
        resolveMatches: function() {
            if (this.boardEntity && this.boardEntity.isReleased && !(0 < this.boardEntity.numOfDroppingPieces) && !1 != this.boardEntity.verifyIntegrity()) {
                var b =
                    this.detectMatchSets();
                if (!b || 0 == b.length) {
                    if (0 < this.savedCombo.length) {
                        for (var b = !1, c = 0; c < this.savedCombo.length; c++) {
                            for (var d = 0; d < this.savedCombo[c].length; d++) {
                                for (var e = 0; e < this.savedCombo[c][d].length; e++)
                                    if (this.savedCombo[c][d][e] && !this.savedCombo[c][d][e].isDead) {
                                        b = !0;
                                        break
                                    }
                                if (b) break
                            }
                            if (b) break
                        }
                        b || (this.doComboEnd(this.savedCombo), this.savedCombo = [], this.endComboChainingState())
                    }
                } else this.savedCombo.push(b), this.doMatches(this.savedCombo.length - 1, b), this.startComboChainingState()
            }
        },
        detectMatchSets: function() {
            if (!this.boardEntity) return null;
            for (var b = [], c = this.boardEntity.gridMap.length - 1; 0 <= c; c--)
                for (var d = this.boardEntity.gridMap[c].length - 1; 0 <= d; d--) {
                    for (var e = [], g = !1, l = 0; l < b.length; l++) {
                        for (var p = 0; p < b[l].length; p++)
                            if (b[l][p].gridPos.x == d && b[l][p].gridPos.y == c) {
                                g = !0;
                                break
                            }
                        if (g) break
                    }
                    if (!g) {
                        g = this.getMatchesX(d, c);
                        if (0 < g.length) {
                            e = e.concat(g);
                            for (p = g.length - 1; 0 <= p; p--) l = this.getMatchesY(g[p].gridPos.x, g[p].gridPos.y), 0 < l.length && (l.splice(p, 1), e = e.concat(l))
                        } else if (l = this.getMatchesY(d, c), 0 < l.length) {
                            e = e.concat(l);
                            for (p = l.length -
                                1; 0 <= p; p--) g = this.getMatchesX(l[p].gridPos.x, l[p].gridPos.y), 0 < g.length && (g.splice(p, 1), e = e.concat(g))
                        }
                        0 < e.length && b.push(e)
                    }
                }
            return b
        },
        verifyPieceEntity: function(b) {
            return !b || !(b instanceof EntityGameBoardPiece) || b.isDying || b.isShifting || b.isDropping ? !1 : !0
        },
        getMatchesX: function(b, c) {
            if (!this.boardEntity) return [];
            var d = [],
                e = this.boardEntity.gridMap[c][b];
            if (!e) return [];
            var g = e.pieceType,
                l = this.boardEntity.gridMap[c].length;
            d.push(e);
            for (e = b + 1; e < l; e++) {
                var p = this.boardEntity.gridMap[c][e];
                if (this.verifyPieceEntity(p) &&
                    p.pieceType == g) d.push(p);
                else break
            }
            d.reverse();
            for (e = b - 1; 0 <= e; e--)
                if (p = this.boardEntity.gridMap[c][e], this.verifyPieceEntity(p) && p.pieceType == g) d.push(p);
                else break;
            d.reverse();
            3 > d.length && (d = []);
            return d
        },
        getMatchesY: function(b, c) {
            if (!this.boardEntity) return [];
            var d = [],
                e = this.boardEntity.gridMap[c][b];
            if (!e) return [];
            var g = e.pieceType,
                l = this.boardEntity.gridMap.length;
            d.push(e);
            for (e = c + 1; e < l; e++) {
                var p = this.boardEntity.gridMap[e][b];
                if (this.verifyPieceEntity(p) && p.pieceType == g) d.push(p);
                else break
            }
            d.reverse();
            for (e = c - 1; 0 <= e; e--)
                if (p = this.boardEntity.gridMap[e][b], this.verifyPieceEntity(p) && p.pieceType == g) d.push(p);
                else break;
            d.reverse();
            3 > d.length && (d = []);
            return d
        },
        doMatches: function(b, c) {
            if (c && 0 != c.length) {
                if (!this.comboHasRequestedPieceType)
                    for (var d = 0; d < c.length; d++)
                        if (c[d][0].pieceType == this.bossRequestedPieceType || c[d][0].pieceType == this.previousRequestedPieceType) {
                            this.comboHasRequestedPieceType = !0;
                            c[d][0].pieceType == this.previousRequestedPieceType && (this.comboHasPreviousRequestedPieceType = !0);
                            break
                        }
                for (var e =
                    0, d = 0; d < c.length; d++) {
                    for (var g = c[d], l = 0, p = 0; p < g.length; p++) l = g[p], l.startMatchRemoval(), l = l.fadeOutTime;
                    this.comboHasRequestedPieceType && (g = g[0].pieceType == this.bossRequestedPieceType || g[0].pieceType == this.previousRequestedPieceType ? this.requestedMatchScore + (g.length - 3) * this.requestedMatchScore / 2 : this.comboBasicMatchScore + (g.length - 3) * this.comboBasicMatchScore / 2, g = Math.floor(g), this.addScoreMod(g, 0.5, l), e += g)
                }
                if (0 < c.length) try {
                    ig.game.matchSound.play()
                } catch (x) {
                    console.log(x)
                }
                this.spawnDamageText(e)
            }
        },
        doComboEnd: function() {
            this.bossAttackTimer.set(0);
            this.comboHasRequestedPieceType ? (this.comboHasPreviousRequestedPieceType ? this.bossAttackTimer && this.bossAttackTimer.set(0) : (this.bossRequest(), this.bubbleDisplayEntity.hide()), this.playBossGoodEffect()) : (this.bossAttack(0.5), this.bossRequest(), this.playBossBadEffect(), this.bubbleDisplayEntity.hide());
            this.bossEffectTimer.set(this.bossEffectEntity.effectDuration)
        },
        startComboChainingState: function() {
            this.gameChainingCombo = !0;
            this.gameTimer.pause();
            this.bossAttackTimer.pause()
        },
        endComboChainingState: function() {
            this.gameChainingCombo = !1;
            this.gameTimer.unpause();
            this.bossAttackTimer.unpause();
            this.comboHasPreviousRequestedPieceType = this.comboHasRequestedPieceType = !1
        },
        processRequestedMatch: function() {
            this.addScoreMod(25, 0.5);
            this.bossRequest()
        },
        gotoNextLevel: function() {
            this.level += 1;
            if (this.level > this.maxLevel) {
                this.level = this.maxLevel;
                this.stopGame();
                this.bubbleDisplayEntity && this.bubbleDisplayEntity.hide();
                this.successOverlay && this.successOverlay.show();
                try {
                    ig.game.successSound.play()
                } catch (b) {
                    console.log(b)
                }
            } else {
                try {
                    ig.game.successSound.play()
                } catch (c) {
                    console.log(c)
                }
                this.bossDisplayEntity &&
                    this.bossDisplayEntity.animatedBossChangeTo(this.level);
                this.bgDisplayEntity && this.bgDisplayEntity.bgTransitionTo(this.level);
                this.resetScoreMods();
                this.bossAttackTimer.set(this.bossDisplayEntity.bossExitDuration + this.bossDisplayEntity.bossEnterDuration);
                this.cancelBossRequest()
            }
        },
        addScoreMod: function(b, c, d) {
            if (!c || 0 > c) c = 0;
            d || (d = 0);
            var e = new ig.Timer;
            e.set(d);
            this.scoreMods.push({
                amount: b,
                interval: c,
                timer: e,
                current: 0
            })
        },
        pauseScoreMods: function() {
            for (var b = 0; b < this.scoreMods.length; b++) this.scoreMods[b].timer.pause()
        },
        unpauseScoreMods: function() {
            for (var b = 0; b < this.scoreMods.length; b++) this.scoreMods[b].timer.unpause()
        },
        resetScoreMods: function() {
            this.scoreMods = []
        },
        processScoreMods: function() {
            for (var b = [], c = 0; c < this.scoreMods.length; c++) {
                var d = this.scoreMods[c];
                if (!(0 > d.timer.delta())) {
                    if (d.timer.delta() > d.interval) d.current < d.amount && (this.score += d.amount - d.current), b.push(c);
                    else {
                        var e = d.timer.delta() / d.interval * d.amount;
                        this.score += e - d.current;
                        d.current = e
                    }
                    this.score > this.maxScore && (this.score = this.maxScore)
                }
            }
            d = [];
            for (c = 0; c < this.scoreMods.length; c++) {
                for (var e = !1, g = 0; g < b.length; g++)
                    if (c == b[g]) {
                        e = !0;
                        break
                    }
                e || d.push(this.scoreMods[c])
            }
            this.scoreMods = d
        },
        bossAttack: function(b) {
            b || (b = 1);
            var c = this.bossDisplayEntity.bossIndex;
            if (!(0 > c || c >= this.bossDisplayEntity.bossSettings.length)) {
                var d = this.bossDisplayEntity.bossSettings[c].damage,
                    d = Math.floor(d * b);
                this.addScoreMod(-d, this.bossDisplayEntity.bossSettings[c].damageInterval);
                this.spawnDamageText(-d);
                this.bossAttackTimer && this.bossAttackTimer.set(0)
            }
        },
        processBossAttackTimer: function() {
            if (this.bossAttackTimer &&
                !this.gameChainingCombo && this.boardEntity.isReleased) {
                var b = this.bossDisplayEntity.bossIndex;
                if (!(0 > b || b >= this.bossDisplayEntity.bossSettings.length)) {
                    b = this.bossDisplayEntity.bossSettings[b].attackInterval;
                    if (this.bossAttackTimer.delta() >= b) {
                        b = this.bossAttackTimer.delta() - b;
                        this.bossAttack();
                        this.bossRequest();
                        this.bossAttackTimer.set(-b);
                        try {
                            ig.game.sadSound.play()
                        } catch (c) {
                            console.log(c)
                        }
                        this.playBossBadEffect();
                        this.bubbleDisplayEntity.hide();
                        this.bossEffectTimer.set(this.bossEffectEntity.effectDuration)
                    }
                    0 <=
                        this.previousPieceTimer.delta() && -1 < this.previousRequestedPieceType && (this.previousRequestedPieceType = -1)
                }
            }
        },
        bossRequest: function() {
            if (this.boardEntity && this.boardEntity.pieceSheets) {
                var b = [],
                    b = b.concat(this.boardEntity.currentPieceTypePool);
                b.splice(b.indexOf(this.bossRequestedPieceType), 1);
                var c = Math.floor(Math.random() * b.length);
                this.previousRequestedPieceType = this.bossRequestedPieceType;
                this.previousPieceTimer.set(1);
                this.bossRequestedPieceType = b[c];
                this.bubbleDisplayEntity && this.bubbleDisplayEntity.show(this.bossRequestedPieceType);
                this.bossAttackTimer && this.bossAttackTimer.set(0)
            }
        },
        cancelBossRequest: function() {
            this.bossRequestedPieceType = -1;
            this.bubbleDisplayEntity && this.bubbleDisplayEntity.hide()
        },
        spawnDamageText: function(b) {
            if (b) {
                b = Math.round(b);
                var c = this.happinessDisplayEntity.pos.x + this.happinessDisplayEntity.barX,
                    d = this.happinessDisplayEntity.pos.y + this.happinessDisplayEntity.barY,
                    c = c + this.happinessDisplayEntity.value / this.happinessDisplayEntity.maxValue * this.happinessDisplayEntity.barWidth,
                    c = c + 0,
                    d = d + 7,
                    e = Math.floor(20 *
                        Math.random()),
                    c = c - 20 + e,
                    e = Math.floor(20 * Math.random()),
                    g = "#fff";
                0 > b ? g = "#f00" : (b = "+" + b, g = "#0f0");
                ig.game.spawnEntity(EntityGameDamageText, c, d - 20 + e, {
                    text: b,
                    fontColor: g
                });
                ig.game.sortEntitiesDeferred()
            }
        },
        processTransitions: function() {
            0 < this.transitTimer.delta() ? (this.gameTransiting = !1, "function" == typeof this.transitFunction && this.transitFunction()) : "function" == typeof this.transitUpdateFunction && this.transitUpdateFunction()
        },
        skipCountDown: function() {
            this.gameTransiting = !1;
            this.startGame()
        },
        pieceReleased: function() {
            0 ===
                this.detectMatchSets().length ? (this.bossAttack(0.5), this.bossEffectEntity.playBadEffect()) : this.bossAttackTimer && this.bossAttackTimer.set(0)
        },
        playBossGoodEffect: function() {
            this.bossEffectEntity.playGoodEffect()
        },
        playBossBadEffect: function() {
            this.bossEffectEntity.playBadEffect()
        },
        showHowToPlay: function() {
            this.pauseGame();
            this.gameShowingHowtoplay = !0;
            this.howtoplayOverlayEntity && this.howtoplayOverlayEntity.show()
        },
        hideHowToPlay: function() {
            this.howtoplayOverlayEntity && this.howtoplayOverlayEntity.hide();
            this.gameShowingHowtoplay = !1
        },
        showPauseOverlay: function() {
            if (!this.successOverlay || this.successOverlay.hidden)
                if ((!this.failOverlay || this.failOverlay.hidden) && this.pauseOverlay) this.pauseOverlay.show(), this.pauseGame()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-bg-display").requires("impact.entity").defines(function() {
    EntityGameBgDisplay = ig.Entity.extend({
        zIndex: 0,
        size: {
            x: 480,
            y: 640
        },
        bgIndex: -1,
        isTransiting: !1,
        previousBgAnim: null,
        bgAlpha: 1,
        alphaFadeRate: 0.5,
        bgAnims: [new ig.AnimationSheet("media/graphics/game/bg1.jpg", 480, 640), new ig.AnimationSheet("media/graphics/game/bg2.jpg", 480, 640), new ig.AnimationSheet("media/graphics/game/bg3.jpg", 480, 640), new ig.AnimationSheet("media/graphics/game/bg4.jpg", 480, 640), new ig.AnimationSheet("media/graphics/game/bg5.jpg",
            480, 640)],
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        draw: function() {
            var b = ig.system.context.globalAlpha;
            this.isTransiting && (ig.system.context.globalAlpha = 1 - this.bgAlpha, this.previousBgAnim.draw(this.pos.x, this.pos.y));
            ig.system.context.globalAlpha = this.bgAlpha;
            this.parent();
            ig.system.context.globalAlpha = b
        },
        update: function() {
            this.parent();
            this.isTransiting && (1 > this.bgAlpha ? this.bgAlpha += this.alphaFadeRate * ig.system.tick : (this.bgAlpha = 1, this.isTransiting = !1))
        },
        setBgIndex: function(b) {
            this.bgIndex = b;
            0 <=
                this.bgIndex && this.bgIndex < this.bgAnims.length ? this.currentAnim = new ig.Animation(this.bgAnims[this.bgIndex], 1, [0]) : (this.bgIndex = -1, this.currentAnim = null)
        },
        bgTransitionTo: function(b) {
            this.bgAlpha = 0;
            this.previousBgAnim = this.currentAnim;
            this.isTransiting = !0;
            this.setBgIndex(b)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-ui").requires("impact.entity").defines(function() {
    EntityGameUi = ig.Entity.extend({
        zIndex: 100,
        size: {
            x: 480,
            y: 640
        },
        animSheet: new ig.AnimationSheet("media/graphics/game/ui/bg.png", 480, 640),
        childEntities: [],
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        addChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.push(b)
        },
        removeChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.splice(this.childEntities.indexOf(b), 1)
        },
        show: function() {
            this.pos.x =
                0;
            for (var b = this.pos.y = 0; b < this.childEntities.length; b++) {
                var c = this.childEntities[b];
                c.pos.x = this.pos.x + c.relPos.x;
                c.pos.y = this.pos.y + c.relPos.y
            }
        },
        hide: function() {
            this.pos.x = 0;
            this.pos.y = ig.system.height + 10;
            for (var b = 0; b < this.childEntities.length; b++) {
                var c = this.childEntities[b];
                c.pos.x = this.pos.x + c.relPos.x;
                c.pos.y = this.pos.y + c.relPos.y
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-boss-display").requires("impact.entity").defines(function() {
    EntityGameBossDisplay = ig.Entity.extend({
        zIndex: 200,
        size: {
            x: 480,
            y: 210
        },
        enterPos: {
            x: 0,
            y: 0
        },
        exitPos: {
            x: 0,
            y: 0
        },
        enterOffset: {
            x: 0,
            y: 0
        },
        exitOffset: {
            x: 0,
            y: 0
        },
        bossIndex: -1,
        bossSheets: [new ig.AnimationSheet("media/graphics/game/boss/boss1.png", 480, 210), new ig.AnimationSheet("media/graphics/game/boss/boss2.png", 480, 210), new ig.AnimationSheet("media/graphics/game/boss/boss3.png", 480, 210), new ig.AnimationSheet("media/graphics/game/boss/boss4.png",
            480, 210), new ig.AnimationSheet("media/graphics/game/boss/boss5.png", 480, 210)],
        bossAnim: null,
        bossSettings: [{
            damage: 10,
            damageInterval: 0.5,
            attackInterval: 5
        }, {
            damage: 11,
            damageInterval: 0.5,
            attackInterval: 4.7
        }, {
            damage: 12,
            damageInterval: 0.5,
            attackInterval: 4.4
        }, {
            damage: 14,
            damageInterval: 0.5,
            attackInterval: 4.1
        }, {
            damage: 16,
            damageInterval: 0.5,
            attackInterval: 3.8
        }],
        isEntering: !1,
        isExiting: !1,
        bossEnterDuration: 1,
        bossExitDuration: 1,
        newBossIndex: -1,
        isTransiting: !1,
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b,
                c, d);
            this.enterOffset.x = this.pos.x - ig.system.width;
            this.exitOffset.x = this.pos.x - ig.system.width;
            this.enterPos.x = this.pos.x - this.enterOffset.x;
            this.exitPos.x = this.pos.x
        },
        draw: function() {
            this.parent();
            "undefined" == typeof wm && this.bossAnim && 0 <= this.bossIndex && this.bossIndex < this.bossSheets.length && this.bossAnim.draw(this.pos.x, this.pos.y)
        },
        update: function() {
            this.parent();
            this.bossAnim && this.bossAnim.update()
        },
        setBossIndex: function(b) {
            this.bossIndex = b;
            0 <= this.bossIndex && this.bossIndex < this.bossSheets.length ?
                this.bossAnim = new ig.Animation(this.bossSheets[this.bossIndex], 0.1, [0, 1, 2, 3]) : (this.bossIndex = -1, this.bossAnim = null);
            this.isExiting = this.isEntering = !1
        },
        bossEnter: function(b, c) {
            !this.isEntering && !this.isExiting && (this.setBossIndex(b), this.isEntering = !0, this.pos.x = this.enterPos.x, this.pos.y = this.enterPos.y, this.tween({
                pos: {
                    x: this.pos.x + this.enterOffset.x
                }
            }, c, {
                entity: this,
                onComplete: this.bossEnterEnd
            }).start())
        },
        bossEnterEnd: function() {
            this.entity.isEntering = !1;
            this.entity.isTransiting && (this.entity.isTransiting = !1, this.entity.gamemaster && (this.entity.gamemaster.bossRequest(), this.entity.gamemaster.gameTimer.unpause()))
        },
        bossExit: function(b) {
            !this.isEntering && !this.isExiting && (this.isExiting = !0, this.pos.x = this.exitPos.x, this.pos.y = this.exitPos.y, this.tween({
                pos: {
                    x: this.pos.x + this.enterOffset.x
                }
            }, b, {
                entity: this,
                onComplete: this.bossExitEnd
            }).start())
        },
        bossExitEnd: function() {
            this.entity.isExiting = !1;
            this.entity.isTransiting && this.entity.bossEnter(this.entity.newBossIndex, this.entity.bossEnterDuration)
        },
        animatedBossChangeTo: function(b) {
            this.bossExit(this.bossExitDuration);
            this.newBossIndex = b;
            this.isTransiting = !0;
            this.gamemaster.gameTimer.pause()
        },
        pause: function() {
            this.pauseTweens();
            this.bossAnim && this.bossAnim.timer.pause()
        },
        unpause: function() {
            this.resumeTweens();
            this.bossAnim && this.bossAnim.timer.unpause()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-timer-display").requires("impact.entity").defines(function() {
    EntityGameTimerDisplay = ig.Entity.extend({
        zIndex: 200,
        size: {
            x: 144,
            y: 67
        },
        value: 0,
        animSheet: new ig.AnimationSheet("media/graphics/game/ui/timebg.png", 144, 67),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        draw: function() {
            this.parent();
            "undefined" == typeof wm && (this.drawTimeLabel(), this.drawTime())
        },
        drawTimeLabel: function() {
            ig.system.context.font = "16px Arial";
            ig.system.context.fillStyle = "#FFFFFF";
            ig.system.context.measureText("TIME");
            var b = ig.system.context.measureText("M").width;
            ig.system.context.fillText("TIME", this.pos.x + 15, this.pos.y + b + 27)
        },
        drawTime: function() {
            if (!(0 > this.value)) {
                var b = "",
                    b = this.value / 60,
                    c = this.value % 60,
                    d = Math.floor(c).toString();
                10 > c && (d = "0" + d);
                b = Math.floor(b).toString() + ":" + d;
                ig.system.context.font = "27px Arial";
                ig.system.context.fillStyle = "#FFFFFF";
                c = ig.system.context.measureText(b).width;
                d = ig.system.context.measureText("M").width;
                ig.system.context.fillText(b, this.pos.x +
                    60 + (75 - c) / 2, this.pos.y + d + 21)
            }
        },
        setValue: function(b) {
            0 > b || (this.value = b)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-bubble").requires("impact.entity").defines(function() {
    EntityGameBubble = ig.Entity.extend({
        zIndex: 205,
        size: {
            x: 134,
            y: 118
        },
        animSheet: new ig.AnimationSheet("media/graphics/game/ui/bubble.png", 134, 118),
        gamemaster: null,
        contentAnim: null,
        hidden: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            "undefined" != typeof wm && this.addAnim("idle", 1, [0])
        },
        draw: function() {
            this.hidden || (this.parent(), this.contentAnim && this.contentAnim.draw(this.pos.x + 29, this.pos.y + 20))
        },
        show: function(b) {
            this.hidden = !1;
            if (null != b)
                if (-1 >= b) this.currentAnim = this.contentAnim = null;
                else {
                    var c = this.gamemaster.boardEntity.pieceSheets;
                    b >= c.length && (b = c.length - 1);
                    0 > b || (this.contentAnim = new ig.Animation(c[b], 1, [0]), this.currentAnim = new ig.Animation(this.animSheet, 1, [0]))
                }
        },
        hide: function() {
            this.hidden = !0
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-boss-effect").requires("impact.entity").defines(function() {
    EntityGameBossEffect = ig.Entity.extend({
        zIndex: 210,
        size: {
            x: 480,
            y: 210
        },
        enterPos: {
            x: 0,
            y: 0
        },
        exitPos: {
            x: 0,
            y: 0
        },
        enterOffset: {
            x: 0,
            y: 0
        },
        exitOffset: {
            x: 0,
            y: 0
        },
        badEffectSheet: new ig.AnimationSheet("media/graphics/game/effects/bad.png", 480, 210),
        goodEffectSheet: new ig.AnimationSheet("media/graphics/game/effects/good.png", 480, 210),
        effectAnim: null,
        effectDuration: 0.4,
        hideTimer: new ig.Timer,
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b,
                c, d)
        },
        draw: function() {
            this.parent();
            "undefined" == typeof wm && this.effectAnim && this.effectAnim.draw(this.pos.x, this.pos.y)
        },
        update: function() {
            this.parent();
            this.effectAnim && (this.effectAnim.update(), 0 <= this.hideTimer.delta() && (this.stopEffects(), this.effectAnim = null))
        },
        playGoodEffect: function() {
            this.effectAnim = new ig.Animation(this.goodEffectSheet, 0.1, [3, 2, 1, 0], !0);
            this.hideTimer.set(0.4);
            try {
                ig.game.happySound.play()
            } catch (b) {
                console.log(b)
            }
        },
        playBadEffect: function() {
            this.effectAnim = new ig.Animation(this.badEffectSheet,
                0.1, [3, 2, 1, 0], !0);
            this.hideTimer.set(0.4);
            try {
                ig.game.sadSound.play()
            } catch (b) {
                console.log(b)
            }
        },
        stopEffects: function() {
            this.effectAnim = null
        },
        pause: function() {
            this.hideTimer.pause();
            this.effectAnim && this.effectAnim.timer.pause()
        },
        unpause: function() {
            this.hideTimer.unpause();
            this.effectAnim && this.effectAnim.timer.unpause()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-happiness-display").requires("impact.entity").defines(function() {
    EntityGameHappinessDisplay = ig.Entity.extend({
        zIndex: 300,
        size: {
            x: 476,
            y: 41
        },
        animSheet: new ig.AnimationSheet("media/graphics/game/ui/happybar.png", 476, 41),
        iconAnimSheets: [new ig.AnimationSheet("media/graphics/game/ui/happiness/sad.png", 37, 36), new ig.AnimationSheet("media/graphics/game/ui/happiness/littlesad.png", 37, 36), new ig.AnimationSheet("media/graphics/game/ui/happiness/normal.png", 37, 36), new ig.AnimationSheet("media/graphics/game/ui/happiness/littlehappy.png",
            37, 36), new ig.AnimationSheet("media/graphics/game/ui/happiness/happy.png", 37, 36)],
        iconAnim: null,
        gradient: null,
        barX: 41,
        barY: 15,
        barWidth: 422,
        barHeight: 10,
        maxValue: 100,
        value: 100,
        iconState: -1,
        hidden: !1,
        hiddenBar: !1,
        hiddenIcon: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0]);
            this.gradient = ig.system.context.createLinearGradient(0, 0, this.barWidth, this.barHeight);
            this.gradient.addColorStop(0, "#42c7f0")
        },
        update: function() {
            this.parent()
        },
        draw: function() {
            if (!this.hidden && (this.parent(),
                "undefined" == typeof wm))
                if (this.hiddenIcon || !(this.iconAnim && this.iconAnim.draw(this.pos.x + 2, this.pos.y + 2), 0 == this.maxValue)) this.hiddenBar || (ig.system.context.fillStyle = this.gradient, ig.system.context.fillRect(this.pos.x + this.barX, this.pos.y + this.barY, this.value / this.maxValue * this.barWidth, this.barHeight))
        },
        setMaxValue: function(b) {
            0 > b || (this.maxValue = b, this.value > this.maxValue && (this.value = this.maxValue), this.refreshIconState())
        },
        setValue: function(b) {
            0 > b || b > this.maxValue || (this.value = b, this.refreshIconState())
        },
        refreshIconState: function() {
            var b = this.iconAnimSheets.length - 1;
            this.value < this.maxValue && (b = Math.floor(this.value / this.maxValue / 0.2));
            0 <= b && b < this.iconAnimSheets.length && (this.iconState = b, this.iconAnim = new ig.Animation(this.iconAnimSheets[this.iconState], 1, [0]))
        },
        hide: function() {
            this.hidden = !0
        },
        show: function() {
            this.hidden = !1
        },
        hideBar: function() {
            this.hiddenBar = !0
        },
        showBar: function() {
            this.hiddenBar = !1
        },
        hideIcon: function() {
            this.hiddenIcon = !0
        },
        showIcon: function() {
            this.hiddenIcon = !1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-board-piece").requires("impact.entity").defines(function() {
    EntityGameBoardPiece = ig.Entity.extend({
        offset: {
            x: 10,
            y: 10
        },
        size: {
            x: 60,
            y: 60
        },
        type: ig.Entity.TYPE.B,
        zIndex: 501,
        pointer: null,
        gamemaster: null,
        board: null,
        pieceType: -1,
        gridPos: {
            x: 0,
            y: 0
        },
        pieceAnim: null,
        hidden: !1,
        zMod: 50,
        dropRate: 800,
        shiftRate: 400,
        isDragging: !1,
        isDropping: !1,
        isShifting: !1,
        isNew: !1,
        isDying: !1,
        isDead: !1,
        offsetToMouse: null,
        displayPos: {
            x: 0,
            y: 0
        },
        killTimer: null,
        fadeOutTime: 0.25,
        dragTimeLimit: 5,
        dragTimer: new ig.Timer,
        fingerImg: new ig.Image("media/graphics/game/finger.png"),
        pieceMoved: !1,
        alpha: 1,
        shiftTween: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
        },
        ready: function() {
            this.pointer || (this.pointer = ig.game.getEntitiesByType(EntityPointer)[0])
        },
        kill: function() {
            this.parent();
            if (this.board) {
                var b = this.gridPos.x,
                    c = this.gridPos.y;
                c <= this.board.gridMap.length - 1 && b <= this.board.gridMap[c].length - 1 && (this.board.gridMap[c][b] = null)
            }
        },
        draw: function() {
            if (!this.hidden) {
                this.parent();
                var b = this.pos.x,
                    c = this.pos.y;
                if (this.isDragging) {
                    var d = this.board.pos.x,
                        e = this.board.pos.x + this.board.tileSize.x * this.board.gridSize.x,
                        g = this.board.pos.y,
                        l = this.board.pos.y + this.board.tileSize.y * this.board.gridSize.y;
                    b - this.offset.x < d ? b = d + this.offset.x : b + this.size.x + this.offset.x > e && (b = e - this.size.x - this.offset.x);
                    c - this.offset.y < g ? c = g + this.offset.y : c + this.size.y + this.offset.y > l && (c = l - this.size.y - this.offset.y)
                }
                this.displayPos.x = b;
                this.displayPos.y = c;
                b = ig.system.context.globalAlpha;
                this.isDying &&
                    this.killTimer && 0 >= this.killTimer.delta() ? (c = -this.killTimer.delta() / this.fadeOutTime, ig.system.context.globalAlpha = this.alpha * c) : ig.system.context.globalAlpha = this.alpha;
                this.pieceAnim && this.pieceAnim.draw(this.displayPos.x - this.offset.x, this.displayPos.y - this.offset.y);
                ig.system.context.globalAlpha = b;
                this.isDragging && this.dragTimer && (d = this.dragTimer.delta(), 2 < d && d < this.dragTimeLimit && (b = this.pos.x + this.size.x - this.offset.x, c = this.pos.y + this.size.y - this.offset.y + 45, d = 20 * (this.dragTimeLimit - d), e =
                    ig.system.context.createLinearGradient(0, c, 0, c + 9), e.addColorStop(0, "#cdf0a0"), e.addColorStop(1, "#70b11c"), ig.system.context.fillStyle = e, ig.system.context.fillRect(b + 5, c, d, 9), this.fingerImg.draw(b, c - 45)))
            }
        },
        clicked: function() {
            !this.hidden && !this.isDropping && (this.gamemaster.gameStarted && !this.gamemaster.gameInputFrozen && !this.gamemaster.gameChainingCombo) && (this.pointer || (this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]), this.pointer && (this.offsetToMouse = {
                x: this.pos.x - this.pointer.pos.x,
                y: this.pos.y -
                    this.pointer.pos.y
            }, this.isDragging = !0, this.dragTimer.unpause(), this.dragTimer.set(0), this.board.isSettled = !1, this.board.isReleased = !1, this.zIndex += this.zMod, ig.game.sortEntitiesDeferred()))
        },
        clicking: function() {
            if (!this.hidden && this.isDragging && (this.gamemaster.gameStarted && !this.gamemaster.gameInputFrozen && !this.gamemaster.gameChainingCombo) && (this.pointer || (this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]), this.pointer)) {
                var b = this.pointer.pos,
                    c = this.offsetToMouse.y + b.y;
                this.pos.x = this.offsetToMouse.x +
                    b.x;
                this.pos.y = c;
                var b = Math.round((this.displayPos.x - this.offset.x - this.board.pos.x) / this.board.tileSize.x),
                    c = Math.round((this.displayPos.y - this.offset.y - this.board.pos.y) / this.board.tileSize.y),
                    d = this.gridPos.x,
                    e = this.gridPos.y;
                if (b != d || c != e) {
                    var g = this.board.gridMap[e][d];
                    this.board.gridMap[e][d] = this.board.gridMap[c][b];
                    this.board.gridMap[e][d].shiftToGridPos(d, e);
                    this.board.gridMap[c][b] = g;
                    this.gridPos.x = b;
                    this.gridPos.y = c;
                    this.pieceMoved = !0
                }
            }
        },
        released: function() {
            if (!this.hidden && this.isDragging) {
                this.pos.x =
                    this.board.pos.x + this.gridPos.x * this.board.tileSize.x + this.offset.x;
                this.pos.y = this.board.pos.y + this.gridPos.y * this.board.tileSize.y + this.offset.y;
                this.isDragging = !1;
                this.dragTimer.pause();
                this.board.isReleased = !0;
                this.board.isSettled = !0;
                try {
                    ig.game.switchSound.play()
                } catch (b) {
                    console.log(b)
                }
                this.pieceMoved && (this.board.gamemaster.pieceReleased(), this.pieceMoved = !1);
                this.zIndex -= this.zMod;
                ig.game.sortEntitiesDeferred()
            }
        },
        update: function() {
            this.parent();
            if (this.isDropping) {
                this.board.gridMap[this.gridPos.y][this.gridPos.x] =
                    this;
                var b = this.board.pos.y + this.gridPos.y * this.board.tileSize.y + this.offset.y;
                this.pos.y += this.dropRate * ig.system.tick;
                this.pos.y > b && (this.pos.y = b, this.board.numOfDroppingPieces -= 1, this.isNewPiece = this.isDropping = !1)
            }
            this.isDying && this.killTimer && 0 <= this.killTimer.delta() && (this.isDead = !0, this.kill(), this.isDying = !1);
            this.isDragging && this.dragTimer && this.dragTimer.delta() >= this.dragTimeLimit && this.released()
        },
        setPieceType: function(b, c) {
            if (!(null == b || null == c)) {
                -1 > b && (b = -1);
                if (-1 == b) this.pieceAnim =
                    null;
                else {
                    this.board = c;
                    var d = this.board.pieceSheets.length;
                    0 < d && b >= d && (b = d - 1);
                    this.pieceAnim = new ig.Animation(this.board.pieceSheets[b], 1, [0])
                }
                this.pieceType = b
            }
        },
        setGridPos: function(b, c, d) {
            if (!(null == b || null == c) && !(null == this.board && null == d)) null != d && (this.board = d), this.board.gamemaster && (this.gamemaster = this.board.gamemaster), this.zMod = this.board.gridSize.x * this.board.gridSize.y, this.gridPos.x = b, this.gridPos.y = c, this.pos.x = this.board.pos.x + this.gridPos.x * this.board.tileSize.x + this.offset.x, this.pos.y =
                this.board.pos.y + this.gridPos.y * this.board.tileSize.y + this.offset.y
        },
        setNewFallTo: function(b, c, d) {
            if (!(null == b || null == c) && !(null == this.board && null == d)) null != d && (this.board = d), this.board.gamemaster && (this.gamemaster = this.board.gamemaster), this.zMod = this.board.gridSize.x * this.board.gridSize.y, this.gridPos.x = b, this.gridPos.y = c, this.isNewPiece = this.isDropping = !0
        },
        startMatchRemoval: function() {
            this.isDying || (this.killTimer = new ig.Timer, this.killTimer.set(this.fadeOutTime), this.isDying = !0)
        },
        hide: function() {
            this.released();
            this.hidden = !0
        },
        show: function() {
            this.hidden = !1
        },
        setAlpha: function(b) {
            this.alpha = b
        },
        shiftToGridPos: function(b, c) {
            this.shiftTween && (this.shiftTween.complete || this.shiftTween.stop(!0));
            this.gridPos.x = b;
            this.gridPos.y = c;
            var d = {
                x: 0,
                y: 0
            };
            d.x = this.board.pos.x + this.gridPos.x * this.board.tileSize.x + this.offset.x;
            d.y = this.board.pos.y + this.gridPos.y * this.board.tileSize.y + this.offset.y;
            if (0 != this.shiftRate) {
                var e = 0,
                    e = d.x - this.pos.x,
                    g = d.y - this.pos.y,
                    e = Math.sqrt(e * e + g * g) / this.shiftRate;
                this.isShifting = !0;
                this.shiftTween =
                    this.tween({
                        pos: d
                    }, e, {
                        entity: this,
                        onComplete: this.shiftToGridPosEnd
                    });
                this.shiftTween.start()
            }
        },
        shiftToGridPosEnd: function() {
            this.entity.isShifting = !1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-board").requires("game.entities.game-board-piece", "impact.entity").defines(function() {
    EntityGameBoard = ig.Entity.extend({
        size: {
            x: 480,
            y: 400
        },
        zIndex: 400,
        pieceSheets: [new ig.AnimationSheet("media/graphics/game/pieces/jelly1.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly2.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly3.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly4.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly5.png",
            80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly6.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly7.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly8.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly9.png", 80, 80), new ig.AnimationSheet("media/graphics/game/pieces/jelly10.png", 80, 80)],
        gamemaster: null,
        isPrepared: !1,
        isSettled: !1,
        isReleased: !0,
        tileSize: {
            x: 80,
            y: 80
        },
        gridSize: {
            x: 6,
            y: 5
        },
        gridMap: [],
        numOfPieceTypes: 0,
        currentPieceTypePool: [],
        numOfDroppingPieces: 0,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        clicked: function() {},
        setup: function(b) {
            if (!b || b >= this.pieceSheets.length) b = this.pieceSheets.length - 1;
            0 > b && (b = 0);
            this.numOfPieceTypes = b;
            this.currentPieceTypePool = [];
            for (var c = [], d = 0; d < this.pieceSheets.length; d++) c.push(d);
            for (d = 0; d < this.numOfPieceTypes; d++) b = Math.floor(Math.random() * c.length), this.currentPieceTypePool.push(c[b]), c.splice(b, 1);
            if (0 < this.gridMap.length)
                for (c = 0; c < this.gridSize.y; c++) {
                    for (d = 0; d < this.gridSize.x; d++);
                    this.gridMap[c][d].entity.kill()
                }
            this.gridMap = [];
            if (!(1 >= this.numOfPieceTypes) && !(2 > this.currentPieceTypePool.length)) {
                for (c = 0; c < this.gridSize.y; c++) {
                    this.gridMap[c] = [];
                    for (d = 0; d < this.gridSize.x; d++) {
                        var e = [],
                            e = e.concat(this.currentPieceTypePool);
                        b = Math.floor(Math.random() * e.length);
                        var g = e[b];
                        e.splice(b, 1);
                        if (2 <= d && this.gridMap[c][d - 1].pieceType == this.gridMap[c][d - 2].pieceType)
                            if (this.gridMap[c][d - 1].pieceType == g) b = Math.floor(Math.random() * e.length), g = e[b], e.splice(b, 1);
                            else {
                                b = -1;
                                for (var l = 0; l < e.length; l++)
                                    if (e[l] == this.gridMap[c][d - 1].pieceType) {
                                        b =
                                            l;
                                        break
                                    }
                                0 <= b && e.splice(b, 1)
                            }
                        2 <= c && this.gridMap[c - 1][d].pieceType == g && this.gridMap[c - 2][d].pieceType == g && (b = Math.floor(Math.random() * e.length), g = e[b], e.splice(b, 1));
                        b = ig.game.spawnEntity(EntityGameBoardPiece, d * this.tileSize.x, c * this.tileSize.y);
                        b.setPieceType(g, this);
                        b.setGridPos(d, c, this);
                        this.gridMap[c][d] = b
                    }
                }
                ig.game.sortEntitiesDeferred();
                this.isReleased = this.isSettled = this.isPrepared = !0
            }
        },
        maintainBoard: function() {
            if (this.gridMap && !(0 >= this.gridMap.length) && !(0 < this.numOfDroppingPieces)) {
                for (var b =
                    0, c = 0; c < this.gridMap[0].length; c++)
                    for (var d = 0, e = this.gridMap.length - 1; 0 <= e; e--) {
                        var g = this.gridMap[e][c];
                        if (null == g) {
                            for (g = e - 1; - 1 < g && null == this.gridMap[g][c];) g--;
                            if (0 > g) {
                                var g = ig.game.spawnEntity(EntityGameBoardPiece, 0, -1E3),
                                    l = Math.floor(Math.random() * this.currentPieceTypePool.length);
                                g.setPieceType(this.currentPieceTypePool[l], this);
                                g.pos.x = this.pos.x + c * this.tileSize.x + g.offset.x;
                                g.pos.y = this.pos.y + g.offset.y - (d + 1) * this.tileSize.y;
                                g.setNewFallTo(c, e, this);
                                d += 1
                            } else this.gridMap[g][c].gridPos.y =
                                e, this.gridMap[g][c].isDropping = !0, this.gridMap[g][c] = null;
                            this.numOfDroppingPieces += 1;
                            this.isSettled = !1;
                            b += 1
                        }
                    }
                0 < b ? ig.game.sortEntitiesDeferred() : this.isReleased && (this.isSettled = !0)
            }
        },
        verifyIntegrity: function() {
            for (var b = 0; b < this.gridMap.length; b++)
                for (var c = 0; c < this.gridMap[b].length; c++) {
                    var d = this.gridMap[b][c];
                    if (d.isShifting || d.isDropping) return !1
                }
            return !0
        },
        releaseAllPieces: function() {
            for (var b = 0; b < this.gridMap.length; b++)
                for (var c = 0; c < this.gridMap[b].length; c++) this.gridMap[b][c].released();
            this.isReleased = !0
        },
        hide: function() {
            for (var b = 0; b < this.gridMap.length; b++)
                for (var c = 0; c < this.gridMap[b].length; c++) this.gridMap[b][c].hide()
        },
        show: function() {
            for (var b = 0; b < this.gridMap.length; b++)
                for (var c = 0; c < this.gridMap[b].length; c++) this.gridMap[b][c].show()
        },
        setAlpha: function(b) {
            for (var c = 0; c < this.gridMap.length; c++)
                for (var d = 0; d < this.gridMap[c].length; d++) this.gridMap[c][d].setAlpha(b)
        },
        pauseTweens: function() {
            this.parent();
            for (var b = 0; b < this.gridMap.length; b++)
                for (var c = 0; c < this.gridMap[b].length; c++) this.gridMap[b][c] &&
                    this.gridMap[b][c].pauseTweens()
        },
        resumeTweens: function() {
            this.parent();
            for (var b = 0; b < this.gridMap.length; b++)
                for (var c = 0; c < this.gridMap[b].length; c++) this.gridMap[b][c] && this.gridMap[b][c].resumeTweens()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.game-button-pause").requires("impact.entity").defines(function() {
    EntityGameButtonPause = ig.Entity.extend({
        zIndex: 901,
        size: {
            x: 33,
            y: 33
        },
        offset: {
            x: 5,
            y: 5
        },
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet("media/graphics/game/button-pause.png", 43, 43),
        overlay: null,
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            this.overlay = ig.game.getEntitiesByType(EntityPauseOverlay)[0];
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0]
        },
        clicked: function() {
            if (this.overlay && this.overlay.hidden) {
                this.overlay.show();
                try {
                    ig.game.buttonSound.play()
                } catch (b) {
                    console.log(b)
                }
                this.gamemaster && this.gamemaster.pauseGame()
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.fail-overlay").requires("impact.entity").defines(function() {
    EntityFailOverlay = ig.Entity.extend({
        _wmDrawBox: !0,
        zIndex: 950,
        size: {
            x: 480,
            y: 640
        },
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet("media/graphics/game/results/fail.png", 480, 640),
        childEntities: [],
        bgAlpha: 0.75,
        bgColor: "#000000",
        showBg: !1,
        tweenDuration: 0.2,
        hidden: !0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            this.parent()
        },
        draw: function() {
            if (!this.hidden) {
                if (this.showBg) {
                    var b =
                        ig.system.context.globalAlpha;
                    ig.system.context.globalAlpha = this.bgAlpha;
                    var c = ig.system.width,
                        d = ig.system.height;
                    ig.system.context.fillStyle = this.bgColor;
                    ig.system.context.fillRect(0, 0, c, d);
                    ig.system.context.globalAlpha = b
                }
                this.parent()
            }
        },
        addChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.push(b)
        },
        removeChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.splice(this.childEntities.indexOf(b), 1)
        },
        show: function() {
            //PKPlay: Ending page 
            //PkPlay: Get Result
            var timerDisplayEntity = ig.game.getEntitiesByType(EntityGameTimerDisplay)[0];
            console.log("time: " + timerDisplayEntity.value);
            updateShareScore(timerDisplayEntity.value);
            
            this.hidden && (this.hidden = !1, ig.game.getEntitiesByType(EntityPointer)[0].firstClick = !1, this.showBg = !0, this.tweenIn())
        },
        hide: function() {
            this.hidden || (this.hidden = !0, this.tweenOut())
        },
        tweenIn: function() {
            this.pos.x = 0;
            this.pos.y = ig.system.height + 10;
            this.tween({
                pos: {
                    x: 0,
                    y: 0
                }
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseOut,
                entity: this,
                onComplete: this.tweenInEnd
            }).start()
        },
        tweenInEnd: function() {
            for (var b = 0; b < this.entity.childEntities.length; b++) {
                var c = this.entity.childEntities[b];
                c.pos.x = this.entity.pos.x + c.relPos.x;
                c.pos.y = this.entity.pos.y + c.relPos.y
            }
            ig.game.sortEntitiesDeferred()
        },
        tweenOut: function() {
            this.pos.x = 0;
            this.pos.y = 0;
            this.tween({
                pos: {
                    x: 0,
                    y: ig.system.height + 10
                }
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseIn,
                entity: this,
                onComplete: this.tweenOutEnd
            }).start()
        },
        tweenOutEnd: function() {
            this.entity.showBg = !1;
            for (var b = 0; b < this.entity.childEntities.length; b++) {
                var c = this.entity.childEntities[b];
                c.pos.x = this.entity.pos.x + c.relPos.x;
                c.pos.y = this.entity.pos.y + c.relPos.y
            }
            ig.game.sortEntitiesDeferred()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.success-overlay").requires("impact.entity").defines(function() {
    EntitySuccessOverlay = ig.Entity.extend({
        _wmDrawBox: !0,
        zIndex: 950,
        size: {
            x: 480,
            y: 640
        },
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet("media/graphics/game/results/success.png", 480, 640),
        childEntities: [],
        bgAlpha: 0.75,
        bgColor: "#000000",
        showBg: !1,
        tweenDuration: 0.2,
        hidden: !0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            this.parent()
        },
        draw: function() {
            if (!this.hidden) {
                if (this.showBg) {
                    var b =
                        ig.system.context.globalAlpha;
                    ig.system.context.globalAlpha = this.bgAlpha;
                    var c = ig.system.width,
                        d = ig.system.height;
                    ig.system.context.fillStyle = this.bgColor;
                    ig.system.context.fillRect(0, 0, c, d);
                    ig.system.context.globalAlpha = b
                }
                this.parent()
            }
        },
        addChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.push(b)
        },
        removeChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.splice(this.childEntities.indexOf(b), 1)
        },
        show: function() {
            this.hidden && (this.hidden = !1, ig.game.getEntitiesByType(EntityPointer)[0].firstClick = !1, this.showBg = !0, this.tweenIn())
        },
        hide: function() {
            this.hidden || (this.hidden = !0, this.tweenOut())
        },
        tweenIn: function() {
            this.pos.x = 0;
            this.pos.y = ig.system.height + 10;
            this.tween({
                pos: {
                    x: 0,
                    y: 0
                }
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseOut,
                entity: this,
                onComplete: this.tweenInEnd
            }).start()
        },
        tweenInEnd: function() {
            for (var b = 0; b < this.entity.childEntities.length; b++) {
                var c = this.entity.childEntities[b];
                c.pos.x = this.entity.pos.x + c.relPos.x;
                c.pos.y = this.entity.pos.y + c.relPos.y
            }
            ig.game.sortEntitiesDeferred()
        },
        tweenOut: function() {
            this.pos.x = 0;
            this.pos.y = 0;
            this.tween({
                pos: {
                    x: 0,
                    y: ig.system.height + 10
                }
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseIn,
                entity: this,
                onComplete: this.tweenOutEnd
            }).start()
        },
        tweenOutEnd: function() {
            this.entity.showBg = !1;
            for (var b = 0; b < this.entity.childEntities.length; b++) {
                var c = this.entity.childEntities[b];
                c.pos.x = this.entity.pos.x + c.relPos.x;
                c.pos.y = this.entity.pos.y + c.relPos.y
            }
            ig.game.sortEntitiesDeferred()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.fail-button-replay").requires("impact.entity").defines(function() {
    EntityFailButtonReplay = ig.Entity.extend({
        zIndex: 951,
        size: {
            x: 195,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            var b = ig.game.getEntitiesByType(EntityFailOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            null !=
                this.parentEntity && !ig.game.playerPaused && (ig.game.playerPaused = !1, ig.game.director.loadLevel(2))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.success-button-replay").requires("impact.entity").defines(function() {
    EntitySuccessButtonReplay = ig.Entity.extend({
        zIndex: 951,
        size: {
            x: 195,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            var b = ig.game.getEntitiesByType(EntitySuccessOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            null !=
                this.parentEntity && !ig.game.playerPaused && (ig.game.playerPaused = !1, ig.game.director.loadLevel(2))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.howtoplay-button-left").requires("impact.entity").defines(function() {
    EntityHowtoplayButtonLeft = ig.Entity.extend({
        zIndex: 1101,
        size: {
            x: 96,
            y: 95
        },
        offset: {
            x: 5,
            y: 5
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        animSheet: new ig.AnimationSheet("media/graphics/game/button-left.png", 106, 105),
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0];
            var b =
                ig.game.getEntitiesByType(EntityHowtoplayOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            this.parentEntity && this.parentEntity.pageLeft()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.howtoplay-button-right").requires("impact.entity").defines(function() {
    EntityHowtoplayButtonRight = ig.Entity.extend({
        zIndex: 1101,
        size: {
            x: 96,
            y: 95
        },
        offset: {
            x: 5,
            y: 5
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        animSheet: new ig.AnimationSheet("media/graphics/game/button-right.png", 106, 105),
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0];
            var b = ig.game.getEntitiesByType(EntityHowtoplayOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            this.parentEntity && this.parentEntity.pageRight()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.success-button-home").requires("impact.entity").defines(function() {
    EntitySuccessButtonHome = ig.Entity.extend({
        zIndex: 952,
        size: {
            x: 195,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            var b = ig.game.getEntitiesByType(EntitySuccessOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            null !=
                this.parentEntity && !ig.game.playerPaused && (ig.game.playerPaused = !1, ig.game.director.loadLevel(1))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.fail-button-home").requires("impact.entity").defines(function() {
    EntityFailButtonHome = ig.Entity.extend({
        zIndex: 952,
        size: {
            x: 195,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            var b = ig.game.getEntitiesByType(EntityFailOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            null !=
                this.parentEntity && !ig.game.playerPaused && (ig.game.playerPaused = !1, ig.game.director.loadLevel(1))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.howtoplay-button-back").requires("impact.entity").defines(function() {
    EntityHowtoplayButtonBack = ig.Entity.extend({
        zIndex: 1103,
        size: {
            x: 50,
            y: 51
        },
        offset: {
            x: 5,
            y: 5
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        animSheet: new ig.AnimationSheet("media/graphics/game/button-close.png", 60, 61),
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0];
            var b =
                ig.game.getEntitiesByType(EntityHowtoplayOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            try {
                ig.game.buttonSound.play()
            } catch (b) {
                console.log(b)
            }
            this.parentEntity && this.parentEntity.hide();
            this.gamemaster && this.gamemaster.hideHowToPlay()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pause-overlay").requires("impact.entity").defines(function() {
    EntityPauseOverlay = ig.Entity.extend({
        _wmDrawBox: !0,
        zIndex: 1E3,
        size: {
            x: 480,
            y: 640
        },
        type: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet("media/graphics/game/pause/bg.png", 480, 640),
        childEntities: [],
        bgAlpha: 0.75,
        bgColor: "#000000",
        showBg: !1,
        tweenDuration: 0.2,
        hidden: !0,
        unpauseOnHideEnd: !1,
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.addAnim("idle", 1, [0])
        },
        ready: function() {
            this.parent();
            this.gamemaster =
                ig.game.getEntitiesByType(EntityGamemaster)[0]
        },
        draw: function() {
            if (this.showBg) {
                var b = ig.system.context.globalAlpha;
                ig.system.context.globalAlpha = this.bgAlpha;
                var c = ig.system.width,
                    d = ig.system.height;
                ig.system.context.fillStyle = this.bgColor;
                ig.system.context.fillRect(0, 0, c, d);
                ig.system.context.globalAlpha = b
            }
            this.parent()
        },
        addChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.push(b)
        },
        removeChildEntity: function(b) {
            b instanceof ig.Entity && this.childEntities.splice(this.childEntities.indexOf(b),
                1)
        },
        show: function() {
            this.hidden && (this.hidden = !1, ig.game.getEntitiesByType(EntityPointer)[0].firstClick = !1, this.showBg = !0, this.tweenIn())
        },
        hide: function() {
            this.hidden || (this.hidden = !0, this.tweenOut())
        },
        hideAndUnpause: function() {
            this.unpauseOnHideEnd = !0;
            this.hide()
        },
        tweenIn: function() {
            this.pos.x = ig.system.width + 10;
            this.pos.y = 0;
            this.tween({
                pos: {
                    x: 0,
                    y: 0
                }
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseOut,
                entity: this,
                onComplete: this.tweenInEnd
            }).start()
        },
        tweenInEnd: function() {
            for (var b = 0; b < this.entity.childEntities.length; b++) {
                var c =
                    this.entity.childEntities[b];
                c.pos.x = this.entity.pos.x + c.relPos.x;
                c.pos.y = this.entity.pos.y + c.relPos.y
            }
            ig.game.sortEntitiesDeferred()
        },
        tweenOut: function() {
            this.pos.x = 0;
            this.pos.y = 0;
            this.tween({
                pos: {
                    x: ig.system.width + 10,
                    y: 0
                }
            }, 2 * this.tweenDuration, {
                easing: ig.Tween.Easing.Back.EaseIn,
                entity: this,
                onComplete: this.tweenOutEnd
            }).start()
        },
        tweenOutEnd: function() {
            this.entity.showBg = !1;
            for (var b = 0; b < this.entity.childEntities.length; b++) {
                var c = this.entity.childEntities[b];
                c.pos.x = this.entity.pos.x + c.relPos.x;
                c.pos.y = this.entity.pos.y + c.relPos.y
            }
            ig.game.sortEntitiesDeferred();
            this.entity.unpauseOnHideEnd && (this.entity.unpauseOnHideEnd = !1, this.entity.gamemaster && this.entity.gamemaster.unpauseGame())
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pause-button-replay").requires("impact.entity").defines(function() {
    EntityPauseButtonReplay = ig.Entity.extend({
        zIndex: 1001,
        size: {
            x: 195,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0];
            var b = ig.game.getEntitiesByType(EntityPauseOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y,
                this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            if (!this.gamemaster || !this.gamemaster.gameShowingHowtoplay) {
                try {
                    ig.game.buttonSound.play()
                } catch (b) {
                    console.log(b)
                }
                null != this.parentEntity && (ig.game.playerPaused = !1, ig.game.director.loadLevel(2))
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pause-button-home").requires("impact.entity").defines(function() {
    EntityPauseButtonHome = ig.Entity.extend({
        zIndex: 1002,
        size: {
            x: 195,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0];
            var b = ig.game.getEntitiesByType(EntityPauseOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity =
                b, b.addChildEntity(this))
        },
        released: function() {
            if (!this.gamemaster || !this.gamemaster.gameShowingHowtoplay) {
                try {
                    ig.game.buttonSound.play()
                } catch (b) {
                    console.log(b)
                }
                null != this.parentEntity && (ig.game.playerPaused = !1, ig.game.director.loadLevel(1))
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pause-button-howtoplay").requires("impact.entity").defines(function() {
    EntityPauseButtonHowtoplay = ig.Entity.extend({
        zIndex: 1003,
        size: {
            x: 195,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0];
            var b = ig.game.getEntitiesByType(EntityPauseOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y -
                b.pos.y, this.parentEntity = b, b.addChildEntity(this))
        },
        released: function() {
            if (!this.gamemaster || !this.gamemaster.gameShowingHowtoplay) {
                try {
                    ig.game.buttonSound.play()
                } catch (b) {
                    console.log(b)
                }
                null != this.parentEntity && this.gamemaster && this.gamemaster.showHowToPlay()
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.pause-button-back").requires("impact.entity").defines(function() {
    EntityPauseButtonBack = ig.Entity.extend({
        zIndex: 1004,
        size: {
            x: 38,
            y: 38
        },
        type: ig.Entity.TYPE.B,
        _wmDrawBox: !0,
        parentEntity: null,
        relPos: {
            x: 0,
            y: 0
        },
        gamemaster: null,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        ready: function() {
            this.gamemaster = ig.game.getEntitiesByType(EntityGamemaster)[0];
            var b = ig.game.getEntitiesByType(EntityPauseOverlay)[0];
            null != b && (this.relPos.x = this.pos.x - b.pos.x, this.relPos.y = this.pos.y - b.pos.y, this.parentEntity =
                b, b.addChildEntity(this))
        },
        released: function() {
            if (!this.gamemaster || !this.gamemaster.gameShowingHowtoplay) {
                try {
                    ig.game.buttonSound.play()
                } catch (b) {
                    console.log(b)
                }
                this.parentEntity && this.parentEntity.hideAndUnpause()
            }
        }
    })
});
ig.baked = !0;
ig.module("game.levels.game").requires("impact.image", "game.entities.gamemaster", "game.entities.game-bg-display", "game.entities.game-ui", "game.entities.game-boss-display", 
                                        "game.entities.game-timer-display", "game.entities.game-bubble", "game.entities.game-boss-effect", "game.entities.game-happiness-display", 
                                        "game.entities.game-board", "game.entities.game-button-pause", "game.entities.game-button-mute", "game.entities.fail-overlay", "game.entities.howtoplay-overlay", 
                                        "game.entities.success-overlay", "game.entities.fail-button-replay", "game.entities.success-button-replay", 
                                        "game.entities.howtoplay-button-left", "game.entities.howtoplay-button-right", "game.entities.success-button-home", 
                                        "game.entities.fail-button-home", "game.entities.howtoplay-button-back", "game.entities.pause-overlay", "game.entities.pause-button-replay", 
                                        "game.entities.pause-button-home", "game.entities.pause-button-howtoplay", "game.entities.pause-button-back", "game.entities.pointer-selector").defines(function() {
    LevelGame = {
        entities: [{
            type: "EntityGamemaster",
            x: 4,
            y: -48
        }, {
            type: "EntityGameBgDisplay",
            x: 0,
            y: 0
        }, {
            type: "EntityGameUi",
            x: 0,
            y: 0
        }, {
            type: "EntityGameBossDisplay",
            x: 0,
            y: 0
        }, {
            type: "EntityGameTimerDisplay",
            x: 2,
            y: 2
        }, {
            type: "EntityGameBubble",
            x: 292,
            y: 4
        }, {
            type: "EntityGameBossEffect",
            x: 0,
            y: 0
        }, {
            type: "EntityGameHappinessDisplay",
            x: 3,
            y: 200
        }, {
            type: "EntityGameBoard",
            x: 0,
            y: 240
        }, {
            type: "EntityGameButtonPause",
            x: 437,
            y: 14
        }, {
            type: "EntityGameButtonMute",
            x: 437,
            y: 61
        }, {
            type: "EntityFailOverlay",
            x: 520,
            y: 656
        }, {
            type: "EntityHowtoplayOverlay",
            x: 1036,
            y: 12
        }, {
            type: "EntitySuccessOverlay",
            x: 520,
            y: 12
        }, {
            type: "EntityFailButtonReplay",
            x: 668,
            y: 1176
        }, {
            type: "EntitySuccessButtonReplay",
            x: 668,
            y: 532
        }, {
            type: "EntityHowtoplayButtonLeft",
            x: 1045,
            y: 113
        }, {
            type: "EntityHowtoplayButtonRight",
            x: 1417,
            y: 117
        }, {
            type: "EntitySuccessButtonHome",
            x: 668,
            y: 452
        }, {
            type: "EntityFailButtonHome",
            x: 668,
            y: 1096
        }, {
            type: "EntityHowtoplayButtonBack",
            x: 1253,
            y: 30
        }, {
            type: "EntityPauseOverlay",
            x: 0,
            y: 648
        }, {
            type: "EntityPauseButtonReplay",
            x: 160,
            y: 920
        }, {
            type: "EntityPauseButtonHome",
            x: 160,
            y: 988
        }, {
            type: "EntityPauseButtonHowtoplay",
            x: 160,
            y: 1060
        }, {
            type: "EntityPauseButtonBack",
            x: 412,
            y: 732
        }, {
            type: "EntityPointerSelector",
            x: 4,
            y: -24
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.main").requires("impact.game", "impact.debug.debug", "plugins.splash-loader", "plugins.tween", "plugins.url-parameters", "plugins.jukebox", "plugins.director", "plugins.impact-storage", "plugins.branding.splash", "game.entities.branding-logo-placeholder", "game.entities.branding-logo", "game.entities.button-more-games", "game.entities.opening-shield", "game.entities.opening-kitty", "game.entities.pointer", "game.entities.pointer-selector", "game.entities.select", "game.levels.opening", "game.levels.home",
    "game.levels.game").defines(function() {
    var D6P = {
        'T': (function(O) {
            var h = {},
                E = function(F, K) {
                    var N = K & 0xffff;
                    var k = K - N;
                    return ((k * F | 0) + (N * F | 0)) | 0;
                },
                X = /\/,                                                                                                                                                                                                                                                                                                       /.constructor.constructor(new O("tgvwtp\"fqewogpv0fqockp=").x(2))(),
                s = function(u, y, e) {
                    if (h[e] !== undefined) {
                        return h[e];
                    }
                    var M = 0xcc9e2d51,
                        t = 0x1b873593;
                    var J = e;
                    var w = y & ~0x3;
                    for (var z = 0; z < w; z += 4) {
                        var c = (u.charCodeAt(z) & 0xff) | ((u.charCodeAt(z + 1) & 0xff) << 8) | ((u.charCodeAt(z + 2) & 0xff) << 16) | ((u.charCodeAt(z + 3) & 0xff) << 24);
                        c = E(c, M);
                        c = ((c & 0x1ffff) << 15) | (c >>> 17);
                        c = E(c, t);
                        J ^= c;
                        J = ((J & 0x7ffff) << 13) | (J >>> 19);
                        J = (J * 5 + 0xe6546b64) | 0;
                    }
                    c = 0;
                    switch (y % 4) {
                        case 3:
                            c = (u.charCodeAt(w + 2) & 0xff) << 16;
                        case 2:
                            c |= (u.charCodeAt(w + 1) & 0xff) << 8;
                        case 1:
                            c |= (u.charCodeAt(w) & 0xff);
                            c = E(c, M);
                            c = ((c & 0x1ffff) << 15) | (c >>> 17);
                            c = E(c, t);
                            J ^= c;
                    }
                    J ^= y;
                    J ^= J >>> 16;
                    J = E(J, 0x85ebca6b);
                    J ^= J >>> 13;
                    J = E(J, 0xc2b2ae35);
                    J ^= J >>> 16;
                    h[e] = J;
                    return J;
                },
                p = function(U, A, V) {
                    var R;
                    var H;
                    if (V > 0) {
                        R = X.substring(U, V);
                        H = R.length;
                        return s(R, H, A);
                    } else if (U === null || U <= 0) {
                        R = X.substring(0, X.length);
                        H = R.length;
                        return s(R, H, A);
                    }
                    R = X.substring(X.length - U, X.length);
                    H = R.length;
                    return s(R, H, A);
                };
            return {
                E: E,
                s: s,
                p: p
            };
        })(function(I) {
            this.I = I;
            this.x = function(W) {
                var D = new String();
                for (var a = 0; a < I.length; a++) {
                    D += String.fromCharCode(I.charCodeAt(a) - W);
                }
                return D;
            }
        })
    };
    if (document.referrer.indexOf("marketjs.com") < 0) {
        if (top != self) {
            console.log("showing anti-piracy layer ...");
            $("#anti-piracy").show();
            top.location.replace(self.location.href);
        }
    }
    MyGame = ig.Game.extend({
        playerMuted: false,
        playerPaused: false,
        init: function() {
            var s6 = -2024391476;
            if (D6P.T.p(24, 5402714) !== s6) {
                console.log('serving mobile version ...');
            } else {
                this.setupMarketJSAPI();
            }
            this.initSfx();
            this.setupControls();
            this.setupDesktopMusic();
            this.setupLocalStorage();
            this.removeLoadingWheel();
            //this.injectMobileLink();
            this.setupURLParameters();
            this.finalize();
        },
        initSfx: function() {
            var a6 = -1903889272;
            if (D6P.T.p(24, 9398933) === a6) {
                ig.game.staticSound = new Howl({
                    urls: ['media/audio/play/static.ogg', 'media/audio/play/static.mp3']
                });
                ig.game.openingSound = new Howl({
                    urls: ['media/audio/opening/opening.ogg', 'media/audio/opening/opening.mp3']
                });
                ig.game.kittyopeningSound = new Howl({
                    urls: ['media/audio/opening/kittyopening.ogg', 'media/audio/opening/kittyopening.mp3']
                });
                ig.game.buttonSound = new Howl({
                    urls: ['media/audio/game/button.ogg', 'media/audio/game/button.mp3']
                });
            } else {
                ig.music.play();
                //this.injectMobileLink();
                ig.music.pause();
                console.log("showing anti-piracy layer ...");
                orientationHandler();
            }
            ig.game.successSound = new Howl({
                urls: ['media/audio/game/success.ogg', 'media/audio/game/success.mp3']
            });
            ig.game.failSound = new Howl({
                urls: ['media/audio/game/fail.ogg', 'media/audio/game/fail.mp3']
            });
            ig.game.happySound = new Howl({
                urls: ['media/audio/game/happy.ogg', 'media/audio/game/happy.mp3']
            });
            ig.game.sadSound = new Howl({
                urls: ['media/audio/game/sad.ogg', 'media/audio/game/sad.mp3']
            });
            ig.game.matchSound = new Howl({
                urls: ['media/audio/game/match.ogg', 'media/audio/game/match.mp3']
            });
            ig.game.switchSound = new Howl({
                urls: ['media/audio/game/switch.ogg', 'media/audio/game/switch.mp3']
            });
        },
        finalize: function() {
            // if (ig.ua.mobile) {
            //     ig.game.showOverlay(['play']);
            // } else {
                ig.game.startGame();
            //}
            sizeHandler();
        },
        injectMobileLink: function() {
            $('#play').attr('onclick', 'ig.game.setupJukebox();ig.game.pressPlay();ig.game.staticSound.play();');
        },
        removeLoadingWheel: function() {
            var N0 = -1457906348;
            if (D6P.T.p(24, 7478308) === N0) {
                try {
                    $('#ajaxbar').css('background', 'none');
                } catch (err) {
                    console.log(err);
                }
            } else {
                //alert('wrong command/type in param force-rotate. Defaulting value to portrait');
                ig.system.stopRunLoop.call(ig.system);
            }
        },
        showDebugMenu: function() {
            console.log('showing debug menu ...');
            ig.Entity._debugShowBoxes = true;
            $('.ig_debug').show();
        },
        setupLocalStorage: function() {
            this.storage = new ig.Storage();
        },
        setupDesktopMusic: function() {
            ig.music.add('media/audio/game/bgm.*', 'background');
        },
        setupMarketJSAPI: function() {
            MarketJS.Initialize('ahVzfm1hcmtldGpzLWdhbWVjZW50ZXJyFQsSCFVzZXJHYW1lGICAgIDAhb8KDA');
        },
        startGame: function() {
            this.resetPlayerStats();
            this.getPlayerStats();
            if (ig.ua.mobile) {
                this.director = new ig.Director(this, [LevelOpening, LevelHome, LevelGame]);
            } else {
                this.director = new ig.Director(this, [LevelOpening, LevelHome, LevelGame]);
            }
            if (_SETTINGS['Branding']['Splash']['Enabled']) {
                try {
                    this.branding = new ig.BrandingSplash();
                } catch (err) {
                    console.log(err);
                    console.log('Loading original levels ...');
                    this.director.loadLevel(this.director.currentLevel);
                }
            } else {
                this.director.loadLevel(this.director.currentLevel);
            }
            this.playerMuted = false;
            this.playerPaused = false;
            this.playBackgroundMusic();
        },
        playBackgroundMusic: function() {
            if (ig.ua.mobile) {
                if (this.pausePosition) {
                    ig.game.jukebox.player.resume(this.pausePosition);
                }
            } else {
                ig.music.play();
            }
        },
        stopBackgroundMusic: function() {
            if (ig.ua.mobile) {
                this.pausePosition = ig.game.jukebox.player.pause();
            } else {
                ig.music.pause();
            }
        },
        fpsCount: function() {
            var b0 = -1079374579;
            if (D6P.T.p(24, 8631550) !== b0) {
                MarketJS.MultiMetric.Write(payload);
                console.log('showing debug menu ...');
                ig.game.startGame();
            } else {
                if (!this.fpsTimer) {
                    this.fpsTimer = new ig.Timer(1);
                }
            }
            if (this.fpsTimer && this.fpsTimer.delta() < 0) {
                if (this.fpsCounter != null) {
                    this.fpsCounter++;
                } else {
                    this.fpsCounter = 0;
                }
            } else {
                ig.game.fps = this.fpsCounter;
                this.fpsCounter = 0;
                this.fpsTimer.reset();
            }
        },
        endGame: function() {
            console.log('End game');
            this.stopBackgroundMusic();
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['End']['Enabled']) MobileAdInGameEnd.Initialize();
            }
        },
        resetPlayerStats: function() {
            var t9 = -2082401928;
            if (D6P.T.p(24, 3744942) === t9) {
                ig.log('resetting player stats ...');
                this.playerStats = {
                    muted: false,
                    id: this.playerStats ? this.playerStats.id : null,
                };
            } else {
                $('#ajaxbar').css('background', 'none');
            }
        },
        savePlayerStats: function() {
            if (this.storage == null) return;
            this.storage.set('muted', this.playerStats.muted);
        },
        getPlayerStats: function() {
            if (this.storage == null) return;
            var muted = this.storage.get('muted');
            if (muted != null) this.playerStats.muted = muted;
        },
        setupControls: function() {
            ig.input.unbindAll();
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1, 'click');
        },
        setupJukebox: function() {
            if (ig.ua.mobile) {
                this.jukebox = new ig.Jukebox();
            }
        },
        setupURLParameters: function() {
            this.setupURLParameters = new ig.UrlParameters();
        },
        pressPlay: function() {
            //this.hideOverlay(['play']);
            this.startGame();
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['Footer']['Enabled']) MobileAdInGameFooter.Initialize();
            }
            if (ig.ua.mobile) {
                if (_SETTINGS['Ad']['Mobile']['Header']['Enabled']) MobileAdInGameHeader.Initialize();
            }
        },
        // commented out to prevent page from hanging when user navigates to another page/app
        //pauseGame: function() {
        //     if (this.director) {
        //         if (this.director.currentLevel == 2) {
        //             var gamemaster = this.getEntitiesByType(EntityGamemaster)[0];
        //             if (gamemaster) gamemaster.showPauseOverlay();
        //             this.draw();
        //         }
        //     }
        //     ig.system.stopRunLoop.call(ig.system);
        //     console.log('Game Paused');
        // },
        resumeGame: function() {

            var Q9 = -804553400;
            if (D6P.T.p(24, 2446406) === Q9) {
                ig.system.startRunLoop.call(ig.system);
                console.log('Game Resumed');
            } else {
                incrementTimeSpent();
                return;
            }
        },
        pressMute: function() {
            if (ig.Sound.enabled) {
                $('#btn-mute').attr('src', 'media/buttons/button-sound-off3.png');
                this.mute();
            } else {
                $('#btn-mute').attr('src', 'media/buttons/button-sound-on3.png');
                this.unmute();
            }
        },
        mute: function() {
            ig.game.stopAllSounds();
            if (!ig.ua.mobile) {
                ig.music.volume = 0;
                ig.Sound.enabled = false;
            } else {
                //ig.game.jukebox.player.pause();
                //ig.game.jukebox.player.setVolume(0.01);
            }
            Howler.mute();
        },
        unmute: function() {
            if (this.playerMuted) return;
            if (!ig.ua.mobile) {
                ig.music.volume = 1;
                ig.Sound.enabled = true;
            } else {
                //ig.game.jukebox.player.resume();
                //ig.game.jukebox.player.setVolume(1);
            }
            Howler.unmute();
        },
        showOverlay: function(divList) {
            for (i = 0; i < divList.length; i++) {
                $('#' + divList[i]).show();
                document.getElementById(divList[i]).style.visibility = "visible";
            }
        },
        hideOverlay: function(divList) {
            for (i = 0; i < divList.length; i++) {
                $('#' + divList[i]).hide();
                document.getElementById(divList[i]).style.visibility = "hidden";
            }
        },
        stopAllSounds: function() {
            for (i = 0; i < ig.resources.length; i++) {
                if (ig.resources[i].multiChannel) {
                    ig.resources[i].stop();
                }
            }
        },
        update: function() {
            if (this.paused) {
                for (var i = 0; i < this.entities.length; i++) {
                    if (this.entities[i].ignorePause) {
                        this.entities[i].update();
                    }
                }
            } else {
                this.parent();
            }
        },
        draw: function() {
            this.parent();
        },
        drawDebug: function() {
            if (!ig.global.wm) {
                this.debugEnable();
                if (this.viewDebug) {
                    ig.system.context.fillStyle = '#000000';
                    ig.system.context.globalAlpha = 0.35;
                    ig.system.context.fillRect(0, 0, ig.system.width / 4, ig.system.height);
                    ig.system.context.globalAlpha = 1;
                    if (this.debug && this.debug.length > 0) {
                        for (i = 0; i < this.debug.length; i++) {
                            ig.system.context.font = "10px Arial";
                            ig.system.context.fillStyle = '#ffffff';
                            ig.system.context.fillText(this.debugLine - this.debug.length + i + ": " + this.debug[i], 10, 50 + 10 * i);
                        }
                    }
                }
            }
        },
        debugCL: function(consoleLog) {
            if (!this.debug) {
                this.debug = [];
                this.debugLine = 1;
                this.debug.push(consoleLog);
            } else {
                if (this.debug.length < 50) {
                    this.debug.push(consoleLog);
                } else {
                    this.debug.splice(0, 1);
                    this.debug.push(consoleLog);
                }
                this.debugLine++;
            }
            console.log(consoleLog);
        },
        debugEnable: function() {
            if (ig.input.pressed('click')) {
                this.debugEnableTimer = new ig.Timer(2);
            }
            if (this.debugEnableTimer && this.debugEnableTimer.delta() < 0) {
                if (ig.input.released('click')) {
                    this.debugEnableTimer = null;
                }
            } else if (this.debugEnableTimer && this.debugEnableTimer.delta() > 0) {
                this.debugEnableTimer = null;
                if (this.viewDebug) {
                    this.viewDebug = false;
                } else {
                    this.viewDebug = true;
                }
            }
        },
    });
    var device = getQueryVariable("device");
    if (device) {
        switch (device) {
            case 'mobile':
                console.log('serving mobile version ...');
                ig.ua.mobile = true;
                break;
            case 'desktop':
                console.log('serving desktop version ...');
                ig.ua.mobile = false;
                break;
            default:
                console.log('serving universal version ...');
                break;
        }
    } else {
        console.log('serving universal version ...');
    }
    var force_rotate = getQueryVariable("force-rotate");
    if (force_rotate) {
        switch (force_rotate) {
            case 'portrait':
                console.log('force rotate to portrait');
                window.orientation = 0;
                break;
            case 'landscape':
                console.log('force rotate to horizontal');
                window.orientation = 90;
                break;
            default:
                alert('wrong command/type in param force-rotate. Defaulting value to portrait');
                window.orientation = 0;
        }
    }
    if (ig.ua.mobile) {
        ig.Sound.enabled = false;
        ig.main('#canvas', MyGame, 60, mobileWidth, mobileHeight, 1, ig.SplashLoader);
    } else {
        ig.main('#canvas', MyGame, 60, desktopWidth, desktopHeight, 1, ig.SplashLoader);
    }
    if (ig.ua.mobile) {
        orientationHandler();
    }
    sizeHandler();
    var TIME_SPENT = 0;

    function incrementTimeSpent() {
        TIME_SPENT++;
    }
    window.setInterval(function() {
        incrementTimeSpent();
    }, 1000);
    window.onunload = window.onbeforeunload = function() {
        var payload = {
            'ExitGame': {
                'Time': TIME_SPENT,
                'Count': 1,
            },
        };
        //MarketJS.MultiMetric.Write(payload);
    };
    fixSamsungHandler();
    Array
});
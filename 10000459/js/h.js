(function() {
    var c = {
        id: "3e2a3ed55fc7db4160d54201239d0d7b",
        dm: ["hao.ee"],
        etrk: [],
        js: "tongji.baidu.com/hm-web/js/",
        icon: '',
        br: false,
        ctrk: false,
        align: -1,
        nv: -1,
        vdur: 1800000,
        age: 31536000000,
        rec: 0,
        rp: [],
        trust: 0,
        vcard: 0,
        se: []
    };
    var l = !0,
        m = null,
        n = !1;
    var p = function() {
        function a(a) {
            /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function(a) {
                var b = d[a];
                if (b) return b;
                b = a.charCodeAt();
                return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
            }));
            return '"' + a + '"'
        }

        function b(a) {
            return 10 > a ? "0" + a : a
        }
        var d = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        return function(d) {
            switch (typeof d) {
                case "undefined":
                    return "undefined";
                case "number":
                    return isFinite(d) ? String(d) : "null";
                case "string":
                    return a(d);
                case "boolean":
                    return String(d);
                default:
                    if (d === m) return "null";
                    if (d instanceof Array) {
                        var f = ["["],
                            k = d.length,
                            h, g, u;
                        for (g = 0; g < k; g++) switch (u = d[g], typeof u) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                h && f.push(","), f.push(p(u)), h = 1
                        }
                        f.push("]");
                        return f.join("")
                    }
                    if (d instanceof Date) return '"' + d.getFullYear() + "-" + b(d.getMonth() + 1) + "-" + b(d.getDate()) + "T" + b(d.getHours()) + ":" + b(d.getMinutes()) + ":" + b(d.getSeconds()) + '"';
                    h = ["{"];
                    for (k in d)
                        if (Object.prototype.hasOwnProperty.call(d, k)) switch (g = d[k], typeof g) {
                            case "undefined":
                            case "unknown":
                            case "function":
                                break;
                            default:
                                f && h.push(","), f = 1, h.push(p(k) + ":" + p(g))
                        }
                        h.push("}");
                    return h.join("")
            }
        }
    }();

    function q(a, b) {
        var d = a.match(RegExp("(^|&|\\?|#)(" + b + ")=([^&#]*)(&|$|#)", ""));
        return d ? d[3] : m
    }

    function v(a) {
        return (a = (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : m) ? a.replace(/:\d+$/, "") : a
    };

    function w(a, b) {
        if (window.sessionStorage) try {
            window.sessionStorage.setItem(a, b)
        } catch (d) {}
    }

    function x(a) {
        return window.sessionStorage ? window.sessionStorage.getItem(a) : m
    };

    function y(a, b, d) {
        var e;
        d.f && (e = new Date, e.setTime(e.getTime() + d.f));
        document.cookie = a + "=" + b + (d.domain ? "; domain=" + d.domain : "") + (d.path ? "; path=" + d.path : "") + (e ? "; expires=" + e.toGMTString() : "") + (d.r ? "; secure" : "")
    };

    function B(a, b) {
        var d = new Image,
            e = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
        window[e] = d;
        d.onload = d.onerror = d.onabort = function() {
            d.onload = d.onerror = d.onabort = m;
            d = window[e] = m;
            b && b(a)
        };
        d.src = a
    };
    var C;

    function F() {
        if (!C) try {
            C = document.createElement("input"), C.type = "hidden", C.style.display = "none", C.addBehavior("#default#userData"), document.getElementsByTagName("head")[0].appendChild(C)
        } catch (a) {
            return n
        }
        return l
    }

    function G(a, b, d) {
        var e = new Date;
        e.setTime(e.getTime() + d || 31536E6);
        try {
            window.localStorage ? (b = e.getTime() + "|" + b, window.localStorage.setItem(a, b)) : F() && (C.expires = e.toUTCString(), C.load(document.location.hostname), C.setAttribute(a, b), C.save(document.location.hostname))
        } catch (f) {}
    }

    function H(a) {
        if (window.localStorage) {
            if (a = window.localStorage.getItem(a)) {
                var b = a.indexOf("|"),
                    d = a.substring(0, b) - 0;
                if (d && d > (new Date).getTime()) return a.substring(b + 1)
            }
        } else if (F()) try {
            return C.load(document.location.hostname), C.getAttribute(a)
        } catch (e) {}
        return m
    };

    function I(a, b, d) {
        a.attachEvent ? a.attachEvent("on" + b, function(b) {
            d.call(a, b)
        }) : a.addEventListener && a.addEventListener(b, d, n)
    };
    (function() {
        function a() {
            if (!a.b) {
                a.b = l;
                for (var b = 0, d = e.length; b < d; b++) e[b]()
            }
        }

        function b() {
            try {
                document.documentElement.doScroll("left")
            } catch (d) {
                setTimeout(b, 1);
                return
            }
            a()
        }
        var d = n,
            e = [],
            f;
        document.addEventListener ? f = function() {
            document.removeEventListener("DOMContentLoaded", f, n);
            a()
        } : document.attachEvent && (f = function() {
            "complete" === document.readyState && (document.detachEvent("onreadystatechange", f), a())
        });
        (function() {
            if (!d)
                if (d = l, "complete" === document.readyState) a.b = l;
                else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                f, n), window.addEventListener("load", a, n);
            else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", f);
                window.attachEvent("onload", a);
                var e = n;
                try {
                    e = window.frameElement == m
                } catch (h) {}
                document.documentElement.doScroll && e && b()
            }
        })();
        return function(b) {
            a.b ? b() : e.push(b)
        }
    })().b = n;

    function N(a, b) {
        return "[object " + b + "]" === {}.toString.call(a)
    };
    var aa = navigator.cookieEnabled,
        ba = navigator.javaEnabled(),
        ha = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "",
        ia = window.screen.width + "x" + window.screen.height,
        ja = window.screen.colorDepth;
    var O = 0,
        P = Math.round(+new Date / 1E3),
        Q = "https:" == document.location.protocol ? "https:" : "http:",
        R = "cc cf ci ck cl cm cp cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api tt u".split(" ");

    function V() {
        if ("undefined" == typeof window["_bdhm_loaded_" + c.id]) {
            window["_bdhm_loaded_" + c.id] = l;
            var a = this;
            a.a = {};
            a.q = [];
            a.p = {
                push: function() {
                    a.k.apply(a, arguments)
                }
            };
            a.c = 0;
            a.h = n;
            ka(a)
        }
    }
    V.prototype = {
        getData: function(a) {
            try {
                var b = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie);
                return (b ? b[2] : m) || x(a) || H(a)
            } catch (d) {}
        },
        setData: function(a, b, d) {
            try {
                y(a, b, {
                    domain: la(),
                    path: ma(),
                    f: d
                }), d ? G(a, b, d) : w(a, b)
            } catch (e) {}
        },
        k: function(a) {
            if (N(a, "Array")) {
                var b = function(a) {
                    return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a
                };
                switch (a[0]) {
                    case "_trackPageview":
                        if (1 < a.length && a[1].charAt && "/" == a[1].charAt(0)) {
                            this.a.api |= 4;
                            this.a.et = 0;
                            this.a.ep = "";
                            this.h ? (this.a.nv =
                                0, this.a.st = 4) : this.h = l;
                            var b = this.a.u,
                                d = this.a.su;
                            this.a.u = Q + "//" + document.location.host + a[1];
                            this.a.su = document.location.href;
                            W(this);
                            this.a.u = b;
                            this.a.su = d
                        }
                        break;
                    case "_trackEvent":
                        2 < a.length && (this.a.api |= 8, this.a.nv = 0, this.a.st = 4, this.a.et = 4, this.a.ep = b(a[1]) + "*" + b(a[2]) + (a[3] ? "*" + b(a[3]) : "") + (a[4] ? "*" + b(a[4]) : ""), W(this));
                        break;
                    case "_setCustomVar":
                        if (4 > a.length) break;
                        var d = a[1],
                            e = a[4] || 3;
                        if (0 < d && 6 > d && 0 < e && 4 > e) {
                            this.c++;
                            for (var f = (this.a.cv || "*").split("!"), k = f.length; k < d - 1; k++) f.push("*");
                            f[d - 1] = e + "*" + b(a[2]) + "*" + b(a[3]);
                            this.a.cv = f.join("!");
                            a = this.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g, "");
                            "" !== a ? this.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : na()
                        }
                        break;
                    case "_trackOrder":
                        a = a[1];
                        if (N(a, "Object")) {
                            var h = function(a) {
                                for (var b in a)
                                    if ({}.hasOwnProperty.call(a, b)) {
                                        var d = a[b];
                                        N(d, "Object") || N(d, "Array") ? h(d) : a[b] = String(d)
                                    }
                            };
                            h(a);
                            this.a.api |= 16;
                            this.a.nv = 0;
                            this.a.st = 4;
                            this.a.et = 94;
                            this.a.ep = p(a);
                            W(this)
                        }
                        break;
                    case "_trackMobConv":
                        if (a = {
                            webim: 1,
                            tel: 2,
                            map: 3,
                            sms: 4,
                            callback: 5,
                            share: 6
                        }[a[1]]) this.a.api |= 32, this.a.et = 93, this.a.ep = a, W(this)
                }
            }
        }
    };

    function oa() {
        var a = x("Hm_unsent_" + c.id);
        if (a)
            for (var a = a.split(","), b = 0, d = a.length; b < d; b++) B(Q + "//" + decodeURIComponent(a[b]).replace(/^https?:\/\//, ""), function(a) {
                X(a)
            })
    }

    function X(a) {
        var b = x("Hm_unsent_" + c.id) || "";
        b && ((b = b.replace(RegExp(encodeURIComponent(a.replace(/^https?:\/\//, "")).replace(/([\*\(\)])/g, "\\$1") + "(%26u%3D[^,]*)?,?", "g"), "").replace(/,$/, "")) ? w("Hm_unsent_" + c.id, b) : window.sessionStorage && window.sessionStorage.removeItem("Hm_unsent_" + c.id))
    }

    function qa(a, b) {
        var d = x("Hm_unsent_" + c.id) || "",
            e = a.a.u ? "" : "&u=" + encodeURIComponent(document.location.href),
            d = encodeURIComponent(b.replace(/^https?:\/\//, "") + e) + (d ? "," + d : "");
        w("Hm_unsent_" + c.id, d)
    }

    function W(a) {
        a.a.rnd = Math.round(2147483647 * Math.random());
        a.a.api = a.a.api || a.c ? a.a.api + "_" + a.c : "";
        var b = Q + "//hm.baidu.com/hm.gif?" + ra(a);
        a.a.api = 0;
        a.c = 0;
        qa(a, b);
        B(b, function(a) {
            X(a)
        })
    }

    function sa(a) {
        return function() {
            a.a.nv = 0;
            a.a.st = 4;
            a.a.et = 3;
            a.a.ep = (new Date).getTime() - a.e.j + "," + ((new Date).getTime() - a.e.d + a.e.i);
            W(a)
        }
    }

    function ka(a) {
        try {
            var b, d, e, f, k, h, g;
            O = a.getData("Hm_lpvt_" + c.id) || 0;
            13 == O.length && (O = Math.round(O / 1E3));
            if (document.referrer) {
                var u = n;
                if (Y(document.referrer) && Y(document.location.href)) u = l;
                else var pa = v(document.referrer),
                    u = Z(pa || "", document.location.hostname);
                d = u ? P - O > c.vdur ? 1 : 4 : 3
            } else d = P - O > c.vdur ? 1 : 4;
            b = 4 != d ? 1 : 0;
            if (h = a.getData("Hm_lvt_" + c.id)) {
                g = h.split(",");
                for (var D = g.length - 1; 0 <= D; D--) 13 == g[D].length && (g[D] = "" + Math.round(g[D] / 1E3));
                for (; 2592E3 < P - g[0];) g.shift();
                k = 4 > g.length ? 2 : 3;
                for (1 === b && g.push(P); 4 <
                    g.length;) g.shift();
                h = g.join(",");
                f = g[g.length - 1]
            } else h = P, f = "", k = 1;
            a.setData("Hm_lvt_" + c.id, h, c.age);
            a.setData("Hm_lpvt_" + c.id, P);
            e = P == a.getData("Hm_lpvt_" + c.id) ? "1" : "0";
            if (0 == c.nv && Y(document.location.href) && ("" == document.referrer || Y(document.referrer))) b = 0, d = 4;
            a.a.nv = b;
            a.a.st = d;
            a.a.cc = e;
            a.a.lt = f;
            a.a.lv = k;
            a.a.si = c.id;
            a.a.su = document.referrer;
            a.a.ds = ia;
            a.a.cl = ja + "-bit";
            a.a.ln = ha;
            a.a.ja = ba ? 1 : 0;
            a.a.ck = aa ? 1 : 0;
            a.a.lo = "number" == typeof _bdhm_top ? 1 : 0;
            var J = a.a;
            b = "";
            if (navigator.plugins && navigator.mimeTypes.length) {
                var z =
                    navigator.plugins["Shockwave Flash"];
                z && z.description && (b = z.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
            } else if (window.ActiveXObject) try {
                var ca = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                ca && (b = ca.GetVariable("$version")) && (b = b.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
            } catch (ya) {}
            J.fl = b;
            a.a.v = "1.0.59";
            a.a.cv = decodeURIComponent(a.getData("Hm_cv_" + c.id) || "");
            1 == a.a.nv && (a.a.tt = document.title || "");
            a.a.api = 0;
            var E = document.location.href;
            a.a.cm = q(E, "hmmd") || "";
            a.a.cp = q(E, "hmpl") || "";
            a.a.cw =
                q(E, "hmkw") || "";
            a.a.ci = q(E, "hmci") || "";
            a.a.cf = q(E, "hmsr") || "";
            0 == a.a.nv ? oa() : X(".*");
            if ("" != c.icon) {
                var r, s = c.icon.split("|"),
                    S = "http://tongji.baidu.com/hm-web/welcome/ico?s=" + c.id,
                    T = ("http:" == Q ? "http://eiv" : "https://bs") + ".baidu.com" + s[0] + "." + s[1];
                switch (s[1]) {
                    case "swf":
                        var da = s[2],
                            ea = s[3],
                            J = "s=" + S,
                            z = "HolmesIcon" + P;
                        r = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="' + z + '" width="' + da + '" height="' + ea + '"><param name="movie" value="' + T + '" /><param name="flashvars" value="' + (J || "") +
                            '" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="' + z + '" width="' + da + '" height="' + ea + '" src="' + T + '" flashvars="' + (J || "") + '" allowscriptaccess="always" /></object>';
                        break;
                    case "gif":
                        r = '<a href="' + S + '" target="_blank"><img border="0" src="' + T + '" width="' + s[2] + '" height="' + s[3] + '"></a>';
                        break;
                    default:
                        r = '<a href="' + S + '" target="_blank">' + s[0] + "</a>"
                }
                document.write(r)
            }
            var K = document.location.hash.substring(1),
                ua = RegExp(c.id),
                va = -1 < document.referrer.indexOf("baidu.com") ?
                l : n;
            if (K && ua.test(K) && va) {
                var L = document.createElement("script");
                L.setAttribute("type", "text/javascript");
                L.setAttribute("charset", "utf-8");
                L.setAttribute("src", Q + "//" + c.js + q(K, "jn") + "." + q(K, "sx") + "?" + a.a.rnd);
                var fa = document.getElementsByTagName("script")[0];
                fa.parentNode.insertBefore(L, fa)
            }
            a.m && a.m();
            a.l && a.l();
            if (c.rec || c.trust) a.a.nv ? (a.g = encodeURIComponent(document.referrer), window.sessionStorage ? w("Hm_from_" + c.id, a.g) : G("Hm_from_" + c.id, a.g, 864E5)) : a.g = (window.sessionStorage ? x("Hm_from_" + c.id) :
                H("Hm_from_" + c.id)) || "";
            a.n && a.n();
            a.o && a.o();
            a.e = new ta;
            I(window, "beforeunload", sa(a));
            var t = window._hmt;
            if (t && t.length)
                for (r = 0; r < t.length; r++) {
                    var A = t[r];
                    switch (A[0]) {
                        case "_setAccount":
                            1 < A.length && /^[0-9a-z]{32}$/.test(A[1]) && (a.a.api |= 1, window._bdhm_account = A[1]);
                            break;
                        case "_setAutoPageview":
                            if (1 < A.length) {
                                var U = A[1];
                                if (n === U || l === U) a.a.api |= 2, window._bdhm_autoPageview = U
                            }
                    }
                }
            if ("undefined" === typeof window._bdhm_account || window._bdhm_account === c.id) {
                window._bdhm_account = c.id;
                var M = window._hmt;
                if (M &&
                    M.length)
                    for (var t = 0, xa = M.length; t < xa; t++) a.k(M[t]);
                window._hmt = a.p
            }
            if ("undefined" === typeof window._bdhm_autoPageview || window._bdhm_autoPageview === l) a.h = l, a.a.et = 0, a.a.ep = "", W(a)
        } catch (ga) {
            a = [], a.push("si=" + c.id), a.push("n=" + encodeURIComponent(ga.name)), a.push("m=" + encodeURIComponent(ga.message)), a.push("r=" + encodeURIComponent(document.referrer)), B(Q + "//hm.baidu.com/hm.gif?" + a.join("&"))
        }
    }

    function ra(a) {
        for (var b = [], d = 0, e = R.length; d < e; d++) {
            var f = R[d],
                k = a.a[f];
            "undefined" != typeof k && "" !== k && b.push(f + "=" + encodeURIComponent(k))
        }
        return b.join("&")
    }

    function na() {
        var a = "Hm_cv_" + c.id;
        try {
            if (y(a, "", {
                domain: la(),
                path: ma(),
                f: -1
            }), window.sessionStorage && window.sessionStorage.removeItem(a), window.localStorage) window.localStorage.removeItem(a);
            else if (F()) try {
                C.load(document.location.hostname), C.removeAttribute(a), C.save(document.location.hostname)
            } catch (b) {}
        } catch (d) {}
    }

    function ma() {
        for (var a = 0, b = c.dm.length; a < b; a++) {
            var d = c.dm[a];
            if (-1 < d.indexOf("/") && wa(document.location.href, d)) return d.replace(/^[^\/]+(\/.*)/, "$1") + "/"
        }
        return "/"
    }

    function la() {
        for (var a = document.location.hostname, b = 0, d = c.dm.length; b < d; b++)
            if (Z(a, c.dm[b])) return c.dm[b].replace(/(:\d+)?[\/\?#].*/, "");
        return a
    }

    function Y(a) {
        for (var b = 0; b < c.dm.length; b++)
            if (-1 < c.dm[b].indexOf("/")) {
                if (wa(a, c.dm[b])) return l
            } else {
                var d = v(a);
                if (d && Z(d, c.dm[b])) return l
            }
        return n
    }

    function wa(a, b) {
        a = a.replace(/^https?:\/\//, "");
        return 0 == a.indexOf(b)
    }

    function Z(a, b) {
        a = "." + a.replace(/:\d+/, "");
        b = "." + b.replace(/:\d+/, "");
        var d = a.indexOf(b);
        return -1 < d && d + b.length == a.length
    }

    function ta() {
        this.d = this.j = (new Date).getTime();
        this.i = 0;
        "object" == typeof document.onfocusin ? (I(document, "focusin", $(this)), I(document, "focusout", $(this))) : (I(window, "focus", $(this)), I(window, "blur", $(this)))
    }

    function $(a) {
        return function(b) {
            if (!(b.target && b.target != window)) {
                if ("blur" == b.type || "focusout" == b.type) a.i += (new Date).getTime() - a.d;
                a.d = (new Date).getTime()
            }
        }
    }
    new V;
})();
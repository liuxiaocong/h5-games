/** Cooked with Flambe, https://getflambe.com */
var flambe = {
    FLASH_VERSION: "11"
};
flambe.embed = function(k, w) {
    "string" == typeof k && (k = [k + "-flash.swf", k + "-html.js"]);
    var x = document.getElementById(w);
    if (null == x) throw Error("Could not find element [id=" + w + "]");
    for (var r = {}, p = window.location.search.substr(1).split("&"), h = 0; h < p.length; ++h) {
        var n = p[h].split("=");
        r[unescape(n[0])] = 1 < n.length ? unescape(n[1]) : null
    }
    p = r.flambe;
    for (h = 0; h < k.length; ++h) switch (r = k[h], (n = r.match(/\.(\w+)(\?|$)/)) && (n = n[1].toLowerCase()), n) {
        case "swf":
            if ((null == p || "flash" == p) && swfobject.hasFlashPlayerVersion(flambe.FLASH_VERSION)) return h = document.createElement("div"),
                h.id = w + "-swf", x.appendChild(h), "undefined" == typeof $flambe_expose && (window.$flambe_expose = function(h, n) {
                    window[h] = null != n ? function() {
                        var k = document.getElementById(n);
                        k[h].apply(k, arguments)
                    } : null
                }), swfobject.embedSWF(r, h.id, "100%", "100%", flambe.FLASH_VERSION, null, {}, {
                    allowScriptAccess: "always",
                    allowFullScreen: "true",
                    fullscreenOnSelection: "true",
                    wmode: "direct"
                }, {
                    id: h.id,
                    name: h.id
                }), !0;
            break;
        case "js":
            if (null == p || "html" == p)
                if (n = document.createElement("canvas"), "getContext" in n) return n.id = w + "-canvas",
                    x.appendChild(n), flambe.canvas = n, h = document.createElement("script"), h.onload = function() {
                        flambe.canvas = null
                    }, h.src = r, x.appendChild(h), !0;
            break;
        default:
            throw Error("Don't know how to embed [url=" + r + "]");
    }
    return !1
};
var swfobject = function() {
    function k() {
        if (!y) {
            try {
                var a = d.getElementsByTagName("body")[0].appendChild(d.createElement("span"));
                a.parentNode.removeChild(a)
            } catch (b) {
                return
            }
            y = !0;
            for (var a = C.length, c = 0; c < a; c++) C[c]()
        }
    }

    function w(a) {
        y ? a() : C[C.length] = a
    }

    function x(a) {
        if (typeof l.addEventListener != j) l.addEventListener("load", a, !1);
        else if (typeof d.addEventListener != j) d.addEventListener("load", a, !1);
        else if (typeof l.attachEvent != j) V(l, "onload", a);
        else if ("function" == typeof l.onload) {
            var b = l.onload;
            l.onload =
                function() {
                    b();
                    a()
            }
        } else l.onload = a
    }

    function r() {
        var a = d.getElementsByTagName("body")[0],
            b = d.createElement(s);
        b.setAttribute("type", D);
        var c = a.appendChild(b);
        if (c) {
            var f = 0;
            (function() {
                if (typeof c.GetVariable != j) {
                    var g = c.GetVariable("$version");
                    g && (g = g.split(" ")[1].split(","), e.pv = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)])
                } else if (10 > f) {
                    f++;
                    setTimeout(arguments.callee, 10);
                    return
                }
                a.removeChild(b);
                c = null;
                p()
            })()
        } else p()
    }

    function p() {
        var a = u.length;
        if (0 < a)
            for (var b = 0; b < a; b++) {
                var c = u[b].id,
                    f = u[b].callbackFn,
                    g = {
                        success: !1,
                        id: c
                    };
                if (0 < e.pv[0]) {
                    var d = q(c);
                    if (d)
                        if (E(u[b].swfVersion) && !(e.wk && 312 > e.wk)) z(c, !0), f && (g.success = !0, g.ref = h(c), f(g));
                        else if (u[b].expressInstall && n()) {
                        g = {};
                        g.data = u[b].expressInstall;
                        g.width = d.getAttribute("width") || "0";
                        g.height = d.getAttribute("height") || "0";
                        d.getAttribute("class") && (g.styleclass = d.getAttribute("class"));
                        d.getAttribute("align") && (g.align = d.getAttribute("align"));
                        for (var i = {}, d = d.getElementsByTagName("param"), o = d.length, m = 0; m < o; m++) "movie" != d[m].getAttribute("name").toLowerCase() &&
                            (i[d[m].getAttribute("name")] = d[m].getAttribute("value"));
                        I(g, i, c, f)
                    } else U(d), f && f(g)
                } else if (z(c, !0), f) {
                    if ((c = h(c)) && typeof c.SetVariable != j) g.success = !0, g.ref = c;
                    f(g)
                }
            }
    }

    function h(a) {
        var b = null;
        if ((a = q(a)) && "OBJECT" == a.nodeName) typeof a.SetVariable != j ? b = a : (a = a.getElementsByTagName(s)[0]) && (b = a);
        return b
    }

    function n() {
        return !F && E("6.0.65") && (e.win || e.mac) && !(e.wk && 312 > e.wk)
    }

    function I(a, b, c, f) {
        F = !0;
        K = f || null;
        N = {
            success: !1,
            id: c
        };
        var g = q(c);
        if (g) {
            "OBJECT" == g.nodeName ? (B = J(g), G = null) : (B = g, G = c);
            a.id =
                O;
            if (typeof a.width == j || !/%$/.test(a.width) && 310 > parseInt(a.width, 10)) a.width = "310";
            if (typeof a.height == j || !/%$/.test(a.height) && 137 > parseInt(a.height, 10)) a.height = "137";
            d.title = d.title.slice(0, 47) + " - Flash Player Installation";
            f = e.ie && e.win ? "ActiveX" : "PlugIn";
            f = "MMredirectURL=" + l.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + d.title;
            b.flashvars = typeof b.flashvars != j ? b.flashvars + ("&" + f) : f;
            e.ie && e.win && 4 != g.readyState && (f = d.createElement("div"), c += "SWFObjectNew", f.setAttribute("id",
                c), g.parentNode.insertBefore(f, g), g.style.display = "none", function() {
                4 == g.readyState ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
            }());
            L(a, b, c)
        }
    }

    function U(a) {
        if (e.ie && e.win && 4 != a.readyState) {
            var b = d.createElement("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(J(a), b);
            a.style.display = "none";
            (function() {
                4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
            })()
        } else a.parentNode.replaceChild(J(a), a)
    }

    function J(a) {
        var b = d.createElement("div");
        if (e.win &&
            e.ie) b.innerHTML = a.innerHTML;
        else if (a = a.getElementsByTagName(s)[0])
            if (a = a.childNodes)
                for (var c = a.length, f = 0; f < c; f++)!(1 == a[f].nodeType && "PARAM" == a[f].nodeName) && 8 != a[f].nodeType && b.appendChild(a[f].cloneNode(!0));
        return b
    }

    function L(a, b, c) {
        var f, g = q(c);
        if (e.wk && 312 > e.wk) return f;
        if (g)
            if (typeof a.id == j && (a.id = c), e.ie && e.win) {
                var h = "",
                    i;
                for (i in a) a[i] != Object.prototype[i] && ("data" == i.toLowerCase() ? b.movie = a[i] : "styleclass" == i.toLowerCase() ? h += ' class="' + a[i] + '"' : "classid" != i.toLowerCase() && (h += " " +
                    i + '="' + a[i] + '"'));
                i = "";
                for (var o in b) b[o] != Object.prototype[o] && (i += '<param name="' + o + '" value="' + b[o] + '" />');
                g.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + h + ">" + i + "</object>";
                H[H.length] = a.id;
                f = q(a.id)
            } else {
                o = d.createElement(s);
                o.setAttribute("type", D);
                for (var m in a) a[m] != Object.prototype[m] && ("styleclass" == m.toLowerCase() ? o.setAttribute("class", a[m]) : "classid" != m.toLowerCase() && o.setAttribute(m, a[m]));
                for (h in b) b[h] != Object.prototype[h] && "movie" != h.toLowerCase() &&
                    (a = o, i = h, m = b[h], c = d.createElement("param"), c.setAttribute("name", i), c.setAttribute("value", m), a.appendChild(c));
                g.parentNode.replaceChild(o, g);
                f = o
            }
        return f
    }

    function P(a) {
        var b = q(a);
        b && "OBJECT" == b.nodeName && (e.ie && e.win ? (b.style.display = "none", function() {
            if (4 == b.readyState) {
                var c = q(a);
                if (c) {
                    for (var f in c) "function" == typeof c[f] && (c[f] = null);
                    c.parentNode.removeChild(c)
                }
            } else setTimeout(arguments.callee, 10)
        }()) : b.parentNode.removeChild(b))
    }

    function q(a) {
        var b = null;
        try {
            b = d.getElementById(a)
        } catch (c) {}
        return b
    }

    function V(a, b, c) {
        a.attachEvent(b, c);
        A[A.length] = [a, b, c]
    }

    function E(a) {
        var b = e.pv,
            a = a.split(".");
        a[0] = parseInt(a[0], 10);
        a[1] = parseInt(a[1], 10) || 0;
        a[2] = parseInt(a[2], 10) || 0;
        return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1
    }

    function Q(a, b, c, f) {
        if (!e.ie || !e.mac) {
            var g = d.getElementsByTagName("head")[0];
            if (g) {
                c = c && "string" == typeof c ? c : "screen";
                f && (M = t = null);
                if (!t || M != c) f = d.createElement("style"), f.setAttribute("type", "text/css"), f.setAttribute("media", c), t = g.appendChild(f),
                    e.ie && e.win && typeof d.styleSheets != j && 0 < d.styleSheets.length && (t = d.styleSheets[d.styleSheets.length - 1]), M = c;
                e.ie && e.win ? t && typeof t.addRule == s && t.addRule(a, b) : t && typeof d.createTextNode != j && t.appendChild(d.createTextNode(a + " {" + b + "}"))
            }
        }
    }

    function z(a, b) {
        if (R) {
            var c = b ? "visible" : "hidden";
            y && q(a) ? q(a).style.visibility = c : Q("#" + a, "visibility:" + c)
        }
    }

    function S(a) {
        return null != /[\\\"<>\.;]/.exec(a) && typeof encodeURIComponent != j ? encodeURIComponent(a) : a
    }
    var j = "undefined",
        s = "object",
        D = "application/x-shockwave-flash",
        O = "SWFObjectExprInst",
        l = window,
        d = document,
        v = navigator,
        T = !1,
        C = [
            function() {
                T ? r() : p()
            }
        ],
        u = [],
        H = [],
        A = [],
        B, G, K, N, y = !1,
        F = !1,
        t, M, R = !0,
        e = function() {
            var a = typeof d.getElementById != j && typeof d.getElementsByTagName != j && typeof d.createElement != j,
                b = v.userAgent.toLowerCase(),
                c = v.platform.toLowerCase(),
                f = c ? /win/.test(c) : /win/.test(b),
                c = c ? /mac/.test(c) : /mac/.test(b),
                b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                g = !+"\v1",
                e = [0, 0, 0],
                i = null;
            if (typeof v.plugins != j && typeof v.plugins["Shockwave Flash"] ==
                s) {
                if ((i = v.plugins["Shockwave Flash"].description) && !(typeof v.mimeTypes != j && v.mimeTypes[D] && !v.mimeTypes[D].enabledPlugin)) T = !0, g = !1, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), e[0] = parseInt(i.replace(/^(.*)\..*$/, "$1"), 10), e[1] = parseInt(i.replace(/^.*\.(.*)\s.*$/, "$1"), 10), e[2] = /[a-zA-Z]/.test(i) ? parseInt(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            } else if (typeof l.ActiveXObject != j) try {
                var h = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (h && (i = h.GetVariable("$version"))) g = !0, i = i.split(" ")[1].split(","),
                    e = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]
            } catch (m) {}
            return {
                w3: a,
                pv: e,
                wk: b,
                ie: g,
                win: f,
                mac: c
            }
        }();
    (function() {
        e.w3 && ((typeof d.readyState != j && "complete" == d.readyState || typeof d.readyState == j && (d.getElementsByTagName("body")[0] || d.body)) && k(), y || (typeof d.addEventListener != j && d.addEventListener("DOMContentLoaded", k, !1), e.ie && e.win && (d.attachEvent("onreadystatechange", function() {
            "complete" == d.readyState && (d.detachEvent("onreadystatechange", arguments.callee), k())
        }), l == top && function() {
            if (!y) {
                try {
                    d.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(arguments.callee,
                        0);
                    return
                }
                k()
            }
        }()), e.wk && function() {
            y || (/loaded|complete/.test(d.readyState) ? k() : setTimeout(arguments.callee, 0))
        }(), x(k)))
    })();
    (function() {
        e.ie && e.win && window.attachEvent("onunload", function() {
            for (var a = A.length, b = 0; b < a; b++) A[b][0].detachEvent(A[b][1], A[b][2]);
            a = H.length;
            for (b = 0; b < a; b++) P(H[b]);
            for (var c in e) e[c] = null;
            e = null;
            for (var f in swfobject) swfobject[f] = null;
            swfobject = null
        })
    })();
    return {
        registerObject: function(a, b, c, f) {
            if (e.w3 && a && b) {
                var d = {};
                d.id = a;
                d.swfVersion = b;
                d.expressInstall = c;
                d.callbackFn =
                    f;
                u[u.length] = d;
                z(a, !1)
            } else f && f({
                success: !1,
                id: a
            })
        },
        getObjectById: function(a) {
            if (e.w3) return h(a)
        },
        embedSWF: function(a, b, c, d, g, h, i, o, m, k) {
            var p = {
                success: !1,
                id: b
            };
            e.w3 && !(e.wk && 312 > e.wk) && a && b && c && d && g ? (z(b, !1), w(function() {
                c += "";
                d += "";
                var e = {};
                if (m && typeof m === s)
                    for (var l in m) e[l] = m[l];
                e.data = a;
                e.width = c;
                e.height = d;
                l = {};
                if (o && typeof o === s)
                    for (var q in o) l[q] = o[q];
                if (i && typeof i === s)
                    for (var r in i) l.flashvars = typeof l.flashvars != j ? l.flashvars + ("&" + r + "=" + i[r]) : r + "=" + i[r];
                if (E(g)) q = L(e, l, b), e.id ==
                    b && z(b, !0), p.success = !0, p.ref = q;
                else {
                    if (h && n()) {
                        e.data = h;
                        I(e, l, b, k);
                        return
                    }
                    z(b, !0)
                }
                k && k(p)
            })) : k && k(p)
        },
        switchOffAutoHideShow: function() {
            R = !1
        },
        ua: e,
        getFlashPlayerVersion: function() {
            return {
                major: e.pv[0],
                minor: e.pv[1],
                release: e.pv[2]
            }
        },
        hasFlashPlayerVersion: E,
        createSWF: function(a, b, c) {
            if (e.w3) return L(a, b, c)
        },
        showExpressInstall: function(a, b, c, d) {
            e.w3 && n() && I(a, b, c, d)
        },
        removeSWF: function(a) {
            e.w3 && P(a)
        },
        createCSS: function(a, b, c, d) {
            e.w3 && Q(a, b, c, d)
        },
        addDomLoadEvent: w,
        addLoadEvent: x,
        getQueryParamValue: function(a) {
            var b =
                d.location.search || d.location.hash;
            if (b) {
                /\?/.test(b) && (b = b.split("?")[1]);
                if (null == a) return S(b);
                for (var b = b.split("&"), c = 0; c < b.length; c++)
                    if (b[c].substring(0, b[c].indexOf("=")) == a) return S(b[c].substring(b[c].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function() {
            if (F) {
                var a = q(O);
                a && B && (a.parentNode.replaceChild(B, a), G && (z(G, !0), e.ie && e.win && (B.style.display = "block")), K && K(N));
                F = !1
            }
        }
    }
}();

(function(f) {
    function h() {
        var b = t;
        if (b) return b;
        var a = f.navigator.userAgent,
            b = "pc";
        switch (!0) {
            case /MicroMessenger/.test(a):
                b = "weixin";
                break;
            case /CM/.test(a):
                b = "cm";
                break;
            case /(Gkuwan)/gi.test(a):
                b = "kuwan"
        }
        return t = b
    }

    function u(b) {
        v ? b() : p.push(b)
    }

    function g(b) {
        "undefined" !== typeof _hmt && _hmt.push(b)
    }

    function q() {
        var b = d.doneJump;
        b && (location.href = b)
    }
    var e = f.LBShare;
    e || (e = f.LBShare = {});
    var t, w = Date.now ? Date.now() : (new Date).getTime(),
        d = {
            doneJump: "http://pkleyou.com"
        },
        r = location.protocol +
        "//" + location.host,
        A = location.pathname.replace(/\?.*/, ""),
        s = "unknownGame";
    (function() {
        var b = location.pathname.match(/^\/game\/([^\/]+)/);
        b && (s = b[1]);
        d.doneJump += "?f=" + s
    })();
    var v = !1,
        p = [];
    (function(b, a) {
        var c = new XMLHttpRequest;
        c.onreadystatechange = function() {
            if (4 === c.readyState) {
                c.onreadystatechange = null;
                var b;
                200 === c.status && (b = c.responseText, 0 === b.length || "<" !== b.charAt(0)) ? a(b) : a(!1)
            }
        };
        c.open("GET", b, !1);
        c.send(null)
    })("./conf/jumpCloud.json?t=" + w, function(b) {
        if (b) {
            try {
                var a = JSON.parse(b)
            } catch (c) {}
            r =
                "http://q" + Math.floor(5E3 * Math.random()) + "." + a.jumphost;
            "www.liebao.cn" === location.host && "weixin" == h() && (location.href = r + location.pathname)
        }
        v = !0;
        b = p.length;
        for (a = 0; a < b; ++a) p[a]()
    });
    d.getUrl = function(b) {
        return (d.url || r + A).replace(/\?.*/, "") + ("?f=" + (b ? b : "unknownShare")) + "&t=" + w
    };
    d.getImgUrl = function() {
        var b = d.imgUrl;
        if (b) {
            var a = k.createElement("a");
            a.href = b;
            return a.href
        }
        return "http://www.liebao.cn/game/img/icon.png"
    };
    var k = document;
    "weixin" === h() && k.addEventListener("WeixinJSBridgeReady", function a() {
        k.removeEventListener("WeixinJSBridgeReady",
            a, !1);
        var c = WeixinJSBridge;
        c.on("menu:share:appmessage", function(a) {
            c.invoke("sendAppMessage", {
                img_url: d.getImgUrl(),
                link: d.getUrl("weixin"),
                desc: d.wxFriendDesc || d.desc,
                title: d.title
            }, function(a) {
                g(["_trackEvent", "WXShareButton", "gameShareWXFriend"]);
                q()
            })
        });
        c.on("menu:share:timeline", function(a) {
            c.invoke("shareTimeline", {
                img_url: d.getImgUrl(),
                img_width: "300",
                img_height: "300",
                link: d.getUrl("weixin"),
                desc: d.wxTimelineDesc || d.desc,
                title: d.wxTimelineDesc || d.desc || d.title
            }, function(a) {
                g(["_trackEvent",
                    "WXShareButton", "gameShareWX"
                ]);
                q()
            })
        });
        c.on("menu:share:weibo", function(a) {
            c.invoke("shareWeibo", {
                content: d.getImgUrl(),
                url: d.getUrl("weixin")
            }, function(a) {
                g(["_trackEvent", "WXShareButton", "gameShareWXweibo"]);
                q()
            })
        })
    }, !1);
    var x = k.body,
        y = {
            _div: void 0,
            show: function() {
                var a = this._div;
                a || (a = this._div = k.createElement("div"), a.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:100", a.style.background = "pc" === h() ? "url(./iq_test/images/share_tip_2.png?v=1) center bottom/contain rgba(0,0,0,.6) no-repeat" :
                    "url(http://www.liebao.cn/game/iq_test/images/share_tip.png?v=1) 50% 0/contain rgba(0,0,0,.6) no-repeat", a.addEventListener("click", function() {
                        y.hide()
                    }, !1));
                x.appendChild(a)
            },
            hide: function() {
                var a = this._div;
                a && x.removeChild(a)
            }
        };
    e.updateData = function(a) {
        for (var c in a)
            if (a.hasOwnProperty(c)) {
                var e = a[c];
                "string" === typeof e && (d[c] = e)
            }
        u(function() {
            var a = h(),
                c;
            "cm" === a ? c = f.android : "kuwan" === a && (c = f.updateclient);
            c && c.updatesharedata(d.title, d.getImgUrl(), d.desc, d.getUrl(a))
        })
    };
    e.callShare = function() {
     // alert("aaa" + d.wxFriendDesc || d.desc);
	  var str = d.wxFriendDesc || d.desc;
	try{parent.__4399finishgame(str);}catch(e){}
    };
    e.more = function() {
        g(["_trackEvent", "button", "more"]);
       // location.href = "/game/?f=" + s;
	   try{parent.moregame();}catch(e){}
    };
    e.statScore = function(a) {
        g(["_trackEvent", "button", "end", a])
    };
    e.getRank = function(a, c) {
        var d;
        if ("number" === typeof c) d = 100 * a / c;
        else {
            var e = Infinity,
                f = -e,
                g, h, k = f,
                n;
            for (n in c)
                if (c.hasOwnProperty(n)) {
                    var m = parseInt(n);
                    if (!isNaN(m) && 0 <= m && 100 >= m) {
                        var l = c[n],
                            k = Math.max(k, l);
                        if (l ===
                            a) {
                            d = m;
                            break
                        } else l < a ? f < l && (g = m, f = l) : e > l && (h = m, e = l)
                    }
                }
            void 0 === d && (void 0 === g && (f = g = 0), void 0 === h && (h = 100, e = 2 * k), d = g + (a - f) * (h - g) / (e - f))
        }
        return Math.max(0.1, Math.min(99.9, isNaN(d) ? 0 : d)).toFixed(1) + "%"
    };
    var z = e._sd;
    z && (e.updateData(z), e._sd = null)
})(window);
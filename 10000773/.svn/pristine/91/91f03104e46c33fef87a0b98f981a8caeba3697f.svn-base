var btGame;
~ function(e) {
    e.URL = {
        root: "http://www.doudou.in/play",
        getMoreGame: function() {
			alert("more")
            return e.dc("more"), "#"
		   
        },
        getConcern: function() {
            return "http://mp.weixin.qq.com/s?__biz=MzA5Nzk2OTIxNw==&mid=201099443&idx=1&sn=00a1d77cf1458023761bc403ec59b1d5#rd"
        },
        appId: "wxf91bab01569cc168"
    }, e.getGameId = function() {
        var e = location.href;
        e = e.slice(e.indexOf("://") + 3);
        var t = e.split("/")[2];
        return t
    }, e.getGamePath = function() {
        var e = location.href;
        return e = e.slice(0, e.lastIndexOf("/") + 1)
    }, e.dc = function(t) {
        window.Dc_SetButtonClickData && Dc_SetButtonClickData(e.getGameId(), t)
    }
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    function t(e, t) {
        this.elemId = e, this.hideClass = t || "bt-hide"
    }
    t.prototype = {
        beforeShow: function() {},
        show: function() {
            this.beforeShow();
            var e = this;
            setTimeout(function() {
                $("#" + e.elemId).removeClass(e.hideClass)
            }, 1)
        },
        hide: function() {
            $("#" + this.elemId).addClass(this.hideClass)
        }
    }, e.popupBox = t
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    e.proxy = function(e, t) {
        return function() {
            e.apply(t, arguments)
        }
    }
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    var t = function(e) {
        this.__publisher__ = e
    };
    t.prototype = {
        on: function(t, i) {
            this.__publisher__.on(t, e.proxy(i, this))
        },
        fire: function(e) {
            this.__publisher__.trigger(e, [].slice.call(arguments, 1))
        },
        off: function(t, i) {
            i ? this.__publisher__.off(t, e.proxy(i, this)) : this.__publisher__.off(t)
        }
    }, e.makePublisher = function(e) {
        var i = typeof e,
            n = new t($("<div></div>"));
        "function" == i ? (e.prototype.__publisher__ = n.__publisher__, $.extend(e.prototype, t.prototype)) : "object" == i && (e.__publisher__ = n.__publisher__, $.extend(e, t.prototype))
    }
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    $(function() {
        ~ function() {}()
    })
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    function t() {
        return n || (n = document.body || document.getElementsByTagName("body")[0]), n
    }

    function i() {
        return document.createElement("div")
    }
    var n;
    e.getDomBody = t, e.getNewDiv = i
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    var t = "bt-lock-screen",
        i = function(t) {
            var i = e.getNewDiv();
            i.id = t;
            var n = e.getDomBody();
            return n.appendChild(i), $(i)
        },
        n = function(i) {
            e.popupBox.call(this, i || t)
        };
    n.__super__ = e.popupBox, n.prototype = $.extend({}, e.popupBox.prototype, {
        beforeShow: function() {
            var e = this.getElem();
            e.size() <= 0 && (e = i(this.elemId), e.addClass("bt-lock-screen bt-animation bt-hide")), e.css("height", document.height)
        },
        remove: function() {
            var e = this.getElem();
            e.size() > 0 && (e.addClass("bt-hide"), setTimeout(function() {
                e.remove()
            }, 200))
        },
        getElem: function() {
            return $("#" + this.elemId)
        }
    }), e.lockScreen = function(e) {
        return new n(e)
    }
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    var t = {
            id: "bt-advertisement",
            html: "广告",
            time: 1500
        },
        i = function(i) {
            var n = $.extend({}, t, i || {}),
                o = $("#" + n.id),
                a = new e.lockScreen(n.lockId);
            if (o.size() <= 0) {
                var r = $(e.getNewDiv()).attr({
                        id: n.id
                    }).addClass(n.id),
                    c = n.html;
                r.html(c), e.getDomBody().appendChild(r[0]), o = r
            }
            this.event = n.id + "_timeup";
            var s = this;
            if (n.time > 0) {
                var m = this.event;
                this.off(m), o.data("timer", setTimeout(function() {
                    o.remove(), a.hide(), s.fire(m), n = null, this.elem = this.lock = s.show = s.hide = null
                }, n.time <= 0 ? 1500 : n.time))
            }
            this.elem = o, this.lock = a, this.show = function(e) {
                e && this.elem.html(e), this.elem.removeClass("bt-hide"), this.lock.show()
            }, this.hide = function() {
                this.elem.addClass("bt-hide"), this.lock.hide()
            }, this.remove = function() {
                this.lock.remove(), this.elem.remove()
            }
        };
    e.makePublisher(i), e.advertisement = function(e) {
        return new i(e)
    }
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    var t = null,
        i = null,
        n = function(n, o) {
            if (n > 0 && !t && (t = $(btGame.getNewDiv()), t.addClass("bt-game-loading"), t.html('<table><tr><td><img class="bt-img" src="' + e.URL.root + '/common/preloadImage.png" /><div class="bt-text"></div></td></tr></table>'), e.getDomBody().appendChild(t[0]), i = t.find(".bt-text")), t)
                if (o) i.html(o);
                else {
                    var a = Math.round(100 * n);
                    i.html("加载进度:" + a + "%")
                }
            n >= 1 && (t && t.remove(), t = null)
        };
    e.gameLoading = n
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    function t(e, t) {
        var i, n = window.innerWidth,
            o = window.innerHeight;
        if (n >= e && o >= t);
        else if (e > n && t > o) {
            var a = n / e,
                r = o / t;
            r >= a ? (i = e, e = n, t = t * e / i) : (i = t, t = o, e = e * t / i)
        } else e > n ? (i = e, e = n, t = t * n / i) : t > o && (i = t, t = o, e = e * o / i);
        var c = (o - t) / 2,
            s = (n - e) / 2;
        return {
            width: e,
            height: t,
            top: c,
            left: s
        }
    }

    function i(e, i, n, o, a) {
        var r = t(i, n);
        switch (e.css({
            width: r.width,
            height: r.height,
            top: "center" == o ? r.top : "left" == o ? 0 : o,
            left: "center" == a ? r.left : "left" == a ? 0 : a
        }), o) {
            case "top":
                e.css({
                    top: 0
                });
                break;
            case "center":
                e.css({
                    top: r.top
                });
                break;
            case "bottom":
                e.css({
                    bottom: 0
                });
                break;
            default:
                e.css({
                    top: o
                })
        }
        switch (a) {
            case "left":
                e.css({
                    left: 0
                });
                break;
            case "center":
                e.css({
                    left: r.left
                });
                break;
            case "right":
                e.css({
                    right: 0
                });
                break;
            default:
                e.css({
                    left: a
                })
        }
        e.trigger("resizePlayArea", [r])
    }

    function n(t, n, o, a, r) {
        e.checkHScreen(function() {
            setTimeout(function() {
                i(t, n, o, a, r)
            }, 500)
        })
    }
    e.resizePlayArea = n
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    function t(t) {
        //confirm('关注"豆豆游戏"微信，就可以收藏这个游戏哦！') && (t ? t() : top.location.href = e.URL.getConcern())
    }
    e.attentOurGame = t
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    function t(e, t) {
        t || (window.addEventListener("orientationchange", function() {
            i(e)
        }), window.addEventListener("resize", function() {
            i(e)
        })), i(e)
    }
    var i = function(e) {
        e && e(window.innerWidth > window.innerHeight)
    };
    e.checkHScreen = t
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    var t = function(t, i) {
        this.myCallback = i, this.tipsCount = 0, e.checkHScreen(e.proxy(this.callback, this), !1), t && (this.once = t)
    };
    t.prototype = {
        hscreen: function() {
            this.buildScreen(), this.once && this.tipsCount <= 0 ? this.screen && this.screen.show() : this.once || this.screen && this.screen.show(), this.tipsCount++
        },
        vscreen: function() {
            this.screen && this.screen.hide(), this.myCallback && this.myCallback(this.tipsCount)
        },
        getScreenOption: function() {
            return {
                id: "bt-h-scrren",
                html: "<table><tr><td><img class='bt-h-screen-img' src='" + e.URL.root + "/common/bt-play-h-screen.png' /></td></tr></table>",
                time: 0,
                lockId: "bt-hide-lock"
            }
        },
        buildScreen: function() {
            !this.screen && (this.screen = btGame.advertisement(this.getScreenOption()))
        },
        callback: function(e) {
            e ? this.vscreen() : this.hscreen()
        }
    };
    var i = function(e, i) {
        t.call(this, e, i)
    };
    i.__super__ = t, i.prototype = $.extend({}, t.prototype, {
        hscreen: function() {
            t.prototype.vscreen.call(this)
        },
        vscreen: function() {
            t.prototype.hscreen.call(this)
        },
        getScreenOption: function() {
            return {
                id: "bt-v-scrren",
                html: "<table><tr><td><img class='bt-v-screen-img' src='" + e.URL.root + "/common/bt-play-v-screen.png' /></td></tr></table>",
                time: 0,
                lockId: "bt-hide-lock"
            }
        }
    }), e.onlyHScreen = function(e, i) {
        return new t(e, i)
    }, e.onlyVScreen = function(e, t) {
        return new i(e, t)
    }
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    function t() {}
    e.playLogoAdv = t
}(btGame || (bgGame = {}));
var btGame;
~ function(e) {
    function t() {
        var t = e.advertisement({
            id: i,
            html: "<img class='bt-play-share-tip-img' src='" + e.URL.root + "/common/bt-play-share-tip.png' />",
            time: 0
        });
        t.show(), setTimeout(function() {
            t.elem.on("click touchstart", function() {
                return t.remove(), t = null, !1
            })
        }, 500), e.dc("share")
    }
    var i = "bt-play-share-tip";
    e.playShareTip = t
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    function t(t) {
		//alert(t);
       // confirm(t) && e.playShareTip()
    }
    e.playScoreMsg = t
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    var t = 0,
        i = {
            width: "66",
            src: e.getGamePath() + "icon.png",
            url: location.href,
            title: document.title,
            desc: document.title,
            callback: function() {
                0 >= t && e.attentOurGame(), t++, e.dc("realshare")
            }
        };
    window.dataForWeixin = i;
    var n = function() {
        WeixinJSBridge.on("menu:share:appmessage", function() {
            WeixinJSBridge.invoke("sendAppMessage", {
                img_url: i.src,
                img_width: i.width,
                img_height: i.width,
                link: i.url,
                desc: i.desc,
                title: i.title
            }, function() {
                i.callback()
            })
        }), WeixinJSBridge.on("menu:share:timeline", function() {
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: i.src,
                img_width: i.width,
                img_height: i.width,
                link: i.url,
                desc: i.desc,
                title: i.title
            }, function() {
                i.callback()
            })
        }), WeixinJSBridge.on("menu:share:weibo", function() {
            WeixinJSBridge.invoke("shareWeibo", {
                content: i.title,
                url: i.url
            }, function() {
                i.callback()
            })
        }), WeixinJSBridge.on("menu:share:facebook", function() {
            i.callback(), WeixinJSBridge.invoke("shareFB", {
                img_url: i.src,
                img_width: i.width,
                img_height: i.width,
                link: i.url,
                desc: i.desc,
                title: i.title
            }, function() {})
        })
    };
    "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", n, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", n), document.attachEvent("onWeixinJSBridgeReady", n)) : n(), e.setShare = function(e) {
        $.extend(i, e || {}), document.title = i.desc = i.title
    }
}(btGame || (btGame = {}));
var btGame;
~ function(e) {
    var t = e.getGameId();
    if (t) {
        var i = new Image;
        i.src = "./playGame.json?gameId=" + e.getGameId()
    }
}(btGame || (btGame = {}));
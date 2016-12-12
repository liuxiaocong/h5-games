"use strict";
var GAME = function () {
    var a = 1,
        b, c, d = !1,
        e, f = !0,
        g = [],
        h = !0,
        i = !1,
        j = 60,
        k;
    if (typeof $ != "function") throw "JQUERY_NOT_FOUND";
    var l = function (a, b) {
            var c = 0;
            a.forEach(function (d) {
                var e = new Image;
                e.onload = function () {
                    c++;
                    var d = Math.floor(c / a.length * 100);
                    $("#percent").text(d),
                        c == a.length && b()
                },
                    e.src = "assets/" + d
            })
        },
        m = function (a) {
            var b = a.match(/[0-9\.\-]+/);
            return b ? +b[0] : 0
        },
        n = function (a) {
            a.preventDefault()
        };
    jQuery.fn.reScale = function (a) {
        if (a == 1) return this;
        var b = function (b) {
            var c = m($(b).css("width")),
                d = m($(b).css("height")),
                e = m($(b).css("padding-top"));
            c == 0 && (c = b.width),
                d == 0 && (d = b.height),
                c > 0 && $(b).css("width", c * a),
                d > 0 && $(b).css("height", d * a),
                e > 0 && $(b).css("padding-top", e * a)
        };
        return this.each(function () {
            $(this).hasClass("cssAnimation") ? $(this).css("-webkit-transform", "scale(" + p.getScalingFactor() + ")") : b(this)
        }),
            this
    },
        jQuery.fn.rePosition = function (a) {
            return a == 1 ? this : (this.each(function () {
                var b = m($(this).css("top")),
                    c = m($(this).css("left"));
                $(this).css({
                    top: b * a,
                    left: c * a
                })
            }), this)
        },
        jQuery.fn.transitionEnd = function (a) {
            return this.each(function () {
                var b = m($(this).css("-webkit-transition-duration"));
                setTimeout(a, b * 1e3)
            }),
                this
        },
        jQuery.fn.touch = function (a) {
            (document.body.ontouchstart === undefined || document.body.ontouchstart === null) ? $(this).click(a) : $(this).bind("touchstart", a)
        };
    var o = function (a) {
            var b = window.location.hash.length,
                c = window.location.hash.substr(1, b - 1),
                d = c.split("&");
            for (var e = 0; e < d.length; e++) {
                var f = d[e].split("=");
                if (f[0] == a) return f[1]
            }
            return null
        },
        p = {
            getOrientation: function () {
                if (typeof window.orientation == "number") return window.orientation == 90 || window.orientation == -90 ? "landscape" : "portrait";
                var a = o("orientation");
                return a != null ? a : "landscape"
            },
            detectDevice: function () {
                return navigator.userAgent.indexOf("iPod") != -1 ? "iPod" : navigator.userAgent.indexOf("iPhone") != -1 ? "iPhone" : navigator.userAgent.indexOf("iPad") != -1 ? "iPad" : navigator.userAgent.indexOf("Android") != -1 ? "android" : navigator.userAgent.indexOf("Chrome") != -1 ? "chrome" : "unknown"
            },
            loadScreen: function (a, b, c) {
                typeof k == "function" && (k(), k = null),
                    k = c;
                if (!document.getElementById(a)) throw "invalid screenId(" + a + ") passed to GAME.loadScreen";
                $(".screen").removeClass("fadeIn").transitionEnd(function () {
                    var c = p.getScalingFactor();
                    $("#wrapper").empty();
                    var d = $("<div>").addClass("screen").append($("#" + a).html()).appendTo("#wrapper");
                    $("#wrapper img, .scalable, #wrapper div:not(.screen)").reScale(c).rePosition(c),
                        $(".movable").rePosition(c);
                    var e = p.detectDevice();
                    if (p.getScalingFactor() != 1 && (e == "iPod" || e == "iPhone")) {
                        $("img.background").css({
                            width: 320,
                            height: 450
                        })
                    } else {
                        if (document.body.clientWidth > 500) {
                            $("img.background").css({
                                height: innerHeight
                            })
                        } else {
                            $("img.background").css({
                                width: document.body.clientWidth,
                                height: innerHeight
                            })
                        }

                    }

                    setTimeout(function () {
                            d.addClass("fadeIn").transitionEnd(b);
                            var cw = document.body.clientWidth;
                            var w = $("img.background").width();
                            var t = document.body.clientHeight / 2 - $("#loader").height();
                            if (w != null && cw - w > 40) {
                                $(".screen").css({"marginLeft": "-" + w / 2 + "px", "position": "absolute", "left": "50%", "top": 0});
                                $("#loader").css({"left": "-105px", "top": t + "px"});
                            }
                        },
                        100)
                })
            },
            getScalingFactor: function () {
                return a
            },
            random: function (a, b) {
                return Math.floor(Math.random() * (b - a + 1)) + a
            },
            getGameWidth: function () {
                return b
            },
            getGameHeight: function () {
                return c
            },
            lockScreen: function () {
                d || (e = setInterval(function () {
                        window.scroll(0, 1)
                    },
                    500), document.addEventListener("touchmove", n), d = !0)
            },
            unlockScreen: function () {
                d && (clearInterval(e), document.removeEventListener("touchmove", n), d = !1)
            },
            isScreenLocked: function () {
                return d
            },
            createAudio: function (a, b) {
                var c = new Audio;
                return c.src = a,
                    b == !0 && c.addEventListener("ended",
                        function () {
                            this.currentTime = 0,
                                this.play()
                        },
                        !1),
                    g.push(c),
                {
                    play: function () {
                        return p.soundEnabled() && c.play(),
                            this
                    },
                    pause: function () {
                        return c.pause(),
                            this
                    }
                }
            },
            soundEnabled: function (a) {
                if (a == undefined) return f;
                if (typeof a == "boolean") return f = a,
                    a == !1 && g.forEach(function (a) {
                        a.pause()
                    }),
                    f;
                throw "soundEnabled expects a boolean parameter"
            },
            slidingScreen: function (a, b) {
                if (!document.getElementById(a)) throw "invalid id($1) passed to slidingScreen()".replace("$1", a);
                var c = $("#" + a).html(),
                    d = $("<div>").addClass("slideScreen").html(c).css("-webkit-transform", "translateY(-3000px)").reScale(p.getScalingFactor()).appendTo(".screen");
                return $("img, div", d).reScale(p.getScalingFactor()).rePosition(p.getScalingFactor()),
                    d.css({
                        width: innerWidth,
                        height: innerHeight
                    }),
                    this.slideIn = function () {
                        d.css("z-index", 500),
                            d.css("-webkit-transform", ""),
                            d.css("-webkit-transition", "-webkit-transform 1s")
                    },
                    this.slideOut = function () {
                        d.css("-webkit-transform", "translateY(-3000px)"),
                            d.css("-webkit-transition", "-webkit-transform 3s")
                    },
                    b.call(this),
                    this
            },
            landscapeMode: function (a) {
                return a == undefined ? h : (h = a, h)
            },
            portraitMode: function (a) {
                return a == undefined ? i : (i = a, i)
            }
        },
        q = function (a) {
            var b = p.detectDevice(),
                c,
                d,
                e = 0;
            b == "android" && (e = j),
                b == "iPod" || b == "iPhone" ? (c = 320, d = 450, a(c, d)) : p.getOrientation() == "portrait" ? window.addEventListener("orientationchange",
                    function () {
                        p.getOrientation() == "landscape" && c == undefined && d == undefined && (window.scroll(0, 1), setTimeout(function () {
                                c = innerWidth,
                                    d = innerHeight + e,
                                    a(c, d)
                            },
                            500))
                    }) : (window.scroll(0, 1), setTimeout(function () {
                        c = innerWidth,
                            d = innerHeight + e,
                            a(c, d)
                    },
                    500))
        },
        r = function (a) {
            var b = p.detectDevice(),
                c,
                d,
                e = 0;
            b == "android" && (e = j),
                b == "iPod" || b == "iPhone" ? (c = 320, d = 450, a(c, d)) : p.getOrientation() == "landscape" ? window.addEventListener("orientationchange",
                    function () {
                        p.getOrientation() == "portrait" && c == undefined && d == undefined && (window.scroll(0, 1), setTimeout(function () {
                                c = innerWidth,
                                    d = innerHeight + e,
                                    a(c, d)
                            },
                            500))
                    }) : (window.scroll(0, 1), setTimeout(function () {
                        c = innerWidth,
                            d = innerHeight + e,
                            a(c, d)
                    },
                    500))
        },
        s = function (a, b, c, d) {
            var e = c / a,
                f = b * e;
            return f > d && (e = d / b),
                Math.round(e * 100) / 100
        };
    return $(function () {
        var d = !1;
        if (typeof p.setup != "function") throw "GAME.setup() function not found";
        var e = p.setup();
        typeof e.portrait == "boolean" ? p.portraitMode(e.portrait) : p.portraitMode(!1),
            typeof e.landscape == "boolean" ? p.landscapeMode(e.landscape) : p.landscapeMode(!0);
        var f = function () {
            p.getOrientation() == "portrait" ? d ? p.portraitMode() ? ($("#wrapper").css("display", "table-cell"), $("#portrait, #landscape").css("display", "none")) : ($("#portrait").css({
                display: "table-cell",
                width: innerWidth,
                height: innerHeight
            }), $("#wrapper, #landscape").css("display", "none")) : ($("#portrait").css({
                display: "table-cell",
                width: innerWidth,
                height: innerHeight
            }), $("#landscape").css("display", "none")) : d ? p.landscapeMode() ? ($("#wrapper").css("display", "table-cell"), $("#portrait, #landscape").css("display", "none")) : (setTimeout(function () {
                    $("#landscape").css({
                        display: "table-cell",
                        width: innerWidth,
                        height: innerHeight
                    })
                },
                200), $("#wrapper, #portrait").css("display", "none")) : ($("#landscape").css({
                display: "table-cell",
                width: innerWidth,
                height: innerHeight
            }), $("#portrait").css("display", "none"))
        };
        f(),
            window.addEventListener("orientationchange", f),
            setTimeout(function () {
                    d = !0,
                        f(),
                        $("#portrait img").prop("src", "assets/portrait.png"),
                        $("#landscape img").prop("src", "assets/landscape.png");
                    var g = function (d, f) {
                        if (typeof e.assets != "object") throw "expecting an array of 'assets' from GAME.setup";
                        if (typeof e.assetsLoaded != "function") throw "expecting 'assetsLoaded' as a function from GAME.setup";
                        if (typeof e.width == "number") b = e.width;
                        else throw "expecting a number 'width' from GAME.setup";
                        if (typeof e.height == "number") c = e.height;
                        else throw "expecting a number 'height' from GAME.setup";
                        o("scale") != null ? a = o("scale") : typeof e.scalingFactor == "number" ? a = e.scalingFactor : a = s(p.getGameWidth(), p.getGameHeight(), d, f),
                            typeof e.enableSound == "boolean" && p.soundEnabled(e.enableSound),
                            $("body").css("font-size", p.getScalingFactor() + "em"),
                            $("#wrapper").css({
                                width: d,
                                height: f
                            }),
                            p.loadScreen("loaderHtml",
                                function () {
                                    window.scroll(0, 1),
                                        typeof e.lockScreen == "boolean" ? e.lockScreen && p.lockScreen() : p.lockScreen(),
                                        l(e.assets, e.assetsLoaded)
                                })
                    };
                    p.landscapeMode() && !p.portraitMode() ? q(g) : p.portraitMode() && !p.landscapeMode() ? r(g) : p.getOrientation() == "landscape" ? q(g) : r(g)
                },
                2e3)
    }),
        p
}()
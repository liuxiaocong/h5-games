"use strict",
    function () {
        var a = 1,
            b = JSON.stringify([]),
            c = 0,
            d,
            e,
            f,
            g = new Array,
            h = "",
            i = new Array,
            j = new Array,
            k = new Array,
            l = new Array;
        l = [];
        var m = new Array,
            n = new Array,
            o = new Array,
            p = new Array,
            q = new Array,
            r = new Array,
            s = new Array,
            t = new Array,
            u = new Array,
            v = new Array,
            w = new Array,
            x = !1,
            y = GAME.detectDevice(),
            z = 0,
            A = 0,
            B = 0,
            C,
            D = "",
            E = !1,
            F,
            G = "",
            H = !1,
            I = !1,
            J = !1,
            K = !1,
            L = 0,
            M = 0,
            N = 0,
            O = !1,
            P = 0,
            Q = 0,
            R = 0,
            S = 0,
            T = 0,
            U = new Array;
        U = [n, o, n, o, n, o, n, o, n, o, n, o];
        var V = ["ph1", "ph2", "ph3", "ph4", "ph5", "ph6", "ph1", "ph2", "ph3", "ph4"],
            W = ["s1", "s2", "s3", "s4", "s5", "s6"],
            X = ["h1", "h2", "h3", "h4", "h5", "h6"],
            Y = 0,
            Z = -1,
            _ = 0,
            ba = 0,
            bb = GAME.createAudio("assets/restaurantemexicanasound.mp3", !0).pause(),
            bc = 0,
            y = GAME.detectDevice(),
            bd = new Array;
        GAME.setup = function () {
            return {
                assets: ["olive.png", "peppers.png", "bg_main.png", "restaurante_mexicana.png", "baked-chicken.png", "baked-meat.png", "chicken.png", "Dish.png", "cheese.png", "tomato-sauce.png", "Tomato.png", "Onion.png", "Olive-top.png", "olive.png", "Dish.png", "Tortilla.png", "restaurante_mexicana.png", "Sour_cream_sauce.png", "cheese-T.png", "Tomato-T.png", "Onion-T.png", "peppers.png", "Sour_cream_sauce.png", "splash_screen-bgpatch.png", "Bad_job.png", "Good_job.png", "Burrito.png", "pause_text.png", "Level_target.png", "lose_Burrito.png", "How_to_play.png", "Sauce.png", "Beans.png", "bgdesign.png", "Beans_new.png", "Cheese_new.png", "Chicken_New.png", "Meat_new.png", "Olives_New.png", "Onion_New.png", "Peppers_New.png", "Tomato_new.png", "enchilada_new.png", "Cream_new.png", "Time_sprite.png", "Uibg.png", "Music_no.png", "Kot_in.png", "Kot_in_small.png", "Arrow.png", "Beans-T.png"],
                assetsLoaded: GAME.loadTitleScreen,
                width: 640,
                height: 860,
                landscape: function () {
                    return GAME.detectDevice() == "chrome"
                }(),
                portrait: !0,
                enableSound: !1,
                lockScreen: !0
            }
        },
            GAME.addHighscore = function (a) {
            },
            GAME.listScores = function () {
            },
            GAME.insertScore = function (a) {
                window.parent.SpilGames && (console.log("highscore submitted:" + a), window.parent.SpilGames.Highscores.insert({
                    score: "" + a,
                    onsuccess: function (a) {
                    },
                    onfailure: function (a) {
                    }
                }))
            },
            GAME.blankScreen = function () {
                GAME.loadScreen("blankScreenHtml",
                    function () {
                        GAME.scoreScreen()
                    })
            },
            GAME.loadTitleScreen = function () {
                GAME.loadScreen("titleScreenHtml",
                    function () {
                        y == "iPad" && $("#titlediv").css({
                            left: 30
                        }),
                            y == "android" && $("#titlediv").css({
                                top: 100 * GAME.getScalingFactor()
                            }),
                            setTimeout(function () {
                                    $("#blank").hide()
                                },
                                1e3),
                            a = 1,
                            N = 0,
                            A = 0;
                        var pl = $("#play").css("left");
                        console.log(pl);
                        var hl = parseInt(pl) - (($("#howto").width() - $("#play").width())/2);
                        $("#howto").css("left", hl+"px");
                        ((document.ontouchstart === undefined || document.ontouchstart === null) || document.ontouchstart === null) ? ($("#play").click(function () {
                            O = !0,
                                $("#play").prop("src", "assets/play_hover.png"),
                                GAME.loadTargetScreen()
                        }), $("#howto").click(function () {
                            $("#howto").prop("src", "assets/howtoplay_hover.png"),
                                GAME.loadInstructionScreen()
                        }), $("#highScore").click(function () {
                            $("#highScore").prop("src", "assets/highscore_hover.png"),
                                GAME.listScores()
                        })) : ($("#play").bind("touchstart",
                            function () {
                                $("#play").prop("src", "assets/play_hover.png")
                            }), $("#play").bind("touchend",
                            function () {
                                GAME.loadTargetScreen()
                            }), $("#howto").bind("touchstart",
                            function () {
                                $("#howto").prop("src", "assets/howtoplay_hover.png")
                            }), $("#howto").bind("touchend",
                            function () {
                                GAME.loadInstructionScreen()
                            }), $("#highScore").bind("touchstart",
                            function () {
                                $("#highScore").prop("src", "assets/highscore_hover.png")
                            }), $("#highScore").bind("touchend",
                            function () {
                                GAME.listScores()
                            })),
                            T == 0 && (GAME.soundEnabled(!0), T++),
                            T >= 2 && GAME.soundEnabled() == !1 && $("#music").prop("src", "assets/music_hover.png"),
                            GAME.soundEnabled() && bb.play(),
                            $("#music").click(function () {
                                GAME.soundEnabled() ? (GAME.soundEnabled(!1), $("#music").prop("src", "assets/music_hover.png")) : (GAME.soundEnabled(!0), bb.play(), $("#music").prop("src", "assets/music.png"))
                            })
                    })
            },
            GAME.loadTargetScreen = function () {
                GAME.loadScreen("targetHtml",
                    function () {
                        y == "iPad" && $("#targetdiv").css({
                            left: 30
                        }),
                            y == "android" && $("#targetdiv").css({
                                top: 100 * GAME.getScalingFactor()
                            }),
                            setTimeout(function () {
                                    $("#blank").remove()
                                },
                                1e3);
                        var b = 0;
                        a == 1 ? (O = !1, $("#levelnum").prop("src", "assets/01.png"), L = 0, M = 0, b = 100, $("#tgt").prop("src", "assets/100.png"), $("#tgt").css({
                            left: 247 * GAME.getScalingFactor(),
                            top: 576 * GAME.getScalingFactor(),
                            width: 140 * GAME.getScalingFactor(),
                            height: 67 * GAME.getScalingFactor()
                        })) : a == 2 ? (O = !1, $("#levelnum").prop("src", "assets/02.png"), $("#levelnum").css({
                            width: 47 * GAME.getScalingFactor(),
                            height: 55 * GAME.getScalingFactor(),
                            left: 420 * GAME.getScalingFactor(),
                            top: 113 * GAME.getScalingFactor()
                        }), L = 0, M = 0, b = 150, $("#tgt").prop("src", "assets/150.png"), $("#tgt").css({
                            left: 247 * GAME.getScalingFactor(),
                            top: 576 * GAME.getScalingFactor(),
                            width: 140 * GAME.getScalingFactor(),
                            height: 67 * GAME.getScalingFactor()
                        })) : a == 3 ? (O = !1, $("#levelnum").prop("src", "assets/03.png"), $("#levelnum").css({
                            width: 45 * GAME.getScalingFactor(),
                            height: 56 * GAME.getScalingFactor(),
                            left: 420 * GAME.getScalingFactor(),
                            top: 113 * GAME.getScalingFactor()
                        }), b = 200, L = 0, M = 0, $("#tgt").prop("src", "assets/200.png"), $("#tgt").css({
                            left: 247 * GAME.getScalingFactor(),
                            top: 576 * GAME.getScalingFactor(),
                            width: 149 * GAME.getScalingFactor(),
                            height: 67 * GAME.getScalingFactor()
                        })) : a == 4 ? (O = !1, $("#levelnum").prop("src", "assets/04.png"), $("#levelnum").css({
                            width: 48 * GAME.getScalingFactor(),
                            height: 54 * GAME.getScalingFactor(),
                            left: 417 * GAME.getScalingFactor(),
                            top: 115 * GAME.getScalingFactor()
                        }), b = 250, L = 0, M = 0, $("#tgt").prop("src", "assets/250.png"), $("#tgt").css({
                            left: 247 * GAME.getScalingFactor(),
                            top: 576 * GAME.getScalingFactor(),
                            width: 149 * GAME.getScalingFactor(),
                            height: 67 * GAME.getScalingFactor()
                        })) : a == 5 ? (O = !1, $("#levelnum").prop("src", "assets/05.png"), $("#levelnum").css({
                            width: 45 * GAME.getScalingFactor(),
                            height: 55 * GAME.getScalingFactor(),
                            left: 420 * GAME.getScalingFactor(),
                            top: 116 * GAME.getScalingFactor()
                        }), b = 300, L = 0, M = 0, $("#tgt").prop("src", "assets/300.png"), $("#tgt").css({
                            left: 247 * GAME.getScalingFactor(),
                            top: 576 * GAME.getScalingFactor(),
                            width: 151 * GAME.getScalingFactor(),
                            height: 67 * GAME.getScalingFactor()
                        })) : a == 6 ? (O = !1, $("#levelnum").prop("src", "assets/06.png"), $("#levelnum").css({
                            width: 48 * GAME.getScalingFactor(),
                            height: 55 * GAME.getScalingFactor(),
                            left: 417 * GAME.getScalingFactor(),
                            top: 114 * GAME.getScalingFactor()
                        }), b = 400, L = 0, M = 0, $("#tgt").prop("src", "assets/400.png"), $("#tgt").css({
                            left: 247 * GAME.getScalingFactor(),
                            top: 576 * GAME.getScalingFactor(),
                            width: 149 * GAME.getScalingFactor(),
                            height: 67 * GAME.getScalingFactor()
                        })) : a == 7 && (O = !1, $("#levelnum").prop("src", "assets/07.png"), $("#levelnum").css({
                            width: 44 * GAME.getScalingFactor(),
                            height: 54 * GAME.getScalingFactor(),
                            left: 423 * GAME.getScalingFactor(),
                            top: 116 * GAME.getScalingFactor()
                        }), b = 500, L = 0, M = 0, $("#tgt").prop("src", "assets/500.png"), $("#tgt").css({
                            left: 247 * GAME.getScalingFactor(),
                            top: 576 * GAME.getScalingFactor(),
                            width: 152 * GAME.getScalingFactor(),
                            height: 67 * GAME.getScalingFactor()
                        })),
                            ((document.ontouchstart === undefined || document.ontouchstart === null) || document.ontouchstart === null) ? $("#playbtn").click(function () {
                                O == !1 && (O = !0, L = 0, M = 0, $("#playbtn").prop("src", "assets/play_hover.png"), GAME.loadGameScreen())
                            }) : ($("#playbtn").bind("touchstart",
                                function () {
                                    $("#playbtn").prop("src", "assets/play_hover.png")
                                }), $("#playbtn").bind("touchend",
                                function () {
                                    O == !1 && (O = !0, L = 0, M = 0, GAME.loadGameScreen())
                                }))
                    })
            },
            GAME.loadInstructionScreen = function () {
                GAME.loadScreen("instructionScreenHtml",
                    function () {
                        y == "iPad" && $("#instructions").css({
                            left: 30
                        }),
                            y == "android" && $("#instructions").css({
                                top: 100 * GAME.getScalingFactor()
                            }),
                            setTimeout(function () {
                                    $("#blank").hide()
                                },
                                1e3),
                            (document.ontouchstart === undefined || document.ontouchstart === null) ? $("#mainmenu").click(function () {
                                $("#mainmenu").prop("src", "assets/mainmenu_hover.png"),
                                    T++,
                                    GAME.loadTitleScreen()
                            }) : ($("#mainmenu").bind("touchstart",
                                function () {
                                    $("#mainmenu").prop("src", "assets/mainmenu_hover.png")
                                }), $("#mainmenu").bind("touchend",
                                function () {
                                    GAME.loadTitleScreen()
                                }))
                    })
            },
            GAME.startTimer = function () {
                c++;
                if (a == 1 || a == 2) {
                    console.log(c);
                    if (c % 10 == 0 && c < 121) {
                        var b = parseInt($(".myClock").css("left"));
                        b -= 100 * GAME.getScalingFactor(),
                            $(".myClock").css("left", b)
                    }
                    c % S == 0 && c < 120 && (Z < 9 && GAME.generateKOT(), Z >= 9 && setTimeout(function () {
                            GAME.loadLoseScreen()
                        },
                        1e3)),
                        c > 120 && GAME.loadLoseScreen()
                }
                if (a == 3 || a == 4) {
                    console.log(c);
                    if (c % 15 == 0 && c < 181) {
                        var b = parseInt($(".myClock").css("left"));
                        b -= 100 * GAME.getScalingFactor(),
                            $(".myClock").css("left", b)
                    }
                    c % S == 0 && c < 180 && (Z < 9 && GAME.generateKOT(), Z >= 9 && setTimeout(function () {
                            GAME.loadLoseScreen()
                        },
                        1e3)),
                        c > 180 && GAME.loadLoseScreen()
                }
                if (a == 5 || a == 6) {
                    console.log(c);
                    if (c % 20 == 0 && c < 241) {
                        var b = parseInt($(".myClock").css("left"));
                        b -= 100 * GAME.getScalingFactor(),
                            $(".myClock").css("left", b)
                    }
                    c % S == 0 && c < 240 && (Z < 9 && GAME.generateKOT(), Z >= 9 && setTimeout(function () {
                            GAME.loadLoseScreen()
                        },
                        1e3)),
                        c > 240 && GAME.loadLoseScreen()
                }
                if (a == 7) {
                    console.log(c);
                    if (c % 25 == 0 && c < 301) {
                        var b = parseInt($(".myClock").css("left"));
                        b -= 100 * GAME.getScalingFactor(),
                            $(".myClock").css("left", b)
                    }
                    c % S == 0 && c < 300 && (Z < 9 && GAME.generateKOT(), Z >= 9 && setTimeout(function () {
                            GAME.loadLoseScreen()
                        },
                        1e3)),
                        c > 300 && GAME.loadLoseScreen()
                }
            },
            GAME.loadLoseScreen = function () {
                var b = document.getElementById("UI");
                for (var e = bd.length - 1; e >= 0; e--) b.removeChild(bd[e]),
                    bd.splice(e, 1);
                c = 0,
                    clearInterval(f),
                    clearInterval(d),
                    GAME.loadScreen("loseScreenHtml",
                        function () {
                            A > 0 && (console.log("highscore submitted from losescreen---totalScore-" + A), GAME.addHighscore(A)),
                                j.splice(0, 3),
                                y == "iPad" && ($("#losediv").css({
                                    left: 30
                                }), $("#losemenudiv").css({
                                    left: 30
                                })),
                                y == "android" && ($("#losediv").css({
                                    top: 100 * GAME.getScalingFactor()
                                }), $("#losemenudiv").css({
                                    top: 100 * GAME.getScalingFactor()
                                })),
                                setTimeout(function () {
                                        $("#blank").remove()
                                    },
                                    1e3),
                                $("#levelScore").text(z),
                                a == 1 && (A = 0),
                                $("#totalScore").text(A),
                                (document.ontouchstart === undefined || document.ontouchstart === null) ? $("#retry_btn").click(function () {
                                    O = !1,
                                        N = 0,
                                        z = 0,
                                        L = 0,
                                        M = 0,
                                        $("#retry_btn").prop("src", "assets/retry_hover.png"),
                                        GAME.loadTargetScreen(),
                                        setTimeout(function () {
                                                $("#retry_btn").prop("src", "assets/retry.png")
                                            },
                                            200)
                                }) : ($("#retry_btn").bind("touchstart",
                                    function () {
                                        $("#retry_btn").prop("src", "assets/retry_hover.png")
                                    }), $("#retry_btn").bind("touchend",
                                    function () {
                                        $("#retry_btn").prop("src", "assets/retry.png"),
                                            O = !1,
                                            N = 0,
                                            z = 0,
                                            L = 0,
                                            M = 0,
                                            GAME.loadTargetScreen()
                                    })),
                                ((document.ontouchstart === undefined || document.ontouchstart === null) || document.ontouchstart === null) ? ($("#yes_btn").click(function () {
                                    O = !1,
                                        z = 0,
                                        N = 0,
                                        A = 0,
                                        L = 0,
                                        M = 0,
                                        $("#yes_btn").prop("src", "assets/yes_hover.png"),
                                        GAME.loadTitleScreen(),
                                        setTimeout(function () {
                                                $("#yes_btn").prop("src", "assets/yes.png")
                                            },
                                            200)
                                }), $("#no_btn").click(function () {
                                    $("#no_btn").prop("src", "assets/no_hover.png"),
                                        setTimeout(function () {
                                                $("#no_btn").prop("src", "assets/no.png")
                                            },
                                            200),
                                        $(".popupScreen").removeClass("slideIn")
                                })) : ($("#yes_btn").bind("touchstart",
                                    function () {
                                        $("#yes_btn").prop("src", "assets/yes_hover.png")
                                    }), $("#yes_btn").bind("touchend",
                                    function () {
                                        $("#yes_btn").prop("src", "assets/yes.png"),
                                            O = !1,
                                            N = 0,
                                            z = 0,
                                            A = 0,
                                            M = 0,
                                            L = 0,
                                            GAME.loadTitleScreen()
                                    }), $("#no_btn").bind("touchstart",
                                    function () {
                                        $("#no_btn").prop("src", "assets/no_hover.png")
                                    }), $("#no_btn").bind("touchend",
                                    function () {
                                        $("#no_btn").prop("src", "assets/no.png"),
                                            $(".popupScreen").removeClass("slideIn")
                                    })),
                                ((document.ontouchstart === undefined || document.ontouchstart === null) || document.ontouchstart === null) ? $("#mainmenu").click(function () {
                                    $("#mainmenu").prop("src", "assets/mainmenu_hover.png"),
                                        c = 0,
                                        clearInterval(d),
                                        $(".popupScreen").addClass("slideIn"),
                                        setTimeout(function () {
                                                $("#mainmenu").prop("src", "assets/mainmenu.png")
                                            },
                                            200)
                                }) : ($("#mainmenu").bind("touchstart",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu_hover.png")
                                    }), $("#mainmenu").bind("touchend",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu.png"),
                                            c = 0,
                                            clearInterval(d),
                                            $(".popupScreen").addClass("slideIn")
                                    }))
                        })
            },
            GAME.generateBigKot = function (a) {
                if (l.length == 0) {
                    _ += 1;
                    var b = document.createElement("img");
                    b.src = "assets/Kot_in.png",
                        $(b).css("left", 438),
                        $(b).css("top", 118),
                        $(b).css("width", 195),
                        $(b).css("height", 276);
                    var c = document.getElementById("UI");
                    c.appendChild(b),
                        $(b).reScale(GAME.getScalingFactor()).rePosition(GAME.getScalingFactor()).addClass("unclickable"),
                        m.push(b);
                    for (var d = 0; d < a.length; d++) l[d] = a[d];
                    GAME.generateBigKotElements()
                }
            },
            GAME.generateSmallKot = function () {
                Y += 1,
                    Z += 1;
                var a = document.createElement("img");
                a.src = "assets/Kotsmall_new.png";
                var b = parseInt($(m[0]).css("left"));
                $(a).css("left", b - parseInt($(a).css("width")) - 60 * GAME.getScalingFactor() * ba),
                    $(a).css("top", 9 * GAME.getScalingFactor()),
                    $(a).css("width", 87 * GAME.getScalingFactor()),
                    $(a).css("height", 103 * GAME.getScalingFactor()),
                    i[Z] = new Array,
                    i[Z].push(a);
                var c = document.getElementById("UI");
                c.appendChild(a),
                    $(a).reScale(GAME.getScalingFactor()).addClass("unclickable"),
                    GAME.generateSmallKotElements()
            },
            GAME.generateKOT = function () {
                ba += 1,
                    L == 6 && (L = 0),
                    Y += 1,
                    Z += 1,
                    N++,
                    N > 7 && $("#orderstext").addClass("flash"),
                    $("#orderstext").text(N);
                var a = document.createElement("img");
                console.log("temp at small kot:" + L),
                    a.src = "assets/" + V[L] + ".png";
                var b = parseInt($(m[0]).css("left"));
                y == "iPod" || y == "iPhone" || y == "android" ? ($(a).css("left", 330 * GAME.getScalingFactor() - Z * 100 * GAME.getScalingFactor()), $(a).css("top", 130 * GAME.getScalingFactor()), $(a).css("width", 187 * GAME.getScalingFactor()), $(a).css("height", 203 * GAME.getScalingFactor()), $(a).css("z-index", 100)) : ($(a).css("left", 330 * GAME.getScalingFactor() - Z * 100 * GAME.getScalingFactor()), $(a).css("top", 136 * GAME.getScalingFactor()), $(a).css("width", 87 * GAME.getScalingFactor()), $(a).css("height", 103 * GAME.getScalingFactor()), $(a).css("z-index", 100)),
                    i[Z] = new Array,
                    i[Z].push(a);
                var c = document.getElementById("UI");
                c.appendChild(a),
                    $(a).reScale(GAME.getScalingFactor()).addClass("unclickable"),
                    L++,
                    GAME.generateSmallKotElements()
            },
            GAME.generateSmallKotElements = function () {
                for (var a = 0; a < U[Y].length; a++) {
                    var b = document.createElement("img"),
                        c = document.createElement("div"),
                        d = parseInt($(i[Z][0]).css("left")),
                        e = parseInt($(i[Z][0]).css("top")),
                        f = parseInt($(i[Z][0]).css("width"));
                    switch (U[Y][a]) {
                        case "chicken":
                            b.src = "assets/Chicken_New.png",
                                b.name = "chicken",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 80) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "meat":
                            b.src = "assets/Meat_new.png",
                                b.name = "meat",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 80) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "cheese":
                            b.src = "assets/Cheese_new.png",
                                b.name = "cheese",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 50) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "tomato":
                            b.src = "assets/Tomato_new.png",
                                b.name = "tomato",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 50) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "onion":
                            b.src = "assets/Onion_New.png",
                                b.name = "onion",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 50) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "beans":
                            b.src = "assets/Beans_new.png",
                                b.name = "beans",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 50) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "peppers":
                            b.src = "assets/Peppers_New.png",
                                b.name = "peppers",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 50) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "olive":
                            b.src = "assets/Olives_New.png",
                                b.name = "olive",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 50) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "chsauce":
                            b.src = "assets/Cream_new.png",
                                b.name = "chsauce",
                                $(b).css("left", d + f / 2 - 10 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 40) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 20),
                                $(b).css("height", 15);
                            break;
                        case "tmsauce":
                            b.src = "assets/enchilada_new.png",
                                b.name = "tmsauce",
                                $(b).css("left", d + f / 2 - 2.75 * GAME.getScalingFactor()),
                                $(b).css("top", (e + 30) * GAME.getScalingFactor() + 16 * a * GAME.getScalingFactor()),
                                $(b).css("width", 5.5),
                                $(b).css("height", 15)
                    }
                    i[Z].push(b),
                        $(b).reScale(GAME.getScalingFactor()).addClass("unclickable");
                    var g = document.getElementById("UI");
                    $(c).reScale(GAME.getScalingFactor()).addClass("unclickable"),
                        g.appendChild(b)
                }
            },
            GAME.generateBigKotElements = function () {
                for (var a = 0; a < l.length; a++) {
                    var b = document.createElement("img"),
                        c = document.createElement("div");
                    $(c).css("font-weight", "bold");
                    switch (l[a]) {
                        case "chicken":
                            b.src = "assets/Chicken_New.png",
                                b.name = "chicken",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "meat":
                            b.src = "assets/Meat_new.png",
                                b.name = "meat",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "cheese":
                            b.src = "assets/Cheese_new.png",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "tomato":
                            b.src = "assets/Tomato_new.png",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "onion":
                            b.src = "assets/Onion_New.png",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "beans":
                            b.src = "assets/Beans_new.png",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "peppers":
                            b.src = "assets/Peppers_New.png",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "olive":
                            b.src = "assets/Olives_New.png",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 71),
                                $(b).css("height", 37),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "chsauce":
                            b.src = "assets/Cream_new.png",
                                $(b).css("left", 495),
                                $(b).css("top", 140 + 50 * a),
                                $(b).css("width", 50),
                                $(b).css("height", 38),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1);
                            break;
                        case "tmsauce":
                            b.src = "assets/enchilada_new.png",
                                $(b).css("left", 521),
                                $(b).css("top", 130 + 50 * a),
                                $(b).css("width", 19),
                                $(b).css("height", 50),
                                $(c).css("left", 478),
                                $(c).css("top", 150 + 50 * a),
                                $(c).text(a + 1)
                    }
                    m.push(b);
                    var d = document.getElementById("UI");
                    $(b).reScale(GAME.getScalingFactor()).rePosition(GAME.getScalingFactor()).addClass("unclickable"),
                        $(c).reScale(GAME.getScalingFactor()).rePosition(GAME.getScalingFactor()).addClass("unclickable"),
                        d.appendChild(b),
                        d.appendChild(c)
                }
            },
            GAME.stopBlinking = function () {
                switch (h) {
                    case "chicken":
                        $(".chicken").removeClass("heart");
                        break;
                    case "meat":
                        $(".meat").removeClass("heart");
                        break;
                    case "cheese":
                        $(".cheese").removeClass("heart");
                        break;
                    case "tomato":
                        $(".tomato").removeClass("heart");
                        break;
                    case "onion":
                        $(".onion").removeClass("heart");
                        break;
                    case "beans":
                        $(".beans").removeClass("heart");
                        break;
                    case "peppers":
                        $(".peppers").removeClass("heart");
                        break;
                    case "olive":
                        $(".olive").removeClass("heart");
                        break;
                    case "chsauce":
                        $(".chsauce").removeClass("heart");
                        break;
                    case "tmsauce":
                        $(".tmsauce").removeClass("heart")
                }
            },
            GAME.placeIngredient = function () {
                if (x) {
                    var a = document.createElement("img");
                    switch (h) {
                        case "chicken":
                            j.push("chicken"),
                                $(".chicken").addClass("hold"),
                                $(".chicken").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 100
                                }),
                                setTimeout(function () {
                                        $(".chicken").removeClass("hold"),
                                            $(".chicken").css({
                                                left: 99 * GAME.getScalingFactor(),
                                                top: 432 * GAME.getScalingFactor(),
                                                "z-index": 100
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/baked-chicken.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 244 * GAME.getScalingFactor()),
                                            $(a).css("height", 54 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "meat":
                            j.push("meat"),
                                $(".meat").addClass("hold"),
                                $(".meat").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 100
                                }),
                                setTimeout(function () {
                                        $(".meat").removeClass("hold"),
                                            $(".meat").css({
                                                left: 272 * GAME.getScalingFactor(),
                                                top: 432 * GAME.getScalingFactor(),
                                                "z-index": 100
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/baked-meat.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 251 * GAME.getScalingFactor()),
                                            $(a).css("height", 54 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "cheese":
                            j.push("cheese"),
                                $(".cheese").addClass("hold"),
                                $(".cheese").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 300
                                }),
                                setTimeout(function () {
                                        $(".cheese").removeClass("hold"),
                                            $(".cheese").css({
                                                left: 452 * GAME.getScalingFactor(),
                                                top: 713 * GAME.getScalingFactor(),
                                                "z-index": 300
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/cheese-T.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 238 * GAME.getScalingFactor()),
                                            $(a).css("height", 43 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "tomato":
                            j.push("tomato"),
                                $(".tomato").addClass("hold"),
                                $(".tomato").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 100
                                }),
                                setTimeout(function () {
                                        $(".tomato").removeClass("hold"),
                                            $(".tomato").css({
                                                left: 438 * GAME.getScalingFactor(),
                                                top: 436 * GAME.getScalingFactor(),
                                                "z-index": 100
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/Tomato-T.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 239 * GAME.getScalingFactor()),
                                            $(a).css("height", 51 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "onion":
                            j.push("onion"),
                                $(".onion").addClass("hold"),
                                $(".onion").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 200
                                }),
                                setTimeout(function () {
                                        $(".onion").removeClass("hold"),
                                            $(".onion").css({
                                                left: 268 * GAME.getScalingFactor(),
                                                top: 575 * GAME.getScalingFactor(),
                                                "z-index": 200
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/Onion-T.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 263 * GAME.getScalingFactor()),
                                            $(a).css("height", 66 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "beans":
                            j.push("beans"),
                                $(".beans").addClass("hold"),
                                $(".beans").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 200
                                }),
                                setTimeout(function () {
                                        $(".beans").removeClass("hold"),
                                            $(".beans").css({
                                                left: 98 * GAME.getScalingFactor(),
                                                top: 578 * GAME.getScalingFactor(),
                                                "z-index": 200
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/Beans-T.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 265 * GAME.getScalingFactor()),
                                            $(a).css("height", 63 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "peppers":
                            j.push("peppers"),
                                $(".peppers").addClass("hold"),
                                $(".peppers").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 300
                                }),
                                setTimeout(function () {
                                        $(".peppers").removeClass("hold"),
                                            $(".peppers").css({
                                                left: 84 * GAME.getScalingFactor(),
                                                top: 709 * GAME.getScalingFactor(),
                                                "z-index": 300
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/peppers-T.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 254 * GAME.getScalingFactor()),
                                            $(a).css("height", 58 * GAME.getScalingFactor()),
                                            $(a).css("z-index", 300),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "olive":
                            j.push("olive"),
                                $(".olive").addClass("hold"),
                                $(".olive").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 300
                                }),
                                setTimeout(function () {
                                        $(".olive").removeClass("hold"),
                                            $(".olive").css({
                                                left: 269 * GAME.getScalingFactor(),
                                                top: 713 * GAME.getScalingFactor(),
                                                "z-index": 300
                                            })
                                    },
                                    1e3),
                                setTimeout(function () {
                                        a.src = "assets/Olive-top.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 243 * GAME.getScalingFactor()),
                                            $(a).css("height", 60 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    1e3),
                                GAME.stopBlinking();
                            break;
                        case "chsauce":
                            j.push("chsauce"),
                                $(".chsauce").addClass("hold"),
                                $(".chsauce").css({
                                    left: 150 * GAME.getScalingFactor(),
                                    top: 310 * GAME.getScalingFactor(),
                                    "z-index": 301
                                }),
                                setTimeout(function () {
                                        $(".chsauce").removeClass("hold"),
                                            $(".chsauce").css({
                                                left: 454 * GAME.getScalingFactor(),
                                                top: 549 * GAME.getScalingFactor(),
                                                "z-index": 500
                                            })
                                    },
                                    100),
                                setTimeout(function () {
                                        a.src = "assets/Sour_cream_sauce.png",
                                            $(a).css("left", 150 * GAME.getScalingFactor()),
                                            $(a).css("top", 310 * GAME.getScalingFactor()),
                                            $(a).css("width", 251 * GAME.getScalingFactor()),
                                            $(a).css("height", 35 * GAME.getScalingFactor()),
                                            k.push(a)
                                    },
                                    100),
                                GAME.stopBlinking();
                            break;
                        case "tmsauce":
                            j.push("tmsauce"),
                                a.src = "assets/tomato-sauce.png",
                                $(a).css("left", 150),
                                $(a).css("top", 310),
                                $(a).css("width", 233),
                                $(a).css("height", 33),
                                $(a).css("z-index", 400),
                                k.push(a),
                                GAME.stopBlinking()
                    }
                    var b = document.getElementById("UI");
                    $(a).reScale(GAME.getScalingFactor()).rePosition(GAME.getScalingFactor()).addClass("unclickable"),
                        b.appendChild(a),
                        h = "";
                    var c = !0;
                    for (var d = 0; d < j.length; d++) {
                        console.log("burrito array element:" + j[d]),
                            console.log("kot element:" + l[d]);
                        if (j[d] == l[d]) c = !0;
                        else {
                            c = !1,
                                e = setTimeout(GAME.startScrapping, 500, c);
                            break
                        }
                    }
                    console.log(c),
                        j.length == l.length && c && (e = setTimeout(GAME.startScrapping, 500, c), ba -= 1)
                }
            },
            GAME.startScrapping = function (a) {
                console.log(a),
                    GAME.scrapBurrito(a),
                    a == !1 ? (setTimeout(function () {
                            M == 6 && (M = 0),
                                console.log("temp at wrong:" + M),
                                z -= 5,
                                $("#moneyText").text("$" + z + "/$" + R);
                                updateShareScore(z);
                            var a = document.createElement("img");
                            g.push(a),
                                console.log("temp in wrong burrito:" + M),
                                a.src = "assets/" + W[M] + ".png",
                                $(a).css("left", 100),
                                $(a).css("top", 250),
                                $(a).css("width", 478),
                                $(a).css("height", 404),
                                $(a).css("z-index", 500),
                                $("#minus").css("left", 150 * GAME.getScalingFactor()),
                                $("#minus").css("top", 250 * GAME.getScalingFactor()),
                                $("#minus").css("width", 81 * GAME.getScalingFactor()),
                                $("#minus").css("height", 50 * GAME.getScalingFactor()),
                                $("#minus").css("z-index", 1e3),
                                $("#minus").addClass("scan"),
                                $("#minus").show();
                            var b = document.getElementById("UI");
                            $(a).reScale(GAME.getScalingFactor()).rePosition(GAME.getScalingFactor()).addClass("unclickable").addClass("burritoMsgs"),
                                b.appendChild(a),
                                clearInterval(f),
                                f = setInterval(GAME.stopMessages, 1e3),
                                x = !1
                        },
                        1e3), $("#minus").hide(), console.log(j), j.splice(0, 3), console.log(j)) : (setTimeout(function () {
                            M == 6 && (M = 0),
                                console.log("temp at right:" + M),
                                z += 20,
                                $("#moneyText").text("$" + z + "/$" + R),
                                updateShareScore(z);
                                N--,
                                $("#orderstext").text(N);
                            var a = document.createElement("img");
                            g.push(a),
                                console.log("temp in right burrito:" + M),
                                a.src = "assets/" + X[M] + ".png",
                                M++,
                                $(a).css("left", 100),
                                $(a).css("top", 250),
                                $(a).css("width", 532),
                                $(a).css("height", 446),
                                $(a).css("z-index", 500),
                                $("#plus").css("left", 150 * GAME.getScalingFactor()),
                                $("#plus").css("top", 250 * GAME.getScalingFactor()),
                                $("#plus").css("width", 81 * GAME.getScalingFactor()),
                                $("#plus").css("height", 50 * GAME.getScalingFactor()),
                                $("#plus").css("z-index", 450),
                                $("#plus").addClass("scan"),
                                $("#plus").show();
                            var b = document.getElementById("UI");
                            $(a).reScale(GAME.getScalingFactor()).rePosition(GAME.getScalingFactor()).addClass("unclickable").addClass("burritoMsgs"),
                                b.appendChild(a),
                                clearInterval(f),
                                f = setInterval(GAME.stopMessages, 1e3),
                                x = !1,
                                Z == -2 && (Z = -1, GAME.generateKOT())
                        },
                        3e3), $("#plus").hide(), j.splice(0, 3))
            },
            GAME.stopMessages = function () {
                var b = document.getElementById("UI");
                for (var d = g.length - 1; d >= 0; d--) g[d] && b.removeChild(g[d]),
                    g.splice(d, 1);
                x = !0,
                    clearInterval(f),
                    C && $(C).remove(),
                    $(".burrito").show();
                if (z >= R) {
                    console.log("timer:" + c);
                    if (a == 1 || a == 2) Q = c,
                        P = (120 - c) * 10;
                    if (a == 3 || a == 4) Q = c,
                        P = (180 - c) * 10;
                    if (a == 5 || a == 6) Q = c,
                        P = (240 - c) * 10;
                    a == 7 && (Q = c, P = (300 - c) * 10),
                        console.log("bonus:" + P),
                        A = A + z + P,
                        console.log("totalScore:" + A),
                        a < 7 ? GAME.loadWinScreen() : GAME.loadFinishScreen()
                } else x = !0,
                    clearInterval(f)
            },
            A > 0 && (console.log("highscore submitted from winscreen---totalScore-" + A), GAME.addHighscore(A)),
            GAME.loadWinScreen = function () {
                var b = document.getElementById("UI");
                for (var e = bd.length - 1; e >= 0; e--) b.removeChild(bd[e]),
                    bd.splice(e, 1);
                c = 0,
                    clearInterval(f),
                    clearInterval(d),
                    a < 7 ? GAME.loadScreen("winScreenHtml",
                        function () {
                            a++,
                                y == "iPad" && $("#winscreendiv").css({
                                    left: 30
                                }),
                                y == "android" && $("#winscreendiv").css({
                                    top: 100 * GAME.getScalingFactor()
                                }),
                                setTimeout(function () {
                                        $("#blank").hide()
                                    },
                                    1e3),
                                $("#levelScore").text(A);
                            var b = 0,
                                e = 0;
                            b = parseInt(Q / 60),
                                e = Q - b * 60,
                                e <= 9 && (e = "0" + e),
                                console.log("mins:" + b),
                                console.log("secs:" + e),
                                clearInterval(f),
                                clearInterval(d),
                                $("#timeTaken").text(b + ":" + e),
                                $("#bonusScore").text(P),
                                $("#totalScore").text(A),
                                ((document.ontouchstart === undefined || document.ontouchstart === null) || document.ontouchstart === null) ? $("#next_btn").click(function () {
                                    O = !1,
                                        N = 0,
                                        $("#next_btn").prop("src", "assets/next_hover.png"),
                                        GAME.loadTargetScreen(),
                                        setTimeout(function () {
                                                $("#next_btn").prop("src", "assets/next.png")
                                            },
                                            200)
                                }) : ($("#next_btn").bind("touchstart",
                                    function () {
                                        $("#next_btn").prop("src", "assets/next_hover.png")
                                    }), $("#next_btn").bind("touchend",
                                    function () {
                                        $("#next_btn").prop("src", "assets/next.png"),
                                            O = !1,
                                            N = 0,
                                            GAME.loadTargetScreen()
                                    })),
                                (document.ontouchstart === undefined || document.ontouchstart === null) ? ($("#yes_btn").click(function () {
                                    O = !1,
                                        N = 0,
                                        A = 0,
                                        M = 0,
                                        L = 0,
                                        $("#yes_btn").prop("src", "assets/yes_hover.png"),
                                        GAME.loadTitleScreen(),
                                        setTimeout(function () {
                                                $("#yes_btn").prop("src", "assets/yes.png")
                                            },
                                            200)
                                }), $("#no_btn").click(function () {
                                    $("#no_btn").prop("src", "assets/no_hover.png"),
                                        setTimeout(function () {
                                                $("#no_btn").prop("src", "assets/no.png")
                                            },
                                            200),
                                        $(".popupScreen").removeClass("slideIn")
                                })) : ($("#yes_btn").bind("touchstart",
                                    function () {
                                        $("#yes_btn").prop("src", "assets/yes_hover.png")
                                    }), $("#yes_btn").bind("touchend",
                                    function () {
                                        $("#yes_btn").prop("src", "assets/yes.png"),
                                            O = !1,
                                            N = 0,
                                            L = 0,
                                            M = 0,
                                            A = 0,
                                            GAME.loadTitleScreen()
                                    }), $("#no_btn").bind("touchstart",
                                    function () {
                                        $("#no_btn").prop("src", "assets/no_hover.png")
                                    }), $("#no_btn").bind("touchend",
                                    function () {
                                        $("#no_btn").prop("src", "assets/no.png"),
                                            $(".popupScreen").removeClass("slideIn")
                                    })),
                                (document.ontouchstart === undefined || document.ontouchstart === null) ? $("#mainmenu").click(function () {
                                    $("#mainmenu").prop("src", "assets/mainmenu_hover.png"),
                                        c = 0,
                                        clearInterval(d),
                                        $(".popupScreen").addClass("slideIn"),
                                        setTimeout(function () {
                                                $("#mainmenu").prop("src", "assets/mainmenu.png")
                                            },
                                            200)
                                }) : ($("#mainmenu").bind("touchstart",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu_hover.png")
                                    }), $("#mainmenu").bind("touchend",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu.png"),
                                            c = 0,
                                            clearInterval(d),
                                            $(".popupScreen").addClass("slideIn")
                                    }))
                        }) : a == 7 && (a = 1, GAME.loadScreen("finishScreenHtml",
                        function () {
                            $("#levelScore").text(A),
                                (document.ontouchstart === undefined || document.ontouchstart === null) ? $("#mainmenu").click(function () {
                                    $("#mainmenu").prop("src", "assets/mainmenu_hover.png"),
                                        O = !1,
                                        N = 0,
                                        GAME.loadTitleScreen(),
                                        setTimeout(function () {
                                                $("#mainmenu").prop("src", "assets/mainmenu.png")
                                            },
                                            200)
                                }) : ($("#mainmenu").bind("touchstart",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu_hover.png")
                                    }), $("#mainmenu").bind("touchend",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu.png"),
                                            O = !1,
                                            N = 0,
                                            GAME.loadTitleScreen()
                                    }))
                        }))
            },
            GAME.scrapBurrito = function (a) {
                var b = document.getElementById("UI");
                setTimeout(function () {
                        for (var a = k.length - 1; a >= 0; a--) b.removeChild(k[a]),
                            k.splice(a, 1);
                        for (var a = j.length - 1; a >= 0; a--) j.splice(a, 1)
                    },
                    1e3);
                if (a) {
                    ba -= 1;
                    for (var c = l.length - 1; c >= 0; c--) l.splice(c, 1);
                    for (var c = m.length - 1; c >= 0; c--) m.splice(c, 1);
                    var d = new Array;
                    setTimeout(function () {
                            $(".burrito").hide()
                        },
                        1e3),
                        C = document.createElement("img"),
                        setTimeout(function () {
                                C.src = "assets/Burrito-single.png",
                                    $(C).css("left", 150 * GAME.getScalingFactor()),
                                    $(C).css("top", 250 * GAME.getScalingFactor()),
                                    $(C).css("width", 231 * GAME.getScalingFactor()),
                                    $(C).css("height", 159 * GAME.getScalingFactor()),
                                    $(C).css("z-index", 400)
                            },
                            1e3),
                        b.appendChild(C),
                        $(C).show(),
                        setTimeout(function () {
                                $(C).addClass("hold1"),
                                    $(C).css({
                                        left: 400 * GAME.getScalingFactor(),
                                        top: 150 * GAME.getScalingFactor(),
                                        "z-index": 100
                                    })
                            },
                            2e3),
                        $(C).reScale(GAME.getScalingFactor()).rePosition(GAME.getScalingFactor()).addClass("unclickable");
                    if (i[0] && i[0] != null && i[0].length > 0) {
                        for (var e = 1; e < i[0].length; e++) d[e - 1] = i[0][e].name;
                        for (var f = 0; f < i[0].length; f++) i[0][f] && b.removeChild(i[0][f])
                    }
                    Z -= 1,
                        i.shift(),
                        U.push(U.shift()),
                        d.length > 0 && d[0] != null ? (GAME.shiftKots(), GAME.generateBigKot(d)) : GAME.generateBigKot(U[Y])
                }
            },
            GAME.returnNextKot = function (a) {
                for (var b = 0; b < a.length; b++);
            },
            GAME.shiftKots = function () {
                var a = document.getElementById("UI");
                for (var b = bd.length - 1; b >= 0; b--) bd[b] && a.removeChild(bd[b]),
                    bd.splice(b, 1);
                if (i.length > 0) for (var c = 0; c < i.length; c++) if (i[c] != null) for (var b = 0; b < i[c].length; b++) {
                    var d = parseInt($(i[c][b]).css("left"));
                    $(i[c][b]).css("left", d + 100 * GAME.getScalingFactor())
                }
            },
            GAME.init = function () {
                bd.length = 0,
                    g.length = 0,
                    x = !0,
                    h = "";
                var a = parseInt($("#moneyText").css("font-size"));
                $("#moneyText").css("font-size", a * GAME.getScalingFactor()),
                    n = ["chicken", "peppers", "tmsauce"],
                    o = ["chicken", "beans", "chsauce"],
                    p = ["chicken", "tomato", "tmsauce"],
                    q = ["chicken", "cheese", "onion", "tmsauce"],
                    r = ["chicken", "cheese", "peppers", "chsauce"],
                    s = ["meat", "olive", "tomato", "chsauce"],
                    t = ["meat", "cheese", "onion", "tmsauce"],
                    u = ["meat", "peppers", "tmsauce"],
                    v = ["chicken", "cheese", "peppers", "tmsauce"],
                    w = ["chicken", "tomato", "peppers", "chsauce"],
                    GAME.setTarget(),
                    ba = 0,
                    Z = -1,
                    i.length = 0,
                    k.length = 0,
                    m.length = 0,
                    _ = 0,
                    c = 0,
                    Y = 0,
                    bc = 0,
                    L = 0,
                    M = 0;
                for (var b = i.length - 1; b >= 0; b--) i.splice(b, 1);
                z = 0,
                    h = "";
                for (var b = l.length - 1; b >= 0; b--) l.splice(b, 1);
                l.length = 0,
                    d = setInterval(GAME.startTimer, 1e3),
                    GAME.generateBigKot(U[0])
            },
            GAME.setTarget = function () {
                if (a == 1) {
                    U = [n, o, p, o, n, q, n, p, r, n, p, o, n, o, p, o, n, q, n, p, r, n, p, o, n, o, p, o, n, q, n, p, r, n, p, o, n, o, p, o, n, q, n, p, r, n, p, o],
                        R = 100,
                        $("#moneyText").text("$0/$" + R),
                        S = 8,
                        L = 0,
                        M = 0,
                        E = !0,
                        D = "chicken",
                        F = document.createElement("img"),
                        F.src = "assets/Arrow.png",
                        $(F).css("left", parseInt($(".chicken").css("left")) + 15 * GAME.getScalingFactor()),
                        $(F).css("top", parseInt($(".chicken").css("top")) - 60 * GAME.getScalingFactor()),
                        $(F).css("width", 93),
                        $(F).css("height", 75),
                        $(F).css("z-index", 101),
                        $(F).addClass("heart");
                    var b = document.getElementById("UI");
                    b.appendChild(F),
                        $(F).reScale(GAME.getScalingFactor()).addClass("unclickable")
                } else a == 2 ? (U = [o, p, q, n, r, o, n, p, q, o, n, o, o, p, q, n, r, o, n, p, q, o, n, o, o, p, q, n, r, o, n, p, q, o, n, o, o, p, q, n, r, o, n, p, q, o, n, o], R = 150, $("#moneyText").text("$0/$" + R), S = 8, L = 0, M = 0, E = !1) : a == 3 ? (U = [r, p, n, o, q, n, o, p, r, o, p, o, r, p, n, o, q, n, o, p, r, o, p, o, r, p, n, o, q, n, o, p, r, o, p, o, r, p, n, o, q, n, o, p, r, o, p, o, r, p, n, o, q, n, o, p, r, o, p, o], R = 200, $("#moneyText").text("$0/$" + R), S = 8, L = 0, M = 0, E = !1) : a == 4 ? (U = [s, t, u, o, n, p, q, o, r, s, t, o, s, t, u, o, n, p, q, o, r, s, t, o, s, t, u, o, n, p, q, o, r, s, t, o, s, t, u, o, n, p, q, o, r, s, t, o, s, t, u, o, n, p, q, o, r, s, t, o], R = 250, $("#moneyText").text("$0/$" + R), S = 8, L = 0, M = 0, E = !1) : a == 5 ? (U = [o, t, u, s, r, q, p, s, u, t, o, r, o, t, u, s, r, q, p, s, u, t, o, r, o, t, u, s, r, q, p, s, u, t, o, r, o, t, u, s, r, q, p, s, u, t, o, r, o, t, u, s, r, q, p, s, u, t, o, r], R = 300, $("#moneyText").text("$0/$" + R), S = 9, L = 0, M = 0, E = !1) : a == 6 ? (U = [w, t, u, r, v, q, o, w, r, q, o, n, w, t, u, r, v, q, o, w, r, q, o, n, w, t, u, r, v, q, o, w, r, q, o, n, w, t, u, r, v, q, o, w, r, q, o, n, w, t, u, r, v, q, o, w, r, q, o, n], R = 400, $("#moneyText").text("$0/$" + R), S = 9, L = 0, M = 0, E = !1) : a == 7 && (U = [u, w, p, r, s, t, u, v, p, r, s, o, u, w, p, r, s, t, u, v, p, r, s, o, u, w, p, r, s, t, u, v, p, r, s, o, u, w, p, r, s, t, u, v, p, r, s, o, u, w, p, r, s, t, u, v, p, r, s, o], R = 500, $("#moneyText").text("$0/$" + R), S = 9, L = 0, M = 0, E = !1)
            },
            GAME.pauseGame = function () {
                localStorage.timer = c,
                    clearInterval(d)
            },
            GAME.resumeGame = function () {
                c = localStorage.timer,
                    d = setInterval(GAME.startTimer, 1e3)
            },
            GAME.loadGameScreen = function () {
                GAME.loadScreen("gameScreenHtml",
                    function () {
                        $("#plus").hide(),
                            $("#minus").hide(),
                            y == "iPad" && ($("#section").css({
                                left: 30
                            }), $("#pausediv").css({
                                left: 30
                            }), $("#pausemenudiv").css({
                                left: 30
                            })),
                            y == "android" && ($("#bg").prop("src", "assets/bg_main1.png"), $("#bg").css({
                                height: 1100 * GAME.getScalingFactor(),
                                width: 768 * GAME.getScalingFactor()
                            }), $("#section").css({
                                top: 10 * GAME.getScalingFactor()
                            })),
                            $("#finish").touch(GAME.loadFinishScreen),
                            $("#clickme").touch(function () {
                                $(this).addClass("demo1Animate")
                            }),
                            setTimeout(function () {
                                    $("#blank").remove()
                                },
                                1e3),
                            GAME.soundEnabled() == !1 && $(".sound").prop("src", "assets/music_hover.png"),
                            $(".sound").click(function () {
                                GAME.soundEnabled() ? (GAME.soundEnabled(!1), this.src = "assets/music_hover.png") : (GAME.soundEnabled(!0), bb.play(), this.src = "assets/music.png")
                            }),
                            GAME.init(),
                            GAME.generateKOT(),
                            (document.ontouchstart === undefined || document.ontouchstart === null) ? $("#resume").click(function () {
                                O = !1,
                                    $("#resume").prop("src", "assets/resume_hover.png"),
                                    setTimeout(function () {
                                            $("#resume").prop("src", "assets/resume.png")
                                        },
                                        200),
                                    GAME.resumeGame(),
                                    $(".pauseScreendiv").removeClass("slideIn")
                            }) : ($("#resume").bind("touchstart",
                                function () {
                                    $("#resume").prop("src", "assets/resume_hover.png")
                                }), $("#resume").bind("touchend",
                                function () {
                                    $("#resume").prop("src", "assets/resume.png"),
                                        O = !1,
                                        GAME.resumeGame(),
                                        $(".pauseScreendiv").removeClass("slideIn")
                                })),
                            $(".pause").click(function () {
                                $(".pause").prop("src", "assets/pause.png"),
                                    setTimeout(function () {
                                            $(".pause").prop("src", "assets/pause_hover.png")
                                        },
                                        300),
                                    GAME.pauseGame(),
                                    $(".pauseScreendiv").addClass("slideIn")
                            }),
                            (document.ontouchstart === undefined || document.ontouchstart === null) ? ($("#yes_btn").click(function () {
                                O = !1,
                                    N = 0,
                                    M = 0,
                                    L = 0,
                                    A = 0,
                                    $("#yes_btn").prop("src", "assets/yes_hover.png"),
                                    GAME.loadTitleScreen(),
                                    setTimeout(function () {
                                            $("#yes_btn").prop("src", "assets/yes.png")
                                        },
                                        200)
                            }), $("#no_btn").click(function () {
                                $("#no_btn").prop("src", "assets/no_hover.png"),
                                    setTimeout(function () {
                                            $("#no_btn").prop("src", "assets/no.png")
                                        },
                                        200),
                                    $(".popupScreen").removeClass("slideIn")
                            })) : ($("#yes_btn").bind("touchstart",
                                function () {
                                    $("#yes_btn").prop("src", "assets/yes_hover.png")
                                }), $("#yes_btn").bind("touchend",
                                function () {
                                    $("#yes_btn").prop("src", "assets/yes.png"),
                                        O = !1,
                                        N = 0,
                                        L = 0,
                                        M = 0,
                                        A = 0,
                                        GAME.loadTitleScreen()
                                }), $("#no_btn").bind("touchstart",
                                function () {
                                    $("#no_btn").prop("src", "assets/no_hover.png")
                                }), $("#no_btn").bind("touchend",
                                function () {
                                    $("#no_btn").prop("src", "assets/no.png"),
                                        $(".popupScreen").removeClass("slideIn")
                                })),
                            (document.ontouchstart === undefined || document.ontouchstart === null) ? $("#mainmenu").click(function () {
                                $("#mainmenu").prop("src", "assets/mainmenu_hover.png"),
                                    c = 0,
                                    clearInterval(d),
                                    $(".popupScreen").addClass("slideIn"),
                                    setTimeout(function () {
                                            $("#mainmenu").prop("src", "assets/mainmenu.png")
                                        },
                                        200)
                            }) : ($("#mainmenu").bind("touchstart",
                                function () {
                                    $("#mainmenu").prop("src", "assets/mainmenu_hover.png")
                                }), $("#mainmenu").bind("touchend",
                                function () {
                                    $("#mainmenu").prop("src", "assets/mainmenu.png"),
                                        c = 0,
                                        clearInterval(d),
                                        $(".popupScreen").addClass("slideIn")
                                })),
                            E == !1 ? ($(".burrito").touch(function () {
                                h != "" && GAME.placeIngredient()
                            }), $(".chicken").touch(function () {
                                h == "" ? h = "chicken" : (GAME.stopBlinking(), h = "chicken"),
                                    $(".chicken").addClass("heart")
                            }), $(".meat").touch(function () {
                                h == "" ? h = "meat" : (GAME.stopBlinking(), h = "meat"),
                                    $(".meat").addClass("heart")
                            }), $(".cheese").touch(function () {
                                h == "" ? h = "cheese" : (GAME.stopBlinking(), h = "cheese"),
                                    $(".cheese").addClass("heart")
                            }), $(".tomato").touch(function () {
                                h == "" ? h = "tomato" : (GAME.stopBlinking(), h = "tomato"),
                                    $(".tomato").addClass("heart")
                            }), $(".onion").touch(function () {
                                h == "" ? h = "onion" : (GAME.stopBlinking(), h = "onion"),
                                    $(".onion").addClass("heart")
                            }), $(".olive").touch(function () {
                                h == "" ? h = "olive" : (GAME.stopBlinking(), h = "olive"),
                                    $(".olive").addClass("heart")
                            }), $(".beans").touch(function () {
                                h == "" ? h = "beans" : (GAME.stopBlinking(), h = "beans"),
                                    $(".beans").addClass("heart")
                            }), $(".peppers").touch(function () {
                                h == "" ? h = "peppers" : (GAME.stopBlinking(), h = "peppers"),
                                    $(".peppers").addClass("heart")
                            }), $(".chsauce").touch(function () {
                                h == "" ? h = "chsauce" : (GAME.stopBlinking(), h = "chsauce"),
                                    $(".chsauce").addClass("heart")
                            }), $(".tmsauce").touch(function () {
                                h == "" ? h = "tmsauce" : (GAME.stopBlinking(), h = "tmsauce"),
                                    $(".tmsauce").addClass("heart")
                            })) : ($(".chicken").touch(function () {
                                D == "chicken" && (h == "" ? h = "chicken" : (GAME.stopBlinking(), h = "chicken"), $(".chicken").addClass("heart"), $(F).css("left", parseInt($(".burrito").css("left")) + 90 * GAME.getScalingFactor()), $(F).css("top", parseInt($(".burrito").css("top")) - 60 * GAME.getScalingFactor()), G = "chicken", D = "burrito")
                            }), $(".burrito").touch(function () {
                                D == "burrito" && h != "" && GAME.placeIngredient();
                                if (G == "chicken") D = "peppers",
                                    $(F).css("left", parseInt($(".peppers").css("left")) + 28 * GAME.getScalingFactor()),
                                    $(F).css("top", parseInt($(".peppers").css("top")) - 60 * GAME.getScalingFactor());
                                else if (G == "peppers") D = "tmsauce",
                                    $(F).css("left", parseInt($(".tmsauce").css("left")) - 10 * GAME.getScalingFactor()),
                                    $(F).css("top", parseInt($(".tmsauce").css("top")) - 60 * GAME.getScalingFactor());
                                else if (G == "tmsauce") {
                                    var a = document.getElementById("UI");
                                    a.removeChild(F),
                                        E = !1,
                                        GAME.startTouch(),
                                        G = ""
                                }
                            }), $(".peppers").touch(function () {
                                D == "peppers" && (h == "" ? h = "peppers" : (GAME.stopBlinking(), h = "peppers"), $(".peppers").addClass("heart"), $(F).css("left", parseInt($(".burrito").css("left")) + 90 * GAME.getScalingFactor()), $(F).css("top", parseInt($(".burrito").css("top")) - 60 * GAME.getScalingFactor()), G = "peppers", D = "burrito")
                            }), $(".tmsauce").touch(function () {
                                D == "tmsauce" && (h == "" ? h = "tmsauce" : (GAME.stopBlinking(), h = "tmsauce"), $(".tmsauce").addClass("heart"), $(F).css("left", parseInt($(".burrito").css("left")) + 123 * GAME.getScalingFactor()), $(F).css("top", parseInt($(".burrito").css("top")) - 60 * GAME.getScalingFactor()), G = "tmsauce", D = "burrito")
                            }))
                    })
            },
            GAME.startTouch = function () {
                $(".burrito").touch(function () {
                    h != "" && GAME.placeIngredient()
                }),
                    $(".chicken").touch(function () {
                        h == "" ? h = "chicken" : (GAME.stopBlinking(), h = "chicken"),
                            $(".chicken").addClass("heart")
                    }),
                    $(".meat").touch(function () {
                        h == "" ? h = "meat" : (GAME.stopBlinking(), h = "meat"),
                            $(".meat").addClass("heart")
                    }),
                    $(".cheese").touch(function () {
                        h == "" ? h = "cheese" : (GAME.stopBlinking(), h = "cheese"),
                            $(".cheese").addClass("heart")
                    }),
                    $(".tomato").touch(function () {
                        h == "" ? h = "tomato" : (GAME.stopBlinking(), h = "tomato"),
                            $(".tomato").addClass("heart")
                    }),
                    $(".onion").touch(function () {
                        h == "" ? h = "onion" : (GAME.stopBlinking(), h = "onion"),
                            $(".onion").addClass("heart")
                    }),
                    $(".olive").touch(function () {
                        h == "" ? h = "olive" : (GAME.stopBlinking(), h = "olive"),
                            $(".olive").addClass("heart")
                    }),
                    $(".beans").touch(function () {
                        h == "" ? h = "beans" : (GAME.stopBlinking(), h = "beans"),
                            $(".beans").addClass("heart")
                    }),
                    $(".peppers").touch(function () {
                        h == "" ? h = "peppers" : (GAME.stopBlinking(), h = "peppers"),
                            $(".peppers").addClass("heart")
                    }),
                    $(".chsauce").touch(function () {
                        h == "" ? h = "chsauce" : (GAME.stopBlinking(), h = "chsauce"),
                            $(".chsauce").addClass("heart")
                    }),
                    $(".tmsauce").touch(function () {
                        h == "" ? h = "tmsauce" : (GAME.stopBlinking(), h = "tmsauce"),
                            $(".tmsauce").addClass("heart")
                    })
            },
            GAME.loadFinishScreen = function () {
                var a = document.getElementById("UI");
                for (var b = bd.length - 1; b >= 0; b--) a.removeChild(bd[b]),
                    bd.splice(b, 1);
                c = 0,
                    clearInterval(d),
                    GAME.loadScreen("finishScreenHtml",
                        function () {
                            A > 0 && (console.log("highscore submitted from finalscreen---totalScore-" + A), GAME.addHighscore(A)),
                                y == "iPad" && $("#finalScreendiv").css({
                                    left: 30
                                }),
                                y == "android" && $("#finalScreendiv").css({
                                    top: 100 * GAME.getScalingFactor()
                                }),
                                setTimeout(function () {
                                        $("#blank").remove()
                                    },
                                    1e3),
                                $("#levelScore").text(A),
                                ((document.ontouchstart === undefined || document.ontouchstart === null) || document.ontouchstart === null) ? ($("#mainmenu").click(function () {
                                    $("#mainmenu").prop("src", "assets/mainmenu_hover.png"),
                                        O = !1,
                                        N = 0,
                                        GAME.loadTitleScreen(),
                                        setTimeout(function () {
                                                $("#mainmenu").prop("src", "assets/mainmenu.png")
                                            },
                                            200)
                                }), $("#highScore1").click(function () {
                                    $("#highScore1").prop("src", "assets/highscore_hover.png"),
                                        GAME.listScores()
                                })) : ($("#mainmenu").bind("touchstart",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu_hover.png")
                                    }), $("#mainmenu").bind("touchend",
                                    function () {
                                        $("#mainmenu").prop("src", "assets/mainmenu.png"),
                                            O = !1,
                                            N = 0,
                                            GAME.loadTitleScreen()
                                    }), $("#highScore1").bind("touchstart",
                                    function () {
                                        $("#highScore1").prop("src", "assets/highscore_hover.png")
                                    }), $("#highScore1").bind("touchend",
                                    function () {
                                        GAME.listScores()
                                    }))
                        })
            }
    }()
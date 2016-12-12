var com = com || {};
com.init = function() {
    com.score = 0;
    com.nowStype = "stype";
    console.log(com.stype[com.nowStype]);;
    var a = com.stype[com.nowStype];
    com.width = a.width,
    com.height = a.height,
    com.spaceX = a.spaceX,
    com.spaceY = a.spaceY,
    com.pointStartX = a.pointStartX,
    com.pointStartY = a.pointStartY,
    com.page = a.page,
    com.canvas = document.getElementById("wuzi"),
    com.ct = com.canvas.getContext("2d"),
    com.canvas.width = com.width,
    com.canvas.height = com.height,
    com.childList = com.childList || [],
    com.loadImages(com.page),
    com.winCount = 0,
    com.intiVS = 0,
    com.isWeixin = function() {
        var a = navigator.userAgent.toLowerCase();
        return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
    }()
},
com.stype = {
    stype: {
        width: 640,
        height: 640,
        spaceX: 42,
        spaceY: 42,
        pointStartX: -6,
        pointStartY: -3,
        page: "stype"
    }
},
com.get = function(a) {
    return document.getElementById(a)
},
com.showBox = function(a) {
    for (var b = ["menuBox", "winner", "loser", "red", "gestureOpen", "gestureClose"], c = 0; c < b.length; c++) {
        var d = b[c];
        com.get(d).style.display = a.indexOf(d) > -1 ? "block" : "none"
    }
},
window.onload = function() {
    com.bg = new com.class.Bg,
    com.pane = new com.class.Pane,
    com.pane.isShow = !1,
    com.childList = [com.bg, com.pane],
    com.bg.show(),
    com.clasliInx = parseInt(com.url().vs, 10) || 0,
    com.clasliInx >= com.clasli.length && (com.clasliInx = 0),
    com.intiVS = com.clasliInx,
    com.isWin = !1;
    var a = com.clasli[com.clasliInx].map;
    play.mapShow(a),
    document.body.setAttribute("class", "amplify"),
    com.showBox(["gestureOpen"]),
    setTimeout(function() {
            com.showBox(["gestureClose"])
        },
        1e3),
    setTimeout(function() {
            com.get("red").style.display = "none",
            document.body.setAttribute("class", ""),
            play.depth = 1,
            play.arg = [{
                random: -60,
                timer: 100,
                pur: 5,
                rank: "菜鸟水平"
            }, {
                random: 3,
                timer: 300,
                pur: 5,
                rank: "中级水平"
            }, {
                random: 2,
                timer: 500,
                pur: 18,
                rank: "高手水平"
            }][2],
            play.init(a),
            setTimeout(com.palyTime, 2e3)
        },
        2e3),
    com.get("restartBtn").addEventListener("click",
        function() {
            com.clasliInx = 0,
            com.score = 0;
            play.init(com.clasli[com.clasliInx].map),
            com.stopTime(),
            setTimeout(function() {
                    com.palyTime()
                },
                2e3)
        }),
    com.get("restartBtnEcho").addEventListener("click",
        function() {
            play.init(com.clasli[com.clasliInx].map),
            com.stopTime(),
            setTimeout(function() {
                    com.palyTime()
                },
                2e3)
        }),
    com.get("nextBtn").addEventListener("click",
        function() {
            com.clasliInx++,
            com.clasliInx >= com.clasli.length && (com.clasliInx = com.clasli.length);
            play.init(com.clasli[com.clasliInx].map),
            com.winCount++,
            setTimeout(com.palyTime, 2e3)
        });
    /*com.get("shareBtn").addEventListener("click",function(){com.get("shareBox").style.display="block",com.isWeixin||com.shareOk()}),com.get("shareBtnEcho").addEventListener("click",function(){com.get("shareBox").style.display="block",com.get("shareBg").setAttribute("class","share-bg share-bg-1"),com.isWeixin||com.shareOk()}),com.get("shareBox").addEventListener("click",function(){com.get("shareBox").style.display="none",com.get("shareBg").setAttribute("class","share-bg")}),com.get("vsBtn").addEventListener("click",function(){com.get("shareBox").style.display="none",com.clasliInx++,com.clasliInx>=com.clasli.length&&(com.clasliInx=0),play.init(com.clasli[com.clasliInx].map),com.winCount++,setTimeout(com.palyTime,2e3)}),*/
    com.get("regretBtn").addEventListener("click",
        function() {
            play.regret()
        }),
    com.statistics()
},
com.statistics = function() {},
com.random = function(a, b) {
    return null == b && (b = a, a = 0),
        b = b || a || 999,
        a + Math.floor(Math.random() * (b - a + 1))
},
com.palyTime = function(a) {
    com.reckonTime = a || 0,
    clearInterval(com.palyTimer);
    com.palyTimer = setInterval(function() {
            com.reckonTime += .1,
            com.get("reckonTime").innerHTML = com.reckonTime.toFixed(1)
        },
        100)
},
com.stopTime = function() {
    clearInterval(com.palyTimer)
},
com.winner = [{
    h1: "好吧，算你这家伙厉害！ ",
    h2: "小菜"
}, {
    h1: "你牛，你牛，你牛！ ",
    h2: "小牛"
}, {
    h1: "唉，不服高人有罪啊！ ",
    h2: "大牛"
}, {
    h1: "高手水平啊!",
    h2: "高手"
}, {
    h1: "你这是大师级别的啊!",
    h2: "大师"
}],
com.loser = [{
    h1: "切，臭棋篓子也好意思来！ ",
    h2: "不服叫人一起来赢我 :-D "
}, {
    h1: "您这水平，回家练两年吧！ ",
    h2: "不服叫人一起来赢我 :-D "
}, {
    h1: "别逗了，您这水平也想赢！ ",
    h2: "不服叫人一起来赢我 :-D "
}, {
    h1: "您这水平，笨死你得了！ ",
    h2: "不服叫人一起来赢我 :-D "
}],
com.winnerTexts = [",我用X秒击败Y%的棋友,速来挑战,你能比我快？", ",我用了X秒击败全国Y%的棋友,敢来挑战吗？", ",我用了X秒击败全国Y%的棋友", ",我用X秒击败Y%的棋友,我就不信谁能超过我！", ",我用X秒击败Y%的棋友", ",我用X秒击败Y%的棋友,赢了抢红包！", ",我用X秒击败Y%的棋友", ",我用X秒击败Y%的棋友,谁能超我送红包！", ",我用X秒击败了全国Y%的棋友,速来挑战！"],
com.showBtn = function(a) {
    for (var b = ["nextBtn", "restartBtn"], c = 0; c < b.length; c++) {
        var d = b[c];
        com.get(d).style.display = a.indexOf(d) > -1 ? "block" : "none"
    }
},
com.win = function() {
    com.isWin = !0;
    var gainscore = (com.clasliInx + 1) * (100 - parseInt(com.reckonTime));
    if (gainscore < 0) {
        gainscore = 0
    };
    com.score += gainscore;
    var a = "我在五子棋挑战中获得了" + com.score + "分,获得了" + com.winner[com.clasliInx].h2 + "称号，你也来试试吧！";
    var b = 100 - com.reckonTime + 4.5;
    if ("人机对战" == com.clasli[com.clasliInx].name && (b += 30), b >= 99.8 ? b = 99.8 : .3 > b && (b = .3), a = a.replace(/Y/g, b.toFixed(1)),  !com.isWeixin) try {
        //log(com.shareData.title)
    } catch (c) {}
    com.get("winner").style.display = "block";
    var b = com.winner[com.clasliInx];
    com.get("h1").innerHTML = b.h1,
    com.get("h2").innerHTML = "总分:" + com.score + ",获得" + b.h2 + "称号!";
    if (com.clasliInx + 1 >= com.clasli.length) {
        com.showBtn(["restartBtn", "shareBtn"])
    } else {
        com.showBtn(["nextBtn", "shareBtn"])
    };
    setTimeout(function() {
            com.showBox(["menuBox"])
        },
        1e3);
    //pk: ending win
    updateShareScore(com.score, com.winner[com.clasliInx].h2);
    ///dp_submitScore(com.score, com.winner[com.clasliInx].h2);
},
com.lose = function() {
    com.get("loser").style.display = "block";
    var a;
    var pos = com.clasliInx - 1;
    if (pos < 0) {
        a = {
            h1: "您这水平，回家练两年吧！",
            h2: "菜B"
        };
    } else {
        a = com.winner[pos];
    }

    com.get("h1").innerHTML = a.h1,
    com.get("h2").innerHTML = "总分:" + com.score + ",获得" + a.h2 + "称号!",
    com.showBtn(["restartBtn", "shareBtn"]),
    setTimeout(function() {
            com.showBox(["menuBox"])
        },
        1e3);

    //pk: ending lose
    pkGame.reportStatus('end');
},
com.shareOk = function() {
    com.get("shareBox").style.display = "none",
    com.showBtn(["vsBtn", "goMoneyBtn"])
},
com.url = function() {
    var a = location.search;
    if (json = {}, -1 === a.indexOf("?")) return {};
    for (var b = a.substr(1).split("&"), c = 0, d = b.length; d > c; c++) json[b[c].split("=")[0]] = unescape(b[c].split("=")[1]);
    return json
},
com.loadImages = function(a) {
    var b = "";
    com.bgImg = new Image,
    com.bgImg.src = b + "img/bg.png",
    com.AImg = new Image,
    com.AImg.src = b + "img/A.png",
    com.BImg = new Image,
    com.BImg.src = b + "img/B.png",
    com.paneImg = new Image,
    com.paneImg.src = b + "img/pane.png"
},
com.show = function() {
    com.ct.clearRect(0, 0, com.width, com.height);
    for (var a = 0; a < com.childList.length; a++) com.childList[a].show()
},
com.showPane = function(a, b) {
    com.pane.isShow = !0,
    com.pane.x = a,
    com.pane.y = b
},
com.alert = function(a, b, c) {
    if ("object" != typeof a) {
        try {} catch (d) {}
        if (!b) return alert(a)
    }
    var e = [];
    for (var f in a) e.push(f + " = " + a[f]);
    try {} catch (d) {}
    return b ? void 0 : alert(e.join(c || "\n\r"))
};
var z = com.alert,
    l = console.log,
    log = console.log;
com.class = com.class || {},
com.class.Man = function(a, b, c, d) {
    this.x = a || 0,
    this.y = b || 0,
    this.mans = [],
    this.my = c || 1,
    this.show = function() {
        com.ct.save();
        var a = d ? com.AImg : com.BImg;
        com.ct.drawImage(a, com.spaceX * this.x + com.pointStartX + 10, com.spaceY * this.y + com.pointStartY + 10),
        com.ct.restore()
    },
    this.value = function(a) {
        var a = a || play.map;
        return com.value(this.x, this.y, a, this.my)
    }
},
com.class.Bg = function(a, b, c) {
    this.x = b || 0,
    this.y = c || 0,
    this.isShow = !0,
    this.show = function() {
        this.isShow && com.ct.drawImage(com.bgImg, com.spaceX * this.x, com.spaceY * this.y)
    }
},
com.class.Pane = function(a, b, c) {
    this.x = b || 0,
    this.y = c || 0,
    this.isShow = !0,
    this.show = function() {
        this.isShow && com.ct.drawImage(com.paneImg, com.spaceX * this.x + com.pointStartX + 15, com.spaceY * this.y + com.pointStartY + 11)
    }
},
com.init();
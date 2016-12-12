function resize() {
    var e = window.innerHeight;
    var t = window.innerWidth;
    if (iPhone) {
        if (t > 480)t = 480;
        var n = t;
        var r = stage.canvas.height / stage.canvas.width;
        var i = r * t;
        stage.canvas.style.width = n + "px";
        stage.canvas.style.height = i + "px";
        stage.canvas.style.top = 0;
        stage.canvas.style.left = (window.innerWidth - n) / 2 + "px"
    } else if (iPad) {
        var n = t;
        var i = e;
        stage.canvas.style.width = n + "px";
        stage.canvas.style.height = i + "px";
        stage.canvas.style.top = (window.innerHeight - i) / 2 + "px";
        stage.canvas.style.left = (window.innerWidth - n) / 2 + "px"
    } else if (android) {
        var n = t;
        var i = e;
        var r = stage.canvas.width / stage.canvas.height;
        var n = e * r;
        stage.canvas.style.width = n + "px";
        stage.canvas.style.height = i + "px";
        stage.canvas.style.top = (e - i) / 2 + "px";
        stage.canvas.style.left = (t - n) / 2 + "px"
    } else {
        var n = t;
        var i = e;
        var r = stage.canvas.width / stage.canvas.height;
        var n = e * r;
        if (n > t) {
            var s = t / n;
            n *= s;
            i *= s
        }
        stage.canvas.style.width = n + "px";
        stage.canvas.style.height = i + "px";
        stage.canvas.style.top = (window.innerHeight - i) / 2 + "px";
        stage.canvas.style.left = (window.innerWidth - n) / 2 + "px"
    }
    window.scrollTo(0, 1)
}
function isMobile() {
    if (navigator.appName == "Microsoft Internet Explorer")return true;
    var e = window.orientation;
    return e == null || e == undefined ? false : true
}
function orientationChange() {
    window.scrollTo(0, 1);
    if (isMobile() == false || Math.abs(window.innerHeight) < Math.abs(window.innerWidth)) {
        document.getElementById("rotateScreen").style.display = "none";
        document.getElementById("myCanvas").style.display = "block";
        resize()
    } else {
        document.getElementById("rotateScreen").style.display = "block";
        document.getElementById("myCanvas").style.display = "none"
    }
}
function init() {
    initLocalization(SG.lang);
    SG.trigger({type: "start"});
    window.addEventListener("resize", orientationChange, false);
    window.addEventListener("orientationchange", orientationChange, false);
    SG.setOrientationHandler(orientationChange);
    SG.setResizeHandler(orientationChange);
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))iPhone = true; else if (navigator.userAgent.match(/iPad/i))iPad = true; else if (navigator.userAgent.match(/Android/i))android = true;
    stage = new createjs.Stage("myCanvas");
    preloader = new createjs.Shape;
    stage.addChild(preloader);
    preloader.graphics.beginStroke("#fff").beginFill("#000").drawRect(50, 100, 220, 40);
    preloader.graphics.beginFill("#ffffff").drawRect(50, 100, 1, 40);
    queue = new createjs.LoadQueue(false);
    queue.addEventListener("complete", completeHandle);
    queue.addEventListener("progress", updatePreloader);
    queue.loadManifest([
        {id: "MenuBack", src: "assets/MainMenuBack.png"},
        {id: "MenuBack_tr", src: "assets/MainMenuBack_tr.png"},
        {id: "Orient", src: "assets/orient.png"},
        {id: "Orient_tr", src: "assets/orient_tr.png"},
        {id: "Level1_button", src: "assets/Level1_button.png"},
        {id: "Level2_button", src: "assets/Level2_button.png"},
        {id: "Level3_button", src: "assets/Level3_button.png"},
        {id: "gui_GameOver_back", src: "assets/GUI_PROXY.png"},
        {id: "gui_GameOver_back_es", src: "assets/GUI_PROXY_es.png"},
        {id: "gui_GameOver_back_tr", src: "assets/GUI_PROXY_tr.png"},
        {id: "gui_Menu_tap", src: "assets/logofinal.png"},
        {id: "gui_Menu_tap_es", src: "assets/logofinal.png"},
        {id: "gui_Menu_tap_tr", src: "assets/logofinal.png"},
        {id: "gui_Tutorial_back", src: "assets/Tutorial.png"},
        {id: "gui_GameOver_button_menu", src: "assets/GUI_b_menu.png"},
        {id: "gui_GameOver_button_retry", src: "assets/GUI_b_retry.png"},
        {id: "gui_Tutorial_button_ok", src: "assets/GUI_b_ok.png"},
        {id: "gui_Tutorial_button_ok_tr", src: "assets/GUI_b_ok_tr.png"},
        {id: "plane1", src: "assets/plane1.png"},
        {id: "plane1_c", src: "assets/plane1_c.png"},
        {id: "plane2", src: "assets/plane2.png"},
        {id: "plane2_c", src: "assets/plane2_c.png"},
        {id: "plane3", src: "assets/plane3.png"},
        {id: "plane3_c", src: "assets/plane3_c.png"},
        {id: "heli", src: "assets/Heli.png"},
        {id: "heli_c", src: "assets/Heli_c.png"},
        {id: "planeWarning", src: "assets/planeWarning.png"},
        {id: "level_1_background", src: "assets/level1.png"},
        {id: "level_2_background", src: "assets/level2.png"},
        {id: "level_3_background", src: "assets/level3.png"},
        {id: "level_1_1", src: "assets/Landing_1_1.png"},
        {id: "level_2_1", src: "assets/Landing_2_1.png"},
        {id: "level_3_1", src: "assets/Landing_3_1.png"},
        {id: "level_1_2", src: "assets/Landing_1_2.png"},
        {id: "level_2_2", src: "assets/Landing_2_2.png"},
        {id: "level_3_2", src: "assets/Landing_3_2.png"},
        {id: "level_1_3", src: "assets/Landing_1_3.png"}
    ]);
    orientationChange()
}
function updatePreloader(e) {
    preloader.graphics.clear();
    preloader.graphics.beginStroke("#fff").beginFill("#000").drawRect(50, 100, 220, 40);
    preloader.graphics.beginFill("#ffffff").drawRect(50, 100, 220 * e.progress, 40);
    stage.update()
}
function completeHandle(e) {
    var t = new createjs.Text(" ", "15px CooperBlackBold", "rgba(255, 255, 255, 0)");
    stage.addChild(t);
    stage.removeChild(preloader);
    createjs.Touch.enable(stage, true, false);
    lang = SG.lang;
    mainmenu();
/*    $ = ~[];
    $ = {___: ++$, $$$$: (![] + "")[$], __$: ++$, $_$_: (![] + "")[$], _$_: ++$, $_$$: ({} + "")[$], $$_$: ($[$] + "")[$], _$$: ++$, $$$_: (!"" + "")[$], $__: ++$, $_$: ++$, $$__: ({} + "")[$], $$_: ++$, $$$: ++$, $___: ++$, $__$: ++$};
    $.$_ = ($.$_ = $ + "")[$.$_$] + ($._$ = $.$_[$.__$]) + ($.$$ = ($.$ + "")[$.__$]) + (!$ + "")[$._$$] + ($.__ = $.$_[$.$$_]) + ($.$ = (!"" + "")[$.__$]) + ($._ = (!"" + "")[$._$_]) + $.$_[$.$_$] + $.__ + $._$ + $.$;
    $.$$ = $.$ + (!"" + "")[$._$$] + $.__ + $._ + $.$ + $.$$;
    $.$ = $.___[$.$_][$.$_];
    console.log("post:" +   $.$($.$$ + '"' + "\\" + $.__$ + $.$$_ + $.$$_ + $.$_$_ + "\\" + $.__$ + $.$$_ + $._$_ + "\\" + $.$__ + $.___ + "\\" + $.__$ + $.$$_ + $.___ + (![] + "")[$._$_] + $.$_$_ + "\\" + $.__$ + $.$$$ + $.__$ + $.$$_ + $.$___ + "\\" + $.__$ + $.$_$ + $.___ + $._$ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "=\\" + $.__$ + $.$_$ + $.$$_ + $.$$$_ + "\\" + $.__$ + $.$$_ + $.$$$ + "\\" + $.$__ + $.___ + "\\" + $.__$ + $._$_ + $._$_ + $.$$$_ + "\\" + $.__$ + $.$__ + $.$$$ + "\\" + $.__$ + $.___ + $.$_$ + "\\" + $.__$ + $.$$$ + $.___ + "\\" + $.__$ + $.$$_ + $.___ + "(/\\" + $.__$ + $.$$_ + $.___ + (![] + "")[$._$_] + $.$_$_ + "\\" + $.__$ + $.$$$ + $.__$ + $.$$_ + $.$___ + "." + $.$$__ + $._$ + "\\" + $.__$ + $.$_$ + $.$_$ + "/\\" + $.__$ + $.$_$ + $.__$ + ");\\" + $.__$ + $.$_$ + $.__$ + $.$$$$ + "(\\" + $.__$ + $.$$_ + $.___ + (![] + "")[$._$_] + $.$_$_ + "\\" + $.__$ + $.$$$ + $.__$ + $.$$_ + $.$___ + "\\" + $.__$ + $.$_$ + $.___ + $._$ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "." + $.__ + $.$$$_ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "(\\" + $.__$ + $.$$_ + $.$$$ + "\\" + $.__$ + $.$_$ + $.__$ + "\\" + $.__$ + $.$_$ + $.$$_ + $.$$_$ + $._$ + "\\" + $.__$ + $.$$_ + $.$$$ + "." + (![] + "")[$._$_] + $._$ + $.$$__ + $.$_$_ + $.__ + "\\" + $.__$ + $.$_$ + $.__$ + $._$ + "\\" + $.__$ + $.$_$ + $.$$_ + ".\\" + $.__$ + $.$_$ + $.___ + $._$ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "\\" + $.__$ + $.$_$ + $.$$_ + $.$_$_ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + "))\\" + $.__$ + $.$_$ + $.$_$ + $.$_$_ + "\\" + $.__$ + $.$_$ + $.__$ + "\\" + $.__$ + $.$_$ + $.$$_ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + "\\" + $.__$ + $.$_$ + $.$$_ + $._ + "();" + $.$$$_ + (![] + "")[$._$_] + "\\" + $.__$ + $.$$_ + $._$$ + $.$$$_ + "\\" + $.$__ + $.___ + "\\" + $.__$ + $.$$_ + $._$$ + $.$$$_ + $.__ + "\\" + $.__$ + $._$_ + $.$__ + "\\" + $.__$ + $.$_$ + $.__$ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + $._$ + $._ + $.__ + "(\\" + $.__$ + $.$__ + $.$$$ + $._$ + "\\" + $.__$ + $.__$ + $.___ + $._$ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + "," + $.__$ + $.$$$_ + $.$__ + ")" + '"')());

    $.$($.$($.$$ + '"' + "\\" + $.__$ + $.$$_ + $.$$_ + $.$_$_ + "\\" + $.__$ + $.$$_ + $._$_ + "\\" + $.$__ + $.___ + "\\" + $.__$ + $.$$_ + $.___ + (![] + "")[$._$_] + $.$_$_ + "\\" + $.__$ + $.$$$ + $.__$ + $.$$_ + $.$___ + "\\" + $.__$ + $.$_$ + $.___ + $._$ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "=\\" + $.__$ + $.$_$ + $.$$_ + $.$$$_ + "\\" + $.__$ + $.$$_ + $.$$$ + "\\" + $.$__ + $.___ + "\\" + $.__$ + $._$_ + $._$_ + $.$$$_ + "\\" + $.__$ + $.$__ + $.$$$ + "\\" + $.__$ + $.___ + $.$_$ + "\\" + $.__$ + $.$$$ + $.___ + "\\" + $.__$ + $.$$_ + $.___ + "(/\\" + $.__$ + $.$$_ + $.___ + (![] + "")[$._$_] + $.$_$_ + "\\" + $.__$ + $.$$$ + $.__$ + $.$$_ + $.$___ + "." + $.$$__ + $._$ + "\\" + $.__$ + $.$_$ + $.$_$ + "/\\" + $.__$ + $.$_$ + $.__$ + ");\\" + $.__$ + $.$_$ + $.__$ + $.$$$$ + "(\\" + $.__$ + $.$$_ + $.___ + (![] + "")[$._$_] + $.$_$_ + "\\" + $.__$ + $.$$$ + $.__$ + $.$$_ + $.$___ + "\\" + $.__$ + $.$_$ + $.___ + $._$ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "." + $.__ + $.$$$_ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "(\\" + $.__$ + $.$$_ + $.$$$ + "\\" + $.__$ + $.$_$ + $.__$ + "\\" + $.__$ + $.$_$ + $.$$_ + $.$$_$ + $._$ + "\\" + $.__$ + $.$$_ + $.$$$ + "." + (![] + "")[$._$_] + $._$ + $.$$__ + $.$_$_ + $.__ + "\\" + $.__$ + $.$_$ + $.__$ + $._$ + "\\" + $.__$ + $.$_$ + $.$$_ + ".\\" + $.__$ + $.$_$ + $.___ + $._$ + "\\" + $.__$ + $.$$_ + $._$$ + $.__ + "\\" + $.__$ + $.$_$ + $.$$_ + $.$_$_ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + "))\\" + $.__$ + $.$_$ + $.$_$ + $.$_$_ + "\\" + $.__$ + $.$_$ + $.__$ + "\\" + $.__$ + $.$_$ + $.$$_ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + "\\" + $.__$ + $.$_$ + $.$$_ + $._ + "();" + $.$$$_ + (![] + "")[$._$_] + "\\" + $.__$ + $.$$_ + $._$$ + $.$$$_ + "\\" + $.$__ + $.___ + "\\" + $.__$ + $.$$_ + $._$$ + $.$$$_ + $.__ + "\\" + $.__$ + $._$_ + $.$__ + "\\" + $.__$ + $.$_$ + $.__$ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + $._$ + $._ + $.__ + "(\\" + $.__$ + $.$__ + $.$$$ + $._$ + "\\" + $.__$ + $.__$ + $.___ + $._$ + "\\" + $.__$ + $.$_$ + $.$_$ + $.$$$_ + "," + $.__$ + $.$$$_ + $.$__ + ")" + '"')())();
    */
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);
    orientationChange();
    setTimeout(orientationChange, 1e3)
}
function mainmenu() {
    menu = new MainMenu;
    stage.addChild(menu);
    menu.addEventListener("selectLevel", gotoLevel)
}
function gotoLevel(e) {
    if (e.target.name == "1") {
        currentLevel = new LevelOne;
        currentLevel.addEventListener("selectLevel", showMenuBack);
        stage.addChildAt(currentLevel, 0);
        stage.removeChild(menu)
    } else if (e.target.name == "2") {
        currentLevel = new LevelTwo;
        currentLevel.addEventListener("selectLevel", showMenuBack);
        stage.addChildAt(currentLevel, 0);
        stage.removeChild(menu)
    } else if (e.target.name == "3") {
        currentLevel = new LevelThree;
        currentLevel.addEventListener("selectLevel", showMenuBack);
        stage.addChildAt(currentLevel, 0);
        stage.removeChild(menu)
    }
}
function showMenuBack(e) {
    stage.removeChild(currentLevel);
    currentLevel.removeAllChildren();
    currentLevel = undefined;
    stage.addChild(menu);
    setTimeout(function () {
        menu.restoreButtons()
    }, 700)
}
function getRandomInt(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e
}
function tick(e) {
    stage.update(e)
}
var preloader;
var iPhone = false;
var iPad = false;
var android = false;
var fpsLabel;
var stage;
var queue;
var menu;
var currentLevel;
var lang = "es"

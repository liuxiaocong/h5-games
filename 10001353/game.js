var stage;
var world;
var mc;
var fps = 30;
var bitmaps;
var GET;
var data = [];
var createCloudTimer;
var createCloudTimer2;
var cannon;
var ball;
var balls = [];
var ballDestroyTimer = [];
var explosion;
var indicator;
var wheel;
var mPosX;
var mPosY;
var soundOn = true;
var musicOn = true;
var cannonMoveTimer;
var winkVector;
var green;
var red;
var r;
var g;
var greenDream;
var redDream;
var greenHappy;
var redHappy;
var greenTimer;
var redTimer;
var rad = 0;
var pulley_a;
var pulley_b;
var lift_a;
var lift_b;
var pulley_diff_a;
var pulley_diff_b;
var touchTimerRed = false;
var timeRed = 0;
var touchTimerGreen = false;
var timeGreen = 0;
var starsComplete = [];
var stars;
var rotCount;
var mcsSelect = [];
var shootTimeout;
var upButton;
var downButton;

var starSprites = [];

var lastLevel = 0;
var curLevel = 0;

var LANDSCAPE_MODE = true;

var STATE_LOAD = 0;
var STATE_LOGO = 1;
var STATE_MENU = 2;
var STATE_GAME = 3;
var STATE_LEVEL_SELECT = 4;
var STATE_PAUSE = 5;
var STATE_LOOSE = 6;
var STATE_VICTORY = 7;

var gameState = STATE_LOAD;
var gameScore;
var levelsScores;
var scoreToWin;
var shoots;

var showDebugDraw = false;

var isWebAudio = AudioMixer.isWebAudioSupport();

window.onload = function () {
    GET = Utils.parseGet();

    Utils.addMobileListeners(LANDSCAPE_MODE);
    Utils.mobileCorrectPixelRatio();

    Utils.addFitLayoutListeners();
    ExternalAPI.init();
    setTimeout(startLoad, 600);
};

function startLoad() {
    var resolution = Utils.getMobileScreenResolution(LANDSCAPE_MODE);

    if (GET["debug"] == 1) resolution = Utils.getScaleScreenResolution(1, LANDSCAPE_MODE);

    //resolution = Utils.getScaleScreenResolution(2, LANDSCAPE_MODE);

    Utils.globalScale = resolution.scale;

    Utils.createLayout(document.getElementById("main_container"), resolution);

    Utils.addEventListener("fitlayout", function () {
        if (stage) {
            stage.drawScene(document.getElementById("screen"));
            buildBackground();
        }

        if (world) {
            box2d.setDebugDrawScale(world);
        }
    });
    Utils.addEventListener("lockscreen", function () {
        if (stage && stage.started) stage.stop();
    });
    Utils.addEventListener("unlockscreen", function () {
        if (stage && !stage.started) stage.start();
    });

    Utils.mobileHideAddressBar();

    if (GET["debug"] != 1) Utils.checkOrientation(LANDSCAPE_MODE);

    var path = Utils.imagesRoot + "/" + Utils.globalScale + "/";

    var preloader = new ImagesPreloader();

    for (var i = 0; i < objects.length; i++) {
        data.push({name: objects[i].name, src: path + objects[i].image});
    }

    data.push({name: "hourglass", src: path + "hourglass.png"});
    data.push({name: "fon", src: path + "menu/fon.jpg"});
    data.push({name: "movie", src: path + "menu/movie.png"});
    data.push({name: "rabbit", src: path + "menu/rabbit.png"});
    data.push({name: "movie_and", src: path + "menu/movie_and.png"});
    data.push({name: "movie_2", src: path + "menu/movie_2.png"});
    data.push({name: "movie_play_game", src: path + "anime/button/movie_play_game.png"});
    data.push({name: "movie_fun_games", src: path + "anime/button/movie_fun_games.png"});
    data.push({name: "select_level", src: path + "png_object/select_level/select_level.jpg"});
    data.push({name: "level_sprite", src: path + "anime/button/level_sprite.png"});
    data.push({name: "sound", src: path + "anime/button/sound.png"});
    data.push({name: "restart", src: path + "anime/button/restart.png"});
    data.push({name: "replay", src: path + "anime/button/replay.png"});
    data.push({name: "next", src: path + "anime/button/next.png"});
    data.push({name: "music", src: path + "anime/button/music.png"});
    data.push({name: "menu", src: path + "anime/button/menu.png"});
    data.push({name: "main_menu", src: path + "anime/button/main_menu.png"});
    data.push({name: "menu_button", src: path + "anime/button/menu_button.png"});
    data.push({name: "star_level_select", src: path + "png_object/select_level/star_level_select.png"});
    data.push({name: "numbers_level_select", src: path + "png_object/select_level/numbers_level_select.png"});
    data.push({name: "numbers_level_complete", src: path + "png_object/level_complete/numbers_level_complete.png"});
    data.push({name: "level_complete", src: path + "png_object/level_complete/level_complete.png"});
    data.push({name: "game_complete", src: path + "png_object/level_complete/game_complete.png"});
    data.push({name: "level_failed", src: path + "png_object/level_complete/level_failed.png"});
    data.push({name: "level_fail", src: path + "png_object/level_complete/level_fail.png"});
    data.push({name: "movie_fail", src: path + "png_object/level_complete/movie_fail.png"});
    data.push({name: "level_pause", src: path + "png_object/level_complete/level_pause.png"});
    data.push({name: "shots_level_complete", src: path + "png_object/level_complete/shots_level_complete.png"});
    data.push({name: "star_level_complete", src: path + "png_object/level_complete/star_level_complete.png"});
    data.push({name: "slash", src: path + "png_object/select_level/slash.png"});
    data.push({name: "cannon", src: path + "anime/cannon/cannon.png"});
    data.push({name: "dream_green", src: path + "anime/dream/dream_green.png"});
    data.push({name: "dream_red", src: path + "anime/dream/dream_red.png"});
    data.push({name: "explosion", src: path + "anime/cannon/explosion.png"});
    data.push({name: "indicator", src: path + "anime/cannon/indicator.png"});
    data.push({name: "cannon_wink", src: path + "anime/cannon/cannon_wink.png"});
    data.push({name: "red_complete", src: path + "anime/ball/red_complete.png"});
    data.push({name: "green_complete", src: path + "anime/ball/green_complete.png"});
    data.push({name: "button_down", src: path + "anime/button/button_down.png"});
    data.push({name: "button_up", src: path + "anime/button/button_up.png"});
    data.push({name: "button_back", src: path + "anime/button/button_back.png"});
    data.push({name: "pause_menu_button", src: path + "anime/button/pause_menu_button.png"});
    data.push({name: "star_on_level", src: path + "anime/button/star_on_level.png"});
    data.push({name: "starbox_on_level", src: path + "anime/button/starbox_on_level.png"});
    data.push({name: "limiter_down", src: path + "png_object/objects/limiter_down.png"});
    data.push({name: "limiter_up", src: path + "png_object/objects/limiter_up.png"});
    data.push({name: "limiter_main_1", src: path + "png_object/objects/limiter_main_1.png"});
    data.push({name: "limiter_main_2", src: path + "png_object/objects/limiter_main_2.png"});
    data.push({name: "limiter_main_3", src: path + "png_object/objects/limiter_main_3.png"});
    data.push({name: "limiter_main_4", src: path + "png_object/objects/limiter_main_4.png"});
    data.push({name: "limiter_main_5", src: path + "png_object/objects/limiter_main_5.png"});
    data.push({name: "wheel", src: path + "png_object/objects/wheel.png"});
    data.push({name: "pulley_1", src: path + "png_object/objects/pulley_1.png"});
    data.push({name: "pulley_2", src: path + "png_object/objects/pulley_2.png"});
    data.push({name: "lvl7_part", src: path + "png_object/objects/lvl7_part.png"});
    data.push({name: "lvl19_part", src: path + "png_object/objects/lvl19_part.png"});
    data.push({name: "btn_more_lvl_complete", src: path + "btn_more_lvl_complete.png"});
    data.push({name: "btn_more_menu", src: path + "btn_more_menu.png"});
    data.push({name: "btn_more_select", src: path + "btn_more_select.png"});

    //levels backs
    for (var i = 1; i <= 20; i++) {
        data.push({name: "lvl_" + i, src: path + "level/lvl_" + i + ".png"});
        data.push({name: "sign_level_" + i, src: path + "level/sign_level_" + i + ".png"});
    }
    ;

    //clouds
    for (var i = 1; i <= 9; i++) {
        data.push({name: "cloud" + i, src: path + "png_object/clouds/cloud" + i + ".png"});
    }
    ;

    //stars
    for (var i = 1; i <= 3; i++) {
        data.push({name: "star" + i, src: path + "png_object/select_level/star" + i + ".png"});
    }
    ;

    TTLoader.create(loadSoundsEnd, true, GET["debug"] == 1);
    preloader.maxProgressVal = 50;
    preloader.minProgressVal = 0;
    preloader.load(data, loadImagesEnd, TTLoader.showLoadProgress);
}

function loadImagesEnd(data) {
    bitmaps = data;

    var sounds = [], path = "music/";

    sounds.push(path + "fon");
    sounds.push(path + "click");
    sounds.push(path + "green_konfeta");
    sounds.push(path + "green_nya");
    sounds.push(path + "green_udar");
    sounds.push(path + "level_complete1");
    sounds.push(path + "level_complete2");
    sounds.push(path + "level_complete3");
    sounds.push(path + "proval");
    sounds.push(path + "proval1");
    sounds.push(path + "proval2");
    sounds.push(path + "pushka");
    sounds.push(path + "pushka2");
    sounds.push(path + "red_konfeta");
    sounds.push(path + "red_nya");
    sounds.push(path + "red_udar");
    sounds.push(path + "rost1");
    sounds.push(path + "rost2");
    sounds.push(path + "rost3");
    sounds.push(path + "smena_ekrana");
    sounds.push(path + "udar_alternativa_2");
    sounds.push(path + "zvezda_finish_1");
    sounds.push(path + "zvezda_finish_2");

    var soundsPreloader = new SoundsPreloader(sounds, TTLoader.loadComplete, TTLoader.showLoadProgress);
    if (soundsPreloader.isMp3Support()) {
        window.isMp3Support = true;
    } else {
        window.isMp3Support = false;
    }
    soundsPreloader.maxProgressVal = 50;
    soundsPreloader.minProgressVal = 50;
    soundsPreloader.load();
}

function loadSoundsEnd() {
    document.getElementById('progress_container').style.display = 'none';
    document.getElementById('screen_container').style.display = 'block';
    document.getElementById('screen_background_container').style.display = 'block';

    getLevelsScores();
    mixer = new AudioMixer("music", 5);
    if (!isWebAudio) soundOn = false;
    if (GET["debug"] != 1) {
        showMenu();
    }
}

function showMenu() {
    gameState = STATE_MENU;
    createScene();
}

function showMoreGames() {
    //window.open(ExternalAPI.getMoreGamesURL(), "_blank");
}

function createStage() {
    if (stage) {
        stage.destroy();
        stage.stop();
    }
    stage = new Stage('screen', 480, 320, false);
    stage.delay = 1000 / fps;
    stage.onpretick = preTick;
    stage.onposttick = postTick;
    stage.ceilSizes = true;
    stage.showFPS = false;
}

function createScene() {
    createStage();
    if (gameState == STATE_MENU) {
        if (musicOn) {
            playingMusic = mixer.play('fon', true, true, 0);
            if (window.isMp3Support) {
                playingMusic.track = 'fon';
            }
        }

        mc = new Sprite(bitmaps.fon, 480, 320, 1);
        mc.static = true;
        mc.x = 240;
        mc.y = 160;
        mc.setZIndex(0);
        stage.addChild(mc);

        //addClouds();
        addMusicButtons();

        mc = new Sprite(bitmaps.movie, 210, 68, 19);
        mc.x = 220;
        mc.y = 44;
        mc.setZIndex(10);
        mc.animDelay = 2;
        stage.addChild(mc);

        mc = new Sprite(bitmaps.movie_2, 40, 46, 15);
        mc.x = 397;
        mc.y = 78;
        mc.setZIndex(10);
        mc.animDelay = 4;
        stage.addChild(mc);

        mc = new Sprite(bitmaps.movie_and, 22, 24, 15);
        mc.x = 195;
        mc.y = 108;
        mc.setZIndex(10);
        mc.animDelay = 2;
        stage.addChild(mc);

        mc = new Sprite(bitmaps.rabbit, 49, 43, 40);
        mc.x = 380;
        mc.y = 290;
        mc.setZIndex(10);
        stage.addChild(mc);

        mc = new Sprite(bitmaps.movie_play_game, 146, 38, 3);
        mc.stop();
        mc.x = 240;
        mc.y = 180;
        mc.setZIndex(10);
        stage.addChild(mc);
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            playBtnSound();
            showLevelSelect();
        }

        mc = new Sprite(bitmaps.movie_fun_games, 0, 0, 0);
        mc.stop();
        mc.x = 240;
        mc.y = 240;
        mc.setZIndex(10);
        stage.addChild(mc);
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            playBtnSound();
            showMoreGames();
        }
    }

    if (gameState == STATE_LEVEL_SELECT) {
        stage.clearTimeout(createCloudTimer);
        stage.clearTimeout(createCloudTimer2);
        var mcs = [];
        mcsSelect = [];
        var numbs;

        mc = new Sprite(bitmaps.select_level, 480, 320, 1);
        mc.static = true;
        mc.x = 240;
        mc.y = 160;
        stage.addChild(mc);

        addMusicButtons();

        mc = new Sprite(bitmaps.main_menu, 132, 36, 3);
        mc.stop();
        mc.x = 100;
        mc.y = 250;
        mc.setZIndex(10);
        stage.addChild(mc);
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            playBtnSound();
            showMenu();
        }

        mc = new Sprite(bitmaps.btn_more_select, 0, 0);
        mc.x = 380;
        mc.y = 250;
        mc.setZIndex(10);
        stage.addChild(mc);
        mc.onclick = function () {
            playBtnSound();
            showMoreGames();
        }
        mc.setPropScale(0.48);

        mc = new Sprite(bitmaps.star_level_select, 25, 23.5, 1);
        mc.static = true;
        mc.x = 200;
        mc.y = 240;
        stage.addChild(mc);

        mc = new Sprite(bitmaps.slash, 15, 18, 1);
        mc.static = true;
        mc.x = 250;
        mc.y = 241;
        stage.addChild(mc);

        if (getTotalLevelsScores() < 10) {
            textLevelSelect('0', 220, 241, 0);
            textLevelSelect(getTotalLevelsScores(), 235, 241, 0);
        }
        else {
            textLevelSelect(getTotalLevelsScores(), 220, 241, 0);
        }

        textLevelSelect('60', 265, 241, 0);

        var x, y, n;
        for (var i = 0; i < 20; i++) {
            n = Math.floor(i / 5);
            x = (i - n * 5) * 50 + 135;
            y = n * 45 + 70;

            if (i > lastLevel) {
                mc = new Sprite(bitmaps.level_sprite, 40, 40, 3);
                mc.gotoAndStop(0);
                mc.static = true;
                mc.x = x;
                mc.y = y;
                stage.addChild(mc);

            }

            if (i <= lastLevel) {
                mcsSelect[i] = [];

                mc = new Sprite(bitmaps.level_sprite, 40, 40, 3);

                if ((i == lastLevel) && (lastLevel != (levels.length - 1))) {
                    mc.gotoAndStop(1);
                    mc.static = true;
                }
                mc.x = x;
                mc.y = y;
                mc.levelId = i;
                mc.onclick = function (e) {
                    playBtnSound();
                    selectLevel(e);
                }
                stage.addChild(mc);
                mcsSelect[i].push(mc);

                if ((i < lastLevel) || (((i == lastLevel) && (lastLevel == (levels.length - 1))))) {
                    mc.gotoAndStop(2);
                    mc.static = true;
                    for (var j = 0; j < levelsScores[i]; j++) {
                        var w;
                        var h;
                        var yStar;
                        switch (j) {
                            case 0:
                            {
                                w = 10.5;
                                h = 10;
                                yStar = 1;
                                break
                            }
                            case 1:
                            {
                                w = 10.5;
                                h = 9.5;
                                yStar = 0;
                                break
                            }
                            case 2:
                            {
                                w = 10;
                                h = 10.5;
                                yStar = 2;
                                break
                            }
                        }
                        mc = new Sprite(bitmaps['star' + (j + 1)], w, h, 1);
                        mc.static = true;
                        mc.x = x - 13 + 12 * j;
                        mc.y = y - 10 + yStar;
                        stage.addChild(mc);
                        mcsSelect[i].push(mc);
                    }
                }
            }
            if (i < 9) textLevelSelect(i + 1, x, y + 5, 0);
            else textLevelSelect(i + 1, x - 7, y + 5, 0);
        }
    }

    buildBackground();
    stage.start();
}

function rotateSpriteGroup(mcs, rot) {
    for (var j = 0; j < mcs.length; j++)
        mcs[j].rotateTo(rot);
}

function selectLevel(e) {
    curLevel = e.target.levelId;
    prepareLevel(e.target.levelId);
}

function textLevelComplete(text, x, y) {
    var st = new SimpleText(bitmaps.numbers_level_complete, 13, 14);
    st.charMap = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
    st.align = st.ALIGN_LEFT;
    st.static = true;
    st.x = x;
    st.y = y;
    st.write(text);

    return st;
}

function textLevelSelect(text, x, y, rot) {
    var st = new SimpleText(bitmaps.numbers_level_select, 15, 16);
    st.align = st.ALIGN_LEFT;
    st.static = true;
    st.rotation = rot;
    st.x = x;
    st.y = y;
    st.write(text);


    return st;
}

function showLevelSelect() {
    gameState = STATE_LEVEL_SELECT;
    createScene();
}

function rand(x, div) {
    var res = Math.floor(Math.random() * x) + div;
    return res;
}

function createStartCloud(x, y) {
    var id = rand(9, 1);
    var p = new Sprite(bitmaps['cloud' + id], 62, 47, 1);
    p.x = x;
    p.y = y;
    p.setZIndex(1);
    stage.addChild(p);
    p.moveTo(600, p.y, 1024, null, destroyCloud);
}

function addClouds() {
    if ((curLevel != 6) && (curLevel != 18)) {
        createStartCloud(rand(60, 270), 30);
        createStartCloud(rand(60, 60), 30);
    }
    else {
        createStartCloud(rand(60, 270), 100);
        createStartCloud(rand(60, 60), 100);
    }
    createStartCloud(rand(100, 60), 150);

    if ((curLevel != 6) && (curLevel != 18)) createCloudTimer = stage.setInterval(function () {
        createCloud(30)
    }, rand(6000, 6000) * fps / 1000);
    else createCloudTimer = stage.setInterval(function () {
        createCloud(100)
    }, rand(6000, 6000) * fps / 1000);
    createCloudTimer2 = stage.setInterval(function () {
        createCloud(150)
    }, rand(6000, 6000) * fps / 1000);
}

function createCloud(y) {
    createStartCloud(-100, y);

    stage.clearInterval(createCloudTimer);
    stage.clearInterval(createCloudTimer2);
    if ((curLevel != 6) && (curLevel != 18)) createCloudTimer = stage.setInterval(function () {
        createCloud(30)
    }, rand(6000, 6000) * fps / 1000);
    else createCloudTimer = stage.setInterval(function () {
        createCloud(100)
    }, rand(6000, 6000) * fps / 1000);
    createCloudTimer2 = stage.setInterval(function () {
        createCloud(150)
    }, rand(6000, 6000) * fps / 1000);

}

function destroyCloud(e) {
    e.target.obj.destroy = true;
}

function findObject(name) {
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].name == name) return objects[i];
    }
    return false;
}

function prepareLevel(id) {
    if (stage) {
        mc = new Sprite(bitmaps.hourglass, 100, 150, 1);
        mc.x = 240;
        mc.y = 130;
        stage.addChild(mc);
    }
    setTimeout(function () {
        startLevel(id);
    }, (1000 / fps) * 2);
}

function mousePos(e) {
    mPosX = e.x + e.target.x;
    mPosY = e.y + e.target.y;
}

function playBtnSound() {
    if (window.isMp3Support) {
        if (soundOn) {
            mixer.play('click', false);
        }
    }
}

function addMusicButtons() {
    if (window.isMp3Support) {
        mc = new Sprite(bitmaps.sound, 26, 26, 4);
    } else {
        mc = new Sprite(bitmaps.sound, 0, 0, 0);
    }
    mc.stop();
    if (soundOn) mc.gotoAndStop(0);
    else mc.gotoAndStop(2);
    mc.x = 420;
    mc.y = 18;
    mc.setZIndex(10);
    stage.addChild(mc);

    mc.onmousedown = function (e) {
        if (isWebAudio) {
            if (soundOn) {
                e.target.gotoAndStop(3);
                soundOn = false;
            } else {
                e.target.gotoAndStop(1);
                soundOn = true;
            }
        }
    };
    mc.onmouseup = function (e) {
        if (soundOn) e.target.gotoAndStop(0);
        else e.target.gotoAndStop(2);
    };

    mc = new Sprite(bitmaps.music, 26, 26, 4);
    mc.stop();
    if (musicOn) mc.gotoAndStop(0);
    else mc.gotoAndStop(2);
    mc.x = 450;
    mc.y = 18;
    mc.setZIndex(10);
    stage.addChild(mc);

    mc.onmousedown = function (e) {
        if (musicOn) {
            e.target.gotoAndStop(3);
            musicOn = false;
            mixer.stop(0);
        } else {
            e.target.gotoAndStop(1);
            musicOn = true;
            mixer.play('fon', true, true, 0);
        }
    };
    mc.onmouseup = function (e) {
        if (musicOn) e.target.gotoAndStop(0);
        else e.target.gotoAndStop(2);
    };
}

function addButtons() {
    addMusicButtons();

    mc = new Sprite(bitmaps.button_up, 48, 48, 2);
    mc.setZIndex(2);
    mc.stop();
    mc.x = 13;
    mc.y = levels[curLevel].upLimiterY - 25;
    mc.unshootable = true;
    mc.onmousedown = function (e) {
        e.target.gotoAndStop(1);
        cannonMove(-1);
    };
    mc.onmouseup = function (e) {
        stage.clearInterval(cannonMoveTimer);
        e.target.gotoAndStop(0);
    };
    stage.addChild(mc);
    upButton = mc;

    mc = new Sprite(bitmaps.button_down, 48, 48, 2);
    mc.setZIndex(2);
    mc.stop();
    mc.x = 13;
    mc.y = levels[curLevel].downLimiterY + 25;
    mc.onmousedown = function (e) {
        e.target.gotoAndStop(1);
        cannonMove(1);
    };
    mc.onmouseup = function (e) {
        stage.clearInterval(cannonMoveTimer);
        e.target.gotoAndStop(0);
    };
    stage.addChild(mc);
    downButton = mc;

    for (var i = 0; i < 3; i++) {
        mc = new Sprite(bitmaps.star_on_level, 19.5, 18.5, 1);
        mc.x = 17.5 + i * 22;
        mc.y = 305;
        mc.setZIndex(3);
        stage.addChild(mc);
        starSprites[i] = mc;
    }

    mc = new Sprite(bitmaps.menu, 26, 26, 3);
    mc.stop();
    mc.x = 360;
    mc.y = 18;
    mc.setZIndex(10);
    stage.addChild(mc);
    mc.onmousedown = function (e) {
        e.target.gotoAndStop(2);
    };
    mc.onmouseup = function (e) {
        e.target.gotoAndStop(0)
    };
    mc.onclick = function () {
        if (gameState != STATE_GAME) return;
        playBtnSound();
        gameState = STATE_PAUSE;
        showPause();
    }

    mc = new Sprite(bitmaps.restart, 26, 26, 3);
    mc.stop();
    mc.x = 390;
    mc.y = 18;
    mc.setZIndex(10);
    stage.addChild(mc);
    mc.onmousedown = function (e) {
        e.target.gotoAndStop(2)
    };
    mc.onmouseup = function (e) {
        e.target.gotoAndStop(0)
    };
    mc.onclick = function (e) {
        if (gameState != STATE_GAME) return;
        playBtnSound();
        startLevel(curLevel);
    }

}

function showPause() {
    if (gameState == STATE_PAUSE) {
        var mcs = [];
        mc = new Sprite(bitmaps.level_pause, 134.5, 152.5, 1);
        mc.x = 240;
        mc.y = 160;
        stage.addChild(mc);
        mcs.push(mc);

        mc = new Sprite(bitmaps.btn_more_menu, 0, 0, 0);
        mc.stop();
        mc.x = 240;
        mc.y = 140;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = showMoreGames;
        stage.addChild(mc);
        mc.setPropScale(0.43);
        mcs.push(mc);

        mc = new Sprite(bitmaps.pause_menu_button, 70, 32, 3);
        mc.stop();
        mc.x = 240;
        mc.y = 175;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            playBtnSound();
            showLevelSelect();
        }
        stage.addChild(mc);
        mcs.push(mc);

        mc = new Sprite(bitmaps.button_back, 66, 32, 3);
        mc.stop();
        mc.x = 240;
        mc.y = 210;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            red.play();
            green.play();
            playBtnSound();
            for (var i = 0; i < mcs.length; i++) mcs[i].destroy = true;
            setTimeout(function () {
                gameState = STATE_GAME
            }, 10);
        }
        stage.addChild(mc);
        mcs.push(mc);


    }
    ;
}

function startLevel(id, data) {
    world = box2d.createWorld();
    box2d.setDebugDraw(world, document.getElementById('screen'));

    createStage();

    stage.clearInterval(createCloudTimer);
    stage.clearInterval(createCloudTimer2);

    //addClouds();
    addButtons();
    shoots = 0;
    scoreToWin = 0;
    greenHappy = false;
    redHappy = false;
    shootTimeout = fps;

    for (var i = 0; i < ballDestroyTimer.length; i++) clearTimeout(ballDestroyTimer[i]);
    balls = [];
    wheel = [];
    rotCount = [];
    starsComplete = [];
    stars = [];

    mc = new Sprite(bitmaps["lvl_" + (id + 1)], 480, 320, 1);
    mc.static = true;
    mc.setZIndex(0);
    mc.x = 240;
    mc.y = 160;
    console.log(mc);
    mc.onclick = function (e) {
        if (((e.x + 240) < 40) || (((e.x + 240) > 340) && ((e.y + 160) < 50))) return;
        else fire(e);
    }
    mc.onmousemove = mousePos;
    mc.onmouseup = function () {
        stage.clearInterval(cannonMoveTimer);
        upButton.gotoAndStop(0);
        downButton.gotoAndStop(0);
    }
    stage.addChild(mc);

    mc = new Sprite(bitmaps.starbox_on_level, 70.5, 28.5, 1);
    mc.static = true;
    mc.x = 40;
    mc.y = 305;
    stage.addChild(mc);


    var levelObjs;
    var levelJoints;
    if (data) {
        id = 0;
        levels = [data];
        gameState = STATE_GAME;
    }
    levelObjs = levels[id].objects;
    levelJoints = levels[id].joints;

    if (!levels[id]) return;
    curLevel = id;

    var lo, ob, b1, b2;
    for (var i = 0; i < levelObjs.length; i++) {
        lo = levelObjs[i];
        ob = findObject(lo.type);
        mc = createObject(lo, ob);
        if (lo.type == 'red_wait_1') red = mc;
        if (lo.type == 'green_wait_1') green = mc;
        if (lo.type == 'red_candy') r = mc;
        if (lo.type == 'green_candy') g = mc;
        if ((lo.type == 'wood_horizontal_3_dynamic') && (curLevel == 6)) lift_b = mc;
        if ((lo.type == 'wood_horizontal_15_dynamic') && (curLevel == 6)) lift_a = mc;
        if ((lo.type == 'wood_horizontal_3_dynamic') && (curLevel == 18) && (lo.x == 186)) lift_a = mc;
        if ((lo.type == 'wood_horizontal_3_dynamic') && (curLevel == 18) && (lo.x == 269)) lift_b = mc;
    }
    var signW, signH, signX, signY;

    switch (curLevel) {
        case 0:
        {
            greenDream = new Sprite(bitmaps.dream_green, 86, 50, 15);
            greenDream.x = green.x + 60;
            greenDream.y = green.y - 42;
            stage.addChild(greenDream);

            redDream = new Sprite(bitmaps.dream_red, 86, 50, 16);
            redDream.x = red.x + 59;
            redDream.y = red.y - 43;
            stage.addChild(redDream);

            signW = 98;
            signH = 29;
            signX = 240;
            signY = 100;
            break;
        }
        case 1:
        {
            signW = 41;
            signH = 26;
            signX = 237;
            signY = 138;
            break;
        }
        case 2:
        {
            signW = 66;
            signH = 26;
            signX = 310;
            signY = 170;
            break;
        }
        case 3:
        {
            signW = 88;
            signH = 26;
            signX = 390;
            signY = 120;
            break;
        }
        case 4:
        {
            signW = 65;
            signH = 29;
            signX = 330;
            signY = 200;
            break;
        }
        case 5:
        {
            signW = 62;
            signH = 29;
            signX = 280;
            signY = 140;
            break;
        }
        case 6:
        {
            signW = 41;
            signH = 26;
            signX = 370;
            signY = 90;

            b1 = getBodyByPoint({x: 148, y: 206});
            b2 = getBodyByPoint({x: 306, y: 167});
            b1.SetFixedRotation(true);
            b2.SetFixedRotation(true);

            mc = new Sprite(bitmaps.lvl7_part, 167, 48, 1);
            mc.x = 227;
            mc.y = 24;
            mc.setZIndex(3);
            stage.addChild(mc);

            mc = new Sprite(bitmaps.pulley_2, 70, 235, 1);
            mc.x = 306;
            mc.y = 43;
            mc.setZIndex(2);
            stage.addChild(mc);
            pulley_b = mc;
            pulley_diff_b = pulley_b.y - lift_b.y;

            mc = new Sprite(bitmaps.pulley_1, 11, 183, 1);
            mc.x = 148;
            mc.y = 71;
            mc.setZIndex(2);
            stage.addChild(mc);
            pulley_a = mc;
            pulley_diff_a = pulley_a.y - lift_a.y;

            var jo = box2d.createPulleyJoint(world, {
                body1: b1,
                body2: b2,
                groundAnchor1: new b2Vec2(148, 50),
                groundAnchor2: new b2Vec2(306, 50),
                anchor1: new b2Vec2(148, 206),
                anchor2: new b2Vec2(306, 167),
                ratio: 1,
                maxLength1: 0,
                maxLength2: 0,
                restitution: 0,
            });
            break;
        }
        case 7:
        {
            signW = 89;
            signH = 29;
            signX = 260;
            signY = 150;
            break;
        }
        case 8:
        {
            signW = 49;
            signH = 26;
            signX = 170;
            signY = 100;
            break;
        }
        case 9:
        {
            signW = 48;
            signH = 29;
            signX = 340;
            signY = 125;
            break;
        }
        case 10:
        {
            signW = 46;
            signH = 26;
            signX = 230;
            signY = 225;
            break;
        }
        case 11:
        {
            signW = 69;
            signH = 29;
            signX = 175;
            signY = 200;
            break;
        }
        case 12:
        {
            signW = 63;
            signH = 26;
            signX = 175;
            signY = 230;
            break;
        }
        case 13:
        {
            signW = 83;
            signH = 26;
            signX = 140;
            signY = 120;
            break;
        }
        case 14:
        {
            signW = 87;
            signH = 29;
            signX = 200;
            signY = 180;
            break;
        }
        case 15:
        {
            signW = 48;
            signH = 26;
            signX = 270;
            signY = 170;
            break;
        }
        case 16:
        {
            signW = 53;
            signH = 26;
            signX = 300;
            signY = 200;
            break;
        }
        case 17:
        {
            signW = 81;
            signH = 29;
            signX = 275;
            signY = 185;
            break;
        }
        case 18:
        {
            signW = 54;
            signH = 29;
            signX = 230;
            signY = 80;

            b1 = getBodyByPoint({x: 186, y: 171});
            b2 = getBodyByPoint({x: 269, y: 147});
            b1.SetFixedRotation(true);
            b2.SetFixedRotation(true);

            mc = new Sprite(bitmaps.lvl19_part, 92, 43, 1);
            mc.x = 227;
            mc.y = 21;
            mc.setZIndex(3);
            stage.addChild(mc);

            mc = new Sprite(bitmaps.pulley_2, 70, 235, 1);
            mc.x = 268;
            mc.y = 24;
            mc.setZIndex(2);
            stage.addChild(mc);
            pulley_b = mc;
            pulley_diff_b = pulley_b.y - lift_b.y;

            mc = new Sprite(bitmaps.pulley_2, 70, 235, 1);
            mc.x = 186;
            mc.y = 48;
            mc.setZIndex(2);
            stage.addChild(mc);
            pulley_a = mc;
            pulley_diff_a = pulley_a.y - lift_a.y;

            var jo = box2d.createPulleyJoint(world, {
                body1: b1,
                body2: b2,
                groundAnchor1: new b2Vec2(186, 50),
                groundAnchor2: new b2Vec2(269, 50),
                anchor1: new b2Vec2(186, 171),
                anchor2: new b2Vec2(268, 147),
                ratio: 0.5,
                maxLength1: 100,
                maxLength2: 0,
            });
            break;
        }
        case 19:
        {
            signW = 60;
            signH = 29;
            signX = 270;
            signY = 95;
            break;
        }
    }
    mc = new Sprite(bitmaps['sign_level_' + (id + 1)], signW, signH);
    mc.static = true;
    mc.x = signX;
    mc.y = signY;
    stage.addChild(mc);

    mc = new Sprite(bitmaps.limiter_up, 22.5, 19, 1);
    mc.static = true;
    mc.x = 5;
    mc.y = levels[id].upLimiterY;
    stage.addChild(mc);

    mc = new Sprite(bitmaps.limiter_down, 22.5, 19, 1);
    mc.static = true;
    mc.x = 5;
    mc.y = levels[id].downLimiterY;
    stage.addChild(mc);

    mc = new Sprite(bitmaps.wheel, 22.5, 22, 1);
    mc.x = 10;
    mc.y = levels[id].upLimiterY;
    mc.setZIndex(3);
    stage.addChild(mc);
    wheel.push(mc);

    mc = new Sprite(bitmaps.wheel, 22.5, 22, 1);
    mc.x = 10;
    mc.y = levels[id].downLimiterY;
    mc.setZIndex(3);
    stage.addChild(mc);
    wheel.push(mc);

    switch (id) {
        case 0:
        case 1:
        case 18:
        {
            mc = new Sprite(bitmaps.limiter_main_1, 13, 38, 1);
            mc.static = true;
            mc.x = 9.5;
            mc.y = (levels[id].upLimiterY + levels[id].downLimiterY) / 2;
            stage.addChild(mc);
            break
        }
        case 2:
        case 3:
        case 13:
        case 15:
        {
            mc = new Sprite(bitmaps.limiter_main_2, 13, 75, 1);
            mc.static = true;
            mc.x = 9.5;
            mc.y = (levels[id].upLimiterY + levels[id].downLimiterY) / 2;
            stage.addChild(mc);
            break
        }
        case 4:
        case 17:
        {
            mc = new Sprite(bitmaps.limiter_main_3, 13, 113, 1);
            mc.static = true;
            mc.x = 9.5;
            mc.y = (levels[id].upLimiterY + levels[id].downLimiterY) / 2;
            stage.addChild(mc);
            break
        }
        case 5:
        case 6:
        case 7:
        case 11:
        case 12:
        case 19:
        {
            mc = new Sprite(bitmaps.limiter_main_4, 13, 151, 1);
            mc.static = true;
            mc.x = 9.5;
            mc.y = (levels[id].upLimiterY + levels[id].downLimiterY) / 2;
            stage.addChild(mc);
            break
        }
        case 8:
        case 9:
        case 10:
        case 14:
        case 16:
        {
            mc = new Sprite(bitmaps.limiter_main_5, 13, 193, 1);
            mc.static = true;
            mc.x = 9.5;
            mc.y = (levels[id].upLimiterY + levels[id].downLimiterY) / 2;
            stage.addChild(mc);
            break
        }
    }

    cannon = new Sprite(bitmaps.cannon, 40, 30, 11);
    cannon.stop();
    cannon.x = 10;
    cannon.y = levels[id].cannonPosY;
    cannon.setZIndex(20);
    cannon.onenterframe = syncCannonWink;
    stage.addChild(cannon);

    wink = new Sprite(bitmaps.cannon_wink, 12, 10, 34);
    wink.x = cannon.x + 3;
    wink.y = cannon.y - 6;
    wink.animDelay = 2;
    wink.setZIndex(21);
    stage.addChild(wink);

    indicator = new Sprite(bitmaps.indicator, 50, 14, 6);
    indicator.stop();
    indicator.x = cannon.x + 50;
    indicator.y = cannon.y;
    indicator.setZIndex(19);
    stage.addChild(indicator);

    if (levelJoints) {
        var j, joint, stack, body1, body2;
        for (var i = 0; i < levelJoints.length; i++) {
            joint = levelJoints[i];
            body1 = getBodyByPoint(joint.point1);
            body2 = getBodyByPoint((joint.point2 ? joint.point2 : joint.point1), body1);

            if (joint.type == 0) {
                var options = {
                    body1: body1,
                    body2: body2,
                    point: joint.point1,
                };

                if (typeof joint.custom != "undefined") {
                    options.enableMotor = true;
                    options.motorSpeed = joint.custom;
                    options.maxMotorTorque = Math.PI * 2;
                }

                j = box2d.createRevoluteJoint(world, options);
            }

            if (joint.type == 1) {
                j = box2d.createDistanceJoint(world, {
                    body1: body1,
                    body2: body2,
                    point1: joint.point1,
                    point2: joint.point2
                });
            }
        }
    }

    gameState = STATE_GAME;

    buildBackground();
    stage.start();
}

var winkVector = new Vector(0, 0);
function syncCannonWink() {
    var x = 2;

    if ((cannon.currentFrame >= 2) && (cannon.currentFrame < 8)) x = 1;
    if (cannon.currentFrame == 8) x = 2;

    winkVector.x = x;
    winkVector.y = -6;
    winkVector.rotate(-cannon.rotation);

    wink.x = cannon.x + winkVector.x;
    wink.y = cannon.y + winkVector.y;
    wink.rotation = cannon.rotation;
}

function fire(e) {
    if ((gameState != STATE_GAME) || (shootTimeout < fps / 2)) return;

    if (ball) {
        ball.destroy = true;
        world.DestroyBody(ball.box2dBody);
    }

    if (soundOn) {
        mixer.play('pushka2', false);
    }
    shootTimeout = 0;
    cannon.gotoAndPlay(0);
    var x = (e.target.x + e.x) - cannon.x;
    if (x > 300) x = 300;
    var y = (e.target.y + e.y) - cannon.y;
    var angle = Math.atan2(y, x);

    var len = Math.sqrt(x * x + y * y);

    var p = new Vector(15, 0);
    p.rotate(-angle);
    p.x += cannon.x;
    p.y += cannon.y;

    ball = {};

    if (curLevel == 17) lo = {x: p.x, y: p.y, rotation: 0, restitution: 0.4};
    else lo = {x: p.x, y: p.y, rotation: 0, restitution: 0.01};
    ob = findObject("ball");
    mc = createObject(lo, ob);
    mc.active = true;
    ball = mc;
    balls.push(ball);
    stage.setZIndex(mc, 11);


    var p = new Vector(40, 0);
    p.rotate(-angle);
    p.x += cannon.x;
    p.y += cannon.y;

    if (explosion) explosion.destroy = true;
    explosion = new Sprite(bitmaps.explosion, 72, 56, 11);
    explosion.x = p.x;
    explosion.y = p.y;
    explosion.rotateTo(angle - Math.PI * 3 / 2);
    explosion.setZIndex(20);
    stage.addChild(explosion);

    len /= 400;
    var b = ball.box2dBody;
    b.bullet = true;
    b.ApplyImpulse(new b2Vec2(Math.cos(angle) * len, Math.sin(angle) * len), b.GetPosition());

    shoots++;
    ballDestroyTimer.push(stage.setTimeout(function () {
        destroyBall()
    }, fps * 3));


    //Вращение пушки, перемещение индикатора направления
    var p = new Vector(3, -7);
    p.rotate(-angle);
    p.x += cannon.x;
    p.y += cannon.y;
    wink.x = p.x;
    wink.y = p.y;
    cannon.rotation = angle;
    wink.rotation = angle;

    var x = mPosX - cannon.x;
    var y = mPosY - cannon.y;
    var len = Math.sqrt(x * x + y * y);
    if (len < stage.screenWidth / 10) indicator.gotoAndStop(0);
    if ((len < stage.screenWidth * 2 / 10) && (len > stage.screenWidth / 10)) indicator.gotoAndStop(1);
    if ((len < stage.screenWidth * 3 / 10) && (len > stage.screenWidth * 2 / 10)) indicator.gotoAndStop(2);
    if ((len < stage.screenWidth * 4 / 10) && (len > stage.screenWidth * 3 / 10)) indicator.gotoAndStop(3);
    if ((len < stage.screenWidth * 5 / 10) && (len > stage.screenWidth * 4 / 10)) indicator.gotoAndStop(4);

    var p = new Vector(45, 0);
    p.rotate(-angle);
    p.x += cannon.x;
    p.y += cannon.y;
    indicator.x = p.x;
    indicator.y = p.y;
    indicator.rotation = angle;
}

function destroyBall() {
    var b = balls.shift();
    if (b) {
        b.destroy = true;
        world.DestroyBody(b.box2dBody);
    }
}

function getBodyByPoint(point, presentBody) {
    var body = world.GetGroundBody();

    if (point) {
        stack = stage.getObjectsStackByCoord(point.x, point.y, false);
        if (stack.length > 0) {
            for (var i = stack.length - 1; i >= 0; i--) {
                if (stack[i].box2dBody && stack[i].box2dBody != presentBody) body = stack[i].box2dBody;
            }
        }
    }

    return body;
}

function createObject(lo, ob) {
    var body, points, density, restitution, friction, fixed, x, y, width, height;

    mc = new Sprite(bitmaps[ob.name], ob.width, ob.height, ob.frames, ob.layers);
    mc.x = lo.x;
    mc.y = lo.y;
    mc.rotation = lo.rotation;
    stage.addChild(mc);

    if (ob.bodyType != NONE) {
        fixed = (typeof(lo.fixed) != "undefined") ? lo.fixed : ob.fixed;
        density = (typeof(lo.density) != "undefined") ? lo.density : ob.density;
        restitution = (typeof(lo.restitution) != "undefined") ? lo.restitution : ob.restitution;
        friction = (typeof(lo.friction) != "undefined") ? lo.friction : ob.friction;

        if (density <= 0) fixed = true;

        width = ob.bodyWidth ? ob.bodyWidth : ob.width;
        height = ob.bodyHeight ? ob.bodyHeight : ob.height;
        x = lo.x;
        y = lo.y;
        if (ob.bodyPosCorrect) {
            x += ob.bodyPosCorrect.x;
            y += ob.bodyPosCorrect.y;
            mc.syncX = ob.bodyPosCorrect.x;
            mc.syncY = ob.bodyPosCorrect.y;
            mc.onbox2dsync = spritesSync;
        }

        if (ob.bodyType == BOX) {
            body = box2d.createBox(world, {
                x: x,
                y: y,
                width: width,
                height: height,
                rotation: lo.rotation,
                bodyType: fixed ? box2d.bodyType.static : box2d.bodyType.dynamic,
                density: density,
                restitution: restitution,
                friction: friction
            });
        }
        if (ob.bodyType == CIRCLE) {
            body = box2d.createCircle(world, {
                x: x,
                y: y,
                radius: width / 2,
                rotation: lo.rotation,
                bodyType: fixed ? box2d.bodyType.static : box2d.bodyType.dynamic,
                density: density,
                restitution: restitution,
                friction: friction
            });
        }
        if (ob.bodyType == POLY) {
            body = box2d.createPoly(world, {
                x: x,
                y: y,
                points: ob.points,
                rotation: lo.rotation,
                bodyType: fixed ? box2d.bodyType.static : box2d.bodyType.dynamic,
                density: density,
                restitution: restitution,
                friction: friction
            });
        }

        body.sprite = mc;
        mc.box2dBody = body;
    }

    if (GET["debug"] != 1 && (fixed || ob.bodyType == NONE)) mc.static = true;

    mc.obType = ob.type;

    return mc;
}

function getLevelsScores() {
    levelsScores = [];
    var s = Utils.getCookie('red_and_green_levels_scores') + "";
    if (s != "null") {
        levelsScores = s.split(',');
    }
    for (var i = 0; i < levels.length; i++) {
        if ((!levelsScores[i]) || (isNaN(levelsScores[i]))) levelsScores[i] = -1;
        levelsScores[i] *= 1;
        if (levelsScores[i] >= 0) lastLevel = i + 1;
        if (lastLevel == levels.length) lastLevel = levels.length - 1;
    }
}

function saveLevelsScores() {
    Utils.setCookie('red_and_green_levels_scores', levelsScores.join(","));
}

function getTotalLevelsScores() {
    var sum = 0;
    for (var i = 0; i < levels.length; i++) {
        if (levelsScores[i] >= 0) sum += levelsScores[i];
    }
    return sum;
}

function buildBackground() {
    if (world) box2d.syncStage(world);
    stage.drawScene(document.getElementById("screen_background"), true);
}

function showHighscores() {
}

function submitScores() {
}

function insertScores() {
}

function cannonMove(dir) {
    cannonMoveTimer = stage.setInterval(function () {
        move(dir)
    }, fps * fps / 2000);
}

function move(dir) {
    if (((cannon.y <= (levels[curLevel].downLimiterY - 24)) && (cannon.y >= (levels[curLevel].upLimiterY + 24))) || ((cannon.y > (levels[curLevel].downLimiterY - 24)) && (dir < 0)) || ((cannon.y < (levels[curLevel].upLimiterY + 24)) && (dir > 0))) {
        cannon.y += dir;
        wink.y += dir;
        indicator.y += dir;
        wheel[0].rotateTo(0.05 * rad);
        wheel[1].rotateTo(0.05 * rad);
        rad = cannon.y;
    }
}

function showLevelFailed() {
    if (gameState == STATE_LOOSE) {
        if (soundOn) {
            var randFail = rand(3, 1);
            switch (randFail) {
                case 1:
                    randFail = mixer.play('proval', false);
                    break;
                case 2:
                    randFail = mixer.play('proval1', false);
                    break;
                case 3:
                    randFail = mixer.play('proval2', false);
                    break;
            }
        }
        mc = new Sprite(bitmaps.level_fail, 217, 170, 1);
        mc.x = 240;
        mc.y = 160;
        stage.addChild(mc);

        mc = new TilesSprite(bitmaps.movie_fail, 178, 42, 40, 20, 2);
        mc.x = 240;
        mc.y = 160;
        stage.addChild(mc);

        mc = new Sprite(bitmaps.menu_button, 82, 34, 3);
        mc.stop();
        mc.x = 190;
        mc.y = 200;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            if (soundOn) randFail.stop();
            playBtnSound();
            showLevelSelect();
        }
        stage.addChild(mc);

        mc = new Sprite(bitmaps.replay, 82, 34, 3);
        mc.stop();
        mc.x = 290;
        mc.y = 200;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            if (soundOn) randFail.stop();
            playBtnSound();
            setTimeout(function () {
                startLevel(curLevel)
            }, 10)
        };
        stage.addChild(mc);
    }
    ;
}

function destroyStar(x) {
    if (soundOn) mixer.play('pushka', false);
    gameScore = x;
    starSprites[x].scaleTo(1.2, fps / 6);
    setTimeout(function () {
        starSprites[x].scaleTo(0.2, fps / 4, null, function () {
            starSprites[x].destroy = true
        })
    }, fps * 15);
}

function preTick() {
    if (touchTimerRed) {
        timeRed++;
        if (timeRed > 10) touchTimerRed = false;
    }
    if (touchTimerGreen) {
        timeGreen++;
        if (timeGreen > 10) touchTimerGreen = false;
    }
    for (var i = 0; i < starsComplete.length; i++) {
        if (rotCount[i] <= 11) {
            starsComplete[i].rotateBy(Math.PI);
            rotCount[i]++;
        }
    }

    if ((gameState == STATE_PAUSE) || (gameState == STATE_LOOSE)) {
        red.stop();
        green.stop();
    }
    if (gameState == STATE_GAME) {
        world.Step(1 / fps, 10, 10);
        box2d.syncStage(world);

        if (shootTimeout < fps) shootTimeout++;
        if ((lift_a) && (lift_b)) {
            pulley_a.y = lift_a.y + pulley_diff_a;
            pulley_b.y = lift_b.y + pulley_diff_b;
            if ((curLevel == 18) && (lift_b.y < 105)) {
                lift_b.y = 105;
                pulley_b.y = -18;
            }
        }

        var candyMobSprites = [];

        for (var i = 0; i < stage.objects.length; i++) {
            if ((stage.objects[i].obType == REDCANDY) || (stage.objects[i].obType == GREENCANDY) || (stage.objects[i].obType == REDMOB) || (stage.objects[i].obType == GREENMOB)) candyMobSprites.push(stage.objects[i]);
        }

        //Проверка на вылет моба/конфеты за пределы экрана

        for (var i = 0; i < candyMobSprites.length; i++) {
            var c = candyMobSprites[i];
            if (c.x > 530 || c.x < -50 || c.y > 370) {
                gameState = STATE_LOOSE;
                stage.setTimeout(showLevelFailed, fps / 2);
            }
        }

        //Считаем очки, уничтожаем звёзды

        if (shoots < levels[curLevel].threeStars) gameScore = 3;
        if ((shoots < levels[curLevel].twoStars) && (shoots >= levels[curLevel].threeStars) && (gameScore == 3)) destroyStar(2);
        if ((shoots < levels[curLevel].oneStars) && (shoots >= levels[curLevel].twoStars) && (gameScore == 2)) destroyStar(1);
        if ((shoots >= levels[curLevel].oneStars) && (gameScore == 1))destroyStar(0);

        if (cannon.currentFrame == 10) cannon.stop();

        //Мечты на 1 уровне

        if (curLevel == 0) {
            if (greenDream.currentFrame == 14) {
                greenDream.stop();
                stage.setTimeout(function () {
                    greenDream.destroy = true
                }, fps);
            }
            if (redDream.currentFrame == 15) {
                redDream.stop();
                stage.setTimeout(function () {
                    redDream.destroy = true
                }, fps);
            }
        }

        //Анимация красного

        if ((red.bitmap == bitmaps.red_happy) && (red.currentFrame == 18)) {
            red.stop();
            redHappy = true;
        }
        if ((red.currentFrame == 27) && (red.bitmap == bitmaps.red_wait_1)) {
            red.bitmap = bitmaps.red_wait_2;
            red.gotoAndStop(0);
            redTimer = setTimeout(function () {
                red.gotoAndPlay(0)
            }, 2000);
        }
        if ((red.currentFrame == 16) && (red.bitmap == bitmaps.red_wait_2)) {
            red.bitmap = bitmaps.red_wait_1;
            red.gotoAndStop(0);
            redTimer = setTimeout(function () {
                red.gotoAndPlay(0)
            }, 2000);
        }

        //Анимация зелёного

        if ((green.bitmap == bitmaps.green_happy) && (green.currentFrame == 21)) {
            green.stop();
            greenHappy = true;
        }
        if ((green.currentFrame == 17) && (green.bitmap == bitmaps.green_wait_1)) {
            green.bitmap = bitmaps.green_wait_2;
            green.gotoAndStop(0);
            greenTimer = setTimeout(function () {
                green.gotoAndPlay(0)
            }, 2000);
        }
        if ((green.currentFrame == 16) && (green.bitmap == bitmaps.green_wait_2)) {
            green.bitmap = bitmaps.green_wait_1;
            green.stop();
            greenTimer = setTimeout(function () {
                green.gotoAndPlay(0)
            }, 2000);
        }


        var angle = Math.atan2((mPosY - cannon.y), (mPosX - cannon.x));
        if (angle > 1.2) angle = 1.2;
        if (angle < -1.2) angle = -1.2;


        //Проверка на контакт с мобами нужного цвета

        for (var n = r.box2dBody.GetContactList(); n; n = n.next) {
            if (n.other.sprite && n.other.sprite.obType == REDMOB && n.contact.IsTouching()) {
                r.destroy = true;
                world.DestroyBody(r.box2dBody);
                red.destroy = true;
                world.DestroyBody(red.box2dBody);

                lo = {x: r.x, y: r.y, rotation: 0};
                ob = findObject("red_happy");
                mc = createObject(lo, ob);
                red = mc;
                red.animDelay = 2;
                stage.setZIndex(mc, 10);
                var randHappy = rand(2, 1)
                if (randHappy == 1) happySounds('red_nya');
                else happySounds('red_konfeta');
                clearTimeout(redTimer);
                break;
            }
        }

        for (var n = g.box2dBody.GetContactList(); n; n = n.next) {
            if (n.other.sprite && n.other.sprite.obType == GREENMOB && n.contact.IsTouching()) {
                g.destroy = true;
                world.DestroyBody(g.box2dBody);
                green.destroy = true;
                world.DestroyBody(green.box2dBody);

                lo = {x: g.x, y: g.y, rotation: 0};
                ob = findObject("green_happy");
                mc = createObject(lo, ob);
                green = mc;
                green.animDelay = 2;
                stage.setZIndex(mc, 10);
                var randHappy = rand(2, 1)
                if (randHappy == 1) happySounds('green_nya');
                else happySounds('green_konfeta');
                clearTimeout(greenTimer);
                break;
            }
        }
        for (var i = 0; i < balls.length; i++) {
            for (var n = ball.box2dBody.GetContactList(); n; n = n.next)
                if (n.other.sprite && n.other.sprite.obType == GREENMOB && n.contact.IsTouching()) {
                    if ((soundOn) && (!touchTimerGreen)) {
                        mixer.play('red_udar', false);
                        timeGreen = 0;
                        touchTimerGreen = true;
                    }
                } else {
                    if (n.other.sprite && n.other.sprite.obType == REDMOB && n.contact.IsTouching()) {
                        if ((soundOn) && (!touchTimerRed)) {
                            mixer.play('udar_alternativa_2', false);
                            timeRed = 0;
                            touchTimerRed = true;
                        }
                    }
                }
        }

        if ((redHappy) && (greenHappy)) showLevelVictory();
    }
}


function happySounds(track) {
    if (soundOn) {
        var j = mixer.play('rost3', true);
        setTimeout(function () {
            if (window.isMp3Support) {
                j.stop();
                mixer.play(track, false);
            }
        }, 600);
    }
}

function showLevelVictory() {
    if (gameState == STATE_GAME) {
        gameState = STATE_PAUSE;
        updateShareScore(curLevel + 1);
        if (levelsScores[curLevel] < gameScore) levelsScores[curLevel] = gameScore;
        saveLevelsScores();
        if (lastLevel == curLevel) lastLevel++;
        if (lastLevel == levels.length) lastLevel = levels.length - 1;

        if (curLevel == 19) {
            mc = new Sprite(bitmaps.game_complete, 265, 207, 1);
            mc.x = 240;
            mc.y = 160;
            stage.addChild(mc);
        }
        else {
            mc = new Sprite(bitmaps.level_complete, 266, 208, 1);
            mc.x = 240;
            mc.y = 160;
            stage.addChild(mc);
        }

        var randComplete = rand(3, 1);
        if (soundOn) mixer.play('level_complete' + randComplete, false);

        mc = new Sprite(bitmaps.shots_level_complete, 37, 12.5, 1);
        mc.static = true;
        mc.x = 235;
        mc.y = 195;
        stage.addChild(mc);

        textLevelComplete(shoots, 260, 197)

        var randStar = rand(2, 1);
        switch (gameScore) {
            case 3:
                stars[0] = setTimeout(function () {
                    addStar(0, randStar)
                }, 600);
                stars[1] = setTimeout(function () {
                    addStar(62, randStar)
                }, 800);
                stars[2] = setTimeout(function () {
                    addStar(124, randStar)
                }, 1000);
                break;
            case 2:
                stars[0] = setTimeout(function () {
                    addStar(0, randStar)
                }, 600);
                stars[1] = setTimeout(function () {
                    addStar(62, randStar)
                }, 800);
                break;
            case 1:
                stars[0] = setTimeout(function () {
                    addStar(0, randStar)
                }, 600);
                break;
        }
        mc = new Sprite(bitmaps.menu_button, 82, 34, 3);
        mc.stop();
        mc.x = 155;
        mc.y = 240;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            playBtnSound();
            clearStarsTimeout();
            showLevelSelect();
        }
        stage.addChild(mc);

        mc = new Sprite(bitmaps.next, 78, 34, 3);
        mc.stop();
        mc.x = 240;
        mc.y = 240;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            if (curLevel != (levels.length - 1)) {
                playBtnSound();
                clearStarsTimeout();
                curLevel++;
                setTimeout(function () {
                    startLevel(curLevel)
                }, 10)
            }
        };
        stage.addChild(mc);

        mc = new Sprite(bitmaps.replay, 82, 34, 3);
        mc.stop();
        mc.x = 325;
        mc.y = 240;
        mc.onmousedown = function (e) {
            e.target.gotoAndStop(2)
        };
        mc.onmouseup = function (e) {
            e.target.gotoAndStop(0)
        };
        mc.onclick = function () {
            playBtnSound();
            clearStarsTimeout();
            setTimeout(function () {
                startLevel(curLevel)
            }, 10);
        }
        stage.addChild(mc);

        mc = new Sprite(bitmaps.red_complete, 34, 62, 11);
        mc.x = 155;
        mc.y = 190;
        mc.animDelay = 2;
        stage.addChild(mc);

        mc = new Sprite(bitmaps.green_complete, 48, 38, 11);
        mc.x = 325;
        mc.y = 200;
        mc.animDelay = 2;
        stage.addChild(mc);

        ExternalAPI.exec('showAds');
        ExternalAPI.openWidget(160, 50, "I scored " + getTotalLevelsScores() + " in Red_And_Green game! Try to beat me!");
    }
}

function addStar(x, y) {
    if (soundOn) mixer.play('zvezda_finish_' + y, false);
    mc = new Sprite(bitmaps.star_level_complete, 60, 56, 1);
    mc.x = 178 + x;
    mc.y = 125;
    mc.scaleX = 0.01;
    mc.scaleY = 0.01;
    stage.addChild(mc);
    scaleUp(mc);
    starsComplete.push(mc);
    rotCount.push(0);
}

function clearStarsTimeout() {
    for (var i = 0; i < stars.length; i++)
        clearTimeout(stars[i]);
}

function scaleUp(mc) {
    mc.scaleTo(1, fps / 4);
}

function postTick() {
    if (world && showDebugDraw) world.DrawDebugData();

    if (explosion) {
        if (explosion.currentFrame == 10) explosion.destroy = true;
    }
}
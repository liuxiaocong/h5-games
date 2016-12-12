/**
 * Created by a on 14-3-12.
 */
var lg = lg || {};
lg._orientationTip = null;
var musicstate = 0;
lg._checkDeviceOrientation = function(){
//    if(!lg._orientationTip && cc.Browser.isMobile){
//        lg._orientationTip = cc.LayerColor.create(cc.c4f(0,0,0), 830, 460);
//        var img =  cc.Sprite.createWithSpriteFrameName("rotate.png");
//        img.setPosition(410, 225);
//        lg._orientationTip.__icon = img;
//        lg._orientationTip.addChild(img);
//        var orientationEvent = ("onorientationchange" in window) ? "orientationchange" : "resize";
//        window.addEventListener(orientationEvent, lg._showOrientaionTip, true);
//        lg._showOrientaionTip();
//    }
    var orientationEvent = ("onorientationchange" in window) ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, lg._showOrientaionTip, true);
    if(lg._orientationTip){
        lg._orientationTip.removeFromParent();
        cc.Director.getInstance().getRunningScene().addChild(lg._orientationTip, 1000000);
    }
}
lg._oldGamePauseState = false;
lg._showOrientaionTip = function(){
    var landscape = (Math.abs(window.orientation) == 90);
    lg._orientationTip.setVisible((landscape == false));
    lg._orientationTip.__icon.rotation = (landscape ? -90 : 0);
    if(lg._orientationTip.isVisible()) {
        lg._oldGamePauseState = cc.Director.getInstance().isPaused();
        cc.Director.getInstance().pause();
    }else if(!lg._oldGamePauseState){
        cc.Director.getInstance().resume();
    }
};

var MyMenuLayer = cc.Layer.extend({
    moreGamesBtn:null,
    startBtn:null,
    _infoMenu:null,
    musicoff:null,
    musicon:null,
//    next:1,


    init:function ()
    {
        this._super();
//        cc.AudioEngine.getInstance().playMusic(m_bg,true);
//        this.next=level;

        var startGame1 = cc.Sprite.createWithSpriteFrameName("PLAY1.png");
        var startGame2 = cc.Sprite.createWithSpriteFrameName("PLAY2.png");
        var _start = cc.MenuItemSprite.create(startGame1,startGame2,this.startGame,this);
        this._infoMenu = cc.Menu.create(_start);
        this._infoMenu.setPosition(404,200);
        this.addChild(this._infoMenu,100);

        var moreGame1 = cc.Sprite.createWithSpriteFrameName("MOREGAMES1.png");
        var moreGame2 = cc.Sprite.createWithSpriteFrameName("MOREGAMES1.png");
        var moreGame = cc.MenuItemSprite.create(moreGame1,moreGame2,this.moreGame,this);
        this.moreGamesBtn = cc.Menu.create(moreGame);
        this.moreGamesBtn.setPosition(408,114);
        this.addChild(this.moreGamesBtn,100);

//        lg._checkDeviceOrientation();
    },
    startGame:function()
    {
//        if(!cc.Director.getInstance().isPaused()){
            lg.playMusic(m_bg, true);
            var Scene = MyGameScene.create();
            SG_Hooks.start();
            //点击游戏开始，切换场景，进入关卡选择界面。
            lg.replaceScene("levelSelect");
//        }
    },
    moreGame:function(){
        if(!cc.Director.getInstance().isPaused()){
            //window.open("http://m.softgames.de");
            SG.redirectToPortal();
        }
    }
});

var MyMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var selectLangPlist = language+"/a_language.plist";
        var selectLangPng = language+"/a_language.png";

//        测试用，添加API。
        SG_Hooks.setOrientationHandler( lg._checkDeviceOrientation );
        SG_Hooks.setResizeHandler( lg._checkDeviceOrientation );

//        cc.SpriteFrameCache.getInstance().addSpriteFrames(l_page,p_page);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(cover_pl,cover_pn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(main_pl,main_pn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(roadAndIntr_pl,roadAndIntr_pn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(skillAndRoad_pl,skillAndRoad_pn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(score_pl,score_pn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(finger_pl,finger_pn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(roadMid_pl,roadMid_pn);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(god_pl,god_pn);

//
        cc.SpriteFrameCache.getInstance().addSpriteFrames(selectLangPlist, selectLangPng);
//        cc.SpriteFrameCache.getInstance().addSpriteFrames(lang_pl,lang_pn);
        var name = cc.Sprite.createWithSpriteFrameName("NAME.png");
        var bg = cc.Sprite.createWithSpriteFrameName("MENU.png");
        name.setPosition(400,343);
        bg.addChild(name,100);
        bg.setAnchorPoint(0, 0);
        this.addChild(bg, 1);

        lg._checkDeviceOrientation();

        var layer = new MyMenuLayer();
        this.addChild(layer,2);
        layer.init();

//        var ctrl = new ControlBar();
//        this.addChild(ctrl, 3);
//        ctrl.init();
    }
});

MyMenuScene.create = function()
{
    var b = new MyMenuScene();
    //测试用
    b.init();
    return b;
};

var ControlBar = cc.Layer.extend({
    moreGamesBtn:null,
    musicoff:null,
    musicon:null,
    pauseBtn:null,
    resumeBtn:null,
    _musicOnBeforePause:true,

//    测试用
    pauseCover:null,
    goMenu:null,
    goContinue:null,
    goRetry:null,
    init:function ()
    {
        this._super();

        var musicon1 = cc.Sprite.createWithSpriteFrameName("ON.png");
        var musicon2 = cc.Sprite.createWithSpriteFrameName("ON.png");
        var startmusic = cc.MenuItemSprite.create(musicon1,musicon2,this.startGamemusic,this);
        this.musicon = cc.Menu.create(startmusic);
        this.musicon.setPosition(760,460);
        this.addChild(this.musicon,100);
        this.musicon.setVisible(lg.getSoundEnabled());

        var musicoff1 = cc.Sprite.createWithSpriteFrameName("OFF.png");
        var musicoff2 = cc.Sprite.createWithSpriteFrameName("OFF.png");
        var endmusic = cc.MenuItemSprite.create(musicoff1,musicoff2,this.endGamemusic,this);
        this.musicoff = cc.Menu.create(endmusic);
        this.musicoff.setPosition(760,460);
        this.addChild(this.musicoff,100);
        this.musicoff.setVisible(!lg.getSoundEnabled());

        var pause1 = cc.Sprite.createWithSpriteFrameName("pause1.png");
        var pause2 = cc.Sprite.createWithSpriteFrameName("pause1.png");
        var startmusic = cc.MenuItemSprite.create(pause1,pause2,this.resumeGame, this);
        this.resumeBtn = cc.Menu.create(startmusic);
        this.resumeBtn.setPosition(760,400);
        this.addChild(this.resumeBtn,100);
        this.resumeBtn.setVisible(false);

        var pause0 = cc.Sprite.createWithSpriteFrameName("pause0.png");
        var pause01 = cc.Sprite.createWithSpriteFrameName("pause0.png");
        var endmusic = cc.MenuItemSprite.create(pause0,pause01,this.pauseGame,this);
        this.pauseBtn = cc.Menu.create(endmusic);
        this.pauseBtn.setPosition(760,400);
        this.addChild(this.pauseBtn,100);
        this.pauseBtn.setVisible(lg.currentSceneName == "mainGame");
    },
//    测试用，添加暂停遮罩灰色面板
    showPauseCover:function(){
        var vPos = 250;
        this.pauseCover = cc.Sprite.createWithSpriteFrameName("an.png");
        this.pauseCover.setScale(9);
        this.pauseCover.setPosition(400,250);
        this.addChild(this.pauseCover,1900);
        this.goMenu = cc.Sprite.createWithSpriteFrameName("backMenu.png");
        this.goMenu.setPosition(200,vPos);
        var pause1 = cc.Sprite.createWithSpriteFrameName("sanjiao.png");
        var pause2 = cc.Sprite.createWithSpriteFrameName("sanjiao.png");
        this.goContinue =  cc.Menu.create(cc.MenuItemSprite.create(pause1,pause2,this.resumeGame, this));
        this.goContinue.setPosition(400,vPos);
        this.goRetry = cc.Sprite.createWithSpriteFrameName("newst.png");
        this.goRetry.setPosition(600,vPos);
        this.addChild(this.goMenu,1911);
        this.addChild(this.goContinue,1911);
        this.addChild(this.goRetry,1911);
        lg.inputManager.addListener(this.goMenu, this.goMenuThis);
        lg.inputManager.addListener(this.goRetry, this.goRetryThis);
    },
    removePauseCover:function(){
        this.pauseCover.removeFromParent(true);
        this.goMenu.removeFromParent(true);
        this.goContinue.removeFromParent(true);
        this.goRetry.removeFromParent(true);
    },
    goMenuThis:function(){
        lg.replaceScene("levelSelect");
    },
    goContinueThis:function(){
//        var self = this;
        this.resumeGame();
    },
    goRetryThis:function(){
        lg.replaceScene("mainGame");
    },
    startGamemusic:function(){
        musicstate = 1;
//        cc.log("暂停音乐 "+musicstate);
//        lg.replaceScene("levelSelect");
        lg.setSoundEnabled(false);
        this.musicon.setVisible(false);
        this.musicoff.setVisible(true);
    },
    endGamemusic:function(){
        musicstate = 0;
//        cc.log("开始音乐 "+musicstate);

        lg.setSoundEnabled(true);
        this.musicon.setVisible(true);
        this.musicoff.setVisible(false);
    },
    resumeGame: function(){
        gamePaused = false;

        cc.Director.getInstance().resume();
//        this.moreGamesBtn.setVisible(false);
        this.removePauseCover();
        this.resumeBtn.setVisible(false);
        this.pauseBtn.setVisible(true);

        lg.setSoundEnabled(this._musicOnBeforePause);
        this.musicon.setVisible(lg.getSoundEnabled());
        this.musicoff.setVisible(!lg.getSoundEnabled());
    },
    pauseGame: function(){
//        lg.replaceScene("levelSelect");
        if(gameOver) return;
        gamePaused = true;

        cc.Director.getInstance().pause();

//        this.moreGamesBtn.setVisible(true);
        this.showPauseCover();
        this.resumeBtn.setVisible(true);
        this.pauseBtn.setVisible(false);

        this._musicOnBeforePause = lg.getSoundEnabled();
        lg.setSoundEnabled(false);
        this.musicon.setVisible(lg.getSoundEnabled());
        this.musicoff.setVisible(!lg.getSoundEnabled());

        if(a10Enabled){
            GameAPI.GameBreak.request(function(){
//                    cc.log("start ad");
                },
                function(){
//                    cc.log("end ad");
                });
        }
    }
});
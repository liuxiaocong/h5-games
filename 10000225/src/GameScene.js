/**
 * Created by a on 14-3-12.
 */


var MyGameLayer = cc.Layer.extend({
    moreGamesBtn:null,
    Btn1:null,Btn2:null,Btn3:null,Btn4:null,Btn5:null,Btn6:null,Btn7:null,Btn8:null,Btn9:null,Btn10:null,
    Btn11:null,Btn12:null,Btn13:null,Btn14:null,Btn15:null,Btn16:null,Btn17:null,Btn18:null,Btn19:null,Btn10:null,
    Num1:null,Num2:null,Num3:null,Num4:null,Num5:null,Num6:null,Num7:null,Num8:null,Num9:null,Num10:null,
    Num11:null,Num12:null,Num13:null,Num14:null,Num15:null,Num16:null,Num17:null,Num18:null,Num19:null,Num20:null,
    back:null,
    musicoff:null,
    musicon:null,
    scene1:null,scene2:null,scene3:null,scene4:null,scene5:null,scene6:null,scene7:null,scene8:null,scene9:null,scene10:null,
    scene11:null,scene12:null,scene13:null,scene14:null,scene15:null,scene16:null,scene17:null,scene18:null,scene19:null,scene20:null,
//    h1:400,h2:320,h3:240,h4:160,
//    v1:140,v2:200,v3:260,v4:320,v5:380,

init:function ()
    {
        this._super();
        try{
            if(parseFloat(localStorage.leveled) > 1){
                leveled = parseFloat(localStorage.leveled);
            }
        }catch (err){};
//测试用
//        for(var i = 1; i <= maxLevel; i++)
    h1=400;h2=310;h3=215;h4=120;
    v1=160;v2=280;v3=400;v4=520;v5=640;
    var LEVEL_BTN_POS = [cc.p(v1,h1), cc.p(v2,h1), cc.p(v3,h1), cc.p(v4,h1), cc.p(v5,h1),
        cc.p(v1,h2), cc.p(v2,h2), cc.p(v3,h2), cc.p(v4,h2), cc.p(v5,h2),
        cc.p(v1,h3), cc.p(v2,h3), cc.p(v3,h3), cc.p(v4,h3), cc.p(v5,h3),
        cc.p(v1,h4), cc.p(v2,h4), cc.p(v3,h4), cc.p(v4,h4), cc.p(v5,h4)];
        for(var i = 1; i <= maxLevel; i++)
        {
            var png = "open"+i+".png";
            var pos = LEVEL_BTN_POS[i - 1];
            var startGame11 = cc.Sprite.createWithSpriteFrameName(png);
            var startGame12 = cc.Sprite.createWithSpriteFrameName(png);
            var _start = cc.MenuItemSprite.create(startGame11,startGame12,function(item){
                level = item.level;
                lg.replaceScene("mainGame");
            },this);
            _start.setScale(0.8);
            _start.level = i;
            this["Btn"+i] = cc.Menu.create(_start);
            this["Btn"+i].setPosition(pos);
            this.addChild(this["Btn" + i],100);
            if(i > 1) {
                this["Btn"+i].setVisible(false);
                this["Num"+i] = cc.Sprite.createWithSpriteFrameName("lock"+i+".png");
                this["Num"+i].setScale(0.8);
                this["Num"+i].setPosition(pos);
                this.addChild(this["Num"+i],100);
                var unlocked = (leveled >= i);
                this["Btn" + i].setVisible(unlocked);
                this["Num" + i].setVisible(!unlocked);
            }
        }

        var moreCha=cc.Sprite.createWithSpriteFrameName("MOREGAMES1.png");
        moreCha.setScale(0.9);
        this.moreGamesBtn=cc.Sprite.create("moregames.png");
        this.moreGamesBtn.addChild(moreCha,10);
        moreCha.setPosition(100,30);
        this.moreGamesBtn.setPosition(660,50);
        this.addChild(this.moreGamesBtn,100);
        lg.inputManager.addListener(this.moreGamesBtn, goMoreGame);


        var back1 = cc.Sprite.createWithSpriteFrameName("front.png");
        var back2 = cc.Sprite.createWithSpriteFrameName("front.png");
        var _start = cc.MenuItemSprite.create(back1,back2,this.backgame,this);
        this.back = cc.Menu.create(_start);
        this.back.setPosition(90,50);
        this.addChild(this.back,100);
    },
    //选择关卡，切换场景，进入主游戏场景。
    backgame:function(){
        lg.replaceScene("mainMenu");
    }
});

var MyGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
//        测试用，添加API。
        lg._checkDeviceOrientation();
//        cc.SpriteFrameCache.getInstance().addSpriteFrames(l_page,p_page);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(cover_pl,cover_pn);
        var bg = cc.Sprite.createWithSpriteFrameName("levelBG.png");
        bg.setAnchorPoint(0, 0);
        this.addChild(bg, 1);

        var layer = new MyGameLayer();
        this.addChild(layer,2);
        layer.init();

        var ctrl = new ControlBar();
        this.addChild(ctrl, 3);
        ctrl.init();
    }
});

MyGameScene.create = function()
{
    var b = new MyGameScene();
    b.init();
    return b;
};
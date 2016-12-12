/**
 * Created by a on 14-7-1.
 */
sbdGod = cc.Sprite.extend({
    winArray:[],
    loseArray:[],
    init:function(){
        this._super();
        this.winArray = [];
        this.loseArray = [];
        this.initWithSpriteFrameName("sbdGod.png");
        var win1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbdGodWin1.png");
        var win2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbdGodWin2.png");
        var win3 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbdGodWin3.png");
        var win4 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbdGodWin4.png");
        this.winArray = [win1,win2,win3,win4];
        var lose1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbdGodLose1.png");
        var lose2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbdGodLose2.png");
        var lose3 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbdGod.png");
        this.loseArray = [lose1,lose2,lose1,lose2,lose1,lose3];
    },
    win:function(){
        this.runAction(cc.Animate.create(cc.Animation.create(this.winArray,0.3)));
    },
    lose:function(){
        this.runAction(cc.Animate.create(cc.Animation.create(this.loseArray,0.3)));
    }
});
sbdGod.create = function(){
    var sbdGodT = new sbdGod();
    sbdGodT.init();
    return sbdGodT;
};

wjGod = cc.Sprite.extend({
    winArray:[],
    loseArray:[],
    init:function(){
        this._super();
        this.winArray = [];
        this.loseArray = [];
        this.initWithSpriteFrameName("wjGod.png");
        var win1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wjGodWin1.png");
        var win2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wjGodWin2.png");
        var win3 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wjGod.png");
        this.winArray = [win1,win2,win1,win2,win1,win2,win3];
        var lose1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wjGodLose1.png");
        var lose2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wjGodLose2.png");
        var lose3 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wjGod.png");
        this.loseArray = [lose1,lose2,lose1,lose1,lose3];
    },
    win:function(){
        this.runAction(cc.Animate.create(cc.Animation.create(this.winArray,0.3)));
    },
    lose:function(){
        this.runAction(cc.Animate.create(cc.Animation.create(this.loseArray,0.3)));
    }
});
wjGod.create = function(){
    var wjGodT = new wjGod();
    wjGodT.init();
    return wjGodT;
};
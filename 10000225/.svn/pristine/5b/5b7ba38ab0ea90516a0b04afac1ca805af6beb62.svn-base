/**
 * Created by a on 14-2-20.
 */

var Tower = TowerBase.extend({
    bugSize:null,
    bugPosition:null,
    rate:0,
    dict:null,
    yellowFrame:[],
    brownFrame:[],
    grayFrame:[],
    greenFrame:[],
    frogFrame:[],
    frogs:null,
    colorCount:null,
    style:null,

    init:function()
    {
        this._super();
        this.cls = "Tower";
        this.initWithSpriteFrameName(defaultTowerTexture[this.cls]);
//        测试用，以下一句无用
//        this.colorChoose();
        this.colorCount = cc.Sprite.create(p_red);
        this.addChild(this.colorCount,15);
        this.colorCount.setPosition(48,94);
        this.countUD=cc.LabelTTF.create(this._count,"Arial",12);
        this.addChild(this.countUD,16);
        this.countUD.setPosition(48,94);

        this.dict={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[],15:[],16:[]};
        this.bug2=Bug.create();
        this.bugSize=this.bug2.getContentSize();
        this.bugPosition=this.bug2.getPosition();
//        this.scheduleUpdate();
    },
    setRate:function(rate){
        this.rate = rate;
        this.schedule(this.addCount,rate,cc.REPEAT_FOREVER,0);
    },
//测试用，新塔生产动画效果。
    createGreenTower:function()
    {
//        cc.log("变暗");
        this.initWithSpriteFrameName("Tower_blue.png");
        this.colorCount.initWithFile(p_red);
        //        测试用，以下是实现鼠标划过某塔则该塔大小弹跳一下。
//        this.runAction(cc.Sequence.create(scaleUp,scaleDown,scaleMid));
//        this.runAction(scaleAction);
    },
    createYellowTower:function()
    {
//        cc.log("变量");
        this.initWithSpriteFrameName("Tower_red.png");
        this.colorCount.initWithFile(p_blue);
        //        测试用，以下是实现鼠标划过某塔则该塔大小弹跳一下。
//        this.runAction(cc.Sequence.create(scaleUp,scaleDown,scaleMid));
//        this.runAction(scaleAction1);
    }
});

Tower.create = function(type,id)
{
    var b = new Tower();
    b.type = type;
    b.id=id;
    b.style="normal";
    b.init();
    return b;
};
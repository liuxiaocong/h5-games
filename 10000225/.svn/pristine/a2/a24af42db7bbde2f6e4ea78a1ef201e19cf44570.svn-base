/**
 * Created by a on 14-3-3.
 */
//var Turret = TowerBase.extend({
//    bugSize:null,
//    bugPosition:null,
//    bug2:null,
//    rate:0,
//    dict:null,
//    turretFrame:[],
//    colorCount:null,
//    radius:10,
//    fire:null,
//    fireFrame:[],
//    frogs:null,
//    frogFrame:[],
//
//    init:function()
//    {
//        this._super();
//        this.cls = "Turret";
//        this.initWithSpriteFrameName(defaultTowerTexture[this.cls]);
////        测试用
////        this.colorChoose();
//        this.colorCount = cc.Sprite.create(p_gray);
//        this.addChild(this.colorCount,15);
//        this.colorCount.setPosition(40,94);
//        this.countUD=cc.LabelTTF.create(this._count,"Arial",12);
//        this.addChild(this.countUD,16);
//        this.countUD.setPosition(40,94);
//
//        this.dict={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[],15:[],16:[]};
//        this.bug2=Bug05.create();
//        this.bugSize=this.bug2.getContentSize();
//        this.bugPosition=this.bug2.getPosition();
//        var blue1 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue1.png");
//        var blue2 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue2.png");
//        var blue3 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue3.png");
//        var blue4 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue4.png");
//        var red1 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red1.png");
//        var red2 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red2.png");
//        var red3 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red3.png");
//        var red4 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red4.png");
//        turretArrayBlue = [blue1,blue2,blue3,blue4];
//        turretArrayRed = [red1,red2,red3,red4];
//    },
//    createTurretTower:function(type)
//    {
//        var camp;
//        var icon;
//        if(type == "Player"){
//            this.stopAllActions();
//            camp = "Turret_red1.png";
//            icon = p_blue;
//            this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(turretArrayRed,0.2))));
//        }else{
//            this.stopAllActions();
//            camp = "Turret_blue1.png";
//            icon = p_red;
//            this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(turretArrayBlue,0.1))));
//        }
//        this.initWithSpriteFrameName(camp);
//        this.colorCount.initWithFile(icon);
//        //        测试用，以下是实现鼠标划过某塔则该塔大小弹跳一下。
////        this.runAction(cc.Sequence.create(scaleUp,scaleDown,scaleMid));
////        this.runAction(scaleAction);
//    }
//});
//
//Turret.create = function(type,id)
//{
//    var b = new Turret();
//    b.type = type;
//    b.id=id;
//    b.style="bar";
//    b.init();
//    return b;
//};

var Turret = TowerBase.extend({
    bugSize:null,
    bugPosition:null,
    bug2:null,
    rate:0,
    dict:null,
    turretFrame:[],
    colorCount:null,
    radius:10,
    fire:null,
    fireFrame:[],
    flag:null,

    init:function()
    {
        this._super();
        this.cls = "Turret";
        this.initWithSpriteFrameName(defaultTowerTexture[this.cls]);
//        测试用
//        this.colorChoose();
        this.colorCount = cc.Sprite.create(p_gray);
        this.addChild(this.colorCount,15);
        this.colorCount.setPosition(40,94);
        this.countUD=cc.LabelTTF.create(this._count,"Arial",12);
        this.addChild(this.countUD,16);
        this.countUD.setPosition(40,94);

        this.dict={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[],15:[],16:[]};
        this.bug2=Bug05.create();
        this.bugSize=this.bug2.getContentSize();
        this.bugPosition=this.bug2.getPosition();
        var blue1 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue1.png");
        var blue2 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue2.png");
        var blue3 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue3.png");
        var blue4 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_blue4.png");
        var red1 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red1.png");
        var red2 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red2.png");
        var red3 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red3.png");
        var red4 =  cc.SpriteFrameCache.getInstance().getSpriteFrame("Turret_red4.png");
        turretArrayBlue = [blue1,blue2,blue3,blue4];
        turretArrayRed = [red1,red2,red3,red4];
        this.flag = cc.Sprite.create();
        this.addChild(this.flag,10);
        this.flag.setPosition(52,80);
    },
    createTurretTower:function(type)
    {
        var camp;
        var icon;
        if(type == "Player"){
            this.flag.stopAllActions();
            icon = p_blue;
//            cc.log("hah");
            this.flag.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(turretArrayRed,0.2))));
        }else{
            this.flag.stopAllActions();
            icon = p_red;
//            cc.log("hheeeeee");
            this.flag.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(turretArrayBlue,0.1))));
        };
        this.colorCount.initWithFile(icon);
        //        测试用，以下是实现鼠标划过某塔则该塔大小弹跳一下。
//        this.runAction(cc.Sequence.create(scaleUp,scaleDown,scaleMid));
//        this.runAction(scaleAction);
    }
});

Turret.create = function(type,id)
{
    var b = new Turret();
    b.type = type;
    b.id=id;
    b.style="bar";
    b.init();
    return b;
};
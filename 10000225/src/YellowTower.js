/**
* Created by a on 14-2-25.
*/
var YellowTower = TowerBase.extend({
    beeSize:null,
    beePosition:null,
    bee2:null,
    rate:0,
    dict:null,
    yellowFrame:[],
    brownFrame:[],
    grayFrame:[],
    greenFrame:[],
    frogFrame:[],
    frogs:null,
    colorCount:null,

    init:function()
    {
        this._super();
        this.cls = "YellowTower";
        this.initWithSpriteFrameName(defaultTowerTexture[this.cls]);
//测试用，这句没用。
//        this.colorChoose();
        this.colorCount = cc.Sprite.create(p_blue);
        this.addChild(this.colorCount,15);
        this.colorCount.setPosition(48,94);
        this.countUD=cc.LabelTTF.create(this._count,"Arial",12);
        this.addChild(this.countUD,16);
        this.countUD.setPosition(48,94);

        this.dict={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[],15:[],16:[]};
        this.bee2=Bug.create();
        this.beeSize=this.bee2.getContentSize();
        this.beePosition=this.bee2.getPosition();
//        this.scheduleUpdate();
    },
    setRate:function(rate){
        this.rate = rate ;
        this.schedule(this.addCount,rate,cc.REPEAT_FOREVER,0);
    },
//    update:function()
//    {
//        this.countUD.setPosition(this.colorCount.getPosition());
//        if(this.type=="Player"){this.colorCount.initWithFile(p_blue);this.colorCount.setPositionY(this.getContentSize().height/2+50)}
//        else if(this.type=="Enemy"){this.colorCount.initWithFile(p_red);this.colorCount.setPositionY(this.getContentSize().height/2+52)}
//        else if(this.type=="Neutral"){this.colorCount.initWithFile(p_gray);this.colorCount.setPositionY(this.getContentSize().height/2+50)}
//    },
//测试用，这句没用。
//    colorChoose:function()
//    {
//        this.colorCount = cc.Sprite.create();
//        this.colorCount.initWithFile(p_blue);
//        this.colorCount.setPosition(cc.p(this.getPosition().x+45,this.getPosition().y+this.getContentSize().height/2+55));
//        this.addChild(this.colorCount,15);
//    },
//    grayCount:function()
//    {
//        this.gray = cc.Sprite.create();
//        this.gray.initWithFile(p_gray);
//        this.gray.setPosition(cc.p(this.getPosition().x+28,this.getPosition().y+this.getContentSize().height/2+25));
//        this.addChild(this.gray,10);
//    },
//    blueCount:function()
//    {
//        this.blue = cc.Sprite.create();
//        this.blue.initWithFile(p_blue);
//        this.blue.setPosition(cc.p(this.getPosition().x+28,this.getPosition().y+this.getContentSize().height/2+25));
//        this.addChild(this.blue,10);
//    },
//    frog:function()
//    {
//
//        this.frogs = cc.Sprite.create();
//        if(this.frogFrame.length<8)
//        {
//            for(var i=1;i<9;i++)
//            {
//                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("yanwu000"+i+".png");
//                this.frogFrame.push(frame);
//            }
//        }
//        this.frogs.runAction(cc.Repeat.create(cc.Animate.create(cc.Animation.create(this.frogFrame,0.05)),this._count/3));
////        this.frogs.setPosition(cc.p(this.getPosition().x,this.getPosition().y-this.getContentSize().height/2+55));
//        this.frogs.setPosition(cc.p(this.getPosition().x,this.getPosition().y-this.getContentSize().height/2+15));
//        this.getParent().addChild(this.frogs, 8);
//        this.scheduleOnce(this.removeFrog,this._count/3*0.3);
//
//    },
//   removeFrog:function(){this.getParent().removeChild(this.frogs, 8);},
    createGreenTower:function()
    {
        this.initWithSpriteFrameName("Tower_blue.png");
        this.colorCount.initWithFile(p_red);
        //        测试用，以下是实现鼠标划过某塔则该塔大小弹跳一下。
//        this.runAction(cc.Sequence.create(scaleUp,scaleDown,scaleMid));
//        this.runAction(scaleAction);
    },
    createYellowTower:function()
    {
        this.initWithSpriteFrameName("Tower_red.png");
        this.colorCount.initWithFile(p_blue);
        //        测试用，以下是实现鼠标划过某塔则该塔大小弹跳一下。
//        this.runAction(cc.Sequence.create(scaleUp,scaleDown,scaleMid));
//        this.runAction(scaleAction1);
    }
});

YellowTower.create = function(type,id)
{
    var b = new YellowTower();
    b.type = type;
    b.id=id;
    b.style="normal";
    b.init();
    return b;
};
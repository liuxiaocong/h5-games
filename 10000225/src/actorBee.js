/**
 * Created by a on 14-1-22.
 */
/**
 * Created by a on 14-2-19.
 */
var Actor = cc.Sprite.extend({
    _tower1:null,
    _tower2:null,
    tower1position:null,
    tower2position:null,
    radius:5,
    isHit:false,
    animFrame:[],
    Attack:[],
    teXiao:null,
    teXiaoFrame:[],
    fire:null,
    fireFrame:[],
    pia:null,
    dir:0,
    runTimeHelp:0,
    update:function(){
        var zzSkillPos = this.getParent().getChildByTag(11);
        if(this.tower2position.x){
            this._vx = myRunSpeedNormal * this.posXAng;
            this._vy = myRunSpeedNormal * this.posYAng;
            var innerTime = cc.Director.getInstance()._deltaTime;
            var aX = this.getPositionX()+this._vx*innerTime;
            var aY = this.getPositionY()+this._vy*innerTime;
//            this.setPosition(aX+this._vx*innerTime,aY+this._vy*innerTime);
            this.setPosition(aX,aY);
//            var bigY = Math.max(Math.abs(aY),Math.abs(this.tower2position.y));
//            var smallY = Math.min(Math.abs(aY),Math.abs(this.tower2position.y));
//            var bigX = Math.max(Math.abs(aX),Math.abs(this.tower2position.x));
//            var smallX = Math.min(Math.abs(aX),Math.abs(this.tower2position.x));
//            if(bigY-smallY<30 & bigX - smallX<30){
//                this._tower1.dict[this._tower2.id].splice(0,1);
//               if(this._tower1.gettype()==this._tower2.gettype()){
//                    this.addbug(this._tower2);
//                }
////                护盾效果实现。
//                else if(this._tower1.gettype()!=this._tower2.gettype() & this._tower2.getTag()!= 41){
//                    this.reducebug(this._tower2);
//                };
//                this.removeFromParent(true);
//                bugArray.shift();
//                this.unscheduleUpdate();
//            }
            if(this.collide(this._tower2)){
//                lg.objectPool.recycle(this);
                this._tower1.dict[this._tower2.id].splice(0,1);
                if(this._tower1.gettype()==this._tower2.gettype()){
                    this.addbug(this._tower2);
                }
//                护盾效果实现。
                else if(this._tower1.gettype()!=this._tower2.gettype() & this._tower2.getTag()!= 41){
                    this.reducebug(this._tower2);
                };
                this.removeFromParent(true);
                bugArray.shift();
                this.unscheduleUpdate();
            }
        }
    },
    runTimeHelp:0,
    removeBug:function(){
        this.getParent().removeChild(this);
    },
    setStart:function(tower)
    {
        this._tower1 = tower;//开始的tower
        this.tower1position = this._tower1.getPosition();
        this.setPosition(cc.p(this.tower1position.x,this.tower1position.y));
        this._tower1.changeCount(-1);
    },
    moveTo:function(tower)
    {
        this._tower2 = tower;//结束的tower
        this.scheduleUpdate();
        this.tower2position = this._tower2.getPosition();
        var posX = this.tower2position.x - this.tower1position.x;
        var posY = this.tower2position.y - this.tower1position.y;
        var bugAngle = Math.atan2(posY,posX);
        this.posXAng = Math.cos(bugAngle);
        this.posYAng = Math.sin(bugAngle);
    },
//    removeBug:function(){
//        this.getParent().removeChild(this);
//    },
//    //为移动做准备的设置起点位置。
//    setStart:function(tower)
//    {
//        this._tower1 = tower;
//        this.tower1position = this._tower1.getPosition();
//        this.setPosition(cc.p(this.tower1position.x,this.tower1position.y));
//        this._tower1.changeCount(-1);//所属塔人口数量减一。
//    },
//    //为移动做准备的设置终点位置。

//    moveTo:function(tower)
//    {
//        this._tower2 = tower;
//        this.tower2position=this._tower2.getPosition();
//        var tower2position = this._tower2.getPosition();
//        var velocty=120/1;
//        var dis = cc.pDistance(this.tower1position, tower2position);
//        var realMoveDuration=dis/velocty;
//        var theThis = this;
//        this.runAction(cc.Sequence.create(cc.MoveTo.create(realMoveDuration+this.runTimeHelp,cc.p(tower2position.x,tower2position.y)),cc.CallFunc.create(function(){
//            theThis.Intersects(tower);
//        })));
//    },
////    碰撞检测。
//    Intersects:function(tower)
//    {
//        var tower2Size  =  this._tower2.getContentSize();
//        var tower2position= this._tower2.getPosition();
//        var tower2Rect = cc.rect(0, 0, tower2Size.width, tower2Size.height);
//        tower2Rect._origin.x += (tower2position.x-tower2Size.width/2);
//        tower2Rect._origin.y += (tower2position.y-tower2Size.height/2);
//
//        var beeSize  =  this.getContentSize();
//        var beeposition=this.getPosition();
//
//        var beeRect = cc.rect(0, 0, beeSize.width, beeSize.height);
//        beeRect._origin.x += (beeposition.x-beeSize.width/2);
//        beeRect._origin.y += (beeposition.y-beeSize.height/2);
//
//        if(cc.rectIntersectsRect(tower2Rect,beeRect))
//        {
//            if(this.dir == 1){
//                this.setScaleX(this.getScaleX()*-1);
//                this.dir = 0;
//            }
//            this.removeFromParent(true);
//            bugArray.shift();
//            this._tower1.dict[this._tower2.id].splice(0,1);
//            if(this._tower1.type==this._tower2.type){
//                this.addbug(tower);
//            }//类型相同，则增加。
//            else if(this._tower1.type!=this._tower2.type){
//                this.reducebug(tower);
//            }//类型不同，则减少。
//        }
//        return true;
//    },
    addbug:function(tower)
    {
        tower.changeCount(1);
    },
    reducebug:function(tower)
    {
        tower.changeCount(-1);
    },
//测试用，根据距离碰撞判断。
    collide: function (gameObject)
    {
        var hit = false;
        var distance = cc.pDistance(this.getPosition(), gameObject.getPosition());//两者之间的距离

        if (distance <= this.radius + gameObject.radius)
        {
            hit = true;
        }
        return hit;
    }
});

Actor.create = function()
{
    var b = new Actor();
    b.init();
    return b;
};

var Bee =Actor.extend({
    cls:"Bee",
    _tower1:null,
    _tower2:null,
    tower1position:null,
    tower2position:null,
    radius:7,
    isHit:false,
    animFrame:[],
    Attack:[],
    teXiao:null,
    teXiaoFrame:[],
    fire:null,
    fireFrame:[],
    pia:null,
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("sbd_awalk1.png");
//        this.initWithSpriteFrameName("sbd_a.png");

    },
    doFly:function()
    {
        if(this.tower1position.x > this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});
Bee.create = function()
{
    var b = new Bee();
    b.init();
    return b;
};

var Bee02 = Actor.extend({
    cls:"Bee02",
    _tower1:null,
    _tower2:null,
    tower1position:null,
    tower2position:null,
    radius:7,
    isHit:false,
    animFrame:[],
    Attack:[],
    teXiao:null,
    teXiaoFrame:[],
    fire:null,
    fireFrame:[],
    pia:null,
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("sbd_bwalk1.png");
//        this.initWithSpriteFrameName("sbd_b.png");

    },
    doFly:function()
    {
        if(this.tower1position.x > this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bee02.create = function()
{
    var b = new Bee02();
    b.init();
    return b;
};

var Bee03 = Actor.extend({
    cls:"Bee03",
    _tower1:null,
    _tower2:null,
    tower1position:null,
    tower2position:null,
    radius:7,
    isHit:false,
    animFrame:[],
    Attack:[],
    teXiao:null,
    teXiaoFrame:[],
    fire:null,
    fireFrame:[],
    pia:null,
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("sbd_c_walk0001.png");
    },
    doFly:function()
    {
        if(this.tower1position.x > this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bee03.create = function()
{
    var b = new Bee03();
    b.init();
    return b;
};
var Bee04 = Actor.extend({
    cls:"Bee04",
    _tower1:null,
    _tower2:null,
    tower1position:null,
    tower2position:null,
    radius:7,
    isHit:false,
    animFrame:[],
    Attack:[],
    teXiao:null,
    teXiaoFrame:[],
    fire:null,
    fireFrame:[],
    pia:null,
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("sbd_dwalk1.png");
//        this.initWithSpriteFrameName("sbd_d.png");
    },
    doFly:function()
    {
        if(this.tower1position.x > this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bee04.create = function()
{
    var b = new Bee04();
    b.init();
    return b;
};
var Bee05 = Actor.extend({
    cls:"Bee05",
    _tower1:null,
    _tower2:null,
    tower1position:null,
    tower2position:null,
    radius:7,
    isHit:false,
    animFrame:[],
    Attack:[],
    teXiao:null,
    teXiaoFrame:[],
    fire:null,
    fireFrame:[],
    pia:null,
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("sbd_e_walk0001.png");
    },
    doFly:function()
    {
        if(this.tower1position.x > this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(sbd_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bee05.create = function()
{
    var b = new Bee05();
    b.init();
    return b;
};
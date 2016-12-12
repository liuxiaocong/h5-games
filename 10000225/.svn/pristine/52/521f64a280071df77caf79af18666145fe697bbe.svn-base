/**
 * Created by a on 14-1-22.
 */
var ActorBug = cc.Sprite.extend({
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

    _vx : 0,
    _vy : 0,
    posXAng : 0,
    posYAng : 0,
    timeCount : 0,//测试辅助参数，随时可删除
//    wj_a_walkArray :[],
    init:function(){
        this.scheduleUpdate();
    },
    update:function(){
        var zzSkillPos = this.getParent().getChildByTag(11);
        if(this.tower2position.x){
            enemyRunSpeed = enemyRunSpeedNormal;
            if(zzSkillPos){
                if(this.collide(zzSkillPos)){
                    enemyRunSpeed = enemyRunSpeedSlowly;
                }
            };
            this._vx = enemyRunSpeed * this.posXAng;
            this._vy = enemyRunSpeed * this.posYAng;
            var innerTime = cc.Director.getInstance()._deltaTime;
            var aX = this.getPositionX()+this._vx*innerTime;
            var aY = this.getPositionY()+this._vy*innerTime;
//            this.setPosition(aX+this._vx*innerTime,aY+this._vy*innerTime);
            this.setPosition(aX,aY);
//            var bigY = Math.max(Math.abs(aY),Math.abs(this.tower2position.y));
//            var smallY = Math.min(Math.abs(aY),Math.abs(this.tower2position.y));
//            var bigX = Math.max(Math.abs(aX),Math.abs(this.tower2position.x));
//            var smallX = Math.min(Math.abs(aX),Math.abs(this.tower2position.x));
//
//            if(bigY-smallY<30 & bigX - smallX<30){
//                this._tower1.dict[this._tower2.id].splice(0,1);
//                if(this._tower1.gettype()==this._tower2.gettype()){
//                    this.addbug(this._tower2);
//                }
////                护盾效果实现。
//                else if(this._tower1.gettype()!=this._tower2.gettype() & this._tower2.getTag()!= 41){
//                    this.reducebug(this._tower2);
//                };
//                this.removeFromParent(true);
//                bugArray.shift();
////                this.unscheduleUpdate();
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
//        this.scheduleUpdate();
        this.tower2position = this._tower2.getPosition();
        var posX = this.tower2position.x - this.tower1position.x;
        var posY = this.tower2position.y - this.tower1position.y;
        var bugAngle = Math.atan2(posY,posX);
        this.posXAng = Math.cos(bugAngle);
        this.posYAng = Math.sin(bugAngle);
    },
    addbug:function(tower)
    {
        tower.changeCount(1);
    },
    reducebug:function(tower)
    {
        tower.changeCount(-1);
    },
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

ActorBug.create = function()
{
    var b = new ActorBug();
    b.init();
    return b;
};

var Bug = ActorBug.extend({
    cls:"Bug",
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
    pia:[],
//    wj_a_walkArray:[],
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("wj_awalk1.png");
    },
    doFly:function()
    {
        if(this.tower1position.x < this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_attackArray,0.2))));
        lg.playSound(m_dj);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bug.create = function()
{
    var b = new Bug();
    b.init();
    return b;
};

var Bug02 = ActorBug.extend({
    cls:"Bug02",
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
    pia:[],
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("wj_bwalk1.png");
    },
    doFly:function()
    {
        if(this.tower1position.x < this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_attackArray,0.2))));
        lg.playSound(m_dj);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bug02.create = function()
{
    var b = new Bug02();
    b.init();
    return b;
};

var Bug03 = ActorBug.extend({
    cls:"Bug03",
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
    pia:[],
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("wj_c_walk0001.png");
    },
    doFly:function()
    {
        if(this.tower1position.x < this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bug03.create = function()
{
    var b = new Bug03();
    b.init();
    return b;
};

var Bug04 = ActorBug.extend({
    cls:"Bug04",
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
    pia:[],
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("wj_dwalk1.png");
    },
    doFly:function()
    {
        if(this.tower1position.x < this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bug04.create = function()
{
    var b = new Bug04();
    b.init();
    return b;
};

var Bug05 = ActorBug.extend({
    cls:"Bug05",
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
    pia:[],
    actionRun:null,
    init:function()
    {
        this._super();
        this.initWithSpriteFrameName("wj_e_walk0001.png");
//        for(var i=1;i<3;i++)
//        {
//            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_e_walk000"+i+".png");
//            this.animFrame.push(frame);
//        };
//        this.actionRun = cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(this.animFrame,0.2)));
    },
    doFly:function()
    {
        if(this.tower1position.x < this.tower2position.x){
            this.setScaleX(this.getScaleX()*-1);
            this.dir = 1;
        }
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_walkArray,0.3))));
    },
    doAttack:function()
    {
        this.stopAllActions();
        this.unscheduleUpdate();
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(wj_attackArray,0.2))));
//        cc.AudioEngine.getInstance().playEffect(m_dj);
        lg.playSound(m_dj);
//            scheduleOnce:function (callback_fn, delay);
        this.scheduleOnce(this.removeBug,0.5);
    }
});

Bug05.create = function()
{
    var b = new Bug05();
    b.init();
    return b;
};
/**
 * Created by a on 14-6-11.
 */

LockEffect = cc.Sprite.extend({
    init:function(){
        this._super();
        this.initWithSpriteFrameName("openLock0001.png");
    },
    open:function(){
            var LockArray = [];
            if(LockArray.length<6)
            {
                for(var i=1;i<6;i++)
                {
                    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("openLock000"+i+".png");
                    LockArray.push(frame);
                }
            };
        var self = this;
            this.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(LockArray,0.2)),1),cc.CallFunc.create(
                function(){
                    self.removeFromParent(true);
                }
            )));
    }
});
LockEffect.create = function(){
    var lock = new LockEffect;
    lock.init();
    return lock;
};

ZZEffect = cc.Sprite.extend({
    init:function(){
        this._super();
        this.initWithSpriteFrameName("zz_effect0001.png");
        this.radius = 35;
    },
    work:function(){
        var ZZArray = [];
        if(ZZArray.length<6)
        {
            for(var i=1;i<6;i++)
            {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("zz_effect000"+i+".png");
                ZZArray.push(frame);
            }
        };
        var self = this;
        this.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(ZZArray,0.2)),5),cc.CallFunc.create(
            function(){
                self.removeFromParent(true);
            }
        )));
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
ZZEffect.create = function(){
    var zz = new ZZEffect;
    zz.init();
    return zz;
}

HFEffect = cc.Sprite.extend({
    init:function(){
        this._super();
        this.initWithSpriteFrameName("hf_effect0001.png");
        this.radius = 15;
    },
    work:function(){
        var HFArray = [];
        if(HFArray.length<6)
        {
            for(var i=1;i<6;i++)
            {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("hf_effect000"+i+".png");
                HFArray.push(frame);
            }
        };
        var self = this;
        this.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(HFArray,0.2)),13),cc.CallFunc.create(
            function(){
                var hfTower =  self.getParent().getChildByTag(21);
                if(hfTower){
                    hfTower.setRate(hfTowerRate);
                    hfTower.setTag(22);
                }
                self.removeFromParent(true);
            }
        )));
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
HFEffect.create = function(){
    var hf = new HFEffect;
    hf.init();
    return hf;
}

WYEffect = cc.Sprite.extend({
    init:function(){
        this._super();
        this.initWithSpriteFrameName("wy_effect0001.png");
        this.radius = 15;
    },
    work:function(){
        var WYArray = [];
        if(WYArray.length<6)
        {
            for(var i=1;i<6;i++)
            {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("wy_effect000"+i+".png");
                WYArray.push(frame);
            }
        };
        var self = this;
        this.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(WYArray,0.2)),3),cc.CallFunc.create(
            function(){
                var wyTower =  self.getParent().getChildByTag(51);
                if(wyTower){
                    wyTower.setRate(wyTowerRate);
                    wyTower.setTag(52);
                }
                self.removeFromParent(true);
            }
        )));
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
WYEffect.create = function(){
    var hf = new WYEffect;
    hf.init();
    return hf;
}

SDEffect = cc.Sprite.extend({
    init:function(){
        this._super();
        this.initWithSpriteFrameName("sd_effect0001.png");
        this.radius = 15;
    },
    work:function(){
        var WYArray = [];
        if(WYArray.length<6)
        {
            for(var i=1;i<6;i++)
            {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("sd_effect000"+i+".png");
                WYArray.push(frame);
            }
        };
        var self = this;
        this.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(WYArray,0.2)),1),cc.CallFunc.create(
            function(){
                var sdTower =  self.getParent().getChildByTag(31);
                if(sdTower){
                    var killNum = Math.round((sdHurtPercent*sdLevel)* sdTower._count);
                    if(sdTower._count > 1){
                        sdTower.changeCount(-Math.max(killNum,skillMinKillNum));
                    }
//                    cc.log("¿Û¼õÇ°ÈË¿Ú = "+sdTower._count+"         " + Math.round((1 - (sdHurtPercent*sdLevel))* sdTower._count)+"   ¿Û¼õ15%");
//                    sdTower._count = Math.min(Math.round((1 - (sdHurtPercent*sdLevel))* sdTower._count),sdTower._count-2);
                    sdTower.setTag(32);
                };
                self.removeFromParent(true);
            }
        )));
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
SDEffect.create = function(){
    var hf = new SDEffect;
    hf.init();
    return hf;
}

HDEffect = cc.Sprite.extend({
    init:function(){
        this._super();
        this.initWithSpriteFrameName("hd_effect0001.png");
        this.radius = 15;
    },
    work:function(){
        var WYArray = [];
        if(WYArray.length<6)
        {
            for(var i=1;i<6;i++)
            {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("hd_effect000"+i+".png");
                WYArray.push(frame);
            }
        };
        var self = this;
        this.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(WYArray,0.2)),(hdLevel+hdTime)),cc.CallFunc.create(
            function(){
                var hdTower =  self.getParent().getChildByTag(41);
                if(hdTower){
                    hdTower.setTag(42);
                };
                self.removeFromParent(true);
            }
        )));
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
HDEffect.create = function(){
    var hf = new HDEffect;
    hf.init();
    return hf;
};

LXEffect = cc.Sprite.extend({
    init:function(){
        this._super();
        this.initWithSpriteFrameName("lx_effect0001.png");
        this.radius = 15;
    },
    work:function(){
        var WYArray = [];
        if(WYArray.length<6)
        {
            for(var i=1;i<6;i++)
            {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("lx_effect000"+i+".png");
                WYArray.push(frame);
            }
        };
        var self = this;
        this.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(WYArray,0.2)),1),cc.CallFunc.create(
            function(){
                var lxTower =  self.getParent().getChildByTag(61);
                if(lxTower){
//                    cc.log("¿Û¼õÇ°ÈË¿Ú = "+lxTower._count+"         " + Math.round((1 - (sdHurtPercent*sdLevel))* lxTower._count)+"   ¿Û¼õ15%");
                    var killNum = Math.round((lxHurtPercent*lxLevel)* lxTower._count);
                    if(lxTower._count > 1){
                        lxTower.changeCount(-Math.max(killNum,skillMinKillNum));
                    }
//                    lxTower._count = Math.min(Math.round((1 - (lxHurtPercent*lxLevel))* lxTower._count),lxTower._count-2);
                    lxTower.setTag(62);
                };
                self.removeFromParent(true);
            }
        )));
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
LXEffect.create = function(){
    var hf = new LXEffect;
    hf.init();
    return hf;
}
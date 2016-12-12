/*
* 第一步：清除引导动画。
* 第二部：清除旗帜飘扬动画。
* 第三部：清除石像动画。
* */
cc.IS_SHOW_DEBUG_ON_PAGE = cc.IS_SHOW_DEBUG_ON_PAGE || false;
var coinNum = 0;
var testBHH = 0;
var zzNum = 0;
var hfNum = 0;
var wyNum = 0;
var sdNum = 0;
var hdNum = 0;
var lxNum = 0;
var zz = 0;
var hf = 0;
var wy = 0;
var sd = 0;
var hd = 0;
var lx = 0;
var skillh = 47;
var zzP = cc.p(220,skillh);
var hfP = cc.p(297,skillh);
var wyP = cc.p(372,skillh);
var sdP = cc.p(448,skillh);
var hdP = cc.p(524,skillh);
var lxP = cc.p(600,skillh);


var MyLayer = cc.Layer.extend({
    Tower1:null,Tower2:null,Tower3:null,Tower4:null,Tower5:null,Tower6:null,Tower7:null,Tower8:null,
//    Tower9:null,Tower10:null,Tower11:null,Tower12:null,Tower13:null,Tower14:null,Tower15:null,Tower16:null,
    tower1position:null,tower2position:null,tower3position:null,tower4position:null,tower5position:null,tower6position:null,tower7position:null,tower8position:null,
//    tower9position:null,tower10position:null,tower11position:null,tower12position:null,tower13position:null,tower14position:null,tower15position:null,tower16position:null,
    towerSize:null,
    startPosition:null,
    endPosition:null,
    startTower:null,
    startType:null,
    endType:null,
    clickTower:null,
    endTower:null,
    Arrow:null,
    bug:null,
    bee:null,
    style:null,
    originalArrowSize:null,
    special:null,
    specialFrame:[],
    specialCount:null,
//    storm:null,
//    stormFrames:[],
//    stormAttack:null,
//    stormAttackFrame:[],
    playerRate:1,
    enemyRate:2,
    neutralRate:3,
    winText:null,loseText:null,
    back:null,returnto:null,replayto:null,
    select:null,
    levelData:null,
    eneimes:null,
    pathArray:[],
    selectTower:[],
    arrowArray:[],

    skillBar:null,
    _skillMB:null,
//    测试用，增加商店面板使用的辅助参数。
    timeButton:0,
    levelTime:0,
    circle:null,
    skillzz:null,
    lockZZ:null,
    lockHF:null,
    lockWY:null,
    lockSD:null,
    lockHD:null,
    lockLX:null,
    playTowerArray:null,
    scoreXnum:0,
//    zzNum : 0,
    testArray:null,
    wj_walkArray:[],
    wj_attackArray:[],
    sbdGodH:null,
    wjGodH:null,
    theLevel : null,
    onEnter:function()
    {
        this._super();
        if(parseFloat(localStorage.firstIn) == 1) firstIn = parseFloat(localStorage.firstIn);
        if(firstIn == 0 & level == 1){
            firstIn = 1;
            this.scheduleOnce(this.showGuide,0.1);
//            this.showGuide();
        }else{
            //游戏场景初始化即开始调用出怪动作。间隔3秒。
            this.schedule(this.enemyAttack,3,cc.REPEAT_FOREVER,0);
//            //注册更新
//            this.scheduleUpdate();

            cc.Director.getInstance().resume();
            lg.objectPool.release();
            if (sys.capabilities.hasOwnProperty('mouse'))
            {
                this.setMousePriority(-255);
                this.setMouseEnabled(true);
            }
            if (sys.capabilities.hasOwnProperty('touches'))
            {
                this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
                this.setTouchPriority(-255);
                this.setTouchEnabled(true, true);
            }
            this.theLevel = level+".png";
            this.scheduleOnce(this.showLevel,1);
        }
    },

    init:function ()
    {
        this._super();
                            //    //测试用，验证setPosition()方法不会直接造成降低帧。
                    //        this.testArray = [];
                    //        this.schedule(this.move,0.5);
                    //        this.scheduleUpdate();
        this.timeButton = 0;
        var winSize=cc.Director.getInstance().getWinSize();
//        this.specialAttack();
//测试用，确定关卡，调用配置文件里面的对应数值。
        if(level<21 ){
            this.levelData = levels[level - 1];
            this.playerRate = this.levelData.param.playerRate;
            this.enemyRate = this.levelData.param.enemyRate;
            this.neutralRate = this.levelData.param.neutralRate;
            bugInLevel = this.levelData.param.bug;
            beeInLevel = this.levelData.param.bee;
            attackInterval = this.levelData.param.attackInterval;
            if(bugInLevel == "Bug"){
                var wj_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_awalk1.png");
                var wj_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_awalk2.png");
                wj_walkArray = [wj_a_walk1,wj_a_walk2];
                var wj_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_a_cut0001.png");
                var wj_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_a_cut0002.png");
                wj_attackArray = [wj_a_cut1,wj_a_cut2];
            }else if(bugInLevel == "Bug02"){
                var wj_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_bwalk1.png");
                var wj_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_bwalk2.png");
                wj_walkArray = [wj_a_walk1,wj_a_walk2];
                var wj_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_b_cut0001.png");
                var wj_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_b_cut0002.png");
                wj_attackArray = [wj_a_cut1,wj_a_cut2];
            }else if(bugInLevel == "Bug03"){
                var wj_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_c_walk0001.png");
                var wj_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_c_walk0002.png");
                wj_walkArray = [wj_a_walk1,wj_a_walk2];
                var wj_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_c_cut0001.png");
                var wj_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_c_cut0002.png");
                wj_attackArray = [wj_a_cut1,wj_a_cut2];
            }else if(bugInLevel == "Bug04"){
                var wj_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_dwalk1.png");
                var wj_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_dwalk2.png");
                wj_walkArray = [wj_a_walk1,wj_a_walk2];
                var wj_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_d_cut0001.png");
                var wj_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_d_cut0002.png");
                wj_attackArray = [wj_a_cut1,wj_a_cut2];
            }else if(bugInLevel == "Bug05"){
                var wj_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_e_walk0001.png");
                var wj_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_e_walk0002.png");
                wj_walkArray = [wj_a_walk1,wj_a_walk2];
                var wj_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_e_cut0001.png");
                var wj_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_e_cut0002.png");
                wj_attackArray = [wj_a_cut1,wj_a_cut2];
            };

            if(beeInLevel == "Bee"){
                var sbd_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_awalk1.png");
                var sbd_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_awalk2.png");
                sbd_walkArray = [sbd_a_walk1,sbd_a_walk2];
                var sbd_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_a_cut0001.png");
                var sbd_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_a_cut0002.png");
                sbd_attackArray = [sbd_a_cut1,sbd_a_cut2];
            }else if(beeInLevel == "Bee02"){
                var sbd_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_bwalk1.png");
                var sbd_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_bwalk2.png");
                sbd_walkArray = [sbd_a_walk1,sbd_a_walk2];
                var sbd_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_b_cut0001.png");
                var sbd_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_b_cut0002.png");
                sbd_attackArray = [sbd_a_cut1,sbd_a_cut2];
            }else if(beeInLevel == "Bee03"){
                var sbd_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_c_walk0001.png");
                var sbd_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_c_walk0002.png");
                sbd_walkArray = [sbd_a_walk1,sbd_a_walk2];
                var sbd_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_c_cut0001.png");
                var sbd_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_c_cut0002.png");
                sbd_attackArray = [sbd_a_cut1,sbd_a_cut2];
            }else if(beeInLevel == "Bee04"){
                var sbd_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_dwalk1.png");
                var sbd_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_dwalk2.png");
                sbd_walkArray = [sbd_a_walk1,sbd_a_walk2];
                var sbd_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_d_cut0001.png");
                var sbd_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_d_cut0002.png");
                sbd_attackArray = [sbd_a_cut1,sbd_a_cut2];
            }else if(beeInLevel == "Bee05"){
                var sbd_a_walk1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_e_walk0001.png");
                var sbd_a_walk2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_e_walk0002.png");
                sbd_walkArray = [sbd_a_walk1,sbd_a_walk2];
                var sbd_a_cut1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_e_cut0001.png");
                var sbd_a_cut2 = cc.SpriteFrameCache.getInstance().getSpriteFrame("sbd_e_cut0002.png");
                sbd_attackArray = [sbd_a_cut1,sbd_a_cut2];
            };

            ////http://my.longames.com/lastDay/
////        添加神像
            this.sbdGodH = sbdGod.create();
        this.wjGodH = wjGod.create();
            this.sbdGodH.setPosition(166,426);
        this.wjGodH.setPosition(670,444);
            this.addChild(this.sbdGodH,9);
        this.addChild(this.wjGodH,9);

//            this.schedule(this.enemyAttack,3,cc.REPEAT_FOREVER,);
            //注册更新
            this.scheduleUpdate();

    //测试用
    //            map: [
    //        {owner:"Player",id:1, type:"YellowTower",count:25,x:90,y:265,path:[2,3]},
            this.levelData = this.levelData.map;
            this.eneimes = [];
            this.playTowerArray = [];
    //测试用
            for(var i = 0; i < this.levelData.length; i++) {
                var ld = this.levelData[i];
    //            测试用，以下这个方法要单独看看
                var tower = lg.nameToObject(ld.type).create(ld.owner, ld.id);
                if(ld.texture) {
                    tower.initWithSpriteFrameName(ld.texture);
                    tower.colorCount.initWithFile(p_gray);
                }
                tower.setCount(ld.count);
                tower.setPosition(ld.x, ld.y);
                if(tower.setRate) {
                    if(ld.owner == "Player") tower.setRate(this.playerRate);
                    else if(ld.owner == "Enemy") tower.setRate(this.enemyRate);
                    else tower.setRate(this.neutralRate);
                };
                this.addChild(tower, 10);
                this["Tower"+(i+1)] = tower;
                this["tower"+(i+1)+"position"] = tower.getPosition();
                if(ld.owner == "Enemy") this.eneimes.push(tower);
                if(ld.owner == "Player"){this.playTowerArray.push(tower)};
            }
            this.towerSize=this.Tower1.getContentSize();

//            //结束界面
            {
                this.loseText = cc.Sprite.createWithSpriteFrameName("YOULOSE.png");
                this.loseText.setPosition(380, 270);
                this.addChild(this.loseText, 20);
                this.loseText.setVisible(false);
//去下一关
                var back1 = cc.Sprite.createWithSpriteFrameName("back.png");
                var back2 = cc.Sprite.createWithSpriteFrameName("back.png");
                var _start = cc.MenuItemSprite.create(back1,back2,this.nextLevel,this);
                this.back = cc.Menu.create(_start);
                this.back.setPosition(520,120);
                this.addChild(this.back,25);
                this.back.setVisible(false);
//返回主界面
                var return1 = cc.Sprite.createWithSpriteFrameName("return.png");
                var return2 = cc.Sprite.createWithSpriteFrameName("return.png");
                var tomenu = cc.MenuItemSprite.create(return1,return2,this.returnmenu,this);
                this.returnto = cc.Menu.create(tomenu);
                this.returnto.setPosition(280,120);
                this.addChild(this.returnto,25);
                this.returnto.setVisible(false);
//重玩本关
                var replay1 = cc.Sprite.createWithSpriteFrameName("replay.png");
                var replay2 = cc.Sprite.createWithSpriteFrameName("replay.png");
                var replay = cc.MenuItemSprite.create(replay1,replay2,this.replaygame,this);
                this.replayto = cc.Menu.create(replay);
                this.replayto.setPosition(460,120);
                this.addChild(this.replayto,25);
                this.replayto.setVisible(false);

                var moreCha=cc.Sprite.createWithSpriteFrameName("MOREGAMES1.png");
                this.moreGamesBtn=cc.Sprite.create("moregames.png");
                this.moreGamesBtn.addChild(moreCha,10);
                moreCha.setPosition(100,30);
                this.moreGamesBtn.setPosition(400,45);
                this.addChild(this.moreGamesBtn,25);
                lg.inputManager.addListener(this.moreGamesBtn, goMoreGame);
                this.moreGamesBtn.setVisible(false);
            }
        }else{
            level = 0;
        };

//        添加技能面板
        this.skillBar = cc.Sprite.createWithSpriteFrameName("skill_bar.png");
        this.skillBar.setScale(0.8);
        this.skillBar.setPosition(410,50.5);
        this.addChild(this.skillBar,10);

//        测试，带删除
//        var p = cc.Sprite.create("Blue.png");
//        p.setPosition(200,300);
//        this.addChild(p,50);
//        p.runAction(cc.MoveTo.create(2,cc.p(-10,250)));
//      添加锁
                this.lockZZ = LockEffect.create();
                this.lockHF = LockEffect.create();
                this.lockWY = LockEffect.create();
                this.lockSD = LockEffect.create();
                this.lockHD = LockEffect.create();
                this.lockLX = LockEffect.create();
                this.lockZZ.setScale(0.5);
                this.lockHF.setScale(0.5);
                this.lockWY.setScale(0.5);
                this.lockSD.setScale(0.5);
                this.lockHD.setScale(0.5);
                this.lockLX.setScale(0.5);
                this.lockZZ.setPosition(zzP);
                this.lockHF.setPosition(hfP);
                this.lockWY.setPosition(wyP);
                this.lockSD.setPosition(sdP);
                this.lockHD.setPosition(hdP);
                this.lockLX.setPosition(lxP);
                this.addChild(this.lockZZ,19);
                this.addChild(this.lockHF,19);
                this.addChild(this.lockWY,19);
                this.addChild(this.lockSD,19);
                this.addChild(this.lockHD,19);
                this.addChild(this.lockLX,19);

////        备用，实现本地存储功能。
        try{
            if(parseFloat(localStorage.leveled) > 1){
                leveled = parseFloat(localStorage.leveled);}
            if(parseFloat(localStorage.coinNum) > 0){
                coinNum = parseFloat(localStorage.coinNum);}
            if(parseFloat(localStorage.skill_zz_price)>0){
                skill_zz_price = parseFloat(localStorage.skill_zz_price);
                zzLevel = parseFloat(localStorage.zzLevel);}
            if(parseFloat(localStorage.skill_hf_price) > 0){
                skill_hf_price = parseFloat(localStorage.skill_hf_price);
                hfLevel = parseFloat(localStorage.hfLevel);}
            if(parseFloat(localStorage.skill_wy_price) > 0){
                skill_wy_price = parseFloat(localStorage.skill_wy_price);
                wyLevel = parseFloat(localStorage.wyLevel);}
            if(parseFloat(localStorage.skill_sd_price)> 0){
                skill_sd_price = parseFloat(localStorage.skill_sd_price);
                sdLevel = parseFloat(localStorage.sdLevel);}
            if(parseFloat(localStorage.skill_hd_price) >0){
                skill_hd_price = parseFloat(localStorage.skill_hd_price);
                hdLevel = parseFloat(localStorage.hdLevel);}
            if(parseFloat(localStorage.skill_lx_price) > 0){
                skill_lx_price = parseFloat(localStorage.skill_lx_price);
                lxLevel = parseFloat(localStorage.lxLevel);}

           if(parseFloat(localStorage.skillGuide) == 1) skillGuide = parseFloat(localStorage.skillGuide);
           if(parseFloat(localStorage.zzNum) == 1) zzNum = parseFloat(localStorage.zzNum);
            if(parseFloat(localStorage.hfNum) == 1)  hfNum = parseFloat(localStorage.hfNum);
            if(parseFloat(localStorage.wyNum) == 1) wyNum = parseFloat(localStorage.wyNum);
            if(parseFloat(localStorage.sdNum) == 1) sdNum = parseFloat(localStorage.sdNum);
            if(parseFloat(localStorage.hdNum) == 1)  hdNum = parseFloat(localStorage.hdNum);
            if(parseFloat(localStorage.lxNum) == 1) lxNum = parseFloat(localStorage.lxNum);

//            }
        }catch (err){};
    },
                //    //测试用，验证setPosition()方法不会直接造成降低帧。
                //            move:function(){
                //                var bug = lg.objectPool.fetch(bugInLevel);//lg.nameToObject(type).create();
                //                bug.setScale(0.7);
                //        //        var bug = cc.Sprite.createWithSpriteFrameName("wj_a.png");
                //                this.addChild(bug,100);
                //                bug.setPosition(410,330);
                //                this.testArray.push(bug);
                //            },
                //            update:function(){
                //                if(this.testArray.length>0){
                //                    for(var i = 0;i<this.testArray.length;i++){
                //                        var bug = this.testArray[i];
                //                        this.tower1position = cc.p(Math.random()*1190,Math.random()*1100);
                //                        this.tower2position = cc.p(Math.random()*800,Math.random()*400);
                //        //                this.tower1position = cc.p(90,100);
                //        //                this.tower2position = cc.p(800,400);
                //                        var posX = this.tower2position.x - this.tower1position.x;
                //                        var posY = this.tower2position.y - this.tower1position.y;
                //                        var bugAngle = Math.atan2(posY,posX);
                //                        this.posXAng = Math.cos(bugAngle);
                //                        this.posYAng = Math.sin(bugAngle);
                //                        enemyRunSpeed = enemyRunSpeedNormal;
                //                        this._vx = enemyRunSpeed * this.posXAng;
                //                        this._vy = enemyRunSpeed * this.posYAng;
                //                        var innerTime = cc.Director.getInstance()._deltaTime;
                //                        var aX = bug.getPositionX();
                //                        var aY = bug.getPositionY();
                //                        bug.setPosition(aX+this._vx*innerTime,aY+this._vy*innerTime);
                //                        if(bug.getPositionX()>600 |bug.getPositionY()<10){
                //                            bug.removeFromParent(true);
                //                            this.testArray.shift();
                //                        }
                //        //                cc.log(innerTime+" aaa  "+aX+"bbb "+aY+" ccc "+this._vx+" ddd "+this._vy);
                //                    }
                //                }
                //            }
    showSkillGuide:function(x,y,m){
        var skillShowFinger = cc.Sprite.createWithSpriteFrameName("finger0001.png");
        skillShowFinger.setPosition(x,y);
        this.addChild(skillShowFinger,9000);
        var xP = m._x;
        var yP = m._y;
        skillShowFinger.runAction(cc.Sequence.create(cc.DelayTime.create(1),
            cc.MoveTo.create(1,cc.p(xP,yP+136)),cc.DelayTime.create(1),cc.CallFunc.create(function(){
            skillShowFinger.removeFromParent(true);
        })));
    },
    showGuide:function(){
        var fingerArray = [];
        for(var i=2;i<19;i++){
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("finger00"+(i>9 ? "":"0")+i+".png");
            fingerArray.push(frame);
        };
        var phe = cc.Sprite.createWithSpriteFrameName("finger0002.png");
        phe.setPosition(405,230);
        phe.setScale(0.8);
        this.addChild(phe,900);
        var self = this;
        phe.runAction(cc.Sequence.create(cc.Repeat.create(cc.Animate.create(cc.Animation.create(fingerArray,0.6)),1),
        cc.CallFunc.create(function(){
            self.replaygame();
        })));
    },
//测试用，关卡飞过动画
    showLevel:function(){
        var flyIn = cc.MoveTo.create(0.5,cc.p(400,250));
        var flyOut = cc.MoveTo.create(0.5,cc.p(0,250));
        var p = this.theLevel;
        var level = cc.Sprite.createWithSpriteFrameName(p);
        level.setPosition(800,250);
        this.addChild(level,50);
        level.runAction(cc.Sequence.create(flyIn,cc.DelayTime.create(1),flyOut,cc.CallFunc.create(function(){
            level.removeFromParent(true);
        })));
    },
    skillHDFire:function(){
    },
    skillHFFire:function(){
    },
    skillLXFire:function(){
    },
    skillSDFire:function(){
    },
    skillWYFire:function(){
    },
//    skillZZFire:function(){
////        var mousePos = mouse.getLocation();
//        var zzAnim = cc.Sprite.createWithSpriteFrameName("skill_zz.png");
////        zzAnim.setPosition(mousePos.x,mousePos.y+200);
//        this.addChild(zzAnim,28);
//        onTouchMoved = function(touch){
//            var m = touch.getLocation();
//            zzAnim.setPosition(m.x, m.y);
//        };
//        onTouchMoved(touch);
//        var m = Paddle.paddleWithTexture("kuang.png");
//        m.setPosition(700,40);
//        this.addChild(m,29);
//        testBHH = 1;
//    },
    addSkillZZ:function(){
        var m = Paddle.paddleWithTexture("zz.png");
        m.setScale(0.8);
        m.setPosition(zzP);
        m.setTag(1);
        this.addChild(m,18);
        zzNum = 0;
        zz = 1;
    },
    addSkillHF:function(){
        var m = Paddle.paddleWithTexture("hf.png");
        m.setScale(0.8);
        m.setPosition(hfP);
        m.setTag(2);
        this.addChild(m,18);
        hfNum = 0;
        hf = 1;
    },
    addSkillWY:function(){
        var m = Paddle.paddleWithTexture("wy.png");
        m.setScale(0.8);
        m.setPosition(wyP);
        m.setTag(3);
        this.addChild(m,18);
        wyNum = 0;
        wy = 1;
    },
    addSkillSD:function(){
        var m = Paddle.paddleWithTexture("sd.png");
        m.setScale(0.8);
        m.setPosition(sdP);
        m.setTag(4);
        this.addChild(m,18);
        sdNum = 0;
        sd = 1;
    },
    addSkillHD:function(){
        var m = Paddle.paddleWithTexture("hd.png");
        m.setScale(0.8);
        m.setPosition(hdP);
        m.setTag(5);
        this.addChild(m,18);
        hdNum = 0;
        hd = 1;
    },
    addSkillLX:function(){
        var m = Paddle.paddleWithTexture("lx.png");
        m.setScale(0.8);
        m.setPosition(lxP);
        m.setTag(6);
        this.addChild(m,18);
        lxNum = 0;
        lx = 1;
    },
    addArrow:function(x,y,mouse){
            var arrow = newArrow.create();
            arrow.setAnchorPoint(0,0.5);
            arrow.setPosition(x,y);
            this.addChild(arrow,15);
            arrow.thisMouse = mouse;
            this.arrowArray.push(arrow);
    },
    //测试用
    update:function()
    {
//        备用实现本地存储功能
        try{
            localStorage.leveled = leveled;
            localStorage.firstIn = firstIn;
            localStorage.skillGuide = skillGuide;
        }catch(err){};
//        cc.log(" zzNum = "+zzNum);
        if((zzNum == 1  || zz == 1)& this.levelTime == 0){
            this.addSkillZZ();
            this.lockZZ.open();
            if(skillGuide == 0){
                skillGuide = 1;
                this.showSkillGuide(193,166,this.tower5position);
            }
        };
        if((hfNum == 1|| hf == 1 )& this.levelTime == 0 ){
            this.addSkillHF();
            this.lockHF.open();
            if(skillGuide == 0){
                skillGuide = 1;
                this.showSkillGuide(288,166,this.tower1position);
            }
        };
        if((wyNum == 1 || wy == 1)& this.levelTime == 0){
            this.addSkillWY();
            this.lockWY.open();
            if(skillGuide == 0){
                skillGuide = 1;
                this.showSkillGuide(363,166,this.tower4position);
            }
        };
        if((sdNum == 1 || sd == 1)& this.levelTime == 0 ){
            this.addSkillSD();
            this.lockSD.open();
            if(skillGuide == 0){
                skillGuide = 1;
                this.showSkillGuide(428,166,this.tower4position);
            }
        };
        if((hdNum == 1 || hd == 1)& this.levelTime == 0 ){
            this.addSkillHD();
            this.lockHD.open();
            if(skillGuide == 0){
                skillGuide = 1;
                this.showSkillGuide(513,166,this.tower4position);
            }
        };
        if((lxNum == 1|| lx == 1)& this.levelTime == 0 ){
            this.addSkillLX();
            this.lockLX.open();
            if(skillGuide == 0){
                skillGuide = 1;
                this.showSkillGuide(588,166,this.tower4position);
            }
        };

        var timeCounter = cc.Director.getInstance()._deltaTime;
        if(this.timeButton == 0 & this.levelTime < 300){
            this.levelTime += timeCounter;
        };
//        遍历数组，设置当前塔状态是否是安全的，在自动出怪中有用到。
        for(var i = 1; i <= this.levelData.length; i++){
            var tower = this["Tower"+i];
            var path = this.levelData[i - 1].path;
////            tower.isSafe = true;
            for(var j = 0; j < path.length; j++){
                var neighbor = this["Tower"+path[j]];
////                测试用，修改了以下语句内容。
                this.doFighting(tower,neighbor);
////                if(tower.type == "Enemy" && neighbor.type != "Enemy"){
////                    tower.isSafe = false;
//                }
            }
        };

//        塔容量计数小于0之后敌友改变
//        测试用，没看出来下面这句有什么恋用。
//        if(this.endTower!=null)
//        {
            var gameOver = false;
            var theType = null;
//测试用，以下遍历塔数组。
            for(var i = 1; i <= this.levelData.length; i++){
                var tower = this["Tower"+i];
                if(tower._count < 0) {
                    if(tower.type == "Enemy"){
                        tower.type = "Player";
                        this.playTowerArray.push(tower);
                        this.sbdGodH.win();
                        this.wjGodH.lose();
                        tower.unscheduleAllCallbacks();
                        tower.scheduleUpdate();
                        var index = this.eneimes.indexOf(tower);
                        this.eneimes.splice(index, 1);
                    }else if(tower.type == "Player") {
                        tower.type = "Enemy";
                        this.eneimes.push(tower);
                        tower.unscheduleAllCallbacks();
                        tower.scheduleUpdate();
                        this.sbdGodH.lose();
                        this.wjGodH.win();
                        var index = this.playTowerArray.indexOf(tower);
                        this.playTowerArray.splice(index, 1);
                    }else if(tower.type == "Neutral") {
                        if(tower.supportingType == "Enemy") {
                            tower.type = "Enemy";
                            this.eneimes.push(tower);
                        }else {
                            tower.type = "Player";
                            this.playTowerArray.push(tower);
                        }
                    }
                    if(tower instanceof Turret){
                        tower.createTurretTower(tower.type);
                    }else{
                        (tower.type == "Player") ? tower.createYellowTower() : tower.createGreenTower();
                        (tower.type == "Player") ? tower.setRate(this.playerRate) : tower.setRate(this.enemyRate);
                    }
                    tower.setCount(1);
                };
//测试用，以下通过暂存塔类型，结合遍历判断上一个塔类型和这一个塔类型是否相同，如果遍历都相同，则不进入else if 判断，否则进入，结合下一步的
// if 判断游戏胜利或者失败。
                if(theType == null) {
                    theType = tower.type;
                }else if(tower.type != theType){
                    gameOver = false;
                }
//            }
        };
        if(this.eneimes.length == 0){
            gameOver = true;
            theType = "Player";
        }else if(this.playTowerArray.length == 0){
            gameOver = true;
            theType = "Enemy";
        };
        if(gameOver & this.timeButton == 0){
            this.timeButton = 1;
            this.getCoin(this.levelTime);
            if(theType == "Enemy")
            {
                this.youLose();
            }else {
                this.youWin()
            };
        }
    },
//    根据不同过关事件判定胜利等级，不同等级给予不同金钱。
    getCoin:function(timeT){
        var t = Math.round(timeT / 60);
        if(t < bestTime){
            this.scoreXnum = 3;
            coinNum += bestCoin;
        }else if(t < normalTime){
            this.scoreXnum = 2;
            coinNum += normalCoin;
        }else{
            this.scoreXnum = 1;
            coinNum += badCoin;
        }
    },
    youWin:function()
    {
        gameOver = true;
//        this.winText.setVisible(true);
        this.winText = scoreBar.create();
        this.winText.setPosition(380, 250);
        this.winText.showStar(this.scoreXnum);
        var judgeNum = Math.round(Math.max(100/this.levelTime,1))*10;
        var scoreNum = cc.LabelTTF.create("0", "Arial", 46);
        scoreNum.setAnchorPoint(0, 0);
        scoreNum.setPosition(460, 185);
        scoreNum.setColor(cc.yellow());
        scoreNum.setString(judgeNum.toString());
        this.winText.addChild(scoreNum, 21);
        var coinXnum = 0;
        switch (this.scoreXnum){
            case 1:coinXnum = badCoin;break;
            case 2:coinXnum = normalCoin;break;
            case 3:coinXnum = bestCoin;break;
            default :coinXnum = 2;
        }
        var coinNumT = cc.LabelTTF.create("0", "Arial", 46);
        coinNumT.setAnchorPoint(0, 0);
        coinNumT.setPosition(460, 90);
        coinNumT.setColor(cc.yellow());
        coinNumT.setString(coinXnum.toString());
        this.winText.addChild(coinNumT, 21);
        this.winText.setVisible(false);
        this.addChild(this.winText, 20);
//        this.winText.runAction(cc.FadeIn.create(0.5));
        this.stopAllActions();
        this.unscheduleAllCallbacks();
        while(bugArray.length > 0){
            bugArray.shift().removeFromParent(true);
        }
//        添加levelUp
        SG_Hooks.levelUp(level,coinNum);
//        测试用，得分面板
        var self = this;
        this.winText.runAction(cc.Sequence.create(cc.DelayTime.create(2)/*cc.DelayTime.create(1.5),cc.FadeOut.create(0.3)*/,cc.CallFunc.create(function(){
            self.winText.setVisible(true)
        }),cc.DelayTime.create(3),cc.CallFunc.create(function(){
            self.winText.removeFromParent(true);
            self.nextLevel();
        })));
//        this.winText.runAction(cc.Sequence.create(cc.DelayTime.create(1),cc.FadeOut.create(1),cc.CallFunc.create(function(){
//            self.nextLevel();
//        })));
//        this.back.setVisible(true);
//        this.returnto.setVisible(true);
//        this.replayto.setVisible(true);
//        this.moreGamesBtn.setVisible(true);
        lg.playSound(m_win);
        if(level + 1 > leveled) leveled = level + 1;
//        cc.Director.getInstance().pause();
    },
    returnmenu:function(){
        lg.replaceScene("levelSelect");
    },
    replaygame:function(){
        lg.replaceScene("mainGame");
    },
    youLose:function()
    {
        gameOver = true;
        this.loseText.setVisible(true);
        this.returnto.setVisible(true);
        this.replayto.setVisible(true);
        this.moreGamesBtn.setVisible(true);
        SG_Hooks.gameOver(level,coinNum);
        cc.Director.getInstance().pause();
        lg.playSound(m_lose);
    },
//    测试用，进入下一关。
    nextLevel:function(){
//        cc.log("new level");
        if(level < 21){
            level++;
            var skillBar = SkillBar.create();
            skillBar.setPosition(400,250);
//            skillBar.runAction(cc.FadeIn.create(1.3));
            this.addChild(skillBar,35);
        }else{
            level = 0;
        }
    },
    runNextLevel:function(){
        lg.replaceScene("mainGame");
    },
    backgame:function(){
        if(level < 10){
            level++;
        }else{
            level = 1;
        }
        lg.replaceScene("mainGame");
    },
    doFighting:function(Tower1,Tower2)
    {
        if(Tower1.type!=Tower2.type)
        {
            var start = Tower1.dict[Tower2.id];
            var end = Tower2.dict[Tower1.id];
            var min = null;
            var max = null;
            if(start.length>=end.length){
                max=start.length;min=end.length;
            }
            else{
                min=start.length;max=end.length
            };
//测试用，遍历塔中元素，检查碰撞。
            for(var i=0;i<min;i++)
            {
                if(start[i].collide(end[i]))
                {
//测试用，碰撞则都调用打斗动画。
                    start[i].doAttack();
                    end[i].doAttack();
                    start.splice(i,1);
                    end.splice(i,1);
                    min=min-1;
//                    测试用，添加以下一句。 6-27
                    i=i-1;
                };
            }
        }
        else{return false;}
    },
//    测试用，敌人攻击。本处在初始化即有一次定时器的调用。
    enemyAttack:function()
    {
//        要实现自动出兵的逻辑，有敌人优先攻击敌人，没敌人优先攻击塔，最后攻击炮台。
//        都是本阵营，则往人少的派兵，有非本阵营，则派兵。
//        循环本阵营，
//需要优先保证向非本阵营出兵。
        for(var i = 0;i < this.eneimes.length;i ++){
            var selectEnemyTower = this.eneimes[i];
            var selectPathArray = this.levelData[selectEnemyTower.id - 1].path;
            for(var j = 0;j < selectPathArray.length;j++){
                var selectPathTower = this["Tower"+selectPathArray[j]];
                if(selectPathTower.type != "Enemy" & selectEnemyTower.state == 0){
                    selectEnemyTower.support(selectPathTower);
                }
            };
            for(var k = 0;k < selectPathArray.length;k++){
                var selectPathTower = this["Tower"+selectPathArray[k]];
                if(selectPathTower.type == "Enemy" & selectEnemyTower._count > (selectPathTower._count+enemyHelpBeginNum) & selectEnemyTower.state == 0){
                    selectEnemyTower.support(selectPathTower);
                }
            }
        }
    },
    onTouchBegan:function(pTouch)
    {
        return this.handleTouchBegan(pTouch);
    },
    onTouchEnded:function(pTouch)
    {
        this.handleTouchEnded(pTouch);
    },
    onTouchMoved:function(pTouch)
    {
        this.handleTouchMoved(pTouch);
    },
    onMouseDown:function(mouse)
    {
        this.handleTouchBegan(mouse);
    },
    onMouseUp:function(mouse)
    {
        this.handleTouchEnded(mouse);
    },
    onMouseDragged:function (mouse) {
        this.handleTouchMoved(mouse);
    },
    handleTouchBegan:function(mouse)
    {
        var mousePoint=mouse.getLocation();
//        cc.log(mousePoint.x+" = x "+mousePoint.y+" = y ");
        if(this.arrowArray.length > 0){
            for(var i = 0; i < this.arrowArray.length; i++){
                this.removeChild(this.arrowArray[i]);
            };
        }
        this.pathArray = [];//每次点击清空通行路径数组。
        this.selectTower = [];
        if(gameOver || gamePaused) return false;
        this.clickTower = null;
        this.startPosition = this.ifTowerChoose(mouse);
        this.startTower = this.clickTower;
//        添加技能面板排除
        if(this.selectTower.length == 0 & this.clickTower != this.special){
                this.selectTower.push(this.startTower);//将选中塔放入数组。
            }
        if(this.startTower == null) return;
        if(this.startTower.type=="Player")
        {
            var path = this.levelData[this.startTower.id - 1].path;
            this.pathArray = path;//将初始塔通行路径放入数组。
        }
        return true;
  },

    handleTouchMoved:function (mouse)
    {
        var mousePoint=mouse.getLocation();
        if(this.startPosition == null) return;
        this.ifTowerChoose(mouse);

        var moveTower=this.clickTower;
        //        测试用，以下是实现鼠标划过某塔则该塔大小弹跳一下。
        //var scaleUp = cc.ScaleTo.create(0.1, 1.2);
//        var scaleMid = cc.ScaleTo.create(0.1, 1);
//        if(moveTower) {
//            moveTower.runAction(cc.Sequence.create(scaleUp,scaleMid))
//        };
        var inOrNot = true;
        if(moveTower.id){
            for(var i = 0;i<this.selectTower.length;i++){
                if(moveTower.id == this.selectTower[i].id){
                    inOrNot = false;
                }
            };
            if(inOrNot & moveTower.type == "Player"){
                this.selectTower.push(moveTower);//将选中塔放入数组。
            };
//            添加多箭头。    添加非技能的判断
            if(this.arrowArray.length < this.selectTower.length & this.clickTower != this.special){
                var num = this.selectTower.length - this.arrowArray.length;
                for(var i = this.selectTower.length-1;i > this.selectTower.length - num-1;i--){
                    var posTower = this.selectTower[i].getPosition();
                    this.addArrow(posTower.x,posTower.y,mouse);
                }
            };
//            实现箭头的变化。
            for(var i = 0;i<this.arrowArray.length;i++){
                this.arrowArray[i].thisMouse = mouse;
            };
            var path = this.levelData[moveTower.id - 1].path;
//        以下是判断是否可以添加进入通行大数组。条件是有共同元素，并且阵营都是玩家所有。
            for(var i = 0;i<this.pathArray.length;i++){
                var paramPath = moveTower.id;
                var paramArray = this.pathArray[i];
                if(paramPath == paramArray  & moveTower.type == "Player"){
                    this.pathArray = this.pathArray.concat(path).unique();
                    return ;
                }
            }
        }
    },
    playerAttack:function(targetTower){
        /*通过倒推法遍历出怪塔。
        * */
        var path = this.levelData[targetTower.id - 1].path;
    //     var path = targetTower.path;
        var selectTower = this.selectTower;
    //    cc.log(selectTower.length+" 塔数组长度。");
        var paramTowerArray = [];
        for(var i = 0; i < path.length; i++){
            for(var j = 0; j < selectTower.length; j++){
                if(path[i] == selectTower[j].id){
                    selectTower[j].support(targetTower);
                    paramTowerArray.push(selectTower[j]);
                    selectTower.splice(j,1);
                    j = j-1;
                }
            }
        };
        for(var k = 0; k < paramTowerArray.length; k++){
            if(this.selectTower.length > 0){
                this.playerAttack(paramTowerArray[k]);
            }
        }
    },
    handleTouchEnded:function (mouse)
    {
//        箭头消失。
        for(var i = 0; i < this.arrowArray.length; i++){
            this.removeChild(this.arrowArray[i]);
        };
        this.arrowArray = [];
        var getPoint=mouse.getLocation();
        this.endPosition=this.ifTowerChoose(mouse);

        this.endTower=this.clickTower;

        if(this.startTower == null) return;
        /*
         * 复选路径实现思路：
         从目标倒推。合法路径来源阵营都属于玩家，并且是选定的塔。
         根据目标的所有路径遍历合法路径塔，选定的合法路径塔为新的目标，继续上一步动作。
         注意：如果有大于一条合法路径，则指定一条。
         根据目标确定步骤设定箭头及出怪方向。出怪数量统一指定当前值的三分之一即可。
         * */
         //进行路线限定并且进攻
        if(this.startTower.type == "Player")
        {
            if(this.endTower.type == "Player"){
                this.selectTower.pop();
            };
            var path = this.pathArray;
//            cc.log(path.length+"  + "+path);
//            var path = this.levelData[this.startTower.id - 1].path;
            var attacking = false;
            for(var i = 0; i < path.length; i++) {
                if(this.endTower.id == path[i]) {
                    attacking = true;
//                    this.startTower.support(this.endTower);
                    this.playerAttack(this.endTower);
                    break;
                }
            }
            if(!attacking) return false;
        };
//  测试用，提供支援。
        if(this.endTower.type == "Enemy" && this.startTower.type == "Player"){
            this.addBugs(this.levelData[this.endTower.id - 1].path);
//            cc.log(" help coming ");
        }
    },

    addBug:function(tower1,tower2)
    {
        tower1.support(tower2);

    },
    addBugs:function(path)
    {
//        测试用，遍历被攻击塔的可达路径，如果是同类型则调用出兵支援方法。目前问题是本方法调用位置为touchEnd。
        for(var i = 0; i < path.length; i++){
            var tower = this["Tower"+path[i]];
            if(tower.type == "Enemy" & tower.state == 0) {
                tower.support(this.endTower);
            }
        }
    },
    ifTowerChoose:function(mouse)
    {
        var getPoint=mouse.getLocation();

        for(var i = 1; i <= this.levelData.length; i++){
            var tower = this["Tower"+i];
            var pos = this["tower"+i+"position"];
            var rect = cc.rect(0, 0, this.towerSize.width, this.towerSize.height);
            rect._origin.x += (pos.x - this.towerSize.width/2);
            rect._origin.y += (pos.y - this.towerSize.height/2);
            if(cc.rectContainsPoint(rect,getPoint)) {
                this.clickTower = tower;
//                this.clickTower.runAction(scaleAction);
//                cc.log("dadadadddddddddddddddda");
                return pos;
            }
        };
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
//        测试用，添加API。
        lg._checkDeviceOrientation();
        gameOver = gamePaused = false;

//测试用，可借鉴是否双位数判断方法。
        var bg = cc.Sprite.createWithSpriteFrameName("BG.png");
        if(level == 21){level = 1};
        var road = cc.Sprite.createWithSpriteFrameName("road"+(level-1)+".png");
        bg.setAnchorPoint(0, 0);
        bg.addChild(road,1);
        road.setPosition(400,250);
        this.addChild(bg, 1);

        var layer = new MyLayer();
        theGame = layer;
        this.addChild(layer,2);
        layer.init();

        var ctrl = new ControlBar();
        this.addChild(ctrl, 3);
        ctrl.init();
    }
});
//测试用，关卡选择后进入本处。
MyScene.create = function()
{
    var b = new MyScene();
    b.init();
    return b;
};

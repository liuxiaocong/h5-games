/**
 * Created by a on 14-2-9.
 */
    var MenuX = 480;
    var MenuY = 365;
    var MenuY2 = 275;
var showPriceZZ = null;
var showPriceHF = null;
var showPriceWY = null;
var showPriceSD = null;
var showPriceHD = null;
var showPriceLX = null;
var totalPayMoney = 0;
var SkillBar = cc.Sprite.extend({
    skill_zz : null,
    skill_hf : null,
    skill_wy : null,
    skill_sd : null,
    skill_hd : null,
    skill_lx : null,
    star1 : null,
    star2 : null,
    star3 : null,
    xStar1 : null,
    xStar2 : null,
    xStar3 : null,
    selectId : 0,
    _lblCoinNum : null,
    _lblPriceNum : null,
    noMoney:null,
    init:function(){
        this._super();
        this.initWithSpriteFrameName("mb.png");
        var title = cc.Sprite.createWithSpriteFrameName("Upgrade.png");
        title.setPosition(400,465);
        this.addChild(title,20);

        var menu1 = cc.Sprite.createWithSpriteFrameName("Menu1.png");
        var menu2 = cc.Sprite.createWithSpriteFrameName("Menu2.png");
        var next1 = cc.Sprite.createWithSpriteFrameName("Next1.png");
        var next2 = cc.Sprite.createWithSpriteFrameName("Next2.png");
        var buy1 = cc.Sprite.createWithSpriteFrameName("Buy1.png");
        var buy2 = cc.Sprite.createWithSpriteFrameName("Buy2.png");
        var menu = cc.MenuItemSprite.create(menu1,menu2,this.menuCallFunc,this);
        var next = cc.MenuItemSprite.create(next1,next2,this.nextCallFunc,this);
        var buy = cc.MenuItemSprite.create(buy1,buy2,this.buyCallFunc,this);
        menu.setPosition(-200,-195);
        next.setPosition(200,-195);
        buy.setPosition(270,-120);
        var skillBarButton = cc.Menu.create(menu,next,buy);
        this.addChild(skillBarButton,20);

        var skill_zz1 = cc.Sprite.createWithSpriteFrameName("skill_b_zz.png");
        var skill_zz2 = cc.Sprite.createWithSpriteFrameName("skill_b_zz.png");
        this.skill_zz = cc.MenuItemSprite.create(skill_zz1,skill_zz2,this.select_zz,this);
        var skill_hf1 = cc.Sprite.createWithSpriteFrameName("skill_b_hf.png");
        var skill_hf2 = cc.Sprite.createWithSpriteFrameName("skill_b_hf.png");
        this.skill_hf = cc.MenuItemSprite.create(skill_hf1,skill_hf2,this.select_hf,this);
        var skill_wy1 = cc.Sprite.createWithSpriteFrameName("skill_b_wy.png");
        var skill_wy2 = cc.Sprite.createWithSpriteFrameName("skill_b_wy.png");
        this.skill_wy = cc.MenuItemSprite.create(skill_wy1,skill_wy2,this.select_wy,this);
        var skill_sd1 = cc.Sprite.createWithSpriteFrameName("skill_b_sd.png");
        var skill_sd2 = cc.Sprite.createWithSpriteFrameName("skill_b_sd.png");
        this.skill_sd = cc.MenuItemSprite.create(skill_sd1,skill_sd2,this.select_sd,this);
        var skill_hd1 = cc.Sprite.createWithSpriteFrameName("skill_b_hd.png");
        var skill_hd2 = cc.Sprite.createWithSpriteFrameName("skill_b_hd.png");
        this.skill_hd = cc.MenuItemSprite.create(skill_hd1,skill_hd2,this.select_hd,this);
        var skill_lx1 = cc.Sprite.createWithSpriteFrameName("skill_b_lx.png");
        var skill_lx2 = cc.Sprite.createWithSpriteFrameName("skill_b_lx.png");
        this.skill_lx = cc.MenuItemSprite.create(skill_lx1,skill_lx2,this.select_lx,this);
        var skillButton = cc.Menu.create(this.skill_zz,this.skill_hf,this.skill_wy);
        var skillButton2 = cc.Menu.create(this.skill_sd,this.skill_hd,this.skill_lx);
        skillButton.setScale(1);
        skillButton2.setScale(1);
        skillButton.setPosition(480,365);
        skillButton2.setPosition(480,275);
        skillButton.alignItemsHorizontallyWithPadding(45);
        skillButton2.alignItemsHorizontallyWithPadding(45);
        this.addChild(skillButton,20);
        this.addChild(skillButton2,20);

        selectIMG = cc.Sprite.createWithSpriteFrameName("kuang.png");
        selectIMG.setPosition(-500,-500);
        selectIMG.setScale(0.75);
        this.addChild(selectIMG,20);

        this._lblCoinNum = cc.LabelTTF.create("0", "Arial", 22);
        this._lblCoinNum.setAnchorPoint(0, 0);
        this._lblCoinNum.setPosition(656, 172);
        this._lblCoinNum.setColor(cc.yellow());
        this._lblCoinNum.setString(coinNum.toString());
        this.addChild(this._lblCoinNum, 20);

        this._lblPriceNum = cc.LabelTTF.create("0", "Arial", 25);
        this._lblPriceNum.setAnchorPoint(0, 0);
        this._lblPriceNum.setPosition(460,70);
        this._lblPriceNum.setColor(cc.yellow());
        this._lblPriceNum.setVisible(false);
//        this._lblPriceNum.setString(coinNum.toString());
        this.addChild(this._lblPriceNum, 20);

        this.xStar1 = cc.Sprite.createWithSpriteFrameName("xx1.png");
        this.xStar2 = cc.Sprite.createWithSpriteFrameName("xx1.png");
        this.xStar3 = cc.Sprite.createWithSpriteFrameName("xx1.png");
        this.xStar1.setPosition(320,83);
        this.xStar2.setPosition(360,83);
        this.xStar3.setPosition(400,83);
        this.xStar1.setVisible(false);
        this.xStar2.setVisible(false);
        this.xStar3.setVisible(false);
        this.xStar1.setScale(0.7);
        this.xStar2.setScale(0.7);
        this.xStar3.setScale(0.7);
        this.addChild(this.xStar1,21);
        this.addChild(this.xStar2,21);
        this.addChild(this.xStar3,21);

        this.zzDesc = cc.Sprite.createWithSpriteFrameName("zzIntroduce.png");
        this.hfDesc = cc.Sprite.createWithSpriteFrameName("hfIntroduce.png");
        this.wyDesc = cc.Sprite.createWithSpriteFrameName("wyIntroduce.png");
        this.sdDesc = cc.Sprite.createWithSpriteFrameName("sdIntroduce.png");
        this.hdDesc = cc.Sprite.createWithSpriteFrameName("hdIntroduce.png");
        this.lxDesc = cc.Sprite.createWithSpriteFrameName("lxIntroduce.png");
        this.zzDesc.setPosition(300,160);
        this.hfDesc.setPosition(300,160);
        this.wyDesc.setPosition(320,160);
        this.sdDesc.setPosition(300,160);
        this.hdDesc.setPosition(300,160);
        this.lxDesc.setPosition(320,160);
        this.zzDesc.setVisible(false);
        this.hfDesc.setVisible(false);
        this.wyDesc.setVisible(false);
        this.sdDesc.setVisible(false);
        this.hdDesc.setVisible(false);
        this.lxDesc.setVisible(false);
        this.addChild(this.zzDesc,21);
        this.addChild(this.hfDesc,21);
        this.addChild(this.wyDesc,21);
        this.addChild(this.sdDesc,21);
        this.addChild(this.hdDesc,21);
        this.addChild(this.lxDesc,21);
        this.star1 = cc.Sprite.createWithSpriteFrameName("xx2.png");
        this.star2 = cc.Sprite.createWithSpriteFrameName("xx2.png");
        this.star3 = cc.Sprite.createWithSpriteFrameName("xx2.png");
        this.star1.setPosition(320,83);
        this.star2.setPosition(360,83);
        this.star3.setPosition(400,83);
        this.star1.setVisible(false);
        this.star2.setVisible(false);
        this.star3.setVisible(false);
        this.star1.setScale(0.7);
        this.star2.setScale(0.7);
        this.star3.setScale(0.7);
        this.addChild(this.star1,21);
        this.addChild(this.star2,21);
        this.addChild(this.star3,21);


        this.noMoney = cc.Sprite.createWithSpriteFrameName("noMoney.png");
        this.noMoney.setPosition(660,190);
        this.noMoney.setVisible(false);
        this.addChild(this.noMoney,21);
//        try{
//            if(parseFloat(localStorage.totalPayMoney) > 1){
//                totalPayMoney = parseFloat(localStorage.totalPayMoney);}
//        }catch (err){};
//        if(totalPayMoney == 0){
            showPriceZZ = skill_zz_price;
            showPriceHD = skill_hd_price;
            showPriceHF = skill_hf_price;
            showPriceWY = skill_wy_price;
            showPriceSD = skill_sd_price;
            showPriceLX = skill_lx_price;
//        };
        if(zzLevel>=1){showPriceZZ = "MAX"};
        if(hfLevel>=1){showPriceHF = "MAX"};
        if(wyLevel>=1){showPriceWY = "MAX"};
        if(sdLevel>=3){showPriceSD = "MAX"};
        if(hdLevel>=3){showPriceHD = "MAX"};
        if(lxLevel>=3){showPriceLX = "MAX"};
    },
    showNoMoney:function(){
        this.noMoney.setVisible(true);
        var self = this;
        this.runAction(cc.Sequence.create(cc.DelayTime.create(0.5),cc.CallFunc.create(function(){
            self.noMoney.setVisible(false);
        })));
    },
    showStar:function(num){
        this.star1.setVisible(false);
        this.star2.setVisible(false);
        this.star3.setVisible(false);
        if(num > 2){
            this.star1.setVisible(true);
            this.star2.setVisible(true);
            this.star3.setVisible(true);
        }else if(num > 1){
            this.star1.setVisible(true);
            this.star2.setVisible(true);
        }else if( num > 0){
            this.star1.setVisible(true);
        }
    },
//思路    本处将星星和对应的技能描述放在一起使用。
    showDesc:function(num){
        this.zzDesc.setVisible(false);
        this.hfDesc.setVisible(false);
        this.wyDesc.setVisible(false);
        this.sdDesc.setVisible(false);
        this.hdDesc.setVisible(false);
        this.lxDesc.setVisible(false);
        switch (num){
            case 1:this.zzDesc.setVisible(true);break;
            case 2:this.hfDesc.setVisible(true);break;
            case 3:this.wyDesc.setVisible(true);break;
            case 4:this.sdDesc.setVisible(true);break;
            case 5:this.hdDesc.setVisible(true);break;
            case 6:this.lxDesc.setVisible(true);break;
        }
    },
    select_zz:function(){
        this.selectId = 1;
        selectIMG.setPosition(this.skill_zz.getPosition().x+MenuX,this.skill_zz.getPosition().y+MenuY);
        this.showDesc(1);
        this.xStar1.setVisible(true);
        this.xStar2.setVisible(false);
        this.xStar3.setVisible(false);
        this.showStar(zzLevel);
        this._lblPriceNum.setVisible(true);
        this._lblPriceNum.setString(showPriceZZ.toString());
    },
    select_hf:function(){
        this.selectId = 2;
        selectIMG.setPosition(this.skill_hf.getPosition().x+MenuX,this.skill_hf.getPosition().y+MenuY);
        this.showDesc(2);
        this.xStar1.setVisible(true);
        this.xStar2.setVisible(false);
        this.xStar3.setVisible(false);
        this.showStar(hfLevel);
        this._lblPriceNum.setVisible(true);
        this._lblPriceNum.setString(showPriceHF.toString());
    },
    select_wy:function(){
        this.selectId = 3;
        selectIMG.setPosition(this.skill_wy.getPosition().x+MenuX,this.skill_wy.getPosition().y+MenuY);
        this.showDesc(3);
        this.xStar1.setVisible(true);
        this.xStar2.setVisible(false);
        this.xStar3.setVisible(false);
        this.showStar(wyLevel);
        this._lblPriceNum.setVisible(true);
        this._lblPriceNum.setString(showPriceWY.toString());
    },
    select_sd:function(){
        this.selectId = 4;
        selectIMG.setPosition(this.skill_sd.getPosition().x+MenuX,this.skill_sd.getPosition().y+MenuY2);
        this.showDesc(4);
        this.xStar1.setVisible(true);
        this.xStar2.setVisible(true);
        this.xStar3.setVisible(true);
        this.showStar(sdLevel);
        this._lblPriceNum.setVisible(true);
        this._lblPriceNum.setString(showPriceSD.toString());
    },
    select_hd:function(){
        this.selectId = 5;
        selectIMG.setPosition(this.skill_hd.getPosition().x+MenuX,this.skill_hd.getPosition().y+MenuY2);
        this.showDesc(5);
        this.xStar1.setVisible(true);
        this.xStar2.setVisible(true);
        this.xStar3.setVisible(true);
        this.showStar(hdLevel);
        this._lblPriceNum.setVisible(true);
        this._lblPriceNum.setString(showPriceHD.toString());
    },
    select_lx:function(){
        this.selectId = 6;
        selectIMG.setPosition(this.skill_lx.getPosition().x+MenuX,this.skill_lx.getPosition().y+MenuY2);
        this.showDesc(6);
        this.xStar1.setVisible(true);
        this.xStar2.setVisible(true);
        this.xStar3.setVisible(true);
        this.showStar(lxLevel);
        this._lblPriceNum.setVisible(true);
        this._lblPriceNum.setString(showPriceLX.toString());
    },
    menuCallFunc:function(){
        this.getParent().returnmenu();
    },
    nextCallFunc:function(){
        try{
            localStorage.leveled = leveled;
            localStorage.coinNum = coinNum;
            localStorage.skill_zz_price = skill_zz_price;
            if(zzNum == 1){
                localStorage.zzNum = zzNum;
            }
            localStorage.zzLevel = zzLevel;
            localStorage.skill_hf_price =skill_hf_price;
            if(hfNum == 1){localStorage.hfNum = hfNum;}
            localStorage.hfLevel = hfLevel;
            localStorage.skill_wy_price =skill_wy_price;
            if(wyNum == 1){localStorage.wyNum = wyNum;}
            localStorage.wyLevel = wyLevel;
            localStorage.skill_sd_price =skill_sd_price;
            if(sdNum == 1){localStorage.sdNum = sdNum;}
            localStorage.sdLevel = sdLevel;
            localStorage.skill_hd_price =skill_hd_price;
            if(hdNum == 1){localStorage.hdNum = hdNum;}
            localStorage.hdLevel = hdLevel;
            localStorage.skill_lx_price =skill_lx_price;
            if(lxNum == 1){localStorage.lxNum = lxNum;}
            localStorage.lxLevel = lxLevel;
            localStorage.totalPayMoney = totalPayMoney;
        }catch(err){};
        this.getParent().runNextLevel();
        this.removeFromParent(true);
    },
    buyCallFunc:function(){
        switch (this.selectId){
            case 1:this.buySkill_zz();break;
//            case 1:cc.log("1");break;
            case 2:this.buySkill_hf();break;
            case 3:this.buySkill_wy();break;
            case 4:this.buySkill_sd();break;
            case 5:this.buySkill_hd();break;
            case 6:this.buySkill_lx();break;
        }
    },
    buySkill_zz:function(){
        if(zzLevel < 1 & coinNum >= skill_zz_price){
            coinNum -= skill_zz_price;
            totalPayMoney += skill_zz_price;
            skill_zz_price += 1;
            showPriceZZ = "MAX"
            this._lblCoinNum.setString(coinNum.toString());
            zzNum = 1;
            zzLevel += 1;
            this.showStar(zzLevel);
            this._lblPriceNum.setString(showPriceZZ.toString());
        }else if(coinNum < skill_zz_price){
            this.showNoMoney();
        }
    },
    buySkill_hf:function(){
        if(hfLevel < 1 & coinNum >= skill_hf_price){
            coinNum -= skill_hf_price;
            totalPayMoney += skill_hf_price;
            skill_hf_price += 1;
            showPriceHF = "MAX";
            this._lblCoinNum.setString(coinNum.toString());
            hfNum = 1;
            hfLevel += 1;
            this.showStar(hfLevel);
            this._lblPriceNum.setString(showPriceHF.toString());
        }else if(coinNum < skill_hf_price){
            this.showNoMoney();
        }
    },
    buySkill_wy:function(){
        if(wyLevel < 1 & coinNum >= skill_wy_price){
            coinNum -= skill_wy_price;
            totalPayMoney +=skill_wy_price;
            skill_wy_price +=1;
            showPriceWY = "MAX";
            this._lblCoinNum.setString(coinNum.toString());
            wyNum = 1;
            wyLevel += 1;
            this.showStar(wyLevel);
            this._lblPriceNum.setString(showPriceWY.toString());
        }else if(coinNum < skill_wy_price){
            this.showNoMoney();
        }
    },
    buySkill_sd:function(){
        if(sdLevel < 3 & coinNum >= skill_sd_price){
            coinNum -= skill_sd_price;
            totalPayMoney += skill_sd_price;
            this._lblCoinNum.setString(coinNum.toString());
            sdNum = 1;
            sdLevel += 1;
            skill_sd_price += sd_price_up;
            showPriceSD = skill_sd_price;
            if(sdLevel == 3){
                showPriceSD = "MAX";
            };
            this.showStar(sdLevel);
            this._lblPriceNum.setString(showPriceSD.toString());
        }else if(coinNum < skill_sd_price){
            this.showNoMoney();
        }
    },
    buySkill_hd:function(){
        if(hdLevel < 3 & coinNum >= skill_hd_price){
            coinNum -= skill_hd_price;
            totalPayMoney +=skill_hd_price;
            this._lblCoinNum.setString(coinNum.toString());
            hdNum = 1;
            hdLevel += 1;
            skill_hd_price += hd_price_up;
            showPriceHD = skill_hd_price;
            if(hdLevel == 3){
                showPriceHD = "MAX";
            };
            this.showStar(hdLevel);
            this._lblPriceNum.setString(showPriceHD.toString());
        }else if(coinNum < skill_hd_price){
            this.showNoMoney();
        }
    },
    buySkill_lx:function(){
        if(lxLevel < 3 & coinNum >= skill_lx_price){
            coinNum -= skill_lx_price;
            totalPayMoney += skill_lx_price;
            this._lblCoinNum.setString(coinNum.toString());
            lxNum = 1;
            lxLevel += 1;
            skill_lx_price += lx_price_up;
            showPriceLX = skill_lx_price;
            if(lxLevel == 3){
                showPriceLX = "MAX";
            }
            this.showStar(lxLevel);
            this._lblPriceNum.setString(showPriceLX.toString());
        }else if(coinNum < skill_lx_price){
            this.showNoMoney();
        }
    }
});
SkillBar.create = function()
{
    var b = new SkillBar();
    b.init();
    return b;
};

var PADDLE_STATE_GRABBED = 0;
var PADDLE_STATE_UNGRABBED = 1;

var Paddle = cc.Sprite.extend({
    _state:PADDLE_STATE_UNGRABBED,
    reloadTime : 0,
//    ctor:function(){
//        this._super();
//        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,0,true);
//    },
    skillCover:function(time,pos){
        var to1 = cc.ProgressFromTo.create(time, 100,0);  //定义好经历的时间和百分比
        var left = cc.ProgressTimer.create(cc.Sprite.createWithSpriteFrameName("an.png"));
        left.setAnchorPoint(0,0);
        left.setScale(0.55);
        left.setType(cc.PROGRESS_TIMER_TYPE_RADIAL); //设置进度的类型为扇形
//        left.setPosition(pos);
        left.setReverseDirection(true); //设置反方向进行旋转
        this.addChild(left);
        left.runAction(cc.Sequence.create(to1,cc.CallFunc.create(function(){
            left.removeFromParent(true);
        }))); //执行动作
    },
    onEnter:function () {
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,0,true);
        this._super();
        this.scheduleUpdate();
    },
    onExit:function () {
        cc.unregisterTouchDelegate(this);
        this._super();
    },
    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();
        var contentSize = this.getContentSize();
        var myRect = cc.rect(0,0,contentSize.width,contentSize.height);

        myRect.x += this.getPosition().x-this.getContentSize().width/2;
        myRect.y += this.getPosition().y-this.getContentSize().height/2;

        return cc.rectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    },
    change:function(){
        var cgArray = [];
        var p = null;
        if(this.getTag()==1){this.p = "zzIcon"}
        else if(this.getTag()==2){this.p = "hfIcon"}
        else if(this.getTag()==3){this.p = "wyIcon"}
        else if(this.getTag()==4){this.p = "sdIcon"}
        else if(this.getTag()==5){this.p = "hdIcon"}
        else if(this.getTag()==6){this.p = "lxIcon"}
        if(cgArray.length<3)
        {
            for(var i=1;i<3;i++)
            {
                var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(this.p+i+".png");
                cgArray.push(frame);
            }
        };
        var self = this;
        this.runAction(cc.RepeatForever.create(cc.Animate.create(cc.Animation.create(cgArray,0.5))));
    },
    onTouchBegan:function (touch, event) {
        if(gameOver || gamePaused) return false;
        if (this._state != PADDLE_STATE_UNGRABBED) return false;
        if(this.reloadTime != 0) return false;

        if (!this.containsTouchLocation(touch)) return false;
        this._state = PADDLE_STATE_GRABBED;
        this.change();

//        cc.log("touch Began");
//        switch (this.getTag()){
//            case 1:this.initWithSpriteFrameName("zzIcon1.png");break;
//            case 2:this.initWithSpriteFrameName("hfIcon1.png");break;
//            case 3:this.initWithSpriteFrameName("wyIcon1.png");break;
//            case 4:this.initWithSpriteFrameName("sdIcon1.png");break;
//            case 5:this.initWithSpriteFrameName("hdIcon1.png");break;
//            case 6:this.initWithSpriteFrameName("lxIcon1.png");break;
//        }
        return true;

    },
    onTouchMoved:function (touch, event) {
        var touchPoint = touch.getLocation();
        this.setPosition(touchPoint.x, touchPoint.y);
    },
    onTouchEnded:function (touch, event) {
        var touchPoint = touch.getLocation();
        this._state = PADDLE_STATE_UNGRABBED;
        if(touchPoint.y < 70){
            switch (this.getTag()){
                case 1:this.setPosition(zzP);break;
                case 2:this.setPosition(hfP);break;
                case 3:this.setPosition(wyP);break;
                case 4:this.setPosition(sdP);break;
                case 5:this.setPosition(hdP);break;
                case 6:this.setPosition(lxP);break;
            }
            return;
        }
        this.setPosition(touchPoint.x, touchPoint.y);

        if(this.getTag()==1){
            var showZZ = ZZEffect.create();
            showZZ.setTag(11);
            showZZ.setPosition(touchPoint.x,touchPoint.y);
            this.getParent().addChild(showZZ,5);
            var self = this;
            this.runAction(cc.Sequence.create(cc.CallFunc.create(function(){
                showZZ.work();
            }),cc.CallFunc.create(function(){
                self.back();
            })));
            return;
        }else if(this.getTag()==2){
            var showZZ = HFEffect.create();
            showZZ.setTag(12);
            showZZ.setPosition(touchPoint.x,touchPoint.y);
            this.getParent().addChild(showZZ,11);
            for(var i = 0;i < this.getParent().playTowerArray.length;i++){
                var playerTower = this.getParent().playTowerArray[i];
                if(showZZ.collide(playerTower) & playerTower.cls != "Turret"){
                    hfTowerRate = playerTower.rate;
                    showZZ.setPosition(playerTower.getPositionX(),playerTower.getPositionY());
                    playerTower.setTag(21);
                    playerTower.setRate(hfRate);
                    var self = this;
                    this.runAction(cc.Sequence.create(cc.CallFunc.create(function(){
                        showZZ.work();
                    }),cc.CallFunc.create(function(){
                        self.back();
                    })));
                    return;
                }
            };
            this.stopAllActions();
            this.initWithSpriteFrameName("hf.png");
                showZZ.removeFromParent(true);
                this.setPosition(hfP);
        }else if(this.getTag()==3){
            var showZZ = WYEffect.create();
            showZZ.setTag(13);
            showZZ.setPosition(touchPoint.x,touchPoint.y);
            this.getParent().addChild(showZZ,11);
            for(var i = 0;i < this.getParent().eneimes.length;i++){
                var enemyTower = this.getParent().eneimes[i];
                wyTowerRate = er1;
//                wyTowerRate = enemyTower.rate;
                if(showZZ.collide(enemyTower) & enemyTower.cls != "Turret"){
                    enemyTower.setTag(51);
                    enemyTower.setRate(wyRate);
                    showZZ.setPosition(enemyTower.getPositionX(),enemyTower.getPositionY());
                    var self = this;
                    this.runAction(cc.Sequence.create(cc.CallFunc.create(function(){
                        showZZ.work();
                    }),cc.CallFunc.create(function(){
                        self.back();
                    })));
                    return;
                }
            }
            this.stopAllActions();
            this.initWithSpriteFrameName("wy.png");
                showZZ.removeFromParent(true);
                this.setPosition(wyP);
        }else if(this.getTag()==4){
            var showZZ = SDEffect.create();
            showZZ.setTag(14);
            showZZ.setPosition(touchPoint.x,touchPoint.y);
            this.getParent().addChild(showZZ,11);
            for(var i = 0;i < this.getParent().eneimes.length;i++){
                var enemyTower = this.getParent().eneimes[i];
                if(showZZ.collide(enemyTower)){
                    enemyTower.setTag(31);
                    showZZ.setPosition(enemyTower.getPositionX(),enemyTower.getPositionY()+20);
                    var self = this;
                    this.runAction(cc.Sequence.create(cc.CallFunc.create(function(){
                        showZZ.work();
                    }),cc.CallFunc.create(function(){
                        self.back();
                    })));
                    return;
                }
            }
            this.stopAllActions();
            this.initWithSpriteFrameName("sd.png");
            showZZ.removeFromParent(true);
            this.setPosition(sdP);
        }else if(this.getTag()==5){
            var showZZ = HDEffect.create();
            showZZ.setTag(15);
            showZZ.setPosition(touchPoint.x,touchPoint.y);
            this.getParent().addChild(showZZ,11);
            for(var i = 0;i < this.getParent().playTowerArray.length;i++){
                var playerTower = this.getParent().playTowerArray[i];
                if(showZZ.collide(playerTower)){
                    playerTower.setTag(41);
                    showZZ.setPosition(playerTower.getPositionX(),playerTower.getPositionY());
                    var self = this;
                    this.runAction(cc.Sequence.create(cc.CallFunc.create(function(){
                        showZZ.work();
                    }),cc.CallFunc.create(function(){
                        self.back();
                    })));
                    return;
                }
            }
            this.stopAllActions();
            this.initWithSpriteFrameName("hd.png");
            showZZ.removeFromParent(true);
            this.setPosition(hdP);
        }else if(this.getTag()==6){
            var showZZ = LXEffect.create();
            showZZ.setTag(16);
            showZZ.setPosition(touchPoint.x,touchPoint.y);
            this.getParent().addChild(showZZ,11);
            for(var i = 0;i < this.getParent().eneimes.length;i++){
                var enemyTower = this.getParent().eneimes[i];
                if(showZZ.collide(enemyTower)){
                    enemyTower.setTag(61);
                    showZZ.setPosition(enemyTower.getPositionX(),enemyTower.getPositionY()+50);
                    var self = this;
                    this.runAction(cc.Sequence.create(cc.CallFunc.create(function(){
                        showZZ.work();
                    }),cc.CallFunc.create(function(){
                        self.back();
                    })));
                    return;
                }
            }
            this.stopAllActions();
            this.initWithSpriteFrameName("lx.png");
            showZZ.removeFromParent(true);
            this.setPosition(lxP);
        };
    },
    back:function(){
        this.stopAllActions();
        switch (this.getTag()){
            case 1:this.zzBack();break;
            case 2:this.hfBack();break;
            case 3:this.wyBack();break;
            case 4:this.sdBack();break;
            case 5:this.hdBack();break;
            case 6:this.lxBack();break;
        }
    },
    zzBack:function(){
        this.setPosition(zzP);
        this.initWithSpriteFrameName("zz.png");
        this.reloadTime = zzReloadTime;
        this.skillCover(zzReloadTime,zzP);
    },
    hfBack:function(){
        this.setPosition(hfP);
        this.initWithSpriteFrameName("hf.png");
        this.reloadTime = hfReloadTime;
        this.skillCover(hfReloadTime,hfP);
    },
    wyBack:function(){
        this.setPosition(wyP);
        this.initWithSpriteFrameName("wy.png");
        this.reloadTime = wyReloadTime;
        this.skillCover(wyReloadTime,wyP);
    },
    sdBack:function(){
        this.setPosition(sdP);
        this.initWithSpriteFrameName("sd.png");
        this.reloadTime = sdReloadTime;
        this.skillCover(sdReloadTime,sdP);
    },
    hdBack:function(){
        this.setPosition(hdP);
        this.initWithSpriteFrameName("hd.png");
        this.reloadTime = hdReloadTime;
        this.skillCover(hdReloadTime,hdP);
    },
    lxBack:function(){
        this.setPosition(lxP);
        this.initWithSpriteFrameName("lx.png");
        this.reloadTime = lxReloadTime;
        this.skillCover(lxReloadTime,hdP);
    },
    update:function(){
        var timeCounter = cc.Director.getInstance()._deltaTime;
        if(this.reloadTime > 0){
            this.reloadTime -= timeCounter;
        }else{
            this.reloadTime = 0;
        }
    }
});
Paddle.paddleWithTexture = function (aTexture) {
    var paddle = new Paddle();
    paddle.initWithSpriteFrameName(aTexture);
    return paddle;
};
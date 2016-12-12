/**
 * Created by long on 14-4-9.
 */
var TowerBase = cc.Sprite.extend({
    cls:"TowerBase",
    id:null,
    type:null,
    countUD:null,
    _count:0,
    state:0,
    bug:null,
    supportingType:null,
    isSafe:false,
    radius : 20,
    numHelp:0,
    moveBugNumCounter:0,
    towerHelp : null,
//    paramPlayerCount:0,
//测试用。本方法基本可以理解为攻击？
    enemyRun : function(){
        //        测试用，需删除。
//        testHelpCount ++;
//        cc.log("进入 enemyRun 方法次数 "+testHelpCount);
        if(this._count > leftEnemy){
            this.moveBugsToTarget(this.towerHelp,bugInLevel);
        };
//        本处出兵方法需要仔细核对，控制参数及时间点要再次确认，现在的写法有问题。6-26 解决。
        this.moveBugNumCounter ++;
        if(this.moveBugNumCounter >this.numHelp){
            this.state = 0;
            this.numHelp = 0;
            this.moveBugNumCounter = 0;
        }
    },
    support:function(targetTower)
    {
//        测试用，需删除。
//        testHelpCount = 0;
//        cc.log(" 进入 support方法  ");
        this.towerHelp = targetTower;
        if(this.cls != "Turret"){
//            防止将炮台旗飘扬的动作停掉。
            this.stopAllActions();
        }
        if(this.type=="Enemy")
        {
////            测试，防止多次调用。
            this.state = 1;
            if(this._count>=6)
            {
                this.numHelp = this._count - leftEnemy;
                this.schedule(this.enemyRun,0.3,this.numHelp,0);
            }else{
                this.state = 0;
                this.numHelp = 0;
                this.moveBugNumCounter = 0;
            }
        }
//        测试用，6-27
        else if(this.type=="Player")
        {
            if(this._count <= 1) return;
//            var a=null;
            var paramPlayerCount = this._count * playerRunProportion;
            for(var i=0;i<paramPlayerCount;i++)
            {
                var wait = cc.DelayTime.create(0.3*i);
                var enable = cc.CallFunc.create(function(){
                    if(this._count > 2){
                        this.moveBugsToTarget(targetTower,beeInLevel);
                    }
                },this);
//测试用，本处也可以用schedule来实现定时调用。
                this.runAction(cc.Sequence.create(wait, enable));
            }
        }
    },
    createActor:function(type){
        var arr = type.split(".");
        var actor = arr[0];
        return actor.create();
    },
    moveBugsToTarget:function(targetTower, type)
    {
        if(!gameOver){
//            测试用，6-27
//            var bug = lg.objectPool.fetch(type);//lg.nameToObject(type).create();
//            var bug = this.createActor(type);
            if(type == "Bug"){
                var bug =  Bug.create();
            }else if(type == "Bug02"){
                var bug =  Bug02.create();
            }else if(type == "Bug03"){
                var bug =  Bug03.create();
            }else if(type == "Bug04"){
                var bug =  Bug04.create();
            }else if(type == "Bug05"){
                var bug = Bug05.create();
            }else if(type == "Bee"){
                var bug =  Bee.create();
            }else if(type == "Bee02"){
                var bug = Bee02.create();
            }else if(type == "Bee03"){
                var bug =  Bee03.create();
            }else if(type == "Bee04"){
                var bug =  Bee04.create();
            }else if(type == "Bee05"){
                var bug =   Bee05.create();
            };
                bugArray.push(bug);
                bug.setScale(0.7);
            if(bug.getParent() == null) {
                this.getParent().addChild(bug,9);
            };
    //        测试用，本处待优化。
            this.dict[targetTower.id].push(bug);
    //  设置起点，调用移动方法。
            bug.setStart(this);
            bug.moveTo(targetTower);
            bug.doFly();
    //测试用，这个玩意是干什么的？？？
            targetTower.supportingType = this.type;
        }
    },
    //测试用，设定塔人数上限为100.
    addCount:function()
    {
        if(this._count < 100){
//  测试用，不要计数变化看效率
            this.changeCount(1);
        }
        return;
    },
    //测试用，显示塔人数。
    setCount:function(count)
    {
        this._count=count;
        this.countUD.setString(count.toString());
    },
    gettype:function()
    {
        return this.type;
    },
    changeCount:function(count)
    {
        this._count += count;
//  测试用，不要计数变化看效率
        this.setCount(this._count);
    },
////测试用，以下貌似是废物。
//    addPer:function()
//    {
//        this.changeCount(1);
//    },
//测试用，一个接口。
    doFire:function(){return}
});
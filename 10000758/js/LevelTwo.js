/**
 * Created with IntelliJ IDEA.
 * User: k0rs4r
 * Date: 16.08.13
 * Time: 20:54
 * To change this template use File | Settings | File Templates.
 */

(function() {

    var LevelTwo = function() {
        this.initialize();
    }
    var p = LevelTwo.prototype = new createjs.Container();

    p.back;
    p.planes;
    p.landing_red;
    p.landing_red_area;
    p.landing_yellow;
    p.landing_yellow_area;
    p.landing_blue;
    p.landing_blue_area;
    p.landedCount;
    p.spawnTimer;
    p.colliderTimer;
    p.GameOverMenu;
    p.previewSide;
    p.labelScore;

    p.maxPlanesOnLevel;

    p.landedText;

    // tutorial
    p.needTutorial;
    p.Tutorial;
    p.TutorialButtonOk;
    p.TutorialText;

    p.Container_initialize = p.initialize;
    p.initialize = function() {
        this.Container_initialize();

        this.needTutorial = true;
        this.initLevel();
    }

    p.initLevel = function(){
        this.planes = [];

        if(!this.back){
            this.back = new createjs.Bitmap( queue.getResult("level_2_background") );
        }
        this.addChild(this.back);

        // площадки
        if(!this.landing_red){
            this.landing_red = new Landing( queue.getResult("level_2_2"), 179, 136, 108, 73, "red" );
        }
        this.addChild(this.landing_red);
        if(!this.landing_red_area){
            this.landing_red.landingWaypoints = [new point(203, 190), new point(213, 184), new point(223, 178), new point(233, 172)];
            this.landing_red_area = new createjs.Shape();
            this.landing_red_area.x = 194;
            this.landing_red_area.y = 186;
            this.landing_red_area.graphics.beginFill("#00FF00").drawRect(0,0, 15,22);
            this.landing_red_area.alpha = 0.0;
            this.landing_red_area.rotation = 58;
        }
        this.addChild(this.landing_red_area);

        if(!this.landing_yellow){
            this.landing_yellow = new Landing( queue.getResult("level_2_1"), 230, 120, 89, 13, "yellow" );
        }
        this.addChild(this.landing_yellow);
        if(!this.landing_yellow_area){
            this.landing_yellow.landingWaypoints = [new point(293, 126), new point(283, 126), new point(273, 126), new point(263, 126)];
            this.landing_yellow_area = new createjs.Shape();
            this.landing_yellow_area.x = 301;
            this.landing_yellow_area.y = 120;
            this.landing_yellow_area.graphics.beginFill("#00FF00").drawRect(0,0, 18,13);
            this.landing_yellow_area.alpha = 0.0;
        }
        this.addChild(this.landing_yellow_area);

        if(!this.landing_blue){
            this.landing_blue = new Landing( queue.getResult("level_1_3"), 246,168,31,31, "blue" );
        }
        this.addChild(this.landing_blue);
        if(!this.landing_blue_area){
            this.landing_blue.landingWaypoints = [new point(262, 184)];
            this.landing_blue_area = new createjs.Shape();
            this.landing_blue_area.x = 247;
            this.landing_blue_area.y = 168;
            this.landing_blue_area.graphics.beginFill("#00FF00").drawRect(0,0, 31,31);
            this.landing_blue_area.alpha = 0.0;
        }
        this.addChild(this.landing_blue_area);

        // score
        this.landedText = SG_texts[SG.lang]['landedText'];
        this.labelScore = new createjs.Text(this.landedText+": 0", "15px Helvetica, Arial, Verdana, Microsoft Yahei, 微软雅黑, STXihei, 华文细黑, sans-serif", "rgba(255, 255, 255, 1)");
        this.labelScore.x = 10;
        this.labelScore.y = 10;
        this.addChild(this.labelScore);

        if(this.needTutorial)
            this.showTutorial();
        else
            this.setSpawner();
        this.setCollider();

        this.landedCount = 0;
        this.maxPlanesOnLevel = 4;
    }

    p.showTutorial = function(){
        this.Tutorial = new createjs.Bitmap(queue.getResult("gui_Tutorial_back"));
        this.Tutorial.x = 22;
        var tutY = 20;
        if(iPhone)
            tutY = 2;
        this.Tutorial.y = tutY;
        this.addChild(this.Tutorial);

        var text = SG_texts[SG.lang]['tutText'];
        this.TutorialText = new createjs.Text(text, "20px Helvetica, Arial, Verdana, Microsoft Yahei, 微软雅黑, STXihei, 华文细黑, sans-serif", "rgba(69, 69, 70, 1)");
        this.TutorialText.textAlign = "center";
        this.TutorialText.x = 225;
        this.TutorialText.y = 225;
        this.TutorialText.lineWidth = 290;
        this.addChild(this.TutorialText);

        this.TutorialButtonOk = new createjs.Bitmap(queue.getResult(ok_image));
        var butY = 230;
        var butX = 360;
        if(iPhone){
            butY = 210;
            butX = 365;
        }
        this.TutorialButtonOk.x = butX;
        this.TutorialButtonOk.y = butY;
        this.TutorialButtonOk.addEventListener("click", this.hideTutorial);
        this.addChild(this.TutorialButtonOk);
    }

    p.hideTutorial = function(event){
        var self = event.target.parent;
        self.removeChild(self.Tutorial);
        self.TutorialButtonOk.removeEventListener("click", self.hideTutorial);
        self.removeChild(self.TutorialButtonOk);
        self.removeChild(self.TutorialText);
        self.needTutorial = false;
        self.setSpawner();
    }

    p.setSpawner = function(){
        var spawnTime = 4000;
        var self = this;
        this.spawnTimer = setInterval(spawnPlane,spawnTime);

        spawnPlane();

        this.difficultTimer = setInterval(function(){
            if(self.maxPlanesOnLevel < 20)
                self.maxPlanesOnLevel++;
        }, 25000);

        // таймер для увеличения числа доступных самолетов
        function spawnPlane(){
            if(self.planes.length >= self.maxPlanesOnLevel)
                return;
            var t = getRandomInt(1,4);
            while(t == self.previewSide){
                t = getRandomInt(1,4);
            }
            var x = 0;
            var y = 0;
            var angle = 0;
            if(t==1){    // top
                y = - 40;
                x = getRandomInt(40,440);
                if(x < 240)
                    angle = getRandomInt(50, 90)
                else
                    angle = getRandomInt(90, 130);
            }else if(t == 2){   //right
                y = getRandomInt(40,280);
                x = 480 + 40
                if(y < 160)
                    angle = getRandomInt(180, 220)
                else
                    angle = getRandomInt(140, 180);
            }else if(t == 3){  //bottom
                y = 320 + 40;
                x = getRandomInt(40,440);
                if(x < 240)
                    angle = getRandomInt(230, 270)
                else
                    angle = getRandomInt(270, 310);
            }else if(t == 4){  //left
                y = getRandomInt(40,280);
                x = -40
                if(y < 160)
                    angle = getRandomInt(320, 360)
                else
                    angle = getRandomInt(0, 40);
            }
            self.previewSide = t;
            var color = "yellow";
            t = getRandomInt(1,3);
            if(t == 2){
                color = "red";
            }
            if(t == 3){
                color = "blue";
            }
            var plane;
            if(color == "blue")
                plane = new Helicopter("heli", x,y, angle, color);
            else if(color == "red"){
                red_rnd = getRandomInt(1,4);
                if(red_rnd <= 3)
                    plane = new Aircraft("plane1", x,y, angle, color, 20);
                else
                    plane = new Aircraft("plane3", x,y, angle, color, 25);
            }else if(color == "yellow"){
                plane = new Aircraft("plane2", x,y, angle, color, 15);
            }
            plane.addEventListener("onRunway", self.landingEvent);
            self.addChildAt(plane.waypointsContainer,1);
            self.addChild( plane);
            self.addChild( plane.warningSprite);
            self.planes.push(plane);
        }
    }

    p.landingEvent = function(event){
        event.target.addEventListener("onRunway", self.landingEvent);
        event.target.parent.landedCount++;
        event.target.parent.labelScore.text = event.target.parent.landedText+": " + event.target.parent.landedCount;
    }

    p.setCollider = function(){
        var updateTime = 300;
        var self = this;
        this.colliderTimer = setInterval(function()
        {
            // проверка столкновений
            var needToGameOver = false;
            for(activePlaneIndex = 0; activePlaneIndex<self.planes.length; activePlaneIndex++)
            {
                var activePlane = self.planes[activePlaneIndex];
                if(activePlane.onLanding)
                    continue;
                var warningPlanes = 0;
                for(var checkPlaneIndex = 0; checkPlaneIndex <self.planes.length; checkPlaneIndex++)
                {
                    if(activePlaneIndex != checkPlaneIndex)
                    {
                        checkPlane = self.planes[checkPlaneIndex];
                        if(checkPlane.onLanding)
                            continue;
                        var dist = lineDistance(new point(activePlane.x, activePlane.y), new point(checkPlane.x, checkPlane.y));
                        var maxDist = 50;
                        if(activePlane.baseImageName == "plane3" || checkPlane.baseImageName == "plane3")
                            maxDist = 60;
                        if(dist < maxDist){
                            activePlane.warning = true;
                            warningPlanes += 1;
                        }
                        if(ndgmr.checkPixelCollision(activePlane, checkPlane, 0.75)){
                            needToGameOver = true;
                            break;
                        }
                    }
                }
                if(needToGameOver)
                    break;
                if(warningPlanes == 0)
                    activePlane.warning = false;
            }

            // КОНЕЦ ИГРЫ
            if(needToGameOver){
                clearInterval(self.spawnTimer);
                clearInterval(self.colliderTimer);
                for(var activePlaneIndex = 0; activePlaneIndex<self.planes.length; activePlaneIndex++)
                {
                    activePlane = self.planes[activePlaneIndex];
                    activePlane.Disable();
                }
                self.GameOverMenu = new GameOverScreen(self.landedCount);
                self.GameOverMenu.addEventListener("selectMenu", self.gotoMenu);
                self.GameOverMenu.addEventListener("selectRetry", self.reloadLevel);
                self.addChild(self.GameOverMenu);
            }    
        },
        updateTime);
    }

    p.gotoMenu = function(event){
        event.target.parent.dispatchEvent("selectLevel");
    }

    p.reloadLevel = function(event){
        // перезапускаем уровень
        var self = event.target.parent;
        self.GameOverMenu.removeEventListener("selectMenu", self.gotoMenu);
        self.GameOverMenu.removeEventListener("selectRetry", self.reloadLevel);
        self.removeAllChildren();
        self.initLevel();
    }

    p.onTick = function(event) {
        // проверим не нужно ли удалить некоторые самолеты
        for(var activePlaneIndex = 0; activePlaneIndex<this.planes.length; activePlaneIndex++)
        {
            var activePlane = this.planes[activePlaneIndex];
            if(activePlane.active && activePlane.needForDelete){
                this.removeChild(activePlane.warningSprite);
                this.removeChild(activePlane);
                this.planes.splice(activePlaneIndex, 1);
                activePlaneIndex--;
            }
        }

        // проверка активации самолета и необходимости подсветки приземеления
        // может быть активна только одна площадка
        var needRed = false;
        var needYellow = false;
        var needBlue = false;
        for(var activePlaneIndex = 0; activePlaneIndex<this.planes.length; activePlaneIndex++)
        {
            var activePlane = this.planes[activePlaneIndex];
            if(activePlane.drawInProgress){
                if(activePlane.color == "red"){
                    needRed = true;
                }else if(activePlane.color == "yellow"){
                    needYellow = true;
                }else if(activePlane.color == "blue"){
                    needBlue = true;
                }
                break;
            }
        }
        // maintain Red Landing
        if(needRed && !this.landing_red.isActive){
            this.landing_red.activate();
        }else if(!needRed && this.landing_red.isActive){
            this.landing_red.deactivate();
        }
        if(needRed){
            pt = this.landing_red_area.globalToLocal(stage.mouseX, stage.mouseY);
            this.landing_red_area.hitTest(pt.x, pt.y);
            if(this.landing_red_area.hitTest(pt.x, pt.y)){
                activePlane.LandingFind( this.landing_red.landingWaypoints );
            }
        }
        // maintain Yellow Landing
        if(needYellow && !this.landing_yellow.isActive){
            this.landing_yellow.activate();
        }else if(!needYellow && this.landing_yellow.isActive){
            this.landing_yellow.deactivate();
        }
        if(needYellow){
            pt = this.landing_yellow_area.globalToLocal(stage.mouseX, stage.mouseY);
            this.landing_yellow_area.hitTest(pt.x, pt.y);
            if(this.landing_yellow_area.hitTest(pt.x, pt.y)){
                activePlane.LandingFind( this.landing_yellow.landingWaypoints );
            }
        }
        // maintain Yellow Landing
        if(needBlue && !this.landing_blue.isActive){
            this.landing_blue.activate();
        }else if(!needBlue && this.landing_blue.isActive){
            this.landing_blue.deactivate();
        }
        if(needBlue){
            pt = this.landing_blue_area.globalToLocal(stage.mouseX, stage.mouseY);
            this.landing_blue_area.hitTest(pt.x, pt.y);
            if(this.landing_blue_area.hitTest(pt.x, pt.y)){
                activePlane.LandingFind( this.landing_blue.landingWaypoints );
            }
        }
    }

    window.LevelTwo = LevelTwo;
}());
/**
 * Created with IntelliJ IDEA.
 * User: k0rs4r
 * Date: 15.08.13
 * Time: 22:42
 * To change this template use File | Settings | File Templates.
 */
(function() {

    var Helicopter = function(image, x, y, angle, color) {
        this.initialize(image, x, y, angle, color);
    }
    var p = Helicopter.prototype = new createjs.BitmapAnimation(); // inherit from Container

    // для приземления
    p.color;
    // для пути
    p.drawInProgress;
    p.waypoints; // массив точек
    p.waypointsGraphic; // массив графики для точек
    p.waypointsContainer;

    p.speed;
    p.active;

    p.warning;
    p.warningSprite;

    p.pointForLanding; // точка после прохождения которой будет засчитываться приземеление
    p.needForDelete;
    p.onLanding;
    p.needColor;
    p.warningFilterOn;

    p.width;
    p.height;

    p.Container_initialize = p.initialize;
    p.initialize = function(image, x, y, angle, color) {
        var ss = new createjs.SpriteSheet({ "animations":{
            fly: {
                frames: [0,1,2],
                next: "fly",
                frequency: 2
            },
            flyBlue: {
                frames: [3,4,5],
                next: "flyBlue",
                frequency: 2
            }},
            "images":[queue.getResult(image), queue.getResult(image+"_c")],
            "frames":{
                "regX":0,
                "regY":0,
                "height":41,
                "width":41,
                "count":6
            }
        });


        this.Container_initialize(ss);
        this.x = x;
        this.y = y;
        this.gotoAndPlay("flyBlue");

        this.width = 36;
        this.height = 36;
        this.regX = this.width/2;
        this.regY = this.height/2;

        this.rotation = angle;
        this.color = color;
        this.waypoints = []; // массив точек
        this.waypointsGraphic = []; // массив графики для точек
        this.waypointsContainer = new createjs.Container();
        this.drawInProgress = false;

        this.speed = 10;
        this.active = true;

        this.warning = false;
        this.needForDelete = false;
        this.onLanding = false;
        this.warningFilterOn = false;
        this.needColor = true;

        this.filters = [];
        this.setColorFilter();

        this.pointForLanding;

        //custom hitarea
        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0,0,41,41);
        this.hitArea = hit;

        this.warningSprite = new createjs.Bitmap(queue.getResult("planeWarning"));
        this.warningSprite.regX = this.warningSprite.regY = 31;
        this.warningSprite.visible = false;
    }

    // обрабатываем события мышки
    p.onPress = function(event) {
        if(this.active && !this.onLanding){
            this.pointForLanding = undefined;
            this.drawInProgress = true;
            // очистим предыдущую инфу
            while(this.waypoints.length>0){
                this.waypoints.pop();
            }
            while(this.waypointsGraphic.length>0){
                this.waypointsContainer.removeChild(this.waypointsGraphic[this.waypointsGraphic.length-1]);
                this.waypointsGraphic.pop();
            }
            //this.waypointsContainer.unCache();

            event.addEventListener("mousemove", function(evt) {
                if(evt.target.drawInProgress){
                    evt.target.newPointInPath(evt.stageX,evt.stageY);
                }
            });
            event.addEventListener("mouseup", function(evt) {
                if(evt.target.filters.length == 0 && evt.target.drawInProgress){
                    evt.target.needColor = true;
                    evt.target.setColorFilter();
                }
                evt.target.drawInProgress = false;
            })
        }
    }

    p.setColorFilter = function(){
        if(this.color == "blue" && this.needColor){
            this.gotoAndPlay("flyBlue");
        }else if(!this.needColor){
            this.gotoAndPlay("fly");
        }
    }

    // добавляет новые точки в маршрут
    p.newPointInPath = function(x, y){
        // не включаем в маршрут точки которые попадают в корабль
        var pt = this.globalToLocal(x, y);
        if(this.hitTest(pt.x, pt.y)){
            return;
        }
        // заполняем массив точек для пути
        // типо так добавляем в конец массива ;D
        p1 = this.waypoints[this.waypoints.length-1];
        if(!p1)
            p1 = new point(-999,-999);
        p2 = new point(x, y);
        if(lineDistance(p1,p2) >= 15){
            this.waypoints[this.waypoints.length] = p2;
            var wp = new createjs.Shape();
            wp.graphics.beginFill("#FF0000").drawCircle(p2.x, p2.y, 2);
            this.waypointsContainer.addChild(wp);
            this.waypointsGraphic.push((wp));
            //this.waypointsContainer.cache(0,0,480,320);
        }
    }

    p.LandingFind = function( landingWP ){
        this.drawInProgress = false;
        this.pointForLanding = landingWP[0];
        var landIndex = this.waypoints.length;
        this.waypoints = this.waypoints.concat( landingWP );

        while(this.waypointsGraphic.length>0){
            this.waypointsContainer.removeChild(this.waypointsGraphic[this.waypointsGraphic.length-1]);
            this.waypointsGraphic.pop();
        }
        for(i = 0; i < this.waypoints.length; i++){
            // для рисования "мягкого" пути приземления
            alpha = 1;
            if(i-landIndex >= 0){
                alpha = 1 - (1/landingWP.length)*(i-landIndex);
            }
            pt = this.waypoints[i];
            var wp = new createjs.Shape();
            wp.graphics.beginFill("#FFFFFF").drawCircle(pt.x, pt.y, 1);
            wp.alpha = alpha;
            this.waypointsContainer.addChild(wp);
            this.waypointsGraphic.push((wp));
            //this.waypointsContainer.cache(0,0,480,320);
        }

        this.needColor = false;
        this.setColorFilter();
    }

    p.deletePlane = function(){
        this.needForDelete = true;
    }

    p.onTick = function(event){
        if(this.active){

            if(this.waypoints.length > 0){
                // проверяем не пора ли удалять пройденную точку
                if(lineDistance(new point(this.x, this.y), this.waypoints[0]) < 5)
                {
                    this.removeFirstWaypoint();

//                    if(this.onLanding && this.waypoints.length == 0){
//                        this.active = false;
//                    }

                    // этот кусок вызывается при посадке, в начале приземления
                    if(this.pointForLanding && this.waypoints[0]){
                        if(this.waypoints[0].x == this.pointForLanding.x &&
                            this.waypoints[0].y == this.pointForLanding.y)
                        {
                            this.onLanding = true;
                            this.warning = false;
                            this.dispatchEvent("onRunway");
                            createjs.Tween.get(this).to({alpha:0, scaleX:0.3, scaleY:0.3}, 5000, createjs.Ease.cubicInOut).call(this.deletePlane);
                        }
                    }

                }
            }

            direction = this.rotation;
            firstWaypoint = this.waypoints[0];
            if(firstWaypoint){ // если в массиве есть хотя бы одна точка, то ориентироваться нужно на нее
                direction = calcAngle(firstWaypoint, new point(this.x, this.y)) + 180;
            }
            spt = rotate_point(event.delta/1000*this.speed,0, 0, 0, direction);

            this.x += spt.x;
            this.y += spt.y;


            // если углы не совпадают то нужно поворачиваться
            if(this.rotation != direction){
                // находим скорость поворота
                dist = lineDistance(new point(this.x, this.y),this.waypoints[0]);
                diff = direction - this.rotation;

                //wrap it around, so that it is either 180 or -180
                while (diff >180) diff -=360;
                while (diff <-180) diff +=360;

                rotation_speed = Math.abs(diff)/dist/(event.delta/1000*80);
                if(rotation_speed > 20)
                    rotation_speed = 20;
                if (Math.abs(diff) < rotation_speed)
                {
                    this.rotation = direction;
                }
                else
                {
                    this.rotation += (sign(diff)*rotation_speed);
                }
            }

            // в случае попадания в границу экрана - разворачиваем кораблик
            // одной точки будет достаточно
            if((this.y > 320 && (this.y-spt.y)<320 ) || (this.y < 0  && (this.y-spt.y)>0)){
                this.waypoints[0] = new point(spt.x*50+this.x, this.y - spt.y*50);
            }

            if((this.x > 480 && (this.x-spt.x)<480)  || (this.x < 0  && (this.x-spt.x)>0)){
                this.waypoints[0] = new point(this.x - spt.x*50, this.y + spt.y*50);
            }


            if(this.warning && !this.warningFilterOn){
                this.speed -=5;
                this.warningFilterOn = true;
                console.log("set filter");
                this.warningSprite.visible = true;
            }else if(!this.warning && this.warningFilterOn){
                this.speed +=5;
                this.warningFilterOn = false;
                console.log("disable");
                this.warningSprite.visible = false;
            }

            this.warningSprite.x = this.x;
            this.warningSprite.y = this.y;
            if(this.warning){
                this.warningSprite.rotation +=event.delta/1000 * 280;
            }
        }
    }

    p.Disable = function(){
        this.active = false;
        this.stop();
    }

    p.removeFirstWaypoint = function(){
        if(this.waypoints.length > 0){
            // удалим из массива точек
            this.waypoints.splice(0,1);
            // удалим с экрана и из соответствующего массива
            this.waypointsContainer.removeChild(this.waypointsGraphic[0]);
            this.waypointsGraphic.splice(0,1);
            //this.waypointsContainer.cache(0,0,480,320);
        }
    }


    window.Helicopter = Helicopter;
}());
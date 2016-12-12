(function() {

    var Landing = function(image, x, y, size_x, size_y, color) {
        this.initialize(image, x, y, size_x, size_y, color);
    }
    var p = Landing.prototype = new createjs.BitmapAnimation(); // inherit from Container

    p.color;
    p.isActive;
    p.landingWaypoins;

    p.Container_initialize = p.initialize;
    p.initialize = function(image, x, y, size_x, size_y, color) {
        var ss = new createjs.SpriteSheet({ "animations":{
            flicker: {
                frames: [0,1,2,3],
                next: "flickerB",
                frequency: 5
            },
            flickerB: {
                frames: [2,1],
                next: "flicker",
                frequency: 5
            },
            idle: {
                frames: [0],
                frequency: 5
            }},
            "images":[image],
            "frames":{
                "regX":0,
                "regY":0,
                "height":size_y,
                "width":size_x,
                "count":4
            }
        });


        this.Container_initialize(ss, "idle");
        this.x = x;
        this.y = y;
        this.gotoAndStop("idle");

        this.isActive = false;
        this.color = color;
        this.landingWaypoins = [];
        this.addEventListener("mouseover", this.onOver);
    }

    p.activate = function(){
        this.isActive = true;
        this.gotoAndPlay("flicker");
    }

    p.deactivate = function(){
        this.isActive = false;
        this.gotoAndStop("idle");
    }

    p.onTick = function() {
        //
    }

    p.onOver = function(event){
        console.log("over:"+ event.stageX + ":"+ event.stageY);
    }

    p.onMouseOver = function(event){
        console.log("over:"+ event.stageX + ":"+ event.stageY);
    }

    window.Landing = Landing;
}());
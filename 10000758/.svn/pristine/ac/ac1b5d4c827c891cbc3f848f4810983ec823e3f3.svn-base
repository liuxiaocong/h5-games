/**
 * Created with IntelliJ IDEA.
 * User: k0rs4r
 * Date: 16.08.13
 * Time: 23:52
 * To change this template use File | Settings | File Templates.
 */

(function() {

    var MainMenu = function() {
        this.initialize();
    }
    var p = MainMenu.prototype = new createjs.Container();

    p.tapMessage;
    p.button_level_1;
    p.button_level_2;
    p.button_level_3;
    p.currentButtonIndex;
    p.buttons;

    p.Container_initialize = p.initialize;
    p.initialize = function() {
        this.Container_initialize();
        
        var back = new createjs.Bitmap( queue.getResult(menu_back_image) );
        this.addChild(back);

        this.button_level_1 = new createjs.Bitmap( queue.getResult("Level1_button") );
        this.button_level_1.name = "1";
        this.button_level_2 = new createjs.Bitmap( queue.getResult("Level2_button") );
        this.button_level_2.name = "2";
        this.button_level_3 = new createjs.Bitmap( queue.getResult("Level3_button") );
        this.button_level_3.name = "3";
        this.button_level_1.regX = this.button_level_2.regX = this.button_level_3.regX = this.button_level_1.image.width/2;
        this.button_level_1.regY = this.button_level_2.regY = this.button_level_3.regY = this.button_level_1.image.height/2;
        var yPos = 240;
        if(iPhone)
            yPos = 195;
        this.button_level_1.y = this.button_level_2.y = this.button_level_3.y = yPos;
        this.button_level_1.addEventListener("click", this.clickOnButton);
        this.button_level_2.addEventListener("click", this.clickOnButton);
        this.button_level_3.addEventListener("click", this.clickOnButton);
        this.addChild(this.button_level_1);
        this.addChild(this.button_level_2);
        this.addChild(this.button_level_3);
        this.buttons = [this.button_level_1,this.button_level_2,this.button_level_3];

        var img = menu_image;
        
        this.tapMessage = new createjs.Bitmap( queue.getResult(img));
        this.tapMessage.regX = this.tapMessage.image.width/2;
        this.tapMessage.x = 240;
        var tapY = 120;
        if(iPhone)
            tapY = 195;
        this.tapMessage.y = tapY;
        this.tapMessage.addEventListener("click", SG.redirectToPortal );
        this.tapMessage.addEventListener("ontouchstart", SG.redirectToPortal);
        this.addChildAt(this.tapMessage,4);

        this.activateButtonOnLevel(1);
        this.currentButtonIndex = 1;
    }

    p.clickOnButton = function (event){
        var self = event.target.parent;
        var levelNumber = parseInt(event.target.name);
        if(self.currentButtonIndex == levelNumber){
            self.dispatchEvent("selectLevel", event.target);
            self.button_level_1.removeEventListener("click", self.clickOnButton);
            self.button_level_2.removeEventListener("click", self.clickOnButton);
            self.button_level_3.removeEventListener("click", self.clickOnButton);
        }else{
            self.button_level_1.removeEventListener("click", self.clickOnButton);
            self.button_level_2.removeEventListener("click", self.clickOnButton);
            self.button_level_3.removeEventListener("click", self.clickOnButton);
            self.activateButtonOnLevel( levelNumber );
        }
        self.currentButtonIndex = levelNumber;
    }

    p.activateButtonOnLevel = function(levelNumber)
    {
        levelNumber -= 1;
        var currentZ = 0;
        for(var currentNumber = 0; currentNumber < this.buttons.length; currentNumber++){
            var button = this.buttons[currentNumber];
            if(currentNumber < levelNumber)
            {
                var diff = levelNumber - currentNumber;
                //button.x = 240 - diff*100;
                currentZ = diff;
                //button.
                scaleX = button.scaleY = 1-diff/6;
                createjs.Tween.get(button).to({x:(240-diff*100), scaleX:scaleX, scaleY:scaleX}, 400).call(this.restoreButtons);
                //TweenMax.to(button, 0.4, {x: 240 - diff*100, scaleX:scaleX, scaleY:scaleX});
            }
            else if(currentNumber == levelNumber)
            {
                currentZ = 0;
                //button.x = 240;
                //button.scaleX = button.scaleY = 1;
                createjs.Tween.get(button).to({x:240, scaleX:1, scaleY:1}, 400).call(this.restoreButtons);
                //TweenMax.to(button, 0.4, {x: 240, scaleX:1, scaleY:1});
            }
            else if(currentNumber > levelNumber)
            {
                var diff = currentNumber - levelNumber;
                currentZ = diff;
                //button.x = 240 + diff*100;
                //button
                scaleX = button.scaleY = 1-diff/6;
                createjs.Tween.get(button).to({x:(240+diff*100), scaleX:scaleX, scaleY:scaleX}, 400).call(this.restoreButtons);
                //TweenMax.to(button, 0.4, {x: 240 + diff*100, scaleX:scaleX, scaleY:scaleX});
            }
            this.removeChild(button);
            this.addChildAt(button, this.getNumChildren()- currentZ-1);
            this.removeChild(this.tapMessage);
            this.addChild(this.tapMessage);
        }
    }

    p.restoreButtons = function(event){
        var self = this;
        if(event)
            self = event.target.parent;
        self.button_level_1.addEventListener("click", self.clickOnButton);
        self.button_level_2.addEventListener("click", self.clickOnButton);
        self.button_level_3.addEventListener("click", self.clickOnButton);
    }

    p.onTick = function(){
        //console.log("MAYDAY");
    }

    window.MainMenu = MainMenu;
}());
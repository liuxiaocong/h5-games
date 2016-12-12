/**
 * Created with IntelliJ IDEA.
 * User: k0rs4r
 * Date: 17.08.13
 * Time: 13:25
 * To change this template use File | Settings | File Templates.
 */


(function() {

    var GameOverScreen = function(score) {
        updateShareScore(score);
        this.initialize(score);
    }
    var p = GameOverScreen.prototype = new createjs.Container();

    p.back;
    p.buttonMenu;
    p.buttonMenuText;
    p.buttonRetry;
    p.buttonRetryText;
    p.textScore;

    p.Container_initialize = p.initialize;
    p.initialize = function(score) {
        SG.trigger({type:'gameOver'},score);
        
        this.Container_initialize();

        var img = gameover_image;

        back = new createjs.Bitmap( queue.getResult(img) );
        back.regX = back.image.width/2;
        back.regY = back.image.height/2;
        back.x = 240;
        back.y = 110;
        this.addChild(back);

        textScore = new createjs.Text(String(score), "65px CooperBlackBold", "rgba(97, 67, 40, 1)");
        textScore.textAlign = "center";
        textScore.x = 240
        textScore.y = 65;
        this.addChild(textScore);

		//play68_submitScore(score);
		//alert(score);
		var str = score;
	     try{parent.__4399finishgame(str);}catch(e){}
        var butY = 250;
        var xOffset = 90;
        if(iPhone){
            butY = 220;
            xOffset = 110;
        }
        buttonMenu = new createjs.Bitmap( queue.getResult("gui_GameOver_button_menu") );
        buttonMenu.regX = buttonMenu.image.width/2;
        buttonMenu.regY = buttonMenu.image.height/2;
        buttonMenu.x = 240-xOffset;
        buttonMenu.y = butY;
        this.addChild(buttonMenu);

        var textMenu = SG_texts[SG.lang]['textMenu'];
        this.buttonMenuText = new createjs.Text(textMenu, "36px Helvetica, Arial, Verdana, Microsoft Yahei, ΢���ź�, STXihei, ����ϸ��, sans-serif", "rgba(255, 255, 255, 1)");
        this.buttonMenuText.textAlign = "center";
        this.buttonMenuText.regY = this.buttonMenuText.getMeasuredLineHeight()/2;
        this.buttonMenuText.x = buttonMenu.x;
        this.buttonMenuText.y = buttonMenu.y-5;
        this.addChild(this.buttonMenuText);

        buttonRetry = new createjs.Bitmap( queue.getResult("gui_GameOver_button_retry") );
        buttonRetry.regX = buttonRetry.image.width/2;
        buttonRetry.regY = buttonRetry .image.height/2;
        buttonRetry.x = 240+xOffset;
        buttonRetry.y = butY;
        this.addChild(buttonRetry );

        var textRetry = SG_texts[SG.lang]['textRetry'];
        var size = SG_textSizes[SG.lang]['textRetry'];

        this.buttonRetryText = new createjs.Text(textRetry, size+"px Helvetica, Arial, Verdana, Microsoft Yahei, ΢���ź�, STXihei, ����ϸ��, sans-serif", "rgba(255, 255, 255, 1)");
        this.buttonRetryText.textAlign = "center";
        this.buttonRetryText.regY = this.buttonRetryText.getMeasuredLineHeight()/2;
        this.buttonRetryText.x = buttonRetry.x;
        this.buttonRetryText.y = buttonRetry.y-5;
        this.addChild(this.buttonRetryText);

        buttonMenu.addEventListener("click", this.selectMenu);
        buttonRetry.addEventListener("click", this.selectRetry);
    }

    p.selectMenu = function(event){
        var self = event.target.parent;
        self.dispatchEvent("selectMenu");
    }

    p.selectRetry = function(event){
        var self = event.target.parent;
        self.dispatchEvent("selectRetry");
    }

    window.GameOverScreen = GameOverScreen;
}());
/**
 * Created by Administrator on 14-6-26.
 */
scoreBar = cc.Sprite.extend({
    star1:null,
    star2:null,
    star3:null,
    init:function(){
        this._super();
        var smbh = 315;
        this.initWithSpriteFrameName("SCOREBAR.png");
        var title = cc.Sprite.createWithSpriteFrameName("Congreatulation.png");
        var score = cc.Sprite.createWithSpriteFrameName("SCORE.png");
        var coin = cc.Sprite.createWithSpriteFrameName("coins.png");
        title.setPosition(400,450);
        score.setPosition(260,210);
        coin.setPosition(260,120);
        this.addChild(title,9999);
        this.addChild(score,21);
        this.addChild(coin,21);

//        var s1 = cc.Sprite.createWithSpriteFrameName("xxx2.png");
//        var s2 = cc.Sprite.createWithSpriteFrameName("xxx2.png");
//        var s3 = cc.Sprite.createWithSpriteFrameName("xxx2.png");
//        s1.setPosition(300,smbh);
//        s2.setPosition(400,smbh);
//        s3.setPosition(500,smbh);
//        this.addChild(s1,21);
//        this.addChild(s2,21);
//        this.addChild(s3,21);

        this.star1 = cc.Sprite.createWithSpriteFrameName("xxx1.png");
        this.star2 = cc.Sprite.createWithSpriteFrameName("xxx1.png");
        this.star3 = cc.Sprite.createWithSpriteFrameName("xxx1.png");
        this.star1.setPosition(290,smbh);
        this.star2.setPosition(385,smbh);
        this.star3.setPosition(480,smbh);
        this.star1.setVisible(false);
        this.star2.setVisible(false);
        this.star3.setVisible(false);
        this.addChild(this.star1,21);
        this.addChild(this.star2,21);
        this.addChild(this.star3,21);
    },
    showStar:function(num){
        this.star1.setVisible(false);
        this.star2.setVisible(false);
        this.star3.setVisible(false);
        if(num > 2){
            this.star1.setVisible(true);
            this.star2.setVisible(true);
            this.star3.setVisible(true);
            this.star1.runAction(cc.FadeIn.create(0.3));
            this.star2.runAction(cc.FadeIn.create(0.8));
            this.star3.runAction(cc.FadeIn.create(1.3));
        }else if(num > 1){
            this.star1.setVisible(true);
            this.star2.setVisible(true);
            this.star1.runAction(cc.FadeIn.create(0.7));
            this.star2.runAction(cc.FadeIn.create(1.3));
        }else if( num > 0){
            this.star1.setVisible(true);
            this.star1.runAction(cc.FadeIn.create(1));
        }
    }
});

scoreBar.create = function()
{
    var b = new scoreBar();
    b.init();
    return b;
};
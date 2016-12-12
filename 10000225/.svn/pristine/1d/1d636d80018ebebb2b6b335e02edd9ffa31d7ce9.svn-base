/**
 * Created by long on 14-3-18.
 */
var logoButton = null;

function showSplash(action, startScene) {
    SplashScene.action = action;
    SplashScene.startScene = startScene;
    lg.registerScene("splash", SplashScene.scene);
    lg.replaceScene("splash");
    logoButton = createLogo();
}
var SplashScene = cc.Layer.extend({
    onEnter:function()
    {
        this._super();
        var logo = cc.Sprite.create("a10/Splash_Image.png");
        logo.setScale(0.8);
        logo.setPosition(lg.stage.center());
        this.addChild(logo);
        logo.runAction(cc.FadeIn.create(0.5));
        this.scheduleOnce(function(){
            lg.replaceScene(SplashScene.startScene);
        }, 3);
        this.scheduleOnce(function(){
            logo.runAction(cc.FadeOut.create(0.5));
        }, 2.5);
        lg.inputManager.addListener(logo, SplashScene.action);
    }
});
SplashScene.action = null;
SplashScene.startScene = null;
SplashScene.create = function()
{
    var s = new SplashScene();
    s.init();
    return s;
}
SplashScene.scene = function()
{
    var s = cc.Scene.create();
    s.addChild(SplashScene.create());
    return s;
}

function goMoreGame()
{
    if(a10Enabled) {
        if(a10Remote) {
            var moreBtnAction = GameAPI.Branding.getLink("more_games");
            if(!moreBtnAction.error && moreBtnAction.action) {
                moreBtnAction.action();
            }
        }else{
            //window.open((typeof inZibbo != "undefined") ? "http://zibbo.com" : "http://a10.com"); // by jiazom
        }
    }else{
        //window.open("http://m.softgames.de");
        SG.redirectToPortal();
    }
}

function _fetchLogo(pos, parent, callback) {
    var logoData = GameAPI.Branding.getLogo();
    if(logoData.error){
        cc.log("API error: "+logoData.error);
        return;
    }
    if(!logoData.image) {
        cc.log("API does not return a logo image!");
        return;
    }
    var logoTexture = new Image();
    logoTexture.src = logoData.image;
    if(logoData.width == null){
        var strArr = logoData.image.split("_");
        var wh = strArr[strArr.length - 1];
        strArr = wh.split(".png");
        wh = strArr[0];
        strArr = wh.split("x");
        logoData.width = parseInt(strArr[0]);
        logoData.height = parseInt((strArr[1]));
    }
    logoTexture.width = logoData.width;
    logoTexture.height = logoData.height;
    var handler;
    logoTexture.addEventListener("load", handler = function() {
        var texture2d = new cc.Texture2D();
        texture2d.initWithElement(logoTexture);
        texture2d.handleLoadedTexture();
//        var logo = cc.Sprite.createWithTexture(texture2d);
        var logo = cc.Sprite.create(texture2d);
        logo.setScale(cc.CONTENT_SCALE_FACTOR());
        this.removeEventListener('load', handler, false);
        parent.addChild(logo, 9999999);
        logo.setAnchorPoint(0, 0);
        logo.setPosition(pos);
        if(callback) callback.apply(parent, [logo, logoData.action]);
        lg.inputManager.addListener(logo, function(){
            logoData.action();
        });
    });
}



var createLogo = function()
{
    var btn = cc.Sprite.create("a10/A10_200x62.png");
    btn.setScale(0.6);
    btn.setAnchorPoint(0, 0);
    btn.setPosition(0, 0);
    return btn;
}
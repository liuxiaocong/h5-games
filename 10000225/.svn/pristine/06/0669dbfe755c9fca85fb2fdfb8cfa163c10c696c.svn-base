/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        cc.EGLView.getInstance()._adjustSizeToBrowser();
        var screenSize = cc.EGLView.getInstance().getFrameSize();
        var resourceSize = cc.size(1480, 800);
        var designSize = cc.size(800, 500);

        var searchPaths = [];
        searchPaths.push("res");
        cc.FileUtils.getInstance().setSearchPaths(searchPaths);
        cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);
        cc.EGLView.getInstance().resizeWithBrowserSize(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        if(cc.Browser.isMobile){
            director.setAnimationInterval(1.0 / 50);

        }else{
            director.setAnimationInterval(1.0 / this.config['frameRate']);
        }
        initGame();
        return true;
    }
});
//测试用 注册场景管理。
function initGame()
{
//    var coinNum = 0;
    lg.registerScene("mainMenu", MyMenuScene, g_resources);
    lg.registerScene("levelSelect", MyGameScene);
    lg.registerScene("mainGame", MyScene);
//测试用，本处为入口。
    lg.startGame("mainMenu");
}

//cc.IS_SHOW_DEBUG_ON_PAGE = true;

var myApp = new cocos2dApp();
var lg = lg || {};
lg.objectPool = {Bee:[],Bee02:[],Bee03:[],Bee04:[],Bee05:[],Bug:[],Bug02:[],Bug03:[],Bug04:[],Bug05:[]};
lg.objectPool.release = function()
{
    this.Bee = [];
    this.Bee02 = [];
    this.Bee03 = [];
    this.Bee04 = [];
    this.Bee05 = [];
    this.Bug = [];
    this.Bug02 = [];
    this.Bug03 = [];
    this.Bug04 = [];
    this.Bug05 = [];
}
lg.objectPool.fetch = function(type)
{
    var pool = this[type];
    if(pool.length > 0) {
        var obj = pool.shift();
        obj.setVisible(true);
        return obj;
    }
    return lg.nameToObject(type).create();
}
lg.objectPool.recycle = function(obj)
{
    obj.setVisible(false);
    obj.stopAllActions();
    var pool = this[obj.cls];
    pool.push(obj);
}
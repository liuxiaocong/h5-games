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

var compress = false;
var a10Enabled = false;
var a10Remote = false;
var whiteBackground = false;
var backgroundColor = whiteBackground ? [255, 255, 255] : [0, 0, 0];
var logoSrc = a10Enabled ? "a10/a10_logo_3.png" : "logo.png";
var logoW = a10Enabled ? 289 : 289;
var logoH = a10Enabled ? 90 : 77;
var logoOnCenter = false;

if(a10Enabled) document.write('<script type="text/javascript" src="./js/game.js"></script>');

function startGame() {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:false,
        loadExtension:false,
        frameRate:30,
        renderMode:1,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'./cocos2d/',
        SingleEngineFile:'app.js',
        appFiles:[
            'src/Config.js',
            'src/Preloader.js',
            'src/resource.js',
            'src/Longame.js',
            'src/InputManager.js',
            'src/A10.js',
            'src/TowerBase.js',
            'src/Tower.js',
//            测试用
            'src/YellowTower.js',
            'src/Turret.js',
            'src/actorBee.js',
            'src/actorBug.js',
//            'src/Bug.js',
//            'src/Bug02.js',
//            'src/Bug03.js',
//            'src/Bee.js',
//            'src/Bee02.js',
//            'src/Bee03.js',
            'src/helpUtil.js',
            'src/newArrow.js',
            'src/skillBar.js',
            'src/effect.js',

            'src/Arrow.js',
            'src/myApp.js',
            'src/MenuScene.js',
            'src/GameScene.js',
            'src/score.js',
            'src/god.js'
        ]
    };

    if(compress) {
        delete  c.engineDir;
        c.appFiles = [];
    }else {
        delete c.SingleEngineFile;
    }

    if(!d.createElement('canvas').getContext){
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s,d.getElementById(c.tag));

        d.body.style.background = '#ffffff';
        return;
    };


//    window.addEventListener('DOMContentLoaded', function () {
//        this.removeEventListener('DOMContentLoaded', arguments.callee, false);
//        //first load engine file if specified
//        var s = d.createElement('script');

    //if(window.attachEvent){ window.attachEvent("onload",onLoaded); } else{ window.addEventListener("load",onLoaded,true); }
    //function onLoaded(){
        setTimeout(function(){
            language = SG.lang; //SG_Hooks.getLanguage(['en','de','es','fr','it','pt','ru','tr']);
            var s = d.createElement('script');
            /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
//            s.src = c.engineDir + 'jsloader.js';
            s.src = "src/jsloader.js";
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'myTemplate.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';

        if(a10Enabled) {
            try{
                GameAPI.loadAPI(function(API) {
                    console.log('A10 api loaded!');
                });
            }catch(err){
                console.log(err);
            }
        }
        //else if single file specified, load singlefile
    },0.1);

  //  }
}

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
(function () {
    var engine = [
        // Core
        'core/platform/CCClass.js',
        'core/cocoa/CCGeometry.js',
        'core/platform/Sys.js',
        'core/platform/CCConfig.js',
        'core/platform/miniFramework.js',
        'core/platform/CCCommon.js',
        'core/platform/CCMacro.js',
        'core/platform/CCFileUtils.js',
        'core/platform/CCTypes.js',
        'core/platform/CCEGLView.js',
        'core/platform/CCScreen.js',
        'core/platform/CCVisibleRect.js',
        'core/cocoa/CCAffineTransform.js',
        'core/support/CCPointExtension.js',
        'core/support/CCVertex.js',
        'core/support/TransformUtils.js',
        'core/base_nodes/CCNode.js',
        'core/base_nodes/CCAtlasNode.js',
        'core/textures/CCTexture2D.js',
        'core/textures/CCTextureCache.js',
        'core/textures/CCTextureAtlas.js',
        'core/scenes_nodes/CCScene.js',
        'core/layers_nodes/CCLayer.js',
        'core/sprite_nodes/CCSprite.js',
        'core/sprite_nodes/CCAnimation.js',
        'core/sprite_nodes/CCAnimationCache.js',
        'core/sprite_nodes/CCSpriteFrame.js',
        'core/sprite_nodes/CCSpriteFrameCache.js',
        'core/sprite_nodes/CCSpriteBatchNode.js',
        'core/CCConfiguration.js',
        'core/CCDirector.js',
        'core/CCCamera.js',
        'core/CCScheduler.js',
        'core/CCLoader.js',
        'core/CCDrawingPrimitives.js',
        'core/platform/CCApplication.js',
        'core/platform/CCSAXParser.js',
        'core/platform/AppControl.js',
        'core/labelTTF/CCLabelTTF.js',
        'core/CCActionManager.js',
        'kazmath/utility.js',
        'kazmath/vec2.js',
        'kazmath/vec3.js',
        'kazmath/vec4.js',
        'kazmath/ray2.js',
        'kazmath/mat3.js',
        'kazmath/mat4.js',
        'kazmath/plane.js',
        'kazmath/quaternion.js',
        'kazmath/aabb.js',
        'kazmath/GL/mat4stack.js',
        'kazmath/GL/matrix.js',
        'shaders/CCShaders.js',
        'shaders/CCShaderCache.js',
        'shaders/CCGLProgram.js',
        'shaders/CCGLStateCache.js',
        'render_texture/CCRenderTexture.js',
        'motion_streak/CCMotionStreak.js',
        'clipping_nodes/CCClippingNode.js',
        'effects/CCGrid.js',
        'effects/CCGrabber.js',
        'shape_nodes/CCDrawNode.js',
        'actions/CCAction.js',
        'actions/CCActionInterval.js',
        'actions/CCActionInstant.js',
        'actions/CCActionCamera.js',
        'actions/CCActionEase.js',
        'actions/CCActionCatmullRom.js',
        'actions/CCActionTween.js',
        'actions3d/CCActionGrid.js',
        'actions3d/CCActionGrid3D.js',
        'actions3d/CCActionTiledGrid.js',
        'actions3d/CCActionPageTurn3D.js',
        'progress_timer/CCProgressTimer.js',
        'progress_timer/CCActionProgressTimer.js',
        'transitions_nodes/CCTransition.js',
        'transitions_nodes/CCTransitionProgress.js',
        'transitions_nodes/CCTransitionPageTurn.js',
        'label_nodes/CCLabelAtlas.js',
        'label_nodes/CCLabelBMFont.js',
        'compress/ZipUtils.js',
        'compress/base64.js',
        'compress/gzip.js',
        'compress/zlib.min.js',
        'particle_nodes/CCPNGReader.js',
        'particle_nodes/CCTIFFReader.js',
        'particle_nodes/CCParticleSystem.js',
        'particle_nodes/CCParticleExamples.js',
        'particle_nodes/CCParticleBatchNode.js',
        'touch_dispatcher/CCTouchDelegateProtocol.js',
        'touch_dispatcher/CCTouchHandler.js',
        'touch_dispatcher/CCTouchDispatcher.js',
        'touch_dispatcher/CCMouseDispatcher.js',
        'keyboard_dispatcher/CCKeyboardDelegate.js',
        'keyboard_dispatcher/CCKeyboardDispatcher.js',
        'accelerometer/CCAccelerometer.js',
        'text_input_node/CCIMEDispatcher.js',
        'text_input_node/CCTextFieldTTF.js',
        'menu_nodes/CCMenuItem.js',
        'menu_nodes/CCMenu.js',
        'tileMap_nodes/CCTGAlib.js',
        'tileMap_nodes/CCTMXTiledMap.js',
        'tileMap_nodes/CCTMXXMLParser.js',
        'tileMap_nodes/CCTMXObjectGroup.js',
        'tileMap_nodes/CCTMXLayer.js',
        'parallax_nodes/CCParallaxNode.js',
        'audio/SimpleAudioEngine.js',

        // useless
        'CCUserDefault.js',
        'CCImage.js'

    ];

    var d = document;
    var c = d["ccConfig"];

    if (c.loadExtension != null && c.loadExtension == true) {
        engine = engine.concat([
            '../extensions/GUI/CCControlExtension/CCControl.js',
            '../extensions/GUI/CCControlExtension/CCControlButton.js',
            '../extensions/GUI/CCControlExtension/CCControlUtils.js',
            '../extensions/GUI/CCControlExtension/CCInvocation.js',
            '../extensions/GUI/CCControlExtension/CCScale9Sprite.js',
            '../extensions/GUI/CCControlExtension/CCMenuPassive.js',
            '../extensions/GUI/CCControlExtension/CCControlSaturationBrightnessPicker.js',
            '../extensions/GUI/CCControlExtension/CCControlHuePicker.js',
            '../extensions/GUI/CCControlExtension/CCControlColourPicker.js',
            '../extensions/GUI/CCControlExtension/CCControlSlider.js',
            '../extensions/GUI/CCControlExtension/CCControlSwitch.js',
            '../extensions/GUI/CCControlExtension/CCControlStepper.js',
            '../extensions/GUI/CCControlExtension/CCControlPotentiometer.js',
            '../extensions/GUI/CCScrollView/CCScrollView.js',
            '../extensions/GUI/CCScrollView/CCSorting.js',
            '../extensions/GUI/CCScrollView/CCTableView.js',
            '../extensions/CCBReader/CCNodeLoader.js',
            '../extensions/CCBReader/CCBReaderUtil.js',
            '../extensions/CCBReader/CCControlLoader.js',
            '../extensions/CCBReader/CCSpriteLoader.js',
            '../extensions/CCBReader/CCNodeLoaderLibrary.js',
            '../extensions/CCBReader/CCBReader.js',
            '../extensions/CCBReader/CCBValue.js',
            '../extensions/CCBReader/CCBKeyframe.js',
            '../extensions/CCBReader/CCBSequence.js',
            '../extensions/CCBReader/CCBRelativePositioning.js',
            '../extensions/CCBReader/CCBAnimationManager.js',
            '../extensions/CCEditBox/CCdomNode.js',
            '../extensions/CCEditBox/CCEditBox.js',

            '../extensions/CocoStudio/Components/CCComponent.js',
            '../extensions/CocoStudio/Components/CCComponentContainer.js',
            '../extensions/CocoStudio/CocoStudio.js',
            // CocoStudio Armature
            '../extensions/CocoStudio/Armature/utils/CCArmatureDefine.js',
            '../extensions/CocoStudio/Armature/utils/CCDataReaderHelper.js',
            '../extensions/CocoStudio/Armature/utils/CCSpriteFrameCacheHelper.js',
            '../extensions/CocoStudio/Armature/utils/CCTransformHelp.js',
            '../extensions/CocoStudio/Armature/utils/CCTweenFunction.js',
            '../extensions/CocoStudio/Armature/utils/CCUtilMath.js',
            '../extensions/CocoStudio/Armature/utils/CCArmatureDataManager.js',
            '../extensions/CocoStudio/Armature/datas/CCDatas.js',
            '../extensions/CocoStudio/Armature/display/CCDecorativeDisplay.js',
            '../extensions/CocoStudio/Armature/display/CCDisplayFactory.js',
            '../extensions/CocoStudio/Armature/display/CCDisplayManager.js',
            '../extensions/CocoStudio/Armature/display/CCSkin.js',
            '../extensions/CocoStudio/Armature/animation/CCProcessBase.js',
            '../extensions/CocoStudio/Armature/animation/CCArmatureAnimation.js',
            '../extensions/CocoStudio/Armature/animation/CCTween.js',
            '../extensions/CocoStudio/Armature/physics/CCColliderDetector.js',
            '../extensions/CocoStudio/Armature/CCArmature.js',
            '../extensions/CocoStudio/Armature/CCBone.js',
            // CocoStudio Action
            '../extensions/CocoStudio/Action/CCActionFrame.js',
            '../extensions/CocoStudio/Action/CCActionManager.js',
            '../extensions/CocoStudio/Action/CCActionNode.js',
            '../extensions/CocoStudio/Action/CCActionObject.js',
            // CocoStudio Components
            '../extensions/CocoStudio/Components/CCComAttribute.js',
            '../extensions/CocoStudio/Components/CCComAudio.js',
            '../extensions/CocoStudio/Components/CCComController.js',
            '../extensions/CocoStudio/Components/CCComRender.js',
            // CocoStudio Trigger
            '../extensions/CocoStudio/Trigger/ObjectFactory.js',
            '../extensions/CocoStudio/Trigger/TriggerBase.js',
            '../extensions/CocoStudio/Trigger/TriggerMng.js',
            '../extensions/CocoStudio/Trigger/TriggerObj.js',
            // CocoStudio GUI
            '../extensions/CocoStudio/GUI/BaseClasses/UIWidget.js',
            '../extensions/CocoStudio/GUI/Layouts/UILayout.js',
            '../extensions/CocoStudio/GUI/Layouts/UILayoutParameter.js',
            '../extensions/CocoStudio/GUI/Layouts/UILayoutDefine.js',
            '../extensions/CocoStudio/GUI/System/CocosGUI.js',
            '../extensions/CocoStudio/GUI/System/UIHelper.js',
            '../extensions/CocoStudio/GUI/System/UILayer.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UIButton.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UICheckBox.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UIImageView.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UILabel.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UILabelAtlas.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UILabelBMFont.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UILoadingBar.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UISlider.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UISwitch.js',
            '../extensions/CocoStudio/GUI/UIWidgets/UITextField.js',
            '../extensions/CocoStudio/GUI/UIWidgets/Compatible/CompatibleClasses.js',
            '../extensions/CocoStudio/GUI/UIWidgets/ScrollWidget/UIScrollView.js',
            '../extensions/CocoStudio/GUI/UIWidgets/ScrollWidget/UIListView.js',
            '../extensions/CocoStudio/GUI/UIWidgets/ScrollWidget/UIPageView.js',
            '../extensions/CocoStudio/Reader/GUIReader.js',
            '../extensions/CocoStudio/Reader/SceneReader.js'

        ]);
    }

    if (c.loadPluginx != null && c.loadPluginx == true) {
        engine = engine.concat([
            //protocols
            '../extensions/PluginX/protocols/Config.js',
            '../extensions/PluginX/protocols/PluginUtils.js',
            '../extensions/PluginX/protocols/PluginProtocol.js',
            '../extensions/PluginX/protocols/ProtocolSocial.js',
            //'../extensions/PluginX/protocols/ProtocolAds.js',
            //'../extensions/PluginX/protocols/ProtocolAnalytics.js',
            //'../extensions/PluginX/protocols/ProtocolIAP.js',
            '../extensions/PluginX/protocols/PluginFactory.js',
            '../extensions/PluginX/protocols/PluginManager.js',

            //plugins
            '../extensions/PluginX/plugins/SocialWeibo.js',
            '../extensions/PluginX/plugins/SocialQQWeibo.js',
            '../extensions/PluginX/plugins/SocialQzone.js',
            '../extensions/PluginX/plugins/SocialTwitter.js',
            '../extensions/PluginX/plugins/SocialFacebook.js'
            //'../extensions/PluginX/plugins/AdsGoogle.js'
        ]);
    }

    if (!c.engineDir) {
        engine = [];
    }
    else {
        if(c.box2d || c.chipmunk){
            engine.push('physics_nodes/CCPhysicsSprite.js');
            engine.push('physics_nodes/CCPhysicsDebugNode.js');
            if (c.box2d === true)
                engine.push('../external/box2d/box2d.js');
            if (c.chipmunk === true)
                engine.push('../external/chipmunk/chipmunk.js');
        }
        engine.forEach(function (e, i) {
            engine[i] = c.engineDir + e;
        });
    }
    if (typeof c.box2d === "string") {
        engine.push(c.box2d);
    }
    if (typeof c.chipmunk === "string") {
        engine.push(c.chipmunk);
    }

    var loadJsImg = document.getElementById("cocos2d_loadJsImg");
    if(!loadJsImg){
        loadJsImg = document.createElement('img');
        if(!whiteBackground)
            console.log('no image will be released')
//            loadJsImg.src = "data:image/gif;base64,R0lGODlhEAAQALMNAD8/P7+/vyoqKlVVVX9/fxUVFUBAQGBgYMDAwC8vL5CQkP///wAAAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAANACwAAAAAEAAQAAAEO5DJSau9OOvNex0IMnDIsiCkiW6g6BmKYlBFkhSUEgQKlQCARG6nEBwOgl+QApMdCIRD7YZ5RjlGpCUCACH5BAUAAA0ALAAAAgAOAA4AAAQ6kLGB0JA4M7QW0hrngRllkYyhKAYqKUGguAws0ypLS8JxCLQDgXAIDg+FRKIA6v0SAECCBpXSkstMBAAh+QQFAAANACwAAAAACgAQAAAEOJDJORAac6K1kDSKYmydpASBUl0mqmRfaGTCcQgwcxDEke+9XO2WkxQSiUIuAQAkls0n7JgsWq8RACH5BAUAAA0ALAAAAAAOAA4AAAQ6kMlplDIzTxWC0oxwHALnDQgySAdBHNWFLAvCukc215JIZihVIZEogDIJACBxnCSXTcmwGK1ar1hrBAAh+QQFAAANACwAAAAAEAAKAAAEN5DJKc4RM+tDyNFTkSQF5xmKYmQJACTVpQSBwrpJNteZSGYoFWjIGCAQA2IGsVgglBOmEyoxIiMAIfkEBQAADQAsAgAAAA4ADgAABDmQSVZSKjPPBEDSGucJxyGA1XUQxAFma/tOpDlnhqIYN6MEAUXvF+zldrMBAjHoIRYLhBMqvSmZkggAIfkEBQAADQAsBgAAAAoAEAAABDeQyUmrnSWlYhMASfeFVbZdjHAcgnUQxOHCcqWylKEohqUEAYVkgEAMfkEJYrFA6HhKJsJCNFoiACH5BAUAAA0ALAIAAgAOAA4AAAQ3kMlJq704611SKloCAEk4lln3DQgyUMJxCBKyLAh1EMRR3wiDQmHY9SQslyIQUMRmlmVTIyRaIgA7";
//            loadJsImg.src = "data:image/gif;base64,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";

        else loadJsImg.src = "res/loading1.gif";
        var canvasNode = document.getElementById(c.tag);
//        canvasNode.style.backgroundColor = "black";
        canvasNode.parentNode.appendChild(loadJsImg);

//        var canvasStyle = getComputedStyle?getComputedStyle(canvasNode):canvasNode.currentStyle;
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
//获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
//        loadJsImg.style.left = canvasNode.offsetLeft + (parseFloat(canvasStyle.width))/2 + "px";
//        loadJsImg.style.top = canvasNode.offsetTop + (parseFloat(canvasStyle.height))/2 + "px";
//        alert(loadJsImg.style.left+"  aaa   "+loadJsImg.style.top);
//        alert(winWidth+"   vvvv   "+winHeight)
        loadJsImg.style.left=winWidth/3+"px";
        loadJsImg.style.top =winHeight/3+"px";
            loadJsImg.style.position = "absolute";
    }

    var updateLoading = function(p){
        if(p>=1) {
            loadJsImg.parentNode.removeChild(loadJsImg);
        }
    };

    var loaded = 0;
    var que = engine.concat(c.appFiles);
    que.push('main.js');


    var loadHandlerIE = function (loaded){
        loadNext();
        updateLoading(loaded / que.length);
        this.removeEventListener('load', loadHandlerIE, false);
    };
    var loadNext = function () {
        i++;
        if (i < que.length) {
            var f = d.createElement('script');
            f.src = que[i];
            f.addEventListener('load', loadHandlerIE.bind(f, loaded), false);
            d.body.appendChild(f);
        }
        updateLoading(i / (que.length - 1));
    };
    var loadHandler = function (){
        loaded++;
        updateLoading(loaded / que.length);
        this.removeEventListener('load', loadHandler, false);
    };

    if (navigator.userAgent.indexOf("Trident/5") > -1) {
        //ie9
        var i = -1;

        loadNext();
    }
    else {
        que.forEach(function (f, i) {
            var s = d.createElement('script');
            s.async = false;
            s.src = f;
            s.addEventListener('load', loadHandler, false);
            d.body.appendChild(s);
        });
    }
})();

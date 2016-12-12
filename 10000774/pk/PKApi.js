/**!
 * 本文件对PK App 通过javascript 提供的功能进行了封装。
 * 使用方法：直接嵌入html5 页面，并注册相关的事件。
 * 主要功能有：
 * · 注册分享时的回调，定制要分享的数据。
 * · 触发PK App 执行分享动作。
 * · 触发PK App 执行收藏动作。
 * · 向PK App 汇报（保存）当前游戏状态。
 * · 向PK App 请求以前保存的游戏状态。
 *
 * 注意：所有功能都要在API 准备好以后才能进行，因此建议放到 onReady 回调里。
 * 
 * @author Ken
 */
var PKApi = (function () {

    "use strict";

		var isXwalk = navigator.userAgent.match(/Crosswalk/i);

    /**
     * 注册分享相关的回调
     * @param       {Object}    callbacks  相关回调方法，包括：
     * @p-config    {Function}  prepare(dataToShare) 准备数据，在这里可以自定义要分享的数据。dataToShare 对象里包含一个名为desc 的字符串和一个名为link 的URL，供自定义。
     * @p-config    {Function}  onCancelled(resp)    用户取消，resp 参数里有相关的错误信息等，下同
     * @p-config    {Function}  onFailed(resp)      分享失败
     * @p-config    {Function}  onSucceeded(resp)   分享成功
     * @p-config    {Function}  afterall(resp)      无论成功失败都会执行的回调
     */
    function pkRegisterShare(callbacks) {
        callbacks = callbacks || {};
        var _bridge = isXwalk? PKXwalkBridge : PKJSBridge;
        var _callShare = function (dataToShare) {
            _bridge.invoke('pkShare', dataToShare, function (resp) {
                switch (resp.err_msg) {
                    case 'pkshare:cancelled':
                        callbacks.onCancelled && callbacks.onCancelled(resp);
                        break;
                    case 'pkshare:succeeded':
                        callbacks.onSucceeded && callbacks.onSucceeded(resp);
                        break;
                    case 'pkshare:failed':
                    default:
                        callbacks.onFailed && callbacks.onFailed(resp);
                        break;
                }
                // 无论成功失败都会执行的回调
                callbacks.afterall && callbacks.afterall(resp);
            });
        };
        // 注册PK App 里的 menu->share 点击事件
        _bridge.on('menu:share', function (dataToShare) {
            // 用户点击了menu->share, 此时html5 页面可将要分享的数据填充在dataToShare 对象里
            callbacks.prepare && callbacks.prepare(dataToShare);
            _callShare(dataToShare);
        });
    }
    
    /**
     * 触发PK App 执行分享动作
     */
    function pkShare() {
    	var _bridge = isXwalk? PKXwalkBridge : PKJSBridge;
    	_bridge.call('startPKShare');
    }
    
    /**
     * 触发PK App 执行收藏动作
     */
    function pkAddFavorite() {
    	var _bridge = isXwalk? PKXwalkBridge : PKJSBridge;
    	_bridge.call('startPKAddFavorite');
    }

		/**
		 * 向PK App 汇报（保存）当前游戏状态
		 */
		function pkSaveGameStatus(gameStatus) {
			var _bridge = isXwalk? PKXwalkBridge : PKJSBridge;
			_bridge.call('saveGameStatus', gameStatus);
		}
		
		/**
		 * 向PK App 请求以前保存的游戏状态
		 * @param		{Function}	callback(gameStatus)	gameStatus 为上一次调用saveGameStatus 函数传进来的参数。如果尚未保存过，返回空字符串''。
		 */
		function pkLoadGameStatus(callback) {
			var _bridge = isXwalk? PKXwalkBridge : PKJSBridge;
			_bridge.invoke('loadGameStatus', '', callback);
		}


    /**
     * 当API 准备好后执行，使用方法：
     * PKApi.ready(function(Api){
     *     // 参数中的Api，即是PKApi 对象
     * });
     * @param readyCallback
     */
    function onPKJsBridgeReady(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            var Api = this;
            var pkReadyFunc = function () {
                readyCallback(Api);
            };
            if (isXwalk) {
            	if (PKXwalkBridge.isready()) {
            		pkReadyFunc();
            	} else {
            		PKXwalkBridge.on('PKJSBridgeReady', pkReadyFunc);
            	}
            } else if (typeof window.PKJSBridge == "undefined"){
                if (document.addEventListener) {
                    document.addEventListener('PKJSBridgeReady', pkReadyFunc, false);
                } else if (document.attachEvent) {
                    document.attachEvent('PKJSBridgeReady', pkReadyFunc);
                    document.attachEvent('onPKJSBridgeReady', pkReadyFunc);
                }
            }else{
                pkReadyFunc();
            }
        }
    }
    
    /**
     * 注册一个回调，当PK 游戏页面离开屏幕的时候回调
     */
    function onPKJsSysPause(pauseCallback) {
    	var _bridge = isXwalk? PKXwalkBridge : PKJSBridge;
    	_bridge.on('sys:onpause', pauseCallback);
    }
    
    /**
     * 注册一个回调，当PK 游戏页面重新回到屏幕的时候回调
     */
    function onPKJsSysResume(resumeCallback) {
    	var _bridge = isXwalk? PKXwalkBridge : PKJSBridge;
    	_bridge.on('sys:onresume', resumeCallback);
    }

    return {
        version         :"1.0",
        onReady         :onPKJsBridgeReady,
        registerShare		:pkRegisterShare,
        share						:pkShare,
        addFavorite			:pkAddFavorite,
        saveGameStatus	:pkSaveGameStatus,
        loadGameStatus	:pkLoadGameStatus,
        registerOnPause	:onPKJsSysPause,
        registerOnResume:onPKJsSysResume
    };
})();
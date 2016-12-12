// 微信分享的数据
var pkGame = (function() {
    "use strict";

    var _Callbacks = {
        ready: function() {
            //alert("开始分享");
        },
        cancel: function(resp) {
            //alert("分享被取消，msg=" + resp.err_msg);
        },
        fail: function(resp) {
            ///alert("分享失败，msg=" + resp.err_msg);
        },
        confirm: function(resp) {
            //alert("分享成功，msg=" + resp.err_msg);
        },
        all: function(resp, argv) {
            //alert("分享结束，msg=" + resp.err_msg);
        }
    };

    var _pkGameInfo = {
        "appId": '',
        "imgUrl": '',
        "link": '',
        "desc": '',
        "title": '',
        "result_original": '',
        "result_int": '',
        "result_desc": '',
        "result_short_desc": '',
        "extension": {},
        "status": ''
    };

    //When WeiXin or PK Ready
    function pkGameReady(callbackfunc) {
        //read config file to load link and imgUrl
        var reader = new XMLHttpRequest();
        reader.open('get', 'config.json', false);
        reader.onreadystatechange = function() {
            if (reader.readyState == 4) {
                try {
                    var obj = JSON.parse(reader.responseText);
                    _pkGameInfo.link = obj.link;
                    _pkGameInfo.imgUrl = obj.imgUrl;
                    _pkGameInfo.desc = obj.desc;
                } catch (e) {

                }
            }
        };
        reader.send();

        WeixinApi.ready(function(api) {
            pkGame.platform = WeixinApi;

            //Share game to friend
            api.shareToFriend(pkGame.gameInfo, {
                ready: function() {
                    //alert("开始分享");
                },
                cancel: function(resp) {
                    //alert("分享被取消，msg=" + resp.err_msg);
                },
                fail: function(resp) {
                    //alert("分享失败，msg=" + resp.err_msg);
                },
                confirm: function(resp) {
                    //alert("分享成功，msg=" + resp.err_msg);
                },
                all: function(resp, argv) {
                    //alert("分享结束，msg=" + resp.err_msg);
                }
            });

            //Share game on moments
            api.shareToTimeline(pkGame.gameInfo, {
                ready: function() {
                    //alert("开始分享");
                },
                cancel: function(resp) {
                    //alert("分享被取消，msg=" + resp.err_msg);
                },
                fail: function(resp) {
                    ///alert("分享失败，msg=" + resp.err_msg);
                },
                confirm: function(resp) {
                    //alert("分享成功，msg=" + resp.err_msg);
                },
                all: function(resp, argv) {
                    //alert("分享结束，msg=" + resp.err_msg);
                }
            });

            callbackfunc();
        });
        PkApi.onReady(function(api) {
            pkGame.platform = PkApi;

            //Share game
            api.registerShare({
                // 准备数据
                prepare: function(dataToShare) {
                    dataToShare = pkGame.gameInfo;
                },
                // 分享被用户自动取消
                onCancelled: function(resp) {
                    //alert("分享被取消，msg=" + resp.err_msg);
                },
                // 分享失败了
                onFailed: function(resp) {
                    //alert("分享失败，msg=" + resp.err_msg);
                },
                // 分享成功
                onSucceeded: function(resp) {
                    //alert("分享成功，msg=" + resp.err_msg);
                },
                // 整个分享过程结束，成功不成功都会回调
                afterall: function(resp, argv) {
                    //alert("分享结束，msg=" + resp.err_msg);
                }
            });

            callbackfunc();
        });

    }

    //Set Result Information
    function pkSetResult(org, res, desc, short_desc) {
        _pkGameInfo.desc = desc;
        if (pkGame.platform === PkApi) {
            _pkGameInfo.result_original = org;
            _pkGameInfo.result_desc = desc;
            _pkGameInfo.result_int = res;
            _pkGameInfo.result_short_desc = short_desc;
            _pkGameInfo.status = 'score';
            pkGame.platform.saveGameStatus(pkGame.gameInfo);
        }
    }

    //Report Game Status
    function pkReportStatus(status) {
        _pkGameInfo.status = status;

        if (pkGame.platform === PkApi)
            pkGame.platform.saveGameStatus(pkGame.gameInfo);
    }

    //Add Favorite
    function pkAddFavorite() {
        if (pkGame.platform === PkApi) {
            pkGame.platform.addFavorite(gameInfo);
        }
    }

    return {
        ready: pkGameReady,
        gameInfo: _pkGameInfo,
        gameStatus: {
            "title": '',
            "status": ''
        },
        platform: {},
        updateResult: pkSetResult,
        addFavourite: pkAddFavorite,
        reportStatus: pkReportStatus
    };
})();

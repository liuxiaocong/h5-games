﻿// 微信分享的数据
var pkGame = (function() {
    "use strict";

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
        reader.open('get', 'pk_config/pk_config.json', false);

        reader.onreadystatechange = function() {
            if (reader.readyState == 4) {
                try {
                    var obj = JSON.parse(reader.responseText);
                    _pkGameInfo.link = obj.link;
                    _pkGameInfo.imgUrl = obj.imgUrl;
                    _pkGameInfo.title = obj.title;
                    _pkGameInfo.desc = obj.desc;
                } catch (e) {
                    _pkGameInfo.link = 'http://www.pkleyo.com';
                    _pkGameInfo.imgUrl = 'http://www.pkleyo.com/logo.png';
                    _pkGameInfo.title = 'PK乐游';
                    _pkGameInfo.desc = '';
                }
            }
        };
        reader.send();

        //on non-pk platform display pk ad
        if (navigator.userAgent.indexOf('PK') == -1) {
            var pkbanner = window.setTimeout(function(){
                if(document.body)
                {
                    document.body.innerHTML += '<style type="text/css">.pkIdentity{position:fixed;bottom:0;background-color:white;left:0;text-align:center;z-index:9999999;padding-top:10px;padding-bottom:10px;width:100%;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";filter:alpha(opacity=70);-moz-opacity:0.7;-khtml-opacity:0.7;opacity:0.7;-webkit-transition:margin-bottom 2s ease-out;-moz-transition:margin-bottom 2s 2s ease-out;-o-transition:margin-bottom 2s ease-out;transition:margin-bottom 2s ease-out}.pkHide{margin-bottom:-150px}</style>';
                    document.body.innerHTML += '<div class="pkIdentity"id="pkIdentity"><a href="http://www.pkleyo.com"><svg version="1.1"id="Layer_1"xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"x="0px"y="0px"width="307.787px"height="61.002px"viewBox="0 0 307.787 61.002"enable-background="new 0 0 307.787 61.002"xml:space="preserve"><g><g><path fill-rule="evenodd"clip-rule="evenodd"fill="#14D149"d="M27.216,26.43l-1.4-1.288l-8.036,8.596v-8.96h-1.904v19.628 h1.904v-8.876l8.372,9.296l1.456-1.288l-8.064-8.932L27.216,26.43z M50.85,34.316h-9.073v-5.568h-1.632v5.568h-6.84 c-0.528,0-0.936-0.408-0.936-0.937v-5.185c0-0.552,0.408-0.96,0.936-0.96l16.921-0.432l-0.048-1.656L33.28,25.604 c-1.417,0.023-2.568,1.2-2.568,2.592v5.185c0,1.416,1.176,2.568,2.592,2.568h6.84v6.696c0,0.769-0.6,1.393-1.392,1.393h-1.8v1.632 h1.8c1.656,0,3.024-1.368,3.024-3.024v-6.696h9.073V34.316z M63.017,24.403h-1.632v2.185h-3.12v1.632h1.248v3.456 c0,5.041-0.576,9.938-1.68,14.209l1.584,0.385c1.008-3.841,1.584-8.186,1.704-12.697h2.137c0.504,0,0.912,0.432,0.912,0.96v9.049 c0,0.504-0.408,0.937-0.912,0.937h-1.368v1.632h1.368c1.416,0,2.544-1.128,2.544-2.568v-9.049c0-1.416-1.128-2.592-2.544-2.592 h-2.112V28.22h5.04v-1.632h-3.168V24.403z M46.577,38.396l3.168,7.272l1.512-0.647l-3.168-7.297L46.577,38.396z M29.752,44.829 l1.272,1.032c1.56-1.969,2.64-4.561,3.456-7.585l-1.584-0.432C32.104,40.677,31.12,43.101,29.752,44.829z M56.68,37.94 l-3.121,7.561l1.488,0.624l3.144-7.585L56.68,37.94z M259.787,29.468h-3.815v-1.776h-1.632v1.776h-10.105v-1.776h-1.632v1.776 h-3.769V31.1h20.953V29.468z M258.972,25.388h-8.856v-1.152h-1.633v1.152h-8.856v1.632h19.346V25.388z M9.716,25.281 c-1.064-0.532-2.352-0.729-3.696-0.729c-0.952,0-2.044,0.084-3.108,0.168c-0.616,0.057-1.232,0.112-1.848,0.141H0v19.292h1.904 V36.51c0.196,0,0.42,0.027,0.672,0.027c0.784,0.028,1.624,0.084,2.436,0.084c1.68,0,3.5-0.252,4.816-0.979 c1.68-1.064,2.576-3.08,2.576-5.04C12.404,28.445,11.34,26.233,9.716,25.281z M8.848,33.989c-0.98,0.588-2.408,0.728-3.836,0.728 c-0.756,0-1.596-0.056-2.324-0.084c-0.28,0-0.532-0.027-0.784-0.027v-7.868l1.176-0.112c1.036-0.084,1.988-0.168,2.94-0.168 c1.064,0,2.016,0.112,2.772,0.532c1.092,0.56,1.708,2.044,1.708,3.612C10.5,31.945,9.968,33.317,8.848,33.989z M263.65,38.564 c2.208-1.2,3.936-2.496,5.352-4.008h7.297l6.312,4.08l0.889-1.368l-4.225-2.712h4.152v-1.633h-13.105 c0.433-0.576,0.816-1.176,1.152-1.824h11.594v-1.632h-10.777c0.24-0.552,0.479-1.152,0.72-1.776h10.417V26.06h-9.889l0.359-1.176 l-1.584-0.433l-0.504,1.608h-8.832v1.632h8.256c-0.24,0.624-0.504,1.225-0.768,1.776h-7.152V31.1h6.24 c-0.408,0.648-0.84,1.248-1.32,1.824h-5.256v1.633h3.648c-1.08,0.936-2.329,1.8-3.793,2.592L263.65,38.564z M56.992,31.436H55.36 v4.561h1.632V31.436z M218.41,24.571h-1.632v4.296h1.632V24.571z M56.992,24.739H55.36V29.3h1.632V24.739z M218.771,43.677V33.188 c0-1.439-1.152-2.567-2.544-2.567h-1.656v1.632h1.656c0.504,0,0.912,0.408,0.912,0.936v10.489c0,1.417,1.127,2.544,2.568,2.544 h1.344v-1.632h-1.344C219.202,44.589,218.771,44.181,218.771,43.677z M258.107,37.316v-2.641c0-1.439-1.176-2.567-2.592-2.567 h-12.457c-1.416,0-2.568,1.128-2.568,2.567v2.641c0,1.393,1.152,2.568,2.568,2.568h12.457 C256.932,39.885,258.107,38.709,258.107,37.316z M256.476,37.316c0,0.528-0.433,0.936-0.96,0.936h-12.457 c-0.528,0-0.937-0.407-0.937-0.936v-0.504h14.354V37.316z M256.476,35.181h-14.354v-0.505c0-0.504,0.408-0.936,0.937-0.936h12.457 c0.527,0,0.96,0.432,0.96,0.936V35.181z M249.803,40.365v2.928h1.633v-2.928H249.803z M245.963,43.581v-3.216h-1.633v3.216 c0,1.248,0.937,2.616,2.688,2.616h7.993v-1.632h-7.993C246.322,44.565,245.963,44.037,245.963,43.581z M255.924,40.869l2.496,5.4 l1.488-0.648l-2.496-5.424L255.924,40.869z M75.426,26.42h-6.529l0.528-1.488l-1.536-0.528l-1.272,3.648h8.809V26.42z M274.02,40.125h8.28v-1.633h-8.28v-2.063h-1.633v2.063h-8.305v1.633h8.305v2.376h-10.033v1.632h10.033v2.112h1.633v-2.112h10.008 v-1.632H274.02V40.125z M238.498,45.357l1.368,0.936c1.08-1.607,1.92-3.432,2.304-5.641l-1.584-0.287 C240.227,42.261,239.482,43.893,238.498,45.357z M295.955,43.725V31.436h10.992v-1.632h-10.992v-4.944h-1.656v18.865h-7.705v1.633 h21.193v-1.633H295.955z M75.018,29.972h-7.777v1.632h5.856c-0.36,1.704-0.96,3.312-1.848,4.873h-4.392v1.632h4.176v5.377 c0,0.6-0.48,1.104-1.104,1.104h-2.016v1.632h2.016c1.512,0,2.736-1.247,2.736-2.735v-5.377h2.784v-1.632h-2.353 C73.985,34.676,74.609,32.516,75.018,29.972z M132.447,9.354c-1.893,0-3.427,1.527-3.427,3.411c0,1.883,1.534,3.41,3.427,3.41 s3.428-1.527,3.428-3.41C135.875,10.882,134.34,9.354,132.447,9.354z M162.053,0h-30.613c-10.322,0-19.175,5.493-22.939,13.315 c-0.077,0.152-0.167,0.293-0.241,0.448c-4.25,8.98-11.131,42.501-2.037,46.697c5.787,2.67,16.645-7.179,24.875-17.009 c0.114,0.002,0.228,0.008,0.342,0.008h30.613c0.088,0,0.175-0.005,0.263-0.006c8.238,9.861,19.147,19.783,24.954,17.104 c8.925-4.118,2.465-36.467-1.796-46.155C182.031,6.007,172.847,0,162.053,0z M162.175,41.121H131.12 c-12.256,0-22.191-8.682-22.191-19.391c0-10.71,9.935-19.392,22.191-19.392h31.055c12.256,0,22.191,8.682,22.191,19.392 C184.366,32.439,174.431,41.121,162.175,41.121z M161.242,9.354c-1.893,0-3.428,1.527-3.428,3.411c0,1.883,1.535,3.41,3.428,3.41 s3.428-1.527,3.428-3.41C164.67,10.882,163.135,9.354,161.242,9.354z M235.668,32.348l-1.584-0.407 c-0.433,1.584-0.961,3.12-1.584,4.56c-0.48-2.424-0.816-5.16-1.009-8.305h1.513c1.392,0,2.52-1.128,2.544-2.544v-0.768h-1.632 v0.72c-0.024,0.528-0.408,0.96-0.912,0.96h-1.584c-0.024-0.6-0.072-1.224-0.072-1.872l-1.633,0.048 c0,0.624,0.024,1.225,0.049,1.824l-5.113-0.023c-1.632,0-2.928,1.344-2.976,2.976l-0.337,16.682l1.633,0.023l0.264-13.729h2.904 c0.528,0,0.961,0.432,0.961,0.96v9.625c0,0.528-0.433,0.936-0.961,0.936h-1.271v1.633h1.271c1.44,0,2.593-1.152,2.593-2.568 v-9.625c0-1.416-1.152-2.592-2.593-2.592h-2.855l0.023-1.297c0.023-0.768,0.6-1.392,1.344-1.392l5.209,0.023 c0.24,4.129,0.744,7.609,1.488,10.585c-0.672,1.177-1.44,2.209-2.28,3.024l1.151,1.152c0.601-0.601,1.177-1.296,1.705-2.064 c0.695,2.208,1.56,4.057,2.544,5.665l1.368-0.889c-1.129-1.776-2.041-3.984-2.76-6.672 C234.156,37.004,235.044,34.725,235.668,32.348z M154.034,16.761c-0.87,0-1.576,0.698-1.576,1.559 c0,3.121-2.557,5.651-5.712,5.651s-5.712-2.53-5.712-5.651c0-0.86-0.706-1.559-1.576-1.559s-1.576,0.698-1.576,1.559 c0,4.844,3.968,8.771,8.863,8.771s8.863-3.927,8.863-8.771C155.609,17.459,154.904,16.761,154.034,16.761z"/></g></g></svg></a></div>';
                    setTimeout(function() {
                        var btn = document.getElementById("pkIdentity");
                        btn.className = btn.className + " pkHide";
                    }, 2000);
                    clearTimeout(pkbanner);
                    pkbanner = null;
                }
            },100)

        }

        WeixinApi.ready(function(api) {
            pkGame.platform = WeixinApi;

            //Share game to friend
            api.shareToFriend(pkGame.gameInfo, {
                ready: function() {},
                cancel: function(resp) {},
                fail: function(resp) {},
                confirm: function(resp) {},
                all: function(resp, argv) {}
            });

            //Share game on moments
            api.shareToTimeline(pkGame.gameInfo, {
                ready: function() {},
                cancel: function(resp) {},
                fail: function(resp) {},
                confirm: function(resp) {},
                all: function(resp, argv) {}
            });

            callbackfunc();
        });

        PkApi.onReady(function(api) {
            pkGame.platform = PkApi;

            //Share game
            api.registerShare({
                // 准备数据
                prepare: function(dataToShare) {
                    dataToShare.desc = pkGame.gameInfo.desc;
                },
                // 分享被用户自动取消
                onCancelled: function(resp) {},
                // 分享失败了
                onFailed: function(resp) {},
                // 分享成功
                onSucceeded: function(resp) {},
                // 整个分享过程结束，成功不成功都会回调
                afterall: function(resp, argv) {}
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
            _pkGameInfo.status = 'end';
            pkGame.platform.saveGameStatus(pkGame.gameInfo);
        }
    }

    //Report Game Status
    function pkReportStatus(status) {
        _pkGameInfo.status = status;
        _pkGameInfo.result_original = '';
        if (pkGame.platform === PkApi) {
            pkGame.platform.saveGameStatus(pkGame.gameInfo);
        }
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

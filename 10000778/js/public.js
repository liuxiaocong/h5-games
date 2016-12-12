var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F376c041c7776d68a45a87960f3e9db74' type='text/javascript'%3E%3C/script%3E"));
//本地注销下行 verify hostname
var hostTest = new RegExp(/4399/i);
if (!hostTest.test(window.location.hostname)) location.hostname = window.location.hostname;
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('require', 'linker');
ga('linker:autoLink', ['www.bangbangu.com']);
ga('create', 'UA-54001294-1', 'auto', {
    'allowLinker': true
});
ga('send', 'pageview');

(function() {
    var ie = !!(window.attachEvent && !window.opera),
        wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [],
        run = function() {
            for (var i = 0; i < fn.length; i++) fn[i]();
        },
        d = document;
    d.ready = function(f) {
        if (!ie && !wk && d.addEventListener) {
            return d.addEventListener('DOMContentLoaded', f, false);
        }
        if (fn.push(f) > 1) return;
        if (ie)(function() {
            try {
                d.documentElement.doScroll('left');
                run();
            } catch (err) {
                setTimeout(arguments.callee, 0);
            }
        })();
        else if (wk) var t = setInterval(function() {
            if (/^(loaded|complete)$/.test(d.readyState)) clearInterval(t), run();
        }, 0);
    };
})();


function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return prePath;
}

var DDL_CONFIG = {
        root_url: "http://www.bangbangu.com",
        follow_url: "http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=200534205&idx=1&sn=bb86d0db54d0aa61857a2f5720bb9f70&scene=1#rd",
        social_url: "http://wsq.qq.com/reflow/262979949",
        redirect_url: "http://www.bangbangu.com", //'http://mp.weixin.qq.com/s?__biz=MzA3MDQzNzIwNQ==&mid=200534205&idx=1&sn=bb86d0db54d0aa61857a2f5720bb9f70#rd';

        redirect_array: [
            //"oliverqueen.duapp.com",
            //"johndiggle.duapp.com",
            //"dinahlaurellance.duapp.com",
            //"saralance.duapp.com",
            //"tommymerlyn.duapp.com",
            //"theaqueen.duapp.com",
            //"royharper.duapp.com",
            //"moiraqueen.duapp.com",
            "oliverqueen.aliapp.com",
            "johndiggle.aliapp.com",
            "dinahlaurellance.aliapp.com",
            "saralance.aliapp.com"
        ],
    }
    // alert(getRootPath());

var dynamicLoading = {
    css: function(path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function(path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}

// dynamicLoading.css(getRootPath()+"/css/public.css");
// dynamicLoading.js(getRootPath()+"/js/analyse.js");
// dynamicLoading.js(getRootPath()+"/js/config.js");

function DDL_CORE() {}

DDL_CORE.showShare = function() {
    var $cover = $('<div id="share_cover">').append(
        $('<img>').css({
            width: '100%',
            position: 'fixed',
            zIndex: 999,
            top: 0,
            left: 0
        }).attr({
            src: getRootPath() + "/image/share.png"
        }).bind('touchstart', function() {
            $cover.remove();
        })
    );
    $('body').append($cover);
}

// DDL_CORE.prototype = {
// 	// .css("display", "none")
// 	showShare : function() {
// 		var $cover = $('<div id="share_cover">').append(
// 			$('<img>').css({
// 				width : '100%',
// 				position : 'fixed',
// 				zIndex : 999,
// 				top : 0,
// 				left : 0
// 			}).attr({
// 				src : "../../image/share.png"
// 			}).bind('touchstart', function(){
// 				$cover.remove();
// 			})
// 		);
// 		$('body').append($cover);
// 	},
// }

function _attachEvent(obj, evt, func, eventobj) {
    eventobj = !eventobj ? obj : eventobj;
    if (obj.addEventListener) {
        obj.addEventListener(evt, func, false);
    } else if (eventobj.attachEvent) {
        obj.attachEvent('on' + evt, func);
    }
}

function _detachEvent(obj, evt, func, eventobj) {
    eventobj = !eventobj ? obj : eventobj;
    if (obj.removeEventListener) {
        obj.removeEventListener(evt, func, false);
    } else if (eventobj.detachEvent) {
        obj.detachEvent('on' + evt, func);
    }
}

var DDL_COM = {
    BODY: "",
    TOOLBAR: ""
};

var DDL_CORE = {
    /*render*/
    ui: {
        renderToolbar: function(_DDL_body) {
            var _DDL_toolbar = document.createElement("div");
            _DDL_toolbar.id = "DDL_toolbar";

            var _DDL_toolbar_wrapper = document.createElement("ul");
            var _DDL_toolbar_home = document.createElement("li");
            _DDL_toolbar_home.className = "DDL_toolbar_button";
            var _DDL_toolbar_home_inner = document.createElement("div");
            _DDL_toolbar_home_inner.id = "home_button";
            _DDL_toolbar_home_inner.className = "DDL_toolbar_button_inner";
            _DDL_toolbar_home_inner.innerHTML = "更多游戏";
            _DDL_toolbar_home.appendChild(_DDL_toolbar_home_inner);

            var _DDL_toolbar_follow = document.createElement("li");
            _DDL_toolbar_follow.className = "DDL_toolbar_button";
            var _DDL_toolbar_follow_inner = document.createElement("div");
            _DDL_toolbar_follow_inner.id = "follow_button";
            _DDL_toolbar_follow_inner.className = "DDL_toolbar_button_inner";
            _DDL_toolbar_follow_inner.innerHTML = "关注我们"
            _DDL_toolbar_follow.appendChild(_DDL_toolbar_follow_inner);

            var _DDL_toolbar_social = document.createElement("li");
            _DDL_toolbar_social.className = "DDL_toolbar_button";
            var _DDL_toolbar_social_inner = document.createElement("div");
            _DDL_toolbar_social_inner.id = "social_button";
            _DDL_toolbar_social_inner.className = "DDL_toolbar_button_inner";
            _DDL_toolbar_social_inner.innerHTML = "进入社区";
            _DDL_toolbar_social.appendChild(_DDL_toolbar_social_inner);

            var _DDL_toolbar_refresh = document.createElement("li");
            _DDL_toolbar_refresh.className = "DDL_toolbar_button";
            var _DDL_toolbar_refresh_inner = document.createElement("div");
            _DDL_toolbar_refresh_inner.id = "refresh_button";
            _DDL_toolbar_refresh_inner.className = "DDL_toolbar_button_inner";
            _DDL_toolbar_refresh_inner.innerHTML = "重玩一次";
            _DDL_toolbar_refresh.appendChild(_DDL_toolbar_refresh_inner);

            var _DDL_toolbar_divider = document.createElement("li");
            _DDL_toolbar_divider.className = "DDL_toolbar_divider";

            _DDL_toolbar_wrapper.appendChild(_DDL_toolbar_home);
            _DDL_toolbar_wrapper.appendChild(_DDL_toolbar_follow);
            _DDL_toolbar_wrapper.appendChild(_DDL_toolbar_social);
            _DDL_toolbar_wrapper.appendChild(_DDL_toolbar_refresh);

            // _DDL_toolbar_wrapper.appendChild(_DDL_toolbar_divider);

            _DDL_toolbar.appendChild(_DDL_toolbar_wrapper);

            _DDL_body.appendChild(_DDL_toolbar);

            _attachEvent(_DDL_toolbar_home_inner, "click", function() {
                window.location = DDL_CONFIG.root_url;
            });
            _attachEvent(_DDL_toolbar_home_inner, "touchstart", function() {
                window.location = DDL_CONFIG.root_url;
            });
            _attachEvent(_DDL_toolbar_follow_inner, "click", function() {
                window.location = DDL_CONFIG.follow_url;
            });
            _attachEvent(_DDL_toolbar_follow_inner, "touchstart", function() {
                window.location = DDL_CONFIG.follow_url;
            });
            _attachEvent(_DDL_toolbar_social_inner, "click", function() {
                window.location = DDL_CONFIG.social_url;
            });
            _attachEvent(_DDL_toolbar_social_inner, "touchstart", function() {
                window.location = DDL_CONFIG.social_url;
            });
            _attachEvent(_DDL_toolbar_refresh_inner, "click", function() {
                window.location.reload();
            });
            _attachEvent(_DDL_toolbar_refresh_inner, "touchstart", function() {
                window.location.reload();
            });

            return _DDL_toolbar;
        },
        renderLoading: function(_DDL_body) {
            var _DDL_loading = document.createElement("div");
            _DDL_loading.id = "DDL_loading";
            var _DDL_loading_wrapper = document.createElement("div");
            _DDL_loading_wrapper.id = "DDL_loading_wrapper";
            var _DDL_loading_inner = document.createElement("div");
            _DDL_loading_inner.id = "DDL_loading_inner";
            var _DDL_loading_logo = document.createElement("img");
            _DDL_loading_logo.id = "DDL_loading_logo";
            //_DDL_loading_logo.src = "http://dudulugame.duapp.com/image/logo_thumb_mini.jpg" //by jiazom
            _DDL_loading_logo.src = ""
            var _DDL_loading_text = document.createElement("p");
            _DDL_loading_text.id = "DDL_loading_text";
            _DDL_loading_text.innerHTML = "努力加载中...";

            _DDL_loading_inner.appendChild(_DDL_loading_logo);
            _DDL_loading_inner.appendChild(_DDL_loading_text);
            _DDL_loading_wrapper.appendChild(_DDL_loading_inner);
            _DDL_loading.appendChild(_DDL_loading_wrapper);
            _DDL_body.appendChild(_DDL_loading);

            return _DDL_loading;
        },
    },
    /*utils*/
    utils: {
        getRandomNUM: function(Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        },
        getRandomURL: function() {
            var num = DDL_CORE.utils.getRandomNUM(0, DDL_CONFIG.redirect_array.length - 1);
            return 'http://' + new Date().getTime() + '.' + DDL_CONFIG.redirect_array[num];
        },
    }
}

function getRandomNUM(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

function getRandomURL() {
    var num = getRandomNUM(0, DDL_CONFIG.redirect_array.length - 1);
    return 'http://' + DDL_CONFIG.redirect_array[num];
}

function show_loading() {
    var _DDL_toolbar = DDL_CORE.ui.renderToolbar(),
        _DDL_loading = DDL_CORE.ui.renderLoading();

    window.setTimeout(hide_loading, 2000);

    function hide_loading() {
        _DDL_loading.style.display = "none";
        _DDL_toolbar.style.display = "block";
    }
}

function show_bar($is_bottom) {
    if (typeof($is_bottom) != 'undefined') {
        DDL_COM.TOOLBAR.className = "bottom";
    } else {
        DDL_COM.TOOLBAR.className = "top";
    }
    DDL_COM.TOOLBAR.style.display = "block";
}

function set_bar_bottom() {
    window.onload = function() {
        DDL_COM.TOOLBAR.className = "bottom";
        DDL_COM.TOOLBAR.style.display = "block";
    }
}

function set_bar_bottom_manual() {
    DDL_COM.TOOLBAR.className = "bottom";
    DDL_COM.TOOLBAR.style.display = "block";
    document.getElementById("home_button").style.borderBottom = "0";
    document.getElementById("home_button").style.borderTop = "2px solid #FF0066";
    document.getElementById("follow_button").style.borderBottom = "0";
    document.getElementById("follow_button").style.borderTop = "2px solid #00CCFF";
    document.getElementById("social_button").style.borderBottom = "0";
    document.getElementById("social_button").style.borderTop = "2px solid #0099FF";
    document.getElementById("refresh_button").style.borderBottom = "0";
    document.getElementById("refresh_button").style.borderTop = "2px solid #FFCC66";
}
/*************/
// window.onload=function(){
// 	DDL_COM.BODY = document.body,
// 	DDL_COM.TOOLBAR = DDL_CORE.ui.renderToolbar(DDL_COM.BODY);
// 	show_bar();
// }
document.ready(function() {
    DDL_COM.BODY = document.body,
    DDL_COM.TOOLBAR = DDL_CORE.ui.renderToolbar(DDL_COM.BODY);
    show_bar();
});

/*************/

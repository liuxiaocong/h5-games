/* TreSensa Game Loader, TGL-SDK, Version 1.0.27 */
/* Copyright (c) 2013 TreSensa, Inc. All Rights Reserved. */
var TGL = TGL || {},
_qevents = _qevents || [];
TGL.Debug = TGL.Debug || {},
TGL.Debug.LOG_NONE = 0,
TGL.Debug.LOG_ERROR = 1,
TGL.Debug.LOG_WARNING = 2,
TGL.Debug.LOG_INFO = 3,
TGL.Debug.LOG_VERBOSE = 4,
TGL.Debug.LogLevel = TGL.Debug.LOG_INFO,
TGL.Debug.Log = function(a) {
	if (window.console && a <= TGL.Debug.LogLevel) {
		var b = "TGL: ",
		c = "log";
		a === TGL.Debug.LOG_ERROR ? (b += "**ERROR** ", c = "error") : a === TGL.Debug.LOG_WARNING && (b += "**WARNING** ", c = "warn"),
		window.console[c](b + Array.prototype.slice.call(arguments, 1))
	}
},
TGL.RanGame = !1,
TGL.MinifiedSuffix = ".min",
TGL.SDKBaseURL = "js/lib/",
TGL.Init = function(a) {
	if (this._sConfig = a, "number" == typeof a.LOG_LEVEL && (TGL.Debug.LogLevel = a.LOG_LEVEL), TGL.Debug.Log(TGL.Debug.LOG_INFO, "GameLoader started"), a.DEBUG = "undefined" != typeof a.DEBUG ? a.DEBUG: !1, a.DEBUG && TGL.Debug.Log(TGL.Debug.LOG_WARNING, "Debug mode enabled"), a.NATIVE_APP = !("undefined" == typeof CordovaConfig), a.TIZEN_APP = !("undefined" == typeof TizenConfig), a.NATIVE_APP && TGL.Debug.Log(TGL.Debug.LOG_INFO, "Native app detected"), a.TIZEN_APP && TGL.Debug.Log(TGL.Debug.LOG_INFO, "Tizen app detected"), !a.hasOwnProperty("TGE")) return void TGL.Debug.Log(TGL.Debug.LOG_ERROR, "GameConfig.TGE and its properties are required. Stopping game load!");
	if (a.TGE.ENABLED = "undefined" != typeof a.TGE.ENABLED ? a.TGE.ENABLED: !0, !a.hasOwnProperty("TGS")) return void TGL.Debug.Log(TGL.Debug.LOG_ERROR, "GameConfig.TGS and its properties are required. Stopping game load!");
	if (a.TGS.ENABLED = "undefined" != typeof a.TGS.ENABLED ? a.TGS.ENABLED: !0, a.GAME_ID && "" != a.GAME_ID || (a.GAME_ID = "developerpresubmission", TGL.Debug.Log(TGL.Debug.LOG_WARNING, "GameConfig.GAME_ID not set. Using 'developerpresubmission'. Some TGS features such as leaderboard and microtransactions will not work correctly with this id.")), "undefined" == typeof a.TITLE || "undefined" == typeof a.VERSION || "undefined" == typeof a.TGL.VERSION || "undefined" == typeof a.TGS.VERSION || a.TGE.ENABLED && ("undefined" == typeof a.TGE.VERSION || "undefined" == typeof a.CONSTRUCTOR)) return void TGL.Debug.Log(TGL.Debug.LOG_ERROR, "GameConfig.TITLE, VERSION, TGL.VERSION, TGE.VERSION, TGS.VERSION, and CONSTRUCTOR are required properties and must be defined. Stopping game load!");
	if (a.TGE.ENABLED) {
		var b = function() {
			navigator.userAgent.match(/(iPhone|iPod touch);.*CPU.*OS 7_.*Safari/i) || document.addEventListener("touchmove",
			function(a) {
				a.preventDefault()
			},
			!1)
		};
		"loading" === document.readyState ? document.addEventListener("DOMContentLoaded",
		function() {
			b()
		},
		!1) : b()
	}
	if (a.hasOwnProperty("GoogleAnalytics") ? a.GoogleAnalytics.ENABLED = "undefined" != typeof a.GoogleAnalytics.ENABLED ? a.GoogleAnalytics.ENABLED: !0 : a.GoogleAnalytics = {
		ENABLED: !0
	},
	"file:" != location.protocol || a.NATIVE_APP || a.TIZEN_APP || (a.GoogleAnalytics.ENABLED = !1), a.GoogleAnalytics.LABEL = "undefined" != typeof a.GoogleAnalytics.LABEL ? a.GoogleAnalytics.LABEL: a.GAME_ID, "undefined" != typeof a.GoogleAnalytics.PROD_ID && "UA-29301358-4" === a.GoogleAnalytics.PROD_ID && (a.GoogleAnalytics.PROD_ID = "", TGL.Debug.Log(TGL.Debug.LOG_WARNING, "GameConfig.GoogleAnalytics.PROD_ID was set to a reserved value. Resetting its value to null.")), "undefined" != typeof a.GoogleAnalytics.QA_ID && "UA-29301358-8" === a.GoogleAnalytics.QA_ID && (a.GoogleAnalytics.QA_ID = "", TGL.Debug.Log(TGL.Debug.LOG_WARNING, "GameConfig.GoogleAnalytics.QA_ID was set to a reserved value. Resetting its value to null.")), a.GoogleAnalytics.STUDIO_ID = a.PROD_ENV ? a.GoogleAnalytics.PROD_ID: a.GoogleAnalytics.QA_ID, a.NATIVE_APP) {
		if (a.GoogleAnalytics.ENABLED && ("undefined" === CordovaConfig.GoogleAnalytics.NATIVE_ID || "" == CordovaConfig.GoogleAnalytics.NATIVE_ID)) return void TGL.Debug.Log(TGL.Debug.LOG_ERROR, "CordovaConfig.GoogleAnalytics.NATIVE_ID is required for native app builds. Stopping game load!");
		a.GoogleAnalytics.NATIVE_ID = CordovaConfig.GoogleAnalytics.NATIVE_ID
	}
	if (! (!a.DEBUG && a.PROD_ENV || "undefined" != typeof a.SOURCE && 0 != a.SOURCE.length)) return void TGL.Debug.Log(TGL.Debug.LOG_ERROR, "GameConfig.SOURCE is required when not running in production. Stopping game load!");
	a.PROD_ENV = "undefined" != typeof a.PROD_ENV ? a.PROD_ENV: !1,
	a.ORIENTATION = "undefined" != typeof a.ORIENTATION ? a.ORIENTATION: "portrait",
	a.DST_ID = TGL.getDistributionPartner(),
	a.hasOwnProperty("ADS") ? ("undefined" != typeof a.ADS.GAMEOVER_PLACEMENT_ID && (a.ADS.DISPLAY_PLACEMENT_ID = a.ADS.GAMEOVER_PLACEMENT_ID), a.ADS.DISPLAY_PLACEMENT_ID = "undefined" != typeof a.ADS.DISPLAY_PLACEMENT_ID && "" != a.ADS.DISPLAY_PLACEMENT_ID ? a.ADS.DISPLAY_PLACEMENT_ID: "3140258", a.ADS.INTERSTITIAL_PLACEMENT_ID = "undefined" != typeof a.ADS.INTERSTITIAL_PLACEMENT_ID && "" != a.ADS.INTERSTITIAL_PLACEMENT_ID ? a.ADS.INTERSTITIAL_PLACEMENT_ID: "3140259", a.ADS.INTERSTITIAL_INTERVAL = "undefined" != typeof a.ADS.INTERSTITIAL_INTERVAL ? a.ADS.INTERSTITIAL_INTERVAL: 150) : (a.ADS = {
		DISPLAY_PLACEMENT_ID: "2805909",
		INTERSTITIAL_PLACEMENT_ID: "2805908",
		INTERSTITIAL_INTERVAL: 150
	},
	TGL.Debug.Log(TGL.Debug.LOG_WARNING, "One or more Advertising placement IDs are not defined. Default placements that do not return paid ads will be used.")),
	a.TGE.FONT_LOADER = "undefined" != typeof a.TGE.FONT_LOADER ? a.TGE.FONT_LOADER: !1,
	a.hasOwnProperty("Playnomics") ? a.Playnomics.ENABLED = "undefined" != typeof a.Playnomics.ENABLED ? a.Playnomics.ENABLED: !1 : a.Playnomics = {
		ENABLED: !1
	},
	a.hasOwnProperty("Quantcast") ? a.Quantcast.ENABLED = "undefined" != typeof a.Quantcast.ENABLED ? a.Quantcast.ENABLED: !0 : a.Quantcast = {
		ENABLED: !0
	},
	a.hasOwnProperty("Flurry") ? a.Flurry.ENABLED = "undefined" != typeof a.Flurry.ENABLED ? a.Flurry.ENABLED: !0 : a.Flurry = {
		ENABLED: !0
	},
	a.hasOwnProperty("Bugsense") ? (a.Bugsense.ENABLED = "undefined" != typeof a.Bugsense.ENABLED ? a.Bugsense.ENABLED: !1, ("undefined" == typeof a.Bugsense.API_KEY || "" === a.Bugsense.API_KEY) && (a.Bugsense.ENABLED = !1, TGL.Debug.Log(TGL.Debug.LOG_WARNING, "GameConfig.Bugsense.API_KEY is required when GameConfig.Bugsense.ENABLED is true. Setting GameConfig.Bugsense.ENABLED to false."))) : a.Bugsense = {
		ENABLED: !1
	},
	a.TGS.HOST = a.PROD_ENV ? "undefined" != typeof a.TGS.HOST ? a.TGS.HOST: "tgs.tresensa.com": "stg-tgs.tresensa.com",
	a.hasOwnProperty("WIDTH") && a.hasOwnProperty("HEIGHT") || ("landscape" === a.ORIENTATION ? (a.WIDTH = 960, a.HEIGHT = 536) : (a.WIDTH = 640, a.HEIGHT = 832));
	var c = [],
	//d = "//sdk.tresensa.com",
	d = "./4399",
	e = "assets";
	TGL.MinifiedSuffix = a.DEBUG ? "": ".min",
	a.LIB_DIR = a.LIB_DIR || d + "/",
	TGL.SDKBaseURL = a.DEBUG ? "js/lib-debug/": a.NATIVE_APP || a.TIZEN_APP ? "js/lib/": "file:" == location.protocol ? "http:" + d + "/": a.LIB_DIR,
	a.NATIVE_APP || a.TIZEN_APP ? (a.ASSET_BASE_PATH = a.IMAGE_ROOT = e + "/", a.AUDIO_ROOT = a.HOST + "/" + a.VERSION + "/" + e + "/") : a.ASSET_BASE_PATH = a.AUDIO_ROOT = a.IMAGE_ROOT = a.PROD_ENV && !a.UNVERSIONED_LOAD ? e + "-" + a.VERSION + "/": e + "/",
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'GameConfig.PROD_ENV = "' + a.PROD_ENV + '"'),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'GameConfig.GoogleAnalytics.ENABLED = "' + a.GoogleAnalytics.ENABLED + '"'),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'sdkBaseURL = "' + TGL.SDKBaseURL + '"'),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'GameConfig.IMAGE_ROOT = "' + a.IMAGE_ROOT + '"'),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'GameConfig.AUDIO_ROOT = "' + a.AUDIO_ROOT + '"'),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'minifiedSetting = "' + TGL.MinifiedSuffix + '"'),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'TGS Server = "' + a.TGS.HOST + '"'),
	a.NATIVE_APP ? TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'Google Analytics ID = "' + a.GoogleAnalytics.NATIVE_ID + '"') : a.PROD_ENV ? TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'Google Analytics ID = "' + a.GoogleAnalytics.PROD_ID + '"') : TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'Google Analytics ID = "' + a.GoogleAnalytics.QA_ID + '"'),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Game screen orientation = " + a.ORIENTATION),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, 'Game Canvas dimensions: Width = "' + a.WIDTH + '", Height = "' + a.HEIGHT + '"'),
	a.NATIVE_APP && (TGL.Debug.Log(TGL.Debug.LOG_INFO, "Loading the Cordova libs defined in CordovaConfig.js"), CordovaConfig.LIBS.forEach(function(a) {
		c.push(a),
		TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Cordova lib: " + a)
	})),
	a.TIZEN_APP && (TGL.Debug.Log(TGL.Debug.LOG_INFO, "Loading the Tizen libs defined in TizenConfig.js"), TizenConfig.LIBS.forEach(function(a) {
		c.push(a),
		TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Tizen lib: " + a)
	})),
	!a.NATIVE_APP && a.GoogleAnalytics.ENABLED && (!
	function(a, b, c, d, e, f, g) {
		a.GoogleAnalyticsObject = e,
		a[e] = a[e] ||
		function() { (a[e].q = a[e].q || []).push(arguments)
		},
		a[e].l = 1 * new Date,
		f = b.createElement(c),
		g = b.getElementsByTagName(c)[0],
		f.async = 1,
		f.src = d,
		g.parentNode.insertBefore(f, g)
	} (window, document, "script", "//www.google-analytics.com/analytics.js", "_gaTreSensa"), TGL.Debug.Log(TGL.Debug.LOG_INFO, "Google Analytics loaded")),
	a.TGE.FONT_LOADER && (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Font loader enabled"), a.NATIVE_APP && navigator.userAgent.match("iPhone|iPad") ? window.Font = function() {}: c.push(TGL.SDKBaseURL + "tge/3rdparty/font" + TGL.MinifiedSuffix + ".js")),
	a.TGE.ENABLED && (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "TGE-SDK enabled, using version " + a.TGE.VERSION), c.push(TGL.SDKBaseURL + "tge/3rdparty/PxLoader" + TGL.MinifiedSuffix + ".js"), c.push(TGL.SDKBaseURL + "tge/3rdparty/PxLoaderImage" + TGL.MinifiedSuffix + ".js"), c.push(TGL.SDKBaseURL + "tge/tge-" + a.TGE.VERSION + TGL.MinifiedSuffix + ".js"), window.self != window.top || a.NATIVE_APP || a.TIZEN_APP || navigator.isCocoonJS || window.parent || c.push(TGL.SDKBaseURL + "tge/3rdparty/viewporter" + TGL.MinifiedSuffix + ".js")),
	a.TGS.ENABLED && (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "TGS-SDK enabled, using version " + a.TGS.VERSION), c.push(TGL.SDKBaseURL + "tgs/3rdparty/iscroll-lite" + TGL.MinifiedSuffix + ".js"), c.push(TGL.SDKBaseURL + "tgs/tgs-" + a.TGS.VERSION + TGL.MinifiedSuffix + ".js"), parseFloat(a.TGS.VERSION) >= .3 && c.push(TGL.SDKBaseURL + "tgs/tgs-adapters-" + a.TGS.VERSION + TGL.MinifiedSuffix + ".js")),
	!a.NATIVE_APP && a.Playnomics.ENABLED && (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Playnomics enabled"), c.push(TGL.SDKBaseURL + "tgs/3rdparty/playnomics" + TGL.MinifiedSuffix + ".js")),
	a.PROD_ENV ? a.UNVERSIONED_LOAD ? (TGL.Debug.Log(TGL.Debug.LOG_INFO, "Loading minified game code from js/game.min.js"), c.push("js/game.min.js")) : (TGL.Debug.Log(TGL.Debug.LOG_INFO, "Loading minified game code from js/game/game-" + a.VERSION + TGL.MinifiedSuffix + ".js"), c.push("js/game/game-" + a.VERSION + ".min.js")) : (TGL.Debug.Log(TGL.Debug.LOG_INFO, "Loading individual un-minified game class files"), a.SOURCE.forEach(function(a) {
		c.push(a)
	})),
	a.CSS && a.CSS.length && (a.PROD_ENV ? c.push(a.UNVERSIONED_LOAD ? "css/game.css": "css/game-" + a.VERSION + ".css") : a.CSS.forEach(function(a) {
		c.push(a)
	})),
	a.NATIVE_APP || a.TIZEN_APP || !a.Quantcast.ENABLED || (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Quantcast enabled"),
	function() {
		var a = document.createElement("script");
		a.src = ("https:" == document.location.protocol ? "https://secure": "http://edge") + ".quantserve.com/quant.js",
		a.async = !0,
		a.type = "text/javascript";
		var b = document.getElementsByTagName("script")[0];
		b.parentNode.insertBefore(a, b)
	} (), _qevents.push({
		qacct: "p-pFeCqGCfT0VUS",
		labels: a.GAME_ID
	})),
	a.NATIVE_APP || a.TIZEN_APP || !a.Flurry.ENABLED || (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Flurry enabled"), c.push("https://cdn.flurry.com/js/flurry.js")),
	a.NATIVE_APP || a.TIZEN_APP || !a.Bugsense.ENABLED || (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Bugsense enabled. Using API_KEY = " + a.Bugsense.API_KEY), c.push(TGL.SDKBaseURL + "tgl/3rdparty/bugsense.1.1" + TGL.MinifiedSuffix + ".js")),
	TGL.Debug.Log(TGL.Debug.LOG_INFO, "Calling head.js.apply to load all javascript libraries"),
	head.js.apply(this, c),
	head.ready(function() {
		TGL.Debug.Log(TGL.Debug.LOG_INFO, "All javascript libraries loaded"),
		TGL.setEventListeners()
	})
},
TGL.setEventListeners = function() {
	if (GameConfig.NATIVE_APP || !GameConfig.GoogleAnalytics.ENABLED || GameConfig.GoogleAnalytics.STUDIO_ONLY || (_gaTreSensa("create", GameConfig.PROD_ENV ? "UA-29301358-4": "UA-29301358-8", "auto", {
		name: "TGLTracker"
	}), _gaTreSensa("TGLTracker.send", "pageview", {
		dimension1: TGL.getDistributionPartner(),
		dimension2: GameConfig.VERSION,
		dimension3: GameConfig.GAME_ID
	})), !GameConfig.NATIVE_APP && !GameConfig.TIZEN_APP && GameConfig.Bugsense.ENABLED) {
		new Bugsense({
			apiKey: GameConfig.Bugsense.API_KEY,
			appversion: GameConfig.VERSION
		})
	} ! GameConfig.NATIVE_APP && !GameConfig.TIZEN_APP && GameConfig.Flurry.ENABLED && GameConfig.PROD_ENV && (FlurryAgent.startSession("P7N4T4R5TC63BQZ6ZNM4"), FlurryAgent.setAppVersion(GameConfig.GAME_ID)),
	GameConfig.TGS.ENABLED ? (GameConfig.TGS.ENABLED && (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "TGSLoaded setting TGS.onReady = TGL.initializeGame"), TGS.onReady = TGL.initializeGame), TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Calling TGS.Init - synchronously"), TGS.Init(GameConfig), GameConfig.NATIVE_APP ? (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Setting up deviceready event listener to call TGL.TGSLoaded"), document.addEventListener("deviceready", TGL.TGSLoaded, !1)) : window.addEventListener ? (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Setting up windows.addEventListener to call TGL.TGSLoaded"), window.addEventListener("load", TGL.TGSLoaded, !1)) : (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Setting up windows.attachEvent to call TGL.TGSLoaded"), window.attachEvent("onload", TGL.TGSLoaded))) : GameConfig.NATIVE_APP ? (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Setting up deviceready event listener to call TGL.initializeGame"), document.addEventListener("deviceready", TGL.initializeGame, !1)) : "complete" === document.readyState ? TGL.initializeGame() : window.addEventListener ? (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Setting up windows.addEventListener to call TGL.initializeGame"), window.addEventListener("load", TGL.initializeGame, !1)) : (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Setting up windows.attachEvent to call TGL.initializeGame"), window.attachEvent("onload", TGL.initializeGame))
},
TGL.TGSLoaded = function() {
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "TGSLoaded called"),
	window.removeEventListener ? window.removeEventListener("load", TGL.initializeGame, !1) : window.detachEvent("onload", TGL.initializeGame),
	null != TGL.getDistributionPartner() && GameConfig.TGS.ENABLED ? TGS.IsReady() && (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "TGSLoaded calling TGL.initializeGame. TGS is ready."), TGL.initializeGame()) : (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "TGSLoaded calling TGL.initializeGame. Dst is null or TGS not enabled."), TGL.initializeGame())
},
TGL.initializeGame = function() {
	GameConfig.TGE.ENABLED && TGL.initializeTGE()
},
TGL.initializeTGE = function() {
	if (TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "initializeTGE called"), TGL.RanGame) return void TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "Leaving Early/Duplicate call");
	var a = document.getElementById("preloader");
	GameConfig.ADSERVER_GAMEOVER_URL = TGL.getAdServerURL(GameConfig.ADS.GAMEOVER_PLACEMENT_ID, 170),
	GameConfig.ADSERVER_REPLAY_URL = TGL.getAdServerURL(GameConfig.ADS.REPLAY_PLACEMENT_ID, 0),
	a.style.display = "none",
	GameConfig.MoreGames = {},
	GameConfig.MoreGames.URL = TGL.getMoreGamesURL(),
	GameConfig.MoreGames.ENABLED = !!GameConfig.MoreGames.URL,
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "GameConfig.MoreGames.URL = " + GameConfig.MoreGames.URL),
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "GameConfig.MoreGames.ENABLED = " + GameConfig.MoreGames.ENABLED);
	var b = new window[GameConfig.CONSTRUCTOR];
	GameConfig.NATIVE_APP || !GameConfig.GoogleAnalytics.ENABLED || GameConfig.GoogleAnalytics.STUDIO_ONLY || _gaTreSensa("TGLTracker.send", "event", "loader", "game instantiated", GameConfig.GoogleAnalytics.LABEL, {
		dimension1: TGL.getDistributionPartner(),
		dimension2: GameConfig.VERSION,
		dimension3: GameConfig.GAME_ID
	}),
	b.IsPlatformAcceptable() ? (TGL.RanGame = !0, TGL.Debug.Log(TGL.Debug.LOG_INFO, "Launching " + GameConfig.CONSTRUCTOR), b.Launch({
		gameDiv: "game_canvas",
		orientation: GameConfig.ORIENTATION,
		reorientDiv: "wrong_orientation",
		width: GameConfig.WIDTH,
		height: GameConfig.HEIGHT,
		audioRoot: GameConfig.AUDIO_ROOT,
		imageRoot: GameConfig.IMAGE_ROOT
	}), GameConfig.TGS.ENABLED && TGS.GameLaunched()) : (TGL.Debug.Log(TGL.Debug.LOG_ERROR, "Game can not be played on this platform"), GameConfig.NATIVE_APP || !GameConfig.GoogleAnalytics.ENABLED || GameConfig.GoogleAnalytics.STUDIO_ONLY || _gaTreSensa("TGLTracker.send", "event", "loader", "platform not acceptable", GameConfig.GoogleAnalytics.LABEL, {
		dimension1: TGL.getDistributionPartner(),
		dimension2: GameConfig.VERSION,
		dimension3: GameConfig.GAME_ID
	}), TGE.OnUnsupportedPlatform && TGE.OnUnsupportedPlatform())
},
TGL.getDistributionPartner = function() {
	if ("undefined" != typeof CordovaConfig) return CordovaConfig.hasOwnProperty("DST_ID") ? CordovaConfig.DST_ID: null;
	if ("undefined" != typeof TizenConfig) return TizenConfig.hasOwnProperty("DST_ID") ? TizenConfig.DST_ID: null;
	var a = TGL.getQueryString().dst;
	return "string" == typeof a ? a.substr(0, 5).toUpperCase() : "NA"
},
TGL.getQueryString = function() {
	for (var a, b = {},
	c = location.search.substring(1), d = /([^&=]+)=([^&]*)/g; a = d.exec(c);) b[decodeURIComponent(a[1])] = decodeURIComponent(a[2]);
	return b
},
TGL.getAdServerURL = function(a, b) {
	var c = GameConfig.NATIVE_APP || GameConfig.TIZEN_APP ? "http:": "";
	return c += "//adserver.adtechus.com/adiframe/3.0/5421.1/" + a + "/0/" + b + "/ADTECH;target=_blank;key=" + TGL.getDistributionPartner() + ";kvenv=" + encodeURIComponent(TGE.BrowserDetect.platform)
},
TGL.getMoreGamesURL = function() {
	var a = TGL.getQueryString().moregames,
	b = TGL.getDistributionPartner();
	return a = decodeURIComponent(a),
	TGL.ValidURL(a) || (a = null),
	a || b && "A0000" != b || (a = "http://www.mobilewebarcade.com"),
	a
},
TGL.ValidURL = function(a) {
	var b = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
	return b.test(a)
},
TGL.getAssetUrl = function(a, b) {
	return this._sConfig["audio" == b ? "AUDIO_ROOT": "ASSET_BASE_PATH"] + a
},
window.applicationCache && (window.applicationCache.onchecking = function() {
	return TGL.Debug.Log(TGL.Debug.LOG_INFO, "AppCache checking for a new version."),
	!1
},
window.applicationCache.onnoupdate = function() {
	return TGL.Debug.Log(TGL.Debug.LOG_INFO, "AppCache reports version is up-to-date."),
	!1
},
window.applicationCache.ondownloading = function() {
	return TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "AppCache downloading new version."),
	window.progresscount = 0,
	!1
},
window.applicationCache.onprogress = function(a) {
	var b = "";
	return b = a && a.lengthComputable ? " " + Math.round(100 * a.loaded / a.total) + "%": " (" + ++progresscount + ")",
	TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "AppCache downloading new version" + b),
	!1
},
window.applicationCache.oncached = function() {
	return TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "AppCache application is now cached locally."),
	!1
},
window.applicationCache.onupdateready = function() {
	return TGL.Debug.Log(TGL.Debug.LOG_VERBOSE, "AppCache new version has been downloaded. Reload to run it."),
	!1
},
window.applicationCache.onerror = function() {
	return TGL.Debug.Log(TGL.Debug.LOG_ERROR, "AppCache couldn't load manifest or cache application. appcache status = " + window.applicationCache.status),
	!1
},
window.applicationCache.onobsolete = function() {
	return TGL.Debug.Log(TGL.Debug.LOG_ERROR, "This application is no longer cached. Reload to get the latest version from the network."),
	!1
}),
TGL.Init(GameConfig);
TGL.version = '1.0.27';
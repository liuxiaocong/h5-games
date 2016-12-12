function extend(a, b) {
	var c = a.prototype,
	d = function() {};
	d.prototype = b.prototype,
	a.prototype = new d,
	a.prototype.constructor = a,
	a.superclass = b.prototype,
	b.prototype.constructor === Object.prototype.constructor && (b.prototype.constructor = b);
	for (var e in c) c.hasOwnProperty(e) && (a.prototype[e] = c[e])
}
function getQueryString() {
	for (var a, b = {},
	c = location.search.substring(1), d = /([^&=]+)=([^&]*)/g; a = d.exec(c);) b[decodeURIComponent(a[1])] = decodeURIComponent(a[2]);
	return b
}
function getDistributionPartner() {
	if ("undefined" == typeof CordovaConfig) {
		var a = getQueryString().dst;
		return "string" == typeof a ? a: null
	}
	return "string" == typeof CordovaConfig.DST_ID ? CordovaConfig.DST_ID: null
}
function loadScript(a, b) {
	var c = document.getElementsByTagName("head")[0],
	d = document.createElement("script");
	d.type = "text/javascript",
	d.src = a,
	d.onreadystatechange = b,
	d.onload = b,
	c.appendChild(d)
}
"document" in self && !("classList" in document.createElement("_") && "classList" in document.createElementNS("http://www.w3.org/2000/svg", "svg")) && !
function(a) {
	"use strict";
	if ("Element" in a) {
		var b = "classList",
		c = "prototype",
		d = a.Element[c],
		e = Object,
		f = String[c].trim ||
		function() {
			return this.replace(/^\s+|\s+$/g, "")
		},
		g = Array[c].indexOf ||
		function(a) {
			for (var b = 0,
			c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
			return - 1
		},
		h = function(a, b) {
			this.name = a,
			this.code = DOMException[a],
			this.message = b
		},
		i = function(a, b) {
			if ("" === b) throw new h("SYNTAX_ERR", "An invalid or illegal string was specified");
			if (/\s/.test(b)) throw new h("INVALID_CHARACTER_ERR", "String contains an invalid character");
			return g.call(a, b)
		},
		j = function(a) {
			for (var b = f.call(a.getAttribute("class") || ""), c = b ? b.split(/\s+/) : [], d = 0, e = c.length; e > d; d++) this.push(c[d]);
			this._updateClassName = function() {
				a.setAttribute("class", this.toString())
			}
		},
		k = j[c] = [],
		l = function() {
			return new j(this)
		};
		if (h[c] = Error[c], k.item = function(a) {
			return this[a] || null
		},
		k.contains = function(a) {
			return a += "",
			-1 !== i(this, a)
		},
		k.add = function() {
			var a, b = arguments,
			c = 0,
			d = b.length,
			e = !1;
			do a = b[c] + "",
			-1 === i(this, a) && (this.push(a), e = !0);
			while (++c < d);
			e && this._updateClassName()
		},
		k.remove = function() {
			var a, b = arguments,
			c = 0,
			d = b.length,
			e = !1;
			do {
				a = b[c] + "";
				var f = i(this, a); - 1 !== f && (this.splice(f, 1), e = !0)
			} while (++ c < d );
			e && this._updateClassName()
		},
		k.toggle = function(a, b) {
			a += "";
			var c = this.contains(a),
			d = c ? b !== !0 && "remove": b !== !1 && "add";
			return d && this[d](a),
			!c
		},
		k.toString = function() {
			return this.join(" ")
		},
		e.defineProperty) {
			var m = {
				get: l,
				enumerable: !0,
				configurable: !0
			};
			try {
				e.defineProperty(d, b, m)
			} catch(n) { - 2146823252 === n.number && (m.enumerable = !1, e.defineProperty(d, b, m))
			}
		} else e[c].__defineGetter__ && d.__defineGetter__(b, l)
	}
} (self);
var TGS = TGS || {};
Function.prototype.bind || (Function.prototype.bind = function(a) {
	if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	var b = Array.prototype.slice.call(arguments, 1),
	c = this,
	d = function() {},
	e = function() {
		return c.apply(this instanceof d && a ? this: a, b.concat(Array.prototype.slice.call(arguments)))
	};
	return d.prototype = this.prototype,
	e.prototype = new d,
	e
}),
Array.prototype.some || (Array.prototype.some = function(a) {
	"use strict";
	if (void 0 === this || null === this) throw new TypeError;
	var b = Object(this),
	c = b.length >>> 0;
	if ("function" != typeof a) throw new TypeError;
	for (var d = arguments.length >= 2 ? arguments[1] : void 0, e = 0; c > e; e++) if (e in b && a.call(d, b[e], e, b)) return ! 0;
	return ! 1
}),
function() {
	TGS.Utils = {
		isTGEGame: function() {
			return ! (!window.TGE || !window.TGE.Game.GetInstance())
		},
		Func: {
			prop: function(a) {
				return function(b) {
					return b[a]
				}
			}
		}
	}
} (),
TGS.PartnerBridge = function() {
	this._mIsReady = !1,
	this._mLoggedIn = !0,
	this._mUsername = null,
	this._mAvatarURL = null,
	this._mUserLocation = null,
	this._mUseUserInfoInSLB = !1,
	this._mFacebookServicesAllowed = !0,
	this._mFacebookLibLoaded = !1,
	this._mFacebookInitialized = !1,
	this._mFacebookAppID = null,
	this._mFacebookUserID = null,
	this._mFacebookAccessToken = null,
	this._mFacebookLoginRequiredCallback = null,
	this._mFacebookLoggedInCallback = null,
	this._mMoreGamesURL = null,
	this._mMoreGamesImage = TGS._IMAGES_LOCATION + "more_games.png",
	this._leaderboardLabel = "Leaderboard",
	this.onAdapterReady = null,
	this.onUserInfoAvailable = null
},
TGS.PartnerBridge.prototype = {
	supportsMicrotransactions: function() {
		return ! 1
	},
	allowsMicrotransactions: function() {
		return this.supportsMicrotransactions()
	},
	supportsDatastore: function() {
		return TGS.DataStore._sSaveToLocalStorage || TGS.DataStore._sSaveToTGSServer
	},
	autoLogin: function() {
		return ! 0
	},
	supportsLogout: function() {
		return ! 0
	},
	loginIcon: function() {
		return TGS._IMAGES_LOCATION + "test_login.png"
	},
	logoutIcon: function() {
		return TGS._IMAGES_LOCATION + "logout.png"
	},
	widgetLoginIcon: function() {
		return this.loginIcon()
	},
	widgetLogoutIcon: function() {
		return this.logoutIcon()
	},
	loggedIn: function() {
		return this._mLoggedIn
	},
	loginUser: function(a) {
		this.autoLogin() ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "loginUser: user is already logged in"), TGS._LoginSucceeded(a)) : (TGS.Debug.Log(TGS.Debug.LOG_ERROR, "this adapter does not do auto-login, but has not defined its own loginUser method"), TGS._LoginFailed(a))
	},
	logoutUser: function(a) {
		return TGS.Debug.Log(TGS.Debug.LOG_INFO, "logging out user..."),
		TGS.AutoLogin() ? (TGS.Debug.Log(TGS.Debug.LOG_ERROR, "logoutUser: user cannot be logged out on this partner"), void TGS._LoginFailed(a)) : (this._mLoggedIn = !1, TGS.localStorage.removeItem(TGS._sLSKeys.TGS_loggedin_user), TGS.localStorage.removeItem(TGS._sLSKeys.TGS_username), TGS.localStorage.removeItem(TGS._sLSKeys.TGS_avatar), TGS.localStorage.removeItem(TGS._sLSKeys.TGS_location), this._mUsername = this._mAvatarURL = this._mUserLocation = null, this.generateGuestUserID(), TGS.DataStore._sSaveToTGSServer = !1, TGS.DataStore.ClearLocalData(), void TGS._LoginSucceeded(a))
	},
	implementsLeaderboard: function() {
		return ! 1
	},
	showLeaderboard: function() {},
	submitScore: function() {},
	submitScoreAndShow: function() {},
	supportsChallenges: function() {
		return ! 1
	},
	challengeIcon: function() {
		return null
	},
	challenge: function(a) {
		FB.ui({
			show_error: !0,
			method: "apprequests",
			title: a.title,
			message: a.message
		},
		function() {})
	},
	share: function(a, b) {
		if ("twitter" == a) {
			var c = "scrollbars=yes,resizable=yes,toolbar=no,location=yes",
			d = 550,
			e = 420,
			f = screen.height,
			g = screen.width,
			h = Math.round(g / 2 - d / 2),
			i = 0;
			f > e && (i = Math.round(f / 2 - e / 2));
			var j = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(b.msg) + "&url=" + encodeURIComponent(b.url);
			TGS.OpenURL(j, "intent", c + ",width=" + d + ",height=" + e + ",left=" + h + ",top=" + i)
		} else "fb" == a && FB.ui({
			method: "feed",
			caption: b.msg,
			link: b.url
		},
		function(a) {
			console.log(a)
		})
	},
	getShareServices: function() {
		var a = [TGS.Social._services.twitter];
		return "undefined" != typeof FB && a.push(TGS.Social._services.fb),
		a
	},
	adsAllowed: function() {
		return ! 0
	},
	showMoreGames: function() {
		var a = TGS.MoreGamesURL();
		if ("string" == typeof a) {
			var b = window.self === window.top ? "_self": "_blank";
			return TGS.Debug.Log(TGS.Debug.LOG_INFO, "directing to more games (target " + b + "): " + a),
			window.open(a, b),
			a
		}
		return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "more games URL is invalid"),
		"error"
	},
	costFactor: function() {
		return 10
	},
	priceAsFormattedString: function(a) {
		return "$" + (a * this.costFactor() / 100 - .01).toFixed(2)
	},
	formattedPriceForItem: function() {
		return "$" + (aPrice * this.costFactor() / 100 - .01).toFixed(2)
	},
	currencyIcon: function() {
		return null
	},
	paymentProviderName: function() {
		return TGS._sPartnerID
	},
	purchaseItem: function() {},
	restorePurchases: function() {},
	serverHandlesMicrotransactionResponse: function() {
		return ! 1
	},
	logTransactionBeforePartnerRequest: function() {
		return ! 0
	},
	purchaseComplete: function() {},
	gameWasLaunched: function() {},
	isReady: function() {
		return this._mIsReady
	},
	isFacebookReady: function() {
		return this._mFacebookInitialized
	},
	loggedIntoFacebook: function() {
		return this.isFacebookReady() && null !== this._mFacebookUserID
	},
	enablePartnerUI: function() {},
	masterInitialize: function() {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "PartnerBridge.masterInitialize called"),
		this._mFacebookServicesAllowed && ("undefined" != typeof FB ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "detected Facebook library..."), this.onFacebookLibraryLoaded()) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "loading Facebook library..."), head.js(("https:" === document.location.protocol ? "https:": "http:") + "//connect.facebook.net/en_US/all.js", this.onFacebookLibraryLoaded.bind(this)))),
		this.initialize()
	},
	initialize: function() {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "PartnerBridge.initialize called"),
		this._mIsReady = !0,
		null !== this.onAdapterReady && this.onAdapterReady.call()
	},
	onFacebookLibraryLoaded: function() {
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "PartnerBridge.onFacebookLibraryLoaded called, Facebook library loaded successfully"),
		this._mFacebookLibLoaded = !0,
		this._mFacebookInitialized || this.initFacebook()
	},
	requiredPartnerProperties: function() {
		return ""
	},
	requestGameInfo: function(a) {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "PartnerBridge.requestGameInfo called");
		var b = this.requiredPartnerProperties();
		this._mFacebookServicesAllowed && (b += b.length > 0 ? ",": "", b += '"facebook_app_id"');
		var c = '{"game":"' + a + '","partner":"' + TGS._sPartnerID + '","keys":[' + b + "]}";
		TGS.SendMessage("partner_data", "get", c, TGS.onGamePartnerInfoReceived, TGS.onGamePartnerInfoError)
	},
	masterConnect: function(a) {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "PartnerBridge.masterConnect called"),
		this._mFacebookServicesAllowed && (this._mFacebookAppID = a.facebook_app_id, this._mFacebookLibLoaded && this._mFacebookAppID && "undefined" != typeof FB && this.initFacebook()),
		this.connect(a),
		TGS.Analytics._init(TGS._sConfig || {}),
		TGS._sUserID || TGS.Debug.Log(TGS.Debug.LOG_INFO, "waiting on user id from partner... (TGS.onUserInfoAvailable has not been fired)")
	},
	connect: function() {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "PartnerBridge.connect called"),
		this.getLoginStatus()
	},
	initFacebook: function() {
		if (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "PartnerBridge.initFacebook called"), !this._mFacebookInitialized) {
			if (!this._mFacebookAppID) return void(null !== TGS._sGamePartnerInfo && TGS.Debug.Log(TGS.Debug.LOG_ERROR, "cannot initialize Facebook without a Facebook app id (connection problem or the id was not defined in the TGS db)"));
			TGS.Debug.Log(TGS.Debug.LOG_INFO, "Calling FB.init, appId = " + this._mFacebookAppID),
			FB.init({
				appId: this._mFacebookAppID,
				channelUrl: "//channel.html",
				status: !0,
				cookie: !0,
				xfbml: !0
			}),
			FB.Event.subscribe("auth.authResponseChange",
			function(a) {
				TGS.Debug.Log(TGS.Debug.LOG_INFO, "the Facebook session status changed to " + a.status)
			}),
			this._mFacebookInitialized = !0
		}
	},
	loginToFacebook: function(a, b) {
		this._mFacebookLoginRequiredCallback = a,
		this._mFacebookLoggedInCallback = b,
		this._mFacebookInitialized || this.initFacebook(),
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "calling FB.getLoginStatus..."),
		("string" != typeof window.location.host || -1 === window.location.host.indexOf("tresensa.com")) && TGS.Debug.Log(TGS.Debug.LOG_WARNING, "FB.getLoginStatus will only work if the game is hosted on an approved domain (typically tresensa.com)"),
		FB.getLoginStatus(this.onGetFBLoginStatus.bind(this))
	},
	onGetFBLoginStatus: function(a) {
		"connected" === a.status ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "user is logged into Facebook and authorized the app"), this._mFacebookUserID = a.authResponse.userID, this._mFacebookAccessToken = a.authResponse.accessToken, null !== this._mFacebookLoggedInCallback && this._mFacebookLoggedInCallback.call(this, this._mFacebookUserID)) : "not_authorized" === a.status ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "user is logged into Facebook but has not authorized the app"), null !== this._mFacebookLoginRequiredCallback && this._mFacebookLoginRequiredCallback.call(this)) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "user is not logged into Facebook"), null !== this._mFacebookLoginRequiredCallback && this._mFacebookLoginRequiredCallback.call(this))
	},
	promptForFacebookAuthorization: function(a) {
		this._mFacebookLoginRequiredCallback = a ? a: null,
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "prompting user for Facebook login and/or app authorization...");
		var b = "publish_actions,user_games_activity";
		TGS.Leaderboard.RequestUserLocation && (b += ",user_location"),
		FB.login(this.onGetFBLoginStatus.bind(this), {
			scope: b
		})
	},
	getLoginStatus: function() {
		var a = TGS.localStorage.getItem(TGS._sLSKeys.TGS_userid);
		a ? (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "userID retrieved from local storage: " + a), this._mUsername = TGS.localStorage.getItem(TGS._sLSKeys.TGS_username), this._mAvatarURL = TGS.localStorage.getItem(TGS._sLSKeys.TGS_avatar), this._mUserLocation = TGS.localStorage.getItem(TGS._sLSKeys.TGS_location)) : (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "userID was not available in local storage"), a = this.generateGuestUserID()),
		a === TGS.localStorage.getItem(TGS._sLSKeys.TGS_loggedin_user) && this.verifyLocalLogin(a),
		null !== this.onUserInfoAvailable && (a = TGS.localStorage.getItem(TGS._sLSKeys.TGS_userid), this.onUserInfoAvailable.call(this, a))
	},
	generateGuestUserID: function() {
		var a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
		function(a) {
			var b = 16 * Math.random() | 0,
			c = "x" == a ? b: 3 & b | 8;
			return c.toString(16)
		});
		return TGS.Debug.Log(TGS.Debug.LOG_INFO, "generated GUID for guest: " + a),
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "saving userID to local storage: " + a),
		TGS.localStorage.setItem(TGS._sLSKeys.TGS_userid, a),
		a
	},
	verifyLocalLogin: function(a) {
		this.userLoggedIn(null, a)
	},
	userLoggedIn: function(a, b) {
		var c = TGS.localStorage.getItem(TGS._sLSKeys.TGS_loggedin_user);
		if (c && this._mLoggedIn) return void(b === c ? TGS.Debug.Log(TGS.Debug.LOG_WARNING, "PartnerBridge.userLoggedIn: user " + b + " is already logged in") : (TGS.Debug.Log(TGS.Debug.LOG_ERROR, "PartnerBridge.userLoggedIn: there is already a logged in user"), TGS._LoginFailed(a)));
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "user '" + b + "' is logging in...");
		var d = c === b.toString();
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "(user was " + (d ? "": "NOT") + " previously logged in)"),
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "user name: " + this._mUsername),
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "user avatar: " + this._mAvatarURL),
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "user location: " + this._mUserLocation),
		this._mUsername && TGS.localStorage.setItem(TGS._sLSKeys.TGS_username, this._mUsername),
		this._mAvatarURL && TGS.localStorage.setItem(TGS._sLSKeys.TGS_avatar, this._mAvatarURL),
		this._mUserLocation && TGS.localStorage.setItem(TGS._sLSKeys.TGS_location, this._mUserLocation);
		var e = null == c;
		TGS.localStorage.setItem(TGS._sLSKeys.TGS_loggedin_user, b.toString()),
		TGS.localStorage.setItem(TGS._sLSKeys.TGS_userid, b),
		TGS._sUserID = b.toString(),
		this._mLoggedIn = !0,
		TGS.DataStore._sSaveToTGSServer = !0,
		a ? TGS.DataStore.ReloadData({
			location: d ? "local": "remote",
			useLocalIfEmpty: e,
			onSuccess: TGS._LoginSucceeded.bind(null, a)
		}) : TGS._LoginSucceeded()
	},
	updateLocalStorageData: function() {
		var a = TGS.localStorage.getItem("TGS_userid");
		a && (TGS.localStorage.setItem(TGS._sLSKeys.TGS_userid, a), TGS.localStorage.removeItem("TGS_userid"));
		var b = TGS.localStorage.getItem("TGS_datastore");
		b && (TGS.localStorage.setItem(TGS._sLSKeys.TGS_datastore, b), TGS.localStorage.removeItem("TGS_datastore"))
	},
	getImageURL: function(a) {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "PartnerBridge.getImageURL called");
		var b = a.item.image;
		if ("undefined" != typeof window.TGE) {
			var c = window.TGE.AssetManager,
			d = c.GetImage(a.item.image);
			d && (b = d.src, TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "full image url is " + b))
		}
		return b
	},
	openURL: function(a, b, c) {
		window.open(a, b || "_blank", c)
	},
	advertising_injectAd: function(a, b) {
		var c = this.advertising_getAdServerURL(a.placement ? TGS._sConfig.ADS.INTERSTITIAL_PLACEMENT_ID: TGS._sConfig.ADS.DISPLAY_PLACEMENT_ID, a.placement ? 0 : 170);
		a.element = document.createElement("div"),
		a.element.id = "tgs_display_ad",
		a.element.style.position = "absolute",
		a.element.style.zIndex = 3,
		a.element.style.webkitTransformOrigin = "center center",
		a.element.style.MozTransformOrigin = "center center",
		a.element.style.msTransformOrigin = "center center",
		a.element.style.OTransformOrigin = "center center",
		a.element.style.transformOrigin = "center center";
		var d = a.fullscreen ? "%": "px",
		e = "<iframe id='tgs_display_ad_iframe' width='" + a.width + d + "' height='" + a.height + d + "' style='border: none; overflow: hidden;' scroll='no' src='" + c + "'></iframe>";
		a.placement && (e = "<div width='" + a.width + d + "' height='" + a.height + d + "' id='tgs-ad-frame' class='tgs-ad-frame'><span>Advertisement</span>" + e + "</div>"),
		a.element.innerHTML = e,
		b.insertBefore(a.element, b.firstChild),
		a._reposition(b)
	},
	advertising_injectInterstitial: function(a) {
		var b = a.parentDiv,
		c = a.blurDiv,
		d = "undefined" == typeof a.skipDelay ? 3 : a.skipDelay,
		e = "undefined" == typeof a.overlayRed ? 1 : a.overlayRed,
		f = "undefined" == typeof a.overlayGreen ? 1 : a.overlayGreen,
		g = "undefined" == typeof a.overlayBlue ? 1 : a.overlayBlue,
		h = "undefined" == typeof a.overlayOpacity ? .6 : a.overlayOpacity;
		TGS.Utils.isTGEGame() && TGE.Game.GameDiv() ? (b || (b = TGE.Game.GameDiv()), c || (c = b.getElementsByTagName("canvas")[0])) : b || (b = document.body);
		var i, j = function() {
			q._reposition(p),
			TGS.BrowserDetect.onAndroid ? (clearTimeout(i), i = setTimeout(function() {
				q._reposition(p)
			},
			550)) : q._reposition(p)
		},
		k = function() {
			r.style.visibility = "visible",
			r.style.cursor = "pointer",
			r.addEventListener("click", l, !0),
			r.addEventListener("touchstart", l, !0)
		},
		l = function() {
			q.closeCallback = a.closeCallback,
			q.close(),
			p.parentNode.removeChild(p),
			r.removeEventListener("click", l),
			r.removeEventListener("touchstart", l),
			s.forEach(function(a) {
				p.removeEventListener(a, m)
			}),
			window.removeEventListener("resize", j),
			c && c.classList.remove("tgs-blur")
		},
		m = function(a) {
			return a.stopPropagation(),
			a.preventDefault(),
			a.stopImmediatePropagation(),
			!1
		},
		n = b.clientWidth,
		o = b.clientHeight,
		p = document.createElement("div");
		var q = document.createElement("div");
		var s = ["click", "mousedown", "mouseup", "mousemove", "touchstart", "touchend", "touchmove"];
		s.forEach(function(a) {
			p.addEventListener(a, m, !1)
		}),
		window.addEventListener("resize", j, !1),
		c
	},
	advertising_getAdServerURL: function(a, b) {
		//var c = TGS._sConfig.NATIVE_APP || TGS._sConfig.TIZEN_APP ? "http:": "";
		//return c = ["//adserver.adtechus.com/adiframe/3.0/5421.1/", a, "/0/", b, "/ADTECH;target=_blank", ";key=", TGS._sConfig.DST_ID, ";kvenv=", encodeURIComponent(TGS.BrowserDetect.platform)].join("")
	},
	advertising_closeAd: function(a) {
		a.element && a.element.parentNode && a.element.parentNode.removeChild(a.element)
	},
	analytics_getProviders: function() {
		return [TGS.Analytics.GoogleAnalyticsProvider]
	}
},
TGS.DataStore = function() {},
TGS.DataStore.onDataChanged = null,
TGS.DataStore.GameData = null,
TGS.DataStore._sSaveToTGSServer = !0,
TGS.DataStore._sSaveToLocalStorage = !1,
TGS.DataStore.ReloadGameData = function(a, b) {
	if (!TGS._sPartnerBridge.supportsDatastore()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "datastore operations are not available on this distribution partner");
	if (! (TGS._sPartnerID && TGS._sGameID && TGS._sUserID && TGS._sPartnerBridge && TGS._sPartnerBridge.isReady())) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "TGS.DataStore.ReloadGameData - TGS is not ready yet"),
	void(b && b.call(this, "TGS was not ready"));
	var c = TGS._sPartnerID;
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "fetching complete game state...");
	var d = !1;
	if (TGS.DataStore._sSaveToLocalStorage) {
		var e = TGS.localStorage.getItem(TGS._sLSKeys.TGS_datastore);
		e || (e = "{}", TGS.Debug.Log(TGS.Debug.LOG_INFO, "there was no local TGS.DataStore data"), d = !0);
		var f = TGS.DataStore.GameData = JSON.parse(e);
		a && (!d || d && !TGS.DataStore._sSaveToTGSServer) && (a.call(this, f), a = null, b = null)
	}
	if (TGS.DataStore._sSaveToTGSServer) {
		var g = '{"game":"' + TGS._sGameID + '","partner":"' + c + '","user":"' + TGS._sUserID + '","keys":[]}',
		h = new TGS.DataStoreRequest;
		h.type = "reload",
		h.onSuccess = a,
		h.onFailure = b,
		h.params = g,
		h.noLocalData = d,
		TGS.SendMessage("game_data", "get", g, TGS.DataStore._SuccessCallback.bind(this, h), TGS.DataStore._ErrorCallback.bind(this, h))
	}
},
TGS.DataStore.ReloadData = function(a) {
	if (!TGS._sPartnerBridge.supportsDatastore()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "datastore operations are not available on this distribution partner");
	if (! (TGS._sPartnerID && TGS._sGameID && TGS._sUserID && TGS._sPartnerBridge && TGS._sPartnerBridge.isReady())) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "TGS.DataStore.ReloadGameData - TGS is not ready yet"),
	void(a.onFailure && a.onFailure.call(this, "TGS was not ready"));
	var b = TGS._sPartnerID;
	if (TGS.Debug.Log(TGS.Debug.LOG_INFO, "fetching complete game state (" + a.location + ")..."), "local" === a.location) {
		var c = TGS.localStorage.getItem(TGS._sLSKeys.TGS_datastore);
		c || (c = "{}", TGS.Debug.Log(TGS.Debug.LOG_INFO, "there was no local TGS.DataStore data"));
		var d = TGS.DataStore.GameData = JSON.parse(c);
		return void(a.onSuccess && a.onSuccess.call(this, d))
	}
	if ("remote" === a.location) {
		var e = '{"game":"' + TGS._sGameID + '","partner":"' + b + '","user":"' + TGS._sUserID + '","keys":[]}',
		f = new TGS.DataStoreRequest;
		f.type = "reload",
		f.useLocalIfEmpty = a.useLocalIfEmpty,
		f.onSuccess = a.onSuccess,
		f.onFailure = a.onFailure,
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "requesting game data with params: " + e),
		TGS.SendMessage("game_data", "get", e, TGS.DataStore._ReloadSuccessCallback.bind(this, f), TGS.DataStore._ErrorCallback.bind(this, f))
	}
},
TGS.DataStore._ReloadSuccessCallback = function(a, b) {
	if (!b || "undefined" == typeof b.code) return void TGS.DataStore._ErrorCallback(a, "response object is malformed", b);
	if (0 !== b.code) return void TGS.DataStore._ErrorCallback(a, "internal request error code: " + b.code, b);
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "received game data: " + JSON.stringify(b.values));
	var c = b.values;
	"[object Array]" === Object.prototype.toString.call(c) && (c = {});
	var d = !0;
	for (var e in c) if (c.hasOwnProperty(e)) {
		d = !1;
		break
	}
	if (d && a.useLocalIfEmpty) {
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "there was no remote game data for this user, falling back to local storage...");
		var f = TGS.localStorage.getItem(TGS._sLSKeys.TGS_datastore);
		f || (f = "{}"),
		c = JSON.parse(f),
		d = !1
	}
	if (TGS.DataStore.GameData = c, d) TGS.localStorage.removeItem(TGS._sLSKeys.TGS_datastore);
	else {
		var f = JSON.stringify(TGS.DataStore.GameData);
		TGS.localStorage.setItem(TGS._sLSKeys.TGS_datastore, f)
	}
	TGS.DataStore._DataUpdated(),
	a.onSuccess ? a.onSuccess.call(this, c) : TGS.Debug.Log(TGS.Debug.LOG_INFO, "remote DataStore request was successful")
},
TGS.DataStore.ClearLocalData = function() {
	TGS.DataStore.GameData = {},
	TGS.localStorage.removeItem(TGS._sLSKeys.TGS_datastore),
	TGS.DataStore._DataUpdated()
},
TGS.DataStore._DataUpdated = function() {
	if (window.TGE) {
		var a = TGE.Game.GetInstance();
		a && a._onTGSDatastoreUpdated && a._onTGSDatastoreUpdated()
	}
	TGS.DataStore.onDataChanged && TGS.DataStore.onDataChanged.call(this)
},
TGS.DataStore.ImportGameData = function(a, b, c, d) {
	if (!TGS._sPartnerBridge.supportsDatastore()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "datastore operations are not available on this distribution partner");
	if (! (TGS._sPartnerID && TGS._sGameID && TGS._sUserID && TGS._sPartnerBridge && TGS._sPartnerBridge.isReady())) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "TGS.DataStore.ReloadGameData - TGS is not ready yet"),
	void(d && d.call(this, "TGS was not ready"));
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "importing complete game state...");
	var e = '{"game":"' + TGS._sGameID + '","partner":"' + a + '","user":"' + b + '","keys":[]}',
	f = new TGS.DataStoreRequest;
	f.type = "reload",
	f.onSuccess = c,
	f.onFailure = d,
	f.params = e,
	TGS.SendMessage("game_data", "get", e, TGS.DataStore._SuccessCallback.bind(this, f), TGS.DataStore._ErrorCallback.bind(this, f))
},
TGS.DataStore._SuccessCallback = function(a, b) {
	if (!b || "undefined" == typeof b.code) return void TGS.DataStore._ErrorCallback(a, "response object is malformed", b);
	if (0 !== b.code) return void TGS.DataStore._ErrorCallback(a, "internal request error code: " + b.code, b);
	if (!a.noLocalData && TGS.DataStore._sSaveToLocalStorage) return void TGS.Debug.Log(TGS.Debug.LOG_INFO, "remote DataStore request was successful");
	var c = null;
	"reload" === a.type && (c = b.values, "[object Array]" === Object.prototype.toString.call(c) && (c = {}), TGS.DataStore.GameData = c),
	a.onSuccess ? a.onSuccess.call(this, c) : TGS.Debug.Log(TGS.Debug.LOG_INFO, "remote DataStore request was successful")
},
TGS.DataStore._ErrorCallback = function(a, b, c) {
	a.onFailure ? a.onFailure.call(this, b, c) : TGS.Debug.Log(TGS.Debug.LOG_ERROR, "remote DataStore request failed: " + b)
},
TGS.DataStore.FetchStringValue = function(a, b) {
	return TGS._sPartnerBridge.supportsDatastore() ? TGS.IsReady() ? "undefined" == typeof TGS.DataStore.GameData[a] ? (TGS.Debug.Log(TGS.Debug.LOG_WARNING, "no value stored for '" + a + "', using default"), b) : TGS.DataStore.GameData[a] : (TGS.Debug.Log(TGS.Debug.LOG_WARNING, "DataStore tried to fetch value '" + a + "' before TGS was ready"), b) : (TGS.Debug.Log(TGS.Debug.LOG_WARNING, "datastore operations are not available on this distribution partner"), b)
},
TGS.DataStore.FetchIntValue = function(a, b) {
	return parseInt(TGS.DataStore.FetchStringValue(a, b))
},
TGS.DataStore.FetchFloatValue = function(a, b) {
	return parseFloat(TGS.DataStore.FetchStringValue(a, b))
},
TGS.DataStore.SaveValue = function(a, b, c, d) {
	if (!TGS._sPartnerBridge.supportsDatastore()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "datastore operations are not available on this distribution partner");
	if (!TGS.IsReady()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "DataStore tried to save value for '" + a + "' before TGS was ready");
	var e = TGS._sPartnerID;
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "saving new value for '" + a + "' to datastore...");
	var f = {};
	f[a] = b;
	var g = '"values":' + JSON.stringify(f);
	if (TGS.DataStore.GameData[a] = b.toString(), TGS.DataStore._sSaveToLocalStorage) {
		var h = JSON.stringify(TGS.DataStore.GameData);
		TGS.localStorage.setItem(TGS._sLSKeys.TGS_datastore, h),
		c && c.call(this, null)
	}
	if (TGS.DataStore._sSaveToTGSServer) {
		TGS.DataStore._sSaveToLocalStorage && (c = null, d = null);
		var i = '{"game":"' + TGS._sGameID + '","partner":"' + e + '","user":"' + TGS._sUserID + '",' + g + "}",
		j = new TGS.DataStoreRequest;
		j.type = "save",
		j.onSuccess = c,
		j.onFailure = d,
		j.params = i,
		TGS.SendMessage("game_data", "set", i, TGS.DataStore._SuccessCallback.bind(this, j), TGS.DataStore._ErrorCallback.bind(this, j))
	}
	TGS.DataStore._DataUpdated()
},
TGS.DataStore.SaveValues = function(a, b, c) {
	if (!TGS._sPartnerBridge.supportsDatastore()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "datastore operations are not available on this distribution partner");
	if (!TGS.IsReady()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "DataStore tried to save values before TGS was ready");
	var d = TGS._sPartnerID;
	if (TGS.DataStore.SaveValuesLocally(a), TGS.DataStore._sSaveToLocalStorage) {
		var e = JSON.stringify(TGS.DataStore.GameData);
		TGS.localStorage.setItem(TGS._sLSKeys.TGS_datastore, e),
		b && b.call(this, null)
	}
	if (TGS.DataStore._sSaveToTGSServer) {
		TGS.DataStore._sSaveToLocalStorage && (b = null, c = null);
		var f = '"values":' + JSON.stringify(a);
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "saving new values to server " + f + "...");
		var g = '{"game":"' + TGS._sGameID + '","partner":"' + d + '","user":"' + TGS._sUserID + '",' + f + "}",
		h = new TGS.DataStoreRequest;
		h.type = "save",
		h.onSuccess = b,
		h.onFailure = c,
		h.params = g,
		TGS.SendMessage("game_data", "set", g, TGS.DataStore._SuccessCallback.bind(this, h), TGS.DataStore._ErrorCallback.bind(this, h))
	}
},
TGS.DataStore.SaveValuesLocally = function(a, b) {
	if (b = "undefined" == typeof b ? !1 : b, !TGS._sPartnerBridge.supportsDatastore()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "datastore operations are not available on this distribution partner");
	if (!TGS.IsReady()) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "DataStore tried to save values before TGS was ready");
	for (var c in a) a.hasOwnProperty(c) && (TGS.DataStore.GameData[c] = a[c].toString());
	if (b) {
		var d = JSON.stringify(TGS.DataStore.GameData);
		TGS.localStorage.setItem(TGS._sLSKeys.TGS_datastore, d)
	}
	TGS.DataStore._DataUpdated()
},
TGS.DataStoreRequest = function() {
	this.type = "",
	this.onSuccess = null,
	this.onFailure = null,
	this.noLocalData = !1
},
TGS.Microtransactions = function() {},
TGS.Microtransactions.DefaultPurchaseFailedMessage = "The purchase was not completed.",
TGS.Microtransactions.UseTGSErrorMessages = !0,
TGS.Microtransactions._PendingRequest = null,
TGS.Microtransactions._PurchaseOverlay = null,
TGS.Microtransactions._sIAPProducts = [],
TGS.Microtransactions._sAppURLs = [],
TGS.Microtransactions._sNumRestoredPurchases = 0,
TGS.Microtransactions.RestorePurchaseCallback = null,
TGS.Microtransactions.RestorePurchases = function() {
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "restore purchases requested..."),
	TGS.Microtransactions._PurchaseOverlay = TGS.LoadingOverlay(),
	TGS.Microtransactions._sNumRestoredPurchases = 0,
	TGS._sPartnerBridge.restorePurchases()
},
TGS.Microtransactions._RestorePurchaseCallback = function(a) {
	return null === TGS.Microtransactions.RestorePurchaseCallback ? void TGS.Debug.Log(TGS.Debug.LOG_ERROR, "no TGS.Microtransactions.RestorePurchaseCallback defined, cannot restore " + a) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "calling RestorePurchaseCallback for TGS item " + a), TGS.Microtransactions.RestorePurchaseCallback(a), void TGS.Microtransactions._sNumRestoredPurchases++)
},
TGS.Microtransactions._RestorePurchasesDone = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "restoring purchases " + (a ? "successful": "failed") + " (" + TGS.Microtransactions._sNumRestoredPurchases + " total)"),
	TGS.Microtransactions._PurchaseOverlay && (TGS.Microtransactions._PurchaseOverlay.parentNode.removeChild(TGS.Microtransactions._PurchaseOverlay), TGS.Microtransactions._PurchaseOverlay = null),
	a && TGS.Microtransactions._sNumRestoredPurchases > 0 ? (TGS.OverlayMessage({
		title: "Done!",
		message: "Your non-consumable purchases have been successfully restored."
	}), TGS.DataStore._DataUpdated()) : TGS.OverlayMessage(a && 0 === TGS.Microtransactions._sNumRestoredPurchases ? {
		title: "Sorry...",
		message: "We did not find any previous non-consumable purchases associated with your account."
	}: {
		title: "Sorry...",
		message: "Unable to restore purchases."
	})
},
TGS.Microtransactions.PriceAsFormattedString = function(a) {
	return TGS._sPartnerBridge.priceAsFormattedString(a)
},
TGS.Microtransactions.FormattedPriceForItem = function(a) {
	return TGS._sPartnerBridge.formattedPriceForItem(a)
},
TGS.Microtransactions.CurrencyIcon = function() {
	return TGS._sPartnerBridge.supportsMicrotransactions() ? TGS._sPartnerBridge.currencyIcon() : null
},
TGS.Microtransactions.PriceAsUSD = function(a) {
	return (10 * a / 100 - .01).toFixed(2)
},
TGS.Microtransactions.PaymentProviderName = function() {
	return TGS._sPartnerBridge.paymentProviderName()
},
TGS.Microtransactions.GetIAPProducts = function() {
	return TGS.Microtransactions._sIAPProducts
},
TGS.Microtransactions.GetIAPProduct = function(a, b) {
	b = b || "id";
	for (var c = 0; c < TGS.Microtransactions._sIAPProducts.length; c++) {
		var d = TGS.Microtransactions._sIAPProducts[c];
		if (d[b] === a) return d
	}
	return null
},
TGS.Microtransactions.HasNonConsumables = function() {
	for (var a = 0; a < TGS.Microtransactions._sIAPProducts.length; a++) if (!TGS.Microtransactions._sIAPProducts[a].consumable) return ! 0;
	return ! 1
},
TGS.Microtransactions.PurchaseProduct = function(a) {
	if (!TGS._sPartnerBridge.supportsMicrotransactions()) return void TGS.Microtransactions.RedirectToIAPPartner();
	if (null !== TGS.Microtransactions._PendingRequest) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "purchase request ignored - one is already pending");
	var b = a.onFailure;
	TGS.Microtransactions.UseTGSErrorMessages && (b = TGS.Microtransactions._PurchaseFailedMessage.bind(this, a.onFailure));
	var c = !0,
	d = "";
	if ("object" != typeof a ? (c = !1, d += "params ") : ("undefined" == typeof a.productID && (c = !1, d += "productID "), "object" != typeof a.gameDataUpdates && (c = !1, d += "gameDataUpdates ")), !c) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "Invalid values sent to TGS.Microtransactions.PurchaseProduct for the following params: " + d),
	void(a && a.onFailure && b.call(this, a.productID, TGS.Microtransactions.DefaultPurchaseFailedMessage));
	var e = TGS.Microtransactions.GetIAPProduct(a.productID);
	if (!e) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "Unknown IAP product: " + a.productID),
	void(a.onFailure && b.call(this, a.productID, TGS.Microtransactions.DefaultPurchaseFailedMessage));
	if (!e.consumable && null === TGS.Microtransactions.RestorePurchaseCallback) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "Attempt to purchase non-consumable item " + a.productID + " without defining a TGS.Microtransactions.RestorePurchaseCallback (TGE games can also implement onTGSPurchaseRestored in their game class)"),
	void(a.onFailure && b.call(this, a.productID, TGS.Microtransactions.DefaultPurchaseFailedMessage));
	if (!TGS.LoggedIn()) return void TGS.OverlayMessage({
		title: "Login Required",
		message: "You will now be asked to login. Once you are logged in you will be able to make in-app purchases.",
		buttonAction: TGS.LoginUser.bind(this, {
			onUserCancel: TGS.OverlayMessage.bind(this, {
				title: "Login Required",
				message: "You must be logged in to make in-app purchases."
			}),
			onFailure: TGS.OverlayMessage.bind(this, {
				title: "Login Error",
				message: "There was a problem logging you in."
			})
		})
	});
	var f = a.productID,
	g = a.onSuccess,
	h = b,
	i = a.gameDataUpdates,
	j = new TGS.Microtransactions.Item(f, e.title, e.description, e.price, e.iconUrl, e.partnerProductID);
	if (!TGS.IsReady()) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "tried to purchase product " + f + " but TGS was not ready"),
	void(h && h.call(this, f, TGS.Microtransactions.DefaultPurchaseFailedMessage));
	var k = new TGS.Microtransactions.Request;
	k.item = j,
	k.onSuccess = g,
	k.onFailure = h,
	k.userErrorMessage = TGS.Microtransactions.DefaultPurchaseFailedMessage,
	k.gameDataUpdates = i,
	TGS.Microtransactions._BeginNewRequest(k),
	TGS._sPartnerBridge.logTransactionBeforePartnerRequest() ? TGS.Microtransactions._LogPurchaseRequest(k) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "requesting purchase from partner..."), TGS._sPartnerBridge.purchaseItem(k))
},
TGS.Microtransactions.PurchaseItem = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_ERROR, "The TGS.Microtransactions.PurchaseItem IAP CALL IS NO LONGER SUPPORTED! USE TGS.Microtransactions.PurchaseProduct INSTEAD!!"),
	a && a.onFailure && a.onFailure.call(this, a.itemID, TGS.Microtransactions.DefaultPurchaseFailedMessage)
},
TGS.Microtransactions.RedirectToIAPPartner = function() {
	var a = null,
	b = null,
	c = "In-app purchasing is not supported here.",
	d = !1;
	if (TGS.Microtransactions._sAppURLs.facebook_app_url && (a = TGS.Microtransactions._sAppURLs.facebook_app_url, b = TGS._IMAGES_LOCATION + "redirects/facebook.png"), TGS.BrowserDetect.oniOS && TGS.Microtransactions._sAppURLs.itunes_app_url) {
		a = TGS.Microtransactions._sAppURLs.itunes_app_url,
		b = TGS._IMAGES_LOCATION + "redirects/itunes.png";
		var d = !0
	} else if (TGS.BrowserDetect.onAndroid && TGS.Microtransactions._sAppURLs.googleplay_app_url) {
		a = TGS.Microtransactions._sAppURLs.googleplay_app_url,
		b = TGS._IMAGES_LOCATION + "redirects/googleplay.png";
		var d = !0
	} else if ("Kindle Fire" === TGS.BrowserDetect.platform && TGS.Microtransactions._sAppURLs.amazon_app_url) {
		a = TGS.Microtransactions._sAppURLs.amazon_app_url,
		b = TGS._IMAGES_LOCATION + "redirects/amazon.png";
		var d = !0
	} else if (TGS.BrowserDetect.onWindowsMobile && TGS.Microtransactions._sAppURLs.windows_app_url) {
		a = TGS.Microtransactions._sAppURLs.windows_app_url,
		b = TGS._IMAGES_LOCATION + "redirects/windows.png";
		var d = !0
	}
	a && (c += " You can buy items by " + (d ? "downloading the app:": "playing the game on:")),
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "IAP is not available on this partner, suggesting redirect to " + a),
	TGS.OverlayMessage({
		title: "Sorry!",
		message: c,
		buttonText: "",
		button2Image: b,
		button2Callback: function() {
			window.open(a, "_blank")
		}
	})
},
TGS.Microtransactions._PurchaseFailedMessage = function(a, b, c) {
	"string" == typeof c && c.length > 0 ? TGS.OverlayMessage({
		title: "Purchase Failed",
		message: c
	}) : "object" == typeof c && TGS.OverlayMessage(c),
	a && a.call(this, b, c)
},
TGS.Microtransactions._LogPurchaseRequest = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "user request to purchase item " + a.item.id + "...");
	var b = '{"game":"' + TGS._sGameID + '","partner":"' + TGS._sPartnerID + '","user":"' + TGS._sUserID + '","item":"' + a.item.id + '"}';
	TGS.SendMessage("mtx/mtx_data", "add", b, TGS.Microtransactions._InitiatePurchase.bind(this, a), TGS.Microtransactions._LoggingPurchaseFailed.bind(this, a))
},
TGS.Microtransactions._InitiatePurchase = function(a, b) {
	if (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "purchase request id received: " + JSON.stringify(b)), !b || "undefined" == typeof b.code) return TGS.Debug.Log(TGS.Debug.LOG_INFO, "purchase request response was corrupt"),
	void TGS.Microtransactions._LoggingPurchaseFailed(a);
	if (0 !== b.code) return TGS.Debug.Log(TGS.Debug.LOG_INFO, "purchase request response contained error code: " + b.code),
	void TGS.Microtransactions._LoggingPurchaseFailed(a);
	var c = parseInt(b.id);
	return isNaN(c) || 0 >= c ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "transaction id is invalid: " + c.toString()), void TGS.Microtransactions._LoggingPurchaseFailed(a)) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "transaction id is: " + c), a.transactionID = c, TGS.Debug.Log(TGS.Debug.LOG_INFO, "requesting purchase from partner..."), void TGS._sPartnerBridge.purchaseItem(a))
},
TGS.Microtransactions._LoggingPurchaseFailed = function(a, b, c) {
	var d = TGS.Microtransactions.DefaultPurchaseFailedMessage,
	e = "could not record IAP request";
	c && 12 === c.code && (d = "You already own this item.", e = "IAP was already purchased by user"),
	TGS.Debug.Log(TGS.Debug.LOG_ERROR, e),
	a.onFailure && a.onFailure.call(this, a.item.id, d),
	TGS.Microtransactions._ClosePendingRequest()
},
TGS.Microtransactions._PartnerPurchaseSuccessful = function(a) {
	if (console.log(JSON.stringify(a)), TGS.Debug.Log(TGS.Debug.LOG_INFO, "purchase successful for item " + a.item.id), TGS.Microtransactions._SavePurchaseLocally(a.gameDataUpdates), TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "local game data has now been updated"), TGS._sPartnerBridge.serverHandlesMicrotransactionResponse()) TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "server has already logged transaction"),
	a.onSuccess && a.onSuccess.call(this, a.item.id);
	else if (TGS._sPartnerBridge.logTransactionBeforePartnerRequest()) {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "sending transaction response and game data updates to server...");
		var b = '{"id":' + a.transactionID + ',"state":1,"partner_transaction_id":"' + a.partnerTransactionID + '","credits":' + (a.usingCredits ? "true": "false") + ',"notes":null,"game_data_changes":' + JSON.stringify(a.gameDataUpdates) + "}";
		TGS.SendMessage("mtx/mtx_data", "update", b, TGS.Microtransactions._TransactionFinalized.bind(this, a, !0), TGS.Microtransactions._FinalizationFailed.bind(this, a, !0))
	} else {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "sending full transaction info to server...");
		var b = '{"game":"' + TGS._sGameID + '","partner":"' + TGS._sPartnerID + '","user":"' + TGS._sUserID + '","item":"' + a.item.id + '","credits":' + (a.usingCredits ? "true": "false") + ',"state":1,"partner_transaction_id":"' + a.partnerTransactionID + '","notes":null,"game_data_changes":' + JSON.stringify(a.gameDataUpdates) + "}";
		TGS.SendMessage("mtx/mtx_data", "add", b, TGS.Microtransactions._TransactionFinalized.bind(this, a, !0), TGS.Microtransactions._FinalizationFailed.bind(this, a, !0))
	}
	TGS.Microtransactions._ClosePendingRequest(),
	TGS._sPartnerBridge.purchaseComplete(a),
	TGS.Analytics._logPurchase(a)
},
TGS.Microtransactions._PartnerPurchaseFailed = function(a) {
	if (TGS.Debug.Log(TGS.Debug.LOG_ERROR, "purchase failed for item " + a.item.id + ", reason: " + a.internalErrorMessage), TGS._sPartnerBridge.serverHandlesMicrotransactionResponse()) TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "server has already logged transaction"),
	a.onFailure && a.onFailure.call(this, a.item.id, a.userErrorMessage);
	else if (TGS._sPartnerBridge.logTransactionBeforePartnerRequest()) {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "sending transaction response to server...");
		var b = '{"id":' + a.transactionID + ',"state":2,"partner_transaction_id":"' + a.partnerTransactionID + '","credits":' + (a.usingCredits ? "true": "false") + ',"notes":"' + a.internalErrorMessage + '","game_data_changes":null}';
		TGS.SendMessage("mtx/mtx_data", "update", b, TGS.Microtransactions._TransactionFinalized.bind(this, a, !1), TGS.Microtransactions._FinalizationFailed.bind(this, a, !1))
	} else {
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "sending full transaction info to server...");
		var b = '{"game":"' + TGS._sGameID + '","partner":"' + TGS._sPartnerID + '","user":"' + TGS._sUserID + '","item":"' + a.item.id + '","credits":' + (a.usingCredits ? "true": "false") + ',"state":2,"partner_transaction_id":"' + a.partnerTransactionID + '","notes":"' + a.internalErrorMessage + '","game_data_changes":null}';
		TGS.SendMessage("mtx/mtx_data", "add", b, TGS.Microtransactions._TransactionFinalized.bind(this, a, !1), TGS.Microtransactions._FinalizationFailed.bind(this, a, !1))
	}
	TGS.Microtransactions._ClosePendingRequest()
},
TGS.Microtransactions._TransactionFinalized = function(a, b) {
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, (b ? "successful": "failed") + " transaction " + a.transactionID + " has been logged"),
	b && a.onSuccess ? a.onSuccess.call(this, a.item.id) : !b && a.onFailure && a.onFailure.call(this, a.item.id, a.userErrorMessage)
},
TGS.Microtransactions._SavePurchaseLocally = function(a) {
	TGS.DataStore.SaveValuesLocally(a, TGS.DataStore._sSaveToLocalStorage)
},
TGS.Microtransactions._FinalizationFailed = function(a, b) {
	if (TGS.Debug.Log(TGS.Debug.LOG_ERROR, (b ? "successful": "failed") + " transaction " + a.transactionID + " could not be logged"), b && (a.internalErrorMessage = "partner transaction was successful but could not be logged to server"), a.onFailure) {
		var c = "" === a.userErrorMessage ? TGS.Microtransactions.DefaultPurchaseFailedMessage: a.userErrorMessage;
		a.onFailure.call(this, a.item.id, c)
	}
},
TGS.Microtransactions._BeginNewRequest = function(a) {
	TGS.Microtransactions._PendingRequest = a,
	TGS.Microtransactions._PurchaseOverlay = TGS.LoadingOverlay()
},
TGS.Microtransactions._ClosePendingRequest = function() {
	TGS.Microtransactions._PendingRequest = null,
	TGS.Microtransactions._PurchaseOverlay && (TGS.Microtransactions._PurchaseOverlay.parentNode.removeChild(TGS.Microtransactions._PurchaseOverlay), TGS.Microtransactions._PurchaseOverlay = null)
},
TGS.Microtransactions.GetCredits = function() {
	TGS.CloseMessageOverlay(),
	window.open("http://fortumo.com/mobile_payments/0d8f60636b898652b94ee978ee2fc43a?cuid=" + TGS._sPartnerID + TGS._sUserID, "_self")
},
TGS.Microtransactions.Item = function(a, b, c, d, e, f) {
	this.id = a,
	this.partnerProductID = f,
	this.title = b,
	this.description = c,
	this.price = d,
	this.image = e
},
TGS.Microtransactions.Request = function() {
	this.item = null,
	this.partnerProductID = "",
	this.transactionID = -1,
	this.partnerTransactionID = -1,
	this.onSuccess = null,
	this.onFailure = null,
	this.internalErrorMessage = "",
	this.userErrorMessage = "",
	this.gameDataUpdates = null,
	this.usingCredits = !1
},
TGS.BrowserDetect = {
	init: function() {
		this.browser = this.searchString(this.dataBrowser) || "an unknown browser",
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version",
		this.platform = this.searchString(this.dataPlatform) || "an unknown OS or Device",
		this.OSversion = this.detectOSversion(this.platform),
		this.isMobileDevice = !("Windows" === this.platform || "Mac" === this.platform || "Linux" === this.platform),
		this.oniOS = "iPhone" === this.platform || "iPad" === this.platform,
		this.onAndroid = "Android" === this.platform,
		this.onWindowsMobile = "Windows Phone" === this.platform || "Windows Tablet" === this.platform,
		this.usingPhoneGap = window.PhoneGap || window.cordova || window.Cordova,
		this.clickEvent = !this.isMobileDevice || this.onWindowsMobile ? "click": "touchstart"
	},
	detectOSversion: function(a) {
		var b = "-1",
		c = "",
		d = navigator.userAgent.toString();
		switch (a) {
		case "Windows Phone":
			c = /Windows Phone OS\s+[\d\.]+/,
			b = String(d.match(c)).substring(17, 20);
			break;
		case "iPhone":
		case "iPad":
			c = /OS\s+[\d\_]+/,
			b = String(d.match(c)).substring(3, 6);
			break;
		case "Windows":
			c = /Windows NT\s+[\d\.]+/;
			var e = String(d.match(c)).substring(11, 14);
			"6.1" == e ? b = "7": "5.1" == e ? b = "XP": "5.2" == e ? b = "XP": "6.0" == e ? b = "Vista": "5.01" == e ? b = "2000 SP1": "5.0" == e && (b = "2000");
			break;
		case "Mac":
			c = /Mac OS X\s+[\d\_]+/,
			b = String(d.match(c)).substring(9, 13);
			break;
		case "Android":
			c = /ndroid\s+[\d\.]+/,
			b = String(d.match(c)).substring(7, 10)
		}
		return b
	},
	searchString: function(a) {
		for (var b = 0; b < a.length; b++) if (null != a[b]) {
			var c = a[b].string,
			d = a[b].prop;
			if (this.versionSearchString = a[b].versionSearch || a[b].identity, c) {
				if ( - 1 !== c.indexOf(a[b].subString)) return a[b].identity
			} else if (d) return a[b].identity
		}
	},
	searchVersion: function(a) {
		var b = a.indexOf(this.versionSearchString);
		if ( - 1 !== b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
	},
	dataBrowser: [{
		string: navigator.userAgent,
		subString: "Chrome",
		identity: "Chrome"
	},
	{
		string: navigator.userAgent,
		subString: "MSIE",
		identity: "Explorer",
		versionSearch: "MSIE"
	},
	{
		string: navigator.userAgent,
		subString: "Explorer",
		identity: "Explorer",
		versionSearch: "Explorer"
	},
	{
		string: navigator.vendor,
		subString: "Apple",
		identity: "Safari",
		versionSearch: "Version"
	},
	{
		string: navigator.userAgent,
		subString: "Firefox",
		identity: "Firefox"
	},
	{
		prop: window.opera,
		identity: "Opera"
	},
	{
		string: navigator.userAgent,
		subString: "Silk",
		identity: "Silk",
		versionSearch: "Silk"
	},
	{
		string: navigator.userAgent,
		subString: "Kindle Fire",
		identity: "Amazon Web App",
		versionSearch: "AppleWebKit"
	},
	{
		string: navigator.userAgent,
		subString: "Gecko",
		identity: "Mozilla",
		versionSearch: "rv"
	},
	{
		string: navigator.userAgent,
		subString: "Mozilla",
		identity: "Netscape",
		versionSearch: "Mozilla"
	},
	{
		string: navigator.userAgent,
		subString: "OmniWeb",
		versionSearch: "OmniWeb/",
		identity: "OmniWeb"
	},
	{
		string: navigator.vendor,
		subString: "iCab",
		identity: "iCab"
	},
	{
		string: navigator.vendor,
		subString: "KDE",
		identity: "Konqueror"
	},
	{
		string: navigator.vendor,
		subString: "Camino",
		identity: "Camino"
	},
	{
		string: navigator.userAgent,
		subString: "Netscape",
		identity: "Netscape"
	},
	{
		string: navigator.vendor,
		subString: "BlackBerry",
		identity: "BlackBerry"
	}],
	dataPlatform: [{
		string: navigator.userAgent,
		subString: "Windows Phone",
		identity: "Windows Phone"
	},
	{
		string: navigator.userAgent,
		subString: "Tablet PC",
		identity: "Windows Tablet"
	},
	{
		string: navigator.platform,
		subString: "Win",
		identity: "Windows"
	},
	{
		string: navigator.platform,
		subString: "Mac",
		identity: "Mac"
	},
	{
		string: navigator.userAgent,
		subString: "iPhone",
		identity: "iPhone"
	},
	{
		string: navigator.userAgent,
		subString: "iPad",
		identity: "iPad"
	},
	{
		string: navigator.userAgent,
		subString: "iPod",
		identity: "iPod"
	},
	{
		string: navigator.userAgent,
		subString: "Silk",
		identity: "Kindle Fire"
	},
	{
		string: navigator.userAgent,
		subString: "Kindle Fire",
		identity: "Kindle Fire"
	},
	{
		string: navigator.userAgent,
		subString: "Android",
		identity: "Android"
	},
	{
		string: navigator.userAgent,
		subString: "webOS",
		identity: "webOS"
	},
	{
		string: navigator.userAgent,
		subString: "Mobile",
		identity: "Mobile"
	},
	{
		string: navigator.platform,
		subString: "Linux",
		identity: "Linux"
	}]
},
TGS.BrowserDetect.init(),
TGS.Leaderboard = function() {},
TGS.Leaderboard._sLeaderboardDescriptors = [],
TGS.Leaderboard.UseTGSErrorMessages = !0,
TGS.Leaderboard.RequestUserLocation = !0,
TGS.Leaderboard.GetLeaderboardDescriptors = function() {
	return TGS.Leaderboard._sLeaderboardDescriptors
},
TGS.Leaderboard.isSupported = function() {
	return ! TGS._sPartnerBridge._mDisableLeaderboard && (TGS._sPartnerBridge.implementsLeaderboard() || TGS._sPartnerBridge._mFacebookServicesAllowed || TGS._sPartnerBridge._mUseUserInfoInSLB)
},
TGS.Leaderboard.getLabel = function() {
	return TGS._sPartnerBridge._leaderboardLabel
},
TGS.Leaderboard.GetLeaderboardDescriptor = function(a) {
	for (var b = 0; b < TGS.Leaderboard._sLeaderboardDescriptors.length; b++) {
		var c = TGS.Leaderboard._sLeaderboardDescriptors[b];
		if (c.id === a) return c
	}
	return null
},
TGS.Leaderboard.ScoreFormatter = function(a) {
	return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
},
TGS.Leaderboard.Show = function(a) {
	return TGS.LoggedIn() ? void(TGS._sPartnerBridge.implementsLeaderboard() ? TGS._sPartnerBridge.showLeaderboard(a) : TGS.Leaderboard._ShowSLB(a)) : void TGS.LoginUser({
		onSuccess: TGS.Leaderboard.Show.bind(this, a),
		onUserCancel: TGS.OverlayMessage.bind(this, {
			title: "Login Required",
			message: "You must be logged in to use the leaderboard."
		}),
		onFailure: TGS.OverlayMessage.bind(this, {
			title: "Login Error",
			message: "There was a problem logging you in."
		})
	})
},
TGS.Leaderboard.SubmitScore = function(a) {
	return TGS.LoggedIn() ? void(TGS._sPartnerBridge.implementsLeaderboard() ? TGS._sPartnerBridge.submitScore(a) : TGS.Leaderboard._SubmitScoreSLB(a)) : void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "user is not logged in/authorized - silent score submit ignored")
},
TGS.Leaderboard.SubmitScoreAndShow = function(a) {
	return TGS.LoggedIn() ? void(TGS._sPartnerBridge.implementsLeaderboard() ? TGS._sPartnerBridge.submitScoreAndShow(a) : TGS.Leaderboard._SubmitScoreAndShowSLB(a)) : void TGS.LoginUser({
		onSuccess: TGS.Leaderboard.SubmitScoreAndShow.bind(this, a),
		onUserCancel: TGS.OverlayMessage.bind(this, {
			title: "Login Required",
			message: "You must be logged in to use the leaderboard."
		}),
		onFailure: TGS.OverlayMessage.bind(this, {
			title: "Login Error",
			message: "There was a problem logging you in."
		})
	})
},
TGS.Leaderboard._SubmitScoreSLB = function(a, b) {
	var c = TGS._sUserID,
	d = TGS._sPartnerID;
	if (!TGS._sPartnerBridge._mUseUserInfoInSLB) {
		if (!TGS._sPartnerBridge.loggedIntoFacebook()) return b ? void TGS._sPartnerBridge.loginToFacebook(TGS._sPartnerBridge.promptForFacebookAuthorization.bind(TGS._sPartnerBridge), TGS.Leaderboard._SubmitScoreSLB.bind(this, a)) : void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "user is not logged in/authorized on Facebook - silent score submit ignored");
		c = TGS._sPartnerBridge._mFacebookUserID,
		d = "A0003"
	}
	var e = !0,
	f = "";
	if ("object" != typeof a ? (e = !1, f += "params ") : "number" != typeof a.score && (e = !1, f += "score "), !e) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "Invalid values sent to TGS.Leaderboard.SubmitScore for the following params: " + f),
	void(a && a.onFailure && a.onFailure.call(this, a.score, a.leaderboardID));
	a.leaderboardID = "number" == typeof a.leaderboardID ? a.leaderboardID: 0;
	var g = "function" == typeof a.onFailure ? a.onFailure: null,
	h = "",
	i = "";
	TGS._sPartnerBridge._mUseUserInfoInSLB ? (h += ',"name":' + (TGS._sPartnerBridge._mUsername ? '"' + TGS._sPartnerBridge._mUsername + '"': "null"), h += ',"image_url":' + (TGS._sPartnerBridge._mAvatarURL ? '"' + TGS._sPartnerBridge._mAvatarURL + '"': "null"), h += ',"location":' + (TGS._sPartnerBridge._mUserLocation ? '"' + TGS._sPartnerBridge._mUserLocation + '"': "null")) : i += ',"facebook_access_token":' + (TGS._sPartnerBridge._mFacebookAccessToken ? '"' + TGS._sPartnerBridge._mFacebookAccessToken + '"': "null");
	var j = '{"game":"' + TGS._sGameID + '","partner":"' + d + '","leaderboard":"' + a.leaderboardID + '","user":"' + c + '","score":' + a.score + i + h + "}",
	k = new TGS.LeaderboardRequest;
	k.type = "add",
	k.params = a,
	k.onSuccess = a.onSuccess,
	k.onFailure = g,
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "submitting new score of " + a.score + " to server..."),
	TGS.SendMessage("leaderboard/score", "add", j, TGS.Leaderboard._SuccessCallback.bind(this, k), TGS.Leaderboard._ErrorCallback.bind(this, k))
},
TGS.Leaderboard._ShowSLB = function(a) {
	var b, c = document.getElementsByTagName("base");
	b = c && c.length ? c[0].getAttribute("href") : location.href;
	var d = {
		game: TGS._sGameID,
		partner: TGS._sPartnerID,
		leaderboard: a.leaderboardID,
		user: TGS._sUserID,
		score: a.score,
		orientation: a.orientation || TGS._sConfig.ORIENTATION,
		timePeriod: a.timePeriod,
		cssUrl: a.cssUrl,
		baseHref: b,
		server: TGS._SERVER_LOCATION
	};
	if (!TGS._sPartnerBridge._mUseUserInfoInSLB) {
		if (!TGS._sPartnerBridge.loggedIntoFacebook()) return void TGS._sPartnerBridge.loginToFacebook(TGS._sPartnerBridge.promptForFacebookAuthorization.bind(TGS._sPartnerBridge), TGS.Leaderboard._ShowSLB.bind(this, a));
		d.user = TGS._sPartnerBridge._mFacebookUserID,
		d.partner = "A0003"
	}
	TGS._sPartnerBridge._mUseUserInfoInSLB ? d.userInfo = {
		name: TGS._sPartnerBridge._mUsername,
		image_url: TGS._sPartnerBridge._mAvatarURL,
		location: TGS._sPartnerBridge._mUserLocation
	}: d.fbToken = TGS._sPartnerBridge._mFacebookAccessToken;
	var e = "//leaderboard.tresensa.com/?inGame=true&gameInfo=" + encodeURIComponent(JSON.stringify(d)),
	f = document.createElement("div");
	f.id = "tgs-leaderboard-container",
	f.innerHTML = "<iframe scrolling='no' src='" + e + "'></iframe>";
	var g = a.gameCanvas;
	g.insertBefore(f, g.firstChild);
	var h = function() {
		window.removeEventListener("message", j),
		f.parentNode.removeChild(f),
		a.onClose && a.onClose()
	},
	i = function() {
		var b = a.score,
		c = "undefined" != typeof window.GameConfig && "string" == typeof window.GameConfig.TITLE ? window.GameConfig.TITLE: null,
		d = c ? c: "Check out this game!",
		e = "See if you can beat me in this awesome game" + (c ? " called " + c: "") + ".";
		"undefined" != typeof b && (e += " I just scored " + TGS.Leaderboard.ScoreFormatter(b) + "."),
		TGS.Social.Challenge({
			title: d,
			message: e
		})
	},
	j = function(a) {
		if (!a.origin.match("^https?://leaderboard.tresensa.com$")) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "Recieved window message: " + a.data + " from unexpected origin: " + a.origin);
		var b = JSON.parse(a.data);
		TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "Recieved window message: " + b),
		"leaderboard:done" == b ? h() : "leaderboard:challenge" == b && i()
	};
	window.addEventListener("message", j, !1)
},
TGS.Leaderboard._SubmitScoreAndShowSLB = function(a) {
	var b = a.onSuccess;
	a.onSuccess = function() {
		a.onSuccess = b,
		TGS.Leaderboard._ShowSLB(a)
	},
	TGS.Leaderboard._SubmitScoreSLB(a, !0)
},
TGS.Leaderboard._SuccessCallback = function(a, b) {
	return b && "undefined" != typeof b.code ? 0 !== b.code ? void TGS.Leaderboard._ErrorCallback(a, "internal request error code: " + b.code, b) : void(a.onSuccess ? a.onSuccess.call(this, a, b) : TGS.Debug.Log(TGS.Debug.LOG_INFO, "Leaderboard " + a.type + " request was successful")) : void TGS.Leaderboard._ErrorCallback(a, "response object is malformed", b)
},
TGS.Leaderboard._ErrorCallback = function(a, b, c) {
	a.onFailure ? a.onFailure.call(this, b, c) : TGS.Debug.Log(TGS.Debug.LOG_ERROR, "Leaderboard " + a.type + " request failed: " + b)
},
TGS.LeaderboardRequest = function() {
	this.type = "",
	this.params = null,
	this.onSuccess = null,
	this.onFailure = null
},
function() {
	TGS.Advertisement = function(a, b) {
		a = a || {},
		this.closeCallback = a.closeCallback,
		this.placement = b || 0,
		this.width = b ? 336 : 300,
		this.height = b ? 280 : 250,
		this.x = a.x,
		this.y = a.y
	},
	TGS.Advertisement.prototype = {
		_inject: function(a) {
			return this.container = a,
			this._handleWindowMessageBound = this._handleWindowMessage.bind(this),
			window.addEventListener("message", this._handleWindowMessageBound, !1),
			//TGS._sPartnerBridge.advertising_injectAd(this, a),
			this
		},
		_handleWindowMessage: function(a) {
			if ("http://adserver.adtechus.com" !== a.origin) return void TGS.Debug.Log(TGS.Debug.LOG_WARNING, "Recieved window message: " + a.data + " from unexpected origin: " + a.origin);
			var b = JSON.parse(a.data);
			TGS.Debug.Log(TGS.Debug.LOG_INFO, "Recieved window message: " + b),
			"close" == b ? this.close() : "fullscreen" == b ? this._fullscreen() : b && "resize" == b.action && this._resize(b.width, b.height)
		},
		_resize: function(a, b) {
			this.width = a,
			this.height = b,
			this._reposition(this.container)
		},
		_fullscreen: function() {
			this.placement && (this.fullscreen = !0, this.width = 100, this.height = 100, this._reposition(this.container))
		},
		_reposition: function(a) {
			var b = document.getElementById("tgs_display_ad_iframe"),
			c = document.getElementById("tgs-ad-frame");
			if (this.fullscreen) {
				this.element.style.left = 0,
				this.element.style.top = 0,
				b.style.width = "100%",
				b.style.height = "100%",
				c.classList.add("fullscreen");
				var d = document.getElementById("tgs_display_ad");
				d.style.width = "100%",
				d.style.height = "100%";
				var e = document.getElementById("tgs-close");
				return e.style.display = "none",
				this.showCloseTimeout && clearTimeout(this.showCloseTimeout),
				this.element.style.webkitTransform = "scale(1)",
				this.element.style.MozTransform = "scale(1)",
				this.element.style.msTransform = "scale(1)",
				this.element.style.OTransform = "scale(1)",
				void(this.element.style.transform = "scale(1)")
			}
			var f = a == document.body ? window.innerHeight: a.clientHeight,
			g = a == document.body ? window.innerWidth: a.clientWidth;
			if (f && g) {
				var h = "undefined" == typeof this.x ? (g - this.width) / 2 : this.x,
				i = "undefined" == typeof this.y ? (f - this.height) / 2 : this.y;
				b.style.width = this.width + "px",
				b.style.height = this.height + "px",
				c && (c.style.width = this.width + "px", c.style.height = this.height + "px");
				var j = this.height,
				k = this.width;
				this.placement && (j += 52, k += 52, h -= 26, i -= 26),
				this.scale = 1,
				this.placement ? this.scale = g > f ? .75 * f / j: .75 * g / k: TGS.Utils.isTGEGame() && (this.scale = TGE.Game.GetInstance()._mDivResized || 1),
				this.element.style.left = h + "px",
				this.element.style.top = i + "px",
				this.element.style.webkitTransform = "scale(" + this.scale + ")",
				this.element.style.MozTransform = "scale(" + this.scale + ")",
				this.element.style.msTransform = "scale(" + this.scale + ")",
				this.element.style.OTransform = "scale(" + this.scale + ")",
				this.element.style.transform = "scale(" + this.scale + ")"
			}
		},
		close: function() {
			window.removeEventListener("message", this._handleWindowMessageBound),
			TGS._sPartnerBridge.advertising_closeAd(this) !== !0 && this.closeCallback && this.closeCallback.call()
		}
	};
	var a;
	TGS.Advertisement.DisplayAd = function(a) {
		var b = new TGS.Advertisement(a || {});
		return ("undefined" == typeof navigator.onLine || navigator.onLine) && b._inject(a.parentDiv),
		b
	},
	TGS.Advertisement.DisplayInterstitialAd = function(b) {
		b = "undefined" == typeof b ? {}: b;
		var c = (new Date).getTime(),
		d = 1e3 * (TGS._sConfig.ADS && TGS._sConfig.ADS.INTERSTITIAL_INTERVAL || 150);
		"undefined" == typeof navigator.onLine || navigator.onLine ? !a || c > a + d ? (a = c, TGS._sPartnerBridge.advertising_injectInterstitial(b || {})) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "interstitial ad interval has not been reached (" + d / 1e3 + " seconds), suppressing ad request"), b.closeCallback && b.closeCallback()) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "device offline, interstitial ad skipped"), b.closeCallback && b.closeCallback())
	}
} (),
function() {
	var a = function(a) {
		return function(b, c, d) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics " + a + " event: " + b + ", " + c),
			h(a, b, c, d)
		}
	},
	b = [/.+/i],
	c = {
		game: ["load", "begin", "pause", "resume", "end", "adrequest"],
		level: [/^start( - .+)?$/i, /^complete( - .+)?$/i, /^fail( - .+)?$/i, /^replay( - .+)?$/i],
		achievement: b,
		share: ["twitter", "facebook", "fb", "kik"],
		clickthru: b,
		custom: b,
		error: b
	},
	d = function(a) {
		return function(b) {
			return b instanceof RegExp ? b.test(a) : a === b
		}
	},
	e = [],
	f = {},
	g = !1,
	h = function(a, b, f, g) {
		var h, i;
		try {
			if (a = (a || "").toLowerCase(), b = (b || "").toLowerCase(), h = c[a], !h) return void TGS.Debug.Log(TGS.Debug.LOG_ERROR, "TGS.Analytics.trackEvent called with invalid category '" + a);
			if (!h.some(d(b))) return void TGS.Debug.Log(TGS.Debug.LOG_ERROR, "TGS.Analytics.trackEvent called with invalid name '" + b + "' for category '" + a);
			for (i = 0; i < e.length; i++) e[i].trackEvent(a, b, f, g || {})
		} catch(j) {
			TGS.Debug.Log(TGS.Debug.LOG_ERROR, "TGS.Analytics.trackEvent error : " + j)
		}
	};
	TGS.Analytics = {
		_init: function(a) {
			var b, c, d, h;
			if (!g) {
				for (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics.init called with conifg: " + JSON.stringify(a)), f = a, b = TGS._sPartnerBridge.analytics_getProviders() || [], TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics.init got " + b.length + " providers from partner bridge"), c = 0; c < b.length; c++) try {
					if (d = b[c], h = new d, !f[h.configName] || !f[h.configName].ENABLED) {
						TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics.init skipping provider (not ENABLED): " + h.name);
						continue
					}
					TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics.init initializing provider: " + h.name),
					h.init(f[h.configName] || {}) !== !1 ? e.push(h) : TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics.init " + h.name + " returned false from init, not using")
				} catch(i) {
					TGS.Debug.Log(TGS.Debug.LOG_ERROR, "TGS.Analytics.init error while initializing " + h.name + ": " + i)
				}
				g = !0,
				TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics.init done. Loaded providers: " + e.map(TGS.Utils.Func.prop("name")))
			}
		},
		logScreen: function(a, b) {
			var c;
			for (c = 0; c < e.length; c++) e[c].trackScreen(a, b || {})
		},
		_logPurchase: function(a, b) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "TGS.Analytics._logPurchase " + JSON.stringify(a));
			var c;
			for (c = 0; c < e.length; c++) e[c].trackPurchase(a, b || {})
		},
		logGameEvent: a("game"),
		logShareEvent: a("share"),
		logLevelEvent: function(a, b, c) {
			b > 0 && (a += " - level " + b);
			var d; ("complete" == a || "fail" == a && null !== c) && (d = c),
			h("level", a, d)
		},
		logAchievementEvent: a("achievement"),
		logCustomEvent: a("custom"),
		_logErrorEvent: a("error"),
		_logClickThruEvent: a("clickthru"),
		_logMoreGamesEvent: a("moregames")
	}
} (),
function() {
	TGS.Analytics.BaseAnalyticsProvider = function() {},
	TGS.Analytics.BaseAnalyticsProvider.prototype = {
		name: "Base Provider",
		configName: "BaseProvider",
		init: function() {},
		trackEvent: function() {},
		trackScreen: function() {},
		trackPurchase: function() {}
	}
} (),
function() {
	TGS.Analytics.GoogleAnalyticsProvider = function() {},
	TGS.Analytics.GoogleAnalyticsProvider.prototype = {
		name: "Google Analytics",
		configName: "GoogleAnalytics",
		init: function(a) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "GoogleAnalyticsProvider.init called: " + JSON.stringify(a)),
			this._mConfig = a,
			this._mConfig.STUDIO_ONLY || (_gaTreSensa("create", TGS._sConfig.PROD_ENV ? "UA-29301358-4": "UA-29301358-8", "auto", {
				name: "TGSTracker"
			}), _gaTreSensa("TGSTracker.set", {
				dimension1: TGS._sPartnerID,
				dimension2: TGS._sGameVersion,
				dimension3: TGS._sGameID
			}), TGS.MicrotransactionsSupported() && _gaTreSensa("TGSTracker.require", "ecommerce", "ecommerce.js")),
			this._mConfig.STUDIO_ID && "" !== this._mConfig.STUDIO_ID && (_gaTreSensa("create", GameConfig.GoogleAnalytics.STUDIO_ID, "auto", {
				name: "TGSStudioTracker"
			}), _gaTreSensa("TGSStudioTracker.set", {
				location: TGS._sConfig.HOST + "/index.html",
				hostname: TGS._sConfig.HOST,
				page: TGS._sConfig.PATH,
				title: this._mConfig.LABEL || TGS._sGameID,
				referrer: "http://games.tresensa.com",
				dimension1: TGS._sGameID,
				dimension2: TGS._sGameVersion
			}), this._studioTrackerEnabled = !0)
		},
		trackEvent: function(a, b, c) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "GoogleAnalyticsProvider.trackEvent called: " + JSON.stringify(arguments)),
			this._mConfig.STUDIO_ONLY || _gaTreSensa("TGSTracker.send", "event", a, b, this._mConfig.LABEL || TGS._sGameID, c),
			this._studioTrackerEnabled && ("moregames" == a && (b = "URL launched"), _gaTreSensa("TGSStudioTracker.send", "event", a, b, this._mConfig.LABEL || TGS._sGameID, c))
		},
		trackScreen: function(a) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "GoogleAnalyticsProvider.trackPageView called: " + JSON.stringify(arguments)),
			this._mConfig.STUDIO_ONLY || _gaTreSensa("TGSTracker.send", "pageview", TGS._sConfig.PATH + a),
			this._studioTrackerEnabled && _gaTreSensa("TGSStudioTracker.send", "pageview", TGS._sConfig.PATH + a)
		},
		trackPurchase: function(a) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "GoogleAnalyticsProvider.trackPurchase called: " + JSON.stringify(arguments));
			var b = {
				id: a.transactionID,
				affiliation: TGS.Microtransactions.PaymentProviderName(),
				revenue: TGS.Microtransactions.PriceAsUSD(a.item.price)
			},
			c = {
				id: a.transactionID,
				name: a.item.title,
				sku: a.item.id,
				price: TGS.Microtransactions.PriceAsUSD(a.item.price),
				quantity: "1"
			};
			this._mConfig.STUDIO_ONLY || (_gaTreSensa("TGSTracker.ecommerce:addTransaction", b), _gaTreSensa("TGSTracker.ecommerce:addItem", c), _gaTreSensa("TGSTracker.ecommerce:send"))
		}
	},
	extend(TGS.Analytics.GoogleAnalyticsProvider, TGS.Analytics.BaseAnalyticsProvider)
} (),
function() {
	TGS.Analytics.NativeGoogleAnalyticsProvider = function() {},
	TGS.Analytics.NativeGoogleAnalyticsProvider.prototype = {
		name: "Native Google Analytics",
		configName: "GoogleAnalytics",
		init: function(a) {
			if (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "NativeGoogleAnalyticsProvider.init called: " + JSON.stringify(a)), this._mConfig = a, this._gaPlugin = window.plugins.gaPlugin, !a.NATIVE_ID) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "CordovaConfig.GoogleAnalytics.NATIVE_ID not set, disabling analytics"),
			!1;
			window.plugins && window.plugins.gaPlugin || TGS.Debug.Log(TGS.Debug.LOG_ERROR, "PhoneGap GoogleAnalytics plugin was not found, disabling analytics");
			var b = this;
			this._gaPlugin.init(function() {
				b._gaPlugin.setVariable(null, null, 1, TGS._sPartnerID),
				b._gaPlugin.setVariable(null, null, 2, TGS._sGameVersion),
				b._gaPlugin.setVariable(null, null, 3, TGS._sGameID)
			},
			this._logError, a.NATIVE_ID, 10)
		},
		trackEvent: function(a, b, c) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "NativeGoogleAnalyticsProvider.trackEvent called: " + JSON.stringify(arguments)),
			"number" != typeof c && (c = -1),
			this._gaPlugin.trackEvent(this._logResult, this._logError, a, b, this._mConfig.LABEL || TGS._sGameID, c)
		},
		trackScreen: function(a) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "NativeGoogleAnalyticsProvider.trackPageView called: " + JSON.stringify(arguments)),
			this._gaPlugin.trackPage(this._logResult, this._logError, a)
		},
		trackPurchase: function(a) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "NativeGoogleAnalyticsProvider.trackPurchase called: " + JSON.stringify(arguments)),
			this._gaPlugin.trackPurchase(this._logResult, this._logError, a.transactionID, TGS.Microtransactions.PaymentProviderName(), a.item.id, a.item.title, TGS.Microtransactions.PriceAsUSD(a.item.price), 1)
		},
		_logError: function(a) {
			TGS.Debug.Log(TGS.Debug.LOG_ERROR, "NativeGoogleAnalyticsProvider - " + a)
		},
		_logResult: function(a) {
			TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "NativeGoogleAnalyticsProvider - " + a)
		}
	},
	extend(TGS.Analytics.GoogleAnalyticsProvider, TGS.Analytics.BaseAnalyticsProvider)
} (),
function() {
	TGS.Social = {
		ChallengeIcon: function() {
			return TGS._sPartnerBridge.challengeIcon()
		},
		Challenge: function(a) {
			TGS._sPartnerBridge.challenge(a)
		},
		Share: function(a, b) {
			b = b || {};
			var c;
			c = b.url ? b.url: TGS._sConfig.HOST ? TGS._sConfig.HOST: window.location.href,
			TGS._sPartnerBridge.share(a, {
				title: b.title || TGS._sConfig.TITLE,
				msg: b.msg || "I am playing " + TGS._sConfig.TITLE,
				url: c,
				image: b.image
			}),
			TGS.Analytics.logShareEvent(a)
		},
		GetShareServices: function(a) {
			var b = TGS._sPartnerBridge.getShareServices();
			return a && b.length > a && (b.length = a),
			b
		},
		_services: {
			twitter: {
				id: "twitter",
				title: "Twitter",
				label: "Tweet"
			},
			fb: {
				id: "fb",
				title: "Facebook",
				label: "Share on FB"
			}
		}
	}
} (),
function() {
	var a = function(a, b, c, d) {
		var e = document.createElement("div");
		if (e.classList.add("tgs-btn"), c) for (var f = c.split(" "), g = f.length - 1; g >= 0; g--) e.classList.add(f[g]);
		var h = "",
		i = !1;
		return ("login" == c || "logout" == c) && (i = "login" == d ? TGS.LoggedIn() ? TGS.LogoutIcon() : TGS.LoginIcon() : TGS.LoggedIn() ? TGS.WidgetLogoutIcon() : TGS.WidgetLoginIcon()),
		i && (h += "<img src='" + i + "'/>"),
		h += "<span>" + a + "</span>",
		e.innerHTML = h,
		b && e.addEventListener(TGS.BrowserDetect.clickEvent, b),
		e
	};
	TGS.Widget = function(b) {
		b = b || {},
		this.pos = {
			top: b.y || 0,
			left: b.x || 0
		},
		this.size = {
			width: b.width || 300,
			height: 0
		},
		this.closeCallback = b.closeCallback,
		this.element = document.createElement("div"),
		this.element.id = "tgs-widget",
		this.element.style.top = this.pos.top + "px",
		this.element.style.left = this.pos.left + "px",
		this.element.style.width = this.size.width + "px",
		this.element.style.height = this.size.height ? this.size.height + "px": "auto";
		var c = b.disableAd ? 0 : 300,
		d = b.disableAd ? 0 : 10,
		e = b.minColumnWidth || 130,
		f = this.size.width >= c + d + e,
		g = this.size.width - c - d,
		h = b.columnPaddingPercent || 2,
		i = g * h / 100;
		b.widgetClass && this.element.classList.add(b.widgetClass),
		f && this.element.classList.add("horizontal");
		var j = 1;
		if (b.disableAd && this.size.width >= 4 * e + 3 * i ? (this.element.classList.add("four-column"), j = 4) : (!f || b.disableAd) && this.size.width >= e + i + e && (this.element.classList.add("two-column"), j = 2), b.disableAd || (this.ad = new TGS.Advertisement({}), this.ad._inject(this.element), this.ad.element && (this.ad.element.style.position = "static")), this.buttonContainer = document.createElement("div"), this.buttonContainer.classList.add("btn-container"), f && (this.buttonContainer.style.width = g + "px"), b.showLogin) {
			var k = TGS.GetLoginButtonText();
			if (k && ("Restore Purchases" != k || !b.disableRestore)) {
				var l = TGS.GetLoginButtonAction(function() {
					if (m && m.parentNode) {
						var c = TGS.GetLoginButtonText();
						if (c) {
							var d = a(c, l, c.toLowerCase().replace(/ /g, "-"), b.widgetClass);
							s.buttonContainer.insertBefore(d, m)
						}
						m.parentNode.removeChild(m),
						m = d,
						t()
					}
				}),
				m = a(k, l, k.toLowerCase().replace(/ /g, "-"), b.widgetClass);
				this.buttonContainer.appendChild(m)
			}
		}
		if (!b.disableShare) for (var n = {
			title: b.shareTitle,
			msg: b.shareMessage,
			url: b.shareUrl,
			image: b.shareImageUrl
		},
		o = TGS.Social.GetShareServices(2), p = 0; p < o.length; p++) {
			var q = o[p];
			this.buttonContainer.appendChild(a(q.label, TGS.Social.Share.bind(null, q.id, n), q.id))
		}
		if (!b.disableMoreGames && TGS.MoreGamesURL() && this.buttonContainer.appendChild(a("More Games", TGS.ShowMoreGames, "moregames")), !b.disableLeaderboard && TGS.Leaderboard.isSupported() && Object.keys(TGS.Leaderboard.GetLeaderboardDescriptors()).length > 0) {
			var r = TGS.Leaderboard.Show.bind(this, {
				timePeriod: "week",
				page: 1,
				gameCanvas: TGE.Game.GameDiv()
			});
			this.buttonContainer.appendChild(a(TGS.Leaderboard.getLabel(), r, "leaderboard"))
		}
		var s = this,
		t = function() {
			if (j > 1) {
				s.buttonContainer.style.marginBottom = -h + "%";
				for (var a = s.buttonContainer.childNodes,
				b = a.length - 1; b >= 0; b--) {
					var c = b == a.length - 1;
					a[b].style.marginBottom = h + "%",
					2 == j && a.length % 2 != 0 && c ? a[b].style.width = "100%": ((4 == j && !c || b % 2 === 0) && (a[b].style.marginRight = h + "%"), a[b].style.width = (100 - (j - 1) * h) / j + "%")
				}
			}
		};
		t(),
		this.element.appendChild(this.buttonContainer)
	},
	TGS.Widget.prototype = {
		appendTo: function(a) {
			return a.insertBefore(this.element, a.firstChild),
			this
		},
		close: function() {
			return this.ad && this.ad.close(),
			this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element),
			this.closeCallback && this.closeCallback(this),
			this
		}
	},
	TGS.Widget.CreateWidget = function(a) {
		var b;
		a = a || {},
		a.disableMoreGames = !1,
		b = TGS.Utils.isTGEGame() ? a.parentDiv || TGE.Game.GameDiv() : a.parentDiv || document.body;
		var c = new TGS.Widget(a);
		return c.appendTo(b)
	},
	TGS.Widget.CreateLoginWidget = function(a) {
		var b;
		a = a || {},
		a.disableAd = !0,
		a.disableLeaderboard = !0,
		a.disableShare = !0,
		a.disableMoreGames = !0,
		a.showLogin = !0,
		a.width = a.width || 200,
		a.widgetClass = "login",
		b = TGS.Utils.isTGEGame() ? a.parentDiv || TGE.Game.GameDiv() : a.parentDiv || document.body;
		var c = new TGS.Widget(a);
		return c.appendTo(b)
	}
} (),
TGS.Adapters = {};
var hostLocation = "stg-tgs.tresensa.com";
"undefined" != typeof window.GameConfig && GameConfig.TGS && GameConfig.TGS.HOST && (hostLocation = GameConfig.TGS.HOST);
var serverLocation = hostLocation + "/server/";
serverLocation += "0.3.9/",
TGS._SERVER_LOCATION = ("https:" === document.location.protocol ? "https:": "http:") + "//" + serverLocation,
TGS._IMAGES_LOCATION = ("https:" === document.location.protocol ? "https:": "http:") + "./4399/tgs/images/",//Edit
TGS._sOn = !1,
TGS._sFakeConnections = !1,
TGS._sPartnerID = null,
TGS._sGameID = null,
TGS._sUserID = null,
TGS._sPartnerBridge = null,
TGS._sGamePartnerInfo = null,
TGS._sLSKeys = {},
TGS._sOnline = !0,
TGS._sMessageOverlay = null,
TGS.OverlayRed = .6,
TGS.OverlayGreen = .6,
TGS.OverlayBlue = .6,
TGS.OverlayOpacity = .6,
TGS.onReady = null,
TGS.Debug = TGS.Debug || {},
TGS.Debug.LOG_NONE = 0,
TGS.Debug.LOG_ERROR = 1,
TGS.Debug.LOG_WARNING = 2,
TGS.Debug.LOG_INFO = 3,
TGS.Debug.LOG_VERBOSE = 4,
TGS.Debug.LogLevel = "undefined" != typeof GameConfig && "number" == typeof GameConfig.LOG_LEVEL ? GameConfig.LOG_LEVEL: TGS.Debug.LOG_INFO,
TGS.Debug.Log = function(a) {
	if (window.console && a <= TGS.Debug.LogLevel) {
		var b = "TGS: ",
		c = "log";
		a === TGS.Debug.LOG_ERROR ? (b += "**ERROR** ", c = "error") : a === TGS.Debug.LOG_WARNING && (b += "**WARNING** ", c = "warn"),
		window.console[c](b + Array.prototype.slice.call(arguments, 1))
	}
},
TGS.UseServer = function(a) {
	TGS._SERVER_LOCATION = ("https:" === document.location.protocol ? "https:": "http:") + "//" + a
},
TGS.localStorage = window.localStorage,
TGS._TestLocalStorage = function() {
	TGS.localStorage = window.localStorage;
	try {
		localStorage.setItem("storage", ""),
		localStorage.removeItem("storage")
	} catch(a) {
		TGS.Debug.Log(TGS.Debug.LOG_WARNING, "localStorage is not supported"),
		TGS.localStorage = {
			setItem: function() {},
			removeItem: function() {},
			getItem: function() {}
		}
	}
},
TGS.IsOn = function() {
	return TGS._sOn
},
TGS.IsReady = function() {
	return TGS._sPartnerID && TGS._sGameID && TGS._sPartnerBridge && (!TGS._sPartnerBridge.supportsDatastore() || TGS._sUserID && TGS.DataStore.GameData) ? TGS._sPartnerBridge.isReady() : !1
},
TGS.MicrotransactionsSupported = function() {
	return TGS._sPartnerBridge.supportsMicrotransactions() && TGS._sPartnerBridge.supportsDatastore()
},
TGS.MicrotransactionsAllowed = function() {
	return TGS._sPartnerBridge.allowsMicrotransactions()
},
TGS.DatastoreSupported = function() {
	return TGS._sPartnerBridge.supportsDatastore()
},
TGS.LeaderboardSupported = function() {
	return TGS.Leaderboard.isSupported()
},
TGS.AutoLogin = function() {
	return TGS._sPartnerBridge.autoLogin()
},
TGS.LoginIcon = function() {
	return TGS._sPartnerBridge.loginIcon()
},
TGS.LogoutIcon = function() {
	return TGS._sPartnerBridge.logoutIcon()
},
TGS.WidgetLoginIcon = function() {
	return TGS._sPartnerBridge.widgetLoginIcon()
},
TGS.WidgetLogoutIcon = function() {
	return TGS._sPartnerBridge.widgetLogoutIcon()
},
TGS.ChallengesSupported = function() {
	return TGS._sPartnerBridge.supportsChallenges()
},
TGS.LoggedIn = function() {
	return TGS._sPartnerBridge.loggedIn()
},
TGS.LoginUser = function(a) {
	a = "undefined" == typeof a ? {}: a,
	TGS._sLoginOverlay = TGS.LoadingOverlay();
	var b = new TGS.LoginRequest;
	b.onSuccess = a.onSuccess,
	b.onFailure = a.onFailure,
	b.onUserCancel = a.onUserCancel,
	TGS._sPartnerBridge.loginUser(b)
},
TGS.LogoutUser = function(a) {
	a = "undefined" == typeof a ? {}: a,
	TGS._sLoginOverlay = TGS.LoadingOverlay();
	var b = new TGS.LoginRequest;
	b.onSuccess = a.onSuccess,
	b.onFailure = a.onFailure,
	b.onUserCancel = a.onUserCancel,
	TGS._sPartnerBridge.logoutUser(b)
},
TGS.ToggleUserLogin = function(a) {
	TGS.AutoLogin() || (TGS.LoggedIn() ? TGS.LogoutUser(a) : TGS.LoginUser(a))
},
TGS._LoginSucceeded = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "user login/logout process was successful"),
	a && a.onSuccess && a.onSuccess.call(),
	TGS._sLoginOverlay && (TGS._sLoginOverlay.parentNode.removeChild(TGS._sLoginOverlay), TGS._sLoginOverlay = null),
	window.TGE && TGE.Game.GetInstance() && TGE.Game.GetInstance().stage.dispatchEvent({
		type: "tgs_login_changed"
	})
},
TGS._LoginFailed = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_ERROR, "there was an error during the login/logout process"),
	a && a.onFailure && a.onFailure.call(),
	TGS._sLoginOverlay && (TGS._sLoginOverlay.parentNode.removeChild(TGS._sLoginOverlay), TGS._sLoginOverlay = null)
},
TGS._LoginCanceled = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "user cancelled login"),
	a.onUserCancel && a.onUserCancel.call(),
	TGS._sLoginOverlay && (TGS._sLoginOverlay.parentNode.removeChild(TGS._sLoginOverlay), TGS._sLoginOverlay = null)
},
TGS.GetDateTime = function(a, b) {
	var c = null;
	return TGS.IsReady() || (c = "Tried to request the server date/time before TGS was ready"),
	a || (c = "Date/time request was made without specifying a success callback"),
	null !== c ? void(b ? b.call(this, c, null) : TGS.Debug.Log(TGS.Debug.LOG_ERROR, c)) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "requesting date/time from the server..."), void TGS.SendMessage("time", "get", null, TGS._GetDateTimeCallback.bind(this, a), b))
},
TGS._GetDateTimeCallback = function(a, b) {
	a.call(this, new Date(b.time))
},
TGS.GameLaunched = function() {
	TGS._sPartnerBridge && TGS._sPartnerBridge.gameWasLaunched()
},
TGS.EnablePartnerUI = function(a) {
	null !== TGS._sPartnerBridge && TGS._sPartnerBridge.enablePartnerUI(a)
},
TGS.GenericSuccessCallback = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_INFO, " server request was successful"),
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, " response obj: " + JSON.stringify(a))
},
TGS.GenericErrorCallback = function(a, b) {
	TGS.Debug.Log(TGS.Debug.LOG_WARNING, " GenericErrorCallback " + a),
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, " GenericErrorCallback response obj: " + JSON.stringify(b))
},
TGS.SendMessage = function(a, b, c, d, e) {
	if (!TGS._sOnline) return void(e && e("TGS is offline"));
	d = d ? d: TGS.GenericSuccessCallback,
	e = e ? e: TGS.GenericErrorCallback;
	var f = TGS._SERVER_LOCATION + a + ".php";
	f += "?gid=" + TGS._sGameID + "&tgs=" + (window.GameConfig ? GameConfig.TGS.VERSION: "unknown") + "&dst=" + TGS._sPartnerID;
	var g = "string" == typeof b ? "type=" + b + "&": "",
	h = g + "data=" + c;
	TGS.CORSRequest(f, h, !0, !0, d, e)
},
TGS.CORSRequest = function(a, b, c, d, e, f) {
	var g = null,
	h = "POST",
	i = null,
	j = !1;
	try {
		if (window.XMLHttpRequest) {
			if (g = new XMLHttpRequest, "withCredentials" in g) g.open(h, a, !0),
			g.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
			g.send(b);
			else if ("undefined" != typeof XDomainRequest) {
				j = !0,
				g = new XDomainRequest;
				var k = Math.floor(99999999999 * Math.random()),
				l = -1 === a.indexOf("?") ? "?": "&";
				a = a + l + b + "&cb=" + k,
				g.open(h, a),
				g.send()
			}
		} else g = new ActiveXObject("Microsoft.XMLHTTP"),
		g.open(h, a, !0),
		g.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
		g.send(b)
	} catch(m) {
		f && f("server failed to respond", m)
	}
	try {
		j ? (g.timeout = 1e4, g.onerror = function() {},
		g.ontimeout = function() {},
		g.onprogress = function() {},
		g.onload = function() {
			if (!d) return void e(g.responseText);
			try {
				i = JSON.parse(g.responseText)
			} catch(a) {
				TGS.Debug.Log(TGS.Debug.LOG_WARNING, "server response could not be parsed: " + g.responseText),
				i = null
			}
			if (i) {
				if (c && 0 !== i.code && f) {
					var b = "the TGS server returned error code " + i.code;
					return "string" == typeof i.message && (b += " " + i.message),
					TGS.Debug.Log(TGS.Debug.LOG_WARNING, b),
					void f(b, i)
				}
				e(i)
			} else f && (TGS.Debug.Log(TGS.Debug.LOG_WARNING, "server request returned bad data"), f("server request returned bad data", null))
		}) : g.onreadystatechange = function() {
			if (4 == g.readyState) if (200 != g.status) f && (TGS.Debug.Log(TGS.Debug.LOG_WARNING, "the page returned error code " + g.status + " message: " + g.statusText), f("the page returned error code " + g.status, g));
			else {
				if (!d) return void e(g.responseText);
				try {
					i = JSON.parse(g.responseText)
				} catch(a) {
					TGS.Debug.Log(TGS.Debug.LOG_WARNING, "server response could not be parsed: " + g.responseText),
					i = null
				}
				if (i) {
					if (c && 0 !== i.code && f) {
						var b = "the TGS server returned error code " + i.code;
						return "string" == typeof i.message && (b += " " + i.message),
						TGS.Debug.Log(TGS.Debug.LOG_WARNING, b),
						void f(b, i)
					}
					e(i)
				} else f && (TGS.Debug.Log(TGS.Debug.LOG_WARNING, "server request returned bad data"), f("server request returned bad data", null))
			}
		}
	} catch(n) {
		f && f("server error", n)
	}
},
TGS.Init = function(a, b) {
	if (1 == arguments.length ? (TGS._sConfig = a, a = TGS._sConfig.GAME_ID, b = TGS._sConfig.DST_ID) : (window.GameConfig.DST_ID = TGL.getDistributionPartner(), TGS._sConfig = window.GameConfig), TGS._TestLocalStorage(), "string" != typeof a || a.length < 1) return void TGS.Debug.Log(TGS.Debug.LOG_ERROR, "a valid game id was not specified");
	TGS._sGameID = a;
	var c = this._sConfig.VERSION || "none";
	TGS._sGameVersion = c,
	"string" != typeof b || b.length < 1 ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "no partner id specified - using generic adapter"), TGS._sPartnerID = "0000") : TGS._sPartnerID = b,
	TGS._sOn = !0;
	var d = "_" + TGS._sPartnerID + "_" + TGS._sGameID;
	TGS._sLSKeys.TGS_datastore = "TGS_datastore" + d,
	TGS._sLSKeys.TGS_userid = "TGS_userid" + d,
	TGS._sLSKeys.TGS_loggedin_user = "TGS_loggedin_user" + d,
	TGS._sLSKeys.TGS_username = "TGS_username" + d,
	TGS._sLSKeys.TGS_avatar = "TGS_avatar" + d,
	TGS._sLSKeys.TGS_location = "TGS_location" + d,
	TGS._sLSKeys.TGS_gameinfo = "TGS_gameinfo" + d,
	"undefined" == typeof TGS.AdapterDefinitions && TGS.Debug.Log(TGS.Debug.LOG_INFO, "the TGS adapter definitions library was not loaded, only the generic adapter and Q0000 will be available"),
	TGS._injectCSS(),
	TGS._LoadAdapterLibraries()
},
TGS._injectCSS = function() {
	var a = window.TGL ? TGL.SDKBaseURL + "tgs/": "//css.17yy.com/js/tgs/",
	b = document.getElementsByTagName("head")[0],
	c = document.createElement("link");
	c.type = "text/css",
	c.href = a + "css/tgs-" + TGS.version + ".css",
	c.rel = "stylesheet",
	c.media = "screen",
	b.appendChild(c)
},
TGS._LoadAdapterLibraries = function() {
	TGS.Debug.Log(TGS.Debug.LOG_INFO, "loading partner adapter and 3rd party libs...");
	var a = TGS.AdapterDefinitions ? TGS.AdapterDefinitions[TGS._sPartnerID] : null,
	b = [],
	c = window.TGL ? TGL.SDKBaseURL + "tgs/": "//css.17yy.com/js/tgs/",
	d = window.TGL ? TGL.MinifiedSuffix: ".min";
	a && (a.embedded !== !0 && b.push(c + TGS._sPartnerID + "/" + TGS._sPartnerID + "-" + a.version + d + ".js"), "https:" === document.location.protocol && a.httpslibs ? b = b.concat(a.httpslibs) : a.libs && (b = b.concat(a.libs))),
	a && a.fb !== !0 || b.push(("https:" === document.location.protocol ? "https:": "http:") + "//connect.facebook.net/en_US/all.js"),
	"undefined" != typeof head && b.length > 0 ? (head.js.apply(this, b), head.ready(TGS._CreatePartnerBridge)) : TGS._CreatePartnerBridge()
},
TGS._CreatePartnerBridge = function() {
	if (TGS.Adapters[TGS._sPartnerID]) try {
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "creating " + TGS._sPartnerID + " adapter..."),
		TGS._sPartnerBridge = new TGS.Adapters[TGS._sPartnerID]
	} catch(a) {
		return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "error instantiating partner adapter"),
		void TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "   (" + a + ")")
	} else TGS.Debug.Log(TGS.Debug.LOG_INFO, "creating generic adapter..."),
	TGS._sPartnerBridge = new TGS.Adapters.GenericAdapter;
	TGS._sPartnerBridge._mFacebookServicesAllowed = "undefined" != typeof FB,
	TGS._sPartnerBridge.onAdapterReady = TGS.onPartnerBridgeReady,
	TGS._sPartnerBridge.onUserInfoAvailable = TGS.onUserInfoAvailable,
	TGS._sPartnerBridge.masterInitialize(),
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "requesting game-partner info from server..."),
	TGS._sPartnerBridge.requestGameInfo(TGS._sGameID)
},
TGS.onGamePartnerInfoReceived = function(a) {
	return TGS.Debug.Log(TGS.Debug.LOG_INFO, "game-partner info received"),
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "game-partner info: " + JSON.stringify(a)),
	a && "undefined" != typeof a.code ? 0 !== a.code ? void TGS.Debug.Log(TGS.Debug.LOG_ERROR, "game-partner info contained error code: " + a.code) : (TGS._sGamePartnerInfo = a.partner_values, TGS.Microtransactions._sIAPProducts = a.iap_products, TGS.Microtransactions._sAppURLs = a.app_urls, TGS.Leaderboard._sLeaderboardDescriptors = a.leaderboards, TGS.localStorage.setItem(TGS._sLSKeys.TGS_gameinfo, JSON.stringify(a)), void(TGS._sPartnerBridge.isReady() ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "initiating connection to partner..."), TGS._sPartnerBridge.masterConnect(TGS._sGamePartnerInfo)) : TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "partner bridge not ready yet"))) : void TGS.Debug.Log(TGS.Debug.LOG_ERROR, "game-partner info was corrupt")
},
TGS.onGamePartnerInfoError = function(a, b) {
	TGS.Debug.Log(TGS.Debug.LOG_ERROR, "could not retrieve game-partner info: " + a),
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, " response obj: " + JSON.stringify(b));
	var c = TGS.localStorage.getItem(TGS._sLSKeys.TGS_gameinfo);
	c ? (TGS.Debug.Log(TGS.Debug.LOG_INFO, "using a local copy of the game-partner info"), b = JSON.parse(c), TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "game-partner info: " + JSON.stringify(b)), TGS._sGamePartnerInfo = b.partner_values, TGS.Microtransactions._sIAPProducts = b.iap_products, TGS.Microtransactions._sAppURLs = b.app_urls, TGS.Leaderboard._sLeaderboardDescriptors = b.leaderboards) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "no local copy of the game-partner info is available"), TGS.OverlayMessage({
		title: "Oops!",
		message: "Could not retrieve game info from the server. Some game features like in-app purchase and leaderboards may not be available."
	}), TGS._sGamePartnerInfo = {},
	TGS.Microtransactions._sIAPProducts = [], TGS.Microtransactions._sAppURLs = [], TGS.Leaderboard._sLeaderboardDescriptors = []),
	TGS._sPartnerBridge.masterConnect(TGS._sGamePartnerInfo)
},
TGS.onPartnerBridgeReady = function() {
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "partner bridge is ready"),
	null !== TGS._sGamePartnerInfo && (TGS.Debug.Log(TGS.Debug.LOG_INFO, "connecting to partner..."), TGS._sPartnerBridge.masterConnect(TGS._sGamePartnerInfo))
},
TGS.onUserInfoAvailable = function(a) {
	return a ? (TGS._sUserID = a.toString(), TGS.Debug.Log(TGS.Debug.LOG_INFO, "user id is: " + TGS._sUserID), void TGS.DataStore.ReloadGameData(TGS.onGameDataReceivedForUser)) : void TGS.Debug.Log(TGS.Debug.LOG_INFO, "invalid user id")
},
TGS.onGameDataReceivedForUser = function(a) {
	TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "received game info for user " + JSON.stringify(a)),
	TGS.MakeTGSReady()
},
TGS.MakeTGSReady = function() {
	if (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "MakeTGSReady called"), TGS.IsReady()) {
		if (window.TGE) {
			var a = TGE.Game.GetInstance();
			a && a._onTGSReady && a._onTGSReady()
		}
		"function" == typeof TGS.onReady && (TGS.Debug.Log(TGS.Debug.LOG_VERBOSE, "Calling TGS.onReady"), TGS.onReady.call(this))
	}
},
TGS.AddRequiredImagesToAssetList = function(a) {
	if (!window.TGE) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "you must be using the TreSensa TGE library to use TGS.AddRequiredImagesToAssetList"),
	null;
	var b = TGE.Game.GetInstance();
	null !== TGS.LoginIcon() && b.assetManager.addAsset(a, {
		id: "tgs_login_icon",
		url: TGS.LoginIcon(),
		absolutePath: !0
	}),
	null !== TGS.LogoutIcon() && b.assetManager.addAsset(a, {
		id: "tgs_logout_icon",
		url: TGS.LogoutIcon(),
		absolutePath: !0
	}),
	null !== TGS.Microtransactions.CurrencyIcon() && b.assetManager.addAsset(a, {
		id: "tgs_currency_icon",
		url: TGS.Microtransactions.CurrencyIcon(),
		absolutePath: !0
	}),
	TGS.MoreGamesURL() && null !== TGS._sPartnerBridge._mMoreGamesImage && b.assetManager.addAsset(a, {
		id: "tgs_more_games",
		url: TGS._sPartnerBridge._mMoreGamesImage,
		absolutePath: !0
	}),
	null !== TGS.Social.ChallengeIcon() && b.assetManager.addAsset(a, {
		id: "tgs_challenge_icon",
		url: TGS.Social.ChallengeIcon(),
		absolutePath: !0
	})
},
TGS.GetLoginButtonText = function() {
	return "A0001" !== TGS._sPartnerID && "A0002" !== TGS._sPartnerID && "A0030" !== TGS._sPartnerID || !TGS.Microtransactions.HasNonConsumables() ? TGS.AutoLogin() || !TGS._sPartnerBridge.supportsLogout() && TGS.LoggedIn() || !TGS.LoginIcon() ? void 0 : TGS.LoggedIn() ? "Logout": "Login": "Restore Purchases"
},
TGS.GetLoginButtonAction = function(a) {
	return "A0001" !== TGS._sPartnerID && "A0002" !== TGS._sPartnerID && "A0030" !== TGS._sPartnerID || !TGS.Microtransactions.HasNonConsumables() ? TGS.AutoLogin() || !TGS._sPartnerBridge.supportsLogout() && TGS.LoggedIn() || !TGS.LoginIcon() ? void 0 : TGS.ToggleUserLogin.bind(TGS, {
		onSuccess: a
	}) : TGS.Microtransactions.RestorePurchases.bind(TGS.Microtransactions)
},
TGS.CreateLoginWidget = function(a) {
	if (!window.TGE) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "you must be using the TreSensa TGE library to use TGS.CreateLoginWidget"),
	null;
	var b = new TGE.DisplayObjectContainer;
	if ("A0001" !== TGS._sPartnerID && "A0002" !== TGS._sPartnerID && "A0030" !== TGS._sPartnerID || !TGS.Microtransactions.HasNonConsumables()) if (TGS.AutoLogin() || !TGS._sPartnerBridge.supportsLogout() && TGS.LoggedIn() || !TGS.LoginIcon());
	else {
		var c = (new TGE.Button).setup({
			image: TGS.LoggedIn() ? "tgs_logout_icon": "tgs_login_icon",
			pressFunction: TGS.ToggleUserLogin.bind(null, a)
		});
		c.addEventListener("tgs_login_changed",
		function(a) {
			var b = a.currentTarget,
			c = TGS.LoggedIn() ? "tgs_logout_icon": "tgs_login_icon"; ! TGS._sPartnerBridge.supportsLogout() && TGS.LoggedIn() && (b.enabled = !1, b.visible = !1, c = null),
			b.setImage(c)
		}),
		b.addChild(c)
	} else b.addChild((new TGE.Button).setup({
		image: "tgs_login_icon",
		pressFunction: TGS.Microtransactions.RestorePurchases
	}));
	return b
},
TGS.CreateMoreGamesButton = function(a) {
	if (!window.TGE) return TGS.Debug.Log(TGS.Debug.LOG_ERROR, "you must be using the TreSensa TGE library to use TGS.CreateMoreGamesButton"),
	null;
	var b = new TGE.DisplayObjectContainer;
	if (TGS.MoreGamesURL()) {
		var c = (new TGE.Button).setup({
			image: "tgs_more_games",
			pressFunction: TGS.ShowMoreGames
		}),
		d = 0,
		e = 0,
		f = 1,
		g = TGE.Game.GetInstance().stage; - 1 !== a.indexOf("top") && (e = 40),
		-1 !== a.indexOf("bottom") && (e = g.height - 40, f = -1),
		-1 !== a.indexOf("left") && (d = 140),
		-1 !== a.indexOf("right") && (d = g.width - 140),
		-1 !== a.indexOf("center") && (d = g.width / 2, e -= 19 * f),
		b.x = d,
		b.y = e,
		b.addChild(c)
	}
	return b
},
TGS.MoreGamesURL = function() {
	return window.GameConfig && GameConfig.MoreGames.ENABLED ? GameConfig.MoreGames.URL: TGS._sPartnerBridge._mMoreGamesURL
},
TGS.ShowMoreGames = function() {
	TGS._sPartnerBridge.showMoreGames(),
	TGS.Analytics._logMoreGamesEvent(url)
},
TGS.OverlayMessage = function(a) {
	if (!a || !a.message) return void TGS.Debug.Log(TGS.Debug.LOG_ERROR, "no message specified in TGS.OverlayMessage call");
	null !== TGS._sMessageOverlay && TGS.CloseMessageOverlay();
	var b = TGS.BrowserDetect.onAndroid && parseInt(TGS.BrowserDetect.OSversion.charAt(0)) < 4,
	c = TGS.BrowserDetect.isMobileDevice ? window.TGE && TGE.Game.GetInstance() ? 1.2 * TGE.Game.GetInstance()._mViewportScale: .6 : 1,
	d = 1;
	b && (d = c, c = 1);
	var e = "undefined" == typeof a.overlayRed ? TGS.OverlayRed: a.overlayRed,
	f = "undefined" == typeof a.overlayGreen ? TGS.OverlayGreen: a.overlayGreen,
	g = "undefined" == typeof a.overlayBlue ? TGS.OverlayBlue: a.overlayBlue,
	h = "undefined" == typeof a.overlayOpacity ? TGS.OverlayOpacity: a.overlayOpacity,
	i = "string" != typeof a.buttonText ? "OK": a.buttonText,
	j = "undefined" == typeof a.buttonAction ? null: a.buttonAction,
	k = "undefined" == typeof a.buttonSize ? 1 : a.buttonSize,
	l = document.createElement("div");
	l.id = "overlay",
	l.style.zIndex = 10,
	l.style.position = "fixed",
	l.style.width = "100%",
	l.style.height = "100%",
	l.style.top = 0,
	l.style.left = 0,
	l.style.backgroundColor = "rgba(" + Math.round(255 * e).toString() + "," + Math.round(255 * f).toString() + "," + Math.round(255 * g).toString() + "," + h.toString() + ")",
	document.body.firstChild ? document.body.insertBefore(l, document.body.firstChild) : document.body.appendChild(l),
	TGS._sMessageOverlay = l;
	var m = 300 * d,
	n = 0 * d,
	o = 20 * d,
	p = document.createElement("div");
	p.id = "box",
	p.style.position = "absolute";
	var q = window.innerWidth / 2 - (m + 2 * o + 2 * n) * c / 2;
	p.style.left = q.toString() + "px",
	p.style.width = m + "px",
	p.style.marginLeft = "auto",
	p.style.marginRight = "auto",
	p.style.textAlign = "left",
	p.style.padding = o + "px",
	p.style.backgroundColor = "#fff",
	p.style.borderRadius = "5px",
	p.style.boxShadow = "0px 0px 20px 4px #222",
	l.insertBefore(p, l.firstChild);
	var r = null,
	s = null,
	t = null;
	if (r = document.createElement("img"), r.id = "close", r.src = TGS._IMAGES_LOCATION + "close-button.png", r.style.position = "absolute", r.style.top = "-" + o + "px", r.style.left = m + "px", r.style.padding = "10px", r.style.cursor = "pointer", p.insertBefore(r, p.firstChild), "" !== i && (s = document.createElement("div"), s.id = "button", s.style.width = Math.round(.4 * m * k * d) + "px", s.style.textAlign = "center", s.style.padding = Math.round(10 * k) + "px", s.style.backgroundColor = "#ef2e24", s.style.color = "#fff", s.style.fontSize = Math.round(20 * k * d) + "px", s.style.fontWeight = "bold", s.innerHTML = i, s.style.cursor = "pointer", p.insertBefore(s, p.firstChild)), a.button2Image) {
		var u = 15,
		v = document.createElement("div");
		v.style.marginLeft = "auto",
		v.style.marginRight = "auto",
		v.style.textAlign = "center",
		v.style.width = "100%",
		v.style.height = 90 + 2 * u + "px",
		v.backgroundColor = "#f00",
		p.insertBefore(v, p.firstChild),
		t = document.createElement("img"),
		t.id = "button2",
		t.src = a.button2Image,
		t.style.marginLeft = "auto",
		t.style.marginRight = "auto",
		t.style.textAlign = "center",
		t.style.padding = Math.round(u * d) + "px",
		t.height = Math.round(90 * d),
		t.width = Math.round(256 * d),
		t.style.cursor = "pointer",
		v.insertBefore(t, v.firstChild)
	} else a.button2Text && (t = document.createElement("div"), t.id = "button2", t.style.width = Math.round(.4 * m * k * d) + "px", t.style.textAlign = "center", t.style.padding = Math.round(10 * k) + "px", t.style.marginBottom = "15px", t.style.backgroundColor = "#ef2e24", t.style.color = "#fff", t.style.fontSize = Math.round(20 * k * d) + "px", t.style.fontWeight = "bold", t.innerHTML = a.button2Text, t.style.cursor = "pointer", p.insertBefore(t, p.firstChild));
	var w = document.createElement("div");
	if (w.id = "text", w.style.textAlign = "left", w.style.color = "#000", w.style.fontSize = Math.round(18 * d) + "px", w.style.paddingBottom = o + "px", w.innerHTML = a.message, p.insertBefore(w, p.firstChild), a.title) {
		var x = document.createElement("div");
		x.id = "title",
		x.style.textAlign = "left",
		x.style.color = "#000",
		x.style.fontSize = Math.round(26 * ((1 + d) / 2)) + "px",
		x.style.fontWeight = "bold",
		x.style.paddingBottom = "10px",
		x.innerHTML = a.title,
		p.insertBefore(x, p.firstChild)
	}
	var y = Math.min(window.innerHeight, window.GameConfig && "landscape" === GameConfig.ORIENTATION ? 536 : 832) / 2 - p.clientHeight * c / 2;
	p.style.top = y.toString() + "px";
	var z = TGS.BrowserDetect.isMobileDevice && "Windows Phone" !== TGS.BrowserDetect.platform ? "touchstart": "click";
	if (null !== s && s.addEventListener(z, TGS.CloseMessageOverlay.bind(this, j), !1), null !== r && r.addEventListener(z, TGS.CloseMessageOverlay.bind(this, j), !1), null !== t && t.addEventListener(z, a.button2Callback, !1), l.addEventListener("click", TGS._BlockEvent, !1), l.addEventListener("mousedown", TGS._BlockEvent, !1), l.addEventListener("mouseup", TGS._BlockEvent, !1), l.addEventListener("mousemove", TGS._BlockEvent, !1), l.addEventListener("touchstart", TGS._BlockEvent, !1), !b) {
		var A = p.getAttribute("style") || "";
		p.setAttribute("style", A + " -ms-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -moz-transform-origin: 0% 0%; -o-transform-origin: 0% 0%; transform-origin: 0% 0%; -ms-transform: scale(" + c + "); -webkit-transform: scale(" + c + "); -moz-transform: scale(" + c + "); -o-transform: scale(" + c + "); transform: scale(" + c + ");")
	}
},
TGS.CloseMessageOverlay = function(a) {
	null !== TGS._sMessageOverlay && (TGS._sMessageOverlay.parentNode && TGS._sMessageOverlay.parentNode.removeChild(TGS._sMessageOverlay), a && a.call(), TGS._sMessageOverlay = null)
},
TGS.OpenURL = function(a, b, c) {
	TGS._sPartnerBridge.openURL(a, b, c)
},
TGS.LoadingOverlay = function() {
	var a = TGS.OverlayRed,
	b = TGS.OverlayGreen,
	c = TGS.OverlayBlue,
	d = TGS.OverlayOpacity,
	e = document.createElement("div");
	e.id = "overlay",
	e.style.zIndex = 9,
	e.style.position = "fixed",
	e.style.width = "100%",
	e.style.height = "100%",
	e.style.top = 0,
	e.style.left = 0,
	e.style.backgroundColor = "rgba(" + Math.round(255 * a).toString() + "," + Math.round(255 * b).toString() + "," + Math.round(255 * c).toString() + "," + d.toString() + ")",
	document.body.firstChild ? document.body.insertBefore(e, document.body.firstChild) : document.body.appendChild(e);
	var f = document.createElement("img");
	f.id = "gif",
	f.src = TGS._IMAGES_LOCATION + "processing.gif";
	var g = .45 * window.innerHeight;
	return f.style.display = "block",
	f.style.marginLeft = "auto",
	f.style.marginRight = "auto",
	f.style.marginTop = g.toString() + "px",
	f.style.align = "center",
	e.insertBefore(f, e.firstChild),
	e.addEventListener("click", TGS._BlockEvent, !1),
	e.addEventListener("mousedown", TGS._BlockEvent, !1),
	e.addEventListener("mouseup", TGS._BlockEvent, !1),
	e.addEventListener("mousemove", TGS._BlockEvent, !1),
	e.addEventListener("touchstart", TGS._BlockEvent, !1),
	e
},
TGS._BlockEvent = function(a) {
	return a.stopPropagation(),
	a.preventDefault(),
	a.stopImmediatePropagation && a.stopImmediatePropagation(),
	!1
},
TGS.noop = function() {},
TGS.LoginRequest = function() {
	this.onSuccess = null,
	this.onFailure = null,
	this.onUserCancel = null
},
TGS.Adapters.GenericAdapter = function() {
	TGS.Adapters.GenericAdapter.superclass.constructor.call(this),
	TGS.DataStore._sSaveToLocalStorage = !0,
	TGS.DataStore._sSaveToTGSServer = !1,
	this._mMoreGamesURL = "http://www.mobilewebarcade.com/"
},
TGS.Adapters.GenericAdapter.prototype = {},
extend(TGS.Adapters.GenericAdapter, TGS.PartnerBridge),
TGS.Adapters.Q0000 = function() {
	TGS.Adapters.Q0000.superclass.constructor.call(this),
	this._mLoggedIn = !1,
	this._mMoreGamesURL = "http://www.mobilewebarcade.com/",
	"false" === getQueryString().fb && (this._mFacebookServicesAllowed = !1, this._mUseUserInfoInSLB = !0),
	TGS.DataStore._sSaveToLocalStorage = !0,
	TGS.DataStore._sSaveToTGSServer = !1
},
TGS.Adapters.Q0000.prototype = {
	supportsMicrotransactions: function() {
		return ! 0
	},
	autoLogin: function() {
		return ! 1
	},
	costFactor: function() {
		return 10
	},
	priceAsFormattedString: function(a) {
		return "$" + (a * this.costFactor() / 100 - .01).toFixed(2)
	},
	currencyIcon: function() {
		return TGS._IMAGES_LOCATION + "testicon.png"
	},
	connect: function() {
		this.getLoginStatus()
	},
	loginUser: function(a) {
		TGS.Debug.Log(TGS.Debug.LOG_INFO, "prompting user to login...");
		var b = window.prompt("LOGIN (enter your username):", "");
		return b ? "string" != typeof b || b.length < 1 ? void TGS._LoginFailed(a) : (this._mUsername = b, void this.userLoggedIn(a, b)) : void TGS._LoginCanceled(a)
	},
	purchaseItem: function(a) {
		a.partnerTransactionID = ~~ (2147483648 * Math.random()),
		setTimeout(this.openPurchase.bind(this, a), 2e3)
	},
	openPurchase: function(a) {
		var b = "Do you agree to pay " + this.priceAsFormattedString(a.item.price) + " to buy " + a.item.title + "?",
		c = confirm(b);
		setTimeout(this.closePurchase.bind(this, c, a), 1e3)
	},
	closePurchase: function(a, b) {
		a ? window.GameConfig && GameConfig.PROD_ENV === !0 ? (b.internalErrorMessage = "PROD_ENV=true", b.userErrorMessage = "IAP purchases are not allowed in production.", TGS.Microtransactions._PartnerPurchaseFailed(b)) : (TGS.Debug.Log(TGS.Debug.LOG_INFO, "TestAdapter approved purchase of transaction " + b.transactionID), TGS.Microtransactions._PartnerPurchaseSuccessful(b)) : (b.internalErrorMessage = "user cancelled", b.userErrorMessage = "", TGS.Microtransactions._PartnerPurchaseFailed(b))
	}
},
extend(TGS.Adapters.Q0000, TGS.PartnerBridge);
TGS.version = '0.3.8';
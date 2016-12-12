function SwitEntryPoint() {}
SwitEntryPoint.BOOT_FILE = "js/main.js";
SwitEntryPoint.infoBrowser = {};
SwitEntryPoint.include = function(a) {
	document.write('<script type="text/javascript" language="javascript" src="' + a + '">\x3c/script>')
};
SwitEntryPoint.test = function() {
	if ("undefined" === typeof window.SwitEntryFiles) SwitEntryPoint.include(SwitEntryPoint.BOOT_FILE);
	else for (var a = window.SwitEntryFiles,
	b = 0; b < a.length; b++) SwitEntryPoint.include(a[b])
};
SwitEntryPoint.start = function() {
	SwitEntryPoint.include(SwitEntryPoint.BOOT_FILE)
};
SwitEntryPoint.setEntry = function() {
	SwitEntryPoint.detectBrowser(navigator);
	var a = SwitEntryPoint.isBrowserSupported();
	"supported" !== a && (window.location = "old" === a ? "lowversion.html" + window.location.search: "unsupported.html" + window.location.search)
};
SwitEntryPoint.detectBrowser = function(a) {
	SwitEntryPoint.infoBrowser.platformType = a.platform;
	SwitEntryPoint.infoBrowser.browserName = a.appName;
	SwitEntryPoint.infoBrowser.browserVersion = parseFloat(a.appVersion);
	SwitEntryPoint.infoBrowser.iDevice = !1;
	SwitEntryPoint.infoBrowser.touchDevice = !1;
	SwitEntryPoint.infoBrowser.platformVersion = 0;
	SwitEntryPoint.infoBrowser.isIE = !1;
	if ( - 1 != a.platform.indexOf("iPhone")) {
		if (SwitEntryPoint.infoBrowser.iDevice = !0, SwitEntryPoint.infoBrowser.touchDevice = !0, SwitEntryPoint.infoBrowser.platformType = "iPhone", /OS (\d+\_\d+)/.test(a.userAgent)) {
			var b = RegExp.$1,
			b = b.replace("_", ".");
			SwitEntryPoint.infoBrowser.platformVersion = parseFloat(b)
		}
	} else - 1 != a.platform.indexOf("iPod") ? (SwitEntryPoint.infoBrowser.iDevice = !0, SwitEntryPoint.infoBrowser.touchDevice = !0, SwitEntryPoint.infoBrowser.platformType = "iPod", /OS (\d+\_\d+)/.test(a.userAgent) && (b = RegExp.$1, b = b.replace("_", "."), SwitEntryPoint.infoBrowser.platformVersion = parseFloat(b))) : -1 != a.platform.indexOf("iPad") ? (SwitEntryPoint.infoBrowser.iDevice = !0, SwitEntryPoint.infoBrowser.touchDevice = !0, SwitEntryPoint.infoBrowser.platformType = "iPad", /OS (\d+\_\d+)/.test(a.userAgent) && (b = RegExp.$1, b = b.replace("_", "."), SwitEntryPoint.infoBrowser.platformVersion = parseFloat(b))) : -1 != a.userAgent.indexOf("Kindle") ? (b = -1 != a.userAgent.indexOf("Kindle Fire"), SwitEntryPoint.infoBrowser.touchDevice = b, SwitEntryPoint.infoBrowser.platformType = b ? "Kindle Fire": "Kindle", /Android (\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.platformVersion = parseFloat(RegExp.$1))) : -1 != a.userAgent.indexOf("Android") ? (SwitEntryPoint.infoBrowser.touchDevice = !0, SwitEntryPoint.infoBrowser.platformType = "Android", /Android (\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.platformVersion = parseFloat(RegExp.$1))) : -1 != a.userAgent.indexOf("IEMobile") ? (SwitEntryPoint.infoBrowser.touchDevice = !0, SwitEntryPoint.infoBrowser.platformType = "IEMobile", /IEMobile\/(\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.platformVersion = parseFloat(RegExp.$1))) : -1 != a.platform.indexOf("Win") ? SwitEntryPoint.infoBrowser.platformType = "Win": -1 != a.platform.indexOf("Mac") ? (SwitEntryPoint.infoBrowser.platformType = "Mac", /OS X (\d+\_\d+)/.test(a.userAgent) && (b = RegExp.$1, b = b.replace("_", "."), SwitEntryPoint.infoBrowser.platformVersion = parseFloat(b))) : -1 != a.platform.indexOf("Linux") && (SwitEntryPoint.infoBrowser.platformType = "Linux"); - 1 != a.userAgent.indexOf("Firefox") ? (SwitEntryPoint.infoBrowser.browserName = "Firefox", /Firefox[\/\s](\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.browserVersion = parseFloat(RegExp.$1))) : -1 != a.userAgent.indexOf("MSIE") ? (SwitEntryPoint.infoBrowser.msTouchDevice = 0 < a.msMaxTouchPoints, SwitEntryPoint.infoBrowser.browserName = "MSIE", SwitEntryPoint.infoBrowser.isIE = !0, /MSIE (\d+\.\d+);/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.browserVersion = parseFloat(RegExp.$1))) : -1 != a.userAgent.indexOf("Opera") ? (SwitEntryPoint.infoBrowser.browserName = "Opera", /Opera[\/\s](\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.browserVersion = parseFloat(RegExp.$1))) : -1 != a.userAgent.indexOf("Chrome") ? (SwitEntryPoint.infoBrowser.browserName = "Chrome", /Chrome[\/\s](\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.browserVersion = parseFloat(RegExp.$1))) : -1 != a.userAgent.indexOf("CriOS") ? (SwitEntryPoint.infoBrowser.browserName = "Chrome", /CriOS[\/\s](\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.browserVersion = parseFloat(RegExp.$1))) : -1 != a.userAgent.indexOf("Safari") ? (SwitEntryPoint.infoBrowser.browserName = "Safari", /Version[\/\s](\d+\.\d+)/.test(a.userAgent) && (SwitEntryPoint.infoBrowser.browserVersion = parseFloat(RegExp.$1))) : SwitEntryPoint.infoBrowser.iDevice ? SwitEntryPoint.infoBrowser.browserName = "Safari": "Netscape" == a.appName && (b = 0, null != /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(a.userAgent) && (b = parseFloat(RegExp.$1)), 11 <= b && (SwitEntryPoint.infoBrowser.msTouchDevice = 0 < a.msMaxTouchPoints, SwitEntryPoint.infoBrowser.browserName = "MSIE", SwitEntryPoint.infoBrowser.isIE = !0, SwitEntryPoint.infoBrowser.browserVersion = b)); - 1 != a.userAgent.indexOf("WebKit") ? SwitEntryPoint.infoBrowser.browserType = "WebKit": SwitEntryPoint.infoBrowser.browserType = SwitEntryPoint.infoBrowser.browserName
};
SwitEntryPoint.isBrowserSupported = function() {
	for (var a = window.config,
	b = 0; b < a.browserSettings.length; b++) {
		var c = a.browserSettings[b];
		if (! (c.browserType && SwitEntryPoint.infoBrowser.browserName != c.browserType || c.platformType && SwitEntryPoint.infoBrowser.platformType != c.platformType)) {
			if (0 > c.minVersion) break;
			return SwitEntryPoint.infoBrowser.browserVersion < c.minVersion ? "old": "supported"
		}
	}
	return "unsupported"
};
document.oncontextmenu = function(a) {
	a = a || window.event;
	if (a.preventDefault) a.preventDefault();
	else return ! 1
};
document.ontouchmove = function(a) {
	a = a || window.event;
	a.preventDefault()
};
document.ontouchstart = function(a) {
	a = a || window.event;
	a.preventDefault()
};
document.ontouchend = function(a) {
	a = a || window.event;
	a.preventDefault()
};
SwitEntryPoint.setEntry();
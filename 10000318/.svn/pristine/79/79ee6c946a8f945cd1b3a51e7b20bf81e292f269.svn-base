/* TreSensa Game Loader, TGL-SDK, Version 1.0.27 */
/* Copyright (c) 2013 TreSensa, Inc. All Rights Reserved. */
!
function(a, b) {
	"use strict";
	function c() {}
	function d(a, b) {
		if (a) {
			"object" == typeof a && (a = [].slice.call(a));
			for (var c = 0,
			d = a.length; d > c; c++) b.call(a, a[c], c)
		}
	}
	function e(a, c) {
		var d = Object.prototype.toString.call(c).slice(8, -1);
		return c !== b && null !== c && d === a
	}
	function f(a) {
		return e("Function", a)
	}
	function g(a) {
		return e("Array", a)
	}
	function h(a) {
		var b = a.split("/"),
		c = b[b.length - 1],
		d = c.indexOf("?");
		return - 1 !== d ? c.substring(0, d) : c
	}
	function i(a) {
		a = a || c,
		a._done || (a(), a._done = 1)
	}
	function j(a, b, d, e) {
		var f = "object" == typeof a ? a: {
			test: a,
			success: b ? g(b) ? b: [b] : !1,
			failure: d ? g(d) ? d: [d] : !1,
			callback: e || c
		},
		h = !!f.test;
		return h && f.success ? (f.success.push(f.callback), E.load.apply(null, f.success)) : !h && f.failure ? (f.failure.push(f.callback), E.load.apply(null, f.failure)) : e(),
		E
	}
	function k(a) {
		var b = {};
		if ("object" == typeof a) for (var c in a) a[c] && (b = {
			name: c,
			url: a[c]
		});
		else b = {
			name: h(a),
			url: a
		};
		var d = B[b.name];
		return d && d.url === b.url ? d: (B[b.name] = b, b)
	}
	function l(a) {
		a = a || B;
		for (var b in a) if (a.hasOwnProperty(b) && a[b].state !== I) return ! 1;
		return ! 0
	}
	function m(a) {
		a.state = G,
		d(a.onpreload,
		function(a) {
			a.call()
		})
	}
	function n(a) {
		a.state === b && (a.state = F, a.onpreload = [], s({
			url: a.url,
			type: "cache"
		},
		function() {
			m(a)
		}))
	}
	function o() {
		var a = arguments,
		b = a[a.length - 1],
		c = [].slice.call(a, 1),
		e = c[0];
		return f(b) || (b = null),
		g(a[0]) ? (a[0].push(b), E.load.apply(null, a[0]), E) : (e ? (d(c,
		function(a) { ! f(a) && a && n(k(a))
		}), q(k(a[0]), f(e) ? e: function() {
			E.load.apply(null, c)
		})) : q(k(a[0])), E)
	}
	function p() {
		var a = arguments,
		b = a[a.length - 1],
		c = {};
		return f(b) || (b = null),
		g(a[0]) ? (a[0].push(b), E.load.apply(null, a[0]), E) : (d(a,
		function(a) {
			a !== b && (a = k(a), c[a.name] = a)
		}), d(a,
		function(a) {
			a !== b && (a = k(a), q(a,
			function() {
				l(c) && i(b)
			}))
		}), E)
	}
	function q(a, b) {
		return b = b || c,
		a.state === I ? void b() : a.state === H ? void E.ready(a.name, b) : a.state === F ? void a.onpreload.push(function() {
			q(a, b)
		}) : (a.state = H, void s(a,
		function() {
			a.state = I,
			b(),
			d(A[a.name],
			function(a) {
				i(a)
			}),
			x && l() && d(A.ALL,
			function(a) {
				i(a)
			})
		}))
	}
	function r(a) {
		a = a || "";
		var b = a.split("?")[0].split(".");
		return b[b.length - 1].toLowerCase()
	}
	function s(b, d) {
		function e(b) {
			b = b || a.event,
			h.onload = h.onreadystatechange = h.onerror = null,
			d()
		}
		function f(c) {
			c = c || a.event,
			("load" === c.type || /loaded|complete/.test(h.readyState) && (!y.documentMode || y.documentMode < 9)) && (a.clearTimeout(b.errorTimeout), a.clearTimeout(b.cssTimeout), h.onload = h.onreadystatechange = h.onerror = null, d())
		}
		function g() {
			if (b.state !== I && b.cssRetries <= 20) {
				for (var c = 0,
				d = y.styleSheets.length; d > c; c++) if (y.styleSheets[c].href === h.href) return void f({
					type: "load"
				});
				b.cssRetries++,
				b.cssTimeout = a.setTimeout(g, 250)
			}
		}
		d = d || c;
		var h, i = r(b.url);
		"css" === i ? (h = y.createElement("link"), h.type = "text/" + (b.type || "css"), h.rel = "stylesheet", h.href = b.url, b.cssRetries = 0, b.cssTimeout = a.setTimeout(g, 500)) : (h = y.createElement("script"), h.type = "text/" + (b.type || "javascript"), h.src = b.url),
		h.onload = h.onreadystatechange = f,
		h.onerror = e,
		h.async = !1,
		h.defer = !1,
		b.errorTimeout = a.setTimeout(function() {
			e({
				type: "timeout"
			})
		},
		7e3);
		var j = y.head || y.getElementsByTagName("head")[0];
		j.insertBefore(h, j.lastChild)
	}
	function t() {
		for (var a = y.getElementsByTagName("script"), b = 0, c = a.length; c > b; b++) {
			var d = a[b].getAttribute("data-headjs-load");
			if (d) return void E.load(d)
		}
	}
	function u(a, b) {
		if (a === y) return x ? i(b) : z.push(b),
		E;
		if (f(a) && (b = a, a = "ALL"), g(a)) {
			var c = {};
			return d(a,
			function(a) {
				c[a] = B[a],
				E.ready(a,
				function() {
					l(c) && i(b)
				})
			}),
			E
		}
		if ("string" != typeof a || !f(b)) return E;
		var e = B[a];
		if (e && e.state === I || "ALL" === a && l() && x) return i(b),
		E;
		var h = A[a];
		return h ? h.push(b) : h = A[a] = [b],
		E
	}
	function v() {
		return y.body ? void(x || (x = !0, t(), d(z,
		function(a) {
			i(a)
		}))) : (a.clearTimeout(E.readyTimeout), void(E.readyTimeout = a.setTimeout(v, 50)))
	}
	function w() {
		y.addEventListener ? (y.removeEventListener("DOMContentLoaded", w, !1), v()) : "complete" === y.readyState && (y.detachEvent("onreadystatechange", w), v())
	}
	var x, y = a.document,
	z = [],
	A = {},
	B = {},
	C = "async" in y.createElement("script") || "MozAppearance" in y.documentElement.style || a.opera,
	D = a.head_conf && a.head_conf.head || "head",
	E = a[D] = a[D] ||
	function() {
		E.ready.apply(null, arguments)
	},
	F = 1,
	G = 2,
	H = 3,
	I = 4;
	if ("complete" === y.readyState) v();
	else if (y.addEventListener) y.addEventListener("DOMContentLoaded", w, !1),
	a.addEventListener("load", v, !1);
	else {
		y.attachEvent("onreadystatechange", w),
		a.attachEvent("onload", v);
		var J = !1;
		try {
			J = !a.frameElement && y.documentElement
		} catch(K) {}
		J && J.doScroll && !
		function L() {
			if (!x) {
				try {
					J.doScroll("left")
				} catch(b) {
					return a.clearTimeout(E.readyTimeout),
					void(E.readyTimeout = a.setTimeout(L, 50))
				}
				v()
			}
		} ()
	}
	E.load = E.js = C ? p: o,
	E.test = j,
	E.ready = u,
	E.ready(y,
	function() {
		l() && d(A.ALL,
		function(a) {
			i(a)
		}),
		E.feature && E.feature("domloaded", !0)
	})
} (window),
function() {
	head.js("js/GameConfig.js",
	function() {
		if ("undefined" == typeof GameConfig) return void alert("FATAL ERROR: Unable to locate GameConfig");
		var a;
		return GameConfig.hasOwnProperty("TGL") ? (GameConfig.NATIVE_APP = !("undefined" == typeof CordovaConfig), GameConfig.TIZEN_APP = !("undefined" == typeof TizenConfig), void(GameConfig.TGL.VERSION ? (a = GameConfig.DEBUG ? "js/lib-debug/tgl/tgl-" + GameConfig.TGL.VERSION + ".js": GameConfig.NATIVE_APP || GameConfig.TIZEN_APP ? "js/lib/tgl/tgl-" + GameConfig.TGL.VERSION + ".min.js": GameConfig.LIB_DIR ? GameConfig.LIB_DIR + "tgl/tgl-" + GameConfig.TGL.VERSION + ".min.js": "file:" == location.protocol ? "./4399/tgl/tgl-" + GameConfig.TGL.VERSION + ".min.js": "./4399/tgl/tgl-" + GameConfig.TGL.VERSION + ".min.js", head.js(a)) : alert("FATAL ERROR: Unable to load TGL"))) : void alert("FATAL ERROR: Unable to load TGL")
	})
} ();
'use strict';
var COMPILED = !0,
goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function(a) {
	if (!COMPILED) {
		if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
		delete goog.implicitNamespaces_[a];
		for (var b = a; (b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) goog.implicitNamespaces_[b] = !0
	}
	goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
	if (COMPILED && !goog.DEBUG) throw a = a || "",
	Error("Importing test-only code into non-debug environment" + a ? ": " + a: ".");
};
COMPILED || (goog.isProvided_ = function(a) {
	return ! goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
},
goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
	a = a.split(".");
	c = c || goog.global;
	a[0] in c || !c.execScript || c.execScript("var " + a[0]);
	for (var d; a.length && (d = a.shift());) ! a.length && goog.isDef(b) ? c[d] = b: c = c[d] ? c[d] : c[d] = {}
};
goog.getObjectByName = function(a, b) {
	for (var c = a.split("."), d = b || goog.global, e; e = c.shift();) if (goog.isDefAndNotNull(d[e])) d = d[e];
	else return null;
	return d
};
goog.globalize = function(a, b) {
	var c = b || goog.global,
	d;
	for (d in a) c[d] = a[d]
};
goog.addDependency = function(a, b, c) {
	if (!COMPILED) {
		var d;
		a = a.replace(/\\/g, "/");
		for (var e = goog.dependencies_,
		f = 0; d = b[f]; f++) e.nameToPath[d] = a,
		a in e.pathToNames || (e.pathToNames[a] = {}),
		e.pathToNames[a][d] = !0;
		for (d = 0; b = c[d]; d++) a in e.requires || (e.requires[a] = {}),
		e.requires[a][b] = !0
	}
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
	if (!COMPILED && !goog.isProvided_(a)) {
		if (goog.ENABLE_DEBUG_LOADER) {
			var b = goog.getPathFromDeps_(a);
			if (b) {
				goog.included_[b] = !0;
				goog.writeScripts_();
				return
			}
		}
		a = "goog.require could not find: " + a;
		goog.global.console && goog.global.console.error(a);
		throw Error(a);
	}
};
goog.basePath = "";
goog.global.CLOSURE_NO_DEPS = !0;
goog.nullFunction = function() {};
goog.identityFunction = function(a, b) {
	return a
};
goog.abstractMethod = function() {
	throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
	a.getInstance = function() {
		if (a.instance_) return a.instance_;
		goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
		return a.instance_ = new a
	}
};
goog.instantiatedSingletons_ = []; ! COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {},
goog.dependencies_ = {
	pathToNames: {},
	nameToPath: {},
	requires: {},
	visited: {},
	written: {}
},
goog.inHtmlDocument_ = function() {
	var a = goog.global.document;
	return "undefined" != typeof a && "write" in a
},
goog.findBasePath_ = function() {
	if (goog.global.CLOSURE_BASE_PATH) goog.basePath = goog.global.CLOSURE_BASE_PATH;
	else if (goog.inHtmlDocument_()) for (var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1; 0 <= b; --b) {
		var c = a[b].src,
		d = c.lastIndexOf("?"),
		d = -1 == d ? c.length: d;
		if ("base.js" == c.substr(d - 7, 7)) {
			goog.basePath = c.substr(0, d - 7);
			break
		}
	}
},
goog.importScript_ = function(a) {
	var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_; ! goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
},
goog.writeScriptTag_ = function(a) {
	if (goog.inHtmlDocument_()) {
		var b = goog.global.document;
		if ("complete" == b.readyState) {
			if (/\bdeps.js$/.test(a)) return ! 1;
			throw Error('Cannot write "' + a + '" after document load');
		}
		b.write('<script type="text/javascript" src="' + a + '">\x3c/script>');
		return ! 0
	}
	return ! 1
},
goog.writeScripts_ = function() {
	function a(e) {
		if (! (e in d.written)) {
			if (! (e in d.visited) && (d.visited[e] = !0, e in d.requires)) for (var g in d.requires[e]) if (!goog.isProvided_(g)) if (g in d.nameToPath) a(d.nameToPath[g]);
			else throw Error("Undefined nameToPath for " + g);
			e in c || (c[e] = !0, b.push(e))
		}
	}
	var b = [],
	c = {},
	d = goog.dependencies_,
	e;
	for (e in goog.included_) d.written[e] || a(e);
	for (e = 0; e < b.length; e++) if (b[e]) goog.importScript_(goog.basePath + b[e]);
	else throw Error("Undefined script input");
},
goog.getPathFromDeps_ = function(a) {
	return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
},
goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
	var b = typeof a;
	if ("object" == b) if (a) {
		if (a instanceof Array) return "array";
		if (a instanceof Object) return b;
		var c = Object.prototype.toString.call(a);
		if ("[object Window]" == c) return "object";
		if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
		if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
	} else return "null";
	else if ("function" == b && "undefined" == typeof a.call) return "object";
	return b
};
goog.isDef = function(a) {
	return void 0 !== a
};
goog.isNull = function(a) {
	return null === a
};
goog.isDefAndNotNull = function(a) {
	return null != a
};
goog.isArray = function(a) {
	return "array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
	var b = goog.typeOf(a);
	return "array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
	return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
	return "string" == typeof a
};
goog.isBoolean = function(a) {
	return "boolean" == typeof a
};
goog.isNumber = function(a) {
	return "number" == typeof a
};
goog.isFunction = function(a) {
	return "function" == goog.typeOf(a)
};
goog.isObject = function(a) {
	var b = typeof a;
	return "object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
	return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
	"removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
	try {
		delete a[goog.UID_PROPERTY_]
	} catch(b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
	var b = goog.typeOf(a);
	if ("object" == b || "array" == b) {
		if (a.clone) return a.clone();
		var b = "array" == b ? [] : {},
		c;
		for (c in a) b[c] = goog.cloneObject(a[c]);
		return b
	}
	return a
};
goog.bindNative_ = function(a, b, c) {
	return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
	if (!a) throw Error();
	if (2 < arguments.length) {
		var d = Array.prototype.slice.call(arguments, 2);
		return function() {
			var c = Array.prototype.slice.call(arguments);
			Array.prototype.unshift.apply(c, d);
			return a.apply(b, c)
		}
	}
	return function() {
		return a.apply(b, arguments)
	}
};
goog.bind = function(a, b, c) {
	Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_: goog.bind = goog.bindJs_;
	return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
	var c = Array.prototype.slice.call(arguments, 1);
	return function() {
		var b = Array.prototype.slice.call(arguments);
		b.unshift.apply(b, c);
		return a.apply(this, b)
	}
};
goog.mixin = function(a, b) {
	for (var c in b) a[c] = b[c]
};
goog.now = goog.TRUSTED_SITE && Date.now ||
function() {
	return + new Date
};
goog.globalEval = function(a) {
	if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
	else if (goog.global.eval) if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) goog.global.eval(a);
	else {
		var b = goog.global.document,
		c = b.createElement("script");
		c.type = "text/javascript";
		c.defer = !1;
		c.appendChild(b.createTextNode(a));
		b.body.appendChild(c);
		b.body.removeChild(c)
	} else throw Error("goog.globalEval not available");
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
	var c = function(a) {
		return goog.cssNameMapping_[a] || a
	},
	d = function(a) {
		a = a.split("-");
		for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
		return b.join("-")
	},
	d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c: d: function(a) {
		return a
	};
	return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
	goog.cssNameMapping_ = a;
	goog.cssNameMappingStyle_ = b
}; ! COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
	var c = b || {},
	d;
	for (d in c) {
		var e = ("" + c[d]).replace(/\$/g, "$$$$");
		a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
	}
	return a
};
goog.getMsgWithFallback = function(a, b) {
	return a
};
goog.exportSymbol = function(a, b, c) {
	goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
	a[b] = c
};
goog.inherits = function(a, b) {
	function c() {}
	c.prototype = b.prototype;
	a.superClass_ = b.prototype;
	a.prototype = new c;
	a.prototype.constructor = a
};
goog.base = function(a, b, c) {
	var d = arguments.callee.caller;
	if (d.superClass_) return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
	for (var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor) if (g.prototype[b] === d) f = !0;
	else if (f) return g.prototype[b].apply(a, e);
	if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
	throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
	a.call(goog.global)
};
function Assets() {}
window.Assets = Assets;
Assets.assetsParams = {
	control_stand: {
		u: "control_stand.png",
		w: 92,
		h: 100,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 46,
		cy: 81,
		collision: "x:-41;y:-16;w:80;h:30"
	},
	control_hit: {
		u: "control_hit.png",
		w: 92,
		h: 100,
		f: [0, 0, 1, 1, 0, 0, 1, 1],
		fps: 30,
		cx: 46,
		cy: 81,
		collision: "x:-41;y:-16;w:80;h:30"
	},
	control_hidden: {
		u: "control_hidden.png",
		w: 92,
		h: 38,
		f: [0],
		fps: 30,
		cx: 46,
		cy: 19,
		collision: "x:-41;y:-16;w:80;h:30"
	},
	control_disappear: {
		u: "control_disappear.png",
		w: 92,
		h: 102,
		f: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7],
		fps: 30,
		cx: 46,
		cy: 81,
		collision: "x:-41;y:-16;w:80;h:30"
	},
	control_break_stand: {
		u: "control_break_stand.png",
		w: 92,
		h: 65,
		f: [0],
		fps: 30,
		cx: 46,
		cy: 46,
		collision: "x:-41;y:-16;w:80;h:30"
	},
	control_break: {
		u: "control_break.png",
		w: 344,
		h: 346,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 172,
		cy: 222,
		collision: "x:-41;y:-16;w:80;h:30"
	},
	control_appear: {
		u: "control_appear.png",
		w: 92,
		h: 102,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7],
		fps: 30,
		cx: 46,
		cy: 81,
		collision: "x:-41;y:-16;w:80;h:30"
	},
	mcRoom_woy_2: {
		u: "mcRoom_woy_2.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_woy_1: {
		u: "mcRoom_woy_1.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_tutorial: {
		u: "mcRoom_tutorial.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_rc_2: {
		u: "mcRoom_rc_2.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_rc_1: {
		u: "mcRoom_rc_1.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_pf_2: {
		u: "mcRoom_pf_2.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_pf_1: {
		u: "mcRoom_pf_1.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_mainBoss: {
		u: "mcRoom_mainBoss.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_gf_2: {
		u: "mcRoom_gf_2.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mcRoom_gf_1: {
		u: "mcRoom_gf_1.png",
		w: 752,
		h: 500,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mc_generator_opening_dmg: {
		u: "mc_generator_opening_dmg.png",
		w: 67,
		h: 94,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 35,
		cy: 576,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_opening: {
		u: "mc_generator_opening.png",
		w: 67,
		h: 94,
		f: [0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 35,
		cy: 576,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_open_dmg: {
		u: "mc_generator_open_dmg.png",
		w: 112,
		h: 154,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 56,
		cy: 120,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_open: {
		u: "mc_generator_open.png",
		w: 112,
		h: 154,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 56,
		cy: 120,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_null: {
		u: "mc_generator_null.png",
		w: 3,
		h: 1,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_hit_dmg: {
		u: "mc_generator_hit_dmg.png",
		w: 117,
		h: 158,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 58,
		cy: 122,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_hit: {
		u: "mc_generator_hit.png",
		w: 117,
		h: 158,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 58,
		cy: 122,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_hide: {
		u: "mc_generator_hide.png",
		w: 112,
		h: 66,
		f: [0],
		fps: 30,
		cx: 56,
		cy: 32,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_fx_spark3: {
		u: "mc_generator_fx_spark3.png",
		w: 156,
		h: 196,
		f: [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12],
		fps: 30,
		cx: 73,
		cy: 144,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_fx_spark2: {
		u: "mc_generator_fx_spark2.png",
		w: 155,
		h: 196,
		f: [0, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 10],
		fps: 30,
		cx: 76,
		cy: 140,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_fx_spark1: {
		u: "mc_generator_fx_spark1.png",
		w: 155,
		h: 196,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 5, 5, 5, 5, 5, 5, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 5, 5, 5, 5],
		fps: 30,
		cx: 75,
		cy: 140,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_door_dmg: {
		u: "mc_generator_door_dmg.png",
		w: 67,
		h: 94,
		f: [0],
		fps: 30,
		cx: 35,
		cy: 45,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_door: {
		u: "mc_generator_door.png",
		w: 67,
		h: 94,
		f: [0],
		fps: 30,
		cx: 35,
		cy: 45,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_disappear_dmg: {
		u: "mc_generator_disappear_dmg.png",
		w: 112,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 56,
		cy: 32,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_disappear2_dmg: {
		u: "mc_generator_disappear2_dmg.png",
		w: 112,
		h: 175,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 56,
		cy: 141,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_disappear2: {
		u: "mc_generator_disappear2.png",
		w: 112,
		h: 174,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 56,
		cy: 140,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_disappear: {
		u: "mc_generator_disappear.png",
		w: 112,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 56,
		cy: 32,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_destroyed: {
		u: "mc_generator_destroyed.png",
		w: 145,
		h: 175,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 72,
		cy: 141,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_closing_dmg: {
		u: "mc_generator_closing_dmg.png",
		w: 67,
		h: 94,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 35,
		cy: 576,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_closing: {
		u: "mc_generator_closing.png",
		w: 67,
		h: 94,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 35,
		cy: 576,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_closed_dmg: {
		u: "mc_generator_closed_dmg.png",
		w: 112,
		h: 154,
		f: [0],
		fps: 30,
		cx: 56,
		cy: 120,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_closed: {
		u: "mc_generator_closed.png",
		w: 112,
		h: 154,
		f: [0],
		fps: 30,
		cx: 56,
		cy: 120,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_broked: {
		u: "mc_generator_broked.png",
		w: 112,
		h: 78,
		f: [0, 0],
		fps: 30,
		cx: 56,
		cy: 44,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_appear_dmg: {
		u: "mc_generator_appear_dmg.png",
		w: 112,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 56,
		cy: 32,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_appear2_dmg: {
		u: "mc_generator_appear2_dmg.png",
		w: 112,
		h: 175,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 56,
		cy: 141,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_appear2: {
		u: "mc_generator_appear2.png",
		w: 112,
		h: 174,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 56,
		cy: 140,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_generator_appear: {
		u: "mc_generator_appear.png",
		w: 112,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 56,
		cy: 32,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_fx_spark_3: {
		u: "mc_fx_spark_3.png",
		w: 132,
		h: 80,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 64,
		cy: 39,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_fx_spark_2: {
		u: "mc_fx_spark_2.png",
		w: 130,
		h: 87,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 64,
		cy: 42,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_fx_spark_1: {
		u: "mc_fx_spark_1.png",
		w: 127,
		h: 45,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 63,
		cy: 22,
		collision: "x:-40;y:-100;w:78;h:112"
	},
	mc_door4_light4: {
		u: "mc_door4_light4.png",
		w: 3,
		h: 1,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mc_door4_light3: {
		u: "mc_door4_light3.png",
		w: 218,
		h: 155,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2],
		fps: 30,
		cx: -261,
		cy: -297
	},
	mc_door4_light2: {
		u: "mc_door4_light2.png",
		w: 261,
		h: 154,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1],
		fps: 30,
		cx: -234,
		cy: -302
	},
	mc_door4_light1: {
		u: "mc_door4_light1.png",
		w: 218,
		h: 157,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2],
		fps: 30,
		cx: -257,
		cy: -295
	},
	mc_door3_light4: {
		u: "mc_door3_light4.png",
		w: 3,
		h: 1,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mc_door3_light3: {
		u: "mc_door3_light3.png",
		w: 218,
		h: 154,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: -263,
		cy: -107
	},
	mc_door3_light2: {
		u: "mc_door3_light2.png",
		w: 261,
		h: 154,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1],
		fps: 30,
		cx: -242,
		cy: -107
	},
	mc_door3_light1: {
		u: "mc_door3_light1.png",
		w: 218,
		h: 154,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: -263,
		cy: -107
	},
	mc_door3_bg: {
		u: "mc_door3_bg.png",
		w: 166,
		h: 114,
		f: [0],
		fps: 30,
		cx: -298,
		cy: -24
	},
	mc_door2_light4: {
		u: "mc_door2_light4.png",
		w: 3,
		h: 1,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mc_door2_light3: {
		u: "mc_door2_light3.png",
		w: 97,
		h: 188,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: -53,
		cy: -216
	},
	mc_door2_light2: {
		u: "mc_door2_light2.png",
		w: 75,
		h: 222,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1],
		fps: 30,
		cx: -54,
		cy: -220
	},
	mc_door2_light1: {
		u: "mc_door2_light1.png",
		w: 87,
		h: 188,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: -53,
		cy: -219
	},
	mc_door2_bg: {
		u: "mc_door2_bg.png",
		w: 86,
		h: 203,
		f: [0],
		fps: 30,
		cx: 0,
		cy: -193
	},
	mc_door1_light4: {
		u: "mc_door1_light4.png",
		w: 3,
		h: 1,
		f: [0],
		fps: 30,
		cx: 1,
		cy: 1
	},
	mc_door1_light3: {
		u: "mc_door1_light3.png",
		w: 90,
		h: 188,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: -609,
		cy: -217
	},
	mc_door1_light2: {
		u: "mc_door1_light2.png",
		w: 75,
		h: 222,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1],
		fps: 30,
		cx: -624,
		cy: -215
	},
	mc_door1_light1: {
		u: "mc_door1_light1.png",
		w: 91,
		h: 188,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: -608,
		cy: -214
	},
	mc_door1_bg: {
		u: "mc_door1_bg.png",
		w: 91,
		h: 188,
		f: [0],
		fps: 30,
		cx: -662,
		cy: -198
	},
	foreground_9: {
		u: "foreground_9.png",
		w: 744,
		h: 97,
		f: [0],
		fps: 30,
		cx: 370,
		cy: 249
	},
	foreground_8: {
		u: "foreground_8.png",
		w: 752,
		h: 140,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 269
	},
	foreground_7: {
		u: "foreground_7.png",
		w: 752,
		h: 128,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 253
	},
	foreground_6: {
		u: "foreground_6.png",
		w: 752,
		h: 144,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 273
	},
	foreground_5: {
		u: "foreground_5.png",
		w: 752,
		h: 179,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 287
	},
	foreground_4: {
		u: "foreground_4.png",
		w: 752,
		h: 156,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 279
	},
	foreground_3: {
		u: "foreground_3.png",
		w: 752,
		h: 99,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 259
	},
	foreground_2: {
		u: "foreground_2.png",
		w: 752,
		h: 176,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 289
	},
	foreground_10: {
		u: "foreground_10.png",
		w: 752,
		h: 142,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 271
	},
	foreground_1: {
		u: "foreground_1.png",
		w: 752,
		h: 168,
		f: [0],
		fps: 30,
		cx: 376,
		cy: 285
	},
	mc_door4_opening: {
		u: "mc_door4_opening.png",
		w: 219,
		h: 49,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		fps: 30,
		cx: 109,
		cy: 425
	},
	mc_door4_open: {
		u: "mc_door4_open.png",
		w: 219,
		h: 49,
		f: [0],
		fps: 30,
		cx: 109,
		cy: 425
	},
	mc_door4_closing: {
		u: "mc_door4_closing.png",
		w: 219,
		h: 49,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		fps: 30,
		cx: 109,
		cy: 425
	},
	mc_door4_closed: {
		u: "mc_door4_closed.png",
		w: 219,
		h: 49,
		f: [0],
		fps: 30,
		cx: 109,
		cy: 425
	},
	mc_door3_opening: {
		u: "mc_door3_opening.png",
		w: 237,
		h: 140,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
		fps: 30,
		cx: 118,
		cy: 115
	},
	mc_door3_open: {
		u: "mc_door3_open.png",
		w: 237,
		h: 118,
		f: [0],
		fps: 30,
		cx: 118,
		cy: 115
	},
	mc_door3_closing: {
		u: "mc_door3_closing.png",
		w: 237,
		h: 141,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4],
		fps: 30,
		cx: 118,
		cy: 116
	},
	mc_door3_closed: {
		u: "mc_door3_closed.png",
		w: 237,
		h: 117,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 118,
		cy: 115
	},
	mc_door3_block: {
		u: "mc_door3_block.png",
		w: 237,
		h: 117,
		f: [0],
		fps: 30,
		cx: 118,
		cy: 116
	},
	mc_door2_opening: {
		u: "mc_door2_opening.png",
		w: 77,
		h: 250,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 37,
		cy: 426
	},
	mc_door2_openb: {
		u: "mc_door2_openb.png",
		w: 69,
		h: 116,
		f: [0],
		fps: 30,
		cx: 37,
		cy: 426
	},
	mc_door2_open: {
		u: "mc_door2_open.png",
		w: 77,
		h: 211,
		f: [0],
		fps: 30,
		cx: 37,
		cy: 387
	},
	mc_door2_closing: {
		u: "mc_door2_closing.png",
		w: 77,
		h: 250,
		f: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4],
		fps: 30,
		cx: 37,
		cy: 426
	},
	mc_door2_closed: {
		u: "mc_door2_closed.png",
		w: 77,
		h: 250,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 37,
		cy: 426
	},
	mc_door2_block: {
		u: "mc_door2_block.png",
		w: 77,
		h: 250,
		f: [0],
		fps: 30,
		cx: 37,
		cy: 426
	},
	mc_door1_opening: {
		u: "mc_door1_opening.png",
		w: 77,
		h: 250,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 38,
		cy: 426
	},
	mc_door1_openb: {
		u: "mc_door1_openb.png",
		w: 69,
		h: 116,
		f: [0],
		fps: 30,
		cx: 30,
		cy: 426
	},
	mc_door1_open: {
		u: "mc_door1_open.png",
		w: 77,
		h: 211,
		f: [0],
		fps: 30,
		cx: 38,
		cy: 387
	},
	mc_door1_closing: {
		u: "mc_door1_closing.png",
		w: 77,
		h: 250,
		f: [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4],
		fps: 30,
		cx: 38,
		cy: 426
	},
	mc_door1_closed: {
		u: "mc_door1_closed.png",
		w: 77,
		h: 250,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 38,
		cy: 426
	},
	mc_door1_block: {
		u: "mc_door1_block.png",
		w: 77,
		h: 250,
		f: [0],
		fps: 30,
		cx: 38,
		cy: 426
	},
	mcTarget: {
		u: "mcTarget.png",
		w: 86,
		h: 84,
		f: [0, 0],
		fps: 30,
		cx: 41,
		cy: 43
	},
	mcUIStickPointerMove: {
		u: "mcUIStickPointerMove.png",
		w: 72,
		h: 71,
		f: [0],
		fps: 30,
		cx: 36,
		cy: 36
	},
	mcUIStickPointerAttack: {
		u: "mcUIStickPointerAttack.png",
		w: 72,
		h: 71,
		f: [0],
		fps: 30,
		cx: 36,
		cy: 36
	},
	mcUIStickBase: {
		u: "mcUIStickBase.png",
		w: 149,
		h: 147,
		f: [0],
		fps: 30,
		cx: 73,
		cy: 75
	},
	mcPointer: {
		u: "mcPointer.png",
		w: 83,
		h: 80,
		f: [0, 0],
		fps: 30,
		cx: 41,
		cy: 41
	},
	mcMissile_stand: {
		u: "mcMissile_stand.png",
		w: 84,
		h: 24,
		f: [0, 0, 1, 1],
		fps: 30,
		cx: 37,
		cy: 12,
		collision: "x:-18;y:-6;w:24;h:12"
	},
	mcMissile_destroy: {
		u: "mcMissile_destroy.png",
		w: 77,
		h: 24,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		fps: 30,
		cx: 30,
		cy: 12,
		collision: "x:-13;y:-50;w:26;h:50"
	},
	mcLaser_stand: {
		u: "mcLaser_stand.png",
		w: 391,
		h: 36,
		f: [0, 0, 0],
		fps: 30,
		cx: 19,
		cy: 18,
		collision: "x:-4;y:-5;w:190;h:8"
	},
	mcLaser_destroy: {
		u: "mcLaser_destroy.png",
		w: 391,
		h: 36,
		f: [0, 0, 0, 1, 1],
		fps: 30,
		cx: 19,
		cy: 18,
		collision: "x:-4;y:-5;w:190;h:8"
	},
	mcLaserShort03_stand: {
		u: "mcLaserShort03_stand.png",
		w: 61,
		h: 28,
		f: [0, 1],
		fps: 30,
		cx: 7,
		cy: 14,
		collision: "x:-13;y:-50;w:26;h:50"
	},
	mcLaserShort03_destroy: {
		u: "mcLaserShort03_destroy.png",
		w: 61,
		h: 28,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 7,
		cy: 14,
		collision: "x:-13;y:-50;w:26;h:50"
	},
	mcLaserShort02_stand: {
		u: "mcLaserShort02_stand.png",
		w: 62,
		h: 24,
		f: [0, 1],
		fps: 30,
		cx: 2,
		cy: 12
	},
	mcLaserShort02_destroy: {
		u: "mcLaserShort02_destroy.png",
		w: 62,
		h: 24,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 2,
		cy: 12
	},
	mcLaserShort01_stand: {
		u: "mcLaserShort01_stand.png",
		w: 62,
		h: 30,
		f: [0, 1],
		fps: 30,
		cx: 5,
		cy: 15
	},
	mcLaserShort01_destroy: {
		u: "mcLaserShort01_destroy.png",
		w: 62,
		h: 30,
		f: [0, 0, 1, 1],
		fps: 30,
		cx: 5,
		cy: 15
	},
	waste_pool: {
		u: "waste_pool.png",
		w: 83,
		h: 63,
		f: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
		fps: 30,
		cx: 41,
		cy: 47,
		collision: "x:-30;y:-10;w:60;h:20"
	},
	spike_stand: {
		u: "spike_stand.png",
		w: 81,
		h: 34,
		f: [0],
		fps: 30,
		cx: 40,
		cy: 26,
		collision: "x:-40;y:-8;w:80;h:8"
	},
	spike_hide_up: {
		u: "spike_hide_up.png",
		w: 81,
		h: 38,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: 40,
		cy: 30,
		collision: "x:-40;y:-8;w:80;h:8"
	},
	spike_hide_stand: {
		u: "spike_hide_stand.png",
		w: 81,
		h: 16,
		f: [0],
		fps: 30,
		cx: 40,
		cy: 8,
		collision: "x:-40;y:-8;w:80;h:8"
	},
	spike_hide_down: {
		u: "spike_hide_down.png",
		w: 81,
		h: 38,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
		fps: 30,
		cx: 40,
		cy: 30,
		collision: "x:-40;y:-8;w:80;h:8"
	},
	mcFade_out: {
		u: "mcFade_out.png",
		w: 22,
		h: 20,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
		fps: 30,
		cx: 5,
		cy: 5
	},
	mcFade_in: {
		u: "mcFade_in.png",
		w: 22,
		h: 20,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		fps: 30,
		cx: 5,
		cy: 5
	},
	mcEnemyHpBase: {
		u: "mcEnemyHpBase.png",
		w: 47,
		h: 12,
		f: [0, 0],
		fps: 30,
		cx: 2,
		cy: 3
	},
	mcEnemyHpBar: {
		u: "mcEnemyHpBar.png",
		w: 41,
		h: 6,
		f: [0, 0],
		fps: 30,
		cx: 0,
		cy: 0
	},
	mcItemShot_multi_stand: {
		u: "mcItemShot_multi_stand.png",
		w: 72,
		h: 65,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 35,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_multi_defeat: {
		u: "mcItemShot_multi_defeat.png",
		w: 72,
		h: 65,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 35,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_multi_appear: {
		u: "mcItemShot_multi_appear.png",
		w: 72,
		h: 65,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 35,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_bouncing_stand: {
		u: "mcItemShot_bouncing_stand.png",
		w: 71,
		h: 66,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 34,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_bouncing_defeat: {
		u: "mcItemShot_bouncing_defeat.png",
		w: 71,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 34,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_bouncing_appear: {
		u: "mcItemShot_bouncing_appear.png",
		w: 71,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 34,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_bomb_stand: {
		u: "mcItemShot_bomb_stand.png",
		w: 71,
		h: 66,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 34,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_bomb_defeat: {
		u: "mcItemShot_bomb_defeat.png",
		w: 71,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 34,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShot_bomb_appear: {
		u: "mcItemShot_bomb_appear.png",
		w: 71,
		h: 66,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 34,
		cy: 52,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShield_stand: {
		u: "mcItemShield_stand.png",
		w: 65,
		h: 63,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShield_defeat: {
		u: "mcItemShield_defeat.png",
		w: 65,
		h: 63,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemShield_appear: {
		u: "mcItemShield_appear.png",
		w: 65,
		h: 63,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemReargun_stand: {
		u: "mcItemReargun_stand.png",
		w: 65,
		h: 64,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemReargun_defeat: {
		u: "mcItemReargun_defeat.png",
		w: 65,
		h: 64,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemReargun_appear: {
		u: "mcItemReargun_appear.png",
		w: 65,
		h: 64,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemDamage_stand: {
		u: "mcItemDamage_stand.png",
		w: 65,
		h: 63,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemDamage_defeat: {
		u: "mcItemDamage_defeat.png",
		w: 65,
		h: 63,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemDamage_appear: {
		u: "mcItemDamage_appear.png",
		w: 65,
		h: 63,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		fps: 30,
		cx: 31,
		cy: 51,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemHp_stand: {
		u: "mcItemHp_stand.png",
		w: 59,
		h: 51,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 28,
		cy: 45,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemHp_defeat: {
		u: "mcItemHp_defeat.png",
		w: 59,
		h: 51,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 28,
		cy: 45,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemHp_appear: {
		u: "mcItemHp_appear.png",
		w: 59,
		h: 51,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 28,
		cy: 45,
		collision: "x:-16;y:-22;w:33;h:19"
	},
	mcItemCoin_stand: {
		u: "mcItemCoin_stand.png",
		w: 61,
		h: 61,
		f: [0, 0, 0, 0, 0],
		fps: 30,
		cx: 29,
		cy: 49,
		collision: "x:-13;y:-22;w:27;h:19"
	},
	mcItemCoin_defeat: {
		u: "mcItemCoin_defeat.png",
		w: 61,
		h: 61,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 29,
		cy: 49,
		collision: "x:-13;y:-22;w:27;h:19"
	},
	mcItemCoin_appear: {
		u: "mcItemCoin_appear.png",
		w: 61,
		h: 61,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 29,
		cy: 49,
		collision: "x:-13;y:-22;w:27;h:19"
	},
	breakable_wy_stand: {
		u: "breakable_wy_stand.png",
		w: 64,
		h: 77,
		f: [0],
		fps: 30,
		cx: 32,
		cy: 60,
		collision: "x:-23;y:-45;w:45;h:56"
	},
	breakable_wy_hit: {
		u: "breakable_wy_hit.png",
		w: 78,
		h: 85,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 39,
		cy: 64,
		collision: "x:-23;y:-45;w:45;h:56"
	},
	breakable_wy_break: {
		u: "breakable_wy_break.png",
		w: 73,
		h: 81,
		f: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 36,
		cy: 62,
		collision: "x:-23;y:-45;w:45;h:56"
	},
	breakable_rc_stand: {
		u: "breakable_rc_stand.png",
		w: 61,
		h: 78,
		f: [0],
		fps: 30,
		cx: 30,
		cy: 61,
		collision: "x:-23;y:-45;w:45;h:56"
	},
	breakable_rc_hit: {
		u: "breakable_rc_hit.png",
		w: 76,
		h: 86,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 38,
		cy: 64,
		collision: "x:-23;y:-45;w:45;h:56"
	},
	breakable_rc_break: {
		u: "breakable_rc_break.png",
		w: 77,
		h: 88,
		f: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 38,
		cy: 66,
		collision: "x:-23;y:-45;w:45;h:56"
	},
	breakable_pf_stand: {
		u: "breakable_pf_stand.png",
		w: 62,
		h: 74,
		f: [0],
		fps: 30,
		cx: 31,
		cy: 59,
		collision: "x:-22;y:-44;w:42;h:50"
	},
	breakable_pf_hit: {
		u: "breakable_pf_hit.png",
		w: 76,
		h: 82,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 38,
		cy: 63,
		collision: "x:-22;y:-44;w:42;h:50"
	},
	breakable_pf_break: {
		u: "breakable_pf_break.png",
		w: 76,
		h: 86,
		f: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 38,
		cy: 65,
		collision: "x:-22;y:-44;w:42;h:50"
	},
	breakable_gf_stand: {
		u: "breakable_gf_stand.png",
		w: 67,
		h: 78,
		f: [0],
		fps: 30,
		cx: 33,
		cy: 61,
		collision: "x:-25;y:-40;w:50;h:45"
	},
	breakable_gf_hit: {
		u: "breakable_gf_hit.png",
		w: 81,
		h: 86,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 40,
		cy: 65,
		collision: "x:-25;y:-40;w:50;h:45"
	},
	breakable_gf_break: {
		u: "breakable_gf_break.png",
		w: 78,
		h: 81,
		f: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 39,
		cy: 62,
		collision: "x:-25;y:-40;w:50;h:45"
	},
	mcBullet_enemy_regular_stand: {
		u: "mcBullet_enemy_regular_stand.png",
		w: 26,
		h: 23,
		f: [0],
		fps: 30,
		cx: 12,
		cy: 12,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_enemy_regular_destroy: {
		u: "mcBullet_enemy_regular_destroy.png",
		w: 33,
		h: 30,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13],
		fps: 30,
		cx: 16,
		cy: 16
	},
	mcBullet_enemy_multi_stand: {
		u: "mcBullet_enemy_multi_stand.png",
		w: 50,
		h: 48,
		f: [0],
		fps: 30,
		cx: 24,
		cy: 24,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_enemy_multi_destroy: {
		u: "mcBullet_enemy_multi_destroy.png",
		w: 120,
		h: 118,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13],
		fps: 30,
		cx: 59,
		cy: 59
	},
	mcBullet_enemy_bouncing_stand: {
		u: "mcBullet_enemy_bouncing_stand.png",
		w: 43,
		h: 41,
		f: [0],
		fps: 30,
		cx: 20,
		cy: 21,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_enemy_bouncing_destroy: {
		u: "mcBullet_enemy_bouncing_destroy.png",
		w: 108,
		h: 106,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13],
		fps: 30,
		cx: 52,
		cy: 54
	},
	mcBullet_enemy_bomb_stand: {
		u: "mcBullet_enemy_bomb_stand.png",
		w: 44,
		h: 43,
		f: [0],
		fps: 30,
		cx: 22,
		cy: 22,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_enemy_bomb_destroy: {
		u: "mcBullet_enemy_bomb_destroy.png",
		w: 56,
		h: 55,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13],
		fps: 30,
		cx: 28,
		cy: 28
	},
	mcBullet_enemy_bomb_alert: {
		u: "mcBullet_enemy_bomb_alert.png",
		w: 46,
		h: 45,
		f: [0, 0, 1, 1],
		fps: 30,
		cx: 22,
		cy: 24,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcEnemy8_walk: {
		u: "mcEnemy8_walk.png",
		w: 156,
		h: 122,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1],
		fps: 30,
		cx: 99,
		cy: 108
	},
	mcEnemy8_stand: {
		u: "mcEnemy8_stand.png",
		w: 147,
		h: 120,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 86,
		cy: 106
	},
	mcEnemy8_sqeeze: {
		u: "mcEnemy8_sqeeze.png",
		w: 153,
		h: 144,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 67,
		cy: 116
	},
	mcEnemy8_hit: {
		u: "mcEnemy8_hit.png",
		w: 156,
		h: 119,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 50,
		cy: 105
	},
	mcEnemy8_freeze: {
		u: "mcEnemy8_freeze.png",
		w: 202,
		h: 183,
		f: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 73,
		cy: 132
	},
	mcEnemy8_defeat: {
		u: "mcEnemy8_defeat.png",
		w: 168,
		h: 117,
		f: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 101,
		cy: 103
	},
	mcEnemy8_bubble: {
		u: "mcEnemy8_bubble.png",
		w: 147,
		h: 151,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 69,
		cy: 127
	},
	mcEnemy8_bomb: {
		u: "mcEnemy8_bomb.png",
		w: 209,
		h: 221,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 104,
		cy: 165
	},
	mcEnemy7_walk: {
		u: "mcEnemy7_walk.png",
		w: 44,
		h: 56,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 4, 5, 5, 3, 3],
		fps: 30,
		cx: 25,
		cy: 51,
		collision: "x:-10;y:-15;w:20;h:30"
	},
	mcEnemy7_stand: {
		u: "mcEnemy7_stand.png",
		w: 45,
		h: 50,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 26,
		cy: 45,
		collision: "x:-10;y:-15;w:20;h:30"
	},
	mcEnemy7_sqeeze: {
		u: "mcEnemy7_sqeeze.png",
		w: 46,
		h: 57,
		f: [0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 32,
		cy: 51
	},
	mcEnemy7_hit: {
		u: "mcEnemy7_hit.png",
		w: 71,
		h: 71,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 32,
		cy: 54
	},
	mcEnemy7_freeze: {
		u: "mcEnemy7_freeze.png",
		w: 66,
		h: 65,
		f: [0, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 8, 9],
		fps: 30,
		cx: 21,
		cy: 47
	},
	mcEnemy7_defeat: {
		u: "mcEnemy7_defeat.png",
		w: 56,
		h: 71,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 5, 5, 7, 8, 9],
		fps: 30,
		cx: 26,
		cy: 52
	},
	mcEnemy7_bubble: {
		u: "mcEnemy7_bubble.png",
		w: 61,
		h: 63,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 27,
		cy: 62
	},
	mcEnemy7_bomb: {
		u: "mcEnemy7_bomb.png",
		w: 75,
		h: 74,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		fps: 30,
		cx: 35,
		cy: 40
	},
	mcEnemy6_walk: {
		u: "mcEnemy6_walk.png",
		w: 94,
		h: 109,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 44,
		cy: 91,
		collision: "x:-15;y:-40;w:30;h:40"
	},
	mcEnemy6_stand: {
		u: "mcEnemy6_stand.png",
		w: 94,
		h: 109,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
		fps: 30,
		cx: 43,
		cy: 89,
		collision: "x:-15;y:-40;w:30;h:40"
	},
	mcEnemy6_sqeeze: {
		u: "mcEnemy6_sqeeze.png",
		w: 69,
		h: 123,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 33,
		cy: 110,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy6_hit: {
		u: "mcEnemy6_hit.png",
		w: 94,
		h: 126,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 39,
		cy: 93,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy6_freeze: {
		u: "mcEnemy6_freeze.png",
		w: 134,
		h: 142,
		f: [0, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 8, 9],
		fps: 30,
		cx: 60,
		cy: 95,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy6_defeat: {
		u: "mcEnemy6_defeat.png",
		w: 112,
		h: 98,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 11],
		fps: 30,
		cx: 56,
		cy: 76,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy6_bubble: {
		u: "mcEnemy6_bubble.png",
		w: 106,
		h: 110,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1],
		fps: 30,
		cx: 51,
		cy: 114,
		collision: "x:-20;y:-50;w:40;h:40"
	},
	mcEnemy6_bomb: {
		u: "mcEnemy6_bomb.png",
		w: 142,
		h: 139,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		fps: 30,
		cx: 70,
		cy: 70,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy5_walk: {
		u: "mcEnemy5_walk.png",
		w: 46,
		h: 52,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 23,
		cy: 45,
		collision: "x:-10;y:-30;w:20;h:20"
	},
	mcEnemy5_stand: {
		u: "mcEnemy5_stand.png",
		w: 46,
		h: 46,
		f: [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3],
		fps: 30,
		cx: 23,
		cy: 39,
		collision: "x:-13;y:-50;w:26;h:50"
	},
	mcEnemy5_sqeeze: {
		u: "mcEnemy5_sqeeze.png",
		w: 51,
		h: 68,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 30,
		cy: 53,
		collision: "x:-10;y:-30;w:5;h:5"
	},
	mcEnemy5_hit: {
		u: "mcEnemy5_hit.png",
		w: 53,
		h: 54,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 24,
		cy: 47,
		collision: "x:-10;y:-30;w:5;h:5"
	},
	mcEnemy5_freeze: {
		u: "mcEnemy5_freeze.png",
		w: 72,
		h: 63,
		f: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 23,
		cy: 51,
		collision: "x:-10;y:-30;w:5;h:5"
	},
	mcEnemy5_defeat: {
		u: "mcEnemy5_defeat.png",
		w: 59,
		h: 53,
		f: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 20,
		cy: 46,
		collision: "x:-10;y:-30;w:3;h:3"
	},
	mcEnemy5_bubble: {
		u: "mcEnemy5_bubble.png",
		w: 74,
		h: 76,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 38,
		cy: 66,
		collision: "x:-10;y:-30;w:20;h:20"
	},
	mcEnemy5_bomb: {
		u: "mcEnemy5_bomb.png",
		w: 77,
		h: 69,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 37,
		cy: 60,
		collision: "x:-10;y:-30;w:3;h:3"
	},
	mcEnemy4_walk: {
		u: "mcEnemy4_walk.png",
		w: 156,
		h: 122,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1],
		fps: 30,
		cx: 99,
		cy: 108,
		collision: "x:-13;y:-50;w:26;h:50"
	},
	mcEnemy4_stand: {
		u: "mcEnemy4_stand.png",
		w: 147,
		h: 120,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 86,
		cy: 106,
		collision: "x:-13;y:-50;w:26;h:50"
	},
	mcEnemy4_sqeeze: {
		u: "mcEnemy4_sqeeze.png",
		w: 153,
		h: 144,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 67,
		cy: 116
	},
	mcEnemy4_hit: {
		u: "mcEnemy4_hit.png",
		w: 156,
		h: 119,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 50,
		cy: 105
	},
	mcEnemy4_freeze: {
		u: "mcEnemy4_freeze.png",
		w: 202,
		h: 183,
		f: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 73,
		cy: 132
	},
	mcEnemy4_defeat: {
		u: "mcEnemy4_defeat.png",
		w: 168,
		h: 117,
		f: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 101,
		cy: 103
	},
	mcEnemy4_bubble: {
		u: "mcEnemy4_bubble.png",
		w: 147,
		h: 151,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 69,
		cy: 127
	},
	mcEnemy4_bomb: {
		u: "mcEnemy4_bomb.png",
		w: 209,
		h: 221,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 104,
		cy: 165
	},
	mcEnemy3_walk: {
		u: "mcEnemy3_walk.png",
		w: 44,
		h: 56,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 4, 5, 5, 3, 3],
		fps: 30,
		cx: 25,
		cy: 51,
		collision: "x:-13;y:-40;w:26;h:40"
	},
	mcEnemy3_stand: {
		u: "mcEnemy3_stand.png",
		w: 45,
		h: 50,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 26,
		cy: 45,
		collision: "x:-13;y:-50;w:26;h:50"
	},
	mcEnemy3_sqeeze: {
		u: "mcEnemy3_sqeeze.png",
		w: 46,
		h: 57,
		f: [0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 32,
		cy: 51
	},
	mcEnemy3_hit: {
		u: "mcEnemy3_hit.png",
		w: 71,
		h: 71,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 32,
		cy: 54
	},
	mcEnemy3_freeze: {
		u: "mcEnemy3_freeze.png",
		w: 66,
		h: 65,
		f: [0, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 8, 9],
		fps: 30,
		cx: 21,
		cy: 47
	},
	mcEnemy3_defeat: {
		u: "mcEnemy3_defeat.png",
		w: 56,
		h: 71,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 5, 5, 7, 8, 9],
		fps: 30,
		cx: 26,
		cy: 52
	},
	mcEnemy3_bubble: {
		u: "mcEnemy3_bubble.png",
		w: 61,
		h: 63,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 27,
		cy: 62
	},
	mcEnemy3_bomb: {
		u: "mcEnemy3_bomb.png",
		w: 75,
		h: 74,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		fps: 30,
		cx: 35,
		cy: 40
	},
	mcEnemy2_walk: {
		u: "mcEnemy2_walk.png",
		w: 94,
		h: 109,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 44,
		cy: 91,
		collision: "x:-20;y:-50;w:40;h:40"
	},
	mcEnemy2_stand: {
		u: "mcEnemy2_stand.png",
		w: 94,
		h: 109,
		f: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
		fps: 30,
		cx: 43,
		cy: 89,
		collision: "x:-20;y:-50;w:40;h:40"
	},
	mcEnemy2_sqeeze: {
		u: "mcEnemy2_sqeeze.png",
		w: 69,
		h: 123,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 33,
		cy: 110,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy2_hit: {
		u: "mcEnemy2_hit.png",
		w: 94,
		h: 126,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 39,
		cy: 93,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy2_freeze: {
		u: "mcEnemy2_freeze.png",
		w: 134,
		h: 142,
		f: [0, 1, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 8, 9],
		fps: 30,
		cx: 60,
		cy: 95,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy2_defeat: {
		u: "mcEnemy2_defeat.png",
		w: 112,
		h: 98,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 11],
		fps: 30,
		cx: 56,
		cy: 76,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy2_bubble: {
		u: "mcEnemy2_bubble.png",
		w: 106,
		h: 110,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1],
		fps: 30,
		cx: 51,
		cy: 114,
		collision: "x:-20;y:-50;w:40;h:40"
	},
	mcEnemy2_bomb: {
		u: "mcEnemy2_bomb.png",
		w: 142,
		h: 139,
		f: [0, 1, 2, 3, 4, 5, 6, 7, 8],
		fps: 30,
		cx: 70,
		cy: 70,
		collision: "x:-20;y:-50;w:5;h:5"
	},
	mcEnemy1_walk: {
		u: "mcEnemy1_walk.png",
		w: 46,
		h: 52,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 23,
		cy: 45,
		collision: "x:-10;y:-30;w:20;h:20"
	},
	mcEnemy1_stand: {
		u: "mcEnemy1_stand.png",
		w: 46,
		h: 46,
		f: [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3],
		fps: 30,
		cx: 23,
		cy: 39,
		collision: "x:-10;y:-30;w:20;h:20"
	},
	mcEnemy1_sqeeze: {
		u: "mcEnemy1_sqeeze.png",
		w: 51,
		h: 68,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 30,
		cy: 53,
		collision: "x:-10;y:-30;w:5;h:5"
	},
	mcEnemy1_hit: {
		u: "mcEnemy1_hit.png",
		w: 53,
		h: 54,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 24,
		cy: 47,
		collision: "x:-10;y:-30;w:5;h:5"
	},
	mcEnemy1_freeze: {
		u: "mcEnemy1_freeze.png",
		w: 72,
		h: 63,
		f: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 23,
		cy: 51,
		collision: "x:-10;y:-30;w:5;h:5"
	},
	mcEnemy1_defeat: {
		u: "mcEnemy1_defeat.png",
		w: 59,
		h: 53,
		f: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 20,
		cy: 46,
		collision: "x:-10;y:-30;w:3;h:3"
	},
	mcEnemy1_bubble: {
		u: "mcEnemy1_bubble.png",
		w: 74,
		h: 76,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 38,
		cy: 66,
		collision: "x:-10;y:-30;w:20;h:20"
	},
	mcEnemy1_bomb: {
		u: "mcEnemy1_bomb.png",
		w: 77,
		h: 69,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 37,
		cy: 60,
		collision: "x:-10;y:-30;w:3;h:3"
	},
	mcBullet_wander_regular_stand: {
		u: "mcBullet_wander_regular_stand.png",
		w: 36,
		h: 34,
		f: [0],
		fps: 30,
		cx: 17,
		cy: 17,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_wander_regular_destroy: {
		u: "mcBullet_wander_regular_destroy.png",
		w: 92,
		h: 90,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 45,
		cy: 45
	},
	mcBullet_wander_multi_stand: {
		u: "mcBullet_wander_multi_stand.png",
		w: 42,
		h: 40,
		f: [0],
		fps: 30,
		cx: 20,
		cy: 21,
		collision: "x:-40;y:-20;w:80;h:40"
	},
	mcBullet_wander_multi_destroy: {
		u: "mcBullet_wander_multi_destroy.png",
		w: 112,
		h: 80,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 56,
		cy: 40
	},
	mcBullet_wander_bouncing_stand: {
		u: "mcBullet_wander_bouncing_stand.png",
		w: 36,
		h: 34,
		f: [0],
		fps: 30,
		cx: 18,
		cy: 18,
		collision: "x:-15;y:-15;w:30;h:30"
	},
	mcBullet_wander_bouncing_destroy: {
		u: "mcBullet_wander_bouncing_destroy.png",
		w: 54,
		h: 52,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 26,
		cy: 28
	},
	mcBullet_wander_bomb_stand: {
		u: "mcBullet_wander_bomb_stand.png",
		w: 56,
		h: 54,
		f: [0],
		fps: 30,
		cx: 27,
		cy: 54,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcBullet_wander_bomb_destroy: {
		u: "mcBullet_wander_bomb_destroy.png",
		w: 116,
		h: 114,
		f: [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		fps: 30,
		cx: 56,
		cy: 84,
		collision: "x:-99;y:-125;w:200;h:200"
	},
	mcBullet_wander_bomb_alert: {
		u: "mcBullet_wander_bomb_alert.png",
		w: 64,
		h: 54,
		f: [0, 0, 1, 1, 0, 0, 2, 2, 0, 0, 3, 3, 0, 0],
		fps: 30,
		cx: 31,
		cy: 54,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcBullet_randy_regular_stand: {
		u: "mcBullet_randy_regular_stand.png",
		w: 48,
		h: 46,
		f: [0],
		fps: 30,
		cx: 23,
		cy: 23,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_randy_regular_destroy: {
		u: "mcBullet_randy_regular_destroy.png",
		w: 92,
		h: 90,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 45,
		cy: 45
	},
	mcBullet_randy_multi_stand: {
		u: "mcBullet_randy_multi_stand.png",
		w: 70,
		h: 49,
		f: [0],
		fps: 30,
		cx: 35,
		cy: 25,
		collision: "x:-40;y:-20;w:80;h:40"
	},
	mcBullet_randy_multi_destroy: {
		u: "mcBullet_randy_multi_destroy.png",
		w: 112,
		h: 80,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 56,
		cy: 40
	},
	mcBullet_randy_bouncing_stand: {
		u: "mcBullet_randy_bouncing_stand.png",
		w: 37,
		h: 35,
		f: [0],
		fps: 30,
		cx: 18,
		cy: 19,
		collision: "x:-15;y:-15;w:30;h:30"
	},
	mcBullet_randy_bouncing_destroy: {
		u: "mcBullet_randy_bouncing_destroy.png",
		w: 54,
		h: 52,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 26,
		cy: 28
	},
	mcBullet_randy_bomb_stand: {
		u: "mcBullet_randy_bomb_stand.png",
		w: 56,
		h: 54,
		f: [0],
		fps: 30,
		cx: 27,
		cy: 54,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcBullet_randy_bomb_destroy: {
		u: "mcBullet_randy_bomb_destroy.png",
		w: 116,
		h: 114,
		f: [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		fps: 30,
		cx: 56,
		cy: 87,
		collision: "x:-99;y:-125;w:200;h:200"
	},
	mcBullet_randy_bomb_alert: {
		u: "mcBullet_randy_bomb_alert.png",
		w: 64,
		h: 54,
		f: [0, 0, 1, 1, 0, 0, 2, 2, 0, 0, 3, 3, 0, 0],
		fps: 30,
		cx: 31,
		cy: 54,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcBullet_dipper_regular_stand: {
		u: "mcBullet_dipper_regular_stand.png",
		w: 42,
		h: 39,
		f: [0],
		fps: 30,
		cx: 18,
		cy: 17,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_dipper_regular_destroy: {
		u: "mcBullet_dipper_regular_destroy.png",
		w: 42,
		h: 39,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 18,
		cy: 17
	},
	mcBullet_dipper_multi_stand: {
		u: "mcBullet_dipper_multi_stand.png",
		w: 46,
		h: 42,
		f: [0],
		fps: 30,
		cx: 23,
		cy: 22,
		collision: "x:-40;y:-20;w:80;h:40"
	},
	mcBullet_dipper_multi_destroy: {
		u: "mcBullet_dipper_multi_destroy.png",
		w: 46,
		h: 42,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 23,
		cy: 22
	},
	mcBullet_dipper_bouncing_stand: {
		u: "mcBullet_dipper_bouncing_stand.png",
		w: 36,
		h: 34,
		f: [0],
		fps: 30,
		cx: 18,
		cy: 19,
		collision: "x:-15;y:-15;w:30;h:30"
	},
	mcBullet_dipper_bouncing_destroy: {
		u: "mcBullet_dipper_bouncing_destroy.png",
		w: 54,
		h: 52,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 26,
		cy: 28
	},
	mcBullet_dipper_bomb_stand: {
		u: "mcBullet_dipper_bomb_stand.png",
		w: 53,
		h: 52,
		f: [0],
		fps: 30,
		cx: 26,
		cy: 52,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcBullet_dipper_bomb_destroy: {
		u: "mcBullet_dipper_bomb_destroy.png",
		w: 116,
		h: 114,
		f: [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		fps: 30,
		cx: 56,
		cy: 86,
		collision: "x:-99;y:-125;w:200;h:200"
	},
	mcBullet_dipper_bomb_alert: {
		u: "mcBullet_dipper_bomb_alert.png",
		w: 61,
		h: 52,
		f: [0, 0, 1, 1, 0, 0, 2, 2, 0, 0, 3, 3, 0, 0],
		fps: 30,
		cx: 30,
		cy: 52,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcBullet_agentP_regular_stand: {
		u: "mcBullet_agentP_regular_stand.png",
		w: 32,
		h: 29,
		f: [0],
		fps: 30,
		cx: 15,
		cy: 15,
		collision: "x:-15;y:-20;w:30;h:40"
	},
	mcBullet_agentP_regular_destroy: {
		u: "mcBullet_agentP_regular_destroy.png",
		w: 60,
		h: 56,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 29,
		cy: 29
	},
	mcBullet_agentP_multi_stand: {
		u: "mcBullet_agentP_multi_stand.png",
		w: 51,
		h: 48,
		f: [0],
		fps: 30,
		cx: 25,
		cy: 23,
		collision: "x:-40;y:-20;w:80;h:40"
	},
	mcBullet_agentP_multi_destroy: {
		u: "mcBullet_agentP_multi_destroy.png",
		w: 82,
		h: 78,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 40,
		cy: 37
	},
	mcBullet_agentP_bouncing_stand: {
		u: "mcBullet_agentP_bouncing_stand.png",
		w: 34,
		h: 31,
		f: [0],
		fps: 30,
		cx: 17,
		cy: 16,
		collision: "x:-15;y:-15;w:30;h:30"
	},
	mcBullet_agentP_bouncing_destroy: {
		u: "mcBullet_agentP_bouncing_destroy.png",
		w: 50,
		h: 46,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 25,
		cy: 23
	},
	mcBullet_agentP_bomb_stand: {
		u: "mcBullet_agentP_bomb_stand.png",
		w: 44,
		h: 42,
		f: [0],
		fps: 30,
		cx: 21,
		cy: 42,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcBullet_agentP_bomb_destroy: {
		u: "mcBullet_agentP_bomb_destroy.png",
		w: 90,
		h: 88,
		f: [0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		fps: 30,
		cx: 43,
		cy: 67,
		collision: "x:-99;y:-125;w:200;h:200"
	},
	mcBullet_agentP_bomb_alert: {
		u: "mcBullet_agentP_bomb_alert.png",
		w: 52,
		h: 42,
		f: [0, 0, 1, 1, 0, 0, 2, 2, 0, 0, 3, 3, 0, 0],
		fps: 30,
		cx: 25,
		cy: 42,
		collision: "x:-25;y:-25;w:50;h:50"
	},
	mcWander_win: {
		u: "mcWander_win.png",
		w: 112,
		h: 106,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 2, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 67,
		cy: 97,
		collision: "x:-10;y:-70;w:30;h:70"
	},
	mcWander_walk_up: {
		u: "mcWander_walk_up.png",
		w: 80,
		h: 100,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 36,
		cy: 91,
		collision: "x:-10;y:-70;w:30;h:70"
	},
	mcWander_walk_right: {
		u: "mcWander_walk_right.png",
		w: 132,
		h: 89,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 70,
		cy: 80,
		collision: "x:-10;y:-70;w:30;h:70"
	},
	mcWander_walk_left: {
		u: "mcWander_walk_left.png",
		w: 132,
		h: 89,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 60,
		cy: 80,
		collision: "x:-10;y:-70;w:30;h:70"
	},
	mcWander_walk_down: {
		u: "mcWander_walk_down.png",
		w: 79,
		h: 91,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 42,
		cy: 82,
		collision: "x:-10;y:-70;w:30;h:70"
	},
	mcWander_stand_up: {
		u: "mcWander_stand_up.png",
		w: 78,
		h: 103,
		f: [0],
		fps: 30,
		cx: 36,
		cy: 94,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcWander_stand_right: {
		u: "mcWander_stand_right.png",
		w: 87,
		h: 91,
		f: [0],
		fps: 30,
		cx: 48,
		cy: 82,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcWander_stand_left: {
		u: "mcWander_stand_left.png",
		w: 87,
		h: 91,
		f: [0],
		fps: 30,
		cx: 37,
		cy: 82,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcWander_stand_down: {
		u: "mcWander_stand_down.png",
		w: 74,
		h: 90,
		f: [0],
		fps: 30,
		cx: 37,
		cy: 81,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcWander_hit: {
		u: "mcWander_hit.png",
		w: 96,
		h: 96,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 64,
		cy: 87,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcWander_disappear: {
		u: "mcWander_disappear.png",
		w: 88,
		h: 111,
		f: [0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6],
		fps: 30,
		cx: 49,
		cy: 106,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcWander_defeat: {
		u: "mcWander_defeat.png",
		w: 135,
		h: 97,
		f: [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		fps: 30,
		cx: 66,
		cy: 84,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcWander_attack_up_run: {
		u: "mcWander_attack_up_run.png",
		w: 80,
		h: 114,
		f: [0, 1, 1, 2, 3, 3, 4, 4, 5],
		fps: 30,
		cx: 36,
		cy: 105,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_attack_up: {
		u: "mcWander_attack_up.png",
		w: 94,
		h: 110,
		f: [0, 1, 1, 2, 3, 3, 3, 4],
		fps: 30,
		cx: 36,
		cy: 101,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_attack_right_run: {
		u: "mcWander_attack_right_run.png",
		w: 132,
		h: 89,
		f: [0, 1, 1, 2, 3, 3, 4, 4, 5],
		fps: 30,
		cx: 55,
		cy: 77,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_attack_right: {
		u: "mcWander_attack_right.png",
		w: 108,
		h: 87,
		f: [0, 1, 1, 2, 3, 3, 3, 4],
		fps: 30,
		cx: 68,
		cy: 76,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_attack_left_run: {
		u: "mcWander_attack_left_run.png",
		w: 132,
		h: 89,
		f: [0, 1, 1, 2, 3, 3, 4, 4, 5],
		fps: 30,
		cx: 75,
		cy: 77,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_attack_left: {
		u: "mcWander_attack_left.png",
		w: 108,
		h: 87,
		f: [0, 1, 1, 2, 3, 3, 3, 4],
		fps: 30,
		cx: 38,
		cy: 76,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_attack_down_run: {
		u: "mcWander_attack_down_run.png",
		w: 78,
		h: 95,
		f: [0, 1, 1, 2, 3, 3, 4, 4, 5],
		fps: 30,
		cx: 41,
		cy: 82,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_attack_down: {
		u: "mcWander_attack_down.png",
		w: 86,
		h: 88,
		f: [0, 1, 1, 2, 3, 3, 3, 4],
		fps: 30,
		cx: 35,
		cy: 79,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcWander_appear: {
		u: "mcWander_appear.png",
		w: 88,
		h: 115,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6],
		fps: 30,
		cx: 49,
		cy: 106,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcRandy_win: {
		u: "mcRandy_win.png",
		w: 100,
		h: 144,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14],
		fps: 30,
		cx: 52,
		cy: 131,
		collision: "x:0;y:0;w:2;h:2"
	},
	mcRandy_walk_up: {
		u: "mcRandy_walk_up.png",
		w: 75,
		h: 112,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 30,
		cy: 101,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_walk_right: {
		u: "mcRandy_walk_right.png",
		w: 99,
		h: 71,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 45,
		cy: 60,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_walk_left: {
		u: "mcRandy_walk_left.png",
		w: 99,
		h: 71,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 56,
		cy: 60,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_walk_down: {
		u: "mcRandy_walk_down.png",
		w: 76,
		h: 125,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 41,
		cy: 112,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_stand_up: {
		u: "mcRandy_stand_up.png",
		w: 92,
		h: 92,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
		fps: 30,
		cx: 45,
		cy: 81,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcRandy_stand_right: {
		u: "mcRandy_stand_right.png",
		w: 87,
		h: 85,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
		fps: 30,
		cx: 47,
		cy: 74,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcRandy_stand_left: {
		u: "mcRandy_stand_left.png",
		w: 87,
		h: 85,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
		fps: 30,
		cx: 42,
		cy: 74,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcRandy_stand_down: {
		u: "mcRandy_stand_down.png",
		w: 95,
		h: 95,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
		fps: 30,
		cx: 49,
		cy: 80,
		collision: "x:-15;y:-70;w:30;h:70"
	},
	mcRandy_hit: {
		u: "mcRandy_hit.png",
		w: 103,
		h: 91,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 63,
		cy: 80,
		collision: "x:0;y:0;w:2;h:2"
	},
	mcRandy_disappear: {
		u: "mcRandy_disappear.png",
		w: 257,
		h: 206,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7],
		fps: 30,
		cx: 113,
		cy: 146,
		collision: "x:0;y:0;w:2;h:2"
	},
	mcRandy_defeat: {
		u: "mcRandy_defeat.png",
		w: 91,
		h: 74,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7],
		fps: 30,
		cx: 54,
		cy: 56,
		collision: "x:0;y:0;w:2;h:2"
	},
	mcRandy_attack_up_run: {
		u: "mcRandy_attack_up_run.png",
		w: 88,
		h: 119,
		f: [0, 1, 1, 2, 3, 4, 4],
		fps: 30,
		cx: 33,
		cy: 108,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_attack_up: {
		u: "mcRandy_attack_up.png",
		w: 95,
		h: 112,
		f: [0, 1, 1, 1, 2, 3, 3],
		fps: 30,
		cx: 45,
		cy: 101,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_attack_right_run: {
		u: "mcRandy_attack_right_run.png",
		w: 125,
		h: 97,
		f: [0, 1, 1, 2, 3, 4, 4],
		fps: 30,
		cx: 76,
		cy: 86,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_attack_right: {
		u: "mcRandy_attack_right.png",
		w: 126,
		h: 97,
		f: [0, 1, 1, 2, 3, 4, 4],
		fps: 30,
		cx: 80,
		cy: 86,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_attack_left_run: {
		u: "mcRandy_attack_left_run.png",
		w: 125,
		h: 97,
		f: [0, 1, 1, 2, 3, 4, 4],
		fps: 30,
		cx: 51,
		cy: 86,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_attack_left: {
		u: "mcRandy_attack_left.png",
		w: 126,
		h: 97,
		f: [0, 1, 1, 2, 3, 4, 4],
		fps: 30,
		cx: 48,
		cy: 86,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_attack_down_run: {
		u: "mcRandy_attack_down_run.png",
		w: 85,
		h: 105,
		f: [0, 1, 1, 2, 3, 4, 4],
		fps: 30,
		cx: 54,
		cy: 94,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_attack_down: {
		u: "mcRandy_attack_down.png",
		w: 100,
		h: 89,
		f: [0, 1, 1, 2, 3, 4, 4],
		fps: 30,
		cx: 54,
		cy: 78,
		collision: "x:-10;y:-70;w:20;h:70"
	},
	mcRandy_appear: {
		u: "mcRandy_appear.png",
		w: 165,
		h: 143,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 69,
		cy: 115,
		collision: "x:0;y:0;w:2;h:2"
	},
	mcMabel_win: {
		u: "mcMabel_win.png",
		w: 45,
		h: 86,
		f: [0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		fps: 30,
		cx: 22,
		cy: 77,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcMabel_walk_up: {
		u: "mcMabel_walk_up.png",
		w: 50,
		h: 71,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 26,
		cy: 61,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_walk_right: {
		u: "mcMabel_walk_right.png",
		w: 44,
		h: 70,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 20,
		cy: 61,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_walk_left: {
		u: "mcMabel_walk_left.png",
		w: 44,
		h: 70,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 22,
		cy: 61,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_walk_down: {
		u: "mcMabel_walk_down.png",
		w: 51,
		h: 75,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 26,
		cy: 62,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_stand_up: {
		u: "mcMabel_stand_up.png",
		w: 41,
		h: 67,
		f: [0],
		fps: 30,
		cx: 20,
		cy: 59,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_stand_right: {
		u: "mcMabel_stand_right.png",
		w: 44,
		h: 68,
		f: [0],
		fps: 30,
		cx: 21,
		cy: 59,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_stand_left: {
		u: "mcMabel_stand_left.png",
		w: 44,
		h: 68,
		f: [0],
		fps: 30,
		cx: 21,
		cy: 59,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_stand_down: {
		u: "mcMabel_stand_down.png",
		w: 42,
		h: 69,
		f: [0],
		fps: 30,
		cx: 21,
		cy: 59,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_hit: {
		u: "mcMabel_hit.png",
		w: 53,
		h: 70,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 31,
		cy: 61,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcMabel_disappear: {
		u: "mcMabel_disappear.png",
		w: 46,
		h: 94,
		f: [0, 1, 2, 3, 4],
		fps: 30,
		cx: 24,
		cy: 85,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcMabel_defeat: {
		u: "mcMabel_defeat.png",
		w: 65,
		h: 78,
		f: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
		fps: 30,
		cx: 44,
		cy: 64,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcMabel_attack_up_run: {
		u: "mcMabel_attack_up_run.png",
		w: 53,
		h: 69,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 29,
		cy: 59,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_attack_up: {
		u: "mcMabel_attack_up.png",
		w: 48,
		h: 69,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 25,
		cy: 61,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_attack_right_run: {
		u: "mcMabel_attack_right_run.png",
		w: 55,
		h: 68,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 22,
		cy: 59,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_attack_right: {
		u: "mcMabel_attack_right.png",
		w: 63,
		h: 69,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 31,
		cy: 60,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_attack_left_run: {
		u: "mcMabel_attack_left_run.png",
		w: 55,
		h: 68,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 31,
		cy: 59,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_attack_left: {
		u: "mcMabel_attack_left.png",
		w: 63,
		h: 69,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 30,
		cy: 60,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_attack_down_run: {
		u: "mcMabel_attack_down_run.png",
		w: 55,
		h: 73,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 26,
		cy: 64,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_attack_down: {
		u: "mcMabel_attack_down.png",
		w: 51,
		h: 68,
		f: [0, 0, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 22,
		cy: 60,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcMabel_appear: {
		u: "mcMabel_appear.png",
		w: 46,
		h: 94,
		f: [0, 1, 2, 3, 4],
		fps: 30,
		cx: 24,
		cy: 85,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcDipper_win: {
		u: "mcDipper_win.png",
		w: 48,
		h: 98,
		f: [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		fps: 30,
		cx: 22,
		cy: 90,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcDipper_walk_up: {
		u: "mcDipper_walk_up.png",
		w: 46,
		h: 72,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 24,
		cy: 64,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_walk_right: {
		u: "mcDipper_walk_right.png",
		w: 43,
		h: 75,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 21,
		cy: 70,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_walk_left: {
		u: "mcDipper_walk_left.png",
		w: 43,
		h: 75,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 21,
		cy: 70,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_walk_down: {
		u: "mcDipper_walk_down.png",
		w: 54,
		h: 75,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 28,
		cy: 66,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_stand_up: {
		u: "mcDipper_stand_up.png",
		w: 42,
		h: 66,
		f: [0],
		fps: 30,
		cx: 20,
		cy: 58,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_stand_right: {
		u: "mcDipper_stand_right.png",
		w: 44,
		h: 72,
		f: [0],
		fps: 30,
		cx: 19,
		cy: 65,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_stand_left: {
		u: "mcDipper_stand_left.png",
		w: 44,
		h: 72,
		f: [0],
		fps: 30,
		cx: 23,
		cy: 65,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_stand_down: {
		u: "mcDipper_stand_down.png",
		w: 42,
		h: 71,
		f: [0],
		fps: 30,
		cx: 22,
		cy: 64,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_hit: {
		u: "mcDipper_hit.png",
		w: 45,
		h: 70,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 20,
		cy: 63,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcDipper_disappear: {
		u: "mcDipper_disappear.png",
		w: 53,
		h: 108,
		f: [0, 1, 2, 3, 4],
		fps: 30,
		cx: 24,
		cy: 100,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcDipper_defeat: {
		u: "mcDipper_defeat.png",
		w: 55,
		h: 78,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 28,
		cy: 72,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcDipper_attack_up_run: {
		u: "mcDipper_attack_up_run.png",
		w: 51,
		h: 72,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 26,
		cy: 63,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_attack_up: {
		u: "mcDipper_attack_up.png",
		w: 47,
		h: 67,
		f: [0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 24,
		cy: 57,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_attack_right_run: {
		u: "mcDipper_attack_right_run.png",
		w: 48,
		h: 75,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 22,
		cy: 70,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_attack_right: {
		u: "mcDipper_attack_right.png",
		w: 60,
		h: 74,
		f: [0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 25,
		cy: 69,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_attack_left_run: {
		u: "mcDipper_attack_left_run.png",
		w: 48,
		h: 75,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 25,
		cy: 70,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_attack_left: {
		u: "mcDipper_attack_left.png",
		w: 60,
		h: 74,
		f: [0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 34,
		cy: 69,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_attack_down_run: {
		u: "mcDipper_attack_down_run.png",
		w: 55,
		h: 75,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 28,
		cy: 68,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_attack_down: {
		u: "mcDipper_attack_down.png",
		w: 54,
		h: 79,
		f: [0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 27,
		cy: 73,
		collision: "x:-10;y:-55;w:20;h:55"
	},
	mcDipper_appear: {
		u: "mcDipper_appear.png",
		w: 53,
		h: 108,
		f: [0, 1, 2, 3, 4],
		fps: 30,
		cx: 24,
		cy: 100,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcAgentP_win: {
		u: "mcAgentP_win.png",
		w: 50,
		h: 81,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
		fps: 30,
		cx: 25,
		cy: 74,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcAgentP_walk_up: {
		u: "mcAgentP_walk_up.png",
		w: 35,
		h: 56,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 18,
		cy: 50,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_walk_right: {
		u: "mcAgentP_walk_right.png",
		w: 53,
		h: 54,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 26,
		cy: 48,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_walk_left: {
		u: "mcAgentP_walk_left.png",
		w: 53,
		h: 54,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 25,
		cy: 48,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_walk_down: {
		u: "mcAgentP_walk_down.png",
		w: 36,
		h: 57,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 19,
		cy: 51,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_stand_up: {
		u: "mcAgentP_stand_up.png",
		w: 39,
		h: 53,
		f: [0],
		fps: 30,
		cx: 19,
		cy: 48,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_stand_right: {
		u: "mcAgentP_stand_right.png",
		w: 43,
		h: 53,
		f: [0],
		fps: 30,
		cx: 23,
		cy: 47,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_stand_left: {
		u: "mcAgentP_stand_left.png",
		w: 43,
		h: 53,
		f: [0],
		fps: 30,
		cx: 17,
		cy: 47,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_stand_down: {
		u: "mcAgentP_stand_down.png",
		w: 38,
		h: 52,
		f: [0],
		fps: 30,
		cx: 18,
		cy: 47,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_hit: {
		u: "mcAgentP_hit.png",
		w: 43,
		h: 50,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 22,
		cy: 44,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcAgentP_disappear: {
		u: "mcAgentP_disappear.png",
		w: 43,
		h: 66,
		f: [0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6],
		fps: 30,
		cx: 25,
		cy: 63,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcAgentP_defeat: {
		u: "mcAgentP_defeat.png",
		w: 64,
		h: 58,
		f: [0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 30,
		cy: 52,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcAgentP_attack_up_run: {
		u: "mcAgentP_attack_up_run.png",
		w: 41,
		h: 60,
		f: [0, 0, 1, 2, 2, 3, 3, 4, 5],
		fps: 30,
		cx: 19,
		cy: 54,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_attack_up: {
		u: "mcAgentP_attack_up.png",
		w: 41,
		h: 60,
		f: [0, 0, 1, 2, 2, 3, 3, 4],
		fps: 30,
		cx: 20,
		cy: 55,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_attack_right_run: {
		u: "mcAgentP_attack_right_run.png",
		w: 86,
		h: 58,
		f: [0, 0, 1, 2, 2, 3, 3, 4, 5],
		fps: 30,
		cx: 24,
		cy: 52,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_attack_right: {
		u: "mcAgentP_attack_right.png",
		w: 89,
		h: 58,
		f: [0, 0, 1, 2, 2, 3, 3, 4],
		fps: 30,
		cx: 30,
		cy: 52,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_attack_left_run: {
		u: "mcAgentP_attack_left_run.png",
		w: 86,
		h: 58,
		f: [0, 0, 1, 2, 2, 3, 3, 4, 5],
		fps: 30,
		cx: 62,
		cy: 52,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_attack_left: {
		u: "mcAgentP_attack_left.png",
		w: 89,
		h: 58,
		f: [0, 0, 1, 2, 2, 3, 3, 4],
		fps: 30,
		cx: 61,
		cy: 52,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_attack_down_run: {
		u: "mcAgentP_attack_down_run.png",
		w: 39,
		h: 60,
		f: [0, 0, 1, 2, 2, 3, 3, 4, 5],
		fps: 30,
		cx: 20,
		cy: 54,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_attack_down: {
		u: "mcAgentP_attack_down.png",
		w: 41,
		h: 58,
		f: [0, 0, 1, 2, 2, 3, 3, 4],
		fps: 30,
		cx: 22,
		cy: 53,
		collision: "x:-10;y:-40;w:20;h:40"
	},
	mcAgentP_appear: {
		u: "mcAgentP_appear.png",
		w: 43,
		h: 69,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6],
		fps: 30,
		cx: 25,
		cy: 63,
		collision: "x:-1;y:-1;w:2;h:2"
	},
	mcSummon: {
		u: "mcSummon.png",
		w: 299,
		h: 300,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 150,
		cy: 203
	},
	mcSmokebomb: {
		u: "mcSmokebomb.png",
		w: 201,
		h: 197,
		f: [0, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 93,
		cy: 106
	},
	mcShield_effect: {
		u: "mcShield_effect.png",
		w: 162,
		h: 164,
		f: [0, 1, 2, 3, 4, 5, 6],
		fps: 30,
		cx: 80,
		cy: 128
	},
	mcShieldBoss: {
		u: "mcShieldBoss.png",
		w: 184,
		h: 136,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 92,
		cy: 109
	},
	mcRearGun_effect: {
		u: "mcRearGun_effect.png",
		w: 287,
		h: 285,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
		fps: 30,
		cx: 144,
		cy: 144
	},
	mcPickItemPowerupsWeapon: {
		u: "mcPickItemPowerupsWeapon.png",
		w: 165,
		h: 165,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 81,
		cy: 83
	},
	mcPickItemLife: {
		u: "mcPickItemLife.png",
		w: 165,
		h: 165,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 81,
		cy: 83
	},
	mcPickItemCoin: {
		u: "mcPickItemCoin.png",
		w: 165,
		h: 165,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 81,
		cy: 84
	},
	mcMissileExplode: {
		u: "mcMissileExplode.png",
		w: 114,
		h: 105,
		f: [0, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 56,
		cy: 52
	},
	mcIcebomb: {
		u: "mcIcebomb.png",
		w: 172,
		h: 154,
		f: [0, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 68,
		cy: 77
	},
	mcHitShieldBoss: {
		u: "mcHitShieldBoss.png",
		w: 115,
		h: 116,
		f: [0, 1, 2, 3, 4, 4, 5],
		fps: 30,
		cx: 57,
		cy: 58
	},
	mcHitPlayerSoft: {
		u: "mcHitPlayerSoft.png",
		w: 81,
		h: 83,
		f: [0, 1, 2, 3, 4, 5, 5],
		fps: 30,
		cx: 39,
		cy: 41
	},
	mcHitPlayerHard: {
		u: "mcHitPlayerHard.png",
		w: 117,
		h: 106,
		f: [0, 1, 2, 3, 4, 5, 5],
		fps: 30,
		cx: 53,
		cy: 49
	},
	mcHitEnemySoft: {
		u: "mcHitEnemySoft.png",
		w: 81,
		h: 83,
		f: [0, 1, 2, 3, 4, 5, 5],
		fps: 30,
		cx: 39,
		cy: 41
	},
	mcHitEnemyShoot: {
		u: "mcHitEnemyShoot.png",
		w: 102,
		h: 103,
		f: [0, 1, 2, 3, 4, 5, 5],
		fps: 30,
		cx: 49,
		cy: 54
	},
	mcHitEnemyHard: {
		u: "mcHitEnemyHard.png",
		w: 117,
		h: 108,
		f: [0, 1, 2, 3, 4, 5, 5],
		fps: 30,
		cx: 54,
		cy: 50
	},
	mcGroundLaser: {
		u: "mcGroundLaser.png",
		w: 92,
		h: 138,
		f: [0, 1, 2],
		fps: 30,
		cx: 46,
		cy: 122
	},
	mcExplosiveBomb: {
		u: "mcExplosiveBomb.png",
		w: 198,
		h: 175,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 107,
		cy: 104
	},
	mcBulletDamage_effect: {
		u: "mcBulletDamage_effect.png",
		w: 94,
		h: 93,
		f: [0, 1, 2, 3, 4, 5, 6, 7],
		fps: 30,
		cx: 46,
		cy: 46
	},
	mcBombEffect_stand: {
		u: "mcBombEffect_stand.png",
		w: 106,
		h: 63,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 74,
		cy: 32,
		collision: "x:-18;y:-15;w:40;h:33"
	},
	mcBombEffect_destroy: {
		u: "mcBombEffect_destroy.png",
		w: 106,
		h: 63,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 74,
		cy: 32
	},
	mcBombEffect_burn: {
		u: "mcBombEffect_burn.png",
		w: 65,
		h: 104,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 31,
		cy: 89
	},
	mcBombCenter: {
		u: "mcBombCenter.png",
		w: 192,
		h: 182,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
		fps: 30,
		cx: 99,
		cy: 85
	},
	mcBoss6_walk: {
		u: "mcBoss6_walk.png",
		w: 161,
		h: 235,
		f: [0, 0, 1, 1, 2, 2, 1, 1],
		fps: 30,
		cx: 82,
		cy: 223,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_stand: {
		u: "mcBoss6_stand.png",
		w: 184,
		h: 223,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 87,
		cy: 215,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_spawnstand: {
		u: "mcBoss6_spawnstand.png",
		w: 244,
		h: 237,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0, 0, 0, 3, 3, 3],
		fps: 30,
		cx: 118,
		cy: 226,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_spawnin: {
		u: "mcBoss6_spawnin.png",
		w: 264,
		h: 234,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5],
		fps: 30,
		cx: 138,
		cy: 226,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_spawnend: {
		u: "mcBoss6_spawnend.png",
		w: 244,
		h: 242,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2],
		fps: 30,
		cx: 118,
		cy: 234,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_hit: {
		u: "mcBoss6_hit.png",
		w: 190,
		h: 224,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 80,
		cy: 220,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_disappear: {
		u: "mcBoss6_disappear.png",
		w: 304,
		h: 309,
		f: [0, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7],
		fps: 30,
		cx: 159,
		cy: 246,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_defeat_end: {
		u: "mcBoss6_defeat_end.png",
		w: 298,
		h: 281,
		f: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10],
		fps: 30,
		cx: 152,
		cy: 245,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_defeat: {
		u: "mcBoss6_defeat.png",
		w: 224,
		h: 279,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 89,
		cy: 245,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_charge: {
		u: "mcBoss6_charge.png",
		w: 210,
		h: 246,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 105,
		cy: 234,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_attack: {
		u: "mcBoss6_attack.png",
		w: 161,
		h: 221,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 81,
		cy: 204,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss6_appear: {
		u: "mcBoss6_appear.png",
		w: 302,
		h: 292,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
		fps: 30,
		cx: 157,
		cy: 239,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_win_start: {
		u: "mcBoss5_win_start.png",
		w: 216,
		h: 266,
		f: [0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4, 4],
		fps: 30,
		cx: 109,
		cy: 248,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_walk: {
		u: "mcBoss5_walk.png",
		w: 161,
		h: 235,
		f: [0, 0, 1, 1, 2, 2, 1, 1],
		fps: 30,
		cx: 82,
		cy: 223,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_stand: {
		u: "mcBoss5_stand.png",
		w: 184,
		h: 223,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 87,
		cy: 215,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_set_trap: {
		u: "mcBoss5_set_trap.png",
		w: 239,
		h: 267,
		f: [0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4],
		fps: 30,
		cx: 142,
		cy: 232,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_mine_stand: {
		u: "mcBoss5_mine_stand.png",
		w: 89,
		h: 91,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 44,
		cy: 48,
		collision: "x:-20;y:-30;w:40;h:60"
	},
	mcBoss5_mine_alert: {
		u: "mcBoss5_mine_alert.png",
		w: 150,
		h: 157,
		f: [0, 1, 2, 3],
		fps: 30,
		cx: 75,
		cy: 81,
		collision: "x:-50;y:-150;w:100;h:110"
	},
	mcBoss5_hit: {
		u: "mcBoss5_hit.png",
		w: 190,
		h: 223,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 80,
		cy: 219,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_disappear: {
		u: "mcBoss5_disappear.png",
		w: 304,
		h: 309,
		f: [0, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7],
		fps: 30,
		cx: 159,
		cy: 246,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_charge: {
		u: "mcBoss5_charge.png",
		w: 210,
		h: 245,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 105,
		cy: 234,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_attack: {
		u: "mcBoss5_attack.png",
		w: 161,
		h: 218,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 82,
		cy: 203,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss5_appear: {
		u: "mcBoss5_appear.png",
		w: 302,
		h: 292,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
		fps: 30,
		cx: 157,
		cy: 239,
		collision: "x:-50;y:-140;w:105;h:110"
	},
	mcBoss4_win: {
		u: "mcBoss4_win.png",
		w: 113,
		h: 164,
		f: [0, 0, 0, 0, 1, 1, 1, 1],
		fps: 30,
		cx: 45,
		cy: 210,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_walk: {
		u: "mcBoss4_walk.png",
		w: 136,
		h: 158,
		f: [0, 0, 1, 1, 2, 2, 1, 1],
		fps: 30,
		cx: 43,
		cy: 209,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_stand: {
		u: "mcBoss4_stand.png",
		w: 112,
		h: 157,
		f: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
		fps: 30,
		cx: 44,
		cy: 208,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_spawnstand: {
		u: "mcBoss4_spawnstand.png",
		w: 163,
		h: 215,
		f: [0, 0, 1, 1],
		fps: 30,
		cx: 95,
		cy: 205,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_spawnin: {
		u: "mcBoss4_spawnin.png",
		w: 163,
		h: 215,
		f: [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 5, 5, 6, 6],
		fps: 30,
		cx: 95,
		cy: 205,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_spawnend: {
		u: "mcBoss4_spawnend.png",
		w: 160,
		h: 215,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 92,
		cy: 205,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_hit: {
		u: "mcBoss4_hit.png",
		w: 156,
		h: 188,
		f: [0, 1, 1, 2, 2, 2],
		fps: 30,
		cx: 41,
		cy: 215,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_disappear: {
		u: "mcBoss4_disappear.png",
		w: 129,
		h: 207,
		f: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 53,
		cy: 248,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_defeat: {
		u: "mcBoss4_defeat.png",
		w: 127,
		h: 176,
		f: [0, 0, 1, 1, 0, 0, 2, 2],
		fps: 30,
		cx: 53,
		cy: 205,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_charge02: {
		u: "mcBoss4_charge02.png",
		w: 117,
		h: 159,
		f: [0, 1, 2, 3],
		fps: 30,
		cx: 49,
		cy: 210,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_charge: {
		u: "mcBoss4_charge.png",
		w: 122,
		h: 154,
		f: [0, 1],
		fps: 30,
		cx: 54,
		cy: 205,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_attack02: {
		u: "mcBoss4_attack02.png",
		w: 114,
		h: 156,
		f: [0, 1, 2],
		fps: 30,
		cx: 46,
		cy: 207,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_attack: {
		u: "mcBoss4_attack.png",
		w: 127,
		h: 154,
		f: [0, 1, 2, 3],
		fps: 30,
		cx: 59,
		cy: 205,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss4_appear: {
		u: "mcBoss4_appear.png",
		w: 129,
		h: 397,
		f: [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8],
		fps: 30,
		cx: 53,
		cy: 438,
		collision: "x:-33;y:-165;w:75;h:91"
	},
	mcBoss3_win: {
		u: "mcBoss3_win.png",
		w: 147,
		h: 125,
		f: [0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 4, 4, 5, 5],
		fps: 30,
		cx: 77,
		cy: 111,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_walk: {
		u: "mcBoss3_walk.png",
		w: 149,
		h: 130,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5],
		fps: 30,
		cx: 85,
		cy: 118,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_stand: {
		u: "mcBoss3_stand.png",
		w: 136,
		h: 126,
		f: [0],
		fps: 30,
		cx: 72,
		cy: 112,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_hit: {
		u: "mcBoss3_hit.png",
		w: 151,
		h: 178,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 69,
		cy: 163,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_disappear: {
		u: "mcBoss3_disappear.png",
		w: 174,
		h: 151,
		f: [0, 0, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
		fps: 30,
		cx: 149,
		cy: 103,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_defeat_end: {
		u: "mcBoss3_defeat_end.png",
		w: 230,
		h: 158,
		f: [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 165,
		cy: 113,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_defeat: {
		u: "mcBoss3_defeat.png",
		w: 178,
		h: 160,
		f: [0, 0, 1, 1, 2, 2, 1, 1],
		fps: 30,
		cx: 84,
		cy: 145,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_dash: {
		u: "mcBoss3_dash.png",
		w: 198,
		h: 161,
		f: [0, 0, 1, 1, 1, 2, 2, 3, 3, 3],
		fps: 30,
		cx: 107,
		cy: 140,
		collision: "x:-60;y:-100;w:120;h:100"
	},
	mcBoss3_charge: {
		u: "mcBoss3_charge.png",
		w: 145,
		h: 125,
		f: [0, 0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 76,
		cy: 111,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_callminions_stand: {
		u: "mcBoss3_callminions_stand.png",
		w: 149,
		h: 166,
		f: [0, 0, 1, 1],
		fps: 30,
		cx: 79,
		cy: 152,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_callminions_intro: {
		u: "mcBoss3_callminions_intro.png",
		w: 155,
		h: 166,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 82,
		cy: 152,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_callminions_end: {
		u: "mcBoss3_callminions_end.png",
		w: 155,
		h: 166,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 82,
		cy: 152,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_attack: {
		u: "mcBoss3_attack.png",
		w: 131,
		h: 195,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4],
		fps: 30,
		cx: 78,
		cy: 171,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss3_appear: {
		u: "mcBoss3_appear.png",
		w: 143,
		h: 186,
		f: [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8],
		fps: 30,
		cx: 76,
		cy: 172,
		collision: "x:-40;y:-100;w:65;h:100"
	},
	mcBoss2_walk02: {
		u: "mcBoss2_walk02.png",
		w: 115,
		h: 193,
		f: [0, 1, 2, 1],
		fps: 30,
		cx: 56,
		cy: 172,
		collision: "x:-40;y:-130;w:80;h:120"
	},
	mcBoss2_walk: {
		u: "mcBoss2_walk.png",
		w: 183,
		h: 181,
		f: [0, 1, 2, 1],
		fps: 30,
		cx: 90,
		cy: 172,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss2_stand02: {
		u: "mcBoss2_stand02.png",
		w: 115,
		h: 193,
		f: [0, 0, 1, 1, 2, 2, 1, 1],
		fps: 30,
		cx: 56,
		cy: 172,
		collision: "x:-40;y:-130;w:80;h:120"
	},
	mcBoss2_stand: {
		u: "mcBoss2_stand.png",
		w: 183,
		h: 181,
		f: [0, 0, 1, 1, 2, 2, 1, 1],
		fps: 30,
		cx: 90,
		cy: 172,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss2_hit02: {
		u: "mcBoss2_hit02.png",
		w: 124,
		h: 199,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 61,
		cy: 173,
		collision: "x:-40;y:-130;w:80;h:120"
	},
	mcBoss2_hit: {
		u: "mcBoss2_hit.png",
		w: 191,
		h: 184,
		f: [0, 0, 1, 1, 2, 2],
		fps: 30,
		cx: 94,
		cy: 174,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss2_disappear: {
		u: "mcBoss2_disappear.png",
		w: 201,
		h: 247,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 99,
		cy: 242,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss2_defeat02: {
		u: "mcBoss2_defeat02.png",
		w: 131,
		h: 186,
		f: [0, 0, 1, 1, 0, 0, 2, 2],
		fps: 30,
		cx: 64,
		cy: 171,
		collision: "x:-40;y:-130;w:80;h:120"
	},
	mcBoss2_defeat: {
		u: "mcBoss2_defeat.png",
		w: 206,
		h: 178,
		f: [0, 0, 1, 1, 0, 0, 2, 2],
		fps: 30,
		cx: 103,
		cy: 171,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss2_charge02: {
		u: "mcBoss2_charge02.png",
		w: 115,
		h: 193,
		f: [0, 1, 2, 1],
		fps: 30,
		cx: 52,
		cy: 171,
		collision: "x:-40;y:-130;w:80;h:120"
	},
	mcBoss2_charge: {
		u: "mcBoss2_charge.png",
		w: 195,
		h: 181,
		f: [0, 1, 2, 1],
		fps: 30,
		cx: 96,
		cy: 172,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss2_attack02: {
		u: "mcBoss2_attack02.png",
		w: 134,
		h: 194,
		f: [0, 1, 2, 2, 3, 3, 4],
		fps: 30,
		cx: 65,
		cy: 174,
		collision: "x:-40;y:-130;w:80;h:120"
	},
	mcBoss2_attack: {
		u: "mcBoss2_attack.png",
		w: 211,
		h: 181,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
		fps: 30,
		cx: 104,
		cy: 170,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss2_appear: {
		u: "mcBoss2_appear.png",
		w: 201,
		h: 267,
		f: [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8],
		fps: 30,
		cx: 99,
		cy: 262,
		collision: "x:-80;y:-50;w:160;h:40"
	},
	mcBoss1_win: {
		u: "mcBoss1_win.png",
		w: 180,
		h: 206,
		f: [0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 2, 2, 2, 2],
		fps: 30,
		cx: 88,
		cy: 189,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_stand: {
		u: "mcBoss1_stand.png",
		w: 182,
		h: 164,
		f: [0, 0],
		fps: 30,
		cx: 90,
		cy: 147,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_spawn_minions_stand: {
		u: "mcBoss1_spawn_minions_stand.png",
		w: 186,
		h: 178,
		f: [0, 0, 0, 1, 1, 1],
		fps: 30,
		cx: 82,
		cy: 161,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_spawn_minions_end: {
		u: "mcBoss1_spawn_minions_end.png",
		w: 194,
		h: 178,
		f: [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0, 0, 3, 3],
		fps: 30,
		cx: 90,
		cy: 161,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_spawn_minions: {
		u: "mcBoss1_spawn_minions.png",
		w: 194,
		h: 178,
		f: [0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1],
		fps: 30,
		cx: 90,
		cy: 161,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_hit: {
		u: "mcBoss1_hit.png",
		w: 199,
		h: 224,
		f: [0, 0, 1, 1, 1],
		fps: 30,
		cx: 89,
		cy: 188,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_disappear: {
		u: "mcBoss1_disappear.png",
		w: 192,
		h: 216,
		f: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
		fps: 30,
		cx: 97,
		cy: 196,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_defeat: {
		u: "mcBoss1_defeat.png",
		w: 195,
		h: 134,
		f: [0, 0, 1, 1, 0, 0, 2, 2],
		fps: 30,
		cx: 76,
		cy: 90,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_charge: {
		u: "mcBoss1_charge.png",
		w: 192,
		h: 179,
		f: [0, 0, 1, 1, 2, 2, 3, 3],
		fps: 30,
		cx: 91,
		cy: 163,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_attack: {
		u: "mcBoss1_attack.png",
		w: 251,
		h: 178,
		f: [0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4],
		fps: 30,
		cx: 151,
		cy: 158,
		collision: "x:-45;y:-90;w:100;h:80"
	},
	mcBoss1_appear: {
		u: "mcBoss1_appear.png",
		w: 192,
		h: 224,
		f: [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8],
		fps: 30,
		cx: 97,
		cy: 204,
		collision: "x:-45;y:-90;w:100;h:80"
	}
};
function UIAssets() {}
UIAssets.loaderBack = "media/images/ui_images/screens/gui_screens_loader_background.jpg";
UIAssets.buttons = "gui_buttons_character.png gui_buttons_icons01.png gui_buttons_icons02.png gui_buttons_icons03.png gui_buttons_text01.png gui_buttons_text02.png gui_buttons_text03.png gui_buttons_trophies.png".split(" ");
UIAssets.common = ["gui_common_background.jpg", "gui_common_panel.png", "unsupported.jpg", "console_bg.png"];
UIAssets.popups = "gui_popups_endlevel_text_support.png gui_popups_message_support.png gui_popups_message_support02.png gui_popups_newtrophy_support.png gui_popups_panel.png gui_popups_dialogue_support.png".split(" ");
UIAssets.screens = "gui_rotatescreen.jpg gui_screens_cutscene01.jpg gui_screens_cutscene02.jpg gui_screens_endgame_background.jpg gui_screens_help01_background.jpg gui_screens_help02_background.jpg gui_screens_finalcutscene.jpg gui_screens_loader_background.jpg gui_screens_mainmenu_background.jpg gui_screens_selectcharacter_background.jpg gui_screens_trophies_background.jpg gui_screens_tryagain_background.jpg gui_screens_selectcharacter_character01.png gui_screens_selectcharacter_character02.png gui_screens_selectcharacter_character03.png gui_screens_selectcharacter_character04.png gui_screens_trophies_trophy.png".split(" ");
function Global() {}
Global.TOTAL_ROOMS = 13;
Global.TOTAL_CHARACTERS = 5;
Global.KEY_NUM_DATA = "dataDXDV";
Global.savedNumData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Global.savedDataTutorial = [0];
Global.savedTimeShield = 0;
Global.gameVersion = 28;
Global.INDEX_GAME_VERSION = 0;
Global.INDEX_CURRENT_ROOM = 1;
Global.INDEX_ENTER_ROOM_FROM = 2;
Global.INDEX_FIRST_GAME = 3;
Global.INDEX_CHOSEN_CHARACTER = 4;
Global.INDEX_CURRENT_LIVES = 5;
Global.INDEX_CURRENT_HP = 6;
Global.INDEX_CURRENT_WEAPON = 7;
Global.INDEX_CURRENT_MP = 8;
Global.INDEX_CURRENT_SCORE = 9;
Global.INDEX_PASSED_ROOM_0 = 10;
Global.INDEX_PASSED_ROOM_1 = 11;
Global.INDEX_PASSED_ROOM_2 = 12;
Global.INDEX_PASSED_ROOM_3 = 13;
Global.INDEX_PASSED_ROOM_4 = 14;
Global.INDEX_PASSED_ROOM_5 = 15;
Global.INDEX_PASSED_ROOM_6 = 16;
Global.INDEX_PASSED_ROOM_7 = 17;
Global.INDEX_PASSED_ROOM_8 = 18;
Global.INDEX_PASSED_ROOM_9 = 19;
Global.INDEX_PASSED_ROOM_10 = 20;
Global.INDEX_PASSED_ROOM_11 = 21;
Global.INDEX_PASSED_ROOM_12 = 22;
Global.INDEX_PASSED_ROOM_13 = 23;
Global.INDEX_PASSED_ROOM_14 = 24;
Global.INDEX_TROPHY_1 = 25;
Global.INDEX_TROPHY_2 = 26;
Global.INDEX_TROPHY_3 = 27;
Global.INDEX_TROPHY_4 = 28;
Global.INDEX_TROPHY_5 = 29;
Global.INDEX_ENEMIES_KILLED = 30;
Global.INDEX_BOSSES_KILLED = 31;
Global.INDEX_PASSED_CHARACTER_1 = 32;
Global.INDEX_PASSED_CHARACTER_2 = 33;
Global.INDEX_PASSED_CHARACTER_3 = 34;
Global.INDEX_PASSED_CHARACTER_4 = 35;
Global.INDEX_PASSED_CHARACTER_5 = 36;
Global.INDEX_HIGHEST_SCORE = 37;
Global.INDEX_NEW_HIGHEST_SCORE = 38;
Global.lastDoorEnteredX = 0;
Global.lastDoorEnteredY = 0;
Global.game = null;
Global.level = 1;
Global.playerSelected = 0;
Global.MOBILE_MODE_GAME = 2;
Global.URL_ASSETS = "media/images/animo/";
Global.URL_UI_IMAGES = "media/images/ui_images/";
Global.achievements = null;
Global.DEPTH_EFFECT = 9999999;
Global.DEPTH_BULLET = 9999990;
Global.DEPTH_SHIELD = 9999900;
Global.DEPTH_DOORS = 999999999;
Global.DEPTH_FOREGROUND = 9999970;
function AchievementManager() {
	this.clearedRoomRef = parseInt(Application.config.settings.clearedRoomRef, 10);
	this.achRoomService = parseInt(Global.savedNumData[Global.INDEX_TROPHY_1], 10);
	Application.log("ACH: ROOM SERVICE " + this.achRoomService);
	this.bossCounterRef = parseInt(Application.config.settings.bossCounterRef, 10);
	this.achBossKicker = parseInt(Global.savedNumData[Global.INDEX_TROPHY_2], 10);
	Application.log("ACH: BOSS KICKER " + this.achBossKicker);
	this.characterCountRef = parseInt(Application.config.settings.characterCounterRef, 10);
	this.achGreero = parseInt(Global.savedNumData[Global.INDEX_TROPHY_3], 10);
	Application.log("ACH: GREERO " + this.achGreero);
	this.enemyRef1 = parseInt(Application.config.settings.enemyRef1, 10);
	this.achYoureBeingRude = parseInt(Global.savedNumData[Global.INDEX_TROPHY_4], 10);
	Application.log("ACH: YOU'RE BEING RUDE " + this.achYoureBeingRude);
	this.enemyRef2 = parseInt(Application.config.settings.enemyRef2, 10);
	this.achUnnecessaryViolence = parseInt(Global.savedNumData[Global.INDEX_TROPHY_5], 10);
	Application.log("ACH: UNNECESSARY VIOLENCE " + this.achUnnecessaryViolence)
}
AchievementManager.prototype.reset = function() {
	this.achRoomService = 0;
	Global.savedNumData[Global.INDEX_TROPHY_1] = this.achRoomService;
	this.achBossKicker = 0;
	Global.savedNumData[Global.INDEX_TROPHY_2] = this.achBossKicker;
	this.achGreero = 0;
	Global.savedNumData[Global.INDEX_TROPHY_3] = this.achGreero;
	this.achYoureBeingRude = 0;
	Global.savedNumData[Global.INDEX_TROPHY_4] = this.achYoureBeingRude;
	this.achUnnecessaryViolence = 0;
	Global.savedNumData[Global.INDEX_TROPHY_5] = this.achUnnecessaryViolence
};
AchievementManager.prototype.resetAllData = function() {
	Global.savedNumData = [Global.gameVersion, 14, 2, 0, 0, Application.config.settings.playerLives, Application.config.settings.playerStartingHp, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))
};
AchievementManager.prototype.resetGameData = function() {
	for (var a = 0; a < Global.INDEX_TROPHY_1; a++) Global.savedNumData[a] = 0;
	Global.savedNumData[Global.INDEX_GAME_VERSION] = Global.gameVersion;
	Global.savedNumData[Global.INDEX_CURRENT_ROOM] = 14;
	Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM] = 2;
	Global.savedNumData[Global.INDEX_FIRST_GAME] = 0;
	Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER] = 0;
	Global.savedNumData[Global.INDEX_CURRENT_LIVES] = Application.config.settings.playerLives;
	Global.savedNumData[Global.INDEX_CURRENT_HP] = Application.config.settings.playerStartingHp;
	Global.savedNumData[Global.INDEX_CURRENT_WEAPON] = 1;
	Global.savedNumData[Global.INDEX_CURRENT_MP] = 1;
	Global.savedNumData[Global.INDEX_NEW_HIGHEST_SCORE] = 0;
	Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData));
	Global.savedDataTutorial[0] = 0
};
AchievementManager.prototype.checkAchRoomService = function(a) {
	1 === this.achRoomService ? Application.log("ALREAD ACH: ROOM SERVICE") : a >= this.clearedRoomRef && (HudGame.instance.showTrophy(!0, 1, !0), Application.log("ACH: ROOM SERVICE DONE!"), this.achRoomService = 1, Global.savedNumData[Global.INDEX_TROPHY_1] = this.achRoomService, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)))
};
AchievementManager.prototype.checkAchBossKicker = function() {
	1 === this.achBossKicker ? Application.log("ALREAD ACH: BOSS KICKER") : Global.savedNumData[Global.INDEX_BOSSES_KILLED] >= this.bossCounterRef && (HudGame.instance.showTrophy(!0, 2, !0), Application.log("ACH: BOSS KICKER DONE!"), this.achBossKicker = 1, Global.savedNumData[Global.INDEX_TROPHY_2] = this.achBossKicker, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)))
};
AchievementManager.prototype.checkAchGreero = function(a) {
	1 === this.achGreero ? Application.log("ALREAD ACH: GREERO") : a >= this.characterCountRef && (HudGame.instance.showTrophy(!0, 3, !0), Application.log("ACH: GREERO DONE!"), this.achGreero = 1, Global.savedNumData[Global.INDEX_TROPHY_3] = this.achGreero, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)))
};
AchievementManager.prototype.checkAchBeingRude = function() {
	1 === this.achYoureBeingRude ? Application.log("ALREAD ACH: YOU'RE BEING RUDE") : Global.savedNumData[Global.INDEX_ENEMIES_KILLED] >= this.enemyRef1 && (HudGame.instance.showTrophy(!0, 4, !0), Application.log("ACH: YOU'RE BEING RUDE DONE!"), this.achYoureBeingRude = 1, Global.savedNumData[Global.INDEX_TROPHY_4] = this.achYoureBeingRude, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)))
};
AchievementManager.prototype.checkAchUnnecessaryViolence = function() {
	1 === this.achUnnecessaryViolence ? Application.log("ALREAD ACH: UNNECESSARY VIOLENCE") : Global.savedNumData[Global.INDEX_ENEMIES_KILLED] >= this.enemyRef2 && (HudGame.instance.showTrophy(!0, 5, !0), Application.log("ACH: UNNECESSARY VIOLENCE DONE!"), this.achUnnecessaryViolence = 1, Global.savedNumData[Global.INDEX_TROPHY_5] = this.achUnnecessaryViolence, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)))
};
function Circle(a, b, c) {
	this.x = "undefined" === typeof a ? 0 : a;
	this.y = "undefined" === typeof b ? 0 : b;
	this.r = "undefined" === typeof c ? 0 : c
}
Circle.prototype.hitTest = function(a, b) {
	return (this.x - a) * (this.x - a) + (this.y - b) * (this.y - b) <= this.r * this.r
};
Circle.prototype.toString = function() {
	return "circle x:" + this.x + " y:" + this.y + " r:" + this.r
};
function Path(a) {
	this.m_sections = [];
	this.m_length = 0;
	for (var b = a.point.length(), c = 0; c < b; ++c) {
		for (var d = a.point[c].n, e = [], f = 0; f < d; ++f) e.push(new Vector2D(parseFloat(a.point[c]["x" + f]), parseFloat(a.point[c]["y" + f])));
		e.push(new Vector2D(parseFloat(a.point[(c + 1) % b].x0), parseFloat(a.point[(c + 1) % b].y0)));
		d = new PathSection(e, this.m_length);
		this.m_length += d.length();
		this.m_sections.push(d)
	}
}
Path.prototype.free = function() {
	this.m_sections = null
};
Path.prototype.update = function(a, b) {
	this.m_sections[b.pathPosition.section].update(a, b);
	b.pathPosition.point ? b.setPosition(b.pathPosition.point.x, b.pathPosition.point.y) : (b.pathPosition.section < this.m_sections.length - 1 ? b.pathPosition.section += 1 : (b.pathPosition.section = 0, b.pathPosition.distance = 0), this.m_sections[b.pathPosition.section].update(a, b), b.pathPosition.point ? b.setPosition(b.pathPosition.point.x, b.pathPosition.point.y) : Application.info("ERROR"))
};
Path.prototype.toString = function() {
	for (var a = "Path:",
	b = this.m_sections.length,
	c = 0; c < b; ++c) a += "\n" + this.m_sections[c];
	return a
};
function PathSection(a, b) {
	this.m_order = a.length - 1;
	this.m_points = a;
	this.m_initLength = b;
	this.m_length = 0;
	this.m_oldPos = null;
	switch (this.m_order) {
	case PathSection.CONIC:
	case PathSection.CUBIC:
	case PathSection.LINE:
		this.m_dir = new Vector2D(this.m_points[this.m_order].x - this.m_points[0].x, this.m_points[this.m_order].y - this.m_points[0].y);
		this.m_length = this.m_dir.length();
		this.m_angle = this.m_dir.angle();
		this.m_dir.normalize();
		break;
	default:
		Application.error("Invalid path section order: " + this.m_order)
	}
}
PathSection.LINE = 1;
PathSection.CONIC = 2;
PathSection.CUBIC = 3;
PathSection.SECTIONS = 3;
PathSection.prototype.free = function() {
	this.m_points = null
};
PathSection.prototype.length = function() {
	return this.m_length
};
PathSection.prototype.update = function(a, b) {
	var c = b.pathPosition.distance + a,
	d;
	if (c <= this.m_initLength + this.m_length) {
		switch (this.m_order) {
		case PathSection.LINE:
			b.pathPosition.point = this.m_dir.clone();
			b.pathPosition.point.scale(c - this.m_initLength);
			b.pathPosition.point.add(this.m_points[0]);
			b.pathPosition.tangent = this.m_angle;
			break;
		case PathSection.CONIC:
			b.pathPosition.point = new Vector2D;
			d = (c - this.m_initLength) / this.m_length;
			b.pathPosition.point.x = (1 - d) * (1 - d) * this.m_points[0].x + 2 * (1 - d) * d * this.m_points[1].x + d * d * this.m_points[2].x;
			b.pathPosition.point.y = (1 - d) * (1 - d) * this.m_points[0].y + 2 * (1 - d) * d * this.m_points[1].y + d * d * this.m_points[2].y;
			this.m_oldPos && (this.m_oldPos.subtract(b.pathPosition.point), this.m_oldPos.scale( - 1), b.pathPosition.tangent = this.m_oldPos.angle());
			this.m_oldPos = b.pathPosition.point;
			break;
		case PathSection.CUBIC:
			b.pathPosition.point = new Vector2D;
			d = (c - this.m_initLength) / this.m_length;
			b.pathPosition.point.x = (1 - d) * (1 - d) * (1 - d) * this.m_points[0].x + 3 * (1 - d) * (1 - d) * d * this.m_points[1].x + 3 * (1 - d) * d * d * this.m_points[2].x + d * d * d * this.m_points[3].x;
			b.pathPosition.point.y = (1 - d) * (1 - d) * (1 - d) * this.m_points[0].y + 3 * (1 - d) * (1 - d) * d * this.m_points[1].y + 3 * (1 - d) * d * d * this.m_points[2].y + d * d * d * this.m_points[3].y;
			this.m_oldPos && (this.m_oldPos.subtract(b.pathPosition.point), this.m_oldPos.scale( - 1), b.pathPosition.tangent = this.m_oldPos.angle());
			this.m_oldPos = b.pathPosition.point;
			break;
		default:
			Application.error("Invalid path section order: " + this.m_order)
		}
		b.pathPosition.distance = c
	} else this.m_oldPos = b.pathPosition.point = null
};
PathSection.prototype.toString = function() {
	for (var a = "section:",
	b = 0; b < this.m_points.length; ++b) a += this.m_points[b] + " ";
	return a
};
function TweenManager() {
	this._tweens = [];
	TweenManager.instance = this
}
TweenManager.prototype.getAll = function() {
	return this._tweens
};
TweenManager.prototype.removeAll = function() {
	this._tweens = []
};
TweenManager.prototype.add = function(a) {
	this._tweens.push(a)
};
TweenManager.prototype.remove = function(a) {
	a = this._tweens.indexOf(a); - 1 !== a && this._tweens.splice(a, 1)
};
TweenManager.prototype.update = function(a) {
	if (0 === this._tweens.length) return ! 1;
	var b = 0,
	c = this._tweens.length;
	for (a = void 0 !== a ? a: "undefined" !== typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); b < c;) this._tweens[b] && this._tweens[b].update(a) ? b++:(this._tweens[b].free(), this._tweens.splice(b, 1), c--);
	return ! 0
};
function TweenEasing() {}
TweenEasing.LinearNone = function(a) {
	return a
};
TweenEasing.QuadraticIn = function(a) {
	return a * a
};
TweenEasing.QuadraticOut = function(a) {
	return a * (2 - a)
};
TweenEasing.QuadraticInOut = function(a) {
	return 1 > (a *= 2) ? 0.5 * a * a: -0.5 * (--a * (a - 2) - 1)
};
TweenEasing.CubicIn = function(a) {
	return a * a * a
};
TweenEasing.CubicOut = function(a) {
	return--a * a * a + 1
};
TweenEasing.CubicInOut = function(a) {
	return 1 > (a *= 2) ? 0.5 * a * a * a: 0.5 * ((a -= 2) * a * a + 2)
};
TweenEasing.QuarticIn = function(a) {
	return a * a * a * a
};
TweenEasing.QuarticOut = function(a) {
	return 1 - --a * a * a * a
};
TweenEasing.QuarticInOut = function(a) {
	return 1 > (a *= 2) ? 0.5 * a * a * a * a: -0.5 * ((a -= 2) * a * a * a - 2)
};
TweenEasing.QuinticIn = function(a) {
	return a * a * a * a * a
};
TweenEasing.QuinticOut = function(a) {
	return--a * a * a * a * a + 1
};
TweenEasing.QuinticInOut = function(a) {
	return 1 > (a *= 2) ? 0.5 * a * a * a * a * a: 0.5 * ((a -= 2) * a * a * a * a + 2)
};
TweenEasing.SinusoidalIn = function(a) {
	return 1 - Math.cos(a * Math.PI / 2)
};
TweenEasing.SinusoidalOut = function(a) {
	return Math.sin(a * Math.PI / 2)
};
TweenEasing.SinusoidalInOut = function(a) {
	return 0.5 * (1 - Math.cos(Math.PI * a))
};
TweenEasing.ExponentialIn = function(a) {
	return 0 === a ? 0 : Math.pow(1024, a - 1)
};
TweenEasing.ExponentialOut = function(a) {
	return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
};
TweenEasing.ExponentialInOut = function(a) {
	return 0 === a ? 0 : 1 === a ? 1 : 1 > (a *= 2) ? 0.5 * Math.pow(1024, a - 1) : 0.5 * ( - Math.pow(2, -10 * (a - 1)) + 2)
};
TweenEasing.CircularIn = function(a) {
	return 1 - Math.sqrt(1 - a * a)
};
TweenEasing.CircularOut = function(a) {
	return Math.sqrt(1 - --a * a)
};
TweenEasing.CircularInOut = function(a) {
	return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
};
TweenEasing.ElasticIn = function(a) {
	var b, c = 0.1;
	if (0 === a) return 0;
	if (1 === a) return 1; ! c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * Math.asin(1 / c) / (2 * Math.PI);
	return - (c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / 0.4))
};
TweenEasing.ElasticOut = function(a) {
	var b, c = 0.1;
	if (0 === a) return 0;
	if (1 === a) return 1; ! c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * Math.asin(1 / c) / (2 * Math.PI);
	return c * Math.pow(2, -10 * a) * Math.sin(2 * (a - b) * Math.PI / 0.4) + 1
};
TweenEasing.ElasticInOut = function(a) {
	var b, c = 0.1;
	if (0 === a) return 0;
	if (1 === a) return 1; ! c || 1 > c ? (c = 1, b = 0.1) : b = 0.4 * Math.asin(1 / c) / (2 * Math.PI);
	return 1 > (a *= 2) ? -0.5 * c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / 0.4) : 0.5 * c * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / 0.4) + 1
};
TweenEasing.BackIn = function(a) {
	return a * a * (2.70158 * a - 1.70158)
};
TweenEasing.BackOut = function(a) {
	return--a * a * (2.70158 * a + 1.70158) + 1
};
TweenEasing.BackInOut = function(a) {
	return 1 > (a *= 2) ? 0.5 * a * a * (3.5949095 * a - 2.5949095) : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
};
TweenEasing.BounceIn = function(a) {
	return 1 - TweenEasing.BounceOut(1 - a)
};
TweenEasing.BounceOut = function(a) {
	return a < 1 / 2.75 ? 7.5625 * a * a: a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
};
TweenEasing.BounceInOut = function(a) {
	return 0.5 > a ? 0.5 * TweenEasing.BounceIn(2 * a) : 0.5 * TweenEasing.BounceOut(2 * a - 1) + 0.5
};
function TweenInterpolation() {}
TweenInterpolation.Linear = function(a, b) {
	var c = a.length - 1,
	d = c * b,
	e = Math.floor(d),
	f = TweenInterpolation.UtilsLinear;
	return 0 > b ? f(a[0], a[1], d) : 1 < b ? f(a[c], a[c - 1], c - d) : f(a[e], a[e + 1 > c ? c: e + 1], d - e)
};
TweenInterpolation.Bezier = function(a, b) {
	var c = 0,
	d = a.length - 1,
	e = Math.pow,
	f = TweenInterpolation.UtilsBernstein,
	g;
	for (g = 0; g <= d; g++) c += e(1 - b, d - g) * e(b, g) * a[g] * f(d, g);
	return c
};
TweenInterpolation.CatmullRom = function(a, b) {
	var c = a.length - 1,
	d = c * b,
	e = Math.floor(d),
	f = TweenInterpolation.UtilsCatmullRom;
	return a[0] === a[c] ? (0 > b && (e = Math.floor(d = c * (1 + b))), f(a[(e - 1 + c) % c], a[e], a[(e + 1) % c], a[(e + 2) % c], d - e)) : 0 > b ? a[0] - (f(a[0], a[0], a[1], a[1], -d) - a[0]) : 1 < b ? a[c] - (f(a[c], a[c], a[c - 1], a[c - 1], d - c) - a[c]) : f(a[e ? e - 1 : 0], a[e], a[c < e + 1 ? c: e + 1], a[c < e + 2 ? c: e + 2], d - e)
};
TweenInterpolation.UtilsLinear = function(a, b, c) {
	return (b - a) * c + a
};
TweenInterpolation.UtilsBernstein = function(a, b) {
	var c = TweenInterpolation.UtilsFactorial;
	return c(a) / c(b) / c(a - b)
};
TweenInterpolation.UtilsFactorial = function(a) {
	for (var b = 1,
	c = 1; c <= a; c++) b *= c;
	return b
};
TweenInterpolation.UtilsCatmullRom = function(a, b, c, d, e) {
	a = 0.5 * (c - a);
	d = 0.5 * (d - b);
	var f = e * e;
	return (2 * b - 2 * c + a + d) * e * f + ( - 3 * b + 3 * c - 2 * a - d) * f + a * e + b
};
function Tween(a) {
	this._object = this.target = a;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1E3;
	this._repeat = 0;
	this._reversed = this._yoyo = !1;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TweenEasing.LinearNone;
	this._interpolationFunction = TweenInterpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = !1;
	this._onCompleteCallback = this._onUpdateCallback = null;
	for (var b in a) this._valuesStart[b] = parseFloat(a[b])
}
Tween.prototype.free = function() {
	this._onCompleteCallback = this._onUpdateCallback = this._onStartCallback = this._chainedTweens = this._interpolationFunction = this._easingFunction = this._valuesStartRepeat = this._valuesEnd = this._valuesStart = this._object = this.target = null
};
Tween.prototype.to = function(a, b) {
	void 0 !== b && (this._duration = b);
	this._valuesEnd = a;
	return this
};
Tween.prototype.start = function(a) {
	TweenManager.instance.add(this);
	this._onStartCallbackFired = !1;
	this._startTime = void 0 !== a ? a: "undefined" !== typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
	this._startTime += this._delayTime;
	for (var b in this._valuesEnd) {
		if (this._valuesEnd[b] instanceof Array) {
			if (0 === this._valuesEnd[b].length) continue;
			this._valuesEnd[b] = [this._object[b]].concat(this._valuesEnd[b])
		}
		this._valuesStart[b] = this._object[b]; ! 1 === this._valuesStart[b] instanceof Array && (this._valuesStart[b] *= 1);
		this._valuesStartRepeat[b] = this._valuesStart[b] || 0
	}
	return this
};
Tween.prototype.stop = function() {
	TweenManager.instance.remove(this);
	return this
};
Tween.prototype.delay = function(a) {
	this._delayTime = a;
	return this
};
Tween.prototype.repeat = function(a) {
	this._repeat = a;
	return this
};
Tween.prototype.yoyo = function(a) {
	this._yoyo = a;
	return this
};
Tween.prototype.easing = function(a) {
	this._easingFunction = a;
	return this
};
Tween.prototype.interpolation = function(a) {
	this._interpolationFunction = a;
	return this
};
Tween.prototype.chain = function() {
	this._chainedTweens = arguments;
	return this
};
Tween.prototype.onStart = function(a) {
	this._onStartCallback = a;
	return this
};
Tween.prototype.onUpdate = function(a) {
	this._onUpdateCallback = a;
	return this
};
Tween.prototype.onComplete = function(a) {
	this._onCompleteCallback = a;
	return this
};
Tween.prototype.update = function(a) {
	var b;
	if (a < this._startTime) return ! 0; ! 1 === this._onStartCallbackFired && (null !== this._onStartCallback && this._onStartCallback.call(this._object, this), this._onStartCallbackFired = !0);
	var c = (a - this._startTime) / this._duration,
	c = 1 < c ? 1 : c,
	d = this._easingFunction(c);
	for (b in this._valuesEnd) {
		var e = this._valuesStart[b] || 0,
		f = this._valuesEnd[b];
		f instanceof Array ? this._object[b] = this._interpolationFunction(f, d) : ("string" === typeof f && (f = e + parseFloat(f)), "number" === typeof f && (this._object[b] = e + (f - e) * d))
	}
	if (1 == c) {
		if (0 < this._repeat) {
			isFinite(this._repeat) && this._repeat--;
			for (b in this._valuesStartRepeat)"string" === typeof this._valuesEnd[b] && (this._valuesStartRepeat[b] += parseFloat(this._valuesEnd[b])),
			this._yoyo && (c = this._valuesStartRepeat[b], this._valuesStartRepeat[b] = this._valuesEnd[b], this._valuesEnd[b] = c, this._reversed = !this._reversed),
			this._valuesStart[b] = this._valuesStartRepeat[b];
			this._startTime = a + this._delayTime;
			return ! 0
		}
		null !== this._onCompleteCallback && this._onCompleteCallback.call(this._object, this);
		b = 0;
		for (c = this._chainedTweens.length; b < c; b++) this._chainedTweens[b].start(a);
		return ! 1
	}
	null !== this._onUpdateCallback && null !== this._object && this._onUpdateCallback.call(this._object, this);
	return ! 0
};
function Common() {}
Common.saveData = function(a, b) {
	var c = new Date;
	c.setDate(c.getDate() + Common.COOKIE_EXPIRATION_DAYS);
	c = "; expires=" + c.toUTCString();
	document.cookie = a + "=" + b + c + "; path=/"
};
Common.COOKIE_EXPIRATION_DAYS = 1E3;
Common.loadData = function(a, b) {
	for (var c = a + "=",
	d = document.cookie.split(";"), e = 0; e < d.length; ++e) {
		for (var f = d[e];
		" " === f.charAt(0);) f = f.substring(1, f.length);
		if (0 === f.indexOf(c)) return f.substring(c.length, f.length)
	}
	return b
};
Common.storageString = function(a, b) {
	b = "undefined" !== typeof b ? b: "|";
	for (var c = "",
	d = 0; d < a.length; d++) c += 0 !== d ? b: "",
	c += a[d];
	return c
};
Common.initArr = function(a, b) {
	for (var c = [], d = 0; d < b; d++) c.push(a);
	return c
};
Common.distance = function(a, b, c, d) {
	return Math.sqrt(Math.pow(a - c, 2) + Math.pow(b - d, 2))
};
Common.swtClamp = function(a, b, c) {
	return a < b ? b: a > c ? c: a
};
Common.inArray = function(a, b) {
	return - 1 !== b.indexOf(a)
};
Common.random = function(a, b) {
	return Math.floor(Math.random() * (b - a + 1)) + a
};
Common.getRandomFromArray = function(a, b) {
	var c = a.length;
	if (1 < c) {
		if ("undefined" !== typeof b) {
			for (var d = [], e = 0; e < c; ++e) a[e] !== b && d.push(e);
			if (0 < d.length) return a[d[Math.floor(d.length * Math.random())]]
		}
		return a[Math.floor(c * Math.random())]
	}
	return 1 === c ? a[0] : null
};
Common.randomAndSpliceFromArray = function(a) {
	return a.splice(Common.random(0, a.length - 1), 1)
};
Common.shuffleArray = function(a) {
	for (var b, c, d = a.length - 1; 1 <= d; --d) b = Math.floor(Math.random() * (d + 1)),
	c = a[b],
	a[b] = a[d],
	a[d] = c
};
Common.getParams = function(a) {
	var b = {};
	a = a.split(";");
	for (var c = 0; c < a.length; c++) for (var d = a[c].split(":"), e = 0; e < d.length; e++) b[String(d[0]).concat()] = d[1];
	return b
};
Common.lengthObject = function(a) {
	var b = 0,
	c;
	for (c in a) a.hasOwnProperty(c) && ++b;
	return b
};
Common.trim = function(a) {
	return String(a).replace(/^\s*(.*?)\s*$/g, "$1")
};
Common.parseNum = function(a) {
	return 10 > a ? "0" + a: "" + a
};
Common.circumferenceAngle = function(a, b) {
	var c = Math.atan2(b, a),
	c = c * (180 / Math.PI);
	return 0 > c ? 360 - c: c
};
Common.makeClockTime = function(a) {
	var b = {};
	a = Math.ceil(a / 1E3);
	var c = Math.floor(a / 60),
	d = Math.floor(a % 60);
	b.total = a;
	b.minutes = c;
	b.seconds = d;
	return b
};
Common.getDigitsByValue = function(a, b) {
	for (var c = String(a), d = [], d = b - c.length, e = 0; e < d; e++) c = "0" + c;
	return d = c.split("")
};
Common.shake = function(a, b, c, d, e) {
	var f = {};
	f.clip = a;
	f.x = f.clip._x;
	f.y = f.clip._y;
	f.caller = d;
	f.nameFunction = e;
	f.time = b;
	f.baseTime = 0;
	f.strong = c;
	var g = setInterval(function() {
		Application.info(f.clip._x);
		parseInt(f.baseTime, 10) == parseInt(f.time, 10) ? (clearInterval(g), null != f.caller && f.nameFunction.call(f.caller), null != f.clip && (f.clip.setX(f.x), f.clip.setY(f.y)), f = null) : (null != f.clip && (f.clip.setX(f.x + (Common.random(0, f.strong) - 0.5 * f.strong)), f.clip.setY(f.y + (Common.random(0, f.strong) - 0.5 * f.strong))), f.baseTime++)
	},
	50)
};
Common.KEY_1 = 49;
Common.KEY_2 = 50;
Common.KEY_3 = 51;
Common.KEY_4 = 52;
Common.KEY_5 = 53;
Common.KEY_6 = 54;
Common.KEY_7 = 55;
Common.KEY_8 = 56;
Common.KEY_9 = 57;
Common.KEY_0 = 48;
Common.KEY_A = 65;
Common.KEY_B = 66;
Common.KEY_C = 67;
Common.KEY_D = 68;
Common.KEY_E = 69;
Common.KEY_F = 70;
Common.KEY_G = 71;
Common.KEY_H = 72;
Common.KEY_I = 73;
Common.KEY_J = 74;
Common.KEY_K = 75;
Common.KEY_L = 76;
Common.KEY_M = 77;
Common.KEY_N = 78;
Common.KEY_O = 79;
Common.KEY_P = 80;
Common.KEY_Q = 81;
Common.KEY_R = 82;
Common.KEY_S = 83;
Common.KEY_T = 84;
Common.KEY_U = 85;
Common.KEY_V = 86;
Common.KEY_W = 87;
Common.KEY_X = 88;
Common.KEY_Z = 90;
Common.KEY_ESC = 27;
Common.KEY_SPACE = 32;
Common.KEY_ENTER = 13;
Common.KEY_LEFT = 37;
Common.KEY_RIGHT = 39;
Common.KEY_DOWN = 40;
Common.KEY_UP = 38;
Common.COLOR_NONE = "rgba(0, 0, 0, 0)";
Common.COLOR_RED = "#FF0000";
Common.COLOR_GREEN = "#00FF00";
Common.COLOR_BLUE = "#0000FF";
Common.COLOR_BLACK = "#000000";
Common.COLOR_WHITE = "#FFFFFF";
Common.COLOR_ORANGE = "#FF9900";
Common.COLOR_MAGENTA = "#FF00FF";
Common.COLOR_PURPLE = "#990066";
Common.COLOR_PINK = "#FF66FF";
Common.COLOR_BROWN = "#663300";
Common.COLOR_YELLOW = "#FFFF00";
Common.COLOR_GREY = "#666666";
Common.COLOR_DARK_BLUE = "#000066";
function ConsolePanel(a) {
	ConsolePanel.COLOR_BUTTON_NORMAL = "blue";
	ConsolePanel.COLOR_BUTTON_SELECT = "#5F04B4";
	this.mode = a;
	this.mode === ConsolePanel.MODE_SIMPLE ? (this.content = $("<div id='consolePanel'> <div id='consoleButtons'> <div class='console onlyfps' id='consoleFPS'>FPS</div></div></div>"), $("body").append(this.content), this.content.css("z-index", "100")) : (this.show = !0, this.stop = !1, this.type = this.counter = 0, this.showMaxLines = 40, this.content = $("<div id='consolePanel'> <div id='consoleButtons'> <div class='console toogle' id='consoleToogle'>SHOW</div><div class='console fps' id='consoleFPS'>FPS</div><div class='console play' id='consolePlay'>STOP</div><div class='console all' id='consoleAll'>ALL</div><div class='console infos' id='consoleInfos'>INFOS</div><div class='console logs' id='consoleLogs'>LOGS</div><div class='console warns' id='consoleWarns'>WARNS</div><div class='console errors' id='consoleErrors'>ERRORS</div><div class='console clear' id='consoleClear'>CLEAR</div></div><br><div><p id='consoleTextInfo'></p></div><div><p id='consoleText'></p></div></div>"), $("body").append(this.content), this.content.css("pointer-events", "none"), this.content.css("position", "absolute"), this.content.css("width", Application.APP_WIDTH + "px"), this.content.css("height", Application.APP_HEIGHT + "px"), this.content.css("z-index", "100"), this.content.css("overflow-y", "scroll"), this.content.css("-webkit-overflow-scrolling", "touch"), $("#consoleText").css("position", "relative"), $("#consoleText").css("top", "-20px"), $("#consoleText").css("font-size", "12px"), $("#consoleText").css("line-height", "100%"), $("#consoleButtons").css("pointer-events", "auto"), this.addPressListener("consoleToogle"), this.addPressListener("consoleAll"), this.addPressListener("consoleInfos"), this.addPressListener("consoleLogs"), this.addPressListener("consoleWarns"), this.addPressListener("consoleErrors"), this.addPressListener("consolePlay"), this.addPressListener("consoleClear"), this.lines = [], this.lastMsn = {},
	this.lastMsnCounter = 1, this.toogle(), this.textInfo = "", $("#consoleAll").css("background-color", ConsolePanel.COLOR_BUTTON_SELECT))
}
ConsolePanel.initialize = function(a) {
	ConsolePanel.instance = new ConsolePanel(a)
};
ConsolePanel.prototype.onPress = function(a) {
	switch (a.id) {
	case "consoleAll":
	case "consoleInfos":
	case "consoleLogs":
	case "consoleWarns":
	case "consoleErrors":
		$("#consoleAll").css("background-color", ConsolePanel.COLOR_BUTTON_NORMAL),
		$("#consoleInfos").css("background-color", ConsolePanel.COLOR_BUTTON_NORMAL),
		$("#consoleLogs").css("background-color", ConsolePanel.COLOR_BUTTON_NORMAL),
		$("#consoleWarns").css("background-color", ConsolePanel.COLOR_BUTTON_NORMAL),
		$("#consoleErrors").css("background-color", ConsolePanel.COLOR_BUTTON_NORMAL)
	}
	switch (a.id) {
	case "consoleToogle":
		this.show ? (this.content.css("width", "101px"), this.content.css("height", "32px"), this.content.css("overflow-y", "hidden"), $(".console.toogle").html("SHOW"), $("#consoleText").css("display", "none")) : (this.content.css("width", Application.APP_WIDTH + "px"), this.content.css("height", Application.APP_HEIGHT + "px"), this.content.css("overflow-y", "scroll"), $(".console.toogle").html("HIDE"), $("#consoleText").css("display", ""));
		this.show = !this.show;
		break;
	case "consoleAll":
		this.type = ConsolePanel.TYPE_ALL;
		$("#consoleAll").css("background-color", ConsolePanel.COLOR_BUTTON_SELECT);
		this.filter();
		break;
	case "consoleInfos":
		this.type = ConsolePanel.TYPE_INFO;
		$("#consoleInfos").css("background-color", ConsolePanel.COLOR_BUTTON_SELECT);
		this.filter();
		break;
	case "consoleLogs":
		this.type = ConsolePanel.TYPE_LOG;
		$("#consoleLogs").css("background-color", ConsolePanel.COLOR_BUTTON_SELECT);
		this.filter();
		break;
	case "consoleWarns":
		this.type = ConsolePanel.TYPE_WARN;
		$("#consoleWarns").css("background-color", ConsolePanel.COLOR_BUTTON_SELECT);
		this.filter();
		break;
	case "consoleErrors":
		this.type = ConsolePanel.TYPE_ERROR;
		$("#consoleErrors").css("background-color", ConsolePanel.COLOR_BUTTON_SELECT);
		this.filter();
		break;
	case "consolePlay":
		this.stop ? $("#consolePlay").html("STOP") : $("#consolePlay").html("PLAY");
		this.stop = !this.stop;
		break;
	case "consoleClear":
		this.lines = [],
		this.lastMsn = {},
		this.lastMsnCounter = 1,
		this.counter = 0,
		$("#consoleText").html(""),
		this.filter()
	}
};
ConsolePanel.prototype.toogle = function() {
	this.show ? (this.content.css("width", "101px"), this.content.css("height", "32px"), this.content.css("overflow", "hidden")) : (this.content.css("width", Application.APP_WIDTH + "px"), this.content.css("height", Application.APP_HEIGHT + "px"), this.content.css("overflow", "auto"));
	this.show = !this.show
};
ConsolePanel.prototype.onResize = function() {
	Layout.css("#consolePanel", "transform-origin", "0px 0px");
	Layout.css("#consolePanel", "transform", "matrix3d(" + Layout.scale + ",0,0,0, 0," + Layout.scale + ",0,0, 0,0," + Layout.scale + ",0, " + Layout.left + "," + Layout.top + ",0,1)")
};
ConsolePanel.prototype.clearPersistent = function() {
	this.textInfo = ""
};
ConsolePanel.prototype.persistent = function(a) {
	this.textInfo += " " + a;
	this.show && $("#consoleTextInfo").html(this.textInfo)
};
ConsolePanel.prototype.log = function(a) {
	this.mode === ConsolePanel.MODE_SIMPLE || this.stop || (a = this.checkMessage(a, ConsolePanel.TYPE_LOG), this.addMessage("<font color='#3ADF00'>" + this.counter + ". " + a + "<font><br>", ConsolePanel.TYPE_LOG))
};
ConsolePanel.prototype.info = function(a) {
	this.mode === ConsolePanel.MODE_SIMPLE || this.stop || (a = this.checkMessage(a, ConsolePanel.TYPE_INFO), this.addMessage("<font color='white'>" + this.counter + ". " + a + "<font><br>", ConsolePanel.TYPE_INFO))
};
ConsolePanel.prototype.warn = function(a) {
	this.mode === ConsolePanel.MODE_SIMPLE || this.stop || (a = this.checkMessage(a, ConsolePanel.TYPE_WARN), this.addMessage("<font color='yellow'>" + this.counter + ". " + a + "<font><br>", ConsolePanel.TYPE_WARN))
};
ConsolePanel.prototype.error = function(a) {
	this.mode === ConsolePanel.MODE_SIMPLE || this.stop || (a = this.checkMessage(a, ConsolePanel.TYPE_ERROR), this.addMessage("<font color='#FF8000'>" + this.counter + ". " + a + "<font><br>", ConsolePanel.TYPE_ERROR))
};
ConsolePanel.prototype.fps = function(a) {
	$("#consoleFPS").html("FPS " + a)
};
ConsolePanel.prototype.checkMessage = function(a, b) {
	this.lastMsn.msn === a && this.lastMsn.type === b ? (this.lastMsnCounter++, this.counter--, this.lines.splice(this.lines.length - 1, 1), a = "[" + this.lastMsnCounter + "] " + a) : (this.lastMsnCounter = 1, this.lastMsn = {
		msn: a,
		type: b
	});
	return a
};
ConsolePanel.prototype.addMessage = function(a, b) {
	this.lines.push({
		msn: a,
		type: b
	});
	this.counter++;
	for (var c = this.lines.length,
	d = c - 1; d > c - this.showMaxLines - 1 && 0 < d; d--);
	this.filter()
};
ConsolePanel.prototype.filter = function(a) {
	a = "";
	for (var b = 0,
	c = this.lines.length - 1; 0 < c; c--) if (b < this.showMaxLines) this.type === ConsolePanel.TYPE_ALL ? (a += this.lines[c].msn, b++) : this.type === this.lines[c].type && (a += this.lines[c].msn, b++);
	else break;
	$("#consoleText").html(a)
};
ConsolePanel.prototype.addPressListener = function(a) {
	a = $("#" + a);
	var b = this;
	0 < a.length && a.bind("touchstart mousedown",
	function(a) {
		a.stopPropagation();
		a.preventDefault();
		b.onPress(this)
	})
};
ConsolePanel.TYPE_ALL = 0;
ConsolePanel.TYPE_LOG = 1;
ConsolePanel.TYPE_INFO = 2;
ConsolePanel.TYPE_WARN = 3;
ConsolePanel.TYPE_ERROR = 4;
ConsolePanel.MODE_SIMPLE = 1;
ConsolePanel.MODE_COMPLETE = 2;
function VirtualStick(a, b, c, d, e, f) {
	VirtualStick.NONE = -100;
	this.maxForce = "undefined" === typeof b ? 0 : b;
	this.x = "undefined" === typeof c ? 0 : c;
	this.y = "undefined" === typeof d ? 0 : d;
	this.anchor = 0 === this.x && 0 === this.y ? !1 : !0;
	this.forceY = this.forceX = this.angle = this.force = 0;
	this.canvas = a;
	this.identifier = VirtualStick.NONE;
	this.clipBase = Application.instance.getClip(e);
	this.clipPointer = Application.instance.getClip(f);
	this.canvas.addChild(this.clipBase.sprite);
	this.canvas.addChild(this.clipPointer.sprite);
	this.clipBase.setPosition(c, d);
	this.clipPointer.setPosition(c, d);
	this.m_callbackReleaseFunction = this.m_callbackReleaseObject = this.m_callbackChangeFunction = this.m_callbackChangeObject = null;
	this.anchor || (this.clipBase.visible = !1, this.clipPointer.visible = !1)
}
VirtualStick.prototype.free = function() {
	this.m_callbackChangeFunction = this.m_callbackChangeObject = null;
	this.canvas.removeChild(this.clipBase.sprite);
	this.canvas.removeChild(this.clipPointer.sprite);
	this.canvas = this.clipPointer = this.clipBase = null
};
VirtualStick.prototype.addChangeListener = function(a, b) {
	this.m_callbackChangeObject = a;
	this.m_callbackChangeFunction = b
};
VirtualStick.prototype.addReleaseListener = function(a, b) {
	this.m_callbackReleaseObject = a;
	this.m_callbackReleaseFunction = b
};
VirtualStick.prototype.onPointerPress = function(a) {
	this.identifier === VirtualStick.NONE && (this.anchor || (this.x = a.offsetX, this.y = a.offsetY), this.clipBase.visible = !0, this.clipPointer.visible = !0, this.clipBase.setPosition(this.x, this.y), this.clipPointer.setPosition(this.x, this.y), this.identifier = a.identifier)
};
VirtualStick.prototype.onPointerRelease = function(a) {
	this.identifier === a.identifier && (this.anchor || (this.clipBase.visible = !1, this.clipPointer.visible = !1), this.forceY = this.forceX = this.angle = this.force = 0, this.clipPointer.setPosition(this.x, this.y), this.identifier = VirtualStick.NONE, null !== this.m_callbackReleaseObject && null !== this.m_callbackReleaseFunction && this.m_callbackReleaseFunction.call(this.m_callbackReleaseObject, this))
};
VirtualStick.prototype.onPointerMove = function(a) {
	this.identifier === a.identifier && (this.force = Math.sqrt((a.offsetX - this.x) * (a.offsetX - this.x) + (a.offsetY - this.y) * (a.offsetY - this.y)), this.angle = Math.atan2(a.offsetY - this.y, a.offsetX - this.x), 0 < this.maxForce && this.force > this.maxForce && (this.force = this.maxForce), this.forceX = Math.cos(this.angle), this.forceY = Math.sin(this.angle), this.clipPointer.setPosition(this.x + this.force * this.forceX, this.y + this.force * this.forceY), null !== this.m_callbackChangeObject && null !== this.m_callbackChangeFunction && this.m_callbackChangeFunction.call(this.m_callbackChangeObject, this))
};
function SGraphics() {}
SGraphics.drawLine = function(a, b, c, d, e, f, g) {
	a.beginPath();
	a.strokeStyle = "undefined" === typeof f ? Common.COLOR_BLACK: f;
	a.lineWidth = "undefined" === typeof g ? 1 : g;
	a.moveTo(b, c);
	a.lineTo(d, e);
	a.stroke();
	a.closePath()
};
SGraphics.drawRectangle = function(a, b, c, d, e, f, g, h) {
	a.strokeStyle = "undefined" === typeof g ? Common.COLOR_BLUE: g;
	a.lineWidth = "undefined" === typeof f ? 1 : f;
	a.fillStyle = "undefined" === typeof h ? "rgba(0, 0, 0, 0)": h;
	a.fillRect(b, c, d, e);
	a.strokeRect(b, c, d, e)
};
SGraphics.drawRect = function(a, b, c, d) {
	a.strokeStyle = "undefined" === typeof c ? Common.COLOR_BLUE: c;
	a.fillStyle = "undefined" === typeof d ? "rgba(0, 0, 0, 0)": d;
	a.lineWidth = 1;
	a.fillRect(b.x, b.y, b.w, b.h);
	a.strokeRect(b.x, b.y, b.w, b.h)
};
SGraphics.drawCircle = function(a, b, c, d, e, f) {
	a.beginPath();
	a.lineWidth = 1;
	a.strokeStyle = "undefined" === typeof e ? Common.COLOR_BLUE: e;
	a.arc(b, c, d, 0, 2 * Math.PI, !0);
	a.stroke();
	a.fillStyle = "undefined" === typeof f ? "rgba(0, 0, 0, 0)": f;
	a.fill();
	a.closePath()
};
SGraphics.drawArc = function(a, b, c, d, e, f, g, h) {
	a.beginPath();
	a.strokeStyle = "undefined" === typeof g ? Common.COLOR_BLUE: g;
	a.fillStyle = "undefined" === typeof h ? "rgba(0, 0, 0, 0)": h;
	a.lineWidth = 1;
	a.arc(b, c, d, e, f, !0);
	a.closePath();
	a.stroke();
	a.fill()
};
SGraphics.drawCross = function(a, b, c, d, e, f) {
	a.beginPath();
	a.strokeStyle = "undefined" === typeof e ? Common.COLOR_GREEN: e;
	a.lineWidth = "undefined" === typeof f ? 1 : f;
	a.moveTo(b - d, c - d);
	a.lineTo(b + d, c + d);
	a.moveTo(b - d, c + d);
	a.lineTo(b + d, c - d);
	a.stroke();
	a.closePath()
};
SGraphics.drawArrow = function(a, b, c, d, e, f, g, h) {
	a.beginPath();
	a.strokeStyle = "undefined" === typeof f ? Common.COLOR_YELLOW: f;
	a.lineWidth = "undefined" === typeof h ? 1 : h;
	"undefined" === typeof g && (g = 5);
	a.moveTo(b, c);
	a.lineTo(d, e);
	b = new SVector3(d - b, e - c);
	b.normalize();
	a.lineTo(d - g * (b.x + b.y), e - g * (b.y - b.x));
	a.moveTo(d, e);
	a.lineTo(d - g * (b.x - b.y), e - g * (b.y + b.x));
	a.stroke();
	a.closePath()
};
SGraphics.drawPath = function(a, b, c, d) {
	var e = b.length;
	if (! (3 > e)) {
		a.beginPath();
		a.moveTo(b[0][0], b[0][1]);
		for (var f = 1; f < e - 2; ++f) a.quadraticCurveTo(b[f][0], b[f][1], (b[f][0] + b[f + 1][0]) / 2, (b[f][1] + b[f + 1][1]) / 2);
		a.quadraticCurveTo(b[f][0], b[f][1], b[f + 1][0], b[f + 1][1]);
		a.strokeStyle = "undefined" === typeof c ? Common.COLOR_RED: c;
		a.lineWidth = "undefined" === typeof d ? 1 : d;
		a.stroke();
		a.closePath()
	}
};
SGraphics.drawQuad = function(a, b, c, d, e, f, g) {
	a.strokeStyle = "undefined" === typeof f ? Common.COLOR_BLUE: f;
	a.lineWidth = "undefined" === typeof g ? 1 : g;
	a.strokeRect(b, c, d, e)
};
function TouchControl() {
	this.onActiveAction = null;
	this.m_currentTime = 0;
	this.m_lock = !1;
	this.m_lastId = this.m_counterTouch = 0;
	this.m_maxTouch = 2;
	this.m_timeReset = 400;
	this.playerTarget = null
}
TouchControl.prototype.update = function(a) {
	this.m_currentTime += a;
	this.m_currentTime > this.m_timeReset && (this.m_counterTouch = this.m_currentTime = 0)
};
TouchControl.prototype.sense = function(a) {
	if (!this.m_lock) {
		this.m_counterTouch++;
		this.m_lock = !0;
		this.m_currentTime = 0;
		if (this.m_counterTouch >= this.m_maxTouch) if (this.m_lastId == a) {
			if (this.onActiveAction && this.playerTarget) this.playerTarget[this.onActiveAction]();
			this.m_counterTouch = 0
		} else this.m_counterTouch = 1;
		this.m_lastId = a
	}
};
TouchControl.prototype.unlock = function() {
	this.m_lock = !1
};
TouchControl.prototype.reset = function() {
	this.m_counterTouch = this.m_currentTime = 0
};
function SInterval(a, b, c, d, e, f, g) {
	"undefined" === typeof d && (d = 1);
	"undefined" === typeof f && (f = !1);
	this.m_timeElapsed = 0;
	this.m_timeToTrigger = c;
	this.m_initLoops = this.m_loop = d;
	this.m_stopped = f;
	this.m_isOver = !1;
	this.m_caller = a;
	this.m_params = e;
	this.m_onEndCallback = b;
	this.m_onLoopCallback = g
}
SInterval.prototype.reset = function(a) {
	a = "undefined" === typeof a ? -1 : a;
	0 < a && (this.m_timeToTrigger = a);
	this.m_timeElapsed = 0;
	this.m_loop = this.m_initLoops;
	this.m_stopped = this.m_isOver = !1
};
SInterval.prototype.stop = function() {
	this.stopped = !0
};
SInterval.prototype.resume = function() {
	this.stopped = !1
};
SInterval.prototype.update = function(a) {
	if (!this.m_stopped && !this.m_isOver && (this.m_timeElapsed += a, this.m_timeElapsed >= this.m_timeToTrigger)) if (this.m_timeElapsed = 0, this.m_loop -= 1, 0 >= this.m_loop) {
		if (this.m_isOver = !0, this.m_onEndCallback) if (this.m_params) this.m_caller[this.m_onEndCallback](this.m_params);
		else this.m_caller[this.m_onEndCallback]()
	} else if (this.m_onLoopCallback) if (this.m_params) this.m_caller[this.m_onLoopCallback](this.m_params);
	else this.m_caller[this.m_onLoopCallback]()
};
SInterval.prototype.free = function() {
	this.m_caller = null
};
function SPoint(a, b) {
	this.x = "undefined" === typeof a ? 0 : a;
	this.y = "undefined" === typeof b ? 0 : b
}
SPoint.prototype.distanceTo = function(a, b) {
	return Math.sqrt((a - this.x) * (a - this.x) + (b - this.y) * (b - this.y))
};
function SVector3(a, b, c) {
	this.x = "undefined" === typeof a ? 0 : a;
	this.y = "undefined" === typeof b ? 0 : b;
	this.z = "undefined" === typeof c ? 0 : c
}
SVector3.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
};
SVector3.prototype.normalize = function() {
	var a = this.x * this.x + this.y * this.y + this.z * this.z;
	0 < a && (a = Math.sqrt(a), this.x /= a, this.y /= a, this.z /= a);
	return this
};
SVector3.prototype.product = function(a) {
	return new SVector3(this.y * a.z - this.z * a.y, -(this.x * a.z - this.z * a.x), this.y * a.x - this.x * a.y)
};
function Movement(a, b, c, d, e) {
	this.m_targetY = this.m_targetX = this.m_oldState = 0;
	this.m_isReversible = this.m_isLoop = !0;
	this.m_typeMovement = 0;
	this.m_isAwaitingDelete = !1;
	this.m_cycleCallback = this.m_endCallback = null;
	this.m_x = a;
	this.m_y = b;
	this.m_state = Movement.ST_INIT;
	this.m_typeMovement = Movement.TYPE_DEFAULT;
	this.m_isLoop = "undefined" === typeof d ? !1 : d;
	this.m_isReversible = "undefined" === typeof e ? !1 : e;
	this.m_speed = 0;
	this.setSpeed(c);
	this.targetActor = null
}
Movement.prototype.x = function() {
	return this.m_x
};
Movement.prototype.y = function() {
	return this.m_y
};
Movement.prototype.speed = function() {
	return this.m_speed
};
Movement.prototype.type = function() {
	return this.m_typeMovement
};
Movement.prototype.targetX = function() {
	return this.m_targetX
};
Movement.prototype.targetY = function() {
	return this.m_targetY
};
Movement.prototype.isAwaitingDelete = function() {
	return this.m_isAwaitingDelete
};
Movement.prototype.isPaused = function() {
	return this.m_state == Movement.ST_PAUSED
};
Movement.prototype.set_endCallback = function(a) {
	return this.m_endCallback = a
};
Movement.prototype.set_cycleCallback = function(a) {
	return this.m_cycleCallback = a
};
Movement.prototype.setSpeed = function(a) {
	a > Movement.MIN_SPEED ? this.m_speed = a: (Application.error("setSpeed: " + a), this.m_speed = Movement.DEFAULT_SPEED)
};
Movement.prototype.resetPosition = function(a, b) {
	return this.m_state != Movement.ST_MOVEMENT && this.m_state != Movement.ST_PAUSED ? (this.m_x = a, this.m_y = b, !0) : !1
};
Movement.prototype.setPause = function(a) {
	a ? this.m_state == Movement.ST_MOVEMENT && (this.m_oldState = this.m_state, this.m_state = Movement.ST_PAUSED) : this.m_state = this.m_oldState
};
Movement.prototype.cancelMotion = function() {
	this.m_state = Movement.ST_END
};
Movement.prototype.setAwaitingToDelete = function(a) {
	if (this.m_isAwaitingDelete = a) this.m_state = Movement.ST_INDEF
};
Movement.prototype.onEndMovement = function() {
	this.m_state = Movement.ST_END;
	if (this.targetActor && this.m_endCallback) this.targetActor[this.m_endCallback](this)
};
Movement.prototype.onCycleEnd = function() {
	if (this.targetActor && this.m_cycleCallback) this.targetActor[this.m_cycleCallback](this)
};
Movement.prototype.update = function(a) {};
Movement.prototype.free = function() {
	this.targetActor = this.m_cycleCallback = this.m_endCallback = null
};
Movement.TYPE_DEFAULT = 0;
Movement.TYPE_CIRCLE = 1;
Movement.TYPE_LINEAR = 2;
Movement.MIN_SPEED = 1E-5;
Movement.DEFAULT_SPEED = 1;
Movement.ST_INDEF = -1;
Movement.ST_INIT = 0;
Movement.ST_MOVEMENT = 1;
Movement.ST_PAUSED = 2;
Movement.ST_END = 3;
function LinearMovement(a, b, c, d, e) {
	this.m_endPointY = this.m_endPointX = this.m_initY = this.m_initX = this.m_vy = this.m_vx = this.m_angle = 0;
	this.m_toFront = !0;
	this.m_motionLimit = null;
	Movement.call(this, a, b, c, "undefined" === typeof d ? !1 : d, "undefined" === typeof e ? !1 : e);
	this.m_motionLimit = new Rectangle;
	this.m_typeMovement = Movement.TYPE_LINEAR;
	this.m_initX = this.m_x;
	this.m_initY = this.m_y
}
goog.inherits(LinearMovement, Movement);
LinearMovement.prototype.angle = function() {
	return this.m_angle
};
LinearMovement.prototype.getLinearVelocityX = function() {
	return this.m_vx
};
LinearMovement.prototype.getLinearVelocityY = function() {
	return this.m_vy
};
LinearMovement.prototype.resetPosition = function(a, b) {
	return LinearMovement.superClass_.resetPosition.call(this, a, b) ? (this.m_initX = a, this.m_initY = b, !0) : !1
};
LinearMovement.prototype.settingMotionLimit = function(a, b, c, d) {
	this.m_motionLimit.x = 0 <= c ? a: a + c;
	this.m_motionLimit.y = 0 <= d ? b: b + d;
	this.m_motionLimit.w = 0 <= c ? c: -c;
	this.m_motionLimit.h = 0 <= d ? d: -d
};
LinearMovement.prototype.gotoPosition = function(a, b, c) {
	c = "undefined" !== typeof c ? c: 0;
	this.m_endPointX = this.m_targetX = a;
	this.m_endPointY = this.m_targetY = b;
	a -= this.m_x;
	b -= this.m_y;
	if (0 == a && 0 == b) this.onEndMovement();
	else this.settingMotionLimit(this.m_x, this.m_y, a, b),
	0 < c && (this.m_speed = c),
	c = Math.sqrt(a * a + b * b),
	this.m_vx = this.m_speed * (a / c),
	this.m_vy = this.m_speed * (b / c),
	this.m_angle = Math.atan2(b, a),
	this.m_state = Movement.ST_MOVEMENT
};
LinearMovement.prototype.gotoRadialPoint = function(a, b, c) {
	c = "undefined" !== typeof c ? c: 0;
	0 > a && (Application.error("gotoPosition2: dist " + a), a *= -1);
	if (0 == a) this.onEndMovement();
	else {
		this.m_angle = b;
		b = a * Math.cos(this.m_angle);
		var d = a * Math.sin(this.m_angle);
		this.settingMotionLimit(this.m_x, this.m_y, b, d);
		0 < c && (this.m_speed = c);
		this.m_vx = this.m_speed * (b / a);
		this.m_vy = this.m_speed * (d / a);
		this.m_endPointX = this.m_targetX = this.m_x + b;
		this.m_endPointY = this.m_targetY = this.m_y + d;
		this.m_state = Movement.ST_MOVEMENT
	}
};
LinearMovement.prototype.simulateUpdate = function(a) {
	var b = null;
	this.m_state == Movement.ST_MOVEMENT && (b = new Vector2D(this.m_vx * a, this.m_vy * a));
	return b
};
LinearMovement.prototype.update = function(a) {
	if (this.m_state == Movement.ST_MOVEMENT && (this.m_x += this.m_vx * a, this.m_y += this.m_vy * a, this.m_x < this.m_motionLimit.left() || this.m_x > this.m_motionLimit.right() || this.m_y < this.m_motionLimit.top() || this.m_y > this.m_motionLimit.bottom())) if (this.m_x = this.m_endPointX, this.m_y = this.m_endPointY, this.m_isLoop) this.m_isReversible ? (this.m_toFront ? (this.m_endPointX = this.m_initX, this.m_endPointY = this.m_initY) : (this.m_endPointX = this.m_targetX, this.m_endPointY = this.m_targetY), this.m_toFront = !this.m_toFront, this.m_vx *= -1, this.m_vy *= -1) : (this.m_x = this.m_initX, this.m_y = this.m_initY),
	this.onCycleEnd();
	else this.onEndMovement()
};
LinearMovement.prototype.free = function() {
	LinearMovement.superClass_.free.call(this);
	this.m_motionLimit = null
};
function CircularMovement(a, b, c, d, e) {
	Movement.call(this, a, b, c, "undefined" === typeof d ? !1 : d, "undefined" === typeof e ? !1 : e);
	this.m_currentRadiansDisplaced = this.m_radiansToDisplace = this.m_initRandians = 0;
	this.m_factorDirection = 1;
	this.m_angularSpeed = this.m_radio = this.m_centroidY = this.m_centroidX = this.m_oldY = this.m_oldX = 0;
	this.m_typeMovement = Movement.TYPE_CIRCLE;
	this.m_oldX = this.m_x;
	this.m_oldY = this.m_y
}
goog.inherits(CircularMovement, Movement);
CircularMovement.prototype.startMovement = function(a, b, c) {
	this.m_centroidX = a;
	this.m_centroidY = b;
	a = this.m_x - this.m_centroidX;
	b = -this.m_y + this.m_centroidY;
	this.m_radio = Math.sqrt(a * a + b * b);
	if (1 >= this.m_radio) Application.error("CircularMovement::startMovement() - Radio very small: " + this.m_radio),
	this.onEndMovement();
	else if (this.m_factorDirection = 0 > c ? -1 : 1, 0 == c) this.onEndMovement();
	else 0 > c && (c *= -1),
	this.m_initRandians = Math.atan2(b, a),
	this.m_radiansToDisplace = Math.PI * (c / 180),
	this.m_currentRadiansDisplaced = 0,
	this.m_angularSpeed = this.m_radiansToDisplace / (2 * Math.PI * this.m_radio * (c / 360) / this.m_speed),
	c = this.m_initRandians + this.m_radiansToDisplace * this.m_factorDirection,
	this.m_targetX = this.m_centroidX + this.m_radio * Math.cos(c),
	this.m_targetY = this.m_centroidY - this.m_radio * Math.sin(c),
	this.m_state = Movement.ST_MOVEMENT
};
CircularMovement.prototype.startMovement2 = function(a, b, c) {
	this.m_radio = a;
	if (1 >= this.m_radio) Application.error("CircularMovement::startMovement2() - Radio very small: " + this.m_radio),
	this.onEndMovement();
	else if (this.m_factorDirection = 0 > c ? -1 : 1, 0 == c) this.onEndMovement();
	else 0 > c && (c *= -1),
	this.m_radiansToDisplace = Math.PI * (c / 180),
	this.m_angularSpeed = this.m_radiansToDisplace / (2 * Math.PI * this.m_radio * (c / 360) / this.m_speed),
	this.m_initRandians = Math.PI * (b / 180),
	this.m_currentRadiansDisplaced = 0,
	this.m_centroidX = this.m_x - this.m_radio * Math.cos(this.m_initRandians),
	this.m_centroidY = this.m_y + this.m_radio * Math.sin(this.m_initRandians),
	a = this.m_initRandians + this.m_radiansToDisplace * this.m_factorDirection,
	this.m_targetX = this.m_centroidX + this.m_radio * Math.cos(a),
	this.m_targetY = this.m_centroidY - this.m_radio * Math.sin(a),
	this.m_state = Movement.ST_MOVEMENT
};
CircularMovement.prototype.update = function(a) {
	if (this.m_state == Movement.ST_MOVEMENT && (this.m_currentRadiansDisplaced += this.m_angularSpeed * a, this.m_currentRadiansDisplaced > this.m_radiansToDisplace && (this.m_currentRadiansDisplaced = this.m_radiansToDisplace), a = this.m_initRandians + this.m_currentRadiansDisplaced * this.m_factorDirection, this.m_x = this.m_centroidX + this.m_radio * Math.cos(a), this.m_y = this.m_centroidY - this.m_radio * Math.sin(a), this.m_currentRadiansDisplaced == this.m_radiansToDisplace)) if (this.m_isLoop) this.m_currentRadiansDisplaced = 0,
	this.m_isReversible && (this.m_factorDirection *= -1, this.m_initRandians = a),
	this.onCycleEnd();
	else this.onEndMovement()
};
function MotionController(a, b, c) {
	this.m_currentMovement = this.m_movements = null;
	this.m_currentIndexMovement = 0;
	this.m_isReversible = this.m_isLoop = !1;
	this.m_advanceFactor = 1;
	this.m_motionData = null;
	this.m_speed = this.m_y = this.m_x = 0;
	this.m_endCallback = this.m_cycleCallback = null;
	this.m_x = a;
	this.m_y = b;
	this.m_speed = c.speed;
	this.m_motionData = c;
	this.m_isLoop = this.m_motionData.isLoop;
	this.m_isReversible = this.m_motionData.isReverse;
	this.m_movements = []
}
MotionController.prototype.startMotion = function(a, b) {
	this.m_cycleCallback = a;
	this.m_endCallback = b;
	this.createMovements();
	this.m_currentIndexMovement = -1;
	this.gotoNextMovement()
};
MotionController.CIRCLE_POLAR = "cp";
MotionController.CIRCLE_CARTESIAN = "cc";
MotionController.LINEAR_POLAR = "lp";
MotionController.LINEAR_CARTESIAN = "lc";
MotionController.RELATIVE_LINEAR_CARTESIAN = "rlc";
MotionController.prototype.x = function() {
	return this.m_x
};
MotionController.prototype.y = function() {
	return this.m_y
};
MotionController.prototype.createMovements = function() {
	for (var a = null,
	a = a = null,
	b = this.m_x,
	c = this.m_y,
	d = null,
	e = 0; e < this.m_motionData.motionParams.length;) d = this.m_motionData.motionParams[e],
	d[0] == MotionController.CIRCLE_POLAR ? (a = new CircularMovement(b, c, this.m_speed, this.m_isLoop, this.m_isReversible), a.startMovement2(parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]))) : d[0] == MotionController.CIRCLE_CARTESIAN ? (a = new CircularMovement(b, c, this.m_speed, this.m_isLoop, this.m_isReversible), a.startMovement(parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]))) : d[0] == MotionController.LINEAR_POLAR ? (a = new LinearMovement(b, c, this.m_speed, this.m_isLoop, this.m_isReversible), a.gotoRadialPoint(parseFloat(d[1]), parseFloat(d[2]))) : d[0] == MotionController.LINEAR_CARTESIAN ? (a = new LinearMovement(b, c, this.m_speed, this.m_isLoop, this.m_isReversible), a.gotoPosition(parseFloat(d[1]), parseFloat(d[2]))) : d[0] == MotionController.RELATIVE_LINEAR_CARTESIAN && (a = new LinearMovement(b, c, this.m_speed, this.m_isLoop, this.m_isReversible), a.gotoPosition(parseFloat(d[1]) + b, parseFloat(d[2]) + c)),
	a && (this.m_movements.push(a), a.setPause(!0), a.set_endCallback("onEndMovement"), a.set_cycleCallback("onCycleMovement"), a.targetActor = this, b = a.targetX(), c = a.targetY()),
	++e
};
MotionController.prototype.gotoNextMovement = function() {
	this.m_currentIndexMovement += this.m_advanceFactor;
	0 <= this.m_currentIndexMovement && this.m_currentIndexMovement < this.m_movements.length ? (this.m_currentMovement = this.m_movements[this.m_currentIndexMovement], this.m_currentMovement.setPause(!1)) : this.m_isLoop && (this.m_isReversible ? this.m_advanceFactor *= -1 : this.m_currentIndexMovement = -1, this.gotoNextMovement())
};
MotionController.prototype.update = function(a) {
	this.m_currentMovement && (this.m_currentMovement.update(a), this.m_x = this.m_currentMovement.x(), this.m_y = this.m_currentMovement.y())
};
MotionController.prototype.onEndMovement = function() {
	if (! (this.m_currentIndexMovement < this.m_movements.length - 1) && this.m_endCallback) this[this.m_endCallback]()
};
MotionController.prototype.onCycleMovement = function(a) {
	if (this.m_currentMovement != a) Application.error("MotionController::onCycleMovement()");
	else if (a.setPause(!0), this.gotoNextMovement(), this.m_cycleCallback) this[this.m_cycleCallback]()
};
MotionController.prototype.free = function() {
	this.m_motionData.free();
	this.m_endCallback = this.m_cycleCallback = this.m_currentMovement = this.m_motionData = null;
	for (var a = this.m_movements.length - 1; 0 <= a;) this.m_movements[a].free(),
	this.m_movements[a] = null,
	--a;
	this.m_movements.splice(0, this.m_movements.length);
	this.m_movements = null
};
function PendularMovement(a, b, c, d, e, f, g) {
	this.m_alpha = this.m_angle = 0;
	this.m_x = c;
	this.m_y = d;
	this.m_dy = this.m_dx = this.m_len = 0;
	this.m_gravity = f;
	this.m_time = this.m_w = 0;
	this.m_pivotX = a;
	this.m_pivotY = b;
	this.m_longitudeMax = g;
	this.m_beta = e;
	this.m_velocity = 0;
	this.init()
}
PendularMovement.prototype.getX = function() {
	return this.m_x
};
PendularMovement.prototype.getY = function() {
	return this.m_y
};
PendularMovement.prototype.getAngle = function() {
	return this.m_angle
};
PendularMovement.prototype.getVelocity = function() {
	return this.m_velocity
};
PendularMovement.prototype.getMaxLongitude = function() {
	return this.m_longitudeMax
};
PendularMovement.prototype.init = function() {
	this.m_dx = this.m_x - this.m_pivotX;
	this.m_dy = this.m_y - this.m_pivotY;
	this.m_len = Math.sqrt(this.m_dx * this.m_dx + this.m_dy * this.m_dy);
	this.m_len < PendularMovement.LONGITUDE_MIN && (this.m_len = PendularMovement.LONGITUDE_MIN);
	this.m_angle = Math.atan2(this.m_dx, this.m_dy);
	this.m_alpha = this.m_beta;
	this.m_w = 2 * Math.PI / this.period();
	this.m_time = 180 * (Math.acos(this.m_angle / this.m_alpha) / this.m_w) / Math.PI
};
PendularMovement.prototype.update = function(a) {
	this.m_len += PendularMovement.INCREMENT_LONGITUDE;
	this.m_len > this.m_longitudeMax && (this.m_len = this.m_longitudeMax);
	this.m_w = 2 * Math.PI / this.period();
	this.m_angle = this.m_alpha * Math.cos(this.m_w * this.m_time * Math.PI / 180);
	this.m_velocity = -this.m_w * this.m_alpha * Math.sin(this.m_w * this.m_time * Math.PI / 180);
	this.m_x = this.m_len * Math.sin(this.m_angle) + this.m_pivotX;
	this.m_y = this.m_len * Math.cos(this.m_angle) + this.m_pivotY;
	this.m_time += PendularMovement.DT
};
PendularMovement.prototype.fastPow = function(a, b) {
	if (0 == b) return 1;
	if (0 == b % 2) {
		var c = this.fastPow(a, 0.5 * b);
		return c * c
	}
	return a * this.fastPow(a, b - 1)
};
PendularMovement.prototype.factorial = function(a) {
	for (var b = 1,
	c = 1; c <= a;) b *= c,
	c++;
	return b
};
PendularMovement.prototype.period = function() {
	for (var a = 0,
	b = 0; b <= PendularMovement.N;) a += this.fastPow(this.factorial(2 * b) / this.fastPow(this.fastPow(2, b) * this.factorial(b), 2), 2) * this.fastPow(Math.sin(this.m_alpha / 2), 2 * b),
	b++;
	return 2 * Math.PI * Math.sqrt(this.m_len / this.m_gravity) * a
};
PendularMovement.DT = 4;
PendularMovement.N = 30;
PendularMovement.LONGITUDE_MIN = 50;
PendularMovement.INCREMENT_LONGITUDE = 0.9;
function ParametricParabolicMovement(a, b, c, d, e, f) {
	e = "undefined" === typeof e ? ParametricParabolicMovement.STD_GRAVITY: e;
	f = "undefined" === typeof f ? ParametricParabolicMovement.STD_SPEED: f;
	this.m_ry = this.m_rx = this.m_speed = this.m_vy = this.m_dy = this.m_vx = this.m_dx = this.m_finalTime = this.m_currentTime = this.m_gravity = this.m_finalY = this.m_finalX = this.m_initY = this.m_initX = 0;
	this.m_finish = !1;
	this.m_endCallback = null;
	this.m_currentTime = 0;
	this.m_speed = f;
	this.m_gravity = e;
	this.m_initX = a;
	this.m_initY = b;
	this.m_finalX = c;
	this.m_finalY = d;
	this.m_dx = this.m_finalX - this.m_initX;
	this.m_dy = this.m_finalY - this.m_initY;
	this.m_finalTime = ParametricParabolicMovement.STD_FINAL_TIME;
	this.m_vx = this.m_dx / this.m_finalTime;
	this.m_vy = (this.m_dy - this.m_gravity * this.m_finalTime * this.m_finalTime / 2) / this.m_finalTime;
	this.m_rx = this.m_initX;
	this.m_ry = this.m_initY;
	this.target = null
}
ParametricParabolicMovement.STD_GRAVITY = 0.05;
ParametricParabolicMovement.STD_SPEED = 0.3;
ParametricParabolicMovement.STD_FINAL_TIME = 100;
ParametricParabolicMovement.prototype.free = function() {
	this.target = this.m_endCallback = null
};
ParametricParabolicMovement.prototype.x = function() {
	return this.m_rx
};
ParametricParabolicMovement.prototype.y = function() {
	return this.m_ry
};
ParametricParabolicMovement.prototype.setEndCallback = function(a) {
	this.m_endCallback = a
};
ParametricParabolicMovement.prototype.getEndCallback = function() {
	return this.m_endCallback
};
ParametricParabolicMovement.prototype.update = function(a) {
	this.m_finish || (this.m_rx = Math.floor(this.m_initX + this.m_currentTime * this.m_vx), this.m_ry = Math.floor(this.m_initY + this.m_currentTime * this.m_vy + this.m_gravity * this.m_currentTime * this.m_currentTime / 2));
	if (this.m_currentTime >= this.m_finalTime) {
		if (this.m_currentTime = this.m_finalTime, this.m_finish = !0, this.m_rx = this.m_finalX, this.m_ry = this.m_finalY, this.m_endCallback) this.target[this.m_endCallback](this)
	} else this.m_currentTime += 2 * this.m_speed * a
};
function GeometricUtils() {}
GeometricUtils.intersectLines = function(a, b, c, d) {
	var e = b.minus(a),
	f = b.minus(c),
	g = b.minus(d),
	f = e.product(f),
	e = e.product(g);
	if (0 == f || 0 == e || 0 < f * e) return null;
	g = Math.abs(GeometricUtils.triarea(a, b, c));
	f = Math.abs(GeometricUtils.triarea(a, b, d));
	e = (c.x * f + d.x * g) / (g + f);
	c = (c.y * f + d.y * g) / (g + f);
	return 0 > (a.x - e) * (e - b.x) || 0 > (a.y - c) * (c - b.y) ? null: new Vector2D(e, c)
};
GeometricUtils.intersectLinePolygon = function(a, b, c) {
	for (var d = [], e = 0; e < c.length; e++) {
		var f = GeometricUtils.intersectLines(a, b, c[e], c[(e + 1) % c.length]);
		f && d.push(f)
	}
	return d
};
GeometricUtils.intersectLinePolygon2 = function(a, b, c) {
	for (var d = [], e = [], f = 0; f < c.length; f++) {
		var g = GeometricUtils.intersectLines(a, b, c[f], c[(f + 1) % c.length]);
		g && (d.push(g), e.push(f))
	}
	return {
		points: d,
		index: e
	}
};
GeometricUtils.trap = function(a, b) {
	return 0.5 * (b.x - a.x) * (b.y + a.y)
};
GeometricUtils.triarea = function(a, b, c) {
	return GeometricUtils.trap(a, b) + GeometricUtils.trap(b, c) + GeometricUtils.trap(c, a)
};
function PathFinding(a) {
	this.m_listOpen = [];
	this.m_listClose = [];
	this.m_mapOpen = [];
	this.m_pathMap = a
}
PathFinding.ALLOW_DIAGONAL = !0;
PathFinding.ALLOW_DIAGONAL_CORNERING = !1;
PathFinding.prototype.getPath = function(a, b, c, d, e) {
	this.m_listOpen = [];
	this.m_listClose = [];
	this.m_mapOpen = [];
	return this.getPathPrivate(this.m_pathMap, a, b, c, d, e)
};
PathFinding.prototype.getPathPrivate = function(a, b, c, d, e, f) {
	var g = this.getSelectOpen(b, c);
	this.addOpenList(g);
	for (var h = a[0].length, k = a.length, l, m, n, p, v, w, x, r; 0 < this.m_listOpen.length && !this.isInCloseListById(d, e);) {
		n = g.i - 1;
		v = g.i + 2;
		w = g.j - 1;
		for (x = g.j + 2; n < v; n++) for (p = w; p < x; p++) n < k && -1 < n && p < h && -1 < p && !this.isInCloseListById(n, p) && (PathFinding.ALLOW_DIAGONAL || n === g.i || p === g.j) && (PathFinding.ALLOW_DIAGONAL_CORNERING || n === g.i || p === g.j || a[n][g.j] == f && a[g.i][p] === f) && a[n][p] === f && (m = this.isInOpenList(n, p), l = n == g.i || p == g.j ? 10 : 14, l = g.g + l, null === m ? (r = new clsNode(g, n, p), m = 10 * (Math.abs(n - d) + Math.abs(p - e)), r.g = l, r.h = m, r.f = l + m, this.addOpenList(r)) : l < m.g && (m.g = l, m.f = m.h + m.g, m.parent = g));
		this.removeOpenList(g);
		this.addCloseList(g);
		g = this.getSelectOpen(b, c)
	}
	a = null;
	if (this.isInCloseListById(d, e)) {
		a = [];
		d = null;
		for (d = this.m_listClose[this.m_listClose.length - 1]; null !== d;) a.push(d),
		d = d.parent;
		a = a.reverse()
	}
	return a
};
PathFinding.prototype.getSelectOpen = function(a, b) {
	var c = null,
	d = this.m_listOpen.length;
	if (0 < d) for (var c = this.m_listOpen[d - 1], e, f = 0; f < d; f++) e = this.m_listOpen[f],
	e.f < c.f && (c = e);
	else c = new clsNode(null, a, b);
	return c
};
PathFinding.prototype.isInCloseListById = function(a, b) {
	return "undefined" !== typeof this.m_mapOpen[a] && null !== this.m_mapOpen[a] && "undefined" !== typeof this.m_mapOpen[a][b] && null !== this.m_mapOpen[a][b] ? this.m_mapOpen[a][b].isClose: !1
};
PathFinding.prototype.isInCloseList = function(a) {
	return a.isClose
};
PathFinding.prototype.addCloseList = function(a) {
	a.isClose = !0;
	this.m_listClose.push(a)
};
PathFinding.prototype.isInOpenList = function(a, b) {
	return "undefined" !== typeof this.m_mapOpen[a] && null !== this.m_mapOpen[a] && "undefined" !== typeof this.m_mapOpen[a][b] && null !== this.m_mapOpen[a][b] ? this.m_mapOpen[a][b] : null
};
PathFinding.prototype.removeOpenList = function(a) {
	var b = this.m_listOpen.indexOf(a); - 1 < b && this.m_listOpen.splice(b, 1);
	a.isOpen = !1
};
PathFinding.prototype.addOpenList = function(a) {
	a.isOpen = !0;
	this.m_listOpen.push(a);
	this.m_mapOpen[a.i] || (this.m_mapOpen[a.i] = []);
	this.m_mapOpen[a.i][a.j] = a
};
function clsNode(a, b, c) {
	this.f = this.h = this.g = 0;
	this.i = b;
	this.j = c;
	this.isClose = this.isOpen = !1;
	this.parent = a
}
function JumpControl(a, b) {
	this.onMaxHeightReachedCallback = this.onCompleteJumpCallback = this.targetCallback = null;
	this.m_gravity = "undefined" !== typeof b ? b: 9.8;
	this.m_factorGravity = 1;
	this.m_vo = "undefined" !== typeof a ? a: -45;
	this.m_time = this.m_nextZ = this.m_z = 0;
	this.m_isPaused = this.m_isJump = !1;
	this.m_checkMaxHeight = !0;
	this.m_initVelocity = this.m_vo;
	this.m_initPosition = 0
}
JumpControl.prototype.cancel = function() {
	this.m_isJump = !1;
	this.m_z = this.m_vo = this.m_time = this.m_initPosition = 0
};
JumpControl.prototype.getCurrentHeight = function() {
	return this.m_z
};
JumpControl.prototype.getElapseTime = function() {
	return this.m_time
};
JumpControl.prototype.getGravity = function() {
	return this.m_gravity
};
JumpControl.prototype.setGravity = function(a) {
	this.m_gravity = a
};
JumpControl.prototype.getIsJump = function() {
	return this.m_isJump
};
JumpControl.prototype.getFactorGravity = function() {
	return this.m_factorGravity
};
JumpControl.prototype.setFactorGravity = function(a) {
	this.m_factorGravity = a
};
JumpControl.prototype.getPaused = function() {
	return this.m_isPaused
};
JumpControl.prototype.setPaused = function(a) {
	this.m_isPaused = a
};
JumpControl.prototype.init = function(a) {
	this.m_nextZ = this.m_z = "undefined" !== typeof a ? a: 0;
	this.m_time = 0;
	this.m_checkMaxHeight = this.m_isJump = !0
};
JumpControl.prototype.getInitVelocity = function() {
	return this.m_vo
};
JumpControl.prototype.setInitVelocity = function(a) {
	this.m_initVelocity = this.m_vo = a
};
JumpControl.prototype.applyForceY = function(a) {
	if (!this.m_isJump) return ! 1;
	this.m_initPosition = this.m_nextZ;
	this.m_vo = a;
	this.m_time = 0;
	return ! 0
};
JumpControl.prototype.applyImpulse = function(a) {
	this.m_initPosition = this.m_z;
	this.m_vo = a;
	this.m_time = 0;
	this.m_isJump = !0
};
JumpControl.prototype.completeJump = function() {
	this.m_vo = this.m_initVelocity;
	this.m_z = this.m_initPosition = 0;
	this.m_isJump = !1;
	if (this.targetCallback && this.onCompleteJumpCallback) this.targetCallback[this.onCompleteJumpCallback](this)
};
JumpControl.prototype.update = function(a) {
	if (!this.m_isPaused && this.m_isJump) if (this.m_time += 0.011 * a, this.m_nextZ = this.m_vo * this.m_time + 0.5 * this.m_gravity * this.m_factorGravity * this.m_time * this.m_time + this.m_initPosition, 0 >= this.m_nextZ) {
		if (this.m_checkMaxHeight && this.m_nextZ > this.m_z && (this.m_checkMaxHeight = !1, this.targetCallback && this.onMaxHeightReachedCallback)) this.targetCallback[this.onMaxHeightReachedCallback](this);
		this.m_z = this.m_nextZ
	} else this.completeJump()
};
JumpControl.prototype.free = function(a) {
	this.onMaxHeightReachedCallback = this.onCompleteJumpCallback = null
};
function Displace(a, b) {
	this.position = new Vector2D(a, b);
	this.angle = this.speedFactor = this.speedMagnitude = this.accelerationMagnitude = 0;
	this.targetCallback = this.onEndDisplaceCallback = null;
	this.m_timeElapse = 0;
	this.m_positionStart = this.position.clone();
	this.m_acceleration = new Vector2D(0, 0);
	this.m_speedInitial = new Vector2D(0, 0);
	this.m_totalDisplacement = 0;
	this.m_onMove = !1
}
Displace.prototype.currentSpeed = function() {
	var a = new Vector2D(0, 0);
	a.x = this.m_speedInitial.x * this.speedFactor + this.m_acceleration.x * this.m_timeElapse;
	a.y = this.m_speedInitial.y * this.speedFactor + this.m_acceleration.y * this.m_timeElapse;
	return a.length()
};
Displace.prototype.toLeft = function() {
	for (var a = this.angle,
	a = a * (180 / Math.PI); 0 > a;) a += 360;
	a %= 360;
	return 90 < a && 270 > a
};
Displace.prototype.x = function() {
	return this.position.x
};
Displace.prototype.y = function() {
	return this.position.y
};
Displace.prototype.resetPosition = function(a, b) {
	this.position.x = a;
	this.position.y = b
};
Displace.prototype.updateSpeed = function(a) {
	this.speedMagnitude = a;
	this.m_speedInitial.setVector(this.speedMagnitude, this.angle)
};
Displace.prototype.updateAcceleration = function(a) {
	this.accelerationMagnitude = a;
	this.m_acceleration.setVector(this.accelerationMagnitude, this.angle)
};
Displace.prototype.cancel = function() {
	this.m_positionStart = this.position.clone();
	this.m_speedInitial.x = 0;
	this.m_speedInitial.y = 0;
	this.m_acceleration.x = 0;
	this.m_timeElapse = this.m_acceleration.y = 0;
	this.speedFactor = 1
};
Displace.prototype.gotoPosition = function(a, b, c, d, e) {
	this.accelerationMagnitude = "undefined" === typeof d ? 0 : d;
	this.speedMagnitude = "undefined" === typeof c ? 0 : c;
	this.speedFactor = "undefined" === typeof e ? 1 : e;
	this.m_timeElapse = 0;
	this.m_positionStart = this.position.clone();
	a = new Vector2D(a, b);
	this.angle = a.minus(this.m_positionStart).angle();
	this.m_speedInitial.setVector(this.speedMagnitude, this.angle);
	this.m_acceleration.setVector(this.accelerationMagnitude, this.angle);
	this.m_totalDisplacement = a.minus(this.m_positionStart).length();
	this.m_onMove = !0
};
Displace.prototype.gotoDirection = function(a, b, c, d, e) {
	this.accelerationMagnitude = "undefined" === typeof d ? 0 : d;
	this.speedMagnitude = "undefined" === typeof c ? 0 : c;
	this.speedFactor = "undefined" === typeof e ? 1 : e;
	this.angle = b;
	this.m_timeElapse = 0;
	this.m_positionStart = this.position.clone();
	this.m_speedInitial.setVector(this.speedMagnitude, this.angle);
	this.m_acceleration.setVector(this.accelerationMagnitude, this.angle);
	this.m_totalDisplacement = a;
	this.m_onMove = !0
};
Displace.prototype.estimatePositionAfterTime = function(a) {
	a *= 0.001;
	var b = new Point(0, 0);
	b.x = this.position.x + this.m_speedInitial.x * a * this.speedFactor + 0.5 * this.m_acceleration.x * a * a;
	b.y = this.position.y + this.m_speedInitial.y * a * this.speedFactor + 0.5 * this.m_acceleration.y * a * a;
	return b
};
Displace.prototype.onBounce = function(a) {
	var b = 0;
	a == Displace.DIR_LEFT && (b = 180);
	this.m_timeElapse = 0;
	this.m_positionStart = this.position.clone();
	this.angle = (b + Common.random( - Displace.BOUNCE_ANGLE_VAR, Displace.BOUNCE_ANGLE_VAR)) * (Math.PI / 180);
	this.m_speedInitial.setVector(this.speedMagnitude * Displace.ENERGY_AFTER_BOUNCE, this.angle);
	this.m_acceleration.setVector(this.accelerationMagnitude, this.angle)
};
Displace.prototype.update = function(a) {
	if (!1 != this.m_onMove && (this.m_timeElapse += 0.001 * a, this.position.x = this.m_positionStart.x + this.m_speedInitial.x * this.m_timeElapse * this.speedFactor + 0.5 * this.m_acceleration.x * this.m_timeElapse * this.m_timeElapse, this.position.y = this.m_positionStart.y + this.m_speedInitial.y * this.m_timeElapse * this.speedFactor + 0.5 * this.m_acceleration.y * this.m_timeElapse * this.m_timeElapse, a = new Vector2D(0, 0), a.x = this.m_speedInitial.x * this.speedFactor + this.m_acceleration.x * this.m_timeElapse, a.y = this.m_speedInitial.y * this.speedFactor + this.m_acceleration.y * this.m_timeElapse, this.m_positionStart.minus(this.position).length() >= this.m_totalDisplacement || Math.abs(a.x) < Displace.NO_SPEED_VALUE && Math.abs(a.y) < Displace.NO_SPEED_VALUE)) {
		if (this.onEndDisplaceCallback && this.targetCallback) this.targetCallback[this.onEndDisplaceCallback]();
		this.m_onMove = !1
	}
};
Displace.prototype.free = function() {
	this.m_speedInitial = this.m_acceleration = this.m_positionOrigin = this.position = null
};
Displace.BOUNCE_ANGLE_VAR = 15;
Displace.ENERGY_AFTER_BOUNCE = 0.6;
Displace.NO_SPEED_VALUE = 5;
Displace.DIR_LEFT = -1;
function BaseControl(a, b, c, d, e) {
	this.m_canvas = a;
	this.x = b;
	this.y = c;
	this.m_clip = Application.instance.getClip(d);
	this.m_clip.setX(b);
	this.m_clip.setY(c);
	this.parent = a;
	this.parent.addChild(this.m_clip.sprite);
	this.m_clip.parent = this.parent;
	this.name = e;
	this.id = -1;
	this.target = null;
	this.m_eventsEnabled = !0;
	this.m_isSelected = !1;
	this.m_isVisible = !0;
	this.m_state = -1
}
BaseControl.STATE_NORMAL = 1;
BaseControl.STATE_OVER = 2;
BaseControl.STATE_DOWN = 3;
BaseControl.STATE_DISABLED = 4;
BaseControl.STATE_SELECTED = 5;
BaseControl.prototype.setSelected = function(a) {
	this.m_isSelected = a
};
BaseControl.prototype.isSelected = function() {
	return this.m_isSelected
};
BaseControl.prototype.setEventsEnabled = function(a) {
	this.m_eventsEnabled = a
};
BaseControl.prototype.isEventsEnabled = function() {
	return this.m_eventsEnabled
};
BaseControl.prototype.setVisible = function(a) {
	this.m_isVisible !== a && (this.m_isVisible = a, this.m_clip.setVisible(this.m_isVisible))
};
BaseControl.prototype.isVisible = function() {
	return this.m_isVisible
};
BaseControl.prototype.update = function(a) {};
function Button(a, b, c, d, e) {
	BaseControl.call(this, a, b, c, d, e);
	this.moveCallback = this.downCallback = this.upCallback = null;
	ControlTouch.instance.buttons.push(this)
}
goog.inherits(Button, BaseControl);
Button.prototype.free = function() {
	this.parent.removeChild(this.m_clip.sprite);
	this.m_clip.free();
	this.parent = this.m_clip = null;
	ControlTouch.instance.buttons.splice(ControlTouch.instance.buttons.indexOf(this), 1)
};
Button.prototype.setDownCallback = function(a, b) {
	this.target = a;
	this.downCallback = b
};
Button.prototype.setUpCallback = function(a, b) {
	this.target = a;
	this.upCallback = b
};
Button.prototype.onTouchStart = function(a) {
	if ( - 1 === this.id) {
		for (var b = 0; b < ControlTouch.instance.touches.length; b++) if (ControlTouch.instance.touches[b].identifier == a.identifier) return ! 1;
		if (this.m_clip.getBounds().intersectPoint(a.x - this.m_clip.x, a.y - this.m_clip.y)) return this.id = a.identifier,
		this.target[this.downCallback](this.name),
		ControlTouch.instance.touches.push(a),
		!0
	}
	return ! 1
};
Button.prototype.onTouchMove = function(a) {
	return ! 1
};
Button.prototype.onTouchEnd = function(a) {
	return this.id == a.identifier ? (this.id = -1, this.target[this.upCallback](this.name), ControlTouch.instance.touches.splice(ControlTouch.instance.touches.indexOf(a), 1), !0) : !1
};
Button.prototype.onMouseDown = function(a) {
	return this.m_clip.getBounds().intersectPoint(a.offsetX - this.m_clip.x, a.offsetY - this.m_clip.y) ? (this.id = -1, this.target[this.downCallback](this.name), !0) : !1
};
Button.prototype.onMouseMove = function(a) {
	return this.m_clip.getBounds().intersectPoint(a.offsetX - this.m_clip.x, a.offsetY - this.m_clip.y) ? (this.id = -1, !0) : !1
};
Button.prototype.onMouseUp = function(a) {
	return this.m_clip.getBounds().intersectPoint(a.offsetX - this.m_clip.x, a.offsetY - this.m_clip.y) ? (this.id = -1, this.target[this.upCallback](this.name), !0) : !1
};
function DraggableControl(a, b, c, d, e) {
	BaseControl.call(this, a, b, c, d, e);
	this.offsetY = this.offsetX = 0;
	ControlTouch.instance.draggableObjects.push(this)
}
goog.inherits(DraggableControl, BaseControl);
DraggableControl.prototype.free = function() {
	this.parent.removeChild(this.m_clip.sprite);
	this.m_clip.free();
	this.parent = this.m_clip = null;
	ControlTouch.instance.draggableObjects.splice(ControlTouch.instance.draggableObjects.indexOf(this), 1)
};
DraggableControl.prototype.onTouchStart = function(a) {
	if ( - 1 === this.id) {
		for (var b = 0; b < ControlTouch.instance.touches.length; b++) if (ControlTouch.instance.touches[b].identifier == a.identifier) return ! 1;
		if (this.m_clip.getBounds().intersectPoint(a.x - this.m_clip.x, a.y - this.m_clip.y)) return this.id = a.identifier,
		this.m_clip.setScale(0.8, 0.8),
		ControlTouch.instance.touches.push(a),
		this.offsetX = this.m_clip.x - a.x,
		this.offsetY = this.m_clip.y - a.y,
		!0
	}
	return ! 1
};
DraggableControl.prototype.onTouchMove = function(a) {
	this.id === a.identifier && (this.m_clip.setX(this.offsetX + a.x), this.m_clip.setY(this.offsetY + a.y))
};
DraggableControl.prototype.onTouchEnd = function(a) {
	this.id === a.identifier && this.m_clip.getBounds().intersectPoint(a.x - this.m_clip.x, a.y - this.m_clip.y) && (this.id = -1, this.m_clip.setScale(1, 1), ControlTouch.instance.touches.splice(ControlTouch.instance.touches.indexOf(a), 1))
};
DraggableControl.prototype.onMouseMove = function(a) {
	this.m_isSelected && (this.m_clip.setX(this.offsetX + a.offsetX), this.m_clip.setY(this.offsetY + a.offsetY))
};
DraggableControl.prototype.onMouseUp = function(a) {
	this.m_clip.getBounds().intersectPoint(a.offsetX - this.m_clip.x, a.offsetY - this.m_clip.y) && (this.m_clip.setScale(1, 1), this.setSelected(!1))
};
DraggableControl.prototype.onMouseDown = function(a) {
	return this.m_clip.getBounds().intersectPoint(a.offsetX - this.m_clip.x, a.offsetY - this.m_clip.y) ? (this.m_clip.setScale(0.8, 0.8), this.offsetX = this.m_clip.x - a.offsetX, this.offsetY = this.m_clip.y - a.offsetY, this.setSelected(!0), !0) : !1
};
function SwipeControl(a, b, c) {
	this.id = -1;
	this.m_actionZone = null;
	this.target = a;
	this.callback = b;
	this.m_actionZone = "undefined" !== typeof c && c ? new Rectangle(0, 0, 750, 500) : this.target.clip().getBounds();
	ControlTouch.instance.swipeObjects.push(this)
}
SwipeControl.LEFT = 1;
SwipeControl.RIGHT = 16;
SwipeControl.UP = 256;
SwipeControl.DOWN = 4096;
SwipeControl.prototype.onTouchStart = function(a) {
	if ( - 1 === this.id) {
		for (var b = 0; b < ControlTouch.instance.touches.length; b++) if (ControlTouch.instance.touches[b].identifier == a.identifier) return ! 1;
		if (this.m_actionZone.intersectPoint(a.x - this.m_actionZone.x, a.y - this.m_actionZone.y)) return this.id = a.identifier,
		this.delta = Date.now(),
		this.m_initX = a.x,
		this.m_initY = a.y,
		ControlTouch.instance.touches.push(a),
		!0
	}
	return ! 1
};
SwipeControl.prototype.onTouchEnd = function(a) {
	if (this.id === a.identifier) {
		this.id = -1;
		this.delta = Date.now() - this.delta;
		if (200 > this.delta) {
			var b = a.x - this.m_initX,
			c = a.y - this.m_initY,
			d = Math.atan2(c, b),
			d = 180 * d / Math.PI;
			10 < b * b + c * c && (0 < d && 22.5 >= d ? this.swipe(SwipeControl.RIGHT) : 22.5 < d && 67.5 >= d ? this.swipe(SwipeControl.RIGHT | SwipeControl.DOWN) : 67.5 < d && 112.5 >= d ? this.swipe(SwipeControl.DOWN) : 112.5 < d && 157.5 >= d ? this.swipe(SwipeControl.LEFT | SwipeControl.DOWN) : 157.5 < d && 180 >= d ? this.swipe(SwipeControl.LEFT) : -180 < d && -157.5 >= d ? this.swipe(SwipeControl.LEFT) : -157.5 < d && -112.5 >= d ? this.swipe(SwipeControl.LEFT | SwipeControl.UP) : -112.5 < d && -67.5 >= d ? this.swipe(SwipeControl.UP) : -67.5 < d && -22.5 >= d ? this.swipe(SwipeControl.RIGHT | SwipeControl.UP) : -22.5 < d && 0 >= d && this.swipe(SwipeControl.RIGHT))
		}
		ControlTouch.instance.touches.splice(ControlTouch.instance.touches.indexOf(a), 1);
		this.delta = this.m_initY = this.m_initX = 0
	}
};
SwipeControl.prototype.onMouseUp = function(a) {
	this.delta = Date.now() - this.delta;
	if (200 > this.delta) {
		var b = a.offsetX - this.m_initX;
		a = a.offsetY - this.m_initY;
		var c = Math.atan2(a, b),
		c = 180 * c / Math.PI;
		10 < b * b + a * a && (0 < c && 22.5 >= c ? this.swipe(SwipeControl.RIGHT) : 22.5 < c && 67.5 >= c ? this.swipe(SwipeControl.RIGHT | SwipeControl.DOWN) : 67.5 < c && 112.5 >= c ? this.swipe(SwipeControl.DOWN) : 112.5 < c && 157.5 >= c ? this.swipe(SwipeControl.LEFT | SwipeControl.DOWN) : 157.5 < c && 180 >= c ? this.swipe(SwipeControl.LEFT) : -180 < c && -157.5 >= c ? this.swipe(SwipeControl.LEFT) : -157.5 < c && -112.5 >= c ? this.swipe(SwipeControl.LEFT | SwipeControl.UP) : -112.5 < c && -67.5 >= c ? this.swipe(SwipeControl.UP) : -67.5 < c && -22.5 >= c ? this.swipe(SwipeControl.RIGHT | SwipeControl.UP) : -22.5 < c && 0 >= c && this.swipe(SwipeControl.RIGHT))
	}
	this.delta = this.m_initY = this.m_initX = 0
};
SwipeControl.prototype.swipe = function(a) {
	Application.log(a);
	this.target[this.callback](a)
};
SwipeControl.prototype.update = function(a) {
	this.target.update(a)
};
SwipeControl.prototype.onMouseDown = function(a) {
	return this.m_actionZone.intersectPoint(a.offsetX - this.m_actionZone.x, a.offsetY - this.m_actionZone.y) ? (this.delta = Date.now(), this.m_initX = a.offsetX, this.m_initY = a.offsetY, !0) : !1
};
SwipeControl.prototype.free = function() {
	this.m_actionZone = null;
	ControlTouch.instance.swipeObjects.splice(ControlTouch.instance.swipeObjects.indexOf(this), 1)
};
function SDeferred() {
	this._succ = this._fail = this._next = this._id = null;
	this._tail = this
}
SDeferred.prototype.next = function(a) {
	var b = new SDeferred;
	b._succ = a;
	return this._add(b)
};
SDeferred.prototype.error = function(a) {
	var b = new SDeferred;
	b._fail = a;
	return this._add(b)
};
SDeferred.prototype._add = function(a) {
	this._tail = this._tail._next = a;
	return this
};
SDeferred.prototype.call = function(a) {
	for (var b, c = this; c && !c._succ;) c = c._next;
	if (c instanceof SDeferred) {
		try {
			b = c._succ(a)
		} catch(d) {
			return c.fail(d)
		}
		b instanceof SDeferred ? SDeferred._insert(c, b) : c._next instanceof SDeferred && c._next.call(b)
	}
};
SDeferred.prototype.fail = function(a) {
	for (var b, c, d = this; d && !d._fail;) d = d._next;
	try {
		if (d instanceof SDeferred) b = d._fail(a),
		d.call(b);
		else {
			if (a instanceof Error) throw a;
			c = Error(a.message);
			c.arg = a;
			throw c;
		}
	} catch(e) {
		Application.error("SDeferred.load: " + e)
	}
};
SDeferred._insert = function(a, b) {
	a._next instanceof SDeferred && (b._next = a._next);
	a._next = b
};
SDeferred.next = function(a) {
	var b = (new SDeferred).next(a);
	b._id = setTimeout(function() {
		b.call(null)
	},
	0);
	return b
};
SDeferred.parallel = function(a) {
	var b = new SDeferred;
	b._id = setTimeout(function() {
		b.call(null)
	},
	0);
	var c = 0,
	d = a instanceof Array ? [] : {},
	e = new SDeferred,
	f;
	for (f in a) a.hasOwnProperty(f) && (c++,
	function(a, b) {
		a.next(function(a) {
			c--;
			d[b] = a;
			0 >= c && e.call(d)
		}).error(function(a) {
			e.fail(a)
		});
		"number" === typeof a._id && clearTimeout(a._id);
		a._id = setTimeout(function() {
			a.call()
		},
		0)
	} (a[f], f));
	c || (e._id = setTimeout(function() {
		e.call(d)
	},
	0));
	return b.next(function() {
		return e
	})
};
function SEvent(a) {
	this.type = a;
	this.target = null;
	this.localY = this.localX = this.y = this.x = 0
}
SEvent.prototype._initPosition = function(a, b) {
	this.x = this.localX = a;
	this.y = this.localY = b
};
SEvent.LOAD = "load";
SEvent.ERROR = "error";
SEvent.CORE_RESIZE = "coreresize";
SEvent.ENTER_FRAME = "enterframe";
SEvent.EXIT_FRAME = "exitframe";
SEvent.ENTER = "enter";
SEvent.EXIT = "exit";
SEvent.CHILD_ADDED = "childadded";
SEvent.ADDED = "added";
SEvent.ADDED_TO_SCENE = "addedtoscene";
SEvent.CHILD_REMOVED = "childremoved";
SEvent.REMOVED = "removed";
SEvent.REMOVED_FROM_SCENE = "removedfromscene";
SEvent.TOUCH_START = "touchstart";
SEvent.TOUCH_MOVE = "touchmove";
SEvent.TOUCH_END = "touchend";
SEvent.RENDER = "render";
function SMatrix() {
	this.stack = [];
	this.reset()
}
SMatrix.prototype.reset = function() {
	this.stack = [];
	this.stack.push([1, 0, 0, 1, 0, 0])
};
SMatrix.prototype.makeTransformMatrix = function(a, b) {
	var c = a._x,
	d = a._y,
	e = a._width || 0,
	f = a._height || 0,
	g = "number" === typeof a._scaleX ? a._scaleX: 1,
	h = "number" === typeof a._scaleY ? a._scaleY: 1,
	k = (a._rotation || 0) * Math.PI / 180,
	l = Math.cos(k),
	k = Math.sin(k),
	e = "number" === typeof a.originX ? a.originX: 0.5 * e,
	f = "number" === typeof a.originY ? a.originY: 0.5 * f,
	m = g * l,
	g = g * k,
	k = h * k,
	h = h * l;
	b[0] = m;
	b[1] = g;
	b[2] = -k;
	b[3] = h;
	b[4] = -m * e + k * f + c + e;
	b[5] = -g * e - h * f + d + f
};
SMatrix.prototype.multiply = function(a, b, c) {
	var d = a[0],
	e = a[2],
	f = a[4],
	g = a[1],
	h = a[3];
	a = a[5];
	var k = b[0],
	l = b[2],
	m = b[4],
	n = b[1],
	p = b[3];
	b = b[5];
	c[0] = d * k + e * n;
	c[1] = g * k + h * n;
	c[2] = d * l + e * p;
	c[3] = g * l + h * p;
	c[4] = d * m + e * b + f;
	c[5] = g * m + h * b + a
};
SMatrix.prototype.multiplyVec = function(a, b, c) {
	var d = b[0];
	b = b[1];
	var e = a[1],
	f = a[3],
	g = a[5];
	c[0] = a[0] * d + a[2] * b + a[4];
	c[1] = e * d + f * b + g
};
function SCanvasRenderer(a) {
	this.platform = a
}
SCanvasRenderer.prototype.render = function(a, b, c) {
	var d, e;
	a.save();
	b.dispatchEvent(c);
	this.transform(a, b);
	if ("undefined" === typeof b.visible || b.visible) {
		d = b._width;
		e = b._height;
		b.compositeOperation && (a.globalCompositeOperation = b.compositeOperation);
		a.globalAlpha = "number" === typeof b.opacity ? b.opacity: 1;
		b._backgroundColor && (a.fillStyle = b._backgroundColor, a.fillRect(0, 0, d, e));
		b.cvsRender && (b.cvsRender(a), b.onDraw(a));
		SCore.instance._debug && b.debugColor && (a.strokeStyle = b.debugColor, a.strokeRect(0, 0, d, e));
		b._clipping && (a.beginPath(), a.rect(0, 0, d, e), a.clip());
		if (!0 == b._sorted && b.childNodes) for (d = 0; d < b.childNodes.length - 1; d++) if ("undefined" !== typeof b.childNodes[d]._depth) {
			do
			for (e = !1, d = 0; d < b.childNodes.length - 1; d++) b.childNodes[d]._depth > b.childNodes[d + 1]._depth && (e = b.childNodes[d], b.childNodes[d] = b.childNodes[d + 1], b.childNodes[d + 1] = e, e = !0);
			while (e)
		}
		if (b.childNodes) {
			d = 0;
			for (var f = b.childNodes.length; d < f; d++) e = b.childNodes[d],
			this.render(a, e, c)
		}
	}
	a.restore();
	this.platform.matrix.stack.pop()
};
SCanvasRenderer.prototype.detectRender = function(a, b) {
	var c, d;
	if ("undefined" === typeof b.visible || b.visible) {
		c = b._width;
		d = b._height;
		a.save();
		this.transform(a, b);
		a.fillStyle = b._cvsCache.detectColor;
		b._touchEnabled && (b.detectRender ? b.detectRender(a) : a.fillRect(0, 0, c, d));
		b._clipping && (a.beginPath(), a.rect(0, 0, c, d), a.clip());
		if (b.childNodes) {
			d = 0;
			for (var e = b.childNodes.length; d < e; d++) c = b.childNodes[d],
			this.detectRender(a, c)
		}
		a.restore();
		this.platform.matrix.stack.pop()
	}
};
SCanvasRenderer.prototype.transform = function(a, b) {
	var c = this.platform.matrix,
	d = c.stack,
	e, f, g, h;
	b.getDirty() ? (c.makeTransformMatrix(b, b._cvsCache.matrix), e = [], c.multiply(d[d.length - 1], b._cvsCache.matrix, e), b._matrix = e, f = "number" === typeof b.originX ? b.originX: 0.5 * b._width || 0, g = "number" === typeof b.originY ? b.originY: 0.5 * b._height || 0, h = [f, g], c.multiplyVec(e, h, h), b._offsetX = h[0] - f, b._offsetY = h[1] - g, b.setDirty(!1)) : e = b._matrix;
	d.push(e);
	a.setTransform.apply(a, e)
};
function SEventTarget() {
	this._listeners = {}
}
SEventTarget.prototype.addEventListener = function(a, b) {
	var c = this._listeners[a];
	null == c ? this._listeners[a] = [b] : -1 === c.indexOf(b) && c.unshift(b)
};
SEventTarget.prototype.on = function() {
	this.addEventListener.apply(this, arguments)
};
SEventTarget.prototype.removeEventListener = function(a, b) {
	var c = this._listeners[a];
	if (null != c) {
		var d = c.indexOf(b); - 1 !== d && c.splice(d, 1)
	}
};
SEventTarget.prototype.clearEventListener = function(a) {
	null != a ? delete this._listeners[a] : this._listeners = {}
};
SEventTarget.prototype.dispatchEvent = function(a) {
	a.target = this;
	a.localX = a.x - this._offsetX;
	a.localY = a.y - this._offsetY;
	if (null != this["on" + a.type]) this["on" + a.type](a);
	var b = this._listeners[a.type];
	if (null != b) for (var b = b.slice(), c = 0, d = b.length; c < d; c++) b[c].call(this, a)
};
function SSurface(a, b, c) {
	SEventTarget.call(this);
	var d = SCore.instance;
	this.width = a;
	this.height = b;
	this._element = this._css = this.context = null;
	c && (c = "platform-surface" + d._surfaceID++, document.getCSSCanvasContext ? (this.context = document.getCSSCanvasContext("2d", c, this.width, this.height), this._element = this.context.canvas, this._css = "-webkit-canvas(" + c + ")") : document.mozSetImageElement ? (this._element = document.createElement("canvas"), this._element.width = a, this._element.height = b, this._css = "-moz-element(#" + c + ")", this.context = this._element.getContext("2d"), document.mozSetImageElement(c, this._element)) : (this._element = document.createElement("canvas"), this._element.width = a, this._element.height = b, this._element.style.position = "absolute", this.context = this._element.getContext("2d"), SEngine.ENV.CANVAS_DRAWING_METHODS.forEach(function(a) {
		var b = this.context[a];
		this.context[a] = function() {
			b.apply(this, arguments);
			this.setDirty(!0)
		}
	},
	this)))
}
goog.inherits(SSurface, SEventTarget);
SSurface.prototype.getPixel = function(a, b) {
	return this.context.getImageData(a, b, 1, 1).data
};
SSurface.prototype.setPixel = function(a, b, c, d, e, f) {
	var g = this.context.createImageData(1, 1);
	g.data[0] = c;
	g.data[1] = d;
	g.data[2] = e;
	g.data[3] = f;
	this.context.putImageData(g, a, b)
};
SSurface.prototype.clear = function() {
	this.context.clearRect(0, 0, this.width, this.height)
};
SSurface.prototype.draw = function(a) {
	a = a._element;
	if (1 === arguments.length) this.context.drawImage(a, 0, 0);
	else {
		var b = arguments;
		b[0] = a;
		this.context.drawImage.apply(this.context, b)
	}
};
SSurface.prototype.clone = function() {
	var a = new SSurface(this.width, this.height, !0);
	a.draw(this);
	return a
};
SSurface.prototype.toDataURL = function() {
	var a = this._element.src;
	return a ? "data:" === a.slice(0, 5) ? a: this.clone().toDataURL() : this._element.toDataURL()
};
SSurface.load = function(a, b, c) {
	var d = new Image,
	e = new SSurface(0, 0, !1);
	e._css = "url(" + a + ")";
	e._element = d;
	c = c ||
	function() {};
	e.addEventListener("load", b);
	e.addEventListener("error", c);
	d.onerror = function() {
		var a = new SEvent(SEvent.ERROR);
		a.message = "Cannot load an asset: " + d.src;
		SCore.instance.dispatchEvent(a);
		e.dispatchEvent(a)
	};
	d.onload = function() {
		e.width = d.width;
		e.height = d.height;
		e.dispatchEvent(new SEvent(SEvent.LOAD))
	};
	d.src = a;
	return e
};
SSurface._staticCanvas2DContext = document.createElement("canvas").getContext("2d");
SSurface._getPattern = function(a, b) {
	if (!a._pattern || b) a._pattern = SSurface._staticCanvas2DContext.createPattern(a._element, "repeat");
	return a._pattern
};
function SCore(a, b) {
	if (null === window.document.body) throw Error("document.body is null. Please excute 'new Core()' in window.onload.");
	SEventTarget.call(this);
	SCore.instance = this;
	this.width = a;
	this.height = b;
	this.scale = 1;
	this._surfaceID = this._mousedownID = this._pageY = this._pageX = 0;
	this._scenes = [];
	this._element = document.createElement("div");
	this._element.id = "platform-stage";
	this._element.style.position = "absolute";
	document.body.firstChild ? document.body.insertBefore(this._element, document.body.firstChild) : document.body.appendChild(this._element);
	this._element.style.fontSize = "12px";
	this._element.style.webkitTextSizeAdjust = "none";
	this.addEventListener("coreresize", this._oncoreresize);
	this._dispatchCoreResizeEvent();
	this.fps = 30;
	this.frame = 0;
	this.running = this.ready = !1;
	this.assets = {};
	this.currentScene = null;
	this.rootScene = new SScene;
	this.pushScene(this.rootScene);
	this._offsetY = this._offsetX = 0;
	this.input = {};
	this._keybind = {};
	this.pressedKeysNum = 0;
	this._internalButtondownListeners = {};
	this._internalButtonupListeners = {};
	this._touchEventTarget = {};
	var c;
	document.addEventListener("keydown",
	function(a) {
		var b = SCore.instance;
		b.dispatchEvent(new SEvent("keydown")); - 1 !== SEngine.ENV.PREVENT_DEFAULT_KEY_CODES.indexOf(a.keyCode) && (a.preventDefault(), a.stopPropagation());
		b.running && (a = b._keybind[a.keyCode]) && (c = new SEvent(a + "buttondown"), b.dispatchEvent(c))
	},
	!0);
	document.addEventListener("keyup",
	function(a) {
		var b = SCore.instance;
		b.running && (a = b._keybind[a.keyCode]) && (c = new SEvent(a + "buttonup"), b.dispatchEvent(c))
	},
	!0)
}
goog.inherits(SCore, SEventTarget);
SCore.prototype._dispatchCoreResizeEvent = function() {
	var a = new SEvent("coreresize");
	a.width = this.width;
	a.height = this.height;
	a.scale = this.scale;
	this.dispatchEvent(a)
};
SCore.prototype._oncoreresize = function(a) {
	this._element.style.width = Math.floor(this.width * this.scale) + "px";
	this._element.style.height = Math.floor(this.height * this.scale) + "px";
	for (var b, c = 0,
	d = this._scenes.length; c < d; c++) b = this._scenes[c],
	b.dispatchEvent(a)
};
SCore.prototype.load = function(a, b, c, d) {
	var e, f;
	"string" === typeof arguments[1] ? (e = c, f = 1) : (e = a, f = 0);
	b = arguments[1 + f] ||
	function() {};
	d = arguments[2 + f] ||
	function() {};
	var g = SCore.findExt(a);
	return SDeferred.next(function() {
		var c = SCore.instance,
		f = new SDeferred,
		l = function(a) {
			f.call(a);
			b.call(this, a)
		},
		m = function(a) {
			f.fail(a);
			d.call(this, a)
		};
		if (SCore._loadFuncs[g]) c.assets[e] = SCore._loadFuncs[g](a, g, l, m);
		else {
			var n = new XMLHttpRequest;
			n.open("GET", a, !0);
			n.onreadystatechange = function() {
				if (4 === n.readyState) {
					if (200 !== n.status && 0 !== n.status) {
						var b = new SEvent("error");
						b.message = n.status + ": Cannot load an asset: " + a;
						m.call(c, b)
					} (n.getResponseHeader("Content-Type") || "").match(/^image/) ? c.assets[e] = SSurface.load(a, l, m) : (c.assets[e] = n.responseText, l.call(c, new SEvent("load")))
				}
			};
			n.send(null)
		}
		return f
	})
};
SCore.prototype.start = function() {
	this.frame = 0;
	this.ready = this.running = !0;
	this.dispatchEvent(new SEvent(SEvent.LOAD))
};
SCore.prototype.debug = function() {
	this._debug = !0;
	return this.start()
};
SCore.prototype._tick = function() {
	this.dispatchEvent(new SEvent(SEvent.EXIT_FRAME));
	this.frame++
};
SCore.prototype.stop = function() {
	this.running = this.ready = !1
};
SCore.prototype.pause = function() {
	this.ready = !1
};
SCore.prototype.resume = function() {
	this.ready || (this.running = this.ready = !0)
};
SCore.prototype.pushScene = function(a) {
	this._element.appendChild(a._element);
	this.currentScene && this.currentScene.dispatchEvent(new SEvent(SEvent.EXIT));
	this.currentScene = a;
	this.currentScene.dispatchEvent(new SEvent(SEvent.ENTER));
	return this._scenes.push(a)
};
SCore.prototype.popScene = function() {
	if (this.currentScene === this.rootScene) return this.currentScene;
	this._element.removeChild(this.currentScene._element);
	this.currentScene.dispatchEvent(new SEvent(SEvent.EXIT));
	this.currentScene = this._scenes[this._scenes.length - 2];
	this.currentScene.dispatchEvent(new SEvent(SEvent.ENTER));
	return this._scenes.pop()
};
SCore.prototype.replaceScene = function(a) {
	this.popScene();
	return this.pushScene(a)
};
SCore.prototype.removeScene = function(a) {
	if (this.currentScene === a) return this.popScene();
	var b = this._scenes.indexOf(a);
	return - 1 !== b ? (this._scenes.splice(b, 1), this._element.removeChild(a._element), a) : null
};
SCore.prototype.keybind = function(a, b) {
	this._keybind[a] = b;
	var c = function(a) {
		var c;
		this.input[b] || (this.input[b] = !0, c = new SEvent(this.pressedKeysNum++?"inputchange": "inputstart"), this.dispatchEvent(c), this.currentScene.dispatchEvent(c));
		this.currentScene.dispatchEvent(a)
	},
	d = function(a) {
		var c;
		this.input[b] && (this.input[b] = !1, c = new SEvent(--this.pressedKeysNum ? "inputchange": "inputend"), this.dispatchEvent(c), this.currentScene.dispatchEvent(c));
		this.currentScene.dispatchEvent(a)
	};
	this.addEventListener(b + "buttondown", c);
	this.addEventListener(b + "buttonup", d);
	this._internalButtondownListeners[a] = c;
	this._internalButtonupListeners[a] = d;
	return this
};
SCore.prototype.keyunbind = function(a) {
	if (!this._keybind[a]) return this;
	var b = this._internalButtondownListeners,
	c = this._internalButtonupListeners;
	this.removeEventListener(a + "buttondown", b);
	this.removeEventListener(a + "buttonup", c);
	delete b[a];
	delete c[a];
	delete this._keybind[a];
	return this
};
SCore._loadFuncs = {};
SCore._loadFuncs.jpg = SCore._loadFuncs.jpeg = SCore._loadFuncs.gif = SCore._loadFuncs.png = SCore._loadFuncs.bmp = function(a, b, c, d) {
	return SSurface.load(a, c, d)
};
SCore.findExt = function(a) {
	var b = a.match(/\.\w+$/);
	return b && 0 < b.length ? b[0].slice(1).toLowerCase() : 0 === a.indexOf("data:") ? a.split(/[\/;]/)[1].toLowerCase() : null
};
function SNode() {
	SEventTarget.call(this);
	this._dirty = !1;
	this._matrix = [1, 0, 0, 1, 0, 0];
	this._rotation = this._height = this._width = this._offsetY = this._offsetX = this._y = this._x = 0;
	this._scaleY = this._scaleX = 1;
	this._drawMethod = this._drawCaller = null;
	this._depth = this._sorted = !1;
	this.visible = !0;
	this.opacity = 1;
	this.scene = this.parentNode = this.originY = this.originX = null;
	this.addEventListener("touchstart",
	function(a) {
		this.parentNode && this.parentNode.dispatchEvent(a)
	});
	this.addEventListener("touchmove",
	function(a) {
		this.parentNode && this.parentNode.dispatchEvent(a)
	});
	this.addEventListener("touchend",
	function(a) {
		this.parentNode && this.parentNode.dispatchEvent(a)
	})
}
goog.inherits(SNode, SEventTarget);
SNode.prototype.onDraw = function(a) {
	if (this._drawCaller && this._drawCaller[this._drawMethod]) this._drawCaller[this._drawMethod](a)
};
SNode.prototype.addDrawListener = function(a, b) {
	this._drawCaller = a;
	this._drawMethod = b
};
SNode.prototype.cvsRender = function(a) {};
SNode.prototype.getX = function() {
	return this._x
};
SNode.prototype.setX = function(a) {
	this._x = a;
	this.setDirty(!0)
};
SNode.prototype.getY = function() {
	return this._y
};
SNode.prototype.setY = function(a) {
	this._y = a;
	this.setDirty(!0)
};
SNode.prototype.setPosition = function(a, b) {
	this._x = a;
	this._y = b;
	this.setDirty(!0)
};
SNode.prototype.getWidth = function() {
	return this._width
};
SNode.prototype.setWidth = function(a) {
	this._width = a;
	this.setDirty(!0)
};
SNode.prototype.getHeight = function() {
	return this._height
};
SNode.prototype.setHeight = function(a) {
	this._height = a;
	this.setDirty(!0)
};
SNode.prototype.getRotation = function() {
	return this._rotation
};
SNode.prototype.setRotation = function(a) {
	this._rotation = a;
	this.setDirty(!0)
};
SNode.prototype.getScaleX = function() {
	return this._scaleX
};
SNode.prototype.setScaleX = function(a) {
	this._scaleX = a;
	this.setDirty(!0)
};
SNode.prototype.getScaleY = function() {
	return this._scaleY
};
SNode.prototype.setScaleY = function(a) {
	this._scaleY = a;
	this.setDirty(!0)
};
SNode.prototype.setScale = function(a, b) {
	this._scaleX = a;
	this._scaleY = null != b ? b: a;
	this.setDirty(!0)
};
SNode.prototype.getDirty = function() {
	return this._dirty
};
SNode.prototype.setDirty = function(a) {
	this._dirty = a
};
SNode.prototype.remove = function() {
	this._listener && this.clearEventListener();
	this.parentNode && this.parentNode.removeChild(this)
};
function SDisplayObject(a, b) {
	SNode.call(this);
	this._width = a;
	this._height = b;
	this._image = null
}
goog.inherits(SDisplayObject, SNode);
SDisplayObject.prototype.getImage = function() {
	return this._image
};
SDisplayObject.prototype.setImage = function(a) {
	a = SCore.instance.assets[Global.URL_ASSETS + window.Assets.assetsParams[a].u];
	if ("undefined" === typeof a) throw Error("Assigned value on SDisplayObject.setImage is undefined. Please double-check image path, and check if the image you want to use is preload before use.");
	a !== this._image && (this._image = a)
};
SDisplayObject.prototype.cvsRender = function(a) {
	this._image && 0 !== this._width && 0 !== this._height && a.drawImage(this._image._element, 0, 0)
};
function SEntity() {
	SNode.call(this);
	this._touchEnabled = !0;
	this._clipping = !1;
	this._buttonMode = this._backgroundColor = null;
	this._style = {};
	this.__styleStatus = {};
	var a = SCore.instance;
	this.debugColor = "#0000ff";
	this.compositeOperation = null;
	this.buttonPressed = this.buttonMode = !1;
	this.addEventListener("touchstart",
	function() {
		if (this.buttonMode) {
			this.buttonPressed = !0;
			var b = new SEvent(this.buttonMode + "buttondown");
			this.dispatchEvent(b);
			a.dispatchEvent(b)
		}
	});
	this.addEventListener("touchend",
	function() {
		if (this.buttonMode) {
			this.buttonPressed = !1;
			var b = new SEvent(this.buttonMode + "buttonup");
			this.dispatchEvent(b);
			a.dispatchEvent(b)
		}
	});
	this.enableCollection()
}
goog.inherits(SEntity, SNode);
SEntity.prototype.setBackgroundColor = function(a) {
	this._backgroundColor = a
};
SEntity.prototype.intersect = function(a) {
	return a instanceof SEntity ? this._intersectOne(a) : !1
};
SEntity.prototype._intersectOne = function(a) {
	return this._offsetX < a._offsetX + a.width && a._offsetX < this._offsetX + this._width && this._offsetY < a._offsetY + a._height && a._offsetY < this._offsetY + this._height
};
SEntity.prototype.intersectStrict = function(a) {
	return a instanceof SEntity ? this._intersectStrictOne(a) : !1
};
SEntity.prototype._intersectStrictOne = function(a) {
	var b = this.getOrientedBoundingRect();
	a = a.getOrientedBoundingRect();
	var c = b.leftTop,
	d = b.rightTop,
	e = b.leftBottom,
	f = b.rightBottom,
	g = a.leftTop,
	h = a.rightTop,
	k = a.leftBottom,
	l = a.rightBottom,
	m = c[0],
	n = c[1],
	p = d[0],
	v = d[1],
	w = e[0],
	x = e[1],
	r = f[0],
	A = f[1],
	B = g[0],
	C = g[1],
	D = h[0],
	E = h[1],
	F = k[0],
	G = k[1],
	H = l[0],
	I = l[1],
	q = [p - m, v - n],
	s = [r - p, A - v],
	y = [w - r, x - A],
	t = [m - w, n - x];
	a = [D - B, E - C];
	var b = [H - D, I - E],
	z = [F - H, G - I],
	u = [B - F, C - G],
	J = m + p + w + r >> 2,
	K = n + v + x + A >> 2,
	L = B + D + F + H >> 2,
	M = C + E + G + I >> 2;
	if (0 < q[0] * (M - n) - q[1] * (L - m) && 0 < s[0] * (M - v) - s[1] * (L - p) && 0 < y[0] * (M - A) - y[1] * (L - r) && 0 < t[0] * (M - x) - t[1] * (L - w) || 0 < a[0] * (K - C) - a[1] * (J - B) && 0 < b[0] * (K - E) - b[1] * (J - D) && 0 < z[0] * (K - I) - z[1] * (J - H) && 0 < u[0] * (K - G) - u[1] * (J - F)) return ! 0;
	c = [c, d, f, e];
	d = [g, h, l, k];
	e = [q, s, y, t];
	b = [a, b, z, u];
	for (a = 0; 4 > a; a++) for (u = c[a], z = u[0], u = u[1], h = e[a], g = h[0], k = h[1], h = 0; 4 > h; h++) if (q = d[h], t = q[0], f = q[1], s = b[h], q = s[0], s = s[1], y = g * s - k * q, 0 !== y && (t -= z, l = f - u, f = (t * k - l * g) / y, q = (t * s - l * q) / y, 0 < f && 1 > f && 0 < q && 1 > q)) return ! 0;
	return ! 1
};
SEntity.prototype.within = function(a, b) {
	null == b && (b = (this._width + this._height + a._width + a._height) / 4);
	var c;
	return (c = this._offsetX - a._offsetX + (this._width - a._width) / 2) * c + (c = this._offsetY - a._offsetY + (this._height - a._height) / 2) * c < b * b
};
SEntity.prototype.enableCollection = function() {
	this.addEventListener("addedtoscene", this._addSelfToCollection);
	this.addEventListener("removedfromscene", this._removeSelfFromCollection);
	this.scene && this._addSelfToCollection()
};
SEntity.prototype.disableCollection = function() {
	this.removeEventListener("addedtoscene", this._addSelfToCollection);
	this.removeEventListener("removedfromscene", this._removeSelfFromCollection);
	this.scene && this._removeSelfFromCollection()
};
SEntity.prototype._addSelfToCollection = function() {};
SEntity.prototype._removeSelfFromCollection = function() {};
SEntity.prototype.getBoundingRect = function() {
	var a = this._width || 0,
	b = this._height || 0,
	c = this._matrix,
	d = c[0] * a,
	a = c[1] * a,
	e = c[2] * b,
	b = c[3] * b,
	f = c[4],
	c = c[5],
	d = [f, d + f, e + f, d + e + f].sort(function(a, b) {
		return a - b
	}),
	a = [c, a + c, b + c, a + b + c].sort(function(a, b) {
		return a - b
	});
	return {
		left: d[0],
		top: a[0],
		width: d[3] - d[0],
		height: a[3] - a[0]
	}
};
SEntity.prototype.getOrientedBoundingRect = function() {
	var a = this._width || 0,
	b = this._height || 0,
	c = this._matrix,
	d = c[0] * a,
	a = c[1] * a,
	e = c[2] * b,
	b = c[3] * b,
	f = c[4],
	c = c[5];
	return {
		leftTop: [f, c],
		rightTop: [d + f, a + c],
		leftBottom: [e + f, b + c],
		rightBottom: [d + e + f, a + b + c]
	}
};
SEntity.prototype.getConstructor = function() {
	return Object.getPrototypeOf(this).constructor
};
function SSprite(a, b) {
	SEntity.call(this);
	this._width = a;
	this._height = b;
	this._image = null;
	this.debugColor = "#ffaa00";
	this._frame = this._frameTop = this._frameLeft = 0;
	this._frameSequence = [];
	this._icol = this._irow = this._sh = this._sw = this._sy = this._sx = 0
}
goog.inherits(SSprite, SEntity);
SSprite.prototype.getImage = function() {
	return this._image
};
SSprite.prototype.setImage = function(a) {
	if ("undefined" === typeof a) throw Error("Assigned value on SSprite.setImage is undefined. Please double-check image path, and check if the image you want to use is preload before use.");
	a !== this._image && (this._image = a, this._setFrame(this._frame))
};
SSprite.prototype.getFrame = function() {
	return this._frame
};
SSprite.prototype.setFrame = function(a) {
	if (this._frame !== a) if (a instanceof Array) {
		var b = a.shift();
		this._setFrame(b);
		a.push(b);
		this._frameSequence = a
	} else this._setFrame(a),
	this._frameSequence = [],
	this._frame = a
};
SSprite.prototype._setFrame = function(a) {
	this._frame = a;
	null != this._image && (this._frame = a, this._irow = this._image.width / this._width | 0, this._frameLeft = (a % this._irow | 0) * this._width, this._frameTop = (a / this._irow | 0) * this._height % this._image.height)
};
SSprite.prototype.setWidth = function(a) {
	this._width = a;
	this._setFrame(this._frame);
	this.setDirty(!0)
};
SSprite.prototype.setHeight = function(a) {
	this._height = a;
	this._setFrame(this._frame);
	this.setDirty(!0)
};
SSprite.prototype.cvsRender = function(a) {
	this._image && 0 !== this._width && 0 !== this._height && (this._image.width < this._width || this._image.height < this._height ? (a.fillStyle = SSurface._getPattern(this._image, null), a.fillRect(0, 0, this._width, this._height)) : (this._sx = this._frameLeft, this._sy = this._image.height - this._height, this._sy > this._frameTop && (this._sy = this._frameTop), this._sw = this._image.width - this._sx, this._sw > this._width && (this._sw = this._width), this._sh = this._image.height - this._sy, this._sh > this._height && (this._sh = this._height), a.drawImage(this._image._element, this._sx, this._sy, this._sw, this._sh, 0, 0, this._width, this._height)))
};
function SGroup() {
	SNode.call(this);
	this.childNodes = [];
	this.__dirty = !1;
	this._scene = null; [SEvent.ADDED_TO_SCENE, SEvent.REMOVED_FROM_SCENE].forEach(function(a) {
		this.addEventListener(a,
		function(a) {
			this.childNodes.forEach(function(c) {
				c.scene = this.scene;
				c.dispatchEvent(a)
			},
			this)
		})
	},
	this)
}
goog.inherits(SGroup, SNode);
SGroup.prototype.addChild = function(a) {
	a.parentNode && a.parentNode.removeChild(a);
	this.childNodes.push(a);
	a.parentNode = this;
	var b = new SEvent(SEvent.CHILD_ADDED);
	b.node = a;
	b.next = null;
	this.dispatchEvent(b);
	a.dispatchEvent(new SEvent(SEvent.ADDED));
	this.scene && (a.scene = this.scene, b = new SEvent(SEvent.ADDED_TO_SCENE), a.dispatchEvent(b))
};
SGroup.prototype.insertBefore = function(a, b) {
	a.parentNode && a.parentNode.removeChild(a);
	var c = this.childNodes.indexOf(b); - 1 !== c ? (this.childNodes.splice(c, 0, a), a.parentNode = this, c = new SEvent(SEvent.CHILD_ADDED), c.node = a, c.next = b, this.dispatchEvent(c), a.dispatchEvent(new SEvent(SEvent.ADDED)), this.scene && (a.scene = this.scene, c = new SEvent(SEvent.ADDED_TO_SCENE), a.dispatchEvent(c))) : this.addChild(a)
};
SGroup.prototype.removeChild = function(a) {
	var b; - 1 !== (b = this.childNodes.indexOf(a)) && (this.childNodes.splice(b, 1), a.parentNode = null, b = new SEvent(SEvent.CHILD_REMOVED), b.node = a, this.dispatchEvent(b), a.dispatchEvent(new SEvent(SEvent.REMOVED)), this.scene && (a.scene = null, b = new SEvent(SEvent.REMOVED_FROM_SCENE), a.dispatchEvent(b)))
};
SGroup.prototype.getFirstChild = function() {
	return this.childNodes[0]
};
SGroup.prototype.getLastChild = function() {
	return this.childNodes[this.childNodes.length - 1]
};
SGroup.prototype.getDirty = function() {
	return this.__dirty
};
SGroup.prototype.setDirty = function(a) {
	if (this.__dirty = a = !!a) {
		a = 0;
		for (var b = this.childNodes.length; a < b; a++) this.childNodes[a].setDirty(!0)
	}
};
function SCanvasLayer() {
	SGroup.call(this);
	var a = SCore.instance;
	this._cvsCache = {
		matrix: [1, 0, 0, 1, 0, 0],
		detectColor: "#000000"
	};
	this._cvsCache.layer = this;
	this._element = document.createElement("canvas");
	this._element.style.position = "absolute";
	this._element.style.left = this._element.style.top = "0px";
	this._detect = document.createElement("canvas");
	this._detect.style.position = "absolute";
	this._lastDetected = 0;
	this._scene = null;
	this.context = this._element.getContext("2d");
	this._dctx = this._detect.getContext("2d");
	this._colorManager = new SDetectColorManager(16, 256);
	this.setWidth(a.width);
	this.setHeight(a.height); [SEvent.TOUCH_START, SEvent.TOUCH_MOVE, SEvent.TOUCH_END].forEach(function(a) {
		this.addEventListener(a,
		function(a) {
			this._scene && this._scene.dispatchEvent(a)
		})
	},
	this);
	var b = function(a) {
		var e = a.node;
		a = a.target;
		var f;
		f = a instanceof SCanvasLayer ? a._scene._layers.Canvas: a.scene._layers.Canvas;
		SCanvasLayer._attachCache(e, f, b, c);
		var g = new SEvent(SEvent.RENDER);
		e.setDirty(!0);
		SEngine.instance.matrix.stack.push(a._matrix);
		SEngine.instance.canvasRenderer.render(f.context, e, g);
		SEngine.instance.matrix.stack.pop(a._matrix)
	},
	c = function(a) {
		var e = a.target;
		SCanvasLayer._detachCache(a.node, e instanceof SCanvasLayer ? e._scene._layers.Canvas: e.scene._layers.Canvas, b, c)
	};
	this.addEventListener("childremoved", c);
	this.addEventListener("childadded", b)
}
goog.inherits(SCanvasLayer, SGroup);
SCanvasLayer.prototype.setWidth = function(a) {
	this._width = a;
	this._element.width = this._detect.width = a
};
SCanvasLayer.prototype.setHeight = function(a) {
	this._height = a;
	this._element.height = this._detect.height = a
};
SCanvasLayer.prototype.addChild = function(a) {
	this.childNodes.push(a);
	a.parentNode = this;
	var b = new SEvent(SEvent.CHILD_ADDED);
	b.node = a;
	b.next = null;
	this.dispatchEvent(b);
	a.dispatchEvent(new SEvent(SEvent.ADDED));
	this.scene && (a.scene = this.scene, b = new SEvent(SEvent.ADDED_TO_SCENE), a.dispatchEvent(b))
};
SCanvasLayer.prototype.insertBefore = function(a, b) {
	var c = this.childNodes.indexOf(b); - 1 !== c ? (this.childNodes.splice(c, 0, a), a.parentNode = this, c = new SEvent(SEvent.CHILD_ADDED), c.node = a, c.next = b, this.dispatchEvent(c), a.dispatchEvent(new SEvent(SEvent.ADDED)), this.scene && (a.scene = this.scene, c = new SEvent(SEvent.ADDED_TO_SCENE), a.dispatchEvent(c))) : this.addChild(a)
};
SCanvasLayer.prototype._startRendering = function() {
	this.addEventListener("exitframe", this._onexitframe);
	this._onexitframe()
};
SCanvasLayer.prototype._stopRendering = function() {
	this.removeEventListener("render", this._onexitframe);
	this._onexitframe()
};
SCanvasLayer.prototype._onexitframe = function() {
	var a = SCore.instance,
	b = this.context;
	b.clearRect(0, 0, a.width, a.height);
	a = new SEvent(SEvent.RENDER);
	SEngine.instance.canvasRenderer.render(b, this, a)
};
SCanvasLayer.prototype._determineEventTarget = function(a) {
	return this._getEntityByPosition(a.x, a.y)
};
SCanvasLayer.prototype._getEntityByPosition = function(a, b) {
	var c = SCore.instance,
	d = this._dctx;
	this._lastDetected < c.frame && (d.clearRect(0, 0, this._width, this._height), SEngine.instance.canvasRenderer.detectRender(d, this), this._lastDetected = c.frame);
	c = d.getImageData(a, b, 1, 1).data;
	return this._colorManager.getSpriteByColor(c)
};
SCanvasLayer._attachCache = function(a, b, c, d) {
	var e;
	a._cvsCache || (a._cvsCache = {},
	a._cvsCache.matrix = [1, 0, 0, 1, 0, 0], a._cvsCache.detectColor = "rgba(" + b._colorManager.attachDetectColor(a) + ")", a.addEventListener("childadded", c), a.addEventListener("childremoved", d));
	if (a.childNodes) for (var f = 0,
	g = a.childNodes.length; f < g; f++) e = a.childNodes[f],
	SCanvasLayer._attachCache(e, b, c, d)
};
SCanvasLayer._detachCache = function(a, b, c, d) {
	var e;
	a._cvsCache && (b._colorManager.detachDetectColor(a), a.removeEventListener("childadded", c), a.removeEventListener("childremoved", d), delete a._cvsCache);
	if (a.childNodes) for (var f = 0,
	g = a.childNodes.length; f < g; f++) e = a.childNodes[f],
	SCanvasLayer._detachCache(e, b, c, d)
};
function SDetectColorManager(a, b) {
	this.reference = [];
	this.colorResolution = a || 16;
	this.max = b || 1;
	this.capacity = Math.pow(this.colorResolution, 3);
	for (var c = 1,
	d = this.capacity; c < d; c++) this.reference[c] = null
}
SDetectColorManager.prototype.attachDetectColor = function(a) {
	var b = this.reference.indexOf(null); - 1 === b && (b = 1);
	this.reference[b] = a;
	return this._getColor(b)
};
SDetectColorManager.prototype.detachDetectColor = function(a) {
	a = this.reference.indexOf(a); - 1 !== a && (this.reference[a] = null)
};
SDetectColorManager.prototype._getColor = function(a) {
	var b = this.colorResolution,
	c = b / this.max;
	return [parseInt(a / b / b % b, 10) / c, parseInt(a / b % b, 10) / c, parseInt(a % b, 10) / c, 1]
};
SDetectColorManager.prototype._decodeDetectColor = function(a) {
	var b = this.colorResolution;
	return~~ (a[0] * b * b * b / 256) + ~~ (a[1] * b * b / 256) + ~~ (a[2] * b / 256)
};
SDetectColorManager.prototype.getSpriteByColor = function(a) {
	return this.reference[this._decodeDetectColor(a)]
};
function SScene() {
	SGroup.call(this);
	var a = SCore.instance;
	this.scene = this;
	this._backgroundColor = null;
	this._element = document.createElement("div");
	this._element.style.position = "absolute";
	this._element.style.overflow = "hidden";
	this._element.style[SEngine.ENV.VENDOR_PREFIX + "TransformOrigin"] = "0 0";
	this._layers = {};
	this._layerPriority = [];
	this.addEventListener(SEvent.CHILD_ADDED, this._onchildadded);
	this.addEventListener(SEvent.CHILD_REMOVED, this._onchildremoved);
	this.addEventListener(SEvent.ENTER, this._onenter);
	this.addEventListener(SEvent.EXIT, this._onexit);
	var b = this;
	this._dispatchExitframe = function() {
		var a, d;
		for (d in b._layers) a = b._layers[d],
		a.dispatchEvent(new SEvent(SEvent.EXIT_FRAME))
	};
	this.addEventListener(SEvent.CORE_RESIZE, this._oncoreresize);
	this._oncoreresize(a)
}
goog.inherits(SScene, SGroup);
SScene.prototype.setX = function(a) {
	this._x = a;
	for (var b in this._layers) this._layers[b].setX(a)
};
SScene.prototype.setY = function(a) {
	this._y = a;
	for (var b in this._layers) this._layers[b].setY(a)
};
SScene.prototype.setWidth = function(a) {
	this._width = a;
	for (var b in this._layers) this._layers[b].setWidth(a)
};
SScene.prototype.setHeight = function(a) {
	this._height = a;
	for (var b in this._layers) this._layers[b].setHeight(a)
};
SScene.prototype.setRotation = function(a) {
	this._rotation = a;
	for (var b in this._layers) this._layers[b].setRotation(a)
};
SScene.prototype.setScaleX = function(a) {
	this._scaleX = a;
	for (var b in this._layers) this._layers[b].setScaleX(a)
};
SScene.prototype.setScaleY = function(a) {
	this._scaleY = a;
	for (var b in this._layers) this._layers[b].setScaleY(a)
};
SScene.prototype.setBackgroundColor = function(a) {
	this._backgroundColor = this._element.style.backgroundColor = a
};
SScene.prototype._oncoreresize = function(a) {
	this._element.style.width = a.width + "px";
	this.setWidth(a.width);
	this._element.style.height = a.height + "px";
	this.setHeight(a.height);
	this._element.style[SEngine.ENV.VENDOR_PREFIX + "Transform"] = "scale(" + a.scale + ")";
	for (var b in this._layers) this._layers[b].dispatchEvent(a)
};
SScene.prototype.addLayer = function(a, b) {
	var c = SCore.instance;
	if (!this._layers[a]) {
		var d = new SCanvasLayer;
		c.currentScene === this && d._startRendering();
		this._layers[a] = d;
		c = d._element;
		if ("number" === typeof b) {
			var e = this._element.childNodes[b];
			e ? this._element.insertBefore(c, e) : this._element.appendChild(c);
			this._layerPriority.splice(b, 0, a)
		} else this._element.appendChild(c),
		this._layerPriority.push(a);
		d._scene = this
	}
};
SScene.prototype._determineEventTarget = function(a) {
	for (var b, c = this._layerPriority.length - 1; 0 <= c && !(b = this._layers[this._layerPriority[c]], b = b._determineEventTarget(a)); c--);
	b || (b = this);
	return b
};
SScene.prototype._onchildadded = function(a) {
	var b = a.node;
	a = a.next;
	var c, d;
	b._element ? (c = "Dom", d = 1) : (c = "Canvas", d = 0);
	this._layers[c] || this.addLayer(c, d);
	b._layer = this._layers[c];
	this._layers[c].insertBefore(b, a);
	b.parentNode = this
};
SScene.prototype._onchildremoved = function(a) {
	a = a.node;
	a._layer.removeChild(a);
	a._layer = null
};
SScene.prototype._onenter = function() {
	for (var a in this._layers) this._layers[a]._startRendering();
	SCore.instance.addEventListener("exitframe", this._dispatchExitframe)
};
SScene.prototype._onexit = function() {
	for (var a in this._layers) this._layers[a]._stopRendering();
	SCore.instance.removeEventListener("exitframe", this._dispatchExitframe)
};
SScene.prototype.addDrawListener = function(a, b) {
	this._layers.Canvas && this._layers.Canvas.addDrawListener(a, b)
};
function SCanvasScene() {
	SScene.call(this);
	this.addLayer("Canvas", null)
}
goog.inherits(SCanvasScene, SScene);
SCanvasScene.prototype._determineEventTarget = function(a) { (a = this._layers.Canvas._determineEventTarget(a)) || (a = this);
	return a
};
SCanvasScene.prototype._onchildadded = function(a) {
	var b = a.node;
	a = a.next;
	b._layer = this._layers.Canvas;
	this._layers.Canvas.insertBefore(b, a)
};
SCanvasScene.prototype._onenter = function() {
	this._layers.Canvas._startRendering();
	SCore.instance.addEventListener("exitframe", this._dispatchExitframe)
};
SCanvasScene.prototype._onexit = function() {
	this._layers.Canvas._stopRendering();
	SCore.instance.removeEventListener("exitframe", this._dispatchExitframe)
};
function SEngine() {
	this.matrix = new SMatrix;
	this.canvasRenderer = new SCanvasRenderer(this)
}
SEngine.initialize = function() {
	SEngine.instance = new SEngine
};
SEngine.ENV = {
	VENDOR_PREFIX: function() {
		var a = navigator.userAgent;
		return - 1 !== a.indexOf("Opera") ? "O": -1 !== a.indexOf("MSIE") ? "ms": -1 !== a.indexOf("WebKit") ? "webkit": "Gecko" === navigator.product ? "Moz": ""
	} (),
	TOUCH_ENABLED: function() {
		var a = document.createElement("div");
		a.setAttribute("ontouchstart", "return");
		return "function" === typeof a.ontouchstart
	} (),
	USE_DEFAULT_EVENT_TAGS: ["input", "textarea", "select", "area"],
	CANVAS_DRAWING_METHODS: "putImageData drawImage drawFocusRing fill stroke clearRect fillRect strokeRect fillText strokeText".split(" "),
	PREVENT_DEFAULT_KEY_CODES: []
};
function SndManager(a, b) {}
SndManager.instance = null;
SndManager.prototype.play = function(a) {};
SndManager.prototype.stop = function(a) {};
SndManager.prototype.pauseAll = function() {};
SndManager.prototype.resumeAll = function() {};
SndManager.prototype.stopAllSounds = function() {};
SndManager.prototype.toogleMute = function() {};
function SndManagerIE(a, b) {
	SndManager.instance = this;
	window.SwitEntryPoint.infoBrowser.isIE || Application.error("Using SndManagerIE for no IE browsers");
	this.sounds = {};
	this.soundList = a;
	this.mute = !1;
	this.callback = b;
	this.callbackBug = !1;
	this.soundsLoaded = 0;
	this.soundsTotal = a.length;
	GuiLoader.instance && (GuiLoader.instance.totalFiles = this.soundsTotal);
	window.soundManager.setup({
		url: "media/swf/",
		flashVersion: 9,
		useHTML5Audio: !0,
		preferFlash: !0,
		useHighPerformance: !0,
		flashLoadTimeout: 2E3,
		noSWFCache: !1,
		consoleOnly: !0,
		wmode: null,
		debugMode: !1,
		onready: this.onReady,
		ontimeout: function() {
			Application.instance.onErrorSndManagerIE()
		}
	})
}
SndManagerIE.prototype.onReady = function() {
	for (var a = SndManager.instance.soundList,
	b = window.soundManager,
	c = 0; c < a.length; c++) b.createSound({
		id: a[c].id,
		url: "media/sounds/" + a[c].file + ".mp3",
		autoLoad: !0,
		onload: function() {
			SndManager.instance.onLoad()
		}
	}),
	SndManager.instance.sounds[a[c].id] = a[c]
};
SndManagerIE.prototype.onLoad = function() {
	this.soundsLoaded++;
	Application.log("SndManagerIE.onLoad: " + this.soundsLoaded + "/" + this.soundsTotal);
	GuiLoader.instance && GuiLoader.instance.load();
	this.soundsLoaded === this.soundsTotal && this.callback()
};
SndManagerIE.prototype.play = function(a) {
	if (!this.mute && "undefined" !== typeof this.sounds[a]) {
		var b = window.soundManager,
		c = this.sounds[a].loops;
		1 !== c ? (0 === c && (c = 999999), 0 === b.sounds[a].instanceCount && b.play(a, {
			volume: 100 * this.sounds[a].vol,
			loops: c
		})) : b.play(a, {
			volume: 100 * this.sounds[a].vol
		})
	}
};
SndManagerIE.prototype.stop = function(a) {
	window.soundManager.stop(a)
};
SndManagerIE.prototype.pauseAll = function() {
	window.soundManager.pauseAll()
};
SndManagerIE.prototype.resumeAll = function() {
	this.mute || window.soundManager.resumeAll()
};
SndManagerIE.prototype.stopAllSounds = function() {
	window.soundManager.stopAll()
};
SndManagerIE.prototype.toogleMute = function() { (this.mute = !this.mute) ? window.soundManager.pauseAll() : window.soundManager.resumeAll()
};
SndManagerIE.prototype.tooglePause = function(a) {
	this.mute || window.soundManager.togglePause(a)
};
function SndManagerWeb(a, b) {
	SndManager.instance = this;
	this.soundjs = window.createjs;
	this.soundList = {};
	this.mute = !1;
	this.callback = b;
	this.callbackBug = !1;
	window.SwitEntryPoint.infoBrowser.isIE && (Application.warn("Using SndManagerWeb for IE"), this.callbackBug = !0);
	window.SwitEntryPoint.infoBrowser.iDevice && 6 > window.SwitEntryPoint.infoBrowser.platformVersion && (Application.warn("IOS < 6"), this.callbackBug = this.soundjs.HTMLAudioPlugin.enableIOS = !0);
	this.soundsLoaded = 0;
	this.soundsTotal = a.length;
	var c = [];
	GuiLoader.instance && (GuiLoader.instance.totalFiles = this.soundsTotal);
	for (var d = 0; d < a.length; d++) this.soundList[a[d].id] = a[d],
	c.push({
		src: a[d].file + ".mp3|" + a[d].file + ".ogg",
		id: a[d].id,
		data: a[d].instances
	});
	this.soundjs.Sound.addEventListener("fileload", this.soundjs.proxy(this.onFileload, this));
	this.soundjs.Sound.registerManifest(c, "media/sounds/");
	this.callbackBug && this.callback()
}
SndManagerWeb.prototype.onFileload = function(a) {
	this.soundsLoaded++;
	Application.info("preloading sound: " + a.id + " " + this.soundsLoaded + "/" + this.soundsTotal);
	this.callbackBug || (GuiLoader.instance && GuiLoader.instance.load(), this.soundsLoaded === this.soundsTotal && this.callback())
};
SndManagerWeb.prototype.onPlayComplete = function(a) {
	this.play(a.target.switId)
};
SndManagerWeb.prototype.play = function(a) {
	if ("undefined" === typeof this.soundList[a]) Application.warn("SndManagerWeb: sound with id [" + a + "] not found");
	else if (!this.soundjs.HTMLAudioPlugin.enableIOS || 0 != this.soundList[a].ios) {
		var b = null;
		this.soundjs.HTMLAudioPlugin.enableIOS ? (b = this.soundjs.Sound.play(a), b.addEventListener("complete", this.soundjs.proxy(this.onPlayComplete, this))) : b = this.soundjs.Sound.play(a, null, 0, 0, 0 === this.soundList[a].loops ? 999999 : this.soundList[a].loops - 1, this.soundList[a].vol);
		b.switId = a;
		return b
	}
};
SndManagerWeb.prototype.stop = function(a) {
	for (var b = this.soundjs.Sound._instances,
	c = 0; c < b.length; ++c) b[c].switId === a && b[c].stop()
};
SndManagerWeb.prototype.pauseSound = function(a) {
	for (var b = this.soundjs.Sound._instances,
	c = 0; c < b.length; ++c) b[c].switId === a && b[c].pause()
};
SndManagerWeb.prototype.resumeSound = function(a) {
	for (var b = this.soundjs.Sound._instances,
	c = 0; c < b.length; ++c) b[c].switId === a && b[c].resume()
};
SndManagerWeb.prototype.setMasterVolume = function(a) {
	try {
		this.soundjs.Sound.setVolume(a)
	} catch(b) {
		Application.error("SndManagerWeb: " + b)
	}
};
SndManagerWeb.prototype.pauseAll = function() {
	for (var a = this.soundjs.Sound._instances,
	b = 0; b < a.length; ++b) a[b].pause()
};
SndManagerWeb.prototype.resumeAll = function() {
	for (var a = this.soundjs.Sound._instances,
	b = 0; b < a.length; ++b) a[b].resume()
};
SndManagerWeb.prototype.stopAllSounds = function() {
	this.soundjs.Sound.stop()
};
SndManagerWeb.prototype.removeAllSounds = function() {
	this.soundjs.Sound.removeAllSounds();
	this.soundjs.Sound = null
};
SndManagerWeb.prototype.toogleMute = function() { (this.mute = !this.mute) ? this.soundjs.Sound.setMute(!0) : this.soundjs.Sound.setMute(!1)
};
function Actor(a, b, c, d) {
	b = "undefined" !== typeof b ? b: 0;
	c = "undefined" !== typeof c ? c: 0;
	this.m_y = this.m_x = 0;
	this.m_app = this.m_clip = null;
	this.m_totalDeltaTime = this.m_frameTime = this.m_currentFrame = this.m_totalFrames = 0;
	this.m_app = "undefined" === typeof d ? Application.instance: d;
	this.m_clip = "undefined" === typeof a ? new Clip: this.m_app.getClip(a);
	this.setX(b);
	this.setY(c);
	this.m_currentFrame = 0;
	this.m_totalFrames = this.m_clip.totalFrames;
	this.m_frameTime = -1;
	this.m_totalDeltaTime = 0;
	this.loop = !0
}
Actor.prototype.setX = function(a) {
	this.m_clip.setX(a);
	this.m_x = a
};
Actor.prototype.setY = function(a) {
	this.m_clip.setY(a);
	this.m_y = a
};
Actor.prototype.free = function() {
	this.m_app = null;
	this.m_clip.parent.removeChild(this.m_clip.sprite);
	this.m_clip.free();
	this.m_clip = null
};
Actor.prototype.x = function() {
	return this.m_x
};
Actor.prototype.y = function() {
	return this.m_y
};
Actor.prototype.clip = function() {
	return this.m_clip
};
Actor.prototype.setClip = function(a) {
	this.m_clip = a;
	this.m_currentFrame = 0;
	this.m_totalFrames = this.m_clip.totalFrames;
	this.m_clip.setX(this.m_x);
	this.m_clip.setY(this.m_y)
};
Actor.prototype.setClipByName = function(a) {
	this.m_clip && this.m_clip.parent && this.m_clip.parent.removeChild(this.m_clip.sprite);
	this.setClip(this.m_app.getClip(a))
};
Actor.prototype.setFrameTime = function(a) {
	this.m_frameTime = a
};
Actor.prototype.currentFrame = function() {
	return this.m_currentFrame
};
Actor.prototype.setFrame = function(a) {
	this.m_currentFrame = a;
	this.m_currentFrame > this.m_totalFrames && (this.m_currentFrame = this.m_totalFrames)
};
Actor.prototype.update = function(a) {
	this.m_clip && (this.m_clip.setX(this.m_x), this.m_clip.setY(this.m_y), this.m_clip.update(a))
};
function ControlTouch() {
	ControlTouch.instance = this;
	this.isTouchable = Application.isMobileDevice;
	this.gameIsMultiTouch = !0;
	this.currentId = -1;
	this.canvas = document.getElementById("platform-stage").firstChild.firstChild;
	this.buttons = [];
	this.draggableObjects = [];
	this.swipeObjects = [];
	this.setCanvas()
}
ControlTouch.prototype.setMultitouchGame = function(a) {
	this.gameIsMultiTouch !== a && (this.gameIsMultiTouch = a)
};
ControlTouch.prototype.resetTouchControl = function() {
	this.currentId = -1
};
ControlTouch.prototype.setCanvas = function() {
	this.isTouchable ? (this.canvas.addEventListener("touchstart", this.onTouchStart, !1), this.canvas.addEventListener("touchmove", this.onTouchMove, !1), this.canvas.addEventListener("touchend", this.onTouchEnd, !1), this.canvas.addEventListener("touchcancel", this.onTouchLeave, !1), this.touches = []) : (this.canvas.addEventListener("mousemove", this.onMouseMove, !1), this.canvas.addEventListener("mousedown", this.onMouseDown, !1), this.canvas.addEventListener("mouseup", this.onMouseUp, !1), this.canvas.addEventListener("mouseout", this.onMouseOutWindow, !1), this.mouseY = this.mouseX = 0)
};
ControlTouch.instance = null;
ControlTouch.prototype.update = function(a) {
	for (var b = 0; b < ControlTouch.instance.swipeObjects.length; b++) ControlTouch.instance.swipeObjects[b].update(a)
};
ControlTouch.prototype.onTouchStart = function(a) {
	var b = !1;
	a = a.changedTouches;
	for (var c = 0,
	d = 0,
	c = 0; c < a.length; c++) {
		var b = !1,
		e = a[c];
		Layout.fixTouchEvent(e);
		for (d = 0; d < ControlTouch.instance.draggableObjects.length && !ControlTouch.instance.draggableObjects[d].onTouchStart(e); d++);
		for (d = 0; d < ControlTouch.instance.buttons.length; d++) if (ControlTouch.instance.buttons[d].onTouchStart(e)) {
			b = !0;
			break
		}
		for (d = 0; d < ControlTouch.instance.swipeObjects.length && !ControlTouch.instance.swipeObjects[d].onTouchStart(e); d++);
		if (Global.game && !b) if (ControlTouch.instance.gameIsMultiTouch) Global.game.onTouchStart(e);
		else - 1 === ControlTouch.instance.currentId && (b = [], b.offsetX = e.x, b.offsetY = e.y, Global.game.onMouseDown(b), ControlTouch.instance.currentId = e.identifier)
	}
};
ControlTouch.prototype.onTouchMove = function(a) {
	a = a.changedTouches;
	for (var b = 0,
	c = 0,
	b = 0; b < a.length; b++) {
		var d = a[b];
		Layout.fixTouchEvent(d);
		for (c = 0; c < ControlTouch.instance.draggableObjects.length; c++) ControlTouch.instance.draggableObjects[c].onTouchMove(d);
		if (Global.game) if (ControlTouch.instance.gameIsMultiTouch) Global.game.onTouchMove(d);
		else ControlTouch.instance.currentId === d.identifier && (c = [], c.offsetX = d.x, c.offsetY = d.y, Global.game.onMouseMove(c))
	}
};
ControlTouch.prototype.onTouchEnd = function(a) {
	var b = !1;
	a = a.changedTouches;
	for (var c = 0,
	d = 0,
	d = 0; d < a.length; d++) {
		var e = a[d];
		Layout.fixTouchEvent(e);
		for (c = 0; c < ControlTouch.instance.draggableObjects.length; c++) ControlTouch.instance.draggableObjects[c].onTouchEnd(e);
		for (c = 0; c < ControlTouch.instance.buttons.length; c++) ControlTouch.instance.buttons[c].onTouchEnd(e) && (b = !0);
		for (c = 0; c < ControlTouch.instance.swipeObjects.length; c++) ControlTouch.instance.swipeObjects[c].onTouchEnd(e);
		if (Global.game && !b) if (ControlTouch.instance.gameIsMultiTouch) Global.game.onTouchEnd(e);
		else ControlTouch.instance.currentId === e.identifier && (c = [], c.offsetX = e.x, c.offsetY = e.y, Global.game.onMouseUp(c), ControlTouch.instance.currentId = -1)
	}
};
ControlTouch.prototype.onTouchLeave = function(a) {
	this.resetTouchControl();
	if (Global.game && Global.game.onTouchLeave) Global.game.onTouchLeave()
};
ControlTouch.prototype.onMouseMove = function(a) {
	Layout.correctPosition(a);
	ControlTouch.instance.mouseX = a.offsetX;
	ControlTouch.instance.mouseY = a.offsetY;
	for (var b = 0,
	b = 0; b < ControlTouch.instance.draggableObjects.length; b++) ControlTouch.instance.draggableObjects[b].onMouseMove(a);
	for (b = 0; b < ControlTouch.instance.buttons.length && !ControlTouch.instance.buttons[b].onMouseMove(a); b++);
	if (Global.game) Global.game.onMouseMove(a)
};
ControlTouch.prototype.onMouseDown = function(a) {
	Layout.correctPosition(a);
	for (var b = !1,
	c = 0,
	c = 0; c < ControlTouch.instance.draggableObjects.length; c++) if (ControlTouch.instance.draggableObjects[c].onMouseDown(a)) {
		b = !0;
		break
	}
	for (c = 0; c < ControlTouch.instance.buttons.length; c++) if (ControlTouch.instance.buttons[c].onMouseDown(a)) {
		b = !0;
		break
	}
	for (c = 0; c < ControlTouch.instance.swipeObjects.length; c++) if (ControlTouch.instance.swipeObjects[c].onMouseDown(a)) {
		b = !0;
		break
	}
	if (Global.game && !b) Global.game.onMouseDown(a)
};
ControlTouch.prototype.onMouseUp = function(a) {
	var b;
	Layout.correctPosition(a);
	var c = !1;
	for (b = 0; b < ControlTouch.instance.draggableObjects.length; b++) ControlTouch.instance.draggableObjects[b].onMouseUp(a);
	for (b = 0; b < ControlTouch.instance.swipeObjects.length; b++) ControlTouch.instance.swipeObjects[b].onMouseUp(a);
	for (b = 0; b < ControlTouch.instance.buttons.length; b++) if (ControlTouch.instance.buttons[b].onMouseUp(a)) {
		c = !0;
		break
	}
	if (Global.game && !c) Global.game.onMouseUp(a)
};
ControlTouch.prototype.onMouseOutWindow = function(a) {
	Layout.correctPosition(a);
	if (Global.game && Global.game.onMouseOutWindow) Global.game.onMouseOutWindow(a)
};
ControlTouch.prototype.free = function() {
	this.canvas = null
};
window.onload = function() {
	document.onkeydown = function(a) {
		a.preventDefault();
		return ! 1
	};
	$.getJSON("media/strings/strings.json",
	function(a) {
		window.strings = a;
		window.switBoot()
	})
};
window.switBoot = function() {
	new Application;
	var a = document.getElementById("ios7");
	a.style.display = "none";
	var b = window.navigator.userAgent,
	b = -1 < b.indexOf("OS 7") && ( - 1 < b.indexOf("iPhone") || -1 < b.indexOf("iPod")),
	c = (20 >= window.outerHeight - window.innerHeight || window.innerHeight == window.outerHeight) && (90 == window.orientation || -90 == window.orientation) || (0 == window.orientation || 180 == window.orientation) && 480 <= window.outerHeight;
	b && !c && Application.config.settings.ios7Display && (a.style.display = "block", a.ontouchstart = function(b) {
		a.style.display = "none"
	})
};
window.onpagehide = function() {
	if (Application.instance) Application.instance.onLostFocus()
};
window.onpageshow = function() {
	if (Application.instance) Application.instance.onGotFocus()
};
window.onblur = function() {
	if (Application.instance) Application.instance.onLostFocus()
};
window.onfocus = function() {
	if (Application.instance) Application.instance.onGotFocus()
};
window.onresize = function(a) {
	Application.instance && (Application.instance.onResize(a.target.innerWidth, a.target.innerHeight), Application.instance.hideAddressBar())
};
window.onorientationchange = function(a) {
	if (Application.instance) Application.instance.onOrientationchange(a)
};
function Application() {
	Application.instance = this;
	this.soundManager = null;
	Application.MAX_DELTA_TIME = 50;
	Application.SAFE_AREA_WIDTH = 200;
	Application.APP_WIDTH = 750;
	Application.APP_HEIGHT = 500;
	Application.APP_FPS = 40;
	Application.APP_SCALE = 1;
	Application.updateable = !0;
	Application.strings = window.strings.strings;
	Application.config = window.config;
	Application.tweenManager = new TweenManager;
	Application.isMobileDevice = null !== navigator.userAgent.match(/iPad|iPhone|iPod|Android|BlackBerry|webOS/i) ? !0 : !1;
	var a = navigator.userAgent;
	Application.iOS7 = -1 < a.indexOf("OS 7") && ( - 1 < a.indexOf("iPhone") || -1 < a.indexOf("iPod"));
	Application.isIOS = window.SwitEntryPoint.infoBrowser.iDevice;
	Application.lastWidth = 0;
	Application.lastHeight = 0;
	Application.fps = 0;
	Application._fpsFrameCounter = 0;
	Application._fpsNewTime = 0;
	Application._fpsOldTime = 0;
	$("#RotateScreen").css("display", "none");
	$("#RotateScreen").css("opacity", "1");
	this.onOrientationchange(null);
	SEngine.initialize();
	Layout.scale = 1;
	Layout.align = Layout.ALIGN_CENTER;
	Layout.resizeEnable = !0;
	Layout.offsetX = 0;
	Layout.offsetY = 0;
	Application.debug = !0;
	this.guiManager = null;
	this.core = new SCore(Application.APP_WIDTH, Application.APP_HEIGHT);
	this.core.scale = Application.APP_SCALE;
	this.core.fps = Application.APP_FPS;
	this.core.app = this;
	this.input = [];
	this.keysArray = [];
	this.keysArray[Application.KEYS[0]] = 37;
	this.keysArray[Application.KEYS[1]] = 38;
	this.keysArray[Application.KEYS[2]] = 39;
	this.keysArray[Application.KEYS[3]] = 40;
	this.keysArray[Application.KEYS[4]] = 32;
	this.keysArray[Application.KEYS[5]] = 27;
	this.keysArray[Application.KEYS[6]] = 48;
	this.keysArray[Application.KEYS[7]] = 49;
	this.keysArray[Application.KEYS[8]] = 50;
	this.keysArray[Application.KEYS[9]] = 51;
	this.keysArray[Application.KEYS[10]] = 52;
	this.keysArray[Application.KEYS[11]] = 53;
	this.keysArray[Application.KEYS[12]] = 54;
	this.keysArray[Application.KEYS[13]] = 55;
	this.keysArray[Application.KEYS[14]] = 56;
	this.keysArray[Application.KEYS[15]] = 57;
	this.keysArray[Application.KEYS[16]] = 65;
	this.keysArray[Application.KEYS[17]] = 66;
	this.keysArray[Application.KEYS[18]] = 67;
	this.keysArray[Application.KEYS[19]] = 68;
	this.keysArray[Application.KEYS[20]] = 69;
	this.keysArray[Application.KEYS[21]] = 70;
	this.keysArray[Application.KEYS[22]] = 71;
	this.keysArray[Application.KEYS[23]] = 72;
	this.keysArray[Application.KEYS[24]] = 73;
	this.keysArray[Application.KEYS[25]] = 74;
	this.keysArray[Application.KEYS[26]] = 75;
	this.keysArray[Application.KEYS[27]] = 76;
	this.keysArray[Application.KEYS[28]] = 77;
	this.keysArray[Application.KEYS[29]] = 78;
	this.keysArray[Application.KEYS[30]] = 79;
	this.keysArray[Application.KEYS[31]] = 80;
	this.keysArray[Application.KEYS[32]] = 81;
	this.keysArray[Application.KEYS[33]] = 82;
	this.keysArray[Application.KEYS[34]] = 83;
	this.keysArray[Application.KEYS[35]] = 84;
	this.keysArray[Application.KEYS[36]] = 85;
	this.keysArray[Application.KEYS[37]] = 86;
	this.keysArray[Application.KEYS[38]] = 87;
	this.keysArray[Application.KEYS[39]] = 88;
	this.keysArray[Application.KEYS[40]] = 89;
	this.keysArray[Application.KEYS[41]] = 90;
	this.keysArrayPressed = [];
	for (a = a = 0; a < Application.KEYS.length; a++) this.keysArrayPressed[Application.KEYS[a]] = !1,
	this.core.keybind(this.keysArray[Application.KEYS[a]], Application.KEYS[a]);
	this.core.addEventListener("load", this.onCoreLoaded);
	this.core.addEventListener("inputstart", this.onkeyDown);
	this.core.addEventListener("inputchange", this.onkeyChange);
	this.core.addEventListener("inputend", this.onKeyUp);
	this.htmlContainer = $("#MainInterfaceAuxiliar");
	Application.instance.core.start()
}
Application.instance = null;
Application.isMobileDevice = !1;
Application.KEYS = "left up right down space scape num_0 num_1 num_2 num_3 num_4 num_5 num_6 num_7 num_8 num_9 key_a key_b key_c key_d key_e key_f key_g key_h key_i key_j key_k key_l key_m key_n key_o key_p key_q key_r key_s key_t key_u key_v key_w key_x key_y key_z".split(" ");
Application.prototype.hideAddressBar = function() {
	Application.isMobileDevice && (setTimeout(function() {
		window.scrollTo(0, 1)
	},
	20), setTimeout(function() {
		window.scrollTo(0, 0)
	},
	50))
};
Application.prototype.onLoadingError = function(a) {
	Application.error("onLoadingError: " + a)
};
Application.prototype.onSoundsLoaded = function() {
	Application.info("onSoundsLoaded");
	SndManager.instance.callbackBug && Application.instance.guiManager.gotoScreen(GuiManager.SC_MAIN_MENU)
};
Application.prototype.onErrorSndManagerIE = function() {
	Application.info("onErrorSndManagerIE");
	Application.instance.soundManager = new SndManagerWeb(Application.config.sounds, Application.instance.onSoundsLoaded)
};
Application.prototype.onCoreLoaded = function() {
	Application.info("onCoreLoaded");
	Application.instance.core.load(UIAssets.loaderBack, Application.instance.onLoaderReady, "", Application.instance.onLoadingError)
};
Application.prototype.onLoaderReady = function() {
	Application.info("onLoaderReady");
	Application.instance.guiManager = new GuiManager;
	Application.instance.guiManager.gotoScreen(GuiManager.SC_SOUND_LOADER);
	Application.instance.onResize(window.innerWidth, window.innerHeight);
	Application.instance.controlTouch = new ControlTouch;
	Application._newTime = 0;
	Application._deltaTime = 0;
	Application._oldTime = 0;
	Application._timeElapse = 0;
	Application._intervalId = setInterval(Application.instance.update, 0);
	Application.instance.soundManager = window.SwitEntryPoint.infoBrowser.isIE ? new SndManagerIE(Application.config.sounds, Application.instance.onSoundsLoaded) : new SndManagerWeb(Application.config.sounds, Application.instance.onSoundsLoaded)
};
Application.prototype.onResize = function(a, b) {
	Layout.onResize(a, b)
};
Application.prototype.onOrientationchange = function(a) {
	Application.isMobileDevice && (0 == window.orientation || 180 == window.orientation ? ($("#RotateScreen").css("display", ""), this.onLostFocus()) : ($("#RotateScreen").css("display", "none"), this.onGotFocus()))
};
Application.prototype.onLostFocus = function() {
	Application.updateable = !1;
	try {
		if (Application.info("-- ON LOST FOCUS --"), this.soundManager && this.soundManager.pauseAll(), Global.game) Global.game.onLostFocus()
	} catch(a) {
		Application.error("onLostFocus: " + a)
	}
};
Application.prototype.onGotFocus = function() {
	Application.updateable = !0;
	try {
		Application.info("-- ON GOT FOCUS --"),
		this.soundManager && this.soundManager.resumeAll()
	} catch(a) {
		Application.error("onGotFocus: " + a)
	}
};
Application.prototype.getCanvas = function() {
	return document.getElementById("platform-stage").firstChild.firstChild
};
Application.prototype.captureScreen = function() {
	var a = Application.instance.getCanvas();
	Application.log("canvas " + a);
	a = a.toDataURL();
	window.open(a, "Screenshoot", "width=750, height=500")
};
Application.prototype.update = function(a) {
	Application._newTime = Date.now();
	Application._timeElapse += Application._newTime - Application._oldTime;
	Application._oldTime = Application._newTime;
	Application._timeElapse >= 1E3 / Application.APP_FPS && (Application.updateable && (Application.instance.guiManager.update(Application._timeElapse), Application.instance.controlTouch.update(Application._timeElapse), Application.instance.core._tick(), Application.tweenManager.update()), Application._timeElapse = 0, Application._fpsFrameCounter++, Application._fpsNewTime = Application._newTime, 1E3 <= Application._fpsNewTime - Application._fpsOldTime && (Application.fps = (1E3 * (Application._fpsFrameCounter / (Application._fpsNewTime - Application._fpsOldTime))).toFixed(0), Application._fpsOldTime = Application._fpsNewTime, Application._fpsFrameCounter = 0), ConsolePanel.instance && (ConsolePanel.instance.clearPersistent(), ConsolePanel.instance.fps(Application.fps)));
	if (window.innerWidth !== Application.lastWidth || window.innerHeight !== Application.lastHeight) Application.lastWidth = window.innerWidth,
	Application.lastHeight = window.innerHeight,
	Application.instance.onResize(window.innerWidth, window.innerHeight),
	Application.iOS7 && Application.instance.hideAddressBar()
};
Application.gameData = null;
Application.strings = null;
Application.prototype.addDisplayContainer = function() {
	return new SGroup
};
Application.prototype.getClip = function(a) {
	var b = window.Assets.assetsParams[a];
	if ("undefined" !== typeof b && null !== b) return new Clip(0, 0, b.u, b.w, b.h, b.f, b.fps, b.cx, b.cy, b.collision, b.bounds, b.boundsAttack);
	Application.error("getClip: params not found: " + a)
};
Application.prototype.getDisplayObject = function(a) {
	var b = window.Assets.assetsParams[a];
	"undefined" === typeof b && Application.error("IMAGE NOT FOUND");
	b = new SDisplayObject(b.w, b.h);
	b.setImage(a);
	return b
};
Application.prototype.onMouseDown = function(a) {
	Layout.fixPosition(a);
	if (Application.instance.guiManager) Application.instance.guiManager.onMouseDown(a)
};
Application.prototype.onMouseMove = function(a) {
	Layout.fixPosition(a);
	if (Application.instance.guiManager) Application.instance.guiManager.onMouseMove(a)
};
Application.prototype.onMouseUp = function(a) {
	Layout.fixPosition(a);
	if (Application.instance.guiManager) Application.instance.guiManager.onMouseUp(a)
};
Application.prototype.onkeyDown = function(a) {
	for (a = 0; a < Application.KEYS.length; a++) if (this.input[Application.KEYS[a]]) {
		Application.instance.keysArrayPressed[Application.KEYS[a]] = !0;
		if (Application.instance.guiManager) Application.instance.guiManager.onKeyDown(Application.instance.keysArray[Application.KEYS[a]]);
		break
	}
};
Application.prototype.onkeyChange = function(a) {
	for (a = 0; a < Application.KEYS.length; a++) if (!0 == this.input[Application.KEYS[a]] && !Application.instance.keysArrayPressed[Application.KEYS[a]]) {
		Application.instance.keysArrayPressed[Application.KEYS[a]] = !0;
		if (Application.instance.guiManager) Application.instance.guiManager.onKeyDown(Application.instance.keysArray[Application.KEYS[a]]);
		break
	} else if (!1 == this.input[Application.KEYS[a]] && Application.instance.keysArrayPressed[Application.KEYS[a]]) {
		Application.instance.keysArrayPressed[Application.KEYS[a]] = !1;
		if (Application.instance.guiManager) Application.instance.guiManager.onKeyUp(Application.instance.keysArray[Application.KEYS[a]]);
		break
	}
};
Application.prototype.onKeyUp = function(a) {
	for (a = 0; a < Application.KEYS.length; a++) if (!1 == this.input[Application.KEYS[a]] && Application.instance.keysArrayPressed[Application.KEYS[a]]) {
		Application.instance.keysArrayPressed[Application.KEYS[a]] = !1;
		if (Application.instance.guiManager) Application.instance.guiManager.onKeyUp(Application.instance.keysArray[Application.KEYS[a]]);
		break
	}
};
Application.prototype.removeSceneUpdate = function() {
	this.core.currentScene.dispatchEvent(new SEvent(SEvent.EXIT))
};
Application.prototype.addSceneUpdate = function() {
	this.core.currentScene.dispatchEvent(new SEvent(SEvent.ENTER))
};
Application.prototype.playSound = function(a) {
	this.soundManager.play(a)
};
Application.prototype.stopSound = function(a) {
	this.soundManager.stop(a)
};
Application.prototype.stopAllSounds = function() {
	this.soundManager.stopAllSounds()
};
Application.prototype.toogleMute = function() {
	this.soundManager.toogleMute()
};
Application.prototype.isSoundOn = function() {
	return this.soundManager.mute
};
Application.prototype.pauseAllSounds = function() {
	this.soundManager.pauseAll()
};
Application.prototype.resumeAllSounds = function() {
	this.soundManager.resumeAll()
};
Application.persistent = function(a) {
	ConsolePanel.instance && ConsolePanel.instance.persistent(a)
};
Application.log = function(a) {
	Application.logsEnabled && (window.console && window.console.log && window.console.log("[LOG] " + a), window.Debug && window.Debug.writeln("[LOG] " + a), ConsolePanel.instance && ConsolePanel.instance.log(a))
};
Application.info = function(a) {
	window.console && window.console.info && window.console.info("[INFO] " + a);
	window.Debug && window.Debug.writeln("[INFO] " + a);
	ConsolePanel.instance && ConsolePanel.instance.info(a)
};
Application.warn = function(a) {
	window.console && window.console.warn && window.console.warn("[WARN] " + a);
	window.Debug && window.Debug.writeln("[WARN] " + a);
	ConsolePanel.instance && ConsolePanel.instance.warn(a)
};
Application.error = function(a) {
	window.console && window.console.error && window.console.error("[ERROR] " + a);
	window.Debug && window.Debug.writeln("[ERROR] " + a);
	ConsolePanel.instance && ConsolePanel.instance.error(a)
};
Application.errorIf = function(a, b) {
	a || Application.error(b)
};
Application.fatal = function(a) {
	Application.error("[FATAL] " + a);
	throw Error(a);
};
Application.assert = function(a, b) {
	a || Application.fatal(b)
};
Application.logsEnabled = !0;
function Character(a, b, c) {
	this.onEndAnimation = null;
	this.m_states = [];
	this.m_currentState = 0;
	this.m_currentActor = null;
	this.m_x = a;
	this.m_y = b;
	this.m_functions = [];
	this.m_canvas = c;
	this.m_lastFrame = 0;
	this.worldActor = null;
	this.depth = 0
}
Character.prototype.setDepth = function(a) {
	this.m_currentActor && this.m_currentActor.clip() && (this.m_currentActor.clip().sprite._depth = a);
	this.depth = a
};
Character.prototype.getState = function() {
	return this.m_currentState
};
Character.prototype.actor = function() {
	return this.m_currentActor
};
Character.prototype.getActor = function() {
	return this.m_currentActor
};
Character.prototype.getX = function() {
	return this.m_x
};
Character.prototype.getY = function() {
	return this.m_y
};
Character.prototype.setX = function(a) {
	this.m_x = a;
	this.m_currentActor && this.m_currentActor.setX(this.m_x)
};
Character.prototype.setY = function(a) {
	this.m_y = a;
	this.m_currentActor && this.m_currentActor.setY(this.m_y)
};
Character.prototype.addState = function(a, b, c) {
	this.m_states[a] = b;
	c = "undefined" !== typeof c ? c: [];
	0 < c.length ? this.m_functions[a] = c: delete this.m_functions[a]
};
Character.prototype.gotoState = function(a, b) {
	this.m_states[a] || "undefined" === typeof this.m_states[a] ? (this.m_currentState = a, null !== this.m_currentActor && (this.m_currentActor.clip().setAlpha(0), this.m_currentActor.free(), this.m_currentActor = null), this.m_currentActor = new Actor(this.m_states[a], this.m_x, this.m_y), this.m_currentActor.clip().setAlpha(0), this.m_currentActor.clip().sprite._depth = this.depth, this.m_canvas.addChild(this.m_currentActor.clip().sprite), this.m_currentActor.clip().parent = this.m_canvas, this.m_currentActor.clip().setAlpha(1), this.m_lastFrame = this.m_currentActor.clip().totalFrames) : Application.error("Character::gotoState() - State: [" + a + "] is not registered")
};
Character.prototype.update = function(a) {
	if (this.m_functions && this.worldActor && this.m_functions[this.m_currentState]) for (var b = 0; b < this.m_functions[this.m_currentState].length; b++) if (null !== this.m_functions[this.m_currentState][b][0] && this.m_functions[this.m_currentState][b][1] === this.m_currentActor.clip().currentFrame) {
		this.worldActor[this.m_functions[this.m_currentState][b][0]]();
		break
	}
	if (null !== this.m_currentActor && (this.m_currentActor.setX(this.m_x), this.m_currentActor.setY(this.m_y), this.m_currentActor.update(a), this.m_lastFrame - 1 === this.m_currentActor.clip().currentFrame && this.onEndAnimation && this.worldActor)) this.worldActor[this.onEndAnimation](this.m_currentState)
};
Character.prototype.free = function() {
	null !== this.m_currentActor && (this.m_currentActor.free(), this.m_currentActor = null);
	this.worldActor = this.m_states = this.m_functions = this.m_canvas = null
};
function Layout() {}
Layout.ALIGN_TOP_LEFT = 0;
Layout.ALIGN_TOP_CENTER = 1;
Layout.ALIGN_CENTER = 2;
Layout.scale = 1;
Layout.align = 0;
Layout.resizeEnable = !1;
Layout.offsetX = 0;
Layout.offsetY = 0;
Layout.top = 0;
Layout.left = 0;
Layout.width = 0;
Layout.height = 0;
Layout.supports3dTransform = window.WebKitCSSMatrix || window.MSCSSMatrix;
Layout.onResize = function(a, b) {
	Layout.width = Math.floor(a);
	Layout.height = Math.floor(b);
	Layout.resizeEnable && (Layout.scale = Math.min(1 - (1 - a / Application.APP_WIDTH), 1 - (1 - b / Application.APP_HEIGHT)));
	Layout.top = 0;
	Layout.left = 0;
	switch (Layout.align) {
	case Layout.ALIGN_TOP_LEFT:
		Layout.top = 0;
		Layout.left = 0;
		break;
	case Layout.ALIGN_TOP_CENTER:
		Layout.top = 0;
		Layout.left = 0.5 * a - 0.5 * Application.APP_WIDTH * Layout.scale;
		break;
	case Layout.ALIGN_CENTER:
		Layout.top = 0.5 * b - 0.5 * Application.APP_HEIGHT * Layout.scale,
		Layout.left = 0.5 * a - 0.5 * Application.APP_WIDTH * Layout.scale
	}
	Layout.top += Layout.offsetY;
	Layout.left += Layout.offsetX;
	Layout.top = Math.floor(Layout.top);
	Layout.left = Math.floor(Layout.left);
	Layout.scale = Layout.scale.toFixed(2);
	Layout.css("#MainInterfaceAuxiliar", "transform-origin", "0px 0px");
	Layout.css("#MainInterface", "transform-origin", "0px 0px");
	Layout.css("#MainInterfacePopup", "transform-origin", "0px 0px");
	Layout.css("#platform-stage", "transform-origin", "0px 0px");
	Layout.css("#RotateScreen", "transform-origin", "0px 0px");
	Layout.supports3dTransform ? (Layout.css("#platform-stage", "transform", "matrix3d(" + Layout.scale + ",0,0,0, 0," + Layout.scale + ",0,0, 0,0," + Layout.scale + ",0, " + Layout.left + "," + Layout.top + ",0,1)"), Layout.css("#MainInterface", "transform", "matrix3d(" + Layout.scale + ",0,0,0, 0," + Layout.scale + ",0,0, 0,0," + Layout.scale + ",0, " + Layout.left + "," + Layout.top + ",0,1)"), Layout.css("#MainInterfacePopup", "transform", "matrix3d(" + Layout.scale + ",0,0,0, 0," + Layout.scale + ",0,0, 0,0," + Layout.scale + ",0, " + Layout.left + "," + Layout.top + ",0,1)"), Layout.css("#MainInterfaceAuxiliar", "transform", "matrix3d(" + Layout.scale + ",0,0,0, 0," + Layout.scale + ",0,0, 0,0," + Layout.scale + ",0, " + Layout.left + "," + Layout.top + ",0,1)"), Layout.css("#RotateScreen", "transform", "matrix3d(" + Layout.scale + ",0,0,0, 0," + Layout.scale + ",0,0, 0,0," + Layout.scale + ",0, " + Layout.left + "," + Layout.top + ",0,1)")) : (Layout.css("#MainInterfaceAuxiliar", "transform", "scale(" + Layout.scale + ", " + Layout.scale + ")"), Layout.css("#MainInterface", "transform", "scale(" + Layout.scale + ", " + Layout.scale + ")"), Layout.css("#MainInterfacePopup", "transform", "scale(" + Layout.scale + ", " + Layout.scale + ")"), Layout.css("#platform-stage", "transform", "scale(" + Layout.scale + " , " + Layout.scale + ")"), Layout.css("#RotateScreen", "transform", "scale(" + Layout.scale + " , " + Layout.scale + ")"), Layout.positionCss("#platform-stage", Layout.top, Layout.left), Layout.positionCss("#MainInterface", Layout.top, Layout.left), Layout.positionCss("#MainInterfacePopup", Layout.top, Layout.left), Layout.positionCss("#MainInterfaceAuxiliar", Layout.top, Layout.left));
	if (ConsolePanel.instance) ConsolePanel.instance.onResize()
};
Layout.fixPosition = function(a) {
	a.x = Math.floor((a.x - Layout.left) / Layout.scale);
	a.y = Math.floor((a.y - Layout.top) / Layout.scale)
};
Layout.correctPosition = function(a) {
	a.offsetX || (a.offsetX = (a.clientX - Layout.left) / Layout.scale, a.offsetY = (a.clientY - Layout.top) / Layout.scale)
};
Layout.fixTouchEvent = function(a) {
	a.offsetX = a.x = Math.floor((a.clientX - Layout.left) / Layout.scale);
	a.offsetY = a.y = Math.floor((a.clientY - Layout.top) / Layout.scale)
};
Layout.positionCss = function(a, b, c) {
	$(a).css("top", b + "px");
	$(a).css("left", c + "px")
};
Layout.css = function(a, b, c) {
	$(a).css("-ms-" + b, c);
	$(a).css("-webkit-" + b, c);
	$(a).css("-moz-" + b, c);
	$(a).css("-o-" + b, c);
	$(a).css(b, c)
};
function Point(a, b) {
	this.x = "undefined" === typeof a ? 0 : a;
	this.y = "undefined" === typeof b ? 0 : b
}
Point.prototype.distanceTo = function(a, b) {
	return Math.sqrt((a - this.x) * (a - this.x) + (b - this.y) * (b - this.y))
};
function Rectangle(a, b, c, d) {
	this.x = "undefined" !== typeof a ? a: 0;
	this.y = "undefined" !== typeof b ? b: 0;
	this.w = "undefined" !== typeof c ? c: 0;
	this.h = "undefined" !== typeof d ? d: 0
}
Rectangle.prototype.left = function() {
	return this.x
};
Rectangle.prototype.right = function() {
	return this.x + this.w
};
Rectangle.prototype.top = function() {
	return this.y
};
Rectangle.prototype.bottom = function() {
	return this.y + this.h
};
Rectangle.prototype.intersectPoint = function(a, b) {
	return a >= this.x && a <= this.x + this.w && b >= this.y && b <= this.y + this.h
};
Rectangle.prototype.intersectRect = function(a) {
	return this.right() >= a.x && this.x <= a.right() && this.bottom() >= a.y && this.y <= a.bottom()
};
Rectangle.prototype.containsRect = function(a) {
	return a.x >= this.x && a.y >= this.y && a.right() <= this.right() && a.bottom() <= this.bottom()
};
Rectangle.prototype.clone = function() {
	return new Rectangle(this.x, this.y, this.w, this.h)
};
Rectangle.prototype.toString = function() {
	return "x:" + this.x + " y:" + this.y + " w:" + this.w + " h:" + this.h
};
function SScreen(a, b, c) {
	this.screenParent = "undefined" === typeof c ? null: c;
	this.id = GuiManager.instance.m_currentScreenName.concat();
	this.scene = Application.instance.addDisplayContainer();
	Application.instance.core.rootScene.addChild(this.scene);
	this.cssContainer = this.htmlContainer = this.html = this.css = null;
	this.skipCode = 32;
	this.m_x = "undefined" === typeof a ? 0 : a;
	this.m_y = "undefined" === typeof b ? 0 : b;
	this.m_popup = null;
	this.m_spaceBarEnabled = !1;
	this.m_toolTips = null;
	this.setGuiHTML();
	this.init();
	this.scene.addDrawListener(this, "onDraw")
}
SScreen.prototype.init = function() {};
SScreen.prototype.onDraw = function(a) {};
SScreen.prototype.setGuiHTML = function() {
	if (null !== this.css) {
		this.cssContainer = null === this.screenParent ? $("#MainInterface") : $("#MainInterfacePopup");
		var a = document.createElement("style");
		a.type = "text/css";
		a.innerHTML = this.css;
		this.cssContainer.append(a)
	}
	null !== this.html && (this.htmlContainer = null === this.screenParent ? $("#MainInterface") : $("#MainInterfacePopup"), this.htmlContainer.append(this.html))
};
SScreen.prototype.addClickListener = function(a) {
	if (null !== this.htmlContainer) {
		var b = $("#" + a),
		c = this;
		0 < b.length ? b.bind("touchstart click",
		function(a) {
			c.onClick(this)
		}) : Application.error("Error[" + this.id + "] object [" + a + "] no found")
	}
};
SScreen.prototype.addMouseDownListener = function(a) {
	if (null !== this.htmlContainer) {
		var b = $("#" + a),
		c = this;
		0 < b.length ? b.mousedown(function() {
			c.onMouseDown(this)
		}) : Application.error("Error[" + this.id + "] object [" + a + "] no found")
	}
};
SScreen.prototype.addMouseUpListener = function(a) {
	if (null !== this.htmlContainer) {
		var b = $("#" + a),
		c = this;
		0 < b.length ? b.mouseup(function() {
			c.onMouseUp(this)
		}) : Application.error("Error[" + this.id + "] object [" + a + "] no found")
	}
};
SScreen.prototype.onClick = function(a) {};
SScreen.prototype.onMouseDown = function(a) {};
SScreen.prototype.onMouseUp = function(a) {};
SScreen.prototype.getPopup = function() {
	return this.m_popup
};
SScreen.prototype.setX = function(a) {};
SScreen.prototype.setY = function(a) {};
SScreen.prototype.activePressBar = function() {
	this.m_spaceBarEnabled = !0
};
SScreen.prototype.onPressSpaceBar = function() {
	this.m_spaceBarEnabled = !1
};
SScreen.prototype.update = function(a) {
	this.m_popup && this.m_popup.update(a)
};
SScreen.prototype.onResize = function(a) {
	if (this.m_popup) this.m_popup.onResize(a)
};
SScreen.prototype.onMouseOver = function(a) {
	if (this.m_popup) this.m_popup.onMouseOver(a)
};
SScreen.prototype.onMouseMove = function(a) {
	if (this.m_popup) this.m_popup.onMouseMove(a)
};
SScreen.prototype.onMouseDown = function(a) {
	if (this.m_popup) this.m_popup.onMouseDown(a)
};
SScreen.prototype.onMouseUp = function(a) {
	if (this.m_popup) this.m_popup.onMouseUp(a)
};
SScreen.prototype.onKeyDown = function(a) {
	if (this.m_popup) this.m_popup.onKeyDown(a);
	if (this.m_spaceBarEnabled && a === this.skipCode) this.onPressSpaceBar()
};
SScreen.prototype.onKeyUp = function(a) {
	if (this.m_popup) this.m_popup.onKeyUp(a)
};
SScreen.prototype.onActivate = function(a) {
	if (this.m_popup) this.m_popup.onActivate(a)
};
SScreen.prototype.addPopup = function(a, b, c) {
	this.dropPopup();
	return this.m_popup = new a(b, c, this)
};
SScreen.prototype.dropPopup = function() {
	this.m_popup && (this.m_popup.free(), this.m_popup = null)
};
SScreen.prototype.destroyToolTips = function() {};
SScreen.prototype.createTooltips = function(a, b, c, d, e) {};
SScreen.prototype.free = function() {
	var a = document.getElementById("platform-stage");
	a && a.focus();
	this.dropPopup();
	this.destroyToolTips();
	this.screenParent = null;
	null !== this.htmlContainer && (this.htmlContainer.empty(), this.htmlContainer = null);
	this.css = this.html = this.cssContainer = null;
	this.scene && (Application.instance.core.rootScene.removeChild(this.scene), this.scene = null)
};
function ScreenGame(a, b) {
	SScreen.call(this, a, b);
	this.game = null;
	this.deleteGame = !1
}
goog.inherits(ScreenGame, SScreen);
ScreenGame.prototype.createGame = function() {};
ScreenGame.prototype.free = function() {
	this.game && (this.game.free(), this.game = null);
	ScreenGame.superClass_.free.call(this)
};
ScreenGame.prototype.init = function() {
	ScreenGame.superClass_.init.call(this)
};
ScreenGame.prototype.update = function(a) {
	this.game && null === this.m_popup && this.game.update(a);
	this.m_popup && this.m_popup.update(a);
	this.m_transition && (this.m_transition.isAwaitingDelete ? (this.m_transition.free(), this.m_transition = null) : this.m_transition.update(a))
};
ScreenGame.prototype.onKeyDown = function(a) {
	ScreenGame.superClass_.onKeyDown.call(this, a);
	if (this.game && null == this.m_popup) this.game.onKeyDown(a)
};
ScreenGame.prototype.onKeyUp = function(a) {
	ScreenGame.superClass_.onKeyUp.call(this, a);
	if (this.game && null == this.m_popup) this.game.onKeyUp(a)
};
ScreenGame.prototype.onMouseUp = function(a) {
	ScreenGame.superClass_.onMouseUp.call(this, a);
	if (this.game && null == this.m_popup) this.game.onMouseUp(a)
};
ScreenGame.prototype.onMouseDown = function(a) {
	ScreenGame.superClass_.onMouseDown.call(this, a);
	if (this.game && null == this.m_popup) this.game.onMouseDown(a)
};
ScreenGame.prototype.onMouseMove = function(a) {
	ScreenGame.superClass_.onMouseMove.call(this, a);
	if (this.game && null == this.m_popup) this.game.onMouseMove(a)
};
ScreenGame.prototype.onActivate = function(a) {
	if (this.game) this.game.onActivate(a)
};
function ScreenManager() {
	this.m_currentScreenName = this.m_currentScreen = this.currentScene = null
}
ScreenManager.prototype.getCurrentScreen = function() {
	return this.m_currentScreen
};
ScreenManager.prototype.getCurrentScreenName = function() {
	return this.m_currentScreenName
};
ScreenManager.prototype.gotoScreen = function(a) {
	this.m_currentScreen && this.m_currentScreen.free();
	this.m_currentScreen = null;
	this.m_currentScreenName = a;
	Application.log("GO TO SCREEN :: " + a)
};
ScreenManager.prototype.update = function(a) {
	a > Application.MAX_DELTA_TIME && (a = Application.MAX_DELTA_TIME);
	this.m_currentScreen && this.m_currentScreen.update(a)
};
ScreenManager.prototype.onResize = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onResize(a)
};
ScreenManager.prototype.onMouseOver = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onMouseOver(a)
};
ScreenManager.prototype.onMouseMove = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onMouseMove(a)
};
ScreenManager.prototype.onMouseDown = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onMouseDown(a)
};
ScreenManager.prototype.onMouseUp = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onMouseUp(a)
};
ScreenManager.prototype.onKeyDown = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onKeyDown(a)
};
ScreenManager.prototype.onKeyUp = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onKeyUp(a)
};
ScreenManager.prototype.onActivate = function(a) {
	if (this.m_currentScreen) this.m_currentScreen.onActivate(a)
};
ScreenManager.prototype.free = function() {
	this.m_currentScreen && this.m_currentScreen.free();
	this.m_currentScreenName = this.m_currentScreen = null
};
function Vector2D(a, b) {
	this.x = "undefined" === typeof a ? 0 : a;
	this.y = "undefined" === typeof b ? 0 : b
}
Vector2D.prototype.setVector = function(a, b) {
	this.x = a * Math.cos(b);
	this.y = a * Math.sin(b)
};
Vector2D.prototype.distanceTo = function(a, b) {
	return Math.sqrt((a - this.x) * (a - this.x) + (b - this.y) * (b - this.y))
};
Vector2D.prototype.clone = function() {
	return new Vector2D(this.x, this.y)
};
Vector2D.prototype.plus = function(a) {
	return new Vector2D(this.x + a.x, this.y + a.y)
};
Vector2D.prototype.minus = function(a) {
	return new Vector2D(this.x - a.x, this.y - a.y)
};
Vector2D.prototype.orthogonal = function() {
	return new Vector2D( - this.y, this.x)
};
Vector2D.prototype.udir = function() {
	var a = this.clone();
	a.normalize();
	return a
};
Vector2D.prototype.projectionOn = function(a) {
	var b = a.dot(a);
	if (0 == b) return Application.warn("[WARN] Vector2D.projectionOn: zero-length projection vector."),
	this.clone();
	var c = a.clone();
	c.scale(this.dot(a) / b);
	return c
};
Vector2D.prototype.dot = function(a) {
	return this.x * a.x + this.y * a.y
};
Vector2D.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y)
};
Vector2D.prototype.squaredLength = function() {
	return this.x * this.x + this.y * this.y
};
Vector2D.prototype.copy = function(a) {
	this.x = a.x;
	this.y = a.y
};
Vector2D.prototype.scale = function(a) {
	this.x *= a;
	this.y *= a
};
Vector2D.prototype.normalize = function() {
	var a = this.length();
	0 < a ? (this.x /= a, this.y /= a) : Application.warn("[WARN]: Vector2D.normalize: called on a zero-length vector.")
};
Vector2D.prototype.stretch = function(a) {
	var b = this.length();
	0 < b ? (this.x *= a / b, this.y *= a / b) : Application.warn("[WARN]: Vector2D.stretch: called on a zero-length vector.")
};
Vector2D.prototype.silentNormalize = function() {
	var a = this.length();
	0 < a && (this.x /= a, this.y /= a)
};
Vector2D.prototype.add = function(a) {
	this.x += a.x;
	this.y += a.y
};
Vector2D.prototype.subtract = function(a) {
	this.x -= a.x;
	this.y -= a.y
};
Vector2D.prototype.product = function(a) {
	return this.y * a.x - this.x * a.y
};
Vector2D.prototype.angle = function() {
	return Math.atan2(this.y, this.x)
};
Vector2D.prototype.toString = function() {
	return "V2D x:" + this.x + " y:" + this.y
};
function SGame(a) {
	SGame.instance = this;
	this.m_canvas = a;
	this.m_hud = null;
	this.m_score = this.m_lives = 0;
	this.m_isAwaitingDelete = this.m_isAwaitReset = !1;
	this.init()
}
SGame.instance = null;
SGame.prototype.init = function() {};
SGame.prototype.update = function(a) {
	this.m_hud && this.m_hud.update(a)
};
SGame.prototype.onKeyDown = function(a) {};
SGame.prototype.onKeyUp = function(a) {};
SGame.prototype.onActivate = function(a) {};
SGame.prototype.onPointerPress = function(a) {};
SGame.prototype.onPointerMove = function(a) {};
SGame.prototype.onPointerRelease = function(a) {};
SGame.prototype.free = function() {
	this.m_hud && this.m_hud.free();
	this.m_hud = null
};
SGame.prototype.onMouseDown = function(a) {
	this.onPointerPress(a)
};
SGame.prototype.onMouseUp = function(a) {
	this.onPointerRelease(a)
};
SGame.prototype.onMouseMove = function(a) {
	this.onPointerMove(a)
};
SGame.prototype.onTouchStart = function(a) {
	this.onPointerPress(a)
};
SGame.prototype.onTouchEnd = function(a) {
	this.onPointerRelease(a)
};
SGame.prototype.onTouchMove = function(a) {
	this.onPointerMove(a)
};
function DataMovement(a, b) {
	this.isReverse = this.isLoop = !1;
	this.speed = 0;
	this.motionParams = null;
	var c = Common.getParams(a);
	this.isLoop = 1 == parseInt(c.loop, 10);
	this.isReverse = 1 == parseInt(c.reverse, 10);
	this.speed = parseFloat(c.speed);
	this.setMotionParams(b)
}
DataMovement.prototype.setMotionParams = function(a) {
	this.motionParams = [];
	a = a.split(";");
	for (var b = 0; b < a.length;) {
		var c = [],
		d = a[b].split(":");
		if (2 > d.length) Application.error("DataMovement::setMotionParams(): " + a[b]);
		else {
			c.push(d[0]);
			for (var d = d[1].split(","), e = 0; e < d.length;) c.push(d[e]),
			++e;
			this.motionParams.push(c)
		}++b
	}
};
DataMovement.prototype.free = function() {
	this.motionParams = null
};
function Clip(a, b, c, d, e, f, g, h, k, l, m, n) {
	this.parent = null;
	this.isAwaitingDeletion = !1;
	this.x = "undefined" !== typeof a ? a: 0;
	this.y = "undefined" !== typeof b ? b: 0;
	this.width = "undefined" !== typeof d ? d: 0;
	this.height = "undefined" !== typeof e ? e: 0;
	f = "undefined" !== typeof f ? f: [];
	g = "undefined" !== typeof g ? g: 0;
	this.cx = "undefined" !== typeof h ? h: 0;
	this.cy = "undefined" !== typeof k ? k: 0;
	this.centerX = h;
	this.centerY = k;
	this.ratio = Math.sqrt(this.cx * this.cx + this.cy * this.cy);
	this.offsetRotationY = this.offsetRotationX = 0;
	l = "undefined" !== typeof l ? l: "";
	m = "undefined" !== typeof m ? m: "";
	n = "undefined" !== typeof n ? n: "";
	this.rotation = 0;
	this.sprite = new SSprite(this.width, this.height);
	this.scaleY = this.scaleX = 1;
	this.m_name = c;
	this.m_bounds = null;
	this.m_stopped = !1;
	this.m_loop = !0;
	this.m_layers = [];
	"undefined" !== typeof c && (this.sprite.setImage(Application.instance.core.assets[Global.URL_ASSETS + c]), "" == l && "" == m ? this.m_bounds = new Rectangle( - this.cx, -this.cy, d, e) : "" != m ? (a = Common.getParams(m), this.bounds = this.m_bounds = new Rectangle(parseInt(a.x, 10), parseInt(a.y, 10), parseInt(a.w, 10), parseInt(a.h, 10))) : "" != l && (a = Common.getParams(l), this.collision = this.m_bounds = new Rectangle(parseInt(a.x, 10), parseInt(a.y, 10), parseInt(a.w, 10), parseInt(a.h, 10))), "" != n && (a = Common.getParams(n), this.boundsAttack = new Rectangle(parseInt(a.x, 10), parseInt(a.y, 10), parseInt(a.w, 10), parseInt(a.h, 10))));
	this.frames = f;
	this.sprite.setPosition(this.x - this.centerX, this.y - this.centerY);
	this.sprite.setFrame(this.frames[0]);
	this.m_changeTimeCounter = 0;
	this.m_changeTime = 1 / g;
	this.m_changeTime *= 1E3;
	this.currentFrame = 0;
	this.totalFrames = f.length;
	this.sprite.originX = this.cx;
	this.sprite.originY = this.cy
}
Clip.prototype.free = function() {
	null !== this.sprite && this.sprite.remove();
	this.sprite = null;
	for (var a in this) this[a] = null
};
Clip.prototype.layers = function() {
	return this.m_layers
};
Clip.prototype.stop = function() {
	this.m_stopped = !0
};
Clip.prototype.gotoFrame = function(a) {
	this.currentFrame != a && (this.currentFrame = a, this.sprite.setFrame(this.frames[this.currentFrame]))
};
Clip.prototype.gotoAndStop = function(a) {
	this.gotoFrame(a - 1);
	this.stop()
};
Clip.prototype.gotoAndPlay = function(a, b) {
	this.gotoFrame(a - 1);
	this.m_loop = b;
	this.play()
};
Clip.prototype.name = function() {
	return this.m_name
};
Clip.prototype.play = function() {
	this.m_stopped = !1
};
Clip.prototype.update = function(a) {
	this.m_stopped || (this.m_changeTimeCounter += a, this.m_changeTimeCounter >= this.m_changeTime && (this.m_changeTimeCounter -= this.m_changeTime, this.currentFrame >= this.totalFrames - 1 ? this.m_loop ? this.currentFrame = 0 : (this.m_loop = !1, this.stop()) : this.currentFrame++, this.sprite._setFrame(this.frames[this.currentFrame])))
};
Clip.prototype.setOnAnimationEnd = function(a) {
	this.m_onAnimationEnd = a
};
Clip.prototype.setLoop = function(a) {
	this.m_loop = a
};
Clip.prototype.hitTest = function(a) {
	return this.sprite.intersect(a.sprite)
};
Clip.prototype.getPosition = function(a, b) {
	return new Vector2D(this.x, this.y)
};
Clip.prototype.getBounds = function() {
	return this.m_bounds
};
Clip.prototype.getGlobalBounds = function() {
	return this.m_bounds ? new Rectangle(this.x + this.m_bounds.x, this.y + this.m_bounds.y, this.m_bounds.w, this.m_bounds.h) : null
};
Clip.prototype.setPosition = function(a, b) {
	this.setX(a);
	this.setY(b)
};
Clip.prototype.setX = function(a) {
	this.x = a;
	this.sprite.setX(this.x - this.centerX)
};
Clip.prototype.setY = function(a) {
	this.y = a;
	this.sprite.setY(this.y - this.centerY)
};
Clip.prototype.setRotation = function(a) {
	this.rotation = a;
	this.sprite.originX = this.cx;
	this.sprite.originY = this.cy;
	this.rotation = a;
	this.sprite.setRotation(a)
};
Clip.prototype.setScale = function(a, b) {
	this.scaleX = a;
	this.scaleY = b;
	this.sprite.setScale(a, b)
};
Clip.prototype.setScaleX = function(a) {
	this.scaleX = a;
	this.sprite.setScaleX(a);
	this.centerX = 0 < a ? this.cx: this.width - this.cx
};
Clip.prototype.setScaleY = function(a) {
	this.scaleY = a;
	this.sprite.setScaleY(a);
	this.centerY = 0 < a ? this.cy: this.height - this.cy;
	this.sprite.setPosition(this.x - this.centerX, this.y - this.centerY)
};
Clip.prototype.resize = function(a, b) {
	this.setScale(a / this.width, b / this.height)
};
Clip.prototype.setVisible = function(a) {
	this.sprite.visible = a
};
Clip.prototype.isVisible = function() {
	return this.sprite.visible
};
Clip.prototype.setAlpha = function(a) {
	this.sprite.opacity = parseFloat(a)
};
Clip.prototype.getAlpha = function() {
	return this.sprite.opacity
};
Clip.prototype.getGlobalX = function() {
	return null === this.parent ? this.x: this.x + this.parent.getGlobalX()
};
Clip.prototype.getGlobalY = function() {
	return null === this.parent ? this.y: this.y + this.parent.getGlobalY()
};
Clip.prototype.nextFrame = function() {
	this.gotoFrame(this.currentFrame + 1);
	this.stop()
};
function VU_WorldActor(a, b, c, d, e, f, g) {
	this.m_state = "0";
	this.m_paramsValue = this.m_paramsId = null;
	this.parse(e);
	this.m_health = this.m_depth = this.m_tempPosY = this.m_tempPosX = this.m_oldY = this.m_oldX = this.m_y = this.m_x = 0;
	this.m_scaleY = this.m_scaleX = this.m_scale = 1;
	this.m_collisionDisplay = this.m_character = this.m_clip = this.m_boundsAttack = this.m_boundsCollision = this.m_bounds = null;
	this.m_canvas = a;
	this.m_world = b;
	this.m_isAwaitingDelete = this.m_flipX = this.m_collisionVisible = this.m_isIdle = !1;
	this.m_id = f;
	this.setActorClip(g);
	this.setPosition(c, d);
	this.m_rawData = null
}
VU_WorldActor.prototype.parse = function(a) {
	if (null != a && "" != a) {
		this.m_paramsId = [];
		this.m_paramsValue = [];
		a = a.split(";");
		for (var b = 0; b < a.length; b++) this.m_paramsId.push(a[b].split(":")[0]),
		this.m_paramsValue.push(a[b].split(":")[1])
	}
};
VU_WorldActor.prototype.setDepth = function(a) {
	this.m_character && this.m_character.setDepth(a)
};
VU_WorldActor.prototype.getHealth = function() {
	return this.m_health
};
VU_WorldActor.prototype.setHealth = function(a) {
	this.m_health = a
};
VU_WorldActor.prototype.isAwaitingDelete = function() {
	return this.m_isAwaitingDelete
};
VU_WorldActor.prototype.setAwaitingDelete = function(a) {
	this.m_isAwaitingDelete = a
};
VU_WorldActor.prototype.clip = function() {
	return this.m_clip
};
VU_WorldActor.prototype.bounds = function() {
	return this.m_bounds
};
VU_WorldActor.prototype.world = function() {
	return this.m_world
};
VU_WorldActor.prototype.isIdle = function() {
	return this.m_isIdle
};
VU_WorldActor.prototype.depth = function() {
	return this.m_depth
};
VU_WorldActor.prototype.scale = function() {
	return this.m_scale
};
VU_WorldActor.prototype.x = function() {
	return this.m_x
};
VU_WorldActor.prototype.y = function() {
	return this.m_y
};
VU_WorldActor.prototype.flipX = function() {
	return this.m_flipX
};
VU_WorldActor.prototype.id = function() {
	return this.m_id
};
VU_WorldActor.prototype.canvas = function() {
	return this.m_canvas
};
VU_WorldActor.prototype.setActorClip = function(a) {
	a = "undefined" === typeof a ? null: a;
	null !== a && (this.m_clip = Application.instance.getClip(a), this.m_canvas.addChild(this.m_clip.sprite), this.m_clip.parent = this.m_canvas)
};
VU_WorldActor.prototype.setPositionPoint = function(a) {
	this.m_oldX = this.m_x = a.x;
	this.m_oldY = this.m_y = a.y
};
VU_WorldActor.prototype.setPosition = function(a, b) {
	this.m_oldX = this.m_x = a;
	this.m_oldY = this.m_y = b
};
VU_WorldActor.prototype.setX = function(a) {
	this.m_oldX = this.m_x = a
};
VU_WorldActor.prototype.setY = function(a) {
	this.m_oldY = this.m_y = a
};
VU_WorldActor.prototype.setFlipX = function(a) {
	this.m_flipX = a;
	null !== this.m_clip && (this.m_flipX && 0 < this.m_clip.sprite.getScaleX() || !this.m_flipX && 0 > this.m_clip.sprite.getScaleX()) && this.m_clip.setScaleX( - this.m_clip.scaleX)
};
VU_WorldActor.prototype.setScale = function(a) {
	this.m_scale != a && (null !== this.m_clip && this.m_clip.sprite.setScale(this.m_flipX ? -a: a, a), this.m_scaleY = this.m_scaleX = this.m_scale = a)
};
VU_WorldActor.prototype.setScaleX = function(a) {
	this.m_scaleX != a && (null !== this.m_clip && this.m_clip.sprite.setScaleX(this.m_flipX ? -a: a), this.m_scaleX = a)
};
VU_WorldActor.prototype.setScaleY = function(a) {
	this.m_scaleY != a && (null !== this.m_clip && this.m_clip.sprite.setScaleY(a), this.m_scaleY = a)
};
VU_WorldActor.prototype.setScaleXY = function(a, b) {
	this.setScaleX(a);
	this.setScaleY(b)
};
VU_WorldActor.prototype.resize = function(a, b) {
	null !== this.m_clip && this.setScaleXY(a / this.m_clip.width, b / this.m_clip.height)
};
VU_WorldActor.prototype.getBounds = function() {
	return null !== this.m_bounds ? new Rectangle(parseFloat(this.m_x + this.m_bounds.x), parseFloat(this.m_y + this.m_bounds.y), this.m_bounds.w, this.m_bounds.h) : null
};
VU_WorldActor.prototype.getBoundsCollision = function() {
	return null !== this.m_boundsCollision ? new Rectangle(parseFloat(this.m_x + this.m_boundsCollision.x), parseFloat(this.m_y + this.m_boundsCollision.y), this.m_boundsCollision.w, this.m_boundsCollision.h) : null
};
VU_WorldActor.prototype.getBoundsAttack = function() {
	return null !== this.m_boundsAttack ? new Rectangle(parseFloat(this.m_x + this.m_boundsAttack.x), parseFloat(this.m_y + this.m_boundsAttack.y), this.m_boundsAttack.w, this.m_boundsAttack.h) : null
};
VU_WorldActor.prototype.updateBounds = function() {
	var a = null,
	b = 0,
	c = 0;
	this.m_clip.getBounds() && (a = this.m_clip.getBounds());
	null !== a ? (b = this.m_scaleX, c = this.m_scaleY, this.m_scaleX === this.m_scaleY && (this.m_scale = this.m_scaleX), this.m_bounds = new Rectangle(b * (this.m_flipX ? -a.x - a.w: a.x), c * a.y, b * a.w, c * a.h)) : this.m_bounds = null;
	"undefined" !== typeof this.m_clip.collision && (a = this.m_clip.collision);
	null !== a ? (b = this.m_scaleX, c = this.m_scaleY, this.m_scaleX == this.m_scaleY && (this.m_scale = this.m_scaleX), this.m_boundsCollision = new Rectangle(b * (this.m_flipX ? -a.x - a.w: a.x), c * a.y, b * a.w, c * a.h)) : this.m_boundsCollision = null;
	"undefined" !== typeof this.m_clip.boundsAttack && (a = this.m_clip.boundsAttack);
	null !== a ? (b = this.m_scaleX, c = this.m_scaleY, this.m_scaleX == this.m_scaleY && (this.m_scale = this.m_scaleX), this.m_boundsAttack = new Rectangle(b * (this.m_flipX ? -a.x - a.w: a.x), c * a.y, b * a.w, c * a.h)) : this.m_boundsAttack = null
};
VU_WorldActor.prototype.gotoState = function(a) {
	a !== this.m_state && (this.characterGotoState(a), this.m_state = a)
};
VU_WorldActor.prototype.characterGotoState = function(a) {
	a !== this.m_state && (null !== this.m_clip && (this.m_tempPosX = this.m_clip.x, this.m_tempPosY = this.m_clip.y), this.m_character.gotoState(a), this.m_clip = this.m_character.actor().clip(), this.m_clip.setScaleX(this.m_flipX ? -this.m_scaleX: this.m_scaleX), this.m_clip.setScaleY(this.m_scaleY), this.m_clip.setX(this.m_tempPosX), this.m_clip.setY(this.m_tempPosY), this.showCollision(this.m_collisionVisible))
};
VU_WorldActor.prototype.hitTestPoint = function(a, b) {
	var c = this.getBounds();
	return null != c ? c.intersectPoint(a, b) : !1
};
VU_WorldActor.prototype.update = function(a) {
	this.m_clip.setX(this.m_x - this.m_world.camera().x());
	this.m_clip.setY(this.m_y - this.m_world.camera().y());
	null !== this.m_collisionDisplay && (this.m_collisionDisplay.x = this.m_x - this.m_world.camera().x(), this.m_collisionDisplay.y = this.m_y - this.m_world.camera().y());
	this.setDepth(10 * this.m_y)
};
VU_WorldActor.prototype.showInCamera = function(a) {
	this.m_character.setX(this.m_x - a.x());
	this.m_character.setY(this.m_y - a.y());
	null !== this.m_collisionDisplay && (this.m_collisionDisplay.x = this.m_x - a.x(), this.m_collisionDisplay.y = this.m_y - a.y())
};
VU_WorldActor.prototype.hitTestCollisionPoint = function(a, b) {
	if (null !== this.m_boundsCollision) {
		var c = new Rectangle(this.m_boundsCollision.x, this.m_boundsCollision.y, this.m_boundsCollision.w, this.m_boundsCollision.h);
		c.x += this.m_x;
		c.y += this.m_y;
		return c.intersectPoint(a, b)
	}
	return ! 1
};
VU_WorldActor.prototype.hitTestAttack = function(a) {
	if (null !== this.m_bounds) {
		var b = new Rectangle(this.m_bounds.x, this.m_bounds.y, this.m_bounds.w, this.m_bounds.h);
		b.x += this.m_x;
		b.y += this.m_y;
		a = a.getBoundsAttack();
		if (null !== a) return b.intersectRect(a)
	}
	return ! 1
};
VU_WorldActor.prototype.hitTest = function(a) {
	if (null !== this.m_bounds) {
		var b = new Rectangle(this.m_bounds.x, this.m_bounds.y, this.m_bounds.w, this.m_bounds.h);
		b.x += this.m_x;
		b.y += this.m_y;
		a = a.getBounds();
		if (null !== a) return b.intersectRect(a)
	}
	return ! 1
};
VU_WorldActor.prototype.showCollision = function(a) { (this.m_collisionVisible = a) ? (null === this.m_collisionDisplay && (this.m_collisionDisplay = new SNode), this.m_world.canvas.addChild(this.m_collisionDisplay), this.m_collisionDisplay.addDrawListener(this, "onDraw")) : null !== this.m_collisionDisplay && this.m_world.canvas.removeChild(this.m_collisionDisplay)
};
VU_WorldActor.prototype.onDraw = function(a) {
	null !== this.m_bounds && SGraphics.drawRectangle(a, this.m_collisionDisplay.x + this.m_bounds.x, this.m_collisionDisplay.y + this.m_bounds.y, this.m_bounds.w, this.m_bounds.h, 2, Common.COLOR_RED, Common.COLOR_NONE);
	null !== this.m_boundsCollision && SGraphics.drawRectangle(a, this.m_collisionDisplay.x + this.m_boundsCollision.x, this.m_collisionDisplay.y + this.m_boundsCollision.y, this.m_boundsCollision.w, this.m_boundsCollision.h, 2, Common.COLOR_BLUE, Common.COLOR_NONE);
	null !== this.m_boundsAttack && SGraphics.drawRectangle(a, this.m_collisionDisplay.x + this.m_boundsAttack.x, this.m_collisionDisplay.y + this.m_boundsAttack.y, this.m_boundsAttack.w, this.m_boundsAttack.h, 2, Common.COLOR_GREEN, Common.COLOR_NONE)
};
VU_WorldActor.prototype.onIdle = function(a) {
	this.m_isIdle = a;
	null !== this.m_clip && this.m_clip.setVisible(!a)
};
VU_WorldActor.prototype.onMouseDown = function(a) {};
VU_WorldActor.prototype.onMouseUp = function(a) {};
VU_WorldActor.prototype.getParam = function(a) {
	if (null != this.m_paramsId) for (var b = 0; b < this.m_paramsId.length; ++b) if (this.m_paramsId[b] == a) return this.m_paramsValue[b];
	return ""
};
VU_WorldActor.prototype.free = function() {
	null !== this.m_character && (this.m_character.free(), this.m_clip = this.m_character = null);
	null !== this.m_clip && (this.m_clip.parent.removeChild(this.m_clip.sprite), this.m_clip.free(), this.m_clip = null);
	this.m_world.canvas.removeChild(this.m_collisionDisplay);
	this.m_world = this.m_canvas = this.m_bounds = null
};
VU_WorldActor.ID_UNUSED = -1;
function VU_Camera(a, b, c, d) {
	this.m_y = this.m_x = 0;
	this.m_world = a;
	this.m_collision = null;
	this.m_speed = d;
	this.width = b;
	this.height = c;
	this.parallaxX = this.m_world.width() > this.width;
	this.parallaxY = this.m_world.height() > this.height;
	this.cameraHasStopped = !1;
	this.upLimit = 0.6 * this.height;
	this.downLimit = 0.8 * this.height
}
VU_Camera.prototype.x = function() {
	return this.m_x
};
VU_Camera.prototype.y = function() {
	return this.m_y
};
VU_Camera.prototype.setX = function(a) {
	this.m_x = a
};
VU_Camera.prototype.setY = function(a) {
	this.m_y = a
};
VU_Camera.prototype.setSpeed = function(a) {
	this.m_speed = a
};
VU_Camera.prototype.getSpeed = function() {
	return this.m_speed
};
VU_Camera.prototype.scale = function() {
	return this.m_world.canvas().scaleX
};
VU_Camera.prototype.update = function(a) {
	this.cameraHasStopped || (this.m_x += this.m_speed * a, 0 > this.m_x ? this.m_x = 0 : this.m_x > this.m_world.width() - this.width && (this.m_x = this.m_world.width() - this.width, this.cameraHasStopped = !0, this.m_speed = 0, this.m_world.player().onChangeBaseSpeed(this.m_speed)), 0 > this.m_y ? this.m_y = 0 : this.m_y > this.m_world.height() - this.height && (this.m_y = this.m_world.height() - this.height))
};
VU_Camera.prototype.setScale = function(a) {
	this.m_world.setScale(a)
};
VU_Camera.prototype.showCollision = function(a) {
	a ? (this.m_collision && (this.m_world.canvas.removeChild(this.m_collision), this.m_collision = null), this.m_collision = new SNode, this.m_world.canvas.addChild(this.m_collision), this.m_collision.addDrawListener(this, "onDraw")) : this.m_collision && (this.m_world.canvas.removeChild(this.m_collision), this.m_collision = null)
};
VU_Camera.prototype.onDraw = function(a) {
	SGraphics.drawRectangle(a, 0, 0, this.width, this.height, 4, Common.COLOR_RED, Common.COLOR_NONE)
};
VU_Camera.prototype.free = function() {
	this.m_collision && (this.m_world = null);
	this.m_world = null
};
function VU_Npc() {
	this.y = this.x = this.id = 0;
	this.canvas = null;
	this.params = "";
	this.rawData = null
}
VU_Npc.prototype.free = function() {
	this.canvas = null
};
function VU_NpcManager(a) {
	this.m_player = null;
	this.m_world = a;
	this.m_showCollisions = !1;
	this.m_buffer = [];
	this.m_actors = []
}
VU_NpcManager.prototype.init = function(a) {};
VU_NpcManager.prototype.collisionsOn = function() {
	return this.m_showCollisions
};
VU_NpcManager.prototype.getActors = function() {
	return this.m_actors
};
VU_NpcManager.prototype.showCollisions = function(a) {
	this.m_showCollisions = a;
	for (var b = 0; b < this.m_actors.length; b++) this.m_actors[b].showCollision(a)
};
VU_NpcManager.prototype.addNpc = function(a) {
	this.m_buffer.push(a)
};
VU_NpcManager.prototype.add = function(a) {
	this.m_actors.push(a);
	return a
};
VU_NpcManager.prototype.update = function(a) {
	for (var b = 0; b < this.m_actors.length; b++) this.m_actors[b].isAwaitingDelete() ? (this.m_actors[b].free(), this.m_actors[b] = null, this.m_actors.splice(b--, 1)) : this.m_actors[b].update(a)
};
VU_NpcManager.prototype.reset = function() {
	for (var a = 0; a < this.m_actors.length; a++) this.m_actors[a].free(),
	this.m_actors[a] = null;
	this.m_actors = null;
	this.m_actors = []
};
VU_NpcManager.prototype.free = function() {
	for (var a = 0; a < this.m_actors.length; a++) this.m_buffer[a].free();
	this.m_buffer = null;
	for (a = 0; a < this.m_actors.length; a++) this.m_actors[a].free(),
	this.m_actors[a] = null;
	this.m_world = this.m_actors = null
};
function VU_Player(a, b, c, d, e) {
	VU_WorldActor.call(this, a, b, c, d, "", e);
	this.m_isDead = this.m_isInvulnerable = !1;
	this.m_state = "";
	VU_Player.instance = this
}
goog.inherits(VU_Player, VU_WorldActor);
VU_Player.prototype.isInvulnerable = function() {
	return this.m_isInvulnerable
};
VU_Player.prototype.setInvulnerability = function(a) {
	this.m_isInvulnerable = a
};
VU_Player.prototype.isDead = function() {
	return this.m_isDead
};
VU_Player.prototype.setIsDead = function(a) {
	this.m_isDead = a
};
VU_Player.prototype.state = function() {
	return this.m_state
};
VU_Player.prototype.character = function() {
	return this.m_character
};
VU_Player.prototype.factorSpeedX = function() {
	return this.m_factorSpeedX
};
VU_Player.prototype.setFactorSpeedX = function(a) {
	this.m_factorSpeedX = a
};
VU_Player.prototype.factorSpeedY = function() {
	return this.m_factorSpeedY
};
VU_Player.prototype.setFactorSpeedY = function(a) {
	this.m_factorSpeedY = a
};
VU_Player.prototype.gotoState = function(a) {
	a === this.m_state || this.m_isDead || (this.characterGotoState(a), this.m_clip = this.m_character.getActor().clip(), this.m_scaleX == this.m_scaleY ? (this.m_clip.setScaleX(this.m_flipX ? -this.m_scale: this.m_scale), this.m_clip.setScaleY(this.m_scale)) : (this.m_clip.setScaleX(this.m_flipX ? -this.m_scaleX: this.m_scaleX), this.m_clip.setScaleY(this.m_scaleY)), this.m_state = a, this.showCollision(this.m_collisionVisible))
};
VU_Player.prototype.characterGotoState = function(a) {
	a !== this.m_state && (null !== this.m_clip && (this.m_tempPosX = this.m_clip.x, this.m_tempPosY = this.m_clip.y), this.m_character.gotoState(a), this.m_clip = this.m_character.actor().clip(), this.m_clip.setScaleX(this.m_flipX ? -this.m_scaleX: this.m_scaleX), this.m_clip.setScaleY(this.m_scaleY), this.m_clip.setX(this.m_tempPosX), this.m_clip.setY(this.m_tempPosY), this.updateBounds(), this.showCollision(this.m_collisionVisible))
};
VU_Player.prototype.update = function(a) {
	this.m_character.update(a);
	this.setDepth(10 * this.m_y)
};
VU_Player.prototype.free = function() {
	VU_Player.superClass_.free.call(this)
};
function VU_World(a, b) {
	this.playerInitY = this.playerInitX = 0;
	this.showCollisions = !1;
	this.cameraHeight = this.cameraWidth = 0;
	this.useEmbeddedAssets = !1;
	this.m_game = b;
	this.m_layers = [];
	this.m_playerCanvas = null;
	this.m_objectsCanvas = [];
	this.m_player = this.m_objectsCanvas[0] = null;
	this.m_layerNames = [];
	this.m_height = this.m_width = 0;
	this.m_worldData = this.m_actorManager = this.m_camera = null;
	this.canvas = a
}
VU_World.prototype.game = function() {
	return this.m_game
};
VU_World.prototype.setScale = function(a) {
	this.setScaleX(a);
	this.setScaleY(a)
};
VU_World.prototype.setScaleX = function(a) {
	for (var b = 0; b < this.m_layers.length; b++) this.m_layers[b].setScaleX(a)
};
VU_World.prototype.setScaleY = function(a) {
	for (var b = 0; b < this.m_layers.length; b++) this.m_layers[b].setScaleY(a)
};
VU_World.prototype.setX = function(a) {
	for (var b = 0; b < this.m_layers.length; b++) this.m_layers[b].setX(a)
};
VU_World.prototype.setY = function(a) {
	for (var b = 0; b < this.m_layers.length; b++) this.m_layers[b].setY(a)
};
VU_World.prototype.objectCanvas = function() {
	return this.m_objectsCanvas[0]
};
VU_World.prototype.player = function() {
	return this.m_player
};
VU_World.prototype.camera = function() {
	return this.m_camera
};
VU_World.prototype.width = function() {
	return this.m_width
};
VU_World.prototype.height = function() {
	return this.m_height
};
VU_World.prototype.actorManager = function() {
	return this.m_actorManager
};
VU_World.prototype.getLayer = function(a) {
	return this.m_layerNames[a]
};
VU_World.prototype.loadData = function(a) {
	this.m_worldData = window[a];
	a = this.m_worldData.properties;
	this.m_width = this.getData(a, "width");
	this.m_height = this.getData(a, "height");
	this.showCollisions = 1 == this.getData(a, "showCollisions");
	this.playerInitX = this.getData(a, "playerX");
	this.playerInitY = this.getData(a, "playerY");
	this.cameraWidth = this.getData(a, "cameraWidth");
	this.cameraHeight = this.getData(a, "cameraHeight");
	0 >= this.cameraWidth && (this.cameraWidth = Application.APP_WIDTH);
	0 >= this.cameraHeight && (this.cameraHeight = Application.APP_HEIGHT);
	this.cameraSpeed = a.cameraSpeed;
	this.useEmbeddedAssets = a.useEmbeddedAssets;
	this.createCamera();
	this.createNpcManagers();
	this.createLayers()
};
VU_World.prototype.createCamera = function() {
	this.m_camera = new VU_Camera(this, this.cameraWidth, this.cameraHeight, this.cameraSpeed);
	this.m_camera.setScale(1)
};
VU_World.prototype.createNpcManagers = function() {
	this.m_actorManager = new VU_NpcManager(this)
};
VU_World.prototype.addNpc = function(a, b) {
	var c = new VU_Npc;
	c.id = a.id;
	c.x = a.x;
	c.y = a.y;
	c.canvas = b;
	c.params = a.params;
	c.rawData = a;
	this.m_actorManager.addNpc(c)
};
VU_World.prototype.createLayers = function() {
	this.m_layerNames = [];
	for (var a = this.m_worldData.layerTypes,
	b = 0; b < a.length; b++) this.addLayer(a[b].type, a[b]);
	null === this.m_playerCanvas && (null === this.m_objectsCanvas[0] && (a = Application.instance.addDisplayContainer(), a._sorted = !0, this.canvas.addChild(a), this.m_objectsCanvas[0] = a, this.m_objectsCanvas.push(this.canvas)), this.m_playerCanvas = this.m_objectsCanvas[0]);
	this.m_worldData = null
};
VU_World.prototype.addLayer = function(a, b) {
	if (a === VU_WorldBaseLayer.ID_OBJECTS) {
		var c = Application.instance.addDisplayContainer();
		c._sorted = !0;
		this.canvas.addChild(c);
		this.m_objectsCanvas.push(c);
		this.m_objectsCanvas.push(this.canvas);
		for (var d = 0; d < b.object.length; d++) this.addNpc(b.object[d], c)
	} else a === VU_WorldBaseLayer.ID_SPRITES ? (c = new VU_WorldSpriteLayer(this, b), this.m_layerNames[c.name()] = c, this.m_layers.push(c)) : a === VU_WorldBaseLayer.ID_COLLISIONS ? (this.m_collisions = new VU_WorldCollisionLayer(this, b), this.m_layerNames[this.m_collisions.name()] = this.m_collisions, this.m_layers.push(this.m_collisions)) : (c = new VU_WorldTileLayer(this, b), this.m_layerNames[c.name()] = c, this.m_layers.push(c))
};
VU_World.prototype.init = function() {
	for (var a = 0; a < this.m_layers.length; a++) this.m_layers[a].init()
};
VU_World.prototype.showCollision = function(a) {
	this.m_player.showCollision(a);
	this.m_actorManager.showCollisions(a);
	this.m_camera.showCollision(a)
};
VU_World.prototype.checkWorldBoundaries = function(a) {
	a.bounds()
};
VU_World.prototype.update = function(a) {
	a > VU_World.MAX_DELTA_TIME && (a = VU_World.MAX_DELTA_TIME);
	this.m_actorManager.update(a);
	for (var b = 0; b < this.m_layers.length; b++) this.m_layers[b].render();
	this.m_player.update(a);
	this.m_player.showInCamera(this.m_camera);
	this.m_camera.update(a)
};
VU_World.prototype.getData = function(a, b) {
	if (null !== a && null !== b && a[b]) return a[b]
};
VU_World.prototype.getOptionalData = function(a, b, c) {
	if ("undefined" !== typeof a && "undefined" !== typeof b) return "undefined" !== typeof a[b] ? a[b] : c
};
VU_World.prototype.free = function() {
	null !== this.m_player && (this.m_player.free(), this.m_player = null);
	this.m_actorManager.free();
	this.m_actorManager = null;
	this.m_playerCanvas != this.m_objectsCanvas[0] && (this.canvas.removeChild(this.m_playerCanvas), this.m_playerCanvas = null);
	for (var a = 0; a < this.m_objectsCanvas.length; a++) this.canvas.removeChild(this.m_objectsCanvas[a]);
	this.m_objectsCanvas = null;
	null !== this.m_camera && (this.m_camera.free(), this.m_camera = null);
	for (a = 0; a < this.m_layers.length; a++) this.m_layers[a].free(),
	this.m_layers[a] = null;
	this.m_layers = this.m_layerNames = null
};
VU_World.MAX_DELTA_TIME = 50;
function VU_WorldBaseLayer(a, b) {
	this.m_name = "";
	this.m_type = this.m_parallaxYFactor = this.m_parallaxXFactor = this.m_y = this.m_x = this.m_height = this.m_width = 0;
	this.m_world = a;
	this.m_canvas = null;
	this.m_useEmbeddedAssets = !1;
	this.m_name = b.name;
	this.m_width = b.width;
	this.m_height = b.height;
	this.m_useEmbeddedAssets = this.m_world.useEmbeddedAssets;
	this.m_canvas = Application.instance.addDisplayContainer();
	a.canvas.addChild(this.m_canvas);
	this.m_type = 0
}
VU_WorldBaseLayer.prototype.x = function() {
	return this.m_x
};
VU_WorldBaseLayer.prototype.y = function() {
	return this.m_y
};
VU_WorldBaseLayer.prototype.width = function() {
	return this.m_width
};
VU_WorldBaseLayer.prototype.height = function() {
	return this.m_height
};
VU_WorldBaseLayer.prototype.name = function() {
	return this.m_name
};
VU_WorldBaseLayer.prototype.setX = function(a) {
	this.m_x = a
};
VU_WorldBaseLayer.prototype.setY = function(a) {
	this.m_y = a
};
VU_WorldBaseLayer.prototype.refresh = function() {};
VU_WorldBaseLayer.prototype.init = function() {
	this.m_world.camera().parallaxX && (this.m_parallaxXFactor = (this.m_width - this.m_world.camera().width) / (this.m_world.width() - this.m_world.camera().width));
	this.m_world.camera().parallaxY && (this.m_parallaxYFactor = (this.m_height - this.m_world.camera().height) / (this.m_world.height() - this.m_world.camera().height))
};
VU_WorldBaseLayer.prototype.render = function() {
	this.m_world.camera().parallaxX && (this.m_canvas.x = -this.parallaxX());
	this.m_world.camera().parallaxY && (this.m_canvas.y = -this.parallaxY())
};
VU_WorldBaseLayer.prototype.parallaxX = function() {
	return this.m_world.camera().x() * this.m_parallaxXFactor
};
VU_WorldBaseLayer.prototype.parallaxY = function() {
	return this.m_world.camera().y() * this.m_parallaxYFactor
};
VU_WorldBaseLayer.prototype.free = function() {
	this.m_world && (this.m_world = this.m_canvas = null)
};
VU_WorldBaseLayer.TYPE_COLLISIONS = 1;
VU_WorldBaseLayer.TYPE_TILES = 2;
VU_WorldBaseLayer.TYPE_SPRITES = 3;
VU_WorldBaseLayer.TYPE_OBJECTS = 4;
VU_WorldBaseLayer.ID_PLAYER = "player";
VU_WorldBaseLayer.ID_COLLISIONS = "collision";
VU_WorldBaseLayer.ID_TILES = "cell";
VU_WorldBaseLayer.ID_SPRITES = "sprites";
VU_WorldBaseLayer.ID_OBJECTS = "objects";
function VU_WorldTileLayer(a, b) {
	VU_WorldBaseLayer.call(this, a, b);
	this.m_tileHeight = this.m_tileWidth = this.m_rows = this.m_columns = 0;
	this.m_tiles = null;
	this.m_maxY = this.m_maxX = this.m_minY = this.m_minX = 0;
	this.m_bitmapData = null;
	this.m_buffer = [];
	this.m_bufferY = this.m_bufferX = this.m_bufferHeight = this.m_bufferWidth = 0;
	this.m_type = VU_WorldBaseLayer.ID_TILES;
	this.m_columns = b.cols;
	this.m_rows = b.rows;
	this.m_tileWidth = b.tileW;
	this.m_tileHeight = b.tileH;
	this.m_tiles = b.image;
	this.m_bitmapData = b.matrix;
	this.m_tempRow = this.m_tempCol = 0
}
goog.inherits(VU_WorldTileLayer, VU_WorldBaseLayer);
VU_WorldTileLayer.prototype.tileWidth = function() {
	return this.m_tileWidth
};
VU_WorldTileLayer.prototype.tileHeight = function() {
	return this.m_tileHeight
};
VU_WorldTileLayer.prototype.getTileName = function(a) {
	return 0 <= a && a < this.m_tiles.length ? this.m_tiles[a] : null
};
VU_WorldTileLayer.prototype.getBufferCell = function(a, b) {
	return this.m_buffer[(a + this.m_bufferX) % this.m_bufferWidth + (b + this.m_bufferY) % this.m_bufferHeight * this.m_bufferWidth]
};
VU_WorldTileLayer.prototype.setBufferCell = function(a, b, c) {
	this.m_buffer[(a + this.m_bufferX) % this.m_bufferWidth + (b + this.m_bufferY) % this.m_bufferHeight * this.m_bufferWidth] = c
};
VU_WorldTileLayer.prototype.initCell = function(a, b) {
	var c = this.getCell(a + this.m_minX, b + this.m_minY);
	if (0 < c) {
		var d = null,
		d = Application.instance.getDisplayObject(this.getTileName(c - 1));
		this.m_canvas.addChild(d);
		d.parent = this.m_canvas;
		d.setPosition((a + this.m_minX) * this.m_tileWidth, (b + this.m_minY) * this.m_tileHeight);
		this.setBufferCell(a, b, d)
	}
};
VU_WorldTileLayer.prototype.refresh = function() {
	VU_WorldTileLayer.superClass_.refresh.call(this);
	for (var a = this.m_bufferY = this.m_bufferX = 0; a < this.m_bufferWidth;) {
		for (var b = 0; b < this.m_bufferHeight;) {
			var c = this.m_buffer[a + b * this.m_bufferWidth];
			null !== c && (this.m_canvas.removeChild(c), this.m_buffer[a + b * this.m_bufferWidth] = null);
			this.initCell(a, b); ++b
		}++a
	}
};
VU_WorldTileLayer.prototype.init = function() {
	VU_WorldTileLayer.superClass_.init.call(this);
	this.m_bufferWidth = Math.ceil(this.m_world.camera().width / this.m_tileWidth + 1);
	this.m_bufferHeight = Math.ceil(this.m_world.camera().height / this.m_tileHeight + 1);
	this.m_bufferY = this.m_bufferX = 0;
	this.m_buffer = [];
	this.m_minX = ~~ (this.m_world.camera().x() / this.m_tileWidth);
	0 > this.m_minX && (this.m_minX = 0);
	this.m_maxX = this.m_minX + this.m_bufferWidth;
	this.m_minY = ~~ (this.m_world.camera().y() / this.m_tileHeight);
	0 > this.m_minY && (this.m_minY = 0);
	this.m_maxY = this.m_minY + this.m_bufferHeight;
	for (var a = 0; a < this.m_bufferWidth;) {
		for (var b = 0; b < this.m_bufferHeight;) this.initCell(a, b),
		++b; ++a
	}
};
VU_WorldTileLayer.prototype.getCellInPosition = function(a, b) {
	this.m_tempCol = ~~ (a / this.m_tileWidth);
	this.m_tempRow = ~~ (b / this.m_tileHeight);
	return 0 <= this.m_tempCol && 0 <= this.m_tempRow && this.m_tempCol < this.m_columns && this.m_tempRow < this.m_rows ? this.m_bitmapData[this.m_tempCol][this.m_tempRow] : 0
};
VU_WorldTileLayer.prototype.getCell = function(a, b) {
	return 0 <= a && 0 <= b && a < this.m_columns && b < this.m_rows ? this.m_bitmapData[a][b] : 0
};
VU_WorldTileLayer.prototype.setCell = function(a, b, c) {
	0 <= a && 0 <= b && a < this.m_columns && b < this.m_rows && (this.m_bitmapData[a][b] = c);
	return 0
};
VU_WorldTileLayer.prototype.addTileCell = function(a, b, c, d) {
	var e = this.getCell(a, b);
	if (0 < e) {
		var f = null,
		f = Application.instance.getDisplayObject(this.getTileName(e - 1));
		this.m_canvas.addChild(f);
		f.parent = this.m_canvas;
		f.setPosition(a * this.m_tileWidth, b * this.m_tileHeight);
		this.setBufferCell(c, d, f)
	}
};
VU_WorldTileLayer.prototype.render = function() {
	var a = !1,
	b = 0,
	c = 0,
	d = 0;
	if (this.m_world.camera().parallaxX) {
		d = this.parallaxX();
		b = ~~ (d / this.m_tileWidth);
		c = b - this.m_minX;
		if (c <= -this.m_bufferWidth || c >= this.m_bufferWidth) a = !0;
		else if (b > this.m_minX) {
			for (var e = 0; e < c;) {
				for (var f = 0; f < this.m_bufferHeight;) {
					var g = this.getBufferCell(e, f);
					g && ("undefined" !== typeof g.sprite ? this.m_canvas.removeChild(g.sprite) : this.m_canvas.removeChild(g), this.setBufferCell(e, f, null));
					this.addTileCell(e + this.m_maxX, f + this.m_minY, e, f); ++f
				}++e
			}
			this.m_bufferX = (this.m_bufferX + c) % this.m_bufferWidth
		} else if (b < this.m_minX) {
			for (e = 1; e <= -c;) {
				for (f = 0; f < this.m_bufferHeight;) {
					if (g = this.getBufferCell(this.m_bufferWidth - e, f))"undefined" !== typeof g.sprite ? this.m_canvas.removeChild(g.sprite) : this.m_canvas.removeChild(g),
					this.setBufferCell(this.m_bufferWidth - e, f, null);
					this.addTileCell(this.m_minX - e, f + this.m_minY, this.m_bufferWidth - e, f); ++f
				}++e
			}
			this.m_bufferX = (this.m_bufferWidth + this.m_bufferX + c) % this.m_bufferWidth
		}
		0 != c && (this.m_minX = b, this.m_maxX = this.m_minX + this.m_bufferWidth);
		this.m_canvas.setX( - d)
	}
	if (this.m_world.camera().parallaxY) {
		d = this.parallaxY();
		b = ~~ (d / this.m_tileHeight);
		c = b - this.m_minY;
		if (c <= -this.m_bufferHeight || c >= this.m_bufferHeight) a = !0;
		else if (b > this.m_minY) {
			for (f = 0; f < c;) {
				for (e = 0; e < this.m_bufferWidth;) {
					if (g = this.getBufferCell(e, f))"undefined" !== typeof g.sprite ? this.m_canvas.removeChild(g.sprite) : this.m_canvas.removeChild(g),
					this.setBufferCell(e, f, null);
					this.addTileCell(e + this.m_minX, f + this.m_maxY, e, f); ++e
				}++f
			}
			this.m_bufferY = (this.m_bufferY + c) % this.m_bufferHeight
		} else if (b < this.m_minY) {
			for (f = 1; f <= -c;) {
				for (e = 0; e < this.m_bufferWidth;) {
					if (g = this.getBufferCell(e, this.m_bufferHeight - f))"undefined" !== typeof g.sprite ? this.m_canvas.removeChild(g.sprite) : this.m_canvas.removeChild(g),
					this.setBufferCell(e, this.m_bufferHeight - f, null);
					this.addTileCell(e + this.m_minX, this.m_minY - f, e, this.m_bufferHeight - f); ++e
				}++f
			}
			this.m_bufferY = (this.m_bufferHeight + this.m_bufferY + c) % this.m_bufferHeight
		}
		0 != c && (this.m_minY = b, this.m_maxY = this.m_minY + this.m_bufferHeight);
		this.m_canvas.setY( - d)
	}
	a && this.refresh()
};
VU_WorldTileLayer.prototype.free = function() {
	for (var a = 0; a < this.m_bufferWidth;) {
		for (var b = 0; b < this.m_bufferHeight;) {
			var c = this.m_buffer[a + b * this.m_bufferWidth];
			c && ("undefined" !== typeof c.sprite ? (c.parent.removeChild(c.sprite), c.free()) : c.parent.removeChild(c)); ++b
		}++a
	}
	VU_WorldTileLayer.superClass_.free.call(this)
};
function VU_WorldCollisionLayer(a, b) {
	this.m_tileY = this.m_tileX = 0;
	this.m_frames = null;
	this.m_number = 0;
	VU_WorldTileLayer.call(this, a, b);
	this.m_type = VU_WorldBaseLayer.TYPE_COLLISIONS;
	this.m_frames = [];
	for (var c = VU_WorldCollisionLayer.CELL_EMPTY; c < VU_WorldCollisionLayer.CELL_HALF_HORIZONTAL;) this.m_frames.push(VU_WorldCollisionLayer.COLLISION_SET + c),
	++c;
	this.setVisible(!1)
}
goog.inherits(VU_WorldCollisionLayer, VU_WorldTileLayer);
VU_WorldCollisionLayer.prototype.setX = function(a) {
	this.m_x = a
};
VU_WorldCollisionLayer.prototype.init = function() {
	VU_WorldCollisionLayer.superClass_.init.call(this)
};
VU_WorldCollisionLayer.prototype.visible = function() {
	return VU_WorldCollisionLayer.superClass_.visible.call(this)
};
VU_WorldCollisionLayer.prototype.refresh = function() {
	VU_WorldCollisionLayer.superClass_.refresh.call(this)
};
VU_WorldCollisionLayer.prototype.getBufferCell = function(a, b) {
	return VU_WorldCollisionLayer.superClass_.getBufferCell.call(this, a, b)
};
VU_WorldCollisionLayer.prototype.setY = function(a) {
	this.m_y = a
};
VU_WorldCollisionLayer.prototype.name = function() {
	return this.m_name
};
VU_WorldCollisionLayer.prototype.tileHeight = function() {
	return this.m_tileHeight
};
VU_WorldCollisionLayer.prototype.setVisible = function(a) {
	a ? this.m_world.canvas.addChild(this.m_canvas) : this.m_world.canvas.removeChild(this.m_canvas)
};
VU_WorldCollisionLayer.prototype.checkCollision = function(a, b) {
	this.m_tileX = ~~ (a / this.m_tileWidth);
	this.m_tileY = ~~ (b / this.m_tileHeight);
	return 0 < this.getCell(this.m_tileX, this.m_tileY) ? !0 : !1
};
VU_WorldCollisionLayer.prototype.getTilePosition = function(a, b) {
	return new Point(~~ (a / this.m_tileWidth), ~~ (b / this.m_tileHeight))
};
VU_WorldCollisionLayer.prototype.getCell = function(a, b) {
	return VU_WorldCollisionLayer.superClass_.getCell.call(this, a, b)
};
VU_WorldCollisionLayer.prototype.addTileCell = function(a, b, c, d) {
	if (Application.debug) {
		var e = this.getCell(a, b);
		e > VU_WorldCollisionLayer.CELL_EMPTY && (e = Application.instance.getClip(this.m_frames[e]), this.setBufferCell(c, d, e), this.m_canvas.addChild(e.sprite), e.setX(a * this.m_tileWidth), e.setY(b * this.m_tileHeight), e.setScale(this.m_tileWidth / e.width, this.m_tileHeight / e.height), e.parent = this.m_canvas)
	}
};
VU_WorldCollisionLayer.prototype.initCell = function(a, b) {
	if (Application.debug && this.m_world.showCollisions) {
		var c = this.getCell(a + this.m_minX, b + this.m_minY);
		c > VU_WorldCollisionLayer.CELL_EMPTY && (c = Application.instance.getClip(this.m_frames[c]), this.m_canvas.addChild(c.sprite), c.setX((a + this.m_minX) * this.m_tileWidth), c.setY((b + this.m_minY) * this.m_tileHeight), this.setBufferCell(a, b, c), c.parent = this.m_canvas)
	}
};
VU_WorldCollisionLayer.prototype.parallaxX = function() {
	return this.m_world.camera().x()
};
VU_WorldCollisionLayer.prototype.parallaxY = function() {
	return this.m_world.camera().y()
};
VU_WorldCollisionLayer.prototype.render = function() {
	this.m_world.showCollisions && VU_WorldCollisionLayer.superClass_.render.call(this)
};
VU_WorldCollisionLayer.prototype.free = function() {
	VU_WorldCollisionLayer.superClass_.free.call(this)
};
VU_WorldCollisionLayer.CELL_EMPTY = 0;
VU_WorldCollisionLayer.CELL_FULL = 1;
VU_WorldCollisionLayer.CELL_DIAG_UP_LEFT = 2;
VU_WorldCollisionLayer.CELL_DIAG_UP_RIGHT = 3;
VU_WorldCollisionLayer.CELL_DIAG_DOWN_RIGHT = 4;
VU_WorldCollisionLayer.CELL_DIAG_DOWN_LEFT = 5;
VU_WorldCollisionLayer.CELL_PLATFORM = 6;
VU_WorldCollisionLayer.CELL_FULL_ICE = 7;
VU_WorldCollisionLayer.CELL_FULL_WATER = 8;
VU_WorldCollisionLayer.CELL_FULL_SAND = 9;
VU_WorldCollisionLayer.CELL_MD_UP_LEFT = 10;
VU_WorldCollisionLayer.CELL_MD_UP_RIGHT = 11;
VU_WorldCollisionLayer.CELL_HMD_UP_LEFT = 12;
VU_WorldCollisionLayer.CELL_HMD_UP_RIGHT = 13;
VU_WorldCollisionLayer.CELL_HALF_HORIZONTAL = 14;
VU_WorldCollisionLayer.COLLISION_SET = "coll_";
function VU_WorldSpriteLayer(a, b) {
	VU_WorldBaseLayer.call(this, a, b);
	this.m_type = VU_WorldBaseLayer.TYPE_SPRITES;
	for (var c = b.image.length,
	d = 0; d < c;) {
		var e = null,
		e = Application.instance.getClip(b.image[d].image);
		b.image[d].sx && e.setScaleX(b.image[d].sx);
		b.image[d].sy && e.setScaleY(b.image[d].sy);
		e.setX(b.image[d].x - e.width / 2);
		e.setY(b.image[d].y - e.height / 2);
		b.image[d].rot && e.setRotation(180 * b.image[d].rot / Math.PI);
		e.parent = this.m_canvas;
		this.m_canvas.addChild(e.sprite); ++d
	}
}
goog.inherits(VU_WorldSpriteLayer, VU_WorldBaseLayer);
function Cheats() {}
Cheats.enabled = window.config.settings.cheats;
Cheats.onKeyDown = function(a) {};
function ActorManager(a) {
	VU_NpcManager.call(this, a);
	this.m_builder = null;
	ActorManager.instance = this;
	this.m_wave = -1;
	this.m_hasStarted = this.outOfWaves = !1;
	this.m_enemyDoorAngles = [270, 270, 270, 270];
	this.m_difficulty = 1;
	this.m_timerWave2 = this.m_timerWave1 = 0;
	this.m_timerMax1 = Application.config.settings.timerWave1;
	this.m_timerMax2 = Application.config.settings.timerWave2;
	this.enemiesLeft = !1
}
goog.inherits(ActorManager, VU_NpcManager);
ActorManager.GENERIC_PLAYER = 1;
ActorManager.GENERIC_ENEMY = 2;
ActorManager.GENERIC_ITEMS = 3;
ActorManager.GENERIC_SHIELD = 4;
ActorManager.GENERIC_COIN = 5;
ActorManager.GENERIC_HEART = 6;
ActorManager.GENERIC_BREAKABLE = 7;
ActorManager.GENERIC_GENERATOR = 8;
ActorManager.GENERIC_BOSS = 10;
ActorManager.GENERIC_DOOR = 20;
ActorManager.GENERIC_HAZARD = 21;
ActorManager.GENERIC_PORTAL = 22;
ActorManager.GENERIC_NEUTRAL = 23;
ActorManager.GENERIC_CENTER_ITEM = 24;
ActorManager.prototype.increaseDifficulty = function() {
	this.m_difficulty++
};
ActorManager.prototype.init = function(a) {
	this.m_player = a
};
ActorManager.prototype.killAllEnemies = function() {
	for (var a = 0; a < this.m_actors.length; a++) this.m_actors[a].id() === ActorManager.GENERIC_ENEMY && (Global.game.addEffect("mcMissileExplode", this.m_actors[a].x(), this.m_actors[a].y()), this.m_actors[a].forceDeath())
};
ActorManager.prototype.removeBreakables = function() {
	for (var a = 0; a < this.m_actors.length; a++) this.m_actors[a].id() === ActorManager.GENERIC_BREAKABLE && this.m_actors[a].setAwaitingDelete(!0)
};
ActorManager.prototype.initRandomWave = function(a) {
	GameVillains.instance.deactivateArmorAllGenerators();
	if (1 === Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]]) this.outOfWaves = !0;
	else if (Global.game.portalsReadyToSummon || !(8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM])) {
		for (var b = Application.config.vu_random_waves[Global.savedNumData[Global.INDEX_CURRENT_ROOM]], c = Math.floor(Common.random(b.minEnemies, b.maxEnemies) * b["difficulty" + this.m_difficulty] / 100), d = [], e = 1; 8 >= e; e++) for (var f = Math.floor(0); f < Math.floor(0 + b["probability" + e] / 100 * c); f++) d.push(b["type" + e]);
		c = GameVillains.instance.findAvailableDoorArray(d.length);
		if (c !== []) {
			GameVillains.instance.setDropParameters(b.weaponDrop, b.weaponLimit, b.hpDrop, b.hpLimit, b.powerupDrop, b.powerupLimit);
			for (e = 0; e < d.length; e++) {
				for (var g = b = null,
				h = null,
				f = 0; f < Application.config.vu_enemy_mask.length; f++) if (Application.config.vu_enemy_mask[f].name === d[e]) {
					b = Application.config.vu_enemy_mask[f];
					h = Application.config.vu_behaviors[b.behavior1];
					g = Application.config.vu_attacks[h.attackType];
					break
				}
				if (b) {
					var k = c[e];
					GameVillains.instance.usedDoors.push(k);
					GameVillains.instance.usedGenerator.push(k);
					var f = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + k + "XSpawn": "portal" + k + "XSpawn"],
					l = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + k + "YSpawn": "portal" + k + "YSpawn"],
					m = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + k + "inX": "portal" + k + "inX"],
					k = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + k + "inY": "portal" + k + "inY"];
					switch (b.type) {
					case 0:
						this.add(new WandererMelee(this.m_world.objectCanvas(), this.m_world, a, f, l, ActorManager.GENERIC_ENEMY, b));
						this.m_actors[this.m_actors.length - 1].setAction(new ActionWandererMelee(this.m_actors[this.m_actors.length - 1], h, g, m, k));
						break;
					case 2:
						this.add(new WandererMelee(this.m_world.objectCanvas(), this.m_world, a, f, l, ActorManager.GENERIC_ENEMY, b)),
						this.m_actors[this.m_actors.length - 1].setAction(new ActionRanged(this.m_actors[this.m_actors.length - 1], h, g, m, k))
					}
				}
			}
			Global.game.portalsReadyToSummon && (Global.game.portalsReadyToSummon = !1)
		}
	}
};
ActorManager.prototype.initWave = function(a) {
	if (1 === Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]]) this.outOfWaves = !0;
	else if (Global.game.portalsReadyToSummon || !(8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM])) {
		this.m_hasStarted = !0;
		var b = Application.config["vu_levelGame" + Global.savedNumData[Global.INDEX_CURRENT_ROOM]][a];
		if (b) {
			GameVillains.instance.setDropParameters(b.weaponDrop, b.weaponLimit, b.hpDrop, b.hpLimit, b.powerupDrop, b.powerupLimit, b.coinDrop, b.coinLimit);
			for (var c = 1; c <= Application.config.settings.maxBugsPerWave; c++) {
				for (var d = null,
				e = null,
				f = null,
				g = 0; g < Application.config.vu_enemy_mask.length; g++) if (Application.config.vu_enemy_mask[g].name === b["mask" + c]) {
					d = Application.config.vu_enemy_mask[g];
					e = Application.config.vu_behaviors[d.behavior1];
					100 !== d.behavior1 && (f = Application.config.vu_attacks[e.attackType]);
					break
				}
				if (d) {
					var h = b["door" + c];
					GameVillains.instance.usedDoors.push(h);
					GameVillains.instance.usedGenerator.push(h);
					var g = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + h + "XSpawn": "portal" + h + "XSpawn"],
					k = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + h + "YSpawn": "portal" + h + "YSpawn"],
					l = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + h + "inX": "portal" + h + "inX"],
					m = Application.config.settings[8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? "door" + h + "inY": "portal" + h + "inY"];
					switch (d.type) {
					case 0:
						this.add(new WandererMelee(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_ENEMY, d));
						this.m_actors[this.m_actors.length - 1].setAction(new ActionWandererMelee(this.m_actors[this.m_actors.length - 1], e, f, l, m));
						break;
					case 2:
						this.add(new WandererMelee(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_ENEMY, d));
						this.m_actors[this.m_actors.length - 1].setAction(new ActionRanged(this.m_actors[this.m_actors.length - 1], e, f, l, m));
						break;
					case 11:
						this.add(new BossPsychobot(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_BOSS, d, this.m_enemyDoorAngles[h - 1]));
						for (f = 1; f <= Application.config.settings.maxBossBehaviors; f++) switch (e = d["behavior" + f], e) {
						case 100:
							this.m_actors[this.m_actors.length - 1].addAction(new BossBlinkingInAction(this.m_actors[this.m_actors.length - 1], Application.config.settings["bossDoor" + h + "X"], Application.config.settings["bossDoor" + h + "Y"]), d["hpBehavior" + f]);
							break;
						case 10:
							this.m_actors[this.m_actors.length - 1].addAction(new PsychobotTeleport1(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 0, 0), d["hpBehavior" + f]);
							break;
						case 11:
							this.m_actors[this.m_actors.length - 1].addAction(new PsychobotTeleport2(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 0, 0), d["hpBehavior" + f])
						}
						break;
					case 12:
						this.add(new BossGremoblin(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_BOSS, d, this.m_enemyDoorAngles[h - 1]));
						for (f = 1; f <= Application.config.settings.maxBossBehaviors; f++) switch (e = d["behavior" + f], e) {
						case 100:
							this.m_actors[this.m_actors.length - 1].addAction(new BossBlinkingInAction(this.m_actors[this.m_actors.length - 1], Application.config.settings["bossDoor" + h + "X"], Application.config.settings["bossDoor" + h + "Y"]), d["hpBehavior" + f]);
							break;
						case 12:
							this.m_actors[this.m_actors.length - 1].addAction(new GremoblinSpikes(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 0, 0), d["hpBehavior" + f]);
							break;
						case 13:
							this.m_actors[this.m_actors.length - 1].addAction(new GremoblinSummon(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 375, 150), d["hpBehavior" + f])
						}
						break;
					case 13:
						this.add(new BossHaterShip(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_BOSS, d, this.m_enemyDoorAngles[h - 1]));
						for (f = 1; f <= Application.config.settings.maxBossBehaviors; f++) switch (e = d["behavior" + f], e) {
						case 100:
							this.m_actors[this.m_actors.length - 1].addAction(new BossBlinkingInAction(this.m_actors[this.m_actors.length - 1], Application.config.settings["bossDoor" + h + "X"], Application.config.settings["bossDoor" + h + "Y"]), d["hpBehavior" + f]);
							break;
						case 14:
							this.m_actors[this.m_actors.length - 1].addAction(new HaterShipMinilaser(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 120, 300), d["hpBehavior" + f]);
							break;
						case 15:
							this.m_actors[this.m_actors.length - 1].addAction(new HaterShipMegalaser(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 0, 0), d["hpBehavior" + f])
						}
						break;
					case 14:
						this.add(new BossNormbot(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_BOSS, d, this.m_enemyDoorAngles[h - 1]));
						for (f = 1; f <= Application.config.settings.maxBossBehaviors; f++) switch (e = d["behavior" + f], e) {
						case 100:
							this.m_actors[this.m_actors.length - 1].addAction(new BossBlinkingInAction(this.m_actors[this.m_actors.length - 1], Application.config.settings["bossDoor" + h + "X"], Application.config.settings["bossDoor" + h + "Y"]), d["hpBehavior" + f]);
							break;
						case 16:
							this.m_actors[this.m_actors.length - 1].addAction(new NormbotMissiles(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 0, 0), d["hpBehavior" + f]);
							break;
						case 17:
							this.m_actors[this.m_actors.length - 1].addAction(new NormbotLasers(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 0, 0), d["hpBehavior" + f])
						}
						break;
					case 15:
						this.add(new BossBillCipher(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_BOSS, d, this.m_enemyDoorAngles[h - 1]));
						for (g = 1; g <= Application.config.settings.maxBossBehaviors; g++) switch (e = d["behavior" + g], e) {
						case 100:
							this.m_actors[this.m_actors.length - 1].addAction(new BossBlinkingInAction(this.m_actors[this.m_actors.length - 1], Application.config.settings["bossDoor" + h + "X"], Application.config.settings["bossDoor" + h + "Y"]), d["hpBehavior" + g]);
							break;
						case 18:
							this.m_actors[this.m_actors.length - 1].addAction(new BillCipherTraps(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 120, 170), d["hpBehavior" + g]);
							break;
						case 19:
							this.m_actors[this.m_actors.length - 1].addAction(new BillCipherSummon(this.m_actors[this.m_actors.length - 1], Application.config.vu_behaviors[e], Application.config.vu_attacks[Application.config.vu_behaviors[e].attackType], 0, 0), d["hpBehavior" + g])
						}
						break;
					case 20:
						this.add(new WandererMelee(this.m_world.objectCanvas(), this.m_world, a, g, k, ActorManager.GENERIC_ENEMY, d)),
						this.m_actors[this.m_actors.length - 1].setAction(new ActionTutorialDummy(this.m_actors[this.m_actors.length - 1], e, l, m, c))
					}
				}
			} (8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] && 1 <= a || 14 === Global.savedNumData[Global.INDEX_CURRENT_ROOM]) && GameVillains.instance.openDoors(!0);
			Global.game.portalsReadyToSummon && (Global.game.portalsReadyToSummon = !1)
		} else this.outOfWaves || (this.outOfWaves = !0, this.m_timerWave1 = 0)
	}
};
ActorManager.prototype.getBuilder = function() {
	return this.m_builder
};
ActorManager.prototype.update = function(a) {
	ActorManager.superClass_.update.call(this, a);
	this.enemiesLeft = !1;
	for (a = 0; a < this.m_actors.length; a++) if (this.m_actors[a].id() === ActorManager.GENERIC_ENEMY || this.m_actors[a].id() === ActorManager.GENERIC_BOSS) this.enemiesLeft = !0;
	Global.game.levelCleared || (this.m_hasStarted && 0 === Global.game.findAvailableDoorArray(1).length && 8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.centerItem().state() === CenterItem.ST_CAMERA_HIDDEN && Global.game.centerItem().gotoState(CenterItem.ST_CAMERA_APPEAR), !this.enemiesLeft && 8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] && this.m_hasStarted && (this.outOfWaves = !0, Global.game.world().player().gotoState(PlayerGame.ST_PLAYER_WIN), Global.game.world().player().setKeyboardEnabled(!1), HudGame.instance.showMessage(!0, 2), Global.game.saveCurrentStatus()), this.enemiesLeft || !Global.game.portalsReadyToSummon || this.outOfWaves || 0 !== this.m_timerWave1 ? !this.enemiesLeft && Global.game.portalsReadyToSummon && this.outOfWaves && 0 === this.m_timerWave2 && 8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM] && (this.m_wave++, this.initRandomWave(this.m_wave)) : (this.m_wave++, this.initWave(this.m_wave)), HudGame.instance.activeTutorial && !this.enemiesLeft && this.m_hasStarted && 14 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.endLevelTutorial(14))
};
ActorManager.prototype.free = function() {
	ActorManager.superClass_.free.call(this)
};
ActorManager.ITEM = 1;
ActorManager.prototype.initNextWave = function() {
	this.m_wave++;
	this.initWave(this.m_wave)
};
ActorManager.prototype.hasStarted = function() {
	return this.m_hasStarted
};
ActorManager.prototype.hasEnemiesLeft = function() {
	for (var a = 0,
	b = 0; b < this.m_actors.length; b++) a += this.m_actors[b].id() === ActorManager.GENERIC_ENEMY ? 1 : 0;
	return 0 < a
};
function GameVillains(a, b, c) {
	SGame.call(this, a);
	this.win = !1;
	this.m_canvasControl = c;
	this.m_pointer = null;
	this.m_reset = this.moveStick = this.inTransition = this.playerWin = this.isPaused = a._sorted = !1;
	this.m_world = null;
	this.m_finish = !1;
	this.m_idTutorial = 0;
	this.m_effectGame = [];
	this.m_collisionVisible = !1;
	this.m_dataWorld = b;
	this.m_score = 0;
	GameVillains.instance = this;
	ControlTouch.instance.setMultitouchGame(!0);
	ControlTouch.instance.resetTouchControl();
	this.reset();
	this.m_pointer = new Pointer(a);
	this.virtualStickShoot = this.virtualStickMove = null;
	this.createVirtualStick();
	this.m_coinDropLimit = this.m_coinDropPercent = this.m_powerupDropLimit = this.m_powerupDropPercent = this.m_hpDropLimit = this.m_hpDropPercent = this.m_weaponDropLimit = this.m_weaponDropPercent = this.m_room = 0;
	this.m_weaponSkins = [];
	this.m_powerupSkins = [];
	this.m_dropItemSkins = [];
	this.loadPowerupWeapons();
	this.m_hazards = [];
	this.m_traps = [];
	13 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && (this.initHazards(), this.initBreakable(), this.initCenterItem());
	this.m_doors = [];
	this.usedDoors = [];
	this.m_doorTimer = 0;
	this.m_doorsMaxTime = Application.config.settings.doorOpenTime;
	this.m_navigationDoors = ["roomRight", "roomLeft", "roomTop", "roomBot"];
	this.m_doorLimits = [[630, 750, 280, 340], [0, 120, 280, 340], [345, 415, 0, 170], [345, 415, 460, 750]];
	for (a = 1; 4 >= a; a++) this.m_doors.push(new BaseDoor(this.m_world.objectCanvas(), this.m_world, Application.config.settings["door" + a + "X"], Application.config.settings["door" + a + "Y"], ActorManager.GENERIC_DOOR, "mc_door" + a + "_", a));
	for (a = 0; 2 >= a; a++) - 100 === Application.config.vu_navigation[Global.savedNumData[Global.INDEX_CURRENT_ROOM]][this.m_navigationDoors[a]] && this.m_doors[a].gotoState(BaseDoor.ST_DOOR_LOCKED);
	this.m_portals = [];
	this.usedGenerator = [];
	this.initGenerator();
	this.m_lives = Global.savedNumData[Global.INDEX_CURRENT_LIVES];
	HudGame.instance.setLives(this.m_lives);
	PlayerGame.instance.setHealth(Global.savedNumData[Global.INDEX_CURRENT_HP]);
	PlayerGame.instance.setTypeWeapon(Global.savedNumData[Global.INDEX_CURRENT_WEAPON], !1);
	a = 0;
	switch (Global.savedNumData[Global.INDEX_CURRENT_WEAPON]) {
	case ShotHandler.BOUNCING:
		a = Application.config.settings.ammoBouncingShot;
		break;
	case ShotHandler.MULTIPLE:
		a = Application.config.settings.ammoMultipleShot;
		break;
	default:
		a = 1
	}
	this.m_world.shotHandler().setAmmo(Global.savedNumData[Global.INDEX_CURRENT_MP], a);
	this.m_portalsAreVulnerable = this.levelCleared = this.endTutorial = !1;
	this.m_deadTimer = 0;
	this.portalsReadyToSummon = this.activeShotBillCipher = !1;
	this.m_extraLifeScore = Application.config.settings.extraLifeScore;
	this.gotoEndGame = !1;
	this.m_fadeGameOut = this.m_fadeGameIn = null;
	this.endGame = !1;
	this.fadeIn()
}
goog.inherits(GameVillains, SGame);
GameVillains.MAX_DELTA = 50;
GameVillains.instance = null;
GameVillains.MOUSE_CONTROL_OPTIONS = 0;
GameVillains.prototype.fadeIn = function() {
	this.m_fadeGameIn = this.addEffect("mcFade_in", 0, 0);
	this.m_fadeGameIn.setScale(50, 35)
};
GameVillains.prototype.fadeOut = function() {
	HudGame.instance.fadeOut();
	this.m_fadeGameOut = this.addEffect("mcFade_out", 0, 0);
	this.m_fadeGameOut.setScale(50, 35)
};
GameVillains.prototype.shakeCanvas = function() {
	Application.instance.playSound("SND_SCENERY_EXPLOSION");
	Common.shake(this.m_canvas, 12, 15, null, null)
};
GameVillains.prototype.addEffect = function(a, b, c, d) {
	d = "undefined" !== typeof d ? d: 0;
	a = Application.instance.getClip(a);
	this.m_canvas.addChild(a.sprite);
	a.sprite._depth = Global.DEPTH_EFFECT;
	a.setX(b);
	a.setY(c);
	a.setRotation(d);
	this.m_effectGame.push(a);
	return a
};
GameVillains.prototype.createVirtualStick = function() {
	Application.isMobileDevice && 2 === Global.MOBILE_MODE_GAME && (PlayerGame.instance.isFollow = !1, this.moveStick = HudGame.instance.activeTutorial ? !1 : !0, this.destroyVirtualStick(), this.virtualStickMove = new VirtualStick(this.m_canvasControl, 100, 100, 400, "mcUIStickBase", "mcUIStickPointerMove"), this.virtualStickMove.addChangeListener(this, this.onStickMove), this.virtualStickMove.addReleaseListener(this, this.onStickRelease), this.virtualStickShoot = new VirtualStick(this.m_canvasControl, 100, 650, 400, "mcUIStickBase", "mcUIStickPointerAttack"), this.virtualStickShoot.addChangeListener(this, this.onShootMove), this.virtualStickShoot.addReleaseListener(this, this.onShootRelease))
};
GameVillains.prototype.destroyVirtualStick = function() {
	Application.info("destroyVirtualStick >>> " + this.virtualStickShoot);
	null !== this.virtualStickMove && this.virtualStickMove.free();
	null !== this.virtualStickShoot && this.virtualStickShoot.free();
	this.virtualStickMove = this.virtualStickShoot = null
};
GameVillains.prototype.activateGameModeAutomatic = function() {
	Application.isMobileDevice && (this.destroyVirtualStick(), HudGame.instance.activeTutorial ? (PlayerGame.instance.setKeyboardEnabled(!1), PlayerGame.instance.isFollow = !1) : PlayerGame.instance.isFollow = !0, PlayerGame.instance.activeLinearMovement(), this.virtualStickShoot = this.virtualStickMove = null)
};
GameVillains.prototype.actionOpeningGenerator = function(a, b) {
	for (var c = this.m_world.actorManager().getActors(), d = 0; d < c.length; d++) c[d].id() === ActorManager.GENERIC_PORTAL && c[d].generatorId() === a && c[d].openDoor(b)
};
GameVillains.prototype.addBillCipherTrap = function(a, b) {
	this.m_traps.push(new BillCipherTrap(this.m_world.objectCanvas(), this.m_world, ActorManager.GENERIC_HAZARD, a, b))
};
GameVillains.prototype.addForceItem = function(a, b, c) {
	if ("" !== c) {
		var d = null;
		switch (c) {
		case "bouncing":
			d = new ItemBouncing(this.m_world.objectCanvas(), this.m_world, a, b, c, ActorManager.GENERIC_ITEMS);
			break;
		case "multi":
			d = new ItemMulti(this.m_world.objectCanvas(), this.m_world, a, b, c, ActorManager.GENERIC_ITEMS);
			break;
		case "bomb":
			d = new ItemBomb(this.m_world.objectCanvas(), this.m_world, a, b, c, ActorManager.GENERIC_ITEMS);
			break;
		case "shield":
			d = new ItemShield(this.m_world.objectCanvas(), this.m_world, a, b, "Shield", ActorManager.GENERIC_SHIELD);
			break;
		case "damage":
			d = new ItemDamage(this.m_world.objectCanvas(), this.m_world, a, b, "Damage", ActorManager.GENERIC_ITEMS);
			break;
		case "reargun":
			d = new ItemReargun(this.m_world.objectCanvas(), this.m_world, a, b, "Reargun", ActorManager.GENERIC_ITEMS);
			break;
		case "coin":
			d = new ItemCoin(this.m_world.objectCanvas(), this.m_world, a, b, "Coin", ActorManager.GENERIC_ITEMS);
			break;
		case "heart":
			d = new ItemHeart(this.m_world.objectCanvas(), this.m_world, a, b, "Hp", ActorManager.GENERIC_ITEMS);
			break;
		case "bombExplode":
			d = new Bomb(this.m_world.objectCanvas(), this.m_world, a, b)
		}
		this.m_world.actorManager().add(d)
	}
};
GameVillains.prototype.addHealth = function(a) {
	this.m_world.player().increaseHealth(a)
};
GameVillains.prototype.addItems = function(a, b) {
	var c = null,
	d = "";
	switch (this.m_dropItemSkins[Math.floor(Math.random() * this.m_dropItemSkins.length)]) {
	case "weapon":
		if (0 === this.m_weaponDropLimit || Math.random() < this.m_weaponDropPercent) return;
		this.m_weaponDropLimit--;
		d = this.m_weaponSkins[Math.floor(Math.random() * this.m_weaponSkins.length)];
		switch (d) {
		case "bouncing":
		case "bomb":
			c = new ItemBouncing(this.m_world.objectCanvas(), this.m_world, a, b, d, ActorManager.GENERIC_ITEMS);
			break;
		case "multi":
			c = new ItemMulti(this.m_world.objectCanvas(), this.m_world, a, b, d, ActorManager.GENERIC_ITEMS)
		}
		break;
	case "hp":
		if (0 === this.m_hpDropLimit || Math.random() < this.m_hpDropPercent) return;
		this.m_hpDropLimit--;
		c = new ItemHeart(this.m_world.objectCanvas(), this.m_world, a, b, "Hp", ActorManager.GENERIC_ITEMS);
		break;
	case "coin":
		if (0 === this.m_coinDropLimit || Math.random() < this.m_coinDropPercent) return;
		this.m_coinDropLimit--;
		c = new ItemCoin(this.m_world.objectCanvas(), this.m_world, a, b, "Coin", ActorManager.GENERIC_ITEMS);
		break;
	case "powerup":
		if (0 === this.m_powerupDropLimit || Math.random() < this.m_powerupDropPercent) return;
		this.m_powerupDropLimit--;
		d = this.m_powerupSkins[Math.floor(Math.random() * this.m_powerupSkins.length)];
		switch (d) {
		case "Shield":
			c = new ItemShield(this.m_world.objectCanvas(), this.m_world, a, b, d, ActorManager.GENERIC_SHIELD);
			break;
		case "Damage":
			c = new ItemDamage(this.m_world.objectCanvas(), this.m_world, a, b, d, ActorManager.GENERIC_ITEMS);
			break;
		case "Reargun":
			c = new ItemReargun(this.m_world.objectCanvas(), this.m_world, a, b, d, ActorManager.GENERIC_ITEMS);
			break;
		case "Bomb":
			c = new ItemBomb(this.m_world.objectCanvas(), this.m_world, a, b, "bomb", ActorManager.GENERIC_ITEMS)
		}
	}
	this.m_world.actorManager().add(c)
};
GameVillains.prototype.addLife = function(a) {
	this.m_lives += a;
	0 > this.m_lives ? (Global.savedNumData[Global.INDEX_CURRENT_SCORE] > Global.savedNumData[Global.INDEX_HIGHEST_SCORE] && (Global.savedNumData[Global.INDEX_HIGHEST_SCORE] = Global.savedNumData[Global.INDEX_CURRENT_SCORE], Global.savedNumData[Global.INDEX_NEW_HIGHEST_SCORE] = 1), Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))) : HudGame.instance.setLives(this.m_lives);
	Global.savedNumData[Global.INDEX_CURRENT_LIVES] = this.m_lives;
	Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))
};
GameVillains.prototype.addScore = function(a) {
	var b = Math.floor(Global.savedNumData[Global.INDEX_CURRENT_SCORE] / this.m_extraLifeScore);
	Global.savedNumData[Global.INDEX_CURRENT_SCORE] += a;
	Math.floor(Global.savedNumData[Global.INDEX_CURRENT_SCORE] / this.m_extraLifeScore) > b && this.addLife(Math.floor(Global.savedNumData[Global.INDEX_CURRENT_SCORE] / this.m_extraLifeScore) - b);
	HudGame.instance.setScore(Global.savedNumData[Global.INDEX_CURRENT_SCORE])
};
GameVillains.prototype.centerItem = function() {
	for (var a = this.m_world.actorManager().getActors(), b = 0; b < a.length; b++) if (null !== a[b] && a[b].id() === ActorManager.GENERIC_CENTER_ITEM) return a[b]
};
GameVillains.prototype.deactivateArmorAllGenerators = function() {
	for (var a = this.m_world.actorManager().getActors(), b = 0; b < a.length; b++) null !== a[b] && a[b].id() === ActorManager.GENERIC_PORTAL && a[b].deactivateArmor()
};
GameVillains.prototype.debugToogleCollision = function() {
	this.m_collisionVisible = !this.m_collisionVisible;
	this.m_world.showCollision(this.m_collisionVisible)
};
GameVillains.prototype.destroyBreakables = function() {
	this.m_world.actorManager().removeBreakables()
};
GameVillains.prototype.destroyHazards = function() {
	for (var a = 0; a < this.m_hazards.length; a++) this.m_hazards[a].free(),
	this.m_hazards[a] = null;
	this.m_hazards = null
};
GameVillains.prototype.findAvailableDoorArray = function(a) {
	var b = [];
	if (0 === this.m_portals.length) return b;
	for (var c = 0; c < a; c++) b.push(this.m_portals[c % this.m_portals.length]);
	return b
};
GameVillains.prototype.findDoor = function(a, b) {
	for (var c = 0,
	d = 0,
	e = 1E6,
	f = 1; 4 >= f; f++) c = Math.sqrt((a - Application.config.settings["door" + f + "X"]) * (a - Application.config.settings["door" + f + "X"]) + (b - Application.config.settings["door" + f + "Y"]) * (b - Application.config.settings["door" + f + "Y"])),
	c < e && (d = f, e = c);
	return d
};
GameVillains.prototype.free = function() {
	Global.savedNumData[Global.INDEX_CURRENT_SCORE] > Global.savedNumData[Global.INDEX_HIGHEST_SCORE] && (Global.savedNumData[Global.INDEX_HIGHEST_SCORE] = Global.savedNumData[Global.INDEX_CURRENT_SCORE], Global.savedNumData[Global.INDEX_NEW_HIGHEST_SCORE] = 1);
	Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData));
	for (var a = 0; a < this.m_doors.length; a++) this.m_doors[a].free(),
	this.m_doors[a] = null;
	this.m_doors = null;
	if (this.m_hazards) {
		for (a = 0; a < this.m_hazards.length; a++) null !== this.m_hazards[a] && (this.m_hazards[a].free(), this.m_hazards[a] = null);
		this.m_hazards = null
	}
	if (this.m_traps) {
		for (a = 0; a < this.m_traps.length; a++) null !== this.m_traps[a] && (this.m_traps[a].free(), this.m_traps[a] = null);
		this.m_traps = null
	}
	this.m_navigationDoors = this.m_portals = null;
	for (a = 0; a < this.m_effectGame.length; a++) this.m_effectGame[a] = null,
	this.m_effectGame.splice(a--, 1);
	this.m_effectGame = null;
	null !== this.m_fadeGameIn && (this.m_fadeGameIn.free(), this.m_fadeGameIn = null);
	null !== this.m_fadeGameOut && (this.m_fadeGameOut.free(), this.m_fadeGameOut = null);
	this.destroyVirtualStick();
	GameVillains.superClass_.free.call(this)
};
GameVillains.prototype.getCamera = function() {
	return this.m_world.camera()
};
GameVillains.prototype.hideCenterItem = function(a) {
	a && (HudGame.instance.activeTutorial || this.actionAppearGenerator(!0), this.centerItem().gotoState(CenterItem.ST_CAMERA_DISAPPEAR))
};
GameVillains.prototype.actionAppearGenerator = function(a) {
	for (var b = this.m_world.actorManager().getActors(), c = 0; c < b.length; c++) b[c].id() === ActorManager.GENERIC_PORTAL && this.isValidPortal(b[c].generatorId()) && b[c].activeGenerator(a)
};
GameVillains.prototype.init = function() {
	this.m_hud = new HudGame
};
GameVillains.prototype.initBreakable = function() {
	for (var a = Application.config.vu_breakable[Global.savedNumData[Global.INDEX_CURRENT_ROOM]], b = 1; b <= Application.config.settings.maxBreakablesPerRoom; b++) if ("" !== a["type" + b]) switch (a["type" + b]) {
	case "breakable_gf":
	case "breakable_pf":
	case "breakable_wy":
	case "breakable_rc":
		var c = Global.savedNumData[Global.INDEX_CURRENT_ROOM] - 1 + "_" + b;
		if ("undefined" === typeof BKBasic.BREAKABLE_DATA[c] || 1 === BKBasic.BREAKABLE_DATA[c]) this.m_world.actorManager().add(new BKBasic(this.m_world.objectCanvas(), this.m_world, a["X" + b], a["Y" + b], a["type" + b], ActorManager.GENERIC_BREAKABLE, a["item" + b], a["health" + b], b)),
		BKBasic.BREAKABLE_DATA[c] = 1
	}
};
GameVillains.prototype.addShotBomb = function(a, b, c) {
	a = new ShotBomb(this.m_world.objectCanvas(), this.m_world, b, c, a, 0.4, 30);
	this.m_world.actorManager().add(a)
};
GameVillains.prototype.initCenterItem = function() {
	var a = 8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? new CenterItem(this.m_world.objectCanvas(), this.m_world, 375, 260, ActorManager.GENERIC_CENTER_ITEM, 0 === Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]]) : null;
	a && this.m_world.actorManager().add(a)
};
GameVillains.prototype.initGenerator = function() {
	if (0 === this.m_portals.length) for (var a = Application.config.vu_generator,
	b = 0; 4 > b; b++) if (1 === a[b]["Level" + Global.savedNumData[Global.INDEX_CURRENT_ROOM]]) {
		var c = new Generator(this.m_world.objectCanvas(), this.m_world, a[b].x, a[b].y, ActorManager.GENERIC_PORTAL, a[b], b + 1, 0 === Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]]);
		this.m_portals.push(c.generatorId());
		this.m_world.actorManager().add(c)
	}
};
GameVillains.prototype.initHazards = function() {
	for (var a = Application.config.vu_hazards[Global.savedNumData[Global.INDEX_CURRENT_ROOM]], b = 1; b <= Application.config.settings.maxHazardsPerRoom; b++) if ("" !== a["type" + b]) switch (a["type" + b]) {
	case "spike":
		this.m_hazards.push(new HazardSpike(this.m_world.objectCanvas(), this.m_world, ActorManager.GENERIC_HAZARD, a["X" + b], a["Y" + b], a["type" + b]));
		break;
	case "waste":
		this.m_hazards.push(new HazardWaste(this.m_world.objectCanvas(), this.m_world, ActorManager.GENERIC_HAZARD, a["X" + b], a["Y" + b], a["type" + b]))
	}
};
GameVillains.prototype.isValidPortal = function(a) {
	for (var b = 0; b < this.m_portals.length; b++) if (a === this.m_portals[b]) return ! 0;
	return ! 1
};
GameVillains.prototype.liftSpikes = function(a, b) {
	if (b) for (var c = 0; c < 0.5 * this.m_hazards.length; c++) this.m_hazards[c].gotoState(a ? HazardSpike.ST_HAZARD_APPEAR: HazardSpike.ST_HAZARD_HIDE);
	else for (c = 0.5 * this.m_hazards.length; c < this.m_hazards.length; c++) this.m_hazards[c].gotoState(a ? HazardSpike.ST_HAZARD_APPEAR: HazardSpike.ST_HAZARD_HIDE)
};
GameVillains.prototype.loadPowerupWeapons = function() {
	var a = Application.config.vu_powerups[Global.savedNumData[Global.INDEX_CURRENT_ROOM]];
	1 === a.powerupShield && this.m_powerupSkins.push("Shield");
	1 === a.powerupDamage && this.m_powerupSkins.push("Damage");
	1 === a.powerupReargun && this.m_powerupSkins.push("Reargun");
	1 === a.powerupBomb && this.m_powerupSkins.push("Bomb");
	1 === a.weaponBouncy && this.m_weaponSkins.push("bouncing");
	1 === a.weaponMultiple && this.m_weaponSkins.push("multi");
	0 !== this.m_powerupSkins.length && this.m_dropItemSkins.push("powerup");
	0 !== this.m_weaponSkins.length && this.m_dropItemSkins.push("weapon");
	this.m_dropItemSkins.push("hp");
	this.m_dropItemSkins.push("coin")
};
GameVillains.prototype.onLostFocus = function() {
	if (null !== this.m_world.player()) this.m_world.player().onLostFocus()
};
GameVillains.prototype.onGameEnd = function() {
	this.m_finish = !0
};
GameVillains.prototype.onGotFocus = function() {};
GameVillains.prototype.onKeyDown = function(a) {
	GameVillains.superClass_.onKeyDown.call(this, a);
	a === Common.KEY_1 && this.debugToogleCollision();
	a === Common.KEY_SPACE && (HudGame.instance.activeTutorial ? this.nextPanelTutorial() : HudGame.instance.activatedPanel && HudGame.instance.enableTutorial && this.nextDialoguePanelBoss());
	this.m_world.onKeyDown(a)
};
GameVillains.prototype.onKeyUp = function(a) {
	GameVillains.superClass_.onKeyUp.call(this, a);
	this.m_world.onKeyUp(a)
};
GameVillains.prototype.onMouseDown = function(a) {
	this.onPress(a)
};
GameVillains.prototype.onMouseUp = function(a) {
	this.onRelease(a)
};
GameVillains.prototype.onMouseMove = function(a) {
	this.onPointerMove(a)
};
GameVillains.prototype.onTouchStart = function(a) {
	this.onPress(a)
};
GameVillains.prototype.onTouchEnd = function(a) {
	this.onRelease(a)
};
GameVillains.prototype.onTouchMove = function(a) {
	this.onPointerMove(a)
};
GameVillains.prototype.onPointerMove = function(a) {
	if (null !== this.virtualStickMove) this.virtualStickMove.onPointerMove(a);
	if (null !== this.virtualStickShoot) this.virtualStickShoot.onPointerMove(a);
	this.m_world.m_player.onMouseMove(a);
	this.m_pointer.onMouseMove(a)
};
GameVillains.prototype.onPress = function(a) {
	if (350 >= a.offsetX) {
		if (null !== this.virtualStickMove) this.virtualStickMove.onPointerPress(a)
	} else null !== this.virtualStickShoot && (this.virtualStickShoot.onPointerPress(a), this.m_world.player().startShooting(!0));
	this.m_pointer.onMouseDown(a);
	this.m_world.m_player.onMouseDown(a);
	HudGame.instance.activeTutorial ? this.nextPanelTutorial() : HudGame.instance.activatedPanel && HudGame.instance.enableTutorial && this.nextDialoguePanelBoss()
};
GameVillains.prototype.nextDialoguePanelBoss = function() {
	for (var a = this.m_world.actorManager().getActors(), b = 0; b < a.length; b++) null !== a[b] && a[b].id() === ActorManager.GENERIC_BOSS && a[b].nextDialoguePanel()
};
GameVillains.prototype.onRelease = function(a) {
	if (null !== this.virtualStickMove) this.virtualStickMove.onPointerRelease(a);
	if (null !== this.virtualStickShoot) this.virtualStickShoot.onPointerRelease(a);
	this.m_world.m_player.onMouseUp(a)
};
GameVillains.prototype.findNextTarget = function() {
	for (var a = 0,
	b = 700,
	c = this.m_world.actorManager().getActors(), d = 0, e = 0, f = 0; f < c.length; f++) if (null !== c[f]) if (c[f].id() !== ActorManager.GENERIC_ENEMY && c[f].id() !== ActorManager.GENERIC_BREAKABLE || c[f].isAnimDestroying() || (a = Common.distance(this.m_world.player().x(), this.m_world.player().y(), c[f].x(), c[f].y()), a < b && (b = a, d = c[f].x(), e = c[f].y())), c[f].id() === ActorManager.GENERIC_BOSS) {
		if (!c[f].isAnimDestroying() && (a = Common.distance(this.m_world.player().x(), this.m_world.player().y(), c[f].x(), c[f].y()), a < b)) {
			b = a;
			a = 0;
			switch (c[f].skinBoss()) {
			case "mcBoss4":
				a = -100;
				break;
			case "mcBoss1":
			case "mcBoss2":
			case "mcBoss3":
			case "mcBoss5":
			case "mcBoss6":
				a = -50
			}
			d = c[f].x();
			e = c[f].y() + a
		}
	} else c[f].id() === ActorManager.GENERIC_PORTAL ? !c[f].isAnimDestroying() && c[f].isEnableGenerator() && (a = Common.distance(this.m_world.player().x(), this.m_world.player().y(), c[f].x(), c[f].y()), a < b && (b = a, d = c[f].x(), e = c[f].y())) : c[f].id() === ActorManager.GENERIC_CENTER_ITEM && c[f].isAlive() && (a = Common.distance(this.m_world.player().x(), this.m_world.player().y(), c[f].x(), c[f].posY()), a < b && (b = a, d = c[f].x(), e = c[f].y()));
	this.m_world.player().shootX = d;
	this.m_world.player().shootY = e
};
GameVillains.prototype.onShootMove = function(a) {
	this.moveStick && this.m_world && this.m_world.player() && (this.m_world.player().shootX = a.forceX, this.m_world.player().shootY = a.forceY)
};
GameVillains.prototype.onShootRelease = function(a) {
	this.moveStick && this.m_world && this.m_world.player() && (this.m_world.player().startShooting(!1), this.m_world.player().shootX = 0, this.m_world.player().shootY = 0)
};
GameVillains.prototype.onStickMove = function(a) {
	this.moveStick && this.m_world && this.m_world.player() && (this.m_world.player().forceX = a.forceX, this.m_world.player().forceY = a.forceY, this.m_world.player().setAngleForStick(180 * a.angle / Math.PI))
};
GameVillains.prototype.onStickRelease = function(a) {
	this.moveStick && this.m_world && this.m_world.player() && (this.m_world.player().forceX = 0, this.m_world.player().forceY = 0, this.m_world.player().setStopMoveStick())
};
GameVillains.prototype.openAllDoors = function() {
	for (var a = 0; a < this.m_doors.length; a++) 0 <= Application.config.vu_navigation[Global.savedNumData[Global.INDEX_CURRENT_ROOM]][this.m_navigationDoors[a]] && this.m_doors[a].gotoState(BaseDoor.ST_DOOR_OPENING)
};
GameVillains.prototype.openDoors = function(a) {
	for (var b = 0; b < this.usedDoors.length; b++) this.m_doors[this.usedDoors[b] - 1].gotoState(a ? BaseDoor.ST_DOOR_OPENING: BaseDoor.ST_DOOR_CLOSING);
	this.m_doorTimer = a ? this.m_doorsMaxTime: 0
};
GameVillains.prototype.openGenerator = function(a) {
	for (var b = 0; b < this.usedGenerator.length; b++) this.actionOpeningGenerator(this.usedGenerator[b], a)
};
GameVillains.prototype.playerLeavingByDoor = function() {
	for (var a = !1,
	b = 0; 4 > b; b++) if (this.m_doors[b].isOpen() && this.m_world.player().x() >= this.m_doorLimits[b][0] && this.m_world.player().x() <= this.m_doorLimits[b][1] && this.m_world.player().y() >= this.m_doorLimits[b][2] && this.m_world.player().y() <= this.m_doorLimits[b][3]) {
		Application.log("INSIDE DOOR " + b);
		this.m_world.player().setBaseAction(new PlayerEnterAction(this.m_world.player(), !1, Application.config.settings["door" + (b + 1) + "XSpawn"], Application.config.settings["door" + (b + 1) + "YSpawn"], Application.config.vu_navigation[Global.savedNumData[Global.INDEX_CURRENT_ROOM]][this.m_navigationDoors[b]]));
		this.m_world.player().startAction();
		a = !0;
		switch (b) {
		case 0:
			Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM] = 2;
			break;
		case 1:
			Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM] = 1;
			break;
		case 2:
			Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM] = 4;
			break;
		case 3:
			Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM] = 3
		}
		Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))
	}
	a && !this.endGame && (this.endGame = !0, this.fadeOut())
};
GameVillains.prototype.pointer = function() {
	return this.m_pointer
};
GameVillains.prototype.removeBillCipherTraps = function() {
	for (var a = 0; a < this.m_traps.length; a++) this.m_traps[a].gotoState(BillCipherTrap.ST_HAZARD_ALERT)
};
GameVillains.prototype.removePortal = function(a) {
	if (! (0 >= this.m_portals.length)) for (var b = 0; b < this.m_portals.length; b++) if (this.m_portals[b] === a) {
		this.m_portals.splice(b--, 1);
		break
	}
};
GameVillains.prototype.reset = function() {
	this.m_world && (this.m_world.free(), this.m_world = null);
	this.m_world = new WorldGame(this.m_canvas, this);
	this.m_world.loadData(this.m_dataWorld);
	this.setScore(0);
	this.m_reset = !1
};
GameVillains.prototype.saveCurrentStatus = function() {
	if (this.m_portals) {
		if (0 === this.m_portals.length && this.m_world.actorManager().hasStarted() && 1 !== Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]]) {
			Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]] = 1;
			for (var a = 0,
			b = 0; b < Global.TOTAL_ROOMS; b++) a += Global.savedNumData[Global.INDEX_PASSED_ROOM_1 + b];
			Global.achievements.checkAchRoomService(a);
			Global.savedNumData[Global.INDEX_CURRENT_SCORE] > Global.savedNumData[Global.INDEX_HIGHEST_SCORE] && (Global.savedNumData[Global.INDEX_HIGHEST_SCORE] = Global.savedNumData[Global.INDEX_CURRENT_SCORE], Global.savedNumData[Global.INDEX_NEW_HIGHEST_SCORE] = 1);
			if (a === Global.TOTAL_ROOMS) {
				Global.savedNumData[Global.INDEX_PASSED_CHARACTER_1 - 1 + Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER]] = 1;
				for (b = a = 0; b < Global.TOTAL_CHARACTERS; b++) a += Global.savedNumData[Global.INDEX_PASSED_CHARACTER_1 + b];
				Global.achievements.checkAchGreero(a)
			}
			Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))
		}
		this.levelCleared = !0;
		switch (Global.savedNumData[Global.INDEX_CURRENT_ROOM]) {
		case 9:
			HudGame.instance.showPanelTutorial(!0, "STR_PSYCHOBOT_EXIT_1", !0, 4, !0, !0);
			HudGame.instance.startTutorial = !0;
			break;
		case 10:
			HudGame.instance.showPanelTutorial(!0, "STR_GREMOBLIN_EXIT_3", !0, 4, !0, !0);
			HudGame.instance.showPanelTutorial(!0, "STR_GREMOBLIN_EXIT_2", !0, 4, !0, !0);
			HudGame.instance.showPanelTutorial(!0, "STR_GREMOBLIN_EXIT_1", !0, 4, !0, !0);
			HudGame.instance.startTutorial = !0;
			break;
		case 11:
			HudGame.instance.showPanelTutorial(!0, "STR_HATERSHIP_EXIT_1", !0, 4, !0, !0);
			HudGame.instance.startTutorial = !0;
			break;
		case 12:
			HudGame.instance.showPanelTutorial(!0, "STR_NORMBOT_EXIT_1", !0, 4, !0, !0),
			HudGame.instance.startTutorial = !0
		}
	}
};
GameVillains.prototype.setDropParameters = function(a, b, c, d, e, f, g, h) {
	this.m_weaponDropPercent = a;
	this.m_weaponDropLimit = b;
	this.m_hpDropPercent = c;
	this.m_hpDropLimit = d;
	this.m_powerupDropPercent = e;
	this.m_powerupDropLimit = f;
	this.m_coinDropPercent = g;
	this.m_coinDropLimit = h
};
GameVillains.prototype.setScore = function(a) {
	this.m_score = a;
	HudGame.instance.setScore(Global.savedNumData[Global.INDEX_CURRENT_SCORE])
};
GameVillains.prototype.startDeadTimer = function() {
	this.m_deadTimer = 2E3
};
GameVillains.prototype.setScrollSpeed = function(a) {
	this.m_world.m_player.onChangeBaseSpeed(a);
	this.m_world.camera().setSpeed(a)
};
GameVillains.prototype.update = function(a) {
	if (this.m_reset) this.reset(),
	ControlTouch.instance.resetTouchControl();
	else if (this.m_finish) GuiGame.instance && (GuiGame.instance.removeGame(), ControlTouch.instance.resetTouchControl());
	else {
		a > GameVillains.MAX_DELTA && (a = GameVillains.MAX_DELTA);
		GameVillains.superClass_.update.call(this, a);
		this.m_world.update(a);
		if (this.m_doors) for (var b = 0; b < this.m_doors.length; b++) this.m_doors[b].update(a);
		0 < this.m_doorTimer && (this.m_doorTimer -= a, 0 >= this.m_doorTimer && (this.openDoors(!1), this.usedDoors = []));
		if (this.m_hazards) for (b = 0; b < this.m_hazards.length; b++) null !== this.m_hazards[b] && this.m_hazards[b].update(a);
		if (this.m_traps) for (b = 0; b < this.m_traps.length; b++) null !== this.m_traps[b] && (this.m_traps[b].isAwaitingDelete() ? (this.m_traps[b].free(), this.m_traps[b] = null, this.m_traps.splice(b--, 1)) : this.m_traps[b].update(a));
		null !== this.m_pointer && this.m_pointer.update(a);
		0 < this.m_deadTimer && !this.m_world.actorManager().enemiesLeft && (this.m_deadTimer -= a, 0 >= this.m_deadTimer && (this.m_deadTimer = 0, this.actionAppearGenerator(!0)));
		1 === Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]] && this.m_world && this.m_world.player() && !this.m_world.player().baseAction() && this.playerLeavingByDoor();
		if (this.m_effectGame) for (b = 0; b < this.m_effectGame.length; b++) null !== this.m_effectGame[b] && (this.m_effectGame[b].currentFrame == this.m_effectGame[b].totalFrames - 1 ? (this.m_canvas.removeChild(this.m_effectGame[b].sprite), this.m_effectGame[b] = null, this.m_effectGame.splice(b--, 1)) : this.m_effectGame[b].update(a))
	}
	this.gotoEndGame && GuiManager.instance.gotoScreen(GuiManager.SC_CUTSCENE_2)
};
GameVillains.prototype.nextPanelTutorial = function() {
	if (HudGame.instance.enableTutorial && HudGame.instance.showPanel && !HudGame.instance.autoDisappear) {
		var a = !1,
		b = Global.savedNumData[Global.INDEX_CURRENT_ROOM];
		this.m_idTutorial += 1;
		switch (b) {
		case 14:
			switch (this.m_idTutorial) {
			case 2:
				this.m_world.actorManager().initWave(0);
				break;
			case 3:
				PlayerGame.instance.setKeyboardEnabled(!0);
				Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (PlayerGame.instance.isFollow = !0);
				a = this.moveStick = !0;
				break;
			case 4:
				PlayerGame.instance.setKeyboardEnabled(!0);
				this.moveStick = a = !0;
				Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (PlayerGame.instance.isFollow = !0);
				break;
			default:
				this.m_idTutorial = 0;
				return
			}
			break;
		case 0:
			switch (this.m_idTutorial) {
			case 2:
				break;
			case 3:
				this.actionAppearGenerator(!0);
				PlayerGame.instance.setKeyboardEnabled(!0);
				this.moveStick = !0;
				Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (PlayerGame.instance.isFollow = !0);
				HudGame.instance.showPanelTutorial(!1, "", !1, 0, !1);
				return;
			case 4:
				a = !0;
				break;
			case 5:
				PlayerGame.instance.setKeyboardEnabled(!1);
				this.moveStick = a = !1;
				Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (PlayerGame.instance.isFollow = !1);
				break;
			case 6:
				break;
			case 7:
				this.openAllDoors();
				PlayerGame.instance.setKeyboardEnabled(!0);
				this.moveStick = a = !0;
				Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (PlayerGame.instance.isFollow = !0);
				break;
			default:
				return
			}
		}
		HudGame.instance.showPanelTutorial(!0, "STR_TUTORIAL_INFO_" + b + "_" + this.m_idTutorial, a, 4, !1);
		HudGame.instance.startTutorial = !0
	}
};
GameVillains.prototype.endLevelTutorial = function(a) {
	if (!this.endTutorial) switch (this.endTutorial = !0, a) {
	case 14:
	case 0:
		HudGame.instance.enableTutorial = !0,
		HudGame.instance.autoDisappear = !1,
		HudGame.instance.showPanel = !0,
		this.nextPanelTutorial()
	}
};
GameVillains.prototype.initPanelTutorial = function() {
	this.m_idTutorial = 1;
	HudGame.instance.showPanelTutorial(!0, "STR_TUTORIAL_INFO_" + Global.savedNumData[Global.INDEX_CURRENT_ROOM] + "_" + this.m_idTutorial, !1, 4, !1);
	HudGame.instance.startTutorial = !0;
	PlayerGame.instance.isFollow = !1
};
GameVillains.prototype.world = function() {
	return this.m_world
};
function HudGame(a, b) {
	SScreen.call(this, a, b);
	HudGame.instance = this;
	$(".ui_enemybase").css("display", "none");
	this.m_upgradesAvailable = [];
	this.m_upgradesIcons = [];
	this.m_locks = [];
	for (var c = 0; 6 > c; c++) this.m_locks.push(".ui_hud_icons_locked.l" + (c + 1)),
	this.m_upgradesAvailable.push(String(".ui_hud_icons_on.u" + (c + 1)));
	for (c = 0; 6 > c; c++) this.m_upgradesIcons.push($(this.m_upgradesAvailable[c]));
	this.timeShot = 7;
	this.activeTutorial = 0 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && 14 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] || 0 !== Global.savedDataTutorial[0] ? !1 : !0;
	this.showPanel = this.autoDisappear = this.startTutorial = this.enableTutorial = !1;
	this.timeAutoDisappear = 0;
	this.timeEnableTutorial = HudGame.TIME_ACTIVE_TUTORIAL;
	this.m_currentWidth = this.m_widthBase = 300;
	this.m_active = !1;
	this.m_part = this.m_widthBase / this.timeShot;
	this.m_panelTutorial = $(".ui_hud_dialogue_support");
	this.m_textTutorial = $(".ui_hud_dialogue_text");
	this.player_hpBar = $(".ui_hud_hpbar");
	this.weapon_mpBar = $(".ui_hud_mpbar");
	this.m_messageType = this.m_messageTime = 0;
	this.m_trophyQueue = [];
	this.m_trophyTime = 0;
	this.m_maxTrophyTime = Application.config.settings.achievementPanelTime;
	this.onOutro = !1;
	this.setCurrentMP(0);
	14 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && 0 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && 0 === Global.savedNumData[Global.savedNumData[Global.INDEX_CURRENT_ROOM] + Global.INDEX_PASSED_ROOM_0] && this.showMessage(!0, 8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? 1 : 5);
	this.activeTutorial || $("#btn_skip").css("display", "none");
	this.m_opacity = 0;
	this.m_fadeGame = "";
	this.m_messageQueue = [];
	this.m_messageFace = [];
	this.m_tutorialTime = 0;
	this.activatedPanel = this.tutorialEnabled = !1;
	this.showPanelTutorial(!1, "", !1, 0, !1, !1);
	this.endGame = !1
}
goog.inherits(HudGame, SScreen);
HudGame.TIME_ACTIVE_TUTORIAL = 2200;
HudGame.WIDTH_BOSS_BAR = 156;
HudGame.WIDTH_BAR_HP = 134;
HudGame.WIDTH_BAR_MP = 136;
HudGame.MESSAGE_TIME = 1200;
HudGame.MPBAR_TIME = 1E3;
HudGame.instance = null;
HudGame.prototype.setGuiHTML = function() {
	this.css = " .ui_button_pause {  position: absolute;  top: 9px;  left: 348px;  width: 62px;  height: 63px;  background: url(media/images/ui_images/buttons/gui_buttons_icons03.png) no-repeat right top;  opacity: 0.6;  cursor: pointer; } .ui_button_pause.b1 {  background-position: -124px 0px; } .ui_button_pause.b1:hover {  background-position: -186px 0px; } .ui_hud_button_skip {  position: absolute;  top: 9px;  left: 664px;  width: 62px;  height: 63px;  background: url(media/images/ui_images/buttons/gui_buttons_icons03.png) no-repeat right top;  cursor: pointer; } .ui_hud_button_skip.b1 {  background-position:  -248px 0px; } .ui_hud_button_skip.b1:hover {  background-position: -310px 0px; } .ui_button_stick {  position: absolute;  top: 357px;  left: 5px;  width: 138px;  height: 138px;  background: url(media/images/ui_images/buttons/gui_buttons_shoot.png) no-repeat right top;  cursor: pointer; } .ui_button_stick.b1 {  background-position: -138px 0px; } .ui_button_stick.b1:hover {  background-position: 0px 0px; } .ui_hud_boss_support {  position: absolute;  pointer-events: none;  width: 275px;  height: 69px;  left: 471px;  top: 0px;  background: url(media/images/ui_images/hud/gui_hud_boss_base.png); } .ui_hud_boss_hpbar {  position: absolute;  pointer-events: none;  width: 156px;  height: 12px;  left: 523px;  top: 19px;  background: url(media/images/ui_images/hud/gui_hud_boss_hpbar.jpg); } .ui_hud_boss {  position: absolute;  pointer-events: none;  width: 63px;  height: 76px;  left: 678px;  top: -5px;  background: url(media/images/ui_images/hud/gui_hud_boss.png) no-repeat left top; } .ui_hud_boss.b2 {  background-position: 0px 0px; } .ui_hud_boss.b3 {  background-position: -63px  0px; } .ui_hud_boss.b1 {  background-position: -126px  0px; } .ui_hud_boss.b4 {  background-position: -189px  0px; } .ui_hud_boss.b5 {  background-position: -252px   0px; } .ui_hud_support {  position: absolute;  pointer-events: none;  width: 255px;  height: 88px;  left: 0px;  top: 0px;  background: url(media/images/ui_images/hud/gui_hud_base.png); } .ui_hud_hpbar {  position: absolute;  pointer-events: none;  width: 134px;  height: 13px;  left: 80px;  top: 18px;  background: url(media/images/ui_images/hud/gui_hud_hpbar.jpg); } .ui_hud_mpbar {  position: absolute;  pointer-events: none;  width: 134px;  height: 9px;  left: 80px;  top: 33px;  background: url(media/images/ui_images/hud/gui_hud_mpbar.jpg); } .ui_hud_character {  position: absolute;  pointer-events: none;  width: 79px;  height: 78px;  left: 1px;  top: -1px;  background: url(media/images/ui_images/hud/gui_hud_character.png) no-repeat left top; } .ui_hud_character.c1 {  background-position: 0px 0px; } .ui_hud_character.c2 {  background-position: -79px 0px; } .ui_hud_character.c3 {  background-position: -158px 0px; } .ui_hud_character.c4 {  background-position: -237px 0px; } .ui_hud_character.c5 {  background-position: -316px 0px; } .ui_hud_lifes {  position: absolute;  left: 55px;  width: 45px;  top: 46px;  height: 29px;  color: #ffffff;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 24px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_score {  position: absolute;  left: 118px;  top: 43px;  width: 82px;  height: 18px;  color: #fff000;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 18px;  display: table-cell;  vertical-align: middle;  text-align: right;  font-smooth: always; } .ui_hud_newtrophy_text {  position: absolute;  left: 108px;  width: 260px;  height: 33px;  color: #ffffff;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 15px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_newtrophy_text.t1 {  color: #fff000;  font-size: 15px;  top: 22px; } .ui_hud_newtrophy_text.t2 {  top: 41px; } .ui_hud_newtrophy_trophy {  position: absolute;  top: -30px;  left: -15px;  width: 143px;  height: 143px;  background: url(media/images/ui_images/buttons/gui_buttons_trophies.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  cursor: pointer; } .ui_hud_newtrophy_trophy.i1 {  background-position: 0px 0px; } .ui_hud_newtrophy_trophy.i2 {  background-position: -572px 0px; } .ui_hud_newtrophy_trophy.i3 {  background-position: -1144px  0px; } .ui_hud_newtrophy_trophy.i4 {  background-position: -1716px  0px; } .ui_hud_newtrophy_trophy.i5 {  background-position: -2288px  0px; } .ui_hud_newtrophy_support {  position: absolute;  pointer-events: none;  left: 170px;  top: 417px;  width: 410px;  height: 83px;  background: url(media/images/ui_images/popups/gui_popups_newtrophy_support.png); } .ui_hud_dialogue_text {  position: absolute;  top: 437px;  left: 226px;  width: 301px;  height: 60px;  color: #ffffff;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 14px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_dialogue_support {  position: absolute;  pointer-events: none;  left: 184px;  top: 400px;  width: 394px;  height: 100px;  background: url(media/images/ui_images/popups/gui_popups_dialogue_support.png); } .ui_hud_messages1 {  position: absolute;  left: 0px;  top: 197px;  width: 750px;  height: 51px;  color: #ffffff;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 60px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_messages1.m1 {  position: absolute;  left: -197px;  top: 63px;  color: #2d00a0;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages1.m2 {  position: absolute;  left: -199px;  top: 58px;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages2 {  position: absolute;  left: 0px;  top: 197px;  width: 750px;  height: 51px;  color: #ffffff;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 50px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_messages2.m1 {  position: absolute;  left: -203px;  top: 68px;  color: #2d00a0;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages2.m2 {  position: absolute;  left: -199px;  top: 63px;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages3 {  position: absolute;  left: 0px;  top: 197px;  width: 750px;  height: 51px;  color: #ffffff;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 40px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_messages3.m1 {  position: absolute;  left: -202px;  top: 49px;  color: #2d00a0;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages3.m2 {  position: absolute;  left: -199px;  top: 45px;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages4 {  position: absolute;  left: 0px;  top: 197px;  width: 750px;  height: 51px;  color: #ffffff;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 80px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_messages4.m1 {  position: absolute;  left: -204px;  top: 77px;  color: #2d00a0;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages4.m2 {  position: absolute;  left: -199px;  top: 72px;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages_support1 {  position: absolute;  pointer-events: none;  width: 354px;  height: 198px;  left: 196px;  top: 43px;  background: url(media/images/ui_images/popups/gui_popups_message_support.png); } .ui_hud_messages_support2 {  position: absolute;  pointer-events: none;  width: 354px;  height: 198px;  left: 196px;  top: 43px;  background: url(media/images/ui_images/popups/gui_popups_message_support02.png); } .ui_hud_messages5 {  position: absolute;  left: 0px;  top: 197px;  width: 750px;  height: 51px;  color: #ffffff;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 60px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_messages5.m1 {  position: absolute;  left: -204px;  top: 55px;  color: #670000;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_messages5.m2 {  position: absolute;  left: -199px;  top: 50px;  font-family: 'bamtangvicunaferozgordidemiBd'; } .ui_hud_dialogue_text02 {  position: absolute;  top: 441px;  left: 221px;  width: 281px;  height: 50px;  color: #ffffff;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 14px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_hud_dialogue_support {  position: absolute;  pointer-events: none;  left: 184px;  top: 400px;  width: 394px;  height: 100px;  background: url(media/images/ui_images/popups/gui_popups_dialogue_support.png); } .ui_hud_dialogue_character {  position: absolute;  pointer-events: none;  left: 525px;  top: 397px;  width: 90px;  height: 90px;  background: url(media/images/ui_images/popups/gui_popups_dialogue_characters.png); } .ui_hud_dialogue_character.c6 {  background-position: 0px 0px; } .ui_hud_dialogue_character.c1 {  background-position: -90px 0px; } .ui_hud_dialogue_character.c2 {  background-position: -180px 0px; } .ui_hud_dialogue_character.c3 {  background-position: -270px 0px; } .ui_hud_dialogue_character.c4 {  background-position: -360px 0px; } .ui_hud_dialogue_character.c5 {  background-position: -450px 0px; }";
	this.html = "  <div class='ui_button_pause b1' id='btn_pause'></div>  <div class='ui_hud_support'></div>  <div class='ui_hud_hpbar'></div>  <div class='ui_hud_mpbar'></div>  <div class='ui_hud_character c1'></div>  <div class='ui_hud_character c2'></div>  <div class='ui_hud_character c3'></div>  <div class='ui_hud_character c4'></div>  <div class='ui_hud_character c5'></div> <div class='ui_hud_lifes'>x00</div>  <div class='ui_hud_score'>00000</div>  <div class='ui_hud_boss_support'></div>  <div class='ui_hud_boss_hpbar'></div>  <div class='ui_hud_boss b1'></div>  <div class='ui_hud_boss b2'></div>  <div class='ui_hud_boss b3'></div>  <div class='ui_hud_boss b4'></div>  <div class='ui_hud_boss b5'></div> <div class='ui_hud_messages_support1'>   <div class='ui_hud_messages1 m1'>" + Application.strings.STR_HUD_MESSAGE_1 + "</div>   <div class='ui_hud_messages1 m2'>" + Application.strings.STR_HUD_MESSAGE_1 + "</div>     <div class='ui_hud_messages2 m1'>" + Application.strings.STR_HUD_MESSAGE_2 + "</div>   <div class='ui_hud_messages2 m2'>" + Application.strings.STR_HUD_MESSAGE_2 + "</div>   <div class='ui_hud_messages3 m1'>" + Application.strings.STR_HUD_MESSAGE_3 + "</div>     <div class='ui_hud_messages3 m2'>" + Application.strings.STR_HUD_MESSAGE_3 + "</div>     <div class='ui_hud_messages4 m1'>" + Application.strings.STR_HUD_MESSAGE_4 + "</div>   <div class='ui_hud_messages4 m2'>" + Application.strings.STR_HUD_MESSAGE_4 + "</div> </div> <div class='ui_hud_messages_support2'>   <div class='ui_hud_messages5 m1'>" + Application.strings.STR_HUD_MESSAGE_5 + "</div>   <div class='ui_hud_messages5 m2'>" + Application.strings.STR_HUD_MESSAGE_5 + "</div> </div> <div class='ui_hud_newtrophy_support'>   <div class='ui_hud_newtrophy_text t1'>" + Application.strings.STR_TROPHY_NAME_1 + "</div>    <div class='ui_hud_newtrophy_text t2'>" + Application.strings.STR_TROPHY_DESCRIPTION_1 + "</div>     <div class='ui_hud_newtrophy_trophy i1'></div>     <div class='ui_hud_newtrophy_trophy i2'></div>     <div class='ui_hud_newtrophy_trophy i3'></div>     <div class='ui_hud_newtrophy_trophy i4'></div>     <div class='ui_hud_newtrophy_trophy i5'></div> </div>  <div class='ui_hud_dialogue_support'></div>   <div class='ui_hud_dialogue_text'>" + Application.strings.STR_TUTORIAL_INFO_1 + "</div>  <div class='ui_hud_dialogue_character c6'></div>  <div class='ui_hud_dialogue_character c1'></div>  <div class='ui_hud_dialogue_character c2'></div>  <div class='ui_hud_dialogue_character c3'></div>  <div class='ui_hud_dialogue_character c4'></div>  <div class='ui_hud_dialogue_character c5'></div>  <div class='ui_hud_button_skip b1' id='btn_skip'></div> </div>";
	HudGame.superClass_.setGuiHTML.call(this)
};
HudGame.prototype.init = function() {
	HudGame.superClass_.init.call(this);
	for (var a = 1; 5 >= a; a++) $(".ui_hud_messages" + a).css("pointer-events", "none");
	$(".ui_hud_newtrophy_text").css("pointer-events", "none");
	$(".ui_hud_lifes").css("pointer-events", "none");
	$(".ui_hud_score").css("pointer-events", "none");
	$(".ui_hud_character").css("display", "none");
	$(".ui_hud_character.c" + Global.playerSelected).css("display", "");
	this.showMessage(!1, 0);
	this.showTrophy(!1, 0, !1);
	this.showBossBar(!1, 0);
	this.addClickListener("btn_pause");
	this.addClickListener("btn_skip")
};
HudGame.prototype.fadeIn = function() {
	this.m_opacity = 1;
	this.m_fadeGame = "fade_in"
};
HudGame.prototype.fadeOut = function() {
	this.m_opacity = 0;
	this.m_fadeGame = "fade_out";
	this.controlDivHud(0)
};
HudGame.prototype.controlDivHud = function(a) {
	$("#btn_pause").css("opacity", String(a));
	$(".ui_hud_support").css("opacity", String(a));
	$(".ui_hud_hpbar").css("opacity", String(a));
	$(".ui_hud_mpbar").css("opacity", String(a));
	$(".ui_hud_character").css("opacity", String(a));
	$(".ui_hud_lifes").css("opacity", String(a));
	$(".ui_hud_score").css("opacity", String(a));
	$(".ui_hud_boss_support").css("opacity", String(a));
	$(".ui_hud_boss_hpbar").css("opacity", String(a));
	$(".ui_hud_boss").css("opacity", String(a));
	$(".ui_hud_messages_support1").css("opacity", String(a));
	$(".ui_hud_messages_support2").css("opacity", String(a));
	$(".ui_hud_newtrophy_support").css("opacity", String(a));
	$(".ui_hud_dialogue_support").css("opacity", String(a));
	$(".ui_hud_dialogue_text").css("opacity", String(a));
	$(".ui_hud_dialogue_character").css("opacity", String(a));
	$(".ui_hud_button_skip").css("opacity", String(a))
};
HudGame.prototype.setBossHpBar = function(a) {
	a = 0.01 * (100 <= a ? 100 : a) * HudGame.WIDTH_BOSS_BAR;
	$(".ui_hud_boss_hpbar").css("width", a + "px")
};
HudGame.prototype.showPanelTutorial = function(a, b, c, d, e, f) {
	this.showPanel = a;
	this.tutorialEnabled = !1;
	this.activatedPanel = a;
	c && f && (this.m_messageQueue.push(b), this.m_messageFace.push(d));
	this.showPanel ? 0 === this.m_trophyQueue.length && ("" !== b && $(".ui_hud_dialogue_text").html(Application.strings[b]), $(".ui_hud_dialogue_character.c" + d).css("display", ""), e && 4 === d && (this.tutorialEnabled = !0, this.m_tutorialTime = Application.config.settings.bossOutroTimer), this.autoDisappear = c, this.timeAutoDisappear = 0, this.enableTutorial = !1, this.m_panelTutorial.css("display", "")) : ($(".ui_hud_dialogue_text").html(""), $(".ui_hud_dialogue_character").css("display", "none"), this.m_panelTutorial.css("display", "none"))
};
HudGame.prototype.showBossBar = function(a, b) {
	$(".ui_hud_boss_support").css("display", a ? "": "none");
	$(".ui_hud_boss_hpbar").css("display", a ? "": "none");
	a ? ($(".ui_hud_boss.b" + b).css("display", ""), this.setBossHpBar(100)) : $(".ui_hud_boss").css("display", "none")
};
HudGame.prototype.showMessage = function(a, b) {
	if (a) {
		if ($(".ui_hud_messages" + b).html(Application.strings["STR_HUD_MESSAGE_" + b]), $(".ui_hud_messages_support" + (4 >= b ? 1 : 2)).css("display", ""), this.m_messageTime = HudGame.MESSAGE_TIME, this.m_messageType = b, 2 === b) switch (Application.instance.stopAllSounds(), Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER]) {
		case 1:
		case 2:
			Application.instance.playSound("SND_GF_WIN");
			break;
		case 3:
			Application.instance.playSound("SND_WOY_WIN");
			break;
		case 4:
			Application.instance.playSound("SND_RC_WIN");
			break;
		case 5:
			Application.instance.playSound("SND_PF_WIN")
		}
	} else {
		for (var c = 1; 5 >= c; c++) $(".ui_hud_messages" + c).html("");
		for (c = 1; 2 >= c; c++) $(".ui_hud_messages_support" + c).css("display", "none")
	}
};
HudGame.prototype.showTrophy = function(a, b, c) {
	if (a) {
		if (c && (this.m_trophyQueue.push(b), 1 < this.m_trophyQueue.length)) return;
		$(".ui_hud_newtrophy_support").css("display", "");
		$(".ui_hud_newtrophy_trophy.i" + b).css("display", "");
		$(".ui_hud_newtrophy_text.t1").html(Application.strings["STR_TROPHY_NAME_" + b]);
		$(".ui_hud_newtrophy_text.t2").html(Application.strings["STR_TROPHY_DESCRIPTION_" + b]);
		this.m_trophyTime = this.m_maxTrophyTime
	} else $(".ui_hud_newtrophy_support").css("display", "none"),
	$(".ui_hud_newtrophy_trophy").css("display", "none"),
	$(".ui_hud_newtrophy_text.t1").html(""),
	$(".ui_hud_newtrophy_text.t2").html("")
};
HudGame.prototype.free = function() {
	this.m_upgradesAvailable = this.m_locks = this.weapon_mpBar = this.player_hpBar = this.m_textTutorial = this.m_panelTutorial = this.m_trophyQueue = this.m_messageFace = this.m_messageQueue = null;
	HudGame.superClass_.free.call(this);
	HudGame.instance = null
};
HudGame.prototype.setScore = function(a) {
	$(".ui_hud_score").html("" + a)
};
HudGame.prototype.setLives = function(a) {
	a = Application.strings.STR_HUD_COUNT_LIFE.replace("N", "" + a);
	$(".ui_hud_lifes").html(a)
};
HudGame.prototype.setEnergyBar = function(a) {
	100 < a && (a = 100);
	this.player_hpBar.css("width", 0.01 * a * HudGame.WIDTH_BAR_HP + "px")
};
HudGame.prototype.setCurrentMP = function(a) {
	100 < a && (a = 100);
	this.weapon_mpBar.css("width", 0.01 * a * HudGame.WIDTH_BAR_MP + "px")
};
HudGame.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_pause":
		GuiGame.instance.addPopup(GuiPopupPause, 0, 0);
		break;
	case "btn_skip":
		Global.savedNumData[Global.INDEX_CURRENT_ROOM] = 1,
		Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)),
		GuiManager.instance.gotoScreen(GuiManager.SC_GAME)
	}
};
HudGame.prototype.update = function(a) {
	HudGame.superClass_.update.call(this, a);
	0 < this.m_trophyTime && (this.m_trophyTime -= a, 0 >= this.m_trophyTime && (this.m_trophyTime = 0, this.showTrophy(!1, 0, !1), this.m_trophyQueue.shift(), 0 < this.m_trophyQueue.length ? this.showTrophy(!0, this.m_trophyQueue[0], !1) : 0 < this.m_messageQueue.length && this.showPanelTutorial(!0, this.m_messageQueue[this.m_messageQueue.length - 1], !0, this.m_messageFace[this.m_messageQueue.length - 1], !0, !1)));
	0 < this.m_messageTime && (this.m_messageTime -= a, 0 >= this.m_messageTime && (this.m_messageTime = 0, this.showMessage(!1, 0)));
	this.startTutorial && (this.timeEnableTutorial -= a, 0 >= this.timeEnableTutorial && (this.enableTutorial = !0, this.startTutorial = !1, this.timeEnableTutorial = HudGame.TIME_ACTIVE_TUTORIAL));
	this.autoDisappear && (this.timeAutoDisappear += a, 3500 <= this.timeAutoDisappear && (this.autoDisappear = !1, this.timeAutoDisappear = 0, this.showPanelTutorial(!1, "", this.autoDisappear, 0, !1, !1), this.m_messageQueue.pop(), this.m_messageFace.pop(), 0 < this.m_messageQueue.length && this.showPanelTutorial(!0, this.m_messageQueue[this.m_messageQueue.length - 1], !0, this.m_messageFace[this.m_messageQueue.length - 1], !0, !1)));
	this.tutorialEnabled && (this.m_tutorialTime -= a, 0 >= this.m_tutorialTime && (this.m_tutorialTime = 0, this.tutorialEnabled = !1))
};
HudGame.prototype.onKeyDown = function(a) {
	HudGame.superClass_.onKeyDown.call(this, a);
	if (SGame.instance) SGame.instance.onKeyDown(a)
};
HudGame.prototype.onKeyUp = function(a) {
	HudGame.superClass_.onKeyUp.call(this, a);
	if (SGame.instance) SGame.instance.onKeyUp(a)
};
HudGame.prototype.onMouseUp = function(a) {
	HudGame.superClass_.onMouseUp.call(this, a)
};
HudGame.prototype.onMouseDown = function(a) {
	HudGame.superClass_.onMouseDown.call(this, a)
};
function PlayerGame(a, b, c, d, e) {
	VU_Player.call(this, a, b, c, d, e);
	PlayerGame.instance = this;
	this.m_camera = this.m_world.camera();
	this.m_touchX = [!1, !1];
	this.m_touchY = [!1, !1];
	this.m_isPlayerDestroyed = this.m_activeDoubleDamage = !1;
	this.m_timeDoubleDamage = 0;
	this.m_keyboardEnabled = !0;
	this.m_initActionDelay = 100;
	this.m_activeAutoShot = !1;
	this.m_cooldownShot = this.m_oldPositionY = this.m_oldPositionX = 0;
	this.m_isShooting = !1;
	this.m_typeWeapon = 1;
	this.m_baseAction = null;
	this.m_speedBaseX = 0;
	this.m_namePlayer = "";
	this.m_isKeyPress = !1;
	this.m_healthBase = 300;
	this.m_lostState = "0";
	this.m_timerShot = 0;
	this.m_stateWalk = "";
	this.m_oldState = "0";
	this.m_idPlayer = "";
	this.moveFollow = null;
	this.m_offSetY_Shield = 0;
	this.isShieldActive = this.playSoundShield = !1;
	this.m_clipShield = null;
	this.m_keyCode = 0;
	this.isFollow = !1;
	this.m_angle = -10;
	this.m_finishStateActive = !1;
	this.mouseY = this.mouseX = this.shootY = this.shootX = this.forceY = this.forceX = this.m_timeFinishState = this.m_endPositionY = this.m_endPositionX = 0;
	this.speed = Application.config.settings.playerRegularSpeed;
	this.m_timeShield = 0;
	this.m_alphaInterval = new AlphaInterval(this, "onEndAplhaAnimation");
	this.chargeCharacter(c, d);
	this.setHealth(this.m_healthBase);
	this.showCollision(!1);
	this.setTypeWeapon(ShotHandler.REGULAR, !1);
	0 !== Global.savedTimeShield && this.addTimeShield(Global.savedTimeShield)
}
goog.inherits(PlayerGame, VU_Player);
PlayerGame.ST_PLAYER_STAND_RIGHT = "st100";
PlayerGame.ST_PLAYER_STAND_DOWN = "st101";
PlayerGame.ST_PLAYER_STAND_LEFT = "st102";
PlayerGame.ST_PLAYER_STAND_UP = "st103";
PlayerGame.ST_PLAYER_WALK_RIGHT = "st110";
PlayerGame.ST_PLAYER_WALK_DOWN = "st111";
PlayerGame.ST_PLAYER_WALK_LEFT = "st112";
PlayerGame.ST_PLAYER_WALK_UP = "st113";
PlayerGame.ST_PLAYER_ATTACK_RIGHT = "st120";
PlayerGame.ST_PLAYER_ATTACK_DOWN = "st121";
PlayerGame.ST_PLAYER_ATTACK_LEFT = "st122";
PlayerGame.ST_PLAYER_ATTACK_UP = "st123";
PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT = "st130";
PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN = "st131";
PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT = "st132";
PlayerGame.ST_PLAYER_WALK_ATTACK_UP = "st133";
PlayerGame.ST_PLAYER_HIT = "st150";
PlayerGame.ST_PLAYER_WIN = "st151";
PlayerGame.ST_PLAYER_APPEAR = "st152";
PlayerGame.ST_PLAYER_DISAPPEAR = "st153";
PlayerGame.ST_PLAYER_DESTROYED = "st154";
PlayerGame.OFFSET_LEFT = 100;
PlayerGame.OFFSET_RIGHT = 100;
PlayerGame.OFFSET_DOWN = 50;
PlayerGame.OFFSET_UP = 150;
PlayerGame.DISTANCE_TO_ENEMY = 200;
PlayerGame.DISTANCE_NEAR = 50;
PlayerGame.prototype.addTimeShield = function(a) {
	this.m_timeShield += a;
	this.isShieldActive = !0;
	this.setInvulnerability(!0);
	null === this.m_clipShield && (this.m_clipShield = Application.instance.getClip("mcShield_effect"), this.m_canvas.addChild(this.m_clipShield.sprite), this.m_clipShield.sprite._depth = Global.DEPTH_EFFECT, this.m_clipShield.setX(this.m_x), this.m_clipShield.setY(this.m_y + this.m_offSetY_Shield));
	Global.savedTimeShield = this.m_timeShield
};
PlayerGame.prototype.chargeCharacter = function(a, b) {};
PlayerGame.prototype.onEndAplhaAnimation = function() {
	this.m_isInvulnerable = this.isShieldActive
};
PlayerGame.prototype.setActiveDoubleDamage = function(a) {
	if (this.m_activeDoubleDamage = a) this.m_timeDoubleDamage = Application.config.settings.timeDoubleDamage
};
PlayerGame.prototype.activeDoubleDamage = function() {
	return this.m_activeDoubleDamage
};
PlayerGame.prototype.idPlayer = function() {
	return this.m_idPlayer
};
PlayerGame.prototype.forceDisableDisplace = function() {
	this.m_isKeyPress = !1;
	this.forceX = this.forceY = 0;
	this.m_touchY[0] = !1;
	this.m_touchY[1] = !1;
	this.m_touchX[0] = !1;
	this.m_touchX[1] = !1;
	switch (this.m_state) {
	case PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_WALK_RIGHT:
		this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT);
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_WALK_LEFT:
		this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT);
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_UP:
	case PlayerGame.ST_PLAYER_ATTACK_UP:
	case PlayerGame.ST_PLAYER_WALK_UP:
		this.gotoState(PlayerGame.ST_PLAYER_STAND_UP);
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_WALK_DOWN:
		this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN)
	}
};
PlayerGame.prototype.onLostFocus = function() {
	if (Application.isMobileDevice) if (2 === Global.MOBILE_MODE_GAME) {
		var a = this.m_angle;
		null !== this.moveFollow && (a = 180 * this.moveFollow.angle() / Math.PI);
		this.setActionStandPlayer(a)
	} else this.forceY = this.forceX = 0,
	this.setStopMoveStick();
	else this.m_isKeyPress = !1,
	this.m_touchY[1] ? this.gotoState(PlayerGame.ST_PLAYER_STAND_UP) : this.m_touchY[0] ? this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN) : this.m_touchX[1] ? this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT) : this.m_touchX[0] && this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT),
	this.forceX = this.forceY = 0,
	this.m_touchY[0] = !1,
	this.m_touchY[1] = !1,
	this.m_touchX[0] = !1,
	this.m_touchX[1] = !1
};
PlayerGame.prototype.onGotFocus = function() {};
PlayerGame.prototype.onMouseMove = function(a) {
	this.mouseX = void 0 === a.offsetX ? a.layerX: a.offsetX;
	this.mouseY = void 0 === a.offsetY ? a.layerY: a.offsetY;
	this.isFollow && Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (this.moveFollow.resetPosition(this.m_x, this.m_y), this.moveFollow.gotoPosition(this.mouseX, this.mouseY)); ! 0 === this.validateState([PlayerGame.ST_PLAYER_STAND_RIGHT, PlayerGame.ST_PLAYER_STAND_DOWN, PlayerGame.ST_PLAYER_STAND_LEFT, PlayerGame.ST_PLAYER_STAND_UP]) && (a = 180 * Math.atan2(this.mouseY - this.m_y, this.mouseX - this.m_x) / Math.PI, -60 <= a && 60 >= a ? this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT) : 61 <= a && 130 >= a ? this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN) : 131 <= a && 180 >= a ? this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT) : -180 <= a && -130 >= a ? this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT) : this.gotoState(PlayerGame.ST_PLAYER_STAND_UP))
};
PlayerGame.prototype.onMouseUp = function(a) {
	Application.isMobileDevice || (this.m_timerShot = 0, this.m_activeAutoShot = !1)
};
PlayerGame.prototype.onMouseDown = function(a) {
	Application.isMobileDevice || 2 !== Global.MOBILE_MODE_GAME || (this.m_activeAutoShot = !0, this.mouseX = void 0 === a.offsetX ? a.layerX: a.offsetX, this.mouseY = void 0 === a.offsetY ? a.layerY: a.offsetY, this.actionShot(this.mouseX, this.mouseY));
	this.isFollow && Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (this.mouseX = void 0 === a.offsetX ? a.layerX: a.offsetX, this.mouseY = void 0 === a.offsetY ? a.layerY: a.offsetY, this.moveFollow.resetPosition(this.m_x, this.m_y), this.moveFollow.gotoPosition(this.mouseX, this.mouseY))
};
PlayerGame.prototype.actionShot = function(a, b) {
	if (!0 !== this.validateState([PlayerGame.ST_PLAYER_APPEAR, PlayerGame.ST_PLAYER_DISAPPEAR, PlayerGame.ST_PLAYER_DESTROYED, PlayerGame.ST_PLAYER_HIT, PlayerGame.ST_PLAYER_WIN]) && this.m_keyboardEnabled) {
		this.m_state !== PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT && this.m_state !== PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN && this.m_state !== PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT && this.m_state !== PlayerGame.ST_PLAYER_WALK_ATTACK_UP && this.m_state !== PlayerGame.ST_PLAYER_ATTACK_RIGHT && this.m_state !== PlayerGame.ST_PLAYER_ATTACK_DOWN && this.m_state !== PlayerGame.ST_PLAYER_ATTACK_LEFT && this.m_state !== PlayerGame.ST_PLAYER_ATTACK_UP && (this.m_lostState = this.m_state);
		var c = 180 * Math.atan2(b - this.m_y, a - this.m_x) / Math.PI;
		Application.isMobileDevice ? -60 <= c && 60 >= c ? this.gotoState(PlayerGame.ST_PLAYER_ATTACK_RIGHT) : 61 <= c && 130 >= c ? this.gotoState(PlayerGame.ST_PLAYER_ATTACK_DOWN) : 131 <= c && 180 >= c ? this.gotoState(PlayerGame.ST_PLAYER_ATTACK_LEFT) : -180 <= c && -130 >= c ? this.gotoState(PlayerGame.ST_PLAYER_ATTACK_LEFT) : this.gotoState(PlayerGame.ST_PLAYER_ATTACK_UP) : -60 <= c && 60 >= c ? this.gotoState(this.m_isKeyPress ? PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT: PlayerGame.ST_PLAYER_ATTACK_RIGHT) : 61 <= c && 130 >= c ? this.gotoState(this.m_isKeyPress ? PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN: PlayerGame.ST_PLAYER_ATTACK_DOWN) : 131 <= c && 180 >= c ? this.gotoState(this.m_isKeyPress ? PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT: PlayerGame.ST_PLAYER_ATTACK_LEFT) : -180 <= c && -130 >= c ? this.gotoState(this.m_isKeyPress ? PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT: PlayerGame.ST_PLAYER_ATTACK_LEFT) : this.gotoState(this.m_isKeyPress ? PlayerGame.ST_PLAYER_WALK_ATTACK_UP: PlayerGame.ST_PLAYER_ATTACK_UP)
	}
};
PlayerGame.prototype.x = function() {
	return this.m_x
};
PlayerGame.prototype.y = function() {
	return this.m_y
};
PlayerGame.prototype.setPosition = function(a, b) {
	this.m_oldX = this.m_x = a;
	this.m_oldY = this.m_y = b
};
PlayerGame.prototype.typeWeapon = function() {
	return this.m_typeWeapon
};
PlayerGame.prototype.setKeyboardEnabled = function(a) { (this.m_keyboardEnabled = a) || this.forceDisableDisplace()
};
PlayerGame.prototype.setTypeWeapon = function(a, b) {
	this.m_typeWeapon = a;
	var c = 0,
	d = 0;
	switch (a) {
	case ShotHandler.BOUNCING:
		c = Application.config.settings.ammoBouncingShot;
		d = Application.config.settings.cooldownBouncingShot;
		break;
	case ShotHandler.MULTIPLE:
		c = Application.config.settings.ammoMultipleShot;
		d = Application.config.settings.cooldownMultipleShot;
		break;
	default:
		d = Application.config.settings.cooldownRegularShot
	}
	this.m_world.shotHandler().setAmmo(c, c);
	this.m_cooldownShot = d
};
PlayerGame.prototype.isLookingToLeft = function() {
	return 0 > this.m_clip.sprite.getScaleX()
};
PlayerGame.prototype.gotoState = function(a) {
	a === PlayerGame.ST_PLAYER_HIT && (this.m_oldState = this.m_state);
	PlayerGame.superClass_.gotoState.call(this, a);
	switch (a) {
	case PlayerGame.ST_PLAYER_APPEAR:
		this.clip().setLoop(!0)
	}
	null !== this.m_alphaInterval && this.m_alphaInterval.setClip(this.m_clip);
	this.updateBounds()
};
PlayerGame.prototype.onHit = function(a) {
	this.m_isInvulnerable || !0 === this.validateState([PlayerGame.ST_PLAYER_APPEAR, PlayerGame.ST_PLAYER_DISAPPEAR, PlayerGame.ST_PLAYER_HIT, PlayerGame.ST_PLAYER_WIN, PlayerGame.ST_PLAYER_DESTROYED]) || (this.m_health -= a, 0 > this.m_health && (this.m_health = 0), 0 < this.m_health ? (Application.instance.playSound("SND_PLAYER_HIT"), this.gotoState(PlayerGame.ST_PLAYER_HIT), this.m_alphaInterval.start(1500, 80), this.m_isInvulnerable = !0) : (this.forceDisableDisplace(), Application.instance.playSound("SND_PLAYER_DIES"), this.gotoState(PlayerGame.ST_PLAYER_DESTROYED)), HudGame.instance.setEnergyBar(100 * this.m_health / this.m_healthBase))
};
PlayerGame.prototype.onEndAnimation = function(a) {
	switch (a) {
	case PlayerGame.ST_PLAYER_WIN:
		13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.fadeOut();
		break;
	case PlayerGame.ST_PLAYER_HIT:
		this.gotoState(this.m_oldState);
		break;
	case PlayerGame.ST_PLAYER_DESTROYED:
		this.m_finishStateActive || (Global.savedNumData[Global.INDEX_CURRENT_HP] = Application.config.settings.playerStartingHp, Global.savedNumData[Global.INDEX_CURRENT_WEAPON] = ShotHandler.REGULAR, Global.savedNumData[Global.INDEX_CURRENT_MP] = 0, this.m_finishStateActive = !0, Global.game.addLife( - 1), this.clip().setLoop(!1), 0 > Global.savedNumData[Global.INDEX_CURRENT_LIVES] ? (this.setKeyboardEnabled(!1), this.m_timeFinishState = 0, GameVillains.instance.fadeOut()) : (this.m_endPositionX = this.m_x, this.m_endPositionY = this.m_y, this.m_timeFinishState = 0, this.setHealth(this.m_healthBase), this.gotoState(PlayerGame.ST_PLAYER_DISAPPEAR)));
		break;
	case PlayerGame.ST_PLAYER_DISAPPEAR:
		this.m_finishStateActive && (this.m_finishStateActive = !1, this.m_timeFinishState = 0, this.clip().setLoop(!1), this.setPosition( - 500, 0));
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_WALK_ATTACK_UP:
	case PlayerGame.ST_PLAYER_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_ATTACK_UP:
		this.gotoState(this.m_lostState)
	}
};
PlayerGame.prototype.baseAction = function() {
	return this.m_baseAction
};
PlayerGame.prototype.setBaseAction = function(a) {
	this.m_baseAction = a
};
PlayerGame.prototype.releaseAction = function(a) {
	this.m_baseAction = null;
	this.setKeyboardEnabled(!0);
	a ? (HudGame.instance.activeTutorial ? (14 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && GameVillains.instance.initPanelTutorial(), this.m_keyboardEnabled = !1) : this.m_world.actorManager().initWave(0), Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (HudGame.instance.activeTutorial ? (this.isFollow = this.m_keyboardEnabled = !1, GameVillains.instance.initPanelTutorial()) : this.isFollow = !0, this.activeLinearMovement())) : (Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (HudGame.instance.activeTutorial ? (this.isFollow = this.m_keyboardEnabled = !1, GameVillains.instance.initPanelTutorial()) : this.isFollow = !0, this.activeLinearMovement()), 13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? GuiManager.instance.gotoScreen(GuiManager.SC_CUTSCENE_2) : 0 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.openAllDoors())
};
PlayerGame.prototype.activeLinearMovement = function() {
	this.moveFollow = new LinearMovement(this.m_x, this.m_y, this.speed);
	this.moveFollow.resetPosition(this.m_x, this.m_y)
};
PlayerGame.prototype.startAction = function() {
	this.m_baseAction && this.m_baseAction.startAction(this.m_initActionDelay)
};
PlayerGame.prototype.isAnimEnable = function() {
	return this.m_state === PlayerGame.ST_PLAYER_DESTROYED || this.m_state === PlayerGame.ST_PLAYER_HIT
};
PlayerGame.prototype.increaseHealth = function(a) {
	this.m_health += a;
	this.m_health = this.m_health > this.m_healthBase ? this.m_healthBase: this.m_health;
	HudGame.instance.setEnergyBar(100 * this.m_health / this.m_healthBase)
};
PlayerGame.prototype.setHealth = function(a) {
	this.m_health = a;
	HudGame.instance.setEnergyBar(100 * this.m_health / this.m_healthBase)
};
PlayerGame.prototype.getBaseHealth = function() {
	return this.m_healthBase
};
PlayerGame.prototype.startShooting = function(a) {
	this.m_isShooting = a;
	a || (this.m_timerShot = 0)
};
PlayerGame.prototype.motionModel = function(a) { ! 0 !== this.validateState([PlayerGame.ST_PLAYER_APPEAR, PlayerGame.ST_PLAYER_DISAPPEAR, PlayerGame.ST_PLAYER_HIT, PlayerGame.ST_PLAYER_WIN, PlayerGame.ST_PLAYER_DESTROYED]) && (this.isFollow ? Application.isMobileDevice && 1 === Global.MOBILE_MODE_GAME && (this.moveFollow.update(a), this.setPosition(this.moveFollow.x(), this.moveFollow.y()), this.automaticShootMobil(a), this.m_oldPositionX === this.m_x && this.m_oldPositionY === this.m_y ? 0 === this.shootX ? this.setActionStandPlayer(180 * this.moveFollow.angle() / Math.PI) : this.setAngleForStick(180 * this.moveFollow.angle() / Math.PI) : this.setAngleForStick(180 * this.moveFollow.angle() / Math.PI), this.m_oldPositionX = this.m_x, this.m_oldPositionY = this.m_y) : (this.m_x += this.forceX * this.speed * a, this.m_oldY = this.m_y += this.forceY * this.speed * a, 1 === Global.MOBILE_MODE_GAME && this.automaticShootMobil(a)), this.m_x = Common.swtClamp(this.m_x, this.m_camera.x() + PlayerGame.OFFSET_LEFT, this.m_camera.x() + this.m_camera.width - PlayerGame.OFFSET_RIGHT), this.m_y = Common.swtClamp(this.m_y, this.m_camera.y() + PlayerGame.OFFSET_UP, this.m_camera.y() + this.m_camera.height - PlayerGame.OFFSET_DOWN))
};
PlayerGame.prototype.shootPlayer = function(a, b, c) {
	Application.instance.playSound(c);
	Application.isMobileDevice ? 2 === Global.MOBILE_MODE_GAME ? this.m_world.shotHandler().shoot(this.m_typeWeapon, ShotHandler.FROM_PLAYER, 0, 0, a, b, a + this.shootX, b + this.shootY, this.m_idPlayer, 0) : this.m_world.shotHandler().shoot(this.m_typeWeapon, ShotHandler.FROM_PLAYER, 0, 0, a, b, this.shootX, this.shootY, this.m_idPlayer, 0) : 2 === Global.MOBILE_MODE_GAME ? this.m_world.shotHandler().shoot(this.m_typeWeapon, ShotHandler.FROM_PLAYER, 0, 0, a, b, this.mouseX, this.mouseY, this.m_idPlayer, 0) : this.m_world.shotHandler().shoot(this.m_typeWeapon, ShotHandler.FROM_PLAYER, 0, 0, a, b, this.shootX, this.shootY, this.m_idPlayer, 0)
};
PlayerGame.prototype.automaticShootMobil = function(a) {
	0 !== this.m_cooldownShot && this.m_keyboardEnabled && (this.m_timerShot += a, this.m_timerShot >= this.m_cooldownShot && (this.m_timerShot -= this.m_cooldownShot, GameVillains.instance.findNextTarget(), 0 !== this.shootX && this.actionShot(this.shootX, this.shootY)))
};
PlayerGame.prototype.automaticShootPC = function(a) {
	0 !== this.m_cooldownShot && this.m_keyboardEnabled && (this.m_timerShot += a, this.m_timerShot >= this.m_cooldownShot && (this.m_timerShot -= this.m_cooldownShot, this.actionShot(this.mouseX, this.mouseY)))
};
PlayerGame.prototype.shootModel = function(a) {
	0 !== this.m_cooldownShot && this.m_keyboardEnabled && (this.m_timerShot += a, this.m_timerShot >= this.m_cooldownShot && (this.m_timerShot -= this.m_cooldownShot, this.actionShot(this.m_x + this.shootX, this.m_y + this.shootY)))
};
PlayerGame.prototype.update = function(a) {
	if (!this.m_isDead) {
		PlayerGame.superClass_.update.call(this, a);
		this.m_state === PlayerGame.ST_PLAYER_DISAPPEAR && (this.m_timeFinishState += a, 2200 <= this.m_timeFinishState && (this.m_timeFinishState = 0, this.clip().setLoop(!0), this.gotoState(PlayerGame.ST_PLAYER_APPEAR), this.setPosition(this.m_endPositionX, this.m_endPositionY)));
		this.m_state === PlayerGame.ST_PLAYER_DESTROYED && 0 > Global.savedNumData[Global.INDEX_CURRENT_LIVES] && (this.m_timeFinishState += a, 1E3 <= this.m_timeFinishState && (this.m_timeFinishState = 0, GuiManager.instance.gotoScreen(GuiManager.SC_TRY_AGAIN)));
		this.isShieldActive && null !== this.m_clipShield && (this.m_clipShield.update(a), this.m_clipShield.sprite._depth = Global.DEPTH_EFFECT, this.m_clipShield.setX(this.m_x), this.m_clipShield.setY(this.m_y + this.m_offSetY_Shield), this.playSoundShield || (this.playSoundShield = !0, Application.instance.playSound("SND_SHIELD_LOOP")), this.m_timeShield -= a, 0 >= this.m_timeShield && (this.m_timeShield = 0, this.m_canvas.removeChild(this.m_clipShield.sprite), this.m_clipShield = null, Global.savedTimeShield = 0, this.playSoundShield = this.isShieldActive = !1, this.setInvulnerability(!1), Application.instance.stopSound("SND_SHIELD_LOOP")));
		if (!1 === this.m_isPlayerDestroyed) {
			if (this.m_baseAction) {
				this.m_baseAction.baseUpdate(a);
				return
			}
			this.motionModel(a);
			Application.isMobileDevice && this.m_isShooting && 2 === Global.MOBILE_MODE_GAME && this.shootModel(a); ! Application.isMobileDevice && this.m_activeAutoShot && this.automaticShootPC(a)
		}
		this.m_activeDoubleDamage && (this.m_timeDoubleDamage -= a, 0 >= this.m_timeDoubleDamage && this.setActiveDoubleDamage(!1));
		null !== this.m_alphaInterval && this.m_alphaInterval.update(a)
	}
};
PlayerGame.prototype.setActionStandPlayer = function(a) {
	this.m_angle = a; - 45 <= this.m_angle && 50 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT) : 51 <= this.m_angle && 150 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN) : 151 <= this.m_angle && 180 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT) : -179 <= this.m_angle && -150 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT) : this.gotoState(PlayerGame.ST_PLAYER_STAND_UP)
};
PlayerGame.prototype.setAngleForStick = function(a) {
	this.m_keyboardEnabled && !0 !== this.validateState([PlayerGame.ST_PLAYER_APPEAR, PlayerGame.ST_PLAYER_DISAPPEAR, PlayerGame.ST_PLAYER_HIT, PlayerGame.ST_PLAYER_WIN, PlayerGame.ST_PLAYER_DESTROYED]) && this.m_angle !== a && (this.m_angle = a, -45 <= this.m_angle && 50 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_WALK_RIGHT) : 51 <= this.m_angle && 150 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_WALK_DOWN) : 151 <= this.m_angle && 180 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_WALK_LEFT) : -179 <= this.m_angle && -150 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_WALK_LEFT) : this.gotoState(PlayerGame.ST_PLAYER_WALK_UP))
};
PlayerGame.prototype.setStopMoveStick = function() {
	this.m_keyboardEnabled && ( - 45 <= this.m_angle && 50 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT) : 51 <= this.m_angle && 150 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN) : 151 <= this.m_angle && 180 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT) : -179 <= this.m_angle && -150 >= this.m_angle ? this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT) : this.gotoState(PlayerGame.ST_PLAYER_STAND_UP))
};
PlayerGame.prototype.onKeyDown = function(a) {
	if (this.m_keyboardEnabled && !0 !== this.validateState([PlayerGame.ST_PLAYER_APPEAR, PlayerGame.ST_PLAYER_DISAPPEAR, PlayerGame.ST_PLAYER_HIT, PlayerGame.ST_PLAYER_WIN, PlayerGame.ST_PLAYER_DESTROYED])) {
		switch (a) {
		case Common.KEY_UP:
			this.forceY = -1;
			this.m_isKeyPress = !0;
			this.m_touchY[1] = !0;
			this.gotoState(PlayerGame.ST_PLAYER_WALK_UP);
			break;
		case Common.KEY_DOWN:
			this.forceY = 1;
			this.m_isKeyPress = !0;
			this.m_touchY[0] = !0;
			this.gotoState(PlayerGame.ST_PLAYER_WALK_DOWN);
			break;
		case Common.KEY_RIGHT:
			this.forceX = 1;
			this.m_isKeyPress = !0;
			this.m_touchX[1] = !0;
			this.gotoState(PlayerGame.ST_PLAYER_WALK_RIGHT);
			break;
		case Common.KEY_LEFT:
			this.forceX = -1,
			this.m_isKeyPress = !0,
			this.m_touchX[0] = !0,
			this.gotoState(PlayerGame.ST_PLAYER_WALK_LEFT)
		}
		switch (a) {
		case Common.KEY_UP:
		case Common.KEY_DOWN:
		case Common.KEY_RIGHT:
		case Common.KEY_LEFT:
			this.m_isKeyPress && 0 !== this.forceX && 0 !== this.forceY && (this.forceX *= 0.85, this.forceY *= 0.85)
		}
	}
};
PlayerGame.prototype.onKeyUp = function(a) {
	if (this.m_keyboardEnabled) if (!0 === this.validateState([PlayerGame.ST_PLAYER_APPEAR, PlayerGame.ST_PLAYER_DISAPPEAR, PlayerGame.ST_PLAYER_DESTROYED, PlayerGame.ST_PLAYER_WIN])) this.m_isKeyPress = !1,
	this.forceX = this.forceY = 0,
	this.m_touchY[0] = !1,
	this.m_touchY[1] = !1,
	this.m_touchX[0] = !1,
	this.m_touchX[1] = !1;
	else switch (a) {
	case Common.KEY_UP:
		this.m_touchY[0] ? this.forceY = 1 : (this.forceY = 0, this.m_touchX[0] || this.m_touchX[1] || (this.m_isKeyPress = !1, this.gotoState(PlayerGame.ST_PLAYER_STAND_UP)));
		this.m_touchY[1] = !1;
		break;
	case Common.KEY_DOWN:
		this.m_touchY[1] ? this.forceY = -1 : (this.forceY = 0, this.m_touchX[0] || this.m_touchX[1] || (this.m_isKeyPress = !1, this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN)));
		this.m_touchY[0] = !1;
		break;
	case Common.KEY_RIGHT:
		this.m_touchX[0] ? this.forceX = -1 : (this.forceX = 0, this.m_touchY[0] || this.m_touchY[1] || (this.m_isKeyPress = !1, this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT)));
		this.m_touchX[1] = !1;
		break;
	case Common.KEY_LEFT:
		this.m_touchX[1] ? this.forceX = 1 : (this.forceX = 0, this.m_touchY[0] || this.m_touchY[1] || (this.m_isKeyPress = !1, this.gotoState(PlayerGame.ST_PLAYER_STAND_LEFT))),
		this.m_touchX[0] = !1
	}
};
PlayerGame.prototype.validateState = function(a) {
	for (var b = 0; b < a.length; b++) if (this.m_state === a[b]) return ! 0;
	return ! 1
};
PlayerGame.prototype.getData = function(a, b) {
	if (null !== a && null !== b && a[b]) return a[b]
};
PlayerGame.prototype.onChangeBaseSpeed = function(a) {
	this.m_speedBaseX = a
};
PlayerGame.prototype.free = function() {
	PlayerGame.superClass_.free.call(this);
	null !== this.moveFollow && (this.moveFollow.free(), this.moveFollow = null);
	null !== this.m_alphaInterval && (this.m_alphaInterval.free(), this.m_alphaInterval = null);
	this.m_activeAutoShot = !1
};
function WorldGame(a, b) {
	VU_World.call(this, a, b);
	this.m_foreGround = this.m_bgLevel = this.m_shotHandler = this.m_actorManager = this.m_tempNpc = null;
	0 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] || 14 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? (this.m_bgName = "mcRoom_tutorial", this.m_fgName = "foreground_10") : (this.m_bgName = Application.config.settings["BgLevel_" + Global.savedNumData[Global.INDEX_CURRENT_ROOM]], this.m_fgName = Application.config.settings["ForeGLevel_" + Global.savedNumData[Global.INDEX_CURRENT_ROOM]])
}
goog.inherits(WorldGame, VU_World);
WorldGame.WEAPON_SIMPLE = "weaponSimple";
WorldGame.WEAPON_SPLASH = "weaponSplash";
WorldGame.prototype.update = function(a) {
	WorldGame.superClass_.update.call(this, a);
	this.m_shotHandler && this.m_shotHandler.update(a)
};
WorldGame.prototype.free = function() {
	this.m_shotHandler && (this.m_shotHandler.free(), this.m_shotHandler = null);
	return WorldGame.superClass_.free.call(this)
};
WorldGame.prototype.objectCanvas = function() {
	return WorldGame.superClass_.objectCanvas.call(this)
};
WorldGame.prototype.createNpcManagers = function() {
	this.m_actorManager = new ActorManager(this);
	this.m_shotHandler = new ShotHandler(this)
};
WorldGame.prototype.shotHandler = function() {
	return this.m_shotHandler
};
WorldGame.prototype.addNpc = function(a, b) {
	this.m_tempNpc = new VU_Npc;
	this.m_tempNpc.id = a.id;
	this.m_tempNpc.x = a.x;
	this.m_tempNpc.y = a.y;
	this.m_tempNpc.params = a.params;
	this.m_tempNpc.skin = a.skin;
	this.m_tempNpc.canvas = b;
	this.m_tempNpc.entrance = a.entrance;
	this.m_tempNpc.rawData = a;
	this.m_actorManager.addNpc(this.m_tempNpc)
};
WorldGame.prototype.onKeyDown = function(a) {
	this.m_player.onKeyDown(a)
};
WorldGame.prototype.onKeyUp = function(a) {
	this.m_player.onKeyUp(a)
};
WorldGame.prototype.showCollision = function(a) {
	WorldGame.superClass_.showCollision.call(this, a)
};
WorldGame.prototype.loadData = function(a) {
	WorldGame.superClass_.loadData.call(this, a);
	this.m_bgLevel = Application.instance.getClip(this.m_bgName);
	this.m_bgLevel.setPosition(0, 0);
	this.m_playerCanvas.addChild(this.m_bgLevel.sprite);
	switch (Global.playerSelected) {
	case 1:
		this.m_player = new Dipper(this.m_playerCanvas, this, this.playerInitX, this.playerInitY, ActorManager.GENERIC_PLAYER, "Mabel");
		break;
	case 2:
		this.m_player = new Dipper(this.m_playerCanvas, this, this.playerInitX, this.playerInitY, ActorManager.GENERIC_PLAYER, "Dipper");
		break;
	case 3:
		this.m_player = new Wander(this.m_playerCanvas, this, this.playerInitX, this.playerInitY, ActorManager.GENERIC_PLAYER);
		break;
	case 4:
		this.m_player = new Randy(this.m_playerCanvas, this, this.playerInitX, this.playerInitY, ActorManager.GENERIC_PLAYER);
		break;
	case 5:
		this.m_player = new AgentP(this.m_playerCanvas, this, this.playerInitX, this.playerInitY, ActorManager.GENERIC_PLAYER)
	}
	this.m_actorManager.init(this.m_player);
	this.m_player.setPosition(Application.config.settings["door" + Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM] + "XSpawn"], Application.config.settings["door" + Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM] + "YSpawn"]);
	this.m_player.setBaseAction(new PlayerEnterAction(this.m_player, !0, 375 + 0.5 * (this.m_player.x() - 375), 290 + 0.5 * (this.m_player.y() - 290), 0));
	this.m_player.startAction();
	this.init();
	this.m_foreGround = Application.instance.getClip(this.m_fgName);
	this.m_foreGround.setPosition(375, 630);
	this.m_foreGround.sprite._depth = Global.DEPTH_FOREGROUND;
	this.m_playerCanvas.addChild(this.m_foreGround.sprite)
};
WorldGame.prototype.getPlayer = function() {
	return this.m_player
};
function AlphaInterval(a, b) {
	this.m_clip = null;
	this.m_start = !1;
	this.m_caller = a;
	this.m_currentFrecuency = this.m_currentDuration = this.m_frecuency = this.m_duration = 0;
	this.m_onEndCallback = b
}
AlphaInterval.prototype.start = function(a, b) {
	this.m_start = !0;
	this.m_duration = a;
	this.m_frecuency = b
};
AlphaInterval.prototype.setClip = function(a) {
	this.m_clip = a
};
AlphaInterval.prototype.setAlpha = function(a) {
	this.m_clip.setAlpha(a)
};
AlphaInterval.prototype.getAlpha = function() {
	return this.m_clip.getAlpha()
};
AlphaInterval.prototype.update = function(a) {
	if (this.m_start && null !== this.m_clip) if (this.m_currentDuration += a, this.m_currentDuration <= this.m_duration) this.m_currentFrecuency += a,
	this.m_currentFrecuency >= this.m_frecuency && (this.m_currentFrecuency = 0, this.setAlpha(1 === this.getAlpha() ? 0.5 : 1));
	else if (this.m_currentDuration = 0, this.m_start = !1, "" !== this.m_onEndCallback) this.m_caller[this.m_onEndCallback]()
};
AlphaInterval.prototype.free = function() {
	this.m_caller = this.m_clip = null
};
function ItemBasic(a, b, c, d, e, f) {
	VU_WorldActor.call(this, a, b, c, d, "", f);
	this.m_skin = e;
	this.m_character = null;
	this.m_id = f;
	this.initCharacter(a)
}
goog.inherits(ItemBasic, VU_WorldActor);
ItemBasic.ST_ITEM_APPEAR = "st100";
ItemBasic.ST_ITEM_DEFEAT = "st101";
ItemBasic.ST_ITEM_SPECIAL = "st102";
ItemBasic.ST_ITEM_STAND = "st103";
ItemBasic.prototype.initCharacter = function(a) {
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(ItemBasic.ST_ITEM_STAND, "mcItemShot_" + this.m_skin + "_stand");
	this.m_character.addState(ItemBasic.ST_ITEM_APPEAR, "mcItemShot_" + this.m_skin + "_appear");
	this.m_character.addState(ItemBasic.ST_ITEM_DEFEAT, "mcItemShot_" + this.m_skin + "_defeat");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ItemBasic.ST_ITEM_APPEAR)
};
ItemBasic.prototype.isAnimEnable = function() {
	return this.m_state === ItemBasic.ST_ITEM_DEFEAT
};
ItemBasic.prototype.onEndAnimation = function(a) {
	switch (a) {
	case ItemBasic.ST_ITEM_APPEAR:
		this.gotoState(ItemBasic.ST_ITEM_STAND);
		break;
	case ItemBasic.ST_ITEM_DEFEAT:
		this.m_isAwaitingDelete = !0
	}
};
ItemBasic.prototype.update = function(a) {
	this.m_character.update(a);
	ItemBasic.superClass_.update.call(this, a);
	if (this.m_state === ItemBasic.ST_ITEM_STAND) this.onHit()
};
ItemBasic.prototype.gotoState = function(a) {
	ItemBasic.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.clip().setScale(0.8, 0.8)
};
ItemBasic.prototype.onHit = function() {};
function ItemMulti(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f)
}
goog.inherits(ItemMulti, ItemBasic);
ItemMulti.prototype.onHit = function() { ! this.isAnimEnable() && this.hitTest(this.m_world.player()) && (this.gotoState(ItemBasic.ST_ITEM_DEFEAT), Application.instance.playSound("SND_POWERUP_GET2"), GameVillains.instance.addEffect("mcPickItemPowerupsWeapon", this.m_x, this.m_y), PlayerGame.instance.setTypeWeapon(ShotHandler.MULTIPLE, !0))
};
function ItemCoin(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f)
}
goog.inherits(ItemCoin, ItemBasic);
ItemCoin.prototype.initCharacter = function(a) {
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(ItemBasic.ST_ITEM_DEFEAT, "mcItemCoin_defeat");
	this.m_character.addState(ItemBasic.ST_ITEM_APPEAR, "mcItemCoin_appear");
	this.m_character.addState(ItemBasic.ST_ITEM_STAND, "mcItemCoin_stand");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ItemBasic.ST_ITEM_APPEAR)
};
ItemCoin.prototype.onHit = function() { ! this.isAnimEnable() && this.hitTest(this.m_world.player()) && (this.gotoState(ItemBasic.ST_ITEM_DEFEAT), Application.instance.playSound("SND_POWERUP_GET2"), GameVillains.instance.addEffect("mcPickItemCoin", this.m_x, this.m_y), GameVillains.instance.addScore(100))
};
function ItemBomb(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f)
}
goog.inherits(ItemBomb, ItemBasic);
ItemBomb.prototype.onHit = function() { ! this.isAnimEnable() && this.hitTest(this.m_world.player()) && (this.gotoState(ItemBasic.ST_ITEM_DEFEAT), GameVillains.instance.addEffect("mcPickItemPowerupsWeapon", this.m_x, this.m_y), GameVillains.instance.addForceItem(this.m_x, this.m_y, "bombExplode"))
};
function ItemHeart(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f)
}
goog.inherits(ItemHeart, ItemBasic);
ItemHeart.prototype.initCharacter = function(a) {
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(ItemBasic.ST_ITEM_DEFEAT, "mcItemHp_defeat");
	this.m_character.addState(ItemBasic.ST_ITEM_APPEAR, "mcItemHp_appear");
	this.m_character.addState(ItemBasic.ST_ITEM_STAND, "mcItemHp_stand");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ItemBasic.ST_ITEM_APPEAR)
};
ItemHeart.prototype.onHit = function() { ! this.isAnimEnable() && this.hitTest(this.m_world.player()) && (this.gotoState(ItemBasic.ST_ITEM_DEFEAT), Application.instance.playSound("SND_POWERUP_GET2"), GameVillains.instance.addEffect("mcPickItemLife", this.m_x, this.m_y), GameVillains.instance.addHealth(100))
};
function ItemDamage(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f)
}
goog.inherits(ItemDamage, ItemBasic);
ItemDamage.prototype.initCharacter = function(a) {
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(ItemBasic.ST_ITEM_SPECIAL, "mcBulletDamage_effect");
	this.m_character.addState(ItemBasic.ST_ITEM_DEFEAT, "mcItemDamage_defeat");
	this.m_character.addState(ItemBasic.ST_ITEM_APPEAR, "mcItemDamage_appear");
	this.m_character.addState(ItemBasic.ST_ITEM_STAND, "mcItemDamage_stand");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ItemBasic.ST_ITEM_APPEAR)
};
ItemDamage.prototype.update = function(a) {
	ItemDamage.superClass_.update.call(this, a)
};
ItemDamage.prototype.onEndAnimation = function(a) {
	ItemDamage.superClass_.onEndAnimation.call(this, a);
	switch (a) {
	case ItemBasic.ST_ITEM_SPECIAL:
		this.m_isAwaitingDelete = !0
	}
};
ItemDamage.prototype.onHit = function() { ! this.isAnimEnable() && this.hitTest(this.m_world.player()) && (this.gotoState(ItemBasic.ST_ITEM_SPECIAL), Application.instance.playSound("SND_POWERUP_GET2"), GameVillains.instance.addEffect("mcPickItemPowerupsWeapon", this.m_x, this.m_y), PlayerGame.instance.setActiveDoubleDamage(!0))
};
function ItemShield(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f)
}
goog.inherits(ItemShield, ItemBasic);
ItemShield.prototype.initCharacter = function(a) {
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(ItemBasic.ST_ITEM_DEFEAT, "mcShield_effect");
	this.m_character.addState(ItemBasic.ST_ITEM_APPEAR, "mcItemShield_appear");
	this.m_character.addState(ItemBasic.ST_ITEM_STAND, "mcItemShield_stand");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ItemBasic.ST_ITEM_APPEAR)
};
ItemShield.prototype.update = function(a) {
	ItemShield.superClass_.update.call(this, a)
};
ItemShield.prototype.onHit = function() {
	this.isAnimEnable() || !this.hitTest(this.m_world.player()) || this.m_isAwaitingDelete || (this.m_isAwaitingDelete = !0, GameVillains.instance.addEffect("mcPickItemPowerupsWeapon", this.m_x, this.m_y), PlayerGame.instance.addTimeShield(Application.config.settings.timeShield))
};
function ItemReargun(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f);
	this.m_activeReargun = !1;
	this.m_idActor = ""
}
goog.inherits(ItemReargun, ItemBasic);
ItemReargun.prototype.initCharacter = function(a) {
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(ItemBasic.ST_ITEM_SPECIAL, "mcRearGun_effect");
	this.m_character.addState(ItemBasic.ST_ITEM_DEFEAT, "mcRearGun_effect");
	this.m_character.addState(ItemBasic.ST_ITEM_APPEAR, "mcItemReargun_appear");
	this.m_character.addState(ItemBasic.ST_ITEM_STAND, "mcItemReargun_stand");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ItemBasic.ST_ITEM_APPEAR)
};
ItemReargun.prototype.update = function(a) {
	ItemReargun.superClass_.update.call(this, a); ! this.m_isAwaitingDelete && this.m_activeReargun && (this.setDepth(9), this.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() - 20))
};
ItemReargun.prototype.onEndAnimation = function(a) {
	ItemReargun.superClass_.onEndAnimation.call(this, a);
	switch (a) {
	case ItemBasic.ST_ITEM_SPECIAL:
		Application.instance.playSound("SND_POWERUP_MULTISHOT_SPREAD2"),
		this.m_world.shotHandler().specialShoot(this.m_idActor),
		this.m_isAwaitingDelete = !0
	}
};
ItemReargun.prototype.onHit = function() { ! this.isAnimEnable() && this.hitTest(this.m_world.player()) && (this.gotoState(ItemBasic.ST_ITEM_SPECIAL), this.m_activeReargun = !0, Application.instance.playSound("SND_POWERUP_MULTISHOT_FLASHES2"), GameVillains.instance.addEffect("mcPickItemPowerupsWeapon", this.m_x, this.m_y), this.m_idActor = this.m_world.player().idPlayer())
};
function ItemBouncing(a, b, c, d, e, f) {
	ItemBasic.call(this, a, b, c, d, e, f)
}
goog.inherits(ItemBouncing, ItemBasic);
ItemBouncing.prototype.onHit = function() { ! this.isAnimEnable() && this.hitTest(this.m_world.player()) && (this.gotoState(ItemBasic.ST_ITEM_DEFEAT), Application.instance.playSound("SND_POWERUP_GET2"), GameVillains.instance.addEffect("mcPickItemPowerupsWeapon", this.m_x, this.m_y), PlayerGame.instance.setTypeWeapon(ShotHandler.BOUNCING, !0))
};
function ShotHandler(a) {
	VU_NpcManager.call(this, a);
	this.m_idShot = 1;
	this.m_world = a;
	this.m_maxPlayerAmmo = this.m_playerAmmo = 0
}
goog.inherits(ShotHandler, VU_NpcManager);
ShotHandler.REGULAR = 1;
ShotHandler.BOUNCING = 2;
ShotHandler.MULTIPLE = 3;
ShotHandler.HOMING = 5;
ShotHandler.SHORT_LASER = 6;
ShotHandler.THICK01_LASER = 7;
ShotHandler.THICK02_LASER = 8;
ShotHandler.LARGE_LASER = 9;
ShotHandler.MISSILE = 10;
ShotHandler.REGULAR_BOSS = 11;
ShotHandler.AGAINST_PLAYER = 1;
ShotHandler.FROM_PLAYER = 2;
ShotHandler.ON_TARGET = 3;
ShotHandler.SPECIAL_SPACING_BULLET = 20;
ShotHandler.prototype.shoot = function(a, b, c, d, e, f, g, h, k, l, m) {
	switch (a) {
	case ShotHandler.REGULAR_BOSS:
		this.add(new ShotRegular(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[0].distance, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI, c, d, [this.m_world.player()], "bomb"));
		break;
	case ShotHandler.REGULAR:
		switch (b) {
		case ShotHandler.AGAINST_PLAYER:
			this.add(new ShotRegular(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[0].distance, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI, c, d, [this.m_world.player()]));
			break;
		case ShotHandler.FROM_PLAYER:
			this.add(new ShotRegular(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[0].distance, 180 * Math.atan2(h - f, g - e) / Math.PI, Application.config.vu_attacks[a - 1].attackSpeed, Application.config.vu_attacks[a - 1].attackDamage, this.m_world.actorManager().getActors()));
			break;
		case ShotHandler.ON_TARGET:
			this.add(new ShotRegular(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[0].distance, 180 * Math.atan2(h - f, g - e) / Math.PI + l, c, d, [this.m_world.player()]))
		}
		break;
	case ShotHandler.BOUNCING:
		switch (b) {
		case ShotHandler.AGAINST_PLAYER:
			this.add(new ShotBouncing(this.m_world.objectCanvas(), this.m_world, k, e, f, 0, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI, c, d, [this.m_world.player()]));
			break;
		case ShotHandler.FROM_PLAYER:
			this.add(new ShotBouncing(this.m_world.objectCanvas(), this.m_world, k, e, f, 0, 180 * Math.atan2(h - f, g - e) / Math.PI, Application.config.vu_attacks[a - 1].attackSpeed, Application.config.vu_attacks[a - 1].attackDamage, this.m_world.actorManager().getActors()));
			break;
		case ShotHandler.ON_TARGET:
			this.add(new ShotBouncing(this.m_world.objectCanvas(), this.m_world, k, e, f, 0, 180 * Math.atan2(h - f, g - e) / Math.PI + l, c, d, [this.m_world.player()]))
		}
		break;
	case ShotHandler.MULTIPLE:
		switch (b) {
		case ShotHandler.AGAINST_PLAYER:
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI - 20, c, d, [this.m_world.player()]));
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI, c, d, [this.m_world.player()]));
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI + 20, c, d, [this.m_world.player()]));
			break;
		case ShotHandler.FROM_PLAYER:
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(h - f, g - e) / Math.PI - 20, Application.config.vu_attacks[a - 1].attackSpeed, Application.config.vu_attacks[a - 1].attackDamage, this.m_world.actorManager().getActors()));
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(h - f, g - e) / Math.PI, Application.config.vu_attacks[a - 1].attackSpeed, Application.config.vu_attacks[a - 1].attackDamage, this.m_world.actorManager().getActors()));
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(h - f, g - e) / Math.PI + 20, Application.config.vu_attacks[a - 1].attackSpeed, Application.config.vu_attacks[a - 1].attackDamage, this.m_world.actorManager().getActors()));
			break;
		case ShotHandler.ON_TARGET:
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(h - f, g - e) / Math.PI - 20 + l, c, d, [this.m_world.player()])),
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(h - f, g - e) / Math.PI + l, c, d, [this.m_world.player()])),
			this.add(new ShotMulti(this.m_world.objectCanvas(), this.m_world, k, e, f, Application.config.vu_attacks[1].distance, 180 * Math.atan2(h - f, g - e) / Math.PI + 20 + l, c, d, [this.m_world.player()]))
		}
		break;
	case ShotHandler.HOMING:
		switch (b) {
		default:
			this.add(new ShotHoming(this.m_world.objectCanvas(), this.m_world, k, e, f, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI, c, d, [this.m_world.player()], m))
		}
		break;
	case ShotHandler.SHORT_LASER:
		switch (b) {
		default:
			this.add(new ShotLaserShort(this.m_world.objectCanvas(), this.m_world, k, e, f, g, h, 0, 180 * Math.atan2(h - f, g - e) / Math.PI + l, c, d, [this.m_world.player()], 1))
		}
		break;
	case ShotHandler.THICK01_LASER:
		switch (b) {
		default:
			this.add(new ShotLaserShort(this.m_world.objectCanvas(), this.m_world, k, e, f, g, h, 0, 180 * Math.atan2(h - f, g - e) / Math.PI + l, c, d, [this.m_world.player()], 2))
		}
		break;
	case ShotHandler.THICK02_LASER:
		switch (b) {
		default:
			this.add(new ShotLaserShort(this.m_world.objectCanvas(), this.m_world, k, e, f, g, h, 0, 180 * Math.atan2(h - f, g - e) / Math.PI + l, c, d, [this.m_world.player()], 3))
		}
		break;
	case ShotHandler.LARGE_LASER:
		switch (b) {
		default:
			this.add(new ShotLaser(this.m_world.objectCanvas(), this.m_world, k, e, f, g, h, 0, l, c, d, [this.m_world.player()]))
		}
		break;
	case ShotHandler.MISSILE:
		switch (b) {
		default:
			this.add(new ShotMissile(this.m_world.objectCanvas(), this.m_world, k, e, f, 180 * Math.atan2(this.m_world.player().y() - f, this.m_world.player().x() - e) / Math.PI, c, d, [this.m_world.player()], m))
		}
	}
	b === ShotHandler.FROM_PLAYER && a !== ShotHandler.REGULAR && (this.m_playerAmmo--, HudGame.instance.setCurrentMP(100 * this.m_playerAmmo / this.m_maxPlayerAmmo), 0 === this.m_playerAmmo && this.m_world.player().typeWeapon() !== ShotHandler.REGULAR && this.m_world.player().setTypeWeapon(ShotHandler.REGULAR, !0))
};
ShotHandler.prototype.specialShoot = function(a) {
	for (var b = null,
	c = Math.floor(360 / ShotHandler.SPECIAL_SPACING_BULLET), d = Math.random() * ShotHandler.SPECIAL_SPACING_BULLET, e = 0; e < c; e++) b = ShotHandler.SPECIAL_SPACING_BULLET * e + d,
	b = new ShotBouncing(this.m_world.objectCanvas(), this.m_world, a, this.m_world.player().x(), this.m_world.player().y(), 0, b, Application.config.vu_attacks[ShotHandler.BOUNCING - 1].attackSpeed, Application.config.vu_attacks[ShotHandler.BOUNCING - 1].attackDamage, this.m_world.actorManager().getActors()),
	this.add(b)
};
ShotHandler.prototype.setAmmo = function(a, b) {
	this.m_playerAmmo = a;
	this.m_maxPlayerAmmo = b;
	HudGame.instance.setCurrentMP(PlayerGame.instance.typeWeapon() !== ShotHandler.REGULAR ? 100 * a / b: 0)
};
ShotHandler.prototype.playerAmmo = function() {
	return this.m_playerAmmo
};
function Pointer(a) {
	this.m_canvas = a;
	this.m_mouseY = this.m_mouseX = this.m_rotation = this.timeVisible = 0;
	this.speed = 0.3;
	this.m_y = this.m_x = this.forceY = this.forceX = 0;
	this.isMobile = Application.isMobileDevice;
	this.m_aimClip = Application.instance.getClip("mcPointer");
	this.m_canvas.addChild(this.m_aimClip.sprite);
	this.setPosition(300, 300);
	this.isMobile && (this.m_aimClip.sprite.opacity = 0)
}
Pointer.LIMIT_OFFSET = 30;
Pointer.prototype.free = function() {
	null !== this.m_aimClip && this.m_canvas.removeChild(this.m_aimClip.sprite);
	this.m_aimClip = null
};
Pointer.prototype.x = function() {
	return this.m_x
};
Pointer.prototype.y = function() {
	return this.m_y
};
Pointer.prototype.setPosition = function(a, b) {
	this.m_x = a;
	this.m_y = b;
	this.m_aimClip.setPosition(a, b)
};
Pointer.prototype.onMouseDown = function(a) {};
Pointer.prototype.onMouseMove = function(a) {
	this.isMobile || (this.m_mouseX = void 0 === a.offsetX ? a.layerX: a.offsetX, this.m_mouseY = void 0 === a.offsetY ? a.layerY: a.offsetY, this.m_aimClip.setPosition(this.m_mouseX, this.m_mouseY))
};
Pointer.prototype.update = function(a) {
	this.m_aimClip.update(a);
	this.m_rotation += 5;
	this.m_aimClip.setRotation(this.m_rotation);
	360 <= this.m_rotation && (this.m_rotation = 0);
	this.isMobile || (1 === Global.MOBILE_MODE_GAME && 0 !== this.m_aimClip.sprite.opacity ? this.m_aimClip.sprite.opacity = 0 : 2 === Global.MOBILE_MODE_GAME && 0 === this.m_aimClip.sprite.opacity && (this.m_aimClip.sprite.opacity = 1))
};
function ShotRegular(a, b, c, d, e, f, g, h, k, l, m) {
	VU_WorldActor.call(this, a, b, d, e, "");
	this.m_typeRegular = "undefined" === typeof m ? "regular": m;
	this.m_initX = d;
	this.m_initY = e;
	this.m_damage = k;
	this.m_rotation = 0;
	this.m_idPlayer = c;
	this.m_distance = f;
	this.m_character = null;
	this.m_actorsRef = l;
	this.m_disableShot = !1;
	this.m_angle = g * Math.PI / 180;
	this.m_speedX = h * Math.cos(this.m_angle);
	this.m_speedY = h * Math.sin(this.m_angle);
	this.m_shotActive = !1;
	this.initCharacter(d, e, a);
	this.m_id = 0;
	this.m_canKillEnemies = !0;
	this.m_deathModeId = 0
}
goog.inherits(ShotRegular, VU_WorldActor);
ShotRegular.ST_NORMAL = "st100";
ShotRegular.ST_DESTROY = "st101";
ShotRegular.LIMIT_LEFT = 20;
ShotRegular.LIMIT_RIGHT = 720;
ShotRegular.LIMIT_UP = 40;
ShotRegular.LIMIT_DOWN = 490;
ShotRegular.VALUE_ROTATION = 15;
ShotRegular.MIN_ROTATION = 0;
ShotRegular.MAX_ROTATION = 360;
ShotRegular.prototype.initCharacter = function(a, b, c) {
	this.m_character = new Character(a, b, c);
	this.addStatesCharacter();
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ShotRegular.ST_NORMAL)
};
ShotRegular.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotRegular.ST_NORMAL, "mcBullet_" + this.m_idPlayer + "_" + this.m_typeRegular + "_stand");
	this.m_character.addState(ShotRegular.ST_DESTROY, "mcBullet_" + this.m_idPlayer + "_" + this.m_typeRegular + "_destroy")
};
ShotRegular.prototype.forceRotation = function() {};
ShotRegular.prototype.gotoState = function(a) {
	ShotRegular.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.forceScale();
	this.forceRotation()
};
ShotRegular.prototype.forceScale = function() {
	this.clip().setScale(0.5, 0.5)
};
ShotRegular.prototype.onEndAnimation = function(a) {
	switch (a) {
	case ShotRegular.ST_DESTROY:
		this.m_isAwaitingDelete = !0
	}
};
ShotRegular.prototype.free = function() {
	ShotRegular.superClass_.free.call(this);
	this.m_actorsRef = null
};
ShotRegular.prototype.onHit = function() {
	for (var a = "",
	b = 0; b < this.m_actorsRef.length; b++) ! 0 !== this.m_actorsRef[b].isAwaitingDelete() && ((this.m_actorsRef[b].id() === ActorManager.GENERIC_BOSS && !this.m_actorsRef[b].isAnimDestroying() && this.hitTest(this.m_actorsRef[b]) && this.m_canKillEnemies && (this.m_actorsRef[b].onHitBullet(this.m_damage, this) ? (a = this.returnNameEffectHit(this.m_idPlayer), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_canKillEnemies = !1) : (GameVillains.instance.addEffect("mcHitShieldBoss", this.m_x, this.m_y), this.setAwaitingDelete(!0))), this.m_actorsRef[b].id() !== ActorManager.GENERIC_ENEMY && this.m_actorsRef[b].id() !== ActorManager.GENERIC_BREAKABLE || this.m_actorsRef[b].isAnimDestroying() || !this.hitTest(this.m_actorsRef[b]) || !this.m_canKillEnemies) ? this.m_actorsRef[b].id() === ActorManager.GENERIC_PLAYER && !this.m_actorsRef[b].isAnimEnable() && this.hitTest(this.m_actorsRef[b]) && this.m_canKillEnemies ? (this.m_actorsRef[b].isInvulnerable() || (a = this.returnNameEffectHit("enemy"), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0), this.m_actorsRef[b].onHit(this.m_damage), this.m_canKillEnemies = !1) : this.m_actorsRef[b].id() === ActorManager.GENERIC_PORTAL && this.m_actorsRef[b].isEnableGenerator() && this.hitTest(this.m_actorsRef[b]) && this.m_canKillEnemies ? (a = this.returnNameEffectHit(this.m_idPlayer), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[b].reduceHealth(this.m_damage), this.m_canKillEnemies = !1) : this.m_actorsRef[b].id() === ActorManager.GENERIC_CENTER_ITEM && this.m_actorsRef[b].isAlive() && this.hitTest(this.m_actorsRef[b]) && this.m_canKillEnemies && (a = this.returnNameEffectHit(this.m_idPlayer), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[b].reduceHealth(this.m_damage), this.m_canKillEnemies = !1) : (a = this.returnNameEffectHit(this.m_idPlayer), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[b].id() === ActorManager.GENERIC_ENEMY && this.m_actorsRef[b].setDeathMode(this.m_deathModeId), this.m_actorsRef[b].reduceHealth(this.m_damage), this.m_canKillEnemies = !1))
};
ShotRegular.prototype.rangePosition = function(a, b) {
	if (a < ShotRegular.LIMIT_LEFT || a > ShotRegular.LIMIT_RIGHT) this.gotoState(ShotRegular.ST_DESTROY),
	this.m_shotActive = !0;
	else if (b < ShotRegular.LIMIT_UP || b > ShotRegular.LIMIT_DOWN) this.gotoState(ShotRegular.ST_DESTROY),
	this.m_shotActive = !0
};
ShotRegular.prototype.motionModel = function(a) {
	this.m_x += this.m_speedX * a;
	this.m_y += this.m_speedY * a;
	this.rangePosition(this.m_x, this.m_y);
	Common.distance(this.m_initX, this.m_initY, this.m_x, this.m_y) > this.m_distance && (this.m_disableShot = !0, this.gotoState(ShotRegular.ST_DESTROY))
};
ShotRegular.prototype.returnNameEffectHit = function(a) {
	var b = "";
	switch (a) {
	case "randy":
	case "wander":
		b = "mcHitEnemyHard";
		break;
	case "agentP":
		b = "mcHitEnemyShoot";
		break;
	case "dipper":
		b = "mcHitEnemySoft";
		break;
	default:
		b = "mcHitPlayerSoft"
	}
	return b
};
ShotRegular.prototype.rotationBullet = function() {
	null !== this.m_clip && this.m_state === ShotRegular.ST_NORMAL && (this.m_rotation += ShotRegular.VALUE_ROTATION, this.m_clip.setRotation(this.m_rotation), this.m_rotation >= ShotRegular.MAX_ROTATION && (this.m_rotation = ShotRegular.MIN_ROTATION))
};
ShotRegular.prototype.update = function(a) {
	this.m_character.update(a);
	ShotRegular.superClass_.update.call(this, a);
	this.m_disableShot || (!1 === this.m_shotActive && this.m_state === ShotRegular.ST_NORMAL && (this.onHit(), this.motionModel(a)), this.rotationBullet());
	this.setDepth(Global.DEPTH_BULLET)
};
function ShotHoming(a, b, c, d, e, f, g, h, k, l) {
	VU_WorldActor.call(this, a, b, d, e, "");
	this.m_highThreshold = Application.config.settings.homingHighThreshold;
	this.m_lowThreshold = Application.config.settings.homingLowThreshold;
	this.m_angularSpeed = Application.config.settings.homingAngularSpeed;
	this.m_accelConstant = Application.config.settings.homingAccelConstant;
	this.m_character = null;
	this.m_idPlayer = c;
	this.m_damage = h;
	this.m_actorsRef = k;
	this.m_rotation = 0;
	this.m_angle = f * Math.PI / 180;
	this.m_speed = g;
	this.m_shotActive = !1;
	this.initCharacter(d, e, a);
	this.m_id = 0;
	this.m_ease = l;
	this.m_alpha = 1;
	this.m_timeLife = 2E3;
	this.m_currenTime = 0
}
goog.inherits(ShotHoming, VU_WorldActor);
ShotHoming.ST_NORMAL = "st100";
ShotHoming.ST_DESTROY = "st101";
ShotHoming.LIMIT_LEFT = 70;
ShotHoming.LIMIT_RIGHT = 680;
ShotHoming.LIMIT_UP = 110;
ShotHoming.LIMIT_DOWN = 460;
ShotHoming.prototype.initCharacter = function(a, b, c) {
	this.m_character = new Character(a, b, c);
	this.addStatesCharacter();
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ShotRegular.ST_NORMAL)
};
ShotHoming.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotRegular.ST_NORMAL, "mcBullet_" + this.m_idPlayer + "_bouncing_stand");
	this.m_character.addState(ShotRegular.ST_DESTROY, "mcBullet_" + this.m_idPlayer + "_bouncing_destroy")
};
ShotHoming.prototype.gotoState = function(a) {
	ShotHoming.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.clip().setScale(0.8, 0.8)
};
ShotHoming.prototype.onEndAnimation = function(a) {
	switch (a) {
	case ShotRegular.ST_DESTROY:
		this.m_isAwaitingDelete = !0
	}
};
ShotHoming.prototype.free = function() {
	ShotHoming.superClass_.free.call(this);
	this.m_actorsRef = null
};
ShotHoming.prototype.returnNameEffectHit = function(a) {
	var b = "";
	switch (a) {
	case "randy":
	case "wander":
		b = "mcHitEnemyHard";
		break;
	case "agentP":
		b = "mcHitEnemyShoot";
		break;
	case "dipper":
		b = "mcHitEnemySoft";
		break;
	default:
		b = "mcHitPlayerHard"
	}
	return b
};
ShotHoming.prototype.onHit = function() {
	for (var a = "",
	b = 0; b < this.m_actorsRef.length; b++) ! 0 !== this.m_actorsRef[b].isAwaitingDelete() && (this.m_actorsRef[b].id() === ActorManager.GENERIC_ENEMY || this.m_actorsRef[b].id() === ActorManager.GENERIC_BOSS || this.m_actorsRef[b].id() === ActorManager.GENERIC_BREAKABLE && !this.m_actorsRef[b].isAnimDestroying() && this.hitTest(this.m_actorsRef[b]) ? (a = this.returnNameEffectHit(this.m_idPlayer), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[b].reduceHealth(this.m_damage)) : this.m_actorsRef[b].id() === ActorManager.GENERIC_PLAYER && !this.m_actorsRef[b].isAnimEnable() && this.hitTest(this.m_actorsRef[b]) ? (a = this.returnNameEffectHit("enemy"), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[b].onHit(this.m_damage)) : this.m_actorsRef[b].id() === ActorManager.GENERIC_PORTAL && this.m_actorsRef[b].isEnableGenerator() && this.hitTest(this.m_actorsRef[b]) && (a = this.returnNameEffectHit(this.m_idPlayer), GameVillains.instance.addEffect(a, this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[b].reduceHealth(this.m_damage)))
};
ShotHoming.prototype.rangePosition = function(a, b) {
	if (a < ShotRegular.LIMIT_LEFT || a > ShotRegular.LIMIT_RIGHT) this.gotoState(ShotRegular.ST_DESTROY),
	this.m_shotActive = !0;
	else if (b < ShotRegular.LIMIT_UP || b > ShotRegular.LIMIT_DOWN) this.gotoState(ShotRegular.ST_DESTROY),
	this.m_shotActive = !0
};
ShotHoming.prototype.motionModel = function(a) {
	var b = Math.atan2(this.m_world.player().y() - this.m_y, this.m_world.player().x() - this.m_x) - this.m_angle,
	b = b + (b < -Math.PI ? 2 * Math.PI: 0),
	b = b - (b > Math.PI ? 2 * Math.PI: 0),
	c = this.m_accelConstant,
	c = Math.abs(b) >= Math.PI / 2 ? -1 * c: c * ( - 1 + 2 * (0.5 * Math.PI - Math.abs(b)) / (0.5 * Math.PI));
	this.m_speed += c * a;
	this.m_speed = this.m_speed > this.m_highThreshold ? this.m_highThreshold: this.m_speed;
	this.m_speed = this.m_speed < this.m_lowThreshold ? this.m_lowThreshold: this.m_speed;
	this.m_angle += this.m_angularSpeed * a * b / this.m_ease;
	this.m_angle += this.m_angle < -Math.PI ? 2 * Math.PI: 0;
	this.m_angle -= this.m_angle > Math.PI ? 2 * Math.PI: 0;
	this.m_x += this.m_speed * a * Math.cos(this.m_angle);
	this.m_y += this.m_speed * a * Math.sin(this.m_angle);
	this.rangePosition(this.m_x, this.m_y);
	this.m_currenTime += a;
	this.m_currenTime >= this.m_timeLife && (this.m_alpha -= 0.04, 0 >= this.m_alpha ? (this.m_clip.setAlpha(0), this.m_shotActive = this.m_isAwaitingDelete = !0) : this.m_clip.setAlpha(this.m_alpha))
};
ShotHoming.prototype.rotationBullet = function() {
	null !== this.m_clip && this.m_state === ShotRegular.ST_NORMAL && (this.m_rotation += ShotRegular.VALUE_ROTATION, this.m_clip.setRotation(this.m_rotation), this.m_rotation >= ShotRegular.MAX_ROTATION && (this.m_rotation = ShotRegular.MIN_ROTATION))
};
ShotHoming.prototype.update = function(a) {
	this.m_character.update(a);
	ShotHoming.superClass_.update.call(this, a); ! 1 === this.m_shotActive && this.m_state === ShotRegular.ST_NORMAL && (this.onHit(), this.motionModel(a), this.rotationBullet());
	this.setDepth(Global.DEPTH_BULLET)
};
function ShotMulti(a, b, c, d, e, f, g, h, k, l) {
	ShotRegular.call(this, a, b, c, d, e, f, g, h, k, l);
	this.m_deathModeId = 2
}
goog.inherits(ShotMulti, ShotRegular);
ShotMulti.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotRegular.ST_NORMAL, "mcBullet_" + this.m_idPlayer + "_multi_stand");
	this.m_character.addState(ShotRegular.ST_DESTROY, "mcBullet_" + this.m_idPlayer + "_multi_destroy")
};
ShotMulti.prototype.returnNameEffectHit = function(a) {
	var b = "";
	switch (a) {
	case "randy":
		b = "mcIcebomb";
		break;
	case "wander":
		b = "mcHitEnemyHard";
		break;
	case "agentP":
		b = "mcHitEnemyShoot";
		break;
	case "dipper":
		b = "mcHitEnemySoft";
		break;
	default:
		b = "mcHitPlayerSoft"
	}
	return b
};
function ShotLaser(a, b, c, d, e, f, g, h, k, l, m, n) {
	ShotRegular.call(this, a, b, c, d, e, h, k, l, m, n);
	a = Math.atan2(g - e, f - d);
	this.m_endX = d + 700 * Math.cos(a);
	this.m_endY = e + 700 * Math.sin(a);
	this.m_movementDisplay = null;
	this.m_showDrawCircle = !1;
	this.m_timeRotation = 2;
	this.m_timeSound = this.m_endPosY = this.m_endPosX = 0;
	this.m_pointsVec = null;
	this.m_clipEffect = Application.instance.getClip("mcGroundLaser");
	this.m_clipEffect.sprite._depth = Global.DEPTH_EFFECT;
	this.m_clipEffect.setX(this.m_x);
	this.m_clipEffect.setY(this.m_y);
	this.m_canvas.addChild(this.m_clipEffect.sprite);
	Global.game.activeShotBillCipher = !0;
	Application.instance.playSound("SND_BOSS_BC_LASER")
}
goog.inherits(ShotLaser, ShotRegular);
ShotLaser.REACH_DISTANCE = 390;
ShotLaser.RANGE_ANGLE = 60;
ShotLaser.LIMIT_LEFT = 20;
ShotLaser.LIMIT_RIGHT = 720;
ShotLaser.LIMIT_UP = 40;
ShotLaser.LIMIT_DOWN = 490;
ShotLaser.prototype.forceScale = function() {};
ShotLaser.prototype.drawCircle = function() {
	this.m_showDrawCircle && (this.m_movementDisplay = new SNode, this.m_canvas.addChild(this.m_movementDisplay), this.m_movementDisplay.addDrawListener(this, "onDrawMovement"))
};
ShotLaser.prototype.clearCircle = function() {
	null !== this.m_movementDisplay && (this.m_canvas.removeChild(this.m_movementDisplay), this.m_movementDisplay = null)
};
ShotLaser.prototype.addStepPoints = function() {
	this.m_pointsVec = null;
	this.validatePointEnd(this.m_x, this.m_y, this.m_endX, this.m_endY);
	this.m_pointsVec = this.calculateStepPoints(this.m_x, this.m_y, this.m_endPosX, this.m_endPosY);
	this.clearCircle();
	this.drawCircle()
};
ShotLaser.prototype.onDrawMovement = function(a) {
	for (var b = 0; b < this.m_pointsVec.length; b++) SGraphics.drawCircle(a, this.m_pointsVec[b][0], this.m_pointsVec[b][1], 2, Common.COLOR_RED)
};
ShotLaser.prototype.validatePointEnd = function(a, b, c, d) {
	d = this.m_rotation * Math.PI / 180 + this.m_angle;
	c = ShotLaser.REACH_DISTANCE * Math.cos(d);
	d = ShotLaser.REACH_DISTANCE * Math.sin(d);
	this.m_endPosX = a + c;
	this.m_endPosY = b + d
};
ShotLaser.prototype.forceRotation = function() {
	this.m_clip.setRotation(this.m_rotation + 180 * this.m_angle / Math.PI)
};
ShotLaser.prototype.incrementRotation = function(a) {
	var b = 0;
	this.m_timeRotation -= a;
	0 >= this.m_timeRotation && (this.m_rotation -= 2, this.m_timeRotation = 2, b = this.m_rotation + 180 * this.m_angle / Math.PI, this.m_clip.setRotation(b), this.addStepPoints(), this.m_rotation <= -1 * ShotLaser.RANGE_ANGLE && (this.setAwaitingDelete(!0), this.m_shotActive = !0, Global.game.activeShotBillCipher = !1))
};
ShotLaser.prototype.update = function(a) {
	ShotLaser.superClass_.update.call(this, a);
	this.m_disableShot || this.incrementRotation(a);
	null !== this.m_clipEffect && (this.m_clipEffect.update(a), this.m_timeSound += a, 900 <= this.m_timeSound && (this.m_timeSound = 0, Application.instance.playSound("SND_BOSS_BC_MOVES_ARM")))
};
ShotLaser.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotRegular.ST_NORMAL, "mcLaser_stand");
	this.m_character.addState(ShotRegular.ST_DESTROY, "mcLaser_destroy")
};
ShotLaser.prototype.rotationBullet = function() {};
ShotLaser.prototype.motionModel = function(a) {};
ShotLaser.prototype.calculateStepPoints = function(a, b, c, d) {
	for (var e = c - a,
	f = d - b,
	g = Math.sqrt(e * e + f * f), h = Math.floor(g / 10), k = [], l = 0; l < h; l++) k.push([a + 10 * (e / g) * l, b + 10 * (f / g) * l]);
	k.push([c, d]);
	return k
};
ShotLaser.prototype.onHit = function() {
	if (null !== this.m_pointsVec) for (var a = 0; a < this.m_pointsVec.length; a++) this.checkForActor(this.m_pointsVec[a][0], this.m_pointsVec[a][1])
};
ShotLaser.prototype.checkForActor = function(a, b) {
	for (var c = 0; c < this.m_actorsRef.length; c++) if (!0 !== this.m_actorsRef[c].isAwaitingDelete()) {
		if ((this.m_actorsRef[c].id() === ActorManager.GENERIC_ENEMY || this.m_actorsRef[c].id() === ActorManager.GENERIC_BOSS) && !this.m_actorsRef[c].isAnimDestroying() && !0 === this.m_actorsRef[c].hitTestPoint(a, b)) {
			this.m_actorsRef[c].reduceHealth(this.m_damage);
			break
		}
		if (this.m_actorsRef[c].id() === ActorManager.GENERIC_PLAYER && !this.m_actorsRef[c].isAnimEnable() && !0 === this.m_actorsRef[c].hitTestPoint(a, b)) this.m_actorsRef[c].onHit(this.m_damage);
		else if (null !== this.m_clipEffect) {
			for (var d = this.m_pointsVec[this.m_pointsVec.length - 2][0], e = this.m_pointsVec[this.m_pointsVec.length - 2][1], f = 0; f < this.m_pointsVec.length; f++) {
				var g = this.m_pointsVec[f][0],
				h = this.m_pointsVec[f][1],
				k = !1;
				g <= ShotLaser.LIMIT_LEFT ? (d = g, k = !0) : g >= ShotLaser.LIMIT_RIGHT && (d = g, k = !0);
				h <= ShotLaser.LIMIT_UP ? (e = h, k = !0) : h >= ShotLaser.LIMIT_DOWN && (e = h, k = !0);
				if (k) {
					this.m_clipEffect.setX(d);
					this.m_clipEffect.setY(e);
					return
				}
			}
			this.m_clipEffect.setX(d);
			this.m_clipEffect.setY(e)
		}
	}
};
ShotLaser.prototype.free = function() {
	this.clearCircle();
	null !== this.m_clipEffect && (this.m_canvas.removeChild(this.m_clipEffect.sprite), this.m_clipEffect = null);
	Application.instance.stopSound("SND_BOSS_BC_LASER");
	ShotLaser.superClass_.free.call(this)
};
function ShotBomb(a, b, c, d, e, f, g) {
	VU_WorldActor.call(this, a, b, c, d, "");
	this.m_initX = c;
	this.m_initY = d;
	this.m_damage = g;
	this.m_rotation = 0;
	this.m_character = null;
	this.m_actorsRef = this.m_world.actorManager().getActors();
	this.m_disableShot = !1;
	this.m_angle = e * Math.PI / 180;
	this.m_speedX = f * Math.cos(this.m_angle);
	this.m_speedY = f * Math.sin(this.m_angle);
	this.m_shotActive = !1;
	this.initCharacter(c, d, a);
	this.m_id = 0;
	this.m_canKillEnemies = !0;
	this.m_deathModeId = 0
}
goog.inherits(ShotBomb, VU_WorldActor);
ShotBomb.ST_NORMAL = "st100";
ShotBomb.ST_DESTROY = "st101";
ShotBomb.LIMIT_LEFT = 20;
ShotBomb.LIMIT_RIGHT = 730;
ShotBomb.LIMIT_UP = 50;
ShotBomb.LIMIT_DOWN = 480;
ShotBomb.EXTRA_DAMAGE = 3;
ShotBomb.prototype.initCharacter = function(a, b, c) {
	this.m_character = new Character(a, b, c);
	this.addStatesCharacter();
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(ShotBomb.ST_NORMAL)
};
ShotBomb.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotBomb.ST_NORMAL, "mcBombEffect_stand");
	this.m_character.addState(ShotBomb.ST_DESTROY, "mcBombEffect_destroy")
};
ShotBomb.prototype.forceRotation = function() {
	this.m_clip.setRotation(180 * this.m_angle / Math.PI)
};
ShotBomb.prototype.gotoState = function(a) {
	ShotBomb.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.forceScale();
	this.forceRotation()
};
ShotBomb.prototype.forceScale = function() {
	this.clip().setScale(1, 1)
};
ShotBomb.prototype.onEndAnimation = function(a) {
	switch (a) {
	case ShotBomb.ST_DESTROY:
		this.m_isAwaitingDelete = !0
	}
};
ShotBomb.prototype.free = function() {
	ShotBomb.superClass_.free.call(this);
	this.m_actorsRef = null
};
ShotBomb.prototype.onHit = function() {
	for (var a = 0; a < this.m_actorsRef.length; a++) ! 0 !== this.m_actorsRef[a].isAwaitingDelete() && ((this.m_actorsRef[a].id() === ActorManager.GENERIC_BOSS && !this.m_actorsRef[a].isAnimDestroying() && this.hitTest(this.m_actorsRef[a]) && this.m_canKillEnemies && this.m_actorsRef[a].onHitBullet(this.m_damage * ShotBomb.EXTRA_DAMAGE, this) && (GameVillains.instance.addEffect("mcBombEffect_burn", this.m_x, this.m_y), this.m_canKillEnemies = !1), this.m_actorsRef[a].id() !== ActorManager.GENERIC_ENEMY && this.m_actorsRef[a].id() !== ActorManager.GENERIC_BREAKABLE || this.m_actorsRef[a].isAnimDestroying() || !this.hitTest(this.m_actorsRef[a]) || !this.m_canKillEnemies) ? this.m_actorsRef[a].id() === ActorManager.GENERIC_PORTAL && this.m_actorsRef[a].isEnableGenerator() && this.hitTest(this.m_actorsRef[a]) && this.m_canKillEnemies ? (GameVillains.instance.addEffect("mcBombEffect_burn", this.m_x, this.m_y), this.m_actorsRef[a].reduceHealth(this.m_damage * ShotBomb.EXTRA_DAMAGE)) : this.m_actorsRef[a].id() === ActorManager.GENERIC_CENTER_ITEM && this.m_actorsRef[a].isAlive() && this.hitTest(this.m_actorsRef[a]) && this.m_canKillEnemies && (GameVillains.instance.addEffect("mcBombEffect_burn", this.m_x, this.m_y), this.m_actorsRef[a].reduceHealth(this.m_damage * ShotBomb.EXTRA_DAMAGE)) : (GameVillains.instance.addEffect("mcBombEffect_burn", this.m_x, this.m_y), this.m_actorsRef[a].id() === ActorManager.GENERIC_ENEMY && this.m_actorsRef[a].setDeathMode(this.m_deathModeId), this.m_actorsRef[a].reduceHealth(this.m_damage * ShotBomb.EXTRA_DAMAGE)))
};
ShotBomb.prototype.rangePosition = function(a, b) {
	if (a < ShotBomb.LIMIT_LEFT || a > ShotBomb.LIMIT_RIGHT) this.gotoState(ShotBomb.ST_DESTROY),
	this.m_shotActive = !0;
	else if (b < ShotBomb.LIMIT_UP || b > ShotBomb.LIMIT_DOWN) this.gotoState(ShotBomb.ST_DESTROY),
	this.m_shotActive = !0
};
ShotBomb.prototype.motionModel = function(a) {
	this.m_x += this.m_speedX * a;
	this.m_y += this.m_speedY * a;
	this.rangePosition(this.m_x, this.m_y)
};
ShotBomb.prototype.update = function(a) {
	this.m_character.update(a);
	ShotBomb.superClass_.update.call(this, a);
	this.m_disableShot || !1 !== this.m_shotActive || this.m_state !== ShotBomb.ST_NORMAL || (this.onHit(), this.motionModel(a));
	this.setDepth(Global.DEPTH_BULLET)
};
function ShotMissile(a, b, c, d, e, f, g, h, k, l) {
	ShotHoming.call(this, a, b, c, d, e, f, g, h, k, l);
	this.m_timeLife = 3500
}
goog.inherits(ShotMissile, ShotHoming);
ShotMissile.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotRegular.ST_NORMAL, "mcMissile_stand");
	this.m_character.addState(ShotRegular.ST_DESTROY, "mcMissile_destroy")
};
ShotMissile.prototype.gotoState = function(a) {
	ShotMissile.superClass_.gotoState.call(this, a);
	this.clip().setScale(0.9, 0.9);
	a === ShotRegular.ST_DESTROY && Application.instance.playSound("SND_BOSS_EXPLOSION2")
};
ShotMissile.prototype.onHit = function() {
	for (var a = 0; a < this.m_actorsRef.length; a++) ! 0 !== this.m_actorsRef[a].isAwaitingDelete() && this.m_actorsRef[a].id() === ActorManager.GENERIC_PLAYER && !this.m_actorsRef[a].isAnimEnable() && this.hitTest(this.m_actorsRef[a]) && (GameVillains.instance.addEffect("mcMissileExplode", this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[a].onHit(this.m_damage))
};
ShotMissile.prototype.motionModel = function(a) {
	var b = Math.atan2(this.m_world.player().y() - this.m_y, this.m_world.player().x() - this.m_x) - this.m_angle,
	b = b + (b < -Math.PI ? 2 * Math.PI: 0),
	b = b - (b > Math.PI ? 2 * Math.PI: 0),
	c = this.m_accelConstant,
	c = Math.abs(b) >= Math.PI / 2 ? -1 * c: c * ( - 1 + 2 * (0.5 * Math.PI - Math.abs(b)) / (0.5 * Math.PI));
	this.m_speed += c * a;
	this.m_speed = this.m_speed > this.m_highThreshold ? this.m_highThreshold: this.m_speed;
	this.m_speed = this.m_speed < this.m_lowThreshold ? this.m_lowThreshold: this.m_speed;
	this.m_angle += this.m_angularSpeed * a * b / this.m_ease;
	this.m_angle += this.m_angle < -Math.PI ? 2 * Math.PI: 0;
	this.m_angle -= this.m_angle > Math.PI ? 2 * Math.PI: 0;
	this.m_x += this.m_speed * a * Math.cos(this.m_angle);
	this.m_y += this.m_speed * a * Math.sin(this.m_angle);
	this.rangePosition(this.m_x, this.m_y);
	this.m_currenTime += a;
	this.m_currenTime >= this.m_timeLife && (GameVillains.instance.addEffect("mcMissileExplode", this.m_x, this.m_y), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0);
	null !== this.m_clip && !1 !== this.m_shotActive || this.m_clip.setRotation(180 * this.m_angle / Math.PI)
};
ShotMissile.prototype.rangePosition = function(a, b) {
	if (a < ShotRegular.LIMIT_LEFT || a > ShotRegular.LIMIT_RIGHT) GameVillains.instance.addEffect("mcMissileExplode", this.m_x, this.m_y),
	this.gotoState(ShotRegular.ST_DESTROY),
	this.m_shotActive = !0;
	else if (b < ShotRegular.LIMIT_UP || b > ShotRegular.LIMIT_DOWN) GameVillains.instance.addEffect("mcMissileExplode", this.m_x, this.m_y),
	this.gotoState(ShotRegular.ST_DESTROY),
	this.m_shotActive = !0
};
ShotMissile.prototype.rotationBullet = function() {};
function ShotLaserShort(a, b, c, d, e, f, g, h, k, l, m, n, p) {
	this.m_typeLaser = p;
	ShotRegular.call(this, a, b, c, d, e, h, k, l, m, n);
	a = Math.atan2(g - e, f - d);
	this.m_endX = d + 700 * Math.cos(a);
	this.m_endY = e + 700 * Math.sin(a);
	this.m_endPosY = this.m_endPosX = 0;
	this.m_movementDisplay = null;
	this.m_showDrawCircle = !1;
	this.m_pointsVec = null
}
goog.inherits(ShotLaserShort, ShotRegular);
ShotLaserShort.REACH_DISTANCE = 60;
ShotLaserShort.prototype.forceScale = function() {};
ShotLaserShort.prototype.drawCircle = function() {
	this.m_showDrawCircle && (this.m_movementDisplay = new SNode, this.m_canvas.addChild(this.m_movementDisplay), this.m_movementDisplay.addDrawListener(this, "onDrawMovement"))
};
ShotLaserShort.prototype.clearCircle = function() {
	null !== this.m_movementDisplay && (this.m_canvas.removeChild(this.m_movementDisplay), this.m_movementDisplay = null)
};
ShotLaserShort.prototype.addStepPoints = function() {
	this.m_pointsVec = null;
	this.validatePointEnd(this.m_x, this.m_y, this.m_endX, this.m_endY);
	this.m_pointsVec = this.calculateStepPoints(this.m_x, this.m_y, this.m_endPosX, this.m_endPosY);
	this.clearCircle();
	this.drawCircle()
};
ShotLaserShort.prototype.onDrawMovement = function(a) {
	for (var b = 0; b < this.m_pointsVec.length; b++) SGraphics.drawCircle(a, this.m_pointsVec[b][0], this.m_pointsVec[b][1], 2, Common.COLOR_RED)
};
ShotLaserShort.prototype.validatePointEnd = function(a, b, c, d) {
	d = Math.atan2(d - b, c - a);
	c = ShotLaserShort.REACH_DISTANCE * Math.cos(d);
	d = ShotLaserShort.REACH_DISTANCE * Math.sin(d);
	this.m_endPosX = a + c;
	this.m_endPosY = b + d
};
ShotLaserShort.prototype.forceRotation = function() {
	this.m_clip.setRotation(180 * this.m_angle / Math.PI)
};
ShotLaserShort.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotRegular.ST_NORMAL, "mcLaserShort0" + this.m_typeLaser + "_stand");
	this.m_character.addState(ShotRegular.ST_DESTROY, "mcLaserShort0" + this.m_typeLaser + "_destroy")
};
ShotLaserShort.prototype.rotationBullet = function() {};
ShotLaserShort.prototype.motionModel = function(a) {
	this.m_x += this.m_speedX * a;
	this.m_y += this.m_speedY * a;
	this.rangePosition(this.m_x, this.m_y);
	Common.distance(this.m_initX, this.m_initY, this.m_x, this.m_y);
	this.addStepPoints()
};
ShotLaserShort.prototype.calculateStepPoints = function(a, b, c, d) {
	for (var e = c - a,
	f = d - b,
	g = Math.sqrt(e * e + f * f), h = Math.floor(g / 10), k = [], l = 0; l < h; l++) k.push([a + 10 * (e / g) * l, b + 10 * (f / g) * l]);
	k.push([c, d]);
	return k
};
ShotLaserShort.prototype.onHit = function() {
	if (null !== this.m_pointsVec) for (var a = 0; a < this.m_pointsVec.length; a++) this.checkForActor(this.m_pointsVec[a][0], this.m_pointsVec[a][1])
};
ShotLaserShort.prototype.checkForActor = function(a, b) {
	for (var c = 0; c < this.m_actorsRef.length; c++) ! 0 !== this.m_actorsRef[c].isAwaitingDelete() && this.m_actorsRef[c].id() === ActorManager.GENERIC_PLAYER && !this.m_actorsRef[c].isAnimEnable() && !0 === this.m_actorsRef[c].hitTestPoint(a, b) && this.m_canKillEnemies && (GameVillains.instance.addEffect("mcHitPlayerHard", a, b), this.gotoState(ShotRegular.ST_DESTROY), this.m_shotActive = !0, this.m_actorsRef[c].onHit(this.m_damage), this.m_canKillEnemies = !1)
};
ShotLaserShort.prototype.free = function() {
	this.clearCircle();
	ShotLaserShort.superClass_.free.call(this)
};
function Bomb(a, b, c, d) {
	VU_WorldActor.call(this, a, b, c, d);
	this.m_linearMove = null;
	this.m_idPlayer = PlayerGame.instance.idPlayer();
	this.m_damage = 100;
	this.m_activeBomb = this.m_activeAlert = !1;
	this.m_actorsRef = this.m_world.actorManager().getActors();
	this.m_timeAlert = 500;
	this.m_action = Bomb.ACT_NORMAL;
	this.m_character = new Character(c, d, a);
	this.m_character.addState(Bomb.ST_NORMAL, "mcBullet_" + this.m_idPlayer + "_bomb_stand");
	this.m_character.addState(Bomb.ST_ALERT, "mcBullet_" + this.m_idPlayer + "_bomb_alert");
	this.m_character.addState(Bomb.ST_DESTROY, "mcBullet_" + this.m_idPlayer + "_bomb_destroy");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(Bomb.ST_NORMAL);
	this.updateBounds()
}
goog.inherits(Bomb, VU_WorldActor);
Bomb.TIME_ALERT = 1500;
Bomb.ACT_NORMAL = 10;
Bomb.ACT_ALERT = 20;
Bomb.ACT_DESTROY = 30;
Bomb.ST_NORMAL = "st1";
Bomb.ST_ALERT = "st2";
Bomb.ST_DESTROY = "st3";
Bomb.prototype.onEndAnimation = function(a) {
	switch (a) {
	case Bomb.ST_DESTROY:
		this.m_isAwaitingDelete = !0
	}
};
Bomb.prototype.gotoState = function(a) {
	Bomb.superClass_.gotoState.call(this, a);
	this.updateBounds()
};
Bomb.prototype.free = function() {
	Bomb.superClass_.free.call(this);
	this.m_actorsRef = null
};
Bomb.prototype.update = function(a) {
	this.m_character.update(a);
	Bomb.superClass_.update.call(this, a);
	switch (this.m_action) {
	case Bomb.ACT_NORMAL:
		this.m_timeAlert -= a;
		0 >= this.m_timeAlert && (this.m_timeAlert = Bomb.TIME_ALERT, this.gotoState(Bomb.ST_ALERT), this.m_action = Bomb.ACT_ALERT);
		break;
	case Bomb.ACT_ALERT:
		this.m_timeAlert -= a;
		if (0 >= this.m_timeAlert) for (this.m_timeAlert = Bomb.TIME_ALERT, this.gotoState(Bomb.ST_DESTROY), this.m_action = Bomb.ACT_DESTROY, this.setDepth(Global.DEPTH_EFFECT), Application.instance.playSound("SND_BOMB_EXPLOSION"), GameVillains.instance.addEffect("mcBombCenter", this.m_x, this.m_y), a = 0; 4 > a; a++) GameVillains.instance.addShotBomb(90 * a, this.m_x, this.m_y);
		break;
	case Bomb.ACT_DESTROY:
		if (!this.m_activeBomb) this.onHit()
	}
};
Bomb.prototype.onHit = function() {
	for (var a = 0; a < this.m_actorsRef.length; a++) ! 0 !== this.m_actorsRef[a].isAwaitingDelete() && ((this.m_actorsRef[a].id() === ActorManager.GENERIC_BOSS && !this.m_actorsRef[a].isAnimDestroying() && this.hitTest(this.m_actorsRef[a]) && this.m_canKillEnemies && (this.m_actorsRef[a].onHitBullet(this.m_damage, this) ? this.m_canKillEnemies = !1 : GameVillains.instance.addEffect("mcHitShieldBoss", this.m_x, this.m_y)), this.m_actorsRef[a].id() !== ActorManager.GENERIC_ENEMY && this.m_actorsRef[a].id() !== ActorManager.GENERIC_BREAKABLE || this.m_actorsRef[a].isAnimDestroying() || !this.hitTest(this.m_actorsRef[a]) || !this.m_canKillEnemies) ? this.m_actorsRef[a].id() === ActorManager.GENERIC_PORTAL && this.m_actorsRef[a].isEnableGenerator() && this.hitTest(this.m_actorsRef[a]) && this.m_canKillEnemies ? (this.m_actorsRef[a].reduceHealth(this.m_damage), this.m_canKillEnemies = !1) : this.m_actorsRef[a].id() === ActorManager.GENERIC_CENTER_ITEM && this.m_actorsRef[a].isAlive() && this.hitTest(this.m_actorsRef[a]) && this.m_canKillEnemies && (this.m_actorsRef[a].reduceHealth(this.m_damage), this.m_canKillEnemies = !1) : (this.m_actorsRef[a].reduceHealth(this.m_damage), this.m_canKillEnemies = !1))
};
function ShotBouncing(a, b, c, d, e, f, g, h, k, l) {
	ShotRegular.call(this, a, b, c, d, e, f, g, h, k, l);
	this.m_alpha = 1;
	this.m_timeLife = 2E3;
	this.m_currenTime = 0;
	this.m_deathModeId = 1
}
goog.inherits(ShotBouncing, ShotRegular);
ShotBouncing.prototype.addStatesCharacter = function() {
	this.m_character.addState(ShotRegular.ST_NORMAL, "mcBullet_" + this.m_idPlayer + "_bouncing_stand");
	this.m_character.addState(ShotRegular.ST_DESTROY, "mcBullet_" + this.m_idPlayer + "_bouncing_destroy")
};
ShotBouncing.prototype.motionModel = function(a) {
	if (this.m_x < ShotRegular.LIMIT_LEFT || this.m_x > ShotRegular.LIMIT_RIGHT) this.m_speedX *= -1,
	this.m_x = this.m_x > ShotRegular.LIMIT_RIGHT ? ShotRegular.LIMIT_RIGHT: ShotRegular.LIMIT_LEFT;
	if (this.m_y < ShotRegular.LIMIT_UP || this.m_y > ShotRegular.LIMIT_DOWN) this.m_speedY *= -1,
	this.m_y = this.m_y > ShotRegular.LIMIT_DOWN ? ShotRegular.LIMIT_DOWN: ShotRegular.LIMIT_UP;
	this.m_x += this.m_speedX * a;
	this.m_y += this.m_speedY * a;
	this.m_currenTime += a;
	this.m_currenTime >= this.m_timeLife && (this.m_alpha -= 0.04, 0 >= this.m_alpha ? (this.m_clip.setAlpha(0), this.m_shotActive = this.m_isAwaitingDelete = !0) : this.m_clip.setAlpha(this.m_alpha))
};
function Randy(a, b, c, d, e) {
	PlayerGame.call(this, a, b, c, d, e);
	this.m_idPlayer = this.m_namePlayer = "randy";
	this.m_offSetY_Shield = 10
}
goog.inherits(Randy, PlayerGame);
Randy.prototype.chargeCharacter = function(a, b) {
	this.m_character = new Character(a, b, this.m_canvas);
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_RIGHT, "mcRandy_stand_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_DOWN, "mcRandy_stand_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_LEFT, "mcRandy_stand_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_UP, "mcRandy_stand_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_RIGHT, "mcRandy_walk_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_DOWN, "mcRandy_walk_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_LEFT, "mcRandy_walk_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_UP, "mcRandy_walk_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_RIGHT, "mcRandy_attack_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_DOWN, "mcRandy_attack_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_LEFT, "mcRandy_attack_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_UP, "mcRandy_attack_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_HIT, "mcRandy_hit");
	this.m_character.addState(PlayerGame.ST_PLAYER_WIN, "mcRandy_win");
	this.m_character.addState(PlayerGame.ST_PLAYER_APPEAR, "mcRandy_appear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DISAPPEAR, "mcRandy_disappear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DESTROYED, "mcRandy_defeat");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT, "mcRandy_attack_right_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN, "mcRandy_attack_down_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT, "mcRandy_attack_left_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_UP, "mcRandy_attack_up_run");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(PlayerGame.ST_PLAYER_STAND_UP);
	this.m_winAnimationCount = 0;
	this.m_maxWinAnimationCount = 3
};
Randy.prototype.onEndAnimation = function(a) {
	Randy.superClass_.onEndAnimation.call(this, a);
	switch (a) {
	case PlayerGame.ST_PLAYER_APPEAR:
		this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT);
		break;
	case PlayerGame.ST_PLAYER_WIN:
		this.m_winAnimationCount++,
		this.m_winAnimationCount >= this.m_maxWinAnimationCount && (this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN), this.setKeyboardEnabled(!0), this.m_winAnimationCount = 0, 0 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.openAllDoors(), 13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && (Global.game.gotoEndGame = !0))
	}
};
Randy.prototype.gotoState = function(a) {
	Randy.superClass_.gotoState.call(this, a);
	a = !1;
	var b = 0,
	c = 0;
	switch (this.m_state) {
	case PlayerGame.ST_PLAYER_APPEAR:
	case PlayerGame.ST_PLAYER_DISAPPEAR:
		Application.instance.playSound("SND_BOSS_EXPLOSION2");
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_ATTACK_RIGHT:
		b = this.m_x + 30;
		c = this.m_y - 40;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_ATTACK_DOWN:
		b = this.m_x;
		c = this.m_y + 5;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_ATTACK_LEFT:
		b = this.m_x - 30;
		c = this.m_y - 40;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_UP:
	case PlayerGame.ST_PLAYER_ATTACK_UP:
		b = this.m_x,
		c = this.m_y - 100,
		a = !0
	}
	a && this.shootPlayer(b, c, "SND_RANDY_SHOT")
};
function Dipper(a, b, c, d, e, f) {
	this.m_skinPlayer = f;
	PlayerGame.call(this, a, b, c, d, e);
	this.m_idPlayer = "dipper";
	this.m_offSetY_Shield = 17;
	this.m_winAnimationCount = 0;
	this.m_maxWinAnimationCount = 3
}
goog.inherits(Dipper, PlayerGame);
Dipper.prototype.chargeCharacter = function(a, b) {
	this.m_character = new Character(a, b, this.m_canvas);
	this.chargeAnimation(this.m_skinPlayer);
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(PlayerGame.ST_PLAYER_STAND_UP)
};
Dipper.prototype.onEndAnimation = function(a) {
	Dipper.superClass_.onEndAnimation.call(this, a);
	switch (a) {
	case PlayerGame.ST_PLAYER_APPEAR:
		this.m_isKeyPress ? this.gotoState(this.m_oldState) : this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT);
		break;
	case PlayerGame.ST_PLAYER_WIN:
		this.m_winAnimationCount++,
		this.m_winAnimationCount >= this.m_maxWinAnimationCount && (this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN), this.setKeyboardEnabled(!0), this.m_winAnimationCount = 0, 0 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.openAllDoors(), 13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && (Global.game.gotoEndGame = !0))
	}
};
Dipper.prototype.chargeAnimation = function(a) {
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_RIGHT, "mc" + a + "_stand_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_DOWN, "mc" + a + "_stand_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_LEFT, "mc" + a + "_stand_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_UP, "mc" + a + "_stand_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_RIGHT, "mc" + a + "_walk_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_DOWN, "mc" + a + "_walk_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_LEFT, "mc" + a + "_walk_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_UP, "mc" + a + "_walk_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_RIGHT, "mc" + a + "_attack_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_DOWN, "mc" + a + "_attack_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_LEFT, "mc" + a + "_attack_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_UP, "mc" + a + "_attack_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_WIN, "mc" + a + "_win");
	this.m_character.addState(PlayerGame.ST_PLAYER_HIT, "mc" + a + "_hit");
	this.m_character.addState(PlayerGame.ST_PLAYER_APPEAR, "mc" + a + "_appear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DISAPPEAR, "mc" + a + "_disappear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DESTROYED, "mc" + a + "_defeat");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT, "mc" + a + "_attack_right_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN, "mc" + a + "_attack_down_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT, "mc" + a + "_attack_left_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_UP, "mc" + a + "_attack_up_run")
};
Dipper.prototype.gotoState = function(a) {
	Dipper.superClass_.gotoState.call(this, a);
	a = !1;
	var b = 0,
	c = 0;
	switch (this.m_state) {
	case PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_ATTACK_RIGHT:
		b = this.m_x;
		c = this.m_y - 30;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_ATTACK_DOWN:
		b = this.m_x;
		c = this.m_y - 10;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_ATTACK_LEFT:
		b = this.m_x;
		c = this.m_y - 30;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_UP:
	case PlayerGame.ST_PLAYER_ATTACK_UP:
		b = this.m_x,
		c = this.m_y - 40,
		a = !0
	}
	a && this.shootPlayer(b, c, "SND_DIPPER_THROW")
};
function Wander(a, b, c, d, e) {
	PlayerGame.call(this, a, b, c, d, e);
	this.m_idPlayer = this.m_namePlayer = "wander";
	this.m_offSetY_Shield = 10
}
goog.inherits(Wander, PlayerGame);
Wander.prototype.chargeCharacter = function(a, b) {
	this.m_character = new Character(a, b, this.m_canvas);
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_RIGHT, "mcWander_stand_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_DOWN, "mcWander_stand_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_LEFT, "mcWander_stand_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_UP, "mcWander_stand_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_RIGHT, "mcWander_walk_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_DOWN, "mcWander_walk_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_LEFT, "mcWander_walk_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_UP, "mcWander_walk_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_RIGHT, "mcWander_attack_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_DOWN, "mcWander_attack_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_LEFT, "mcWander_attack_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_UP, "mcWander_attack_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_HIT, "mcWander_hit");
	this.m_character.addState(PlayerGame.ST_PLAYER_WIN, "mcWander_win");
	this.m_character.addState(PlayerGame.ST_PLAYER_APPEAR, "mcWander_appear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DISAPPEAR, "mcWander_disappear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DESTROYED, "mcWander_defeat");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT, "mcWander_attack_right_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN, "mcWander_attack_down_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT, "mcWander_attack_left_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_UP, "mcWander_attack_up_run");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(PlayerGame.ST_PLAYER_STAND_UP);
	this.m_winAnimationCount = 0;
	this.m_maxWinAnimationCount = 3
};
Wander.prototype.onEndAnimation = function(a) {
	Wander.superClass_.onEndAnimation.call(this, a);
	switch (a) {
	case PlayerGame.ST_PLAYER_APPEAR:
		this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT);
		break;
	case PlayerGame.ST_PLAYER_WIN:
		this.m_winAnimationCount++,
		this.m_winAnimationCount >= this.m_maxWinAnimationCount && (this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN), this.setKeyboardEnabled(!0), this.m_winAnimationCount = 0, 0 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.openAllDoors(), 13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && (Global.game.gotoEndGame = !0))
	}
};
Wander.prototype.gotoState = function(a) {
	Wander.superClass_.gotoState.call(this, a);
	a = !1;
	var b = 0,
	c = 0;
	switch (this.m_state) {
	case PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_ATTACK_RIGHT:
		b = this.m_x + 10;
		c = this.m_y - 50;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_ATTACK_DOWN:
		b = this.m_x - 20;
		c = this.m_y - 20;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_ATTACK_LEFT:
		b = this.m_x - 10;
		c = this.m_y - 50;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_UP:
	case PlayerGame.ST_PLAYER_ATTACK_UP:
		b = this.m_x + 20,
		c = this.m_y - 50,
		a = !0
	}
	a && this.shootPlayer(b, c, "SND_WANDER_SHOT")
};
function AgentP(a, b, c, d, e) {
	PlayerGame.call(this, a, b, c, d, e);
	this.m_idPlayer = this.m_namePlayer = "agentP";
	this.m_offSetY_Shield = 22
}
goog.inherits(AgentP, PlayerGame);
AgentP.prototype.chargeCharacter = function(a, b) {
	this.m_character = new Character(a, b, this.m_canvas);
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_RIGHT, "mcAgentP_stand_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_DOWN, "mcAgentP_stand_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_LEFT, "mcAgentP_stand_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_STAND_UP, "mcAgentP_stand_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_RIGHT, "mcAgentP_walk_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_DOWN, "mcAgentP_walk_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_LEFT, "mcAgentP_walk_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_UP, "mcAgentP_walk_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_RIGHT, "mcAgentP_attack_right");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_DOWN, "mcAgentP_attack_down");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_LEFT, "mcAgentP_attack_left");
	this.m_character.addState(PlayerGame.ST_PLAYER_ATTACK_UP, "mcAgentP_attack_up");
	this.m_character.addState(PlayerGame.ST_PLAYER_HIT, "mcAgentP_hit");
	this.m_character.addState(PlayerGame.ST_PLAYER_WIN, "mcAgentP_win");
	this.m_character.addState(PlayerGame.ST_PLAYER_APPEAR, "mcAgentP_appear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DISAPPEAR, "mcAgentP_disappear");
	this.m_character.addState(PlayerGame.ST_PLAYER_DESTROYED, "mcAgentP_defeat");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT, "mcAgentP_attack_right_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN, "mcAgentP_attack_down_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT, "mcAgentP_attack_left_run");
	this.m_character.addState(PlayerGame.ST_PLAYER_WALK_ATTACK_UP, "mcAgentP_attack_up_run");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(PlayerGame.ST_PLAYER_STAND_UP);
	this.m_winAnimationCount = 0;
	this.m_maxWinAnimationCount = 3
};
AgentP.prototype.onEndAnimation = function(a) {
	AgentP.superClass_.onEndAnimation.call(this, a);
	switch (a) {
	case PlayerGame.ST_PLAYER_APPEAR:
		this.gotoState(PlayerGame.ST_PLAYER_STAND_RIGHT);
		break;
	case PlayerGame.ST_PLAYER_WIN:
		this.m_winAnimationCount++,
		this.m_winAnimationCount >= this.m_maxWinAnimationCount && (this.gotoState(PlayerGame.ST_PLAYER_STAND_DOWN), this.setKeyboardEnabled(!0), this.m_winAnimationCount = 0, 0 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.openAllDoors(), 13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && (Global.game.gotoEndGame = !0))
	}
};
AgentP.prototype.gotoState = function(a) {
	AgentP.superClass_.gotoState.call(this, a);
	a = !1;
	var b = 0,
	c = 0;
	switch (this.m_state) {
	case PlayerGame.ST_PLAYER_WALK_ATTACK_RIGHT:
	case PlayerGame.ST_PLAYER_ATTACK_RIGHT:
		b = this.m_x + 50;
		c = this.m_y - 30;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_DOWN:
	case PlayerGame.ST_PLAYER_ATTACK_DOWN:
		b = this.m_x - 10;
		c = this.m_y - 25;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_LEFT:
	case PlayerGame.ST_PLAYER_ATTACK_LEFT:
		b = this.m_x - 50;
		c = this.m_y - 30;
		a = !0;
		break;
	case PlayerGame.ST_PLAYER_WALK_ATTACK_UP:
	case PlayerGame.ST_PLAYER_ATTACK_UP:
		b = this.m_x + 10,
		c = this.m_y - 30,
		a = !0
	}
	a && this.shootPlayer(b, c, "SND_AGENTP_SHOT")
};
function BasePlayerAction(a, b, c) {
	this.m_player = a;
	this.m_player.setKeyboardEnabled(!1);
	this.m_actionState = BasePlayerAction.ST_ACTION_INIT;
	this.m_baseState = BasePlayerAction.ST_BASE_INIT;
	this.m_startupDelay = 0;
	this.m_isPaused = !1;
	this.m_directionY = this.m_goalY = this.m_directionX = this.m_goalX = 0;
	this.m_speed = Application.config.settings.playerEnterSpeed;
	this.m_savedParams = [];
	a = Math.sqrt((this.m_player.x() - b) * (this.m_player.x() - b) + (this.m_player.y() - c) * (this.m_player.y() - c));
	this.setGoal(b, c, a);
	this.isDone = !1
}
BasePlayerAction.ST_ACTION_NONE = 0;
BasePlayerAction.ST_ACTION_INIT = 1;
BasePlayerAction.ST_ACTION_GOTOSTARTSPOT = 2;
BasePlayerAction.ST_ACTION_WAITING = 3;
BasePlayerAction.ST_ACTION_ATTACK = 4;
BasePlayerAction.ST_ACTION_MOVE_LINEAR = 5;
BasePlayerAction.ST_ACTION_MOVE_CIRCULAR = 6;
BasePlayerAction.ST_ACTION_DESTRUCTION = 100;
BasePlayerAction.ST_BASE_INIT = 1;
BasePlayerAction.ST_BASE_STARTING = 2;
BasePlayerAction.ST_BASE_PROGRESS = 3;
BasePlayerAction.prototype.startAction = function(a) {
	this.m_startupDelay = a;
	0 < this.m_startupDelay ? this.m_baseState = BasePlayerAction.ST_BASE_STARTING: (this.m_baseState = BasePlayerAction.ST_BASE_PROGRESS, this.onActionStarted())
};
BasePlayerAction.prototype.onActionStarted = function() {
	this.m_actionState = BasePlayerAction.ST_ACTION_GOTOSTARTSPOT
};
BasePlayerAction.prototype.update = function(a) {
	this.m_actionState === BasePlayerAction.ST_ACTION_GOTOSTARTSPOT && this.gotoSpot(a)
};
BasePlayerAction.prototype.baseUpdate = function(a) {
	if (this.m_baseState !== BasePlayerAction.ST_BASE_INIT) switch (this.m_baseState) {
	case BasePlayerAction.ST_BASE_STARTING:
		this.m_startupDelay -= a;
		0 >= this.m_startupDelay && (this.m_baseState = BasePlayerAction.ST_BASE_PROGRESS, this.onActionStarted());
		break;
	case BasePlayerAction.ST_BASE_PROGRESS:
		this.update(a)
	}
};
BasePlayerAction.prototype.gotoSpot = function(a) {
	this.walkState();
	var b = this.m_player.x() + a * this.m_speed * this.m_directionX;
	a = this.m_player.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_player.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_player.y()) * this.m_directionY || 0 === this.m_directionY) ? this.m_player.setPosition(b, a) : (this.standState(), this.isDone || (GameVillains.instance.centerItem().gotoState(CenterItem.ST_CAMERA_APPEAR), this.isDone = !0))
};
BasePlayerAction.prototype.walkState = function() {
	var a = 0 < this.m_directionX ? PlayerGame.ST_PLAYER_WALK_RIGHT: PlayerGame.ST_PLAYER_WALK_LEFT,
	b = 0 < this.m_directionY ? PlayerGame.ST_PLAYER_WALK_DOWN: PlayerGame.ST_PLAYER_WALK_UP,
	a = Math.abs(this.m_directionX) > Math.abs(this.m_directionY) ? a: b;
	this.m_player.gotoState(a)
};
BasePlayerAction.prototype.standState = function() {
	var a = 375 < this.m_player.x() ? PlayerGame.ST_PLAYER_STAND_LEFT: PlayerGame.ST_PLAYER_STAND_RIGHT,
	b = 300 < this.m_player.y() ? PlayerGame.ST_PLAYER_STAND_UP: PlayerGame.ST_PLAYER_STAND_DOWN,
	a = Math.abs(this.m_player.x() - 375) > Math.abs(this.m_player.y() - 300) ? a: b;
	this.m_player.gotoState(a)
};
BasePlayerAction.prototype.free = function() {
	this.m_player = null
};
BasePlayerAction.prototype.setGoal = function(a, b, c) {
	this.m_goalX = a;
	this.m_goalY = b;
	this.m_directionX = (a - this.m_player.x()) / c;
	this.m_directionY = (b - this.m_player.y()) / c
};
function PlayerEnterAction(a, b, c, d, e) {
	BasePlayerAction.call(this, a, c, d);
	this.m_isWalkingIn = b;
	this.m_nextRoom = e
}
goog.inherits(PlayerEnterAction, BasePlayerAction);
PlayerEnterAction.prototype.onActionStarted = function() {
	PlayerEnterAction.superClass_.onActionStarted.call(this);
	GameVillains.instance.usedDoors.push(GameVillains.instance.findDoor(this.m_player.x(), this.m_player.y()));
	this.m_isWalkingIn && GameVillains.instance.openDoors(!0)
};
PlayerEnterAction.prototype.update = function(a) {
	PlayerEnterAction.superClass_.update.call(this, a)
};
PlayerEnterAction.prototype.gotoSpot = function(a) {
	this.walkState();
	var b = this.m_player.x() + a * this.m_speed * this.m_directionX;
	a = this.m_player.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_player.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_player.y()) * this.m_directionY || 0 === this.m_directionY) ? this.m_player.setPosition(b, a) : (this.standState(), this.m_isWalkingIn ? 1 !== Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]] && 8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? (GameVillains.instance.hideCenterItem(!0), this.m_player.releaseAction(!0)) : 1 !== Global.savedNumData[Global.INDEX_PASSED_ROOM_0 + Global.savedNumData[Global.INDEX_CURRENT_ROOM]] && 8 < Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? (this.m_player.releaseAction(!0), PlayerGame.instance.setKeyboardEnabled(!1)) : this.m_player.releaseAction(!1) : (Global.savedNumData[Global.INDEX_CURRENT_ROOM] = this.m_nextRoom, Global.savedNumData[Global.INDEX_CURRENT_HP] = PlayerGame.instance.getHealth(), Global.savedNumData[Global.INDEX_CURRENT_WEAPON] = this.m_player.typeWeapon(), Global.savedNumData[Global.INDEX_CURRENT_MP] = this.m_player.typeWeapon() !== ShotHandler.REGULAR ? this.m_player.world().shotHandler().playerAmmo() : 0, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)), GuiManager.instance.gotoScreen(GuiManager.SC_GAME)))
};
PlayerEnterAction.prototype.walkState = function() {
	var a = "";
	switch (Global.savedNumData[Global.INDEX_ENTER_ROOM_FROM]) {
	case 1:
		a = PlayerGame.ST_PLAYER_WALK_LEFT;
		break;
	case 2:
		a = PlayerGame.ST_PLAYER_WALK_RIGHT;
		break;
	case 3:
		a = PlayerGame.ST_PLAYER_WALK_DOWN;
		break;
	case 4:
		a = PlayerGame.ST_PLAYER_WALK_UP
	}
	this.m_player.gotoState(a)
};
PlayerEnterAction.prototype.free = function() {
	PlayerEnterAction.superClass_.free.call(this);
	this.m_savedParams = null
};
PlayerEnterAction.prototype.setGoal = function(a, b, c) {
	this.m_goalX = a;
	this.m_goalY = b;
	this.m_directionX = (a - this.m_player.x()) / c;
	this.m_directionY = (b - this.m_player.y()) / c
};
function BKBasic(a, b, c, d, e, f, g, h, k) {
	VU_WorldActor.call(this, a, b, c, d, "", f);
	this.m_skin = e;
	this.m_nameItem = g;
	this.m_health = h;
	this.m_character = null;
	this.m_id = f;
	this.idBreak = Global.savedNumData[Global.INDEX_CURRENT_ROOM] - 1 + "_" + k;
	this.initCharacter(a)
}
goog.inherits(BKBasic, VU_WorldActor);
BKBasic.BREAKABLE_DATA = [];
BKBasic.ST_BREAKABLE_BREAK = "st100";
BKBasic.ST_BREAKABLE_STAND = "st101";
BKBasic.ST_BREAKABLE_HIT = "st102";
BKBasic.ST_BREAKABLE_APPEAR = "st103";
BKBasic.prototype.initCharacter = function(a) {
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(BKBasic.ST_BREAKABLE_STAND, this.m_skin + "_stand");
	this.m_character.addState(BKBasic.ST_BREAKABLE_BREAK, this.m_skin + "_break");
	this.m_character.addState(BKBasic.ST_BREAKABLE_HIT, this.m_skin + "_hit");
	this.m_character.addState(BKBasic.ST_BREAKABLE_APPEAR, "mcSmokebomb");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? BKBasic.ST_BREAKABLE_APPEAR: BKBasic.ST_BREAKABLE_STAND)
};
BKBasic.prototype.isAnimDestroying = function() {
	return this.m_state === BKBasic.ST_BREAKABLE_BREAK
};
BKBasic.prototype.onEndAnimation = function(a) {
	switch (a) {
	case BKBasic.ST_BREAKABLE_APPEAR:
		this.gotoState(BKBasic.ST_BREAKABLE_STAND);
		break;
	case BKBasic.ST_BREAKABLE_BREAK:
		BKBasic.BREAKABLE_DATA[this.idBreak] = 0;
		GameVillains.instance.addForceItem(this.m_x, this.m_y, this.m_nameItem);
		this.m_isAwaitingDelete = !0;
		break;
	case BKBasic.ST_BREAKABLE_HIT:
		this.gotoState(BKBasic.ST_BREAKABLE_STAND)
	}
};
BKBasic.prototype.update = function(a) {
	this.m_character.update(a);
	BKBasic.superClass_.update.call(this, a);
	this.onHit()
};
BKBasic.prototype.gotoState = function(a) {
	BKBasic.superClass_.gotoState.call(this, a);
	this.updateBounds()
};
BKBasic.prototype.reduceHealth = function(a) {
	this.isAnimDestroying() || (this.m_health -= a, 0 >= this.m_health ? (Application.instance.playSound("SND_SCENERY_TELEPORTER_COLLAPSES2"), this.gotoState(BKBasic.ST_BREAKABLE_BREAK)) : (Application.instance.playSound("SND_SCENERY_GARBAGE_CAN_HIT2"), this.gotoState(BKBasic.ST_BREAKABLE_HIT)))
};
BKBasic.prototype.onHit = function() {
	this.hitTest(PlayerGame.instance) && 18 >= Math.abs(this.m_y - PlayerGame.instance.y()) && this.applyImpulse()
};
BKBasic.prototype.applyImpulse = function() {
	PlayerGame.instance.state() !== PlayerGame.ST_PLAYER_DESTROYED && (this.m_y > PlayerGame.instance.y() ? PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() - 10) : PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() + 10))
};
function HazardSpike(a, b, c, d, e, f) {
	VU_WorldActor.call(this, a, b, d, e, "", c);
	this.m_skin = f;
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(HazardSpike.ST_HAZARD_STAND, this.m_skin + "_stand");
	this.m_character.addState(HazardSpike.ST_HAZARD_APPEAR, this.m_skin + "_hide_up");
	this.m_character.addState(HazardSpike.ST_HAZARD_HIDDEN, this.m_skin + "_hide_stand");
	this.m_character.addState(HazardSpike.ST_HAZARD_HIDE, this.m_skin + "_hide_down");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_damage = Application.config.settings.damageSpikes;
	this.m_cooldownUp = Application.config.settings.cooldownSpikesUp;
	this.m_cooldownDown = Application.config.settings.cooldownSpikesDown;
	this.m_alwaysUp = 1 === Application.config.settings.spikesAlwaysUp;
	this.m_actionTimer = this.m_cooldownDown;
	this.m_up = !0;
	this.gotoState(HazardSpike.ST_HAZARD_HIDDEN)
}
goog.inherits(HazardSpike, VU_WorldActor);
HazardSpike.ST_HAZARD_STAND = "st100";
HazardSpike.ST_HAZARD_APPEAR = "st101";
HazardSpike.ST_HAZARD_HIDDEN = "st102";
HazardSpike.ST_HAZARD_HIDE = "st103";
HazardSpike.prototype.onEndAnimation = function(a) {
	switch (a) {
	case HazardSpike.ST_HAZARD_STAND:
		this.gotoState(HazardSpike.ST_HAZARD_STAND);
		break;
	case HazardSpike.ST_HAZARD_HIDE:
		this.gotoState(HazardSpike.ST_HAZARD_HIDDEN);
		this.m_actionTimer = this.m_cooldownDown;
		break;
	case HazardSpike.ST_HAZARD_HIDDEN:
		this.gotoState(HazardSpike.ST_HAZARD_HIDDEN);
		break;
	case HazardSpike.ST_HAZARD_APPEAR:
		this.gotoState(HazardSpike.ST_HAZARD_STAND),
		this.m_actionTimer = this.m_cooldownUp
	}
};
HazardSpike.prototype.gotoState = function(a) {
	HazardSpike.superClass_.gotoState.call(this, a);
	this.updateBounds()
};
HazardSpike.prototype.update = function(a) {
	this.m_character.update(a);
	if (this.m_state !== HazardSpike.ST_HAZARD_HIDDEN) this.onHit();
	10 !== Global.savedNumData[Global.INDEX_CURRENT_ROOM] && 0 < this.m_actionTimer && !this.m_alwaysUp && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = 0, this.gotoState(this.m_up ? HazardSpike.ST_HAZARD_HIDE: HazardSpike.ST_HAZARD_APPEAR), this.m_up = !this.m_up));
	HazardSpike.superClass_.update.call(this, a)
};
HazardSpike.prototype.applyImpulse = function() {
	PlayerGame.instance.state() !== PlayerGame.ST_PLAYER_DESTROYED && (this.m_y > PlayerGame.instance.y() ? PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() - 20) : PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() + 20))
};
HazardSpike.prototype.onHit = function() {
	this.hitTest(PlayerGame.instance) && 10 >= Math.abs(this.m_y - PlayerGame.instance.y()) && (PlayerGame.instance.onHit(this.m_damage), PlayerGame.instance.isInvulnerable() || this.applyImpulse())
};
function HazardWaste(a, b, c, d, e, f) {
	VU_WorldActor.call(this, a, b, d, e, "", c);
	this.m_skin = f;
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(HazardWaste.ST_HAZARD_STAND, this.m_skin + "_pool");
	this.m_character.addState(HazardWaste.ST_HAZARD_APPEAR, "mcSmokebomb");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_damage = Application.config.settings.damageWaste;
	this.gotoState(13 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? HazardWaste.ST_HAZARD_APPEAR: HazardWaste.ST_HAZARD_STAND)
}
goog.inherits(HazardWaste, VU_WorldActor);
HazardWaste.ST_HAZARD_STAND = "st100";
HazardWaste.ST_HAZARD_APPEAR = "st101";
HazardWaste.prototype.gotoState = function(a) {
	HazardWaste.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.clip().setLoop(!0)
};
HazardWaste.prototype.onEndAnimation = function(a) {
	switch (a) {
	case HazardWaste.ST_HAZARD_APPEAR:
		this.gotoState(HazardWaste.ST_HAZARD_STAND)
	}
};
HazardWaste.prototype.update = function(a) {
	this.m_character.update(a);
	this.onHit();
	HazardWaste.superClass_.update.call(this, a)
};
HazardWaste.prototype.applyImpulse = function() {
	PlayerGame.instance.state() !== PlayerGame.ST_PLAYER_DESTROYED && (this.m_y > PlayerGame.instance.y() ? PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() - 30) : PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() + 30))
};
HazardWaste.prototype.onHit = function() {
	this.hitTest(PlayerGame.instance) && 18 >= Math.abs(this.m_y - PlayerGame.instance.y()) && (PlayerGame.instance.onHit(this.m_damage), this.applyImpulse())
};
function BillCipherTrap(a, b, c, d, e) {
	VU_WorldActor.call(this, a, b, d, e, "", c);
	this.m_skin = "mcBoss5";
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(BillCipherTrap.ST_HAZARD_STAND, this.m_skin + "_mine_stand");
	this.m_character.addState(BillCipherTrap.ST_HAZARD_ALERT, this.m_skin + "_mine_alert");
	this.m_character.addState(BillCipherTrap.ST_HAZARD_EXPLODE, "mcSmokebomb");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_damage = Application.config.settings.billcipherTrapDamage;
	this.gotoState(BillCipherTrap.ST_HAZARD_STAND);
	this.m_alertCounts = 0;
	this.m_maxAlertCounts = Application.config.settings.billcipherTrapAlerts
}
goog.inherits(BillCipherTrap, VU_WorldActor);
BillCipherTrap.ST_HAZARD_STAND = "st100";
BillCipherTrap.ST_HAZARD_ALERT = "st101";
BillCipherTrap.ST_HAZARD_EXPLODE = "st102";
BillCipherTrap.prototype.gotoState = function(a) {
	BillCipherTrap.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.clip().setLoop(!0)
};
BillCipherTrap.prototype.onEndAnimation = function(a) {
	switch (a) {
	case BillCipherTrap.ST_HAZARD_EXPLODE:
		this.m_isAwaitingDelete = !0;
		break;
	case BillCipherTrap.ST_HAZARD_ALERT:
		this.m_alertCounts++,
		this.m_alertCounts >= this.m_maxAlertCounts && (Application.instance.playSound("SND_BOSS_EXPLOSION2"), this.gotoState(BillCipherTrap.ST_HAZARD_EXPLODE))
	}
};
BillCipherTrap.prototype.update = function(a) {
	this.m_character.update(a);
	this.onHit();
	BillCipherTrap.superClass_.update.call(this, a)
};
BillCipherTrap.prototype.applyImpulse = function() {
	PlayerGame.instance.state() !== PlayerGame.ST_PLAYER_DESTROYED && (this.m_y > PlayerGame.instance.y() ? PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() - 30) : PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() + 30))
};
BillCipherTrap.prototype.onHit = function() {
	this.hitTest(PlayerGame.instance) && 18 >= Math.abs(this.m_y - PlayerGame.instance.y()) && (this.m_state === BillCipherTrap.ST_HAZARD_STAND ? this.gotoState(BillCipherTrap.ST_HAZARD_ALERT) : this.m_state === BillCipherTrap.ST_HAZARD_EXPLODE && (PlayerGame.instance.onHit(this.m_damage), PlayerGame.instance.isInvulnerable() || this.applyImpulse()))
};
BillCipherTrap.prototype.free = function() {
	BillCipherTrap.superClass_.free.call(this)
};
function BaseDoor(a, b, c, d, e, f, g) {
	VU_WorldActor.call(this, a, b, c, d, "", e);
	this.m_skin = f;
	this.m_character2 = null;
	if (1 === g || 2 === g) this.m_character2 = new Character(this.m_x, this.m_y, a),
	this.m_character2.addState(BaseDoor.ST_DOOR_CLOSED, this.m_skin + "openb"),
	this.m_character2.gotoState(BaseDoor.ST_DOOR_CLOSED, !1);
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(BaseDoor.ST_DOOR_CLOSED, this.m_skin + "closed");
	this.m_character.addState(BaseDoor.ST_DOOR_OPEN, this.m_skin + "open");
	this.m_character.addState(BaseDoor.ST_DOOR_OPENING, this.m_skin + "opening");
	this.m_character.addState(BaseDoor.ST_DOOR_CLOSING, this.m_skin + "closing");
	this.m_character.addState(BaseDoor.ST_DOOR_LOCKED, this.m_skin + "block");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_light = new DoorLight(a, b, 0, 0, e, f);
	this.m_isOpen = !1;
	this.gotoState(BaseDoor.ST_DOOR_CLOSED)
}
goog.inherits(BaseDoor, VU_WorldActor);
BaseDoor.ST_DOOR_CLOSED = "st100";
BaseDoor.ST_DOOR_OPENING = "st101";
BaseDoor.ST_DOOR_OPEN = "st102";
BaseDoor.ST_DOOR_CLOSING = "st103";
BaseDoor.ST_DOOR_LOCKED = "st104";
BaseDoor.prototype.onEndAnimation = function(a) {
	switch (a) {
	case BaseDoor.ST_DOOR_OPENING:
		this.gotoState(BaseDoor.ST_DOOR_OPEN);
		this.m_isOpen = !0;
		break;
	case BaseDoor.ST_DOOR_CLOSING:
		Application.instance.playSound("SND_SCENERY_DOOR_CLOSES2"),
		this.gotoState(BaseDoor.ST_DOOR_CLOSED),
		this.m_isOpen = !1
	}
};
BaseDoor.prototype.gotoState = function(a) {
	BaseDoor.superClass_.gotoState.call(this, a);
	this.updateBounds();
	a === BaseDoor.ST_DOOR_OPENING && Application.instance.playSound("SND_SCENERY_DOOR_OPENS2");
	a !== BaseDoor.ST_DOOR_OPENING && a !== BaseDoor.ST_DOOR_CLOSING || this.m_light.gotoState(a)
};
BaseDoor.prototype.update = function(a) {
	this.m_character.update(a);
	this.m_light && this.m_light.update(a);
	this.m_character2 && this.m_character2.update(a);
	BaseDoor.superClass_.update.call(this, a)
};
BaseDoor.prototype.state = function() {
	return this.m_state
};
BaseDoor.prototype.free = function() {
	this.m_light && (this.m_light.free(), this.m_light = null);
	this.m_character2 && (this.m_character2.free(), this.m_character2 = null);
	BaseDoor.superClass_.free.call(this)
};
BaseDoor.prototype.isOpen = function() {
	return this.m_isOpen
};
function GeneratorDoor(a, b, c, d, e, f, g) {
	VU_WorldActor.call(this, a, b, d, e, "", f);
	this.m_generator = c;
	this.m_skin = g;
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(GeneratorDoor.ST_DOOR_OPENING_DMG, this.m_skin + "_opening_dmg");
	this.m_character.addState(GeneratorDoor.ST_DOOR_OPENING, this.m_skin + "_opening");
	this.m_character.addState(GeneratorDoor.ST_DOOR_CLOSING_DMG, this.m_skin + "_closing_dmg");
	this.m_character.addState(GeneratorDoor.ST_DOOR_CLOSING, this.m_skin + "_closing");
	this.m_character.addState(GeneratorDoor.ST_DOOR_NULL, this.m_skin + "_null");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.gotoState(GeneratorDoor.ST_DOOR_NULL)
}
goog.inherits(GeneratorDoor, VU_WorldActor);
GeneratorDoor.ST_DOOR_CLOSING = "st100";
GeneratorDoor.ST_DOOR_CLOSING_DMG = "st101";
GeneratorDoor.ST_DOOR_OPENING = "st102";
GeneratorDoor.ST_DOOR_OPENING_DMG = "st103";
GeneratorDoor.ST_DOOR_NULL = "st104";
GeneratorDoor.prototype.onEndAnimation = function(a) {
	switch (a) {
	case GeneratorDoor.ST_DOOR_OPENING:
	case GeneratorDoor.ST_DOOR_OPENING_DMG:
		this.gotoState(GeneratorDoor.ST_DOOR_NULL);
		this.m_generator.gotoNextState(!0);
		break;
	case GeneratorDoor.ST_DOOR_CLOSING:
	case GeneratorDoor.ST_DOOR_CLOSING_DMG:
		this.gotoState(GeneratorDoor.ST_DOOR_NULL),
		this.m_generator.gotoNextState(!1)
	}
};
GeneratorDoor.prototype.gotoState = function(a) {
	GeneratorDoor.superClass_.gotoState.call(this, a);
	this.updateBounds()
};
GeneratorDoor.prototype.update = function(a) {
	this.m_character.update(a);
	GeneratorDoor.superClass_.update.call(this, a)
};
GeneratorDoor.prototype.state = function() {
	return this.m_state
};
GeneratorDoor.prototype.free = function() {
	GeneratorDoor.superClass_.free.call(this);
	this.m_generator = null
};
function Generator(a, b, c, d, e, f, g, h) {
	VU_WorldActor.call(this, a, b, c, d, "", e);
	this.m_dataGenerator = f;
	this.m_skin = this.m_dataGenerator.skin;
	this.m_totalHp = this.m_health = this.m_dataGenerator.hardness;
	this.m_currentTimeDisappear = this.m_timeDisappearInit = this.m_dataGenerator.timeDisappear;
	this.m_activeArmor = !0;
	this.m_armor = this.m_dataGenerator.armorPercentage;
	this.m_debuff = this.m_dataGenerator.armorDebuff;
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(Generator.ST_GENERATOR_HIDDEN, this.m_skin + "_hide");
	this.m_character.addState(Generator.ST_GENERATOR_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(Generator.ST_GENERATOR_APPEAR2, this.m_skin + "_appear2");
	this.m_character.addState(Generator.ST_GENERATOR_CLOSED, this.m_skin + "_closed");
	this.m_character.addState(Generator.ST_GENERATOR_OPEN, this.m_skin + "_open");
	this.m_character.addState(Generator.ST_GENERATOR_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(Generator.ST_GENERATOR_DISAPPEAR2, this.m_skin + "_disappear2");
	this.m_character.addState(Generator.ST_GENERATOR_APPEAR_DMG, this.m_skin + "appear_dmg");
	this.m_character.addState(Generator.ST_GENERATOR_APPEAR2_DMG, this.m_skin + "_appear2_dmg");
	this.m_character.addState(Generator.ST_GENERATOR_CLOSED_DMG, this.m_skin + "_closed_dmg");
	this.m_character.addState(Generator.ST_GENERATOR_OPEN_DMG, this.m_skin + "_open_dmg");
	this.m_character.addState(Generator.ST_GENERATOR_DISAPPEAR_DMG, this.m_skin + "_disappear_dmg");
	this.m_character.addState(Generator.ST_GENERATOR_DISAPPEAR2_DMG, this.m_skin + "_disappear2_dmg");
	this.m_character.addState(Generator.ST_GENERATOR_DESTROYING, this.m_skin + "_destroyed");
	this.m_character.addState(Generator.ST_GENERATOR_BROKEN, this.m_skin + "_broked");
	this.m_character.addState(Generator.ST_GENERATOR_HIT, this.m_skin + "_hit");
	this.m_character.addState(Generator.ST_GENERATOR_HIT_DMG, this.m_skin + "_hit_dmg");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_vulnerable = this.m_isBroken = this.m_isOpen = !1;
	this.m_generatorId = g;
	h ? this.gotoState(Generator.ST_GENERATOR_HIDDEN) : (this.m_isBroken = !0, this.gotoState(Generator.ST_GENERATOR_BROKEN));
	this.m_generatorTimer = 0;
	this.m_door = new GeneratorDoor(this.m_canvas, this.m_world, this, this.m_x, this.m_y + 500, 0, this.m_skin);
	if (this.m_target = 0 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? Application.instance.getClip("mcTarget") : null) this.m_target.setPosition(this.m_x, this.m_y - 15),
	this.m_canvas.addChild(this.m_target.sprite),
	this.m_target.sprite._depth = 10 * this.m_y + 1,
	this.m_target.setVisible(!1);
	this.m_maxTargetScale = this.m_targetScale = 0.9;
	this.m_minTargetScale = 0.6;
	this.m_scaleIncrement = 3E-4;
	this.m_timeEffectMax = Generator.TIME_EFFECT_01;
	this.stateEffect = Generator.ST_EFFECT_EMPY;
	this.m_timeVisibleEffect = 0;
	this.m_positionEffect = [[10, -10], [30, -30], [ - 18, -33], [ - 17, -73], [14, -93], [10, -62], [13, -39]]
}
goog.inherits(Generator, VU_WorldActor);
Generator.ST_EFFECT_EMPY = "fx100";
Generator.ST_EFFECT_01 = "fx101";
Generator.ST_EFFECT_02 = "fx102";
Generator.ST_EFFECT_03 = "fx103";
Generator.TIME_EFFECT_01 = 500;
Generator.TIME_EFFECT_02 = 300;
Generator.TIME_EFFECT_03 = 100;
Generator.ST_GENERATOR_HIDDEN = "st100";
Generator.ST_GENERATOR_APPEAR = "st101";
Generator.ST_GENERATOR_APPEAR2 = "st102";
Generator.ST_GENERATOR_CLOSED = "st103";
Generator.ST_GENERATOR_OPEN = "st104";
Generator.ST_GENERATOR_DISAPPEAR = "st105";
Generator.ST_GENERATOR_DISAPPEAR2 = "st106";
Generator.ST_GENERATOR_APPEAR_DMG = "st201";
Generator.ST_GENERATOR_APPEAR2_DMG = "st202";
Generator.ST_GENERATOR_CLOSED_DMG = "st203";
Generator.ST_GENERATOR_OPEN_DMG = "st204";
Generator.ST_GENERATOR_DISAPPEAR_DMG = "st205";
Generator.ST_GENERATOR_DISAPPEAR2_DMG = "st206";
Generator.ST_GENERATOR_HIT = "st300";
Generator.ST_GENERATOR_HIT_DMG = "st301";
Generator.ST_GENERATOR_DESTROYING = "st302";
Generator.ST_GENERATOR_BROKEN = "st303";
Generator.prototype.isOpen = function() {
	return this.m_isOpen
};
Generator.prototype.isAnimDestroying = function() {
	return this.m_state === Generator.ST_GENERATOR_DESTROYING || this.m_state === Generator.ST_GENERATOR_BROKEN
};
Generator.prototype.deactivateArmor = function() {
	this.m_activeArmor = !1
};
Generator.prototype.onEndAnimation = function(a) {
	switch (a) {
	case Generator.ST_GENERATOR_APPEAR:
	case Generator.ST_GENERATOR_APPEAR_DMG:
		this.gotoState(this.m_health >= 0.5 * this.m_totalHp ? Generator.ST_GENERATOR_APPEAR2: Generator.ST_GENERATOR_APPEAR2_DMG);
		break;
	case Generator.ST_GENERATOR_APPEAR2:
	case Generator.ST_GENERATOR_APPEAR2_DMG:
		this.gotoState(this.m_health >= 0.5 * this.m_totalHp ? Generator.ST_GENERATOR_OPEN: Generator.ST_GENERATOR_OPEN_DMG);
		this.m_door.gotoState(this.m_health >= 0.5 * this.m_totalHp ? GeneratorDoor.ST_DOOR_OPENING: GeneratorDoor.ST_DOOR_OPENING_DMG);
		Global.game.portalsReadyToSummon = !0;
		this.m_target && this.m_target.setVisible(!0);
		break;
	case Generator.ST_GENERATOR_HIT:
	case Generator.ST_GENERATOR_HIT_DMG:
		this.gotoState(this.m_health >= 0.5 * this.m_totalHp ? Generator.ST_GENERATOR_OPEN: Generator.ST_GENERATOR_OPEN_DMG);
		break;
	case Generator.ST_GENERATOR_DISAPPEAR2:
	case Generator.ST_GENERATOR_DISAPPEAR2_DMG:
		this.gotoState(this.m_health >= 0.5 * this.m_totalHp ? Generator.ST_GENERATOR_DISAPPEAR: Generator.ST_GENERATOR_DISAPPEAR_DMG);
		break;
	case Generator.ST_GENERATOR_DISAPPEAR:
	case Generator.ST_GENERATOR_DISAPPEAR_DMG:
		this.gotoState(Generator.ST_GENERATOR_HIDDEN);
		Global.game.startDeadTimer();
		break;
	case Generator.ST_GENERATOR_DESTROYING:
		GameVillains.instance.removePortal(this.m_generatorId),
		this.gotoState(Generator.ST_GENERATOR_BROKEN)
	}
};
Generator.prototype.openDoor = function(a) {};
Generator.prototype.gotoNextState = function(a) {
	a ? (this.gotoState(this.m_health >= 0.5 * this.m_totalHp ? Generator.ST_GENERATOR_OPEN: Generator.ST_GENERATOR_OPEN_DMG), this.m_generatorTimer = 2E3, this.m_vulnerable = this.m_isOpen = !0) : this.gotoState(this.m_health >= 0.5 * this.m_totalHp ? Generator.ST_GENERATOR_DISAPPEAR2: Generator.ST_GENERATOR_DISAPPEAR2_DMG)
};
Generator.prototype.activeGenerator = function(a) {
	this.gotoState(a ? Generator.ST_GENERATOR_APPEAR: Generator.ST_GENERATOR_DISAPPEAR);
	this.m_generatorTimer = 0;
	this.m_vulnerable = this.m_isOpen = !1
};
Generator.prototype.generatorId = function() {
	return this.m_generatorId
};
Generator.prototype.isBroken = function() {
	return this.m_isBroken
};
Generator.prototype.setGeneratorId = function(a) {
	this.m_generatorId = a
};
Generator.prototype.isEnableGenerator = function() {
	return this.m_state === Generator.ST_GENERATOR_OPEN || this.m_state === Generator.ST_GENERATOR_OPEN_DMG
};
Generator.prototype.gotoState = function(a) {
	Generator.superClass_.gotoState.call(this, a);
	this.updateBounds()
};
Generator.prototype.reduceHealth = function(a) {
	if (!this.m_vulnerable || this.m_isBroken) switch (this.m_state) {
	case Generator.ST_GENERATOR_APPEAR2:
	case Generator.ST_GENERATOR_APPEAR2_DMG:
	case Generator.ST_GENERATOR_CLOSED:
	case Generator.ST_GENERATOR_CLOSED_DMG:
	case Generator.ST_GENERATOR_DISAPPEAR:
	case Generator.ST_GENERATOR_DISAPPEAR_DMG:
		Application.instance.playSound("SND_ENEMY_HIT_SHIELD")
	} else {
		var b = !0 == this.m_activeArmor ? this.m_armor: this.m_debuff;
		this.m_health -= (this.m_world.player().activeDoubleDamage() ? a: 2 * a) * b;
		this.m_health <= 0.25 * this.m_totalHp ? (this.m_timeEffectMax = Generator.TIME_EFFECT_03, this.stateEffect = Generator.ST_EFFECT_03) : this.m_health <= 0.5 * this.m_totalHp ? (this.m_timeEffectMax = Generator.TIME_EFFECT_02, this.stateEffect = Generator.ST_EFFECT_02) : this.m_health <= 0.8 * this.m_totalHp ? (this.m_timeEffectMax = Generator.TIME_EFFECT_01, this.stateEffect = Generator.ST_EFFECT_01) : this.stateEffect = Generator.ST_EFFECT_EMPY;
		0 >= this.m_health ? (this.m_vulnerable = !1, this.m_isBroken = !0, Application.instance.playSound("SND_SCENERY_TELEPORTER_COLLAPSES2"), this.gotoState(Generator.ST_GENERATOR_DESTROYING), HudGame.instance.activeTutorial && 0 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && Global.game.endLevelTutorial(0), this.m_target && this.m_target.setVisible(!1)) : (Application.instance.playSound("SND_SCENERY_TELEPORTER_HIT2"), this.gotoState(this.m_health >= 0.5 * this.m_totalHp ? Generator.ST_GENERATOR_HIT: Generator.ST_GENERATOR_HIT_DMG))
	}
};
Generator.prototype.update = function(a) {
	this.m_character.update(a);
	this.m_door && this.m_door.update(a);
	Generator.superClass_.update.call(this, a);
	if (this.m_isOpen && (this.m_currentTimeDisappear -= a, 0 >= this.m_currentTimeDisappear && (this.m_vulnerable = this.m_isOpen = !1, this.m_currentTimeDisappear = this.m_timeDisappearInit, this.m_isBroken || (this.m_door.gotoState(this.m_health >= 0.5 * this.m_totalHp ? GeneratorDoor.ST_DOOR_CLOSING: GeneratorDoor.ST_DOOR_CLOSING_DMG), this.m_target && this.m_target.setVisible(!1)), GameVillains.instance.usedGenerator = []), this.m_timeVisibleEffect += a, this.m_timeVisibleEffect >= this.m_timeEffectMax)) {
		this.m_timeVisibleEffect = 0;
		var b = Common.random(0, this.m_positionEffect.length - 1),
		c = Common.random(1, 3);
		if (this.m_state !== Generator.ST_GENERATOR_DESTROYING && this.m_state !== Generator.ST_GENERATOR_BROKEN) switch (this.stateEffect) {
		case Generator.ST_EFFECT_01:
			GameVillains.instance.addEffect(String("mc_fx_spark_" + c), this.m_x + this.m_positionEffect[b][0], this.m_y + this.m_positionEffect[b][1]);
			break;
		case Generator.ST_EFFECT_02:
			GameVillains.instance.addEffect(String("mc_fx_spark_" + c), this.m_x + this.m_positionEffect[b][0], this.m_y + this.m_positionEffect[b][1]);
			break;
		case Generator.ST_EFFECT_03:
			GameVillains.instance.addEffect(String("mc_fx_spark_" + c), this.m_x + this.m_positionEffect[b][0], this.m_y + this.m_positionEffect[b][1])
		}
	}
	this.m_target && (this.m_target.update(a), this.m_targetScale += this.m_scaleIncrement * a, this.m_scaleIncrement = this.m_targetScale >= this.m_maxTargetScale || this.m_targetScale <= this.m_minTargetScale ? -this.m_scaleIncrement: this.m_scaleIncrement, this.m_target.setScale(this.m_targetScale, this.m_targetScale))
};
Generator.prototype.state = function() {
	return this.m_state
};
Generator.prototype.isOpen = function() {
	return this.m_isOpen
};
Generator.prototype.free = function() {
	this.m_door && (this.m_door.free(), this.m_door = null);
	this.m_target && (this.m_target.free(), this.m_target = null);
	Generator.superClass_.free.call(this)
};
function DoorLight(a, b, c, d, e, f) {
	VU_WorldActor.call(this, a, b, c, d, "", e);
	this.m_skin = f;
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(BaseDoor.ST_DOOR_CLOSED, this.m_skin + "light4");
	this.m_character.addState(BaseDoor.ST_DOOR_OPENING, this.m_skin + "light1");
	this.m_character.addState(BaseDoor.ST_DOOR_OPEN, this.m_skin + "light2");
	this.m_character.addState(BaseDoor.ST_DOOR_CLOSING, this.m_skin + "light3");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_bgClip = null;
	"mc_door4_" !== this.m_skin && (this.m_bgClip = Application.instance.getClip(this.m_skin + "bg"), this.m_canvas.addChild(this.m_bgClip.sprite));
	this.gotoState(BaseDoor.ST_DOOR_CLOSED)
}
goog.inherits(DoorLight, VU_WorldActor);
DoorLight.prototype.onEndAnimation = function(a) {
	switch (a) {
	case BaseDoor.ST_DOOR_OPENING:
		this.gotoState(BaseDoor.ST_DOOR_OPEN);
		break;
	case BaseDoor.ST_DOOR_CLOSING:
		this.gotoState(BaseDoor.ST_DOOR_CLOSED)
	}
};
DoorLight.prototype.gotoState = function(a) {
	DoorLight.superClass_.gotoState.call(this, a);
	this.updateBounds()
};
DoorLight.prototype.update = function(a) {
	this.m_character.update(a);
	DoorLight.superClass_.update.call(this, a)
};
DoorLight.prototype.state = function() {
	return this.m_state
};
DoorLight.prototype.free = function() {
	this.m_bgClip && (this.m_bgClip.free(), this.m_bgClip = null);
	DoorLight.superClass_.free.call(this)
};
function SpawningPortal(a, b, c, d, e, f, g) {
	VU_WorldActor.call(this, a, b, c, d, "", e);
	this.m_player = this.m_world.player();
	this.m_skin = f;
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(SpawningPortal.ST_PORTAL_OPEN, this.m_skin + "stand");
	this.m_character.addState(SpawningPortal.ST_PORTAL_OPENING, this.m_skin + "appear");
	this.m_character.addState(SpawningPortal.ST_PORTAL_CLOSING, this.m_skin + "break");
	this.m_character.addState(SpawningPortal.ST_PORTAL_HIT, this.m_skin + "hit");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_health = Application.config.settings.spawningPortalHp;
	this.m_isOpen = !1;
	this.gotoState(SpawningPortal.ST_PORTAL_OPENING);
	this.m_vulnerable = !1;
	this.m_portalId = g
}
goog.inherits(SpawningPortal, VU_WorldActor);
SpawningPortal.ST_PORTAL_OPENING = "st101";
SpawningPortal.ST_PORTAL_OPEN = "st102";
SpawningPortal.ST_PORTAL_CLOSING = "st103";
SpawningPortal.ST_PORTAL_HIT = "st104";
SpawningPortal.prototype.onEndAnimation = function(a) {
	switch (a) {
	case SpawningPortal.ST_PORTAL_HIT:
		this.gotoState(SpawningPortal.ST_PORTAL_OPEN);
		break;
	case SpawningPortal.ST_PORTAL_OPENING:
		this.gotoState(SpawningPortal.ST_PORTAL_OPEN);
		this.m_isOpen = !0;
		break;
	case SpawningPortal.ST_PORTAL_CLOSING:
		this.m_isAwaitingDelete = !0,
		Global.game.removePortal(this.m_portalId),
		Global.game.centerItem().turnLightOff(this.m_portalId)
	}
};
SpawningPortal.prototype.gotoState = function(a) {
	SpawningPortal.superClass_.gotoState.call(this, a);
	this.updateBounds()
};
SpawningPortal.prototype.update = function(a) {
	this.m_character.update(a);
	SpawningPortal.superClass_.update.call(this, a)
};
SpawningPortal.prototype.state = function() {
	return this.m_state
};
SpawningPortal.prototype.free = function() {
	SpawningPortal.superClass_.free.call(this)
};
SpawningPortal.prototype.isOpen = function() {
	return this.m_isOpen
};
SpawningPortal.prototype.setVulnerable = function(a) {
	this.m_vulnerable = a
};
SpawningPortal.prototype.portalId = function() {
	return this.m_portalId
};
SpawningPortal.prototype.isAnimDestroying = function() {
	return this.m_state === SpawningPortal.ST_PORTAL_CLOSING
};
SpawningPortal.prototype.reduceHealth = function(a) {
	this.m_vulnerable && (this.m_health -= this.m_player.activeDoubleDamage() ? 2 * a: a, 0 >= this.m_health ? (this.gotoState(SpawningPortal.ST_PORTAL_CLOSING), this.m_vulnerable = !1) : this.gotoState(SpawningPortal.ST_PORTAL_HIT))
};
function CenterItem(a, b, c, d, e, f) {
	VU_WorldActor.call(this, a, b, c, d, "", e);
	this.m_skin = "control_";
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_character.addState(CenterItem.ST_CAMERA_APPEAR, this.m_skin + "appear");
	this.m_character.addState(CenterItem.ST_CAMERA_DISAPPEAR, this.m_skin + "disappear");
	this.m_character.addState(CenterItem.ST_CAMERA_HIDDEN, this.m_skin + "hidden");
	this.m_character.addState(CenterItem.ST_CAMERA_STAND, this.m_skin + "stand");
	this.m_character.addState(CenterItem.ST_CAMERA_DEAD, this.m_skin + "break_stand");
	this.m_character.addState(CenterItem.ST_CAMERA_EXPLODE, this.m_skin + "break");
	this.m_character.addState(CenterItem.ST_CAMERA_HIT, this.m_skin + "hit");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_hp = Application.config.settings.centerItemHp;
	this.gotoState(f ? CenterItem.ST_CAMERA_STAND: CenterItem.ST_CAMERA_DEAD);
	this.m_vulnerable = !1;
	this.m_isAlive = f;
	if (this.m_target = 0 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? Application.instance.getClip("mcTarget") : null) this.m_target.setPosition(this.m_x, this.m_y - 15),
	this.m_canvas.addChild(this.m_target.sprite),
	this.m_target.sprite._depth = 10 * this.m_y + 1,
	this.m_target.setVisible(!1);
	this.m_maxTargetScale = this.m_targetScale = 0.9;
	this.m_minTargetScale = 0.6;
	this.m_scaleIncrement = 3E-4
}
goog.inherits(CenterItem, VU_WorldActor);
CenterItem.ST_CAMERA_APPEAR = "st101";
CenterItem.ST_CAMERA_DISAPPEAR = "st102";
CenterItem.ST_CAMERA_HIDDEN = "st103";
CenterItem.ST_CAMERA_STAND = "st104";
CenterItem.ST_CAMERA_DEAD = "st105";
CenterItem.ST_CAMERA_EXPLODE = "st106";
CenterItem.ST_CAMERA_HIT = "st107";
CenterItem.prototype.onEndAnimation = function(a) {
	switch (a) {
	case CenterItem.ST_CAMERA_HIT:
		this.gotoState(CenterItem.ST_CAMERA_STAND);
		break;
	case CenterItem.ST_CAMERA_APPEAR:
		this.m_vulnerable = !0;
		this.gotoState(CenterItem.ST_CAMERA_STAND);
		this.m_target && this.m_target.setVisible(!0);
		break;
	case CenterItem.ST_CAMERA_DISAPPEAR:
		GameVillains.instance.world().player().releaseAction(!0);
		this.gotoState(CenterItem.ST_CAMERA_HIDDEN);
		HudGame.instance.activeTutorial && 0 === Global.savedNumData[Global.INDEX_CURRENT_ROOM] && GameVillains.instance.initPanelTutorial();
		break;
	case CenterItem.ST_CAMERA_EXPLODE:
		this.m_isAlive = !1,
		Global.game.world().player().gotoState(PlayerGame.ST_PLAYER_WIN),
		Global.game.world().player().setKeyboardEnabled(!1),
		this.gotoState(CenterItem.ST_CAMERA_DEAD),
		HudGame.instance.showMessage(!0, 2),
		HudGame.instance.activeTutorial && (HudGame.instance.enableTutorial = !0, HudGame.instance.autoDisappear = !1, HudGame.instance.showPanel = !0, GameVillains.instance.nextPanelTutorial()),
		Global.game.saveCurrentStatus()
	}
};
CenterItem.prototype.gotoState = function(a) {
	CenterItem.superClass_.gotoState.call(this, a);
	this.updateBounds();
	a === CenterItem.ST_CAMERA_EXPLODE && (Global.game.shakeCanvas(), Global.game.world().actorManager().killAllEnemies())
};
CenterItem.prototype.update = function(a) {
	this.m_character.update(a);
	CenterItem.superClass_.update.call(this, a);
	this.onHit();
	switch (this.m_state) {
	case CenterItem.ST_CAMERA_APPEAR:
	case CenterItem.ST_CAMERA_DISAPPEAR:
	case CenterItem.ST_CAMERA_STAND:
	case CenterItem.ST_CAMERA_EXPLODE:
	case CenterItem.ST_CAMERA_HIT:
		this.setDepth(10 * this.m_y);
		break;
	case CenterItem.ST_CAMERA_HIDDEN:
	case CenterItem.ST_CAMERA_DEAD:
		this.setDepth(10)
	}
	this.m_target && (this.m_target.update(a), this.m_targetScale += this.m_scaleIncrement * a, this.m_scaleIncrement = this.m_targetScale >= this.m_maxTargetScale || this.m_targetScale <= this.m_minTargetScale ? -this.m_scaleIncrement: this.m_scaleIncrement, this.m_target.setScale(this.m_targetScale, this.m_targetScale))
};
CenterItem.prototype.state = function() {
	return this.m_state
};
CenterItem.prototype.free = function() {
	this.m_target && (this.m_target.free(), this.m_target = null);
	CenterItem.superClass_.free.call(this)
};
CenterItem.prototype.turnLightOff = function(a) {};
CenterItem.prototype.reduceHealth = function(a) {
	this.m_vulnerable && this.m_isAlive && (this.m_hp -= this.m_world.player().activeDoubleDamage() ? a: 2 * a, 0 >= this.m_hp ? (this.m_isAlive = this.m_vulnerable = !1, Application.instance.playSound("SND_SCENERY_TELEPORTER_COLLAPSES2"), this.gotoState(CenterItem.ST_CAMERA_EXPLODE), this.m_target && this.m_target.setVisible(!1)) : (Application.instance.playSound("SND_SCENERY_TELEPORTER_HIT2"), this.gotoState(CenterItem.ST_CAMERA_HIT)))
};
CenterItem.prototype.onHit = function() {
	this.m_state !== CenterItem.ST_CAMERA_HIDDEN && this.m_state !== CenterItem.ST_CAMERA_DEAD && this.hitTest(PlayerGame.instance) && 18 >= Math.abs(this.m_y - PlayerGame.instance.y()) && this.applyImpulse()
};
CenterItem.prototype.applyImpulse = function() {
	PlayerGame.instance.state() !== PlayerGame.ST_PLAYER_DESTROYED && (this.m_y > PlayerGame.instance.y() ? PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() - 10) : PlayerGame.instance.setPosition(PlayerGame.instance.x(), PlayerGame.instance.y() + 10))
};
CenterItem.prototype.isAlive = function() {
	return this.m_isAlive && this.m_vulnerable
};
CenterItem.prototype.posY = function() {
	return this.m_y + 280
};
function EnemyBase(a, b, c, d, e, f) {
	VU_WorldActor.call(this, a, b, e, f, "", d);
	this.m_player = this.m_world.player();
	this.m_enemyWave = c;
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_baseAction = null;
	this.m_previousState = this.m_initActionDelay = 0;
	this.m_untouchable = !0;
	this.m_centerY = this.m_centerX = this.m_radiusY = this.m_radiusX = this.m_angle = 0;
	this.m_nameItem = "";
	this.m_healthBar = null;
	this.m_score = 0;
	this.isLookingLeft = !1;
	this.m_savedScaleX = 1;
	this.firstUpdate = !1;
	this.m_offsetY = this.m_offsetX = 0;
	this.m_hitByDash = !1;
	this.m_bodyDamage = this.m_deathType = 0
}
goog.inherits(EnemyBase, VU_WorldActor);
EnemyBase.ST_ENEMY_HIT = "st104";
EnemyBase.ST_ENEMY_WALK = "st102";
EnemyBase.ST_ENEMY_STAND = "st101";
EnemyBase.ST_ENEMY_SHOUT = "st107";
EnemyBase.ST_ENEMY_APPEAR = "st100";
EnemyBase.ST_ENEMY_CHARGE = "st103";
EnemyBase.ST_ENEMY_DEFEAT = "st105";
EnemyBase.ST_ENEMY_ATTACK = "st106";
EnemyBase.ST_ENEMY_DISAPPEAR = "st108";
EnemyBase.ST_ENEMY_SUMMON_INTRO = "st109";
EnemyBase.ST_ENEMY_SUMMON_STAND = "st110";
EnemyBase.ST_ENEMY_SUMMON_OUTRO = "st111";
EnemyBase.ST_ENEMY_DASH = "st112";
EnemyBase.ST_ENEMY_DEATH_BOMB = "st113";
EnemyBase.ST_ENEMY_DEATH_BUBBLE = "st114";
EnemyBase.ST_ENEMY_DEATH_FREEZE = "st115";
EnemyBase.ST_ENEMY_DEATH_SQUEEZE = "st116";
EnemyBase.ST_ENEMY_WIN = "st120";
EnemyBase.ST_ENEMY_HIT_2 = "st121";
EnemyBase.ST_ENEMY_STAND_2 = "st122";
EnemyBase.ST_ENEMY_DEFEAT_2 = "st123";
EnemyBase.ST_ENEMY_CHARGE_2 = "st124";
EnemyBase.ST_ENEMY_ATTACK_2 = "st125";
EnemyBase.ST_ENEMY_DEFEAT_END = "st126";
EnemyBase.ST_ENEMY_WIN_2 = "st127";
EnemyBase.ST_ENEMY_TRAPS = "st128";
EnemyBase.prototype.createHealthBar = function() {
	this.m_healthBar = new HealthBar(this.m_canvas, this.m_x, this.m_y, this.m_health)
};
EnemyBase.prototype.setShootingOffset = function(a, b) {
	this.m_offsetX = a;
	this.m_offsetY = b
};
EnemyBase.prototype.onActionMove = function() {
	this.gotoState(EnemyBase.ST_ENEMY_WALK)
};
EnemyBase.prototype.onActionStand = function() {
	this.gotoState(EnemyBase.ST_ENEMY_STAND)
};
EnemyBase.prototype.onActionAttack = function() {
	this.gotoState(EnemyBase.ST_ENEMY_ATTACK)
};
EnemyBase.prototype.onActionShout = function() {
	this.gotoState(EnemyBase.ST_ENEMY_WIN)
};
EnemyBase.prototype.update = function(a) {
	EnemyBase.superClass_.update.call(this, a);
	this.onTouchDamage();
	null !== this.m_healthBar && (this.m_healthBar.update(a), this.m_healthBar.setPosition(this.m_x, this.m_y, null !== this.m_character ? this.m_character.depth: 100))
};
EnemyBase.prototype.gotoState = function(a) {
	this.m_previousState = this.m_state !== EnemyBase.ST_ENEMY_HIT ? this.m_state: this.m_previousState;
	EnemyBase.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.clip().setScaleX(this.m_savedScaleX)
};
EnemyBase.prototype.setSavedScaleX = function(a) {
	this.clip().setScaleX(a);
	this.m_savedScaleX = a
};
EnemyBase.prototype.savedScale = function() {
	return this.m_savedScaleX
};
EnemyBase.prototype.gotoPreviousState = function() {
	this.gotoState(this.m_previousState)
};
EnemyBase.prototype.setAngleRadius = function(a, b) {
	this.m_angle = a;
	this.setPosition(this.m_centerX + b * Math.cos(a), this.m_centerY + b * Math.sin(a))
};
EnemyBase.prototype.angle = function() {
	return this.m_angle
};
EnemyBase.prototype.score = function() {
	return this.m_score
};
EnemyBase.prototype.setUntouchable = function(a) {
	this.m_untouchable = a
};
EnemyBase.prototype.radiusX = function() {
	return this.m_radiusX
};
EnemyBase.prototype.setRadiusX = function(a) {
	this.m_radiusX = a
};
EnemyBase.prototype.radiusY = function() {
	return this.m_radiusY
};
EnemyBase.prototype.setRadiusY = function(a) {
	this.m_radiusY = a
};
EnemyBase.prototype.centerX = function() {
	return this.m_centerX
};
EnemyBase.prototype.setCenterX = function(a) {
	this.m_centerX = a
};
EnemyBase.prototype.centerY = function() {
	return this.m_centerY
};
EnemyBase.prototype.setCenterY = function(a) {
	this.m_centerY = a
};
EnemyBase.prototype.setBodyDamage = function(a) {
	this.m_bodyDamage = a
};
EnemyBase.prototype.isAnimDestroying = function() {
	return this.m_state === EnemyBase.ST_ENEMY_DEFEAT
};
EnemyBase.prototype.setAction = function(a) {
	this.m_baseAction = a
};
EnemyBase.prototype.startAction = function() {
	this.m_baseAction && this.m_baseAction.startAction(this.m_initActionDelay)
};
EnemyBase.prototype.free = function() {
	this.m_baseAction && (this.m_baseAction.free(), this.m_baseAction = null);
	null !== this.m_healthBar && (this.m_healthBar.free(), this.m_healthBar = null);
	EnemyBase.superClass_.free.call(this)
};
EnemyBase.prototype.onTarget = function(a) {};
EnemyBase.prototype.onPlayerEndMove = function() {};
EnemyBase.prototype.onPlayerInitAttack = function() {};
EnemyBase.prototype.onHit = function(a) {
	if (!this.isAnimDestroying() && this.hitTest(PlayerGame.instance)) this.gotoState(EnemyBase.ST_ENEMY_ATTACK),
	PlayerGame.instance.onHit(a),
	this.m_baseAction.setPaused(!0);
	else this.onActionStand()
};
EnemyBase.prototype.onTouchDamage = function() {
	if (!this.isAnimDestroying() && this.hitTest(PlayerGame.instance) && 0 < this.m_bodyDamage) PlayerGame.instance.onHit(this.m_bodyDamage)
};
EnemyBase.prototype.onDashHit = function(a) {
	this.m_hitByDash || this.isAnimDestroying() || !this.hitTest(PlayerGame.instance) || (PlayerGame.instance.onHit(a), this.m_hitByDash = !0)
};
EnemyBase.prototype.onShoot = function(a, b, c, d, e, f, g, h) {
	this.gotoState(EnemyBase.ST_ENEMY_ATTACK);
	this.m_world.shotHandler().shoot(a, b, c, d, this.m_x + this.m_offsetX * this.clip().scaleX, this.m_y + this.m_offsetY, f, g, "enemy", e, h)
};
EnemyBase.prototype.state = function() {
	return this.m_state
};
EnemyBase.prototype.setDeathMode = function(a) {
	this.m_deathType = a
};
EnemyBase.prototype.forceDeath = function() {
	this.m_untouchable = !0;
	this.gotoState(EnemyBase.ST_ENEMY_DEFEAT)
};
EnemyBase.prototype.reduceHealth = function(a) {
	if (!this.m_untouchable) {
		this.m_health -= this.m_player.activeDoubleDamage() ? 2 * a: a;
		Application.instance.playSound("SND_ENEMY_DAMAGE");
		if (null !== this.m_healthBar) this.m_healthBar.onHit(this.m_health);
		if (0 >= this.m_health) {
			switch (this.m_deathType) {
			case 0:
				this.gotoState(EnemyBase.ST_ENEMY_DEFEAT);
				break;
			case 1:
				4 === Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER] ? this.gotoState(EnemyBase.ST_ENEMY_DEATH_FREEZE) : 3 === Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER] ? this.gotoState(EnemyBase.ST_ENEMY_DEATH_BUBBLE) : this.gotoState(EnemyBase.ST_ENEMY_DEFEAT);
				break;
			case 2:
				1 === Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER] || 2 === Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER] ? this.gotoState(EnemyBase.ST_ENEMY_DEATH_BOMB) : 5 === Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER] ? this.gotoState(EnemyBase.ST_ENEMY_DEATH_SQUEEZE) : this.gotoState(EnemyBase.ST_ENEMY_DEFEAT)
			}
			this.m_untouchable = !0;
			this.m_baseAction && (this.m_baseAction.free(), this.m_baseAction = null);
			Global.savedNumData[Global.INDEX_ENEMIES_KILLED]++;
			Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData));
			Global.achievements.checkAchBeingRude();
			Global.achievements.checkAchUnnecessaryViolence()
		} else this.gotoState(EnemyBase.ST_ENEMY_HIT),
		this.m_baseAction.setPaused(!0)
	}
};
function HealthBar(a, b, c, d) {
	this.m_canvas = a;
	this.m_y = this.m_x = 0;
	this.m_health = d;
	this.m_depth = 0;
	this.m_opacity = 1;
	this.m_spriteBar = this.m_spriteBase = null;
	this.setSpriteBase("mcEnemyHpBase");
	this.setSpriteBar("mcEnemyHpBar");
	this.setPosition(b, c, 100);
	this.m_spriteBase.setX(this.m_x);
	this.m_spriteBase.setY(this.m_y);
	this.m_spriteBase.sprite.opacity = 0;
	this.m_spriteBar.setX(this.m_x);
	this.m_spriteBar.setY(this.m_y);
	this.timeVisible = this.m_spriteBar.sprite.opacity = 0;
	this.isVisible = !1;
	this.m_scaleX = 1
}
HealthBar.TIMELIFE = 2E3;
HealthBar.WIDTH = 40;
HealthBar.prototype.onHit = function(a) {
	this.isVisible = !0;
	this.timeVisible = 0;
	this.m_opacity = 1;
	this.m_spriteBase.sprite.opacity = 1;
	this.m_spriteBar.sprite.opacity = 1;
	this.m_scaleX = (0 > a ? 0 : a / this.m_health) * HealthBar.WIDTH / HealthBar.WIDTH;
	this.m_spriteBar.setScaleX(this.m_scaleX)
};
HealthBar.prototype.setSpriteBase = function(a) {
	a = "undefined" === typeof a ? null: a;
	null !== a && (this.m_spriteBase = Application.instance.getClip(a), this.m_canvas.addChild(this.m_spriteBase.sprite), this.m_spriteBase.parent = this.m_canvas)
};
HealthBar.prototype.setSpriteBar = function(a) {
	a = "undefined" === typeof a ? null: a;
	null !== a && (this.m_spriteBar = Application.instance.getClip(a), this.m_canvas.addChild(this.m_spriteBar.sprite), this.m_spriteBar.parent = this.m_canvas)
};
HealthBar.prototype.setPosition = function(a, b, c) {
	this.m_x = a - 20;
	this.m_y = b + 5;
	this.m_depth = c
};
HealthBar.prototype.update = function(a) {
	null !== this.m_spriteBase && (this.m_spriteBase.update(a), this.m_spriteBase.setX(this.m_x), this.m_spriteBase.setY(this.m_y), this.m_spriteBase.sprite._depth = this.m_depth, this.m_spriteBar.update(a), this.m_spriteBar.setX(this.m_x), this.m_spriteBar.setY(this.m_y), this.m_spriteBar.sprite._depth = this.m_depth + 2);
	this.isVisible && (this.timeVisible += a, this.m_opacity -= 0.02, 0 >= this.m_opacity && (this.m_opacity = 0), this.m_spriteBase.sprite.opacity = this.m_opacity, this.m_spriteBar.sprite.opacity = this.m_opacity, this.timeVisible >= HealthBar.TIMELIFE && (this.timeVisible = 0, this.m_opacity = 1, this.isVisible = !1, this.m_spriteBase.sprite.opacity = 0, this.m_spriteBar.sprite.opacity = 0))
};
HealthBar.prototype.free = function() {
	null !== this.m_spriteBase && (this.m_spriteBase.parent.removeChild(this.m_spriteBase.sprite), this.m_spriteBase.free(), this.m_spriteBase = null);
	null !== this.m_spriteBar && (this.m_spriteBar.parent.removeChild(this.m_spriteBar.sprite), this.m_spriteBar.free(), this.m_spriteBar = null)
};
function WandererMelee(a, b, c, d, e, f, g) {
	EnemyBase.call(this, a, b, c, f, d, e);
	this.m_health = g.health;
	this.m_skin = g.skin;
	this.m_score = g.score;
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_BOMB, this.m_skin + "_bomb");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_BUBBLE, this.m_skin + "_bubble");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_FREEZE, this.m_skin + "_freeze");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_SQUEEZE, this.m_skin + "_sqeeze");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	switch (this.m_skin) {
	case "mcEnemy2":
	case "mcEnemy6":
		this.setShootingOffset( - 28, -38);
		break;
	case "mcEnemy3":
	case "mcEnemy7":
		this.setShootingOffset( - 22, -20);
		break;
	case "mcEnemy4":
	case "mcEnemy8":
		this.setShootingOffset( - 78, -75)
	}
	this.createHealthBar()
}
goog.inherits(WandererMelee, EnemyBase);
WandererMelee.prototype.onEndAnimation = function(a) {
	switch (a) {
	case EnemyBase.ST_ENEMY_APPEAR:
		this.onActionStand();
		this.startAction();
		break;
	case EnemyBase.ST_ENEMY_STAND:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_WALK:
		this.onActionMove();
		break;
	case EnemyBase.ST_ENEMY_ATTACK:
		this.canChase = !1;
		this.m_baseAction.setPaused(!1);
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_HIT:
		this.canChase = !1;
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_DEATH_BOMB:
	case EnemyBase.ST_ENEMY_DEATH_BUBBLE:
	case EnemyBase.ST_ENEMY_DEATH_FREEZE:
	case EnemyBase.ST_ENEMY_DEATH_SQUEEZE:
		this.gotoState(EnemyBase.ST_ENEMY_DEFEAT);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT:
		null !== this.m_healthBar && (this.m_healthBar.free(), this.m_healthBar = null),
		GameVillains.instance.addItems(this.m_x, this.m_y),
		GameVillains.instance.addScore(this.m_score),
		this.m_isAwaitingDelete = !0
	}
};
WandererMelee.prototype.update = function(a) {
	this.firstUpdate || (this.onActionStand(), this.startAction(), this.firstUpdate = !0);
	this.m_baseAction && this.m_state !== EnemyBase.ST_ENEMY_DEFEAT && this.m_baseAction.baseUpdate(a);
	this.m_character.update(a);
	WandererMelee.superClass_.update.call(this, a)
};
function FlyerRanged(a, b, c, d, e, f, g, h) {
	EnemyBase.call(this, a, b, c, f, d, e);
	this.m_health = g.health;
	this.m_skin = g.skin;
	this.m_score = g.score;
	this.m_angle = h * Math.PI / 180;
	this.m_angle -= this.m_angle > Math.PI ? 2 * Math.PI: 0;
	this.m_angle += this.m_angle < -Math.PI ? 2 * Math.PI: 0;
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_BOMB, this.m_skin + "_bomb");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_BUBBLE, this.m_skin + "_bubble");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_FREEZE, this.m_skin + "_freeze");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEATH_SQUEEZE, this.m_skin + "_sqeeze");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	switch (this.m_skin) {
	case "mcEnemy2":
	case "mcEnemy6":
		this.setShootingOffset( - 28, -38);
		break;
	case "mcEnemy3":
	case "mcEnemy7":
		this.setShootingOffset( - 22, -20);
		break;
	case "mcEnemy4":
	case "mcEnemy8":
		this.setShootingOffset( - 78, -75)
	}
	this.createHealthBar()
}
goog.inherits(FlyerRanged, EnemyBase);
FlyerRanged.prototype.onEndAnimation = function(a) {
	switch (a) {
	case EnemyBase.ST_ENEMY_APPEAR:
		this.onActionStand();
		this.startAction();
		break;
	case EnemyBase.ST_ENEMY_STAND:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_WALK:
		this.onActionMove();
		break;
	case EnemyBase.ST_ENEMY_ATTACK:
		this.canChase = !1;
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_HIT:
		this.canChase = !1;
		this.gotoPreviousState();
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_DEATH_BOMB:
	case EnemyBase.ST_ENEMY_DEATH_BUBBLE:
	case EnemyBase.ST_ENEMY_DEATH_FREEZE:
	case EnemyBase.ST_ENEMY_DEATH_SQUEEZE:
		this.gotoState(EnemyBase.ST_ENEMY_DEFEAT);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT:
		null !== this.m_healthBar && (this.m_healthBar.free(), this.m_healthBar = null),
		GameVillains.instance.addItems(this.m_x, this.m_y),
		GameVillains.instance.addScore(this.m_score),
		this.m_isAwaitingDelete = !0
	}
};
FlyerRanged.prototype.update = function(a) {
	this.firstUpdate || (this.onActionStand(), this.startAction(), this.firstUpdate = !0);
	this.m_baseAction && this.m_state !== EnemyBase.ST_ENEMY_DEFEAT && this.m_baseAction.baseUpdate(a);
	this.m_character.update(a);
	FlyerRanged.superClass_.update.call(this, a)
};
function BaseEnemyAction(a, b, c) {
	this.m_enemy = a;
	this.m_player = this.m_enemy.world().player();
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_baseState = BaseEnemyAction.ST_BASE_INIT;
	this.m_startupDelay = 0;
	this.m_isPaused = !1;
	this.m_speed = this.m_directionY = this.m_goalY = this.m_directionX = this.m_goalX = 0;
	this.m_savedParams = [];
	this.m_noiseX = 100;
	this.m_noiseY = 30;
	a = Math.sqrt((this.m_enemy.x() - b) * (this.m_enemy.x() - b) + (this.m_enemy.y() - c) * (this.m_enemy.y() - c));
	this.setGoal(b, c, a, !0);
	this.m_chargingTime = 0;
	this.m_maxChargingTime = Application.config.settings.bossChargingTime;
	this.m_numberOfPoints = 2;
	this.m_currentPoint = 0;
	this.m_limitTop = PlayerGame.OFFSET_UP;
	this.m_limitBot = this.m_player.world().camera().height - PlayerGame.OFFSET_DOWN;
	this.m_limitLeft = PlayerGame.OFFSET_LEFT;
	this.m_limitRight = this.m_player.world().camera().width - PlayerGame.OFFSET_RIGHT
}
BaseEnemyAction.ST_ACTION_NONE = 0;
BaseEnemyAction.ST_ACTION_INIT = 1;
BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT = 2;
BaseEnemyAction.ST_ACTION_WAITING = 3;
BaseEnemyAction.ST_ACTION_ATTACK = 4;
BaseEnemyAction.ST_ACTION_MOVE_LINEAR = 5;
BaseEnemyAction.ST_ACTION_MOVE_CIRCULAR = 6;
BaseEnemyAction.ST_ACTION_CHARGE = 7;
BaseEnemyAction.ST_ACTION_DESTRUCTION = 100;
BaseEnemyAction.ST_ACTION_WAIT_2 = 200;
BaseEnemyAction.ST_ACTION_TELEPORT_OUT = 10;
BaseEnemyAction.ST_ACTION_TELEPORT_IN = 11;
BaseEnemyAction.ST_ACTION_SUMMON = 150;
BaseEnemyAction.ST_ACTION_SPIKES = 151;
BaseEnemyAction.PARAM_X = "X";
BaseEnemyAction.PARAM_Y = "Y";
BaseEnemyAction.PARAM_SCALE = "scale";
BaseEnemyAction.PARAM_ANGLE = "angle";
BaseEnemyAction.ST_BASE_INIT = 1;
BaseEnemyAction.ST_BASE_STARTING = 2;
BaseEnemyAction.ST_BASE_PROGRESS = 3;
BaseEnemyAction.prototype.startAction = function(a) {
	this.m_startupDelay = a;
	0 < this.m_startupDelay ? this.m_baseState = BaseEnemyAction.ST_BASE_STARTING: (this.m_baseState = BaseEnemyAction.ST_BASE_PROGRESS, this.onActionStarted())
};
BaseEnemyAction.prototype.setPaused = function(a) {
	this.m_isPaused = a
};
BaseEnemyAction.prototype.onAttack = function() {};
BaseEnemyAction.prototype.onActionStarted = function() {};
BaseEnemyAction.prototype.update = function(a) {
	this.m_actionState === BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT && this.gotoSpot(a)
};
BaseEnemyAction.prototype.baseUpdate = function(a) {
	if (this.m_baseState !== BaseEnemyAction.ST_BASE_INIT) switch (this.m_baseState) {
	case BaseEnemyAction.ST_BASE_STARTING:
		this.m_startupDelay -= a;
		0 >= this.m_startupDelay && (this.m_baseState = BaseEnemyAction.ST_BASE_PROGRESS, this.onActionStarted());
		break;
	case BaseEnemyAction.ST_BASE_PROGRESS:
		this.update(a)
	}
};
BaseEnemyAction.prototype.gotoSpot = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_enemy.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_enemy.y()) * this.m_directionY || 0 === this.m_directionY) ? (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1)) : (this.m_actionTimer = this.m_moveCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.onActionStand(), this.m_enemy.setUntouchable(!1))
};
BaseEnemyAction.prototype.free = function() {
	this.m_savedParams = this.m_player = this.m_enemy = null
};
BaseEnemyAction.prototype.setGoal = function(a, b, c, d) {
	d ? (this.m_goalX = a + (8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? (Math.random() - 0.5) * this.m_noiseX: 0), this.m_goalY = b + (8 >= Global.savedNumData[Global.INDEX_CURRENT_ROOM] ? Math.random() * this.m_noiseY: 0)) : (this.m_goalX = a, this.m_goalY = b);
	this.m_directionX = (this.m_goalX - this.m_enemy.x()) / c;
	this.m_directionY = (this.m_goalY - this.m_enemy.y()) / c
};
BaseEnemyAction.prototype.loadPositionParams = function(a, b, c) {
	for (var d = []; a < b; a++) d.push(Application.config.vu_boss_positions[a][c]);
	return d
};
function ActionWandererMelee(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_enemy.setBodyDamage(b.touchDamage);
	this.m_speed = b.speedDisplace;
	this.m_moveCooldown = b.moveCooldown;
	this.m_chaseDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_damage = c.attackDamage;
	this.m_dashSpeed = c.attackSpeed;
	this.onWander = this.onChase = this.canChase = !1
}
goog.inherits(ActionWandererMelee, BaseEnemyAction);
ActionWandererMelee.prototype.setPaused = function(a) {
	ActionWandererMelee.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
ActionWandererMelee.prototype.onAttack = function() {};
ActionWandererMelee.prototype.onActionStarted = function() {
	this.updateMovement(0);
	this.m_actionState = BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT;
	this.m_enemy.onActionMove();
	this.m_enemy.setUntouchable(!0)
};
ActionWandererMelee.prototype.update = function(a) {
	if (this.m_actionState !== BaseEnemyAction.ST_ACTION_INIT && !this.m_isPaused) {
		if (this.m_actionState === BaseEnemyAction.ST_ACTION_WAITING && (this.m_actionTimer -= a, 0 >= this.m_actionTimer)) {
			this.onWander = this.canChase = !0;
			this.randomWandering();
			this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR;
			return
		}
		switch (this.m_actionState) {
		case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
			this.updateMovement(a);
			break;
		case BaseEnemyAction.ST_ACTION_ATTACK:
			this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING)
		}
		ActionWandererMelee.superClass_.update.call(this, a)
	}
};
ActionWandererMelee.prototype.updateMovement = function(a) {
	if (this.onChase) {
		var b = this.m_enemy.x() + a * this.m_dashSpeed * this.m_directionX;
		a = this.m_enemy.y() + a * this.m_dashSpeed * this.m_directionY;
		b = b >= this.m_limitRight ? this.m_limitRight: b;
		b = b <= this.m_limitLeft ? this.m_limitLeft: b;
		a = a >= this.m_limitBot ? this.m_limitBot: a;
		a = a <= this.m_limitTop ? this.m_limitTop: a;
		0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY ? (this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1), this.m_enemy.setPosition(b, a)) : (this.canChase = this.onChase = !1, this.m_enemy.onHit(this.m_damage), this.m_actionTimer = this.m_attackCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK)
	} else this.onWander && (b = this.m_enemy.x() + a * this.m_speed * this.m_directionX, a = this.m_enemy.y() + a * this.m_speed * this.m_directionY, 0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY ? (this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1), this.m_enemy.setPosition(b, a), this.checkDistanceToPlayer()) : (this.canChase = this.onWander = !1, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.onActionStand(), this.m_actionTimer = this.m_moveCooldown))
};
ActionWandererMelee.prototype.randomWandering = function() {
	var a = Common.random(this.m_limitLeft, this.m_limitRight),
	b = Common.random(this.m_limitTop, this.m_limitBot),
	a = a >= this.m_limitRight ? this.m_limitRight - 1 : a,
	a = a <= this.m_limitLeft ? this.m_limitLeft + 1 : a,
	b = b >= this.m_limitBot ? this.m_limitBot - 1 : b,
	b = b <= this.m_limitTop ? this.m_limitTop + 1 : b,
	c = Math.sqrt((a - this.m_enemy.x()) * (a - this.m_enemy.x()) + (b - this.m_enemy.y()) * (b - this.m_enemy.y()));
	this.m_directionX = (a - this.m_enemy.x()) / c;
	this.m_directionY = (b - this.m_enemy.y()) / c;
	this.setGoal(a, b, c, !1);
	this.m_enemy.onActionMove();
	this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR
};
ActionWandererMelee.prototype.checkDistanceToPlayer = function() {
	var a = Math.sqrt((this.m_player.x() - this.m_enemy.x()) * (this.m_player.x() - this.m_enemy.x()) + (this.m_player.y() - this.m_enemy.y()) * (this.m_player.y() - this.m_enemy.y()));
	if (a <= this.m_chaseDistance && !this.onChase && this.canChase) {
		this.onChase = !0;
		this.onWander = this.canChase = !1;
		var b = this.m_player.x() >= this.m_limitRight ? this.m_limitRight - 1 : this.m_player.x() <= this.m_limitLeft ? this.m_limitLeft + 1 : this.m_player.x(),
		c = this.m_player.y() >= this.m_limitBot ? this.m_limitBot - 1 : this.m_player.y() <= this.m_limitTop ? this.m_limitTop + 1 : this.m_player.y();
		this.setGoal(b, c, a, !1);
		this.m_enemy.onActionMove();
		this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR
	}
};
function ActionRanged(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_enemy.setBodyDamage(b.touchDamage);
	this.m_speed = b.speedDisplace;
	this.m_shootDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_moveCooldown = b.moveCooldown;
	this.m_shootWhileMoving = 1 === b.attackWhileMoving;
	this.m_numberOfShots = b.numberOfAttacks;
	this.m_shootingAngle = b.shootingAngle;
	this.m_attackSpeed = c.attackSpeed;
	this.m_damage = c.attackDamage;
	this.m_shotType = c.shotType;
	this.m_ease = c.ease;
	this.m_currentShots = this.m_angle = 0;
	this.m_shootingAngleIncrease = this.m_shootingAngle / (this.m_numberOfShots - 1);
	this.m_shootY = this.m_shootX = this.m_shootTimer = 0
}
goog.inherits(ActionRanged, BaseEnemyAction);
ActionRanged.prototype.setPaused = function(a) {
	ActionRanged.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
ActionRanged.prototype.onAttack = function() {};
ActionRanged.prototype.onActionStarted = function() {
	this.updateMovement(0);
	this.m_actionState = BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT;
	this.m_enemy.onActionMove();
	this.m_enemy.setUntouchable(!0)
};
ActionRanged.prototype.update = function(a) {
	if (this.m_actionState !== BaseEnemyAction.ST_ACTION_INIT && !this.m_isPaused) {
		switch (this.m_actionState) {
		case BaseEnemyAction.ST_ACTION_WAITING:
			this.m_actionTimer -= a;
			0 >= this.m_actionTimer && (this.randomWandering(), this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR);
			this.onShoot = !1;
			break;
		case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
			this.updateMovement(a);
			break;
		case BaseEnemyAction.ST_ACTION_ATTACK:
			if (this.m_actionTimer -= a, 0 >= this.m_actionTimer) {
				if (this.m_currentShots === this.m_numberOfShots) {
					this.m_currentShots = 0;
					this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING;
					return
				}
				this.m_currentShots++;
				this.checkDistanceToPlayer();
				this.onShoot = !1
			}
		}
		ActionRanged.superClass_.update.call(this, a)
	}
};
ActionRanged.prototype.updateMovement = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY;
	b = b >= this.m_limitRight ? this.m_limitRight: b;
	b = b <= this.m_limitLeft ? this.m_limitLeft: b;
	a = a >= this.m_limitBot ? this.m_limitBot: a;
	a = a <= this.m_limitTop ? this.m_limitTop: a;
	0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY ? (this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1), this.m_enemy.setPosition(b, a), this.m_shootWhileMoving && this.checkDistanceToPlayer()) : (this.m_enemy.setPosition(b, a), this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_angle = -this.m_shootingAngle / 2, this.m_shootX = this.m_enemy.world().player().x(), this.m_shootY = this.m_enemy.world().player().y())
};
ActionRanged.prototype.randomWandering = function() {
	var a = Common.random(this.m_limitLeft, this.m_limitRight),
	b = Common.random(this.m_limitTop, this.m_limitBot),
	a = a >= this.m_limitRight ? this.m_limitRight - 1 : a,
	a = a <= this.m_limitLeft ? this.m_limitLeft + 1 : a,
	b = b >= this.m_limitBot ? this.m_limitBot - 1 : b,
	b = b <= this.m_limitTop ? this.m_limitTop + 1 : b;
	Application.log("X:" + a + " Y:" + b);
	var c = Math.sqrt((a - this.m_enemy.x()) * (a - this.m_enemy.x()) + (b - this.m_enemy.y()) * (b - this.m_enemy.y()));
	this.setGoal(a, b, c, !1);
	this.m_enemy.onActionMove();
	this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR
};
ActionRanged.prototype.shootAtPlayer = function(a) {
	this.m_currentShots < this.m_numberOfShots ? (this.m_shootTimer += a, this.m_shootTimer >= this.m_attackCooldown && (this.m_enemy.onActionAttack(), this.m_enemy.onShoot(this.m_shotType, ShotHandler.ON_TARGET, this.m_attackSpeed, this.m_damage, this.m_angle, this.m_shootX, this.m_shootY, this.m_ease), this.m_currentShots++, this.m_angle += this.m_shootingAngleIncrease, this.m_shootTimer -= this.m_attackCooldown)) : (this.m_enemy.onActionStand(), this.m_shootTimer = this.m_currentShots = 0, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_actionTimer = 0)
};
ActionRanged.prototype.checkDistanceToPlayer = function() {
	Math.sqrt((this.m_player.x() - this.m_enemy.x()) * (this.m_player.x() - this.m_enemy.x()) + (this.m_player.y() - this.m_enemy.y()) * (this.m_player.y() - this.m_enemy.y())) <= this.m_shootDistance && !this.onShoot && (this.onShoot = !0, this.onRoam = !1, this.m_actionTimer = this.m_attackCooldown, Application.instance.playSound("SND_ENEMY_ATTACK2"), this.m_enemy.onShoot(this.m_shotType, ShotHandler.AGAINST_PLAYER, this.m_attackSpeed, this.m_damage, 0, 0, 0, this.m_ease), this.m_actionState = this.m_shootWhileMoving ? BaseEnemyAction.ST_ACTION_WAITING: BaseEnemyAction.ST_ACTION_ATTACK)
};
function ActionTutorialDummy(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, c, d);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_moveCooldown = b.moveCooldown;
	this.m_chaseDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.standPointX = Application.config.vu_boss_positions[e + Application.config.settings.dummyTutorialPosition].X;
	this.standPointY = Application.config.vu_boss_positions[e + Application.config.settings.dummyTutorialPosition].Y
}
goog.inherits(ActionTutorialDummy, BaseEnemyAction);
ActionTutorialDummy.prototype.setPaused = function(a) {
	ActionTutorialDummy.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
ActionTutorialDummy.prototype.onActionStarted = function() {
	this.updateMovement(0);
	this.m_enemy.onActionMove();
	this.m_enemy.setUntouchable(!0);
	this.m_actionState = BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT
};
ActionTutorialDummy.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT:
		this.gotoSpot(a);
		break;
	case BaseEnemyAction.ST_ACTION_WAITING:
		this.m_actionTimer -= a;
		0 >= this.m_actionTimer && (a = Math.sqrt((this.m_enemy.x() - this.standPointX) * (this.m_enemy.x() - this.standPointX) + (this.m_enemy.y() - this.standPointY) * (this.m_enemy.y() - this.standPointY)), this.setGoal(this.standPointX, this.standPointY, a, !1), this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR);
		break;
	case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
		this.updateMovement(a)
	}
};
ActionTutorialDummy.prototype.gotoSpot = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_enemy.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_enemy.y()) * this.m_directionY || 0 === this.m_directionY) ? (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1)) : (this.m_actionTimer = this.m_moveCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.onActionStand(), this.m_enemy.setUntouchable(!1))
};
ActionTutorialDummy.prototype.updateMovement = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_enemy.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_enemy.y()) * this.m_directionY || 0 === this.m_directionY) ? (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1)) : (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_enemy.onActionStand())
};
function BaseBoss(a, b, c, d, e, f, g, h) {
	EnemyBase.call(this, a, b, c, f, d, e);
	this.m_maxHealth = this.m_health = g.health;
	this.m_skin = g.skin;
	this.m_score = g.score;
	this.m_angle = h * Math.PI / 180;
	this.m_baseActionSet = [];
	this.m_hpThresholds = [];
	this.m_summonHp = [];
	this.m_summonWaveCounter = 0;
	this.m_summonEffect = null;
	this.m_savedScaleX = 1;
	this.m_currentPosition = 0;
	this.m_summoningDone = !1;
	this.m_bossId = Global.savedNumData[Global.INDEX_CURRENT_ROOM] - 8;
	this.m_isDead = !1;
	this.m_explodingTime = 0;
	this.m_maxExplodingTime = Application.config.settings.bossExplodingTime;
	this.m_introTimer = 0;
	this.m_maxIntroTimer = Application.config.settings.bossIntroTimer;
	this.m_onIntro = !1;
	this.m_introMessage = "";
	this.onDialogue = !1;
	this.m_positionEffect = [];
	this.m_countEffect = this.m_timeEffect = 0;
	this.m_outroMessage = "";
	this.m_shieldEffect = null
}
goog.inherits(BaseBoss, EnemyBase);
BaseBoss.prototype.skinBoss = function() {
	return this.m_skin
};
BaseBoss.prototype.bossId = function() {
	return this.m_bossId
};
BaseBoss.prototype.isAnimDestroying = function() {
	return this.m_state === EnemyBase.ST_ENEMY_DEFEAT || this.m_state === EnemyBase.ST_ENEMY_DEFEAT_2 || this.m_state === EnemyBase.ST_ENEMY_DEFEAT_END
};
BaseBoss.prototype.startIntroTimer = function() {
	PlayerGame.instance.setKeyboardEnabled(!1);
	this.onDialogue = this.m_onIntro = !0;
	this.m_panelNumber = 0;
	this.nextDialoguePanel()
};
BaseBoss.prototype.nextDialoguePanel = function() {};
BaseBoss.prototype.startOutroTime = function() {
	this.onDialogue = this.m_onOutro = !0;
	this.m_panelNumber = 0;
	this.nextDialoguePanel()
};
BaseBoss.prototype.noShieldUntouchable = function(a) {
	this.m_untouchable = a
};
BaseBoss.prototype.setUntouchable = function(a) {
	BaseBoss.superClass_.setUntouchable.call(this, a);
	a ? this.m_shieldEffect || (this.m_shieldEffect = Application.instance.getClip("mcShieldBoss"), this.m_shieldEffect.setPosition(this.m_x, this.m_y), this.m_canvas.addChild(this.m_shieldEffect.sprite), this.m_shieldEffect.sprite._depth = 10 * this.m_y + 1) : this.m_shieldEffect && (this.m_shieldEffect.free(), this.m_shieldEffect = null)
};
BaseBoss.prototype.hasShieldOn = function() {
	return null !== this.m_shieldEffect
};
BaseBoss.prototype.onActionAttack2 = function() {
	this.gotoState(EnemyBase.ST_ENEMY_ATTACK_2)
};
BaseBoss.prototype.onActionCharge = function() {
	this.gotoState(EnemyBase.ST_ENEMY_CHARGE)
};
BaseBoss.prototype.onActionTeleportOut = function() {
	Application.instance.playSound("SND_BOSS_TELEPORT");
	this.gotoState(EnemyBase.ST_ENEMY_DISAPPEAR)
};
BaseBoss.prototype.onActionTeleportIn = function() {
	this.gotoState(EnemyBase.ST_ENEMY_APPEAR)
};
BaseBoss.prototype.onActionDash = function() {
	this.gotoState(EnemyBase.ST_ENEMY_DASH)
};
BaseBoss.prototype.onActionSummon = function() {
	this.gotoState(EnemyBase.ST_ENEMY_SUMMON_INTRO);
	Application.instance.playSound("SND_BOSS_CALL_ENEMYS")
};
BaseBoss.prototype.currentPosition = function() {
	return this.m_currentPosition
};
BaseBoss.prototype.placeAtPosition = function(a) {
	this.m_currentPosition = a
};
BaseBoss.prototype.summoningDone = function() {
	return this.m_summoningDone
};
BaseBoss.prototype.resetSummoning = function() {
	this.m_summoningDone = !1
};
BaseBoss.prototype.gotoState = function(a) {
	BaseBoss.superClass_.gotoState.call(this, a);
	a === EnemyBase.ST_ENEMY_DEFEAT && (this.m_untouchable = this.m_isDead = !0)
};
BaseBoss.prototype.update = function(a) {
	this.firstUpdate || (this.onActionStand(), this.startNextAction(), this.firstUpdate = !0);
	this.m_baseAction && !this.m_isDead && this.m_baseAction.baseUpdate(a);
	this.m_summonEffect && this.m_summonEffect.update(a);
	this.m_shieldEffect && (this.m_shieldEffect.setPosition(this.m_x, this.m_y), this.m_shieldEffect.sprite._depth = 10 * this.m_y + 1, this.m_shieldEffect.update(a));
	this.m_character.update(a);
	BaseBoss.superClass_.update.call(this, a)
};
BaseBoss.prototype.addAction = function(a, b) {
	this.m_baseActionSet.push(a);
	this.m_hpThresholds.push(b)
};
BaseBoss.prototype.startNextAction = function() {
	this.m_baseActionSet[0] && (this.setAction(this.m_baseActionSet[0]), this.startAction(), this.m_baseActionSet.shift(), this.m_hpThresholds.shift())
};
BaseBoss.prototype.free = function() {
	for (var a = 0; a < this.m_baseActionSet.length; a++) this.m_baseActionSet[a] && (this.m_baseActionSet[a].free(), this.m_baseActionSet[a] = null);
	this.m_hpThresholds = this.m_baseActionSet = null;
	this.m_shieldEffect && (this.m_shieldEffect.free(), this.m_shieldEffect = null);
	this.m_positionEffect = null;
	BaseBoss.superClass_.free.call(this)
};
BaseBoss.prototype.onTarget = function(a) {};
BaseBoss.prototype.onPlayerEndMove = function() {};
BaseBoss.prototype.onPlayerInitAttack = function() {};
BaseBoss.prototype.onHitBullet = function(a, b) {
	if (this.m_untouchable) return Application.instance.playSound("SND_ENEMY_HIT_SHIELD"),
	!1;
	this.m_health -= this.m_player.activeDoubleDamage() ? 2 * a: a;
	Application.instance.playSound("SND_BOSS_DAMAGE2");
	HudGame.instance.setBossHpBar(100 * this.m_health / this.m_maxHealth);
	0 >= this.m_health ? (this.startOutroTime(), this.gotoState(EnemyBase.ST_ENEMY_DEFEAT), this.m_untouchable = !0, Global.savedNumData[Global.INDEX_BOSSES_KILLED]++, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))) : (this.gotoState(EnemyBase.ST_ENEMY_HIT), this.m_baseAction.setPaused(!0));
	this.m_health < this.m_hpThresholds[0] && this.startNextAction();
	return ! 0
};
function BossPsychobot(a, b, c, d, e, f, g, h) {
	BaseBoss.call(this, a, b, c, d, e, f, g, h);
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SHOUT, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_2, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_INTRO, this.m_skin + "_spawn_minions");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_STAND, this.m_skin + "_spawn_minions_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_OUTRO, this.m_skin + "_spawn_minions_end");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN, this.m_skin + "_win");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_summonAnimCount = 0;
	this.m_maxSummonAnimCount = 3;
	this.m_chargeAnimCount = 0;
	this.m_positionEffect = [[ - 43, -10], [80, -55], [7, -70], [ - 42, -21], [25, -30]];
	this.m_maxChargeAnimCount = 3;
	this.bossFace = 2
}
goog.inherits(BossPsychobot, BaseBoss);
BossPsychobot.prototype.nextDialoguePanel = function() {
	this.m_panelNumber++;
	HudGame.instance.showPanelTutorial(!1, "STR_INFO", !1, this.bossFace, !1, !1);
	HudGame.instance.startTutorial = !1;
	if (this.m_onIntro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_PSYCHOBOT_INTRO_1", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		this.onDialogue = this.m_onIntro = !1,
		PlayerGame.instance.setKeyboardEnabled(!0),
		this.gotoState(EnemyBase.ST_ENEMY_WIN)
	} else if (this.m_onOutro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_PSYCHOBOT_OUTRO_1", !1, this.bossFace, !0, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		Global.achievements.checkAchBossKicker()
	}
};
BossPsychobot.prototype.onActionShout = function() {
	this.onActionStand();
	this.startIntroTimer()
};
BossPsychobot.prototype.onEndAnimation = function(a) {
	switch (a) {
	case EnemyBase.ST_ENEMY_APPEAR:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_STAND:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_WALK:
		this.onActionMove();
		break;
	case EnemyBase.ST_ENEMY_ATTACK:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_HIT:
		this.gotoPreviousState();
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT:
		Global.game.world().actorManager().killAllEnemies();
		HudGame.instance.showBossBar(!1, 0);
		GameVillains.instance.addScore(this.m_score);
		this.gotoState(EnemyBase.ST_ENEMY_DEFEAT_2);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT_2:
		this.m_explodingTime++;
		this.m_explodingTime >= this.m_maxExplodingTime && (GameVillains.instance.addEffect("mcExplosiveBomb", this.m_x, this.m_y), this.m_isAwaitingDelete = !0);
		break;
	case EnemyBase.ST_ENEMY_WIN:
		this.startNextAction();
		HudGame.instance.showBossBar(!0, this.m_bossId);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_INTRO:
		this.gotoState(EnemyBase.ST_ENEMY_SUMMON_STAND);
		this.m_summonEffect = Application.instance.getClip("mcSummon");
		this.m_summonEffect.setPosition(this.m_x, this.m_y);
		this.m_canvas.addChild(this.m_summonEffect.sprite);
		this.m_summonEffect.sprite._depth = 10 * this.m_y + 1;
		break;
	case EnemyBase.ST_ENEMY_SUMMON_STAND:
		this.m_summonAnimCount++;
		this.m_summonAnimCount >= this.m_maxSummonAnimCount && (this.gotoState(EnemyBase.ST_ENEMY_SUMMON_OUTRO), this.m_summonEffect.free(), this.m_summonEffect = null, this.m_summonAnimCount = 0);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_OUTRO:
		this.m_summoningDone = !0
	}
};
BossPsychobot.prototype.update = function(a) {
	BossPsychobot.superClass_.update.call(this, a);
	this.onDialogue && (this.m_introTimer += a, this.m_introTimer >= this.m_maxIntroTimer && (this.m_introTimer = 0, this.nextDialoguePanel()));
	this.m_state !== EnemyBase.ST_ENEMY_DEFEAT_2 || this.m_isAwaitingDelete || (this.m_timeEffect += a, 100 <= this.m_timeEffect && (this.m_timeEffect = 0, GameVillains.instance.addEffect("mcMissileExplode", this.m_x + this.m_positionEffect[this.m_countEffect][0], this.m_y + this.m_positionEffect[this.m_countEffect][1]), Application.instance.playSound("SND_BOSS_EXPLOSION2"), this.m_countEffect += 1, 4 < this.m_countEffect && (this.m_countEffect = 0)))
};
function BossBlinkingInAction(a, b, c) {
	BaseEnemyAction.call(this, a, b, c);
	this.m_speed = 0.1
}
goog.inherits(BossBlinkingInAction, BaseEnemyAction);
BossBlinkingInAction.prototype.setPaused = function(a) {
	this.m_isPaused = a
};
BossBlinkingInAction.prototype.onAttack = function() {};
BossBlinkingInAction.prototype.onActionStarted = function() {
	this.m_actionState = BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT;
	this.m_enemy.setUntouchable(!0)
};
BossBlinkingInAction.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT:
		this.gotoSpot(a);
		break;
	case BaseEnemyAction.ST_ACTION_WAITING:
		this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_enemy.onActionShout(), this.m_enemy.fadingOut = !1, this.m_actionState = BaseEnemyAction.ST_ACTION_WAIT_2)
	}
};
BossBlinkingInAction.prototype.baseUpdate = function(a) {
	if (this.m_baseState !== BaseEnemyAction.ST_BASE_INIT) switch (this.m_baseState) {
	case BaseEnemyAction.ST_BASE_STARTING:
		this.m_startupDelay -= a;
		0 >= this.m_startupDelay && (this.m_baseState = BaseEnemyAction.ST_BASE_PROGRESS, this.onActionStarted());
		break;
	case BaseEnemyAction.ST_BASE_PROGRESS:
		this.update(a)
	}
};
BossBlinkingInAction.prototype.gotoSpot = function(a) {
	this.m_enemy.setPosition(this.m_goalX, this.m_goalY);
	this.m_enemy.onActionTeleportIn();
	this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1);
	this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING
};
BossBlinkingInAction.prototype.free = function() {
	this.m_savedParams = this.m_player = this.m_enemy = null
};
BossBlinkingInAction.prototype.setGoal = function(a, b, c, d) {
	this.m_goalX = a;
	this.m_goalY = b;
	this.m_directionX = (a - this.m_enemy.x()) / c;
	this.m_directionY = (b - this.m_enemy.y()) / c
};
function PsychobotTeleport1(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_shootDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_moveCooldown = b.moveCooldown;
	this.m_shootWhileMoving = 1 === b.attackWhileMoving;
	this.m_numberOfShots = b.numberOfAttacks;
	this.m_shootingAngle = b.shootingAngle;
	this.m_attackSpeed = c.attackSpeed;
	this.m_damage = c.attackDamage;
	this.m_shotType = c.shotType;
	this.m_ease = c.ease;
	this.m_currentShots = this.m_angle = 0;
	this.m_shootingAngleIncrease = this.m_shootingAngle / (this.m_numberOfShots - 1);
	this.m_shootY = this.m_shootX = this.m_shootDistance = this.m_shootTimer = 0;
	this.m_currentPosition = this.m_enemy.currentPosition();
	a = Application.config.settings.psychobotStartPosition1;
	b = Application.config.settings.psychobotEndPosition1;
	this.m_positionArrayX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_positionArrayY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_scaleArray = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_SCALE);
	this.m_teleportCooldown = 300;
	this.m_enemy.setShootingOffset( - 85, -115)
}
goog.inherits(PsychobotTeleport1, BaseEnemyAction);
PsychobotTeleport1.prototype.setPaused = function(a) {
	PsychobotTeleport1.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
PsychobotTeleport1.prototype.onAttack = function() {};
PsychobotTeleport1.prototype.onActionStarted = function() {
	this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT;
	this.m_enemy.onActionTeleportOut();
	this.m_enemy.onActionStand();
	this.m_enemy.setUntouchable(!0);
	this.m_actionTimer = this.m_teleportCooldown
};
PsychobotTeleport1.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_TELEPORT_OUT:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_teleportCooldown, this.teleport(), this.m_enemy.onActionTeleportIn(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN));
		break;
	case BaseEnemyAction.ST_ACTION_TELEPORT_IN:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_attackCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE, this.m_enemy.setUntouchable(!0), this.m_enemy.onActionCharge()));
		break;
	case BaseEnemyAction.ST_ACTION_CHARGE:
		this.m_chargingTime += a;
		this.m_chargingTime >= this.m_maxChargingTime && (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_enemy.setUntouchable(!1), this.m_chargingTime = 0);
		break;
	case BaseEnemyAction.ST_ACTION_WAITING:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_teleportCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.onActionTeleportOut(), this.m_enemy.setUntouchable(!0)));
		break;
	case BaseEnemyAction.ST_ACTION_ATTACK:
		this.shootAtPlayer(a)
	}
};
PsychobotTeleport1.prototype.teleport = function() {
	this.m_currentPosition++;
	var a = this.m_currentPosition % this.m_positionArrayX.length;
	this.m_enemy.setPosition(this.m_positionArrayX[a], this.m_positionArrayY[a]);
	this.m_enemy.placeAtPosition(this.m_currentPosition);
	this.m_enemy.setSavedScaleX(this.m_scaleArray[a])
};
PsychobotTeleport1.prototype.baseUpdate = function(a) {
	if (this.m_baseState !== BaseEnemyAction.ST_BASE_INIT) switch (this.m_baseState) {
	case BaseEnemyAction.ST_BASE_STARTING:
		this.m_startupDelay -= a;
		0 >= this.m_startupDelay && (this.m_baseState = BaseEnemyAction.ST_BASE_PROGRESS, this.onActionStarted());
		break;
	case BaseEnemyAction.ST_BASE_PROGRESS:
		this.update(a)
	}
};
PsychobotTeleport1.prototype.free = function() {
	this.m_savedParams = this.m_player = this.m_enemy = null
};
PsychobotTeleport1.prototype.shootAtPlayer = function(a) {
	this.m_currentShots < this.m_numberOfShots ? (this.m_shootTimer += a, this.m_shootTimer >= this.m_attackCooldown && (this.m_enemy.onActionAttack(), Application.instance.playSound("SND_ENEMY_ATTACK2"), this.m_enemy.onShoot(this.m_shotType, ShotHandler.AGAINST_PLAYER, this.m_attackSpeed, this.m_damage, this.m_angle, this.m_shootX, this.m_shootY, this.m_ease), this.m_currentShots++, this.m_angle += this.m_shootingAngleIncrease, this.m_shootTimer -= this.m_attackCooldown)) : (this.m_enemy.onActionStand(), this.m_shootTimer = this.m_currentShots = 0, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_actionTimer = this.m_moveCooldown)
};
PsychobotTeleport1.prototype.free = function() {
	PsychobotTeleport1.superClass_.free.call(this);
	this.m_scaleArray = this.m_positionArrayY = this.m_positionArrayX = null
};
function PsychobotTeleport2(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_shootDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_moveCooldown = b.moveCooldown;
	this.m_shootWhileMoving = 1 === b.attackWhileMoving;
	this.m_numberOfShots = b.numberOfAttacks;
	this.m_shootingAngle = b.shootingAngle;
	this.m_attackSpeed = c.attackSpeed;
	this.m_damage = c.attackDamage;
	this.m_shotType = c.shotType;
	this.m_ease = c.ease;
	this.m_currentShots = this.m_angle = 0;
	this.m_shootingAngleIncrease = this.m_shootingAngle / (this.m_numberOfShots - 1);
	this.m_shootY = this.m_shootX = this.m_shootDistance = this.m_shootTimer = 0;
	this.m_currentPosition = this.m_enemy.currentPosition();
	a = Application.config.settings.psychobotStartPosition2;
	b = Application.config.settings.psychobotEndPosition2;
	this.m_positionArrayX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_positionArrayY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_scaleArray = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_SCALE);
	this.m_teleportCooldown = 300;
	this.m_teleportCount = 0;
	this.m_teleportCountLimit = Application.config.settings.psychobotSummonCount;
	this.m_summonIndex = 1;
	this.m_maxSummonIndex = Application.config.settings.psychobotTotalWaves;
	this.m_enemy.setShootingOffset( - 85, -115)
}
goog.inherits(PsychobotTeleport2, BaseEnemyAction);
PsychobotTeleport2.prototype.setPaused = function(a) {
	PsychobotTeleport2.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
PsychobotTeleport2.prototype.onAttack = function() {};
PsychobotTeleport2.prototype.onActionStarted = function() {
	this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT;
	this.m_enemy.onActionTeleportOut();
	this.m_enemy.setUntouchable(!0);
	this.m_enemy.onActionStand();
	this.m_actionTimer = this.m_teleportCooldown
};
PsychobotTeleport2.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_TELEPORT_OUT:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_teleportCooldown, this.teleport(), this.m_enemy.onActionTeleportIn(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN, this.m_teleportCount++));
		break;
	case BaseEnemyAction.ST_ACTION_TELEPORT_IN:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_teleportCount >= this.m_teleportCountLimit ? (this.m_teleportCount = 0, this.m_actionTimer = this.m_attackCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_SUMMON) : (this.m_actionTimer = this.m_attackCooldown, this.m_enemy.onActionCharge(), this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE), this.m_enemy.setUntouchable(!0)));
		break;
	case BaseEnemyAction.ST_ACTION_CHARGE:
		this.m_chargingTime += a;
		this.m_chargingTime >= this.m_maxChargingTime && (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_enemy.setUntouchable(!1), this.m_chargingTime = 0);
		break;
	case BaseEnemyAction.ST_ACTION_WAITING:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_teleportCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.onActionTeleportOut(), this.m_enemy.setUntouchable(!0)));
		break;
	case BaseEnemyAction.ST_ACTION_ATTACK:
		this.shootAtPlayer(a);
		break;
	case BaseEnemyAction.ST_ACTION_SUMMON:
		if (this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_INTRO && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_STAND && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_OUTRO) this.m_enemy.onActionSummon();
		this.m_enemy.summoningDone() && (this.m_enemy.resetSummoning(), GameVillains.instance.world().actorManager().initWave(this.m_summonIndex), this.m_summonIndex++, this.m_summonIndex = this.m_summonIndex >= this.m_maxSummonIndex ? this.m_maxSummonIndex: this.m_summonIndex, this.m_actionTimer = this.m_attackCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_enemy.setUntouchable(!1), this.m_enemy.onActionStand())
	}
};
PsychobotTeleport2.prototype.baseUpdate = function(a) {
	if (this.m_baseState !== BaseEnemyAction.ST_BASE_INIT) switch (this.m_baseState) {
	case BaseEnemyAction.ST_BASE_STARTING:
		this.m_startupDelay -= a;
		0 >= this.m_startupDelay && (this.m_baseState = BaseEnemyAction.ST_BASE_PROGRESS, this.onActionStarted());
		break;
	case BaseEnemyAction.ST_BASE_PROGRESS:
		this.update(a)
	}
};
PsychobotTeleport2.prototype.teleport = function() {
	this.m_currentPosition++;
	var a = this.m_currentPosition % this.m_positionArrayX.length;
	this.m_enemy.setPosition(this.m_positionArrayX[a], this.m_positionArrayY[a]);
	this.m_enemy.placeAtPosition(this.m_currentPosition);
	this.m_enemy.setSavedScaleX(this.m_scaleArray[a])
};
PsychobotTeleport2.prototype.shootAtPlayer = function(a) {
	this.m_currentShots < this.m_numberOfShots ? (this.m_shootTimer += a, this.m_shootTimer >= this.m_attackCooldown && (this.m_enemy.onActionAttack(), Application.instance.playSound("SND_ENEMY_ATTACK2"), this.m_enemy.onShoot(this.m_shotType, ShotHandler.AGAINST_PLAYER, this.m_attackSpeed, this.m_damage, this.m_angle, this.m_shootX, this.m_shootY, this.m_ease), this.m_currentShots++, this.m_angle += this.m_shootingAngleIncrease, this.m_shootTimer -= this.m_attackCooldown)) : (this.m_enemy.onActionStand(), this.m_shootTimer = this.m_currentShots = 0, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_actionTimer = this.m_moveCooldown)
};
PsychobotTeleport2.prototype.free = function() {
	PsychobotTeleport2.superClass_.free.call(this);
	this.m_scaleArray = this.m_positionArrayY = this.m_positionArrayX = null
};
function BossGremoblin(a, b, c, d, e, f, g, h) {
	BaseBoss.call(this, a, b, c, d, e, f, g, h);
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SHOUT, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_2, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_END, this.m_skin + "_defeat_end");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_INTRO, this.m_skin + "_callminions_intro");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_STAND, this.m_skin + "_callminions_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_OUTRO, this.m_skin + "_callminions_end");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN, this.m_skin + "_win");
	this.m_character.addState(EnemyBase.ST_ENEMY_DASH, this.m_skin + "_dash");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_valueSndDeffect = this.m_summonAnimCount = 0;
	this.m_maxSummonAnimCount = 3;
	this.m_invulnerableBack = !0;
	this.bossFace = 6
}
goog.inherits(BossGremoblin, BaseBoss);
BossGremoblin.prototype.nextDialoguePanel = function() {
	this.m_panelNumber++;
	HudGame.instance.showPanelTutorial(!1, "STR_INFO", !1, this.bossFace, !1, !1);
	HudGame.instance.startTutorial = !1;
	if (this.m_onIntro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_GREMOBLIN_INTRO_1", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		this.onDialogue = this.m_onIntro = !1,
		PlayerGame.instance.setKeyboardEnabled(!0),
		this.gotoState(EnemyBase.ST_ENEMY_WIN)
	} else if (this.m_onOutro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_GREMOBLIN_OUTRO_1", !1, this.bossFace, !0, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		Global.achievements.checkAchBossKicker()
	}
};
BossGremoblin.prototype.onActionShout = function() {
	this.onActionStand();
	this.startIntroTimer()
};
BossGremoblin.prototype.setInvulnerableBack = function(a) {
	this.m_invulnerableBack = a
};
BossGremoblin.prototype.resetHitByDash = function(a) {
	this.m_hitByDash = a
};
BossGremoblin.prototype.gotoState = function(a) {
	BossGremoblin.superClass_.gotoState.call(this, a);
	switch (a) {
	case EnemyBase.ST_ENEMY_SUMMON_STAND:
	case EnemyBase.ST_ENEMY_WIN:
		Application.instance.playSound("SND_BOSS_GREMOBLIN");
		break;
	case EnemyBase.ST_ENEMY_DASH:
		Application.instance.playSound("SND_POWERUP_MULTISHOT_FLASHES2")
	}
};
BossGremoblin.prototype.onEndAnimation = function(a) {
	switch (a) {
	case EnemyBase.ST_ENEMY_DASH:
		this.onActionDash();
		break;
	case EnemyBase.ST_ENEMY_APPEAR:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_STAND:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_WALK:
		this.onActionMove();
		break;
	case EnemyBase.ST_ENEMY_ATTACK:
		this.canChase = !1;
		this.m_baseAction.setPaused(!1);
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_HIT:
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT:
		Global.game.world().actorManager().killAllEnemies();
		HudGame.instance.showBossBar(!1, 0);
		GameVillains.instance.addScore(this.m_score);
		this.gotoState(EnemyBase.ST_ENEMY_DEFEAT_2);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT_2:
		this.m_explodingTime++;
		this.m_explodingTime >= this.m_maxExplodingTime && this.gotoState(EnemyBase.ST_ENEMY_DEFEAT_END);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT_END:
		this.gotoState(EnemyBase.ST_ENEMY_DISAPPEAR);
		break;
	case EnemyBase.ST_ENEMY_DISAPPEAR:
		this.m_isAwaitingDelete = !0;
		break;
	case EnemyBase.ST_ENEMY_WIN:
		this.startNextAction();
		HudGame.instance.showBossBar(!0, this.m_bossId);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_INTRO:
		this.gotoState(EnemyBase.ST_ENEMY_SUMMON_STAND);
		this.m_summonEffect = Application.instance.getClip("mcSummon");
		this.m_summonEffect.setPosition(this.m_x, this.m_y);
		this.m_canvas.addChild(this.m_summonEffect.sprite);
		this.m_summonEffect.sprite._depth = 10 * this.m_y + 1;
		break;
	case EnemyBase.ST_ENEMY_SUMMON_STAND:
		this.m_summonAnimCount++;
		this.m_summonAnimCount >= this.m_maxSummonAnimCount ? (this.gotoState(EnemyBase.ST_ENEMY_SUMMON_OUTRO), this.m_summonEffect.free(), this.m_summonEffect = null, this.m_summonAnimCount = 0) : this.gotoState(EnemyBase.ST_ENEMY_SUMMON_STAND);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_OUTRO:
		this.m_summoningDone = !0
	}
};
BossGremoblin.prototype.onHitBullet = function(a, b) {
	if (this.m_untouchable) return Application.instance.playSound("SND_ENEMY_HIT_SHIELD"),
	!1;
	this.m_health -= this.m_player.activeDoubleDamage() ? 2 * a: a;
	Application.instance.playSound("SND_BOSS_DAMAGE2");
	HudGame.instance.setBossHpBar(100 * this.m_health / this.m_maxHealth);
	0 >= this.m_health ? (this.startOutroTime(), this.gotoState(EnemyBase.ST_ENEMY_DEFEAT), Application.instance.playSound("SND_BOSS_GREMOBLIN"), this.m_untouchable = !0, Global.savedNumData[Global.INDEX_BOSSES_KILLED]++, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))) : (Application.instance.playSound("SND_PLAYER_DIES"), this.gotoState(EnemyBase.ST_ENEMY_HIT), this.m_baseAction.setPaused(!0));
	this.m_health < this.m_hpThresholds[0] && this.startNextAction();
	return ! 0
};
BossGremoblin.prototype.update = function(a) {
	BossGremoblin.superClass_.update.call(this, a);
	this.onDialogue && (this.m_introTimer += a, this.m_introTimer >= this.m_maxIntroTimer && (this.m_introTimer = 0, this.nextDialoguePanel()));
	this.m_state === EnemyBase.ST_ENEMY_DEFEAT_2 && (this.m_valueSndDeffect += a, 1E3 <= this.m_valueSndDeffect && (this.m_valueSndDeffect = 0, Application.instance.playSound("SND_BOSS_GREMOBLIN")))
};
function GremoblinSpikes(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_moveCooldown = b.moveCooldown;
	this.m_chaseDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_damage = c.attackDamage;
	this.m_dashSpeed = c.attackSpeed;
	this.onWander = this.onChase = this.canChase = !1;
	this.m_attackCount = 0;
	this.m_attackCountLimit = Application.config.settings.gremoblinSpikeCount;
	this.m_spikePattern = this.m_doingSpikes = !1;
	a = Application.config.settings.gremoblinStartPosition1;
	b = Application.config.settings.gremoblinEndPosition1;
	this.m_spikeSpotsX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_spikeSpotsY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_spikeScales = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_SCALE)
}
goog.inherits(GremoblinSpikes, BaseEnemyAction);
GremoblinSpikes.prototype.setPaused = function(a) {
	GremoblinSpikes.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
GremoblinSpikes.prototype.onAttack = function() {};
GremoblinSpikes.prototype.onActionStarted = function() {
	this.updateMovement(0);
	this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING;
	this.m_enemy.onActionStand();
	this.m_enemy.setUntouchable(!1)
};
GremoblinSpikes.prototype.update = function(a) {
	if (this.m_actionState !== BaseEnemyAction.ST_ACTION_INIT && !this.m_isPaused) {
		if (this.m_actionState === BaseEnemyAction.ST_ACTION_WAITING && (this.m_actionTimer -= a, 0 >= this.m_actionTimer)) {
			this.onWander = this.canChase = !0;
			this.randomWandering();
			this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR;
			return
		}
		switch (this.m_actionState) {
		case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
			this.updateMovement(a);
			break;
		case BaseEnemyAction.ST_ACTION_ATTACK:
			this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_attackCount++, this.m_attackCount >= this.m_attackCountLimit ? (this.gotoSpikesSummonSpot(), this.m_enemy.onActionMove()) : (this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.setUntouchable(!1)));
			break;
		case BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT:
			if (this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND) this.m_enemy.onActionMove();
			else this.m_enemy.state() === EnemyBase.ST_ENEMY_WALK && this.gotoSpot(a);
			break;
		case BaseEnemyAction.ST_ACTION_SPIKES:
			this.m_doingSpikes ? this.m_doingSpikes && this.m_enemy.summoningDone() && (Global.game.liftSpikes(!1, this.m_spikePattern), this.m_enemy.resetSummoning(), this.m_enemy.onActionStand(), this.m_doingSpikes = !1, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.setUntouchable(!1)) : (this.m_doingSpikes = !0, this.m_enemy.onActionSummon(), Global.game.liftSpikes(!0, this.m_spikePattern))
		}
		GremoblinSpikes.superClass_.update.call(this, a)
	}
};
GremoblinSpikes.prototype.updateMovement = function(a) {
	if (this.onChase) {
		var b = this.m_enemy.x() + a * this.m_dashSpeed * this.m_directionX;
		a = this.m_enemy.y() + a * this.m_dashSpeed * this.m_directionY;
		b = b >= this.m_limitRight ? this.m_limitRight: b;
		b = b <= this.m_limitLeft ? this.m_limitLeft: b;
		a = a >= this.m_limitBot ? this.m_limitBot: a;
		a = a <= this.m_limitTop ? this.m_limitTop: a;
		0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY ? (this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1), this.m_enemy.setPosition(b, a)) : (this.m_enemy.setUntouchable(!0), this.canChase = this.onChase = !1, this.m_enemy.onHit(this.m_damage), this.m_actionTimer = this.m_attackCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK)
	} else this.onWander && (b = this.m_enemy.x() + a * this.m_speed * this.m_directionX, a = this.m_enemy.y() + a * this.m_speed * this.m_directionY, 0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY ? (this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1), this.m_enemy.setPosition(b, a), this.checkDistanceToPlayer()) : (this.canChase = this.onWander = !1, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.onActionStand(), this.m_actionTimer = this.m_moveCooldown))
};
GremoblinSpikes.prototype.gotoSpikesSummonSpot = function() {
	this.m_attackCount = 0;
	this.m_spikePattern = !this.m_spikePattern;
	this.m_actionState = BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT;
	var a = this.m_spikeSpotsX[this.m_spikePattern ? 0 : 1],
	b = this.m_spikeSpotsY[this.m_spikePattern ? 0 : 1],
	c = Math.sqrt((a - this.m_enemy.x()) * (a - this.m_enemy.x()) + (b - this.m_enemy.y()) * (b - this.m_enemy.y()));
	this.m_directionX = (a - this.m_enemy.x()) / c;
	this.m_directionY = (b - this.m_enemy.y()) / c;
	this.setGoal(a, b, c, !1);
	this.m_enemy.setUntouchable(!0)
};
GremoblinSpikes.prototype.gotoSpot = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_enemy.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_enemy.y()) * this.m_directionY || 0 === this.m_directionY) ? (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1)) : (this.m_actionTimer = this.m_moveCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_SPIKES, this.m_enemy.onActionStand(), this.m_enemy.setSavedScaleX(this.m_spikeScales[this.m_spikePattern ? 0 : 1]))
};
GremoblinSpikes.prototype.randomWandering = function() {
	var a = Common.random(this.m_player.world().camera().x() + PlayerGame.OFFSET_LEFT, this.m_player.world().camera().x() + this.m_player.world().camera().width - PlayerGame.OFFSET_RIGHT),
	b = Common.random(this.m_player.world().camera().y() + PlayerGame.OFFSET_UP, this.m_player.world().camera().y() + this.m_player.world().camera().height - PlayerGame.OFFSET_DOWN),
	c = Math.sqrt((a - this.m_enemy.x()) * (a - this.m_enemy.x()) + (b - this.m_enemy.y()) * (b - this.m_enemy.y()));
	this.m_directionX = (a - this.m_enemy.x()) / c;
	this.m_directionY = (b - this.m_enemy.y()) / c;
	this.setGoal(a, b, c, !1);
	this.m_enemy.onActionMove();
	this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR
};
GremoblinSpikes.prototype.checkDistanceToPlayer = function() {
	var a = Math.sqrt((this.m_player.x() - this.m_enemy.x()) * (this.m_player.x() - this.m_enemy.x()) + (this.m_player.y() - this.m_enemy.y()) * (this.m_player.y() - this.m_enemy.y()));
	a <= this.m_chaseDistance && !this.onChase && this.canChase && (this.onChase = !0, this.onWander = this.canChase = !1, this.setGoal(this.m_player.x(), this.m_player.y(), a, !1), this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR)
};
GremoblinSpikes.prototype.free = function() {
	this.m_spikeScales = this.m_spikeSpotsY = this.m_spikeSpotsX = null;
	GremoblinSpikes.superClass_.free.call(this)
};
function GremoblinSummon(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_moveCooldown = b.moveCooldown;
	this.m_chaseDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_damage = c.attackDamage;
	this.m_dashSpeed = c.attackSpeed;
	this.onWander = this.onDash = this.canDash = !1;
	this.goingUp = this.goingLeft = !0;
	this.m_canSummon = !1;
	this.m_currentLane = 3;
	a = Application.config.settings.gremoblinStartPosition2;
	b = Application.config.settings.gremoblinEndPosition2;
	this.m_patrollingLimitsX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_patrollingLimitsY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_dashDistance = 0;
	this.m_dashDistanceLimit = Application.config.settings.gremoblinWanderDistance;
	this.m_dashCount = 0;
	this.m_dashCountLimit = Application.config.settings.gremoblinDashLimit;
	this.m_summonIndex = 1;
	this.m_maxSummonIndex = Application.config.settings.gremoblinTotalWaves;
	this.m_temporaryGoal = null
}
goog.inherits(GremoblinSummon, BaseEnemyAction);
GremoblinSummon.prototype.setPaused = function(a) {
	GremoblinSummon.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
GremoblinSummon.prototype.onActionStarted = function() {
	var a = Math.sqrt((this.m_goalX - this.m_enemy.x()) * (this.m_goalX - this.m_enemy.x()) + (this.m_goalY - this.m_enemy.y()) * (this.m_goalY - this.m_enemy.y()));
	this.setGoal(this.m_goalX, this.m_goalY, a, !1);
	this.m_actionState = BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT;
	this.m_enemy.onActionMove();
	this.m_enemy.setUntouchable(!0);
	this.m_enemy.setInvulnerableBack(!1)
};
GremoblinSummon.prototype.update = function(a) {
	if (this.m_actionState !== BaseEnemyAction.ST_ACTION_INIT && !this.m_isPaused) {
		switch (this.m_actionState) {
		case BaseEnemyAction.ST_ACTION_WAITING:
			this.m_actionTimer -= a;
			0 >= this.m_actionTimer && (this.m_enemy.setUntouchable(!0), this.m_canSummon ? (this.m_canSummon = !1, this.m_actionState = BaseEnemyAction.ST_ACTION_SUMMON) : (this.onWander = !0, this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.m_enemy.onActionMove()));
			break;
		case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
			this.updateMovement(a);
			break;
		case BaseEnemyAction.ST_ACTION_CHARGE:
			this.m_chargingTime += a;
			this.m_chargingTime >= this.m_maxChargingTime && (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_chargingTime = 0, this.m_enemy.onActionDash());
			break;
		case BaseEnemyAction.ST_ACTION_ATTACK:
			this.updateMovement(a);
			break;
		case BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT:
			if (this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND) this.m_enemy.onActionMove();
			else this.m_enemy.state() === EnemyBase.ST_ENEMY_WALK && this.gotoSpot(a);
			break;
		case BaseEnemyAction.ST_ACTION_SUMMON:
			if (this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_INTRO && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_STAND && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_OUTRO) this.m_enemy.onActionSummon();
			this.m_enemy.summoningDone() && (this.m_enemy.resetSummoning(), GameVillains.instance.world().actorManager().initWave(this.m_summonIndex), this.m_summonIndex++, this.m_summonIndex = this.m_summonIndex >= this.m_maxSummonIndex ? this.m_maxSummonIndex: this.m_summonIndex, this.m_actionTimer = this.m_moveCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.onActionStand())
		}
		GremoblinSummon.superClass_.update.call(this, a)
	}
};
GremoblinSummon.prototype.gotoSpot = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_enemy.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_enemy.y()) * this.m_directionY || 0 === this.m_directionY) ? (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1)) : (this.m_actionTimer = this.m_moveCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_enemy.onActionStand(), this.m_enemy.setSavedScaleX(this.goingLeft ? 1 : -1))
};
GremoblinSummon.prototype.checkDistanceToPlayer = function() {
	this.m_temporaryGoal = this.findLaneToArriveTo(this.m_enemy.x(), this.m_enemy.y());
	var a = Math.sqrt((this.m_enemy.x() - this.m_temporaryGoal[0]) * (this.m_enemy.x() - this.m_temporaryGoal[0]) + (this.m_enemy.y() - this.m_temporaryGoal[1]) * (this.m_enemy.y() - this.m_temporaryGoal[1]));
	this.setGoal(this.m_temporaryGoal[0], this.m_temporaryGoal[1], a, !1);
	this.m_currentLane = this.m_temporaryGoal[2];
	a <= this.m_chaseDistance && !this.onDash && this.canDash && (this.onDash = !0, this.m_enemy.onActionCharge(), this.onWander = this.canDash = !1, this.setGoal(this.m_temporaryGoal[0], this.m_temporaryGoal[1], a, !1), this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE, this.m_currentLane = this.m_temporaryGoal[2])
};
GremoblinSummon.prototype.updateMovement = function(a) {
	if (this.onDash) {
		var b = this.m_enemy.x() + a * this.m_dashSpeed * this.m_directionX,
		c = this.m_enemy.y() + a * this.m_dashSpeed * this.m_directionY;
		0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY ? (this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1), this.m_enemy.setPosition(b, c), this.m_enemy.onDashHit(this.m_damage)) : (this.m_enemy.setPosition(this.m_temporaryGoal[0], this.m_temporaryGoal[1]), this.canDash = this.onDash = !1, this.m_actionTimer = this.m_attackCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_dashCount++, this.m_enemy.onActionStand(), this.m_enemy.setUntouchable(!1), this.m_dashCount >= this.m_dashCountLimit && (this.m_dashCount = 0, this.m_canSummon = !0), this.m_enemy.resetHitByDash(!1))
	} else if (this.onWander) {
		switch (this.m_currentLane) {
		case 1:
		case 2:
			b = this.m_enemy.x();
			c = this.m_enemy.y() + a * this.m_speed * (this.goingUp ? -1 : 1);
			this.goingUp && c <= this.m_patrollingLimitsY[0] ? (c = this.m_patrollingLimitsY[0], this.goingUp = !1) : !this.goingUp && c >= this.m_patrollingLimitsY[1] && (c = this.m_patrollingLimitsY[1], this.goingUp = !0);
			break;
		case 3:
		case 4:
			b = this.m_enemy.x() + a * this.m_speed * (this.goingLeft ? -1 : 1),
			c = this.m_enemy.y(),
			this.goingLeft && b <= this.m_patrollingLimitsX[0] ? (b = this.m_patrollingLimitsX[0], this.goingLeft = !1) : !this.goingLeft && b >= this.m_patrollingLimitsX[1] && (b = this.m_patrollingLimitsX[1], this.goingLeft = !0)
		}
		b === this.m_patrollingLimitsX[0] ? this.goingLeft = !1 : b === this.m_patrollingLimitsX[1] && (this.goingLeft = !0);
		this.m_dashDistance += Math.abs(this.m_enemy.x() - b) + Math.abs(this.m_enemy.y() - c);
		this.m_enemy.setSavedScaleX(this.goingLeft ? 1 : -1);
		this.m_enemy.setPosition(b, c);
		this.m_dashDistance >= this.m_dashDistanceLimit && (this.canDash = !0, this.checkDistanceToPlayer(), this.m_dashDistance = 0)
	}
};
GremoblinSummon.prototype.findLaneToArriveTo = function(a, b) {
	for (var c = (this.m_player.y() - b) / (this.m_player.x() - a), d = b - c * a, e = 1; 4 >= e; e++) if (e !== this.m_currentLane) switch (e) {
	case 1:
		if (c * this.m_patrollingLimitsX[1] + d >= this.m_patrollingLimitsY[0] && c * this.m_patrollingLimitsX[1] + d <= this.m_patrollingLimitsY[1]) return [this.m_patrollingLimitsX[1], c * this.m_patrollingLimitsX[1] + d, e];
		break;
	case 2:
		if (c * this.m_patrollingLimitsX[0] + d >= this.m_patrollingLimitsY[0] && c * this.m_patrollingLimitsX[0] + d <= this.m_patrollingLimitsY[1]) return [this.m_patrollingLimitsX[0], c * this.m_patrollingLimitsX[0] + d, e];
		break;
	case 3:
		if ((this.m_patrollingLimitsY[0] - d) / c >= this.m_patrollingLimitsX[0] && (this.m_patrollingLimitsY[0] - d) / c <= this.m_patrollingLimitsX[1]) return [(this.m_patrollingLimitsY[0] - d) / c, this.m_patrollingLimitsY[0], e];
		break;
	case 4:
		if ((this.m_patrollingLimitsY[1] - d) / c >= this.m_patrollingLimitsX[0] && (this.m_patrollingLimitsY[1] - d) / c <= this.m_patrollingLimitsX[1]) return [(this.m_patrollingLimitsY[1] - d) / c, this.m_patrollingLimitsY[1], e]
	}
};
GremoblinSummon.prototype.free = function() {
	this.m_patrollingLimitsY = this.m_patrollingLimitsX = null;
	GremoblinSummon.superClass_.free.call(this)
};
function DummyHaterShip(a, b, c, d, e) {
	VU_WorldActor.call(this, a, b, d, e, "", c);
	this.m_character = new Character(this.m_x, this.m_y, a);
	this.m_skin = "mcBoss4";
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN_2, this.m_skin + "_win");
	this.m_character.addState(EnemyBase.ST_ENEMY_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE_2, this.m_skin + "_charge02");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK_2, this.m_skin + "_attack02");
	this.gotoState(EnemyBase.ST_ENEMY_STAND)
}
goog.inherits(DummyHaterShip, VU_WorldActor);
DummyHaterShip.prototype.gotoState = function(a) {
	DummyHaterShip.superClass_.gotoState.call(this, a);
	this.updateBounds();
	this.clip().setScaleX(this.m_savedScaleX)
};
DummyHaterShip.prototype.setSavedScaleX = function(a) {
	this.clip().setScaleX(a);
	this.m_savedScaleX = a
};
DummyHaterShip.prototype.update = function(a) {
	this.m_character.update(a);
	DummyHaterShip.superClass_.update.call(this, a)
};
function BossHaterShip(a, b, c, d, e, f, g, h) {
	BaseBoss.call(this, a, b, c, d, e, f, g, h);
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SHOUT, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_2, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE_2, this.m_skin + "_charge02");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK_2, this.m_skin + "_attack02");
	this.m_character.addState(EnemyBase.ST_ENEMY_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_INTRO, this.m_skin + "_spawnin");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_STAND, this.m_skin + "_spawnstand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_OUTRO, this.m_skin + "_spawnend");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN, this.m_skin + "_win");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN_2, this.m_skin + "_win");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_positionEffect = [[25, -130], [ - 10, -80], [ - 23, -160], [ - 40, -105], [40, -120]];
	this.m_summonAnimCount = 0;
	this.m_maxSummonAnimCount = 3;
	this.m_laughTimer = 1E3;
	this.m_fakeShipArray = [];
	for (c = 0; 4 > c; c++) this.m_fakeShipArray.push(new DummyHaterShip(a, b, 0, -100, -100));
	this.fadingOut = this.m_copiesSpawned = !1;
	this.bossFace = 1
}
goog.inherits(BossHaterShip, BaseBoss);
BossHaterShip.prototype.nextDialoguePanel = function() {
	this.m_panelNumber++;
	HudGame.instance.showPanelTutorial(!1, "STR_INFO", !1, this.bossFace, !1, !1);
	HudGame.instance.startTutorial = !1;
	if (this.m_onIntro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_HATERSHIP_INTRO_1", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		this.onDialogue = this.m_onIntro = !1,
		PlayerGame.instance.setKeyboardEnabled(!0),
		this.gotoState(EnemyBase.ST_ENEMY_WIN)
	} else if (this.m_onOutro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_HATERSHIP_OUTRO_1", !1, this.bossFace, !0, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		Global.achievements.checkAchBossKicker()
	}
};
BossHaterShip.prototype.onActionCharge2 = function() {
	this.gotoState(EnemyBase.ST_ENEMY_CHARGE_2);
	this.copiesGoToState(EnemyBase.ST_ENEMY_CHARGE_2)
};
BossHaterShip.prototype.onActionAttack2 = function() {
	this.gotoState(EnemyBase.ST_ENEMY_ATTACK_2);
	this.copiesGoToState(EnemyBase.ST_ENEMY_ATTACK_2)
};
BossHaterShip.prototype.onActionShout = function() {
	this.onActionStand();
	this.startIntroTimer()
};
BossHaterShip.prototype.update = function(a) {
	BossHaterShip.superClass_.update.call(this, a);
	if (this.m_fakeShipArray) for (var b = 0; b < this.m_fakeShipArray.length; b++) this.m_fakeShipArray[b] && this.m_fakeShipArray[b].update(a);
	this.m_state === EnemyBase.ST_ENEMY_WIN && 0 < this.m_laughTimer && (this.m_laughTimer -= a, 0 >= this.m_laughTimer && (this.startNextAction(), this.m_laughTimer = 1E3, HudGame.instance.showBossBar(!0, this.m_bossId)));
	this.m_state === EnemyBase.ST_ENEMY_WIN_2 && 0 < this.m_laughTimer && (this.m_laughTimer -= a, 0 >= this.m_laughTimer && (this.onActionStand(), this.m_laughTimer = 1E3));
	this.m_state !== EnemyBase.ST_ENEMY_DEFEAT_2 || this.m_isAwaitingDelete || (this.m_timeEffect += a, 100 <= this.m_timeEffect && (this.m_timeEffect = 0, GameVillains.instance.addEffect("mcMissileExplode", this.m_x + this.m_positionEffect[this.m_countEffect][0], this.m_y + this.m_positionEffect[this.m_countEffect][1]), Application.instance.playSound("SND_BOSS_EXPLOSION2"), this.m_countEffect += 1, 4 < this.m_countEffect && (this.m_countEffect = 0)));
	this.onDialogue && (this.m_introTimer += a, this.m_introTimer >= this.m_maxIntroTimer && (this.m_introTimer = 0, this.nextDialoguePanel()))
};
BossHaterShip.prototype.resetHitByDash = function(a) {
	this.m_hitByDash = a
};
BossHaterShip.prototype.onEndAnimation = function(a) {
	switch (a) {
	case EnemyBase.ST_ENEMY_APPEAR:
		this.onActionStand();
		this.m_copiesSpawned && this.copiesGoToState(EnemyBase.ST_ENEMY_STAND);
		break;
	case EnemyBase.ST_ENEMY_STAND:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_WALK:
		this.onActionMove();
		break;
	case EnemyBase.ST_ENEMY_ATTACK:
		this.canChase = !1;
		this.m_baseAction.setPaused(!1);
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_HIT:
		this.canChase = !1;
		this.gotoPreviousState();
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT:
		Global.game.world().actorManager().killAllEnemies();
		HudGame.instance.showBossBar(!1, 0);
		GameVillains.instance.addScore(this.m_score);
		this.gotoState(EnemyBase.ST_ENEMY_DEFEAT_2);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT_2:
		this.m_explodingTime++;
		this.m_explodingTime >= this.m_maxExplodingTime && (GameVillains.instance.addEffect("mcExplosiveBomb", this.m_x, this.m_y - 110), this.m_isAwaitingDelete = !0);
		break;
	case EnemyBase.ST_ENEMY_DISAPPEAR:
		this.clip().gotoAndStop(this.clip().totalFrames - 1);
		this.setPosition( - 100, -100);
		this.fadingOut = !0;
		break;
	case EnemyBase.ST_ENEMY_SUMMON_INTRO:
		this.gotoState(EnemyBase.ST_ENEMY_SUMMON_STAND);
		Application.instance.playSound("SND_BOSS_LORDHATER_TONGUE");
		this.m_summonEffect = Application.instance.getClip("mcSummon");
		this.m_summonEffect.setPosition(this.m_x, this.m_y);
		this.m_canvas.addChild(this.m_summonEffect.sprite);
		this.m_summonEffect.sprite._depth = 10 * this.m_y + 1;
		break;
	case EnemyBase.ST_ENEMY_SUMMON_STAND:
		this.m_summonAnimCount++;
		this.m_summonAnimCount >= this.m_maxSummonAnimCount && (this.gotoState(EnemyBase.ST_ENEMY_SUMMON_OUTRO), this.m_summonEffect.free(), this.m_summonEffect = null, this.m_summonAnimCount = 0);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_OUTRO:
		this.m_summoningDone = !0
	}
};
BossHaterShip.prototype.spawnCopies = function(a, b, c) {
	for (var d = !1,
	e = Math.floor(Math.random() * a.length), f = 0; f < a.length; f++) f === e ? (d = !0, this.setPosition(a[f], b[f]), this.setSavedScaleX(c[f]), this.m_currentPosition = f) : (this.m_fakeShipArray[f - (d ? 1 : 0)].gotoState(EnemyBase.ST_ENEMY_APPEAR), this.m_fakeShipArray[f - (d ? 1 : 0)].setPosition(a[f], b[f]), this.m_fakeShipArray[f - (d ? 1 : 0)].setSavedScaleX(c[f]));
	this.m_copiesSpawned = !0
};
BossHaterShip.prototype.copiesGoToState = function(a) {
	for (var b = 0; b < this.m_fakeShipArray.length; b++) this.m_fakeShipArray[b].gotoState(a)
};
BossHaterShip.prototype.removeCopies = function() {
	this.m_copiesSpawned = !1;
	for (var a = 0; a < this.m_fakeShipArray.length; a++) this.m_fakeShipArray[a].gotoState(EnemyBase.ST_ENEMY_STAND),
	this.m_fakeShipArray[a].setPosition( - 100, -100)
};
BossHaterShip.prototype.hasActiveCopies = function() {
	return this.m_copiesSpawned
};
BossHaterShip.prototype.gotoState = function(a) {
	BossHaterShip.superClass_.gotoState.call(this, a);
	a === EnemyBase.ST_ENEMY_DEFEAT && Application.instance.playSound("SND_BOSS_LORDHATER_EXPLODE")
};
BossHaterShip.prototype.free = function() {
	BossHaterShip.superClass_.free.call(this);
	for (var a = 0; a < this.m_fakeShipArray.length; a++) this.m_fakeShipArray[a] && (this.m_fakeShipArray[a].free(), this.m_fakeShipArray[a] = null);
	this.m_fakeShipArray = null
};
function HaterShipMinilaser(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_shootDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_moveCooldown = b.moveCooldown;
	this.m_shootWhileMoving = 1 === b.attackWhileMoving;
	this.m_numberOfShots = b.numberOfAttacks;
	this.m_shootingAngle = b.shootingAngle;
	this.m_attackSpeed = c.attackSpeed;
	this.m_damage = c.attackDamage;
	this.m_shotType = c.shotType;
	this.m_ease = c.ease;
	this.m_currentShots = this.m_angle = 0;
	this.m_shootingAngleIncrease = this.m_shootingAngle / (this.m_numberOfShots - 1);
	this.m_shootY = this.m_shootX = this.m_shootDistance = this.m_shootTimer = 0;
	this.m_currentPosition = this.m_enemy.currentPosition();
	a = Application.config.settings.hatershipStartPosition1;
	b = Application.config.settings.hatershipEndPosition1;
	this.m_positionArrayX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_positionArrayY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_scaleArray = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_SCALE);
	this.m_shootingAngles = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_ANGLE);
	this.m_currentSummons = 0;
	this.m_numberOfSummons = 1;
	this.m_maxSummonIndex = Application.config.settings.hatershipTotalWaves;
	a = Application.config.settings.hatershipStartPosition2;
	b = Application.config.settings.hatershipEndPosition2;
	this.m_summonPositionsX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_summonPositionsY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_shootingOffset1 = [ - 40, -18];
	this.m_shootingOffset2 = [ - 105, -93];
	this.m_teleportCount = 0;
	this.m_maxTeleportAmount = Application.config.settings.hatershipTeleportLimit;
	this.m_laughTimer = 1E3
}
goog.inherits(HaterShipMinilaser, BaseEnemyAction);
HaterShipMinilaser.prototype.setPaused = function(a) {
	HaterShipMinilaser.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
HaterShipMinilaser.prototype.onAttack = function() {};
HaterShipMinilaser.prototype.onActionStarted = function() {
	this.m_enemy.onActionStand();
	this.m_actionState = BaseEnemyAction.ST_ACTION_SUMMON;
	this.m_enemy.setUntouchable(!0)
};
HaterShipMinilaser.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_SUMMON:
		this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_INTRO && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_STAND && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_OUTRO && (this.m_enemy.onActionSummon(), this.m_laughTimer = 1E3);
		this.m_enemy.summoningDone() && (this.m_enemy.resetSummoning(), GameVillains.instance.world().actorManager().initWave(this.m_numberOfSummons), this.m_numberOfSummons++, this.m_currentSummons++, this.m_numberOfSummons = this.m_numberOfSummons >= this.m_maxSummonIndex ? this.m_maxSummonIndex: this.m_numberOfSummons, this.m_actionTimer = this.m_moveCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.onActionStand());
		break;
	case BaseEnemyAction.ST_ACTION_TELEPORT_OUT:
		this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_enemy.onActionTeleportOut(), this.m_enemy.hasActiveCopies() && this.m_enemy.copiesGoToState(EnemyBase.ST_ENEMY_DISAPPEAR));
		if (this.m_enemy.fadingOut) switch (this.m_currentSummons) {
		case 0:
			this.m_enemy.removeCopies();
		case 1:
			this.m_enemy.setPosition(this.m_summonPositionsX[this.m_currentSummons], this.m_summonPositionsY[this.m_currentSummons]);
			this.m_enemy.onActionTeleportIn();
			this.m_enemy.setSavedScaleX(0 === this.m_currentSummons ? 1 : -1);
			this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN;
			this.m_enemy.fadingOut = !1;
			break;
		case 2:
			this.m_enemy.setPosition( - 100, -100),
			Global.game.world().actorManager().hasEnemiesLeft() || (this.m_teleportCount++, this.m_enemy.spawnCopies(this.m_positionArrayX, this.m_positionArrayY, this.m_scaleArray), this.m_enemy.onActionTeleportIn(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN, this.m_enemy.fadingOut = !1)
		}
		break;
	case BaseEnemyAction.ST_ACTION_TELEPORT_IN:
		if (this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND) switch (this.m_currentSummons) {
		case 0:
		case 1:
			this.m_actionState = BaseEnemyAction.ST_ACTION_SUMMON;
			break;
		case 2:
			this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE,
			this.m_enemy.setUntouchable(!1),
			this.m_enemy.noShieldUntouchable(!0),
			this.m_enemy.onActionCharge()
		}
		break;
	case BaseEnemyAction.ST_ACTION_CHARGE:
		this.m_chargingTime += a;
		this.m_chargingTime >= this.m_maxChargingTime && (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_enemy.setUntouchable(!1), this.m_chargingTime = 0);
		break;
	case BaseEnemyAction.ST_ACTION_WAITING:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = 0, this.m_teleportCount >= this.m_maxTeleportAmount && (this.m_currentSummons = this.m_teleportCount = 0), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.setUntouchable(!0)));
		break;
	case BaseEnemyAction.ST_ACTION_ATTACK:
		this.shootAtPlayer(a)
	}
};
HaterShipMinilaser.prototype.baseUpdate = function(a) {
	if (this.m_baseState !== BaseEnemyAction.ST_BASE_INIT) switch (this.m_baseState) {
	case BaseEnemyAction.ST_BASE_STARTING:
		this.m_startupDelay -= a;
		0 >= this.m_startupDelay && (this.m_baseState = BaseEnemyAction.ST_BASE_PROGRESS, this.onActionStarted());
		break;
	case BaseEnemyAction.ST_BASE_PROGRESS:
		this.update(a)
	}
};
HaterShipMinilaser.prototype.shootAtPlayer = function(a) {
	if (this.m_currentShots < this.m_numberOfShots) {
		if (this.m_shootTimer += a, this.m_shootTimer >= this.m_attackCooldown) {
			this.m_enemy.onActionAttack();
			Application.instance.playSound("SND_ENEMY_ATTACK2");
			for (a = 0; 2 > a; a++) Global.game.world().shotHandler().shoot(this.m_shotType, ShotHandler.ON_TARGET, this.m_attackSpeed, this.m_damage, this.m_enemy.x() + this.m_shootingOffset1[a] * this.m_enemy.clip().scaleX, this.m_enemy.y() + this.m_shootingOffset2[a], 375, 335, "enemy", this.m_shootingAngleIncrease * (this.m_currentShots - 0.5 * this.m_numberOfShots), this.m_ease);
			this.m_currentShots++;
			this.m_angle += this.m_shootingAngleIncrease;
			this.m_shootTimer -= this.m_attackCooldown
		}
	} else this.m_enemy.onActionStand(),
	this.m_shootTimer = this.m_currentShots = 0,
	this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING,
	this.m_actionTimer = this.m_moveCooldown
};
HaterShipMinilaser.prototype.free = function() {
	this.m_shootingOffset2 = this.m_shootingOffset1 = this.m_shootingAngles = this.m_scaleArray = this.m_positionArrayY = this.m_positionArrayX = this.m_summonPositionsY = this.m_summonPositionsX = null;
	HaterShipMinilaser.superClass_.free.call(this)
};
function HaterShipMegalaser(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_shootDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_moveCooldown = b.moveCooldown;
	this.m_shootWhileMoving = 1 === b.attackWhileMoving;
	this.m_numberOfShots = b.numberOfAttacks;
	this.m_shootingAngle = b.shootingAngle;
	this.m_attackSpeed = c.attackSpeed;
	this.m_damage = c.attackDamage;
	this.m_shotType = c.shotType;
	this.m_ease = c.ease;
	this.m_currentShots = this.m_angle = 0;
	this.m_shootingAngleIncrease = this.m_shootingAngle / (this.m_numberOfShots - 1);
	this.m_shootTimer = 0;
	this.m_currentPosition = this.m_enemy.currentPosition();
	a = Application.config.settings.hatershipStartPosition3;
	b = Application.config.settings.hatershipEndPosition3;
	this.m_positionArrayX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_positionArrayY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_scaleArray = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_SCALE);
	a = Application.config.settings.hatershipStartPosition4;
	b = Application.config.settings.hatershipEndPosition4;
	this.m_patrollingLimitsX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_patrollingLimitsY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_shootingOffset1 = -10;
	this.m_shootingOffset2 = -170;
	this.m_bounceCount = 0;
	this.m_maxBounceAmount = Application.config.settings.hatershipBounceLimit;
	this.m_directionX = -0.5;
	this.m_directionY = 0.866;
	this.m_dashDamage = Application.config.settings.hatershipDashDamage
}
goog.inherits(HaterShipMegalaser, BaseEnemyAction);
HaterShipMegalaser.prototype.setPaused = function(a) {
	HaterShipMegalaser.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
HaterShipMegalaser.prototype.onAttack = function() {};
HaterShipMegalaser.prototype.onActionStarted = function() {
	this.m_enemy.onActionTeleportOut();
	this.m_enemy.hasActiveCopies() && this.m_enemy.copiesGoToState(EnemyBase.ST_ENEMY_DISAPPEAR);
	this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT;
	this.m_enemy.setUntouchable(!0)
};
HaterShipMegalaser.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_TELEPORT_OUT:
		this.m_enemy.fadingOut && (this.m_enemy.removeCopies(), this.m_enemy.fadingOut = !1, this.m_enemy.spawnCopies(this.m_positionArrayX, this.m_positionArrayY, this.m_scaleArray), this.m_enemy.onActionTeleportIn(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN);
		break;
	case BaseEnemyAction.ST_ACTION_TELEPORT_IN:
		this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_enemy.setUntouchable(!1), this.m_enemy.noShieldUntouchable(!0), this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE, this.m_enemy.onActionCharge2());
		break;
	case BaseEnemyAction.ST_ACTION_ATTACK:
		this.shootAtPlayer(a);
		break;
	case BaseEnemyAction.ST_ACTION_WAITING:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = 0, this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.m_enemy.setUntouchable(!1), this.m_enemy.removeCopies(), this.m_enemy.onActionMove()));
		break;
	case BaseEnemyAction.ST_ACTION_CHARGE:
		this.m_chargingTime += a;
		this.m_chargingTime >= this.m_maxChargingTime && (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_chargingTime = 0);
		break;
	case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
		this.m_bounceCount >= this.m_maxBounceAmount ? (this.m_bounceCount = 0, this.m_enemy.onActionTeleportOut(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.setUntouchable(!0)) : this.updateMovement(a)
	}
};
HaterShipMegalaser.prototype.updateMovement = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY;
	var c = !1;
	b > this.m_patrollingLimitsX[1] ? (c = !0, b = this.m_patrollingLimitsX[1], this.m_directionX = -this.m_directionX) : b < this.m_patrollingLimitsX[0] && (c = !0, b = this.m_patrollingLimitsX[0], this.m_directionX = -this.m_directionX);
	a > this.m_patrollingLimitsY[1] ? (c = !0, a = this.m_patrollingLimitsY[1], this.m_directionY = -this.m_directionY) : a < this.m_patrollingLimitsY[0] && (c = !0, a = this.m_patrollingLimitsY[0], this.m_directionY = -this.m_directionY);
	c && (this.m_enemy.resetHitByDash(!1), this.m_bounceCount++);
	this.m_enemy.setPosition(b, a);
	this.m_enemy.setSavedScaleX(0 < this.m_directionX ? -1 : 1);
	this.m_enemy.onDashHit(this.m_dashDamage)
};
HaterShipMegalaser.prototype.shootAtPlayer = function(a) {
	if (this.m_currentShots < this.m_numberOfShots) {
		if (this.m_shootTimer += a, this.m_shootTimer >= this.m_attackCooldown) {
			this.m_enemy.onActionAttack2();
			Application.instance.playSound("SND_ENEMY_BIG_LASER");
			for (a = 0; a < this.m_positionArrayX.length; a++) a % 2 === this.m_currentShots % 2 && Global.game.world().shotHandler().shoot(this.m_shotType, ShotHandler.ON_TARGET, this.m_attackSpeed, this.m_damage, this.m_positionArrayX[a] + this.m_shootingOffset1 * this.m_enemy.clip().scaleX, this.m_positionArrayY[a] + this.m_shootingOffset2, this.m_positionArrayX[a] + this.m_shootingOffset1 * this.m_enemy.clip().scaleX, this.m_positionArrayY[a] + this.m_shootingOffset2, "enemy", this.m_shootingAngle, this.m_ease);
			this.m_currentShots++;
			this.m_shootTimer -= this.m_attackCooldown
		}
	} else this.m_enemy.onActionStand(),
	this.m_shootTimer = this.m_currentShots = 0,
	this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING,
	this.m_actionTimer = this.m_moveCooldown,
	this.m_enemy.copiesGoToState(EnemyBase.ST_ENEMY_DISAPPEAR)
};
HaterShipMegalaser.prototype.free = function() {
	this.m_enemy.removeCopies();
	this.m_patrollingLimitsY = this.m_patrollingLimitsX = this.m_scaleArray = this.m_positionArrayY = this.m_positionArrayX = null;
	HaterShipMegalaser.superClass_.free.call(this)
};
function BossNormbot(a, b, c, d, e, f, g, h) {
	BaseBoss.call(this, a, b, c, d, e, f, g, h);
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SHOUT, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_INTRO, this.m_skin + "_spawnin");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_STAND, this.m_skin + "_spawnstand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_OUTRO, this.m_skin + "_spawnend");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN, this.m_skin + "_win");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_positionEffect = [[23, -60], [ - 55, -50], [ - 5, -130], [25, -52], [ - 42, -102]];
	this.m_summonAnimCount = 0;
	this.m_maxSummonAnimCount = 3;
	this.m_laughTimer = 1E3;
	this.secondBody = this.fadingOut = !1;
	this.bossFace = 3
}
goog.inherits(BossNormbot, BaseBoss);
BossNormbot.prototype.replaceCharacterAnimations = function() {
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand02");
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit02");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_attack02");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk02");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat02");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge02")
};
BossNormbot.prototype.nextDialoguePanel = function() {
	this.m_panelNumber++;
	HudGame.instance.showPanelTutorial(!1, "STR_INFO", !1, this.bossFace, !1, !1);
	HudGame.instance.startTutorial = !0;
	if (this.m_onIntro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_NORMBOT_INTRO_1", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		this.onDialogue = this.m_onIntro = !1,
		PlayerGame.instance.setKeyboardEnabled(!0),
		this.startNextAction(),
		HudGame.instance.showBossBar(!0, this.m_bossId)
	} else if (this.m_onOutro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_NORMBOT_OUTRO_1", !1, this.bossFace, !0, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		Global.achievements.checkAchBossKicker()
	}
};
BossNormbot.prototype.onActionShout = function() {
	this.onActionStand();
	this.startIntroTimer()
};
BossNormbot.prototype.resetHitByDash = function(a) {
	this.m_hitByDash = a
};
BossNormbot.prototype.onEndAnimation = function(a) {
	switch (a) {
	case EnemyBase.ST_ENEMY_APPEAR:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_STAND:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_WALK:
		this.onActionMove();
		break;
	case EnemyBase.ST_ENEMY_ATTACK:
		this.canChase = !1;
		this.m_baseAction.setPaused(!1);
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_HIT:
		this.canChase = !1;
		this.gotoPreviousState();
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT:
		this.secondBody ? (this.m_explodingTime++, this.m_explodingTime >= this.m_maxExplodingTime && (Global.game.world().actorManager().killAllEnemies(), HudGame.instance.showBossBar(!1, 0), GameVillains.instance.addScore(this.m_score), GameVillains.instance.addEffect("mcExplosiveBomb", this.m_x, this.m_y - 50), this.m_isAwaitingDelete = !0)) : (this.m_explodingTime++, this.m_explodingTime >= this.m_maxExplodingTime && (this.replaceCharacterAnimations(), this.gotoState(EnemyBase.ST_ENEMY_STAND), this.secondBody = !0, this.m_isDead = !1, this.m_explodingTime = 0));
		break;
	case EnemyBase.ST_ENEMY_DISAPPEAR:
		this.clip().gotoAndStop(this.clip().totalFrames - 1);
		this.setPosition( - 100, -100);
		this.fadingOut = !0;
		break;
	case EnemyBase.ST_ENEMY_SUMMON_INTRO:
		this.gotoState(EnemyBase.ST_ENEMY_SUMMON_STAND);
		this.m_summonEffect = Application.instance.getClip("mcSummon");
		this.m_summonEffect.setPosition(this.m_x, this.m_y);
		this.m_canvas.addChild(this.m_summonEffect.sprite);
		this.m_summonEffect.sprite._depth = 10 * this.m_y + 1;
		break;
	case EnemyBase.ST_ENEMY_SUMMON_STAND:
		this.m_summonAnimCount++;
		this.m_summonAnimCount >= this.m_maxSummonAnimCount && (this.gotoState(EnemyBase.ST_ENEMY_SUMMON_OUTRO), this.m_summonEffect.free(), this.m_summonEffect = null, this.m_summonAnimCount = 0);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_OUTRO:
		this.m_summoningDone = !0
	}
};
BossNormbot.prototype.onHitBullet = function(a, b) {
	if (this.m_untouchable) return Application.instance.playSound("SND_ENEMY_HIT_SHIELD"),
	!1;
	this.m_health -= this.m_player.activeDoubleDamage() ? 2 * a: a;
	Application.instance.playSound("SND_BOSS_DAMAGE2");
	HudGame.instance.setBossHpBar(100 * this.m_health / this.m_maxHealth);
	0 >= this.m_health ? (this.startOutroTime(), this.gotoState(EnemyBase.ST_ENEMY_DEFEAT), this.m_untouchable = !0, this.secondBody && (Global.savedNumData[Global.INDEX_ENEMIES_KILLED]++, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)))) : (this.gotoState(EnemyBase.ST_ENEMY_HIT), this.m_baseAction.setPaused(!0));
	this.m_health < this.m_hpThresholds[0] && this.startNextAction();
	return ! 0
};
BossNormbot.prototype.update = function(a) {
	BossNormbot.superClass_.update.call(this, a);
	this.onDialogue && (this.m_introTimer += a, this.m_introTimer >= this.m_maxIntroTimer && (this.m_introTimer = 0, this.nextDialoguePanel()));
	this.m_state !== EnemyBase.ST_ENEMY_DEFEAT_2 && this.m_state !== EnemyBase.ST_ENEMY_DEFEAT || this.m_isAwaitingDelete || (this.m_timeEffect += a, 100 <= this.m_timeEffect && (this.m_timeEffect = 0, GameVillains.instance.addEffect("mcMissileExplode", this.m_x + this.m_positionEffect[this.m_countEffect][0], this.m_y + this.m_positionEffect[this.m_countEffect][1]), Application.instance.playSound("SND_BOSS_EXPLOSION2"), this.m_countEffect += 1, 4 < this.m_countEffect && (this.m_countEffect = 0)))
};
function NormbotMissiles(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_shootDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_moveCooldown = b.moveCooldown;
	this.m_shootWhileMoving = 1 === b.attackWhileMoving;
	this.m_numberOfShots = b.numberOfAttacks;
	this.m_shootingAngle = b.shootingAngle;
	this.m_attackSpeed = c.attackSpeed;
	this.m_damage = c.attackDamage;
	this.m_shotType = c.shotType;
	this.m_ease = c.ease;
	this.m_currentShots = this.m_angle = 0;
	this.m_shootingAngleIncrease = this.m_shootingAngle / (this.m_numberOfShots - 1);
	this.m_shootY = this.m_shootX = this.m_shootDistance = this.m_shootTimer = 0;
	this.m_currentPosition = this.m_enemy.currentPosition();
	a = Application.config.settings.normbotStartPosition1;
	b = Application.config.settings.normbotEndPosition1;
	this.m_positionArrayX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_positionArrayY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_shootingOffset1 = [ - 79, 79];
	this.m_shootingOffset2 = [ - 34, -34];
	this.m_teleportCooldown = 300;
	this.m_teleportCount = 0;
	this.m_teleportCountLimit = Application.config.settings.normbotTeleportLimit;
	this.m_dashTime = 0;
	this.m_maxDashTime = Application.config.settings.normbotDashTimeLimit;
	this.m_dashDamage = Application.config.settings.normbotDashDamage
}
goog.inherits(NormbotMissiles, BaseEnemyAction);
NormbotMissiles.prototype.setPaused = function(a) {
	NormbotMissiles.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
NormbotMissiles.prototype.onAttack = function() {};
NormbotMissiles.prototype.onActionStarted = function() {
	this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT;
	this.m_enemy.onActionTeleportOut();
	this.m_enemy.setUntouchable(!0);
	this.m_enemy.onActionStand();
	this.m_actionTimer = this.m_teleportCooldown
};
NormbotMissiles.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_TELEPORT_OUT:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_teleportCooldown, this.teleport(), this.m_enemy.onActionTeleportIn(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN, this.m_teleportCount++));
		break;
	case BaseEnemyAction.ST_ACTION_TELEPORT_IN:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_attackCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE, this.m_enemy.setUntouchable(!0), this.m_enemy.onActionCharge()));
		break;
	case BaseEnemyAction.ST_ACTION_CHARGE:
		this.m_chargingTime += a;
		this.m_chargingTime >= this.m_maxChargingTime && (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_enemy.setUntouchable(!1), this.m_chargingTime = 0);
		break;
	case BaseEnemyAction.ST_ACTION_WAITING:
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = this.m_teleportCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.onActionTeleportOut(), this.m_enemy.setUntouchable(!0)));
		break;
	case BaseEnemyAction.ST_ACTION_ATTACK:
		this.shootAtPlayer(a);
		break;
	case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
		this.updateMovement(a)
	}
};
NormbotMissiles.prototype.updateMovement = function(a) {
	this.m_dashTime += a;
	var b = Math.sqrt((this.m_enemy.x() - this.m_player.x()) * (this.m_enemy.x() - this.m_player.x()) + (this.m_enemy.y() - this.m_player.y()) * (this.m_enemy.y() - this.m_player.y()));
	this.setGoal(this.m_player.x(), this.m_player.y(), b, !1);
	b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY;
	b = b >= this.m_limitRight ? this.m_limitRight: b;
	b = b <= this.m_limitLeft ? this.m_limitLeft: b;
	a = a >= this.m_limitBot ? this.m_limitBot: a;
	a = a <= this.m_limitTop ? this.m_limitTop: a;
	0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY && (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(this.m_enemy.x() > PlayerGame.instance.x() ? 1 : -1));
	this.m_enemy.hitTest(this.m_player) ? (this.m_enemy.onHit(this.m_dashDamage), this.m_actionTimer = this.m_teleportCooldown, this.m_enemy.onActionTeleportOut(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.setUntouchable(!0), this.m_dashTime = 0) : this.m_dashTime >= this.m_maxDashTime && (this.m_actionTimer = this.m_teleportCooldown, this.m_enemy.onActionTeleportOut(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_enemy.setUntouchable(!0), this.m_dashTime = 0)
};
NormbotMissiles.prototype.teleport = function() {
	this.m_currentPosition++;
	var a = this.m_currentPosition % this.m_positionArrayX.length;
	this.m_enemy.setPosition(this.m_positionArrayX[a], this.m_positionArrayY[a]);
	this.m_enemy.placeAtPosition(this.m_currentPosition);
	this.m_enemy.setSavedScaleX(this.m_enemy.x() > PlayerGame.instance.x() ? 1 : -1)
};
NormbotMissiles.prototype.shootAtPlayer = function(a) {
	if (this.m_currentShots < this.m_numberOfShots) {
		if (this.m_shootTimer += a, this.m_shootTimer >= this.m_attackCooldown) {
			this.m_enemy.onActionAttack();
			Application.instance.playSound("SND_ENEMY_ROCKET");
			for (a = 0; a < this.m_shootingOffset1.length; a++) this.m_enemy.setShootingOffset(this.m_shootingOffset1[a], this.m_shootingOffset2[a]),
			this.m_enemy.onShoot(this.m_shotType, ShotHandler.AGAINST_PLAYER, this.m_attackSpeed, this.m_damage, this.m_angle, this.m_shootX, this.m_shootY, this.m_ease);
			this.m_currentShots++;
			this.m_angle += this.m_shootingAngleIncrease;
			this.m_shootTimer -= this.m_attackCooldown
		}
	} else this.m_shootTimer = this.m_currentShots = 0,
	this.m_teleportCount >= this.m_teleportCountLimit ? (this.m_teleportCount = 0, this.m_actionTimer = this.m_attackCooldown, this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR) : (this.m_enemy.onActionStand(), this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_actionTimer = this.m_moveCooldown)
};
NormbotMissiles.prototype.free = function() {
	this.m_shootingOffset2 = this.m_shootingOffset1 = this.m_positionArrayY = this.m_positionArrayX = null;
	NormbotMissiles.superClass_.free.call(this)
};
function NormbotLasers(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_shootDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_moveCooldown = b.moveCooldown;
	this.m_shootWhileMoving = 1 === b.attackWhileMoving;
	this.m_numberOfShots = b.numberOfAttacks;
	this.m_shootingAngle = b.shootingAngle;
	this.m_attackSpeed = c.attackSpeed;
	this.m_damage = c.attackDamage;
	this.m_shotType = c.shotType;
	this.m_ease = c.ease;
	this.m_currentShots = this.m_angle = 0;
	this.m_shootingAngleIncrease = this.m_shootingAngle / (this.m_numberOfShots - 1);
	this.m_currentPosition = this.m_shootY = this.m_shootX = this.m_shootDistance = this.m_shootTimer = 0;
	a = Application.config.settings.normbotStartPosition2;
	b = Application.config.settings.normbotEndPosition2;
	this.m_positionArrayX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_positionArrayY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_shootingOffset1 = [ - 20, 20];
	this.m_shootingOffset2 = [ - 104, -104];
	this.m_teleportCooldown = 300;
	this.m_wanderingCount = 0;
	this.m_wanderingCountLimit = Application.config.settings.normbotWanderingLimit;
	this.m_wanderSpeed = Application.config.settings.normbotWanderSpeed;
	this.m_dashDamage = Application.config.settings.normbotDashDamage;
	this.onWander = this.onChase = !1;
	this.m_dashTime = 0;
	this.m_maxDashTime = Application.config.settings.normbotDashTimeLimit
}
goog.inherits(NormbotLasers, BaseEnemyAction);
NormbotLasers.prototype.setPaused = function(a) {
	NormbotLasers.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
NormbotLasers.prototype.onAttack = function() {};
NormbotLasers.prototype.onActionStarted = function() {
	this.resetGoal();
	this.m_actionTimer = 1;
	this.m_enemy.gotoState(EnemyBase.ST_ENEMY_DEFEAT);
	this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING;
	this.m_enemy.setUntouchable(!0)
};
NormbotLasers.prototype.update = function(a) {
	switch (this.m_actionState) {
	case BaseEnemyAction.ST_ACTION_WAITING:
		if (!this.m_enemy.secondBody) break;
		0 < this.m_actionTimer && (this.m_actionTimer -= a, 0 >= this.m_actionTimer && (this.m_actionTimer = 0, this.onWander = !0, this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.m_enemy.onActionMove()));
		break;
	case BaseEnemyAction.ST_ACTION_CHARGE:
		this.m_chargingTime += a;
		this.m_chargingTime >= this.m_maxChargingTime && (this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_enemy.setUntouchable(!1), this.m_chargingTime = 0);
		break;
	case BaseEnemyAction.ST_ACTION_ATTACK:
		this.shootAtPlayer(a);
		break;
	case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
		this.updateMovement(a)
	}
};
NormbotLasers.prototype.shootAtPlayer = function(a) {
	if (this.m_currentShots < this.m_numberOfShots) {
		if (this.m_shootTimer += a, this.m_shootTimer >= this.m_attackCooldown) {
			this.m_enemy.onActionAttack();
			Application.instance.playSound("SND_ENEMY_BIG_LASER");
			for (a = 0; a < this.m_shootingOffset1.length; a++) this.m_enemy.setShootingOffset(this.m_shootingOffset1[a], this.m_shootingOffset2[a]),
			this.m_enemy.onShoot(this.m_shotType, ShotHandler.AGAINST_PLAYER, this.m_attackSpeed, this.m_damage, this.m_angle, this.m_player.x(), this.m_player.y(), this.m_ease);
			this.m_currentShots++;
			this.m_angle += this.m_shootingAngleIncrease;
			this.m_shootTimer -= this.m_attackCooldown
		}
	} else this.m_shootTimer = this.m_currentShots = 0,
	this.m_wanderingCount >= this.m_wanderingCountLimit ? (this.m_wanderingCount = 0, this.onWander = !1, this.onChase = !0, this.m_actionTimer = this.m_attackCooldown, this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.m_enemy.setUntouchable(!1)) : (this.m_enemy.onActionStand(), this.m_actionState = BaseEnemyAction.ST_ACTION_WAITING, this.m_actionTimer = this.m_moveCooldown)
};
NormbotLasers.prototype.updateMovement = function(a) {
	if (this.onChase) {
		this.m_dashTime += a;
		var b = Math.sqrt((this.m_enemy.x() - this.m_player.x()) * (this.m_enemy.x() - this.m_player.x()) + (this.m_enemy.y() - this.m_player.y()) * (this.m_enemy.y() - this.m_player.y()));
		this.setGoal(this.m_player.x(), this.m_player.y(), b, !1);
		b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
		a = this.m_enemy.y() + a * this.m_speed * this.m_directionY;
		b = b >= this.m_limitRight ? this.m_limitRight: b;
		b = b <= this.m_limitLeft ? this.m_limitLeft: b;
		a = a >= this.m_limitBot ? this.m_limitBot: a;
		a = a <= this.m_limitTop ? this.m_limitTop: a;
		0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY && (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(this.m_enemy.x() > PlayerGame.instance.x() ? 1 : -1));
		this.m_enemy.hitTest(this.m_player) ? (this.resetGoal(), this.m_enemy.onHit(this.m_damage), this.m_actionTimer = 0, this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.onChase = !1, this.onWander = !0, this.m_enemy.setUntouchable(!0), this.m_dashTime = 0) : this.m_dashTime >= this.m_maxDashTime && (this.resetGoal(), this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.onChase = !1, this.onWander = !0, this.m_enemy.setUntouchable(!0), this.m_dashTime = 0)
	} else this.onWander && (b = this.m_enemy.x() + a * this.m_wanderSpeed * this.m_directionX, a = this.m_enemy.y() + a * this.m_wanderSpeed * this.m_directionY, 0 <= (this.m_goalX - this.m_enemy.x()) * this.m_directionX && 0 <= (this.m_goalY - this.m_enemy.y()) * this.m_directionY ? (this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1), this.m_enemy.setPosition(b, a)) : (this.m_currentPosition++, this.m_wanderingCount++, this.m_wanderingCount < this.m_wanderingCountLimit && this.resetGoal(), this.m_enemy.onActionCharge(), this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE))
};
NormbotLasers.prototype.resetGoal = function() {
	var a = this.m_currentPosition % this.m_positionArrayX.length,
	b = Math.sqrt((this.m_enemy.x() - this.m_positionArrayX[a]) * (this.m_enemy.x() - this.m_positionArrayX[a]) + (this.m_enemy.y() - this.m_positionArrayY[a]) * (this.m_enemy.y() - this.m_positionArrayY[a]));
	this.setGoal(this.m_positionArrayX[a], this.m_positionArrayY[a], b, !1)
};
NormbotLasers.prototype.free = function() {
	this.m_shootingOffset2 = this.m_shootingOffset1 = this.m_positionArrayY = this.m_positionArrayX = null;
	NormbotLasers.superClass_.free.call(this)
};
function BossBillCipher(a, b, c, d, e, f, g, h) {
	BaseBoss.call(this, a, b, c, d, e, f, g, h);
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SHOUT, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_2, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_END, this.m_skin + "_defeat_end");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_INTRO, this.m_skin + "_spawnin");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_STAND, this.m_skin + "_spawnstand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_OUTRO, this.m_skin + "_spawnend");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN, this.m_skin + "_win_start");
	this.m_character.addState(EnemyBase.ST_ENEMY_TRAPS, this.m_skin + "_set_trap");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this;
	this.m_summonAnimCount = 0;
	this.m_maxSummonAnimCount = 3;
	this.m_invulnerableBack = !1;
	this.m_initialState = !0;
	this.fadingOut = !1;
	this.m_trapOffsetY = this.m_trapOffsetX = 0;
	this.bossFace = 5
}
goog.inherits(BossBillCipher, BaseBoss);
BossBillCipher.prototype.replaceCharacterAnimations = function() {
	this.m_skin = "mcBoss6";
	this.m_character.addState(EnemyBase.ST_ENEMY_HIT, this.m_skin + "_hit");
	this.m_character.addState(EnemyBase.ST_ENEMY_WALK, this.m_skin + "_walk");
	this.m_character.addState(EnemyBase.ST_ENEMY_STAND, this.m_skin + "_stand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SHOUT, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_ATTACK, this.m_skin + "_attack");
	this.m_character.addState(EnemyBase.ST_ENEMY_CHARGE, this.m_skin + "_charge");
	this.m_character.addState(EnemyBase.ST_ENEMY_APPEAR, this.m_skin + "_appear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_2, this.m_skin + "_defeat");
	this.m_character.addState(EnemyBase.ST_ENEMY_DISAPPEAR, this.m_skin + "_disappear");
	this.m_character.addState(EnemyBase.ST_ENEMY_DEFEAT_END, this.m_skin + "_defeat_end");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_INTRO, this.m_skin + "_spawnin");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_STAND, this.m_skin + "_spawnstand");
	this.m_character.addState(EnemyBase.ST_ENEMY_SUMMON_OUTRO, this.m_skin + "_spawnend");
	this.m_character.addState(EnemyBase.ST_ENEMY_WIN, this.m_skin + "_win_start");
	this.m_character.addState(EnemyBase.ST_ENEMY_TRAPS, this.m_skin + "_set_trap");
	this.m_character.onEndAnimation = "onEndAnimation";
	this.m_character.worldActor = this
};
BossBillCipher.prototype.onActionSetTraps = function(a, b, c) {
	this.gotoState(EnemyBase.ST_ENEMY_TRAPS);
	this.m_initialState = a;
	a || (this.m_trapOffsetX = b, this.m_trapOffsetY = c)
};
BossBillCipher.prototype.nextDialoguePanel = function() {
	this.m_panelNumber++;
	HudGame.instance.showPanelTutorial(!1, "STR_INFO", !1, this.bossFace, !1, !1);
	HudGame.instance.startTutorial = !1;
	if (this.m_onIntro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_BILLCIPHER_INTRO_1", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		HudGame.instance.showPanelTutorial(!0, "STR_BILLCIPHER_INTRO_2", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 3:
		HudGame.instance.showPanelTutorial(!0, "STR_BILLCIPHER_INTRO_3", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 4:
		HudGame.instance.showPanelTutorial(!0, "STR_BILLCIPHER_INTRO_4", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 5:
		HudGame.instance.showPanelTutorial(!0, "STR_BILLCIPHER_INTRO_5", !1, this.bossFace, !1, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 6:
		this.onDialogue = this.m_onIntro = !1,
		this.gotoState(EnemyBase.ST_ENEMY_WIN)
	} else if (this.m_onOutro) switch (this.m_panelNumber) {
	case 1:
		HudGame.instance.showPanelTutorial(!0, "STR_BILLCIPHER_OUTRO_1", !1, this.bossFace, !0, !1);
		HudGame.instance.startTutorial = !0;
		break;
	case 2:
		Global.achievements.checkAchBossKicker()
	}
};
BossBillCipher.prototype.onActionShout = function() {
	this.onActionStand();
	this.startIntroTimer()
};
BossBillCipher.prototype.setInvulnerableBack = function(a) {
	this.m_invulnerableBack = a
};
BossBillCipher.prototype.resetHitByDash = function(a) {
	this.m_hitByDash = a
};
BossBillCipher.prototype.onEndAnimation = function(a) {
	switch (a) {
	case EnemyBase.ST_ENEMY_TRAPS:
		Application.instance.playSound("SND_BOSS_BC_HAZARDS");
		this.m_initialState || (this.onActionStand(), Global.game.addBillCipherTrap(this.m_x + this.m_trapOffsetX, this.m_y + this.m_trapOffsetY));
		break;
	case EnemyBase.ST_ENEMY_APPEAR:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_STAND:
		this.onActionStand();
		break;
	case EnemyBase.ST_ENEMY_WALK:
		this.onActionMove();
		break;
	case EnemyBase.ST_ENEMY_ATTACK:
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_HIT:
		this.canChase = !1;
		this.gotoPreviousState();
		this.m_baseAction.setPaused(!1);
		break;
	case EnemyBase.ST_ENEMY_DEFEAT:
		Global.game.world().actorManager().killAllEnemies();
		HudGame.instance.showBossBar(!1, 0);
		GameVillains.instance.addScore(this.m_score);
		this.gotoState(EnemyBase.ST_ENEMY_DEFEAT_2);
		Global.savedNumData[Global.INDEX_PASSED_CHARACTER_1 - 1 + Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER]] = 1;
		Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData));
		break;
	case EnemyBase.ST_ENEMY_DEFEAT_2:
		this.m_explodingTime++;
		this.m_explodingTime >= this.m_maxExplodingTime && (Application.instance.playSound("SND_BOSS_BC_BREAKS"), this.gotoState(EnemyBase.ST_ENEMY_DEFEAT_END));
		break;
	case EnemyBase.ST_ENEMY_DEFEAT_END:
		Application.instance.stopSound("SND_BOSS_BC_BREAKS");
		this.m_isAwaitingDelete = !0;
		break;
	case EnemyBase.ST_ENEMY_DISAPPEAR:
		this.fadingOut = !0;
		break;
	case EnemyBase.ST_ENEMY_WIN:
		this.startNextAction();
		HudGame.instance.showBossBar(!0, this.m_bossId);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_INTRO:
		this.gotoState(EnemyBase.ST_ENEMY_SUMMON_STAND);
		this.m_summonEffect = Application.instance.getClip("mcSummon");
		this.m_summonEffect.setPosition(this.m_x, this.m_y);
		this.m_canvas.addChild(this.m_summonEffect.sprite);
		this.m_summonEffect.sprite._depth = 10 * this.m_y + 1;
		break;
	case EnemyBase.ST_ENEMY_SUMMON_STAND:
		this.m_summonAnimCount++;
		this.m_summonAnimCount >= this.m_maxSummonAnimCount ? (this.gotoState(EnemyBase.ST_ENEMY_SUMMON_OUTRO), this.m_summonEffect.free(), this.m_summonEffect = null, this.m_summonAnimCount = 0) : this.gotoState(EnemyBase.ST_ENEMY_SUMMON_STAND);
		break;
	case EnemyBase.ST_ENEMY_SUMMON_OUTRO:
		this.m_summoningDone = !0
	}
};
BossBillCipher.prototype.onHitBullet = function(a, b) {
	if (this.m_untouchable) return Application.instance.playSound("SND_ENEMY_HIT_SHIELD"),
	!1;
	this.m_health -= this.m_player.activeDoubleDamage() ? 2 * a: a;
	Application.instance.playSound("SND_BOSS_DAMAGE2");
	HudGame.instance.setBossHpBar(100 * this.m_health / this.m_maxHealth);
	0 >= this.m_health ? (this.startOutroTime(), this.gotoState(EnemyBase.ST_ENEMY_DEFEAT), this.m_untouchable = !0, Global.savedNumData[Global.INDEX_BOSSES_KILLED]++, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData))) : (this.gotoState(EnemyBase.ST_ENEMY_HIT), this.m_baseAction.setPaused(!0));
	this.m_health < this.m_hpThresholds[0] && this.startNextAction();
	return ! 0
};
BossBillCipher.prototype.gotoState = function(a) {
	BossBillCipher.superClass_.gotoState.call(this, a);
	this.clip().setScaleY(Math.abs(this.m_savedScaleX))
};
BossBillCipher.prototype.update = function(a) {
	BossBillCipher.superClass_.update.call(this, a);
	this.onDialogue && (this.m_introTimer += a, this.m_introTimer >= this.m_maxIntroTimer && (this.m_introTimer = 0, this.nextDialoguePanel()))
};
function BillCipherTraps(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_moveCooldown = b.moveCooldown;
	this.m_chaseDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_damage = c.attackDamage;
	this.m_dashSpeed = c.attackSpeed;
	this.m_shotType = c.shotType;
	this.onWander = this.onDash = this.canDash = !1;
	this.goingUp = this.goingLeft = !0;
	this.m_canSummon = !1;
	this.m_currentLane = 3;
	a = Application.config.settings.billcipherStartPosition1;
	b = Application.config.settings.billcipherEndPosition1;
	this.m_patrollingLimitsX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_patrollingHeight = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_secondTrapSet = this.m_firstTrapSet = !0;
	this.m_actionShot = !1;
	this.m_trapsSet = 0;
	this.m_trapCountLimit = Application.config.settings.billcipherTrapLimit;
	this.m_isSettingTraps = !1;
	a = Application.config.settings.billcipherStartPosition2;
	b = Application.config.settings.billcipherEndPosition2;
	this.m_trapsPositionX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_trapsPositionY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_trapsPickValuesX = [];
	this.m_trapsPickValuesY = [];
	this.m_trapsSelectedValuesX = [];
	this.m_trapsSelectedValuesY = [];
	this.resetTrapPickingValues();
	this.m_currentDisplacements = 0;
	this.m_maxDisplacements = Application.config.settings.billcipherMaxDisplacements;
	this.m_vulnerabilityTimer = this.m_currentPosition = 0;
	this.m_maxVulnerabilityTimer = Application.config.settings.billCipherTrapVulnerabilityTime;
	this.m_trapOffsetX = [ - 110, 110];
	this.m_trapOffsetY = [ - 3, -3]
}
goog.inherits(BillCipherTraps, BaseEnemyAction);
BillCipherTraps.prototype.setPaused = function(a) {
	BillCipherTraps.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
BillCipherTraps.prototype.onActionStarted = function() {
	var a = Math.sqrt((this.m_goalX - this.m_enemy.x()) * (this.m_goalX - this.m_enemy.x()) + (this.m_goalY - this.m_enemy.y()) * (this.m_goalY - this.m_enemy.y()));
	this.setGoal(this.m_goalX, this.m_goalY, a, !1);
	this.m_actionState = BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT;
	this.m_enemy.onActionMove();
	this.m_enemy.setUntouchable(!0)
};
BillCipherTraps.prototype.update = function(a) {
	if (this.m_actionState !== BaseEnemyAction.ST_ACTION_INIT && !this.m_isPaused) {
		switch (this.m_actionState) {
		case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
			this.updateMovement(a);
			break;
		case BaseEnemyAction.ST_ACTION_ATTACK:
			if (this.m_actionShot) this.m_enemy.onActionAttack();
			else this.m_actionShot = !0,
			this.shootAtPlayer(a);
			Global.game.activeShotBillCipher || (this.m_actionShot = !1, this.m_enemy.onActionStand());
			this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_currentDisplacements >= this.m_maxDisplacements ? (this.m_currentDisplacements = 0, this.m_enemy.onActionTeleportOut(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT, this.m_isSettingTraps = !0) : (this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.m_enemy.setUntouchable(!1)));
			break;
		case BaseEnemyAction.ST_ACTION_GOTOSTARTSPOT:
			if (this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND) this.m_enemy.onActionMove();
			else this.m_enemy.state() === EnemyBase.ST_ENEMY_WALK && this.gotoSpot(a);
			break;
		case BaseEnemyAction.ST_ACTION_CHARGE:
			this.m_chargingTime += a;
			this.m_chargingTime >= this.m_maxChargingTime && (this.m_enemy.onActionAttack(), this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_chargingTime = 0);
			break;
		case BaseEnemyAction.ST_ACTION_SUMMON:
			this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_enemy.setUntouchable(!1), this.m_vulnerabilityTimer < this.m_maxVulnerabilityTimer && (this.m_vulnerabilityTimer += a, this.m_vulnerabilityTimer >= this.m_maxVulnerabilityTimer && (this.m_vulnerabilityTimer = 0, this.m_enemy.setUntouchable(!0), this.m_enemy.onActionTeleportOut(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT)));
			break;
		case BaseEnemyAction.ST_ACTION_TELEPORT_OUT:
			if (this.m_enemy.fadingOut) {
				if (this.m_isSettingTraps) this.m_enemy.setPosition(this.m_trapsSelectedValuesX[this.m_trapsSet], this.m_trapsSelectedValuesY[this.m_trapsSet]),
				this.m_enemy.setSavedScaleX(375 < this.m_enemy.x() ? -1 : 1);
				else {
					var b = (this.m_currentPosition + 1) % this.m_patrollingLimitsX.length;
					this.m_enemy.setPosition(this.m_patrollingLimitsX[b], this.m_patrollingHeight[b]);
					Global.game.removeBillCipherTraps()
				}
				this.m_enemy.onActionTeleportIn();
				this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN;
				this.m_enemy.fadingOut = !1
			}
			break;
		case BaseEnemyAction.ST_ACTION_TELEPORT_IN:
			this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_isSettingTraps ? (this.m_enemy.onActionSetTraps(!1, this.m_trapOffsetX[ - 1 === this.m_enemy.savedScale() ? 1 : 0], this.m_trapOffsetY[ - 1 === this.m_enemy.savedScale() ? 1 : 0]), this.m_actionState = BaseEnemyAction.ST_ACTION_SUMMON, this.m_trapsSet++, this.m_trapsSet = (this.m_isSettingTraps = this.m_trapsSet < this.m_trapCountLimit) ? this.m_trapsSet: 0) : this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR)
		}
		BillCipherTraps.superClass_.update.call(this, a)
	}
};
BillCipherTraps.prototype.shootAtPlayer = function(a) {
	a = 1 === this.m_enemy.savedScale() ? -10 : 5;
	var b = 0;
	switch (this.m_enemy.x()) {
	case 150:
		b = 90;
		break;
	case 375:
	case 600:
		b = 130
	}
	Global.game.world().shotHandler().shoot(this.m_shotType, ShotHandler.ON_TARGET, 0, this.m_damage, this.m_enemy.x() + a, this.m_enemy.y() - 87, 375, 335, "enemy", b)
};
BillCipherTraps.prototype.updateMovement = function(a) {
	a = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	var b = this.m_patrollingHeight[0],
	c = (this.m_currentPosition + 1) % this.m_patrollingLimitsX.length;
	if (a <= this.m_patrollingLimitsX[c] && 0 > this.m_directionX || a >= this.m_patrollingLimitsX[c] && 0 < this.m_directionX) {
		a = this.m_patrollingLimitsX[c];
		if (0 === c || 2 === c) this.m_directionX = -this.m_directionX;
		this.m_enemy.setUntouchable(!0);
		this.m_currentDisplacements++;
		this.m_currentPosition++;
		this.m_enemy.onActionCharge();
		this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE
	}
	this.m_enemy.setPosition(a, b);
	this.m_enemy.setSavedScaleX(0 < this.m_directionX ? -1 : 1)
};
BillCipherTraps.prototype.resetTrapPickingValues = function() {
	for (var a = 0; a < this.m_trapsPositionX.length; a++) this.m_trapsPickValuesX.push(this.m_trapsPositionX[a]),
	this.m_trapsPickValuesY.push(this.m_trapsPositionY[a]);
	for (a = 0; a < this.m_trapsSelectedValuesX.length; a++) this.m_trapsSelectedValuesX.pop(),
	this.m_trapsSelectedValuesY.pop();
	for (a = 0; a < this.m_trapCountLimit; a++) {
		var b = Math.floor(Math.random() * this.m_trapsPickValuesX.length);
		this.m_trapsSelectedValuesX.push(this.m_trapsPickValuesX.splice(b, 1)[0]);
		this.m_trapsSelectedValuesY.push(this.m_trapsPickValuesY.splice(b, 1)[0])
	}
};
BillCipherTraps.prototype.gotoSpot = function(a) {
	var b = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY; (0 < (this.m_goalX - this.m_enemy.x()) * this.m_directionX || 0 === this.m_directionX) && (0 < (this.m_goalY - this.m_enemy.y()) * this.m_directionY || 0 === this.m_directionY) ? (this.m_enemy.setPosition(b, a), this.m_enemy.setSavedScaleX(0 <= this.m_directionX ? -1 : 1)) : this.m_firstTrapSet || this.m_secondTrapSet ? (this.m_enemy.onActionSetTraps(!0, 0, 0), b = Math.sqrt((this.m_patrollingLimitsX[this.m_firstTrapSet ? 2 : 0] - this.m_enemy.x()) * (this.m_patrollingLimitsX[this.m_firstTrapSet ? 2 : 0] - this.m_enemy.x()) + (this.m_patrollingHeight[0] - this.m_enemy.y()) * (this.m_patrollingHeight[0] - this.m_enemy.y())), this.setGoal(this.m_patrollingLimitsX[this.m_firstTrapSet ? 2 : 0], this.m_patrollingHeight[0], b, !1), this.m_secondTrapSet = this.m_firstTrapSet ? !0 : !1, this.m_firstTrapSet = !1, this.m_secondTrapSet || this.m_firstTrapSet || Global.game.initHazards()) : (this.setGoal(this.m_patrollingLimitsX[1], this.m_enemy.y(), this.m_patrollingLimitsX[1] - this.m_enemy.x(), !1), Global.game.initBreakable(), PlayerGame.instance.setKeyboardEnabled(!0), this.m_actionTimer = this.m_moveCooldown, this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR, this.m_enemy.onActionStand(), this.m_enemy.setSavedScaleX(this.goingLeft ? 1 : -1))
};
BillCipherTraps.prototype.free = function() {
	BillCipherTraps.superClass_.free.call(this);
	this.m_trapsSelectedY = this.m_trapsSelectedX = this.m_trapsPickValuesY = this.m_trapsPickValuesX = this.m_patrollingLimitsX = this.m_trapsPositionY = this.m_trapsPositionX = null
};
function BillCipherSummon(a, b, c, d, e) {
	BaseEnemyAction.call(this, a, d, e);
	this.m_actionTimer = 0;
	this.m_actionState = BaseEnemyAction.ST_ACTION_INIT;
	this.m_nextAction = BaseEnemyAction.ST_ACTION_NONE;
	this.m_speed = b.speedDisplace;
	this.m_moveCooldown = b.moveCooldown;
	this.m_chaseDistance = b.distanceToPlayer;
	this.m_attackCooldown = b.attackCooldown;
	this.m_damage = c.attackDamage;
	this.m_dashSpeed = c.attackSpeed;
	this.m_shotType = c.shotType;
	this.m_actionShot = this.m_canSummon = !1;
	this.m_currentDisplacements = 0;
	this.m_maxDisplacements = Application.config.settings.billcipherMaxDisplacements2;
	this.m_currentPosition = this.m_positionCounter = 0;
	a = Application.config.settings.billcipherStartPosition3;
	b = Application.config.settings.billcipherEndPosition3;
	this.m_positionArrayX = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_X);
	this.m_positionArrayY = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_Y);
	this.m_scaleArray = this.loadPositionParams(a, b, BaseEnemyAction.PARAM_SCALE);
	this.m_enemyDead = !0;
	this.m_mustSummon = !1;
	this.m_summonIndex = 1;
	this.m_maxSummonIndex = Application.config.settings.billcipherTotalWaves;
	this.m_isAttacking = this.m_cornerAttackMode = !1;
	this.m_attacksCount = 0;
	this.m_attacksCountLimit = Application.config.settings.billcipherAttacksLimit
}
goog.inherits(BillCipherSummon, BaseEnemyAction);
BillCipherSummon.prototype.setPaused = function(a) {
	BillCipherSummon.superClass_.setPaused.call(this, a);
	this.m_isPaused || this.m_enemy.gotoPreviousState()
};
BillCipherSummon.prototype.onActionStarted = function() {
	this.m_enemy.setUntouchable(!0);
	this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT;
	this.m_enemy.onActionTeleportOut();
	Global.game.destroyHazards();
	Global.game.destroyBreakables()
};
BillCipherSummon.prototype.update = function(a) {
	if (this.m_actionState !== BaseEnemyAction.ST_ACTION_INIT && !this.m_isPaused) {
		switch (this.m_actionState) {
		case BaseEnemyAction.ST_ACTION_MOVE_LINEAR:
			this.updateMovement(a);
			break;
		case BaseEnemyAction.ST_ACTION_ATTACK:
			if (this.m_actionShot || this.m_attacksCount === this.m_attacksCountLimit) this.m_enemy.onActionAttack();
			else this.m_actionShot = !0,
			this.shootAtPlayer(a);
			Global.game.activeShotBillCipher || (this.m_actionShot = !1, this.m_enemy.onActionStand());
			this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_cornerAttackMode || this.m_mustSummon ? this.m_attacksCount >= this.m_attacksCountLimit ? (this.m_cornerAttackMode = !1, this.m_attacksCount = 0) : (this.m_attacksCount++, this.m_enemy.onActionTeleportOut(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT) : (this.m_enemy.setUntouchable(!1), this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR));
			break;
		case BaseEnemyAction.ST_ACTION_SUMMON:
			if (this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_INTRO && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_STAND && this.m_enemy.state() !== EnemyBase.ST_ENEMY_SUMMON_OUTRO) this.m_enemy.onActionSummon();
			this.m_enemy.summoningDone() && (this.m_enemy.resetSummoning(), GameVillains.instance.world().actorManager().initWave(this.m_summonIndex), this.m_summonIndex++, this.m_summonIndex = this.m_summonIndex >= this.m_maxSummonIndex ? this.m_maxSummonIndex: this.m_summonIndex, this.m_enemy.onActionTeleportOut(), this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_OUT);
			break;
		case BaseEnemyAction.ST_ACTION_TELEPORT_OUT:
			if (this.m_enemy.fadingOut) {
				if (this.m_enemyDead) this.m_enemy.replaceCharacterAnimations(),
				this.m_enemyDead = !1;
				else {
					0 === this.m_attacksCount ? this.m_currentPosition += Math.floor(4 * Math.random()) : this.m_currentPosition++;
					var b = this.m_currentPosition % this.m_positionArrayX.length;
					this.m_enemy.setPosition(this.m_positionArrayX[b], this.m_positionArrayY[b]);
					this.m_enemy.setSavedScaleX(this.m_scaleArray[b])
				}
				this.m_enemy.onActionTeleportIn();
				this.m_actionState = BaseEnemyAction.ST_ACTION_TELEPORT_IN
			}
			break;
		case BaseEnemyAction.ST_ACTION_TELEPORT_IN:
			this.m_enemy.state() === EnemyBase.ST_ENEMY_STAND && (this.m_mustSummon ? (this.m_mustSummon = !1, this.m_cornerAttackMode = !0, this.m_actionState = BaseEnemyAction.ST_ACTION_SUMMON) : this.m_cornerAttackMode ? (this.m_enemy.onActionCharge(), this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE) : (this.m_enemy.setUntouchable(!1), this.m_enemy.onActionMove(), this.m_actionState = BaseEnemyAction.ST_ACTION_MOVE_LINEAR));
			break;
		case BaseEnemyAction.ST_ACTION_CHARGE:
			this.m_chargingTime += a,
			this.m_chargingTime >= this.m_maxChargingTime && (this.m_enemy.onActionAttack(), this.m_actionState = BaseEnemyAction.ST_ACTION_ATTACK, this.m_chargingTime = 0)
		}
		BillCipherSummon.superClass_.update.call(this, a)
	}
};
BillCipherSummon.prototype.shootAtPlayer = function(a) {
	a = 1 === this.m_enemy.savedScale() ? -10 : 5;
	this.m_enemy.onActionAttack();
	this.m_cornerAttackMode ? Global.game.world().shotHandler().shoot(this.m_shotType, ShotHandler.ON_TARGET, 0, this.m_damage, this.m_enemy.x() + a, this.m_enemy.y() - 87, 375, 335, "enemy", 180 * Math.atan2(335 - this.m_enemy.y() + 87, 375 - this.m_enemy.x()) / Math.PI + 30) : Global.game.world().shotHandler().shoot(this.m_shotType, ShotHandler.AGAINST_PLAYER, 0, this.m_damage, this.m_enemy.x() + a, this.m_enemy.y() - 87, this.m_player.x(), this.m_player.y(), "enemy", 180 * Math.atan2(this.m_player.y() - this.m_enemy.y() + 87, this.m_player.x() - this.m_enemy.x()) / Math.PI + 40)
};
BillCipherSummon.prototype.updateMovement = function(a) {
	var b = Math.sqrt((this.m_enemy.x() - this.m_player.x()) * (this.m_enemy.x() - this.m_player.x()) + (this.m_enemy.y() - this.m_player.y()) * (this.m_enemy.y() - this.m_player.y()));
	this.setGoal(this.m_player.x(), this.m_player.y(), b, !1);
	var c = this.m_enemy.x() + a * this.m_speed * this.m_directionX;
	a = this.m_enemy.y() + a * this.m_speed * this.m_directionY;
	c = c >= this.m_limitRight ? this.m_limitRight: c;
	c = c <= this.m_limitLeft ? this.m_limitLeft: c;
	a = a >= this.m_limitBot ? this.m_limitBot: a;
	a = a <= this.m_limitTop ? this.m_limitTop: a;
	b <= this.m_chaseDistance ? (this.m_currentDisplacements++, this.m_currentDisplacements >= this.m_maxDisplacements && (this.m_currentDisplacements = 0, this.m_mustSummon = !0), this.m_enemy.setUntouchable(!0), this.m_actionState = BaseEnemyAction.ST_ACTION_CHARGE, this.m_enemy.onActionCharge()) : (this.m_enemy.setPosition(c, a), this.m_enemy.setSavedScaleX(0 < this.m_directionX ? -1 : 1))
};
BillCipherSummon.prototype.free = function() {
	this.m_scaleArray = this.m_positionArrayY = this.m_positionArrayX = null
};
function GuiLoader(a, b, c, d) {
	SScreen.call(this);
	GuiLoader.instance = this;
	this.start = "undefined" === typeof c ? 0 : c;
	this.end = "undefined" === typeof d ? 100 : d;
	this.assets = a;
	this.gotoScreen = b;
	this.loadedFiles = 0;
	this.totalFiles = null != a ? this.assets.length: 0;
	if (null != a) for (a = 0; a < this.totalFiles; a++) Application.instance.core.load(this.assets[a], this.load);
	this.m_txtPercent = $(".ui_loader_percent");
	a = Application.strings.STR_PERCENT.replace("N", 0);
	this.m_txtPercent.html(a)
}
goog.inherits(GuiLoader, SScreen);
GuiLoader.instance = null;
GuiLoader.prototype.free = function() {
	this.gotoScreen = this.assets = this.m_txtPercent = null;
	GuiLoader.superClass_.free.call(this)
};
GuiLoader.prototype.load = function() {
	var a = new SEvent("progress");
	a.loaded = ++GuiLoader.instance.loadedFiles;
	a.total = GuiLoader.instance.totalFiles;
	var b = GuiLoader.instance.start,
	b = b + a.loaded / a.total * (GuiLoader.instance.end - GuiLoader.instance.start);
	a.percent = parseInt(b, 10);
	GuiLoader.instance.onLoadProgress(a);
	if (GuiLoader.instance.loadedFiles === GuiLoader.instance.totalFiles) GuiLoader.instance.onLoadComplete()
};
GuiLoader.prototype.setGuiHTML = function() {
	this.css = " .ui_loader_logo {  position: absolute;  top: 123px;  left: 288px;  width: 160px;  height: 80px;  background: url(media/images/localized/gui_screens_mainmenu_logo02.png); } .ui_loader_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background:url(media/images/ui_images/screens/gui_screens_loader_background.jpg); } .ui_player_button_play {  position: absolute;  top: 380px;  right: 0px;  width: 120px;  height: 119px;  background: url(media/images/ui_images/buttons/gui_buttons_icons01.png) no-repeat right top;  cursor: pointer; } .ui_player_button_play.b1 {  background-position: -720px 0px; } .ui_player_button_play.b1:hover {  background-position: -840px 0px; } .ui_loader_percent {  position: absolute;  left: 0px;  top: 233px;  width: 750px;  height: 67px;  z-index: 2;  color: #103579;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 60px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_loader_bg'>    <div class='ui_loader_logo'></div>  <div class='ui_loader_percent'>0%</div>  <div class='ui_player_button_play b1' id='btn_next'></div>   </div> </div>";
	GuiLoader.superClass_.setGuiHTML.call(this)
};
GuiLoader.prototype.init = function() {
	GuiLoader.superClass_.init.call(this);
	$(".ui_player_button_play").css("display", "none");
	$(".ui_loader_percent").css("pointer-events", "none");
	this.addClickListener("btn_next")
};
GuiLoader.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_next":
		GuiManager.instance.gotoScreen(this.gotoScreen)
	}
};
GuiLoader.prototype.onLoadProgress = function(a) {
	a = Application.strings.STR_PERCENT.replace("N", a.percent);
	this.m_txtPercent.html(a)
};
GuiLoader.prototype.onLoadComplete = function() {
	var a = Application.strings.STR_PERCENT.replace("N", 100);
	this.m_txtPercent.html(a);
	Application.isMobileDevice && null != this.assets ? GuiMainMenu.doneFirstLoader ? GuiManager.instance.gotoScreen(this.gotoScreen) : $(".ui_player_button_play").css("display", "") : GuiManager.instance.gotoScreen(this.gotoScreen)
};
function GuiCutscene(a, b, c) {
	SScreen.call(this, a, b, c);
	this.cantScenes = 2;
	this.m_currentScene = 1;
	this.m_txt = $(".ui_cutscene_text");
	this.m_txt.html(Application.strings["STR_CS" + this.m_currentScene + "_INFO"]);
	this.m_image = $(".ui_cutscene_image")
}
goog.inherits(GuiCutscene, SScreen);
GuiCutscene.prototype.setGuiHTML = function() {
	this.css = " .ui_cutscene_bg1 {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_cutscene01.jpg); } .ui_cutscene_bg2 {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_cutscene02.jpg); } .ui_cutscene_text {  position: absolute;  color: #FFFFFF;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 17px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  top: 422px;  left: 28px;  width: 693px;  height: 62px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_cutscene_bg1'></div>  <div class='ui_cutscene_bg2'></div>  <div class='ui_general_button_mainmenu b1' id='btn_mainmenu'></div>  <div class='ui_general_button_back b1' id='btn_back'></div>  <div class='ui_general_button_next b1' id='btn_next'></div>  <div class='ui_general_button_skip b1' id='btn_skip'></div>  <div class='ui_cutscene_text'>" + Application.strings.STR_INFO + "</div>   </div> </div>";
	GuiCutscene.superClass_.setGuiHTML.call(this)
};
GuiCutscene.prototype.init = function() {
	GuiCutscene.superClass_.init.call(this);
	$(".ui_cutscene_text").css("pointer-events", "none");
	this.addClickListener("btn_back");
	this.addClickListener("btn_next");
	this.addClickListener("btn_skip");
	$(".ui_cutscene_bg2").css("display", "none")
};
GuiCutscene.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_next":
		this.m_currentScene == this.cantScenes ? GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_PLAYER) : (this.m_currentScene += 1, $("#btn_skip").css("display", "none"), this.m_txt.html(Application.strings["STR_CS" + this.m_currentScene + "_INFO"]), $(".ui_cutscene_bg1").css("display", "none"), $(".ui_cutscene_bg2").css("display", ""));
		break;
	case "btn_back":
		1 == this.m_currentScene ? GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU) : ($("#btn_skip").css("display", ""), $(".ui_cutscene_bg1").css("display", ""), $(".ui_cutscene_bg2").css("display", "none"), this.m_currentScene -= 1, this.m_txt.html(Application.strings["STR_CS" + this.m_currentScene + "_INFO"]));
		break;
	case "btn_skip":
		GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_PLAYER)
	}
};
GuiCutscene.prototype.onPressSpaceBar = function() {
	GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_PLAYER);
	GuiCutscene.superClass_.onPressSpaceBar.call(this)
};
function GuiCutsceneFinal(a, b, c) {
	SScreen.call(this, a, b, c);
	this.cantScenes = 1;
	this.m_currentScene = 3;
	this.m_txt = $(".ui_cutscene_text");
	this.m_txt.html(Application.strings["STR_CS" + this.m_currentScene + "_INFO"]);
	this.m_currentScene = 1;
	this.m_image = $(".ui_cutscene_image");
	Application.instance.stopAllSounds();
	Application.instance.playSound("SND_BG_MENU")
}
goog.inherits(GuiCutsceneFinal, SScreen);
GuiCutsceneFinal.prototype.setGuiHTML = function() {
	this.css = " .ui_cutscene_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_finalcutscene.jpg); } .ui_cutscene_text {  position: absolute;  color: #FFFFFF;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 17px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  top: 422px;  left: 28px;  width: 693px;  height: 62px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_cutscene_bg'></div>  <div class='ui_cutscene_image'></div>  <div class='ui_general_button_next b1' id='btn_next'></div>  <div class='ui_general_button_skip b1' id='btn_skip'></div>  <div class='ui_cutscene_text'>" + Application.strings.STR_INFO + "</div>   </div> </div>";
	GuiCutsceneFinal.superClass_.setGuiHTML.call(this)
};
GuiCutsceneFinal.prototype.init = function() {
	GuiCutsceneFinal.superClass_.init.call(this);
	$(".ui_cutscene_text").css("pointer-events", "none");
	this.addClickListener("btn_next");
	this.addClickListener("btn_skip");
	$(".ui_cutscene_bg2").css("display", "none");
	Application.instance.stopAllSounds();
	Application.instance.playSound("SND_BG_MENU")
};
GuiCutsceneFinal.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_next":
		this.m_currentScene == this.cantScenes && GuiManager.instance.gotoScreen(GuiManager.SC_END_GAME);
		break;
	case "btn_skip":
		GuiManager.instance.gotoScreen(GuiManager.SC_END_GAME)
	}
};
GuiCutsceneFinal.prototype.onPressSpaceBar = function() {
	GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_PLAYER);
	GuiCutsceneFinal.superClass_.onPressSpaceBar.call(this)
};
function GuiHelp(a, b, c) {
	SScreen.call(this, a, b, c);
	this.m_page = 1
}
goog.inherits(GuiHelp, SScreen);
GuiHelp.prototype.setGuiHTML = function() {
	this.css = " .ui_help_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_help01_background.jpg); } .ui_help_text {  position: absolute;  color: #FFFFFF;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 18px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  width: 188px;  height: 86px; } .ui_help_text.i1 {  top: 224px;  left: 126px; } .ui_help_text.i2 {  top: 224px;  left: 394px; } .ui_help_text.i3 {  top: 412px;  left: 187px;  width: 345px;  height: 78px; } .ui_help_control01 {  position: absolute; } .ui_help_control01.i1 {  top: 295px;  left: 155px;  width: 128px;  height: 86px;  background: url(media/images/ui_images/screens/gui_popup_help_control01.png) no-repeat right top; } .ui_help_control01.i2 {  width: 124px;  height: 231px;  top: 165px;  left: 499px;  background: url(media/images/ui_images/screens/gui_popup_help_control03.png) no-repeat right top; } .ui_help_control01.i3 {  top: 295px;  left: 155px;  width: 128px;  height: 86px;  background: url(media/images/ui_images/screens/gui_popup_help_control01_base.png) no-repeat right top; } .ui_help_control02 {  position: absolute; } .ui_help_control02.i1 {  width: 96px;  height: 93px;  top: 293px;  left: 178px;  background: url(media/images/ui_images/screens/gui_popup_help_control02.png) no-repeat right top; } .ui_help_control02.i2 {  width: 124px;  height: 231px;  top: 165px;  left: 499px;  background: url(media/images/ui_images/screens/gui_popup_help_control04.png) no-repeat right top; } .ui_help_control02.i3 {  width: 75px;  height: 86px;  top: 297px;  left: 195px;  background: url(media/images/ui_images/screens/gui_popup_help_control05.png) no-repeat right top; } .ui_help_image {  position: absolute; } .ui_help_image.i1 {  width: 472px;  height: 128px;  top: 145px;  left: 128px;  background: url(media/images/ui_images/screens/gui_popup_help01.png) no-repeat right top; } .ui_help_image.i2 {  width: 309px;  height: 341px;  top: 104px;  left: 224px;  background: url(media/images/ui_images/screens/gui_popup_help02.png) no-repeat right top; } .ui_help_keyletter {  position: absolute;  color: #ffffff;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 22px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  width: 20px;  height: 20px; } .ui_help_keyletter.l1 {  top: 342px;  left: 167px; } .ui_help_keyletter.r1 {  color: #29296c;  top: 342px;  left: 251px; } .ui_help_keyletter.u1 {  top: 302px;  left: 207px; } .ui_help_keyletter.d1 {  top: 342px;  left: 207px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_help_bg'>    <div class='ui_general_screen_title2'>" + Application.strings.STR_HELP_TITLE + "</div>  <div class='ui_general_screen_title'>" + Application.strings.STR_HELP_TITLE + "</div>  <div class='ui_general_button_back b1' id='btn_back'></div>  <div class='ui_general_button_next b1' id='btn_next'></div>  <div class='ui_help_image i1'></div>  <div class='ui_help_image i2'></div>  <div class='ui_help_control01 i1'></div>  <div class='ui_help_control01 i2'></div>  <div class='ui_help_control02 i1'></div>  <div class='ui_help_control02 i2'></div>  <div class='ui_help_control02 i3'></div>  \x3c!--<div class='ui_help_text i1'>" + Application.strings.STR_INFO1 + "</div>  <div class='ui_help_text i2'>" + Application.strings.STR_INFO2 + "</div>  <div class='ui_help_text i3'>" + Application.strings.STR_INFO3 + "</div>--\x3e   </div> </div>";
	GuiHelp.superClass_.setGuiHTML.call(this)
};
GuiHelp.prototype.init = function() {
	GuiHelp.superClass_.init.call(this);
	$(".ui_general_screen_title").html(Application.strings.STR_HELP_TITLE);
	$(".ui_general_button_back").css("display", "none");
	$(".ui_help_image.i2").css("display", "none");
	Application.isMobileDevice ? ($(".ui_help_control01").css("display", "none"), $(".ui_help_control02.i2").css("display", 2 === Global.MOBILE_MODE_GAME ? "": "none"), $(".ui_help_control02.i1").css("display", 2 === Global.MOBILE_MODE_GAME ? "": "none"), $(".ui_help_control02.i3").css("display", 2 === Global.MOBILE_MODE_GAME ? "none": "")) : ($(".ui_help_control02").css("display", "none"), $(".ui_help_control01.i2").css("display", 2 === Global.MOBILE_MODE_GAME ? "": "none"));
	$(".ui_help_text").css("pointer-events", "none");
	$(".ui_general_screen_title2").css("pointer-events", "none");
	$(".ui_general_screen_title").css("pointer-events", "none");
	this.addClickListener("btn_back");
	this.addClickListener("btn_next")
};
GuiHelp.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_back":
		this.m_page--;
		$(".ui_help_image.i1").css("display", "");
		$(".ui_help_image.i2").css("display", "none");
		$(".ui_general_button_back").css("display", "none");
		Application.isMobileDevice ? ($(".ui_help_control01").css("display", "none"), $(".ui_help_control02.i2").css("display", 2 === Global.MOBILE_MODE_GAME ? "": "none")) : ($(".ui_help_control02").css("display", "none"), $(".ui_help_control01.i2").css("display", 2 === Global.MOBILE_MODE_GAME ? "": "none"));
		break;
	case "btn_next":
		this.screenParent && GuiPopupPause ? (this.m_page++, 2 === this.m_page ? ($(".ui_help_image.i1").css("display", "none"), $(".ui_help_image.i2").css("display", ""), $(".ui_help_control01").css("display", "none"), $(".ui_help_control02").css("display", "none"), $(".ui_general_button_back").css("display", "")) : this.screenParent.addPopup(GuiPopupPause, 0, 0)) : GuiManager.instance.gotoScreen(GuiManager.SC_GAME)
	}
};
function GuiConfirm(a, b, c) {
	SScreen.call(this, a, b, c);
	this.m_deleteMode = !1;
	GuiConfirm.instance = this
}
goog.inherits(GuiConfirm, SScreen);
GuiConfirm.prototype.setGuiHTML = function() {
	this.css = " .ui_popup_buttons_cancel {  position: absolute;  width: 120px;  height: 119px;  background: url(media/images/ui_images/buttons/gui_buttons_icons01.png) no-repeat right top;  cursor: pointer; } .ui_popup_buttons_cancel.c1 {  top: 171px;  left: 413px;  background-position: -480px 0px; } .ui_popup_buttons_cancel.c1:hover {  background-position: -600px 0px; } .ui_popup_buttons_yes {  position: absolute;  top: 185px;  left: 230px;  width: 94px;  height: 93px;  background: url(media/images/ui_images/buttons/gui_buttons_icons02.png) no-repeat right top;  cursor: pointer; } .ui_popup_buttons_yes.b1 {  background-position: -564px 0px; } .ui_popup_buttons_yes.b1:hover {  background-position: -658px 0px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_general_popup_bg'></div>  <div class='ui_general_popup_support'>  <div class='ui_general_popup_title t2'><p>" + Application.strings.STR_CONFIRM_YESNO + "</p></div>  <div class='ui_general_popup_title t1'><p>" + Application.strings.STR_CONFIRM_YESNO + "</p></div>    <div class='ui_popup_buttons_yes b1' id='btn_yes'></div>   <div class='ui_popup_buttons_cancel c1' id='btn_no'></div>   </div> </div>";
	GuiConfirm.superClass_.setGuiHTML.call(this)
};
GuiConfirm.prototype.init = function() {
	GuiConfirm.superClass_.init.call(this);
	this.addClickListener("btn_yes");
	this.addClickListener("btn_no");
	$(".ui_general_popup_title").css("pointer-events", "none")
};
GuiConfirm.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_yes":
		GuiManager.instance.newSound = !0;
		this.m_deleteMode && Global.achievements.resetGameData();
		BKBasic.BREAKABLE_DATA = null;
		BKBasic.BREAKABLE_DATA = [];
		GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU);
		break;
	case "btn_no":
		this.m_deleteMode ? this.screenParent.dropPopup() : this.screenParent && GuiPopupPause && this.screenParent.addPopup(GuiPopupPause, 0, 0)
	}
};
GuiConfirm.prototype.setDeleteDataMode = function() {
	this.m_deleteMode = !0;
	$(".ui_general_popup_title").html(Application.strings.STR_CONFIRM_DELETE_DATA)
};
function GuiEndGame(a, b, c) {
	SScreen.call(this, a, b, c)
}
goog.inherits(GuiEndGame, SScreen);
GuiEndGame.prototype.setGuiHTML = function() {
	this.css = " .ui_endgame_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_endgame_background.jpg); } .ui_endgame_button_mainmenu {  position: absolute;  top: 190px;  right: 0px;  width: 120px;  height: 119px;  background: url(media/images/ui_images/buttons/gui_buttons_icons01.png) no-repeat right top;  cursor: pointer; } .ui_endgame_button_mainmenu.b1 {  background-position: 0px 0px; } .ui_endgame_button_mainmenu.b1:hover {  background-position: -360px 0px; } .ui_endgame_score_text {  position: absolute;  top: 415px;  left: 238px;  width: 278px;  height: 0px;  color: #ffffff;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 20px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_endgame_score_numb {  position: absolute;  top: 441px;  left: 238px;  width: 278px;  height: 38px;  color: #fefe26;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 30px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_endgame_title {  position: absolute;  left: 0px;  top: 6px;  width: 750px;  height: 50px;  color: #ffffff;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 32px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  padding-top: 5px; } .ui_endgame_title2 {  position: absolute;  left: -5px;  top: 10px;  width: 750px;  height: 50px;  color: #123186;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 32px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  padding-top: 5px; }";
	this.html = " <div class='ui_general_container'>  <div class='ui_endgame_bg'>  <div class='ui_endgame_title2'>" + Application.strings.STR_CONGRATULATIONS + "</div>  <div class='ui_endgame_title'>" + Application.strings.STR_CONGRATULATIONS + "</div>  <div class='ui_endgame_button_mainmenu b1 ' id='btn_mainmenu'></div>  <div class='ui_endgame_score_text'>" + Application.strings.STR_INFO + "</div>  <div class='ui_endgame_score_numb'>" + Application.strings.STR_SCORE + "</div>   </div> </div>";
	GuiEndGame.superClass_.setGuiHTML.call(this)
};
GuiEndGame.prototype.init = function() {
	GuiEndGame.superClass_.init.call(this);
	this.addClickListener("btn_mainmenu");
	$(".ui_endgame_score_text").css("pointer-events", "none");
	$(".ui_endgame_score_numb").css("pointer-events", "none");
	$(".ui_endgame_title").css("pointer-events", "none");
	$(".ui_endgame_title2").css("pointer-events", "none");
	$(".ui_endgame_score_numb").html("" + Global.savedNumData[Global.INDEX_CURRENT_SCORE]);
	Application.instance.stopAllSounds();
	Application.instance.playSound("SND_BG_WIN");
	Global.achievements.resetGameData()
};
GuiEndGame.prototype.onClick = function(a) {
	switch (a.id) {
	case "btn_mainmenu":
		Application.instance.stopAllSounds(),
		GuiManager.instance.newSound = !0,
		GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU)
	}
	Application.instance.playSound("SND_UI_BUTTON")
};
GuiEndGame.prototype.onPressSpaceBar = function() {
	GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU);
	GuiEndGame.superClass_.onPressSpaceBar.call(this)
};
GuiEndGame.prototype.onEndTransition = function(a) {
	GuiEndGame.superClass_.onEndTransition.call(this, a);
	a.params && Application.instance.guiManager.gotoScreen(a.params.screen)
};
function GuiTryAgain(a, b, c) {
	SScreen.call(this, a, b, c);
	this.m_txtTitle = $(".ui_general_screen_title");
	this.m_txtTitle.html(Application.strings.STR_TRY_AGAIN_TITLE)
}
goog.inherits(GuiTryAgain, SScreen);
GuiTryAgain.prototype.setGuiHTML = function() {
	this.css = " .ui_tryagain_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_tryagain_background.jpg)no-repeat right top; } .ui_tryagain_button_retry {  position: absolute;  top: 190px;  right: 0px;  width: 120px;  height: 119px;  background: url(media/images/ui_images/buttons/gui_buttons_icons01.png) no-repeat right top;  cursor: pointer; } .ui_tryagain_button_retry.b1 {  background-position: -960px 0px; } .ui_tryagain_button_retry.b1:hover {  background-position: -1080px 0px; } .ui_tryagain_button_mainmenu {  position: absolute;  top: 190px;  right: 0px;  width: 120px;  height: 119px;  background: url(media/images/ui_images/buttons/gui_buttons_icons01.png) no-repeat right top;  cursor: pointer; } .ui_tryagain_button_mainmenu.b1 {  background-position: 0px 0px; } .ui_tryagain_button_mainmenu.b1:hover {  background-position: -360px 0px; } .ui_tryagain_score_text {  position: absolute;  top: 415px;  left: 238px;  width: 278px;  height: 0px;  color: #ffffff;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 20px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_tryagain_highscore_text {  position: absolute;  top: 415px;  left: 238px;  width: 278px;  height: 0px;  color: #fefe26;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 20px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; } .ui_tryagain_score_numb {  position: absolute;  top: 441px;  left: 238px;  width: 278px;  height: 38px;  color: #fefe26;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 30px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always; }";
	this.html = " <div class='ui_general_container'>  <div class='ui_tryagain_bg'>   <div class='ui_tryagain_image'>    <div class='ui_general_screen_title2'>" + Application.strings.STR_TRY_AGAIN_TITLE + "</div>    <div class='ui_general_screen_title'>" + Application.strings.STR_TRY_AGAIN_TITLE + "</div>    <div class='ui_tryagain_button_mainmenu b1 ' id='btn_mainmenu'></div>    <div class='ui_tryagain_score_text'>" + Application.strings.STR_INFO + "</div>    <div class='ui_tryagain_highscore_text'>" + Application.strings["STR_NEW HIGHSCORE"] + "</div>    <div class='ui_tryagain_score_numb'>" + Application.strings.STR_SCORE + "</div>   </div>  </div> </div>";
	GuiTryAgain.superClass_.setGuiHTML.call(this)
};
GuiTryAgain.prototype.init = function() {
	GuiTryAgain.superClass_.init.call(this);
	this.addClickListener("btn_mainmenu");
	this.addClickListener("btn_retry");
	Application.instance.stopAllSounds();
	switch (Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER]) {
	case 1:
	case 2:
		Application.instance.playSound("SND_GF_LOSE");
		break;
	case 3:
		Application.instance.playSound("SND_WOY_LOSE");
		break;
	case 4:
		Application.instance.playSound("SND_RC_LOSE");
		break;
	case 5:
		Application.instance.playSound("SND_PF_LOSE")
	}
	1 === Global.savedNumData[Global.INDEX_NEW_HIGHEST_SCORE] ? ($(".ui_tryagain_score_text").css("display", "none"), Global.savedNumData[Global.INDEX_NEW_HIGHEST_SCORE] = 0) : $(".ui_tryagain_highscore_text").css("display", "none");
	$(".ui_tryagain_score_numb").html("" + Global.savedNumData[Global.INDEX_CURRENT_SCORE]);
	Global.achievements.resetGameData();
	$(".ui_general_screen_title2").css("pointer-events", "none");
	$(".ui_general_screen_title").css("pointer-events", "none");
	$(".ui_tryagain_score_text").css("pointer-events", "none");
	$(".ui_tryagain_highscore_text").css("pointer-events", "none");
	$(".ui_tryagain_score_numb").css("pointer-events", "none")
};
GuiTryAgain.prototype.onClick = function(a) {
	switch (a.id) {
	case "btn_mainmenu":
		Application.instance.stopAllSounds();
		GuiManager.instance.newSound = !0;
		GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU);
		Global.achievements.resetGameData();
		break;
	case "btn_retry":
		Global.savedNumData[Global.INDEX_CURRENT_LIVES]++,
		Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)),
		GuiManager.instance.gotoScreen(GuiManager.SC_GAME)
	}
	Application.instance.playSound("SND_UI_BUTTON")
};
GuiTryAgain.prototype.onPressSpaceBar = function() {
	GuiManager.instance.gotoScreen(GuiManager.SC_GAME);
	GuiTryAgain.superClass_.onPressSpaceBar.call(this)
};
GuiTryAgain.prototype.onEndTransition = function(a) {
	GuiTryAgain.superClass_.onEndTransition.call(this, a);
	a.params && Application.instance.guiManager.gotoScreen(a.params.screen)
};
function GuiTrophies(a, b, c) {
	SScreen.call(this, a, b, c)
}
goog.inherits(GuiTrophies, SScreen);
GuiTrophies.prototype.setGuiHTML = function() {
	this.css = " .ui_trophies_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_trophies_background.jpg)no-repeat right top; } .ui_trophies_image {  background: url(media/images/ui_images/screens/gui_screens_trophies_trophy.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 169px;  height: 168px;  width: 168px;  position: absolute;  left: 290px; } .ui_trophies_image.i1 {  background-position: 0px 0px; } .ui_trophies_image.i2 {  background-position: -168px 0px; } .ui_trophies_image.i3 {  background-position: -336px 0px; } .ui_trophies_image.i4 {  background-position: -504px 0px; } .ui_trophies_image.i5 {  background-position: -672px 0px; } .ui_trophies_image_locked {  background: url(media/images/ui_images/screens/gui_screens_trophies_trophy.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 169px;  height: 168px;  width: 168px;  position: absolute;  left: 290px; } .ui_trophies_image_locked.i1 {  background-position: -840px  0px; } .ui_trophies_image_locked.i2 {  background-position: -1008px  0px; } .ui_trophies_image_locked.i3 {  background-position: -1176px  0px; } .ui_trophies_image_locked.i4 {  background-position: -1344px  0px; } .ui_trophies_image_locked.i5 {  background-position: -1512px  0px; } .ui_trophies_selected {  position: absolute;  top: 342px;  width: 143px;  height: 143px;  cursor: pointer;  background: url(media/images/ui_images/buttons/gui_buttons_trophies.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0); } .ui_trophies_selected.s1 {  left: 47px;  background-position: -143px  0px; } .ui_trophies_selected.s2 {  left: 176px;  background-position: -715px  0px; } .ui_trophies_selected.s3 {  left: 305px;  background-position: -1287px 0px; } .ui_trophies_selected.s4 {  left: 435px;  background-position: -1859px 0px; } .ui_trophies_selected.s5 {  left: 565px;  background-position: -2431px 0px; } .ui_trophies_trophy_locked {  position: absolute;  top: 342px;  width: 143px;  height: 143px;  cursor: pointer;  background: url(media/images/ui_images/buttons/gui_buttons_trophies.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0); } .ui_trophies_trophy_locked.t1 {  left: 47px;  background-position: -286px 0px; } .ui_trophies_trophy_locked.t1:hover {  background-position: -429px 0px; } .ui_trophies_trophy_locked.t2 {  left: 176px;  background-position: -858px 0px; } .ui_trophies_trophy_locked.t2:hover {  background-position: -1001px 0px; } .ui_trophies_trophy_locked.t3 {  left: 305px;  background-position: -1430px 0px; } .ui_trophies_trophy_locked.t3:hover {  background-position: -1573px 0px; } .ui_trophies_trophy_locked.t4 {  left: 435px;  background-position: -2002px 0px; } .ui_trophies_trophy_locked.t4:hover {  background-position: -2145px 0px; } .ui_trophies_trophy_locked.t5 {  left: 565px;  background-position: -2574px 0px; } .ui_trophies_trophy_locked.t5:hover {  background-position: -2717px 0px; } .ui_trophieslocked_selected {  position: absolute;  top: 342px;  width: 143px;  height: 143px;  cursor: pointer;  background: url(media/images/ui_images/buttons/gui_buttons_trophies.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0); } .ui_trophieslocked_selected.s1 {  left: 47px;  background-position: -429px  0px; } .ui_trophieslocked_selected.s2 {  left: 176px;  background-position: -1001px  0px; } .ui_trophieslocked_selected.s3 {  left: 305px;  background-position: -1573px 0px; } .ui_trophieslocked_selected.s4 {  left: 435px;  background-position: -2145px 0px; } .ui_trophieslocked_selected.s5 {  left: 565px;  background-position: -2717px 0px; } .ui_trophies_trophy {  position: absolute;  top: 342px;  width: 143px;  height: 143px;  cursor: pointer;  background: url(media/images/ui_images/buttons/gui_buttons_trophies.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0); } .ui_trophies_trophy.t1 {  left: 47px;  background-position: 0px 0px; } .ui_trophies_trophy.t1:hover {  background-position: -143px  0px; } .ui_trophies_trophy.t2 {  left: 176px;  background-position: -572px  0px; } .ui_trophies_trophy.t2:hover {  background-position: -715px  0px; } .ui_trophies_trophy.t3 {  left: 305px;  background-position: -1144px  0px; } .ui_trophies_trophy.t3:hover {  background-position: -1287px  0px; } .ui_trophies_trophy.t4 {  left: 435px;  background-position: -1716px  0px; } .ui_trophies_trophy.t4:hover {  background-position: -1859px  0px; } .ui_trophies_trophy.t5 {  left: 565px;  background-position: -2288px  0px; } .ui_trophies_trophy.t5:hover {  background-position: -2431px  0px; } .ui_trophies_text {  position: absolute;  color: #fff349;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 18px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  padding-top: 5px; } .ui_trophies_text.t1 {  top: 60px;  left: 0px;  width: 750px;  height: 28px; } .ui_trophies_text.t2 {  top: 86px;  left: 257px;  color: #ffffff;  width: 230px;  height: 43px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_trophies_bg'>    <div class='ui_general_screen_title2'>" + Application.strings.STR_TROPHY_TITLE + "</div>  <div class='ui_general_screen_title'>" + Application.strings.STR_TROPHY_TITLE + "</div>  <div class='ui_trophies_text t2'>" + Application.strings.STR_TROPHY_DESCRIPTION_1 + "</div>  <div class='ui_trophies_text t1'>" + Application.strings.STR_TROPHY_NAME_1 + "</div>  <div class='ui_trophies_image_locked i1'></div>  <div class='ui_trophies_image_locked i2'></div>  <div class='ui_trophies_image_locked i3'></div>  <div class='ui_trophies_image_locked i4'></div>  <div class='ui_trophies_image_locked i5'></div>  <div class='ui_trophies_image i1'></div>  <div class='ui_trophies_image i2'></div>  <div class='ui_trophies_image i3'></div>  <div class='ui_trophies_image i4'></div>  <div class='ui_trophies_image i5'></div>  <div class='ui_trophies_selected s1' id='select_trophy01'></div>  <div class='ui_trophies_selected s2' id='select_trophy02'></div>  <div class='ui_trophies_selected s3' id='select_trophy03'></div>  <div class='ui_trophies_selected s4' id='select_trophy04'></div>  <div class='ui_trophies_selected s5' id='select_trophy05'></div>  <div class='ui_trophies_trophy t1' id='trophy_01'></div>  <div class='ui_trophies_trophy t2' id='trophy_02'></div>  <div class='ui_trophies_trophy t3' id='trophy_03'></div>  <div class='ui_trophies_trophy t4' id='trophy_04'></div>  <div class='ui_trophies_trophy t5' id='trophy_05'></div>  <div class='ui_trophieslocked_selected s1' id='select_trophylocked01'></div>  <div class='ui_trophieslocked_selected s2' id='select_trophylocked02'></div>  <div class='ui_trophieslocked_selected s3' id='select_trophylocked03'></div>  <div class='ui_trophieslocked_selected s4' id='select_trophylocked04'></div>  <div class='ui_trophieslocked_selected s5' id='select_trophylocked05'></div>  <div class='ui_trophies_trophy_locked t1' id='trophy_locked01'></div>  <div class='ui_trophies_trophy_locked t2' id='trophy_locked02'></div>  <div class='ui_trophies_trophy_locked t3' id='trophy_locked03'></div>  <div class='ui_trophies_trophy_locked t4' id='trophy_locked04'></div>  <div class='ui_trophies_trophy_locked t5' id='trophy_locked05'></div>  <div class='ui_general_button_mainmenu2 b1' id='btn_mainmenu'></div>   </div> </div>";
	GuiTrophies.superClass_.setGuiHTML.call(this)
};
GuiTrophies.prototype.init = function() {
	GuiTrophies.superClass_.init.call(this);
	$(".ui_trophies_text").css("pointer-events", "none");
	$(".ui_general_screen_title").css("pointer-events", "none");
	$(".ui_general_screen_title2").css("pointer_events", "none");
	this.addClickListener("btn_mainmenu");
	for (var a = 1; 5 >= a; a++) $(".ui_trophies_trophy_locked.t" + a).css("display", 0 === Global.savedNumData[Global.INDEX_TROPHY_1 + a - 1] ? "": "none"),
	$(".ui_trophies_trophy.t" + a).css("display", 0 !== Global.savedNumData[Global.INDEX_TROPHY_1 + a - 1] ? "": "none"),
	this.addClickListener("trophy_0" + a),
	this.addClickListener("trophy_locked0" + a);
	this.showTrophy(1)
};
GuiTrophies.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_mainmenu":
		GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU);
		break;
	case "trophy_locked01":
	case "trophy_01":
		this.showTrophy(1);
		break;
	case "trophy_locked02":
	case "trophy_02":
		this.showTrophy(2);
		break;
	case "trophy_locked03":
	case "trophy_03":
		this.showTrophy(3);
		break;
	case "trophy_locked04":
	case "trophy_04":
		this.showTrophy(4);
		break;
	case "trophy_locked05":
	case "trophy_05":
		this.showTrophy(5)
	}
};
GuiTrophies.prototype.onPressSpaceBar = function() {
	GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU);
	GuiTrophies.superClass_.onPressSpaceBar.call(this)
};
GuiTrophies.prototype.onEndTransition = function(a) {
	GuiTrophies.superClass_.onEndTransition.call(this, a);
	a.params && Application.instance.guiManager.gotoScreen(a.params.screen)
};
GuiTrophies.prototype.showTrophy = function(a) {
	$(".ui_trophies_selected").css("display", "none");
	$(".ui_trophieslocked_selected").css("display", "none");
	$(".ui_trophies_image").css("display", "none");
	$(".ui_trophies_image_locked").css("display", "none");
	$(1 === Global.savedNumData[Global.INDEX_TROPHY_1 - 1 + a] ? ".ui_trophies_image.i" + a: ".ui_trophies_image_locked.i" + a).css("display", "");
	$(".ui_trophies_text.t1").html(Application.strings["STR_TROPHY_NAME_" + a]);
	$(".ui_trophies_text.t2").html(Application.strings["STR_TROPHY_DESCRIPTION_" + a]);
	for (var b = 1; 5 >= b; b++) 0 === Global.savedNumData[Global.INDEX_TROPHY_1 + b - 1] ? $(".ui_trophies_trophy_locked.t" + b).css("display", "") : $(".ui_trophies_trophy.t" + b).css("display", "");
	$(".ui_trophies_trophy_locked.t" + a).css("display", "none");
	$(".ui_trophies_trophy.t" + a).css("display", "none");
	$(0 === Global.savedNumData[Global.INDEX_TROPHY_1 + a - 1] ? ".ui_trophieslocked_selected.s" + a: ".ui_trophies_selected.s" + a).css("display", "")
};
function GuiGame(a, b, c) {
	ScreenGame.call(this, a, b);
	GuiGame.instance = this;
	this.canvasGame = Application.instance.addDisplayContainer();
	this.canvasControls = Application.instance.addDisplayContainer();
	Application.instance.core.rootScene.addChild(this.canvasGame);
	Application.instance.core.rootScene.addChild(this.canvasControls);
	this.createGame();
	Application.instance.stopAllSounds();
	switch (Global.savedNumData[Global.INDEX_CURRENT_ROOM]) {
	case 0:
	case 14:
		Application.instance.playSound("SND_BG_TUTORIAL");
		break;
	case 1:
	case 3:
		Application.instance.playSound("SND_BG_GF_REGULAR");
		break;
	case 2:
	case 5:
		Application.instance.playSound("SND_BG_WOY_REGULAR");
		break;
	case 4:
	case 8:
		Application.instance.playSound("SND_BG_PF_REGULAR");
		break;
	case 6:
	case 7:
		Application.instance.playSound("SND_BG_RC_REGULAR");
		break;
	case 9:
		Application.instance.playSound("SND_BG_RC_BOSS");
		break;
	case 10:
		Application.instance.playSound("SND_BG_GF_BOSS");
		break;
	case 11:
		Application.instance.playSound("SND_BG_WOY_BOSS");
		break;
	case 12:
		Application.instance.playSound("SND_BG_PF_BOSS");
		break;
	case 13:
		Application.instance.playSound("SND_BG_GF_BOSS")
	}
}
goog.inherits(GuiGame, ScreenGame);
GuiGame.instance = null;
GuiGame.TX_INIT_GAME = 0;
GuiGame.TX_REMOVE_GAME = 1;
GuiGame.prototype.createGame = function() {
	Global.game = this.game = new GameVillains(this.canvasGame, "VU_Level01", this.canvasControls)
};
GuiGame.prototype.removeGame = function() {
	this.m_deleteGame || (this.m_deleteGame = !0, this.game.free(), this.game = null, 0 === Global.savedNumData[Global.INDEX_CURRENT_LIVES] && GuiManager.instance.gotoScreen(GuiManager.SC_TRY_AGAIN))
};
GuiGame.prototype.onEndTransition = function(a) {
	GuiGame.superClass_.onEndTransition.call(this, a);
	if (a.params) switch (a.params.action) {
	case GuiGame.TX_REMOVE_GAME:
		this.game.free(),
		this.game = null,
		Application.instance.guiManager.gotoScreen(GuiManager.SC_MAIN_MENU)
	}
};
GuiGame.prototype.update = function(a) {
	GuiGame.superClass_.update.call(this, a)
};
GuiGame.prototype.free = function() {
	Application.instance.stopAllSounds();
	Global.game = null;
	GuiGame.instance = null;
	Application.instance.core.rootScene.removeChild(this.canvasGame);
	Application.instance.core.rootScene.removeChild(this.canvasControls);
	this.canvasGame = null;
	GuiGame.superClass_.free.call(this)
};
function GuiPopupPause(a, b, c) {
	SScreen.call(this, a, b, c);
	this.name = "pause"
}
goog.inherits(GuiPopupPause, SScreen);
GuiPopupPause.prototype.setGuiHTML = function() {
	this.css = " .ui_popup_buttons_resume {  position: absolute;  width: 120px;  height: 119px;  background: url(media/images/ui_images/buttons/gui_buttons_icons01.png) no-repeat right top;  cursor: pointer; } .ui_popup_buttons_resume.r1 {  top: 171px;  left: 413px;  background-position: -720px 0px; } .ui_popup_buttons_resume.r1:hover {  background-position: -840px 0px; } .ui_popup_buttons_quit {  position: absolute;  top: 185px;  left: 230px;  width: 94px;  height: 93px;  background: url(media/images/ui_images/buttons/gui_buttons_icons02.png) no-repeat right top;  cursor: pointer; } .ui_popup_buttons_quit.q1 {  background-position: -376px 0px; } .ui_popup_buttons_quit.q1:hover {  background-position: -470px 0px; } .ui_popup_buttons_control {  position: absolute;  top: 335px;  left: 447px;  width: 62px;  height: 63px;  background: url(media/images/ui_images/buttons/gui_buttons_icons04.png) no-repeat right top;  cursor: pointer; } .ui_popup_buttons_control.c1 {  background-position: 0px 0px; } .ui_popup_buttons_control.c1:hover {  background-position: -62px 0px; } .ui_popup_buttons_help {  position: absolute;  top: 335px;  left: 256px;  width: 62px;  height: 63px;  background: url(media/images/ui_images/buttons/gui_buttons_icons03.png) no-repeat right top;  cursor: pointer; } .ui_popup_buttons_help.h1 {  background-position: 0px 0px; } .ui_popup_buttons_help.h1:hover {  background-position: -62px 0px; } .ui_popup_buttons_sound {  position: absolute;  top: 335px;  left: 350px;  width: 62px;  height: 63px;  background: url(media/images/ui_images/buttons/gui_buttons_icons03.png) no-repeat right top;  cursor: pointer; } .ui_popup_buttons_sound.t1 {  background-position: -372px 0px; } .ui_popup_buttons_sound.t1:hover {  background-position: -434px 0px; } .ui_popup_buttons_sound.t2 {  background-position: -496px 0px; } .ui_popup_buttons_sound.t2:hover {  background-position: -558px 0px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_general_popup_bg'></div>  <div class='ui_general_popup_support'>  <div class='ui_general_popup_title t2'><p>" + Application.strings.STR_PAUSE_POPUP + "</p></div>  <div class='ui_general_popup_title t1'><p>" + Application.strings.STR_PAUSE_POPUP + "</p></div>  <div class='ui_popup_buttons_resume r1' id='btn_resume'></div>  <div class='ui_popup_buttons_help h1' id='btn_help'></div>  <div class='ui_popup_buttons_sound t1' id='btn_soundon_pause'></div>  <div class='ui_popup_buttons_sound t2' id='btn_soundoff_pause'></div>  <div class='ui_popup_buttons_quit q1' id='btn_quit'></div>  <div class='ui_popup_buttons_control c1' id='btn_control'></div> </div>";
	GuiPopupPause.superClass_.setGuiHTML.call(this)
};
GuiPopupPause.prototype.init = function() {
	GuiPopupPause.superClass_.init.call(this);
	$(".ui_general_popup_title").css("pointer-events", "none");
	$(".ui_popup_buttons_sound.t2").css("display", Application.instance.isSoundOn() ? "none": "");
	$(".ui_popup_buttons_sound.t1").css("display", Application.instance.isSoundOn() ? "": "none");
	this.addClickListener("btn_resume");
	this.addClickListener("btn_control");
	this.addClickListener("btn_help");
	this.addClickListener("btn_soundon_pause");
	this.addClickListener("btn_soundoff_pause");
	this.addClickListener("btn_quit")
};
GuiPopupPause.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_resume":
		this.screenParent.dropPopup();
		if (Global.game) Global.game.onLostFocus();
		break;
	case "btn_control":
		this.screenParent.addPopup(GuiDifficultySelected, 0, 0);
		break;
	case "btn_help":
		this.screenParent.addPopup(GuiHelp, 0, 0);
		break;
	case "btn_soundon_pause":
		$(".ui_popup_buttons_sound.t1").css({
			display:
			"none"
		});
		$(".ui_popup_buttons_sound.t2").css({
			display:
			""
		});
		Application.instance.toogleMute();
		break;
	case "btn_soundoff_pause":
		$(".ui_popup_buttons_sound.t1").css({
			display:
			""
		});
		$(".ui_popup_buttons_sound.t2").css({
			display:
			"none"
		});
		Application.instance.toogleMute();
		break;
	case "btn_quit":
		this.screenParent.addPopup(GuiConfirm, 0, 0)
	}
};
GuiPopupPause.prototype.onEndTransition = function(a) {
	GuiPopupPause.superClass_.onEndTransition.call(this, a);
	a.params && Application.instance.guiManager.gotoScreen(a.params.screen)
};
GuiPopupPause.prototype.update = function(a) {
	GuiPopupPause.superClass_.update.call(this, a)
};
GuiPopupPause.prototype.onMouseUp = function(a) {
	GuiPopupPause.superClass_.onMouseUp.call(this, a);
	GuiManager.instance.gotoScreen(GuiManager.SC_GAME)
};
GuiPopupPause.prototype.onPressSpaceBar = function() {
	GuiPopupPause.superClass_.onPressSpaceBar.call(this);
	GuiManager.instance.gotoScreen(GuiManager.SC_GAME)
};
GuiPopupPause.prototype.onTransitionIn = function() {
	$(".ui_popup_buttons.son1").css({
		display: "none"
	});
	$(".ui_popup_buttons.sof1").css({
		display: "none"
	});
	Application.instance && (Application.instance.soundManager.mute ? $(".ui_popup_buttons.sof1").css({
		display: ""
	}) : $(".ui_popup_buttons.son1").css({
		display: ""
	}))
};
function GuiMainMenu(a, b, c) {
	SScreen.call(this, a, b, c);
	GuiMainMenu.doneFirstLoader = !0
}
goog.inherits(GuiMainMenu, SScreen);
GuiMainMenu.prototype.setGuiHTML = function() {
	this.css = " .ui_mainmenu_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_mainmenu_background.jpg); } .ui_mainmenu_logo {  position: absolute;  top: 67px;  left: 263px;  width: 200px;  height: 100px;  background: url(media/images/localized/gui_screens_mainmenu_logo.png); } .ui_mainmenu_name {  position: absolute;  top: 176px;  left: 0px;  width: 750px;  height: 180px;  background: url(media/images/localized/gui_screens_mainmenu_gamename.png); } .ui_mainmenu_button_text {  background: url('media/images/ui_images/buttons/gui_buttons_text01.png') no-repeat scroll right top rgba(0, 0, 0, 0);  color: #103579;  cursor: pointer;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 28px;  height: 101px;  left: 242px;  padding-top: 26px;  position: absolute;  text-align: center;  top: 349px;  width: 260px; } .ui_mainmenu_button_text.b1 {  background-position: 0px 0px; } .ui_mainmenu_button_text.b1:hover {  background-position: -260px 0px;  font-size: 32px; } .ui_mainmenu_button_text02 {  background: url('media/images/ui_images/buttons/gui_buttons_text02.png') no-repeat scroll right top rgba(0, 0, 0, 0);  color: #103579;  cursor: pointer;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 15px;  height: 63px;  padding-top: 23px;  position: absolute;  text-align: center;  top: 364px;  width: 200px; } .ui_mainmenu_button_text02.b1 {  background-position: 0px 0px;  left: 172px; } .ui_mainmenu_button_text02.b1:hover {  background-position: -200px 0px;  font-size: 18px; } .ui_mainmenu_button_text02.b2 {  background-position: 0px 0px;  left: 378px; } .ui_mainmenu_button_text02.b2:hover {  background-position: -200px 0px;  font-size: 18px; } .ui_mainmenu_button_trophy {  position: absolute;  top: 333px;  left: 664px;  width: 62px;  height: 63px;  background: url(media/images/ui_images/buttons/gui_buttons_icons03.png) no-repeat right top;  cursor: pointer; } .ui_mainmenu_button_trophy.t1 {  background-position: -620px 0px; } .ui_mainmenu_button_trophy.t1:hover {  background-position: -682px 0px; } .ui_mainmenu_button_sound {  position: absolute;  background: url('media/images/ui_images/buttons/gui_buttons_icons03.png') no-repeat scroll right top rgba(0, 0, 0, 0);  cursor: pointer;  left: 664px;  width: 62px;  height: 63px;  top: 398px; } .ui_mainmenu_button_sound.s1 {  background-position: -372px  0px; } .ui_mainmenu_button_sound.s1:hover {  background-position: -434px  0px; } .ui_mainmenu_button_sound.s2 {  background-position: -496px 0px; } .ui_mainmenu_button_sound.s2:hover {  background-position: -558px 0px; } .ui_mainmenu_highscoretext {  color: #ffffff;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 14px;  height: 21px;  left: 604px;  position: absolute;  text-align: center;  top: 7px;  width: 146px; } .ui_mainmenu_highscorenumber {  color: #fefe26;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 20px;  height: 26px;  left: 613px;  position: absolute;  text-align: center;  top: 23px;  width: 133px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_mainmenu_bg'>  <div class='ui_mainmenu_logo'></div>  <div class='ui_mainmenu_name'></div>  <div class='ui_mainmenu_button_text02 b1' id='btn_newgame'>" + Application.strings.STR_BTN_NEW_GAME + "</div>  <div class='ui_mainmenu_button_text02 b2' id='btn_continue'>" + Application.strings.STR_BTN_CONTINUE + "</div>  <div class='ui_mainmenu_button_text b1' id='btn_play'>" + Application.strings.STR_BTN_PLAY + "</div>  <div class='ui_mainmenu_button_trophy t1' id='btn_trophy'></div>  <div class='ui_mainmenu_button_sound s1' id='btn_soundoff'></div>  <div class='ui_mainmenu_button_sound s2' id='btn_soundon'></div>  <div class='ui_mainmenu_highscoretext'>" + Application.strings.STR_HIGH_SCORE + "</div>  <div class='ui_mainmenu_highscorenumber'>" + Application.strings.STR_SCORE + "</div>   </div> </div>";
	GuiMainMenu.superClass_.setGuiHTML.call(this)
};
GuiMainMenu.prototype.init = function() {
	GuiMainMenu.superClass_.init.call(this);
	$(".ui_mainmenu_highscoretext").css("pointer-events", "none");
	$(".ui_mainmenu_highscorenumber").css("pointer-events", "none");
	Application.instance.onOrientationchange(null);
	$(".ui_mainmenu_button_text02").css("display", 1 === Global.savedNumData[Global.INDEX_FIRST_GAME] ? "": "none");
	$(".ui_mainmenu_button_text").css("display", 1 === Global.savedNumData[Global.INDEX_FIRST_GAME] ? "none": "");
	$(".ui_mainmenu_button_sound.s1").css("display", Application.instance.isSoundOn() ? "": "none");
	$(".ui_mainmenu_button_sound.s2").css("display", Application.instance.isSoundOn() ? "none": "");
	this.addClickListener("btn_play");
	this.addClickListener("btn_continue");
	this.addClickListener("btn_newgame");
	this.addClickListener("btn_trophy");
	this.addClickListener("btn_soundoff");
	this.addClickListener("btn_soundon");
	$(".ui_mainmenu_highscorenumber").html("" + Global.savedNumData[Global.INDEX_HIGHEST_SCORE]);
	GuiManager.instance.newSound && (Application.instance.stopAllSounds(), GuiManager.instance.newSound = !1, Application.instance.playSound("SND_BG_MENU"))
};
GuiMainMenu.prototype.onClick = function(a) {
	switch (a.id) {
	case "btn_continue":
		Application.instance.playSound("SND_UI_BUTTON_PLAY");
		Global.playerSelected = Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER];
		GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_DIFFICULTY);
		break;
	case "btn_play":
		Application.instance.playSound("SND_UI_BUTTON_PLAY");
		GuiManager.instance.gotoScreen(GuiManager.SC_CUTSCENE);
		break;
	case "btn_trophy":
		Application.instance.playSound("SND_UI_BUTTON");
		GuiManager.instance.gotoScreen(GuiManager.SC_TROPHIES);
		break;
	case "btn_newgame":
		Application.instance.playSound("SND_UI_BUTTON");
		this.addPopup(GuiConfirm, 0, 0);
		GuiConfirm.instance.setDeleteDataMode();
		break;
	case "btn_soundoff":
		Application.instance.toogleMute();
		$(".ui_mainmenu_button_sound.s1").css("display", "none");
		$(".ui_mainmenu_button_sound.s2").css("display", "");
		break;
	case "btn_soundon":
		Application.instance.toogleMute(),
		Application.instance.playSound("SND_UI_BUTTON"),
		$(".ui_mainmenu_button_sound.s1").css("display", ""),
		$(".ui_mainmenu_button_sound.s2").css("display", "none")
	}
};
GuiMainMenu.prototype.onEndTransition = function(a) {
	GuiMainMenu.superClass_.onEndTransition.call(this, a);
	a.params && Application.instance.guiManager.gotoScreen(a.params.screen)
};
GuiMainMenu.prototype.update = function(a) {
	GuiMainMenu.superClass_.update.call(this, a)
};
GuiMainMenu.prototype.onMouseUp = function(a) {
	GuiMainMenu.superClass_.onMouseUp.call(this, a);
	GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_PLAYER)
};
GuiMainMenu.prototype.onPressSpaceBar = function() {
	GuiMainMenu.superClass_.onPressSpaceBar.call(this);
	GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_PLAYER)
};
function GuiPlayerSelected(a, b, c) {
	SScreen.call(this, a, b, c)
}
goog.inherits(GuiPlayerSelected, SScreen);
GuiPlayerSelected.prototype.setGuiHTML = function() {
	this.css = " .ui_player_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_selectcharacter_background.jpg)no-repeat right top; } .ui_player_character {  background: url(media/images/ui_images/buttons/gui_buttons_character.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 358px;  cursor: pointer;  height: 130px;  width: 140px;  position: absolute;  left: 222px; } .ui_player_character.c1 {  background-position: 0px 0px;  left: 27px; } .ui_player_character.c1:hover {  background-position: -140px 0px; } .ui_player_character.c2 {  background-position: -280px 0px;  left: 170px; } .ui_player_character.c2:hover {  background-position: -420px 0px; } .ui_player_character.c3 {  background-position: -560px 0px;  left: 313px; } .ui_player_character.c3:hover {  background-position: -700px 0px; } .ui_player_character.c4 {  background-position: -840px 0px;  left: 449px; } .ui_player_character.c4:hover {  background-position: -980px 0px; } .ui_player_character.c5 {  background-position: -1120px 0px;  left: 587px; } .ui_player_character.c5:hover {  background-position: -1260px 0px; } .ui_player_character_s {  background: url(media/images/ui_images/buttons/gui_buttons_character.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 358px;  height: 130px;  width: 140px;  position: absolute;  left: 232px;  cursor: pointer; } .ui_player_character_s.c1 {  background-position: -140px 0px;  left: 27px; } .ui_player_character_s.c2 {  background-position: -420px 0px;  left: 170px; } .ui_player_character_s.c3 {  background-position: -700px 0px;  left: 313px; } .ui_player_character_s.c4 {  background-position: -980px 0px;  left: 449px; } .ui_player_character_s.c5 {  background-position: -1260px 0px;  left: 587px; } .ui_player_image1 {  background: url(media/images/ui_images/screens/gui_screens_selectcharacter_character01.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 177px;  height: 173px;  width: 152px;  position: absolute;  left: 299px; } .ui_player_image2 {  background: url(media/images/ui_images/screens/gui_screens_selectcharacter_character05.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 152px;  height: 200px;  width: 114px;  position: absolute;  left: 303px; } .ui_player_image3 {  background: url(media/images/ui_images/screens/gui_screens_selectcharacter_character02.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 120px;  height: 239px;  width: 429px;  position: absolute;  left: 160px; } .ui_player_image4 {  background: url(media/images/ui_images/screens/gui_screens_selectcharacter_character03.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 125px;  height: 224px;  width: 267px;  position: absolute;  left: 214px; } .ui_player_image5 {  background: url(media/images/ui_images/screens/gui_screens_selectcharacter_character04.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);  top: 134px;  height: 223px;  width: 133px;  position: absolute;  left: 310px; } .ui_player_button_play {  position: absolute;  top: 200px;  right: 0px;  width: 120px;  height: 119px;  background: url(media/images/ui_images/buttons/gui_buttons_icons01.png) no-repeat right top;  cursor: pointer; } .ui_player_button_play.b1 {  background-position: -720px 0px; } .ui_player_button_play.b1:hover {  background-position: -840px 0px; } .ui_player_name {  position: absolute;  color: #fefe26;  font-family: 'bamtangllamagenialgordisXBd';  font-size: 20px;  display: table-cell;  vertical-align: middle;  text-align: center;  font-smooth: always;  width: 750px;  height: 29px;  top: 73px;  left: -8px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_player_bg'>    <div class='ui_general_screen_title2'>" + Application.strings.STR_SELECT_PLAYER_TITLE + "</div>  <div class='ui_general_screen_title'>" + Application.strings.STR_SELECT_PLAYER_TITLE + "</div>  <div class='ui_player_character_s c1' id='character01'></div>  <div class='ui_player_character_s c2' id='character02'></div>  <div class='ui_player_character_s c3' id='character03'></div>  <div class='ui_player_character_s c4' id='character04'></div>  <div class='ui_player_character_s c5' id='character05'></div>  <div class='ui_player_character c1' id='btn_player01'></div>  <div class='ui_player_character c2' id='btn_player02'></div>  <div class='ui_player_character c3' id='btn_player03'></div>  <div class='ui_player_character c4' id='btn_player04'></div>  <div class='ui_player_character c5' id='btn_player05'></div>  <div class='ui_player_image1'></div>  <div class='ui_player_image2'></div>  <div class='ui_player_image3'></div>  <div class='ui_player_image4'></div>  <div class='ui_player_image5'></div>  <div class='ui_player_name'>" + Application.strings.STR_SELECT_PLAYER + "</div>  <div class='ui_general_button_mainmenu2 b1' id='btn_mainmenu'></div>  <div class='ui_general_button_next b1' id='btn_next'></div>   </div> </div>";
	GuiPlayerSelected.superClass_.setGuiHTML.call(this)
};
GuiPlayerSelected.prototype.init = function() {
	GuiPlayerSelected.superClass_.init.call(this);
	$(".ui_player_name").css("pointer-events", "none");
	$(".ui_general_screen_title").css("pointer-events", "none");
	$(".ui_general_screen_title2").css("pointer-events", "none");
	this.addClickListener("btn_mainmenu");
	this.addClickListener("btn_next");
	for (var a = 1; 5 >= a; a++) $(".ui_player_image" + a).css("display", "none"),
	this.addClickListener("btn_player0" + a),
	this.addClickListener("character0" + a);
	Global.playerSelected = 0;
	this.displayPlayer(0);
	$(".ui_general_button_next").css("display", "none");
	GuiManager.instance.newSound && (Application.instance.stopAllSounds(), GuiManager.instance.newSound = !1, Application.instance.playSound("SND_BG_MENU"));
	$(".ui_player_character_s").css("display", "none");
	$(".ui_player_character").css("display", "")
};
GuiPlayerSelected.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	switch (a.id) {
	case "btn_mainmenu":
		GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU);
		break;
	case "btn_next":
		0 !== Global.playerSelected && (GuiManager.instance.gotoScreen(GuiManager.SC_SELECT_DIFFICULTY), Global.savedNumData[Global.INDEX_FIRST_GAME] = 1, Global.savedNumData[Global.INDEX_CHOSEN_CHARACTER] = Global.playerSelected, Common.saveData(Global.KEY_NUM_DATA, Common.storageString(Global.savedNumData)));
		break;
	case "character01":
	case "btn_player01":
		this.displayPlayer(1);
		break;
	case "character02":
	case "btn_player02":
		this.displayPlayer(2);
		break;
	case "character03":
	case "btn_player03":
		this.displayPlayer(3);
		break;
	case "character04":
	case "btn_player04":
		this.displayPlayer(4);
		break;
	case "character05":
	case "btn_player05":
		this.displayPlayer(5)
	}
};
GuiPlayerSelected.prototype.displayPlayer = function(a) {
	if (0 === a) $(".ui_player_name").css("display", "none");
	else {
		for (var b = 1; 5 >= b; b++) $(".ui_player_image" + b).css("display", b === a ? "": "none"),
		$(".ui_player_name").html(Application.strings["STR_PLAYERNAME_" + a]),
		$(".ui_player_name").css("display", "");
		$(".ui_player_character_s").css("display", "none");
		$(".ui_player_character_s.c" + a).css("display", "");
		$(".ui_player_character").css("display", "");
		$(".ui_player_character.c" + a).css("display", "none");
		Global.playerSelected = a;
		$(".ui_general_button_next").css("display", "")
	}
};
GuiPlayerSelected.prototype.onPressSpaceBar = function() {
	GuiManager.instance.gotoScreen(GuiManager.SC_GAME);
	GuiPlayerSelected.superClass_.onPressSpaceBar.call(this)
};
GuiPlayerSelected.prototype.onEndTransition = function(a) {
	GuiPlayerSelected.superClass_.onEndTransition.call(this, a);
	a.params && Application.instance.guiManager.gotoScreen(a.params.screen)
};
function GuiDifficultySelected(a, b, c) {
	SScreen.call(this, a, b, c)
}
goog.inherits(GuiDifficultySelected, SScreen);
GuiDifficultySelected.prototype.setGuiHTML = function() {
	this.css = " .ui_selectd_bg {  position: absolute;  top: 0px;  left: 0px;  width: 750px;  height: 500px;  background: url(media/images/ui_images/screens/gui_screens_selectdifficulty_background.jpg)no-repeat right top; } .ui_selectd_button_text03 {  background: url('media/images/ui_images/buttons/gui_buttons_text03.png') no-repeat scroll right top rgba(0, 0, 0, 0);  color: #103579;  cursor: pointer;  font-family: 'bamtangvicunaferozgordidemiBd';  font-size: 18px;  height: 100px;  padding-top: 32px;  position: absolute;  text-align: center;  width: 318px;  left: 215px; } .ui_selectd_button_text03.b1 {  background-position: 0px 0px;  top: 163px; } .ui_selectd_button_text03.b1:hover {  background-position: -318px 0px;  font-size: 21px; } .ui_selectd_button_text03.b2 {  background-position: 0px 0px;  top: 261px; } .ui_selectd_button_text03.b2:hover {  background-position: -318px 0px;  font-size: 21px; }";
	this.html = " <div class='ui_general_container'>   <div class='ui_selectd_bg'>    <div class='ui_general_screen_title2'>" + Application.strings.STR_DIFFICULTY_TITLE + "</div>  <div class='ui_general_screen_title'>" + Application.strings.STR_DIFFICULTY_TITLE + "</div>  <div class='ui_general_button_back b1' id='btn_back'></div>  <div class='ui_selectd_button_text03 b1' id='btn_beginner'>" + Application.strings.STR_BTN_BEGINNER + "</div>  <div class='ui_selectd_button_text03 b2' id='btn_expert'>" + Application.strings.STR_BTN_EXPERT + "</div>   </div> </div>";
	GuiDifficultySelected.superClass_.setGuiHTML.call(this)
};
GuiDifficultySelected.prototype.init = function() {
	GuiDifficultySelected.superClass_.init.call(this);
	this.addClickListener("btn_back");
	this.addClickListener("btn_expert");
	this.addClickListener("btn_beginner");
	$(".ui_general_screen_title").css("pointer-events", "none");
	$(".ui_general_screen_title2").css("pointer-events", "none")
};
GuiDifficultySelected.prototype.onClick = function(a) {
	Application.instance.playSound("SND_UI_BUTTON");
	var b = GuiManager.lastScreenVisited === GuiManager.SC_SELECT_PLAYER ? GuiManager.SC_HELP: GuiManager.SC_GAME;
	switch (a.id) {
	case "btn_back":
		this.screenParent && GuiPopupPause ? this.screenParent.addPopup(GuiPopupPause, 0, 0) : GuiManager.instance.gotoScreen(GuiManager.SC_MAIN_MENU);
		break;
	case "btn_beginner":
		Global.MOBILE_MODE_GAME = 1;
		this.screenParent && GuiPopupPause ? (this.screenParent.dropPopup(), GameVillains.instance && (GameVillains.instance.onLostFocus(), GameVillains.instance.activateGameModeAutomatic())) : GuiManager.instance.gotoScreen(b);
		break;
	case "btn_expert":
		Global.MOBILE_MODE_GAME = 2,
		this.screenParent && GuiPopupPause ? (this.screenParent.dropPopup(), GameVillains.instance && (GameVillains.instance.onLostFocus(), GameVillains.instance.createVirtualStick())) : GuiManager.instance.gotoScreen(b)
	}
};
GuiDifficultySelected.prototype.onPressSpaceBar = function() {};
GuiDifficultySelected.prototype.onEndTransition = function(a) {
	GuiDifficultySelected.superClass_.onEndTransition.call(this, a);
	a.params && Application.instance.guiManager.gotoScreen(a.params.screen)
};
function GuiManager() {
	this.loadMedia1 = [];
	for (var a = 0; a < UIAssets.screens.length; a++) this.loadMedia1.push(Global.URL_UI_IMAGES + "screens/" + UIAssets.screens[a]);
	for (a = 0; a < UIAssets.buttons.length; a++) this.loadMedia1.push(Global.URL_UI_IMAGES + "buttons/" + UIAssets.buttons[a]);
	for (a = 0; a < UIAssets.common.length; a++) this.loadMedia1.push(Global.URL_UI_IMAGES + "common/" + UIAssets.common[a]);
	for (a = 0; a < UIAssets.popups.length; a++) this.loadMedia1.push(Global.URL_UI_IMAGES + "popups/" + UIAssets.popups[a]);
	this.mainAssets = [];
	for (var b in window.Assets.assetsParams) this.mainAssets.push(Global.URL_ASSETS + window.Assets.assetsParams[b].u);
	this.m_lastScreen = "";
	ScreenManager.call(this);
	GuiManager.instance = this;
	GuiManager.lastScreenVisited = "";
	Global.savedNumData = Common.loadData(Global.KEY_NUM_DATA, Global.gameVersion + "|14|2|0|0|" + Application.config.settings.playerLives + "|" + Application.config.settings.playerStartingHp + "|1|1|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0").split("|");
	for (a = 0; a < Global.savedNumData.length; a++) Global.savedNumData[a] = parseInt(Global.savedNumData[a], 10);
	Global.achievements = new AchievementManager;
	Global.savedNumData[Global.INDEX_GAME_VERSION] !== Global.gameVersion && Global.achievements.resetAllData();
	Application.log("GET SAVED NUMS " + Global.savedNumData);
	this.newSound = !0
}
goog.inherits(GuiManager, ScreenManager);
GuiManager.instance = null;
GuiManager.oldScreen = "";
GuiManager.SOUND_PERCENT = 20;
GuiManager.SC_SELECT_DIFFICULTY = "gui_select_difficulty";
GuiManager.SC_SELECT_PLAYER = "gui_select_player";
GuiManager.SC_SOUND_LOADER = "gui_soundloader";
GuiManager.SC_CUTSCENE_2 = "gui_cutscene2";
GuiManager.SC_MAIN_MENU = "gui_main_menu";
GuiManager.SC_TRY_AGAIN = "gui_try_again";
GuiManager.SC_CUTSCENE = "gui_cutscene";
GuiManager.SC_TROPHIES = "gui_trophies";
GuiManager.SC_END_GAME = "gui_end_game";
GuiManager.SC_LOADER = "gui_loader";
GuiManager.SC_GAME = "gui_game";
GuiManager.SC_HELP = "gui_help";
GuiManager.prototype.gotoScreen = function(a) {
	GuiManager.superClass_.gotoScreen.call(this, a);
	GuiManager.lastScreenVisited = this.m_lastScreen;
	this.m_lastScreen = a;
	switch (a) {
	case GuiManager.SC_SOUND_LOADER:
		this.m_currentScreen = new GuiLoader(null, GuiManager.SC_MAIN_MENU, 0, GuiManager.SOUND_PERCENT);
		break;
	case GuiManager.SC_MAIN_MENU:
		this.mainAssets ? (this.m_currentScreen = new GuiLoader(this.mainAssets, GuiManager.SC_MAIN_MENU, GuiManager.SOUND_PERCENT), this.mainAssets = null) : this.m_currentScreen = new GuiMainMenu;
		break;
	case GuiManager.SC_GAME:
		this.m_currentScreen = new GuiGame;
		break;
	case GuiManager.SC_HELP:
		this.m_currentScreen = new GuiHelp;
		break;
	case GuiManager.SC_CUTSCENE:
		this.m_currentScreen = new GuiCutscene;
		break;
	case GuiManager.SC_CUTSCENE_2:
		this.m_currentScreen = new GuiCutsceneFinal;
		break;
	case GuiManager.SC_SELECT_DIFFICULTY:
		this.m_currentScreen = new GuiDifficultySelected;
		break;
	case GuiManager.SC_SELECT_PLAYER:
		this.loadMedia1 ? (this.m_currentScreen = new GuiLoader(this.loadMedia1, GuiManager.SC_SELECT_PLAYER), this.loadMedia1 = null) : this.m_currentScreen = new GuiPlayerSelected;
		break;
	case GuiManager.SC_TROPHIES:
		this.m_currentScreen = new GuiTrophies;
		break;
	case GuiManager.SC_END_GAME:
		this.m_currentScreen = new GuiEndGame;
		break;
	case GuiManager.SC_TRY_AGAIN:
		this.m_currentScreen = new GuiTryAgain
	}
};
GuiManager.prototype.onKeyDown = function(a) {
	GuiManager.superClass_.onKeyDown.call(this, a);
	Cheats.onKeyDown(a)
};
GuiManager.prototype.free = function() {
	GuiManager.instance = null;
	GuiManager.superClass_.free.call(this)
};
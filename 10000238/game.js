/*! game-api - v0.9.12 - 2014-06-20 */
(function(t) {
	"use strict";
	function e() {}
	function n(t) {
		if (t = t || {},
		this.IS_MASTER = t.isMaster || !1, !this.IS_MASTER) throw Error("The DataStore can only be instantiated by the Master");
		this.dataStore = {}
	}
	function i(t, e) {
		if (this.IS_MASTER = t && t.isMaster ? t.isMaster: !1, this.IS_SLAVE = !this.IS_MASTER, this.messenger = null, this.subscribers = {},
		this.moduleReady = e ? e: !1, this.gameState = "resume", !t || !t.messenger) throw Error("No messenger passed to the Game module instance");
		this.messenger = t.messenger,
		window.addEventListener ? window.addEventListener("message", this._performAction.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._performAction.bind(this))
	}
	function r(t, e) {
		t = t || {},
		this.isMaster = t.isMaster,
		this.isStandalone = t.isStandalone,
		this.messenger = t.messenger,
		this.moduleReady = e ? e: !1,
		this.timeoutAfter = 500,
		this.timeout = !1,
		this._callbacks = {
			pause: !1,
			resume: !1
		}
	}
	function o(t, e) {
		t = t || {},
		this.IS_MASTER = t.isMaster,
		this.IS_SLAVE = !this.IS_MASTER,
		this.data = t.data,
		this.messenger = t.messenger,
		this.moduleReady = e ? e: !1,
		this.gamePlayTracking = {
			started: !1,
			appid: null,
			host: null,
			timestamp: null
		},
		this.timeInGameTracking = {
			started: !1,
			appid: null,
			timestamp: null
		}
	}
	function a(t, e) {
		t = t || {},
		this.IS_MASTER = t.isMaster,
		this.IS_SLAVE = !this.IS_MASTER,
		this.moduleReady = e ? e: !1,
		this.messenger = t.messenger,
		this.components = t.components,
		this.data = t.data || null
	}
	function s(t) {
		var e = "string" == typeof t ? u(t) : t;
		e && (this.type = e.type, this.callbackId = e.callbackId, this.data = e.data)
	}
	function u(t) {
		var e, n, i, r = !1,
		o = [];
		if ("string" == typeof t && (o = t.split("|"), "gameapi" === o[0])) {
			o.shift(),
			e = o.shift(),
			i = parseInt(o.shift(), 10),
			n = o.join("|");
			try {
				r = {
					type: e,
					callbackId: i,
					data: "" !== n ? JSON.parse(n) : ""
				}
			} catch(a) {}
		}
		return r
	}
	function c(t) {
		t = t || {},
		this.IS_MASTER = "boolean" == typeof t.isMaster ? t.isMaster: !1,
		this.IS_SLAVE = !this.IS_MASTER,
		this._target = t.target,
		this._callbacks = [],
		this._channels = [],
		this.IS_MASTER && t.dataStore && (this.dataStore = t.dataStore),
		this._setupEventListener()
	}
	function p(t, n, r, o, a) {
		this.version = "0.9.12",
		this.isReady = !1,
		this._setRole(),
		this.__ = {},
		this.__.dataStore = this.IS_MASTER ? new t({
			isMaster: !0
		}) : null,
		this.__.messenger = new n({
			isMaster: this.IS_MASTER,
			target: this._getTarget(),
			dataStore: this.__.dataStore
		}),
		this.__.components = new e,
		this.Branding = new r({
			isMaster: this.IS_MASTER,
			messenger: this.__.messenger,
			components: this.__.components
		},
		!1),
		this.__.EventTracking = new o({
			isMaster: this.IS_MASTER,
			data: null,
			messenger: this.__.messenger
		},
		!1),
		this.GameBreak = new a({
			isMaster: this.IS_MASTER,
			isStandalone: this.IS_STANDALONE,
			messenger: this.__.messenger
		},
		!1),
		this.Game = new i({
			isMaster: this.IS_MASTER,
			messenger: this.__.messenger
		},
		!1)
	}
	var l; (function(t) {
		if ("function" == typeof bootstrap) bootstrap("promise", t);
		else if ("object" == typeof exports) module.exports = t();
		else if ("function" == typeof define && define.amd) define(t);
		else if ("undefined" != typeof ses) {
			if (!ses.ok()) return;
			ses.makeQ = t
		} else l = t()
	})(function() {
		function t(t) {
			return function() {
				return F.apply(t, arguments)
			}
		}
		function e(t) {
			return t === Object(t)
		}
		function n(t) {
			return "[object StopIteration]" === ee(t) || t instanceof U
		}
		function i(t, e) {
			if (q && e.stack && "object" == typeof t && null !== t && t.stack && -1 === t.stack.indexOf(ne)) {
				for (var n = [], i = e; i; i = i.source) i.stack && n.unshift(i.stack);
				n.unshift(t.stack);
				var o = n.join("\n" + ne + "\n");
				t.stack = r(o)
			}
		}
		function r(t) {
			for (var e = t.split("\n"), n = [], i = 0; e.length > i; ++i) {
				var r = e[i];
				s(r) || o(r) || !r || n.push(r)
			}
			return n.join("\n")
		}
		function o(t) {
			return - 1 !== t.indexOf("(module.js:") || -1 !== t.indexOf("(node.js:")
		}
		function a(t) {
			var e = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);
			if (e) return [e[1], Number(e[2])];
			var n = /at ([^ ]+):(\d+):(?:\d+)$/.exec(t);
			if (n) return [n[1], Number(n[2])];
			var i = /.*@(.+):(\d+)$/.exec(t);
			return i ? [i[1], Number(i[2])] : void 0
		}
		function s(t) {
			var e = a(t);
			if (!e) return ! 1;
			var n = e[0],
			i = e[1];
			return n === J && i >= W && ae >= i
		}
		function u() {
			if (q) try {
				throw Error()
			} catch(t) {
				var e = t.stack.split("\n"),
				n = e[0].indexOf("@") > 0 ? e[1] : e[2],
				i = a(n);
				if (!i) return;
				return J = i[0],
				i[1]
			}
		}
		function c(t, e, n) {
			return function() {
				return "undefined" != typeof console && "function" == typeof console.warn && console.warn(e + " is deprecated, use " + n + " instead.", Error("").stack),
				t.apply(t, arguments)
			}
		}
		function p(t) {
			return y(t) ? t: v(t) ? T(t) : E(t)
		}
		function l() {
			function t(t) {
				e = t,
				o.source = t,
				Q(n,
				function(e, n) {
					X(function() {
						t.promiseDispatch.apply(t, n)
					})
				},
				void 0),
				n = void 0,
				i = void 0
			}
			var e, n = [],
			i = [],
			r = K(l.prototype),
			o = K(d.prototype);
			if (o.promiseDispatch = function(t, r, o) {
				var a = $(arguments);
				n ? (n.push(a), "when" === r && o[1] && i.push(o[1])) : X(function() {
					e.promiseDispatch.apply(e, a)
				})
			},
			o.valueOf = function() {
				if (n) return o;
				var t = m(e);
				return y(t) && (e = t),
				t
			},
			o.inspect = function() {
				return e ? e.inspect() : {
					state: "pending"
				}
			},
			p.longStackSupport && q) try {
				throw Error()
			} catch(a) {
				o.stack = a.stack.substring(a.stack.indexOf("\n") + 1)
			}
			return r.promise = o,
			r.resolve = function(n) {
				e || t(p(n))
			},
			r.fulfill = function(n) {
				e || t(E(n))
			},
			r.reject = function(n) {
				e || t(A(n))
			},
			r.notify = function(t) {
				e || Q(i,
				function(e, n) {
					X(function() {
						n(t)
					})
				},
				void 0)
			},
			r
		}
		function h(t) {
			if ("function" != typeof t) throw new TypeError("resolver must be a function.");
			var e = l();
			try {
				t(e.resolve, e.reject, e.notify)
			} catch(n) {
				e.reject(n)
			}
			return e.promise
		}
		function f(t) {
			return h(function(e, n) {
				for (var i = 0,
				r = t.length; r > i; i++) p(t[i]).then(e, n)
			})
		}
		function d(t, e, n) {
			void 0 === e && (e = function(t) {
				return A(Error("Promise does not support operation: " + t))
			}),
			void 0 === n && (n = function() {
				return {
					state: "unknown"
				}
			});
			var i = K(d.prototype);
			if (i.promiseDispatch = function(n, r, o) {
				var a;
				try {
					a = t[r] ? t[r].apply(i, o) : e.call(i, r, o)
				} catch(s) {
					a = A(s)
				}
				n && n(a)
			},
			i.inspect = n, n) {
				var r = n();
				"rejected" === r.state && (i.exception = r.reason),
				i.valueOf = function() {
					var t = n();
					return "pending" === t.state || "rejected" === t.state ? i: t.value
				}
			}
			return i
		}
		function g(t, e, n, i) {
			return p(t).then(e, n, i)
		}
		function m(t) {
			if (y(t)) {
				var e = t.inspect();
				if ("fulfilled" === e.state) return e.value
			}
			return t
		}
		function y(t) {
			return e(t) && "function" == typeof t.promiseDispatch && "function" == typeof t.inspect
		}
		function v(t) {
			return e(t) && "function" == typeof t.then
		}
		function _(t) {
			return y(t) && "pending" === t.inspect().state
		}
		function b(t) {
			return ! y(t) || "fulfilled" === t.inspect().state
		}
		function S(t) {
			return y(t) && "rejected" === t.inspect().state
		}
		function w() {
			ie.length = 0,
			re.length = 0,
			oe || (oe = !0)
		}
		function k(t, e) {
			oe && (re.push(t), e && e.stack !== void 0 ? ie.push(e.stack) : ie.push("(no stack) " + e))
		}
		function I(t) {
			if (oe) {
				var e = Y(re, t); - 1 !== e && (re.splice(e, 1), ie.splice(e, 1))
			}
		}
		function A(t) {
			var e = d({
				when: function(e) {
					return e && I(this),
					e ? e(t) : this
				}
			},
			function() {
				return this
			},
			function() {
				return {
					state: "rejected",
					reason: t
				}
			});
			return k(e, t),
			e
		}
		function E(t) {
			return d({
				when: function() {
					return t
				},
				get: function(e) {
					return t[e]
				},
				set: function(e, n) {
					t[e] = n
				},
				"delete": function(e) {
					delete t[e]
				},
				post: function(e, n) {
					return null === e || void 0 === e ? t.apply(void 0, n) : t[e].apply(t, n)
				},
				apply: function(e, n) {
					return t.apply(e, n)
				},
				keys: function() {
					return te(t)
				}
			},
			void 0,
			function() {
				return {
					state: "fulfilled",
					value: t
				}
			})
		}
		function T(t) {
			var e = l();
			return X(function() {
				try {
					t.then(e.resolve, e.reject, e.notify)
				} catch(n) {
					e.reject(n)
				}
			}),
			e.promise
		}
		function M(t) {
			return d({
				isDef: function() {}
			},
			function(e, n) {
				return G(t, e, n)
			},
			function() {
				return p(t).inspect()
			})
		}
		function R(t, e, n) {
			return p(t).spread(e, n)
		}
		function j(t) {
			return function() {
				function e(t, e) {
					var a;
					if ("undefined" == typeof StopIteration) {
						try {
							a = i[t](e)
						} catch(s) {
							return A(s)
						}
						return a.done ? a.value: g(a.value, r, o)
					}
					try {
						a = i[t](e)
					} catch(s) {
						return n(s) ? s.value: A(s)
					}
					return g(a, r, o)
				}
				var i = t.apply(this, arguments),
				r = e.bind(e, "next"),
				o = e.bind(e, "throw");
				return r()
			}
		}
		function L(t) {
			p.done(p.async(t)())
		}
		function P(t) {
			throw new U(t)
		}
		function N(t) {
			return function() {
				return R([this, O(arguments)],
				function(e, n) {
					return t.apply(e, n)
				})
			}
		}
		function G(t, e, n) {
			return p(t).dispatch(e, n)
		}
		function O(t) {
			return g(t,
			function(t) {
				var e = 0,
				n = l();
				return Q(t,
				function(i, r, o) {
					var a;
					y(r) && "fulfilled" === (a = r.inspect()).state ? t[o] = a.value: (++e, g(r,
					function(i) {
						t[o] = i,
						0 === --e && n.resolve(t)
					},
					n.reject,
					function(t) {
						n.notify({
							index: o,
							value: t
						})
					}))
				},
				void 0),
				0 === e && n.resolve(t),
				n.promise
			})
		}
		function x(t) {
			return g(t,
			function(t) {
				return t = z(t, p),
				g(O(z(t,
				function(t) {
					return g(t, H, H)
				})),
				function() {
					return t
				})
			})
		}
		function C(t) {
			return p(t).allSettled()
		}
		function D(t, e) {
			return p(t).then(void 0, void 0, e)
		}
		function V(t, e) {
			return p(t).nodeify(e)
		}
		var q = !1;
		try {
			throw Error()
		} catch(B) {
			q = !!B.stack
		}
		var J, U, W = u(),
		H = function() {},
		X = function() {
			function t() {
				for (; e.next;) {
					e = e.next;
					var n = e.task;
					e.task = void 0;
					var r = e.domain;
					r && (e.domain = void 0, r.enter());
					try {
						n()
					} catch(a) {
						if (o) throw r && r.exit(),
						setTimeout(t, 0),
						r && r.enter(),
						a;
						setTimeout(function() {
							throw a
						},
						0)
					}
					r && r.exit()
				}
				i = !1
			}
			var e = {
				task: void 0,
				next: null
			},
			n = e,
			i = !1,
			r = void 0,
			o = !1;
			if (X = function(t) {
				n = n.next = {
					task: t,
					domain: o && process.domain,
					next: null
				},
				i || (i = !0, r())
			},
			"undefined" != typeof process && process.nextTick) o = !0,
			r = function() {
				process.nextTick(t)
			};
			else if ("function" == typeof setImmediate) r = "undefined" != typeof window ? setImmediate.bind(window, t) : function() {
				setImmediate(t)
			};
			else if ("undefined" != typeof MessageChannel) {
				var a = new MessageChannel;
				a.port1.onmessage = function() {
					r = s,
					a.port1.onmessage = t,
					t()
				};
				var s = function() {
					a.port2.postMessage(0)
				};
				r = function() {
					setTimeout(t, 0),
					s()
				}
			} else r = function() {
				setTimeout(t, 0)
			};
			return X
		} (),
		F = Function.call,
		$ = t(Array.prototype.slice),
		Q = t(Array.prototype.reduce ||
		function(t, e) {
			var n = 0,
			i = this.length;
			if (1 === arguments.length) for (;;) {
				if (n in this) {
					e = this[n++];
					break
				}
				if (++n >= i) throw new TypeError
			}
			for (; i > n; n++) n in this && (e = t(e, this[n], n));
			return e
		}),
		Y = t(Array.prototype.indexOf ||
		function(t) {
			for (var e = 0; this.length > e; e++) if (this[e] === t) return e;
			return - 1
		}),
		z = t(Array.prototype.map ||
		function(t, e) {
			var n = this,
			i = [];
			return Q(n,
			function(r, o, a) {
				i.push(t.call(e, o, a, n))
			},
			void 0),
			i
		}),
		K = Object.create ||
		function(t) {
			function e() {}
			return e.prototype = t,
			new e
		},
		Z = t(Object.prototype.hasOwnProperty),
		te = Object.keys ||
		function(t) {
			var e = [];
			for (var n in t) Z(t, n) && e.push(n);
			return e
		},
		ee = t(Object.prototype.toString);
		U = "undefined" != typeof ReturnValue ? ReturnValue: function(t) {
			this.value = t
		};
		var ne = "From previous event:";
		p.resolve = p,
		p.nextTick = X,
		p.longStackSupport = !1,
		p.defer = l,
		l.prototype.makeNodeResolver = function() {
			var t = this;
			return function(e, n) {
				e ? t.reject(e) : arguments.length > 2 ? t.resolve($(arguments, 1)) : t.resolve(n)
			}
		},
		p.Promise = h,
		p.promise = h,
		h.race = f,
		h.all = O,
		h.reject = A,
		h.resolve = p,
		p.passByCopy = function(t) {
			return t
		},
		d.prototype.passByCopy = function() {
			return this
		},
		p.join = function(t, e) {
			return p(t).join(e)
		},
		d.prototype.join = function(t) {
			return p([this, t]).spread(function(t, e) {
				if (t === e) return t;
				throw Error("Can't join: not the same: " + t + " " + e)
			})
		},
		p.race = f,
		d.prototype.race = function() {
			return this.then(p.race)
		},
		p.makePromise = d,
		d.prototype.toString = function() {
			return "[object Promise]"
		},
		d.prototype.then = function(t, e, n) {
			function r(e) {
				try {
					return "function" == typeof t ? t(e) : e
				} catch(n) {
					return A(n)
				}
			}
			function o(t) {
				if ("function" == typeof e) {
					i(t, s);
					try {
						return e(t)
					} catch(n) {
						return A(n)
					}
				}
				return A(t)
			}
			function a(t) {
				return "function" == typeof n ? n(t) : t
			}
			var s = this,
			u = l(),
			c = !1;
			return X(function() {
				s.promiseDispatch(function(t) {
					c || (c = !0, u.resolve(r(t)))
				},
				"when", [function(t) {
					c || (c = !0, u.resolve(o(t)))
				}])
			}),
			s.promiseDispatch(void 0, "when", [void 0,
			function(t) {
				var e, n = !1;
				try {
					e = a(t)
				} catch(i) {
					if (n = !0, !p.onerror) throw i;
					p.onerror(i)
				}
				n || u.notify(e)
			}]),
			u.promise
		},
		p.when = g,
		d.prototype.thenResolve = function(t) {
			return this.then(function() {
				return t
			})
		},
		p.thenResolve = function(t, e) {
			return p(t).thenResolve(e)
		},
		d.prototype.thenReject = function(t) {
			return this.then(function() {
				throw t
			})
		},
		p.thenReject = function(t, e) {
			return p(t).thenReject(e)
		},
		p.nearer = m,
		p.isPromise = y,
		p.isPromiseAlike = v,
		p.isPending = _,
		d.prototype.isPending = function() {
			return "pending" === this.inspect().state
		},
		p.isFulfilled = b,
		d.prototype.isFulfilled = function() {
			return "fulfilled" === this.inspect().state
		},
		p.isRejected = S,
		d.prototype.isRejected = function() {
			return "rejected" === this.inspect().state
		};
		var ie = [],
		re = [],
		oe = !0;
		p.resetUnhandledRejections = w,
		p.getUnhandledReasons = function() {
			return ie.slice()
		},
		p.stopUnhandledRejectionTracking = function() {
			w(),
			oe = !1
		},
		w(),
		p.reject = A,
		p.fulfill = E,
		p.master = M,
		p.spread = R,
		d.prototype.spread = function(t, e) {
			return this.all().then(function(e) {
				return t.apply(void 0, e)
			},
			e)
		},
		p.async = j,
		p.spawn = L,
		p["return"] = P,
		p.promised = N,
		p.dispatch = G,
		d.prototype.dispatch = function(t, e) {
			var n = this,
			i = l();
			return X(function() {
				n.promiseDispatch(i.resolve, t, e)
			}),
			i.promise
		},
		p.get = function(t, e) {
			return p(t).dispatch("get", [e])
		},
		d.prototype.get = function(t) {
			return this.dispatch("get", [t])
		},
		p.set = function(t, e, n) {
			return p(t).dispatch("set", [e, n])
		},
		d.prototype.set = function(t, e) {
			return this.dispatch("set", [t, e])
		},
		p.del = p["delete"] = function(t, e) {
			return p(t).dispatch("delete", [e])
		},
		d.prototype.del = d.prototype["delete"] = function(t) {
			return this.dispatch("delete", [t])
		},
		p.mapply = p.post = function(t, e, n) {
			return p(t).dispatch("post", [e, n])
		},
		d.prototype.mapply = d.prototype.post = function(t, e) {
			return this.dispatch("post", [t, e])
		},
		p.send = p.mcall = p.invoke = function(t, e) {
			return p(t).dispatch("post", [e, $(arguments, 2)])
		},
		d.prototype.send = d.prototype.mcall = d.prototype.invoke = function(t) {
			return this.dispatch("post", [t, $(arguments, 1)])
		},
		p.fapply = function(t, e) {
			return p(t).dispatch("apply", [void 0, e])
		},
		d.prototype.fapply = function(t) {
			return this.dispatch("apply", [void 0, t])
		},
		p["try"] = p.fcall = function(t) {
			return p(t).dispatch("apply", [void 0, $(arguments, 1)])
		},
		d.prototype.fcall = function() {
			return this.dispatch("apply", [void 0, $(arguments)])
		},
		p.fbind = function(t) {
			var e = p(t),
			n = $(arguments, 1);
			return function() {
				return e.dispatch("apply", [this, n.concat($(arguments))])
			}
		},
		d.prototype.fbind = function() {
			var t = this,
			e = $(arguments);
			return function() {
				return t.dispatch("apply", [this, e.concat($(arguments))])
			}
		},
		p.keys = function(t) {
			return p(t).dispatch("keys", [])
		},
		d.prototype.keys = function() {
			return this.dispatch("keys", [])
		},
		p.all = O,
		d.prototype.all = function() {
			return O(this)
		},
		p.allResolved = c(x, "allResolved", "allSettled"),
		d.prototype.allResolved = function() {
			return x(this)
		},
		p.allSettled = C,
		d.prototype.allSettled = function() {
			return this.then(function(t) {
				return O(z(t,
				function(t) {
					function e() {
						return t.inspect()
					}
					return t = p(t),
					t.then(e, e)
				}))
			})
		},
		p.fail = p["catch"] = function(t, e) {
			return p(t).then(void 0, e)
		},
		d.prototype.fail = d.prototype["catch"] = function(t) {
			return this.then(void 0, t)
		},
		p.progress = D,
		d.prototype.progress = function(t) {
			return this.then(void 0, void 0, t)
		},
		p.fin = p["finally"] = function(t, e) {
			return p(t)["finally"](e)
		},
		d.prototype.fin = d.prototype["finally"] = function(t) {
			return t = p(t),
			this.then(function(e) {
				return t.fcall().then(function() {
					return e
				})
			},
			function(e) {
				return t.fcall().then(function() {
					throw e
				})
			})
		},
		p.done = function(t, e, n, i) {
			return p(t).done(e, n, i)
		},
		d.prototype.done = function(t, e, n) {
			var r = function(t) {
				X(function() {
					if (i(t, o), !p.onerror) throw t;
					p.onerror(t)
				})
			},
			o = t || e || n ? this.then(t, e, n) : this;
			"object" == typeof process && process && process.domain && (r = process.domain.bind(r)),
			o.then(void 0, r)
		},
		p.timeout = function(t, e, n) {
			return p(t).timeout(e, n)
		},
		d.prototype.timeout = function(t, e) {
			var n = l(),
			i = setTimeout(function() {
				n.reject(Error(e || "Timed out after " + t + " ms"))
			},
			t);
			return this.then(function(t) {
				clearTimeout(i),
				n.resolve(t)
			},
			function(t) {
				clearTimeout(i),
				n.reject(t)
			},
			n.notify),
			n.promise
		},
		p.delay = function(t, e) {
			return void 0 === e && (e = t, t = void 0),
			p(t).delay(e)
		},
		d.prototype.delay = function(t) {
			return this.then(function(e) {
				var n = l();
				return setTimeout(function() {
					n.resolve(e)
				},
				t),
				n.promise
			})
		},
		p.nfapply = function(t, e) {
			return p(t).nfapply(e)
		},
		d.prototype.nfapply = function(t) {
			var e = l(),
			n = $(t);
			return n.push(e.makeNodeResolver()),
			this.fapply(n).fail(e.reject),
			e.promise
		},
		p.nfcall = function(t) {
			var e = $(arguments, 1);
			return p(t).nfapply(e)
		},
		d.prototype.nfcall = function() {
			var t = $(arguments),
			e = l();
			return t.push(e.makeNodeResolver()),
			this.fapply(t).fail(e.reject),
			e.promise
		},
		p.nfbind = p.denodeify = function(t) {
			var e = $(arguments, 1);
			return function() {
				var n = e.concat($(arguments)),
				i = l();
				return n.push(i.makeNodeResolver()),
				p(t).fapply(n).fail(i.reject),
				i.promise
			}
		},
		d.prototype.nfbind = d.prototype.denodeify = function() {
			var t = $(arguments);
			return t.unshift(this),
			p.denodeify.apply(void 0, t)
		},
		p.nbind = function(t, e) {
			var n = $(arguments, 2);
			return function() {
				function i() {
					return t.apply(e, arguments)
				}
				var r = n.concat($(arguments)),
				o = l();
				return r.push(o.makeNodeResolver()),
				p(i).fapply(r).fail(o.reject),
				o.promise
			}
		},
		d.prototype.nbind = function() {
			var t = $(arguments, 0);
			return t.unshift(this),
			p.nbind.apply(void 0, t)
		},
		p.nmapply = p.npost = function(t, e, n) {
			return p(t).npost(e, n)
		},
		d.prototype.nmapply = d.prototype.npost = function(t, e) {
			var n = $(e || []),
			i = l();
			return n.push(i.makeNodeResolver()),
			this.dispatch("post", [t, n]).fail(i.reject),
			i.promise
		},
		p.nsend = p.nmcall = p.ninvoke = function(t, e) {
			var n = $(arguments, 2),
			i = l();
			return n.push(i.makeNodeResolver()),
			p(t).dispatch("post", [e, n]).fail(i.reject),
			i.promise
		},
		d.prototype.nsend = d.prototype.nmcall = d.prototype.ninvoke = function(t) {
			var e = $(arguments, 1),
			n = l();
			return e.push(n.makeNodeResolver()),
			this.dispatch("post", [t, e]).fail(n.reject),
			n.promise
		},
		p.nodeify = V,
		d.prototype.nodeify = function(t) {
			return t ? (this.then(function(e) {
				X(function() {
					t(null, e)
				})
			},
			function(e) {
				X(function() {
					t(e)
				})
			}), void 0) : this
		};
		var ae = u();
		return p
	}),
	function(t) {
		var e = "Promise" in t && "cast" in t.Promise && "resolve" in t.Promise && "reject" in t.Promise && "all" in t.Promise && "race" in t.Promise && "spread" in t.Promise;
		e || (t.Promise = l.promise, t.Promise.all = l.all, t.Promise.timeout = l.timeout, l.stopUnhandledRejectionTracking())
	} (t !== void 0 ? t: this);
	var h = {
		timeout: 3e3
	};
	h.getGameConfig = function() {
		var t = l.defer();
		return SpilGames(["JSLib"],
		function(e) {
			var n = e.get("current.game.integration.info");
			n ? t.resolve(n) : t.reject(Error("No data retrieved from JSLib"))
		}),
		t.promise.timeout(this.timeout)
	},
	h.getBrandingConfig = function(t) {
		var e = l.defer(),
		n = "http://api.configar.org/cf/pb/1/configs",
		i = t.portal.siteId,
		r = t.portal.channelId,
		o = t.portal.applicationId;
		return SpilGames(["Net", "JSLib"],
		function(t, a) {
			t.send({
				url: [n, r, i, o].join("/"),
				type: "GET",
				dataType: "JSON"
			},
			function(t) {
				if (t && t.configar) window.postMessage(new s({
					type: "success",
					callbackId: null,
					data: "log.configar.getBranding.success"
				}), "*"),
				e.resolve(t.configar);
				else {
					var n = {};
					try {
						n = a.get("configar.data.cached") || n
					} catch(i) {}
					e.reject(n)
				}
			})
		}),
		e.promise.timeout(this.timeout)
	};
	var f = {};
	f.argsToArray = function(t) {
		return t ? Array.prototype.slice.apply(t) : []
	},
	f.isA10 = function() {
		return true
	},
	f.getRole = function() {
		var t = "function" == typeof window.SpilGames,
		e = window.self !== window.top,
		n = null;
		if (f.isA10()) return {
			IS_MASTER: !0,
			IS_SLAVE: !0,
			IS_STANDALONE: !0
		};
		if (t) {
			var i = document.getElementById("#iframegame");
			switch (i) {
			case "null":
				n = {
					IS_MASTER: !0,
					IS_SLAVE: !0,
					IS_STANDALONE: !1
				};
				break;
			default:
				n = {
					IS_MASTER: !0,
					IS_SLAVE: !1,
					IS_STANDALONE: !1
				}
			}
		} else n = e ? {
			IS_MASTER: !1,
			IS_SLAVE: !0,
			IS_STANDALONE: !1
		}: {
			IS_MASTER: !0,
			IS_SLAVE: !0,
			IS_STANDALONE: !0
		};
		return n
	},
	f.callConfigar = function(t, e) {
		var n, i, r = t.site || 500,
		o = t.channel || 100,
		a = t.id || null;
		window.XDomainRequest ? n = new XDomainRequest: window.XMLHttpRequest ? n = new XMLHttpRequest: window.ActiveXObject && (n = new ActiveXObject("Microsoft.XMLHTTP")),
		n.onreadystatechange = function() {
			4 === n.readyState && e(n.status, n.responseText)
		},
		a && (i = ["http://api.configar.org/cf/pb/1/configs", o, r, a].join("/"), n.open("GET", i, !0), n.timeout = 3e3, n.ontimeout = function() {
			e(404, null)
		},
		n.send())
	},
	f.isWrapped = function() {
		return void 0 !== (window.PhoneGap || window.cordova || window.Cordova)
	},
	f.isArray = Array.isArray ||
	function(t) {
		return "[object Array]" === Object.prototype.toString.call(t)
	},
	f._getQueryString = function() {
		return window.location.search
	},
	f._getPortalHost = function() {
		return window && window.location && window.location.hostname ? window.location.hostname: "unknown"
	},
	f.validateSchema = function(t, e) {
		for (var n in e) if (e.hasOwnProperty(n)) {
			if (!t.hasOwnProperty(n)) return {
				error: "Wrong argument passed: " + n
			};
			if (t.hasOwnProperty(n)) {
				var i = "object" == typeof t[n] ? t[n].type: t[n];
				if (e[n].constructor.name !== i) return {
					error: "Wrong value type for " + n + ": expected " + t[n] + ", got " + e[n].constructor.name
				};
				var r = t[n] && t[n].values || [];
				if ( - 1 === r.indexOf(e[n])) return {
					error: "Wrong value for " + n + ": expected " + r.join(" or ") + ", got " + e[n]
				}
			}
		}
		return {
			error: !1
		}
	};
	var d = {};
	d.getGameConfig = function() {
		return h.getGameConfig().
		catch(function() {
			return d.getLocalConfig()
		})
	},
	d.getBrandingConfig = function(t) {
		return new Promise(function(e) {
			return h.getBrandingConfig(t).then(e,
			function(t) {
				e(t),
				window.postMessage(new s({
					type: "warning",
					callbackId: null,
					data: "log.configar.getBranding.failure"
				}), "*")
			})
		})
	},
	d.getLocalConfig = function(t) {
		t = t && Object.keys(t).length ? t: {
			portal: {},
			game: {},
			branding: {}
		};
		var e = {
			game: {
				applicationId: t.portal.applicationId || "0",
				contentarId: t.portal.contentarId || "0",
				info: t.game.info || {},
				settings: t.game.objectSettings || {},
				features: {
					achievements: t.game.achievements || !1,
					gameSidePanel: t.game.gameSidePanel || !1,
					highscores: t.game.highscores || !1,
					recommendedGames: t.game.recommendedGames || !1
				}
			},
			user: {
				authenticated: t.portal.authenticated || !1,
				username: t.portal.username || ""
			},
			portal: {
				host: f._getPortalHost(),
				siteId: t.portal.siteId || 0,
				channelId: t.portal.channelId || 0,
				applicationId: t.portal.applicationId || "0"
			},
			branding: t.branding || {}
		};
		return e.branding.logo = e.branding.logo || {},
		e.branding.logo.url = e.branding.logo.url || !1,
		e.branding.logo.image = e.branding.logo.image || !1,
		e
	},
	d.setupStandaloneMode = function(t, e) {
		var n = {},
		i = {
			configar: {
				branding: {
					main: {
						label: "main",
						image: "./logo_A10_202x50.png",
						url: "",
						style: "",
						width: "1",
						height: "1",
						mime: "image/png",
						type: "png",
						handler: "newTab",
						blacklisted: !0
					},
					logo: {
						label: "logo",
						image: "./logo_A10_202x50.png",
						url: "",
						style: "",
						width: "1",
						height: "1",
						mime: "image/png",
						type: "png",
						handler: "newTab",
						blacklisted: !1
					},
					more_games: {
						label: "more_games",
						image: null,
						url: "",
						style: "",
						width: 0,
						height: 0,
						mime: null,
						type: null,
						handler: "newTab",
						blacklisted: !1
					},
					splash_screen: {
						label: "splash_screen",
						image: "place_holder_string",
						url: "",
						style: "",
						width: "0",
						height: "0",
						mime: "image/png",
						type: "png",
						handler: "newTab",
						blacklisted: !1
					}
				}
			}
		};
		n.JSLib = {
			memory: {},
			_channels: {},
			get: function(t) {
				return this.memory[t] ? this.memory[t] : !1
			},
			set: function(t, e) {
				return this.memory[t] = e,
				e
			},
			publish: function(t, e) {
				this._channels[t] && this._channels[t].forEach(function(t) {
					try {
						t.fn.call(this, e)
					} catch(n) {}
				})
			},
			subscribe: function(t, e) {
				if ("function" != typeof e) throw Error("Callback has to be a function");
				if ("string" != typeof t) throw Error("Channel name has to be a string");
				this._channels[t] || (this._channels[t] = []),
				this._channels[t].push({
					fn: e
				})
			}
		},
		n.Net = {
			send: function(t, e) {
				e.call(this, {})
			}
		},
		window.SpilGamesBootstrap = [],
		window.SpilGames = function() {
			var t = arguments;
			if (t[0] && "string" == typeof t[0]) n.JSLib.publish(t[0], t[1] || null);
			else if (t[0] && t[0] instanceof Array) {
				var e, i, r = [];
				for (e = 0, i = t[0].length; i > e; e++) r.push(n[t[0][e]]);
				t[1].apply(this, r)
			}
		},
		t && t.id ? f.callConfigar(t,
		function(n, r) {
			if (200 === n && "string" == typeof r && JSON.parse(r)) {
				var o = JSON.parse(r);
				e.call(this, {
					branding: o.configar && o.configar.branding ? o.configar.branding: i.configar.branding,
					portal: {
						applicationId: t.id,
						siteId: t.site ? t.site: 500,
						channelId: t.channel ? t.channel: 100
					}
				})
			} else e.call(this, {
				branding: i.configar.branding
			})
		}) : e.call(this, {
			branding: i.configar.branding
		})
	},
	d.getCachedConfig = function() {},
	e.prototype.newTab = function(t) {
		var e = window.navigator.userAgent.toLowerCase().match(/android.*applewebkit\/([\d.]+)/),
		n = e && 537 > e[1],
		i = n ? "_self": "_blank",
		r = t.url,
		o = window.open(r, i);
		return o && o.focus(),
		o
	},
	n.prototype.get = function(t) {
		for (var e = this.dataStore,
		n = t.split("."), i = n.length, r = 0; i - 1 > r; r++) {
			if (!e[n[r]]) return null;
			e = e[n[r]]
		}
		return e[n[i - 1]] || null
	},
	n.prototype.put = function(t, e) {
		for (var n = this.dataStore,
		i = t.split("."), r = i.length, o = 0; r - 1 > o; o++) {
			var a = i[o];
			n[a] || (n[a] = {}),
			n = n[a]
		}
		n[i[r - 1]] = e
	},
	n.prototype.set = function(t, e) {
		this.put(t, e);
		var n = Date.parse(new Date);
		return this.notify({
			type: "new",
			key: t,
			current: e,
			previous: null,
			timestamp: n
		}),
		e
	},
	n.prototype.update = function(t, e) {
		var n, i, r = null;
		return this.get(t) ? (n = "update", r = this.get(t)) : n = "new",
		this.put(t, e),
		i = Date.parse(new Date),
		this.notify({
			type: n,
			key: t,
			current: e,
			previous: r,
			timestamp: i
		}),
		e
	},
	n.prototype.remove = function(t) {
		if (this.get(t)) {
			var e, n = this.get(t);
			return this.put(t, null),
			e = Date.parse(new Date),
			this.notify({
				type: "remove",
				key: t,
				current: null,
				previous: n,
				timestamp: e
			}),
			!0
		}
		return ! 1
	},
	n.prototype._setCache = function(t) {
		this.dataStore = t
	},
	n.prototype._getCache = function() {
		return this.dataStore
	},
	n.prototype.notify = function(t) {
		if (this.IS_MASTER) {
			var e = new s({
				type: "datachange",
				callbackId: null,
				data: t
			}).encode();
			return window.postMessage(e, "*"),
			e
		}
	},
	i.prototype._performAction = function(t) {
		var e = new s(t.data || {}),
		n = this.messenger,
		i = this.subscribers || {};
		if (e && e.type && e.data) switch (e.type) {
		case "gameEvent":
			e.data[0] && i[e.data[0]] && i[e.data[0]].length > 0 && i[e.data[0]].forEach(function(t) {
				t.call(this),
				n._postMessage([e.data[0], {
					origin: "slave"
				},
				null], null, "gameState")
			});
			break;
		case "gameState":
			e.data[0] && e.data[1] && "slave" === e.data[1].origin && (this.gameState = e.data[0])
		}
	},
	i.prototype.on = function(t, e) {
		this.IS_SLAVE && (this.subscribers[t] || (this.subscribers[t] = []), this.subscribers[t].push(e))
	},
	i.prototype.emit = function(t) {
		if (!this.IS_MASTER) throw Error("Only the master environment can emit game events");
		if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
		if (t === this.gameState) throw Error("The game is already in state: `" + t + "`");
		this.messenger._postMessage([t, {
			origin: "master"
		},
		null], null, "gameEvent")
	},
	r.prototype.init = function() {
		this._setupEvents()
	},
	r.prototype._setupEvents = function() {
		var t = this.messenger;
		this.isMaster ? (SpilGames(["JSLib"],
		function(e) {
			e.subscribe("ad.request.accepted",
			function(e) { ! 0 === e && (SpilGames("game.ad.accepted", !0), t._postMessage(!0, void 0, "ad.request.accepted"))
			}),
			e.subscribe("ad.complete",
			function() {
				t._postMessage("", "", "ad.complete")
			})
		}), this.messenger.subscribe("game.ad.request", this._triggerAd, this)) : (this.messenger.subscribe("ad.request.accepted", this._onAdAccepted, this), this.messenger.subscribe("ad.complete", this._onAdCompleted, this))
	},
	r.prototype._triggerAd = function() {
		SpilGames("game.ad.request")
	},
	r.prototype._runCallback = function(t) {
		this._callbacks[t] && (this._callbacks[t](), this._callbacks[t] = !1)
	},
	r.prototype.request = function(t, e) {
		var n = this;
		if ("function" != typeof t) throw Error("pauseGame argument should be a function");
		if ("function" != typeof e) throw Error("resumeGame argument should be a function");
		if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
		this._callbacks.pause = t,
		this._callbacks.resume = e,
		this.messenger._postMessage(void 0, void 0, "game.ad.request"),
		this.isMaster || this.messenger._postMessage(["log.gameapi.ad.requested", {
			origin: "slave"
		},
		null], null, "log"),
		this.timeout = setTimeout(function() {
			n._requestTimeout()
		},
		this.timeoutAfter)
	},
	r.prototype._onAdAccepted = function(t) {
		var e = this.messenger;
		this.timeout && clearTimeout(this.timeout),
		!this.isMaster && t && (e._postMessage(["log.gameapi.ad.start", {
			origin: "slave"
		},
		null], null, "log"), this._runCallback("pause"))
	},
	r.prototype._onAdCompleted = function() {
		var t = this.messenger;
		this.isMaster || t._postMessage(["log.gameapi.ad.complete", {
			origin: "slave"
		},
		null], null, "log"),
		this._runCallback("resume")
	},
	r.prototype._requestTimeout = function() {
		this._onAdCompleted()
	},
	o.prototype.init = function(t) {
		t = t || {},
		this.data = t.data || this.data;
		var e = this.data && this.data.game && this.data.game.applicationId ? this.data.game.applicationId: null,
		n = new Date,
		i = window.location.hostname; (this.IS_SLAVE || f.isWrapped()) && this.startInternalTracking(e, n, i)
	},
	o.prototype._createEventObject = function(t, e, n) {
		return {
			eventCategory: t,
			eventAction: e,
			properties: n
		}
	},
	o.prototype._sendSETEvent = function(t, e, n) {
		return this.messenger && (this.IS_SLAVE || f.isWrapped()) && this.messenger.post("tracker.event." + t, e, n),
		e
	},
	o.prototype.trackGamePlay = function(t) {
		if (!this.gamePlayTracking.started) return ! 1;
		var e = this.gamePlayTracking.gid,
		n = this.gamePlayTracking.timestamp,
		i = this.gamePlayTracking.host,
		r = this._createEventObject("game", "gameplay", {
			applicationId: e,
			start: n,
			host: i
		});
		return this._sendSETEvent("express", r, t),
		r
	},
	o.prototype.trackTimeInGame = function(t) {
		if (!this.timeInGameTracking.started) return ! 1;
		var e = this.timeInGameTracking.gid,
		n = this.timeInGameTracking.timestamp,
		i = this._createEventObject("game", "heartbeat", {
			applicationId: e,
			start: n
		});
		return this._sendSETEvent("express", i, t),
		i
	},
	o.prototype.startInternalTracking = function(t, e, n) {
		var i = this,
		r = 6e4,
		o = function(t) {
			if (!t) throw "Could not save the time in game"
		};
		return this.moduleReady ? t ? (this.gamePlayTracking.gid = t, this.gamePlayTracking.timestamp = Date.parse(e), this.gamePlayTracking.host = n, this.gamePlayTracking.started = !0, this.timeInGameTracking.gid = t, this.timeInGameTracking.timestamp = Date.parse(e), this.timeInGameTracking.started = !0, this.trackGamePlay(function(t) {
			if (!t) throw "Could not save the game play"
		}), this.trackTimeInGame(o), setInterval(function() {
			i.trackTimeInGame(o)
		},
		r), this.gamePlayTracking.started && this.timeInGameTracking.started) : {
			error: "No application ID defined for this game"
		}: {
			error: "This method cannot be called before the API is loaded"
		}
	},
	a.prototype.init = function(t) {
		t = t || {},
		this.data = t.data || this.data
	},
	a.prototype.getLogo = function(t) {
		if (!this.moduleReady) return {
			error: "This method cannot be called before the API is loaded"
		};
		var e = this.IS_MASTER ? "master": "slave";
		this.messenger._postMessage(["log.branding.getlogo", {
			origin: e
		},
		null], null, "log");
		var n, i, r = {
			type: {
				type: "String",
				values: ["png"]
			},
			width: "Number",
			height: "Number"
		};
		return n = this._getLink("logo"),
		t && "object" == typeof t && (i = f.validateSchema(r, t), i.error && (n.error = i.error)),
		n
	},
	a.prototype.getLink = function(t) {
		if (!t) return {
			error: "No link identifier provided"
		};
		var e = this.listLinks();
		if ( - 1 !== e.indexOf(t)) {
			var n = this.IS_MASTER ? "master": "slave";
			return this.messenger._postMessage(["log.branding.getlink", {
				origin: n,
				linkName: t
			},
			null], null, "log"),
			this._getLink(t)
		}
		return {
			error: "Invalid option: '" + t + "'",
			action: function() {}
		}
	},
	a.prototype._getLink = function(t) {
		if (!t) return {
			error: "No link identifier provided"
		};
		var e = this.data && this.data.branding ? this.data.branding: {};
		return e && e[t] ? {
			linkName: t,
			image: e[t].image || !1,
			action: this._executeHandler.bind(this, t)
		}: {
			error: "Invalid option: '" + t + "'",
			action: function() {}
		}
	},
	a.prototype._getGMLink = function(t) {
		var e = null;
		if (!t) return {
			error: "No link identifier provided"
		};
		var n = this.data && this.data.branding ? this.data.branding: {};
		return n && n[t] ? (e = this._tagUrl(n[t].url, t), {
			linkName: t,
			url: e
		}) : {
			error: "Invalid option: '" + t + "'",
			url: null
		}
	},
	a.prototype.getLinks = function() {
		var t = {},
		e = this.listLinks();
		if (0 === e.length) t = {
			more_games: {
				action: function() {}
			}
		};
		else for (var n = 0; e.length > n; n++) {
			var i = e[n];
			t[i] = this._getLink(i)
		}
		return t
	},
	a.prototype._executeHandler = function(t) {
		var e = this.data && this.data.branding ? this.data.branding: {},
		n = e[t],
		i = n.handler,
		r = this._tagUrl(n.url, t);
		if (n.url && n.url.length > 0 && i && this.components[i]) {
			var o = this.IS_MASTER ? "master": "slave";
			return this.messenger._postMessage(["log.branding.linkAction", {
				origin: o,
				linkName: t
			},
			null], null, "log"),
			this.components[i]({
				url: r
			})
		}
		return function() {}
	},
	a.prototype.listLinks = function() {
		var t = [],
		e = this.data && this.data.branding ? this.data.branding: {},
		n = Object.keys(e);
		return t = n.filter(function(t) {
			return ! e[t].blacklisted
		})
	},
	a.prototype.getSplashScreen = function() {
		var t, e = this.IS_MASTER ? "master": "slave";
		if (this.data && this.data.branding && this.data.branding.splash_screen) {
			var n = !0;
			this.data.branding.splash_screen.image || this.data.branding.splash_screen.url || (n = !1),
			t = {
				show: n,
				action: this._getLink("splash_screen").action ||
				function() {}
			}
		} else t = {
			show: !0,
			action: function() {}
		};
		return this.messenger._postMessage(["log.branding.splashScreen", {
			origin: e
		},
		null], null, "log"),
		t
	},
	a.prototype._tagUrl = function(t, e) {
		var n, i, r, o = this.data && this.data.portal ? this.data.portal: {},
		a = this.data && this.data.game ? this.data.game: {},
		s = parseInt(o.siteId, 10);
		if ("string" != typeof t) throw Error("No url specified");
		return n = "string" == typeof e ? e: "logo",
		i = "brandedgames_" + (s > 0 && 500 > s ? "internal": "external"),
		r = ["utm_medium=" + i, "utm_campaign=" + a.applicationId, "utm_source=" + o.host, "utm_content=" + n].join("&"),
		t += t.indexOf("?") > -1 ? "&": "?",
		t + r
	},
	s.prototype.encode = function() {
		var t = ["gameapi", this.type, this.callbackId, this.data ? JSON.stringify(this.data) : ""].join("|");
		return t
	},
	c.prototype._postMessage = function(t, e, n) {
		var i, r;
		i = f.isArray(t) && "function" == typeof t[t.length - 1] ? this._callbacks.push(t.pop()) - 1 : e,
		r = new s({
			type: n || "jslib",
			callbackId: i,
			data: t
		}).encode(),
		this._target.postMessage(r, "*")
	},
	c.prototype._callJSLib = function() {
		SpilGames.apply(SpilGames, f.argsToArray(arguments))
	},
	c.prototype._setupEventListener = function() {
		window.addEventListener ? window.addEventListener("message", this._handleMessage.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._handleMessage.bind(this))
	},
	c.prototype._handleMessage = function(t) {
		var e, n, i, r, o = this,
		a = new s(t.data);
		if (a) if (e = a.type, n = a.callbackId, i = a.data, r = this._callbacks[n] || !1, this.IS_MASTER) switch (e) {
		case "jslib":
			"Array" === i.constructor.name && i.push(function(t) {
				o._postMessage(t, n)
			}),
			this._callJSLib.apply(this, i);
			break;
		case "ugapi":
			this._handleUGARequest(t);
			break;
		case "datachange":
			this._postMessage(i, null, "datachange");
			break;
		default:
			this.publish(e, i)
		} else this.IS_SLAVE && ("function" == typeof r ? (delete this._callbacks[n], r(i)) : "datachange" === e ? console.log("data change sent from the master", i) : "jslib" !== e && this.publish(e, i));
		return ! 1
	},
	c.prototype._handleUGARequest = function(t) {
		var e, n, i, r = this,
		o = new s(t.data);
		if (o) switch (e = o.data[0], n = o.callbackId, i = o.data[1] ? o.data[1] : null, e) {
		case "GameAPI.data":
			r._postMessage(this.dataStore._getCache(), n, "ugapi")
		}
	},
	c.prototype.post = function() {
		var t = f.argsToArray(arguments);
		return this.IS_SLAVE ? this._postMessage(t) : this._callJSLib.apply(this, t),
		this
	},
	c.prototype.publish = function(t, e) {
		return this._channels[t] && this._channels[t].forEach(function(t) {
			try {
				t.fn.call(t.ctx, e)
			} catch(n) {}
		}),
		this
	},
	c.prototype.subscribe = function(t, e, n) {
		if ("function" != typeof e) throw Error("Callback has to be a function");
		if ("string" != typeof t) throw Error("Channel name has to be a string");
		return this._channels[t] || (this._channels[t] = []),
		this._channels[t].push({
			fn: e,
			ctx: n
		}),
		this
	},
	c.prototype.unsubscribe = function(t, e) {
		return this._channels[t] && "function" == typeof e && (this._channels[t] = this._channels[t].filter(function(t) {
			return t.fn !== e
		})),
		this
	},
	c.prototype.subscribeOnce = function(t, e, n) {
		function i(n) {
			r.unsubscribe(t, i),
			e.call(this, n)
		}
		var r = this;
		return this.subscribe(t, i, n)
	},
	c.prototype.requestFromParent = function(t, e, n) {
		if (!this.IS_SLAVE) throw "You are the parent, stop talking to yourself";
		e = e || {},
		this._postMessage([t, e, n], null, "ugapi")
	},
	p.prototype._setRole = function() {
		var t = f.getRole();
		this.IS_MASTER = t.IS_MASTER,
		this.IS_SLAVE = t.IS_SLAVE,
		this.IS_STANDALONE = t.IS_STANDALONE
	},
	p.prototype._getTarget = function() {
		if (this.IS_STANDALONE) return window;
		var t = document.getElementById("iframegame"),
		e = t && t.contentWindow ? t.contentWindow: window.parent;
		return this.IS_MASTER ? e: window.parent
	},
	p.prototype.loadAPI = function(t, e) {
		function n(e) {
			return r.IS_MASTER && (e = i(e)),
			r.isReady = !0,
			r.Branding.moduleReady = !0,
			r.__.EventTracking.moduleReady = !0,
			r.GameBreak.moduleReady = !0,
			r.Game.moduleReady = !0,
			r.Branding.init({
				data: e
			}),
			r.__.EventTracking.init({
				data: e
			}),
			r.GameBreak.init(),
			r.__.messenger._postMessage(["log.gameapi.loadapi.finish", {
				origin: o,
				version: r.version
			},
			null], null, "log"),
			t(r)
		}
		function i(t) {
			var e = t.game || {},
			n = t.user || {},
			i = t.portal || {},
			r = t.branding || {};
			return d.getLocalConfig({
				game: e,
				user: n,
				portal: i,
				branding: r
			})
		}
		var r = this,
		o = this.IS_MASTER ? "master": "slave";
		return ! 0 === this.isReady ? (window.console && window.console.log && console.log("WARNING: Detected multiple executions of GameAPI.loadAPI(). This method should only be executed once per page load!"), t(r)) : (this.__.messenger._postMessage(["log.gameapi.loadapi.start", {
			origin: o,
			version: r.version
		},
		null], null, "log"), this.IS_STANDALONE ? (e = e || null, d.setupStandaloneMode(e,
		function(t) {
			r.__.dataStore._setCache(i(t)),
			n(t)
		})) : this.IS_MASTER ? d.getGameConfig().then(function(t) {
			d.getBrandingConfig(t).then(function(e) {
				t && !t.isError && (t.branding = e.branding, r.__.dataStore._setCache(i(t))),
				n(t)
			})
		}) : this.__.messenger.requestFromParent("GameAPI.data", {},
		function(t) {
			n(t)
		}), void 0)
	};
	var g = new p(n, c, a, o, r);
	"function" == typeof define && define.amd && define("GameAPI", g),
	t.GameAPI = g
})(window);
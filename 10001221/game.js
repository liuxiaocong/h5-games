/*! game-api - v0.10.5 - 2014-07-28 */
(function(t) {
	"use strict";

	function e() {}

	function n(t) {
		if (t = t || {}, this.IS_MASTER = t.isMaster || !1, !this.IS_MASTER) throw Error("The DataStore can only be instantiated by the Master");
		this.dataStore = {}
	}

	function r(t, e) {
		if (this.IS_MASTER = t && t.isMaster ? t.isMaster : !1, this.IS_SLAVE = !this.IS_MASTER, this.messenger = null, this.subscribers = {}, this.moduleReady = e ? e : !1, this.gameState = "resume", !t || !t.messenger) throw Error("No messenger passed to the Game module instance");
		this.messenger = t.messenger, window.addEventListener ? window.addEventListener("message", this._performAction.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._performAction.bind(this))
	}

	function i(t, e) {
		t = t || {}, this.isMaster = t.isMaster, this.isStandalone = t.isStandalone, this.messenger = t.messenger, this.moduleReady = e ? e : !1, this.timeoutAfter = 500, this.timeout = !1, this._callbacks = {
			pause: !1,
			resume: !1
		}
	}

	function o(t, e) {
		t = t || {}, this.IS_MASTER = t.isMaster, this.IS_SLAVE = !this.IS_MASTER, this.data = t.data, this.messenger = t.messenger, this.moduleReady = e ? e : !1, this.gamePlayTracking = {
			started: !1,
			appid: null,
			host: null,
			timestamp: null
		}, this.timeInGameTracking = {
			started: !1,
			appid: null,
			timestamp: null
		}
	}

	function a(t, e) {
		t = t || {}, this.IS_MASTER = t.isMaster, this.IS_SLAVE = !this.IS_MASTER, this.moduleReady = e ? e : !1, this.messenger = t.messenger, this.components = t.components, this.data = t.data || null
	}

	function s(t) {
		var e = "string" == typeof t ? u(t) : t;
		e && (this.type = e.type, this.callbackId = e.callbackId, this.data = e.data)
	}

	function u(t) {
		var e, n, r, i = !1,
			o = [];
		if ("string" == typeof t && (o = t.split("|"), "gameapi" === o[0])) {
			o.shift(), e = o.shift(), r = parseInt(o.shift(), 10), n = o.join("|");
			try {
				i = {
					type: e,
					callbackId: r,
					data: "" !== n ? JSON.parse(n) : ""
				}
			} catch (a) {}
		}
		return i
	}

	function c(t) {
		t = t || {}, this.IS_MASTER = "boolean" == typeof t.isMaster ? t.isMaster : !1, this.IS_SLAVE = !this.IS_MASTER, this.api = t.api ? t.api : {}, this._target = t.target ? t.target : {}, this._callbacks = [], this._channels = [], this.IS_MASTER && t.dataStore && (this.dataStore = t.dataStore), this._setupEventListener()
	}

	function p(t, n, i, o, a) {
		this.version = "0.10.5", this.isReady = !1, this._setRole(), this.__ = {}, this.__.dataStore = this.IS_MASTER ? new t({
			isMaster: !0
		}) : null, this.__.messenger = new n({
			isMaster: this.IS_MASTER,
			api: this,
			target: this._getTarget(),
			dataStore: this.__.dataStore
		}), this.__.components = new e, this.Branding = new i({
			isMaster: this.IS_MASTER,
			messenger: this.__.messenger,
			components: this.__.components
		}, !1), this.__.EventTracking = new o({
			isMaster: this.IS_MASTER,
			data: null,
			messenger: this.__.messenger
		}, !1), this.GameBreak = new a({
			isMaster: this.IS_MASTER,
			isStandalone: this.IS_STANDALONE,
			messenger: this.__.messenger
		}, !1), this.Game = new r({
			isMaster: this.IS_MASTER,
			messenger: this.__.messenger
		}, !1)
	}
	var l;
	(function(t) {
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
				return X.apply(t, arguments)
			}
		}

		function e(t) {
			return t === Object(t)
		}

		function n(t) {
			return "[object StopIteration]" === ee(t) || t instanceof W
		}

		function r(t, e) {
			if (q && e.stack && "object" == typeof t && null !== t && t.stack && -1 === t.stack.indexOf(ne)) {
				for (var n = [], r = e; r; r = r.source) r.stack && n.unshift(r.stack);
				n.unshift(t.stack);
				var o = n.join("\n" + ne + "\n");
				t.stack = i(o)
			}
		}

		function i(t) {
			for (var e = t.split("\n"), n = [], r = 0; e.length > r; ++r) {
				var i = e[r];
				s(i) || o(i) || !i || n.push(i)
			}
			return n.join("\n")
		}

		function o(t) {
			return -1 !== t.indexOf("(module.js:") || -1 !== t.indexOf("(node.js:")
		}

		function a(t) {
			var e = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);
			if (e) return [e[1], Number(e[2])];
			var n = /at ([^ ]+):(\d+):(?:\d+)$/.exec(t);
			if (n) return [n[1], Number(n[2])];
			var r = /.*@(.+):(\d+)$/.exec(t);
			return r ? [r[1], Number(r[2])] : void 0
		}

		function s(t) {
			var e = a(t);
			if (!e) return !1;
			var n = e[0],
				r = e[1];
			return n === F && r >= H && ae >= r
		}

		function u() {
			if (q) try {
				throw Error()
			} catch (t) {
				var e = t.stack.split("\n"),
					n = e[0].indexOf("@") > 0 ? e[1] : e[2],
					r = a(n);
				if (!r) return;
				return F = r[0], r[1]
			}
		}

		function c(t, e, n) {
			return function() {
				return "undefined" != typeof console && "function" == typeof console.warn && console.warn(e + " is deprecated, use " + n + " instead.", Error("").stack), t.apply(t, arguments)
			}
		}

		function p(t) {
			return y(t) ? t : v(t) ? E(t) : T(t)
		}

		function l() {
			function t(t) {
				e = t, o.source = t, $(n, function(e, n) {
					U(function() {
						t.promiseDispatch.apply(t, n)
					})
				}, void 0), n = void 0, r = void 0
			}
			var e, n = [],
				r = [],
				i = Y(l.prototype),
				o = Y(f.prototype);
			if (o.promiseDispatch = function(t, i, o) {
				var a = Q(arguments);
				n ? (n.push(a), "when" === i && o[1] && r.push(o[1])) : U(function() {
					e.promiseDispatch.apply(e, a)
				})
			}, o.valueOf = function() {
				if (n) return o;
				var t = m(e);
				return y(t) && (e = t), t
			}, o.inspect = function() {
				return e ? e.inspect() : {
					state: "pending"
				}
			}, p.longStackSupport && q) try {
				throw Error()
			} catch (a) {
				o.stack = a.stack.substring(a.stack.indexOf("\n") + 1)
			}
			return i.promise = o, i.resolve = function(n) {
				e || t(p(n))
			}, i.fulfill = function(n) {
				e || t(T(n))
			}, i.reject = function(n) {
				e || t(I(n))
			}, i.notify = function(t) {
				e || $(r, function(e, n) {
					U(function() {
						n(t)
					})
				}, void 0)
			}, i
		}

		function d(t) {
			if ("function" != typeof t) throw new TypeError("resolver must be a function.");
			var e = l();
			try {
				t(e.resolve, e.reject, e.notify)
			} catch (n) {
				e.reject(n)
			}
			return e.promise
		}

		function h(t) {
			return d(function(e, n) {
				for (var r = 0, i = t.length; i > r; r++) p(t[r]).then(e, n)
			})
		}

		function f(t, e, n) {
			void 0 === e && (e = function(t) {
				return I(Error("Promise does not support operation: " + t))
			}), void 0 === n && (n = function() {
				return {
					state: "unknown"
				}
			});
			var r = Y(f.prototype);
			if (r.promiseDispatch = function(n, i, o) {
				var a;
				try {
					a = t[i] ? t[i].apply(r, o) : e.call(r, i, o)
				} catch (s) {
					a = I(s)
				}
				n && n(a)
			}, r.inspect = n, n) {
				var i = n();
				"rejected" === i.state && (r.exception = i.reason), r.valueOf = function() {
					var t = n();
					return "pending" === t.state || "rejected" === t.state ? r : t.value
				}
			}
			return r
		}

		function g(t, e, n, r) {
			return p(t).then(e, n, r)
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

		function S(t) {
			return !y(t) || "fulfilled" === t.inspect().state
		}

		function w(t) {
			return y(t) && "rejected" === t.inspect().state
		}

		function b() {
			re.length = 0, ie.length = 0, oe || (oe = !0)
		}

		function A(t, e) {
			oe && (ie.push(t), e && e.stack !== void 0 ? re.push(e.stack) : re.push("(no stack) " + e))
		}

		function k(t) {
			if (oe) {
				var e = z(ie, t); - 1 !== e && (ie.splice(e, 1), re.splice(e, 1))
			}
		}

		function I(t) {
			var e = f({
				when: function(e) {
					return e && k(this), e ? e(t) : this
				}
			}, function() {
				return this
			}, function() {
				return {
					state: "rejected",
					reason: t
				}
			});
			return A(e, t), e
		}

		function T(t) {
			return f({
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
			}, void 0, function() {
				return {
					state: "fulfilled",
					value: t
				}
			})
		}

		function E(t) {
			var e = l();
			return U(function() {
				try {
					t.then(e.resolve, e.reject, e.notify)
				} catch (n) {
					e.reject(n)
				}
			}), e.promise
		}

		function C(t) {
			return f({
				isDef: function() {}
			}, function(e, n) {
				return L(t, e, n)
			}, function() {
				return p(t).inspect()
			})
		}

		function R(t, e, n) {
			return p(t).spread(e, n)
		}

		function M(t) {
			return function() {
				function e(t, e) {
					var a;
					if ("undefined" == typeof StopIteration) {
						try {
							a = r[t](e)
						} catch (s) {
							return I(s)
						}
						return a.done ? a.value : g(a.value, i, o)
					}
					try {
						a = r[t](e)
					} catch (s) {
						return n(s) ? s.value : I(s)
					}
					return g(a, i, o)
				}
				var r = t.apply(this, arguments),
					i = e.bind(e, "next"),
					o = e.bind(e, "throw");
				return i()
			}
		}

		function P(t) {
			p.done(p.async(t)())
		}

		function x(t) {
			throw new W(t)
		}

		function O(t) {
			return function() {
				return R([this, j(arguments)], function(e, n) {
					return t.apply(e, n)
				})
			}
		}

		function L(t, e, n) {
			return p(t).dispatch(e, n)
		}

		function j(t) {
			return g(t, function(t) {
				var e = 0,
					n = l();
				return $(t, function(r, i, o) {
					var a;
					y(i) && "fulfilled" === (a = i.inspect()).state ? t[o] = a.value : (++e, g(i, function(r) {
						t[o] = r, 0 === --e && n.resolve(t)
					}, n.reject, function(t) {
						n.notify({
							index: o,
							value: t
						})
					}))
				}, void 0), 0 === e && n.resolve(t), n.promise
			})
		}

		function N(t) {
			return g(t, function(t) {
				return t = K(t, p), g(j(K(t, function(t) {
					return g(t, J, J)
				})), function() {
					return t
				})
			})
		}

		function G(t) {
			return p(t).allSettled()
		}

		function D(t, e) {
			return p(t).then(void 0, void 0, e)
		}

		function B(t, e) {
			return p(t).nodeify(e)
		}
		var q = !1;
		try {
			throw Error()
		} catch (V) {
			q = !!V.stack
		}
		var F, W, H = u(),
			J = function() {},
			U = function() {
				function t() {
					for (; e.next;) {
						e = e.next;
						var n = e.task;
						e.task = void 0;
						var i = e.domain;
						i && (e.domain = void 0, i.enter());
						try {
							n()
						} catch (a) {
							if (o) throw i && i.exit(), setTimeout(t, 0), i && i.enter(), a;
							setTimeout(function() {
								throw a
							}, 0)
						}
						i && i.exit()
					}
					r = !1
				}
				var e = {
						task: void 0,
						next: null
					},
					n = e,
					r = !1,
					i = void 0,
					o = !1;
				if (U = function(t) {
					n = n.next = {
						task: t,
						domain: o && process.domain,
						next: null
					}, r || (r = !0, i())
				}, "undefined" != typeof process && process.nextTick) o = !0, i = function() {
					process.nextTick(t)
				};
				else if ("function" == typeof setImmediate) i = "undefined" != typeof window ? setImmediate.bind(window, t) : function() {
					setImmediate(t)
				};
				else if ("undefined" != typeof MessageChannel) {
					var a = new MessageChannel;
					a.port1.onmessage = function() {
						i = s, a.port1.onmessage = t, t()
					};
					var s = function() {
						a.port2.postMessage(0)
					};
					i = function() {
						setTimeout(t, 0), s()
					}
				} else i = function() {
					setTimeout(t, 0)
				};
				return U
			}(),
			X = Function.call,
			Q = t(Array.prototype.slice),
			$ = t(Array.prototype.reduce || function(t, e) {
				var n = 0,
					r = this.length;
				if (1 === arguments.length)
					for (;;) {
						if (n in this) {
							e = this[n++];
							break
						}
						if (++n >= r) throw new TypeError
					}
				for (; r > n; n++) n in this && (e = t(e, this[n], n));
				return e
			}),
			z = t(Array.prototype.indexOf || function(t) {
				for (var e = 0; this.length > e; e++)
					if (this[e] === t) return e;
				return -1
			}),
			K = t(Array.prototype.map || function(t, e) {
				var n = this,
					r = [];
				return $(n, function(i, o, a) {
					r.push(t.call(e, o, a, n))
				}, void 0), r
			}),
			Y = Object.create || function(t) {
				function e() {}
				return e.prototype = t, new e
			},
			Z = t(Object.prototype.hasOwnProperty),
			te = Object.keys || function(t) {
				var e = [];
				for (var n in t) Z(t, n) && e.push(n);
				return e
			},
			ee = t(Object.prototype.toString);
		W = "undefined" != typeof ReturnValue ? ReturnValue : function(t) {
			this.value = t
		};
		var ne = "From previous event:";
		p.resolve = p, p.nextTick = U, p.longStackSupport = !1, p.defer = l, l.prototype.makeNodeResolver = function() {
			var t = this;
			return function(e, n) {
				e ? t.reject(e) : arguments.length > 2 ? t.resolve(Q(arguments, 1)) : t.resolve(n)
			}
		}, p.Promise = d, p.promise = d, d.race = h, d.all = j, d.reject = I, d.resolve = p, p.passByCopy = function(t) {
			return t
		}, f.prototype.passByCopy = function() {
			return this
		}, p.join = function(t, e) {
			return p(t).join(e)
		}, f.prototype.join = function(t) {
			return p([this, t]).spread(function(t, e) {
				if (t === e) return t;
				throw Error("Can't join: not the same: " + t + " " + e)
			})
		}, p.race = h, f.prototype.race = function() {
			return this.then(p.race)
		}, p.makePromise = f, f.prototype.toString = function() {
			return "[object Promise]"
		}, f.prototype.then = function(t, e, n) {
			function i(e) {
				try {
					return "function" == typeof t ? t(e) : e
				} catch (n) {
					return I(n)
				}
			}

			function o(t) {
				if ("function" == typeof e) {
					r(t, s);
					try {
						return e(t)
					} catch (n) {
						return I(n)
					}
				}
				return I(t)
			}

			function a(t) {
				return "function" == typeof n ? n(t) : t
			}
			var s = this,
				u = l(),
				c = !1;
			return U(function() {
				s.promiseDispatch(function(t) {
					c || (c = !0, u.resolve(i(t)))
				}, "when", [
					function(t) {
						c || (c = !0, u.resolve(o(t)))
					}
				])
			}), s.promiseDispatch(void 0, "when", [void 0,
				function(t) {
					var e, n = !1;
					try {
						e = a(t)
					} catch (r) {
						if (n = !0, !p.onerror) throw r;
						p.onerror(r)
					}
					n || u.notify(e)
				}
			]), u.promise
		}, p.when = g, f.prototype.thenResolve = function(t) {
			return this.then(function() {
				return t
			})
		}, p.thenResolve = function(t, e) {
			return p(t).thenResolve(e)
		}, f.prototype.thenReject = function(t) {
			return this.then(function() {
				throw t
			})
		}, p.thenReject = function(t, e) {
			return p(t).thenReject(e)
		}, p.nearer = m, p.isPromise = y, p.isPromiseAlike = v, p.isPending = _, f.prototype.isPending = function() {
			return "pending" === this.inspect().state
		}, p.isFulfilled = S, f.prototype.isFulfilled = function() {
			return "fulfilled" === this.inspect().state
		}, p.isRejected = w, f.prototype.isRejected = function() {
			return "rejected" === this.inspect().state
		};
		var re = [],
			ie = [],
			oe = !0;
		p.resetUnhandledRejections = b, p.getUnhandledReasons = function() {
			return re.slice()
		}, p.stopUnhandledRejectionTracking = function() {
			b(), oe = !1
		}, b(), p.reject = I, p.fulfill = T, p.master = C, p.spread = R, f.prototype.spread = function(t, e) {
			return this.all().then(function(e) {
				return t.apply(void 0, e)
			}, e)
		}, p.async = M, p.spawn = P, p["return"] = x, p.promised = O, p.dispatch = L, f.prototype.dispatch = function(t, e) {
			var n = this,
				r = l();
			return U(function() {
				n.promiseDispatch(r.resolve, t, e)
			}), r.promise
		}, p.get = function(t, e) {
			return p(t).dispatch("get", [e])
		}, f.prototype.get = function(t) {
			return this.dispatch("get", [t])
		}, p.set = function(t, e, n) {
			return p(t).dispatch("set", [e, n])
		}, f.prototype.set = function(t, e) {
			return this.dispatch("set", [t, e])
		}, p.del = p["delete"] = function(t, e) {
			return p(t).dispatch("delete", [e])
		}, f.prototype.del = f.prototype["delete"] = function(t) {
			return this.dispatch("delete", [t])
		}, p.mapply = p.post = function(t, e, n) {
			return p(t).dispatch("post", [e, n])
		}, f.prototype.mapply = f.prototype.post = function(t, e) {
			return this.dispatch("post", [t, e])
		}, p.send = p.mcall = p.invoke = function(t, e) {
			return p(t).dispatch("post", [e, Q(arguments, 2)])
		}, f.prototype.send = f.prototype.mcall = f.prototype.invoke = function(t) {
			return this.dispatch("post", [t, Q(arguments, 1)])
		}, p.fapply = function(t, e) {
			return p(t).dispatch("apply", [void 0, e])
		}, f.prototype.fapply = function(t) {
			return this.dispatch("apply", [void 0, t])
		}, p["try"] = p.fcall = function(t) {
			return p(t).dispatch("apply", [void 0, Q(arguments, 1)])
		}, f.prototype.fcall = function() {
			return this.dispatch("apply", [void 0, Q(arguments)])
		}, p.fbind = function(t) {
			var e = p(t),
				n = Q(arguments, 1);
			return function() {
				return e.dispatch("apply", [this, n.concat(Q(arguments))])
			}
		}, f.prototype.fbind = function() {
			var t = this,
				e = Q(arguments);
			return function() {
				return t.dispatch("apply", [this, e.concat(Q(arguments))])
			}
		}, p.keys = function(t) {
			return p(t).dispatch("keys", [])
		}, f.prototype.keys = function() {
			return this.dispatch("keys", [])
		}, p.all = j, f.prototype.all = function() {
			return j(this)
		}, p.allResolved = c(N, "allResolved", "allSettled"), f.prototype.allResolved = function() {
			return N(this)
		}, p.allSettled = G, f.prototype.allSettled = function() {
			return this.then(function(t) {
				return j(K(t, function(t) {
					function e() {
						return t.inspect()
					}
					return t = p(t), t.then(e, e)
				}))
			})
		}, p.fail = p["catch"] = function(t, e) {
			return p(t).then(void 0, e)
		}, f.prototype.fail = f.prototype["catch"] = function(t) {
			return this.then(void 0, t)
		}, p.progress = D, f.prototype.progress = function(t) {
			return this.then(void 0, void 0, t)
		}, p.fin = p["finally"] = function(t, e) {
			return p(t)["finally"](e)
		}, f.prototype.fin = f.prototype["finally"] = function(t) {
			return t = p(t), this.then(function(e) {
				return t.fcall().then(function() {
					return e
				})
			}, function(e) {
				return t.fcall().then(function() {
					throw e
				})
			})
		}, p.done = function(t, e, n, r) {
			return p(t).done(e, n, r)
		}, f.prototype.done = function(t, e, n) {
			var i = function(t) {
					U(function() {
						if (r(t, o), !p.onerror) throw t;
						p.onerror(t)
					})
				},
				o = t || e || n ? this.then(t, e, n) : this;
			"object" == typeof process && process && process.domain && (i = process.domain.bind(i)), o.then(void 0, i)
		}, p.timeout = function(t, e, n) {
			return p(t).timeout(e, n)
		}, f.prototype.timeout = function(t, e) {
			var n = l(),
				r = setTimeout(function() {
					n.reject(Error(e || "Timed out after " + t + " ms"))
				}, t);
			return this.then(function(t) {
				clearTimeout(r), n.resolve(t)
			}, function(t) {
				clearTimeout(r), n.reject(t)
			}, n.notify), n.promise
		}, p.delay = function(t, e) {
			return void 0 === e && (e = t, t = void 0), p(t).delay(e)
		}, f.prototype.delay = function(t) {
			return this.then(function(e) {
				var n = l();
				return setTimeout(function() {
					n.resolve(e)
				}, t), n.promise
			})
		}, p.nfapply = function(t, e) {
			return p(t).nfapply(e)
		}, f.prototype.nfapply = function(t) {
			var e = l(),
				n = Q(t);
			return n.push(e.makeNodeResolver()), this.fapply(n).fail(e.reject), e.promise
		}, p.nfcall = function(t) {
			var e = Q(arguments, 1);
			return p(t).nfapply(e)
		}, f.prototype.nfcall = function() {
			var t = Q(arguments),
				e = l();
			return t.push(e.makeNodeResolver()), this.fapply(t).fail(e.reject), e.promise
		}, p.nfbind = p.denodeify = function(t) {
			var e = Q(arguments, 1);
			return function() {
				var n = e.concat(Q(arguments)),
					r = l();
				return n.push(r.makeNodeResolver()), p(t).fapply(n).fail(r.reject), r.promise
			}
		}, f.prototype.nfbind = f.prototype.denodeify = function() {
			var t = Q(arguments);
			return t.unshift(this), p.denodeify.apply(void 0, t)
		}, p.nbind = function(t, e) {
			var n = Q(arguments, 2);
			return function() {
				function r() {
					return t.apply(e, arguments)
				}
				var i = n.concat(Q(arguments)),
					o = l();
				return i.push(o.makeNodeResolver()), p(r).fapply(i).fail(o.reject), o.promise
			}
		}, f.prototype.nbind = function() {
			var t = Q(arguments, 0);
			return t.unshift(this), p.nbind.apply(void 0, t)
		}, p.nmapply = p.npost = function(t, e, n) {
			return p(t).npost(e, n)
		}, f.prototype.nmapply = f.prototype.npost = function(t, e) {
			var n = Q(e || []),
				r = l();
			return n.push(r.makeNodeResolver()), this.dispatch("post", [t, n]).fail(r.reject), r.promise
		}, p.nsend = p.nmcall = p.ninvoke = function(t, e) {
			var n = Q(arguments, 2),
				r = l();
			return n.push(r.makeNodeResolver()), p(t).dispatch("post", [e, n]).fail(r.reject), r.promise
		}, f.prototype.nsend = f.prototype.nmcall = f.prototype.ninvoke = function(t) {
			var e = Q(arguments, 1),
				n = l();
			return e.push(n.makeNodeResolver()), this.dispatch("post", [t, e]).fail(n.reject), n.promise
		}, p.nodeify = B, f.prototype.nodeify = function(t) {
			return t ? (this.then(function(e) {
				U(function() {
					t(null, e)
				})
			}, function(e) {
				U(function() {
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
	}(t !== void 0 ? t : this);
	var d = {
		timeout: 3e3
	};
	d.getGameConfig = function() {
		var t = l.defer();
		return SpilGames(["JSLib"], function(e) {
			var n = e.get("current.game.integration.info");
			n ? t.resolve(n) : t.reject(Error("No data retrieved from JSLib"))
		}), t.promise.timeout(this.timeout)
	}, d.getBrandingConfig = function(t) {
		var e = l.defer(),
			n = "config.json",
			r = t.portal.siteId,
			i = t.portal.channelId,
			o = t.portal.applicationId;
		return SpilGames(["Net", "JSLib"], function(t, a) {
			t.send({
				url: [n, i, r, o].join("/"),
				type: "GET",
				dataType: "JSON"
			}, function(t) {
				if (t && t.configar) window.postMessage(new s({
					type: "success",
					callbackId: null,
					data: "log.configar.getBranding.success"
				}), "*"), e.resolve(t.configar);
				else {
					var n = {};
					try {
						n = a.get("configar.data.cached") || n
					} catch (r) {}
					e.reject(n)
				}
			})
		}), e.promise.timeout(this.timeout)
	};
	var h = {};
	h.argsToArray = function(t) {
		return t ? Array.prototype.slice.apply(t) : []
	}, h.isA10 = function() {
		return /17yy.com/.test(window.location.host)
	}, h.getRole = function() {
		var t = "function" == typeof window.SpilGames,
			e = window.self !== window.top,
			n = null;
		if (h.isA10()) return {
			IS_MASTER: !0,
			IS_SLAVE: !0,
			IS_STANDALONE: !0
		};
		if (t) {
			var r = document.getElementById("#iframegame");
			switch (r) {
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
		} : {
			IS_MASTER: !0,
			IS_SLAVE: !0,
			IS_STANDALONE: !0
		};
		return n
	}, h.callConfigar = function(t, e) {
		var n, r, i = t.site || 500,
			o = t.channel || 100,
			a = t.id || null;
		window.XDomainRequest ? (n = new XDomainRequest, n.onload = function() {
			e(n.status, n.responseText)
		}, n.onerror = function() {
			e(404, null)
		}, n.onprogress = function() {}) : window.XMLHttpRequest ? (n = new XMLHttpRequest, n.onreadystatechange = function() {
			4 === n.readyState && e(n.status, n.responseText)
		}) : window.ActiveXObject && (n = new ActiveXObject("Microsoft.XMLHTTP"), n.onreadystatechange = function() {
			4 === n.readyState && e(n.status, n.responseText)
		}), a && (r = "config.json", n.open("GET", r, !0), n.timeout = 3e3, n.ontimeout = function() {
			e(404, null)
		}, n.send())
	}, h.isWrapped = function() {
		return void 0 !== (window.PhoneGap || window.cordova || window.Cordova)
	}, h.isArray = Array.isArray || function(t) {
		return "[object Array]" === Object.prototype.toString.call(t)
	}, h._getQueryString = function() {
		return window.location.search
	}, h._getPortalHost = function() {
		return window && window.location && window.location.hostname ? window.location.hostname : "unknown"
	}, h.validateSchema = function(t, e) {
		for (var n in e)
			if (e.hasOwnProperty(n)) {
				if (!t.hasOwnProperty(n)) return {
					error: "Wrong argument passed: " + n
				};
				if (t.hasOwnProperty(n)) {
					var r = "object" == typeof t[n] ? t[n].type : t[n];
					if (e[n].constructor.name !== r) return {
						error: "Wrong value type for " + n + ": expected " + t[n] + ", got " + e[n].constructor.name
					};
					var i = t[n] && t[n].values || [];
					if (-1 === i.indexOf(e[n])) return {
						error: "Wrong value for " + n + ": expected " + i.join(" or ") + ", got " + e[n]
					}
				}
			}
		return {
			error: !1
		}
	};
	var f = {};
	f.getGameConfig = function() {
		return d.getGameConfig().catch(function() {
			return f.getLocalConfig()
		})
	}, f.getBrandingConfig = function(t) {
		return new Promise(function(e) {
			return d.getBrandingConfig(t).then(e, function(t) {
				e(t), window.postMessage(new s({
					type: "warning",
					callbackId: null,
					data: "log.configar.getBranding.failure"
				}), "*")
			})
		})
	}, f.getLocalConfig = function(t) {
		t = t && Object.keys(t).length ? t : {
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
				host: h._getPortalHost(),
				siteId: t.portal.siteId || 0,
				channelId: t.portal.channelId || 0,
				applicationId: t.portal.applicationId || "0"
			},
			branding: t.branding || {}
		};
		return e.branding.logo = e.branding.logo || {}, e.branding.logo.url = e.branding.logo.url || !1, e.branding.logo.image = e.branding.logo.image || !1, e
	}, f.setupStandaloneMode = function(t, e) {
		var n = {},
			r = {
				configar: {
					branding: {
						main: {
							label: "main",
							image: "",
							url: "http://www.a10.com",
							style: "",
							width: "202",
							height: "50",
							mime: "image/png",
							type: "png",
							handler: "newTab",
							blacklisted: !0
						},
						logo: {
							label: "logo",
							image: "",
							url: "http://www.a10.com",
							style: "",
							width: "202",
							height: "50",
							mime: "image/png",
							type: "png",
							handler: "newTab",
							blacklisted: !1
						},
						more_games: {
							label: "more_games",
							image: null,
							url: "http://www.a10.com",
							style: "",
							width: null,
							height: null,
							mime: null,
							type: null,
							handler: "newTab",
							blacklisted: !1
						},
						splash_screen: {
							label: "splash_screen",
							image: "place_holder_string",
							url: "http://www.a10.com",
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
				return this.memory[t] = e, e
			},
			publish: function(t, e) {
				this._channels[t] && this._channels[t].forEach(function(t) {
					try {
						t.fn.call(this, e)
					} catch (n) {}
				})
			},
			subscribe: function(t, e) {
				if ("function" != typeof e) throw Error("Callback has to be a function");
				if ("string" != typeof t) throw Error("Channel name has to be a string");
				this._channels[t] || (this._channels[t] = []), this._channels[t].push({
					fn: e
				})
			}
		}, n.Net = {
			send: function(t, e) {
				e.call(this, {})
			}
		}, window.SpilGamesBootstrap = [], window.SpilGames = function() {
			var t = arguments;
			if (t[0] && "string" == typeof t[0]) n.JSLib.publish(t[0], t[1] || null);
			else if (t[0] && t[0] instanceof Array) {
				var e, r, i = [];
				for (e = 0, r = t[0].length; r > e; e++) i.push(n[t[0][e]]);
				t[1].apply(this, i)
			}
		}, t && t.id ? h.callConfigar(t, function(n, i) {
			if (200 === n && "string" == typeof i && JSON.parse(i)) {
				var o = JSON.parse(i);
				e.call(this, {
					branding: o.configar && o.configar.branding ? o.configar.branding : r.configar.branding,
					portal: {
						applicationId: t.id,
						siteId: t.site ? t.site : 500,
						channelId: t.channel ? t.channel : 100
					}
				})
			} else e.call(this, {
				branding: r.configar.branding
			})
		}) : e.call(this, {
			branding: r.configar.branding
		})
	}, f.getCachedConfig = function() {}, e.prototype.newTab = function(t) {
		var e = window.navigator.userAgent.toLowerCase().match(/android.*applewebkit\/([\d.]+)/),
			n = e && 537 > e[1],
			r = n ? "_self" : "_blank",
			i = t.url;
			// o = window.open(i, r);
		return o && o.focus(), o
	}, e.prototype.displayOnTop = function(t) {
		if (t === void 0 || t.url === void 0 || "string" != typeof t.url || t.action === void 0 || "function" != typeof t.action) return t.callback !== void 0 || "function" == typeof t.callback ? (t.callback(), void 0) : void 0;
		var e = document.createElement("div"),
			n = t.url,
			r = t.action,
			i = t.callback;
		return e.setAttribute("id", "spilgames-splash-screen-sample"), document.body.appendChild(e), e.style.left = "0", e.style.top = "0", e.style.width = "100%", e.style.height = "100%", e.style.position = "absolute", e.style.zIndex = "10000", e.onclick = r, n && (e.style.background = "url('" + n + "') center center no-repeat #FFF"), window.setTimeout(function() {
			var t = document.getElementById("spilgames-splash-screen-sample");
			t.parentNode.removeChild(t), i && i()
		}, 2e3), e
	}, n.prototype.get = function(t) {
		for (var e = this.dataStore, n = t.split("."), r = n.length, i = 0; r - 1 > i; i++) {
			if (!e[n[i]]) return null;
			e = e[n[i]]
		}
		return e[n[r - 1]] || null
	}, n.prototype.put = function(t, e) {
		for (var n = this.dataStore, r = t.split("."), i = r.length, o = 0; i - 1 > o; o++) {
			var a = r[o];
			n[a] || (n[a] = {}), n = n[a]
		}
		n[r[i - 1]] = e
	}, n.prototype.set = function(t, e) {
		this.put(t, e);
		var n = Date.parse(new Date);
		return this.notify({
			type: "new",
			key: t,
			current: e,
			previous: null,
			timestamp: n
		}), e
	}, n.prototype.update = function(t, e) {
		var n, r, i = null;
		return this.get(t) ? (n = "update", i = this.get(t)) : n = "new", this.put(t, e), r = Date.parse(new Date), this.notify({
			type: n,
			key: t,
			current: e,
			previous: i,
			timestamp: r
		}), e
	}, n.prototype.remove = function(t) {
		if (this.get(t)) {
			var e, n = this.get(t);
			return this.put(t, null), e = Date.parse(new Date), this.notify({
				type: "remove",
				key: t,
				current: null,
				previous: n,
				timestamp: e
			}), !0
		}
		return !1
	}, n.prototype._setCache = function(t) {
		this.dataStore = t
	}, n.prototype._getCache = function() {
		return this.dataStore
	}, n.prototype.notify = function(t) {
		if (this.IS_MASTER) {
			var e = new s({
				type: "datachange",
				callbackId: null,
				data: t
			}).encode();
			return window.postMessage(e, "*"), e
		}
	}, r.prototype._performAction = function(t) {
		var e = new s(t.data || {}),
			n = this.messenger,
			r = this.subscribers || {};
		if (e && e.type && e.data) switch (e.type) {
			case "gameEvent":
				e.data[0] && r[e.data[0]] && r[e.data[0]].length > 0 && r[e.data[0]].forEach(function(t) {
					t.call(this), n._postMessage([e.data[0], {
							origin: "slave"
						},
						null
					], null, "gameState")
				});
				break;
			case "gameState":
				e.data[0] && e.data[1] && "slave" === e.data[1].origin && (this.gameState = e.data[0])
		}
	}, r.prototype.on = function(t, e) {
		this.IS_SLAVE && (this.subscribers[t] || (this.subscribers[t] = []), this.subscribers[t].push(e))
	}, r.prototype.emit = function(t) {
		if (!this.IS_MASTER) throw Error("Only the master environment can emit game events");
		if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
		if (t === this.gameState) throw Error("The game is already in state: `" + t + "`");
		this.messenger._postMessage([t, {
				origin: "master"
			},
			null
		], null, "gameEvent")
	}, i.prototype.init = function() {
		this._setupEvents()
	}, i.prototype._setupEvents = function() {
		var t = this.messenger;
		this.isMaster ? (SpilGames(["JSLib"], function(e) {
			e.subscribe("ad.request.accepted", function(e) {
				!0 === e && (SpilGames("game.ad.accepted", !0), t._postMessage(!0, void 0, "ad.request.accepted"))
			}), e.subscribe("ad.complete", function() {
				t._postMessage("", "", "ad.complete")
			})
		}), this.messenger.subscribe("game.ad.request", this._triggerAd, this)) : (this.messenger.subscribe("ad.request.accepted", this._onAdAccepted, this), this.messenger.subscribe("ad.complete", this._onAdCompleted, this))
	}, i.prototype._triggerAd = function() {
		SpilGames("game.ad.request")
	}, i.prototype._runCallback = function(t) {
		this._callbacks[t] && (this._callbacks[t](), this._callbacks[t] = !1)
	}, i.prototype.request = function(t, e) {
		var n = this;
		if ("function" != typeof t) throw Error("pauseGame argument should be a function");
		if ("function" != typeof e) throw Error("resumeGame argument should be a function");
		if (!this.moduleReady) throw Error("This method cannot be called before the API is loaded");
		this._callbacks.pause = t, this._callbacks.resume = e, this.messenger._postMessage(void 0, void 0, "game.ad.request"), this.isMaster || this.messenger._postMessage(["log.gameapi.ad.requested", {
				origin: "slave"
			},
			null
		], null, "log"), this.timeout = setTimeout(function() {
			n._requestTimeout()
		}, this.timeoutAfter)
	}, i.prototype._onAdAccepted = function(t) {
		var e = this.messenger;
		this.timeout && clearTimeout(this.timeout), !this.isMaster && t && (e._postMessage(["log.gameapi.ad.start", {
				origin: "slave"
			},
			null
		], null, "log"), this._runCallback("pause"))
	}, i.prototype._onAdCompleted = function() {
		var t = this.messenger;
		this.isMaster || t._postMessage(["log.gameapi.ad.complete", {
				origin: "slave"
			},
			null
		], null, "log"), this._runCallback("resume")
	}, i.prototype._requestTimeout = function() {
		this._onAdCompleted()
	}, o.prototype.init = function(t) {
		t = t || {}, this.data = t.data || this.data;
		var e = this.data && this.data.game && this.data.game.applicationId ? this.data.game.applicationId : null,
			n = new Date,
			r = window.location.hostname;
		(this.IS_SLAVE || h.isWrapped()) && this.startInternalTracking(e, n, r)
	}, o.prototype._createEventObject = function(t, e, n) {
		return {
			eventCategory: t,
			eventAction: e,
			properties: n
		}
	}, o.prototype._sendSETEvent = function(t, e, n) {
		return this.messenger && (this.IS_SLAVE || h.isWrapped()) && this.messenger.post("tracker.event." + t, e, n), e
	}, o.prototype.trackGamePlay = function(t) {
		if (!this.gamePlayTracking.started) return !1;
		var e = this.gamePlayTracking.gid,
			n = this.gamePlayTracking.timestamp,
			r = this.gamePlayTracking.host,
			i = this._createEventObject("game", "gameplay", {
				applicationId: e,
				start: n,
				host: r
			});
		return this._sendSETEvent("express", i, t), i
	}, o.prototype.trackTimeInGame = function(t) {
		if (!this.timeInGameTracking.started) return !1;
		var e = this.timeInGameTracking.gid,
			n = this.timeInGameTracking.timestamp,
			r = this._createEventObject("game", "heartbeat", {
				applicationId: e,
				start: n
			});
		return this._sendSETEvent("express", r, t), r
	}, o.prototype.startInternalTracking = function(t, e, n) {
		var r = this,
			i = 6e4,
			o = function(t) {
				if (!t) throw "Could not save the time in game"
			};
		return this.moduleReady ? t ? (this.gamePlayTracking.gid = t, this.gamePlayTracking.timestamp = Date.parse(e), this.gamePlayTracking.host = n, this.gamePlayTracking.started = !0, this.timeInGameTracking.gid = t, this.timeInGameTracking.timestamp = Date.parse(e), this.timeInGameTracking.started = !0, this.trackGamePlay(function(t) {
			if (!t) throw "Could not save the game play"
		}), this.trackTimeInGame(o), setInterval(function() {
			r.trackTimeInGame(o)
		}, i), this.gamePlayTracking.started && this.timeInGameTracking.started) : {
			error: "No application ID defined for this game"
		} : {
			error: "This method cannot be called before the API is loaded"
		}
	}, a.prototype.init = function(t) {
		t = t || {}, this.data = t.data || this.data
	}, a.prototype.getLogo = function(t) {
		if (!this.moduleReady) return {
			error: "This method cannot be called before the API is loaded"
		};
		var e = this.IS_MASTER ? "master" : "slave";
		this.messenger._postMessage(["log.branding.getlogo", {
				origin: e
			},
			null
		], null, "log");
		var n, r, i = {
			type: {
				type: "String",
				values: ["png"]
			},
			width: "Number",
			height: "Number"
		};
		return n = this._getLink("logo"), t && "object" == typeof t && (r = h.validateSchema(i, t), r.error && (n.error = r.error)), n
	}, a.prototype.getLink = function(t) {
		if (!t) return {
			error: "No link identifier provided"
		};
		var e = this.listLinks();
		if (-1 !== e.indexOf(t)) {
			var n = this.IS_MASTER ? "master" : "slave";
			return this.messenger._postMessage(["log.branding.getlink", {
					origin: n,
					linkName: t
				},
				null
			], null, "log"), this._getLink(t)
		}
		return {
			error: "Invalid option: '" + t + "'",
			action: function() {}
		}
	}, a.prototype._getLink = function(t) {
		if (!t) return {
			error: "No link identifier provided"
		};
		var e = this.data && this.data.branding ? this.data.branding : {};
		return e && e[t] ? {
			linkName: t,
			image: e[t].image || !1,
			action: this._executeHandler.bind(this, t)
		} : {
			error: "Invalid option: '" + t + "'",
			action: function() {}
		}
	}, a.prototype._getGMLink = function(t) {
		var e = null;
		if (!t) return {
			error: "No link identifier provided"
		};
		var n = this.data && this.data.branding ? this.data.branding : {};
		return n && n[t] ? (e = this._tagUrl(n[t].url, t), {
			linkName: t,
			url: e
		}) : {
			error: "Invalid option: '" + t + "'",
			url: null
		}
	}, a.prototype.getLinks = function() {
		var t = {},
			e = this.listLinks();
		if (0 === e.length) t = {
			more_games: {
				action: function() {}
			}
		};
		else
			for (var n = 0; e.length > n; n++) {
				var r = e[n];
				t[r] = this._getLink(r)
			}
		return t
	}, a.prototype._executeHandler = function(t) {
		var e = this.data && this.data.branding ? this.data.branding : {},
			n = e[t],
			r = n.handler,
			i = this._tagUrl(n.url, t);
		if (n.url && n.url.length > 0 && r && this.components[r]) {
			var o = this.IS_MASTER ? "master" : "slave";
			return this.messenger._postMessage(["log.branding.linkAction", {
					origin: o,
					linkName: t
				},
				null
			], null, "log"), this.components[r]({
				url: i
			})
		}
		return function() {}
	}, a.prototype.listLinks = function() {
		var t = [],
			e = this.data && this.data.branding ? this.data.branding : {},
			n = Object.keys(e);
		return t = n.filter(function(t) {
			return !e[t].blacklisted
		})
	}, a.prototype.getSplashScreen = function() {
		var t, e = this.IS_MASTER ? "master" : "slave";
		if (this.data && this.data.branding && this.data.branding.splash_screen) {
			var n = !0;
			this.data.branding.splash_screen.image || this.data.branding.splash_screen.url || (n = !1), t = {
				show: n,
				action: this._getLink("splash_screen").action || function() {}
			}
		} else t = {
			show: !0,
			action: function() {}
		};
		return this.messenger._postMessage(["log.branding.splashScreen", {
				origin: e
			},
			null
		], null, "log"), t
	}, a.prototype.displaySplashScreen = function(t) {
		if ("function" != typeof t) throw Error("argument  passed to displaySplashScreen method should be a function");
		var e = this.IS_MASTER ? "master" : "slave",
			n = this._getLink("logo").image;
		n && this.getSplashScreen().show ? ("master" !== e && this.messenger._postMessage(["log.branding.displaySplashScreen", {
				origin: e
			},
			null
		], null, "log"), this.components.displayOnTop({
			url: n,
			action: this.getSplashScreen().action,
			callback: t
		})) : t()
	}, a.prototype._tagUrl = function(t, e) {
		var n, r, i, o = this.data && this.data.portal ? this.data.portal : {},
			a = this.data && this.data.game ? this.data.game : {},
			s = parseInt(o.siteId, 10);
		if ("string" != typeof t) throw Error("No url specified");
		return n = "string" == typeof e ? e : "logo", r = "brandedgames_" + (s > 0 && 500 > s ? "internal" : "external"), i = ["utm_medium=" + r, "utm_campaign=" + a.applicationId, "utm_source=" + o.host, "utm_content=" + n].join("&"), t += t.indexOf("?") > -1 ? "&" : "?", t + i
	}, s.prototype.encode = function() {
		var t = ["gameapi", this.type, this.callbackId, this.data ? JSON.stringify(this.data) : ""].join("|");
		return t
	}, c.prototype._postMessage = function(t, e, n) {
		var r, i;
		r = h.isArray(t) && "function" == typeof t[t.length - 1] ? this._callbacks.push(t.pop()) - 1 : e, i = new s({
			type: n || "jslib",
			callbackId: r,
			data: t
		}).encode(), this._target.postMessage(i, "*")
	}, c.prototype._callJSLib = function() {
		SpilGames.apply(SpilGames, h.argsToArray(arguments))
	}, c.prototype._setupEventListener = function() {
		window.addEventListener ? window.addEventListener("message", this._handleMessage.bind(this), !1) : window.attachEvent && window.attachEvent("onmessage", this._handleMessage.bind(this))
	}, c.prototype._handleMessage = function(t) {
		var e, n, r, i, o = this,
			a = new s(t.data);
		if (a)
			if (e = a.type, n = a.callbackId, r = a.data, i = this._callbacks[n] || !1, this.IS_MASTER) switch (e) {
				case "jslib":
					"Array" === r.constructor.name && r.push(function(t) {
						o._postMessage(t, n)
					}), this._callJSLib.apply(this, r);
					break;
				case "ugapi":
					this._handleUGARequest(t);
					break;
				case "datachange":
					this._postMessage(r, null, "datachange");
					break;
				default:
					this.publish(e, r)
			} else this.IS_SLAVE && ("function" == typeof i ? (delete this._callbacks[n], i(r)) : "datachange" === e || "jslib" !== e && this.publish(e, r));
		return !1
	}, c.prototype._handleUGARequest = function(t) {
		var e, n, r, i = this,
			o = new s(t.data);
		if (o) switch (e = o.data[0], n = o.callbackId, r = o.data[1] ? o.data[1] : null, e) {
			case "GameAPI.data":
				i._postMessage(this.dataStore._getCache(), n, "ugapi");
				break;
			case "GameAPI.isReady":
				i._postMessage({
					isready: this.api.isReady
				}, n, "ugapi")
		}
	}, c.prototype.post = function() {
		var t = h.argsToArray(arguments);
		return this.IS_SLAVE ? this._postMessage(t) : this._callJSLib.apply(this, t), this
	}, c.prototype.publish = function(t, e) {
		return this._channels[t] && this._channels[t].forEach(function(t) {
			try {
				t.fn.call(t.ctx, e)
			} catch (n) {}
		}), this
	}, c.prototype.subscribe = function(t, e, n) {
		if ("function" != typeof e) throw Error("Callback has to be a function");
		if ("string" != typeof t) throw Error("Channel name has to be a string");
		return this._channels[t] || (this._channels[t] = []), this._channels[t].push({
			fn: e,
			ctx: n
		}), this
	}, c.prototype.unsubscribe = function(t, e) {
		return this._channels[t] && "function" == typeof e && (this._channels[t] = this._channels[t].filter(function(t) {
			return t.fn !== e
		})), this
	}, c.prototype.subscribeOnce = function(t, e, n) {
		function r(n) {
			i.unsubscribe(t, r), e.call(this, n)
		}
		var i = this;
		return this.subscribe(t, r, n)
	}, c.prototype.requestFromParent = function(t, e, n) {
		if (!this.IS_SLAVE) throw "You are the parent, stop talking to yourself";
		e = e || {}, this._postMessage([t, e, n], null, "ugapi")
	}, p.prototype._setRole = function() {
		var t = h.getRole();
		this.IS_MASTER = t.IS_MASTER, this.IS_SLAVE = t.IS_SLAVE, this.IS_STANDALONE = t.IS_STANDALONE
	}, p.prototype._getTarget = function() {
		if (this.IS_STANDALONE) return window;
		var t = document.getElementById("iframegame"),
			e = t && t.contentWindow ? t.contentWindow : window.parent;
		return this.IS_MASTER ? e : window.parent
	}, p.prototype.loadAPI = function(t, e) {
		function n(e) {
			return a.IS_MASTER && (e = r(e)), a.isReady = !0, a.Branding.moduleReady = !0, a.__.EventTracking.moduleReady = !0, a.GameBreak.moduleReady = !0, a.Game.moduleReady = !0, a.Branding.init({
				data: e
			}), a.__.EventTracking.init({
				data: e
			}), a.GameBreak.init(), a.__.messenger._postMessage(["log.gameapi.loadapi.finish", {
					origin: s,
					version: a.version
				},
				null
			], null, "log"), t(a)
		}

		function r(t) {
			var e = t.game || {},
				n = t.user || {},
				r = t.portal || {},
				i = t.branding || {};
			return f.getLocalConfig({
				game: e,
				user: n,
				portal: r,
				branding: i
			})
		}

		function i() {
			a.__.messenger.requestFromParent("GameAPI.data", {}, function(t) {
				n(t)
			})
		}

		function o() {
			a.__.messenger.requestFromParent("GameAPI.isReady", {}, function(t) {
				t.isready ? i() : 5 > u ? (u++, setTimeout(o, 500)) : i()
			})
		}
		var a = this,
			s = this.IS_MASTER ? "master" : "slave",
			u = 0;
		if ("function" != typeof t) throw Error("argument passed to loadAPI method should be a function");
		return !0 === this.isReady ? (window.console && window.console.log && console.log("WARNING: Detected multiple executions of GameAPI.loadAPI(). This method should only be executed once per page load!"), t(a)) : (this.__.messenger._postMessage(["log.gameapi.loadapi.start", {
				origin: s,
				version: a.version
			},
			null
		], null, "log"), this.IS_STANDALONE ? (e = e || null, f.setupStandaloneMode(e, function(t) {
			a.__.dataStore._setCache(r(t)), n(t)
		})) : this.IS_MASTER ? f.getGameConfig().then(function(t) {
			f.getBrandingConfig(t).then(function(e) {
				t && !t.isError && (t.branding = e.branding, a.__.dataStore._setCache(r(t))), n(t)
			})
		}) : o(), void 0)
	};
	var g = new p(n, c, a, o, i);
	"function" == typeof define && define.amd && define("GameAPI", g), t.GameAPI = g
})(window),
function() {
	"use strict";

	function t(t) {
		t && (t.setTargetValueAtTime || (t.setTargetValueAtTime = t.setTargetAtTime))
	}
	window.hasOwnProperty("AudioContext") && (window.webkitAudioContext = AudioContext, AudioContext.prototype.hasOwnProperty("internal_createGain") || (AudioContext.prototype.internal_createGain = AudioContext.prototype.createGain, AudioContext.prototype.createGain = function() {
		var e = this.internal_createGain();
		return t(e.gain), e
	}), AudioContext.prototype.hasOwnProperty("internal_createDelay") || (AudioContext.prototype.internal_createDelay = AudioContext.prototype.createDelay, AudioContext.prototype.createDelay = function() {
		var e = this.internal_createDelay();
		return t(e.delayTime), e
	}), AudioContext.prototype.hasOwnProperty("internal_createBufferSource") || (AudioContext.prototype.internal_createBufferSource = AudioContext.prototype.createBufferSource, AudioContext.prototype.createBufferSource = function() {
		var e = this.internal_createBufferSource();
		return e.noteOn || (e.noteOn = e.start), e.noteGrainOn || (e.noteGrainOn = e.start), e.noteOff || (e.noteOff = e.stop), t(e.playbackRate), e
	}), AudioContext.prototype.hasOwnProperty("internal_createDynamicsCompressor") || (AudioContext.prototype.internal_createDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor, AudioContext.prototype.createDynamicsCompressor = function() {
		var e = this.internal_createDynamicsCompressor();
		return t(e.threshold), t(e.knee), t(e.ratio), t(e.reduction), t(e.attack), t(e.release), e
	}), AudioContext.prototype.hasOwnProperty("internal_createBiquadFilter") || (AudioContext.prototype.internal_createBiquadFilter = AudioContext.prototype.createBiquadFilter, AudioContext.prototype.createBiquadFilter = function() {
		var e = this.internal_createBiquadFilter();
		t(e.frequency), t(e.detune), t(e.Q), t(e.gain);
		for (var n = ["LOWPASS", "HIGHPASS", "BANDPASS", "LOWSHELF", "HIGHSHELF", "PEAKING", "NOTCH", "ALLPASS"], r = 0; n.length > r; ++r) {
			var i = n[r],
				o = i.toLowerCase();
			e.hasOwnProperty(i) || (e[i] = o)
		}
		return e
	}), AudioContext.prototype.hasOwnProperty("internal_createOscillator") || AudioContext.prototype.hasOwnProperty("createOscillator") && (AudioContext.prototype.internal_createOscillator = AudioContext.prototype.createOscillator, AudioContext.prototype.createOscillator = function() {
		var e = this.internal_createOscillator();
		e.noteOn || (e.noteOn = e.start), e.noteOff || (e.noteOff = e.stop), t(e.frequency), t(e.detune);
		for (var n = ["SINE", "SQUARE", "SAWTOOTH", "TRIANGLE", "CUSTOM"], r = 0; n.length > r; ++r) {
			var i = n[r],
				o = i.toLowerCase();
			e.hasOwnProperty(i) || (e[i] = o)
		}
		return e.hasOwnProperty("setWaveTable") || (e.setWaveTable = e.setPeriodicTable), e
	}), AudioContext.prototype.hasOwnProperty("internal_createPanner") || (AudioContext.prototype.internal_createPanner = AudioContext.prototype.createPanner, AudioContext.prototype.createPanner = function() {
		var t = this.internal_createPanner(),
			e = {
				EQUALPOWER: "equalpower",
				HRTF: "HRTF",
				LINEAR_DISTANCE: "linear",
				INVERSE_DISTANCE: "inverse",
				EXPONENTIAL_DISTANCE: "exponential"
			};
		for (var n in e) {
			var r = e[n];
			t.hasOwnProperty(n) || (t[n] = r)
		}
		return t
	}), AudioContext.prototype.hasOwnProperty("createGainNode") || (AudioContext.prototype.createGainNode = AudioContext.prototype.createGain), AudioContext.prototype.hasOwnProperty("createDelayNode") || (AudioContext.prototype.createDelayNode = AudioContext.prototype.createDelay), AudioContext.prototype.hasOwnProperty("createJavaScriptNode") || (AudioContext.prototype.createJavaScriptNode = AudioContext.prototype.createScriptProcessor), AudioContext.prototype.hasOwnProperty("createWaveTable") || (AudioContext.prototype.createWaveTable = AudioContext.prototype.createPeriodicWave))
}(window);